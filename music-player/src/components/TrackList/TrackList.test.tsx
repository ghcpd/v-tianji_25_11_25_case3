import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider, useMusic } from '../../context/MusicContext';
import TrackList from './TrackList';
import type { Track } from '../../types';

const mockTracks: Track[] = [
  {
    id: 'track-1',
    title: 'First Song',
    artist: 'Artist One',
    album: 'Album One',
    albumId: 'album-1',
    duration: 180,
    coverUrl: 'https://example.com/cover1.jpg',
  },
  {
    id: 'track-2',
    title: 'Second Song',
    artist: 'Artist Two',
    album: 'Album Two',
    albumId: 'album-2',
    duration: 240,
    coverUrl: 'https://example.com/cover2.jpg',
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MusicProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </MusicProvider>
  );
};

describe('TrackList', () => {
  it('renders all tracks', () => {
    renderWithProviders(<TrackList tracks={mockTracks} />);

    expect(screen.getByText('First Song')).toBeInTheDocument();
    expect(screen.getByText('Second Song')).toBeInTheDocument();
  });

  it('renders track artists', () => {
    renderWithProviders(<TrackList tracks={mockTracks} />);

    expect(screen.getByText('Artist One')).toBeInTheDocument();
    expect(screen.getByText('Artist Two')).toBeInTheDocument();
  });

  it('renders track durations formatted correctly', () => {
    renderWithProviders(<TrackList tracks={mockTracks} />);

    expect(screen.getByText('3:00')).toBeInTheDocument();
    expect(screen.getByText('4:00')).toBeInTheDocument();
  });

  it('renders track numbers', () => {
    renderWithProviders(<TrackList tracks={mockTracks} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows album column when showAlbum is true', () => {
    renderWithProviders(<TrackList tracks={mockTracks} showAlbum />);

    expect(screen.getByText('Album One')).toBeInTheDocument();
    expect(screen.getByText('Album Two')).toBeInTheDocument();
  });

  it('renders favorite buttons for each track', () => {
    renderWithProviders(<TrackList tracks={mockTracks} />);

    expect(screen.getByTestId('favorite-btn-track-1')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn-track-2')).toBeInTheDocument();
  });

  it('renders track items with correct test ids', () => {
    renderWithProviders(<TrackList tracks={mockTracks} />);

    expect(screen.getByTestId('track-item-track-1')).toBeInTheDocument();
    expect(screen.getByTestId('track-item-track-2')).toBeInTheDocument();
  });

  it('renders track cover images', () => {
    renderWithProviders(<TrackList tracks={mockTracks} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('renders empty list when no tracks provided', () => {
    renderWithProviders(<TrackList tracks={[]} />);

    const trackList = screen.getByTestId('track-list');
    expect(trackList).toBeInTheDocument();
  });
});
