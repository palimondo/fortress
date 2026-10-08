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

PIPE_ROWS = [314, 369, 374, 377, 470, 473]   # rows whose cells held bare pipes at the tool's writing
GOOD = ('| ? | a nested subscript `x[i][j]` fails under walk (made up for this test) | NEGATIVE-VERIFIED | '
        'implementation gap (walk) | `basic/operators/precedence.tex`, "Operator Precedence and Associativity" | '
        '`ProjectFortress/tests/XXXAsExpr.fss` | test_ledger.py | none |')


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

    def add(self, line=GOOD, section='Grammar and lexing'):
        p = self.run_tool('add', self.row_file(line), '--section', section)
        return int(re.match(r'row (\d+)', p.stdout).group(1))

    # ------------------------------------------------------------ reading today's ledger

    def test_parse(self):
        led = ledger.Ledger(self.path)
        nums = [r.num for r in led.rows]
        self.assertEqual(len(nums), len(set(nums)))
        self.assertEqual(set(nums), set(range(1, max(nums) + 1)) - ledger.VACANT)
        r83 = led.one(83)
        self.assertEqual(r83.status, 'CONTESTED')
        self.assertEqual(len(r83.cells), 7)
        self.assertEqual(r83.spec, '')
        self.assertTrue(r83.notes)
        for n in PIPE_ROWS:
            r = led.one(n)
            self.assertEqual(r.split, 'lenient', n)
            self.assertEqual(len(r.cells), 8, n)
            self.assertIn(r.status_word, ledger.STATUSES, n)
            self.assertGreater(len(ledger.split_cells(r.line)), 8, n)

    def test_strict_split(self):
        self.assertEqual(ledger.split_cells(r'| 1 | a \| b | c |'), ['1', r'a \| b', 'c'])
        self.assertEqual(ledger.split_cells('| 1 | `opr ||(` | c |'), ['1', '`opr', '', '(`', 'c'])

    def test_check_today(self):
        p = self.run_tool('check', ok=False)
        self.assertEqual(p.returncode, 1)
        out = p.stdout
        self.assertIn('row 83 (line', out)
        self.assertRegex(out, r'row 83 \(line \d+\): cells: 7 cells')
        self.assertRegex(out, r'header: the table at line \d+ \(## Contested / unsettled\) has 7 columns')
        pipes = sorted(int(n) for n in re.findall(r'^row (\d+) \(line \d+\): pipe:', out, re.M))
        self.assertEqual(pipes, PIPE_ROWS)
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
        self.assertIn('Contested / unsettled', [t for n, t in secs])
        one = self.run_tool('section', 'Fortify typesetter').stdout.strip().split('\n')
        self.assertEqual(len(one), dict((t, int(n)) for n, t in secs)['8. Fortify typesetter'])

    def test_show_find_count(self):
        p = self.run_tool('show', '83')
        self.assertIn('| 83 |', p.stdout)
        self.assertIn('why unsettled', p.stdout)
        p = self.run_tool('show', '83', '--short')
        self.assertTrue(p.stdout.startswith('83 | CONTESTED |'))
        self.run_tool('show', '148', ok=False)
        p = self.run_tool('find', 'NN64', 'signed', '--cites', 'FortressLibrary.fsi')
        self.assertRegex(p.stdout, r'(?m)^439 \| ')
        self.assertIn('cites ', p.stdout)
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
        self.assertEqual(r.section, '1. Grammar and lexing')
        sec = led.section('Grammar and lexing')
        self.assertIs(sec.rows[-1], r)
        self.assertEqual(r.lineno, before.section('Grammar and lexing').rows[-1].lineno + 1)
        self.assertEqual(ledger.Linter(TREE, {x.num for x in led.rows}).lint(r), [])
        self.assertEqual(len(self.read().split('\n')), len(self.text.split('\n')) + 1)
        self.assertEqual(self.add(section='16. Syntax extension: grammars, templates and sub-languages'), top + 2)
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
            p = self.run_tool('add', self.row_file(bad), '--section', 'Grammar and lexing', ok=False)
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
        self.run_tool('note', '1', 'a legacy row fails the template', ok=False)

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
        self.run_tool('duplicate', '1', '--of', str(a), ok=False)
        self.run_tool('duplicate', '1', '--of', str(a), '--class', 'implementation gap (walk)', '--spec', 'silent',
                      '--reproducer', 'none')
        self.assertEqual(ledger.Ledger(self.path).one(1).status, 'DUPLICATE')

    def test_close(self):
        n = self.add()
        old = ledger.Ledger(self.path).one(n).line
        base = '052a7c3febb9473d053acd4de16a779bbab51412'
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
        self.run_tool('check', '--base', self.base, '--summary', ok=False)
        base_out = self.run_tool('check', '--base', self.base, ok=False).stdout
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
        r = led.one(PIPE_ROWS[0])
        words = re.findall(r'[A-Za-z]{6,}', r.claim)[:3]
        out = self.facts_extract('ledger-find:' + ' '.join(words)).stdout
        self.assertIn('%d | %s | ' % (r.num, r.status), out)
        n = self.add(section='Fortify typesetter')
        out = self.facts_extract('ledger:%d' % n).stdout
        self.assertIn('## 8. Fortify typesetter', out)
        self.assertIn('| %d | a nested subscript' % n, out)


if __name__ == '__main__':
    unittest.main()
