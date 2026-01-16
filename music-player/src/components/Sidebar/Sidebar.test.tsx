import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from '../../context/MusicContext';
import Sidebar from './Sidebar';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MusicProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </MusicProvider>
  );
};

describe('Sidebar', () => {
  it('renders logo', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByText('MusicFlow')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Albums')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('All Playlists')).toBeInTheDocument();
  });

  it('has correct href for Home link', () => {
    renderWithProviders(<Sidebar />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('has correct href for Albums link', () => {
    renderWithProviders(<Sidebar />);

    const albumsLink = screen.getByText('Albums').closest('a');
    expect(albumsLink).toHaveAttribute('href', '/albums');
  });

  it('has correct href for Favorites link', () => {
    renderWithProviders(<Sidebar />);

    const favoritesLink = screen.getByText('Favorites').closest('a');
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });

  it('has correct href for Playlists link', () => {
    renderWithProviders(<Sidebar />);

    const playlistsLink = screen.getByText('All Playlists').closest('a');
    expect(playlistsLink).toHaveAttribute('href', '/playlists');
  });

  it('renders section titles', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Playlists')).toBeInTheDocument();
  });
});
