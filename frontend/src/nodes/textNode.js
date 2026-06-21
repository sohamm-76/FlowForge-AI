// textNode.js

import { useState, useRef, useEffect, useCallback } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

// Matches {{ variableName }} where variableName is a valid JS identifier.
// Allows optional whitespace inside the braces: {{input}}, {{ input }}, {{  input}}
const VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const found = [];
  const seen = new Set();
  let match;
  VARIABLE_REGEX.lastIndex = 0;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      found.push(name);
    }
  }
  return found;
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(currText));
  const [width, setWidth] = useState(240);

  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
    setVariables(extractVariables(value));
  };

  // Auto-resize: grow the textarea (and thus the node) to fit content,
  // both in height (line wraps / newlines) and width (up to a max).
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }

    if (measureRef.current) {
      const lines = currText.split('\n');
      let maxLineWidth = 0;
      lines.forEach((line) => {
        measureRef.current.textContent = line || ' ';
        maxLineWidth = Math.max(maxLineWidth, measureRef.current.offsetWidth);
      });
      const padding = 48;
      const minWidth = 220;
      const maxWidth = 420;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, maxLineWidth + padding));
      setWidth(newWidth);
    }
  }, [currText]);

  const getHandleStyle = useCallback((index, total) => {
    const top = total === 1 ? 50 : ((index + 1) / (total + 1)) * 100;
    return { top: `${top}%` };
  }, []);

  const handles = [
    ...variables.map((varName, i) => ({
      type: 'target',
      position: 'left',
      id: `${id}-${varName}`,
      style: getHandleStyle(i, variables.length),
      label: varName,
    })),
    { type: 'source', position: 'right', id: `${id}-output` },
  ];

  return (
    <BaseNode title="Text" icon="✎" handles={handles} width={width} height="auto">
      <div className="bn-field">
        <label className="bn-field-label">Text</label>
        <textarea
          ref={textareaRef}
          className="bn-textarea"
          value={currText}
          onChange={handleTextChange}
          rows={1}
        />
        <span
          ref={measureRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'pre',
            fontSize: '12px',
            fontFamily: 'inherit',
          }}
        />
      </div>
      {variables.length > 0 && (
        <div className="bn-text-static">
          Variables: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};