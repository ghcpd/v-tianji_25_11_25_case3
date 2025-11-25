import { useMusic } from '../../context/MusicContext';
import { formatDuration } from '../../utils/helpers';
import './Player.css';

const Player = () => {
  const {
    playerState,
    togglePlay,
    setVolume,
    setProgress,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
  } = useMusic();

  const { currentTrack, isPlaying, volume, progress, duration, shuffle, repeat } = playerState;

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  if (!currentTrack) {
    return (
      <footer className="player player-empty">
        <div className="player-message">Select a track to play</div>
      </footer>
    );
  }

  return (
    <footer className="player" data-testid="player">
      <div className="player-track-info">
        <img src={currentTrack.coverUrl} alt={currentTrack.album} className="player-cover" />
        <div className="player-track-details">
          <div className="player-track-title">{currentTrack.title}</div>
          <div className="player-track-artist">{currentTrack.artist}</div>
        </div>
      </div>

      <div className="player-controls">
        <div className="player-buttons">
          <button
            className={`player-btn shuffle-btn ${shuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
            aria-label="Shuffle"
            data-testid="shuffle-btn"
          >
            🔀
          </button>
          <button className="player-btn" onClick={previousTrack} aria-label="Previous" data-testid="prev-btn">
            ⏮️
          </button>
          <button
            className="player-btn play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            data-testid="play-btn"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="player-btn" onClick={nextTrack} aria-label="Next" data-testid="next-btn">
            ⏭️
          </button>
          <button
            className={`player-btn repeat-btn ${repeat !== 'none' ? 'active' : ''}`}
            onClick={toggleRepeat}
            aria-label="Repeat"
            data-testid="repeat-btn"
          >
            {repeat === 'one' ? '🔂' : '🔁'}
          </button>
        </div>

        <div className="player-progress">
          <span className="player-time">{formatDuration(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleProgressChange}
            className="progress-slider"
            aria-label="Progress"
            data-testid="progress-slider"
          />
          <span className="player-time">{formatDuration(duration)}</span>
        </div>
      </div>

      <div className="player-volume">
        <span className="volume-icon">{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Volume"
          data-testid="volume-slider"
        />
      </div>
    </footer>
  );
};

export default Player;
