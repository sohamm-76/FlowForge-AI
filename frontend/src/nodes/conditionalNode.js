// conditionalNode.js
// Demonstrates: one target handle, TWO source handles (branching true/false output) —
// shows BaseNode handling asymmetric in/out handle counts cleanly.

import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id }) => {
  return (
    <BaseNode
      title="Conditional"
      icon="⑂"
      accent="#dc2626"
      handles={[
        { type: 'target', position: 'left', id: `${id}-input` },
        { type: 'source', position: 'right', id: `${id}-true`, style: { top: '33%' } },
        { type: 'source', position: 'right', id: `${id}-false`, style: { top: '66%' } },
      ]}
    >
      <p className="bn-text-static">Routes to "true" or "false" output based on input.</p>
    </BaseNode>
  );
};