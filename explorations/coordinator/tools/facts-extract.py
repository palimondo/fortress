#!/usr/bin/env python3
"""Print a rung's briefing, or any slice of the project's record, in bounded parts.

Called by facts-extract.sh beside it; run that with --help for the usage.
The record: explorations/coordinator/FACTS.md (what is established, grouped
by area, each entry cited by its title), explorations/coordinator/INDEX.md
(one line per standalone note), POSITIONS.md and POSITIONS-history.md beside
them (Pavol's decisions, each under its bold title, and their dated history),
the gap ledger explorations/fortress-gap-ledger.md (one table row per gap),
the maps under explorations/coordinator/map/, any other note by path and
heading, such as a judge's ruling or a section of the specification's .tex
sources, and code by the declaration it starts at.
"""

import difflib
import os
import re
import sys
import unicodedata

TOOLS = os.path.dirname(os.path.realpath(__file__))
TREE = os.path.dirname(os.path.dirname(os.path.dirname(TOOLS)))   # the checkout this tool is in

FACTS_REL = 'explorations/coordinator/FACTS.md'
INDEX_REL = 'explorations/coordinator/INDEX.md'
POSITIONS_REL = 'explorations/coordinator/POSITIONS.md'
HISTORY_REL = 'explorations/coordinator/POSITIONS-history.md'
LEDGER_REL = 'explorations/fortress-gap-ledger.md'
MAPS = 'explorations/coordinator/map/'

# The record's shared sections, selected by heading. No role of the batch
# script reads them whole since 2026-09-27: printed first to every agent they
# cost more than they saved (explorations/reviews/worker-context-cost.md), and a
# rung's briefing carries the slices of them that bear on the rung instead. A
# planner reads them when choosing those slices.
COMMON = [
    'map:README.md#Terms used here',
    'map:README.md#The shape of the system',
    'map:README.md#Touch this, and that moves',
    'doc:explorations/coordinator/PLAN.md#The phases',
    'doc:explorations/repo-internals.md',
]

PAGE_BYTES = 28000   # under the 30,000 characters an agent's shell tool shows of one command's output
INDEX_LINES = 10     # at most this many INDEX.md lines for one topic
FIND_ROWS = 10       # at most this many ledger rows for one ledger-find: topic
CLAIM_CHARS = 150    # of a row's claim that ledger-find: prints
# What a part costs an agent's context: 0.41 tokens a byte of tool output and
# about 110 a call, fitted on 78 agents' transcripts (worker-context-cost.md,
# "Tokens of a result").
TOKENS_PER_BYTE = 0.41
TOKENS_PER_PART = 110

USAGE = """usage: facts-extract.sh [--check] [--part N] [--page-bytes N] [--root DIR] [--common] [QUERY ...]

Prints what the queries name, whole and in the order they are given; a rung's
briefing is one such command. Each piece comes under a line naming its file
and section. The output comes in parts of at most PAGE_BYTES (default 28000);
part 1 opens with the size of the whole output in bytes and estimated tokens,
then what was asked for, where it is and what was not found; each part says
whether there is a next one, and --part N prints part N.

QUERY is one of:
  TITLE                  the FACTS.md entry whose title holds TITLE: an entry's
                         title is its bold opening, or where it has none, its
                         opening words up to the first colon, semicolon or full stop
  section:HEADING        every entry of the FACTS.md section whose heading holds HEADING
  index:WORDS            the INDEX.md lines that hold every one of WORDS (at most 10)
  ledger:ROW             row ROW of the gap ledger, whole, under its section and
                         the table's header
  ledger-find:WORDS      one line for each gap ledger row that holds every one of
                         WORDS: its number, its status and the first 150 characters
                         of its claim (at most 10, then how many more matched)
  positions:TITLE        the entry of POSITIONS.md whose bold title holds TITLE, as
                         a TITLE query does in FACTS.md; exactly one must, else the
                         nearest titles are named
  positions:DATE WORDS   the entry of POSITIONS.md dated DATE (YYYY-MM-DD, the first
                         date in the entry) whose head, the entry's text up to its
                         first colon and space, holds every one of WORDS; when no
                         entry of POSITIONS.md matches, the entry of
                         POSITIONS-history.md, from the latest of its sections
                         that hold one, with the line saying what became of
                         it; the output says which file it came from
  map:FILE#HEADING       the section of explorations/coordinator/map/FILE whose
                         heading holds HEADING, down to the next heading of its level
  doc:PATH#HEADING       the same for any note, PATH from the repository root, such
                         as a judge's ruling; doc:PATH alone prints the whole note;
                         in a .tex or .tick file the headings are its \\chapter, \\section,
                         \\subsection, \\subsubsection and \\paragraph titles,
                         matched with their macros dropped; a heading equal to
                         HEADING wins over the headings that merely hold it, and
                         HEADING may be a path, A > B, for B's section inside A's
  map:FILE#HEADING@WORDS, doc:PATH#HEADING@WORDS
                         only the table rows and list items of that section that
                         hold every one of WORDS, a row under its table's header,
                         and the paragraphs whose bold lead holds them
  code:PATH#FROM         the declaration that starts on the one line of PATH that
                         holds FROM, with its line numbers: in .java, .scala and
                         .js through the brace that closes it, elsewhere (.fss,
                         .fsi) through its more indented lines and its end
  code:PATH#FROM..TO     from the declaration at FROM through the end of the
                         one at the first line after it that holds TO
WORDS match as whole words, or as the start of one when a word ends in *.
Matching ignores case, backticks and double quotes, reads curly quotes as
straight ones, and takes any run of spaces as one space.

  --check             print one line per query, what it matches, where, and its
                      size in bytes, then the size of the whole output, and
                      nothing else; exit 1 unless every query matches exactly
                      one place (an index or ledger-find topic: at least one line)
  --part N            print part N of the output (default 1)
  --page-bytes N      the size of a part (default 28000)
  --root DIR          read the record and every map: and doc: path from the
                      checkout at DIR instead of this tool's own
  --common            first print the record's shared sections: the map's
                      README "Terms used here", "The shape of the system" and
                      "Touch this, and that moves", PLAN.md's "The phases", and
                      explorations/repo-internals.md whole; no role of the batch
                      script reads them whole, and a planner reads them to
                      choose a rung's slices
  --facts FILE, --index FILE    read another copy of FACTS.md or INDEX.md
"""


def norm(s):
    s = unicodedata.normalize('NFC', s)
    for a, b in (('‘', "'"), ('’', "'"), ('“', ''), ('”', ''), ('`', ''), ('"', '')):
        s = s.replace(a, b)
    return re.sub(r'\s+', ' ', s).strip().casefold()


def word_pattern(w):
    """A word matches a whole word; with a trailing * it matches the start of
    one (wrap* finds wrap, wraps and wrapping)."""
    if w.endswith('*') and len(w) > 1:
        return re.compile(r'(?<!\w)' + re.escape(w[:-1]))
    return re.compile(r'(?<!\w)' + re.escape(w) + r'(?!\w)')


def holds_all(words, text):
    t = norm(text)
    return all(word_pattern(w).search(t) for w in words)


def read_lines(path):
    with open(path, encoding='utf-8') as f:
        return f.read().split('\n')


def nbytes(s):
    return len(s.encode('utf-8'))


def estimate_tokens(size, parts):
    return int(round(size * TOKENS_PER_BYTE + parts * TOKENS_PER_PART, -2))


class Record:
    """Where the record is read from: this tool's checkout, or --root."""
    def __init__(self, root, facts=None, index=None):
        self.root = os.path.abspath(root)
        self.facts = facts or os.path.join(self.root, FACTS_REL)
        self.index = index or os.path.join(self.root, INDEX_REL)
        self.positions = os.path.join(self.root, POSITIONS_REL)
        self.history = os.path.join(self.root, HISTORY_REL)
        self.ledger = os.path.join(self.root, LEDGER_REL)

    def rel(self, path):
        r = os.path.relpath(path, self.root)
        return os.path.abspath(path) if r.startswith('..') else r


# ---------------------------------------------------------------- bulleted files: FACTS.md, POSITIONS.md

class Entry:
    def __init__(self, line, section, text, comment=None):
        self.line = line          # 1-based line of the entry's first line
        self.section = section    # its "## " heading, without the hashes
        self.text = text          # the entry verbatim, continuation lines included
        self.comment = comment    # a one-line <!-- --> note directly above it, if any
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


def head_of(text):
    """A POSITIONS.md entry's head: its first line up to the first colon
    followed by a space, outside code spans, which is where his words begin;
    a colon right after the opening date does not end it."""
    body = text.split('\n', 1)[0][2:]
    lead = re.match(r'\D{0,40}?\d{4}-\d{2}-\d{2}: ', body)
    code = False
    for i, c in enumerate(body):
        if c == '`':
            code = not code
        elif not code and c == ':' and body[i + 1:i + 2] == ' ' and not (lead and i < lead.end()):
            return body[:i]
    return body


DATE = re.compile(r'\d{4}-\d{2}-\d{2}')


def parse_bullets(path):
    lines = read_lines(path)
    sections, entries = [], []
    section, cur, comment = None, None, None
    for n, ln in enumerate(lines, 1):
        if ln.startswith('## '):
            section = ln[3:].strip()
            sections.append((n, section))
            cur, comment = None, None
        elif ln.startswith('#'):
            cur, comment = None, None
        elif ln.startswith('- '):
            cur = Entry(n, section, ln, comment)
            entries.append(cur)
            comment = None
        elif ln.startswith('<!--'):
            if cur is None and ln.rstrip().endswith('-->'):
                comment = ln.strip()
        elif ln.strip() and cur is not None:
            cur.text += '\n' + ln
        elif not ln.strip():
            cur, comment = None, None
    return sections, entries


def nearest_titles(q, entries, k=3):
    scored = []
    for e in entries:
        t = norm(e.title)
        m = difflib.SequenceMatcher(None, q, t, autojunk=False).find_longest_match(0, len(q), 0, len(t))
        scored.append((m.size, e))
    scored.sort(key=lambda x: -x[0])
    return [e for size, e in scored[:k] if size >= min(12, len(q))]


# ---------------------------------------------------------------- the gap ledger

def ledger_rows(path):
    """(row number, line, section, header lines, the row) for every gap row: a
    table row whose first cell is a number."""
    lines = read_lines(path)
    rows, section, header = [], None, []
    for n, ln in enumerate(lines, 1):
        if ln.startswith('## '):
            section = ln[3:].strip()
        if ln.startswith('|') and n < len(lines) and re.match(r'\|\s*:?-{3,}', lines[n]):
            header = [ln, lines[n]]
        m = re.match(r'\|\s*(\d+)\s*\|', ln)
        if m:
            rows.append((int(m.group(1)), n, section, header, ln))
    return rows


def ledger_cells(row):
    """A ledger row's cells, which open with #, claim and status; a cell ends at
    a | that is not escaped and has a space or the line's end after it, since a
    code span such as `opr ||(` holds bare ones."""
    return [c.strip() for c in re.split(r'(?<!\\)\|(?=\s|$)', row.strip())[1:-1]]


def clip(text, n):
    """text cut to at most n characters at a word boundary, marked with … when cut."""
    if len(text) <= n:
        return text
    cut = text[:n + 1]
    return (cut[:cut.rfind(' ')] if ' ' in cut else text[:n]).rstrip() + ' …'


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


TEX = ('.tex', '.tick')   # the specification's sources, and the later restart's
TEX_LEVELS = {'part': 0, 'chapter': 1, 'section': 2, 'subsection': 3, 'subsubsection': 4, 'paragraph': 5}
TEX_HEAD = re.compile(r'\s*\\(part|chapter|section|subsection|subsubsection|paragraph)\*?\s*(?:\[[^\]]*\])?\s*\{(.*)\}')


def tex_title(t):
    """A .tex heading's text with its macros and braces dropped: the words a key
    can name, since a key holds no backslash."""
    t = re.sub(r'\\[A-Za-z]+\*?', ' ', t)
    return re.sub(r'\s+', ' ', t.replace('{', '').replace('}', '').replace('~', ' ')).strip()


def tex_sections(lines):
    """(level, title, first line, last line) for every sectioning command of a
    .tex file, as md_sections does for markdown; a commented-out one is not one."""
    heads = []
    for n, ln in enumerate(lines, 1):
        m = TEX_HEAD.match(ln)
        if m:
            heads.append([TEX_LEVELS[m.group(1)], tex_title(m.group(2)), n, None])
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


def resolve_doc(rec, spec):
    """'map:FILE#HEADING[@WORDS]' or 'doc:PATH#HEADING[@WORDS]' -> (path, heading or None, words or None)."""
    kind, rest = spec.split(':', 1)
    path, _, heading = rest.partition('#')
    heading, _, words = heading.partition('@')
    path = path.strip()
    if kind == 'map':
        path = MAPS + path
    if not path.endswith('.md') and not os.path.exists(os.path.join(rec.root, path)):
        path += '.md'
    return os.path.join(rec.root, path), (heading.strip() or None), (norm(words).split() or None)


ITEM = re.compile(r'(\s*)([-*]|\d+\.) ')


def select_rows(lines, a, b, words):
    """The table rows, list items and bold-lead paragraphs of lines a..b that
    hold every one of words, as (first, last, header lines); a list item keeps
    its indented continuation, and a paragraph that opens with a bold lead, as
    a batch record's do, runs to the next such paragraph or heading and is
    matched by its lead alone."""
    out, header, n = [], [], a
    while n <= b:
        ln = lines[n - 1]
        if ln.startswith('**'):
            end = n
            while end < b and not lines[end].startswith('**') and not lines[end].startswith('#'):
                end += 1
            while end > n and not lines[end - 1].strip():
                end -= 1
            close = ln.find('**', 2)
            if holds_all(words, ln[2:close] if close > 2 else ln):
                out.append((n, end, []))
            n = end + 1
            continue
        if ln.startswith('|'):
            if n < b and re.match(r'\|\s*:?-{3,}', lines[n]):
                header = [ln, lines[n]]
                n += 2
                continue
            if holds_all(words, ln):
                out.append((n, n, header))
            n += 1
            continue
        m = ITEM.match(ln)
        if m:
            end, indent = n, len(m.group(1))
            while end < b and lines[end].strip() and not lines[end].startswith('|') \
                    and (len(lines[end]) - len(lines[end].lstrip())) > indent:
                end += 1
            if holds_all(words, '\n'.join(lines[n - 1:end])):
                out.append((n, end, []))
            n = end + 1
            continue
        n += 1
    return out


# ---------------------------------------------------------------- code

BRACES = ('.java', '.scala', '.js', '.c', '.h')


def decl_end(lines, n, braces):
    """The last line of the declaration that starts on line n (1-based)."""
    if braces:
        depth, opened = 0, False
        for k in range(n, min(len(lines), n + 800) + 1):
            ln = re.sub(r'"(\\.|[^"\\])*"|' + r"'(\\.|[^'\\])*'", '""', lines[k - 1])
            ln = ln.split('//', 1)[0]
            for c in ln:
                if c == '{':
                    depth, opened = depth + 1, True
                elif c == '}':
                    depth -= 1
            if opened and depth <= 0:
                return k
        return n
    indent = len(lines[n - 1]) - len(lines[n - 1].lstrip())
    end, k = n, n + 1
    while k <= len(lines):
        ln = lines[k - 1]
        if ln.strip():
            ind = len(ln) - len(ln.lstrip())
            if ind > indent:
                end = k
            else:
                if ind == indent and re.match(r'end\b', ln.strip()):
                    end = k
                break
        k += 1
    return end


def find_code(rec, spec):
    f = Found(spec)
    rest = spec[len('code:'):]
    path, _, anchors = rest.partition('#')
    frm, _, to = anchors.partition('..')
    path = os.path.join(rec.root, path.strip())
    if not os.path.isfile(path):
        f.bad, f.missing = True, 'no such file: ' + rec.rel(path)
        return f
    if not frm.strip():
        f.bad, f.missing = True, 'a code: key names the line its declaration starts at, after #'
        return f
    lines = read_lines(path)
    want = norm(frm)
    starts = [n for n, ln in enumerate(lines, 1) if want in norm(ln)]
    if not starts:
        f.bad, f.missing = True, 'no line of %s holds "%s"' % (rec.rel(path), frm.strip())
        return f
    f.bad = len(starts) > 1
    braces = path.endswith(BRACES)
    spans = []
    for a in starts:
        b = decl_end(lines, a, braces)
        if to.strip():
            want_to = norm(to)
            later = [n for n in range(a + 1, len(lines) + 1) if want_to in norm(lines[n - 1])]
            if not later:
                f.bad, f.missing = True, 'no line of %s after :%d holds "%s"' % (rec.rel(path), a, to.strip())
                return f
            b = max(b, decl_end(lines, later[0], braces))
        spans.append((a, b))
    for a, b in spans:
        width = len(str(b))
        f.blocks.append(('== %s:%d-%d' % (rec.rel(path), a, b),
                         '\n'.join('%*d  %s' % (width, n, lines[n - 1]) for n in range(a, b + 1))))
    f.where = ', '.join('%s:%d-%d' % (rec.rel(path), a, b) for a, b in spans) + ('' if len(spans) == 1 else '  (%d lines hold it, not one)' % len(spans))
    return f


# ---------------------------------------------------------------- the run

class Found:
    """What one query found: where, its blocks, and whether --check refuses it."""
    def __init__(self, query, label=None):
        self.query = query
        self.label = label or query
        self.where = ''
        self.blocks = []          # (context line, text)
        self.bad = False
        self.missing = None       # why nothing was found


def find_doc(rec, spec, one):
    f = Found(spec)
    path, heading, words = resolve_doc(rec, spec)
    if not os.path.isfile(path):
        f.bad, f.missing = True, 'no such file: ' + rec.rel(path)
        return f
    lines = read_lines(path)
    if heading is None:
        last = len(lines)
        while last > 0 and not lines[last - 1].strip():
            last -= 1
        hits = [(1, last, '(the whole note)')]
    else:
        heads = tex_sections(lines) if path.endswith(TEX) else md_sections(lines)
        # HEADING may name a path, "A > B": B's section inside A's.
        hits = None
        for part in heading.split(' > '):
            q = norm(part)
            within = [(a, b, h) for (lvl, h, a, b) in heads if q in norm(h)
                      and (hits is None or any(pa <= a and b <= pb and (pa, pb) != (a, b) for pa, pb, ph in hits))]
            # A heading that is the query exactly wins over the ones that hold it.
            hits = [x for x in within if norm(x[2]) == q] or within
        # A heading inside another matched section is printed with it.
        hits = [x for x in hits if not any(y is not x and y[0] <= x[0] and x[1] <= y[1] for y in hits)]
    if not hits:
        f.bad, f.missing = True, 'no heading holds it'
        return f
    if words:
        rows = []
        for a, b, h in hits:
            rows += [(r, e, hd, a, b) for (r, e, hd) in select_rows(lines, a, b, words)]
        if not rows:
            f.bad, f.missing = True, 'no table row or list item of %s holds every word' % ', '.join(
                '%s:%d-%d' % (rec.rel(path), a, b) for a, b, h in hits)
            return f
        f.bad = len(rows) > 1
        for r, e, hd, a, b in rows:
            ctx = '== %s:%d-%d, %s' % (rec.rel(path), a, b, 'the row at :%d' % r if r == e else 'the item at :%d-%d' % (r, e))
            f.blocks.append((ctx, '\n'.join(hd + lines[r - 1:e])))
        f.where = ', '.join('%s:%d%s' % (rec.rel(path), r, '' if r == e else '-%d' % e) for r, e, hd, a, b in rows) \
            + ('' if len(rows) == 1 else '  (%d rows, not one)' % len(rows))
        return f
    f.bad = len(hits) > 1 and one
    for a, b, h in hits:
        ctx = '== %s:%d-%d' % (rec.rel(path), a, b)
        # A long section is split at blank lines into pieces of about a
        # quarter of a part, so that parts fill evenly; each piece keeps the
        # section's reference.
        piece = []
        for n in range(a, b + 1):
            piece.append(lines[n - 1])
            if n < b and not lines[n].strip() and nbytes('\n'.join(piece)) > PAGE_BYTES // 4:
                f.blocks.append((ctx, '\n'.join(piece).strip('\n')))
                piece = []
        if piece:
            f.blocks.append((ctx, '\n'.join(piece).strip('\n')))
    f.where = ', '.join('%s:%d-%d' % (rec.rel(path), a, b) for a, b, h in hits) + ('' if len(hits) == 1 else '  (%d sections)' % len(hits))
    return f


def main(argv):
    common, check, part, page = False, False, 1, PAGE_BYTES
    root, facts_path, index_path = TREE, None, None
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
            elif a == '--root':
                root = next(it)
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
    if not os.path.isdir(root):
        sys.stderr.write('facts-extract: --root %s is not a directory\n' % root)
        return 2

    rec = Record(root, facts_path, index_path)
    parsed = {}
    def bullets(path):
        if path not in parsed:
            parsed[path] = parse_bullets(path) if os.path.isfile(path) else ([], [])
        return parsed[path]
    sections, entries = bullets(rec.facts)
    facts_name = os.path.basename(rec.facts)
    index_lines = read_lines(rec.index)
    rows = ledger_rows(rec.ledger) if os.path.isfile(rec.ledger) else []

    found = []
    for spec in (COMMON if common else []):
        f = find_doc(rec, spec, False)
        f.label = '--common ' + spec
        found.append(f)

    for q in queries:
        if q.startswith('section:'):
            f = Found(q)
            want = norm(q[len('section:'):])
            hits = [s for s in sections if want and want in norm(s[1])]
            if not hits:
                f.bad, f.missing = True, 'no FACTS.md heading holds it'
            else:
                f.bad = len(hits) > 1
                names = {s[1] for s in hits}
                chosen = [e for e in entries if e.section in names]
                for e in chosen:
                    f.blocks.append(('== %s, ## %s' % (rec.rel(rec.facts), e.section), '%s:%d\n%s' % (facts_name, e.line, e.text)))
                f.where = '%s, %d entries' % ('; '.join('%s:%d %s' % (facts_name, s[0], s[1]) for s in hits), len(chosen))
        elif q.startswith('index:'):
            f = Found(q)
            words = norm(q[len('index:'):]).split()
            hits = [(n, ln) for n, ln in enumerate(index_lines, 1)
                    if ln.startswith('- ') and words and holds_all(words, ln)]
            if not hits:
                f.bad, f.missing = True, 'no INDEX.md line holds every word'
            else:
                shown = hits[:INDEX_LINES]
                ctx = '== %s, the lines holding "%s"%s' % (rec.rel(rec.index), q[len('index:'):].strip(),
                                                           '' if len(hits) <= INDEX_LINES else ' (%d of %d)' % (len(shown), len(hits)))
                f.blocks.append((ctx, '\n'.join('%d: %s' % (n, ln) for n, ln in shown)))
                f.where = '%d INDEX.md lines%s' % (len(hits), '' if len(hits) <= INDEX_LINES else ', the first %d printed' % INDEX_LINES)
        elif q.startswith('ledger:'):
            f = Found(q)
            want = q[len('ledger:'):].strip()
            hits = [r for r in rows if want.isdigit() and r[0] == int(want)]
            if not hits:
                f.bad, f.missing = True, ('no such row in ' + rec.rel(rec.ledger)) if want.isdigit() else 'a ledger row is a number'
            else:
                f.bad = len(hits) > 1
                name = os.path.basename(rec.ledger)
                for num, n, sec, header, ln in hits:
                    f.blocks.append(('== %s, ## %s' % (rec.rel(rec.ledger), sec), '%s:%d\n%s' % (name, n, '\n'.join(header + [ln]))))
                f.where = '; '.join('%s:%d, %s' % (name, n, sec) for num, n, sec, header, ln in hits) \
                    + ('' if len(hits) == 1 else '  (%d rows, not one)' % len(hits))
        elif q.startswith('ledger-find:'):
            f = Found(q)
            words = norm(q[len('ledger-find:'):]).split()
            hits = [r for r in rows if words and holds_all(words, r[4])]
            if not hits:
                f.bad, f.missing = True, 'no row of %s holds every word' % rec.rel(rec.ledger)
            else:
                shown = hits[:FIND_ROWS]
                out = []
                for num, n, sec, header, ln in shown:
                    cells = ledger_cells(ln) + ['', '', '']
                    out.append('%d | %s | %s' % (num, cells[2], clip(cells[1], CLAIM_CHARS)))
                if len(hits) > len(shown):
                    out.append('... and %d more rows hold every word; add a word to narrow them' % (len(hits) - len(shown)))
                ctx = '== %s, the rows holding "%s"%s' % (rec.rel(rec.ledger), q[len('ledger-find:'):].strip(),
                                                         '' if len(hits) <= FIND_ROWS else ' (%d of %d)' % (len(shown), len(hits)))
                f.blocks.append((ctx, '\n'.join(out)))
                f.where = '%d ledger rows%s' % (len(hits), '' if len(hits) <= FIND_ROWS else ', the first %d printed' % FIND_ROWS)
        elif q.startswith('positions:'):
            f = Found(q)
            key = q[len('positions:'):].strip()
            m = re.match(r'(\d{4}-\d{2}-\d{2})\s*(.*)$', key)
            if not m:
                # A key with no date: its words as a substring of one bold title of POSITIONS.md.
                want, name = norm(key), os.path.basename(rec.positions)
                titled = [e for e in bullets(rec.positions)[1] if e.text[2:].startswith('**')]
                hits = [e for e in titled if want and want in norm(e.title)]
                if len(hits) == 1:
                    e = hits[0]
                    f.blocks.append(('== %s, ## %s' % (rec.rel(rec.positions), e.section), '%s:%d\n%s' % (name, e.line, e.text)))
                    f.where = '%s:%d' % (name, e.line)
                else:
                    near = hits[:3] or nearest_titles(want, titled)
                    f.bad, f.missing = True, '%s of %s %s it%s' % (
                        '%d bold titles' % len(hits) if hits else 'no bold title', name, 'hold' if hits else 'holds',
                        ('; nearest: ' + '; '.join('"%s" (%s:%d)' % (e.title[:90], name, e.line) for e in near)) if near else '')
            else:
                date, words = m.group(1), norm(m.group(2)).split()
                def match(path):
                    out = []
                    for e in bullets(path)[1]:
                        head = head_of(e.text)
                        d = DATE.search(head)
                        if d and d.group(0) == date and holds_all(words, head):
                            out.append(e)
                    return out
                hits, path, note = match(rec.positions), rec.positions, ''
                if not hits:
                    hits, path = match(rec.history), rec.history
                    note = ', from %s, not in %s' % (os.path.basename(rec.history), os.path.basename(rec.positions))
                    if len({e.section for e in hits}) > 1:
                        # Several texts of one entry, each under the dated section that moved it: the latest.
                        hits = [e for e in hits if e.section == hits[-1].section]
                        note += ', its latest section'
                if not hits:
                    dated = [(os.path.basename(p), e) for p in (rec.positions, rec.history) for e in bullets(p)[1]
                             if (DATE.search(head_of(e.text)) or [None])[0] == date]
                    hint = ('; the heads of that date: ' + '; '.join('"%s" (%s:%d)' % (head_of(e.text)[:80], n, e.line) for n, e in dated[:8])
                            + ('; and %d more' % (len(dated) - 8) if len(dated) > 8 else '')) if dated else ''
                    f.bad, f.missing = True, 'no entry of %s or %s dated %s has a head holding every word%s' % (
                        os.path.basename(rec.positions), os.path.basename(rec.history), date, hint)
                else:
                    f.bad = len(hits) > 1
                    name = os.path.basename(path)
                    for e in hits:
                        comment = (e.comment + '\n') if (e.comment and path == rec.history) else ''
                        f.blocks.append(('== %s, ## %s%s' % (rec.rel(path), e.section, note), '%s:%d\n%s%s' % (name, e.line, comment, e.text)))
                    f.where = '; '.join('%s:%d' % (name, e.line) for e in hits) + ('' if len(hits) == 1 else '  (%d entries, not one)' % len(hits))
        elif q.startswith('map:') or q.startswith('doc:'):
            f = find_doc(rec, q, True)
        elif q.startswith('code:'):
            f = find_code(rec, q)
        else:
            f = Found(q, '"%s"' % q)
            want = norm(q)
            hits = [e for e in entries if want and want in norm(e.title)]
            if not hits:
                near = nearest_titles(want, entries)
                hint = ('; nearest: ' + '; '.join('"%s" (%s:%d)' % (e.title[:90], facts_name, e.line) for e in near)) if near else ''
                heads = [h for n, h in sections if want in norm(h)]
                if heads:
                    hint = '; a section heading holds it: section:%s' % heads[0] + hint
                f.bad, f.missing = True, 'no entry\'s title holds it' + hint
            else:
                f.bad = len(hits) > 1
                for e in hits:
                    f.blocks.append(('== %s, ## %s' % (rec.rel(rec.facts), e.section), '%s:%d\n%s' % (facts_name, e.line, e.text)))
                f.where = '; '.join('%s:%d, %s' % (facts_name, e.line, e.section) for e in hits) \
                    + ('' if len(hits) == 1 else '  (%d entries, not one)' % len(hits))
        found.append(f)

    # The blocks in the order asked, each printed once.
    blocks, seen = [], set()
    for f in found:
        for b in f.blocks:
            if b not in seen:
                seen.add(b)
                blocks.append(b)

    def status(f):
        if f.missing:
            return '  %-58s NOT FOUND: %s' % (f.label, f.missing)
        return '  %-58s %s  [%d bytes]' % (f.label, f.where, sum(nbytes(t) for c, t in f.blocks))
    status_lines = [status(f) for f in found]
    missing = ['%s -> %s' % (f.label, f.missing) for f in found if f.missing]

    # Split the blocks into parts of at most page bytes, never inside a block
    # unless the block alone is larger than a part. Part 1 opens with the size
    # line and the list of what was asked for and where it is; the others with
    # one line.
    first_head = ['Asked for, and where it is:'] + status_lines
    if missing:
        first_head.append('Not found (%d): %s' % (len(missing), ' | '.join(missing)))
    room = 400                                            # a part's own first and last lines
    budgets = [page - room - nbytes('\n'.join(first_head)), page - room]
    budget_of = lambda k: budgets[0] if k == 0 else budgets[1]
    def long_line(ln, budget):
        # A line longer than a part, such as a ledger row at a small page, is
        # split at spaces.
        out, piece = [], ''
        for w in ln.split(' '):
            if piece and nbytes(piece + ' ' + w) > budget:
                out.append(piece)
                piece = w
            else:
                piece = w if not piece else piece + ' ' + w
        return out + [piece]
    def cut(text, budget):
        out, piece = [], ''
        lines = []
        for ln in text.split('\n'):
            lines += long_line(ln, budget) if nbytes(ln) > budget else [ln]
        for ln in lines:
            if piece and nbytes(piece + '\n' + ln) > budget:
                out.append(piece)
                piece = ln
            else:
                piece = ln if not piece else piece + '\n' + ln
        return out + [piece]
    parts, cur, size, ctx_now = [], [], 0, None
    for ctx, text in blocks:
        small = min(budgets) - nbytes(ctx) - 4
        for t in (cut(text, small) if nbytes(text) > small else [text]):
            chunk = ('' if ctx == ctx_now and cur else '\n' + ctx + '\n') + '\n' + t + '\n'
            n = nbytes(chunk)
            if cur and size + n > budget_of(len(parts)):
                parts.append(cur)
                cur, size = [], 0
                chunk = '\n' + ctx + '\n\n' + t + '\n'
                n = nbytes(chunk)
            cur.append(chunk)
            size += n
            ctx_now = ctx
    if cur or not parts:
        parts.append(cur)
    total = len(parts)

    def render(k, size_line):
        if k == 1:
            head = ['facts-extract: part 1 of %d. %s' % (total, size_line)] + first_head
        else:
            head = ['facts-extract: part %d of %d%s.' % (k, total, '; %d not found, listed at the head of part 1' % len(missing) if missing else '')]
        foot = ('facts-extract: end of part %d of %d; run the same command with --part %d for the next.' % (k, total, k + 1)
                if k < total else 'facts-extract: end of part %d of %d, the last.' % (k, total))
        return '\n'.join(head) + '\n' + ''.join(parts[k - 1]) + '\n' + foot + '\n'

    # The size of everything the parts print, their heads included, and what
    # it costs a reader's context.
    size_line = ''
    for _ in range(3):
        out_bytes = sum(nbytes(render(k, size_line)) for k in range(1, total + 1))
        size_line = 'Its %s print%s %d bytes, about %d tokens.' % (
            '1 part' if total == 1 else '%d parts' % total, 's' if total == 1 else '', out_bytes, estimate_tokens(out_bytes, total))

    if check:
        sys.stdout.write(''.join(s[2:] + '\n' for s in status_lines))
        sys.stdout.write('Total: ' + size_line[4:] + '\n')
        return 1 if any(f.bad for f in found) else 0

    if part > total:
        sys.stdout.write('facts-extract: there are %d parts, not %d.\n' % (total, part))
        return 2
    sys.stdout.write(render(part, size_line))
    return 1 if missing else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
