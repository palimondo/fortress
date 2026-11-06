#!/usr/bin/env python3
"""evidence.py --out RUN_DIR --chunk NAME=N,N,... [--chunk ...] [--base REV] [--no-run] [--run-tests]
       [--signals FILE] [--refused FILE]

The ledger pass's evidence and mechanical checks, before the writer: one file per row, read-only on the
tree, written into the run's folder. For each row of each chunk, RUN_DIR/NAME/evidence/N.md holds:
  the row's line as read (its sha is the landing guard's), the commit that last wrote it, its latest
  earlier line from the history; the template check; each cited file and line with its text at the base,
  whether the lines still hold the backticked words of the citation's sentence (or where those words now
  stand), and whether the cited lines changed since the row was written or since the commit it pins;
  each commit hash it names, resolved, with its subject and whether the base holds it; the reproducer's
  kind and whether it exists, and each test the notes name; the rows it names, with their status; its
  likely overlaps among the open rows (one file within 10 lines, one reproducer, two rare names, a row
  named), with the chunk each sits in; the FACTS and POSITIONS lines that name it; the refused notes that
  wait for it (the health check's refused_notes.py, climb batches 11 to 26); its signals (the health
  check's signals.py); and, where the reproducer is a program, its run under walk.
RUN_DIR/NAME/mech.tsv holds one line of verdicts per row, RUN_DIR/NAME/rows.tsv the guard (row, sha,
base). RUN_DIR/run/ holds base.txt, signals.tsv, refused.tsv, the runs' outputs (repro/) and the private
caches folder. The last line printed is "EVIDENCE DONE ..." when every chunk was written.

The run under walk: a reproducer that is a .fss program under explorations/ (a probe that no gate runs)
runs always; a walk test (ProjectFortress/tests/) runs only when the newest gate no longer holds for the
base (a path the gate reads changed since its summary landed), or with --run-tests, since a green gate
measured it otherwise (fortress-repo SKILL.md, "Reuse each result"). A compiled test (compiler_tests/,
library_tests/, other_compiler_tests/) is never run here: the prober runs one when a question needs it.
Each run: from the main tree's build, FORTRESS_CACHES the run's private folder, one JVM at a time on the
machine (flock on tmp/ledger-pass-jvm.lock), nice 19, a 200 s timeout; an output that an earlier attempt
wrote in RUN_DIR/run/repro/ for the same program is reused. --no-run runs nothing.
"""
import argparse, collections, fcntl, os, re, subprocess, sys
import common as C

L = C.L
ap = argparse.ArgumentParser()
ap.add_argument('--out', required=True)
ap.add_argument('--chunk', action='append', required=True, metavar='NAME=N,N')
ap.add_argument('--base', default='HEAD')
ap.add_argument('--no-run', action='store_true')
ap.add_argument('--run-tests', action='store_true')
ap.add_argument('--signals')
ap.add_argument('--refused')
a = ap.parse_args()

OUT = os.path.abspath(a.out)
RUN = os.path.join(OUT, 'run')
os.makedirs(os.path.join(RUN, 'repro'), exist_ok=True)
BASE = C.git('rev-parse', '--verify', a.base + '^{commit}').strip()
if not BASE:
    sys.exit('evidence.py: %s is no commit' % a.base)
chunks = collections.OrderedDict()
for c in a.chunk:
    name, _, nums = c.partition('=')
    chunks[name] = [int(x) for x in re.findall(r'\d+', nums)]
chunk_of = {n: k for k, ns in chunks.items() for n in ns}

tree = C.Tree(BASE)
led = C.ledger_at(BASE)
by_num = {r.num: r for r in led.rows}
openrows = [r for r in led.rows if r.status_word in C.OPEN]
linter = L.Linter(C.ROOT, by_num)
with open(os.path.join(RUN, 'base.txt'), 'w') as f:
    f.write(BASE + '\n')

# The commit that last wrote each line of the ledger at the base.
blame, cur = {}, None
for ln in C.git('blame', '--line-porcelain', BASE, '--', L.LEDGER_REL).split('\n'):
    m = re.match(r'^([0-9a-f]{40}) \d+ (\d+)', ln)
    if m:
        cur = (m.group(1), int(m.group(2)))
    elif ln.startswith('\t') and cur:
        blame[cur[1]] = cur[0]
def written_by(r):
    h = blame.get(r.lineno)
    return h, C.git('log', '-1', '--format=%h %ad %s', '--date=short', h).strip() if h else ''

# The history file at the base: each row's earlier lines.
hist = collections.defaultdict(list)
htext = C.git('show', '%s:explorations/%s' % (BASE, L.HISTORY_NAME))
for m in re.finditer(r'^### Row (\d+)\n\n(.*?)\n\n(\|.*?)\n', htext, re.M):
    hist[int(m.group(1))].append((m.group(2), m.group(3)))

# The commits since the ledger's rework, newest first, with the rows their messages name.
commits = []
for blk in C.git('log', '--format=%h%x09%ad%x09%s%x09%b%x1e', '--date=short', 'ae4f8e38a..' + BASE).split('\x1e'):
    parts = blk.strip('\n').split('\t', 3)
    if len(parts) == 4:
        commits.append((parts[0], parts[1], parts[2], set(C.row_refs(parts[2] + ' ' + parts[3]))))
order = {h[:7]: i for i, (h, _, _, _) in enumerate(commits)}

# The newest gate, and whether it holds for the base (fortress-repo gate.md, "When to run it").
GATE = C.git('log', '-1', '--format=%h', BASE, '--', 'explorations/compile-ladder/climb-batch-*/gate/summary.txt').strip()
changed = [p for p in C.git('diff', '--name-only', GATE, BASE, '--', 'ProjectFortress', 'Library', 'build.xml').split('\n')
           if p and not re.match(r'^ProjectFortress/([^/]*_)?tests/[^/]*\.(fss|fsi|test)$', p)] if GATE else ['no gate']
GATE_HOLDS = not changed

# The health check's scripts, run as they are, once for the run.
def tool_out(path, cmd):
    if path and os.path.exists(path):
        return open(path, encoding='utf-8').read()
    out = subprocess.run(cmd, capture_output=True, text=True, cwd=C.ROOT).stdout
    return out
HS = os.path.join(C.ROOT, 'explorations/coordinator/ledger-health-2026-10-22/scripts/')
sig_text = tool_out(a.signals, ['python3', HS + 'signals.py'])
open(os.path.join(RUN, 'signals.tsv'), 'w').write(sig_text)
signals = collections.defaultdict(list)
for ln in sig_text.split('\n'):
    p = ln.split('\t')
    if len(p) >= 4 and p[0].isdigit():
        signals[int(p[0])].append((p[2], p[3]))
batches = sorted(d for d in os.listdir(os.path.join(C.ROOT, 'explorations/compile-ladder'))
                 if re.fullmatch(r'climb-batch-(1[1-9]|2\d)', d))
ref_text = tool_out(a.refused, ['python3', HS + 'refused_notes.py'] + ['explorations/compile-ladder/' + d for d in batches])
open(os.path.join(RUN, 'refused.tsv'), 'w').write(ref_text)
refused = collections.defaultdict(list)
for ln in ref_text.split('\n'):
    p = ln.split('\t')
    if len(p) >= 9 and p[1].isdigit():
        refused[int(p[1])].append(p)

# FACTS and POSITIONS lines that name a row.
record = collections.defaultdict(list)
for rel in (L.FACTS_REL, L.POSITIONS_REL):
    for i, ln in enumerate(C.git('show', '%s:%s' % (BASE, rel)).split('\n'), 1):
        for n in C.row_refs(ln):
            record[n].append((rel.rsplit('/', 1)[-1], i, ln))

# Overlaps among all open rows.
pairs = C.links(openrows, tree)
neigh = collections.defaultdict(list)
for (x, y), why in pairs.items():
    neigh[x].append((y, why)); neigh[y].append((x, why))


def clip(s, n):
    s = s.replace('\n', ' ')
    return s if len(s) <= n else s[:n - 1] + '…'


def head(n):
    r = by_num.get(n)
    return '%d %s: %s' % (n, r.status_word, clip(r.claim, 150)) if r else '%d: no such row' % n


def kind(r):
    """(kind, path or name, program to run or None, cwd, why it is or is not run)."""
    c = r.reproducer.strip()
    tok = c.strip('`')
    if c in ('none', ''):
        return 'none', '', None, None, ''
    tok = re.sub(r':\d[\d,-]*$', '', tok)
    path = None
    if '/' in tok:
        p, why = tree.resolve(tok)
        path = p
        if not p:
            return 'gone', tok, None, None, why
    else:
        try:
            path = linter.test_path(tok)
        except L.LedgerError as e:
            return 'gone', tok, None, None, str(e)
    if L.under_tests(path):
        name = path.rsplit('/', 1)[-1]
        k = 'xxx' if name.startswith('XXX') else 'plain'
        if not path.startswith('ProjectFortress/tests/'):
            return k, path, None, None, 'a compiled test (only ProjectFortress/tests/ runs under walk): not run here; the prober runs it if a question asks'
        prog = path if path.endswith('.fss') else path[:-5] + '.fss' if path.endswith('.test') else None
        if prog not in tree.set:
            return k, path, None, None, 'no program beside it: not run here'
        if GATE_HOLDS and not a.run_tests:
            return k, path, None, None, 'a gated walk test, and the newest gate %s holds for the base, so its green run measured it: no run' % GATE
        return k, path, prog, os.path.join(C.ROOT, 'ProjectFortress'), 'a walk test, run from ProjectFortress/ as the harness runs it'
    if path.startswith('explorations/') and path.endswith('.fss'):
        return 'probe', path, path, os.path.join(C.ROOT, os.path.dirname(path)), 'probe, run from its folder'
    return 'other', path, None, None, 'not a program'


def run_walk(n, prog, cwd):
    """Run prog under walk from the main tree's build, one JVM at a time; return (exit, tail). An output that
    an earlier attempt of this run wrote for the same program is reused, so a resumed step runs no JVM again."""
    done = os.path.join(RUN, 'repro', '%d.txt' % n)
    if os.path.exists(done):
        old = open(done, encoding='utf-8').read().rstrip('\n').split('\n')
        if old and old[0].endswith(' ' + os.path.relpath(os.path.join(C.ROOT, prog), cwd)) and old[-1].startswith('exit '):
            return int(old[-1].split()[1]), '\n'.join(old[1:-1][-25:])
    caches = os.path.join(RUN, 'caches')
    jtmp = os.path.join(RUN, 'jtmp')
    os.makedirs(caches, exist_ok=True); os.makedirs(jtmp, exist_ok=True)
    gm = os.path.join(caches, 'global.map')
    if not os.path.exists(gm):
        open(gm, 'wb').write(b'\0\0\0\0')
    env = dict(os.environ, JAVA_HOME='/usr/lib/jvm/java-25-openjdk-amd64', FORTRESS_HOME=C.ROOT,
               FORTRESS_THREADS='1', FORTRESS_CACHES=caches, TMPDIR=jtmp,
               PATH='/usr/lib/jvm/java-25-openjdk-amd64/bin:' + os.environ.get('PATH', ''),
               JAVA_FLAGS='-Xmx4g -Xss64m -Djava.io.tmpdir=' + jtmp)
    env.pop('JAVA_TOOL_OPTIONS', None)
    arg = os.path.relpath(os.path.join(C.ROOT, prog), cwd)
    os.makedirs(os.path.join(C.ROOT, 'tmp'), exist_ok=True)
    with open(os.path.join(C.ROOT, 'tmp/ledger-pass-jvm.lock'), 'a') as lk:
        fcntl.flock(lk, fcntl.LOCK_EX)
        r = subprocess.run(['nice', '-n', '19', 'timeout', '-k', '10', '200', os.path.join(C.ROOT, 'bin/fortress'), arg],
                           cwd=cwd, env=env, capture_output=True, text=True, stdin=subprocess.DEVNULL)
        fcntl.flock(lk, fcntl.LOCK_UN)
    out = (r.stdout + r.stderr).rstrip('\n')
    with open(os.path.join(RUN, 'repro', '%d.txt' % n), 'w') as f:
        f.write('$ cd %s && FORTRESS_CACHES=%s bin/fortress %s\n%s\nexit %d\n' % (cwd, caches, arg, out, r.returncode))
    return r.returncode, '\n'.join(out.split('\n')[-25:])


def cite_block(r):
    """The lines for the citations, and the verdict counts."""
    lines, verdict = [], collections.Counter()
    wrote, _ = written_by(r)
    for path, ranges, words, pin in C.citations(C.row_text(r)):
        p, why = tree.resolve(path)
        if not p:
            if path.startswith('explorations/') or why.startswith('ambiguous'):
                verdict['gone-or-ambiguous'] += 1
            else:
                verdict['gone'] += 1
            lines.append('- `%s`: %s' % (path, why))
            continue
        if not ranges or p.endswith('/'):
            continue
        text = tree.lines(p)
        n = len(text)
        for lo, hi in ranges:
            tag = '`%s:%s`' % (path, lo if lo == hi else '%d-%d' % (lo, hi))
            if lo > n:
                verdict['past-end'] += 1
                lines.append('- %s: past the end of `%s` (%d lines)' % (tag, p, n))
                continue
            since = pin or (wrote[:9] if wrote else None)
            moved = []
            held = []
            for w in words:
                at = [i + 1 for i, t in enumerate(text) if w in t]
                if not at or len(at) > 5:
                    continue
                if any(lo <= i <= hi for i in at):
                    held.append(w)
                else:
                    moved.append('%s now at :%s' % (w, ','.join(map(str, at[:3]))))
            v = 'moved' if moved else 'holds' if held else 'unchecked'
            verdict[v] += 1
            ch = tree.touched(since, p, lo, min(hi, n)) if since else 'unknown'
            if ch == 'touched':
                verdict['touched'] += 1
            lines.append('- %s → `%s`: words %s%s; since %s: %s' % (
                tag, p, v, (' (' + '; '.join(moved) + ')') if moved else (' (' + ', '.join(held) + ')') if held else '',
                ('pin ' + pin) if pin else ('the row\'s commit ' + since) if since else '?', ch))
            for i in range(max(lo, 1), min(hi, n, lo + 7) + 1):
                lines.append('      %d: %s' % (i, clip(text[i - 1].rstrip(), 170)))
    return lines, verdict


def write_row(name, n):
    r = by_num.get(n)
    if r is None:
        return '%d\tno such row' % n, None
    wrote, wline = written_by(r)
    out = ['# Row %d, evidence at %s' % (n, BASE[:9]), '',
           'Section: %s. Chunk: %s. Status: %s.' % (r.section, name, r.status_word), '',
           '## The row as read (the guard\'s line, sha %s)' % C.sha(r.line), '', r.line, '',
           'Last written by %s.' % (wline or 'unknown')]
    h = hist.get(n, [])
    if h:
        what, old = h[-1]
        out += ['', '## Its latest earlier line (the history holds %d; the latest: "%s")' % (len(h), what), '', clip(old, 1400)]
    out += ['', '## Mechanical checks', '']
    fails = linter.lint(r)
    out.append('- template: ' + ('passes' if not fails else '; '.join('%s: %s' % f for f in fails)))
    k, path, prog, cwd, why = kind(r)
    out.append('- reproducer: `%s`: %s%s' % (r.reproducer.strip().strip('`'), k, (' (%s)' % path if path and path not in r.reproducer else '') + (', ' + why if why else '')))
    silent = r.status_word == 'NEGATIVE-VERIFIED' and r.spec.strip() == 'silent'
    if silent:
        out.append('- silent: NEGATIVE-VERIFIED beside a spec cell of `silent` (review-queue item 265)')
    cl, verdict = cite_block(r)
    out.append('- citations: ' + (', '.join('%s %d' % kv for kv in sorted(verdict.items())) or 'none with lines'))
    out += ['  ' + x for x in cl]
    bad_commits = 0
    hs = C.hashes(r.line)
    if hs:
        out.append('- commits:')
        for x in hs:
            full = C.git('rev-parse', '--verify', '--quiet', x + '^{commit}').strip()
            if not full:
                bad_commits += 1
                out.append('  - `%s`: does not resolve' % x)
                continue
            inb = subprocess.run(['git', '-C', C.ROOT, 'merge-base', '--is-ancestor', full, BASE]).returncode == 0
            bad_commits += 0 if inb else 1
            out.append('  - `%s`: %s%s' % (x, C.git('log', '-1', '--format=%ad %s', '--date=short', full).strip()[:140],
                                           '' if inb else '; NOT in the base\'s history'))
    tests_bad = 0
    named = [w for w in re.findall(r'`([^`]+)`', r.notes + ' ' + r.claim)
             if re.fullmatch(r'[A-Z][\w]*(?:Walk|Compiled|Test|Rung\w*|\d)?', w) and (w.startswith('XXX') or re.search(r'(Walk|Compiled|Test)$', w))]
    if named:
        out.append('- tests the row names:')
        for w in dict.fromkeys(named):
            try:
                out.append('  - `%s`: %s' % (w, linter.test_path(w)))
            except L.LedgerError as e:
                twin = None
                if w.startswith('XXX'):
                    try:
                        twin = linter.test_path(w[3:])
                    except L.LedgerError:
                        pass
                tests_bad += 1
                out.append('  - `%s`: %s' % (w, ('gone; a plain twin exists: ' + twin) if twin else str(e)))
    # since the row was written
    files = sorted({tree.resolve(p)[0] for p, _, _, _ in C.citations(C.row_text(r))} - {None})
    if wrote and files:
        log = C.git('log', '--format=%h %ad %s', '--date=short', '-8', wrote + '..' + BASE, '--', *files).strip()
        out += ['', '## Commits since the row was written that touch its cited files (newest first, at most 8)', '']
        out += ['- ' + clip(x, 160) for x in log.split('\n')] if log else ['- none']
    w7 = wrote[:7] if wrote else None
    lim = order.get(w7, len(commits))
    naming = [c for c in commits[:lim] if n in c[3]]
    out += ['', '## Commits since the row was written whose message names it (at most 6)', '']
    out += ['- %s %s %s' % (h_, d, clip(s, 140)) for h_, d, s, _ in naming[:6]] or ['- none']
    refs = C.row_refs(C.row_text(r), n)
    if refs:
        out += ['', '## Rows it names', ''] + ['- ' + head(x) for x in refs]
    nb = sorted(neigh.get(n, []))
    out += ['', '## Likely overlaps among the open rows', '']
    for m, why in nb[:14]:
        where = 'this chunk' if chunk_of.get(m) == name else ('chunk %s of this run' % chunk_of[m]) if m in chunk_of else 'outside this run'
        out.append('- %s (%s; %s): %s' % (head(m), where, by_num[m].section.split('.')[0] if m in by_num else '?', ', '.join(sorted(why))))
    if not nb:
        out.append('- none found')
    if record.get(n):
        out += ['', '## FACTS and POSITIONS lines that name it', '']
        for fn, i, ln in record[n][:6]:
            pos = max(0, ln.find(str(n)) - 150)
            out.append('- %s:%d: %s' % (fn, i, clip(ln[pos:pos + 320], 320)))
    if refused.get(n):
        out += ['', '## Notes a gather could not write (refused_notes.py: batch, status now, changed since, record line, first words)', '']
        for p in refused[n]:
            out.append('- batch %s, %s, %s, `%s`: %s' % (p[0], p[2], p[5], p[7], clip(p[8], 200)))
    if signals.get(n):
        out += ['', '## Signals (signals.py)', ''] + ['- %s: %s' % (s, clip(d, 200)) for s, d in signals[n]]
    run_state = '-'
    if prog and not a.no_run:
        code, tail = run_walk(n, prog, cwd)
        run_state = 'exit %d' % code
        out += ['', '## The reproducer under walk (from the main tree\'s build, a private caches folder; output whole in %s)' % os.path.join(RUN, 'repro', '%d.txt' % n), '',
                '    $ cd %s && bin/fortress %s' % (os.path.relpath(cwd, C.ROOT) or '.', os.path.relpath(os.path.join(C.ROOT, prog), cwd)), '']
        out += ['    ' + x for x in tail.split('\n')] + ['    exit %d' % code]
    elif prog:
        run_state = 'not run (--no-run)'
    d = os.path.join(OUT, name, 'evidence')
    with open(os.path.join(d, '%d.md' % n), 'w', encoding='utf-8') as f:
        f.write('\n'.join(out) + '\n')
    cites = ','.join('%s:%d' % kv for kv in sorted(verdict.items())) or '-'
    sigs = ','.join(sorted({s for s, _ in signals.get(n, [])})) or '-'
    mech = '\t'.join(map(str, (n, C.sha(r.line), 'ok' if not fails else 'FAIL', cites, bad_commits, tests_bad,
                               k + ('' if not prog else ':' + run_state), sigs, 'silent' if silent else '-',
                               len(refused.get(n, [])), len(nb), len(r.line))))
    return mech, (n, C.sha(r.line), BASE)


done = 0
for name, nums in chunks.items():
    os.makedirs(os.path.join(OUT, name, 'evidence'), exist_ok=True)
    mech, guard = ['row\tsha\ttemplate\tcitations\tbad commits\tbad tests\treproducer\tsignals\tsilent\trefused\toverlaps\tlength'], []
    for n in nums:
        m, g = write_row(name, n)
        mech.append(m)
        if g:
            guard.append('\t'.join(map(str, g)))
    open(os.path.join(OUT, name, 'mech.tsv'), 'w').write('\n'.join(mech) + '\n')
    open(os.path.join(OUT, name, 'rows.tsv'), 'w').write('\n'.join(guard) + '\n')
    done += 1
    print('chunk %s: %d rows' % (name, len(nums)), flush=True)
print('EVIDENCE DONE %d chunks, %d rows, base %s, gate %s %s' % (
    done, sum(len(v) for v in chunks.values()), BASE[:9], GATE, 'holds' if GATE_HOLDS else 'does not hold: ' + ', '.join(changed[:3])))
