#!/usr/bin/env python3
"""Print the part of the project's record that a task needs, in bounded parts.

Called by facts-extract.sh beside it; run that with --help for the usage.
The record: explorations/coordinator/FACTS.md (what is established, grouped
by area, each entry cited by its title), explorations/coordinator/INDEX.md
(one line per standalone note) and the maps under explorations/coordinator/map/.
"""

import difflib
import os
import re
import sys
import unicodedata

TOOLS = os.path.dirname(os.path.realpath(__file__))
COORD = os.path.dirname(TOOLS)
ROOT = os.path.dirname(os.path.dirname(COORD))
FACTS = os.path.join(COORD, 'FACTS.md')
INDEX = os.path.join(COORD, 'INDEX.md')
MAPS = 'explorations/coordinator/map/'

# What every agent of every rung reads first, selected by heading and never by
# line number, since the headings' sections are rewritten in place (Pavol,
# 2026-09-27: the maps and FACTS exist so that an agent works from the whole
# territory and not from a local view).
COMMON = [
    'map:README.md#Terms used here',
    'map:README.md#The shape of the system',
    'map:README.md#Touch this, and that moves',
    'doc:explorations/coordinator/PLAN.md#The phases',
    'doc:explorations/repo-internals.md',
]

PAGE_BYTES = 28000   # under the 30,000 characters an agent's shell tool shows of one command's output
INDEX_LINES = 10     # at most this many INDEX.md lines for one topic

USAGE = """usage: facts-extract.sh [--common] [--part N] [--check] [--page-bytes N] [QUERY ...]

Prints the part of the record a task needs: FACTS.md entries whole, each under
its section heading and with its line; INDEX.md lines; sections of the maps and
other notes. The output comes in parts of at most PAGE_BYTES (default 28000);
each part says whether there is a next one, and --part N prints part N. It
says what it did not find.

QUERY is one of:
  TITLE               the FACTS.md entry whose title holds TITLE: an entry's
                      title is its bold opening, or where it has none, its
                      opening words up to the first colon, semicolon or full stop
  section:HEADING     every entry of the FACTS.md section whose heading holds HEADING
  index:WORDS         the INDEX.md lines that hold every one of WORDS, each as a
                      whole word, or as the start of one when it ends in *
                      (at most 10 lines a topic)
  map:FILE#HEADING    the section of explorations/coordinator/map/FILE whose
                      heading holds HEADING, down to the next heading of its level
  doc:PATH#HEADING    the same for any note, PATH from the repository root;
                      doc:PATH alone prints the whole note
Matching ignores case, backticks and double quotes, reads curly quotes as
straight ones, and takes any run of spaces as one space.

  --common            first print what every agent reads: the map's README
                      sections "Terms used here", "The shape of the system" and
                      "Touch this, and that moves", PLAN.md's "The phases", and
                      explorations/repo-internals.md whole
  --check             print one line per query, what it matches and where,
                      and nothing else; exit 1 unless every TITLE, section,
                      map and doc query matches exactly one and every index
                      topic at least one
  --part N            print part N of the output (default 1)
  --page-bytes N      the size of a part (default 28000)
  --facts FILE, --index FILE    read another copy of FACTS.md or INDEX.md
"""


def norm(s):
    s = unicodedata.normalize('NFC', s)
    for a, b in (('‘', "'"), ('’', "'"), ('“', ''), ('”', ''), ('`', ''), ('"', '')):
        s = s.replace(a, b)
    return re.sub(r'\s+', ' ', s).strip().casefold()


def word_pattern(w):
    """A topic word matches a whole word; with a trailing * it matches the
    start of one (wrap* finds wrap, wraps and wrapping)."""
    if w.endswith('*') and len(w) > 1:
        return re.compile(r'(?<!\w)' + re.escape(w[:-1]))
    return re.compile(r'(?<!\w)' + re.escape(w) + r'(?!\w)')


def read_lines(path):
    with open(path, encoding='utf-8') as f:
        return f.read().split('\n')


def rel(path):
    r = os.path.relpath(path, ROOT)
    return os.path.abspath(path) if r.startswith('..') else r


# ---------------------------------------------------------------- FACTS.md

class Entry:
    def __init__(self, line, section, text):
        self.line = line          # 1-based line of the entry's first line
        self.section = section    # its "## " heading, without the hashes
        self.text = text          # the entry verbatim, continuation lines included
        self.title = title_of(text)


def title_of(text):
    body = text[2:]
    if body.startswith('**'):
        end = body.find('**', 2)
        if end > 2:
            return body[2:end]
    # No bold title: the opening words, up to the first colon, semicolon or
    # full stop followed by a space, outside code spans.
    code = False
    for i, c in enumerate(body):
        if c == '`':
            code = not code
        elif not code and c in ':;.' and body[i + 1:i + 2] == ' ':
            return body[:i]
    return body[:200]


def parse_facts(path):
    lines = read_lines(path)
    sections, entries = [], []
    section, cur = None, None
    for n, ln in enumerate(lines, 1):
        if ln.startswith('## '):
            section = ln[3:].strip()
            sections.append((n, section))
            cur = None
        elif ln.startswith('#'):
            cur = None
        elif ln.startswith('- '):
            cur = Entry(n, section, ln)
            entries.append(cur)
        elif ln.strip() and cur is not None and not ln.startswith('<!--'):
            cur.text += '\n' + ln
        elif not ln.strip():
            cur = None
    return sections, entries


def nearest_titles(q, entries, k=3):
    scored = []
    for e in entries:
        t = norm(e.title)
        m = difflib.SequenceMatcher(None, q, t, autojunk=False).find_longest_match(0, len(q), 0, len(t))
        scored.append((m.size, e))
    scored.sort(key=lambda x: -x[0])
    return [e for size, e in scored[:k] if size >= min(12, len(q))]


# ---------------------------------------------------------------- other notes

def md_sections(lines):
    """(level, heading, first line, last line) for every heading, 1-based and
    inclusive; a section runs to the line before the next heading of its level
    or a higher one. Headings inside fenced code are not headings."""
    heads, fence = [], False
    for n, ln in enumerate(lines, 1):
        if ln.startswith('```') or ln.startswith('~~~'):
            fence = not fence
            continue
        m = None if fence else re.match(r'(#{1,6}) +(.*\S)', ln)
        if m:
            heads.append([len(m.group(1)), m.group(2), n, None])
    last = len(lines)
    while last > 0 and not lines[last - 1].strip():
        last -= 1
    for i, h in enumerate(heads):
        end = last
        for later in heads[i + 1:]:
            if later[0] <= h[0]:
                end = later[2] - 1
                break
        while end > h[2] and not lines[end - 1].strip():
            end -= 1
        h[3] = end
    return [tuple(h) for h in heads]


def resolve_doc(spec):
    """'map:FILE#HEADING' or 'doc:PATH#HEADING' -> (path, heading or None)."""
    kind, rest = spec.split(':', 1)
    path, _, heading = rest.partition('#')
    path = path.strip()
    if kind == 'map':
        path = MAPS + path
    if not path.endswith('.md') and not os.path.exists(os.path.join(ROOT, path)):
        path += '.md'
    return os.path.join(ROOT, path), (heading.strip() or None)


def find_doc_sections(spec):
    """-> (path, [(first, last, heading)], error)"""
    path, heading = resolve_doc(spec)
    if not os.path.isfile(path):
        return path, [], 'no such file: ' + rel(path)
    lines = read_lines(path)
    if heading is None:
        last = len(lines)
        while last > 0 and not lines[last - 1].strip():
            last -= 1
        return path, [(1, last, '(the whole note)')], None
    q = norm(heading)
    hits = [(a, b, h) for (lvl, h, a, b) in md_sections(lines) if q in norm(h)]
    # A heading inside another matched section is printed with it.
    hits = [x for x in hits if not any(y is not x and y[0] <= x[0] and x[1] <= y[1] for y in hits)]
    return path, hits, None


# ---------------------------------------------------------------- the run

def main(argv):
    common, check, part, page = False, False, 1, PAGE_BYTES
    facts_path, index_path = FACTS, INDEX
    queries = []
    it = iter(argv)
    try:
        for a in it:
            if a in ('-h', '--help'):
                sys.stdout.write(USAGE)
                return 0
            elif a == '--common':
                common = True
            elif a == '--check':
                check = True
            elif a == '--part':
                part = int(next(it))
            elif a == '--page-bytes':
                page = int(next(it))
            elif a == '--facts':
                facts_path = next(it)
            elif a == '--index':
                index_path = next(it)
            elif a.startswith('--'):
                raise ValueError('unknown option ' + a)
            else:
                queries.append(a)
    except (StopIteration, ValueError) as e:
        sys.stderr.write('facts-extract: %s\n%s' % (e or 'an option lacks its value', USAGE))
        return 2
    if not queries and not common:
        sys.stderr.write(USAGE)
        return 2
    if part < 1 or page < 8000:
        sys.stderr.write('facts-extract: --part is 1 or more, --page-bytes 8000 or more\n')
        return 2

    sections, entries = parse_facts(facts_path)
    index_lines = read_lines(index_path)
    facts_name = os.path.basename(facts_path)

    status, missing, bad = [], [], []     # bad: queries --check refuses
    chosen = {}                           # FACTS line -> Entry
    docs = []                             # (is common, spec, path, first, last)
    index_blocks = []                     # (topic, [(n, line)], total)

    def add_doc(spec, is_common):
        path, hits, err = find_doc_sections(spec)
        if err or not hits:
            why = err or 'no heading holds it'
            missing.append('%s -> %s' % (spec, why))
            status.append('  %-58s NOT FOUND: %s' % (spec, why))
            bad.append(spec)
            return
        if len(hits) > 1 and not is_common:
            bad.append(spec)
        for a, b, h in hits:
            docs.append((is_common, spec, path, a, b))
        where = ', '.join('%s:%d-%d' % (rel(path), a, b) for a, b, h in hits)
        status.append('  %-58s %s%s' % (spec, where, '' if len(hits) == 1 else '  (%d sections)' % len(hits)))

    if common:
        for spec in COMMON:
            add_doc(spec, True)

    for q in queries:
        if q.startswith('section:'):
            want = norm(q[len('section:'):])
            hits = [s for s in sections if want and want in norm(s[1])]
            if not hits:
                missing.append('%s -> no FACTS.md heading holds it' % q)
                status.append('  %-58s NOT FOUND' % q)
                bad.append(q)
                continue
            if len(hits) > 1:
                bad.append(q)
            names = {s[1] for s in hits}
            n = 0
            for e in entries:
                if e.section in names:
                    chosen[e.line] = e
                    n += 1
            status.append('  %-58s %s, %d entries' % (q, '; '.join('%s:%d %s' % (facts_name, s[0], s[1]) for s in hits), n))
        elif q.startswith('index:'):
            words = [word_pattern(w) for w in norm(q[len('index:'):]).split()]
            hits = [(n, ln) for n, ln in enumerate(index_lines, 1)
                    if ln.startswith('- ') and words and all(w.search(norm(ln)) for w in words)]
            if not hits:
                missing.append('%s -> no INDEX.md line holds every word' % q)
                status.append('  %-58s NOT FOUND' % q)
                bad.append(q)
                continue
            index_blocks.append((q[len('index:'):].strip(), hits[:INDEX_LINES], len(hits)))
            status.append('  %-58s %d INDEX.md lines%s' % (q, len(hits), '' if len(hits) <= INDEX_LINES else ', the first %d printed' % INDEX_LINES))
        elif q.startswith('map:') or q.startswith('doc:'):
            add_doc(q, False)
        else:
            want = norm(q)
            hits = [e for e in entries if want and want in norm(e.title)]
            if not hits:
                near = nearest_titles(want, entries)
                hint = ('; nearest: ' + '; '.join('"%s" (%s:%d)' % (e.title[:90], facts_name, e.line) for e in near)) if near else ''
                heads = [h for n, h in sections if want in norm(h)]
                if heads:
                    hint = '; a section heading holds it: section:%s' % heads[0] + hint
                missing.append('"%s" -> no entry\'s title holds it%s' % (q, hint))
                status.append('  %-58s NOT FOUND%s' % ('"%s"' % q, hint))
                bad.append(q)
                continue
            if len(hits) > 1:
                bad.append(q)
            for e in hits:
                chosen[e.line] = e
            status.append('  %-58s %s' % ('"%s"' % q, '; '.join('%s:%d, %s' % (facts_name, e.line, e.section) for e in hits)
                                          + ('' if len(hits) == 1 else '  (%d entries, not one)' % len(hits))))

    if check:
        sys.stdout.write(''.join(s[2:] + '\n' for s in status))
        return 1 if bad else 0

    # Blocks, in reading order: what every agent reads, then the FACTS entries
    # in file order, the INDEX lines, the other sections. Each block is
    # (context heading or None, text); the heading is printed again at the top
    # of a part and wherever it changes.
    blocks = []
    doc_blocks = {True: [], False: []}
    seen = set()
    for is_common, spec, path, a, b in docs:
        if (path, a, b) in seen:
            continue
        seen.add((path, a, b))
        lines = read_lines(path)
        ctx = '== %s:%d-%d' % (rel(path), a, b)
        # A long section is split at blank lines into pieces of about a
        # quarter of a part, so that parts fill evenly; each piece keeps the
        # section's reference.
        piece = []
        for n in range(a, b + 1):
            piece.append(lines[n - 1])
            if n < b and not lines[n].strip() and len('\n'.join(piece).encode('utf-8')) > page // 4:
                doc_blocks[is_common].append((ctx, '\n'.join(piece).strip('\n')))
                piece = []
        if piece:
            doc_blocks[is_common].append((ctx, '\n'.join(piece).strip('\n')))
    blocks += doc_blocks[True]
    for line in sorted(chosen):
        e = chosen[line]
        blocks.append(('== %s, ## %s' % (rel(facts_path), e.section), '%s:%d\n%s' % (facts_name, e.line, e.text)))
    shown = set()
    for topic, hits, total in index_blocks:
        ctx = '== %s, the lines holding "%s"%s' % (rel(index_path), topic, '' if total <= len(hits) else ' (%d of %d)' % (len(hits), total))
        fresh = [(n, ln) for n, ln in hits if n not in shown]
        again = [str(n) for n, ln in hits if n in shown]
        shown.update(n for n, ln in fresh)
        text = '\n'.join('%d: %s' % (n, ln) for n, ln in fresh)
        if again:
            text += ('\n' if text else '') + '(and line%s %s, printed above)' % ('' if len(again) == 1 else 's', ', '.join(again))
        blocks.append((ctx, text))
    blocks += doc_blocks[False]

    # Split the blocks into parts of at most page bytes, never inside a block
    # unless the block alone is larger than a part. Part 1 opens with the list
    # of what was asked for and where it is; the others with one line.
    first_head = ['Asked for, and where it is:'] + status
    if missing:
        first_head.append('Not found (%d): %s' % (len(missing), ' | '.join(missing)))
    room = 300                                            # a part's own first and last lines
    budgets = [page - room - len('\n'.join(first_head).encode('utf-8')), page - room]
    budget_of = lambda k: budgets[0] if k == 0 else budgets[1]
    def cut(text, budget):
        out, piece = [], ''
        for ln in text.split('\n'):
            if piece and len((piece + '\n' + ln).encode('utf-8')) > budget:
                out.append(piece)
                piece = ln
            else:
                piece = ln if not piece else piece + '\n' + ln
        return out + [piece]
    parts, cur, size, ctx_now = [], [], 0, None
    for ctx, text in blocks:
        small = min(budgets) - len(ctx.encode('utf-8')) - 4
        for t in (cut(text, small) if len(text.encode('utf-8')) > small else [text]):
            chunk = ('' if ctx == ctx_now and cur else '\n' + ctx + '\n') + '\n' + t + '\n'
            n = len(chunk.encode('utf-8'))
            if cur and size + n > budget_of(len(parts)):
                parts.append(cur)
                cur, size = [], 0
                chunk = '\n' + ctx + '\n\n' + t + '\n'
                n = len(chunk.encode('utf-8'))
            cur.append(chunk)
            size += n
            ctx_now = ctx
    if cur or not parts:
        parts.append(cur)

    total = len(parts)
    if part == 1:
        head = ['facts-extract: part 1 of %d.' % total] + first_head
    elif part <= total:
        head = ['facts-extract: part %d of %d%s.' % (part, total, '; %d not found, listed at the head of part 1' % len(missing) if missing else '')]
    else:
        sys.stdout.write('facts-extract: there are %d parts, not %d.\n' % (total, part))
        return 2
    body = ''.join(parts[part - 1])
    foot = ('facts-extract: end of part %d of %d; run the same command with --part %d for the next.' % (part, total, part + 1)
            if part < total else 'facts-extract: end of part %d of %d, the last.' % (part, total))
    sys.stdout.write('\n'.join(head) + '\n' + body + '\n' + foot + '\n')
    return 1 if missing else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
