// apiNode.js
// Demonstrates: multiple fields (select + text), single in/out handle, larger width.

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

export const ApiNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    updateNodeField(id, 'method', e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    updateNodeField(id, 'url', e.target.value);
  };

  return (
    <BaseNode
      title="API Call"
      icon="⇄"
      accent="#9333ea"
      width={240}
      handles={[
        { type: 'target', position: 'left', id: `${id}-payload` },
        { type: 'source', position: 'right', id: `${id}-response` },
      ]}
    >
      <div className="bn-field">
        <label className="bn-field-label">Method</label>
        <select className="bn-select" value={method} onChange={handleMethodChange}>
          {METHODS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="bn-field">
        <label className="bn-field-label">URL</label>
        <input
          className="bn-input"
          type="text"
          placeholder="https://api.example.com"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
    </BaseNode>
  );
};