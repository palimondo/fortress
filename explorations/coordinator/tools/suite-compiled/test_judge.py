#!/usr/bin/env python3
"""test_judge.py: the check of judge.py beside it, on made-up driver results for programs of the tree's
ProjectFortress/tests/; it runs no Fortress. Prints one line per check and exits 1 if any fails.
    python3 -B explorations/coordinator/tools/suite-compiled/test_judge.py"""
import os
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
bad = 0


def say(ok, what):
    global bad
    bad += 0 if ok else 1
    print(('ok   ' if ok else 'BAD  ') + what)


def results(work, lib, rows):
    """rows: (program, crc, rrc, compile output, run output), as the driver writes them."""
    d = os.path.join(work, lib)
    os.makedirs(os.path.join(d, 'raw', 'tests'), exist_ok=True)
    with open(os.path.join(d, 'results.tsv'), 'w') as f:
        for prog, crc, rrc, comp, run in rows:
            corpus, base = prog.split('/')
            f.write('\t'.join([corpus, base, base[:-4], crc, rrc, '1', '1']) + '\n')
            open(os.path.join(d, 'raw', corpus, base + '.compile'), 'w').write(comp)
            if run is not None:
                open(os.path.join(d, 'raw', corpus, base + '.run'), 'w').write(run)


def judge(work, listed, cands, declared=()):
    lst = os.path.join(work, 'list.tsv')
    with open(lst, 'w') as f:
        f.write('# head\n#program\tlibrary\n' + ''.join('%s\t%s\n' % x for x in listed))
    open(os.path.join(work, 'candidates.txt'), 'w').write(''.join(c + '\n' for c in cands))
    out = os.path.join(work, 'out')
    r = subprocess.run([sys.executable, '-B', os.path.join(HERE, 'judge.py'), lst, work, out] + list(declared),
                       capture_output=True, text=True)
    return r.returncode, r.stdout, open(os.path.join(out, 'list.tsv')).read()


with tempfile.TemporaryDirectory() as w:
    results(w, 'one', [('tests/fib.fss', '0', '0', '', ''),
                       ('tests/XXXgenericMethod1.fss', '0', '0', '', 'done\n'),
                       ('tests/NonValueBelowValueTypeWalk.fss', '1', '', 'X.fss:3:1:\n non-value subtype of value type Stamp\n', None),
                       ('tests/fmTest1.fss', '0', '1', '', 'Exception in thread "main" java.lang.Error: boom\n')])
    results(w, 'prelude', [('tests/AsExprSimple.fss', '0', '0', '', 'assert FAIL: 1 =/= 2\n'),
                           ('tests/ampersand.fss', '0', '124', '', ''),
                           ('tests/QuickCheckTest.fss', '0', '0', '', 'shrinking after a failure\n'),
                           ('tests/NonValueBelowValueTypeWalk.fss', '0', '0', '', ''),
                           ('tests/fmTest1.fss', '0', '0', '', '')])
    listed = [('tests/fib.fss', 'one'), ('tests/XXXgenericMethod1.fss', 'one'), ('tests/AsExprSimple.fss', 'prelude'),
              ('tests/ampersand.fss', 'prelude'), ('tests/QuickCheckTest.fss', 'prelude'), ('tests/GS0.fss', 'one'),
              ('tests/NoSuchProgramAnyMore.fss', 'prelude')]
    cands = ['tests/NonValueBelowValueTypeWalk.fss', 'tests/fmTest1.fss']
    rc, out, lst = judge(w, listed, cands, ['R: tests/ampersand.fss (prelude): its loop moves to the one library'])
    lines = out.splitlines()
    say(rc == 1, 'a listed program that fails undeclared is red: exit %d' % rc)
    say('LISTED\t7\tPASS 3\tFAIL 2\tLEAVES 1\tGONE 1' in lines, 'the counts: fib, XXXgenericMethod1 (the prefix not turned round) and QuickCheckTest (its "fail" excused) pass')
    say(any(l.startswith('FAIL\tprelude\ttests/AsExprSimple.fss\tfail or FAIL') for l in lines), 'FAIL in the output fails the program')
    say(any(l.startswith('MISSING\tone\ttests/GS0.fss') for l in lines), 'a listed program with no result is MISSING')
    say(any(l.startswith('LEAVES\tprelude\ttests/ampersand.fss\trun timed out; declared: R:') for l in lines), 'a declared program that fails leaves the list, not red')
    say(any(l.startswith('GONE\tprelude\ttests/NoSuchProgramAnyMore.fss') for l in lines), 'a listed file no longer in the tree is GONE')
    say('JOINS\tone\ttests/NonValueBelowValueTypeWalk.fss' in lines, 'a refusal-keyed candidate refused at compile as its keys name joins under one; compiled clean under the prelude it fails')
    say('JOINS\tprelude\ttests/fmTest1.fss' in lines, 'a candidate that passes only under the prelude joins under the prelude')
    want = ('# head\n#program\tlibrary\ntests/NonValueBelowValueTypeWalk.fss\tone\ntests/QuickCheckTest.fss\tprelude\n'
            'tests/XXXgenericMethod1.fss\tone\ntests/fib.fss\tone\ntests/fmTest1.fss\tprelude\n')
    say(lst == want, 'the new list keeps the head, drops the failing, left and gone programs, adds the joins, sorted')
    rc, out, lst = judge(w, [('tests/fib.fss', 'one')], [])
    say(rc == 0 and out.splitlines()[:2] == ['LISTED\t1\tPASS 1\tFAIL 0\tLEAVES 0\tGONE 0', 'CANDIDATES\t0\tJOINS 0'], 'all listed pass: exit 0, %r' % out[:80])

print('%d problem(s)' % bad)
sys.exit(1 if bad else 0)
