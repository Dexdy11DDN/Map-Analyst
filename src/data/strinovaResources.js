// Strinova Map and Character Data
// Source: https://github.com/fsltech-team/Strinova-Map-Assistant

// Maps - prepareImage is colored, blankImage is black/white
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

// Characters - canvasIcon URLs from Strinova Map Assistant source
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
    canvasIcon: 'https://s2.loli.net/2024/09/29/7UuX5VTR8AYWD2o.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/tgNeOR5Iow6Cakc.png',
    skills: {},
  },
  {
    id: 'kokona',
    name: 'Kokona',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/jtlryiY8WHIGAMq.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/f8dgSBZ2zsvV1jL.png',
    skills: {},
  },
  {
    id: 'yvette',
    name: 'Yvette',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/eIVFmswk3tUlOcR.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/AjGNVF4JLazbfHP.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/ESH6FNKQjbafMZn.png',
      passive: 'https://s2.loli.net/2024/09/25/2hqoyUWsnbA83BP.png',
      ultimate: 'https://s2.loli.net/2024/09/25/32VnSv59tPwTIhl.png',
      sub: 'https://cdn.sa.net/2024/11/19/Hzo6W4y8ib5ceqf.png',
    },
  },
  {
    id: 'flavia',
    name: 'Flavia',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/09/29/jC98Rq3NhrUXYWK.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/tgNeOR5Iow6Cakc.png',
    skills: {},
  },
  {
    id: 'yugiri',
    name: 'Yugiri',
    faction: 'PUS',
    canvasIcon: 'https://s2.loli.net/2024/11/10/Jq58o4vKDYUCcl1.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/JZ2543e9CUYDh8p.png',
    skills: {
      active: 'https://s2.loli.net/2024/11/10/oW4UsSziGHnhLx2.png',
      passive: 'https://s2.loli.net/2024/11/10/jBC3dyGxKzmpQf2.png',
      ultimate: 'https://s2.loli.net/2024/11/10/T3huK4YzAXmrV8N.png',
      sub: 'https://cdn.sa.net/2024/11/19/T4QIuUewCitmjbM.png',
    },
  },
  {
    id: 'leona',
    name: 'Leona',
    faction: 'PUS',
    canvasIcon: 'https://cdn.sa.net/2025/01/23/WY9ijCwS7e4OPNM.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/snfMAvm1384Qc5h.png',
    skills: {
      active: 'https://cdn.sa.net/2025/01/23/8bA3kca54WlQi96.png',
      passive: 'https://cdn.sa.net/2025/01/23/A45ZR1MXwovaijc.png',
      ultimate: 'https://cdn.sa.net/2025/01/23/snt2Q9EovlWj7Nx.png',
      sub: 'https://cdn.sa.net/2025/01/23/so6fhJX7Lp1YAPN.png',
    },
  },
  // The Scissors Faction
  {
    id: 'ming',
    name: 'Ming',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/nuhFZjpVGgJSEyc.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/tgNeOR5Iow6Cakc.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/NQ2TdSqhseRZY7b.png',
      passive: 'https://s2.loli.net/2024/09/25/bsAzZemy4uEcaHt.png',
      ultimate: 'https://s2.loli.net/2024/09/25/B6KC72wphAdt4Ri.png',
      sub: 'https://cdn.sa.net/2024/11/19/CkhMrw23RbmBv5T.png',
    },
  },
  {
    id: 'lawine',
    name: 'Lawine',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/DeK5afJoAhpyNcM.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/f8dgSBZ2zsvV1jL.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/gOFlGIzPjxbpYKw.png',
      passive: 'https://s2.loli.net/2024/09/25/8AxLszwVIg17WGq.png',
      ultimate: 'https://s2.loli.net/2024/09/25/HuEnVYb8Mr5e24I.png',
      sub: 'https://cdn.sa.net/2024/11/19/E5OzUcFg3DsjGuH.png',
    },
  },
  {
    id: 'meredith',
    name: 'Meredith',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/C4QmVOhp1rB9Gd6.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/UvzslOa738JMjBn.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/KWYZTSQmjOHJ2RX.png',
      passive: 'https://s2.loli.net/2024/09/25/O8kRqCVEDoK6T3p.png',
      ultimate: 'https://s2.loli.net/2024/09/25/V8KZrx9sY7QBlaP.png',
      sub: 'https://cdn.sa.net/2024/11/19/7sSae9nRhO2Ddzg.png',
    },
  },
  {
    id: 'reiichi',
    name: 'Reiichi',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/txSOyYkT4pXhGBn.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/Tu2C4q3OdFX6Ulk.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/C6qts5xeVpS1N4E.png',
      passive: 'https://s2.loli.net/2024/09/25/iuSvZDYnFTzmBrl.png',
      ultimate: 'https://s2.loli.net/2024/09/25/bESOlDh9oURvFC3.png',
      sub: 'https://cdn.sa.net/2024/11/19/daOIybnpUr8QtVz.png',
    },
  },
  {
    id: 'kanami',
    name: 'Kanami',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/7DHOLqvWMzmlch3.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/v843gf6RWlFsPx7.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/UBJqoYz835GvVxy.png',
      passive: 'https://s2.loli.net/2024/09/25/OHbINYGSQhFazcd.png',
      ultimate: 'https://s2.loli.net/2024/09/25/YH3Phg5XQumsbCM.png',
      sub: 'https://cdn.sa.net/2024/11/19/jOP3fQIlYxCvZSN.png',
    },
  },
  {
    id: 'eika',
    name: 'Eika',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/SrnDsxX5bAiBNcE.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/SMVIPh4fqWzRruy.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/SPYXJZwHGObnrmV.png',
      passive: 'https://s2.loli.net/2024/09/25/JYfa5PdE6r4Kcio.png',
      ultimate: 'https://s2.loli.net/2024/09/25/sFgyUNK7iWtcvfp.png',
      sub: 'https://cdn.sa.net/2024/11/19/to7dWPDVuUFRsIn.png',
    },
  },
  {
    id: 'fragrans',
    name: 'Fragrans',
    faction: 'TheScissors',
    canvasIcon: 'https://s2.loli.net/2024/09/29/AM58XCKyixJlTGO.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/6cwHibDP9QmfuVC.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/L9j3uWBrl5hNyzx.png',
      passive: 'https://s2.loli.net/2024/09/25/B3HDdTpLjAyYQ74.png',
      ultimate: 'https://s2.loli.net/2024/09/25/5Xk9PUOlwFsgE6B.png',
      sub: 'https://cdn.sa.net/2024/11/19/JrTleR2xkfPysaA.png',
    },
  },
  {
    id: 'mara',
    name: 'Mara',
    faction: 'TheScissors',
    canvasIcon: 'https://cdn.sa.net/2025/04/22/ZKzhmI6U3lPcLb5.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/Y5fqMzeLCNB63dT.png',
    skills: {
      active: 'https://cdn.sa.net/2025/04/22/WNG8b9KAy154uLj.png',
      passive: 'https://cdn.sa.net/2025/04/22/agB2vCobZk4efJM.png',
      ultimate: 'https://cdn.sa.net/2025/04/22/vDMeEWlitLqTBIQ.png',
      sub: 'https://cdn.sa.net/2025/04/22/cK4BS6k3DXndMjx.png',
    },
  },
  // Urbino Faction
  {
    id: 'celestia',
    name: 'Celestia',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/PI6eiLuZfcAQ2aR.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/xYLHks7NzduUmWP.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/WmtSU2hFLBPaf85.png',
      passive: 'https://s2.loli.net/2024/09/25/O5dXCxh3R1wVINQ.png',
      ultimate: 'https://s2.loli.net/2024/09/25/bJalMyBfZ7iXVtx.png',
      sub: 'https://cdn.sa.net/2024/11/19/xm5Io68zcXSZAn1.png',
    },
  },
  {
    id: 'audrey',
    name: 'Audrey',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/qD7YufUpTmbzX1x.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/GAv1ONZDR4sphmM.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/26/9PqOBd7owjJrRVp.png',
      passive: 'https://s2.loli.net/2024/09/26/pfyJk2RLYsXlBFg.png',
      ultimate: 'https://s2.loli.net/2024/09/26/E6tTWi1Suls5Y9R.png',
      sub: 'https://cdn.sa.net/2024/11/19/iUDp2MuxwXVcd7a.png',
    },
  },
  {
    id: 'maddelena',
    name: 'Maddelena',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/OGgXKe6pPERflQL.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/3djgpfyBbxWzUAD.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/2r7wkizoLbpqMOZ.png',
      passive: 'https://s2.loli.net/2024/09/25/q61FltINbyrA8YV.png',
      ultimate: 'https://s2.loli.net/2024/09/25/tazvXEJNs5HuyeD.png',
      sub: 'https://cdn.sa.net/2024/11/19/yerm1tuq97ZnaWp.png',
    },
  },
  {
    id: 'fuchsia',
    name: 'Fuchsia',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/5Vbc3mYw8KJtTDC.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/4UIkVEQ1C6tounx.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/tkQ3jlHGeRTDPyn.png',
      passive: 'https://s2.loli.net/2024/09/25/5ZCmFuQhoP3zYnV.png',
      ultimate: 'https://s2.loli.net/2024/09/25/rOxFKuLX7e5QWhw.png',
      sub: 'https://cdn.sa.net/2024/11/19/PxS2mWOR6TILZF9.png',
    },
  },
  {
    id: 'baimo',
    name: 'Bai Mo',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/jt4621ivFRfbEqD.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/o5QTWCxraMFvZuw.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/eUzu75aSXVw2kQF.png',
      passive: 'https://s2.loli.net/2024/09/25/xvVheX57uGJMI2k.png',
      ultimate: 'https://s2.loli.net/2024/09/25/VkyGJKzHYr4pnlm.png',
      sub: 'https://cdn.sa.net/2024/11/19/y1ojEJpIOrqbfUm.png',
    },
  },
  {
    id: 'galatea',
    name: 'Galatea',
    faction: 'Urbino',
    canvasIcon: 'https://s2.loli.net/2024/09/29/wpBbSjafRNFD43K.png',
    bodyImage: 'https://cdn.sa.net/2025/04/22/n3XUCkglqNYsyJP.png',
    skills: {
      active: 'https://s2.loli.net/2024/09/25/UQVBxmGPD9q1tsr.png',
      passive: 'https://s2.loli.net/2024/09/25/VmDbBPl9ezv5ZgU.png',
      ultimate: 'https://s2.loli.net/2024/09/25/xGpjiLgcUtTJbno.png',
      sub: 'https://cdn.sa.net/2024/11/19/bNl54Ze1D7wWkJH.png',
    },
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
