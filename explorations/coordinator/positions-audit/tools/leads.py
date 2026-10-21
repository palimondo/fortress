#!/usr/bin/env python3
"""leads.py: what a scout starts from, for one entry of POSITIONS.md.

    python3 -I leads.py 86
    python3 -I leads.py 86 --window 30m --cut 3000

Prints trail.py's output for the entry, then, for each commit that created, changed, re-created
or restored its text, near.py's output for the window before the commit's author time (default
30 minutes): his messages in it, each with the coordinator's last text before it. Texts are cut
at --cut characters (default 1500; 0 prints them whole); `near.py <time>` prints one window whole.
A message already printed for an earlier commit is named, not printed again. Last, the times of
his words that the entry's history blocks name, for near.py or show.py to read.
"""
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plib  # noqa: E402
import tlib  # noqa: E402
import trail as trail_mod  # noqa: E402
import near as near_mod  # noqa: E402


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    minutes, n = 30, 1500
    if '--window' in argv:
        k = argv.index('--window')
        minutes = tlib.parse_window(argv[k + 1])
        argv = argv[:k] + argv[k + 2:]
    if '--cut' in argv:
        k = argv.index('--cut')
        n = int(argv[k + 1])
        argv = argv[:k] + argv[k + 2:]
    num = argv[0] if argv[0].startswith('P-') else 'P-' + argv[0]
    w = plib.World()
    events = trail_mod.print_trail(w, num)
    talk = tlib.Talk()
    print()
    print('== 5. His messages before each commit that made or changed the text (%d minutes before; texts cut at %s)'
          % (minutes, n or 'no limit'))
    seen = set()
    for ev in reversed(events):
        if ev['kind'] not in ('created', 'changed', 're-created', 'restored'):
            continue
        i = w.info(ev['h'])
        print()
        print('#### %s %s %s: %s' % (ev['h'][:9], i['adate'], ev['kind'].upper(), i['subject'][:120]))
        buf = io.StringIO()
        hits = near_mod.print_near(talk, i['adate'], minutes, n, out=buf)
        out = buf.getvalue()
        # drop the messages printed already
        parts = re.split(r'(?m)^(?==== HIS MESSAGE )', out)
        print(parts[0].rstrip())
        for part in parts[1:]:
            ts = part.split()[3]
            if ts in seen:
                print('=== HIS MESSAGE %s: printed above' % ts)
                continue
            seen.add(ts)
            print(part.rstrip())
    blocks = plib.head_blocks(w, num)
    named = []
    for b in blocks:
        for m in re.finditer(r'(\d{4}-\d\d-\d\d)?[ ,]*(?:at |about )?(\d\d:\d\d)(?:[-–]\d\d:\d\d)? UTC(?: on (\d{4}-\d\d-\d\d))?', b['prov']):
            day = m.group(1) or m.group(3) or b['prov'][:10]
            named.append('%sT%s (block :%d: "...%s...")' % (day, m.group(2), b['line'], b['prov'][max(0, m.start() - 40):m.end() + 10].replace('\n', ' ')))
    print()
    print('== 6. Times of his words that its history blocks name (python3 -I near.py <time> 10m)')
    for x in named or ['none']:
        print('   ' + x)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
