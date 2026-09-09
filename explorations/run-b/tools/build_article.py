"""Build article.html from article.md.

Placeholders in the Markdown:
  {{fig:NAME}}      figures/NAME.svg typeset from Fortress source, inlined, with
                    a <details> holding the ASCII source from figures/NAME.tic
  {{svg:NAME}}      figures/NAME.svg inlined without the source details
  {{math:NAME}}     the LaTeX formula MATH[NAME] (article/math_table.py),
                    rendered by tools/mathfig.sh to figures/math_NAME.svg, inlined
  {{py:NAME}}       article/python/NAME.py, a verbatim excerpt of the pinned reference
  {{pre:PATH}}      any text file, verbatim
  {{pair:MATH|PY|FIG}}  formula, Python and Fortress in one figure block
All SVGs are inlined (ids namespaced), so the page is self-contained; glyph
paths carry no fill, so CSS `fill: currentColor` makes them follow the theme.
"""
import os, re, sys, html, subprocess
import markdown
HERE = os.path.dirname(os.path.abspath(__file__)); W = os.path.join(HERE, '..')
FIG = os.path.join(W, 'figures'); ART = os.path.join(W, 'article')
sys.path.insert(0, ART)
from math_table import MATH

PX_PER_PT = 1.55
COUNTER = [0]

def inline_svg(path, cls):
    s = open(path).read()
    s = re.sub(r'<\?xml[^>]*\?>\s*', '', s); s = re.sub(r'<!--.*?-->\s*', '', s, flags=re.S)
    COUNTER[0] += 1; pre = 's%d-' % COUNTER[0]
    ids = set(re.findall(r"id='([^']+)'", s))
    for i in sorted(ids, key=len, reverse=True):
        s = s.replace("id='%s'" % i, "id='%s%s'" % (pre, i)).replace("href='#%s'" % i, "href='#%s%s'" % (pre, i)).replace("url(#%s)" % i, "url(#%s%s)" % (pre, i))
    m = re.search(r"width='([\d.]+)pt' height='([\d.]+)pt'", s)
    w, h = float(m.group(1)), float(m.group(2))
    s = s.replace(m.group(0), "width='%.1f' height='%.1f' class='%s' role='img'" % (w * PX_PER_PT, h * PX_PER_PT, cls), 1)
    return s

def tic_source(name):
    t = open(os.path.join(FIG, name + '.tic')).read()
    return html.escape(t[t.index('`') + 1:t.rindex('`')])

def render_math(name):
    svg = os.path.join(FIG, 'math_' + name + '.svg')
    if not os.path.exists(svg) or os.path.getmtime(svg) < os.path.getmtime(os.path.join(ART, 'math_table.py')):
        subprocess.run([os.path.join(HERE, 'mathfig.sh'), 'math_' + name, MATH[name]], check=True, capture_output=True)
    return svg

def fig_block(name, with_source=True):
    body = '<div class="scroll">%s</div>' % inline_svg(os.path.join(FIG, name + '.svg'), 'code')
    if with_source:
        body += ('<details><summary>ASCII source as typed (what the typesetter and the interpreter read)</summary>'
                 '<pre class="fss">%s</pre></details>') % tic_source(name)
    return '<figure class="fig">%s</figure>' % body

def math_block(name):
    return '<div class="math scroll">%s</div>' % inline_svg(render_math(name), 'formula')

def py_block(name):
    return '<pre class="py">%s</pre>' % html.escape(open(os.path.join(ART, 'python', name + '.py')).read().rstrip())

def expand(text):
    text = re.sub(r'\{\{pair:([\w-]+)\|([\w-]+)\|([\w-]+)\}\}',
                  lambda m: ('<div class="pair"><div><h4>formula</h4>%s</div><div><h4>python, pinned microgpt.py</h4>%s</div>'
                             '<div class="wide"><h4>fortress, typeset from the running source</h4>%s</div></div>')
                            % (math_block(m.group(1)), py_block(m.group(2)), fig_block(m.group(3))), text)
    text = re.sub(r'\{\{fig:([\w-]+)\}\}', lambda m: fig_block(m.group(1)), text)
    text = re.sub(r'\{\{svg:([\w-]+)\}\}', lambda m: fig_block(m.group(1), False), text)
    text = re.sub(r'\{\{math:([\w-]+)\}\}', lambda m: math_block(m.group(1)), text)
    text = re.sub(r'\{\{py:([\w-]+)\}\}', lambda m: py_block(m.group(1)), text)
    text = re.sub(r'\{\{pre:([\w./-]+)\}\}', lambda m: '<pre class="out">%s</pre>' % html.escape(open(os.path.join(W, m.group(1))).read().rstrip()), text)
    return text

md = open(os.path.join(W, 'article.md')).read()
# protect placeholders from the Markdown converter by expanding them first into raw HTML blocks
body = markdown.markdown(expand(md), extensions=['tables', 'fenced_code', 'toc', 'attr_list', 'md_in_html'], output_format='html5')
head = open(os.path.join(ART, 'head.html')).read()
out = head + body + '\n</main></body></html>\n'
dest = os.path.join(W, 'article.html'); open(dest, 'w').write(out)
print('wrote', dest, len(out) // 1024, 'KB')
