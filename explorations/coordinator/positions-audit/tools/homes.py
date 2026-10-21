#!/usr/bin/env python3
"""homes.py: where a status that an entry of POSITIONS.md states may already live.

    python3 -I homes.py 151            (or P-151)
    python3 -I homes.py 151 --top 8    candidates per sentence (default 5)
    python3 -I homes.py 151 --at REV   the three files as commit REV holds them

Splits the entry (the working tree's POSITIONS.md; for an entry struck from it, its text as it
last stood, said so at the top) into sentences, and a sentence into its clauses
at the semicolons outside parentheses; a clause keeps the label that opens its sentence, as
"Built:" or "Still to build:". A clause states a status when it, its label or its sentence holds
one of the status words: built, to build, landed, pending, default, waits, standing go, listed for his
review, open, held, parked, owed, taken, stands at, returns after, not moved, and the like.

For each such clause it lists the candidates that may already hold the same point: the numbered
items of review-queue.md's lists (b) and (c), and the lines of PLAN.md (a numbered sub-line also
carries its parent's item number, and its own number as a fork when the parent counts forks).
A candidate is listed when it names the entry or shares a distinctive term with the clause:
  row N, item N (PLAN's), review-queue item N, fork N, way N, batch N, rung X, phase N, ask N,
  decision X, another entry's P-N, a name in backticks (a commit hash too), a dotted finding
  name such as judge-review.1 or A.skeptic.2
Each shared term weighs by its rarity among the candidates (log of the candidates over those
holding it); naming the entry adds 2; content words shared (four letters or more, beyond common
words) add a little, to order near-ties, and are printed apart. Candidates are ranked by that
weight, and each is printed with what it shares, for the scout to confirm or reject.
"""
import math
import os
import re
import subprocess
import sys

REPO = '/home/user/fortress'
POS = REPO + '/explorations/coordinator/POSITIONS.md'
RQ = REPO + '/explorations/coordinator/review-queue.md'
PLAN = REPO + '/explorations/coordinator/PLAN.md'

STATUS = re.compile(
    r'\b(built|unbuilt|build|landed|lands|pending|defaults?|waits?|waiting|standing go|listed for (?:his )?review|'
    r'open|held|holds? for|parked|owed|taken|stands? at|returns? after|not moved|not yet|still to|carried out|'
    r'in force|no default|answer is pending|left for|to be built|as built|kept as landed)\b', re.I)
NAMED = re.compile(
    r'\b(rows?|items?|forks?|ways?|batch(?:es)?|rungs?|phases?|asks?|decisions?)\s+'
    r'((?:[0-9]+[a-z]?|[A-Z])\b(?:(?:,\s*|\s+and\s+|\s+or\s+|\s*(?:to|-|–)\s*)(?:[0-9]+[a-z]?|[A-Z])\b)*)')
RQ_ITEM = re.compile(r'\b[Rr]eview-queue items?\s+((?:\d+)(?:(?:,\s*|\s+and\s+)\d+)*)')
PNUM = re.compile(r'(?<![\w-])P-(\d+)(?!\d)')
TICK = re.compile(r'`([^`\n]+)`')
DOTTED = re.compile(r'\b([A-Za-z][\w-]*\.(?:[a-z]+\.)?\d+)\b')
WORD = re.compile(r"[A-Za-z][A-Za-z'-]{3,}")
STOP = set('''that this with from what which when where while their there these those them they then than
into onto over under after before about also only each every both either neither none some such same
other another more most much many must shall should would could will have has had been being were
does done doing make makes made take takes like just very even still yet here once upon again across
your yours ours ourselves itself himself herself its it's his her him hers the and for not but are
was one two three four five six seven eight nine ten first second third last next later earlier
whose whom because since until unless though although whether within without between among through
during per via onto off out down above below near beyond whole part parts half kind kinds way ways
item items fork forks row rows batch batches rung rungs phase phases ask asks decision decisions
built build builds landed pending default defaults wait waits waiting open held taken stands stand
returns review listed answer answers note notes says said gives given give gets get got keeps kept'''.split())


def _expand(kind, nums):
    out = []
    parts = re.split(r'\s*,\s*|\s+and\s+|\s+or\s+', nums)
    for p in parts:
        m = re.fullmatch(r'(\d+)\s*(?:to|-|–)\s*(\d+)', p.strip())
        if m and int(m.group(2)) - int(m.group(1)) < 30:
            out += ['%s %d' % (kind, k) for k in range(int(m.group(1)), int(m.group(2)) + 1)]
        elif p.strip():
            out.append('%s %s' % (kind, p.strip()))
    return out


def terms(text, own=None):
    """The distinctive terms of a text, as a set of strings ('row 773', 'rq 37', '`List`', ...)."""
    t = set()
    rq_spans = []
    for m in RQ_ITEM.finditer(text):
        t.update(_expand('rq', m.group(1)))
        rq_spans.append(m.span())
    for m in NAMED.finditer(text):
        if any(a <= m.start() < b for a, b in rq_spans):
            continue
        kind = re.sub(r'(es|s)$', '', m.group(1).lower()) if m.group(1).lower() not in ('batches',) else 'batch'
        kind = {'item': 'item', 'row': 'row', 'fork': 'fork', 'way': 'way', 'batch': 'batch', 'rung': 'rung',
                'phase': 'phase', 'ask': 'ask', 'decision': 'decision'}.get(kind, kind)
        if kind == 'rung' or kind == 'decision':
            vals = _expand(kind, m.group(2))
        else:
            vals = [v for v in _expand(kind, m.group(2)) if re.search(r'\d', v)]
        t.update(vals)
    for m in PNUM.finditer(text):
        if own is None or int(m.group(1)) != own:
            t.add('P-%s' % m.group(1))
    for m in TICK.finditer(text):
        s = re.sub(r"'s$", '', m.group(1).strip())
        if s:
            t.add('`%s`' % s)
    for m in DOTTED.finditer(text):
        if not re.fullmatch(r'[\d.]+', m.group(1)) and not m.group(1).lower().endswith(('.md', '.fss', '.fsi')):
            t.add(m.group(1))
    return t


def words(text):
    return {w.lower().strip("'-") for w in WORD.findall(TICK.sub(' ', text))} - STOP


AT = None          # a commit to read the three files at; None: the working tree


def read(path):
    if AT:
        r = subprocess.run(['git', '-C', REPO, 'show', '%s:%s' % (AT, os.path.relpath(path, REPO))], capture_output=True)
        return r.stdout.decode('utf-8', 'replace')
    return open(path).read()


def _entry_in(text, num):
    lines = text.split('\n')
    pat = re.compile(r'^-\s+%s\s' % re.escape(num))
    for k, l in enumerate(lines):
        if pat.match(l):
            out = [l]
            for m in lines[k + 1:]:
                if m.startswith((' ', '\t')) and m.strip():
                    out.append(m)
                else:
                    break
            s = re.sub(r'\s+', ' ', ' '.join(out)).strip()
            return k + 1, re.sub(r'^-\s+P-\d+\s+', '', s)
    return None


def struck(num, at=None):
    """For a number that POSITIONS.md (at `at`, else HEAD) no longer holds: (removal, last, line,
    text): the newest commit whose diff adds or removes its line and lacks it, and the text in
    that commit's first parent. None when no commit removed it."""
    rel = os.path.relpath(POS, REPO)
    log = subprocess.run(['git', '-C', REPO, 'log', '--format=%H', '-G', r'^- %s ' % num] + ([at] if at else [])
                         + ['--', rel], capture_output=True, text=True).stdout.split()
    for h in log:
        show = lambda rev: subprocess.run(['git', '-C', REPO, 'show', '%s:%s' % (rev, rel)],
                                          capture_output=True).stdout.decode('utf-8', 'replace')
        if _entry_in(show(h), num):
            return None                     # the newest such commit holds it: not struck
        got = _entry_in(show(h + '^'), num)
        if got:
            return h, h + '^', got[0], got[1]
    return None


def entry_text(num):
    """(line, text, struck): the entry in POSITIONS.md (at AT, else the working tree), or, for one
    struck from it, its text as it last stood and struck = (removal, last holder)."""
    got = _entry_in(read(POS), num)
    if got:
        return got[0], got[1], None
    st = struck(num, AT)
    if st:
        return st[2], st[3], (st[0], st[1])
    raise KeyError(num)


def sentences(text):
    """[(label, clause)]: sentences split after '.', '?' or '!' at depth 0 before a capital, a
    backtick or a parenthesis; then at '; ' at depth 0. The label is a sentence's opening
    'Word words:' (up to four words before a colon)."""
    out, depth, cur, i = [], 0, '', 0
    s = text.replace('**', '')
    while i < len(s):
        c = s[i]
        cur += c
        if c in '([':
            depth += 1
        elif c in ')]':
            depth = max(0, depth - 1)
        elif c in '.?!' and depth == 0 and i + 2 < len(s) and s[i + 1] == ' ' and (s[i + 2].isupper() or s[i + 2] in '`(') \
                and not re.search(r'\b(e\.g|i\.e|cf|vs|No|Fig|p)\.$', cur):
            out.append(cur.strip())
            cur = ''
        i += 1
    if cur.strip():
        out.append(cur.strip())
    res = []
    for sent in out:
        m = re.match(r'^((?:[A-Z][\w-]*)(?: [\w`-]+){0,3}):\s', sent)
        label = m.group(1) if m else ''
        depth, part, parts = 0, '', []
        for c in sent:
            if c in '([':
                depth += 1
            elif c in ')]':
                depth = max(0, depth - 1)
            if c == ';' and depth == 0:
                parts.append(part.strip())
                part = ''
                continue
            part += c
        parts.append(part.strip())
        for k, p in enumerate(parts):
            res.append((label if k else '', p, sent, k))
    return res


def candidates():
    """[(name, where, title, text)] from review-queue (b) and (c), and PLAN's lines."""
    out = []
    rq = read(RQ).split('\n')
    on, cur = False, None
    for k, l in enumerate(rq, 1):
        if l.startswith('## '):
            on = l.startswith('## (b)') or l.startswith('## (c)')
            if cur:
                out.append(cur)
                cur = None
            continue
        if not on:
            continue
        m = re.match(r'^(\d+)\.\s+(.*)', l)
        if m:
            if cur:
                out.append(cur)
            title = re.match(r'\*\*(.+?)\*\*', m.group(2))
            cur = ['review-queue item %s' % m.group(1), 'review-queue.md:%d' % k,
                   (title.group(1) if title else m.group(2))[:90], l, m.group(1)]
        elif cur and (l.startswith((' ', '\t')) or not l.strip()):
            cur[3] += '\n' + l
        elif cur:
            out.append(cur)
            cur = None
    if cur:
        out.append(cur)
    plan = read(PLAN).split('\n')
    head, parent = '', None
    for k, l in enumerate(plan, 1):
        if l.startswith('#'):
            head, parent = l.lstrip('# ').strip(), None
            continue
        if not l.strip() or l.startswith('<!--'):
            continue
        m = re.match(r'^(\d+)\.\s', l)
        extra = ''
        if m:
            parent = (m.group(1), 'fork' in l.lower())
        sm = re.match(r'^\s+(\d+)\.\s', l)
        if sm and parent:
            extra = ' item %s' % parent[0] + (' fork %s' % sm.group(1) if parent[1] else '')
        elif not l.startswith((' ', '\t')) and not m:
            parent = None if not l.startswith('-') else parent
        out.append(['PLAN line', 'PLAN.md:%d' % k, head[:60], l + extra, None])
    return out


def rank(num, top=5):
    n = int(num[2:])
    line, text, struck_at = entry_text(num)
    cands = candidates()
    cterms = []
    for c in cands:
        t = terms(c[3], own=None)
        if c[4]:
            t.add('rq %s' % c[4])
        cterms.append(t)
    df = {}
    for t in cterms:
        for x in t:
            df[x] = df.get(x, 0) + 1
    cw = [words(c[3]) for c in cands]
    wdf = {}
    for w in cw:
        for x in w:
            wdf[x] = wdf.get(x, 0) + 1
    N = len(cands)
    own = re.compile(r'(?<![\w-])P-%d(?!\d)' % n)
    res = []
    for label, clause, sent, k in sentences(text):
        st = STATUS.findall(clause + ' ' + label) or STATUS.findall(sent)
        if label.lower() == "why" or sent.startswith("Why:"):
            continue
        if not st:
            continue
        qt = terms(clause, own=n)
        qw = words(clause)
        scored = []
        for c, t, w in zip(cands, cterms, cw):
            shared = sorted(qt & t)
            names = bool(own.search(c[3]))
            if not shared and not names:
                continue
            sw = sorted(qw & w, key=lambda x: wdf[x])
            score = sum(math.log(N / df[x]) for x in shared) + (2.0 if names else 0) \
                + 0.15 * sum(math.log(N / wdf[x]) for x in sw)
            if not shared and len(sw) < 2:
                continue
            scored.append((score, c, shared, names, sw))
        scored.sort(key=lambda x: -x[0])
        res.append({'label': label, 'clause': clause, 'status': sorted({s.lower() for s in st}), 'terms': sorted(qt),
                    'cands': scored[:top], 'n': len(scored)})
    return line, text, res, struck_at


def print_homes(num, out=sys.stdout, top=5):
    num = num if str(num).startswith('P-') else 'P-%s' % num
    p = lambda *a: print(*a, file=out)
    line, text, res, st = rank(num, top)
    if st:
        p('%s is STRUCK: removed from POSITIONS.md by %s; read here as it last stood, at %s^ (POSITIONS.md:%d there)'
          % (num, st[0][:9], st[0][:9], line))
    p('%s (POSITIONS.md:%d): %d clause(s) that state a status, a default, a pending answer or a standing go'
      % (num, line, len(res)))
    for k, r in enumerate(res, 1):
        p()
        p('[%d] %s"%s"' % (k, ('(under "%s:") ' % r['label']) if r['label'] else '', r['clause']))
        p('    status words: %s; its terms: %s' % (', '.join(r['status']), ', '.join(r['terms']) or 'none'))
        if not r['cands']:
            p('    no candidate')
        for j, (score, c, shared, names, sw) in enumerate(r['cands'], 1):
            p('    %d. %s (%s) "%s": %s%s%s  [weight %.1f]' % (
                j, c[0], c[1], c[2], 'names %s' % num if names else '', ('; ' if names and shared else '') +
                ('shares %s' % ', '.join(shared) if shared else ''), ('; words: %s' % ', '.join(sw[:6])) if sw else '', score))
        if r['n'] > len(r['cands']):
            p('    (%d more candidates, weaker; --top N shows more)' % (r['n'] - len(r['cands'])))
    return res


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    global AT
    top = 5
    if '--at' in argv:
        k = argv.index('--at')
        AT = argv[k + 1]
        argv = argv[:k] + argv[k + 2:]
    if '--top' in argv:
        k = argv.index('--top')
        top = int(argv[k + 1])
        argv = argv[:k] + argv[k + 2:]
    print_homes(argv[0], top=top)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
