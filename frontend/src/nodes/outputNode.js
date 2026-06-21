// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <BaseNode
      title="Output"
      icon="↲"
      handles={[{ type: 'target', position: 'left', id: `${id}-value` }]}
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
        <select className="bn-select" value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};