import { useParams, useNavigate } from 'react-router-dom';
import { useMusic } from '../../context/MusicContext';
import TrackList from '../../components/TrackList/TrackList';
import { formatDate } from '../../utils/helpers';
import './PlaylistDetail.css';

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPlaylistById, playTrack, setQueue, deletePlaylist } = useMusic();

  const playlist = id ? getPlaylistById(id) : undefined;

  if (!playlist) {
    return (
      <div className="playlist-detail-page">
        <div className="not-found">
          <h2>Playlist not found</h2>
          <button onClick={() => navigate('/playlists')} className="back-btn">
            Back to Playlists
          </button>
        </div>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks);
      playTrack(playlist.tracks[0]!);
    }
  };

  const handleDelete = () => {
    deletePlaylist(playlist.id);
    navigate('/playlists');
  };

  return (
    <div className="playlist-detail-page">
      <div className="playlist-hero">
        <div className="playlist-hero-cover">
          {playlist.tracks[0]?.coverUrl ? (
            <img src={playlist.tracks[0].coverUrl} alt={playlist.name} />
          ) : (
            <div className="playlist-cover-placeholder">🎶</div>
          )}
        </div>
        <div className="playlist-hero-info">
          <span className="playlist-label">Playlist</span>
          <h1 className="playlist-title">{playlist.name}</h1>
          {playlist.description && <p className="playlist-description">{playlist.description}</p>}
          <div className="playlist-meta">
            <span>{playlist.tracks.length} tracks</span>
            <span className="playlist-dot">•</span>
            <span>Created {formatDate(playlist.createdAt)}</span>
          </div>
          <div className="playlist-actions">
            {playlist.tracks.length > 0 && (
              <button className="play-all-btn" onClick={handlePlayAll} data-testid="play-playlist-btn">
                ▶️ Play All
              </button>
            )}
            <button className="delete-btn" onClick={handleDelete} data-testid="delete-playlist-btn">
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {playlist.tracks.length > 0 ? (
        <div className="playlist-tracks">
          <TrackList tracks={playlist.tracks} showAlbum />
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">🎵</span>
          <h3>This playlist is empty</h3>
          <p>Add songs from albums to build your playlist</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;
