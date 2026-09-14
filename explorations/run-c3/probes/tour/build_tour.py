# -*- coding: utf-8 -*-
import json, os, re, html

D = '/home/user/fortress/explorations/run-c3/probes/tour'
OUT = '/home/user/fortress/explorations/run-c3/tour.html'
d = json.load(open(os.path.join(D, 'tour.json')))

def inline_svg(name, prefix):
    s = open(os.path.join(D, name), encoding='utf-8').read()
    s = s[s.index('<svg'):].strip()
    ids = set(re.findall(r"id='([^']+)'", s))
    for i in sorted(ids, key=len, reverse=True):
        s = s.replace("id='%s'" % i, "id='%s%s'" % (prefix, i))
        s = s.replace("href='#%s'" % i, "href='#%s%s'" % (prefix, i))
        s = s.replace("url(#%s)" % i, "url(#%s%s)" % (prefix, i))
    # width/height in pt -> keep, add responsive style
    s = re.sub(r"<svg ", "<svg class='r' ", s, count=1)
    m = re.search(r"width='([0-9.]+)pt'", s)
    nat = round(float(m.group(1)) * 4.0 / 3.0) if m else 0
    return s, nat

TEXPAIRS = [('\\|', '\u2016'), ('\\langle', '\u27e8'), ('\\rangle', '\u27e9'),
            ('\\varepsilon', '\u03b5'), ('\\odot', '\u2299'),
            ('^2', '\u00b2'), ('\\,', ''), ('\\ ', ' ')]

def tex_to_unicode(m):
    s = m.group(1)
    for k, v in TEXPAIRS:
        s = s.replace(k, v)
    return '<span class="m">' + html.escape(s) + '</span>'

def md_inline(t):
    # escape, then restore code spans and emphasis
    parts = re.split(r'(`[^`]*`)', t)
    o = []
    for p in parts:
        if p.startswith('`') and p.endswith('`') and len(p) > 1:
            o.append('<code>' + html.escape(p[1:-1]) + '</code>')
        else:
            segs = re.split(r'(\$[^$]*\$)', p)
            e = ''.join(tex_to_unicode(re.match(r'\$([^$]*)\$', g)) if (g.startswith('$') and g.endswith('$') and len(g) > 1) else html.escape(g) for g in segs)
            e = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', e)
            e = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', e)
            o.append(e)
    return ''.join(o)

CSS = """
:root{
  --bg:#faf9f7; --panel:#ffffff; --ink:#1c1b19; --muted:#6c6760;
  --rule:#e2ddd5; --accent:#7a4b1e; --codebg:#f2efe9; --shadow:0 1px 2px rgba(0,0,0,.05);
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#16161a; --panel:#1e1e24; --ink:#e8e5df; --muted:#9a938a;
    --rule:#2e2e35; --accent:#e0a468; --codebg:#23232a; --shadow:0 1px 3px rgba(0,0,0,.5);
  }
}
:root[data-theme="dark"]{
  --bg:#16161a; --panel:#1e1e24; --ink:#e8e5df; --muted:#9a938a;
  --rule:#2e2e35; --accent:#e0a468; --codebg:#23232a; --shadow:0 1px 3px rgba(0,0,0,.5);
}
*{box-sizing:border-box}
body{
  background:var(--bg); color:var(--ink);
  font-family:"DejaVu Serif",Georgia,"Times New Roman",serif;
  font-size:15px; line-height:1.55; margin:0;
}
.wrap{max-width:1180px; margin:0 auto; padding-block:32px 64px; padding-left:20px; padding-right:20px;}
h1{font-size:1.9rem; line-height:1.2; margin:0 0 .6em; letter-spacing:-.01em;}
.intro p{margin:0 0 1em; max-width:70ch; color:var(--ink);}
.intro{border-bottom:1px solid var(--rule); padding-bottom:12px; margin-bottom:28px;}
code{
  font-family:"DejaVu Sans Mono","Noto Sans Mono","Liberation Mono",ui-monospace,monospace;
  font-size:.86em; background:var(--codebg); padding:.08em .28em; border-radius:3px;
}
.intro code{font-size:.84em}

section.row{border-top:1px solid var(--rule); padding-top:14px; margin-top:22px;}
section.row:first-of-type{border-top:none; margin-top:0;}
h2{font-size:1.02rem; margin:0 0 12px; font-weight:600; letter-spacing:.01em;}
h2 .n{
  display:inline-block; min-width:2.1em; color:var(--accent);
  font-family:"DejaVu Sans Mono",ui-monospace,monospace; font-size:.85em;
}
.grid{
  display:grid; gap:12px 22px;
  grid-template-columns:1fr;
}
@media (min-width:900px){
  .grid{
    grid-template-columns:minmax(0,1fr) minmax(0,1fr);
    grid-template-areas:"formula fortress" "dyalog note";
    align-items:start;
  }
  .c-formula{grid-area:formula} .c-dyalog{grid-area:dyalog}
  .c-fortress{grid-area:fortress} .c-note{grid-area:note}
}
.cell{min-width:0}
.lab{
  font-family:"DejaVu Sans Mono",ui-monospace,monospace;
  font-size:10px; letter-spacing:.13em; text-transform:uppercase;
  color:var(--muted); margin-bottom:5px;
}
/* rendered SVG panel: the TeX and Fortify strokes carry no colour of their own
   (dvisvgm emits paths and rects without fill), so they take the ink of the theme */
.render{
  background:var(--panel); border:1px solid var(--rule); border-radius:5px;
  padding:8px 10px; overflow-x:auto; box-shadow:var(--shadow); color:var(--ink);
}
.render svg{fill:currentColor}
/* fit the cell, but never shrink a render below 80% of its natural size:
   below that the panel scrolls instead (--nat is the render's natural width) */
svg.r{max-width:100%; min-width:calc(var(--nat, 0px) * .8); height:auto; display:block;}
.cap{font-size:11px; color:var(--muted); margin-top:4px; font-style:italic;}
.apl, pre.ascii{
  font-family:"APL385 Unicode","BQN386 Unicode","APL333","DejaVu Sans Mono","Noto Sans Mono","Menlo","Consolas","Liberation Mono",ui-monospace,monospace;
  font-size:12.5px; line-height:1.65; background:var(--codebg);
  border:1px solid var(--rule); border-radius:5px; padding:8px 10px;
  white-space:pre-wrap; word-break:break-word; overflow-wrap:anywhere; margin:0;
}
.note{margin:0; color:var(--ink);}
.m{font-family:"DejaVu Serif",Georgia,serif;font-style:italic}
.note.none{color:var(--muted); font-style:italic;}
footer{margin-top:44px; padding-top:14px; border-top:1px solid var(--rule);
  color:var(--muted); font-size:12.5px;}
"""

secs = d['secs']
parts = []
parts.append('<!doctype html>')
parts.append('<html lang="en"><head>')
parts.append('<meta charset="utf-8">')
parts.append('<meta name="viewport" content="width=device-width, initial-scale=1">')
parts.append('<title>Run C3 tour</title>')
parts.append('<style>%s</style>' % CSS)
parts.append('</head><body>')
parts.append('<div class="wrap">')
parts.append('<h1>%s</h1>' % html.escape(d['title']))
parts.append('<div class="intro">')
for p in d['paras']:
    parts.append('<p>%s</p>' % md_inline(p))
parts.append('</div>')

splits = json.load(open(os.path.join(D, 'splits.json'))) if os.path.exists(os.path.join(D,'splits.json')) else {}

for s in secs:
    n = '%02d' % s['num']
    parts.append('<section class="row" id="r%s">' % n)
    parts.append('<h2><span class="n">%d</span>%s</h2>' % (s['num'], html.escape(s['name'])))
    parts.append('<div class="grid">')
    # formula
    svg, nat = inline_svg('f%s.svg' % n, 'f%s_' % n)
    parts.append('<div class="cell c-formula"><div class="lab">Formula</div>'
                 '<div class="render" style="--nat:%dpx">%s</div></div>' % (nat, svg))
    # dyalog
    parts.append('<div class="cell c-dyalog"><div class="lab">Dyalog</div>'
                 '<div class="apl">%s</div></div>' % html.escape(s['dyalog']))
    # fortress
    cap = splits.get(n)
    capfrag = ('<div class="cap">%s</div>' % html.escape(cap)) if cap else ''
    svg, nat = inline_svg('r%s.svg' % n, 'r%s_' % n)
    parts.append('<div class="cell c-fortress"><div class="lab">Fortress</div>'
                 '<div class="render" style="--nat:%dpx">%s</div>%s</div>' % (nat, svg, capfrag))
    # note
    cls = 'note none' if s['note'].lower().strip() in ('none','none.') else 'note'
    parts.append('<div class="cell c-note"><div class="lab">Note</div>'
                 '<p class="%s">%s</p></div>' % (cls, md_inline(s['note'])))
    parts.append('</div></section>')

parts.append('<footer>%d rows. Formulas typeset with LaTeX; Fortress typeset with Fortify '
             '(<code>bin/fortick</code>); both embedded as inline SVG. Dyalog lines are plain text. '
             'Sources and renders: <code>explorations/run-c3/probes/tour/</code>.</footer>' % len(secs))
parts.append('</div>')
parts.append('</body></html>')
open(OUT, 'w', encoding='utf-8').write('\n'.join(parts))
print('wrote', OUT, os.path.getsize(OUT))
