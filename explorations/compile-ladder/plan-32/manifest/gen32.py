# Made from plan-31/manifest/gen31.py for climb batch 32, whose record holds one run: climb batch 32, the rungs
# P, S, C, F and B, and, since the record's amendment of 2026-11-15, N and D, which moved here from climb batch 31's
# record with gen31.py's --fork-w. --without <rung> leaves a rung out of the block. A rung's section runs from its heading to the
# next ### heading, as check32.js reads it.
# Changed from gen31.py: the batch's values (the record CLIMB-BATCH-32.md, the lists lists32.py, the output under
# $OUT32); no --run, since the record has one run; the "Fields common to the seven rungs", whose joins-the-gate
# field gives none but the specification's build at the gather, for C's and N's text, and whose lands-only-with
# field reads "none. Every rung lands on its own."; the intro, which is the whole of section 6's "What every agent
# reads first".
# --fork-w a|b is the answer to fork W (the record's section 3, "The consequential forks"), which rung N's block
# depends on. The record is written for (a), walk now, at which the fork stands. At (b), walk waits, the generator
# first makes the changes of W_B_RECORD (below) in the record's text, writes the changed record to
# $OUT32/CLIMB-BATCH-32-fork-w-b.md, and generates from it, with lists32.py's lists for (b). The block is written to
# $OUT32/manifest32.js at (a) and to $OUT32/manifest32-fork-w-b.js at (b). The two blocks as generated on 2026-11-15
# are kept beside this file, block32.js and block32-fork-w-b.js: the batch had no go then, and neither was spliced
# into the script.
# Generates the MANIFEST block for the batch workflow (explorations/coordinator/climb-batch-workflow.js;
# explorations/coordinator/process-engineering/batch-redesign.md) from the record, read at run time, and the
# briefings of lists32.py; check32.js checks it and splices it. On batch 15's pattern (plan-15/manifest/gen15.py):
# each rung's section of the record's section 4 goes into the block word for word as the rung's section, which
# every role on the rung reads (the worker, the skeptic, a judge and a repair round), its code-span backticks
# dropped, any ellipsis character written as three full stops and any minus sign as a hyphen-minus; the briefing's
# reasons go beside the keys, and the script renders them at the end of the worker's brief. No value is set at
# launch: the gather numbers the batch's new rows through ledger.py, so the block has no LEDGER_FROM.
#   python3 -B gen32.py [--fork-w a|b] [--without <rung>]... [RECORD]   RECORD defaults to explorations/coordinator/CLIMB-BATCH-32.md
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from lists32 import lists, IDS as ALL_IDS

ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(HERE, '../../../..')))
argv = sys.argv[1:]
USAGE = 'usage: gen32.py [--fork-w a|b] [--without <rung>]... [RECORD]'
FORK_W = 'a'
if '--fork-w' in argv:
    FORK_W = argv[argv.index('--fork-w') + 1]
    del argv[argv.index('--fork-w'):argv.index('--fork-w') + 2]
assert FORK_W in ('a', 'b'), USAGE
RUN_IDS = ALL_IDS
WITHOUT = []
while '--without' in argv:
    WITHOUT.append(argv[argv.index('--without') + 1])
    del argv[argv.index('--without'):argv.index('--without') + 2]
args = [a for a in argv if not a.startswith('--')]
assert all(w in RUN_IDS for w in WITHOUT), ('--without names a rung not in the run', WITHOUT)
IDS = tuple(r for r in RUN_IDS if r not in WITHOUT)
LISTS, REASONS = lists(IDS, FORK_W)
BATCH = '32'
BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-32.md'
BRIEFING_LISTS = 'explorations/compile-ladder/plan-32/manifest/lists32.py'
REC = args[0] if args else os.path.join(ROOT, BATCH_RECORD)
OUTDIR = os.environ.get('OUT32', os.path.join(ROOT, 'tmp'))
# The block differs with the answer to fork W, so at (b) its file names the answer.
SUFFIX = '-fork-w-b' if FORK_W == 'b' else ''
OUT = os.path.join(OUTDIR, 'manifest32%s.js' % SUFFIX)
os.makedirs(OUTDIR, exist_ok=True)
rec = open(REC, encoding='utf-8').read()

# Fork W at (b), walk waits (the record's section 3, "The consequential forks"; section 6, "Before the launch",
# step 1). The record is written for (a). Each pair below is a text of the record and what stands in its place at
# (b): step 2 of rung N's section struck, and every sentence of rung N's section 1 block, of its section 4, of rung
# F's "Overlaps by file." and of the intro that step 2's absence makes false. Each source must stand in the record
# exactly once, or its replacement already (a record that the coordinator has brought to (b)); anything else stops
# the generator, so that an edit of the record is not passed over. The record so changed is written to
# $OUT32/CLIMB-BATCH-32-fork-w-b.md, which check32.js --fork-w b reads. The words at (b) are those of
# plan-31/manifest/gen31.py, a proposal of the check of 2026-11-13 (coordinator/climb-batch-31-review.md, B4), for
# the coordinator to read before a launch at (b), with the pairs that this record's "Not" lists and intro add.
W_B_RECORD = [
  # section 1: the section field, and section 4: the heading
  ("its default the last resort: u = 0 is true for a zero u of NN32, on both paths (P-46, P-49, P-173)`",
   "its default the last resort: u = 0 is true for a zero u of NN32, in the compiled checker (P-46, P-49, P-173)`"),
  ("its default the last resort: `u = 0` is `true` for a zero `u` of `NN32`, on both paths (P-46, P-49, P-173)\n",
   "its default the last resort: `u = 0` is `true` for a zero `u` of `NN32`, in the compiled checker (P-46, P-49, P-173)\n"),
  # section 1: the blurb
  ("Built in the compiled checker and, by fork W's default, in walk; the one library's Equality gains =/= so that u =/= 0 follows; the two expected-failure walk tests are promoted (rows 973 and 966, their kin 975 and 976); row 390's numeral case",
   "Built in the compiled checker only: by the answer to fork W, walk is not changed before it runs the checker, and rows 973, 966, 975 and 976 stay open under walk; the one library's Equality gains =/= so that u =/= 0 follows where the checker reads that library; row 390's numeral case"),
  # section 1: the points to report
  ("  - The rule as built in the checker and in walk, by declaration, and what each does where two applicable declarations are not ordered.",
   "  - The rule as built in the checker, by declaration, and what it does where two applicable declarations are not ordered."),
  # section 1: the briefing, as lists31.py's W_B_DROP and W_B_REASON
  ("- **briefing** (26 keys, 19 checks):\n  - P-46 (check)", "- **briefing** (25 keys, 18 checks):\n  - P-46 (check)"),
  ("  - P-59 (check): walk chooses a coercion by the run-time value; fork W reads it.\n",
   "  - P-59 (check): walk chooses a coercion by the run-time value; by the answer to fork W, walk is not changed in this rung.\n"),
  ("  - ledger:973 (check): `u = 0` under walk, which closes.\n", "  - ledger:973 (check): `u = 0` under walk, which stays open.\n"),
  ("  - ledger:966 (check): `u =/= 0` under walk, which closes.\n", "  - ledger:966 (check): `u =/= 0` under walk, which stays open.\n"),
  ("  - SRC `interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchForNumerals` (check): walk's choice for a call with a numeral.\n", ""),
  # section 4, rung N
  ("P-59 as fork W reads it; P-148 for your checker edit. Section 3's fork W at its default and forks N1 to N4.",
   "P-59, which stays: by the answer to fork W, walk is not changed in this rung; P-148 for your checker edit. Section 3's forks N1 to N4."),
  ("2. **Walk** (fork W). In `interpreter/evaluator/values/OverloadedFunction.java`, `bestMatchForNumerals` and what it calls follow the same rule, and the dispatch cache's keys tell apart what the rule tells apart. Tests first: `tests/XXXNumeralEqualsNumberWalk.fss` and `tests/XXXNotEqualNumeral.fss` promoted, the first with `h: QQ = 1/2`, `h = 0.5` and `0.5 = h` added (PLAN's line on the test owed); `tests/NumeralMostSpecificWalk.fss` with step 1's programs, a `case u of 0 => \u2026` (row 975) and a program's own number type (row 976).",
   "2. **Walk: not in this rung.** By the answer to fork W, walk's choice for a call with a numeral stays as it is until walk runs the checker. `tests/XXXNumeralEqualsNumberWalk.fss` and `tests/XXXNotEqualNumeral.fss` stay expected failures, and you edit no file under `interpreter/`."),
  ("**Rows.** Read each with `ledger.py show N` first. Close 973, 966, 975, 976 and 989. Row 390's whole new line (fork N4).",
   "**Rows.** Read each with `ledger.py show N` first. Close 989. Rows 973, 966, 975 and 976 stay open. Row 390's whole new line (fork N4)."),
  ("- the Effect of Appendix I's `revival-numerals`, `Specification/appendices/changes.tex:5286-5298`, the clause of rows 966 and 973, and the sentence on `=/=` near `:3813-3825`.",
   "- not the Effect of Appendix I's `revival-numerals`, `Specification/appendices/changes.tex:5286-5298`, the clause of rows 966 and 973, nor the sentence on `=/=` near `:3813-3825`: walk's answers do not change, so both stay as they are."),
  ("`scala_src/typechecker/impls/Functionals.scala` and what it calls in `scala_src/typechecker/`; `interpreter/evaluator/values/OverloadedFunction.java`, `Coercions.java`, `Numerals.java`; `Library/FortressLibrary.fss` and `.fsi`, `Equality` only; your tests; the specification's sentences named. Not: `compiler/codegen/`, the prelude, microGPT; in `Functionals.scala`, the declarations that are rung C's (\"The rule the rungs keep\"); `scala_src/types/TypeAnalyzer.scala`, which is rung C's; `scala_src/typechecker/Thunker.scala` and `impls/Decls.scala`, which are rung D's; in `OverloadedFunction.java`, the members from the inner class `Factory` (`:2777`) to the class's end, which are rung F's; every other file under `interpreter/`; the signature of a public method of `Coercions.java` or `Numerals.java` that a file outside your list calls.",
   "`scala_src/typechecker/impls/Functionals.scala` and what it calls in `scala_src/typechecker/`; `Library/FortressLibrary.fss` and `.fsi`, `Equality` only; your tests; the specification's sentences named. Not: `interpreter/`, `compiler/codegen/`, the prelude, microGPT; in `Functionals.scala`, the declarations that are rung C's (\"The rule the rungs keep\"); `scala_src/types/TypeAnalyzer.scala`, which is rung C's; `scala_src/typechecker/Thunker.scala` and `impls/Decls.scala`, which are rung D's."),
  # section 4: the two sections' "Overlaps by file.", N's and F's, which name walk's file that N then does not edit
  ("**Overlaps by file.** `Functionals.scala` with C, and `OverloadedFunction.java` with F: \"The rule the rungs keep\".",
   "**Overlaps by file.** `Functionals.scala` with C: \"The rule the rungs keep\"."),
  ("**Overlaps by file.** `OverloadedFunction.java` with N: \"The rule the rungs keep\".",
   "**Overlaps by file.** None with P, S, C, B, N or D."),
  # section 6: the intro
  ("P and S share one grammar file by production, C and N the checker's file for calls by declaration, and N and F one file of the interpreter by member: each keeps to its own",
   "P and S share one grammar file by production, and C and N the checker's file for calls by declaration: each keeps to its own"),
  ("- N, a numeral at a call goes to the most specific declaration that takes it, on both paths, so that u = 0 is true for a zero u of NN32;",
   "- N, a numeral at a call goes to the most specific declaration that takes it, in the compiled checker, so that u = 0 is true for a zero u of NN32 where the checker reads the interpreter's library;"),
]
if FORK_W == 'b':
    for src, dst in W_B_RECORD:
        n_src, n_dst = rec.count(src), (rec.count(dst) if dst else 0)
        assert (n_src, n_dst) in ((1, 0), (0, 1)) or (not dst and n_src in (0, 1)), ('fork W at (b): a text of the record is not as the generator has it', n_src, n_dst, src[:90])
        rec = rec.replace(src, dst)
    REC_B = os.path.join(OUTDIR, 'CLIMB-BATCH-32-fork-w-b.md')
    open(REC_B, 'w', encoding='utf-8').write(rec)
# The characters outside ASCII that a section may keep, each written as a \u escape by js(): none in this batch.
KEPT = ''


def ascii_text(t, keep=''):
    t = t.replace('`', '').replace('…', '...').replace('−', '-')
    bad = [c for c in t if ord(c) > 127 and c not in keep]
    assert not bad, ('non-ASCII left', bad, t[:120])
    return t


def between(text, start, end):
    i = text.index(start)
    j = text.index(end, i + len(start))
    return text[i + len(start):j]


# Section 4: one block per rung, from its heading to the next ### heading, each opening with "The mission.".
s4 = between(rec, '\n## 4. The rungs\n', '\n## 5. ')
heads = list(re.finditer(r'^### ([A-Z])\. (.*)$', s4, flags=re.M))
assert [h.group(1) for h in heads] == list(ALL_IDS), [h.group(1) for h in heads]
sections, titles, headings = {}, {}, {}
for i, h in enumerate(heads):
    rid = h.group(1)
    nxt = re.search(r'^### ', s4[h.end():], flags=re.M)
    end = h.end() + nxt.start() if nxt else len(s4)
    body = s4[h.end():end].strip('\n')
    paras = body.split('\n\n')
    assert paras[0].startswith('**The mission.**'), (rid, 'the section does not open with The mission.')
    headings[rid] = ascii_text(rid + '. ' + h.group(2))
    if rid not in IDS:
        continue
    sections[rid] = ascii_text(body, KEPT)
    titles[rid] = ascii_text(h.group(2))

# Section 1: the table, the fields common to the seven rungs, and each rung's block.
s1 = between(rec, '\n## 1. The manifest, rung by rung\n', '\n## 2. ')
table = {}
for line in s1.split('\n'):
    m = re.match(r'^\| (1) \| ([A-Z]) \| `([a-z0-9-]+)` \| (.*) \| ([0-9]+) \|$', line)
    if m:
        table[m.group(2)] = {'run': m.group(1), 'slug': m.group(3), 'title': ascii_text(m.group(4)), 'minutes': int(m.group(5))}
assert list(table) == list(ALL_IDS), list(table)
common_text = between(s1, '\nFields common to the seven rungs:\n', '\n### ')
COMMON = {}
for m in re.finditer(r'\*\*([a-z ]+):\*\* ([^.;:]*)', common_text):
    COMMON[m.group(1)] = ascii_text(m.group(2).strip())
# The specification's build runs at the gather, not in the gate: no rung brings a gate step.
assert re.fullmatch(r"none(, but the specification's build at the gather, for C's and N's text)?", COMMON.get('joins the gate', '')), ('common field', 'joins the gate', COMMON.get('joins the gate'))
want_common = {'writes state': 'no', 'its test is the stage': 'no', 'expected moves': 'none', 'lands only with': 'none',
               'expected checker count': 'none declared', 'expected checker crash': 'none'}
for k, v in want_common.items():
    assert COMMON.get(k) == v, ('common field', k, COMMON.get(k))


def rung_names(text):
    """'N, C, F and S' -> ['N', 'C', 'F', 'S']."""
    names = [x.strip() for x in re.split(r',\s*|\s+and\s+', text.strip().rstrip('.')) if x.strip()]
    assert all(re.fullmatch(r'[A-Z]', x) for x in names), ('not a list of rungs', text)
    return names


# The common lands-only-with field: "none. Every rung lands on its own." No rung's block has one.
assert re.search(r'^- \*\*lands only with:\*\* none\. Every rung lands on its own\.', common_text, flags=re.M), 'the common lands-only-with field'
COMMON_LOW = {}
blocks = list(re.finditer(r'^### ([A-Z])$', s1, flags=re.M))
assert [b.group(1) for b in blocks] == list(ALL_IDS), [b.group(1) for b in blocks]
FIELDS = {}
for i, b in enumerate(blocks):
    rid = b.group(1)
    if rid not in IDS:
        continue
    text = s1[b.end():blocks[i + 1].start() if i + 1 < len(blocks) else len(s1)]
    f, points, in_points = {}, [], False
    for line in text.split('\n'):
        m = re.match(r'^- \*\*([a-z ]+):\*\*\s*(.*)$', line)
        if m:
            key, val = m.group(1), m.group(2).strip()
            in_points = (key == 'points to report')
            if not in_points:
                f[key] = ascii_text(val)
            continue
        if line.startswith('- **briefing**'):
            in_points = False
            continue
        m = re.match(r'^  - (.*)$', line)
        if m and in_points:
            points.append(ascii_text(m.group(1).strip()))
    f['points'] = points
    for k in ('slug', 'worktree', 'section', 'blurb'):
        assert k in f, (rid, k)
    assert points, (rid, 'no points to report')
    assert f['slug'] == table[rid]['slug'], (rid, 'slug differs from the table')
    assert f['worktree'] == '/home/user/fortress-' + re.sub(r'^rung-', '', f['slug']), (rid, 'worktree', f['worktree'])
    assert f['section'] == headings[rid], (rid, 'section field differs from the section 4 heading', f['section'], headings[rid])
    f['expected minutes'] = table[rid]['minutes']
    assert not any(k.startswith('waits on') for k in f), (rid, 'a waits-on line, which no rung of this batch has')
    # A rung's own "lands only with" field, which the common field must give alike; none where neither names it.
    own = rung_names(re.sub(r'\s*\(.*?\)\.?$', '', f['lands only with'])) if 'lands only with' in f else []
    assert own == COMMON_LOW.get(rid, []), (rid, 'its lands-only-with field and the common one differ', own, COMMON_LOW.get(rid))
    f['lands only with'] = own
    assert all(x in RUN_IDS and x != rid for x in own), (rid, own)
    FIELDS[rid] = f
s6 = rec[rec.index('\n## 6. How it is run\n'):]
intro = between(s6, '\n### What every agent reads first\n', '\n### Before the launch\n').strip()
assert intro.startswith('This run is climb batch %s, ' % BATCH), intro[:80]
INTRO = ascii_text(intro)


def js(x):
    return json.dumps(x, ensure_ascii=True)


def js_list(keys, indent='      '):
    out, cur = [], ''
    for k in keys:
        piece = js(k)
        if cur and len(cur) + len(piece) + 2 > 150:
            out.append(indent + cur.rstrip())
            cur = ''
        cur += piece + ', '
    if cur:
        out.append(indent + cur.rstrip().rstrip(','))
    return '\n'.join(out)


L = []
A = L.append
A('// ===========================================================================')
A('// MANIFEST - the coordinator replaces everything between this line and the')
A('// "END MANIFEST" line, and changes nothing else in this file.')
A('//')
A('// Generated by explorations/compile-ladder/plan-32/manifest/gen32.py%s from' % (' --fork-w b' if FORK_W == 'b' else ''))
A('// CLIMB-BATCH-32.md (section 4, each rung\'s section word for word; section 1, the')
A('// manifest fields; section 6, the intro) and the briefings of lists32.py; check32.js checks it.')
A('// Fork W (the record\'s section 3): this block is for way (%s), %s.' % (FORK_W, 'walk now, as the record is written' if FORK_W == 'a' else 'walk waits: step 2 of rung N struck, by gen32.py\'s W_B_RECORD'))
A('// The record holds one run: climb batch 32 (rungs P, S, C, F, B, N, D).')
A('// Climb batch ' + BATCH + ': rungs ' + ', '.join(IDS) + ', the manifest\'s order; ' + ('; '.join('%s lands only with %s' % (r, ', '.join(FIELDS[r]['lands only with'])) for r in IDS if FIELDS[r]['lands only with']) or 'none lands only with another') + '.' + (' This block leaves out ' + ', '.join(WITHOUT) + '.' if WITHOUT else ''))
A('// Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start order only),')
A('// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line')
A('// for the batch table), section (the rung\'s section of the record, read by every role')
A('// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the')
A('// worker reads first, each with its reason; of section 3\'s forks, the record\'s one')
A('// key, "Forks the batch takes" whole, for every rung), checks (the sub-list the')
A('// skeptic, a judge and a repair round read), expectedMoves (ladder moves declared,')
A('// none here), and the optional landsOnlyWith, expectedCheckerCount and')
A('// expectedCheckerCrash: no rung lands only with another (section 1\'s common fields),')
A('// and none declares a checker count or a crash (the count is reported).')
A('// Every string here is ASCII: the record\'s sections hold no other character.')
A('// No value is set at launch. The base and the base build are args.base and')
A('// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The')
A('// Workflow harness runs two agents at once on this box"); the scatter starts the')
A('// longest expected worker first.')
A('// ===========================================================================')
A('')
A("const BATCH = '%s'" % BATCH)
A("const BATCH_RECORD = '%s'" % BATCH_RECORD)
A("const BRIEFING_LISTS = '%s'" % BRIEFING_LISTS)
A('')
for rid in IDS:
    A('const %s_SECTION = [' % rid)
    for l in sections[rid].split('\n'):
        A(js(l) + ',')
    A("].join('\\n')")
    A('')
for rid in IDS:
    f = FIELDS[rid]
    b, c = LISTS[rid]
    slug = f['slug']
    assert re.fullmatch(r'[a-z0-9-]+', slug), slug
    path = f['worktree']
    assert re.fullmatch(r'/home/user/fortress-[a-z0-9-]+', path), path
    A("const %s_ENTRY = { id: '%s', slug: '%s', path: '%s', branch: 'wip/%s', expectedMinutes: %d," % (rid, rid, slug, path, slug, f['expected minutes']))
    # The common fields (asserted above): writes state no, its test not the stage, no gate step, no ladder move,
    # no checker count or crash declared; the rungs it lands only with, from its own block and the common field.
    lw = f['lands only with']
    assert all(x in IDS for x in lw), (rid, 'lands only with a rung this block leaves out', lw)
    A('    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],%s' % ('' if not lw else ' landsOnlyWith: %s,' % js(lw)))
    A('    title: ' + js(titles[rid]) + ',')
    A('    blurb: ' + js(f['blurb']) + ',')
    A('    section: %s_SECTION,' % rid)
    A('    pointsToReport: [')
    for p in f['points']:
        A('      ' + js(p) + ',')
    A('    ],')
    A('    briefing: [')
    A(js_list(b) + '],')
    A('    reasons: [')
    for k, r in REASONS[rid]:
        A('      ' + js(ascii_text(r)) + ',')
    A('    ],')
    A('    checks: [')
    A(js_list(c) + '] }')
    A('')
A('const RUNGS = [' + ', '.join('%s_ENTRY' % r for r in IDS) + ']')
A('const BATCH_INTRO = ' + js(INTRO))
BLOCK = '\n'.join(L) + '\n'
for line in L:
    assert all(ord(c) < 128 for c in line) and '`' not in line, line[:120]
open(OUT, 'w').write(BLOCK)
print('batch', BATCH, 'fork W at (' + FORK_W + ')', 'wrote', OUT, len(L), 'lines')
for rid in IDS:
    kept = sorted(set(c for c in sections[rid] if ord(c) > 127))
    print(rid, FIELDS[rid]['slug'], FIELDS[rid]['worktree'], FIELDS[rid]['expected minutes'], 'minutes; section', len(sections[rid]), 'chars' + (', kept as escapes: ' + ' '.join('U+%04X' % ord(c) for c in kept) if kept else '') + ';', len(FIELDS[rid]['points']), 'points;', len(LISTS[rid][0]), 'briefing keys,', len(LISTS[rid][1]), 'checks; lands only with ' + (', '.join(FIELDS[rid]['lands only with']) or 'none') + '; forks', ', '.join(k.split('#')[-1] for k in LISTS[rid][0] if k.endswith('#Forks the batch takes')) + ' (whole)')
