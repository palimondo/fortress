# Generates climb batch 10's MANIFEST block (CLIMB-BATCH-10.md, rungs W, C, G and N) from section 3 of the record
# and the briefing and checks lists of lists10.py, into $OUT10/manifest10.js ($FORTRESS_HOME/tmp by default, which is
# ignored); check10.js checks it. Copied from explorations/compile-ladder/plan-9/manifest/gen9.py as Fable's review left
# it: each tail is its rung's section word for word with the code-span backticks dropped, ASCII only, then its briefing
# entry by entry with one reason line each. The record holds no copy of the block (its section 7 says so), so the block
# is spliced into the script at the launch from this output alone. One value is set at launch and nowhere else:
# LEDGER_FROM, which the block refuses to load without. No rung declares an expectedCheckerCount, so the block has no
# CHECKER_BASE, and no rung lands only with another, so none has landsOnlyWith. Changed from gen9.py: the batch's values;
# the intro names item 20 as decided (Pavol's answer of 2026-10-03, POSITIONS.md, A type parameter the arguments do not
# fix takes its bound, its last sentence) and P1 as the one answer the coordinator writes in; W's expectedMinutes is
# raised by the coordinator if P1's answer is written into W's answers line.
#   python3 gen10.py [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-10.md
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from lists10 import LISTS, REASONS, IDS

ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(HERE, '../../../..')))
args = [a for a in sys.argv[1:] if not a.startswith('--')]
REC = args[0] if args else os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-10.md')
OUT = os.path.join(os.environ.get('OUT10', os.path.join(ROOT, 'tmp')), 'manifest10.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([A-Z])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == list(IDS), [h.group(1) for h in heads]

META = {   # expectedMinutes sets the scatter's start order only; under P1's answer the coordinator sets W's to 250
  'W': dict(path='/home/user/fortress-walkmeet', minutes=200, writesState=False, testIsStage=False),
  'C': dict(path='/home/user/fortress-checkdefects', minutes=260, writesState=False, testIsStage=False),
  'G': dict(path='/home/user/fortress-genslips', minutes=220, writesState=False, testIsStage=True),
  'N': dict(path='/home/user/fortress-numslips', minutes=240, writesState=False, testIsStage=True),
}
BLURB = {
  'W': "walk's load check: the Meet Rule for Functional Methods per providing type (row 544) and the restriction on a single parameter written bounded by Any (row 534), as the checker applies them; a type parameter an argument bounds only from above takes that bound (row 588); the pin of D5's reach; under P1's answer, the F-bounded parameter nothing fixes (row 424's half, the walk smoke test, row 555's F-bounded form, D2, R10's demos); the inference chapter's box on walk and the reductions callout; Java under interpreter/evaluator/.",
  'C': "the compiled checker's defects after batch 8: row 563's capture in the abstract-method checker, row 593's dependent bound, row 604's varargs (with the team's varargs type and a callout in the S1 form), row 605's field read as a getter, row 574's message and row 597's object expression against a closed trait; the four crash rows traced, each with its row; Scala under scala_src/typechecker/ and Java in compiler/Types.java and nodes_util/NodeUtil.java.",
  'G': "the one library's one-off slips in the generator support, Maybe and reduction sections of FortressLibrary, Indexed and DelegatedIndexed, and the generators of generators and relational predicates: 57 sites of the distance by reading; library declarations only.",
  'N': "item 20's drop of the three written Object bounds (builtinPrimitive, fail, List's nullary comprehension), and the one library's one-off slips in the ordering, numeric and primitive sections of FortressLibrary, the tuples' comparisons, List, FortressBuiltin and Writer: 61 sites by reading, with rows 590 (MatchFailure unchecked) and 602 (StridedFullRange3D's shifts); library declarations only.",
}

def strip_ticks(t):
    return t.replace('`', '')

# The reasons block that ends each tail; check10.js finds it by this line.
REASONS_HEAD = "**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it."

tails, titles = {}, {}
for i, h in enumerate(heads):
    rid, title, slug = h.group(1), h.group(2), h.group(3)
    end = heads[i + 1].start() if i + 1 < len(heads) else len(s3)
    body = s3[h.end():end].strip('\n')
    assert body.startswith('**The answers this rung follows.**'), rid
    title_plain = strip_ticks(title)
    words = title_plain.split(' ', 1)
    lower = words[0][0].lower() + words[0][1:] if (len(words[0]) == 1 or words[0][1:].islower()) else words[0]
    header_title = lower + ((' ' + words[1]) if len(words) > 1 else '')
    m = META[rid]
    branch = 'wip/' + slug
    lines = ['', '## Your rung: %s - %s' % (rid, header_title), '',
             'SLUG is %s. WORKTREE is %s, branch %s.' % (slug, m['path'], branch), '',
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-10.md, section 3, under \"%s. %s\"), carried below word for word. It is the whole of what the record asks of this rung, so you need not open the record: its answers line says which of the record's questions and probes apply, and the decisions it builds are entries of your briefing, by their POSITIONS.md titles. After it comes your briefing entry by entry, each with why it is there; where the section says what the rung does, decides or records, that is you." % (rid, title_plain), '']
    lines += [strip_ticks(l) for l in body.split('\n')]
    lines += ['', REASONS_HEAD]
    lines += ['- %s: %s' % (k, r) for k, r in REASONS[rid]]
    lines += ['']
    for l in lines:
        assert all(ord(c) < 128 for c in l), (rid, [c for c in l if ord(c) >= 128], l[:120])
    tails[rid] = lines
    titles[rid] = (title_plain, slug, branch)
assert sorted(tails) == sorted(IDS), sorted(tails)

def js_str(x):
    return json.dumps(x, ensure_ascii=True)

def js_list(keys, indent='      '):
    out, cur = [], ''
    for k in keys:
        piece = js_str(k)
        if cur and len(cur) + len(piece) + 2 > 150:
            out.append(indent + cur.rstrip())
            cur = ''
        cur += piece + ', '
    if cur:
        out.append(indent + cur.rstrip().rstrip(','))
    return '\n'.join(out)

INTRO_RUNG = {
  'W': "W makes walk refuse at load what the overloading chapter and the compiled checker refuse and walk loads today, a type that provides two overlapping functional methods with no declaration on their meet or covering it (row 544) and a single parameter written bounded by Any beside an overload (row 534), and give a type parameter that an argument bounds only from above that bound, never Bottom (row 588, Pavol's decision on the POPL 2019 paper's instance rule); it pins D5's reach with a plain test and a row, corrects the reductions callout's sentence on the checker, and revises the inference chapter's box on walk and its Appendix I entry in the S1 form; under P1's answer only, it also builds the F-bounded parameter nothing fixes as the judgement decides, the walk smoke test among it, and reads R10's demos.",
  'C': "C repairs the compiled checker's defects that batch 8 and 9 found and PLAN gives the checker rung after batch 8: an inherited generic method's own static parameter capturing the object's (row 563), a lone parameter taken at its bound when another's bound mentions it (row 593), varargs (row 604, the body typed as the team's own varargs type, with a callout in the S1 form), a field read as an inherited getter (row 605), a message (row 574) and an object expression read against a closed trait (row 597's checker half); it traces the four crash rows of the distance and gives each a row.",
  'G': "G repairs, with the library's own devices, the distance's one-off errors in the generator support, Maybe and reduction sections of FortressLibrary, Indexed and DelegatedIndexed, and the generators of generators and relational predicates.",
  'N': "N builds item 20's drop, Pavol's answer: the three written Object bounds on builtinPrimitive, fail and List's nullary comprehension go back to the team's text; and repairs, with the library's own devices, the distance's one-off errors in the ordering, numeric and primitive sections of FortressLibrary, the tuples' comparisons, List, FortressBuiltin and Writer, with rows 590 and 602.",
}
INTRO_STOPS = {
  'W': "for W, an interpreter test whose verdict changes other than by W's intent, a library type or a team test refused at load, a change to which declaration walk runs for a set it loads today, a key that lets an XXX file pass for another failure, a parameter nothing fixes bound to anything but its declared bound, the F-bounded case changed without P1's answer or other than as its judgement decides, a team test line changed or a demo edited, normative text beyond the passages its section names, and a library, checker or harness edit",
  'C': "for C, a compiled test whose verdict changes other than by C's intent, a change to the checker's overloading rules, answer 9's positional or return-type rule, the coverage check or the Meet Rule for functional methods, a program the text allows refused or one it refuses accepted outside C's rows, a crash repaired by catching it without the error the text gives, and a library or walk edit",
  'G': "for G, a team test line changed, a checker or walk edit, a site whose only repair is a checker change, a device that states an exclusion false of some library type, a repair that changes a value walk prints, a team declaration removed, and a declaration of N's sections",
  'N': "for N, a team test line changed, a checker or walk edit, a site whose only repair is a checker change, a device that states an exclusion false of some library type, a repair that changes a value walk prints other than rows 590's and 602's, a team declaration removed, and a declaration of G's sections, isLeftZero or the strings' symbolic families",
}
INTRO_LIFTED = {
  'W': "W makes walk refuse at load sets the text and the checker refuse, changes the instance of a parameter bounded only from above, promotes expected failures, and revises the inference chapter's box on walk, the reductions callout and their Appendix I entries, normative text in the S1 form",
  'C': "C changes what the compiled checker accepts and refuses for its rows, promotes expected failures, and adds a callout at the varargs passage and Appendix I's entries in the S1 form",
  'G': "G corrects declarations and declared types in the generator, Maybe and reduction sections of FortressLibrary",
  'N': "N drops three written bounds by Pavol's answer, corrects declarations and declared types in its sections, List, FortressBuiltin and Writer, makes MatchFailure unchecked, gives StridedFullRange3D its shifts, and promotes two expected failures",
}
OVERLAP_RUNG = {
  'W': "W edits values/OverloadedFunction.java, BuildEnvironments.java and a load-time file it names, EvaluatorBase.java, and types/FType.java and types/TypeLatticeOps.java only where row 588 or P1's half needs them, all under interpreter/evaluator/; adds and promotes files in ProjectFortress/tests/; and edits the interpreter's box of Specification/basic/inference.tex (under P1 its second box), the callout of Specification/basic/expressions/reductions.tex, and the entries The inference of a call's static arguments and Reductions whose element type nothing fixes of Specification/appendices/changes.tex.",
  'C': "C edits AbstractMethodChecker.scala, OverloadingChecker.scala (row 574's message only), impls/Functionals.scala, TypeHierarchyChecker.scala and another typechecker file it names under scala_src/typechecker/, compiler/Types.java and nodes_util/NodeUtil.java, and a crash's file it names; adds and promotes files in ProjectFortress/compiler_tests/; and edits the varargs passage of Specification/basic/functions.tex, a new entry of Specification/appendices/changes.tex and its entry The traits that extend a closed trait.",
  'G': "G edits the generator support, meta-generator, Maybe and reduction sections of Library/FortressLibrary.fsi and .fss but NoReductionPair, SumReduction's distribute pair, the fusion pairs and __bigOperator, with Indexed, DelegatedIndexed and the generators of generators and relational predicates, and adds a file in ProjectFortress/tests/.",
  'N': "N edits fail, the equality and ordering section but isLeftZero, the numeric hierarchy, MatchFailure, LexicographicOrder, partition, __thrower and the numeric primitives but strToInt of Library/FortressLibrary.fsi and .fss; Library/List.fsi and .fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, Library/Writer.fsi and .fss, and StridedFullRange3D in Library/RangeInternals.fss; and adds and promotes files in ProjectFortress/tests/.",
}

L = []
A = L.append
A('// ===========================================================================')
A('// MANIFEST - the coordinator replaces everything between this line and the')
A('// "END MANIFEST" line, and changes nothing else in this file.')
A('//')
A('// Concurrency, which the manifest does NOT set: at most two agents at once here')
A('// (FACTS.md, "The Workflow harness runs two agents at once on this box"), a')
A('// freed slot going to the next queued agent, FIFO. k is 4: the queue sets the')
A('// wall. Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start')
A('// order only), tail (the brief), blurb (one line for the shared prefix\'s table),')
A('// writesState, expectedMoves, and the checker-count fields testIsStage,')
A('// expectedCheckerCount (a printed prediction, never red) and')
A('// expectedCheckerCrash; no rung of this batch declares a count or a crash.')
A('// Optional: landsOnlyWith, which no rung of this batch needs. briefing, the')
A('// rung\'s briefing, which the planner writes from the record so that the agents')
A('// learn in context what they were never trained on: the keys of')
A('// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries')
A('// and FACTS.md entries by their bold titles, gap-ledger rows (ledger:ROW), notes,')
A('// rulings and specification sections (doc:PATH#HEADING), the library and source')
A('// code that is the precedent or the site (code:PATH#FROM..TO), map sections and')
A('// INDEX lines, in reading order, decisions first. The rung worker reads it whole')
A('// as its step 1. And checks, the sub-list of briefing that the skeptic, the')
A('// repair round and the judges read as their step 1. No key holds a double')
A('// quote, backtick, dollar sign or backslash. Each list is checked with the')
A('// tool\'s --check to match exactly one place per key, on the tree the run is cut')
A('// from. Each briefing key has a one-line reason, rendered at the end of the')
A('// rung\'s tail (explorations/compile-ladder/plan-10/manifest/lists10.py).')
A('//')
A('// Batch 10\'s values are CLIMB-BATCH-10.md, sections 3 and 6. Each tail is that')
A('// rung\'s section of section 3 word for word, with the record\'s code-span')
A('// backticks dropped (this file carries none), then its briefing\'s reasons;')
A('// ASCII only. Each section opens with its answers line, which the coordinator')
A('// writes in before the launch (P1 for W; item 20 for N, answered). One value is set')
A('// at launch and nowhere else: LEDGER_FROM, the first free ledger row at the')
A('// launch, which the block refuses to load while unset. Manifest order is the')
A('// ledger numbering order: W, C, G, N. The scatter starts the longest expected')
A('// first: C, N, G, W. No rung declares a ladder move or a checker count. The base is')
A('// <base>, passed at launch as args.base, not written here. Each rung worker')
A('// makes its own worktree, at path on branch, by the shared prefix\'s command.')
A('// ===========================================================================')
A('')
A("const LEDGER_FROM = null   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A('')
A("const BATCH = '10'")
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-10.md'")
A('')
for rid in IDS:
    A('const %s_TAIL = [' % rid)
    for l in tails[rid]:
        A(js_str(l) + ',')
    A("].join('\\n')")
    A('')
for rid in IDS:
    title_plain, slug, branch = titles[rid]
    m = META[rid]
    b, c = LISTS[rid]
    A("const %s_ENTRY = { id: '%s', slug: '%s', path: '%s', branch: '%s', tail: %s_TAIL, expectedMinutes: %d, writesState: %s, testIsStage: %s," % (
        rid, rid, slug, m['path'], branch, rid, m['minutes'], 'true' if m['writesState'] else 'false', 'true' if m['testIsStage'] else 'false'))
    A('    blurb: ' + js_str(BLURB[rid]) + ',')
    A('    briefing: [')
    A(js_list(b) + '],')
    A('    checks: [')
    A(js_list(c) + '],')
    A('    expectedMoves: [] }')
    A('')
A('const RUNGS = [' + ', '.join('%s_ENTRY' % r for r in IDS) + ']')
A('const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)')
A('')
def js_obj(name, d):
    A('const %s = {' % name)
    for k, v in d.items():
        A('  %s: %s,' % (k, js_str(v)))
    A('}')
js_obj('INTRO_RUNG', INTRO_RUNG)
js_obj('INTRO_STOPS', INTRO_STOPS)
js_obj('INTRO_LIFTED', INTRO_LIFTED)
js_obj('OVERLAP_RUNG', OVERLAP_RUNG)
A('')
A('const BATCH_INTRO = [')
A('  ' + js_str("This run is climb batch 10, the record CLIMB-BATCH-10.md and phase 3's next batch after 9, toward the checker at a true zero: one walk rung, one checker rung and two library rungs. It builds what PLAN gives the walk rung after batch 9 (rows 544, 534 and 588, the pin of D5's reach, and under P1's answer the F-bounded parameter nothing fixes; rung W), the checker rung after batch 8 with the four crash rows traced (rung C), and the one library's one-off slips in two halves of FortressLibrary, its other components and Pavol's answer to item 20 (rungs G and N). Batch 9, its combined review and its routing, the FACTS consolidation, the batch script's changes from that review and Pavol's answer to item 20 have landed before it.") + ',')
A('  RUNGS.map(r => INTRO_RUNG[r.id]).join(\' \'),')
A('  ' + js_str("Each rung's section of the record opens with its answers line: Pavol's answer to the record's question, or the probe's, or the default each takes while there is none. Text a section marks with an answer applies only while that answer is written in the line.") + ',')
A('  ' + js_str("A rung that measures the checker count or the distance stage takes as its before the last landed gate's table and per-site list, the ones the gate itself compares against (checker-count.txt and distance.txt in the newest explorations/compile-ladder/climb-batch-*/gate/, and explorations/compile-ladder/gate/distance-sites.tsv), and does not run the stage on its unchanged base; it runs the after once, on its own tree, into its tmp/SLUG/. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, No re-measuring what the record holds).") + ',')
A('  ' + js_str("Nothing is built or run twice on the same code (POSITIONS.md, Test first, the test kept; Nothing is built or run twice on the same code): a worker writes its test first, sees it fail through the harness and commits it alone, and its skeptic reads that order in the worker's transcript; a skeptic builds nothing and runs its own small programs with the rung's build for the new code and, for the old, in the rung's private copy of the base, seeded from the batch's one base build, in which nothing compiles or runs; the second skeptic checks the repair against its own refusal; no agent re-runs a build, a suite or a stage on a code state another agent has run.") + ',')
A('  ' + js_str("Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it: the worker and the repair round read that line before the entry and act on it, and the skeptic and the judges, who are not given the tail, find each key's line beside it in explorations/compile-ladder/plan-10/manifest/lists10.py.") + ',')
A("  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a declaration or a file section 4 of the record names as another rung\\'s.',")
A("  'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.',")
A('  ' + js_str("Every stop reserved for Pavol in this run is reversible (POSITIONS.md, Reversible stops do not hold a batch): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before. A stop that turns on a test's verdict is judged by the gate on the merged tree; a rung runs a whole suite only as the shared prefix allows a checker or walk rung, once per code state.") + ',')
A('  ' + js_str("An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, Reversible stops do not hold a batch).") + ',')
A('  ' + js_str("Every choice a rung makes that its section leaves to it is reported as a decision, with the alternatives considered and the evidence that settled it.") + ',')
A('  ' + js_str("No rung compares the interpreter corpus's outputs or runs a microGPT check; rung W's run of the team demos, under P1's answer only, is the read Pavol's decision on the demos names, verdicts and first error lines, no timing.") + ',')
A('  ' + js_str("The gather's rules: rows close only where their tests pass on the merged tree. Rungs G and N share Library/FortressLibrary.fsi and .fss by section and declaration, rungs W and C share Specification/appendices/changes.tex by entry, and the post-batch review ties every moved row of the merged tree's tables to a rung's edit. A new test cites the specification by file and section or entry, never by line; a rung that renames or removes a cited section updates that citation in the commit of its edit.") + ',')
A('  ' + js_str("No rung commits Specification/fortress.pdf: the commit stage rebuilds the specification once on the landed tree, since rungs W and C edit its text and rungs G and N the .fsi files Part IV is rendered from.") + ',')
A('  ' + js_str("If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is a section of its REPORT.md, which the landing report carries to him.") + ',')
A('  ' + js_str("Cite a FACTS.md entry and a POSITIONS.md position by its bold title, since both files' line numbers move.") + ',')
A("].filter(Boolean).join(' ')")
A("const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + " + js_str("Shared: Library/FortressLibrary.fsi and .fss between G and N, by section and declaration as section 4 of the record names them (G the generator support, meta-generator, Maybe and reduction sections, Indexed, DelegatedIndexed and the generators of generators; N fail, the ordering, numeric and primitive sections, MatchFailure, LexicographicOrder, partition and __thrower; neither isLeftZero, strToInt, the arrays, the ranges or the strings); Specification/appendices/changes.tex between W and C, by entry; ProjectFortress/tests/ among W, G and N, on distinct files, and ProjectFortress/compiler_tests/ C's alone. A file added to ProjectFortress/tests/ moves the testSystem shards, which the gate compares by their sum. The checker count and the distance read C's, G's and N's changes; W's paths are ones neither stage reads; no rung predicts a total. The files every rung reaches are the record files, folded centrally by the gather."))
BLOCK = '\n'.join(L) + '\n'
open(OUT, 'w').write(BLOCK)
print('wrote', OUT, len(L), 'lines')
for rid in IDS:
    print(rid, len(tails[rid]), 'tail lines;', titles[rid])
