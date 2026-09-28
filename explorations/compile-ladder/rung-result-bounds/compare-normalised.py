#!/usr/bin/env python3
"""compare-normalised.py <base-commit> <list-file> <baseA-dir> <baseB-dir> <edit-dir>

count-compare.py (rung O) with the normalisation of the batch record's Q2 = (a), run from $FORTRESS_HOME.
Each log is read with its work directory's path replaced by W and the trailer's secs= dropped.  A test is
STABLE when base A equals base B.  A stable test whose edit-run output equals A is SAME.  Otherwise three
things, and nothing else, are normalised in all three outputs before they are compared again:
  1. the Java line number of a printed stack frame, (Foo.java:123) -> (Foo.java:N), as compare-runs.py;
  2. an object's identity hash, @ followed by hex digits -> @HASH;
  3. in the edit run only, every Fortress source position in a file the edit changed (file:L:C, file:L:C-C,
     file:L:C-L:C and file:L.C), mapped back to the line it has at <base-commit> through the edit's own line
     map (git diff -U0), as remap-lines.py does; a position
     on an inserted line becomes INSERTED<n>, one on a rewritten line keeps its base line number and is
     marked REWRITTEN, so that a difference there is never hidden.
A stable test equal after this is NORMALISED, and every raw line that differs is printed; one still different
is CHANGED, and so is any stable test whose exit code differs.  A test whose two base runs differ is UNSTABLE
and printed for a judgement by hand, with whether the edit run equals either base run once normalised."""
import os
import re
import subprocess
import sys

base, lst, da, db, de = sys.argv[1:6]

EDITED = subprocess.run(['git', 'diff', '--name-only', base, '--', '*.fss', '*.fsi'],
                        capture_output=True, text=True, check=True).stdout.split()


def line_map(path):
    """new line -> base line (int), or 'INSERTED<n>', or ('REWRITTEN', base line)"""
    diff = subprocess.run(['git', 'diff', '-U0', base, '--', path],
                          capture_output=True, text=True, check=True).stdout
    hunks = []
    for l in diff.splitlines():
        m = re.match(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@', l)
        if m:
            a, b, c, d = int(m.group(1)), int(m.group(2) or 1), int(m.group(3)), int(m.group(4) or 1)
            hunks.append((a, b, c, d))
    def f(n):
        off = 0
        for a, b, c, d in hunks:
            if b == 0:                          # pure insertion after base line a
                if c <= n < c + d:
                    return 'INSERTED%d' % n
                if n >= c + d:
                    off += d
            elif b == d:                        # lines rewritten in place
                if c <= n < c + d:
                    return 'REWRITTEN%d' % (a + (n - c))
            else:
                if c <= n < c + d:
                    return 'HUNK%d' % n
                if n >= c + d:
                    off += d - b
        return str(n - off)
    return f


MAPS = {p: line_map(p) for p in EDITED}
NAMES = '|'.join(re.escape(p) for p in EDITED)
POS = re.compile(r'(' + NAMES + r'):(\d+):(\d+)(?:-(\d+)(?::(\d+))?)?') if EDITED else None
DOTPOS = re.compile(r'(' + NAMES + r'):(\d+)\.(\d+)') if EDITED else None     # the Block at file:L.C form


def remap(s):
    def sub(m):
        f, l1, c1, x, c2 = m.groups()
        mp = MAPS[f]
        r = '%s:%s:%s' % (f, mp(int(l1)), c1)
        if x is not None:
            r += '-' + ('%s:%s' % (mp(int(x)), c2) if c2 is not None else x)
        return r
    if not POS:
        return s
    s = POS.sub(sub, s)
    return DOTPOS.sub(lambda m: '%s:%s.%s' % (m.group(1), MAPS[m.group(1)](int(m.group(2))), m.group(3)), s)


def load(d, t):
    p = os.path.join(d, 'log', t + '.txt')
    try:
        s = open(p, encoding='utf-8', errors='replace').read()
    except FileNotFoundError:
        return None
    s = s.replace(os.path.abspath(d), 'W')
    s = re.sub(r'^(rc=\S+) secs=\d+$', r'\1', s, flags=re.M)
    return s.splitlines()


def norm(lines, edit):
    out = []
    for l in lines:
        l = re.sub(r'\.java:\d+\)', '.java:N)', l)
        l = re.sub(r'@[0-9a-f]+\b', '@HASH', l)
        if edit:
            l = remap(l)
        out.append(l)
    return out


def rc(lines):
    for l in reversed(lines or []):
        if l.startswith('rc='):
            return l[3:]
    return '?'


def raw_diff(a, e):
    import difflib
    return [l for l in difflib.unified_diff(a, e, 'baseA', 'edit', n=0, lineterm='')
            if not l.startswith(('---', '+++', '@@'))]


def main():
    tests = [os.path.basename(l.strip())[:-4] for l in open(lst) if l.strip()]
    same = normalised = changed = unstable = missing = 0
    print('# base %s; files whose positions are mapped: %s' % (base, ' '.join(EDITED)))
    for t in tests:
        a, b, e = load(da, t), load(db, t), load(de, t)
        if a is None or b is None or e is None:
            missing += 1
            print('MISSING    %s' % t)
            continue
        if a == b:
            if e == a:
                same += 1
                continue
            na, ne = norm(a, False), norm(e, True)
            if na == ne and rc(a) == rc(e):
                normalised += 1
                print('NORMALISED %s  rc %s' % (t, rc(a)))
            else:
                changed += 1
                print('CHANGED    %s  rc %s -> %s' % (t, rc(a), rc(e)))
                for l in raw_diff(na, ne)[:12]:
                    print('    after normalising: %s' % l[:220])
            for l in raw_diff(a, e):
                print('    raw: %s' % l[:220])
        else:
            unstable += 1
            na, nb, ne = norm(a, False), norm(b, False), norm(e, True)
            print('UNSTABLE   %s  rc A %s B %s edit %s  edit=A %s  edit=B %s  (normalised)'
                  % (t, rc(a), rc(b), rc(e), na == ne, nb == ne))
    print('tests %d  same %d  normalised %d  changed %d  unstable %d  missing %d'
          % (len(tests), same, normalised, changed, unstable, missing))


if __name__ == '__main__':
    main()
