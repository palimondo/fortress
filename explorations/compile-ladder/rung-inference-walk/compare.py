#!/usr/bin/env python3
"""compare.py <list-file> <baseA-dir> <baseB-dir> <edit-dir> [--xxx]

Probe K's compare.py (explorations/compile-ladder/plan-n/probe-k/), itself rung O's count-compare.py with
batch 5's masks, for rung K's three passes. Each log is read with its work directory's path and its private
home's path (tmp/home-base or tmp/home-edit) replaced by W and H, and the trailer's secs= dropped. The two
files the rung promotes by git mv are read under their new names in the edit pass. A test is STABLE when
base A equals base B. A stable test whose edit-run output equals A is SAME. Otherwise two things, and nothing
else, are masked in all three outputs before they are compared again: the Java line number of a printed stack
frame, (Foo.java:123) -> (Foo.java:N), and an object's identity hash, @ followed by hex digits -> @HASH. A
stable test equal after this is NORMALISED; one whose masked lines are the same lines in another order, with
the same exit code, is ORDER (an overload listing's order, row 430); one still different, or whose exit code
differs, is CHANGED. A test whose two base runs differ is UNSTABLE, printed with whether the edit run equals
either base run once masked. XXXInheritedOverload is listed as unstable (row 430, the order in which its
ambiguity message names its two declarations; the brief's comparison lists it so): it is LISTED, printed with
its first difference and exit codes, whatever the three runs give.

With --xxx, each test's verdict is also read the way FileTests' InterpreterTest reads it
(ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:340-410): a plain test passes when it
ends normally (rc 0) and no "fail" or "FAIL" is in its output (QuickCheckTest excepted); an XXX test passes
when it ends with an exception or prints one of them. Every verdict that differs between base A and the edit
run is printed, a promoted file's under its two names."""
import os
import re
import sys

RENAMED = {'XXXCoercionGenericFnRungC': 'CoercionGenericFnRungC',
           'XXXCoercionGenericTraitRungC': 'CoercionGenericTraitRungC'}
LISTED = {'XXXInheritedOverload'}
HOME = re.compile(r'/home/user/fortress-walkinfer/tmp/home-(base|edit)')


def load(d, t):
    p = os.path.join(d, 'log', t + '.txt')
    try:
        s = open(p, encoding='utf-8', errors='replace').read()
    except FileNotFoundError:
        return None
    s = s.replace(os.path.abspath(d), 'W')
    s = HOME.sub('H', s)
    s = re.sub(r'^(rc=\S+) secs=\d+$', r'\1', s, flags=re.M)
    return s.splitlines()


def mask(lines):
    out = []
    for l in lines or []:
        l = re.sub(r'\(([A-Za-z0-9_$]+\.java):\d+\)', r'(\1:N)', l)
        l = re.sub(r'@[0-9a-f]{4,}', '@HASH', l)
        out.append(l)
    return out


def unordered(lines):
    """the lines as a multiset, an overload listing's closing '}:OverloadedX' taken off its last entry"""
    return sorted(re.sub(r'\}:Overloaded\w+$', '', l) for l in lines)


def first_diff(a, b):
    for i in range(max(len(a), len(b))):
        x = a[i] if i < len(a) else '<end of output>'
        y = b[i] if i < len(b) else '<end of output>'
        if x != y:
            return i + 1, x, y
    return None


def rc(lines):
    for l in reversed(lines or []):
        if l.startswith('rc='):
            return l[3:]
    return '?'


def verdict(t, lines):
    body = '\n'.join(l for l in lines if not l.startswith('rc='))
    fails = 'QuickCheckTest' not in t and ('fail' in body or 'FAIL' in body)
    ended = rc(lines) == '0'
    if t.startswith('XXX'):
        return 'pass' if (not ended or fails) else 'FAIL(missing expected failure)'
    return 'pass' if (ended and not fails) else 'FAIL'


def main():
    lst, da, db, de = sys.argv[1:5]
    xxx = '--xxx' in sys.argv
    tests = [os.path.basename(l.strip())[:-4] for l in open(lst) if l.strip()]
    n = {'SAME': 0, 'NORMALISED': 0, 'ORDER': 0, 'CHANGED': 0, 'UNSTABLE': 0, 'LISTED': 0, 'MISSING': 0}
    verdicts = []
    for t in tests:
        te = RENAMED.get(t, t)
        a, b, e = load(da, t), load(db, t), load(de, te)
        if a is None or b is None or e is None:
            n['MISSING'] += 1
            print('MISSING    %s' % t)
            continue
        name = t if te == t else '%s (edit: %s)' % (t, te)
        if xxx and verdict(t, a) != verdict(te, e):
            verdicts.append('VERDICT    %s  base A %s, edit %s' % (name, verdict(t, a), verdict(te, e)))
        if t in LISTED:
            n['LISTED'] += 1
            d = first_diff(a, e)
            print('LISTED     %s  rc A %s B %s edit %s; A %s B, edit %s A%s'
                  % (name, rc(a), rc(b), rc(e), '==' if a == b else '=/=', '==' if a == e else '=/=',
                     '' if d is None else '\n    A:    %s\n    edit: %s' % (d[1][:220], d[2][:220])))
            continue
        if a == b:
            if a == e:
                n['SAME'] += 1
                continue
            ma, me = mask(a), mask(e)
            if ma == me and rc(a) == rc(e):
                n['NORMALISED'] += 1
                d = first_diff(a, e)
                print('NORMALISED %s  line %d\n    base: %s\n    edit: %s' % (name, d[0], d[1][:220], d[2][:220]))
                continue
            if unordered(ma) == unordered(me) and rc(a) == rc(e):
                n['ORDER'] += 1
                d = first_diff(ma, me)
                print('ORDER      %s  the same lines in another order, from line %d\n    base: %s\n    edit: %s'
                      % (name, d[0], d[1][:300], d[2][:300]))
                continue
            n['CHANGED'] += 1
            d = first_diff(ma, me) or first_diff(a, e)
            print('CHANGED    %s  rc %s -> %s  line %d\n    base: %s\n    edit: %s'
                  % (name, rc(a), rc(e), d[0], d[1][:300], d[2][:300]))
        else:
            n['UNSTABLE'] += 1
            ma, mb, me = mask(a), mask(b), mask(e)
            dab = first_diff(a, b)
            eq = 'edit equals A' if ma == me else 'edit equals B' if mb == me else 'edit equals neither'
            print('UNSTABLE   %s  rc A %s B %s edit %s  A/B line %d (masked: %s); %s\n    A:    %s\n    B:    %s'
                  % (name, rc(a), rc(b), rc(e), dab[0], 'equal' if ma == mb else 'differ', eq,
                     dab[1][:220], dab[2][:220]))
    for v in verdicts:
        print(v)
    print('tests %d  same %d  normalised %d  order only %d  changed %d  unstable %d  listed %d  missing %d%s'
          % (len(tests), n['SAME'], n['NORMALISED'], n['ORDER'], n['CHANGED'], n['UNSTABLE'], n['LISTED'], n['MISSING'],
             ('  verdicts changed %d' % len(verdicts)) if xxx else ''))


if __name__ == '__main__':
    main()
