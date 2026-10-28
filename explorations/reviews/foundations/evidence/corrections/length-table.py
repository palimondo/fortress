#!/usr/bin/env python3
"""length-table.py OLD NEW P-N ...: each entry's length in characters in two POSITIONS.md files, and the change.

    python3 -I length-table.py /home/user/fortress/explorations/coordinator/POSITIONS.md \
        /home/user/record-test-q/explorations/coordinator/POSITIONS.md P-7 P-26
"""
import re, sys

def lengths(path):
    return {m.group(1): len(l.rstrip('\n')) for l in open(path) for m in [re.match(r'- (P-\d+) ', l)] if m}

old, new = lengths(sys.argv[1]), lengths(sys.argv[2])
total = [0, 0]
for e in sys.argv[3:]:
    a, b = old.get(e), new.get(e)
    print('%-6s old %5s  new %5s  %s' % (e, a, b, '%+d' % (b - a) if a and b else 'missing'))
    total[0] += a or 0; total[1] += b or 0
print('all    old %5d  new %5d  %+d' % (total[0], total[1], total[1] - total[0]))
