"""common.py: what the ledger pass's scripts share (evidence.py, mech.py, chunks.py, apply.py).

Read-only on the tree. Rows are read with ledger.py's own parser; files and commits through git at a fixed
commit, the run's base, so that an uncommitted edit in the main tree changes nothing the scripts report.
"""
import collections, hashlib, os, re, subprocess, sys

HERE = os.path.dirname(os.path.realpath(__file__))
TOOLS = os.path.dirname(HERE)
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(TOOLS)))      # the main tree
sys.path.insert(0, TOOLS)
import ledger as L                                                     # noqa: E402

OPEN = ('NEGATIVE-VERIFIED', 'NEGATIVE-BOUNDED', 'CONTESTED')
NEAR = 10            # two citations of one file this close link two rows
RARE = 4             # a backticked name held by at most this many open rows is rare
WORD = re.compile(r'^[A-Za-z_$][\w$.]*[\w$]$|^[A-Za-z_][\w$]*\(.*\)$')
ROWREF = re.compile(r'\b(?:rows?|siblings?:?)\s+((?:\d{1,4}(?:,\s*|\s+and\s+|\s+to\s+|-|\s*))+)', re.I)
PIN = re.compile(r'\bat\s+`?([0-9a-f]{7,40})`?\b')


def git(*a, root=ROOT):
    return subprocess.run(['git', '-C', root] + list(a), capture_output=True, text=True).stdout


def sha(line):
    return hashlib.sha1(line.encode('utf-8')).hexdigest()[:16]


def ledger_at(base):
    """The ledger as it stood at the commit base (a Ledger), read from git."""
    return L.Ledger(os.path.join(ROOT, L.LEDGER_REL), text=git('show', '%s:%s' % (base, L.LEDGER_REL)))


def ledger_now(path=None):
    return L.Ledger(path or os.path.join(ROOT, L.LEDGER_REL))


def row_text(r):
    """The cells a citation can stand in: the claim, the spec cell, the reproducer and the notes."""
    return ' '.join((r.claim, r.spec, r.reproducer, r.notes)).replace('\\|', ' ')


class Tree:
    """The tracked files at one commit: path resolution as signals.py resolves it, and file text through one git process."""
    def __init__(self, base):
        self.base = base
        self.files = [p for p in git('ls-tree', '-r', '--name-only', base).split('\n') if p]
        self.set = set(self.files)
        self._text = {}
        self._diff = {}
        self.by_suffix = collections.defaultdict(list)
        self.dirs = collections.defaultdict(set)      # a folder's path, and each suffix of it, to the folders
        for p in self.files:
            parts = p.split('/')
            for i in range(len(parts)):
                self.by_suffix['/'.join(parts[i:])].append(p)
            for j in range(1, len(parts)):
                d = '/'.join(parts[:j])
                for i in range(j):
                    self.dirs['/'.join(parts[i:j])].add(d)

    def resolve(self, path):
        """(the tracked path, '') or (None, why): from the root, from Specification/, or as a unique suffix."""
        folder = path.strip().endswith('/')
        path = path.strip('/').strip()
        if folder:
            ds = sorted(self.dirs.get(path, ()))
            if path in ds or len(ds) == 1:
                return (path if path in ds else ds[0]) + '/', ''
            return None, ('ambiguous: ' + ', '.join(ds[:4])) if ds else 'no tracked folder at %s' % self.base[:9]
        if path in self.set:
            return path, ''
        if 'Specification/' + path in self.set:
            return 'Specification/' + path, ''
        hits = self.by_suffix.get(path, [])
        spec = [h for h in hits if h.startswith('Specification/')]
        if len(hits) > 1 and len(spec) == 1:
            hits = spec
        if len(hits) == 1:
            return hits[0], ''
        if len(hits) > 1:
            return None, 'ambiguous: ' + ', '.join(hits[:4])
        return None, 'no tracked file at %s' % self.base[:9]

    def lines(self, path):
        if path not in self._text:
            self._text[path] = git('show', '%s:%s' % (self.base, path)).split('\n')
        return self._text[path]

    def touched(self, since, path, lo, hi):
        """What git diff since..base did to the lines lo..hi of path as they stood at since: 'unchanged' (the
        file), 'touched' (a hunk overlaps them), 'shifted by N lines' (only hunks above them), 'file changed
        below', or 'unknown' (since is no commit)."""
        key = (since, path)
        if key not in self._diff:
            if not git('rev-parse', '--verify', '--quiet', since + '^{commit}').strip():
                self._diff[key] = None
            else:
                out = git('diff', '-U0', since, self.base, '--', path)
                self._diff[key] = [tuple(int(x) if x is not None else 1 for x in m.groups())
                                   for m in re.finditer(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@', out, re.M)]
        hunks = self._diff[key]
        if hunks is None:
            return 'unknown'
        if not hunks:
            return 'unchanged'
        shift = 0
        for start, count, nstart, ncount in hunks:
            end = start + max(count, 1) - 1 if count else start
            if count and start <= hi and end >= lo:
                return 'touched'
            if not count and lo <= start < hi:
                return 'touched'
            if (start < lo) if count else (start < lo):
                shift += ncount - count
        return 'shifted by %+d lines' % shift if shift else 'file changed below'


def sentences(text):
    """[(start, end)] of the sentences of text, split after . ; ! ? and a space."""
    out, start = [], 0
    for m in re.finditer(r'(?<=[.;!?])\s+(?=[A-Z`(\'"*])', text):
        out.append((start, m.start()))
        start = m.end()
    out.append((start, len(text)))
    return out


def citations(text):
    """[(path as written, [(lo, hi)], [words], pin)] for each file citation of text with or without lines.
    A bare `:N` after a citation cites the same file. The words are the backticked names of the citation's
    sentence that are no path; pin is the hash after 'at' in that sentence, if any."""
    out, last = [], None
    spans = [(m.start(), m.group(1)) for m in re.finditer(r'`([^`]+)`', text)]
    sents = sentences(text)
    for pos, span in spans:
        s0, s1 = next(((a, b) for a, b in sents if a <= pos <= b), (0, len(text)))
        toks = L.path_tokens(span)
        if toks:
            for path, lines in toks:
                last = path
                out.append((path, L.line_ranges(lines), s0, s1))
        elif last is not None:
            for m in re.finditer(r'(?:^|[\s,(])(:\d+(?:-\d+)?(?:,\s*\d+(?:-\d+)?)*)', span):
                out.append((last, L.line_ranges(m.group(1)), s0, s1))
    res = []
    for path, ranges, s0, s1 in out:
        sent = text[s0:s1]
        words = []
        for w in re.findall(r'`([^`]+)`', sent):
            w = w.strip()
            if L.path_tokens(w) or w.startswith(':') or len(w) < 3 or not re.search(r'[A-Za-z]', w):
                continue
            if w not in words:
                words.append(w)
        pin = PIN.search(sent)
        res.append((path, ranges, words, pin.group(1) if pin else None))
    return res


def hashes(text):
    """The commit-like tokens of text: 7 to 40 hex characters with at least one letter."""
    seen = []
    for h in re.findall(r'(?<![\w/.-])([0-9a-f]{7,40})(?![\w/-])', text):
        if re.search(r'[a-f]', h) and h not in seen:
            seen.append(h)
    return seen


def row_refs(text, own=None):
    """The row numbers text names: 'row N', 'rows N, M and K', 'siblings: N, M'."""
    out = []
    for m in ROWREF.finditer(text):
        for x in L.numbers_in(m.group(1)):
            if x != own and x not in out:
                out.append(x)
    return out


def names(r):
    """The backticked names of a row that are no path: candidates for the rare-name link."""
    out = set()
    for w in re.findall(r'`([^`]+)`', row_text(r)):
        w = w.strip()
        if len(w) >= 4 and WORD.match(w) and not L.path_tokens(w):
            out.add(w)
    return out


def links(rows, tree):
    """{(a, b): [why]} for the pairs of rows that likely overlap: a citation of one file within NEAR lines,
    one reproducer, two rare backticked names, or one naming the other."""
    cites = collections.defaultdict(list)          # resolved path -> [(row, lo, hi)]
    for r in rows:
        for path, ranges, _, _ in citations(row_text(r)):
            p, _ = tree.resolve(path)
            for lo, hi in ranges:
                if p:
                    cites[p].append((r.num, lo, hi))
    pairs = collections.defaultdict(set)
    for p, cs in cites.items():
        cs.sort(key=lambda c: c[1])
        for i, (a, lo, hi) in enumerate(cs):
            for b, lo2, hi2 in cs[i + 1:]:
                if lo2 > hi + NEAR:
                    break
                if a != b:
                    pairs[tuple(sorted((a, b)))].add('near %s:%d' % (p.rsplit('/', 1)[-1], lo2))
    repro = collections.defaultdict(list)
    for r in rows:
        c = r.reproducer.strip().strip('`')
        if c and c != 'none':
            repro[re.sub(r':\d[\d,-]*$', '', c)].append(r.num)
    for c, ns in repro.items():
        for i, a in enumerate(ns):
            for b in ns[i + 1:]:
                pairs[tuple(sorted((a, b)))].add('one reproducer')
    held = collections.defaultdict(list)
    for r in rows:
        for w in names(r):
            held[w].append(r.num)
    shared = collections.Counter()
    for w, ns in held.items():
        if 2 <= len(ns) <= RARE:
            for i, a in enumerate(ns):
                for b in ns[i + 1:]:
                    shared[tuple(sorted((a, b)))] += 1
    for k, n in shared.items():
        if n >= 2:
            pairs[k].add('%d rare names' % n)
    nums = {r.num for r in rows}
    for r in rows:
        for x in row_refs(row_text(r), r.num):
            if x in nums:
                pairs[tuple(sorted((r.num, x)))].add('names row')
    return pairs
