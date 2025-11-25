import React, { useEffect, useRef } from 'react';
import { useMusic } from '../context/MusicContext';
import './Player.css';

export const Player: React.FC = () => {
  const { playerState, pauseTrack, resumeTrack, nextTrack, previousTrack, setVolume, setCurrentTime } = useMusic();
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !playerState.currentTrack) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * playerState.currentTrack.duration;
    setCurrentTime(newTime);
  };

  const progressPercent = playerState.currentTrack
    ? (playerState.currentTime / playerState.currentTrack.duration) * 100
    : 0;

  // Simulate playback progress
  useEffect(() => {
    if (!playerState.isPlaying || !playerState.currentTrack) return;

    const interval = setInterval(() => {
      const newTime = playerState.currentTime + 1;
      if (newTime >= playerState.currentTrack!.duration) {
        setCurrentTime(playerState.currentTrack!.duration);
      } else {
        setCurrentTime(newTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playerState.isPlaying, playerState.currentTrack, playerState.currentTime, setCurrentTime]);

  if (!playerState.currentTrack) {
    return null;
  }

  return (
    <div className="player">
      <div className="player-content">
        <div className="player-track-info">
          <div className="player-track-title">{playerState.currentTrack.title}</div>
          <div className="player-track-artist">{playerState.currentTrack.artist}</div>
        </div>

        <div className="player-controls">
          <button className="control-button" onClick={previousTrack} aria-label="Previous">
            ⏮
          </button>
          <button
            className="control-button play-pause"
            onClick={playerState.isPlaying ? pauseTrack : resumeTrack}
            aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
          >
            {playerState.isPlaying ? '⏸' : '▶'}
          </button>
          <button className="control-button" onClick={nextTrack} aria-label="Next">
            ⏭
          </button>
        </div>

        <div className="player-progress-section">
          <div
            ref={progressRef}
            className="player-progress-bar"
            onClick={handleProgressClick}
          >
            <div
              className="player-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="player-time">
            <span>{formatTime(playerState.currentTime)}</span>
            <span>/</span>
            <span>{formatTime(playerState.currentTrack.duration)}</span>
          </div>
        </div>

        <div className="player-volume">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={playerState.volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
          <span>{Math.round(playerState.volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

