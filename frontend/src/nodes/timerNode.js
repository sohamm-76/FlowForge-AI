// timerNode.js
// Demonstrates: a number field, no target handle at all (source-only node, like a trigger).

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TimerNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [delay, setDelay] = useState(data?.delaySeconds ?? 5);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setDelay(value);
    updateNodeField(id, 'delaySeconds', value);
  };

  return (
    <BaseNode
      title="Timer"
      icon="◷"
      accent="#0891b2"
      handles={[{ type: 'source', position: 'right', id: `${id}-trigger` }]}
    >
      <div className="bn-field">
        <label className="bn-field-label">Delay (seconds)</label>
        <input
          className="bn-input"
          type="number"
          min="0"
          value={delay}
          onChange={handleChange}
        />
      </div>
    </BaseNode>
  );
};