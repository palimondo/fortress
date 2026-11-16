#!/usr/bin/env python3
"""boot_cost.py counts what a boot of the coordinating session costs in context
tokens: (1) from the sizes of the files that each step of the boot reads, today
and at earlier dates (from git); (2) as measured in the transcript, the context
of the first API call after each compaction and of the last call of the boot.

    python3 scripts/boot_cost.py                 # the steps' sizes today, their growth, the measured boots
    python3 scripts/boot_cost.py --boot C:16094  # one boot, call by call: what was read, its size, the context after

How it counts.
  A file's cost in tokens is its bytes divided by BYTES_PER_TOKEN, a figure
  that this script measures from the boots themselves (the context's growth
  over the whole-file reads, divided by the characters read).
  The context of an API call is its input tokens plus the tokens read from and
  written to the prompt cache, as the transcript's usage field gives them.
  A boot ends at the first message of the curator's, or the first notice of a
  worker, that comes after its fifth tool call.
What it cannot show: what the boot's reading is worth; the cost of the
re-attached copies in tokens exactly (they are part of the first call's
context, with the summary and the system prompt).
"""
import collections, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib, boots

C = 'explorations/coordinator/'
STEPS = [  # (step of the boot, what it reads, files; a trailing '#1' = the file's first section only)
    ('the two cores, by the Skill tool', ['.claude/skills/fortress-repo/SKILL.md', '.claude/skills/coordinator/SKILL.md', 'Library/FlatString.fss']),
    ('1  FACTS', [C + 'FACTS.md']),
    ('1  POSITIONS', [C + 'POSITIONS.md']),
    ('1  INDEX', [C + 'INDEX.md']),
    ('3  PLAN, first section', [C + 'PLAN.md#1']),
    ('4  boot note', [C + 'BOOT.md']),
    ('4  held list', [C + 'HELD.md']),
    ('6  batch.md (a batch runs)', ['.claude/skills/coordinator/references/batch.md']),
    ('7  delegating.md', ['.claude/skills/coordinator/references/delegating.md']),
    ('   his profile, once after a boot', [C + 'curator-profile/PROFILE.md']),
]
DATES = ['2026-10-14', '2026-10-23', '2026-11-01', '2026-11-08', '2026-11-12', '2026-11-16T23']
LIGHT = {'the two cores, by the Skill tool', '3  PLAN, first section', '4  boot note', '4  held list', '6  batch.md (a batch runs)', '7  delegating.md'}

def git(*args):
    return subprocess.run(['git', '-C', tlib.REPO] + list(args), capture_output=True, text=True).stdout

def size_at(commit, spec):
    path, _, part = spec.partition('#')
    text = git('show', '%s:%s' % (commit, path))
    if part:   # the first section: up to the second heading of level two
        heads = [m.start() for m in re.finditer(r'^## ', text, re.M)]
        if len(heads) >= 2:
            text = text[:heads[1]]
    return len(text.encode())

def spans():
    """For each boot: (interval, ctx of its first call, ctx of its last call, the calls [(ts, ref, ctx, [(tool, target, chars)])])."""
    ev = tlib.load_events({'boundary', 'reply', 'result', 'his', 'prompt'})
    results = {e['id']: e for e in ev if e['k'] == 'result'}
    ivs = {iv.ref: iv for iv in boots.build() if iv.b}
    out, cur = [], None
    for e in ev:
        k = e['k']
        if k == 'boundary':
            cur = {'iv': ivs[e['ref']], 'calls': [], 'ntools': 0, 'open': True}
            out.append(cur)
        elif cur and cur['open']:
            if k in ('his', 'prompt') and cur['ntools'] >= 5 and (k == 'his' or e['origin'] in ('peer', 'task-notification')):
                cur['open'] = False
            elif k == 'reply' and e['model'] != '<synthetic>':
                calls = cur['calls']
                if not calls or calls[-1]['rid'] != e.get('rid') or not e.get('rid'):
                    calls.append({'rid': e.get('rid'), 'ts': e['ts'], 'ref': e['ref'], 'ctx': e['ctx'], 'tools': []})
                for t in e['tools']:
                    cur['ntools'] += 1
                    inp = t.get('inp') or {}
                    target = inp.get('file_path') or inp.get('skill') or ' '.join((inp.get('command') or inp.get('description') or '').split())[:70]
                    calls[-1]['tools'].append((t['name'], target, results.get(t['id'], {}).get('chars', 0)))
    return [s for s in out if s['calls']]

def main():
    args = sys.argv[1:]
    sp = spans()
    if '--boot' in args:
        ref = args[args.index('--boot') + 1]
        for s in sp:
            if s['iv'].ref == ref:
                print('boot %s %s (%s): the context after each API call, and what the call read' % (tlib.fmt_ts(s['iv'].ts), ref, s['iv'].kind()))
                calls = s['calls']
                for i, c in enumerate(calls):
                    nxt = calls[i + 1]['ctx'] if i + 1 < len(calls) else None
                    for name, target, chars in c['tools'] or [('(text)', '', 0)]:
                        print('  %s %-9s context %4dK  then +%-5s %-6s %6d chars  %s' % (
                            c['ts'][11:19], c['ref'], c['ctx'] // 1000, ('%dK' % ((nxt - c['ctx']) // 1000)) if nxt is not None else '?', name, chars,
                            (target or '').replace('/home/user/fortress/', '')[:80]))
        return
    # the bytes per token, measured over the whole-file reads of FACTS, POSITIONS and INDEX in every boot
    tok = chars = 0
    for s in sp:
        calls = s['calls']
        for i, c in enumerate(calls[:-1]):
            if c['tools'] and all(n == 'Read' and re.search(r'(FACTS|POSITIONS|INDEX)\.md$', t or '') and ch > 20000 for n, t, ch in c['tools']):
                tok += calls[i + 1]['ctx'] - c['ctx']
                chars += sum(ch for _, _, ch in c['tools'])
    bpt = chars / float(tok) if tok else 2.75
    print('Measured over the reads of FACTS, POSITIONS and INDEX in all boots: %.1fM characters cost %.2fM tokens, %.2f characters a token.' % (chars / 1e6, tok / 1e6, bpt))
    print('(A Read result carries line numbers, so a file\'s bytes cost a little more than its bytes divided by this.)\n')
    commits = [(d, git('rev-list', '-1', '--before=%s' % d, 'main').strip()) for d in DATES]
    print('== what each step reads, in thousands of bytes, at the commit before each date (the last column is today, in tokens at %.2f bytes a token)' % bpt)
    print('  %-36s %s   tokens today' % ('step', '  '.join('%7s' % d[5:10] for d, _ in commits)))
    tot = [0] * len(commits); light = [0] * len(commits)
    for name, files in STEPS:
        row = []
        for i, (d, c) in enumerate(commits):
            n = sum(size_at(c, f) for f in files) if c else 0
            row.append(n); tot[i] += n
            if name in LIGHT:
                light[i] += n
        print('  %-36s %s   %5.0fK' % (name, '  '.join('%6.0fK' % (n / 1000.0) for n in row), row[-1] / bpt / 1000))
    print('  %-36s %s   %5.0fK' % ('all steps (a full boot)', '  '.join('%6.0fK' % (n / 1000.0) for n in tot), tot[-1] / bpt / 1000))
    print('  %-36s %s   %5.0fK' % ('the light boot\'s steps', '  '.join('%6.0fK' % (n / 1000.0) for n in light), light[-1] / bpt / 1000))
    print('\n== the measured boots since 2026-10-22: the context at the first call after the compaction, at the boot\'s last call, and the growth')
    by = collections.defaultdict(list)
    for s in sp:
        iv = s['iv']
        if iv.ts < '2026-10-22T22:56':
            continue
        a, b = s['calls'][0]['ctx'], s['calls'][-1]['ctx']
        kind = iv.kind().rstrip('*')
        by[kind].append(b - a)
        if '--all' in args or iv.ts >= '2026-11-08T15:38':
            print('  %s %-9s %-9s %-5s first call %4dK  last call %4dK  growth %4dK  (%d API calls)' % (
                tlib.fmt_ts(iv.ts), iv.ref, iv.model(), kind, a // 1000, b // 1000, (b - a) // 1000, len(s['calls'])))
    for kind, v in sorted(by.items()):
        v.sort()
        print('  %-5s boots %2d  growth: median %4dK, least %4dK, most %4dK' % (kind, len(v), v[len(v) // 2] // 1000, v[0] // 1000, v[-1] // 1000))
    first = sorted(s['calls'][0]['ctx'] for s in sp if s['iv'].ts >= '2026-10-22T22:56')
    print('  the first call after a compaction (the summary, the system prompt, the re-attached skills and files): median %dK, least %dK, most %dK' % (
        first[len(first) // 2] // 1000, first[0] // 1000, first[-1] // 1000))

if __name__ == '__main__':
    main()
