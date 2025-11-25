import type { Track } from '../../types';
import { useMusic } from '../../context/MusicContext';
import { formatDuration } from '../../utils/helpers';
import './TrackList.css';

interface TrackListProps {
  tracks: Track[];
  showAlbum?: boolean;
  onTrackClick?: (track: Track) => void;
}

const TrackList = ({ tracks, showAlbum = false, onTrackClick }: TrackListProps) => {
  const { playTrack, setQueue, playerState, toggleFavorite, isFavorite } = useMusic();

  const handleTrackClick = (track: Track) => {
    if (onTrackClick) {
      onTrackClick(track);
    } else {
      setQueue(tracks);
      playTrack(track);
    }
  };

  return (
    <div className="track-list" data-testid="track-list">
      <div className="track-list-header">
        <span className="track-num">#</span>
        <span className="track-title-header">Title</span>
        {showAlbum && <span className="track-album-header">Album</span>}
        <span className="track-duration-header">⏱️</span>
        <span className="track-actions-header"></span>
      </div>
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className={`track-item ${playerState.currentTrack?.id === track.id ? 'active' : ''}`}
          onClick={() => handleTrackClick(track)}
          data-testid={`track-item-${track.id}`}
        >
          <span className="track-num">
            {playerState.currentTrack?.id === track.id && playerState.isPlaying ? (
              <span className="playing-indicator">🎵</span>
            ) : (
              index + 1
            )}
          </span>
          <div className="track-info">
            <img src={track.coverUrl} alt={track.album} className="track-cover" />
            <div className="track-details">
              <span className="track-title">{track.title}</span>
              <span className="track-artist">{track.artist}</span>
            </div>
          </div>
          {showAlbum && <span className="track-album">{track.album}</span>}
          <span className="track-duration">{formatDuration(track.duration)}</span>
          <div className="track-actions">
            <button
              className={`favorite-btn ${isFavorite(track.id) ? 'favorited' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(track);
              }}
              aria-label={isFavorite(track.id) ? 'Remove from favorites' : 'Add to favorites'}
              data-testid={`favorite-btn-${track.id}`}
            >
              {isFavorite(track.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
