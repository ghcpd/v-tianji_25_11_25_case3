import type { Album, Track } from '../types';

export const mockAlbums: Album[] = [
  {
    id: 'album-1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    year: 2024,
    coverUrl: 'https://picsum.photos/seed/album1/300/300',
    tracks: [
      {
        id: 'track-1',
        title: 'Starlight Serenade',
        artist: 'Luna Eclipse',
        album: 'Midnight Dreams',
        albumId: 'album-1',
        duration: 234,
        coverUrl: 'https://picsum.photos/seed/album1/300/300',
      },
      {
        id: 'track-2',
        title: 'Moonlit Path',
        artist: 'Luna Eclipse',
        album: 'Midnight Dreams',
        albumId: 'album-1',
        duration: 198,
        coverUrl: 'https://picsum.photos/seed/album1/300/300',
      },
      {
        id: 'track-3',
        title: 'Dreams of Tomorrow',
        artist: 'Luna Eclipse',
        album: 'Midnight Dreams',
        albumId: 'album-1',
        duration: 267,
        coverUrl: 'https://picsum.photos/seed/album1/300/300',
      },
    ],
  },
  {
    id: 'album-2',
    title: 'Urban Echoes',
    artist: 'The Neon Collective',
    year: 2023,
    coverUrl: 'https://picsum.photos/seed/album2/300/300',
    tracks: [
      {
        id: 'track-4',
        title: 'City Lights',
        artist: 'The Neon Collective',
        album: 'Urban Echoes',
        albumId: 'album-2',
        duration: 245,
        coverUrl: 'https://picsum.photos/seed/album2/300/300',
      },
      {
        id: 'track-5',
        title: 'Concrete Jungle',
        artist: 'The Neon Collective',
        album: 'Urban Echoes',
        albumId: 'album-2',
        duration: 312,
        coverUrl: 'https://picsum.photos/seed/album2/300/300',
      },
      {
        id: 'track-6',
        title: 'Night Drive',
        artist: 'The Neon Collective',
        album: 'Urban Echoes',
        albumId: 'album-2',
        duration: 278,
        coverUrl: 'https://picsum.photos/seed/album2/300/300',
      },
    ],
  },
  {
    id: 'album-3',
    title: 'Ocean Waves',
    artist: 'Coastal Vibes',
    year: 2024,
    coverUrl: 'https://picsum.photos/seed/album3/300/300',
    tracks: [
      {
        id: 'track-7',
        title: 'Sunset Beach',
        artist: 'Coastal Vibes',
        album: 'Ocean Waves',
        albumId: 'album-3',
        duration: 189,
        coverUrl: 'https://picsum.photos/seed/album3/300/300',
      },
      {
        id: 'track-8',
        title: 'Tidal Flow',
        artist: 'Coastal Vibes',
        album: 'Ocean Waves',
        albumId: 'album-3',
        duration: 256,
        coverUrl: 'https://picsum.photos/seed/album3/300/300',
      },
    ],
  },
  {
    id: 'album-4',
    title: 'Electric Soul',
    artist: 'Voltage',
    year: 2022,
    coverUrl: 'https://picsum.photos/seed/album4/300/300',
    tracks: [
      {
        id: 'track-9',
        title: 'Power Surge',
        artist: 'Voltage',
        album: 'Electric Soul',
        albumId: 'album-4',
        duration: 223,
        coverUrl: 'https://picsum.photos/seed/album4/300/300',
      },
      {
        id: 'track-10',
        title: 'Lightning Strike',
        artist: 'Voltage',
        album: 'Electric Soul',
        albumId: 'album-4',
        duration: 198,
        coverUrl: 'https://picsum.photos/seed/album4/300/300',
      },
      {
        id: 'track-11',
        title: 'Static Energy',
        artist: 'Voltage',
        album: 'Electric Soul',
        albumId: 'album-4',
        duration: 287,
        coverUrl: 'https://picsum.photos/seed/album4/300/300',
      },
      {
        id: 'track-12',
        title: 'Amplified',
        artist: 'Voltage',
        album: 'Electric Soul',
        albumId: 'album-4',
        duration: 245,
        coverUrl: 'https://picsum.photos/seed/album4/300/300',
      },
    ],
  },
];

export const getAllTracks = (): Track[] => {
  return mockAlbums.flatMap((album) => album.tracks);
};

export const getAlbumById = (id: string): Album | undefined => {
  return mockAlbums.find((album) => album.id === id);
};

export const getTrackById = (id: string): Track | undefined => {
  return getAllTracks().find((track) => track.id === id);
};
