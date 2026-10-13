#!/usr/bin/env python3
"""Tests of record.py, of record-number.py and of facts-extract.py's number queries
and former-title fallback, over a temporary copy of the record in a git repository
of its own: the record as it stood before the numbering (HEAD's, or the numbering
commit's parent once HEAD is numbered), numbered there by record-number.py. The
record itself is not touched.

usage: python3 explorations/coordinator/tools/test_record.py [-v]
"""

import os
import re
import shutil
import subprocess
import sys
import tempfile
import unittest

TOOLS = os.path.dirname(os.path.realpath(__file__))
TREE = os.path.dirname(os.path.dirname(os.path.dirname(TOOLS)))
RECORD_PY = os.path.join(TOOLS, 'record.py')
NUMBER_PY = os.path.join(TOOLS, 'record-number.py')
FACTS_EXTRACT = os.path.join(TOOLS, 'facts-extract.py')
COORD = 'explorations/coordinator'
COPIED = ('FACTS.md', 'POSITIONS.md', 'FACTS-history.md', 'POSITIONS-history.md', 'INDEX.md')
REPORT_REL = 'explorations/test-report.md'
REPORT = """<!-- A report the tests cite. -->

# A report

## The question

Words.

## The fix

More words.

## The fix, again

Even more.
"""

sys.path.insert(0, TOOLS)
import record as R  # noqa: E402


def git(root, *args):
    return subprocess.run(['git', '-C', root] + list(args), capture_output=True, text=True, check=True).stdout


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


class RecordTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        first = git(TREE, 'log', '--reverse', '--format=%H', '-G', r'^- F-[0-9]+ ', '--', '%s/FACTS.md' % COORD).split()
        cls.source = (first[0] + '^') if first else 'HEAD'
        cls.template = tempfile.mkdtemp(prefix='test-record-')
        root = cls.template
        for name in COPIED:
            write(os.path.join(root, COORD, name), git(TREE, 'show', '%s:%s/%s' % (cls.source, COORD, name)))
        write(os.path.join(root, REPORT_REL), REPORT)
        git(root, 'init', '-q')
        git(root, '-c', 'user.name=t', '-c', 'user.email=t@t', 'add', '-A')
        git(root, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'before the numbering')
        cls.pre = git(root, 'rev-parse', 'HEAD').strip()
        p = subprocess.run([sys.executable, NUMBER_PY, '--root', root, '--write'], capture_output=True, text=True)
        assert p.returncode == 0, p.stdout + p.stderr
        cls.number_out = p.stdout
        git(root, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-a', '-m', 'numbered')
        cls.base = git(root, 'rev-parse', 'HEAD').strip()

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(cls.template)

    def setUp(self):
        self.dir = tempfile.mkdtemp(prefix='test-record-copy-')
        self.addCleanup(shutil.rmtree, self.dir)
        self.root = os.path.join(self.dir, 'root')
        shutil.copytree(self.template, self.root)
        self.p = R.Paths(self.root)

    # ------------------------------------------------------------ helpers

    def run_tool(self, *args, ok=True):
        p = subprocess.run([sys.executable, RECORD_PY] + list(args) + ['--root', self.root], capture_output=True, text=True)
        self.assertNotIn('Traceback', p.stderr)
        if ok is not None:
            self.assertEqual(p.returncode == 0, ok, 'record.py %s: %s%s' % (' '.join(args), p.stdout[-3000:], p.stderr[-3000:]))
        return p

    def fx(self, *queries):
        p = subprocess.run([sys.executable, FACTS_EXTRACT, '--root', self.root] + list(queries), capture_output=True, text=True)
        self.assertNotIn('Traceback', p.stderr)
        return p

    def store(self):
        return R.Store(self.p)

    def snapshot(self):
        return {k: R.read(path) for k, path in list(self.p.files.items()) + [(k + 'h', v) for k, v in self.p.histories.items()]}

    def line_file(self, text):
        path = os.path.join(self.dir, 'line-%d.md' % len(os.listdir(self.dir)))
        write(path, text + '\n')
        return path

    def blocks(self, key):
        return self.store().hist[key[0]].of(key)

    def pointing(self):
        """(pointing entry, target, pointer) for a pointer with words that the numbering wrote."""
        st = self.store()
        for e in st.entries():
            for ptr in R.pointers(e.line):
                if ptr.words and ptr.key[0] == 'F' and e.kind == 'F' and ptr.key != e.key:
                    return e, st.live[ptr.key], ptr
        self.fail('no pointer with words in the numbered copy')

    # ------------------------------------------------------------ the numbering

    def test_numbered(self):
        st = self.store()
        for k in 'FP':
            old = R.RecordFile(k, 'old', git(self.root, 'show', '%s:%s/%s' % (self.pre, COORD, R.FILES[k])))
            self.assertEqual([e.lineno for e in st.files[k].entries], [e.lineno for e in old.entries])
            for e in st.files[k].entries:
                self.assertEqual(e.key, '%s-%d' % (k, e.lineno))
                old_title = R.title_of(old.lines[e.lineno - 1])
                if '"' in old_title or not R.body_of(e.line).startswith('**'):
                    self.assertEqual(e.title[:20], old_title[:20])    # an untitled entry's opening words may hold a converted pointer
                else:
                    self.assertEqual(e.title, old_title)
                self.assertEqual([b.kind for b in st.hist[k].of(e.key)], ['numbered'])
            self.assertIn('`%s`' % self.pre[:9], st.hist[k].text.split('### ')[0])
        self.assertRegex(self.number_out, r'pointers converted in FACTS.md to POSITIONS.md: [1-9]')
        v = subprocess.run([sys.executable, NUMBER_PY, '--root', self.root, '--verify', self.pre], capture_output=True, text=True)
        self.assertEqual(v.returncode, 0, v.stdout + v.stderr)
        self.assertIn('passes', v.stdout)
        # a word changed by hand beside the numbering is caught
        e = st.files['F'].entries[3]
        text = R.read(self.p.files['F']).replace(e.line, e.line + ' Added.')
        write(self.p.files['F'], text)
        v = subprocess.run([sys.executable, NUMBER_PY, '--root', self.root, '--verify', self.pre], capture_output=True, text=True)
        self.assertEqual(v.returncode, 1)
        self.assertIn('%s: its line is not its line at' % e.key, v.stdout)
        # the numbering refuses a numbered record
        p = subprocess.run([sys.executable, NUMBER_PY, '--root', self.root], capture_output=True, text=True)
        self.assertNotEqual(p.returncode, 0)

    def test_parse_and_titles(self):
        st = self.store()
        self.assertEqual(R.title_of('- F-87 **The title.** Text.'), 'The title.')
        self.assertEqual(R.title_of('- P-3 Opening words; then more.'), 'Opening words')
        self.assertEqual(R.title_of('- F-?1 **New.** x'), 'New.')
        sub = [e for e in st.files['P'].entries if e.heading and e.heading[1] == 3]
        self.assertTrue(sub)
        self.assertEqual(sub[0].top, 'Decisions on record')
        self.assertTrue(R.words_open('The library route ...', 'The library route.'))
        self.assertTrue(R.words_open('The one ... answer their declared types', "The one library's storing objects answer their declared types"))
        self.assertFalse(R.words_open('by root cause', 'The distance to the switch-over by root cause'))
        self.assertFalse(R.words_open('The lib', 'The library route.'))
        self.assertEqual(R.refresh_words('The library route ...', 'The library route of old', 'A new route for the library'), 'A new route ...')
        self.assertEqual(R.refresh_words('The library route of old', 'The library route of old', 'A new title'), 'A new title')

    def test_check_clean(self):
        p = self.run_tool('check', '--base', self.base)
        self.assertRegex(p.stdout, r'record\.py check: FACTS\.md \d+ entries, POSITIONS\.md \d+ entries; 0 failures')
        p = self.run_tool('check', '--base', self.pre, ok=False)
        self.assertIn('record-number.py --verify', p.stderr)

    # ------------------------------------------------------------ add, set and the provenance

    def test_add(self):
        st = self.store()
        top = st.max_used('F')
        last = [e for e in st.files['F'].entries if e.section == 'The ledger'][-1]
        p = self.run_tool('add', 'F', self.line_file('- **A new fact.** It holds.'), '--section', 'The ledger', '--note', 'a test')
        key = 'F-%d' % (top + 1)
        self.assertIn('%s: added' % key, p.stdout)
        st = self.store()
        e = st.live[key]
        self.assertEqual(e.line, '- %s **A new fact.** It holds.' % key)
        self.assertEqual(e.section, 'The ledger')
        self.assertEqual(e.lineno, last.lineno + 1)
        b = self.blocks(key)
        self.assertEqual(len(b), 1)
        self.assertEqual(b[0].kind, 'added')
        self.assertIsNone(b[0].earlier)
        self.assertRegex(b[0].prov, r'^\d{4}-\d\d-\d\d \d\d:\d\dZ · added: a test$')
        self.assertTrue(os.path.exists(self.p.lock))
        # a new P entry under a ### heading
        p = self.run_tool('add', 'P', self.line_file('**A new position.** Held.'), '--section', 'Numbers', '--note', 'a test')
        pkey = re.search(r'(P-\d+): added', p.stdout).group(1)
        self.assertEqual(self.store().live[pkey].section, 'Numbers')
        self.run_tool('check', '--base', self.base)

    def test_add_refused(self):
        before = self.snapshot()
        good = self.line_file('**A new fact.** It holds.')
        for args in (('add', 'F', good, '--section', 'The ledger'),                                   # no provenance
                     ('add', 'F', self.line_file('- F-7 **Numbered.** x'), '--section', 'The ledger', '--note', 'n'),
                     ('add', 'F', self.line_file('**Two.** lines\nof text'), '--section', 'The ledger', '--note', 'n'),
                     ('add', 'F', good, '--section', 'No such section', '--note', 'n'),
                     ('add', 'F', self.line_file('**Points.** See F-9999.'), '--section', 'The ledger', '--note', 'n'),
                     ('add', 'F', self.line_file('**Points.** See F-7, "Nothing like its title".'), '--section', 'The ledger', '--note', 'n'),
                     ('add', 'F', good, '--section', 'The ledger', '--from', '%s#No such heading' % REPORT_REL),
                     ('add', 'F', good, '--section', 'The ledger', '--from', '%s#fix' % REPORT_REL),        # two headings hold it
                     ('add', 'F', good, '--section', 'The ledger', '--note', 'n', '--commit', 'deadbeef1')):
            p = self.run_tool(*args, ok=False)
            self.assertEqual(p.returncode, 1, args)
        self.assertEqual(self.snapshot(), before)

    def test_set_and_provenance(self):
        st = self.store()
        e = st.files['F'].entries[5]
        new = e.line + ' One more sentence.'
        p = self.run_tool('set', e.key, self.line_file(new), '--from', '%s#The question' % REPORT_REL,
                          '--from', 'test-report.md, "The fix"', '--commit', self.base, '--by', 'the tests', '--note', 'why it changed')
        self.assertIn('%s: rewritten' % e.key, p.stdout)
        self.assertEqual(self.store().live[e.key].line, new)
        b = self.blocks(e.key)[-1]
        self.assertEqual(b.kind, 'rewritten')
        self.assertEqual(b.earlier, e.line)
        self.assertRegex(b.prov, r'^\d{4}-\d\d-\d\d \d\d:\d\dZ · rewritten · from `%s`, "The question" · from `%s`, "The fix" · commit `%s` · by the tests: why it changed$' % (
            re.escape(REPORT_REL), re.escape(REPORT_REL), self.base[:9]))
        # the number may be left out of the file, and an unchanged line is refused
        self.run_tool('set', e.key, self.line_file(R.body_of(new) + ' Two.'), '--note', 'n')
        self.assertTrue(self.store().live[e.key].line.endswith('sentence. Two.'))
        self.run_tool('set', e.key, self.line_file(self.store().live[e.key].line), '--note', 'n', ok=False)
        self.run_tool('set', e.key, self.line_file('- F-8 ' + R.body_of(new)), '--note', 'n', ok=False)
        self.run_tool('set', 'F-9999', self.line_file('x'), '--note', 'n', ok=False)
        self.run_tool('check', '--base', self.base)

    def test_move(self):
        st = self.store()
        e = [x for x in st.files['P'].entries if x.section == 'The standard and the sources'][0]
        p = self.run_tool('set', e.key, '--section', 'Numbers', '--note', 'moved for the test')
        self.assertIn('%s: moved to "Numbers"' % e.key, p.stdout)
        st = self.store()
        self.assertEqual(st.live[e.key].section, 'Numbers')
        self.assertEqual([x for x in st.files['P'].entries if x.section == 'Numbers'][-1].key, e.key)
        b = self.blocks(e.key)[-1]
        self.assertEqual(b.kind, 'moved to "Numbers"')
        self.assertEqual(b.earlier, e.line)
        self.run_tool('check', '--base', self.base)

    # ------------------------------------------------------------ pointers: retitle, merge, remove

    def test_retitle_refreshes_pointer_words(self):
        src, target, ptr = self.pointing()
        old_title = target.title
        body = R.body_of(target.line)
        new_line = '- %s **A title written for the test, quite new.** %s' % (target.key, body)
        p = self.run_tool('set', target.key, self.line_file(new_line), '--note', 'retitled')
        st = self.store()
        refreshed = [q for q in R.pointers(st.live[src.key].line) if q.key == target.key and q.words]
        self.assertTrue(refreshed)
        for q in refreshed:
            self.assertTrue(R.words_open(q.words, 'A title written for the test, quite new.'), q.words)
        self.assertNotEqual(st.live[src.key].line, src.line)
        b = self.blocks(target.key)[-1]
        self.assertIn('pointer words refreshed in: ', '\n'.join(b.extra))
        self.assertIn(src.key, b.refreshed())
        self.assertEqual([x.kind for x in self.blocks(src.key)], ['numbered'])      # no block of its own
        self.assertIn('pointer words refreshed in', p.stdout)
        self.run_tool('check', '--base', self.base)
        # the former title still finds the entry
        out = self.fx(old_title[:50]).stdout
        self.assertIn('%s was retitled: its former title' % target.key, out)
        self.assertIn(new_line, out)
        # words written by hand that open no title fail the check
        text = R.read(self.p.files['F']).replace(st.live[src.key].line, st.live[src.key].line + ' See %s, "Words of no title".' % target.key)
        write(self.p.files['F'], text)
        out = self.run_tool('check', ok=False).stdout
        self.assertIn('pointer-words: %s points to %s with "Words of no title"' % (src.key, target.key), out)

    def test_merge(self):
        src, n, ptr = self.pointing()
        st = self.store()
        m = [e for e in st.files['F'].entries if e.key not in (src.key, n.key) and e.section == n.section][0]
        merged = m.line + ' And what %s held.' % n.key.replace('-', ' ')
        p = self.run_tool('merge', n.key, '--into', m.key, self.line_file(merged), '--note', 'one fact')
        self.assertIn('%s: merged into %s' % (n.key, m.key), p.stdout)
        st = self.store()
        self.assertNotIn(n.key, st.live)
        self.assertEqual(st.live[m.key].line, merged)
        moved = [q for q in R.pointers(st.live[src.key].line) if q.key == m.key]
        self.assertTrue(moved)
        self.assertFalse([q for q in R.pointers(st.live[src.key].line) if q.key == n.key])
        for q in moved:
            if q.words:
                self.assertTrue(R.words_open(q.words, st.live[m.key].title), q.words)
        bn, bm = self.blocks(n.key)[-1], self.blocks(m.key)[-1]
        self.assertEqual(bn.kind, 'merged into %s' % m.key)
        self.assertEqual(bn.earlier, n.line)
        self.assertIn(src.key, bn.refreshed())
        self.assertEqual(bm.kind, '%s merged in, rewritten' % n.key)
        self.run_tool('check', '--base', self.base)
        out = self.fx(n.title[:50]).stdout
        self.assertIn('was merged into %s' % m.key, out)
        out = self.fx(n.key).stdout
        self.assertIn('merged into %s' % m.key, out)

    def test_remove(self):
        src, target, ptr = self.pointing()
        p = self.run_tool('remove', target.key, '--note', 'gone', ok=False)
        self.assertIn('%s points to %s' % (src.key, target.key), p.stderr)
        st = self.store()
        pointed = {q.key for e in st.entries() for q in R.pointers(e.line)}
        lone = [e for e in st.files['F'].entries if e.key not in pointed][0]
        self.run_tool('remove', lone.key, '--note', 'gone for the test')
        st = self.store()
        self.assertNotIn(lone.key, st.live)
        b = self.blocks(lone.key)[-1]
        self.assertEqual(b.kind, 'removed')
        self.assertEqual(b.earlier, lone.line)
        self.run_tool('check', '--base', self.base)
        self.assertIn('no entry %s in FACTS.md (FACTS-history.md: removed)' % lone.key, self.fx(lone.key).stdout)

    # ------------------------------------------------------------ apply

    def apply_text(self, st):
        e = st.files['F'].entries[10]
        pointed = {q.key for x in st.entries() for q in R.pointers(x.line)}
        lone = [x for x in st.files['F'].entries if x.key not in pointed and x.key != e.key][-1]
        text = '\n'.join([
            '<!-- a chunk for the test -->',
            '## The ledger',
            '- F-?1 **A first new fact.** It builds on F-?2, "A second new fact".',
            '  from: %s, "The question"; note: new' % REPORT_REL,
            '- F-?2 **A second new fact.** Alone.',
            '## ' + e.section,
            e.line + ' Rewritten in the chunk.',
            '  commit: %s; note: the chunk\'s own words' % self.base,
            'remove %s' % lone.key,
            '  note: evicted',
            ''])
        return text, e, lone

    def test_apply(self):
        st = self.store()
        top = st.max_used('F')
        text, e, lone = self.apply_text(st)
        path = self.line_file(text)
        p = self.run_tool('apply', path, '--by', 'consolidation chunk 0', '--note', 'chunk zero')
        a, b = 'F-%d' % (top + 1), 'F-%d' % (top + 2)
        st = self.store()
        self.assertEqual(st.live[a].line, '- %s **A first new fact.** It builds on %s, "A second new fact".' % (a, b))
        self.assertEqual(st.live[b].section, 'The ledger')
        self.assertEqual(st.live[e.key].line, e.line + ' Rewritten in the chunk.')
        self.assertNotIn(lone.key, st.live)
        self.assertRegex(self.blocks(a)[-1].prov, r' · added · from `%s`, "The question" · by consolidation chunk 0: new$' % re.escape(REPORT_REL))
        self.assertRegex(self.blocks(e.key)[-1].prov, r' · rewritten · commit `%s` · by consolidation chunk 0: the chunk\'s own words$' % self.base[:9])
        self.assertEqual(self.blocks(lone.key)[-1].kind, 'removed')
        self.assertIn('%s: added' % a, p.stdout)
        self.run_tool('check', '--base', self.base)
        out = self.fx(a + '+').stdout
        self.assertIn('%s points to it' % a, out)
        self.assertIn('**A second new fact.**', out)

    def test_apply_all_or_none(self):
        st = self.store()
        before = self.snapshot()
        text, e, lone = self.apply_text(st)
        for bad in (text + '- F-7 **Points nowhere.** See F-9999.\n',
                    text.replace('## The ledger\n', ''),                     # new entries under no heading
                    text + 'merge %s into %s\n' % (lone.key, e.key),         # lone is removed and merged
                    text + 'something that is no line of an apply file\n',
                    text.replace('  note: evicted', '  note: evicted\n  note: twice'),
                    text.replace("; note: the chunk's own words", '')):     # a commit alone is no provenance
            p = self.run_tool('apply', self.line_file(bad), ok=False)
            self.assertEqual(p.returncode, 1, bad)
            self.assertEqual(self.snapshot(), before)

    def test_apply_headings(self):
        st = self.store()
        sub = [x for x in st.files['P'].entries if x.section == 'Numbers'][0]
        other = [x for x in st.files['P'].entries if x.section == 'Arrays and the model program'][0]
        before = self.snapshot()
        text = '\n'.join(['## Decisions on record', sub.line + ' Kept in place.', '### Numbers', other.line + ' Moved.', ''])
        p = self.run_tool('apply', self.line_file(text), '--note', 'headings', ok=False)
        self.assertIn('%s stands under "Arrays and the model program", not "Numbers"' % other.key, p.stderr)
        self.assertEqual(self.snapshot(), before)
        text = '\n'.join(['## Decisions on record', sub.line + ' Kept in place.', '', other.line + ' Moved.',
                          'move %s to ### Numbers' % other.key, ''])
        p = self.run_tool('apply', self.line_file(text), '--note', 'headings')
        st = self.store()
        self.assertEqual(st.live[sub.key].section, 'Numbers')
        self.assertEqual(st.live[other.key].section, 'Numbers')
        self.assertIn('%s: moved to "Numbers", rewritten' % other.key, p.stdout)
        self.assertIn('%s: rewritten' % sub.key, p.stdout)
        # an apply file of lines unchanged changes nothing
        self.run_tool('apply', self.line_file(st.live[sub.key].line), '--note', 'n', ok=False)

    def test_apply_merge(self):
        src, n, ptr = self.pointing()
        st = self.store()
        m = [e for e in st.files['F'].entries if e.key not in (src.key, n.key)][-1]
        text = '\n'.join([m.line + ' Merged.', 'merge %s into %s' % (n.key, m.key), '  note: one fact', ''])
        self.run_tool('apply', self.line_file(text), '--by', 'chunk')
        st = self.store()
        self.assertEqual(st.live[m.key].line, m.line + ' Merged.')
        self.assertEqual(self.blocks(m.key)[-1].kind, '%s merged in, rewritten' % n.key)
        self.assertTrue(self.blocks(m.key)[-1].prov.endswith('by chunk: one fact'))
        self.run_tool('check', '--base', self.base)

    # ------------------------------------------------------------ check

    def test_check_failures(self):
        st = self.store()
        lines = R.read(self.p.files['F']).split('\n')
        e1, e2, e3 = st.files['F'].entries[1], st.files['F'].entries[2], st.files['F'].entries[3]
        lines[e1.lineno - 1] = e1.line + ' A hand edit.'
        lines[e2.lineno - 1] = '- ' + R.body_of(e2.line)                       # its number gone
        lines.insert(e3.lineno, 'a line that continues the entry above')
        lines.insert(e3.lineno, e3.line.replace(e3.key, 'F-9000', 1) + ' See F-9999.')   # no history, no target
        lines.insert(e3.lineno, e3.line)                                         # a number on two lines
        write(self.p.files['F'], '\n'.join(lines))
        out = self.run_tool('check', '--base', self.base, ok=False).stdout
        rules = set(re.findall(r'(?m)^\S+: ([a-z-]+): ', out))
        self.assertEqual(rules, {'form', 'one-line', 'number', 'history', 'pointer', 'base-line'}, out)
        self.assertIn('%s at %s is not its line now' % (e1.key, self.base), out)
        self.assertIn('%s at %s is not its line now' % (e2.key, self.base), out)
        self.assertIn('F-9000 points to F-9999', out)
        # a history block whose entry vanished without merged into or removed
        write(self.p.files['F'], '\n'.join(x for x in R.read(self.p.files['F']).split('\n') if not x.startswith('- F-9000 ')))
        st = self.store()
        lines = R.read(self.p.files['F']).split('\n')
        gone = st.files['F'].entries[-1]
        del lines[gone.lineno - 1]
        write(self.p.files['F'], '\n'.join(lines))
        out = self.run_tool('check', ok=False).stdout
        self.assertIn('%s is in no line of FACTS.md' % gone.key, out)

    # ------------------------------------------------------------ facts-extract

    def test_facts_extract(self):
        src, target, ptr = self.pointing()
        out = self.fx(target.key).stdout
        self.assertIn('FACTS.md:%d\n%s' % (target.lineno, target.line), out)
        out = self.fx(src.key + '+').stdout
        self.assertIn(src.line, out)
        self.assertIn(target.line, out)
        self.assertIn('; %s points to it' % src.key, out)
        out = self.fx(target.key + '+').stdout
        self.assertIn('; it points to %s' % target.key, out)
        out = self.fx('history:' + target.key).stdout
        self.assertIn('### %s\n\n' % target.key, out)
        self.assertIn(' · numbered · commit ', out)
        p = self.fx('--check', 'F-9999', 'history:F-9999', target.key, 'positions:' + self.store().files['P'].entries[0].title[:30])
        self.assertEqual(p.returncode, 1)
        self.assertIn('NOT FOUND: no entry F-9999', p.stdout)
        self.assertIn('NOT FOUND: no block ### F-9999', p.stdout)
        # a title query sees past the number, and takes words cut with an ellipsis
        out = self.fx('--check', target.title[:40], ' '.join(target.title.split()[:4]) + ' ...').stdout
        self.assertEqual(len(re.findall(r'FACTS\.md:%d\b' % target.lineno, out)), 2, out)
        # positions: falls back to a former title too
        pe = self.store().files['P'].entries[0]
        self.run_tool('set', pe.key, self.line_file('- %s **Retitled for the test.** %s' % (pe.key, R.body_of(pe.line))), '--note', 'n')
        out = self.fx('positions:' + pe.title[:40]).stdout
        self.assertIn('%s was retitled' % pe.key, out)


if __name__ == '__main__':
    unittest.main()
