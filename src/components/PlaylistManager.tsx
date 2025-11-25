import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { Track } from '../types';
import './PlaylistManager.css';

export const PlaylistManager: React.FC = () => {
  const { playlists, createPlaylist, deletePlaylist, removeTrackFromPlaylist } = useMusic();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="playlist-manager">
      <div className="playlist-header">
        <h2>My Playlists</h2>
        <button className="create-button" onClick={() => setShowCreateForm(true)}>
          + New Playlist
        </button>
      </div>

      {showCreateForm && (
        <div className="create-playlist-form">
          <input
            type="text"
            placeholder="Playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
            autoFocus
          />
          <div className="form-actions">
            <button onClick={handleCreatePlaylist}>Create</button>
            <button onClick={() => { setShowCreateForm(false); setNewPlaylistName(''); }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="playlist-list">
        {playlists.length === 0 ? (
          <div className="empty-state">No playlists yet, create one!</div>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-item">
              <div className="playlist-header-item" onClick={() => setSelectedPlaylist(selectedPlaylist === playlist.id ? null : playlist.id)}>
                <div>
                  <h3>{playlist.name}</h3>
                  <p>{playlist.tracks.length} tracks</p>
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePlaylist(playlist.id);
                  }}
                >
                  Delete
                </button>
              </div>
              {selectedPlaylist === playlist.id && (
                <div className="playlist-tracks">
                  {playlist.tracks.length === 0 ? (
                    <div className="empty-tracks">Playlist is empty</div>
                  ) : (
                    playlist.tracks.map((track) => (
                      <div key={track.id} className="playlist-track-item">
                        <span>{track.title} - {track.artist}</span>
                        <button onClick={() => removeTrackFromPlaylist(playlist.id, track.id)}>Remove</button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const AddToPlaylistButton: React.FC<{ track: Track }> = ({ track }) => {
  const { playlists, addTrackToPlaylist } = useMusic();
  const [showMenu, setShowMenu] = useState(false);

  if (playlists.length === 0) {
    return null;
  }

  return (
    <div className="add-to-playlist">
      <button className="add-button" onClick={() => setShowMenu(!showMenu)}>
        + Add to Playlist
      </button>
      {showMenu && (
        <div className="playlist-menu">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => {
                addTrackToPlaylist(playlist.id, track);
                setShowMenu(false);
              }}
            >
              {playlist.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

