import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from '../../context/MusicContext';
import AlbumCard from './AlbumCard';
import type { Album } from '../../types';

const mockAlbum: Album = {
  id: 'test-album-1',
  title: 'Test Album',
  artist: 'Test Artist',
  year: 2024,
  coverUrl: 'https://example.com/cover.jpg',
  tracks: [
    {
      id: 'track-1',
      title: 'Track 1',
      artist: 'Test Artist',
      album: 'Test Album',
      albumId: 'test-album-1',
      duration: 200,
      coverUrl: 'https://example.com/cover.jpg',
    },
  ],
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MusicProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </MusicProvider>
  );
};

describe('AlbumCard', () => {
  it('renders album information', () => {
    renderWithProviders(<AlbumCard album={mockAlbum} />);

    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders album cover image', () => {
    renderWithProviders(<AlbumCard album={mockAlbum} />);

    const img = screen.getByAltText('Test Album');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('has a link to album detail page', () => {
    renderWithProviders(<AlbumCard album={mockAlbum} />);

    const link = screen.getByTestId('album-card-test-album-1');
    expect(link).toHaveAttribute('href', '/album/test-album-1');
  });

  it('has a play button', () => {
    renderWithProviders(<AlbumCard album={mockAlbum} />);

    const playButton = screen.getByTestId('play-album-test-album-1');
    expect(playButton).toBeInTheDocument();
  });

  it('play button has correct aria label', () => {
    renderWithProviders(<AlbumCard album={mockAlbum} />);

    const playButton = screen.getByLabelText('Play Test Album');
    expect(playButton).toBeInTheDocument();
  });
});
