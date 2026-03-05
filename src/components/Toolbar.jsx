import React from 'react';
import { useCanvas } from '../context/CanvasContext';

// Tool icons as SVG components
const ToolIcons = {
  select: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  move: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  arrow: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  line: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20L20 4" />
    </svg>
  ),
  circle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
    </svg>
  ),
  rectangle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
    </svg>
  ),
  text: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  ),
  icon: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  fog: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  vision: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
};

const tools = [
  { id: 'select', name: 'Select', shortcut: 'V' },
  { id: 'move', name: 'Move Canvas', shortcut: 'M' },
  { id: 'divider1', type: 'divider' },
  { id: 'arrow', name: 'Arrow', shortcut: 'A' },
  { id: 'line', name: 'Line', shortcut: 'L' },
  { id: 'circle', name: 'Circle', shortcut: 'C' },
  { id: 'rectangle', name: 'Rectangle', shortcut: 'R' },
  { id: 'divider2', type: 'divider' },
  { id: 'text', name: 'Text', shortcut: 'T' },
  { id: 'icon', name: 'Icon/Pin', shortcut: 'I' },
  { id: 'divider3', type: 'divider' },
  { id: 'fog', name: 'Fog Reveal', shortcut: 'F' },
  { id: 'vision', name: 'Vision Cone', shortcut: 'G' },
];

function Toolbar() {
  const { state, actions } = useCanvas();

  return (
    <div className="w-14 bg-dark-200 border-r border-gray-700 flex flex-col items-center py-3 gap-1">
      {tools.map((tool) => {
        if (tool.type === 'divider') {
          return <div key={tool.id} className="w-8 h-px bg-gray-700 my-2" />;
        }

        const Icon = ToolIcons[tool.id];
        const isActive = state.activeTool === tool.id;

        return (
          <button
            key={tool.id}
            onClick={() => actions.setActiveTool(tool.id)}
            className={`tool-btn ${isActive ? 'active' : ''}`}
            title={`${tool.name} (${tool.shortcut})`}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}

export default Toolbar;
