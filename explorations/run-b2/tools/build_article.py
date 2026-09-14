"""Build article.html (self-contained) from article.md.

Placeholders inside article.md:
  {{fig:NAME}}        inline figures/NAME.svg (typeset from the program) followed by a <details>
                      block with the ASCII source taken from figures/NAME.tic
  {{math:NAME}}       inline figures/formulas/NAME.svg (the paper's formula, same pipeline)
  {{py:A-B}}          lines A..B of the pinned reference, quoted verbatim (reference/microgpt.py)
  {{svg:PATH}}        inline an SVG from a path relative to explorations/ (prior runs' figures)
  {{tic:PATH}}        ASCII source of a prior run's .tic, relative to explorations/
  {{txt:PATH:N}}      first N lines of a text file relative to run-b2/
Every SVG is inlined with namespaced glyph ids and fill: currentColor, so the page is one file and
legible in light and dark.
"""
import os, re, sys, html
import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))
EXPL = os.path.normpath(os.path.join(ROOT, '..'))
FIG = os.path.join(ROOT, 'figures')
REF = os.path.join(ROOT, 'reference', 'microgpt.py')

counter = [0]
def inline_svg(path, cls='fig'):
    s = open(path).read()
    s = re.sub(r'<\?xml[^>]*\?>\s*', '', s)
    s = re.sub(r'<!--.*?-->\s*', '', s, flags=re.S)
    counter[0] += 1
    pre = 'f%d-' % counter[0]
    ids = set(re.findall(r"id='([^']+)'", s))
    for i in ids:
        s = s.replace("id='%s'" % i, "id='%s%s'" % (pre, i))
        s = s.replace("xlink:href='#%s'" % i, "xlink:href='#%s%s'" % (pre, i))
        s = s.replace("href='#%s'" % i, "href='#%s%s'" % (pre, i))
    m = re.search(r"width='([\d.]+)pt' height='([\d.]+)pt'", s)
    w, h = (float(m.group(1)), float(m.group(2))) if m else (300.0, 20.0)
    s = re.sub(r"<svg ", "<svg class='%s' style='width:%.1fpx;height:%.1fpx' " % (cls, w * 1.45, h * 1.45), s, count=1)
    s = re.sub(r" width='[\d.]+pt'", "", s, count=1)
    s = re.sub(r" height='[\d.]+pt'", "", s, count=1)
    return s

def tic_source(path):
    s = open(path).read()
    i = s.index('`') + 1
    j = s.rindex('`')
    return s[i:j].strip('\n')

def fig(name):
    svg = inline_svg(os.path.join(FIG, name + '.svg'))
    src = tic_source(os.path.join(FIG, name + '.tic'))
    return ("<div class='pair-fortress'>%s<details><summary>ASCII source as typed</summary><pre><code>%s</code></pre></details></div>"
            % (svg, html.escape(src)))

def math(name):
    return "<div class='pair-formula'>%s</div>" % inline_svg(os.path.join(FIG, 'formulas', name + '.svg'), 'fig formula')

def py(rng):
    a, b = [int(x) for x in rng.split('-')]
    lines = open(REF).read().split('\n')[a - 1:b]
    return ("<div class='pair-python'><pre><code>%s</code></pre><div class='cap'>microgpt.py, lines %d-%d</div></div>"
            % (html.escape('\n'.join(lines)), a, b))

def svg_path(rel):
    return "<div class='pair-fortress'>%s</div>" % inline_svg(os.path.join(EXPL, rel))

def tic_path(rel):
    return "<details><summary>ASCII source as typed</summary><pre><code>%s</code></pre></details>" % html.escape(tic_source(os.path.join(EXPL, rel)))

def txt(rel, n):
    lines = [l for l in open(os.path.join(ROOT, rel)).read().split('\n') if not l.startswith('\tat ') and 'Throwable' not in l and 'debug interpreter' not in l]
    return "<pre class='out'><code>%s</code></pre>" % html.escape('\n'.join(lines[:int(n)]))

def expand(md):
    md = re.sub(r'\{\{fig:([\w-]+)\}\}', lambda m: fig(m.group(1)), md)
    md = re.sub(r'\{\{math:([\w-]+)\}\}', lambda m: math(m.group(1)), md)
    md = re.sub(r'\{\{py:([\d-]+)\}\}', lambda m: py(m.group(1)), md)
    md = re.sub(r'\{\{svg:([^}]+)\}\}', lambda m: svg_path(m.group(1)), md)
    md = re.sub(r'\{\{tic:([^}]+)\}\}', lambda m: tic_path(m.group(1)), md)
    md = re.sub(r'\{\{txt:([^:}]+):(\d+)\}\}', lambda m: txt(m.group(1), m.group(2)), md)
    return md

CSS = """
:root { --bg:#f5f6f4; --fg:#1b1d22; --muted:#5c6068; --rule:#cfd3d1; --accent:#2f4c8a; --code:#e9ecea; --pair:#fbfcfb; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#15171b; --fg:#e4e6e3; --muted:#9aa0a6; --rule:#363a40; --accent:#9db4e8; --code:#20242a; --pair:#1b1e23; } }
:root[data-theme="dark"] { --bg:#15171b; --fg:#e4e6e3; --muted:#9aa0a6; --rule:#363a40; --accent:#9db4e8; --code:#20242a; --pair:#1b1e23; }
body { background:var(--bg); color:var(--fg); font: 17px/1.55 'Source Serif 4', Georgia, 'Times New Roman', serif; margin:0; }
main { max-width: 64rem; margin: 0 auto; padding: 2.4rem 1.2rem 5rem; }
h1 { font-size: 2.2rem; line-height:1.12; margin: 0 0 .6rem; font-weight: 600; text-wrap: balance; }
h2 { font-size: 1.5rem; margin: 2.8rem 0 .6rem; border-bottom: 1px solid var(--rule); padding-bottom:.25rem; font-weight: 600; text-wrap: balance; }
h3 { font-size: 1.15rem; margin: 1.9rem 0 .4rem; font-weight: 600; }
p, li { max-width: 40rem; }
a { color: var(--accent); }
code, pre { font-family: 'Source Code Pro', 'SF Mono', Menlo, Consolas, monospace; font-size: .84rem; }
pre { background: var(--code); padding: .6rem .8rem; overflow-x: auto; border-radius: 3px; margin: .4rem 0; }
pre.out { font-size: .78rem; }
p code, li code, td code { background: var(--code); padding: 0 .25em; border-radius: 2px; }
table { border-collapse: collapse; font-size: .9rem; display:block; overflow-x:auto; max-width:100%; font-variant-numeric: tabular-nums; }
th, td { border: 1px solid var(--rule); padding: .3rem .55rem; text-align: left; vertical-align: top; }
th { background: var(--code); font-family: 'Source Sans 3', system-ui, sans-serif; font-weight: 600; }
.fig { fill: currentColor; max-width: 100%; height: auto; display:block; }
.pair-formula, .pair-fortress, .pair-python { background: var(--pair); border: 1px solid var(--rule); border-left: 3px solid var(--accent); border-radius: 2px; padding: .7rem .9rem; margin: .5rem 0; overflow-x: auto; }
.pair-python { border-left-color: var(--rule); }
.pair-formula::before { content: 'formula'; } .pair-fortress::before { content: 'Fortress, typeset from the program'; } .pair-python::before { content: 'reference, verbatim'; }
.pair-formula::before, .pair-fortress::before, .pair-python::before { display:block; font: 600 .68rem/1.2 'Source Sans 3', system-ui, sans-serif; letter-spacing: .09em; text-transform: uppercase; color: var(--muted); margin-bottom: .45rem; }
.pair-python pre { margin: 0; background: transparent; padding: 0; }
.cap { font: .74rem 'Source Sans 3', system-ui, sans-serif; color: var(--muted); margin-top: .35rem; }
details { margin-top: .4rem; font-size: .85rem; } summary { cursor: pointer; color: var(--muted); font: .76rem 'Source Sans 3', system-ui, sans-serif; letter-spacing: .03em; }
summary:focus-visible { outline: 2px solid var(--accent); }
details pre { margin-top: .3rem; }
.lede { font-size: 1.08rem; color: var(--muted); max-width: 42rem; }
.mark { font: 600 .68rem 'Source Sans 3', system-ui, sans-serif; letter-spacing:.06em; padding: 0 .3em; border: 1px solid var(--rule); border-radius: 2px; white-space: nowrap; color: var(--accent); }
"""

def main():
    md = open(os.path.join(ROOT, 'article.md')).read()
    md = expand(md)
    body = markdown.markdown(md, extensions=['tables', 'fenced_code', 'toc'])
    out = ("<title>Matrix-Level microGPT in Fortress</title>\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@400;600&family=Source+Code+Pro&display=swap\">\n<style>%s</style>\n<main>\n%s\n</main>\n" % (CSS, body))
    open(os.path.join(ROOT, 'article.html'), 'w').write(out)
    print('wrote article.html', len(out) // 1024, 'KB')

if __name__ == '__main__':
    main()
