#!/usr/bin/env python3
"""hischeck.py: check the block of his quotes that a scout's or reader's report ends with.

    python3 -I hischeck.py FILE...

Each FILE holds a block headed "## His quotes" (to the next "## " heading or the end), one line
per quote of his:
    HIS 2026-09-26T10:21:32.097Z | Run Fable judgement as well.
(a line may be wrapped in backticks or start with "- "). The time is a prefix of his message's
timestamp, as show.py takes it (a trailing Z dropped); each message of his at that time is tried,
and the quote is checked as quote.py does:
  EXACT        a substring of the message as stored
  NORMALISED   a substring once whitespace is collapsed and U+2019 made a straight apostrophe
  NO MATCH     neither, in every message at that time (quote.py "QUOTE" TIME shows the nearest run)
  NO MESSAGE   no message of his at that time
Lines of the block that start with HIS but do not parse are counted as BAD FORM. Prints, per
file, the counts and every line that is not EXACT or NORMALISED, with its line number; exits 1
when any line fails or a file has no block.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib  # noqa: E402
import quote  # noqa: E402

LINE = re.compile(r'^\s*(?:-\s+)?`?HIS (\S+) \| (.*?)`?\s*$')


def block(text):
    """[(line number, line)] of the "## His quotes" block, or None when there is none."""
    lines = text.split('\n')
    for k, l in enumerate(lines):
        if l.strip().lower() == '## his quotes':
            out = []
            for j in range(k + 1, len(lines)):
                if lines[j].startswith('## '):
                    break
                out.append((j + 1, lines[j]))
            return out
    return None


def check_file(path, msgs, out=sys.stdout):
    p = lambda *a: print(*a, file=out)
    b = block(open(path, errors='replace').read())
    if b is None:
        p('%s: no "## His quotes" block' % path)
        return {'NO BLOCK': 1}
    counts, bad = {}, []
    for k, l in b:
        if not l.strip().lstrip('-').strip().lstrip('`').startswith('HIS '):
            continue
        m = LINE.match(l)
        if not m:
            v, t, q = 'BAD FORM', '', l.strip()
        else:
            t, q = m.group(1).rstrip('Z'), m.group(2)
            hits = [x for x in msgs if x['ts'].startswith(t)]
            v = 'NO MESSAGE' if not hits else 'NO MATCH'
            for x in hits:
                v2, _ = quote.check(x['text'], q)
                if v2 != 'NO MATCH':
                    v = v2
                    if v2 == 'EXACT':
                        break
        counts[v] = counts.get(v, 0) + 1
        if v not in ('EXACT', 'NORMALISED'):
            bad.append((k, v, t, q))
    total = sum(counts.values())
    order = ['EXACT', 'NORMALISED', 'NO MATCH', 'NO MESSAGE', 'BAD FORM']
    p('%s: %d quote line(s): %s' % (path, total, ', '.join('%s %d' % (o, counts[o]) for o in order if o in counts) or 'none'))
    for k, v, t, q in bad:
        p('   :%d  %s  %s | %s' % (k, v, t, q))
    return counts


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    msgs = tlib.load_msgs()
    rc = 0
    for path in argv:
        c = check_file(path, msgs)
        if any(k not in ('EXACT', 'NORMALISED') for k in c) or not c:
            rc = 1
    return rc


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
