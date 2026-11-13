#!/usr/bin/env python3
"""Convert chapters of the Fortress specification (LaTeX) to the HTML reader.

Reads Specification/ (never Specification-1.0-frozen/), SpecData/examples and
SpecData/tables, and writes static pages to docs/specification/.  It changes
no file of the original tree.  README.md beside this script says how to run it
and what does not convert yet.

    python3 explorations/coordinator/tools/spec-html/spec2html.py            # the chapters of DEFAULT_CHAPTERS
    python3 explorations/coordinator/tools/spec-html/spec2html.py --list     # every chapter, with its slug
    python3 explorations/coordinator/tools/spec-html/spec2html.py --chapters intro,overview,programs
    python3 explorations/coordinator/tools/spec-html/spec2html.py --try types  # convert to the work folder only, print the gaps
"""
import argparse
import base64
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
SPEC = os.path.join(ROOT, 'Specification')
EXAMPLES = os.path.join(ROOT, 'SpecData', 'examples')
TABLES = os.path.join(ROOT, 'SpecData', 'tables')
FORTIFY_EL = os.path.join(ROOT, 'Fortify', 'fortify.el')
DEFAULT_OUT = os.path.join(ROOT, 'docs', 'specification')
DEFAULT_BASE = 'https://palimondo.github.io/fortress/specification/'
DEFAULT_CHAPTERS = []          # none named: every chapter and appendix
SPEC_TITLE = 'The Fortress Language Specification'
SAMPLE = {'preface', 'intro', 'overview', 'programs', 'lexical-structure', 'evaluation', 'types'}   # the first sample, 2026-11-10
LIBRARIES = [os.path.join(ROOT, 'Library'), os.path.join(ROOT, 'ProjectFortress', 'LibraryBuiltin')]
# The edition's layer over the authors' text. An address of the authors' text gets a link to the
# Internet Archive's copy nearest this date (a partial timestamp resolves to the nearest capture);
# 2008 is the year of the release that the preface names with the address.
ARCHIVE = 'https://web.archive.org/web/2008/'
# What the 2026 revival added to the text, apart from its \revision callouts: paragraphs by the
# chapter and their first words, sections by their label. They get the tint of the revival's additions.
REVIVAL_PARAGRAPHS = {'preface': ['In 2026 the Fortress revival revised this working draft']}
REVIVAL_SECTIONS = {'sec:revival-changes'}
LEGEND = ('<span class="rv">Text on a tinted ground, like this,</span> is the 2026 revival’s: a paragraph that it '
          'added, its note on a passage that it revised, its link to an archived copy of a page that is gone. '
          'All other text is the authors’.')


def archive_links(body):
    """Beside each address of the authors' text, the edition's link to its copy in the Internet Archive."""
    def link(m):
        url, tail = m.group(1), ''
        while url and url[-1] in '.,;:)':
            url, tail = url[:-1], url[-1] + tail
        if 'palimondo' in url:
            return m.group(0)
        return ('%s%s%s<a class="ed arch" href="%s%s" title="This edition’s link to a copy of the page in the '
                'Internet Archive">archived copy</a>' % (url, tail, m.group(2) or '', ARCHIVE, url))
    return re.sub(r'(?<=[>\s(])((?:https?://|citeseer\.)[^\s<>"]+)(</code>|</span>)?', link, body)

esc = html.escape

# ---------------------------------------------------------------- tables

GREEK = dict(alpha='α', beta='β', gamma='γ', delta='δ', epsilon='ε', varepsilon='ε', zeta='ζ',
             eta='η', theta='θ', vartheta='ϑ', iota='ι', kappa='κ', mu='μ', nu='ν',
             xi='ξ', pi='π', varpi='ϖ', rho='ρ', varrho='ϱ', sigma='σ', varsigma='ς', tau='τ',
             upsilon='υ', phi='φ', varphi='φ', chi='χ', psi='ψ', omega='ω', Gamma='Γ',
             Delta='Δ', Theta='Θ', Lambda='Λ', Xi='Ξ', Pi='Π', Sigma='Σ', Upsilon='Υ',
             Phi='Φ', Psi='Ψ', Omega='Ω')
GREEK['lambda'] = 'λ'

# name -> (character, atom class)
SYM = {}
def _sym(cls, **kw):
    for k, v in kw.items():
        SYM[k] = (v, cls)
for _k, _v in GREEK.items():
    SYM[_k] = (_v, 'ord')
_sym('ord', infty='∞', emptyset='∅', bot='⊥', top='⊤', forall='∀', exists='∃', neg='¬', lnot='¬',
     surd='√', ldots='…', cdots='⋯', dots='…', vdots='⋮', ddots='⋱', partial='∂', nabla='∇',
     ell='ℓ', hbar='ℏ', Re='ℜ', Im='ℑ', aleph='ℵ', prime='′', angle='∠', triangle='△',
     backslash='\\', Box='□', Diamond='◇', lozenge='◊', blacklozenge='⧫', star='⋆', sharp='♯',
     flat='♭', natural='♮', bigtriangleup='△', bigtriangledown='▽', bigcirc='◯', diamond='⋄',
     checkmark='✓', dag='†', ddag='‡', S='§', P='¶', pounds='£', hookleftarrow='↩',
     textbackslash='\\', lbrace='{', rbrace='}', vert='|', Vert='‖', nexists='∄', square='□')
_sym('bin', times='×', div='÷', cdot='·', cup='∪', cap='∩', wedge='∧', vee='∨', land='∧', lor='∨',
     oplus='⊕', ominus='⊖', otimes='⊗', oslash='⊘', odot='⊙', pm='±', mp='∓', setminus='∖',
     circ='∘', bullet='∙', ast='∗', sqcup='⊔', sqcap='⊓', uplus='⊎', amalg='⨿', wr='≀',
     triangleleft='◁', triangleright='▷', boxplus='⊞', boxtimes='⊠', dagger='†', ddagger='‡',
     veebar='⊻', barwedge='⊼', curlyvee='⋎', curlywedge='⋏', bigtriangleup='△')
_sym('rel', leq='≤', le='≤', geq='≥', ge='≥', neq='≠', ne='≠', equiv='≡', sim='∼', simeq='≃',
     approx='≈', cong='≅', propto='∝', subset='⊂', supset='⊃', subseteq='⊆', supseteq='⊇',
     sqsubseteq='⊑', sqsupseteq='⊒', sqsubset='⊏', sqsupset='⊐', ni='∋', notin='∉',
     prec='≺', succ='≻', preceq='⪯', succeq='⪰', ll='≪', gg='≫', perp='⊥', parallel='∥',
     mid='|', vdash='⊢', dashv='⊣', models='⊨', leftarrow='←', gets='←', rightarrow='→',
     to='→', leftrightarrow='↔', Leftarrow='⇐', Rightarrow='⇒', Leftrightarrow='⇔',
     mapsto='↦', longrightarrow='⟶', longleftarrow='⟵', Longrightarrow='⟹', uparrow='↑',
     downarrow='↓', hookrightarrow='↪', leadsto='⇝', rightsquigarrow='⇝', between='≬',
     trianglelefteq='⊴', trianglerighteq='⊵', doteq='≐', asymp='≍', bowtie='⋈',
     longmapsto='⟼', iff='⟺', implies='⟹', nearrow='↗', searrow='↘', twoheadrightarrow='↠', multimap='⊸',
     leqslant='⩽', geqslant='⩾', nsubseteq='⊈', subsetneq='⊊', lessdot='⋖', gtrdot='⋗',
     Vvert='⦀', sequiv='≣', colon=':')
SYM['in'] = ('∈', 'rel')
_sym('open', langle='⟨', lfloor='⌊', lceil='⌈', llbracket='⟦', lgroup='⟮',
     bigllbracket='⟦', Bigllbracket='⟦', leftllbracket='⟦', lhfloor='⌊⌊', lhceil='⌈⌈')
_sym('close', rangle='⟩', rfloor='⌋', rceil='⌉', rrbracket='⟧', rgroup='⟯',
     bigrrbracket='⟧', Bigrrbracket='⟧', rightrrbracket='⟧', rhfloor='⌋⌋', rhceil='⌉⌉')
_sym('op', sum='∑', prod='∏', coprod='∐', int='∫', oint='∮', bigcup='⋃', bigcap='⋂',
     bigvee='⋁', bigwedge='⋀', bigoplus='⨁', bigotimes='⨂', bigodot='⨀', bigsqcup='⨆',
     biguplus='⨄')
FUNCS = ('sin cos tan cot sec csc arcsin arccos arctan sinh cosh tanh coth log ln lg exp '
         'max min sup inf lim gcd det dim ker deg arg hom Pr limsup liminf').split()
NOT = {'∈': '∉', '⊂': '⊄', '⊆': '⊈', '≡': '≢', '=': '≠', '<': '≮', '>': '≯', '≤': '≰', '≥': '≱',
       '⊃': '⊅', '⊇': '⊉', '∼': '≁', '≃': '≄', '≈': '≉', '∋': '∌', '⊢': '⊬', '≺': '⊀', '≻': '⊁',
       '∃': '∄', '|': '∤', '∥': '∦', '⊑': '⋢', '←': '↚', '→': '↛'}
BB = dict(zip('ABCDEFGHIJKLMNOPQRSTUVWXYZ', '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'))
CAL = dict(zip('ABCDEFGHIJKLMNOPQRSTUVWXYZ', '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'))
ACCENT = {"'": '\u0301', '`': '\u0300', '^': '\u0302', '"': '\u0308', '~': '\u0303', 'c': '\u0327',
          'v': '\u030c', 'u': '\u0306', '=': '\u0304', '.': '\u0307', 'H': '\u030b', 'b': '\u0331',
          'd': '\u0323'}
MATH_ACCENT = dict(hat='\u0302', bar='\u0304', vec='\u20d7', dot='\u0307', tilde='\u0303',
                   widehat='\u0302', widetilde='\u0303', overline='\u0305', check='\u030c',
                   ddot='\u0308', underline='\u0332', overrightarrow='\u20d7')
TEXT_SYM = dict(ldots='…', dots='…', texttrademark='™', copyright='©', S='§', P='¶',
                textbackslash='\\', LaTeX='LaTeX', TeX='TeX', textregistered='®',
                textasciitilde='~', textasciicircum='^', textbar='|', textless='<',
                textgreater='>', dag='†', ddag='‡', pounds='£', ss='ß', o='ø', O='Ø', ae='æ',
                AE='Æ', aa='å', AA='Å', l='ł', L='Ł', i='ı', textquotedbl='"', quad='\u2003',
                qquad='\u2003\u2003', enspace='\u2002', thinspace='\u2009', textemdash='—',
                textendash='–', slash='/', textunderscore='_', lq='‘', rq='’', textbullet='•')
IGNORE = set('''noindent par newpage clearpage cleardoublepage medskip smallskip bigskip
 centering raggedright sloppy indent nopagebreak pagebreak hfill vfill hfil hss null
 protect relax displaystyle textstyle scriptstyle scriptscriptstyle limits nolimits
 normalsize small footnotesize scriptsize tiny large Large LARGE huge Huge
 selectfont boldmath unboldmath strut allowbreak break linebreak nolinebreak
 leavevmode ignorespaces unskip frenchspacing nonfrenchspacing hline cline
 pushtabs poptabs kill mainmatter frontmatter backmatter appendix bigl bigr Bigl Bigr
 biggl biggr Biggl Biggr bigm Bigm left right middle big Big bigg Bigg
 tableofcontents maketitle samepage flushbottom raggedbottom nobreak penalty
 normalfont upshape mdseries fussy lastskip strut'''.split())
ONE_ARG_IGNORE = set('''index vspace vskip pagestyle thispagestyle setlength addtolength
 setcounter addtocounter bibliographystyle bibliography markboth markright
 usepackage phantom hphantom vphantom rule pagenumbering'''.split())
SIZES = set('tiny scriptsize footnotesize small normalsize large Large LARGE huge Huge'.split())
# commands of a formula inside a sentence that have no rendering as HTML text: LaTeX sets the formula
HARD_INLINE = set('begin OverStrike UPTRI DOWNTRI binom genfrac overbrace underbrace stackrel'.split())
FONT_DECL = dict(tt='tt', ttfamily='tt', rm='rm', rmfamily='rm', it='it', itshape='it', em='it',
                 bf='bf', bfseries='bf', sf='sf', sffamily='sf', sc='sc', scshape='sc', sl='it',
                 slshape='it')
FONT_CMD = dict(emph='em', textit='i', textbf='b', textsc='span.sc', textsf='span.sf',
                textrm='span.rm', textsl='i', textup='span.rm', underline='u', textmd='span')
SEC_LEVEL = {'section': 2, 'subsection': 3, 'subsubsection': 4, 'paragraph': 5,
             'librarysection': 2, 'librarysubsection': 3, 'Trait': 2, 'Object': 2,
             'Method': 3, 'Function': 3, 'Variable': 3}

# ---------------------------------------------------------------- reading the source

def read(path):
    with open(path, encoding='utf-8', errors='replace') as f:
        return f.read()


def resolve_input(arg):
    """\\input{\\home/basic/programs} -> absolute path, or None for the macro files."""
    arg = arg.strip()
    if arg.startswith('\\macros'):
        return None
    arg = arg.replace('\\calculi/', SPEC + '/appendices/calculi/')
    arg = arg.replace('\\home/', SPEC + '/')
    if not os.path.isabs(arg):
        arg = os.path.join(SPEC, 'fortress', arg)
    if not arg.endswith('.tex') and not os.path.isfile(arg):
        arg += '.tex'
    return os.path.normpath(arg)


class Source:
    """One .tex file, with comments removed and verbatim text set aside."""

    def __init__(self):
        self.verb = []       # verbatim texts
        self.fsrc = []       # ASCII sources found in comments before \begin{Fortress}

    def prepare(self, text):
        def keep_block(m):
            self.verb.append(m.group(1))
            return '\\VERBBLOCK{%d}' % (len(self.verb) - 1)
        text = re.sub(r'\\begin\{verbatim\}\n?(.*?)\\end\{verbatim\}', keep_block, text, flags=re.S)

        def keep_inline(m):
            self.verb.append(m.group(2))
            return '\\VERBINLINE{%d}' % (len(self.verb) - 1)
        out, pending = [], []
        for line in text.split('\n'):
            s = line.lstrip()
            if s.startswith('%'):
                pending.append(s[1:])
                continue
            if s.startswith('\\begin{Fortress}') and pending:
                src = self.ascii_source(pending)
                if src:
                    self.fsrc.append(src)
                    out.append('\\FSSRC{%d}' % (len(self.fsrc) - 1))
            if s or not pending:
                pending = []
            line = re.sub(r'\\verb(\W)(.*?)\1', keep_inline, line)
            m = re.search(r'(?<!\\)((?:\\\\)*)%', line)
            if m:
                out.append(line[:m.start() + len(m.group(1))] + '\x00')
            else:
                out.append(line)
        text = '\n'.join(out)
        return re.sub(r'\x00\n[ \t]*', '', text).replace('\x00', '')

    @staticmethod
    def ascii_source(lines):
        """The run of comment lines directly before \\begin{Fortress}, if it reads as code."""
        run = []
        for l in reversed(lines):
            if l.startswith('%') or re.search(r'\\(begin|end|input|note|section|item)\b', l):
                break
            run.append(l.rstrip())
        run.reverse()
        while run and not run[0].strip():
            run.pop(0)
        while run and not run[-1].strip():
            run.pop()
        if not run:
            return None
        ind = min(len(l) - len(l.lstrip()) for l in run if l.strip())
        return '\n'.join(l[ind:] for l in run)


TOKEN_RE = re.compile(r'\\([a-zA-Z@]+)[ \t]*\n?[ \t]*|\\(.|\n)|(\n[ \t]*\n\s*)|([ \t\n]+)|([{}$&~^_#])|(.)', re.S)


def tokenize(text):
    toks = []
    for m in TOKEN_RE.finditer(text):
        if m.group(1) is not None:
            toks.append(('cs', m.group(1)))
        elif m.group(2) is not None:
            toks.append(('cs', m.group(2)))
        elif m.group(3) is not None:
            toks.append(('par', ''))
        elif m.group(4) is not None:
            toks.append(('sp', ' '))
        elif m.group(5) is not None:
            toks.append((m.group(5), m.group(5)))
        else:
            toks.append(('c', m.group(6)))
    return toks


def toks_text(toks):
    """Plain characters of a token list (for labels, file names, numbers)."""
    return ''.join(v if k in ('c', 'sp') or k in '{}$&~^_#' and k not in '{}' else
                   ('\\' + v if k == 'cs' else '') for k, v in toks)


def balanced(text, i):
    """text[i] is '{'; returns (content, index after the closing brace)."""
    depth, j = 0, i
    while j < len(text):
        c = text[j]
        if c == '\\':
            j += 2
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return text[i + 1:j], j + 1
        j += 1
    return text[i + 1:], len(text)


def toks_tex(toks, src=None):
    """Tokens back to LaTeX source, for a display that LaTeX itself sets."""
    out = []
    for k, v in toks:
        if k == 'cs':
            if v == '\n':
                out.append('\\ ')
            elif v[:1].isalpha() or v[:1] == '@':
                out.append('\\' + v + ' ')
            else:
                out.append('\\' + v)
        elif k == 'par':
            out.append('\n\n')
        else:
            out.append(v)
    text = ''.join(out)
    if src is not None:
        def verb(m):
            body = src.verb[int(m.group(2))]
            if m.group(1) == 'VERBBLOCK':
                return '\\begin{verbatim}\n%s\\end{verbatim}' % body
            for d in '|!+/@=:;"':
                if d not in body:
                    return '\\verb%s%s%s' % (d, body, d)
            return '\\verb\x7f%s\x7f' % body
        text = re.sub(r'\\(VERBBLOCK|VERBINLINE) \{(\d+)\}', verb, text)
        text = re.sub(r'\\FSSRC \{\d+\}', '', text)
    return text


# ---------------------------------------------------------------- displays, set by LaTeX and converted to SVG

PAD = 0.6                  # points of margin around a display
HSIZE = '6.5in'            # the text width of the PDF (the package fullpage on letter paper)
DVISVGM = ['dvisvgm', '--bbox=min', '--precision=2', '--linkmark=none', '--page=1-']
DISPLAY_MACROS = r"""
\newbox\dispbox
\def\DB{\setbox\dispbox\vbox\bgroup\hsize=%s\linewidth\hsize\columnwidth\hsize\parindent0pt\relax}
\def\DS{\ifpdf\pdfpagewidth=\dimexpr\wd\dispbox+12in\relax\pdfpageheight=\dimexpr\ht\dispbox+\dp\dispbox+2in\relax\fi\shipout\box\dispbox}
\def\DE{\par\egroup\DS}
\def\IB{\setbox\dispbox\hbox\bgroup\ifpdf\else\special{dvisvgm:raw <desc>base={?y}</desc>}\fi}
\def\IE{\egroup\DS}
\def\DM#1{\immediate\write16{@@DISPLAY #1}}
""" % HSIZE


def latex_preamble():
    """The preamble of Specification/fortress/fortress.tex, with absolute paths."""
    pre = read(os.path.join(SPEC, 'fortress', 'fortress.tex'))
    pre = pre[:pre.index('\\title{')]
    pre = pre.replace('\\def\\home{..}', '\\def\\home{%s}' % SPEC)
    pre = pre.replace('\\def\\macros{../latex-common/macros}', '\\def\\macros{%s/latex-common/macros}' % SPEC)
    # the same file sets the displays again under pdflatex, for compare.js
    return '\\ifnum\\pdfoutput=0 \\PassOptionsToPackage{hypertex}{hyperref}\\fi\n' + pre + DISPLAY_MACROS


def aux_text(st):
    """The cross-references and citations that a display may print, as LaTeX's .aux file gives them."""
    rows = ['\\relax']
    for key, rec in st.labels.items():
        if re.search(r'[#%{}\\~^$&]', key):
            continue
        ch = rec.get('chapter')
        where = ''
        if ch and ch.get('slug'):
            where = ch['slug'] + '.html' + ('' if rec.get('top') else '@@' + rec['anchor'])
        rows.append('\\newlabel{%s}{{%s}{}{}{%s}{}}' % (key, rec.get('num') or '', where))
    for key in st.bibkeys:
        rows.append('\\bibcite{%s}{%s}' % (key, key))
    return '\n'.join(rows) + '\n'


def run_latex(tex, aux, folder, n):
    """Set n displays, one page each, and convert the pages to SVG. Returns ({number: svg}, log)."""
    os.makedirs(folder, exist_ok=True)
    for f in os.listdir(folder):
        if f.endswith('.svg') or f.endswith('.dvi') or f.endswith('.log'):
            os.remove(os.path.join(folder, f))
    with open(os.path.join(folder, 'd.tex'), 'w', encoding='utf-8') as f:
        f.write(tex)
    for name in ('d.aux', 'd.aux.in'):          # latex rewrites d.aux; compare.js gives pdflatex the copy
        with open(os.path.join(folder, name), 'w', encoding='utf-8') as f:
            f.write(aux)
    env = dict(os.environ, TEXINPUTS='.:%s:' % os.path.join(ROOT, 'Fortify'), max_print_line='10000')
    try:
        subprocess.run(['latex', '-interaction=nonstopmode', 'd.tex'], cwd=folder, env=env,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=900)
    except subprocess.TimeoutExpired:
        pass
    log = read(os.path.join(folder, 'd.log')) if os.path.exists(os.path.join(folder, 'd.log')) else ''
    if not os.path.exists(os.path.join(folder, 'd.dvi')):
        return {}, log
    try:
        subprocess.run(DVISVGM + ['--font-format=svg', '-o', 'p%p.svg', 'd.dvi'], cwd=folder,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=900)
    except subprocess.TimeoutExpired:
        pass
    pages = {}
    for i in range(1, n + 1):
        for name in ('p%d.svg' % i, 'p%0*d.svg' % (len(str(n)), i)):
            p = os.path.join(folder, name)
            if os.path.exists(p):
                pages[i] = read(p)
                break
    return pages, log


def set_displays(slug, items, st, work):
    """items: [(definitions before it, tex, inline)]. Returns [(svg or None, error or None)], in order."""
    if not items:
        return []
    folder = os.path.join(work, 'disp', slug)
    pre, aux = latex_preamble(), aux_text(st)

    def document(sel):
        parts = [pre, '\\begin{document}\n']
        for n, i in enumerate(sel):
            defs, tex, inline = items[i]
            parts.append('%s\n\\DM{%d}%%\n%s\n' % (defs, n + 1, '\\IB %s\\IE' % tex if inline else '\\DB %s\\DE' % tex))
        parts.append('\\DM{0}\\end{document}\n')
        return ''.join(parts)

    def errors(log):
        errs = {}
        chunks = re.split(r'@@DISPLAY (\d+)\n', log)
        for j in range(1, len(chunks) - 1, 2):
            m = re.search(r'^! (.*(?:\n.*){0,2})', chunks[j + 1], flags=re.M)
            if m and int(chunks[j]):
                errs[int(chunks[j])] = re.sub(r'\s+', ' ', m.group(1))[:160]
        return errs

    everything = list(range(len(items)))
    tex = document(everything)
    key = hashlib.sha1((tex + aux + ' '.join(DVISVGM)).encode('utf-8')).hexdigest()
    stamp = os.path.join(folder, 'stamp')
    cache = os.path.join(folder, 'result.json')
    if os.path.exists(stamp) and read(stamp) == key and os.path.exists(cache):
        return [tuple(r) for r in json.loads(read(cache))]
    pages, log = run_latex(tex, aux, folder, len(items))
    errs = errors(log)
    result = [None] * len(items)
    if len(pages) == len(items) and '@@DISPLAY 0' in log:
        for i in everything:
            result[i] = (pages[i + 1], errs.get(i + 1))
    else:
        # one display stopped LaTeX or shipped no page: set each alone, to find it
        for i in everything:
            pages, log = run_latex(document([i]), aux, os.path.join(folder, 'one'), 1)
            e = errors(log).get(1)
            if 1 not in pages:
                e = e or 'LaTeX set no page for this display'
            result[i] = (pages.get(1), e)
    with open(cache, 'w', encoding='utf-8') as f:
        f.write(json.dumps(result))
    with open(stamp, 'w') as f:
        f.write(key)
    return result


class SvgPage:
    """The SVGs of one HTML page: their font classes, and the fonts and characters they use."""

    def __init__(self):
        self.classes = {}        # (family, size) -> class name
        self.used = {}           # family -> set of characters

    def style(self):
        return ''.join('svg.tx text.%s{font-family:%s;font-size:%spx}\n' % (c, fam, size)
                       for (fam, size), c in self.classes.items())

    def inline(self, svg, inline=False, number=0):
        m = re.search(r"<svg[^>]*width='([\d.]+)pt' height='([\d.]+)pt' viewBox='([^']+)'", svg)
        g = re.search(r"<g id='page\d+'>(.*)</g>\s*</svg>", svg, flags=re.S)
        if not m or not g:
            return None
        # dvisvgm's box leaves a rule at the left or the top edge (the frame of a table) half outside: a margin
        x, y, w, h = [float(v) for v in m.group(3).split()]
        x, y, w, h = x - PAD, y - PAD, w + 2 * PAD, h + 2 * PAD
        box = '%.2f %.2f %.2f %.2f' % (x, y, w, h)
        fonts = dict((c, (fam, size)) for c, fam, size in
                     re.findall(r'text\.(f\d+) \{font-family:([^;]+);font-size:([\d.]+)px\}', svg))
        body = g.group(1)

        def cls(mm):
            key = fonts.get(mm.group(1))
            if not key:
                return mm.group(0)
            return "class='%s'" % self.classes.setdefault(key, 't%d' % len(self.classes))
        for c, text in re.findall(r"<text class='(f\d+)'[^>]*>(.*?)</text>", body, flags=re.S):
            if c in fonts:
                self.used.setdefault(fonts[c][0], set()).update(html.unescape(re.sub(r'<[^>]+>', '', text)))
        body = re.sub(r"class='(f\d+)'", cls, body)
        body = re.sub(r"xlink:href='#?([^']*)'", lambda mm: "href='%s'" % mm.group(1).replace('@@', '#'), body)
        # the lines of a drawing are black in dvisvgm's output: they take the colour of the text too
        body = re.sub(r"\b(stroke|fill)='#000(?:000)?'", r"\1='currentColor'", body)
        style = ''
        d = re.search(r'<desc>base=(-?[\d.]+)</desc>', body)
        if d:
            body = body.replace(d.group(0), '')
        if inline:
            x, y, _, hh = [float(v) for v in box.split()]
            depth = (y + hh - float(d.group(1))) if d else 0.0
            style = ' style="vertical-align:%.3fem"' % (-depth / 10)
        svg = ('<svg class="tx%s" data-d="%d" viewBox="%s" width="%.3fem" height="%.3fem" fill="currentColor"%s>%s</svg>'
               % (' il' if inline else '', number, box, w / 10, h / 10, style, body.strip()))
        if inline and w > 120:
            return '<span class="mw">%s</span>' % svg       # a long formula inside a sentence scrolls in its own frame
        return svg


FONT_CHUNK = 32


def build_fonts(families, work, out):
    """Font files for each TeX font that the SVGs name, with every character of the font.
    dvisvgm 3.2.1 loses a run of characters when it writes a whole font at once (pcrr8r came out
    without U+002E to U+005F), so each font is written in pieces of FONT_CHUNK characters, and
    each piece is a face of the same family with its own unicode-range. The pieces are written a
    second time as TrueType, which fontTools reads, to learn which characters each really holds."""
    from fontTools.ttLib import TTFont
    import io
    folder = os.path.join(work, 'fonts')
    os.makedirs(folder, exist_ok=True)
    fams = sorted(families)
    stamp = os.path.join(folder, 'stamp')
    key = ' '.join(fams) + ' chunk %d' % FONT_CHUNK
    if not (os.path.exists(stamp) and read(stamp) == key):
        tex = ['\\documentclass{article}\n\\begin{document}\n\\newbox\\dispbox\n'
               '\\def\\c#1{\\iffontchar\\f#1 \\char#1\\ \\fi}\n'
               '\\def\\sheet#1{\\font\\f=#1 at 10pt %s}\n' % ''.join(
                   '\\setbox\\dispbox\\hbox{\\f %s}\\ifdim\\wd\\dispbox>0pt \\shipout\\box\\dispbox\\fi\n'
                   % ''.join('\\c{%d}' % c for c in range(k, k + FONT_CHUNK)) for k in range(0, 256, FONT_CHUNK))]
        tex += ['\\sheet{%s}\n' % f for f in fams]
        tex.append('\\end{document}\n')
        for f in os.listdir(folder):
            os.remove(os.path.join(folder, f))
        with open(os.path.join(folder, 's.tex'), 'w') as f:
            f.write(''.join(tex))
        subprocess.run(['latex', '-interaction=nonstopmode', 's.tex'], cwd=folder,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=600)
        for fmt, pat in (('woff2', 's%p.svg'), ('ttf', 't%p.svg')):
            subprocess.run(DVISVGM + ['--font-format=' + fmt, '-o', pat, 's.dvi'], cwd=folder,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=900)
        with open(stamp, 'w') as f:
            f.write(key)
    pieces = {}          # family -> [(woff2 bytes, set of code points)]
    for name in sorted(os.listdir(folder)):
        if not re.fullmatch(r's\d+\.svg', name):
            continue
        svg, ttf = read(os.path.join(folder, name)), read(os.path.join(folder, 't' + name[1:]))
        m = re.search(r'@font-face\{font-family:([^;]+);src:url\(data:application/x-font-woff2;base64,([A-Za-z0-9+/=]+)\)', svg)
        t = re.search(r'@font-face\{font-family:([^;]+);src:url\(data:application/x-font-ttf;base64,([A-Za-z0-9+/=]+)\)', ttf)
        if not m or not t:
            continue
        cmap = TTFont(io.BytesIO(base64.b64decode(t.group(2)))).getBestCmap()
        pieces.setdefault(m.group(1), []).append((base64.b64decode(m.group(2)), set(cmap)))
    fdir = os.path.join(out, 'fonts')
    if os.path.isdir(fdir):
        shutil.rmtree(fdir)
    os.makedirs(fdir)
    css = ['/* The fonts of the displays that LaTeX sets, made by dvisvgm from the TeX fonts; each font comes\n'
           '   in pieces, and a browser fetches only the pieces whose characters a page shows. */\n']
    have = {}
    for fam in fams:
        for i, (data, cps) in enumerate(pieces.get(fam, [])):
            want = families[fam]
            have.setdefault(fam, set()).update(chr(c) for c in cps)
            if not any(ord(ch) in cps for ch in want):
                continue             # no page shows a character of this piece
            fname = '%s-%d.woff2' % (fam, i)
            with open(os.path.join(fdir, fname), 'wb') as f:
                f.write(data)
            rng, run = [], None
            for c in sorted(cps):
                if run and c == run[1] + 1:
                    run[1] = c
                else:
                    run = [c, c]
                    rng.append(run)
            css.append('@font-face{font-family:%s;src:url(fonts/%s) format("woff2");font-display:block;unicode-range:%s}\n'
                       % (fam, fname, ','.join('U+%X' % a if a == b else 'U+%X-%X' % (a, b) for a, b in rng)))
    with open(os.path.join(out, 'tex-fonts.css'), 'w') as f:
        f.write(''.join(css))
    return have


# ---------------------------------------------------------------- the macros of the tree

MACRO_DIR = os.path.join(SPEC, 'latex-common', 'macros')


def load_macros(macros=None, names=('macros.tex', 'spec-macros.tex', 'calculus-macros.tex')):
    """\\newcommand definitions of latex-common/macros, as name -> (nargs, default, body tokens).
    The three files that all-macros.tex reads come first; a chapter that reads another file
    (the calculi of Appendix A) adds it then, and its definitions replace the earlier ones, as in LaTeX."""
    macros = {} if macros is None else macros
    for name in names:
        text = Source().prepare(read(os.path.join(MACRO_DIR, name)))
        for m in re.finditer(r'\\(?:re)?newcommand\*?\s*\{?\\([a-zA-Z]+)\}?\s*(?:\[(\d)\])?\s*(?:\[([^\]]*)\])?\s*\{', text):
            body, _ = balanced(text, m.end() - 1)
            if '@' in body or '\\setbox' in body or '\\vbox' in body:
                continue
            macros[m.group(1)] = (int(m.group(2) or 0), m.group(3), tokenize(body))
        for m in re.finditer(r'\\def\\([a-zA-Z]+)\{', text):
            body, _ = balanced(text, m.end() - 1)
            if '@' in body or '\\list' in body:
                continue
            macros[m.group(1)] = (0, None, tokenize(body))
    return macros


# ---------------------------------------------------------------- the structure of the whole text

def slugify(s):
    s = re.sub(r'\\[a-zA-Z]+', ' ', s)
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    return s or 'x'


def anchor_of(key):
    return re.sub(r'[^a-zA-Z0-9_.-]+', '-', key).strip('-')


def roman(n):
    out = ''
    for v, s in ((10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')):
        while n >= v:
            out += s
            n -= v
    return out


STRUCT_RE = re.compile(
    r'\\(input|begin|part|chapter|section|subsection|subsubsection|appendix|Trait|Object|Method|Function'
    r'|Variable|librarysection|librarysubsection|partlabel|chaplabel|applabel|seclabel|figlabel'
    r'|label|caption)(?![a-zA-Z])(\*?)\s*(?:\[[^\]]*\])?\s*(\{)?')
PREFIX = dict(partlabel='part:', chaplabel='chap:', applabel='app:', seclabel='sec:',
              figlabel='fig:', label='')


class Structure:
    """Parts, chapters, section numbers and labels of the whole specification."""

    def __init__(self):
        self.parts = []          # {num, title, chapters:[...]}
        self.chapters = []       # {slug, num, title, file, start, kind, part, sections, labels}
        self.labels = {}         # key -> {chapter, num, kind, title, anchor}
        self.missing = []
        self.c = dict(part=0, chap=0, sec=0, sub=0, fig=0)
        self.appendix = False
        self.cur = None          # what a \label names now
        self.chap = None
        pre = dict(slug='preface', num='', title='About this working draft', kind='front',
                   file=os.path.join(SPEC, 'fortress', 'preamble.tex'), start=0, part=None,
                   sections=[], labels=[])
        self.chapters.append(pre)
        self.walk(os.path.join(SPEC, 'fortress', 'fortress.tex'))
        self.bibkeys = re.findall(r'@\w+\s*\{\s*([^,\s]+)\s*,', read(os.path.join(SPEC, 'fortress', 'fortress.bib')))
        seen = {}
        for ch in self.chapters:
            n = seen.get(ch['slug'], 0)
            seen[ch['slug']] = n + 1
            if n:
                ch['slug'] = ('appendix-' if ch['kind'] == 'appendix' else 'chapter-%s-' % ch['num']) + ch['slug']

    def walk(self, path):
        if not os.path.exists(path):
            self.missing.append(os.path.relpath(path, ROOT))
            return
        text = Source().prepare(read(path))
        if path.endswith('fortress.tex'):
            text = text[text.index('\\begin{document}'):]
        pos = 0
        while True:
            m = STRUCT_RE.search(text, pos)
            if not m:
                break
            cmd, star = m.group(1), m.group(2)
            if cmd == 'appendix':
                self.appendix = True
                self.c['chap'] = 0
                pos = m.end()
                continue
            if not m.group(3):
                pos = m.end()
                continue
            arg, pos = balanced(text, m.end() - 1)
            if cmd == 'begin':
                # \newtheorem{theorem}{Theorem} and {lemma}{Lemma}: each numbered through the whole text
                if arg in ('lemma', 'theorem'):
                    self.c[arg] = self.c.get(arg, 0) + 1
                    self.cur = dict(kind=arg, num=str(self.c[arg]), title='', chapter=self.chap)
            elif cmd == 'input':
                p = resolve_input(arg)
                if p and '/examples/' not in p and p != os.path.join(SPEC, 'fortress', 'preamble.tex'):
                    self.walk(p)
            elif cmd == 'part':
                self.c['part'] += 1
                self.parts.append(dict(num=roman(self.c['part']), title=arg, chapters=[]))
                self.cur = dict(kind='part', num=roman(self.c['part']), title=arg, chapter=None)
            elif cmd == 'chapter':
                self.c['chap'] += 1
                self.c['sec'] = self.c['sub'] = self.c['fig'] = 0
                num = chr(64 + self.c['chap']) if self.appendix else str(self.c['chap'])
                ch = dict(slug=None, num=num, title=arg, file=path, start=m.start(),
                          kind='appendix' if self.appendix else 'chapter',
                          part=self.parts[-1] if self.parts else None, sections=[], labels=[])
                self.chapters.append(ch)
                if self.parts:
                    self.parts[-1]['chapters'].append(ch)
                self.chap = ch
                ch['slug'] = slugify(arg)
                self.cur = dict(kind='appendix' if self.appendix else 'chapter', num=num,
                                title=arg, chapter=ch, top=True)
            elif cmd in SEC_LEVEL:
                if re.search(r'\\(renewcommand|RenewDocumentCommand)\s*\{?\\%s(?![a-zA-Z])' % cmd, text[:m.end()]):
                    continue
                level = SEC_LEVEL[cmd]
                if cmd == 'Trait':
                    arg = 'The Trait ' + arg
                if cmd == 'Object':
                    arg = 'The Object ' + arg
                if star or level > 3 or not self.chap:
                    self.cur = dict(kind='section', num='', title=arg, chapter=self.chap)
                    continue
                if level == 2:
                    self.c['sec'] += 1
                    self.c['sub'] = 0
                    num = '%s.%d' % (self.chap['num'], self.c['sec'])
                else:
                    self.c['sub'] += 1
                    num = '%s.%d.%d' % (self.chap['num'], self.c['sec'], self.c['sub'])
                rec = dict(kind='section', num=num, title=arg, chapter=self.chap, level=level)
                self.chap['sections'].append(rec)
                self.cur = rec
            elif cmd == 'caption':
                if self.chap:
                    self.c['fig'] += 1
                    self.cur = dict(kind='figure', num='%s.%d' % (self.chap['num'], self.c['fig']),
                                    title=arg, chapter=self.chap)
                    for lm in re.finditer(r'\\(figlabel|label)\{([^}]*)\}', arg):
                        key = PREFIX[lm.group(1)] + lm.group(2).strip()
                        self.labels.setdefault(key, dict(self.cur, anchor=anchor_of(key)))
            else:
                key = PREFIX[cmd] + arg.strip()
                cur = self.cur or dict(kind='section', num='', title='', chapter=None)
                rec = dict(cur, anchor=anchor_of(key))
                self.labels.setdefault(key, rec)
                if cur.get('top') and cur.get('chapter') and cmd in ('chaplabel', 'applabel'):
                    ch = cur['chapter']
                    if not ch['labels']:
                        ch['slug'] = slugify(arg)
                    ch['labels'].append(key)

    def chapter_text(self, ch):
        """The prepared source of one chapter: from its \\chapter to the next in the same file."""
        src = Source()
        text = src.prepare(read(ch['file']))
        if ch['kind'] == 'front':
            return src, text
        m = re.compile(r'\\(chapter|part)(?![a-zA-Z])').search(text, ch['start'] + 5)
        return src, text[ch['start']:m.start() if m else len(text)]


# ---------------------------------------------------------------- output of blocks

class Out:
    def __init__(self, conv, inline=False):
        self.conv, self.inline = conv, inline
        self.blocks, self.buf, self.anchors = [], [], ''

    def text(self, h):
        self.buf.append(h)

    def par(self):
        if self.inline:
            if self.buf and self.buf[-1] != ' ':
                self.buf.append(' ')
            return
        h = re.sub(r'(\s*<br>)+$', '', ''.join(self.buf).strip())
        self.buf = []
        if not h:
            return
        if re.fullmatch(r'(<a id="[^"]*"></a>\s*)+', h):
            self.anchors += h
            return
        h, self.anchors = self.anchors + h, ''
        self.blocks.append('<p id="%s" class="nb">%s</p>' % (self.conv.block_id(h), h))

    def block(self, h):
        if self.inline:
            self.buf.append(h)
            return
        self.par()
        self.blocks.append(self.anchors + h)
        self.anchors = ''

    def html(self):
        self.par()
        if self.inline:
            return re.sub(r'\s+', ' ', ''.join(self.buf)).strip()
        return '\n'.join(self.blocks) + self.anchors


# ---------------------------------------------------------------- the converter

class Converter:
    def __init__(self, structure, macros, converted, work, base):
        self.st, self.macros, self.base_macros, self.converted = structure, dict(macros), macros, converted
        self.disp, self.defs, self.local, self.display_notes = [], [], set(), []
        self.work, self.base = work, base
        self.stack = []          # token stack (reversed), the current input
        self.out = None
        self.unknown = {}
        self.warnings = []
        self.examples_needed = set()
        self.ids = {}
        self.src = None
        self.chapter = None

    # ----- token input
    def next(self):
        return self.stack.pop() if self.stack else None

    def peek(self):
        return self.stack[-1] if self.stack else None

    def push(self, toks):
        self.stack.extend(reversed(toks))

    def skip_space(self, par=False):
        while self.stack and (self.stack[-1][0] == 'sp' or par and self.stack[-1][0] == 'par'):
            self.stack.pop()

    def read_arg(self):
        self.skip_space()
        t = self.next()
        if t is None:
            return []
        if t[0] != '{':
            return [t]
        depth, out = 1, []
        while self.stack:
            t = self.stack.pop()
            if t[0] == '{':
                depth += 1
            elif t[0] == '}':
                depth -= 1
                if depth == 0:
                    break
            out.append(t)
        return out

    def read_opt(self):
        self.skip_space()
        if self.peek() != ('c', '['):
            return None
        self.next()
        depth, out = 0, []
        while self.stack:
            t = self.stack.pop()
            if t[0] == '{':
                depth += 1
            elif t[0] == '}':
                depth -= 1
            elif t == ('c', ']') and depth == 0:
                break
            out.append(t)
        return out

    def read_until(self, stop):
        """Tokens up to the control sequence `stop` (consumed)."""
        out = []
        while self.stack:
            t = self.stack.pop()
            if t == ('cs', stop):
                break
            out.append(t)
        return out

    def read_env(self, name):
        depth, out = 1, []
        while self.stack:
            t = self.stack.pop()
            if t[0] == 'cs' and t[1] in ('begin', 'end'):
                arg = self.read_arg()
                if toks_text(arg) == name:
                    depth += 1 if t[1] == 'begin' else -1
                    if depth == 0:
                        break
                out.append(t)
                out.append(('{', '{'))
                out.extend(arg)
                out.append(('}', '}'))
                continue
            out.append(t)
        return out

    def skip_dimen(self):
        """A TeX glue after \\mskip or \\hskip: 4mu plus 4mu minus 1mu."""
        text = ''
        while self.stack and self.stack[-1][0] in ('c', 'sp'):
            text += self.stack[-1][1]
            if not re.fullmatch(r'\s*-?[\d.]*\s*(m|mu|e|em|ex|p|pt|c|cm|i|in)?\s*((p|pl|plu|plus|m|mi|min|minu|minus)\s*-?[\d.]*\s*(m|mu|e|em|ex|p|pt|f|fi|fil)?\s*)*', text):
                break
            self.stack.pop()

    # ----- helpers
    def warn(self, msg):
        self.warnings.append('%s: %s' % (self.chapter['slug'] if self.chapter else '-', msg))

    def display(self, tex, inline=False):
        """A formula, an example or a table that LaTeX sets: a placeholder now, its SVG after the chapter."""
        size = '\\%s ' % self.size if self.size and not inline else ''
        self.disp.append(('\n'.join(self.defs), size + tex, inline))
        self.defs = []
        marks = ''.join('<a id="fnref-%d"></a>' % n for n in self.display_notes)
        self.display_notes = []
        return marks + '<!--D%d-->' % (len(self.disp) - 1)

    def tex(self, toks):
        """The LaTeX of a display. A footnote inside it would be lost in LaTeX's box: it joins the
        chapter's footnotes here, and the display shows its number."""
        if ('cs', 'footnote') in toks:
            out, saved = [], self.stack
            self.stack = list(reversed(toks))
            try:
                while self.stack:
                    t = self.stack.pop()
                    if t == ('cs', 'footnote'):
                        body = self.inline(self.read_arg())
                        self.footnotes.append(body)
                        self.display_notes.append(len(self.footnotes))
                        out.extend(tokenize('\\textsuperscript{%d}' % len(self.footnotes)))
                    else:
                        out.append(t)
            finally:
                self.stack = saved
            toks = out
        return toks_tex(toks, self.src)

    def inline_math(self, toks):
        """A formula inside a sentence: HTML text, or an SVG where the text form has no rendering."""
        before = dict(self.unknown)
        if not any(t[0] == 'cs' and t[1] in HARD_INLINE for t in toks):
            h = self.math(toks)
            if self.unknown == before:
                return '<span class="m">%s</span>' % h
        self.unknown = before
        return self.display('\\(%s\\)' % self.tex(toks), inline=True)

    def block_id(self, h, prefix='p'):
        h = re.sub(r'<a class="ed[^"]*"[^>]*>.*?</a>', '', h)
        # the first sample marked a reference into a chapter outside it; the ids still count those words,
        # so that a note written on the sample stays on its paragraph
        h = h.replace('<!--nc-->', ' [not converted yet]')
        text = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', h))).strip()
        key = prefix + '-' + hashlib.sha1(text.encode('utf-8')).hexdigest()[:8]
        n = self.ids.get(key, 0) + 1
        self.ids[key] = n
        return key if n == 1 else '%s-%d' % (key, n)

    def inline(self, toks, math=False):
        if math:
            return self.math(toks)
        return self.run(toks, Out(self, inline=True))

    def blocks(self, toks):
        return self.run(toks, Out(self))

    def run(self, toks, out):
        saved = (self.stack, self.out)
        self.stack, self.out = list(reversed(toks)), out
        try:
            self.text_loop()
            return out.html()
        finally:
            self.stack, self.out = saved

    def expand(self, name):
        """A macro of the tree: put its body, with the arguments, back on the input."""
        nargs, default, body = self.macros[name][:3]
        args = []
        if len(self.macros[name]) > 3:           # an xparse star argument
            self.skip_space()
            if self.peek() == ('c', '*'):
                self.next()
            args.append([])
        if default is not None:
            opt = self.read_opt()
            args.append(opt if opt is not None else tokenize(default))
        while len(args) < nargs:
            args.append(self.read_arg())
        out, i = [], 0
        while i < len(body):
            t = body[i]
            if t[0] == '#' and i + 1 < len(body) and body[i + 1][1].isdigit():
                out.extend(args[int(body[i + 1][1]) - 1])
                i += 2
                continue
            out.append(t)
            i += 1
        self.push(out)

    # ----- text mode
    def text_loop(self):
        out = self.out
        closers = [[]]
        tt = 0
        while self.stack:
            k, v = self.stack.pop()
            if k == 'c':
                if v == '`' and self.peek() == ('c', '`') and not self.in_tt:
                    self.next()
                    v = '“'
                elif v == "'" and self.peek() == ('c', "'") and not self.in_tt:
                    self.next()
                    v = '”'
                elif v == '-' and self.peek() == ('c', '-') and not self.in_tt:
                    self.next()
                    v = '–'
                    if self.peek() == ('c', '-'):
                        self.next()
                        v = '—'
                elif v == '`' and not self.in_tt:
                    v = '‘'
                elif v == "'" and not self.in_tt:
                    v = '’'
                out.text(esc(v, quote=False))
            elif k == 'sp':
                out.text(' ')
            elif k == 'par':
                out.par()
            elif k == '{':
                closers.append([])
            elif k == '}':
                if len(closers) > 1:
                    for c in reversed(closers.pop()):
                        if c == 'tt':
                            self.in_tt -= 1
                        elif isinstance(c, tuple):
                            self.size = c[1]
                        else:
                            out.text(c)
            elif k == '~':
                out.text('\u00a0')
            elif k == '$':
                if self.peek() == ('$', '$'):
                    self.next()
                    body = self.read_math_until_dollar(double=True)
                    out.block('<div class="dm nb" id="%s">%s</div>'
                              % (self.block_id(toks_text(body), 'm'), self.display('\\[%s\\]' % self.tex(body))))
                else:
                    out.text(self.inline_math(self.read_math_until_dollar()))
            elif k in '&^_#':
                out.text(esc(v))
            elif k == 'cs':
                if v in SIZES:
                    closers[-1].append(('size', self.size))
                    self.size = v
                    continue
                if v in FONT_DECL:
                    cls = FONT_DECL[v]
                    if cls == 'tt' and self.quoted_group():
                        out.text('‘')
                        closers[-1].append('’')
                    out.text('<span class="%s">' % cls)
                    closers[-1].append('</span>')
                    if cls == 'tt':
                        self.in_tt += 1
                        closers[-1].append('tt')
                    continue
                h = getattr(self, 'cmd_' + v, None) if v.isalpha() and v not in self.local else None
                if h:
                    h()
                elif v in self.macros:
                    self.expand(v)
                else:
                    self.text_cmd(v)
        for group in reversed(closers):
            for c in reversed(group):
                if c == 'tt':
                    self.in_tt -= 1
                elif isinstance(c, tuple):
                    self.size = c[1]
                else:
                    out.text(c)

    in_tt = 0
    size = None

    def quoted_group(self):
        """After {\\tt: is the rest of the group one quote pair, `...'? If so, take the pair off."""
        st = self.stack
        i = len(st) - 1
        while i >= 0 and (st[i][0] == 'sp' or st[i][0] == 'cs' and st[i][1] in SIZES):
            i -= 1
        if i >= 1 and st[i][0] == '{':          # \ttfamily\small{`...'}, as the macro \txt writes it
            i -= 1
        if i < 1 or st[i] != ('c', '`') or st[i - 1] == ('c', '`'):
            return False
        depth, j = 0, i - 1
        while j >= 0:
            if st[j][0] == '{':
                depth += 1
            elif st[j][0] == '}':
                if depth == 0:
                    break
                depth -= 1
            j -= 1
        if j < 0 or j + 1 >= i or st[j + 1] != ('c', "'") or st[j + 2] == ('c', "'"):
            return False
        del st[i]
        del st[j + 1]
        return True

    def read_math_until_dollar(self, double=False):
        out = []
        while self.stack:
            t = self.stack.pop()
            if t[0] == '$':
                if double and self.peek() and self.peek()[0] == '$':
                    self.next()
                break
            out.append(t)
        return out

    def text_cmd(self, v):
        out = self.out
        if v == '(':
            out.text(self.inline_math(self.read_until(')')))
        elif v == '[':
            body = self.read_until(']')
            out.block('<div class="dm nb" id="%s">%s</div>'
                      % (self.block_id(toks_text(body), 'm'), self.display('\\[%s\\]' % self.tex(body))))
        elif v == '\\':
            self.read_opt()
            out.text('<br>')
        elif v in ('KWD', 'KWDVAR', 'OPR', 'TYP', 'VAR', 'STR'):
            out.text('<span class="m">%s</span>' % self.fortify(v, self.read_arg()))
        elif v in ('EXP', 'ensuremath'):
            out.text(self.inline_math(self.read_arg()))
        elif v in FONT_CMD:
            tag = FONT_CMD[v]
            body = self.inline(self.read_arg())
            if '.' in tag:
                tag, cls = tag.split('.')
                out.text('<%s class="%s">%s</%s>' % (tag, cls, body, tag))
            else:
                out.text('<%s>%s</%s>' % (tag, body, tag))
        elif v in ('texttt', 'txt', 'txtr', 'shellcommand'):
            arg = self.read_arg()
            # a quote pair around the whole span: LaTeX's typewriter face draws it curly, so do we
            quoted = len(arg) > 2 and arg[0] == ('c', '`') and arg[-1] == ('c', "'") \
                and arg[1] != ('c', '`') and arg[-2] != ('c', "'")
            if quoted:
                arg = arg[1:-1]
            self.in_tt += 1
            body = self.inline(arg)
            self.in_tt -= 1
            out.text(('‘<code>%s</code>’' if quoted else '<code>%s</code>') % body)
        elif v == 'fbox':
            out.text('<span class="fbox">%s</span>' % self.inline(self.read_arg()))
        elif v in ('mbox', 'hbox', 'text', 'makebox', 'scap', 'textnormal'):
            if v == 'makebox':
                self.read_opt(), self.read_opt()
            out.text(self.inline(self.read_arg()))
        elif v in TEXT_SYM:
            out.text(TEXT_SYM[v])
        elif v in SYM:
            out.text('<span class="m">%s</span>' % SYM[v][0])
        elif v in IGNORE:
            if v == 'penalty':
                self.skip_dimen()
        elif v in ONE_ARG_IGNORE:
            if self.peek() == ('c', '*'):
                self.next()
            if v in ('setlength', 'addtolength', 'setcounter', 'addtocounter', 'markboth'):
                self.read_arg()
            if v == 'rule':
                self.read_opt()
                w, h = toks_text(self.read_arg()).strip(), toks_text(self.read_arg()).strip()
                if re.fullmatch(r'[\d.]+(em|ex|pt|in|cm|mm)', w) and re.fullmatch(r'[\d.]+(em|ex|pt|in|cm|mm)', h):
                    out.text('<span class="hr" style="width:%s;height:%s"></span>' % (w, h))
                return
            self.read_opt()
            self.read_arg()
        elif v in ('hspace', 'hskip', 'mskip', 'kern'):
            if self.peek() == ('c', '*'):
                self.next()
            if self.peek() and self.peek()[0] == '{':
                self.read_arg()
            else:
                self.skip_dimen()
            out.text(' ')
        elif v in ' \n\t':
            out.text(' ')
        elif v in ',;:!':
            out.text('\u2009' if v != '!' else '')
        elif v in '_#%&${}':
            out.text(esc(v))
        elif v in ('-', '/', '@', '+', '=', '>', '<', '*'):
            pass
        elif v in ACCENT and not v.isalpha() or v in ('c', 'v', 'u', 'H', 'b', 'd'):
            arg = self.inline(self.read_arg())
            out.text(arg[:1] + ACCENT[v] + arg[1:])
        elif v == 'char':
            out.text(esc(self.read_char()))
        elif v == 'usefont':
            self.read_arg(), self.read_arg(), self.read_arg(), self.read_arg()
        elif v in ('verythin', 'ultrathin'):
            pass
        elif v == 'begin':
            self.environment(toks_text(self.read_arg()))
        elif v == 'end':
            self.warn('stray \\end{%s}' % toks_text(self.read_arg()))
        else:
            self.unknown[v] = self.unknown.get(v, 0) + 1
            out.text('<span class="unk">\\%s</span>' % esc(v))

    def read_char(self):
        """\\char'134, \\char"5C, \\char`\\x or \\char92."""
        self.skip_space()
        t = self.next()
        if t == ('c', "'"):
            base, digits = 8, '01234567'
        elif t == ('c', '"'):
            base, digits = 16, '0123456789ABCDEFabcdef'
        elif t == ('c', '`'):
            t = self.next()
            return t[1] if t else ''
        else:
            base, digits = 10, '0123456789'
            self.stack.append(t)
        s = ''
        while self.stack and self.stack[-1][0] == 'c' and self.stack[-1][1] in digits:
            s += self.stack.pop()[1]
        self.skip_space()
        try:
            return chr(int(s, base))
        except ValueError:
            return ''

    # ----- commands with their own handling (text mode)
    def cmd_input(self):
        arg = toks_text(self.read_arg())
        m = re.search(r'/(\w[\w-]*)/examples/(.+?)(\.tex)?$', arg)
        if m:
            self.example(m.group(1), m.group(2))
            return
        m = re.search(r'fortress-(keywords|unitOperators|specialReservedWords)', arg)
        if m:
            self.word_table(m.group(1))
            return
        m = re.match(r'\\macros/([\w-]+)', arg.strip())
        if m:
            name = m.group(1) + '.tex'
            load_macros(self.macros, (name,))
            self.defs.append('\\input{%s}' % os.path.join(MACRO_DIR, name))
            return
        m = re.search(r'/library/apis/(\w+)(\.tex)?$', arg.strip())
        if m:
            self.api_listing(m.group(1))
            return
        p = resolve_input(arg)
        if not p:
            return
        if p.endswith('.eepic') and os.path.exists(p):
            h = self.display('\\input{%s}' % p)
            self.out.block('<div class="dm pic nb" id="%s" data-kind="figure">%s</div>'
                           % (self.block_id(os.path.basename(p), 'f'), h))
            return
        if not os.path.exists(p):
            self.warn('missing input ' + os.path.relpath(p, ROOT))
            self.out.block('<p class="gap">[Not in this edition: <code>%s</code>, a file that the '
                           'specification\'s build generates.]</p>' % esc(os.path.relpath(p, SPEC)))
            return
        src = Source()
        text = src.prepare(read(p))
        base_v, base_f = len(self.src.verb), len(self.src.fsrc)
        self.src.verb.extend(src.verb)
        self.src.fsrc.extend(src.fsrc)
        text = re.sub(r'\\(VERBBLOCK|VERBINLINE)\{(\d+)\}',
                      lambda m: '\\%s{%d}' % (m.group(1), int(m.group(2)) + base_v), text)
        text = re.sub(r'\\FSSRC\{(\d+)\}', lambda m: '\\FSSRC{%d}' % (int(m.group(1)) + base_f), text)
        self.push(tokenize(text))

    def api_listing(self, name):
        """A listing of a library api: the tree's tool fortex (Fortify, in Emacs) on a copy of the .fsi file."""
        src = next((os.path.join(d, name + '.fsi') for d in LIBRARIES if os.path.exists(os.path.join(d, name + '.fsi'))), None)
        folder = os.path.join(self.work, 'apis')
        tex = os.path.join(folder, name + '.tex')
        if src and shutil.which('emacs') and not (os.path.exists(tex) and os.path.getmtime(tex) >= os.path.getmtime(src)):
            os.makedirs(folder, exist_ok=True)
            shutil.copy(src, os.path.join(folder, name + '.fsi'))
            subprocess.run(['emacs', '-batch', name + '.fsi', '-l', FORTIFY_EL, '-f', 'fortex'], cwd=folder,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=300)
        if not src or not os.path.exists(tex):
            self.warn('no listing of the api ' + name)
            self.out.block('<p class="gap">[Not in this edition: the listing of the api <code>%s</code>.]</p>' % esc(name))
            self.unknown['api listing'] = self.unknown.get('api listing', 0) + 1
            return
        self.out.block('<p class="standfirst">The listing below is made from <code>%s</code> of the revival’s '
                       'repository, as the specification’s build makes it.</p>' % esc(os.path.relpath(src, ROOT)))
        inner = Source()
        text = inner.prepare(read(tex))
        base = len(self.src.verb)
        self.src.verb.extend(inner.verb)
        text = re.sub(r'\\(VERBBLOCK|VERBINLINE)\{(\d+)\}',
                      lambda mm: '\\%s{%d}' % (mm.group(1), int(mm.group(2)) + base), text)
        self.push(tokenize(text))

    def cmd_FortexSettings(self):
        self.defs.append('\\FortexSettings')

    def cmd_VERBBLOCK(self):
        text = self.src.verb[int(toks_text(self.read_arg()))]
        self.out.block('<pre class="vb nb" id="%s" data-kind="code"><code>%s</code></pre>'
                       % (self.block_id(esc(text), 'c'), esc(text.rstrip('\n'), quote=False)))

    def cmd_VERBINLINE(self):
        self.out.text('<code>%s</code>' % esc(self.src.verb[int(toks_text(self.read_arg()))], quote=False))

    pending_src = None

    def cmd_FSSRC(self):
        self.pending_src = self.src.fsrc[int(toks_text(self.read_arg()))]

    def cmd_chapter(self):
        self.read_arg()        # the page's h1 is written by the site builder

    def cmd_part(self):
        self.read_arg()

    def heading(self, level, title_toks, numbered=True):
        out = self.out
        out.par()
        while self.sections and self.sections[-1] >= level:
            self.sections.pop()
            out.block('</section>')
        labels = []
        while True:
            self.skip_space(par=True)
            t = self.peek()
            if t and t[0] == 'cs' and t[1] in ('seclabel', 'label', 'chaplabel', 'applabel'):
                self.next()
                labels.append(PREFIX[t[1]] + toks_text(self.read_arg()).strip())
            else:
                break
        title = self.inline(title_toks)
        num = ''
        if numbered and level == 2:
            self.c_sec += 1
            self.c_sub = 0
            num = '%s.%d' % (self.chapter['num'], self.c_sec)
        elif numbered and level == 3:
            self.c_sub += 1
            num = '%s.%d.%d' % (self.chapter['num'], self.c_sec, self.c_sub)
        if labels:
            hid = anchor_of(labels[0])
            want = self.st.labels.get(labels[0], {}).get('num')
            if want is not None and want != num:
                self.warn('number of %s: %s here, %s in the scan' % (labels[0], num, want))
        else:
            hid = 's-' + slugify(re.sub(r'<[^>]+>', '', title))
        n = self.ids.get(hid, 0) + 1
        self.ids[hid] = n
        if n > 1:
            hid += '-%d' % n
        extra = ''.join('<a id="%s"></a>' % anchor_of(l) for l in labels[1:])
        plain = html.unescape(re.sub(r'<[^>]+>', '', title))
        self.sections.append(level)
        self.toc.append((level, num, title, hid))
        out.block('<section class="sec%s" data-num="%s" data-title="%s">\n<h%d id="%s" class="nb">%s%s%s</h%d>'
                  % (' rv' if REVIVAL_SECTIONS.intersection(labels) else '', num, esc(plain), level, hid, extra,
                     '<span class="num">%s</span> ' % num if num else '', title, level))

    def cmd_section(self):
        star = self.peek() == ('c', '*')
        if star:
            self.next()
        self.read_opt()
        self.heading(2, self.read_arg(), not star)

    def cmd_subsection(self):
        star = self.peek() == ('c', '*')
        if star:
            self.next()
        self.read_opt()
        self.heading(3, self.read_arg(), not star)

    def cmd_subsubsection(self):
        if self.peek() == ('c', '*'):
            self.next()
        self.heading(4, self.read_arg(), False)

    def cmd_paragraph(self):
        self.out.par()
        self.out.text('<strong>%s</strong> ' % self.inline(self.read_arg()))

    cmd_librarysection = cmd_section
    cmd_librarysubsection = cmd_subsection
    cmd_Method = cmd_Function = cmd_Variable = cmd_subsection

    def cmd_Trait(self):
        self.heading(2, tokenize('The Trait ') + self.read_arg())

    def cmd_Object(self):
        self.heading(2, tokenize('The Object ') + self.read_arg())

    def label(self, prefix):
        key = prefix + toks_text(self.read_arg()).strip()
        self.out.text('<a id="%s"></a>' % anchor_of(key))

    def cmd_label(self):
        self.label('')

    def cmd_seclabel(self):
        self.label('sec:')

    def cmd_chaplabel(self):
        key = 'chap:' + toks_text(self.read_arg()).strip()
        if key not in self.chapter['labels'][:1]:
            self.out.text('<a id="%s"></a>' % anchor_of(key))

    def cmd_applabel(self):
        key = 'app:' + toks_text(self.read_arg()).strip()
        if key not in self.chapter['labels'][:1]:
            self.out.text('<a id="%s"></a>' % anchor_of(key))

    def cmd_partlabel(self):
        self.read_arg()

    def cmd_figlabel(self):
        self.label('fig:')

    def ref(self, prefix, word):
        key = prefix + toks_text(self.read_arg()).strip()
        rec = self.st.labels.get(key)
        if not rec:
            self.warn('reference to an unknown label ' + key)
            self.out.text('%s<span class="pending">[a part of the text that is not in this edition]</span>'
                          % (word + ' ' if word else ''))
            return
        text = ((word + '\u00a0') if word else '') + (rec['num'] or '“%s”' % self.inline(tokenize(rec['title'])))
        ch = rec.get('chapter')
        if rec['kind'] == 'part':
            self.out.text(text)
        elif ch and ch['slug'] in self.converted:
            anchor = rec['anchor']
            if rec.get('top'):
                anchor = ''
            here = ch is self.chapter
            self.out.text('<a class="xref" href="%s%s">%s</a>%s'
                          % ('' if here and anchor else ch['slug'] + '.html',
                             '#' + anchor if anchor else '', text, '' if ch['slug'] in SAMPLE else '<!--nc-->'))
        else:
            where = ''
            if ch and rec['kind'] not in ('chapter', 'appendix'):
                where = ' of %s %s' % ('Appendix' if ch['kind'] == 'appendix' else 'Chapter', ch['num'])
            self.out.text('%s <span class="pending">[not converted yet%s]</span>' % (text, ''))

    def cmd_secref(self):
        self.ref('sec:', 'Section')

    def cmd_see(self):
        self.out.text('see ')
        self.ref('sec:', 'Section')

    def cmd_See(self):
        self.out.text('See ')
        self.ref('sec:', 'Section')

    def cmd_chapref(self):
        self.ref('chap:', 'Chapter')

    def cmd_appref(self):
        self.ref('app:', 'Appendix')

    def cmd_partref(self):
        self.ref('part:', 'Part')

    def cmd_figref(self):
        self.ref('fig:', 'Figure')

    def cmd_ref(self):
        self.ref('', '')

    def cmd_pageref(self):
        self.read_arg()
        self.out.text('<span class="pending">[page]</span>')

    def cmd_cite(self):
        self.read_opt()
        keys = [k.strip() for k in toks_text(self.read_arg()).split(',')]
        self.cited.update(keys)
        self.out.text('[%s]' % ', '.join('<a class="cite" href="references.html#ref-%s">%s</a>'
                                         % (anchor_of(k), esc(k)) for k in keys))

    def cmd_url(self):
        u = esc(toks_text(self.read_arg()))
        self.out.text('<code>%s</code>' % u)

    def cmd_footnote(self):
        body = self.inline(self.read_arg())
        self.footnotes.append(body)
        n = len(self.footnotes)
        self.out.text('<sup class="fnref"><a id="fnref-%d" href="#fn-%d">%d</a></sup>' % (n, n, n))

    def cmd_note(self):
        body = self.blocks(self.read_arg())
        self.out.block('<aside class="draft"><p class="label">Draft note</p>\n%s</aside>' % body)

    def cmd_marginnote(self):
        body = self.inline(self.read_arg())
        self.out.text(' <span class="margin">[Draft note: %s]</span> ' % body)

    def cmd_revision(self):
        key = 'sec:' + toks_text(self.read_arg()).strip()
        body = self.blocks(self.read_arg())
        saved, self.out = self.out, Out(self, inline=True)
        self.push(tokenize('{%s}' % key[4:]))
        self.ref('sec:', 'Section')
        where = self.out.html()
        self.out = saved
        self.out.block('<aside class="revision"><p class="label">Revised by the 2026 revival '
                       '<span class="see">see %s</span></p>\n%s</aside>' % (where, body))
        self.revisions += 1

    def cmd_item(self):
        self.warn('\\item outside a list')

    def cmd_caption(self):
        self.read_opt()
        self.c_fig += 1
        self.out.block('<figcaption>Figure %s.%d: %s</figcaption>'
                       % (self.chapter['num'], self.c_fig, self.inline(self.read_arg())))

    def cmd_multicolumn(self):
        self.read_arg(), self.read_arg()
        self.out.text(self.inline(self.read_arg()))

    def cmd_A(self):
        self.out.text('<code class="ul">%s</code>' % self.inline(self.read_arg()))

    def cmd_color(self):
        self.read_arg()

    def cmd_textcolor(self):
        self.read_arg()

    def cmd_today(self):
        pass

    def define(self, name, nargs, default, body, tex, star=False):
        """A definition inside a chapter: for the text here, and for the displays that LaTeX sets."""
        if name in ('home', 'macros'):
            return
        self.macros[name] = (nargs, default, body) + (('star',) if star else ())
        self.local.add(name)
        self.defs.append(tex)

    def cmd_newcommand(self):
        if self.peek() == ('c', '*'):
            self.next()
        name = [t for t in self.read_arg() if t[0] == 'cs']
        n, default, body = self.read_opt(), self.read_opt(), self.read_arg()
        if not name:
            return
        name = name[0][1]
        nargs = int(toks_text(n)) if n else 0
        self.define(name, nargs, toks_text(default) if default is not None else None, body,
                    '\\expandafter\\let\\csname %s\\endcsname\\relax\\newcommand{\\%s}%s%s{%s}' % (
                        name, name, '[%d]' % nargs if nargs else '',
                        '[%s]' % toks_tex(default) if default is not None else '', toks_tex(body)))

    cmd_renewcommand = cmd_providecommand = cmd_newcommand

    def cmd_RenewDocumentCommand(self):
        """xparse, used once: \\RenewDocumentCommand\\Method{sm}{#2\\par}."""
        name = [t for t in self.read_arg() if t[0] == 'cs']
        spec, body = toks_text(self.read_arg()).strip(), self.read_arg()
        if not name or spec not in ('m', 'sm', 'mm'):
            self.unknown['RenewDocumentCommand'] = self.unknown.get('RenewDocumentCommand', 0) + 1
            return
        name = name[0][1]
        self.define(name, len(spec), None, body,
                    '\\expandafter\\let\\csname %s\\endcsname\\relax\\NewDocumentCommand{\\%s}{%s}{%s}'
                    % (name, name, spec, toks_tex(body)), star=spec[0] == 's')

    def cmd_def(self):
        """\\def\\name#1#2{body} in a chapter."""
        self.skip_space()
        t = self.next()
        params = []
        while self.stack and self.stack[-1][0] != '{':
            params.append(self.stack.pop())
        body = self.read_arg()
        if not t or t[0] != 'cs':
            return
        self.define(t[1], sum(1 for p in params if p[0] == '#'), None, body,
                    '\\def\\%s%s{%s}' % (t[1], toks_tex(params), toks_tex(body)))

    def cmd_raisebox(self):
        self.read_arg(), self.read_opt(), self.read_opt()
        self.out.text(self.inline(self.read_arg()))

    def cmd_nolinkurl(self):
        self.out.text('<code>%s</code>' % esc(toks_text(self.read_arg())))

    def cmd_vskip(self):
        self.skip_space()
        if self.peek() == ('c', '-'):
            self.next()
        if self.peek() and self.peek()[0] == 'cs':
            self.next()
        else:
            self.skip_dimen()

    def cmd_tracingcommands(self):
        """A TeX debugging switch left in a chapter: \\tracingcommands=1."""
        self.skip_space()
        if self.peek() == ('c', '='):
            self.next()
        self.skip_dimen()

    cmd_tracingmacros = cmd_tracingcommands

    # ----- environments
    def environment(self, name):
        out = self.out
        body = self.read_env(name)
        if name in ('itemize', 'enumerate', 'description'):
            items = self.split_items(body)
            tag = dict(itemize='ul', enumerate='ol', description='dl')[name]
            rows = []
            for label, toks in items:
                inner = self.blocks(toks)
                if tag == 'dl':
                    rows.append('<dt>%s</dt>\n<dd>%s</dd>' % (self.inline(label or []), inner))
                elif label is not None:
                    rows.append('<li class="lab"><span class="lab">%s</span> %s</li>' % (self.inline(label), inner))
                else:
                    rows.append('<li>%s</li>' % inner)
            out.block('<%s>\n%s\n</%s>' % (tag, '\n'.join(rows), tag))
        elif name == 'FortressDoc':
            out.block('<div class="doc">%s</div>' % self.blocks(self.drop_args(body, 1)))
        elif name in ('quote', 'quotation'):
            out.block('<blockquote>%s</blockquote>' % self.blocks(body))
        elif name in ('center', 'flushleft', 'flushright', 'small', 'minipage', 'tt', 'figure',
                      'figure*', 'table', 'wrapfigure'):
            if name == 'minipage':
                body = self.drop_args(body, 1)
            if name == 'wrapfigure':
                body = self.drop_args(body, 2)
            if body and body[0] == ('c', '['):
                while body and body.pop(0) != ('c', ']'):
                    pass
            cls = dict(center='center', tt='tt').get(name, 'fig' if 'fig' in name else name)
            out.block('<div class="%s">%s</div>' % (cls, self.blocks(body)))
        elif name in ('tabular', 'array', 'Grammar', 'GrammarTwo'):
            tex = '\\begin{%s}%s\\end{%s}' % (name, self.tex(body), name)
            if name == 'array':
                tex = '\\(%s\\)' % tex
            grammar = name.startswith('Grammar')
            out.block('<div class="tw nb%s" id="%s" data-kind="%s">%s%s</div>' % (
                ' gr' if grammar else '', self.block_id(toks_text(body), 'g' if grammar else 't'),
                'grammar' if grammar else 'table',
                '', self.display(tex)))
        elif name == 'Fortress':
            self.fortress_env(body)
        elif name in ('FortressCode', 'tabbing', 'ttt'):
            tex = '\\begin{%s}%s\\end{%s}' % (name, self.tex(body), name)
            out.block('<div class="fx nb" id="%s" data-kind="code"><div class="fx-r">%s</div></div>'
                      % (self.block_id(toks_text(body), 'c'), self.display(tex)))
        elif name in ('lemma', 'theorem', 'proof', 'definition', 'corollary'):
            num = ''
            for i, t in enumerate(body[:6]):
                if t == ('cs', 'label'):
                    key = toks_text(body[i + 2:body.index(('}', '}'), i)]).strip()
                    rec = self.st.labels.get(key)
                    if rec and rec.get('kind') == name:
                        num = ' ' + rec['num']
            out.block('<div class="thm"><p class="label">%s%s</p>%s</div>'
                      % (name.capitalize(), num, self.blocks(body)))
        elif name in ('align*', 'align', 'eqnarray*', 'eqnarray', 'equation', 'equation*', 'displaymath'):
            tex = '\\begin{%s}%s\\end{%s}' % (name, self.tex(body), name)
            out.block('<div class="dm nb" id="%s">%s</div>' % (self.block_id(toks_text(body), 'm'), self.display(tex)))
        elif name == 'document':
            self.push(body)
        else:
            self.unknown['begin{%s}' % name] = self.unknown.get('begin{%s}' % name, 0) + 1
            out.block('<div class="unk">[%s]</div>%s' % (esc(name), self.blocks(body)))

    def drop_args(self, body, n):
        saved = self.stack
        self.stack = list(reversed(body))
        self.read_opt()
        for _ in range(n):
            self.read_arg()
        body = list(reversed(self.stack))
        self.stack = saved
        return body

    @staticmethod
    def split_top(toks, seps):
        """Split a token list at the control sequences `seps`, outside groups and environments."""
        parts, cur, depth, env = [], [], 0, 0
        seplist = []
        i = 0
        while i < len(toks):
            t = toks[i]
            if t[0] == '{':
                depth += 1
            elif t[0] == '}':
                depth -= 1
            elif t[0] == 'cs' and t[1] == 'begin':
                env += 1
            elif t[0] == 'cs' and t[1] == 'end':
                env -= 1
            if depth == 0 and env == 0 and (t[0] == 'cs' and t[1] in seps or t[0] in seps):
                parts.append(cur)
                seplist.append(t[1])
                cur = []
            else:
                cur.append(t)
            i += 1
        parts.append(cur)
        return parts, seplist

    def split_items(self, body):
        parts, _ = self.split_top(body, ('item',))
        items = []
        for toks in parts[1:]:
            label = None
            j = 0
            while j < len(toks) and toks[j][0] == 'sp':
                j += 1
            if j < len(toks) and toks[j] == ('c', '['):
                depth, k = 0, j + 1
                while k < len(toks):
                    if toks[k][0] == '{':
                        depth += 1
                    elif toks[k][0] == '}':
                        depth -= 1
                    elif toks[k] == ('c', ']') and depth == 0:
                        break
                    k += 1
                label, toks = toks[j + 1:k], toks[k + 1:]
            items.append((label, toks))
        return items

    # ----- code examples
    def code_block(self, rendered, source, name=None, key=None):
        cls = 'fx nb' + (' both' if rendered and source else '')
        parts = []
        if rendered:
            parts.append('<div class="fx-r">%s</div>' % rendered)
        if source:
            parts.append('<pre class="fx-s"><code>%s</code></pre>' % esc(source, quote=False))
        key = source or key or name or rendered
        self.out.block('<div class="%s" id="%s" data-kind="code"%s>%s</div>'
                       % (cls, self.block_id(esc(key) if source else key, 'c'),
                          ' data-example="%s"' % esc(name) if name else '', ''.join(parts)))
        self.n_code += 1
        if rendered and source:
            self.n_both += 1

    def example(self, part, name):
        """An example that the specification's build renders from SpecData/examples."""
        src = None
        for ext in ('.fss', '.fsi'):
            p = os.path.join(EXAMPLES, part, name + ext)
            if os.path.exists(p):
                src = p
                break
        if not src:
            self.warn('example %s/%s has no source in SpecData/examples' % (part, name))
            self.out.block('<p class="gap">[Example <code>%s</code> is not in this edition.]</p>' % esc(name))
            return
        regions = re.findall(r'\(\*\* EXAMPLE \*\*\)\n(.*?)\(\*\* END EXAMPLE \*\*\)', read(src), flags=re.S)
        source = '\n'.join(r.rstrip('\n') for r in regions) if regions else None
        rendered = None
        tex = os.path.join(self.work, 'examples', part, name + '.tex')
        self.examples_needed.add((part, os.path.basename(src)))
        if os.path.exists(tex) and '\\begin{FortressCode}' in read(tex):
            rendered = self.display('\\input{%s}' % tex)
        if rendered is None:
            self.no_render.append(name)
        self.code_block(rendered, source, name)

    def fortress_env(self, body):
        """A hand-written \\begin{Fortress} block: text with \\(...\\) math and tabbing commands."""
        source, self.pending_src = self.pending_src, None
        rendered = self.display('\\begin{Fortress}%s\\end{Fortress}' % self.tex(body))
        if source:
            # a remark of an author among the commented source lines shares no word with the code
            seen = set(re.findall(r'[A-Za-z]{2,}', toks_text(body)))
            lines = source.split('\n')

            def foreign(l):
                w = re.findall(r'[A-Za-z]{2,}', l)
                return len(w) > 2 and not seen.intersection(w)
            while lines and foreign(lines[-1]):
                lines.pop()
            while lines and foreign(lines[0]):
                lines.pop(0)
            source = '\n'.join(lines).strip('\n') or None
        self.code_block(rendered, source, key=toks_text(body))

    def word_table(self, which):
        """A table of reserved words, as the build's Perl scripts (Specification/fortress/*.pl) write it
        from SpecData/tables: seven columns, each word in \\KWD (or \\TYP for the unit operators)."""
        words = [w.strip() for w in read(os.path.join(TABLES, 'fortress-' + which)).split('\n') if w.strip()]
        cmd = 'TYP' if which == 'unitOperators' else 'KWD'
        rows = [' & '.join('\\%s{%s}' % (cmd, w.replace('_', '\\_', 1)) for w in words[i:i + 7])
                for i in range(0, len(words), 7)]
        tex = '\\begin{tabular}{lllllll}\n%s\n\\end{tabular}' % ' \\\\\n'.join(rows)
        self.out.block('<div class="tw nb" id="%s" data-kind="table">%s</div>'
                       % (self.block_id(' '.join(words), 't'), self.display(tex)))

    # ----- math
    def fortify(self, kind, toks, inner=False):
        body = self.math_plain(toks)
        if kind == 'KWD':
            return '<span class="kw">%s</span>' % body
        if kind == 'KWDVAR':
            return '<span class="kw">%s</span>' % body
        if kind == 'OPR':
            return '<span class="op">%s</span>' % body
        if kind == 'TYP':
            return '<span class="ty">%s</span>' % body
        if kind == 'VAR':
            return '<i>%s</i>' % body
        return '<span class="str">%s</span>' % self.inline_tt(toks)

    def inline_tt(self, toks):
        self.in_tt += 1
        try:
            return self.inline(toks)
        finally:
            self.in_tt -= 1

    def math_plain(self, toks):
        """The argument of \\VAR, \\TYP, \\mathrm ...: characters as they are, no italics."""
        return self.math(toks, plain=True)

    def math(self, toks, plain=False):
        saved = self.stack
        self.stack = list(reversed(toks))
        try:
            atoms = self.math_atoms(plain)
        finally:
            self.stack = saved
        return self.join_atoms(atoms)

    GAP = {('ord', 'op'): 1, ('ord', 'bin'): 2, ('ord', 'rel'): 3, ('ord', 'inner'): 1,
           ('op', 'ord'): 1, ('op', 'op'): 1, ('op', 'rel'): 3, ('op', 'inner'): 1,
           ('bin', 'ord'): 2, ('bin', 'op'): 2, ('bin', 'open'): 2, ('bin', 'inner'): 2,
           ('rel', 'ord'): 3, ('rel', 'op'): 3, ('rel', 'open'): 3, ('rel', 'inner'): 3,
           ('close', 'op'): 1, ('close', 'bin'): 2, ('close', 'rel'): 3, ('close', 'inner'): 1,
           ('punct', 'ord'): 1, ('punct', 'op'): 1, ('punct', 'rel'): 1, ('punct', 'open'): 1,
           ('punct', 'close'): 1, ('punct', 'punct'): 1, ('punct', 'inner'): 1,
           ('inner', 'ord'): 1, ('inner', 'op'): 1, ('inner', 'bin'): 2, ('inner', 'rel'): 3,
           ('inner', 'open'): 1, ('inner', 'punct'): 1, ('inner', 'inner'): 1}

    def join_atoms(self, atoms):
        real = [a for a in atoms if a[0] != 'sp']
        for i, a in enumerate(real):
            if a[0] == 'bin':
                prev = real[i - 1][0] if i else None
                nxt = real[i + 1][0] if i + 1 < len(real) else None
                if prev in (None, 'bin', 'op', 'rel', 'open', 'punct') or nxt in ('rel', 'close', 'punct', None):
                    a[0] = 'ord'
        out, prev = [], None
        for cls, h in atoms:
            if cls == 'sp':
                out.append(h)
                prev = None
                continue
            if prev:
                g = self.GAP.get((prev, cls), 0)
                if g:
                    out.append('\u2009' if g == 1 and prev != 'punct' else ' ')
            out.append(h)
            prev = cls
        return re.sub(r'[ \u2009]*( )[ \u2009]*', ' ', ''.join(out))

    def math_arg(self, plain=False):
        return self.math(self.read_arg(), plain)

    def math_atoms(self, plain=False):
        atoms = []

        def add(cls, h):
            atoms.append([cls, h])

        def script(tag):
            h = self.math_arg(plain)
            if not atoms or atoms[-1][0] == 'sp':
                add('ord', '')
            atoms[-1][1] += '<%s>%s</%s>' % (tag, h, tag)
        while self.stack:
            k, v = self.stack.pop()
            if k == 'c':
                if v.isalpha():
                    run = v
                    while not plain and self.stack and self.stack[-1][0] == 'c' and self.stack[-1][1].isalpha() \
                            and self.stack[-1][1].isascii():
                        run += self.stack.pop()[1]
                    add('ord', esc(run) if plain else '<i>%s</i>' % esc(run))
                elif v.isdigit() or v == '.':
                    if atoms and atoms[-1][0] == 'ord' and re.search(r'[\d.]$', atoms[-1][1]) and not plain:
                        atoms[-1][1] += v
                    else:
                        add('ord', v)
                elif plain:
                    add('ord', esc(v))
                elif v in '+-*':
                    add('bin', {'-': '−', '*': '∗'}.get(v, v))
                elif v in '=<>':
                    add('rel', esc(v))
                elif v in '([':
                    add('open', v)
                elif v in ')]':
                    add('close', v)
                elif v in ',;':
                    add('punct', v)
                elif v == ':':
                    add('rel', v)
                elif v == "'":
                    add('ord', '′')
                elif v == '|':
                    add('ord', '|')
                else:
                    add('ord', esc(v))
            elif k == 'sp' or k == 'par':
                if plain:
                    add('ord', ' ')
            elif k == '~':
                add('sp', '\u00a0')
            elif k == '^':
                script('sup')
            elif k == '_':
                script('sub')
            elif k == '{':
                self.stack.append((k, v))
                inner = self.read_arg()
                parts, seps = self.split_top(inner, ('over',))
                if seps:
                    add('ord', '<span class="frac"><span>%s</span><span>%s</span></span>'
                        % (self.math(parts[0], plain), self.math(parts[1], plain)))
                else:
                    h = self.math(inner, plain)
                    if h:
                        add('ord', h)
            elif k in '&#$':
                add('ord', esc(v))
            elif k == 'cs':
                self.math_cmd(v, add, atoms, plain)
        return atoms

    def math_cmd(self, v, add, atoms, plain):
        if v in ('KWD',):
            add('rel', self.fortify(v, self.read_arg()))
        elif v in ('KWDVAR', 'TYP', 'VAR', 'STR'):
            add('ord', self.fortify(v, self.read_arg()))
        elif v == 'OPR':
            add('bin', self.fortify(v, self.read_arg()))
        elif v in ('BIGOPR', 'BIGOP'):
            add('op', '<span class="big">%s</span>' % self.math_arg())
        elif v in self.macros and (v in FUNCS or v == 'colon'):
            self.expand(v)                    # the tree's own \exp, \sup and \colon, not LaTeX's
        elif v in SYM:
            ch, cls = SYM[v]
            add(cls, '<span class="big">%s</span>' % ch if cls == 'op' else ch)
        elif v in FUNCS:
            add('op', v)
        elif v == 'not':
            self.skip_space()
            while self.peek() and self.peek()[0] == 'cs' and (self.peek()[1] in self.macros or self.peek()[1] == '!'):
                name = self.next()[1]            # \not\coercesto: the tree's macro stands for a symbol
                if name != '!':
                    self.expand(name)
                self.skip_space()
            t = self.next()
            if t and t[0] == 'cs' and t[1] in SYM:
                ch, cls = SYM[t[1]]
            elif t:
                ch, cls = t[1], 'rel'
            else:
                ch, cls = '', 'rel'
            add(cls, NOT.get(ch, ch + '\u0338'))
        elif v in ('mathbb', 'mathcal', 'mathscr'):
            table = BB if v == 'mathbb' else CAL
            add('ord', ''.join(table.get(c, c) for c in toks_text(self.read_arg())))
        elif v in ('mathrm', 'textrm', 'mathit', 'textit', 'mathtt', 'texttt', 'mathbf', 'textbf',
                   'mathsf', 'textsf', 'mathpzc', 'textsc', 'emph', 'boldsymbol', 'mathfrak'):
            cls = {'mathrm': 'rm', 'textrm': 'rm', 'mathit': 'it', 'textit': 'it', 'emph': 'it',
                   'mathtt': 'tt', 'texttt': 'tt', 'mathbf': 'bf', 'textbf': 'bf', 'boldsymbol': 'bf',
                   'mathsf': 'sf', 'textsf': 'sf', 'mathpzc': 'it', 'textsc': 'sc', 'mathfrak': 'bf'}[v]
            if v.startswith('text') or v == 'emph':
                h = self.inline(self.read_arg())
            else:
                h = self.math(self.read_arg(), plain=True)
            add('ord', '<span class="%s">%s</span>' % (cls, h))
        elif v == 'fbox':
            add('ord', '<span class="fbox"><span class="rm">%s</span></span>' % self.inline(self.read_arg()))
        elif v in ('hbox', 'mbox', 'text', 'textnormal'):
            add('ord', '<span class="rm">%s</span>' % self.inline(self.read_arg()))
        elif v in ('mathrel', 'mathbin', 'mathord', 'mathopen', 'mathclose', 'mathpunct', 'mathop', 'mathinner'):
            cls = {'mathrel': 'rel', 'mathbin': 'bin', 'mathord': 'ord', 'mathopen': 'open',
                   'mathclose': 'close', 'mathpunct': 'punct', 'mathop': 'op', 'mathinner': 'inner'}[v]
            add(cls, self.math_arg(plain))
        elif v == 'COLON':
            add('punct', ':')
        elif v == 'COLONOP':
            add('inner', ':')
        elif v == 'ASSIGN':
            add('rel', ':=')
        elif v == 'CONDEQ':
            add('rel', ':=:')
        elif v == 'SHORTCUT':
            add('rel', self.math_arg() + ':')
        elif v in ('frac', 'tfrac', 'dfrac'):
            add('ord', '<span class="frac"><span>%s</span><span>%s</span></span>'
                % (self.math_arg(), self.math_arg()))
        elif v == 'sqrt':
            self.read_opt()
            add('ord', '√<span class="ovl">%s</span>' % self.math_arg())
        elif v in MATH_ACCENT:
            h = self.math_arg(plain)
            if v in ('overline', 'underline') or len(re.sub(r'<[^>]+>', '', h)) > 1:
                add('ord', '<span class="%s">%s</span>' % ('ovl' if v != 'underline' else 'unl', h))
            else:
                add('ord', re.sub(r'(</i>)?$', MATH_ACCENT[v] + r'\1', h, count=1))
        elif v in (',', 'thinspace', 'verythin', 'ultrathin'):
            add('sp', '\u2009' if v in (',', 'thinspace') else '')
        elif v in (';', ':', ' ', '\n', 'enspace', '>'):
            add('sp', ' ')
        elif v in ('quad', 'qquad'):
            add('sp', '\u2003' if v == 'quad' else '\u2003\u2003')
        elif v == '!':
            pass
        elif v in ('mskip', 'hskip', 'kern', 'mkern', 'hspace'):
            if self.peek() and self.peek()[0] == '{':
                self.read_arg()
                add('sp', ' ')
            else:
                before = len(self.stack)
                text = ''.join(t[1] for t in self.stack[-6:][::-1])
                self.skip_dimen()
                if not re.match(r'\s*-', text):
                    add('sp', ' ')
        elif v in ('{', '}'):
            add('open' if v == '{' else 'close', v)
        elif v in ('|',):
            add('ord', '‖')
        elif v in '_#%&$':
            add('ord', esc(v))
        elif v == 'char':
            add('ord', esc(self.read_char()))
        elif v in ('usefont',):
            self.read_arg(), self.read_arg(), self.read_arg(), self.read_arg()
        elif v in ('tt', 'rm', 'it', 'bf', 'sf'):
            rest = []
            while self.stack:
                rest.append(self.stack.pop())
            add('ord', '<span class="%s">%s</span>' % (v, self.inline_tt(rest) if v == 'tt' else self.inline(rest)))
        elif v == '\\':
            self.read_opt()
            add('sp', '<br>')
        elif v == 'begin':
            name = toks_text(self.read_arg())
            body = self.read_env(name)
            add('ord', self.math(body))
        elif v == 'stackrel':
            top = self.math_arg()
            add('rel', '%s<sup>%s</sup>' % (self.math_arg(), top))
        elif v in ('overbrace', 'underbrace'):
            add('ord', self.math_arg())
        elif v in ('digitblank',):
            add('sp', '\u2007')
        elif v == 'ensuremath' or v == 'EXP':
            add('ord', self.math_arg())
        elif v == 'rule':
            self.read_opt()
            w, h = toks_text(self.read_arg()).strip(), toks_text(self.read_arg()).strip()
            add('ord', '<span class="hr" style="width:%s;height:%s"></span>' % (esc(w), esc(h)))
        elif v in IGNORE or v in ('mathsurround', 'nonumber', 'notag'):
            pass
        elif v in ONE_ARG_IGNORE or v in ('label', 'seclabel'):
            self.read_arg()
        elif v in self.macros:
            self.expand(v)
        elif v in TEXT_SYM:
            add('ord', TEXT_SYM[v])
        elif v in ('(', ')'):
            pass
        else:
            self.unknown[v] = self.unknown.get(v, 0) + 1
            add('ord', '<span class="unk">\\%s</span>' % esc(v))

    # ----- a chapter
    def convert(self, ch):
        self.chapter = ch
        self.ids, self.sections, self.toc, self.footnotes = {}, [], [], []
        self.cited, self.no_render = set(), []
        self.c_sec = self.c_sub = self.c_fig = 0
        self.revisions = self.n_code = self.n_both = 0
        self.unknown, self.in_tt, self.size = {}, 0, None
        self.disp, self.defs, self.local, self.display_notes = [], [], set(), []
        self.macros = dict(self.base_macros)
        self.src, text = self.st.chapter_text(ch)
        out = Out(self)
        body = self.run(tokenize(text), out)
        body += '\n</section>' * len(self.sections)
        for words in REVIVAL_PARAGRAPHS.get(ch['slug'], []):
            body, n = re.subn(r'(<p id="[^"]+" class="nb)(">%s)' % re.escape(words), r'\1 rv\2', body)
            if not n:
                self.warn('the revival\'s paragraph "%s" was not found' % words)
        if self.footnotes:
            body += '\n<section class="sec fns"><h2 id="footnotes">Footnotes</h2>\n<ol>%s</ol></section>' % ''.join(
                '<li id="fn-%d">%s <a href="#fnref-%d" aria-label="Back to the text">↩</a></li>' % (i + 1, f, i + 1)
                for i, f in enumerate(self.footnotes))
        body = archive_links(body)
        return dict(body=body, toc=self.toc, unknown=dict(self.unknown), cited=set(self.cited), disp=list(self.disp),
                    revisions=self.revisions, code=self.n_code, both=self.n_both,
                    no_render=list(self.no_render))


# ---------------------------------------------------------------- the examples, by the tree's tool

def render_examples(needed, work):
    """Run the tree's foreg (Fortify, in Emacs) on copies of the example sources."""
    todo = []
    for part, fname in sorted(needed):
        src = os.path.join(EXAMPLES, part, fname)
        dst_dir = os.path.join(work, 'examples', part)
        tex = os.path.join(dst_dir, os.path.splitext(fname)[0] + '.tex')
        if os.path.exists(tex) and os.path.getmtime(tex) >= os.path.getmtime(src):
            continue
        os.makedirs(dst_dir, exist_ok=True)
        shutil.copy(src, os.path.join(dst_dir, fname))
        todo.append((dst_dir, fname))
    if not todo:
        return 0
    if not shutil.which('emacs'):
        print('emacs is not installed: the examples keep only their source form', file=sys.stderr)
        return 0

    def one(job):
        d, f = job
        subprocess.run(['emacs', '-batch', f, '-l', FORTIFY_EL, '-f', 'foreg'], cwd=d,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=200)
    with ThreadPoolExecutor(4) as ex:
        list(ex.map(one, todo))
    return len(todo)


# ---------------------------------------------------------------- the bibliography

def bibliography(conv):
    text = read(os.path.join(SPEC, 'fortress', 'fortress.bib'))
    entries = []
    for m in re.finditer(r'@(\w+)\s*\{\s*([^,\s]+)\s*,', text):
        if m.group(1).lower() in ('string', 'comment', 'preamble'):
            continue
        body, _ = balanced(text, text.index('{', m.start()))
        fields = {}
        for f in re.finditer(r'(\w+)\s*=\s*', body):
            j = f.end()
            if j >= len(body):
                continue
            if body[j] == '{':
                val, _ = balanced(body, j)
            elif body[j] == '"':
                k = j + 1
                depth = 0
                while k < len(body) and not (body[k] == '"' and depth == 0):
                    depth += body[k] == '{'
                    depth -= body[k] == '}'
                    k += 1
                val = body[j + 1:k]
            else:
                val = re.match(r'[^,\n]*', body[j:]).group(0)
            fields.setdefault(f.group(1).lower(), val)
        entries.append((m.group(2), fields))
    rows = []
    conv.chapter = dict(slug='references', num='', labels=[])
    for key, f in sorted(entries, key=lambda e: e[0].lower()):
        def fld(name):
            v = f.get(name)
            if not v:
                return ''
            conv.src = Source()
            return conv.inline(tokenize(re.sub(r'\s+', ' ', v)))
        bits = [fld('author') or fld('editor') or fld('key')]
        title = fld('title')
        if title:
            bits.append('<em>%s</em>' % title)
        for name in ('booktitle', 'journal', 'howpublished', 'institution', 'publisher', 'note'):
            if f.get(name):
                bits.append(fld(name))
        if f.get('year'):
            bits.append(fld('year'))
        line = '. '.join(b.rstrip('.') for b in bits if b) + '.'
        if f.get('url'):
            line += ' <code>%s</code>' % esc(re.sub(r'^\\url\{(.*)\}$', r'\1', f['url'].strip()))
        rows.append('<p id="ref-%s" class="ref"><span class="key">[%s]</span> %s</p>' % (anchor_of(key), esc(key), line))
    return '\n'.join(rows)


# ---------------------------------------------------------------- the pages

def page(title, body, kind, slug='', chapter_title='', nav='', svg_style=''):
    return '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%s</title>
<link rel="stylesheet" href="reader.css">
%s</head>
<body data-page="%s" data-slug="%s" data-chapter="%s">
<nav class="bar" aria-label="Reader"><a href="index.html">Contents</a><span class="here">%s</span><a href="notes.html" class="notes-link">Notes</a></nav>
<div class="page">
%s
</div>
<script src="reader.js"></script>
</body>
</html>
''' % (esc(title), '<link rel="stylesheet" href="tex-fonts.css">\n<style>\n%s</style>\n' % svg_style if svg_style else '',
       kind, esc(slug), esc(chapter_title), nav, body)


def plain(h):
    return html.unescape(re.sub(r'<[^>]+>', '', h))


def chapter_name(ch):
    if ch['kind'] == 'front':
        return 'Front matter'
    return '%s %s' % ('Appendix' if ch['kind'] == 'appendix' else 'Chapter', ch['num'])


def build(args):
    st = Structure()
    macros = load_macros()
    by_slug = {c['slug']: c for c in st.chapters}
    if args.list:
        for c in st.chapters:
            print('%-4s %-32s %s' % (c['num'], c['slug'], os.path.relpath(c['file'], ROOT)))
        if st.missing:
            print('\ninputs that the build generates and this tree does not hold: %d' % len(st.missing))
        return 0
    wanted = [s.strip() for s in (args.only or args.chapters).split(',') if s.strip()]
    if not wanted or wanted == ['all']:
        wanted = [c['slug'] for c in st.chapters]
    if not args.chapters:
        args.chapters = ','.join(c['slug'] for c in st.chapters)
    for s in wanted:
        if s not in by_slug:
            sys.exit('no chapter with the slug %r; --list prints them' % s)
    converted = set(wanted) if not args.only else set(args.chapters.split(',')) | set(wanted)
    os.makedirs(args.work, exist_ok=True)
    conv = Converter(st, macros, converted, args.work, args.base)
    titles = {}
    for c in st.chapters:
        conv.chapter, conv.src = c, Source()
        titles[c['slug']] = conv.inline(tokenize(c['title']))
    for p in st.parts:
        p['html'] = conv.inline(tokenize(p['title']))
    # first pass finds the examples; the second has them rendered
    results = {}
    for s in wanted:
        results[s] = conv.convert(by_slug[s])
    n = render_examples(conv.examples_needed, args.work)
    if n:
        conv.warnings = []
        for s in wanted:
            results[s] = conv.convert(by_slug[s])
    out = args.out
    if not args.only:
        os.makedirs(out, exist_ok=True)
    target = out if not args.only else os.path.join(args.work, 'try')
    os.makedirs(target, exist_ok=True)
    for name in ('reader.css', 'reader.js'):
        text = read(os.path.join(HERE, name))
        if name == 'reader.js':
            text = text.replace('__BASE__', args.base)
        with open(os.path.join(target, name), 'w', encoding='utf-8') as f:
            f.write(text)

    # the displays: LaTeX sets them, dvisvgm converts them
    def one_chapter(s):
        return s, set_displays(s, results[s]['disp'], st, args.work)
    with ThreadPoolExecutor(3) as ex:
        sets = dict(ex.map(one_chapter, wanted))
    families, failed = {}, []
    for s in wanted:
        r, pg = results[s], SvgPage()
        r['display_errors'] = []

        def put(m):
            i = int(m.group(1))
            svg, err = sets[s][i]
            inline = r['disp'][i][2]
            h = pg.inline(svg, inline, i + 1) if svg else None
            if err or not h:
                r['display_errors'].append((i, err or 'no SVG', r['disp'][i][1][:100].replace('\n', ' ')))
            if not h:
                return '<span class="unk">[a display that LaTeX did not set]</span>'
            return h
        r['body'] = re.sub(r'<!--D(\d+)-->', put, r['body'])
        r['svg_style'] = pg.style()
        for fam, chars in pg.used.items():
            families.setdefault(fam, set()).update(chars)
    have = build_fonts(families, args.work, target)
    for fam, chars in sorted(families.items()):
        missing = chars - have.get(fam, set()) - set(' \n\t')
        if missing:
            failed.append('font %s lacks %d characters that the displays use: %s'
                          % (fam, len(missing), ' '.join('U+%04X' % ord(c) for c in sorted(missing)[:12])))
    order = [c for c in st.chapters if c['slug'] in converted]
    report = []
    gaps = 0
    for s in wanted:
        ch, r = by_slug[s], results[s]
        i = order.index(ch)
        prev_c = order[i - 1] if i else None
        next_c = order[i + 1] if i + 1 < len(order) else None
        name = chapter_name(ch)
        full = ('%s. ' % ch['num'] if ch['num'] else '') + plain(titles[s])
        eyebrow = SPEC_TITLE + (' · Part %s, %s' % (ch['part']['num'], plain(ch['part']['html'])) if ch.get('part') else '')
        anchors = ''.join('<a id="%s"></a>' % anchor_of(l) for l in ch['labels'])
        toc = ''
        secs = [t for t in r['toc'] if t[0] == 2]
        if secs:
            toc = '<nav class="parts" aria-label="Sections of this chapter"><h2>Sections</h2><ol>%s</ol></nav>' % ''.join(
                '<li><a href="#%s">%s %s</a></li>' % (hid, num, title) for _, num, title, hid in secs)
        front = ''
        if ch['kind'] == 'front':
            front = ('<p class="standfirst">These pages stand before the table of contents in the '
                     'specification, with no heading of their own.</p>\n'
                     '<p class="legend"><strong>The notation of this edition.</strong> %s</p>' % LEGEND)
        pager = '<nav class="pager" aria-label="Chapters">%s%s</nav>' % (
            '<a class="prev" href="%s.html"><span>Previous</span> %s</a>' % (
                prev_c['slug'], ('%s. ' % prev_c['num'] if prev_c['num'] else '') + titles[prev_c['slug']]) if prev_c else '<span></span>',
            '<a class="next" href="%s.html"><span>Next</span> %s</a>' % (
                next_c['slug'], ('%s. ' % next_c['num'] if next_c['num'] else '') + titles[next_c['slug']]) if next_c
            else '<a class="next" href="index.html"><span>Next</span> Contents%s</a>'
            % ('' if len(order) == len(st.chapters) else ': the chapters after this one are not converted yet'))
        body = '''<header class="masthead">
<p class="eyebrow">%s</p>
</header>
<div id="resume"></div>
<div id="chapter-notes"></div>
<section class="sec chapter" data-num="%s" data-title="%s">
<h1 id="top" class="nb">%s%s%s</h1>
%s%s
%s
</section>
%s
<footer class="colophon">Converted from <code>%s</code> of the revival's repository. The text is the working draft of the specification as the revival revises it.</footer>''' % (
            esc(eyebrow), ch['num'], esc(plain(titles[s])), anchors,
            '<span class="num">%s</span> ' % name if ch['num'] else '', titles[s],
            front, toc, r['body'], pager, esc(os.path.relpath(ch['file'], ROOT)))
        with open(os.path.join(target, s + '.html'), 'w', encoding='utf-8') as f:
            f.write(page('%s · Fortress specification' % full, body, 'chapter', s, full,
                         esc(full), r['svg_style']))
        n_unknown = sum(r['unknown'].values()) + len(r['display_errors'])
        gaps += n_unknown
        report.append('%-20s %7d bytes  sections %3d  displays %3d  code %3d (both forms %3d)  revisions %d  unknown %d %s'
                      % (s, len(body), len(r['toc']), len(r['disp']), r['code'], r['both'], r['revisions'], n_unknown,
                         ' '.join('\\%s×%d' % kv for kv in sorted(r['unknown'].items())) if n_unknown else ''))
        if r['no_render']:
            report.append('    not rendered by foreg: ' + ', '.join(r['no_render']))
        for i, err, tex in r['display_errors']:
            report.append('    display %d: %s | %s' % (i, err, tex))
    print('\n'.join(report))
    for f in failed:
        print('FONT:', f)
    gaps += len(failed)
    for w in conv.warnings:
        print('warning:', w)
    if args.only:
        print('written to', os.path.join(args.work, 'try'))
        return 1 if gaps else 0

    # the contents page
    rows = []

    def chapter_row(c):
        s = c['slug']
        label = '<span class="num">%s</span> %s' % (c['num'], titles[s]) if c['num'] else titles[s]
        if s in results:
            secs = [t for t in results[s]['toc'] if t[0] == 2]
            sub = ''
            if secs:
                sub = '<details class="secs"><summary>%d sections</summary><ol>%s</ol></details>' % (len(secs), ''.join(
                    '<li><a href="%s.html#%s">%s %s</a></li>' % (s, hid, num, title) for _, num, title, hid in secs))
            return '<li class="done" data-slug="%s"><a href="%s.html">%s</a>%s</li>' % (s, s, label, sub)
        return '<li class="todo">%s <span class="pending">not converted yet</span></li>' % label
    rows.append('<ul class="chapters">%s</ul>' % chapter_row(st.chapters[0]))
    listed = {st.chapters[0]['slug']}
    for p in st.parts:
        rows.append('<h3><span class="num">Part %s</span> %s</h3>' % (p['num'], p['html']))
        rows.append('<ul class="chapters">%s</ul>' % ''.join(chapter_row(c) for c in p['chapters']))
        listed.update(c['slug'] for c in p['chapters'])
    n_all = len(st.chapters) - 1
    n_done = len([c for c in st.chapters if c['slug'] in results and c['kind'] != 'front'])
    index = '''<header class="masthead">
<p class="eyebrow">Working draft of 19 July 2012, with the changes of the 2026 revival</p>
<h1>%s</h1>
<p class="standfirst">Eric Allen, David Chase, Joe Hallett, Victor Luchangco, Jan-Willem Maessen, Sukyoung Ryu, Guy L. Steele Jr. and Sam Tobin-Hochstadt; with Joao Dias, Carl Eastlund, Christine Flood, Yossi Lev, Cheryl McCosh, Janus Dam Nielsen and Dan Smith. © Sun Microsystems, Inc.</p>
</header>
<p class="legend"><strong>The notation of this edition.</strong> %s</p>
<div id="continue"></div>
<details class="words">
<summary><strong class="w-head">How this edition works</strong> <span class="w-lead">A reading edition for a phone: your place, your notes, the code examples, the revival's changes.</span></summary>
<ul>
<li>%s</li>
<li>The page remembers where you stopped, in this browser, and offers to continue there.</li>
<li>The pencil at the end of a paragraph, a code example or a heading attaches a note to it. <a href="notes.html">Notes</a> lists them all, and exports them as text.</li>
<li>The examples, the displayed formulas, the tables and the grammar are set by LaTeX from the specification’s own source, as in the PDF, and shown as pictures whose text can be selected. A wide one scrolls sideways inside its frame. Code words and formulas inside a sentence are ordinary text.</li>
<li>A code example that has a source form shows it too: the Fortress that a person types. The switch above an example changes them all.</li>
<li>A box headed “Revised by the 2026 revival” marks a passage that the revival changed, on the tinted ground of the revival’s additions. A box headed “Draft note” is a note of the original authors.</li>
<li>Beside an address of the authors’ text, “archived copy” is this edition’s link to the Internet Archive.</li>
<li>The Select button beside a heading selects that section's text, for Speak.</li>
</ul>
</details>
<section class="part contents">
<h2>Contents</h2>
%s
</section>
<footer class="colophon">Built from <code>Specification/</code> of <a href="https://github.com/palimondo/fortress">the revival's repository</a>. The <a href="../revival-story/">revival's story so far</a> is another page of this site.</footer>''' % (
        SPEC_TITLE, LEGEND,
        'All %d chapters and appendices are here.' % n_all if n_done == n_all else
        '%d of the %d chapters and appendices are converted. The others are listed below and marked.' % (n_done, n_all),
        '\n'.join(rows))
    with open(os.path.join(out, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(page(SPEC_TITLE, index, 'index', 'index', 'Contents', 'Fortress specification'))

    notes = '''<header class="masthead">
<p class="eyebrow">%s</p>
<h1>Your notes</h1>
<p class="standfirst">Notes are kept in this browser only. Export them to keep them, or to bring them to an assistant.</p>
</header>
<div id="storage-warning"></div>
<section class="part" id="export">
<h2>Export</h2>
<p>The text below holds every note: its chapter, its section, a link to the place, the first words of the passage, and the note.</p>
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
</section>''' % SPEC_TITLE
    with open(os.path.join(out, 'notes.html'), 'w', encoding='utf-8') as f:
        f.write(page('Notes · Fortress specification', notes, 'notes', 'notes', 'Notes', 'Your notes'))

    refs = '''<header class="masthead">
<p class="eyebrow">%s</p>
<h1>References</h1>
<p class="standfirst">The entries of the specification's bibliography file, under the keys that the text cites them by. The printed specification numbers the works that it cites; this edition shows the keys.</p>
</header>
<section class="part refs">
%s
</section>''' % (SPEC_TITLE, archive_links(bibliography(conv)))
    with open(os.path.join(out, 'references.html'), 'w', encoding='utf-8') as f:
        f.write(page('References · Fortress specification', refs, 'plain', 'references', 'References', 'References'))

    print('contents: %d of %d chapters and appendices converted; pages in %s' % (n_done, n_all, os.path.relpath(out, ROOT)))
    if gaps:
        print('GAPS: %d constructs did not convert (marked in the pages)' % gaps)
    return 1 if gaps else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--chapters', default=','.join(DEFAULT_CHAPTERS), help='slugs of the chapters to publish, comma-separated; all of them if none is named')
    ap.add_argument('--try', dest='only', help='convert these chapters (or: all) into the work folder only, and print what did not convert')
    ap.add_argument('--list', action='store_true', help='print every chapter with its slug')
    ap.add_argument('--out', default=DEFAULT_OUT)
    ap.add_argument('--work', default='/tmp/spec-html-work', help='scratch folder: the examples as foreg renders them')
    ap.add_argument('--base', default=DEFAULT_BASE, help='public address of the pages, for the links in exported notes')
    sys.exit(build(ap.parse_args()))


if __name__ == '__main__':
    main()
