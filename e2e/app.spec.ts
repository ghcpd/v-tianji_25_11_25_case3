import { test, expect } from '@playwright/test';

test.describe('Music Player E2E Tests', () => {
  test('should load and display album list', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page.locator('h1')).toContainText('Music Player');
    
    // Check album cards
    const albumCards = page.locator('.album-card');
    await expect(albumCards.first()).toBeVisible();
  });

  test('should be able to click album to view details', async ({ page }) => {
    await page.goto('/');
    
    // Click first album
    await page.locator('.album-card').first().click();
    
    // Check if back button is displayed
    await expect(page.locator('.back-button')).toBeVisible();
    
    // Check if track list is displayed
    await expect(page.locator('.track-list')).toBeVisible();
  });

  test('should be able to play track', async ({ page }) => {
    await page.goto('/');
    
    // Click first album
    await page.locator('.album-card').first().click();
    
    // Click first track
    await page.locator('.track-item').first().click();
    
    // Check if player is displayed
    await expect(page.locator('.player')).toBeVisible();
    
    // Check current track info
    await expect(page.locator('.player-track-title')).toBeVisible();
  });

  test('should be able to switch tabs', async ({ page }) => {
    await page.goto('/');
    
    // Switch to playlists tab
    await page.locator('button:has-text("Playlists")').click();
    
    // Check if playlist manager is displayed
    await expect(page.locator('.playlist-manager')).toBeVisible();
    
    // Switch to liked tab
    await page.locator('button:has-text("Liked")').click();
    
    // Check if liked songs view is displayed
    await expect(page.locator('.liked-view')).toBeVisible();
  });

  test('should be able to create playlist', async ({ page }) => {
    await page.goto('/');
    
    // Switch to playlists tab
    await page.locator('button:has-text("Playlists")').click();
    
    // Click new playlist button
    await page.locator('.create-button').click();
    
    // Enter playlist name
    await page.locator('input[placeholder="Playlist name"]').fill('My Test Playlist');
    
    // Click create button
    await page.locator('.form-actions button:has-text("Create")').click();
    
    // Check if playlist is created successfully
    await expect(page.locator('.playlist-item')).toContainText('My Test Playlist');
  });

  test('should be able to like/unlike track', async ({ page }) => {
    await page.goto('/');
    
    // Click first album
    await page.locator('.album-card').first().click();
    
    // Click like button of first track
    const likeButton = page.locator('.like-button').first();
    await likeButton.click();
    
    // Switch to liked tab
    await page.locator('button:has-text("Liked")').click();
    
    // Check if liked songs are displayed
    await expect(page.locator('.track-list')).toBeVisible();
  });

  test('should be able to control player', async ({ page }) => {
    await page.goto('/');
    
    // Click first album and play first track
    await page.locator('.album-card').first().click();
    await page.locator('.track-item').first().click();
    
    // Check play/pause button
    const playPauseButton = page.locator('.play-pause');
    await expect(playPauseButton).toBeVisible();
    
    // Click pause
    await playPauseButton.click();
    
    // Click play
    await playPauseButton.click();
    
    // Check next button
    const nextButton = page.locator('button[aria-label="Next"]');
    await expect(nextButton).toBeVisible();
    await nextButton.click();
  });
});

