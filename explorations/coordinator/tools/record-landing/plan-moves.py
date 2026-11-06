#!/usr/bin/env python3
"""plan-moves.py --root WT --base AT [--stale-at REV]: check that every line taken out of PLAN.md went to PLAN-history.md word for word, and list the PLAN lines that look stale.

A line taken out is a line of PLAN.md at AT, the commit that the worktree WT was made at, that the working
PLAN.md no longer holds, as a whole line: a line moved, cut to a pointer, or changed. Each must stand among
the lines that the working PLAN-history.md gained since AT, as many times as it went. PLAN-history.md only
gains: a line that it lost is a failure too. Blank lines are not counted. Prints the counts, the headings
that PLAN-history.md gained, and each failure; exit 1 on any.

Then, for information only (they never fail), the PLAN lines to look at, one `LOOK` line each with its
reason, read against the working review queue and the history of AT:
  settled   a list line whose own pointer, a sentence "Review-queue item 296.", names items that are each
            settled in the queue's part (a), and that names no item open in (b) or (c); it skips a line that
            already carries a cleanup's mark, "closed at the cleanup of DATE" in any of the queue cleanup's
            forms ("(closed at the cleanup of 2026-11-05: learning)", "item 127, closed at the cleanup of
            2026-11-05: settled", "are closed at the cleanup of 2026-11-05 (learning)"): the cleanup marked
            it in place, and moving it out of PLAN is PLAN's consolidation, not a landing's change
  list      a list line that names three or more items, some of them settled; or one that ties its items
            to a list of the queue's head (the queue's "Needed before the switch-over") and does not name
            the same items
  finding   a line `- Climb batch N's review, finding M ...` whose finding a commit in the history of AT
            names (`batch-N-review.md, finding M`, or "climb batch N's finding M"), where that commit
            changes a file outside the record: a half of the line may be built
With --stale-at REV, it reads PLAN.md and the review queue at REV, and the history of REV, prints only the
LOOK lines, and exits 0: evidence.py gives them to the sorter in plan.md.
"""
import argparse
import collections
import os
import re
import subprocess
import sys

ap = argparse.ArgumentParser()
ap.add_argument('--root', required=True)
ap.add_argument('--base', required=True)
ap.add_argument('--stale-at')
a = ap.parse_args()
D = 'explorations/coordinator/'


def at(rel, rev=None):
    rev = rev or a.base
    r = subprocess.run(['git', '-C', a.root, 'show', '%s:%s' % (rev, D + rel)], capture_output=True, text=True)
    if r.returncode:
        sys.exit('plan-moves.py: no %s at %s' % (rel, rev))
    return r.stdout.split('\n')


def now(rel):
    with open(os.path.join(a.root, D + rel), encoding='utf-8') as f:
        return f.read().split('\n')


# ---------------------------------------------------------------- the PLAN lines to look at

ITEMS = re.compile(r'[Rr]eview-queue items? (\d+(?:(?:,\s*|,? and |,? or )\d+)*)')
OWN = re.compile(r'(?:^\s*- |[.;]\s+)Review-queue items? (\d+(?:(?:,\s*|,? and |,? or )\d+)*)')
CLEANUP_MARK = re.compile(r'\bclosed at the cleanup of \d{4}-\d{2}-\d{2}\b')
HEAD_LIST = re.compile(r'\*\*([^*]+?):\*\*\s*(\d[\d,\s]*)')
FINDING_LINE = re.compile(r"\s*- [Cc]limb batch (\w+)'s review, finding (\d+)\b")
RECORD = re.compile(r'explorations/(coordinator/(PLAN|PLAN-history|review-queue|INDEX|FACTS|POSITIONS|FACTS-history|POSITIONS-history|BOOT|HELD)\.md$|reviews/|fortress-gap-ledger)')


def queue_sets(lines):
    """(open, settled, heads): the item numbers open in (b) and (c), those settled in (a) and open nowhere,
    and each list of the queue's head that names its items by number, {label in lower case: numbers}."""
    part, opened, settled, heads = None, set(), set(), {}
    for ln in lines:
        if ln.startswith('## '):
            m = re.match(r'## \((\w)\)', ln)
            part = m.group(1) if m else ('after' if part else None)
            continue
        if part in ('b', 'c'):
            m = re.match(r'(\d+)\. ', ln)
            if m:
                opened.add(int(m.group(1)))
        elif part == 'a':
            m = re.match(r'- \*\*(?:Items? )?(\d+)[,.]', ln)
            if m:
                settled.add(int(m.group(1)))
        elif part is None:
            for m in HEAD_LIST.finditer(ln):
                heads[m.group(1).strip().lower()] = {int(x) for x in re.findall(r'\d+', m.group(2))}
    return opened, settled - opened, heads


def findings_built(rev):
    """{(batch, finding): [(hash, subject)]}: the review findings that a commit in rev's history names,
    for each commit that changes a file outside the record."""
    r = subprocess.run(['git', '-C', a.root, 'log', '--format=%x00%h%x01%s%x01%B%x01', '--name-only', rev],
                       capture_output=True, text=True)
    out = collections.defaultdict(list)
    for chunk in r.stdout.split('\x00')[1:]:
        h, s, body, files = chunk.split('\x01', 3)
        if not [f for f in files.split('\n') if f.strip() and not RECORD.match(f.strip())]:
            continue
        msg = s + '\n' + body
        named = set()
        for m in re.finditer(r'batch-(\w+)-review\.md,? findings? (\d+(?:(?:,\s*|,? and )\d+)*)', msg):
            named.update((m.group(1).lower(), int(n)) for n in re.findall(r'\d+', m.group(2)))
        for m in re.finditer(r"[Cc]limb batch (\w+)'s (?:review, |post-batch review, )?findings? (\d+(?:(?:,\s*|,? and )\d+)*)", msg):
            named.update((m.group(1).lower(), int(n)) for n in re.findall(r'\d+', m.group(2)))
        for k in named:
            out[k].append((h, s))
    return out


def stale(plan, queue, rev):
    """The LOOK lines of PLAN's lines against the queue and the history of rev."""
    opened, settled, heads = queue_sets(queue)
    built = findings_built(rev)
    out, h2, h3 = [], None, None
    for i, ln in enumerate(plan, 1):
        if ln.startswith('## '):
            h2, h3 = ln[3:].strip(), None
            continue
        if ln.startswith('### '):
            h3 = ln[4:].strip()
            continue
        if not ln.lstrip().startswith('- '):
            continue
        why = []
        nums = []
        for m in ITEMS.finditer(ln):
            nums += [int(x) for x in re.findall(r'\d+', m.group(1))]
        own = [int(x) for m in OWN.finditer(ln) for x in re.findall(r'\d+', m.group(1))]
        s = sorted({n for n in nums if n in settled})
        marked = bool(CLEANUP_MARK.search(ln))
        if own and all(n in settled for n in own) and not any(n in opened for n in nums):
            if not marked:
                why.append('settled: its own review-queue item is in (a): %s' % ', '.join(map(str, sorted(set(own)))))
        elif s and len(set(nums)) >= 3:
            why.append('list: it names items in (a) among open ones: %s' % ', '.join(map(str, s)))
        q = re.search(r"the queue's \"([^\"]+)\"", ln)
        if q and q.group(1).strip().lower() in heads:
            want, got = heads[q.group(1).strip().lower()], set(nums)
            if want != got:
                diff = (['it names %s, which the queue\'s list does not' % ', '.join(map(str, sorted(got - want)))] if got - want else []) + \
                       (['it lacks %s, which the queue\'s list holds' % ', '.join(map(str, sorted(want - got)))] if want - got else [])
                why.append('list: against the queue\'s "%s", %s' % (q.group(1), ', and '.join(diff)))
        f = FINDING_LINE.match(ln)
        if f and (f.group(1).lower(), int(f.group(2))) in built:
            cs = built[(f.group(1).lower(), int(f.group(2)))]
            why.append('finding: %s names this finding: %s' % ('a commit' if len(cs) == 1 else '%d commits' % len(cs),
                                                               '; '.join('%s "%s"' % (h, sub[:90]) for h, sub in cs[:3])))
        if why:
            out.append('LOOK PLAN.md:%d, under "%s": %s. The line: %s' % (i, h3 or h2, '; '.join(why), ln.strip()[:160]))
    return out


if a.stale_at:
    looks = stale(at('PLAN.md', a.stale_at), at('review-queue.md', a.stale_at), a.stale_at)
    print('\n'.join(looks) if looks else 'None.')
    sys.exit(0)

# ---------------------------------------------------------------- the moves, word for word

plan0, plan1 = at('PLAN.md'), now('PLAN.md')
hist0, hist1 = collections.Counter(at('PLAN-history.md')), collections.Counter(now('PLAN-history.md'))
out = [l for l in (collections.Counter(plan0) - collections.Counter(plan1)).elements() if l.strip()]
gained = hist1 - hist0
lost = [l for l in (hist0 - hist1).elements() if l.strip()]
first = {}
for i, l in enumerate(plan0, 1):
    first.setdefault(l, i)
missing = []
for l in out:
    if gained[l] > 0:
        gained[l] -= 1
    else:
        missing.append(l)
heads = [l for l in (hist1 - hist0).elements() if l.startswith('#')]
print('plan-moves: %d lines taken out of PLAN.md; PLAN-history.md gained %d lines, under %d headings' % (
    len(out), sum(1 for l in (hist1 - hist0).elements() if l.strip()), len(heads)))
for h in heads:
    print('  gained heading: %s' % h)
for l in missing:
    print('FAIL not in PLAN-history.md word for word: PLAN.md:%d at %s: %s' % (first.get(l, 0), a.base, l[:160]))
for l in lost:
    print('FAIL PLAN-history.md lost a line: %s' % l[:160])
looks = stale(plan1, now('review-queue.md'), a.base)
for l in looks:
    print(l)
print('plan-moves: %s; %d PLAN lines to look at' % ('pass' if not missing and not lost else '%d failures' % (len(missing) + len(lost)), len(looks)))
sys.exit(1 if missing or lost else 0)
