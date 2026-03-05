import React, { useState, useRef } from 'react';
import { useCanvas } from '../context/CanvasContext';
import { StrinovaMaps, StrinovaCharacters, Factions, TacticalIcons, getCharactersByFaction } from '../data/strinovaResources';
import useResourceManager, { fileToBase64, createThumbnail } from '../hooks/useResourceManager';

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
  Plus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
};

// Tab component
function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 text-xs font-medium transition-all ${
        active 
          ? 'text-accent-primary border-b-2 border-accent-primary' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

function LeftPanel() {
  const { state, actions } = useCanvas();
  const { 
    customMaps, 
    customIcons, 
    addCustomMap, 
    removeCustomMap,
    addCustomIcon,
    removeCustomIcon,
  } = useResourceManager();

  const [activeTab, setActiveTab] = useState('maps'); // maps, characters, icons, layers
  const [selectedFaction, setSelectedFaction] = useState('PUS');
  const [mapsOpen, setMapsOpen] = useState(true);
  const [customMapsOpen, setCustomMapsOpen] = useState(false);
  
  const mapInputRef = useRef(null);
  const iconInputRef = useRef(null);

  // Handle map selection
  const handleMapSelect = async (mapUrl, mapName) => {
    actions.setMap(mapUrl);
    actions.resetMapView();
  };

  // Handle custom map upload
  const handleCustomMapUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageData = await fileToBase64(file);
        const thumbnail = await createThumbnail(imageData, 150);
        const newMap = addCustomMap({
          name: file.name.replace(/\.[^/.]+$/, ''),
          image: imageData,
          thumbnail,
        });
        handleMapSelect(newMap.image, newMap.name);
      } catch (error) {
        console.error('Failed to upload map:', error);
      }
    }
  };

  // Handle custom icon upload
  const handleCustomIconUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageData = await fileToBase64(file);
        addCustomIcon({
          name: file.name.replace(/\.[^/.]+$/, ''),
          image: imageData,
        });
      } catch (error) {
        console.error('Failed to upload icon:', error);
      }
    }
  };

  // Handle character icon click - add to canvas
  const handleCharacterClick = (character) => {
    actions.setActiveTool('icon');
    window.selectedCharacterIcon = character;
  };

  // Handle tactical icon click
  const handleTacticalIconClick = (icon) => {
    actions.setActiveTool('icon');
    window.selectedTacticalIcon = icon;
  };

  return (
    <div className="w-72 bg-dark-200 border-r border-gray-700 flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <Tab active={activeTab === 'maps'} onClick={() => setActiveTab('maps')}>Maps</Tab>
        <Tab active={activeTab === 'characters'} onClick={() => setActiveTab('characters')}>Characters</Tab>
        <Tab active={activeTab === 'icons'} onClick={() => setActiveTab('icons')}>Icons</Tab>
        <Tab active={activeTab === 'layers'} onClick={() => setActiveTab('layers')}>Layers</Tab>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {/* Maps Tab */}
        {activeTab === 'maps' && (
          <div className="p-2">
            {/* Strinova Maps */}
            <div className="mb-3">
              <button
                onClick={() => setMapsOpen(!mapsOpen)}
                className="w-full px-2 py-1.5 flex items-center justify-between text-sm font-medium text-gray-300 hover:bg-dark-100 rounded"
              >
                <span>Strinova Maps</span>
                <PanelIcons.Chevron open={mapsOpen} />
              </button>
              {mapsOpen && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {StrinovaMaps.map((map) => (
                    <button
                      key={map.id}
                      onClick={() => handleMapSelect(map.prepareImage, map.name)}
                      className="group relative aspect-video bg-dark-300 rounded-lg overflow-hidden hover:ring-2 ring-accent-primary transition-all"
                      title={map.name}
                    >
                      <img
                        src={map.prepareImage}
                        alt={map.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                        <span className="text-xs font-medium text-white">{map.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Maps */}
            <div>
              <button
                onClick={() => setCustomMapsOpen(!customMapsOpen)}
                className="w-full px-2 py-1.5 flex items-center justify-between text-sm font-medium text-gray-300 hover:bg-dark-100 rounded"
              >
                <span>Custom Maps ({customMaps.length})</span>
                <PanelIcons.Chevron open={customMapsOpen} />
              </button>
              {customMapsOpen && (
                <div className="mt-2">
                  <button
                    onClick={() => mapInputRef.current?.click()}
                    className="w-full p-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-all flex items-center justify-center gap-2"
                  >
                    <PanelIcons.Plus />
                    <span className="text-sm">Upload Custom Map</span>
                  </button>
                  <input
                    ref={mapInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomMapUpload}
                    className="hidden"
                  />
                  
                  {customMaps.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {customMaps.map((map) => (
                        <div key={map.id} className="group relative">
                          <button
                            onClick={() => handleMapSelect(map.image, map.name)}
                            className="w-full aspect-video bg-dark-300 rounded-lg overflow-hidden hover:ring-2 ring-accent-primary transition-all"
                          >
                            <img
                              src={map.thumbnail}
                              alt={map.name}
                              className="w-full h-full object-cover"
                            />
                          </button>
                          <button
                            onClick={() => removeCustomMap(map.id)}
                            className="absolute top-1 right-1 p-1 bg-dark-300/80 rounded text-gray-400 hover:text-accent-danger opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <PanelIcons.Trash />
                          </button>
                          <span className="text-xs text-gray-400 truncate block mt-1">{map.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Characters Tab */}
        {activeTab === 'characters' && (
          <div className="p-2">
            {/* Faction selector */}
            <div className="flex gap-1 mb-3">
              {Object.entries(Factions).map(([key, faction]) => (
                <button
                  key={key}
                  onClick={() => setSelectedFaction(key)}
                  className={`flex-1 py-1.5 rounded text-xs font-medium transition-all ${
                    selectedFaction === key
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  style={{
                    backgroundColor: selectedFaction === key ? faction.color + '40' : 'transparent',
                    borderBottom: selectedFaction === key ? `2px solid ${faction.color}` : 'none',
                  }}
                >
                  {faction.name}
                </button>
              ))}
            </div>

            {/* Characters grid */}
            <div className="grid grid-cols-4 gap-2">
              {getCharactersByFaction(selectedFaction).map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleCharacterClick(character)}
                  className="group relative p-1 bg-dark-300 rounded-lg hover:ring-2 ring-accent-primary transition-all"
                  title={character.name}
                >
                  <img
                    src={character.canvasIcon}
                    alt={character.name}
                    className="w-full aspect-square object-contain rounded"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><circle cx="12" cy="12" r="10"/></svg>';
                    }}
                  />
                  <span className="text-[10px] text-gray-400 truncate block mt-1">{character.name}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Click a character then click on the canvas to place
            </p>
          </div>
        )}

        {/* Icons Tab */}
        {activeTab === 'icons' && (
          <div className="p-2">
            {/* Tactical Icons */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-400 mb-2 px-1">Tactical Icons</h3>
              <div className="grid grid-cols-5 gap-2">
                {TacticalIcons.map((icon) => (
                  <button
                    key={icon.id}
                    onClick={() => handleTacticalIconClick(icon)}
                    className="p-2 bg-dark-300 rounded-lg hover:ring-2 ring-accent-primary transition-all flex flex-col items-center gap-1"
                    title={icon.name}
                  >
                    <span className="text-xl">{icon.icon}</span>
                    <span className="text-[9px] text-gray-400">{icon.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Icons */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-2 px-1">Custom Icons</h3>
              <button
                onClick={() => iconInputRef.current?.click()}
                className="w-full p-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-all flex items-center justify-center gap-2"
              >
                <PanelIcons.Plus />
                <span className="text-xs">Upload Icon</span>
              </button>
              <input
                ref={iconInputRef}
                type="file"
                accept="image/*"
                onChange={handleCustomIconUpload}
                className="hidden"
              />
              
              {customIcons.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {customIcons.map((icon) => (
                    <div key={icon.id} className="group relative">
                      <button
                        onClick={() => handleTacticalIconClick({ ...icon, custom: true })}
                        className="w-full p-1 bg-dark-300 rounded-lg hover:ring-2 ring-accent-primary transition-all"
                      >
                        <img
                          src={icon.image}
                          alt={icon.name}
                          className="w-full aspect-square object-contain rounded"
                        />
                      </button>
                      <button
                        onClick={() => removeCustomIcon(icon.id)}
                        className="absolute -top-1 -right-1 p-0.5 bg-dark-200 rounded-full text-gray-400 hover:text-accent-danger opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <PanelIcons.Trash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Layers Tab */}
        {activeTab === 'layers' && (
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
            
            {/* Objects list */}
            <div className="mt-4 border-t border-gray-700 pt-3">
              <h4 className="text-xs font-semibold text-gray-400 mb-2">Objects ({state.objects.length})</h4>
              <div className="max-h-48 overflow-auto space-y-1">
                {state.objects.map((obj, index) => (
                  <div
                    key={obj.id}
                    onClick={() => actions.setSelectedIds([obj.id])}
                    className={`px-2 py-1.5 rounded text-xs cursor-pointer flex items-center justify-between ${
                      state.selectedIds.includes(obj.id)
                        ? 'bg-accent-primary/20 text-accent-primary'
                        : 'text-gray-400 hover:bg-dark-100'
                    }`}
                  >
                    <span>{obj.type} #{index + 1}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.deleteObjects([obj.id]);
                      }}
                      className="p-0.5 hover:text-accent-danger"
                    >
                      <PanelIcons.Trash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="px-3 py-2 border-t border-gray-700 text-xs text-gray-500 flex justify-between">
        <span>{state.objects.length} objects</span>
        <span>{state.selectedIds.length > 0 ? `${state.selectedIds.length} selected` : ''}</span>
      </div>
    </div>
  );
}

export default LeftPanel;
