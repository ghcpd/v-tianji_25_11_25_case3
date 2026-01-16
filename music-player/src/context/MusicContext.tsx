import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Track, Playlist, PlayerState } from '../types';

interface MusicContextType {
  // Player state
  playerState: PlayerState;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;

  // Queue
  queue: Track[];
  setQueue: (tracks: Track[]) => void;
  addToQueue: (track: Track) => void;

  // Favorites
  favorites: Track[];
  addToFavorites: (track: Track) => void;
  removeFromFavorites: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;
  toggleFavorite: (track: Track) => void;

  // Playlists
  playlists: Playlist[];
  createPlaylist: (name: string, description?: string) => Playlist;
  deletePlaylist: (playlistId: string) => void;
  addToPlaylist: (playlistId: string, track: Track) => void;
  removeFromPlaylist: (playlistId: string, trackId: string) => void;
  getPlaylistById: (playlistId: string) => Playlist | undefined;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const initialPlayerState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  duration: 0,
  shuffle: false,
  repeat: 'none',
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(initialPlayerState);
  const [queue, setQueue] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const playTrack = useCallback((track: Track) => {
    setPlayerState((prev) => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      progress: 0,
      duration: track.duration,
    }));
  }, []);

  const pauseTrack = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const resumeTrack = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const togglePlay = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPlayerState((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setProgress = useCallback((progress: number) => {
    setPlayerState((prev) => ({ ...prev, progress }));
  }, []);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex((t) => t.id === playerState.currentTrack?.id);
    let nextIndex: number;

    if (playerState.shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        if (playerState.repeat === 'all') {
          nextIndex = 0;
        } else {
          return;
        }
      }
    }

    const nextTrackItem = queue[nextIndex];
    if (nextTrackItem) {
      playTrack(nextTrackItem);
    }
  }, [queue, playerState.currentTrack, playerState.shuffle, playerState.repeat, playTrack]);

  const previousTrack = useCallback(() => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex((t) => t.id === playerState.currentTrack?.id);
    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      if (playerState.repeat === 'all') {
        prevIndex = queue.length - 1;
      } else {
        prevIndex = 0;
      }
    }

    const prevTrackItem = queue[prevIndex];
    if (prevTrackItem) {
      playTrack(prevTrackItem);
    }
  }, [queue, playerState.currentTrack, playerState.repeat, playTrack]);

  const toggleShuffle = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, shuffle: !prev.shuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState((prev) => ({
      ...prev,
      repeat: prev.repeat === 'none' ? 'all' : prev.repeat === 'all' ? 'one' : 'none',
    }));
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setQueue((prev) => [...prev, track]);
  }, []);

  const addToFavorites = useCallback((track: Track) => {
    setFavorites((prev) => {
      if (prev.some((t) => t.id === track.id)) return prev;
      return [...prev, track];
    });
  }, []);

  const removeFromFavorites = useCallback((trackId: string) => {
    setFavorites((prev) => prev.filter((t) => t.id !== trackId));
  }, []);

  const isFavorite = useCallback(
    (trackId: string) => {
      return favorites.some((t) => t.id === trackId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (track: Track) => {
      if (isFavorite(track.id)) {
        removeFromFavorites(track.id);
      } else {
        addToFavorites(track);
      }
    },
    [isFavorite, removeFromFavorites, addToFavorites]
  );

  const createPlaylist = useCallback((name: string, description = ''): Playlist => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      tracks: [],
      createdAt: new Date(),
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
    return newPlaylist;
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
  }, []);

  const addToPlaylist = useCallback((playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          if (p.tracks.some((t) => t.id === track.id)) return p;
          return { ...p, tracks: [...p.tracks, track] };
        }
        return p;
      })
    );
  }, []);

  const removeFromPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          return { ...p, tracks: p.tracks.filter((t) => t.id !== trackId) };
        }
        return p;
      })
    );
  }, []);

  const getPlaylistById = useCallback(
    (playlistId: string): Playlist | undefined => {
      return playlists.find((p) => p.id === playlistId);
    },
    [playlists]
  );

  const value = useMemo(
    () => ({
      playerState,
      playTrack,
      pauseTrack,
      resumeTrack,
      togglePlay,
      setVolume,
      setProgress,
      nextTrack,
      previousTrack,
      toggleShuffle,
      toggleRepeat,
      queue,
      setQueue,
      addToQueue,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      playlists,
      createPlaylist,
      deletePlaylist,
      addToPlaylist,
      removeFromPlaylist,
      getPlaylistById,
    }),
    [
      playerState,
      playTrack,
      pauseTrack,
      resumeTrack,
      togglePlay,
      setVolume,
      setProgress,
      nextTrack,
      previousTrack,
      toggleShuffle,
      toggleRepeat,
      queue,
      addToQueue,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      playlists,
      createPlaylist,
      deletePlaylist,
      addToPlaylist,
      removeFromPlaylist,
      getPlaylistById,
    ]
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
