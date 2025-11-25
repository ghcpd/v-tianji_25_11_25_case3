import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext';
import { Sidebar, Player } from './components';
import { Home, Albums, AlbumDetail, Favorites, Playlists, PlaylistDetail } from './pages';
import './App.css';

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <div className="app">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/album/:id" element={<AlbumDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:id" element={<PlaylistDetail />} />
            </Routes>
          </main>
          <Player />
        </div>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;
