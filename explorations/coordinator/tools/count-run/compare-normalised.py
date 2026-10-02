#!/usr/bin/env python3
"""compare-normalised.py <base-commit> <base-dir> <edit-dir>

Compares one edit pass of count-run.sh with one base pass, run from $FORTRESS_HOME of the edit's tree, as
the synthesis's rule for a named one-time count gives it (postmortem-2026-09-29/synthesis.md, section 2(a)):
one base pass, and the tests that vary from run to run read from unstable.txt beside this script
(postmortem-2026-09-29/measures-6.5b.md, "The interpreter tests that vary from run to run") rather than
found by a second base pass.  <base-commit> is the base pass's commit (the commit= line of <base-dir>/pass.txt).
Batch N's rung M's copy (git show 9269f7bd2^:explorations/compile-ladder/rung-integer-minmax/
compare-normalised.py), which took <list-file> <baseA-dir> <baseB-dir> and called a test STABLE when its two
base passes agreed; the list is now each pass's own list.txt, written by count-run.sh from the tree it ran on.

Each log is read with its pass's work directory replaced by W and its tree's root by ROOT (the work= and root=
lines of the pass's pass.txt, so that two passes run in two worktrees compare), and the trailer's secs=
dropped.  A test of unstable.txt is UNSTABLE: printed with its two exit codes and whether its outputs are
equal once normalised, for a judgement by hand, never counted as changed.  Any other test whose edit-pass
output equals the base pass's is SAME.  Otherwise three things, and nothing else, are normalised in both
outputs before they are compared again:
  1. the Java line number of a printed stack frame, (Foo.java:123) -> (Foo.java:N), as compare-runs.py;
  2. an object's identity hash, @ followed by hex digits -> @HASH;
  3. in the edit pass only, every Fortress source position in a file the edit changed (file:L:C, file:L:C-C,
     file:L:C-L:C and file:L.C), mapped back to the line it has at <base-commit> through the edit's own line
     map (git diff -U0), as remap-lines.py does; a position
     on an inserted line becomes INSERTED<n>, one on a rewritten line keeps its base line number and is
     marked REWRITTEN, so that a difference there is never hidden.
A test equal after this is NORMALISED, and every raw line that differs is printed; one still different is
CHANGED, and so is any test whose exit code differs.  A test on one pass's list only is NEW (the edit's) or
GONE (the base's), a promotion by git mv being one of each; a test on both lists without both logs is MISSING."""
import os
import re
import subprocess
import sys

base, db, de = sys.argv[1:4]
HERE = os.path.dirname(os.path.abspath(__file__))
UNSTABLE = {l.strip() for l in open(os.path.join(HERE, 'unstable.txt'))
            if l.strip() and not l.startswith('#')}

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


def pass_info(d):
    """the first root= and work= lines of the pass's pass.txt; the directory itself if there is none"""
    info = {}
    try:
        for l in open(os.path.join(d, 'pass.txt'), encoding='utf-8'):
            k, _, v = l.rstrip('\n').partition('=')
            if k in ('root', 'work', 'commit') and k not in info:
                info[k] = v
    except FileNotFoundError:
        pass
    info.setdefault('work', os.path.abspath(d))
    return info


def tests_of(d):
    return [os.path.basename(l.strip())[:-4] for l in open(os.path.join(d, 'list.txt')) if l.strip()]


def load(d, info, t):
    p = os.path.join(d, 'log', t + '.txt')
    try:
        s = open(p, encoding='utf-8', errors='replace').read()
    except FileNotFoundError:
        return None
    s = s.replace(info['work'], 'W')
    if info.get('root'):
        s = s.replace(info['root'], 'ROOT')
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
    return [l for l in difflib.unified_diff(a, e, 'base', 'edit', n=0, lineterm='')
            if not l.startswith(('---', '+++', '@@'))]


def main():
    ib, ie = pass_info(db), pass_info(de)
    tb, te = tests_of(db), tests_of(de)
    both, only_e = set(tb) & set(te), [t for t in te if t not in set(tb)]
    same = normalised = changed = unstable = unstable_rc = missing = 0
    print('# base %s (pass %s); edit pass %s; files whose positions are mapped: %s'
          % (base, ib.get('commit', '?'), ie.get('commit', '?'), ' '.join(EDITED)))
    print('# unstable, masked: %d tests listed in %s' % (len(UNSTABLE), os.path.join(HERE, 'unstable.txt')))
    for t in tb:
        if t not in both:
            print('GONE       %s' % t)
            continue
        a, e = load(db, ib, t), load(de, ie, t)
        if a is None or e is None:
            missing += 1
            print('MISSING    %s  (%s)' % (t, ' and '.join(n for n, x in (('base', a), ('edit', e)) if x is None)))
            continue
        if t in UNSTABLE:
            unstable += 1
            if rc(a) != rc(e):
                unstable_rc += 1
            print('UNSTABLE   %s  rc %s -> %s  equal once normalised %s'
                  % (t, rc(a), rc(e), norm(a, False) == norm(e, True)))
            continue
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
    for t in only_e:
        print('NEW        %s  rc %s' % (t, rc(load(de, ie, t))))
    print('tests %d  same %d  normalised %d  changed %d  unstable %d (exit code changed in %d)  missing %d'
          '  new %d  gone %d'
          % (len(tb), same, normalised, changed, unstable, unstable_rc, missing, len(only_e), len(tb) - len(both)))


if __name__ == '__main__':
    main()
