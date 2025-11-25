import { Album, Track } from '../types';

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Melody Under the Moonlight',
    artist: 'Starry Sky Band',
    cover: 'https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=Melody+Under+the+Moonlight',
    year: 2023,
    tracks: [
      { id: '1-1', title: 'Moonlight Overture', artist: 'Starry Sky Band', album: 'Melody Under the Moonlight', duration: 180 },
      { id: '1-2', title: 'Brightest Star in the Night Sky', artist: 'Starry Sky Band', album: 'Melody Under the Moonlight', duration: 240 },
      { id: '1-3', title: 'Dream', artist: 'Starry Sky Band', album: 'Melody Under the Moonlight', duration: 200 },
      { id: '1-4', title: 'Dawn', artist: 'Starry Sky Band', album: 'Melody Under the Moonlight', duration: 195 },
    ],
  },
  {
    id: '2',
    title: 'City Sounds',
    artist: 'Urban Walker',
    cover: 'https://via.placeholder.com/300x300/E94B3C/FFFFFF?text=City+Sounds',
    year: 2024,
    tracks: [
      { id: '2-1', title: 'Neon Lights', artist: 'Urban Walker', album: 'City Sounds', duration: 220 },
      { id: '2-2', title: 'Subway Station', artist: 'Urban Walker', album: 'City Sounds', duration: 190 },
      { id: '2-3', title: 'Midnight Coffee', artist: 'Urban Walker', album: 'City Sounds', duration: 210 },
    ],
  },
  {
    id: '3',
    title: 'Nature Sounds',
    artist: 'Forest Choir',
    cover: 'https://via.placeholder.com/300x300/50C878/FFFFFF?text=Nature+Sounds',
    year: 2023,
    tracks: [
      { id: '3-1', title: 'Bird Song', artist: 'Forest Choir', album: 'Nature Sounds', duration: 165 },
      { id: '3-2', title: 'Stream', artist: 'Forest Choir', album: 'Nature Sounds', duration: 185 },
      { id: '3-3', title: 'Wind', artist: 'Forest Choir', album: 'Nature Sounds', duration: 175 },
      { id: '3-4', title: 'Raindrops', artist: 'Forest Choir', album: 'Nature Sounds', duration: 200 },
      { id: '3-5', title: 'Sunrise', artist: 'Forest Choir', album: 'Nature Sounds', duration: 195 },
    ],
  },
];

export const getAllTracks = (): Track[] => {
  return mockAlbums.flatMap(album => album.tracks);
};

