#!/usr/bin/env python3
"""quote.py: does the curator's message at a UTC time hold a quote word for word?

    python3 -I quote.py "QUOTE" 2026-09-26T10:21:32Z
    python3 -I quote.py "QUOTE" 2026-09-26T10:21        a prefix: every message of his in that minute

The time is a prefix of his message's timestamp, as show.py takes it (a trailing Z is dropped).
For each message of his at that time it prints one verdict:
  EXACT        the quote is a substring of the message as stored
  NORMALISED   a substring once both have every run of whitespace made one space, ends trimmed,
               and the curly apostrophe U+2019 made a straight one (nothing else is changed)
  NO MATCH     neither; it then prints the longest run of the quote's words that the
               message holds word for word (after the same normalising), for a reader to judge
With the match it prints the message's text around it.
"""
import difflib
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib  # noqa: E402


def normalise(s):
    return re.sub(r'\s+', ' ', s.replace('’', "'")).strip()


def check(text, quote):
    if quote in text:
        i = text.index(quote)
        return 'EXACT', text[max(0, i - 80):i + len(quote) + 80]
    nt, nq = normalise(text), normalise(quote)
    if nq and nq in nt:
        i = nt.index(nq)
        return 'NORMALISED', nt[max(0, i - 80):i + len(nq) + 80]
    a, b = nq.split(), nt.split()
    m = difflib.SequenceMatcher(None, a, b, autojunk=False).find_longest_match(0, len(a), 0, len(b))
    return 'NO MATCH', '%d of the quote\'s %d words match in one run: "%s"' % (m.size, len(a), ' '.join(a[m.a:m.a + m.size]))


def main(argv):
    if len(argv) < 2 or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    quote, t = argv[0], argv[1].strip().replace(' ', 'T').rstrip('Z')
    msgs = [m for m in tlib.show.load() if m['ts'].startswith(t)]
    if not msgs:
        print('NO MESSAGE of his at %s' % argv[1])
        return 2
    rc = 1
    for m in msgs:
        v, ctx = check(m['text'], quote)
        print('%s  his message %s (source=%s, %d characters)' % (v, m['ts'], m['source'], len(m['text'])))
        print('   ' + ctx.replace('\n', '\n   '))
        if v != 'NO MATCH':
            rc = 0
    return rc


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
