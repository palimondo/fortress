#!/usr/bin/env python3
"""mech.py CHUNK_DIR [--final]

The ledger pass's mechanical check of a chunk's new lines, read-only on the tree and the ledger. It reads
the writer's files (rows.rewrite, dups.txt, closes.txt), or with --final the judge's (final.rewrite,
final.dups, final.closes), and the lines the run read (evidence/N.md and the run's rows.tsv files), and
writes mech.md (with --final, mech-final.md) in the chunk's folder. Without --final it also writes
clean.txt, the rewritten lines and the text a duplicate adds, cell by cell, for the cold reader.

For each new line: the template (ledger.py's own lint, as `check --rows`); the lengths; each cited path
and file:line at the base, and whether the cited lines hold the backticked words of the citation's
sentence; each commit hash, resolved and in the base; the reproducer; the row's line now against the line
the run read (the landing's guard); and the tokens of the old line that the new line lacks (paths, rows,
F- and P- entries, backticked names), a list for the checker, not a verdict. For each close: the commit is
in the base, the test is one `ledger.py close` takes, a CONTESTED row names what settled it. For each
duplicate: both rows open, and the kept row's notes and line within their limits with the added text.
Then the chunk applied on copies of the ledger and its history in the chunk's mech-copy/ (apply.py
--keep-going), and `ledger.py check` and `ledger.py check --base BASE` on the copies.
Last line: "MECH: N lines, F failing, every check passes." or "... F failing: ..." with the rows.
"""
import os, re, shutil, subprocess, sys
import common as C

L = C.L
if len(sys.argv) < 2:
    sys.exit(__doc__)
D = os.path.abspath(sys.argv[1]).rstrip('/')
FINAL = '--final' in sys.argv
RUN = os.path.dirname(D)
BASE = open(os.path.join(RUN, 'run', 'base.txt')).read().strip()
tree = C.Tree(BASE)
led_base = C.ledger_at(BASE)
led_now = C.ledger_now()
numbers = {r.num for r in led_now.rows}
linter = L.Linter(C.ROOT, numbers)
names = ('final.rewrite', 'final.dups', 'final.closes') if FINAL else ('rows.rewrite', 'dups.txt', 'closes.txt')
read = {}
for x in os.listdir(RUN):
    p = os.path.join(RUN, x, 'rows.tsv')
    if os.path.exists(p):
        for ln in open(p):
            f = ln.rstrip('\n').split('\t')
            if len(f) >= 2 and f[0].isdigit():
                read[int(f[0])] = f[1]


def old_line(n):
    """The line as the run read it: from the evidence file where there is one, else the base's."""
    for x in sorted(os.listdir(RUN)):
        p = os.path.join(RUN, x, 'evidence', '%d.md' % n)
        if os.path.exists(p):
            for ln in open(p, encoding='utf-8'):
                if re.match(r'\| *%d *\|' % n, ln):
                    return ln.rstrip('\n')
    hits = led_base.find(n)
    return hits[0].line if hits else None


def tokens(line):
    t = set(L.backtick_paths(line))
    t |= {'row %d' % x for x in C.row_refs(line)}
    t |= set(re.findall(r'\b[FP]-\d+\b', line))
    t |= {w.strip() for w in re.findall(r'`([^`]+)`', line) if len(w.strip()) >= 3}
    return t


def guard(n):
    r = led_now.find(n)
    if len(r) != 1:
        return 'not one row in the ledger now'
    if n not in read:
        return 'in no rows.tsv of the run'
    return None if C.sha(r[0].line) == read[n] else 'CHANGED since the run read it: the landing will hold it'


def cite_lines(line):
    out, bad = [], 0
    text = ' '.join(L.split_cells(line)[1:]).replace('\\|', ' ')
    for path, ranges, words, pin in C.citations(text):
        p, why = tree.resolve(path)
        if not p:
            if path.startswith('explorations/') or path.startswith('perf-probes/') or 'probe' in path:
                out.append('  - `%s`: not in the tree at the base (allowed for a probe the row says how to read from history)' % path)
            else:
                bad += 1
                out.append('  - FAIL `%s`: %s' % (path, why))
            continue
        if p.endswith('/'):
            continue
        lines = tree.lines(p)
        for lo, hi in ranges:
            if lo > len(lines):
                bad += 1
                out.append('  - FAIL `%s:%d`: past the end of `%s` (%d lines)' % (path, lo, p, len(lines)))
                continue
            held, moved = [], []
            for w in words:
                at = [i + 1 for i, t in enumerate(lines) if w in t]
                if not at or len(at) > 5:
                    continue
                (held if any(lo <= i <= hi for i in at) else moved).append(w if any(lo <= i <= hi for i in at) else '%s at :%s' % (w, ','.join(map(str, at[:3]))))
            v = 'words moved: ' + '; '.join(moved) if moved else 'holds ' + ', '.join(held) if held else 'no word to check'
            out.append('  - `%s:%s` (%s): %s; reads: %s' % (path, lo if lo == hi else '%d-%d' % (lo, hi), p, v,
                                                         lines[lo - 1].strip()[:140]))
    return out, bad


report, failing, clean = [], [], []
report.append('# Mechanical check of %s, %s files, base %s' % (os.path.basename(D), 'the judge\'s' if FINAL else 'the writer\'s', BASE[:9]))
report.append('')
nlines = 0
p = os.path.join(D, names[0])
if os.path.exists(p):
    for line in open(p, encoding='utf-8'):
        m = re.match(r'\| *(\d+) *\|', line)
        if not m:
            continue
        nlines += 1
        n = int(m.group(1)); line = line.rstrip('\n')
        report.append('## Row %d, rewritten (%d characters)' % (n, len(line)))
        fails = []
        try:
            new = L.template_row(line, numbers, C.ROOT)
            if new.status in ('FIXED', 'DUPLICATE'):
                fails.append('a rewrite cannot make a row %s: close or duplicate it' % new.status)
        except L.LedgerError as e:
            fails.append('template: ' + str(e).replace('\n', '; '))
            new = None
        old = old_line(n)
        if old is None:
            fails.append('no row %d' % n)
        elif old == line:
            fails.append('the same line as read: nothing to rewrite')
        g = guard(n)
        if g:
            report.append('- guard: ' + g)
        if new is not None:
            report.append('- lengths: row %d of 1,200, claim %d of 300, notes %d of 700' % (len(line), len(new.claim), len(new.notes)))
            rf = linter.lint_reproducer(new.reproducer)
            report.append('- reproducer `%s`: %s' % (new.reproducer.strip('`'), 'exists' if not rf else '; '.join(d for _, d in rf)))
        cl, bad = cite_lines(line)
        if bad:
            fails.append('%d citation(s) do not resolve or lie past a file\'s end' % bad)
        report.append('- citations:' if cl else '- citations: none with lines')
        report += cl
        for h in C.hashes(line):
            full = C.git('rev-parse', '--verify', '--quiet', h + '^{commit}').strip()
            if not full:
                fails.append('commit %s does not resolve' % h)
            elif subprocess.run(['git', '-C', C.ROOT, 'merge-base', '--is-ancestor', full, BASE]).returncode:
                fails.append('commit %s is not in the base\'s history' % h)
        if old:
            lost = sorted(tokens(old) - tokens(line))
            report.append('- in the old line, not in the new: ' + (', '.join('`%s`' % t for t in lost) if lost else 'nothing'))
        report += ['- FAIL ' + f for f in fails] or ['- every check passes']
        report.append('')
        if fails:
            failing.append(n)
        if not FINAL and new is not None:
            clean += ['Row %d' % n] + ['%s: %s' % (k, v.replace('\\|', '|')) for k, v in zip(
                ('Claim', 'Status', 'Class', 'Specification', 'Reproducer', 'Found by', 'Notes'),
                (new.claim, new.status, new.klass, new.spec, new.reproducer, new.found_by, new.notes))] + ['']
p = os.path.join(D, names[1])
if os.path.exists(p):
    for ln in open(p, encoding='utf-8'):
        f = ln.rstrip('\n').split('\t')
        if len(f) < 2 or not f[0].strip().isdigit() or not f[1].strip().isdigit():
            continue
        nlines += 1
        n, m, text = int(f[0]), int(f[1]), (f[2].strip() if len(f) > 2 else '')
        report.append('## Row %d, a duplicate of row %d' % (n, m))
        fails = []
        for x in (n, m):
            r = led_now.find(x)
            if len(r) != 1:
                fails.append('no row %d' % x)
            elif r[0].status_word not in C.OPEN:
                fails.append('row %d is %s, not open' % (x, r[0].status_word))
            g = guard(x)
            if g:
                report.append('- guard, row %d: %s' % (x, g))
        km = led_now.find(m)
        if text and len(km) == 1:
            notes = (km[0].notes + ' ' + L.escape_pipes(L.one_line(text))).strip()
            room_n, room_r = 700 - len(notes), 1200 - (len(km[0].line) + len(notes) - len(km[0].notes))
            report.append('- row %d with the added text: notes %d left, row %d left' % (m, room_n, room_r))
            if room_n < 0 or room_r < 0:
                fails.append('the added text takes row %d past its limits: rewrite row %d instead' % (m, m))
            clean += ['Row %d, text added from row %d' % (m, n), text, '']
        report += ['- FAIL ' + x for x in fails] or ['- every check passes']
        report.append('')
        if fails:
            failing.append(n)
p = os.path.join(D, names[2])
if os.path.exists(p):
    for ln in open(p, encoding='utf-8'):
        f = ln.rstrip('\n').split('\t')
        if len(f) < 3 or not f[0].strip().isdigit():
            continue
        nlines += 1
        n = int(f[0]); fails = []
        report.append('## Row %d, closed by %s, test %s' % (n, f[1].strip(), f[2].strip()))
        full = C.git('rev-parse', '--verify', '--quiet', f[1].strip() + '^{commit}').strip()
        if not full:
            fails.append('commit %s does not resolve' % f[1])
        elif subprocess.run(['git', '-C', C.ROOT, 'merge-base', '--is-ancestor', full, BASE]).returncode:
            fails.append('commit %s is not in the base\'s history' % f[1])
        else:
            report.append('- commit: ' + C.git('log', '-1', '--format=%h %ad %s', '--date=short', full).strip()[:160])
        try:
            t = linter.close_test(f[2].strip())
            if t is None and not (len(f) > 3 and f[3].strip()):
                fails.append('--test none needs a note with the reason')
            report.append('- test: %s' % (t or 'none'))
        except L.LedgerError as e:
            fails.append(str(e))
        r = led_now.find(n)
        settled = len(f) > 4 and f[4].strip()
        if len(r) == 1 and r[0].status_word == 'CONTESTED' and not settled:
            fails.append('row %d is CONTESTED: its close names what settled it (the fifth field)' % n)
        if len(r) == 1 and r[0].status_word != 'CONTESTED' and settled:
            fails.append('only a CONTESTED row takes a settled field')
        g = guard(n)
        if g:
            report.append('- guard: ' + g)
        report += ['- FAIL ' + x for x in fails] or ['- every check passes']
        report.append('')
        if fails:
            failing.append(n)

# the chunk applied on copies, then the ledger's own checks on them
cp = os.path.join(D, 'mech-copy')
shutil.rmtree(cp, ignore_errors=True)
os.makedirs(cp)
lc, hc = os.path.join(cp, 'ledger.md'), os.path.join(cp, L.HISTORY_NAME)
shutil.copy(os.path.join(C.ROOT, L.LEDGER_REL), lc)
shutil.copy(os.path.join(C.ROOT, 'explorations', L.HISTORY_NAME), hc)
ap = subprocess.run(['python3', os.path.join(C.HERE, 'apply.py'), D, '--keep-going', '--writer' if not FINAL else '--final',
                     '--ledger', lc, '--history', hc], capture_output=True, text=True)
report.append('## Applied on copies of the ledger and its history (apply.py --keep-going)')
report.append('')
report += ['    ' + x for x in (ap.stdout + ap.stderr).strip().split('\n')]
if 'held' in ap.stdout and re.search(r', [1-9]\d* held', ap.stdout):
    failing.append('apply')
for label, cmd in (('ledger.py check', ['check', '--summary']), ('ledger.py check --base ' + BASE[:9], ['check', '--base', BASE, '--summary'])):
    r = subprocess.run(['python3', os.path.join(C.TOOLS, 'ledger.py')] + cmd + ['--ledger', lc, '--history', hc], capture_output=True, text=True)
    report.append('')
    report.append('- %s on the copies: exit %d' % (label, r.returncode))
    report += ['    ' + x for x in (r.stdout + r.stderr).strip().split('\n')[-6:]]
    if r.returncode:
        failing.append(label)
shutil.rmtree(cp, ignore_errors=True)
fail = sorted({str(x) for x in failing})
last = 'MECH: %d lines, %d failing%s' % (nlines, len(fail), ', every check passes.' if not fail else ': ' + ', '.join(fail))
report += ['', last]
open(os.path.join(D, 'mech-final.md' if FINAL else 'mech.md'), 'w', encoding='utf-8').write('\n'.join(report) + '\n')
if not FINAL:
    open(os.path.join(D, 'clean.txt'), 'w', encoding='utf-8').write('\n'.join(clean) + '\n' if clean else '(no rewritten line)\n')
print(last)
