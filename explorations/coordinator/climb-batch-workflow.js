// Workflow script: one batch of the compile-path ladder climb.
//
// What it does, stage by stage, and why: explorations/coordinator/climb-batch-workflow.md
// (the manual) and explorations/coordinator/process-engineering/batch-redesign.md (the
// practice it builds, with the evidence and the cost of each choice). A batch is a manifest
// change and nothing else: the coordinator splices the block between the MANIFEST and END
// MANIFEST lines from the batch's generator (explorations/compile-ladder/plan-<N>/manifest/)
// and launches. Before the launch the coordinator builds the batch's one base build; each
// rung worker makes its own worktree, seeded from it:
//   Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js',
//             args: {base: '<the full hash of the base>', baseBuild: '<the base build, a built worktree at that commit>'}})
//
// The shape since the redesign of 2026-10-08: each rung's worker does the rung test first;
// its skeptic checks it and fixes what it finds, test first; a judge rules only on a fix
// the skeptic marks contested or on a rung it cannot fix, and a repair round runs only on
// the judge's word; no second skeptic. Then the gather lands the approved rungs on main,
// the merged-diff review and the gate run side by side, and the commit stage lands the
// gate's tables, runs the microGPT walk check and pushes. The batch writes no skill text:
// each rung's revival-change material goes into the batch's RECORD.md, and the standing
// skill writer writes the skill from it after the landing, before a cold read
// (explorations/reviews/skills-agenda-audit.md, "Proposed fix to the mechanism"). Every
// agent is pinned to Opus but a judge's second ruling on the same rung or tree, which runs
// on Fable (POSITIONS.md, "The judge's rulings."). Every prompt
// points to the fortress-repo skill for how to build, test, run the old code, wait and
// commit, and says only what the role does in this batch. No backticks and no non-ASCII
// character anywhere in this file.
//
// Every agent() call goes through callAgent ("An agent that comes back with nothing"),
// which runs a role again, up to two more times, when its agent returns nothing; a usage
// or rate limit, or a rung worker, skeptic or judge that returns nothing after its
// attempts, stops the run there and decides nothing, and resumeFromRunId with the same
// script and args then runs that role again.

export const meta = {
  name: 'fortress-climb-batch',
  description: 'One batch of Fortress compile-ladder rungs in seeded worktrees: each rung done test first by its worker and checked by a skeptic that fixes what it finds, a judge only on a contested fix or a refusal; gathered onto main, reviewed beside one gate, landed and pushed; its revival-change material left in the batch record for the skill writer',
  phases: [
    { title: 'Rung', detail: 'the rung done test first in its own seeded worktree, committed and pushed to its wip/ branch as it goes' },
    { title: 'Skeptic', detail: 'the rung checked by reading and by programs of its own on the old and new code; what it finds it fixes, test first, and it marks a fix contested when nothing on record settles it' },
    { title: 'Judge', detail: 'Opus for a first ruling, Fable for a second on the same rung or tree: only on a contested fix, a refusal, a worker that stopped, a blocking review or a red gate' },
    { title: 'Gather', detail: 'each approved rung applied to main in one commit with its record folded, the new ledger rows added through ledger.py, the rows it fixed closed' },
    { title: 'Review', detail: 'the merged diff, the skeptics\' fixes and the folded record read as a whole, once, beside the gate' },
    { title: 'Gate', detail: 'compileAll, the suites at four threads, testSpecData once a rung brings it, the atomic runs, the ladder regression, the checker count, and the distance stage beside them, reported and never red' },
    { title: 'Commit', detail: 'the gate\'s tables landed, the microGPT walk check run, the batch checked for skill text it should not have written, main pushed to its three branches, the worktrees removed; no push while a step that cannot be undone is unlifted' },
  ],
}

const OPUS = 'opus'   // every agent but a judge's second ruling
const FABLE = 'fable' // a judge's second ruling on the same rung or tree
const judgeTier = (priorRuling) => priorRuling ? { model: FABLE } : { model: OPUS }
const BASE = args && args.base
if (!BASE) throw new Error('args.base is required: the commit every wip/ branch is cut from')
// The batch's one base build (POSITIONS.md, "Nothing is built or run twice on the same code."): a
// worktree at BASE that the coordinator built once before the launch. Every rung worktree is
// seeded from it (tools/seed-worktree.sh), and the old code runs from it through
// tools/old-fortress.sh, each rung with a private caches folder in its worktree's tmp/; nobody
// builds, compiles or runs anything else in it.
const BASE_BUILD = args && args.baseBuild
if (typeof BASE_BUILD !== 'string' || !/^\/[A-Za-z0-9._\/-]+$/.test(BASE_BUILD) || /\/$/.test(BASE_BUILD))
  throw new Error('args.baseBuild is required: the absolute path of the worktree at the base, built once before the launch (climb-batch-workflow.md, "Before the launch"), with no trailing slash, space or quote')
const TOOLS = 'explorations/coordinator/tools'
const SEED = BASE_BUILD + '/' + TOOLS + '/seed-worktree.sh'
const OLD = BASE_BUILD + '/' + TOOLS + '/old-fortress.sh'   // runs the base's code from the base build
const oldCaches = (rung) => rung.path + '/tmp/old-caches'   // a rung's private caches folder for the old code
const PUSH_BRANCHES = ['claude/worker-brief-fable-vnnuv8', 'blinded-fable']   // every push of main goes to these too (explorations/protocol.md, hard rules)
const MAIN = '/home/user/fortress'
const LEDGER = TOOLS + '/ledger.py'

// ===========================================================================
// MANIFEST - the coordinator replaces everything between this line and the
// "END MANIFEST" line, and changes nothing else in this file.
//
// Generated by explorations/compile-ladder/plan-24/manifest/gen24.py from
// CLIMB-BATCH-24.md (section 3, each rung's section word for word; section 5, the
// manifest fields and the intro) and the briefings of lists24.py; check24.js checks it.
// Climb batch 24: rungs F, Z, S, K, W, G, H, the manifest's order, the gather's tie-break; none lands only with another.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order only),
// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line
// for the batch table), section (the rung's section of the record, read by every role
// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the
// worker reads first, each with its reason), checks (the sub-list the skeptic, a judge
// and a repair round read), expectedMoves (ladder moves declared, none here), and the
// optional landsOnlyWith, expectedCheckerCount and expectedCheckerCrash: no rung lands
// only with another, and none declares a checker count or a crash (the count is reported).
// No value is set at launch. The base and the base build are args.base and
// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The
// Workflow harness runs two agents at once on this box"); the scatter starts the
// longest expected worker first.
// ===========================================================================

const BATCH = '24'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-24.md'
const BRIEFING_LISTS = 'explorations/compile-ladder/plan-24/manifest/lists24.py'

const F_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper of nativeHelpers, the bindings move step by step, and from the step that moves a binding the compiled checker checks it against the helper's Java signature. F-299: walk's loader takes the helper's overload whose Java types carry the declared types, and refuses a declared type that no Java type carries. F-298: the compiled rewrite reads the moved strings, and in the gate's stages the checker reads the helper's double as RR64. P-29: walk's speed is irrelevant. This record's section 2, forks 1, 3, 5, 7 to 11 and 14 to 16, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The planner's rung-F.patch: git apply explorations/compile-ladder/plan-24/probes/rung-F.patch in your tree. Take the text, or improve it and say why. It holds:",
"  - one line of walk's loader, interpreter/glue/StaticNativeApp.java, javaFor (:47-58): a declared Float is carried in a double, as RR64 is (fork 3). Without it walk refuses the family at load: the planner's sample, Float's + alone, stopped every program, 'Native helper com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleAdd: no Java type carries the declared type of parameter b.' at FortressBuiltin.fss:103.",
"  - the 30 strings of value object Float in ProjectFortress/LibraryBuiltin/FortressBuiltin.fss (:54-194), each naming the helper that the prelude binds or that computes it: asString and asExprString (doubleToString); the bracket |self| (doubleAbs); =, <, <=, >, >= (doubleEQ, doubleLT, doubleLE, doubleGT, doubleGE); the unary - (doubleNeg); +, -, DOT, TIMES, juxtaposition, / (doubleAdd, doubleSub, doubleMul three times, doubleDiv); SQRT (doubleSQRT); ^ at a Float and at an RR64 exponent (doublePow); sin, cos, tan, asin, acos, atan, log, exp (doubleSin to doubleExp); floor, ceiling (doubleFloor, doubleCeiling); truncate, round (doubleTruncate, doubleRound, at ZZ64, fork 11). families-base.tsv gives each line.",
"- Not yours: every other binding of Float, the brackets |\\self/| and |/self\\|, whose helpers answer RR64, ^ at an RR32 or AnyIntegral exponent, atan2 over Number, narrow, the directed roundings, MIN, MAX and the rest (no helper fits); the asFloats; walk's check of self (rung W); the Appendix I entry (the gather, fork 7).",
"",
"**Rows.** None opened by plan. A defect you meet gets its XXX test or its row in your record.md.",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0 over the fourteen components (explorations/compile-ladder/climb-batch-23/gate/). Only the distance stage reads FortressBuiltin's bindings (P-39): by the planner's run of all 83 bindings moved, both 0, '#crash none', both tables equal to climb batch 23's but for their seconds and machine rows; and a control, Float's < naming doubleAdd for one run, gave the distance 1 at its line (section 4). Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java: javaFor, only.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object Float's 30 strings, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.",
"- Not: StaticNativeApp.find or any other declaration of it (rung W); FunctionClosure, MethodClosure, FunctionalMethod, NativeApp; Library/; nativeHelpers/; Specification/; the tools.",
"",
"**Tests, first.**",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss, in the form of climb batch 23's NativeHelperFamilyZZ32Walk: each of the 30 at ordinary values and at 0.0, -0.0, a large value and the infinities, and at a not-a-number value where no row names its result as a departure; asString of several forms ('2.5', '0.1', '1.0E21' by the planner's runs). Not asserted: a comparison with a not-a-number value (row 672, contested), the rounding of a not-a-number value or an infinity (row 330). Passing on the base and on your text.",
"- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss with NativeHelperFamilyFloatCompiled.test (tests=, link, run, run_out_contains=PASS): one top-level declaration per helper of the 30, over RR64, Boolean, JavaString and ZZ64, each bound by its builtinPrimitive string, the same values asserted with assert(flag, message); passing on the base and after. The planner's sample of 18 helpers of the three families, in this form, linked and ran: 'OK (2 tests)'.",
"- Keep their verdicts: walk's suite, 694 tests at climb batch 23's gate; ant testSpecData's 130; climb batch 23's helper tests (NativeHelperBindingWalk and its siblings). By the planner's run of F, Z, S and the W prototype together: 694 tests, one failure, XXXNativeHelperUncarriedSelfWalk, which W promotes; 130 and no failure.",
"- After the change: ant testSystem once and ant testSpecData once (fork 9).",
"",
"**Specification.** None of yours: the Appendix I entry \"A native binding that names a static helper\" (Specification/appendices/changes.tex:4423), whose Effect counts the moved bindings, is the gather's (fork 7). List every sentence made false: that Effect's count, F-32's and F-299's counts, and any sentence of the fortress-repo skill on which declared types walk's loader carries (interpreter.md, \"Natives\").",
"",
"**Overlaps by file.** StaticNativeApp.java with rung W, at another declaration: you change javaFor, W changes find and adds a table of its own. FortressBuiltin.fss with rung S, which changes Long's, NN32's, BigNum's and Char's strings. The gather applies you first.",
].join('\n')

const Z_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper, step by step, checked from the step that moves it. F-299: walk raises a helper's DivisionByZero or IntegerOverflow as the library's own. Row 336: walk's divisions by zero on ZZ64 and ZZ end the run, where the helpers raise DivisionByZero (simpleLongArith.longOverflowingDiv, simpleArbitraryPrecisionArith.div). Row 848: the unsigned divisions and ZZ's remainders by zero, its sibling. The specification: \"For integer results, division by zero throws a DivisionByZero.\" (Specification/basic/operators/opr-overview.tex, section \"Multiplication, Division, Modulo, and Remainder Operators\"); narrow keeps the low 32 bits, and no IntegerOverflow is thrown (P-72; Specification/basic-lib/basic-integers.tex, section \"Integers\"). This record's section 2, forks 1, 5, 6, 10 and 14 to 16, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The planner's rung-Z.patch: git apply explorations/compile-ladder/plan-24/probes/rung-Z.patch in your tree. Take the text, or improve it and say why. It holds 36 strings in Library/FortressLibrary.fss:",
"  - trait ZZ64 (:818-909), 20: =, < (longEQ, longLT); the unary - and DOTMINUS (longOverflowingNeg, longWrappingNeg); +, DOTPLUS, the binary - and DOTMINUS (longOverflowingAdd, longWrappingAdd, longOverflowingSub, longWrappingSub); DOT, TIMES, juxtaposition, DOTTIMES (longOverflowingMul three times, longWrappingMul); DIV (longOverflowingDiv); BITAND, BITOR, BITXOR, BITNOT; narrow (simpleIntArith.longWrappingToInt); unsigned (the special name answering NN64); big (simpleArbitraryPrecisionArith.makeZZfromZZ64).",
"  - trait ZZ (:991-1085), 16: =; the unary - and DOTMINUS (neg); +, DOTPLUS (add); the binary - and DOTMINUS (sub); DOT, juxtaposition, TIMES, DOTTIMES (mul); DIV (div); BITAND, BITOR (oor), BITXOR, BITNOT; all of simpleArbitraryPrecisionArith.",
"- Not yours: ZZ64's CHOOSE (rung K); ZZ64's REM, MOD, partitionL, and its ^ and shifts over AnyIntegral; ZZ's widen (row 502), narrow, CHOOSE, REM, MOD and the rest, which need new helpers; the Appendix I entry (the gather, fork 7).",
"",
"**Rows.**",
"- Row 336: rewritten by the gather from your record.md: ZZ64's and ZZ's DIV by zero raise DivisionByZero since your commit, tests ZZ64DivisionByZeroWalk and ZZDivisionByZeroWalk; REM and MOD by zero on ZZ32 and ZZ64 still end the run; its reproducer XXXZZ64RemainderByZeroWalk (fork 6).",
"- Row 848, the unsigned divisions' sibling row: rung H's, which moves NN32's and NN64's DIV (fork 6).",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0. Your 36 sit in the FortressLibrary component, which both stages read: by the planner's run of all 83 moved, both 0, '#crash none', the count's table the same 14 api rows as climb batch 23's. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- Library/FortressLibrary.fss: trait ZZ64's 20 strings and trait ZZ's 16, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.",
"- Not: the CHOOSE declarations (:788, :881); trait NN64 and the top-level functions (rung S); ProjectFortress/src/; nativeHelpers/; Specification/; the tools.",
"",
"**Tests, first.**",
"- Two division tests in ProjectFortress/tests/, each failing on the base through the harness: ZZ64DivisionByZeroWalk and ZZDivisionByZeroWalk, in the form of ZZ32DivisionByZeroWalk, a DIV by zero in a try that catches DivisionByZero (the base: 'java.lang.ArithmeticException: / by zero' and 'java.lang.ArithmeticException: BigInteger divide by zero' in the planner's runs; the text: 'DivisionByZero').",
"- One XXX test in ProjectFortress/tests/, red through the harness on the base and on your text alike, the review's finding 7 (fork 6): XXXZZ64RemainderByZeroWalk for row 336, asserting the specification's answer, DivisionByZero. Row 848's is rung H's: an XXX test there over NN32's DIV would turn red on the merged tree, since H moves that DIV onto a helper that raises.",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss: each of the 36 at ordinary values and at the bounds, each overflow raising IntegerOverflow, each wrapping operator's wrap, narrow at a value past ZZ32's range (the specification says it wraps), unsigned and big; no division by zero (the two tests above hold it). Passing on the base and on your text.",
"- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyIntegersCompiled.fss with its .test: one top-level declaration per helper of the 36, over ZZ64, ZZ, ZZ32 and NN64 (the special name), the same values asserted, and the divisions by zero raising DivisionByZero there, as they do compiled on the base. The planner's sample, in this form, raised DivisionByZero from longOverflowingDiv and from div and passed.",
"- Keep their verdicts: walk's suite; the compiled tracks, which your text does not reach.",
"- After the change: your tests through the harness and junit.sh; no whole suite (fork 9).",
"",
"**Specification.** None of yours: the Appendix I entry's Effect names ZZ64's and ZZ's DIV among the divisions that end the run (changes.tex:4480-4488), a sentence you make false, which the gather rewrites (fork 7). opr-overview.tex's \"For integer results, division by zero throws a DivisionByZero.\" becomes true for ZZ64's and ZZ's DIV. List every sentence made false: that Effect sentence, row 336's claim, F-32's and F-299's counts.",
"",
"**Overlaps by file.** Library/FortressLibrary.fss with rung S (trait NN64's signed and the top-level char) and rung K (the two CHOOSE declarations), at other declarations.",
].join('\n')

const S_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper, step by step, checked from the step that moves it. F-299: walk carries NN32 and Char in an int and NN64 in a long, by the declaration, and answers each by the declared result. Row 846 and review-queue item 310: a binding over String moves only after item 310 is asked again, so the two top-level bindings over String stay (Question 1, its default). This record's section 2, Question 1 and forks 1, 5, 10 and 14 to 16, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The planner's rung-S.patch: git apply explorations/compile-ladder/plan-24/probes/rung-S.patch in your tree. Take the text, or improve it and say why. It holds 8 strings:",
"  - ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object Long's asString and asExprString (:379, :381; simpleLongArith.longToString); value object NN32's signed (:469; the special name makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType); value object BigNum's asString and asExprString (:566, :568; simpleArbitraryPrecisionArith.toString); value object Char's codePoint (:616; charCodePointWithSpecialCompilerHackForCharacterArgumentType).",
"  - Library/FortressLibrary.fss: trait NN64's signed (:985; makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType); the top-level char (:4540; charMakeCharacterWithSpecialCompilerHackForCharacterResultType).",
"- Not yours: printlnWithThread and getProperty, declared over String (Question 1); FlatString's 5 (fork 17); every other binding of these types; the Appendix I entry (the gather, fork 7).",
"",
"**Rows.**",
"- Row 856, signed of an NN32 or NN64 above its signed half wrapping to a negative value, and row 857, char taking a code point out of range: filed by plan, each with the reproducer none; the gather sets each reproducer to your test of today's behaviour (below).",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0. Six of your 8 sit in FortressBuiltin, which only the distance stage reads; trait NN64's signed and char sit in FortressLibrary. By the planner's run of all 83 moved, both 0, '#crash none'. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: the 6 strings of Long, NN32, BigNum and Char, only.",
"- Library/FortressLibrary.fss: trait NN64's signed and the top-level char, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.",
"- Not: value object Float (rung F); traits ZZ64 and ZZ (rung Z); ProjectFortress/src/; nativeHelpers/; Specification/; the tools.",
"",
"**Tests, first.**",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilySmallWalk.fss: each of the 8 at ordinary values and at the bounds: Long's getters at the ZZ64 bounds and 0, BigNum's at a value past ZZ64 and a negative one, signed at 0, 7 and the top of the signed range, codePoint and char at 'A', 0 and a character past U+FFFF. Not asserted: signed of a value above the signed range, and char of a negative code point or one past U+10FFFF, which wrap or pass silently on the old code and the new alike and on which the specification is silent (rows 856 and 857, whose tests are below). Passing on the base and on your text.",
"- Two tests of today's behaviour, home 3 of the fortress-repo skill's tests-writing.md (\"How a defect is recorded\"), since the specification is silent: ProjectFortress/tests/SignedAboveSignedRangeWalk.fss, asserting signed(unsigned(-1)) is -1 on NN32 and on NN64 and signed of the NN32 2^31 is -2147483648 (row 856), and ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss, asserting char(-1).codePoint is -1 and char(1114112).codePoint is 1114112 (row 857); each a comment line naming what it pins; passing on the base and on your text, as the planner's runs gave the values on both.",
"- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled.fss with its .test: one top-level declaration per helper of the 8, the special names over NN32, NN64 and Character, longToString and toString answering JavaString, the same values asserted.",
"- Keep their verdicts: walk's suite; the compiled tracks, which your text does not reach.",
"- After the change: your tests through the harness and junit.sh; no whole suite (fork 9).",
"",
"**Specification.** None of yours: the gather rewrites the Appendix I entry's count (fork 7). List every sentence made false: that count, F-32's and F-299's.",
"",
"**Overlaps by file.** FortressBuiltin.fss with rung F (Float's 30); FortressLibrary.fss with rungs Z and K; each at other declarations.",
].join('\n')

const K_SECTION = [
"**The answers this rung follows.** The CHOOSE probe, explorations/compile-ladder/plan-24/probes/choose.md, and its patch choose.patch: m CHOOSE n is the binomial coefficient, 0 where n < 0 or n > m, and on a fixed-size type a result that does not fit throws IntegerOverflow (its section 2; P-73 names CHOOSE under that rule on both paths); walk's glue class Int$Choose is exact over all of ZZ32; the compiled helper simpleIntArith.intOverflowingChoose has two faults, a raw ArrayIndexOutOfBoundsException past its safe-bound table where every result overflows (row 521), and a scratch array in one static field that calls running in parallel share, so that they corrupt each other (row 855); simpleLongArith.longOverflowingChoose, the ZZ64 and NN32 helper, has both, measured; the record decides the fix, with no word of the curator needed (its section 8). P-58: the binding moves onto the helper, checked from that step. This record's section 2, forks 1, 2, 5, 9, 10 and 14 to 16, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The probe's patch for ZZ32: git apply explorations/compile-ladder/plan-24/probes/choose.patch in your tree. Take the text, or improve it and say why. In nativeHelpers/simpleIntArith.java it raises IntegerOverflow where k - 2 is past maxIntChooseSafeN (:209-210), since past the table n CHOOSE k is at least 34 CHOOSE 17, and it gives each call of intSlowCautiousChoose its own scratch array in place of the static tempIntChooseArray (:121); it holds three tests, ChooseHelperWalk, ChooseHelperCompiled with its .test, and the guard ChooseZZ32Walk.",
"- The same two fixes in nativeHelpers/simpleLongArith.java, which the patch leaves: longOverflowingChoose (:177-194) raises IntegerOverflow where kk - 2 is past maxLongChooseSafeN, 32 entries, in place of its test kk > maxLongChooseN, 66 (:182-183), since past the table n CHOOSE k is at least 68 CHOOSE 34, row 521's example, past the ZZ64 range (at n = 67 a k of 34 folds to 33, inside the table); and longSlowCautiousChoose takes its own scratch array in place of the static tempLongChooseArray (:105). Write them in the patch's form, with the ZZ64 tests below.",
"- The two strings: trait ZZ32's CHOOSE (Library/FortressLibrary.fss:788) naming simpleIntArith.intOverflowingChoose, and trait ZZ64's (:881) naming simpleLongArith.longOverflowingChoose.",
"- Not yours: NN32's CHOOSE binding, which does not fit as a bare string (its compiled path is served by the ZZ64 helper, and gains its fix); the CHOOSE property at m = n = -1, the probe's question for the curator; the Appendix I entry, whose CHOOSE sentence the gather rewrites (fork 7).",
"",
"**Rows.**",
"- Row 521: the gather closes it with your commit, its test the promoted ChooseTableCompiledRungE, which asserts both helpers' overflow past the table.",
"- Row 855: the gather closes it with your commit, its test ChooseHelperCompiled, the ZZ64 half by your ZZ64 test beside it.",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0. By the planner's run of all 83 moved, the two CHOOSE among them, both 0, '#crash none'. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java and simpleLongArith.java: the CHOOSE helpers and their scratch arrays, only.",
"- Library/FortressLibrary.fss: the two CHOOSE strings, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests and the promoted pair.",
"- Not: the other strings of traits ZZ32 and ZZ64 (rung Z owns ZZ64's); interpreter/; Specification/; the tools.",
"",
"**Tests, first.**",
"- The probe's three, from choose.patch: ChooseHelperWalk and ChooseHelperCompiled, each binding the ZZ32 helper by its own declaration, exact values, IntegerOverflow exactly where the coefficient does not fit, and n CHOOSE 2 in a parallel loop, each failing on the base through the harness and passing after; and the guard ChooseZZ32Walk, the library's operator, passing on the base, where the glue class answers, and after.",
"- Their ZZ64 counterparts, written by you in the same form, with a parallel loop that reaches longSlowCautiousChoose: a walk test and a compiled test binding the ZZ64 helper, failing on the base and passing after, and a guard of ZZ64's CHOOSE operator, passing on the base and after. The probe measured the ZZ64 helper's race but kept no test of it.",
"- Promote the compiled XXX pair (the fortress-repo skill's tests-writing.md, \"Promoting an XXX test\"): XXXChooseTableCompiledRungE.fss and .test, with ChooseTableCompiledRungELink.test beside them, renamed without XXX and seen failing on the base through junit.sh, then passing; with only the ZZ32 helper fixed it still fails, at its ZZ64 assertion (choose.md, section 7.4).",
"- Keep their verdicts: PowChooseLcmRungE, which failed when climb batch 23 tried the move and passed in the probe's measurement with the fix; the 17 team demos that call CHOOSE, which reached their end there (the gather runs all 52); the compiled tracks; walk's suite.",
"- After the change: ant testQuick once and ant testSystem once, since your helpers run on both paths and a library string names them (fork 9).",
"",
"**Specification.** None of yours: the gather rewrites the Appendix I entry's CHOOSE sentence (changes.tex:4474-4477), which your rung makes false (fork 7). The probe found no sentence of the specification made false. List every sentence made false: that sentence, row 521's and row 855's claims, F-299's \"ZZ32's CHOOSE among them\".",
"",
"**Overlaps by file.** Library/FortressLibrary.fss with rungs Z and S, at other declarations; trait ZZ64's other strings are Z's.",
].join('\n')

const W_SECTION = [
"**The answers this rung follows.** P-58: walk is to load the helper that a builtinPrimitive string names. F-299: the loader takes the helper's overload whose Java parameter and result types carry the declared types, self first, and refuses a declared type that no Java type carries; but it reads a method's self only by the helper's Java type, so a binding in a method of a program's own type loads (row 847). Row 847's fix: tell the loader the declaring type, and refuse such a binding at load. builtinPrimitive's printed comment says the interpreter takes \"the one whose Java parameter and result types carry the declared types, %self% first\" (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19), which your rung makes true of self. This record's section 2, forks 1, 4, 7 to 10 and 14 to 16, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The planner's rung-W.patch: git apply explorations/compile-ladder/plan-24/probes/rung-W.patch in your tree. Take the text, or improve it and say why. It holds, 41 lines added and 5 changed:",
"  - interpreter/evaluator/values/FunctionClosure.java: two constructors that take the declaring type and pass it to the loader.",
"  - MethodClosure.java: its two constructors pass their definer; FunctionalMethod.java: its two pass their self type (fork 4).",
"  - interpreter/glue/NativeApp.java: checkAndLoadNative with a third argument, the declaring type, the two-argument form passing none, and the type's name handed to StaticNativeApp.find.",
"  - interpreter/glue/StaticNativeApp.java: javaForSelf, the Java carrier of a declaring type by its name (javaFor's names, and Int, Long, UnsignedLong, Float and BigNum); find with the declaring type, refusing at load a type that no Java type carries, 'Native helper ...: no Java type carries Holder, the type of self.', and taking only an overload whose first Java parameter is the carrier; a top-level function, told no type, is loaded as today.",
"- Not yours: javaFor, the parameter carry (rung F changes it); every library string; the helpers; the Appendix I entry, whose row-847 sentence the gather rewrites (fork 7).",
"",
"**Rows.** Row 847: the gather closes it with your commit, its test the promoted NativeHelperUncarriedSelfWalk.",
"",
"**Distance sites.** Neither the count stage nor the distance stage reads walk's loader, so you run neither (fork 10); the gate runs both. You change no checker code, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java, MethodClosure.java and FunctionalMethod.java: the constructors named above, only.",
"- ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java: checkAndLoadNative, only; StaticNativeApp.java: find and the new javaForSelf, only.",
"- ProjectFortress/tests/: your tests.",
"- Not: StaticNativeApp.javaFor (rung F); Library/; ProjectFortress/LibraryBuiltin/; nativeHelpers/; compiler/; Specification/; the tools.",
"",
"**Tests, first.**",
"- Promote XXXNativeHelperUncarriedSelfWalk (the fortress-repo skill's tests-writing.md, \"Promoting an XXX test\"): renamed NativeHelperUncarriedSelfWalk.fss with its .test, load_exception_contains naming the helper, seen failing on the base through the harness and passing after. With the prototype the harness gave 'Refused at load as its keys name' for the XXX file, 'Tests run: 9, Failures: 1', the other 8 of climb batch 23's helper tests 'OK'.",
"- A test of a helper bound in a method of a program's own trait, refused at load, beside the promoted object case, with its .test; seen failing on the base.",
"- The guard: climb batch 23's NativeHelperFamilyZZ32Walk and NativeHelperBindingWalk, unchanged, passing on the base and after; they reach the trait ZZ32's functional methods and Int's dotted getters through your check. Your rung moves no binding, so it writes no family guard; the family rungs' guards meet your check on the merged tree.",
"- Keep their verdicts: walk's suite, 694 tests at climb batch 23's gate; ant testSpecData's 130. By the planner's run of your prototype with F, Z and S: 694, one failure, the XXX you promote; 130, no failure; the library's 95 helper bindings, over trait ZZ32, Int, Float, trait ZZ64, trait ZZ, Long, BigNum, NN32, trait NN64 and Char, all loading.",
"- After the change: ant testSystem once and ant testSpecData once (fork 9).",
"",
"**Specification.** None of yours: the Appendix I entry's sentence on row 847 (changes.tex:4493-4498) becomes false, and the gather rewrites it (fork 7). List every sentence made false: that one, F-299's \"It reads a method's self only by the helper's Java type, so a binding in a method of a program's own type loads (row 847).\", and the fortress-repo skill's interpreter.md, \"Natives\", \"Walk does not check self.\" and the sentences after it.",
"",
"**Overlaps by file.** StaticNativeApp.java with rung F, at javaFor; you change find and add javaForSelf. The gather applies you after the family rungs, so that your check meets every moved binding there.",
].join('\n')

const G_SECTION = [
"**The answers this rung follows.** P-151: only the where-clause forms that the team wrote down are built: conditional extension, a function's or a method's condition, and AnyList's comprises clause; a where condition on a function's or a method's own static parameters bounds them. F-181 and row 701: the code generator refuses every function, method, object and trait declaration that carries a where clause in its own header, and every function or method with a contract. The phase 3 exit judgement, item 9: five such walls in the twelve, SumReduction's distribute (Library/FortressLibrary.fss:3449, with its sibling), BoundedRange.atMost (:4114), AnyList's and NatParam's comprises clauses, and a test modifier (row 823); the default, a named code-generator rung before the names batch, which the coordinator takes. Row 307: a call that reads a size off its argument does not run compiled. This record's section 2, forks 1, 12 to 16, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- Drop the header where-clause condition from the three guards of compiler/codegen/CodeGen.java: forFnDecl (:2967), forObjectDeclPrePass (:4107) and forTraitDecl (:5027), keeping each guard's contract condition; the where clause's conditions are the checker's, and nothing is emitted for them (fork 12). The planner dropped the three conditions in a probe copy of CodeGen and compiled four programs with it ahead of the build on the class path: a function whose where clause bounds its type parameter (XXXWhereBoundChecker), compiled and printed 'O'; a method whose where clause bounds its object's static parameter, compiled and printed 'PASS'; a trait whose comprises clause lists Box[\\E\\] at a where-clause variable E, compiled and printed 'PASS'; and XXXNatOpenRun, a trait listing Nt[\\n\\] at a where-clause size, compiled and then failed at run with 'java.lang.VerifyError: Bad type on operand stack', at the call that opens the size (row 307). On the base each compile stopped at its guard.",
"- Not yours: contracts (row 701's other half); row 812, a crash before the guard on a trait listing a type at a where-clause variable whose generic member gives a body; the size read off a value at a call (row 307); the library's own declarations, which no compiled program reaches until the switch-over.",
"",
"**Rows.**",
"- Row 701: rewritten by the gather from your record.md to its contract half, its reproducer a contract test, since its where half is fixed by your commit.",
"- Row 307: a note, the VerifyError of XXXNatOpenRun's run once its trait compiles, its reproducer pair named.",
"",
"**Distance sites.** The count stage and the distance stage run the checker, not the code generator, so you run neither (fork 10); the gate runs both. You change no checker code, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java: the three guards, only, and anything the emission of a where-clause declaration needs there, named in your report.",
"- ProjectFortress/compiler_tests/: your tests.",
"- Not: the checker's Scala; interpreter/; Library/; ProjectFortress/LibraryBuiltin/; Specification/; the tools.",
"",
"**Tests, first.**",
"- Promote XXXWhereBoundChecker to a plain-named compile, link and run test of the same program, seen failing on the base through junit.sh ('Don't know how to compile this kind of FnDecl.'), passing after.",
"- Two new run tests in ProjectFortress/compiler_tests/, each with its .test (link, run, run_out_contains=PASS), seen failing on the base: a method of a generic object or trait whose where clause bounds the type's static parameter, in the form of SumReduction's distribute and BoundedRange's atMost, the method called and its value asserted; and a trait whose comprises clause lists a generic object at a where-clause type variable, in AnyList's form, a functional method of the trait called through a value of the trait's type.",
"- XXXNatOpenRun, whose compile now succeeds: turned into a run pair, NatOpenRunLink.test (link) and XXXNatOpenRun.test (run, run_out_contains=REACHED), the program printing REACHED before the call that fails, run in one junit.sh call with the link test first (the fortress-repo skill's tests-writing.md, \"Writing an XXX test\"); its old .test red on your text before you change it, which shows the guard gone.",
"- Keep their verdicts: the compiler track, the where-clause checker tests among them (CondExtendChecker, ComprisesWhereFunctionalMethodChecker, OpenTypeWhereConstraintChecker and their siblings), which only the checker reads.",
"- After the change: your tests through junit.sh, in one JVM; the tracks to the gate (fork 9).",
"",
"**Specification.** None of the specification's sentences describe the code generator. List every sentence made false: F-181's \"refuses every function, method, object and trait declaration that carries a where clause in its own header\", P-151's \"Row 701: the code generator's half.\" and P-156's \"the code generator refuses a where clause in a declaration's header\" and its \"after the switch-over the code generator's refusal of a method with a where clause stops it too, as it stops SumReduction's two distributes (row 701)\", the fortress-repo skill's \"The code generator refuses a declaration with a where clause of its own (row 701)\" in its part on the revival's changes and \"It also refuses a function, method, object or trait declaration with a where clause of its own\" in its compiler part, row 701's claim.",
"",
"**Overlaps by file.** None: no other rung edits compiler/ or compiler_tests/' where tests. You meet the others only in the gate's compiled track.",
].join('\n')

const H_SECTION = [
"**The answers this rung follows.** The hard-set probe, explorations/compile-ladder/plan-24/probes/hard-set.md, and its patch hard-set-way2b-rewrite.patch: of the 109 bindings that cannot name their helper as a bare string, 82 are over Char, NN32 and NN64, which walk already carries by the declaration (F-299), and which only the compiled checker refuses, since it reads a helper's Java int or long as ZZ32 or ZZ64 (F-298): moved as bare strings, a sample of four gave the distance 4, as 'Could not check call to function builtinPrimitive_simpleUnsignedIntArith_unsignedIntOverflowingAdd - (ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type (NN32, NN32).' The team's device for these types is six transfer helpers with special names, which its prelude composes around each operation's helper, makeNN32FromZZ32(unsignedIntOverflowingAdd(makeZZ32FromNN32(self), makeZZ32FromNN32(b))) (the probe's section 3). Way 2b, taken at the probe's recommendation on the curator's standing word (Question 2): the compiled path's rewrite reads the declared type at each position, and where the helper's Java int or long is read as ZZ32 or ZZ64 and the binding declares NN32, NN64 or Char, it puts the matching transfer around that argument, or around the call for the result; walk is untouched. P-58: each binding keeps the bare form, checked against its helper from the step that moves it. The fortress-repo skill's compiler.md and interpreter.md, \"Natives\", give the rewrite and walk's loader as they stand: read both first. This record's section 2, Question 2 and forks 1, 5, 7 to 10, 14 to 16 and 18, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The planner's rung-H.patch: git apply explorations/compile-ladder/plan-24/probes/rung-H.patch in your tree. Take the text, or improve it and say why. It holds:",
"  - the probe's rewrite, compiler/BuiltinPrimitiveRewriter.java, +86 -11 lines, only that file: the declared types read at each position, the transfer put around an argument or a result where the declared type is NN32, NN64 or Char and the helper's Java type an int or a long; a helper that already reads a position as the declared type, as the six transfers themselves, gets none there.",
"  - 76 strings, each naming the binding's existing helper (families-base.tsv, family H, gives each line): value object NN32's 20 in ProjectFortress/LibraryBuiltin/FortressBuiltin.fss (:391-466: asString and asExprString, =, <, the unary - and DOTMINUS, +, DOTPLUS, the binary - and DOTMINUS, DOT, TIMES, juxtaposition, DOTTIMES, DIV, BITAND, BITOR, BITXOR, BITNOT, widen); trait NN64's 17 in Library/FortressLibrary.fss (:917-984: =, <, the unary -, +, DOTPLUS, the binary - and DOTMINUS, DOT, TIMES, juxtaposition, DOTTIMES, DIV, BITAND, BITOR, BITXOR, BITNOT, narrow); value object Char's 39 in FortressBuiltin.fss (:612-722: asString, =, <, the six SIM comparisons, javaDigit, getDirectionality, getNumericValue, getType, the 23 predicates from isDefined to isWhitespace, toLowerCase, toTitleCase, toUpperCase).",
"- Not yours, each on its glue class, with its home (section 4): NN32's asFloat (climb batch 23's fork 12); NN32's CHOOSE, which reaches simpleLongArith.longOverflowingChoose (nativeHelpers/simpleUnsignedIntArith.java:80-82), the helper rung K fixes: on your tree it would bring rows 521 and 855 to walk, and on K's tree the checker would refuse it without your rewrite, so it moves in a later batch, once both have landed; UnsignedLong's asString and asExprString, whose helper prints an NN64 above its signed half as negative (row 326); NN64's prefix DOTMINUS, whose helper answers its operand (row 860); Char's asExprString, whose helper writes a character outside ASCII in another form than walk (row 861). The planner moved all 80 for one run: 91 of 1,325 printed values changed under walk, every one from those four; with the four back on their glue classes, none (section 4). Also not yours: the rest of the 109 (Question 2's other ways, review-queue items to come); the six transfers' own strings, which rung S moves for NN32's and NN64's signed and Char's codePoint and char; the Appendix I entry (the gather, fork 7).",
"",
"**Rows.**",
"- Row 848: rewritten by the gather from your record.md: NN32's and NN64's DIV by zero raise DivisionByZero since your commit, tests NN32DivisionByZeroWalk and NN64DivisionByZeroWalk; REM and MOD by zero on NN32, NN64 and ZZ still end the run; its reproducer XXXNN32RemainderByZeroWalk (fork 6).",
"- Row 860: its reproducer set to your XXX pair for the helper's negation (below).",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0. 59 of your 76 sit in FortressBuiltin, which only the distance stage reads, and trait NN64's 17 in FortressLibrary. By the planner's run of your text: the distance '#total 0', '#crash none'; the count '#total 0', '#locations 0', '#crash none'; and the probe's control, two misfitting strings on its sample, gave the distance 2, so the stage checks the composed call. Any site that comes is a point to report. You change the rewrite at the parse, not the checker's code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java: the rewrite, only.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: NN32's 20 and Char's 39 strings, only.",
"- Library/FortressLibrary.fss: trait NN64's 17 strings, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.",
"- Not: the strings of NN32's signed, NN64's signed, Char's codePoint and char (rung S); the CHOOSE declarations and helpers (rung K); interpreter/; nativeHelpers/; NamingCzar and the checker's Scala; Specification/; the tools.",
"",
"**Tests, first.**",
"- Three walk guards, one per family, ProjectFortress/tests/NativeHelperFamilyNN32Walk.fss, NativeHelperFamilyNN64Walk.fss and NativeHelperFamilyCharWalk.fss: every binding you move on chosen values, edge cases among them (NN32 at 0, 7, 2^16, 2^31 and 2^32-1; NN64 at 0, 7, 2^32, 2^63 and 2^64-1, each overflow raising IntegerOverflow and each wrap asserted; Char over ASCII letters, digits and spaces, a letter past U+00FF, a character past U+FFFF, a surrogate and a title-case letter), each result asserted with the harness's own checks; passing on the base, where the glue classes answer, and on your text. Not asserted: signed above the signed half and char out of range (rows 856 and 857). The probe's HardSetSampleWalk (in its patch) is the form.",
"- Three compiled guards, ProjectFortress/compiler_tests/NativeHelperFamilyNN32Compiled.fss, NativeHelperFamilyNN64Compiled.fss and NativeHelperFamilyCharCompiled.fss with their .test files (link, run, run_out_contains=PASS): one top-level declaration per helper you move, at the Java types the compile reads them (ZZ32 for an int, ZZ64 for a long, Boolean, JavaString), the same values asserted; passing on the base and after, since they need no transfer.",
"- The rewrite's own test, ProjectFortress/compiler_tests/NativeHelperTransferCompiled.fss with its .test, beside NativeHelperBindingCompiled: declarations over NN32, NN64 and Char binding the same helpers at the declared types, javaDigit's mixed Char and ZZ32 among them, and NN32's widen and NN64's narrow, whose argument and result have different carriers; failing on the base (the probe's HardSetSampleCompiled on the old code: 'File HardSetSampleCompiled.fss has 3 errors.'), passing after ('(1627ms) PASS' on the probe's text).",
"- Two division tests in ProjectFortress/tests/, NN32DivisionByZeroWalk and NN64DivisionByZeroWalk, unsigned(7) DIV unsigned(0) and its NN64 form in a try that catches DivisionByZero, failing on the base ('java.lang.ArithmeticException: / by zero' in the planner's runs) and passing after ('NN32 DIV by zero: DivisionByZero'); and the XXX test that the post-batch review's finding 7 owes row 848, XXXNN32RemainderByZeroWalk, unsigned(7) REM unsigned(0) likewise, red through the harness on the base and on your text.",
"- The XXX pair for row 860, NN64WrappingNegationHelperCompiledLink.test and XXXNN64WrappingNegationHelperCompiled.test over one program: a declaration over NN64 bound to simpleUnsignedLongArith.unsignedLongWrappingNeg, which your rewrite composes, printing REACHED and asserting the wraparound negation of 1 is 2^64-1 (opr-overview.tex, section \"Addition and Subtraction Operators\"); run in one junit.sh call, the link test first (the fortress-repo skill's tests-writing.md, \"Writing an XXX test\").",
"- Keep their verdicts: walk's suite, 694 at climb batch 23's gate; the compiled tracks, NativeHelperBindingCompiled and the misc track's NamingCzarJUTest among them.",
"- After the change: ant testQuick once and ant testSystem once, since the parser runs your rewrite on the compiled path's repository and both paths run the parser (fork 9).",
"",
"**Specification.** None of yours: the Appendix I entry's Effect, which counts the moved bindings and names the divisions by zero on NN32 and NN64 that end the run (changes.tex:4466-4488), is the gather's (fork 7). opr-overview.tex's \"For integer results, division by zero throws a DivisionByZero.\" becomes true for NN32's and NN64's DIV. List every sentence made false: those sentences of the Effect, row 848's claim, F-298's \"In walk's world the checker reads the helper's Java types as the one library's, int as ZZ32\", F-32's and F-299's counts, and any sentence of the fortress-repo skill's compiler.md, \"Natives\", that has a binding over NN32, NN64 or Char that names a helper other than the six a type error for the checker.",
"",
"**Overlaps by file.** FortressBuiltin.fss with rungs F and S, and FortressLibrary.fss with rungs Z, S and K, each at other declarations: your strings are NN32's, NN64's and Char's, and none of the six transfers' or the CHOOSEs'. BuiltinPrimitiveRewriter.java with none. The gather applies you last (fork 1): two of your patch's hunks, at FortressBuiltin.fss:610 and FortressLibrary.fss:964, hold rung S's lines :617 and :986 as context, so after S the gather applies them through its --3way, which merges them clean; on your tree, cut from the base, the patch applies as it is.",
].join('\n')

const F_ENTRY = { id: 'F', slug: 'rung-natives-float', path: '/home/user/fortress-natives-float', branch: 'wip/rung-natives-float', expectedMinutes: 70,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The floating-point family: Float's 30 (P-58; F-299)",
    blurb: "the floating-point family: Float's 30 bindings moved onto their simpleDoubleArith helpers, with the one line of walk's loader that carries a declared Float in a double; a walk guard and a compiled guard of the 30, both passing before and after; no value moves under walk.",
    section: F_SECTION,
    pointsToReport: [
      "Whether you took rung-F.patch as it is or changed it, and why; each binding moved, and any left on its glue class.",
      "Your two guards on the base and on your text, through the harness and junit.sh.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each walk value that moves, and each test whose verdict changes in ant testSystem and ant testSpecData.",
      "Each defect met, with its XXX test or its row.",
      "Every sentence made false.",
      "A file edited beyond those named, or any edit of StaticNativeApp beyond javaFor.",
    ],
    briefing: [
      "P-58", "F-299", "F-298", "P-29", "P-30", "P-68", "ledger:672", "ledger:330", "doc:explorations/compile-ladder/plan-24/probes/rung-F.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#Forks the batch takes, none consequential",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Float extends RR64",
      "doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss", "doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "Walk's loader of a helper string, which refuses a declared type that no Java type carries: why Float needs its one line.",
      "The compiled rewrite that reads your 30 strings against their helpers' Java signatures in the distance stage.",
      "Walk's speed is irrelevant to every judgement of performance: the reflective call weighs nothing.",
      "The quick microGPT check under walk, whose float arithmetic runs through your helpers after the landing.",
      "Why truncate and round move now at ZZ64, and the later rung that gives them ZZ.",
      "A float compared with a not-a-number value: contested, so your guard asserts no such comparison.",
      "The float rounding operators' types, and their values at a not-a-number value and the infinities, which your guard leaves out.",
      "Your text as the planner measured it: the one line of the loader and the 30 strings.",
      "The family's values on the old code and the text, the stages, walk's suite and the compiled sample.",
      "The defaults your rung builds, each with the ways not taken.",
      "The loader's table of the declared types it carries, where Float joins RR64.",
      "Walk's float object, whose 30 bindings your family moves.",
      "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.",
      "A compiled program whose own declarations bind helpers, the form of your compiled guard.",
    ],
    checks: [
      "P-58", "F-299", "ledger:672", "doc:explorations/compile-ladder/plan-24/probes/rung-F.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)"] }

const Z_ENTRY = { id: 'Z', slug: 'rung-natives-integers', path: '/home/user/fortress-natives-integers', branch: 'wip/rung-natives-integers', expectedMinutes: 80,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The 64-bit and big integers: ZZ64's 20 and ZZ's 16 (P-58; row 336)",
    blurb: "the 64-bit and big integers: ZZ64's 20 and ZZ's 16 bindings moved onto their helpers, so that ZZ64's and ZZ's DIV by zero raise DivisionByZero under walk; two division tests failing before; an XXX test for row 336; a walk guard and a compiled guard of the 36; row 336 rewritten.",
    section: Z_SECTION,
    pointsToReport: [
      "Whether you took rung-Z.patch as it is or changed it, and why; each binding moved, and any left on its glue class.",
      "Your division tests and XXX tests before and after through the harness, and your two guards on the base and on your text.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each walk value that moves beyond the two divisions by zero.",
      "Row 336's rewritten line and its reproducer.",
      "Every sentence made false.",
      "A file edited beyond those named.",
    ],
    briefing: [
      "P-58", "F-299", "F-32", "ledger:336", "doc:explorations/compile-ladder/plan-24/probes/rung-Z.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#Forks the batch takes, none consequential", "code:Library/FortressLibrary.fss#trait ZZ64 extends",
      "code:Library/FortressLibrary.fss#trait ZZ extends { AnyIntegral", "doc:ProjectFortress/tests/ZZ32DivisionByZeroWalk.fss",
      "doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators",
      "doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss", "doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "Walk's loader of a helper string, and its raise of a helper's DivisionByZero as the library's.",
      "The bindings and their classes, whose count your family changes.",
      "Your first row: walk's divisions by zero that end the run, of which your family fixes ZZ64's and ZZ's DIV.",
      "Your text as the planner measured it: the 36 strings of ZZ64 and ZZ.",
      "The family's values on the old code and the text, the divisions by zero, the stages and the compiled sample.",
      "The defaults your rung builds, each with the ways not taken.",
      "Trait ZZ64, whose 20 bindings your family moves, CHOOSE left to rung K.",
      "Trait ZZ, whose 16 bindings your family moves.",
      "Climb batch 23's division test, the form of your two.",
      "What the specification says of integer division by zero, which your division tests cite.",
      "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.",
      "A compiled program whose own declarations bind helpers, the form of your compiled guard.",
    ],
    checks: [
      "P-58", "ledger:336", "doc:explorations/compile-ladder/plan-24/probes/rung-Z.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes", "code:Library/FortressLibrary.fss#trait ZZ64 extends"] }

const S_ENTRY = { id: 'S', slug: 'rung-natives-small', path: '/home/user/fortress-natives-small', branch: 'wip/rung-natives-small', expectedMinutes: 50,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The small rest: 8 bindings (P-58; Question 1)",
    blurb: "the small rest: Long's and BigNum's string getters, NN32's and NN64's signed, Char's codePoint and the top-level char moved onto their helpers, the two top-level bindings over String left out; a walk guard and a compiled guard of the 8; no value moves under walk.",
    section: S_SECTION,
    pointsToReport: [
      "Whether you took rung-S.patch as it is or changed it, and why; each binding moved, and any left on its glue class.",
      "Your two guards on the base and on your text, through the harness and junit.sh.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each walk value that moves.",
      "Each defect met, with its XXX test or its row.",
      "Every sentence made false.",
      "A file edited beyond those named.",
    ],
    briefing: [
      "P-58", "F-299", "ledger:846", "ledger:502", "ledger:856", "ledger:857", "doc:explorations/compile-ladder/plan-24/probes/rung-S.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#Forks the batch takes, none consequential",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java#static FValue box(Class<?> c, String declared, Object r)",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Long extends ZZ64",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object BigNum extends ZZ", "doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss",
      "doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "Walk's loader of a helper string, and how it carries NN32, NN64 and Char in int and long.",
      "Why the two top-level bindings declared over String stay on their glue classes.",
      "The open question on a conversion out of range, the sibling of signed above the signed half, which your guard leaves out.",
      "Signed above the signed half, which wraps: your test of today's value is its reproducer.",
      "Char of a code point out of range, which passes: your test of today's value is its reproducer.",
      "Your text as the planner measured it: the 8 strings.",
      "The small rest's values on the old code and the text, the stages and the compiled sample.",
      "The defaults your rung builds, each with the ways not taken.",
      "How the loader answers an int as NN32 or Char and a long as NN64, by the declared result.",
      "Walk's object Long, whose two getters your rung moves.",
      "Walk's object BigNum, whose two getters your rung moves.",
      "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.",
      "A compiled program whose own declarations bind helpers, the form of your compiled guard.",
    ],
    checks: [
      "P-58", "F-299", "doc:explorations/compile-ladder/plan-24/probes/rung-S.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes"] }

const K_ENTRY = { id: 'K', slug: 'rung-natives-choose', path: '/home/user/fortress-natives-choose', branch: 'wip/rung-natives-choose', expectedMinutes: 60,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "CHOOSE on ZZ32 and ZZ64: both helpers fixed, both bindings moved (P-58; rows 521 and 855)",
    blurb: "rows 521 and 855: the ZZ32 and ZZ64 CHOOSE helpers raise IntegerOverflow past their safe-bound tables and give each call its own scratch array, the CHOOSE probe's patch for ZZ32 and the same for ZZ64, and the two CHOOSE bindings move onto them; the compiled XXX pair promoted; the probe's tests and their ZZ64 counterparts; both paths' suites; rows 521 and 855 closed.",
    section: K_SECTION,
    pointsToReport: [
      "Whether you took the CHOOSE probe's patch as it is or changed it, and why; how you fixed simpleLongArith.",
      "The probe's tests, your ZZ64 tests and the promoted pair before and after through the harness and junit.sh, and the two guards on the base and on your text.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "The verdicts of ant testQuick and ant testSystem on your final tree, and each test whose verdict changes.",
      "Each walk or compiled value that moves beyond CHOOSE past the table.",
      "Every sentence made false.",
      "A file edited beyond those named.",
    ],
    briefing: [
      "P-58", "P-73", "ledger:521", "ledger:855", "doc:explorations/compile-ladder/plan-24/probes/choose.md",
      "doc:explorations/compile-ladder/plan-24/probes/choose.patch",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java#public static int intOverflowingChoose(int n, int k)",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java#public static long longOverflowingChoose(long n, long kk)",
      "doc:ProjectFortress/compiler_tests/XXXChooseTableCompiledRungE.fss", "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#Forks the batch takes, none consequential"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "Fixed-width arithmetic raises IntegerOverflow where its result does not fit, CHOOSE included: the value your helpers must give.",
      "Your first row: the CHOOSE helpers end the run past their table, which your fix turns into IntegerOverflow.",
      "Your second row: the helpers' slow paths share one static scratch array across parallel calls.",
      "The CHOOSE probe's finding: the specification's answer, walk's glue, the helper's two faults, the fix and its measurements.",
      "The CHOOSE probe's patch, the text your rung takes for ZZ32: the helper's bound and its scratch array, with three tests.",
      "The ZZ32 helper, whose bound on k is past its table.",
      "The ZZ64 helper, with the same two faults and no patch: yours to fix in the patch's form.",
      "The compiled XXX test your fix promotes, which asserts both helpers, with its link test beside it.",
      "What the planner read of the helpers and what the probe measured.",
      "The defaults your rung builds, each with the ways not taken.",
    ],
    checks: [
      "P-58", "ledger:521", "ledger:855", "doc:explorations/compile-ladder/plan-24/probes/choose.patch",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java#public static int intOverflowingChoose(int n, int k)"] }

const W_ENTRY = { id: 'W', slug: 'rung-natives-self', path: '/home/user/fortress-natives-self', branch: 'wip/rung-natives-self', expectedMinutes: 70,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "Walk's check of self: the loader told the declaring type (P-58; row 847)",
    blurb: "row 847: walk's loader is told the type that declares a method, and refuses at load a helper bound in a method of a type that no Java type carries; the XXX test promoted, with a trait case beside it; walk's suite and the specification's examples; row 847 closed.",
    section: W_SECTION,
    pointsToReport: [
      "Whether you took rung-W.patch as it is or changed it, and why.",
      "Your tests before and after through the harness.",
      "The verdicts of ant testSystem and ant testSpecData on your final tree, and each test whose verdict changes.",
      "Each declaring type your table carries, and any library binding it would refuse.",
      "Every sentence made false.",
      "A file edited beyond those named, or any edit of StaticNativeApp.javaFor.",
    ],
    briefing: [
      "P-58", "F-299", "ledger:847", "doc:explorations/compile-ladder/plan-24/probes/rung-W.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#Forks the batch takes, none consequential",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java#static Object find(String s, Applicable defn)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/MethodClosure.java#public MethodClosure(Environment within, Applicable fndef, FType definer)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionalMethod.java#public FunctionalMethod(Environment e,",
      "doc:ProjectFortress/tests/XXXNativeHelperUncarriedSelfWalk.fss"],
    reasons: [
      "The decision whose walk half your rung completes: walk loads the helper that fits the declaration, self included.",
      "Walk's loader as it stands: it reads a method's self only by the helper's Java type.",
      "Your row, which the gather closes with your commit.",
      "Your text as the planner measured it with the three families: the declaring type told to the loader and checked.",
      "The prototype's tests, the four texts together under walk's suite and the families' values.",
      "The defaults your rung builds, each with the ways not taken.",
      "Where the loader picks the helper's overload, and where your check of self goes.",
      "Walk's native loader, which is told no declaring type today.",
      "A dotted method's closure, which knows its declaring type.",
      "A functional method's closure, which knows its self type.",
      "Row 847's XXX test, which your fix promotes.",
    ],
    checks: [
      "P-58", "ledger:847", "doc:explorations/compile-ladder/plan-24/probes/rung-W.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java#static Object find(String s, Applicable defn)"] }

const G_ENTRY = { id: 'G', slug: 'rung-codegen-where', path: '/home/user/fortress-codegen-where', branch: 'wip/rung-codegen-where', expectedMinutes: 70,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The code generator's header where clauses (P-151; rows 701 and 307)",
    blurb: "row 701's where half: the code generator compiles a function, method, object or trait whose own header carries a where clause, its contract refusal kept; XXXWhereBoundChecker promoted, two run tests of the library's forms, XXXNatOpenRun turned into a run pair for row 307; row 701 rewritten.",
    section: G_SECTION,
    pointsToReport: [
      "Each guard changed, and anything else in CodeGen the emission needed.",
      "Your tests before and after through junit.sh, and the run pair's two runs.",
      "Each compiled test whose verdict changes in the compiler track, if you ran it.",
      "Row 701's rewritten line and row 307's note.",
      "Every sentence made false.",
      "A file edited beyond those named, or any edit of the checker's Scala.",
    ],
    briefing: [
      "P-151", "F-181", "ledger:701", "ledger:307", "ledger:812", "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#Forks the batch takes, none consequential",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forFnDecl(FnDecl x)",
      "doc:ProjectFortress/compiler_tests/XXXWhereBoundChecker.fss", "doc:ProjectFortress/compiler_tests/XXXNatOpenRun.fss"],
    reasons: [
      "The where-clause forms the tree builds, which the code generator must now emit.",
      "The code generator's refusal of a header where clause and of a contract, which your rung halves.",
      "Your row, rewritten to its contract half once you land.",
      "The row whose second wall your rung uncovers: a size read off a value at a call, the VerifyError behind the clause.",
      "A crash before the refusal, on a trait listing a type at a where-clause variable, which stays.",
      "The four programs compiled and run with the three guards dropped, and what each did.",
      "The defaults your rung builds, each with the ways not taken.",
      "The function and method guard, the first of your three; the object and trait guards are cited by line in your section.",
      "Row 701's compile XXX test for a function, which your rung promotes.",
      "Row 701's compile XXX test for a trait, which your rung turns into a run pair for row 307.",
    ],
    checks: [
      "P-151", "ledger:701", "ledger:307", "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forFnDecl(FnDecl x)"] }

const H_ENTRY = { id: 'H', slug: 'rung-natives-hard', path: '/home/user/fortress-natives-hard', branch: 'wip/rung-natives-hard', expectedMinutes: 90,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The hard set's 76 over Char, NN32 and NN64: the rewrite reads the declared types (P-58; the hard-set probe's way 2b)",
    blurb: "the hard set by way 2b: the compiled path's rewrite reads a binding's declared NN32, NN64 or Char where its helper takes or answers a Java int or long, and composes the call with the team's six transfers; 76 bindings of NN32, NN64 and Char moved onto their existing helpers, so that NN32's and NN64's DIV by zero raise DivisionByZero under walk; walk guards and compiled guards per family, the rewrite's own test, the division tests, XXX tests for rows 848 and 860; row 848 rewritten.",
    section: H_SECTION,
    pointsToReport: [
      "Whether you took rung-H.patch as it is or changed it, and why; each binding moved, and any left on its glue class.",
      "Your guards on the base and on your text, your rewrite test, division tests and XXX tests before and after, through the harness and junit.sh.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "The verdicts of ant testQuick and ant testSystem on your final tree, and each test whose verdict changes.",
      "Each walk value that moves beyond NN32's and NN64's DIV by zero.",
      "Row 848's rewritten line and the reproducers of rows 848 and 860.",
      "Every sentence made false.",
      "A file edited beyond those named, or any edit of the checker's Scala, NamingCzar, interpreter/ or nativeHelpers/.",
    ],
    briefing: [
      "P-58", "F-298", "F-299", "ledger:848", "ledger:326", "ledger:860", "ledger:861",
      "doc:explorations/compile-ladder/plan-24/probes/hard-set.md#1. For the curator",
      "doc:explorations/compile-ladder/plan-24/probes/hard-set.md#4.2 Way 2: the binding's declared types",
      "doc:explorations/compile-ladder/plan-24/probes/hard-set-way2b-rewrite.patch", "doc:explorations/compile-ladder/plan-24/probes/rung-H.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-24.md#Forks the batch takes, none consequential",
      "code:ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java#private static FnDecl fn(FnDecl f, boolean inType, Aliases aliases)"],
    reasons: [
      "The decision your rung carries on: each binding keeps the bare form and is checked against its helper from the step that moves it.",
      "The compiled rewrite your rung extends, and the reading of a helper's int and long as ZZ32 and ZZ64 that it works around.",
      "Walk's loader, which already carries NN32, NN64 and Char by the declaration, so walk needs no change.",
      "Your row: NN32's and NN64's divisions by zero, whose DIV your moves fix, and the XXX test owed for its rest.",
      "Why UnsignedLong's two getters stay on their glue class: their helper prints an NN64 above the signed half as negative.",
      "Why NN64's prefix DOTMINUS stays: its helper answers its operand; your XXX pair is the reproducer.",
      "Why Char's asExprString stays: its helper writes a character outside ASCII in another form than walk.",
      "The hard-set probe's findings in short: the problem measured, the team's transfers, the four ways and the recommendation.",
      "Way 2b as the probe built and measured it: the transfers at the rewrite, its cost, its residue and its control.",
      "The probe's patch: the rewrite, its four sample strings and its sample tests, the form of your guards and your rewrite test.",
      "Your text as the planner measured it: the probe's rewrite and the 76 strings.",
      "The 80 tried under walk, the four that moved values, the stages and walk's suite on your text, and W's check beside it.",
      "The defaults your rung builds, fork 18 among them, each with the ways not taken.",
      "Where the rewrite makes a binding's call of its helper today, the place your transfers go.",
    ],
    checks: [
      "P-58", "F-298", "ledger:848", "doc:explorations/compile-ladder/plan-24/probes/hard-set.md#4.2 Way 2: the binding's declared types",
      "doc:explorations/compile-ladder/plan-24/probes/rung-H.patch", "doc:explorations/coordinator/CLIMB-BATCH-24.md#The planner's probes"] }

const RUNGS = [F_ENTRY, Z_ENTRY, S_ENTRY, K_ENTRY, W_ENTRY, G_ENTRY, H_ENTRY]
const BATCH_INTRO = "This run is climb batch 24, the second batch of the plan's phase 4, the switch-over, and the second of its natives: each library binding builtinPrimitive(\"...\") is to name a static Java helper of nativeHelpers that both paths call, in place of a glue class of walk's, which the compiled path cannot use (P-58; F-32). Climb batch 23 built the mechanism and moved 21 bindings; the count and the distance stand at 0 with them (compile-ladder/climb-batch-23/gate/; F-53). Of the 449 live bindings, 83 more can name their helper as a bare string. Its rungs: F, Float's 30, with the one line of walk's loader that carries a declared Float; Z, ZZ64's 20 and ZZ's 16, so that their DIV by zero raises DivisionByZero under walk; S, the small rest, 8; K, the ZZ32 and ZZ64 CHOOSE helpers fixed past their tables and in their shared scratch arrays, and the two CHOOSE bindings moved; W, walk's loader told the type that declares a method, refusing a helper bound in a method of a type that no Java type carries; G, the code generator compiling a declaration whose own header carries a where clause; H, the hard set's way 2b, the compiled path's rewrite composing a binding over NN32, NN64 or Char with the team's six transfer helpers, and 76 such bindings moved. Every rung that moves bindings writes two guards, a walk program and a compiled program over the same helpers, both passing before and after, and an XXX test for each defect it meets. The planner measured F, Z and S with W's prototype together on this base: walk's suite 694 tests and one failure, the XXX test W promotes; the specification's examples 130 and no failure; the stages 0 and 0 with all 83 moved. No rung changes the checker's code, so none makes a speed pass. No rung builds on another, and none lands only with another; the gather applies the family rungs and K first, K before Z and S by its rule on the file they share, then W, G and H, rewrites the Appendix I entry's Effect once, and runs the 52 team demos on the merged tree; ant testSpecData runs in the gate because the landed summary has it."
// =========================== END MANIFEST ==================================

const BATCH_DIR = 'explorations/compile-ladder/climb-batch-' + BATCH
const GATE_DIR = BATCH_DIR + '/gate'
const SITES = 'explorations/compile-ladder/gate/distance-sites.tsv'   // the distance stage's per-site list, one path overwritten at each landing
const LOG_DIR = 'tmp/gate-batch-' + BATCH          // untracked: .gitignore ignores /tmp/
const GATE_OUT = LOG_DIR + '/out'   // the gate writes here; the commit stage copies it to GATE_DIR

// The scatter order: longest expected worker first. Manifest order is kept for the gather.
const SCATTER = RUNGS.slice().sort((a, b) => (b.expectedMinutes || 0) - (a.expectedMinutes || 0))

// ---------------------------------------------------------------------------
// The manifest, checked at load.
// ---------------------------------------------------------------------------

const LOOKUP_TOOL = TOOLS + '/facts-extract.sh'
const keyOk = (q) => typeof q === 'string' && q.trim() !== '' && !q.startsWith('-') && !/["\x60$\\\n]/.test(q)
RUNGS.forEach(r => {
  for (const field of ['id', 'slug', 'path', 'branch', 'section', 'blurb'])
    if (typeof r[field] !== 'string' || !r[field].trim()) throw new Error('rung ' + r.id + ': ' + field + ' is required')
  if (!/^\/[A-Za-z0-9._\/-]+$/.test(r.path) || r.branch !== 'wip/' + r.slug) throw new Error('rung ' + r.id + ': path must be an absolute path and branch wip/<slug>')
  for (const field of ['briefing', 'checks']) {
    if (r[field] === undefined) continue
    const bad = Array.isArray(r[field]) ? r[field].filter(q => !keyOk(q)) : [String(r[field])]
    if (bad.length) throw new Error('rung ' + r.id + ': ' + field + ' is a list of strings, none empty or opening with -, and none holding a double quote, a backtick, a dollar sign, a backslash or a newline, since each is rendered in double quotes: ' + bad.join(' | '))
  }
  const stray = (Array.isArray(r.checks) ? r.checks : []).filter(q => !(Array.isArray(r.briefing) && r.briefing.includes(q)))
  if (stray.length) throw new Error('rung ' + r.id + ': checks is a sub-list of briefing, and these keys are not in the briefing: ' + stray.join(' | '))
  if (Array.isArray(r.briefing) && (!Array.isArray(r.reasons) || r.reasons.length !== r.briefing.length)) throw new Error('rung ' + r.id + ': reasons holds one line per briefing key, in order')
})
const keysOf = (r, field) => Array.isArray(r[field]) ? r[field] : []
const lookupCommand = (keys) => ['        ' + LOOKUP_TOOL + ' \\'].concat(keys.map((q, i) => '            "' + q + '"' + (i < keys.length - 1 ? ' \\' : '')))
const SEARCH_FIRST = 'the record (explorations/coordinator/INDEX.md, FACTS.md, POSITIONS.md, the gap ledger through ' + LEDGER + ' find, and the maps under explorations/coordinator/map/)'
const MORE_PARTS = 'Output that ends by naming a next part is continued by the same command with --part 2, then 3, until it says it printed the last.'

// The worker's briefing, read whole as its first step after making its worktree: the
// agents were not trained on Fortress, and the briefing is in-context learning
// (POSITIONS.md, "The mission briefing.").
function briefingStep(rung, n) {
  const keys = keysOf(rung, 'briefing')
  if (!keys.length) return [n + '. Your briefing. This rung has none: search ' + SEARCH_FIRST + ' for its topics before the tree.']
  return [
n + '. Your briefing. Fortress is a language you were not trained on, whose design was never finished; it is not Java or Scala, and habits from them mislead here. Run this command in your worktree and read all it prints: the decisions on record, the ledger rows, the specification\'s sections, the notes and the code your rung rests on, gathered for it by the batch\'s planner, each entry with a line at the end of this brief on why it is there. Learn from it how Fortress does this kind of thing, then do the rung in the library\'s own way. ' + MORE_PARTS,
'',
...lookupCommand(keys),
'',
'   For a topic the briefing does not cover, search ' + SEARCH_FIRST + ' before the tree.',
  ]
}

// The checks slice of a briefing, read first by the skeptic, a judge and a repair round on
// one rung (rungs = [rung]), or by a repair on the merged tree for the rungs its ruling names.
function sliceStep(rungs, where, lead) {
  const sliced = rungs.filter(r => keysOf(r, 'checks').length)
  const one = rungs.length === 1
  const open = lead || 'Before anything else,'
  if (!sliced.length) return [open + ' search ' + SEARCH_FIRST + ' for the decisions and ledger rows ' + (one ? 'this rung rests on' : 'the rungs rest on') + ', before the tree.']
  return [
open + ' run ' + (sliced.length > 1 ? 'these commands' : 'this command') + ' in ' + where + ' and read all ' + (sliced.length > 1 ? 'they print' : 'it prints') + ': the part of ' + (one ? 'the rung\'s briefing' : 'each rung\'s briefing') + ' that a check of it needs, the decisions and ledger rows it rests on and the specification\'s sections and code it is checked against, each whole. ' + MORE_PARTS,
'',
...[].concat.apply([], sliced.map((r, i) => (i ? [''] : []).concat(one ? [] : ['        # ' + r.id]).concat(lookupCommand(keysOf(r, 'checks'))))),
'',
  ]
}

// The run's directory, found by an agent's own label, and the two jq programs that list a
// transcript's steps and print one call. They were tried on climb batch 8's transcripts (run
// wf_603242ca-111) and batch 9's (wf_f747fd3e-9e4).
const runDirLine = (label) => '    D=$(dirname "$(ls -t ~/.claude/projects/*/*/subagents/workflows/*/agent-*.meta.json | xargs grep -lE \'"description":"' + label + '(:attempt[0-9]+)?"\' | head -1)")'
const transcriptsLine = (labels) => '    grep -lE \'"description":"(' + labels.join('|') + ')(:attempt[0-9]+)?"\' $(ls -tr "$D"/agent-*.meta.json) | sed \'s/[.]meta[.]json$/.jsonl/\''
const JQ_LIST = 'select(.type == "assistant") | .timestamp as $t | .message.content[]? | select(.type == "tool_use") | select(.name == "Edit" or .name == "Write" or (.name == "Bash" and (.input.command | test("git (commit|stash)|junit|harness|nohup|wait_for|fortress compile|compileAll|ant ")))) | [$t[11:19], .id[-6:], .name, ((.input.command // .input.file_path) | gsub("[[:space:]]+"; " ") | .[0:150])] | join("  ")'
const JQ_CALL = 'select(.message.content | type == "array") | .timestamp as $t | .message.content[] | select((.type == "tool_use" and (.id | endswith($id))) or (.type == "tool_result" and (.tool_use_id | endswith($id)))) | $t[11:19] + "  " + (if .type == "tool_use" then (.input.command // .input.file_path // (.input | tostring)) else (.content | if type == "array" then map(.text // "") | join("\\n") else . end) end)'
const JQ_LINES = [
'    jq -r \'' + JQ_LIST + '\' T',
'    jq -r --arg id ID \'' + JQ_CALL + '\' T | head -80',
]
const reId = (id) => id.replace(/[^A-Za-z0-9]/g, '.')

// ---------------------------------------------------------------------------
// The head every role's brief opens with. Agents share the prompt cache only for the system
// prompt and tools, and the first message only when the whole prompt is identical (FACTS.md,
// "The Workflow harness runs two agents at once on this box"), so a head shared byte for byte
// saves nothing, and each role is given only what it needs. What every agent needs to know of
// how to work here is the fortress-repo skill's, which CLAUDE.md has every agent load
// (POSITIONS.md, "The skills are written for a reader new to the repository ..."): the head
// points there and does not repeat it.
// ---------------------------------------------------------------------------

function head(role) {
  return [
'# Fortress climb batch ' + BATCH + ' - ' + role,
'',
'You are an agent of a climb batch of the Fortress revival, run by a Workflow script. ' + BATCH_INTRO,
'',
'The fortress-repo skill says how to work in this repository: how to set up each call, build, run walk and the compiled path, run the old code beside the new, write and run tests, wait for a long command, stop processes, pick up after a stop, commit and report. Load it first, as CLAUDE.md asks, and open the parts your work reaches. This brief says what your role does in this batch and where. Where the brief and the skill differ, the brief holds, and it says so where it does.',
'',
'## The batch',
'',
RUNGS.length + ' rungs, each in its own worktree on its own branch, two agents running at a time, gated once together after the merge:',
'',
RUNGS.map(r => '- ' + r.id + ', slug ' + r.slug + ', worktree ' + r.path + ', branch ' + r.branch + ': ' + r.blurb).join('\n'),
'',
'Every branch is cut from the base, ' + BASE + ', on main. The batch\'s one base build, ' + BASE_BUILD + ', is a worktree at the base that the coordinator built once: every rung worktree is seeded from it, and the old code runs from it through ' + OLD + ' with a private caches folder (the skill\'s worktrees.md). Nobody builds, compiles or runs anything else in it. The batch record is ' + BATCH_RECORD + '; your brief carries what you need of it.',
'',
'## Points to report',
'',
'A point to report is a kind of change the curator reviews after the landing; the rung\'s list says which. A rung that reaches one finishes its work, lists the point with its evidence as file:line, and lands: it is reversible, and neither the push nor the next batch waits for it (POSITIONS.md, "Reversible stops do not hold a batch."). One kind holds the push: a step that cannot be undone, or that acts against a decision on record. Do not take such a step; report it as a decision not taken. If one was taken, list it with holdsPush true. A question for the curator goes in forCurator, with its evidence.',
'',
'## Citing',
'',
'Cite the tree at file:line, a FACTS.md entry and a POSITIONS.md entry by its bold title, and a result by quoting two to five of its lines with the command that printed them; never cite a file under tmp/. No model identifier goes into a file or a commit message. The commit footer is the skill\'s (committing.md).',
'',
'## If your context is compacted',
'',
'Your brief is the first message of your own transcript, the newest agent-*.jsonl under ~/.claude/projects/*/*/subagents/workflows/ whose first line holds this brief\'s title. Re-read from it what your next step needs, and the files you wrote, and go on. The boot that CLAUDE.md asks of the coordinating session is not yours.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The rung worker.
// ---------------------------------------------------------------------------

// The paths neither the checker count nor the distance stage reads: both run the compiler's
// phase order over the library (tools/checker-count/WorldFlip.java,
// tools/distance/DistanceMulti.java call Shell.compilerPhases), which reads no test, text or
// record and runs no code of walk's evaluator or natives or of the test harness (FACTS.md,
// "The checker-count and distance stages read only the compiler's phases ...").
const STAGE_BLIND = ['explorations/', 'Specification/', 'Documentation/', 'ProjectFortress/tests/', 'ProjectFortress/*_tests/',
  'ProjectFortress/src/com/sun/fortress/tests/', 'ProjectFortress/src/com/sun/fortress/interpreter/evaluator/', 'ProjectFortress/src/com/sun/fortress/interpreter/glue/']
const STAGE_BLIND_TEXT = STAGE_BLIND.slice(0, -1).join(', ') + ' or ' + STAGE_BLIND[STAGE_BLIND.length - 1]

const COUNT_RUN = TOOLS + '/checker-count/run.sh'
const DIST_RUN = TOOLS + '/distance/run.sh'
const DIST_COMPARE = TOOLS + '/distance/compare.sh'
const LANDED_TABLES = 'the last landed gate\'s tables: checker-count.txt and distance.txt in the newest explorations/compile-ladder/climb-batch-*/gate/, and the per-site list ' + SITES

// The checker count and the distance, for a rung. Its before is the landed tables (POSITIONS.md,
// "No re-measuring what the record holds."); its after runs once, on its final code, with no
// partial run before it (climb batch 9's review, finding 4; batch 10's rung G ran one anyway).
function stagesStep(rung, n) {
  const after = [
'   The after runs once, on your final code, after your last edit is built, into tmp/' + rung.slug + '/. Both stages can run past the Bash tool\'s 300 s limit, so start each in the background with nohup, in the form of the skill\'s session.md, "Long commands", never in the foreground: the count (about 5 minutes, 280 to 390 s in climb batches 13b and 14), which you wait for with that section\'s wait_for on tmp/' + rung.slug + '/count-run.txt, called again until it prints its EXIT= line; and the distance (about half an hour, one core: 26 to 29 minutes in climb batch 14), read when your report is written:',
'',
'        nohup bash -c \'( ' + COUNT_RUN + ' tmp/' + rung.slug + '/checker-count-postedit.txt tmp/' + rung.slug + '/cc-post ) > tmp/' + rung.slug + '/count-run.txt 2>&1; echo EXIT=$? >> tmp/' + rung.slug + '/count-run.txt\' >/dev/null 2>&1 &',
'        nohup bash -c \'( ' + DIST_RUN + ' tmp/' + rung.slug + '/distance-postedit.txt tmp/' + rung.slug + '/dist-post ) > tmp/' + rung.slug + '/distance-run.txt 2>&1; echo EXIT=$? >> tmp/' + rung.slug + '/distance-run.txt\' >/dev/null 2>&1 &',
'',
'   Its before is ' + LANDED_TABLES + ': never run a stage on your unchanged base, and never run a stage\'s driver on part of the library on code the full stage then measures (POSITIONS.md, "No re-measuring what the record holds."). Put in REPORT.md the diff of the count tables, what ' + DIST_COMPARE + ' prints for the distance tables, and each site that moved, read through tmp/' + rung.slug + '/dist-post/errors.tsv against the per-site list by row, not by the stage\'s class (row 577). Commit no table: the gate\'s tables on the merged tree are the record.',
'   When your edit changes the compiled checker, its Scala under scala_src/ or the code the build generates for it, do also what the skill\'s compiler.md, "The checker\'s time", says, which holds here where this brief differs: time the count stage on the base build before your edit and on your tree once the change is correct, in one session, make the second pass that section asks for, which makes the checker faster and keeps its results the same, and give in REPORT.md each run\'s seconds and the comparisons that show the results the same (POSITIONS.md, "The checker\'s speed comes right after its correctness.").',
  ]
  if (rung.testIsStage) return [
n + '. The checker count and the distance are this rung\'s test: no program can yet be compiled against the interpreter\'s library, so the failing-then-passing test of a library site is the stage, its before the landed table and its after your tree\'s (library-route-judgement.md section 2, step 1). Beside it, the walk tests your section names, each through the harness, test first as for any rung.',
...after,
  ]
  return [
n + '. The checker count and the distance, where your section asks for them. When every path your edit adds or changes (git diff --name-only ' + BASE + ' and git status --short) is under ' + STAGE_BLIND_TEXT + ', neither stage can move: run neither, and say so in REPORT.md with the paths. Otherwise:',
...after,
  ]
}

// mode: 'first' (the first pass), 'resume' (after a judge ruled that a stop is none), 'repair'
// (after a judge's ruling on a refusal or a contested fix).
function rungRole(rung, mode) {
  const dir = 'explorations/compile-ladder/' + rung.slug + '/'
  const steps = [
'1. Your worktree. Nobody made it at the launch. The command below adds it to the main tree\'s repository without touching the main tree\'s files, reuses a worktree that exists and a branch already pushed, and otherwise cuts the branch from the base; it seeds the worktree from the base build in about 3 s, so that walk and the compiled path run with the library compiled, and nothing needs building until your edit does. Then push the branch:',
'',
'        ' + SEED + ' ' + BASE_BUILD + ' ' + rung.path + ' ' + rung.branch + ' ' + BASE,
'        cd ' + rung.path + ' && git push -u origin ' + rung.branch,
'',
'   If it exits 2 it made nothing: make the worktree and build it as the skill\'s worktrees.md says, and say so in REPORT.md. Work only in ' + rung.path + ', with your scratch under its tmp/' + rung.slug + '/; never in the main tree, the base build or another rung\'s worktree.',
'   When the run is resumed after a kill, you run again from your start, with this brief, on what this role\'s earlier launch left. If ' + rung.path + ' already holds ' + (mode === 'first' ? 'commits past ' + BASE : 'commits after the one that carries the judge\'s ruling') + ' or uncommitted edits, they are that launch\'s, and the head it reached is the newest of those commits (git log --format="%h %ci %s" ' + BASE + '..HEAD, git status --short, and git status -sb for what it did not push): take over from that head, its commits yours to verify, not to redo, and test first still holding. Its transcript is in this run\'s directory, ' + runDirLine((mode === 'first' ? 'rung' : mode) + ':' + reId(rung.id)).trim() + ', then grep for your label in "$D"/agent-*.meta.json; read it with jq, never whole, and put any extract of it under tmp/' + rung.slug + '/.',
...(mode === 'repair' ? [sliceStep([rung], 'your worktree', '2. Before anything else,').join('\n')] : briefingStep(rung, 2)),
rung.testIsStage
  ? '3. The test. Step 7 below is this rung\'s test for the library\'s sites; the walk tests your section names are written first, as the skill\'s tests-writing.md, "The order", says.'
  : '3. The test, first, as the skill\'s tests-writing.md says ("The order"; "Promoting an XXX test"): the essence of the defect as a clean minimal program named by its topic, seen failing through the harness on the base\'s code in a run that ends before your edit is first built (under walk, before you edit a library source it reads), then the fix, then the test seen passing in your last run after your last change of code. The test and the fix may share a commit. ' + (mode === 'repair' ? 'The merged-diff review reads this order in your transcript' : 'Your skeptic reads this order in your transcript') + ' and runs nothing again, so the failing run goes through the harness, never only by hand. A rung that edits only prose has no test; its text is checked against the tree and the decisions on record.',
'4. Where the fix belongs, before you edit: explorations/coordinator/map/spec-to-implementation.md and modules-and-phases.md for the place, the skill\'s library.md for the library\'s own way. Where a precedent repaired the same defect, count the other sites in its file and give the number. List every way the language and the library offer before you choose, and put the choice in your decisions with the ways not taken.',
'5. The edit, as small as the test needs, and the build it needs (the skill\'s build-and-caches.md, "Building" and "After an edit of the library").',
'6. Whole suites, only as the skill\'s tests-running.md says ("When to run a whole suite"): once for each code state, after your last edit, when your edit changes Java or Scala of the checker, of walk or of a phase both share; your own tests otherwise. The gate is another agent\'s: run only the suite that part names for your edit (ant testQuick for the checker, ant testSystem for walk, both for a shared phase), once, and never the gate\'s whole set.',
...stagesStep(rung, 7),
'8. Every defect you measure gets one of the three homes of the skill\'s tests-writing.md ("How a defect is recorded"), and REPORT.md says which and why. A new ledger row goes in record.md in the row template of ' + LEDGER + ' (its header), with NEW-' + rung.id + '-1, NEW-' + rung.id + '-2 for its number, also where a test or a report cites it: the gather adds the rows through ' + LEDGER + ' and puts their numbers in. Never run ' + LEDGER + ' add, note, rewrite or close yourself. The first XXX test you add is shown red on a deliberate fix, through the harness (tests-writing.md, "Writing an XXX test").',
'9. Grep both test corpora and ProjectFortress/src/com/sun/fortress/ whole for a competing declaration of every name you add.',
'10. Your change\'s own ladder subset, after your edit only, as the end of the skill\'s gate.md, "The ladder regression", says, the drivers copied under tmp/' + rung.slug + '/ladder/, compared with the newest landed ladder.tsv.',
'11. The specification\'s text, where your section has you change it, in the S1 form (the skill\'s specification.md). List in REPORT.md every sentence of the specification your change makes false, an Appendix I Effect or a note on walk or the compiled path, with its file:line; the gather corrects those your section does not have you edit.',
  ]
  return [
'',
'---',
'',
'# Your role: rung worker for ' + rung.id + ', ' + rung.slug + (mode === 'repair' ? ', repair round' : mode === 'resume' ? ', continued' : ''),
'',
'Your rung\'s section of the batch record, word for word, is at the end of this brief. It opens with the answers on record that it follows, and it is the whole of what the record asks of this rung' + (mode === 'repair' ? '.' : ', followed by your briefing\'s entries, each with why it is there.'),
'',
'## The order of work',
'',
...steps,
'',
'## What you write',
'',
'Under ' + dir + ' in your worktree:',
'- REPORT.md: opening with five provenance lines, each ending in a file:line or none: problem (the measurement that made this a rung), spec (the governing passage of Specification/basic or basic-lib; none with the grep that shows it), precedent (the declaration or shape you followed), deviation (one line per way your edit departs from the precedent and the specification\'s spelling), historical (every file of the original 2012 tree you edit, for the commit message). Then what changed and why; the failing run\'s lines and the passing run\'s line, each with its command; where the fix belongs and the precedent search; what the specification settles; each program you ran old against new; the sentences your change makes false; every point to report you reached; your decisions, each with the ways not taken; every defect with its home.',
'- record.md: the record lines the gather folds, each a complete finding: the claim, the conditions under which it holds, its evidence (the file:line, the command with its output, the test) and what it means for the work. Completeness is yours; the record pass owns the final wording. The FACTS.md entry the rung earns (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md). Each change to an existing ledger row: a note that adds a fact (the row, and the text to add); or, where your change alters what the row says (a half of it fixed, a message renamed, its XXX test promoted or renamed, its claim narrowed), the row\'s whole new line in the row template, for the gather\'s ' + LEDGER + ' rewrite, its claim and notes stating the gap as it stands after your change and not its repair history. Each new row (NEW-' + rung.id + '-n, in the row template). The handover line. And a section headed "Revival change": the material from which the skill writer, after the landing, writes the skill\'s part on what the revival changed in the team\'s Fortress, when your change makes the revival\'s Fortress differ from what one of the team\'s sources (the specification, walk, the compiler, the library) says or does. It has two labelled parts. "The change": the team\'s source and what it says or does, with file:line; what the tree now does, with the test that shows it; and the reason, as evidence (a passage of a source, a checker refusal, a measured failure). "Provenance": the question or item, the answer or default it follows, and the batch. Name no question, item, batch, rung or record file in the change, and give no decision\'s status there; provenance goes in its own part. You write no skill text: the gather copies both parts into the batch\'s RECORD.md for the writer. When your change makes no such difference, the section is the line "Revival change: none", with the reason.',
'- A decision record if your section asks for one. Nothing else under explorations/.',
'',
'Do not edit explorations/coordinator/FACTS.md, the gap ledger, PLAN.md, POSITIONS.md, INDEX.md, the handover, the tools under ' + TOOLS + '/, or anything under .claude/: the gather folds your record.md into them, since every rung would conflict on them. Commit and push your own files as you go, on your branch only, as the skill\'s committing.md says; never main, never another branch, never a force-push.',
'',
'## Your points to report',
'',
...(rung.pointsToReport || []).map(p => '- ' + p),
'',
'## Your result',
'',
'Return the structured result the tool requires, and the full detail in REPORT.md. reportText and recordText carry the full text of REPORT.md and record.md, word for word: the harness often refuses a worker\'s write of those two files, and then the text is the report; the run\'s journal keeps it, and ' + (mode === 'repair' ? 'the gather writes it onto main from there' : 'your skeptic writes it onto your branch from there') + '. decisions lists every choice you made among ways, each with the ways not taken and the evidence: ' + (mode === 'repair' ? 'the merged-diff review reads them' : 'your skeptic weighs its fixes against them') + '. pointsReached lists every point to report you reached, with its evidence. forCurator lists every question for the curator the rung leaves open. Set stopped only for a step you could not take because it cannot be undone or acts against a decision on record, and say which in stopReason.',
'',
  ].join('\n')
}

// The rung's own section, and the worker's briefing reasons, at the end of a worker's brief.
function rungTail(rung, withReasons) {
  const lines = ['', '## Your rung: ' + rung.id + ' - ' + rung.title, '', 'SLUG is ' + rung.slug + '. WORKTREE is ' + rung.path + ', branch ' + rung.branch + '.', '', rung.section, '']
  if (withReasons && keysOf(rung, 'briefing').length) {
    lines.push('**Your briefing, entry by entry.** Step 2\'s command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it.')
    rung.briefing.forEach((k, i) => lines.push('- ' + k + ': ' + rung.reasons[i]))
    lines.push('')
  }
  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// The skeptic, which checks the rung and fixes what it finds (the curator, 2026-10-08:
// "just allowing Skeptic to fix the things that it discovers and then a judge just rules on
// that fix"). In batch 10 the three refusals cost 1.75M of 6.26M, a judge, a repair worker and
// a second skeptic each, for defects the first skeptic had already measured, and the second
// skeptics found nothing new but two citations (process-engineering/checking-roles-cost.md,
// sections 1 and 4; reviews/batch-10-review.md, section 4). The skeptic already holds the
// context: it fixes, test first, builds its own fix once (a new code state, which POSITIONS.md,
// "Nothing is built or run twice on the same code.", allows), and a judge rules only on a fix
// it marks contested or on a rung it cannot fix. process-engineering/batch-redesign.md,
// "The skeptic that fixes".
// ---------------------------------------------------------------------------

// What a skeptic runs to check, and what it builds: nothing, until its own fix.
function oldCodeLines(rung) {
  const priv = oldCaches(rung)
  return [
'    ' + OLD + ' ' + BASE_BUILD + ' ' + priv + ' compile P.fss && ' + OLD + ' ' + BASE_BUILD + ' ' + priv + ' run P    # the compiled path on the old code',
'    ' + OLD + ' ' + BASE_BUILD + ' ' + priv + ' P.fss                                       # walk on the old code',
  ]
}

function skepticRole(rung, worker) {
  const dir = 'explorations/compile-ladder/' + rung.slug + '/'
  const id = reId(rung.id)
  return [
'',
'---',
'',
'# Your role: skeptic for ' + rung.id + ', ' + rung.slug,
'',
'You did not do this rung: its worker did, in ' + rung.path + ' on ' + rung.branch + '. You decide whether the change is right and the record honest, and you fix what you find, so that the rung lands right with no repair round after you. A judge runs only on a fix you mark contested, or on a rung you cannot fix. You are not here to be agreeable, and not here to redo the worker\'s work: you check it, and you change what is wrong.',
'',
'## The rung\'s section of the record, word for word',
'',
rung.section,
'',
'Its points to report:',
'',
...(rung.pointsToReport || []).map(p => '- ' + p),
'',
'## What the worker returned',
'',
'Its own account, a claim to check, not evidence. Its REPORT.md and record.md texts are left out here: the first step below writes them onto the branch.',
'',
JSON.stringify(Object.assign({}, worker, { reportText: undefined, recordText: undefined }), null, 2),
'',
'## First, the worker\'s report and record on the branch',
'',
'The harness often refuses a worker\'s write of REPORT.md and record.md, so their texts are in the run\'s journal, in the worker\'s result. In ' + rung.path + ', write each of the two files the branch does not carry, byte for byte, with the journal tool, and commit them alone, titled "The worker\'s report and record, from the run\'s journal". The first line finds the run\'s directory by your own label; a command that exits 1 wrote nothing, and you say so in findings:',
'',
runDirLine('skeptic:' + id),
'    [ -e ' + dir + 'REPORT.md ] || python3 ' + TOOLS + '/journal-text.py --journal "$D"/journal.jsonl --out ' + dir + 'REPORT.md reportText rung:' + rung.id + ' resume:' + rung.id,
'    [ -e ' + dir + 'record.md ] || python3 ' + TOOLS + '/journal-text.py --journal "$D"/journal.jsonl --out ' + dir + 'record.md recordText rung:' + rung.id + ' resume:' + rung.id,
'',
'Then read REPORT.md as the report. The worker\'s transcripts are beside yours: the second line below prints their paths, oldest first; never read one whole. For a transcript T, the first jq line lists its edits, commits, builds and harness runs with their times (UTC) and the last six characters of each call\'s id, the second prints one call\'s command and output by that id:',
'',
transcriptsLine(['rung:' + id, 'resume:' + id]),
...JQ_LINES,
'',
'## Your briefing\'s slice',
'',
...sliceStep([rung], 'the rung\'s worktree'),
'## What you check',
'',
(rung.testIsStage
  ? '1. The test, which for the library\'s sites is the stage: the report\'s diff is the diff of ' + LANDED_TABLES + ' and the worker\'s post-edit tables under tmp/' + rung.slug + '/, and the transcript shows the run that wrote them on the head\'s code, after its last edit was built. Compare the distance tables with ' + DIST_COMPARE + ', a file read: what moved is what the report says, within the checker\'s run-to-run variation of 2 to 4 errors. The walk tests the section names: test first, as in check 2.'
  : '1. The count and distance tables the report declares, against the worker\'s files under tmp/' + rung.slug + '/, a file read; or, where the report says neither stage ran, that git diff --name-only ' + BASE + '...HEAD lists no path outside ' + STAGE_BLIND_TEXT + '.')
  + ' When the diff changes the compiled checker, its Scala under scala_src/ or the code the build generates for it, run the count stage yourself, on the base build and on the worker\'s head in one session, as the skill\'s compiler.md, "The checker\'s time", gives a reviewer: check the two times, and that your table and output equal those of the worker\'s run before its second pass, the same results as that section defines them.',
'2. Test first, read in the worker\'s transcript, each point by its time and call id: the test seen failing through the harness on the base\'s code in a run that ended before the edit was first built (under walk, before a library source it reads was edited), with the lines recordedFailure quotes; and seen passing in the worker\'s last such run, after its last change of code, with the line recordedPass quotes. The skill\'s tests-writing.md, "The order", is the rule. A test the transcript does not show failing on the base\'s code is a defect of the change, which you fix ("What you do with a finding"). A rung that edits only prose has no failure to see: its text is checked against the tree and the decisions on record.',
'3. The diff (git diff ' + BASE + '...HEAD), line by line, against the section, the specification\'s passages it cites and each decision on record your slice printed: does the edit do what the report says, only that, as small as its test needs, the decision\'s rule stated neither narrower nor broader than the decision states it?',
'4. Where the fix belongs and the library\'s way: did the worker find what the team already did here, follow the right precedent, and count the other sites of a defect a precedent repaired? A device the rung invented where the library has one is a finding, with the library\'s file:line.',
'5. The test exercises the defect; each specification citation in its messages names the file and the section, never a line, and the section says what the message says; the file carries at most one comment line and is named by its topic.',
'6. Your own programs, the differential. For every construct the rung touches, programs the worker did not write, run under walk and on the compiled path, with the rung\'s build for the new code and the old code from the base build:',
'',
...oldCodeLines(rung),
'',
'   Write them under tmp/' + rung.slug + '/skeptic/. ' + (rung.writesState
  ? 'This rung touches mutable state: run each at FORTRESS_THREADS=1 and =4, as a prefix on the command, and report both columns; a difference is a finding.'
  : 'Where the diff shows a mutable variable, a field, an atomic block or a write into a library\'s state, run each at FORTRESS_THREADS=1 and =4 and say so.') + ' When walk and the compiled run disagree, the specification answers: the interpreter is evidence, not an oracle; a silent specification is a reason to think harder, not to stop.',
'7. The three homes (the skill\'s tests-writing.md, "How a defect is recorded") for every defect the report names and every defect your programs measure.',
'8. The ledger and the sibling sites: ' + LEDGER + ' find with your own words for rows that bear on the rung; the tree for every other site of the defect the rung repairs, in the files it edits, in the sibling types and widths, and on the other path.',
'9. The report: its five provenance lines, each cited line opened with sed -n and saying what the line claims; the sentences of the specification the change makes false, listed; the whole-suite run the skill asks of a checker or walk edit, its verdict, command and commit those of the head; every point to report the rung reaches; record.md\'s FACTS entry, notes, rows and Revival change section true as written.',
'10. Competing declarations of every name the rung adds, in both test corpora and ProjectFortress/src/com/sun/fortress/ whole.',
'11. The failure-mode question: where the rung turns a loud failure (a throw, an error, a crash) into a quiet value, what the value is, against the specification. It does not stop the rung; it is reported.',
'',
'## You build nothing to check',
'',
'To check, you start no build and no library compile and leave the rung\'s build as it is: the worker built this code and ran its test, and the gate runs every suite on the merged tree (POSITIONS.md, "Nothing is built or run twice on the same code."). You compile and run your own programs only, with the lines above, and read the worker\'s runs in its transcript and its logs. Only your own fix, below, is built, once, as a new code state.',
'',
'## What you do with a finding: fix it',
'',
'- A correction: a sentence of REPORT.md or record.md, a citation, a provenance line, a FACTS entry, a missing assertion of a value the rung\'s own test already reaches, a home-2 or home-3 test, a ledger row (NEW-' + rung.id + '-n in record.md, in the row template), a sentence of the specification the change makes false. Make it, and commit it. An assertion or a test you add is seen failing through the harness on the base\'s code, run with the old code tool (the skill\'s worktrees.md, "Running the old code"), and passing on the head: the fix is already in the tree, so the base is where it fails.',
'- A defect of the change: it is wrong, or incomplete, a sibling site its own repair owes, a crash where the text gives an error, a test not seen failing first. Fix it, test first: the program that measured it becomes a gated test or an assertion (the skill\'s tests-writing.md), seen failing through the harness on the worker\'s head before your edit; then the fix, where it belongs and in the library\'s way, after you have listed the ways; built as the skill\'s build-and-caches.md says; the test seen passing; and, when your fixes change Java or Scala of the checker, of walk or of a shared phase, the whole suite they reach once, after your last fix (the skill\'s tests-running.md). Commit each fix with its test in one commit whose title begins "Skeptic\'s fix:", and push. Run no count or distance stage after a fix: the gate\'s tables on the merged tree are the record, and SKEPTIC.md says that the report\'s tables are those of the worker\'s head.',
'- Settled or contested. A fix is settled when the rung\'s section, the specification or a decision on record says that what your fix makes the code do is right: cite that sentence with the fix. A fix is contested when (a) the worker\'s report argues for the behaviour your fix changes, not only for its form; or (b) nothing on record settles it and you chose among ways; or (c) it touches a path the section does not give the rung and no sentence you cite settles it. A fix that reaches a point to report, or touches a path outside the section, is not contested for that alone: when a sentence you cite settles it, it is settled, and the point or the path goes in pointsReached for the curator. Make a contested fix all the same, in a commit of its own, and list it in contested with the worker\'s argument and yours: a judge rules on it alone, and may revert it.',
'- Refuse only when the rung cannot be fixed here: its approach is wrong and a fix would redo it; the fix needs a path no rung of this batch may touch, or a decision of the curator; or it is larger than a repair round. Then make no fix for that finding, and refuse with the one thing that must change.',
'- Every point to report the rung as it stands reaches, whether or not the worker listed it, goes in pointsReached; a question for the curator, in forCurator. Do not edit the worker\'s account of its own decisions: say where you differ in SKEPTIC.md.',
'',
'## Your verdict',
'',
'Write SKEPTIC.md in ' + dir + ': what you checked, the lines of your programs\' output each finding rests on with their commands, each fix with its finding, its test\'s failing and passing lines and its commit, each contested fix with both arguments, and your verdict. Commit it alone, last, and push. Set verdict to approved when the rung, with your fixes, is right and none is contested; contested when it is right with your fixes and one or more is contested; refused when it cannot be fixed here. In skepticText put the single word committed once SKEPTIC.md is committed; only if the harness refused the write, say so in findings and carry the text in skepticText, word for word. headJudged is the head the worker left, before your first commit; headAfter the head after your last. Run no suite but the one your own fix needs, as "What you do with a finding: fix it" says; the gate runs every suite on the merged tree.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The judge. Called only on a contested fix, a refusal, a worker that stopped, a blocking
// review or a red gate. Its first ruling on a rung or on the merged tree runs on Opus, a second
// on the same one on Fable (judgeTier). It does not build or test. Its brief carries what it
// rules on and points to the files for the rest: in batch 10 a judge's brief carried the
// worker's whole result and the skeptic's verdict, two thirds of its 61K tokens, of which it
// used about 30% (checking-roles-cost.md, section 2).
// ---------------------------------------------------------------------------

function judgeRole(kind, rung, worker, verdict, extra) {
  const onRung = (kind === 'contested' || kind === 'refusal' || kind === 'stop')
  const where = onRung ? rung.path : MAIN
  const outFile = onRung ? 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md' : BATCH_DIR + '/JUDGE-' + kind + '.md'
  const question = {
    contested: 'The skeptic fixed what it found in this rung and marked the fixes below contested: the worker argued for what a fix changes, or nothing on record settles it, or it touches a path or a point beyond the rung. Rule on each contested fix, and on nothing else: uphold it, or revert it. A fix you revert you revert yourself on the branch, git revert --no-edit <its commit>, which takes its test with it, and you push. Decide by the specification, the decisions on record and the library\'s own way, each point cited at file:line. Your decision is stands when the rung, after your reverts, lands as the branch holds it; repair when a contested finding is right but neither the worker\'s way nor the skeptic\'s is, with numbered instructions for one repair round; drop when the rung\'s approach is wrong; stop when it is a fork the record reserves for the curator.',
    refusal: 'The skeptic refused this rung: it found what it could not fix here. Decide what follows, by citation: stands when the refusal is wrong and the rung lands as the branch holds it; repair with numbered instructions for one repair round, each concrete enough to be done without re-deriving your reasoning; drop when the approach is wrong; stop when it is a fork the record reserves for the curator.',
    stop: 'The rung worker stopped, reporting a step it could not take because it cannot be undone or acts against a decision on record. Decide whether it is one. If not, your decision is repair, and your numbered instructions are the continuation; if it is, stop, with what reaches the curator: the fork, the ways, what each costs, and your recommendation.',
    review: 'The merged-diff review found something blocking in the source hunks after the gather: its blockingCode findings, the ones whose repair touches code, are yours; its routed findings go to the next batch without a ruling. Diagnose it on the merged tree as a whole and decide the repair; do not bisect rungs. The gate is running beside you in this tree: do not read ' + GATE_OUT + '/ or wait for it. ' + LAND_RULE,
    gate: 'The gate is red on the merged tree. Read the failing evidence and decide the repair. The ways the gate is red: a failing or erroring JUnit suite (ProjectFortress/TEST-RESULTS/); a suite whose test count fell against the last landed summary, which usually means a .test file or a tests= line went missing; a FAIL or a repeated timeout in the four-thread atomic runs, a lost update in the transaction run time; a ladder regression, a file that compiled and ran before reaching a lower phase or printing other output; a failing example of testSpecData once it is a gate step; and, from the checker count, a crash line no rung declared, a stale checker shadow or a table with no total (its total is reported and never red, and the distance stage is never red). Find the source of the conflict as a whole and rework that part in the merged batch; dropping a rung is the retreat, taken only when its approach is wrong.',
  }[kind]
  const contested = (kind === 'contested' && verdict && Array.isArray(verdict.contested)) ? verdict.contested : []
  return [
'',
'---',
'',
'# Your role: judge (' + kind + ')' + (rung ? ' for ' + rung.id + ', ' + rung.slug : ''),
'',
'You are this batch\'s escalation point. You did not do the work and you do not repeat it: no build, no test run. You read, you rule, and you write instructions an Opus worker can carry out. You write one file and commit it' + (kind === 'contested' ? ', and the reverts you rule' : '') + ', nothing else.',
'',
question,
'',
...(rung ? ['## The rung\'s section of the record', '', rung.section, ''] : []),
'## What you rule on',
'',
...(kind === 'contested' ? ['The contested fixes, as the skeptic returned them:', '', JSON.stringify(contested, null, 2), '', 'The decisions the worker returned, each with the ways it did not take:', '', JSON.stringify((worker && worker.decisions) || [], null, 2), ''] : []),
...(kind === 'refusal' ? ['The skeptic\'s refusal, its findings and its fixes:', '', JSON.stringify({ refusalReason: verdict && verdict.refusalReason, findings: verdict && verdict.findings, fixes: verdict && verdict.fixes }, null, 2), ''] : []),
...(kind === 'stop' ? ['The worker\'s stop:', '', JSON.stringify({ stopReason: worker && worker.stopReason, decisions: worker && worker.decisions, summary: worker && worker.summary }, null, 2), ''] : []),
...(extra ? ['The stage that escalated to you returned:', '', JSON.stringify(extra, null, 2), ''] : []),
'## What to read, and no more unless a ruling needs it',
'',
...(onRung ? [
sliceStep([rung], 'the rung\'s worktree (' + rung.path + ')', '1. First,').join('\n'),
'2. ' + (kind === 'contested' ? 'Each contested fix: git -C ' + rung.path + ' show <its commit>.' : 'The net change: git -C ' + rung.path + ' diff ' + BASE + '...HEAD, and its commits: git log ' + BASE + '..HEAD.'),
'3. In that worktree, explorations/compile-ladder/' + rung.slug + '/REPORT.md' + (verdict ? ' and SKEPTIC.md' : '') + ', the sections the point you rule on touches.',
'4. Every specification passage both sides cite, in the prose chapters, ten lines either side; the precedents both name; explorations/coordinator/map/spec-to-implementation.md only if the question is where a fix belongs.',
] : [
'1. The composed commits: git -C ' + MAIN + ' log ' + BASE + '..HEAD and git diff ' + BASE + '...HEAD, the hunks the findings name.',
'2. For a red gate, the failing tests\' own output under ProjectFortress/TEST-RESULTS/, and the summary and the comparison under ' + GATE_OUT + '/; the full logs, which are not committed, are under ' + LOG_DIR + '/.',
'3. The REPORT.md and SKEPTIC.md of the rungs the findings name, under explorations/compile-ladder/<slug>/.',
'4. The specification passages they cite.',
]),
'',
'## How to rule',
'',
'The specification is the standard and the decisions on record bind (POSITIONS.md, "The specification stays the standard."): the interpreter is evidence, not an oracle, and a silent specification is a reason to think harder, not to stop, unless PLAN.md names the point a fork. Rule as a whole: the goal is one tree with everything running. Every point of your ruling is a citation the next agent can check. Say which claims of each side were right. A decision you take where nothing on record settles it goes in forCurator, with the ways.',
'',
'Write the ruling to ' + outFile + ' in ' + where + (onRung
  ? ', commit it on ' + rung.branch + ' with the skill\'s footer, and push.'
  : ', and commit it locally on main with the skill\'s footer; do not push. Another agent may commit in this tree at the same time: retry once on an index.lock error after a few seconds.'),
'',
'Return the structured decision the tool requires.',
'',
  ].join('\n')
}

// The repair round on a rung, after a judge's ruling: a worker's brief with the ruling.
// No second skeptic follows it: its own test first, the merged-diff review, which reads every
// commit after the worker's, and the gate check it (batch-redesign.md, "No second skeptic").
function repairPrompt(rung, verdict, decision, kind) {
  return [
'',
'## The ruling you carry out',
'',
(kind === 'stop'
  ? 'You did this rung and stopped on what you took for a step that cannot be undone. The judge ruled that it is not one: this is the continuation, in ' + rung.path + '.'
  : 'This rung was done, checked, and ruled on: its skeptic ' + (kind === 'contested' ? 'fixed what it found and marked fixes contested' : 'refused it') + ', and the judge ordered one repair round, which is you, in ' + rung.path + '. No second skeptic follows: your own test first, the merged-diff review and the gate are its check.'),
'',
'The judge\'s decision:',
'',
JSON.stringify(decision, null, 2),
'',
'Its full ruling is explorations/compile-ladder/' + rung.slug + '/JUDGE.md on the branch' + (verdict ? ', and the skeptic\'s SKEPTIC.md is beside it' : '') + '. Carry out the instructions in order. Where one turns out wrong against a primary source, do what the source says, and say so in REPORT.md with the file:line that settles it. Every defect you repair gets its assertion in a gated test, seen failing first, as step 3 says; one you do not gets home 2 or 3. Update REPORT.md and record.md on the branch to the rung as it now stands, and carry their full texts in reportText and recordText: they replace the earlier texts. Your structured result replaces the worker\'s too, so its pointsReached, forCurator, historicalFiles, newRows and rowsClosed describe the whole rung as it now stands, the worker\'s entries among them, not your round alone. Commit and push.',
'',
  ].join('\n')
}

const STATE_SCHEMA_POINTS = { type: 'array', description: 'every point to report reached: the kinds of change the curator reviews after the landing, from the rung\'s list or another of that kind; empty if none',
  items: { type: 'object', properties: {
    rung: { type: 'string', description: 'the rung id; may be empty in a rung\'s own result' },
    point: { type: 'string', description: 'the point, in the words of the list where it is on it' },
    evidence: { type: 'string', description: 'file:line, or the command and its line' },
    holdsPush: { type: 'boolean', description: 'true only for a step taken that cannot be undone, or that acts against a decision on record: it holds the push until the curator lifts it; false for every reversible point' },
  }, required: ['point', 'evidence', 'holdsPush'] } }

const RUNG_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    landed: { type: 'boolean', description: 'true if the edit is in place and its test passes' },
    stopped: { type: 'boolean', description: 'true only if the rung met a step it could not take because it cannot be undone or acts against a decision on record' },
    stopReason: { type: 'string', description: 'empty unless stopped' },
    filesChanged: { type: 'array', items: { type: 'string' }, description: 'path:line-range per changed source file, and the new test files' },
    historicalFiles: { type: 'array', items: { type: 'string' }, description: 'files of the original 2012 tree the rung edits, for the commit message; empty if none' },
    recordedFailure: { type: 'string', description: 'the harness command and the two to five lines of its run on the base\'s code that show the test failing, with the call\'s time; for a rung that edits only prose, none and why' },
    recordedPass: { type: 'string', description: 'the harness command and the verdict line of the test\'s last run on the edit' },
    precedentSearch: { type: 'string', description: 'what the team already did here, by citation, and which precedent was followed' },
    decisions: { type: 'array', items: { type: 'string' }, description: 'each choice made among ways: what was chosen, the ways not taken, and the evidence' },
    defectHomes: { type: 'array', items: { type: 'string' }, description: 'one line per measured defect: the defect, its home (1, 2 or 3) and where it is' },
    newRows: { type: 'array', items: { type: 'string' }, description: 'the placeholders of the new rows record.md holds (NEW-<rung>-<n>), each with its claim\'s first words' },
    rowsClosed: { type: 'array', items: { type: 'string' }, description: 'each row the rung fixes, with the test that closes it' },
    notDone: { type: 'array', items: { type: 'string' } },
    pointsReached: STATE_SCHEMA_POINTS,
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every question for the curator the rung leaves open, one entry each with its evidence as file:line; empty if none' },
    reportText: { type: 'string', description: 'the full text of REPORT.md, word for word' },
    recordText: { type: 'string', description: 'the full text of record.md, word for word' },
    summary: { type: 'string', description: 'at most 15 lines of prose' },
  },
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'recordedFailure', 'decisions', 'pointsReached', 'summary'],
}

const SKEPTIC_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    verdict: { type: 'string', enum: ['approved', 'contested', 'refused'], description: 'approved: right with your fixes, none contested; contested: right with your fixes, one or more contested; refused: it cannot be fixed here' },
    refusalReason: { type: 'string', description: 'empty unless refused: the one thing that must change' },
    fixes: { type: 'array', description: 'every commit of yours that changes the rung, corrections included', items: { type: 'object', properties: {
      commit: { type: 'string' },
      finding: { type: 'string', description: 'what was wrong, with file:line' },
      kind: { type: 'string', enum: ['correction', 'defect'], description: 'correction: report, record, citation, test or row; defect: a fix of the change itself' },
      settledBy: { type: 'string', description: 'for a settled fix, the sentence of the section, the specification or a decision on record that settles it, at file:line; empty for a contested one' },
      test: { type: 'string', description: 'for a defect, the test or assertion with its failing line on the worker\'s head and its passing line, each with its command' },
      paths: { type: 'array', items: { type: 'string' } },
    }, required: ['commit', 'finding', 'kind', 'paths'] } },
    contested: { type: 'array', description: 'each contested fix, for the judge; empty if none', items: { type: 'object', properties: {
      commit: { type: 'string' },
      finding: { type: 'string' },
      why: { type: 'string', enum: ['worker-argued', 'unsettled', 'beyond-the-rung'] },
      workerArgument: { type: 'string', description: 'the worker\'s argument for what the fix changes, cited from REPORT.md or its decisions' },
      skepticArgument: { type: 'string' },
    }, required: ['commit', 'finding', 'why', 'workerArgument', 'skepticArgument'] } },
    failureWasRecorded: { type: 'boolean', description: 'whether the worker\'s transcript shows its test failing through the harness on the base\'s code before the edit was built, and then passing; false for a rung that edits only prose' },
    differentialsRun: { type: 'array', items: { type: 'string' }, description: 'your own programs: program, walk answer, compiled answer, old against new; both thread columns where the rung writes state' },
    suiteRun: { type: 'string', description: 'the whole-suite run your fix needed (the command, the verdict line and the head), or none and why' },
    findings: { type: 'array', items: { type: 'string' } },
    pointsReached: STATE_SCHEMA_POINTS,
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every question for the curator, one entry each with its evidence as file:line; empty if none' },
    leftForGather: { type: 'array', items: { type: 'string' }, description: 'a correction you could not make on the branch, for the gather; empty if none' },
    skepticText: { type: 'string', description: 'the single word committed once SKEPTIC.md is committed; its full text only when the harness refused the write' },
    headJudged: { type: 'string', description: 'the head the worker left, before your first commit' },
    headAfter: { type: 'string', description: 'the head after your last commit' },
    summary: { type: 'string' },
  },
  required: ['slug', 'verdict', 'fixes', 'contested', 'failureWasRecorded', 'differentialsRun', 'pointsReached', 'headJudged', 'summary'],
}

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    kind: { type: 'string' },
    decision: { type: 'string', enum: ['stands', 'repair', 'drop', 'stop'], description: 'stands: the rung lands as the branch now holds it; repair: one repair round carries out the instructions; drop: the rung\'s approach is wrong, it does not land; stop: a fork reserved for the curator, it does not land' },
    rulings: { type: 'array', description: 'on contested fixes: one per fix', items: { type: 'object', properties: {
      commit: { type: 'string' }, ruling: { type: 'string', enum: ['uphold', 'revert'] }, revertCommit: { type: 'string', description: 'the commit of your revert; empty when upheld' }, why: { type: 'string' },
    }, required: ['commit', 'ruling', 'why'] } },
    instructions: { type: 'array', items: { type: 'string' }, description: 'numbered steps for the repair round, each with the file:line it rests on; empty unless repair' },
    ruling: { type: 'string', description: 'which claims of each side were right and wrong, by citation' },
    forCurator: { type: 'array', items: { type: 'string' }, description: 'what reaches the curator: a fork with its ways and costs, a divergence that lands unrepaired, a decision taken where nothing on record settles it; empty if nothing' },
    summary: { type: 'string', description: 'at most 10 lines' },
  },
  required: ['kind', 'decision', 'instructions', 'ruling', 'summary'],
}

// The merged-diff review's judge has the decision land (POSITIONS.md, "A tests-only repair does
// not rerun the gate."): a ruling settled by tests and records only does not hold the batch for
// a repair; its steps go to the next batch, listed for the curator.
const LAND_RULE = 'You have a decision land beside repair, drop and stop: decide land when every finding you uphold is settled by tests and records only, test files of the corpora and files under explorations/, with no source, library, checker, interpreter or specification file changed. Then no repair runs: the batch lands on its gate, and your numbered instructions, written as for a repair worker, go to the next batch with the findings you uphold, listed for the curator. A finding whose settlement needs any other file is a repair, and so is a ruling that mixes the two.'
const REVIEW_JUDGE_SCHEMA = Object.assign({}, JUDGE_SCHEMA, {
  properties: Object.assign({}, JUDGE_SCHEMA.properties, {
    decision: { type: 'string', enum: ['repair', 'land', 'drop', 'stop'], description: 'repair: a repair on the merged tree carries out the instructions; land: every finding upheld is settled by tests and records only, the batch lands on its gate and the instructions go to the next batch; drop: a rung\'s approach is wrong; stop: a fork reserved for the curator' },
    instructions: { type: 'array', items: { type: 'string' }, description: 'numbered steps, each with the file:line it rests on: for the repair on repair, for the next batch on land; empty otherwise' },
  }),
})

const GATE_JUDGE_SCHEMA = Object.assign({}, JUDGE_SCHEMA, {
  properties: Object.assign({}, JUDGE_SCHEMA.properties, {
    decision: { type: 'string', enum: ['repair', 'drop', 'stop'], description: 'repair: a repair on the merged tree carries out the instructions; drop: a rung\'s approach is wrong; stop: a fork reserved for the curator' },
  }),
})

// ---------------------------------------------------------------------------
// For the curator. Every item a rung's worker, skeptic or judge, the gather, the review or a
// merged-tree judge marks for the curator becomes an entry of PLAN.md, under one of the two
// sections named below (PLAN.md's own headings). The gather routes the rungs' items, the review
// its own and any the gather missed, a repair on the merged tree its judge's. Nothing waits on
// them: an item not in PLAN.md is logged and carried in the result for the coordinator.
// ---------------------------------------------------------------------------

const PLAN_SECTIONS = ['Pavol\'s answers, in the order they are needed', 'Off the path, parked']
const PLAN_RULE = 'Each item for the curator becomes an entry of explorations/coordinator/PLAN.md: under the heading "' + PLAN_SECTIONS[0] + '" when it asks for a decision or an answer before work on the path can go on, in the group of the phase it must come before; under "' + PLAN_SECTIONS[1] + '" otherwise. The entry says in one or two plain sentences what is asked or told, the default or recommendation on record if there is one, and where the evidence is, by file:line. An item PLAN.md already holds is not written again: name that entry. Several items on one point make one entry.'
const CURATOR_ROUTED = { type: 'array', description: 'one entry per item for the curator this role put into PLAN.md or found there, by its id; several ids may share one entry',
  items: { type: 'object', properties: {
    id: { type: 'string', description: 'the item\'s id, as the role gives it' },
    section: { type: 'string', description: 'the PLAN.md section the entry is in: ' + PLAN_SECTIONS.map(x => '"' + x + '"').join(' or ') },
    entry: { type: 'string', description: 'the entry\'s opening words, enough to find it' },
  }, required: ['id', 'section', 'entry'] } }
const strings = (x) => Array.isArray(x) ? x.filter(t => typeof t === 'string' && t.trim()) : (typeof x === 'string' && x.trim() ? [x] : [])
const numbered = (prefix, list) => strings(list).map((text, i) => ({ id: prefix + '.' + (i + 1), text }))
// A rung's items: its last worker's, its skeptic's and its judges'.
function curatorItemsOf(r) {
  return [].concat(
    numbered(r.rung + '.worker', r.worker && r.worker.forCurator),
    numbered(r.rung + '.skeptic', r.verdict && r.verdict.forCurator),
    numbered(r.rung + '.judge-stop', r.stopJudge && r.stopJudge.forCurator),
    (r.judge && r.judge !== r.stopJudge) ? numbered(r.rung + '.judge', r.judge.forCurator) : [])
}
const inPlanSection = (x) => typeof x === 'string' && PLAN_SECTIONS.some(sec => x.toLowerCase().indexOf(sec.toLowerCase().replace(/^pavol's /, '')) >= 0)
const routedIds = (results) => new Set([].concat.apply([], results.filter(Boolean).map(x => Array.isArray(x.curatorItems) ? x.curatorItems : []))
  .filter(e => e && typeof e.id === 'string' && inPlanSection(e.section)).map(e => e.id))

// ---------------------------------------------------------------------------
// The stages on the merged tree, in the main tree.
// ---------------------------------------------------------------------------

const MAIN_TREE_ROLE = [
'',
'---',
'',
'You work in the main tree, ' + MAIN + ', on branch main; the rungs\' worktrees are read-only history to you. Set up each call as the skill\'s build-and-caches.md says. The batch\'s base is ' + BASE + '. Commit locally with the skill\'s footer; push only if your role says so. Another agent of this batch may work in this tree at the same time: if a git command fails on index.lock, wait five seconds and retry, up to four times.',
'',
].join('\n')

// The texts a rung's agents returned for its files, for the gather to write where the branch
// lacks the file: the skeptic writes the worker's REPORT.md and record.md onto the branch from
// the run's journal, so these are the fallback when it could not, and the source when a repair
// round's texts replace the worker's (journal-text.py takes the last result of the labels).
const TEXT_TOOL = TOOLS + '/journal-text.py'
function rungTextCommands(r) {
  const dir = 'explorations/compile-ladder/' + r.slug + '/'
  const cmd = (file, field, labels) => 'python3 ' + TEXT_TOOL + ' --out ' + dir + file + ' ' + field + ' ' + labels
  const workers = ['rung', 'resume', 'repair'].map(p => p + ':' + r.rung).join(' ')
  const out = { 'REPORT.md': cmd('REPORT.md', 'reportText', workers), 'record.md': cmd('record.md', 'recordText', workers) }
  if (r.verdict) out['SKEPTIC.md'] = cmd('SKEPTIC.md', 'skepticText', 'skeptic:' + r.rung)
  return { textCommands: out, repaired: !!r.repaired }
}

// The pairs the gather's order puts first: each approved rung after the rungs it lands only with.
const landsAfterText = (approved) => approved.map(r => RUNGS.find(m => m.id === r.rung))
  .filter(m => m && (m.landsOnlyWith || []).length)
  .map(m => m.id + ' after ' + m.landsOnlyWith.join(' and ')).join('; ') || 'none in this batch'

function gatherRole(approved, notLanded, items) {
  return MAIN_TREE_ROLE + [
'# Your role: gather',
'',
'Compose one clean local commit per approved rung on main, then one that closes the ledger rows the rungs fixed. Nothing is merged: each branch stays as it is. You write the batch record, ' + BATCH_DIR + '/RECORD.md, once, last, with every hash it needs; no later stage rewrites it.',
'',
'First check that git status --porcelain is empty and that ' + BASE + ' is an ancestor of HEAD (git merge-base --is-ancestor); report it if not.',
'',
'## The order the rungs go in',
'',
'First, a rung goes after every rung it lands only with (landsOnlyWith in the manifest; here: ' + landsAfterText(approved) + '), so that no commit on main holds a rung without the rungs it needs. Then the rungs that share a file go in the ascending order of their lowest edited line in that file, so that a later rung\'s hunk does not shift the lines a landed record cites: a line is compared only with a line of the same file, never across files, and rungs that share no file keep the manifest\'s order. Where two shared files would order one pair both ways, the pair keeps the manifest\'s order, and the later rung\'s cited lines are re-anchored by symbol, as step 2 below says. Work it out from git diff ' + BASE + '...<branch> per branch before you apply anything, and say in your result what order you chose and why.',
'',
'## For each rung, in that order',
'',
'1. Its net change: git diff ' + BASE + '...<branch> > tmp/gather/<slug>.patch, then git apply --3way --index on it. A hunk that fails in a file another rung also touched is the conflict this stage exists to see: in unrelated regions, resolve it by hand from both sides and say so; where both changed the same logic, do not guess: leave the tree clean, and return with the conflict named. Then its files under explorations/compile-ladder/<slug>/. The branch carries REPORT.md and record.md where the skeptic wrote them from the run\'s journal, and SKEPTIC.md. Where it lacks one, run that file\'s command from textCommands below, from ' + MAIN + ' (the journal tool finds the journal itself), and compose nothing; where the rung had a repair round (repaired true), run the REPORT.md and record.md commands even where the branch carries the files, since the repair round\'s texts replace the worker\'s. A command that exits 1 wrote nothing: report the file missing; so is a SKEPTIC.md whose text is only the word committed.',
'2. Its record, record.md, folded. The FACTS.md entry under the section of its area (the file\'s README gives the rule), after the section\'s last entry: the fact, its source and its test in a few lines. Each change to an existing ledger row: a note that adds a fact with ' + LEDGER + ' note N "TEXT"; a row\'s new line, and any change to what a row says (its claim narrowed, a half fixed, its test promoted or renamed, its notes at the limit), with ' + LEDGER + ' rewrite N FILE, the whole line in a file under tmp/gather/, its claim and notes stating the gap as it stands now and not its repair history. A note the tool refuses for length goes in through rewrite, the row\'s notes cut back to what holds now: none is left out. Each new row: its line, its number cell ?, into a file under tmp/gather/, then ' + LEDGER + ' add FILE --section "TITLE", the section its writer names or the one its class fits; the tool numbers it and checks it against the template, and a row it refuses you correct to the template, keeping its claim. Replace the row\'s placeholder (NEW-<rung>-<n>) with its number everywhere the rung\'s files and tests cite it, before the rung\'s commit. The handover line in the RECORD.md of the batch, section "Handover lines" (the first section of the old handover file is retired into the first section of PLAN.md, which the coordinator keeps). The rung\'s "Revival change" section is folded into no file: copy it, both its parts word for word, or its line "Revival change: none" with the reason, to tmp/gather/<slug>-revival-change.md for step 7. Write nothing under .claude/: the batch writes no skill text, and the skill writer writes the skill from RECORD.md after the landing. Any file:line a record cites that an earlier rung\'s hunk shifted is re-anchored by symbol.',
'3. The corrections still owed: each leftForGather item of the rung\'s skeptic, below; each sentence of the specification that the rung\'s REPORT.md lists as made false by its change and that the rung did not edit, an Appendix I Effect or a note on walk or the compiled path, corrected to what the code does, each clause checked against the code line it states. Such a sentence states what the code does, so it is not a text mismatch.',
'4. Its items for the curator, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, at the line it is now at.',
'   A text mismatch is not blocking. Where one rung\'s specification text and another rung\'s code disagree and the decisions on record settle it, fix the side they settle. Where they do not, it is reversible and lands as a point to report: the text stands as the rung wrote it; the path that departs gets a ledger row and a gated XXX test asserting the text\'s rule; the text\'s entry in Specification/appendices/changes.tex names that row among its departures; all in the later rung\'s commit, and the mismatch goes in your forCurator.',
'5. One commit: the applied source and tests, the rung\'s REPORT.md, SKEPTIC.md and JUDGE.md if any, a decision record if it has one (record.md is folded, not landed: take it out of the index and the tree once step 2 has folded it), FACTS.md, the ledger and its history file, the handover, and PLAN.md when step 4 wrote to it. Stage them by an explicit list and read git diff --cached --stat before you commit. Title: what the repair does, in plain words; body: the two or three sentences of record.md that say why, and where the commit touches any path outside explorations/ and .claude/, a line beginning "historical:" naming the files of the original 2012 tree it edits, from the provenance block. The skill\'s footer. Do not push.',
'',
'## After the rungs',
'',
'6. Close each row a landed rung fixed, as its rowsClosed and REPORT.md name it, once its test passes on the merged tree as the rung last ran it: ' + LEDGER + ' close N --commit <the rung\'s commit on main> --test <the test>. Then ' + LEDGER + ' landing-check ' + BASE + ', which fails on any finding, a failure the base already had among them: a row that breaks the template, an XXX test the batch deleted or renamed that an open row still names, an open row that a landed commit says it fixed, a FACTS or POSITIONS entry that states a row\'s status otherwise. Clear each before this commit, through ' + LEDGER + ' rewrite, close or note, or the entry reworded, and run it again until it prints no finding. One commit, titled "Close the rows climb batch ' + BATCH + ' fixed".',
'7. ' + BATCH_DIR + '/RECORD.md: the rungs applied, in what order and why, each with its commit hash; the rows opened (number, rung, claim) and closed; each skeptic\'s fixes and contested rulings, by commit; every file written from the journal; the rungs that did not land (below); the points to report every landed rung reached, from the lists below; the items for the curator and where each is in PLAN.md; and last, under the heading "Revival changes, for the skill writer", one subsection per landed rung, headed by the rung, holding its "Revival change" section from tmp/gather/<slug>-revival-change.md, both parts word for word (the change, and its provenance), or its line "Revival change: none" with the reason. One commit.',
'',
(notLanded.length
  ? '## The rungs that did not land\n\nTheir source is not applied and their branches stay as they are. Their skeptics\' findings are about the tree, not the rung, so fold them under a heading "Not landed" in RECORD.md, one section per rung: the reason it did not land and the findings of its SKEPTIC.md; and add the new rows its record.md holds through ' + LEDGER + ' add, as step 2 says, in the commit that carries RECORD.md. Its items for the curator go into PLAN.md as step 4 says. Take its REPORT.md and SKEPTIC.md out of its branch by an explicit list of paths (git checkout <branch> -- <path>), writing a missing one with its command; apply none of its source.\n\n' + JSON.stringify(notLanded.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state, reason: r.withheldReason || (r.judge && r.judge.summary) || (r.worker && r.worker.stopReason) || (r.verdict && r.verdict.refusalReason) || '', skepticFindings: (r.verdict && r.verdict.findings) || [] }, rungTextCommands(r))), null, 2) + '\n'
  : '## The rungs that did not land\n\nNone: every rung of this batch was approved.'),
'',
'The approved rungs, with what their skeptics fixed and left, their rows and their points to report:',
'',
JSON.stringify(approved.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state,
  historicalFiles: (r.worker && r.worker.historicalFiles) || [], rowsClosed: (r.worker && r.worker.rowsClosed) || [], newRows: (r.worker && r.worker.newRows) || [],
  skepticFixes: ((r.verdict && r.verdict.fixes) || []).map(f => f && (f.commit + ' ' + f.kind + ': ' + f.finding)),
  rulings: (r.judge && r.judge.rulings) || [], leftForGather: (r.verdict && r.verdict.leftForGather) || [],
  pointsReached: [].concat((r.worker && r.worker.pointsReached) || [], (r.verdict && r.verdict.pointsReached) || []) }, rungTextCommands(r))), null, 2),
'',
'The items for the curator, by id (' + (items.length ? items.length + ' of them' : 'none') + '):',
'',
JSON.stringify(items, null, 2),
'',
'Return the structured result the tool requires: each rung\'s commit hash, the order and why, the conflicts and how each was resolved, the rows opened and closed, forCurator (your own points, a text mismatch the decisions do not settle among them, as gather.1, gather.2), curatorItems, one entry for every id above and every gather.N with the PLAN.md section and entry that holds it, and curatorUnrouted, every id you could not put in, with the reason. Nothing waits on these: the batch goes on to its review, gate and commit either way.',
'',
  ].join('\n')
}

const GATHER_SCHEMA = {
  type: 'object',
  properties: {
    commits: { type: 'array', items: { type: 'object', properties: { rung: { type: 'string' }, hash: { type: 'string' }, files: { type: 'array', items: { type: 'string' } } }, required: ['rung', 'hash'] } },
    applyOrder: { type: 'string', description: 'the order the rungs were applied in and what decided it: a rung after the rungs it lands only with, then the lowest edited line in each file two rungs share' },
    conflicts: { type: 'array', items: { type: 'string' }, description: 'each hunk that did not apply cleanly, the file, and how it was resolved or that it was not' },
    unresolved: { type: 'boolean', description: 'true if a conflict was left unresolved and the tree was returned to clean' },
    rowsOpened: { type: 'array', items: { type: 'string' }, description: 'one line per row added: its number, its placeholder and its rung' },
    rowsClosed: { type: 'array', items: { type: 'string' }, description: 'one line per row closed: its number, the commit and the test' },
    notLandedFolded: { type: 'array', items: { type: 'string' } },
    head: { type: 'string', description: 'the hash HEAD is at when you finish' },
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every point for the curator this gather finds itself, one entry each with its evidence as file:line; each goes into PLAN.md as gather.1, gather.2 in this order; empty if none' },
    curatorItems: CURATOR_ROUTED,
    curatorUnrouted: { type: 'array', description: 'every item for the curator you could not put into PLAN.md, for the coordinator; empty if none', items: { type: 'object', properties: {
      id: { type: 'string' }, why: { type: 'string' } }, required: ['id', 'why'] } },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'curatorItems', 'curatorUnrouted', 'summary'],
}

// The merged-diff review, once, beside the gate (POSITIONS.md, "A blocking second review does
// not hold a green batch.": it stays inside the batch as the check of the merged tree's records,
// the points and the routing before the push). Since the redesign it also reads every commit
// made after a worker's, a skeptic's fixes and a repair round, which no second skeptic reads,
// and it no longer re-reads what the skeptic read on each rung (the provenance lines, the three
// homes) or what the commit stage checks (the footers).
function reviewRole(gather, label, items, checkingByRung) {
  return MAIN_TREE_ROLE + [
'# Your role: merged-diff reviewer',
'',
'The rungs were checked one at a time in their own worktrees; nobody has yet read the changes together, nor the record as the gather folded it. You read both. THE GATE IS RUNNING BESIDE YOU in this same tree, on the gather\'s commits: keep your own corrections inside explorations/, and the gate\'s result stands.',
'',
'The composed commits: git log ' + BASE + '..HEAD; the whole change: git diff ' + BASE + '...HEAD. The gather returned:',
'',
JSON.stringify(gather, null, 2),
'',
'The commits each rung\'s branch holds after its worker\'s, which no agent has read since its skeptic or its judge made it:',
'',
JSON.stringify(checkingByRung, null, 2),
'',
'Check, and cite file:line for every finding:',
'1. No two rungs add or change the same declaration, method, trait body or operator, and no rung\'s edit depends on another\'s for its meaning or its test; and what two rungs\' changes do together: a change one rung made wrong by another\'s.',
'2. Each fix above, as the gather applied it: it does what its finding says and only that; a defect fix has its test, seen failing through the harness on the worker\'s head and then passing, in its maker\'s transcript (the run\'s directory: ' + runDirLine('review').trim() + '; then grep for its label in "$D"/agent-*.meta.json and read the transcript with jq, never whole); a settled fix cites a sentence that settles it; a fix a judge reverted is gone from the tree.',
'3. The folded record as a whole: every FACTS line true as written, sourced and checkable; every ledger note, rewrite and new row in place (' + LEDGER + ' landing-check ' + BASE + ' prints no finding, with no allowance for a failure the base already had: each finding is a record defect you fix in your corrections commit, through ' + LEDGER + ' rewrite, close or note, or the entry reworded; no NEW- placeholder left where a row is cited: grep -rn "NEW-[A-Z]-[0-9]" explorations/fortress-gap-ledger.md explorations/coordinator/FACTS.md explorations/coordinator/PLAN.md explorations/compile-ladder/ ProjectFortress/, where a line of the batch\'s RECORD.md that gives a placeholder beside its number is not a finding, and the batch record and the synthesis under explorations/coordinator/, which name the form as an example, are not searched); every row the gather closed fixed by a landed commit; the handover\'s first section consistent; the revival-change material the gather copied into ' + BATCH_DIR + '/RECORD.md, under "Revival changes, for the skill writer", true of the code as landed.',
'4. Each sentence of the specification a rung\'s REPORT.md lists as made false: corrected, by the rung or the gather, to what the code does.',
'5. The points to report: every one a landed rung reaches, in its hunks or where its REPORT.md or SKEPTIC.md says so, in your pointsReached with the rung, the evidence and holdsPush; true only for a step taken that cannot be undone or acts against a decision on record. It is not a blocking finding.',
'6. The items for the curator: for each id below, the PLAN.md entry the gather\'s curatorItems names is in explorations/coordinator/PLAN.md, under one of the two sections, and says what the item says; one missing or misplaced you put in yourself in your corrections commit. Your own points go in forCurator, as ' + label + '.1, ' + label + '.2. ' + PLAN_RULE + ' It is not a blocking finding.',
'',
'The items for the curator from the rungs and the gather, by id:',
'',
JSON.stringify(items, null, 2),
'',
'Three kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections". A defect whose repair touches a path outside explorations/ that is not a test file (source, library, checker, interpreter or specification) you do not fix: return it in blockingCode, precisely enough that a judge can rule on it from your words and the diff; a repair runs, and the gate runs again only when it changed a path the gate reads (ProjectFortress/ but test files, Library/, build.xml). A finding settled by tests and records only that you do not fix yourself, a test owed or a test file to change, you return in routed, each with the step the next batch owes; put each into PLAN.md as review-routed.1, review-routed.2 in your corrections commit, and list the ids in curatorItems: it goes to the next batch and holds nothing. A text mismatch the gather filed as a point to report is not blocking: check its row, its XXX test and its Appendix I mention; complete a missing record yourself; return a missing test in routed. Do not run the gate, and do not push.',
'',
'Record the hash HEAD is at before your corrections commit and the hash after, run git diff --name-only <before> <after>, and return both hashes and every path it prints that is not under explorations/. Do not touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, which are the gate\'s.',
'',
  ].join('\n')
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    approved: { type: 'boolean', description: 'true if blockingCode is empty after your own record fixes' },
    blockingCode: { type: 'array', items: { type: 'string' }, description: 'findings whose repair touches a path outside explorations/ that is not a test file, each with file:line and the rule or claim it breaks; empty if none' },
    routed: { type: 'array', items: { type: 'string' }, description: 'findings settled by tests and records only that you did not fix, each with file:line and the step the next batch owes; each into PLAN.md as review-routed.N; empty if none' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'record or mechanical defects you fixed, and the commit hash' },
    fixesChecked: { type: 'array', items: { type: 'string' }, description: 'one line per skeptic fix or repair commit you checked: the commit and what you found' },
    headBefore: { type: 'string' },
    headAfter: { type: 'string' },
    pathsOutsideExplorations: { type: 'array', items: { type: 'string' }, description: 'every path from git diff --name-only <headBefore> <headAfter> that is not under explorations/; empty if none' },
    pointsReached: STATE_SCHEMA_POINTS,
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every point for the curator this review finds, with its evidence as file:line; empty if none' },
    curatorItems: CURATOR_ROUTED,
    summary: { type: 'string' },
  },
  required: ['approved', 'blockingCode', 'routed', 'fixed', 'fixesChecked', 'pointsReached', 'forCurator', 'curatorItems', 'summary'],
}

// ---------------------------------------------------------------------------
// The gate. Its steps and their reasons are the skill's gate.md, which this role follows; what
// stands here is what the skill points to the script for: the calls of the shell functions that
// write and compare the summary and the ladder (tools/gate-functions.sh, which a gate run by hand
// sources too), the atomic runs' lines in the summary, the checker count and the distance stage
// (the ladder's metrics, which the skill does not carry: POSITIONS.md, "The skills are written for
// a reader new to the repository ..."), testSpecData once a rung brings it, and the machine line.
// It commits nothing: the review commits in this tree beside it, and the commit stage lands its
// outputs.
// ---------------------------------------------------------------------------

const ATOMIC_OTHER = 'atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 nestedTransactions0 nestedTransactions1 nestedTransactions2'
const ATOMIC_COMPILER = 'AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG'
const GATE_FUNCTIONS = TOOLS + '/gate-functions.sh'   // gate_summary, gate_compare, last_landed_summary, ladder_filter, ladder_compare, mg_phases; its gate_summary writes the machine line

function gateRole(expectedMoves, expectedChecker, specData) {
  return MAIN_TREE_ROLE + [
'# Your role: the gate',
'',
'Run the full gate once on the tree as it stands, as the skill\'s gate.md gives it, and report what it says. You change no source and commit nothing: the review is committing in this tree beside you, and the commit stage lands your outputs. Logs go to ' + LOG_DIR + '/, which is untracked; your three outputs are ' + GATE_OUT + '/summary.txt, checker-count.txt and distance.txt, written by the functions and scripts below and never by hand. Start every long step detached with nohup and wait for it with wait_for, both as the skill\'s session.md, "Long commands", gives them.',
'',
'1. mkdir -p ' + LOG_DIR + ' ' + GATE_OUT + '. The disk check of gate.md\'s step 1.',
'2. rm -rf ProjectFortress/TEST-RESULTS, then ant compileAll to ' + LOG_DIR + '/compileAll.txt; BUILD SUCCESSFUL must end it. At once, before step 3, start the distance stage in the background, once per gate run and never a second beside it; it reads only ProjectFortress/build and the library sources, with its own caches and temporary folder, and step 9 reads it:',
'',
'        nohup bash -c \'( ' + DIST_RUN + ' ' + GATE_OUT + '/distance.txt ' + LOG_DIR + '/distance ) > ' + LOG_DIR + '/distance.txt 2>&1; echo EXIT=$? >> ' + LOG_DIR + '/distance.txt\' >/dev/null 2>&1 &',
'',
'3. If step 2\'s build printed "Caches <tree>/default_repository/caches started again, empty", run the library order (the skill\'s build-and-caches.md) to ' + LOG_DIR + '/library.txt. Then, before anything else compiles into the caches, the ladder\'s two copies: mkdir -p ' + LOG_DIR + '/ladder/root, then cp -a default_repository/caches to ' + LOG_DIR + '/ladder/root/ladder-caches and to ' + LOG_DIR + '/ladder/root/pristine.',
'4. ant testFast to ' + LOG_DIR + '/testFast.txt, then ant testSystem to ' + LOG_DIR + '/testSystem.txt, never both at once. Both run at four threads, pinned in build.xml whatever the shell exports (POSITIONS.md, "The suites run Fortress in parallel.").' + (specData
  ? ' Then ant testSpecData to ' + LOG_DIR + '/testSpecData.txt: ' + specData + '; every example must pass.'
  : ''),
'5. The summary, with the machine it ran on, and its comparison with the last landed one. Its functions, and those of step 7, are in ' + GATE_FUNCTIONS + ': source it from ' + MAIN + ', with FORTRESS_HOME set as the skill\'s build-and-caches.md says, in each call that uses them, since each call starts a new shell:',
'',
'        source ' + GATE_FUNCTIONS,
'',
'   Then gate_summary ' + LOG_DIR + ' ' + GATE_OUT + '/summary.txt "gate batch ' + BATCH + '", and gate_compare "$(last_landed_summary)" ' + GATE_OUT + '/summary.txt. A COUNT DOWN or SUITE GONE line is red, with the suite named: it almost always means a .test file or a tests= line went missing. A count that went up is the batch\'s new tests. A suite that is new in the summary is not red by itself.',
'6. The four-thread atomic runs of gate.md, their lines appended to the summary:',
'',
'        ATOMIC_OTHER="' + ATOMIC_OTHER + '"        # other_compiler_tests/',
'        ATOMIC_COMPILER="' + ATOMIC_COMPILER + '"  # compiler_tests/',
'        atomic_runs () {                  # atomic_runs <out-file>; appends "# atomic ..." lines, exit 1 if any is not PASS',
'            local O="$1" p d i out rc',
'            case "$O" in /*) ;; *) O="$PWD/$O" ;; esac     # resolve before the cd',
'            cd "$FORTRESS_HOME/ProjectFortress" || return 1',
'            for p in $ATOMIC_COMPILER $ATOMIC_OTHER ; do',
'                case " $ATOMIC_COMPILER " in *" $p "*) d=compiler_tests ;; *) d=other_compiler_tests ;; esac',
'                [ -f "$d/$p.fss" ] || { echo "# atomic $p ABSENT" >> "$O" ; continue ; }',
'                if ! timeout -k 5 300 ../bin/fortress compile "$d/$p.fss" >/dev/null 2>&1 ; then',
'                    echo "# atomic $p COMPILE-FAILED" >> "$O" ; continue',
'                fi',
'                for i in 1 2 3 ; do',
'                    out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run "$p" 2>&1) ; rc=$?',
'                    if [ "$rc" -eq 124 ] ; then',
'                        out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run "$p" 2>&1) ; rc=$?',
'                        [ "$rc" -eq 124 ] && { echo "# atomic $p run$i threads=4 TIMEOUT-TWICE" >> "$O" ; continue ; }',
'                    fi',
'                    case "$out" in',
'                      *FAIL*) echo "# atomic $p run$i threads=4 FAIL" >> "$O" ;;',
'                      *PASS*) echo "# atomic $p run$i threads=4 PASS" >> "$O" ;;',
'                      *)      echo "# atomic $p run$i threads=4 NO-PASS rc=$rc" >> "$O" ;;',
'                    esac',
'                done',
'            done',
'            ! grep -q \'FAIL\\|TIMEOUT-TWICE\\|NO-PASS\\|COMPILE-FAILED\' "$O"',
'        }',
'',
'   Run atomic_runs ' + GATE_OUT + '/summary.txt: 42 lines. Any FAIL, NO-PASS, COMPILE-FAILED or TIMEOUT-TWICE is red; a single timeout whose re-run passes is not.',
'7. The ladder regression, as gate.md\'s "The ladder regression" runs it, with OUT at ' + LOG_DIR + '/ladder and LADDER_ROOT at ' + LOG_DIR + '/ladder/root, where step 3 put the two copies. The eighteen microGPT components are compiled only, never linked or run here. Compare with ladder_compare and mg_phases from ' + GATE_FUNCTIONS + ', sourced as in step 5:',
'',
'   ladder_compare explorations/compile-ladder/baseline-2026-09-19 ' + LOG_DIR + '/ladder, and diff <(mg_phases explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.md) <(mg_phases ' + LOG_DIR + '/ladder/microgpt-phase.md). Append the output to the summary, each line prefixed "# ladder ", and copy ladder.tsv, microgpt-phase.md and the comparison into ' + GATE_OUT + '/ladder/. A DOWN, a STDOUT or a MISSING line is red unless the manifest declared it; a move up is the batch\'s result. Declared moves:',
'',
(expectedMoves.length ? expectedMoves.map(m => '     - ' + m).join('\n') : '     (none: no rung of this batch expects to move a ladder file)'),
'',
'8. The checker count: the compiled checker over the interpreter\'s library, compared with the last landed table. Read the header of ' + COUNT_RUN + ', then run it from ' + MAIN + ':',
'',
'        ' + COUNT_RUN + ' ' + GATE_OUT + '/checker-count.txt ' + LOG_DIR + '/checker-count',
'',
'        last_landed_checker_count () {',
'            git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \\',
'                \'explorations/compile-ladder/gate-baseline/checker-count.txt\' \\',
'                \'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt\' | grep -m1 \'checker-count.txt$\'',
'        }',
'        checker_compare () {              # checker_compare <last-landed-table> <this-table> [declared-totals] [declared-crash]; exit 1 if red; the total is never red',
'            local was now wasc nowc bad=0 decl="${3:-none}"',
'            was=$(awk -F\'\\t\' \'$1 == "#total" { print $2 }\' "$1")',
'            now=$(awk -F\'\\t\' \'$1 == "#total" { print $2 }\' "$2")',
'            wasc=$(awk -F\'\\t\' \'$1 == "#crash" { print $2 }\' "$1")',
'            nowc=$(awk -F\'\\t\' \'$1 == "#crash" { print $2 }\' "$2")',
'            [ -n "$now" ] || { echo "NO TOTAL   the table has no #total row" ; return 1 ; }',
'            if [ "$now" -gt "$was" ] ; then echo "COUNT UP   $was -> $now, declared $decl"',
'            elif [ "$now" -lt "$was" ] ; then echo "COUNT DOWN   $was -> $now, declared $decl"',
'            else echo "COUNT SAME   $now, declared $decl" ; fi',
'            if [ "$nowc" != "$wasc" ] ; then',
'                if [ -n "${4:-}" ] && [ "$nowc" = "$4" ] ; then echo "CRASH DECLARED   $wasc -> $nowc"',
'                else echo "CRASH CHANGED   $wasc -> $nowc" ; bad=1 ; fi',
'            fi',
'            case "$(awk -F\'\\t\' \'$1 == "#shadow" { print $2 }\' "$2")" in',
'              STALE*) echo "SHADOW STALE   the instrumented StaticChecker copy no longer matches the tracked one" ; bad=1 ;;',
'            esac',
'            diff "$1" "$2" | sed \'s/^/    /\'',
'            [ "$bad" = 0 ]',
'        }',
'',
'   Run checker_compare "$(last_landed_checker_count)" ' + GATE_OUT + '/checker-count.txt "' + ((expectedChecker && expectedChecker.counts && expectedChecker.counts.length) ? expectedChecker.counts.join(', ') : 'none') + '"' + ((expectedChecker && expectedChecker.crashes && expectedChecker.crashes.length) ? ' "' + expectedChecker.crashes[0].replace(/^[^:]*: /, '') + '"' : '') + ' and append its output to the summary, each line prefixed "# checker ". The total is reported and never red (POSITIONS.md, P-39); a crash line no rung declared, SHADOW STALE and NO TOTAL (a library that stops before the checker) are red.',
'9. The distance stage started at step 2: wait for it with wait_for ' + LOG_DIR + '/distance.txt, called again until it prints its EXIT= line, and never start it again. Then ' + DIST_COMPARE + ' "$(git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \'explorations/compile-ladder/gate-baseline/distance.txt\' \'explorations/compile-ladder/climb-batch-*/gate/distance.txt\' | grep -m1 \'distance.txt$\')" ' + GATE_OUT + '/distance.txt, its output appended to the summary, each line prefixed "# distance ". It is reported and never red, whatever it prints.',
'',
'## What green means',
'',
'Zero failures and zero errors in every suite of testFast and testSystem' + (specData ? ' and testSpecData' : '') + ', BUILD SUCCESSFUL on each build and suite, no COUNT DOWN and no SUITE GONE line, every atomic run PASS, no undeclared DOWN, STDOUT or MISSING line from the ladder, and from the checker count an unchanged crash line, unless a rung declared it, and no stale shadow. Anything else is red. Return the structured result; if red, name every failing test and copy the first failure\'s output lines into it.',
'',
  ].join('\n')
}

const GATE_SCHEMA = {
  type: 'object',
  properties: {
    green: { type: 'boolean' },
    compileAll: { type: 'string', description: 'BUILD SUCCESSFUL or the first error' },
    testFast: { type: 'string', description: 'suites, tests, failures, errors' },
    testSystem: { type: 'string', description: 'shards, tests, failures, errors' },
    testSpecData: { type: 'string', description: 'tests, failures, errors, or not run' },
    countsDown: { type: 'array', items: { type: 'string' }, description: 'every COUNT DOWN or SUITE GONE line, with the suite named; empty if none' },
    atomicFourThread: { type: 'string', description: 'how many of the 42 runs PASS, and every line that is not PASS' },
    ladder: { type: 'string', description: 'moves up, moves down, stdout differences, and which were declared' },
    checkerCount: { type: 'string', description: 'the total, the last landed total, the crash line, every verdict line, the rows that moved' },
    distance: { type: 'string', description: 'the table\'s #total, the verdict line of compare.sh with the last landed total, the kinds and classes that moved, the crashes that went or came, #seconds and #shadow; or why the run produced no table' },
    failing: { type: 'array', items: { type: 'string' }, description: 'failing test names with the key output line each' },
    stopped: { type: 'boolean', description: 'true if the gate could not be run (disk, a build failure before the tests)' },
    summary: { type: 'string' },
  },
  required: ['green', 'failing', 'stopped', 'summary'],
}

// After a repair on the merged tree, the gate runs again only for a path it reads (POSITIONS.md,
// "A tests-only repair does not rerun the gate." and "Nothing is built or run twice on the same
// code."): under ProjectFortress/ but a test file a passing run of the repair exercised, under
// Library/, or build.xml. Every other path, the specification's text and the skill's among them,
// leaves the first gate's tables standing, recorded beside its summary.
const TEST_FILE = /^ProjectFortress\/(tests|[A-Za-z_]+_tests)\/[^/]+\.(fss|fsi|test)$/
const repoPath = (p) => p.trim().replace(/^\.\//, '')
const codePathsOf = (paths) => strings(paths).map(repoPath).filter(p => !p.startsWith('explorations/') && !p.startsWith('.claude/') && !TEST_FILE.test(p))
const testPathsOf = (paths) => strings(paths).map(repoPath).filter(p => TEST_FILE.test(p))
const GATE_READS = 'ProjectFortress/, Library/ or build.xml'
const gateReads = (p) => /^(ProjectFortress|Library)\//.test(p) || p === 'build.xml'
const gateCodeOf = (paths) => codePathsOf(paths).filter(gateReads)
const ungatedOf = (paths) => codePathsOf(paths).filter(p => !gateReads(p))

function repairTestsStep(kind, failing) {
  return [
'',
'## Your tests, and whether the gate runs again',
'',
'Record the hash HEAD is at before your first commit and after your last, return both, and in pathsChanged every path git diff --name-only <before> <after> prints. The script decides from it whether the whole gate runs again after you: a path the gate reads that is not a test file (under ProjectFortress/ or Library/, or build.xml) reruns it; the specification\'s text and other prose do not, and the first gate\'s tables stand beside a record of those paths; test files do not, when your runs below pass them.',
'',
'Every test file you add or change you run in the harness on the merged tree, placed where the gate reads it, all the files of one corpus together in one JVM, as the gate\'s tracks run them (the skill\'s tests-running.md: ONE_JVM=1 junit.sh for the .test files of each compiled corpus, harness-one.sh once for the interpreter tests), each run captured under ' + LOG_DIR + '/repair-' + kind + '-tests/, not committed. In testRuns return one entry per file: the file, the test paths its lines exercise, the summary row it adds to (fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system), the JUnit cases it adds, its verdict (pass only when its run printed OK), and the capture. A test path you changed that no run exercises, or a run that did not pass, reruns the gate.',
...(kind === 'gate' ? [
'',
'The gate was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'In failingAnswered return one entry per line, in order: the line, and the testRuns file whose passing run now answers it, or empty where none does. The gate does not run again only when every line is answered and your commit changed no path that reruns it.',
] : strings(failing).length ? [
'',
'The gate that ran beside the review was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'Your ruling is the review\'s: take on no line it does not touch. Where your ruling\'s edit is to the test a line names and your run passes it, that run answers the line. In failingAnswered return one entry per line, in order, with the answering file or empty. When every line is answered and your commit changed no path that reruns the gate, no gate judge and no gate repair run after you.',
] : []),
'',
  ]
}

function mergedRepairRole(decision, kind, failing) {
  return MAIN_TREE_ROLE + [
'# Your role: repair on the merged tree (' + kind + ')',
'',
...sliceStep(RUNGS, 'the main tree (' + MAIN + ')', 'First, for the rungs the ruling\'s instructions name and no other (by letter, slug or a path a rung\'s commit changed),'),
'   Run none where the instructions name no rung.',
'',
'The judge has ruled on the merged tree; you carry out the ruling. Its decision:',
'',
JSON.stringify(decision, null, 2),
'',
(strings(decision && decision.forCurator).length
  ? 'The judge marked these for the curator. ' + PLAN_RULE + ' The entries go in your commit, and curatorItems lists each by its id.\n\n' + JSON.stringify(numbered('judge-' + kind, decision.forCurator), null, 2) + '\n\n'
  : '') + 'Its full ruling is ' + BATCH_DIR + '/JUDGE-' + kind + '.md. Carry out the instructions in order; where one turns out wrong against a primary source, do what the source says and record the deviation in ' + BATCH_DIR + '/REPAIR-' + kind + '.md with the file:line that settles it. Every edit of code is test first, as the skill\'s tests-writing.md says; build what your edit needs (build-and-caches.md); commit locally, one commit, the records updated where the ruling says, a historical: line in the body if the commit touches a file of the 2012 tree. Do not run the full gate and do not push.',
...repairTestsStep(kind, failing),
  ].join('\n')
}

const MERGED_REPAIR_SCHEMA = Object.assign({}, RUNG_SCHEMA, {
  properties: Object.assign({}, RUNG_SCHEMA.properties, {
    curatorItems: CURATOR_ROUTED,
    headBefore: { type: 'string', description: 'the hash HEAD was at before your first commit' },
    headAfter: { type: 'string', description: 'the hash HEAD is at after your last commit' },
    pathsChanged: { type: 'array', items: { type: 'string' }, description: 'every path git diff --name-only <headBefore> <headAfter> prints' },
    testRuns: { type: 'array', description: 'one entry per test file added or changed outside explorations/, run on the merged tree with the other files of its corpus; empty if none',
      items: { type: 'object', properties: {
        file: { type: 'string' },
        paths: { type: 'array', items: { type: 'string' } },
        suite: { type: 'string', description: 'fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system' },
        cases: { type: 'integer' },
        verdict: { type: 'string', enum: ['pass', 'fail'] },
        capture: { type: 'string' },
      }, required: ['file', 'paths', 'suite', 'cases', 'verdict', 'capture'] } },
    failingAnswered: { type: 'array', description: 'one entry per line of the gate\'s failing list when it is in your role; otherwise empty',
      items: { type: 'object', properties: { failing: { type: 'string' }, file: { type: 'string' } }, required: ['failing', 'file'] } },
  }),
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'pointsReached', 'summary', 'headBefore', 'headAfter', 'pathsChanged', 'testRuns'],
})

// Whether the gate runs again after a repair on the merged tree (repairRerun): when the repair,
// or the review's corrections before it, changed a path the gate reads that is not a test file;
// when a test path they changed is not exercised by a passing run; when the repair did not say
// what it changed; and, after the gate's repair, when the gate's own counts fell, when it named
// no failing line, or when a line it failed on is not answered by a passing run.
function repairRerun(repair, reviewPaths, redGate) {
  if (!repair) return { rerun: true, why: 'the repair returned nothing' }
  if (!Array.isArray(repair.pathsChanged)) return { rerun: true, why: 'the repair did not list the paths it changed' }
  const changed = strings(repair.pathsChanged).concat(strings(reviewPaths))
  const code = gateCodeOf(changed)
  if (code.length) return { rerun: true, why: 'changed a path the gate reads (' + GATE_READS + '), not a test file: ' + code.join(', ') }
  const runs = Array.isArray(repair.testRuns) ? repair.testRuns.filter(t => t && typeof t === 'object') : []
  const passing = runs.filter(t => t.verdict === 'pass')
  if (passing.length < runs.length) return { rerun: true, why: 'a test run of the repair did not pass: ' + runs.filter(t => t.verdict !== 'pass').map(t => t.file).join(', ') }
  const exercised = new Set([].concat.apply([], passing.map(t => testPathsOf([t.file].concat(strings(t.paths))))))
  const unrun = testPathsOf(changed).filter(p => !exercised.has(p))
  if (unrun.length) return { rerun: true, why: 'test path(s) no passing run of the repair exercises: ' + unrun.join(', ') }
  const lines = redGate ? strings(redGate.failing) : []
  if (redGate) {
    if (strings(redGate.countsDown).length) return { rerun: true, why: 'the gate\'s own counts fell or a suite went: ' + strings(redGate.countsDown).join('; ') }
    if (!lines.length) return { rerun: true, why: 'the gate was red and named no failing line for the repair to answer' }
    const answers = Array.isArray(repair.failingAnswered) ? repair.failingAnswered : []
    const passed = new Set(passing.map(t => repoPath(String(t.file))))
    const open = lines.filter(l => !answers.some(a => a && String(a.failing).trim() === l.trim() && typeof a.file === 'string' && passed.has(repoPath(a.file))))
    if (open.length) return { rerun: true, why: 'gate line(s) no passing run of the repair answers: ' + open.join('; ') }
  }
  const ungated = ungatedOf(changed)
  const kinds = [testPathsOf(changed).length ? 'test files' : '', ungated.length ? 'paths no gate stage reads (' + ungated.join(', ') + ')' : ''].filter(Boolean)
  return { rerun: false, runs: passing, answered: lines.length ? repair.failingAnswered : [], ungated, why: (kinds.length ? kinds.join(', ') + ' and ' : '') + 'records only' }
}

// The push is held only by a step taken that cannot be undone, or that acts against a decision
// on record (POSITIONS.md, "Reversible stops do not hold a batch."; the curator's comment of
// 2026-10-06: points to report, not stops). Read from each landed rung's last worker and its
// skeptic, the review, and the repairs on the merged tree; an entry that is not an object with a
// boolean holdsPush holds too.
function pushHeldBy(landed, review, repairs) {
  const holds = (s) => !(s && typeof s === 'object' && typeof s.holdsPush === 'boolean') || s.holdsPush
  const line = (id, s) => id + ': ' + ((s && s.point) || String(s)) + ((s && s.evidence) ? ' (' + s.evidence + ')' : '')
  const own = [].concat.apply([], landed.map(r => [].concat((r.worker && r.worker.pointsReached) || [], (r.verdict && r.verdict.pointsReached) || [])
    .filter(holds).map(s => line(r.rung, s))))
  const reviewed = ((review && review.pointsReached) || []).filter(holds).map(s => line((s && s.rung) || 'review', s))
  const repaired = [].concat.apply([], Object.keys(repairs || {}).filter(k => repairs[k]).map(k => (repairs[k].pointsReached || []).filter(holds).map(s => line(k, s))))
  return own.concat(reviewed, repaired)
}

// The repairs whose tests, or whose paths no gate stage reads, stand beside the gate's summary
// instead of a second gate: each { kind, runs, answered, ungated, commits }.
function besideStep(beside) {
  if (!beside.length) return []
  const cases = [].concat.apply([], beside.map(b => b.runs || [])).reduce((n, t) => n + (Number(t.cases) || 0), 0)
  const runs = beside.some(b => (b.runs || []).length)
  const ungated = beside.some(b => strings(b.ungated).length)
  return [
'1a. The gate below ran on the tree before a repair on the merged tree, or the review\'s corrections, that changed no path the gate reads (' + GATE_READS + ') but test files the repair ran, so it did not run again (POSITIONS.md, "A tests-only repair does not rerun the gate."): its tables stand. Record that beside the summary, in step 1\'s commit, after the gate\'s own lines, tab-separated:'
  + ' ' + [ungated ? 'for each entry below with ungated paths, a line "# repair-ungated" with its kind, its commits and those paths, saying that the tables above are of the tree before them' : '',
           runs ? 'one line per run below, prefixed "# repair-tests", with the repair\'s kind, the summary row it adds to, its JUnit cases, its verdict and the file; then, for each line the gate failed on that the repair answered, a line "# repair-tests answered", the gate\'s line and the file whose run answers it; and last "# repair-tests total" with ' + cases + ', the cases these runs add' : ''].filter(Boolean).join('; then ')
  + '. Do not change the gate\'s own rows. The entries:',
'',
JSON.stringify(beside, null, 2),
'',
  ]
}

const COMMIT_TITLE = 'Record the gate\'s tables and the microGPT walk check'
const MG_LOG = LOG_DIR + '/microgpt-walk.txt'
const MG_DIR = LOG_DIR + '/microgpt-walk'

// The commit stage. The gather already put every hash where it belongs and closed the rows the
// batch fixed through ledger.py, so this stage lands the gate's outputs, writes FACTS.md's landed
// figures, runs the microGPT walk check, which takes about a minute (POSITIONS.md, "The microGPT
// walk check is quick."), pushes main to its three branches, and removes the worktrees.
function commitRole(gather, gate, heldBy, beside) {
  const held = heldBy.length > 0
  beside = beside || []
  const answered = beside.some(b => strings((b.answered || []).map(a => a && a.failing)).length)
  const tree = beside.length
    ? 'The gate ran on the tree before a repair, or the review\'s corrections, that changed no path the gate reads but test files the repair ran, and did not run again; its tables stand, ' + (answered ? 'the lines it was red on answered by the repair\'s passing runs' : 'green') + ' (step 1a).'
    : 'The gate is green on the tree as it stands.'
  return MAIN_TREE_ROLE + [
'# Your role: commit',
'',
tree + (held ? ' Land it on the local main; the script holds the push (step 3).' : ' Land it.'),
'',
'0. Start the microGPT walk check on the landed tree in the background, first, so that it runs while you work, and only if no earlier attempt started it (its log exists once it is started):',
'',
'        [ -e ' + MG_LOG + ' ] || nohup bash -c \'( ' + TOOLS + '/mg-run.sh ' + MG_DIR + ' batch-' + BATCH + ' ) > ' + MG_LOG + ' 2>&1; echo EXIT=$? >> ' + MG_LOG + '\' >/dev/null 2>&1 &',
'',
'   The tool runs the quick pair, MicroGptFlatQuick and MicroGptAplQuick, under walk, both at once, each from an empty private cache: two passes against the reference values, about a minute in all. Never pass it full.',
'1. Copy the gate\'s outputs into the tree: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/, and ' + LOG_DIR + '/distance/errors.tsv to ' + SITES + ' (mkdir -p its folder), the per-site list the next batch\'s rungs read as their before. Write the landed figures into explorations/coordinator/FACTS.md, numbers only, by python3 ' + TOOLS + '/record.py set N FILE (its header gives the form), FILE the entry\'s whole new line under ' + LOG_DIR + '/, one call per entry, with --by "climb batch ' + BATCH + ' commit stage" and a --note naming the lines read; the tool writes FACTS-history.md beside it, and python3 ' + TOOLS + '/record.py check --base <the commit before your edits> prints 0 failures before the commit. In F-53, from ' + GATE_DIR + '/distance.txt and checker-count.txt: every figure it gives of the last landed gate, the lines of distance.txt it cites and the batch number in its title and in the paths it cites. In F-240, in its own form, the two stages\' seconds at the last landed gate: the count stage\'s, which its table does not record, from the gate\'s log, echo $(( $(stat -c %Y ' + LOG_DIR + '/checker-count/run.txt) - $(stat -c %Y ' + LOG_DIR + '/checker-count/javac.txt) )), the stage\'s start to its last write, written "about N s" to the nearest 5 s (where F-240 names the gate\'s call times as that figure\'s source, name the file times of the gate\'s log; where the two files are gone, leave the figure and say so in your summary); the distance stage\'s from distance.txt, its #seconds line\'s total and FortressLibrary figure, the first load of its #machine line and the components its first line counts; the figures F-240 gave of the gate before, as the figures it now compares them against, with that gate\'s batch; and the batch number in its title and in the path it cites. Change no other word; a sentence the new figures make false you name in your summary for the coordinator. When a landed commit changed a file under Specification/ (git diff --name-only ' + BASE + '..HEAD -- Specification/), build the PDF once, in Specification/fortress/, ./ant genSource then ./ant tex, each logged under ' + LOG_DIR + '/, and copy Specification/fortress/fortress.pdf to Specification/fortress.pdf. Then wait for step 0 with wait_for ' + MG_LOG + ', called again until it prints EXIT= (or 10 minutes have passed, which you then report), and append to ' + GATE_DIR + '/summary.txt its verdict lines, each prefixed "# microgpt-walk ": grep -h "VERDICT\\|^rc=" ' + MG_DIR + '/*.txt for the run\'s folder. A FAIL there is reported, and holds nothing. One commit, titled "' + COMMIT_TITLE + '": the summary, the two tables, ladder/, the per-site list, FACTS.md with FACTS-history.md, and the PDF; the logs under ' + LOG_DIR + '/ are never committed.',
...besideStep(beside),
'2. Check every commit since ' + BASE + ' (git log ' + BASE + '..HEAD --format=%B): each ends with the skill\'s two footer lines, none holds a model identifier, and each whose diff touches a path outside explorations/ and .claude/ carries a historical: line. Then run git diff --name-only ' + BASE + ' HEAD -- .claude/: it should print nothing, since a batch writes no skill text (the skill writer writes the skill from ' + BATCH_DIR + '/RECORD.md after the landing). Return every path it prints in skillTouched, for the coordinator; it holds nothing.',
held
  ? '3. Do NOT push: not main and no other branch. The script holds the push, because the batch took steps that cannot be undone or that act against a decision on record, and only the curator lifts them:\n\n' + heldBy.map(h => '- ' + h).join('\n') + '\n\n   Append to ' + BATCH_DIR + '/RECORD.md a paragraph headed "Not pushed." naming each, with its rung and evidence and the hash origin/main stays at; commit it locally.'
  : '3. Push main to its three branches, as the skill\'s committing.md says: git push origin main, then ' + PUSH_BRANCHES.map(b => 'git push origin main:' + b).join(', then ') + '. Retry a failed push up to four times, 2, 4, 8 and 16 seconds apart.',
held
  ? '4. Keep every wip/ worktree and its local branch: their removal follows the push.'
  : '4. For each rung\'s worktree (' + RUNGS.map(r => r.path).join(', ') + ', where it exists): confirm git -C <worktree> status -sb shows nothing ahead of its origin; then git worktree remove <worktree>, without --force (its ignored tmp/, the old code\'s private caches among it, goes with it), and git branch -D <branch>. A worktree git refuses to remove holds uncommitted or untracked work: keep it and its branch, and name it in your result with its git status --short. The base build, ' + BASE_BUILD + ', is the coordinator\'s and stays. Leave the remote wip/ branches.',
'',
'The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'The gate stage returned:',
'',
JSON.stringify(gate, null, 2),
'',
'Return the structured result: the hash main is at, the branches pushed (empty when held), pushHeld and heldBy, what was cleaned up, in skillTouched the paths of step 2\'s check of .claude/, and in microgptWalk the verdict lines of the two programs.',
'',
  ].join('\n')
}

const COMMIT_SCHEMA = {
  type: 'object',
  properties: {
    mainHead: { type: 'string' },
    pushed: { type: 'array', items: { type: 'string' }, description: 'the branches pushed; empty when the push is held' },
    cleanedUp: { type: 'array', items: { type: 'string' } },
    pushHeld: { type: 'boolean' },
    heldBy: { type: 'array', items: { type: 'string' } },
    microgptWalk: { type: 'string', description: 'each program\'s VERDICT and rc= lines, or why the check did not finish' },
    skillTouched: { type: 'array', items: { type: 'string' }, description: 'every path git diff --name-only BASE HEAD -- .claude/ prints; empty if none' },
    summary: { type: 'string' },
  },
  required: ['mainHead', 'pushed', 'pushHeld', 'microgptWalk', 'skillTouched', 'summary'],
}

// ---------------------------------------------------------------------------
// An agent that comes back with nothing, and the retry (climb-batch-workflow.md, "An agent that
// comes back with nothing"; "A usage limit stops the run and decides nothing").
//
// agent() returns null for an agent the harness marked failed, even after it delivered its
// result (FACTS.md, "agent() in a Workflow returns null ..."), and throws on a malformed call, a
// spent budget or an abort. callAgent is the one door to agent(): it treats null, undefined and a
// thrown error alike, runs the role again up to two more times, each retry's prompt opening with
// what the earlier attempt may have left (the recover functions below) and its label ending
// ":attempt<n>", so that no two attempts share a journal key; attempt 1 is the call unchanged.
// A usage or rate limit (LIMIT_ERROR), or a role whose nothing would be read as a decision (a
// rung worker, a skeptic or a judge: needed), stops the run and decides nothing; resumeFromRunId
// with the same script and args then runs the stopped role again. The gather, the review, the
// gate, the commit and a repair on the merged tree that come back with nothing keep their
// paths.
// ---------------------------------------------------------------------------

const ATTEMPTS = 3
const LIMIT_ERROR = /usage limit|rate limit|rate_limit|ratelimit|weekly limit|daily limit|hit your .{0,30}limit|limit reached|reached your .{0,30}limit|too many requests|\b429\b/i
let runStop = null

function stopRun(why) {
  if (!runStop) {
    runStop = why
    log('The run stops here, nothing decided: ' + why + '. No agent starts after this. Resume it with resumeFromRunId, the same script and the same args, once the cause is gone (a usage limit reset): the agents that finished come back from the journal, and this role runs again.')
  }
  return new Error('Run stopped, nothing decided: ' + runStop + '. Resume it with resumeFromRunId, the same script and the same args, once the cause is gone; the agents that finished come back from the journal, and the role that stopped it runs again.')
}

function retryHead(role, attempt, recovery) {
  const earlier = attempt === 2 ? 'The first attempt' : 'The first ' + ['', 'one', 'two', 'three', 'four'][attempt - 1] + ' attempts'
  return [
'# Attempt ' + attempt + ' of ' + ATTEMPTS + ' at the role ' + role + ': read this first',
'',
earlier + ' at this same role ended without returning a result to the script: a false positive of the API\'s safety filter, or an agent that died. What came before you may have done none of this role\'s work, part of it, or all of it. What it left is yours: read it first, continue from where it stopped rather than redo it, and return the result your role asks for. Say in your summary that you are attempt ' + attempt + ', what you found, and what you took over.',
'',
'What ' + (attempt === 2 ? 'the earlier attempt' : 'the earlier attempts') + ' may have left, and how to take it over:',
'',
...recovery.map(s => '- ' + s),
'',
'The brief below is the one the first attempt received, word for word. Where it assumes a fresh start, read it as continuing from the state you found.',
'',
  ].join('\n')
}

async function callAgent(prompt, opts, recovery, needed) {
  const role = opts.label
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (runStop) throw stopRun()
    const retry = attempt > 1
    let result = null
    let why = 'no result (null: the agent died, was blocked, or was skipped)'
    try {
      result = await agent(retry ? retryHead(role, attempt, recovery) + prompt : prompt,
                           retry ? Object.assign({}, opts, { label: role + ':attempt' + attempt }) : opts)
    } catch (e) {
      const msg = String((e && e.message) || e).slice(0, 300)
      if (LIMIT_ERROR.test(msg)) throw stopRun(role + ', attempt ' + attempt + ' of ' + ATTEMPTS + ', failed on a usage or rate limit (' + msg + '), and is not run again now')
      result = null
      why = 'an error thrown by agent(): ' + msg
    }
    if (result !== null && result !== undefined) {
      if (retry) log(role + ': attempt ' + attempt + ' of ' + ATTEMPTS + ' returned its result')
      return result
    }
    log(role + ': attempt ' + attempt + ' of ' + ATTEMPTS + ' ended with ' + why
        + (attempt < ATTEMPTS ? '; running the role again as attempt ' + (attempt + 1) + ', told to take over what this one left'
          : needed ? '; no attempt left' : '; no attempt left, so the script takes its path for a dead agent'))
  }
  if (needed) throw stopRun(role + ' returned nothing after ' + ATTEMPTS + ' attempts, and a rung worker, skeptic or judge that returns nothing is read neither as a dead worker, a refusal nor a drop')
  return null
}

const bgCheck = (tree) => 'A command the earlier attempt started in the background with nohup may still be running. Before you start a build, a test or any long run, list what runs (ps -eo pid,etime,args | grep -E "ant|java|fortress" | grep -v grep, and readlink /proc/<pid>/cwd for the tree each runs in) and, as the skill\'s session.md says, wait for a step still running in ' + tree + ' and use its result; never start the same step beside it.'

function recoverRung(rung) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '; if it does not exist, make it by step 1. Read git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb (commits not pushed show as ahead) and ls -lt tmp/ | head -20, and what exists of explorations/compile-ladder/' + rung.slug + '/ and of tmp/' + rung.slug + '/.',
    'Committed work is yours to verify, not to redo; uncommitted edits are yours once you have read them; a log that ends in its EXIT= line, or whose verdict or table is whole, stands unless the tree changed after it, and one cut off or failed is a step still to do (the skill\'s session.md). The earlier attempt\'s transcript is in this run\'s directory, under your own label: ' + runDirLine('rung:' + reId(rung.id)).trim() + ', then grep for your label in "$D"/agent-*.meta.json; read it with jq, never whole.',
    'Test first still holds: if the earlier attempt made the edit before its test was seen failing, see the test fail on the base\'s code with the old code tool (the skill\'s worktrees.md, "Running the old code"), never by reverting and rebuilding your worktree, and say so in REPORT.md.',
    bgCheck(rung.path),
    'Commit what you took over once you have read it, push it, and go on from the first step not done.',
  ]
}

function recoverRungRepair(rung) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '. Read git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb, and explorations/compile-ladder/' + rung.slug + '/JUDGE.md, SKEPTIC.md and REPORT.md. The commits after the one that carries the judge\'s ruling, and uncommitted edits, are the earlier attempt\'s.',
    'Take the judge\'s instructions one at a time and check each against the tree before acting: a step done is not done again, an assertion in place is not added twice, a harness run made after the edit is not made again unless it was cut off.',
    bgCheck(rung.path),
    'Commit what you took over, push it, and finish as the ruling below says, with reportText and recordText describing the rung as it now stands.',
  ]
}

function recoverSkeptic(rung) {
  const dir = 'explorations/compile-ladder/' + rung.slug + '/'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Read git log --format="%h %ci %s" ' + BASE + '..HEAD, git status --short, git status -sb and ls -lt tmp/' + rung.slug + '/skeptic/. A commit titled "The worker\'s report and record, from the run\'s journal", a commit whose title begins "Skeptic\'s fix:", and a commit of ' + dir + 'SKEPTIC.md, after the worker\'s last commit, are the earlier attempt\'s.',
    'A fix already committed is not made again: read its diff, and confirm in its transcript (this run\'s directory, your own label with :attempt) that its test was seen failing before it and passing after; a fix whose test was not is finished, not redone. Uncommitted edits are a fix in progress: read them, and finish or discard them.',
    'If SKEPTIC.md is committed and complete, it is your verdict: return it, with skepticText the word committed, headJudged the worker\'s head and headAfter the branch\'s. If it is partial, finish the checks it has not done and complete it in place, never a second copy of a section. A program whose output exists and is whole is not run again.',
    bgCheck(rung.path),
  ]
}

function recoverJudgeRung(rung, kind) {
  const f = 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Read git log --format="%h %ci %s" ' + BASE + '..HEAD, git status --short and git status -sb, and ' + f + '.',
    'JUDGE.md may hold an earlier ruling on this rung on another question (a stop comes before a skeptic\'s verdict). The earlier attempt\'s is a ruling on this question, the ' + kind + ', written after the skeptic\'s last commit; a revert commit after it is the earlier attempt\'s too, and a fix already reverted is not reverted again.',
    'If that ruling is complete, it is yours: commit and push it if it is not, and return the decision it records. If it is partial, complete it in place, then commit and push once.',
  ]
}

function recoverJudgeMain(kind) {
  const f = BATCH_DIR + '/JUDGE-' + kind + '.md'
  return [
    'You are in the main tree, ' + MAIN + '. Read git log --oneline ' + BASE + '..HEAD and git status --short, and ' + f + '. Whatever that file holds is the earlier attempt\'s.',
    'If its ruling is complete, it is yours: commit it locally if it is not, and return the decision it records. If it is partial, complete it in place and commit once. Do not push.',
  ]
}

function recoverGather() {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean: a dirty tree now is the earlier attempt\'s work in progress and your starting point. Check only that ' + BASE + ' is still an ancestor of HEAD.',
    'Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --cached --stat and git diff --stat. An approved rung whose commit is already on main is done: never apply its patch again. Before you apply another, regenerate it and run git apply --reverse --check on it: if that succeeds, it is applied and not committed; continue that rung after the apply. A file with conflict markers is a 3-way apply left half resolved.',
    'The record may already carry a rung\'s fold. Before you fold, grep FACTS.md and the ledger (' + LEDGER + ' find with the row\'s words, and for each placeholder its claim) for its lines, and fold only what is missing: never a line or a row twice. A row closed already is not closed again (' + LEDGER + ' show N). The same holds for PLAN.md\'s entries and RECORD.md.',
    'Retry a git command that fails on index.lock.',
  ]
}

function recoverReview() {
  return [
    'You are in the main tree, ' + MAIN + ', with the gate running beside you or finished. A commit titled "Fold the review\'s corrections" after the gather\'s last commit is the earlier attempt\'s: then headBefore is that commit\'s parent, so that pathsOutsideExplorations covers both attempts\' corrections.',
    'Uncommitted edits under explorations/ are the earlier attempt\'s corrections in progress: keep what is right and commit them with your own, in one more commit of the same title. Do not fix a finding twice. Never touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/.',
  ]
}

function recoverMergedRepair(kind) {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean. Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --stat, ' + BATCH_DIR + '/JUDGE-' + kind + '.md and ' + BATCH_DIR + '/REPAIR-' + kind + '.md if it exists. A commit after the one that carries JUDGE-' + kind + '.md is the earlier attempt\'s repair, and uncommitted edits its repair in progress.',
    'Take the judge\'s instructions one at a time and check each against the tree: a step done is not done again. If the earlier attempt made its commit, what you finish goes in one more commit; headBefore is then the parent of its first commit, and a test run it captured under ' + LOG_DIR + '/repair-' + kind + '-tests/ on the tree as it still is stands. Do not push.',
    bgCheck(MAIN),
  ]
}

function recoverGate() {
  return [
    'You are in the main tree, ' + MAIN + '. The earlier attempt\'s logs are under ' + LOG_DIR + '/ and its outputs under ' + GATE_OUT + '/: ls -lt both. A log counts only if it is newer than the newest commit that touches a path outside explorations/ and .claude/ (git log -1 --format=%ci -- . ":(exclude)explorations" ":(exclude).claude").',
    bgCheck(MAIN),
    'A step whose log ends in EXIT=0 with BUILD SUCCESSFUL is done: do not run it again, and above all do not repeat step 2 once step 4 has finished, since its rm -rf ProjectFortress/TEST-RESULTS deletes the suites\' results. Step 3\'s copies stand only if both exist. The distance stage: when its log ends in EXIT= it finished; when not and a java DistanceMulti runs in ' + MAIN + ', it still runs; either way do not start it again. Only when its log has no EXIT= line and no such process runs, remove the log and start it again.',
    'Steps 5 to 9 write into summary.txt, step 5 anew and the later ones appending: continue at the first whose lines are not there; if one stopped partway, run again from step 5, so that no line lands twice (the distance stage itself is not run again for that, only its comparison).',
  ]
}

function recoverCommit(held) {
  return [
    'You are in the main tree, ' + MAIN + '. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short. A commit titled "' + COMMIT_TITLE + '" is the earlier attempt\'s step 1: do not make it again, and finish what it left in one more commit. Lines "# repair-tests", "# repair-ungated" or "# microgpt-walk" already in ' + GATE_DIR + '/summary.txt are the earlier attempt\'s: do not copy the gate\'s summary over the file again, and do not append them twice.',
    'If ' + MG_LOG + ' exists, step 0 was taken: do not start the check again; wait for it.',
    held
      ? 'The push is held: a "Not pushed." paragraph in ' + BATCH_DIR + '/RECORD.md is the earlier attempt\'s; do not append it again. Push nothing.'
      : 'Check what is pushed: git fetch origin, then git rev-parse HEAD origin/main ' + PUSH_BRANCHES.map(b => 'origin/' + b).join(' ') + '; push only what a branch lacks. git worktree list and git branch --list "wip/*" show what step 4 has already removed.',
  ]
}

// ---------------------------------------------------------------------------
// The run.
// ---------------------------------------------------------------------------

log('Climb batch ' + BATCH + ': ' + RUNGS.length + ' rungs (' + RUNGS.map(r => r.id).join(', ') + '), two agents at a time, the workers in the order '
    + SCATTER.map(r => r.id).join(', ') + '; each rung checked by a skeptic that fixes what it finds; then gather, review beside the gate, commit. Base ' + BASE + '.')

const results = await pipeline(
  SCATTER,

  // Stage 1: the rung worker.
  (rung) => callAgent(head('rung worker') + rungRole(rung, 'first') + rungTail(rung, true), {
    label: 'rung:' + rung.id, phase: 'Rung', schema: RUNG_SCHEMA, model: OPUS,
  }, recoverRung(rung), true),

  // Stage 2: the skeptic, which fixes what it finds; a judge only on a contested fix, a refusal
  // or a worker's stop; one repair round only on the judge's word.
  async (worker, rung) => {
    let stopJudge = null
    const out = (state, extra) => Object.assign({ rung: rung.id, slug: rung.slug, branch: rung.branch, state, stopJudge }, extra)
    if (!worker) return out('worker-died', { worker: null, verdict: null })

    if (worker.stopped) {
      log(rung.id + ' stopped: ' + (worker.stopReason || '(no reason given)') + '; the judge rules whether it is a step that cannot be undone')
      stopJudge = await callAgent(head('judge') + judgeRole('stop', rung, worker, null, null), Object.assign({
        label: 'judge:' + rung.id + ':stop', phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(null)), recoverJudgeRung(rung, 'stop'), true)
      if (stopJudge.decision !== 'repair') return out('stopped', { worker, verdict: null, judge: stopJudge })
      const resumed = await callAgent(head('rung worker') + rungRole(rung, 'resume') + repairPrompt(rung, null, stopJudge, 'stop') + rungTail(rung, true), {
        label: 'resume:' + rung.id, phase: 'Rung', schema: RUNG_SCHEMA, model: OPUS,
      }, recoverRungRepair(rung), true)
      if (resumed.stopped || !resumed.landed) return out('stopped', { worker: resumed, verdict: null, judge: stopJudge })
      worker = resumed
    }

    const verdict = await callAgent(head('skeptic') + skepticRole(rung, worker), {
      label: 'skeptic:' + rung.id, phase: 'Skeptic', schema: SKEPTIC_SCHEMA, model: OPUS,
    }, recoverSkeptic(rung), true)
    const fixes = Array.isArray(verdict.fixes) ? verdict.fixes.length : 0
    if (verdict.verdict === 'approved') {
      if (fixes) log(rung.id + ': its skeptic approved it with ' + fixes + ' fix(es) of its own, none contested; no judge runs')
      return out('approved', { worker, verdict })
    }

    const kind = verdict.verdict === 'contested' ? 'contested' : 'refusal'
    log(rung.id + ': ' + (kind === 'contested'
      ? 'its skeptic marked ' + (verdict.contested || []).length + ' of its ' + fixes + ' fix(es) contested; the judge rules on those alone'
      : 'its skeptic refused it (' + (verdict.refusalReason || 'no reason returned') + '); the judge rules'))
    const decision = await callAgent(head('judge') + judgeRole(kind, rung, worker, verdict, null), Object.assign({
      label: 'judge:' + rung.id, phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(stopJudge)), recoverJudgeRung(rung, kind), true)
    if (decision.decision === 'stands') return out('approved-after-ruling', { worker, verdict, judge: decision })
    if (decision.decision !== 'repair') return out(decision.decision === 'stop' ? 'stopped' : 'dropped', { worker, verdict, judge: decision })

    const repaired = await callAgent(head('rung worker') + rungRole(rung, 'repair') + repairPrompt(rung, verdict, decision, kind) + rungTail(rung, false), {
      label: 'repair:' + rung.id, phase: 'Rung', schema: RUNG_SCHEMA, model: OPUS,
    }, recoverRungRepair(rung), true)
    return out((repaired.landed && !repaired.stopped) ? 'approved-after-repair' : 'dropped', { worker: repaired, verdict, judge: decision, repaired: true })
  },
)

// A run stopped inside the scatter has a rung whose stage threw: nothing is read from it, so no
// rung is marked dropped, withheld or not landed, and the gather does not start.
if (runStop) throw stopRun()

const byId = {}
for (const r of results.filter(Boolean)) byId[r.rung] = r

// landsOnlyWith: a rung whose manifest entry names rungs it lands only with is withheld when any
// of them was not approved, repeated until nothing moves.
const isApproved = (r) => r.state === 'approved' || r.state === 'approved-after-ruling' || r.state === 'approved-after-repair'
function applyLandsOnlyWith(rungs, manifest) {
  const needs = {}
  for (const m of manifest) needs[m.id] = m.landsOnlyWith || []
  let out = rungs
  for (;;) {
    const stateOf = {}
    for (const r of out) stateOf[r.rung] = r.state
    let moved = false
    out = out.map(r => {
      const missing = isApproved(r) ? (needs[r.rung] || []).filter(id => !isApproved({ state: stateOf[id] })) : []
      if (!missing.length) return r
      moved = true
      return Object.assign({}, r, { state: 'withheld', approvedAs: r.state,
        withheldReason: r.rung + ' lands only with ' + needs[r.rung].join(', ') + ' (landsOnlyWith in the manifest), and '
          + missing.map(id => id + (stateOf[id] ? ' is ' + stateOf[id] : ' did not report')).join(', ') + ': not applied, its findings folded' })
    })
    if (!moved) return out
  }
}

const rungs = applyLandsOnlyWith(RUNGS.map(r => byId[r.id]).filter(Boolean), RUNGS)
const approved = rungs.filter(isApproved)
const notLanded = rungs.filter(r => !isApproved(r))
const withheld = rungs.filter(r => r.state === 'withheld')
if (withheld.length) log('Withheld by landsOnlyWith: ' + withheld.map(r => r.withheldReason).join('; '))
const approvedEntries = RUNGS.filter(m => approved.some(a => a.rung === m.id))
const expectedMoves = [].concat.apply([], approvedEntries.map(m => (m.expectedMoves || []).map(x => m.id + ': ' + x)))
const expectedChecker = {
  counts: approvedEntries.filter(m => m.expectedCheckerCount !== undefined).map(m => m.id + ': ' + m.expectedCheckerCount),
  crashes: approvedEntries.filter(m => m.expectedCheckerCrash !== undefined).map(m => m.id + ': ' + m.expectedCheckerCrash),
}
// A gate step an approved rung brings (testSpecData with W), or one the last landed summary
// already carries, which the gate then runs from that batch on.
const joins = [].concat.apply([], approvedEntries.map(m => (m.gateJoins || []).map(j => j + ' (rung ' + m.id + ')')))
const specData = joins.some(j => /^testSpecData /.test(j))
  ? 'rung ' + joins.filter(j => /^testSpecData /.test(j)).map(j => j.replace(/^.*\(rung |\)$/g, '')).join(', ') + ' brings it into the gate in this batch (POSITIONS.md, "The specification\'s examples join the gate at zero red.")'
  : 'run it only if the last landed summary has a specdata/ row, which makes it a step of every gate after the batch that brought it'

// What the checking cost in agents, per rung, for the post-batch review's measures
// (process-engineering/batch-redesign.md, "The measures").
const checking = {}
for (const r of rungs) checking[r.rung] = {
  state: r.state,
  skepticVerdict: (r.verdict && r.verdict.verdict) || null,
  skepticFixes: (r.verdict && Array.isArray(r.verdict.fixes)) ? r.verdict.fixes.length : 0,
  contested: (r.verdict && Array.isArray(r.verdict.contested)) ? r.verdict.contested.length : 0,
  judge: (r.judge && r.judge.decision) || null,
  reverted: (r.judge && Array.isArray(r.judge.rulings)) ? r.judge.rulings.filter(x => x && x.ruling === 'revert').length : 0,
  repairRound: !!r.repaired,
  stopJudge: (r.stopJudge && r.stopJudge.decision) || null,
}
const report = { batch: BATCH, base: BASE, rungs, checking }

const rungItems = [].concat.apply([], rungs.map(curatorItemsOf))
const routers = []
const mergedItems = []
function curatorStatus() {
  const routed = routedIds(routers)
  return rungItems.concat(mergedItems).map(i => Object.assign({}, i, { inPlan: routed.has(i.id) }))
}
const finish = (extra) => Object.assign(report, { forCurator: curatorStatus() }, extra)

if (approved.length === 0) {
  log('No rung approved; nothing to gather. ' + rungs.map(r => r.rung + ': ' + r.state).join(', '))
  return finish({ landed: false, reason: 'no rung approved' })
}
log('Approved: ' + approved.map(r => r.rung + ' (' + r.state + ')').join(', ')
    + (notLanded.length ? '. Not landed, findings folded anyway: ' + notLanded.map(r => r.rung + ' (' + r.state + ')').join(', ') : '')
    + '. Gathering onto main.')

const gather = await callAgent(head('gather') + gatherRole(approved, notLanded, rungItems), { label: 'gather', phase: 'Gather', schema: GATHER_SCHEMA, model: OPUS }, recoverGather())
report.gather = gather
routers.push(gather)
if (!gather || gather.unresolved) {
  log('Gather stopped: ' + ((gather && gather.summary) || 'agent died'))
  return finish({ landed: false, reason: 'gather unresolved' })
}
mergedItems.push(...numbered('gather', gather.forCurator))
const reviewItems = rungItems.concat(numbered('gather', gather.forCurator))

// The commits each rung's branch holds after its worker's: the skeptic's fixes and a repair round,
// which the review reads, there being no second skeptic.
const checkingByRung = approved.map(r => ({ rung: r.rung, branch: r.branch, state: r.state,
  skepticFixes: (r.verdict && r.verdict.fixes) || [], rulings: (r.judge && r.judge.rulings) || [],
  repairRound: r.repaired ? { judgeInstructions: (r.judge && r.judge.instructions) || [], summary: (r.worker && r.worker.summary) || '' } : null }))

// The review beside the gate: the review reads and never builds, the gate builds and never reads
// the record; the gate commits nothing, so the two never commit at once.
const gateRun = callAgent(head('gate') + gateRole(expectedMoves, expectedChecker, specData), { label: 'gate', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
gateRun.catch(() => null)
let review = await callAgent(head('merged-diff reviewer') + reviewRole(gather, 'review', reviewItems, checkingByRung), { label: 'review', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS }, recoverReview())
report.review = review
routers.push(review)
mergedItems.push(...numbered('review', review && review.forCurator))
if (!review) {
  log('The merged-diff review returned nothing after ' + ATTEMPTS + ' attempts: the batch lands on its gate without one, listed as review-missing.1 for the landing report')
  report.reviewMissing = true
  mergedItems.push(...numbered('review-missing', ['The merged-diff review returned nothing after ' + ATTEMPTS + ' attempts, so no review read this batch\'s merged diff, its skeptics\' fixes and its folded record beside its gate; the post-batch review is the first to read them.']))
}
const routedFindings = strings(review && review.routed)
if (routedFindings.length) {
  log('The review routed ' + routedFindings.length + ' finding(s) settled by tests and records only to the next batch; no judge runs for them')
  report.reviewRouted = { findings: routedFindings }
  mergedItems.push(...numbered('review-routed', routedFindings))
}
const reviewBlocks = !!(review && strings(review.blockingCode).length)
let reviewDecision = null
if (reviewBlocks) {
  log('Review found ' + strings(review.blockingCode).length + ' finding(s) that touch code; the judge rules while the gate runs on')
  reviewDecision = await callAgent(head('judge') + judgeRole('review', null, null, null, review), Object.assign({ label: 'judge:review', phase: 'Judge', schema: REVIEW_JUDGE_SCHEMA }, judgeTier(null)), recoverJudgeMain('review'), true)
  report.reviewJudge = reviewDecision
  mergedItems.push(...numbered('judge-review', reviewDecision && reviewDecision.forCurator))
}
let gate = await gateRun
report.gate = gate

const reviewPaths = strings(review && review.pathsOutsideExplorations)
const reviewGated = reviewPaths.map(repoPath).filter(gateReads)
const reviewUngated = ungatedOf(reviewPaths)
let gateIsStale = reviewGated.length > 0
const beside = []
if (gateIsStale) log('The review\'s corrections touched ' + reviewGated.length + ' path(s) the gate reads (' + reviewGated.join(', ') + '); the gate runs again')
else if (reviewUngated.length) log('The review\'s corrections touched ' + reviewUngated.length + ' path(s) outside explorations/ that no gate stage reads (' + reviewUngated.join(', ') + '); the gate stands, and the commit stage records why')
const redBeside = !!(gate && !gate.stopped && !gate.green && !gateIsStale)
let redAnswered = false

if (reviewBlocks) {
  const decision = reviewDecision
  if (decision && decision.decision === 'land') {
    log('The review\'s judge ruled land: its ' + strings(decision.instructions).length + ' step(s) of tests and records go to the next batch, listed for the curator (' + BATCH_DIR + '/JUDGE-review.md); no repair runs')
    report.reviewRouted = { findings: routedFindings.concat(strings(review.blockingCode)), instructions: strings(decision.instructions), ruling: BATCH_DIR + '/JUDGE-review.md' }
    mergedItems.push(...numbered('judge-review-land', decision.instructions))
  } else if (!decision || decision.decision !== 'repair') {
    return finish({ landed: false, reason: 'review blocking, judge did not order a repair' })
  } else {
    report.repairReview = await callAgent(head('repair on the merged tree') + mergedRepairRole(decision, 'review', redBeside ? gate.failing : undefined), { label: 'repair:review', phase: 'Review', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('review'))
    routers.push(report.repairReview)
    const rr = report.repairReview
    if (!rr || rr.stopped || rr.landed === false) {
      log('The review\'s repair ' + (!rr ? 'returned nothing' : rr.stopped ? 'stopped (' + (rr.stopReason || 'no reason given') + ')' : 'did not land') + ': its code finding(s) go to the next batch as review-unrepaired, listed for the curator; they do not hold the push')
      report.reviewUnrepaired = strings(review.blockingCode)
      mergedItems.push(...numbered('review-unrepaired', review.blockingCode))
    }
    const after = repairRerun(report.repairReview, reviewPaths, null)
    report.repairReviewRerun = after
    if (after.rerun) {
      log('After the review\'s repair the gate runs again: ' + after.why)
      gateIsStale = true
    } else {
      const red = redBeside ? repairRerun(report.repairReview, reviewPaths, gate) : null
      if (red) report.repairReviewRed = red
      if (red && !red.rerun) {
        redAnswered = true
        log('The review\'s repair changed ' + red.why + ' and its runs answer the line(s) the gate beside the review was red on; the gate does not run again, and no gate judge or gate repair runs')
        beside.push({ kind: 'review', runs: red.runs, answered: red.answered, ungated: red.ungated, commits: (rr.headBefore || '?') + '..' + (rr.headAfter || '?') })
      } else {
        if (red) log('The gate beside the review was red, and the review\'s repair does not answer it (' + red.why + '); the gate judge rules on it')
        if (strings(rr && rr.pathsChanged).length) {
          log('The review\'s repair changed ' + after.why + '; the gate does not run again and its tables stand')
          beside.push({ kind: 'review', runs: after.runs, answered: [], ungated: after.ungated, commits: (rr.headBefore || '?') + '..' + (rr.headAfter || '?') })
        }
      }
      gateIsStale = false
    }
  }
}

if (!gateIsStale && reviewUngated.length && !beside.some(b => b.kind === 'review')) {
  beside.push({ kind: 'review-corrections', runs: [], answered: [], ungated: reviewUngated, commits: ((review && review.headBefore) || '?') + '..' + ((review && review.headAfter) || '?') })
}

if (gateIsStale || !gate) {
  gate = await callAgent(head('gate') + gateRole(expectedMoves, expectedChecker, specData), { label: 'gate:after-review', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
  report.gateAfterReview = gate
  beside.length = 0
}

if (!gate || gate.stopped) return finish({ landed: false, reason: 'gate could not run' })
if (!gate.green && !redAnswered) {
  log('Gate red: ' + strings(gate.failing).length + ' failing; the judge diagnoses on the merged tree')
  const decision = await callAgent(head('judge') + judgeRole('gate', null, null, null, gate), Object.assign({ label: 'judge:gate', phase: 'Judge', schema: GATE_JUDGE_SCHEMA }, judgeTier(report.reviewJudge)), recoverJudgeMain('gate'), true)
  report.gateJudge = decision
  mergedItems.push(...numbered('judge-gate', decision && decision.forCurator))
  if (decision.decision !== 'repair') return finish({ landed: false, reason: 'gate red, judge did not order a repair' })
  report.repairGate = await callAgent(head('repair on the merged tree') + mergedRepairRole(decision, 'gate', gate.failing), { label: 'repair:gate', phase: 'Gate', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('gate'))
  routers.push(report.repairGate)
  const after = repairRerun(report.repairGate, [], gate)
  report.repairGateRerun = after
  if (after.rerun) {
    log('After the gate\'s repair the gate runs again: ' + after.why)
    gate = await callAgent(head('gate') + gateRole(expectedMoves, expectedChecker, specData), { label: 'gate2', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
    report.gate2 = gate
    beside.length = 0
    if (!gate || !gate.green) {
      log('Gate red after one repair: the batch stops here, nothing pushed')
      return finish({ landed: false, reason: 'gate red twice' })
    }
  } else {
    log('The gate\'s repair changed ' + after.why + ' and its runs answer the line(s) the gate was red on; the gate does not run again and its tables stand beside the runs')
    beside.push({ kind: 'gate', runs: after.runs, answered: after.answered, ungated: after.ungated, commits: ((report.repairGate && report.repairGate.headBefore) || '?') + '..' + ((report.repairGate && report.repairGate.headAfter) || '?') })
  }
}

const notInPlan = curatorStatus().filter(i => !i.inPlan)
if (notInPlan.length) log('Items for the curator not in PLAN.md, for the coordinator: ' + notInPlan.map(i => i.id).join(', ')
    + ((gather && Array.isArray(gather.curatorUnrouted) && gather.curatorUnrouted.length) ? '; the gather says why: ' + gather.curatorUnrouted.map(u => u && (u.id + ': ' + u.why)).join('; ') : ''))

const heldBy = pushHeldBy(approved, review, { 'repair:review': report.repairReview, 'repair:gate': report.repairGate })
if (heldBy.length) log('Push held: ' + heldBy.length + ' step(s) that cannot be undone or act against a decision on record: ' + heldBy.join('; '))
const commit = await callAgent(head('commit') + commitRole(gather, gate, heldBy, beside), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(heldBy.length > 0))
report.commit = commit
// A batch writes no skill text (skills-agenda-audit.md): a path under .claude/ that changed since the
// base is listed for the coordinator, and holds nothing.
if (commit) mergedItems.push(...numbered('skill-touched', strings(commit.skillTouched).map(p => 'The batch changed ' + p.trim() + ' (git diff --name-only ' + BASE + ' HEAD -- .claude/), though a batch writes no skill text: only the skill writer edits the skills, after the landing.')))
// The quick pair prints "VERDICT: n PASS, 0 FAIL of n -- ALL PASS" each when it passes. Anything
// else, a failing check, a run cut off or refused, is listed for the coordinator; it holds nothing.
const mgPassed = (t) => typeof t === 'string' && (t.match(/-- ALL PASS/g) || []).length >= 2 && !/-- FAILED|rc=[1-9]/.test(t)
if (commit && !mgPassed(commit.microgptWalk)) mergedItems.push(...numbered('microgpt-walk', ['The microGPT walk check on the landed tree did not show both quick programs passing: ' + ((commit.microgptWalk || '').trim() || 'no lines returned')]))
return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy, besideGate: beside, microgptWalk: commit && commit.microgptWalk })
