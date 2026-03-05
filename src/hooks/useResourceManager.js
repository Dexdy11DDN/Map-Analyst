import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  CUSTOM_MAPS: 'mapAnalyst_customMaps',
  CUSTOM_ICONS: 'mapAnalyst_customIcons',
  RECENT_MAPS: 'mapAnalyst_recentMaps',
  FAVORITE_ICONS: 'mapAnalyst_favoriteIcons',
  SETTINGS: 'mapAnalyst_settings',
};

// Custom hook for managing resources
export function useResourceManager() {
  // Custom maps uploaded by user
  const [customMaps, setCustomMaps] = useState([]);
  // Custom icons uploaded by user
  const [customIcons, setCustomIcons] = useState([]);
  // Recently used maps
  const [recentMaps, setRecentMaps] = useState([]);
  // Favorite icons
  const [favoriteIcons, setFavoriteIcons] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCustomMaps = localStorage.getItem(STORAGE_KEYS.CUSTOM_MAPS);
      const savedCustomIcons = localStorage.getItem(STORAGE_KEYS.CUSTOM_ICONS);
      const savedRecentMaps = localStorage.getItem(STORAGE_KEYS.RECENT_MAPS);
      const savedFavoriteIcons = localStorage.getItem(STORAGE_KEYS.FAVORITE_ICONS);

      if (savedCustomMaps) setCustomMaps(JSON.parse(savedCustomMaps));
      if (savedCustomIcons) setCustomIcons(JSON.parse(savedCustomIcons));
      if (savedRecentMaps) setRecentMaps(JSON.parse(savedRecentMaps));
      if (savedFavoriteIcons) setFavoriteIcons(JSON.parse(savedFavoriteIcons));
    } catch (error) {
      console.error('Failed to load resources from localStorage:', error);
    }
    setIsLoading(false);
  }, []);

  // Save custom maps to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MAPS, JSON.stringify(customMaps));
    }
  }, [customMaps, isLoading]);

  // Save custom icons to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_ICONS, JSON.stringify(customIcons));
    }
  }, [customIcons, isLoading]);

  // Save recent maps to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.RECENT_MAPS, JSON.stringify(recentMaps));
    }
  }, [recentMaps, isLoading]);

  // Save favorite icons to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.FAVORITE_ICONS, JSON.stringify(favoriteIcons));
    }
  }, [favoriteIcons, isLoading]);

  // Add a custom map
  const addCustomMap = useCallback((map) => {
    const newMap = {
      id: `custom_${Date.now()}`,
      name: map.name || 'Custom Map',
      image: map.image,
      thumbnail: map.thumbnail || map.image,
      addedAt: new Date().toISOString(),
      type: 'custom',
    };
    setCustomMaps(prev => [newMap, ...prev]);
    return newMap;
  }, []);

  // Remove a custom map
  const removeCustomMap = useCallback((mapId) => {
    setCustomMaps(prev => prev.filter(m => m.id !== mapId));
  }, []);

  // Add a custom icon
  const addCustomIcon = useCallback((icon) => {
    const newIcon = {
      id: `custom_icon_${Date.now()}`,
      name: icon.name || 'Custom Icon',
      image: icon.image,
      category: 'custom',
      addedAt: new Date().toISOString(),
    };
    setCustomIcons(prev => [newIcon, ...prev]);
    return newIcon;
  }, []);

  // Remove a custom icon
  const removeCustomIcon = useCallback((iconId) => {
    setCustomIcons(prev => prev.filter(i => i.id !== iconId));
  }, []);

  // Add to recent maps
  const addToRecentMaps = useCallback((mapId, mapData) => {
    setRecentMaps(prev => {
      const filtered = prev.filter(m => m.id !== mapId);
      const newRecent = [{ id: mapId, ...mapData, usedAt: new Date().toISOString() }, ...filtered];
      return newRecent.slice(0, 10); // Keep only last 10
    });
  }, []);

  // Toggle favorite icon
  const toggleFavoriteIcon = useCallback((iconId) => {
    setFavoriteIcons(prev => {
      if (prev.includes(iconId)) {
        return prev.filter(id => id !== iconId);
      }
      return [...prev, iconId];
    });
  }, []);

  // Check if icon is favorite
  const isFavoriteIcon = useCallback((iconId) => {
    return favoriteIcons.includes(iconId);
  }, [favoriteIcons]);

  // Clear all custom data
  const clearAllCustomData = useCallback(() => {
    setCustomMaps([]);
    setCustomIcons([]);
    setRecentMaps([]);
    setFavoriteIcons([]);
  }, []);

  // Export all custom data as JSON
  const exportCustomData = useCallback(() => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      customMaps,
      customIcons,
      favoriteIcons,
    };
    return JSON.stringify(data, null, 2);
  }, [customMaps, customIcons, favoriteIcons]);

  // Import custom data from JSON
  const importCustomData = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.customMaps) setCustomMaps(prev => [...data.customMaps, ...prev]);
      if (data.customIcons) setCustomIcons(prev => [...data.customIcons, ...prev]);
      if (data.favoriteIcons) setFavoriteIcons(prev => [...new Set([...prev, ...data.favoriteIcons])]);
      return true;
    } catch (error) {
      console.error('Failed to import custom data:', error);
      return false;
    }
  }, []);

  return {
    // State
    customMaps,
    customIcons,
    recentMaps,
    favoriteIcons,
    isLoading,
    
    // Actions
    addCustomMap,
    removeCustomMap,
    addCustomIcon,
    removeCustomIcon,
    addToRecentMaps,
    toggleFavoriteIcon,
    isFavoriteIcon,
    clearAllCustomData,
    exportCustomData,
    importCustomData,
  };
}

// Helper function to convert file to base64
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Helper function to create thumbnail from image
export function createThumbnail(imageData, maxSize = 200) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = imageData;
  });
}

export default useResourceManager;
