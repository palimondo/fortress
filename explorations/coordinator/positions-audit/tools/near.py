#!/usr/bin/env python3
"""near.py: the curator's messages in a window before a UTC time, each with the coordinating
session's last text before it, which is what he answered.

    python3 -I near.py 2026-09-26T10:22:23Z            window 60 minutes before the time
    python3 -I near.py 2026-09-26T10:22:23Z 15m        or 2h, 1d
    python3 -I near.py 2026-09-26T10:22:23Z 15m --cut 2000
                                                        cut each printed text at 2000 characters
                                                        (his and the coordinator's), saying so

For each message of his: its time, source (main, s1, queued: see show.py), session, length and
full text; then the coordinator's last text in the same session before it: its time, the file and
line it was read from (the first copy, when a resumed transcript replays it) and its text.
A queued message (sent while an agent was busy) is matched by the time he sent it.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib  # noqa: E402


def cut(s, n):
    if not n or len(s) <= n:
        return s
    return s[:n] + '\n[... cut: %d more characters]' % (len(s) - n)


def print_near(talk, t, minutes, n=0, out=sys.stdout):
    t = tlib.parse_time(t)
    start, end = tlib.window(t, minutes)
    hits = talk.his(start, end)
    p = lambda *a: print(*a, file=out)
    p('His messages from %sZ to %sZ (%d minutes before %sZ): %d' % (start, end, minutes, end, len(hits)))
    for m in hits:
        p()
        p('=== HIS MESSAGE %s  source=%s  session=%s  (%d characters)' % (m['ts'], m['source'], m['sid'][:8], len(m['text'])))
        p(cut(m['text'], n))
        b, skipped = talk.before(m['sid'], m['ts'])
        p()
        if skipped:
            p('--- skipped %d later text(s) of the coordinator that answer a Stop hook, not him: %s' % (
                len(skipped), ', '.join('%s %r' % (x['ts'], x['text'][:40]) for x in skipped)))
        if b is None:
            p('--- the coordinator\'s last text before it: none found in session %s' % m['sid'][:8])
        else:
            p('--- the coordinator\'s last text before it: %s  (%d characters)  %s' % (b['ts'], len(b['text']), b['where']))
            p(cut(b['text'], n))
    return hits


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    n = 0
    if '--cut' in argv:
        k = argv.index('--cut')
        n = int(argv[k + 1])
        argv = argv[:k] + argv[k + 2:]
    minutes = tlib.parse_window(argv[1]) if len(argv) > 1 else 60
    talk = tlib.Talk()
    print_near(talk, argv[0], minutes, n)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
