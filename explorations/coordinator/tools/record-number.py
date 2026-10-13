#!/usr/bin/env python3
"""The record's numbering, run once at one commit and kept for the record.

It gives each entry of FACTS.md and POSITIONS.md its line as its number
(`- F-87 ...`, `- P-48 ...`), rebuilds FACTS-history.md and POSITIONS-history.md
as one `numbered` block per entry (the entry's line at the base, the titles it
had before, and the lines of the old history's texts that match it by title, a
header naming the commit that holds the old files), and turns the pointers by
title inside the record and the live documents into numbers where one entry
matches, keeping the quoted words after the number: `POSITIONS, "X"` becomes
`P-48, "X"`, and inside the record `"X ..." below` or `"X" under SECTION`
becomes `F-87, "X ..."`. A citation whose words open no title, or open several,
is left as it is and listed.

usage: record-number.py [--root DIR] [--write] [--verify BASE] [--list FILE]

  (no option)      print what the numbering would do, and write nothing
  --write          number the record at the root's HEAD, which must hold the
                   record files unchanged in the working tree
  --verify BASE    check a numbering against BASE, the commit before it: each
                   entry is its line at BASE with its number added and its
                   converted pointers, nothing else; every title citation in a
                   tracked file that resolved at BASE resolves to the same entry
                   now; record.py check passes; exit 1 otherwise
  --list FILE      write every conversion and every citation left by title to FILE
"""

import argparse
import os
import re
import subprocess
import sys

TOOLS = os.path.dirname(os.path.realpath(__file__))
TREE = os.path.dirname(os.path.dirname(os.path.dirname(TOOLS)))
sys.path.insert(0, TOOLS)
import record as R   # noqa: E402
from ledger import norm   # noqa: E402

COORD = R.COORD
LIVE_DOCS = ['explorations/coordinator/PLAN.md', 'explorations/coordinator/review-queue.md',
             'explorations/coordinator/climb-batch-workflow.md',
             'explorations/coordinator/process-engineering/record-test/key.md']
OPENING = 60      # the shared opening that links an old history text to an entry retitled at its end

# `FACTS, "X"`, `POSITIONS "X"`, `FACTS.md`, "X"`, `FACTS ("X"`, `FACTS entry ("X"`, `FACTS: "X"`
CITE = re.compile(r'(?<![\w/-])`?(?:explorations/coordinator/)?(FACTS|POSITIONS)(?:\.md)?`?( entry| entries)?(,|:)? (\(?)(["“])([^"”\n]+)(["”])')
# Inside the record: `"X" below`, `"X ..." above`, `"X" under SECTION`
INTERNAL = re.compile(r'(["“])([^"”\n]+)(["”])( below| above| under ([A-Z][^.;,)]*))')
# The further titles of a list: `POSITIONS, "A", "B" and "C"`, `"A" and "B" under SECTION`
LIST_ITEM = re.compile(r'(?:,|, and| and|, or| or) (["“])([^"”\n]+)(["”])')
LIST_BEFORE = re.compile(r'(["“])([^"”\n]+)(["”])(?:,|, and| and) $')
QUOTE = re.compile(r'(["“])([^"”\n]+)(["”])')


class Cite:
    def __init__(self, start, end, kind, words, q1, q2, form, paren=False, section=None, key=None):
        self.start, self.end, self.kind, self.words = start, end, kind, words
        self.q1, self.q2, self.form, self.paren, self.section = q1, q2, form, paren, section
        self.key = key          # a pointer's number, for a pointer read as a citation

    def pointer(self, key):
        return '%s%s%s%s%s' % (key, ' (' if self.paren else ', ', self.q1, self.words, self.q2)


def citations(text, own=None, headings=(), entries=None, self_key=None, with_pointers=False):
    """The title citations of a text, in order: `FACTS, "X"` and its forms everywhere, and in
    a record file (own, its kind F or P) `"X" below`, `"X" above` and `"X" under SECTION`; the
    further titles of a list after or before one of these; and, in a record file, a quoted
    title of its own file that is whole or cut with an ellipsis. A list's further item and a
    bare quote count only when they open one title of entries ({kind: entries}). With
    with_pointers, a pointer with quoted words counts too, as a citation of its number."""
    out = []
    def free(a, b):
        return not any(c.start < b and a < c.end for c in out)
    def one(words, kind):
        if not entries:
            return None
        hits = [e for e in entries[kind] if R.words_open(words, e.title)]
        return hits[0] if len(hits) == 1 and hits[0].key != self_key else None
    for m in CITE.finditer(text):
        out.append(Cite(m.start(), m.end(), m.group(1)[0], m.group(6), m.group(5), m.group(7), 'named', paren=bool(m.group(4))))
    if with_pointers:
        for m in R.POINTER.finditer(text):
            if m.group(5):
                out.append(Cite(m.start(), m.end(), m.group(1), m.group(5), m.group(4), m.group(6), 'pointer', key=m.group(1) + '-' + m.group(2)))
    if own:
        for m in INTERNAL.finditer(text):
            if not free(m.start(), m.end()):
                continue
            end, section = m.end(), None
            if m.group(4).startswith(' under'):
                rest = m.group(5)
                fits = [h for h in headings if rest.startswith(h)]
                if not fits:
                    continue
                section = max(fits, key=len)
                end = m.start(5) + len(section)
            c = Cite(m.start(), end, own, m.group(2), m.group(1), m.group(3), m.group(4).split()[0], section=section)
            out.append(c)
            s = c.start
            while True:
                b = LIST_BEFORE.search(text[:s])
                if not b or not one(b.group(2), own):
                    break
                out.append(Cite(b.start(), b.end(3), own, b.group(2), b.group(1), b.group(3), 'list', section=section))
                s = b.start()
    for c in list(out):
        if c.form not in ('named', 'pointer'):
            continue
        pos = c.end
        while True:
            m = LIST_ITEM.match(text, pos)
            if not m or not free(m.start(1), m.end()) or not one(m.group(2), c.kind):
                break
            out.append(Cite(m.start(1), m.end(), c.kind, m.group(2), m.group(1), m.group(3), 'list'))
            pos = m.end()
    if own and entries:
        for m in QUOTE.finditer(text):
            words = m.group(2)
            if not free(m.start(), m.end()) or len(words.split()) < 3 or re.search(r'[FP]-\d+(, | \()$', text[:m.start()]):
                continue
            e = one(words, own)
            if e and (R.ELLIPSIS.search(words) or R._segments(words)[0] == norm(e.title).strip(' .,;:*')):
                out.append(Cite(m.start(), m.end(), own, words, m.group(1), m.group(3), 'bare'))
    return sorted(out, key=lambda c: c.start)


def resolve(c, entries, at=None, live=None):
    """The entries a citation names, narrowed by its section and by below or above when several do."""
    if c.key:
        return [live[c.key]] if live and c.key in live else []
    hits = R.resolve_words(c.words, entries)
    if len(hits) > 1 and c.section:
        hits = [e for e in hits if c.section in (e.section, e.top)] or hits
    if len(hits) > 1 and at is not None and c.form in ('below', 'above'):
        hits = [e for e in hits if (e.lineno > at if c.form == 'below' else e.lineno < at)] or hits
    return hits


def git(root, *args, check=True):
    p = subprocess.run(['git', '-C', root] + list(args), capture_output=True, text=True)
    if check and p.returncode != 0:
        raise SystemExit('git %s: %s' % (' '.join(args), p.stderr.strip()))
    return p.stdout


class Base:
    """The record as it stood before the numbering: entries numbered by their line."""
    def __init__(self, texts):
        self.files = {k: R.RecordFile(k, R.FILES[k], texts[k]) for k in 'FP'}
        for k in 'FP':
            for e in self.files[k].entries:
                if e.num is not None:
                    raise SystemExit('%s is numbered already (%s at line %d)' % (R.FILES[k], e.key, e.lineno))
                e.kind, e.num, e.key = k, e.lineno, R.key_of(k, e.lineno)
        self.headings = {k: [h[2] for h in self.files[k].headings] for k in 'FP'}
        self.by_kind = {k: self.files[k].entries for k in 'FP'}

    def entries(self, kind):
        return self.files[kind].entries


def convert(text, base, own=None, at_line=None, self_key=None):
    """(new text, conversions, left): conversions [(cite, key)], left [(cite, why, candidates)]."""
    conv, left, pieces, last = [], [], [], 0
    for c in citations(text, own, base.headings.get(own, ()), base.by_kind, self_key):
        hits = resolve(c, base.entries(c.kind), at_line)
        if len(hits) != 1:
            left.append((c, 'ambiguous' if hits else 'no title', hits))
            continue
        e = hits[0]
        if not R.words_open(c.words, e.title):
            left.append((c, 'words that do not open its title', hits))
            continue
        conv.append((c, e.key))
        pieces.append(text[last:c.start])
        pieces.append(c.pointer(e.key))
        last = c.end
    pieces.append(text[last:])
    return ''.join(pieces), conv, left


# ---------------------------------------------------------------- the history

def history_text(kind, old_path, old_title, base_entries, base, stamp, fx):
    """The rebuilt history file, and the figures of its linking."""
    sections, texts = fx.parse_bullets(old_path)
    by_title, by_open = {}, {}
    for e in base_entries:
        t = norm(e.title)
        by_title.setdefault(t, []).append(e)
        if len(t) >= OPENING:
            by_open.setdefault(t[:OPENING], []).append(e)
    linked = {e.key: [] for e in base_entries}
    exact = opening = 0
    for t in texts:
        n = norm(t.title)
        hit = by_title.get(n, [])
        how = 'exact'
        if len(hit) != 1 and len(n) >= OPENING:
            hit, how = by_open.get(n[:OPENING], []), 'opening'
        if len(hit) != 1:
            continue
        linked[hit[0].key].append(t)
        if how == 'exact':
            exact += 1
        else:
            opening += 1
    name, hname = R.FILES[kind], R.HISTORIES[kind]
    out = [R.history_head(kind, old_title, base)]
    formers = 0
    for e in base_entries:
        titles, seen = [], {norm(e.title)}
        for t in linked[e.key]:
            if norm(t.title) not in seen:
                seen.add(norm(t.title))
                titles.append(t.title.replace('\n', ' '))
        formers += len(titles)
        note = 'line %d of %s at that commit' % (e.lineno, name)
        if titles:
            note += '; former titles: ' + ', '.join('"%s"' % t for t in titles)
        if linked[e.key]:
            lines = [str(t.line) for t in linked[e.key]]
            note += '; earlier texts in its %s, line%s %s' % (hname, 's' if len(lines) > 1 else '', ', '.join(lines))
        prov = R.SEP.join([stamp, 'numbered', 'commit `%s`' % base, 'by record-number.py']) + ': ' + note
        out.append('\n### %s\n\n%s\n' % (e.key, prov))
    return ''.join(out), {'texts': len(texts), 'exact': exact, 'opening': opening, 'former titles': formers,
                          'entries with earlier texts': sum(1 for v in linked.values() if v)}


# ---------------------------------------------------------------- the run

def plan(root, base_commit, stamp):
    """Everything the numbering writes, as {path: text}, and its figures."""
    fx = R.facts_extract()
    p = R.Paths(root)
    texts = {k: R.read(p.files[k]) for k in 'FP'}
    base = Base(texts)
    out, figures, lists = {}, {}, {'converted': [], 'left': []}
    for k in 'FP':
        f = base.files[k]
        lines = list(f.lines)
        n_conv = {'F': 0, 'P': 0}
        for e in f.entries:
            i = e.lineno - 1
            body, conv, left = convert(R.body_of(e.line), base, own=k, at_line=e.lineno, self_key=e.key)
            lines[i] = '- %s %s' % (e.key, body)
            for c, key in conv:
                n_conv[key[0]] += 1
                lists['converted'].append((R.FILES[k], e.key, c, key))
            for c, why, hits in left:
                lists['left'].append((R.FILES[k], e.key, c, why, hits))
        out[p.files[k]] = '\n'.join(lines)
        figures['%s entries numbered' % R.FILES[k]] = len(f.entries)
        for t in 'FP':
            figures['pointers converted in %s to %s' % (R.FILES[k], R.FILES[t])] = n_conv[t]
        old_title = next((ln[2:].strip() for ln in R.read(p.histories[k]).split('\n') if ln.startswith('# ')), None)
        text, fig = history_text(k, p.histories[k], old_title, f.entries, base_commit, stamp, fx)
        out[p.histories[k]] = text
        for name, v in fig.items():
            figures['%s: %s' % (R.HISTORIES[k], name)] = v
    for rel in LIVE_DOCS:
        path = os.path.join(root, rel)
        if not os.path.isfile(path):
            continue
        new, conv, left = convert(R.read(path), base)
        out[path] = new
        figures['pointers converted in %s' % rel] = len(conv)
        for c, key in conv:
            lists['converted'].append((rel, None, c, key))
        for c, why, hits in left:
            lists['left'].append((rel, None, c, why, hits))
    return out, figures, lists


def write_list(path, lists):
    with open(path, 'w', encoding='utf-8') as f:
        f.write('# Converted\n\n')
        for where, e, c, key in lists['converted']:
            f.write('- %s%s: "%s" (%s) -> %s\n' % (where, ' ' + e if e else '', c.words, c.form, key))
        f.write('\n# Left by title\n\n')
        for where, e, c, why, hits in lists['left']:
            f.write('- %s%s: "%s" (%s): %s%s\n' % (where, ' ' + e if e else '', c.words, c.form, why,
                                                ' (%s)' % ', '.join('%s "%s"' % (h.key, R.clip(h.title, 60)) for h in hits) if hits else ''))


# ---------------------------------------------------------------- the checks

def verify(root, base_commit):
    fails = []
    p = R.Paths(root)
    old = {k: git(root, 'show', '%s:%s/%s' % (base_commit, COORD, R.FILES[k])) for k in 'FP'}
    base = Base(old)
    store = R.Store(p)
    # 1. Each entry is its base line with the number added and its pointers converted.
    for k in 'FP':
        now = store.files[k]
        if [e.lineno for e in now.entries] != [e.lineno for e in base.files[k].entries]:
            fails.append('%s: the entries do not stand on the lines they stood on at %s' % (R.FILES[k], base_commit))
            continue
        for b, e in zip(base.files[k].entries, now.entries):
            if e.key != b.key:
                fails.append('%s:%d is numbered %s, not %s' % (R.FILES[k], e.lineno, e.key, b.key))
                continue
            expect = '- %s %s' % (b.key, R.body_of(b.line))
            cites = citations(expect, k, base.headings[k], base.by_kind, b.key)
            pieces, last, ci = [], 0, 0
            for ptr in R.pointers(e.line):
                while ci < len(cites) and cites[ci].words != ptr.words:
                    ci += 1
                if ptr.words is None or ci == len(cites):
                    fails.append('%s: the pointer %s stands for no title citation of its line at %s' % (e.key, ptr.text(), base_commit))
                    break
                c = cites[ci]
                ci += 1
                hits = resolve(c, base.entries(c.kind), b.lineno)
                if [h.key for h in hits] != [ptr.key]:
                    fails.append('%s: "%s" named %s at %s, and the pointer is %s' % (
                        e.key, R.clip(ptr.words, 60), ', '.join(h.key for h in hits) or 'nothing', base_commit, ptr.key))
                pieces += [expect[last:c.start], ptr.text()]
                last = c.end
            if ''.join(pieces) + expect[last:] != e.line:
                fails.append('%s: its line is not its line at %s with the number added and its pointers converted' % (e.key, base_commit))
    # 2. Every title citation in a tracked file that resolved at the base resolves to the same entry now.
    files = set(git(root, 'grep', '-l', '-E', 'FACTS|POSITIONS', base_commit, '--', '.', check=False).replace(base_commit + ':', '').split('\n')) - {''}
    record_paths = {'%s/%s' % (COORD, R.FILES[k]): k for k in 'FP'}
    files -= {'%s/%s' % (COORD, R.HISTORIES[k]) for k in 'FP'}      # rebuilt: their old texts stay at the base
    now_by_kind = {k: [e for e in store.files[k].entries if e.key] for k in 'FP'}
    now_heads = {k: [h[2] for h in store.files[k].headings] for k in 'FP'}
    checked = resolved = same = 0
    for rel in sorted(files):
        full = os.path.join(root, rel)
        if not os.path.isfile(full):
            continue
        try:
            after_text = R.read(full)
        except UnicodeDecodeError:
            continue
        before_text = git(root, 'show', '%s:%s' % (base_commit, rel), check=False)
        own = record_paths.get(rel)
        if own:
            before, after = [], []
            for b in base.files[own].entries:
                before += [(c.words, resolve(c, base.entries(c.kind), b.lineno))
                           for c in citations(b.line, own, base.headings[own], base.by_kind, b.key)]
            for e in store.files[own].entries:
                after += [(c.words, resolve(c, now_by_kind[c.kind], e.lineno, store.live))
                          for c in citations(e.line, own, now_heads[own], now_by_kind, e.key, with_pointers=True)]
        else:
            # Pointers count only in the files the numbering writes; elsewhere they are examples.
            before = [(c.words, resolve(c, base.entries(c.kind))) for c in citations(before_text, entries=base.by_kind)]
            after = [(c.words, resolve(c, now_by_kind[c.kind], None, store.live))
                     for c in citations(after_text, entries=now_by_kind, with_pointers=rel in LIVE_DOCS)]
        if [w for w, h in before] != [w for w, h in after]:
            fails.append('%s: its title citations at %s and now are not the same words in the same order (%d and %d)' % (rel, base_commit, len(before), len(after)))
            continue
        for (w, hb), (w2, ha) in zip(before, after):
            checked += 1
            if len(hb) == 1:
                resolved += 1
                if [h.key for h in ha] == [hb[0].key]:
                    same += 1
                else:
                    fails.append('%s: "%s" named %s at %s and names %s now' % (rel, R.clip(w, 60), hb[0].key, base_commit, ', '.join(h.key for h in ha) or 'nothing'))
    # 3. record.py check.
    cfails, reports = R.check(p)
    fails += ['record.py check: %s: %s: %s' % f for f in cfails]
    return fails, {'title citations checked': checked, 'resolved at the base': resolved, 'resolved the same now': same,
                   'files read': len(files), 'record.py check failures': len(cfails)}


def main(argv):
    ap = argparse.ArgumentParser(prog='record-number.py', description=__doc__.split('\n\n')[0],
                                 formatter_class=argparse.RawDescriptionHelpFormatter, epilog=__doc__[__doc__.index('usage:'):])
    ap.add_argument('--root', default=TREE)
    ap.add_argument('--write', action='store_true')
    ap.add_argument('--verify', metavar='BASE')
    ap.add_argument('--list', metavar='FILE')
    ap.add_argument('--base', help=argparse.SUPPRESS)      # the commit the header names, for a copy outside git
    a = ap.parse_args(argv)
    root = os.path.abspath(a.root)
    if a.verify:
        fails, figures = verify(root, a.verify)
        for f in fails:
            print('FAIL ' + f)
        for k, v in figures.items():
            print('%s: %s' % (k, v))
        print('record-number.py --verify %s: %s' % (a.verify, 'passes' if not fails else '%d failures' % len(fails)))
        return 1 if fails else 0
    base = a.base or git(root, 'rev-parse', '--short=9', 'HEAD').strip()
    if a.write and not a.base:
        paths = ['%s/%s' % (COORD, f) for f in list(R.FILES.values()) + list(R.HISTORIES.values())] + LIVE_DOCS
        if git(root, 'status', '--porcelain', '--', *paths).strip():
            raise SystemExit('the record files or the live documents differ from HEAD: commit or set them aside first')
    out, figures, lists = plan(root, base, R.now())
    for k, v in figures.items():
        print('%s: %s' % (k, v))
    left = lists['left']
    print('citations left by title: %d (%s)' % (len(left), ', '.join('%s %d' % (w, sum(1 for x in left if x[3] == w))
                                                                     for w in sorted({x[3] for x in left}))))
    if a.list:
        write_list(a.list, lists)
    if a.write:
        for path, text in out.items():
            R.write_text(path, text)
        print('written: %s' % ', '.join(os.path.relpath(x, root) for x in out))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
