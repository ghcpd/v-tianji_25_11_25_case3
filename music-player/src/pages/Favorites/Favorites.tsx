import { useMusic } from '../../context/MusicContext';
import TrackList from '../../components/TrackList/TrackList';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useMusic();

  return (
    <div className="favorites-page">
      <header className="page-header">
        <div className="favorites-icon">❤️</div>
        <div>
          <h1>Liked Songs</h1>
          <p className="page-subtitle">
            {favorites.length} {favorites.length === 1 ? 'song' : 'songs'}
          </p>
        </div>
      </header>

      {favorites.length > 0 ? (
        <div className="favorites-content">
          <TrackList tracks={favorites} showAlbum />
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">💔</span>
          <h3>No liked songs yet</h3>
          <p>Songs you like will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
