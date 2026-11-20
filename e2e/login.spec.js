const { test, expect } = require('@playwright/test');

test.describe('Login flow', () => {
  test('connexion réussie redirige vers dashboard', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#email', 'a@test.fr');
    await page.fill('#password', 'secret');
    await page.click('button[type=submit]');
    await expect(page).toHaveURL(/.*dashboard\.html/);
  });

  test('connexion échouée affiche un message erreur et reste sur login', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#email', 'a@test.fr');
    await page.fill('#password', 'mauvais-mdp');
    await page.click('button[type=submit]');
    await expect(page.locator('#erreur')).toHaveText('Identifiants invalides');
    await expect(page).toHaveURL(/.*login\.html/);
  });
});
