#!/usr/bin/env python3
"""The ledger notes that ledger.py refused at each climb batch's gather, as each
batch's RECORD.md lists them under "Ledger notes not written", and whether the
row has changed since that record landed.

For each list item that names a row ("- Row N (...)", "- Rows N and M"), prints
  batch  row  status_now  row_len  notes_len  changed_since  kind  line  first_words
where kind is `condensed` when the item says its note went in cut ("written
condensed", "cut to fit"), else `refused`, and
where changed_since is `same` when the row's line is unchanged since the commit
that added the record's section (the note is certainly still unwritten), else
the commits that changed the row's line since (the note may have gone in, cut,
or the row may have been closed).

usage: refused_notes.py [BATCH_DIR ...]   (default: climb batches 11 to 20)
"""
import glob, os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'explorations', 'coordinator', 'tools'))
import ledger as L


def git(*a):
    return subprocess.run(['git', '-C', ROOT] + list(a), capture_output=True, text=True).stdout


def ledger_at(c, cache={}):
    if c not in cache:
        t = git('show', '%s:%s' % (c, L.LEDGER_REL))
        cache[c] = {r.num: r.line for r in L.Ledger('x', t).rows}
    return cache[c]


def section(text, title='Ledger notes not written'):
    lines = text.split('\n')
    out, on = [], False
    for i, ln in enumerate(lines):
        if ln.startswith('## '):
            on = ln[3:].strip().startswith(title)
            continue
        if on:
            out.append((i + 1, ln))
    return out


def main():
    dirs = sys.argv[1:] or sorted(
        glob.glob(os.path.join(ROOT, 'explorations/compile-ladder/climb-batch-1[1-9]*')) +
        glob.glob(os.path.join(ROOT, 'explorations/compile-ladder/climb-batch-20*')),
        key=lambda d: [int(x) if x.isdigit() else x for x in re.findall(r'\d+|\D+', os.path.basename(d))])
    now = {r.num: r for r in L.Ledger(os.path.join(ROOT, L.LEDGER_REL)).rows}
    print('batch\trow\tstatus_now\trow_len\tnotes_len\tchanged_since\tkind\tline\tfirst_words')
    for d in dirs:
        rec = os.path.join(d, 'RECORD.md')
        if not os.path.exists(rec):
            continue
        rel = os.path.relpath(rec, ROOT)
        text = open(rec, encoding='utf-8').read()
        sec = section(text)
        if not sec:
            continue
        # the commit that first held this section
        added = None
        for h in git('log', '--format=%h', '--reverse', '--', rel).split():
            if 'Ledger notes not written' in git('show', '%s:%s' % (h, rel)):
                added = h
                break
        then = ledger_at(added) if added else {}
        batch = os.path.basename(d).replace('climb-batch-', '')
        for lineno, ln in sec:
            m = re.match(r'\s*[-*]\s+\**Rows? ([\d, and]+)', ln)
            if not m:
                continue
            nums = [int(x) for x in re.findall(r'\d+', m.group(1))]
            for n in nums:
                r = now.get(n)
                if r is None:
                    continue
                if added and then.get(n) == r.line:
                    ch = 'same'
                else:
                    ch = 'changed'
                    if added:
                        hs = []
                        for h in git('log', '--format=%h', '%s..HEAD' % added, '--', L.LEDGER_REL).split():
                            a = ledger_at(h).get(n)
                            b = ledger_at(h + '^').get(n)
                            if a != b:
                                hs.append(h)
                        ch = 'changed in ' + ','.join(hs) if hs else 'changed'
                words = re.sub(r'^\s*[-*]\s+', '', ln)
                kind = 'condensed' if re.search(r'written condensed|cut to fit|went in', ln[:200]) else 'refused'
                print('\t'.join(map(str, [batch, n, r.status_word, len(r.line), len(r.notes), ch, kind, '%s:%d' % (rel, lineno), L.clip(words, 160)])))


main()
