#!/usr/bin/env python3
"""context_at.py counts nothing new: for one boot it prints what the coordinator
had in context, so that a guess about why a rule was not followed can be
checked at the source. For the boot of 2026-11-16 00:22 UTC (the default) it
prints: (1) what the compaction's summary said about the skills, their parts
and the boot; (2) what the boot note said that the light boot reads, at the
commit before the compaction; (3) what the harness re-attached and what the
boot loaded; (4) for each message of the curator's until the next compaction,
the context's size, the parts of the skills in context at that moment, and
the searches of the record made since the compaction.

    python3 scripts/context_at.py [BOUNDARY_REF]      # default C:13841

What it cannot show: what the model attended to. A text in context was
available; whether it was used is not in the transcript.
"""
import os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib, boots

WORDS = re.compile(r'skill|references/|loaded|light boot|boot light|router|\b(delegating|road|record|analysis|batch|committing|records|stops)\.md|full boot', re.I)

def main():
    ref = sys.argv[1] if len(sys.argv) > 1 else 'C:13841'
    ivs = [iv for iv in boots.build() if iv.b]
    i = [n for n, iv in enumerate(ivs) if iv.ref == ref][0]
    iv, prev = ivs[i], ivs[i - 1]
    end = ivs[i + 1].ts if i + 1 < len(ivs) else '9'
    ev = tlib.load_events({'summary', 'reply', 'his', 'att'})
    summ = [e for e in ev if e['k'] == 'summary' and iv.ts[:16] <= e['ts'][:16] <= iv.ts[:16] + '~'][0]
    print('boot %s %s, %s, context before the compaction %dK' % (tlib.fmt_ts(iv.ts), ref, iv.model(), (iv.b.get('pre') or 0) // 1000))
    print('\n1. The summary (%s, %d characters): its lines that name a skill, a part, a load or a boot (each cut at 260 characters)' % (summ['ref'], summ['chars']))
    for m in re.finditer(r'[^\n]+', summ['text']):
        line = ' '.join(m.group(0).split())
        if WORDS.search(line) and not line.startswith('<tools-used'):
            print('   @%-5d %s' % (m.start(), line[:260]))
    named = sorted(set(re.findall(r'references/([a-z-]+)\.md', summ['text'])))
    print('   parts that the summary names as a file: %s' % (', '.join(named) or 'none'))
    print('\n2. The parts loaded in the interval before it (boot %s %s, %s): %s' % (
        tlib.fmt_ts(prev.ts), prev.ref, prev.kind(),
        ', '.join(sorted(p for p, ls in prev.loads.items() if any(not h.startswith('re-attached') for _, _, h in ls))) or 'none'))
    commit = subprocess.run(['git', '-C', tlib.REPO, 'log', '-1', '--format=%h %cI', '--before=%s' % iv.ts, '--', 'explorations/coordinator/BOOT.md'],
                            capture_output=True, text=True).stdout.split()
    if commit:
        note = subprocess.run(['git', '-C', tlib.REPO, 'show', '%s:explorations/coordinator/BOOT.md' % commit[0]], capture_output=True, text=True).stdout
        print('\n3. The boot note at commit %s (%s, %d characters): its lines that name a boot or a part' % (commit[0], commit[1][:16], len(note)))
        for n, line in enumerate(note.split('\n'), 1):
            if re.search(r'light boot|full boot|references/[a-z-]+\.md', line):
                m = re.search(r'light boot|full boot|references/[a-z-]+\.md', line)
                a = max(0, m.start() - 60)
                print('   line %-3d ...%s' % (n, ' '.join(line[a:a + 330].split())))
        print('   parts that the boot note names as a file: %s' % ', '.join(sorted(set(re.findall(r'references/([a-z-]+)\.md', note)))))
    print('\n4. What the harness re-attached at the compaction, and what the boot loaded:')
    for ts, part, r, how in sorted((ts, part, r, how) for part, ls in iv.loads.items() for ts, r, how in ls):
        print('   %s %-9s %-28s %s' % (tlib.fmt_ts(ts), r, part, how))
    for e in ev:
        if e['k'] == 'att' and e['atype'] in ('file', 'file_reference') and iv.ts <= e['ts'] <= iv.ts[:17] + '99':
            print('   %s %-9s %-60s %s' % (tlib.fmt_ts(e['ts']), e['ref'], (e.get('path') or '').replace('/home/user/fortress/', ''),
                                           'file re-attached, %d characters' % e['chars'] if e['atype'] == 'file' else 'named only: "read before the compaction", no content'))
        if e['k'] == 'att' and e['atype'] == 'skills' and iv.ts <= e['ts'] <= iv.ts[:17] + '99':
            for s in e['skills']:
                print('   %s %-9s skill %-18s re-attached, %d characters%s' % (tlib.fmt_ts(e['ts']), e['ref'], s['name'], s['chars'],
                      ' (cut: the copy ends "...%s")' % ' '.join(s['tail'].split())[-70:] if s['chars'] >= 20000 else ''))
    print('\n5. At each message of his: the context, the parts in context (loaded since the compaction), the searches of FACTS, POSITIONS or INDEX so far')
    ctx, searches = 0, 0
    for e in ev:
        if not (iv.ts <= e['ts'] < end):
            continue
        if e['k'] == 'reply':
            ctx = e['ctx'] or ctx
            searches += sum(1 for t in e['tools'] if tlib.is_decision_search(t))
        elif e['k'] == 'his':
            t = e['text'].strip()
            if not t or t.startswith('<'):
                continue
            parts = sorted({p.split('/')[1] if not p.endswith('CORE') else p.split('/')[0] + ' core' for p, ls in iv.loads.items()
                            if any(lts <= e['ts'] and not h.startswith('re-attached') for lts, _, h in ls)})
            whole = iv.whole_at()
            print('   %s %-8s %4dK  searches %2d  record whole: %-3s parts: %s' % (tlib.fmt_ts(e['ts']), e['ref'], ctx // 1000, searches,
                  'yes' if whole and whole <= e['ts'] else 'no', ', '.join(parts)))

if __name__ == '__main__':
    main()
