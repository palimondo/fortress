#!/usr/bin/env python3
"""corrections.py counts the curator's messages that correct the coordinator's
conduct (how it works, not the project's content), per 100 of his messages, by
the model that served the reply before the message. It gives two counts.

  1. The marker rate, by machine alone: the share of his messages that hold a
     word or mark of MARKERS (repetition, blame, a rule or skill named, shouting).
     It over-counts (a marker in a message about the project) and under-counts
     (a calm correction). It needs no judgement, so anyone gets the same number.
  2. The labelled rate: every message with a marker, and a seeded random sample
     of those without, was read and given a kind in corrections-labels.tsv
     (ref, kind, a note of a few words). A kind of "-" means no correction of
     conduct. The labels are one reader's judgement: the analysis worker's.

    python3 scripts/corrections.py                    # both rates by model, and the kinds
    python3 scripts/corrections.py --list FROM TO     # the messages with a marker: ref, markers, head
    python3 scripts/corrections.py --sample N FROM TO # N messages without a marker (seed 1116)
    python3 scripts/corrections.py --show REF         # one message of his, whole
    python3 scripts/corrections.py --unlabelled       # marker messages in the window with no label

The window of the labels is WINDOW. What the counts cannot show: a correction
that he made on a page (a comment thread) and not in chat; whether he was
right; and how grave each one was.
"""
import collections, os, random, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib

WINDOW = ('2026-10-28T05:56', '2026-11-16T13:36')   # the long Fable 5.1 stretch, then Opus 5.5 and Fable 5.1 in turns, then Fable 5.2

MARKERS = [
    ('swear',   r"\bwtf\b|what the fuck|\bfuck|\bdamn|\bffs\b|for god'?s sake|\bjesus\b|\bugh\b|\bsigh\b|\bfacepalm"),
    ('repeat',  r"\bagain\b|once more|how many times|haven'?t we|we'?ve been through|been through this|already (told|said|decided|discussed|agreed)|I (already )?(told|said to) you|as I said|\bI repeat\b|repeatedly|keep (doing|forgetting|asking|making)|\bstill (not|don'?t|doing|haven'?t)\b"),
    ('blame',   r"\bwrong\b|incorrect|\bmistakes?\b|you (didn'?t|did not|haven'?t|have not|failed|forgot|ignored|missed|skipped|should(n'?t| not)? have|were supposed|are supposed|keep|never)\b|why (did|didn'?t|do|don'?t|are|aren'?t|haven'?t|have|would) you\b|don'?t you\b|\bstop (doing|it|that|asking|this)\b|not what I (asked|said|meant|wanted)|I (never|didn'?t) (said|say|asked|ask|approved?|decided?)|anti-?pattern|regress|baby ?sit|gaslit|gaslight|\btrust\b|sloppy|\blazy\b|careless|hallucinat|made (it|this|that) up|confabulat|unacceptable|disappoint|frustrat|annoy|\bhate|hatred|not impressed|skeptical|wrong with you|not acceptable|violat|you are not (following|reading|loading)|not following"),
    ('process', r"did you (read|load|check|search|verify|even)|have you (read|loaded|checked|searched)|loaded in your context|\brouter\b|the skill says|per the skill|rule says|against the (rule|skill)|what parts? of the|why (was|is|were) (this|that|it) not|post-?mortem|your conduct|your behaviou?r|pay attention|be careful|slow down|think (harder|again)|re-?read"),
    ('shout',   r"\?!|!!|\b[A-Z]{4,}\b[^a-z]{0,3}\b[A-Z]{3,}\b"),
]
COMPILED = [(n, re.compile(p, re.I if n != 'shout' else 0)) for n, p in MARKERS]

# the kinds of the work order (README.md, "The failures, by kind"), then the kinds that it lacks
KINDS = collections.OrderedDict([
    ('1', 'a settled matter put to him as open'),
    ('2', 'a claim about his words from an incomplete search'),
    ('3', "the skills' parts not loaded"),
    ('4', 'a decision of his not written down when stated'),
    ('5', "a worker's report passed on unchecked"),
    ('6', 'his position handed back as the coordinator\'s proposal'),
    ('7', 'the record not searched before a statement'),
    ('8', 'a brief that breaks the delegating rules'),
    ('A', 'the register: too long, shorthand, a coined label, a table, a wrong time'),
    ('B', 'acted without his go, or beyond what he asked'),
    ('C', 'did not do what he asked, or did it late'),
    ('D', 'a wrong fact or number given to him (not from a worker)'),
    ('E', 'a rule of the skills or of the process not followed (other than loading)'),
    ('F', 'his words recorded wrongly, or his intent misread'),
    ('G', 'a general judgement of the coordinator or its model'),
])

def wilson(k, n, z=1.96):
    """The 95% interval of a share k of n."""
    if not n:
        return 0.0, 0.0
    p = k / float(n)
    d = 1 + z * z / n
    c = p + z * z / (2 * n)
    h = z * ((p * (1 - p) + z * z / (4 * n)) / n) ** 0.5
    return (c - h) / d, (c + h) / d

def markers_of(text):
    return [n for n, rx in COMPILED if rx.search(text)]

def his_messages():
    """[(ts, ref, text, model of the last reply before it)], command echoes and usage panels left out."""
    out, model = [], None
    for e in tlib.load_events({'his', 'reply'}):
        if e['k'] == 'reply':
            if e['model'] != '<synthetic>':
                model = e['model']
            continue
        t = e['text'].strip()
        if not t or t.startswith('<') or t.startswith('Usage Context') or t.startswith('[Request interrupted'):
            continue
        out.append((e['ts'], e['ref'], t, tlib.tier(model)))
    return out

def labels():
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'corrections-labels.tsv')
    out = {}
    if os.path.exists(path):
        for line in open(path):
            if line.strip() and not line.startswith('#'):
                parts = line.rstrip('\n').split('\t')
                out[parts[0]] = parts[1]
    return out

def head(text, n=230):
    return ' '.join(text.split())[:n]

def main():
    args = sys.argv[1:]
    msgs = his_messages()
    if '--show' in args:
        ref = args[args.index('--show') + 1]
        for ts, r, t, m in msgs:
            if r == ref:
                print('%s %s after a reply of %s\n%s' % (ts, r, m, t))
        return
    if '--list' in args or '--sample' in args or '--unlabelled' in args:
        lab = labels()
        if '--unlabelled' in args:
            lo, hi = WINDOW
        else:
            i = args.index('--list') if '--list' in args else args.index('--sample') + 1
            lo, hi = args[i + 1], args[i + 2]
        window = [x for x in msgs if lo <= x[0] <= hi + '~']
        if '--sample' in args:
            n = int(args[args.index('--sample') + 1])
            plain = [x for x in window if not markers_of(x[2])]
            random.Random(1116).shuffle(plain)
            for ts, r, t, m in sorted(plain[:n]):
                print('%s %-9s %-9s | %s' % (tlib.fmt_ts(ts), r, m, head(t)))
            return
        for ts, r, t, m in window:
            mk = markers_of(t)
            if mk and not ('--unlabelled' in args and r in lab):
                print('%s %-9s %-9s %-22s | %s' % (tlib.fmt_ts(ts), r, m, ','.join(mk), head(t)))
        return
    # the rates
    lab = labels()
    print('1. The marker rate (by machine): his messages with a marker of repetition, blame, process or shouting.')
    for name, lo in (('all of the transcript', ''), ('since the skill rewrite, 2026-10-13 19:22', '2026-10-13T19:22'),
                     ('since the skill last changed, 2026-11-08 15:38', '2026-11-08T15:38')):
        tot, hit = collections.Counter(), collections.Counter()
        strong = collections.Counter()
        for ts, r, t, m in msgs:
            if ts >= lo:
                tot[m] += 1
                mk = markers_of(t)
                hit[m] += bool(mk)
                strong[m] += bool(set(mk) & {'swear', 'shout'})
        print('  %s:' % name)
        for m in sorted(tot, key=lambda m: -tot[m]):
            print('    %-9s his messages %5d  with a marker %4d (%4.1f per 100)  swearing or shouting %3d (%4.1f per 100)' % (
                m, tot[m], hit[m], 100.0 * hit[m] / tot[m], strong[m], 100.0 * strong[m] / tot[m]))
    lo, hi = WINDOW
    window = [x for x in msgs if lo <= x[0] <= hi + '~']
    tot, cor = collections.Counter(), collections.Counter()
    kinds = collections.defaultdict(collections.Counter)
    unl = 0
    sample_n, sample_c = collections.Counter(), collections.Counter()
    for ts, r, t, m in window:
        tot[m] += 1
        mk = markers_of(t)
        if r in lab:
            ks = [k for k in lab[r].split(',') if k != '-']
            if mk:
                if ks:
                    cor[m] += 1
                    for k in ks:
                        kinds[m][k] += 1
            else:
                sample_n[m] += 1
                sample_c[m] += bool(ks)
        elif mk:
            unl += 1
    print('\n2. The labelled rate, %s to %s: marker messages read and given a kind (%d labels on file, %d marker messages not labelled).' % (lo, hi, len(lab), unl))
    for m in sorted(tot, key=lambda m: -tot[m]):
        print('    %-9s his messages %4d  corrections of conduct %3d (%4.1f per 100)' % (m, tot[m], cor[m], 100.0 * cor[m] / tot[m]))
    print('   a correction can have more than one kind; by kind, per 100 of his messages (count):')
    models = sorted(tot, key=lambda m: -tot[m])
    print('    %-72s %s' % ('', '  '.join('%-12s' % m for m in models)))
    for k, name in KINDS.items():
        if any(kinds[m][k] for m in models):
            print('    %s %-70s %s' % (k, name[:70], '  '.join('%4.1f (%2d)   ' % (100.0 * kinds[m][k] / tot[m], kinds[m][k]) for m in models)))
    print('   the check of the markers: messages without a marker, sampled and read: ' +
          '; '.join('%s %d read, %d corrections' % (m, sample_n[m], sample_c[m]) for m in models if sample_n[m]))
    print('   (so the labelled rate misses about %d corrections in every 100 messages without a marker, for every model)' % round(100.0 * sum(sample_c.values()) / max(sum(sample_n.values()), 1)))
    # how far the rates carry: a 95% interval (Wilson), and the rate without each model's worst day
    print('\n3. How far the labelled rates carry.')
    days = collections.defaultdict(collections.Counter)
    msg_days = collections.defaultdict(collections.Counter)
    for ts, r, t, m in window:
        msg_days[m][ts[:10]] += 1
        if markers_of(t) and r in lab and lab[r] != '-':
            days[m][ts[:10]] += 1
    for m in models:
        lo95, hi95 = wilson(cor[m], tot[m])
        worst, n_worst = days[m].most_common(1)[0] if days[m] else ('-', 0)
        rest_c, rest_n = cor[m] - n_worst, tot[m] - msg_days[m][worst]
        print('    %-9s %4.1f per 100, 95%% interval %4.1f to %4.1f | worst day %s: %d corrections in %d messages | without it: %d in %d, %4.1f per 100' % (
            m, 100.0 * cor[m] / tot[m], 100 * lo95, 100 * hi95, worst, n_worst, msg_days[m][worst], rest_c, rest_n, 100.0 * rest_c / max(rest_n, 1)))
        print('              by day (corrections/messages): ' + ' '.join('%s %d/%d' % (d[5:], days[m][d], msg_days[m][d]) for d in sorted(msg_days[m])))
    # by the state of the record in context
    import searches
    state = {x.ref: (x.boot, x.whole) for x in searches.exchanges()}
    print('\n4. The corrections by what the coordinator had read since the compaction: FACTS and POSITIONS whole (after a full boot, or after a landing), or not.')
    fam = {'1', '2', '7'}
    agg = collections.defaultdict(lambda: [0, 0, 0])
    for ts, r, t, m in window:
        if r not in state:
            continue
        key = (m, 'record read whole' if state[r][1] else 'record not read whole')
        agg[key][0] += 1
        if markers_of(t) and r in lab and lab[r] != '-':
            agg[key][1] += 1
            agg[key][2] += bool(set(lab[r].split(',')) & fam)
    for (m, st), (n, c, f) in sorted(agg.items()):
        print('    %-9s %-22s his messages %4d | corrections %3d (%4.1f per 100) | of kinds 1, 2, 7 (a search would have settled it) %2d (%4.1f per 100)' % (
            m, st, n, c, 100.0 * c / n, f, 100.0 * f / n))

if __name__ == '__main__':
    main()
