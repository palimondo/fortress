# Generates climb batch 9's MANIFEST block (CLIMB-BATCH-9.md, rungs W, K, R and S) from section 3 of the record and
# the briefing and checks lists of lists9.py, into $OUT9/manifest9.js ($FORTRESS_HOME/tmp by default, which is
# ignored); check9.js checks it. Copied from explorations/compile-ladder/plan-8/manifest/gen8.py: each tail is its
# rung's section word for word with the code-span backticks dropped, ASCII only, then its briefing entry by entry with
# one reason line each. The record holds no copy of the block (its section 7 says so), so the block is spliced into
# the script at the launch from this output alone. One value is set at launch and nowhere else: LEDGER_FROM, which the
# block refuses to load without. No rung declares an expectedCheckerCount, so the block has no CHECKER_BASE, and no
# rung lands only with another, so none has landsOnlyWith. Changed from gen8.py: the tail's lead line says the
# section is the whole brief, so that no agent opens the record for it (coordinator/skeptic-scope-judgement.md,
# section 5, item 4), and the intro states that a skeptic builds nothing and no stage is run twice on one code state
# (POSITIONS.md, Test first, the test kept; Nothing is built or run twice on the same code).
#   python3 gen9.py [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-9.md
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from lists9 import LISTS, REASONS, IDS

ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(HERE, '../../../..')))
args = [a for a in sys.argv[1:] if not a.startswith('--')]
REC = args[0] if args else os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-9.md')
OUT = os.path.join(os.environ.get('OUT9', os.path.join(ROOT, 'tmp')), 'manifest9.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([A-Z])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == list(IDS), [h.group(1) for h in heads]

META = {   # expectedMinutes sets the scatter's start order only
  'W': dict(path='/home/user/fortress-walkinst', minutes=210, writesState=False, testIsStage=False),
  'K': dict(path='/home/user/fortress-walkload', minutes=230, writesState=False, testIsStage=False),
  'R': dict(path='/home/user/fortress-ranges', minutes=260, writesState=False, testIsStage=True),
  'S': dict(path='/home/user/fortress-strings', minutes=190, writesState=False, testIsStage=True),
}
BLURB = {
  'W': "walk's instances: a type parameter nothing fixes whose bound does not mention it takes its declared bound, never Bottom (row 424's plain-bound half, and under P1's answer its F-bounded half); a lone parameter with no narrowest candidate takes its bound (row 516's walk half); several minimal common supertypes no longer stop walk (row 555); a typecase with no match throws MatchFailure (row 558); a generic functional method of a generic trait runs (row 567); the inference chapter's two notes on walk; Java under interpreter/evaluator/.",
  'K': "walk's load check: a closed trait's extenders checked at load by the 2012 reading (row 551), the overlap of a generic beside a plain declaration read for every shape of type parameter (row 552), and a key in the interpreter's test harness that names an expected refusal at load, with the gated tests of rows 534, 544 and 549; Java under interpreter/evaluator/ and tests/unit_tests/.",
  'R': "the range types: declarations on the meet for the per-provider pairs of functional methods (CAP 64, IN 30, rows 580 and 583) and Just's SQCAP, and the rest of the distance's errors in RangeInternals and in the ranges sections of FortressLibrary repaired as library slips, with row 586; library declarations only.",
  'S': "the string components: CatString's fields read as String's getters, the calls only walk resolves, the names the api lacks and the other distance errors of String, FlatString, Stream and the strings sections of FortressLibrary; under Q1 = (1) also item 20's three written bounds; library declarations only.",
}

def strip_ticks(t):
    return t.replace('`', '')

# The reasons block that ends each tail; check9.js finds it by this line.
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
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-9.md, section 3, under \"%s. %s\"), carried below word for word. It is the whole of what the record asks of this rung, so you need not open the record: its answers line says which of the record's questions and probes apply, and the decisions it builds are entries of your briefing, by their POSITIONS.md titles. After it comes your briefing entry by entry, each with why it is there; where the section says what the rung does, decides or records, that is you." % (rid, title_plain), '']
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
  'W': "W makes walk give a type parameter that nothing at a call fixes its declared bound, never Bottom, where the bound does not mention the parameter (Pavol's decision on the POPL 2019 paper's instance rule, row 424's plain-bound half; its F-bounded half, an unwritten SUM and the walk smoke test among it, only under P1's answer), give a lone parameter with no narrowest candidate its bound (row 516's walk half), stop crashing on several minimal common supertypes (row 555), throw MatchFailure from a typecase that matches nothing (row 558) and run a generic functional method of a generic trait (row 567); it promotes their expected failures and revises the inference chapter's two notes on walk and its Appendix I entry in the S1 form.",
  'K': "K makes walk check a closed trait's extenders at load as the compiled checker reads a comprises clause (row 551) and read the overlap of a generic beside a plain declaration for every shape of type parameter (row 552), and gives the interpreter's test harness a key that names an expected refusal at load, so that rows 534, 544 and 549 get gated expected-failure tests.",
  'R': "R repairs, with the library's own devices, the per-provider Meet Rule pairs of the range types (CAP 64, IN 30, row 580's IN on FullRange, row 583's map) and Just's SQCAP, and the rest of the distance's errors in RangeInternals and in the ranges sections of FortressLibrary, declared types to what their bodies answer, with row 586's UniformDistribution.",
  'S': "S repairs, with the library's own devices, the distance's errors in String, FlatString, Stream and the strings sections of FortressLibrary: CatString's fields that the checker reads as String's getters, the calls only walk resolves, the names the api lacks; under Q1 = (1) only, it also drops item 20's three written Object bounds.",
}
INTRO_STOPS = {
  'W': "for W, an interpreter test whose verdict changes other than by W's intent, a team test line changed or a demo edited, a parameter nothing fixes bound to anything but its declared bound, the F-bounded case changed without P1's answer or other than as its judgement decides, a change to which declaration walk chooses or to walk's choice of coercions, normative text beyond the two notes and the entry, and a library, checker or harness edit",
  'K': "for K, an interpreter or compiled test whose verdict changes other than by K's intent, a library type or a team test refused at load, a change to which declaration walk runs for a set it loads today, a key that lets an XXX file pass when the program fails for another reason than the refusal it names, and a library, checker or specification edit or a file of W's",
  'R': "for R, a team test line changed, a checker or walk edit, a pair whose only repair is a checker change, a device that states an exclusion false of some library type, a slip whose repair changes a value walk prints, and a declaration of S's section",
  'S': "for S, a team test line changed, a checker or walk edit, a site whose only repair is a checker change, a change to the shape of String's symbolic families, a repair that changes a value walk prints, and a declaration of R's section",
}
INTRO_LIFTED = {
  'W': "W changes the instance at which walk runs a generic declaration where nothing fixes a plain-bounded parameter or a lone parameter's arguments have no narrowest type, makes walk throw MatchFailure and run a generic functional method of a generic trait, promotes expected failures, and revises the inference chapter's notes on walk and its Appendix I entry, normative text in the S1 form",
  'K': "K makes walk refuse at load a program whose types break a closed trait's comprises clause and load generic-beside-plain sets the text allows, adds a key to the interpreter's test harness, and promotes an expected failure",
  'R': "R adds declarations on the meet and corrects declared types in the range types and in Random, and promotes an expected failure",
  'S': "S corrects fields, getters, declarations and declared types in the string components, and under Q1 = (1) drops three written bounds",
}
OVERLAP_RUNG = {
  'W': "W edits EvaluatorBase.java, types/FType.java (its join), types/TypeLatticeOps.java and Evaluator.java (row 558 only) under interpreter/evaluator/, and the file of walk's generic-method instantiation it names for row 567; adds and promotes files in ProjectFortress/tests/; and edits two notes of Specification/basic/inference.tex and the entry The inference of a call's static arguments of Specification/appendices/changes.tex.",
  'K': "K edits values/OverloadedFunction.java and BuildEnvironments.java under interpreter/evaluator/, and a load-time file it names, types/FType.java only for a declaration of its closure check it names, and tests/unit_tests/FileTests.java for the key; and adds and promotes files in ProjectFortress/tests/.",
  'R': "R edits Library/RangeInternals.fsi and .fss, the ranges sections of Library/FortressLibrary.fsi and .fss and Just's SQCAP there, and Library/Random.fsi and .fss, and adds and promotes files in ProjectFortress/tests/.",
  'S': "S edits Library/String.fsi and .fss, Library/FlatString.fsi and .fss, Library/Stream.fsi and .fss and the strings sections of Library/FortressLibrary.fsi and .fss (under Q1 = (1) also the three result-only declarations of FortressBuiltin, FortressLibrary and List), and adds a file in ProjectFortress/tests/.",
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
A('// rung\'s tail (explorations/compile-ladder/plan-9/manifest/lists9.py).')
A('//')
A('// Batch 9\'s values are CLIMB-BATCH-9.md, sections 3 and 6. Each tail is that')
A('// rung\'s section of section 3 word for word, with the record\'s code-span')
A('// backticks dropped (this file carries none), then its briefing\'s reasons;')
A('// ASCII only. Each section opens with its answers line, which the coordinator')
A('// writes in before the launch (Q1 for S, P1 for W). One value is set at launch')
A('// and nowhere else: LEDGER_FROM, the first free ledger row at the launch, which')
A('// the block refuses to load while unset. Manifest order is the ledger')
A('// numbering order: W, K, R, S. The scatter starts the longest expected first:')
A('// R, K, W, S. No rung declares a ladder move or a checker count. The base is')
A('// <base>, passed at launch as args.base, not written here. Each rung worker')
A('// makes its own worktree, at path on branch, by the shared prefix\'s command.')
A('// ===========================================================================')
A('')
A("const LEDGER_FROM = null   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A('')
A("const BATCH = '9'")
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-9.md'")
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
A('  ' + js_str("This run is climb batch 9, the record CLIMB-BATCH-9.md and phase 3's next batch after 8, toward the checker at a true zero: two walk rungs and two library rungs. It builds the walk rung PLAN names after batch 8, Pavol's decision on the POPL 2019 paper's instance rule under walk with the load-time checks and the harness key PLAN's lines give that rung (rungs W and K), and the library's own devices for the range types' per-provider Meet Rule pairs and for the ranges' and strings' slips (rungs R and S), with the record's Q1 and its probe P1 at the answers its sections record. Batch 8, its combined review, the restored microGPT inputs and the batch script's changes decided after batch 8 have landed before it.") + ',')
A('  RUNGS.map(r => INTRO_RUNG[r.id]).join(\' \'),')
A('  ' + js_str("Each rung's section of the record opens with its answers line: Pavol's answer to the record's question, or the probe's, or the default each takes while there is none. Text a section marks with an answer applies only while that answer is written in the line.") + ',')
A('  ' + js_str("A rung that measures the checker count or the distance stage takes as its before the last landed gate's table and per-site list, the ones the gate itself compares against (checker-count.txt and distance.txt in the newest explorations/compile-ladder/climb-batch-*/gate/, and explorations/compile-ladder/gate/distance-sites.tsv), and does not run the stage on its unchanged base; it runs the after once, on its own tree, into its tmp/SLUG/. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, No re-measuring what the record holds).") + ',')
A('  ' + js_str("Nothing is built or run twice on the same code (POSITIONS.md, Test first, the test kept; Nothing is built or run twice on the same code): a worker writes its test first, sees it fail through the harness and commits it alone, and its skeptic reads that order in the worker's transcript; a skeptic builds nothing and runs its own small programs with the rung's build for the new code and, for the old, in the rung's private copy of the base, seeded from the batch's one base build, in which nothing compiles or runs; the second skeptic checks the repair against its own refusal; no agent re-runs a build, a suite or a stage on a code state another agent has run.") + ',')
A('  ' + js_str("Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it: the worker and the repair round read that line before the entry and act on it, and the skeptic and the judges, who are not given the tail, find each key's line beside it in explorations/compile-ladder/plan-9/manifest/lists9.py.") + ',')
A("  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a declaration or a file section 4 of the record names as another rung\\'s.',")
A("  'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.',")
A('  ' + js_str("Every stop reserved for Pavol in this run is reversible (POSITIONS.md, Reversible stops do not hold a batch): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before. A stop that turns on a test's verdict is judged by the gate on the merged tree; a rung runs a whole suite only as the shared prefix allows a checker or walk rung, once per code state.") + ',')
A('  ' + js_str("An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, Reversible stops do not hold a batch).") + ',')
A('  ' + js_str("Every choice a rung makes that its section leaves to it is reported as a decision, with the alternatives considered and the evidence that settled it.") + ',')
A('  ' + js_str("No rung compares the interpreter corpus's outputs or runs a microGPT check; rung W's run of the team demos, under P1's answer only, is the read Pavol's decision on the demos names, verdicts and first error lines, no timing.") + ',')
A('  ' + js_str("The gather's rules: rows close only where their tests pass on the merged tree. Rungs R and S share Library/FortressLibrary.fsi and .fss by section, and the post-batch review ties every moved row of the merged tree's tables to a rung's edit. A new test cites the specification by file and section or entry, never by line; a rung that renames or removes a cited section updates that citation in the commit of its edit.") + ',')
A('  ' + js_str("No rung commits Specification/fortress.pdf: the commit stage rebuilds the specification once on the landed tree, since rung W edits its text and rungs R and S the .fsi files Part IV is rendered from.") + ',')
A('  ' + js_str("If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is a section of its REPORT.md, which the landing report carries to him.") + ',')
A('  ' + js_str("Cite a FACTS.md entry and a POSITIONS.md position by its bold title, since both files' line numbers move.") + ',')
A("].filter(Boolean).join(' ')")
A("const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + " + js_str("Shared: Library/FortressLibrary.fsi and .fss between R and S, by section as section 4 of the record names them (R the ranges sections and Just, S the strings sections but String's four symbolic families); interpreter/evaluator/types/FType.java between W and K only where K names a declaration of its closure check, never join; ProjectFortress/tests/ among all four, on distinct files. A file added to ProjectFortress/tests/ moves the testSystem shards, which the gate compares by their sum. The checker count and the distance read R's and S's changes; W's and K's paths are ones neither stage reads; no rung predicts a total. The files every rung reaches are the record files, folded centrally by the gather."))
BLOCK = '\n'.join(L) + '\n'
open(OUT, 'w').write(BLOCK)
print('wrote', OUT, len(L), 'lines')
for rid in IDS:
    print(rid, len(tails[rid]), 'tail lines;', titles[rid])
