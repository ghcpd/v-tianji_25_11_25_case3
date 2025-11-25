import { test, expect } from '@playwright/test';

test.describe('Playlists', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playlists');
    await page.waitForLoadState('networkidle');
  });

  test('shows empty state initially', async ({ page }) => {
    await expect(page.getByText('No playlists yet')).toBeVisible();
    await expect(page.getByText('Create your first playlist to start organizing your music')).toBeVisible();
  });

  test('can create a new playlist', async ({ page }) => {
    // Click create button
    await page.getByTestId('create-playlist-btn').click();
    
    // Fill in playlist details
    await page.getByTestId('playlist-name-input').fill('My Test Playlist');
    await page.getByTestId('playlist-description-input').fill('A test description');
    
    // Submit
    await page.getByTestId('submit-playlist-btn').click();
    
    // Playlist should appear
    await expect(page.locator('.playlist-name').getByText('My Test Playlist')).toBeVisible();
  });

  test('can cancel playlist creation', async ({ page }) => {
    // Click create button
    await page.getByTestId('create-playlist-btn').click();
    
    // Modal should be visible
    await expect(page.getByRole('heading', { name: 'Create New Playlist' })).toBeVisible();
    
    // Cancel
    await page.getByRole('button', { name: 'Cancel' }).click();
    
    // Modal should close
    await expect(page.getByRole('heading', { name: 'Create New Playlist' })).not.toBeVisible();
  });

  test('can delete a playlist', async ({ page }) => {
    // Create a playlist first
    await page.getByTestId('create-playlist-btn').click();
    await page.getByTestId('playlist-name-input').fill('Playlist to Delete');
    await page.getByTestId('submit-playlist-btn').click();
    
    // Verify it exists
    await expect(page.locator('.playlist-name').getByText('Playlist to Delete')).toBeVisible();
    
    // Delete it (hover to show delete button)
    const playlistCard = page.locator('[data-testid^="playlist-"]').first();
    await playlistCard.hover();
    await page.locator('[data-testid^="delete-playlist-"]').click();
    
    // Should show empty state again
    await expect(page.locator('.empty-state').getByText('No playlists yet')).toBeVisible();
  });

  test('created playlist appears in sidebar', async ({ page }) => {
    // Create a playlist
    await page.getByTestId('create-playlist-btn').click();
    await page.getByTestId('playlist-name-input').fill('Sidebar Playlist');
    await page.getByTestId('submit-playlist-btn').click();
    
    // Check sidebar
    const sidebar = page.locator('.sidebar');
    await expect(sidebar.getByText('Sidebar Playlist')).toBeVisible();
  });
});
