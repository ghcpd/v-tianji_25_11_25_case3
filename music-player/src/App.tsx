import { useEffect, useMemo, useState } from 'react'
import {
  addTrackToPlaylist,
  createPlaylist,
  parseDurationSeconds,
  toggleLike,
} from './lib/library'
import type { Album, Playlist, Track } from './lib/library'
import './App.css'

const albums: Album[] = [
  {
    id: 'aurora',
    title: 'Aurora Echoes',
    artist: 'Nova Bloom',
    mood: 'Chillwave',
    year: 2025,
    accent: 'linear-gradient(135deg, #6fd8fe, #8b8dfc)',
    summary: 'Glass-like synths over slow-burning drums, perfect for twilight.',
    tracks: [
      { id: 'ae-1', title: 'Soft Landing', duration: '3:52', energy: 65 },
      { id: 'ae-2', title: 'Silver Coast', duration: '4:21', energy: 62 },
      { id: 'ae-3', title: 'Night Swim', duration: '3:44', energy: 58 },
      { id: 'ae-4', title: 'Blue Static', duration: '4:05', energy: 71 },
    ],
  },
  {
    id: 'neon',
    title: 'Neon Season',
    artist: 'Luxe Valley',
    mood: 'Indietronica',
    year: 2024,
    accent: 'linear-gradient(135deg, #ffb26b, #ff6f91)',
    summary: 'Driving bass lines and neon-soaked hooks for late nights.',
    tracks: [
      { id: 'ns-1', title: 'Velvet Driver', duration: '3:18', energy: 82 },
      { id: 'ns-2', title: 'Chrome Garden', duration: '3:49', energy: 76 },
      { id: 'ns-3', title: 'Borrowed Fire', duration: '4:12', energy: 80 },
      { id: 'ns-4', title: 'City Bloom', duration: '3:57', energy: 78 },
    ],
  },
  {
    id: 'terra',
    title: 'Terra Forma',
    artist: 'Maru Isles',
    mood: 'Organic House',
    year: 2025,
    accent: 'linear-gradient(135deg, #6ee7b7, #3b82f6)',
    summary: 'Organic percussion and lifted pads for focused flow.',
    tracks: [
      { id: 'tf-1', title: 'River Pulse', duration: '5:02', energy: 69 },
      { id: 'tf-2', title: 'Stone Lanterns', duration: '4:44', energy: 64 },
      { id: 'tf-3', title: 'Above the Pines', duration: '4:11', energy: 72 },
      { id: 'tf-4', title: 'Last Bloom', duration: '3:55', energy: 66 },
    ],
  },
]

const starterPlaylists: Playlist[] = [
  { id: 'focus', name: 'Focus Flow', accent: '#7c3aed', tracks: ['tf-2', 'ae-3'] },
  { id: 'sunset', name: 'Sunset Drive', accent: '#f97316', tracks: ['ns-1', 'ae-1'] },
]

function App() {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(albums[0].id)
  const [queue, setQueue] = useState<Track[]>(albums[0].tracks)
  const [currentTrackId, setCurrentTrackId] = useState<string>(albums[0].tracks[0].id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [playlists, setPlaylists] = useState<Playlist[]>(starterPlaylists)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [activePlaylistTarget, setActivePlaylistTarget] = useState<string>(
    starterPlaylists[0]?.id ?? '',
  )

  const libraryTracks = useMemo(() => albums.flatMap((album) => album.tracks), [])

  const selectedAlbum = useMemo(
    () => albums.find((album) => album.id === selectedAlbumId) ?? albums[0],
    [selectedAlbumId],
  )

  const currentTrack = useMemo(
    () => queue.find((track) => track.id === currentTrackId) ?? queue[0],
    [queue, currentTrackId],
  )

  const currentAlbum = useMemo(
    () => albums.find((album) => album.tracks.some((track) => track.id === currentTrackId)) ?? selectedAlbum,
    [currentTrackId, selectedAlbum],
  )

  useEffect(() => {
    setQueue(selectedAlbum.tracks)
    setCurrentTrackId(selectedAlbum.tracks[0].id)
    setProgress(0)
    setIsPlaying(false)
  }, [selectedAlbum])

  useEffect(() => {
    if (!isPlaying) return

    const interval = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          advanceToNext()
          return 0
        }

        return value + 1.5
      })
    }, 350)

    return () => window.clearInterval(interval)
  }, [isPlaying, currentTrackId, queue])

  const advanceToNext = () => {
    const currentIndex = queue.findIndex((track) => track.id === currentTrackId)
    const next = currentIndex >= 0 && currentIndex < queue.length - 1 ? queue[currentIndex + 1] : queue[0]
    setCurrentTrackId(next.id)
    setProgress(0)
  }

  const goPrevious = () => {
    const currentIndex = queue.findIndex((track) => track.id === currentTrackId)
    const prev = currentIndex > 0 ? queue[currentIndex - 1] : queue[queue.length - 1]
    setCurrentTrackId(prev.id)
    setProgress(0)
  }

  const handlePlayTrack = (track: Track) => {
    setCurrentTrackId(track.id)
    if (!queue.find((item) => item.id === track.id)) {
      setQueue((items) => [...items, track])
    }
    setProgress(0)
    setIsPlaying(true)
  }

  const handleToggleLike = (trackId: string) => {
    setLikedIds((prev) => toggleLike(prev, trackId))
  }

  const addToPlaylist = (track: Track) => {
    if (!activePlaylistTarget) return
    setPlaylists((prev) => addTrackToPlaylist(prev, activePlaylistTarget, track.id))
  }

  const handleCreatePlaylist = () => {
    const name = newPlaylistName.trim()
    if (!name) return
    const updated = createPlaylist(playlists, name)
    setPlaylists(updated)
    setActivePlaylistTarget(updated[updated.length - 1].id)
    setNewPlaylistName('')
  }

  const minutesOfMusic = useMemo(
    () =>
      libraryTracks.reduce(
        (sum, track) => sum + Math.round(parseDurationSeconds(track.duration) / 60),
        0,
      ),
    [libraryTracks],
  )

  const playPlaylistQueue = (playlist: Playlist) => {
    const tracks = playlist.tracks.map((id) => libraryTracks.find((track) => track.id === id)).filter(Boolean) as Track[]

    if (!tracks.length) return

    setQueue(tracks)
    setCurrentTrackId(tracks[0].id)
    setProgress(0)
    setIsPlaying(true)
  }

  return (
    <div className="page">
      <div className="ambient-blur" />
      <header className="hero">
        <div>
          <p className="pill">Pulse.fm — music playground</p>
          <h1>
            Curated albums, <span className="accent">instant playback</span>, and playlists you own.
          </h1>
          <p className="lede">
            Glide between albums, spark a mix, and mark your favourites. Everything stays live as you play.
          </p>
          <div className="meta">
            <div>
              <strong>{albums.length}</strong>
              <span>albums</span>
            </div>
            <div>
              <strong>{minutesOfMusic}m</strong>
              <span>of music</span>
            </div>
            <div>
              <strong>{likedIds.size}</strong>
              <span>liked tracks</span>
            </div>
          </div>
        </div>
        <div className="now-card">
          <div className="glow" />
          <div className="now-head">
            <span className="pill outline">Now Playing</span>
            <button
              className="ghost"
              onClick={() => setIsPlaying((state) => !state)}
              aria-label="Toggle playback"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
          <div className="now-track">
            <div className="bubble" style={{ backgroundImage: selectedAlbum.accent }}>
              <span>♪</span>
            </div>
            <div>
              <p className="title">{currentTrack?.title}</p>
              <p className="muted">{currentAlbum.title} · {currentTrack?.duration}</p>
            </div>
          </div>
          <div className="progress">
            <div className="bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="time">
            <span>0:00</span>
            <span>{currentTrack?.duration}</span>
          </div>
          <div className="controls">
            <button className="ghost" onClick={goPrevious} aria-label="Previous track">
              ⟲
            </button>
            <button className="primary" onClick={() => setIsPlaying((state) => !state)}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="ghost" onClick={advanceToNext} aria-label="Next track">
              ⟳
            </button>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="pill outline">Albums</p>
              <h2>Browse the drops</h2>
            </div>
          </div>
          <div className="album-grid">
            {albums.map((album) => (
              <button
                key={album.id}
                className={`album ${album.id === selectedAlbumId ? 'active' : ''}`}
                onClick={() => setSelectedAlbumId(album.id)}
                aria-label={`Select album ${album.title}`}
              >
                <div className="album-cover" style={{ backgroundImage: album.accent }}>
                  <div className="spark">✦</div>
                </div>
                <div className="album-meta">
                  <div className="row">
                    <h3>{album.title}</h3>
                    <span className="badge">{album.year}</span>
                  </div>
                  <p className="muted">{album.artist}</p>
                  <p className="muted">{album.summary}</p>
                  <p className="pill tiny">{album.mood}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="panel-subheader">
            <div>
              <p className="pill outline">Tracks</p>
              <h2>{selectedAlbum.title}</h2>
            </div>
            <div className="inline">
              <label htmlFor="playlist-select" className="muted">
                Quick add →
              </label>
              <select
                id="playlist-select"
                value={activePlaylistTarget}
                onChange={(event) => setActivePlaylistTarget(event.target.value)}
              >
                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="tracklist">
            {selectedAlbum.tracks.map((track) => {
              const liked = likedIds.has(track.id)
              const isCurrent = currentTrack?.id === track.id
              return (
                <div
                  key={track.id}
                  className={`track ${isCurrent ? 'current' : ''}`}
                  data-testid={`track-${track.id}`}
                >
                  <div>
                    <p className="title">{track.title}</p>
                    <p className="muted">
                      {selectedAlbum.artist} · {track.duration}
                    </p>
                  </div>
                  <div className="row actions">
                    <span className="pill tiny energy">Energy {track.energy}</span>
                    <button className="ghost" onClick={() => handlePlayTrack(track)}>
                      {isCurrent && isPlaying ? 'Playing' : 'Play'}
                    </button>
                    <button
                      className={`ghost ${liked ? 'liked' : ''}`}
                      onClick={() => handleToggleLike(track.id)}
                      aria-label={`Like ${track.title}`}
                    >
                      {liked ? '♥' : '♡'}
                    </button>
                    <button className="ghost" onClick={() => addToPlaylist(track)}>
                      Add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header row between">
            <div>
              <p className="pill outline">Playlists</p>
              <h2>Stack & spin</h2>
            </div>
            <div className="new-playlist">
              <input
                value={newPlaylistName}
                onChange={(event) => setNewPlaylistName(event.target.value)}
                placeholder="New playlist name"
              />
              <button className="primary" onClick={handleCreatePlaylist} aria-label="Create playlist">
                Create
              </button>
            </div>
          </div>
          <div className="playlist-list">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="playlist-card"
                data-testid={`playlist-${playlist.id}`}
                style={{ borderColor: playlist.accent }}
              >
                <div className="row between">
                  <div>
                    <p className="title">{playlist.name}</p>
                    <p className="muted">{playlist.tracks.length} tracks</p>
                  </div>
                  <button className="ghost" onClick={() => playPlaylistQueue(playlist)}>
                    Play
                  </button>
                </div>
                <div className="playlist-chips">
                  {playlist.tracks.map((id) => {
                    const track =
                      albums.flatMap((album) => album.tracks).find((item) => item.id === id)
                    if (!track) return null
                    return (
                      <span key={id} className="chip">
                        {track.title}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="panel-subheader">
            <div>
              <p className="pill outline">Queue</p>
              <h3>What is coming up</h3>
            </div>
            <div className="row gap">
              <button className="ghost" onClick={goPrevious} aria-label="Queue previous">
                Prev
              </button>
              <button className="ghost" onClick={advanceToNext} aria-label="Queue next">
                Next
              </button>
            </div>
          </div>
          <div className="queue">
            {queue.map((track) => (
              <button
                key={track.id}
                className={`queue-item ${track.id === currentTrackId ? 'current' : ''}`}
                onClick={() => handlePlayTrack(track)}
              >
                <span>{track.title}</span>
                <span className="muted">{track.duration}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
