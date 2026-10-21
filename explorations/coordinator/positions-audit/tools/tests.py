#!/usr/bin/env python3
"""tests.py: the scripts against P-86's known answers (scout-search-study.md, section 4), a few
hand-checked facts, and the trial's findings (trial/evidence/): the reply chain against the
scouts' answers, the homes the correction writer found by hand, the 45 quotes of the judgement,
and P-148's later messages. Prints PASS or FAIL per check; exits 1 on any failure.

    python3 -I tests.py
"""
import io
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import plib  # noqa: E402
import tlib  # noqa: E402
import near  # noqa: E402
import quote  # noqa: E402
import sort  # noqa: E402
import trail  # noqa: E402

fails = 0
PIN = '93b7c921e'     # the record's checks read the record as this commit holds it (P-86 struck here)


def check(name, ok, got=''):
    global fails
    print('%s  %s%s' % ('PASS' if ok else 'FAIL', name, '' if ok else '   got: %s' % got))
    if not ok:
        fails += 1


def main():
    w = plib.World(rev=PIN)
    e86, st = plib.find_entry(w, 'P-86')
    check('P-86 struck at %s: traced from b39657798, the last commit that held it (POSITIONS.md:93), its reason '
          'the history block :1450 that the removal wrote' % PIN,
          st is not None and st['last'][:9] == 'b39657798' and st['removal'][:9] == '93b7c921e' and e86['line'] == 93
          and st['in_history'] and st['block'] and st['block']['line'] == 1450 and '· removed ·' in st['block']['prov'],
          st and (st['last'][:9], (st['removal'] or '')[:9], e86['line'], st['block'] and st['block']['line']))
    ev = list(reversed(plib.trail(w, 'P-86')))
    got = [(e['h'][:9], e['kind']) for e in ev]
    want = [('fbc4c4954', 'created'), ('892687076', 'changed'), ('03f215fe4', 'moved to history'),
            ('bc8902f47', 're-created'), ('a88e52bf7', 'renumbered'), ('ab933086b', 'changed'), ('93b7c921e', 'struck')]
    check('P-86 trail: the six commits and what each did, then the strike', got == want, got)
    times = [w.info(e['h'])['adate'] for e in ev]
    check('P-86 trail: UTC times', times == ['2026-09-26T10:22:23Z', '2026-09-27T03:24:33Z', '2026-09-29T21:58:48Z',
                                             '2026-09-30T05:37:17Z', '2026-10-13T18:00:39Z', '2026-10-13T19:10:15Z',
                                             '2026-10-21T23:00:00Z'], times)
    others = [e['others'] for e in ev]
    check('P-86 trail: other entries changed (study: 0, 19, 13, 134, 23, 27; bc8902f47 counted as pairs, 135; the strike 0)',
          others == [0, 19, 13, 135, 23, 27, 0], others)
    bl = plib.head_blocks(w, 'P-86')
    check('P-86 blocks: :257 written by a88e52bf7, :858 by ab933086b (not by the cited fbc4c4954), :1450 by the strike',
          [(b['line'], b['writer'][:9]) for b in bl] == [(257, 'a88e52bf7'), (858, 'ab933086b'), (1450, '93b7c921e')],
          [(b['line'], b['writer'][:9]) for b in bl])
    m = sort.marks(w, 'P-86')
    check('P-86 sort marks: struck, doc and bulk (the strike\'s own block is not read as a source)',
          m['marks'][:1] == ['struck'] and 'doc' in m['marks'] and 'bulk' in m['marks'], m['marks'])
    buf = io.StringIO()
    trail.print_trail(w, 'P-86', out=buf)
    check('P-86 trail.py: STRUCK at the top, with the removal and its reason',
          buf.getvalue().startswith('P-86: STRUCK.') and 'Removed by 93b7c921e' in buf.getvalue().split('\n')[0]
          and 'POSITIONS-history.md:1450' in buf.getvalue().split('\n')[1], buf.getvalue()[:200])
    # hand-checked trails
    ev48 = list(reversed(plib.trail(w, 'P-48')))   # these four at PIN too
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
    # his messages: the cached index gives show.py's list
    for attempt in range(2):     # the live transcript may grow between the two reads
        a = [(m['ts'], m['source'], m['sid'], m['text']) for m in tlib.show.load()]
        b = [(m['ts'], m['source'], m['sid'], m['text']) for m in tlib.load_msgs()]
        if a == b:
            break
        tlib._INDEX = None
    check('load_msgs: the same %d messages as show.load(), in its order' % len(a), a == b, (len(a), len(b)))
    talk = tlib.Talk()
    buf = io.StringIO()
    hits = near.print_near(talk, '2026-09-26T10:22:23Z', 10, out=buf)
    ts = [h['ts'] for h in hits]
    check('near: his 10:14:05.953 and 10:21:32.097 before fbc4c4954', ts == ['2026-09-26T10:14:05.953Z', '2026-09-26T10:21:32.097Z'], ts)
    yes = [h for h in hits if h['ts'] == '2026-09-26T10:21:32.097Z'][0]
    check('near: his "Yes." text', yes['text'] == "> The ask: take Astra's review into main and carry its checks into batch 6's briefs.\n\nYes. \n\nRun Fable judgement as well.", repr(yes['text']))
    b, skipped = talk.before(yes['sid'], yes['ts'])
    check('near, by time: the coordinator\'s ask he answered is 10:14:55.886 (001.jsonl:6723), its Stop-hook "." skipped',
          b.ts == '2026-09-26T10:14:55.886Z' and b.where.endswith('001.jsonl:6723') and len(skipped) == 1,
          (b.ts, b.where[-20:], len(skipped)))
    check('near: that ask ends with the recommendation', 'I recommend yes' in b.text and '**The ask: take Astra' in b.text)
    out = buf.getvalue()
    check('near: the ask printed whole under the Yes', b.text in out.split('=== HIS MESSAGE 2026-09-26T10:21:32.097Z')[1])
    q = [x for x in tlib.show.load() if x['ts'].startswith('2026-09-30T05:24:08')]
    check('near: the queued instruction of 05:24:08.253 (source queued, 2512 characters)',
          len(q) == 1 and q[0]['source'] == 'queued' and len(q[0]['text']) == 2512, [(x['ts'], x['source'], len(x['text'])) for x in q])
    # the reply chain, on the trial scouts' findings
    def ans(t):
        m = [x for x in talk.msgs if x['ts'] == t][0]
        return talk.answered(m)

    def turn(a):
        return [x.ts for x in a['turn']['texts']] if a['turn'] else None
    a = ans('2026-10-14T19:06:22.989Z')
    check('chain: 10-14 19:06:22.989 answered 19:04:27.473 ("Want it as a POSITIONS entry?"), passing over the '
          'replies to the task notification and the agent\'s hand-back (19:05:14, 19:06:14)',
          turn(a) == ['2026-10-14T19:04:27.473Z'] and 'Want it as a POSITIONS entry?' in a['turn']['texts'][0].text
          and sorted(x.ts for s in a['skipped'] for x in s['texts']) == ['2026-10-14T19:05:14.300Z', '2026-10-14T19:06:14.340Z'],
          (turn(a), [(s['prompt'].label, [x.ts for x in s['texts']]) for s in a['skipped']]))
    a = ans('2026-10-16T16:42:39.606Z')
    check('chain: 10-16 16:42:39.606 ("3 for the where clauses.") follows 16:34:05.053 on the chain, his own turn on '
          'the profile; the scout\'s 15:55:06.719 is the second turn to him further back (the chain disagrees)',
          turn(a) == ['2026-10-16T16:34:05.053Z'] and [e['texts'][-1].ts for e in a['earlier']][:2] ==
          ['2026-10-16T16:33:44.422Z', '2026-10-16T15:55:06.719Z'],
          (turn(a), [e['texts'][-1].ts for e in a['earlier']]))
    a = ans('2026-09-22T07:17:57.713Z')
    check('chain: 09-22 07:17:57.713 answered the turn of 07:06:49.525 (with its closing line 07:07:10.631), '
          'not the 07:10:02 status line, which answers a task notification',
          turn(a) == ['2026-09-22T07:06:49.525Z', '2026-09-22T07:07:10.631Z']
          and '2026-09-22T07:10:02.655Z' in [x.ts for s in a['skipped'] for x in s['texts']], turn(a))
    a = ans('2026-09-26T10:21:32.097Z')
    check('chain: 09-26 10:21:32.097 answered 10:14:55.886 (001.jsonl:6723), its Stop-hook "." passed over',
          turn(a) == ['2026-09-26T10:14:55.886Z'] and a['turn']['texts'][0].where.endswith('001.jsonl:6723')
          and [s['prompt'].label for s in a['skipped']] == ['Stop-hook feedback'], (turn(a), a['skipped']))
    a = ans('2026-09-30T05:24:08.253Z')
    check('chain: the queued 05:24:08.253 starts at its delivery and answers 05:18:33.365 ("The consolidation barely '
          'changed their size")', a['how'] == 'chain' and turn(a) == ['2026-09-30T05:18:33.365Z']
          and a['sent'] == '2026-09-30T05:24:08.253Z', (a['how'], turn(a), a['sent']))
    a = ans('2026-10-10T21:13:24.076Z')
    check('chain: 10-10 21:13:24.076 ("Go. ..."): the passed-over turn of 09:44:51.911, a reply to a task '
          'notification that ends "when you say go", is the newest passed-over turn flagged as an ask',
          [s['texts'][-1].ts for s in a['skipped'] if s.get('asks')][:1] == ['2026-10-10T09:44:51.911Z'],
          [(s['texts'][-1].ts, s.get('asks')) for s in a['skipped']])
    a = ans('2026-09-26T10:21:32.097Z')
    check('chain: the lines he quotes at 10:21:32.097 ("> The ask: take Astra\'s review ...") are found in 10:14:55.886',
          a['quoted'] is not None and a['quoted'].ts == '2026-09-26T10:14:55.886Z', a['quoted'] and a['quoted'].ts)
    a = ans('2026-10-08T17:42:48.713Z')
    check('chain: the lines he quotes at 10-08 17:42:48.713 are from 17:19:03.035, further back than the answer',
          a['quoted'] is not None and a['quoted'].ts == '2026-10-08T17:19:03.035Z', a['quoted'] and a['quoted'].ts)
    # pointers, at a fixed commit
    import pointers
    hits = pointers.pointers('P-86', at='fa3931f42')
    check('pointers: P-86 at fa3931f42: POSITIONS:93, HELD:15, BOOT:10, :12, :18, open-asks-2026-10-16:187',
          [(f.split('/')[-1], k) for f, k, l, h in hits] == [('POSITIONS.md', 93), ('HELD.md', 15), ('BOOT.md', 10),
                                                            ('BOOT.md', 12), ('BOOT.md', 18), ('open-asks-2026-10-16.md', 187)],
          [(f.split('/')[-1], k) for f, k, l, h in hits])
    w86 = re.compile(r'(?<![\w-])P-%d(?!\d)' % 86)
    check('pointers: P-86 matches P-86, P-86\'s, (P-86) and not P-860, P-186, xP-86',
          [bool(w86.search(x)) for x in ['P-86', "P-86's", '(P-86)', 'P-860', 'P-186', 'xP-86']] == [True] * 3 + [False] * 3)
    # homes, at a fixed commit, on what the trial's writer found by hand
    import homes
    homes.AT = 'fa3931f42'

    def first(num, words):
        line, text, res, _ = homes.rank(num)
        r = [x for x in res if words in x['clause']]
        return r[0]['cands'][0][1][0] if r and r[0]['cands'] else None
    for num, words, want in [('P-55', 'fork 3, a size known only at run time', 'review-queue item 30'),
                             ('P-55', 'fork 2, the bound of', 'review-queue item 31'),
                             ('P-85', '`RR32`', 'review-queue item 37'),
                             ('P-151', 'not moved into `List`', 'review-queue item 188'),
                             ('P-151', 'its default taken', 'review-queue item 177')]:
        got = first(num, words)
        check('homes: %s, "%s" -> %s first' % (num, words, want), got == want, got)
    homes.AT = PIN
    line, text, sth = homes.entry_text('P-86')
    check('homes: P-86 at %s is read as it last stood (POSITIONS.md:93 of 93b7c921e^), marked struck' % PIN,
          line == 93 and sth and sth[0][:9] == '93b7c921e' and text.startswith("**The integration review's checks"),
          (line, sth))
    homes.AT = None
    # his page comments
    import comments
    comments.GLOB = os.path.join(HERE, '..', 'evidence', 'curator-comments-2026-10-21.md')
    check('comments: P-66 has its thread (20:18), P-86 none (in the comments of 2026-10-21)',
          [(h[1], len(h[3])) for h in comments.find('P-66', PIN)] == [(15, 1)] and comments.find('P-86', PIN) == [],
          [(h[1], len(h[3])) for h in comments.find('P-66', PIN)])
    import tempfile
    d = tempfile.mkdtemp()
    with open(os.path.join(d, 'curator-comments-test.md'), 'w') as f:
        f.write('# test\n\n## On "the integer principle: Java\'s and the JVM\'s defaults stay where they make sense"\n\n'
                '- 20:00: "a comment"\n\n## On something else\n\n- 20:01: "PE66 is fine."\n- 20:02: "unrelated"\n')
    g = comments.GLOB
    comments.GLOB = os.path.join(d, 'curator-comments-*.md')
    got = [(h[1], h[4].split(' (')[0], len(h[3])) for h in comments.find('P-66', PIN)]
    comments.GLOB = g
    check('comments: a thread that quotes the title without its number, and a comment that dictates "PE66"',
          got == [(3, 'the thread quotes its title', 1), (7, 'the comment names P-66', 1)], got)
    # the quote block check
    import hischeck
    msgs = tlib.load_msgs()
    buf = io.StringIO()
    c = hischeck.check_file(os.path.join(HERE, '..', 'trial', 'evidence', 'judgement.md'), msgs, out=buf)
    check('hischeck: judgement.md, 45 exact', c == {'EXACT': 45}, c)
    with open(os.path.join(d, 'q.md'), 'w') as f:
        f.write('x\n\n## His quotes\n\nHIS 2026-09-26T10:21:32.097Z | Run Fable judgement as well.\n'
                '- `HIS 2026-09-26T10:21:32.097Z | Yes.  Run Fable judgement as well.`\n'
                'HIS 2026-09-26T10:21:32.097Z | Run the Fable judgement too.\nHIS 2026-09-26T10:21:33Z | Yes.\n'
                'HIS 2026-09-26T10:21:32.097Z Run Fable\n\n## After\n\nHIS 2026-01-01T00:00:00Z | not in the block\n')
    buf = io.StringIO()
    c = hischeck.check_file(os.path.join(d, 'q.md'), msgs, out=buf)
    check('hischeck: EXACT, NORMALISED, NO MATCH, NO MESSAGE and BAD FORM, each line that fails printed',
          c == {'EXACT': 1, 'NORMALISED': 1, 'NO MATCH': 1, 'NO MESSAGE': 1, 'BAD FORM': 1}
          and buf.getvalue().count('\n   :') == 3, (c, buf.getvalue()))
    # his later messages
    import later
    text = later.entry_at('P-148', '36f7db77c')
    r = later.candidates(talk, 'P-148', text, '2026-10-14T19:07:05Z', '2026-10-15T01:08:41Z', '2026-10-21T20:54:00')
    top = [x['m']['ts'] for x in r['cands'][:6]]
    check('later: P-148 (text of 36f7db77c, messages to 2026-10-21T20:54): his 10-17 10:28:25.974 and 10:29:05.258 '
          'in the first six', '2026-10-17T10:28:25.974Z' in top and '2026-10-17T10:29:05.258Z' in top,
          [(x['m']['ts'], round(x['score'], 1)) for x in r['cands'][:8]])
    # leads.py --out
    path = os.path.join(d, 'leads.md')
    rr = subprocess.run([sys.executable, '-I', os.path.join(HERE, 'leads.py'), '86', '--at', PIN, '--out', path],
                        capture_output=True, text=True)
    body = open(path).read() if os.path.exists(path) else ''
    heads = re.findall(r'(?m)^== (\d+)\.', body)
    check('leads --at %s --out: P-86 written with sections 1 to 10, STRUCK at the top, the Yes and its ask whole' % PIN,
          rr.returncode == 0 and heads == [str(k) for k in range(1, 11)] and b.text in body
          and body.split('\n')[2].startswith('P-86: STRUCK.'), (rr.returncode, heads, rr.stderr[-300:]))
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
