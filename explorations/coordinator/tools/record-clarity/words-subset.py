#!/usr/bin/env python3
"""words-subset.py APPLY [--allow WORD ...]: check that a scrape only deletes.

For each entry line `- F-87 ...` or `- P-48 ...` of the apply file, compare its
words with the entry as FACTS.md or POSITIONS.md holds it now: every word of the
new line must occur in the old one at least as often (case and punctuation
ignored), so that words can be deleted or reordered but none added. --allow
names words that may be added (default: none). Prints each entry that adds a
word, with the words added, and exits 1 if there is any; new entries (`F-?1`)
are reported as not allowed.
"""
import re, sys
from collections import Counter

ROOT = '/home/user/fortress/explorations/coordinator/'
args = sys.argv[1:]
allow = set()
if '--allow' in args:
    i = args.index('--allow'); allow = {w.lower() for w in args[i + 1:]}; args = args[:i]
words = lambda s: Counter(w.lower() for w in re.findall(r"[\w'`\\-]+", s))
old = {}
for f in ('FACTS.md', 'POSITIONS.md'):
    for l in open(ROOT + f):
        m = re.match(r'- ([FP]-\d+) ', l)
        if m: old[m.group(1)] = l
bad = 0; n = 0
for l in open(args[0]):
    m = re.match(r'- ([FP]-[\d?]+) ', l)
    if not m: continue
    n += 1; k = m.group(1)
    if k not in old: print(f'{k}: not an existing entry'); bad += 1; continue
    added = words(l) - words(old[k])
    added = {w: c for w, c in added.items() if w not in allow}
    if added: bad += 1; print(f'{k}: adds ' + ', '.join(f'{w}' + (f' x{c}' if c > 1 else '') for w, c in added.items()))
print(f'words-subset: {n} entries, {bad} add words')
sys.exit(1 if bad else 0)
