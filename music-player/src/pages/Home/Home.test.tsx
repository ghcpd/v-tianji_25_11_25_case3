import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from '../../context/MusicContext';
import Home from './Home';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MusicProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </MusicProvider>
  );
};

describe('Home Page', () => {
  it('renders greeting', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText('Good evening')).toBeInTheDocument();
  });

  it('renders welcome subtitle', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText("Welcome back! Here's what's playing")).toBeInTheDocument();
  });

  it('renders Recently Added section', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText('Recently Added')).toBeInTheDocument();
  });

  it('renders Popular Tracks section', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText('Popular Tracks')).toBeInTheDocument();
  });

  it('renders album cards', () => {
    renderWithProviders(<Home />);

    // Check for album cards by test id
    expect(screen.getByTestId('album-card-album-1')).toBeInTheDocument();
  });

  it('renders track list', () => {
    renderWithProviders(<Home />);

    // Check for at least one track from mock data
    expect(screen.getByText('Starlight Serenade')).toBeInTheDocument();
  });
});
