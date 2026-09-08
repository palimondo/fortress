"""Assemble experiment/worker/article.html from article/sections/*.html.

Placeholders:
  {{fig:NAME}}   inline SVG figures/NAME.svg (typeset Fortress source) + a <details> with
                 the ASCII source from figures/NAME.tic
  {{math:NAME}}  inline SVG of a LaTeX formula from the MATH table (rendered by mathfig.sh)
  {{svgw:NAME}}  same as fig but without the source details
All SVGs are inlined, so the page is self-contained; they use currentColor for dark mode.
"""
import os, re, subprocess, sys, html, glob
HERE = os.path.dirname(os.path.abspath(__file__))
W = os.path.join(HERE, '..'); FIG = os.path.join(W, 'figures'); SEC = os.path.join(W, 'article', 'sections')
sys.path.insert(0, os.path.join(W, 'article'))
from math_table import MATH   # name -> LaTeX (display math)

PX_PER_PT = 1.6

def render_math(name):
    svg = os.path.join(FIG, 'math_' + name + '.svg')
    if not os.path.exists(svg) or os.path.getmtime(svg) < os.path.getmtime(os.path.join(W, 'article', 'math_table.py')):
        subprocess.run([os.path.join(HERE, 'mathfig.sh'), 'math_' + name, MATH[name]], check=True, capture_output=True)
    return svg

COUNTER = [0]
def inline_svg(path, cls):
    s = open(path).read()
    s = re.sub(r'<\?xml[^>]*\?>\s*', '', s); s = re.sub(r'<!--.*?-->\s*', '', s, flags=re.S)
    # namespace the glyph ids: every dvisvgm SVG defines g0-99 etc., which collide when inlined together
    COUNTER[0] += 1; pre = 's%d-' % COUNTER[0]
    ids = set(re.findall(r"id='([^']+)'", s))
    for i in sorted(ids, key=len, reverse=True):
        s = s.replace("id='%s'" % i, "id='%s%s'" % (pre, i)).replace("href='#%s'" % i, "href='#%s%s'" % (pre, i)).replace("url(#%s)" % i, "url(#%s%s)" % (pre, i))
    m = re.search(r"width='([\d.]+)pt' height='([\d.]+)pt'", s)
    w, h = float(m.group(1)), float(m.group(2))
    s = s.replace(m.group(0), "width='%.1f' height='%.1f' class='%s'" % (w * PX_PER_PT, h * PX_PER_PT, cls), 1)
    return s

def tic_source(name):
    t = open(os.path.join(FIG, name + '.tic')).read()
    body = t[t.index('`') + 1:t.rindex('`')]
    return html.escape(body)

def expand(text):
    def fig(m):
        name = m.group(1)
        return ('<figure class="fig"><div class="scroll">%s</div>'
                '<details><summary>ASCII source as typed (this is what the typesetter and the interpreter read)</summary>'
                '<pre class="fss">%s</pre></details></figure>') % (inline_svg(os.path.join(FIG, name + '.svg'), 'code'), tic_source(name))
    def svgw(m):
        return '<figure class="fig"><div class="scroll">%s</div></figure>' % inline_svg(os.path.join(FIG, m.group(1) + '.svg'), 'code')
    def math(m):
        return '<div class="math scroll">%s</div>' % inline_svg(render_math(m.group(1)), 'formula')
    text = re.sub(r'\{\{fig:([\w-]+)\}\}', fig, text)
    text = re.sub(r'\{\{svgw:([\w-]+)\}\}', svgw, text)
    def pre(m):
        path, cls = m.group(1), m.group(2) or 'out'
        return '<pre class="%s">%s</pre>' % (cls, html.escape(open(os.path.join(W, path)).read()))
    text = re.sub(r'\{\{math:([\w-]+)\}\}', math, text)
    text = re.sub(r'\{\{pre:([\w./-]+)(?::(\w+))?\}\}', pre, text)
    return text

parts = [open(p).read() for p in sorted(glob.glob(os.path.join(SEC, '*.html')))]
body = expand('\n'.join(parts))
head = open(os.path.join(W, 'article', 'head.html')).read()
out = head + body + '\n</main></body></html>\n'
dest = os.path.join(W, 'article.html')
open(dest, 'w').write(out)
print('wrote', dest, len(out) // 1024, 'KB;', len(parts), 'sections')
