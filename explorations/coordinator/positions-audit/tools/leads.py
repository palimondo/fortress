#!/usr/bin/env python3
"""leads.py: what a scout starts from, for one entry of POSITIONS.md.

    python3 -I leads.py 86                        print to the terminal
    python3 -I leads.py 86 --out PATH             write it all to PATH (a scout's leads file)
    python3 -I leads.py 86 --window 30m --cut 3000 --top 15
    python3 -I leads.py 86 --at REV               the record as commit REV holds it, and his
                                                  messages up to its time

An entry struck from POSITIONS.md is traced from the last commit that held it: the top of the file
says STRUCK, with the commit that removed it and the reason its history block gives.

Sections:
  1-4. trail.py's output: the entry's text, its history blocks, every commit that made or changed
       its text with the reasons on record, the cross-check of the numbering block.
  5.   For each commit that created, changed, re-created, restored or struck its text: his messages in the
       window before the commit's author time (default 30 minutes), each whole with the message
       he answered, whole, by the reply chain (near.py). A message or a text already printed for
       an earlier commit is named, not printed again.
  6.   The times of his words that its history blocks name, for near.py or show.py to read.
  7.   His later messages that may bear on it (later.py): from its creation on, less those of
       section 5, ranked by the entry's distinctive terms, the top --top (default 15).
  8.   The lines of the record that name it (pointers.py).
  9.   For each sentence that states a status, a default, a pending answer or a standing go, the
       review-queue items and PLAN lines that may already hold the same point (homes.py).
  10.  His saved page comments that name it or quote its title (comments.py).
--cut N cuts each printed text of sections 5 at N characters (default 0: whole).
"""
import io
import os
import re
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plib  # noqa: E402
import tlib  # noqa: E402
import trail as trail_mod  # noqa: E402
import near as near_mod  # noqa: E402
import later as later_mod  # noqa: E402
import pointers as pointers_mod  # noqa: E402
import homes as homes_mod  # noqa: E402
import comments as comments_mod  # noqa: E402


def leads(num, out, minutes=30, n=0, top=15, at=None):
    p = lambda *a: print(*a, file=out)
    w = plib.World(rev=at)
    p('# Leads for %s, written %s UTC by leads.py at %s %s' % (
        num, time.strftime('%Y-%m-%dT%H:%M:%S', time.gmtime()), 'commit' if at else 'HEAD', w.repo.head[:9]))
    until = plib.utc(plib.git('show', '-s', '--format=%aI', w.repo.head).strip()) if at else None
    p()
    events = trail_mod.print_trail(w, num, out=out)
    talk = tlib.Talk()
    p()
    p('== 5. His messages before each commit that made or changed the text (%d minutes before; texts %s), '
      'each with the message he answered by the reply chain' % (minutes, 'cut at %d' % n if n else 'whole'))
    p(tlib.LEGEND)
    seen, texts = set(), {}
    for ev in reversed(events):
        if ev['kind'] not in ('created', 'changed', 're-created', 'restored', 'struck'):
            continue
        i = w.info(ev['h'])
        p()
        p('#### %s %s %s: %s' % (ev['h'][:9], i['adate'], ev['kind'].upper(), i['subject'][:120]))
        t = tlib.parse_time(i['adate'])
        start, end = tlib.window(t, minutes)
        hits = talk.his(start, end)
        p('His messages from %sZ to %sZ: %d' % (start, end, len(hits)))
        for m in hits:
            p()
            if m['ts'] in seen:
                p('=== HIS MESSAGE %s: printed above' % m['ts'])
                continue
            seen.add(m['ts'])
            near_mod.print_message(talk, m, n, out, texts)
    blocks = plib.head_blocks(w, num)
    named = []
    for b in blocks:
        for m in re.finditer(r'(\d{4}-\d\d-\d\d)?[ ,]*(?:at |about )?(\d\d:\d\d)(?:[-–]\d\d:\d\d)? UTC(?: on (\d{4}-\d\d-\d\d))?', b['prov']):
            day = m.group(1) or m.group(3) or b['prov'][:10]
            named.append('%sT%s (block :%d: "...%s...")' % (day, m.group(2), b['line'], b['prov'][max(0, m.start() - 40):m.end() + 10].replace('\n', ' ')))
    p()
    p('== 6. Times of his words that its history blocks name (python3 -I near.py <time> 10m)')
    for x in named or ['none']:
        p('   ' + x)
    p()
    p('== 7. His later messages that may bear on it, though no commit of the entry followed them')
    later_mod.print_later(talk, w, num, out=out, top=top, exclude=seen, until=until)
    p()
    p('== 8. The lines of the record that name it')
    pointers_mod.print_pointers(num, out=out, at=at)
    p()
    p('== 9. Where a status it states may already live (candidates, to confirm or reject)')
    homes_mod.AT = at
    homes_mod.print_homes(num, out=out)
    homes_mod.AT = None
    p()
    p('== 10. His page comments')
    comments_mod.print_comments(num, out=out, at=at)
    return events


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    minutes, n, top, path, at = 30, 0, 15, None, None
    for flag in ('--window', '--cut', '--top', '--out', '--at'):
        if flag in argv:
            k = argv.index(flag)
            v = argv[k + 1]
            argv = argv[:k] + argv[k + 2:]
            if flag == '--window':
                minutes = tlib.parse_window(v)
            elif flag == '--cut':
                n = int(v)
            elif flag == '--top':
                top = int(v)
            elif flag == '--at':
                at = v
            else:
                path = v
    num = argv[0] if argv[0].startswith('P-') else 'P-' + argv[0]
    if path:
        buf = io.StringIO()
        leads(num, buf, minutes, n, top, at)
        tmp = '%s.%d.tmp' % (path, os.getpid())
        with open(tmp, 'w') as f:
            f.write(buf.getvalue())
        os.replace(tmp, path)
        print('%s: %d lines, %d characters' % (path, buf.getvalue().count('\n'), len(buf.getvalue())))
    else:
        leads(num, sys.stdout, minutes, n, top, at)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
