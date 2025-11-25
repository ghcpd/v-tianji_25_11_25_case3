import { test, expect } from '@playwright/test';

test.describe('Album Details', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/albums');
    await page.waitForLoadState('networkidle');
  });

  test('can navigate to album detail page', async ({ page }) => {
    // Click on first album
    await page.getByTestId('album-card-album-1').click();
    
    await expect(page).toHaveURL('/album/album-1');
    await expect(page.getByRole('heading', { name: 'Midnight Dreams' })).toBeVisible();
    await expect(page.locator('.album-artist').getByText('Luna Eclipse')).toBeVisible();
  });

  test('album detail shows track list', async ({ page }) => {
    await page.getByTestId('album-card-album-1').click();
    
    // Should show album tracks
    await expect(page.getByText('Starlight Serenade')).toBeVisible();
    await expect(page.getByText('Moonlit Path')).toBeVisible();
    await expect(page.getByText('Dreams of Tomorrow')).toBeVisible();
  });

  test('album detail shows album metadata', async ({ page }) => {
    await page.getByTestId('album-card-album-1').click();
    
    // Should show album type label
    await expect(page.locator('.album-label').getByText('Album')).toBeVisible();
    
    // Should show year
    await expect(page.locator('.album-meta').getByText('2024')).toBeVisible();
    
    // Should show track count
    await expect(page.getByText('3 songs')).toBeVisible();
  });

  test('can play all tracks from album', async ({ page }) => {
    await page.getByTestId('album-card-album-1').click();
    
    // Click play all button
    await page.getByTestId('play-all-btn').click();
    
    // Player should show first track
    const player = page.getByTestId('player');
    await expect(player).toBeVisible();
    await expect(player.getByText('Starlight Serenade')).toBeVisible();
  });

  test('can play album from album card button', async ({ page }) => {
    // Hover over album to show play button
    const albumCard = page.getByTestId('album-card-album-1');
    await albumCard.hover();
    
    // Click play button
    await page.getByTestId('play-album-album-1').click();
    
    // Player should show first track of that album
    await expect(page.getByTestId('player').getByText('Starlight Serenade')).toBeVisible();
  });
});
