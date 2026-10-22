#!/usr/bin/env python3
"""Staleness signals over the gap ledger's rows that need no build or test run.

Reads the ledger with ledger.py's own parser, the tree with git, and FACTS and
POSITIONS as text. Writes one TSV line per (row, signal) to stdout:
  row  status  signal  detail
and a count per signal to stderr. Signals (the open rows are NEGATIVE-VERIFIED,
NEGATIVE-BOUNDED and CONTESTED unless a signal says otherwise):

  path-gone           a path the row cites (any cell) is no file of the tree,
                      from the root, from Specification/ or as a unique suffix
                      of a tracked path; split by where it was:
                        gone-explorations-explained  under explorations/, and the row says
                                                     where to read it ("parent of", "history")
                        gone-explorations            under explorations/, not explained
                        gone-tree                    outside explorations/ (deleted or renamed;
                                                     the rename target given when git has one)
  line-past-end       a file:line the row cites lies past the file's end today
  pinned-file-changed the row says a file:line was true "at HASH", and the file
                      changed between HASH and HEAD (the line may have moved)
  repro-promoted      the reproducer (or its .test's component) is a plain test
                      whose file git renamed from an XXX name (a promotion: the
                      fix may have landed)
  repro-xxx-gone      the reproducer is an XXX test whose file is gone; a plain
                      twin exists
  repro-plain-settled an open NEGATIVE-VERIFIED row whose spec cell is not
                      `silent` and whose reproducer is a plain test (home 2 asks
                      for an XXX test; a plain one pins today's behaviour or
                      asserts a fix)
  notes-xxx-gone      the row names an XXX test that no longer exists (a plain
                      twin exists: promoted)
  commit-says-fixed   a code- or tool-landing commit since the rework names the
                      open row in a sentence with a repair word
  subject-names-row   such a commit's subject line names the open row (a commit
                      made for that row)
  notes-refused       a commit message since the rework lists the row among
                      notes that ledger.py refused (refused_notes.py reads the
                      batch records' own lists)
  record-says-fixed   FACTS or POSITIONS names the open row in a sentence with a
                      repair word
  record-says-open    FACTS or POSITIONS names a FIXED row in a sentence with an
                      open word
  entry-gone          the row cites F-N or P-N that FACTS / POSITIONS no longer hold
  siblings-closed     every sibling the open row lists is closed
  row-cites-closed    the open row's claim names another row that is closed

usage: signals.py [--base REWORK_COMMIT]
"""
import collections, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'explorations', 'coordinator', 'tools'))
import ledger as L

OPEN = ('NEGATIVE-VERIFIED', 'NEGATIVE-BOUNDED', 'CONTESTED')
BASE = 'ae4f8e38a'
if '--base' in sys.argv:
    BASE = sys.argv[sys.argv.index('--base') + 1]


def git(*a):
    return subprocess.run(['git', '-C', ROOT] + list(a), capture_output=True, text=True).stdout


led = L.Ledger(os.path.join(ROOT, L.LEDGER_REL))
by_num = {r.num: r for r in led.rows}
linter = L.Linter(ROOT, by_num)
tracked = git('ls-files').split('\n')
tracked = [t for t in tracked if t]
tracked_set = set(tracked)
by_base = collections.defaultdict(list)
for t in tracked:
    by_base[t.rsplit('/', 1)[-1]].append(t)

# every path git ever held, for deleted or renamed files
_ever = None
def ever():
    global _ever
    if _ever is None:
        _ever = set(p for p in git('log', '--all', '--format=', '--name-only').split('\n') if p)
    return _ever

_renames = None
def renames():
    """old path -> new path, from every rename git records on HEAD's history."""
    global _renames
    if _renames is None:
        _renames = {}
        out = git('log', '--format=', '--name-status', '-M', '--diff-filter=R', 'HEAD')
        for ln in out.split('\n'):
            parts = ln.split('\t')
            if len(parts) == 3 and parts[0].startswith('R'):
                _renames.setdefault(parts[1], parts[2])
    return _renames


def follow_rename(path):
    seen = set()
    while path in renames() and path not in seen:
        seen.add(path)
        path = renames()[path]
    return path


def resolve(path):
    """('ok', fullpath) | ('ambiguous', [paths]) | ('gone', None)"""
    p = path.rstrip('/')
    for base in ('', 'Specification/', 'ProjectFortress/'):
        full = os.path.join(ROOT, base + p)
        if os.path.exists(full):
            return 'ok', base + p
    hits = [t for t in tracked if t == p or t.endswith('/' + p)]
    if path.endswith('/'):
        hits = [t for t in tracked if ('/' + p + '/') in ('/' + t)]
        return ('ok', p) if hits else ('gone', None)
    if len(hits) == 1:
        return 'ok', hits[0]
    if hits:
        return 'ambiguous', hits
    return 'gone', None


out = []
def emit(r, sig, detail):
    out.append((r.num, r.status_word, sig, detail.replace('\t', ' ').replace('\n', ' ')))


line_count = {}
def nlines(p):
    if p not in line_count:
        try:
            with open(os.path.join(ROOT, p), encoding='utf-8', errors='replace') as f:
                line_count[p] = sum(1 for _ in f)
        except (IsADirectoryError, FileNotFoundError):
            line_count[p] = None
    return line_count[p]


EXPLAINED = re.compile(r'parent of|git show|deleted in|removed in|no longer in the tree|from (?:git )?history', re.I)

# ---------------------------------------------------------------- paths
def path_signals(r):
    text = r.line.replace('\\|', ' ')
    seen = set()
    last_file = None
    for path, lines in L.path_tokens(text):
        if (path, lines) in seen:
            continue
        seen.add((path, lines))
        if path.startswith('.') and not path.startswith('./'):
            # `.fss:407`: the extension alone, read against the last file named
            continue
        if re.fullmatch(r'[\w+-]+', path.rsplit('.', 1)[0]) and '/' not in path and path.endswith('.md') and path in ('REPORT.md', 'RECORD.md', 'SKEPTIC.md', 'JUDGE.md', 'record.md', 'README.md', 'gaps.md', 'FACTS.md', 'POSITIONS.md', 'PLAN.md'):
            continue
        state, got = resolve(path)
        if state == 'gone':
            expl = 'explained' if EXPLAINED.search(r.line) else 'unexplained'
            if path.startswith('explorations/') or path.startswith('run-') or path.startswith('apl/'):
                emit(r, 'path-gone', 'probe-%s: %s' % (expl, path))
                continue
            new = None
            cands = [path] if path in ever() else [p for p in ever() if p.endswith('/' + path)]
            if not cands:
                kind = 'never-placeholder' if re.fullmatch(r'(P|Q|X|Use|Main)\.\w+|\w+_cache/|//\w+//', path) else (
                       'never-skeptic-probe' if re.match(r'Sk', os.path.basename(path)) else 'never')
                emit(r, 'path-gone', '%s: %s (no such path in git history)' % (kind, path))
                continue
            for c in cands:
                n = follow_rename(c)
                if n != c and n in tracked_set:
                    new = n
                    break
            where = 'probe' if all(c.startswith('explorations/') or c.startswith('research/') for c in cands) else 'tree'
            if where == 'probe':
                emit(r, 'path-gone', 'probe-%s: %s (was %s)' % (expl, path, cands[0]))
            else:
                emit(r, 'path-gone', 'tree-%s: %s%s' % ('renamed' if new else 'deleted', path, (' -> ' + new) if new else ' (was %s)' % ', '.join(cands[:2])))
            continue
        if state == 'ok' and lines:
            n = nlines(got)
            if n is not None:
                for lo, hi in L.line_ranges(lines):
                    if hi > n:
                        emit(r, 'line-past-end', '%s:%s, the file has %d lines' % (got, lines, n))
                        break


PIN = re.compile(r'`?([\w./+-]+\.(?:fss|fsi|java|scala|rats|tex))`?:(\d[\d,-]*)[^|]{0,60}?\(?\bat `?([0-9a-f]{7,40})`?')
def pinned_signals(r):
    for m in PIN.finditer(r.line):
        path, lines, h = m.groups()
        state, got = resolve(path)
        if state != 'ok':
            continue
        if not git('rev-parse', '--verify', '--quiet', h + '^{commit}').strip():
            emit(r, 'pinned-file-changed', '%s:%s at %s: no such commit' % (got, lines, h))
            continue
        diff = git('diff', '--numstat', h, 'HEAD', '--', got).strip()
        if diff:
            a, d, _ = diff.split('\t', 2)
            emit(r, 'pinned-file-changed', '%s:%s at %s; +%s -%s lines since' % (got, lines, h, a, d))


# ---------------------------------------------------------------- reproducers
def is_xxx_test(path):
    name = os.path.basename(path)
    if 'XXX' in name:
        return True
    if path.endswith('.test'):
        try:
            for ln in open(os.path.join(ROOT, path), encoding='utf-8', errors='replace'):
                if ln.startswith('tests=') and 'XXX' in ln:
                    return True
        except FileNotFoundError:
            pass
    return False


def under_tests(path):
    return path.startswith('ProjectFortress/') and any(
        seg == 'tests' or seg.endswith('_tests') or seg in L.TEST_FOLDERS_EXTRA for seg in path.split('/')[1:2])


def promoted_from(path):
    """The XXX name git renamed this file from, if any."""
    log = git('log', '--follow', '--name-status', '--format=%h', '-M', '--', path)
    cur = None
    for ln in log.split('\n'):
        parts = ln.split('\t')
        if len(parts) == 3 and parts[0].startswith('R') and 'XXX' in os.path.basename(parts[1]) and 'XXX' not in os.path.basename(parts[2]):
            return parts[1], cur
        if re.fullmatch(r'[0-9a-f]{7,40}', ln.strip()):
            cur = ln.strip()
    return None


def plain_twin(path):
    base = os.path.basename(path).replace('XXX', '', 1)
    d = os.path.dirname(path)
    hits = [t for t in tracked if t.startswith(d + '/') and os.path.basename(t) == base] if d else by_base.get(base, [])
    return hits[0] if hits else None


def repro_signals(r):
    c = r.reproducer.strip().strip('`')
    if c in ('none', '') or re.search(r'\s', c):
        return
    c = re.sub(r':\d[\d,-]*$', '', c)
    path = None
    if os.path.exists(os.path.join(ROOT, c)):
        path = c
    elif '/' not in c:
        try:
            path = linter.test_path(c)
        except L.LedgerError:
            path = None
    if path is None:
        if 'XXX' in c:
            tw = plain_twin(c)
            if tw:
                emit(r, 'repro-xxx-gone', '%s gone; plain twin %s' % (c, tw))
                return
        return
    if not under_tests(path):
        return
    xxx = is_xxx_test(path)
    if not xxx:
        pf = promoted_from(path)
        if pf:
            emit(r, 'repro-promoted', '%s was %s, renamed in %s' % (path, pf[0], pf[1]))
        if r.status_word == 'NEGATIVE-VERIFIED' and r.spec.strip() != 'silent':
            emit(r, 'repro-plain-settled', '%s (spec: %s)' % (path, L.clip(r.spec, 80)))
        # also the component a .test drives
        if path.endswith('.test'):
            try:
                comp = [ln.split('=', 1)[1].strip() for ln in open(os.path.join(ROOT, path)) if ln.startswith('tests=')]
            except FileNotFoundError:
                comp = []
    else:
        tw = plain_twin(path)
        if tw and tw != path and not tw.endswith('Link.test'):
            emit(r, 'repro-xxx-gone', 'XXX test %s still exists beside a plain twin %s' % (path, tw))


XXXNAME = re.compile(r'\bXXX[A-Z]\w+')
def notes_xxx(r):
    for name in sorted(set(XXXNAME.findall(r.line))):
        stem = name
        exists = any(os.path.basename(t).split('.')[0] == stem for t in tracked if 'XXX' in t)
        if exists:
            continue
        plain = stem[3:]
        twins = [t for t in tracked if os.path.basename(t).split('.')[0] in (plain, plain + 'Link') and under_tests(t)]
        emit(r, 'notes-xxx-gone', '%s gone; %s' % (name, ('plain twin ' + twins[0]) if twins else 'no plain twin'))


# ---------------------------------------------------------------- row mentions in prose
ROWLIST = re.compile(r'\b[Rr]ows? ((?:\d{1,3})(?:(?:,|;)? (?:and |or |to |through )?\d{1,3}\b|, \d{1,3}\b)*)')
def rows_in(text):
    """[(row, start, end)] for every row a 'row N' / 'rows N, M and K' / 'rows N to M' names."""
    out = []
    for m in ROWLIST.finditer(text):
        body = m.group(1)
        nums = [int(x) for x in re.findall(r'\d{1,3}', body)]
        rng = re.findall(r'(\d{1,3}) (?:to|through) (\d{1,3})', body)
        for a, b in rng:
            a, b = int(a), int(b)
            if 0 < b - a < 40:
                nums += list(range(a, b + 1))
        for n in set(nums):
            out.append((n, m.start(), m.end()))
    return out


FIXWORD = re.compile(r'\b(fix(?:ed|es)?|repair(?:ed|s)?|clos(?:ed|es)|clears?|cleared|resolved|no longer|promoted|retired|gone)\b', re.I)
OPENWORD = re.compile(r'\b(still|open|waits?|owed|not yet|unfixed|remains?|deferred|blocks?|refuses?|refused|fails?)\b', re.I)


def sentences(text):
    return re.split(r'(?<=[.;])\s+(?=[A-Z`(*])', text)


def record_signals():
    for fname in ('FACTS.md', 'POSITIONS.md'):
        text = open(os.path.join(ROOT, 'explorations', 'coordinator', fname), encoding='utf-8').read()
        for ln in text.split('\n'):
            m = re.match(r'\s*[-*]?\s*\**\s*([FP]-\d+)', ln)
            ent = m.group(1) if m else '?'
            for s in sentences(ln):
                for n, a, b in rows_in(s):
                    r = by_num.get(n)
                    if r is None:
                        continue
                    if r.status_word in OPEN and FIXWORD.search(s):
                        emit(r, 'record-says-fixed', '%s %s: %s' % (fname, ent, L.clip(s.strip(), 260)))
                    elif r.status_word == 'FIXED' and OPENWORD.search(s):
                        emit(r, 'record-says-open', '%s %s: %s' % (fname, ent, L.clip(s.strip(), 260)))


STRICTFIX = re.compile(r'\b(repair(?:ed|s)?|fix(?:ed|es)|clos(?:ed|es)|clears?|cleared|resolved)\b', re.I)
NOTFIX = re.compile(r'\b(opened|added|refused|noted|named|notes? on|recorded|records|waits?|full\b|contested|re-?anchored)', re.I)
REFUSED = re.compile(r'notes? (?:on|for) (rows? [^.]*?)\b(?:were|was|is|are)? ?refused', re.I)


def commit_signals():
    log = git('log', '--format=%x01%h%x02%B', '%s..HEAD' % BASE)
    for chunk in log.split('\x01')[1:]:
        h, _, body = chunk.partition('\x02')
        flat = body.replace('\n', ' ')
        # notes the tool refused, as the commit message lists them (any commit)
        for m in re.finditer(r'[^.]*\brefused\b[^.]*', flat):
            s = m.group(0)
            if not re.search(r'\bnotes?\b', s):
                continue
            for n, a, b in rows_in(s):
                r = by_num.get(n)
                if r is not None:
                    emit(r, 'notes-refused', '%s: %s' % (h, L.clip(s.strip(), 200)))
        files = git('show', '--name-only', '--format=', h).split('\n')
        code = [f for f in files if f and (not f.startswith(('explorations/', '.claude/', 'research/')) or f.startswith('explorations/coordinator/tools/'))]
        if not code:
            continue
        subject = body.split('\n', 1)[0]
        for n, a, b in rows_in(subject):
            r = by_num.get(n)
            if r is not None and r.status_word in OPEN and not NOTFIX.search(subject):
                emit(r, 'subject-names-row', '%s: %s' % (h, L.clip(subject, 200)))
        for s in re.split(r'(?<=[.;:])\s+', flat):
            if not STRICTFIX.search(s) or NOTFIX.search(s):
                continue
            for n, a, b in rows_in(s):
                r = by_num.get(n)
                if r is not None and r.status_word in OPEN:
                    emit(r, 'commit-says-fixed', '%s: %s' % (h, L.clip(s.strip(), 260)))


ENTRY = re.compile(r'\b([FP])-(\d+)\b')
def entry_signals(r, have):
    for k, n in set(ENTRY.findall(r.line)):
        if (k, int(n)) not in have:
            emit(r, 'entry-gone', '%s-%s' % (k, n))


def sibling_signals(r):
    m = re.match(r'\s*siblings?:\s*([^.;]*)', r.notes)
    if not m:
        return
    nums = [int(x) for x in re.findall(r'\b\d{1,3}\b', m.group(1))]
    if nums and all(by_num.get(n) is not None and by_num[n].status_word in L.CLOSED for n in nums):
        emit(r, 'siblings-closed', 'siblings %s all closed (%s)' % (', '.join(map(str, nums)), ', '.join(by_num[n].status_word for n in nums)))


def claim_rows(r):
    for n, a, b in rows_in(r.claim):
        o = by_num.get(n)
        if o is not None and o.num != r.num and o.status_word in L.CLOSED:
            emit(r, 'row-cites-closed', 'claim names row %d, %s' % (n, o.status_word))


def main():
    have = set()
    for fname, k in (('FACTS.md', 'F'), ('POSITIONS.md', 'P')):
        for m in re.finditer(r'^\s*[-*]?\s*\**\s*%s-(\d+)\b' % k, open(os.path.join(ROOT, 'explorations', 'coordinator', fname), encoding='utf-8').read(), re.M):
            have.add((k, int(m.group(1))))
    for r in led.rows:
        if r.status_word in OPEN:
            path_signals(r)
            pinned_signals(r)
            repro_signals(r)
            notes_xxx(r)
            entry_signals(r, have)
            sibling_signals(r)
            claim_rows(r)
    record_signals()
    commit_signals()
    out.sort(key=lambda t: (t[2], t[0]))
    print('row\tstatus\tsignal\tdetail')
    for t in out:
        print('\t'.join(map(str, t)))
    cnt = collections.Counter(t[2] for t in out)
    rows = collections.defaultdict(set)
    for t in out:
        rows[t[2]].add(t[0])
    for k in sorted(cnt):
        sys.stderr.write('%-22s %4d hits, %4d rows\n' % (k, cnt[k], len(rows[k])))


main()
