#!/usr/bin/env python3
"""cut-findings.py SRC OUT CHUNK P-N ...: write a chunk's findings.md for the clarity workflow.

SRC is a findings list in the form of explorations/reviews/foundations/evidence/salvage-findings.md:
a header comment, a note on its sources, then one paragraph per finding, each opening `**P-N**`.
OUT gets a one-line header comment, the source's note word for word, then, for each entry named,
in the order named, every paragraph that opens `**P-N**`, word for word, in the source's order.
It exits 1 if an entry has no paragraph, and checks that each paragraph it writes occurs in SRC.

    python3 -I cut-findings.py SRC c1/findings.md c1 P-7 P-26
"""
import re, sys

src, out, chunk, entries = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4:]
text = open(src).read()
paras = [p for p in re.split(r'\n\s*\n', text.strip('\n')) if p.strip()]
first = next(i for i, p in enumerate(paras) if p.startswith('**P-'))
note = [p for p in paras[:first] if not p.lstrip().startswith('<!--')]
lead = lambda p: (re.match(r'\*\*(P-\d+)\*\*', p) or [None, None])[1]
blocks, missing = [], []
for e in entries:
    mine = [p for p in paras[first:] if lead(p) == e]
    if not mine:
        missing.append(e)
    blocks += mine
if missing:
    sys.exit('no finding for: ' + ', '.join(missing))
for p in note + blocks:
    assert p in text, p[:60]
head = ('<!-- The findings of a review on the entries of chunk %s, cut word for word from %s by '
        'cut-findings.py, after the source\'s note on its sources. -->' % (chunk, src.split('/fortress/')[-1]))
open(out, 'w').write('\n\n'.join([head] + note + blocks) + '\n')
print('%s: %d entries, %d paragraphs' % (out, len(entries), len(blocks)))
