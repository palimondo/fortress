#!/usr/bin/env python3
"""queue-check.py --root WT --base AT: the review queue's numbers, its "Needed by" lines and its counts.

The review queue, explorations/coordinator/review-queue.md, holds numbered items in three parts: (b)
consequential and (c) routine, the open items, as `N. ...`, and (a) settled or stale, as `- **N, ...`.
Each `### Theme (K)` heading counts its items. Checks the working file against the one at AT, the commit
that the worktree WT was made at:
  numbers   each item number at AT is still in the file; the new numbers follow the last one at AT, one by one
  needed    each open item that is new, or that moved into (b) or (c), has a "Needed by:" line
  sections  each theme heading's count equals the items under it
  head      the head's "**Counts**, N open items ..." line equals the open, consequential and routine items, and the lines
            under it, one per kind of need, add up to it
  answered  each item new in (a)'s "Answered by a decision of his", filed there or moved there since AT, cites his
            word on that same item: a POSITIONS entry, a time or an answer of his, and before its "Home:" no default
            taken without him ("at its default", "by the coordinator", "the coordinator's call") and no word of his
            on another item ("on item 310"). A default that the coordinator or a batch took leaves the item open in
            (b) or (c), landed and then reviewed (the coordinator skill, "The curator's role and decisions", way 2).
Prints each failure and one line per check; exit 1 on any failure.
"""
import argparse
import os
import re
import subprocess
import sys

ap = argparse.ArgumentParser()
ap.add_argument('--root', required=True)
ap.add_argument('--base', required=True)
a = ap.parse_args()
REL = 'explorations/coordinator/review-queue.md'
ANSWERED = '### Answered by a decision of his'
DEFAULT = re.compile(r"\b(?:at (?:its|the|their) defaults?|by the coordinator|the coordinator's (?:call|answer|default))\b", re.I)
HIS = re.compile(r"\bP-\d+\b|\bUTC\b|\bhis (?:answer|yes|no|go|word|words|rule|decision|choice|reply)\b", re.I)


def parse(text):
    """(items {num: (part, theme, text)}, sections [(part, theme, count, items)], lines)"""
    items, sections, part, sec, cur = {}, [], None, None, None
    lines = text.split('\n')
    for ln in lines:
        m = re.match(r'## \((\w)\)', ln)
        if m or ln.startswith('## '):
            part, sec, cur = (m.group(1) if m else None), None, None
            continue
        m = re.match(r'### (.*) \((\d+)\)\s*$', ln)
        if m:
            sec = [part, m.group(1), int(m.group(2)), 0]
            sections.append(sec)
            cur = None
            continue
        if ln.startswith('### '):
            sec, cur = None, None
            continue
        start = re.match(r'(\d+)\. ', ln) or re.match(r'- \*\*(\d+)?', ln)
        if sec and start:
            sec[3] += 1
            cur = None
            if start.group(1):
                cur = int(start.group(1))
                items[cur] = [part, sec[1], ln]
        elif cur is not None and ln.startswith('   '):
            items[cur][2] += '\n' + ln
        elif cur is not None and ln.strip():
            cur = None
    return items, sections, lines


def answered(text):
    """{key: text} of the items under (a)'s "Answered by a decision of his"; the key is the item's number, or its bold title."""
    out, inside, key = {}, False, None
    for ln in text.split('\n'):
        if ln.startswith('#'):
            inside, key = ln.startswith(ANSWERED), None
            continue
        if not inside:
            continue
        m = re.match(r'- \*\*(?:Items? )?(\d+)[,.]', ln) or re.match(r'- \*\*(.+?)\*\*', ln)
        if m:
            key = int(m.group(1)) if m.group(1).isdigit() else m.group(1)
            out[key] = ln
        elif key is not None and ln.startswith('  '):
            out[key] += '\n' + ln
        elif ln.strip():
            key = None
    return out


r = subprocess.run(['git', '-C', a.root, 'show', '%s:%s' % (a.base, REL)], capture_output=True, text=True)
if r.returncode:
    sys.exit('queue-check.py: no %s at %s' % (REL, a.base))
old, _, _ = parse(r.stdout)
old_answered = answered(r.stdout)
with open(os.path.join(a.root, REL), encoding='utf-8') as f:
    text_now = f.read()
new, sections, lines = parse(text_now)
fails = {'numbers': [], 'needed': [], 'sections': [], 'head': [], 'answered': []}
for n in sorted(set(old) - set(new)):
    fails['numbers'].append('item %d is gone' % n)
added = sorted(set(new) - set(old))
top = max(old) if old else 0
if added != list(range(top + 1, top + 1 + len(added))):
    fails['numbers'].append('the new numbers %s do not follow %d one by one' % (', '.join(map(str, added)), top))
for n in sorted(new):
    part, theme, text = new[n]
    opened = n in added or (old.get(n, [None])[0] not in ('b', 'c'))
    if part in ('b', 'c') and opened and not re.search(r'^\s*- Needed by:', text, re.M):
        fails['needed'].append('item %d (%s, "%s") has no "Needed by:" line' % (n, part, theme))
for part, theme, count, got in sections:
    if count != got:
        fails['sections'].append('"%s" (%s) counts %d and holds %d' % (theme, part, count, got))
n_b = sum(g for p, t, c, g in sections if p == 'b')
n_c = sum(g for p, t, c, g in sections if p == 'c')
head = [i for i, l in enumerate(lines) if l.startswith('**Counts**') and 'open items' in l]
if len(head) != 1:
    fails['head'].append('%d "**Counts**, N open items" lines' % len(head))
else:
    m = re.search(r'(\d+) open items, (\d+) consequential and (\d+) routine', lines[head[0]])
    if not m or tuple(map(int, m.groups())) != (n_b + n_c, n_b, n_c):
        fails['head'].append('the head says "%s"; the parts hold %d open, %d consequential and %d routine' % (
            m.group(0) if m else lines[head[0]][:80], n_b + n_c, n_b, n_c))
    sums = [0, 0, 0]
    for l in lines[head[0] + 1:]:
        k = re.match(r'- .*: (\d+) \((\d+) consequential, (\d+) routine\)', l)
        if not k:
            break
        sums = [x + int(y) for x, y in zip(sums, k.groups())]
    if sums != [n_b + n_c, n_b, n_c]:
        fails['head'].append('the lines under it add up to %d (%d consequential, %d routine)' % tuple(sums))
for k, text in answered(text_now).items():
    if k in old_answered:
        continue
    body = text.split('Home:')[0]
    why = ['it names a default taken without him ("%s")' % '", "'.join(sorted(set(m.lower() for m in DEFAULT.findall(body))))] if DEFAULT.search(body) else []
    other = sorted({int(n) for n in re.findall(r'\bon item (\d+)', body)} - {k}) if isinstance(k, int) else []
    if other:
        why.append('it cites his word on item %s, not on item %d' % (', '.join(map(str, other)), k))
    if not HIS.search(body):
        why.append('it cites no word of his: no POSITIONS entry, time or answer of his')
    if why:
        fails['answered'].append('item %s, new in "Answered by a decision of his": %s; it stays open in (b) or (c), with its default as landed' % (
            k if isinstance(k, int) else '"%s"' % k[:60], '; '.join(why)))
for k, v in fails.items():
    for x in v:
        print('FAIL %s: %s' % (k, x))
print('queue-check: %d items, %d new (%s); open %d, consequential %d, routine %d; %s' % (
    len(new), len(added), ', '.join(map(str, added)) or 'none', n_b + n_c, n_b, n_c,
    'pass' if not any(fails.values()) else '%d failures' % sum(map(len, fails.values()))))
sys.exit(1 if any(fails.values()) else 0)
