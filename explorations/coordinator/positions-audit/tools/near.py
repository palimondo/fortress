#!/usr/bin/env python3
"""near.py: the curator's messages in a window before a UTC time, each with the coordinating
session's message that it answered, found along the transcript's reply chain.

    python3 -I near.py 2026-09-26T10:22:23Z            window 60 minutes before the time
    python3 -I near.py 2026-09-26T10:22:23Z 15m        or 2h, 1d
    python3 -I near.py 2026-09-26T10:22:23Z 15m --cut 2000
                                                        cut each printed text at 2000 characters
                                                        (his and the coordinator's), saying so;
                                                        by default every text is printed whole

For each message of his: its time, source (main, s1, queued: see show.py), session, length and
full text. Then the message he answered: the coordinator's turn that his message follows on the
reply chain (tlib.py says how the chain is read), every text of that turn whole, each with its
time and the file and line it was read from (the first copy, when a resumed transcript replays
it). Before it, one line for each turn the chain passed over as not addressed to him (replies to
Stop-hook feedback, to an agent's message or hand-back, to a task notification or check-in, to a
system reminder), and for each text written after he sent his message; a passed-over turn that
answers a notification and ends with an ask to him (a question mark, "The ask", "I recommend",
"your yes", ...) is marked, and the newest such turn printed whole, since he may have answered
it. When he quotes lines ("> ..."), the text on the chain that holds them is named, and printed
whole if it is not the answer. After it, the last lines of the three turns to him further back
on the chain, for a message that answers an older question. A queued message (sent while a turn
ran) starts at its delivery into the turn; texts written after he sent it are not taken. A
message on no chain the index holds (a queued one never delivered) falls back to the time: the
coordinator's last text before it, passing over replies to Stop-hook feedback.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib  # noqa: E402


def cut(s, n):
    if not n or len(s) <= n:
        return s
    return s[:n] + '\n[... cut: %d more characters]' % (len(s) - n)


def _short(s, n=110, end=False):
    s = re.sub(r'\s+', ' ', s).strip()
    if len(s) <= n:
        return s
    return '...' + s[-n:] if end else s[:n] + '...'


def print_answer(talk, m, n=0, out=sys.stdout, seen=None):
    """The message his message m answered. seen: a dict uuid -> his message's time, for texts
    printed already (they are named, not printed again). Returns the answer (tlib.Talk.answered)."""
    p = lambda *a: print(*a, file=out)
    a = talk.answered(m)
    if a['how'] == 'none':
        b, skipped = talk.before(m['sid'], m['ts'])
        p('--- the message he answered: his message is not on a reply chain the index holds; by time alone, '
          'the coordinator\'s last text before it%s:' % (
              ' (passing over %d replies to Stop-hook feedback)' % len(skipped) if skipped else ''))
        if b is None:
            p('    none found in session %s' % m['sid'][:8])
        else:
            p('--- text %s  %s  (%d characters)' % (b.ts, b.where, len(b.text)))
            p(cut(b.text, n))
        return a
    def whole(y, why):
        if seen is not None and y.uuid in seen:
            p('--- text %s  %s  (%d characters)%s: printed above, under his message %s' % (y.ts, y.where, len(y.text), why, seen[y.uuid]))
            return
        if seen is not None:
            seen[y.uuid] = m['ts']
        p('--- text %s  %s  (%d characters)%s' % (y.ts, y.where, len(y.text), why))
        p(cut(y.text, n))
    first_ask = next((s for s in a['skipped'] if s.get('asks')), None)
    for s in a['skipped']:
        x = s['texts']
        p('--- passed over, not to him: the turn after %s at %s, %d text(s), %d characters, %s to %s: "%s"%s' % (
            s['prompt'].label, s['prompt'].ts, len(x), sum(len(t.text) for t in x), x[0].ts, x[-1].ts,
            _short(x[0].text), ('; it ends with an ask to him, so it is printed whole: he may have answered it'
                                if s is first_ask else '; it ends with an ask to him') if s.get('asks') else ''))
        if s is first_ask:
            for y in x:
                whole(y, ', passed over but ending with an ask')
    for t in a['later']:
        p('--- written after he sent it, at %s: %s (%d characters): "%s"' % (a['sent'], t.ts, len(t.text), _short(t.text)))
    for u in a['unanswered']:
        p('--- his earlier message %s on the chain had no text after it' % u.ts)
    t = a['turn']
    if t is None:
        p('--- the message he answered: none on the chain (%s)' % (a['end'] or 'no turn to him before it'))
        return a
    x = t['texts']
    b, _ = talk.before(m['sid'], a['sent'])
    bytime = '' if b is None or b.uuid == x[-1].uuid else '; by time alone it would be %s' % b.ts
    pr = t['prompt']
    p('--- the message he answered, by the reply chain: the coordinator\'s turn after his message of %s%s, '
      '%d text(s), %d characters%s' % (pr.ts, ' (queued)' if pr.kind == 'hisq' else '', len(x),
                                       sum(len(y.text) for y in x), bytime))
    for y in x:
        whole(y, '')
    q = a.get('quoted')
    if q is not None:
        shown = {y.uuid for y in x} | {y.uuid for s in a['skipped'] if s.get('asks') for y in s['texts']}
        if q.uuid in shown:
            p('--- the lines he quotes are from the text of %s, printed above' % q.ts)
        else:
            where = 'a passed-over text' if q.uuid in {y.uuid for s in a['skipped'] for y in s['texts']} \
                else 'an earlier text on the chain'
            p('--- the lines he quotes are from %s, %s, printed whole:' % (where, q.ts))
            whole(q, ', the text he quotes')
    if a['earlier']:
        p('--- earlier turns to him on the chain, newest first (for a reply to an older question):')
        for e in a['earlier']:
            y = e['texts'][-1]
            p('    %s, after his %s: %d text(s), %d characters, %s; ends "%s"' % (
                y.ts, e['prompt'].ts, len(e['texts']), sum(len(z.text) for z in e['texts']), y.where,
                _short(y.text, 160, end=True)))
    return a


def print_message(talk, m, n=0, out=sys.stdout, seen=None):
    p = lambda *a: print(*a, file=out)
    p('=== HIS MESSAGE %s  source=%s  session=%s  (%d characters)' % (m['ts'], m['source'], m['sid'][:8], len(m['text'])))
    p(cut(m['text'], n))
    p()
    return print_answer(talk, m, n, out, seen)


def print_near(talk, t, minutes, n=0, out=sys.stdout, seen=None):
    t = tlib.parse_time(t)
    start, end = tlib.window(t, minutes)
    hits = talk.his(start, end)
    p = lambda *a: print(*a, file=out)
    p('His messages from %sZ to %sZ (%d minutes before %sZ): %d' % (start, end, minutes, end, len(hits)))
    for m in hits:
        p()
        print_message(talk, m, n, out, seen)
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
    print(tlib.LEGEND)
    print_near(talk, argv[0], minutes, n)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
