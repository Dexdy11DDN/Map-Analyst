import React, { useState } from 'react';
import { useCanvas } from '../context/CanvasContext';

// Icon types available
const iconTypes = [
  { id: 'player', name: 'Player', color: '#89b4fa' },
  { id: 'enemy', name: 'Enemy', color: '#f38ba8' },
  { id: 'bomb', name: 'Bomb', color: '#f9e2af' },
  { id: 'smoke', name: 'Smoke', color: '#6c7086' },
  { id: 'flash', name: 'Flash', color: '#f9e2af' },
  { id: 'objective', name: 'Objective', color: '#a6e3a1' },
  { id: 'pin', name: 'Pin Marker', color: '#89b4fa' },
];

// Icons
const PanelIcons = {
  Eye: ({ visible }) => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {visible ? (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </>
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      )}
    </svg>
  ),
  Lock: ({ locked }) => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {locked ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      )}
    </svg>
  ),
  Chevron: ({ open }) => (
    <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
};

function LeftPanel() {
  const { state, actions } = useCanvas();
  const [iconsOpen, setIconsOpen] = useState(true);
  const [layersOpen, setLayersOpen] = useState(true);
  const [selectedIconType, setSelectedIconType] = useState('player');

  // Handle icon type selection
  const handleIconSelect = (iconType) => {
    setSelectedIconType(iconType);
    // Store in state for use when placing icons
    actions.setActiveTool('icon');
    // We'll need to add this to context, for now just use local state
  };

  return (
    <div className="w-64 bg-dark-200 border-r border-gray-700 flex flex-col overflow-hidden">
      {/* Icons Section */}
      <div className="border-b border-gray-700">
        <button
          onClick={() => setIconsOpen(!iconsOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-semibold hover:bg-dark-100"
        >
          <span>Icons / Markers</span>
          <PanelIcons.Chevron open={iconsOpen} />
        </button>
        {iconsOpen && (
          <div className="p-3 grid grid-cols-3 gap-2">
            {iconTypes.map((icon) => (
              <button
                key={icon.id}
                onClick={() => handleIconSelect(icon.id)}
                className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                  selectedIconType === icon.id
                    ? 'bg-accent-primary/20 ring-1 ring-accent-primary'
                    : 'hover:bg-dark-100'
                }`}
                title={icon.name}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: icon.color }}
                >
                  {icon.id === 'player' && 'P'}
                  {icon.id === 'enemy' && 'E'}
                  {icon.id === 'bomb' && '💣'}
                  {icon.id === 'smoke' && 'S'}
                  {icon.id === 'flash' && '⚡'}
                  {icon.id === 'objective' && '★'}
                  {icon.id === 'pin' && '📍'}
                </div>
                <span className="text-xs text-gray-400">{icon.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Layers Section */}
      <div className="flex-1 overflow-auto">
        <button
          onClick={() => setLayersOpen(!layersOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-semibold hover:bg-dark-100 border-b border-gray-700"
        >
          <span>Layers</span>
          <PanelIcons.Chevron open={layersOpen} />
        </button>
        {layersOpen && (
          <div className="p-2">
            {state.layers.map((layer) => (
              <div
                key={layer.id}
                className="flex items-center justify-between px-2 py-2 rounded hover:bg-dark-100"
              >
                <span className="text-sm">{layer.name}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => actions.toggleLayerVisibility(layer.id)}
                    className={`p-1 rounded hover:bg-dark-300 ${
                      layer.visible ? 'text-accent-primary' : 'text-gray-500'
                    }`}
                    title={layer.visible ? 'Hide layer' : 'Show layer'}
                  >
                    <PanelIcons.Eye visible={layer.visible} />
                  </button>
                  <button
                    onClick={() => actions.toggleLayerLock(layer.id)}
                    className={`p-1 rounded hover:bg-dark-300 ${
                      layer.locked ? 'text-accent-warning' : 'text-gray-500'
                    }`}
                    title={layer.locked ? 'Unlock layer' : 'Lock layer'}
                  >
                    <PanelIcons.Lock locked={layer.locked} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Objects count */}
      <div className="px-3 py-2 border-t border-gray-700 text-xs text-gray-500">
        {state.objects.length} objects on canvas
      </div>
    </div>
  );
}

export default LeftPanel;
