/// <reference types="vitest" />
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('music player experience', () => {
  it('lets me browse albums, like tracks, build playlists, and play them', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByLabelText(/Select album Neon Season/i))
    expect(screen.getByRole('heading', { level: 2, name: /Neon Season/ })).toBeInTheDocument()

    const velvetTrack = within(screen.getByTestId('track-ns-1'))
    await user.click(velvetTrack.getByLabelText(/Like Velvet Driver/i))
    expect(velvetTrack.getByText('♥')).toBeInTheDocument()

    await user.click(velvetTrack.getByText('Add'))
    const focusCard = screen.getByTestId('playlist-focus')
    expect(within(focusCard).getByText('Velvet Driver')).toBeInTheDocument()

    await user.click(velvetTrack.getByText(/Play/))
    expect(screen.getAllByText('Velvet Driver')[0]).toBeInTheDocument()

    const playButton = within(focusCard as HTMLElement).getByText('Play')
    await user.click(playButton)
    const nowCard = screen.getByText(/Now Playing/i).closest('.now-card') as HTMLElement
    expect(within(nowCard).getByText(/Stone Lanterns/i)).toBeInTheDocument()
  })
})
