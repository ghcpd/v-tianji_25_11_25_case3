import { mockAlbums, getAllTracks } from '../../data/mockData';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import TrackList from '../../components/TrackList/TrackList';
import './Home.css';

const Home = () => {
  const recentAlbums = mockAlbums.slice(0, 4);
  const popularTracks = getAllTracks().slice(0, 5);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Good evening</h1>
        <p className="home-subtitle">Welcome back! Here's what's playing</p>
      </header>

      <section className="home-section">
        <div className="section-header">
          <h2>Recently Added</h2>
        </div>
        <div className="albums-grid">
          {recentAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Popular Tracks</h2>
        </div>
        <TrackList tracks={popularTracks} showAlbum />
      </section>
    </div>
  );
};

export default Home;
