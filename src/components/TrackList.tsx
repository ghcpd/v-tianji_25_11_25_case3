import React from 'react';
import { Track } from '../types';
import { useMusic } from '../context/MusicContext';
import './TrackList.css';

interface TrackListProps {
  tracks: Track[];
  showAlbum?: boolean;
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, showAlbum = false }) => {
  const { playerState, playTrack, toggleLike, likedTracks } = useMusic();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isCurrentTrack = (track: Track) => {
    return playerState.currentTrack?.id === track.id;
  };

  return (
    <div className="track-list">
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className={`track-item ${isCurrentTrack(track) ? 'active' : ''}`}
          onClick={() => playTrack(track)}
        >
          <div className="track-number">{index + 1}</div>
          <div className="track-info">
            <div className="track-title">{track.title}</div>
            <div className="track-meta">
              {track.artist}
              {showAlbum && ` • ${track.album}`}
            </div>
          </div>
          <div className="track-actions">
            <button
              className={`like-button ${likedTracks.has(track.id) ? 'liked' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(track.id);
              }}
              aria-label={likedTracks.has(track.id) ? 'Unlike' : 'Like'}
            >
              {likedTracks.has(track.id) ? '❤️' : '🤍'}
            </button>
            <div className="track-duration">{formatTime(track.duration)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

