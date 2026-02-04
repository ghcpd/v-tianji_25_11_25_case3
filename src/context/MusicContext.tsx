import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Track, Album, Playlist, PlayerState } from '../types';
import { mockAlbums } from '../data/mockData';

interface MusicContextType {
  albums: Album[];
  playlists: Playlist[];
  likedTracks: Set<string>;
  playerState: PlayerState;
  playTrack: (track: Track, album?: Album) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  toggleLike: (trackId: string) => void;
  createPlaylist: (name: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  deletePlaylist: (playlistId: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
};

const initialPlayerState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  volume: 1,
  queue: [],
  currentIndex: -1,
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [albums] = useState<Album[]>(mockAlbums);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const [playerState, setPlayerState] = useState<PlayerState>(initialPlayerState);

  const playTrack = useCallback((track: Track, album?: Album) => {
    const queue = album ? album.tracks : [track];
    const index = queue.findIndex(t => t.id === track.id);
    
    setPlayerState({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      volume: playerState.volume,
      queue,
      currentIndex: index >= 0 ? index : 0,
    });
  }, [playerState.volume]);

  const pauseTrack = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const resumeTrack = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const nextTrack = useCallback(() => {
    setPlayerState(prev => {
      if (prev.queue.length === 0 || prev.currentIndex === -1) return prev;
      const nextIndex = (prev.currentIndex + 1) % prev.queue.length;
      return {
        ...prev,
        currentTrack: prev.queue[nextIndex],
        currentIndex: nextIndex,
        currentTime: 0,
        isPlaying: true,
      };
    });
  }, []);

  const previousTrack = useCallback(() => {
    setPlayerState(prev => {
      if (prev.queue.length === 0 || prev.currentIndex === -1) return prev;
      const prevIndex = prev.currentIndex === 0 ? prev.queue.length - 1 : prev.currentIndex - 1;
      return {
        ...prev,
        currentTrack: prev.queue[prevIndex],
        currentIndex: prevIndex,
        currentTime: 0,
        isPlaying: true,
      };
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPlayerState(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setPlayerState(prev => ({ ...prev, currentTime: Math.max(0, time) }));
  }, []);

  const toggleLike = useCallback((trackId: string) => {
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  }, []);

  const createPlaylist = useCallback((name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      tracks: [],
      createdAt: new Date(),
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  }, []);

  const addTrackToPlaylist = useCallback((playlistId: string, track: Track) => {
    setPlaylists(prev =>
      prev.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: [...playlist.tracks.filter(t => t.id !== track.id), track] }
          : playlist
      )
    );
  }, []);

  const removeTrackFromPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists(prev =>
      prev.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: playlist.tracks.filter(t => t.id !== trackId) }
          : playlist
      )
    );
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
  }, []);

  // Auto-play next track
  useEffect(() => {
    if (playerState.currentTime >= (playerState.currentTrack?.duration || 0) && playerState.isPlaying) {
      nextTrack();
    }
  }, [playerState.currentTime, playerState.currentTrack, playerState.isPlaying, nextTrack]);

  return (
    <MusicContext.Provider
      value={{
        albums,
        playlists,
        likedTracks,
        playerState,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        setVolume,
        setCurrentTime,
        toggleLike,
        createPlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

