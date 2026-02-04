/// <reference types="vitest" />
import { describe, expect, it } from 'vitest'
import {
  addTrackToPlaylist,
  createPlaylist,
  parseDurationSeconds,
  toggleLike,
  type Playlist,
} from '../lib/library'

describe('library helpers', () => {
  it('parses duration strings into seconds', () => {
    expect(parseDurationSeconds('3:45')).toBe(225)
    expect(parseDurationSeconds('0:15')).toBe(15)
    expect(parseDurationSeconds('bad')).toBe(0)
  })

  it('toggles likes without mutating the original set', () => {
    const liked = new Set<string>(['a'])
    const next = toggleLike(liked, 'b')
    expect(next.has('b')).toBe(true)
    expect(liked.has('b')).toBe(false)
    const removed = toggleLike(next, 'a')
    expect(removed.has('a')).toBe(false)
  })

  it('creates playlists with unique ids and accents', () => {
    const base: Playlist[] = []
    const created = createPlaylist(base, 'Morning Vibes')
    expect(created).toHaveLength(1)
    expect(created[0].id).toMatch(/morning-vibes/)
    expect(created[0].accent).toBeTruthy()
  })

  it('adds tracks to playlists while avoiding duplicates', () => {
    const playlists: Playlist[] = [{ id: 'focus', name: 'Focus', tracks: ['a'], accent: '#fff' }]
    const updated = addTrackToPlaylist(playlists, 'focus', 'b')
    expect(updated[0].tracks).toContain('b')
    const duplicate = addTrackToPlaylist(updated, 'focus', 'b')
    expect(duplicate[0].tracks.filter((track) => track === 'b')).toHaveLength(1)
  })
})
