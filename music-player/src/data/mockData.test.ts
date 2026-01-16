import { describe, it, expect } from 'vitest';
import { mockAlbums, getAllTracks, getAlbumById, getTrackById } from '../data/mockData';

describe('mockData', () => {
  describe('mockAlbums', () => {
    it('contains albums', () => {
      expect(mockAlbums.length).toBeGreaterThan(0);
    });

    it('albums have required properties', () => {
      mockAlbums.forEach((album) => {
        expect(album).toHaveProperty('id');
        expect(album).toHaveProperty('title');
        expect(album).toHaveProperty('artist');
        expect(album).toHaveProperty('year');
        expect(album).toHaveProperty('coverUrl');
        expect(album).toHaveProperty('tracks');
      });
    });

    it('albums have tracks', () => {
      mockAlbums.forEach((album) => {
        expect(album.tracks.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getAllTracks', () => {
    it('returns all tracks from all albums', () => {
      const tracks = getAllTracks();
      const totalTracks = mockAlbums.reduce((sum, album) => sum + album.tracks.length, 0);
      expect(tracks.length).toBe(totalTracks);
    });

    it('tracks have required properties', () => {
      const tracks = getAllTracks();
      tracks.forEach((track) => {
        expect(track).toHaveProperty('id');
        expect(track).toHaveProperty('title');
        expect(track).toHaveProperty('artist');
        expect(track).toHaveProperty('album');
        expect(track).toHaveProperty('albumId');
        expect(track).toHaveProperty('duration');
        expect(track).toHaveProperty('coverUrl');
      });
    });
  });

  describe('getAlbumById', () => {
    it('returns album when found', () => {
      const album = getAlbumById('album-1');
      expect(album).toBeDefined();
      expect(album?.id).toBe('album-1');
    });

    it('returns undefined when not found', () => {
      const album = getAlbumById('non-existent');
      expect(album).toBeUndefined();
    });
  });

  describe('getTrackById', () => {
    it('returns track when found', () => {
      const track = getTrackById('track-1');
      expect(track).toBeDefined();
      expect(track?.id).toBe('track-1');
    });

    it('returns undefined when not found', () => {
      const track = getTrackById('non-existent');
      expect(track).toBeUndefined();
    });
  });
});
