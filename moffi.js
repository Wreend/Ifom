const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://app.moffi.io/fr/environnement/en_e82df6f5-0903-4515-a3ed-a99a9fe48d38/coworking/534109-Paris-14-personnes');
  await page.getByRole('button', { name: 'MOFFI Se connecter avec MOFFI' }).click();
  await page.getByRole('textbox', { name: 'Adresse mail' }).click();
  await page.getByRole('textbox', { name: 'Adresse mail' }).fill(process.env.MOFFI_EMAIL);
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('textbox', { name: 'Mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill(process.env.MOFFI_PASSWORD);
  await page.getByRole('textbox', { name: 'Mot de passe' }).press('Enter');
  // Date cible = J+14
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 14);
  
  const targetDay = String(targetDate.getDate());
  
  if (
    targetDate.getMonth() !== new Date().getMonth() ||
    targetDate.getFullYear() !== new Date().getFullYear()
  ) {
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.waitForTimeout(500);
  }
  
  await page.locator('.mat-calendar-body-cell-content')
    .getByText(targetDay, { exact: true })
    .click();
  await page.getByRole('button', { name: 'Valider la réservation' }).click();
  await browser.close();
})();
