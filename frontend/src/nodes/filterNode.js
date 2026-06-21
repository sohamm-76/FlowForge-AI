// filterNode.js
// Demonstrates: a text input field used as a filter condition, single in/out handle.

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [condition, setCondition] = useState(data?.condition || '');

  const handleChange = (e) => {
    setCondition(e.target.value);
    updateNodeField(id, 'condition', e.target.value);
  };

  return (
    <BaseNode
      title="Filter"
      icon="⏚"
      accent="#d97706"
      handles={[
        { type: 'target', position: 'left', id: `${id}-input` },
        { type: 'source', position: 'right', id: `${id}-output` },
      ]}
    >
      <div className="bn-field">
        <label className="bn-field-label">Condition</label>
        <input
          className="bn-input"
          type="text"
          placeholder="e.g. value > 10"
          value={condition}
          onChange={handleChange}
        />
      </div>
    </BaseNode>
  );
};