// Strinova Map and Character Data
// Source: https://github.com/fsltech-team/Strinova-Map-Assistant

// Maps
export const StrinovaMaps = [
  {
    id: 'windytown',
    name: 'Windy Town',
    prepareImage: 'https://s2.loli.net/2024/09/24/Shk6rXTwvAlDGMC.png',
    blankImage: 'https://s2.loli.net/2024/09/24/85uxWct3DeRByTO.png',
  },
  {
    id: 'spacelab',
    name: 'Space Lab',
    prepareImage: 'https://s2.loli.net/2024/09/24/QI6hnMtsJpSCKgE.png',
    blankImage: 'https://s2.loli.net/2024/09/24/KxUYEBqdlyZ92rC.png',
  },
  {
    id: 'khesmet',
    name: 'Khesmet',
    prepareImage: 'https://s2.loli.net/2024/09/24/QnNZHhT4wDbFxIO.png',
    blankImage: 'https://s2.loli.net/2024/09/24/jroCB9iqR1l5LDp.png',
  },
  {
    id: 'eulerport',
    name: 'Euler Port',
    prepareImage: 'https://s2.loli.net/2024/09/24/Md2Pa1HKtJyk7oO.png',
    blankImage: 'https://s2.loli.net/2024/09/24/NGWk2HXwSvmdgOY.png',
  },
  {
    id: 'cauchydistrict',
    name: 'Cauchy District',
    prepareImage: 'https://s2.loli.net/2024/09/24/Uw3ftVPQOLu5MCj.png',
    blankImage: 'https://s2.loli.net/2024/09/24/cLDQtdwAJyr2k7T.png',
  },
  {
    id: 'area88',
    name: 'Area 88',
    prepareImage: 'https://s2.loli.net/2024/09/24/wouqxsUy1JaP8l6.png',
    blankImage: 'https://s2.loli.net/2024/09/24/YBUsSC78oOrx16W.png',
  },
  {
    id: 'base404',
    name: 'Base 404',
    prepareImage: 'https://s2.loli.net/2024/09/24/XfMi4qcV5zmTy78.png',
    blankImage: 'https://s2.loli.net/2024/09/24/pjGMHJClRsXEoAf.png',
  },
  {
    id: 'ocarnus',
    name: 'Ocarnus',
    prepareImage: 'https://cdn.sa.net/2025/04/22/HAisD5nj9Plz4dV.png',
    blankImage: 'https://cdn.sa.net/2025/04/22/pzYjVHbdiL3qn7c.webp',
  },
];

// Factions
export const Factions = {
  PUS: {
    id: 'pus',
    name: 'P.U.S.',
    color: '#f38ba8',
    previewImage: 'https://s2.loli.net/2024/09/25/1El6anYx4qhPbo2.png',
  },
  TheScissors: {
    id: 'thescissors',
    name: 'The Scissors',
    color: '#89b4fa',
    previewImage: 'https://s2.loli.net/2024/09/25/PY4HMU7fbQ32Dr1.png',
  },
  Urbino: {
    id: 'urbino',
    name: 'Urbino',
    color: '#a6e3a1',
    previewImage: 'https://s2.loli.net/2024/09/25/hyPUcLZdMNaeOjI.png',
  },
};

// Characters
export const StrinovaCharacters = [
  // P.U.S. Faction
  {
    id: 'michele',
    name: 'Michele',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/29JH5SlaTdCwgFR.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/2MLSe7fg8tsQ3br.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/8iCzWDaNQPSxqvw.png',
      passive: 'https://s2.loli.net/2024/09/25/ANhKZ6GDzOIjPtf.png',
      ultimate: 'https://s2.loli.net/2024/09/25/UGeEvYfXiSgD4zr.png',
      sub: 'https://cdn.sa.net/2024/11/19/fvrVnE8Ocl21Dpz.png',
    },
  },
  {
    id: 'nobunaga',
    name: 'Nobunaga',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/nuhFZjpVGgJSEyc.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'kokona',
    name: 'Kokona',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/DeK5afJoAhpyNcM.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'yvette',
    name: 'Yvette',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/C4QmVOhp1rB9Gd6.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'flavia',
    name: 'Flavia',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/txSOyYkT4pXhGBn.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'yugiri',
    name: 'Yugiri',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/7DHOLqvWMzmlch3.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'leona',
    name: 'Leona',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/SrnDsxX5bAiBNcE.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  // The Scissors Faction
  {
    id: 'ming',
    name: 'Ming',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/AM58XCKyixJlTGO.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'lawine',
    name: 'Lawine',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/PI6eiLuZfcAQ2aR.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'meredith',
    name: 'Meredith',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/qD7YufUpTmbzX1x.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'reiichi',
    name: 'Reiichi',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/OGgXKe6pPERflQL.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'kanami',
    name: 'Kanami',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/5Vbc3mYw8KJtTDC.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'eika',
    name: 'Eika',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/jt4621ivFRfbEqD.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'fragrans',
    name: 'Fragrans',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/wpBbSjafRNFD43K.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'mara',
    name: 'Mara',
    faction: 'TheScissors',
    canvasIcon: 'https://cdn.sa.net/2025/04/22/ZKzhmI6U3lPcLb5.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  // Urbino Faction
  {
    id: 'celestia',
    name: 'Celestia',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/urbino1.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'audrey',
    name: 'Audrey',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/urbino2.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'maddelena',
    name: 'Maddelena',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/urbino3.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'fuchsia',
    name: 'Fuchsia',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/urbino4.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'baimo',
    name: 'Bai Mo',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/urbino5.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
  {
    id: 'galatea',
    name: 'Galatea',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/urbino6.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/placeholder.png',
    skills: {},
  },
];

// Tactical icons (generic markers)
export const TacticalIcons = [
  { id: 'attack', name: 'Attack', icon: '⚔️', color: '#f38ba8' },
  { id: 'defend', name: 'Defend', icon: '🛡️', color: '#89b4fa' },
  { id: 'smoke', name: 'Smoke', icon: '💨', color: '#6c7086' },
  { id: 'flash', name: 'Flash', icon: '⚡', color: '#f9e2af' },
  { id: 'bomb', name: 'Bomb', icon: '💣', color: '#fab387' },
  { id: 'objective', name: 'Objective', icon: '⭐', color: '#a6e3a1' },
  { id: 'danger', name: 'Danger', icon: '⚠️', color: '#f38ba8' },
  { id: 'watch', name: 'Watch', icon: '👁️', color: '#cba6f7' },
  { id: 'hold', name: 'Hold', icon: '✋', color: '#89b4fa' },
  { id: 'rotate', name: 'Rotate', icon: '🔄', color: '#94e2d5' },
];

// Default icon categories
export const IconCategories = [
  { id: 'characters', name: 'Characters', type: 'strinova' },
  { id: 'tactical', name: 'Tactical', type: 'tactical' },
  { id: 'custom', name: 'Custom', type: 'custom' },
];

// Export helper functions
export function getCharactersByFaction(faction) {
  return StrinovaCharacters.filter(char => char.faction === faction);
}

export function getMapById(mapId) {
  return StrinovaMaps.find(map => map.id === mapId);
}

export function getCharacterById(charId) {
  return StrinovaCharacters.find(char => char.id === charId);
}
