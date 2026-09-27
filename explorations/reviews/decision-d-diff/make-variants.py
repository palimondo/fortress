#!/usr/bin/env python3
"""make-variants.py <dir> split|e3

The two diagnostic variants of decision-d-diff.md's measurement; neither is part of the diff.

split  In the C4 sources in <dir>, write each top-level tuple binding of MicroGptFlat.fss as single
       bindings on the same line (`nEmbd = 16; blockSize = 16; ...`, ledger row 175's form), so that
       line numbers stay aligned.  The compiled checker types every variable of a top-level tuple
       binding so that it is accepted anywhere and an operator applied to it ends the check of its
       block without an error (decision-d-diff.md, section on the silent stop); split shows what those
       stops hide.
e3     In a copy of the library in <dir> (every .fsi/.fss of Library/ and ProjectFortress/LibraryBuiltin/),
       delete the sizes that occur in neither the parameters nor the result of the Vector and Matrix
       declarations of Library/FortressLibrary.fsi, so that the api matches its component
       (FortressLibrary.fss declares the same operators without them); the review's decision E, E3.
"""
import re, sys

def split(d):
    p = d + '/MicroGptFlat.fss'
    src = open(p).read()
    tup = re.compile(r'^\(([A-Za-z_][A-Za-z0-9_]*(?:, *[A-Za-z_][A-Za-z0-9_]*)+)\) = \((.*)\)$', re.M)
    def one(m):
        names = [n.strip() for n in m.group(1).split(',')]
        vals, depth, cur = [], 0, ''
        for ch in m.group(2):                       # split the right side at top-level commas
            if ch in '([' : depth += 1
            if ch in ')]' : depth -= 1
            if ch == ',' and depth == 0: vals.append(cur.strip()); cur = ''
            else: cur += ch
        vals.append(cur.strip())
        assert len(names) == len(vals), (names, vals)
        return '; '.join('%s = %s' % nv for nv in zip(names, vals))
    new, k = tup.subn(one, src)
    open(p, 'w').write(new)
    print('split: %d top-level tuple bindings' % k)

def e3(d):
    p = d + '/FortressLibrary.fsi'
    src = open(p).read()
    pat = re.compile(r'^(opr [^\n\[]*)\[\\([^\]]*?)\\\](\s*\n?\s*)(\([^\n]*?\)\s*:\s*[^\n]+)$', re.M)
    count = 0
    def fix(m):
        nonlocal count
        sp, rest = m.group(2), m.group(4)
        parts = [s.strip() for s in sp.split(',')]
        keep = [s for s in parts if not (s.startswith('nat ') and
                not re.search(r'\b%s\b' % re.escape(s[4:].strip()), rest))]
        if keep == parts: return m.group(0)
        count += 1
        return '%s[\\ %s \\]%s%s' % (m.group(1), ', '.join(keep), m.group(3), rest)
    new = pat.sub(fix, src)
    open(p, 'w').write(new)
    print('e3: %d declarations lose a dead size' % count)

if __name__ == '__main__':
    {'split': split, 'e3': e3}[sys.argv[2]](sys.argv[1])
