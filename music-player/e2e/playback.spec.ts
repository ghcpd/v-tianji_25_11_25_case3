import { test, expect } from '@playwright/test';

test.describe('Music Playback', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('clicking on a track starts playback', async ({ page }) => {
    // Click on the first track
    await page.getByTestId('track-item-track-1').click();
    
    // Player should now show the track info
    const player = page.getByTestId('player');
    await expect(player).toBeVisible();
    await expect(player.getByText('Starlight Serenade')).toBeVisible();
    await expect(player.getByText('Luna Eclipse')).toBeVisible();
  });

  test('play/pause button toggles playback', async ({ page }) => {
    // First play a track
    await page.getByTestId('track-item-track-1').click();
    
    // Get the play button
    const playBtn = page.getByTestId('play-btn');
    await expect(playBtn).toBeVisible();
    
    // Should show pause icon when playing
    await expect(playBtn).toContainText('⏸️');
    
    // Click to pause
    await playBtn.click();
    await expect(playBtn).toContainText('▶️');
    
    // Click to resume
    await playBtn.click();
    await expect(playBtn).toContainText('⏸️');
  });

  test('shuffle button toggles shuffle mode', async ({ page }) => {
    await page.getByTestId('track-item-track-1').click();
    
    const shuffleBtn = page.getByTestId('shuffle-btn');
    await expect(shuffleBtn).toBeVisible();
    
    // Toggle shuffle
    await shuffleBtn.click();
    await expect(shuffleBtn).toHaveClass(/active/);
    
    // Toggle off
    await shuffleBtn.click();
    await expect(shuffleBtn).not.toHaveClass(/active/);
  });

  test('repeat button cycles through modes', async ({ page }) => {
    await page.getByTestId('track-item-track-1').click();
    
    const repeatBtn = page.getByTestId('repeat-btn');
    await expect(repeatBtn).toBeVisible();
    
    // Click to enable repeat all
    await repeatBtn.click();
    await expect(repeatBtn).toHaveClass(/active/);
  });

  test('volume slider changes volume', async ({ page }) => {
    await page.getByTestId('track-item-track-1').click();
    
    const volumeSlider = page.getByTestId('volume-slider');
    await expect(volumeSlider).toBeVisible();
    
    // Change volume
    await volumeSlider.fill('0.5');
  });
});
