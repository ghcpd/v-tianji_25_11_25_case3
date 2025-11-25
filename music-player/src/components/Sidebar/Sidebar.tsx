import { NavLink } from 'react-router-dom';
import { useMusic } from '../../context/MusicContext';
import './Sidebar.css';

const Sidebar = () => {
  const { playlists } = useMusic();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🎵</span>
        <span className="logo-text">MusicFlow</span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Menu</h3>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </NavLink>
          <NavLink to="/albums" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">💿</span>
            <span>Albums</span>
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">❤️</span>
            <span>Favorites</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">Playlists</h3>
          <NavLink to="/playlists" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📋</span>
            <span>All Playlists</span>
          </NavLink>
          {playlists.slice(0, 5).map((playlist) => (
            <NavLink
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className={({ isActive }) => `nav-link playlist-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">🎶</span>
              <span>{playlist.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
