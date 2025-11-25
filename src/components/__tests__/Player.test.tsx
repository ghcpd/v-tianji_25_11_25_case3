import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Player } from '../Player';
import { MusicProvider } from '../../context/MusicContext';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MusicProvider>{children}</MusicProvider>
);

describe('Player', () => {
  it('should not render when there is no current track', () => {
    const { container } = render(<Player />, { wrapper });
    expect(container.firstChild).toBeNull();
  });
});

