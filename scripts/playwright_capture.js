const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', (msg) => {
    console.log('[console]', msg.type(), msg.text());
  });
  page.on('pageerror', (err) => {
    console.error('[pageerror]', err.stack || err.message || err);
  });
  page.on('response', (res) => {
    if (res.status() >= 400) {
      console.warn('[response]', res.status(), res.url());
    }
  });

  // 1) Visit analytics to ensure it loads without error
  let url = 'http://localhost:5173/analytics';
  console.log('Navigating to', url);
  let resp = await page.goto(url, { waitUntil: 'networkidle' });
  console.log('Analytics response status:', resp && resp.status());

  // Wait briefly
  await page.waitForTimeout(1000);

  // 2) Visit login and perform login
  url = 'http://localhost:5173/login';
  console.log('Navigating to', url);
  resp = await page.goto(url, { waitUntil: 'networkidle' });
  console.log('Login page status:', resp && resp.status());

  // Fill login form
  await page.fill('input[placeholder="Email"]', 'admin@demo-hms.com');
  await page.fill('input[placeholder="Password"]', 'Admin@123');
  await page.click('button[type="submit"]');

  // Wait for navigation or header update
  await page.waitForTimeout(1500);

  // Check for user email in header
  const headerEmail = await page.locator('header').first().textContent();
  console.log('Header text after login:', headerEmail && headerEmail.trim().slice(0, 200));

  // 3) Visit dashboard
  url = 'http://localhost:5173/';
  console.log('Navigating to', url);
  resp = await page.goto(url, { waitUntil: 'networkidle' });
  console.log('Dashboard status:', resp && resp.status());

  await page.waitForTimeout(1000);

  // Check for presence of Dashboard heading
  const dashboardHeading = await page.locator('h1').filter({ hasText: 'Dashboard' }).first().textContent().catch(() => null);
  console.log('Dashboard heading:', dashboardHeading);

  await browser.close();
  process.exit(0);
})();