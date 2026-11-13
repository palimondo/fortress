// Checks the built walk-through in Chromium at a phone's width, light and dark:
//   mkdir -p /tmp/walk-srv && ln -sfn "$PWD/docs" /tmp/walk-srv/fortress
//   python3 -m http.server 8766 --directory /tmp/walk-srv &
//   node explorations/microgpt-walk/check.js [URL of the walk-through] [folder for the screenshots]
// It fails on a page that scrolls sideways, on a script error, and on a request that leaves the site. It then
// writes a note, reloads, and checks the note, the place, the export's address and that the notes are kept
// apart from the specification reader's. It saves one screenshot of each page, light and dark.
// It needs Playwright (NODE_PATH, or /opt/node-tools/node_modules, or the global node_modules).
let pw;
for (const m of ['playwright', '/opt/node-tools/node_modules/playwright', '/opt/node22/lib/node_modules/playwright']) {
  try { pw = require(m); break; } catch (e) { /* next */ }
}
const { chromium } = pw;
const fs = require('fs');
const path = require('path');
const U = process.argv[2] || 'http://localhost:8766/fortress/microgpt/';
const SHOTS = process.argv[3] || '/tmp';
const OUT = path.join(__dirname, '..', '..', 'docs', 'microgpt');
const pages = fs.readdirSync(OUT).filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, '')).sort();
let failed = 0;
const ok = (c, m) => { if (!c) failed++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, colorScheme: 'light' });
  const p = await c.newPage();
  const ext = [], errs = [];
  p.on('request', r => { if (!r.url().startsWith(U) && !r.url().startsWith('data:')) ext.push(r.url()); });
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  for (const scheme of ['light', 'dark']) {
    await p.emulateMedia({ colorScheme: scheme });
    for (const f of pages) {
      await p.goto(U + f + '.html');
      const w = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const wide = await p.evaluate(() => Array.from(document.querySelectorAll('.dm svg, figure.fig svg')).filter(s => s.getBoundingClientRect().right > window.innerWidth).length);
      ok(w === 0 && wide === 0, `${scheme} ${f}: no sideways scroll (${w}); formulas or drawings wider than the screen: ${wide}`);
      await p.screenshot({ path: path.join(SHOTS, `walk-${f}-${scheme}.png`), fullPage: true });
    }
  }
  await p.emulateMedia({ colorScheme: 'light' });
  const first = pages.find(f => !['index', 'notes', 'listing'].includes(f) && fs.readFileSync(path.join(OUT, f + '.html'), 'utf8').includes('class="dm'));
  await p.goto(U + first + '.html');
  const gutter = await p.evaluate(() => document.querySelector('.page').getBoundingClientRect().left);
  ok(gutter === 16, 'gutter 16px: ' + gutter);
  // Select
  await p.locator('section.sec[data-num] > h2 button.sel').first().click();
  const sel = await p.evaluate(() => window.getSelection().toString());
  ok(sel.length > 200 && !/^\s*\d+\s*$/m.test(sel.split('\n')[0]), 'Select selects a section: ' + sel.length + ' characters');
  ok(!/Select|✎/.test(sel), 'the selection holds no button text');
  // for Speak, the Select button leaves out the formulas and the long boxes of numbers
  const withMath = await p.evaluate(() => { const d = document.querySelector('.dm'); return d ? d.closest('section.sec[data-num*="."]').getAttribute('data-num') : ''; });
  if (withMath) {
    await p.locator(`section.sec[data-num="${withMath}"] > h2 button.sel, section.sec[data-num="${withMath}"] > h3 button.sel`).first().click();
    const s2 = await p.evaluate(() => window.getSelection().toString());
    const svgText = await p.evaluate(() => document.querySelector('.dm svg').textContent.replace(/\s+/g, '').slice(0, 12));
    ok(s2.length > 100 && !s2.replace(/\s+/g, '').includes(svgText), 'the Select button leaves a formula out of its selection (' + withMath + ')');
    await p.evaluate(() => window.getSelection().removeAllRanges());
    await p.waitForTimeout(100);
    ok(await p.evaluate(() => !document.documentElement.classList.contains('speak')), 'a selection by hand can take the formula again');
  }
  // a note on a paragraph, kept across a reload, under the walk-through's own key
  await p.locator('p.nb .addnote').first().click();
  await p.locator('.note-edit textarea').fill('a note of the check');
  await p.locator('.note-edit button.primary').click();
  await p.evaluate(() => window.scrollTo(0, 2400));
  await p.waitForTimeout(700);
  await p.reload();
  ok(await p.locator('.note-card').count() === 1, 'the note is there after a reload');
  const keys = await p.evaluate(() => Object.keys(Object.assign({}, window.localStorage)).sort().join(' '));
  ok(/fortress-microgpt\.notes\.v1/.test(keys) && !/fortress-spec\./.test(keys), 'kept apart from the specification reader: ' + keys);
  ok(await p.locator('#resume .resume').count() === 1, 'the part offers the place where it was left');
  await p.goto(U + 'index.html');
  ok(await p.locator('#continue .resume').count() === 1, 'the start page offers to continue');
  await p.goto(U + 'notes.html');
  const text = await p.locator('#export-text').inputValue();
  ok(text.includes('Notes on the microGPT walk-through') && text.includes(U.replace(/^http:\/\/[^/]+/, 'https://palimondo.github.io') + first + '.html#') && !text.includes('/specification/'),
     'the export names the walk-through and links to its pages');
  const link = /Link: (\S+)/.exec(text)[1].replace('https://palimondo.github.io', new URL(U).origin);
  await p.goto(link);
  ok(await p.evaluate(() => !!document.getElementById(decodeURIComponent(location.hash.slice(1)))), 'a link of the export leads to its passage');
  await p.goto(U + 'listing.html');
  const dead = await p.evaluate(() => Array.from(document.querySelectorAll('pre.listing a.lnk')).filter(a => !a.getAttribute('href') && a.parentNode).length);
  console.log('listing: line numbers without a place: ' + dead);
  ok(ext.length === 0, 'no request leaves the site: ' + ext.slice(0, 3).join(' '));
  ok(errs.length === 0, 'no script error: ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log(failed ? `FAILED: ${failed}` : 'ALL PASS');
  process.exit(failed ? 1 : 0);
})();
