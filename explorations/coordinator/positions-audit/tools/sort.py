#!/usr/bin/env python3
"""sort.py: every entry of POSITIONS.md at HEAD, one line each, with four marks; writes sort.txt.

    python3 -I sort.py            writes sort.txt beside this file and prints the counts
    python3 -I sort.py --bulk 20  another bulk threshold (default plib.BULK_N = 10)

A line: number | title | marks | made by | link | evidence. The marks:
  doc      its blocks in POSITIONS-history.md at HEAD (the 'numbered' block left out) name at
           least one document as a source ("from `path`") and no message or words of the curator
           (CURATOR below finds none in any block)
  bulk     every commit that made or changed its current text, back to its latest creation or
           re-creation, changed at least N entries of POSITIONS.md (N = 10; trail.py counts them)
  default  its text says something stands at a default, waits for his answer, rests on a standing
           go, or is listed for his review (DEFAULT below; the phrase is printed)
  msg      a block names his message or words (CURATOR) with a clock time hh:mm (the phrase is
           printed); 'msg-date' when only a date is near the words, 'words' when neither is.
           A cited document's section title ("6. For Pavol") is not read for his words.
'made by' lists the commits that made the current text, newest first, with the count of other
entries each changed; 'link' gives how the chain was linked, and the lowest similarity it rests on.
"""
import collections
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plib  # noqa: E402

CURATOR = re.compile(
    r"\b(?:his|His) (?:own )?(?:words?|answers?|yes|instruction|direction|reply|replies|message|question|questions|decision|"
    r"approval|agreement|choice|go|order|ruling|call|request|ask|objection|reading|correction|view)\b"
    r"|\bthe words in this history\b|\bPavol\b|\bthe curator\b|\bby curator\b|\bhe (?:said|asked|answered|agreed|took|chose|approved|wrote|decided|"
    r"wants|confirmed|gave|replied)\b")
CLOCK = re.compile(r'\b\d\d:\d\d(?:[-–]\d\d:\d\d)? UTC\b')
DATE = re.compile(r'\b20\d\d-\d\d-\d\d\b')
DEFAULT = re.compile(
    r"(?<!IEEE's )(?<!JVM's )\bdefaults?\b|\bfor his review\b|\bhis answers? (?:is|are) pending\b|\bpending his\b"
    r"|\bwait\w* (?:for|on) (?:his|the curator)\b|\bstanding go\b|\bon a standing\b")
SOURCE = re.compile(r'from `([^`]+)`')


def phrase(text, m, k=35):
    a, b = max(0, m.start() - k), min(len(text), m.end() + k)
    return re.sub(r'\s+', ' ', text[a:b]).strip()


def marks(w, num, n=plib.BULK_N, events=None):
    e, st = plib.find_entry(w, num)
    events = events if events is not None else plib.trail(w, num)
    blocks = [b for b in plib.head_blocks(w, num) if '· numbered ·' not in (b['prov'] or '')
              and not (st and b['writer'] == st['removal'])]      # a struck entry: its removal's block is not a source
    out = {'num': num, 'title': e['title'] or e['norm'][:60], 'marks': ['struck'] if st else [], 'ev': []}
    if st:
        out['ev'].append('struck at %s' % (st['removal'] or '?')[:9])
    cur_hits, msg_hits, msgd_hits, sources = [], [], [], []
    for b in blocks:
        prov = b['prov'] or ''
        sources += SOURCE.findall(prov)
        # a cited document's section title ("6. For Pavol") is the document's, not his words
        bare = re.sub(r'from `[^`]+`(?:, "[^"]*")?', 'from <doc>', prov)
        for m in CURATOR.finditer(bare):
            cur_hits.append(phrase(bare, m))
            near = bare[max(0, m.start() - 60):m.end() + 150]
            c = CLOCK.search(near)
            d = DATE.search(near)
            if c:
                msg_hits.append(phrase(near, c, 60))
            elif d:
                msgd_hits.append(phrase(near, d, 60))
    if sources and not cur_hits:
        out['marks'].append('doc')
        out['ev'].append('sources: ' + ', '.join(sorted(set(s.replace('explorations/', '') for s in sources))))
    made = plib.made_events(events)
    if plib.is_bulk(events, n):
        out['marks'].append('bulk')
    dm = list(DEFAULT.finditer(e['norm']))
    if dm:
        out['marks'].append('default')
        out['ev'].append('default: "%s"' % phrase(e['norm'], dm[0]))
    if msg_hits:
        out['marks'].append('msg')
        out['ev'].append('msg: "%s"' % msg_hits[0])
    elif msgd_hits:
        out['marks'].append('msg-date')
        out['ev'].append('msg-date: "%s"' % msgd_hits[0])
    elif cur_hits:
        out['marks'].append('words')
        out['ev'].append('words: "%s"' % cur_hits[0])
    if not sources and not cur_hits:
        out['ev'].append('history names no source and no words of his')
    out['made'] = ' '.join('%s(%d)' % (ev['h'][:9], ev['others']) for ev in made)
    kinds = collections.Counter()
    low = None
    for ev in events:
        lk = ev.get('link') or {}
        if ev['kind'] in ('changed', 're-created'):
            kinds[lk.get('how')] += 1
            if lk.get('how') == 'similarity':
                low = min(low, lk['score']) if low is not None else lk['score']
    out['link'] = ','.join('%s:%d' % kv for kv in sorted(kinds.items())) + (' low %.2f' % low if low is not None else '')
    out['made_others'] = [ev['others'] for ev in made]
    return out


def main(argv):
    n = plib.BULK_N
    if '--bulk' in argv:
        n = int(argv[argv.index('--bulk') + 1])
    w = plib.World()
    r = w.repo
    nums = [e['num'] for e in r.entries(r.start, 'P')]
    rows = []
    for num in nums:
        rows.append(marks(w, num, n))
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sort.txt' if n == plib.BULK_N else 'sort-bulk%d.txt' % n)
    with open(path, 'w') as f:
        f.write('# POSITIONS.md at HEAD %s: %d entries. Marks: python3 -I sort.py --help. bulk = every commit that made the current text changed >= %d other entries.\n'
                % (r.head[:9], len(rows), n))
        f.write('# number | title | marks | made by: commit(other entries it changed), newest first | links in the trail (how:count, lowest similarity) | evidence\n')
        for x in rows:
            f.write('%s | %s | %s | made by %s | %s | %s\n' % (x['num'], x['title'][:90], ' '.join(x['marks']) or '-',
                                                             x['made'], x['link'] or '-', '; '.join(x['ev'])))
    cnt = collections.Counter(m for x in rows for m in x['marks'])
    print('wrote %s: %d entries' % (path, len(rows)))
    for m in ('doc', 'bulk', 'default', 'msg', 'msg-date', 'words'):
        print('%-8s %3d  %s' % (m, cnt[m], ' '.join(x['num'][2:] for x in rows if m in x['marks'])))
    print('none     %3d  %s' % (sum(1 for x in rows if not x['marks']), ' '.join(x['num'][2:] for x in rows if not x['marks'])))
    for k in (n // 2, n, n * 2):
        b = [x['num'][2:] for x in rows if x['made_others'] and all(o >= k for o in x['made_others'])]
        print('bulk at >= %2d: %2d  %s' % (k, len(b), ' '.join(b)))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
