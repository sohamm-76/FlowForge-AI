# 🚀 FlowForge AI

A modern visual workflow builder built with **React Flow**, **Zustand**, and **FastAPI**, enabling users to create, connect, and validate node-based pipelines through an intuitive drag-and-drop interface.

![React](https://img.shields.io/badge/React-19-blue)
![React Flow](https://img.shields.io/badge/ReactFlow-WorkflowBuilder-green)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-teal)
![Python](https://img.shields.io/badge/Python-3.10+-yellow)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## ✨ Overview

FlowForge AI is a visual pipeline editor that allows users to design workflows using customizable nodes connected through an interactive graph interface.

The application supports dynamic node creation, variable-based text nodes, workflow validation, and backend graph analysis to ensure pipelines form valid Directed Acyclic Graphs (DAGs).

---

## 🎯 Features

### 🧩 Reusable Node Architecture

* Generic BaseNode abstraction
* Easily extensible node system
* Consistent styling across node types
* Reduced code duplication

### ⚡ Interactive Workflow Canvas

* Drag-and-drop node placement
* Connect nodes visually
* Dynamic edge creation
* Real-time graph updates

### 🔤 Dynamic Text Nodes

* Auto-resizing text areas
* Variable detection using:

```text
{{input}}
{{username}}
{{prompt}}
```

* Automatic handle generation from detected variables

### 📊 Pipeline Validation

* Node count analysis
* Edge count analysis
* Directed Acyclic Graph (DAG) validation
* Backend graph processing

### 🎨 Modern UI/UX

* Clean workflow editor
* Responsive layout
* Interactive controls
* Professional node styling

---

## 🏗️ Node Types

| Node        | Purpose                  |
| ----------- | ------------------------ |
| Input       | User input source        |
| Output      | Pipeline output          |
| Text        | Dynamic text processing  |
| LLM         | AI/LLM processing        |
| Math        | Mathematical operations  |
| API         | External API integration |
| Filter      | Data filtering           |
| Timer       | Delayed execution        |
| Conditional | Decision branching       |

---

## 🛠️ Tech Stack

### Frontend

* React
* React Flow
* Zustand
* JavaScript
* CSS

### Backend

* FastAPI
* Python
* Graph Traversal Algorithms
* DFS-based DAG Detection

---

## 📂 Project Structure

```bash
FlowForge-AI/
│
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   ├── components/
│   │   ├── store/
│   │   └── styles/
│
├── backend/
│   ├── main.py
│   └── graph_utils.py
│
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/sohamm-76/FlowForge-AI.git
cd FlowForge-AI
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

## 🔍 Backend Analysis Response

When submitting a workflow, the backend returns:

```json
{
  "num_nodes": 9,
  "num_edges": 8,
  "is_dag": true
}
```

---

## 📸 Screenshots

### Workflow Builder

*Add screenshot here*

### Dynamic Text Node

*Add screenshot here*

### Pipeline Validation

*Add screenshot here*

---

## 🧠 Architecture Highlights

### Frontend

* React Flow powered canvas
* Zustand state management
* Reusable BaseNode abstraction
* Dynamic node rendering

### Backend

* FastAPI REST API
* Graph parsing
* DFS cycle detection
* DAG validation

---

## 🔮 Future Improvements

* Workflow persistence
* Export / Import pipelines
* Authentication
* Real-time collaboration
* AI-powered workflow suggestions
* Custom plugin system

---

## 👨‍💻 Author

**Soham Yeola**

* GitHub: https://github.com/sohamm-76
* LinkedIn: https://www.linkedin.com/in/soham-yeola

---

⭐ If you found this project interesting, consider starring the repository.
