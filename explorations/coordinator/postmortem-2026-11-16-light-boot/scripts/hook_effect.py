#!/usr/bin/env python3
"""hook_effect.py counts what the reminder hook of 2026-11-10 did
(.claude/hooks/curator-words-reminder.sh, landed 07:08 UTC, commit 11ec650a16):
how often it fired, what the coordinator did in the same turn after a fire, and
whether the errors that it aims at (the curator's words recorded wrongly, his
position and the coordinator's proposal mixed up) became rarer in his
corrections. It also counts how often a hook of the same kind would fire that
names the part to load at the first act of a kind after a compaction.

    python3 scripts/hook_effect.py

How it counts.
  A fire: the harness's record of the hook's added context after a Bash, Edit
  or Write call ("You wrote to the held list, the boot note or the decisions").
  After a fire, in the same turn: "re-read his words" is a later tool call that
  reads the transcript or the page comments, or launches a worker whose brief
  names his words or his messages; "wrote again" is a later write to the held
  list, the boot note or POSITIONS.
  The errors: the labels of corrections.py, kinds F, 2, 6 and 4.
What it cannot show: a line that the hook made right before it was written
wrong (no trace); whether a second write corrected the first; errors that he
did not catch.
"""
import collections, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib, boots, corrections

LANDED = '2026-11-10T07:08'
REREAD = re.compile(r'7168a172765d\.jsonl|view\.py|transcripts-blinded|transcripts/projects', re.I)
HIS = re.compile(r'his (own )?(words|messages)|the curator\'s (own )?(words|messages)|transcript', re.I)
WROTE = re.compile(r'(HELD|BOOT|POSITIONS)\.md|record\.py')

def main():
    ev = tlib.load_events({'att', 'reply', 'his', 'prompt'})
    fires = []      # [ts, ref, started by him?, reread, wrote again]
    turn_by_him = False
    open_fires = []
    last_target = set()
    for e in ev:
        k = e['k']
        if k == 'his':
            turn_by_him, open_fires = True, []
        elif k == 'prompt':
            if e['origin'] in ('peer', 'task-notification') or e['head'].startswith('Stop hook'):
                turn_by_him, open_fires = False, []
        elif k == 'att' and e['atype'] == 'hook' and e.get('event') == 'PostToolUse' and e['text'].startswith('You wrote to the held list'):
            f = [e['ts'], e['ref'], turn_by_him, False, False, last_target]
            fires.append(f); open_fires.append(f)
        elif k == 'reply':
            for t in e['tools']:
                inp = t.get('inp') or {}
                cmd = inp.get('command') or ''
                named = set(re.findall(r'(HELD|BOOT|POSITIONS)\.md|(record)\.py', cmd + ' ' + (inp.get('file_path') or '')))
                if named and t['name'] in ('Bash', 'Edit', 'Write'):
                    last_target = {a or b for a, b in named}       # what the call that the hook follows names
                reread = bool(REREAD.search(cmd)) or t['name'] == 'ArtifactComments' or bool(t['name'] in ('Agent', 'Task') and HIS.search(inp.get('prompt') or ''))
                wrote = bool(WROTE.search(cmd + ' ' + (inp.get('file_path') or ''))) and bool(t['name'] in ('Edit', 'Write') or re.search(r'record\.py|>|sed -i|python3 -', cmd))
                for f in open_fires:
                    if e['ts'] > f[0]:
                        f[3] = f[3] or reread
                        f[4] = f[4] or wrote
    n = len(fires)
    print('1. The hook fired %d times from %s to %s.' % (n, tlib.fmt_ts(fires[0][0]), tlib.fmt_ts(fires[-1][0])))
    days = collections.Counter(f[0][:10] for f in fires)
    print('   by day: ' + ', '.join('%s %d' % (d[5:], c) for d, c in sorted(days.items())))
    him = [f for f in fires if f[2]]
    print('   in a turn that a message of his started: %d; in a turn that a worker\'s notice, a check-in or a hook started: %d' % (len(him), n - len(him)))
    print('   after a fire, in the same turn: re-read his words %d (%d%%), wrote again to the held list, the boot note or POSITIONS %d (%d%%), neither %d (%d%%)' % (
        sum(f[3] for f in fires), 100 * sum(f[3] for f in fires) // n, sum(f[4] for f in fires), 100 * sum(f[4] for f in fires) // n,
        sum(1 for f in fires if not f[3] and not f[4]), 100 * sum(1 for f in fires if not f[3] and not f[4]) // n))
    print('   in the turns that he started: re-read %d of %d, wrote again %d of %d' % (sum(f[3] for f in him), len(him), sum(f[4] for f in him), len(him)))
    only_boot = sum(1 for f in fires if f[5] == {'BOOT'})
    print('   the call that it followed named the boot note alone in %d fires (%d%%), the held list in %d, POSITIONS or record.py in %d' % (
        only_boot, 100 * only_boot // n, sum(1 for f in fires if 'HELD' in f[5]), sum(1 for f in fires if f[5] & {'POSITIONS', 'record'})))
    # the errors it aims at, before and after, from the labels
    lab = corrections.labels()
    lo, hi = corrections.WINDOW
    msgs = [x for x in corrections.his_messages() if lo <= x[0] <= hi + '~']
    print('\n2. The errors that it aims at, in his labelled corrections (%s to %s), before and after it landed:' % (lo[:10], hi[:10]))
    for name, pick in (('before', lambda ts: ts < LANDED), ('after', lambda ts: ts >= LANDED)):
        part = [x for x in msgs if pick(x[0])]
        c = collections.Counter()
        for ts, r, t, m in part:
            if corrections.markers_of(t):
                for kd in lab.get(r, '-').split(','):
                    c[kd] += 1
        aimed = c['F'] + c['2'] + c['6'] + c['4']
        print('   %-6s his messages %4d | F (his words recorded wrongly, his intent misread) %d | 2 (a claim about his words) %d | 6 (his position as the coordinator\'s proposal) %d | 4 (a decision not written down) %d | together %d, %.1f per 100' % (
            name, len(part), c['F'], c['2'], c['6'], c['4'], aimed, 100.0 * aimed / len(part)))
    # a hook that names the part at the first act of a kind after a compaction: how often would it fire
    print('\n3. A hook that names the part to load at the first act of a kind after a compaction: the times it would have fired')
    print('   (the part was not in context at the first act), for each boot since 2026-10-13, by model:')
    ivs = [iv for iv in boots.build() if iv.b and iv.ts >= '2026-10-13T19:22']
    own = ['record-edit', 'worker-launch', 'batch-step']
    by = collections.defaultdict(lambda: [0, 0, 0, 0])
    for iv in ivs:
        b = by[iv.model()]
        b[0] += 1
        for kind in tlib.KIND_ORDER:
            if iv.acts.get(kind) and kind not in ('restart', 'next-asked'):
                absent = iv.state(kind, iv.acts[kind][0][0]) == 'absent'
                if kind in own:
                    b[1] += absent
                else:
                    b[2] += absent
                b[3] += 1
    for m, (nb, a, o, tot) in sorted(by.items()):
        print('   %-9s boots %2d | on a record edit, a worker\'s launch or a batch step: %2d fires (%.1f a boot) | on the other kinds (an analysis, a skill change, check-ins, a commit, a query): %3d fires (%.1f a boot)' % (
            m, nb, a, a / float(nb), o, o / float(nb)))

if __name__ == '__main__':
    main()
