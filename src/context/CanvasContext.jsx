import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialState = {
  // Map state
  mapImage: null,
  mapScale: 1,
  mapPosition: { x: 0, y: 0 },
  
  // Canvas settings
  showGrid: false,
  gridSize: 50,
  snapToGrid: false,
  
  // Tool state
  activeTool: 'select', // select, move, arrow, line, circle, rectangle, text, icon, fog
  
  // Objects on canvas
  objects: [],
  selectedIds: [],
  
  // Drawing settings
  strokeColor: '#89b4fa',
  fillColor: '#89b4fa33',
  strokeWidth: 3,
  
  // Text settings
  fontSize: 16,
  fontColor: '#ffffff',
  
  // Fog of War
  fogEnabled: false,
  fogOpacity: 0.7,
  fogReveals: [], // Array of reveal areas
  
  // Vision settings
  visionEnabled: false,
  visionRadius: 100,
  visionAngle: 90,
  
  // History for undo/redo
  history: [],
  historyIndex: -1,
  
  // Layers
  layers: [
    { id: 'map', name: 'Map', visible: true, locked: true },
    { id: 'shapes', name: 'Shapes', visible: true, locked: false },
    { id: 'icons', name: 'Icons', visible: true, locked: false },
    { id: 'text', name: 'Text', visible: true, locked: false },
    { id: 'fog', name: 'Fog of War', visible: true, locked: false },
  ],
};

// Action types
const ActionTypes = {
  SET_MAP: 'SET_MAP',
  SET_MAP_SCALE: 'SET_MAP_SCALE',
  SET_MAP_POSITION: 'SET_MAP_POSITION',
  RESET_MAP_VIEW: 'RESET_MAP_VIEW',
  
  SET_ACTIVE_TOOL: 'SET_ACTIVE_TOOL',
  
  ADD_OBJECT: 'ADD_OBJECT',
  UPDATE_OBJECT: 'UPDATE_OBJECT',
  DELETE_OBJECTS: 'DELETE_OBJECTS',
  SET_SELECTED_IDS: 'SET_SELECTED_IDS',
  CLEAR_SELECTION: 'CLEAR_SELECTION',
  
  SET_STROKE_COLOR: 'SET_STROKE_COLOR',
  SET_FILL_COLOR: 'SET_FILL_COLOR',
  SET_STROKE_WIDTH: 'SET_STROKE_WIDTH',
  SET_FONT_SIZE: 'SET_FONT_SIZE',
  SET_FONT_COLOR: 'SET_FONT_COLOR',
  
  TOGGLE_GRID: 'TOGGLE_GRID',
  SET_GRID_SIZE: 'SET_GRID_SIZE',
  TOGGLE_SNAP_TO_GRID: 'TOGGLE_SNAP_TO_GRID',
  
  TOGGLE_FOG: 'TOGGLE_FOG',
  SET_FOG_OPACITY: 'SET_FOG_OPACITY',
  ADD_FOG_REVEAL: 'ADD_FOG_REVEAL',
  REMOVE_FOG_REVEAL: 'REMOVE_FOG_REVEAL',
  
  TOGGLE_VISION: 'TOGGLE_VISION',
  SET_VISION_RADIUS: 'SET_VISION_RADIUS',
  SET_VISION_ANGLE: 'SET_VISION_ANGLE',
  
  TOGGLE_LAYER_VISIBILITY: 'TOGGLE_LAYER_VISIBILITY',
  TOGGLE_LAYER_LOCK: 'TOGGLE_LAYER_LOCK',
  
  UNDO: 'UNDO',
  REDO: 'REDO',
  SAVE_HISTORY: 'SAVE_HISTORY',
  
  LOAD_STRATEGY: 'LOAD_STRATEGY',
  CLEAR_CANVAS: 'CLEAR_CANVAS',
};

// Reducer function
function canvasReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_MAP:
      return { ...state, mapImage: action.payload };
    
    case ActionTypes.SET_MAP_SCALE:
      return { ...state, mapScale: Math.max(0.1, Math.min(5, action.payload)) };
    
    case ActionTypes.SET_MAP_POSITION:
      return { ...state, mapPosition: action.payload };
    
    case ActionTypes.RESET_MAP_VIEW:
      return { ...state, mapScale: 1, mapPosition: { x: 0, y: 0 } };
    
    case ActionTypes.SET_ACTIVE_TOOL:
      return { ...state, activeTool: action.payload };
    
    case ActionTypes.ADD_OBJECT: {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push([...state.objects]);
      return {
        ...state,
        objects: [...state.objects, { ...action.payload, id: uuidv4() }],
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }
    
    case ActionTypes.UPDATE_OBJECT: {
      const newObjects = state.objects.map(obj =>
        obj.id === action.payload.id ? { ...obj, ...action.payload.updates } : obj
      );
      return { ...state, objects: newObjects };
    }
    
    case ActionTypes.DELETE_OBJECTS: {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push([...state.objects]);
      return {
        ...state,
        objects: state.objects.filter(obj => !action.payload.includes(obj.id)),
        selectedIds: [],
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }
    
    case ActionTypes.SET_SELECTED_IDS:
      return { ...state, selectedIds: action.payload };
    
    case ActionTypes.CLEAR_SELECTION:
      return { ...state, selectedIds: [] };
    
    case ActionTypes.SET_STROKE_COLOR:
      return { ...state, strokeColor: action.payload };
    
    case ActionTypes.SET_FILL_COLOR:
      return { ...state, fillColor: action.payload };
    
    case ActionTypes.SET_STROKE_WIDTH:
      return { ...state, strokeWidth: action.payload };
    
    case ActionTypes.SET_FONT_SIZE:
      return { ...state, fontSize: action.payload };
    
    case ActionTypes.SET_FONT_COLOR:
      return { ...state, fontColor: action.payload };
    
    case ActionTypes.TOGGLE_GRID:
      return { ...state, showGrid: !state.showGrid };
    
    case ActionTypes.SET_GRID_SIZE:
      return { ...state, gridSize: action.payload };
    
    case ActionTypes.TOGGLE_SNAP_TO_GRID:
      return { ...state, snapToGrid: !state.snapToGrid };
    
    case ActionTypes.TOGGLE_FOG:
      return { ...state, fogEnabled: !state.fogEnabled };
    
    case ActionTypes.SET_FOG_OPACITY:
      return { ...state, fogOpacity: action.payload };
    
    case ActionTypes.ADD_FOG_REVEAL:
      return { ...state, fogReveals: [...state.fogReveals, { ...action.payload, id: uuidv4() }] };
    
    case ActionTypes.REMOVE_FOG_REVEAL:
      return { ...state, fogReveals: state.fogReveals.filter(r => r.id !== action.payload) };
    
    case ActionTypes.TOGGLE_VISION:
      return { ...state, visionEnabled: !state.visionEnabled };
    
    case ActionTypes.SET_VISION_RADIUS:
      return { ...state, visionRadius: action.payload };
    
    case ActionTypes.SET_VISION_ANGLE:
      return { ...state, visionAngle: action.payload };
    
    case ActionTypes.TOGGLE_LAYER_VISIBILITY: {
      const layers = state.layers.map(layer =>
        layer.id === action.payload ? { ...layer, visible: !layer.visible } : layer
      );
      return { ...state, layers };
    }
    
    case ActionTypes.TOGGLE_LAYER_LOCK: {
      const layers = state.layers.map(layer =>
        layer.id === action.payload ? { ...layer, locked: !layer.locked } : layer
      );
      return { ...state, layers };
    }
    
    case ActionTypes.UNDO: {
      if (state.historyIndex < 0) return state;
      return {
        ...state,
        objects: state.history[state.historyIndex] || [],
        historyIndex: state.historyIndex - 1,
      };
    }
    
    case ActionTypes.REDO: {
      if (state.historyIndex >= state.history.length - 1) return state;
      return {
        ...state,
        objects: state.history[state.historyIndex + 1] || [],
        historyIndex: state.historyIndex + 1,
      };
    }
    
    case ActionTypes.SAVE_HISTORY: {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push([...state.objects]);
      return {
        ...state,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }
    
    case ActionTypes.LOAD_STRATEGY:
      return {
        ...state,
        ...action.payload,
        history: [],
        historyIndex: -1,
      };
    
    case ActionTypes.CLEAR_CANVAS:
      return {
        ...initialState,
        history: [],
        historyIndex: -1,
      };
    
    default:
      return state;
  }
}

// Create context
const CanvasContext = createContext(null);

// Provider component
export function CanvasProvider({ children }) {
  const [state, dispatch] = useReducer(canvasReducer, initialState);

  // Action creators
  const actions = {
    setMap: useCallback((imageData) => {
      dispatch({ type: ActionTypes.SET_MAP, payload: imageData });
    }, []),

    setMapScale: useCallback((scale) => {
      dispatch({ type: ActionTypes.SET_MAP_SCALE, payload: scale });
    }, []),

    setMapPosition: useCallback((position) => {
      dispatch({ type: ActionTypes.SET_MAP_POSITION, payload: position });
    }, []),

    resetMapView: useCallback(() => {
      dispatch({ type: ActionTypes.RESET_MAP_VIEW });
    }, []),

    setActiveTool: useCallback((tool) => {
      dispatch({ type: ActionTypes.SET_ACTIVE_TOOL, payload: tool });
    }, []),

    addObject: useCallback((object) => {
      dispatch({ type: ActionTypes.ADD_OBJECT, payload: object });
    }, []),

    updateObject: useCallback((id, updates) => {
      dispatch({ type: ActionTypes.UPDATE_OBJECT, payload: { id, updates } });
    }, []),

    deleteObjects: useCallback((ids) => {
      dispatch({ type: ActionTypes.DELETE_OBJECTS, payload: ids });
    }, []),

    setSelectedIds: useCallback((ids) => {
      dispatch({ type: ActionTypes.SET_SELECTED_IDS, payload: ids });
    }, []),

    clearSelection: useCallback(() => {
      dispatch({ type: ActionTypes.CLEAR_SELECTION });
    }, []),

    setStrokeColor: useCallback((color) => {
      dispatch({ type: ActionTypes.SET_STROKE_COLOR, payload: color });
    }, []),

    setFillColor: useCallback((color) => {
      dispatch({ type: ActionTypes.SET_FILL_COLOR, payload: color });
    }, []),

    setStrokeWidth: useCallback((width) => {
      dispatch({ type: ActionTypes.SET_STROKE_WIDTH, payload: width });
    }, []),

    setFontSize: useCallback((size) => {
      dispatch({ type: ActionTypes.SET_FONT_SIZE, payload: size });
    }, []),

    setFontColor: useCallback((color) => {
      dispatch({ type: ActionTypes.SET_FONT_COLOR, payload: color });
    }, []),

    toggleGrid: useCallback(() => {
      dispatch({ type: ActionTypes.TOGGLE_GRID });
    }, []),

    setGridSize: useCallback((size) => {
      dispatch({ type: ActionTypes.SET_GRID_SIZE, payload: size });
    }, []),

    toggleSnapToGrid: useCallback(() => {
      dispatch({ type: ActionTypes.TOGGLE_SNAP_TO_GRID });
    }, []),

    toggleFog: useCallback(() => {
      dispatch({ type: ActionTypes.TOGGLE_FOG });
    }, []),

    setFogOpacity: useCallback((opacity) => {
      dispatch({ type: ActionTypes.SET_FOG_OPACITY, payload: opacity });
    }, []),

    addFogReveal: useCallback((reveal) => {
      dispatch({ type: ActionTypes.ADD_FOG_REVEAL, payload: reveal });
    }, []),

    removeFogReveal: useCallback((id) => {
      dispatch({ type: ActionTypes.REMOVE_FOG_REVEAL, payload: id });
    }, []),

    toggleVision: useCallback(() => {
      dispatch({ type: ActionTypes.TOGGLE_VISION });
    }, []),

    setVisionRadius: useCallback((radius) => {
      dispatch({ type: ActionTypes.SET_VISION_RADIUS, payload: radius });
    }, []),

    setVisionAngle: useCallback((angle) => {
      dispatch({ type: ActionTypes.SET_VISION_ANGLE, payload: angle });
    }, []),

    toggleLayerVisibility: useCallback((layerId) => {
      dispatch({ type: ActionTypes.TOGGLE_LAYER_VISIBILITY, payload: layerId });
    }, []),

    toggleLayerLock: useCallback((layerId) => {
      dispatch({ type: ActionTypes.TOGGLE_LAYER_LOCK, payload: layerId });
    }, []),

    undo: useCallback(() => {
      dispatch({ type: ActionTypes.UNDO });
    }, []),

    redo: useCallback(() => {
      dispatch({ type: ActionTypes.REDO });
    }, []),

    saveHistory: useCallback(() => {
      dispatch({ type: ActionTypes.SAVE_HISTORY });
    }, []),

    loadStrategy: useCallback((strategy) => {
      dispatch({ type: ActionTypes.LOAD_STRATEGY, payload: strategy });
    }, []),

    clearCanvas: useCallback(() => {
      dispatch({ type: ActionTypes.CLEAR_CANVAS });
    }, []),
  };

  return (
    <CanvasContext.Provider value={{ state, actions }}>
      {children}
    </CanvasContext.Provider>
  );
}

// Custom hook to use canvas context
export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
}

export { ActionTypes };
