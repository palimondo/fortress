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
// Generated by explorations/compile-ladder/plan-25/manifest/gen25.py from
// CLIMB-BATCH-25.md (section 3, each rung's section word for word; section 5, the
// manifest fields and the intro) and the briefings of lists25.py; check25.js checks it.
// Climb batch 25: rungs D, P, A, R, U, N, C, the manifest's order, the gather's tie-break; none lands only with another.
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

const BATCH = '25'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-25.md'
const BRIEFING_LISTS = 'explorations/compile-ladder/plan-25/manifest/lists25.py'

const D_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper of nativeHelpers, the bindings move step by step, and from the step that moves a binding the compiled checker checks it against the helper's Java signature. F-303: walk carries a declared Float in a Java double, and Float's 30 bindings that fit a helper name simpleDoubleArith's; its other 32 still name glue classes, and 27 of them need a new helper (N3). F-299: walk's loader takes the helper's overload whose Java types carry the declared types, self first. P-29: walk's speed is irrelevant. This record's section 2, forks 1, 2, 9 to 13 and 15 to 17, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- 28 new helpers at the end of nativeHelpers/simpleDoubleArith.java, each one line that computes as its glue class does (interpreter/glue/prim/Float.java; n3-base.tsv's last column gives each): doubleIsNaN and doubleIsInfinite (Double.isNaN, Double.isInfinite); doubleRawBits (Double.doubleToRawLongBits, a long); doubleNextUp and doubleNextDown (DirectedRounding.nextUp and nextDown, of com.sun.fortress.numerics); doubleToFloat for narrow ((float) x, a float, which the checker reads as RR32); doubleNE for =/= (x != y); doubleMin and doubleMax (Math.min, Math.max); the eight that round toward an infinity and the two square roots, PLUS_UP to SQRT_DOWN (DirectedRounding.addUpNoNaN to sqrtDown); the eight IEEE_ ones (DirectedRounding.addUp to divideDown); and doubleFromRawBits (Double.longBitsToDouble).",
"- The 28 strings: value object Float's 27 in ProjectFortress/LibraryBuiltin/FortressBuiltin.fss (:60-153: the getters isNaN, isInfinite, rawBits, nextUp and nextDown, narrow, =/=, MIN, MAX, and PLUS_UP to IEEE_SLASH_DOWN), and the top-level fromRawBits in Library/FortressLibrary.fss (:4535).",
"- The planner's sample-D.patch holds five of the 28 (isNaN, rawBits, narrow, PLUS_UP and fromRawBits), as the planner measured them: git apply it in your tree, take the text or improve it and say why, and write the rest in its form.",
"- Not yours: Float's ^ at an RR32 or AnyIntegral exponent, atan2 over Number, and the floor and ceiling brackets |\\self/| and |/self\\|, which an existing helper computes but which do not fit (review-queue item 331); Float's asFloat, which answers self; RR32's bindings (rung P); the Appendix I entry (the gather, fork 10).",
"",
"**Rows.** None opened by plan. A defect you meet gets its XXX test or its row in your record.md.",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 24's landed tables, 0 and 0 over the fourteen components (explorations/compile-ladder/climb-batch-24/gate/). Only the distance stage reads FortressBuiltin's bindings (P-39). By the planner's run of the samples of D, P and N with the asFloat control, the distance '#total 1', the control's one error, and the count '#total 0', '#crash none', both tables otherwise equal to climb batch 24's. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java: the 28 helpers at the class's end, only.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object Float's 27 strings, only.",
"- Library/FortressLibrary.fss: the top-level fromRawBits's string, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.",
"- Not: Float's other bindings and headers; value object RR32 (rung P); any asFloat (rungs A and U); interpreter/; Specification/; the tools.",
"",
"**Tests, first.**",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilyFloatBitsWalk.fss, in the form of climb batch 24's NativeHelperFamilyFloatWalk: each of the 28 at ordinary values and at 0.0, -0.0, a large value, the smallest subnormal, the infinities and a not-a-number value where no row names its result as a departure; each directed rounding at an exact sum and at an inexact one, where the result is the next float above or below the nearest (0.1 PLUS_UP 0.2 against 0.1 PLUS_DOWN 0.2); fromRawBits at 0, 1, the bits of 1.0, -1.0, an infinity and a not-a-number value. Not asserted: =/=, MIN and MAX with a not-a-number operand (row 672). Passing on the base and on your text. The planner's ValD printed 116 such results, the same on both codes.",
"- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyFloatBitsCompiled.fss with its .test (tests=, link, run, run_out_contains=PASS): one top-level declaration per helper of the 28, over RR64, RR32, Boolean and ZZ64, the same values asserted with assert(flag, message); failing on the base, since the helpers are new, and passing after. The planner's compiled sample, SampleNDQCompiled, bound five of them in this form and passed.",
"- Keep their verdicts: walk's suite, 723 tests at climb batch 24's gate; climb batch 24's NativeHelperFamilyFloatWalk and NativeHelperFamilyFloatCompiled; the compiled tracks.",
"- After the change: ant testQuick once and ant testSystem once, since the compiler's prelude imports simpleDoubleArith and its wrappers now hold your helpers (fork 12).",
"",
"**Specification.** None of yours: the Appendix I entry \"A native binding that names a static helper\" (Specification/appendices/changes.tex:4469-4521), whose Effect counts the moved bindings, is the gather's (fork 10). List every sentence made false: that Effect's count, F-32's, F-299's and F-303's counts (\"its other 32 have no fitting helper and still name glue classes\"), and any sentence of the fortress-repo skill's interpreter.md, \"Natives\", that names Float's glue classes.",
"",
"**Overlaps by file.** FortressBuiltin.fss with rungs P, A, R, U and N, each at other declarations; FortressLibrary.fss with rungs R, U and N, at other declarations. The gather applies you first (fork 1).",
].join('\n')

const P_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper of nativeHelpers, step by step, checked from the step that moves it. F-299: walk's loader takes the overload whose Java types carry the declared types, and it carries a declared RR32 in a Java float (interpreter/glue/StaticNativeApp.java:52); in walk's world the checker reads a helper's float as FortressBuiltin's RR32 (compiler/NamingCzar.java:483-484), so a binding over RR32 fits a float helper as a bare string. The compiled prelude has no helper over float but simpleDoubleArith.floatToDouble (perf-probes/prelude/natives-shape.md, section 2, \"What the classes hide\"). This record's section 2, forks 1, 2, 9 to 13 and 15 to 17, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- A new class, ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleFloatArith.java, the RR32 class beside simpleDoubleArith (fork 2), with 49 helpers over float, each computing as its glue class does (interpreter/glue/prim/RR32.java; n3-base.tsv's last column gives each): floatToString (Float.toString, for asString and asExprString); floatIsNaN, floatIsInfinite; floatRawBits (an int, read as ZZ32); floatNextUp, floatNextDown; floatAbs; floatEQ, floatNE, floatLT, floatLE, floatGT, floatGE; floatMin, floatMax; floatNeg, floatAdd, floatSub, floatMul (for DOT, TIMES and juxtaposition), floatDiv, floatSQRT; the eight that round toward an infinity and the two square roots, PLUS_UP to SQRT_DOWN, and the eight IEEE_ ones, each calling the float overload of com.sun.fortress.numerics.DirectedRounding as the glue class does; floatPow for ^ at an RR32 exponent; floatFloor, floatCeiling; and the four that answer ZZ64 (|\\self/|, |/self\\|, truncate, round), each a long, read as ZZ64.",
"- The 49 strings of value object RR32 in ProjectFortress/LibraryBuiltin/FortressBuiltin.fss (:209-342; n3-base.tsv, rung P, gives each line).",
"- The planner's sample-P.patch holds the class with three of the 49 (floatAdd, floatLT and floatToString, for +, < and asString), as the planner measured them: git apply it in your tree, take the text or improve it and say why, and write the rest in its form.",
"- Not yours: RR32's asFloat (rung A); RR32's ^ at a Float exponent, which an existing helper computes but which does not fit (review-queue item 331); Float's narrow to RR32 (rung D); the Appendix I entry (the gather, fork 10).",
"",
"**Rows.** None opened by plan. Rows 528 and 529, the compiler prelude's RR32, retire with the prelude (P-38) and are not yours.",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 24's landed tables, 0 and 0. Your 49 sit in FortressBuiltin, which only the distance stage reads (P-39). By the planner's run of the samples of D, P and N, the three RR32 strings among them, the distance '#total 1', the asFloat control's one error at another line, and the count '#total 0'. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleFloatArith.java: new.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object RR32's 49 strings, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.",
"- Not: RR32's asFloat (rung A) or any header; simpleDoubleArith (rung D); interpreter/; Library/; Specification/; the tools.",
"",
"**Tests, first.**",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilyRR32Walk.fss: each of the 49 at ordinary values and at narrow(0.0), narrow(-0.0), a large value near the RR32 maximum, the smallest RR32 subnormal, the infinities and a not-a-number value where no row names its result as a departure; asString of several forms; each directed rounding at an exact and an inexact operation; the four that answer ZZ64 at values past the ZZ32 range. Not asserted: a comparison with a not-a-number value (row 672), the rounding of a not-a-number value or an infinity (row 330). Passing on the base and on your text. The planner's program over the three sampled printed 42 results, the same on both codes.",
"- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyRR32Compiled.fss with its .test: one top-level declaration per helper of the 49, over RR32, Boolean, ZZ32, ZZ64 and JavaString, its RR32 values written as float numerals at a declared RR32, which the prelude converts (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:993), the same values asserted; failing on the base, since the class is new, and passing after. The planner's SampleNDQCompiled bound three of them and passed: 'RR32 1.5 + 1.5' printed 3.0.",
"- Keep their verdicts: walk's suite; the compiled tracks, which your class does not reach.",
"- After the change: ant testSystem once, and your compiled guard through junit.sh (fork 12).",
"",
"**Specification.** None of yours: the gather rewrites the Appendix I entry's count (fork 10). List every sentence made false: that count, F-32's and F-299's, and any sentence of the fortress-repo skill's interpreter.md, \"Natives\", or compiler.md, \"Natives\", that names the helper classes or says that no helper takes an RR32.",
"",
"**Overlaps by file.** FortressBuiltin.fss with rungs D, A, R, U and N, at other declarations: RR32's asFloat (:241) is rung A's. The gather applies you second (fork 1).",
].join('\n')

const A_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper, step by step, checked from the step that moves it. The one library's api declares abstract asFloat(self): RR64 on Number, \"the explicit conversion into %RR64%\" (Library/FortressLibrary.fsi:290-291), as the specification does (Specification/basic-lib/numbers.tex:49). Climb batch 23's fork 12: Int's asFloat declares its result Float, walk's float object, narrower than its helper's RR64, so the checker refuses the move; the other way is the declaration at RR64. F-303: walk carries a Float and an RR64 alike in a Java double, and boxes a double result at a declared RR64 as walk's Float. This record's section 2, forks 1 to 3, 9 to 13 and 15 to 17, give the defaults you build; fork 3 weighs the team's word.",
"",
"**What you build.**",
"- The tests first (below).",
"- The planner's rung-A.patch: git apply explorations/compile-ladder/plan-25/probes/rung-A.patch in your tree. Take the text, or improve it and say why. It holds:",
"  - in ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, five headers asFloat(self): Float changed to asFloat(self): RR64, and their strings: RR32's (:241; simpleDoubleArith.floatToDouble), Int's (:374; simpleIntArith.intToDouble), Long's (:383; simpleLongArith.longToDouble, new), NN32's (:396; simpleUnsignedIntArith.unsignedIntToDouble, through the NN32 transfer) and BigNum's (:570; simpleArbitraryPrecisionArith.toDouble, new);",
"  - two new helpers, each right before its class's addition helper (fork 2): simpleLongArith.longToDouble, (double) a, as walk's Long$AsFloat; simpleArbitraryPrecisionArith.toDouble, a.doubleValue(), as walk's BigNum$AsFloat.",
"- Not yours: UnsignedLong's asFloat (rung U, which moves it at the same header with the rewrite's UnsignedLong transfer it needs); Float's own asFloat, which answers self; FloatLiteral's asFloat, whose self walk's loader does not carry; IntLiteral's, which waits for N5 (P-76); the Appendix I entry (the gather, fork 10).",
"",
"**Rows.** None opened by plan.",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 24's landed tables, 0 and 0. Your five sit in FortressBuiltin, which only the distance stage reads. By the planner's run of the texts of R, U and A, the distance '#total 0', '#crash none', its table equal to climb batch 24's but for its seconds and machine rows. The control: Int's asFloat moved at its header Float gave the distance '#total 1', 'Function body has type RR64, but declared return type is Float.' at FortressBuiltin.fss:375. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: the five asFloat declarations, header and string, only.",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java and simpleArbitraryPrecisionArith.java: the two new helpers, right before longAdd and add, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.",
"- Not: value object UnsignedLong (rung U); any other binding of these objects; Library/; interpreter/; Specification/; the tools.",
"",
"**Tests, first.**",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilyAsFloatWalk.fss: each of the five at ordinary values and at its type's bounds: ZZ32's minimum, -1, 0, 1, 2^24 + 1 and maximum; RR32's narrow(0.1), -0.0, a large value, the smallest subnormal and the infinities; NN32's 0, 1, 2^31 and 2^32 - 1 (above the signed half, item 326); ZZ64's minimum, -1, 2^53 + 1 and maximum, rounded to a double; ZZ's 10^20, a negative 30-digit value, 2^53 + 1, and a value past the double range, Infinity. Passing on the base and on your text. The planner's ValA printed 40 such results (with UnsignedLong's, rung U's), the same on both codes.",
"- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyAsFloatCompiled.fss with its .test: one top-level declaration per helper of the five, over ZZ32, RR32, ZZ64 and ZZ answering RR64, the same values asserted; failing on the base, since two helpers are new, and passing after. The planner's SampleRUACompiled bound longToDouble and toDouble in this form and passed.",
"- Keep their verdicts: walk's suite; the compiled tracks.",
"- After the change: ant testQuick once and ant testSystem once, since the compiler's prelude imports simpleLongArith and simpleArbitraryPrecisionArith (fork 12).",
"",
"**Specification.** None of yours: the gather rewrites the Appendix I entry's count (fork 10). numbers.tex:49 holds already. List every sentence made false: that count, F-32's and F-299's, and PLAN's natives line on the asFloats (\"The families that wait on a known obstacle\").",
"",
"**Overlaps by file.** FortressBuiltin.fss with rungs D, P, R, U and N, at other declarations: value object UnsignedLong's asFloat (:482) is rung U's, two lines below none of yours; simpleLongArith.java and simpleArbitraryPrecisionArith.java with rungs R and N, at other places in each class (fork 2). The gather applies you third (fork 1).",
].join('\n')

const R_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper, step by step, checked from the step that moves it. Row 336: under walk REM and MOD by zero on ZZ32 and ZZ64 end the run with a Java ArithmeticException that no Fortress catch sees; row 848, its sibling, the same on NN32, NN64 and ZZ; each fix is a helper that raises, or a zero test in the glue class. F-24: a native bound to a helper of nativeHelpers raises the library's own exception where the helper raises a class of the compiled prelude, so DIV by zero on the five types already raises DivisionByZero. The specification: \"For integer results, division by zero throws a DivisionByZero.\" (Specification/basic/operators/opr-overview.tex, section \"Multiplication, Division, Modulo, and Remainder Operators\"), REM the remainder of the truncating division and MOD of the floor division (:130-133). This record's section 2, forks 1, 2, 4 and 8 to 17, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The planner's rung-R.patch: git apply explorations/compile-ladder/plan-25/probes/rung-R.patch in your tree. Take the text, or improve it and say why. It holds:",
"  - ten new helpers, each right after its class's overflowing division helper (fork 2), each raising fortress.CompilerBuiltin$DivisionByZero at a zero divisor and computing every other value as the glue class does (fork 4): simpleIntArith.intRem (a % b) and intMod (Math.floorMod); simpleLongArith.longRem and longMod, the same at long; simpleUnsignedIntArith.unsignedIntRem and unsignedIntMod (both Integer.remainderUnsigned, MOD and REM being the same for natural numbers); simpleUnsignedLongArith.unsignedLongRem and unsignedLongMod (Long.remainderUnsigned); simpleArbitraryPrecisionArith.rem (BigInteger.remainder) and mod (BigInteger.mod, of the divisor's sign as walk's BigNum$Mod);",
"  - ten strings: trait ZZ32's REM and MOD (Library/FortressLibrary.fss:780, :782), trait ZZ64's (:873, :875), trait NN64's (:956, :958, through the NN64 transfers), trait ZZ's (:1053, :1055), and value object NN32's (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:440, :442, through the NN32 transfers).",
"- Not yours: GCD, LCM, CHOOSE and partitionL (rung N); IntLiteral's REM and MOD, which wait for N5 (P-76); DIVREM and DIVMOD, which the library writes in Fortress; the Appendix I entry (the gather, fork 10).",
"",
"**Rows.**",
"- Row 336: the gather closes it with your commit, its test the promoted ZZ64RemainderByZeroWalk.",
"- Row 848: the gather closes it with your commit, its test the promoted NN32RemainderByZeroWalk.",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 24's landed tables, 0 and 0. Eight of your ten sit in FortressLibrary, which both stages read, and NN32's two in FortressBuiltin, which only the distance stage reads. By the planner's run of the texts of R, U and A: the distance '#total 0', '#crash none'; the count '#total 0', '#locations 0', '#crash none', its 14 api rows equal to climb batch 24's. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java, simpleLongArith.java, simpleUnsignedIntArith.java, simpleUnsignedLongArith.java and simpleArbitraryPrecisionArith.java: your ten helpers, each right after the class's overflowing division, only.",
"- Library/FortressLibrary.fss: the REM and MOD strings of traits ZZ32, ZZ64, NN64 and ZZ, only.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object NN32's REM and MOD strings, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests and the two promoted ones.",
"- Not: GCD, LCM and the other strings beside yours (rung N); interpreter/; Specification/; the tools.",
"",
"**Tests, first.**",
"- Promote the two XXX tests (the fortress-repo skill's tests-writing.md, \"Promoting an XXX test\"): XXXZZ64RemainderByZeroWalk, renamed ZZ64RemainderByZeroWalk, and XXXNN32RemainderByZeroWalk, renamed NN32RemainderByZeroWalk, each widened to MOD beside REM, seen failing on the base through the harness and passing after.",
"- Three more, in their form, each failing on the base and passing after: ZZ32RemainderByZeroWalk, NN64RemainderByZeroWalk and ZZRemainderByZeroWalk, each REM and MOD by zero in a try that catches DivisionByZero. On the base the planner's five such programs ended the run, 'Exception in thread \"main\" java.lang.ArithmeticException'; on the text each printed 'REM by zero: DivisionByZero' and 'MOD by zero: DivisionByZero'.",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilyRemainderWalk.fss: REM and MOD on each type at pairs of signs and at the bounds, ZZ32's and ZZ64's minimum REM -1 (0) among them, NN32 at 2^31 and 2^32 - 1, NN64 at 2^63 and 2^64 - 1 (above the signed half, item 326), ZZ at 20-digit values of both signs; no division by zero (the tests above hold it). Passing on the base and on your text. The planner's ValR printed 217 such pairs, the same on both codes.",
"- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyRemainderCompiled.fss with its .test: one top-level declaration per helper of the ten, over ZZ32, ZZ64 and ZZ, the same values asserted, and each division by zero raising DivisionByZero; failing on the base, 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArith.intRem' in the planner's sample, and passing after.",
"- Keep their verdicts: walk's suite, 723 at climb batch 24's gate (on the planner's combined tree it fails only the two XXX tests that you promote); IntegralOpsRungN and the compiled tracks.",
"- After the change: ant testQuick once and ant testSystem once (fork 12).",
"",
"**Specification.** None of yours: the Appendix I entry's Effect names the remainders by zero that end the run (changes.tex:4469-4521), sentences you make false, which the gather rewrites (fork 10). opr-overview.tex's \"For integer results, division by zero throws a DivisionByZero.\" becomes true for REM and MOD on the five types. List every sentence made false: those sentences, rows 336's and 848's claims, F-24's \"so a division by zero elsewhere ends the run (rows 336, 848)\", F-306's and F-308's sentences that REM and MOD still name glue classes, F-32's and F-299's counts.",
"",
"**Overlaps by file.** FortressLibrary.fss and FortressBuiltin.fss with rung N, whose GCD and LCM strings sit right below yours, and with D, P, A and U, at other declarations; the five helper classes with rungs A, U and N, each at another place in the class (fork 2). Your hunks and N's meet in context only: the planner applied rung-R.patch and N's strings one after the other through git apply --3way, which merged them clean. The gather applies you fourth (fork 1).",
].join('\n')

const U_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper, checked from the step that moves it. Row 326: the compiled path prints an NN32 or NN64 above its signed half as negative, through FNN32's asString and FNN64's toString and through simpleUnsignedLongArith.unsignedLongToString, which is Long.toString. Row 860: simpleUnsignedLongArith.unsignedLongWrappingNeg answers its operand, where the wraparound negation of x is 0 minus x, wrapped (opr-overview.tex, section \"Addition and Subtraction Operators\"); its int sibling is -a. F-308: the rewrite puts the transfers around an argument or a result declared NN32, NN64 or Char where the helper's Java type is an int or a long; climb batch 24's fork 18 left UnsignedLong's two string getters, NN64's prefix DOTMINUS and NN32's CHOOSE on glue classes, the first three for these rows, the last until rungs K and H had landed. Review-queue item 326: the transfers are identities, so only the guards check that a binding over these types names the unsigned helper. PLAN's review list of climb batch 24 owes the next rung that edits the rewrite, which you are, the probes of the rewrite's seven limits, read from the code and not measured, and row 865's XXX test (PLAN, \"Climb batch 24, listed for his review\", its line \"The rewrite's limits\" and review-routed.1; review-queue item 343), and owes the next batch that edits the compiled path's integer run-time classes, FNN32 and FNN64 among them, row 866's XXX pair (review-routed.2): below, \"Tests, first\". This record's section 2, forks 1 to 3, 5, 6, 9 to 13 and 15 to 17, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The planner's rung-U.patch: git apply explorations/compile-ladder/plan-25/probes/rung-U.patch in your tree. Take the text, or improve it and say why. It holds:",
"  - in nativeHelpers/simpleUnsignedLongArith.java: unsignedLongToString printing by Long.toUnsignedString (:23-25); unsignedLongWrappingNeg answering -a (:106-108); and a new helper right after unsignedLongToString, unsignedLongToDouble, the nearest double of an unsigned long, as walk's UnsignedLong$AsFloat computes it;",
"  - in compiler/runtimeValues/: FNN32's toString and asString printing by Integer.toUnsignedString (FNN32.java:19-20), FNN64's toString by Long.toUnsignedString (FNN64.java:20) (fork 5);",
"  - in compiler/BuiltinPrimitiveRewriter.java, transfer (:176-193): an argument declared UnsignedLong, walk's object of NN64, takes the NN64 argument transfer (fork 6);",
"  - five strings: value object UnsignedLong's asString and asExprString (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:478, :480; the fixed unsignedLongToString) and its asFloat (:482, its header at RR64 as rung A's, fork 3; unsignedLongToDouble); trait NN64's prefix DOTMINUS (Library/FortressLibrary.fss:936; the fixed unsignedLongWrappingNeg); value object NN32's CHOOSE (FortressBuiltin.fss:448; simpleUnsignedIntArith.unsignedIntOverflowingChoose, which reaches simpleLongArith.longOverflowingChoose, fixed by climb batch 24's rung K).",
"- Not yours: NN64's CHOOSE, which needs a new helper (rung N); Char's asExprString, whose form waits on row 861; NN32's asFloat (rung A); the transfers of a result declared UnsignedLong, which no binding has; the Appendix I entry (the gather, fork 10).",
"",
"**Rows.**",
"- Row 326: the gather closes it with your commit, its tests your two compiled tests of the printing (below).",
"- Row 860: the gather closes it with your commit, its test the promoted NN64WrappingNegationHelperCompiled.",
"- Row 873, the rewrite's missing UnsignedLong transfer (section 4, \"Rows filed by plan\"): the gather closes it with your commit, its check the distance stage on your tree, as the planner's run shows it ('#total 3' at FortressBuiltin.fss:479, :481 and :483 without the transfer, '#total 0' with it).",
"- Rows 865 and 866: each gets your XXX test as its reproducer, in place of none, through your record.md (the gather rewrites the row); neither closes.",
"- A limit of the rewrite that your probe shows gets its row in your record.md, in the row template with the placeholder NEW-U-<n>, beside row 849, and its test.",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 24's landed tables, 0 and 0. UnsignedLong's three and NN32's CHOOSE sit in FortressBuiltin, which only the distance stage reads; NN64's DOTMINUS in FortressLibrary. By the planner's runs of the texts of R, U and A: without the rewrite's condition the distance '#total 3', 'Could not check call to function builtinPrimitive_simpleUnsignedLongArith_unsignedLongToString - ZZ64->String is not applicable to an argument of type UnsignedLong.' at :479 and :481 and the same for unsignedLongToDouble at :483; with it, '#total 0', '#crash none', and the count '#total 0'. Any site that comes is a point to report. You change the rewrite at the parse, not the checker's code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java: unsignedLongToString, unsignedLongWrappingNeg and the new unsignedLongToDouble beside them, only.",
"- ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FNN32.java and FNN64.java: their toString and asString, only.",
"- ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java: transfer, only.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object UnsignedLong's three declarations and value object NN32's CHOOSE string, only.",
"- Library/FortressLibrary.fss: trait NN64's prefix DOTMINUS string, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests, the promoted pair, the XXX tests owed for rows 865 and 866, and a test for each limit of the rewrite that a probe shows.",
"- Not: the other asFloats (rung A); REM and MOD (rung R); GCD, LCM, CHOOSE of NN64 (rung N); interpreter/; the checker's Scala; NamingCzar; Specification/; the tools.",
"",
"**Tests, first.**",
"- Promote the compiled XXX pair for row 860 (the fortress-repo skill's tests-writing.md, \"Promoting an XXX test\"): XXXNN64WrappingNegationHelperCompiled.fss and .test, renamed without XXX, with NN64WrappingNegationHelperCompiledLink.test beside them, its tests= line renamed too, seen failing on the base through junit.sh and passing after.",
"- Two compiled tests of row 326, each failing on the base and passing after: one binding simpleUnsignedLongArith.unsignedLongToString by its own declaration and asserting the string of 2^63 and of 2^64 - 1 carried in a ZZ64 ('18446744073709551615'); one printing an NN32 of 2^32 - 1 and an NN64 of 2^64 - 1 through the prelude's own asString, which the run-time classes answer. Each with its link test, run in one junit.sh call, the link test first.",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilyUnsignedWalk.fss: UnsignedLong's asString, asExprString and asFloat, and NN64's prefix DOTMINUS, at 0, 1, 7, 2^63, 2^63 + 1, 2^64 - 2 and 2^64 - 1; NN32's CHOOSE at n from 0 to 2^32 - 1 and k from 0 to 2^32 - 1, 2^31 among them, each overflow raising IntegerOverflow, and k above n giving 0. Passing on the base and on your text. The planner's ValU printed 135 such results, the same on both codes: 'NN64 1 expr 1 DOTMINUS 18446744073709551615', 'NN32 4294967295 CHOOSE 2 IntegerOverflow', 'NN32 4294967295 CHOOSE 4294967295 1'.",
"- Row 865's XXX compile test, owed by review-routed.1 of climb batch 24 to the next batch that edits the rewrite: ProjectFortress/compiler_tests/XXXNativeHelperLocalFunctionCompiled.fss, whose run() declares the local g(x: ZZ32): ZZ32 bound to simpleIntArith.intNeg and prints g(4), with its .test of compile and compile_err_contains=Variable builtinPrimitive is not defined; seen through junit.sh as the expected failure, and red for one run with g lifted to the top level, then restored (the fortress-repo skill's tests-writing.md, \"Writing an XXX test\").",
"- Row 866's XXX pair, owed by review-routed.2 to the next batch that edits the compiled path's integer run-time classes, which FNN32 and FNN64 are: ProjectFortress/compiler_tests/XXXObjectExtendsZZ32Compiled.fss, the row's program, object MyNum extends ZZ32 and MyNum + 1 after a println, with ObjectExtendsZZ32CompiledLink.test (tests=XXXObjectExtendsZZ32Compiled, link) and XXXObjectExtendsZZ32Compiled.test (run, run_out_does_not_contain=REACHED), run in one junit.sh call, the link test first; the run dies at class load before its first println, as the row says.",
"- The rewrite's seven limits, each probed on your tree with a small program or a command, as PLAN's line \"The rewrite's limits\" lists them (review-queue item 343): the rewrite's switch is one static flag, set by the repository that a JVM makes last; fortress parse and fortress api show no rewrite; a component whose text names a helper is parsed four times for one analysis; a component that imports a grammar is parsed by parseWithGrammars, which does not apply the rewrite (compile one that imports a grammar and binds a helper; if its body stays a call of builtinPrimitive, a row beside row 849 with a test that pins today's refusal); a helper overloaded at one arity gets no transfer; self in a generic owner gets none; a declared type is read by its simple name, so a program's own trait named NN32 or Char is composed as the library's. A limit that a run shows gets its row and its test (tests-writing.md, \"How a defect is recorded\"); one that a run does not show gets one line in your report with its command. No binding of the library reaches any of them today.",
"- Keep their verdicts: walk's suite; the compiled tracks, library_tests/NN64.fss and IntConversionsRungW among them (fork 5): on the planner's combined tree the compiler track ran 1,379 tests and failed only XXXNN64WrappingNegationHelperCompiled, which you promote, the library and other-compiler tracks none; the transfer test NativeHelperTransferCompiled and the misc track's NamingCzarJUTest.",
"- After the change: ant testQuick once and ant testSystem once, since your helpers, the rewrite and the run time all run on the compiled path (fork 12).",
"",
"**Specification.** None of yours: the gather rewrites the Appendix I entry's count (fork 10). List every sentence made false: that count, rows 326's and 860's claims, F-308's \"Six of the 82 bindings over these types stay on glue classes\" and its sentence on which declared types take a transfer, F-32's and F-299's counts, and any sentence of the fortress-repo skill's compiler.md, \"Natives\", that names the declared types the rewrite transfers.",
"",
"**Overlaps by file.** FortressBuiltin.fss with rungs D, P, A, R and N; FortressLibrary.fss with D, R and N; simpleUnsignedLongArith.java with R and N, each at another place in the class (fork 2); each at other declarations. UnsignedLong's asFloat is yours at rung A's header: both rungs take fork 3's default. The gather applies you fifth (fork 1).",
].join('\n')

const N_SECTION = [
"**The answers this rung follows.** P-58: each binding's string is to name a static helper, step by step, checked from the step that moves it. P-70: GCD and LCM give nonnegative results, and LCM raises IntegerOverflow when the multiple does not fit its type; so 0 GCD -4 is 4 and 1 LCM -5 is 5, on ZZ32 (2^31 - 1) LCM 2 raises, and the same general rule makes GCD raise where the divisor does not fit, as -2^31 GCD 0 on ZZ32. P-73: fixed-width arithmetic raises IntegerOverflow where its result does not fit, CHOOSE included. F-305: the compiled CHOOSE helpers of ZZ32 and ZZ64 keep no shared state since climb batch 24, whose race was row 855. F-299: walk raises a helper's IntegerOverflow as the library's own. This record's section 2, forks 1, 2, 7 to 13 and 15 to 17, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- 18 new helpers, each at the end of its class (fork 2), each computing as its glue class does (n3-base.tsv's last column gives each: interpreter/glue/prim/Int.java, Long.java, NN32.java, UnsignedLong.java and BigNum.java), raising fortress.CompilerBuiltin$IntegerOverflow where the glue class raises IntegerOverflow: simpleIntArith.intGcd, intLcm and intPartition; simpleLongArith.longGcd, longLcm, longPartition and longNanoTime (System.nanoTime(), a long; the prelude's simpleDoubleArith.doubleNanoTime answers a double and stays); simpleUnsignedIntArith.unsignedIntGcd, unsignedIntLcm and unsignedIntPartition; simpleUnsignedLongArith.unsignedLongGcd, unsignedLongLcm, unsignedLongOverflowingChoose and unsignedLongPartition; simpleArbitraryPrecisionArith.gcd, lcm, choose and cmp (an int, read as ZZ32). A CHOOSE helper keeps no state between calls (fork 7): if yours keeps a scratch array, write the parallel test that fork 7 gives.",
"- The 18 strings: trait ZZ32's GCD, LCM and partitionL (Library/FortressLibrary.fss:784, :786, :807); trait ZZ64's (:877, :879, :898); trait NN64's GCD, LCM, CHOOSE and partitionL (:960, :962, :964, :981, through the NN64 transfers); trait ZZ's cmp, GCD, LCM and CHOOSE (:1020, :1057, :1059, :1061); the top-level nanoTime (:4522); value object NN32's GCD, LCM and partitionL (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:444, :446, :467, through the NN32 transfers).",
"- The planner's sample-N.patch holds five of the 18 (ZZ32's GCD and partitionL, NN64's GCD, ZZ's cmp and nanoTime), as the planner measured them: git apply it in your tree, take the text or improve it and say why (its GCDs are Euclid's, where the glue classes' are binary; both give the one greatest common divisor), and write the rest in its form.",
"- Not yours: REM and MOD (rung R); NN32's CHOOSE (rung U); ZZ32's and ZZ64's CHOOSE, which name helpers since climb batch 24; the shifts and powers over AnyIntegral (review-queue item 331); ZZ's narrow and widen (the integer conversions, and item 338); IntLiteral's (N5); the Appendix I entry (the gather, fork 10).",
"",
"**Rows.** None opened by plan. The CHOOSE property at m = n = -1 (review-queue item 333) stays the probe's question: your helpers keep the glue classes' values there.",
"",
"**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 24's landed tables, 0 and 0. 15 of your 18 sit in FortressLibrary, which both stages read, and NN32's three in FortressBuiltin, which only the distance stage reads. By the planner's run of the samples of D, P and N: the distance '#total 1', the asFloat control's one error at another line, and the count '#total 0', '#crash none'. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java, simpleLongArith.java, simpleUnsignedIntArith.java, simpleUnsignedLongArith.java and simpleArbitraryPrecisionArith.java: your 18 helpers at each class's end, only.",
"- Library/FortressLibrary.fss: the 15 strings named above, only.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object NN32's three strings, only.",
"- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.",
"- Not: REM and MOD (rung R); the CHOOSE strings of ZZ32, ZZ64 and NN32; interpreter/; Specification/; the tools.",
"",
"**Tests, first.**",
"- The walk guard, ProjectFortress/tests/NativeHelperFamilyDivisorsWalk.fss: GCD and LCM on each type at pairs of signs, at 0 and at the bounds, P-70's four examples among them, each overflow raising IntegerOverflow; NN32 and NN64 above their signed half (item 326); CHOOSE on NN64 and ZZ at the coefficients past the ZZ64 range, NN64's raising IntegerOverflow where it does not fit and k above n giving 0; partitionL at 0, 1, 2, a power of two, one above it and the bounds; ZZ's cmp at both signs and equality; nanoTime twice, the second not less than the first. Passing on the base and on your text. The planner's ValN printed 134 such results of the five sampled, the same on both codes: 'GCD -2147483648 0 IntegerOverflow', 'partitionL -2147483648 1073741824'.",
"- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyDivisorsCompiled.fss with its .test: one top-level declaration per helper of the 18, over ZZ32, ZZ64 and ZZ, the same values asserted; failing on the base, since the helpers are new, and passing after. The planner's SampleNDQCompiled bound five of them and passed.",
"- Keep their verdicts: walk's suite; IntegralOpsRungN and the compiled tracks; the CHOOSE tests of climb batch 24 (ChooseHelperWalk and its siblings).",
"- After the change: ant testQuick once and ant testSystem once (fork 12).",
"",
"**Specification.** None of yours: the gather rewrites the Appendix I entry's count (fork 10). List every sentence made false: that count, F-32's and F-299's, F-305's \"NN32's binding in the one library stays on its glue class\" if rung U's lands beside yours, and any sentence of the fortress-repo skill's interpreter.md, \"Natives\", that names these glue classes.",
"",
"**Overlaps by file.** FortressLibrary.fss and FortressBuiltin.fss with rung R, whose REM and MOD strings sit right above your GCD and LCM, and with D, P, A and U, at other declarations; the five helper classes with rungs A, R and U, each at another place in the class (fork 2). The gather applies you sixth, after R (fork 1); the planner's run of R's text and your strings through git apply --3way merged them clean.",
].join('\n')

const C_SECTION = [
"**The answers this rung follows.** F-34: the code generator refused 52 declarations of the library's twelve components on climb batch 22's code, all of which the checker passes; the planner's measure on this base, with the helper strings put back on their glue classes for one run, refuses 50 of the fourteen components in 14 kinds, each with its ledger row (this record's section 4, \"The code generator\"). The phase 3 exit judgement: the library must emit, not only check, before the compiled tests can run against it, and its refusals are cleared in several rungs that the planner sizes from their kinds (reviews/phase3-exit/judgement.md, section 2.4 and section 5.2, item 6). Row 820: generateTypeReference's AnyType, BottomType, SelfType and AbbreviatedType branches are empty and fall through to 'Only handling some static args of generic types in extends clause' (compiler/codegen/CodeGen.java:5783-5802), so MIMapReduceReduction (Library/FortressLibrary.fss:3728) and TrivialOpenRange (:4070), which extend a generic trait at Any, are refused. Row 821: forTry throws 'NYI: Forbid clauses are not yet implemented' (CodeGen.java:2029-2030), so shouldRaise (FortressLibrary.fss:339) is refused. Row 823: the modifier guard fnDeclCompilableModifiers holds the getter, setter, io, private and abstract modifiers only (CodeGen.java:2897-2899, checked at :2971), so String's test stringifyChars (Library/String.fss:337) is refused. The specification: a forbid clause turns an exception of a listed type thrown in the try's body into a new ForbiddenException with the thrown exception as its chain, and catch and forbid clauses are matched in order (Specification/basic/expressions/try.tex, section \"Try Expressions\"); tests are declared with the modifier test and run by fortress test (Specification/basic/tests.tex). P-33: code-generator work goes on beside the natives. This record's section 2, forks 1, 13 to 17, give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- generateTypeReference: the AnyType branch (CodeGen.java:5795-5796) emits the type reference of Any, as the TraitType branch does for a trait (:5785-5787); the BottomType, SelfType and AbbreviatedType branches stay, each with its throw, named in your report.",
"- forTry: a try with a forbid clause compiles: an exception that the body throws and that no catch clause before takes, of a type the forbid clause lists, is thrown on as a ForbiddenException whose chain is that exception; one of no listed type passes on as it is (try.tex). The compiled prelude declares ForbiddenException(chain) (Library/CompilerLibrary.fsi:84).",
"- The modifier guard holds test, so a function declared test compiles as the function it is; what fortress test runs is not yours.",
"- Each change in the method named, and anything else the emission needs there, named in your report.",
"- Not yours: the other kinds (local functions, row 304; the trait table, row 733; asif, row 818; varargs, row 624; the tuple-operand postfix operator, row 819; the kind env, row 822; label, row 81; the closure's duplicate entry, row 315; row 540's cast; the AtomicExpr of OneShotFlag); the wrappers' wall over FortressLibrary and FortressBuiltin (section 4, \"Rows filed by plan\", the second, with N5); the checker; the library's own declarations, which no compiled program reaches until the switch-over.",
"",
"**Rows.** Rows 820, 821 and 823: the gather closes each with your commit, its test your compiled test of that form (below); each row's reproducer is the probe report today.",
"",
"**Distance sites.** The count stage and the distance stage run the checker, not the code generator, so you run neither (fork 13); the gate runs both. You change no checker code, and make no speed pass.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java: generateTypeReference's AnyType branch, forTry, and fnDeclCompilableModifiers, only, and anything the emission needs there, named in your report.",
"- ProjectFortress/compiler_tests/ and ProjectFortress/tests/: your tests.",
"- Not: the checker's Scala; interpreter/; Library/; ProjectFortress/LibraryBuiltin/; nativeHelpers/; Specification/; the tools.",
"",
"**Tests, first.**",
"- Three compiled run tests in ProjectFortress/compiler_tests/, each with its .test (link, run, run_out_contains=PASS), seen failing on the base through junit.sh and passing after: one in row 820's form, a trait Holder[\\T extends Any\\] with an object that extends Holder[\\Any\\], its method called and its value asserted ('Only handling some static args of generic types in extends clause' on the base); one in row 821's form, a try whose body throws an exception that its forbid clause lists, caught outside as a ForbiddenException whose chain is asserted, beside one that its catch clause takes first and one of no listed type that passes on ('NYI: Forbid clauses are not yet implemented' on the base); one in row 823's form, a component that declares a function with the modifier test beside its run, which compiles, links and runs ('Don't know how to compile this kind of FnDecl.' on the base).",
"- The walk guards: the same three programs as interpreter tests in ProjectFortress/tests/, passing on the base and after, so that both paths give the specification's answer; walk runs them today.",
"- Keep their verdicts: the compiler track, the try and exception tests among them (compiler_tests/Compiled9.ag.fss, whose forbid clause is a static error, stays one); climb batch 24's where-clause run tests.",
"- After the change: your tests through junit.sh, in one JVM; the tracks to the gate (fork 12).",
"",
"**Specification.** None of the specification's sentences describes the code generator. List every sentence made false: F-34's sentence on the kinds, rows 820's, 821's and 823's claims, and any sentence of the fortress-repo skill's compiler.md that lists what the code generator refuses.",
"",
"**Overlaps by file.** None: no other rung edits compiler/codegen/ or these tests. The gather applies you last (fork 1).",
].join('\n')

const D_ENTRY = { id: 'D', slug: 'rung-natives-float-bits', path: '/home/user/fortress-natives-float-bits', branch: 'wip/rung-natives-float-bits', expectedMinutes: 70,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "Float's bit and rounding operations: 27, and fromRawBits (P-58; F-303)",
    blurb: "Float's bit and rounding operations: 27 bindings of value object Float and the top-level fromRawBits moved onto 28 new one-line helpers of simpleDoubleArith, each computing as its glue class does; a walk guard and a compiled guard of the 28; no value moves under walk.",
    section: D_SECTION,
    pointsToReport: [
      "Whether you took sample-D.patch as it is or changed it, and why; each binding moved, and any left on its glue class.",
      "Your two guards on the base and on your text, through the harness and junit.sh.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each walk value that moves, and each test whose verdict changes in ant testQuick and ant testSystem.",
      "Each defect met, with its XXX test or its row.",
      "Every sentence made false.",
      "A file edited beyond those named.",
    ],
    briefing: [
      "P-58", "F-303", "F-299", "P-29", "ledger:672", "ledger:330", "doc:explorations/compile-ladder/plan-25/probes/sample-D.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#Forks the batch takes, none consequential",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Float extends RR64",
      "doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss", "doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "Float's 30 bindings that name helpers since climb batch 24, and its 32 still on glue classes, 27 of which your rung moves.",
      "Walk's loader of a helper string: the overload whose Java types carry the declared types, self first.",
      "Walk's speed is irrelevant to every judgement of performance: the reflective call weighs nothing.",
      "A float compared with a not-a-number value: contested, so your guard asserts no such comparison, of =/=, MIN or MAX.",
      "The float rounding operators' values at a not-a-number value and the infinities, which your guard leaves out.",
      "The planner's sample of your text: five of your 28 helpers and strings, at the class's end, as measured.",
      "The planner's measurements on this base: the values under walk, the stages, the control, the compiled sample and the texts together.",
      "The defaults your rung builds, each with the ways not taken.",
      "Walk's float object, whose 27 glue bindings your rung moves.",
      "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.",
      "A compiled program whose own declarations bind helpers, the form of your compiled guard.",
    ],
    checks: [
      "P-58", "F-303", "ledger:672", "doc:explorations/compile-ladder/plan-25/probes/sample-D.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Float extends RR64"] }

const P_ENTRY = { id: 'P', slug: 'rung-natives-rr32', path: '/home/user/fortress-natives-rr32', branch: 'wip/rung-natives-rr32', expectedMinutes: 80,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "RR32's 49, in a new helper class (P-58; F-299)",
    blurb: "RR32's 49 bindings moved onto 49 new helpers over a Java float in a new class, simpleFloatArith, each computing as its glue class does; a walk guard and a compiled guard of the 49; no value moves under walk.",
    section: P_SECTION,
    pointsToReport: [
      "Whether you took sample-P.patch as it is or changed it, and why; each binding moved, and any left on its glue class.",
      "Your two guards on the base and on your text, through the harness and junit.sh.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each walk value that moves, and each test whose verdict changes in ant testSystem.",
      "Each defect met, with its XXX test or its row.",
      "Every sentence made false.",
      "A file edited beyond those named.",
    ],
    briefing: [
      "P-58", "F-299", "F-303", "ledger:672", "ledger:330", "doc:explorations/compile-ladder/plan-25/probes/sample-P.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#Forks the batch takes, none consequential",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object RR32 extends",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)",
      "doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss", "doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "Walk's loader of a helper string, which carries a declared RR32 in a Java float.",
      "Float's family of climb batch 24, the model of your RR32 family, and the carry of a declared Float.",
      "A float compared with a not-a-number value: contested, so your guard asserts no such comparison.",
      "The float rounding operators' values at a not-a-number value and the infinities, which your guard leaves out.",
      "The planner's sample of your text: the new class with three of your 49 helpers and strings, as measured.",
      "The planner's measurements on this base: the values under walk, the stages, the control, the compiled sample and the texts together.",
      "The defaults your rung builds, each with the ways not taken.",
      "Walk's 32-bit float object, whose 49 glue bindings your rung moves.",
      "The loader's table of the declared types it carries: RR32 in a float.",
      "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.",
      "A compiled program whose own declarations bind helpers, the form of your compiled guard.",
    ],
    checks: [
      "P-58", "F-299", "ledger:672", "doc:explorations/compile-ladder/plan-25/probes/sample-P.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object RR32 extends"] }

const A_ENTRY = { id: 'A', slug: 'rung-natives-asfloat', path: '/home/user/fortress-natives-asfloat', branch: 'wip/rung-natives-asfloat', expectedMinutes: 50,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The asFloats of Int, RR32, NN32, Long and BigNum, at RR64 (P-58; climb batch 23's fork 12)",
    blurb: "the asFloats of Int, RR32, NN32, Long and BigNum declared at RR64, the type of the library's abstract asFloat, and moved onto their helpers, two of them new; a walk guard and a compiled guard of the five; no value moves under walk.",
    section: A_SECTION,
    pointsToReport: [
      "Whether you took rung-A.patch as it is or changed it, and why; each header changed and each binding moved.",
      "Your two guards on the base and on your text, through the harness and junit.sh.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each walk value that moves, and each test whose verdict changes in ant testQuick and ant testSystem.",
      "Every sentence made false.",
      "A file edited beyond those named.",
    ],
    briefing: [
      "P-58", "F-303", "F-299", "F-308", "doc:explorations/compile-ladder/plan-25/probes/rung-A.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#Forks the batch takes, none consequential",
      "code:Library/FortressLibrary.fsi#abstract asFloat(self): RR64",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Int extends ZZ32", "doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss",
      "doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "Walk carries a Float and an RR64 alike in a double, so an asFloat at RR64 answers the same Float object.",
      "Walk's loader of a helper string, and the bindings that name helpers today.",
      "The rewrite's transfers, through which NN32's asFloat reads at its declared type.",
      "Your text as the planner measured it: five headers at RR64, five strings and two new helpers.",
      "The planner's measurements on this base: the values under walk, the stages, the control, the compiled sample and the texts together.",
      "The defaults your rung builds, each with the ways not taken.",
      "The library's abstract asFloat on Number, at RR64, the type your five declarations take.",
      "Walk's object Int, whose asFloat is one of your five.",
      "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.",
      "A compiled program whose own declarations bind helpers, the form of your compiled guard.",
    ],
    checks: [
      "P-58", "F-303", "doc:explorations/compile-ladder/plan-25/probes/rung-A.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#Forks the batch takes, none consequential",
      "code:Library/FortressLibrary.fsi#abstract asFloat(self): RR64"] }

const R_ENTRY = { id: 'R', slug: 'rung-natives-remainders', path: '/home/user/fortress-natives-remainders', branch: 'wip/rung-natives-remainders', expectedMinutes: 70,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "REM and MOD on the five integer types, by new helpers (P-58; rows 336 and 848)",
    blurb: "rows 336 and 848: REM and MOD on ZZ32, ZZ64, NN32, NN64 and ZZ moved onto ten new helpers that raise DivisionByZero at a zero divisor; the two XXX tests promoted and three more division tests; a walk guard and a compiled guard of the ten; rows 336 and 848 closed.",
    section: R_SECTION,
    pointsToReport: [
      "Whether you took rung-R.patch as it is or changed it, and why; each binding moved.",
      "Your division tests and the promoted ones before and after through the harness, and your two guards on the base and on your text.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each walk value that moves beyond the remainders by zero, and each test whose verdict changes in ant testQuick and ant testSystem.",
      "Every sentence made false.",
      "A file edited beyond those named.",
    ],
    briefing: [
      "P-58", "F-24", "F-306", "F-308", "ledger:336", "ledger:848", "doc:explorations/compile-ladder/plan-25/probes/rung-R.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#Forks the batch takes, none consequential", "code:Library/FortressLibrary.fss#trait ZZ32 extends",
      "doc:ProjectFortress/tests/XXXZZ64RemainderByZeroWalk.fss",
      "doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators",
      "doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss", "doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "Walk raises a helper's DivisionByZero as the library's own, where a glue class's Java exception ends the run.",
      "The 64-bit and big integers' bindings that name helpers since climb batch 24, and their REM and MOD still on glue classes.",
      "The rewrite's transfers, through which NN32's and NN64's REM and MOD read at their declared types.",
      "Your first row: REM and MOD by zero on ZZ32 and ZZ64 end the run, which your helpers turn into DivisionByZero.",
      "Your second row: the same on NN32, NN64 and ZZ.",
      "Your text as the planner measured it: ten new helpers after each class's division helper, and ten strings.",
      "The planner's measurements on this base: the values under walk, the stages, the control, the compiled sample and the texts together.",
      "The defaults your rung builds, each with the ways not taken.",
      "Trait ZZ32, whose REM and MOD your rung moves, beside the GCD and LCM of rung N.",
      "Row 336's XXX test, which your fix promotes, the form of your three new division tests.",
      "What the specification says of REM, MOD and division by zero, which your tests cite.",
      "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.",
      "A compiled program whose own declarations bind helpers, the form of your compiled guard.",
    ],
    checks: [
      "P-58", "F-24", "ledger:336", "ledger:848", "doc:explorations/compile-ladder/plan-25/probes/rung-R.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators"] }

const U_ENTRY = { id: 'U', slug: 'rung-natives-unsigned', path: '/home/user/fortress-natives-unsigned', branch: 'wip/rung-natives-unsigned', expectedMinutes: 90,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The unsigned helpers fixed, UnsignedLong's three, NN64's prefix DOTMINUS and NN32's CHOOSE (P-58; rows 326 and 860)",
    blurb: "rows 326 and 860: the compiled NN64 printing and wraparound negation helpers and the run time's NN32 and NN64 printing fixed; the rewrite gives UnsignedLong's self the NN64 transfer; UnsignedLong's three, NN64's prefix DOTMINUS and NN32's CHOOSE moved; the XXX pair promoted; walk and compiled guards; the rewrite's seven limits probed and the XXX tests owed for rows 865 and 866.",
    section: U_SECTION,
    pointsToReport: [
      "Whether you took rung-U.patch as it is or changed it, and why; each helper fixed and each binding moved.",
      "Your compiled tests of the printing and the promoted pair before and after through junit.sh, and your walk guard on the base and on your text.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each compiled test whose verdict changes in ant testQuick, and each walk test in ant testSystem.",
      "Each walk or compiled value that moves beyond the rows' fixes.",
      "The rewrite's seven limits probed: for each, its row and test, or its one line with the command; the XXX tests owed for rows 865 and 866 through junit.sh.",
      "Every sentence made false.",
      "A file edited beyond those named, or any edit of the checker's Scala, NamingCzar or interpreter/.",
    ],
    briefing: [
      "P-58", "F-308", "F-298", "ledger:326", "ledger:860", "ledger:861", "ledger:865", "ledger:866",
      "doc:explorations/compile-ladder/plan-25/probes/rung-U.patch", "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#Forks the batch takes, none consequential",
      "doc:explorations/coordinator/PLAN.md#Climb batch 24, listed for his review",
      "code:ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java#private static String transfer(String declared, Class<?> c, String helper, boolean result)",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object UnsignedLong extends NN64",
      "doc:ProjectFortress/compiler_tests/XXXNN64WrappingNegationHelperCompiled.fss", "doc:ProjectFortress/tests/NativeHelperFamilyNN64Walk.fss",
      "doc:ProjectFortress/compiler_tests/NativeHelperFamilyNN64Compiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "The rewrite's transfers for NN32, NN64 and Char, which your rung gives to UnsignedLong's self, and the six bindings left.",
      "The compiled rewrite of a helper string into a call, which reads the declared types.",
      "Your first row: the compiled path prints an NN32 or NN64 above its signed half as negative, by a helper and the run time.",
      "Your second row: the NN64 wraparound negation helper answers its operand; its XXX pair is yours to promote.",
      "Why Char's asExprString stays on its glue class: its form is open.",
      "Row 865, whose XXX compile test you write: a helper string in a local function is not rewritten on the compiled path.",
      "Row 866, whose XXX run pair you write: a program's object that extends ZZ32 compiles and dies at class load.",
      "Your text as the planner measured it: the helpers and run time fixed, the rewrite's condition and five strings.",
      "The planner's measurements on this base: the values under walk, the stages, the control, the compiled sample and the texts together.",
      "The defaults your rung builds, each with the ways not taken.",
      "The steps PLAN owes the next rung that edits the rewrite: the seven limits to probe, and the tests owed for rows 865 and 866.",
      "Where the rewrite picks a transfer by the declared type, the place of your condition.",
      "Walk's object of NN64, whose three bindings your rung moves.",
      "Row 860's compiled XXX program, which your fix promotes with its link test.",
      "Climb batch 24's walk guard of NN64, values above the signed half asserted: the form of yours.",
      "Climb batch 24's compiled guard of NN64, an NN64 carried in a ZZ64: the form of your compiled guards.",
    ],
    checks: [
      "P-58", "F-308", "ledger:326", "ledger:860", "doc:explorations/compile-ladder/plan-25/probes/rung-U.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes", "doc:explorations/coordinator/PLAN.md#Climb batch 24, listed for his review",
      "code:ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java#private static String transfer(String declared, Class<?> c, String helper, boolean result)"] }

const N_ENTRY = { id: 'N', slug: 'rung-natives-divisors', path: '/home/user/fortress-natives-divisors', branch: 'wip/rung-natives-divisors', expectedMinutes: 80,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The integer divisors and nanoTime: 18, by new helpers (P-58; P-70; P-73)",
    blurb: "the integer divisors and nanoTime: GCD and LCM on the five integer types, CHOOSE on NN64 and ZZ, partitionL on the four fixed widths, ZZ's cmp and the top-level nanoTime moved onto 18 new helpers, each computing as its glue class does; a walk guard and a compiled guard of the 18; no value moves under walk.",
    section: N_SECTION,
    pointsToReport: [
      "Whether you took sample-N.patch as it is or changed it, and why; each binding moved, and any left on its glue class.",
      "Your two guards on the base and on your text, through the harness and junit.sh.",
      "The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.",
      "Each walk value that moves, and each test whose verdict changes in ant testQuick and ant testSystem.",
      "Whether a CHOOSE helper keeps state, and its parallel test if it does.",
      "Every sentence made false.",
      "A file edited beyond those named.",
    ],
    briefing: [
      "P-58", "P-70", "P-73", "F-305", "F-308", "ledger:855", "doc:explorations/compile-ladder/plan-25/probes/sample-N.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#Forks the batch takes, none consequential",
      "code:Library/FortressLibrary.fss#trait ZZ extends { AnyIntegral", "doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss",
      "doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss"],
    reasons: [
      "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it.",
      "GCD and LCM give nonnegative results and raise IntegerOverflow where the result does not fit: the values your helpers give.",
      "Fixed-width arithmetic raises IntegerOverflow where its result does not fit, CHOOSE included.",
      "The CHOOSE helpers of ZZ32 and ZZ64, fixed in climb batch 24 to keep no state between calls, the model of yours.",
      "The rewrite's transfers, through which the NN32 and NN64 bindings read at their declared types.",
      "The race of a CHOOSE helper's static scratch array, which your helpers must not bring back.",
      "The planner's sample of your text: five of your 18 helpers and strings, at the classes' ends, as measured.",
      "The planner's measurements on this base: the values under walk, the stages, the control, the compiled sample and the texts together.",
      "The defaults your rung builds, each with the ways not taken.",
      "Trait ZZ, whose cmp, GCD, LCM and CHOOSE your rung moves.",
      "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.",
      "A compiled program whose own declarations bind helpers, the form of your compiled guard.",
    ],
    checks: [
      "P-58", "P-70", "P-73", "doc:explorations/compile-ladder/plan-25/probes/sample-N.patch",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes"] }

const C_ENTRY = { id: 'C', slug: 'rung-codegen-walls', path: '/home/user/fortress-codegen-walls', branch: 'wip/rung-codegen-walls', expectedMinutes: 60,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The code generator's three walls: Any in an extends clause, forbid, and test (P-33; rows 820, 821 and 823)",
    blurb: "rows 820, 821 and 823: the code generator compiles a trait or object that extends a generic trait at Any, a try with a forbid clause, and a function declared test; three compiled run tests and their walk guards; the three rows closed.",
    section: C_SECTION,
    pointsToReport: [
      "Each method changed, and anything else in CodeGen the emission needed.",
      "Your tests before and after through junit.sh, and the walk guards through the harness.",
      "Each compiled test whose verdict changes in the compiler track, if you ran it.",
      "Every sentence made false.",
      "A file edited beyond those named, or any edit of the checker's Scala.",
    ],
    briefing: [
      "F-34", "ledger:820", "ledger:821", "ledger:823", "ledger:650", "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:explorations/coordinator/CLIMB-BATCH-25.md#Forks the batch takes, none consequential",
      "doc:explorations/perf-probes/codegen-distance/REPORT.md#3. The kinds of refusal", "doc:Specification/basic/expressions/try.tex#Try Expressions",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forTry(Try x)"],
    reasons: [
      "The code generator's refusals over the library's twelve components, which your rung cuts by four declarations.",
      "Your first row: a trait or object extending a generic trait at the static argument Any.",
      "Your second row: a try with a forbid clause.",
      "Your third row: a function declared with the modifier test.",
      "The modifier guard's row for override, beside row 823's test modifier.",
      "The planner's measurements on this base: the values under walk, the stages, the control, the compiled sample and the texts together.",
      "The defaults your rung builds, each with the ways not taken.",
      "The 14 kinds as the probe of 2026-10-23 named them, with the reproductions of row 820's form.",
      "What a forbid clause does: the ForbiddenException your forTry must throw.",
      "Where the forbid clause is refused today, your second change.",
    ],
    checks: [
      "F-34", "ledger:820", "ledger:821", "ledger:823", "doc:explorations/coordinator/CLIMB-BATCH-25.md#The planner's probes",
      "doc:Specification/basic/expressions/try.tex#Try Expressions"] }

const RUNGS = [D_ENTRY, P_ENTRY, A_ENTRY, R_ENTRY, U_ENTRY, N_ENTRY, C_ENTRY]
const BATCH_INTRO = "This run is climb batch 25, the third batch of the plan's phase 4, the switch-over, and the third of its natives: each library binding builtinPrimitive(\"...\") is to name a static Java helper of nativeHelpers that both paths call, in place of a glue class of walk's, which the compiled path cannot use (P-58; F-32). Climb batches 23 and 24 moved 173 of the 449 live bindings; the count and the distance stand at 0 with them (compile-ladder/climb-batch-24/gate/; F-53). This batch starts N3, the bindings whose helper does not exist yet: each new helper computes as its glue class does. Its rungs: D, Float's 27 bit and rounding operations and the top-level fromRawBits, 28 new helpers; P, RR32's 49, in a new helper class, simpleFloatArith; A, five asFloats declared at RR64, the type of the library's abstract asFloat, two of their helpers new; R, REM and MOD on the five integer types, ten new helpers that raise DivisionByZero at a zero divisor (rows 336 and 848); U, two unsigned helpers and the run time's unsigned printing fixed (rows 326 and 860), the rewrite's NN64 transfer given to UnsignedLong's self, and five bindings moved; N, the integer divisors and nanoTime, 18 new helpers; C, three walls of the code generator, Any in an extends clause, forbid and the test modifier (rows 820, 821 and 823). Every rung that moves bindings writes two guards, a walk program and a compiled program over the same helpers; for a new helper the compiled guard fails before the rung and passes after; and an XXX test for each defect it meets. The planner measured the texts of R, U and A and samples of D, P and N together on this base: the stages 0 and 0; walk's suite 723 tests and two failures, the XXX tests R promotes; the specification's examples 130 and no failure; the compiled tracks one failure, the XXX test U promotes; every value under walk the old code's but the remainders by zero. No rung changes the checker's code, so none makes a speed pass. No rung builds on another, and none lands only with another; the gather applies the rungs in the manifest's order, rewrites the Appendix I entry's Effect once, and runs the 52 team demos on the merged tree; ant testSpecData runs in the gate because the landed summary has it."
// =========================== END MANIFEST ==================================

const BATCH_DIR = 'explorations/compile-ladder/climb-batch-' + BATCH
const GATE_DIR = BATCH_DIR + '/gate'
const SITES = 'explorations/compile-ladder/gate/distance-sites.tsv'   // the distance stage's per-site list, one path overwritten at each landing
const LOG_DIR = 'tmp/gate-batch-' + BATCH          // untracked: .gitignore ignores /tmp/
const GATE_OUT = LOG_DIR + '/out'   // the gate writes here; the commit stage copies it to GATE_DIR
const SPEC_PDF = MAIN + '/tmp/gather/fortress-batch-' + BATCH + '.pdf'   // the gather's build of the specification, which the commit stage takes when no later commit changes Specification/

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
'## Your scratch',
'',
'Every file you write that your role does not commit (a saved output, an extract of a briefing or a transcript, a program, a copy of code) goes under the tmp/ of the worktree your role works in, which git ignores: in the folder your role\'s part below names, or else in one named for your role. Never write one in the session\'s scratchpad directory, though your system prompt names it; this brief holds over it, since every agent of this run shares that folder, and in climb batch 24 two skeptics wrote one file name there.',
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

// How a worker and a skeptic write their reports: in climb batch 24 the harness refused four of seven
// workers' Write of REPORT.md and none of the three heredocs (reviews/batch-24-review.md, finding 5).
const BY_HEREDOC = 'through a Bash heredoc or a script, not the Write tool: the harness refused the Write of REPORT.md to four of climb batch 24\'s seven workers (\'Subagents should return findings as text, not write report files.\') and none of the three heredocs'

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
'Write each of these files ' + BY_HEREDOC + '.',
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
'   Write them, and every other scratch file of yours, under tmp/' + rung.slug + '/skeptic/. ' + (rung.writesState
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
'- A correction: a sentence of REPORT.md or record.md, a citation, a provenance line, a FACTS entry, a missing assertion of a value the rung\'s own test already reaches, a home-2 or home-3 test, a ledger row (NEW-' + rung.id + '-n in record.md, in the row template), a sentence of the specification the change makes false. Make it, and commit it. A test of a defect you find, here or below, goes in the test folder for its kind that the skill\'s tests-writing.md, "Where a test goes, and how it passes", gives, ProjectFortress/tests/ or a compiled one such as ProjectFortress/compiler_tests/, whatever the section\'s list of files says; where that list lacks the folder, the test\'s path goes in pointsReached, as a path outside the section does (below). An assertion or a test you add is seen failing through the harness on the base\'s code, run with the old code tool (the skill\'s worktrees.md, "Running the old code"), and passing on the head: the fix is already in the tree, so the base is where it fails.',
'- A defect of the change: it is wrong, or incomplete, a sibling site its own repair owes, a crash where the text gives an error, a test not seen failing first. Fix it, test first: the program that measured it becomes a gated test or an assertion (the skill\'s tests-writing.md), seen failing through the harness on the worker\'s head before your edit; then the fix, where it belongs and in the library\'s way, after you have listed the ways; built as the skill\'s build-and-caches.md says; the test seen passing; and, when your fixes change Java or Scala of the checker, of walk or of a shared phase, the whole suite they reach once, after your last fix (the skill\'s tests-running.md). Commit each fix with its test in one commit whose title begins "Skeptic\'s fix:", and push. Run no count or distance stage after a fix: the gate\'s tables on the merged tree are the record, and SKEPTIC.md says that the report\'s tables are those of the worker\'s head.',
'- Settled or contested. A fix is settled when the rung\'s section, the specification or a decision on record says that what your fix makes the code do is right: cite that sentence with the fix. A fix is contested when (a) the worker\'s report argues for the behaviour your fix changes, not only for its form; or (b) nothing on record settles it and you chose among ways; or (c) it touches a path the section does not give the rung and no sentence you cite settles it. A fix that reaches a point to report, or touches a path outside the section, is not contested for that alone: when a sentence you cite settles it, it is settled, and the point or the path goes in pointsReached for the curator. Make a contested fix all the same, in a commit of its own, and list it in contested with the worker\'s argument and yours: a judge rules on it alone, and may revert it.',
'- Refuse only when the rung cannot be fixed here: its approach is wrong and a fix would redo it; the fix needs a path no rung of this batch may touch, or a decision of the curator; or it is larger than a repair round. Then make no fix for that finding, and refuse with the one thing that must change.',
'- Every point to report the rung as it stands reaches, whether or not the worker listed it, goes in pointsReached; a question for the curator, in forCurator. Do not edit the worker\'s account of its own decisions: say where you differ in SKEPTIC.md.',
'',
'## Your verdict',
'',
'Write SKEPTIC.md in ' + dir + ': what you checked, the lines of your programs\' output each finding rests on with their commands, each fix with its finding, its test\'s failing and passing lines and its commit, each contested fix with both arguments, and your verdict. Write it ' + BY_HEREDOC + '. Commit it alone, last, and push. Set verdict to approved when the rung, with your fixes, is right and none is contested; contested when it is right with your fixes and one or more is contested; refused when it cannot be fixed here. In skepticText put the single word committed once SKEPTIC.md is committed; only if the harness refused the write, say so in findings and carry the text in skepticText, word for word. headJudged is the head the worker left, before your first commit; headAfter the head after your last. Run no suite but the one your own fix needs, as "What you do with a finding: fix it" says; the gate runs every suite on the merged tree.',
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
'   A text mismatch is not blocking. Where one rung\'s specification text and another rung\'s code disagree and the decisions on record settle it, fix the side they settle. Where they do not, it is reversible and lands as a point to report: the text stands as the rung wrote it; the path that departs gets a ledger row and a gated XXX test asserting the text\'s rule, or, where no such test can show the departure, as when it shows only in the one library\'s world, a gated test of today\'s behaviour, the row saying why; the text\'s entry in Specification/appendices/changes.tex names that row among its departures; all in the later rung\'s commit, and the mismatch goes in your forCurator.',
'5. One commit: the applied source and tests, the rung\'s REPORT.md, SKEPTIC.md and JUDGE.md if any, a decision record if it has one (record.md is folded, not landed: take it out of the index and the tree once step 2 has folded it), FACTS.md, the ledger and its history file, the handover, and PLAN.md when step 4 wrote to it. Stage them by an explicit list and read git diff --cached --stat before you commit. Title: what the repair does, in plain words; body: the two or three sentences of record.md that say why, and where the commit touches any path outside explorations/ and .claude/, a line beginning "historical:" naming the files of the original 2012 tree it edits, from the provenance block. The skill\'s footer. Do not push.',
'',
'## After the rungs',
'',
'6. Close each row a landed rung fixed, as its rowsClosed and REPORT.md name it, once its test passes on the merged tree as the rung last ran it: ' + LEDGER + ' close N --commit <the rung\'s commit on main> --test <the test>. Then ' + LEDGER + ' landing-check ' + BASE + ', which fails on any finding, a failure the base already had among them: a row that breaks the template, an XXX test the batch deleted or renamed that an open row still names, an open row that a landed commit says it fixed, a FACTS or POSITIONS entry that states a row\'s status otherwise. Clear each before this commit, through ' + LEDGER + ' rewrite, close or note, or the entry reworded, and run it again until it prints no finding. One commit, titled "Close the rows climb batch ' + BATCH + ' fixed".',
'7. ' + BATCH_DIR + '/RECORD.md: the rungs applied, in what order and why, each with its commit hash; the rows opened (number, rung, claim) and closed; each skeptic\'s fixes and contested rulings, by commit; every file written from the journal; the rungs that did not land (below); the points to report every landed rung reached, from the lists below; the items for the curator and where each is in PLAN.md; and last, under the heading "Revival changes, for the skill writer", one subsection per landed rung, headed by the rung, holding its "Revival change" section from tmp/gather/<slug>-revival-change.md, both parts word for word (the change, and its provenance), or its line "Revival change: none" with the reason. One commit.',
'',
'When you build the specification to check its text (the skill\'s specification.md, "Building it"), build it once, on main\'s text after the last edit under Specification/, and before you remove the build\'s files copy Specification/fortress/fortress.pdf to ' + SPEC_PDF + ', from whichever tree you built in: the commit stage takes that copy in place of a build of its own when no commit after yours changes Specification/.',
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
'Three kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections". A defect whose repair touches a path outside explorations/ that is not a test file (source, library, checker, interpreter or specification) you do not fix: return it in blockingCode, precisely enough that a judge can rule on it from your words and the diff; a repair runs, and the gate runs again only when it changed a path the gate reads (ProjectFortress/ but test files, Library/, build.xml). A finding settled by tests and records only that you do not fix yourself, a test owed or a test file to change, you return in routed, each with the step the next batch owes; put each into PLAN.md as review-routed.1, review-routed.2 in your corrections commit, and list the ids in curatorItems: it goes to the next batch and holds nothing. A text mismatch the gather filed as a point to report is not blocking: check its row, its XXX test (or its test of today\'s behaviour, where the row says why no XXX test can show the departure) and its Appendix I mention; complete a missing record yourself; return a missing test in routed. Do not run the gate, and do not push.',
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
'1. Copy the gate\'s outputs into the tree: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/, and ' + LOG_DIR + '/distance/errors.tsv to ' + SITES + ' (mkdir -p its folder), the per-site list the next batch\'s rungs read as their before. Write the landed figures into explorations/coordinator/FACTS.md, numbers only, by python3 ' + TOOLS + '/record.py set N FILE (its header gives the form), FILE the entry\'s whole new line under ' + LOG_DIR + '/, one call per entry, with --by "climb batch ' + BATCH + ' commit stage" and a --note naming the lines read; the tool writes FACTS-history.md beside it, and python3 ' + TOOLS + '/record.py check --base <the commit before your edits> prints 0 failures before the commit. In F-53, from ' + GATE_DIR + '/distance.txt and checker-count.txt: every figure it gives of the last landed gate, the lines of distance.txt it cites and the batch number in its title and in the paths it cites. In F-240, in its own form, the two stages\' seconds at the last landed gate: the count stage\'s, which its table does not record, from the gate\'s log, echo $(( $(stat -c %Y ' + LOG_DIR + '/checker-count/run.txt) - $(stat -c %Y ' + LOG_DIR + '/checker-count/javac.txt) )), the stage\'s start to its last write, written "about N s" to the nearest 5 s (where F-240 names the gate\'s call times as that figure\'s source, name the file times of the gate\'s log; where the two files are gone, leave the figure and say so in your summary); the distance stage\'s from distance.txt, its #seconds line\'s total and FortressLibrary figure, the first load of its #machine line and the components its first line counts; the figures F-240 gave of the gate before, as the figures it now compares them against, with that gate\'s batch; and the batch number in its title and in the path it cites. Change no other word; a sentence the new figures make false you name in your summary for the coordinator. When a landed commit changed a file under Specification/ (git diff --name-only ' + BASE + '..HEAD -- Specification/), Specification/fortress.pdf takes the PDF of the landed text: where the gather kept its build, ' + SPEC_PDF + ', and git diff --name-only <the gather\'s head, in its result below> HEAD -- Specification/ prints nothing, copy that file to Specification/fortress.pdf and build nothing, since it is the same text; otherwise build the PDF once, in Specification/fortress/, ./ant genSource then ./ant tex, each logged under ' + LOG_DIR + '/, and copy Specification/fortress/fortress.pdf to Specification/fortress.pdf. Then wait for step 0 with wait_for ' + MG_LOG + ', called again until it prints EXIT= (or 10 minutes have passed, which you then report), and append to ' + GATE_DIR + '/summary.txt its verdict lines, each prefixed "# microgpt-walk ": grep -h "VERDICT\\|^rc=" ' + MG_DIR + '/*.txt for the run\'s folder. A FAIL there is reported, and holds nothing. One commit, titled "' + COMMIT_TITLE + '": the summary, the two tables, ladder/, the per-site list, FACTS.md with FACTS-history.md, and the PDF; the logs under ' + LOG_DIR + '/ are never committed.',
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
