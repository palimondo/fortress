#!/usr/bin/env python3
"""Compare the words of the reader's pages with the words of the specification's PDF.

Every paragraph, list item and heading of the pages under docs/specification/, and every display
that LaTeX set (the text inside its SVG), is reduced to its letters and digits, in order. The PDF
(Specification/fortress.pdf, through pdftotext) is reduced the same way. A block passes when its
runs of K characters are found in the PDF; a block that the conversion lost a row of, set from the
wrong source, or filled with something else, fails. Symbols, spacing, fonts and layout are not
compared here: compare.js compares each display's picture with LaTeX's own.

    python3 explorations/coordinator/tools/spec-html/pdfcheck.py            # every page
    python3 explorations/coordinator/tools/spec-html/pdfcheck.py types calculi -v

It prints, for each page, the number of blocks and those below the limit, and exits 1 if any
block that is not on the list of known differences (KNOWN, below) fails.
"""
import html
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
PAGES = os.path.join(ROOT, 'docs', 'specification')
PDF = os.path.join(ROOT, 'Specification', 'fortress.pdf')
K = 10            # length of a run of characters
LIMIT = 0.75      # share of a block's runs that the PDF must hold
SKIP_PAGES = {'index', 'notes', 'references'}
# Blocks that differ from the PDF for a reason that README.md gives: (page, first characters of the reduced block)
KNOWN = [('preface', 'aboutthisworkingdraft')]     # the reader's own title of the front matter


# pdftotext gives a glyph that has no Unicode name as the character of its code in the font: the white
# brackets of stmaryrd come out as J and K. dvisvgm puts such a glyph at U+E000 plus its code. The
# blackboard letters of the PDF are plain letters there. The pages are brought to the PDF's spelling.
SAME = {'⟦': 'J', '⟧': 'K', 'ℤ': 'Z', 'ℝ': 'R', 'ℕ': 'N', 'ℚ': 'Q', 'ℂ': 'C', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬀ': 'ff',
        'ﬃ': 'ffi', 'ﬄ': 'ffl'}


def reduce(text):
    text = ''.join(SAME.get(c, chr(ord(c) - 0xE000) if 0xE000 <= ord(c) < 0xE100 else c) for c in text)
    return re.sub(r'[^a-z0-9]', '', text.lower())


def pdf_runs():
    text = subprocess.run(['pdftotext', '-raw', PDF, '-'], capture_output=True, text=True).stdout
    pages = []
    for page in text.split('\f'):
        lines = page.rstrip().split('\n')
        while lines and re.fullmatch(r'\s*([0-9]+|[ivxl]+)?\s*', lines[-1]):
            lines.pop()                      # the page number
        pages.append('\n'.join(lines))
    whole = reduce(re.sub(r'-\n', '', '\n'.join(pages)))
    return {whole[i:i + K] for i in range(len(whole) - K + 1)}, whole


def blocks(page):
    """(kind, reduced text, first words) of each block of a page."""
    s = open(page, encoding='utf-8').read()
    s = s[s.index('<section class="sec chapter"'):] if '<section class="sec chapter"' in s else s
    s = re.sub(r'<nav class="(parts|pager)".*?</nav>', '', s, flags=re.S)
    s = re.sub(r'<footer.*?</footer>', '', s, flags=re.S)
    s = re.sub(r'<p class="(standfirst|legend|label)".*?</p>', '', s, flags=re.S)
    s = re.sub(r'<a class="ed[^>]*>.*?</a>', '', s, flags=re.S)
    s = re.sub(r'<pre class="fx-s">.*?</pre>', '', s, flags=re.S)        # the source form is not in the PDF
    s = re.sub(r'<span class="num">.*?</span>', '', s, flags=re.S)
    out = []

    def svg(m):
        text = ''.join(html.unescape(re.sub(r'<[^>]+>', '', t)) for t in re.findall(r'<text[^>]*>(.*?)</text>', m.group(0), flags=re.S))
        letters = sum(c.isalnum() and c.isascii() for c in text)
        kind = 'display' if letters >= 0.8 * len(text.replace(' ', '')) and letters >= 30 else 'formula'
        out.append(('%s %s' % (kind, re.search(r'data-d="(\d+)"', m.group(0)).group(1)), reduce(text), text[:60]))
        return ' '
    s = re.sub(r'<svg class="tx.*?</svg>', svg, s, flags=re.S)
    s = re.sub(r'<a class="cite"[^>]*>.*?</a>', ' ', s)                   # the PDF cites by number
    s = re.sub(r'<sup class="fnref">.*?</sup>', ' ', s)
    s = s.replace('<h2 id="footnotes">Footnotes</h2>', '')
    for m in re.finditer(r'<(p|h[1-4]|figcaption|dt|pre)\b[^>]*>(.*?)</\1>', s, flags=re.S):
        text = html.unescape(re.sub(r'<[^>]+>', '', m.group(2)))
        text = re.sub(r'^Figure [0-9A-J.]+: ', '', text)
        out.append((m.group(1), reduce(text), ' '.join(text.split())[:60]))
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('-')]
    verbose = '-v' in sys.argv
    runs, whole = pdf_runs()
    names = args or sorted(f[:-5] for f in os.listdir(PAGES) if f.endswith('.html') and f[:-5] not in SKIP_PAGES)
    total = bad = formulas = 0
    for name in names:
        fails = []
        bl = blocks(os.path.join(PAGES, name + '.html'))
        for kind, red, words in bl:
            if len(red) < K:
                ok = red in whole
                share = 1.0 if ok else 0.0
            else:
                grams = [red[i:i + K] for i in range(len(red) - K + 1)]
                share = sum(g in runs for g in grams) / len(grams)
                ok = share >= LIMIT
            if not ok and kind.startswith('formula'):
                formulas += 1            # mostly symbols: its words do not decide; compare.js looks at it
            elif not ok and not any(p == name and red.startswith(k) for p, k in KNOWN):
                fails.append((kind, share, words))
        total += len(bl)
        bad += len(fails)
        print('%-34s %5d blocks, %3d not in the PDF' % (name, len(bl), len(fails)))
        for kind, share, words in fails[:None if verbose else 6]:
            print('    %-12s %3d%%  %s' % (kind, round(share * 100), words))
    print('%d blocks compared with the PDF, %d not found there; %d more are displays of symbols whose few '
          'letters did not match, which this check cannot judge' % (total, bad, formulas))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
