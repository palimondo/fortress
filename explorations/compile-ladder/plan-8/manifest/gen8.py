# Generates climb batch 8's MANIFEST block (CLIMB-BATCH-8.md, rungs I, O, Q and M) from section 3 of the record and
# the briefing and checks lists of lists8.py, into $OUT8/manifest8.js ($FORTRESS_HOME/tmp by default, which is
# ignored); check8.js checks it. Copied from explorations/compile-ladder/plan-7b/manifest/gen7b.py: each tail is its
# rung's section word for word with the code-span backticks dropped, ASCII only, then its briefing entry by entry with
# one reason line each. The record holds no copy of the block (its section 7 says so), so the block is spliced into
# the script at the launch from this output alone. One value is set at launch and nowhere else: LEDGER_FROM, which the
# block refuses to load without. No rung declares an expectedCheckerCount, so the block has no CHECKER_BASE, and no
# rung lands only with another, so none has landsOnlyWith. Since 2040cd056 no test citation is re-anchored by a rung,
# and nothing here asks for it.
#   python3 gen8.py [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-8.md
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from lists8 import LISTS, REASONS, IDS

ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(HERE, '../../../..')))
args = [a for a in sys.argv[1:] if not a.startswith('--')]
REC = args[0] if args else os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-8.md')
OUT = os.path.join(os.environ.get('OUT8', os.path.join(ROOT, 'tmp')), 'manifest8.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([A-Z])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == list(IDS), [h.group(1) for h in heads]

META = {   # expectedMinutes sets the scatter's start order only
  'I': dict(path='/home/user/fortress-bound', minutes=240, writesState=False, testIsStage=False),
  'O': dict(path='/home/user/fortress-ovcheck', minutes=210, writesState=False, testIsStage=False),
  'Q': dict(path='/home/user/fortress-numlib', minutes=230, writesState=False, testIsStage=False),
  'M': dict(path='/home/user/fortress-meets', minutes=180, writesState=False, testIsStage=True),
}
BLURB = {
  'I': "the compiled checker's inference: a type parameter nothing at a call fixes takes its declared bound (Any if none) under what the expected type requires, never Bottom and never the union of the arguments' types (the paper's instance rule), and a call is tried by subtyping without the expected type first, kept when its result converts, before coercion with it (the order of attempts, row 508); rows 425, 447, 505, 515, 516 (compiled half), 518, 535 and 541; the inference chapter's Bottom passages and the team's draft note in the S1 form; Scala under scala_src/.",
  'O': "the compiled overloading checker: under Q1 = (a), functional methods checked by the specification's own Meet Rule for them, the per-provider check kept (row 556); an inherited method's type parameter no longer captured by its trait's; the overloading memo keyed on the trait's context; no crash on a character literal against the one library (row 477) or under a generic excludes clause (row 557); Scala and Java.",
  'Q': "the one library takes the compiler library's sibling IntLiteral under Number with a coerce into each number type, ZZ32's comparisons on ZZ32, each integer type's own CMP, MAXNUM and MINNUM (item 33, row 517), the numeral case in exactValue (Q-lib), and RR64 coerces from NN32 (R9); the literals, coercion and number chapters in the S1 form; the one measurement the numeral switch names, under walk; library and glue, no evaluator file.",
  'M': "the one library's remaining Meet Rule pairs inside one type repaired by its own devices (declarations on the meet), String's own juxtaposition pair, the Return Type Rule slips of its declarations, rows 483 and 531, and batch 7b's two review-routed test files; under Q1 = (a) no device for a top-level pair of two functional methods; library declarations only.",
}

def strip_ticks(t):
    return t.replace('`', '')

# The reasons block that ends each tail; check8.js finds it by this line.
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
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-8.md, section 3, under \"%s. %s\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are listed in section 2 of the record, and the questions its answers line names are in section 1; read them there." % (rid, title_plain), '']
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
  'I': "I makes the compiled checker bind a type parameter that nothing at a call fixes to its declared bound, Any if none, under what the expected type requires, never to Bottom and never to the union of the arguments' types (Pavol's decision on the POPL 2019 paper's instance rule), and try a call by subtyping without the expected type first, keeping that attempt when its result converts, before coercion with the context (his decision on row 508); it promotes or rewrites the expected failures of rows 447, 505, 508, 515, 516, 518, 535 and 541, gates row 425 where a compiled test can hold it, and revises the inference chapter's passages on Bottom and its Appendix I entry in the S1 form.",
  'O': "O makes the compiled overloading checker, under Q1 = (a), check pairs of functional methods by the specification's Meet Rule for them, which asks a meet only of a type that provides both, keeping the per-provider check (row 556); instantiates an inherited method without letting its trait's type parameter capture the method's; keys the overloading memo on the trait's context; and ends two crashes, every character literal typed by a name only the compiler's library declares (row 477) and the kind environment under a generic excludes clause (row 557).",
  'Q': "Q gives the one library the compiler library's numeral type, IntLiteral as a sibling under Number with a coerce into each number type, ZZ32's comparisons on ZZ32, each integer type's own CMP, MAXNUM and MINNUM (PLAN item 33, row 517) and the numeral case in exactValue, the library half of Pavol's numeral switch (Q-lib), with RR64 coercing from NN32 beside it (R9), the literals, coercion and number chapters in the S1 form, and takes the one measurement his decision names: where arithmetic lands under walk on the two microGPT programs and the interpreter tests.",
  'M': "M repairs, with the library's own devices, the Meet Rule pairs a type provides together, String's own juxtaposition pair and the Return Type Rule slips of the library's declarations, fixes rows 483 and 531, and rewords and renames the two test files batch 7b's merged-diff review left to the next batch; under Q1 = (a) it builds no device for a top-level pair of two functional methods, which rung O's rule takes.",
}
INTRO_STOPS = {
  'I': "for I, a compiled test whose verdict changes other than by I's intent, a change to answer 9's positional or return-type rule or to a file section 4 of the record names as O's, a parameter nothing fixes bound to anything but its bounds under the expected type, normative text beyond the inference chapter's named passages and entry, and any walk edit",
  'O': "for O, a compiled test whose verdict changes other than by O's intent, the Meet Rule dropped for a type that provides both functional methods or changed for a family that mixes a top-level function with functional methods (row 545), a change to answer 9's positional or return-type rule or to batch 7b's coverage check, any library edit, and a file section 4 names as I's",
  'Q': "for Q, a changed walk output its measurement does not account for, a changed value printed by either microGPT check, a team test line changed or a team expected failure turning green, an edit to the compiler library, the checker or walk's evaluator, Number's = changed beyond exactValue's numeral case, a comparison of numbers answering differently from the base where the values are equal, and a declaration section 4 names as M's",
  'M': "for M, a team test line changed, a checker or walk edit, a pair whose only repair is a checker change, a device that states an exclusion false of some library type, a slip whose repair changes a value walk prints, and a declaration section 4 names as Q's",
}
INTRO_LIFTED = {
  'I': "I changes which programs the compiled checker accepts and at which instance, and states the rule in the inference chapter, normative text in the S1 form, its departures removed from its Appendix I entry (the paper's instance rule and the order of attempts); it promotes expected failures, and rewrites row 535's link test into the refusal the rule gives",
  'O': "O makes the compiled checker accept pairs of functional methods the text accepts (under Q1 = (a)) and sets the checker's character type to the one library's Char, and promotes rows 556's and 557's expected failures",
  'Q': "Q changes the one library's numeral type and Number's and ZZ32's comprises clauses, adds coercions, comparisons, MAXNUM and MINNUM to the number types, and states them in three chapters in the S1 form (the numeral switch, R9 and item 33)",
  'M': "M adds declarations on the meet and corrects declared types in the library, and renames one walk test file with its component, no assertion changed (review-routed.2)",
}
OVERLAP_RUNG = {
  'I': "I edits Functionals.scala, STypesUtil.scala and Formula.scala under scala_src/ (and TypeAnalyzer.scala only for a solver declaration row 541 needs, named), adds, promotes and rewrites files in ProjectFortress/compiler_tests/, and edits Specification/basic/inference.tex and, in Specification/appendices/changes.tex, the entry The inference of a call's static arguments and its sentence of Passages not yet revised.",
  'O': "O edits OverloadingChecker.scala, OverloadingOracle.scala (the rule for functional methods only), TypeAnalyzer.scala (staticParam's caller, row 557) under scala_src/ and compiler/Types.java, and adds and promotes files in ProjectFortress/compiler_tests/.",
  'Q': "Q edits ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, the number types' declarations of Library/FortressLibrary.fsi and .fss that section 4 of the record names as Q's, interpreter/glue/prim/IntLiteral.java, the literals, coercion and number chapters, a new entry and the entry Integers in floating-point expressions of Specification/appendices/changes.tex, and adds and promotes files in ProjectFortress/tests/.",
  'M': "M edits the declarations of Library/FortressLibrary.fsi and .fss that section 4 of the record names as M's, Library/RangeInternals.fsi and .fss, Library/String.fss, Library/FlatString.fss and Library/Random.fsi and .fss, adds and promotes files in ProjectFortress/tests/, and rewords two test messages and renames one walk test file.",
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
A('// rung\'s tail (explorations/compile-ladder/plan-8/manifest/lists8.py).')
A('//')
A('// Batch 8\'s values are CLIMB-BATCH-8.md, sections 3 and 6. Each tail is that')
A('// rung\'s section of section 3 word for word, with the record\'s code-span')
A('// backticks dropped (this file carries none), then its briefing\'s reasons;')
A('// ASCII only. Each section opens with its answers line, which the coordinator')
A('// writes in before the launch. One value is set at launch and nowhere else:')
A('// LEDGER_FROM, the first free ledger row at the launch, which the block refuses')
A('// to load while unset. Manifest order is the ledger numbering order: I, O, Q, M.')
A('// The scatter starts the longest expected first: I, Q, O, M. No rung declares')
A('// a ladder move or a checker count. The base is <base>, passed at launch as')
A('// args.base, not written here. Each rung worker makes its own worktree, at')
A('// path on branch, by the shared prefix\'s command.')
A('// ===========================================================================')
A('')
A("const LEDGER_FROM = null   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A('')
A("const BATCH = '8'")
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-8.md'")
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
A('  ' + js_str("This run is climb batch 8, the record CLIMB-BATCH-8.md and phase 3's next batch after 7b, toward the checker at a true zero: two checker rungs and two library rungs. It builds Pavol's decisions of 2026-09-29 on the POPL 2019 paper's instance rule and on the order of the checker's attempts at a call (rung I), the library half of his numeral switch with NN32 coercing into RR64 beside it (rung Q), and the Meet Rule and the residue his decision on AnyIntegral's closure left to batch 8 (rungs O and M), with the record's Q1 to Q4 at the answers its section 1 records. Batch 7b and the batch script's fixes from its review have landed before it, and so has the one-time strip of the tests' specification line numbers.") + ',')
A('  RUNGS.map(r => INTRO_RUNG[r.id]).join(\' \'),')
A('  ' + js_str("Each rung's section of the record opens with its answers line: Pavol's answers to the record's questions, or the default each takes while he has not answered. Text a section marks with an answer applies only while that answer is written in the line.") + ',')
A('  ' + js_str("A rung that measures the checker count or the distance stage takes as its before the last landed gate's table and per-site list, the ones the gate itself compares against (checker-count.txt and distance.txt in the newest explorations/compile-ladder/climb-batch-*/gate/, and explorations/compile-ladder/gate/distance-sites.tsv), and does not run the stage on its unchanged base; it runs the after once, on its own tree, into its tmp/SLUG/. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, No re-measuring what the record holds).") + ',')
A('  ' + js_str("Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it: the worker and the repair round read that line before the entry and act on it, and the skeptic and the judges, who are not given the tail, find each key's line beside it in explorations/compile-ladder/plan-8/manifest/lists8.py.") + ',')
A("  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a declaration or a file section 4 of the record names as another rung\\'s.',")
A("  'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.',")
A('  ' + js_str("Every stop reserved for Pavol in this run is reversible (POSITIONS.md, Reversible stops do not hold a batch): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before. A stop that turns on a test's verdict is judged by the gate on the merged tree; a rung runs a whole suite only as the shared prefix allows a checker or walk rung, once per code state.") + ',')
A('  ' + js_str("An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, Reversible stops do not hold a batch).") + ',')
A('  ' + js_str("Every choice a rung makes that its section leaves to it is reported as a decision, with the alternatives considered and the evidence that settled it.") + ',')
A('  ' + js_str("The one corpus comparison in this run is rung Q's, named by Pavol's decision on the numeral switch: one edit pass over ProjectFortress/tests/ with the runner under explorations/coordinator/tools/count-run/, against the base pass the coordinator started before the launch, the listed unstable tests masked, and the two microGPT checks under walk once on Q's tree. No other rung compares the interpreter corpus's outputs or runs a microGPT check.") + ',')
A('  ' + js_str("The gather's rules: rows close only where their tests pass on the merged tree. Under Q1 = (a), the Meet Rule class is partitioned between rungs O and M by the shape of each error's message, and the post-batch review ties every moved row of the merged tree's tables to a rung's edit. A new test cites the specification by file and section or entry, never by line; a rung that renames or removes a cited section updates that citation in the commit of its edit.") + ',')
A('  ' + js_str("No rung commits Specification/fortress.pdf: the commit stage rebuilds the specification once on the landed tree, since rungs I and Q edit its text and rungs Q and M the .fsi files Part IV is rendered from.") + ',')
A('  ' + js_str("If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is a section of its REPORT.md, which the landing report carries to him.") + ',')
A('  ' + js_str("Cite a FACTS.md entry and a POSITIONS.md position by its bold title, since both files' line numbers move.") + ',')
A("].filter(Boolean).join(' ')")
A("const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + " + js_str("Shared: Library/FortressLibrary.fsi and .fss between Q and M, by declaration as section 4 of the record names them; Specification/appendices/changes.tex between I and Q, by entry; TypeAnalyzer.scala between O and I only where I names a solver declaration of its own; ProjectFortress/compiler_tests/ between I and O and ProjectFortress/tests/ between Q and M, on distinct files. A file added to ProjectFortress/tests/ moves the testSystem shards, which the gate compares by their sum. The checker count and the distance read I's, O's, Q's and M's changes alike; none predicts a total. The files every rung reaches are the record files, folded centrally by the gather."))
BLOCK = '\n'.join(L) + '\n'
open(OUT, 'w').write(BLOCK)
print('wrote', OUT, len(L), 'lines')
for rid in IDS:
    print(rid, len(tails[rid]), 'tail lines;', titles[rid])
