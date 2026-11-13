#!/usr/bin/env python3
"""Builds the microGPT walk-through, docs/microgpt/, from the text in src/.

    python3 explorations/microgpt-walk/build.py            # build every page
    python3 explorations/microgpt-walk/build.py --strict   # also fail if a line of the program is not quoted
    python3 explorations/microgpt-walk/build.py --reader   # also copy reader.css and reader.js again

README.md beside this file gives the markup of src/*.md and what the build checks.
Python 3, the standard library, and latex and dvisvgm for the displayed formulas.
"""
import hashlib
import html
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SRC = HERE / 'src'
OUT = ROOT / 'docs' / 'microgpt'
WORK = ROOT / 'tmp' / 'microgpt-walk'
PROG = ROOT / 'explorations' / 'run-c4' / 'src'
MAIN = 'MicroGptFlat.fss'
READER = ROOT / 'docs' / 'specification'
GITHUB = 'https://github.com/palimondo/fortress/blob/main/'
TITLE = 'microGPT in Fortress, line by line'
EM_PER_PT = 0.1          # a formula's 10 pt type is set at 1 em of the page's text

SLUGS = {'listing', 'notes', 'index'}     # the pages that a link may name; main() adds the parts

GREEK = {'alpha': 'α', 'beta': 'β', 'varepsilon': 'ε', 'epsilon': 'ε', 'cdot': '·', 'times': '×', 'le': '≤', 'ge': '≥',
         'ne': '≠', 'approx': '≈', 'sum': '∑', 'sqrt': '√', 'to': '→', 'top': 'T', 'ldots': '…', 'infty': '∞', 'odot': '⊙'}


def sha(text, n=8):
    return hashlib.sha1(text.encode('utf-8')).hexdigest()[:n]


def esc(text):
    return html.escape(text, quote=False)


# ---------------------------------------------------------------- the program's files

class Sources:
    """The files that the pages quote, and which characters of the program have been quoted."""

    def __init__(self):
        self.lines = {}
        self.covered = {}      # line number of MAIN -> set of character positions quoted
        self.first = {}        # line number of MAIN -> (slug, block id) of its first quotation

    def get(self, name):
        if name not in self.lines:
            self.lines[name] = (PROG / name).read_text(encoding='utf-8').split('\n')
        return self.lines[name]

    def quote(self, name, spec, where):
        """spec: 'N', 'N-M', or 'N: fragment'. Returns [(line number, text, continued?)]."""
        lines = self.get(name)
        m = re.match(r'^(\d+)(?:-(\d+))?(?::\s?(.*))?$', spec.strip(), re.S)
        if not m:
            raise SystemExit('bad @src: %r' % spec)
        a = int(m.group(1))
        b = int(m.group(2)) if m.group(2) else a
        frag = m.group(3)
        out = []
        if frag is not None:
            line = lines[a - 1]
            at = line.find(frag)
            if at < 0:
                raise SystemExit('%s line %d does not hold: %s' % (name, a, frag))
            out.append((a, frag, False))
            if name == MAIN:
                self.covered.setdefault(a, set()).update(range(at, at + len(frag)))
                self.first.setdefault(a, where)
        else:
            for n in range(a, b + 1):
                out.append((n, lines[n - 1], False))
                if name == MAIN:
                    self.covered.setdefault(n, set()).update(range(len(lines[n - 1])))
                    self.first.setdefault(n, where)
        return out

    def uncovered(self):
        """Lines of MAIN with a character that no page quotes, apart from white space and ';'."""
        bad = []
        for n, line in enumerate(self.get(MAIN), 1):
            got = self.covered.get(n, set())
            rest = ''.join(c for i, c in enumerate(line) if i not in got)
            if rest.strip(' ;\t'):
                bad.append((n, rest.strip()))
        return bad


# ---------------------------------------------------------------- inline markup

def inline_math(tex):
    """A formula inside a sentence stays HTML text, as in the specification reader."""
    out, i = [], 0

    def group(j):
        if j < len(tex) and tex[j] == '{':
            depth, k = 1, j + 1
            while k < len(tex) and depth:
                depth += {'{': 1, '}': -1}.get(tex[k], 0)
                k += 1
            return tex[j + 1:k - 1], k
        if j < len(tex) and tex[j] == '\\':
            m = re.match(r'\\[A-Za-z]+', tex[j:])
            return m.group(0), j + len(m.group(0))
        return tex[j:j + 1], j + 1

    while i < len(tex):
        c = tex[i]
        if c == '\\':
            m = re.match(r'\\([A-Za-z]+)', tex[i:])
            if m:
                name = m.group(1)
                i += len(m.group(0))
                if name in ('c', 'mathtt', 'mathrm', 'text'):
                    g, i = group(i)
                    cls = 'tt' if name in ('c', 'mathtt') else 'rm'
                    out.append('<span class="%s">%s</span>' % (cls, esc(g.replace('\\_', '_'))))
                elif name == 'frac':
                    a, i = group(i)
                    b, i = group(i)
                    out.append('%s/%s' % (inline_math(a), inline_math(b)))
                else:
                    out.append(GREEK.get(name, name))
                continue
            out.append(esc(tex[i + 1:i + 2]))
            i += 2
        elif c in '_^':
            g, i = group(i + 1)
            out.append('<%s>%s</%s>' % ('sub' if c == '_' else 'sup', inline_math(g), 'sub' if c == '_' else 'sup'))
        elif c.isalpha():
            out.append('<i>%s</i>' % c)
            i += 1
        elif c == '-':
            out.append('−')
            i += 1
        else:
            out.append(esc(c))
            i += 1
    return ''.join(out)


def inline(text):
    """`code`, **strong**, *emphasis*, [text](link), $formula$."""
    keep = []

    def stash(markup):
        keep.append(markup)
        return '\x00%d\x00' % (len(keep) - 1)

    text = re.sub(r'`([^`]+)`', lambda m: stash('<code>%s</code>' % esc(m.group(1))), text)
    text = re.sub(r'\$([^$]+)\$', lambda m: stash('<span class="m">%s</span>' % inline_math(m.group(1))), text)
    text = esc(text)

    def link(m):
        label, url = m.group(1), m.group(2)
        if url.startswith('src:'):
            url = GITHUB + url[4:]
        elif url.startswith('part:'):
            slug, _, frag = url[5:].partition('#')
            if slug not in SLUGS:
                return label + ' <span class="pending">[not written yet]</span>'
            url = slug + '.html' + ('#' + frag if frag else '')
        return '<a href="%s">%s</a>' % (html.escape(url), label)

    text = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', link, text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'(?<![\w*])\*([^*\s][^*]*)\*(?![\w*])', r'<em>\1</em>', text)
    return re.sub(r'\x00(\d+)\x00', lambda m: keep[int(m.group(1))], text)


def plain(text):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', inline(text)))).strip()


# ---------------------------------------------------------------- displayed formulas

PREAMBLE = r'''\documentclass[10pt]{article}
\usepackage{amsmath,amssymb}
\pagestyle{empty}
\setlength{\parindent}{0pt}
\renewcommand{\c}[1]{\mathtt{#1}}
\begin{document}
'''


class Formulas:
    """Each displayed formula is set by LaTeX and converted to SVG by dvisvgm, once, and kept in the work folder."""

    def __init__(self):
        self.dir = WORK / 'formulas'
        self.dir.mkdir(parents=True, exist_ok=True)
        self.want = {}

    def key(self, tex):
        k = 'q' + sha(PREAMBLE + tex, 10)
        self.want[k] = tex
        return k

    def render(self):
        todo = [k for k in self.want if not (self.dir / (k + '.svg')).exists()]
        if not todo:
            return
        body = '\n\\newpage\n'.join('$\\displaystyle %s$' % self.want[k].strip() for k in todo)
        (self.dir / 'all.tex').write_text(PREAMBLE + body + '\n\\end{document}\n', encoding='utf-8')
        r = subprocess.run(['latex', '-interaction=nonstopmode', '-halt-on-error', 'all.tex'], cwd=self.dir,
                           capture_output=True, text=True)
        if r.returncode:
            sys.stderr.write(r.stdout[-3000:])
            raise SystemExit('latex failed: see %s' % (self.dir / 'all.log'))
        r = subprocess.run(['dvisvgm', '--font-format=woff2', '--exact-bbox', '--page=1-', '--output=pg%p.svg', 'all.dvi'],
                           cwd=self.dir, capture_output=True, text=True)
        if r.returncode:
            raise SystemExit('dvisvgm failed: ' + r.stderr[-2000:])
        for n, k in enumerate(todo, 1):
            page = self.dir / ('pg%d.svg' % n)
            if not page.exists():      # dvisvgm pads the page number when there are ten pages or more
                page = next(p for p in self.dir.glob('pg*.svg') if int(re.sub(r'\D', '', p.stem)) == n)
            (self.dir / (k + '.svg')).write_text(self.clean(page.read_text(encoding='utf-8'), k), encoding='utf-8')
            page.unlink()

    @staticmethod
    def clean(svg, k):
        """One SVG serves light and dark: it is drawn in the text's colour. Its font and class names get the
        formula's key, since every formula of a page shares the page's names."""
        svg = re.sub(r'<\?xml[^>]*\?>\s*', '', svg)
        svg = re.sub(r'<!--.*?-->\s*', '', svg, flags=re.S)
        svg = svg.replace('<![CDATA[', '').replace(']]>', '')
        svg = re.sub(r'font-family:([A-Za-z0-9]+)', lambda m: 'font-family:%s-%s' % (k, m.group(1)), svg)
        svg = re.sub(r'text\.f(\d+)', lambda m: 'text.%sf%s' % (k, m.group(1)), svg)
        svg = re.sub(r"class='f(\d+)'", lambda m: "class='%sf%s'" % (k, m.group(1)), svg)
        svg = re.sub(r"\s(xmlns:xlink|version)='[^']*'", '', svg)

        def size(m):
            return "%s='%.3fem'" % (m.group(1), float(m.group(2)) * EM_PER_PT)

        head, _, rest = svg.partition('>')
        head = re.sub(r"(width|height)='([0-9.]+)pt'", size, head)
        return head + " fill='currentColor' aria-hidden='true'>" + rest.strip() + '\n'

    def svg(self, k):
        return (self.dir / (k + '.svg')).read_text(encoding='utf-8')


# ---------------------------------------------------------------- one part

class Part:
    def __init__(self, path, number, sources, formulas):
        self.path, self.number = path, number
        self.slug = re.sub(r'^\d+-', '', path.stem)
        self.sources, self.formulas = sources, formulas
        self.ids = set()
        self.title = self.lead = ''
        self.sections = []           # (level, number, title, anchor)
        self.pending = []            # formula placeholders
        self.body = self.convert(path.read_text(encoding='utf-8'))

    @property
    def chapter(self):
        return ('%d. %s' % (self.number, self.title)) if self.number else self.title

    def uid(self, prefix, text):
        base = '%s-%s' % (prefix, sha(text))
        uid, n = base, 1
        while uid in self.ids:
            n += 1
            uid = '%s-%d' % (base, n)
        self.ids.add(uid)
        return uid

    def convert(self, text):
        lines = text.split('\n')
        out = []
        open_secs = []               # levels of the open <section>s
        counters = [0, 0]
        i = 0

        def close(to_level):
            while open_secs and open_secs[-1] >= to_level:
                open_secs.pop()
                out.append('</section>')

        blocks = self.blocks(lines)
        for kind, data in blocks:
            if kind == 'h1':
                self.title = data
            elif kind == 'lead':
                self.lead = data
            elif kind == 'h':
                level, title, anchor = data
                close(level)
                if level == 2:
                    counters[0] += 1
                    counters[1] = 0
                    num = '%d.%d' % (self.number, counters[0])
                else:
                    counters[1] += 1
                    num = '%d.%d.%d' % (self.number, counters[0], counters[1])
                anchor = anchor or 's-' + re.sub(r'[^a-z0-9]+', '-', plain(title).lower()).strip('-')
                self.ids.add(anchor)
                self.sections.append((level, num, plain(title), anchor))
                out.append('<section class="sec" data-num="%s" data-title="%s">' % (num, html.escape(plain(title))))
                out.append('<h%d id="%s" class="nb"><span class="num">%s</span> %s</h%d>' % (level, anchor, num, inline(title), level))
                open_secs.append(level)
            else:
                out.append(self.block(kind, data))
        close(2)
        return '\n'.join(out)

    def blocks(self, lines):
        """Splits the text into blocks: ('p', text), ('ul', items), ('code', (lang, text)), ..."""
        out, i, n = [], 0, len(lines)
        while i < n:
            line = lines[i]
            if not line.strip():
                i += 1
            elif line.startswith('# '):
                out.append(('h1', line[2:].strip()))
                i += 1
            elif line.startswith('> '):
                out.append(('lead', line[2:].strip()))
                i += 1
            elif re.match(r'^#{2,3} ', line):
                m = re.match(r'^(#{2,3}) (.*?)(?:\s*\{#([\w-]+)\})?\s*$', line)
                out.append(('h', (len(m.group(1)), m.group(2), m.group(3))))
                i += 1
            elif line.startswith('```'):
                lang = line[3:].strip()
                j = i + 1
                while not lines[j].startswith('```'):
                    j += 1
                out.append(('code', (lang, '\n'.join(lines[i + 1:j]))))
                i = j + 1
            elif line.strip() == '$$':
                j = i + 1
                while lines[j].strip() != '$$':
                    j += 1
                out.append(('math', '\n'.join(lines[i + 1:j])))
                i = j + 1
            elif line.startswith('@src '):
                items = []
                while i < n and lines[i].startswith('@src '):
                    items.append(lines[i][5:])
                    i += 1
                out.append(('src', items))
            elif line.startswith('@fig '):
                name, _, caption = line[5:].partition('|')
                out.append(('fig', (name.strip(), caption.strip())))
                i += 1
            elif line.startswith('!!! '):
                j = i + 1
                while lines[j].strip() != '!!!':
                    j += 1
                out.append(('aside', (line[4:].strip(), lines[i + 1:j])))
                i = j + 1
            elif re.match(r'^(- |\d+\. )', line):
                ordered = not line.startswith('- ')
                items = []
                while i < n and (re.match(r'^(- |\d+\. )', lines[i]) or (lines[i].startswith('  ') and lines[i].strip())):
                    if re.match(r'^(- |\d+\. )', lines[i]):
                        items.append(re.sub(r'^(- |\d+\. )', '', lines[i]))
                    else:
                        items[-1] += ' ' + lines[i].strip()
                    i += 1
                out.append(('ol' if ordered else 'ul', items))
            else:
                j = i
                while j < n and lines[j].strip() and not re.match(r'^(#{1,3} |```|@src |@fig |!!! |- |\d+\. |\$\$$)', lines[j]):
                    j += 1
                out.append(('p', ' '.join(l.strip() for l in lines[i:j])))
                i = j
        return out

    def block(self, kind, data):
        if kind == 'p':
            return '<p id="%s" class="nb">%s</p>' % (self.uid('p', data), inline(data))
        if kind in ('ul', 'ol'):
            items = ''.join('<li><p id="%s" class="nb">%s</p></li>\n' % (self.uid('p', it), inline(it)) for it in data)
            return '<%s>\n%s</%s>' % (kind, items, kind)
        if kind == 'code':
            lang, text = data
            if lang == 'out':
                long = ' long' if len(text) > 200 else ''      # Speak skips a long box of numbers (walk.js)
                return ('<pre class="vb nb out%s" id="%s" data-kind="output"><code>%s</code></pre>'
                        % (long, self.uid('o', text), esc(text)))
            return ('<div class="fx nb own" id="%s" data-kind="code"><pre class="fx-s"><code>%s</code></pre></div>'
                    % (self.uid('c', text), esc(text)))
        if kind == 'src':
            return self.src(data)
        if kind == 'math':
            k = self.formulas.key(data)
            self.pending.append(k)
            return '<div class="dm nb" id="%s" data-kind="formula">\x01%s\x01</div>' % (self.uid('m', data), k)
        if kind == 'fig':
            name, caption = data
            svg = (HERE / 'figs' / (name + '.svg')).read_text(encoding='utf-8')
            svg = re.sub(r'<\?xml[^>]*\?>\s*', '', svg)
            cap = '<figcaption>%s</figcaption>' % inline(caption) if caption else ''
            return '<figure class="fig nb" id="%s" data-kind="drawing">%s%s</figure>' % (self.uid('f', name), svg.strip(), cap)
        if kind == 'aside':
            head, lines = data
            cls, _, label = head.partition(' ')
            label = label or {'limit': "A limit of today's tree"}.get(cls, cls)
            inner = '\n'.join(self.block(k, d) for k, d in self.blocks(lines))
            if cls == 'words':        # a folded box, as "How this edition works" on the specification's start page
                head, _, lead = label.partition('|')
                return ('<details class="words"><summary><strong class="w-head">%s</strong> <span class="w-lead">%s</span></summary>\n%s</details>'
                        % (esc(head.strip()), inline(lead.strip()), inner))
            return '<aside class="%s"><p class="label">%s</p>\n%s</aside>' % (cls, esc(label), inner)
        raise SystemExit('unknown block: ' + kind)

    def src(self, items):
        """Quoted lines of the program's files, each with its line number, linked to the file."""
        name, rows, text = MAIN, [], []
        m = re.match(r'^(\S+\.fs[si])\s+(.*)$', items[0], re.S)
        if m:
            name = m.group(1)
        uid = self.uid('c', name + '|' + '|'.join(items))
        for item in items:
            m = re.match(r'^(\S+\.fs[si])\s+(.*)$', item, re.S)
            spec = m.group(2) if m else item
            rows.extend(self.sources.quote(name, spec, (self.slug, uid)))
        indent = min((len(t) - len(t.lstrip(' ')) for _, t, _ in rows if t.strip()), default=0)
        url = GITHUB + 'explorations/run-c4/src/' + name
        for n, t, _ in rows:
            text.append('<span class="l"><span class="ln"><a href="%s#L%d" title="%s, line %d">%d</a></span>%s</span>'
                        % (url, n, name, n, n, esc(t[indent:] if t.strip() else '')))
        cap = '' if name == MAIN else '<div class="src-file"><a href="%s">%s</a></div>' % (url, name)
        return ('<div class="fx nb src" id="%s" data-kind="code">%s<pre class="fx-s"><code>%s</code></pre></div>'
                % (uid, cap, ''.join(text)))


# ---------------------------------------------------------------- pages

def page(title, kind, slug, chapter, body, here):
    return '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%s</title>
<link rel="stylesheet" href="reader.css">
<link rel="stylesheet" href="walk.css">
</head>
<body data-page="%s" data-slug="%s" data-chapter="%s">
<nav class="bar" aria-label="Reader"><a href="index.html">Contents</a><span class="here">%s</span><a href="notes.html" class="notes-link">Notes</a></nav>
<div class="page">
%s
</div>
<script src="walk.js"></script>
<script src="reader.js"></script>
</body>
</html>
''' % (esc(title), kind, slug, html.escape(chapter), esc(here), body)


def part_page(part, prev, nxt):
    secs = ''.join('<li><a href="#%s">%s %s</a></li>' % (a, num, esc(t)) for lvl, num, t, a in part.sections if lvl == 2)
    pager = '<nav class="pager" aria-label="Parts">%s%s</nav>' % (
        '<a class="prev" href="%s.html"><span>Previous</span> %s</a>' % (prev.slug, esc(prev.chapter)) if prev else '<span></span>',
        '<a class="next" href="%s.html"><span>Next</span> %s</a>' % (nxt.slug, esc(nxt.chapter)) if nxt else '<span></span>')
    body = '''<header class="masthead">
<p class="eyebrow">%s</p>
</header>
<div id="resume"></div>
<div id="chapter-notes"></div>
<section class="sec chapter" data-num="%d" data-title="%s">
<h1 id="top" class="nb"><span class="num">Part %d</span> %s</h1>
%s
<nav class="parts" aria-label="Sections of this part"><h2>Sections</h2><ol>%s</ol></nav>
%s
</section>
%s
<footer class="colophon">Built from <code>explorations/microgpt-walk/src/%s</code> of the revival's repository. The quoted lines are those of <a href="%s">MicroGptFlat.fss</a> and the components beside it, as the build found them.</footer>''' % (
        TITLE, part.number, html.escape(part.title), part.number, inline(part.title),
        '<p class="standfirst">%s</p>' % inline(part.lead) if part.lead else '', secs, part.body, pager,
        part.path.name, GITHUB + 'explorations/run-c4/src/' + MAIN)
    return page('%s · microGPT in Fortress' % part.chapter, 'chapter', part.slug, part.chapter, body, part.chapter)


def index_page(parts, intro):
    items = []
    for p in parts:
        secs = ''.join('<li><a href="%s.html#%s">%s %s</a></li>' % (p.slug, a, num, esc(t))
                       for lvl, num, t, a in p.sections if lvl == 2)
        items.append('<li class="done" data-slug="%s"><a href="%s.html"><span class="num">%d</span> %s</a>'
                     '<span class="lead">%s</span><details class="secs"><summary>%d sections</summary><ol>%s</ol></details></li>'
                     % (p.slug, p.slug, p.number, inline(p.title), inline(p.lead), sum(1 for s in p.sections if s[0] == 2), secs))
    body = '''<header class="masthead">
<p class="eyebrow">The Fortress revival · the model program</p>
<h1>%s</h1>
%s
</header>
<div id="continue"></div>
<div class="intro">
%s
</div>
<section class="part contents">
<h2>Contents</h2>
<ul class="chapters">%s</ul>
<ul class="chapters"><li class="done" data-slug="listing"><a href="listing.html">The program on one page</a><span class="lead" style="margin-left:0">Every line of <code>MicroGptFlat.fss</code>; each number leads to the place that explains the line.</span></li></ul>
</section>
<footer class="colophon">Text and build: <code>explorations/microgpt-walk/</code> of the revival's repository. The reader is the specification reader's, used unchanged.</footer>''' % (
        TITLE, intro.lead and '<p class="standfirst">%s</p>' % inline(intro.lead), intro.body, '\n'.join(items))
    return page(TITLE, 'index', 'index', 'Contents', body, 'microGPT in Fortress')


def notes_page():
    body = '''<header class="masthead">
<p class="eyebrow">%s</p>
<h1>Your notes</h1>
<p class="standfirst">Notes are kept in this browser only. Export them to keep them, or to bring them to an assistant.</p>
</header>
<div id="storage-warning"></div>
<section class="part" id="export">
<h2>Export</h2>
<p>The text below holds every note: its part, its section, a link to the place, the first words of the passage, and the note.</p>
<p class="actions"><button type="button" id="copy-notes" class="act">Copy to the clipboard</button> <button type="button" id="save-notes" class="act">Save as a file</button> <span id="export-status" role="status"></span></p>
<textarea id="export-text" readonly rows="10" aria-label="All notes as text"></textarea>
</section>
<section class="part" id="import">
<h2>Import</h2>
<p>Bring back notes from a file that this page saved, or paste its text. Notes that are already here stay; a note with the same identity keeps its newer text.</p>
<p class="actions"><label class="act file">Choose a file<input type="file" id="import-file" accept=".txt,.md,text/plain"></label> <span id="import-status" role="status"></span></p>
<textarea id="import-text" rows="4" aria-label="Exported notes to import" placeholder="or paste exported notes here"></textarea>
<p class="actions"><button type="button" id="import-paste" class="act">Import the pasted text</button></p>
</section>
<section class="part" id="all-notes">
<h2>All notes</h2>
<div id="notes-list"></div>
</section>''' % TITLE
    return page('Notes · microGPT in Fortress', 'notes', 'notes', 'Notes', body, 'Your notes')


def listing_page(sources):
    rows = []
    for n, line in enumerate(sources.get(MAIN), 1):
        if n == len(sources.get(MAIN)) and not line:
            break
        where = sources.first.get(n)
        num = ('<a class="lnk" href="%s.html#%s">%d</a>' % (where[0], where[1], n)) if where else '<a class="lnk">%d</a>' % n
        rows.append(num + esc(line))
    body = '''<header class="masthead">
<p class="eyebrow">%s</p>
<h1>The program on one page</h1>
<p class="standfirst">Every line of <a href="%s"><code>MicroGptFlat.fss</code></a>, as the build found it. A line's number leads to the place that explains the line.</p>
</header>
<pre class="listing"><code>%s</code></pre>''' % (TITLE, GITHUB + 'explorations/run-c4/src/' + MAIN, '\n'.join(rows))
    return page('The program on one page · microGPT in Fortress', 'listing', 'listing', 'The program on one page', body, 'The program on one page')


def main():
    strict = '--strict' in sys.argv
    sources, formulas = Sources(), Formulas()
    files = sorted(SRC.glob('[0-9][0-9]-*.md'))
    SLUGS.update(re.sub(r'^\d+-', '', f.stem) for f in files if f.name != '00-index.md')
    intro = Part(SRC / '00-index.md', 0, sources, formulas)
    parts = [Part(f, int(f.name[:2]), sources, formulas) for f in files if f.name != '00-index.md']
    formulas.render()
    OUT.mkdir(parents=True, exist_ok=True)

    def fill(text):
        return re.sub(r'\x01(\w+)\x01', lambda m: formulas.svg(m.group(1)), text)

    for p in [intro] + parts:
        p.body = fill(p.body)
    for i, p in enumerate(parts):
        (OUT / (p.slug + '.html')).write_text(part_page(p, parts[i - 1] if i else None, parts[i + 1] if i + 1 < len(parts) else None), encoding='utf-8')
    (OUT / 'index.html').write_text(index_page(parts, intro), encoding='utf-8')
    (OUT / 'notes.html').write_text(notes_page(), encoding='utf-8')
    (OUT / 'listing.html').write_text(listing_page(sources), encoding='utf-8')
    for name in ('walk.css', 'walk.js'):
        shutil.copyfile(HERE / 'assets' / name, OUT / name)
    for name in ('reader.css', 'reader.js'):      # the specification reader's files, unchanged
        if '--reader' in sys.argv or not (OUT / name).exists():
            shutil.copyfile(READER / name, OUT / name)
    wanted = {p.slug + '.html' for p in parts} | {'index.html', 'notes.html', 'listing.html'}
    for old in OUT.glob('*.html'):
        if old.name not in wanted:
            old.unlink()
    bad = sources.uncovered()
    total = sum(1 for l in sources.get(MAIN) if l.strip())
    print('%d parts, %d formulas; %d of %d lines of %s quoted in full' % (len(parts), len(formulas.want), total - len(bad), total, MAIN))
    if bad:
        print('  not quoted in full: lines ' + ' '.join(str(n) for n, _ in bad))
    words = sum(len(re.sub(r'<[^>]+>', ' ', p.body).split()) for p in parts)
    print('about %d words' % words)
    if bad and strict:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
