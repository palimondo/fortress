#!/usr/bin/env python3
"""evidence.py --root WT --batch N --base BASE --landing LANDING --at AT --out RUN [--force]

The evidence of the record-landing workflow, which prepare.sh runs once the worktree WT exists. A landing is
a batch's merged work committed to main; BASE is the batch's base, LANDING its landing commit, and AT the
commit that WT was made at. The range is BASE..AT: the batch, and what the landing's own steps changed after
it, such as the post-batch review. The script reads FACTS.md, POSITIONS.md, their histories, the gap ledger,
PLAN.md, the review queue and INDEX.md at the three commits with git show, through the classes of WT's
record.py and ledger.py, and runs WT's record tools. It writes six files into RUN, and a seventh only when
plan.md's stale list is cut:

  entries.md   each FACTS and POSITIONS entry that the range added, changed or removed: its line at BASE
               and at AT, its size, the history blocks of the range with who wrote each, and the report
               sections that it cites, each printed once at the end and cut at SECTION_BYTES
  rows.md      each gap-ledger row that the range opened, closed, rewrote or noted, with its claim
  cites.md     each other entry, review-queue item and INDEX line that names a changed entry or row, with
               its file, its line and the sentence that names it
  plan.md      PLAN.md's headings, the PLAN lines that the batch added, the other PLAN lines that name
               a changed entry or row, and the lines that look stale at AT: plan-moves.py --stale-at AT, each
               line whose own review-queue item is settled, each list of items that disagrees with the
               queue, and each review finding that a later commit names; that list is cut at STALE_CHARS
               (40,000 characters, about 250 LOOK lines), and only then is the whole list written to
               plan-stale.txt beside it, which the cut line of plan.md names
  checks.md    at AT: record.py check --base BASE, ledger.py landing-check BASE, the notes that
               check-index.sh finds without an INDEX line, and the citations of PLAN by line number in the
               record's own files
  sources.md   the facts-extract.sh queries of the post-batch review's routing part, its findings and its
               part for the curator, and of the batch record's items for the curator and what it left for
               the coordinator, each with its place and size

A file that exists already is kept, so that a resumed run writes nothing twice; --force writes all six.
Exit 0 when the six files exist, 1 on a missing input.
"""
import argparse
import collections
import os
import re
import subprocess
import sys
import tempfile

SECTION_BYTES = 2500      # of each cited report section that entries.md prints
SENTENCE = 420            # characters of a sentence that cites.md and plan.md print
FX_PAGE = 28000
STALE_CHARS = 40000       # of plan-moves.py's stale list that plan.md prints; the whole list goes to plan-stale.txt past it

ap = argparse.ArgumentParser()
for opt in ('--root', '--batch', '--base', '--landing', '--at', '--out'):
    ap.add_argument(opt, required=True)
ap.add_argument('--force', action='store_true')
A = ap.parse_args()
WT = os.path.abspath(A.root)
OUT = os.path.abspath(A.out)
TOOLS = os.path.join(WT, 'explorations/coordinator/tools')
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, TOOLS)
import record as R      # noqa: E402  the worktree's own record.py: the form of FACTS, POSITIONS and their histories
import ledger as L      # noqa: E402  the worktree's own ledger.py: the ledger's rows and cells

COORD = 'explorations/coordinator/'
LEDGER = 'explorations/fortress-gap-ledger.md'
REVIEW = 'explorations/reviews/batch-%s-review.md' % A.batch
BATCH_RECORD = 'explorations/compile-ladder/climb-batch-%s/RECORD.md' % A.batch
FX = os.path.join(TOOLS, 'facts-extract.sh')
CLOSED = {'FIXED', 'DUPLICATE', 'RETIRED'}


def git(*args):
    return subprocess.run(['git', '-C', WT] + list(args), capture_output=True, text=True)


def show(rev, rel):
    r = git('show', '%s:%s' % (rev, rel))
    return r.stdout if r.returncode == 0 else ''


def short(rev):
    r = git('rev-parse', '--short=9', rev)
    if r.returncode:
        sys.exit('evidence.py: %s is not a commit of %s' % (rev, WT))
    return r.stdout.strip()


BASE, LANDING, AT = short(A.base), short(A.landing), short(A.at)
os.makedirs(OUT, exist_ok=True)
for rel in (REVIEW, BATCH_RECORD):
    if not os.path.isfile(os.path.join(WT, rel)):
        sys.exit('evidence.py: %s is not in the worktree; the workflow runs after the post-batch review is committed' % rel)


def write(name, text):
    path = os.path.join(OUT, name)
    if os.path.exists(path) and not A.force:
        print('kept   %s (%d bytes)' % (name, os.path.getsize(path)))
        return
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text.rstrip('\n') + '\n')
    print('wrote  %s (%d bytes)' % (name, len(text.encode('utf-8'))))


def histories(rev):
    """{F: HistoryFile, P: HistoryFile} of the history files at rev."""
    out = {}
    with tempfile.TemporaryDirectory() as d:
        for k, name in R.HISTORIES.items():
            p = os.path.join(d, name)
            with open(p, 'w', encoding='utf-8') as f:
                f.write(show(rev, COORD + name))
            out[k] = R.HistoryFile(k, p)
    return out


def entries_at(rev):
    out = {}
    for k, name in R.FILES.items():
        f = R.RecordFile(k, name, show(rev, COORD + name))
        for e in f.entries:
            if e.key:
                out.setdefault(e.key, e)
    return out


def clip(s, n):
    s = ' '.join(s.split())
    return s if len(s) <= n else s[:n - 3].rstrip() + '...'


def sentences_at(text, spans):
    """The sentences of text that hold the spans, each once, each cut at SENTENCE characters."""
    out = []
    for a, b in spans:
        lo = max(text.rfind('. ', 0, a), text.rfind('; ', 0, a))
        lo = 0 if lo < 0 else lo + 2
        hi = min([x for x in (text.find('. ', b), text.find('; ', b)) if x >= 0] or [len(text)])
        s = text[lo:hi + 1].strip()
        if len(s) > SENTENCE:
            mid = (a + b) // 2 - lo
            s = '...' + s[max(0, mid - SENTENCE // 2):mid + SENTENCE // 2] + '...'
        if s not in out:
            out.append(s)
    return out


ROWS = re.compile(r'(?<![\w-])[Rr]ows? (\d{1,4}(?:(?:,\s*|,? and |,? or | to |\s*[-–]\s*)\d{1,4}(?![\d.]))*)')


def rows_named(text):
    """[(row number, (start, end))] for each gap-ledger row that text names: row N, rows N and M, rows N to M."""
    out = []
    for m in ROWS.finditer(text):
        seg = m.group(1)
        nums = [int(x) for x in re.findall(r'\d+', seg)]
        for r in re.finditer(r'(\d+)(?: to |\s*[-–]\s*)(\d+)', seg):
            lo, hi = int(r.group(1)), int(r.group(2))
            if 0 < hi - lo < 40:
                nums += range(lo + 1, hi)
        out += [(n, m.span()) for n in nums]
    return out


def entries_named(text, keys):
    out = []
    for m in R.POINTER.finditer(text):
        k = '%s-%s' % (m.group(1), m.group(2))
        if k in keys:
            out.append((k, m.span()))
    return out


def fx_section(rel, heading):
    """(where, body, size) of facts-extract.sh 'doc:REL#HEADING' in the worktree, or (None, error, 0)."""
    q = 'doc:%s#%s' % (rel, heading) if heading else 'doc:%s' % rel
    r = subprocess.run([FX, '--page-bytes', str(10 ** 7), q], capture_output=True, text=True, cwd=WT)
    m = re.search(r'^== (\S+)$', r.stdout, re.M)
    if r.returncode or not m:
        return None, (r.stdout + r.stderr).strip()[:300], 0
    body = r.stdout[m.end():]
    body = re.sub(r'\nfacts-extract: end of part.*$', '', body, flags=re.S).strip('\n')
    return m.group(1), body, len(body.encode('utf-8'))


def fx_check(q):
    r = subprocess.run([FX, '--check', q], capture_output=True, text=True, cwd=WT)
    lines = [l for l in r.stdout.split('\n') if l.strip() and not l.startswith(('facts-extract:', 'Asked for'))]
    return r.returncode, lines


def run(cmd, limit=8000):
    r = subprocess.run(cmd, capture_output=True, text=True, cwd=WT)
    out = (r.stdout + r.stderr).strip()
    if limit is not None and len(out) > limit:
        out = out[:limit] + '\n... (cut at %d of %d characters)' % (limit, len(out))
    return r.returncode, out


# ---------------------------------------------------------------- the entries

E_BASE, E_LAND, E_AT = entries_at(BASE), entries_at(LANDING), entries_at(AT)
H_BASE, H_LAND, H_AT = histories(BASE), histories(LANDING), histories(AT)


def changed(a, b):
    keys = sorted(set(a) | set(b), key=R.sort_key)
    return [k for k in keys if (a[k].line if k in a else None) != (b[k].line if k in b else None)]


IN_BATCH = changed(E_BASE, E_LAND)
AFTER = changed(E_LAND, E_AT)
CHANGED = sorted(set(IN_BATCH) | set(AFTER), key=R.sort_key)
block_set = lambda h: {(b.key, b.prov) for k in 'FP' for b in h[k].blocks}
OLD_BLOCKS, LAND_BLOCKS = block_set(H_BASE), block_set(H_LAND)


def writer_of(prov):
    m = re.search(r' · by (.*?)(?:: |$)', prov)
    who = m.group(1) if m else 'no by field'
    for word, name in (('merged-diff review', 'the merged-diff review'), ('commit stage', 'the commit stage'), ('gather', 'the gather')):
        if word in who:
            return name, who
    return who, who


sources = collections.OrderedDict()     # (rel, heading) -> number


def find_path(path):
    """PATH as record.py resolves it, else a skill part (`references/batch.md`) when one skill holds it."""
    rel = R.find_path(WT, path)
    if rel is None:
        skills = os.path.join(WT, '.claude/skills')
        hits = [d for d in sorted(os.listdir(skills)) if os.path.isfile(os.path.join(skills, d, path))] if os.path.isdir(skills) else []
        rel = '.claude/skills/%s/%s' % (hits[0], path) if len(hits) == 1 else None
    return rel


def source_number(path, heading):
    rel = find_path(path) or path
    k = (rel, heading)
    if k not in sources:
        sources[k] = len(sources) + 1
    return sources[k]


def entries_md():
    out = ['<!-- The record-landing workflow\'s evidence of the entries: each FACTS and POSITIONS entry that %s..%s added, changed or removed (the batch %s, landed at %s, and the landing\'s own steps to %s), written by evidence.py. -->' % (BASE, AT, A.batch, LANDING, AT), '',
           '# The entries that the range changed', '']
    for title, keys in (('The batch, %s..%s' % (BASE, LANDING), IN_BATCH), ('After the landing, %s..%s' % (LANDING, AT), AFTER)):
        out.append('- %s: %d entries%s' % (title, len(keys), (': ' + ', '.join(keys)) if keys else ''))
    over = [k for k in CHANGED if k in E_AT and len(E_AT[k].line) > R.SIZE]
    out += ['- Now over %d characters: %d of %d%s' % (R.SIZE, len(over), len(CHANGED), (': ' + ', '.join(over)) if over else ''), '',
            'Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, '
            'the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections '
            'that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". '
            'Print an entry\'s whole history with `facts-extract.sh \'history:F-N\'`.', '']
    for k in CHANGED:
        b, l, n = E_BASE.get(k), E_LAND.get(k), E_AT.get(k)
        size = lambda e: '%d characters' % len(e.line) if e else 'none'
        state = 'added' if not b else 'removed' if not n else 'changed'
        out += ['## %s, %s' % (k, state), '',
                '- Size: at the base %s; at the landing %s; now %s%s.' % (size(b), size(l), size(n), ', over %d' % R.SIZE if n and len(n.line) > R.SIZE else ''),
                '- Section now: %s.' % ('"%s"' % n.section if n and n.section else 'none'), '']
        if b:
            out += ['At the base:', '', b.line, '']
        if n:
            out += ['Now:', '', n.line, '']
        blocks = [x for x in H_AT[k[0]].of(k) if (x.key, x.prov) not in OLD_BLOCKS]
        if blocks:
            out += ['History blocks of the range:', '']
            for x in blocks:
                who, _ = writer_of(x.prov)
                cites = ['[S%d]' % source_number(p, h or None) for p, h in re.findall(r'from `([^`]+)`(?:, "([^"]*)")?', x.prov)]
                after = '' if (x.key, x.prov) in LAND_BLOCKS else ' (after the landing)'
                out.append('- Written by %s%s: %s%s' % (who, after, x.prov, (' (cites ' + ', '.join(cites) + ')') if cites else ''))
            out.append('')
        if n:
            cites = ['[S%d] `%s`, "%s"' % (source_number(p, h), p, h) for p, h in R.CITED.findall(n.line)]
            if cites:
                out += ['Report sections that the entry cites: ' + '; '.join(cites) + '.', '']
    out += ['# The cited sections', '',
            'Each cut at %d bytes. Print one whole with the query under its heading, from the worktree.' % SECTION_BYTES, '']
    for (rel, heading), num in sources.items():
        where, body, size = fx_section(rel, heading)
        q = "facts-extract.sh 'doc:%s%s'" % (rel, '#' + heading if heading else '')
        out += ['## [S%d] %s%s' % (num, rel, ', "%s"' % heading if heading else ''), '', '`%s`' % q, '']
        if where is None:
            out += ['Does not resolve: %s' % body, '']
            continue
        cut = body.encode('utf-8')[:SECTION_BYTES].decode('utf-8', 'ignore').replace('~~~~', '~ ~ ~ ~')
        out += ['%s, %d bytes%s.' % (where, size, '' if size <= SECTION_BYTES else ', cut at %d' % SECTION_BYTES), '', '~~~~', cut, '~~~~', '']
    return '\n'.join(out)


# ---------------------------------------------------------------- the rows

def ledger_at(rev):
    return {r.num: r for r in L.Ledger(LEDGER + '@' + rev, show(rev, LEDGER)).rows if r.num is not None}


L_BASE, L_LAND, L_AT = ledger_at(BASE), ledger_at(LANDING), ledger_at(AT)


def row_change(a, b):
    if a is None:
        return 'opened'
    if b is None:
        return 'gone'
    if a.status_word not in CLOSED and b.status_word in CLOSED:
        return 'closed as ' + b.status_word
    cells = [c for c in ('claim', 'status', 'class', 'spec', 'reproducer', 'found_by', 'notes') if a.get(c) != b.get(c)]
    if cells == ['notes']:
        return 'noted'
    return 'rewritten (%s)' % ', '.join(c.replace('found_by', 'found by') for c in cells)


ROW_CHANGES = collections.OrderedDict()
for num in sorted(set(L_BASE) | set(L_AT)):
    a, b = L_BASE.get(num), L_AT.get(num)
    if (a.line if a else None) != (b.line if b else None):
        ROW_CHANGES[num] = row_change(a, b)


def rows_md():
    out = ['<!-- The record-landing workflow\'s evidence of the gap ledger: each row that %s..%s opened, closed, rewrote or noted, with its claim, written by evidence.py. -->' % (BASE, AT), '',
           '# The rows that the range changed', '']
    kinds = collections.defaultdict(list)
    for num, what in ROW_CHANGES.items():
        kinds[what.split(' (')[0]].append(str(num))
    for what, nums in kinds.items():
        out.append('- %s: %s' % (what, ', '.join(nums)))
    out += ['', 'Print a row whole with `facts-extract.sh \'ledger:N\'`, from the worktree.', '']
    for num, what in ROW_CHANGES.items():
        a, b, l = L_BASE.get(num), L_AT.get(num), L_LAND.get(num)
        after = '' if (l.line if l else None) == (b.line if b else None) else ' (changed after the landing)'
        out += ['## Row %d, %s%s' % (num, what, after), '']
        r = b or a
        out.append('- Section: %s. Status: %s%s. Class: %s.' % (r.section, (a.status + ' at the base, ') if a and b and a.status != b.status else '', r.status, r.klass))
        out.append('- Claim: %s' % r.claim)
        if a and b and a.claim != b.claim:
            out.append('- Claim at the base: %s' % a.claim)
        out.append('- Reproducer: %s' % r.reproducer)
        if a and b and a.notes != b.notes:
            na, nb = a.notes.split(' '), b.notes.split(' ')
            i = 0
            while i < min(len(na), len(nb)) and na[i] == nb[i]:
                i += 1
            j = 0
            while j < min(len(na), len(nb)) - i and na[-1 - j] == nb[-1 - j]:
                j += 1
            gained, lost = ' '.join(nb[i:len(nb) - j]), ' '.join(na[i:len(na) - j])
            nb = b.notes
            out.append('- Notes now: %s' % clip(nb, 700))
            out.append('- The notes gained: %s%s' % (clip(gained, 700) or 'nothing', '; they lost: ' + clip(lost, 400) if lost.strip() else ''))
        elif b and not a:
            out.append('- Notes: %s' % clip(b.notes, 700))
        out.append('')
    return '\n'.join(out)


# ---------------------------------------------------------------- what names a changed entry or row

KEYS = set(CHANGED)
ROWSET = set(ROW_CHANGES)


def names(text):
    """(the changed entries and rows that text names, their spans)"""
    ents = entries_named(text, KEYS)
    rows = [(n, s) for n, s in rows_named(text) if n in ROWSET]
    return sorted({k for k, _ in ents}, key=R.sort_key), sorted({n for n, _ in rows}), [s for _, s in ents] + [s for _, s in rows]


def describe(ents, rows):
    parts = []
    if ents:
        parts.append(', '.join(ents))
    if rows:
        parts.append(('row ' if len(rows) == 1 else 'rows ') + ', '.join(map(str, rows)))
    return ' and '.join(parts)


def queue_items(text):
    """[(number or None, first line, section, text)] of the review queue's items."""
    items, cur, top, sec = [], None, None, None
    for i, ln in enumerate(text.split('\n'), 1):
        if ln.startswith('## '):
            top, sec, cur = ln[3:].strip(), None, None
            continue
        if ln.startswith('### '):
            sec, cur = ln[4:].strip(), None
            continue
        m = re.match(r'(\d+)\. ', ln) or re.match(r'- \*\*(\d+)?', ln)
        if m and (sec or top):
            cur = [int(m.group(1)) if m.group(1) else None, i, ' > '.join(x for x in (top, sec) if x), ln]
            items.append(cur)
        elif cur is not None and ln.startswith('   '):
            cur[3] += '\n' + ln
        elif cur is not None and ln.strip() and not ln.startswith(' '):
            cur = None
    return items


def cites_md():
    out = ['<!-- The record-landing workflow\'s evidence of what names a changed entry or row: each other FACTS or POSITIONS entry, review-queue item and INDEX line at %s that names an entry or a gap-ledger row that %s..%s changed, written by evidence.py. -->' % (AT, BASE, AT), '',
           '# What names a changed entry or row', '',
           'The changed entries are those of `entries.md`, the changed rows those of `rows.md`. PLAN.md\'s lines are in `plan.md`. '
           'Each line below: the file and line, what it names, then each sentence that names it.', '']
    n_rec = 0
    out += ['## Other entries', '']
    for k, name in R.FILES.items():
        f = R.RecordFile(k, name, show(AT, COORD + name))
        for e in f.entries:
            if not e.key or e.key in KEYS:
                continue
            ents, rows, spans = names(e.line)
            if ents or rows:
                n_rec += 1
                out.append('- %s (%s:%d) names %s: %s' % (e.key, name, e.lineno, describe(ents, rows), ' | '.join(sentences_at(e.line, spans))))
    if not n_rec:
        out.append('None.')
    out += ['', '## Review-queue items', '']
    n = 0
    for num, ln, sec, text in queue_items(show(AT, COORD + 'review-queue.md')):
        text = re.sub(r'\n\s*', ' ', text)
        ents, rows, spans = names(text)
        if ents or rows:
            n += 1
            out.append('- %s (review-queue.md:%d, %s) names %s: %s' % ('Item %d' % num if num else 'An item without a number', ln, sec, describe(ents, rows), ' | '.join(sentences_at(text, spans))))
    if not n:
        out.append('None.')
    out += ['', '## INDEX lines', '']
    n = 0
    for i, ln in enumerate(show(AT, COORD + 'INDEX.md').split('\n'), 1):
        ents, rows, spans = names(ln)
        if ents or rows:
            n += 1
            m = re.match(r'- `([^`]+)`', ln)
            out.append('- INDEX.md:%d, `%s`, names %s: %s' % (i, m.group(1) if m else '?', describe(ents, rows), ' | '.join(sentences_at(ln, spans))))
    if not n:
        out.append('None.')
    return '\n'.join(out)


# ---------------------------------------------------------------- PLAN

def plan_md():
    text_at = show(AT, COORD + 'PLAN.md')
    lines = text_at.split('\n')
    heads, path = [], {}
    h2 = h3 = None
    for i, ln in enumerate(lines, 1):
        if ln.startswith('## '):
            h2, h3 = ln[3:].strip(), None
            heads.append((i, 2, h2))
        elif ln.startswith('### '):
            h3 = ln[4:].strip()
            heads.append((i, 3, h3))
        path[i] = ' > '.join(x for x in (h2, h3) if x)
    starts = [h[0] for h in heads] + [len(lines) + 1]
    out = ['<!-- The record-landing workflow\'s evidence of PLAN.md at %s: its headings, the lines that the batch added (%s..%s) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->' % (AT, BASE, LANDING), '',
           '# PLAN.md', '', 'Print a section with `facts-extract.sh \'doc:explorations/coordinator/PLAN.md#HEADING\'`, from the worktree.', '',
           '## Its headings, with their lines', '']
    for j, (i, lvl, t) in enumerate(heads):
        out.append('%s- %d: %s (%d lines)' % ('  ' if lvl == 3 else '', i, t, starts[j + 1] - i))
    base_c = collections.Counter(show(BASE, COORD + 'PLAN.md').split('\n'))
    land_c = collections.Counter(show(LANDING, COORD + 'PLAN.md').split('\n'))
    added = land_c - base_c
    after = collections.Counter(lines) - land_c
    where = collections.defaultdict(list)
    for i, ln in enumerate(lines, 1):
        where[ln].append(i)
    shown = set()
    for title, cnt in (('The lines that the batch added, %s..%s' % (BASE, LANDING), added), ('The lines added after the landing, %s..%s' % (LANDING, AT), after)):
        out += ['', '## ' + title, '']
        n = 0
        for ln in [l for l in cnt.elements() if l.strip()]:
            at = where.get(ln, [])
            pos = 'PLAN.md:%d, under "%s"' % (at[0], path[at[0]]) if at else 'not in PLAN.md at %s' % AT
            out += ['- %s:' % pos, '', ln, '']
            shown.update(at[:1])
            n += 1
        if not n:
            out.append('None.')
    out += ['', '## The other lines that name a changed entry or row', '']
    n = 0
    for i, ln in enumerate(lines, 1):
        if i in shown or not ln.strip() or ln.startswith('#'):
            continue
        ents, rows, spans = names(ln)
        if ents or rows:
            n += 1
            out.append('- PLAN.md:%d, under "%s", %d characters, names %s: %s' % (i, path[i], len(ln), describe(ents, rows), ' | '.join(sentences_at(ln, spans))))
    if not n:
        out.append('None.')
    code, looks = run(['python3', os.path.join(HERE, 'plan-moves.py'), '--root', WT, '--base', AT, '--stale-at', AT], limit=None)
    if code == 0 and len(looks) > STALE_CHARS:
        write('plan-stale.txt', looks)
        cut = looks[:STALE_CHARS].rsplit('\n', 1)[0]
        looks = cut + '\n... (cut at %d of %d characters, %d of %d LOOK lines; the whole list is `plan-stale.txt` in this folder)' % (
            len(cut), len(looks), cut.count('\nLOOK ') + cut.startswith('LOOK '), looks.count('\nLOOK ') + looks.startswith('LOOK '))
    out += ['', '## The lines that look stale at %s' % AT, '',
            'From `plan-moves.py --stale-at %s`. Each line: its place, why it looks stale, and its first words. '
            '"settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that '
            'differs from the queue\'s list that it names. "finding": a commit that changes the tree names the review '
            'finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or '
            'answered, or weight none with the reason that it stays.' % AT, '',
            looks if code == 0 else 'plan-moves.py failed: %s' % looks]
    return '\n'.join(out)


# ---------------------------------------------------------------- the checks at AT

LIVE = ['explorations/coordinator/%s' % f for f in ('PLAN.md', 'review-queue.md', 'FACTS.md', 'POSITIONS.md', 'INDEX.md', 'BOOT.md', 'HELD.md')]


def checks_md():
    rec = os.path.join(TOOLS, 'record.py')
    led = os.path.join(TOOLS, 'ledger.py')
    out = ['<!-- The record-landing workflow\'s evidence of the record\'s checks in the worktree at %s, before any change: the record tool\'s check against the batch\'s base, the ledger\'s landing check, the notes without an INDEX line, and the citations of PLAN by line number, written by evidence.py. -->' % AT, '',
           '# The checks at %s, before any change' % AT, '']
    for title, cmd in (('record.py check --base %s' % BASE, ['python3', rec, 'check', '--base', BASE]),
                       ('ledger.py landing-check %s' % BASE, ['python3', led, 'landing-check', BASE])):
        code, text = run(cmd)
        out += ['## ' + title, '', 'Exit %d.' % code, '', '```', text, '```', '']
    code, text = run(['bash', 'explorations/coordinator/check-index.sh'])
    m = re.search(r'== notes missing from INDEX.md.*?(?=\n== )', text, re.S)
    out += ['## check-index.sh', '', 'Exit %d. The notes without an INDEX line:' % code, '', '```', (m.group(0) if m else text).strip(), '```', '']
    r = git('grep', '-n', r'PLAN\.md:[0-9]', AT, '--', *LIVE)
    hits = [l.split(':', 1)[1] for l in r.stdout.split('\n') if l.strip()]
    total = git('grep', '-c', r'PLAN\.md:[0-9]', AT, '--', '.').stdout
    n_all = sum(int(l.rsplit(':', 1)[1]) for l in total.split('\n') if l.strip())
    out += ['## The citations of PLAN by line number', '',
            '%d in the record\'s own files (%s); %d in the whole tree, the rest in reports, reviews and batch records, which cite PLAN as it stood when they were written.' % (len(hits), ', '.join(os.path.basename(x) for x in LIVE), n_all), '']
    plan = show(AT, COORD + 'PLAN.md').split('\n')
    for h in hits:
        f, ln, text = h.split(':', 2)
        cited = [int(x) for x in re.findall(r'PLAN\.md:(\d+)', text)]
        heads = '; '.join('PLAN.md:%d now reads "%s"' % (c, clip(plan[c - 1], 90)) if 0 < c <= len(plan) else 'PLAN.md:%d is past its end' % c for c in cited)
        out.append('- %s:%s: %s' % (f, ln, heads))
    return '\n'.join(out)


# ---------------------------------------------------------------- the sources

def sources_md():
    qs = [('The post-batch review\'s routing part', 'doc:%s#Part 4' % REVIEW),
          ('The post-batch review\'s findings, which its routing part cites by number', 'doc:%s#Findings' % REVIEW),
          ('The post-batch review\'s part for the curator', 'doc:%s#For the curator' % REVIEW),
          ('The batch record\'s items for the curator', 'doc:%s#Items for the curator' % BATCH_RECORD),
          ('The batch record\'s list of what it left for the coordinator', 'doc:%s#Left for the coordinator' % BATCH_RECORD)]
    out = ['<!-- The record-landing workflow\'s evidence of its sources: the facts-extract.sh queries that print the parts of climb batch %s\'s post-batch review and batch record that the sort reads, each with its place and size, written by evidence.py. -->' % A.batch, '',
           '# The sources', '', 'Run each query from the worktree: `cd %s && explorations/coordinator/tools/facts-extract.sh \'QUERY\'`.' % WT, '']
    for title, q in qs:
        code, lines = fx_check(q)
        out += ['- %s: `%s`%s' % (title, q, '' if code == 0 else ' (does not match exactly one section)')]
        out += ['  %s' % l.strip() for l in lines]
    out += ['', 'The batch record whole: `%s`. The review whole: `%s`.' % (BATCH_RECORD, REVIEW)]
    return '\n'.join(out)


write('entries.md', entries_md())
write('rows.md', rows_md())
write('cites.md', cites_md())
write('plan.md', plan_md())
write('checks.md', checks_md())
write('sources.md', sources_md())
