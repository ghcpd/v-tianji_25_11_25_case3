import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MusicProvider, useMusic } from '../MusicContext';
import { Track } from '../../types';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MusicProvider>{children}</MusicProvider>
);

describe('MusicContext', () => {
  it('should provide album list', () => {
    const { result } = renderHook(() => useMusic(), { wrapper });
    expect(result.current.albums).toBeDefined();
    expect(result.current.albums.length).toBeGreaterThan(0);
  });

  it('should be able to play track', () => {
    const { result } = renderHook(() => useMusic(), { wrapper });
    const track: Track = {
      id: 'test-1',
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      duration: 180,
    };

    act(() => {
      result.current.playTrack(track);
    });

    expect(result.current.playerState.currentTrack).toEqual(track);
    expect(result.current.playerState.isPlaying).toBe(true);
  });

  it('should be able to pause and resume playback', () => {
    const { result } = renderHook(() => useMusic(), { wrapper });
    const track: Track = {
      id: 'test-1',
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      duration: 180,
    };

    act(() => {
      result.current.playTrack(track);
    });

    act(() => {
      result.current.pauseTrack();
    });
    expect(result.current.playerState.isPlaying).toBe(false);

    act(() => {
      result.current.resumeTrack();
    });
    expect(result.current.playerState.isPlaying).toBe(true);
  });

  it('should be able to toggle like status', () => {
    const { result } = renderHook(() => useMusic(), { wrapper });
    const trackId = 'test-1';

    expect(result.current.likedTracks.has(trackId)).toBe(false);

    act(() => {
      result.current.toggleLike(trackId);
    });
    expect(result.current.likedTracks.has(trackId)).toBe(true);

    act(() => {
      result.current.toggleLike(trackId);
    });
    expect(result.current.likedTracks.has(trackId)).toBe(false);
  });

  it('should be able to create playlist', () => {
    const { result } = renderHook(() => useMusic(), { wrapper });
    const initialCount = result.current.playlists.length;

    act(() => {
      result.current.createPlaylist('My Playlist');
    });

    expect(result.current.playlists.length).toBe(initialCount + 1);
    expect(result.current.playlists[initialCount].name).toBe('My Playlist');
  });

  it('should be able to add track to playlist', () => {
    const { result } = renderHook(() => useMusic(), { wrapper });
    const track: Track = {
      id: 'test-1',
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      duration: 180,
    };

    act(() => {
      result.current.createPlaylist('Test Playlist');
    });

    const playlistId = result.current.playlists[0].id;

    act(() => {
      result.current.addTrackToPlaylist(playlistId, track);
    });

    expect(result.current.playlists[0].tracks).toContainEqual(track);
  });

  it('should be able to delete playlist', () => {
    const { result } = renderHook(() => useMusic(), { wrapper });

    act(() => {
      result.current.createPlaylist('Test Playlist');
    });

    const playlistId = result.current.playlists[0].id;
    const initialCount = result.current.playlists.length;

    act(() => {
      result.current.deletePlaylist(playlistId);
    });

    expect(result.current.playlists.length).toBe(initialCount - 1);
    expect(result.current.playlists.find(p => p.id === playlistId)).toBeUndefined();
  });
});

