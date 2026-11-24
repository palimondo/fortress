#!/usr/bin/env python3
"""judge.py <list> <work-dir> <out-dir> [declared ...]: the verdicts of run.sh beside it (its header).

Each program is judged by its own verdict, as the interpreter suite's harness judges it under walk
(ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java, SourceFileTest.testFile and its
refusalVerdict), on the compiled path's two commands: the compile stands for walk's load, the run for its run.
- A program whose X.test beside it holds load_ keys names a refusal at load: it passes when the compile
  refuses it and the compile's output meets every load_ key. The keys of out, err and exception all read that
  one output, since the driver writes both streams into one file.
- Any other program passes when the compile and the run exit 0 and neither output holds "fail" or "FAIL",
  unless its name holds "QuickCheckTest".
- The XXX prefix is not turned round: it marks walk's expected failure, and the list holds the programs whose
  own asserts pass compiled.
The lines it prints, tab-separated, each with its library and program:
- LISTED and CANDIDATES: the counts.
- FAIL: a listed program that fails, with its reason; MISSING: a listed program with no result (its driver
  stopped). Each is red, unless a [declared] argument names the program: then it prints LEAVES, and the
  program leaves the list. A declared program that passes prints DECLARED-PASS and stays.
- GONE: a listed program whose file is no longer in the tree leaves the list, not red: a promotion renames a
  file, and its new name is a candidate.
- JOINS: a candidate that passes joins the list, under the one library where it passes there, else under the
  prelude. A candidate that fails is only counted.
Writes <out-dir>/verdicts.tsv (program, library, listed or candidate, PASS or FAIL, reason) and
<out-dir>/list.tsv (the list's "#" lines, then its programs, sorted). Exit 1 when red."""
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..'))
LIBS = ('one', 'prelude')


def read(path):
    try:
        with open(path, encoding='utf-8', errors='replace') as f:
            return f.read()
    except OSError:
        return ''


def props(path):
    """A .test file's keys, as java.util.Properties.load reads them."""
    out, cur = {}, ''
    for raw in read(path).splitlines():
        line = raw.lstrip()
        if not cur and (not line or line[0] in '#!'):
            continue
        if re.search(r'(?<!\\)(\\\\)*\\$', line):
            cur += line[:-1]
            continue
        cur += line
        m = re.match(r'((?:\\.|[^=:\s\\])*)\s*[=:\s]\s*(.*)$', cur)
        key, val = (m.group(1), m.group(2)) if m else (cur, '')
        unesc = lambda s: re.sub(r'\\u([0-9a-fA-F]{4})|\\(.)', lambda e: chr(int(e.group(1), 16)) if e.group(1) else {'t': '\t', 'n': '\n', 'r': '\r', 'f': '\f'}.get(e.group(2), e.group(2)), s)
        out[unesc(key)] = unesc(val)
        cur = ''
    return out


def unmet(keys, text):
    """The first load_ key that text does not meet, or None (FileTests.java, BaseTest.generalTestFailed)."""
    ws = lambda s: re.sub(r'\s+', ' ', s).strip()
    for which in ('out', 'err', 'exception'):
        for check in ('contains', 'WIcontains', 'does_not_contain', 'matches', 'WImatches', 'WCIequals', 'equals'):
            k = 'load_%s_%s' % (which, check)
            v = keys.get(k, '')
            if not v:
                continue
            ok = {'contains': lambda: v in text,
                  'WIcontains': lambda: ws(v) in ws(text),
                  'does_not_contain': lambda: v not in text,
                  'matches': lambda: re.fullmatch(v, text) is not None,
                  'WImatches': lambda: re.fullmatch(v, ws(text)) is not None,
                  'WCIequals': lambda: ws(text).lower() == ws(v).lower(),
                  'equals': lambda: re.sub(r'[ \t]+', ' ', text) == re.sub(r'[ \t]+', ' ', v)}[check]()
            if not ok:
                return k + '=' + v
    return None


def first(text):
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    pick = next((l for l in lines if re.search(r'Error|Exception|error|FAIL|fail', l) and not l.startswith('at ')), lines[0] if lines else '')
    return pick[:200]


def verdict(corpus, base, crc, rrc, comp, run):
    """('PASS' or 'FAIL', reason) for one row of the driver's results.tsv."""
    name = base[:-4] if base.endswith('.fss') else base
    test = os.path.join(ROOT, 'ProjectFortress', corpus, name + '.test')
    keys = {k: v for k, v in props(test).items() if k.startswith('load_')} if os.path.isfile(test) else {}
    crc = int(crc) if crc.strip() else -1
    rrc = int(rrc) if rrc.strip() else None
    if keys:
        if crc == 0:
            return 'FAIL', 'compiled, not refused as its .test names'
        if crc in (124, 137):
            return 'FAIL', 'compile timed out'
        miss = unmet(keys, comp)
        return ('FAIL', 'refused at compile, not as its .test names: ' + miss) if miss else ('PASS', 'refused at compile as its .test names')
    if crc != 0:
        return 'FAIL', ('compile timed out' if crc in (124, 137) else 'compile exit %d: %s' % (crc, first(comp)))
    if rrc != 0:
        return 'FAIL', ('run timed out' if rrc in (124, 137) else 'run exit %s: %s' % (rrc, first(run)))
    if 'QuickCheckTest' not in name and re.search('fail|FAIL', comp + run):
        return 'FAIL', 'fail or FAIL in its output: ' + first(comp + run)
    return 'PASS', ''


def main(argv):
    if len(argv) < 3:
        sys.exit(__doc__.splitlines()[0])
    list_path, work, out_dir, declared = argv[0], argv[1], argv[2], argv[3:]
    head, listed = [], []
    for line in read(list_path).splitlines():
        if line.startswith('#') or not line.strip():
            head.append(line)
            continue
        f = line.split('\t')
        listed.append((f[0], f[1] if len(f) > 1 else ''))
    cands = [l.strip() for l in read(os.path.join(work, 'candidates.txt')).splitlines() if l.strip()]
    res = {}
    for lib in LIBS:
        d = os.path.join(work, lib)
        for line in read(os.path.join(d, 'results.tsv')).splitlines():
            f = line.split('\t')
            if len(f) < 5:
                continue
            corpus, base, crc, rrc = f[0], f[1], f[3], f[4]
            raw = os.path.join(d, 'raw', corpus, base)
            res[(corpus + '/' + base, lib)] = verdict(corpus, base, crc, rrc, read(raw + '.compile'), read(raw + '.run'))
    named = lambda p: any(p in d for d in declared)
    lines, rows, keep, red = [], [], [], False
    n = {'PASS': 0, 'FAIL': 0, 'LEAVES': 0, 'GONE': 0}
    for prog, lib in listed:
        if not os.path.isfile(os.path.join(ROOT, 'ProjectFortress', prog)):
            n['GONE'] += 1
            lines.append('GONE\t%s\t%s\tno such file: it leaves the list' % (lib, prog))
            rows.append((prog, lib, 'listed', 'GONE', 'no such file'))
            continue
        v, why = res.get((prog, lib), ('MISSING', 'no result: its driver stopped'))
        rows.append((prog, lib, 'listed', v, why))
        if v == 'PASS':
            n['PASS'] += 1
            keep.append((prog, lib))
            if named(prog):
                lines.append('DECLARED-PASS\t%s\t%s\tdeclared leaving, but passes: it stays' % (lib, prog))
        elif named(prog):
            n['LEAVES'] += 1
            lines.append('LEAVES\t%s\t%s\t%s; declared: %s' % (lib, prog, why, '; '.join(d for d in declared if prog in d)))
        else:
            n['FAIL'] += 1
            red = True
            lines.append('%s\t%s\t%s\t%s' % ('FAIL' if v == 'FAIL' else 'MISSING', lib, prog, why))
    joins = []
    for prog in cands:
        got = {lib: res.get((prog, lib), ('MISSING', 'no result')) for lib in LIBS}
        for lib in LIBS:
            rows.append((prog, lib, 'candidate') + got[lib])
        lib = next((l for l in LIBS if got[l][0] == 'PASS'), None)
        if lib:
            joins.append((prog, lib))
            lines.append('JOINS\t%s\t%s' % (lib, prog))
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, 'verdicts.tsv'), 'w', encoding='utf-8') as f:
        f.write('#program\tlibrary\tkind\tverdict\treason\n')
        for r in rows:
            f.write('\t'.join(r) + '\n')
    with open(os.path.join(out_dir, 'list.tsv'), 'w', encoding='utf-8') as f:
        for h in head:
            f.write(h + '\n')
        for prog, lib in sorted(keep + joins):
            f.write('%s\t%s\n' % (prog, lib))
    print('LISTED\t%d\t%s' % (len(listed), '\t'.join('%s %d' % kv for kv in n.items())))
    print('CANDIDATES\t%d\tJOINS %d' % (len(cands), len(joins)))
    for l in lines:
        print(l)
    return 1 if red else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
