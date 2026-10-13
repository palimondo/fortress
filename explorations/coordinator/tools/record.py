#!/usr/bin/env python3
"""The record's tool: it owns the form of FACTS.md and POSITIONS.md and of
their two history files, and is the only way to write them.

An entry is one line under a permanent number, `- F-87 **Title.** Text.` in
explorations/coordinator/FACTS.md and `- P-48 **Title.** Text.` in
POSITIONS.md. A number is never reused or changed: a new entry takes the
highest number its file has ever used, plus one. An entry stands under the
nearest `## ` or `### ` heading above it, its section. Its title is its bold
opening, or where it has none, its opening words up to the first colon,
semicolon or full stop.

A pointer is another entry's number in the sentence that needs it, alone
(`It builds P-48.`) or with the first words of the target's title in quotes
(`It builds P-48, "A type parameter the arguments do not fix ..."`, or
`P-48 ("...")`). Quoted words must open the target's current title (`...` or
`…` marks words left out); when an entry is retitled, the tool rewrites them
in every entry that points to it, in the same call.

The history (FACTS-history.md, POSITIONS-history.md beside the record) holds,
under `### F-87`, one block per change, oldest first: one provenance line (the
UTC time from the clock, the kind of change, `from` each report section,
`commit`, `by`, then the note after a colon), and the line as it stood before
the change. The tool derives the kind: `added`, `rewritten`, `moved to "S"`,
`merged into F-n`, `F-n merged in`, `removed`; the numbering wrote one
`numbered` block per entry. A retitle that refreshed other entries' pointer
words, or a merge that moved their pointers, says so in one more line of the
block (`pointer words refreshed in: F-12, P-48`).

Every write takes a lock (flock on .record.lock beside the record), checks the
state it would leave, appends the history blocks first and then replaces each
record file in one step. A write is refused only for what would break the
store: a bad number, a pointer that does not resolve or whose words do not
open its target's title, a line break in an entry, no provenance (neither
`--from` nor `--note`). Never for size. The tool does not commit: commit the
record file and its history together.

usage: record.py COMMAND [ARGS] [PROVENANCE] [--root DIR]

  PROVENANCE: --from PATH#HEADING (repeatable; PATH from the repository root
  or from explorations/, HEADING held by exactly one heading of it, as doc:
  resolves one), --commit HASH (in HEAD's history), --by WHO, --note WHY.
  Each write needs --from or --note.

  add F|P --section TITLE FILE   a new entry from FILE's one line, numbered
      record.py add F --section 'Landed semantics' new.md --from 'compile-ladder/rung-x/REPORT.md#The fix' --by coordinator
  set N [FILE] [--section TITLE] entry N rewritten from FILE's line, or moved
      record.py set F-87 f87.md --from 'compile-ladder/rung-x/REPORT.md#The question' --note 'cut to the form'
  merge N --into M [FILE]        N removed, M rewritten from FILE (or kept),
                                 every pointer to N made a pointer to M
      record.py merge F-90 --into F-87 f87.md --note 'one fact, two entries'
  remove N                       N removed; refused while a pointer to it remains
      record.py remove P-131 --note 'evicted to the coordinator skill, references/briefing.md'
  apply FILE                     many changes from one file, all or none (below)
      record.py apply chunk3.md --by 'consolidation chunk 3'
  check [--base COMMIT]          the store's checks; exit 1 on a failure
      record.py check --base cc9424c2a

An apply file holds, in any order: `## TITLE` or `### TITLE`, the section the
new entries below it go to (an existing entry stands under no heading, or
under its own section's, or the `## ` one that holds it); entry lines as they
should stand, `- F-87 ...`, or `- F-?1 ...` for a new entry, its placeholder
replaced by its number everywhere in the file; `move F-87 to SECTION`;
`remove F-90`; `merge F-91 into F-87`. Each may be followed by one indented
provenance line of its own:
`  from: PATH, "HEADING"; commit: HASH; by: WHO; note: WHY`. Blank lines and
`<!-- -->` comments are ignored. An entry line equal to the entry is skipped.

check fails on: an entry line without its number, or a line under an entry
that continues it; a number on two lines; a number with no `numbered` or
`added` block, or one gone from its file whose last block is not `merged into`
or `removed`; a pointer to no live entry, or quoted words that do not open the
target's title; with --base, an entry at COMMIT that is neither its line now
nor the earlier line of a block in its history (pointer words refreshed by the
tool aside). It reports, without failing: the entries over 600 characters, the
entries without a bold title, and the `--from` paths and the report sections
an entry cites (`PATH`, "HEADING") that do not resolve.

The reads are facts-extract.sh's: `F-87`, `F-87+` (with the entries it points
to and that point to it), `history:F-87`, and the title queries, which fall
back to the former titles in the history.
"""

import argparse
import collections
import datetime
import importlib.util
import os
import re
import subprocess
import sys

TOOLS = os.path.dirname(os.path.realpath(__file__))
TREE = os.path.dirname(os.path.dirname(os.path.dirname(TOOLS)))   # the checkout this tool is in

sys.path.insert(0, TOOLS)
from ledger import Lock, write_text, norm, clip, one_line   # noqa: E402  ledger.py's lock, one-step write and matching

COORD = 'explorations/coordinator'
FILES = {'F': 'FACTS.md', 'P': 'POSITIONS.md'}
HISTORIES = {'F': 'FACTS-history.md', 'P': 'POSITIONS-history.md'}
LOCK_NAME = '.record.lock'
SIZE = 600            # the record rule's measure of an entry; reported, never refused
SEP = ' · '           # between the fields of a provenance line

KEY = re.compile(r'([FP])-(\d+)$')
NUMBERED = re.compile(r'- ([A-Z])-(\d+) ')
LEAD = re.compile(r'- (?:[FP]-(?:\d+|\?\d*) )?')
POINTER = re.compile(r'(?<![\w/?-])([FP])-(\d+)(?![\w-])(?:(, | \()(["“])([^"”\n]*)(["”]))?')
PLACEHOLDER = re.compile(r'(?<![\w/-])([FP])-\?(\d+)(?![\w-])')
HEADING = re.compile(r'(#{2,3}) +(.*\S)\s*$')
BLOCK_HEAD = re.compile(r'### ([FP])-(\d+)\s*$')
ELLIPSIS = re.compile(r'\s*(?:\.\.\.|…)\s*')
CITED = re.compile(r'`([^`\s]+\.(?:md|tex))(?::[\d,:\s-]*)?`,? (?:section |§ )?"([^"]+)"')


class RecordError(Exception):
    pass


def key_of(kind, num):
    return '%s-%d' % (kind, num)


def parse_key(text):
    m = KEY.match(text.strip())
    if not m:
        raise RecordError('%s is not an entry number such as F-87 or P-48' % text)
    return m.group(1), int(m.group(2))


def sort_key(key):
    kind, num = parse_key(key)
    return (kind, num)


# ---------------------------------------------------------------- titles and pointers

def body_of(line):
    """An entry's text after `- ` and its number."""
    m = LEAD.match(line)
    return line[m.end():] if m else line


def title_of(text):
    """The bold opening of an entry, or where it has none, its opening words up to the
    first colon, semicolon or full stop followed by a space, outside code spans."""
    body = body_of(text)
    if body.startswith('**'):
        end = body.find('**', 2)
        if end > 2:
            return body[2:end]
    code = False
    for i, c in enumerate(body):
        if c == '`':
            code = not code
        elif not code and c in ':;.' and body[i + 1:i + 2] == ' ':
            return body[:i]
    return body[:200]


def _segments(words):
    return [norm(s).strip(' .,;:*') for s in ELLIPSIS.split(words.strip())]


def words_open(words, title):
    """Whether quoted words open a title: the words before the first ellipsis open it at a
    word boundary, and the words after each ellipsis follow in order."""
    segs = _segments(words)
    t = norm(title)
    first = segs[0]
    if not first:
        return False
    if not t.startswith(first):
        return False
    pos = len(first)
    if pos < len(t) and (t[pos].isalnum() or t[pos] == '_') and (first[-1].isalnum() or first[-1] == '_'):
        return False
    for s in segs[1:]:
        if not s:
            continue
        k = t.find(s, pos)
        if k < 0:
            return False
        pos = k + len(s)
    return True


def resolve_words(words, entries):
    """The entries a title citation's words name: those whose title they open, narrowed to
    an equal title when several; else those whose title holds the words before the first
    ellipsis, as a title query matches. One entry is a resolution."""
    hits = [e for e in entries if words_open(words, e.title)]
    if len(hits) > 1:
        whole = _segments(words)[0]
        exact = [e for e in hits if norm(e.title).strip(' .,;:') == whole]
        hits = exact or hits
    if not hits:
        first = _segments(words)[0]
        hits = [e for e in entries if first and first in norm(e.title)]
    return hits


def refresh_words(words, old_title, new_title):
    """The quoted words of a pointer to a retitled entry: as many of the new title's
    words as the old words held before an ellipsis, the whole title where they reach it."""
    first = ELLIPSIS.split(words.strip())[0].strip()
    if norm(first).strip(' .,;:*') == norm(old_title).strip(' .,;:*'):
        return new_title
    k = len(first.split())
    new = new_title.split()
    if k >= len(new):
        return new_title
    return ' '.join(new[:k]).rstrip(',;:') + ' ...'


class Pointer:
    def __init__(self, m, offset=0):
        self.kind, self.num = m.group(1), int(m.group(2))
        self.key = key_of(self.kind, self.num)
        self.start, self.end = m.start() + offset, m.end() + offset
        self.sep, self.q1, self.words, self.q2 = m.group(3), m.group(4), m.group(5), m.group(6)
        if self.words is not None and not self.words.strip():
            self.words = None      # `F-1, ""`: no words

    def text(self, key=None, words=None):
        key = key or self.key
        if self.sep is None:
            return key
        return '%s%s%s%s%s' % (key, self.sep, self.q1, self.words if words is None else words, self.q2)


def pointers(line):
    """The pointers of an entry's line (its own number aside), or of any text."""
    offset = len(line) - len(body_of(line)) if line.startswith('- ') else 0
    return [Pointer(m, offset) for m in POINTER.finditer(line[offset:])]


def rewrite(line, fn):
    """line with each pointer p replaced by fn(p), where fn gives a text, or None to keep it."""
    out, last = [], 0
    for p in pointers(line):
        new = fn(p)
        if new is not None:
            out.append(line[last:p.start])
            out.append(new)
            last = p.end
    out.append(line[last:])
    return ''.join(out)


def masked(line):
    """The line with every pointer and its quoted words blanked, for comparing lines that
    differ only in pointers the tool rewrote."""
    return POINTER.sub('\x00', line)


# ---------------------------------------------------------------- reading

def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


class Entry:
    def __init__(self, kind, num, lineno, line, heading, top=None):
        self.kind = kind           # F or P, from its number; None for a line with no number
        self.num = num
        self.key = key_of(kind, num) if num is not None else None
        self.lineno = lineno       # 1-based
        self.line = line
        self.heading = heading     # (0-based line, level, title) of its section's heading, or None
        self.top = top             # the title of the `## ` heading over its `### ` section, or None
        self.title = title_of(line)

    @property
    def section(self):
        return self.heading[2] if self.heading else None


class RecordFile:
    """FACTS.md or POSITIONS.md: its headings, its entries, and the lines under an entry that continue it."""
    def __init__(self, kind, path, text=None):
        self.kind, self.path = kind, path
        if text is None:
            text = read(path) if os.path.exists(path) else ''
        self.text = text
        self.lines = text.split('\n')
        self.headings, self.entries, self.stray = [], [], []
        heading, top, after_entry, comment = None, None, False, False
        for i, ln in enumerate(self.lines):
            if comment:
                comment = '-->' not in ln
                continue
            m = HEADING.match(ln)
            if m:
                heading = (i, len(m.group(1)), m.group(2).strip())
                top = heading[2] if heading[1] == 2 else top
                self.headings.append(heading)
                after_entry = False
            elif ln.startswith('#'):
                after_entry = False
            elif ln.startswith('- '):
                n = NUMBERED.match(ln)
                self.entries.append(Entry(n.group(1) if n else None, int(n.group(2)) if n else None, i + 1, ln, heading,
                                          top if heading and heading[1] == 3 else None))
                after_entry = True
            elif ln.startswith('<!--'):
                comment = '-->' not in ln
                after_entry = False
            elif not ln.strip():
                after_entry = False
            elif after_entry:
                self.stray.append((i + 1, ln))

    @property
    def numbered(self):
        return any(e.num is not None for e in self.entries)

    def heading_named(self, title):
        want = norm(re.sub(r'^#+\s*', '', title))
        hits = [h for h in self.headings if norm(h[2]) == want]
        if len(hits) == 1:
            return hits[0]
        names = '; '.join('"%s"' % h[2] for h in self.headings)
        if not hits:
            raise RecordError('%s has no heading "%s"; its headings: %s' % (os.path.basename(self.path), title, names))
        raise RecordError('%s has %d headings "%s"' % (os.path.basename(self.path), len(hits), title))


class Block:
    def __init__(self, kind, num, lineno, lines):
        self.kind_letter, self.num = kind, num
        self.key = key_of(kind, num)
        self.lineno = lineno       # 1-based line of its ### heading
        self.lines = lines         # the lines under the heading, to the next block
        body = [ln for ln in lines if ln.strip()]
        self.prov = body[0] if body and not body[0].startswith('- ') else ''
        self.extra = [ln for ln in body[1:] if not ln.startswith('- ')]
        earlier = [ln for ln in body if ln.startswith('- ')]
        self.earlier = earlier[0] if earlier else None
        fields = self.prov.split(SEP)
        self.kind = fields[1].split(':')[0].strip() if len(fields) > 1 else ''

    def text(self):
        lines = list(self.lines)
        while lines and not lines[-1].strip():
            lines.pop()
        return '\n'.join(['### ' + self.key] + lines)

    def former_titles(self):
        """The titles a `numbered` block names as the entry's earlier ones."""
        m = re.search(r'former titles?: "(.*?)"(?:;|$)', self.prov)
        return m.group(1).split('", "') if m else []

    def refreshed(self):
        """The entries this block's change rewrote without a block of their own."""
        out = []
        for ln in self.extra:
            if ln.startswith('pointer words refreshed in:') or ln.startswith('pointers to '):
                out += re.findall(r'[FP]-\d+', ln.split(':', 1)[1])
        return out


class HistoryFile:
    def __init__(self, kind, path):
        self.kind, self.path = kind, path
        self.text = read(path) if os.path.exists(path) else ''
        lines = self.text.split('\n')
        raw, cur = [], None
        for i, ln in enumerate(lines):
            m = BLOCK_HEAD.match(ln)
            if m:
                cur = (m.group(1), int(m.group(2)), i + 1, [])
                raw.append(cur)
            elif ln.startswith('#'):
                cur = None
            elif cur is not None:
                cur[3].append(ln)
        self.blocks = [Block(*r) for r in raw]

    def of(self, key):
        return [b for b in self.blocks if b.key == key]


class Paths:
    def __init__(self, root):
        self.root = os.path.abspath(root)
        self.dir = os.path.join(self.root, COORD)
        self.files = {k: os.path.join(self.dir, f) for k, f in FILES.items()}
        self.histories = {k: os.path.join(self.dir, f) for k, f in HISTORIES.items()}
        self.lock = os.path.join(self.dir, LOCK_NAME)


class Store:
    """The two record files and their histories, as they are on disk."""
    def __init__(self, paths):
        self.p = paths
        self.files = {k: RecordFile(k, paths.files[k]) for k in 'FP'}
        self.hist = {k: HistoryFile(k, paths.histories[k]) for k in 'FP'}
        self.live = {}
        for k in 'FP':
            for e in self.files[k].entries:
                if e.key and e.kind == k:
                    self.live.setdefault(e.key, e)

    def entries(self):
        return [e for k in 'FP' for e in self.files[k].entries]

    def entry(self, key):
        e = self.live.get(key)
        if e is None:
            raise RecordError('there is no entry %s%s' % (key, self.gone_note(key)))
        return e

    def gone_note(self, key):
        blocks = self.hist[key[0]].of(key)
        if blocks and blocks[-1].kind.startswith(('merged into', 'removed')):
            return ' (%s: %s)' % (os.path.basename(self.p.histories[key[0]]), blocks[-1].kind)
        return ''

    def max_used(self, kind):
        nums = [e.num for e in self.files[kind].entries if e.num is not None and e.kind == kind]
        nums += [b.num for b in self.hist[kind].blocks]
        return max(nums + [0])


# ---------------------------------------------------------------- provenance

def now():
    return datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%MZ')


def git(root, *args):
    return subprocess.run(['git', '-C', root] + list(args), capture_output=True, text=True)


_FX = []


def facts_extract():
    """facts-extract.py, the record's reader, loaded once for its heading resolution."""
    if not _FX:
        spec = importlib.util.spec_from_file_location('facts_extract', os.path.join(TOOLS, 'facts-extract.py'))
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        _FX.append(mod)
    return _FX[0]


def find_path(root, path):
    """PATH from the repository root, else from explorations/ or explorations/coordinator/."""
    path = path.strip().strip('`')
    for base in ('', 'explorations/', COORD + '/', 'Specification/'):
        if os.path.isfile(os.path.join(root, base + path)):
            return base + path
    return None


def resolve_section(root, path, heading):
    """(path from the root, the heading as written in the file) for PATH#HEADING, or raise."""
    rel = find_path(root, path)
    if rel is None:
        raise RecordError('%s is no file from the repository root or from explorations/' % path)
    if not heading:
        return rel, None
    fx = facts_extract()
    f = fx.find_doc(fx.Record(root), 'doc:%s#%s' % (rel, heading), True)
    if f.missing:
        raise RecordError('no heading of %s holds "%s"' % (rel, heading))
    if f.bad:
        raise RecordError('"%s" names more than one heading of %s: %s' % (heading, rel, f.where))
    lines = read(os.path.join(root, rel)).split('\n')
    first = int(re.search(r':(\d+)-', f.where).group(1))
    m = HEADING.match(lines[first - 1]) or re.match(r'#+ +(.*\S)', lines[first - 1])
    if m:
        return rel, m.groups()[-1].strip()
    tex = fx.TEX_HEAD.match(lines[first - 1])
    return rel, fx.tex_title(tex.group(2)) if tex else heading


class Prov:
    def __init__(self, froms=(), commit=None, by=None, note=None):
        self.froms = list(froms)     # (PATH, HEADING or None), as given
        self.commit, self.by, self.note = commit, by, note

    def given(self):
        return bool(self.froms or self.commit or self.by or self.note)

    def over(self, base):
        """This entry's own provenance over the call's."""
        return Prov(base.froms + self.froms, self.commit or base.commit, self.by or base.by, self.note or base.note)

    @staticmethod
    def parse_line(text):
        """`from: PATH, "HEADING"; commit: HASH; by: WHO; note: WHY` (any of them, note last)."""
        out = Prov()
        for m in re.finditer(r'(?:^|;\s*)(from|commit|by|note):\s*(.*?)(?=;\s*(?:from|commit|by|note):|$)', text.strip()):
            name, value = m.group(1), m.group(2).strip()
            if name == 'note':
                value = text.strip()[m.start(2):].strip()
                out.note = value
                break
            if name == 'from':
                out.froms.append(split_from(value))
            elif name == 'commit':
                out.commit = value.strip('`')
            else:
                out.by = value
        return out


def split_from(text):
    """PATH#HEADING, or PATH, "HEADING", or PATH alone -> (PATH, HEADING or None)."""
    text = text.strip()
    m = re.match(r'`?([^`#,"]+?)`?\s*(?:#\s*(.*)|,\s*["“](.*)["”])?$', text)
    if not m:
        raise RecordError('a from is PATH#HEADING or PATH, "HEADING": %s' % text)
    return m.group(1).strip(), (m.group(2) or m.group(3) or '').strip() or None


class ProvChecker:
    """Resolves a write's provenance once per distinct from and commit."""
    def __init__(self, root):
        self.root = root
        self.cache = {}

    def from_(self, path, heading):
        k = ('from', path, heading)
        if k not in self.cache:
            self.cache[k] = resolve_section(self.root, path, heading)
        return self.cache[k]

    def commit(self, h):
        k = ('commit', h)
        if k not in self.cache:
            if git(self.root, 'rev-parse', '--verify', '--quiet', h + '^{commit}').returncode != 0:
                raise RecordError('%s is not a commit' % h)
            if git(self.root, 'merge-base', '--is-ancestor', h, 'HEAD').returncode != 0:
                raise RecordError('%s is not in the history of HEAD' % h)
            self.cache[k] = git(self.root, 'rev-parse', '--short=9', h).stdout.strip()
        return self.cache[k]

    def line(self, prov, kind, stamp):
        """The provenance line of one block, or raise."""
        if not prov.froms and not (prov.note and prov.note.strip()):
            raise RecordError('no provenance: give --from PATH#HEADING or --note WHY')
        fields = [stamp, kind]
        for path, heading in prov.froms:
            rel, head = self.from_(path, heading)
            fields.append('from `%s`' % rel + (', "%s"' % head if head else ''))
        if prov.commit:
            fields.append('commit `%s`' % self.commit(prov.commit))
        if prov.by:
            fields.append('by ' + one_line(prov.by))
        out = SEP.join(fields)
        if prov.note and prov.note.strip():
            out += ': ' + one_line(prov.note)
        return out


# ---------------------------------------------------------------- the state a write leaves

class State:
    """The record files as a write would leave them: each a list of items, ['text', line]
    or ['entry', key, line]."""
    def __init__(self, store):
        self.store = store
        self.items = {}
        for k in 'FP':
            f = store.files[k]
            by_line = {e.lineno: e for e in f.entries}
            items = []
            for i, ln in enumerate(f.lines):
                e = by_line.get(i + 1)
                items.append(['entry', e.key, ln] if e is not None and e.key else ['text', ln])
            self.items[k] = items
        self.old = {key: (e.line, e.section) for key, e in store.live.items()}

    def find(self, key):
        items = self.items[key[0]]
        for i, it in enumerate(items):
            if it[0] == 'entry' and it[1] == key:
                return i
        return None

    def line(self, key):
        i = self.find(key)
        return self.items[key[0]][i][2] if i is not None else None

    def set_line(self, key, line):
        self.items[key[0]][self.find(key)][2] = line

    def delete(self, key):
        items = self.items[key[0]]
        i = self.find(key)
        del items[i]
        if 0 < i < len(items) and items[i - 1] == ['text', ''] and items[i] == ['text', '']:
            del items[i]

    def section_of(self, key):
        """The title of the nearest heading above the entry."""
        title = None
        for it in self.items[key[0]][:self.find(key)]:
            if it[0] == 'text':
                m = HEADING.match(it[1])
                if m:
                    title = m.group(2).strip()
        return title

    def insert(self, key, line, heading_title):
        """At the end of the section under the heading titled heading_title."""
        items = self.items[key[0]]
        h = [i for i, it in enumerate(items) if it[0] == 'text' and HEADING.match(it[1])
             and norm(HEADING.match(it[1]).group(2)) == norm(heading_title)]
        if len(h) != 1:
            raise RecordError('%s has no one heading "%s"' % (FILES[key[0]], heading_title))
        h = h[0]
        last, i = None, h + 1
        while i < len(items) and not (items[i][0] == 'text' and items[i][1].startswith('#')):
            if items[i][0] == 'entry':
                last = i
            i += 1
        if last is not None:
            items.insert(last + 1, ['entry', key, line])
        else:
            items[h + 1:h + 1] = [['text', ''], ['entry', key, line]] + \
                ([['text', '']] if h + 1 < len(items) and items[h + 1][1].strip() else [])

    def keys(self):
        return [it[1] for k in 'FP' for it in self.items[k] if it[0] == 'entry']

    def title(self, key):
        return title_of(self.line(key))

    def render(self, kind):
        return '\n'.join(it[2] if it[0] == 'entry' else it[1] for it in self.items[kind])


class Op:
    """One change a call asks for. what: add, set, merge, remove."""
    def __init__(self, what, key, line=None, section=None, into=None, prov=None, where=''):
        self.what, self.key, self.line, self.section, self.into = what, key, line, section, into
        self.prov = prov or Prov()
        self.where = where          # where the op was written, for messages
        self.prov_given = False


def entry_line(key, text, where=''):
    """The full line of entry key from text that holds it with or without `- ` and its number."""
    lines = [ln for ln in text.split('\n') if ln.strip()]
    if len(lines) != 1:
        raise RecordError('%san entry is one line; this text has %d' % (where, len(lines)))
    body = lines[0].strip()
    if body.startswith('- '):
        body = body[2:]
    m = re.match(r'([FP])-(\d+|\?\d*) ', body)
    if m:
        if m.group(2).isdigit() and key_of(m.group(1), int(m.group(2))) != key:
            raise RecordError('%sthe line is numbered %s-%s, not %s' % (where, m.group(1), m.group(2), key))
        body = body[m.end():]
    if not body.strip():
        raise RecordError('%sthe entry %s is empty' % (where, key))
    return '- %s %s' % (key, body.rstrip())


def execute(store, ops, call_prov, pc):
    """Check every op against the state they leave together; return (state, blocks, report) or raise."""
    st = State(store)
    stamp = now()
    errors = []
    seen = set()
    for op in ops:
        for k in [op.key] + ([op.into] if op.into else []):
            if op.what != 'add' and k not in st.old:
                errors.append('%s%s is no live entry%s' % (op.where, k, store.gone_note(k)))
        if op.key in seen and op.what != 'merge-target':
            errors.append('%s%s is changed twice in one call' % (op.where, op.key))
        seen.add(op.key)
    if errors:
        raise RecordError('\n  '.join(['the changes are refused:'] + errors))

    changed = {}            # key -> [kind parts], in the order of the ops
    merged = {}             # N -> M
    removed = []
    own_prov = {}
    for op in ops:
        prov = op.prov.over(call_prov)
        try:
            if op.what == 'add':
                st.insert(op.key, op.line, op.section)
                changed[op.key] = ['added']
            elif op.what in ('set', 'merge-target'):
                if op.line is not None:
                    st.set_line(op.key, op.line)
                if op.section and norm(op.section) != norm(st.section_of(op.key) or ''):
                    line = st.line(op.key)
                    st.delete(op.key)
                    st.insert(op.key, line, op.section)
                changed.setdefault(op.key, [])
                if op.what == 'merge-target' and op.prov.given():
                    own_prov[op.key] = prov
            elif op.what == 'merge':
                if op.into[0] != op.key[0]:
                    raise RecordError('%s and %s are not in one file' % (op.key, op.into))
                if op.into == op.key:
                    raise RecordError('an entry is not merged into itself')
                st.delete(op.key)
                merged[op.key] = op.into
                changed[op.key] = ['merged into %s' % op.into]
                changed.setdefault(op.into, [])
                own_prov.setdefault(op.into, prov)
            elif op.what == 'remove':
                st.delete(op.key)
                removed.append(op.key)
                changed[op.key] = ['removed']
        except RecordError as e:
            errors.append(op.where + str(e))
        own_prov.setdefault(op.key, prov)
    if errors:
        raise RecordError('\n  '.join(['the changes are refused:'] + errors))

    live = set(st.keys())
    rewritten_in = collections.defaultdict(list)   # N or a retitled key -> entries rewritten for it

    # Pointers to a merged entry now point to the one it went into.
    def follow(k):
        while k in merged:
            k = merged[k]
        return k
    if merged:
        for k in st.keys():
            line = st.line(k)
            hit = []
            def to_target(p):
                if p.key in merged:
                    hit.append(p.key)
                    target = follow(p.key)
                    words = refresh_words(p.words, title_of(store.live[p.key].line), st.title(target)) if p.words else None
                    return p.text(key=target, words=words)
                return None
            new = rewrite(line, to_target)
            if new != line:
                st.set_line(k, new)
                for n in hit:
                    rewritten_in[n].append(k)

    # A retitled entry's pointer words follow its new title in every entry that points to it.
    retitled = {k: (title_of(store.live[k].line), st.title(k)) for k in changed
                if k in live and k in store.live and norm(title_of(store.live[k].line)) != norm(st.title(k))}
    if retitled:
        for k in st.keys():
            line = st.line(k)
            hit = []
            def refresh(p):
                if p.key in retitled and p.words:
                    old_t, new_t = retitled[p.key]
                    if not words_open(p.words, new_t) and words_open(p.words, old_t):
                        hit.append(p.key)
                        return p.text(words=refresh_words(p.words, old_t, new_t))
                return None
            new = rewrite(line, refresh)
            if new != line:
                st.set_line(k, new)
                for n in hit:
                    rewritten_in[n].append(k)

    # What each change is, now that the state is known.
    for k in list(changed):
        if changed[k] and (changed[k][0] in ('added', 'removed') or changed[k][0].startswith('merged into')):
            continue
        old_line, old_section = st.old[k]
        new_line, new_section = st.line(k), st.section_of(k)
        parts = []
        if k in merged.values():
            parts += ['%s merged in' % n for n, m in merged.items() if m == k]
        if norm(new_section or '') != norm(old_section or ''):
            parts.append('moved to "%s"' % new_section)
        if new_line != old_line:
            parts.append('rewritten')
        if not parts:
            del changed[k]
            continue
        changed[k] = parts

    # The checks of the state left: the lines written hold pointers to live entries,
    # with words that open their titles; nothing points to a removed entry.
    written = set(changed) | {x for xs in rewritten_in.values() for x in xs}
    for k in st.keys():
        line = st.line(k)
        for p in pointers(line):
            if p.key in removed:
                errors.append('%s points to %s, which this call removes; rewrite or remove that pointer first' % (k, p.key))
            elif k not in written:
                continue
            elif p.key not in live:
                errors.append('%s points to %s, which is no live entry%s' % (k, p.key, store.gone_note(p.key)))
            elif p.words and not words_open(p.words, st.title(p.key)):
                errors.append('%s points to %s with "%s", which does not open its title "%s"' % (
                    k, p.key, clip(p.words, 80), clip(st.title(p.key), 100)))
        if k in written and '\n' in line:
            errors.append('%s holds a line break' % k)
    for k in changed:
        try:
            changed[k] = (changed[k], pc.line(own_prov.get(k, call_prov), ', '.join(changed[k]), stamp))
        except RecordError as e:
            errors.append('%s: %s' % (k, e))
    if errors:
        raise RecordError('\n  '.join(['the changes are refused:'] + sorted(set(errors), key=errors.index)))

    blocks = {'F': [], 'P': []}
    for k, (parts, prov_line) in changed.items():
        extra = []
        if k in rewritten_in:
            who = ', '.join(sorted(set(rewritten_in[k]), key=sort_key))
            extra.append(('pointers to %s rewritten to %s in: ' % (k, follow(k)) if k in merged else 'pointer words refreshed in: ') + who)
        earlier = store.live[k].line if k in store.live else None
        blocks[k[0]].append((k, prov_line, extra, earlier))
    report = []
    for k, (parts, prov_line) in changed.items():
        report.append('%s: %s' % (k, ', '.join(parts)))
    for n, ks in rewritten_in.items():
        report.append('%s: %s %s' % (n, 'pointers rewritten in' if n in merged else 'pointer words refreshed in',
                                     ', '.join(sorted(set(ks), key=sort_key))))
    return st, blocks, report


def append_blocks(path, blocks, head):
    new = not os.path.exists(path) or os.path.getsize(path) == 0
    with open(path, 'a', encoding='utf-8') as f:
        if new:
            f.write(head)
        for key, prov, extra, earlier in blocks:
            f.write('\n### %s\n\n%s\n' % (key, '\n'.join([prov] + extra)))
            if earlier is not None:
                f.write('\n%s\n' % earlier)


TITLES = {'F': 'Facts on record: history', 'P': 'Pavol\'s positions, decisions and known ground: history'}


def history_head(kind, title=None, base=None):
    """The head of a history file; base, the commit whose tree holds the texts from before the numbering."""
    name, hname = FILES[kind], HISTORIES[kind]
    before = ('; the texts from before the numbering are in this file as it stood at `%s`' % base) if base else ''
    out = ['<!-- The history of every entry of `%s` under its number, oldest first: one block per change, each a provenance line '
           '(when, what changed, from which report sections, which commit, by whom, why) and the line the change replaced. '
           '`tools/record.py` writes it and nothing else edits it%s. -->' % (name, before),
           '', '# ' + (title or TITLES[kind]), '',
           'Each block is `### %s-n`, one provenance line, and the entry\'s line as it stood before the change, verbatim. '
           'A `numbered` block, one per entry, names its line when the record was numbered and the titles it had before. '
           '`explorations/coordinator/tools/facts-extract.sh \'history:%s-87\'` prints one entry\'s blocks.' % (kind, kind)]
    if base:
        out.append('')
        out.append('The texts from before the numbering: `git show %s:%s/%s`, whose lines the `numbered` blocks name.' % (base, COORD, hname))
    return '\n'.join(out) + '\n'


def write_state(p, store, st, blocks):
    """History first, then each record file that changed, each in one step."""
    for k in 'FP':
        if blocks[k]:
            append_blocks(p.histories[k], blocks[k], history_head(k))
    for k in 'FP':
        text = st.render(k)
        if text != store.files[k].text:
            write_text(p.files[k], text)


def run_ops(p, ops, call_prov):
    pc = ProvChecker(p.root)
    with Lock(p.lock):
        store = Store(p)
        if not all(store.files[k].numbered for k in 'FP'):
            raise RecordError('the record is not numbered yet: run tools/record-number.py first')
        st, blocks, report = execute(store, ops(store) if callable(ops) else ops, call_prov, pc)
        if not any(blocks.values()):
            raise RecordError('nothing changes')
        write_state(p, store, st, blocks)
    for ln in report:
        print(ln)


# ---------------------------------------------------------------- commands

def call_prov(a):
    return Prov([split_from(f) for f in (a.from_ or [])], a.commit, a.by, a.note)


def cmd_add(a, p):
    kind = a.kind.upper()
    if kind not in FILES:
        raise RecordError('add F or add P, not %s' % a.kind)
    text = read(a.file)

    def ops(store):
        store.files[kind].heading_named(a.section)
        key = key_of(kind, store.max_used(kind) + 1)
        return [Op('add', key, entry_line(key, text), a.section)]
    lines = [ln for ln in text.split('\n') if ln.strip()]
    if lines:
        m = re.match(r'(?:- )?([FP])-(\d+) ', lines[0].strip())
        if m:
            raise RecordError('add numbers the entry itself: write the line without %s-%s' % (m.group(1), m.group(2)))
    run_ops(p, ops, call_prov(a))


def cmd_set(a, p):
    kind, num = parse_key(a.n)
    key = key_of(kind, num)
    line = entry_line(key, read(a.file)) if a.file else None
    if line is None and not a.section:
        raise RecordError('set needs FILE, --section, or both')

    def ops(store):
        if a.section:
            store.files[kind].heading_named(a.section)
        e = store.entry(key)
        if line == e.line and (not a.section or norm(a.section) == norm(e.section or '')):
            raise RecordError('%s is already that line in that section' % key)
        return [Op('set', key, line, a.section)]
    run_ops(p, ops, call_prov(a))


def cmd_merge(a, p):
    n = key_of(*parse_key(a.n))
    m = key_of(*parse_key(a.into))
    line = entry_line(m, read(a.file)) if a.file else None
    run_ops(p, [Op('merge', n, into=m), Op('merge-target', m, line)], call_prov(a))


def cmd_remove(a, p):
    key = key_of(*parse_key(a.n))
    run_ops(p, [Op('remove', key)], call_prov(a))


def parse_apply(text, store):
    """The ops of an apply file, its placeholders numbered."""
    errors = []
    defined = []
    for i, ln in enumerate(text.split('\n'), 1):
        m = re.match(r'- ([FP])-\?(\d+) ', ln)
        if m:
            ph = '%s-?%s' % (m.group(1), m.group(2))
            if ph in defined:
                errors.append('line %d: %s is defined twice' % (i, ph))
            defined.append(ph)
    numbers, nxt = {}, {k: store.max_used(k) for k in 'FP'}
    for ph in defined:
        nxt[ph[0]] += 1
        numbers[ph] = key_of(ph[0], nxt[ph[0]])
    for m in PLACEHOLDER.finditer(text):
        ph = '%s-?%s' % (m.group(1), m.group(2))
        if ph not in numbers:
            errors.append('%s is used but no line `- %s ...` defines it' % (ph, ph))
    text = PLACEHOLDER.sub(lambda m: numbers.get('%s-?%s' % (m.group(1), m.group(2)), m.group(0)), text)
    ops, heading, last, comment = [], None, None, False
    news = set(numbers.values())
    for i, ln in enumerate(text.split('\n'), 1):
        where = 'line %d: ' % i
        if comment:
            comment = '-->' not in ln
            continue
        if not ln.strip():
            continue
        if ln.startswith('<!--'):
            comment = '-->' not in ln
            continue
        h = HEADING.match(ln)
        if h:
            heading = h.group(2).strip()
            continue
        if ln[0] in ' \t':
            if last is None or last.prov_given:
                errors.append(where + 'a provenance line follows an entry, a merge or a remove, once')
                continue
            try:
                last.prov = Prov.parse_line(ln)
            except RecordError as e:
                errors.append(where + str(e))
            last.prov_given = True
            continue
        m = re.match(r'- ([FP])-(\d+) ', ln)
        r = re.match(r'remove ([FP]-\d+)\s*$', ln)
        g = re.match(r'merge ([FP]-\d+) into ([FP]-\d+)\s*$', ln)
        v = re.match(r'move ([FP]-\d+) to (.+?)\s*$', ln)
        try:
            if m:
                key = key_of(m.group(1), int(m.group(2)))
                if heading is not None:
                    store.files[key[0]].heading_named(heading)
                if key in news:
                    if heading is None:
                        raise RecordError('a new entry stands under a ## or ### heading of its section')
                    op = Op('add', key, entry_line(key, ln, where), heading, where=where)
                else:
                    e = store.live.get(key)
                    if e is not None and heading is not None and norm(heading) not in [norm(t) for t in section_path(e)]:
                        raise RecordError('%s stands under "%s", not "%s": put it under its own heading or under none, '
                                          'and write `move %s to SECTION` to move it' % (key, e.section, heading, key))
                    op = Op('set', key, entry_line(key, ln, where), where=where)
            elif v:
                title = v.group(2).strip().strip('"“”').lstrip('#').strip()
                store.files[v.group(1)[0]].heading_named(title)
                op = Op('move', v.group(1), None, title, where=where)
            elif r:
                op = Op('remove', r.group(1), where=where)
            elif g:
                op = Op('merge', g.group(1), into=g.group(2), where=where)
            else:
                raise RecordError('not a heading, an entry line `- F-87 ...`, `move F-87 to SECTION`, `remove F-87`, '
                                  '`merge F-87 into F-53` or an indented provenance line: ' + clip(ln, 80))
        except RecordError as e:
            errors.append(where + str(e))
            last = None
            continue
        ops.append(op)
        last = op
    if errors:
        raise RecordError('\n  '.join(['the apply file is refused:'] + errors))
    return ops


def apply_ops(store, ops):
    """A move joins the entry's line, and a merge takes its target's line, from wherever
    they stand in the file; an entry line equal to the entry, left in its section, is dropped."""
    sets = {}
    for op in ops:
        if op.what == 'set':
            sets.setdefault(op.key, op)
    for op in ops:
        if op.what == 'move':
            if op.key in sets:
                sets[op.key].section = op.section
                if op.prov_given and not sets[op.key].prov_given:
                    sets[op.key].prov, sets[op.key].prov_given = op.prov, True
                op.what = 'joined'
            else:
                op.what = 'set'
                sets[op.key] = op
    ops = [op for op in ops if op.what != 'joined']
    targets = {op.into for op in ops if op.what == 'merge'}
    out = []
    for op in ops:
        if op.what == 'merge':
            out.append(op)
            target = sets.pop(op.into, None)
            if target is not None:
                target.what = 'merge-target'
                out.append(target)
            else:
                out.append(Op('merge-target', op.into, None, where=op.where))
        elif op.what == 'set' and op.key in targets:
            continue        # written with its merge
        elif op.what == 'set':
            e = store.live.get(op.key)
            if e is not None and (op.line is None or e.line == op.line) and (op.section is None or norm(op.section) == norm(e.section or '')):
                continue
            out.append(op)
        else:
            out.append(op)
    return out


def section_path(e):
    """An entry's section, then the `## ` section that holds it when that is a `### ` one."""
    return [t for t in (e.section, e.top) if t]


def cmd_apply(a, p):
    text = read(a.file)
    run_ops(p, lambda store: apply_ops(store, parse_apply(text, store)), call_prov(a))


# ---------------------------------------------------------------- check

def check(p, base=None):
    """(failures, reports): lists of (where, rule, detail)."""
    store = Store(p)
    fails, reports = [], []
    for k in 'FP':
        f = store.files[k]
        name = FILES[k]
        seen = collections.defaultdict(list)
        untitled, over = [], []
        for e in f.entries:
            where = '%s:%d' % (name, e.lineno)
            if e.num is None:
                fails.append((where, 'form', 'an entry line without its number: ' + clip(e.line, 70)))
                continue
            if e.kind != k:
                fails.append((where, 'form', '%s is numbered for %s' % (e.key, FILES.get(e.kind, '?'))))
            seen[e.key].append(e.lineno)
            if not e.line[len('- %s ' % e.key):].strip():
                fails.append((where, 'form', '%s is empty' % e.key))
            if not body_of(e.line).startswith('**'):
                untitled.append(e.key)
            if len(e.line) > SIZE:
                over.append('%s %d' % (e.key, len(e.line)))
        if over:
            reports.append((name, 'size', '%d entries over %d characters: %s' % (len(over), SIZE, ', '.join(over))))
        if untitled:
            reports.append((name, 'title', '%d entries with no bold title, their opening words standing for one: %s' % (len(untitled), ', '.join(untitled))))
        for ln, text in f.stray:
            fails.append(('%s:%d' % (name, ln), 'one-line', 'a line under an entry continues it: ' + clip(text, 70)))
        for key, lns in seen.items():
            if len(lns) > 1:
                fails.append((name, 'number', '%s is on %d lines: %s' % (key, len(lns), ', '.join(map(str, lns)))))
        h = store.hist[k]
        by = collections.defaultdict(list)
        for b in h.blocks:
            by[b.key].append(b)
        for e in f.entries:
            if e.key and not any(b.kind.startswith(('numbered', 'added')) for b in by.get(e.key, ())):
                fails.append(('%s:%d' % (name, e.lineno), 'history', '%s has no numbered or added block in %s' % (e.key, HISTORIES[k])))
        for key, bs in by.items():
            if key not in store.live and not bs[-1].kind.startswith(('merged into', 'removed')):
                fails.append(('%s:%d' % (HISTORIES[k], bs[-1].lineno), 'history', '%s is in no line of %s, and its last block is %s, not merged into or removed' % (
                    key, name, bs[-1].kind or 'without a kind')))
        for b in h.blocks:
            for path, heading in re.findall(r'from `([^`]+)`(?:, "([^"]*)")?', b.prov):
                try:
                    resolve_section(p.root, path, heading or None)
                except RecordError as e:
                    reports.append(('%s:%d' % (HISTORIES[k], b.lineno), 'from', '%s: %s' % (b.key, e)))
    for e in store.entries():
        if not e.key:
            continue
        where = '%s:%d' % (FILES[e.kind] if e.kind in FILES else '?', e.lineno)
        for ptr in pointers(e.line):
            t = store.live.get(ptr.key)
            if t is None:
                fails.append((where, 'pointer', '%s points to %s, which is no live entry%s' % (e.key, ptr.key, store.gone_note(ptr.key))))
            elif ptr.words and not words_open(ptr.words, t.title):
                fails.append((where, 'pointer-words', '%s points to %s with "%s", which does not open its title "%s"' % (
                    e.key, ptr.key, clip(ptr.words, 80), clip(t.title, 100))))
        for path, heading in CITED.findall(e.line):
            if find_path(p.root, path) is None:
                continue          # a path the entry names relative to something else
            try:
                resolve_section(p.root, path, heading)
            except RecordError as err:
                reports.append((where, 'section', '%s: %s' % (e.key, err)))
    if base:
        fails += check_base(p, store, base)
    return fails, reports


def check_base(p, store, base):
    out = []
    for k in 'FP':
        rel = '%s/%s' % (COORD, FILES[k])
        shown = git(p.root, 'show', '%s:%s' % (base, rel))
        if shown.returncode != 0:
            raise RecordError('git show %s:%s failed: %s' % (base, rel, shown.stderr.strip()))
        old = RecordFile(k, rel + '@' + base, shown.stdout)
        if not old.numbered:
            raise RecordError('%s at %s is not numbered: the numbering commit is checked by tools/record-number.py --verify, and a later base by check --base' % (FILES[k], base))
        h = store.hist[k]
        refreshed = {x for j in 'FP' for b in store.hist[j].blocks for x in b.refreshed()}
        for e in old.entries:
            if not e.key:
                continue
            earlier = [b.earlier for b in h.of(e.key) if b.earlier]
            now_line = store.live[e.key].line if e.key in store.live else None
            if e.line == now_line or e.line in earlier:
                continue
            if e.key in refreshed and masked(e.line) in {masked(x) for x in earlier + ([now_line] if now_line else [])}:
                continue
            out.append(('%s@%s:%d' % (FILES[k], base, e.lineno), 'base-line', '%s at %s is not its line now, and its line then is the earlier line of no block in %s' % (
                e.key, base, HISTORIES[k])))
    return out


def cmd_check(a, p):
    fails, reports = check(p, a.base)
    store = Store(p)
    for where, rule, detail in fails:
        print('%s: %s: %s' % (where, rule, detail))
    if reports and not a.summary:
        print('reported, not failing:')
        for where, rule, detail in reports:
            print('  %s: %s: %s' % (where, rule, detail))
    counts = collections.Counter(rule for w, rule, d in fails)
    rcounts = collections.Counter(rule for w, rule, d in reports)
    print('record.py check: %s %d entries, %s %d entries; %d failures%s; reported: %s' % (
        FILES['F'], len(store.files['F'].entries), FILES['P'], len(store.files['P'].entries), len(fails),
        '' if not counts else ' (%s)' % ', '.join('%s %d' % kv for kv in sorted(counts.items())),
        ', '.join('%s %d' % kv for kv in sorted(rcounts.items())) or 'nothing'))
    return 1 if fails else 0


def main(argv):
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument('--root', default=TREE, help='the checkout whose record is read and written (default: this tool\'s)')
    prov = argparse.ArgumentParser(add_help=False)
    prov.add_argument('--from', dest='from_', action='append', metavar='PATH#HEADING')
    prov.add_argument('--commit')
    prov.add_argument('--by')
    prov.add_argument('--note')
    ap = argparse.ArgumentParser(prog='record.py', description=__doc__.split('\n\n')[0],
                                 formatter_class=argparse.RawDescriptionHelpFormatter, epilog=__doc__[__doc__.index('usage:'):])
    sub = ap.add_subparsers(dest='cmd', metavar='COMMAND')
    sub.required = True

    def sp(name, func, *parents):
        parser = sub.add_parser(name, parents=[common] + list(parents))
        parser.set_defaults(func=func)
        return parser
    s = sp('add', cmd_add, prov)
    s.add_argument('kind', metavar='F|P')
    s.add_argument('file')
    s.add_argument('--section', required=True)
    s = sp('set', cmd_set, prov)
    s.add_argument('n')
    s.add_argument('file', nargs='?')
    s.add_argument('--section')
    s = sp('merge', cmd_merge, prov)
    s.add_argument('n')
    s.add_argument('file', nargs='?')
    s.add_argument('--into', required=True)
    s = sp('remove', cmd_remove, prov)
    s.add_argument('n')
    s = sp('apply', cmd_apply, prov)
    s.add_argument('file')
    s = sp('check', cmd_check)
    s.add_argument('--base', metavar='COMMIT')
    s.add_argument('--summary', action='store_true', help='leave out the reported lines')
    a = ap.parse_args(argv)
    try:
        return a.func(a, Paths(a.root)) or 0
    except RecordError as e:
        sys.stderr.write('record.py %s: %s\n' % (a.cmd, e))
        return 1
    except BrokenPipeError:
        return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
