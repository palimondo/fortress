
# Generates climb batch 6.5's MANIFEST block from section 3 of the record (CLIMB-BATCH-6.5.md) and the
# briefing and checks lists of lists65.py, into $OUT65/manifest65.js ($FORTRESS_HOME/tmp by default); check65.js
# checks it. The planner's generator as the top-tier review changed it (2026-09-27, climb-batch-6.5-review.md),
# brought to the tree of 2026-09-28: rung E widened to the nine natives rung O left and to rows 450 and 451, rung G's
# test of andCondCombine's shape, and Pavol's two process changes of 2026-09-28 (the landed gate's tables as a
# rung's "before", in the intro and the rungs' sections; a reason on each briefing key, rendered at the end of each
# tail from lists65.py). CHECKER_BASE, like LEDGER_FROM, is set at launch and the block refuses to load without it.
# The runs re-split on 2026-09-28 as Pavol's decision puts G first: 'first' is G and P, 'second' E and V.
# Amended on 2026-09-28 at the routing after the first run's review: E's intro and overlap strings name row 503's probe.
# Amended on 2026-09-29 for the second run, after batch N's first run: RUN is 'second', LEDGER_FROM 519 and
# CHECKER_BASE 75, as the coordinator gave them at N's landing (3fb0cd8c1); E's strings carry the tests batch N owes for rows 447
# and 505 (Pavol, 2026-09-29); the intro and the second run's overlaps name batch N's landed rungs and tables; the
# record is read from $REC65 when it is set (a draft), else from the committed record.
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lists65 import LISTS, REASONS

ROOT = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
REC = os.environ.get('REC65') or os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-6.5.md')
OUT = os.path.join(os.environ.get('OUT65', os.path.join(ROOT, 'tmp')), 'manifest65.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([EPGV])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == ['E', 'P', 'G', 'V'], [h.group(1) for h in heads]

META = {
  'E': dict(path='/home/user/fortress-sizerange', minutes=210, writesState=False),
  'P': dict(path='/home/user/fortress-intprose', minutes=120, writesState=False),
  'G': dict(path='/home/user/fortress-genrt', minutes=300, writesState=True),
  'V': dict(path='/home/user/fortress-rr32', minutes=150, writesState=False),
}
BLURB = {
  'E': "both paths refuse a size beyond NN32 (ZZ32 for an int size) as the decision on a size's range says, walk reads the sizes in range exactly (row 418), NatRtBigSize restated to the range; walk's LCM on the unsigned types, ^ and CHOOSE raise IntegerOverflow where the result does not fit (NN32's LCM and the nine natives rung O left); and the range bodies of rows 450 and 451 reordered on the checked operators; with the link and XXX run tests batch N owes for rows 447 and 505, tests only; Scala under scala_src/, Java under interpreter/, and two library files.",
  'P': "the integer rules of 2026-09-22 and 2026-09-24 in the specification in the S1 form, row 394's coercion example given its exclusion, the rational type's listing given the library's algebra, the test citations rung S moved that batch 7C's rung X listed re-anchored, the scalar block's comment reworded, and the expected-failure walk tests rows 440 and 443 owe; an original-tree edit, no source file.",
  'G': "the compiled path's generics at run time: the class loader's first load at four threads (row 417), a parallel task in a generic declaration (row 419), a generic method over two sets of parameters (row 420), the two dispatch defects, and a typecase or catch clause's bound name (row 351, the cause of row 426), with answer 7's identity functions passing values of type T through cast; Java under runtimeSystem/ and compiler/.",
  'V': "RR32 a sibling of RR64 under Number (route A, answer 8): RR64 converts from it, its arithmetic takes an RR32 (row 435), the team's test lines that assert the subtype restated with their values, and one sentence in the number chapter in the S1 form; library and builtin declarations only.",
}

def strip_ticks(t):
    return t.replace('`', '')

# The reasons block that ends each tail (Pavol, 2026-09-28, 14:18 UTC; the process review's measure 5). check65.js
# finds it by this line.
REASONS_HEAD = "**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it."

tails = {}
titles = {}
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
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.5.md, section 3, under \"%s. %s\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there." % (rid, title_plain), '']
    lines += [strip_ticks(l) for l in body.split('\n')]
    lines += ['', REASONS_HEAD]
    lines += ['- %s: %s' % (k, r) for k, r in REASONS[rid]]
    lines += ['']
    for l in lines:
        assert all(ord(c) < 128 for c in l), (rid, l[:80])
    tails[rid] = lines
    titles[rid] = (title_plain, slug, branch)

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
    # the last line has no trailing comma; earlier lines end with a comma
    return '\n'.join(out)

INTRO_RUNG = {
  'E': "E makes both paths refuse a size beyond NN32 (ZZ32 for an int size), as the decision on a size's range says; walk reads the sizes in range exactly (row 418); NatRtBigSize is restated to the range; NN32's LCM raises IntegerOverflow where the multiple does not fit, and so do the nine natives rung O left, ^ and CHOOSE on the four fixed widths and NN64's LCM (row 347); and the range bodies that relied on wrapping are reordered on the checked operators, as Pavol decided for the strided distance (rows 450 and 451); beside them it probes under walk the six tuple shifts of row 503; and it writes the tests batch N's first run owes by Pavol's decision of 2026-09-29, a plain link test and an XXX run test for each of the two programs that batch N's checker newly compiles and that then die in the JVM (rows 447 and 505), deciding nothing about what a type parameter nothing at the call fixes is bound to (PLAN.md item 18).",
  'P': "P writes the integer rules of 2026-09-22 and 2026-09-24 into the specification in the S1 form, gives row 394's coercion example the exclusion its definition needs, states the library's algebra in the rational type's listing, re-anchors the test citations rung S moved and those its own edits move, rewords the scalar block's comment, and writes the expected-failure walk tests rows 440 and 443 owe.",
  'G': "G repairs the compiled path's generics at run time: the class loader's first load at four threads (row 417), a parallel task in a generic declaration (row 419), a generic method over two sets of parameters (row 420), the two dispatch defects with the measured change, and a typecase or catch clause's bound name (row 351, the cause of row 426, at cast and at andCondCombine), with answer 7's identity functions passing values of type T through cast.",
  'V': "V makes RR32 a sibling of RR64 under Number (route A, answer 8): RR64 converts from it, its arithmetic takes an RR32 (row 435), and the number chapter names it in the S1 form.",
}
INTRO_STOPS = {
  'E': "for E, a library declaration newly refused, a test's verdict changing other than its own, NatRtBigSize's restated lines and the three promoted range tests, a size inside NN32 or ZZ32 that stops reading back or dispatching, the type of a size read as a value changed, an interpreter output the natives or the range bodies change and a library body or team test found to rely on a native's wrap, a range whose elements all fit its type answering differently from the base, a negative power's branch or the power's declared type changed, for the owed tests of rows 447 and 505 an edit to the checker's inference or solver or to the run time or an assertion of what a parameter nothing fixes is bound to, and an edit to compiler/StaticChecker.java, to a library line other than the range bodies of rows 450 and 451, or to a file its section does not name",
  'P': "for P, any edit under Specification-1.0-frozen/, normative text for a rule neither path runs, a passage whose new text neither the decisions nor the landed code settles (reported, not chosen), an assertion changed in a re-anchored test, and a library line other than the scalar block's two comments",
  'G': "for G, a compiled test's verdict changing other than its own, a ladder file moving down, a four-thread run that deadlocks or times out twice, a compiler-library jar changing other than where a named fix predicts it, and an edit to the checker, walk or any library line other than the two identity functions",
  'V': "for V, a changed walk output its comparison does not account for, a team test line changed other than one that asserts RR32 below RR64 (keeping its value), a coercion beyond RR64's from RR32, and the specification's sentence stating more than the landed library",
}
INTRO_LIFTED = {
  'E': "E restates NatRtBigSize's lines beyond NN32, moving its three lines beyond 4294967295 to the refusal test, and renames row 418's expected failure into a plain test (the decision on a size's range), and renames the three expected failures of rows 450 and 451 into plain tests once they pass, no assertion changed (POSITIONS.md, 2026-09-26, rung O of climb batch 4)",
  'V': "V restates RR32's declarations and the team's test lines that assert RR32 below RR64, each keeping the value it checks, and renames row 435's expected failure into a plain test (route A and answer 8)",
}
OVERLAP_RUNG = {
  'E': "E edits checker files under ProjectFortress/src/com/sun/fortress/scala_src/, possibly runtimeSystem/MethodInstantiater.java, interpreter/evaluator/EvalType.java and what else walk's reading needs, the Lcm, Choose and Pow classes and their helpers in interpreter/glue/prim/Int.java, Long.java, NN32.java and UnsignedLong.java, the range bodies of rows 450 and 451 in Library/RangeInternals.fss and CompactFullRange's opr |self| in Library/FortressLibrary.fss, ProjectFortress/compiler_tests/NatRtBigSize.fss and new tests there, the owed pairs of rows 447 and 505 among them, and renames ProjectFortress/tests/XXXNatBigSizeWalk.fss and the three range tests of rows 450 and 451 and adds tests there.",
  'P': "P edits Specification/ (never Specification-1.0-frozen/, and not Specification/fortress.pdf, which the gather rebuilds), the messages and comments of five revival tests and of any test whose citation its edits move, the scalar block's two comments in Library/FortressLibrary.fss and .fsi, and adds two XXX walk tests in ProjectFortress/tests/.",
  'G': "G edits runtimeSystem/InstantiatingClassloader.java, RTHelpers.java and what the lock or row 420 needs, compiler/codegen/CodeGen.java and compiler/OverloadSet.java, additiveIdentity and multiplicativeIdentity in Library/FortressLibrary.fss, and adds and promotes tests in ProjectFortress/compiler_tests/ and library_tests/.",
  'V': "V edits RR32's declarations in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, Number's comprises clause and =, and RR64's header and a coerce, in Library/FortressLibrary.fsi and .fss, the team's test lines that assert the subtype, the numbers.tex passage and its entries in Specification/appendices/changes.tex, and adds a test and renames XXXRR32MixedRungF.fss in ProjectFortress/tests/.",
}

L = []
A = L.append
A('// ===========================================================================')
A('// MANIFEST - the coordinator replaces everything between this line and the')
A('// "END MANIFEST" line, and changes nothing else in this file.')
A('//')
A('// Concurrency, which the manifest does NOT set: at most two agents at once here')
A('// (FACTS.md, "The container"), a freed slot going to the next queued agent,')
A('// FIFO. k is 2 in each run of this batch (G, P; then E, V), 4 as one run.')
A('// Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start order')
A('// only), tail (the brief), blurb (one line for the shared prefix\'s table),')
A('// writesState, expectedMoves, and the checker-count fields testIsStage,')
A('// expectedCheckerCount (a printed prediction, never red) and')
A('// expectedCheckerCrash (compared exactly with the table\'s #crash field; no')
A('// rung of this batch declares one, so any change of the crash row is red).')
A('// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; no')
A('// rung of this batch sets it. briefing, the rung\'s briefing, which the')
A('// planner writes from the record so that the agents learn in context what')
A('// they were never trained on: the keys of')
A('// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries')
A('// (positions:DATE WORDS), gap-ledger rows (ledger:ROW) and earlier judges\'')
A('// rulings (doc:PATH#HEADING) the rung rests on; the specification\'s sections')
A('// its subject touches (doc: on a .tex heading); the notes already written on')
A('// the subject, found through INDEX.md (doc:, index:); the library code that is')
A('// the precedent for the same kind of problem (code:PATH#FROM..TO); and the')
A('// FACTS.md entries and map rows and sections of its area; in reading order,')
A('// decisions first; the tool\'s --help. Relevance, not size, decides what goes')
A('// in. The rung worker reads it whole as its step 1. And checks, the sub-list')
A('// of briefing that the skeptic, the repair round and the judges read as their')
A('// step 1: the decisions and ledger rows their checks need, and the')
A('// specification\'s sections and the precedent code those checks compare against. No key holds a')
A('// double quote, backtick, dollar sign or backslash, since each is rendered in')
A('// double quotes. Each list is checked with the tool\'s --check to match exactly')
A('// one place per key (on the tree of 2026-09-28; re-checked at each launch).')
A('// Each briefing key has a one-line reason, why it is there and what the rung')
A('// does with it, rendered at the end of the rung\'s tail (lists65.py; Pavol,')
A('// 2026-09-28, the process review\'s measure 5).')
A('//')
A('// Batch 6.5\'s values are CLIMB-BATCH-6.5.md, sections 3, 6 and 7. Each tail is')
A('// that rung\'s section of section 3 word for word, with the record\'s code-span')
A('// backticks dropped (this file carries none), then its briefing\'s reasons;')
A('// ASCII only. No section carries an answer letter: section 1\'s one question')
A('// is answered and changes no rung. Three things')
A('// are set at launch and nowhere else: RUN (which run this is: \'first\' is')
A('// batch 6.5, rungs G and P; \'second\' is batch 6.5b, rungs E and V, cut from')
A('// the tree the first run landed; \'all\' is the four as one batch 6.5, on')
A('// Pavol\'s word, with P\'s and V\'s shared specification files ordered as the')
A('// record\'s section 4 says; the record\'s section 1, "Two runs"), LEDGER_FROM (the first free ledger')
A('// row at this run\'s launch; the block refuses to load while it is unset), and')
A('// CHECKER_BASE (the #total of the last landed checker-count.txt, the one the')
A('// gate compares against; the block refuses to load while it is unset).')
A('// Manifest order is the ledger numbering order: G, P in the first')
A('// run; E, V in the second; G, P, E, V as one run. The scatter starts the')
A('// longest expected first (G, P; E, V; G, E, V, P). E, P and G predict the')
A('// checker total unchanged; V declares no prediction and reports its table.')
A('// No rung declares a ladder move. The base is <base>, passed at launch as')
A('// args.base, not written here.')
A('// ===========================================================================')
A('')
A("const RUN = 'second'       // SET AT LAUNCH: 'first' (batch 6.5: G and P, landed 2026-09-28), 'second' (batch 6.5b: E and V) or 'all' (the four as one batch 6.5, on Pavol's word only); the record's section 1, \"Two runs\"")
A("const LEDGER_FROM = 519   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch (519: row 518 the highest after batch N's first run landed, 3fb0cd8c1)")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A("const CHECKER_BASE = 75   // SET AT LAUNCH: the #total of the last landed checker-count.txt (75 in climb-batch-N/gate/, batch N's first run's landed table, for the second run)")
A("if (!Number.isInteger(CHECKER_BASE)) throw new Error('CHECKER_BASE is not set: the #total of the last landed checker-count.txt')")
A('')
A("if (!['first', 'second', 'all'].includes(RUN)) throw new Error('RUN is not one of first, second, all')")
A("const BATCH = RUN === 'second' ? '6.5b' : '6.5'")
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-6.5.md'")
A('')
for rid in 'EPGV':
    A('const %s_TAIL = [' % rid)
    for l in tails[rid]:
        A(js_str(l) + ',')
    A("].join('\\n')")
    A('')
for rid in 'EPGV':
    title_plain, slug, branch = titles[rid]
    m = META[rid]
    b, c = LISTS[rid]
    exp = ' expectedCheckerCount: CHECKER_BASE,' if rid in 'EPG' else ''
    A("const %s_ENTRY = { id: '%s', slug: '%s', path: '%s', branch: '%s', tail: %s_TAIL, expectedMinutes: %d, writesState: %s, testIsStage: false,%s" % (
        rid, rid, slug, m['path'], branch, rid, m['minutes'], 'true' if m['writesState'] else 'false', exp))
    A('    blurb: ' + js_str(BLURB[rid]) + ',')
    A('    briefing: [')
    A(js_list(b) + '],')
    A('    checks: [')
    A(js_list(c) + '],')
    A('    expectedMoves: [] }')
    A('')
A("const RUNGS = RUN === 'first' ? [G_ENTRY, P_ENTRY] : RUN === 'second' ? [E_ENTRY, V_ENTRY] : [G_ENTRY, P_ENTRY, E_ENTRY, V_ENTRY]")
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
A('  ' + js_str("This batch is the repair batch of the plan's phase 2b (explorations/coordinator/PLAN.md, \"Phase 2b. The repair batch from the conformance reviews\"): what the conformance reviews of batches 3 to 6 found, with three findings of the reviews of batches 6b, 7 and 7R, repaired before phase 3.") + ',')
A("  RUN === 'first' ? " + js_str("This run is its first, batch 6.5, rungs G and P; the second, batch 6.5b, carries rungs E and V and is cut from the tree this run lands. G runs first by Pavol's decision, since its rows are on microGPT's compiled run (POSITIONS.md, 2026-09-27, the numerics plans, decision 5); P and V edit the specification's number chapter and its changes appendix, so they run apart, and a run of the four would be the longest yet (the record's section 1, \"Two runs\").") + " : RUN === 'second' ? " + js_str("This run is its second, batch 6.5b, rungs E and V, cut from the tree batch N's first run landed (rungs I, K, T and M) on top of batch 6.5's first run (rungs G and P), whose P edited the specification's number chapter and its changes appendix before V does (the record's section 1, \"Two runs\"). Batch N's first run edited none of E's or V's declarations; where its checker's inference, walk's inference, the inference chapter and each integer type's own MIN, MAX and MINMAX meet E and V is in the record's section 4, \"Against batch N's first run\", and in each rung's section, \"Where this rung meets batch N\". It also carries, in rung E, the tests batch N's first run owes for rows 447 and 505 (POSITIONS.md, 2026-09-29, batch N's first run).") + " : " + js_str("This run carries the batch's four rungs as one, on Pavol's word; P and V share Specification/basic-lib/numbers.tex and Specification/appendices/changes.tex, which the gather orders as the record's section 4 says (the record's section 1, \"Two runs\").") + ',')
A("  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),")
A('  ' + js_str("Each rung's section of the record opens with the answers of its section 1 that it follows; section 1's one question is answered (batch N carries the numeral switch) and changes no rung.") + ',')
A('  ' + js_str("A rung that captures the checker count or the distance stage before and after its edit takes as its before the last landed gate's table, the one the gate itself compares against (checker-count.txt or distance.txt in the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: climb-batch-7C/gate/ for the first run; for the second, climb-batch-N/gate/, batch N's first run's, which landed after the first), and does not run the stage on its unchanged base; it captures only the after, on its own tree. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, 2026-09-28, on rungs re-running measurements the landed gate had already taken; the process review's measure 4, explorations/reviews/process-review-6b-7-7R.md section 9).") + ',')
A('  ' + js_str("Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it (the same review's measure 5, approved with it): the worker reads that line before the entry and acts on it, and the skeptic, the repair round and the judges find the same lines in each tail of the record's section 7.") + ',')
A("  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file another rung of this run owns.',")
A("  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',")
A('  ' + js_str("Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next run waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.") + ',')
A('  ' + js_str("An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).") + ',')
A('  ' + js_str("A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1); the gather re-anchors the same way a citation that one rung's edit moved in another rung's test.") + ',')
A('  ' + js_str("If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5, 4 and 5.") + ',')
A('  ' + js_str("Cite a FACTS.md entry by its bold title beside its line, since the gather's own insertions move lines.") + ',')
A('  ' + js_str("Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).") + ',')
A("].filter(Boolean).join(' ')")
A("const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + (RUN === 'first'")
A('  ? ' + js_str("One file is shared, Library/FortressLibrary.fss, on two declarations far apart: G's two identity functions after the reductions (about :3124-3148 on the record's tree) and P's scalar block comment near the end (about :4596-4601); the gather applies G first, then P. The identity functions have no api declaration, so P's comment in the .fsi is P's alone. G touches no Specification/ file and P no source file. The shared directories are ProjectFortress/compiler_tests/ and library_tests/, where G adds and promotes its tests and P edits the messages of two compiler tests and of MaybeRungM, disjoint files; G's tests cite none of the chapters P edits, so P's re-anchoring reaches none of them. P's two new tests go to ProjectFortress/tests/, which moves the testSystem shards, compared by their sum. G changes no declared type and P two comments, so neither moves the checker count. The files they reach beyond their own are the three record files, FACTS.md, the ledger and the handover, folded centrally by the gather.") )
A("  : RUN === 'second'")
A('  ? ' + js_str("One file is shared, Library/FortressLibrary.fss, on disjoint declarations far apart: V's Number and RR64 near the top of the tower (about :358-406) and E's CompactFullRange opr |self| (about :3912-3924 on the tree batch N landed, below its rung M's integer members and batch 6.5's rung G's identity functions); the gather applies V first, then E. The .fsi and ProjectFortress/LibraryBuiltin/ are V's alone; Library/RangeInternals.fss, the four glue files Int.java, Long.java, NN32.java and UnsignedLong.java, the checker and the evaluator are E's alone (RR32's natives are glue/prim/RR32.java, should V's fallback touch one). ProjectFortress/tests/ gets both rungs' files, disjoint: E renames XXXNatBigSizeWalk.fss and the three range tests of rows 450 and 451 and adds two, and a third if the tuple shifts of row 503 fail under walk, V renames XXXRR32MixedRungF.fss and adds one; compiler_tests/ is E's, its refusal test, NatRtBigSize and the owed pairs of rows 447 and 505. E touches no Specification/ file; V's numbers.tex passage and Appendix I entries sit on the tree P and batch N's rung T landed, V's entries after T's \"The inference of a call's static arguments\". E's test messages cite the integer chapter as P and T left it, and the gather checks P's landed integer text against E's natives: for CHOOSE and the power P's text rests on the specification's general sentence (Specification/basic/operators/opr-overview.tex:154-155). Both rungs compare the interpreter corpus in three passes, each on its own branch; they share the box, not a file. Batch N's first run is landed under both and edited none of their declarations: E's opr |self| calls rung M's own ZZ32 MAX, V restates RR32's own MIN, MAX and MINMAX, the family of M's device, walk's and the checker's inference with coercion (rungs K and I) read V's new coercion, and E keeps rung K's XXXNatValueNN32RungK (row 486) as it is; the record's section 4 lists them declaration by declaration. The checker count reads V's changed declared types, so V's table is the only one that may move. The files they reach beyond their own are the three record files, FACTS.md, the ledger and the handover, folded centrally by the gather.") )
A('  : ' + js_str("Each pair of the two runs shares Library/FortressLibrary.fss on declarations far apart (G and P, E and V). P and V share Specification/basic-lib/numbers.tex on disjoint passages (V's at about :27-49, P's rational listing at about :92-93 and :144-145 on the record's tree; V applied first there) and Specification/appendices/changes.tex at one place, since each adds its subsections after the appendix's last revision entry: the gather applies P's entries before V's, resolving the same-point hunk by hand as its rule allows for unrelated regions, and says so. Library/FortressLibrary.fss is edited by V (Number and RR64 near the top), G (the identity functions after the reductions), E (CompactFullRange's opr |self|) and P (the scalar block's two comments near the end), disjoint; V applied first, then G, then E, then P. P's edits may move a specification line one of E's new test messages cites, which the gather re-anchors by passage, and the gather checks P's integer text against E's natives. The shared directories are ProjectFortress/tests/, compiler_tests/ and library_tests/, where the rungs touch disjoint files. V's table is the only checker table that may move. The files they reach beyond their own are the three record files, folded centrally by the gather.") + ')')
open(OUT, 'w').write('\n'.join(L) + '\n')
print('wrote', OUT, len(L), 'lines')
for rid in 'EPGV':
    print(rid, len(tails[rid]), 'tail lines;', titles[rid])
