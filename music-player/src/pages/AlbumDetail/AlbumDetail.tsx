import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumById } from '../../data/mockData';
import { useMusic } from '../../context/MusicContext';
import TrackList from '../../components/TrackList/TrackList';
import { formatDuration } from '../../utils/helpers';
import './AlbumDetail.css';

const AlbumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playTrack, setQueue } = useMusic();

  const album = id ? getAlbumById(id) : undefined;

  if (!album) {
    return (
      <div className="album-detail-page">
        <div className="not-found">
          <h2>Album not found</h2>
          <button onClick={() => navigate('/albums')} className="back-btn">
            Back to Albums
          </button>
        </div>
      </div>
    );
  }

  const totalDuration = album.tracks.reduce((acc, track) => acc + track.duration, 0);

  const handlePlayAll = () => {
    setQueue(album.tracks);
    if (album.tracks[0]) {
      playTrack(album.tracks[0]);
    }
  };

  return (
    <div className="album-detail-page">
      <div className="album-hero">
        <img src={album.coverUrl} alt={album.title} className="album-hero-cover" />
        <div className="album-hero-info">
          <span className="album-label">Album</span>
          <h1 className="album-title">{album.title}</h1>
          <div className="album-meta">
            <span className="album-artist">{album.artist}</span>
            <span className="album-dot">•</span>
            <span>{album.year}</span>
            <span className="album-dot">•</span>
            <span>{album.tracks.length} songs</span>
            <span className="album-dot">•</span>
            <span>{formatDuration(totalDuration)}</span>
          </div>
          <div className="album-actions">
            <button className="play-all-btn" onClick={handlePlayAll} data-testid="play-all-btn">
              ▶️ Play All
            </button>
          </div>
        </div>
      </div>

      <div className="album-tracks">
        <TrackList tracks={album.tracks} />
      </div>
    </div>
  );
};

export default AlbumDetail;
