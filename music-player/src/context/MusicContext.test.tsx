import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, renderHook } from '@testing-library/react';
import { MusicProvider, useMusic } from '../context/MusicContext';
import type { Track } from '../types';

const mockTrack: Track = {
  id: 'test-track-1',
  title: 'Test Song',
  artist: 'Test Artist',
  album: 'Test Album',
  albumId: 'test-album-1',
  duration: 200,
  coverUrl: 'https://example.com/cover.jpg',
};

const mockTrack2: Track = {
  id: 'test-track-2',
  title: 'Test Song 2',
  artist: 'Test Artist 2',
  album: 'Test Album 2',
  albumId: 'test-album-2',
  duration: 180,
  coverUrl: 'https://example.com/cover2.jpg',
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MusicProvider>{children}</MusicProvider>
);

describe('MusicContext', () => {
  describe('Player State', () => {
    it('initializes with default state', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      expect(result.current.playerState.currentTrack).toBeNull();
      expect(result.current.playerState.isPlaying).toBe(false);
      expect(result.current.playerState.volume).toBe(0.7);
      expect(result.current.playerState.progress).toBe(0);
    });

    it('plays a track', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.playTrack(mockTrack);
      });

      expect(result.current.playerState.currentTrack).toEqual(mockTrack);
      expect(result.current.playerState.isPlaying).toBe(true);
    });

    it('pauses and resumes track', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.playTrack(mockTrack);
      });
      expect(result.current.playerState.isPlaying).toBe(true);

      act(() => {
        result.current.pauseTrack();
      });
      expect(result.current.playerState.isPlaying).toBe(false);

      act(() => {
        result.current.resumeTrack();
      });
      expect(result.current.playerState.isPlaying).toBe(true);
    });

    it('toggles play state', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.playTrack(mockTrack);
      });
      expect(result.current.playerState.isPlaying).toBe(true);

      act(() => {
        result.current.togglePlay();
      });
      expect(result.current.playerState.isPlaying).toBe(false);

      act(() => {
        result.current.togglePlay();
      });
      expect(result.current.playerState.isPlaying).toBe(true);
    });

    it('sets volume within bounds', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.setVolume(0.5);
      });
      expect(result.current.playerState.volume).toBe(0.5);

      act(() => {
        result.current.setVolume(1.5);
      });
      expect(result.current.playerState.volume).toBe(1);

      act(() => {
        result.current.setVolume(-0.5);
      });
      expect(result.current.playerState.volume).toBe(0);
    });

    it('sets progress', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.setProgress(100);
      });
      expect(result.current.playerState.progress).toBe(100);
    });

    it('toggles shuffle', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      expect(result.current.playerState.shuffle).toBe(false);

      act(() => {
        result.current.toggleShuffle();
      });
      expect(result.current.playerState.shuffle).toBe(true);

      act(() => {
        result.current.toggleShuffle();
      });
      expect(result.current.playerState.shuffle).toBe(false);
    });

    it('cycles through repeat modes', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      expect(result.current.playerState.repeat).toBe('none');

      act(() => {
        result.current.toggleRepeat();
      });
      expect(result.current.playerState.repeat).toBe('all');

      act(() => {
        result.current.toggleRepeat();
      });
      expect(result.current.playerState.repeat).toBe('one');

      act(() => {
        result.current.toggleRepeat();
      });
      expect(result.current.playerState.repeat).toBe('none');
    });
  });

  describe('Favorites', () => {
    it('adds track to favorites', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.addToFavorites(mockTrack);
      });

      expect(result.current.favorites).toContainEqual(mockTrack);
      expect(result.current.isFavorite(mockTrack.id)).toBe(true);
    });

    it('does not add duplicate favorites', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.addToFavorites(mockTrack);
        result.current.addToFavorites(mockTrack);
      });

      expect(result.current.favorites.filter(t => t.id === mockTrack.id)).toHaveLength(1);
    });

    it('removes track from favorites', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.addToFavorites(mockTrack);
      });
      expect(result.current.isFavorite(mockTrack.id)).toBe(true);

      act(() => {
        result.current.removeFromFavorites(mockTrack.id);
      });
      expect(result.current.isFavorite(mockTrack.id)).toBe(false);
    });

    it('toggles favorite status', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.toggleFavorite(mockTrack);
      });
      expect(result.current.isFavorite(mockTrack.id)).toBe(true);

      act(() => {
        result.current.toggleFavorite(mockTrack);
      });
      expect(result.current.isFavorite(mockTrack.id)).toBe(false);
    });
  });

  describe('Playlists', () => {
    it('creates a playlist', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      let playlist: ReturnType<typeof result.current.createPlaylist>;
      act(() => {
        playlist = result.current.createPlaylist('My Playlist', 'A test playlist');
      });

      expect(result.current.playlists).toHaveLength(1);
      expect(result.current.playlists[0]?.name).toBe('My Playlist');
      expect(result.current.playlists[0]?.description).toBe('A test playlist');
    });

    it('deletes a playlist', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      let playlist: ReturnType<typeof result.current.createPlaylist>;
      act(() => {
        playlist = result.current.createPlaylist('My Playlist');
      });

      act(() => {
        result.current.deletePlaylist(playlist!.id);
      });

      expect(result.current.playlists).toHaveLength(0);
    });

    it('adds track to playlist', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      let playlist: ReturnType<typeof result.current.createPlaylist>;
      act(() => {
        playlist = result.current.createPlaylist('My Playlist');
      });

      act(() => {
        result.current.addToPlaylist(playlist!.id, mockTrack);
      });

      const updatedPlaylist = result.current.getPlaylistById(playlist!.id);
      expect(updatedPlaylist?.tracks).toContainEqual(mockTrack);
    });

    it('does not add duplicate tracks to playlist', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      let playlist: ReturnType<typeof result.current.createPlaylist>;
      act(() => {
        playlist = result.current.createPlaylist('My Playlist');
      });

      act(() => {
        result.current.addToPlaylist(playlist!.id, mockTrack);
        result.current.addToPlaylist(playlist!.id, mockTrack);
      });

      const updatedPlaylist = result.current.getPlaylistById(playlist!.id);
      expect(updatedPlaylist?.tracks.filter(t => t.id === mockTrack.id)).toHaveLength(1);
    });

    it('removes track from playlist', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      let playlist: ReturnType<typeof result.current.createPlaylist>;
      act(() => {
        playlist = result.current.createPlaylist('My Playlist');
      });

      act(() => {
        result.current.addToPlaylist(playlist!.id, mockTrack);
      });

      act(() => {
        result.current.removeFromPlaylist(playlist!.id, mockTrack.id);
      });

      const updatedPlaylist = result.current.getPlaylistById(playlist!.id);
      expect(updatedPlaylist?.tracks).toHaveLength(0);
    });

    it('gets playlist by id', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      let playlist: ReturnType<typeof result.current.createPlaylist>;
      act(() => {
        playlist = result.current.createPlaylist('My Playlist');
      });

      const found = result.current.getPlaylistById(playlist!.id);
      expect(found).toBeDefined();
      expect(found?.name).toBe('My Playlist');
    });

    it('returns undefined for non-existent playlist', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      const found = result.current.getPlaylistById('non-existent');
      expect(found).toBeUndefined();
    });
  });

  describe('Queue', () => {
    it('sets queue', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.setQueue([mockTrack, mockTrack2]);
      });

      expect(result.current.queue).toHaveLength(2);
    });

    it('adds track to queue', () => {
      const { result } = renderHook(() => useMusic(), { wrapper });
      
      act(() => {
        result.current.addToQueue(mockTrack);
      });

      expect(result.current.queue).toContainEqual(mockTrack);
    });
  });

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useMusic());
    }).toThrow('useMusic must be used within a MusicProvider');
  });
});
