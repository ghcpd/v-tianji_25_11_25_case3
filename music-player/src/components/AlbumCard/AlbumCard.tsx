import { Link } from 'react-router-dom';
import type { Album } from '../../types';
import { useMusic } from '../../context/MusicContext';
import './AlbumCard.css';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const { playTrack, setQueue } = useMusic();

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQueue(album.tracks);
    if (album.tracks[0]) {
      playTrack(album.tracks[0]);
    }
  };

  return (
    <Link to={`/album/${album.id}`} className="album-card" data-testid={`album-card-${album.id}`}>
      <div className="album-card-cover-wrapper">
        <img src={album.coverUrl} alt={album.title} className="album-card-cover" />
        <button
          className="album-card-play-btn"
          onClick={handlePlay}
          aria-label={`Play ${album.title}`}
          data-testid={`play-album-${album.id}`}
        >
          ▶️
        </button>
      </div>
      <div className="album-card-info">
        <h3 className="album-card-title">{album.title}</h3>
        <p className="album-card-artist">{album.artist}</p>
        <p className="album-card-year">{album.year}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;
