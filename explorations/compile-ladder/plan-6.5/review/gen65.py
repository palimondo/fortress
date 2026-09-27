
# Generates climb batch 6.5's MANIFEST block from section 3 of the record (CLIMB-BATCH-6.5.md) and the
# briefing and checks lists of ../manifest/lists65.py, into $FORTRESS_HOME/tmp/manifest65.js; ../manifest/check65.js
# checks it. The review's copy of ../manifest/gen65.py (2026-09-27, climb-batch-6.5-review.md): the same generator
# with the strings the review changed, the intro's run sentences, the one-run overlap text and the manifest comment,
# where the split into two runs rested on rule 3; the coordinator moves it over ../manifest/gen65.py when folding the review.
import json, re, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'manifest'))
from lists65 import LISTS

ROOT = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
REC = os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-6.5.md')
OUT = os.path.join(ROOT, 'tmp/manifest65.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([EPGV])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == ['E', 'P', 'G', 'V'], [h.group(1) for h in heads]

META = {
  'E': dict(path='/home/user/fortress-sizerange', minutes=150, writesState=False),
  'P': dict(path='/home/user/fortress-intprose', minutes=120, writesState=False),
  'G': dict(path='/home/user/fortress-genrt', minutes=300, writesState=True),
  'V': dict(path='/home/user/fortress-rr32', minutes=150, writesState=False),
}
BLURB = {
  'E': "both paths refuse a size beyond NN32 (ZZ32 for an int size) as the decision on a size's range says, walk reads the sizes in range exactly (row 418), NatRtBigSize restated to the range, and NN32's LCM raises IntegerOverflow where the multiple does not fit; Scala under scala_src/ and Java under interpreter/.",
  'P': "the integer rules of 2026-09-22 and 2026-09-24 in the specification in the S1 form, row 394's coercion example given its exclusion, the rational type's listing given the library's algebra, the 13 test citations rung S moved re-anchored, the scalar block's comment reworded, and the expected-failure walk tests rows 440 and 443 owe; an original-tree edit, no source file.",
  'G': "the compiled path's generics at run time: the class loader's first load at four threads (row 417), a parallel task in a generic declaration (row 419), a generic method over two sets of parameters (row 420), the two dispatch defects, and a typecase or catch clause's bound name (row 351, the cause of row 426), with answer 7's identity functions passing values of type T through cast; Java under runtimeSystem/ and compiler/.",
  'V': "RR32 a sibling of RR64 under Number (route A, answer 8): RR64 converts from it, its arithmetic takes an RR32 (row 435), the team's test lines that assert the subtype restated with their values, and one sentence in the number chapter in the S1 form; library and builtin declarations only.",
}

def strip_ticks(t):
    return t.replace('`', '')

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
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.5.md, section 3, under \"%s. %s\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there." % (rid, title_plain), '']
    lines += [strip_ticks(l) for l in body.split('\n')]
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
  'E': "E makes both paths refuse a size beyond NN32 (ZZ32 for an int size), as the decision on a size's range says; walk reads the sizes in range exactly (row 418); NatRtBigSize is restated to the range; and NN32's LCM raises IntegerOverflow where the multiple does not fit.",
  'P': "P writes the integer rules of 2026-09-22 and 2026-09-24 into the specification in the S1 form, gives row 394's coercion example the exclusion its definition needs, states the library's algebra in the rational type's listing, re-anchors the test citations rung S moved and those its own edits move, rewords the scalar block's comment, and writes the expected-failure walk tests rows 440 and 443 owe.",
  'G': "G repairs the compiled path's generics at run time: the class loader's first load at four threads (row 417), a parallel task in a generic declaration (row 419), a generic method over two sets of parameters (row 420), the two dispatch defects with the measured change, and a typecase or catch clause's bound name (row 351, the cause of row 426), with answer 7's identity functions passing values of type T through cast.",
  'V': "V makes RR32 a sibling of RR64 under Number (route A, answer 8): RR64 converts from it, its arithmetic takes an RR32 (row 435), and the number chapter names it in the S1 form.",
}
INTRO_STOPS = {
  'E': "for E, a library declaration newly refused, a test's verdict changing other than its own and NatRtBigSize's restated lines, a size inside NN32 or ZZ32 that stops reading back or dispatching, the type of a size read as a value changed, and an edit to compiler/StaticChecker.java or to a file its section does not name",
  'P': "for P, any edit under Specification-1.0-frozen/, normative text for a rule neither path runs, a passage whose new text neither the decisions nor the landed code settles (reported, not chosen), an assertion changed in a re-anchored test, and a library line other than the scalar block's two comments",
  'G': "for G, a compiled test's verdict changing other than its own, a ladder file moving down, a four-thread run that deadlocks or times out twice, a compiler-library jar changing other than where a named fix predicts it, and an edit to the checker, walk or any library line other than the two identity functions",
  'V': "for V, a changed walk output its comparison does not account for, a team test line changed other than one that asserts RR32 below RR64 (keeping its value), a coercion beyond RR64's from RR32, and the specification's sentence stating more than the landed library",
}
INTRO_LIFTED = {
  'E': "E restates NatRtBigSize's lines beyond NN32, moving its three lines beyond 4294967295 to the refusal test, and renames row 418's expected failure into a plain test (the decision on a size's range)",
  'V': "V restates RR32's declarations and the team's test lines that assert RR32 below RR64, each keeping the value it checks, and renames row 435's expected failure into a plain test (route A and answer 8)",
}
OVERLAP_RUNG = {
  'E': "E edits checker files under ProjectFortress/src/com/sun/fortress/scala_src/, possibly runtimeSystem/MethodInstantiater.java, interpreter/evaluator/EvalType.java and what else walk's reading needs, the Lcm class of interpreter/glue/prim/NN32.java, ProjectFortress/compiler_tests/NatRtBigSize.fss and new tests there, and renames ProjectFortress/tests/XXXNatBigSizeWalk.fss and adds tests there.",
  'P': "P edits Specification/ (never Specification-1.0-frozen/, and not Specification/fortress.pdf, which the gather rebuilds), the messages and comments of seven revival tests and of any test whose citation its edits move, the scalar block's two comments in Library/FortressLibrary.fss and .fsi, and adds two XXX walk tests in ProjectFortress/tests/.",
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
A('// FIFO. k is 2 in each run of this batch (E, P; then G, V), 4 as one run.')
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
A('// one place per key (on the tree at 2851e5086; re-checked at each launch).')
A('//')
A('// Batch 6.5\'s values are CLIMB-BATCH-6.5.md, sections 3, 6 and 7. Each tail is')
A('// that rung\'s section of section 3 word for word, with the record\'s code-span')
A('// backticks dropped (this file carries none); ASCII only. No section carries')
A('// an answer letter: none of section 1\'s questions changes a rung. Three things')
A('// are set at launch and nowhere else: RUN (which run this is: \'first\' is')
A('// batch 6.5, rungs E and P; \'second\' is batch 6.5b, rungs G and V, cut from')
A('// the tree the first run landed; \'all\' is the four as one batch 6.5, on')
A('// Pavol\'s word, with P\'s and V\'s shared specification files ordered as the')
A('// record\'s section 4 says; the record\'s section 1, "Two runs"), LEDGER_FROM (the first free ledger')
A('// row at this run\'s launch; the block refuses to load while it is unset), and')
A('// CHECKER_BASE (the #total of the last landed checker-count.txt, 62 at')
A('// drafting). Manifest order is the ledger numbering order: E, P in the first')
A('// run; G, V in the second; E, P, G, V as one run. The scatter starts the')
A('// longest expected first (E, P; G, V; G, E, V, P). E, P and G predict the')
A('// checker total unchanged; V declares no prediction and reports its table.')
A('// No rung declares a ladder move. The base is <base>, passed at launch as')
A('// args.base, not written here.')
A('// ===========================================================================')
A('')
A("const RUN = 'first'        // SET AT LAUNCH: 'first' (batch 6.5: E and P), 'second' (batch 6.5b: G and V) or 'all' (the four as one batch 6.5, on Pavol's word only); the record's section 1, \"Two runs\"")
A("const LEDGER_FROM = null   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A("const CHECKER_BASE = 62   // SET AT LAUNCH: the #total of the last landed checker-count.txt (62 in climb-batch-6/followup-R/gate/ at drafting)")
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
A("const RUNGS = RUN === 'first' ? [E_ENTRY, P_ENTRY] : RUN === 'second' ? [G_ENTRY, V_ENTRY] : [E_ENTRY, P_ENTRY, G_ENTRY, V_ENTRY]")
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
A('  ' + js_str("This batch is the repair batch of the plan's phase 2b (explorations/coordinator/PLAN.md, \"Phase 2b. The repair batch from the conformance reviews\"): what the conformance reviews of batches 3 to 6 found, repaired before phase 3.") + ',')
A("  RUN === 'first' ? " + js_str("This run is its first, batch 6.5; the second, batch 6.5b, carries rungs G and V and is cut from the tree this run lands, because P and V both edit the specification's number chapter and its changes appendix, and a run of the four would be the longest yet (the record's section 1, \"Two runs\").") + " : RUN === 'second' ? " + js_str("This run is its second, batch 6.5b, cut from the tree batch 6.5 landed (rungs E and P), whose P edited the specification's number chapter and its changes appendix before V does (the record's section 1, \"Two runs\").") + " : " + js_str("This run carries the batch's four rungs as one, on Pavol's word; P and V share Specification/basic-lib/numbers.tex and Specification/appendices/changes.tex, which the gather orders as the record's section 4 says (the record's section 1, \"Two runs\").") + ',')
A("  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),")
A('  ' + js_str("Each rung's section of the record opens with the answers of its section 1 that it follows; none of them changes a rung.") + ',')
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
A('  ? ' + js_str("No file is shared; the shared directories are ProjectFortress/tests/ and compiler_tests/, where the rungs touch disjoint files, and a file added to tests/ moves the testSystem shards, which the gate compares by their sum. P's edits may move a specification line that one of E's new test messages cites (the integer chapter, for LCM): the gather re-anchors it by passage after both are applied. The checker count reads E's checker and P's two comments and neither changes a declared type of the one library. The files they reach beyond their own are the three record files, folded centrally by the gather.") )
A("  : RUN === 'second'")
A('  ? ' + js_str("One file is shared, Library/FortressLibrary.fss, on disjoint declarations far apart: V's Number and RR64 near the top of the tower (about :352-400 on the record's tree) and G's two identity functions after the reductions (about :3107-3131); the gather applies V first, then G. The identity functions' RR32 branch stays right when RR32 is a sibling, so V does not touch it. ProjectFortress/tests/ gets V's test and compiler_tests/ and library_tests/ G's. The checker count reads V's changed declared types, so V's table is the only one that may move. The files they reach beyond their own are the three record files, folded centrally by the gather.") )
A('  : ' + js_str("E and P share no file. P and V share Specification/basic-lib/numbers.tex on disjoint passages (V's at about :27-49, P's rational listing at about :92-93 and :144-145 on the record's tree; V applied first there) and Specification/appendices/changes.tex at one place, since each adds its subsections after rung T's last: the gather applies P's entries before V's, resolving the same-point hunk by hand as its rule allows for unrelated regions, and says so. Library/FortressLibrary.fss is edited by V (Number and RR64 near the top), G (the identity functions after the reductions) and P (the scalar block's two comments near the end), disjoint; V applied first, then G, then P. P's edits may move a specification line one of E's new test messages cites, which the gather re-anchors by passage. The shared directories are ProjectFortress/tests/, compiler_tests/ and library_tests/, where the rungs touch disjoint files. V's table is the only checker table that may move. The files they reach beyond their own are the three record files, folded centrally by the gather.") + ')')
open(OUT, 'w').write('\n'.join(L) + '\n')
print('wrote', OUT, len(L), 'lines')
for rid in 'EPGV':
    print(rid, len(tails[rid]), 'tail lines;', titles[rid])
