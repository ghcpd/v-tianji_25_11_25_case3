import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlbumCard } from '../AlbumCard';
import { Album } from '../../types';

describe('AlbumCard', () => {
  const mockAlbum: Album = {
    id: '1',
    title: 'Test Album',
    artist: 'Test Artist',
    cover: 'https://example.com/cover.jpg',
    year: 2023,
    tracks: [],
  };

  it('should render album information', () => {
    const onClick = vi.fn();
    render(<AlbumCard album={mockAlbum} onClick={onClick} />);

    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<AlbumCard album={mockAlbum} onClick={onClick} />);

    const card = screen.getByText('Test Album').closest('.album-card') as HTMLElement;
    if (card) {
      card.click();
    }

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

