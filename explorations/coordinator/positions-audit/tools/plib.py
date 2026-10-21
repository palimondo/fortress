"""plib: the shared code of the POSITIONS provenance scripts (Python 3, standard library, git).

Reads the repository /home/user/fortress (FORTRESS_REPO overrides) and never writes to it.
Its cache (parsed versions of the two record files) goes in ./cache beside this file.

The commit graph: `git log --full-history --parents -- POSITIONS.md POSITIONS-history.md`, so that
commits made on side branches and merged are listed, each with its parents rewritten to the
nearest listed ancestors. Every state is read from that commit's own tree, never accumulated.

How one commit's new text of POSITIONS.md is linked to the text it replaced, strongest first:
  number      both trees numbered (after 2026-10-13): the same P-n                       exact
  line        the numbering commit: line n of the parent's file became P-n             exact
  title       a comment the commit added in POSITIONS-history.md, above the old text,
              names the new entry's bold title ('... under "Title"')                    exact
  similarity  the two texts are each other's best match among the commit's new and
              removed texts and score at least T_PAIR (score, runner-up and the longest
              common run of words are printed)                                         scored
A text new in POSITIONS.md that no removed text explains is 're-created' if a text that stood
earlier in either file (an archived one in POSITIONS-history.md first) scores at least T_RECREATE
against it, else 'created'. A text that left POSITIONS.md unpaired and stands verbatim in the
same commit's POSITIONS-history.md was 'moved to history'.
"""
import collections
import difflib
import math
import os
import pickle
import re
import subprocess
import threading
from datetime import datetime, timezone

REPO = os.environ.get('FORTRESS_REPO', '/home/user/fortress')
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, 'cache')
PFILE = 'explorations/coordinator/POSITIONS.md'
HFILE = 'explorations/coordinator/POSITIONS-history.md'

# Thresholds; how they were set: calib.py, and the report.
T_PAIR = 0.30       # a mutual best match between a new and a removed text of one commit
T_RECREATE = 0.40   # a new text and an earlier text of either file, no partner in its commit
EPS = 0.05          # re-creation: candidates within EPS of the best are near-ties
BULK_N = 10         # a commit that changed at least this many entries of POSITIONS.md is bulk
PARSE_VERSION = 2   # bump when parse() changes, so that the cache is rebuilt


def git(*args, check=True):
    r = subprocess.run(['git', '-C', REPO] + list(args), capture_output=True)
    if check and r.returncode != 0:
        raise RuntimeError('git %s: %s' % (' '.join(args), r.stderr.decode('utf-8', 'replace')[:300]))
    return r.stdout.decode('utf-8', 'replace')


def utc(iso):
    return datetime.fromisoformat(iso).astimezone(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')


# ------------------------------------------------------------------ parsing the two files

PROV_RE = re.compile(r'^\d{4}-\d\d-\d\d \d\d:\d\dZ · ')
NUM_RE = re.compile(r'^-\s+(P-\d+)\s')


def norm(raw):
    """An entry's text with spacing collapsed and its bullet and number taken off."""
    s = re.sub(r'\s+', ' ', raw).strip()
    s = re.sub(r'^-\s+', '', s)
    s = re.sub(r'^P-\d+\s+', '', s)
    return s


def title_of(raw):
    m = re.match(r'-\s+(?:P-\d+\s+)?\*\*(.+?)\*\*', raw.strip())
    return m.group(1).strip().rstrip('.').strip() if m else None


def parse(text):
    """Entries (a bullet at column 0 and the lines indented under it) and, for the history file,
    blocks (### P-n, a provenance line and the bullet under it). Each entry carries the comment
    line just above it, if any, and the block it sits in."""
    entries, blocks = [], []
    h2 = h3 = ''
    cur = block = None
    comment = None
    in_c, cbuf = False, []
    for i, l in enumerate(text.split('\n'), 1):
        if in_c:
            cbuf.append(l)
            if '-->' in l:
                in_c = False
                comment = ' '.join(x.strip() for x in cbuf)
            continue
        if l.startswith('<!--'):
            cur = None
            if '-->' in l:
                comment = l.strip()
            else:
                in_c, cbuf = True, [l]
            continue
        m = re.match(r'(#{1,6}) (.*)', l)
        if m:
            cur = None
            comment = None
            lev, t = len(m.group(1)), m.group(2).strip()
            if lev <= 2:
                h2, h3 = t, ''
            else:
                h3 = t
            if re.fullmatch(r'P-\d+', t):
                block = {'num': t, 'line': i, 'prov': None, 'body': None}
                blocks.append(block)
            else:
                block = None
            continue
        if block is not None and block['prov'] is None and PROV_RE.match(l):
            block['prov'] = l
            block['prov_line'] = i
            cur = None
            continue
        if l.startswith('- '):
            cur = {'raw': l, 'line': i, 'section': h2 + (' / ' + h3 if h3 else ''),
                   'comment': comment, 'block': block}
            entries.append(cur)
            comment = None
            if block is not None and block['body'] is None:
                block['body'] = cur
            continue
        if cur is not None and l[:1] in (' ', '\t') and l.strip():
            cur['raw'] += '\n' + l
            continue
        if block is not None and block['prov'] is not None and block['body'] is None and l.strip():
            block['prov'] += '\n' + l
            continue
        if l.strip():
            cur = None
            comment = l.strip()       # a note paragraph above the next bullet ("Replaced ...: the entry as it stood:")
    for e in entries:
        e['norm'] = norm(e['raw'])
        m = NUM_RE.match(e['raw'])
        e['num'] = m.group(1) if m else None
        e['title'] = title_of(e['raw'])
    return entries, blocks


# ------------------------------------------------------------------ the commits and their trees

def _batch_check(specs):
    r = subprocess.run(['git', '-C', REPO, 'cat-file', '--batch-check'],
                       input=''.join(s + '\n' for s in specs).encode(), capture_output=True)
    out = []
    for l in r.stdout.decode().splitlines():
        out.append(None if l.endswith('missing') else l.split()[0])
    return out


def _read_blobs(ids):
    ids = sorted(set(i for i in ids if i))
    proc = subprocess.Popen(['git', '-C', REPO, 'cat-file', '--batch'], stdin=subprocess.PIPE,
                            stdout=subprocess.PIPE)
    t = threading.Thread(target=lambda: (proc.stdin.write(''.join(i + '\n' for i in ids).encode()),
                                         proc.stdin.close()))
    t.start()
    out = {}
    for i in ids:
        hdr = proc.stdout.readline().decode().split()
        out[i] = proc.stdout.read(int(hdr[2])).decode('utf-8', 'replace')
        proc.stdout.read(1)
    t.join()
    proc.wait()
    return out


class Repo:
    """The commits that touched either file, with rewritten parents, and each one's parsed files."""

    def __init__(self, refresh=False):
        head = git('rev-parse', 'HEAD').strip()
        os.makedirs(CACHE, exist_ok=True)
        cpath = os.path.join(CACHE, 'repo-v%d-%s.pickle' % (PARSE_VERSION, head[:12]))
        if not refresh and os.path.exists(cpath):
            with open(cpath, 'rb') as f:
                self.__dict__.update(pickle.load(f))
            return
        log = git('log', '--full-history', '--parents', '--format=%H%x09%P%x09%aI%x09%cI%x09%s',
                  '--', PFILE, HFILE)
        self.info = {}
        self.order = []           # newest first, as git log prints
        for l in log.splitlines():
            h, ps, a, c, s = l.split('\t', 4)
            self.info[h] = {'parents': ps.split(), 'adate': utc(a), 'cdate': utc(c), 'subject': s}
            self.order.append(h)
        specs = []
        for h in self.order:
            specs += [h + ':' + PFILE, h + ':' + HFILE]
        specs += [head + ':' + PFILE, head + ':' + HFILE]
        b = _batch_check(specs)
        blobs = {}
        for k, h in enumerate(self.order):
            blobs[h] = (b[2 * k], b[2 * k + 1])
        hb = (b[-2], b[-1])
        if head in self.info:
            self.start = head
        else:
            self.start = self.order[0]
            if blobs[self.start] != hb:
                raise RuntimeError('HEAD differs from the newest commit that touched the files')
        texts = _read_blobs([x for pair in blobs.values() for x in pair])
        self.parsed = {}
        for bid, t in texts.items():
            self.parsed[bid] = parse(t)
        self.blobs = blobs
        self.head = head
        self.rank = {h: k for k, h in enumerate(self.order)}
        with open(cpath, 'wb') as f:
            pickle.dump(self.__dict__, f)

    # the state of a commit
    def entries(self, h, which):
        bid = self.blobs[h][0 if which == 'P' else 1]
        return self.parsed[bid][0] if bid else []

    def hblocks(self, h):
        bid = self.blobs[h][1]
        return self.parsed[bid][1] if bid else []

    def texts(self, h, which):
        key = (h, which)
        c = self.__dict__.setdefault('_tcache', {})
        if key not in c:
            c[key] = {e['norm'] for e in self.entries(h, which)}
        return c[key]

    def parents(self, h):
        return self.info[h]['parents']

    def entry(self, h, which, text):
        for e in self.entries(h, which):
            if e['norm'] == text:
                return e
        return None

    def numbered(self, h):
        es = self.entries(h, 'P')
        return bool(es) and all(e['num'] for e in es)

    def body(self, h):
        return git('log', '-1', '--format=%B', h)

    def ancestors_texts(self, h, which):
        """Every text that stood in the file in h or any listed ancestor of h."""
        seen, todo, out = set(), [h], set()
        while todo:
            x = todo.pop()
            if x in seen:
                continue
            seen.add(x)
            out |= self.texts(x, which)
            todo += self.parents(x)
        return out

    def first_holder(self, h, which, text):
        """The newest listed ancestor-or-self of h whose file holds text (breadth first)."""
        seen, q = set(), [h]
        while q:
            nq = []
            for x in q:
                if x in seen:
                    continue
                seen.add(x)
                if text in self.texts(x, which):
                    return x
                nq += self.parents(x)
            q = nq
        return None


# ------------------------------------------------------------------ similarity

_TOK = re.compile(r"[a-z0-9_][a-z0-9_'\-]*", re.I)


def tokens(s):
    w = [t.lower() for t in _TOK.findall(s)]
    w = [t for t in w if len(t) > 1 and not re.fullmatch(r'p-\d+|f-\d+|\d{4}-\d\d-\d\d,?', t)]
    return w + [a + ' ' + b for a, b in zip(w, w[1:])]


class Sim:
    """The larger of the tf-idf cosine and 0.9 times the idf-weighted overlap (the shared weight over
    the smaller text's weight), over every distinct text that stood in either file. Words and word
    pairs; numbers P-n, F-n and dates left out. 1.0 for equal texts."""

    def __init__(self, repo):
        docs = set()
        for bid, (es, _) in repo.parsed.items():
            for e in es:
                docs.add(e['norm'])
        df = collections.Counter()
        toks = {}
        for t in docs:
            c = collections.Counter(tokens(t))
            toks[t] = c
            df.update(c.keys())
        n = len(docs)
        self.idf = {k: math.log(n / d) for k, d in df.items()}
        self.vec, self.wt, self.tot = {}, {}, {}
        for t, c in toks.items():
            v = {k: (1 + math.log(f)) * self.idf[k] for k, f in c.items()}
            nrm = math.sqrt(sum(x * x for x in v.values())) or 1.0
            self.vec[t] = {k: x / nrm for k, x in v.items()}
            self.wt[t] = {k: self.idf[k] for k in c}
            self.tot[t] = sum(self.wt[t].values()) or 1.0
        self._c = {}

    def __call__(self, a, b):
        if a == b:
            return 1.0
        key = (a, b) if a < b else (b, a)
        if key in self._c:
            return self._c[key]
        va, vb = self.vec.get(a), self.vec.get(b)
        if not va or not vb:
            return 0.0
        if len(va) > len(vb):
            va, vb = vb, va
        cos = sum(x * vb.get(k, 0.0) for k, x in va.items())
        wa, wb = self.wt[a], self.wt[b]
        if len(wa) > len(wb):
            wa, wb, ta = wb, wa, self.tot[b]
        else:
            ta = self.tot[a]
        ov = sum(w for k, w in wa.items() if k in wb) / ta
        r = max(cos, 0.9 * ov)
        self._c[key] = r
        return r


def common_run(a, b):
    """The longest run of words that the two texts share, word for word."""
    wa, wb = a.split(), b.split()
    m = difflib.SequenceMatcher(None, wa, wb, autojunk=False).find_longest_match(0, len(wa), 0, len(wb))
    return ' '.join(wa[m.a:m.a + m.size]), m.size


# ------------------------------------------------------------------ what one commit did to POSITIONS.md

TITLE_UNDER = re.compile(r'under "([^"]+)"')


class Change:
    """What commit h did to POSITIONS.md, against its rewritten parents."""

    def __init__(self, repo, sim, h):
        self.h = h
        ps = repo.parents(h)
        cur = repo.entries(h, 'P')
        cur_t = [e['norm'] for e in cur]
        par_t = [repo.texts(p, 'P') for p in ps]
        union = set().union(*par_t) if par_t else set()
        inter = set.intersection(*par_t) if par_t else set()
        self.new = [t for t in dict.fromkeys(cur_t) if t not in union]
        cur_set = set(cur_t)
        self.gone_all = [t for t in inter if t not in cur_set]           # removed against every parent
        self.gone_cand = [t for t in union if t not in cur_set]          # candidates for a pairing
        self.pairs = {}         # new text -> dict(old, how, score, ...)
        # renumbered and moved lines: same text, other line
        self.renum = self.sect = 0
        if ps:
            p0 = {e['norm']: e for e in repo.entries(ps[0], 'P')}
            for e in cur:
                o = p0.get(e['norm'])
                if o is None:
                    continue
                if o['raw'] != e['raw']:
                    self.renum += 1
                if o['section'] != e['section']:
                    self.sect += 1
        gone_set = set(self.gone_cand)
        newset = set(self.new)
        # 1. number
        if ps and repo.numbered(h):
            pn = {}
            for p in ps:
                for e in repo.entries(p, 'P'):
                    if e['num']:
                        pn.setdefault(e['num'], e)
            if any(pn.values()):
                for e in cur:
                    if e['norm'] in newset and e['num'] in pn and pn[e['num']]['norm'] in gone_set:
                        self.pairs[e['norm']] = {'old': pn[e['num']]['norm'], 'how': 'number',
                                                 'detail': 'same number %s' % e['num']}
            elif len(ps) == 1:
                # 2. the numbering commit: line n of the parent's file is P-n
                byline = {e['line']: e for e in repo.entries(ps[0], 'P')}
                self.numbering = True
                for e in cur:
                    n = int(e['num'][2:])
                    o = byline.get(n)
                    if e['norm'] in newset and o is not None and o['norm'] in gone_set:
                        self.pairs[e['norm']] = {'old': o['norm'], 'how': 'line',
                                                 'detail': 'line %d of the parent\'s POSITIONS.md became %s' % (n, e['num'])}
        # 3. titles named by the commit's new comments in the history file
        if ps:
            old_h = set()
            for p in ps:
                old_h |= {(e['comment'], e['norm']) for e in repo.entries(p, 'H')}
            named = collections.defaultdict(list)
            for e in repo.entries(h, 'H'):
                if not e['comment'] or (e['comment'], e['norm']) in old_h or e['norm'] not in gone_set:
                    continue
                for m in TITLE_UNDER.finditer(e['comment']):
                    # several titles are joined by '; ', but a title may hold ';' itself:
                    # the whole string is tried as one title as well as each part
                    g = m.group(1)
                    for t in dict.fromkeys([g] + g.split(';')):
                        named[t.strip().rstrip('.').strip()].append((e['norm'], e['comment']))
            for e in cur:
                if e['norm'] in newset and e['norm'] not in self.pairs and e['title'] in named:
                    olds = list(dict.fromkeys(x[0] for x in named[e['title']]))
                    best = max(olds, key=lambda o: sim(e['norm'], o))
                    self.pairs[e['norm']] = {'old': best, 'how': 'title',
                                             'detail': 'a comment added in POSITIONS-history.md names "%s" above %d old text(s)' % (e['title'], len(olds)),
                                             'also': [o for o in olds if o != best],
                                             'comment': named[e['title']][0][1]}
        # 4. similarity: mutual best among what is left
        left_new = [t for t in self.new if t not in self.pairs]
        used = {v['old'] for v in self.pairs.values() if v['how'] in ('number', 'line')}
        left_old = [t for t in self.gone_cand if t not in used]
        if left_new and left_old:
            best_of_new = {}
            for t in left_new:
                sc = sorted(((sim(t, o), o) for o in left_old), reverse=True)
                best_of_new[t] = sc
            best_of_old = {}
            for o in left_old:
                best_of_old[o] = max(((sim(t, o), t) for t in left_new))
            same = self._same_place(repo, ps, cur_t)
            for t, sc in best_of_new.items():
                s, o = sc[0]
                if best_of_old[o][1] == t and s >= T_PAIR:
                    run, n = common_run(t, o)
                    self.pairs[t] = {'old': o, 'how': 'similarity', 'score': s,
                                     'runner': sc[1][0] if len(sc) > 1 else 0.0,
                                     'same_place': (o, t) in same, 'run': run, 'run_n': n,
                                     'detail': ''}
        for t, v in self.pairs.items():
            v.setdefault('score', sim(t, v['old']))
        # moved to history: removed, unpaired, verbatim in this commit's history file
        paired_old = {v['old'] for v in self.pairs.values()} | {o for v in self.pairs.values() for o in v.get('also', [])}
        hset = repo.texts(h, 'H')
        self.moved = [t for t in self.gone_all if t not in paired_old and t in hset]
        self.dropped = [t for t in self.gone_all if t not in paired_old and t not in hset]
        np_ = sum(1 for k, v in self.pairs.items() if v['old'] in set(self.gone_all))
        self.touched = len(self.new) + len(self.gone_all) - np_

    @staticmethod
    def _same_place(repo, ps, cur_t):
        if not ps:
            return set()
        old_t = [e['norm'] for e in repo.entries(ps[0], 'P')]
        sm = difflib.SequenceMatcher(None, old_t, cur_t, autojunk=False)
        out = set()
        for op, i1, i2, j1, j2 in sm.get_opcodes():
            if op == 'replace':
                for i in range(i1, i2):
                    for j in range(j1, j2):
                        out.add((old_t[i], cur_t[j]))
        return out


class World:
    def __init__(self, refresh=False):
        self.repo = Repo(refresh)
        self.sim = Sim(self.repo)
        self._ch = {}

    def change(self, h):
        if h not in self._ch:
            self._ch[h] = Change(self.repo, self.sim, h)
        return self._ch[h]

    def info(self, h):
        return self.repo.info[h]


# ------------------------------------------------------------------ the trail of one entry

def head_entry(w, num):
    num = num if str(num).startswith('P-') else 'P-%s' % num
    for e in w.repo.entries(w.repo.start, 'P'):
        if e['num'] == num:
            return e
    raise KeyError(num)


def trail(w, num):
    """The commits that made and changed the entry's text, newest first. Each event:
    {h, kind, text (after), prev (before), link, ...}."""
    r = w.repo
    e = head_entry(w, num)
    t, loc, c = e['norm'], 'P', r.start
    events = []
    while True:
        ps = r.parents(c)
        holder = [p for p in ps if t in r.texts(p, loc)]
        if holder:
            p = holder[0]
            if loc == 'P':
                a, b = r.entry(c, 'P', t), r.entry(p, 'P', t)
                kinds = []
                if a['num'] != b['num']:
                    kinds.append('renumbered %s -> %s' % (b['num'] or 'none', a['num']))
                if a['section'] != b['section']:
                    kinds.append('section "%s" -> "%s"' % (b['section'], a['section']))
                if kinds:
                    events.append({'h': c, 'kind': 'renumbered' if a['num'] != b['num'] else 'section moved',
                                   'note': '; '.join(kinds), 'text': t, 'prev': t, 'loc': 'P'})
            c = p
            continue
        if loc == 'P':
            hp = [p for p in ps if t in r.texts(p, 'H')]
            if hp:
                events.append({'h': c, 'kind': 'restored', 'note': 'the same text stood in POSITIONS-history.md',
                               'text': t, 'prev': t, 'loc': 'P'})
                loc, c = 'H', hp[0]
                continue
            ch = w.change(c)
            if t in ch.pairs:
                pr = ch.pairs[t]
                score = w.sim(t, pr['old'])
                ev = {'h': c, 'kind': 'changed', 'text': t, 'prev': pr['old'], 'loc': 'P', 'link': pr,
                      'score': score}
                events.append(ev)
                p = [p for p in ps if pr['old'] in r.texts(p, 'P')][0]
                t, c = pr['old'], p
                continue
            # re-created from an earlier text?
            cands = set()
            for p in ps:
                cands |= r.texts(p, 'H')
            earlierP = set()
            for p in ps:
                earlierP |= r.ancestors_texts(p, 'P')
            for p in ps:
                earlierP -= r.texts(p, 'P')
            pool = [(w.sim(t, x), x, 'H') for x in cands] + [(w.sim(t, x), x, 'P') for x in earlierP - cands]
            pool.sort(reverse=True)
            if pool and pool[0][0] >= T_RECREATE:
                # near-ties (within EPS of the best): the text that stood in POSITIONS.md last wins,
                # since an archived entry often has several versions in the history file
                close = [x for x in pool if x[0] >= pool[0][0] - EPS]
                def last_in_p(x):
                    hs = [r.first_holder(p, 'P', x[1]) for p in ps]
                    hs = [q for q in hs if q]
                    return min(r.rank[q] for q in hs) if hs else 10 ** 9
                close.sort(key=last_in_p)
                s, x, where = close[0]
                run, n = common_run(t, x)
                if s == 1.0 and where == 'P':
                    # verbatim from an earlier POSITIONS.md: restored; the commit that removed it
                    # is the listed descendant of its last holder that no longer holds it
                    holder = [r.first_holder(p, 'P', x) for p in ps]
                    holder = [q for q in holder if q][0]
                    rem = remover(r, ps, holder, x)
                    events.append({'h': c, 'kind': 'restored', 'text': t, 'prev': x, 'loc': 'P',
                                   'note': 'the same text stood in POSITIONS.md until %s, which removed it' % (rem[:9] if rem else '?'),
                                   'score': 1.0})
                    if rem:
                        events.append({'h': rem, 'kind': 'removed', 'text': x, 'prev': x, 'loc': 'P',
                                       'note': 'the text left POSITIONS.md and does not stand in POSITIONS-history.md'})
                    c, t = holder, x
                    continue
                events.append({'h': c, 'kind': 're-created', 'text': t, 'prev': x, 'loc': 'P',
                               'link': {'how': 'similarity', 'score': s,
                                        'runner': max([y[0] for y in pool if y[1] != x] or [0.0]),
                                        'run': run, 'run_n': n, 'from': where,
                                        'ties': [(y[0], y[1][:90]) for y in close[1:]],
                                        'detail': 'best of %d earlier texts (%s)' % (len(pool), 'archived in POSITIONS-history.md' if where == 'H' else 'removed from POSITIONS.md earlier')},
                               'score': s})
                if where == 'H':
                    loc, c = 'H', [p for p in ps if x in r.texts(p, 'H')][0]
                else:
                    c = [p for p in ps if r.first_holder(p, 'P', x)][0]
                    c = r.first_holder(c, 'P', x)
                t = x
                continue
            near = pool[0] if pool else (0.0, '', '')
            events.append({'h': c, 'kind': 'created', 'text': t, 'prev': '', 'loc': 'P',
                           'nearest': near})
            break
        else:  # the text stands in the history file; where did it come from?
            pp = [p for p in ps if t in r.texts(p, 'P')]
            if pp:
                events.append({'h': c, 'kind': 'moved to history', 'text': t, 'prev': t, 'loc': 'H',
                               'note': 'the text left POSITIONS.md and stands verbatim in POSITIONS-history.md'})
                loc, c = 'P', pp[0]
                continue
            anc = None
            for p in ps:
                anc = r.first_holder(p, 'P', t)
                if anc:
                    break
            if anc:
                events.append({'h': c, 'kind': 'archived', 'text': t, 'prev': t, 'loc': 'H',
                               'note': 'stored in POSITIONS-history.md here; it stood in POSITIONS.md last at %s' % anc[:9]})
                loc, c = 'P', anc
                continue
            events.append({'h': c, 'kind': 'created in history', 'text': t, 'prev': '', 'loc': 'H'})
            break
    for ev in events:
        ch = w.change(ev['h'])
        mine = 1 if ev['kind'] in ('changed', 're-created', 'created', 'restored', 'moved to history', 'removed') else 0
        ev['others'] = max(0, ch.touched - mine)
        ev['renum'] = ch.renum
        ev['sect'] = ch.sect
    return events


def remover(r, starts, holder, x):
    """The listed commit, an ancestor-or-self of one of starts, whose parent holder holds x in
    POSITIONS.md while it does not."""
    seen, todo = set(), list(starts)
    while todo:
        y = todo.pop()
        if y in seen:
            continue
        seen.add(y)
        if x not in r.texts(y, 'P') and holder in r.parents(y):
            return y
        todo += [q for q in r.parents(y) if r.rank[q] < r.rank[holder]]
    return None


TEXT_KINDS = ('created', 'changed', 're-created', 'restored', 'created in history')


def made_events(events):
    """The events (newest first) that made the text as it stands: back to the latest creation or
    re-creation. Moves, renumberings and section moves do not change the text and are left out."""
    out = []
    for ev in events:
        if ev['kind'] not in ('created', 'changed', 're-created'):
            continue
        out.append(ev)
        if ev['kind'] in ('created', 're-created'):
            break
    return out


def is_bulk(events, n=BULK_N):
    ms = made_events(events)
    return bool(ms) and all(ev['others'] >= n for ev in ms)


# ------------------------------------------------------------------ the history blocks at HEAD

def head_blocks(w, num):
    """The blocks of one entry in POSITIONS-history.md at HEAD, each with the commit that wrote it:
    the oldest listed commit whose history file holds the block's provenance line."""
    num = num if str(num).startswith('P-') else 'P-%s' % num
    r = w.repo
    out = []
    blocks = [b for b in r.hblocks(r.start) if b['num'] == num]
    for b in blocks:
        out.append(dict(b, writer=block_writer(w, b['prov'])))
    return out


def block_writer(w, prov):
    r = w.repo
    cache = w.__dict__.setdefault('_bw', None)
    if cache is None:
        cache = {}
        for h in reversed(r.order):                # oldest first
            for b in r.hblocks(h):
                if b['prov'] and b['prov'] not in cache:
                    cache[b['prov']] = h
        w._bw = cache
    return cache.get(prov)


def old_comments(w, text):
    """The comments that stand above a verbatim copy of text in POSITIONS-history.md, in any commit
    up to the numbering, with the first commit that shows each."""
    r = w.repo
    found = collections.OrderedDict()
    for h in reversed(r.order):
        for e in r.entries(h, 'H'):
            if e['norm'] == text and e['comment'] and e['comment'] not in found:
                found[e['comment']] = h
    return list(found.items())


def new_notes(w, h):
    """The comments and notes that commit h added above texts in POSITIONS-history.md:
    [(note, text)] for each history entry whose (note, text) no parent's history file holds."""
    r = w.repo
    old = set()
    for p in r.parents(h):
        old |= {(e['comment'], e['norm']) for e in r.entries(p, 'H')}
    return [(e['comment'], e['norm']) for e in r.entries(h, 'H')
            if e['comment'] and (e['comment'], e['norm']) not in old]
