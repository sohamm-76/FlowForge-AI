// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <BaseNode
      title="Input"
      icon="↳"
      handles={[{ type: 'source', position: 'right', id: `${id}-value` }]}
    >
      <div className="bn-field">
        <label className="bn-field-label">Name</label>
        <input
          className="bn-input"
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </div>
      <div className="bn-field">
        <label className="bn-field-label">Type</label>
        <select className="bn-select" value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};