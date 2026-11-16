#!/usr/bin/env python3
"""searches.py counts the coordinator's searches of the record between two of the
curator's messages (called an exchange here: his message, and everything the
coordinator does until his next message), by the model that answered and by
the kind of boot that the exchange follows (full: FACTS and POSITIONS read
whole after the compaction; light: not read).

    python3 scripts/searches.py                       # the sums, from 2026-10-22T22:56 (the light boot's rule)
    python3 scripts/searches.py --since 2026-11-08T15:38
    python3 scripts/searches.py --window 2026-11-16T00:20 2026-11-16T02:20    # one line for each exchange
    python3 scripts/searches.py --corrections         # the exchanges before and after each labelled correction
    python3 scripts/searches.py --stop-hook           # a check at a turn's end, tried on the exchanges at hand

What a line counts.
  A search: a tool call of the coordinator's own that tlib.is_decision_search()
  accepts: facts-extract.sh, or a grep, rg, awk or sed -n over FACTS, POSITIONS,
  INDEX or their histories, or a Read or Grep call on one of them. "Wider" adds
  PLAN, the held list, the boot note, the review queue and the gap ledger.
  A claim: the coordinator's text in the exchange matches CLAIM_RE: it names an
  entry (P-12, F-34), or says what the record holds, what he decided or said,
  or that something is open, settled or decided.
  Delegated: the exchange launched a worker (it may have searched for the coordinator).
What it cannot show: a search made by a worker; whether the search found the
right thing; a claim in other words than CLAIM_RE's; whether a claim without a
search was wrong (after a full boot the record is in context and needs no search).
"""
import collections, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib, boots, corrections

CLAIM_RE = re.compile(
    r"\b[PF]-\d+\b|\b(the record|POSITIONS|FACTS)\b[^.\n]{0,60}\b(holds?|says?|states?|does not|doesn't|has no|settles?)\b"
    r"|\byou (decided|said|ruled|approved|agreed|ordered|wrote|stated)\b|\byour (decision|word|rule|position|order)s?\b"
    r"|\b(is|are|stays?|remains?|still) (open|undecided|unsettled|not decided|not settled)\b"
    r"|\b(no|not an?) (entry|decision|message|word)\b|\b(un)?settled\b|\b(un)?decided\b|\bnot (yet )?recorded\b", re.I)

# the narrow form: the text says that something is open, undecided or not in the record
NEG_RE = re.compile(
    r"\b(is|are|stays?|remains?|still) (open|undecided|unsettled|not decided|not settled)\b|\bnot (yet )?(decided|settled|recorded|in the record)\b"
    r"|\b(no|not an?) (entry|decision|message|word|record|line) (of yours|of his|in|holds|says|orders|settles)\b|\bI (can't|cannot) say\b|\bun(decided|settled)\b"
    r"|\bopen question\b|\byours to (decide|overturn|rule)\b|\b(you|he) never (decided|said|ordered|ruled|read)\b"
    r"|\b(the record|POSITIONS|FACTS|the held list)\b[^.\n]{0,40}\b(does not|doesn't|has no|holds no)\b", re.I)

class Exchange:
    __slots__ = ('ts', 'ref', 'model', 'search', 'wider', 'tools', 'agents', 'chars', 'claim', 'boot', 'boot_ref', 'n_in_boot', 'ctx', 'whole', 'marker', 'neg')
    def __init__(self, e):
        self.ts, self.ref = e['ts'], e['ref']
        self.model = None; self.search = self.wider = self.tools = self.agents = self.chars = 0
        self.claim = False; self.ctx = 0; self.neg = False; self.whole = False
        self.marker = False

def exchanges():
    ivs = boots.build()
    kind_at = [(iv.ts, iv.kind(), iv.ref, iv.whole_at()) for iv in ivs if iv.b]
    out, cur, k, n_in = [], None, -1, 0
    for e in tlib.load_events({'his', 'reply', 'boundary'}):
        if e['k'] == 'boundary':
            k += 1; n_in = 0
            # the compaction ends the exchange only in the count of its boot: the exchange goes on
            continue
        if e['k'] == 'his':
            t = e['text'].strip()
            if not t or t.startswith('<') or t.startswith('[Request interrupted'):
                continue
            cur = Exchange(e)
            cur.marker = bool(corrections.markers_of(t))
            # kind_at holds the boots from the first compaction on, in the order of the boundaries
            while k + 1 < len(kind_at) and kind_at[k + 1][0] <= e['ts']:
                k += 1; n_in = 0
            cur.boot, cur.boot_ref = (kind_at[k][1], kind_at[k][2]) if k >= 0 else ('start', 'start')
            # whole: FACTS and POSITIONS were both read since the compaction, before this message
            cur.whole = bool(k >= 0 and kind_at[k][3] and kind_at[k][3] <= e['ts'])
            n_in += 1; cur.n_in_boot = n_in
            out.append(cur)
        elif cur is not None and e['model'] != '<synthetic>':
            cur.model = cur.model or e['model']
            cur.ctx = e['ctx']
            cur.chars += len(e['text'])
            if e['text'] and CLAIM_RE.search(e['text']):
                cur.claim = True
            if e['text'] and NEG_RE.search(e['text']):
                cur.neg = True
            for t in e['tools']:
                cur.tools += 1
                cur.search += tlib.is_decision_search(t)
                cur.wider += tlib.is_record_search(t)
                cur.agents += t['name'] in ('Agent', 'Task', 'Workflow')
    return [x for x in out if x.model]

def pct(a, b):
    return '%3d%%' % round(100.0 * a / b) if b else '  - '

def main():
    args = sys.argv[1:]
    xs = exchanges()
    if '--window' in args:
        i = args.index('--window')
        lo, hi = args[i + 1], args[i + 2]
        print('time             ref       boot  context  searches wider workers claim  characters of reply')
        for x in xs:
            if lo <= x.ts <= hi + '~':
                print('%s %-9s %-5s %5dK   %4d    %4d   %4d    %-5s %6d' % (tlib.fmt_ts(x.ts), x.ref, x.boot, x.ctx // 1000, x.search, x.wider, x.agents, 'yes' if x.claim else '', x.chars))
        return
    if '--corrections' in args:
        lab = corrections.labels()
        idx = {x.ref: i for i, x in enumerate(xs)}
        print('For each labelled correction of his: the exchange that it corrects (the one before his message) and the exchange that answers it.')
        fam = {'1', '2', '7'}
        for name, pick in (('kinds 1, 2 and 7 (a search of the record would have settled it)', lambda ks: bool(set(ks) & fam)),
                           ('every other kind', lambda ks: bool(ks) and not set(ks) & fam)):
            tot = collections.defaultdict(lambda: [0, 0, 0, 0, 0])
            for ref, kinds in lab.items():
                ks = [k for k in kinds.split(',') if k != '-']
                if not pick(ks) or ref not in idx or idx[ref] == 0:
                    continue
                before, after = xs[idx[ref] - 1], xs[idx[ref]]
                t = tot[tlib.tier(before.model)]
                t[0] += 1
                t[1] += before.search > 0
                t[2] += before.search == 0 and before.agents == 0
                t[3] += after.search > 0
                t[4] += after.search > 0 or after.agents > 0
            print('  %s:' % name)
            for m, (n, b, b0, a, a2) in sorted(tot.items()):
                print('    %-9s corrections %3d | before: the coordinator had searched in %2d (%s), neither searched nor delegated in %2d (%s) | after: it searched in %2d (%s), searched or delegated in %2d (%s)' % (
                    m, n, b, pct(b, n), b0, pct(b0, n), a, pct(a, n), a2, pct(a2, n)))
        return
    if '--stop-hook' in args:
        lab = corrections.labels()
        idx = {x.ref: i for i, x in enumerate(xs)}
        fam = {'1', '2', '7'}
        lo, hi = corrections.WINDOW
        win = [x for x in xs if lo <= x.ts <= hi + '~']
        print('A check at a turn\'s end, tried on the exchanges from %s to %s (%d): it fires when the coordinator\'s text' % (lo[:10], hi[:10], len(win)))
        print('holds a claim, the exchange holds no search of FACTS, POSITIONS or INDEX, and they were not read whole since the compaction.')
        for name, test in (('narrow claim (says that something is open, undecided or not in the record)', lambda x: x.neg),
                           ('wide claim (names an entry, or says what the record holds or what he decided)', lambda x: x.claim)):
            fire = lambda x: test(x) and not x.search and not x.whole
            print('  %s:' % name)
            for m in sorted({tlib.tier(x.model) for x in win}):
                v = [x for x in win if tlib.tier(x.model) == m]
                f = sum(1 for x in v if fire(x))
                # the corrections of kinds 1, 2, 7 whose corrected exchange (the one before his message) would have fired
                hit = n = 0
                for ref, kinds in lab.items():
                    if set(kinds.split(',')) & fam and ref in idx and idx[ref] > 0:
                        before = xs[idx[ref] - 1]
                        if tlib.tier(before.model) == m:
                            n += 1
                            hit += fire(before)
                print('    %-9s exchanges %3d | fires %3d (%4.1f per 100) | of his %2d corrections of kinds 1, 2, 7, the exchange before would have fired in %d' % (
                    m, len(v), f, 100.0 * f / len(v), n, hit))
        return
    since = args[args.index('--since') + 1] if '--since' in args else '2026-10-22T22:56'
    xs = [x for x in xs if x.ts >= since]
    print('Exchanges from %s: %d.\n' % (since, len(xs)))
    def table(xs, key, title):
        print('== %s' % title)
        g = collections.defaultdict(list)
        for x in xs:
            g[key(x)].append(x)
        for name in sorted(g):
            v = g[name]
            n = len(v)
            cl = [x for x in v if x.claim]
            print('  %-22s exchanges %4d | with a search %s | with a search or a worker %s | searches per exchange %.2f | with a claim %4d, of which no search %s, neither search nor worker %s' % (
                name, n, pct(sum(1 for x in v if x.search), n), pct(sum(1 for x in v if x.search or x.agents), n),
                sum(x.search for x in v) / float(n), len(cl), pct(sum(1 for x in cl if not x.search), len(cl)),
                pct(sum(1 for x in cl if not x.search and not x.agents), len(cl))))
        print()
    table(xs, lambda x: tlib.tier(x.model), 'by model')
    table(xs, lambda x: '%-9s %s' % (tlib.tier(x.model), x.boot), 'by model and kind of boot')
    table(xs, lambda x: '%-9s %s' % (tlib.tier(x.model), 'whole' if x.whole else 'not whole'),
          'by model and whether FACTS and POSITIONS had been read whole since the compaction')
    table([x for x in xs if not x.marker], lambda x: '%-9s %s' % (tlib.tier(x.model), 'whole' if x.whole else 'not whole'),
          'the same, only the exchanges that a message of his without a marker of correction started (no objection asked for the search)')

if __name__ == '__main__':
    main()
