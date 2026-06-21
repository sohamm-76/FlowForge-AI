// BaseNode.js
// Reusable abstraction for all pipeline nodes.
//
// Why this exists:
// Every node (Input, Output, LLM, Text, and any future node) shares the same
// skeleton: a titled card, a set of Handles on specific sides/positions, and
// some body content. Before this abstraction, each node re-implemented that
// skeleton from scratch. BaseNode centralizes it so creating a new node is a
// matter of describing *what's different* (title, handles, fields) rather
// than re-writing *what's the same* (layout, styling, handle positioning).

import { Handle, Position } from 'reactflow';
import './nodes.css';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

/**
 * @param {string} title - Node header label (e.g. "Input", "LLM")
 * @param {string} [icon] - Optional emoji/short icon shown next to title
 * @param {Array} [handles] - [{ type: 'source'|'target', position: 'left'|'right'|'top'|'bottom', id, style, label }]
 * @param {React.ReactNode} children - Node body content (fields, text, etc.)
 * @param {number|string} [width] - Node width (default 220)
 * @param {number|string} [height] - Node height (default 'auto')
 * @param {string} [accent] - Accent color for the header strip (defaults via CSS var)
 */
export const BaseNode = ({
  title,
  icon,
  handles = [],
  children,
  width = 220,
  height = 'auto',
  accent,
}) => {
  return (
    <div
      className="bn-node"
      style={{ width, height, ...(accent ? { '--bn-accent': accent } : {}) }}
    >
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={positionMap[h.position] || Position.Left}
          id={h.id}
          style={h.style}
          className="bn-handle"
        />
      ))}

      <div className="bn-header">
        {icon && <span className="bn-icon">{icon}</span>}
        <span className="bn-title">{title}</span>
      </div>

      <div className="bn-body">{children}</div>
    </div>
  );
};