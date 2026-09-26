// Workflow script: one batch of the compile-path ladder climb.
//
// Generalised 2026-09-19 from the script that ran climb batch 1, so that the
// next batch is a MANIFEST CHANGE AND NOTHING ELSE: the coordinator replaces the
// block marked "MANIFEST" below and launches. Batch 1's manifest is kept below
// the "END MANIFEST" line as BATCH_1_EXAMPLE, the worked example, which the
// script does not use.
//
// The changes this revision carries are the six process decisions Pavol took on
// 2026-09-19 (POSITIONS.md, "after climb batch 1 landed"), as
// explorations/coordinator/process-decisions-review-1.md amended them, plus the
// eight free changes of repair-batch-review.md section 10. What each stage does
// now and which review item each change answers is written up in
// explorations/coordinator/climb-batch-workflow.md.
//
// Launch, after the worktrees exist (remote-container.md, "Setting up a batch's
// worktrees"):
//   Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js',
//             args: {base: '<the commit main is at>'}})
//
// Every worker, skeptic, gather, review and gate agent is pinned to Opus, and so
// is a judge's first ruling on a rung or on the merged tree; a second ruling on
// the same rung or tree runs on Fable (Pavol, 2026-09-24, on option (c) of
// climb-batch-3-redesign.md, the escalation; 2026-09-26, Fable named, since the
// session may run on Opus). No backticks anywhere in this file.

export const meta = {
  name: 'fortress-climb-batch',
  description: 'One batch of Fortress compile-ladder rungs in isolated worktrees, each judged by its own skeptic, gathered, reviewed and gated once (suite counts, four-thread atomic runs, ladder regression, the checker count over the interpreter library) before it lands',
  phases: [
    { title: 'Rung', detail: 'test-first repair in an isolated worktree, committed and pushed to wip/ as it goes; never runs the full gate' },
    { title: 'Skeptic', detail: 'independent judgement with its own walk-vs-compiled differential; one repair round allowed' },
    { title: 'Judge', detail: 'Opus for the first ruling on a rung or on the merged tree, Fable for a second ruling on the same one; only on a stop, a refusal, a blocking review or a red gate: reads the reports and the diff, decides, writes the decision' },
    { title: 'Gather', detail: 'net change of each approved branch applied to main, record folded, one local commit per rung' },
    { title: 'Review', detail: 'the merged diff against the batch rules and the folded record as a whole; runs beside the gate' },
    { title: 'Gate', detail: 'compileAll, library rebuild, testFast, testSystem, the summary diff, the four-thread atomic runs, the ladder regression and the checker count over the interpreter library' },
    { title: 'Commit', detail: 'hashes into the ledger notes, push main, fast-forward the container branch, remove the worktrees; no push while a landed rung carries a stop that was met and not lifted' },
  ],
}

const OPUS = 'opus'   // every worker, skeptic, gather, review and gate agent, and a judge's first ruling
const FABLE = 'fable' // a judge's second ruling on the same rung or tree
// A judge's tier: Opus for the first ruling on a rung or on the merged tree,
// Fable for a second ruling on the same one: a refusal ruled after a stop on one
// rung, a red gate ruled after a blocking review on the merged tree. Pavol's
// decisions of 2026-09-24 (the escalation) and 2026-09-26 (Fable named rather
// than the session's model, which may be Opus).
const judgeTier = (priorRuling) => priorRuling ? { model: FABLE } : { model: OPUS }
const BASE = args && args.base
if (!BASE) throw new Error('args.base is required: the commit every wip/ branch was cut from')
const CONTAINER_BRANCH = 'claude/worker-brief-fable-vnnuv8'   // this container's infrastructure branch; kept at main
const MAIN = '/home/user/fortress'

// ===========================================================================
// MANIFEST - the coordinator replaces everything between this line and the
// "END MANIFEST" line, and changes nothing else in this file.
//
// Concurrency, which the manifest does NOT set: at most two agents at once here
// (FACTS.md, "The container"), a freed slot going to the next queued agent,
// FIFO. k is 3 in this batch (F, T, R), so the queue sets the wall.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order
// only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction, never red) and
// expectedCheckerCrash (compared exactly with the table's #crash field; no
// rung of this batch declares one, so any change of the crash row is red).
// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; the
// script applies it after the scatter, so T, which names F, reaches the gather
// only when F is approved, and so does O beside F.
//
// Batch 6's values are CLIMB-BATCH-6.md, sections 3, 6 and 7. Each tail is
// that rung's section of section 3 word for word, with the record's code-span
// backticks dropped (this file carries none); ASCII only. F's section opens
// with its answers line (Q1, the record's one question); O's placement word is
// computed from O_BESIDE_F. Two switches carry where rung O runs:
// O_BESIDE_F false (the record's reading) leaves O for the follow-up run;
// true puts O in this batch beside F. FOLLOWUP true is the one-rung follow-up
// run of O, cut from the tree batch 6 landed; set LEDGER_FROM then too.
// Manifest order F, T, R (then O) is the ledger numbering order; the scatter
// starts F, then T, then R (F, O, T, R with O beside F, longest expected
// first). F predicts the checker total about 44, T and R
// 125. No rung declares a ladder move. The base is <base>, passed at launch as
// args.base, not written here.
// ===========================================================================

const O_BESIDE_F = false   // the record's section 1: rung O runs after F as the follow-up; true puts it in this batch beside F
const FOLLOWUP = false     // true only for the one-rung follow-up run of rung O, launched from the tree batch 6 landed

const BATCH = FOLLOWUP ? '6b' : '6'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-6.md'
const LEDGER_FROM = 431   // the first free ledger row when the batch was planned (the highest is 430); for the follow-up, the first free row when it launches

const F_TAIL = [
"",
"## Your rung: F - the flat tower",
"",
"SLUG is rung-flat-tower. WORKTREE is /home/user/fortress-flat, branch wip/rung-flat-tower.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.md, section 3, under \"F. The flat tower\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q1 = (a). (Section 1 of the batch record gives the question and both options; where this section says \"under Q1 = (b)\", that text applies only if the coordinator has written that letter here. Where rung O runs does not change this rung: the rational type's arithmetic is this rung's either way.)",
"",
"**The problem.** The interpreter's library nests its number types: ZZ32 extends ZZ64, which extends ZZ; NN32 extends NN64, which extends ZZ; every integer type is below AnyIntegral, QQ, RR64 and Number; and each level carries the self-typed algebra traits at its own type (Library/FortressLibrary.fsi:276, :338, :373, :409, :412, :442, :473, :511, :553; ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:82). Instantiation exclusion, which the specification states since rung S (Specification/basic/types-vals-vars.tex:218-237, Specification/basic/traits.tex:299-313) and the compiled checker enforces, refuses a type below two instantiations of one generic, so the checker refuses the tower (61 errors at 23 declarations; FACTS.md, \"The compiled checker's exclusion rule is the designers' multiple instantiation exclusion\"). Beside it, Number declares 52 operators and functions in the api and 57 in the component that take any number and answer in floating point, such as opr +(self,b:Number):RR64 = asFloat(self) + asFloat(b) (Library/FortressLibrary.fss:379), so a mixed call never meets a conversion (explorations/reviews/mie-probes/price-keep-the-rule.md section 1). What else rests on the nesting:",
"- SUM and PROD reduce over Number, with the integer 0 and 1 as the identity for every element type, under the team's comment \"Hack to permit any Number to work non-parametrically\" (Library/FortressLibrary.fss:3043-3111, api Library/FortressLibrary.fsi:1847-1849 and after), so an empty RR64 sum is 0 : Int and a sum's result type is Number (explorations/reviews/sum-replacement-judgement.md section 3, item 1).",
"- BIG MAXN, BIG MINN and BIG MINMAXN (Library/FortressLibrary.fss:3113-3150, api Library/FortressLibrary.fsi:1869-1887) take the rational -1/0 as an identity that no integer or float fold can hold, and nothing calls them (row 423).",
"- A ZZ64 variable set from a numeral holds a ZZ32 and wraps at 32 bits (row 146).",
"- The rational comparison cross-multiplies its parts in whatever width they hold, so (widen(1) LSHIFT 62) < 1/4 is true (row 428; Library/FortressLibrary.fss:537-541), and after the natives raise, ProjectFortress/tests/ReflectiveQuickCheckTest.fss stops with IntegerOverflow on the runs whose random data reach it (explorations/compile-ladder/rung-wrap-operators/REPORT.md:23). By reading, QQ's +, DOT and / (Library/FortressLibrary.fss:559-577) have the same shape. The specification says \"Rational computations do not overflow\" (Specification/basic/operators/opr-overview.tex:156, :197).",
"",
"**The decisions.** Route A (explorations/coordinator/POSITIONS.md:92): the fixed widths, ZZ, QQ and RR64 siblings under Number, each carrying its own algebra, Number without its catch-all operators, a coerce on each wider type converting from the narrower, the integers inside QQ by coercion, and the sites that rely on the subtyping kept in text with their outputs re-measured. Answer 8 (:159): an exact conversion is a coercion and a lossy one stays explicit; ZZ32 and numerals coerce into RR64; ZZ64 into RR64 stays explicit; a generic call or range over mixed widths writes its static argument until row 388's fix in phase 3; no model line changes. Answer 7 (:165): option A of explorations/reviews/sum-replacement-judgement.md section 4, one generic sum and one generic product reduction over the algebra bounds, joined with the element type's own operator, the identity from the static argument through the () -> T witness typecase of array1 (Library/FortressLibrary.fss:2283), over every number leaf, each leaf listed before any of its supertypes, narrowest first, ZZ and QQ before RR64, so that the text is right even on the nested tower (explorations/reviews/max-min-identities-judgement.md section 5, item 1). The three Number-typed big operators (:168): dropped, with their reduction objects, the two fusion pairs and the distribute overloads that name them, in the api as in the component; the reason, in the report and the commit, is that their identity is a value no integer or float fold can hold and that a maximum's identity is not carried by a coercion (explorations/reviews/max-min-identities-judgement.md sections 1 and 4). The integration review's checks (:152-156) and the verdict on answer 7 (explorations/reviews/sum-replacement-verdict.md), below.",
"",
"**The coercions, from those decisions.** ZZ64 from ZZ32 and NN32; NN64 from NN32; ZZ from ZZ32, ZZ64, NN32 and NN64; QQ from ZZ32, ZZ64, NN32, NN64 and ZZ; RR64 from ZZ32, which under walk is also every numeral that fits it (explorations/reviews/mie-probes/price-keep-the-rule.md section 3, remedy (ii)). Nothing else. The integer pairs are the option's own words, \"all exact integer pairs\" (explorations/reviews/flattening-questions-ways.md:586-590); NN32 into RR64, exact but not named by answer 8, stays explicit, and a site that needs it is listed for Pavol. RR32 stays below RR64 as today, a value object with no instantiation of its own (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47; explorations/reviews/mie-probes/keep/flat-tower-sketch.fsi:42), so it needs no coercion. A coercion does not chain (Specification/basic/conversions-coercions.tex:127-130), which is why each pair is listed. A site that relied on another link of today's chain, such as ZZ64, NN64, ZZ, QQ or NN32 reaching RR64, gets an explicit conversion in its text, and each is listed in the report.",
"",
"**What the specification and the library already say.** The compiler prelude is the flat tower the team built (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-108, :147-149, :273-274, :332-334), whose history is in explorations/reviews/flattening-questions-ways.md, \"History, correcting the record's attribution\" (FACTS.md, \"The flattening's three questions\"). The price of this rung was measured on a library copy: 14 declaration headers, the 15 inherited methods the leaves must state (explorations/reviews/mie-probes/price-keep-the-rule.md sections 1, 2 and 6, and keep/flat-tower-sketch.fsi, which says it is an excerpt, not a compilable api). What a user sees is in explorations/reviews/mie-probes/flat-world-for-users.md. The means are the rung's: which declarations take which bodies, where asFloat and the restated methods live, how the rational arithmetic becomes exact.",
"",
"**The test, first.** One new file in ProjectFortress/tests/, the interpreter's corpus, in the form of ProjectFortress/tests/roundBug.fss (a component exporting Executable whose run() asserts), each value checked by value and by run-time class through one helper, as ProjectFortress/tests/IntSemanticsRungI.fss:14-18 does, and each assertion's message citing its source. Captured failing on the base before any library edit; on the nested tower each group below fails:",
"1. The shape: a ZZ32 value is not a ZZ64, ZZ, QQ or RR64 in a typecase, and every leaf is a Number (route A).",
"2. The coercions of the table: x: ZZ64 = 2147483647 then x + 1 is 2147483648, held as a 64-bit integer (row 146); a ZZ32 bound to RR64 holds a float; an integer bound to QQ holds a rational; a ZZ32 and a ZZ64 added give a ZZ64.",
"3. The typed identity, the verdict's three outcomes (explorations/reviews/sum-replacement-verdict.md, \"The one missing measurement\") beside the judgement's section 7, check 1 (explorations/reviews/sum-replacement-judgement.md:395-403): the shape of matOffset(0), a clause-form sum with SUM[\\ZZ32\\] over an empty range in a function declared ZZ32, is 0 held as a ZZ32; bare and clause-form float sums, empty and nonempty, in functions declared RR64, answer a float, with the run-time class printed (a float, not an Int), because on today's tower RR64 membership alone would hide the wrong identity; an empty and a small nonempty generic dot-shaped reduction, written as a generic function over T as Vector.dot is, return their declared element type, the generic body exercised and not only concrete callers; empty products of one typed ZZ32 and RR64.",
"4. The rational arithmetic: (widen(1) LSHIFT 62) < 1/4 and (widen(1) LSHIFT 61)/3 < 5/7 are false (row 428), and +, DOT and / on parts beyond 32 bits give the exact rational, each against the specification's sentence.",
"5. The scalar-to-matrix path (the integration review's fourth check): a small object extending Matrix[\\RR64,2,3\\] over flat storage, in the shape of C4's parameter view (explorations/run-c4/src/FlatArrays.fss:55-64), transposed and multiplied, against the same product on an ordinary matrix, with exactly representable values; an integer-keyed array as a control; and BIG MAX in its bare form over an RR64 array, the shape of the approved BIG MAX z, which today finds no overload (explorations/reviews/flattening-questions-ways/Q1MaxBareWalk.walk.txt, cited by explorations/reviews/sum-replacement-judgement.md section 4).",
"It is not an XXX file, and a file in that directory needs no .test file (FACTS.md, \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\").",
"",
"**The comparison: what changes when the tower flips.** Route A re-measures the outputs of the sites it keeps; nothing is expected to stay byte-identical, and everything that changes is accounted for:",
"1. Every file of ProjectFortress/tests/ except the new test runs under walk in three passes, base A, the edit, base B, one JVM per test with private caches, with rung O's runner and comparison (explorations/compile-ladder/rung-walk-overflow/count-run.sh, count-compare.py; its REPORT.md section 2). Normalised, and nothing else: Java line numbers in a printed stack frame, an object's identity hash, and every Fortress source position in a library file this rung edits, mapped back through the edit's line map (precedent explorations/compile-ladder/rung-library-comments/remap-lines.py), as batch 5 normalised on Pavol's default (POSITIONS.md:157). ProjectFortress/tests/XXXInheritedOverload.fss is listed as unstable, citing row 430.",
"2. Every changed output of a stable file is listed in REPORT.md and as a capture under probes/, each with its cause in the decisions: a coercion now applied, a typed identity, a respelled line, a restated method, an explicit conversion. Every changed exit code likewise.",
"3. The two microGPT checks, explorations/run-c4/src/MicroGptFlatCheck.fss and explorations/apl/mg/MicroGptAplCheck.fss, each from an empty cache at FORTRESS_THREADS=1, before and after the edit, the approved lines applied: 40 of 40 each, with their printed values captured, so that the goldens are measured once with both approved model lines (POSITIONS.md:165).",
"4. Every pass is headed by the machine line (explorations/protocol.md section 6).",
"",
"**The other measurements**, each a capture under probes/ beside its line in REPORT.md:",
"- The capability table (the integration review, sections 2 and 5): for each operation of Vector, Matrix and the scalar-extension block (Library/FortressLibrary.fss:2231-2244, :2539-2602, and the block at the end of the file), the capability its body needs (closed addition, closed multiplication, an identity, an order) against the bound it has. No bound is narrowed to a ring, which would exclude integer arrays (POSITIONS.md:153). The body-level check: the flat library's component bodies through the switch-over distance driver (explorations/perf-probes/prelude/switch-over-distance.md and its scripts), the errors in those declarations listed, not repaired; the repair is the array design's (PLAN.md, phase 5).",
"- Row 388's consequence (FACTS.md, \"An inferred generic refuses a coercion that the method it forwards to accepts\"): with an RR64 matrix and a ZZ32 scalar, m.scale(i) against m i, and the scalar-extension block with an RR64 array and a ZZ32, under walk before and after. A spelling that ran before and is refused after is listed; in a test it falls under Q1; in C4 or the APL program it is a stop.",
"- The checker count, the stage's table before and after (explorations/coordinator/tools/checker-count/run.sh), and the declared total.",
"- Every library site the rung writes differently, with the reason: a static argument written (the eleven of the judgement's section 4 A), an explicit conversion, a restated method.",
"",
"**Files it may touch.** Library/*.fsi and Library/*.fss, for the tower, the coercions, the reductions and the sites, except the compiler's own prelude files there (Library/CompilerLibrary.*, CompilerAlgebra.*, CompilerSystem.*), which take no new declaration before the switch-over (POSITIONS.md:46); ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss; in ProjectFortress/tests/, the eight files whose clause-form sums write a static argument (CoercionCallRungC.fss, CoercionOverloadRungC.fss, CoercionRedispatchRungC.fss, TransactionalArrayShakedown.fss, WordCountSmall.fss, XXXFlatStringSplitRungL.fss, setSum.fss, simpleSum.fss: 25 lines), and under Q1 = (a) Generator2Test.fss, setSum.fss's three SUM[\\Number\\] lines, asifTest.fss and any other test line the flat tower breaks, each listed; the new test; the approved lines of explorations/run-c4/src/ and explorations/apl/mg/ (the judgement's section 4 A lists them), and nothing else there; its own directory. Not: ProjectFortress/library_tests/BigSumRung8.fss, a compiled-path test whose SUM is the compiler prelude's non-generic BIG + (Library/CompilerLibrary.fsi:180-181), which waits for the switch-over; the glue classes Int.java, Long.java, NN32.java and UnsignedLong.java, which are rung O's; Specification/, which is rung T's; scala_src/ and ProjectFortress/compiler_tests/, which are rung R's.",
"",
"**Java or Scala.** None expected: the library and the tests; walk already converts at a parameter, at an overloaded call and at a typed binding (FACTS.md, \"Under walk, the interpreter converts by coercion at its three kinds of type check\"). If the flat tower cannot run without a Java change under interpreter/, the rung makes the smallest one, reports it as a decision with the alternative, and runs ant compileAll before every run after it; the four glue classes above are stops. The interpreter's caches are wiped before every run that reads the edited library.",
"",
"**The checker count.** Predicted about 44, from 125. The switch-over distance worker's flattened copy took the stage from 125 to 44 (FACTS.md, \"The true distance to the switch-over\"), and the keep note's copy took the tree before batch 4 from 103 to 22, of which rung N's 22 fill errors are not among those the flattening removes (FACTS.md, \"The exclusion fork, priced three ways\"). The FortressLibrary api may still stop at its hierarchy stage (explorations/reviews/mie-probes/price-keep-the-rule.md section 5, the excludes Condition[\\()\\] site), so the reductions and most coercions may not show in it. The rung captures the table before and after, declares the total it measured, and declares the crash line if it moves.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict; ProjectFortress/tests/IntSemanticsRungI.fss; WrapOperatorsRungD.fss; the scalar-extension tests ArrayScalarExtension.fss and ArrayOperatorsBesideLibrary.fss; rung C's expected failures (XXXCoercionStaticRungC.fss, XXXCoercionStaticNarrowRungC.fss, and those of rows 387, 388, 389 and 395), each unless the rung's change makes it pass and the rung says why; XXXFixedWidthOverflowRungB.fss, which stays row 379's expected failure, since the natives are unchanged here; the two microGPT checks at 40 of 40.",
"",
"**Stops.**",
"- A gated test whose verdict changes and cannot be restored within these rules. Under Q1 = (a), a team test line that asserts the nesting, or needs a conversion walk does not apply, is respelled keeping the value it checks, with no assertion deleted, and listed; under Q1 = (b), each such line is the stop.",
"- A changed output the rung cannot trace to a cause in the decisions.",
"- A line of C4's model, vocabulary, data or check, or of the APL program, beyond the approved lines: it is shown to Pavol as a diff before it is built (POSITIONS.md:39).",
"- A coercion beyond the table; a bound on Vector or Matrix that excludes integer elements.",
"- An edit to a file named above as another rung's.",
"- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS.md:167).",
"",
"**For the skeptic.** The compiled path runs its own prelude, which is flat already and has no QQ, no generic SUM and no integer-to-float coercion, so a program that answers differently there for those reasons is not a finding; where a differential needs the one library on the compiled path, it is the switch-over's. The checks: the table of coercions against answer 8 and route A, edge by edge; the witness's branch order and each identity's run-time class; the comparison's changed outputs one by one against their stated causes; the respelled test lines against their old values; the drop's completeness (no name of the three operators or their objects left in Library/, the api, the tests or the demos); the capability table; the new test's five groups. The manifest sets writesState: a reduction's identity is joined at each split of a parallel generator, so the thread count decides how many are joined, and every differential of a reduction runs at FORTRESS_THREADS=1 and =4.",
"",
"**What comes back to Pavol.** The changed outputs with their causes; the respelled team-test lines; the explicit conversions written in library bodies; the capability table and the body-level errors; row 388's consequence; the two microGPT checks' result; the count.",
"",
"**What it closes, and the rows it opens.** Closes row 423 (the drop, recorded on the row), row 428 (home 1, the new test's group 4) and row 146 (home 1, group 2). Notes appended: rows 135 and 424 (the static arguments written in the library and the tests), row 426 (the compiled half of the verdict's measurement waits on it, before the switch-over), row 388 (its consequence measured), row 330 (ZZ into RR64 is explicit after the flattening). New rows, numbered provisionally from the manifest's first free row, for what it measures and does not repair, each with its home.",
"",
].join('\n')

const T_TAIL = [
"",
"## Your rung: T - the number chapters",
"",
"SLUG is rung-spec-numbers. WORKTREE is /home/user/fortress-numbers, branch wip/rung-spec-numbers.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.md, section 3, under \"T. The number chapters\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Section 1's question does not change this rung.",
"",
"**The problem.** The specification's three number chapters describe the nested tower and a lattice of sign-refined types. Specification/basic-lib/numbers.tex:36-91 lists eighteen rational types, each \"a subtype of\" others, and Specification/basic-lib/basic-integers.tex:28-67 the same for the integers, with NN \"a synonym for\" ZZ_GE; both say \"The Fortress type system tracks these types closely through various arithmetic operations\" (numbers.tex:93-96); the trait listing of QQ declares seventeen checks throwing CastError, fifteen of them returning a sign-refined type (numbers.tex:228-244), and the integers' listing the same (basic-integers.tex:290 and after); Specification/advanced-lib/numbers-advanced.tex:15-420 defines them all as one trait, RationalQuantity, that extends its own instantiations. Instantiation exclusion, as rung S stated it (Specification/basic/types-vals-vars.tex:218-237), refuses that trait; the compiled checker refuses it as a cyclic hierarchy and walk cannot instantiate it; the library never had any of these types (explorations/reviews/flattening-questions-ways.md, Question 3, sections 2 and 5). Appendix I says the chapters are not yet revised (Specification/appendices/changes.tex, the subsection \"Passages not yet revised\" and the sentence at the rule's entry that the numeric chapters are not yet revised). Batch 6's rung F makes the library flat, so after this batch the chapters would describe a tower neither the library nor the rule has.",
"",
"**The decisions.** The number chapters change in this batch, with the flattening, never earlier (explorations/coordinator/POSITIONS.md:132). Answer 6 (:158): the subtype lists of numbers.tex and basic-integers.tex are rewritten as the library's run-time check methods (check and check_star, returning Maybe); numbers-advanced.tex is kept word for word and marked as a superseded design in the S1 form, \"make sure we clearly record the original design\", with the road back, the sign flags as covariant static parameters (explorations/reviews/flattening-questions-ways.md, Question 3, way 2, the probe Q3Phantom), recorded as future work on worklist item 12 and row 404; no library or compiler work. Route A (:92): the integers inside QQ by coercion, the types siblings under Number. Answer 8 (:159): the coercions as rung F declares them (the table in rung F's section); widens deferred; the promotion rule for mixed widths is written with its implementation in phase 3, and until then a mixed-width generic call writes its static argument (section 5 of the batch record, \"Read from the record\"). Answer 7 (:165): one note in the S1 form at Specification/basic/expressions/reductions.tex:23-25, saying that the desugaring is not type-directed on either implementation, so a clause form whose element type no argument fixes writes its static argument, as the team's tests do, with ledger rows 424 and 425. The form, S1 (:109), as rung S used it: the normative text edited in place, a \\revision callout at each changed passage (the macro rung S defined, Specification/fortress/fortress.tex:87), an Appendix I entry per change with the original text cited as \"the Working Draft of February 2011\" with its path and line in Specification-1.0-frozen/ (:145), and the full reasoning in a decision record in the rung's own directory. The later Types chapter is cited beside where it covers a topic (:110): its \"these types are mutually exclusive\" and its commented-out type aliases (Documentation/Specification/Prose/Language/types.tick:977-981, :1011-1036).",
"",
"**What it writes.** First, before any edit, the list: every passage of Specification/ outside library/apis/ that states the nested tower, a sign-refined type, a subtype relation between number types, or a conversion between number types the flat library does not have, each with its file:line, what the decisions make of it, and whether it is revised now or left, with the reason. The three chapters are the start; the list's scan covers at least Specification/basic/conversions-coercions.tex:60-66 (\"Fortress supports the automatic conversion of integer values to floating-point values\", where after this batch only ZZ32 and numerals convert automatically), Specification/basic/types-vals-vars.tex:536 and Specification/basic/expressions/literals.tex. Then:",
"- In numbers.tex and basic-integers.tex: the subtype lists become the library's number types as siblings under Number, the coercions of rung F's table, and the checks the library declares, check and check_star returning Maybe, on the type that declares them (Library/FortressLibrary.fsi:347-350); the sentences on tracking refined types through arithmetic go; a signature that names a refined type (NN, QQ_GE and their siblings) takes the type the library declares for it, and where the library does not declare the method the unrefined type (ZZ, QQ); the fifteen sign checks of numbers.tex:230-244 and their integer twins leave the listing, and check and check_star are stated as the library states them, wherever the list finds the type that declares them. Every original stays readable in Appendix I, verbatim.",
"- In numbers-advanced.tex: no word of the chapter changes; one callout at its head says that the chapter is a superseded design, why (the rule, the checker's and walk's measurements, the later Types chapter's removal of type aliases), and where its road back is (worklist item 12, row 404, the covariant flags).",
"- In reductions.tex:23-25: answer 7's note.",
"- In conversions-coercions.tex and wherever else the list finds a statement the flat library contradicts: a callout, and the normative sentence edited only where the decisions settle the new text.",
"- In Appendix I (Specification/appendices/changes.tex): one entry per change in rung S's form, and the \"not yet revised\" wording for the number chapters replaced.",
"- One line added to the front-matter paragraph rung S wrote (Specification/fortress/preamble.tex:54-64) only if it names the chapters as deferred; at this review it does not, so no edit there is expected.",
"Each changed example is written in its file's convention (Specification/basic-lib/objects.tex:134-140 is one); an example generated from SpecData/examples/ is reported, not edited.",
"",
"**How it is checked.** No test can go red for a prose edit. The specification is built as rung S built it, with FORTRESS_HOME set to the worktree: ./ant genSource, then ./ant tex, in Specification/fortress/ (Specification/fortress/README:5-14; the build's history and fallbacks are in explorations/coordinator/CLIMB-BATCH-5.md section 3, S, \"How it is checked\"). Required: both targets on the base and after the edit, the four logs captured; the build's PDF copied to Specification/fortress.pdf; pdftotext of the two PDFs diffed, showing only the revised passages, the callouts, the appendix entries and page shifts; git diff --stat showing only the listed .tex files and the PDF. Part IV of the PDF is rendered from the library's .fsi files, which rung F changes, so the gather rebuilds the PDF on the merged tree (section 4); this rung's own build renders the base's api and says so.",
"",
"**Files it may touch.** Under Specification/, not Specification-1.0-frozen/: basic-lib/numbers.tex, basic-lib/basic-integers.tex, advanced-lib/numbers-advanced.tex (its head callout only), basic/expressions/reductions.tex, basic/conversions-coercions.tex, appendices/changes.tex, fortress/preamble.tex, whatever else its list finds, and Specification/fortress.pdf; its own directory. No source, library or test file.",
"",
"**Java or Scala.** Neither.",
"",
"**The checker count.** 125, unchanged by this rung: the stage reads the compiled checker and Library/, and this rung touches neither.",
"",
"**Stops.** Any edit under Specification-1.0-frozen/. A changed word in the body of numbers-advanced.tex. New normative text for a construct neither path runs: the promotion rule for mixed widths (phase 3), a sign check the library does not declare, widens. An edit to Specification/basic/overloading.tex (the sentence answer 9 revises in phase 3) or to the arrays figure (Specification/advanced/parallelism-locality/arrays-distributed.tex, with tabulate in phase 3). A passage whose new text neither the decisions nor rung F's table settle: the rung reports it and does not choose. The build changing a tracked file other than Specification/fortress.pdf.",
"",
"**For the skeptic.** There is no program to run both ways. The checks: the list against the specification (every passage it should hold is on it, and nothing else is edited); every quoted original against git show <base>:<path> and against the frozen copy's line; the two builds and the pdftotext diff; each statement of a coercion, a type relation or a check method against the decisions and against rung F's section of this record, since rung F's landed library is checked against it only at the gather.",
"",
"**What comes back to Pavol.** The revised pages, as the pdftotext diff and the PDF; the Appendix I entries; the list, with what was left and why.",
"",
"**What it closes.** No ledger row. Notes appended: row 404 and worklist item 12, that the superseded chapter's callout points to them; rows 424 and 425, that reductions.tex carries the note.",
"",
].join('\n')

const R_TAIL = [
"",
"## Your rung: R - an unknown size in an overload set",
"",
"SLUG is rung-unknown-size-arm. WORKTREE is /home/user/fortress-arm, branch wip/rung-unknown-size-arm.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.md, section 3, under \"R. An unknown size in an overload set\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Section 1's question does not change this rung.",
"",
"**The problem.** Since batch 4's rung N the compiled checker refuses a call that leaves a size unknown, \"Could not infer static argument ... without context\" (FACTS.md, \"The compiled type checker checks nat and int static parameters\"). In an overload set it does not: with ee[\\nat n\\](x: ZZ32): ZZ32 = 1 beside ee(x: Any): ZZ32 = 2, the call ee(z) for z: ZZ32 drops the sized overload from static resolution and type-checks against the other, while run-time dispatch still chooses the sized one; with the sized body = n the checker accepts and the compiled run dies with NoClassDefFoundError: SkDeadVal$n (row 400; explorations/compile-ladder/rung-nat-checker/probes/skeptic/dead-arms.txt:44-95). The specification makes the sized overload applicable and the most specific (Specification/basic/overloading.tex:170-175), and a size a value that a body can read (Specification/basic/trait-parameters.tex:82-86).",
"",
"**The decisions.** Answer 12 (explorations/coordinator/POSITIONS.md:162): \"A size the call cannot fix is an error at that call. It reaches into overload sets: when the arm the rules would pick has a size the call cannot fix, the call is refused with the same 'could not infer' error instead of the arm being dropped, which closes row 400. It is one small checker rung with two expected-failure tests.\" The reasoning is explorations/reviews/overloading-judgement.md section 5. Walk keeps running an unused unknown size until the library's 25 dead sizes are gone (the same note, section 10, item 5), so walk is not this rung's.",
"",
"**The evidence on file.** By reading, the drop is in STypesUtil.isDynamicallyApplicable (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1101-1132, the condition at :1125-1129), and the no-context error is reported at ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:244-251 (explorations/reviews/overloading-judgement.md section 5.2, option 1). The shapes are rung N's skeptic probes SkDeadTop and SkDeadVal (explorations/compile-ladder/rung-nat-checker/probes/skeptic/). Where the edit goes is the rung's.",
"",
"**The test, first.** In ProjectFortress/compiler_tests/, two expected-failure compile tests on the shapes of SkDeadTop and SkDeadVal, each an XXX-named .test file driving compile and pinned by compile_err_contains on the no-context error; today each compiles, so the harness reports the missing expected failure, and that capture is the recorded failure. And the two expected-failure walk tests rows 416 and 418 owe (explorations/coordinator/PLAN.md:48), each an XXX*.fss in ProjectFortress/tests/ asserting what the specification says: for row 416, g(b: Tg[\\3\\]) beside g(b: Tg[\\4\\]) is a valid overloading and dispatches on the size (instantiation exclusion, Specification/basic/types-vals-vars.tex:218-237); for row 418, a nat argument of 4294967296 reads back as 4294967296 (Specification/basic/trait-parameters.tex:84-85). Each is captured failing as expected today; the harness mechanics are in FACTS.md, \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\". The first XXX compile test is shown red by its pre-edit run, which is the prefix's demonstration.",
"",
"**The measurements.** The checker count before and after; the rung's two tests before and after; the 85 files of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt under the subset driver, phase and stdout, before and after, since the change is in the checker every compiled program meets; the compiler tests nearest the edit, rung N's and rung Z's (NatInferredChecker, NatWrittenChecker, NatMethodChecker, NatExportChecker, the NatRt* tests and the expected failures beside them), before and after.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/scala_src/ (the checker files the fix needs, each named in the report); new files under ProjectFortress/compiler_tests/; two new XXX*.fss files in ProjectFortress/tests/; its own directory. Stops: ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java (the checker-count tool keeps a copy checked against its checksum, explorations/coordinator/tools/checker-count/run.sh:36, and an edit makes the stage's #shadow row stale, which is red); Library/, ProjectFortress/LibraryBuiltin/, interpreter/ and Specification/.",
"",
"**Java or Scala.** Scala. ant compileAll, then the library-order cache rebuild before any compiled test.",
"",
"**The checker count.** Predicted 125, unchanged: the stage checks the library's declarations, and this rung changes how a call is resolved. The rung captures the table before and after and declares the total it measured; a change of the crash row is declared.",
"",
"**What must stay green, or keep its verdict.** Every compiler test, the tests named under \"The measurements\" among them; a verdict that changes is reported with its reason and is a stop unless it is the rung's own two tests.",
"",
"**Stops.** The stop files above. A library declaration newly refused. A compiled test's verdict changing other than the rung's own. A ladder file moving down. A walk edit. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS.md:167).",
"",
"**For the skeptic.** The differential is walk against the compiled run on the refused shapes: walk still runs SkDeadTop and prints 1 (row 400's walk half, left by the decision), and the compiled checker now refuses it; a set whose sized overload is not the one the rules pick must still compile and run as before; a call that writes the size (ev[\\5\\](z)) must still compile.",
"",
"**What comes back to Pavol.** The two refusals' messages; any compiled test or ladder file that moved.",
"",
"**What it closes.** Row 400's compiled half, with a note that walk's half waits on the dead sizes (the judgement's section 10, item 5). Notes on rows 416 and 418: home 2 written.",
"",
].join('\n')

const O_TAIL = [
"",
"## Your rung: O - the natives raise IntegerOverflow",
"",
"SLUG is rung-overflow-natives. WORKTREE is /home/user/fortress-overflow, branch wip/rung-overflow-natives.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.md, section 3, under \"O. The natives raise IntegerOverflow\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Placement: " + (O_BESIDE_F ? 'beside F.' : 'follow-up.') + " (Section 1 of the batch record, \"Read from the record\": this rung is the one rung of a follow-up run cut from the tree batch 6 landed, where rung F has repaired the rational arithmetic. If Pavol puts it beside rung F instead, the coordinator writes \"beside F\" here, and the text marked \"if beside F\" applies.)",
"",
"**The problem.** Under walk, +, -, unary -, |..|, DIV and multiplication on ZZ32 and ZZ64 keep the low bits of a result that does not fit (row 379), where the specification says \"For integer results, overflow throws an IntegerOverflow\" (Specification/basic/operators/opr-overview.tex:154-155, :195-196), and the unsigned NN32 and NN64 do the same. The natives: Negate, Add, Sub, Mul and Div of ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:98-126 and Long.java:112-140, and Negate, Add, Sub and Mul of NN32.java:103-125 and UnsignedLong.java:104-126. Batch 4's rung O stopped on eleven tests that relied on wrapping (explorations/compile-ladder/rung-walk-overflow/REPORT.md section 1). Rung D, landed as a follow-up to batch 5 at ab914b6e0, declared the specification's wrapping operators DOTPLUS, DOTMINUS and DOTTIMES and respelled the code that meant to wrap; its logging pass after its edit met an overflow only in ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss (by design), in ReflectiveQuickCheckTest.fss through the rational comparison (row 428) and in the demo ProjectFortress/demos/HeapShakedown.fss (row 427) (explorations/compile-ladder/rung-wrap-operators/REPORT.md:23). As a follow-up it starts from the tree where rung F has made the rational arithmetic exact.",
"",
"**The decisions.** Walk follows the specification; the natives get the overflow check; the expected-failure test becomes a plain gated test; the count of changed interpreter tests is measured and expected at zero (explorations/coordinator/POSITIONS.md:88, :108); the unsigned natives, add, subtract, multiply and negate at both widths, are checked beside the ten (:149). The signed half's shape is batch 4's explorations/compile-ladder/rung-walk-overflow/natives.patch, raising the catchable IntegerOverflow of rung I (FACTS.md, \"Under walk, a native can raise a Fortress exception that a Fortress catch sees\"). The wrapping natives rung D added (Wrapping* in the same four files) are unchanged. An output difference that the untouched tree already shows from run to run, with the verdict unchanged, is a ledger row and not a stop (:167).",
"",
"**The test, first.** git mv of ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss to FixedWidthOverflowRungB.fss, the component renamed and its comment line re-pointed, with assertions added for NN32 and NN64 (the maximum plus 1, 0 minus 1, the negation of a positive value, and a product beyond the width each raise IntegerOverflow, citing :149 and the specification's sentence); and in ProjectFortress/tests/intPrim.fss and longPrim.fss, the assertions that a.minimum - 1 and a.maximum + 1 raise (explorations/coordinator/CLIMB-BATCH-5.md section 3, D, \"What it rewrites\"). Captured failing before the edit, where walk wraps.",
"",
"**The comparison.** As rung D's (explorations/coordinator/CLIMB-BATCH-5.md section 3, D, \"No output changes: the comparison\"): every file of ProjectFortress/tests/ except the renamed test, three passes base A, the edit, base B, with the normalisation rung F's section names and XXXInheritedOverload.fss listed as unstable (row 430); then the logging pass, the eighteen natives each printing where it meets an overflow and still wrapping (explorations/compile-ladder/rung-wrap-operators/probes/overflow-probe.patch), as a classpath shadow over ProjectFortress/tests/, ProjectFortress/demos/*.fss and the two microGPT checks, on the base and after the edit. Expected: zero changed tests, and no overflow met except in the renamed test. If beside F: ReflectiveQuickCheckTest.fss may change on this branch on the runs whose random data reach the rational comparison; a change whose every logged overflow is in QQ's operators (Library/FortressLibrary.fss:537-577) is listed as rung F's (row 428) and is not this rung's stop, and any other change is.",
"",
"**The demo.** ProjectFortress/demos/HeapShakedown.fss's spread (:114-118) is respelled ((c1 DOTTIMES n) DOTPLUS c2, n), as rung D respelled ProjectFortress/tests/HeapTest.fss:98: the decision of POSITIONS.md:108 applied to a demo of the team's, the fix row 427 names; the demos run in no gated suite (explorations/coordinator/map/test-coverage.md:26).",
"",
"**Files it may touch.** interpreter/glue/prim/Int.java, Long.java, NN32.java and UnsignedLong.java (the existing Negate, Add, Sub and Mul classes, and Div in Int.java and Long.java, only); the renamed test; intPrim.fss and longPrim.fss; ProjectFortress/demos/HeapShakedown.fss; its own directory.",
"",
"**Java or Scala.** Java. ant compileAll before the test can pass, and default_repository/caches/global.map restored after it (FACTS.md, \"ant compileAll deletes a tracked file\").",
"",
"**The checker count.** Unchanged from the last landed table: the stage reads neither the glue classes nor the tests. The rung captures it before and after.",
"",
"**What must stay green.** Every interpreter test's verdict; WrapOperatorsRungD.fss; IntSemanticsRungI.fss; UnsignedTest.fss; the two microGPT checks, which the logging pass shows meet no overflow.",
"",
"**Stops.** Any changed interpreter output or exit code that the normalisation, the run-to-run rule or, if beside F, the attribution to rung F does not account for. A library body found to rely on wrapping: the library is not this rung's, and the site is reported, as batch 4's rung O reported its four. A site whose value would change. An edit to any file not named above. A line of C4 or of the APL program.",
"",
"**For the skeptic.** The compiled path throws on these operations already (FACTS.md, \"The compiled path's integer rules\"), so the differential is each native at its bounds under walk against the compiled run, at both signed and both unsigned widths; a raised IntegerOverflow caught by a Fortress catch; the renamed test's verdict; the logging pass's site list before and after, line by line.",
"",
"**What comes back to Pavol.** The count with its list; the logging pass before and after the edit.",
"",
"**What it closes.** Row 379 (fixed) and row 427 (the demo respelled). Notes: row 403, that the natives now raise.",
"",
].join('\n')

const F_ENTRY = { id: 'F', slug: 'rung-flat-tower', path: '/home/user/fortress-flat', branch: 'wip/rung-flat-tower', tail: F_TAIL, expectedMinutes: 300, writesState: true, testIsStage: false, expectedCheckerCount: 44,
    blurb: "route A's flattening of the one library's number tower: the number types siblings under Number with their own algebra, answer 8's coercions, SUM and PROD as answer 7's typed reductions, the three Number-typed big operators dropped, the rational arithmetic exact (row 428), 25 approved team-test lines and the approved microGPT lines respelled; library and tests, no Java. writesState, because a reduction's identity is joined at each split of a parallel generator.",
    expectedMoves: [] }

const T_ENTRY = { id: 'T', slug: 'rung-spec-numbers', path: '/home/user/fortress-numbers', branch: 'wip/rung-spec-numbers', tail: T_TAIL, expectedMinutes: 120, writesState: false, testIsStage: false, expectedCheckerCount: 125, landsOnlyWith: ['F'],
    blurb: "the specification's three number chapters revised to the flat library (answer 6) in rung S's layered form, the superseded advanced chapter kept word for word, answer 7's note in the reductions chapter; an original-tree edit, Specification-1.0-frozen/ untouched, Specification/fortress.pdf re-rendered. No source and no test.",
    expectedMoves: [] }

const R_ENTRY = { id: 'R', slug: 'rung-unknown-size-arm', path: '/home/user/fortress-arm', branch: 'wip/rung-unknown-size-arm', tail: R_TAIL, expectedMinutes: 90, writesState: false, testIsStage: false, expectedCheckerCount: 125,
    blurb: "the compiled checker refuses a call whose chosen overload has a size the call cannot fix (answer 12, row 400), with two expected-failure compile tests, and the expected-failure walk tests rows 416 and 418 owe; Scala under scala_src/.",
    expectedMoves: [] }

const O_ENTRY = { id: 'O', slug: 'rung-overflow-natives', path: '/home/user/fortress-overflow', branch: 'wip/rung-overflow-natives', tail: O_TAIL, expectedMinutes: 150, writesState: false, testIsStage: false, landsOnlyWith: FOLLOWUP ? [] : ['F'],
    blurb: "the ten signed and eight unsigned arithmetic natives of the interpreter raise IntegerOverflow (row 379), row 379's expected failure promoted to a plain test, the demo HeapShakedown respelled (row 427); Java, four glue classes.",
    expectedMoves: [] }

const RUNGS = FOLLOWUP ? [O_ENTRY] : (O_BESIDE_F ? [F_ENTRY, T_ENTRY, R_ENTRY, O_ENTRY] : [F_ENTRY, T_ENTRY, R_ENTRY])
const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)

const INTRO_RUNG = {
  F: "F flattens the number tower of the one library (route A): ZZ32, ZZ64, NN32, NN64, ZZ, QQ and RR64 siblings under Number, each with its own algebra, a wider type converting a narrower one by coerce as answer 8 and the record's table give, Number's catch-all declarations removed, SUM and PROD replaced by answer 7's typed reductions, BIG MAXN, BIG MINN and BIG MINMAXN dropped, the rational arithmetic made exact (row 428), and the approved lines of the two microGPT programs changed.",
  T: "T revises the specification's three number chapters to the flat library (answer 6), with answer 7's note in the reductions chapter, in rung S's layered form.",
  R: "R makes the compiled checker refuse a call whose chosen overload has a size the call cannot fix (answer 12, row 400), and writes the expected-failure walk tests rows 416 and 418 owe.",
  O: "O makes the ten signed and the eight unsigned arithmetic natives of the interpreter raise IntegerOverflow (row 379) and respells the demo HeapShakedown (row 427).",
}
const INTRO_STOPS = {
  F: "for F, under Q1 = (b) a team test line beyond the approved ones that the flat tower breaks, a line of C4's model, vocabulary, data or check or of the APL program beyond the approved lines (shown to him as a diff first), a coercion beyond the record's table, and a bound on Vector or Matrix that excludes integer elements",
  T: "for T, any edit under Specification-1.0-frozen/, a changed word in the body of numbers-advanced.tex, and new normative text for a construct neither path runs",
  R: "for R, an edit to compiler/StaticChecker.java (the checker-count tool's copy) and any walk edit",
  O: "for O, a changed interpreter output or exit code its comparison does not account for, and a library body found to rely on wrapping",
}
const INTRO_LIFTED = {
  F: "F changes declared types of the one library and removes Number's catch-all declarations and the three Number-typed big operators (route A, answers 7 and 8, the drop of the three operators), and restates 25 lines of the team's tests (answer 7) and, under Q1 = (a), the further lines the record's section 1 names",
  O: "O restates assertions of the team's intPrim and longPrim tests and renames row 379's expected failure into a plain test (the decisions on rung O)",
}
const OVERLAP_RUNG = {
  F: "F edits Library/*.fsi and *.fss except the compiler's own prelude files there, ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, eight team tests in ProjectFortress/tests/ whose clause-form sums write a static argument and, under Q1 = (a), the further test lines section 1 names, adds one test there, and changes the approved lines of explorations/run-c4/src/ and explorations/apl/mg/.",
  T: "T edits Specification/ (never Specification-1.0-frozen/) and re-renders Specification/fortress.pdf.",
  R: "R edits checker files under ProjectFortress/src/com/sun/fortress/scala_src/, adds tests in ProjectFortress/compiler_tests/ and two XXX walk tests in ProjectFortress/tests/.",
  O: "O edits the arithmetic natives of interpreter/glue/prim/Int.java, Long.java, NN32.java and UnsignedLong.java, renames ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss, adds assertions to intPrim.fss and longPrim.fss, and respells ProjectFortress/demos/HeapShakedown.fss.",
}

const BATCH_INTRO = [
  FOLLOWUP ? "This run is the follow-up of climb batch 6: one rung, cut from the tree batch 6 landed, where the number tower is flat and the rational arithmetic exact (the record's section 1, Read from the record)." : "This batch builds the plan's phase 2 as Pavol decided it on 2026-09-24 and 2026-09-26: route A's flattening of the number tower of the one library, the specification's number chapters with it, and one small checker rung.",
  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),
  "Each rung's section of the record opens with the answers of its section 1 that it follows.",
  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file another rung of this run owns.',
  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "A stop that a rung meets and that is not lifted holds the commit stage's push, as batch 4's and batch 5's landings held it.",
  HAS_RUNG('T') ? "The gather's rules: T lands only if F lands, whatever the approved list says: when F is not approved, the gather moves T to the not-landed list with that reason, folds its findings as for any rung that did not land, and applies no file of T; after F and T are applied, the gather checks every coercion, type relation, check method and signature T's chapters state against the landed Library/*.fsi, fixes T's text where the decisions settle a mismatch and reports any other to the review as blocking, then rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf) and removes the build's ignored products." : '',
  (HAS_RUNG('O') && HAS_RUNG('F')) ? "O lands only if F lands." : '',
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5, 4 and 5.",
  "Cite a FACTS.md entry by its bold title beside its line, since the gather's own insertions move lines.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md section 6).",
].filter(Boolean).join(' ')
const BATCH_OVERLAPS = FOLLOWUP
  ? OVERLAP_RUNG.O + " One rung, so nothing is shared; the renamed test keeps the testSystem count. The files it reaches beyond its own are the three record files, folded centrally by the gather."
  : RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + "No file is shared; the one shared directory is ProjectFortress/tests/, where the rungs touch disjoint files, and a file added there moves the testSystem shards, which the gate compares by their sum. The checker count reads F's library through R's checker on the merged tree; by reading the two do not combine, and the review ties each moved row to a rung edit. The files every rung reaches are the three record files, folded centrally by the gather."
// =========================== END MANIFEST ==================================

// ===========================================================================
// BATCH_1_EXAMPLE - batch 1's manifest, verbatim, kept as the worked example of
// what the block above must hold (its four tails and four rung entries; the
// record is explorations/coordinator/CLIMB-BATCH-1.md). The script does not
// read it. It sits outside the MANIFEST markers on purpose, so that replacing
// the block for the next batch leaves it in place.
// ===========================================================================

const B1_F_TAIL = [
"",
"## Your rung: F - the functional methods of trait RR64",
"",
"SLUG is rung-rr64-functions. WORKTREE is /home/user/fortress-rr64, branch wip/rung-rr64-functions.",
"",
"The problem (the batch record, section F): the target program calls exp and log on RR64 - exp(z - (BIG MAX[t <- z] t)) in the softmax at explorations/apl/mg/MicroGptApl.fss:42 and explorations/run-c4/src/MicroGptFlat.fss:28, log(pick(pr, tg)) in the loss at MicroGptFlat.fss:61 - and passes exp and log as function values to Array.map at explorations/apl/mg/FlatArrays2.fss:44-45; it calls round three times. The compiler prelude has none of exp, log, sin, cos, tan, asin, acos, atan, atan2, round, truncate, and has ceiling and floor commented out at ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:439-440. On the ladder, buffons.fss stops on ceiling/floor, roundBug.fss on round/truncate, juxtTwice.fss and oprTests.fss on the transcendentals.",
"",
"Add all thirteen as functional methods of trait RR64 - declared with an explicit self, so that exp(x) and the bare name exp both work - in CompilerBuiltin.fsi and .fss. The shape to copy is opr SQRT(self): RR64 = jDoubleSQRT(self) at CompilerBuiltin.fss:900, with its native bound in the import java block at .fss:205-214. floor and ceiling need no native: doubleFloor and doubleCeiling are already bound at .fss:212-213.",
"",
"The specification. Specification/basic-lib/numbers.tex:464-476 defines floor, ceiling, round and truncate on QQ, returning ZZ, with an exact half going to the EVEN integer. Read those lines yourself. No prose chapter names exp, log or a trigonometric function; for those the specification is silent and the precedent governs.",
"",
"The precedent is the interpreter: Library/FortressLibrary.fsi:319-332 and ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162-190. Two deviations to argue and record: the specification's QQ methods return ZZ where the interpreter's RR64 versions return RR64 or ZZ64; and Java's Math.round rounds a half UP, so a round built on it violates numbers.tex:470-472 - use Math.rint or argue why not, and put the half-way cases in your test.",
"",
"The natives go in ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java or in a new file beside it; argue the choice in one line. Your edit is in .java, so ant compileAll is required before your test can pass, then the full five-component library rebuild.",
"",
"The test goes in ProjectFortress/library_tests/: every one of the thirteen, including exp(0) = 1, log(exp(1)) within an epsilon of 1, atan2 in each quadrant, round(2.5) = 2 and round(3.5) = 4 and round(-2.5) = -2, truncate(-2.7) = -2, floor(-2.5) = -3, and exp passed as a function value. Your ladder subset: buffons, roundBug, juxtTwice, oprTests, realArith, testRR32, before and after.",
"",
].join('\n')

const B1_M_TAIL = [
"",
"## Your rung: M - Maybe, Just and Nothing for the compiler world",
"",
"SLUG is rung-maybe. WORKTREE is /home/user/fortress-maybe, branch wip/rung-maybe.",
"",
"The problem (the batch record, section M): 59 of the 139 interpreter tests stopped at the disambiguate wall name Maybe, Just or Nothing, more than any other name, and the compiler world declares none of them. The target program does not name it; the rung is here for what it unblocks.",
"",
"The specification's prose uses the type as a given and settles one thing: Specification/basic/exceptions.tex:62-69 declares settable message: Maybe[\\String\\] on Exception, and :114-117 write the defaults as = Nothing - an unparameterised Nothing where a Maybe[\\String\\] is expected. Read those lines.",
"",
"Two precedents, and they disagree. The interpreter: value trait Maybe[\\T\\] at Library/FortressLibrary.fss:1306, value object Just[\\T\\](x:T) at :1312, value object Nothing[\\T\\] at :1342. The team's own draft for THIS world, commented out at Library/CompilerLibrary.fsi:217-229: Maybe[\\T\\] comprises { Just[\\T\\], NothingObject[\\T\\] } with coerce(x: Nothing) - which is what makes the specification's = Nothing type-check, because the compiler path has coercion and the interpreter does not. The compiler world already implements the protocol under other names: Option, Some, None, NoneObject at CompilerBuiltin.fsi:648-660.",
"",
"The decision is yours and it must be argued: the team's draft or the corpus. Both cannot coexist. Do NOT delete or rename Option, Some, NoneObject or None: removing a declaration a gated test uses is a reserved stop.",
"",
"The test goes in ProjectFortress/library_tests/: construct both cases, dispatch on them, get and its default form, a for over a Maybe, and - if you take the draft - a binding written as = Nothing at a Maybe type, coerced. Your ladder subset: ExceptionScoping.fss and oddJuxt.fss, before and after.",
"",
].join('\n')

const B1_N_TAIL = [
"",
"## Your rung: N - the named integral operators on ZZ32 and ZZ64",
"",
"SLUG is rung-integral-ops. WORKTREE is /home/user/fortress-ints, branch wip/rung-integral-ops.",
"",
"The problem (the batch record, section N): the target program uses MOD 32 times on ZZ32 indices, and the compiler prelude has no MOD, REM, GCD, LCM, LSHIFT or RSHIFT on ZZ32 (CompilerBuiltin.fsi:202-256) or ZZ64 (:147-201). On the ladder chain0.fss (GCD, LCM, MOD) and rshiftbug.fss (RSHIFT) stop on nothing else.",
"",
"The specification: Specification/basic-lib/basic-integers.tex:439-456. REM is the remainder of the truncating division; MOD is the remainder of floor division, and both throw IntegerDivisionByZero; GCD and LCM at :247-248. Read those lines yourself. So MOD is NOT Java's %, which is REM: (-7) MOD 3 is 2 and (-7) REM 3 is -1. Put every sign combination in your test.",
"",
"The precedent: the interpreter declares the six in trait Integral[\\I\\] at Library/FortressLibrary.fss:622-636. The compiler world has no native for any of them and needs none. Pure Fortress inside the compiler world's flat design; do not introduce Integral or touch the tower. Division by zero: what DIV does today on the compiled path is the precedent; establish it with a probe and record it.",
"",
"The test goes in ProjectFortress/library_tests/: every operator, every sign combination for MOD and REM, GCD and LCM on the identity GCD(a, b) LCM(a, b) = |a b|, the shifts against << and >>, and a ZZ64 case beyond ZZ32. Your ladder subset: chain0.fss and rshiftbug.fss, before and after.",
"",
].join('\n')

const B1_T_TAIL = [
"",
"## Your rung: T - recordTime and printTime",
"",
"SLUG is rung-timing. WORKTREE is /home/user/fortress-time, branch wip/rung-timing.",
"",
"The problem (the batch record, section T): nestedTransactions1.fss, nestedTransactions2.fss and nestedTransactions4.fss in ProjectFortress/tests/ name recordTime and printTime and nothing else at the disambiguate wall, so they are the ladder's likeliest passes.",
"",
"The specification is silent: no prose chapter names recordTime, printTime or nanoTime. Precedent governs; your spec: line is none with that grep.",
"",
"The precedent: Library/FortressLibrary.fss:4109-4118 - nanoTime(): ZZ64, a top-level mutable __globalTimeInformation: ZZ64 := 0, recordTime and printTime. The compiler world's nanoTime(): RR64 is declared at CompilerBuiltin.fsi:23; the type is RR64 where the interpreter's is ZZ64, a deviation you record, not one you repair.",
"",
"The top-level mutable variable now lives in a transactional cell, and yours is the first library use of it. Two facts from the repair batch bear on you: a top-level variable exported through an api does not link (ledger row 320), so the variable must NOT be exported through CompilerLibrary.fsi; and the three nestedTransactions files call recordTime and printTime around atomic blocks.",
"",
"The test goes in ProjectFortress/library_tests/: recordTime(0), work that takes measurable time, printTime(0), and PASS; and one call pair around an atomic block. Your ladder subset: the three nestedTransactions files, before and after.",
"",
].join('\n')

const BATCH_1_EXAMPLE = {
  BATCH: 1,
  BATCH_RECORD: 'explorations/coordinator/CLIMB-BATCH-1.md',
  BATCH_INTRO: 'This batch is the first ordinary batch of the ladder after the repair batch of 2026-09-19: four library rungs, chosen by what the target program (microGPT compiled to bytecode) names and by what the ladder blocks on.',
  BATCH_OVERLAPS: 'F and N both edit CompilerBuiltin.fsi and .fss in different traits (RR64; ZZ32 and ZZ64); M may edit either prelude file; T edits CompilerLibrary.',
  LEDGER_FROM: 329,   // the first free ledger row number when the batch was planned
  RUNGS: [
  { id: 'F', slug: 'rung-rr64-functions', path: '/home/user/fortress-rr64',  branch: 'wip/rung-rr64-functions', tail: B1_F_TAIL, expectedMinutes: 45, writesState: false,
    blurb: 'the functional methods of trait RR64 the program and the ladder need - exp, log, sin, cos, tan, asin, acos, atan, atan2, floor, ceiling, round, truncate. The only rung of this batch that touches .java (a native helper under nativeHelpers/).',
    expectedMoves: ['tests/buffons.fss: typecheck or better', 'tests/roundBug.fss: typecheck or better', 'tests/juxtTwice.fss: typecheck or better', 'tests/oprTests.fss: typecheck or better'] },
  { id: 'M', slug: 'rung-maybe',          path: '/home/user/fortress-maybe', branch: 'wip/rung-maybe',          tail: B1_M_TAIL, expectedMinutes: 40, writesState: false,
    blurb: 'Maybe, Just and Nothing for the compiler world, over the Option machinery it already has. Library only; carries a naming decision.',
    expectedMoves: ['tests/ExceptionScoping.fss: typecheck or better', 'tests/oddJuxt.fss: typecheck or better'] },
  { id: 'N', slug: 'rung-integral-ops',   path: '/home/user/fortress-ints',  branch: 'wip/rung-integral-ops',   tail: B1_N_TAIL, expectedMinutes: 45, writesState: false,
    blurb: 'the named integral operators MOD, REM, GCD, LCM, LSHIFT, RSHIFT on ZZ32 and ZZ64. Library only, pure Fortress.',
    expectedMoves: ['tests/chain0.fss: pass', 'tests/rshiftbug.fss: codegen or better'] },
  { id: 'T', slug: 'rung-timing',         path: '/home/user/fortress-time',  branch: 'wip/rung-timing',         tail: B1_T_TAIL, expectedMinutes: 40, writesState: true,
    blurb: 'recordTime and printTime over the existing nanoTime and a top-level mutable variable. Library only.',
    expectedMoves: ['tests/nestedTransactions1.fss: pass', 'tests/nestedTransactions2.fss: pass', 'tests/nestedTransactions4.fss: pass'] },
  ],
}

const BATCH_DIR = 'explorations/compile-ladder/climb-batch-' + BATCH
const GATE_DIR = BATCH_DIR + '/gate'
const LOG_DIR = 'tmp/gate-batch-' + BATCH          // untracked: .gitignore:64 ignores /tmp/, and .gitignore:42,46 would swallow .out/.log anywhere
const GATE_OUT = LOG_DIR + '/out'   // the gate writes here during the run, untracked; the commit stage copies it to GATE_DIR, so a run that stops before that stage leaves nothing untracked in the tree (climb-batch-3-redesign.md, f2; Pavol, 2026-09-24)

// The scatter order: longest expected worker first. The manifest order is kept
// for ledger numbering and for the gather, which never uses this one.
const SCATTER = RUNGS.slice().sort((a, b) => (b.expectedMinutes || 0) - (a.expectedMinutes || 0))

// ---------------------------------------------------------------------------
// The shared prefix. batched-climb-plan.md section 8: every agent in a batch
// opens with the same block, byte-identical and in the same order. No backticks
// anywhere in these strings; code is indented instead.
// ---------------------------------------------------------------------------

const PREFIX = [
"# Fortress climb batch " + BATCH + " - shared prefix",
"",
"You are an agent in the Fortress revival's compile-path climb (@palimondo's revival of Sun's Fortress programming language). " + BATCH_INTRO + " Read " + BATCH_RECORD + " in your worktree first: it is the decision record this brief executes, and it names all the rungs and why they were chosen.",
"",
"## The batch manifest",
"",
RUNGS.length + ' rungs, each in its own worktree on its own branch, two running at a time, gated once together after the merge:',
"",
RUNGS.map(r => '- ' + r.id + ', slug ' + r.slug + ', worktree ' + r.path + ', branch ' + r.branch + ': ' + r.blurb).join('\n'),
"",
'All branches are off ' + BASE + ' on main. ' + BATCH_OVERLAPS + ' Batch rule 1 - no two rungs add or change the same declaration, trait body or operator - is what keeps the merge clean; the merge is the coordinator\'s, not yours.',
'',
'## Your worktree',
'',
'Work ONLY in the worktree your tail names. The other rungs are running at the same time in their own worktrees; never read or write outside your own. Never touch /home/user/fortress, which is the main tree.',
'',
'Set up every shell (substitute your worktree path for WORKTREE):',
'',
'    cd WORKTREE',
'    source explorations/experiment/env.sh',
'    export TMPDIR=WORKTREE/tmp',
'    export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=WORKTREE/tmp"',
'',
'env.sh sets FORTRESS_HOME from its own location, so check that echo $FORTRESS_HOME prints your worktree and not /home/user/fortress. It also runs rm -rf /tmp/fortress*rats; source it once per shell and never mid-run, because the other agent\'s Rats! temp directories live there too. The JDK is at /usr/lib/jvm/java-25-openjdk-amd64 and the box has 4 cores; do not spend a call probing for either.',
'',
'ProjectFortress/build has been copied in so javac is incremental, but ant compileAll\'s scalac step has no uptodate guard (build.xml:547-568) and is a full rebuild wherever it runs; budget for that. Your default_repository/caches/ starts empty and cannot be warmed from the main tree, because the analysed-cache key hashes the source path (NamingCzar.deCaseName, compiler/NamingCzar.java:243-245). So after ant compileAll you must rebuild the bytecode cache in library order:',
'',
'    cd ProjectFortress',
'    ../bin/fortress compile LibraryBuiltin/AnyType.fss',
'    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss',
'    ../bin/fortress compile ../Library/CompilerLibrary.fss',
'    ../bin/fortress compile ../Library/CompilerAlgebra.fss',
'    ../bin/fortress compile ../Library/CompilerSystem.fss',
'',
'about 145 s cold: AnyType 21, CompilerBuiltin 104, CompilerLibrary 17, CompilerAlgebra 2, CompilerSystem 1. Two operational traps measured in rung 7: a fortress compile whose source has not changed writes nothing and exits 0; and a change to a native helper\'s signature leaves a stale class in default_repository/caches/nativewrapper_cache that must be deleted or the old signature is what the run links against.',
'',
'## Long commands: run them in the background and poll, and never pipe ant through tail',
'',
'The Bash tool has a 10-minute ceiling and ant testFast is longer than that. Never pipe ant (or any long command) through tail: the summary you need is at the end and you will have to re-run to see it, which cost 21.7 minutes of the last climb. Capture the full output to a file and grep the file. Use these two helpers rather than inventing a sleep loop - the last batch lost 8.2 minutes to polls that overshot their sentinel:',
'',
'    run_bg () {            # run_bg <logfile> <command string>; the subshell makes the redirection cover the whole string, so a cd inside it neither escapes the log nor moves a relative log path',
'        nohup bash -c "( $2 ) > \'$1\' 2>&1; echo EXIT=\\$? >> \'$1\'" >/dev/null 2>&1 &',
'    }',
'    wait_for () {          # wait_for <logfile> [max-seconds, default 480]; 5-second granularity; call it again if it times out',
'        local n=0',
'        while ! grep -q \'^EXIT=\' "$1" 2>/dev/null ; do',
'            sleep 5 ; n=$((n+5))',
'            [ "$n" -ge "${2:-480}" ] && { echo "still running after ${n}s" ; return 1 ; }',
'        done',
'        grep -n \'^BUILD \\|^Total time:\\|^EXIT=\' "$1"',
'    }',
'',
'The default bound is 480 s so that one wait_for call stays inside the tool\'s 10-minute ceiling; ant testFast is longer than that, so call wait_for again until it prints the BUILD line. Do not chain shorter sleeps in one call.',
'',
'A capture you intend to commit is named .txt. Never .out and never .log: .gitignore:42,46 swallow both, which is how four probe captures cited by two ledger rows were nearly landed untracked.',
'',
'## The territory map - read the parts your task needs, do not go looking',
'',
'In 36 agents of the last climb not one of these was opened, and that is the direct cause of what the conformance review found. They are in explorations/coordinator/map/:',
'',
'- README.md - the synthesis: the gaps on the path in dependency order, the development loop\'s slow spots, and a touch-this-affects-that map.',
'- modules-and-phases.md - the repository\'s architecture and both pipelines phase by phase, with a table of where the interpreter and compiler paths diverge.',
'- spec-to-implementation.md - per language feature: its parser rule, checker class, interpreter site, codegen site and prelude location. This is how you answer "where does this fix belong".',
'- test-coverage.md - what each corpus and each gate target actually covers, and what is dark.',
'- design-intent-sources.md - where the design intent is written down: the papers, the spec\'s note boxes, the suppressed appendices. Section 6 is a table by design area.',
'- dormant-code.md - code that is present and switched off, with the reason and the repair.',
'',
'## Four rules every batch enforces',
'',
'1. "Where does this fix belong" is a required step, answered before any edit. Use spec-to-implementation.md and modules-and-phases.md. Rung 7 is the case in point: it wrote a run-time implementation without finding that INTEGERLITERALFOLDING is already wired before TYPECHECK (compiler/phases/PhaseOrder.java:57,142), and without engaging the team\'s comment three lines below the block it cited: "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals" (LibraryBuiltin/FortressBuiltin.fss:483-485).',
'',
'2. Precedent search before writing code. Ask "has the team solved this here already, and in how many ways", and answer it by citation. Rung 3 is the case in point: the right shape existed twice in VarCodeGen.java and the wrong shape once, and it copied the wrong one. And a precedent that repaired a defect is evidence the same defect is elsewhere in that file: count the sites and give the number. The repair batch\'s refusal was exactly this - the brief had named rung 0\'s guard and said not to redo it, and 22 unguarded sites in the same two files were the refusal.',
'',
'3. The specification\'s prose chapters are the standard; the api renderings are not. Specification/library/structure.tex:25-31 says Part Library "is largely automatically generated from the API code for the libraries themselves", so citing Specification/library/apis/*.tex to justify an edit to the matching .fsi is circular, and two rung reports did exactly that. Cite Specification/basic/ and Specification/basic-lib/. Cite the passage, not the grep hit: read at least ten lines either side of every line you cite before you cite it. The repair batch\'s only two unopened citations came from a grep piped through head, and the sentence that settled the question (basic-integers.tex:569) was one line below the citation and contained none of the grep\'s words.',
'',
'4. The interpreter is evidence, not an oracle. The static type checker runs only on the compile path and walk turns it off, so the interpreter accepts programs the language does not and reports what would be type errors as run-time dispatch failures; 55 ledger rows record its own defects. When walk and the compiled run disagree, that is a question and the specification answers it. Three real outcomes: the specification settles it against the compiled run, so repair; it settles it against the interpreter, so the compiled side may be right and a ledger row is owed against the interpreter; or the specification is silent. A silent specification is NOT a reason to stop - it is the reason to think harder: review the architecture around the construct, derive the candidate behaviours with what each costs and what else it touches, decide holistically which is right for the language, execute that one, and write the reasoning down. (The stops that apply to every rung of this batch, on top of the standing ones, are the stops the batch record\'s intro reserves for Pavol, at the head of this prefix.)',
'',
'A fourth case exists and is legitimate: the specification settles the divergence but the repair lies outside this rung\'s scope. Then the rung lands and opens a verified ledger row naming the defect, the specification clause, the probes both ways, the location of the fix and what the fix is. That is what rungs 6 and 7 did with row 317 and it was right.',
'',
'## What a measured defect is worth: the three homes',
'',
'This batch closes the gap the last three campaigns left - 22 defects measured by skeptics, 2 of them gated. Every defect anyone in this rung measures has exactly one of three homes, and the record says which and why:',
'',
'1. **Measured by anyone and repaired in this rung** - by the worker in its own first pass, by the skeptic, or in a repair round: it gets an ASSERTION in the rung\'s own gated test, and that assertion exists and passes BEFORE the second skeptic runs. Not a FACTS line, not a probe: an assertion. The cheapest form is an extra assert in the .fss file the rung already added; a new file is only needed when the defect is in another area. The assert message string carries the citation - the ledger row number or the specification line - and nothing else does: no provenance comment in the source (see "What you write" below).',
'',
'2. **Deferred, and the specification settles it** - the rung does not repair it, but the specification says what the answer is: it gets a gated EXPECTED-FAILURE test, whose file name starts with XXX. The harness makes this a real check, not a wish. FileTests.java:932 sets shouldFail = s.startsWith("XXX") from the file name; :587 and :654 make (shouldFail != failed) the failure condition, so an XXX test that STARTS PASSING turns the suite red, and :851 says the suite prints "XXX tests that succeed". So write XXX<Name>.fss asserting what the SPECIFICATION says, with a .test file beside it; it fails today, which is expected, and the day anyone repairs the defect without closing the ledger row the gate says so. 224 XXX*.test files in compiler_tests/ already use this. One caveat, from the harness\'s own author at FileTests.java:853 -"WARNING: expect_failure is not treated consistently" - so the first XXX file a rung adds is shown to go red on a deliberate local fix, and the report says it was shown.',
'',
'3. **Deferred, and the specification is silent** - a probe file with its captured output, named .txt, committed under probes/, and a ledger row that cites it. This is the only home that is not a gated test, and the record says explicitly that it is here because the specification is silent, not because it was easier.',
'',
'## Register',
'',
'Plain sentences, no self-congratulation - we are humble custodians here and deserve no credit. No unactionable comments in the source tree: provenance and rationale belong in your report, not in code. A test file carries at most ONE comment line, pointing at its REPORT.md - not a provenance essay (protocol.md section 2; compiler_tests/AtomicTopLevelVar.fss:13-42 is the 30-line comment that rule exists to prevent). Verify against primary sources before asserting, and cite file:line. If you make a decision, say in your report that it was a decision and what the alternatives were: a decision buried in a report is a decision not made. No estimates in days or weeks.',
'',
'## What you write, and what you must not touch',
'',
'Everything you produce goes under explorations/compile-ladder/SLUG/ in your own worktree, where SLUG is in your tail:',
'',
'- REPORT.md - what you found, what changed and why, every citation as file:line, the recorded failure and the recorded pass, the precedent search, the specification derivation, every differential you ran.',
'- record.md - the record lines the coordinator will fold at merge time: the FACTS.md line or lines this rung earns, the ledger note (which row, and exactly what to append - rows are never renumbered or moved, they are cited from thirty-five reports), and the handover state line. Write them as finished prose, ready to paste.',
'- probes/ - your probe programs and their captured outputs, every capture named .txt.',
'',
'Do NOT edit explorations/coordinator/FACTS.md, the gap ledger, PLAN.md, POSITIONS.md, INDEX.md, the handover document, CLAUDE.md, explorations/protocol.md, the tools under explorations/coordinator/tools/ (a rung runs them, it does not change them), or anything under .claude/. Parallel rungs conflict on every one of those - 28 of 28 replayed pairs conflict on FACTS.md and on the handover - which is the whole reason the record leaves you and is folded centrally.',
'',
'Do NOT run ant testFast or ant testSystem. The batch is gated once, after the merge, by the coordinator. Running the gate here costs 582 s and buys nothing: across nine skeptic runs of the last climb, not one of the 26 findings was load-bearing on a suite failure.',
'',
'## Every path you cite is tracked - check it before you report',
'',
'Before you return, run this in your worktree and fix or explain every line it prints:',
'',
'    for p in $(grep -oE \'explorations/compile-ladder/[A-Za-z0-9._/-]+\' explorations/compile-ladder/SLUG/REPORT.md explorations/compile-ladder/SLUG/record.md | cut -d: -f2- | sort -u) ; do',
'        [ -e "$p" ] || { echo "MISSING $p" ; continue ; }',
'        git ls-files --error-unmatch "$p" >/dev/null 2>&1 || echo "UNTRACKED $p"',
'    done',
'',
'An UNTRACKED line means the file exists and no commit carries it, which is what .gitignore:42,46 did to four captures of the last batch. Either commit it or say in your report why the citation stands without it.',
'',
'## Commit and push as you go - on your own branch only',
'',
'Your worktree is on its own wip/ branch, cut from ' + BASE + ' and already pushed. Commit on it at every milestone and push after every commit with git push -u origin <your branch>: after the failing test is written and its failure captured; after the edit and the recorded pass; after REPORT.md and record.md; after anything else worth not losing. The batch of 2026-09-17 kept every worktree dirty and lost all of it when the container died; this is the insurance against that, and nothing else. Write plain messages that say what state the commit captures; the landed commit is composed by the coordinator from your branch\'s net change, so your commits are not history that must be shaped. Never commit to main, never push to any branch but your own, never force-push, and never put a model identifier in a commit message. End every commit message with exactly these two lines:',
'',
'    Co-Authored-By: Claude <noreply@anthropic.com>',
'    Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB',
'',
'## If your branch already carries commits',
'',
'The batch may have been relaunched after its container died or its VM was restarted; both have happened (2026-09-17, 2026-09-18), and the second time the disk survived and the wip/ branches held every pushed milestone. Then your branch already holds the earlier attempt\'s milestones, and your worktree may hold its uncommitted edits and its tmp/ logs. Before anything else: git log --oneline ' + BASE + '..HEAD, git status --short, and the newest files in tmp/. Committed work is yours to verify, not to redo: read it as you would a colleague\'s, re-run its checks rather than trusting its logs, and continue from where it stops. Uncommitted edits are the same once you have read them; a log whose last step failed or was cut off means that step is still to be done. Nothing on the branch has been through a skeptic yet. Say in your report what you inherited and what you re-verified.',
'',
].join('\n')

// ---------------------------------------------------------------------------
// The rung worker's role block. The tails are in the manifest.
// ---------------------------------------------------------------------------

function rungRole(rung) {
  return [
'',
'---',
'',
'# Your role: rung worker',
'',
'## The order of work - test first, and the failure observed',
'',
'From explorations/coordinator/PLAN.md, and this is the part Pavol called load-bearing:',
'',
...(rung.testIsStage ? [
'1. Your rung declares testIsStage in the manifest, so its failing-then-passing test is the gate\'s checker-count stage (gate step 8) and NOT a .fss program: no program can yet be compiled against the interpreter\'s prelude, and this is the one place the test-first rule is met by a permanent stage instead of a test file (explorations/coordinator/library-route-judgement.md section 2 step 1; Pavol\'s decision of 2026-09-21, POSITIONS.md, "the library route"). So FIRST, before any edit, read the header of explorations/coordinator/tools/checker-count/run.sh and run it in your worktree (ant compileAll must have run there first):',
'',
'        explorations/coordinator/tools/checker-count/run.sh explorations/compile-ladder/SLUG/probes/checker-count-preedit.txt $TMPDIR/cc-pre',
'',
'   It runs the compiler\'s static checker over Library/FortressLibrary.fss with the interpreter\'s prelude in scope, under its own private cache, and prints one row per api with that api\'s error count, then #total, #locations and #crash; 20 s measured in the main tree, and it writes nothing but the table. That table IS your recorded failure: it goes under probes/ as a committed .txt and its #total is the number your record.md says the batch starts from.',
'2. After the edit, run the same stage again and capture it as checker-count-postedit.txt beside the first; put the diff of the two tables in REPORT.md, and say what moved and why, api by api. If the total changes, the manifest must declare the number it reaches as expectedCheckerCount and the crash line as expectedCheckerCrash when that moves - say in REPORT.md and in record.md which values the manifest needs, because the gate prints the declared total beside the one it measures, your skeptic compares your post-edit table with your report, and a crash line no rung declared is red. A rung of this kind writes no .test file; everything else in this list is unchanged, including the ladder subset of step 7 of this list and the three homes of its step 8.',
] : [
'1. Write the failing test FIRST, into ProjectFortress/compiler_tests/ (checker and codegen rungs) or ProjectFortress/library_tests/ (library rungs): a .fss component that prints PASS, plus a .test file in the format of ProjectFortress/library_tests/Boolean.test (a tests= line naming the components, then link, run, and the check line). The check line is exactly',
'',
'        run_out_contains=PASS',
'',
'   run_out_WIcontains, which Boolean.test and PLAN.md write, is implemented in the harness as of 2026-09-19 (FileTests.java:147-155, whitespace-insensitive containment beside _contains) but this batch writes _contains: one key, one meaning, and the seventeen older files are not this batch\'s business. A native-helper rung whose declarations are library declarations is a library rung: rung 7 put its test in library_tests/ (IntLiteralArithRung7).',
'2. Run it and capture the failure output to a file BEFORE the edit exists, named .txt. A report with no recorded failure is refused by your skeptic. The process this rules out is the one-off validation script: proving once by hand that something works and going ahead without leaving a permanent check in the corpus.',
]),
'3. Make the edit, as small as the test needs.',
'4. Rebuild: ant compileAll if you touched .java or .scala, then the library-order bytecode-cache rebuild. A rung that edits only CompilerLibrary rebuilds CompilerLibrary, CompilerAlgebra and CompilerSystem (25-30 s); one that edits CompilerBuiltin rebuilds from CompilerBuiltin down (about 125 s); the full five only after ant compileAll.',
'5. Run the test again and capture the pass.',
'6. Grep BOTH corpora - ProjectFortress/tests/ and every *_tests/ directory - for a competing declaration of every name you add. Rung 1 lost a full cycle to library_tests/MaybeTest9.fss declaring its own trait Equality, which only a full run revealed; this grep costs seconds and covers it. And grep src/com/sun/fortress/ whole, not compiler/ and runtimeSystem/ alone, for every name you add: rung M found Maybe, Just and Nothing named from syntax_abstractions/, outside the scope the climb had been grepping.',
'7. Run the ladder subset for the files your names were blocking, before and after. Use the restricted driver explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh with its subset.txt (corpus<TAB>file per line): copy both into explorations/compile-ladder/SLUG/, set LADDER_ROOT to a directory inside your worktree, and list the files the batch record names for your rung plus any file whose recorded first error in explorations/compile-ladder/baseline-2026-09-19/raw/ names one of your names. Never run the full-corpus driver with its default root: that root is shared and its cache pruning corrupts a parallel run.',
'8. Every defect you measure gets one of the three homes the shared prefix names, and your report says which and why for each. The assertions of home 1 are in place and passing before you report; the XXX file of home 2 is in place and failing as expected, and if it is this rung\'s first one you also show it going red on a deliberate local fix and then undo the fix.',
'9. The provenance block. Under the title of REPORT.md, FIVE lines, each ending in a file:line or the literal none. problem: the measurement that made this a rung (a program line or a ladder file). spec: the governing prose passage under Specification/basic or basic-lib, found from the feature\'s row in explorations/coordinator/map/spec-to-implementation.md; a citation under Specification/library/apis/ is labelled (api listing) and is not sufficient on its own; none when the prose is silent, with the grep that shows it. precedent: the interpreter\'s declaration, the team\'s dormant draft, or the in-file shape you copied. deviation: one line per way your edit differs from the precedent and from the specification\'s spelling. historical: every file of the original 2012 tree this rung edits - anything outside explorations/ and outside the test corpora this campaign created - or none. protocol.md:126-127 requires those edits to be flagged at commit time, and the gather copies this line into the commit message. Your skeptic opens every line the block cites and refuses the rung if one is missing or does not say what the block says.',
'10. Ledger rows. Rungs 6 and 7 opened row 317 when the specification settled a divergence the rung could not repair; do the same if you meet one. Number a new row provisionally from ' + LEDGER_FROM + ' in record.md and say that it is provisional: another rung may open one too, and the gather assigns the final numbers in manifest order (' + RUNGS.map(r => r.id).join(', ') + ').',
'11. The tracked-path check of the shared prefix, last, after your final commit.',
'',
'Report at the end in the structured form the tool requires, and write the full detail into REPORT.md.',
'',
'Two fields of that form the script reads itself. reportText and recordText carry the full text of REPORT.md and record.md, word for word as you wrote them to the files: in batch 5 the harness refused every rung worker\'s write of REPORT.md, and a file your branch does not carry is written by the gather from these fields verbatim, so they are the report whenever the file is not. If the harness refuses a write, say so in notDone and go on. stopsMet lists every stop the batch record\'s intro reserves for Pavol that this rung met, including one met on part of the work while the rest lands (a passage reported without choosing, an output the comparison does not account for), each with its evidence as file:line; a stop the intro names as lifted, or that another decision of his lifts, carries in liftedBy the POSITIONS.md line of that decision. Only Pavol lifts a stop: an entry without such a line holds the batch\'s push until he does, and an empty list says the rung met none.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The skeptic's role block. batched-climb-plan.md section 3.
// ---------------------------------------------------------------------------

function skepticRole(rung, workerReport, round) {
  return [
'',
'---',
'',
'# Your role: skeptic for ' + rung.id + ', ' + rung.slug,
'',
(round > 1
  ? 'This is the SECOND judgement of this rung. You refused it once, the worker made one repair, and this is the re-judgement. Under the design, a second refusal drops the rung from the batch: it is recorded with the reason and returned to the ranking, not retried. So refuse again only if the rung is genuinely wrong, not if it is merely improvable.'
  : 'This is the first judgement of this rung. You may refuse once; the worker then gets exactly one repair round in the same worktree.'),
'',
'You did not do this work and you are not here to be agreeable. Your job is to decide whether the claim is true and whether the record is honest. The worktree is ' + rung.path + ' and it is dirty on purpose; read the diff with git diff and git status in that worktree.',
'',
'## What the worker reported',
'',
'This is the worker\'s own account. Treat it as a claim to be checked, not as evidence.',
'',
JSON.stringify(workerReport, null, 2),
'',
'## What you must check',
'',
'0. The provenance block under REPORT.md\'s title: FIVE lines now - problem, spec, precedent, deviation, historical. Open every file:line it cites with sed -n and check that the line says what the block says. A missing line, a line that does not say it, a spec: line that cites only Specification/library/apis/, or a historical: line that omits a file of the 2012 tree the diff edits, is a refusal.',
(rung.testIsStage
  ? '1. The recorded failure, which for THIS rung is a table and not a program. Its manifest entry sets testIsStage: no program can yet be compiled against the interpreter\'s prelude, so the failing-then-passing test is the gate\'s checker-count stage (gate step 8, explorations/coordinator/tools/checker-count/run.sh), and the worker was required to capture that stage\'s table BEFORE the edit existed and again after it. Find both captures under explorations/compile-ladder/' + rung.slug + '/probes/, check that the pre-edit one is what the tree printed before the edit, and RUN THE STAGE YOURSELF in the worktree to see the post-edit table come out again: that run is your check that the test passes, in place of running a .fss test. A rung of this kind with no pre-edit table, or whose post-edit table you cannot reproduce, is refused exactly as a missing .fss failure would be. Check also that the report names the total the manifest must declare as expectedCheckerCount, and the crash line as expectedCheckerCrash if that moved: the gate prints the declared total beside the one it measures, and a crash line no rung declared makes the batch\'s gate red. Check 8 compares that total with the table. Everything else in this list is unchanged.'
  : '1. The recorded failure. The worker was required to run the new test and capture its failure BEFORE the edit existed. Find that captured output. A rung whose report has no recorded failure is refused - this is not negotiable and it is the point of the whole discipline.'),
'2. The diff, read line by line against the specification passages cited and against the provenance block. Does the edit do what the report says, and only that? Is it as small as the test needs?',
'3. The precedent search. Did the worker find what the team already did here, and did it follow the right precedent? Where a precedent repaired a defect, did the worker count the other sites in that file and give the number?',
'4. The test. Does it actually exercise the defect? The rung\'s tail names the cases that matter for this rung. Check also that the test file carries at most one comment line and no provenance essay.'
  + (rung.testIsStage ? ' This rung writes no test file: what you check instead is that the two tables differ in the way the report says, and that the difference is the defect and not a cache or a build artefact.' : ''),
'5. The competing-declaration grep across both corpora AND across src/com/sun/fortress/ whole.',
'6. The record.md fragment. Are the FACTS lines true as written and sourced? Does the ledger note cite an existing row without renumbering anything? Would a reader six months from now be able to check it?',
'7. The three homes. For every defect the report names as measured: home 1 (repaired in this rung) must be a passing assertion in the rung\'s gated test, and you run the test yourself to see it pass; home 2 (deferred, specification settles it) must be an XXX-named file that the harness treats as expected-to-fail, and you check the name and the .test file; home 3 (deferred, specification silent) must be a committed .txt capture and a ledger row, and the report must say the specification is silent and show the grep. A defect in your OWN findings that the worker then repairs is home 1 too, and its assertion is in place before you approve.',
(rung.testIsStage
  ? '8. The rung\'s own count table against its report: a file read, nothing to run. Its brief names the table: explorations/compile-ladder/' + rung.slug + '/probes/checker-count-postedit.txt, committed on ' + rung.branch + '.'
  : '8. The rung\'s own count table against its report: a file read, nothing to run. The general part of its brief names no table, because the rung does not set testIsStage; its tail may name one, and the report says which table, if any, it committed.')
  + ' Take the table\'s #total row and compare it with the total the report declares in REPORT.md, record.md and the structured report'
  + (rung.expectedCheckerCount !== undefined ? '; write the manifest\'s expectedCheckerCount, ' + rung.expectedCheckerCount + ', beside the two in SKEPTIC.md, as the prediction it is, not a value the table must meet' : '')
  + '. A mismatch between the table and the report is a finding for repair, not a stop: put it in requiredCorrections with both numbers, so that the report is corrected, and do not refuse the rung over it alone. If no table path is named and the rung declares a count, in its report or as expectedCheckerCount, report "no count table" in findings. A rung that declares no count and names no table has nothing to compare; one line saying so is enough.',
'',
'## Your required differential - this is not optional',
'',
'For every construct the rung touches, write your OWN small program, run it under the interpreter (bin/fortress FILE.fss) and under the compiler path (bin/fortress compile then bin/fortress run), and compare the answers. Do not satisfy this by reading the rung\'s own test; write programs the worker did not write. This requirement exists because four of the 26 items the last climb\'s skeptics raised came from differential probes they invented on their own initiative, and those four were the highest-value findings of eight rungs.',
'',
(rung.writesState
  ? 'THIS RUNG TOUCHES MUTABLE STATE, A TRANSACTION, OR LIBRARY CODE THAT WRITES, so run every one of your differentials TWICE: once with FORTRESS_THREADS=1 and once with FORTRESS_THREADS=4, as a command-line prefix that overrides env.sh (FORTRESS_THREADS=4 ../bin/fortress run X). Report both columns. The reason is on record: the repair batch found AtomicTopLevelVar failing at four threads and passing at one on the same tree (34,104 of 40,000), and every batch-1 skeptic ran everything at one thread by construction, including the first library write to the transactional cell from inside a transaction. A program that is correct cannot lose an update at four threads; a disagreement between the two columns is a finding, not noise.'
  : 'This rung does not touch mutable state, a transaction, or library code that writes, so one thread is enough for the differentials. If your reading of the diff says otherwise - a mutable variable, a field, an atomic block, or a write into CompilerLibrary\'s state - run every differential at FORTRESS_THREADS=1 and at =4 anyway and say that you did.'),
'',
'When walk and the compiled run disagree, apply rule 4 of the shared prefix: the divergence is a question and the specification answers it. Name which of the four outcomes you are in, and cite the passage.',
'',
'## The failure-mode question, asked explicitly',
'',
'Where the rung replaces a throwing stub, an error, or any other loud failure with a computed value, establish what that value is and run it against the specification. This is separate from which side is correct: a loud failure becoming a quiet answer costs diagnosability whoever turns out to be right, because the next person to meet it gets a number instead of a stack trace. It does not by itself prevent the rung from landing. It is a fact the rung must establish, record and report.',
'',
'## Your verdict',
'',
'Approve, or refuse with the one thing that must change. If you approve WITH required corrections, list them precisely: an approval carrying corrections becomes a checklist the commit stage is required to close, and two such corrections from the last climb were simply never made. Do not pad the list with preferences; name what must change and why.',
'',
'Every defect you measure that the rung does not repair and that deserves a ledger row goes in recommendedRows, one entry each, with the row\'s proposed text and the probe that establishes it. This field exists because the last batch lost one: a skeptic narrowed a codegen defect to any closure whose declared return type is a supertype of its body\'s type, and it reached no ledger row, no FACTS line and no handover sentence, because nothing in the machinery carried a recommendation that was not a required correction. The gather is required to open or refuse each entry in one sentence.',
'',
'Write your findings to explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md in that worktree, and your probes under explorations/compile-ladder/' + rung.slug + '/probes/skeptic/, every capture named .txt. Run the tracked-path check of the shared prefix over SKEPTIC.md before you report. Carry SKEPTIC.md\'s full text, word for word, in skepticText: a file the branch does not carry is written by the gather from that field verbatim, so if the harness refuses your write, say so in findings and go on. In stopsMet, name every stop the batch record\'s intro reserves for Pavol that the rung as it stands meets, whether or not the worker named it, with its evidence as file:line; a stop the intro names as lifted, or that another decision of his lifts, carries in liftedBy the POSITIONS.md line of that decision. Your approval does not lift a stop: an entry without such a line holds the batch\'s push until he lifts it. Do not edit the worker\'s source changes yourself and do not run ant testFast or ant testSystem. Commit SKEPTIC.md and your probes on the rung\'s branch, ' + rung.branch + ', with the footer the shared prefix gives, and push it; touch nothing else in the commit. The worker\'s own commits are on that branch, so git log ' + BASE + '..HEAD shows its milestones and git diff ' + BASE + '...HEAD its net change.',
'',
  ].join('\n')
}

function repairPrompt(rung, verdict, decision) {
  return [
'',
'---',
'',
'# Your role: rung worker, repair round for ' + rung.id + ', ' + rung.slug,
'',
(verdict
  ? 'You did this rung. Your skeptic refused it. This is your ONE repair round in the same worktree, ' + rung.path + '; a second refusal drops the rung from the batch.'
  : 'You did this rung and stopped on what you took for a stop condition. The judge has ruled that it is not one, and this is the continuation in the same worktree, ' + rung.path + '.'),
'',
(verdict ? 'The skeptic\'s verdict:\n\n' + JSON.stringify(verdict, null, 2) + '\n' : ''),
'The judge\'s decision, which you execute:',
'',
JSON.stringify(decision, null, 2),
'',
'Read the judge\'s full reasoning in explorations/compile-ladder/' + rung.slug + '/JUDGE.md' + (verdict ? ' and the skeptic\'s findings in SKEPTIC.md beside it' : '') + '. Carry out the judge\'s instructions in order. Where an instruction turns out wrong against a primary source, do what the source says, and say so in REPORT.md with the file:line that settles it - the judge read the two reports and the diff, not the whole tree.',
'',
'Every defect this round repairs - including one the skeptic measured and you now fix - gets its assertion in the rung\'s gated test, in place and passing, BEFORE you report: the second skeptic will look for it and its absence is a refusal ground. A defect this round does not repair gets home 2 or home 3 of the shared prefix, and the report says which. Re-run the test and re-capture the output, update REPORT.md and record.md (including the historical: line of the provenance block if the repair touched a file of the 2012 tree) and, with them, reportText, recordText and stopsMet in your structured result, re-run the tracked-path check, commit and push on your branch, and do not run the full gate.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The judge. Called at four points only: a worker's stop, a skeptic's refusal,
// a blocking review or a red gate on the merged tree. Its first ruling on a rung
// or on the merged tree runs on Opus; a second ruling on the same one is
// escalated to Fable (judgeTier). It does not build or test; it reads what the two
// Opus agents already wrote, rules on it, and writes instructions the next
// Opus agent executes. Its context is assembled here from the structured
// outputs so it does not have to gather it by tool calls.
// ---------------------------------------------------------------------------

function judgeRole(kind, rung, worker, verdict, extra) {
  const inWorktree = (kind === 'refusal' || kind === 'stop')
  const where = inWorktree ? rung.path : MAIN
  const outFile = inWorktree
    ? 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md'
    : BATCH_DIR + '/JUDGE-' + kind + '.md'
  const question = {
    refusal: 'The rung worker landed and its skeptic refused. Decide what the repair is: which of the two is right on each point, by citation, and exactly what the repair round must do. If the skeptic is wrong on its refusal ground, the repair round is a report-only repair that settles it, and you say so.',
    stop: 'The rung worker stopped, reporting a stop condition. Decide whether it is genuinely one of the reserved forks that reach Pavol (the array representation, the library route, a change of semantics against what the specification does say, deleting a test, and the stops the batch record\'s intro reserves for Pavol, at the head of the shared prefix above) or a silent specification that rule 4 says to think harder about. If the latter, derive the candidate behaviours with their costs and decide, and the instructions are the continuation. If the former, write what reaches Pavol: the fork, the candidates, what each costs, and your recommendation.',
    review: 'The merged-diff review found something blocking in the source hunks after the gather. Diagnose it holistically on the merged tree and decide the repair; do not bisect rungs. The gate is still running beside you in this tree: do not read ' + GATE_OUT + '/ or wait for it; rule on the review and the merged diff alone.',
    gate: 'The gate is red on the merged tree. Read the failing evidence and decide the repair. The gate has five ways to be red and they point at different places: a failing or erroring JUnit suite (its output is under ProjectFortress/TEST-RESULTS/); a suite whose test COUNT fell against the last landed summary, which usually means a .test file or a tests= line went missing rather than a test failing; a FAIL or a repeated timeout in the four-thread runs of the compiled atomic programs, which is a lost update and is about the transaction runtime rather than about the suites; a ladder regression, where a file that compiled and ran before now reaches a lower phase or prints different output - the stage hands you the diff; and, from the checker count over the interpreter\'s library, a crash line no rung declared or a stale checker shadow (the total itself is reported and never red), which is about the distance to the one library Pavol decided on (POSITIONS.md, 2026-09-21, "the library route"; library-route-judgement.md section 2 step 1) and whose evidence is the two tables the stage diffs, ' + GATE_OUT + '/checker-count.txt against the last landed one. Pavol\'s standing rule: identify the source of the conflict holistically and rework that part in the merged batch; dropping a rung is the retreat, taken only when its approach is wrong rather than its code, and then it is recorded and returned to the ranking.',
  }[kind]
  return [
'',
'---',
'',
'# Your role: judge (' + kind + ')' + (rung ? ' for ' + rung.id + ', ' + rung.slug : ''),
'',
'You are the escalation point of this batch, invoked only here. You did not do the work and you are not repeating it: no build, no test run, no ladder subset. You read, you rule, and you write instructions that an Opus worker executes. The rules above about never touching the main tree and never running the gate were written for the rung workers; you write one file and commit it, nothing else.',
'',
question,
'',
'## What is already known',
'',
(worker ? 'The worker\'s structured report:\n\n' + JSON.stringify(worker, null, 2) + '\n' : ''),
(verdict ? 'The skeptic\'s structured verdict:\n\n' + JSON.stringify(verdict, null, 2) + '\n' : ''),
(extra ? 'The stage that escalated to you returned:\n\n' + JSON.stringify(extra, null, 2) + '\n' : ''),
'## What to read, and no more than this unless a ruling needs it',
'',
inWorktree
  ? '1. The net change: git -C ' + rung.path + ' diff ' + BASE + '...HEAD, and the milestones: git log ' + BASE + '..HEAD.\n2. explorations/compile-ladder/' + rung.slug + '/REPORT.md and record.md in that worktree' + (verdict ? ', and SKEPTIC.md beside them' : '') + '.\n3. Every specification passage the two cite, by file:line with sed -n, in Specification/ under that worktree - the prose chapters, not library/apis/. Read at least ten lines either side of each.\n4. The precedents both name, at the cited lines.\n5. explorations/coordinator/map/spec-to-implementation.md only if the question is where a fix belongs.'
  : '1. The composed commits: git -C ' + MAIN + ' log ' + BASE + '..HEAD and git diff ' + BASE + '...HEAD.\n2. The stage\'s outputs named above, and for a red gate the failing tests\' own output under ProjectFortress/TEST-RESULTS/, the summary and comparison under ' + GATE_OUT + '/, and the full logs, which are NOT committed and are under ' + LOG_DIR + '/.\n3. Each rung\'s REPORT.md, SKEPTIC.md and record.md under explorations/compile-ladder/<slug>/.\n4. The specification passages the reports cite, by file:line.',
'',
'## How to rule',
'',
'Rule 4 of the shared prefix governs: the interpreter is evidence, not an oracle, and the specification answers a divergence; a silent specification is the reason to think harder, not to stop, except where the silence falls exactly on the point at issue and PLAN.md names it a fork. Rule holistically: the goal is one tree with everything running, not the largest subset that happens to be green. Every point in your ruling is a citation, file:line, that the repair worker can check. Say which claims of the worker and of the skeptic were right and which were wrong. If you take a decision under a silent specification, say that you did and what the alternatives were: it is reported to Pavol out of the loop.',
'',
'Write the full ruling to ' + outFile + ' in ' + where + (inWorktree
  ? ', commit it on the rung\'s branch ' + rung.branch + ' with the footer the shared prefix gives, and push it.'
  : ', and commit it locally on main with that footer; do not push. Another agent may be committing in this tree at the same time: retry once on an index.lock error after a few seconds.'),
'',
'Return the structured decision the tool requires. Your instructions are numbered steps the repair worker executes in order, each concrete enough to be done without re-deriving your reasoning.',
'',
  ].join('\n')
}

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    kind: { type: 'string' },
    decision: { type: 'string', enum: ['repair', 'drop', 'stop'], description: 'repair: the next Opus worker executes the instructions; drop: the rung\'s approach is wrong and it returns to the ranking; stop: a reserved fork, this reaches Pavol' },
    instructions: { type: 'array', items: { type: 'string' }, description: 'numbered steps for the repair worker, each with the file:line it rests on; empty unless repair' },
    ruling: { type: 'string', description: 'which claims of the worker and the skeptic were right and wrong, by citation' },
    specRuling: { type: 'string', description: 'what the specification settles here and how, or that it is silent and what was decided under the silence' },
    forPavol: { type: 'string', description: 'what must reach Pavol out of the loop: a fork with its candidates and costs, a divergence that lands unrepaired, a decision taken under a silent specification; empty if nothing' },
    summary: { type: 'string', description: 'at most 10 lines' },
  },
  required: ['kind', 'decision', 'instructions', 'ruling', 'summary'],
}

// ---------------------------------------------------------------------------

// The stops a rung worker, a skeptic or the merged-diff review found met; the
// script reads them to hold the push (pushHeldBy, below the stages).
const STOPS_MET = { type: 'array', description: 'every stop the batch record\'s intro reserves for Pavol that was met, including one met on part of the work while the rest lands; empty if none',
  items: { type: 'object', properties: {
    rung: { type: 'string', description: 'the rung id; the review names it, a rung worker or skeptic may leave it empty' },
    stop: { type: 'string', description: 'the stop, in the intro\'s words' },
    evidence: { type: 'string', description: 'file:line where it is met' },
    liftedBy: { type: 'string', description: 'the POSITIONS.md line of the decision of Pavol\'s that lifts it; empty if none does, and then it holds the push' },
  }, required: ['stop', 'evidence', 'liftedBy'] } }

const RUNG_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    landed: { type: 'boolean', description: 'true if the edit is in place and the new test passes' },
    stopped: { type: 'boolean', description: 'true if the rung hit a stop condition and is reporting instead of landing' },
    stopReason: { type: 'string', description: 'empty unless stopped' },
    filesChanged: { type: 'array', items: { type: 'string' }, description: 'path:line-range per changed source file, plus new test files' },
    historicalFiles: { type: 'array', items: { type: 'string' }, description: 'files of the original 2012 tree this rung edits, for the commit message; empty if none' },
    recordedFailure: { type: 'string', description: 'path to the captured pre-edit failure output, and the key line from it' },
    recordedPass: { type: 'string', description: 'path to the captured post-edit pass output, and the key line from it' },
    precedentSearch: { type: 'string', description: 'what the team already did here, by citation, and which precedent was followed' },
    specCitations: { type: 'array', items: { type: 'string' } },
    divergences: { type: 'array', items: { type: 'string' }, description: 'each walk-vs-compiled divergence found, with which side the specification favours' },
    defectHomes: { type: 'array', items: { type: 'string' }, description: 'one line per measured defect: the defect, its home (1 gated assertion, 2 XXX expected-failure test, 3 probe under a silent specification), and where it is' },
    decisions: { type: 'array', items: { type: 'string' }, description: 'decisions taken inside the rung, each with the alternative rejected' },
    trackedPaths: { type: 'string', description: 'the result of the tracked-path check: clean, or what was untracked and what was done' },
    notDone: { type: 'array', items: { type: 'string' } },
    stopsMet: STOPS_MET,
    reportText: { type: 'string', description: 'the full text of REPORT.md, word for word; the gather writes it verbatim when the branch does not carry the file' },
    recordText: { type: 'string', description: 'the full text of record.md, word for word; the gather writes it verbatim when the branch does not carry the file' },
    summary: { type: 'string', description: 'at most 15 lines of prose' },
  },
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'recordedFailure', 'stopsMet', 'summary'],
}

const SKEPTIC_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    approved: { type: 'boolean' },
    refusalReason: { type: 'string', description: 'empty unless refused; the one thing that must change' },
    requiredCorrections: { type: 'array', items: { type: 'string' }, description: 'corrections the commit stage must close even on an approval' },
    recommendedRows: { type: 'array', items: { type: 'string' }, description: 'ledger rows this skeptic recommends opening that are NOT required corrections: the proposed row text and the probe that establishes it; the gather opens or refuses each in one sentence' },
    failureWasRecorded: { type: 'boolean', description: 'whether a pre-edit captured failure actually exists' },
    differentialsRun: { type: 'array', items: { type: 'string' }, description: 'the skeptic\'s OWN probes: program, walk answer, compiled answer, verdict; with both thread columns where the rung writes state' },
    threadCounts: { type: 'string', description: 'which thread counts the differentials were run at and why' },
    defectHomes: { type: 'array', items: { type: 'string' }, description: 'one line per defect this skeptic measured: its home (1, 2 or 3) and where the check now is' },
    loudToQuiet: { type: 'string', description: 'whether a loud failure became a quiet value, and what the value is' },
    findings: { type: 'array', items: { type: 'string' } },
    stopsMet: STOPS_MET,
    skepticText: { type: 'string', description: 'the full text of SKEPTIC.md, word for word; the gather writes it verbatim when the branch does not carry the file' },
    summary: { type: 'string' },
  },
  required: ['slug', 'approved', 'failureWasRecorded', 'differentialsRun', 'stopsMet', 'summary'],
}

// ---------------------------------------------------------------------------
// The stages below the scatter. All in the main tree, all Opus except the judge.
// batched-climb-plan.md section 3, "Gather and gate" and "Commit", as corrected
// on 2026-09-17: the landed commit is composed at the gather from each branch's
// net change, never merged.
// ---------------------------------------------------------------------------

const MAIN_TREE_ROLE = [
'',
'---',
'',
'You work in the MAIN tree, ' + MAIN + ', on branch main. The rule in the shared prefix about never touching it was written for the rung workers, whose stage is over; the wip/ worktrees are now read-only history to you. Source explorations/experiment/env.sh in every shell; do not export TMPDIR or JAVA_FLAGS beyond what it sets. The batch base is ' + BASE + '. Commit locally with the footer the shared prefix gives; push only if your role below says so. Another agent of this batch may be working in this tree at the same time: if a git command fails on index.lock, wait five seconds and retry, up to four times.',
'',
].join('\n')

// The texts a rung's agents returned for its three files, for the gather to write
// verbatim where the branch lacks the file (the harness refused every rung
// worker's write of REPORT.md in batch 5). A second skeptic round's text comes
// first, the first round's after it.
const rungTexts = (r) => ({
  reportText: (r.worker && r.worker.reportText) || '',
  recordText: (r.worker && r.worker.recordText) || '',
  skepticText: (r.verdict && r.verdict.skepticText) || '',
  firstSkepticText: (r.firstVerdict && r.firstVerdict !== r.verdict && r.firstVerdict.skepticText) || '',
})

function gatherRole(approved, notLanded) {
  return MAIN_TREE_ROLE + [
'# Your role: gather',
'',
'Compose one clean local commit per approved rung on main. Nothing is merged: each rung\'s branch stays as it is and is never a parent of anything on main.',
'',
'Preconditions, checked first and reported if they fail: git status --porcelain is empty; ' + BASE + ' is an ancestor of HEAD (git merge-base --is-ancestor).',
'',
'## The order the commits go in',
'',
'NOT manifest order. Ascending order of each rung\'s LOWEST edited line in the files two or more rungs share: apply the rung whose hunks are highest in the file (smallest line numbers) first, so that a later rung\'s hunk does not shift the line numbers a landed record already cites. Work the order out from git diff ' + BASE + '...<branch> per branch before you apply anything, and say in your result what order you chose and why. Nine of the last review\'s fixes were one such shift, re-anchoring every citation above a later rung\'s hunk.',
'',
'For each rung, in that order:',
'',
'1. Its net change: git diff ' + BASE + '...<branch> > <scratch>/<slug>.patch, then git apply --3way --index <patch>. A hunk that fails in a file another rung also touched is the conflict this stage exists to see: if the hunks are in unrelated regions, resolve it by hand from both sides and say so; if both changed the same logic, do NOT guess - leave the tree clean (git checkout -- . && git clean -fd on the touched paths), and return with the conflict named.',
'   Then the rung\'s three files. Each rung below carries the text its agents returned for them: reportText for REPORT.md and recordText for record.md from its worker, skepticText for SKEPTIC.md from its skeptic, and firstSkepticText from a first skeptic round where there were two. For each of the three files under explorations/compile-ladder/<slug>/ that the branch does not carry, write the field\'s text to it verbatim, byte for byte - SKEPTIC.md as skepticText and, where firstSkepticText is not empty, a line "## First round" and firstSkepticText after it - and compose nothing: the rung\'s own words, not a summary of them. From there on the file is treated as one the rung wrote. A file the branch carries stands as it is. Name in the batch record every file written this way, and report a missing file whose field is empty rather than composing it. In batch 5 the harness refused every rung worker\'s write of REPORT.md and the gather composed each from a 15-line summary.',
'2. Fold its record: explorations/compile-ladder/<slug>/record.md (now in the tree) carries finished prose for three places. The FACTS.md line goes into explorations/coordinator/FACTS.md under the section of its area (the file is grouped by area, its README gives the rule: "Landed semantics" for a rule of the language or the library as it now stands, "The harness and the gate" for test mechanics, "The checker and the one library" for the checker), after that section\'s last entry, as one bullet with its source. The ledger note is APPENDED to the notes of the row it names in explorations/fortress-gap-ledger.md - rows are never renumbered, moved or deleted; where the note needs the landed commit\'s hash write the literal placeholder <short hash>, which the commit stage replaces. The handover state line goes into the first section of explorations/microgpt-run-c-handover.md ("Where the work stands"). If record.md opens a new row, the number is provisional (from ' + LEDGER_FROM + '): assign the final numbers in MANIFEST order (' + RUNGS.map(r => r.id).join(', ') + ') as you fold, append each row to the ledger\'s last table, and correct every citation of the provisional number in that rung\'s record.md, REPORT.md and probes in the same commit. Any file:line a record cites that a previously applied rung has shifted is re-anchored by SYMBOL - find the declaration or the assert by name in the current file and cite the line it is at now, rather than trusting the number the record was written with.',
'3. Close every requiredCorrections item of that rung\'s skeptic verdicts, listed below; each is a checklist item and the last climb left two of them unmade.',
'4. Open or refuse every recommendedRows item of that rung\'s skeptic, in one sentence each, recorded in the batch record. Opening it means a real ledger row with the probe it cites; refusing it means one sentence saying why the tree does not owe it. The last batch lost a codegen defect a skeptic had narrowed precisely, because nothing carried a recommendation that was not a required correction.',
'5. One commit: the applied source, the tests, the rung\'s files under explorations/compile-ladder/<slug>/ (REPORT.md, record.md, SKEPTIC.md, JUDGE.md if any, and each probe and capture named one by one), and the three record files. Stage those files by an explicit list, never by git add of the directory, and read git diff --cached --stat before you commit: 85 MB of a worker\'s experimental caches reached main that way on 2026-09-19 and protocol.md section 4 now forbids it. Title line: what the repair does, in the plain register; body: the two or three sentences of record.md that say why. If git diff --name-only for this commit shows ANY path outside explorations/, the body also carries a line beginning "historical:" naming the files of the original 2012 tree the commit edits, taken from the rung\'s provenance block - protocol.md:126-127 requires those edits to be flagged at commit time. Footer as given. Do not push.',
'',
(notLanded.length
  ? '## The rungs that did not land\n\nThese rungs stopped, were dropped, or their worker died, or the script withheld them (state withheld) because their manifest entry names in landsOnlyWith a rung that was not approved; the reason says which. Their source changes are NOT applied and their branches stay as they are. But their skeptics\' findings are about the tree, not about the rung, and they have nowhere else to go: fold them into ' + BATCH_DIR + '/RECORD.md under a heading "Not landed", one section per rung, carrying the reason it did not land, the findings of its SKEPTIC.md if it has one, and every recommendedRows entry, each opened as a real ledger row or refused in one sentence exactly as step 4 requires. Take that rung\'s REPORT.md, SKEPTIC.md, record.md and the probes its findings actually cite out of its branch by an explicit list of paths (git checkout <branch> -- <path> ..., one path at a time), never the whole directory, so the probes are tracked and nothing else comes with them; where the branch lacks one of the three files, write it from the rung\'s text fields below, verbatim, as step 1 says for a landed rung. Apply none of its source.\n\n' + JSON.stringify(notLanded.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state, reason: r.withheldReason || (r.judge && r.judge.summary) || (r.worker && r.worker.stopReason) || '', skepticFindings: (r.verdict && r.verdict.findings) || [], recommendedRows: (r.verdict && r.verdict.recommendedRows) || [] }, rungTexts(r))), null, 2) + '\n'
  : '## The rungs that did not land\n\nNone: every rung of this batch was approved.'),
'',
'## After the last commit: every cited path is tracked',
'',
'Run this over every landed rung and fix what it prints before you report:',
'',
'    for f in $(git show --name-only --pretty=format: HEAD~$N..HEAD | grep -E \'(REPORT|SKEPTIC|JUDGE|record)\\.md$\' | sort -u) ; do',
'        for p in $(grep -oE \'explorations/[A-Za-z0-9._/-]+\' "$f" | sort -u) ; do',
'            [ -e "$p" ] || continue',
'            git ls-files --error-unmatch "$p" >/dev/null 2>&1 || echo "UNTRACKED $f -> $p"',
'        done',
'    done',
'',
'(with $N the number of commits you made). An UNTRACKED line is a defect of this stage, not of the rung: commit the file in a follow-up commit or say in your result why the citation stands without it. .gitignore:42,46 swallow *.log and *.out, which is how four captures of the last batch were nearly landed untracked.',
'',
'The rungs and their verdicts:',
'',
JSON.stringify(approved.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, historicalFiles: (r.worker && r.worker.historicalFiles) || [], requiredCorrections: [].concat((r.firstVerdict && r.firstVerdict.requiredCorrections) || [], (r.verdict && r.verdict.requiredCorrections) || []), recommendedRows: [].concat((r.firstVerdict && r.firstVerdict.recommendedRows) || [], (r.verdict && r.verdict.recommendedRows) || []) }, rungTexts(r))), null, 2),
'',
'Return the structured result the tool requires: the commit hash per rung, the order you applied them in and why, the conflicts met and how each was resolved, the corrections closed, the recommended rows opened or refused, and the tracked-path check\'s output.',
'',
  ].join('\n')
}

const GATHER_SCHEMA = {
  type: 'object',
  properties: {
    commits: { type: 'array', items: { type: 'object', properties: { rung: { type: 'string' }, hash: { type: 'string' }, files: { type: 'array', items: { type: 'string' } } }, required: ['rung', 'hash'] } },
    applyOrder: { type: 'string', description: 'the order the rungs were applied in and the lowest edited line that decided it' },
    conflicts: { type: 'array', items: { type: 'string' }, description: 'each hunk that did not apply cleanly, the file, and how it was resolved or that it was not' },
    unresolved: { type: 'boolean', description: 'true if a conflict was left unresolved and the tree was returned to clean' },
    correctionsClosed: { type: 'array', items: { type: 'string' } },
    rowsOpenedOrRefused: { type: 'array', items: { type: 'string' }, description: 'one line per recommendedRows entry: opened as row N, or refused because ...' },
    notLandedFolded: { type: 'array', items: { type: 'string' }, description: 'the rungs whose findings were folded without their source, and where' },
    trackedPaths: { type: 'string', description: 'the tracked-path check\'s output and what was done about it' },
    head: { type: 'string', description: 'the hash HEAD is at when you finish' },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'summary'],
}

function reviewRole(gather) {
  return MAIN_TREE_ROLE + [
'# Your role: merged-diff reviewer',
'',
'The rungs were judged one at a time in their own worktrees; nobody has yet read the changes together, and the rung skeptics could not see the three record files, which were folded after them. You read both.',
'',
'THE GATE IS RUNNING BESIDE YOU, in this same tree, on the commits the gather made. That is deliberate and it costs nothing as long as your own fixes stay inside explorations/ - the gate\'s result stands. It is why the two rules below matter.',
'',
'The composed commits: git log ' + BASE + '..HEAD; the whole change: git diff ' + BASE + '...HEAD. The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'Check, and cite file:line for every finding:',
'1. Batch rule 1 against the real hunks: no two rungs add or change the same declaration, method, trait body or operator. Rule 2: no rung\'s edit depends on another\'s for its meaning or its test.',
'2. Each commit carries its edit, its test and its record together, and nothing of another rung.',
'3. The folded record as a whole: every FACTS line true as written and sourced; every ledger note appended to an existing row with no row renumbered, moved or deleted, and the ledger\'s own counts still right; the handover\'s first section consistent; every new row numbered in manifest order with no gap or duplicate against the rows already there, and no provisional number left anywhere.',
'4. Every requiredCorrections item the gather says it closed is actually closed, and every recommendedRows entry is opened as a real row or refused in one sentence.',
'5. Footers present and exact; no model identifier anywhere in the commits; a historical: line in the body of every commit whose diff touches a path outside explorations/, naming the 2012-tree files it edits.',
'6. The provenance block of every REPORT.md: five lines (problem, spec, precedent, deviation, historical), each ending in a file:line or none, and its SKEPTIC.md says the lines were opened.',
'7. The three homes: every defect a REPORT.md or SKEPTIC.md says was measured has a gated assertion, an XXX expected-failure file, or a committed .txt probe with a ledger row - and the one it has is the one the specification allows. A defect repaired in the rung whose only trace is a FACTS line is a finding.',
'8. Every path any of the landed records cites is tracked (git ls-files --error-unmatch).',
'9. Last, because it needs the gate\'s table: the checker count. Its total is reported and never red on its own (explorations/coordinator/checker-gate-review.md), so explaining it falls to you. The gate writes ' + GATE_OUT + '/checker-count.txt at its step 8, its last, and the table\'s last line is its #shadow row. Wait for that row in calls of at most eight minutes, for i in $(seq 96); do grep -q \'^#shadow\' ' + GATE_OUT + '/checker-count.txt 2>/dev/null && break; sleep 5; done, and after five calls without it write "no gate table" in checkerRows and leave this check. Diff the table against the last landed one, the first path that git log --name-only --pretty=format: -- explorations/compile-ladder/gate-baseline/checker-count.txt \'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt\' prints. Every row that is new or whose count rose (a row is an api, that is one .fsi file) must be explained as the consequence of a named rung edit, with its file:line: an early error a rung cleared, for example, lets the checker\'s later rules run on that api for the first time (StaticChecker.java:268-272). Where the rows alone do not say, the file:line of every error is in the gate\'s full output, ' + LOG_DIR + '/checker-count/run.txt; read it and write nothing there. One line per row goes in checkerRows. A new or risen row you cannot tie to a rung edit is blocking, for the judge and a repair. A total that misses a rung\'s declared one is not a finding by itself: the declarations are predictions.',
'10. The stops. Every stop the batch record\'s intro reserves for Pavol that a landed rung meets - in its hunks, or where its REPORT.md, SKEPTIC.md or record.md says it met one (a passage reported without choosing, an output a comparison does not account for, a line that waits for him) - goes in stopsMet with the rung\'s id, the evidence as file:line, and in liftedBy the POSITIONS.md line of the decision of his that lifts it, or nothing. The script holds the batch\'s push on any entry with no such line, and on the rungs\' own entries too; it is not a blocking finding, and you do not fix it.',
'',
'Two kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections", listed in your return. A defect in the source hunks - a rule broken, an edit that is not what its report says, an interaction between two rungs - you do NOT fix; you return it as blocking, precisely enough that a judge can rule on it from your words and the diff. Do not run the gate and do not push.',
'',
'## Two rules because the gate is running beside you',
'',
'First: record the hash HEAD is at BEFORE your corrections commit, and the hash after, and run',
'',
'    git diff --name-only <before> <after>',
'',
'and return both hashes and every path that command prints which is NOT under explorations/. If that list is non-empty the gate must be run again on your result, and the script uses your answer to decide. Keep your own fixes inside explorations/ wherever you can; if a correction genuinely needs a source file, make it and report it rather than leaving it.',
'',
'Second: do not touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, which are the gate\'s, and retry a git command that fails on index.lock.',
'',
  ].join('\n')
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    approved: { type: 'boolean', description: 'true if nothing blocking remains after your own record fixes' },
    blocking: { type: 'array', items: { type: 'string' }, description: 'source-level findings, each with file:line and which rule or claim it breaks' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'record or mechanical defects you fixed, and the commit hash' },
    headBefore: { type: 'string', description: 'the hash HEAD was at before your corrections commit' },
    headAfter: { type: 'string', description: 'the hash HEAD is at after it; same as headBefore if you committed nothing' },
    pathsOutsideExplorations: { type: 'array', items: { type: 'string' }, description: 'every path from git diff --name-only <headBefore> <headAfter> that is not under explorations/; empty if none' },
    checkerRows: { type: 'array', items: { type: 'string' }, description: 'check 9: one line per row of the gate checker table that is new or rose against the last landed table - the api, was -> now, and the rung edit (file:line) that explains it; empty if none' },
    stopsMet: STOPS_MET,
    summary: { type: 'string' },
  },
  required: ['approved', 'blocking', 'fixed', 'stopsMet', 'summary'],
}

// ---------------------------------------------------------------------------
// The gate. Eight steps: build, library, the two suites, the summary and its
// comparison with the last landed one, the four-thread atomic runs, the ladder
// regression, and the checker count - the compiler's static checker run over the
// INTERPRETER's library, whose error total is the measured distance to the one
// library Pavol decided on (POSITIONS.md, 2026-09-21, "the library route";
// library-route-judgement.md section 2 step 1 makes it a stage so that the
// distance is measured by every gate instead of by a script anybody re-runs).
// It commits nothing - the commit stage adds its summary and its table - because
// the review is committing in this tree at the same time.
//
// The ladder-regression stage's rule about the two microGPT programs, set by
// Pavol on 2026-09-19: their eighteen components are COMPILED ONLY in this
// stage - fortress compile, the phase reached - and are never linked and never
// run here. The 85 pass-list files are compiled and run, as the baseline
// measured them. When the microGPT programs one day compile, running them is a
// separate non-gating stage and not part of the gate.
// ---------------------------------------------------------------------------

const ATOMIC_OTHER = 'atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 nestedTransactions0 nestedTransactions1 nestedTransactions2'
const ATOMIC_COMPILER = 'AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop'

function gateRole(expectedMoves, expectedChecker) {
  return MAIN_TREE_ROLE + [
'# Your role: the gate',
'',
'Run the full gate once on the tree as it stands, exactly, and report what it says. You change no source and you commit nothing: the review agent is committing in this tree beside you, and the commit stage adds your summary to the tree after both of you are done. Your logs go to ' + LOG_DIR + '/, which is untracked and stays untracked - .gitignore:64 ignores /tmp/, and .gitignore:42,46 would swallow a .out or a .log anywhere. Your two tracked outputs are ' + GATE_OUT + '/summary.txt and ' + GATE_OUT + '/checker-count.txt, which you WRITE but do not commit.',
'',
'The steps, in order. Use run_bg and wait_for from the shared prefix for every long one, and never pipe ant through tail.',
'',
'1. mkdir -p ' + LOG_DIR + ' ' + GATE_OUT + '. df -h / first; if under 1 GB free, sweep /tmp/fortress*rats, ProjectFortress/test-tmp and ProjectFortress/test-caches and check again; if still under 500 MB, stop and report.',
'2. rm -rf ProjectFortress/TEST-RESULTS. Then ant compileAll to ' + LOG_DIR + '/compileAll.txt. BUILD SUCCESSFUL must appear at its end.',
'3. The library-order bytecode-cache rebuild, the five fortress compile commands of the shared prefix, to ' + LOG_DIR + '/library.txt. Then, immediately and before anything else compiles into that cache, take the pristine copy the ladder stage needs:',
'',
'        mkdir -p ' + LOG_DIR + '/ladder/root',
'        cp -a default_repository/caches ' + LOG_DIR + '/ladder/root/ladder-caches',
'        cp -a default_repository/caches ' + LOG_DIR + '/ladder/root/pristine',
'',
'   Two copies of about 14 MB each, a second apiece: run-subset.sh keeps its working cache in $LADDER_ROOT/ladder-caches and its untouched reference in $LADDER_ROOT/pristine, and skips build_library when pristine already exists, which is what saves the 145 s. The analysed cache keys on the source file\'s absolute path (NamingCzar.java:243-245), which is the same path in this same tree, so the copy is valid here and only here.',
'4. ant testFast to ' + LOG_DIR + '/testFast.txt; then ant testSystem to ' + LOG_DIR + '/testSystem.txt. Never both at once.',
'5. The summary, and the comparison with the last landed one. Run exactly this, from ' + MAIN + ':',
'',
'        gate_summary () {                 # gate_summary <log-dir> <out-file>',
'            local L="$1" O="$2" R="$FORTRESS_HOME/ProjectFortress/TEST-RESULTS" f',
'            {',
'              printf \'#suite\\ttests\\tfailures\\terrors\\tskipped\\n\'',
'              for f in "$R"/fast-*/TEST-*.txt "$R"/system-*/TEST-*.txt ; do',
'                [ -f "$f" ] || continue',
'                awk -v track="$(basename "$(dirname "$f")")" -F\'[ ,:]+\' \'',
'                  /^Testsuite:/ { n = split($2, p, "."); s = p[n] }',
'                  /^Tests run:/ { print track "/" s "\\t" $3 "\\t" $5 "\\t" $7 "\\t" $9 ; exit }\' "$f"',
'              done | sort',
'              for f in compileAll testFast testSystem ; do',
'                grep -h \'^BUILD \\|^Total time:\' "$L/$f.txt" | sed "s|^|# $f: |"',
'              done',
'            } > "$O"',
'        }',
'',
'        gate_compare () {                 # gate_compare <last-landed-summary> <this-summary>; prints the red lines, exit 1 if any. The system-<i> rows are one suite split by sorted index (FileTests.java:790-806): a file added to tests/ moves every later file along the shards, so those rows are compared by their sum',
'            awk -F\'\\t\' \'',
'              function key(s) { sub("^system-[0-9]+/", "system/", s) ; return s }',
'              FNR == NR { if ($0 !~ /^#/ && NF == 5) base[key($1)] += $2 ; next }',
'              $0 !~ /^#/ && NF == 5 {',
'                  k = key($1) ; seen[k] = 1 ; cur[k] += $2',
'                  if ($3 + 0 > 0 || $4 + 0 > 0)              { print "RED\\t" $1 "\\t" $3 " failures, " $4 " errors" ; bad++ }',
'                  if ($2 + 0 == 0)                           { print "EMPTY\\t" $1 ; bad++ }',
'              }',
'              END { for (k in cur) if ((k in base) && cur[k] < base[k]) { print "COUNT DOWN\\t" k "\\t" base[k] " -> " cur[k] ; bad++ }',
'                    for (s in base) if (!(s in seen)) { print "SUITE GONE\\t" s "\\t" base[s] " -> absent" ; bad++ }',
'                    if (bad) exit 1 }\' "$1" "$2"',
'        }',
'',
'        last_landed_summary () {',
'            git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \\',
'                \'explorations/compile-ladder/gate-baseline/summary.txt\' \\',
'                \'explorations/compile-ladder/climb-batch-*/gate/summary.txt\' | grep -m1 \'summary.txt$\'',
'        }',
'',
'   Then: gate_summary ' + LOG_DIR + ' ' + GATE_OUT + '/summary.txt, and gate_compare "$(last_landed_summary)" ' + GATE_OUT + '/summary.txt. A COUNT DOWN or SUITE GONE line is RED and you name the suite: it almost always means a .test file or a tests= line went missing rather than a test failing, because the .test file is the whole enumeration (FileTests.java:936-963) and nothing else would notice. A count that went UP is normal - this batch adds tests. Do NOT grep for "Tests expected to pass are failing": it is ant\'s own <fail message=...> at build.xml:993 and :1209, raised only when tests.failed is set, so its absence is exactly equivalent to BUILD SUCCESSFUL and reading it is reading the same dial twice.',
'6. The four-thread runs of the compiled atomic programs. The gate is pinned to one thread - env.sh:6 and, since 2026-09-19, the fastTrack and systemShard macros themselves (build.xml) - which makes both suites blind to a lost update: AtomicTopLevelVar passed at one thread and failed at four on the same unrepaired tree, 34,104 of 40,000. These thirteen programs are the ones the repair batch measured at both counts and found 22 of 22 PASS, so a FAIL here is a regression and not a discovery. A correct transaction runtime cannot lose an update, so this stage adds no flakiness to a green gate:',
'',
'        ATOMIC_OTHER="' + ATOMIC_OTHER + '"        # other_compiler_tests/, the ten atomicTest.test names',
'        ATOMIC_COMPILER="' + ATOMIC_COMPILER + '"  # compiler_tests/, the three the repair batch added',
'        atomic_runs () {                  # atomic_runs <out-file>; appends "# atomic ..." lines, exit 1 if any is not PASS',
'            local O="$1" p d i out rc',
'            case "$O" in /*) ;; *) O="$PWD/$O" ;; esac     # resolve before the cd: the gate passes GATE_OUT, which is relative to the main tree',
'            cd "$FORTRESS_HOME/ProjectFortress" || return 1',
'            for p in $ATOMIC_COMPILER $ATOMIC_OTHER ; do',
'                case " $ATOMIC_COMPILER " in *" $p "*) d=compiler_tests ;; *) d=other_compiler_tests ;; esac',
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
'   Run atomic_runs ' + GATE_OUT + '/summary.txt so the 39 result lines land in the summary. Any FAIL, any NO-PASS, any COMPILE-FAILED and any program that timed out twice is RED. A single timeout that passes on its re-run is not.',
'7. The ladder regression. The measured baseline is explorations/compile-ladder/baseline-2026-09-19/: 85 files at phase pass with their stdout captured under raw/, listed in pass-list.txt, plus the eighteen components of the two microGPT programs at phase disambiguate in microgpt-phase.md. Both are re-run here and compared. Use the baseline\'s own drivers so the result is the same kind of claim:',
'',
'   The eighteen microGPT components are COMPILED ONLY here - fortress compile, the phase reached - and are never linked and never run in this stage; that is Pavol\'s rule of 2026-09-19 and microgpt-phase.sh already obeys it. The 85 pass-list files are compiled AND run, as the baseline measured them. The day a microGPT component compiles, running it is a separate non-gating stage and not part of the gate.',
'',
'   a. Copy explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh (the subset driver; baseline-2026-09-19/ has only the whole-corpus run-ladder.sh) and baseline-2026-09-19/classify.py, report.py, microgpt-phase.sh and microgpt-phase.py into ' + LOG_DIR + '/ladder/. Point OUT at ' + LOG_DIR + '/ladder and LADDER_ROOT at ' + LOG_DIR + '/ladder/root in both shell drivers, which is where step 3 put ladder-caches and pristine, so the driver\'s "if [ ! -d $PRISTINE ]" guard skips build_library. Its sanity step (library_tests/Integer1 must compile and print PASS) still runs and is the check that the copy is good; if it fails, build the library the slow way and say so in your result.',
'   b. subset.txt is the first column of pass-list.txt, rewritten as corpus<TAB>file:',
'',
'        tail -n +2 explorations/compile-ladder/baseline-2026-09-19/pass-list.txt | cut -f1 | sed \'s|/|\\t|\' > ' + LOG_DIR + '/ladder/subset.txt',
'',
'   c. Run run-subset.sh, then classify.py in that directory to get ladder.tsv, then microgpt-phase.sh and microgpt-phase.py for the eighteen. Budget about 200 s for the 85 and about 35 s for the eighteen; the baseline measured 192 s of program time for the 85 on a busy host and the library rebuild is what the copy removes.',
'   d. Compare:',
'',
'        ladder_filter () { sed -E \'s/Operation took [0-9.]+ms/Operation took <time>ms/\' "$1" ; }',
'        ladder_compare () {               # ladder_compare <baseline-dir> <now-dir>; prints one DOWN, UP, NEW, MISSING or STDOUT line per moved file, and nothing when nothing moved',
'            local B="$1" N="$2" key',
'            awk -F\'\\t\' \'',
'              function rank(p,   r) { r["parse"]=1; r["disambiguate"]=2; r["typecheck"]=3; r["codegen"]=4;',
'                                      r["link"]=5; r["run"]=6; r["pass"]=7; return r[p] + 0 }',
'              FNR == NR { if (FNR > 1) b[$1 "/" $2] = $4 ; next }',
'              FNR > 1 {',
'                  k = $1 "/" $2',
'                  if (!(k in b))                  { print "NEW\\t" k "\\t" $4 ; next }',
'                  if (rank($4) < rank(b[k]))      { print "DOWN\\t" k "\\t" b[k] " -> " $4 }',
'                  else if (rank($4) > rank(b[k])) { print "UP\\t" k "\\t" b[k] " -> " $4 }',
'              }\' "$B/ladder.tsv" "$N/ladder.tsv"',
'            tail -n +2 "$B/pass-list.txt" | cut -f1 | while IFS= read -r key ; do',
'                [ -n "$key" ] || continue',
'                if [ ! -f "$N/raw/$key.run" ] ; then printf \'MISSING\\t%s\\n\' "$key" ; continue ; fi',
'                if ! diff -q <(ladder_filter "$B/raw/$key.run") <(ladder_filter "$N/raw/$key.run") >/dev/null ; then',
'                    printf \'STDOUT\\t%s\\n\' "$key"',
'                    diff <(ladder_filter "$B/raw/$key.run") <(ladder_filter "$N/raw/$key.run") | sed \'s/^/    /\' | head -8',
'                fi',
'            done',
'        }',
'',
'      The timing filter is what makes the three nestedTransactions captures comparable; they are the only files among the 85 whose output varies from run to run, and the filter masks exactly the line that varies rather than exempting the file, so a change in the rest of their output is still caught. If a later run shows another file varying, exempt it from the STDOUT half only and never from the phase half, and say so in your result.',
'',
'      For the eighteen, compare the phase column of the baseline\'s microgpt-phase.md against this run\'s:',
'',
'        mg_phases () { awk -F\'|\' \'/^\\| *[0-9]+ *\\| *`/ { gsub(/[` ]/, "", $3); gsub(/ /, "", $4); print $3 "\\t" $4 }\' "$1" ; }',
'        diff <(mg_phases explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.md) <(mg_phases ' + LOG_DIR + '/ladder/microgpt-phase.md)',
'',
'      Every one of the eighteen is at disambiguate today. A move UP is the batch\'s real result and the summary says so plainly; a move DOWN is red.',
'   e. Append the comparison\'s output to ' + GATE_OUT + '/summary.txt, every line prefixed with "# ladder ", and copy ladder.tsv, microgpt-phase.md and the comparison into ' + GATE_OUT + '/ladder/ - those are small and they are committed. The raw captures and the driver logs stay in ' + LOG_DIR + ' and are not.',
'',
'   A DOWN, a STDOUT or a MISSING line is RED unless the manifest declared it. This batch declared these expected moves, which are the files a rung changes on purpose; anything on this list is reported, not red, and a file NOT on this list that moves down is red and goes to the judge with the diff:',
'',
(expectedMoves.length ? expectedMoves.map(m => '     - ' + m).join('\n') : '     (none: no rung of this batch expects to move a ladder file)'),
'',
'8. The checker count: the compiler\'s static checker run over the INTERPRETER\'s library, and its error total compared with the last landed one. Pavol decided on 2026-09-21 that the one library the compiler checks is the interpreter\'s (POSITIONS.md, "the library route"), and step 1 of explorations/coordinator/library-route-judgement.md makes the distance to it a stage of this gate rather than a script anybody re-runs by hand, so that from now on every batch measures it. The count is reported, not gated, whatever the header of run.sh says (explorations/coordinator/checker-gate-review.md, 2026-09-23). Read the header of explorations/coordinator/tools/checker-count/run.sh, then run',
'',
'        explorations/coordinator/tools/checker-count/run.sh ' + GATE_OUT + '/checker-count.txt ' + LOG_DIR + '/checker-count',
'',
'   from ' + MAIN + '. It compiles the two sources beside it - WorldFlip.java, which flips the world with the public Shell.useInterpreterLibraries() and PhaseOrder.compilerPhaseOrder, and an instrumented copy of StaticChecker that names each api it checks and survives the OverloadingChecker crash - against bin/fortress_classpath, and runs the compiler phase order over Library/FortressLibrary.fss with its own -Dfortress.caches under ' + LOG_DIR + '/, so default_repository/ is neither read nor written and no library rebuild is needed. 20 s measured in the main tree on 2026-09-22; budget a minute. It edits nothing and its only tracked output is the table, which you write and, like the summary, do NOT commit. Print the table in your result: one row per api with that api\'s own error count, then #total, #locations (the distinct file:line the errors were reported at, by this script\'s count), #crash (the crash the checker meets after the apis; today the nat gap, Not yet implemented at STypesUtil.scala:557, the unimplemented static-parameter kinds at STypesUtil.scala:546-559) and #shadow.',
'',
'   Then compare it with the last landed table, found the way the summary is found:',
'',
'        last_landed_checker_count () {',
'            git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \\',
'                \'explorations/compile-ladder/gate-baseline/checker-count.txt\' \\',
'                \'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt\' | grep -m1 \'checker-count.txt$\'',
'        }',
'',
'        checker_compare () {              # checker_compare <last-landed-table> <this-table> [declared-totals] [declared-crash]; prints the verdict lines, exit 1 if any is red; the total is never red',
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
'   Run it as checker_compare "$(last_landed_checker_count)" ' + GATE_OUT + '/checker-count.txt "' + ((expectedChecker && expectedChecker.counts && expectedChecker.counts.length) ? expectedChecker.counts.join(', ') : 'none') + '"' + ((expectedChecker && expectedChecker.crashes && expectedChecker.crashes.length) ? ' "' + expectedChecker.crashes[0].replace(/^[^:]*: /, '') + '" (the declared crash line, without its rung prefix, as the fourth argument)' : '') + ', and append its output to ' + GATE_OUT + '/summary.txt with every line prefixed by "# checker ".',
'',
'   The total is REPORTED and is never red on its own (explorations/coordinator/checker-gate-review.md): a fix can raise it, because the checker stops checking an api at that api\'s first errors (StaticChecker.java:268-272) and clearing them lets its later rules run there for the first time, and two rungs\' changes do not add, so neither a rise nor a missed declaration tells progress from harm. COUNT UP, COUNT DOWN and COUNT SAME each print the declared totals beside the measured one; a declaration is a prediction written before the run, printed and not enforced, and the merged-diff review beside you explains every new or risen row of your table. A CRASH CHANGED line that no rung declared stays RED, as before, and so does SHADOW STALE, which means the copy beside run.sh is no longer the checker the tree builds and the number is not this tree\'s. The per-api rows and #locations are printed either way, so print the diff in your result. What this batch declared:',
'',
(expectedChecker && expectedChecker.counts && expectedChecker.counts.length
  ? expectedChecker.counts.map(m => '     - total: ' + m).join('\n')
  : '     - total: none declared; the change is printed all the same'),
(expectedChecker && expectedChecker.crashes && expectedChecker.crashes.length
  ? expectedChecker.crashes.map(m => '     - crash line: ' + m).join('\n')
  : '     - crash line: none declared, so any change of it is red'),
'',
'## What green means',
'',
'Zero failures and zero errors in every suite of testFast and of testSystem, BUILD SUCCESSFUL on compileAll and on both suites, no COUNT DOWN and no SUITE GONE line from gate_compare, every atomic run PASS, no undeclared DOWN, STDOUT or MISSING line from the ladder comparison, and from the checker count an unchanged crash line, unless a rung declared the new one, and no stale shadow. The checker\'s total, up or down, declared or not, is reported and never red. Anything else is red.',
'',
'Write ' + GATE_OUT + '/summary.txt and ' + GATE_OUT + '/checker-count.txt as the snippets and the script produce them - do not hand-write either; the last two batches wrote agent prose and one of them got a suite count wrong. Do NOT commit them. Return the structured result. If red, name every failing test and copy the first failure\'s output lines into the result; the judge reads them.',
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
    countsDown: { type: 'array', items: { type: 'string' }, description: 'every COUNT DOWN or SUITE GONE line from gate_compare, with the suite named; empty if none' },
    atomicFourThread: { type: 'string', description: 'the thirteen programs, three runs each at FORTRESS_THREADS=4: how many PASS, and every line that is not PASS' },
    ladder: { type: 'string', description: 'the 85 files and the eighteen microGPT components: moves up, moves down, stdout differences, and which were declared in the manifest' },
    checkerCount: { type: 'string', description: 'the checker count over the interpreter library: the total, the last landed total it was compared against, the crash line, every verdict line checker_compare printed, and the per-api rows that moved' },
    failing: { type: 'array', items: { type: 'string' }, description: 'failing test names with the key output line each' },
    stopped: { type: 'boolean', description: 'true if the gate could not be run (disk, build failure before tests)' },
    summaryPath: { type: 'string', description: 'the path of the summary file you wrote, and the path of the last landed one you compared against' },
    summary: { type: 'string' },
  },
  required: ['green', 'failing', 'stopped', 'summary'],
}

function mergedRepairRole(decision, kind) {
  return MAIN_TREE_ROLE + [
'# Your role: repair on the merged tree (' + kind + ')',
'',
'The judge has ruled on the merged tree; you execute the ruling. Its decision:',
'',
JSON.stringify(decision, null, 2),
'',
'Its full reasoning is in ' + BATCH_DIR + '/JUDGE-' + kind + '.md. Carry out the instructions in order. Where one turns out wrong against a primary source, do what the source says and record the deviation in ' + BATCH_DIR + '/REPAIR-' + kind + '.md with the file:line that settles it. Rebuild what the edit needs (ant compileAll for Java, then the library-order rebuild), run the tests the ruling names, and commit locally, one commit, with the record files updated where the ruling says and a historical: line in the body if the commit touches a file of the 2012 tree. Every defect this repair measures and fixes gets its assertion in a gated test, as the shared prefix requires. Do not run the full gate; the gate stage runs it after you. Do not push.',
'',
  ].join('\n')
}

// The push rule (CLIMB-BATCH-6.md section 8, item 2): the commit stage pushes
// only when no landed rung carries a stop that was met and not lifted. The stops
// are those each landed rung's last worker report and last skeptic verdict list,
// and those the last merged-diff review lists; only Pavol lifts a stop, so an
// entry counts as lifted only when its liftedBy cites POSITIONS.md. A malformed
// entry counts as not lifted. Batches 4 and 5 held the push by the landing
// agent's reading of the intro alone, and batch 5's push went out past a stop.
function pushHeldBy(landed, review) {
  const lifted = (s) => !!(s && typeof s === 'object' && /POSITIONS\.md/.test(s.liftedBy || ''))
  const line = (id, s) => id + ': ' + ((s && s.stop) || String(s)) + ((s && s.evidence) ? ' (' + s.evidence + ')' : '')
  const own = [].concat.apply([], landed.map(r => [].concat((r.worker && r.worker.stopsMet) || [], (r.verdict && r.verdict.stopsMet) || [])
    .filter(s => !lifted(s)).map(s => line(r.rung, s))))
  const reviewed = ((review && review.stopsMet) || []).filter(s => !lifted(s)).map(s => line((s && s.rung) || 'review', s))
  return own.concat(reviewed)
}

function commitRole(gather, gate, heldBy) {
  const held = heldBy.length > 0
  return MAIN_TREE_ROLE + [
'# Your role: commit',
'',
held
  ? 'The gate is green on the tree as it stands. Land it on the local main; the script holds the push (step 3).'
  : 'The gate is green on the tree as it stands. Land it.',
'',
'1. Replace every literal <short hash> placeholder in the ledger, FACTS and the handover with the hash of the commit it refers to, from the gather stage\'s result below. Copy the gate\'s outputs into the tree first: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/ - the gate wrote them under tmp/, untracked, so that a run that stops before this stage leaves nothing untracked in the tree, and it committed nothing because the review was committing in this tree at the same time. Then add ' + GATE_DIR + '/summary.txt, ' + GATE_DIR + '/checker-count.txt and ' + GATE_DIR + '/ladder/ to the same commit. The checker-count table is the comparand the next batch\'s gate reads, so a batch that lands without it leaves the next gate comparing against an older one. Title it "Record the landed commits\' hashes and the gate summary". grep -rn "<short hash>" explorations/ afterwards must be empty, and the full gate logs under ' + LOG_DIR + '/ are NOT committed and never are.',
'2. Verify every commit since ' + BASE + ' ends with the two footer lines and contains no model identifier (git log ' + BASE + '..HEAD --format=%B), and that every commit whose diff touches a path outside explorations/ carries a historical: line.',
held
  ? '3. Do NOT push: not main, not ' + CONTAINER_BRANCH + ', no branch. The script holds the push, because landed rungs carry stops that were met and that no decision of Pavol\'s lifts:\n\n' + heldBy.map(h => '- ' + h).join('\n') + '\n\n   Append to ' + BATCH_DIR + '/RECORD.md a paragraph headed "Not pushed." that names each of these stops with its rung and evidence, gives the hash origin/main stays at, and says that the push waits on Pavol, as batch 4\'s and batch 5\'s records did; commit it locally with the footer. The coordinator pushes once he has lifted them.'
  : '3. git push origin main; then git push origin main:' + CONTAINER_BRANCH + ' so the container\'s own branch stays at main. Retry a failed push up to four times with 2, 4, 8, 16 seconds between.',
held
  ? '4. Keep every wip/ worktree and its local branch: their removal follows the push, as batch 5\'s commit stage kept them while its push was held.'
  : '4. For each wip/ branch: confirm git -C <worktree> status -sb shows nothing ahead of its origin; then git worktree remove <worktree> and git branch -D <branch>. Leave the remote wip/ branches: the proxy refuses branch deletion from here, and Pavol removes them in the GitHub UI.',
'',
'The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'The gate stage returned:',
'',
JSON.stringify(gate, null, 2),
'',
(held
  ? 'Return the structured result: the hash main is at locally as mainHead, pushed empty, pushHeld true, and the stops above in heldBy.'
  : 'Return the structured result: the hash main is at on origin, the commits pushed, and what was cleaned up.'),
'',
  ].join('\n')
}

const COMMIT_SCHEMA = {
  type: 'object',
  properties: {
    mainHead: { type: 'string' },
    pushed: { type: 'array', items: { type: 'string' } },
    containerBranchAtMain: { type: 'boolean' },
    cleanedUp: { type: 'array', items: { type: 'string' } },
    pushHeld: { type: 'boolean', description: 'true when the script held the push on a stop met and not lifted' },
    heldBy: { type: 'array', items: { type: 'string' }, description: 'the stops that held the push, as the role gave them; empty if pushed' },
    summary: { type: 'string' },
  },
  required: ['mainHead', 'pushed', 'containerBranchAtMain', 'pushHeld', 'summary'],
}

// ---------------------------------------------------------------------------
// The run.
// ---------------------------------------------------------------------------

log('Climb batch ' + BATCH + ': ' + RUNGS.length + ' rungs (' + RUNGS.map(r => r.id).join(', ') + '), two at a time in the order '
    + SCATTER.map(r => r.id).join(', ') + ' (longest expected worker first), each judged by its own skeptic before the merge; then gather, review beside the gate, commit. Base ' + BASE + '.')

const results = await pipeline(
  SCATTER,

  // Stage 1: the rung worker.
  (rung) => agent(PREFIX + rungRole(rung) + rung.tail, {
    label: 'rung:' + rung.id,
    phase: 'Rung',
    schema: RUNG_SCHEMA,
    model: OPUS,
  }),

  // Stage 2: the skeptic, with one repair round; the judge on a stop or a refusal.
  async (worker, rung) => {
    const out = (state, extra) => Object.assign({ rung: rung.id, slug: rung.slug, branch: rung.branch, state }, extra)
    if (!worker) return out('worker-died', { worker: null, verdict: null })

    let judgeOnStop = null
    if (worker.stopped) {
      log(rung.id + ' stopped and is reporting: ' + (worker.stopReason || '(no reason given)') + '; the judge decides whether it is a fork')
      judgeOnStop = await agent(PREFIX + judgeRole('stop', rung, worker, null, null), Object.assign({
        label: 'judge:' + rung.id + ':stop',
        phase: 'Judge',
        schema: JUDGE_SCHEMA,
      }, judgeTier(null)))
      if (!judgeOnStop || judgeOnStop.decision !== 'repair') {
        return out('stopped', { worker, verdict: null, judge: judgeOnStop })
      }
      const resumed = await agent(PREFIX + rungRole(rung) + rung.tail + repairPrompt(rung, null, judgeOnStop), {
        label: 'resume:' + rung.id,
        phase: 'Rung',
        schema: RUNG_SCHEMA,
        model: OPUS,
      })
      if (!resumed || resumed.stopped || !resumed.landed) {
        return out('stopped', { worker: resumed || worker, verdict: null, judge: judgeOnStop })
      }
      worker = resumed
    }

    const verdict = await agent(PREFIX + skepticRole(rung, worker, 1), {
      label: 'skeptic:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
      model: OPUS,
    })

    if (verdict && verdict.approved) {
      return out('approved', { worker, verdict, repaired: false, judge: judgeOnStop })
    }

    log(rung.id + ' refused by its skeptic: ' + ((verdict && verdict.refusalReason) || 'no reason returned') + '; the judge rules before the one repair round')

    const decision = await agent(PREFIX + judgeRole('refusal', rung, worker, verdict, null), Object.assign({
      label: 'judge:' + rung.id,
      phase: 'Judge',
      schema: JUDGE_SCHEMA,
    }, judgeTier(judgeOnStop)))
    if (!decision || decision.decision === 'drop') {
      return out('dropped', { worker, verdict, firstVerdict: verdict, judge: decision, repaired: false })
    }
    if (decision.decision === 'stop') {
      return out('stopped', { worker, verdict, firstVerdict: verdict, judge: decision, repaired: false })
    }

    const repaired = await agent(PREFIX + rungRole(rung) + rung.tail + repairPrompt(rung, verdict, decision), {
      label: 'repair:' + rung.id,
      phase: 'Rung',
      schema: RUNG_SCHEMA,
      model: OPUS,
    })

    const verdict2 = await agent(PREFIX + skepticRole(rung, repaired || worker, 2), {
      label: 'skeptic2:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
      model: OPUS,
    })

    return out((verdict2 && verdict2.approved) ? 'approved-after-repair' : 'dropped', {
      worker: repaired || worker,
      verdict: verdict2,
      firstVerdict: verdict,
      judge: decision,
      repaired: true,
    })
  },
)

// Back into manifest order: the ledger numbers and the record are ordered by the
// manifest, never by the order the scatter happened to run in.
const byId = {}
for (const r of results.filter(Boolean)) byId[r.rung] = r

// landsOnlyWith (CLIMB-BATCH-6.md section 8, item 4): a rung whose manifest entry
// names rungs it lands only with is withheld when any of them was not approved,
// and the check repeats until nothing moves, so a rung resting on a withheld one
// is withheld too. It reaches the gather on the not-landed list with the reason,
// and the gather never applies it. Batch 6's T names F; batch 5 carried such a
// rule for Z in its intro alone.
const isApproved = (r) => r.state === 'approved' || r.state === 'approved-after-repair'
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
const expectedMoves = [].concat.apply([], RUNGS.filter(m => approved.some(a => a.rung === m.id)).map(m => (m.expectedMoves || []).map(x => m.id + ': ' + x)))
// The checker-count stage's declarations, gathered the same way: only an approved
// rung's declaration counts, because a rung that did not land changed nothing.
const expectedChecker = {
  counts: RUNGS.filter(m => approved.some(a => a.rung === m.id) && m.expectedCheckerCount !== undefined)
               .map(m => m.id + ': ' + m.expectedCheckerCount),
  crashes: RUNGS.filter(m => approved.some(a => a.rung === m.id) && m.expectedCheckerCrash !== undefined)
                .map(m => m.id + ': ' + m.expectedCheckerCrash),
}
const report = { batch: BATCH, base: BASE, rungs }

if (approved.length === 0) {
  log('No rung approved; nothing to gather. ' + rungs.map(r => r.rung + ': ' + r.state).join(', '))
  return Object.assign(report, { landed: false, reason: 'no rung approved' })
}
log('Approved: ' + approved.map(r => r.rung + ' (' + r.state + ')').join(', ')
    + (notLanded.length ? '. Not landed, findings folded anyway: ' + notLanded.map(r => r.rung + ' (' + r.state + ')').join(', ') : '')
    + '. Gathering onto main.')

// Gather: one composed local commit per approved rung, plus the not-landed findings.
const gather = await agent(PREFIX + gatherRole(approved, notLanded), { label: 'gather', phase: 'Gather', schema: GATHER_SCHEMA, model: OPUS })
report.gather = gather
if (!gather || gather.unresolved) {
  log('Gather stopped: ' + ((gather && gather.summary) || 'agent died'))
  return Object.assign(report, { landed: false, reason: 'gather unresolved' })
}

// Review BESIDE the gate. The review reads the merged diff and never builds; the
// gate builds and never reads the record. Batch 1 ran them one after the other
// and the review's 14.7 minutes were serial for nothing
// (process-decisions-review-1.md, decision 2(a), "What buys time in the same
// place"). The named risk is two agents committing in this tree at once, and it
// is closed by the gate committing nothing: the commit stage adds its summary.
// When the review blocks, its judge rules at once, while the gate runs on: in
// batch 3 the judge waited 4.5 minutes for the gate, in batch 2 the gate outlasted
// the review by 8.2 (climb-batch-3-redesign.md, (e); Pavol, 2026-09-24). The
// repair waits for the gate, because both work in this tree.
const gateRun = agent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS })
let review = await agent(PREFIX + reviewRole(gather), { label: 'review', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS })
report.review = review
const reviewBlocks = !!(review && !review.approved && review.blocking && review.blocking.length)
let reviewDecision = null
if (reviewBlocks) {
  log('Review found blocking: ' + review.blocking.length + ' item(s); the judge rules while the gate runs on')
  reviewDecision = await agent(PREFIX + judgeRole('review', null, null, null, review), Object.assign({ label: 'judge:review', phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(null)))
  report.reviewJudge = reviewDecision
}
let gate = await gateRun
report.gate = gate

// A blocking review means a judge and a repair on the merged tree, and the gate
// that ran beside it is discarded: the source has changed under it.
let gateIsStale = !!(review && review.pathsOutsideExplorations && review.pathsOutsideExplorations.length)
if (gateIsStale) {
  log('The review\'s corrections touched ' + review.pathsOutsideExplorations.length + ' path(s) outside explorations/ ('
      + review.pathsOutsideExplorations.join(', ') + '); the gate that ran beside it is stale and runs again')
}

if (reviewBlocks) {
  const decision = reviewDecision
  if (!decision || decision.decision !== 'repair') {
    return Object.assign(report, { landed: false, reason: 'review blocking, judge did not order a repair' })
  }
  await agent(PREFIX + mergedRepairRole(decision, 'review'), { label: 'repair:review', phase: 'Review', schema: RUNG_SCHEMA, model: OPUS })
  review = await agent(PREFIX + reviewRole(gather), { label: 'review2', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS })
  report.review2 = review
  if (!review || !review.approved) {
    return Object.assign(report, { landed: false, reason: 'review still blocking after one repair' })
  }
  gateIsStale = true
}

if (gateIsStale || !gate) {
  gate = await agent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate:after-review', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS })
  report.gateAfterReview = gate
}

if (!gate || gate.stopped) {
  return Object.assign(report, { landed: false, reason: 'gate could not run' })
}
if (!gate.green) {
  log('Gate red: ' + gate.failing.length + ' failing; the judge diagnoses on the merged tree')
  const decision = await agent(PREFIX + judgeRole('gate', null, null, null, gate), Object.assign({ label: 'judge:gate', phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(report.reviewJudge)))
  report.gateJudge = decision
  if (!decision || decision.decision !== 'repair') {
    return Object.assign(report, { landed: false, reason: 'gate red, judge did not order a repair' })
  }
  await agent(PREFIX + mergedRepairRole(decision, 'gate'), { label: 'repair:gate', phase: 'Gate', schema: RUNG_SCHEMA, model: OPUS })
  gate = await agent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate2', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS })
  report.gate2 = gate
  if (!gate || !gate.green) {
    log('Gate red after one repair: the batch stops here, nothing pushed; the failing tests and the diagnosis are the record')
    return Object.assign(report, { landed: false, reason: 'gate red twice' })
  }
}

// Commit: hashes into the notes, the gate summary added, push, fast-forward the
// container branch, clean up; or, while a landed rung carries a stop that was met
// and not lifted, the same without the push and the clean-up (pushHeldBy).
const heldBy = pushHeldBy(approved, review)
if (heldBy.length) log('Push held: ' + heldBy.length + ' stop(s) met and not lifted: ' + heldBy.join('; '))
const commit = await agent(PREFIX + commitRole(gather, gate, heldBy), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS })
report.commit = commit
return Object.assign(report, { landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy })
