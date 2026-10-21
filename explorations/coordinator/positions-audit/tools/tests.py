#!/usr/bin/env python3
"""tests.py: the scripts against P-86's known answers (scout-search-study.md, section 4) and a
few hand-checked facts. Prints PASS or FAIL per check; exits 1 on any failure.

    python3 -I tests.py
"""
import io
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import plib  # noqa: E402
import tlib  # noqa: E402
import near  # noqa: E402
import quote  # noqa: E402
import sort  # noqa: E402

fails = 0


def check(name, ok, got=''):
    global fails
    print('%s  %s%s' % ('PASS' if ok else 'FAIL', name, '' if ok else '   got: %s' % got))
    if not ok:
        fails += 1


def main():
    w = plib.World()
    ev = list(reversed(plib.trail(w, 'P-86')))
    got = [(e['h'][:9], e['kind']) for e in ev]
    want = [('fbc4c4954', 'created'), ('892687076', 'changed'), ('03f215fe4', 'moved to history'),
            ('bc8902f47', 're-created'), ('a88e52bf7', 'renumbered'), ('ab933086b', 'changed')]
    check('P-86 trail: the six commits and what each did', got == want, got)
    times = [w.info(e['h'])['adate'] for e in ev]
    check('P-86 trail: UTC times', times == ['2026-09-26T10:22:23Z', '2026-09-27T03:24:33Z', '2026-09-29T21:58:48Z',
                                             '2026-09-30T05:37:17Z', '2026-10-13T18:00:39Z', '2026-10-13T19:10:15Z'], times)
    others = [e['others'] for e in ev]
    check('P-86 trail: other entries changed (study: 0, 19, 13, 134, 23, 27; bc8902f47 counted as pairs, 135)',
          others == [0, 19, 13, 135, 23, 27], others)
    bl = plib.head_blocks(w, 'P-86')
    check('P-86 blocks: :257 written by a88e52bf7, :858 by ab933086b (not by the cited fbc4c4954)',
          [(b['line'], b['writer'][:9]) for b in bl] == [(257, 'a88e52bf7'), (858, 'ab933086b')],
          [(b['line'], b['writer'][:9]) for b in bl])
    m = sort.marks(w, 'P-86')
    check('P-86 sort marks: doc and bulk', 'doc' in m['marks'] and 'bulk' in m['marks'], m['marks'])
    # hand-checked trails
    ev48 = list(reversed(plib.trail(w, 'P-48')))
    check('P-48: created at dd81491fd, not linked to the PLAN item 30 entry it superseded',
          (ev48[0]['h'][:9], ev48[0]['kind']) == ('dd81491fd', 'created'), (ev48[0]['h'][:9], ev48[0]['kind']))
    ev79 = list(reversed(plib.trail(w, 'P-79')))
    check('P-79: created at dd81491fd', (ev79[0]['h'][:9], ev79[0]['kind']) == ('dd81491fd', 'created'))
    ev69 = {e['h'][:9]: e for e in plib.trail(w, 'P-69')}
    check('P-69: bc8902f47 linked by the title its comment names (a title holding ";")',
          ev69['bc8902f47'].get('link', {}).get('how') == 'title', ev69['bc8902f47'].get('link', {}).get('how'))
    ev37 = [(e['h'][:9], e['kind']) for e in reversed(plib.trail(w, 'P-37'))][:3]
    check('P-37: created, reverted, reinstated', ev37 == [('581a29510', 'created'), ('8fcca6703', 'removed'),
                                                          ('3e85b709c', 'restored')], ev37)
    # his messages
    talk = tlib.Talk()
    buf = io.StringIO()
    hits = near.print_near(talk, '2026-09-26T10:22:23Z', 10, out=buf)
    ts = [h['ts'] for h in hits]
    check('near: his 10:14:05.953 and 10:21:32.097 before fbc4c4954', ts == ['2026-09-26T10:14:05.953Z', '2026-09-26T10:21:32.097Z'], ts)
    yes = [h for h in hits if h['ts'] == '2026-09-26T10:21:32.097Z'][0]
    check('near: his "Yes." text', yes['text'] == "> The ask: take Astra's review into main and carry its checks into batch 6's briefs.\n\nYes. \n\nRun Fable judgement as well.", repr(yes['text']))
    b, skipped = talk.before(yes['sid'], yes['ts'])
    check('near: the coordinator\'s ask he answered is 10:14:55.886 (001.jsonl:6723), its Stop-hook "." skipped',
          b['ts'] == '2026-09-26T10:14:55.886Z' and b['where'].endswith('001.jsonl:6723') and len(skipped) == 1,
          (b['ts'], b['where'][-20:], len(skipped)))
    check('near: that ask ends with the recommendation', 'I recommend yes' in b['text'] and '**The ask: take Astra' in b['text'])
    q = [x for x in tlib.show.load() if x['ts'].startswith('2026-09-30T05:24:08')]
    check('near: the queued instruction of 05:24:08.253 (source queued, 2512 characters)',
          len(q) == 1 and q[0]['source'] == 'queued' and len(q[0]['text']) == 2512, [(x['ts'], x['source'], len(x['text'])) for x in q])
    # quote check
    for qt, t, want in [('Run Fable judgement as well.', '2026-09-26T10:21:32Z', 'EXACT'),
                        ('Yes.  Run Fable judgement as well.', '2026-09-26T10:21:32Z', 'NORMALISED'),
                        ("We don't have a link to those slides", '2026-08-18T23:33:18Z', 'NORMALISED'),
                        ('Yes, keep the checks as a standing rule for the array work.', '2026-09-26T10:21:32Z', 'NO MATCH')]:
        r = subprocess.run([sys.executable, '-I', os.path.join(HERE, 'quote.py'), qt, t], capture_output=True, text=True)
        v = r.stdout.split()[0] if r.stdout else ''
        check('quote: %r at %s -> %s' % (qt, t, want), v == ('NO' if want == 'NO MATCH' else want), r.stdout[:100])
    print('%d failed' % fails)
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
