#!/usr/bin/env python3
"""Tests of ledger.py and of facts-extract.py's ledger queries, over a temporary
copy of the gap ledger as it stands at HEAD; the ledger itself is not touched.

usage: python3 explorations/coordinator/tools/test_ledger.py [-v]
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
LEDGER_PY = os.path.join(TOOLS, 'ledger.py')
FACTS_EXTRACT = os.path.join(TOOLS, 'facts-extract.py')
LEDGER_REL = 'explorations/fortress-gap-ledger.md'

sys.path.insert(0, TOOLS)
import ledger  # noqa: E402

BASE_COMMIT = '052a7c3febb9473d053acd4de16a779bbab51412'   # a commit in HEAD's history, for closes
GOOD = ('| ? | a nested subscript `x[i][j]` fails under walk (made up for this test) | NEGATIVE-VERIFIED | '
        'implementation gap (walk) | `basic/operators/precedence.tex`, "Operator Precedence and Associativity" | '
        '`ProjectFortress/tests/XXXAsExpr.fss` | test_ledger.py | none |')


# A section of legacy shapes the ledger held before its rework, appended to the copy by legacy():
# a table of seven columns whose notes are titled "why unsettled", and a row whose cells hold bare pipes.
LEGACY_SECTION = """
## 99. Legacy shapes (made up for this test)

| # | claim | status | class | reproducer | found by | why unsettled |
|---|---|---|---|---|---|---|
| {a} | a legacy row of seven cells (made up for this test) | CONTESTED | implementation gap (walk) | none | test_ledger.py | no reading settles it |

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| {b} | `opr ||(` written with bare pipes (made up for this test) | NEGATIVE-VERIFIED | implementation gap (walk) | silent | none | test_ledger.py | `a||b` |
"""


def failed_rules(out):
    """The rules named by check's failure lines, which read 'WHERE: RULE: DETAIL'."""
    return {m.group(1) for m in re.finditer(r'(?m)^(?:row \S+ \(line \d+\)|\S+): ([a-z-]+): ', out)}


def git(*args):
    return subprocess.run(['git', '-C', TREE] + list(args), capture_output=True, text=True, check=True).stdout


class LedgerTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base = git('rev-parse', 'HEAD').strip()
        cls.text = git('show', '%s:%s' % (cls.base, LEDGER_REL))
        secs = ledger.Ledger(LEDGER_REL, cls.text).row_sections
        cls.first = secs[0].title                              # "1. Syntax: ...", and its title without the number
        cls.first_bare = re.sub(r'^\d+\.\s*', '', cls.first)
        cls.last = secs[-1].title

    def setUp(self):
        self.dir = tempfile.mkdtemp(prefix='test-ledger-')
        self.addCleanup(shutil.rmtree, self.dir)
        os.makedirs(os.path.join(self.dir, 'explorations', 'coordinator'))
        self.path = os.path.join(self.dir, LEDGER_REL)
        self.history = os.path.join(self.dir, 'explorations', 'fortress-gap-ledger-history.md')
        with open(self.path, 'w', encoding='utf-8') as f:
            f.write(self.text)

    def run_tool(self, *args, ok=True):
        p = subprocess.run([sys.executable, LEDGER_PY] + list(args) + ['--ledger', self.path],
                           capture_output=True, text=True)
        self.assertNotIn('Traceback', p.stderr)
        if ok is not None:
            self.assertEqual(p.returncode == 0, ok, 'ledger.py %s: %s%s' % (' '.join(args), p.stdout[-2000:], p.stderr))
        return p

    def read(self):
        with open(self.path, encoding='utf-8') as f:
            return f.read()

    def write(self, text):
        with open(self.path, 'w', encoding='utf-8') as f:
            f.write(text)

    def row_file(self, line):
        path = os.path.join(self.dir, 'row-%d.md' % len(os.listdir(self.dir)))
        with open(path, 'w', encoding='utf-8') as f:
            f.write(line + '\n')
        return path

    def add(self, line=GOOD, section=None):
        p = self.run_tool('add', self.row_file(line), '--section', section or self.first_bare)
        return int(re.match(r'row (\d+)', p.stdout).group(1))

    def set_row(self, n, **cells):
        """A fixture: row n's line in the copy with the named template cells replaced, and no history written."""
        led = ledger.Ledger(self.path)
        r = led.one(n)
        c = r.template_cells()
        for name, value in cells.items():
            c[ledger.CELLS.index(name)] = value
        led.lines[r.lineno - 1] = ledger.join_cells(c)
        self.write(led.text())
        return led.lines[r.lineno - 1]

    def history_text(self):
        with open(self.history, encoding='utf-8') as f:
            return f.read()

    def legacy(self):
        """The copy with LEGACY_SECTION appended; the numbers of its two rows."""
        top = max(r.num for r in ledger.Ledger(self.path).rows)
        self.write(self.read().rstrip('\n') + '\n' + LEGACY_SECTION.format(a=top + 1, b=top + 2))
        return top + 1, top + 2

    # ------------------------------------------------------------ reading today's ledger

    def test_parse(self):
        led = ledger.Ledger(self.path)
        nums = [r.num for r in led.rows]
        self.assertEqual(len(nums), len(set(nums)))
        self.assertEqual(set(nums), set(range(1, max(nums) + 1)) - ledger.VACANT)
        for r in led.rows:
            self.assertEqual(len(r.cells), len(r.table.titles), r.num)
        a, b = self.legacy()
        led = ledger.Ledger(self.path)
        ra = led.one(a)
        self.assertEqual(ra.status, 'CONTESTED')
        self.assertEqual(len(ra.cells), 7)
        self.assertEqual(ra.spec, '')
        self.assertEqual(ra.notes, 'no reading settles it')
        rb = led.one(b)
        self.assertEqual(rb.split, 'lenient')
        self.assertEqual(len(rb.cells), 8)
        self.assertEqual(rb.status_word, 'NEGATIVE-VERIFIED')
        self.assertGreater(len(ledger.split_cells(rb.line)), 8)

    def test_strict_split(self):
        self.assertEqual(ledger.split_cells(r'| 1 | a \| b | c |'), ['1', r'a \| b', 'c'])
        self.assertEqual(ledger.split_cells('| 1 | `opr ||(` | c |'), ['1', '`opr', '', '(`', 'c'])

    def test_check_today(self):
        led = ledger.Ledger(self.path)
        today = ledger.Linter(TREE, {r.num for r in led.rows}).lint_ledger(led)
        p = self.run_tool('check', ok=None)
        self.assertEqual(p.returncode, 1 if today else 0)
        a, b = self.legacy()
        p = self.run_tool('check', ok=False)
        out = p.stdout
        self.assertRegex(out, r'row %d \(line \d+\): cells: 7 cells' % a)
        self.assertRegex(out, r'header: the table at line \d+ \(## 99. Legacy shapes \(made up for this test\)\) has 7 columns')
        pipes = sorted(int(n) for n in re.findall(r'^row (\d+) \(line \d+\): pipe:', out, re.M))
        self.assertEqual(pipes, [b])
        summary = out.strip().split('\n')[-1]
        self.assertTrue(summary.startswith('ledger.py check: fortress-gap-ledger.md, %d rows' % len(ledger.Ledger(self.path).rows)))
        s = self.run_tool('check', '--summary', ok=False).stdout.strip()
        self.assertEqual(s, summary)

    def test_heads_sections(self):
        heads = self.run_tool('heads').stdout.strip().split('\n')
        led = ledger.Ledger(self.path)
        self.assertEqual(len(heads), len(led.rows))
        for h in heads:
            self.assertEqual(len(h.split('\t')), 5, h[:100])
        first = heads[0].split('\t')
        self.assertEqual(int(first[0]), led.rows[0].num)
        self.assertLessEqual(len(first[3]), ledger.HEAD_CLAIM + 2)
        secs = [ln.split('\t') for ln in self.run_tool('sections').stdout.strip().split('\n')]
        self.assertEqual(sum(int(n) for n, t in secs), len(led.rows))
        self.assertIn(self.first, [t for n, t in secs])
        one = self.run_tool('section', self.first_bare).stdout.strip().split('\n')
        self.assertEqual(len(one), dict((t, int(n)) for n, t in secs)[self.first])

    def test_show_find_count(self):
        n = self.add()
        a, b = self.legacy()
        p = self.run_tool('show', str(a))
        self.assertIn('| %d |' % a, p.stdout)
        self.assertIn('why unsettled', p.stdout)
        p = self.run_tool('show', str(a), '--short')
        self.assertTrue(p.stdout.startswith('%d | CONTESTED |' % a))
        self.run_tool('show', '148', ok=False)
        p = self.run_tool('find', 'nested', 'subscript', '--cites', 'XXXAsExpr.fss')
        self.assertRegex(p.stdout, r'(?m)^%d \| ' % n)
        self.assertIn('cites ProjectFortress/tests/XXXAsExpr.fss', p.stdout)
        allrows = self.run_tool('find', 'the', '--all').stdout.count('\n')
        opened = self.run_tool('find', 'the', '--all', '--open').stdout.count('\n')
        self.assertLess(opened, allrows)
        self.assertIn('more rows', self.run_tool('find', 'the').stdout)
        self.run_tool('find', 'zzqqxx-no-such-word', ok=False)
        p = self.run_tool('count')
        self.assertIn('rows %d' % len(ledger.Ledger(self.path).rows), p.stdout)

    # ------------------------------------------------------------ writing

    def test_add(self):
        before = ledger.Ledger(self.path)
        top = max(r.num for r in before.rows)
        n = self.add()
        self.assertEqual(n, top + 1)
        led = ledger.Ledger(self.path)
        r = led.one(n)
        self.assertEqual(r.section, self.first)
        sec = led.section(self.first_bare)
        self.assertIs(sec.rows[-1], r)
        self.assertEqual(r.lineno, before.section(self.first_bare).rows[-1].lineno + 1)
        self.assertEqual(ledger.Linter(TREE, {x.num for x in led.rows}).lint(r), [])
        self.assertEqual(len(self.read().split('\n')), len(self.text.split('\n')) + 1)
        self.assertEqual(self.add(section=self.last), top + 2)
        self.assertTrue(os.path.exists(os.path.join(self.dir, 'explorations', '.ledger.lock')))
        self.assertFalse(os.path.exists(self.history))

    def test_add_refused(self):
        text = self.read()
        for bad, rule in ((GOOD.replace('NEGATIVE-VERIFIED', 'NEGATIVE-VERIFIED + POSITIVE-VERIFIED'), 'status'),
                          (GOOD.replace('implementation gap (walk)', 'implementation gap'), 'class'),
                          (GOOD.replace('(made up', 'with `a || b` (made up'), None),
                          (GOOD.replace('`basic/operators/precedence.tex`', '`basic/operators/precedence.tex:26`'), 'spec-line'),
                          (GOOD.replace('"Operator Precedence and Associativity"', '"No Such Heading"'), 'spec-section'),
                          (GOOD.replace('XXXAsExpr.fss', 'NoSuchTest.fss'), 'reproducer-path'),
                          (GOOD.replace('| none |', '| %s |' % ('x' * 701)), 'notes-length'),
                          (GOOD.replace('| ? |', '| 7 |'), None)):
            p = self.run_tool('add', self.row_file(bad), '--section', self.first_bare, ok=False)
            self.assertEqual(p.returncode, 1, bad)
            if rule:
                self.assertIn('  %s: ' % rule, p.stderr)
        self.run_tool('add', self.row_file(GOOD), '--section', 'No such section', ok=False)
        self.assertEqual(self.read(), text)

    def test_note(self):
        n = self.add()
        old = ledger.Ledger(self.path).one(n).line
        self.run_tool('note', str(n), 'Seen again with `a | b`.')
        r = ledger.Ledger(self.path).one(n)
        self.assertTrue(r.notes.endswith(r'Seen again with `a \| b`.'))
        self.assertEqual(r.split, 'strict')
        with open(self.history, encoding='utf-8') as f:
            hist = f.read()
        self.assertIn('### Row %d\n\nnote added\n\n%s\n' % (n, old), hist)
        self.run_tool('note', str(n), 'x' * 700, ok=False)

    def test_duplicate(self):
        a = self.add()
        b = self.add(GOOD.replace('(made up for this test)', '(made up again)'))
        old_a, old_b = ledger.Ledger(self.path).one(a).line, ledger.Ledger(self.path).one(b).line
        self.run_tool('duplicate', str(b), '--of', str(a), '--add', 'Also met as row %d.' % b)
        led = ledger.Ledger(self.path)
        rb, ra = led.one(b), led.one(a)
        self.assertEqual(rb.status, 'DUPLICATE')
        self.assertEqual(rb.notes, 'duplicate of row %d; full text: history, row %d' % (a, b))
        self.assertTrue(ra.notes.endswith('Also met as row %d.' % b))
        with open(self.history, encoding='utf-8') as f:
            hist = f.read()
        self.assertIn(old_a, hist)
        self.assertIn(old_b, hist)
        self.run_tool('duplicate', str(b), '--of', str(a), ok=False)            # already a duplicate
        self.run_tool('duplicate', str(a), '--of', str(b), ok=False)            # pointing at a duplicate
        self.run_tool('note', str(b), 'closed rows are not edited', ok=False)
        # a legacy row becomes a pointer when the cells it lacks are given
        old, _ = self.legacy()
        self.run_tool('duplicate', str(old), '--of', str(a), ok=False)
        self.run_tool('duplicate', str(old), '--of', str(a), '--spec', 'silent')
        self.assertEqual(ledger.Ledger(self.path).one(old).status, 'DUPLICATE')

    def test_close(self):
        n = self.add()
        old = ledger.Ledger(self.path).one(n).line
        base = BASE_COMMIT
        self.run_tool('close', str(n), '--commit', 'deadbeef1', '--test', 'XXXAsExpr.fss', ok=False)
        self.run_tool('close', str(n), '--commit', base, '--test', 'NoSuchTest', ok=False)
        self.run_tool('close', '83', '--commit', base, '--test', 'XXXAsExpr.fss', ok=False)   # CONTESTED
        self.run_tool('close', str(n), '--commit', base, '--test', 'XXXAsExpr.fss')
        r = ledger.Ledger(self.path).one(n)
        self.assertEqual(r.status, 'FIXED')
        self.assertEqual(r.reproducer, '`ProjectFortress/tests/XXXAsExpr.fss`')
        self.assertEqual(r.notes, 'fixed `%s`; full text: history, row %d' % (base[:9], n))
        with open(self.history, encoding='utf-8') as f:
            self.assertIn('### Row %d\n\nclosed by %s\n\n%s\n' % (n, base[:9], old), f.read())
        self.run_tool('close', str(n), '--commit', base, '--test', 'XXXAsExpr.fss', ok=False)   # already closed

    def test_check_rows(self):
        good = os.path.join(self.dir, 'rows.md')
        with open(good, 'w', encoding='utf-8') as f:
            f.write(GOOD.replace('| ? |', '| 1 |') + '\n\n' + GOOD.replace('| ? |', '| 2 |') + '\n')
        self.run_tool('check', '--rows', good)
        with open(good, 'a', encoding='utf-8') as f:
            f.write(GOOD.replace('| ? |', '| 2 |').replace('| NEGATIVE-VERIFIED |', '| FIXED (soon) |') + '\nprose\n')
        out = self.run_tool('check', '--rows', good, ok=False).stdout
        self.assertIn(': status: ', out)
        self.assertIn('not-a-row', out)
        self.assertIn('row 2 is on 2 lines', out)

    def test_check_base(self):
        self.run_tool('check', '--base', self.base, '--summary', ok=None)      # the template's failures, if any, are the ledger's own
        base_out = self.run_tool('check', '--base', self.base, ok=None).stdout
        self.assertFalse({'base-line', 'base-numbers'} & failed_rules(base_out))
        led = ledger.Ledger(self.path)
        lines = led.lines
        r5, r6, r7 = led.one(5), led.one(6), led.one(7)
        # row 5 rewritten with its earlier line in the history; row 6 moved to section 16 unchanged
        lines[r5.lineno - 1] = GOOD.replace('| ? |', '| 5 |')
        target = led.section('Syntax extension')
        last = target.rows[-1]
        lines.insert(last.lineno, r6.line)
        del lines[r6.lineno - 1]
        self.write('\n'.join(lines))
        ledger.append_history(self.history, [(5, 'rewritten to the template', r5.line)])
        out = self.run_tool('check', '--base', self.base, ok=False).stdout
        self.assertFalse({'base-line', 'base-numbers'} & failed_rules(out))
        self.assertEqual(ledger.Ledger(self.path).one(6).section, target.title)
        # row 7 changed with no history; row 8 gone
        led = ledger.Ledger(self.path)
        lines = led.lines
        lines[led.one(7).lineno - 1] = r7.line.replace('|', '| changed', 2).replace('| changed', '|', 1)
        del lines[led.one(8).lineno - 1]
        self.write('\n'.join(lines))
        out = self.run_tool('check', '--base', self.base, ok=False).stdout
        self.assertRegex(out, r'base-line: row 7 at ')
        self.assertRegex(out, r'base-line: row 8 at ')
        self.assertIn('base-numbers: the row numbers differ from %s: gone 8; new none' % self.base, out)

    # ------------------------------------------------------------ rewrite

    def test_rewrite(self):
        n = self.add()
        old = ledger.Ledger(self.path).one(n).line
        new = GOOD.replace('| ? |', '| %d |' % n).replace('(made up for this test)', 'and so does `x[i]^2` (made up for this test)')
        p = self.run_tool('rewrite', str(n), self.row_file(new))
        self.assertIn('row %d: rewritten' % n, p.stdout)
        r = ledger.Ledger(self.path).one(n)
        self.assertEqual(r.line, new)
        self.assertIn('### Row %d\n\nrewritten\n\n%s\n' % (n, old), self.history_text())
        # the # cell may be ?; the line keeps its place, and each earlier line goes to the history
        newer = GOOD.replace('fails under walk', 'fails under walk and compiled')
        self.run_tool('rewrite', str(n), self.row_file(newer))
        r2 = ledger.Ledger(self.path).one(n)
        self.assertEqual(r2.line, newer.replace('| ? |', '| %d |' % n))
        self.assertEqual(r2.lineno, r.lineno)
        self.assertIn('### Row %d\n\nrewritten\n\n%s\n' % (n, new), self.history_text())
        out = self.run_tool('check', '--base', self.base, ok=None).stdout      # the added row is new: base-numbers only
        self.assertNotIn('base-line', failed_rules(out))
        # refused, and nothing written
        text, hist = self.read(), self.history_text()
        for bad, says in ((GOOD.replace('| ? |', '| %d |' % (n - 1)), 'row %d' % (n - 1)),
                          (GOOD.replace('NEGATIVE-VERIFIED', 'NEGATIVE-VERIFIED + POSITIVE-VERIFIED'), '  status: '),
                          (GOOD.replace('XXXAsExpr.fss', 'NoSuchTest.fss'), '  reproducer-path: '),
                          (GOOD.replace('| NEGATIVE-VERIFIED |', '| FIXED |').replace('| none |', '| fixed `%s` |' % BASE_COMMIT[:9]), 'close'),
                          (GOOD.replace('| NEGATIVE-VERIFIED |', '| DUPLICATE |').replace('| none |', '| duplicate of row 5 |'), 'duplicate'),
                          (r2.line, 'already'),
                          (GOOD + '\n' + GOOD, 'one row line')):
            p = self.run_tool('rewrite', str(n), self.row_file(bad), ok=False)
            self.assertIn(says, p.stderr)
        self.run_tool('rewrite', '99999', self.row_file(GOOD), ok=False)
        self.assertEqual(self.read(), text)
        self.assertEqual(self.history_text(), hist)

    def test_rewrite_closed(self):
        n = self.add()
        self.run_tool('close', str(n), '--commit', BASE_COMMIT, '--test', 'XXXAsExpr.fss')
        fixed = ledger.Ledger(self.path).one(n).line.replace('fails under walk', 'failed under walk')
        self.run_tool('rewrite', str(n), self.row_file(fixed))
        self.assertEqual(ledger.Ledger(self.path).one(n).line, fixed)
        p = self.run_tool('rewrite', str(n), self.row_file(GOOD), ok=False)          # a closed row is not reopened
        self.assertIn('stays FIXED', p.stderr)
        p = self.run_tool('rewrite', str(n), self.row_file(fixed.replace(BASE_COMMIT[:9], 'deadbeef1')), ok=False)
        self.assertIn('deadbeef1', p.stderr)                                         # its commit is checked
        m = self.add()
        self.run_tool('duplicate', str(m), '--of', str(n))
        dup = ledger.Ledger(self.path).one(m).line
        self.run_tool('rewrite', str(m), self.row_file(dup.replace('(made up for this test)', '(made up)')))
        self.assertEqual(ledger.Ledger(self.path).one(m).status, 'DUPLICATE')

    # ------------------------------------------------------------ close: a settled question, a test outside the test folders

    def test_close_contested(self):
        n = self.add(GOOD.replace('| NEGATIVE-VERIFIED |', '| CONTESTED |'))
        p = self.run_tool('close', str(n), '--commit', BASE_COMMIT, '--test', 'XXXAsExpr.fss', ok=False)
        self.assertIn('--settled', p.stderr)
        self.run_tool('close', str(n), '--commit', BASE_COMMIT, '--test', 'XXXAsExpr.fss', '--settled', "the curator's answer to Q1",
                      '--note', 'climb batch 1 rung A')
        r = ledger.Ledger(self.path).one(n)
        self.assertEqual(r.status, 'FIXED')
        self.assertEqual(r.notes, "fixed `%s`; settled by the curator's answer to Q1; climb batch 1 rung A; full text: history, row %d" % (BASE_COMMIT[:9], n))
        m = self.add()
        p = self.run_tool('close', str(m), '--commit', BASE_COMMIT, '--test', 'XXXAsExpr.fss', '--settled', 'P-1', ok=False)
        self.assertIn('CONTESTED', p.stderr)
        k = self.add(GOOD.replace('| NEGATIVE-VERIFIED | implementation gap (walk) |', '| RETIRED | — |'))
        self.run_tool('close', str(k), '--commit', BASE_COMMIT, '--test', 'XXXAsExpr.fss', '--settled', 'P-1', ok=False)

    def test_close_test_outside_the_test_folders(self):
        n = self.add()
        for bad in ('explorations/coordinator/tools/no_such_test.py', 'explorations/coordinator/FACTS.md', 'NoSuchTest'):
            self.run_tool('close', str(n), '--commit', BASE_COMMIT, '--test', bad, ok=False)
        self.run_tool('close', str(n), '--commit', BASE_COMMIT, '--test', 'explorations/coordinator/tools/test_ledger.py')
        r = ledger.Ledger(self.path).one(n)
        self.assertEqual((r.status, r.reproducer), ('FIXED', '`explorations/coordinator/tools/test_ledger.py`'))
        m = self.add()
        p = self.run_tool('close', str(m), '--commit', BASE_COMMIT, '--test', 'none', ok=False)
        self.assertIn('--note', p.stderr)
        self.run_tool('close', str(m), '--commit', BASE_COMMIT, '--test', 'none', '--note', 'a change of prose, which no test reads')
        r = ledger.Ledger(self.path).one(m)
        self.assertEqual((r.status, r.reproducer), ('FIXED', 'none'))
        self.assertEqual(r.notes, 'fixed `%s`; a change of prose, which no test reads; full text: history, row %d' % (BASE_COMMIT[:9], m))

    # ------------------------------------------------------------ note: before the marker, its own cells

    def test_note_before_the_marker(self):
        n = self.add()
        mark = 'full text: history, row %d' % n
        self.set_row(n, notes='Seen first. ' + mark)
        self.run_tool('note', str(n), 'Seen again.')
        self.assertEqual(ledger.Ledger(self.path).one(n).notes, 'Seen first. Seen again. ' + mark)
        self.run_tool('note', str(n), 'and seen once more')
        self.assertEqual(ledger.Ledger(self.path).one(n).notes, 'Seen first. Seen again. and seen once more; ' + mark)
        self.set_row(n, notes='A. %s B.' % mark)                       # text after the marker stays after it
        self.run_tool('note', str(n), 'C.')
        self.assertEqual(ledger.Ledger(self.path).one(n).notes, 'A. C. %s B.' % mark)
        self.set_row(n, notes='As row 5 says (full text: history, row 5).')   # another row's marker is not this row's
        self.run_tool('note', str(n), 'D.')
        self.assertEqual(ledger.Ledger(self.path).one(n).notes, 'As row 5 says (full text: history, row 5). D.')
        self.set_row(n, notes='none')                                   # a note replaces notes of none
        self.run_tool('note', str(n), 'E.')
        self.assertEqual(ledger.Ledger(self.path).one(n).notes, 'E.')

    def test_note_lints_only_its_cells(self):
        n = self.add()
        self.set_row(n, spec='`basic/no-such-chapter.tex`, "Nothing"')
        self.assertIn('spec-path', failed_rules(self.run_tool('check', ok=False).stdout))
        self.run_tool('note', str(n), 'A note beside a spec cell that fails.')
        r = ledger.Ledger(self.path).one(n)
        self.assertTrue(r.notes.endswith('A note beside a spec cell that fails.'))
        self.assertEqual(r.spec, '`basic/no-such-chapter.tex`, "Nothing"')
        p = self.run_tool('note', str(n), 'x' * 700, ok=False)                 # the cells it changes are still checked
        self.assertIn('  notes-length: ', p.stderr)
        self.set_row(n, spec='z' * 400, notes='n' * 600)
        p = self.run_tool('note', str(n), 'w' * 60, ok=False)
        self.assertIn('  row-length: ', p.stderr)
        self.assertNotIn('  spec', p.stderr)
        a, b = self.legacy()                                                  # a legacy row keeps its own shape
        self.run_tool('note', str(a), 'Read again.')
        r = ledger.Ledger(self.path).one(a)
        self.assertEqual((len(r.cells), r.notes), (7, 'no reading settles it Read again.'))
        self.run_tool('note', str(b), 'Read again.')
        self.assertEqual(ledger.Ledger(self.path).one(b).split, 'lenient')

    # ------------------------------------------------------------ landing-check

    def clean_copy(self):
        """The copy with each row that fails the template replaced by GOOD under its number, its line in the history."""
        led = ledger.Ledger(self.path)
        lint = ledger.Linter(TREE, {r.num for r in led.rows})
        gone = []
        for r in led.rows:
            if lint.lint(r):
                gone.append((r.num, 'rewritten', r.line))
                led.lines[r.lineno - 1] = GOOD.replace('| ? |', '| %d |' % r.num)
        self.write(led.text())
        if gone:
            ledger.append_history(self.history, gone)

    def test_landing_check_template(self):
        self.clean_copy()
        p = self.run_tool('landing-check', self.base)                         # HEAD..HEAD: no commit, no diff
        self.assertIn('no finding', p.stdout)
        self.set_row(5, spec='`basic/no-such-chapter.tex`, "Nothing"')        # no history written: base-line too
        out = self.run_tool('landing-check', self.base, ok=False).stdout
        self.assertRegex(out, r'(?m)^template: row 5 \(line \d+\): spec-path: ')
        self.assertRegex(out, r'(?m)^template: \S+: base-line: row 5 at ')
        self.assertRegex(out, r'(?m)^ledger.py landing-check: %s\.\.HEAD: 2 findings' % self.base[:9])

    def test_landing_check_batch_12(self):
        """Climb batch 12's landing, 7fa767d48..3a84269f7, on the ledger and history as it left them: rung C (054c4bcfd)
        promoted the XXX test of row 642 and said the row was repaired, and the row stayed open."""
        base, end = '7fa767d48', '3a84269f7'
        self.write(git('show', '%s:%s' % (end, LEDGER_REL)))
        with open(self.history, 'w', encoding='utf-8') as f:
            f.write(git('show', '%s:explorations/fortress-gap-ledger-history.md' % end))
        facts = os.path.join(self.dir, 'FACTS.md')
        facts_text = git('show', '%s:explorations/coordinator/FACTS.md' % end)
        with open(facts, 'w', encoding='utf-8') as f:
            f.write(facts_text)
        positions = os.path.join(self.dir, 'POSITIONS.md')
        with open(positions, 'w', encoding='utf-8') as f:
            f.write(git('show', '%s:explorations/coordinator/POSITIONS.md' % end))
        args = ('landing-check', base, '--head', end, '--facts', facts, '--positions', positions)
        out = self.run_tool(*args, ok=False).stdout
        self.assertRegex(out, r'(?m)^xxx-gone: ProjectFortress/compiler_tests/XXXInferResultOnlyLabelBody\.test, deleted: row 642 \(CONTESTED\)')
        self.assertNotRegex(out, r'xxx-gone: .*XXXMethodStaticArgsBoundNamesOther')                # its rows closed in the range
        self.assertRegex(out, r'(?m)^commit-says-fixed: 054c4bcfd .*row 642 \(CONTESTED\)')
        self.assertNotRegex(out, r'commit-says-fixed: .*row (644|651) ')                # closed in the range
        self.assertRegex(out, r'(?m)^template: row 642 \(line \d+\): reproducer-path: ')
        self.assertNotIn('base-', out)                                                   # rows 660 to 670 are new: allowed
        # the gather's FACTS entry for rung C called the row fixed
        self.assertRegex(out, r'(?m)^record: FACTS\.md, "The compiled checker gives a call its expected type.*": row 642 \(CONTESTED\) called fixed: .*rows 560, 627, 642, 644 and 651 fixed')
        self.assertEqual(len(re.findall(r'(?m)^record: ', out)), 1)
        # an entry the range changed that calls the open row fixed, and one that calls a closed row open
        changed = next(ln for ln in facts_text.split('\n') if ln.startswith('- **The one library\'s `narrowToRange`'))
        with open(facts, 'w', encoding='utf-8') as f:
            f.write(facts_text.replace(changed, changed + ' Row 642 is fixed. Row 644 stays open.'))
        out = self.run_tool(*args, ok=False).stdout
        self.assertRegex(out, r'(?m)^record: FACTS\.md, "The one library\'s `narrowToRange`.*": row 642 \(CONTESTED\) called fixed')
        self.assertRegex(out, r'(?m)^record: FACTS\.md, "The one library\'s `narrowToRange`.*": row 644 \(FIXED\) called open')
        # an entry the range did not change is not read: from the end of the batch, the entry that calls row 642 fixed is unchanged
        with open(facts, 'w', encoding='utf-8') as f:
            f.write(facts_text)
        out = self.run_tool('landing-check', end, '--head', end, '--facts', facts, '--positions', positions, ok=False).stdout
        self.assertNotRegex(out, r'(?m)^(record|xxx-gone|commit-says-fixed|subject-names-row): ')

    # ------------------------------------------------------------ facts-extract reads through ledger.py

    def facts_extract(self, *queries):
        p = subprocess.run([sys.executable, FACTS_EXTRACT, '--root', self.dir] + list(queries), capture_output=True, text=True)
        self.assertNotIn('Traceback', p.stderr)
        return p

    def test_facts_extract(self):
        for name in ('FACTS.md', 'INDEX.md'):
            open(os.path.join(self.dir, 'explorations', 'coordinator', name), 'w').close()
        led = ledger.Ledger(self.path)
        out = self.facts_extract('ledger:83').stdout
        self.assertIn('fortress-gap-ledger.md:%d\n%s' % (led.one(83).lineno, '\n'.join(led.one(83).header + [led.one(83).line])), out)
        out = self.facts_extract('ledger-find:opr', '--check').stdout
        self.assertRegex(out, r'ledger-find:opr\s+\d+ ledger rows')
        r = next(r for r in led.rows if len(re.findall(r'[A-Za-z]{6,}', r.claim)) >= 3)
        words = re.findall(r'[A-Za-z]{6,}', r.claim)[:3]
        out = self.facts_extract('ledger-find:' + ' '.join(words)).stdout
        self.assertIn('%d | %s | ' % (r.num, r.status), out)
        n = self.add(section=self.last)
        out = self.facts_extract('ledger:%d' % n).stdout
        self.assertIn('## ' + self.last, out)
        self.assertIn('| %d | a nested subscript' % n, out)


if __name__ == '__main__':
    unittest.main()
