// mathNode.js
// Demonstrates: two target handles (left), one source handle (right), a select field.

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const OPERATIONS = ['Add', 'Subtract', 'Multiply', 'Divide'];

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [operation, setOperation] = useState(data?.operation || 'Add');

  const handleChange = (e) => {
    setOperation(e.target.value);
    updateNodeField(id, 'operation', e.target.value);
  };

  return (
    <BaseNode
      title="Math"
      icon="∑"
      accent="#16a34a"
      handles={[
        { type: 'target', position: 'left', id: `${id}-a`, style: { top: '33%' } },
        { type: 'target', position: 'left', id: `${id}-b`, style: { top: '66%' } },
        { type: 'source', position: 'right', id: `${id}-result` },
      ]}
    >
      <div className="bn-field">
        <label className="bn-field-label">Operation</label>
        <select className="bn-select" value={operation} onChange={handleChange}>
          {OPERATIONS.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
