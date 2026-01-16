import { test, expect } from '@playwright/test';

test.describe('Favorites', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('can add track to favorites', async ({ page }) => {
    // Click favorite button on first track
    await page.getByTestId('favorite-btn-track-1').click();
    
    // Navigate to favorites page
    await page.locator('.nav-link').getByText('Favorites').click();
    await expect(page).toHaveURL('/favorites');
    
    // Track should be in favorites
    await expect(page.getByText('Starlight Serenade')).toBeVisible();
    await expect(page.getByText('1 song')).toBeVisible();
  });

  test('can remove track from favorites', async ({ page }) => {
    // Add to favorites first
    await page.getByTestId('favorite-btn-track-1').click();
    
    // Navigate to favorites
    await page.locator('.nav-link').getByText('Favorites').click();
    await expect(page.getByText('Starlight Serenade')).toBeVisible();
    
    // Remove from favorites
    await page.getByTestId('favorite-btn-track-1').click();
    
    // Should show empty state
    await expect(page.getByText('No liked songs yet')).toBeVisible();
  });

  test('favorite icon changes when favorited', async ({ page }) => {
    const favoriteBtn = page.getByTestId('favorite-btn-track-1');
    
    // Initially should show empty heart
    await expect(favoriteBtn).toContainText('🤍');
    
    // Click to favorite
    await favoriteBtn.click();
    
    // Should show filled heart
    await expect(favoriteBtn).toContainText('❤️');
  });
});
