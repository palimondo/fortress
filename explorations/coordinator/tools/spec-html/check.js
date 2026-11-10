// Checks the built reader in Chromium at a phone's width, light and dark:
//   python3 -m http.server 8765 --directory <a folder that holds fortress/ -> docs/> &
//   node explorations/coordinator/tools/spec-html/check.js [URL of the reader] [folder for the two screenshots]
// It needs Playwright (NODE_PATH, or /opt/node-tools/node_modules). README.md says what it covers.
let pw;
try { pw = require('playwright'); } catch (e) { pw = require('/opt/node-tools/node_modules/playwright'); }
const { chromium } = pw;
const fs = require('fs');
const os = require('os');
const path = require('path');
const U = process.argv[2] || 'http://localhost:8765/fortress/specification/';
const SHOTS = process.argv[3] || '/tmp';
const PUBLIC = 'https://palimondo.github.io/fortress/specification/';
let failed = 0;
const ok = (c, m) => { if (!c) failed++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, colorScheme: 'light', acceptDownloads: true, permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await c.newPage();
  const ext = [];
  p.on('request', r => { if (!r.url().startsWith(U)) ext.push(r.url()); });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  // overflow in every page, light and dark
  for (const scheme of ['light', 'dark']) {
    await p.emulateMedia({ colorScheme: scheme });
    for (const f of ['index', 'preface', 'intro', 'overview', 'programs', 'lexical-structure', 'evaluation', 'types', 'notes', 'references']) {
      await p.goto(U + f + '.html');
      const w = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
      ok(w === 0, `${scheme} ${f}: no sideways scroll (${w}) bg ${bg}`);
    }
  }
  await p.emulateMedia({ colorScheme: 'light' });
  await p.goto(U + 'overview.html');
  const gutter = await p.evaluate(() => document.querySelector('.page').getBoundingClientRect().left);
  ok(gutter === 16, 'gutter 16px: ' + gutter);
  // Select
  await p.locator('#sec-programming-env button.sel').click();
  const sel = await p.evaluate(() => window.getSelection().toString());
  ok(sel.startsWith('2.1 The Fortress Programming Environment') && !sel.includes('Exports and Imports') && sel.includes('must contain exactly one component'), 'Select takes section 2.1 only: ' + sel.length + ' chars; starts ' + JSON.stringify(sel.slice(0, 60)));
  ok(!sel.includes('✎') && !sel.includes('Select'), 'selection has no button text');
  // notes: paragraph, code, heading
  const para = p.locator('#sec-overview-apis ~ p.nb').first();
  await para.locator('.addnote').click();
  await p.locator('.note-edit textarea').fill('Why are APIs program constructs?\nSecond line.');
  await p.locator('.note-edit button.primary').click();
  const code = p.locator('.fx[data-example="Executable"]');
  await code.locator('.addnote').click();
  await p.locator('.note-edit textarea').fill('varargs parameter: check the revival.');
  await p.locator('.note-edit button.primary').click();
  await p.locator('#sec-overview-aggregate .addnote').first().click();
  await p.locator('.note-edit textarea').fill('Heading note.');
  await p.locator('.note-edit button.primary').click();
  ok(await p.locator('.note-card').count() === 3, 'three note cards');
  ok(await p.locator('.has-note').count() === 3, 'three places marked');
  ok((await p.locator('nav.bar .count').textContent()) === '3', 'count in the bar');
  // place
  await p.evaluate(() => document.querySelector('#sec-overview-function-overloading').scrollIntoView({ behavior: 'instant' }));
  await p.mouse.wheel(0, 300);
  await p.waitForTimeout(900);
  const place = await p.evaluate(() => JSON.parse(localStorage.getItem('fortress-spec.place.v1')));
  console.log('place', JSON.stringify(place.pages.overview));
  await p.screenshot({ path: path.join(SHOTS, 'spec-reader-light.png') });
  await p.goto(U + 'overview.html');
  await p.waitForTimeout(300);
  ok(await p.locator('.note-card').count() === 3, 'after reload: three note cards');
  ok(await p.locator('.resume').count() === 1, 'after reload: resume banner: ' + (await p.locator('.resume').innerText()).replace(/\n/g, ' | '));
  ok(await p.locator('details.chapter-notes summary').innerText() === 'Your notes in this chapter: 3', 'chapter list of notes');
  await p.locator('.resume a.act').click();
  await p.waitForTimeout(900);
  const y = await p.evaluate(a => document.getElementById(a).getBoundingClientRect().top, place.pages.overview.anchor);
  ok(y > 0 && y < 200, 'continue scrolls to the place (top ' + Math.round(y) + ')');
  // start page
  await p.goto(U + 'index.html');
  const cont = p.locator('#continue .resume');
  ok(await cont.count() === 1, 'start page offers: ' + (await cont.innerText()).replace(/\n/g, ' | '));
  const href = await cont.locator('a').getAttribute('href');
  ok(href === 'overview.html#' + place.pages.overview.anchor, 'continue link ' + href);
  ok(await p.locator('ul.chapters li.todo').count() > 40, 'unconverted chapters listed: ' + await p.locator('ul.chapters li.todo').count() + ', converted ' + await p.locator('ul.chapters li.done').count());
  // export
  await p.goto(U + 'notes.html');
  const text = await p.locator('#export-text').inputValue();
  console.log('----- export\n' + text + '-----');
  await p.locator('#copy-notes').click();
  await p.waitForTimeout(200);
  const clip = await p.evaluate(() => navigator.clipboard.readText());
  ok(clip === text, 'clipboard holds the export; status: ' + await p.locator('#export-status').innerText());
  const [dl] = await Promise.all([p.waitForEvent('download'), p.locator('#save-notes').click()]);
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'spec-notes-')), dl.suggestedFilename());
  await dl.saveAs(file);
  ok(fs.readFileSync(file, 'utf8') === text, 'saved file ' + dl.suggestedFilename());
  // link of a note leads to the place
  const link = /Link: (\S+)/.exec(text)[1];
  await p.goto(link.replace(PUBLIC, U));
  await p.waitForTimeout(500);
  const top = await p.evaluate(() => document.getElementById(decodeURIComponent(location.hash.slice(1))).getBoundingClientRect().top);
  ok(top > 40 && top < 120, 'exported link opens at the passage, below the bar (top ' + Math.round(top) + ')');
  // edit and delete
  await p.goto(U + 'notes.html');
  await p.locator('.note-card .meta button', { hasText: 'Edit' }).first().click();
  await p.locator('.note-edit textarea').fill('Edited note.');
  await p.locator('.note-edit button.primary').click();
  ok((await p.locator('.note-card .text').first().innerText()) === 'Edited note.', 'edit on the notes page');
  p.once('dialog', d => d.accept());
  await p.locator('.note-card .meta button.danger').first().click();
  ok(await p.locator('.note-card').count() === 2, 'delete leaves two');
  // cleared browser, then import
  await p.evaluate(() => localStorage.clear());
  await p.reload();
  ok(await p.locator('.note-card').count() === 0, 'cleared: no notes');
  await p.locator('#import-file').setInputFiles(file);
  await p.waitForTimeout(300);
  ok(await p.locator('.note-card').count() === 3, 'import brings three back: ' + await p.locator('#import-status').innerText());
  await p.locator('#import-file').setInputFiles(file);
  await p.waitForTimeout(300);
  ok(await p.locator('.note-card').count() === 3, 'second import adds nothing: ' + await p.locator('#import-status').innerText());
  await p.goto(U + 'overview.html');
  ok(await p.locator('.note-card').count() === 3 && await p.locator('.has-note').count() === 3, 'imported notes sit at their places');
  ok((await p.locator('.fx[data-example="Executable"] + .note-card .text').innerText()).startsWith('varargs'), 'code note under its example');
  // code switch
  const fx = p.locator('.fx.both').first();
  await fx.locator('button.s').click();
  ok(await fx.locator('.fx-s').isVisible() && !(await fx.locator('.fx-r').isVisible()), 'Source shows the source: ' + JSON.stringify(await fx.locator('.fx-s').innerText()));
  await p.reload();
  ok(await p.locator('.fx.both .fx-s').first().isVisible(), 'the choice of Source is remembered');
  await p.locator('.fx.both button.r').first().click();
  // dark shot
  await p.emulateMedia({ colorScheme: 'dark' });
  await p.evaluate(() => document.querySelector('.fx[data-example="Executable"]').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(SHOTS, 'spec-reader-dark.png') });
  ok(ext.length === 0, 'no request outside the site: ' + ext.join(' '));
  // storage refused
  const c2 = await b.newContext({ viewport: { width: 390, height: 844 } });
  await c2.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('denied'); } }); });
  const q = await c2.newPage();
  let errs = 0;
  q.on('pageerror', e => { errs++; console.log('PAGEERROR(no storage)', e.message); });
  await q.goto(U + 'overview.html');
  await q.locator('p.nb .addnote').first().click();
  await q.locator('.note-edit textarea').fill('In memory only.');
  await q.locator('.note-edit button.primary').click();
  ok(errs === 0 && await q.locator('.note-card').count() === 1 && await q.locator('.warn').count() === 1, 'without storage: page works, note in memory, warning shown');
  await q.goto(U + 'index.html');
  await q.goto(U + 'notes.html');
  ok(errs === 0, 'without storage: index and notes pages load');
  // the chapter's Select leaves out the list of sections
  await p.emulateMedia({ colorScheme: 'light' });
  await p.goto(U + 'overview.html');
  await p.locator('h1 button.sel').click();
  const lead = await p.evaluate(() => window.getSelection().toString());
  ok(lead.includes('high-level overview') && !lead.includes('2.16 Features') && !lead.includes('Programming Environment'), "the chapter's Select takes its opening only: " + lead.length + ' chars');
  await b.close();
  console.log(failed ? failed + ' FAILED' : 'ALL PASS');
  process.exit(failed ? 1 : 0);
})().catch(e => { console.log('ERROR', e); process.exit(1); });
