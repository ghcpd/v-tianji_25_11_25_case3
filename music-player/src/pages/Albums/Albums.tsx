import { mockAlbums } from '../../data/mockData';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import './Albums.css';

const Albums = () => {
  return (
    <div className="albums-page">
      <header className="page-header">
        <h1>Albums</h1>
        <p className="page-subtitle">Browse all albums in your library</p>
      </header>

      <div className="albums-grid">
        {mockAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default Albums;
