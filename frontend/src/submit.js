// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  clearPipeline: state.clearPipeline,
});

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

export const SubmitButton = () => {
  const { nodes, edges, clearPipeline } = useStore(selector, shallow);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmpty = nodes.length === 0;

  const handleSubmit = async () => {
    // Guard against submitting an empty pipeline — nothing useful to analyze,
    // and it avoids a pointless network call.
    if (isEmpty) {
      alert('Your canvas is empty. Drag at least one node onto the canvas before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      const { num_nodes, num_edges, is_dag } = result;

      alert(
        `Pipeline Analysis\n\n` +
        `Nodes: ${num_nodes}\n` +
        `Edges: ${num_edges}\n` +
        `Valid DAG: ${is_dag ? 'Yes ✅' : 'No ❌ (contains a cycle)'}`
      );
    } catch (error) {
      alert(`Failed to analyze pipeline: ${error.message}\n\nMake sure the backend server is running.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    if (isEmpty) return;
    const confirmed = window.confirm('Clear the entire canvas? This cannot be undone.');
    if (confirmed) {
      clearPipeline();
    }
  };

  return (
    <div className="submit-bar">
      <button
        type="button"
        className="clear-btn"
        onClick={handleClear}
        disabled={isEmpty}
        title="Remove all nodes and edges from the canvas"
      >
        Clear Canvas
      </button>
      <button
        type="button"
        className="submit-btn"
        onClick={handleSubmit}
        disabled={isSubmitting || isEmpty}
        title={isEmpty ? 'Add at least one node first' : 'Analyze this pipeline'}
      >
        {isSubmitting ? 'Analyzing…' : 'Submit'}
      </button>
    </div>
  );
};
