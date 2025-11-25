import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from '../../context/MusicContext';
import Playlists from './Playlists';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MusicProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </MusicProvider>
  );
};

describe('Playlists Page', () => {
  it('renders page title', () => {
    renderWithProviders(<Playlists />);

    expect(screen.getByText('Playlists')).toBeInTheDocument();
  });

  it('renders page subtitle', () => {
    renderWithProviders(<Playlists />);

    expect(screen.getByText('Your personal collections')).toBeInTheDocument();
  });

  it('renders create playlist button', () => {
    renderWithProviders(<Playlists />);

    expect(screen.getByTestId('create-playlist-btn')).toBeInTheDocument();
    expect(screen.getByText('+ Create Playlist')).toBeInTheDocument();
  });

  it('shows empty state when no playlists', () => {
    renderWithProviders(<Playlists />);

    expect(screen.getByText('No playlists yet')).toBeInTheDocument();
    expect(screen.getByText('Create your first playlist to start organizing your music')).toBeInTheDocument();
  });

  it('opens create playlist modal when button clicked', async () => {
    renderWithProviders(<Playlists />);

    const createBtn = screen.getByTestId('create-playlist-btn');
    await userEvent.click(createBtn);

    expect(screen.getByText('Create New Playlist')).toBeInTheDocument();
    expect(screen.getByTestId('playlist-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('playlist-description-input')).toBeInTheDocument();
  });

  it('creates playlist when form submitted', async () => {
    renderWithProviders(<Playlists />);

    const createBtn = screen.getByTestId('create-playlist-btn');
    await userEvent.click(createBtn);

    const nameInput = screen.getByTestId('playlist-name-input');
    await userEvent.type(nameInput, 'My New Playlist');

    const submitBtn = screen.getByTestId('submit-playlist-btn');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('My New Playlist')).toBeInTheDocument();
    });
  });

  it('closes modal when cancel clicked', async () => {
    renderWithProviders(<Playlists />);

    const createBtn = screen.getByTestId('create-playlist-btn');
    await userEvent.click(createBtn);

    expect(screen.getByText('Create New Playlist')).toBeInTheDocument();

    const cancelBtn = screen.getByText('Cancel');
    await userEvent.click(cancelBtn);

    expect(screen.queryByText('Create New Playlist')).not.toBeInTheDocument();
  });
});
