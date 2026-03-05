import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer, Image, Line, Arrow, Circle, Rect, Text, Group, Wedge, Transformer } from 'react-konva';
import { useCanvas } from '../context/CanvasContext';
import useImage from 'use-image';

// Grid component
function Grid({ width, height, gridSize, scale }) {
  const lines = [];
  const scaledGrid = gridSize;

  // Vertical lines
  for (let i = 0; i <= width / scaledGrid; i++) {
    lines.push(
      <Line
        key={`v-${i}`}
        points={[i * scaledGrid, 0, i * scaledGrid, height]}
        stroke="#374151"
        strokeWidth={1 / scale}
        opacity={0.5}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i <= height / scaledGrid; i++) {
    lines.push(
      <Line
        key={`h-${i}`}
        points={[0, i * scaledGrid, width, i * scaledGrid]}
        stroke="#374151"
        strokeWidth={1 / scale}
        opacity={0.5}
      />
    );
  }

  return <>{lines}</>;
}

// Map Image component
function MapImage({ src }) {
  const [image] = useImage(src);
  return image ? <Image image={image} /> : null;
}

// Fog of War component
function FogOfWar({ width, height, opacity, reveals }) {
  // Create a dark overlay with holes for revealed areas
  return (
    <Group>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#000000"
        opacity={opacity}
        globalCompositeOperation="source-over"
      />
      {reveals.map((reveal) => (
        <Circle
          key={reveal.id}
          x={reveal.x}
          y={reveal.y}
          radius={reveal.radius || 80}
          fill="#000000"
          globalCompositeOperation="destination-out"
        />
      ))}
    </Group>
  );
}

// Vision Cone component
function VisionCone({ x, y, rotation, radius, angle, color }) {
  return (
    <Wedge
      x={x}
      y={y}
      rotation={rotation - angle / 2}
      radius={radius}
      angle={angle}
      fill={color}
      opacity={0.3}
      stroke={color}
      strokeWidth={2}
    />
  );
}

// Draggable/Selectable shape components
function DraggableArrow({ shape, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Arrow
        ref={shapeRef}
        points={shape.points}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        fill={shape.stroke}
        pointerLength={10}
        pointerWidth={10}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          const node = e.target;
          onChange({
            x: node.x(),
            y: node.y(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
          enabledAnchors={['middle-left', 'middle-right']}
        />
      )}
    </>
  );
}

function DraggableLine({ shape, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Line
        ref={shapeRef}
        points={shape.points}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        lineCap="round"
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
          enabledAnchors={['middle-left', 'middle-right']}
        />
      )}
    </>
  );
}

function DraggableCircle({ shape, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Circle
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        radius={shape.radius}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        fill={shape.fill}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            radius: node.radius() * scaleX,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        />
      )}
    </>
  );
}

function DraggableRect({ shape, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        fill={shape.fill}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
        />
      )}
    </>
  );
}

function DraggableText({ shape, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        text={shape.text}
        fontSize={shape.fontSize}
        fill={shape.fill}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onDblClick={(e) => {
          const newText = prompt('Edit text:', shape.text);
          if (newText !== null) {
            onChange({ text: newText });
          }
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
          enabledAnchors={['middle-left', 'middle-right']}
        />
      )}
    </>
  );
}

function DraggableIcon({ shape, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // Different icon shapes based on iconType
  const getIconPath = () => {
    const size = shape.size || 30;
    switch (shape.iconType) {
      case 'player':
        return (
          <Group ref={shapeRef} x={shape.x} y={shape.y} draggable onClick={onSelect} onTap={onSelect}
            onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}>
            <Circle radius={size / 2} fill={shape.fill} stroke={shape.stroke} strokeWidth={2} />
            <Text text={shape.label || 'P'} fontSize={size * 0.5} fill="#fff" offsetX={size * 0.15} offsetY={size * 0.2} />
          </Group>
        );
      case 'enemy':
        return (
          <Group ref={shapeRef} x={shape.x} y={shape.y} draggable onClick={onSelect} onTap={onSelect}
            onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}>
            <Circle radius={size / 2} fill="#f38ba8" stroke="#fff" strokeWidth={2} />
            <Text text="E" fontSize={size * 0.5} fill="#fff" offsetX={size * 0.12} offsetY={size * 0.2} />
          </Group>
        );
      case 'bomb':
        return (
          <Group ref={shapeRef} x={shape.x} y={shape.y} draggable onClick={onSelect} onTap={onSelect}
            onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}>
            <Circle radius={size / 2} fill="#f9e2af" stroke="#000" strokeWidth={2} />
            <Text text="💣" fontSize={size * 0.6} offsetX={size * 0.25} offsetY={size * 0.25} />
          </Group>
        );
      case 'smoke':
        return (
          <Group ref={shapeRef} x={shape.x} y={shape.y} draggable onClick={onSelect} onTap={onSelect}
            onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}>
            <Circle radius={size / 2} fill="#6c7086" stroke="#fff" strokeWidth={2} opacity={0.7} />
            <Text text="S" fontSize={size * 0.5} fill="#fff" offsetX={size * 0.12} offsetY={size * 0.2} />
          </Group>
        );
      case 'flash':
        return (
          <Group ref={shapeRef} x={shape.x} y={shape.y} draggable onClick={onSelect} onTap={onSelect}
            onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}>
            <Circle radius={size / 2} fill="#f9e2af" stroke="#fff" strokeWidth={2} />
            <Text text="⚡" fontSize={size * 0.5} offsetX={size * 0.2} offsetY={size * 0.2} />
          </Group>
        );
      case 'objective':
        return (
          <Group ref={shapeRef} x={shape.x} y={shape.y} draggable onClick={onSelect} onTap={onSelect}
            onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}>
            <Rect width={size} height={size} fill="#a6e3a1" stroke="#fff" strokeWidth={2} offsetX={size / 2} offsetY={size / 2} />
            <Text text="★" fontSize={size * 0.6} fill="#000" offsetX={size * 0.15} offsetY={size * 0.25} />
          </Group>
        );
      default: // pin marker
        return (
          <Group ref={shapeRef} x={shape.x} y={shape.y} draggable onClick={onSelect} onTap={onSelect}
            onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}>
            <Circle radius={size / 2} fill={shape.fill || '#89b4fa'} stroke="#fff" strokeWidth={2} />
            <Circle radius={size / 4} fill="#fff" />
          </Group>
        );
    }
  };

  return (
    <>
      {getIconPath()}
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
        />
      )}
    </>
  );
}

function DraggableVision({ shape, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Group
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        rotation={shape.rotation || 0}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          onChange({
            rotation: e.target.rotation(),
          });
        }}
      >
        <Wedge
          rotation={-shape.angle / 2}
          radius={shape.radius}
          angle={shape.angle}
          fill={shape.fill}
          opacity={0.3}
          stroke={shape.stroke}
          strokeWidth={2}
        />
        <Circle radius={8} fill={shape.stroke} />
      </Group>
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
          enabledAnchors={[]}
        />
      )}
    </>
  );
}

function Canvas() {
  const { state, actions } = useCanvas();
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState(null);
  const [currentDraw, setCurrentDraw] = useState(null);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle wheel zoom
  const handleWheel = useCallback((e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = state.mapScale;
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - state.mapPosition.x) / oldScale,
      y: (pointer.y - state.mapPosition.y) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
    actions.setMapScale(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    actions.setMapPosition(newPos);
  }, [state.mapScale, state.mapPosition, actions]);

  // Handle mouse down
  const handleMouseDown = useCallback((e) => {
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    const transformedPos = {
      x: (pos.x - state.mapPosition.x) / state.mapScale,
      y: (pos.y - state.mapPosition.y) / state.mapScale,
    };

    // Handle different tools
    switch (state.activeTool) {
      case 'move':
        // Pan will be handled by stage dragging
        break;
      
      case 'arrow':
      case 'line':
        setIsDrawing(true);
        setDrawStart(transformedPos);
        setCurrentDraw({
          type: state.activeTool,
          points: [transformedPos.x, transformedPos.y, transformedPos.x, transformedPos.y],
          stroke: state.strokeColor,
          strokeWidth: state.strokeWidth,
        });
        break;
      
      case 'circle':
        setIsDrawing(true);
        setDrawStart(transformedPos);
        setCurrentDraw({
          type: 'circle',
          x: transformedPos.x,
          y: transformedPos.y,
          radius: 0,
          stroke: state.strokeColor,
          strokeWidth: state.strokeWidth,
          fill: state.fillColor,
        });
        break;
      
      case 'rectangle':
        setIsDrawing(true);
        setDrawStart(transformedPos);
        setCurrentDraw({
          type: 'rectangle',
          x: transformedPos.x,
          y: transformedPos.y,
          width: 0,
          height: 0,
          stroke: state.strokeColor,
          strokeWidth: state.strokeWidth,
          fill: state.fillColor,
        });
        break;
      
      case 'text':
        const text = prompt('Enter text:');
        if (text) {
          actions.addObject({
            type: 'text',
            x: transformedPos.x,
            y: transformedPos.y,
            text,
            fontSize: state.fontSize,
            fill: state.fontColor,
            layer: 'text',
          });
        }
        break;
      
      case 'icon':
        // Add icon at click position (will be placed with default type selected in panel)
        actions.addObject({
          type: 'icon',
          x: transformedPos.x,
          y: transformedPos.y,
          iconType: state.selectedIconType || 'player',
          fill: state.strokeColor,
          stroke: '#ffffff',
          size: 30,
          layer: 'icons',
        });
        break;
      
      case 'fog':
        // Add fog reveal area
        actions.addFogReveal({
          x: transformedPos.x,
          y: transformedPos.y,
          radius: 80,
        });
        break;
      
      case 'vision':
        // Add vision cone
        actions.addObject({
          type: 'vision',
          x: transformedPos.x,
          y: transformedPos.y,
          radius: state.visionRadius,
          angle: state.visionAngle,
          rotation: 0,
          fill: state.strokeColor,
          stroke: state.strokeColor,
          layer: 'icons',
        });
        break;
      
      default:
        // Select tool - clicking on empty space deselects
        if (e.target === stage) {
          actions.clearSelection();
        }
    }
  }, [state, actions]);

  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    if (!isDrawing || !drawStart) return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    const transformedPos = {
      x: (pos.x - state.mapPosition.x) / state.mapScale,
      y: (pos.y - state.mapPosition.y) / state.mapScale,
    };

    switch (state.activeTool) {
      case 'arrow':
      case 'line':
        setCurrentDraw(prev => ({
          ...prev,
          points: [drawStart.x, drawStart.y, transformedPos.x, transformedPos.y],
        }));
        break;
      
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(transformedPos.x - drawStart.x, 2) +
          Math.pow(transformedPos.y - drawStart.y, 2)
        );
        setCurrentDraw(prev => ({
          ...prev,
          radius,
        }));
        break;
      
      case 'rectangle':
        setCurrentDraw(prev => ({
          ...prev,
          width: transformedPos.x - drawStart.x,
          height: transformedPos.y - drawStart.y,
        }));
        break;
    }
  }, [isDrawing, drawStart, state.activeTool, state.mapPosition, state.mapScale]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (isDrawing && currentDraw) {
      // Add the drawn shape to objects
      const layerMap = {
        arrow: 'shapes',
        line: 'shapes',
        circle: 'shapes',
        rectangle: 'shapes',
      };
      actions.addObject({
        ...currentDraw,
        layer: layerMap[currentDraw.type] || 'shapes',
      });
    }
    setIsDrawing(false);
    setDrawStart(null);
    setCurrentDraw(null);
  }, [isDrawing, currentDraw, actions]);

  // Handle shape selection
  const handleShapeSelect = useCallback((id) => (e) => {
    e.cancelBubble = true;
    if (state.activeTool === 'select') {
      actions.setSelectedIds([id]);
    }
  }, [state.activeTool, actions]);

  // Handle shape change
  const handleShapeChange = useCallback((id) => (updates) => {
    actions.updateObject(id, updates);
  }, [actions]);

  // Render objects by layer
  const renderObjects = () => {
    const layerOrder = ['shapes', 'icons', 'text'];
    const visibleLayers = state.layers.filter(l => l.visible).map(l => l.id);

    return layerOrder.map(layerId => {
      if (!visibleLayers.includes(layerId)) return null;

      return state.objects
        .filter(obj => obj.layer === layerId)
        .map(obj => {
          const isSelected = state.selectedIds.includes(obj.id);

          switch (obj.type) {
            case 'arrow':
              return (
                <DraggableArrow
                  key={obj.id}
                  shape={obj}
                  isSelected={isSelected}
                  onSelect={handleShapeSelect(obj.id)}
                  onChange={handleShapeChange(obj.id)}
                />
              );
            case 'line':
              return (
                <DraggableLine
                  key={obj.id}
                  shape={obj}
                  isSelected={isSelected}
                  onSelect={handleShapeSelect(obj.id)}
                  onChange={handleShapeChange(obj.id)}
                />
              );
            case 'circle':
              return (
                <DraggableCircle
                  key={obj.id}
                  shape={obj}
                  isSelected={isSelected}
                  onSelect={handleShapeSelect(obj.id)}
                  onChange={handleShapeChange(obj.id)}
                />
              );
            case 'rectangle':
              return (
                <DraggableRect
                  key={obj.id}
                  shape={obj}
                  isSelected={isSelected}
                  onSelect={handleShapeSelect(obj.id)}
                  onChange={handleShapeChange(obj.id)}
                />
              );
            case 'text':
              return (
                <DraggableText
                  key={obj.id}
                  shape={obj}
                  isSelected={isSelected}
                  onSelect={handleShapeSelect(obj.id)}
                  onChange={handleShapeChange(obj.id)}
                />
              );
            case 'icon':
              return (
                <DraggableIcon
                  key={obj.id}
                  shape={obj}
                  isSelected={isSelected}
                  onSelect={handleShapeSelect(obj.id)}
                  onChange={handleShapeChange(obj.id)}
                />
              );
            case 'vision':
              return (
                <DraggableVision
                  key={obj.id}
                  shape={obj}
                  isSelected={isSelected}
                  onSelect={handleShapeSelect(obj.id)}
                  onChange={handleShapeChange(obj.id)}
                />
              );
            default:
              return null;
          }
        });
    });
  };

  // Render current drawing preview
  const renderCurrentDraw = () => {
    if (!currentDraw) return null;

    switch (currentDraw.type) {
      case 'arrow':
        return (
          <Arrow
            points={currentDraw.points}
            stroke={currentDraw.stroke}
            strokeWidth={currentDraw.strokeWidth}
            fill={currentDraw.stroke}
            pointerLength={10}
            pointerWidth={10}
          />
        );
      case 'line':
        return (
          <Line
            points={currentDraw.points}
            stroke={currentDraw.stroke}
            strokeWidth={currentDraw.strokeWidth}
            lineCap="round"
          />
        );
      case 'circle':
        return (
          <Circle
            x={currentDraw.x}
            y={currentDraw.y}
            radius={currentDraw.radius}
            stroke={currentDraw.stroke}
            strokeWidth={currentDraw.strokeWidth}
            fill={currentDraw.fill}
          />
        );
      case 'rectangle':
        return (
          <Rect
            x={currentDraw.x}
            y={currentDraw.y}
            width={currentDraw.width}
            height={currentDraw.height}
            stroke={currentDraw.stroke}
            strokeWidth={currentDraw.strokeWidth}
            fill={currentDraw.fill}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-dark-400 overflow-hidden relative"
    >
      {/* Zoom indicator */}
      <div className="absolute bottom-4 left-4 bg-dark-200 px-3 py-1 rounded-md text-sm text-gray-400 z-10">
        {Math.round(state.mapScale * 100)}%
      </div>

      {/* Reset view button */}
      <button
        onClick={actions.resetMapView}
        className="absolute bottom-4 left-24 bg-dark-200 px-3 py-1 rounded-md text-sm text-gray-400 hover:text-white z-10"
      >
        Reset View
      </button>

      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        scaleX={state.mapScale}
        scaleY={state.mapScale}
        x={state.mapPosition.x}
        y={state.mapPosition.y}
        draggable={state.activeTool === 'move'}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDragEnd={(e) => {
          if (state.activeTool === 'move') {
            actions.setMapPosition({
              x: e.target.x(),
              y: e.target.y(),
            });
          }
        }}
      >
        {/* Map layer */}
        <Layer>
          {state.mapImage && <MapImage src={state.mapImage} />}
          {state.showGrid && (
            <Grid
              width={2000}
              height={2000}
              gridSize={state.gridSize}
              scale={state.mapScale}
            />
          )}
        </Layer>

        {/* Objects layer */}
        <Layer>
          {renderObjects()}
          {renderCurrentDraw()}
        </Layer>

        {/* Fog of war layer */}
        {state.fogEnabled && state.layers.find(l => l.id === 'fog')?.visible && (
          <Layer>
            <FogOfWar
              width={2000}
              height={2000}
              opacity={state.fogOpacity}
              reveals={state.fogReveals}
            />
          </Layer>
        )}
      </Stage>

      {/* Empty state */}
      {!state.mapImage && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-lg">Upload a map to get started</p>
            <p className="text-sm mt-1">Click "Upload Map" in the header</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Canvas;
