#!/usr/bin/env python3
"""plan-consolidate.py MODE --root WT [options]: the mechanical step of PLAN's consolidation of 2026-11-03.

The inventory (process-engineering/plan-consolidation-2026-11-03/inventory.md) marks each non-blank line of
PLAN.md from line 15 to line 702, by its line number at MARKS_AT (8ab0dcd48), in its appendix "the lines by
mark". This script acts on those marks, on the lines that the inventory's section 4 and its choices 3 and 11
name for an edit, and on "Where we stand", which section 5 cuts:

  M, D   a closed line and a duplicate within PLAN: copied word for word to PLAN-history.md and deleted
         from PLAN.md.
  H, X   a line cut to one line, and a split line: copied word for word to PLAN-history.md and left in
         PLAN.md with a marker at its end, ` <!-- consolidate 2026-11-03: H 51 -->`, for a writer to replace.
  E      a line that stays but is edited (a stale citation or clause; lines 45 to 47 cut to their commit
         and review; the header comment, line 1): copied and marked as H.
  W      the five bullets of "Where we stand" (lines 9 to 13): copied, and replaced by the four bullets of
         the inventory's section 5, with the "Next" bullet marked for the edges' writer.
Every copied line goes under "## Moved at the consolidation of 2026-11-03", at the end of PLAN-history.md,
under a "### " heading for the PLAN heading that the line stood under, in PLAN's order, as the
consolidation of 2026-10-30 did. The preamble's heading is "The preamble, above the title", as before.
A second run (for example `apply --only 173 --add M:173`, the edges' move of line 173) adds to that section.

A line is found in the working PLAN.md by its whole text at MARKS_AT, under the same heading. A line that the
working PLAN.md does not hold word for word under that heading, once, is not acted on; the script says why.

Modes:
  dry-run    print what apply would do, line by line, with the counts by mark and by section against the
             inventory's table (section 3, "Moved to PLAN-history"), and the lines it cannot act on.
  apply      do it, in the worktree WT. Writes nothing else.
  fill       after the writers: replace each marked line of PLAN.md by its new line from the writers'
             files (--lines FILE, once per file). A file holds, for each line it writes, a line `@N` (N the
             number in the marker) and then the new line, or an empty line where the old line is dropped
             (a duplicate). Prints each new line's length; LOOK where a new line's list form (its indent and
             `- ` or `12. `) differs from the old line's, or where a cut line (H) passes 300 characters;
             FAIL where an `@N` has no marker. Run it on PLAN.md as the mechanical commit left it
             (`git checkout HEAD -- explorations/coordinator/PLAN.md` first, while that commit is HEAD), with
             every file at once, so that a fix round is filled again from the start.
  check      after apply: each M and D line is in the new section of PLAN-history.md byte for byte, under its
             heading, and gone from PLAN.md; each H, X, E and W line is in the new section byte for byte and,
             in PLAN.md, only in its marked form. With --final (after the writers and the edges): no marker
             is left in PLAN.md and no H, X, E or W line is still in PLAN.md unchanged.
  pointers   after the writers: each line new in PLAN.md against --base names review-queue items, rows, F-
             and P- entries that exist (FAIL otherwise), and the items open and the rows not closed (LOOK
             otherwise, for the checker); then each "Home: PLAN, ..." clause of the review queue that found
             its line at --base and finds none now (FAIL), with the repointing for a moved line. --write
             repoints the clauses that name one heading and one moved line, to "PLAN-history, "Moved at the
             consolidation of 2026-11-03", under "HEADING", WORDS".
Options:
  --base REV       the commit that the worktree was made at (check and pointers; apply's default is HEAD).
  --marks-at REV   the commit at which the inventory's line numbers read (default 8ab0dcd48).
  --add MARK:N,N   more lines with a mark: the reader's closed lines of choice 10 (M:685,690), or line 173 (M:173).
  --only N,N       act only on these lines (and no W unless named).
Pass check and pointers the same --add as apply. Exit 1 on a FAIL or a line not acted on (apply refuses
to write if any line cannot be acted on).
"""
import argparse
import collections
import os
import re
import subprocess
import sys

D = 'explorations/coordinator/'
INV = D + 'process-engineering/plan-consolidation-2026-11-03/inventory.md'
SECTION = '## Moved at the consolidation of 2026-11-03'
PREAMBLE = 'The preamble, above the title'
MARK = ' <!-- consolidate 2026-11-03: %s %d -->'
MARK_RE = re.compile(r' <!-- consolidate 2026-11-03: ([A-Z]+(?: Next)?) (\d+) -->$')
# Lines that stay but are edited: the inventory's section 4 ("about ten small edits": lines 19, 84, 121, 174,
# 180, 414, 471, 558 and 594, and the header comment) and choice 3 (lines 45 to 47 cut to their commit and review).
EDITED = [1, 19, 45, 46, 47, 84, 121, 174, 180, 414, 471, 558, 594]
WHERE = [9, 10, 11, 12, 13]
ACT = {'M', 'D', 'H', 'X', 'E', 'W'}
MOVE = {'M', 'D'}

ap = argparse.ArgumentParser(description='The mechanical step of PLAN\'s consolidation of 2026-11-03.')
ap.add_argument('mode', choices=['dry-run', 'apply', 'fill', 'check', 'pointers'])
ap.add_argument('--root', required=True)
ap.add_argument('--base')
ap.add_argument('--marks-at', default='8ab0dcd48')
ap.add_argument('--add', action='append', default=[])
ap.add_argument('--only')
ap.add_argument('--final', action='store_true')
ap.add_argument('--write', action='store_true')
ap.add_argument('--lines', action='append', default=[])
a = ap.parse_args()
ROOT = os.path.abspath(a.root)


def git(*args):
    r = subprocess.run(['git', '-C', ROOT] + list(args), capture_output=True, text=True)
    if r.returncode:
        sys.exit('plan-consolidate: git %s: %s' % (' '.join(args), r.stderr.strip()))
    return r.stdout


def show(rel, rev):
    return git('show', '%s:%s' % (rev, rel)).split('\n')


def read(rel):
    with open(os.path.join(ROOT, rel), encoding='utf-8') as f:
        return f.read().split('\n')


def write(rel, lines):
    with open(os.path.join(ROOT, rel), 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))


def headings(lines):
    """[heading or None] per line: the text of the nearest markdown heading above (the preamble's name above
    the title), None on a heading line itself."""
    out, cur = [], PREAMBLE
    for ln in lines:
        m = re.match(r'#+ (.*)', ln)
        if m:
            cur = m.group(1).strip()
            out.append(None)
        else:
            out.append(cur)
    return out


def chars(ln):
    return len(ln) + 1


# ---------------------------------------------------------------- the marks

inv = read(INV)
marks = {}
for ln in inv:
    m = re.match(r'- ([A-Z]), [^(]*\((\d+) lines?\): ([\d, ]+)\.$', ln)
    if m:
        for n in re.findall(r'\d+', m.group(3)):
            marks[int(n)] = m.group(1)
        if len([n for n in marks if marks[n] == m.group(1)]) != int(m.group(2)):
            sys.exit('plan-consolidate: the appendix\'s list %s does not hold %s lines' % (m.group(1), m.group(2)))
if len(marks) != 504:
    sys.exit('plan-consolidate: the appendix marks %d lines, not 504' % len(marks))
table_marks = dict(marks)
for n in EDITED:
    marks[n] = 'E'
for n in WHERE:
    marks[n] = 'W'
for spec in a.add:
    mk, _, nums = spec.partition(':')
    if mk not in ACT or not nums:
        sys.exit('plan-consolidate: --add takes MARK:N,N with MARK one of %s' % ' '.join(sorted(ACT)))
    for n in re.findall(r'\d+', nums):
        marks[int(n)] = mk
acted = sorted(n for n, mk in marks.items() if mk in ACT)
if a.only:
    want = {int(n) for n in re.findall(r'\d+', a.only)}
    acted = [n for n in acted if n in want]

# The first words that section 1 gives each line, to check the line numbers against the text.
first = {}
for ln in inv:
    m = re.match(r'- Line (\d+) \((.*?)…\)', ln)
    if m:
        first[int(m.group(1))] = m.group(2)
# The table of section 3: (first line, last line, label, moved characters).
table = []
for ln in inv:
    m = re.match(r'\| (.+) \((\d+)-(\d+)\) \|(?:[^|]*\|){6} ([\d,]+) \|', ln)
    if m:
        table.append((int(m.group(2)), int(m.group(3)), m.group(1), int(m.group(4).replace(',', ''))))

plan0 = show(D + 'PLAN.md', a.marks_at)
head0 = headings(plan0)


def norm(s):
    return re.sub(r'\s+', ' ', re.sub(r'[*`]', '', s)).strip()


def strip_item(s):
    return re.sub(r'^\s*(?:- |\d+\. )?', '', s)


# ---------------------------------------------------------------- finding each line in the working PLAN

def locate(plan, heads):
    """{n: index in plan} for each acted line, and [(n, why)] for the lines that cannot be acted on."""
    where, bad = {}, []
    by_text = collections.defaultdict(list)
    for i, ln in enumerate(plan):
        base = MARK_RE.sub('', ln)
        by_text[base].append(i)
    taken = set()
    for n in acted:
        if n > len(plan0) or not plan0[n - 1].strip():
            bad.append((n, 'line %d of PLAN.md at %s is blank or past the end' % (n, a.marks_at)))
            continue
        t, h = plan0[n - 1], head0[n - 1]
        if h is None:
            bad.append((n, 'line %d at %s is a heading' % (n, a.marks_at)))
            continue
        opens = (norm(strip_item(t)), norm(re.sub(r'^\s*(?:- )?', '', t)))
        if n in first and not any(o.startswith(norm(first[n])) for o in opens):
            bad.append((n, 'its text at %s does not open with the inventory\'s first words "%s"' % (a.marks_at, first[n])))
            continue
        cands = [i for i in by_text.get(t, []) if heads[i] == h and i not in taken]
        if not cands:
            bad.append((n, 'the working PLAN.md holds it word for word under "%s" no more' % h))
            continue
        # Several equal lines under one heading: take them in order.
        k = sum(1 for m in acted if m < n and plan0[m - 1] == t and head0[m - 1] == h)
        i = cands[min(k, len(cands) - 1)]
        taken.add(i)
        where[n] = i
    return where, bad


def section_label(n):
    for lo, hi, label, _ in table:
        if lo <= n <= hi:
            return label
    return 'Where we stand' if n in WHERE else (PREAMBLE if n < 7 else 'outside the table')


def summary(where, bad):
    by_mark = collections.Counter()
    by_mark_c = collections.Counter()
    by_sec = collections.Counter()
    for n in where:
        mk = marks[n]
        by_mark[mk] += 1
        by_mark_c[mk] += chars(plan0[n - 1])
        if table_marks.get(n) in ('M', 'D', 'H', 'X') and mk in ('M', 'D', 'H', 'X'):
            by_sec[section_label(n)] += chars(plan0[n - 1])
    print('\nBy mark (lines, characters with their newlines):')
    for mk in ['M', 'D', 'H', 'X', 'E', 'W']:
        if by_mark[mk]:
            print('  %s %3d lines %7s characters' % (mk, by_mark[mk], format(by_mark_c[mk], ',')))
    moved = sum(by_mark_c[m] for m in MOVE)
    print('  deleted from PLAN.md (M, D): %d lines, %s characters' % (sum(by_mark[m] for m in MOVE), format(moved, ',')))
    print('  copied to PLAN-history.md (all): %d lines, %s characters' % (sum(by_mark.values()), format(sum(by_mark_c.values()), ',')))
    print('\nAgainst the inventory\'s table, "Moved to PLAN-history" (M, D, H and X lines of the table):')
    diffs = 0
    for lo, hi, label, want in table:
        got = by_sec[label]
        if got != want:
            diffs += 1
        print('  %-70s %7s %7s%s' % (label[:70], format(want, ','), format(got, ','), '' if got == want else '  differs'))
    total = sum(t[3] for t in table)
    print('  %-70s %7s %7s' % ('All', format(total, ','), format(sum(by_sec.values()), ',')))
    for n, why in bad:
        print('CANNOT line %d (%s): %s' % (n, marks[n], why))
    return diffs


# ---------------------------------------------------------------- the new section of PLAN-history

def parse_section(hist):
    """(start, end, intro, {heading: [lines]}, [headings in order]) of the new section, or None."""
    try:
        s = hist.index(SECTION)
    except ValueError:
        return None
    e = next((i for i in range(s + 1, len(hist)) if hist[i].startswith('## ')), len(hist))
    intro, subs, order, cur = [], {}, [], None
    for ln in hist[s + 1:e]:
        if ln.startswith('### '):
            cur = ln[4:].strip()
            subs[cur] = []
            order.append(cur)
        elif cur is None:
            intro.append(ln)
        elif ln.strip():
            subs[cur].append(ln)
    return s, e, intro, subs, order


def base_index(text, heading):
    for i, ln in enumerate(plan0):
        if ln == text and head0[i] == heading:
            return i
    return 10 ** 6


def render(intro, subs, order):
    out = [SECTION] + intro
    while out and not out[-1].strip():
        out.pop()
    out.append('')
    for h in order:
        out += ['### ' + h, ''] + subs[h] + ['']
    return out


def apply(where):
    plan = read(D + 'PLAN.md')
    hist = read(D + 'PLAN-history.md')
    base = a.base or git('rev-parse', '--short=9', 'HEAD').strip()
    sec = parse_section(hist)
    if sec:
        s, e, intro, subs, order = sec
    else:
        s = e = None
        intro = ['', 'Moved or rewritten at PLAN\'s third consolidation, on 2026-11-03, by the method of the consolidations of 2026-10-15 and 2026-10-30 (`process-engineering/plan-map.md`), on the inventory `process-engineering/plan-consolidation-2026-11-03/inventory.md`, from `PLAN.md` as at `%s`: the earlier texts word for word, each under the heading it stood under; a line kept word for word in PLAN is not repeated here.' % base, '']
        subs, order = {}, []
    for n in sorted(where):
        h = head0[n - 1]
        t = plan0[n - 1]
        if h not in subs:
            subs[h] = []
            order.append(h)
        lst = subs[h]
        if t in lst:
            continue
        bi = n - 1
        pos = next((j for j, x in enumerate(lst) if base_index(x, h) > bi), len(lst))
        lst.insert(pos, t)
    first_line = {}
    for h in order:
        first_line[h] = min([base_index(x, h) for x in subs[h]] + [10 ** 6])
    order.sort(key=lambda h: first_line[h])
    block = render(intro, subs, order)
    if s is None:
        while hist and not hist[-1].strip():
            hist.pop()
        hist = hist + [''] + block
    else:
        hist = hist[:s] + block + hist[e:]
    if hist[-1] != '':
        hist.append('')
    # PLAN: delete M and D, mark H, X and E, replace W by section 5's bullets.
    new_where = section5() if any(marks[n] == 'W' for n in where) else None
    drop, mark_at = set(), {}
    for n, i in where.items():
        mk = marks[n]
        if mk in MOVE:
            drop.add(i)
        elif mk != 'W':
            mark_at[i] = MARK % (mk, n)
    w_idx = sorted(i for n, i in where.items() if marks[n] == 'W')
    folded, dropped = [], False
    for i, ln in enumerate(plan):
        if i in drop:
            dropped = True
            continue
        if dropped and not ln.strip() and folded and not folded[-1].strip():
            # A deleted line that stood alone between blank lines leaves one blank line, not two.
            dropped = False
            continue
        dropped = False
        if w_idx and i == w_idx[0]:
            folded += new_where
            continue
        if i in w_idx:
            continue
        if i in mark_at and not MARK_RE.search(ln):
            ln = ln + mark_at[i]
        folded.append(ln)
    write(D + 'PLAN.md', folded)
    write(D + 'PLAN-history.md', hist)
    print('apply: PLAN.md %d lines to %d; PLAN-history.md under "%s", %d headings' % (len(plan), len(folded), SECTION[3:], len(order)))


def section5():
    """The bullets of the inventory's section 5, its proposed "Where we stand", the Next bullet marked."""
    try:
        s = next(i for i, ln in enumerate(inv) if ln.startswith('## 5. '))
        b = next(i for i in range(s, len(inv)) if inv[i].startswith('```markdown'))
        e = next(i for i in range(b + 1, len(inv)) if inv[i].startswith('```'))
    except StopIteration:
        sys.exit('plan-consolidate: no proposed text in the inventory\'s section 5')
    bullets = [ln for ln in inv[b + 1:e] if ln.startswith('- **')]
    if len(bullets) != 4 or not bullets[-1].startswith('- **Next.**'):
        sys.exit('plan-consolidate: section 5\'s text does not hold its four bullets, Next last')
    bullets[-1] += MARK % ('W Next', 13)
    return bullets


# ---------------------------------------------------------------- check

def check(where):
    plan = read(D + 'PLAN.md')
    hist = read(D + 'PLAN-history.md')
    sec = parse_section(hist)
    fails = []
    if not sec:
        print('FAIL PLAN-history.md has no heading "%s"' % SECTION[3:])
        return 1
    _, _, intro, subs, order = sec
    count0 = collections.Counter(plan0)
    count1 = collections.Counter(plan)
    marked = collections.Counter(MARK_RE.sub('', ln) for ln in plan if MARK_RE.search(ln))
    moved_by_text = collections.Counter(plan0[n - 1] for n in where if marks[n] in MOVE)
    for n in sorted(where):
        t, h, mk = plan0[n - 1], head0[n - 1], marks[n]
        if t not in subs.get(h, []):
            fails.append('line %d (%s) is not under "### %s" of the new section byte for byte' % (n, mk, h))
        if mk in MOVE:
            if count1[t] > count0[t] - moved_by_text[t]:
                fails.append('line %d (%s) is still in PLAN.md' % (n, mk))
        elif a.final:
            if count1[t] >= count0[t]:
                fails.append('line %d (%s) is still in PLAN.md unchanged: edit it, or take its copy out of PLAN-history.md' % (n, mk))
        elif mk != 'W' and count1[t] >= count0[t] and not marked[t]:
            fails.append('line %d (%s) is in PLAN.md unchanged and unmarked' % (n, mk))
    known = {plan0[n - 1] for n in where}
    for h in order:
        for ln in subs[h]:
            if ln not in known:
                fails.append('the new section holds a line that no acted line of PLAN.md at %s is, under "%s": %s' % (a.marks_at, h, ln[:120]))
    left = [ln for ln in plan if MARK_RE.search(ln)]
    if a.final and left:
        for ln in left:
            fails.append('a marker is left in PLAN.md: %s' % ln[-60:])
    for f in fails:
        print('FAIL ' + f)
    nm = sum(1 for n in where if marks[n] in MOVE)
    print('check%s: %d lines acted on (%d deleted, %d copied and %s); %d markers in PLAN.md; %s' % (
        ' --final' if a.final else '', len(where), nm, len(where) - nm,
        'rewritten' if a.final else 'marked or replaced', len(left), 'pass' if not fails else '%d failures' % len(fails)))
    return 1 if fails else 0


# ---------------------------------------------------------------- pointers

ITEMS = re.compile(r'[Rr]eview-queue items? (\d+(?:(?:,\s*|,? and |,? or )\d+)*)')
ROWS = re.compile(r'\b[Rr]ows? (\d{1,4}(?:(?:,\s*|,? and |,? or | to )\d{1,4})*)\b')
ENTRY = re.compile(r'\b([FP])-(\d+)\b')
HOME = re.compile(r'(?<![-\w])PLAN, ((?:"[^"]+",? ?)+)(.*?)(?=;|$)')


def nums(s):
    out, prev, rng = [], None, False
    for tok in re.findall(r'\d+| to ', s):
        if tok == ' to ':
            rng = True
            continue
        n = int(tok)
        if rng and prev is not None and n > prev:
            out += list(range(prev + 1, n + 1))
        else:
            out.append(n)
        prev, rng = n, False
    return out


def queue_parts(lines):
    part, opened, settled = None, set(), set()
    for ln in lines:
        if ln.startswith('## '):
            m = re.match(r'## \((\w)\)', ln)
            part = m.group(1) if m else ('after' if part else None)
            continue
        m = re.match(r'(\d+)\. ', ln)
        if part in ('b', 'c') and m:
            opened.add(int(m.group(1)))
        m = re.match(r'- \*\*(?:Items? )?(\d+)[,.]', ln)
        if part == 'a' and m:
            settled.add(int(m.group(1)))
    return opened, settled


def homes(queue, plan):
    """[(queue line index, clause span, headings, words)] for each "Home: PLAN, ..." clause."""
    out = []
    for qi, ln in enumerate(queue):
        if 'PLAN, "' not in ln:
            continue
        for m in HOME.finditer(ln):
            hs = re.findall(r'"([^"]+)"', m.group(1))
            w = re.sub(r'\s*\(\d\d-\d\d: \d+\)\s*$', '', m.group(2)).strip()
            w = re.sub(r'(?:\.\.\.|…|\.)$', '', w).strip()
            out.append((qi, m.span(), hs, w))
    return out


def resolves(hs, w, lines, heads):
    if len(norm(w)) < 6:
        return None
    nw = norm(w).lower()
    for i, ln in enumerate(lines):
        if heads[i] in hs and ln.strip():
            t = norm(strip_item(MARK_RE.sub('', ln))).lower()
            if t.startswith(nw):
                return i
    return None


def pointers(where):
    if not a.base:
        sys.exit('plan-consolidate: pointers needs --base')
    plan = read(D + 'PLAN.md')
    plan_b = show(D + 'PLAN.md', a.base)
    queue = read(D + 'review-queue.md')
    queue_b = show(D + 'review-queue.md', a.base)
    opened, settled = queue_parts(queue)
    status = {}
    r = subprocess.run(['python3', os.path.join(ROOT, D + 'tools/ledger.py'), 'heads'], capture_output=True, text=True, cwd=ROOT)
    for ln in r.stdout.split('\n'):
        p = ln.split('\t')
        if len(p) > 1 and p[0].isdigit():
            status[int(p[0])] = p[1]
    ids = set()
    for rel in ('FACTS.md', 'POSITIONS.md'):
        for ln in read(D + rel):
            m = re.match(r'- (?:\*\*)?([FP]-\d+)\b', ln)
            if m:
                ids.add(m.group(1))
    new = collections.Counter(plan) - collections.Counter(plan_b)
    fails, looks = [], []
    fresh = [l for l in plan if new[l] > 0 and l.strip() and not l.startswith('#') and not MARK_RE.search(l)]
    for ln in fresh:
        short = MARK_RE.sub('', ln).strip()[:90]
        for m in ITEMS.finditer(ln):
            for n in nums(m.group(1)):
                if n not in opened and n not in settled:
                    fails.append('review-queue item %d is in no part of the queue: %s' % (n, short))
                elif n not in opened:
                    looks.append('review-queue item %d is settled, in (a): %s' % (n, short))
        for m in ROWS.finditer(ln):
            for n in nums(m.group(1)):
                if n not in status:
                    fails.append('row %d is not in the ledger: %s' % (n, short))
                elif status[n] in ('FIXED', 'DUPLICATE', 'RETIRED'):
                    looks.append('row %d is %s: %s' % (n, status[n], short))
        for m in ENTRY.finditer(ln):
            e = '%s-%s' % m.groups()
            if e not in ids:
                fails.append('%s is not an entry of FACTS.md or POSITIONS.md: %s' % (e, short))
        looks.append('new line, %d characters: %s' % (len(MARK_RE.sub('', ln)), short))
    heads_b, heads_1 = headings(plan_b), headings(plan)
    moved = {plan0[n - 1]: (n, marks[n]) for n in where if marks[n] in MOVE}
    rewrites = {}
    for qi, span, hs, w in homes(queue, plan):
        ib = resolves(hs, w, plan_b, heads_b)
        if ib is None or resolves(hs, w, plan, heads_1) is not None:
            continue
        hit = moved.get(plan_b[ib])
        where_s = 'review-queue.md:%d, %s' % (qi + 1, queue[qi][span[0]:span[1]][:110])
        if hit and len(hs) == 1:
            new_clause = 'PLAN-history, "%s", under "%s", %s' % (SECTION[3:], hs[0], queue[qi][span[0]:span[1]].split('", ', 1)[1])
            rewrites.setdefault(qi, []).append((span, new_clause))
            fails.append('%s: its line (%d, %s) moved; repoint to: %s' % (where_s, hit[0], hit[1], new_clause[:140]))
        else:
            fails.append('%s: it found PLAN.md:%d at %s and finds no line now%s' % (
                where_s, ib + 1, a.base, ' (moved, line %d, %s)' % hit if hit else ''))
    for l in looks:
        print('LOOK ' + l)
    for f in fails:
        print('FAIL ' + f)
    if a.write and rewrites:
        for qi, rs in rewrites.items():
            ln = queue[qi]
            for (s, e), c in sorted(rs, reverse=True):
                ln = ln[:s] + c + ln[e:]
            queue[qi] = ln
        write(D + 'review-queue.md', queue)
        print('pointers: %d clauses repointed in review-queue.md' % sum(len(r) for r in rewrites.values()))
        return pointers_again(where)
    print('pointers: %d new lines (a marked line is not new); %d LOOK lines; %s' % (
        len(fresh), len(looks), 'pass' if not fails else '%d failures' % len(fails)))
    return 1 if fails else 0


def pointers_again(where):
    a.write = False
    return pointers(where)


def fill():
    plan = read(D + 'PLAN.md')
    new, fails, looks = {}, [], []
    for f in a.lines:
        with open(f, encoding='utf-8') as fh:
            ls = fh.read().split('\n')
        i = 0
        while i < len(ls):
            m = re.match(r'@(\d+)\s*$', ls[i])
            if m:
                if i + 1 >= len(ls):
                    fails.append('%s: @%s has no line after it' % (f, m.group(1)))
                    break
                n = int(m.group(1))
                if n in new:
                    fails.append('%s: @%d is written twice' % (f, n))
                new[n] = ls[i + 1]
                i += 2
            elif ls[i].strip():
                fails.append('%s: a line outside an @N entry: %s' % (f, ls[i][:80]))
                i += 1
            else:
                i += 1
    seen, out, dropped = set(), [], False
    for ln in plan:
        m = MARK_RE.search(ln)
        if m and int(m.group(2)) in new:
            n, mk = int(m.group(2)), m.group(1)
            seen.add(n)
            old = MARK_RE.sub('', ln)
            nl = new[n]
            if not nl.strip():
                print('fill: %s %d dropped' % (mk, n))
                dropped = True
                continue
            form = lambda x: re.match(r'\s*(?:- |\d+\. )?', x).group(0)
            if form(old) != form(nl):
                looks.append('%s %d: the new line opens "%s" where the old opened "%s"' % (mk, n, form(nl), form(old)))
            if mk == 'H' and len(nl) > 300:
                looks.append('H %d: %d characters, past the cut form\'s 300' % (n, len(nl)))
            print('fill: %s %d, %d characters (was %d): %s' % (mk, n, len(nl), len(old), nl.strip()[:90]))
            out.append(nl)
            dropped = False
            continue
        if dropped and not ln.strip() and out and not out[-1].strip():
            dropped = False
            continue
        dropped = False
        out.append(ln)
    for n in sorted(set(new) - seen):
        fails.append('@%d has no marked line in PLAN.md' % n)
    left = [MARK_RE.search(ln).group(0).strip() for ln in out if MARK_RE.search(ln)]
    for l in looks:
        print('LOOK ' + l)
    for f in fails:
        print('FAIL ' + f)
    if fails:
        print('fill: nothing written')
        return 1
    write(D + 'PLAN.md', out)
    print('fill: %d lines replaced or dropped; %d markers left: %s' % (len(seen), len(left), ', '.join(left) or 'none'))
    return 0


if a.mode == 'fill':
    sys.exit(fill())
if a.mode == 'check':
    # After apply the moved lines are gone from PLAN.md: check them from the marks.
    sys.exit(check({n: None for n in acted}))
if a.mode == 'pointers':
    sys.exit(pointers({n: None for n in acted}))
plan = read(D + 'PLAN.md')
where, bad = locate(plan, headings(plan))
if a.mode == 'dry-run':
    for n in sorted(where):
        mk = marks[n]
        verb = {'M': 'MOVE', 'D': 'MOVE', 'W': 'REPLACE'}.get(mk, 'COPY+MARK')
        print('%-9s %s %3d  PLAN.md:%-3d %5d  [%s] %s' % (verb, mk, n, where[n] + 1, chars(plan0[n - 1]), head0[n - 1][:40], plan0[n - 1].strip()[:90]))
    summary(where, bad)
    sys.exit(1 if bad else 0)
if a.mode == 'apply':
    if bad:
        summary(where, bad)
        sys.exit('plan-consolidate: %d lines cannot be acted on; nothing written' % len(bad))
    apply(where)
    sys.exit(0)
