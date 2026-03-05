import React, { useState } from 'react';
import { useCanvas } from '../context/CanvasContext';

const PanelIcons = {
  Chevron: ({ open }) => (
    <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
};

function RightPanel() {
  const { state, actions } = useCanvas();
  const [drawingOpen, setDrawingOpen] = useState(true);
  const [fogOpen, setFogOpen] = useState(true);
  const [visionOpen, setVisionOpen] = useState(true);
  const [gridOpen, setGridOpen] = useState(false);

  // Get selected object
  const selectedObject = state.selectedIds.length === 1
    ? state.objects.find(obj => obj.id === state.selectedIds[0])
    : null;

  return (
    <div className="w-64 bg-dark-200 border-l border-gray-700 flex flex-col overflow-auto">
      {/* Selection Properties */}
      {selectedObject && (
        <div className="border-b border-gray-700 p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-sm">Selected: {selectedObject.type}</span>
            <button
              onClick={() => actions.deleteObjects([selectedObject.id])}
              className="p-1 text-accent-danger hover:bg-red-500/20 rounded"
              title="Delete"
            >
              <PanelIcons.Trash />
            </button>
          </div>
          
          {/* Position */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="text-xs text-gray-400">X</label>
              <input
                type="number"
                value={Math.round(selectedObject.x || 0)}
                onChange={(e) => actions.updateObject(selectedObject.id, { x: Number(e.target.value) })}
                className="input text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Y</label>
              <input
                type="number"
                value={Math.round(selectedObject.y || 0)}
                onChange={(e) => actions.updateObject(selectedObject.id, { y: Number(e.target.value) })}
                className="input text-sm"
              />
            </div>
          </div>

          {/* Color for shapes */}
          {['arrow', 'line', 'circle', 'rectangle'].includes(selectedObject.type) && (
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs text-gray-400">Color</label>
              <input
                type="color"
                value={selectedObject.stroke}
                onChange={(e) => actions.updateObject(selectedObject.id, { 
                  stroke: e.target.value,
                  fill: e.target.value + '33'
                })}
              />
            </div>
          )}

          {/* Text specific */}
          {selectedObject.type === 'text' && (
            <>
              <div className="mb-2">
                <label className="text-xs text-gray-400">Text</label>
                <input
                  type="text"
                  value={selectedObject.text}
                  onChange={(e) => actions.updateObject(selectedObject.id, { text: e.target.value })}
                  className="input text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-400">Size</label>
                <input
                  type="range"
                  min="10"
                  max="48"
                  value={selectedObject.fontSize}
                  onChange={(e) => actions.updateObject(selectedObject.id, { fontSize: Number(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-xs w-8">{selectedObject.fontSize}</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Drawing Settings */}
      <div className="border-b border-gray-700">
        <button
          onClick={() => setDrawingOpen(!drawingOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-semibold hover:bg-dark-100"
        >
          <span>Drawing Settings</span>
          <PanelIcons.Chevron open={drawingOpen} />
        </button>
        {drawingOpen && (
          <div className="p-3 space-y-3">
            {/* Stroke Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Stroke Color</label>
              <input
                type="color"
                value={state.strokeColor}
                onChange={(e) => actions.setStrokeColor(e.target.value)}
              />
            </div>

            {/* Fill Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Fill Color</label>
              <input
                type="color"
                value={state.fillColor.slice(0, 7)}
                onChange={(e) => actions.setFillColor(e.target.value + '33')}
              />
            </div>

            {/* Stroke Width */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <label className="text-gray-400">Stroke Width</label>
                <span>{state.strokeWidth}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={state.strokeWidth}
                onChange={(e) => actions.setStrokeWidth(Number(e.target.value))}
              />
            </div>

            {/* Font Size */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <label className="text-gray-400">Text Size</label>
                <span>{state.fontSize}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="48"
                value={state.fontSize}
                onChange={(e) => actions.setFontSize(Number(e.target.value))}
              />
            </div>

            {/* Font Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Text Color</label>
              <input
                type="color"
                value={state.fontColor}
                onChange={(e) => actions.setFontColor(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Fog of War */}
      <div className="border-b border-gray-700">
        <button
          onClick={() => setFogOpen(!fogOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-semibold hover:bg-dark-100"
        >
          <span>Fog of War</span>
          <PanelIcons.Chevron open={fogOpen} />
        </button>
        {fogOpen && (
          <div className="p-3 space-y-3">
            {/* Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Enable Fog</label>
              <button
                onClick={actions.toggleFog}
                className={`w-12 h-6 rounded-full transition-colors ${
                  state.fogEnabled ? 'bg-accent-primary' : 'bg-dark-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    state.fogEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Opacity */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <label className="text-gray-400">Fog Opacity</label>
                <span>{Math.round(state.fogOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.fogOpacity * 100}
                onChange={(e) => actions.setFogOpacity(Number(e.target.value) / 100)}
                disabled={!state.fogEnabled}
              />
            </div>

            {/* Reveals count */}
            <div className="text-xs text-gray-500">
              {state.fogReveals.length} reveal areas
              {state.fogReveals.length > 0 && (
                <button
                  onClick={() => {
                    state.fogReveals.forEach(r => actions.removeFogReveal(r.id));
                  }}
                  className="ml-2 text-accent-danger hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Vision Settings */}
      <div className="border-b border-gray-700">
        <button
          onClick={() => setVisionOpen(!visionOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-semibold hover:bg-dark-100"
        >
          <span>Vision Cones</span>
          <PanelIcons.Chevron open={visionOpen} />
        </button>
        {visionOpen && (
          <div className="p-3 space-y-3">
            {/* Radius */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <label className="text-gray-400">Vision Radius</label>
                <span>{state.visionRadius}px</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                value={state.visionRadius}
                onChange={(e) => actions.setVisionRadius(Number(e.target.value))}
              />
            </div>

            {/* Angle */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <label className="text-gray-400">Vision Angle</label>
                <span>{state.visionAngle}°</span>
              </div>
              <input
                type="range"
                min="30"
                max="180"
                value={state.visionAngle}
                onChange={(e) => actions.setVisionAngle(Number(e.target.value))}
              />
            </div>

            <p className="text-xs text-gray-500">
              Click on canvas with Vision tool to add cones. Drag to reposition, use transformer to rotate.
            </p>
          </div>
        )}
      </div>

      {/* Grid Settings */}
      <div className="border-b border-gray-700">
        <button
          onClick={() => setGridOpen(!gridOpen)}
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-semibold hover:bg-dark-100"
        >
          <span>Grid Settings</span>
          <PanelIcons.Chevron open={gridOpen} />
        </button>
        {gridOpen && (
          <div className="p-3 space-y-3">
            {/* Toggle Grid */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Show Grid</label>
              <button
                onClick={actions.toggleGrid}
                className={`w-12 h-6 rounded-full transition-colors ${
                  state.showGrid ? 'bg-accent-primary' : 'bg-dark-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    state.showGrid ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Grid Size */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <label className="text-gray-400">Grid Size</label>
                <span>{state.gridSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={state.gridSize}
                onChange={(e) => actions.setGridSize(Number(e.target.value))}
                disabled={!state.showGrid}
              />
            </div>

            {/* Snap to Grid */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Snap to Grid</label>
              <button
                onClick={actions.toggleSnapToGrid}
                className={`w-12 h-6 rounded-full transition-colors ${
                  state.snapToGrid ? 'bg-accent-primary' : 'bg-dark-300'
                }`}
                disabled={!state.showGrid}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    state.snapToGrid ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="p-3 mt-auto">
        <h4 className="text-xs font-semibold text-gray-500 mb-2">SHORTCUTS</h4>
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Delete</span>
            <kbd className="px-1 bg-dark-300 rounded">Del</kbd>
          </div>
          <div className="flex justify-between">
            <span>Undo</span>
            <kbd className="px-1 bg-dark-300 rounded">Ctrl+Z</kbd>
          </div>
          <div className="flex justify-between">
            <span>Redo</span>
            <kbd className="px-1 bg-dark-300 rounded">Ctrl+Y</kbd>
          </div>
          <div className="flex justify-between">
            <span>Copy</span>
            <kbd className="px-1 bg-dark-300 rounded">Ctrl+C</kbd>
          </div>
          <div className="flex justify-between">
            <span>Paste</span>
            <kbd className="px-1 bg-dark-300 rounded">Ctrl+V</kbd>
          </div>
          <div className="flex justify-between">
            <span>Deselect</span>
            <kbd className="px-1 bg-dark-300 rounded">Esc</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
