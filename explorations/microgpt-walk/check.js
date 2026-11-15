// Checks the built walk-through in Chromium at a phone's width, light and dark:
//   mkdir -p /tmp/walk-srv && ln -sfn "$PWD/docs" /tmp/walk-srv/fortress
//   python3 -m http.server 8766 --directory /tmp/walk-srv &
//   node explorations/microgpt-walk/check.js [URL of the walk-through] [folder for the screenshots]
// Every page is opened light and dark, and in each of the three notations of the code (Typeset, Unicode,
// ASCII). It fails on a page that scrolls sideways, on a source line that gives more than one typeset line,
// on a listing whose line numbers or links differ between the notations, on a script error, and on a request
// that leaves the site. It checks that the choice of notation holds from part to part and over a reload.
// It then writes a note, reloads, and checks the note, the place, the export's address and that the notes are
// kept apart from the specification reader's. It saves one screenshot of each page, light and dark, typeset.
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
const FORMS = ['typeset', 'unicode', 'source'];
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
      const control = await p.locator('.notation button').count();
      for (const form of control ? FORMS : ['source']) {
        if (control) await p.click(`.notation button[data-n="${form}"]`);
        await p.evaluate(() => document.fonts.ready);
        const shown = await p.evaluate(() => document.documentElement.getAttribute('data-notation') || 'source');
        const w = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        const wide = await p.evaluate(() => Array.from(document.querySelectorAll('.dm svg, figure.fig svg')).filter(s => s.getBoundingClientRect().right > window.innerWidth).length);
        // one source line is one typeset line: a long one scrolls sideways inside its box, the page does not.
        // A line holds one SVG, and a block has as many typeset lines as source lines.
        const split = await p.evaluate(() => Array.from(document.querySelectorAll('.fx.n3')).filter(fx => {
          const rows = Array.from(fx.querySelectorAll(':scope > .fx-r .l'));
          const src = fx.querySelector(':scope > .fx-s:not(.fx-u)');
          const lines = src.querySelectorAll('.l').length || src.textContent.replace(/\n$/, '').split('\n').length;
          return rows.length !== lines || rows.some(l => l.querySelectorAll('svg').length > 1);
        }).length);
        ok((shown === form || !control) && w === 0 && wide === 0 && split === 0,
           `${scheme} ${f} ${form}: no sideways scroll (${w}); formulas or drawings wider than the screen: ${wide}; blocks whose typeset lines are not one for each source line: ${split}`);
        if (form === FORMS[0] || !control) await p.screenshot({ path: path.join(SHOTS, `walk-${f}-${scheme}.png`), fullPage: true });
      }
      if (scheme === 'light' && control) {
        // the three notations of a block hold the same line numbers with the same links
        const differ = await p.evaluate(() => Array.from(document.querySelectorAll('.fx.n3')).filter(fx => {
          const nums = e => Array.from(e.querySelectorAll('.ln a, a.lnk')).map(a => a.textContent + ' ' + (a.getAttribute('href') || '')).join('|');
          const three = [fx.querySelector(':scope > .fx-r'), fx.querySelector(':scope > .fx-s:not(.fx-u)'), fx.querySelector(':scope > .fx-u')].map(nums);
          return three[0] !== three[1] || three[1] !== three[2];
        }).length);
        const blocks = await p.locator('.fx.n3').count();
        const held = await p.evaluate(() => /@font-face|<style/.test(Array.from(document.querySelectorAll('.page svg')).map(s => s.innerHTML).join('')));
        ok(differ === 0 && !held, `${f}: ${blocks} blocks, each with the same line numbers and links in the three notations; no SVG holds a font or a style`);
        await p.click('.notation button[data-n="typeset"]');
      }
    }
  }
  await p.emulateMedia({ colorScheme: 'light' });
  // the choice of notation: Typeset on a first visit, then kept from part to part and over a reload
  const parts = pages.filter(f => !['index', 'notes', 'listing'].includes(f));
  const fresh = await b.newContext({ viewport: { width: 390, height: 844 } });
  const q = await fresh.newPage();
  await q.goto(U + parts[0] + '.html');
  ok(await q.evaluate(() => document.documentElement.getAttribute('data-notation')) === 'typeset', 'a first visit shows the typeset form');
  const fontsUsed = await q.evaluate(async () => { await document.fonts.ready; return Array.from(document.fonts).filter(x => x.status === 'loaded').length; });
  ok(fontsUsed > 0, 'the typeset code draws with the shared fonts: ' + fontsUsed + ' pieces loaded');
  await q.click('.notation button[data-n="unicode"]');
  await q.goto(U + parts[1] + '.html');
  const there = await q.evaluate(() => document.documentElement.getAttribute('data-notation'));
  await q.reload();
  const again = await q.evaluate(() => [document.documentElement.getAttribute('data-notation'), document.querySelector('.notation button[aria-pressed="true"]').getAttribute('data-n')].join(' '));
  await q.goto(U + 'listing.html');
  const listing = await q.evaluate(() => document.documentElement.getAttribute('data-notation'));
  ok(there === 'unicode' && again === 'unicode unicode' && listing === 'unicode', `the choice holds from part to part, over a reload and on the listing: ${there}, ${again}, ${listing}`);
  // a note's first words come from the paragraph's text with each code word once
  await q.goto(U + parts[0] + '.html');
  const once = await q.evaluate(() => { const b = document.querySelector('p.nb .fc.u, p.nb .fc').closest('.nb'); const c = b.cloneNode(true); c.querySelectorAll('.fr, .fu').forEach(e => e.remove()); return b.textContent === Object.getOwnPropertyDescriptor(Node.prototype, 'textContent').get.call(c); });
  ok(once, 'the text of a paragraph that a note quotes holds each code word once');
  await fresh.close();
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
  const dead = await p.evaluate(() => Array.from(document.querySelectorAll('pre.listing:not(.fx-u) a.lnk')).filter(a => !a.getAttribute('href') && a.parentNode).length);
  console.log('listing: line numbers without a place: ' + dead);
  ok(ext.length === 0, 'no request leaves the site: ' + ext.slice(0, 3).join(' '));
  ok(errs.length === 0, 'no script error: ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log(failed ? `FAILED: ${failed}` : 'ALL PASS');
  process.exit(failed ? 1 : 0);
})();
