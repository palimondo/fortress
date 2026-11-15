"""The three notations of a piece of Fortress code on the walk-through's pages.

    source    the ASCII that a person types (what the pages showed before)
    typeset   Fortify's LaTeX: a quoted line becomes an SVG drawn in currentColor (emacs with Fortify/fortify.el,
              then latex, then dvisvgm, as the specification reader's spec2html.py does for an example);
              a code word inside a sentence becomes HTML text (tex_html below), as the reader's inline code does
    unicode   the source after the specification's ASCII conversion (Appendix "ASCII to Unicode", operators.tex)

build.py asks for a key while it converts the text (line(), fragment(), inline()), calls run() once, and
then reads the results. Everything is kept in the work folder under a hash of its input.

Where Fortify's output is wrong for this program, OVERRIDES below corrects it; README.md lists the table.
Fortify/ itself is not edited. No SVG holds a font: Fonts collects the TeX fonts that the SVGs name and
writes them once, as the specification reader does (build_fonts in spec2html.py).
"""
import base64
import io
import hashlib
import html
import json
import re
import os
import shutil
import subprocess
from pathlib import Path

EM_PER_PT = 0.1


def sha(text, n=10):
    return hashlib.sha1(text.encode('utf-8')).hexdigest()[:n]


def esc(text):
    return html.escape(text, quote=False)


# ---------------------------------------------------------------- Unicode: the specification's ASCII conversion

GREEK = dict(alpha='α', beta='β', gamma='γ', delta='δ', epsilon='ε', zeta='ζ', eta='η', theta='θ', iota='ι',
             kappa='κ', mu='μ', nu='ν', xi='ξ', rho='ρ', sigma='σ', tau='τ', upsilon='υ', phi='φ',
             chi='χ', psi='ψ', omega='ω', GAMMA='Γ', DELTA='Δ', THETA='Θ', LAMBDA='Λ', XI='Ξ', PI='Π', SIGMA='Σ',
             PHI='Φ', PSI='Ψ', OMEGA='Ω')
# short names of operators (Specification/appendices/operators.tex) and of non-operator characters.
# SUM and PROD are left as typed: today's parser takes the signs U+2211 and U+220F as prefix operators and
# not as big operators (the gap ledger's row 5), so the Unicode form with them would not be this program.
WORDS = dict(DOT='·', SQRT='√', TIMES='×', BY='×', CROSS='×', DIV='÷', LE='≤', GE='≥', NE='≠',
             AND='∧', OR='∨', NOT='¬', CUP='∪', CAP='∩', IN='∈', NOTIN='∉', SUBSET='⊂', SUBSETEQ='⊆', EMPTYSET='∅',
             INF='∞', OPLUS='⊕', OTIMES='⊗', CIRC='∘', FORALL='∀', EXISTS='∃')
# ASCII shorthand, longest first (Appendix "ASCII to Unicode", "Converting ASCII Symbol Sequences"; <- in operators.tex)
SHORT = [('[\\', '⟦'), ('\\]', '⟧'), ('|->', '↦'), ('=/=', '≠'), ('->', '→'), ('=>', '⇒'), ('<-', '←'),
         ('>=', '≥'), ('<=', '≤')]
UNI_RE = re.compile(r'(\(\*.*?\*\)|\(\*.*$|"(?:[^"\\]|\\.)*")|([A-Za-z_][A-Za-z0-9_\']*)|(%s)'
                    % '|'.join(re.escape(a) for a, _ in SHORT))


def unicode_form(src, in_comment=False):
    """One line (or a fragment) of ASCII source after ASCII conversion. Strings and comments are left as they are.
    Returns (text, still inside a comment?)."""
    if in_comment:
        end = src.find('*)')
        if end < 0:
            return src, True
        rest, _ = unicode_form(src[end + 2:])
        return src[:end + 2] + rest, False
    open_comment = False

    def word(w):
        if w in WORDS:
            return WORDS[w]
        if w in GREEK:
            return GREEK[w]
        # a Greek letter's short name at the start before an underscore or a digit, at the end after an
        # underscore, or between two underscores, is replaced by the letter
        parts = w.split('_')
        if len(parts) > 1:
            parts = [GREEK.get(p, p) for p in parts]
            return '_'.join(parts)
        m = re.match(r'^([A-Za-z]+)(\d.*)$', w)
        if m and m.group(1) in GREEK:
            return GREEK[m.group(1)] + m.group(2)
        return w

    def sub(m):
        nonlocal open_comment
        if m.group(1):
            if m.group(1).startswith('(*') and not m.group(1).endswith('*)'):
                open_comment = True
            return m.group(1)
        if m.group(2):
            return word(m.group(2))
        return dict(SHORT)[m.group(3)]

    return UNI_RE.sub(sub, src), open_comment


# ---------------------------------------------------------------- Fortify's LaTeX as HTML text (inside a sentence)

class NoHtml(Exception):
    pass


BB = dict(zip('NZQRC', 'ℕℤℚℝℂ'))
SYMS = dict(llbracket='⟦', rrbracket='⟧', bigllbracket='⟦', bigrrbracket='⟧', Bigllbracket='⟦', Bigrrbracket='⟧',
            rightarrow=' → ', leftarrow=' ← ', Rightarrow=' ⇒ ', mapsto=' ↦ ', cdot=' · ', times=' × ', div=' ÷ ',
            sum='<span class="big">∑</span>', prod='<span class="big">∏</span>', surd='√', vert='|', ldots='…',
            leq=' ≤ ', geq=' ≥ ', neq=' ≠ ', lbrace='{', rbrace='}', wedge=' ∧ ', vee=' ∨ ', neg='¬', cup=' ∪ ',
            cap=' ∩ ', equiv=' ≡ ', langle='⟨', rangle='⟩', infty='∞', emptyset='∅', oplus=' ⊕ ', otimes=' ⊗ ',
            circ=' ∘ ', forall='∀', exists='∃', COLON=':\u2009', COLONOP=':\u2009', ASSIGN=' := ', top='⊤', bot='⊥')
SYMS['in'] = ' ∈ '
SYMS.update({k: '<i>%s</i>' % v for k, v in GREEK.items() if k.islower()})
SYMS['epsilon'] = '<i>ϵ</i>'           # LaTeX's \epsilon is the lunate form
SYMS.update({k[0] + k[1:].lower(): v for k, v in GREEK.items() if k.isupper()})
FUNCS = set('sin cos tan exp log ln max min gcd lcm sinh cosh tanh arcsin arccos arctan'.split())
SKIP = set('left right bigl bigr Bigl Bigr biggl biggr textstyle displaystyle limits nolimits rm tt verythin '
           'ultrathin null relax'.split())
WRAP = dict(VAR='<i>%s</i>', TYP='<span class="ty">%s</span>', KWD=' <span class="kw">%s</span> ',
            KWDVAR='<span class="kw">%s</span>', OPR=' <span class="op">%s</span> ',
            BIGOPR='<span class="op">%s</span> ', STR='<span class="str">%s</span>', mathrm='<span class="rm">%s</span>',
            mathit='<i>%s</i>', mathtt='<span class="tt">%s</span>', mathopen='%s', mathclose='%s', mathord='%s',
            mathbin='\u2009%s\u2009', mathrel=' %s ', mathop='%s ', EXP='%s', hbox='%s', mathbf='<b>%s</b>',
            sqrt='√<span class="ovl">%s</span>')


def tex_html(tex):
    """The LaTeX that Fortify writes for a short piece of code, as HTML text in the reader's .m classes.
    Raises NoHtml on a command that has no rendering here: the caller then keeps the source form."""
    out = _conv(tex, False)
    out = re.sub(r'\s+', ' ', out).strip()
    out = re.sub(r'([(⟦]) ', r'\1', out)
    out = out.replace(' + = ', ' += ')
    return re.sub(r' ([,;)⟧])', r'\1', out)


def _group(tex, i):
    if i < len(tex) and tex[i] == '{':
        depth, k = 1, i + 1
        while k < len(tex) and depth:
            if tex[k] == '\\':
                k += 2
                continue
            depth += {'{': 1, '}': -1}.get(tex[k], 0)
            k += 1
        return tex[i + 1:k - 1], k
    if i < len(tex) and tex[i] == '\\':
        m = re.match(r'\\([A-Za-z]+|.)', tex[i:])
        return m.group(0), i + len(m.group(0))
    return tex[i:i + 1], i + 1


def _over(tex):
    """The two sides of a TeX fraction, A \\over B, when \\over stands at the top level of tex; or None."""
    depth, i = 0, 0
    while i < len(tex):
        c = tex[i]
        if c == '\\':
            m = re.match(r'\\([A-Za-z]+|.)', tex[i:])
            if m.group(1) == 'over' and depth == 0:
                return tex[:i], tex[i + 5:]
            i += len(m.group(0))
            continue
        depth += {'{': 1, '}': -1}.get(c, 0)
        i += 1
    return None


def _conv(tex, plain):
    sides = _over(tex)
    if sides:                # a built fraction, as the reader's .m .frac sets it
        return '<span class="frac"><span>%s</span><span>%s</span></span>' % (_conv(sides[0], plain), _conv(sides[1], plain))
    out, i = [], 0
    while i < len(tex):
        c = tex[i]
        if c == '\\':
            m = re.match(r'\\([A-Za-z]+)\s*', tex[i:])
            if not m:
                d = tex[i + 1:i + 2]
                i += 2
                out.append({',': '\u2009', ';': ' ', ' ': ' ', '!': '', ':': ' '}.get(d, esc(d)))
                continue
            name = m.group(1)
            i += len(m.group(0))
            if name in WRAP:
                g, i = _group(tex, i)
                out.append(WRAP[name] % _conv(g, plain or name not in ('EXP', 'mathopen', 'mathclose', 'mathord',
                                                                         'mathbin', 'mathrel', 'mathop', 'sqrt',
                                                                         'hbox')))
            elif name == 'mathbb':
                g, i = _group(tex, i)
                out.append(BB.get(g, g))
            elif name == 'usefont':
                for _ in range(4):
                    _, i = _group(tex, i)
            elif name == 'char':
                m = re.match(r"'([0-7]+)", tex[i:])
                out.append(esc(chr(int(m.group(1), 8))))
                i += len(m.group(0))
            elif name in SYMS:
                out.append(SYMS[name])
            elif name in FUNCS:
                out.append('<span class="rm">%s</span>' % name)
            elif name in SKIP:
                pass
            else:
                raise NoHtml(name)
        elif c in '^_':
            g, i = _group(tex, i + 1)
            tag = 'sup' if c == '^' else 'sub'
            out.append('<%s>%s</%s>' % (tag, _conv(g, plain), tag))
        elif c == '{':
            g, i = _group(tex, i)
            out.append(_conv(g, plain))
        elif c == '`' and tex[i:i + 2] == '``':
            out.append('“')
            i += 2
        elif c == "'" and tex[i:i + 2] == "''":
            out.append('”')
            i += 2
        elif c.isalpha() and not plain:
            out.append('<i>%s</i>' % c)
            i += 1
        elif c == '-' and not plain:
            out.append('−')
            i += 1
        elif c in '=<>+' and not plain:
            out.append(' %s ' % esc(c))
            i += 1
        elif c == '~':
            out.append(' ')
            i += 1
        else:
            out.append(esc(c))
            i += 1
    return ''.join(out)


# ---------------------------------------------------------------- where Fortify's output is corrected

# Each entry: the source text, what Fortify writes for it, what the pages set instead, and the reason.
# An entry applies to every row (a line or a code word) whose source holds `src` and whose LaTeX holds
# `fortify`. The build stops if an entry applies nowhere: the program or Fortify has changed. README.md
# lists the table. Fortify/ is the team's tool and is not edited here.
OVERRIDES = [
    dict(src='g0[i]', fortify=r'g_0_{i}', fixed=r'g_0[i]',
         why='LaTeX refuses a second subscript ("Double subscript") and prints 0 and i side by side; the index '
             'keeps its brackets, as Fortify sets an index of two (the gap ledger\'s row 62).'),
    dict(src='BIG MAX', fortify=r'\BIGOPR{MAX}', fixed=r'\mathop{\mathtt{BIG\ MAX}}',
         why='Fortify sets the big operator as one large MAX: the word BIG, which the program types and the text '
             'names, is not on the page.'),
    dict(src=r'(m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]', fortify=r'^{T\llbracket\KWD{nat} r, \KWD{nat} c\rrbracket}',
         fixed=r'^{T}\llbracket\KWD{nat} r, \KWD{nat} c\rrbracket',
         why='Fortify sets the declaration\'s static parameters inside the exponent, beside T; they are not '
             'part of the operator.'),
    dict(src=r'^T[\nat a, nat b, nat c\]', fortify=r'^{T\llbracket\KWD{nat} a, \KWD{nat} b, \KWD{nat} c\rrbracket}',
         fixed=r'^{T}\llbracket\KWD{nat} a, \KWD{nat} b, \KWD{nat} c\rrbracket',
         why='The same, in the declaration for a rank-3 array.'),
    dict(src='⍤', fortify=r'\FortressUnknownCharacter{U+2364}', fixed=r'\(\ddot{\circ}\)',
         why='Fortify prints a box with the code point for APL\'s rank sign, in a comment; the sign is drawn '
             'as a small circle under two dots.'),
    dict(src='⌷', fortify=r'\FortressUnknownCharacter{U+2337}', fixed=r'{\fboxsep=0pt\fbox{\phantom{l}}}',
         why='The same for APL\'s index sign, in a comment; the sign is drawn as an upright box.'),
    dict(src='(* ^T on a matrix', fortify=r"{\char'136}T", fixed=r"{\tt\char'136}T",
         why='In a comment, Fortify sets the sign ^ in the roman font, where that place holds the circumflex '
             'accent; the typewriter font has the sign.'),
    dict(src='name: Type := value', fortify=r'\KWD{value}', fixed=r'\VAR{value}',
         why='In this pattern of the text, value is a placeholder; Fortify sets it as the keyword value.'),
]


def override(src, tex, used=None):
    """tex with every entry of OVERRIDES that applies to this source text."""
    if not tex:
        return tex
    for n, o in enumerate(OVERRIDES):
        if o['src'] in src and o['fortify'] in tex:
            tex = tex.replace(o['fortify'], o['fixed'])
            if used is not None:
                used.add(n)
    return tex


# ---------------------------------------------------------------- the fonts, shared by every SVG

FONT_CHUNK = 32


class Fonts:
    """No SVG holds a font. An SVG's text names a class, f-FONT-SIZE, and tex-fonts.css gives each class its
    TeX font and size and each font its files, as the specification reader does (build_fonts in
    explorations/coordinator/tools/spec-html/spec2html.py, whose method this is). dvisvgm 3.2.1 loses a run
    of characters when it writes a whole font at once, so each font is written in pieces of FONT_CHUNK
    characters, and each piece is a face of the family with its own unicode-range; a browser fetches the
    pieces whose characters a page shows."""

    def __init__(self):
        self.classes = {}        # class name -> (family, size)
        self.used = {}           # family -> set of characters

    def strip(self, svg):
        """The SVG without its style: every text gets the shared class of its font and size."""
        fonts = dict((c, (fam, '%.2f' % float(size))) for c, fam, size in
                     re.findall(r'text\.(\w+) \{font-family:([^;]+);font-size:([\d.]+)px\}', svg))
        svg = re.sub(r"<style[^>]*>.*?</style>\s*", '', svg, flags=re.S)

        def cls(m):
            fam, size = fonts[m.group(1)]
            name = 'f-%s-%s' % (fam, size.replace('.', ''))
            self.classes[name] = (fam, size)
            return "class='%s'" % name
        for c, text in re.findall(r"<text class='(\w+)'[^>]*>(.*?)</text>", svg, flags=re.S):
            if c in fonts:
                self.used.setdefault(fonts[c][0], set()).update(html.unescape(re.sub(r'<[^>]+>', '', text)))
        return re.sub(r"class='(\w+)'", lambda m: cls(m) if m.group(1) in fonts else m.group(0), svg)

    def build(self, work, out):
        """Writes out/fonts/*.woff2 and out/tex-fonts.css. Returns the problems found, as text lines."""
        from fontTools.ttLib import TTFont
        folder = Path(work) / 'fonts'
        folder.mkdir(parents=True, exist_ok=True)
        fams = sorted(self.used)
        stamp, key = folder / 'stamp', ' '.join(fams) + ' chunk %d' % FONT_CHUNK
        if not (stamp.exists() and stamp.read_text() == key):
            for f in folder.iterdir():
                f.unlink()
            tex = ['\\documentclass{article}\n\\begin{document}\n\\newbox\\dispbox\n'
                   '\\def\\c#1{\\iffontchar\\f#1 \\char#1\\ \\fi}\n'
                   '\\def\\sheet#1{\\font\\f=#1 at 10pt %s}\n' % ''.join(
                       '\\setbox\\dispbox\\hbox{\\f %s}\\ifdim\\wd\\dispbox>0pt \\shipout\\box\\dispbox\\fi\n'
                       % ''.join('\\c{%d}' % c for c in range(k, k + FONT_CHUNK)) for k in range(0, 256, FONT_CHUNK))]
            tex += ['\\sheet{%s}\n' % f for f in fams]
            tex.append('\\end{document}\n')
            (folder / 's.tex').write_text(''.join(tex))
            subprocess.run(['latex', '-interaction=nonstopmode', 's.tex'], cwd=folder, capture_output=True)
            for fmt, pat in (('woff2', 's%p.svg'), ('ttf', 't%p.svg')):
                subprocess.run(['dvisvgm', '--bbox=min', '--page=1-', '--font-format=' + fmt, '-o', pat, 's.dvi'],
                               cwd=folder, capture_output=True)
            stamp.write_text(key)
        pieces = {}          # family -> [(woff2 bytes, set of code points)]
        for f in sorted(folder.glob('s*.svg'), key=lambda f: int(re.sub(r'\D', '', f.stem) or 0)):
            t = folder / ('t' + f.name[1:])
            if not re.fullmatch(r's\d+\.svg', f.name) or not t.exists():
                continue
            m = re.search(r'@font-face\{font-family:([^;]+);src:url\(data:application/x-font-woff2;base64,([A-Za-z0-9+/=]+)\)',
                          f.read_text())
            tt = re.search(r'@font-face\{font-family:([^;]+);src:url\(data:application/x-font-ttf;base64,([A-Za-z0-9+/=]+)\)',
                           t.read_text())
            if not m or not tt:
                continue
            cmap = TTFont(io.BytesIO(base64.b64decode(tt.group(2)))).getBestCmap()
            pieces.setdefault(m.group(1), []).append((base64.b64decode(m.group(2)), set(cmap)))
        fdir = Path(out) / 'fonts'
        if fdir.is_dir():
            shutil.rmtree(fdir)
        fdir.mkdir(parents=True)
        css = ['/* The fonts of the code and the formulas that LaTeX sets, made by dvisvgm from the TeX fonts. Each\n'
               '   font comes in pieces, and a browser fetches only the pieces whose characters a page shows. */\n']
        problems = []
        for fam in fams:
            have = set()
            for i, (data, cps) in enumerate(pieces.get(fam, [])):
                have |= cps
                if not any(ord(ch) in cps for ch in self.used[fam]):
                    continue             # no page shows a character of this piece
                fname = '%s-%d.woff2' % (fam, i)
                (fdir / fname).write_bytes(data)
                rng, run = [], None
                for c in sorted(cps):
                    if run and c == run[1] + 1:
                        run[1] = c
                    else:
                        run = [c, c]
                        rng.append(run)
                css.append('@font-face{font-family:%s;src:url(fonts/%s) format("woff2");font-display:block;unicode-range:%s}\n'
                           % (fam, fname, ','.join('U+%X' % a if a == b else 'U+%X-%X' % (a, b) for a, b in rng)))
            missing = sorted(ord(c) for c in self.used[fam] if ord(c) not in have and c not in ' \n\t')
            if missing:
                problems.append('font %s lacks %d characters that the pages use: %s'
                                % (fam, len(missing), ' '.join('U+%04X' % c for c in missing[:12])))
        for name, (fam, size) in sorted(self.classes.items()):
            css.append('svg text.%s{font-family:%s;font-size:%spx}\n' % (name, fam, size))
        (Path(out) / 'tex-fonts.css').write_text(''.join(css))
        return problems


# ---------------------------------------------------------------- Fortify: emacs, latex, dvisvgm

WIDTH = 176          # points: the widest typeset line on a phone 390 px wide (10 pt is 1 em of 16 px)
PREAMBLE = r"""\documentclass[10pt]{article}
\usepackage{fortify}
\pagestyle{empty}
\begin{document}
\newbox\rowbox \newdimen\W \W=%dpt
\tolerance=10000 \hbadness=10000 \hfuzz=\maxdimen \relpenalty=50 \binoppenalty=150
\def\SHIP{\shipout\hbox{\special{dvisvgm:bbox \the\wd\rowbox\space\the\ht\rowbox\space\the\dp\rowbox}%%
\special{dvisvgm:raw <desc>base={?y}</desc>}\box\rowbox}}
%% a row that is wider than the screen is set as a paragraph: TeX breaks it after a relation, an operator
%% or a comma, and the lines after the first hang by 1.6 em. #1 is the row's indentation.
\def\WRAP#1#2{\ifdim\wd\rowbox>\dimexpr\W-#1\relax \setbox\rowbox\vtop{\hsize=\dimexpr\W-#1\relax
\rightskip=0pt plus 1fil \parindent=0pt \hangindent=1.6em \hangafter=1 \lineskip=1.5pt \lineskiplimit=1.5pt
\noindent #2}\fi}
\def\ROW#1#2{\setbox\rowbox\hbox{\FortressInnerMacros\let\*=\fortresslinecomment\strut\(\displaystyle #2\null\)}%%
\WRAP{#1}{\FortressInnerMacros\let\*=\fortresslinecomment\strut\(\displaystyle #2\null\)\strut}\SHIP}
\def\TROW#1#2{\setbox\rowbox\hbox{\FortressOuterMacros\rm\strut #2}%%
\WRAP{#1}{\FortressOuterMacros\rm\strut #2\strut}\SHIP}
""" % WIDTH
VERSION = 'fonts shared, 2'          # a change of what clean() or page() writes: every SVG is set again
TABS = re.compile(r'\\[123]|\\\+|\\-(?![A-Za-z])')
STRING = re.compile(r"\\hbox\{\\rm\\usefont\{T1\}\{ptm\}\{m\}\{n\}``\\STR\{((?:[^{}]|\{[^{}]*\})*)\}''\}")


def comment_text(text):
    """The words of a comment, set as text. TeX would draw a run of hyphens as one rule (-- and --- are its
    dashes); a penalty after each hyphen of a run keeps the hyphens apart, and lets a long run break."""
    return re.sub(r'-{2,}', lambda m: '-\\penalty0{}' * len(m.group(0)), text)


def string_breaks(row):
    """A string is one box, which TeX cannot break. It is cut into boxes after each space and each slash, so
    that a row with a long string can be broken there when the row is wider than the screen."""
    def cut(m):
        pieces = [p for p in re.split(r'(?<=~)(?=[^~])|(?<=/)(?=[^/~.])', m.group(1)) if p]
        if len(pieces) < 2:
            return m.group(0)
        out = []
        for i, p in enumerate(pieces):
            out.append('\\hbox{\\rm\\usefont{T1}{ptm}{m}{n}%s\\STR{%s}%s}'
                       % ('``' if i == 0 else '', p, "''" if i == len(pieces) - 1 else ''))
        return '\\penalty250 '.join(out)
    return STRING.sub(cut, row)


def trailing_comment(m):
    """A comment after code on its line is one box in Fortify's output. It is cut into a box for each word, so
    that the row can be broken inside it."""
    words = ['\\hbox{\\FortressOuterMacros\\rm\\ %s}' % w for w in comment_text(m.group(1)).split(' ') if w]
    return '\\penalty250 '.join(['\\hbox{\\tt(*}'] + words + ['\\hbox{\\ \\tt*)}'])


class Fortify:
    def __init__(self, root, prog, work):
        self.root, self.prog = Path(root), Path(prog)
        self.dir = Path(work) / 'fortify'
        self.dir.mkdir(parents=True, exist_ok=True)
        self.cache_file = self.dir / 'tex.json'
        self.cache = json.loads(self.cache_file.read_text()) if self.cache_file.exists() else {}
        self.want_files, self.want_frag = set(), {}
        self.rows = {}           # key -> LaTeX of one row
        self.faults = []
        self.used = set()        # the entries of OVERRIDES that applied
        self.fonts = Fonts()

    # --- what the build asks for
    def line(self, name, n):
        self.want_files.add(name)
        return 'L|%s|%d' % (name, n)

    def fragment(self, text):
        self.want_frag[sha(text)] = text
        return 'F|' + sha(text)

    inline = fragment

    # --- emacs
    def _emacs(self, tic_name, fn='fortick'):
        subprocess.run(['emacs', '-batch', tic_name, '-l', str(self.root / 'Fortify' / 'fortify.el'),
                        '-l', str(Path(__file__).resolve().parent / 'fragments.el'), '-f', fn],
                       cwd=self.dir, capture_output=True, text=True)
        return (self.dir / tic_name).with_suffix('.tex').read_text(encoding='utf-8')

    def file_rows(self, name):
        """Fortify sets the whole file, so that a line is read in its context (a comment over several lines,
        a block's do and end). Its output has one line for each line of the file."""
        text = (self.prog / name).read_text(encoding='utf-8')
        k = 'file|' + sha(text)
        if k not in self.cache:
            (self.dir / 'file.tic').write_text(text.rstrip('\n') + '\n', encoding='utf-8')
            tex = self._emacs('file.tic', 'walk-file')
            m = re.search(r'\\begin\{FortressCode\}\n(.*)\n\\end\{FortressCode\}', tex, re.S)
            self.cache[k] = m.group(1).split('\n') if m else []
        rows, src = self.cache[k], text.rstrip('\n').split('\n')
        if len(rows) != len(src):
            raise SystemExit('Fortify gave %d lines for the %d of %s' % (len(rows), len(src), name))
        out, comment = [], False
        for row, s in zip(rows, src):
            row = re.sub(r'\s*\\\\$', '', row)
            if comment or re.search(r'\\FortressBegin(FlushRight)?Comment', row):
                # a comment over several lines: Fortify sets it as a ruled paragraph that it fills again.
                # Line by line, it is set here as the line's own words in roman type between (* and *).
                ends = '\\FortressEndComment' in row
                body = re.sub(r'\\Fortress(Begin(FlushRight)?|End)Comment\s*', '', row)
                row = '%%TEXT%%%s%s%s' % ('' if comment else '{\\tt(*}\\ ', comment_text(body),
                                                                    '\\ {\\tt*)}' if ends else '')
                comment = not ends
            else:
                row = TABS.sub('', row)
                m = re.match(r'^\\fortressonelinecomment\{\(\*\}\{(.*)\}\{\*\)\}$', row.strip())
                if m:                   # a comment on a line of its own: as text, so that a long one can be broken
                    row = '%TEXT%{\\tt(*}' + comment_text(m.group(1)) + '{\\tt*)}'
            out.append(override(s, row, self.used))
        return out

    def run(self):
        todo = {k: t for k, t in self.want_frag.items() if 'frag|' + k not in self.cache}
        if todo:
            tic = ''.join('@@I%s@@ `%s` @@E@@\n\n' % (k, t) for k, t in todo.items())
            (self.dir / 'frag.tic').write_text(tic, encoding='utf-8')
            tex = self._emacs('frag.tic', 'walk-fragments')
            for k, t in re.findall(r'@@I(\w+)@@ (.*?) @@E@@', tex, re.S):
                if t.startswith('@@ERR'):
                    t = '!' + t[6:-2]
                self.cache['frag|' + k] = t
        for k, src in self.want_frag.items():
            t = self.cache.get('frag|' + k)
            if t and t.startswith('!'):
                self.faults.append('Fortify stops on the fragment  %s  : %s' % (src, t[1:]))
                t = None
            self.rows['F|' + k] = override(src, t, self.used)
        for name in self.want_files:
            for n, row in enumerate(self.file_rows(name), 1):
                self.rows['L|%s|%d' % (name, n)] = row
        self.cache_file.write_text(json.dumps(self.cache), encoding='utf-8')
        for n, o in enumerate(OVERRIDES):
            if n not in self.used:
                self.faults.append('the correction for  %s  applies to no row: the program or Fortify has changed'
                                   % o['src'])

    # --- SVG
    def render(self, keys):
        """Sets each wanted row, a (key, indentation in em) pair, on a page of its own and converts the pages to SVG."""
        keys = [k for k in dict.fromkeys(keys) if self.rows.get(k[0]) and self.rows[k[0]].strip()]
        todo = [k for k in keys if not self.svg_path(*k).exists()]
        if not todo:
            return
        body = '\n'.join(self.page(*k) for k in todo)
        (self.dir / 'rows.tex').write_text(PREAMBLE + body + '\n\\end{document}\n', encoding='utf-8')
        env = dict(os.environ, TEXINPUTS='.:%s:' % (self.root / 'Fortify'))
        r = subprocess.run(['latex', '-interaction=nonstopmode', 'rows.tex'], cwd=self.dir, capture_output=True,
                           text=True, env=env)
        errs = re.findall(r'^! .*', r.stdout, re.M)
        if errs:
            self.faults.append('latex: ' + '; '.join(sorted(set(errs))))
        for old in self.dir.glob('pg*.svg'):
            old.unlink()
        r = subprocess.run(['dvisvgm', '--font-format=woff2', '--exact-bbox', '--precision=3', '--page=1-',
                            '--output=pg%p.svg', 'rows.dvi'], cwd=self.dir, capture_output=True, text=True)
        if r.returncode:
            raise SystemExit('dvisvgm failed: ' + r.stderr[-2000:])
        pages = {int(re.sub(r'\D', '', p.stem)): p for p in self.dir.glob('pg*.svg')}
        if len(pages) != len(todo):
            raise SystemExit('LaTeX set %d pages for %d rows: see %s' % (len(pages), len(todo), self.dir / 'rows.log'))
        for n, k in enumerate(todo, 1):
            self.svg_path(*k).write_text(self.clean(pages[n].read_text(encoding='utf-8')), encoding='utf-8')
            pages[n].unlink()

    def page(self, k, pad):
        row = self.rows[k]
        if row.startswith('%TEXT%'):
            return '\\TROW{%.1fpt}{%s}' % (pad * 10, row[6:])
        row = self.math(row)
        # TeX breaks a formula after a relation or an operator; a comma may end a line too
        row = re.sub(r',(\s)', r',\\allowbreak\1', row)
        # dearer places, taken only when a line has no better one: after a declaration's colon, after a slash,
        # after a semicolon, after do, then and else, before a juxtaposed operand, before a method call's dot,
        # before a string and inside it
        row = row.replace('\\COLON ', '\\COLON\\penalty400 ').replace(' / ', ' /\\penalty300 ')
        row = re.sub(r'(;|\\KWD\{(?:do|then|else)\}) ', r'\1\\penalty200 ', row)
        row = row.replace('\\, ', '\\,\\penalty300 ').replace('\; ', '\;\\penalty300 ')
        row = row.replace('.\\VAR{', '\\penalty450 .\\VAR{')          # before the dot of a method call
        row = STRING.sub(lambda m: '\\penalty400 ' + m.group(0), row)     # before a string
        row = string_breaks(row)
        row = re.sub(r'\\fortressonelinecomment\{\(\*\}\{(.*)\}\{\*\)\}', trailing_comment, row)
        # TeX cannot break between \left and \right: parentheses of the next fixed size stand in their place
        row = row.replace('\\left(', '\\bigl(').replace('\\right)', '\\bigr)')
        return '\\ROW{%.1fpt}{%s}' % (pad * 10, row)

    @staticmethod
    def math(row):
        """A row of a block is math already; a fragment comes wrapped in \\EXP{...} or as one \\VAR{...}."""
        m = re.match(r'^\\EXP\{(.*)\}$', row.strip(), re.S)
        return (m.group(1) if m else row).strip()

    def svg_path(self, k, pad):
        return self.dir / ('s%s.svg' % sha(PREAMBLE + VERSION + self.page(k, pad)))

    def svg(self, k, pad):
        if not self.rows.get(k) or not self.rows[k].strip():
            return ''
        return self.fonts.strip(self.svg_path(k, pad).read_text(encoding='utf-8'))

    @staticmethod
    def clean(svg):
        """One SVG serves light and dark: it is drawn in the text's colour. Its sizes are in em, and it hangs
        below the line's baseline by its own depth, so it stands on the baseline of the line number.
        The embedded fonts are dropped when the SVG is put into a page (Fonts.strip)."""
        svg = re.sub(r'<\?xml[^>]*\?>\s*', '', svg)
        svg = re.sub(r'<!--.*?-->\s*', '', svg, flags=re.S)
        svg = svg.replace('<![CDATA[', '').replace(']]>', '')
        svg = re.sub(r'@font-face\{[^}]*\}\s*', '', svg)
        base = re.search(r'<desc>base=([-0-9.]+)</desc>', svg)
        svg = re.sub(r'<desc>base=[-0-9.]+</desc>\s*', '', svg)
        svg = re.sub(r"\s(xmlns:xlink|version)='[^']*'", '', svg)
        svg = re.sub(r"<g id='page\d+'>", '<g>', svg)
        head, _, rest = svg.partition('>')
        vb = [float(v) for v in re.search(r"viewBox='([^']+)'", head).group(1).split()]
        depth = (vb[1] + vb[3] - float(base.group(1))) if base else 0.0
        head = re.sub(r"(width|height)='([0-9.]+)pt'",
                      lambda m: "%s='%.3fem'" % (m.group(1), float(m.group(2)) * EM_PER_PT), head)
        return (head + " fill='currentColor' style='vertical-align:%.3fem' role='img'>" % (-depth * EM_PER_PT)
                + rest.strip() + '\n')
