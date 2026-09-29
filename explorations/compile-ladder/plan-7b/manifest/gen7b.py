# Generates climb batch 7b's MANIFEST block, the second run of CLIMB-BATCH-7.md (rungs S, C, W and L), from section 3
# of the record and the briefing and checks lists of lists7b.py, into $OUT7B/manifest7b.js ($FORTRESS_HOME/tmp by
# default); check7b.js checks it. With --paste, it also writes the block into the record's section 7, between the
# ```js fence and its closing fence, so that the record carries the block it was generated as and nobody edits it by
# hand. Written 2026-09-28 in the form of explorations/compile-ladder/plan-6.5/manifest/gen65.py: each tail is its
# rung's section word for word with the code-span backticks dropped, ASCII only, then its briefing entry by entry with
# one reason line each (Pavol's two process changes of 2026-09-28: the landed gate's tables as a rung's "before", in the
# intro and the rungs' sections; a reason on each briefing key). The first run's block (H, A and B) was spliced at
# ff1649cea and landed; this block carries the second run alone, so it has no RUN switch. Three values are set at launch
# and nowhere else: LEDGER_FROM and CHECKER_BASE, which the block refuses to load without, and Q4, 1 for answer 9's rule as
# the record settles its Q4, 2 only if Pavol adds the domain condition before the launch; it sets rung C's predicted count.
#   python3 gen7b.py [RECORD] [--paste]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-7.md
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lists7b import LISTS, REASONS

ROOT = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
args = [a for a in sys.argv[1:] if not a.startswith('--')]
PASTE = '--paste' in sys.argv[1:]
REC = args[0] if args else os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-7.md')
OUT = os.path.join(os.environ.get('OUT7B', os.path.join(ROOT, 'tmp')), 'manifest7b.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([A-Z])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == ['S', 'C', 'W', 'L', 'H', 'A', 'B'], [h.group(1) for h in heads]
IDS = 'SCWL'

META = {
  'S': dict(path='/home/user/fortress-ovspec', minutes=120, writesState=False, testIsStage=False),
  'C': dict(path='/home/user/fortress-rtr', minutes=200, writesState=False, testIsStage=False),
  'W': dict(path='/home/user/fortress-dispatch', minutes=220, writesState=True, testIsStage=False),
  'L': dict(path='/home/user/fortress-families', minutes=180, writesState=False, testIsStage=True),
}
COUNT = {   # expectedCheckerCount, a printed prediction, never red
  'S': 'CHECKER_BASE',
  'C': 'CHECKER_BASE + (Q4 === 2 ? 4 : 2)',
  'W': 'CHECKER_BASE',
  'L': None,
}
BLURB = {
  'S': "the specification's two overloading chapters revised to the 2011 model the checker runs (answer 9): the sentence forbidding overloads that differ in static parameters goes, the paper's three rules and the positional rule are stated, the coercion chapter gains one cross-reference sentence (the conversion decision of 2026-09-28), the implicit bound becomes Any (Q1), the originals kept in the S1 form; under item 26's decision, four passages restated at the level of values with the Meet Rule's closed-trait case and the proof appendix revised to run-time uniqueness, its scope and row 487's closure assumption marked; under item 30's default, one sentence on the instance a declaration reached by dispatch runs at; under item 23's default, Appendix I's introduction names the decision each entry follows; batch N's inference chapter's callouts and Appendix I entry reworded, the entry listing the checker's four gated departures (rows 508, 515, 516 and 518); item 14's passage left while unanswered; an original-tree edit, Specification-1.0-frozen/ untouched, the PDF left to the gather. No source file and no test assertion.",
  'C': "the compiled checker's return-type rule checked over every instance, and the positional rule for generic declarations in the more-specific relation (answer 9; row 398 and defect 2), with the checker's half of row 492 (the meet of two closed traits read through their clauses, in a coverage check local to overload checking) and the typing of a call that sits between them, the proof addendum's acceptance pair, expected-failure compile tests, defect 3's and row 496's expected failures; Scala under scala_src/.",
  'W': "walk's choice between a generic and a plain declaration made on declared domains (answer 9; defect 1), the conversion decision's four items (compare on declared domains, hand the chosen generic to rung K's inference, dispatch the converted call again, lift the load check for O2Z64 and O2Meet), row 478's cache key, row 157's AnyType case, row 159's two walk tests promoted and row 492's walk half, its runtime selection the ordered candidate family the proof covers; Java under interpreter/.",
  'L': "the one library's refused overload families (the array MIN and MAX, String's juxtaposition against the ring, openRangeHelper, seq) repaired by its own devices (answer 9), two api headers made to say what their components say (PossibleReductionPair's parent, Range's excludes clause), and under item 22's default TotalComparison given StandardMinMax beside Comparison, the library's device, so that BIG MIN and BIG MAX over total comparisons answer again (row 461); library declarations only.",
}

def strip_ticks(t):
    return t.replace('`', '')

# The reasons block that ends each tail; check7b.js finds it by this line.
REASONS_HEAD = "**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it."

tails, titles = {}, {}
for i, h in enumerate(heads):
    rid, title, slug = h.group(1), h.group(2), h.group(3)
    if rid not in IDS:
        continue
    end = heads[i + 1].start()
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
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"%s. %s\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record, and the questions its answers line names are in section 1; read them there." % (rid, title_plain), '']
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
  'S': "S revises the specification's two overloading chapters to the 2011 model the checker runs (answer 9): the sentence that overloads may not differ in static parameters goes, the paper's three rules and the positional rule are stated, the coercion chapter gains one cross-reference sentence (the conversion decision of 2026-09-28), the implicit bound becomes Any (Q1, left to S by batch N's rung T), and the originals are kept in the S1 form; under item 26's decision it restates four passages at the level of values, gives the Meet Rule its closed-trait case and revises the proof appendix to run-time uniqueness, its scope and row 487's closure assumption marked; under item 30's default it says at which instance a declaration reached by dispatch runs; under item 23's default it rewords Appendix I's introduction to say that the entries follow the revival's decisions, each naming its own; and it rewords the claim of batch N's inference chapter and its Appendix I entry that the text states the rule the checker builds and no more, listing the checker's four gated departures (rows 508, 515, 516 and 518) in the entry.",
  'C': "C makes the compiled checker check the return-type rule over every instance and refuse an override that reorders its own static parameters (answer 9, row 398), repairs the checker's half of row 492 by reading the meet of two closed traits through their clauses, in a coverage check local to overload checking that leaves ordinary subtyping and assignment as they are, types a call that sits between them by the intersection of its candidates' return types, with the proof addendum's acceptance pair as tests, and writes the expected failures of defect 3 and of row 496's two crashes.",
  'W': "W makes walk choose between a generic and a plain declaration on their declared domains, so that the order they were written in no longer decides (answer 9), with the conversion decision's four items, row 478's cache key, row 157's AnyType case, row 159's two tests promoted and row 492's walk half, its runtime selection the ordered candidate family the proof covers.",
  'L': "L repairs the one library's refused overload families with the library's own devices (answer 9), makes two api headers say what their components say, and under item 22's default gives TotalComparison the StandardMinMax parent beside Comparison, the library's device for a partial order that also has MIN and MAX.",
}
INTRO_STOPS = {
  'S': "for S, any edit under Specification-1.0-frozen/, normative text for a rule neither path will run once C lands, new text for a passage of an item whose answers line says not answered, a soundness claim for the coverage case stated without its scope and row 487's assumption, and a passage whose new text the decisions and judgements do not settle",
  'C': "for C, an edit to compiler/StaticChecker.java, a library declaration newly refused that its section does not assign to rung L, a compiled test's verdict changing other than its own and row 492's, SkBetweenAssign's compiled verdict changing or BetweenTwoClosed's other than as the intersection typing gives, CoverageReturnBad accepted or CoverageReturnGood's verdict differing between its declaration orders, a change to the checker's shared subtyping, meet, equivalence or normalizer or to TypeHierarchyChecker.scala (the fallback's condition, reported and not made), a stack overflow in the meet search, a ladder file moving down, and any walk edit",
  'W': "for W, a changed walk output that is not a call whose chosen declaration changed as the decisions give, a changed microGPT value, an overload set whose load-time verdict changes other than the shapes its section names, and SkBetweenAssign's walk verdict changing",
  'L': "for L, a team test line changed, a family whose only repair is a checker change, TotalComparison changed other than as item 22's default (b) states in its section, the value-form factories changed under Q4 = (1), and a changed walk output other than BIG MIN's and BIG MAX's over total comparisons",
}
INTRO_LIFTED = {
  'S': "S rewrites normative text of the specification and re-anchors the citations its edits move in test messages, no assertion changed (answer 9; the S1 form)",
  'C': "C makes the checker refuse two shapes it accepts today and, with row 492, accept the specification's Meet Rule example, typing a call that sits between two closed traits (answer 9; item 26's decision), and renames row 492's compiled expected failure into a plain test once it passes, its program unchanged",
  'W': "W changes which declaration walk runs where a generic and a plain declaration tie, and which overload sets walk loads where the checker accepts them, and instantiates a generic declaration declared to return Any (answer 9; the conversion decision of 2026-09-28; item 30's default), and renames row 492's walk expected failure into a plain test once it passes, no assertion changed",
  'L': "L adds exclusions and markers to library traits (answer 9), makes two api headers say what their components already say, and gives TotalComparison the StandardMinMax parent (item 22's default), restoring a walk answer of before batch 7",
}
OVERLAP_RUNG = {
  'S': "S edits Specification/basic/overloading.tex, advanced/overloading.tex, basic/conversions-coercions.tex (three passages), appendices/future.tex, its own subsections of appendices/changes.tex (after the last revision entry, before Passages not yet revised) and that subsection, basic/trait-parameters.tex (the implicit bound, which batch N's rung T left to S), under item 26's decision basic/types-vals-vars.tex, basic/functions.tex, basic/components/source-code.tex and appendices/overloading-function.tex, and basic/inference.tex (its two callouts) with its Appendix I entry (the rationale and the Effect); it re-anchors the citations its edits move in test messages; never Specification/fortress.pdf.",
  'C': "C edits checker files under ProjectFortress/src/com/sun/fortress/scala_src/ (OverloadingOracle.scala, OverloadingChecker.scala, and under item 26's decision types/TypeAnalyzer.scala, for a coverage helper the overloading check alone calls, and the ambiguity check batch N built in typechecker/impls/Functionals.scala) and adds tests in ProjectFortress/compiler_tests/, where it renames XXXComprisesMeetCompiled once row 492's half passes.",
  'W': "W edits OverloadedFunction.java, FGenericFunction.java, GenericFunctionOrMethod.java, GenericConstructor.java, under the judgements' defaults MakeInferenceSpecific.java and types/FType.java and FTypeTuple.java, and what else under interpreter/ it needs, not interpreter/glue/prim/, and adds tests in ProjectFortress/tests/, where it renames XXXComprisesMeetWalk.fss once row 492's half passes.",
  'L': "L edits Library/RangeInternals.fsi and .fss and, in Library/FortressLibrary.fsi and .fss, only the declarations section 4 of the record names as L's, and adds one test in ProjectFortress/tests/.",
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
A('// expectedCheckerCrash (compared exactly with the table\'s #crash field; no')
A('// rung of this batch declares one, so any change of the crash row is red).')
A('// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; the')
A('// script applies it after the scatter, so S, which names C, reaches the gather')
A('// only when C is approved. briefing, the rung\'s briefing, which the planner')
A('// writes from the record so that the agents learn in context what they were')
A('// never trained on: the keys of explorations/coordinator/tools/facts-extract.sh')
A('// for the POSITIONS.md entries (positions:DATE WORDS), gap-ledger rows')
A('// (ledger:ROW) and earlier judges\' rulings and notes (doc:PATH#HEADING) the')
A('// rung rests on; the specification\'s sections its subject touches (doc: on a')
A('// .tex heading); the library and source code that is the precedent or the site')
A('// (code:PATH#FROM..TO); and the FACTS.md entries, map sections and INDEX lines')
A('// of its area; in reading order, decisions first. Relevance, not size, decides')
A('// what goes in. The rung worker reads it whole as its step 1. And checks, the')
A('// sub-list of briefing that the skeptic, the repair round and the judges read')
A('// as their step 1. No key holds a double quote, backtick, dollar sign or')
A('// backslash, since each is rendered in double quotes. Each list is checked with')
A('// the tool\'s --check to match exactly one place per key (re-checked on the')
A('// tree the run is cut from). Each briefing key has a one-line reason, why it is')
A('// there and what the rung does with it, rendered at the end of the rung\'s tail')
A('// (explorations/compile-ladder/plan-7b/manifest/lists7b.py; Pavol,')
A('// 2026-09-28, the process review\'s measure 5).')
A('//')
A('// Batch 7b\'s values are CLIMB-BATCH-7.md, sections 3, 6 and 7: the record\'s')
A('// second run. Each tail is that rung\'s section of section 3 word for word, with')
A('// the record\'s code-span backticks dropped (this file carries none), then its')
A('// briefing\'s reasons; ASCII only. Each section opens with its answers line,')
A('// which the coordinator writes in before the launch. Three values are set at')
A('// launch and nowhere else: LEDGER_FROM (the first free ledger row at the')
A('// launch) and CHECKER_BASE (the #total of the last landed checker-count.txt,')
A('// the one the gate compares against), which the block refuses to load while')
A('// unset, and Q4 (1 for answer 9\'s rule, as the record settles its Q4; 2 only if')
A('// Pavol adds the domain condition before the launch), which sets rung C\'s')
A('// predicted count. Manifest order is the ledger numbering')
A('// order: S, C, W, L. The scatter starts the longest expected first: W, C, L, S.')
A('// S and W predict the checker total unchanged, C the base plus the cond pair')
A('// (and the factories under Q4 = 2), L declares no prediction. No rung declares a')
A('// ladder move. The base is <base>, passed at launch as args.base, not written')
A('// here. The first run of the record (H, A and B) was spliced at ff1649cea and')
A('// landed as batch 7; its block is in git.')
A('// ===========================================================================')
A('')
A("const LEDGER_FROM = null   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A("const CHECKER_BASE = null   // SET AT LAUNCH: the #total of the last landed checker-count.txt, under explorations/compile-ladder/climb-batch-*/gate/")
A("if (!Number.isInteger(CHECKER_BASE)) throw new Error('CHECKER_BASE is not set: the #total of the last landed checker-count.txt')")
A("const Q4 = 1   // SET AT LAUNCH: 1, answer 9's rule (the record's Q4, settled); 2 only if Pavol adds the positional rule's domain condition before the launch")
A("if (Q4 !== 1 && Q4 !== 2) throw new Error('Q4 is not 1 or 2')")
A('')
A("const BATCH = '7b'")
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-7.md'")
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
    exp = (' expectedCheckerCount: %s,' % COUNT[rid]) if COUNT[rid] else ''
    low = " landsOnlyWith: ['C']," if rid == 'S' else ''
    A("const %s_ENTRY = { id: '%s', slug: '%s', path: '%s', branch: '%s', tail: %s_TAIL, expectedMinutes: %d, writesState: %s, testIsStage: %s,%s%s" % (
        rid, rid, slug, m['path'], branch, rid, m['minutes'], 'true' if m['writesState'] else 'false', 'true' if m['testIsStage'] else 'false', exp, low))
    A('    blurb: ' + js_str(BLURB[rid]) + ',')
    A('    briefing: [')
    A(js_list(b) + '],')
    A('    checks: [')
    A(js_list(c) + '],')
    A('    expectedMoves: [] }')
    A('')
A('const RUNGS = [S_ENTRY, C_ENTRY, W_ENTRY, L_ENTRY]')
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
A('  ' + js_str("This run is climb batch 7b, the second run of the record CLIMB-BATCH-7.md and phase 3's batch of answer 9, as Pavol decided it on 2026-09-26: the specification's sentence that overloads of one name may not differ in static parameters goes, in four rungs, specification, checker, walk and library, with the four small items of his decision on conversions and overloading of 2026-09-28, his decision of 2026-09-29 on the record's item 26, option 1 of its top-tier judgement with the three points of Astra's proof addendum built into the briefs of S, C and W, and the recommended option of the top-tier judgement on its item 30 and the recommended defaults of its items 22 and 23, all three the defaults while he has not answered. Batch 7 (rungs H, A and B), batches 7R and 7C, batch 6.5's two runs and batch N's two runs have landed before it, so the FortressLibrary api reaches its overloading check on the count stage, and walk's inference and its re-instantiation by promotion (batch N's rung K) are in the base.") + ',')
A('  RUNGS.map(r => INTRO_RUNG[r.id]).join(\' \'),')
A('  ' + js_str("Each rung's section of the record opens with its answers line: Pavol's answers to the record's questions, or the default each takes while he has not answered, and the items that stay open. Text a section marks with an answer applies only while that answer is written in the line; an item marked not answered is left as the section says, and new text for it is a stop.") + ',')
A('  ' + js_str("A rung that captures the checker count or the distance stage before and after its edit takes as its before the last landed gate's table and per-site list, the ones the gate itself compares against (checker-count.txt, distance.txt and distance-sites.tsv in the newest explorations/compile-ladder/climb-batch-*/gate/ on the base), and does not run the stage on its unchanged base; it captures only the after, on its own tree. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, 2026-09-28, on rungs re-running measurements the landed gate had already taken; the process review's measure 4, explorations/reviews/process-review-6b-7-7R.md section 9).") + ',')
A('  ' + js_str("Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it (the same review's measure 5, approved with it): the worker reads that line before the entry and acts on it, and the skeptic, the repair round and the judges find the same lines in each tail of the record's section 7.") + ',')
A("  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a declaration or a file section 4 of the record names as another rung\\'s.',")
A("  'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.',")
A('  ' + js_str("Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.") + ',')
A('  ' + js_str("An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).") + ',')
A('  ' + js_str("Every choice a rung makes that its section leaves to it is reported as a decision, with the alternatives considered and the evidence that settled it.") + ',')
A('  ' + js_str("The gather's rules: S lands only if C lands, whatever the approved list says: when C is not approved, the gather applies no file of S and folds its findings as for any rung that did not land. After S and C are applied, the gather checks each rule S's text states against C's landed test programs and the refusals they pin, fixes S's text where the decisions settle a mismatch and reports any other to the review as blocking. Row 492 closes only if both C's and W's halves land; if one lands alone, the row gets a note and the other half's expected failure stays. Under item 26's fallback, when C lands with row 492's expected failure kept because its half needs broader subtype or closure repairs, the gather leaves out S's P2 pieces (the Meet Rule's closed-trait case and its method forms, fact 2's restatement, the typing sentence, the proof appendix's revision and future.tex's done mark) and names P2 in Passages not yet revised with row 492 and batch 8, while S's P1, P3, P4 and covering land.") + ',')
A('  ' + js_str("A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1); the gather re-anchors the same way a citation that S's edit moved in another rung's new test.") + ',')
A('  ' + js_str("No rung commits Specification/fortress.pdf: after every rung is applied, the gather rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf), since Part IV is rendered from the .fsi files L changes and S edits the specification, and removes the build's ignored products.") + ',')
A('  ' + js_str("Four worktrees share one disk: a rung that runs the three-pass comparison over ProjectFortress/tests/ deletes each pass's caches under its tmp/ once the pass's outputs are captured, and reads df before each pass.") + ',')
A('  ' + js_str("If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5 to 7C.") + ',')
A('  ' + js_str("Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.") + ',')
A('  ' + js_str("Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).") + ',')
A("].filter(Boolean).join(' ')")
A("const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + " + js_str("No source, library or specification file is shared: L alone edits Library/, C alone scala_src/, W alone interpreter/, S alone Specification/. The shared directory is ProjectFortress/tests/, where W and L add files with names distinct by rung and W renames XXXComprisesMeetWalk.fss once row 492's walk half passes; S changes the messages and comments of existing tests only where its edits move a citation, never an assertion. A file added there moves the testSystem shards, which the gate compares by their sum. C's rule refuses the library's cond pair under the api's parent, and L's api line clears it, so the two meet only on the merged tree: C's table shows the new errors, L's its lines, the merged tree neither, and the review ties every moved row to a rung edit. The checker count reads C's and L's changes, not S's or W's. The files every rung reaches are the three record files, folded centrally by the gather."))
BLOCK = '\n'.join(L) + '\n'
open(OUT, 'w').write(BLOCK)
print('wrote', OUT, len(L), 'lines')
for rid in IDS:
    print(rid, len(tails[rid]), 'tail lines;', titles[rid])

if PASTE:
    fence = '\n```js\n'
    i = rec.index('\n## 7. The manifest\n')
    j = rec.index(fence, i) + len(fence)
    k = rec.index('\n```\n', j - 1)
    new = rec[:j] + BLOCK + rec[k + 1:]
    open(REC, 'w').write(new)
    print('pasted the block into', REC, 'section 7')
