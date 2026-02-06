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

  // 3.1) Visit dashboard alias (/dashboard) to ensure direct navigation works
  url = 'http://localhost:5173/dashboard';
  console.log('Navigating to', url);
  resp = await page.goto(url, { waitUntil: 'networkidle' });
  console.log('Dashboard (alias) status:', resp && resp.status());

  await page.waitForTimeout(1000);

  const dashboardAliasHeading = await page.locator('h1').filter({ hasText: 'Dashboard' }).first().textContent().catch(() => null);
  console.log('Dashboard (alias) heading:', dashboardAliasHeading);

  // 4) Visit LCNC pages
  const lcncPages = [
    { path: '/lcnc/forms', label: 'Forms' },
    { path: '/lcnc/rules', label: 'Rules' },
    { path: '/lcnc/reports', label: 'Reports' },
    { path: '/lcnc/workflows', label: 'Workflows' }
  ];

  for (const p of lcncPages) {
    const lp = `http://localhost:5173${p.path}`;
    console.log('Navigating to', lp);
    const r = await page.goto(lp, { waitUntil: 'networkidle' });
    console.log(`${p.label} status:`, r && r.status());
    await page.waitForTimeout(500);

    const heading = await page.locator('h1, h2, h3, h4').filter({ hasText: p.label }).first().textContent().catch(() => null);
    console.log(`${p.label} heading:`, heading ? heading : '(not found)');
  }

  await browser.close();
  process.exit(0);
})();