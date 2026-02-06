const { JSDOM } = require('jsdom');
const path = require('path');

(async () => {
  const url = 'http://localhost:5173/';
  console.log('Loading', url);

  const dom = await JSDOM.fromURL(url, {
    runScripts: 'dangerously',
    resources: 'usable'
  });

  const win = dom.window;

  win.addEventListener('error', (e) => {
    console.error('Window error:', e.error || e.message);
  });

  win.console.error = (...args) => {
    console.error('Browser console.error:', ...args);
  };

  // Attempt to fetch the main module script and evaluate it in the JSDOM window
  const doc = win.document;
  const scriptEl = doc.querySelector('script[type="module"][src]');
  if (scriptEl) {
    const scriptSrc = scriptEl.getAttribute('src');
    const scriptUrl = new URL(scriptSrc, url).href;
    console.log('Found module script:', scriptUrl);
    const fetchFn = (typeof fetch !== 'undefined') ? fetch : (await import('node-fetch')).default;
    const res = await fetchFn(scriptUrl);
    const js = await res.text();
    try {
      win.eval(js);
      console.log('Module script evaluated in JSDOM');
    } catch (e) {
      console.error('Error evaluating module script:', e && e.stack ? e.stack : e);
    }
  } else {
    console.log('No module script tag with src found; skipping manual eval');
  }

  // wait briefly for app to render
  await new Promise((r) => setTimeout(r, 1000));

  // Try to query the app root
  try {
    const root = win.document.getElementById('root');
    if (!root) console.error('Root not found in DOM');
    else console.log('Root exists, child count:', root.childElementCount);

    const errorPre = win.document.querySelector('pre');
    if (errorPre) {
      console.log('ErrorBoundary stack found:');
      console.log(errorPre.textContent.slice(0, 1000));
    } else {
      console.log('No ErrorBoundary stack found in DOM');
    }
  } catch (err) {
    console.error('DOM inspection error:', err);
  }

  // print any unhandled promise rejections
  win.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason && e.reason.stack ? e.reason.stack : e.reason);
  });

  // Give some time for async things
  await new Promise((r) => setTimeout(r, 2000));

  console.log('Done');
  process.exit(0);
})();