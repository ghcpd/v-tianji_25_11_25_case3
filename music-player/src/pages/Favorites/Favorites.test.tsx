import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from '../../context/MusicContext';
import Favorites from './Favorites';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MusicProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </MusicProvider>
  );
};

describe('Favorites Page', () => {
  it('renders page title', () => {
    renderWithProviders(<Favorites />);

    expect(screen.getByText('Liked Songs')).toBeInTheDocument();
  });

  it('shows empty state when no favorites', () => {
    renderWithProviders(<Favorites />);

    expect(screen.getByText('No liked songs yet')).toBeInTheDocument();
    expect(screen.getByText('Songs you like will appear here')).toBeInTheDocument();
  });

  it('shows song count as 0 songs initially', () => {
    renderWithProviders(<Favorites />);

    expect(screen.getByText('0 songs')).toBeInTheDocument();
  });

  it('renders favorites icon', () => {
    renderWithProviders(<Favorites />);

    expect(screen.getByText('❤️')).toBeInTheDocument();
  });
});
