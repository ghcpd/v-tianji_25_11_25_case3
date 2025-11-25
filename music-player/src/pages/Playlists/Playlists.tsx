import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMusic } from '../../context/MusicContext';
import './Playlists.css';

const Playlists = () => {
  const { playlists, createPlaylist, deletePlaylist } = useMusic();
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim(), newPlaylistDescription.trim());
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      setIsCreating(false);
    }
  };

  return (
    <div className="playlists-page">
      <header className="page-header">
        <h1>Playlists</h1>
        <p className="page-subtitle">Your personal collections</p>
      </header>

      <div className="playlists-actions">
        <button
          className="create-playlist-btn"
          onClick={() => setIsCreating(true)}
          data-testid="create-playlist-btn"
        >
          + Create Playlist
        </button>
      </div>

      {isCreating && (
        <div className="create-playlist-modal">
          <form onSubmit={handleCreatePlaylist} className="create-playlist-form">
            <h3>Create New Playlist</h3>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="playlist-input"
              autoFocus
              data-testid="playlist-name-input"
            />
            <textarea
              placeholder="Description (optional)"
              value={newPlaylistDescription}
              onChange={(e) => setNewPlaylistDescription(e.target.value)}
              className="playlist-textarea"
              data-testid="playlist-description-input"
            />
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setIsCreating(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-btn" data-testid="submit-playlist-btn">
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {playlists.length > 0 ? (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-card" data-testid={`playlist-${playlist.id}`}>
              <Link to={`/playlist/${playlist.id}`} className="playlist-card-link">
                <div className="playlist-cover">
                  {playlist.tracks[0]?.coverUrl ? (
                    <img src={playlist.tracks[0].coverUrl} alt={playlist.name} />
                  ) : (
                    <div className="playlist-cover-placeholder">🎶</div>
                  )}
                </div>
                <div className="playlist-info">
                  <h3 className="playlist-name">{playlist.name}</h3>
                  <p className="playlist-track-count">
                    {playlist.tracks.length} {playlist.tracks.length === 1 ? 'track' : 'tracks'}
                  </p>
                </div>
              </Link>
              <button
                className="delete-playlist-btn"
                onClick={() => deletePlaylist(playlist.id)}
                aria-label={`Delete ${playlist.name}`}
                data-testid={`delete-playlist-${playlist.id}`}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No playlists yet</h3>
          <p>Create your first playlist to start organizing your music</p>
        </div>
      )}
    </div>
  );
};

export default Playlists;
