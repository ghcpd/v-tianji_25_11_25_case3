import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from '../../context/MusicContext';
import Albums from './Albums';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MusicProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </MusicProvider>
  );
};

describe('Albums Page', () => {
  it('renders page title', () => {
    renderWithProviders(<Albums />);

    expect(screen.getByText('Albums')).toBeInTheDocument();
  });

  it('renders page subtitle', () => {
    renderWithProviders(<Albums />);

    expect(screen.getByText('Browse all albums in your library')).toBeInTheDocument();
  });

  it('renders all albums from mock data', () => {
    renderWithProviders(<Albums />);

    expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();
    expect(screen.getByText('Urban Echoes')).toBeInTheDocument();
    expect(screen.getByText('Ocean Waves')).toBeInTheDocument();
    expect(screen.getByText('Electric Soul')).toBeInTheDocument();
  });

  it('renders album artists', () => {
    renderWithProviders(<Albums />);

    expect(screen.getByText('Luna Eclipse')).toBeInTheDocument();
    expect(screen.getByText('The Neon Collective')).toBeInTheDocument();
    expect(screen.getByText('Coastal Vibes')).toBeInTheDocument();
    expect(screen.getByText('Voltage')).toBeInTheDocument();
  });
});
