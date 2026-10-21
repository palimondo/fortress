#!/usr/bin/env python3
"""trail.py: the trail of one entry of POSITIONS.md, from the repository's history.

    python3 -I trail.py 86            (or P-86)
    python3 -I trail.py 86 --short    the commit list only, one line each

Prints:
  1. the entry's text at HEAD;
  2. its blocks in POSITIONS-history.md at HEAD, each with the commit that wrote it (the oldest
     commit whose history file holds the block's provenance line). A block's own "commit X" names
     the source it cites, not its writer;
  3. every commit that made or changed the entry's text, oldest first, read from each commit's own
     tree (side branches included): hash, UTC author time, subject, what it did, how the link to
     the text before was made (number, line, title: exact; similarity: score printed), how many
     other entries of POSITIONS.md the commit changed, and the reasons on record: the history
     blocks it wrote, the comments above verbatim copies of the text in the old history file, and
     the commit message.
  4. a cross-check: the old history lines that the numbering block names as earlier texts of this
     entry, and whether each is a text of this trail.

What a commit did:
  created          a text new in POSITIONS.md that no removed or earlier text explains
  changed          a text that replaced another of the same commit (link: number, line, title or similarity)
  moved to history the text left POSITIONS.md and stands verbatim in POSITIONS-history.md
  archived         a verbatim copy stored in POSITIONS-history.md by a later commit
  re-created       a text new in POSITIONS.md made from an earlier text (archived or removed)
  restored         a text back in POSITIONS.md verbatim from POSITIONS-history.md
  renumbered       the same text under a new number (2026-10-13: none -> P-n)
  section moved    the same text under another heading
"Other entries changed": the entries of POSITIONS.md the commit changed, added or removed, other
than this one: texts new in the commit plus texts it removed against every parent, less the pairs.
Lines whose text stayed but whose number or heading changed are counted apart.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plib  # noqa: E402

NUMBERING_TREE = 'a74f5a2b7'


def body_reason(w, h, num, maxlines=8):
    body = w.repo.body(h)
    lines = [l for l in body.split('\n')[1:] if not re.match(r'(Co-Authored-By|Claude-Session):', l)]
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    if not lines:
        return ['(no message body)']
    if len(lines) <= maxlines + 4:
        return lines
    n = int(num[2:])
    keep = lines[:maxlines]
    extra = []
    for l in lines[maxlines:]:
        hit = re.search(r'\b%s\b' % re.escape(num), l)
        for a, b in re.findall(r'P-(\d+) (?:to|-|–) P-(\d+)', l):
            if int(a) <= n <= int(b):
                hit = True
        if hit:
            extra.append(l)
    out = keep + (['  ...'] + extra if extra else [])
    out.append('  (%d lines in all: git show -s %s)' % (len(lines), h[:9]))
    return out


def fmt_link(ev):
    lk = ev.get('link') or {}
    how = lk.get('how')
    if ev['kind'] == 'created':
        s, x, where = ev.get('nearest') or (0.0, '', '')
        if x:
            return 'none: the nearest earlier text scores %.2f, under T_RECREATE %.2f: "%s..."' % (s, plib.T_RECREATE, x[:100])
        return 'none: no earlier text'
    if how in ('number', 'line'):
        return '%s (exact): %s; similarity %.2f, for information' % (how, lk.get('detail', ''), ev.get('score') or 0)
    if how == 'title':
        s = '%s (exact): %s; similarity %.2f, for information' % (how, lk.get('detail', ''), ev.get('score') or 0)
        if lk.get('also'):
            s += '\n        merged with %d other old text(s): %s' % (len(lk['also']), ' | '.join('"%s..."' % a[:80] for a in lk['also']))
        return s
    if how == 'similarity':
        th = plib.T_PAIR if ev['kind'] == 'changed' else plib.T_RECREATE
        s = 'similarity %.2f (threshold %.2f; the next best candidate %.2f)' % (lk['score'], th, lk.get('runner', 0.0))
        if ev['kind'] == 'changed':
            s += '; %s' % ('in the same place in the file' if lk.get('same_place') else 'NOT in the same place in the file')
        else:
            s += '; %s' % lk.get('detail', '')
        if lk.get('ties'):
            s += '\n        near-ties (within %.2f; the one that stood in POSITIONS.md last was taken): %s' % (
                plib.EPS, ' | '.join('%.2f "%s..."' % t for t in lk['ties']))
        s += '\n        longest common run, %d words: "%s"' % (lk.get('run_n', 0), lk.get('run', '')[:300])
        return s
    return ''


def print_trail(w, num, short=False, out=sys.stdout):
    num = num if str(num).startswith('P-') else 'P-%s' % num
    r = w.repo
    e = plib.head_entry(w, num)
    events = plib.trail(w, num)
    p = lambda *a: print(*a, file=out)
    if short:
        for ev in reversed(events):
            i = w.info(ev['h'])
            p('%s %s %-16s others %3d  %s' % (ev['h'][:9], i['adate'], ev['kind'], ev['others'], i['subject'][:90]))
        return events
    p('%s: trail at HEAD %s (POSITIONS.md:%d, section "%s")' % (num, r.head[:9], e['line'], e['section']))
    p()
    p('== 1. The text at HEAD')
    p(e['raw'])
    p()
    p('== 2. Its blocks in POSITIONS-history.md at HEAD')
    blocks = plib.head_blocks(w, num)
    for b in blocks:
        wr = b['writer']
        p('POSITIONS-history.md:%d  written by %s %s' % (b['line'], wr[:9] if wr else '?', w.info(wr)['adate'] if wr else ''))
        p(b['prov'])
        if b['body']:
            p('  the line it replaced: %s' % b['body']['raw'])
        p()
    p('== 3. The commits that made or changed it, oldest first')
    texts_in_trail = set()
    for k, ev in enumerate(reversed(events), 1):
        i = w.info(ev['h'])
        ch = w.change(ev['h'])
        texts_in_trail.add(ev['text'])
        if ev.get('prev'):
            texts_in_trail.add(ev['prev'])
        p('%d. %s %s  %s%s' % (k, ev['h'][:9], i['adate'], ev['kind'].upper(),
                               ('  (committed %s)' % i['cdate']) if i['cdate'] != i['adate'] else ''))
        p('   subject: %s' % i['subject'])
        if len(r.parents(ev['h'])) > 1:
            p('   a merge of %s' % ', '.join(x[:9] for x in r.parents(ev['h'])))
        if ev.get('note'):
            p('   what: %s' % ev['note'])
        lk = fmt_link(ev)
        if lk:
            p('   link to the text before: %s' % lk)
        p('   other entries of POSITIONS.md this commit changed: %d (texts new %d, removed %d, paired %d); lines renumbered %d, moved section %d'
          % (ev['others'], len(ch.new), len(ch.gone_all), len(ch.new) + len(ch.gone_all) - ch.touched, ch.renum, ch.sect))
        wrote = [b for b in blocks if b['writer'] == ev['h']]
        for b in wrote:
            p('   reason, its history block :%d: %s' % (b['line'], b['prov'].split('\n')[0][:600]))
        seen = set()
        for t in (ev.get('prev'), ev['text']):
            if not t:
                continue
            for com, h in plib.old_comments(w, t):
                if com in seen:
                    continue
                seen.add(com)
                tag = 'this text' if t == ev['text'] else 'the text before'
                p('   comment above a copy of %s in the history file (first in %s): %s' % (tag, h[:9], com[:400]))
        if ev['kind'] == 'created':
            un = [o for o in ch.gone_cand if o not in {v['old'] for v in ch.pairs.values()}]
            if un:
                s, o = max((w.sim(ev['text'], o), o) for o in un)
                p('   nearest text this commit removed, unpaired: %.2f (under T_PAIR %.2f) "%s..."' % (s, plib.T_PAIR, o[:120]))
            notes = plib.new_notes(w, ev['h'])
            if notes and len(notes) <= 6:
                for nt, tx in notes:
                    p('   note this commit added in the history file, above "%s...": %s' % (tx[:60], nt[:400]))
            elif notes:
                p('   notes this commit added in the history file: %d (git show %s -- %s)' % (len(notes), ev['h'][:9], plib.HFILE))
        p('   commit message:')
        for l in body_reason(w, ev['h'], num):
            p('     | ' + l[:300])
        if ev['kind'] in ('created', 'changed', 're-created', 'restored', 'created in history'):
            p('   text after:')
            p('     ' + ev['text'])
        p()
    # 4. cross-check with the numbering block
    nb = [b for b in blocks if '· numbered ·' in (b['prov'] or '')]
    if nb:
        m = re.search(r'earlier texts in its POSITIONS-history.md, lines ([\d, ]+)', nb[0]['prov'])
        p('== 4. Cross-check: the numbering block\'s earlier texts (%s:POSITIONS-history.md)' % NUMBERING_TREE)
        if not m:
            p('   the numbering block names no earlier texts')
        else:
            lines = [int(x) for x in re.findall(r'\d+', m.group(1))]
            old = {x['line']: x for x in plib.parse(plib.git('show', NUMBERING_TREE + ':' + plib.HFILE))[0]}
            for ln in lines:
                x = old.get(ln)
                if not x:
                    p('   line %d: no entry starts there' % ln)
                    continue
                inn = x['norm'] in texts_in_trail
                best = max((w.sim(x['norm'], t) for t in texts_in_trail), default=0.0)
                p('   line %d: %s; "%s..."' % (ln, 'a text of this trail' if inn else 'NOT a text of this trail (best similarity %.2f)' % best, x['norm'][:90]))
    return events


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    w = plib.World()
    print_trail(w, argv[0], short='--short' in argv)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
