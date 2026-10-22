#!/usr/bin/env python3
"""The gap ledger's tool: it owns the ledger's format, reads its rows, and is
the only way to write them.

The ledger, explorations/fortress-gap-ledger.md, is sorted into topic sections,
each a "## TITLE" heading over one table of rows. A row is one line of eight
cells, and keeps its number wherever it sits:

  | # | claim | status | class | spec citation | reproducer | found by | notes / workaround |

The template (POSITIONS.md, "The gap ledger's form"; the proposal behind it is
explorations/coordinator/process-engineering/gap-ledger-archaeology.md, 4.1):
  status       exactly one of POSITIVE-VERIFIED, NEGATIVE-VERIFIED,
               NEGATIVE-BOUNDED, CONTESTED, RETIRED, FIXED, DUPLICATE
  class        `kind (area)`, kind one of the legend's seven, area one of ten;
               `—` only for POSITIVE-VERIFIED and RETIRED
  spec         the .tex file and the section heading in quotes; a line number
               only against Specification-1.0-frozen/; `silent` where the
               specification does not say
  reproducer   one test (a name under the test folders, or a path) or probe
               path from the repository root, or `none`
  limits       row 1,200 characters, claim 300, reproducer 200, found by 60,
               notes 700
  a pipe inside a cell is written \\|

Cells are split only at a pipe that is not escaped as \\|. A row whose cells
hold bare pipes (the ledger had six) does not split into its table's width that
way; it is read by its split at pipes followed by a space or the line's end, as
facts-extract.py has always read it, and check reports it under `pipe`.

Every write takes a lock (flock on .ledger.lock beside the ledger), checks the
template on the line it writes, and puts the full earlier line of a row it
changes, unchanged, in the history file beside the ledger
(fortress-gap-ledger-history.md), under "### Row N" and a line saying what
became of it. A failed check prints the rules the row breaks and exits 1.
add, rewrite, close and duplicate check the whole line they write; note checks
only what it changes (the notes cell and the row's length), so that a row
failing the template elsewhere still takes a note. A row at its length limit
takes no note: rewrite cuts it back (the rework's decision D4, "each is cut
when next edited", process-engineering/gap-ledger-archaeology.md).

usage: ledger.py COMMAND [ARGS] [--root DIR] [--ledger FILE] [--history FILE]

  heads                      one tab-separated line per row: number, status,
                             class, the claim's first 150 characters, and the
                             paths the row cites in backticks
  sections                   each section that holds a row table: its row
                             count and title, tab-separated
  section TITLE              the heads of that section's rows
  show N [--short]           row N under its section and table header; with
                             --short, its status, class, claim and the notes'
                             first 300 characters
  find WORDS [--open] [--cites FILE[:LINE]] [--all]
                             one line per row that holds every word (whole
                             words, or a word's start with a trailing *):
                             number, status, class, the claim's start; --open
                             leaves out FIXED, DUPLICATE and RETIRED; --cites
                             keeps the rows citing FILE (at LINE) and prints
                             the lines they cite; at most 10 rows unless --all
  count                      the rows by status, kind and area; nothing stored
  add FILE --section TITLE   FILE holds one row line, its # cell `?` (or the
                             seven cells after it); numbers it max + 1 and
                             inserts it in that section's table in number
                             order
  note N TEXT                adds TEXT to row N's notes, before the row's own
                             "full text: history, row N" marker where it has
                             one, else at their end (notes of `none` are
                             replaced); checks the notes cell and the row's
                             length only, so a failure in another cell does
                             not block it; a row keeps its own cells
  rewrite N FILE             FILE holds row N's whole new line (its # cell N
                             or ?, or the seven cells after it); checks it
                             against the template and writes it in the row's
                             place, its earlier line in the history
                             ("rewritten"): the route that corrects a claim,
                             cuts notes, or moves a reproducer. A FIXED or
                             DUPLICATE row stays so (a FIXED row's commit is
                             checked); a row becomes one only by close or
                             duplicate
  close N --commit HASH --test NAME [--settled TEXT] [--note TEXT] [--claim C]
        [--class C] [--spec C] [--found-by C]
                             after the fix has landed: HASH must be in HEAD's
                             history; NAME a test under the test folders, a
                             file under explorations/coordinator/tools/ (a
                             tool's own test), or none, which needs --note
                             with the reason; a CONTESTED row needs --settled
                             naming what settled its question (the curator's
                             answer, a POSITIONS entry), and only it takes
                             it; writes the one-line FIXED row (the claim's
                             first sentence, the test or none as reproducer,
                             notes `fixed HASH[; settled by TEXT][; TEXT];
                             full text: history, row N`); the options give
                             cells the old row lacks in the template's form
  duplicate N --of M [--add TEXT] [--claim C] [--class C] [--spec C]
        [--reproducer C] [--found-by C]
                             makes row N a DUPLICATE pointer to row M (notes
                             `duplicate of row M; full text: history, row N`);
                             --add appends TEXT to row M's notes
  check [--rows FILE] [--base COMMIT] [--summary]
                             lints every row against the template, and the
                             tables' headers, numbers and order; --rows lints
                             a file holding only row lines instead; --base
                             also checks that every row at COMMIT is the same
                             line now or has its full earlier line in the
                             history file, and that the set of row numbers is
                             unchanged; --summary prints only the counts by
                             rule; exit 1 on any failure
  landing-check BASE [--head REV] [--facts FILE] [--positions FILE]
                             the checks of a landing that need no reading
                             (ledger-health-2026-10-22/REPORT.md, 6.3), on the
                             ledger and on BASE..REV (REV default HEAD), one
                             line per finding, exit 1 on any:
                               template  check with no allowance, and check
                                 --base BASE (new rows allowed, none gone)
                               xxx-gone  each XXX test of the test folders
                                 that the diff deletes or renames, with the
                                 open rows that still name it
                               commit-says-fixed, subject-names-row  each open
                                 row that a commit of the range touching code
                                 or the tools says it fixed (row N fixed,
                                 repaired (rows N, M), fixes row N), or names
                                 in its subject as (row N), and whose line is
                                 the same as at BASE
                               record  each row whose status a FACTS or
                                 POSITIONS entry changed since BASE states
                                 otherwise, in words next to its number (row N
                                 is fixed, row N stays open), or that it names
                                 under "Still to build:" while closed
                             The files are the tree's (FACTS, POSITIONS, the
                             ledger and its history); a past range is checked
                             with copies at REV (--ledger, --history, --facts,
                             --positions)

Text given on the command line (TEXT, C) has its bare pipes escaped.
"""

import argparse
import collections
import fcntl
import os
import re
import subprocess
import sys
import tempfile
import unicodedata

TOOLS = os.path.dirname(os.path.realpath(__file__))
TREE = os.path.dirname(os.path.dirname(os.path.dirname(TOOLS)))   # the checkout this tool is in

LEDGER_REL = 'explorations/fortress-gap-ledger.md'
HISTORY_NAME = 'fortress-gap-ledger-history.md'
LOCK_NAME = '.ledger.lock'

HEADER = ('#', 'claim', 'status', 'class', 'spec citation', 'reproducer', 'found by', 'notes / workaround')
CELLS = ('num', 'claim', 'status', 'class', 'spec', 'reproducer', 'found_by', 'notes')
# A header title to its cell; row 83's table names its notes "why unsettled".
HEADER_NAMES = dict(zip(HEADER, CELLS), **{'why unsettled': 'notes'})

STATUSES = ('POSITIVE-VERIFIED', 'NEGATIVE-VERIFIED', 'NEGATIVE-BOUNDED', 'CONTESTED', 'RETIRED', 'FIXED', 'DUPLICATE')
CLOSED = ('FIXED', 'DUPLICATE', 'RETIRED')
NO_CLASS = ('POSITIVE-VERIFIED', 'RETIRED')
KINDS = ('implementation gap', 'library gap vs spec', 'library bug', 'design limit', 'deliberate', 'typesetter', 'packaging')
AREAS = ('parser', 'walk', 'checker', 'codegen', 'runtime', 'library', 'prelude', 'specification', 'tests', 'tools')
DASH = '—'
LIMITS = (('row', 1200), ('claim', 300), ('reproducer', 200), ('found_by', 60), ('notes', 700))
HEAD_CLAIM = 150      # of a row's claim that heads and find print
SHORT_NOTES = 300     # of a row's notes that show --short prints
FIND_ROWS = 10        # rows find prints without --all
VACANT = {148}        # never used: run-c's row 148 was merged into row 8
FROZEN = 'Specification-1.0-frozen/'
PLACEHOLDERS = ('?', '#', 'N', '')
TEST_FOLDERS_EXTRA = ('shelltests', 'compiler_regressions', 'long_term_not_working', 'not_passing_yet', 'test_library')
TOOLS_REL = 'explorations/coordinator/tools'    # a tool's own test may close a row of the tools
FACTS_REL = 'explorations/coordinator/FACTS.md'
POSITIONS_REL = 'explorations/coordinator/POSITIONS.md'
MARKER = 'full text: history, row %d'
# The cell each template rule checks; row-length, cells and pipe are the line's own.
RULE_CELL = {'number': 'num', 'status': 'status', 'class': 'class',
             'spec': 'spec', 'spec-path': 'spec', 'spec-line': 'spec', 'spec-section': 'spec',
             'reproducer': 'reproducer', 'reproducer-path': 'reproducer', 'reproducer-length': 'reproducer',
             'claim': 'claim', 'claim-length': 'claim', 'found-by': 'found_by', 'found-by-length': 'found_by',
             'notes-length': 'notes', 'closed': 'notes'}

SEP = re.compile(r'\|\s*:?-{3,}')
ROW = re.compile(r'\|\s*(\d+)\s*\|')
STRICT = re.compile(r'(?<!\\)\|')
LENIENT = re.compile(r'(?<!\\)\|(?=\s|$)')
CLASS = re.compile(r'(%s) \((%s)\)$' % ('|'.join(map(re.escape, KINDS)), '|'.join(AREAS)))
SPEC_FILE = re.compile(r'((?:[\w.+-]+/)*[\w.+-]+\.tex)(:\d[\d,:\s-]*)?')
QUOTED = re.compile(r'"([^"]+)"|“([^”]+)”')
TEX_HEAD = re.compile(r'\s*\\(?:part|chapter|section|subsection|subsubsection|paragraph)\*?\s*(?:\[[^\]]*\])?\s*\{(.*)\}')
PATH_EXT = re.compile(r'\.(fss|fsi|java|scala|tex|tick|rats|test|md|js|py|sh|out|txt|ast|xml|jj|log|csv|json|html|properties)$')
HASH = re.compile(r'\b[0-9a-f]{7,40}\b')


class LedgerError(Exception):
    pass


# ---------------------------------------------------------------- reading

def split_cells(line, pattern=STRICT):
    """A table line's cells, stripped: the text between the first and the last pipe, cut at pattern."""
    return [c.strip() for c in pattern.split(line.strip())[1:-1]]


def join_cells(cells):
    return '| ' + ' | '.join(cells) + ' |'


class Table:
    def __init__(self, section, index, header):
        self.section = section     # the Section it is under, or None
        self.index = index         # 0-based line of its header
        self.header = header       # its header and separator lines
        self.titles = split_cells(header[0]) if header else list(HEADER)
        self.names = [HEADER_NAMES.get(t) for t in self.titles]
        self.rows = []

    @property
    def holds_rows(self):
        return bool(self.names) and self.names[0] == 'num'


TEMPLATE = Table(None, -1, [join_cells(HEADER), '|' + '---|' * len(HEADER)])


class Section:
    def __init__(self, title, index):
        self.title = title
        self.index = index
        self.tables = []

    @property
    def rows(self):
        return [r for t in self.tables for r in t.rows]

    @property
    def row_tables(self):
        return [t for t in self.tables if t.holds_rows]


class Row:
    def __init__(self, num, lineno, section, table, line):
        self.num = num             # its number, or None for a line whose # cell is not one
        self.lineno = lineno       # 1-based line in its file
        self.section = section     # the title of the "## " section it is under, or None
        self.table = table
        self.header = table.header
        self.line = line
        width = len(table.names)
        cells = split_cells(line)
        self.split = 'strict'
        if len(cells) != width:
            lenient = split_cells(line, LENIENT)
            if len(lenient) == width:
                cells, self.split = lenient, 'lenient'
            else:
                self.split = 'bad'
        self.cells = cells
        self.by = {}
        for name, c in zip(table.names, cells):
            if name and name not in self.by:
                self.by[name] = c

    def get(self, name):
        return self.by.get(name, '')

    claim = property(lambda self: self.get('claim'))
    status = property(lambda self: self.get('status'))
    klass = property(lambda self: self.get('class'))
    spec = property(lambda self: self.get('spec'))
    reproducer = property(lambda self: self.get('reproducer'))
    found_by = property(lambda self: self.get('found_by'))
    notes = property(lambda self: self.get('notes'))

    @property
    def status_word(self):
        """The status, or for a cell that is not one word of the seven, the first such word it opens with."""
        s = self.status
        if s in STATUSES:
            return s
        m = re.match(r'[A-Z-]+', s)
        return m.group(0) if m and m.group(0) in STATUSES else s

    def template_cells(self):
        """The eight cells of the template, '' where the row's table lacks one."""
        return [self.get(n) if n != 'num' else str(self.num) for n in CELLS]


class Ledger:
    def __init__(self, path, text=None):
        self.path = path
        if text is None:
            with open(path, encoding='utf-8') as f:
                text = f.read()
        self.lines = text.split('\n')
        self.sections, self.tables, self.rows = [], [], []
        section, table = None, None
        for i, ln in enumerate(self.lines):
            if ln.startswith('## '):
                section = Section(ln[3:].strip(), i)
                self.sections.append(section)
            if ln.startswith('|') and i + 1 < len(self.lines) and SEP.match(self.lines[i + 1]):
                table = Table(section, i, [ln, self.lines[i + 1]])
                self.tables.append(table)
                if section is not None:
                    section.tables.append(table)
            m = ROW.match(ln)
            if m:
                row = Row(int(m.group(1)), i + 1, section.title if section else None, table or TEMPLATE, ln)
                if table is None:
                    row.header = []     # a row above every table: read by the template, printed with no header
                self.rows.append(row)
                if table is not None:
                    table.rows.append(row)

    def text(self):
        return '\n'.join(self.lines)

    def find(self, num):
        return [r for r in self.rows if r.num == num]

    def one(self, num):
        hits = self.find(num)
        if not hits:
            raise LedgerError('there is no row %d in %s' % (num, self.path))
        if len(hits) > 1:
            raise LedgerError('row %d is on %d lines (%s); check reports it' % (
                num, len(hits), ', '.join(str(r.lineno) for r in hits)))
        return hits[0]

    @property
    def row_sections(self):
        return [s for s in self.sections if s.row_tables]

    def section(self, title, exact=False):
        """The section with a row table whose title is TITLE, with or without its leading number; unless exact, else the one whose title holds it."""
        want = norm(title)
        secs = self.row_sections
        hits = [s for s in secs if norm(s.title) == want or norm(re.sub(r'^\d+\.\s*', '', s.title)) == want]
        if not hits and not exact:
            hits = [s for s in secs if want and want in norm(s.title)]
        if len(hits) == 1:
            return hits[0]
        if not hits:
            raise LedgerError('no section with a row table is titled "%s"; the sections: %s' % (
                title, '; '.join('"%s"' % s.title for s in secs)))
        raise LedgerError('"%s" names %d sections: %s' % (title, len(hits), '; '.join('"%s"' % s.title for s in hits)))


def rows_file(path, text=None):
    """The rows of a file that holds only row lines, read against the template's header; lines that are not rows come back apart."""
    if text is None:
        with open(path, encoding='utf-8') as f:
            text = f.read()
    rows, other = [], []
    for i, ln in enumerate(text.split('\n'), 1):
        if not ln.strip():
            continue
        if not ln.lstrip().startswith('|'):
            other.append((i, ln))
            continue
        m = ROW.match(ln.lstrip())
        rows.append(Row(int(m.group(1)) if m else None, i, None, TEMPLATE, ln.strip()))
    return rows, other


# ---------------------------------------------------------------- text helpers

def norm(s):
    s = unicodedata.normalize('NFC', s)
    for a, b in (('‘', "'"), ('’', "'"), ('“', ''), ('”', ''), ('`', ''), ('"', '')):
        s = s.replace(a, b)
    return re.sub(r'\s+', ' ', s).strip().casefold()


def word_pattern(w):
    if w.endswith('*') and len(w) > 1:
        return re.compile(r'(?<!\w)' + re.escape(w[:-1]))
    return re.compile(r'(?<!\w)' + re.escape(w) + r'(?!\w)')


def holds_all(words, text):
    t = norm(text)
    return all(word_pattern(w).search(t) for w in words)


def clip(text, n):
    """text cut to at most n characters at a word boundary, marked with … when cut."""
    if len(text) <= n:
        return text
    cut = text[:n + 1]
    return (cut[:cut.rfind(' ')] if ' ' in cut else text[:n]).rstrip() + ' …'


def first_sentence(text, n=HEAD_CLAIM):
    """The text up to its first full stop followed by a space, outside code spans, cut to n characters."""
    code = False
    for i, c in enumerate(text):
        if c == '`':
            code = not code
        elif not code and c == '.' and (i + 1 == len(text) or text[i + 1] == ' '):
            text = text[:i + 1]
            break
    return clip(text, n)


def escape_pipes(text):
    return re.sub(r'(?<!\\)\|', r'\\|', text)


def one_line(text):
    return re.sub(r'\s+', ' ', text).strip()


def path_tokens(text):
    """(path, lines) for every token of text that names a file (a known extension) or a directory (a trailing slash)."""
    out = []
    for tok in re.split(r'[\s`,;()\[\]{}<>"\'*]+', text):
        tok = tok.rstrip('.:')
        path, _, lines = tok.partition(':')
        if lines and not re.match(r'\d', lines):
            continue
        if not path or not re.fullmatch(r'[\w.+/-]+', path) or not re.search(r'[A-Za-z]', path):
            continue
        base = path.rstrip('/').rsplit('/', 1)[-1]
        if path.endswith('/') and len(path) > 1:
            out.append((path, lines))
        elif PATH_EXT.search(path) and not PATH_EXT.fullmatch(base):
            out.append((path, lines))
    return out


def backtick_paths(line):
    """The paths a row cites in backticks, without their line numbers, each once, in order."""
    seen = []
    for span in re.findall(r'`([^`]+)`', line):
        for path, lines in path_tokens(span):
            if path not in seen:
                seen.append(path)
    return seen


def cites(line, file, at=None):
    """The citations of FILE in a row: (path, lines) for each, where a citation's path and FILE are equal or one ends with '/' and the other; at, a line, keeps those whose lines hold it."""
    hits = []
    for path, lines in path_tokens(line.replace('\\|', ' ')):
        if not (path == file or path.endswith('/' + file) or file.endswith('/' + path)):
            continue
        if at is not None and not any(lo <= at <= hi for lo, hi in line_ranges(lines)):
            continue
        hits.append((path, lines))
    return hits


def line_ranges(lines):
    out = []
    for part in re.findall(r'\d+(?:-\d+)?', lines or ''):
        lo, _, hi = part.partition('-')
        out.append((int(lo), int(hi or lo)))
    return out


def head(row):
    claim = clip(row.claim, HEAD_CLAIM)
    return '\t'.join(c.replace('\t', ' ') for c in (
        str(row.num), row.status, row.klass, claim, ' '.join(backtick_paths(row.line))))


# ---------------------------------------------------------------- the template

class Linter:
    """Checks rows against the template; caches the test folders and the .tex headings it reads."""
    def __init__(self, root, numbers=()):
        self.root = root
        self.numbers = set(numbers)
        self._tests = None
        self._tex = {}

    def tests(self):
        """Every file under the test folders, by its name and by its name without extension."""
        if self._tests is None:
            self._tests = collections.defaultdict(list)
            pf = os.path.join(self.root, 'ProjectFortress')
            folders = sorted(d for d in (os.listdir(pf) if os.path.isdir(pf) else [])
                             if (d == 'tests' or d.endswith('_tests') or d in TEST_FOLDERS_EXTRA)
                             and os.path.isdir(os.path.join(pf, d)))
            for d in folders:
                for dirpath, dirs, files in os.walk(os.path.join(pf, d)):
                    for name in files:
                        rel = os.path.relpath(os.path.join(dirpath, name), self.root)
                        self._tests[name].append(rel)
                        stem = os.path.splitext(name)[0]
                        if stem != name:
                            self._tests[stem].append(rel)
        return self._tests

    def test_path(self, name):
        """The path from the root of the test NAME names (a path under a test folder, a file name, or a name without extension), else raise."""
        name = name.strip('`')
        if '/' in name:
            if os.path.isfile(os.path.join(self.root, name)) and name in {p for ps in self.tests().values() for p in ps}:
                return name
            raise LedgerError('%s is not a file under the test folders (ProjectFortress/tests, *_tests, %s)' % (name, ', '.join(TEST_FOLDERS_EXTRA)))
        hits = self.tests().get(name, [])
        if len(hits) > 1:
            dotted = [p for p in hits if p.endswith('.test')]
            hits = dotted if len(dotted) == 1 else hits
        if len(hits) == 1:
            return hits[0]
        raise LedgerError('no test under the test folders is named %s' % name if not hits else
                          'the test name %s is ambiguous: %s' % (name, ', '.join(hits)))

    def close_test(self, name):
        """The reproducer of a close: a test under the test folders, a file under the tools' folder (a tool's own test), or None for none."""
        name = name.strip('`')
        if name == 'none':
            return None
        if name.startswith(TOOLS_REL + '/'):
            if os.path.isfile(os.path.join(self.root, name)):
                return name
            raise LedgerError('%s is no file' % name)
        try:
            return self.test_path(name)
        except LedgerError as e:
            raise LedgerError('%s; a close also takes a file under %s/ (a tool\'s own test), or none with --note giving the reason' % (e, TOOLS_REL))

    def tex_headings(self, path):
        if path not in self._tex:
            heads = []
            with open(path, encoding='utf-8', errors='replace') as f:
                for ln in f:
                    m = TEX_HEAD.match(ln)
                    if m:
                        t = re.sub(r'\\[A-Za-z]+\*?', ' ', m.group(1))
                        heads.append(norm(t.replace('{', '').replace('}', '').replace('~', ' ')))
            self._tex[path] = heads
        return self._tex[path]

    def spec_file(self, path):
        for base in ('', 'Specification/'):
            full = os.path.join(self.root, base + path)
            if os.path.isfile(full):
                return full
        return None

    def lint_spec(self, cell):
        c = cell.strip()
        if c == 'silent':
            return []
        if not c:
            return [('spec', 'empty: write the .tex file and the section heading, or silent')]
        files = SPEC_FILE.findall(c.replace('`', ' '))
        if not files:
            return [('spec', 'cites no .tex file (write silent where the specification does not say): ' + clip(c, 70))]
        out, found = [], []
        for path, line in files:
            full = self.spec_file(path)
            if full:
                found.append(full)
            else:
                out.append(('spec-path', '%s is not a file from the repository root or Specification/' % path))
            if line and not path.startswith(FROZEN):
                out.append(('spec-line', 'a line number only against %s: %s%s' % (FROZEN, path, line.strip())))
        heads = [a or b for a, b in QUOTED.findall(c)]
        if not heads:
            out.append(('spec-section', 'no section heading in quotes after the file'))
        elif found:
            known = [h for f in found for h in self.tex_headings(f)]
            for h in heads:
                if not any(norm(h) in k for k in known):
                    out.append(('spec-section', '"%s" is no heading of %s' % (clip(h, 60), ', '.join(os.path.relpath(f, self.root) for f in found))))
        return out

    def lint_reproducer(self, cell):
        c = cell.strip()
        if c == 'none':
            return []
        if not c:
            return [('reproducer', 'empty: write the test, a probe path from the repository root, or none')]
        tok = c[1:-1] if c.startswith('`') and c.endswith('`') and c.count('`') == 2 else c
        if not tok or re.search(r'[\s`]', tok):
            return [('reproducer', 'not one path or test name: ' + clip(c, 70))]
        path = re.sub(r':\d[\d,-]*$', '', tok)
        if os.path.exists(os.path.join(self.root, path)) or ('/' not in path and path in self.tests()):
            return []
        return [('reproducer-path', '%s is no path from the repository root and no test name' % clip(path, 80))]

    def lint(self, row):
        """[(rule, detail)] for one row."""
        out = []
        if not row.line.rstrip().endswith('|'):
            out.append(('cells', 'the line does not end with |'))
        if row.split == 'lenient':
            out.append(('pipe', 'a bare | inside a cell splits it (%d cells at every pipe); write \\|' % len(split_cells(row.line))))
        elif len(row.cells) != len(HEADER):
            out.append(('cells', '%d cells; the template has %d' % (len(row.cells), len(HEADER))))
        if row.num is None or not (row.cells and row.cells[0].isdigit()):
            out.append(('number', 'the # cell is not a number: %s' % clip(row.cells[0] if row.cells else '', 20)))
        status = row.status
        if status not in STATUSES:
            out.append(('status', 'not one word of the seven: %s' % clip(status, 70)))
        k = row.klass
        if k == DASH:
            if status not in NO_CLASS:
                out.append(('class', '%s only for POSITIVE-VERIFIED and RETIRED' % DASH))
        elif not CLASS.match(k):
            out.append(('class', 'not `kind (area)`: %s' % clip(k, 70)))
        out += self.lint_spec(row.spec)
        out += self.lint_reproducer(row.reproducer)
        if not row.claim:
            out.append(('claim', 'empty'))
        if not row.found_by:
            out.append(('found-by', 'empty'))
        for name, limit in LIMITS:
            n = len(row.line) if name == 'row' else len(row.get(name))
            if n > limit:
                out.append(('%s-length' % name.replace('_', '-'), '%d characters; at most %d' % (n, limit)))
        if status == 'FIXED' and not (re.search(r'\bfixed\b', row.notes, re.I) and HASH.search(row.notes)):
            out.append(('closed', 'a FIXED row\'s notes say `fixed HASH`'))
        if status == 'DUPLICATE':
            m = re.search(r'\bduplicate of row (\d+)', row.notes, re.I)
            if not m:
                out.append(('closed', 'a DUPLICATE row\'s notes say `duplicate of row M`'))
            elif int(m.group(1)) == row.num or (self.numbers and int(m.group(1)) not in self.numbers):
                out.append(('closed', 'duplicate of row %s, which is not another row' % m.group(1)))
        return out

    def lint_ledger(self, ledger):
        """[(row or None, rule, detail)] for the rows, the row tables' headers, the numbers and the order."""
        out = []
        for t in ledger.tables:
            if t.holds_rows and tuple(t.titles) != HEADER:
                where = 'the table at line %d%s' % (t.index + 1, ' (## %s)' % t.section.title if t.section else '')
                out.append((None, 'header', '%s has %d columns (%s); the template has %d' % (
                    where, len(t.titles), ', '.join(t.titles), len(HEADER))))
            prev = None
            for r in t.rows:
                if prev is not None and r.num <= prev.num:
                    out.append((r, 'order', 'row %d after row %d in its table' % (r.num, prev.num)))
                prev = r
        by = collections.defaultdict(list)
        for r in ledger.rows:
            by[r.num].append(r)
        for n, rs in sorted(by.items()):
            if len(rs) > 1:
                out.append((rs[1], 'number', 'row %d is on %d lines: %s' % (n, len(rs), ', '.join(str(r.lineno) for r in rs))))
        if by:
            missing = [n for n in range(1, max(by) + 1) if n not in by and n not in VACANT]
            if missing:
                out.append((None, 'number', 'numbers missing from 1-%d: %s' % (max(by), ', '.join(map(str, missing)))))
        for r in ledger.rows:
            out += [(r, rule, d) for rule, d in self.lint(r)]
        return out


def template_error(line, fails):
    return LedgerError('the row does not meet the template:\n' + '\n'.join('  %s: %s' % f for f in fails) + '\n  the row: ' + clip(line, 300))


def template_row(line, numbers, root):
    """Lint one line written by a command; raise with the rules it breaks."""
    row = Row(int(ROW.match(line).group(1)) if ROW.match(line) else None, 0, None, TEMPLATE, line)
    fails = Linter(root, numbers).lint(row)
    if fails:
        raise template_error(line, fails)
    return row


def changed_cells_row(old, line, cells, numbers, root):
    """Lint a line that changes only CELLS of the row old, read in old's table; raise with the rules it breaks
    in those cells, the row's length, and any other rule of the line that old did not break."""
    new = Row(old.num, old.lineno, old.section, old.table, line)
    lint = Linter(root, numbers)
    before = {rule for rule, d in lint.lint(old)}
    fails = [(rule, d) for rule, d in lint.lint(new)
             if RULE_CELL.get(rule) in cells or rule == 'row-length' or (RULE_CELL.get(rule) in (None, 'num') and rule not in before)]
    if fails:
        raise template_error(line, fails)
    return new


# ---------------------------------------------------------------- writing

class Lock:
    def __init__(self, path):
        self.path = path

    def __enter__(self):
        self.f = open(self.path, 'a')
        fcntl.flock(self.f, fcntl.LOCK_EX)
        return self

    def __exit__(self, *exc):
        fcntl.flock(self.f, fcntl.LOCK_UN)
        self.f.close()


HISTORY_HEAD = """# Fortress gap ledger: history

The full earlier line of every changed row of `explorations/fortress-gap-ledger.md`,
unchanged, under `### Row N` and a line that says what became of it. Rows are
cited by number; the latest line of a row is in the ledger.
`explorations/coordinator/tools/ledger.py` writes this file; nothing else edits it.
"""


def write_text(path, text):
    """Replace a file's text in one step, keeping its mode."""
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(os.path.abspath(path)), prefix='.ledger-', suffix='.tmp')
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as f:
            f.write(text)
        if os.path.exists(path):
            os.chmod(tmp, os.stat(path).st_mode & 0o7777)
        os.replace(tmp, path)
    except BaseException:
        if os.path.exists(tmp):
            os.unlink(tmp)
        raise


def append_history(path, entries):
    """entries: [(row number, what became of it, the earlier line)]."""
    new = not os.path.exists(path) or os.path.getsize(path) == 0
    with open(path, 'a', encoding='utf-8') as f:
        if new:
            f.write(HISTORY_HEAD)
        for num, what, line in entries:
            f.write('\n### Row %d\n\n%s\n\n%s\n' % (num, what, line))


class Paths:
    def __init__(self, a):
        self.root = os.path.abspath(a.root)
        self.ledger = os.path.abspath(a.ledger or os.path.join(self.root, LEDGER_REL))
        here = os.path.dirname(self.ledger)
        self.history = os.path.abspath(a.history or os.path.join(here, HISTORY_NAME))
        self.lock = os.path.join(here, LOCK_NAME)


def git(root, *args):
    return subprocess.run(['git', '-C', root] + list(args), capture_output=True, text=True)


def replace_rows(p, led, changes):
    """changes: [(row, new line, what became of it)]: history first, then the ledger."""
    append_history(p.history, [(r.num, what, r.line) for r, new, what in changes])
    for r, new, what in changes:
        led.lines[r.lineno - 1] = new
    write_text(p.ledger, led.text())


# ---------------------------------------------------------------- commands

def cmd_heads(a, p):
    for r in Ledger(p.ledger).rows:
        print(head(r))


def cmd_sections(a, p):
    for s in Ledger(p.ledger).row_sections:
        print('%d\t%s' % (len(s.rows), s.title))


def cmd_section(a, p):
    for r in Ledger(p.ledger).section(a.title).rows:
        print(head(r))


def cmd_show(a, p):
    led = Ledger(p.ledger)
    r = led.one(a.n)
    if a.short:
        print('%d | %s | %s | ## %s' % (r.num, r.status, r.klass, r.section))
        print('claim: ' + r.claim)
        print('notes: ' + clip(r.notes, SHORT_NOTES))
    else:
        print('== %s, ## %s' % (os.path.relpath(p.ledger, p.root) if p.ledger.startswith(p.root + os.sep) else p.ledger, r.section))
        print('%s:%d' % (os.path.basename(p.ledger), r.lineno))
        print('\n'.join(r.header + [r.line]))


def cmd_find(a, p):
    words = norm(' '.join(a.words)).split()
    at, file = None, None
    if a.cites:
        file, _, line = a.cites.partition(':')
        at = int(line) if line.isdigit() else None
    if not words and not file:
        raise LedgerError('find needs words, --cites FILE, or both')
    hits = []
    for r in Ledger(p.ledger).rows:
        if words and not holds_all(words, r.line):
            continue
        if a.open and r.status_word in CLOSED:
            continue
        c = cites(r.line, file, at) if file else None
        if file and not c:
            continue
        hits.append((r, c))
    shown = hits if a.all else hits[:FIND_ROWS]
    for r, c in shown:
        out = '%d | %s | %s | %s' % (r.num, r.status, r.klass, clip(r.claim, HEAD_CLAIM))
        if c:
            out += ' | cites ' + ', '.join(path + (':' + lines if lines else '') for path, lines in c)
        print(out)
    if len(hits) > len(shown):
        print('... and %d more rows; add a word to narrow them, or --all' % (len(hits) - len(shown)))
    if not hits:
        print('no row holds every word' + (' and cites %s' % a.cites if file else ''))
        return 1
    return 0


def cmd_count(a, p):
    rows = Ledger(p.ledger).rows
    status, kind, area = collections.Counter(), collections.Counter(), collections.Counter()
    for r in rows:
        status[r.status if r.status in STATUSES else '(not one word of the seven)'] += 1
        m = CLASS.match(r.klass)
        if m:
            kind[m.group(1)] += 1
            area[m.group(2)] += 1
        elif r.klass == DASH:
            kind[DASH] += 1
        else:
            kind['(not kind (area))'] += 1
    for title, counter, order in (('status', status, STATUSES), ('kind', kind, KINDS + (DASH,)), ('area', area, AREAS)):
        print(title)
        for k in list(order) + sorted(k for k in counter if k not in order):
            if counter[k]:
                print('  %-30s %d' % (k, counter[k]))
    print('rows %d' % len(rows))


def read_row_file(path, number='?'):
    """The eight cells of the one row line a file holds; its # cell may be left out."""
    with open(path, encoding='utf-8') as f:
        lines = [ln.strip() for ln in f.read().split('\n') if ln.strip()]
    if len(lines) != 1 or not lines[0].startswith('|'):
        raise LedgerError('%s must hold one row line, | %s | claim | status | class | spec citation | reproducer | found by | notes |' % (path, number))
    cells = split_cells(lines[0])
    if len(cells) == len(HEADER) - 1:
        cells = ['?'] + cells
    if len(cells) != len(HEADER):
        raise LedgerError('the row has %d cells at its unescaped pipes; the template has %d (write a pipe inside a cell as \\|)' % (len(cells), len(HEADER)))
    return cells


def cmd_add(a, p):
    cells = read_row_file(a.file)
    if cells[0] not in PLACEHOLDERS:
        raise LedgerError('add numbers the row itself: write ? in its # cell, not %s' % cells[0])
    with Lock(p.lock):
        led = Ledger(p.ledger)
        sec = led.section(a.section, exact=True)
        table = sec.row_tables[-1]
        num = max([r.num for r in led.rows] + [0]) + 1
        cells[0] = str(num)
        line = join_cells(cells)
        template_row(line, {r.num for r in led.rows} | {num}, p.root)
        later = [r for r in table.rows if r.num > num]
        index = later[0].lineno - 1 if later else (table.rows[-1].lineno if table.rows else table.index + 2)
        led.lines.insert(index, line)
        write_text(p.ledger, led.text())
    print('row %d, in "%s"' % (num, sec.title))
    files = backtick_paths(line)
    kin = sorted({r.num for r in led.rows if r.num != num for f in files if cites(r.line, f)})
    if kin:
        print('rows that cite the same files: %s' % ', '.join(map(str, kin[:20])) + (' and %d more' % (len(kin) - 20) if len(kin) > 20 else ''))


def insert_note(notes, text, num):
    """notes with text added: before the row's own history marker where it has one, else at the end; notes of none replaced."""
    if notes.strip() in ('', 'none'):
        return text
    marks = list(re.finditer(re.escape(MARKER % num) + r'(?!\d)', notes))
    if not marks:
        return notes + ' ' + text
    at = marks[-1].start()
    before = notes[:at].rstrip()
    return (before + ' ' if before else '') + text + (' ' if re.search(r'[.;!?]$', text) else '; ') + notes[at:]


def cmd_note(a, p):
    text = escape_pipes(one_line(a.text))
    if not text:
        raise LedgerError('note needs a TEXT')
    with Lock(p.lock):
        led = Ledger(p.ledger)
        r = led.one(a.n)
        if r.status_word in ('FIXED', 'DUPLICATE'):
            raise LedgerError('row %d is %s: a closed row is not edited; its full text is in the history file' % (r.num, r.status_word))
        if r.split == 'bad' or 'notes' not in r.table.names:
            raise LedgerError('row %d does not split into its table\'s %d cells, so its notes cell is not known: rewrite it (ledger.py rewrite N FILE)' % (
                r.num, len(r.table.names)))
        cells = list(r.cells)
        i = r.table.names.index('notes')
        cells[i] = insert_note(cells[i], text, r.num)
        line = join_cells(cells)
        changed_cells_row(r, line, {'notes'}, {x.num for x in led.rows}, p.root)
        replace_rows(p, led, [(r, line, 'note added')])
    print('row %d: note added (%d characters)' % (r.num, len(line)))


def commit_in_head(root, h):
    if git(root, 'rev-parse', '--verify', '--quiet', h + '^{commit}').returncode != 0:
        raise LedgerError('%s is not a commit' % h)
    if git(root, 'merge-base', '--is-ancestor', h, 'HEAD').returncode != 0:
        raise LedgerError('%s is not in the history of HEAD: close a row after its fix has landed' % h)
    return git(root, 'rev-parse', '--short=9', h).stdout.strip()


def cmd_rewrite(a, p):
    cells = read_row_file(a.file, str(a.n))
    if cells[0] not in PLACEHOLDERS and cells[0] != str(a.n):
        raise LedgerError('the line is numbered as row %s; rewrite %d writes row %d (write %d or ? in its # cell)' % (cells[0], a.n, a.n, a.n))
    with Lock(p.lock):
        led = Ledger(p.ledger)
        r = led.one(a.n)
        if tuple(r.table.titles) != HEADER:
            raise LedgerError('row %d is in a table of %d columns (%s); the template\'s line goes in a table of its eight' % (
                r.num, len(r.table.titles), ', '.join(r.table.titles)))
        cells[0] = str(r.num)
        line = join_cells(cells)
        if line == r.line:
            raise LedgerError('row %d is already that line' % r.num)
        numbers = {x.num for x in led.rows}
        new = template_row(line, numbers, p.root)
        was, now = r.status_word, new.status
        if was in ('FIXED', 'DUPLICATE') and now != was:
            raise LedgerError('row %d is %s, and a closed row stays %s: a new issue gets a new row (ledger.py add)' % (r.num, was, was))
        if now == 'FIXED' and was != 'FIXED':
            raise LedgerError('the line makes row %d FIXED: close it with ledger.py close N --commit HASH --test NAME, which checks the fix' % r.num)
        if now == 'DUPLICATE' and was != 'DUPLICATE':
            raise LedgerError('the line makes row %d a DUPLICATE: use ledger.py duplicate N --of M' % r.num)
        if now == 'FIXED':
            m = re.search(r'\bfixed\b\W*([0-9a-f]{7,40})\b', new.notes, re.I)
            if not m:
                raise LedgerError('a FIXED row\'s notes open with `fixed HASH`, the commit that fixed it')
            commit_in_head(p.root, m.group(1))
        if now == 'DUPLICATE':
            other = led.one(int(re.search(r'\bduplicate of row (\d+)', new.notes, re.I).group(1)))
            if other.status_word == 'DUPLICATE':
                raise LedgerError('row %d is itself a duplicate: point at the row it names' % other.num)
        replace_rows(p, led, [(r, line, 'rewritten')])
    print('row %d: rewritten (%d characters); its earlier line is in %s' % (r.num, len(line), os.path.basename(p.history)))


def cmd_close(a, p):
    root = p.root
    short = commit_in_head(root, a.commit)
    note = escape_pipes(one_line(a.note)) if a.note else ''
    settled = escape_pipes(one_line(a.settled)) if a.settled else ''
    with Lock(p.lock):
        led = Ledger(p.ledger)
        r = led.one(a.n)
        lint = Linter(root, {x.num for x in led.rows})
        test = lint.close_test(a.test)
        if r.status_word in ('FIXED', 'DUPLICATE'):
            raise LedgerError('row %d is already closed (%s)' % (r.num, r.status_word))
        if r.status_word == 'RETIRED':
            raise LedgerError('row %d is RETIRED, which is not a defect to close' % r.num)
        if r.status_word == 'CONTESTED' and not settled:
            raise LedgerError('row %d is CONTESTED: close it once its question is settled, and name what settled it with --settled TEXT '
                              '(the curator\'s answer, or the POSITIONS entry)' % r.num)
        if settled and r.status_word != 'CONTESTED':
            raise LedgerError('--settled is for a CONTESTED row; row %d is %s' % (r.num, r.status_word))
        if test is None and not note:
            raise LedgerError('--test none needs --note with the reason no test checks the fix')
        notes = ('fixed `%s`' % short + ('; settled by ' + settled if settled else '') + ('; ' + note if note else '')
                 + '; ' + MARKER % r.num)
        cells = [str(r.num), pick(a.claim, first_sentence(r.claim)), 'FIXED', pick(a.klass, r.klass),
                 pick(a.spec, r.spec), '`%s`' % test if test else 'none', pick(a.found_by, r.found_by), notes]
        line = join_cells(cells)
        template_row(line, {x.num for x in led.rows}, root)
        replace_rows(p, led, [(r, line, 'closed by %s' % short)])
    print('row %d: FIXED by %s, test %s; its earlier line is in %s' % (r.num, short, test or 'none', os.path.basename(p.history)))


def cmd_duplicate(a, p):
    if a.n == a.of:
        raise LedgerError('a row is not a duplicate of itself')
    with Lock(p.lock):
        led = Ledger(p.ledger)
        r, other = led.one(a.n), led.one(a.of)
        if r.status_word == 'DUPLICATE':
            raise LedgerError('row %d is already a duplicate' % r.num)
        if other.status_word == 'DUPLICATE':
            raise LedgerError('row %d is itself a duplicate: point at the row it names' % other.num)
        numbers = {x.num for x in led.rows}
        cells = [str(r.num), pick(a.claim, first_sentence(r.claim)), 'DUPLICATE', pick(a.klass, r.klass),
                 pick(a.spec, r.spec), pick(a.reproducer, r.reproducer), pick(a.found_by, r.found_by),
                 'duplicate of row %d; full text: history, row %d' % (other.num, r.num)]
        line = join_cells(cells)
        template_row(line, numbers, p.root)
        changes = [(r, line, 'duplicate of row %d' % other.num)]
        if a.add:
            oc = other.template_cells()
            oc[7] = (oc[7] + ' ' + escape_pipes(one_line(a.add))).strip()
            oline = join_cells(oc)
            template_row(oline, numbers, p.root)
            changes.append((other, oline, 'note added from row %d, now its duplicate' % r.num))
        replace_rows(p, led, changes)
    print('row %d: DUPLICATE of row %d%s; earlier lines in %s' % (
        r.num, other.num, ', and row %d\'s notes extended' % other.num if a.add else '', os.path.basename(p.history)))


def pick(given, old):
    return escape_pipes(one_line(given)) if given is not None else old


def cmd_check(a, p):
    if a.rows:
        rows, other = rows_file(a.rows)
        numbers = {r.num for r in rows if r.num is not None}
        if os.path.exists(p.ledger):
            numbers |= {r.num for r in Ledger(p.ledger).rows}
        lint = Linter(p.root, numbers)
        fails = [(None, 'not-a-row', 'line %d: %s' % (i, clip(ln, 60))) for i, ln in other]
        seen = collections.Counter(r.num for r in rows if r.num is not None)
        fails += [(None, 'number', 'row %d is on %d lines of %s' % (n, k, a.rows)) for n, k in sorted(seen.items()) if k > 1]
        for r in rows:
            fails += [(r, rule, d) for rule, d in lint.lint(r)]
        name, total = a.rows, len(rows)
    else:
        led = Ledger(p.ledger)
        fails = Linter(p.root, {r.num for r in led.rows}).lint_ledger(led)
        name, total = os.path.basename(p.ledger), len(led.rows)
        if a.base:
            fails += check_base(a.base, led, p)
    rows_failing = set()
    by_rule = collections.Counter()
    seen = set()
    for r, rule, d in fails:
        key = (id(r) if r is not None else d, rule)
        if key not in seen:
            seen.add(key)
            by_rule[rule] += 1
        if r is not None:
            rows_failing.add(id(r))
        if not a.summary:
            print(failure_line(r, rule, d, name))
    print('ledger.py check: %s, %d rows, %d fail the template%s' % (
        name, total, len(rows_failing), '' if not by_rule else '; rows (or places) failing each rule: ' +
        ', '.join('%s %d' % kv for kv in sorted(by_rule.items(), key=lambda kv: (-kv[1], kv[0])))))
    return 1 if fails else 0


def failure_line(r, rule, d, name):
    where = ('row %s (line %d)' % (r.num if r.num is not None else '?', r.lineno)) if r is not None else name
    return '%s: %s: %s' % (where, rule, d)


def check_base(base, led, p, new_rows=False):
    """[(None, rule, detail)]: each row at BASE whose line is neither its line now nor in the history file, and a
    change in the set of row numbers (with new_rows, only a number gone, since a landing adds rows)."""
    shown = git(p.root, 'show', '%s:%s' % (base, LEDGER_REL))
    if shown.returncode != 0:
        raise LedgerError('git show %s:%s failed: %s' % (base, LEDGER_REL, shown.stderr.strip()))
    old = Ledger(LEDGER_REL + '@' + base, shown.stdout)
    history = set()
    if os.path.exists(p.history):
        with open(p.history, encoding='utf-8') as f:
            history = {ln for ln in f.read().split('\n') if ln.startswith('|')}
    now = collections.defaultdict(set)
    for r in led.rows:
        now[r.num].add(r.line)
    out = []
    for r in old.rows:
        if r.line in now.get(r.num, ()) or r.line in history:
            continue
        out.append((None, 'base-line', 'row %d at %s (its line %d) is not its line now, and its full line is not in %s' % (
            r.num, base, r.lineno, os.path.basename(p.history))))
    was, isn = {r.num for r in old.rows}, set(now)
    if was - isn if new_rows else was != isn:
        out.append((None, 'base-numbers', 'the row numbers differ from %s: gone %s; new %s' % (
            base, ', '.join(map(str, sorted(was - isn))) or 'none', ', '.join(map(str, sorted(isn - was))) or 'none')))
    return out

# ---------------------------------------------------------------- landing-check

# How a commit message or a FACTS or POSITIONS entry names rows: "row 642", "rows 642, 644 and 651",
# "gap-ledger row 8"; not "row 314's", a part of the row.
NUMS = r'\d{1,4}(?:(?:,? (?:and|or) |, )\d{1,4})*'
ROWS = r"\b(?:gap-ledger |ledger )?[Rr]ows? (" + NUMS + r")\b(?![’']s)"
FIX_DONE = r'(?:fixed|repaired|closed|resolved)'
# The row's status in words next to its number, as a statement and not a plan or a part.
SAID_FIXED = (re.compile(ROWS + r',? (?:(?:is|are|was|were|now|both|all|each|also) )*' + FIX_DONE + r'\b'),
              re.compile(r'\b' + FIX_DONE + r'(?: by `?[0-9a-f]{7,40}`?)?,? \(' + ROWS + r'[),;]'))
SAID_FIXES = re.compile(r'\b(?:fix(?:es|ed)?|repair(?:s|ed)?|clos(?:es|ed)|resolv(?:es|ed))(?: the)? ' + ROWS)   # in a commit only
SAID_OPEN = (re.compile(ROWS + r',? (?:(?:is|are|stays?|remains?|still|left|now|both|all) )*(?:open|unfixed|not (?:yet )?fixed|owed)\b'),
             re.compile(r'\b(?:open|unfixed) ' + ROWS))
NOT_SO = re.compile(r'\b(?:not|never|until|once|when|before|after|if|unless|whether|will|would|half|partly|in part|to be)\b', re.I)
# A subject that names a row without fixing it (scripts/signals.py of the ledger health check, 2026-10-22).
NOT_A_FIX = re.compile(r'\b(opened|added|refused|noted|named|notes? on|recorded|records|waits?|full\b|contested|re-?anchored)', re.I)


def numbers_in(body):
    return [int(x) for x in re.findall(r'\d{1,4}', body)]


def said(text, patterns):
    """[(row, the words around it)] for each row that one of the patterns says the status of, not in a plan or a part."""
    out = []
    for pat in patterns:
        for m in pat.finditer(text):
            clause = re.split(r'[.;:!?]\s', text[max(0, m.start() - 40):m.start()])[-1]
            if NOT_SO.search(clause):
                continue
            words = text[max(0, m.start() - 60):m.end() + 20].strip()
            out += [(n, words) for n in numbers_in(m.group(1))]
    return out


def under_tests(path):
    parts = path.split('/')
    return len(parts) > 2 and parts[0] == 'ProjectFortress' and (
        parts[1] == 'tests' or parts[1].endswith('_tests') or parts[1] in TEST_FOLDERS_EXTRA)


def xxx_gone(p, led, base, head):
    """Each XXX test that BASE..HEAD deletes or renames to another name, with the open rows that still name it."""
    out = []
    stems = {os.path.basename(t).split('.')[0] for t in git(p.root, 'ls-tree', '-r', '--name-only', head).stdout.split('\n') if t}
    diff = git(p.root, 'diff', '--name-status', '-M', base, head).stdout
    for ln in diff.split('\n'):
        parts = ln.split('\t')
        if len(parts) == 2 and parts[0] == 'D':
            old, new = parts[1], None
        elif len(parts) == 3 and parts[0].startswith('R'):
            old, new = parts[1], parts[2]
        else:
            continue
        name = os.path.basename(old)
        stem = name.split('.')[0]
        if 'XXX' not in name or not under_tests(old) or (new and os.path.basename(new).split('.')[0] == stem):
            continue
        # the stem names the test unless a file of that stem is still in the tree; then only the file's own name does
        named = re.compile(r'(?<!\w)%s(?!\w)' % re.escape(name if stem in stems else stem))
        rows = [r for r in led.rows if r.status_word not in CLOSED and named.search(r.line)]
        if rows:
            out.append(('xxx-gone', '%s, %s: %s' % (old, 'renamed %s' % new if new else 'deleted',
                                                   ', '.join('row %d (%s)' % (r.num, r.status_word) for r in rows))))
    return out


def commits_say_fixed(p, led, old, base, head, label):
    """Each open row, unchanged since BASE, that a code or tool commit of BASE..HEAD says it fixed, or names in its subject as (row N)."""
    by = {r.num: r for r in led.rows}
    was = {r.num: r.line for r in old.rows}
    out = []
    log = git(p.root, 'log', '--format=%x01%H%x02%B%x03', '--name-only', '%s..%s' % (base, head)).stdout
    for chunk in log.split('\x01')[1:]:
        h, _, rest = chunk.partition('\x02')
        body, _, names = rest.partition('\x03')
        files = [f for f in names.split('\n') if f.strip()]
        if not [f for f in files if not f.startswith(('explorations/', '.claude/', 'research/')) or f.startswith(TOOLS_REL + '/')]:
            continue    # a commit of the record alone
        subject = body.strip().split('\n', 1)[0]
        flat = one_line(body)
        hits = []
        if not NOT_A_FIX.search(subject):
            hits += [('subject-names-row', n, subject) for m in re.finditer(r'\(' + ROWS + r'\)', subject) for n in numbers_in(m.group(1))]
        hits += [('commit-says-fixed', n, w) for n, w in said(flat, SAID_FIXED + (SAID_FIXES,))]
        seen = set()
        for kind, n, words in hits:
            r = by.get(n)
            if n in seen or r is None or r.status_word in CLOSED or was.get(n) != r.line:
                continue    # closed, or changed in the landing: closed or noted, as the landing check asks
            seen.add(n)
            out.append((kind, '%s "%s": row %d (%s) is open and unchanged since %s' % (h[:9], clip(words, 160), n, r.status_word, label)))
    return out


def entry_name(line):
    m = re.match(r'-\s+([FP]-\d+)\b', line)
    if m:
        return m.group(1)
    t = re.search(r'\*\*(.+?)\*\*', line)
    return '"%s"' % clip(t.group(1) if t else line[2:], 60)


def records_disagree(p, led, base, files):
    """Each row whose status a FACTS or POSITIONS entry changed since BASE states otherwise."""
    by = {r.num: r for r in led.rows}
    out = []
    for rel, path in files:
        if not os.path.isfile(path):
            raise LedgerError('%s is no file' % path)
        with open(path, encoding='utf-8') as f:
            text = f.read()
        shown = git(p.root, 'show', '%s:%s' % (base, rel))
        before = set(shown.stdout.split('\n')) if shown.returncode == 0 else set()
        for ln in text.split('\n'):
            if not ln.startswith('- ') or ln in before:
                continue
            what = []
            what += [(n, 'called fixed', w) for n, w in said(ln, SAID_FIXED) if by.get(n) and by[n].status_word not in CLOSED]
            what += [(n, 'called open', w) for n, w in said(ln, SAID_OPEN) if by.get(n) and by[n].status_word in CLOSED]
            owed = re.search(r'Still to build:?(.*)$', ln)
            if owed:
                what += [(n, 'named under "Still to build:"', owed.group(1)[max(0, m.start() - 60):m.end() + 20].strip())
                         for m in re.finditer(ROWS, owed.group(1)) for n in numbers_in(m.group(1))
                         if by.get(n) and by[n].status_word in CLOSED]
            seen = set()
            for n, how, words in what:
                if (n, how) not in seen:
                    seen.add((n, how))
                    out.append(('record', '%s, %s: row %d (%s) %s: "%s"' % (
                        os.path.basename(rel), entry_name(ln), n, by[n].status_word, how, clip(words, 160))))
    return out


def cmd_landing_check(a, p):
    head = a.head or 'HEAD'
    for rev in (a.base, head):
        if git(p.root, 'rev-parse', '--verify', '--quiet', rev + '^{commit}').returncode != 0:
            raise LedgerError('%s is not a commit' % rev)
    if git(p.root, 'merge-base', '--is-ancestor', a.base, head).returncode != 0:
        raise LedgerError('%s is not an ancestor of %s' % (a.base, head))
    label = git(p.root, 'rev-parse', '--short=9', a.base).stdout.strip()
    led = Ledger(p.ledger)
    name = os.path.basename(p.ledger)
    fails = Linter(p.root, {r.num for r in led.rows}).lint_ledger(led) + check_base(a.base, led, p, new_rows=True)
    findings = [('template', failure_line(r, rule, d, name)) for r, rule, d in fails]
    findings += xxx_gone(p, led, a.base, head)
    old = Ledger(LEDGER_REL + '@' + a.base, git(p.root, 'show', '%s:%s' % (a.base, LEDGER_REL)).stdout)
    findings += commits_say_fixed(p, led, old, a.base, head, label)
    files = [(FACTS_REL, a.facts or os.path.join(p.root, FACTS_REL)), (POSITIONS_REL, a.positions or os.path.join(p.root, POSITIONS_REL))]
    findings += records_disagree(p, led, a.base, files)
    for kind, text in findings:
        print('%s: %s' % (kind, text))
    kinds = collections.Counter(k for k, t in findings)
    print('ledger.py landing-check: %s..%s: %s' % (label, head, 'no finding' if not findings else '%d finding%s (%s)' % (
        len(findings), '' if len(findings) == 1 else 's', ', '.join('%s %d' % kv for kv in sorted(kinds.items())))))
    return 1 if findings else 0


def main(argv):
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument('--root', default=TREE, help='the checkout: its paths, tests and git (default: this tool\'s)')
    common.add_argument('--ledger', help='the ledger file (default: ROOT/%s)' % LEDGER_REL)
    common.add_argument('--history', help='the history file (default: %s beside the ledger)' % HISTORY_NAME)
    ap = argparse.ArgumentParser(prog='ledger.py', description=__doc__.split('\n\n')[0],
                                 formatter_class=argparse.RawDescriptionHelpFormatter, epilog=__doc__[__doc__.index('usage:'):])
    sub = ap.add_subparsers(dest='cmd', metavar='COMMAND')
    sub.required = True
    def sp(name, func):
        parser = sub.add_parser(name, parents=[common])
        parser.set_defaults(func=func)
        return parser
    sp('heads', cmd_heads)
    sp('sections', cmd_sections)
    s = sp('section', cmd_section)
    s.add_argument('title')
    s = sp('show', cmd_show)
    s.add_argument('n', type=int)
    s.add_argument('--short', action='store_true')
    s = sp('find', cmd_find)
    s.add_argument('words', nargs='*')
    s.add_argument('--open', action='store_true')
    s.add_argument('--cites', metavar='FILE[:LINE]')
    s.add_argument('--all', action='store_true')
    sp('count', cmd_count)
    s = sp('add', cmd_add)
    s.add_argument('file')
    s.add_argument('--section', required=True)
    s = sp('note', cmd_note)
    s.add_argument('n', type=int)
    s.add_argument('text')
    s = sp('rewrite', cmd_rewrite)
    s.add_argument('n', type=int)
    s.add_argument('file')
    s = sp('close', cmd_close)
    s.add_argument('n', type=int)
    s.add_argument('--commit', required=True)
    s.add_argument('--test', required=True)
    s.add_argument('--settled')
    s.add_argument('--note')
    for opt in ('--claim', '--class', '--spec', '--found-by'):
        s.add_argument(opt, dest=opt[2:].replace('-', '_').replace('class', 'klass'))
    s = sp('duplicate', cmd_duplicate)
    s.add_argument('n', type=int)
    s.add_argument('--of', type=int, required=True)
    s.add_argument('--add')
    for opt in ('--claim', '--class', '--spec', '--reproducer', '--found-by'):
        s.add_argument(opt, dest=opt[2:].replace('-', '_').replace('class', 'klass'))
    s = sp('check', cmd_check)
    s.add_argument('--rows', metavar='FILE')
    s.add_argument('--base', metavar='COMMIT')
    s.add_argument('--summary', action='store_true')
    s = sp('landing-check', cmd_landing_check)
    s.add_argument('base')
    s.add_argument('--head', metavar='REV')
    s.add_argument('--facts', metavar='FILE')
    s.add_argument('--positions', metavar='FILE')
    a = ap.parse_args(argv)
    try:
        return a.func(a, Paths(a)) or 0
    except LedgerError as e:
        sys.stderr.write('ledger.py %s: %s\n' % (a.cmd, e))
        return 1
    except BrokenPipeError:
        return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
