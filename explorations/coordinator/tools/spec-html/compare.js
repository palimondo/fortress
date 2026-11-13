// Compare every display of the reader (the SVGs that LaTeX set) with LaTeX's own picture of it.
//
// For each chapter, the folder <work>/disp/<slug>/ holds d.tex, the file that spec2html.py gave
// to latex. This script runs pdflatex on the same file, turns each page into a picture with
// pdftoppm, takes a picture of the same display in the page as Chromium shows it (through
// Playwright, with the fonts of tex-fonts.css), and compares the two: their sizes, and how much of
// the ink of one lies where the other has ink. A display whose fonts fell back to another face,
// that lost a character, or that the browser spaces differently, fails.
//
//   node compare.js <work folder> <address of the pages> [slug ...]
//   node compare.js /tmp/spec-html-work http://localhost:8765/fortress/specification/
//
// It prints one line for each display that differs and a count for each chapter, writes the pair
// of pictures of each failure to <work>/compare/, and exits 1 if any display differs.
// What it does not do: compare with Specification/fortress.pdf. The displays are set from the
// same source by the same macros as the PDF, but the PDF is not read here.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [work, base, ...only] = process.argv.slice(2);
if (!work || !base) { console.error('usage: node compare.js <work folder> <address of the pages> [slug ...]'); process.exit(2); }
const ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const PX_PER_PT = 3.4;                     // 17px for 10pt, at a device scale of 2
const DPI = Math.round(PX_PER_PT * 72.27);
const LIMIT = 0.92;                        // share of the ink that must agree

function latexPages(slug) {
  const dir = path.join(work, 'disp', slug), out = path.join(dir, 'pdf');
  const stamp = path.join(out, 'stamp'), key = String(fs.statSync(path.join(dir, 'd.tex')).mtimeMs);
  if (!(fs.existsSync(stamp) && fs.readFileSync(stamp, 'utf8') === key)) {
    fs.rmSync(out, { recursive: true, force: true });
    fs.mkdirSync(out, { recursive: true });
    fs.copyFileSync(path.join(dir, fs.existsSync(path.join(dir, 'd.aux.in')) ? 'd.aux.in' : 'd.aux'), path.join(out, 'd.aux'));
    try {
      execFileSync('pdflatex', ['-interaction=nonstopmode', '-output-directory', out, 'd.tex'],
        { cwd: dir, stdio: 'ignore', env: Object.assign({}, process.env, { TEXINPUTS: '.:' + path.join(ROOT, 'Fortify') + ':' }) });
    } catch (e) { /* an error that nonstopmode passed: the pages are still there */ }
    execFileSync('pdftoppm', ['-r', String(DPI), '-gray', '-png', 'd.pdf', 'p'], { cwd: out, stdio: 'ignore' });
    fs.writeFileSync(stamp, key);
  }
  const pages = {};
  for (const f of fs.readdirSync(out)) { const m = /^p-0*(\d+)\.png$/.exec(f); if (m) pages[+m[1]] = path.join(out, f); }
  return pages;
}

// runs in the page: ink masks of two pictures, trimmed, compared
async function compareInPage(a, b) {
  async function ink(src) {
    const img = new Image(); img.src = src; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    // the ground is the most common corner value; ink is what differs from it clearly
    const bg = d[0];
    let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1;
    const m = new Uint8Array(c.width * c.height);
    for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
      const v = d[(y * c.width + x) * 4];
      if (Math.abs(v - bg) > 90) { m[y * c.width + x] = 1; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    return { m, w: c.width, x0, y0, x1, y1 };
  }
  const A = await ink(a), B = await ink(b);
  if (A.x1 < 0 || B.x1 < 0) return { empty: true, aw: A.x1 - A.x0 + 1, bw: B.x1 - B.x0 + 1 };
  const aw = A.x1 - A.x0 + 1, ah = A.y1 - A.y0 + 1, bw = B.x1 - B.x0 + 1, bh = B.y1 - B.y0 + 1;
  // ink of one counts as matched if the other has ink within R pixels
  // both on the grid of the first, so that a small difference of scale does not add up across a wide display
  const R = 2, w = aw, h = ah;
  function grid(I, iw, ih) {
    const g = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const sx = Math.min(iw - 1, Math.round(x * (iw - 1) / Math.max(1, w - 1))), sy = Math.min(ih - 1, Math.round(y * (ih - 1) / Math.max(1, h - 1)));
      if (I.m[(sy + I.y0) * I.w + sx + I.x0]) g[y * w + x] = 1;
    }
    return g;
  }
  function near(g) {
    const t = new Uint8Array(w * h), o = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (g[y * w + x]) for (let k = Math.max(0, x - R); k <= Math.min(w - 1, x + R); k++) t[y * w + k] = 1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (t[y * w + x]) for (let k = Math.max(0, y - R); k <= Math.min(h - 1, y + R); k++) o[k * w + x] = 1;
    return o;
  }
  const ga = grid(A, aw, ah), gb = grid(B, bw, bh), na = near(ga), nb = near(gb);
  let ia = 0, ib = 0, ma = 0, mb = 0;
  for (let i = 0; i < w * h; i++) { if (ga[i]) { ia++; if (nb[i]) ma++; } if (gb[i]) { ib++; if (na[i]) mb++; } }
  return { aw, ah, bw, bh, agree: Math.min(ma / ia, mb / ib) };
}

(async () => {
  const slugs = only.length ? only : fs.readdirSync(path.join(work, 'disp')).filter(s => fs.existsSync(path.join(work, 'disp', s, 'd.tex'))).sort();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 2400, height: 1200 }, deviceScaleFactor: 2 });
  const outDir = path.join(work, 'compare');
  fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true });
  let bad = 0, total = 0;
  for (const slug of slugs) {
    const pages = latexPages(slug);
    const page = await ctx.newPage();
    await page.goto(base + slug + '.html', { waitUntil: 'load' });
    await page.addStyleTag({ content: '.fx-r,.dm,.tw,.page,section,div{overflow:visible!important} svg.tx{font-size:17px!important} .fx.both>.fx-r{display:block!important} .addnote,.fx-bar,nav.bar{display:none!important} .mw{overflow:visible!important;max-width:none!important} *{background:#fff!important;color:#000!important}' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => { await Promise.all(Array.from(document.fonts).map(f => f.load().catch(() => 0))); });
    await page.addScriptTag({ content: 'window.__cmp = ' + compareInPage.toString() });
    const ns = await page.$$eval('svg.tx[data-d]', els => els.map(e => +e.getAttribute('data-d')));
    let chapterBad = 0;
    for (const n of ns) {
      total++;
      const el = page.locator('svg.tx[data-d="' + n + '"]').first();
      let shot;
      try { shot = await el.screenshot({ timeout: 20000 }); } catch (e) { console.log(slug + ' display ' + n + ': no picture of it in the browser (' + String(e).split('\n')[0] + ')'); chapterBad++; continue; }
      if (!pages[n]) { console.log(slug + ' display ' + n + ': pdflatex set no page for it'); chapterBad++; continue; }
      const a = 'data:image/png;base64,' + shot.toString('base64');
      const b = 'data:image/png;base64,' + fs.readFileSync(pages[n]).toString('base64');
      const r = await page.evaluate(([x, y]) => window.__cmp(x, y), [a, b]);
      let why = '';
      if (r.empty) { if (r.aw !== r.bw) why = 'one of the two is empty'; }
      else if (Math.abs(r.aw - r.bw) > Math.max(6, 0.02 * r.bw) || Math.abs(r.ah - r.bh) > Math.max(6, 0.02 * r.bh)) why = 'size ' + r.aw + 'x' + r.ah + ' in the browser, ' + r.bw + 'x' + r.bh + ' from pdflatex';
      else if (r.agree < LIMIT) why = 'only ' + Math.round(r.agree * 100) + '% of the ink agrees';
      if (why) {
        chapterBad++;
        console.log(slug + ' display ' + n + ': ' + why);
        fs.writeFileSync(path.join(outDir, slug + '-' + n + '-browser.png'), shot);
        fs.copyFileSync(pages[n], path.join(outDir, slug + '-' + n + '-latex.png'));
      }
    }
    console.log(slug + ': ' + ns.length + ' displays, ' + chapterBad + ' differ');
    bad += chapterBad;
    await page.close();
  }
  await browser.close();
  console.log(total + ' displays compared, ' + bad + ' differ' + (bad ? '; the pairs of pictures are in ' + outDir : ''));
  process.exit(bad ? 1 : 0);
})();
