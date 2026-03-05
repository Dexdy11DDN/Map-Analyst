# Map Analyst - Game Strategy Board

A web-based tactical strategy planning tool for games like Valorant, CS2, and other competitive games. Create, annotate, and share game strategies with ease.

![Map Analyst Preview](preview.png)

## Features

### Core Features
- **Custom Map Upload** - Load any game map image (PNG/JPG/WEBP)
- **Drawing Tools** - Arrows, lines, circles, rectangles for tactical annotations
- **Icon/Pin System** - Player markers, enemy positions, utility placements
- **Text Notes** - Add labels and annotations
- **Zoom & Pan** - Navigate large maps with ease

### Visual Systems
- **Fog of War** - Simulate hidden areas with adjustable opacity
- **Vision Cones** - Visualize player sight lines and angles
- **Grid Overlay** - Align elements precisely

### Save & Export
- **Save Strategy** - Export as JSON for later editing
- **Load Strategy** - Import previously saved strategies
- **Export Image** - Save as high-quality PNG

### Keyboard Shortcuts
| Action | Shortcut |
|--------|----------|
| Select | V |
| Move Canvas | M |
| Arrow | A |
| Line | L |
| Circle | C |
| Rectangle | R |
| Text | T |
| Icon | I |
| Fog Tool | F |
| Delete | Del |
| Undo | Ctrl+Z |
| Redo | Ctrl+Y |
| Copy | Ctrl+C |
| Paste | Ctrl+V |
| Deselect | Esc |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/map-analyst.git
cd map-analyst

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Konva.js / react-konva** - Canvas rendering
- **Tailwind CSS** - Styling
- **GitHub Pages** - Hosting

## Project Structure

```
src/
├── components/
│   ├── Canvas.jsx      # Main canvas with Konva
│   ├── Header.jsx      # Top toolbar
│   ├── Toolbar.jsx     # Left tool buttons
│   ├── LeftPanel.jsx   # Icons & layers
│   └── RightPanel.jsx  # Properties & settings
├── context/
│   └── CanvasContext.jsx  # Global state management
├── App.jsx
├── main.jsx
└── index.css
```

## Future Features

- [ ] Multiple map tabs
- [ ] Strategy timeline/steps
- [ ] Real-time collaboration
- [ ] Cloud save
- [ ] Custom icon uploads
- [ ] Line of sight raycasting
- [ ] Map rotation/cropping

## License

MIT License - feel free to use and modify for your own projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
