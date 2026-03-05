import React, { useEffect } from 'react';
import { CanvasProvider, useCanvas } from './context/CanvasContext';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

function AppContent() {
  const { state, actions } = useCanvas();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Delete selected objects
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (state.selectedIds.length > 0) {
          actions.deleteObjects(state.selectedIds);
        }
      }

      // Undo
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        actions.undo();
      }

      // Redo
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        actions.redo();
      }

      // Copy (Ctrl+C)
      if (e.ctrlKey && e.key === 'c') {
        if (state.selectedIds.length > 0) {
          const selectedObjects = state.objects.filter(obj => 
            state.selectedIds.includes(obj.id)
          );
          localStorage.setItem('clipboard', JSON.stringify(selectedObjects));
        }
      }

      // Paste (Ctrl+V)
      if (e.ctrlKey && e.key === 'v') {
        const clipboard = localStorage.getItem('clipboard');
        if (clipboard) {
          const objects = JSON.parse(clipboard);
          objects.forEach(obj => {
            actions.addObject({
              ...obj,
              x: obj.x + 20,
              y: obj.y + 20,
            });
          });
        }
      }

      // Escape to deselect
      if (e.key === 'Escape') {
        actions.clearSelection();
        actions.setActiveTool('select');
      }

      // Tool shortcuts
      if (e.key === 'v' || e.key === 'V') actions.setActiveTool('select');
      if (e.key === 'm' || e.key === 'M') actions.setActiveTool('move');
      if (e.key === 'a' || e.key === 'A') actions.setActiveTool('arrow');
      if (e.key === 'l' || e.key === 'L') actions.setActiveTool('line');
      if (e.key === 'c' && !e.ctrlKey) actions.setActiveTool('circle');
      if (e.key === 'r' || e.key === 'R') actions.setActiveTool('rectangle');
      if (e.key === 't' || e.key === 'T') actions.setActiveTool('text');
      if (e.key === 'i' || e.key === 'I') actions.setActiveTool('icon');
      if (e.key === 'f' || e.key === 'F') actions.setActiveTool('fog');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedIds, state.objects, actions]);

  return (
    <div className="h-screen w-screen flex flex-col bg-dark-300 overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Toolbar />
        <LeftPanel />
        <Canvas />
        <RightPanel />
      </div>
    </div>
  );
}

function App() {
  return (
    <CanvasProvider>
      <AppContent />
    </CanvasProvider>
  );
}

export default App;
