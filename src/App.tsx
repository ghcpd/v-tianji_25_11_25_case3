import React, { useState } from 'react';
import { useMusic } from './context/MusicContext';
import { AlbumCard } from './components/AlbumCard';
import { TrackList } from './components/TrackList';
import { Player } from './components/Player';
import { PlaylistManager } from './components/PlaylistManager';
import { Album } from './types';
import './App.css';

const App: React.FC = () => {
  const { albums, likedTracks } = useMusic();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [activeTab, setActiveTab] = useState<'albums' | 'playlists' | 'liked'>('albums');

  const likedTracksList = albums
    .flatMap(album => album.tracks)
    .filter(track => likedTracks.has(track.id));

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Music Player</h1>
        <nav className="app-nav">
          <button
            className={activeTab === 'albums' ? 'active' : ''}
            onClick={() => setActiveTab('albums')}
          >
            Albums
          </button>
          <button
            className={activeTab === 'playlists' ? 'active' : ''}
            onClick={() => setActiveTab('playlists')}
          >
            Playlists
          </button>
          <button
            className={activeTab === 'liked' ? 'active' : ''}
            onClick={() => setActiveTab('liked')}
          >
            Liked ({likedTracks.size})
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'albums' && (
          <div className="albums-view">
            {selectedAlbum ? (
              <div className="album-detail">
                <button className="back-button" onClick={() => setSelectedAlbum(null)}>
                  ← Back
                </button>
                <div className="album-detail-header">
                  <img src={selectedAlbum.cover} alt={selectedAlbum.title} className="album-detail-cover" />
                  <div className="album-detail-info">
                    <h2>{selectedAlbum.title}</h2>
                    <p>{selectedAlbum.artist}</p>
                    <p>{selectedAlbum.year}</p>
                  </div>
                </div>
                <TrackList tracks={selectedAlbum.tracks} />
              </div>
            ) : (
              <div className="albums-grid">
                {albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onClick={() => setSelectedAlbum(album)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'playlists' && (
          <PlaylistManager />
        )}

        {activeTab === 'liked' && (
          <div className="liked-view">
            <h2>Liked Songs ({likedTracks.size})</h2>
            {likedTracksList.length === 0 ? (
              <div className="empty-state">No liked songs yet</div>
            ) : (
              <TrackList tracks={likedTracksList} showAlbum />
            )}
          </div>
        )}
      </main>

      <Player />
    </div>
  );
};

export default App;

