import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrackList } from '../TrackList';
import { Track } from '../../types';
import { MusicProvider } from '../../context/MusicContext';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MusicProvider>{children}</MusicProvider>
);

describe('TrackList', () => {
  const mockTracks: Track[] = [
    {
      id: '1',
      title: 'Song 1',
      artist: 'Artist 1',
      album: 'Album 1',
      duration: 180,
    },
    {
      id: '2',
      title: 'Song 2',
      artist: 'Artist 2',
      album: 'Album 2',
      duration: 240,
    },
  ];

  it('should render track list', () => {
    render(<TrackList tracks={mockTracks} />, { wrapper });

    expect(screen.getByText('Song 1')).toBeInTheDocument();
    expect(screen.getByText('Song 2')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
  });

  it('should format time display', () => {
    render(<TrackList tracks={mockTracks} />, { wrapper });

    expect(screen.getByText('3:00')).toBeInTheDocument();
    expect(screen.getByText('4:00')).toBeInTheDocument();
  });

  it('should display album information when showAlbum is true', () => {
    render(<TrackList tracks={mockTracks} showAlbum />, { wrapper });

    expect(screen.getByText(/Album 1/)).toBeInTheDocument();
    expect(screen.getByText(/Album 2/)).toBeInTheDocument();
  });
});

