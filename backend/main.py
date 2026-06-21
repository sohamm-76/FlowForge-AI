from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# The React dev server runs on a different port (3000) than FastAPI (8000),
# so the browser blocks the request by default unless we explicitly allow it.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    # nodes/edges arrive as the raw ReactFlow node/edge objects (list of dicts).
    # We only actually need `id` from nodes and `source`/`target` from edges,
    # but accepting Any keeps this resilient to whatever extra fields ReactFlow
    # attaches (position, data, type, etc.) without us needing to mirror its schema.
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def is_directed_acyclic_graph(node_ids: List[str], edges: List[Dict[str, Any]]) -> bool:
    """
    Returns True if the graph formed by node_ids and edges has no cycles.

    Uses DFS with three-color marking (white/gray/black):
    - white: not yet visited
    - gray:  currently on the DFS recursion stack (an ancestor of the node being explored)
    - black: fully explored, all its descendants are done

    A cycle exists if and only if DFS ever encounters an edge pointing to a
    node that is still gray (i.e., we've looped back to one of our own ancestors).
    """
    adjacency: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        # Defensive: ignore edges that reference nodes not present in the pipeline.
        if source in adjacency and target in adjacency:
            adjacency[source].append(target)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node_id: WHITE for node_id in node_ids}

    def dfs(node_id: str) -> bool:
        """Returns True if a cycle is found starting from this node."""
        color[node_id] = GRAY
        for neighbor in adjacency[node_id]:
            if color[neighbor] == GRAY:
                return True  # back edge -> cycle
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node_id] = BLACK
        return False

    for node_id in node_ids:
        if color[node_id] == WHITE:
            if dfs(node_id):
                return False  # cycle found -> not a DAG

    return True


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    node_ids = [node["id"] for node in pipeline.nodes]
    num_nodes = len(node_ids)
    num_edges = len(pipeline.edges)
    is_dag = is_directed_acyclic_graph(node_ids, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }