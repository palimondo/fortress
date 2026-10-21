#!/usr/bin/env python3
"""comments.py: his saved page comments that bear on an entry of POSITIONS.md.

    python3 -I comments.py 66            (or P-66)

He also comments on pages, and those comments are not in the transcripts. They are saved as
explorations/coordinator/positions-audit/evidence/curator-comments-*.md: a section per thread,
headed "## On <what it was anchored to>", with one bullet per comment, "- HH:MM: "words"".
A section counts when its heading, or a comment counts when its own words, either
  - name the entry's number, also as dictated: P-66, P66, PE66, P 66 (not P-660), or
  - quote its title: a quoted run ("..." or curly quotes) of at least three content words, at
    least 60 % of which are words of the entry's bold title (case, possessives and punctuation
    ignored).
A section that counts is printed whole, with its heading; a comment that counts in another
section is printed with that section's heading. Each with its file and line.
"""
import glob
import os
import re
import sys

REPO = '/home/user/fortress'
GLOB = REPO + '/explorations/coordinator/positions-audit/evidence/curator-comments-*.md'
POS = REPO + '/explorations/coordinator/POSITIONS.md'
QUOTE = re.compile(r'"([^"\n]{8,})"|“([^”\n]{8,})”')
STOP = set('''a an the and or of to in on at by for with from as is are was be it its that this
these those he his him we our not no but so if then than into onto over under about'''.split())


def cwords(s):
    s = s.lower().replace('’', "'")
    s = re.sub(r"'s\b", '', s)
    return [w for w in re.findall(r'[a-z0-9]+', s) if w not in STOP]


def title(num, at=None):
    """The entry's bold title in POSITIONS.md (at commit `at`, else the working tree), or, for an
    entry struck from it, as it last stood."""
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import homes
    homes.AT = at
    try:
        line, text, st = homes.entry_text(num)
    except KeyError:
        return None
    finally:
        homes.AT = None
    m = re.match(r'\*\*(.+?)\*\*', text)
    return m.group(1) if m else None


def why(text, num, tw):
    """Why a text bears on the entry: 'number' or 'title "quote"', or None."""
    n = int(num[2:])
    if re.search(r'(?<![\w-])P\s?E?-?\s?%d(?!\d)' % n, text, re.I):
        return 'names %s' % num
    for m in QUOTE.finditer(text):
        q = m.group(1) or m.group(2)
        qw = cwords(q)
        if len(qw) >= 3 and tw and sum(1 for w in qw if w in tw) >= 0.6 * len(qw):
            return 'quotes its title ("%s")' % (q if len(q) < 90 else q[:87] + '...')
    return None


def find(num, at=None):
    """[(path, heading line, heading, [(line, comment)], reason)]; the title read at commit `at`."""
    t = title(num, at)
    tw = set(cwords(t)) if t else set()
    out = []
    for path in sorted(glob.glob(GLOB)):
        lines = open(path).read().split('\n')
        secs, cur = [], None
        for k, l in enumerate(lines, 1):
            if l.startswith('## '):
                cur = [k, l[3:].strip(), []]
                secs.append(cur)
            elif cur and l.startswith('- '):
                cur[2].append([k, l[2:].strip()])
            elif cur and cur[2] and l.strip() and l.startswith((' ', '\t')):
                cur[2][-1][1] += ' ' + l.strip()
        rel = os.path.relpath(path, REPO)
        for k, head, cs in secs:
            r = why(head, num, tw)
            if r:
                out.append((rel, k, head, cs, 'the thread ' + r))
                continue
            hit = [(j, c) for j, c in cs if why(c, num, tw)]
            if hit:
                out.append((rel, k, head, hit, 'the comment ' + why(hit[0][1], num, tw)))
    return out


def print_comments(num, out=sys.stdout, at=None):
    num = num if str(num).startswith('P-') else 'P-%s' % num
    p = lambda *a: print(*a, file=out)
    hits = find(num, at)
    files = sorted(glob.glob(GLOB))
    p('His saved page comments on %s: %d thread(s), in %d file(s) of comments (%s)' % (
        num, len(hits), len(files), ', '.join(os.path.basename(f) for f in files) or 'none saved'))
    for rel, k, head, cs, r in hits:
        p()
        p('-- %s:%d  ## %s  (%s)' % (rel, k, head, r))
        for j, c in cs:
            p('%s:%d: %s' % (rel, j, c))
    return hits


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    print_comments(argv[0])
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
