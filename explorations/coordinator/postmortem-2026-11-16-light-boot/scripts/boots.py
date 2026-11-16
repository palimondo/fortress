#!/usr/bin/env python3
"""boots.py counts, for each boot of the coordinating session (each compaction;
the stretch from one compaction to the next is called an interval here): which
parts of the three skills came into context and when, and, for each kind of
work that a part governs, whether that part was in context at the first act of
the kind in the interval. It sums these by the model that served the interval
and by the era of the coordinator skill.

    python3 scripts/boots.py                 # the sums by model and era
    python3 scripts/boots.py --boots         # one line for each boot (light* = he did not say "light"; light+ = FACTS
                                             # and POSITIONS were read whole later in the interval, as at a landing)
    python3 scripts/boots.py --boot C:13841  # one interval: every load, every first act
    python3 scripts/boots.py --since 2026-11-08T15:38   # only boots from that time

What a line counts.
  A load of a part: a Read call on its file (whole or in part), a Skill call
  (the skill's core, whole), or a Bash call that prints the file or a section
  of it (cat, sed -n, awk, head, tail; a grep or a wc is not a load). After a
  compaction the harness itself re-attaches some files (marked "re-attached")
  and the cores of the skills that were invoked (marked "cut" when the copy was
  cut at 20,000 characters).
  An act: a tool call of a kind that tlib.act_kinds() names. The kinds and the
  part that governs each are tlib.GOVERNS. Two kinds are found here instead:
  "restart", the harness's notice that the container or the session's process
  was restarted (tlib.RESTART_RE); and "next-asked", a short message of his
  asking what comes next (tlib.NEXT_RE). For these two the part counts as in
  context if it was loaded by the end of the turn that answers.
  In context at the first act: the governing part was loaded or re-attached
  after the interval's compaction and before the act.
What it cannot show: whether a part that was in context was followed; work of a
kind that leaves no tool call (a choice of what comes next, a claim in chat);
and a part read by a worker on the coordinator's behalf.
"""
import collections, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib

ERAS = [  # (from, name): the coordinator skill's rules that bear on loading
    ('2026-10-13T19:22', 'E1 core and six parts (from 10-13)'),
    ('2026-10-22T22:56', 'E2 light boot allowed (from 10-22)'),
    ('2026-11-02T22:03', 'E3 boot step loads delegating.md (from 11-02)'),
    ('2026-11-08T15:38', 'E4 the skill as it stands (from 11-08)'),
]

def era_of(ts):
    name = 'E0 before the rewrite'
    for start, n in ERAS:
        if ts >= start:
            name = n
    return name

class Interval:
    def __init__(self, boundary):
        self.b = boundary
        self.ts = boundary['ts'] if boundary else ''
        self.ref = boundary['ref'] if boundary else 'start'
        self.models = collections.Counter()
        self.loads = collections.defaultdict(list)     # part -> [(ts, ref, how)]
        self.acts = collections.defaultdict(list)      # kind -> [(ts, ref)]
        self.his = []                                  # [(ts, ref, text)]
        self.record_reads = []                         # Reads of FACTS/POSITIONS/INDEX: (ts, name, n tool calls since boundary)
        self.ntools = 0
        self.ctx = []                                  # (ts, ctx)
        self.said_light = False
        self.span_end = None                           # the boot ends at his first message, or a worker's notice, after its fifth tool call

    def model(self):
        return tlib.tier(self.models.most_common(1)[0][0]) if self.models else '?'

    def kind(self):
        """full: FACTS and POSITIONS were read before the boot ended; light: they were not."""
        end = self.span_end or '9'
        early = {n for ts, n, i in self.record_reads if ts <= end}
        return 'full' if {'FACTS.md', 'POSITIONS.md'} <= early else 'light'

    def whole_at(self):
        """The time from which FACTS and POSITIONS have both been read in this interval, or None."""
        first = {}
        for ts, n, i in self.record_reads:
            first.setdefault(n, ts)
        return max(first['FACTS.md'], first['POSITIONS.md']) if 'FACTS.md' in first and 'POSITIONS.md' in first else None

    def state(self, kind, ts):
        """Was a governing part of this kind in context at ts?"""
        best = 'absent'
        for part in tlib.GOVERNS[kind]:
            for lts, ref, how in self.loads.get(part, []):
                if lts <= ts:
                    if how.startswith('re-attached'):
                        best = 're-attached' if best == 'absent' else best
                    else:
                        best = 'loaded'
        return best

    def later_load(self, kind, ts):
        for part in tlib.GOVERNS[kind]:
            for lts, ref, how in self.loads.get(part, []):
                if lts > ts and not how.startswith('re-attached'):
                    return lts, ref
        return None

def build():
    ev = tlib.load_events({'boundary', 'reply', 'result', 'att', 'his', 'prompt'})
    results = {e['id']: e for e in ev if e['k'] == 'result'}
    ivs = [Interval(None)]
    pending = []             # [(kind, event)]: a restart's notice or a question of his, until the turn that answers it ends
    last_reply = None
    for e in ev:
        k = e['k']
        iv = ivs[-1]
        if k in ('his', 'prompt', 'boundary') and pending and last_reply and last_reply['ts'] > pending[-1][1]['ts'] \
                and not (k == 'prompt' and e['origin'] in ('meta', 'none') and not tlib.RESTART_RE.search(e['head'])):
            # the turn that answered has ended: the act is its last reply, indexed by what started it
            for kind, start in pending:
                ivs[-1].acts[kind].append((last_reply['ts'], start['ref']))
            pending = []
        if k in ('his', 'prompt') and iv.span_end is None and iv.ntools >= 5 and (k == 'his' or e['origin'] in ('peer', 'task-notification')):
            iv.span_end = e['ts']
        if k == 'boundary':
            ivs.append(Interval(e))
        elif k == 'prompt':
            if tlib.RESTART_RE.search(e['head']):
                pending.append(('restart', e))
        elif k == 'his':
            iv.his.append((e['ts'], e['ref'], e['text']))
            if tlib.NEXT_RE.search(e['text']) and len(e['text']) < 300:
                pending.append(('next-asked', e))
            if iv.b and e['ts'] < iv.b['ts'][:11] + '99' and re.search(r'\blight\b', e['text'], re.I) and len(iv.his) <= 2 and len(e['text']) < 400:
                iv.said_light = True
        elif k == 'att':
            if e['atype'] == 'file':
                p = tlib.part_of(e.get('path'))
                if p:
                    whole = e.get('num') == e.get('total')
                    iv.loads[p].append((e['ts'], e['ref'], 're-attached' + ('' if whole else ' in part')))
            elif e['atype'] == 'skills':
                for s in e['skills']:
                    if s['name'] in ('coordinator', 'fortress-repo', 'cloud-container'):
                        iv.loads[s['name'] + '/CORE'].append((e['ts'], e['ref'], 're-attached cut' if s['chars'] >= 20000 else 're-attached'))
        elif k == 'reply':
            last_reply = e
            if e['model'] != '<synthetic>':
                iv.models[e['model']] += 1
                iv.ctx.append((e['ts'], e['ctx']))
            for t in e['tools']:
                iv.ntools += 1
                name, inp = t['name'], t.get('inp') or {}
                if name == 'Read':
                    path = inp.get('file_path') or ''
                    p = tlib.part_of(path)
                    r = results.get(t['id'], {}).get('file') or {}
                    if p:
                        whole = r.get('total') is not None and r.get('num') == r.get('total')
                        iv.loads[p].append((e['ts'], e['ref'], 'Read' if whole else 'Read in part'))
                    m = re.search(r'coordinator/(FACTS|POSITIONS|INDEX)\.md$', path)
                    if m:
                        iv.record_reads.append((e['ts'], m.group(1) + '.md', iv.ntools))
                elif name == 'Skill':
                    s = inp.get('skill') or ''
                    if s in ('coordinator', 'fortress-repo', 'cloud-container'):
                        iv.loads[s + '/CORE'].append((e['ts'], e['ref'], 'Skill'))
                elif name == 'Bash':
                    cmd = inp.get('command') or ''
                    how = tlib.bash_read(cmd)
                    if how:
                        for m in tlib.PART_RE.finditer(cmd):
                            iv.loads[tlib.part_of(m.group(0))].append((e['ts'], e['ref'], how))
                for kind in tlib.act_kinds(t):
                    iv.acts[kind].append((e['ts'], e['ref']))
    return ivs

def short(part):
    return part.replace('coordinator/', 'c/').replace('fortress-repo/', 'f/').replace('cloud-container/', 'cc/')

def main():
    args = sys.argv[1:]
    since = args[args.index('--since') + 1] if '--since' in args else '2026-10-13T19:22'
    ivs = [iv for iv in build() if iv.b]
    if '--boot' in args:
        ref = args[args.index('--boot') + 1]
        for iv in ivs:
            if iv.ref == ref:
                print('boot %s %s  %s  %s  context before %sK' % (tlib.fmt_ts(iv.ts), iv.ref, iv.model(), iv.kind(), (iv.b.get('pre') or 0) // 1000))
                print('loads, in order:')
                for ts, part, r, how in sorted((ts, part, r, how) for part, ls in iv.loads.items() for ts, r, how in ls):
                    print('  %s %-9s %-26s %s' % (tlib.fmt_ts(ts), r, part, how))
                print('first act of each kind, and whether its part was in context:')
                for kind in tlib.KIND_ORDER:
                    if iv.acts.get(kind):
                        ts, r = iv.acts[kind][0]
                        st = iv.state(kind, ts)
                        later = iv.later_load(kind, ts) if st == 'absent' else None
                        n_before = sum(1 for ats, _ in iv.acts[kind] if not later or ats < later[0]) if st == 'absent' else 0
                        print('  %-13s %s %-9s %-11s part: %-34s %s' % (kind, tlib.fmt_ts(ts), r, st, ' or '.join(tlib.GOVERNS[kind]),
                              ('(%d acts before its load at %s %s)' % (n_before, tlib.fmt_ts(later[0]), later[1]) if later else '(%d acts, never loaded)' % len(iv.acts[kind])) if st == 'absent' else ''))
        return
    ivs = [iv for iv in ivs if iv.ts >= since]
    if '--boots' in args:
        for iv in ivs:
            parts = []
            for part, ls in sorted(iv.loads.items(), key=lambda x: x[1][0][0]):
                real = [h for _, _, h in ls if not h.startswith('re-attached')]
                parts.append(short(part) + ('' if real else '(r)'))
            gaps = []
            for kind in tlib.KIND_ORDER:
                if iv.acts.get(kind):
                    st = iv.state(kind, iv.acts[kind][0][0])
                    gaps.append('%s:%s' % (kind, {'loaded': 'yes', 're-attached': 're', 'absent': 'NO'}[st]))
            ctx0 = iv.ctx[0][1] // 1000 if iv.ctx else 0
            print('%s %-9s %-9s %-6s pre %3dK first %3dK his %3d | %s | %s' % (
                tlib.fmt_ts(iv.ts), iv.ref, iv.model(), iv.kind() + ('' if iv.kind() == 'full' or iv.said_light else '*') + ('+' if iv.kind() == 'light' and iv.whole_at() else ''),
                (iv.b.get('pre') or 0) // 1000, ctx0, len(iv.his),
                ' '.join(parts), ' '.join(gaps)))
        return
    # the sums
    print('Boots from %s. An interval counts for a kind of work if it holds an act of that kind.' % since)
    print('yes = the governing part was loaded after the compaction and before the first act;')
    print('re  = only the copy that the harness re-attached was there; NO = the part was not in context.\n')
    for group_name, key in (('by model', lambda iv: iv.model()),
                            ('by model and era', lambda iv: '%-9s %s' % (iv.model(), era_of(iv.ts))),
                            ('by model and kind of boot (full: FACTS and POSITIONS read before the boot ended; light: not)',
                             lambda iv: '%-9s %s' % (iv.model(), iv.kind().rstrip('*')))):
        print('== %s' % group_name)
        groups = collections.defaultdict(list)
        for iv in ivs:
            groups[key(iv)].append(iv)
        for g in sorted(groups):
            tot = collections.Counter()
            lines = []
            for kind in tlib.KIND_ORDER:
                c = collections.Counter()
                for iv in groups[g]:
                    if iv.acts.get(kind):
                        c[iv.state(kind, iv.acts[kind][0][0])] += 1
                n = sum(c.values())
                if n:
                    lines.append('    %-13s yes %2d  re %2d  NO %2d  of %2d' % (kind, c['loaded'], c['re-attached'], c['absent'], n))
                    tot.update(c)
            n = sum(tot.values())
            print('  %s: %d boots; first acts with the part loaded %d of %d (%d%%), re-attached only %d, absent %d (%d%%)' % (
                g, len(groups[g]), tot['loaded'], n, 100 * tot['loaded'] // max(n, 1), tot['re-attached'], tot['absent'], 100 * tot['absent'] // max(n, 1)))
            if '--kinds' in args or group_name == 'by model':
                print('\n'.join(lines))
        print()
    # how many parts a boot loads
    print('== parts loaded by a Read, Skill or cat in an interval (cores not counted), by model: median, and the boots with none')
    by = collections.defaultdict(list)
    for iv in ivs:
        n = sum(1 for part, ls in iv.loads.items() if not part.endswith('/CORE') and any(not h.startswith('re-attached') for _, _, h in ls))
        by[iv.model()].append(n)
    for m, ns in sorted(by.items()):
        ns.sort()
        print('  %-9s boots %2d  median %d  none in %d' % (m, len(ns), ns[len(ns) // 2], sum(1 for n in ns if n == 0)))
    print('\n== the cores reloaded with the Skill tool after a compaction, by model (the hook asks for both)')
    by = collections.defaultdict(lambda: [0, 0, 0])
    for iv in ivs:
        b = by[iv.model()]
        b[0] += 1
        b[1] += any(h == 'Skill' for _, _, h in iv.loads.get('coordinator/CORE', []))
        b[2] += any(h == 'Skill' for _, _, h in iv.loads.get('fortress-repo/CORE', []))
    for m, (n, c, f) in sorted(by.items()):
        print('  %-9s boots %2d  coordinator core reloaded in %2d  fortress-repo core in %2d' % (m, n, c, f))

    print('\n== the same, by era, for Opus 5.5 (the compaction hook has asked for the Skill tool since 2026-10-22 23:11)')
    by = collections.defaultdict(lambda: [0, 0])
    for iv in ivs:
        if iv.model() == 'Opus 5.5':
            b = by['before 10-22 23:11' if iv.ts < '2026-10-22T23:11' else 'from 10-22 23:11']
            b[0] += 1
            b[1] += any(h == 'Skill' for _, _, h in iv.loads.get('coordinator/CORE', []))
    for era, (n, c) in sorted(by.items()):
        print('  %-18s boots %2d  coordinator core reloaded in %2d' % (era, n, c))
    print('\n== each part of the coordinator skill: the boots in whose interval it was loaded at all (a Read, or a cat), by model')
    parts = ['delegating', 'batch', 'road', 'record', 'skill-rewrite', 'analysis']
    by = collections.defaultdict(lambda: collections.Counter())
    for iv in ivs:
        by[iv.model()]['boots'] += 1
        for part in parts:
            if any(not h.startswith('re-attached') for _, _, h in iv.loads.get('coordinator/' + part, [])):
                by[iv.model()][part] += 1
    for m, c in sorted(by.items()):
        print('  %-9s boots %2d | %s' % (m, c['boots'], '  '.join('%s %d' % (part, c[part]) for part in parts)))
    print('\n== the six kinds of work that the brief names, and the three of them that leave a sure trace (a record edit, a worker\'s launch, a batch step)')
    for m in sorted({iv.model() for iv in ivs}):
        six, three = collections.Counter(), collections.Counter()
        for iv in ivs:
            if iv.model() != m:
                continue
            for kind in tlib.BRIEF_KINDS:
                if iv.acts.get(kind):
                    st = iv.state(kind, iv.acts[kind][0][0])
                    six[st] += 1
                    if kind in ('record-edit', 'worker-launch', 'batch-step'):
                        three[st] += 1
        n6, n3 = sum(six.values()), sum(three.values())
        print('  %-9s six kinds: part loaded at the first act %2d of %3d (%d%%) | three kinds: %2d of %2d (%d%%)' % (
            m, six['loaded'], n6, 100 * six['loaded'] // max(n6, 1), three['loaded'], n3, 100 * three['loaded'] // max(n3, 1)))
    print('\n== a test on the record at hand: the boot has had a step "Load references/delegating.md" since 2026-11-02 22:03 (commit 5114bfeceb).')
    print('   delegating.md in context at the first launch of a worker after a boot, before and after that step, all models:')
    for name, pick in (('before the step (10-13 to 11-02)', lambda iv: iv.ts < '2026-11-02T22:03'), ('with the step (from 11-02)', lambda iv: iv.ts >= '2026-11-02T22:03')):
        c = collections.Counter()
        for iv in ivs:
            if pick(iv) and iv.acts.get('worker-launch'):
                c[iv.state('worker-launch', iv.acts['worker-launch'][0][0])] += 1
        n = sum(c.values())
        print('   %-34s loaded %2d of %2d (%d%%), re-attached only %d, absent %d' % (name, c['loaded'], n, 100 * c['loaded'] // max(n, 1), c['re-attached'], c['absent']))

if __name__ == '__main__':
    main()
