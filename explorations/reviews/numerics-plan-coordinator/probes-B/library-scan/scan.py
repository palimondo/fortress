#!/usr/bin/env python3
"""Scan the one library for declarations whose own static parameters are
bounded by a number bound, and for numerals in their bodies.
Usage: scan.py <repo-root>  (read-only)."""
import re, sys, os, glob

ROOT = sys.argv[1]
FILES = sorted(glob.glob(os.path.join(ROOT, 'Library', '*.fss')) +
               glob.glob(os.path.join(ROOT, 'Library', '*.fsi')) +
               glob.glob(os.path.join(ROOT, 'ProjectFortress/LibraryBuiltin/FortressBuiltin.fs?')))
FILES = [f for f in FILES if not os.path.basename(f).startswith('Compiler')]
BOUND = re.compile(r'extends\s*(\{[^}]*\b(Integral\[\\|Number\b|AdditiveGroup\[\\|MultiplicativeRing\[\\|AnyIntegral\b)[^}]*\}|(Integral\[\\|Number\b|AdditiveGroup\[\\|MultiplicativeRing\[\\|AnyIntegral\b))')

def strip_comments(text):
    out = []; depth = 0; i = 0; instr = False
    while i < len(text):
        c = text[i]
        if depth == 0 and c == '"' :
            instr = not instr; out.append(' '); i += 1; continue
        if instr:
            out.append('\n' if c == '\n' else ' '); i += 1; continue
        if depth == 0 and text.startswith('(*)', i):
            j = text.find('\n', i)
            j = len(text) if j < 0 else j
            out.append(' ' * (j - i)); i = j; continue
        if text.startswith('(*', i):
            depth += 1; out.append('  '); i += 2; continue
        if depth and text.startswith('*)', i):
            depth -= 1; out.append('  '); i += 2; continue
        out.append(c if (depth == 0 or c == '\n') else ' ')
        i += 1
    return ''.join(out)

def static_brackets(line):
    """Yield the contents of each outermost [\\ ... \\] in line."""
    res = []; i = 0
    while True:
        j = line.find('[\\', i)
        if j < 0: break
        depth = 0; k = j
        while k < len(line):
            if line.startswith('[\\', k): depth += 1; k += 2; continue
            if line.startswith('\\]', k):
                depth -= 1; k += 2
                if depth == 0: break
                continue
            k += 1
        res.append(line[j+2:k-2]); i = k
    return res

def mask_static(line):
    # blank out every [\ ... \] (static args/params) so numerals inside are not counted
    out = list(line)
    for m in re.finditer(r'\[\\', line):
        pass
    i = 0; depth = 0
    for k in range(len(line)):
        pass
    res = []; depth = 0; k = 0
    while k < len(line):
        if line.startswith('[\\', k): depth += 1; res.append('  '); k += 2; continue
        if depth and line.startswith('\\]', k): depth -= 1; res.append('  '); k += 2; continue
        res.append(' ' if depth else line[k]); k += 1
    return ''.join(res)

NUMERAL = re.compile(r'(?<![A-Za-z0-9_\'.])(\d+(\.\d+)?)(?![A-Za-z0-9_])')
DECL = re.compile(r'^\s*(?:(?:private|value|abstract|getter|setter|test|atomic|io)\s+)*(opr\b|object\b|trait\b|[A-Za-z_][A-Za-z0-9_\']*\s*\[\\)')

def indent(l): return len(l) - len(l.lstrip(' '))

rows = []
for f in FILES:
    raw = open(f, encoding='utf-8').read()
    text = strip_comments(raw)
    lines = text.split('\n')
    for n, line in enumerate(lines):
        if not DECL.match(line): continue
        brs = static_brackets(line)
        bounded = [b for b in brs if BOUND.search(b)]
        # only the first bracket(s) before '(' or ':' are the declaration's own params; approximate:
        if not bounded: continue
        # body extent: until a nonblank line at indent <= header indent (an 'end' at same indent is included)
        h = indent(line); body = [(n, line)]; m = n + 1
        while m < len(lines):
            l = lines[m]
            if l.strip() == '': m += 1; continue
            if indent(l) <= h:
                if l.strip().startswith('end'): body.append((m, l))
                break
            body.append((m, l)); m += 1
        nums = []
        for k, (ln, bl) in enumerate(body):
            masked = mask_static(bl)
            if k == 0:
                # drop the header's parameter types (keep text after '=' only)
                eq = masked.find('=')
                masked = masked[eq+1:] if eq >= 0 else ''
            for mm in NUMERAL.finditer(masked):
                nums.append((ln + 1, mm.group(1)))
        rows.append((os.path.relpath(f, ROOT), n + 1, line.strip()[:110], bounded, nums))

for r in rows:
    print('%s:%d | %s | numerals: %s' % (r[0], r[1], r[2], ', '.join('%d:%s' % x for x in r[4][:12]) + (' ...(%d)' % len(r[4]) if len(r[4]) > 12 else '')))
print('TOTAL', len(rows))
from collections import Counter
c = Counter(r[0] for r in rows); cn = Counter(r[0] for r in rows if r[4])
for k in sorted(c): print('  %s: %d declarations, %d with a numeral' % (k, c[k], cn[k]))
