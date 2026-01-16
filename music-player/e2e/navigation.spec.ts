import { test, expect } from '@playwright/test';

test.describe('Music Player App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('displays home page with greeting', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Good evening' })).toBeVisible();
    await expect(page.getByText("Welcome back! Here's what's playing")).toBeVisible();
  });

  test('displays sidebar with navigation', async ({ page }) => {
    await expect(page.locator('.logo-text').getByText('MusicFlow')).toBeVisible();
    await expect(page.locator('.nav-link').getByText('Home')).toBeVisible();
    await expect(page.locator('.nav-link').getByText('Albums')).toBeVisible();
    await expect(page.locator('.nav-link').getByText('Favorites')).toBeVisible();
    await expect(page.locator('.nav-link').getByText('All Playlists')).toBeVisible();
  });

  test('navigates to Albums page', async ({ page }) => {
    await page.locator('.nav-link').getByText('Albums').click();
    await expect(page).toHaveURL('/albums');
    await expect(page.getByRole('heading', { name: 'Albums' })).toBeVisible();
    await expect(page.getByText('Browse all albums in your library')).toBeVisible();
  });

  test('navigates to Favorites page', async ({ page }) => {
    await page.locator('.nav-link').getByText('Favorites').click();
    await expect(page).toHaveURL('/favorites');
    await expect(page.locator('h1').getByText('Liked Songs')).toBeVisible();
    await expect(page.locator('.empty-state').getByText('No liked songs yet')).toBeVisible();
  });

  test('navigates to Playlists page', async ({ page }) => {
    await page.locator('.nav-link').getByText('All Playlists').click();
    await expect(page).toHaveURL('/playlists');
    await expect(page.locator('.page-header h1').getByText('Playlists')).toBeVisible();
    await expect(page.locator('.empty-state').getByText('No playlists yet')).toBeVisible();
  });

  test('displays albums on home page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recently Added' })).toBeVisible();
    await expect(page.getByTestId('album-card-album-1')).toBeVisible();
  });

  test('displays popular tracks on home page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Popular Tracks' })).toBeVisible();
    await expect(page.getByTestId('track-item-track-1')).toBeVisible();
  });

  test('player shows message when no track selected', async ({ page }) => {
    await expect(page.getByText('Select a track to play')).toBeVisible();
  });
});
