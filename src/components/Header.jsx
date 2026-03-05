import React, { useRef } from 'react';
import { useCanvas } from '../context/CanvasContext';

// Icons as simple SVG components
const Icons = {
  Upload: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  Save: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
  Load: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Export: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Undo: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    </svg>
  ),
  Redo: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
    </svg>
  ),
  Clear: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
};

function Header() {
  const { state, actions } = useCanvas();
  const mapInputRef = useRef(null);
  const strategyInputRef = useRef(null);

  // Handle map upload
  const handleMapUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        actions.setMap(event.target.result);
        actions.resetMapView();
      };
      reader.readAsDataURL(file);
    }
  };

  // Save strategy as JSON
  const saveStrategy = () => {
    const strategy = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      map: state.mapImage,
      objects: state.objects,
      fogEnabled: state.fogEnabled,
      fogOpacity: state.fogOpacity,
      fogReveals: state.fogReveals,
      visionEnabled: state.visionEnabled,
      visionRadius: state.visionRadius,
      visionAngle: state.visionAngle,
    };

    const blob = new Blob([JSON.stringify(strategy, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `strategy-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load strategy from JSON
  const loadStrategy = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const strategy = JSON.parse(event.target.result);
          actions.loadStrategy({
            mapImage: strategy.map,
            objects: strategy.objects || [],
            fogEnabled: strategy.fogEnabled || false,
            fogOpacity: strategy.fogOpacity || 0.7,
            fogReveals: strategy.fogReveals || [],
            visionEnabled: strategy.visionEnabled || false,
            visionRadius: strategy.visionRadius || 100,
            visionAngle: strategy.visionAngle || 90,
          });
        } catch (err) {
          alert('Invalid strategy file');
        }
      };
      reader.readAsText(file);
    }
  };

  // Export as PNG
  const exportImage = () => {
    const stage = document.querySelector('.konvajs-content canvas');
    if (stage) {
      const link = document.createElement('a');
      link.download = `map-strategy-${Date.now()}.png`;
      link.href = stage.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <header className="h-14 bg-dark-200 border-b border-gray-700 flex items-center justify-between px-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
          <span className="text-dark-300 font-bold text-lg">M</span>
        </div>
        <h1 className="text-lg font-bold text-white">Map Analyst</h1>
      </div>

      {/* Center Actions */}
      <div className="flex items-center gap-2">
        {/* Upload Map */}
        <button
          onClick={() => mapInputRef.current?.click()}
          className="btn btn-secondary flex items-center gap-2"
          title="Upload Map Image"
        >
          <Icons.Upload />
          <span className="hidden sm:inline">Upload Map</span>
        </button>
        <input
          ref={mapInputRef}
          type="file"
          accept="image/*"
          onChange={handleMapUpload}
          className="hidden"
        />

        <div className="w-px h-6 bg-gray-600 mx-1" />

        {/* Undo */}
        <button
          onClick={actions.undo}
          className="tool-btn"
          title="Undo (Ctrl+Z)"
        >
          <Icons.Undo />
        </button>

        {/* Redo */}
        <button
          onClick={actions.redo}
          className="tool-btn"
          title="Redo (Ctrl+Y)"
        >
          <Icons.Redo />
        </button>

        <div className="w-px h-6 bg-gray-600 mx-1" />

        {/* Clear Canvas */}
        <button
          onClick={() => {
            if (confirm('Clear all objects from canvas?')) {
              actions.clearCanvas();
            }
          }}
          className="tool-btn text-accent-danger hover:bg-red-500/20"
          title="Clear Canvas"
        >
          <Icons.Clear />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Load Strategy */}
        <button
          onClick={() => strategyInputRef.current?.click()}
          className="btn btn-secondary flex items-center gap-2"
          title="Load Strategy"
        >
          <Icons.Load />
          <span className="hidden sm:inline">Load</span>
        </button>
        <input
          ref={strategyInputRef}
          type="file"
          accept=".json"
          onChange={loadStrategy}
          className="hidden"
        />

        {/* Save Strategy */}
        <button
          onClick={saveStrategy}
          className="btn btn-secondary flex items-center gap-2"
          title="Save Strategy"
        >
          <Icons.Save />
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Export Image */}
        <button
          onClick={exportImage}
          className="btn btn-primary flex items-center gap-2"
          title="Export as PNG"
        >
          <Icons.Export />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
