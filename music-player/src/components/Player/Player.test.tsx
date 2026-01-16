import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider, useMusic } from '../../context/MusicContext';
import Player from './Player';
import type { Track } from '../../types';
import React from 'react';

const mockTrack: Track = {
  id: 'track-1',
  title: 'Test Song',
  artist: 'Test Artist',
  album: 'Test Album',
  albumId: 'album-1',
  duration: 180,
  coverUrl: 'https://example.com/cover.jpg',
};

const PlayerWithTrack = () => {
  const { playTrack } = useMusic();
  
  React.useEffect(() => {
    playTrack(mockTrack);
  }, []);
  
  return <Player />;
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MusicProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </MusicProvider>
  );
};

describe('Player', () => {
  it('shows message when no track is selected', () => {
    renderWithProviders(<Player />);

    expect(screen.getByText('Select a track to play')).toBeInTheDocument();
  });

  it('shows track info when track is playing', () => {
    renderWithProviders(<PlayerWithTrack />);

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('shows track cover image', () => {
    renderWithProviders(<PlayerWithTrack />);

    const img = screen.getByAltText('Test Album');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('has play/pause button', () => {
    renderWithProviders(<PlayerWithTrack />);

    const playBtn = screen.getByTestId('play-btn');
    expect(playBtn).toBeInTheDocument();
  });

  it('has previous and next buttons', () => {
    renderWithProviders(<PlayerWithTrack />);

    expect(screen.getByTestId('prev-btn')).toBeInTheDocument();
    expect(screen.getByTestId('next-btn')).toBeInTheDocument();
  });

  it('has shuffle and repeat buttons', () => {
    renderWithProviders(<PlayerWithTrack />);

    expect(screen.getByTestId('shuffle-btn')).toBeInTheDocument();
    expect(screen.getByTestId('repeat-btn')).toBeInTheDocument();
  });

  it('has progress slider', () => {
    renderWithProviders(<PlayerWithTrack />);

    expect(screen.getByTestId('progress-slider')).toBeInTheDocument();
  });

  it('has volume slider', () => {
    renderWithProviders(<PlayerWithTrack />);

    expect(screen.getByTestId('volume-slider')).toBeInTheDocument();
  });

  it('displays formatted duration', () => {
    renderWithProviders(<PlayerWithTrack />);

    expect(screen.getByText('3:00')).toBeInTheDocument();
  });
});
