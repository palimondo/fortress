// Build a standalone reading edition from the reviewed article and literal source panels.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const modules = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const {marked} = await import(modules ? pathToFileURL(path.join(modules, 'marked/lib/marked.esm.js')).href : 'marked');
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const python = {
 scalar: 'def mul(x, y):\n    return Value(x.data * y.data,\n                 children=(x, y),\n                 local_grads=(y.data, x.data))',
 containers: 'vector = [f(i) for i in range(n)]\nmatrix = [[f(i, j) for j in range(n)]\n          for i in range(m)]',
 reduction: 'total = sum(values)\n# Each addition retains derivative edges.\n# Fortress additionally defines the reduction identity\n# and join operation for its graph scalar.',
 algebra: 'def linear(x, W):\n    return [sum(wi * xi for wi, xi in zip(row, x))\n            for row in W]\n\ndef dot(x, y):\n    return sum(xi * yi for xi, yi in zip(x, y))',
 rms: 'ms = sum(xi * xi for xi in x) / len(x)\nscale = (ms + 1e-5) ** -0.5\nx = [xi * scale for xi in x]',
 softmax: 'shift = max(xi.data for xi in x)\ne = [(xi - shift).exp() for xi in x]\ntotal = sum(e)\np = [ei / total for ei in e]',
 attention: 'scores = [sum(q[j] * K[t][j] for j in range(s))\n          / s**0.5 for t in range(T)]\na = softmax(scores)\no = [sum(a[t] * W[t][j] for t in range(T))\n     for j in range(s)]',
 block: 'joined = [value for head in heads for value in head]\ny = [xi + oi for xi, oi in zip(x, linear(joined, Wo))]\nhidden = [v.relu() for v in linear(rmsnorm(y), Win)]\nx = [yi + oi for yi, oi in zip(y, linear(hidden, Wout))]',
 embedding: 'x = [e + p for e, p in zip(E[token], P[t])]\nx = rmsnorm(x)\nx = transformer_block(x, block, cache, t)\nlogits = linear(x, U)',
 loss: 'losses.append(-probs[target_id].log())\nloss = sum(losses) / len(losses)\nloss.backward()',
 adam: 'm[i] = beta1 * m[i] + (1 - beta1) * g\nv[i] = beta2 * v[i] + (1 - beta2) * g**2\nmhat = m[i] / (1 - beta1**step)\nvhat = v[i] / (1 - beta2**step)\np[i] -= lr * mhat / (vhat**0.5 + 1e-8)',
 sampling: 'probs = softmax([v / temperature for v in logits])\ncumulative = 0.0\nchoice = len(probs) - 1\nfor j, p in enumerate(probs):\n    cumulative += p.data\n    if u < cumulative:\n        choice = j\n        break'
};
// Native MathML for the article's inline expressions; the comparison formulas
// themselves are already inside the actual Fortify-generated SVG panels.
const mi=x=>`<mi>${x}</mi>`, mn=x=>`<mn>${x}</mn>`, mo=x=>`<mo>${x}</mo>`;
const row=(...x)=>`<mrow>${x.join('')}</mrow>`;
const sub=(x,y)=>`<msub>${x}${y}</msub>`, sup=(x,y)=>`<msup>${x}${y}</msup>`;
const frac=(x,y)=>`<mfrac>${x}${y}</mfrac>`, bar=x=>`<mover>${mi(x)}<mo>¯</mo></mover>`;
const indexed=(x,y)=>sub(mi(x),mi(y));
const math = {
 'z=xy':row(mi('z'),mo('='),mi('x'),mi('y')),
 '\\bar x\\mathrel{+}=y\\bar z':row(bar('x'),mo('+='),mi('y'),bar('z')),
 '\\bar y\\mathrel{+}=x\\bar z':row(bar('y'),mo('+='),mi('x'),bar('z')),
 '\\bar z=\\partial L/\\partial z':row(bar('z'),mo('='),frac(row(mo('∂'),mi('L')),row(mo('∂'),mi('z')))),
 '2^{30}':sup(mn('2'),mn('30')),
 'x_i':indexed('x','i'),
 'y_i=\\sum_j A_{ij}x_j':row(indexed('y','i'),mo('='),sub(mo('∑'),mi('j')),sub(mi('A'),row(mi('i'),mi('j'))),indexed('x','j')),
 'd_h':indexed('d','h'), 'q':mi('q'),
 'Kq/\\sqrt{d_h}':frac(row(mi('K'),mi('q')),`<msqrt>${indexed('d','h')}</msqrt>`),
 'a_t':indexed('a','t'),
 'o_j=\\sum_t a_t W_{tj}':row(indexed('o','j'),mo('='),sub(mo('∑'),mi('t')),indexed('a','t'),sub(mi('W'),row(mi('t'),mi('j')))),
 'L=-T^{-1}\\sum_t\\log p_t[y_t]':row(mi('L'),mo('='),mo('−'),sup(mi('T'),row(mo('−'),mn('1'))),sub(mo('∑'),mi('t')),mi('log'),indexed('p','t'),mo('['),indexed('y','t'),mo(']')),
 'm':mi('m'), 'v':mi('v'), 's':mi('s'),
 '1-\\beta^s':row(mn('1'),mo('−'),sup(mi('β'),mi('s'))),
 "p'=p-0.01g/(|g|+10^{-8})":row(sup(mi('p'),mo('′')),mo('='),mi('p'),mo('−'),frac(row(mn('0.01'),mi('g')),row(mo('|'),mi('g'),mo('|'),mo('+'),sup(mn('10'),row(mo('−'),mn('8'))))))
};
let article = fs.readFileSync(path.join(root,'ARTICLE.md'),'utf8');
let panels = 0;
const panelNames = [];
const glyphs = new Map();
article = article.replace(/!\[([^\]]*)\]\(figures\/rendered\/([\w-]+)\.png\)/g, (_,caption,name)=>{
 const tic = fs.readFileSync(path.join(root,`figures/${name}.tic`),'utf8');
 const code = tic.split('\n`\n')[1];
 if (!code || !python[name]) throw Error(`Missing panel source: ${name}`);
 let svg = fs.readFileSync(path.join(root,`figures/rendered/${name}.svg`),'utf8');
 svg = svg.slice(svg.indexOf('<svg'));
 // SVG glyph identifiers must be unique when multiple standalone SVGs are embedded.
 const ids = new Map();
 svg = svg.replace(/<path id=['"]([^'"]+)['"] ([^>]+)\/>/g, (_,id,shape)=>{
   if (!glyphs.has(shape)) glyphs.set(shape, `shared-glyph-${glyphs.size}`);
   ids.set(id,glyphs.get(shape)); return '';
 });
 svg = svg.replace(/(href=['"])#([^'"]+)/g, (_,prefix,id)=>`${prefix}#${ids.get(id) || `${name}-${id}`}`);
 svg = svg.replace(/\bid=['"]([^'"]+)['"]/g, (_,id)=>`id="${name}-${id}"`);
 panels++; panelNames.push(name);
 return `<div class="comparison" id="panel-${name}"><figure><figcaption>FORTRESS · FORTIFY 2D</figcaption><div class="render">${svg}</div><p class="caption">${esc(caption)}</p></figure><div class="ascii"><h3>FORTRESS · ASCII SOURCE</h3><pre><code>${esc(code.trimEnd())}</code></pre></div><div class="python"><h3>PYTHON · COMPARISON</h3><pre><code>${esc(python[name])}</code></pre><p class="caption">Equivalent teaching excerpt; names may be shortened. The pinned upstream source remains the numerical reference.</p></div></div>`;
});
article = article.replace(/\$([^$]+)\$/g, (_,tex)=>{
 if (!math[tex]) throw Error(`Unmapped inline math: ${tex}`);
 return `<math xmlns="http://www.w3.org/1998/Math/MathML" aria-label="${esc(tex)}">${math[tex]}</math>`;
});
let body=marked.parse(article);
const toc=[];
body=body.replace(/<h2>(.*?)<\/h2>/g,(_,title)=>{const id=`section-${toc.length+1}`;toc.push(`<a href="#${id}">${title}</a>`);return `<h2 id="${id}">${title}</h2>`;});
const source=fs.readFileSync(path.join(root,'MicroGPT.fss'),'utf8');
const css=`:root{color-scheme:light;--ink:#182b35;--muted:#53646d;--line:#d6e0e3;--accent:#0b675f}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);background:#f7f9f8;font:18px/1.65 Georgia,serif}header{background:#102f3b;color:white;padding:32px max(24px,calc((100vw - 1320px)/2));font:14px/1.6 system-ui}header strong{letter-spacing:.12em}header p{margin:8px 0 0;color:#d1e3e5}main{max-width:1320px;margin:auto;padding:42px 28px 80px}h1{font-size:clamp(34px,5vw,58px);line-height:1.1;max-width:900px;letter-spacing:-.03em;margin:0 0 32px}h2{font:650 30px/1.25 system-ui;margin:64px 0 24px;scroll-margin-top:24px}h3,figcaption{font:650 12px/1.5 system-ui;letter-spacing:.08em;color:var(--accent);margin:0 0 14px}main>p{max-width:880px}a{color:#075e68;text-underline-offset:3px}nav{display:flex;flex-wrap:wrap;gap:7px 20px;margin:28px 0;padding:22px 0;border-block:1px solid var(--line);font:14px/1.5 system-ui}nav a{max-width:320px}.comparison{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);gap:0;margin:32px 0;background:white;border:1px solid var(--line);border-radius:10px;overflow:hidden}.comparison figure{margin:0;padding:24px;min-width:0}.render{overflow-x:auto;padding:10px 0 16px}.render svg{display:block;width:100%;height:auto;min-width:380px;max-height:none}.ascii{padding:24px;background:#f0f5f5;border-left:1px solid var(--line);min-width:0}.python{grid-column:1/-1;padding:22px 24px;border-top:1px solid var(--line);background:#fbfcfc}.caption{font:13px/1.5 system-ui;color:var(--muted);margin:12px 0 0}pre{overflow:auto;margin:0;padding:0;tab-size:2;font:13px/1.65 ui-monospace,SFMono-Regular,Consolas,monospace}code{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:.87em}pre code{font-size:inherit}main>pre{padding:20px;background:#edf3f3;border-radius:6px}table{width:100%;border-collapse:collapse;font:14px/1.5 system-ui;margin:28px 0;display:block;overflow:auto}th{text-align:left;background:#e7efef}th,td{padding:12px 16px;border-bottom:1px solid var(--line)}math{font-size:1.04em}details{padding:22px;background:white;border:1px solid var(--line);border-radius:8px;margin-top:36px}summary{font:600 17px/1.4 system-ui;cursor:pointer}details pre{margin-top:20px}.footer{margin-top:44px;color:var(--muted);font:13px/1.6 system-ui}@media(max-width:850px){main{padding:28px 16px}.comparison{grid-template-columns:1fr}.ascii{border-left:0;border-top:1px solid var(--line)}.comparison figure,.ascii,.python{padding:18px}.render svg{min-width:320px}body{font-size:17px}h2{font-size:26px}}@media print{body{background:white;font-size:11pt}header{background:white;color:black;padding:0}header p{color:#333}nav{display:none}main{padding:0}.comparison{break-inside:avoid}h2{break-after:avoid}a{color:inherit}details{display:none}.render svg{min-width:0}pre{white-space:pre-wrap;font-size:8pt}}`;
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Building the notation while building a tiny GPT — Fortress × Python × Mathematics</title><style>${css}</style></head><body><svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style="position:absolute"><defs>${[...glyphs].map(([shape,id])=>`<path id="${id}" ${shape}/>`).join('')}</defs></svg><header><strong>ASTRA / FORTRESS EXPERIMENT</strong><p>Mathematics, executable notation, and the machinery connecting them · 228-parameter correctness fixture</p></header><main><nav aria-label="Article sections">${toc.join('')}</nav>${body}<details><summary>Complete executable · ASCII Fortress source</summary><pre><code>${esc(source)}</code></pre></details><p class="footer">Standalone reading edition. All ${panels} Fortify SVGs and the full ASCII executable are embedded. Inline mathematics uses native MathML. No external scripts, fonts, or image requests are required. Supporting repository links require access to the accompanying files.</p></main></body></html>`;
if(panels!==12)throw Error(`Expected 12 panels, got ${panels}`);
fs.writeFileSync(path.join(root,'ARTICLE.standalone.html'),html);
let imageIndex=0;
const portable=html.replace(/<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="0"[\s\S]*?<\/svg>/, '')
 .replace(/<div class="render"><svg[\s\S]*?<\/svg><\/div>/g,()=>`<div class="render"><img style="width:100%;height:auto" src="figures/rendered/${panelNames[imageIndex++]}.png" alt="Actual Fortify rendering"></div>`)
 .replace(`All ${panels} Fortify SVGs and the full ASCII executable are embedded.`, 'The full ASCII executable is embedded. The twelve actual Fortify figures are loaded from the accompanying figures/rendered directory.')
 .replace('No external scripts, fonts, or image requests are required.', 'No external scripts or fonts are required. Keep the accompanying figure directory beside this HTML file.');
fs.writeFileSync(path.join(root,'ARTICLE.html'),portable);
console.log(`Wrote ARTICLE.html: ${panels} paired source/render panels, ${Buffer.byteLength(html)} bytes.`);
