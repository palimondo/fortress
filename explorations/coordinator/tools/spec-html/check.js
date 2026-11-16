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
let PUBLIC = 'https://palimondo.github.io/fortress/specification/';
const ROOT_U = U.replace(/revival\/$/, '');     // the revised edition reads revised-only.js from the folder above it
const EXPORT = path.join(__dirname, 'notes-export-2026-11-15.txt');   // the curator's 15 notes, written before the editions were parted
let failed = 0;
const ok = (c, m) => { if (!c) failed++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, colorScheme: 'light', acceptDownloads: true, permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await c.newPage();
  const ext = [];
  p.on('request', r => { if (!r.url().startsWith(ROOT_U) && !r.url().startsWith('data:')) ext.push(r.url()); });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  // every page that the contents lists: no sideways scroll, light and dark; nothing left unconverted;
  // every character of every display has its font; the displays take the colour of the text
  await p.goto(U + 'index.html');
  const chapters = await p.$$eval('ul.chapters li.done', els => els.map(e => e.getAttribute('data-slug')));
  ok(chapters.length === 54 && await p.locator('ul.chapters li.todo').count() === 0, 'the contents lists 54 converted pages and none unconverted: ' + chapters.length);
  // which edition this is: the team's Working Draft, or the revival's revised edition under revival/
  const ED = await p.evaluate(() => document.body.getAttribute('data-edition'));
  const REVISED = ED === 'revised', STORE = REVISED ? 'fortress-spec-revival' : 'fortress-spec';
  if (REVISED) PUBLIC += 'revival/';
  ok((ED === 'revised') === /revival\/$/.test(U) && await p.evaluate(() => document.body.getAttribute('data-store')) === STORE, 'the edition is ' + ED + ', its storage ' + STORE);
  ok(await p.locator('a[href="' + (REVISED ? '../' : '') + 'editions.html"]').count() >= 1, 'the contents page links to the page of the editions');
  const marks = [];
  const inks = {};
  let displays = 0;
  const widthless = [];
  let drawn = 0;
  for (const scheme of ['light', 'dark']) {
    await p.emulateMedia({ colorScheme: scheme });
    const bad = [];
    for (const f of ['index', 'notes', 'references'].concat(chapters)) {
      await p.goto(U + f + '.html');
      const w = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (w !== 0) bad.push(f + ' scrolls sideways by ' + w);
      const r = await p.evaluate(async () => {
        await document.fonts.ready;
        const out = { unk: document.querySelectorAll('.unk, .gap').length, n: document.querySelectorAll('svg.tx').length, drawn: document.querySelectorAll('svg.tx path.nw').length, nofont: [], nowidth: [], ink: '', body: getComputedStyle(document.body).color };
        const seen = new Set();
        for (const t of document.querySelectorAll('svg.tx text')) {
          const cs = getComputedStyle(t), fam = cs.fontFamily;
          if (!out.ink) out.ink = cs.fill;
          const key = fam + '|' + t.textContent;
          if (seen.has(key)) continue;
          seen.add(key);
          let known = false;
          for (const face of document.fonts) if (face.family.replace(/"/g, '') === fam.replace(/"/g, '')) known = true;
          if (!known) out.nofont.push(fam + ' is not a font of tex-fonts.css');
          else {
            try { await document.fonts.load('10px ' + fam, t.textContent); } catch (e) { out.nofont.push(fam + ' did not load'); }
            if (!document.fonts.check('10px ' + fam, t.textContent)) out.nofont.push(fam + ' lacks a character of ' + JSON.stringify(t.textContent.slice(0, 20)));
            // a glyph of no width (the slash of \not, the bar of \mapsto) must not be left to the browser's text:
            // alone in its <text> it is a piece of text of no width, which a browser may leave unpainted
            const s = t.textContent;
            for (let i = 0; i < t.getNumberOfChars(); i++) if (/\S/.test(s[i]) && t.getExtentOfChar(i).width === 0) out.nowidth.push('U+' + s.charCodeAt(i).toString(16).toUpperCase() + ' of ' + fam + ' in display ' + t.closest('svg').getAttribute('data-d'));
          }
        }
        return out;
      });
      if (scheme === 'light') {
        // the revised edition asks not to be indexed and says at its top what it is; the Working Draft carries
        // nothing of the revival's but one line at its foot
        const m = await p.evaluate(() => ({ robots: (document.querySelector('meta[name="robots"]') || { content: '' }).content,
          rev: document.querySelectorAll('.rv, a.ed, .legend, aside.revision').length,
          top: (document.querySelector('.page > p.edline.top a') || { getAttribute() { return ''; } }).getAttribute('href'),
          foot: Array.from(document.querySelectorAll('footer.colophon a')).map(a => a.getAttribute('href')).join(' '),
          outside: Array.from(document.querySelectorAll('.page a[href*="revival"]')).filter(a => !a.closest('footer.colophon, .edline, .apart, .note-card, #chapter-notes')).length }));
        const chap = chapters.includes(f);
        if (REVISED) {
          if (m.robots !== 'noindex') marks.push(f + ' lacks noindex');
          if (m.top !== '../' + f + '.html' && !(f === 'index' && m.top === '../index.html')) marks.push(f + ': the line at the top links to ' + m.top);
        } else {
          if (m.robots) marks.push(f + ' has a robots tag');
          if (m.rev) marks.push(f + ' holds ' + m.rev + ' elements of the revival\'s layer');
          if (chap && !m.foot.includes('revival/' + f + '.html')) marks.push(f + ': no link to the revised chapter at the foot');
          if (m.outside) marks.push(f + ': ' + m.outside + ' links to the revised edition outside the foot');
        }
      }
      if (r.unk) bad.push(f + ' holds ' + r.unk + ' unconverted constructs');
      if (r.nofont.length) bad.push(f + ': ' + r.nofont.slice(0, 3).join('; '));
      if (scheme === 'light') { widthless.push(...r.nowidth.map(x => f + ': ' + x)); drawn += r.drawn; }
      if (r.n && r.ink !== r.body) bad.push(f + ': the displays are ' + r.ink + ', the text is ' + r.body);
      if (r.n) inks[scheme] = r.ink;
      if (scheme === 'light') displays += r.n;
    }
    ok(bad.length === 0, scheme + ': ' + (chapters.length + 3) + ' pages without sideways scroll, unconverted constructs or a display without its font' + (bad.length ? ': ' + bad.join(' | ') : ''));
  }
  ok(displays > 1000 && inks.light !== inks.dark, displays + ' displays set by LaTeX; their ink is ' + inks.light + ' in light and ' + inks.dark + ' in dark, from one source');
  ok(widthless.length === 0 && drawn > 100, 'no display leaves a glyph of no width to the browser\'s text; ' + drawn + ' such glyphs are drawn as paths' + (widthless.length ? ': ' + widthless.length + ' left, ' + widthless.slice(0, 6).join(' | ') : ''));
  ok(marks.length === 0, REVISED ? 'every page of the revised edition has noindex and, at its top, the link to the same page of the Working Draft' + (marks.length ? ': ' + marks.join(' | ') : '')
    : 'no page of the Working Draft has a robots tag, a callout, a tint, a legend or an archive link; each chapter links to its revised chapter at its foot only' + (marks.length ? ': ' + marks.join(' | ') : ''));
  await p.emulateMedia({ colorScheme: 'light' });
  // the text of a display can be selected
  await p.goto(U + 'overview.html');
  const picked = await p.evaluate(() => { const t = document.querySelector('.fx[data-example="Executable"] svg.tx'); const r = document.createRange(); r.selectNodeContents(t); const s = getSelection(); s.removeAllRanges(); s.addRange(r); const x = s.toString(); s.removeAllRanges(); return x; });
  ok(/api/.test(picked) && /Executable/.test(picked), 'the text of a display can be selected: ' + JSON.stringify(picked.slice(0, 40)));
  // the curator's decisions on the text inside a sentence, and the edition's layer
  await p.goto(U + 'lexical-structure.html');
  const lig = await p.evaluate(() => { const c = document.querySelector('p code'); const cs = getComputedStyle(c); return cs.fontVariantLigatures + ' / ' + cs.paddingLeft + ' / ' + cs.backgroundColor; });
  ok(lig.startsWith('none'), 'code inside a sentence: no ligatures, its highlight and narrow padding: ' + lig);
  ok(await p.evaluate(() => document.body.innerHTML.includes('‘<span class="tt">FBAB</span>’')), 'a quote pair around a whole typewriter span is curly; the code inside is as typed');
  await p.goto(U + 'preface.html');
  if (REVISED) {
  ok(await p.locator('#p-0ea553b6').count() === 1 && await p.locator('#p-033235cb').count() === 1, 'the two paragraphs of the preface that carry notes keep their ids');
  const arch = await p.locator('#p-0ea553b6 a.ed.arch').getAttribute('href');
  ok(arch === 'https://web.archive.org/web/2008/http://projectfortress.sun.com', 'the dead address has the edition\'s link to the Internet Archive: ' + arch);
  const tint = await p.evaluate(() => [getComputedStyle(document.querySelector('#p-033235cb')).backgroundColor, getComputedStyle(document.querySelector('.legend .rv')).backgroundColor, getComputedStyle(document.body).backgroundColor]);
  ok(tint[0] === tint[1] && tint[0] !== tint[2] && await p.locator('#p-033235cb.rv').count() === 1, 'the revival\'s paragraph has the tint that the opening introduces: ' + tint.join(' '));
  } else {
  ok(await p.locator('#p-0ea553b6').count() === 1 && await p.locator('#p-033235cb').count() === 0, 'the team\'s paragraph of the preface keeps its id; the revival\'s paragraph is not here');
  }
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
  const place = await p.evaluate(() => JSON.parse(localStorage.getItem(document.body.getAttribute('data-store') + '.place.v1')));
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
  // the notes that the curator wrote before the editions were parted, at the addresses that now show the Working Draft
  if (!REVISED && fs.existsSync(EXPORT)) {
    const c3 = await b.newContext({ viewport: { width: 390, height: 844 } });
    const r = await c3.newPage();
    r.on('pageerror', e => { failed++; console.log('PAGEERROR(notes of 2026-11-15)', e.message); });
    await r.goto(U + 'notes.html');
    await r.locator('#import-file').setInputFiles(EXPORT);
    await r.waitForTimeout(300);
    const cards = await r.locator('.note-card').count();
    const there = await r.locator('.note-card', { hasText: 'The passage of this note is in the revised edition.' }).count();
    const exp = await r.locator('#export-text').inputValue();
    ok(cards === 15 && there === 1 && /Notes: 15/.test(exp) && exp.includes(PUBLIC + 'revival/preface.html#p-033235cb\nEdition: the passage of this note is in the revised edition'),
       'the 15 notes of 2026-11-15 are listed and exported; ' + there + ' has its passage in the revised edition, and its link leads there');
    let placed = 0;
    for (const f of ['preface', 'intro', 'overview']) { await r.goto(U + f + '.html'); placed += await r.locator('.has-note').count(); }
    ok(placed === 14, placed + ' of them sit on their paragraphs of the Working Draft');
    await r.goto(U + 'preface.html');
    ok(await r.locator('#chapter-notes a[href="revival/preface.html#p-033235cb"]').count() === 1, 'the preface lists the other one, with a link to its passage in the revised edition');
    await r.goto(U + 'revival/preface.html');
    ok(await r.locator('#p-033235cb.has-note').count() === 1 && await r.locator('.note-card').count() === 1, 'the revised edition took a copy of that note, and of no other');
    await r.goto(U + 'revival/notes.html');
    await r.goto(U + 'revival/preface.html');
    ok(await r.locator('.note-card').count() === 1 && JSON.parse(await r.evaluate(() => localStorage.getItem('fortress-spec.notes.v1'))).length === 15, 'the copy is taken once; the 15 stay with the Working Draft');
  }
  await b.close();
  console.log(failed ? failed + ' FAILED' : 'ALL PASS');
  process.exit(failed ? 1 : 0);
})().catch(e => { console.log('ERROR', e); process.exit(1); });
