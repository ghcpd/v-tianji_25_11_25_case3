export type Track = {
  id: string
  title: string
  duration: string
  energy: number
}

export type Album = {
  id: string
  title: string
  artist: string
  mood: string
  year: number
  accent: string
  summary: string
  tracks: Track[]
}

export type Playlist = {
  id: string
  name: string
  tracks: string[]
  accent: string
}

export const parseDurationSeconds = (duration: string): number => {
  const [minutes, seconds] = duration.split(':').map(Number)
  if (Number.isNaN(minutes) || Number.isNaN(seconds)) return 0
  return minutes * 60 + seconds
}

export const toggleLike = (liked: Set<string>, trackId: string): Set<string> => {
  const next = new Set(liked)
  if (next.has(trackId)) {
    next.delete(trackId)
  } else {
    next.add(trackId)
  }
  return next
}

export const createPlaylist = (playlists: Playlist[], name: string): Playlist[] => {
  const accentPalette = ['#7c3aed', '#22c55e', '#e11d48', '#2563eb', '#f59e0b']
  const accent = accentPalette[playlists.length % accentPalette.length]
  const id = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
  return [...playlists, { id, name, accent, tracks: [] }]
}

export const addTrackToPlaylist = (
  playlists: Playlist[],
  playlistId: string,
  trackId: string,
): Playlist[] =>
  playlists.map((playlist) => {
    if (playlist.id !== playlistId) return playlist
    if (playlist.tracks.includes(trackId)) return playlist
    return { ...playlist, tracks: [...playlist.tracks, trackId] }
  })
