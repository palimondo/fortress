#!/usr/bin/env python3
"""Checks the table of the Unicode view (WORDS, GREEK and SHORT of notation.py) against the specification.

    python3 explorations/microgpt-walk/check_unicode_table.py [root of the specification's LaTeX]

The root is Specification-1.0-frozen by default. An entry passes if the specification gives it:

  - a word or an ASCII shorthand of an operator: a row of the operator tables (appendices/operators.tex,
    \\UnicodeOp{U+2264}{LESS-THAN OR EQUAL TO}{$\\leq$}{\\texttt{<=}~~\\texttt{LE}}) that lists the name and
    whose code point is the entry's character;
  - a word that the operator tables do not list, or a Greek letter: a row "name becomes sign" of
    Appendix E (appendices/ascii-to-unicode.tex). The appendix gives the sign as a LaTeX command, not
    as a code point. A Greek letter is taken as the Unicode letter of that name (the appendix: the
    short name "is replaced by the Greek letter itself"); the few other commands are read by TEX below.

It prints each entry that is wrong (the specification gives another character) or that the
specification does not hold, and exits 1 if there is one.
"""
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import notation  # noqa: E402

# the LaTeX commands of Appendix E's rows that the operator tables do not resolve, by Unicode name
TEX = {'emptyset': 'EMPTY SET', 'infty': 'INFINITY', 'forall': 'FOR ALL', 'exists': 'THERE EXISTS',
       'bot': 'UP TACK', 'top': 'DOWN TACK', 'ldots': 'HORIZONTAL ELLIPSIS', 'leadsto': 'RIGHTWARDS SQUIGGLE ARROW'}


def plain(tex):
    """A name as the tables write it in \\texttt or \\txt, as ASCII."""
    tex = tex.replace("{\\char'134}", '\\').replace("\\char'134", '\\').replace('$\\sim$', '~')
    tex = re.sub(r'\\([_&#%{}$])', r'\1', tex)
    return tex.replace('\\^{}', '^').replace('\\~{}', '~').strip()


def operator_rows(root):
    """{name: set of characters} and {LaTeX command: set of characters}, from the operator tables."""
    names, cmds = {}, {}
    for line in open(os.path.join(root, 'appendices', 'operators.tex'), encoding='utf-8', errors='replace'):
        m = re.match(r'\s*\\UnicodeOp\{U\+([0-9A-Fa-f]+)\}\{[^}]*\}\{(.*?)\}\{(\\texttt\{.*\})?\}', line)
        if not m:
            continue
        ch = chr(int(m.group(1), 16))
        c = re.fullmatch(r'\$\\([A-Za-z]+)\$', m.group(2))
        if c:
            cmds.setdefault(c.group(1), set()).add(ch)
        for name in (m.group(3) or '').split('~~'):
            n = re.fullmatch(r'\\texttt\{(.*)\}', name.strip())
            if n:
                names.setdefault(plain(n.group(1)), set()).add(ch)
    return names, cmds


def appendix_rows(root):
    """{name: the sign as the appendix writes it}, from the rows "name & becomes & sign" of Appendix E."""
    text = open(os.path.join(root, 'appendices', 'ascii-to-unicode.tex'), encoding='utf-8', errors='replace').read()
    rows = {}
    for name, sign in re.findall(r'\\te?xt\{((?:[^{}]|\{[^{}]*\})*)\}\s*&\s*\\emph\{becomes\}\s*&\s*([^&\\\n]*(?:\\[A-Za-z]+\$?)?[^&\\\n]*)', text):
        rows.setdefault(plain(name), sign.strip())
    return rows


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, '..', '..', 'Specification-1.0-frozen')
    names, cmds = operator_rows(root)
    rows = appendix_rows(root)
    bad, n = [], 0

    def show(chars):
        return ' or '.join('%s (U+%04X %s)' % (c, ord(c), unicodedata.name(c, '?')) for c in sorted(chars))

    def by_appendix(name):
        """The characters that Appendix E's row for the name stands for, or None if it has no such row."""
        sign = rows.get(name)
        if sign is None:
            return None
        m = re.fullmatch(r'\$\\([A-Za-z]+)\$', sign)
        if not m:
            return {sign} if len(sign) == 1 else set()
        if m.group(1) in TEX:
            return {unicodedata.lookup(TEX[m.group(1)])}
        return cmds.get(m.group(1), set())

    def check(kind, name, ch):
        nonlocal n
        n += 1
        given = names.get(name)
        where = 'the operator tables'
        if given is None:
            given, where = by_appendix(name), 'Appendix E'
        if given is None:
            bad.append('%s %s -> %s: the specification does not hold it' % (kind, name, show(ch)))
        elif ch not in given:
            bad.append('%s %s -> %s: wrong, %s give %s' % (kind, name, show(ch), where, show(given) or 'a sign that this check cannot read'))

    for name, ch in notation.WORDS.items():
        check('word', name, ch)
    for name, ch in notation.SHORT:
        check('shorthand', name, ch)
    for name, ch in notation.GREEK.items():
        n += 1
        sign = rows.get(name)
        m = re.fullmatch(r'\$\\([A-Za-z]+)\$', sign or '')
        if sign is None:
            bad.append('Greek %s -> %s: Appendix E does not hold it' % (name, show(ch)))
            continue
        case = 'CAPITAL' if name.isupper() else 'SMALL'
        # Unicode spells the eleventh letter LAMDA
        want = unicodedata.lookup('GREEK %s LETTER %s' % (case, name.upper().replace('LAMBDA', 'LAMDA')))
        if not m or m.group(1).lower() != name.lower():
            bad.append('Greek %s -> %s: Appendix E gives %s, not a Greek letter of that name' % (name, show(ch), sign))
        elif ch != want:
            bad.append('Greek %s -> %s: wrong, the Greek letter of that name is %s' % (name, show(ch), show(want)))
    for b in bad:
        print('FAIL ' + b)
    print('%d entries of the Unicode view checked against %s, %d not given by it'
          % (n, os.path.relpath(os.path.join(root, 'appendices')), len(bad)))
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
