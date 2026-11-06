#!/usr/bin/env python3
"""apply.py DIR... [--final | --writer] [--guard] [--plan] [--keep-going] [--held FILE] [--skip FILE]
          [--ledger FILE] [--history FILE]

Apply the ledger pass's judged chunks through ledger.py, the one writer of rows. DIR is a chunk folder or a
run's folder (every chunk folder in it). For each chunk, in this order: each line of final.rewrite through
`ledger.py rewrite N FILE`; each line of final.dups (N<TAB>M<TAB>TEXT) through `ledger.py duplicate N --of M
[--add TEXT]`; each line of final.closes (N<TAB>HASH<TAB>TEST<TAB>NOTE<TAB>SETTLED) through `ledger.py close N
--commit HASH --test TEST [--note NOTE] [--settled SETTLED]`. --writer reads the writer's files instead
(rows.rewrite, dups.txt, closes.txt), for the mechanical check on copies.

A change already made (the row is that line, already FIXED, already that DUPLICATE) is skipped, so a run
applied again after a stop applies only the rest. --guard holds each change whose row (and, for a duplicate
with text, the kept row) no longer reads as the run read it: the sha in the run's rows.tsv files, written by
evidence.py, against the row's line now; a row this apply changed itself is not held for it. --plan prints
what it would do and writes nothing. --keep-going holds a change that ledger.py refuses and goes on; without
it, the first refusal stops the apply (exit 1). --held FILE writes the held changes (row, kind, why);
--skip FILE skips the rows of such a file. --ledger and --history pass through to ledger.py, so an apply on
copies writes nothing real. Last line: "apply.py: A applied, K already, H held".
"""
import os, re, subprocess, sys, tempfile
import common as C

L = C.L
argv = sys.argv[1:]
flags = {f for f in ('--final', '--writer', '--guard', '--plan', '--keep-going') if f in argv}
opts = {}
for o in ('--held', '--skip', '--ledger', '--history'):
    if o in argv:
        i = argv.index(o); opts[o] = argv[i + 1]; argv = argv[:i] + argv[i + 2:]
dirs = [d for d in argv if d not in flags]
if not dirs:
    sys.exit(__doc__)
names = ('rows.rewrite', 'dups.txt', 'closes.txt') if '--writer' in flags else ('final.rewrite', 'final.dups', 'final.closes')
passthru = [x for o in ('--ledger', '--history') if o in opts for x in (o, opts[o])]
LEDGER = opts.get('--ledger') or os.path.join(C.ROOT, L.LEDGER_REL)


def chunk_dirs(d):
    d = os.path.abspath(d)
    if os.path.exists(os.path.join(d, 'run', 'base.txt')):
        return sorted(os.path.join(d, x) for x in os.listdir(d) if x != 'run' and os.path.isdir(os.path.join(d, x)))
    return [d]


chunks = [c for d in dirs for c in chunk_dirs(d)]
read = {}
for run in {os.path.dirname(c) for c in chunks}:
    for x in os.listdir(run):
        p = os.path.join(run, x, 'rows.tsv')
        if os.path.exists(p):
            for ln in open(p):
                f = ln.rstrip('\n').split('\t')
                if len(f) >= 2 and f[0].isdigit():
                    read[int(f[0])] = f[1]
skip = set()
if '--skip' in opts and os.path.exists(opts['--skip']):
    skip = {int(ln.split('\t')[0]) for ln in open(opts['--skip']) if ln[:1].isdigit()}

ours, held, counts = set(), [], {'applied': 0, 'already': 0, 'held': 0}


def now(n):
    led = C.ledger_now(LEDGER)
    hits = led.find(n)
    return hits[0] if len(hits) == 1 else None


def hold(n, kind, why):
    held.append((n, kind, why)); counts['held'] += 1
    print('held %s %d: %s' % (kind, n, why))


def guard_fails(rows):
    for n in rows:
        r = now(n)
        if r is None:
            return '%d is not one row' % n
        if n in ours:
            continue
        if n not in read:
            return 'row %d is in no rows.tsv of the run, so its line as read is unknown' % n
        if C.sha(r.line) != read[n]:
            return 'row %d changed since the run read it (sha %s, now %s)' % (n, read[n], C.sha(r.line))
    return None


def run(kind, n, cmd, rows):
    if n in skip:
        print('skipped %s %d (--skip)' % (kind, n)); return
    if '--guard' in flags:
        why = guard_fails(rows)
        if why:
            hold(n, kind, why); return
    if '--plan' in flags:
        print('would run: ledger.py ' + ' '.join(cmd)); counts['applied'] += 1; return
    r = subprocess.run(['python3', os.path.join(C.TOOLS, 'ledger.py')] + cmd + passthru, capture_output=True, text=True)
    if r.returncode:
        msg = (r.stdout + r.stderr).strip().replace('\n', ' ')
        if '--keep-going' in flags:
            hold(n, kind, 'ledger.py refused: ' + msg); return
        print('refused %s %d: %s' % (kind, n, msg)); write_held(); sys.exit(1)
    ours.update(rows); counts['applied'] += 1
    print('applied %s %d: %s' % (kind, n, r.stdout.strip().splitlines()[-1] if r.stdout.strip() else ''))


def write_held():
    if '--held' in opts:
        with open(opts['--held'], 'w') as f:
            for n, k, w in held:
                f.write('%d\t%s\t%s\n' % (n, k, w))


for c in chunks:
    p = os.path.join(c, names[0])
    if os.path.exists(p):
        for line in open(p, encoding='utf-8'):
            m = re.match(r'\| *(\d+) *\|', line)
            if not m:
                continue
            n = int(m.group(1)); r = now(n)
            if r is not None and r.line == line.rstrip('\n'):
                counts['already'] += 1; print('already rewrite %d' % n); continue
            if '--plan' in flags:
                run('rewrite', n, ['rewrite', str(n), '<its line in %s>' % os.path.join(os.path.basename(c), names[0])], [n])
                continue
            fd, tmp = tempfile.mkstemp(suffix='.row', dir=os.path.join(C.ROOT, 'tmp') if os.path.isdir(os.path.join(C.ROOT, 'tmp')) else None)
            with os.fdopen(fd, 'w') as f:
                f.write(line)
            run('rewrite', n, ['rewrite', str(n), tmp], [n])
            os.unlink(tmp)
    p = os.path.join(c, names[1])
    if os.path.exists(p):
        for line in open(p, encoding='utf-8'):
            f = line.rstrip('\n').split('\t')
            if len(f) < 2 or not f[0].strip().isdigit() or not f[1].strip().isdigit():
                continue
            n, m, text = int(f[0]), int(f[1]), (f[2].strip() if len(f) > 2 else '')
            r = now(n)
            if r is not None and r.status_word == 'DUPLICATE' and re.search(r'duplicate of row %d\b' % m, r.notes):
                counts['already'] += 1; print('already duplicate %d' % n); continue
            run('duplicate', n, ['duplicate', str(n), '--of', str(m)] + (['--add', text] if text else []), [n] + ([m] if text else []))
    p = os.path.join(c, names[2])
    if os.path.exists(p):
        for line in open(p, encoding='utf-8'):
            f = line.rstrip('\n').split('\t')
            if len(f) < 3 or not f[0].strip().isdigit():
                continue
            n = int(f[0]); r = now(n)
            if r is not None and r.status_word == 'FIXED':
                counts['already'] += 1; print('already close %d' % n); continue
            cmd = ['close', str(n), '--commit', f[1].strip(), '--test', f[2].strip()]
            if len(f) > 3 and f[3].strip():
                cmd += ['--note', f[3].strip()]
            if len(f) > 4 and f[4].strip():
                cmd += ['--settled', f[4].strip()]
            run('close', n, cmd, [n])
write_held()
print('apply.py: %(applied)d applied, %(already)d already, %(held)d held' % counts + (' (plan only, nothing written)' if '--plan' in flags else ''))
