# Music Player Web Application

A modern, visually polished music player web application built with React + TypeScript + Vite.

## Features

- 🎵 **Browse Albums** - Browse music album collections
- ▶️ **Play Tracks** - Play, pause, previous, next
- ❤️ **Like/Favorite** - Mark favorite songs
- 📋 **Playlists** - Create and manage custom playlists
- 🎨 **Modern UI** - Beautiful gradient backgrounds and smooth animations

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **CSS3** - Styling and animations

## Project Structure

```
music-player/
├── src/
│   ├── components/        # React components
│   │   ├── AlbumCard.tsx  # Album card component
│   │   ├── TrackList.tsx  # Track list component
│   │   ├── Player.tsx     # Player component
│   │   └── PlaylistManager.tsx  # Playlist manager component
│   ├── context/           # React Context
│   │   └── MusicContext.tsx  # Music state management
│   ├── data/              # Mock data
│   │   └── mockData.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── test/              # Test configuration
│   │   └── setup.ts
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry file
├── e2e/                   # E2E tests
│   └── app.spec.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── playwright.config.ts
```

## Installation and Running

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Testing

### Run Unit Tests

```bash
npm test
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Run E2E Tests in UI Mode

```bash
npm run test:e2e:ui
```

## Test Results

### Unit Tests

✅ **All tests passed** (13/13)

- MusicContext tests: 7 tests
- AlbumCard component tests: 2 tests
- TrackList component tests: 3 tests
- Player component tests: 1 test

### E2E Tests

✅ **All tests passed** (7/7)

- Load and display album list
- Click album to view details
- Play track
- Switch tabs
- Create playlist
- Like/unlike track
- Control player

## Usage Instructions

1. **Browse Albums**: Click album cards on the homepage to view album details and track lists
2. **Play Music**: Click any track to start playing
3. **Control Playback**: Use the control buttons at the bottom of the player (play/pause, previous, next)
4. **Like Songs**: Click the like button (🤍/❤️) next to tracks
5. **Create Playlist**: Switch to the "Playlists" tab and click the "New Playlist" button
6. **View Liked Songs**: Switch to the "Liked" tab to view all favorited songs

## Development Commands Summary

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Build for production
npm run build
```

## License

MIT
