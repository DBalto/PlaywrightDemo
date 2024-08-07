const { test, expect } = require('@playwright/test');

test.describe('Sauce Demo Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Sauce Demo site
    await page.goto('https://www.saucedemo.com/');
  });

  test('should log in with valid credentials', async ({ page }) => {
    // Enter username
    await page.fill('#user-name', 'standard_user');

    // Enter password
    await page.fill('#password', 'secret_sauce');

    // Click the login button
    await page.click('#login-button');

    // Verify that the user is redirected to the inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Verify that the inventory page has loaded
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('should fail to log in with invalid credentials', async ({ page }) => {
    // Enter invalid username
    await page.fill('#user-name', 'invalid_user');

    // Enter invalid password
    await page.fill('#password', 'invalid_password');

    // Click the login button
    await page.click('#login-button');

    // Verify that an error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Username and password do not match/i);
  });

  test('should log out successfully', async ({ page }) => {
    // Log in first
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Open the side menu and click logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    // Verify that the user is redirected back to the login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
