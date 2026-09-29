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
//
// Every agent() call goes through callAgent (above "The run."), which runs the
// role again, up to two more times, when its agent comes back with nothing
// (2026-09-27; climb-batch-workflow.md, "An agent that comes back with nothing").

export const meta = {
  name: 'fortress-climb-batch',
  description: 'One batch of Fortress compile-ladder rungs in isolated worktrees, each judged by its own skeptic, gathered, reviewed and gated once (suite counts, four-thread atomic runs, ladder regression, the checker count over the interpreter library, and the distance to the switch-over reported beside them) before it lands',
  phases: [
    { title: 'Rung', detail: 'test-first repair in an isolated worktree, committed and pushed to wip/ as it goes; never runs the full gate' },
    { title: 'Skeptic', detail: 'independent judgement with its own walk-vs-compiled differential; one repair round allowed' },
    { title: 'Judge', detail: 'Opus for the first ruling on a rung or on the merged tree, Fable for a second ruling on the same one; only on a stop, a refusal, a blocking review or a red gate: reads the reports and the diff, decides, writes the decision' },
    { title: 'Gather', detail: 'net change of each approved branch applied to main, record folded, one local commit per rung' },
    { title: 'Review', detail: 'the merged diff against the batch rules and the folded record as a whole; runs beside the gate, and a second review after a repair runs beside the commit' },
    { title: 'Gate', detail: 'compileAll, library rebuild, testFast, testSystem, the summary diff, the four-thread atomic runs, the ladder regression, the checker count over the interpreter library, and the distance stage in the background beside them, reported and never red' },
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
// FIFO. k is 2 in each run of this batch (G, P; then E, V), 4 as one run.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order
// only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction, never red) and
// expectedCheckerCrash (compared exactly with the table's #crash field; no
// rung of this batch declares one, so any change of the crash row is red).
// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; no
// rung of this batch sets it. briefing, the rung's briefing, which the
// planner writes from the record so that the agents learn in context what
// they were never trained on: the keys of
// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries
// (positions:DATE WORDS), gap-ledger rows (ledger:ROW) and earlier judges'
// rulings (doc:PATH#HEADING) the rung rests on; the specification's sections
// its subject touches (doc: on a .tex heading); the notes already written on
// the subject, found through INDEX.md (doc:, index:); the library code that is
// the precedent for the same kind of problem (code:PATH#FROM..TO); and the
// FACTS.md entries and map rows and sections of its area; in reading order,
// decisions first; the tool's --help. Relevance, not size, decides what goes
// in. The rung worker reads it whole as its step 1. And checks, the sub-list
// of briefing that the skeptic, the repair round and the judges read as their
// step 1: the decisions and ledger rows their checks need, and the
// specification's sections and the precedent code those checks compare against. No key holds a
// double quote, backtick, dollar sign or backslash, since each is rendered in
// double quotes. Each list is checked with the tool's --check to match exactly
// one place per key (on the tree of 2026-09-28; re-checked at each launch).
// Each briefing key has a one-line reason, why it is there and what the rung
// does with it, rendered at the end of the rung's tail (lists65.py; Pavol,
// 2026-09-28, the process review's measure 5).
//
// Batch 6.5's values are CLIMB-BATCH-6.5.md, sections 3, 6 and 7. Each tail is
// that rung's section of section 3 word for word, with the record's code-span
// backticks dropped (this file carries none), then its briefing's reasons;
// ASCII only. No section carries an answer letter: section 1's one question
// is answered and changes no rung. Three things
// are set at launch and nowhere else: RUN (which run this is: 'first' is
// batch 6.5, rungs G and P; 'second' is batch 6.5b, rungs E and V, cut from
// the tree the first run landed; 'all' is the four as one batch 6.5, on
// Pavol's word, with P's and V's shared specification files ordered as the
// record's section 4 says; the record's section 1, "Two runs"), LEDGER_FROM (the first free ledger
// row at this run's launch; the block refuses to load while it is unset), and
// CHECKER_BASE (the #total of the last landed checker-count.txt, the one the
// gate compares against; the block refuses to load while it is unset).
// Manifest order is the ledger numbering order: G, P in the first
// run; E, V in the second; G, P, E, V as one run. The scatter starts the
// longest expected first (G, P; E, V; G, E, V, P). E, P and G predict the
// checker total unchanged; V declares no prediction and reports its table.
// No rung declares a ladder move. The base is <base>, passed at launch as
// args.base, not written here.
// ===========================================================================

const RUN = 'second'       // SET AT LAUNCH: 'first' (batch 6.5: G and P, landed 2026-09-28), 'second' (batch 6.5b: E and V) or 'all' (the four as one batch 6.5, on Pavol's word only); the record's section 1, "Two runs"
const LEDGER_FROM = 519   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch (519: row 518 the highest after batch N's first run landed, 3fb0cd8c1)
if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\'s launch')
const CHECKER_BASE = 75   // SET AT LAUNCH: the #total of the last landed checker-count.txt (75 in climb-batch-N/gate/, batch N's first run's landed table, for the second run)
if (!Number.isInteger(CHECKER_BASE)) throw new Error('CHECKER_BASE is not set: the #total of the last landed checker-count.txt')

if (!['first', 'second', 'all'].includes(RUN)) throw new Error('RUN is not one of first, second, all')
const BATCH = RUN === 'second' ? '6.5b' : '6.5'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-6.5.md'

const E_TAIL = [
"",
"## Your rung: E - a value beyond its type's range",
"",
"SLUG is rung-size-range. WORKTREE is /home/user/fortress-sizerange, branch wip/rung-size-range.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.5.md, section 3, under \"E. A value beyond its type's range\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Section 1's one question is answered, and it changes nothing in this rung. Pavol's decision on item 25, that a size used as a value converts to ZZ32 as a numeral does, came after this section was first written; it agrees with the type this rung keeps, and it is where this rung meets batch N (below). Batch N's first run (rungs I, K, T and M) has landed under this run's base, so what it built is named below, with its other meetings with this rung. Pavol's decision of 2026-09-29 on that run puts in this rung the tests it owes for rows 447 and 505 (below, \"The tests batch N's first run owes\").",
"",
"**The problem.** Values beyond their type's range are not refused, or not as the specification says, in four places.",
"- A size. The compiled checker accepts a literal size of any magnitude: it refuses arithmetic in a size and nothing else (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:41-48, :107-108, :144-145); the loader reads a size read as a value back at any magnitude, choosing an int, a long or a String by bit length (ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java:225-241); and ProjectFortress/compiler_tests/NatRtBigSize.fss gates sizes up to 18446744073709551615. Under walk a size is made by IntNat.make(n.getIntVal().getIntVal().intValue()) (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:443), which keeps the low 32 bits: 3000000000, an NN32 value, is refused as \"Negative nats are unNATural\" by the check at :251-256, and 4294967296 silently reads as 0 (row 418, which says this site was not located; it is :443, by reading). Row 418's expected failure, ProjectFortress/tests/XXXNatBigSizeWalk.fss, asserts that 4294967295 and 3000000000 read back.",
"- NN32's LCM under walk. NN32$Lcm hands its int operands to UnsignedLong.gcd sign-extended (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java:149-154), where NN32$Gcd widens them first with Unsigned.toLong (:143-147). So 2147483648 LCM 7 answers 2147483646, where the multiple, 15032385536, does not fit (explorations/compile-ladder/plan-6.5/probes/lcm/NN32Lcm.walk.txt; explorations/compile-ladder/plan-6.5/NOTES.md section 5). No ledger row holds it.",
"- Nine more natives under walk. Rung O made walk's arithmetic natives raise the catchable IntegerOverflow and listed, by reading, the ten natives of the same four files that still do not, NN32$Lcm among them (explorations/compile-ladder/rung-overflow-natives/REPORT.md section 3; explorations/reviews/batch-6b-7-conformance.md finding 3). Int$Pow and Int$Choose call Int.rc, whose error no catch sees (row 347; ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:220-230, :152-156, :250-256), and Int.pow multiplies in a long that can wrap before rc reads it (:361-372). Long$Pow and Long$Choose wrap silently, through Int.pow and Int.choose (Long.java:232-242, :164-168; Int.java:328-346). NN32$Choose and NN32$Pow call NN32.rc, uncatchable (NN32.java:157-161, :226-236, :262-267), and by reading hand their int operands to UnsignedLong sign-extended, as Lcm does. UnsignedLong$Lcm, $Choose and $Pow wrap silently (UnsignedLong.java:150-162, :227-237, :297-328). None is measured. The one row that names them is row 379, closed by rung O, in its closing note; row 347 holds Int.rc.",
"- Range bodies at the integer bounds under walk (rows 450 and 451). Since rung O, three bodies of the one library that answered right at the bounds only because an intermediate wrapped raise IntegerOverflow, on ZZ32, the one integer type of a range's components since batch 7R: sized1Range's lo+ex-1 (Library/RangeInternals.fss:1379, its twins at :1381 and :1383), so that MAX # 1 raises, and MIN # 0, empty by the specification, too; CompactFullScalarRange's size, which computes the distance before it tests emptiness (:953-958), so that (1:MIN).size raises; and CompactFullRange's |self| (Library/FortressLibrary.fss:3918-3920), so that |1:MIN| raises. By reading, the strided size has the same shape (Library/RangeInternals.fss:1120-1124). A sequential range steps past its last element, i += 1 (:1040, :1048) and i += str (:1261, :1267, :1277, :1283), so it cannot end at the maximum (row 451). The expected failures ProjectFortress/tests/XXXRangeBoundsRungO.fss, XXXRangeEmptyHashRungO.fss and XXXSeqRangeTopRungO.fss gate them. At the switch-over the compiled path runs these bodies (explorations/reviews/batch-7R-conformance.md finding 5); the compiler prelude's own midpoint, row 453, leaves with the prelude and is not this rung's.",
"",
"**Beside the range bodies, the tuple shifts (row 503).** Six shifts of the ranges of rank 2 and 3 add or subtract the whole shift tuple where one component was meant: LeftRange3D's shiftLeft and shiftRight write l_k-amount and l_k+amount (Library/RangeInternals.fss:637, :641), RightRange3D's r_k-amount and r_k+amount (:751, :755), and StridedFullRange2D's r_i-amount, r_j-amount and r_i+amount, r_j+amount (:1316, :1320), each body having split amount into shift_i, shift_j and shift_k on the line before. The compiled checker refuses the six calls, six of the landed distance stage's typecheck errors (explorations/compile-ladder/climb-batch-6.5/gate/distance-sites.tsv:284-286, :294-296); under walk they were read, never run (explorations/compile-ladder/rung-int-semantics-walk/JUDGE.md, the first section 7). The row opens with this rung's probe. The six bodies are not among this rung's files, and their repair goes with batch 8's residue (the row's note).",
"",
"**The tests batch N's first run owes (rows 447 and 505).** Batch N's rung I keeps the expected type at a call written f(x) and ranks a generic declaration by its declared domain among the declarations reached only by coercion, and so newly compiles two programs in which a type parameter that nothing at the call fixes is bound to BottomType; both then die in the JVM (explorations/compile-ladder/rung-inference-checker/REPORT.md section 6.6, and section 8, items 11 and 12):",
"- c1(): ZZ32 = fAny(), with fAny[\\T extends Any\\](): T = throw InvalidRange, which the base refused \"without context\", compiles and fails JVM verification at load, \"java.lang.VerifyError: Bad return type\", before any output; walk prints c1: -1, on the merged tree too (explorations/compile-ladder/rung-inference-checker/probes/skeptic/SkBottomRun.fss, SkBottomRun.diff.txt:4-6, :26, :38; explorations/compile-ladder/climb-batch-N/merged-tests/review-bottom-walk.txt:7-8). Row 505.",
"- q(NOf(1)), with q[\\T\\](x: W1): BoxT[\\T\\] beside q(x: W2): Any, compiles and dies loading its instance, \"NoClassDefFoundError: java/lang/Object$RTTIc\"; the base printed q(W2), and walk since rung K takes the generic, as decision 1's choice on declared types does, and prints q: other (explorations/compile-ladder/rung-inference-checker/probes/repair/SigmaResultOnly.fss, SigmaResultOnly.diff.txt:6-7, :23; review-bottom-walk.txt:4). Row 447.",
"",
"The rung filed both at home 3: the inference chapter leaves open whether inference may give such a parameter BottomType (Specification/basic/inference.tex:191-196, with the team's note at :226-236). Batch N's second merged-diff review blocked on them (explorations/compile-ladder/climb-batch-N/RECORD.md, \"The landing\", \"The second review\"): under the reading that it may, the programs run, as walk runs them; under the reading that it may not, they are refused statically; and no reading gives a clean compile followed by a failure in the JVM. That is the standard batch N's judge applied to move row 325's MAX face to home 2 (explorations/compile-ladder/climb-batch-N/JUDGE-review.md section 2.2), so each program owes the pair of that ruling's form (its section 2.4): a plain link test, which goes red if the checker refuses the program, and an XXX run test, which goes red if the program runs (FACTS.md, \"The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only, and a run-time defect needs two .test files\"). Batch N landed on its green gate with the finding carried to the next batch, and Pavol put the tests in this run (POSITIONS 2026-09-29, batch N's first run). They are this rung's because it is the rung of this run that builds and runs the compiled path, writes its tests in ProjectFortress/compiler_tests/ and touches the checker for a size's range, the checker whose inference makes the binding; rung V is checked under walk and edits declarations. They are test-only work: what a parameter nothing fixes is bound to, refused at the call or given a run-time descriptor, stays Pavol's (explorations/coordinator/PLAN.md item 18; rows 447 and 505), and nothing this rung writes decides it.",
"",
"**The decisions.** A size's range (explorations/coordinator/POSITIONS.md, 2026-09-27, a size's range): a nat parameter is an NN32 value and an int parameter a ZZ32 (Specification/basic/trait-parameters.tex:82-90); a larger one is refused. GCD and LCM (2026-09-22, ledger row 334): nonnegative results, and an overflow error when the multiple does not fit, on both paths; under walk the error is the catchable IntegerOverflow of climb batch 3.5's rung I (FACTS.md, \"Under walk, a native can raise a Fortress exception that a Fortress catch sees\"). The nine natives: the specification settles them, \"For integer results, overflow throws an IntegerOverflow\" (Specification/basic/operators/opr-overview.tex:154-155), a power of an integer being an integer (Specification/basic-lib/basic-integers.tex:527) and CHOOSE a binomial coefficient (:596-598); walk raises the catchable IntegerOverflow by the rule of Pavol's decisions on row 379 and on the unsigned types (POSITIONS 2026-09-24, ledger row 379; 2026-09-26, the fifth batch-5 answer), with the count of interpreter tests whose output changes measured and brought to him if not zero. Rows 450 and 451: reorder and keep the checked operators, as he decided for the strided distance (2026-09-26, rung O of climb batch 4), emptiness tested before the distance and MIN # 0 built without lo-1 (the rows' notes). Not this rung's: the type a size read as a value has on the compiled path, the checker's IntLiteral (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:64-70), which stays: Pavol's decision on item 25 (POSITIONS 2026-09-28, PLAN item 25) converts a size used as a value to ZZ32 as a numeral does, the checker already types it as one, and batch N builds the conversion (section 1, \"A size used as a value\"); the array design's refusal of a JVM array length over 2^31-1, which is phase 5's; the power's declared result type (row 438); and a negative power (row 441, his to choose), whose branch in each Pow stays as it is. The tests of rows 447 and 505: Pavol's decision on batch N's first run (POSITIONS 2026-09-29) puts them in this run, and the three homes put a deferred defect's test in the batch that measures it (explorations/coordinator/climb-batch-workflow.md, \"What a measured defect is worth\"); what a type parameter nothing at the call fixes is bound to is his (explorations/coordinator/PLAN.md item 18), and the tests leave it open.",
"",
"**Where this rung meets batch N (item 25).** Pavol's words on item 25 refuse \"a larger size used as a value ... as an oversized numeral\" (POSITIONS 2026-09-28, PLAN item 25). This rung's restated NatRtBigSize (sz64[\\nat k\\](b: Box[\\k\\]): ZZ64 = k) and row 418's promoted walk test (size64, the same shape) read sizes from 2^31 to 2^32-1 back as values into ZZ64. Whichever of this run and batch N lands second names the other's test (explorations/coordinator/CLIMB-BATCH-N.md section 4, \"Against batch 6.5's second run\"), and batch N's first run landed first. What it built:",
"- Rung I (8dc1a74d9) converts a size used as a value as it converts a numeral: isNumeral covers it, the checker typing it as a numeral (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:403-406; KindEnv.scala:67-68), and a numeral tie reads it as ZZ32, since it has no value at hand (explorations/compile-ladder/rung-inference-checker/REPORT.md section 3.3). It landed no gated test of a size used as a value: its probe gives pick(n, l) for l: ZZ64 at ZZ64,ZZ64 and pickn(n) at ZZ32 (explorations/compile-ladder/rung-inference-checker/probes/sizevalue/SizeValue.base.txt, SizeValue.after.txt; row 485's note), and NatRtBigSize kept its verdict on I's tree, alone and in the suite-shaped runs, since its sizes are read at a declared return type, where no inference or tie of the rule applies (REPORT.md sections 5 and 9).",
"- Rung T (f54ffac90) wrote item 25 into the ranges section: a nat or int parameter used as a component converts to ZZ32 as an integer numeral does (Specification/basic/expressions/ranges.tex:46-58), and Appendix I's \"Passages not yet revised\" says the ranges a nat parameter bounds stand as written (Specification/appendices/changes.tex:1727-1731).",
"- Rung K (041682188) placed row 486's expected failure, ProjectFortress/tests/XXXNatValueNN32RungK.fss: walk refuses u: NN32 = n for a size n, whose value is walk's Int; its fix is batch N's rung Q's, in its second run.",
"- Batch N's judge kept row 325's nat size face at home 3: a size above ZZ32 used as a range component, seq(n#2) in bigFirst[\\3000000000\\](), where neither the decision nor the specification says where such an instance is refused; walk answers \"Negative nats are unNATural: -1294967296\" there, which is row 418's wrap (explorations/compile-ladder/climb-batch-N/JUDGE-review.md section 2.3; explorations/compile-ladder/rung-spec-inference/probes/skeptic/SkRangeBig.fss, SkRange-base.txt:3-5).",
"",
"So by reading, no path on this rung's base refuses a read of a size from 2^31 to 2^32-1 into ZZ64 at a declared type, and NatRtBigSize's restated lines stand as this section plans them; the rung confirms that on its base, and a read its base refuses keeps its lines in a type and in dispatch, its value read moving to the refusal test with the base's message and listed with its before and after, since that refusal is item 25 as batch N built it and not this rung's change. The refusal of an oversized size used as a value has no place decided (the judge's section 2.3), so this rung builds none. The rung lists every read of a size beyond 2^31-1 as a value, in both tests and in SkRangeBig, which it runs under walk on its base and after its edit, as the lines where the two batches meet; walk's changed answer there is a note on row 325.",
"",
"**Where this rung meets batch N's other edits.** Batch N's first run edited none of this rung's declarations; it meets them through what it built.",
"- CompactFullRange's opr |self| (Library/FortressLibrary.fss:3918-3920) computes 0 MAX ((u - l') + 1) at ZZ32, which since rung M (2770550c3) is ZZ32's own MAX (Library/FortressLibrary.fss:708, api Library/FortressLibrary.fsi:527), not StandardTotalOrder's. The repaired body keeps the operator it calls at ZZ32, and ProjectFortress/tests/IntegerMinMaxRungM.fss stays green.",
"- Rung T re-anchored the messages of the three range tests this rung promotes, and of RangeZZ32RungJ.fss, to the ranges section it revised (ranges.tex:61, :78-79, :140-143); the promotions keep them as T left them.",
"- Rung K changed how walk infers a generic's static arguments (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java, inferAndInstantiateGenericFunction), converts at a generic declaration (interpreter/evaluator/values/Coercions.java, coercionFor) and re-instantiates the declaration it chose (interpreter/evaluator/values/OverloadedFunction.java, bestMatchInternal). A size inferred from an argument's type, as in sz64(Box[\\2147483648\\](0)), reaches K's inference after EvalType has made it. If walk's reading of a size needs one of K's files, the rung names it and re-reads it on its base, and K's tests keep their verdicts (InferCoercionRungK.fss and the expected failures XXXNatValueNN32RungK.fss, XXXInferExpectedTypeRungK.fss, XXXInferVarargsRungK.fss, XXXCoercionOwnStaticRungK.fss).",
"- Rung I edited Functionals.scala, Operators.scala, STypesUtil.scala, CoercionOracle.scala and TraitTable.scala under scala_src/. If the refusal of a size needs one of them, the rung names it and re-reads it on its base; the owed tests reach I's inference and change none of it.",
"- Batch 6.5's rung P and batch N's rung T revised Specification/basic-lib/basic-integers.tex; the natives test's messages cite it as it now stands (the power at :527, CHOOSE at :596-598).",
"- The owed tests come from rung I's probes and batch N's review, above.",
"",
"**What the tree already does.** Evidence, not the brief; the rung lists every way before it chooses. The checker's refusal of arithmetic in a size, its message and its expected-failure compile test (ProjectFortress/compiler_tests/XXXNatArithChecker.fss with .test, pinned by compile_err_contains), are the precedent for a refusal at a size and for its test. Walk refuses a negative size at EvalType.java:251-256, where the kind of the parameter is known. NN32$Gcd's widening is the file's own device for LCM. The helper of ProjectFortress/tests/IntSemanticsRungI.fss, which catches nothing but IntegerOverflow, is the precedent for asserting a catchable overflow under walk. For the natives: rung O's devices (FACTS.md, \"Under walk, fixed-width integer arithmetic raises IntegerOverflow when the result does not fit\"), Math.*Exact with Int.overflow() for the signed widths and the compiled helpers' tests for the unsigned; Int$Lcm and Int.lcm, which already raise (Int.java:144-150, :276-286); and the compiled path's own power and binomial, which raise IntegerOverflow (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:380-398, intToIntPower; :203-220, intOverflowingChoose; simpleLongArith.java:177-194; simpleUnsignedIntArith.java:80-82). For the range bodies: the library's own reorders, the strided distance ((hi BITAND (BITNOT (split DOTMINUS 1))) - 1) - lo (Library/RangeInternals.fss:1164, :1184, :1205, :1229) and meetingPoint, which \"tries to avoid overflow\" (:59-80); and the local fix rung O's judge applied to show the tests red, written before batch 7R respelled the file (explorations/compile-ladder/rung-overflow-natives/probes/repair/local-fix.sh). For the owed tests: batch N's pairs, ProjectFortress/compiler_tests/XXXNumeralBeyondWidthMax.fss with XXXNumeralBeyondWidthMax.test (run, run_out_contains=REACHED) and NumeralBeyondWidthMaxLink.test (link), shown red on a stand-in that differs from the placed file by one change that makes the program run (explorations/compile-ladder/climb-batch-N/REPAIR-review.md; explorations/compile-ladder/climb-batch-N/merged-tests/standin-repair/compiler/), and rung I's XXXInferContextKeepsFit with InferContextKeepsFitLink.test, the same form; the programs are rung I's probes, named above.",
"",
"**The test, first.** Each captured failing before the edit.",
"- In ProjectFortress/compiler_tests/: an expected-failure compile test in the shape of XXXNatArithChecker, with sizes beyond NN32 at nat parameters and beyond ZZ32 at int parameters, in a type, as a written static argument and as a value, pinned by compile_err_contains on the refusal's message; and NatRtBigSize.fss restated to NN32's range, 2147483647, 2147483648, 3000000000 and 4294967295 reading back and dispatching as today, its three lines beyond 4294967295 moved to the refusal test. NatRtBigSize is a revival test; each changed line is listed with its before and after.",
"- In ProjectFortress/tests/: row 418's XXXNatBigSizeWalk.fss promoted by git mv to a plain name, its component renamed, once walk reads it; a walk case beyond the range refused, in a form the harness gates (FACTS.md, \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\"); for the natives, one test in the form of IntSemanticsRungI.fss: 2147483648 LCM 7 on NN32 raises IntegerOverflow, as each of the other nine does on a result that does not fit its width (a power, a binomial coefficient, a 64-bit unsigned multiple), and the results that fit are right; and the three expected failures of rows 450 and 451 promoted by git mv to plain names once they pass, their components renamed and no assertion changed.",
"- For row 503: a probe under walk of the six shifts, on a range of each of the three kinds, captured under probes/; if they fail as read, one XXX walk test in ProjectFortress/tests/ that asserts each shifted range moved component by component, citing row 503 and the api's shiftLeft and shiftRight (Library/FortressLibrary.fsi:2131-2134), shown failing on the base. The six bodies stay as they are.",
"- For rows 447 and 505, in ProjectFortress/compiler_tests/: each of the two programs as one component with two .test files, a plain link test and an XXX run test, in the form of batch N's pairs; c1's run test in the form the harness takes for a run that fails before any output (the review reads it as needing no REACHED key; FACTS.md's entry on the mechanism says what the harness demands when no key is set), and q's printing its marker before the call. Each pair placed and run through the harness on the base, the link test passing and the run test an expected failure for the JVM's reason, and each run test shown red on a stand-in whose one change makes the program run (batch N's stand-ins wrote the static argument). Neither test asserts what the parameter is bound to, or which declaration's answer the program prints, since item 18 decides those; each run test fails only while the program dies in the JVM. Each message cites its row and Specification/basic/inference.tex:191-196.",
"",
"**The measurements.** The sized compiled tests (ProjectFortress/compiler_tests/Nat* and their expected failures) before and after; the 85 files of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt under the subset driver, phase and stdout, before and after; the interpreter corpus, every file of ProjectFortress/tests/, in three passes (base A, the edit, base B), as rung O compared it (its REPORT.md section 8), every changed output listed with its cause, since the natives and the range bodies reach programs no grep names and the decision on row 379 asks for the count; row 503's probe; the owed pairs through the harness on the base, placed and on their stand-ins, and each program under walk; SkRangeBig under walk on the base and after the edit; the two microGPT checks; the checker count after, beside the landed gate's table (below).",
"",
"**Files it may touch.** Under ProjectFortress/src/com/sun/fortress/scala_src/, the checker files the refusal needs, each named; ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java, only if the value emission must change, the reason reported; ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java and what else under interpreter/evaluator/ walk's reading needs, each named; ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java, Long.java, NN32.java and UnsignedLong.java, their Lcm, Choose and Pow classes and the helpers those call (rc, pow, choose), each named; in Library/RangeInternals.fss, the bodies rows 450 and 451 name (sized1Range to sized3Range, the size getters of CompactFullScalarRange and StridedFullScalarRange, and the generate and loop of CompactFullSeqScalarRange and StridedFullSeqScalarRange), and in Library/FortressLibrary.fss, CompactFullRange's opr |self| only; NatRtBigSize.fss, the renamed row 418 test, the three renamed range tests and the rung's new tests, among them the owed tests of rows 447 and 505 in ProjectFortress/compiler_tests/ (two components, four .test files); its own directory. Stops: ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java (the checker-count tool keeps a copy checked against it, explorations/coordinator/tools/checker-count/run.sh:44); any other line of Library/; ProjectFortress/LibraryBuiltin/, Specification/.",
"",
"**Java or Scala.** Both. ant compileAll, then the library-order cache rebuild before any compiled test (explorations/repo-internals.md), and default_repository/caches/global.map restored after compileAll (FACTS.md, \"ant compileAll deletes a tracked file\").",
"",
"**The checker count.** Unchanged by reading: the one library's own sizes are the literals 0 to 3 (FACTS.md, \"A size at run time can follow the opr path, 28 lines, and a size in value position is 25 more\"), and the range bodies keep their declared types; a moved row is tied to an edit. Before: the last landed gate's checker-count.txt, the table the gate itself compares against (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: climb-batch-7C/gate/ for the first run; for the second, climb-batch-N/gate/, batch N's first run's, which landed after the first), not a run of the stage on the rung's unchanged base; after: captured on the rung's tree (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken; the intro says when the base has changed under the table).",
"",
"**What must stay green, or keep its verdict.** Every compiled and interpreter test other than the rung's own, NatRtBigSize and the three promoted range tests; IntSemanticsRungI.fss, UnsignedTest.fss, WrapOperatorsRungD.fss, FixedWidthOverflowRungB.fss, RangeZZ32RungJ.fss, RangeSizeRungO.fss; batch N's tests that the rung's edits reach, each keeping its verdict: IntegerMinMaxRungM.fss, InferCoercionRungK.fss, and the expected failures XXXNatValueNN32RungK.fss (row 486, whose fix is batch N's rung Q's) and XXXIntegerMaxNumRungM.fss (row 517) in ProjectFortress/tests/, and rung I's compiled tests that hold sizes, NatLitArgChecker and InferCoercionShapes; the two microGPT checks, at 40 of 40.",
"",
"**Stops.** A library declaration newly refused. A test's verdict changing other than the rung's own, NatRtBigSize's restated lines and the three promoted range tests. A size inside NN32 or ZZ32 that stops reading back or dispatching. The type of a size read as a value changed. An interpreter output the natives or the range bodies change, and a library body or team test found to rely on a native's wrap (the decision on row 379 brings the count to Pavol). A range whose elements all fit its type answering other elements or another size than on the base. A negative power's branch or the power's declared type changed (rows 441, 438). For the owed tests of rows 447 and 505, an edit to the checker's inference or solver or to the run time, or an assertion of what a parameter nothing at the call fixes is bound to (item 18, Pavol's). An edit to a file not named above. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** Walk against the compiled run at the NN32 boundary (2^31-1, 2^31, 2^32-1, 2^32) and the ZZ32 boundary of an int size (both signs), in a type, in a written static argument, as a value and in dispatch; LCM on NN32 and NN64, ^ and CHOOSE on the four widths, at the boundary, walk against the compiled run; the range forms of rows 450 and 451 at MIN and MAX and ranges well inside the bounds, walk on the edit against the base, and the promoted tests' assertions unchanged; the refusal messages, and whether an int size's message names int (batch 3.5 and 4's review saw the arithmetic refusal name nat for int, row 307's note); NatRtBigSize's old and new lines, and the reads of a size beyond 2^31-1 as a value listed where this rung meets batch N; row 503's probe against the six lines, and its XXX test, if written, failing for the tuple's reason; the owed pairs through the harness, placed and on their stand-ins, each program under walk, and neither test asserting what item 18 decides; SkRangeBig under walk on the base and the edit; the comparison's changed outputs against their stated causes.",
"",
"**What comes back to Pavol.** The refusal's message on each path; NatRtBigSize's restated lines; the count of interpreter outputs the natives and the range bodies change, with any library body or team test that relied on a native's wrap; the owed pairs of rows 447 and 505, with their placed and stand-in runs; walk's answer on row 325's nat size face after the edit.",
"",
"**What it closes.** Rows 418, 450 and 451 (fixed; their expected failures promoted); row 347 if Int$Choose and Int$Pow were Int.rc's last uncatchable callers, as the review reads. Opens and closes, home 1, two provisional rows: NN32's LCM with sign-extended operands; the nine natives of rung O's list that raise no catchable IntegerOverflow (Int$Pow, Int$Choose, Long$Pow, Long$Choose, NN32$Choose, NN32$Pow, and UnsignedLong's Lcm, Choose and Pow, with Int.pow's wrap in a long). Notes: row 307, what the int refusal says; rows 447 and 505, the tests of the two shapes batch N's rung I newly compiles, the rows staying open for item 18; row 325, walk's answer on its nat size face after this rung's reading; row 453, that the one library's bodies no longer overflow where the prelude's still do; row 503, the probe's answer and its test; row 418, the lines where it meets item 25.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-27 size's range: The decision this rung builds: a nat parameter is an NN32 value, an int one a ZZ32, a larger one refused; cite it in every refusal and every restated NatRtBigSize line.",
"- positions:2026-09-28 size used as a value: Pavol's item 25: a size used as a value converts to ZZ32 as a numeral does, built by batch N's rung I; keep the checker's IntLiteral, and list each read of a size beyond 2^31-1 as a value, where batch N meets you.",
"- positions:2026-09-29 batch N's first run: Pavol's decision that puts in your rung the tests batch N's first run owes for rows 447 and 505; write both pairs, and decide nothing about what the parameter is bound to.",
"- positions:2026-09-22 ledger row 334: The decision for GCD and LCM, nonnegative and IntegerOverflow when the multiple does not fit, on both paths; NN32's and NN64's LCM follow it.",
"- positions:2026-09-24 ledger row 379: The decision that walk raises the specification's catchable IntegerOverflow in its natives, the count of changed interpreter outputs measured and brought to Pavol; your natives follow it.",
"- positions:2026-09-26 fifth batch-5 answer: The unsigned types follow the signed ones, overflow raising IntegerOverflow; the rule for NN32's and NN64's LCM, CHOOSE and power.",
"- positions:2026-09-26 rung O of climb batch 4: The device for rows 450 and 451, decided for the strided distance: reorder so that no step leaves the range and keep the checked operators; apply it to each range body.",
"- positions:2026-09-24 run-time size design: Design B, a size at run time is a descriptor; the loader's reading of a size value rests on it, so keep the descriptor if you touch MethodInstantiater.",
"- positions:2026-09-26 fourth batch-5 answer: The descriptor factory RTTIsize.of; a size inside NN32 must still reach it, so check dispatch near the bound goes through it.",
"- positions:2026-09-21 nat plan: Where an unknown size is an error; your refusal sits beside that rule and refuses no size the plan leaves alone.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your checker count's before: the last landed gate's table, not a run of the stage on your unchanged base; capture only the after.",
"- ledger:418: Walk's truncation of a size, which you fix; its expected failure XXXNatBigSizeWalk is the test you promote.",
"- ledger:334: The GCD and LCM row with its evidence; the unsigned LCM you fix is its last unfixed face.",
"- ledger:347: Int.rc's uncatchable error, still reached from Int$Choose and Int$Pow; it closes if your fix leaves no uncatchable caller, which you show.",
"- ledger:450: The three range bodies that relied on wrapping, their tests and their fix; you repair them and promote the two tests.",
"- ledger:451: The sequential step past the last element, its test and its fix; you repair it and promote the test.",
"- ledger:503: The six tuple shifts beside your range bodies, refused by the checker and never run under walk; probe them under walk and give a failure its XXX test, the bodies unedited.",
"- ledger:447: A type parameter nothing at the call fixes, bound to BottomType; q(NOf(1)) is its new shape, owed a link and an XXX run test by you; its candidates stay Pavol's (PLAN.md item 18).",
"- ledger:505: The solver's two behaviours by bound; c1(): ZZ32 = fAny() is its run-time face, owed a link and an XXX run test by you; the solver stays as it is.",
"- ledger:438: Integer power declared RR64: not yours, so leave the power's declared type as it is.",
"- ledger:441: A negative power's result, Pavol's to choose: leave the negative branch of each Pow native as it is.",
"- ledger:307: The checker's nat and int handling, with the note that the arithmetic refusal names nat for an int; say what your int refusal says.",
"- doc:explorations/compile-ladder/rung-size-runtime/JUDGE.md#For Pavol: The judge who read sizes back at any magnitude; the decision on a size's range reverses that reading, so know what it did.",
"- doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@size's range: The finding that brought a size's range to Pavol; your restated NatRtBigSize answers it.",
"- doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@size-range: The review's proposed fix, a refusal beside the arithmetic refusal; the record keeps the checker's IntLiteral type, so take the refusal and not the retyping.",
"- doc:explorations/reviews/batch-3.5-4-conformance.md#Smaller findings, for the record@sign-extended operands: Where NN32 LCM's sign extension was first seen, with its fix, widening as Gcd does.",
"- doc:explorations/reviews/batch-6b-7-conformance.md#Findings@Nine natives still give no catchable: The finding that widened this rung to the nine natives, with its evidence by reading; your tests are their first measurement.",
"- doc:explorations/reviews/batch-6b-7-conformance.md#Findings@Rows 450 and 451 have a decided repair: The finding that placed rows 450 and 451 in this batch; check your repair covers every body it names.",
"- doc:explorations/reviews/batch-7R-conformance.md#Findings@Rows 450 and 451 have no batch: Why the repair matters beyond walk: the compiled path runs these bodies at the switch-over.",
"- doc:explorations/compile-ladder/climb-batch-N/JUDGE-review.md#2.2 What the specification settles, face by face: The standard batch N's review applied to rows 447 and 505: no reading gives a clean compile and then a crash in the JVM; the reason each program owes its pair.",
"- doc:explorations/compile-ladder/climb-batch-N/JUDGE-review.md#2.3 The nat size face stays home 3: Where item 25 is silent: an oversized size used as a value has no place of refusal decided; build none, and record walk's answer on SkRangeBig after your reading.",
"- doc:explorations/compile-ladder/climb-batch-N/JUDGE-review.md#2.4 The form: The pair's form, a plain link test and an XXX run test over one component; your owed tests take it.",
"- doc:explorations/compile-ladder/climb-batch-N/RECORD.md#The landing@The second review: Batch N's record of its second review's finding on rows 447 and 505, carried to this run by Pavol's rule; the finding your owed pairs answer.",
"- doc:explorations/compile-ladder/rung-inference-checker/REPORT.md#6.6 The solver's two behaviours, and a size used as a value: Rung I's c1 measured, and its conversion of a size used as a value, the half of item 25 your base carries; your tests start from both.",
"- doc:explorations/compile-ladder/rung-inference-checker/REPORT.md#8. Every defect measured, and its home@A call the rule newly types: The two shapes rung I newly compiles and the JVM refuses, filed at home 3; your pairs are their home-2 tests.",
"- doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters: The specification's sentence the refusal rests on; cite it in every refusal message and assertion.",
"- doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators: The specification's GCD, LCM and CHOOSE; cite it in the natives test's messages.",
"- doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie: The numeral tie read as ZZ32, where a size used as a value reads too, and the chapter leaving open whether inference may give BottomType; cite it in the owed tests' messages.",
"- doc:Specification/basic/expressions/ranges.tex#Ranges: The specification's ranges, a:b, a#n and the size, sets whose every element fits; the answers your repaired bodies give at MIN and MAX.",
"- doc:explorations/compile-ladder/plan-6.5/NOTES.md#5. NN32's LCM: The probe that measured NN32's LCM wrapping; your test restates its case as an assertion.",
"- doc:explorations/compile-ladder/plan-6.5/NOTES.md#7. What was not probed: What the planner left to you: walk's size site, which you measure, and the type of a size value, which stays.",
"- doc:explorations/compile-ladder/plan-6.5/probes/lcm/NN32Lcm.walk.txt: The base's 2147483648 LCM 7 answering 2147483646; your failing test reproduces it.",
"- doc:explorations/compile-ladder/rung-inference-checker/probes/skeptic/SkBottomRun.fss: The program of row 505's run-time face; your owed pair places it.",
"- doc:explorations/compile-ladder/rung-inference-checker/probes/skeptic/SkBottomRun.diff.txt: Its VerifyError at load compiled, the base's refusal and walk's c1: -1; what your placed run test must show.",
"- doc:explorations/compile-ladder/rung-inference-checker/probes/repair/SigmaResultOnly.fss: The program of row 447's new shape; your owed pair places it.",
"- doc:explorations/compile-ladder/rung-inference-checker/probes/repair/SigmaResultOnly.diff.txt: Its NoClassDefFoundError compiled against the base's q(W2); what your placed run test must show.",
"- doc:explorations/compile-ladder/climb-batch-N/merged-tests/review-bottom-walk.txt: Both programs under walk on batch N's merged tree, c1: -1 and q: other; neither answer is asserted by your tests.",
"- doc:explorations/compile-ladder/rung-spec-inference/probes/skeptic/SkRangeBig.fss: Row 325's nat size face, a size above ZZ32 used as a range component; run it under walk before and after your reading of sizes.",
"- doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#3. The precedent search: Rung O's devices for the natives, and its list of the ten it left; use its devices for yours.",
"- doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#8. The comparison: How rung O compared the interpreter corpus for its natives; run the same three passes.",
"- doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#9. The logging pass: Rung O's logging pass, which found the bodies that relied on a wrap; say whether yours needs one, and why.",
"- doc:explorations/reviews/wrap-dependent-code.md#The library's own ways: The library's own ways to avoid an overflow, reorder, meetingPoint, floorAverage; choose among them for each range body, never a wrapping operator.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala#private val sizeArithmetic..private def hasSizeArithmetic: The checker's refusal of arithmetic in a size, the precedent for where a size refusal sits and how it reads; put yours beside it.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala#def getType: Where the checker types a size value as IntLiteral; it stays, and changing it is a stop.",
"- code:ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java#public void visitMethodInsn: The loader's reading of a size value by bit length; change it only if the emission must, and report why.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#public static void bindGenericParameters: Walk's negative-size check, where the parameter's kind is known; the precedent for walk's refusal.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#public FType forIntArg: Walk's size site, IntNat.make of intValue(), which keeps the low 32 bits; the line row 418 needs fixed.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java#public static final class Gcd extends NN2N..public static final class Choose extends NN2N: NN32's Gcd, Lcm and Choose: Gcd's Unsigned.toLong is the file's own widening for Lcm's and Choose's sign-extended operands.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java#public static final class Pow extends NativeMeth1: NN32's power, which calls NN32.rc and hands UnsignedLong a sign-extended base; you fix both.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java#public static int rc(long i): NN32.rc's error, which no catch sees; replace its use with the catchable raise.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static final class Lcm extends ZZ2Z..public static final class Choose extends ZZ2Z: Int$Lcm already raises catchably, the model; Int$Choose calls Int.rc, which you fix.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static final class Pow extends NativeMeth1: Int$Pow, rc over a power computed in a long; fix both the uncatchable error and the long's wrap, the negative branch untouched.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static int rc(long i)..public static FortressError overflow(): Int.rc beside Int.overflow(), the catchable raise every fixed native uses.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long lcm(long u, long v): Int.lcm's guards, the file's own check of a multiple that does not fit.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long choose(long n, long k): The shared binomial helper, which multiplies before it divides and can wrap; ZZ32's and ZZ64's CHOOSE reach it.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long pow(long x, long y): The shared power helper, unchecked in a long; ZZ32's and ZZ64's power reach it.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Long.java#public static final class Lcm extends LL2L..public static final class Choose extends LL2L: Long$Lcm already raises through Int.lcm; Long$Choose wraps through Int.choose, which you fix.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Long.java#public static final class Pow extends NativeMeth1: Long$Pow wraps through Int.pow; you make it raise, the negative branch untouched.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java#public static final class Gcd extends UU2U..public static final class Choose extends UU2U: NN64's Lcm, an unchecked multiplyToLong, and Choose; you make both raise.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java#public static final class Pow extends NativeMeth1: NN64's power, unchecked; you make it raise, the negative branch untouched.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java#public static long choose(long n, long k)..public static long pow(long x, long y): The unsigned binomial and power helpers, which NN32's natives also call; where an unsigned check goes.",
"- code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java#public static int intToIntPower(int a, int b): The compiled path's ZZ32 power, which raises IntegerOverflow; the team's own checked power.",
"- code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java#public static int intOverflowingChoose(int n, int k): The compiled path's ZZ32 CHOOSE, which raises IntegerOverflow; the team's own checked binomial.",
"- code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java#public static long longOverflowingChoose(long n, long kk): The compiled path's ZZ64 CHOOSE, the same device at 64 bits.",
"- code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java#public static int unsignedIntOverflowingChoose(int n, int k): The compiled path's NN32 CHOOSE, the 64-bit one narrowed with a check; the unsigned device.",
"- code:Library/RangeInternals.fss#trait CompactFullScalarRange extends..getter isEmpty(): Boolean = self.lower > self.upper: The size getter that computes the distance before it tests emptiness (row 450); test emptiness first.",
"- code:Library/RangeInternals.fss#trait StridedFullScalarRange..getter isEmpty(): Boolean =: The strided size, the same shape by reading; reorder it the same way.",
"- code:Library/RangeInternals.fss#object CompactFullSeqScalarRange(l:ZZ32, r:ZZ32): The sequential generate and loop that step past the last element (row 451); step only while the next element is in the range.",
"- code:Library/RangeInternals.fss#object StridedFullSeqScalarRange(l:ZZ32, r:ZZ32, str:ZZ32): The strided sequential steps, the same defect with a stride; the same fix.",
"- code:Library/RangeInternals.fss#sized1Range(lo:ZZ32,ex:ZZ32)..sized3Range(: The helpers of # with lo+ex-1 (row 450); reorder, and build the empty MIN # 0 without lo-1.",
"- code:Library/FortressLibrary.fss#trait CompactFullRange[: The size operator whose (u - l') + 1 overflows at the bounds (row 450), calling rung M's own ZZ32 MAX; test emptiness first, the one line of FortressLibrary you may change.",
"- code:Library/RangeInternals.fss#meetingPoint(init0:ZZ32: The library's own body that tries to avoid overflow by stepping; a precedent for a reorder.",
"- doc:ProjectFortress/compiler_tests/NatRtBigSize.fss: The revival test that gates sizes to 2^64-1; you restate it to NN32's range, each changed line listed before and after.",
"- doc:ProjectFortress/tests/XXXNatBigSizeWalk.fss: Row 418's expected failure; it passes once walk reads sizes exactly, and you promote it by git mv.",
"- doc:ProjectFortress/compiler_tests/XXXNatArithChecker.fss: The expected-failure compile test of the arithmetic refusal; your refusal test takes its shape.",
"- doc:ProjectFortress/compiler_tests/XXXNatArithChecker.test: Its .test file, pinned by compile_err_contains; pin your refusal's message the same way.",
"- doc:ProjectFortress/compiler_tests/XXXNumeralBeyondWidthMax.fss: Batch N's owed run-time pair, the component; your two owed components take its form, a marker printed before the failing part.",
"- doc:ProjectFortress/compiler_tests/XXXNumeralBeyondWidthMax.test: Its XXX run test, run with run_out_contains=REACHED; your run tests take it where the program prints before it dies.",
"- doc:ProjectFortress/compiler_tests/NumeralBeyondWidthMaxLink.test: Its plain link test, red if the checker refuses the program; each of your pairs has one.",
"- doc:ProjectFortress/tests/XXXNatValueNN32RungK.fss: Row 486's expected failure, walk's size value at an NN32 binding, batch N's rung Q's to fix; your reading of a size keeps its verdict.",
"- code:ProjectFortress/tests/IntSemanticsRungI.fss#overflows(f: () -> Any): Boolean =..zz32Shown(v: Any): String =: The helper that catches IntegerOverflow alone; assert every raise of the natives test through it.",
"- doc:ProjectFortress/tests/XXXRangeBoundsRungO.fss: Row 450's expected failure; it passes on your repair, and you promote it by git mv, no assertion changed.",
"- doc:ProjectFortress/tests/XXXRangeEmptyHashRungO.fss: Row 450's MIN # 0 expected failure; the same.",
"- doc:ProjectFortress/tests/XXXSeqRangeTopRungO.fss: Row 451's expected failure; the same.",
"- A size is carried at run time as a descriptor: How a size runs compiled today; a size inside NN32 must keep loading and dispatching.",
"- The compiled type checker checks nat and int static parameters: What the checker already checks for sizes, and where; your refusal extends it.",
"- A size at run time can follow the opr path: Why the checker count stays: the one library's own sizes are the literals 0 to 3.",
"- The interpreter's integer rules: Walk's integer rules as landed; your natives complete the overflow rule for LCM, CHOOSE and power.",
"- Under walk, a native can raise a Fortress exception: How a native raises the catchable IntegerOverflow; every native you fix raises that way.",
"- Under walk, fixed-width integer arithmetic raises: What rung O built, how it was measured, and what it left open, rows 450 and 451 and the ten natives among it.",
"- The one library's scalar ranges are over: The ranges as batch 7R left them, over ZZ32 alone, and the tests that gate them; your bodies keep every answer inside the bounds.",
"- What relies on fixed-width wrapping under: Which library code meant to wrap and which must not overflow; the range bodies must not, so they are reordered.",
"- An XXX compile test pinned by compile_err_contains: How the harness reports an XXX compile test whose program compiles; show your refusal test failing on the base for its own reason.",
"- An XXX*.fss in the interpreter corpus IS a gated expected-failure test: The mechanism behind walk's refused case and the three XXX tests you promote.",
"- The XXX expected-failure mechanism in compiler_tests/: Why a compiled program that crashes at run time needs two .test files, and what the harness demands when no key is set; the owed pairs of rows 447 and 505 rest on it.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll, or the linker's state is lost.",
"- map:compile-path-walkthrough.md#What the specification says it is: What a nat parameter is in the specification; the context of the refusal's wording.",
"- map:README.md#Touch this@scala_src/typechecker: What a checker edit moves and which tests guard it; run those.",
"- map:README.md#Touch this@interpreter/ (evaluator: What an evaluator edit moves and which tests guard it; run those.",
"",
].join('\n')

const P_TAIL = [
"",
"## Your rung: P - the text: the specification, a library comment, test messages and two owed tests",
"",
"SLUG is rung-spec-integer-rules. WORKTREE is /home/user/fortress-intprose, branch wip/rung-spec-integer-rules.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.5.md, section 3, under \"P. The text: the specification, a library comment, test messages and two owed tests\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Section 1's one question is answered, and it changes nothing in this rung: row 443's test asserts the specification's answer, which batch N's numeral switch builds.",
"",
"**The problem.** Six pieces of text disagree with what the project built or decided.",
"- The integer rules built by climb batches 3.5 and 4 are written in no specification text and no api comment (explorations/reviews/batch-3.5-4-conformance.md, \"Batch 3.5 as a whole\" and finding 3). They are: LSHIFT and RSHIFT on ZZ32, ZZ64, NN32 and NN64 are bit operators that give 0 or the replicated sign for a count at or beyond the width and shift the other way for a negative count, the count read by the class of its value; a ZZ32 receiver takes a count of any integral type; narrow truncates, keeping the low 32 bits, signed and unsigned; the specification's shift on ZZ is exact and an unrepresentable left shift raises IntegerOverflow; GCD and LCM are nonnegative and raise IntegerOverflow when the result does not fit (FACTS.md, \"The interpreter's integer rules\" and \"The compiled path's integer rules\"). The specification has no LSHIFT, RSHIFT or narrow outside the generated Specification/library/apis/ (a grep); its shift is Specification/basic-lib/basic-integers.tex:681-688, its GCD and LCM :505-530, the operator overview's Specification/basic/operators/opr-overview.tex:254-264.",
"- Row 394: the coercion chapter's own example (Specification/basic/conversions-coercions.tex:555-584) declares ZZ32, ZZ64 and ZZ128 with no exclusion and says f(ZZ32) resolves to f(ZZ64) because ZZ64 coerces to ZZ128; the chapter's definition of \"no less specific\" (:494-501) needs ZZ64 to exclude ZZ128, and both paths refuse the example as written. The row was handed to rung S and never revised.",
"- The rational type's listing extends Number alone (Specification/basic-lib/numbers.tex:92-93 and the rendered listing at :144-145), while the library's QQ extends AdditiveGroup[\\QQ\\], MultiplicativeRing[\\QQ\\], StandardPartialOrder[\\QQ\\] and StandardMinMax[\\QQ\\] (Library/FortressLibrary.fsi:387-388), which SUM and PROD over QQ need. Batch 6's gather saw it and called it no mismatch; nothing says which the specification carries (explorations/reviews/batch-6-conformance.md, rung T and smaller findings).",
"- Climb batch 5's rung S moved 13 specification citations in the messages of 7 revival tests, left \"for a later scripted pass\" (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1). Batch 7C's rung X scanned every specification citation of the three test directories for lines moved since the commit that wrote it, re-anchored those in its own files, into traits.tex (XXXTupleVarFieldCompiledRungC.fss:21-22, XXXFlatStringSplitRungL.fss:11), and listed the rest, all moved by rung S, in five files: ProjectFortress/compiler_tests/XXXFortToStringRungS.fss:13, XXXUnionMethodRungS.fss:13-14, ProjectFortress/library_tests/MaybeRungM.fss:13, ProjectFortress/tests/XXXTupleSeparatorRungS.fss:10 and XXXTupleSevenRungS.fss:10; the passages MaybeRungM's and XXXTupleSevenRungS's lines cite were rewritten by rung S, not only renumbered (explorations/compile-ladder/rung-spec-comprises/probes/reanchor/stale-scan.txt, with stale-scan.py; its REPORT.md, \"For the gather\"). The same judge proposed that a rung editing the specification re-anchor the test messages it moves; this batch's intro says so, and the shared prefix does not yet (section 8).",
"- The scalar-extension block's header comment (Library/FortressLibrary.fss:4596-4601, Library/FortressLibrary.fsi:2583-2588) says that \"sized arrays under a compiler need per-shape declarations beside these\", a shape that answer 9's positional rule refuses, by reading (explorations/reviews/batch-3-conformance.md, rung C and finding 3).",
"- Rows 440 and 443 each owe a home-2 expected-failure walk test, ruled by batch 6's rung T judge (explorations/compile-ladder/rung-spec-numbers/JUDGE.md sections 1.5 and 1.8): under walk 0/0 = 0/0 is true and 0/0 CMP 0/0 is EqualTo, where the specification makes 0/0 unordered with itself (row 440); s: RR64 = 3000000000 is refused, \"RHS expression type Long is not assignable to LHS type RR64\", where the specification's Example 1 and answer 8 convert a numeral into RR64 (row 443; explorations/compile-ladder/plan-6.5/probes/numeral/NumMicro.base.txt).",
"",
"**The decisions.** The rules: POSITIONS 2026-09-22, ledger rows 335, 334, 333 and 346, and the design principle for integer semantics; 2026-09-24, climb batch 3.5 (the signed narrow truncates too) and ledger rows 380 and 381. The form, S1 (2026-09-26): the normative text edited in place, a \\revision callout at each changed passage (Specification/fortress/fortress.tex:87), an Appendix I entry per change quoting the original as \"the Working Draft of February 2011\" with its path and line in Specification-1.0-frozen/ (2026-09-26, the first of the batch-5 answers), and the reasons in a decision record; the later Types chapter cited beside where it covers the topic (2026-09-26, the lineage note); the requirement on the plan (2026-09-24). The number chapters describe the library and are checked against it (2026-09-26, the number chapters under S2; answer 6), which is why QQ's listing states the library's traits (section 1 of the record, read from the record). Row 440's fix is not this rung's: the library's comment chooses 0/0 = 0/0 on purpose (Library/FortressLibrary.fss:568), and only the test is owed. Row 443's fix is batch N's numeral switch (section 1). The scalar comment's wording follows the batch 3 review's default: state only what is lost, and send the question of per-shape declarations to the array design.",
"",
"**What it writes.** First, before any edit, the list: every passage of Specification/ outside library/apis/ that names a shift, narrow, GCD, LCM, an integer overflow or the fixed-width integer types' operators, with what the decisions make of it and whether it is revised now or left, with the source that settles it; and every citation of a line of a chapter this rung edits in ProjectFortress/tests/, compiler_tests/ and library_tests/. Then:",
"- the integer rules, in the passages the list shows describe these operators or where the specification describes the integer types' operators; the rung chooses the places, each in the S1 form;",
"- row 394's example given the exclusion its definition needs, in the library's own spelling of its integer traits, with a callout and an entry;",
"- QQ's listing given the library's supertraits, with one sentence that their laws hold away from 0/0 and the infinities, as RR64's hold away from NaN, with a callout and an entry;",
"- the Appendix I entries as new subsections after the last revision entry, batch 7C rung X's \"The traits that extend a closed trait\" (Specification/appendices/changes.tex:1246 at cd9305c2d, re-read on the base); the two closing subsections, \"Passages not yet revised\" (:1340) and \"Route C, the alternative not taken\" (:1370), stay last;",
"- the decision record, explorations/compile-ladder/rung-spec-integer-rules/decision-record.md;",
"- the citations rung S moved that rung X listed, each re-anchored from the text it was written against, as X re-anchored its own (explorations/compile-ladder/rung-spec-comprises/probes/reanchor/reanchor.py, stale-citations.txt), a citation whose passage rung S rewrote pointed at the passage that now says what its message says; and every citation this rung's own edits move, re-anchored by the map of unchanged lines from git show <base>:<chapter> to the tree, as batch 6's repair re-anchored 177 (JUDGE-review.md step 9): messages and comments only, never an assertion;",
"- the scalar block's two comments reworded to state only what is lost, that all eight return the unsized Array[\\T,I\\]; comment text only, checked by rung C's re-lexing check (explorations/compile-ladder/rung-library-comments/comment-only-check.py), with the span effect a comment has after a declaration that ends in a type reported (FACTS.md, \"A comment placed after a declaration that ends in an expression or a type becomes part of that declaration's source span\");",
"- two expected-failure walk tests in ProjectFortress/tests/, one per row, each asserting the specification's answer with its passage in the message, each shown failing on the base.",
"",
"**How it is checked.** No test can go red for a prose edit. The specification is built as rungs S and T built it (./ant genSource, then ./ant tex, in Specification/fortress/, with FORTRESS_HOME the worktree), on the base and after, the four logs captured; pdftotext of the two PDFs diffed, showing only the revised passages, the callouts, the appendix entries and page shifts; git diff --stat showing only the listed files; every re-anchored citation opened. The rung does not commit Specification/fortress.pdf; the gather rebuilds it on the merged tree, since Part IV is rendered from the .fsi files this rung's comment changes.",
"",
"**Files it may touch.** Under Specification/, not Specification-1.0-frozen/: the chapters its list names, appendices/changes.tex (its entries, at its place) and fortress/preamble.tex only if the front matter names a passage it revises; the messages and comments of the five test files above and of any test whose citation its edits move; the scalar block's two comments in Library/FortressLibrary.fss and .fsi; its two new tests; its own directory. Not: Specification/fortress.pdf; any source file; any other library line.",
"",
"**Java or Scala.** Neither.",
"",
"**The checker count.** Unchanged: a comment changes no declaration the checker reads (climb batch 3's rung C measured the same). Before: the last landed gate's checker-count.txt, the table the gate itself compares against (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: climb-batch-7C/gate/ for the first run, the first run's for the second), not a run of the stage on the rung's unchanged base; after: captured on the rung's tree (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken; the intro says when the base has changed under the table).",
"",
"**Stops.** Any edit under Specification-1.0-frozen/. Normative text for a rule neither path runs. A passage whose new text neither the decisions nor the landed code settles: the rung reports it and does not choose. An assertion changed in a re-anchored test. A library line other than the two comments. Not a stop: rung D's run-to-run rule.",
"",
"**For the skeptic.** There is no program to run both ways for the prose. The checks: every rule the text states against the landed code of both paths (the natives and bodies FACTS.md's two integer-rules entries name) and against the decisions; every quoted original against git show <base>:<path> and against the frozen copy's line; the two builds and the pdftotext diff; each re-anchored citation opened; QQ's listing against Library/FortressLibrary.fsi; the two new tests failing under walk for the reason their messages give; the scalar comment's re-lexing check.",
"",
"**What comes back to Pavol.** The revised pages, as the pdftotext diff; the Appendix I entries; the list, with what was left and why.",
"",
"**What it closes.** Row 394 (fixed). Notes appended: rows 335, 334 and 346, that the specification states them; rows 440 and 443, their tests.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-22 ledger row 335: The shift decision, bit operators with the smart-shift rule on the fixed widths and an exact shift on ZZ; your text states it.",
"- positions:2026-09-22 ledger row 334: GCD and LCM nonnegative, IntegerOverflow when the multiple does not fit, on both paths; state it where the specification describes them.",
"- positions:2026-09-22 ledger row 333: The overflow guards test for the minimum; write nothing about negation or absolute value that contradicts it.",
"- positions:2026-09-22 ledger row 346: narrow truncates, keeping the low 32 bits; your text states it.",
"- positions:2026-09-22 design principle for integer semantics: JVM defaults where they make sense, corrected where precision matters; the reason behind each rule, for the decision record.",
"- positions:2026-09-24 climb batch 3.5: The rider that the signed narrow truncates too; state narrow for both signs.",
"- positions:2026-09-24 ledger rows 380 and 381: A ZZ32 shifted by a count of any integral type; state it with the shifts.",
"- positions:2026-09-24 requirement on the plan: Pavol's requirement that the specification states what the project changed and why; the reason this rung exists.",
"- positions:2026-09-26 S1: The form of every change, text in place, a revision callout, an Appendix I entry quoting the original, reasons in a decision record; follow it for each passage.",
"- positions:2026-09-26 first of the batch-5 answers: Quote each original as the Working Draft of February 2011, with its path and line in Specification-1.0-frozen/.",
"- positions:2026-09-26 lineage note: Cite the later Types chapter beside the specification where it covers a topic; check it for each passage you revise.",
"- positions:2026-09-26 number chapters under S2: The number chapters describe the library and are checked against it; why QQ's listing takes the library's traits.",
"- positions:2026-09-26 answer 6: The subtype lists rewritten as the library's check methods; the rational chapter's revision your QQ sentence joins.",
"- positions:2026-09-19 answering the open question: The library's practice is the standard; where text and library differ, the library decides what you write.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your checker count's before: the last landed gate's table, not a run of the stage on your unchanged base; capture only the after.",
"- ledger:394: The coercion example its own chapter's definition refuses; you give it the exclusion and close the row.",
"- ledger:440: 0/0 compared with itself under walk; you write its expected-failure test and do not change the library.",
"- ledger:443: A numeral beyond ZZ32 not converted to RR64 under walk; you write its expected-failure test, the fix being batch N's.",
"- ledger:335: The shift row with its measurements; your text states what it fixed, and you append a note.",
"- ledger:346: The narrow row; your text states its rule, and you append a note.",
"- doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1: The finding that rung S left 13 test citations moved, and the map of unchanged lines batch 6 re-anchored 177 with; re-anchor your own edits' citations that way.",
"- doc:explorations/compile-ladder/rung-spec-comprises/REPORT.md#The re-anchoring: How batch 7C's rung X re-anchored the citations rung S moved in its files, from the text each was written against; do the same for the rest.",
"- doc:explorations/compile-ladder/rung-spec-comprises/probes/reanchor/stale-scan.txt: X's scan, the citations rung S left moved, line by line, two of them to rewritten text; the list you re-anchor.",
"- doc:explorations/compile-ladder/rung-spec-numbers/JUDGE.md#1.5 Example 1 against the numerals: The ruling that row 443's conversion is the specification's answer; your test asserts it.",
"- doc:explorations/compile-ladder/rung-spec-numbers/JUDGE.md#1.8 The rows: The ruling that rows 440 and 443 each owe a home-2 walk test; the two tests you write.",
"- doc:explorations/reviews/batch-3.5-4-conformance.md#Batch 3.5 as a whole: The review that found the integer rules written nowhere; your list answers it.",
"- doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@specification is behind: Which rules the specification lacks; check that your list covers each.",
"- doc:explorations/reviews/batch-3-conformance.md#Findings that need Pavol@library comment: The scalar comment's finding and its default, state only what is lost; your reword follows it.",
"- doc:explorations/reviews/batch-6-conformance.md#Smaller findings, for the record@algebraic supertraits: The finding that QQ's listing lacks the library's algebra; your QQ edit answers it.",
"- doc:Specification/basic-lib/basic-integers.tex#Integers: The integer chapter whole, which you edit; read every passage on the operators before you choose where the rules go.",
"- code:Specification/basic-lib/numbers.tex#%% trait QQ..%% end: QQ's listing, which you give the library's supertraits.",
"- doc:Specification/basic/conversions-coercions.tex#Coercion Resolution: Row 394's example and the definition it breaks; you edit it.",
"- doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators: The overview's GCD, LCM and CHOOSE, one place the rules may go.",
"- doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators: The overview's sentence that an integer overflow throws IntegerOverflow; keep your text consistent with it.",
"- doc:Specification/appendices/changes.tex#The integer trait: The integer chapter's existing Appendix I entry; the model for your entries' form.",
"- doc:Specification/appendices/changes.tex#Passages not yet revised: The subsection your entries go before, after batch 7C's last entry; take a passage off it when you revise it.",
"- doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form: How rung S applied S1; your callouts and entries take its form.",
"- doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#2. The one reading everything rational rests on: The rational chapter's reading of QQ with 0/0 and the infinities; your QQ sentence agrees with it.",
"- doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#5. Decisions taken inside the rung: Rung T's choices in the number chapters; undo none without saying so.",
"- doc:explorations/compile-ladder/rung-library-comments/REPORT.md#5. How the change was verified: How rung C checked a comment-only library edit by re-lexing; run the same check on the scalar comment.",
"- doc:explorations/compile-ladder/plan-6.5/probes/numeral/NumMicro.base.txt: Row 443's refusal on the base; your test fails with it.",
"- code:Library/FortressLibrary.fsi#trait QQ extends..comprises { ... }: The library's QQ, whose supertraits the listing states; copy them exactly.",
"- code:Library/FortressLibrary.fss#(*) Scalar extension: an array of numbers..declarations beside these.: The scalar block's comment in the component, which you reword.",
"- code:Library/FortressLibrary.fsi#(*) Scalar extension: an array of numbers..declarations beside these.: The same comment in the api, reworded identically.",
"- The compiled path's integer rules: What the compiled path runs; the text states no rule that neither path runs.",
"- The interpreter's integer rules: What walk runs; with the compiled path's rules, the landed code your text states.",
"- The specification's number chapters describe the flat library: What rung T already revised in the number chapters; your QQ edit continues it.",
"- The specification states instantiation exclusion, and its refused examples: Why row 394's example needs an exclusion; the rule your edit applies.",
"- Specification-1.0-frozen/ is byte for byte: The frozen copy is the Working Draft of February 2011: quote originals from it, and never edit it (a stop).",
"- The team's latest word on types: The later Types chapter's standing, cited beside the specification.",
"- A comment placed after a declaration that ends in an expression: A comment's span effect after a declaration; report it for the scalar comment.",
"- Citing Specification/library/apis/*.tex as an independent standard is circular: The generated apis render the library; never cite them as the standard for a rule.",
"- The one library's number tower is flat: QQ and the integer types as landed; the source your listing and rules describe.",
"- map:README.md#Touch this@Specification/ (the standard): What a specification edit moves, the PDF and the test citations, and what guards it.",
"- index:number chapters: The notes on file on the number chapters; open those your passages touch.",
"",
].join('\n')

const G_TAIL = [
"",
"## Your rung: G - generics at run time on the compiled path",
"",
"SLUG is rung-generic-runtime. WORKTREE is /home/user/fortress-genrt, branch wip/rung-generic-runtime.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.5.md, section 3, under \"G. Generics at run time on the compiled path\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Section 1's one question is answered, and it changes nothing in this rung.",
"",
"**The problem.** Six defects of the compiled path, each measured, each on the path of the switch-over or of microGPT's parallel run (explorations/reviews/batch-5-conformance.md finding 1; explorations/reviews/batch-3-conformance.md finding 1; explorations/reviews/batch-6-conformance.md finding 4). Walk runs every shape below.",
"1. Row 417, the class loader's first load is not safe on two threads: InstantiatingClassloader.loadClass adds a name to history before it defines the class (ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:204); a second thread that finds the name there returns findLoadedClass(name), null until the first thread has defined it (:182-186); RTHelpers.loadClosureClass then calls newInstance on null (ProjectFortress/src/com/sun/fortress/runtimeSystem/RTHelpers.java:133-138), or both threads define the class and one dies with LinkageError. explorations/compile-ladder/rung-size-runtime/probes/skeptic/ZsThreadsT.fss fails 5 of 5 compiled runs at FORTRESS_THREADS=4 and passes 5 of 5 at 1. It has no gated home, because the suites run at one thread.",
"2. Row 419, a parallel task in a generic declaration is not generic over its free static parameters (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1634, \"TO DO if fvts non-empty, will need to make a generic task\"; delegate at :4771). A 13-line fix is measured (explorations/compile-ladder/rung-size-runtime/probes/xxx-task-red-demo-fix.patch) and applies to today's tree as it stands (explorations/compile-ladder/plan-6.5/probes/row419-apply-check.txt). Expected failure: ProjectFortress/compiler_tests/XXXNatRtTask.fss with XXXNatRtTask.test and NatRtTaskLink.test.",
"3. Row 420, a generic method of a generic object that builds instances over both the object's and its own static parameter fails at load (NoClassDefFoundError: U$RTTIc, and j$RTTIc for sizes); either parameter alone works; the site is not located. Expected failure: ProjectFortress/compiler_tests/XXXNatRtMethBoth.fss with XXXNatRtMethBoth.test and NatRtMethBothLink.test.",
"4. A generic arm of a dispatcher that names its static parameters differently from the dispatcher casts its result to a type the loader did not rewrite, and dies with ClassCastException (explorations/reviews/mie-probes/scope-call-site-dispatch.md section 4; ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1755-1762 at the note's base). No ledger row.",
"5. A ZZ32 instantiation made at run time is spelled fortress|CompilerBuiltin%ZZ32 (RTHelpers.java:174-175, ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/RTTI.java:53-58), where static code spells it with FZZ32, and a dispatched generic arm then dies with ClassCastException (the same note, section 4). No ledger row.",
"6. Row 351, the code generator never binds a typecase or catch clause's name: CodeGen.forTypecase never reads it (CodeGen.java:2116-2147) and forTry reads it and never uses it (:2020-2061), so a reference to the name compiles as a top-level object that does not exist. Expected failure at the catch site: ProjectFortress/library_tests/XXXClauseBindingRungB.fss with its .test and ClauseBindingRungBLink.test. This is the cause of row 426: the compiled cast[\\T\\] matches its type test at a concrete type and then dies reading its clause's name (explorations/compile-ladder/plan-6.5/probes/cast/; NOTES.md section 2). The row's other failures, cast[\\ZZ32\\](0) and the like, pass a numeral, which on the compiled path is an IntLiteral and correctly not a ZZ32. Answer 7's identity functions pass numerals through cast[\\T\\] (Library/FortressLibrary.fss:3124-3148), so on the compiled path they need the binding fixed and branch values that are of type T at run time. Since batch 7's rung H the one library has a second such clause, andCondCombine (:4559-4567), which binds rp and rq at an arrow type over its own type parameter, Generator[\\E\\] -> RelationalPredicateCondition[\\E\\], and which FilterGenerator2's filter calls (:4514-4515), so a compiled comprehension with two guards reaches it at the switch-over (row 351's note; explorations/reviews/batch-6b-7-conformance.md finding 4).",
"Programs 4 and 5 are legal under route A and answer 9: explorations/compile-ladder/plan-6.5/probes/dispatch/ScopeAlpha2.fss, ScopeZZ32Sub.fss and ScopeArmsLegal.fss compile on today's checker and die (*.stock.txt beside them).",
"",
"**The decisions.** PLAN phase 2b: rows 417, 419 and 420 repaired before the switch-over, row 417 gated by a program of its shape in the gate's four-thread stage; the two dispatch defects with their probes as expected-failure tests and the measured 43-line fix. Row 426 in this batch (section 1 of the record, read from the record). Design B with the factory (POSITIONS 2026-09-24 and 2026-09-26): a size is a descriptor from RTTIsize.of, and row 420 has a size twin. Answer 9 (2026-09-26): a generic declaration beside a plain one is legal, and two generic declarations in the more-specific relation agree on their static parameters position by position; the three dispatch programs meet it. Answer 7 (2026-09-26): the identity comes from the static argument through the () -> T witness typecase; its values stay what they are.",
"",
"**What the tree already does.** Evidence, not the brief; the rung lists every way before it chooses.",
"- Row 419's measured fix is forFnExpr's own device for a closure (CodeGen.java:3464-3475).",
"- Row 351's fix, as its row records, is the local CodeGen already makes for a bound name (new VarCodeGen.LocalVar, then addLocalVar; CodeGen.java:2853, :3945), at both sites.",
"- The measured dispatch change (explorations/compile-ladder/plan-6.5/probes/dispatch/callsite-rebased.patch, the note's shadow applied to today's OverloadSet.java, its probe switch still in it) reads a generic arm of a template dispatcher at the dispatcher's own static parameters, which the loader has already set to the call site's; with it the three programs print the specification's answers (*.callsite.txt). Its reach and its remainder are the note's section 3: generic dotted methods, functional methods in a top-level set, opr and nat parameters, and a dispatcher that is not a template, which answer 9 now makes a legal program.",
"- For row 417: the team's descriptor factories keep one winner under a race, a get and then a putIfNew that checks again under the table's lock (InstantiatingClassloader.java:2744-2752, ProjectFortress/src/com/sun/fortress/runtimeSystem/RttiTupleMap.java:148-157), the pattern RTTIsize.of took with putIfAbsent (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/RTTIsize.java:24-33); and the JDK gives a class loader a per-name lock (ClassLoader.registerAsParallelCapable, getClassLoadingLock).",
"- For the identity functions: a typed local binding converts a numeral by coercion on both paths (FACTS.md, \"Under walk, the interpreter converts by coercion at its three kinds of type check\"); the answer-7 judgement names a checker refinement of the witness branch as the other way (explorations/reviews/sum-replacement-judgement.md section 7, check 3).",
"",
"**The test, first.** Each captured failing before the edit.",
"- Row 417: ProjectFortress/compiler_tests/FirstLoadThreadsRungG.fss with FirstLoadThreadsRungG.test (compile, link, run, run_out_contains=PASS), in ZsThreadsT's shape, a parallel for dispatching a generic arm over eight instantiations and printing PASS when its sum is right. At one thread, which is how testFast runs it, it passes before and after; the gate's four-thread stage runs it three times at FORTRESS_THREADS=4 once section 8's change is made, which names this file, so the name is fixed; the stage reports it absent, and not red, while the file is not in compiler_tests/. Captured: five compiled runs at four threads failing before the edit and passing after, and at one thread passing both times.",
"- The three dispatch programs, each as two .test files over one component, a plain one driving link and an XXX one driving run (FACTS.md, \"The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only, and a run-time defect needs two .test files\"), then promoted.",
"- Row 351: a typecase-site test in the shape of CaseBindPlain, and the catch site's XXXClauseBindingRungB promoted; a compiled cast[\\T\\] of a value of type T in the shape of CastBind; and a compiled clause that binds at an arrow type over the function's own type parameter, in andCondCombine's shape, which rung H's skeptic's probe does not cover, since it binds at an arrow over ZZ32 (explorations/compile-ladder/rung-exclusion-remainder/probes/skeptic/SkTcBind.fss).",
"- Rows 419 and 420: XXXNatRtTask promoted; XXXNatRtMethBoth promoted if the rung repairs row 420.",
"- The identity functions: under walk their values are gated by ProjectFortress/tests/FlatTowerRungF.fss, group 3, which must pass unchanged; the compiled check of a SUM's identity end to end waits for the switch-over, since the compiler's own library has no generic SUM (FACTS.md, \"The compile ladder loses one file to an approved test line, until the switch-over\"), and the report names it.",
"",
"**The measurements.** The four-thread stage's thirteen atomic programs and the new one, three runs each at FORTRESS_THREADS=4, before and after, since a lock on first load must not deadlock or slow them to a timeout; the 43 compiler tests that declare a generic overload (explorations/reviews/mie-probes/scope/compiler-tests.txt) before and after, output and classes, as the scope note measured them; the compiler library's five jars before and after: byte-identical under the dispatch change and row 419's fix, as measured (explorations/reviews/mie-probes/scope/prelude-compare.txt, explorations/compile-ladder/rung-size-runtime/probes/xxx-task-fix-library-jars.txt), and changed by row 351's fix only in the classes of the prelude's clauses that bind a name, cast's (Library/CompilerLibrary.fss:39-43, the one such site by a grep for a bound catch or typecase clause) and any the rung's own grep finds, which the rung names before it measures; the 85 ladder files; the sized compiled tests; the checker count after. The manifest sets writesState: every differential at FORTRESS_THREADS=1 and 4.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java, RTHelpers.java and what else under runtimeSystem/ the lock or row 420 needs, each named; ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java (delegate and its caller, forTypecase, forTry, and what row 420 needs); ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java; new and promoted tests in ProjectFortress/compiler_tests/ and library_tests/; in Library/FortressLibrary.fss and .fsi, additiveIdentity and multiplicativeIdentity only; its own directory. Stops: ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java; scala_src/; interpreter/; any other library declaration; Specification/.",
"",
"**Java or Scala.** Java. ant compileAll, the library-order cache rebuild before any compiled test, and default_repository/caches/global.map restored after compileAll.",
"",
"**The checker count.** Unchanged: the stage reads the checker and the library's declarations, and the rung changes no declared type. Before: the last landed gate's checker-count.txt, the table the gate itself compares against (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: climb-batch-7C/gate/ for the first run, the first run's for the second), not a run of the stage on the rung's unchanged base; after: captured on the rung's tree (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken; the intro says when the base has changed under the table).",
"",
"**What must stay green, or keep its verdict.** Every compiled, library and interpreter test other than the rung's own; the thirteen atomic programs at four threads; FlatTowerRungF.fss.",
"",
"**Stops.** A compiled test's verdict changing other than the rung's own; a ladder file moving down; a four-thread run that deadlocks or times out twice; a compiler-library jar changing other than where a named fix predicts it; an edit to the checker, walk or any library line other than the two identity functions. Not a stop: row 420 or row 417 left unrepaired with its site located and the reason reported, its test staying an expected failure (row 417's program then kept in the rung's probes/ and out of compiler_tests/, where the four-thread stage finds it absent and says so); rung D's run-to-run rule.",
"",
"**For the skeptic.** Each defect, walk against the compiled run, on the rung's programs and on a variant the skeptic writes; row 417 at four threads over five repeated runs and with more instantiations than the test's eight; the dispatch programs, and a generic dotted method and a dispatcher that is not a template, to show the remainder unchanged and recorded; andCondCombine's shape compiled, a clause binding at an arrow type over the function's own type parameter read in its body; the identity functions' values under walk against the base; the compiler library's jars.",
"",
"**What comes back to Pavol.** Which of the six are fixed; the lock's shape and its measured cost on the thirteen atomic programs.",
"",
"**What it closes.** Rows 351, 417, 419 and 426 (fixed; 426 noted with its cause); row 420 if repaired. Opens and closes, home 1: the two dispatch defects. Opens: the dispatch defect's remainder (generic dotted methods, a dispatcher that is not a template), home 2 where the rung shows it failing.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- doc:explorations/coordinator/PLAN.md#Phase 2b. The repair batch from the conformance reviews: The plan's list for this batch: the rows it gives G and row 417's gated home in the four-thread stage.",
"- positions:2026-09-26 answer 9: The positional rule; the dispatch programs are legal under it, and so is a dispatcher that is not a template.",
"- positions:2026-09-26 answer 7 catch-all: The generic SUM and PROD with the witness typecase; the identity functions you make pass values of type T.",
"- positions:2026-09-24 run-time size design: Design B; row 420 has a size twin that goes through descriptors.",
"- positions:2026-09-26 fourth batch-5 answer: The descriptor factory's race-safe table; a model for row 417's lock.",
"- positions:2026-09-24 exclusion route rung P's fork: Route A; the dispatch programs are legal under it.",
"- positions:2026-09-17 a standing preference: A deeper pass, never a rollback; if a fix fails, trace it further.",
"- positions:2026-09-19 after climb batch 1 landed: The process decisions every rung follows, test first among them.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your checker count's before: the last landed gate's table, not a run of the stage on your unchanged base; capture only the after.",
"- ledger:417: The class loader's first-load race; you fix it and write its four-thread program.",
"- ledger:419: The parallel task in a generic declaration, with its measured fix; you apply it and promote its test.",
"- ledger:420: The generic method over two parameter sets; locate its site and fix it, or record why not.",
"- ledger:351: The clause binding the code generator never reads, at two sites, with andCondCombine noted since rung H; you fix both sites.",
"- ledger:426: cast never matching on the compiled path; row 351 is its cause, and its numeral half is correct behaviour.",
"- ledger:415: RTTI serial numbers repeated across threads, fixed; the precedent for a thread-safe table in the run-time.",
"- doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@Three compiled-path defects: The finding that named rows 417, 419 and 420 for this batch.",
"- doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@cannot hold a defect: Why row 417's gated home is the four-thread stage.",
"- doc:explorations/reviews/batch-3-conformance.md#Two compiled dispatch defects that stayed out of every list: The finding that named the two dispatch defects and their probes.",
"- doc:explorations/reviews/batch-6-conformance.md#Findings that need Pavol@identity on the compiled path: The finding that answer 7's identities fail compiled through cast; why row 426 is here.",
"- doc:explorations/reviews/batch-6b-7-conformance.md#Findings@second clause-binding site: The finding that added andCondCombine's shape to your tests and your skeptic's checks.",
"- doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#2. The design: The measured dispatch change's design; read it before you apply the patch.",
"- doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#3. The size, measured: Its measured size and its remainder, which you record and do not fix.",
"- doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#4. The two side defects: The two dispatch defects with their programs; your expected-failure tests.",
"- doc:explorations/reviews/sum-replacement-judgement.md#7. Three checks that tell the options apart, still open: The judgement's open checks on the identities; the checker refinement among them is not yours, and you report it as the way not taken.",
"- doc:explorations/compile-ladder/plan-6.5/NOTES.md#2. Row 426: The probe that traced row 426 to row 351 and to numerals; your cast test takes CastBind's shape.",
"- doc:explorations/compile-ladder/plan-6.5/NOTES.md#3. The two compiled dispatch defects: The dispatch change re-applied to the tree, with its three programs.",
"- doc:explorations/compile-ladder/plan-6.5/NOTES.md#4. Row 419: Row 419's patch applies as it stands.",
"- doc:explorations/compile-ladder/plan-6.5/probes/dispatch/callsite-rebased.patch: The dispatch change rebased, its probe switch still in it; remove the switch when you apply it.",
"- doc:explorations/compile-ladder/rung-size-runtime/probes/xxx-task-red-demo-fix.patch: Row 419's measured 13-line fix.",
"- doc:explorations/compile-ladder/rung-size-runtime/probes/skeptic/ZsThreadsT.fss: The program that fails row 417 at four threads; FirstLoadThreadsRungG takes its shape.",
"- doc:ProjectFortress/compiler_tests/XXXNatRtTask.fss: Row 419's expected failure, which you promote.",
"- doc:ProjectFortress/compiler_tests/XXXNatRtMethBoth.fss: Row 420's expected failure, promoted if you repair the row.",
"- doc:ProjectFortress/library_tests/XXXClauseBindingRungB.fss: Row 351's catch-site expected failure, which you promote.",
"- doc:explorations/compile-ladder/rung-exclusion-remainder/probes/skeptic/SkTcBind.fss: Rung H's skeptic's compiled clause binding at an arrow over ZZ32; your test binds over the function's own type parameter, which it does not cover.",
"- code:ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java#protected Class loadClass(String name, boolean resolve): Where the first-load race is; the lock goes here.",
"- code:ProjectFortress/src/com/sun/fortress/runtimeSystem/RTHelpers.java#static Object loadClosureClass(long l, BAlongTree t,: Where a null class from the race is used; check the fix covers it.",
"- code:ProjectFortress/src/com/sun/fortress/runtimeSystem/RttiTupleMap.java#private RTTI putIfNewHelper: The team's race-safe get then putIfNew; a model for the lock.",
"- code:ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/RTTIsize.java#public static RTTI of(String size): putIfAbsent returning the winner, the pattern rung Z took.",
"- code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forTypecase(Typecase x): Row 351's typecase site; bind the clause's name as a local here.",
"- code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forTry(Try x): Row 351's catch site; the same fix.",
"- code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public String delegate(Expr x: Row 419's site, a task in a generic declaration.",
"- code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x): The closure device row 419's fix copies.",
"- code:Library/FortressLibrary.fss#The identity of + and of juxtaposition..multiplicativeIdentity[: Answer 7's identity functions, the only library lines you may change.",
"- code:Library/FortressLibrary.fss#combining two relational predicates into..Combined condition for relational predicates: andCondCombine, the library's second clause binding, at an arrow type over its own type parameter; your typecase fix must read rp and rq, and a test in its shape shows it.",
"- Generic instantiations: How the loader stamps instantiations; the context of rows 417 and 420.",
"- The XXX expected-failure mechanism in compiler_tests/: A run-time defect needs two .test files; the shape of your dispatch tests.",
"- The gate's thread count is pinned: Why testFast runs one thread; FirstLoadThreadsRungG passes there and is gated at four by the stage.",
"- The replacement for SUM's and PROD's catch-all: The judgement behind answer 7; the values the identities keep.",
"- The compile ladder loses one file: Why a compiled check of a SUM's identity waits for the switch-over; say so in your report.",
"- Under walk, the interpreter converts by coercion: Why a typed local binding converts a numeral; one way to pass a T through cast.",
"- A size is carried at run time as a descriptor: How sizes run compiled; the context of row 420's size twin.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll, or the linker's state is lost.",
"- map:compile-path-walkthrough.md#6. The run: the second JVM and the class loader: The class loader's walkthrough; read it before row 417.",
"- map:compile-path-walkthrough.md#What the loader and the code generator lack: Known gaps of the loader and the code generator; row 420's site may be one.",
"- map:README.md#Touch this@runtimeSystem/: What a runtimeSystem edit moves and which tests guard it; run those.",
"- map:README.md#Touch this@compiler/codegen/: What a codegen edit moves and which tests guard it; run those.",
"",
].join('\n')

const V_TAIL = [
"",
"## Your rung: V - RR32 a sibling of RR64",
"",
"SLUG is rung-rr32-sibling. WORKTREE is /home/user/fortress-rr32, branch wip/rung-rr32-sibling.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-6.5.md, section 3, under \"V. RR32 a sibling of RR64\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Section 1's one question is answered, and it changes nothing in this rung. Batch N's first run (rungs I, K, T and M) has landed under this run's base, and where it meets this rung is below (\"Where this rung meets batch N\").",
"",
"**The problem.** RR32 is the one number type of the one library still below another: value object RR32 extends RR64 (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47, .fss:203), and RR64 comprises { Float, FloatLiteral, RR32 } (Library/FortressLibrary.fsi:291-294). An RR32 value is then also an RR64 value, which the specification forbids: \"These types are mutually exclusive; no value has more than one of them\" (Specification/basic/types-vals-vars.tex:536), kept by the later Types chapter (Documentation/Specification/Prose/Language/types.tick:977-978). RR32's binary natives declare b:RR64 and read it with getRR32(), so an RR32 with any other number ends the run with an InterpreterBug (row 435; ProjectFortress/tests/XXXRR32MixedRungF.fss). By reading, an RR64-typed value may be an RR32 at run time, whose operators answer RR32, which unboxing by static type in phase 6 could not follow (explorations/reviews/batch-6-conformance.md, finding 3). It entered batch 6 as its record's reading, not a decision.",
"",
"**The decisions.** Route A (POSITIONS 2026-09-24): the number types siblings under Number, each carrying its own algebra. Answer 8 (2026-09-26): an exact conversion is a coercion, a lossy one explicit; every RR32 value is exact in RR64. The number chapters describe the library (answer 6; 2026-09-26, the number chapters under S2), so the chapter names RR32 once it is a sibling, in the S1 form.",
"",
"**What the library and the specification already do.** Evidence, not the brief; the rung lists every way before it chooses. The compiler library's RR32 is a sibling that RR64 converts from (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435, :475-476). The specification's worked example computes an RR32 with an RR64 by RR64's declaration after a coercion (Specification/basic/conversions-coercions.tex:875-912). Chase's 6896886fb (2009-08-31) cut the subtype in the compiler library, \"RR32 is NOT a subtype of RR64\", and Steele's retrospective draws the floats as siblings (research/extracts/SteeleJuliaCon2016-extract.md:159-161). The flat library's RR64 is the model of what a float carries at its own type (Library/FortressLibrary.fsi:291-294 and its body). The probe built two shapes (explorations/compile-ladder/plan-6.5/probes/rr32/; NOTES.md section 6). The first (rr32-sibling.patch) met three library sites: RR32's exponent overloads, where ^(self, b:ZZ64):RR32 and MultiplicativeRing's ^(self, other:AnyIntegral): T break the return-type rule beside ^(self, b:Number):RR64 once RR32 is no longer an RR64; and Number's =, which finds a float by typecase ... RR64 alone (Library/FortressLibrary.fss:364-371). Its corpus pass found a fourth: RR32's api declares its getters, one ^ and MINNUM/MAXNUM only (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47-74), so the operators it shares with RR64 outside the algebra traits (/, SQRT, the _UP, _DOWN and IEEE_ forms, floor and the rest) reach a program only as RR64's, which converted both operands and answered an RR64; the team's testRR32 then failed at its line 30 (RR32Div2.sibling.txt). The second shape (rr32-sibling-api.patch) declares RR32's operators in its api as RR64's api declares its own (Library/FortressLibrary.fsi:318-377); with it every operator answers an RR32 (RR32Div2.sibling-api.txt), and RR32Micro prints the specification's answers where the base ends with row 435's InterpreterBug (RR32Micro.base.txt, RR32Micro.sibling-api.txt).",
"",
"**Where this rung meets batch N.** Batch N's first run (I 8dc1a74d9, K 041682188, T f54ffac90, M 2770550c3) edited none of this rung's declarations, and its inserted lines move none this rung cites: M's sit below RR64 in both library files and below RR32 in FortressBuiltin. It meets this rung in three places.",
"- Rung M gave each integer type its own MIN, MAX and MINMAX (row 484; POSITIONS 2026-09-28, the two decisions of the conversion judgement, decision 2), and its precedent search counts RR32's three as already declared (explorations/compile-ladder/rung-integer-minmax/REPORT.md section 3). They are declared in RR32's component only, on natives, and typed at RR64 since rung F (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:263-268), which holds only while an RR32 is an RR64. They are among the RR32 declarations this rung restates; decision 2's device, and RR64's own (Library/FortressLibrary.fss:427-429, api Library/FortressLibrary.fsi:326-328), declare them at the type's own type. ProjectFortress/tests/IntegerMinMaxRungM.fss stays green.",
"- Rung K made walk infer a generic's static arguments with coercion, convert at a generic declaration and re-instantiate the declaration it chose by answer 8's promotion from the arguments' run-time types; rung I made the compiled checker infer with coercion and the promotion, with an ambiguity check for a tie among declarations reached only by coercion (POSITIONS 2026-09-28, decision 1). By reading, once RR32 is a sibling an RR32 beside an RR64 reaches RR64 through RR64's coerce from it in both rules, where today it reaches RR64 as a supertype, and the count stage's checker, which runs I's rule over the one library, reads the new coercion too. The probe's prediction (below, \"The comparison\") was measured before batch 6.5's first run and batch N's first run, so the comparison's own base passes are this rung's comparands, and an output changed through these rules is listed with its cause.",
"- Rung T's entry, \"The inference of a call's static arguments\" (Specification/appendices/changes.tex:1549), is now Appendix I's last revision entry, after rung P's \"The algebra of the rational trait\" (:1504); this rung's subsections go after T's, before \"Passages not yet revised\" (:1713).",
"",
"**The test, first.** One new file in ProjectFortress/tests/, in the form of ProjectFortress/tests/roundBug.fss, each value checked by value and by run-time class through one helper, as ProjectFortress/tests/IntSemanticsRungI.fss:14-18 does, each message citing its source: an RR32 is not an RR64 in a typecase; RR32 with RR32 answers an RR32, for an operator of the algebra traits and for one that only RR64's api declares today (/, SQRT); RR32 with an RR64, a float numeral or a ZZ32 answers the RR64 the specification's example gives; an RR32 bound to an RR64 variable converts; RR32 compared with an RR64 by =, < and CMP. XXXRR32MixedRungF.fss promoted by git mv once it passes. Captured failing before the edit.",
"",
"**The comparison.** As rung F's (explorations/compile-ladder/rung-flat-tower/count-run.sh, compare-normalised.py; its REPORT.md): every file of ProjectFortress/tests/ except the new test, in three passes, base A, the edit, base B, one JVM per test with private caches, normalised as batch 5 normalised (POSITIONS 2026-09-26, batch 5's go, Q2), XXXInheritedOverload.fss listed as unstable (row 430); every changed output listed with its cause, and every changed team-test line with its before and after. The probe's passes are the prediction (NOTES.md section 6), measured before batch 6.5's first run and batch N's first run (\"Where this rung meets batch N\"): with the second shape, 387 of the 414 files print what the base prints, 7 more once the library's moved lines are normalised, 17 differ between the two base passes too, and 3 change, each keeping the verdict the rung expects: row 435's expected failure passes, and two expected failures print a changed message (a candidate list naming RR32's own -, and two declarations in the other order, as row 430's). testRR32 passes only once RR32's api declares its operators.",
"",
"**Files it may touch.** ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, RR32's declarations only; in Library/FortressLibrary.fsi and .fss, Number's comprises clause and its =, and RR64's header and a coerce; the team's test lines that assert RR32 below RR64, each keeping the value it checks; the new test and the renamed XXXRR32MixedRungF; Specification/basic-lib/numbers.tex, the passage that names the number types and their coercions (:27-49), with its callout and its own subsections of Specification/appendices/changes.tex after the last revision entry, before \"Passages not yet revised\", re-read on the base, which puts them after batch N's rung T's \"The inference of a call's static arguments\" (:1549), itself after P's (as one run, P's first); and the sentence of batch 6's entry \"The number types\" that says the library's RR32 stays below RR64 (changes.tex:485-486), which this rung makes wrong, revised as batch N's rung T revised one sentence of batch 7R's entry \"The integer type of a range\"; the messages and comments of any test whose citation of a line of numbers.tex its edit moves, re-anchored by the map of unchanged lines as rung P's section says, never an assertion; its own directory. Stops: any other library declaration; explorations/run-c4/ and explorations/apl/ (neither names RR32, by a grep).",
"",
"**Java or Scala.** None expected: the declared parameter types carry the fix (row 435's second fix). If a native must change after all, the smallest change, reported with the alternative, and ant compileAll before every run after it.",
"",
"**The checker count.** Reported and classified: the FortressBuiltin api reaches the count stage (its row has read 0 since rung F, in every landed table since, batch 6.5's first run's among them), and a new or gone row there is the rung's to tie to its edit. Before: the last landed gate's checker-count.txt, the table the gate itself compares against (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: climb-batch-7C/gate/ for the first run; for the second, climb-batch-N/gate/, batch N's first run's, which landed after the first), not a run of the stage on the rung's unchanged base; after: captured on the rung's tree (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken; the intro says when the base has changed under the table).",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict other than the rung's own; testRR32.fss, RoundHalfEvenRungR.fss, FlatTowerRungF.fss; batch N's IntegerMinMaxRungM.fss and InferCoercionRungK.fss; the two microGPT checks, which name no RR32, at 40 of 40.",
"",
"**Stops.** A changed walk output its comparison does not account for. A team test line changed other than one that asserts RR32 below RR64, keeping its value. A coercion beyond RR64's from RR32. The specification's sentence stating more than the landed library. Not a stop: rung D's run-to-run rule.",
"",
"**For the skeptic.** The new test's cases, walk against the compiled run where the compiler library has them (its RR32 is a sibling already); each changed output against its stated cause; each restated RR32 declaration against RR64's and against the probe's shape; RR32's MIN, MAX and MINMAX with an RR32 and with an RR64, walk against the compiled run; a generic call over an RR32 and an RR64, under walk and compiled, against the promotion batch N built; the chapter's sentence against the landed library.",
"",
"**What comes back to Pavol.** The changed outputs with their causes; any team test line restated.",
"",
"**What it closes.** Row 435 (fixed; its expected failure promoted). Notes: batch 6's review, finding 3, on the batch 6 record's reading.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-24 exclusion route rung P's fork: Route A, the number types siblings under Number with their own algebra; the reason RR32 stops being an RR64.",
"- positions:2026-09-26 answer 8: An exact conversion is a coercion and a lossy one explicit; RR64 converts from RR32 and from nothing more.",
"- positions:2026-09-28 two decisions of Fable's judgement: Decision 1 is what batch N's rungs I and K built, whose inference reads your new coercion; decision 2, each type's own MIN, MAX and MINMAX, is the device for RR32's three you restate.",
"- positions:2026-09-26 answer 6: The number chapters describe the library; the chapter names RR32 once it is a sibling.",
"- positions:2026-09-26 number chapters under S2: The chapters are checked against the library; your sentence states no more than the landed library.",
"- positions:2026-09-26 S1: The form of your specification change: a callout, an Appendix I entry quoting the original, a decision record.",
"- positions:2026-09-26 first of the batch-5 answers: Quote the original as the Working Draft of February 2011, with its path and line in Specification-1.0-frozen/.",
"- positions:2026-09-26 lineage note: Cite the later Types chapter beside, which keeps the number types exclusive.",
"- positions:2026-09-26 climb batch 5 coordinator/CLIMB-BATCH-5.md: Batch 5's comparison masks, its Q2; your corpus comparison normalises the same way.",
"- positions:2026-09-26 Q1 of batch 6: A team test line the change breaks is respelled keeping its value, never deleted; the rule for a line that asserts RR32 below RR64.",
"- positions:2026-09-19 answering the open question: The library's practice is the standard; RR64's declarations are the model for RR32's.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your checker count's before: the last landed gate's table, not a run of the stage on your unchanged base; capture only the after.",
"- ledger:435: RR32's natives read their argument as an RR32; the row you close, its expected failure promoted.",
"- ledger:430: The overload message's order varies from run to run; a changed order in your comparison is this row, not a stop.",
"- doc:explorations/reviews/batch-6-conformance.md#Findings that need Pavol@still a subtype: The finding that RR32 below RR64 was a record's reading and not a decision.",
"- doc:explorations/reviews/batch-6-conformance.md#Standard 2: the team's built intent@RR32 stays below: The compiler library already has RR32 a sibling that RR64 converts from.",
"- doc:Specification/basic/types-vals-vars.tex#Types in the Fortress Standard Libraries: The sentence that the number types are mutually exclusive, the rule your edit restores.",
"- doc:Specification/basic/conversions-coercions.tex#Automatic Widening: The worked example that converts an RR32 into RR64 arithmetic; your test's expected answers.",
"- code:Specification/basic-lib/numbers.tex#The number types of this chapter are..is explicit, written: The passage that names the number types and their coercions; you name RR32 in it.",
"- doc:Documentation/Specification/Prose/Language/types.tick#Types in the Fortress Standard Libraries: The later Types chapter's same sentence, cited beside.",
"- doc:research/extracts/SteeleJuliaCon2016-extract.md#The type system, and where it broke: Steele's retrospective draws the floats as siblings; cite it in the decision record.",
"- doc:explorations/compile-ladder/plan-6.5/NOTES.md#a sibling of: The probe's two shapes and corpus passes; your comparison's prediction.",
"- doc:explorations/compile-ladder/plan-6.5/probes/rr32/rr32-sibling-api.patch: The probe's second shape; evidence to start from, not the brief.",
"- doc:ProjectFortress/tests/XXXRR32MixedRungF.fss: Row 435's expected failure, promoted once it passes.",
"- doc:explorations/compile-ladder/rung-flat-tower/REPORT.md#11. The comparison: Rung F's corpus comparison, the method you repeat.",
"- code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object RR32 extends RR64: RR32's api, which you restate.",
"- code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object RR32 extends RR64: RR32's component, which you restate.",
"- doc:explorations/compile-ladder/rung-integer-minmax/REPORT.md#3. Precedent search: Rung M's search counts RR32's MIN, MAX and MINMAX as already declared, read while RR32 is an RR64 and typed at RR64; you restate them at RR32.",
"- code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR64 extends { Number, Equality: The compiler library's RR64 with its coerce from RR32; the team's shape.",
"- code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR32 extends { Number, Equality: The compiler library's sibling RR32.",
"- code:Library/FortressLibrary.fsi#trait RR64 extends { Number, StandardPartialOrder: The one library's RR64 api, the model for RR32's operators.",
"- code:Library/FortressLibrary.fss#trait Number extends { AnyAdditiveGroup: Number's comprises clause and its =, which you change for RR32.",
"- The one library's number tower is flat: The tower as landed and its coercion table; RR32 joins it.",
"- The specification's number chapters describe the flat library: What the chapter already says; your sentence joins it.",
"- Under walk, the interpreter converts by coercion: Why an RR32 converts to RR64 at a parameter under walk.",
"- Specification-1.0-frozen/ is byte for byte: The frozen copy is the Working Draft of February 2011: quote originals from it, and never edit it (a stop).",
"- The team's latest word on types: The later Types chapter's standing, cited beside the specification.",
"- map:spec-to-implementation.md#What the compiler prelude has of the tower: What the compiler prelude has of the tower, for the comparison with the compiled run.",
"",
].join('\n')

const E_ENTRY = { id: 'E', slug: 'rung-size-range', path: '/home/user/fortress-sizerange', branch: 'wip/rung-size-range', tail: E_TAIL, expectedMinutes: 210, writesState: false, testIsStage: false, expectedCheckerCount: CHECKER_BASE,
    blurb: "both paths refuse a size beyond NN32 (ZZ32 for an int size) as the decision on a size's range says, walk reads the sizes in range exactly (row 418), NatRtBigSize restated to the range; walk's LCM on the unsigned types, ^ and CHOOSE raise IntegerOverflow where the result does not fit (NN32's LCM and the nine natives rung O left); and the range bodies of rows 450 and 451 reordered on the checked operators; with the link and XXX run tests batch N owes for rows 447 and 505, tests only; Scala under scala_src/, Java under interpreter/, and two library files.",
    briefing: [
      "positions:2026-09-27 size's range", "positions:2026-09-28 size used as a value", "positions:2026-09-29 batch N's first run",
      "positions:2026-09-22 ledger row 334", "positions:2026-09-24 ledger row 379", "positions:2026-09-26 fifth batch-5 answer",
      "positions:2026-09-26 rung O of climb batch 4", "positions:2026-09-24 run-time size design", "positions:2026-09-26 fourth batch-5 answer",
      "positions:2026-09-21 nat plan", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "positions:2026-09-28 rungs re-running measurements", "ledger:418", "ledger:334", "ledger:347", "ledger:450", "ledger:451", "ledger:503",
      "ledger:447", "ledger:505", "ledger:438", "ledger:441", "ledger:307", "doc:explorations/compile-ladder/rung-size-runtime/JUDGE.md#For Pavol",
      "doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@size's range",
      "doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@size-range",
      "doc:explorations/reviews/batch-3.5-4-conformance.md#Smaller findings, for the record@sign-extended operands",
      "doc:explorations/reviews/batch-6b-7-conformance.md#Findings@Nine natives still give no catchable",
      "doc:explorations/reviews/batch-6b-7-conformance.md#Findings@Rows 450 and 451 have a decided repair",
      "doc:explorations/reviews/batch-7R-conformance.md#Findings@Rows 450 and 451 have no batch",
      "doc:explorations/compile-ladder/climb-batch-N/JUDGE-review.md#2.2 What the specification settles, face by face",
      "doc:explorations/compile-ladder/climb-batch-N/JUDGE-review.md#2.3 The nat size face stays home 3",
      "doc:explorations/compile-ladder/climb-batch-N/JUDGE-review.md#2.4 The form",
      "doc:explorations/compile-ladder/climb-batch-N/RECORD.md#The landing@The second review",
      "doc:explorations/compile-ladder/rung-inference-checker/REPORT.md#6.6 The solver's two behaviours, and a size used as a value",
      "doc:explorations/compile-ladder/rung-inference-checker/REPORT.md#8. Every defect measured, and its home@A call the rule newly types",
      "doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters",
      "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators",
      "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie", "doc:Specification/basic/expressions/ranges.tex#Ranges",
      "doc:explorations/compile-ladder/plan-6.5/NOTES.md#5. NN32's LCM", "doc:explorations/compile-ladder/plan-6.5/NOTES.md#7. What was not probed",
      "doc:explorations/compile-ladder/plan-6.5/probes/lcm/NN32Lcm.walk.txt",
      "doc:explorations/compile-ladder/rung-inference-checker/probes/skeptic/SkBottomRun.fss",
      "doc:explorations/compile-ladder/rung-inference-checker/probes/skeptic/SkBottomRun.diff.txt",
      "doc:explorations/compile-ladder/rung-inference-checker/probes/repair/SigmaResultOnly.fss",
      "doc:explorations/compile-ladder/rung-inference-checker/probes/repair/SigmaResultOnly.diff.txt",
      "doc:explorations/compile-ladder/climb-batch-N/merged-tests/review-bottom-walk.txt",
      "doc:explorations/compile-ladder/rung-spec-inference/probes/skeptic/SkRangeBig.fss",
      "doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#3. The precedent search",
      "doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#8. The comparison",
      "doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#9. The logging pass",
      "doc:explorations/reviews/wrap-dependent-code.md#The library's own ways",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala#private val sizeArithmetic..private def hasSizeArithmetic",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala#def getType",
      "code:ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java#public void visitMethodInsn",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#public static void bindGenericParameters",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#public FType forIntArg",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java#public static final class Gcd extends NN2N..public static final class Choose extends NN2N",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java#public static final class Pow extends NativeMeth1",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java#public static int rc(long i)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static final class Lcm extends ZZ2Z..public static final class Choose extends ZZ2Z",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static final class Pow extends NativeMeth1",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static int rc(long i)..public static FortressError overflow()",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long lcm(long u, long v)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long choose(long n, long k)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long pow(long x, long y)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Long.java#public static final class Lcm extends LL2L..public static final class Choose extends LL2L",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Long.java#public static final class Pow extends NativeMeth1",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java#public static final class Gcd extends UU2U..public static final class Choose extends UU2U",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java#public static final class Pow extends NativeMeth1",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java#public static long choose(long n, long k)..public static long pow(long x, long y)",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java#public static int intToIntPower(int a, int b)",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java#public static int intOverflowingChoose(int n, int k)",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java#public static long longOverflowingChoose(long n, long kk)",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java#public static int unsignedIntOverflowingChoose(int n, int k)",
      "code:Library/RangeInternals.fss#trait CompactFullScalarRange extends..getter isEmpty(): Boolean = self.lower > self.upper",
      "code:Library/RangeInternals.fss#trait StridedFullScalarRange..getter isEmpty(): Boolean =",
      "code:Library/RangeInternals.fss#object CompactFullSeqScalarRange(l:ZZ32, r:ZZ32)",
      "code:Library/RangeInternals.fss#object StridedFullSeqScalarRange(l:ZZ32, r:ZZ32, str:ZZ32)",
      "code:Library/RangeInternals.fss#sized1Range(lo:ZZ32,ex:ZZ32)..sized3Range(", "code:Library/FortressLibrary.fss#trait CompactFullRange[",
      "code:Library/RangeInternals.fss#meetingPoint(init0:ZZ32", "doc:ProjectFortress/compiler_tests/NatRtBigSize.fss",
      "doc:ProjectFortress/tests/XXXNatBigSizeWalk.fss", "doc:ProjectFortress/compiler_tests/XXXNatArithChecker.fss",
      "doc:ProjectFortress/compiler_tests/XXXNatArithChecker.test", "doc:ProjectFortress/compiler_tests/XXXNumeralBeyondWidthMax.fss",
      "doc:ProjectFortress/compiler_tests/XXXNumeralBeyondWidthMax.test", "doc:ProjectFortress/compiler_tests/NumeralBeyondWidthMaxLink.test",
      "doc:ProjectFortress/tests/XXXNatValueNN32RungK.fss",
      "code:ProjectFortress/tests/IntSemanticsRungI.fss#overflows(f: () -> Any): Boolean =..zz32Shown(v: Any): String =",
      "doc:ProjectFortress/tests/XXXRangeBoundsRungO.fss", "doc:ProjectFortress/tests/XXXRangeEmptyHashRungO.fss",
      "doc:ProjectFortress/tests/XXXSeqRangeTopRungO.fss", "A size is carried at run time as a descriptor",
      "The compiled type checker checks nat and int static parameters", "A size at run time can follow the opr path", "The interpreter's integer rules",
      "Under walk, a native can raise a Fortress exception", "Under walk, fixed-width integer arithmetic raises",
      "The one library's scalar ranges are over", "What relies on fixed-width wrapping under", "An XXX compile test pinned by compile_err_contains",
      "An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "The XXX expected-failure mechanism in compiler_tests/",
      "ant compileAll deletes a tracked file", "map:compile-path-walkthrough.md#What the specification says it is",
      "map:README.md#Touch this@scala_src/typechecker", "map:README.md#Touch this@interpreter/ (evaluator"],
    checks: [
      "positions:2026-09-27 size's range", "positions:2026-09-28 size used as a value", "positions:2026-09-29 batch N's first run",
      "positions:2026-09-22 ledger row 334", "positions:2026-09-24 ledger row 379", "positions:2026-09-26 fifth batch-5 answer",
      "positions:2026-09-26 rung O of climb batch 4", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "positions:2026-09-28 rungs re-running measurements", "ledger:418", "ledger:334", "ledger:347", "ledger:450", "ledger:451", "ledger:503",
      "ledger:447", "ledger:505", "doc:explorations/compile-ladder/climb-batch-N/JUDGE-review.md#2.4 The form",
      "doc:explorations/reviews/batch-6b-7-conformance.md#Findings@Nine natives still give no catchable",
      "doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters",
      "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators", "doc:Specification/basic/expressions/ranges.tex#Ranges",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala#private val sizeArithmetic..private def hasSizeArithmetic",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#public static void bindGenericParameters",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#public FType forIntArg",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java#public static final class Gcd extends NN2N..public static final class Choose extends NN2N",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static final class Pow extends NativeMeth1",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java#public static int intToIntPower(int a, int b)",
      "code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java#public static int intOverflowingChoose(int n, int k)",
      "code:Library/RangeInternals.fss#trait CompactFullScalarRange extends..getter isEmpty(): Boolean = self.lower > self.upper",
      "code:Library/RangeInternals.fss#object CompactFullSeqScalarRange(l:ZZ32, r:ZZ32)",
      "code:Library/RangeInternals.fss#sized1Range(lo:ZZ32,ex:ZZ32)..sized3Range(", "doc:ProjectFortress/compiler_tests/NatRtBigSize.fss",
      "The compiled type checker checks nat and int static parameters", "The XXX expected-failure mechanism in compiler_tests/"],
    expectedMoves: [] }

const P_ENTRY = { id: 'P', slug: 'rung-spec-integer-rules', path: '/home/user/fortress-intprose', branch: 'wip/rung-spec-integer-rules', tail: P_TAIL, expectedMinutes: 120, writesState: false, testIsStage: false, expectedCheckerCount: CHECKER_BASE,
    blurb: "the integer rules of 2026-09-22 and 2026-09-24 in the specification in the S1 form, row 394's coercion example given its exclusion, the rational type's listing given the library's algebra, the test citations rung S moved that batch 7C's rung X listed re-anchored, the scalar block's comment reworded, and the expected-failure walk tests rows 440 and 443 owe; an original-tree edit, no source file.",
    briefing: [
      "positions:2026-09-22 ledger row 335", "positions:2026-09-22 ledger row 334", "positions:2026-09-22 ledger row 333",
      "positions:2026-09-22 ledger row 346", "positions:2026-09-22 design principle for integer semantics", "positions:2026-09-24 climb batch 3.5",
      "positions:2026-09-24 ledger rows 380 and 381", "positions:2026-09-24 requirement on the plan", "positions:2026-09-26 S1",
      "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 lineage note", "positions:2026-09-26 number chapters under S2",
      "positions:2026-09-26 answer 6", "positions:2026-09-19 answering the open question", "positions:2026-09-27 stops a batch record reserves",
      "positions:2026-09-26 rung D's stop", "positions:2026-09-28 rungs re-running measurements", "ledger:394", "ledger:440", "ledger:443", "ledger:335",
      "ledger:346", "doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1",
      "doc:explorations/compile-ladder/rung-spec-comprises/REPORT.md#The re-anchoring",
      "doc:explorations/compile-ladder/rung-spec-comprises/probes/reanchor/stale-scan.txt",
      "doc:explorations/compile-ladder/rung-spec-numbers/JUDGE.md#1.5 Example 1 against the numerals",
      "doc:explorations/compile-ladder/rung-spec-numbers/JUDGE.md#1.8 The rows",
      "doc:explorations/reviews/batch-3.5-4-conformance.md#Batch 3.5 as a whole",
      "doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@specification is behind",
      "doc:explorations/reviews/batch-3-conformance.md#Findings that need Pavol@library comment",
      "doc:explorations/reviews/batch-6-conformance.md#Smaller findings, for the record@algebraic supertraits",
      "doc:Specification/basic-lib/basic-integers.tex#Integers", "code:Specification/basic-lib/numbers.tex#%% trait QQ..%% end",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators",
      "doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators",
      "doc:Specification/appendices/changes.tex#The integer trait", "doc:Specification/appendices/changes.tex#Passages not yet revised",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
      "doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#2. The one reading everything rational rests on",
      "doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#5. Decisions taken inside the rung",
      "doc:explorations/compile-ladder/rung-library-comments/REPORT.md#5. How the change was verified",
      "doc:explorations/compile-ladder/plan-6.5/probes/numeral/NumMicro.base.txt", "code:Library/FortressLibrary.fsi#trait QQ extends..comprises { ... }",
      "code:Library/FortressLibrary.fss#(*) Scalar extension: an array of numbers..declarations beside these.",
      "code:Library/FortressLibrary.fsi#(*) Scalar extension: an array of numbers..declarations beside these.", "The compiled path's integer rules",
      "The interpreter's integer rules", "The specification's number chapters describe the flat library",
      "The specification states instantiation exclusion, and its refused examples", "Specification-1.0-frozen/ is byte for byte",
      "The team's latest word on types", "A comment placed after a declaration that ends in an expression",
      "Citing Specification/library/apis/*.tex as an independent standard is circular", "The one library's number tower is flat",
      "map:README.md#Touch this@Specification/ (the standard)", "index:number chapters"],
    checks: [
      "positions:2026-09-28 rungs re-running measurements", "positions:2026-09-22 ledger row 335", "positions:2026-09-22 ledger row 334",
      "positions:2026-09-22 ledger row 333", "positions:2026-09-22 ledger row 346", "positions:2026-09-22 design principle for integer semantics",
      "positions:2026-09-24 climb batch 3.5", "positions:2026-09-24 ledger rows 380 and 381", "positions:2026-09-26 S1",
      "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 number chapters under S2", "positions:2026-09-26 answer 6", "ledger:394",
      "ledger:440", "ledger:443", "doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1",
      "doc:explorations/compile-ladder/rung-spec-comprises/probes/reanchor/stale-scan.txt", "code:Specification/basic-lib/numbers.tex#%% trait QQ..%% end",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
      "code:Library/FortressLibrary.fsi#trait QQ extends..comprises { ... }", "The compiled path's integer rules", "The interpreter's integer rules"],
    expectedMoves: [] }

const G_ENTRY = { id: 'G', slug: 'rung-generic-runtime', path: '/home/user/fortress-genrt', branch: 'wip/rung-generic-runtime', tail: G_TAIL, expectedMinutes: 300, writesState: true, testIsStage: false, expectedCheckerCount: CHECKER_BASE,
    blurb: "the compiled path's generics at run time: the class loader's first load at four threads (row 417), a parallel task in a generic declaration (row 419), a generic method over two sets of parameters (row 420), the two dispatch defects, and a typecase or catch clause's bound name (row 351, the cause of row 426), with answer 7's identity functions passing values of type T through cast; Java under runtimeSystem/ and compiler/.",
    briefing: [
      "doc:explorations/coordinator/PLAN.md#Phase 2b. The repair batch from the conformance reviews", "positions:2026-09-26 answer 9",
      "positions:2026-09-26 answer 7 catch-all", "positions:2026-09-24 run-time size design", "positions:2026-09-26 fourth batch-5 answer",
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-17 a standing preference",
      "positions:2026-09-19 after climb batch 1 landed", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "positions:2026-09-28 rungs re-running measurements", "ledger:417", "ledger:419", "ledger:420", "ledger:351", "ledger:426", "ledger:415",
      "doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@Three compiled-path defects",
      "doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@cannot hold a defect",
      "doc:explorations/reviews/batch-3-conformance.md#Two compiled dispatch defects that stayed out of every list",
      "doc:explorations/reviews/batch-6-conformance.md#Findings that need Pavol@identity on the compiled path",
      "doc:explorations/reviews/batch-6b-7-conformance.md#Findings@second clause-binding site",
      "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#2. The design",
      "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#3. The size, measured",
      "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#4. The two side defects",
      "doc:explorations/reviews/sum-replacement-judgement.md#7. Three checks that tell the options apart, still open",
      "doc:explorations/compile-ladder/plan-6.5/NOTES.md#2. Row 426",
      "doc:explorations/compile-ladder/plan-6.5/NOTES.md#3. The two compiled dispatch defects",
      "doc:explorations/compile-ladder/plan-6.5/NOTES.md#4. Row 419", "doc:explorations/compile-ladder/plan-6.5/probes/dispatch/callsite-rebased.patch",
      "doc:explorations/compile-ladder/rung-size-runtime/probes/xxx-task-red-demo-fix.patch",
      "doc:explorations/compile-ladder/rung-size-runtime/probes/skeptic/ZsThreadsT.fss", "doc:ProjectFortress/compiler_tests/XXXNatRtTask.fss",
      "doc:ProjectFortress/compiler_tests/XXXNatRtMethBoth.fss", "doc:ProjectFortress/library_tests/XXXClauseBindingRungB.fss",
      "doc:explorations/compile-ladder/rung-exclusion-remainder/probes/skeptic/SkTcBind.fss",
      "code:ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java#protected Class loadClass(String name, boolean resolve)",
      "code:ProjectFortress/src/com/sun/fortress/runtimeSystem/RTHelpers.java#static Object loadClosureClass(long l, BAlongTree t,",
      "code:ProjectFortress/src/com/sun/fortress/runtimeSystem/RttiTupleMap.java#private RTTI putIfNewHelper",
      "code:ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/RTTIsize.java#public static RTTI of(String size)",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forTypecase(Typecase x)",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forTry(Try x)",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public String delegate(Expr x",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)",
      "code:Library/FortressLibrary.fss#The identity of + and of juxtaposition..multiplicativeIdentity[",
      "code:Library/FortressLibrary.fss#combining two relational predicates into..Combined condition for relational predicates", "Generic instantiations",
      "The XXX expected-failure mechanism in compiler_tests/", "The gate's thread count is pinned", "The replacement for SUM's and PROD's catch-all",
      "The compile ladder loses one file", "Under walk, the interpreter converts by coercion", "A size is carried at run time as a descriptor",
      "ant compileAll deletes a tracked file", "map:compile-path-walkthrough.md#6. The run: the second JVM and the class loader",
      "map:compile-path-walkthrough.md#What the loader and the code generator lack", "map:README.md#Touch this@runtimeSystem/",
      "map:README.md#Touch this@compiler/codegen/"],
    checks: [
      "doc:explorations/coordinator/PLAN.md#Phase 2b. The repair batch from the conformance reviews", "positions:2026-09-26 answer 9",
      "positions:2026-09-26 answer 7 catch-all", "positions:2026-09-24 run-time size design", "positions:2026-09-27 stops a batch record reserves",
      "positions:2026-09-26 rung D's stop", "positions:2026-09-28 rungs re-running measurements", "ledger:417", "ledger:419", "ledger:420", "ledger:351",
      "ledger:426", "doc:explorations/reviews/batch-3-conformance.md#Two compiled dispatch defects that stayed out of every list",
      "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#4. The two side defects",
      "code:ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java#protected Class loadClass(String name, boolean resolve)",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forTypecase(Typecase x)",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forTry(Try x)",
      "code:Library/FortressLibrary.fss#The identity of + and of juxtaposition..multiplicativeIdentity[",
      "code:Library/FortressLibrary.fss#combining two relational predicates into..Combined condition for relational predicates",
      "The XXX expected-failure mechanism in compiler_tests/", "The replacement for SUM's and PROD's catch-all"],
    expectedMoves: [] }

const V_ENTRY = { id: 'V', slug: 'rung-rr32-sibling', path: '/home/user/fortress-rr32', branch: 'wip/rung-rr32-sibling', tail: V_TAIL, expectedMinutes: 150, writesState: false, testIsStage: false,
    blurb: "RR32 a sibling of RR64 under Number (route A, answer 8): RR64 converts from it, its arithmetic takes an RR32 (row 435), the team's test lines that assert the subtype restated with their values, and one sentence in the number chapter in the S1 form; library and builtin declarations only.",
    briefing: [
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-26 answer 8", "positions:2026-09-28 two decisions of Fable's judgement",
      "positions:2026-09-26 answer 6", "positions:2026-09-26 number chapters under S2", "positions:2026-09-26 S1",
      "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 lineage note",
      "positions:2026-09-26 climb batch 5 coordinator/CLIMB-BATCH-5.md", "positions:2026-09-26 Q1 of batch 6",
      "positions:2026-09-19 answering the open question", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "positions:2026-09-28 rungs re-running measurements", "ledger:435", "ledger:430",
      "doc:explorations/reviews/batch-6-conformance.md#Findings that need Pavol@still a subtype",
      "doc:explorations/reviews/batch-6-conformance.md#Standard 2: the team's built intent@RR32 stays below",
      "doc:Specification/basic/types-vals-vars.tex#Types in the Fortress Standard Libraries",
      "doc:Specification/basic/conversions-coercions.tex#Automatic Widening",
      "code:Specification/basic-lib/numbers.tex#The number types of this chapter are..is explicit, written",
      "doc:Documentation/Specification/Prose/Language/types.tick#Types in the Fortress Standard Libraries",
      "doc:research/extracts/SteeleJuliaCon2016-extract.md#The type system, and where it broke",
      "doc:explorations/compile-ladder/plan-6.5/NOTES.md#a sibling of", "doc:explorations/compile-ladder/plan-6.5/probes/rr32/rr32-sibling-api.patch",
      "doc:ProjectFortress/tests/XXXRR32MixedRungF.fss", "doc:explorations/compile-ladder/rung-flat-tower/REPORT.md#11. The comparison",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object RR32 extends RR64",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object RR32 extends RR64",
      "doc:explorations/compile-ladder/rung-integer-minmax/REPORT.md#3. Precedent search",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR64 extends { Number, Equality",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR32 extends { Number, Equality",
      "code:Library/FortressLibrary.fsi#trait RR64 extends { Number, StandardPartialOrder",
      "code:Library/FortressLibrary.fss#trait Number extends { AnyAdditiveGroup", "The one library's number tower is flat",
      "The specification's number chapters describe the flat library", "Under walk, the interpreter converts by coercion",
      "Specification-1.0-frozen/ is byte for byte", "The team's latest word on types",
      "map:spec-to-implementation.md#What the compiler prelude has of the tower"],
    checks: [
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-26 answer 8", "positions:2026-09-28 two decisions of Fable's judgement",
      "positions:2026-09-26 answer 6", "positions:2026-09-26 number chapters under S2", "positions:2026-09-26 rung D's stop",
      "positions:2026-09-28 rungs re-running measurements", "ledger:435",
      "doc:Specification/basic/types-vals-vars.tex#Types in the Fortress Standard Libraries",
      "doc:Specification/basic/conversions-coercions.tex#Automatic Widening",
      "code:Specification/basic-lib/numbers.tex#The number types of this chapter are..is explicit, written",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object RR32 extends RR64",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR64 extends { Number, Equality",
      "code:Library/FortressLibrary.fsi#trait RR64 extends { Number, StandardPartialOrder", "The one library's number tower is flat"],
    expectedMoves: [] }

const RUNGS = RUN === 'first' ? [G_ENTRY, P_ENTRY] : RUN === 'second' ? [E_ENTRY, V_ENTRY] : [G_ENTRY, P_ENTRY, E_ENTRY, V_ENTRY]
const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)

const INTRO_RUNG = {
  E: "E makes both paths refuse a size beyond NN32 (ZZ32 for an int size), as the decision on a size's range says; walk reads the sizes in range exactly (row 418); NatRtBigSize is restated to the range; NN32's LCM raises IntegerOverflow where the multiple does not fit, and so do the nine natives rung O left, ^ and CHOOSE on the four fixed widths and NN64's LCM (row 347); and the range bodies that relied on wrapping are reordered on the checked operators, as Pavol decided for the strided distance (rows 450 and 451); beside them it probes under walk the six tuple shifts of row 503; and it writes the tests batch N's first run owes by Pavol's decision of 2026-09-29, a plain link test and an XXX run test for each of the two programs that batch N's checker newly compiles and that then die in the JVM (rows 447 and 505), deciding nothing about what a type parameter nothing at the call fixes is bound to (PLAN.md item 18).",
  P: "P writes the integer rules of 2026-09-22 and 2026-09-24 into the specification in the S1 form, gives row 394's coercion example the exclusion its definition needs, states the library's algebra in the rational type's listing, re-anchors the test citations rung S moved and those its own edits move, rewords the scalar block's comment, and writes the expected-failure walk tests rows 440 and 443 owe.",
  G: "G repairs the compiled path's generics at run time: the class loader's first load at four threads (row 417), a parallel task in a generic declaration (row 419), a generic method over two sets of parameters (row 420), the two dispatch defects with the measured change, and a typecase or catch clause's bound name (row 351, the cause of row 426, at cast and at andCondCombine), with answer 7's identity functions passing values of type T through cast.",
  V: "V makes RR32 a sibling of RR64 under Number (route A, answer 8): RR64 converts from it, its arithmetic takes an RR32 (row 435), and the number chapter names it in the S1 form.",
}
const INTRO_STOPS = {
  E: "for E, a library declaration newly refused, a test's verdict changing other than its own, NatRtBigSize's restated lines and the three promoted range tests, a size inside NN32 or ZZ32 that stops reading back or dispatching, the type of a size read as a value changed, an interpreter output the natives or the range bodies change and a library body or team test found to rely on a native's wrap, a range whose elements all fit its type answering differently from the base, a negative power's branch or the power's declared type changed, for the owed tests of rows 447 and 505 an edit to the checker's inference or solver or to the run time or an assertion of what a parameter nothing fixes is bound to, and an edit to compiler/StaticChecker.java, to a library line other than the range bodies of rows 450 and 451, or to a file its section does not name",
  P: "for P, any edit under Specification-1.0-frozen/, normative text for a rule neither path runs, a passage whose new text neither the decisions nor the landed code settles (reported, not chosen), an assertion changed in a re-anchored test, and a library line other than the scalar block's two comments",
  G: "for G, a compiled test's verdict changing other than its own, a ladder file moving down, a four-thread run that deadlocks or times out twice, a compiler-library jar changing other than where a named fix predicts it, and an edit to the checker, walk or any library line other than the two identity functions",
  V: "for V, a changed walk output its comparison does not account for, a team test line changed other than one that asserts RR32 below RR64 (keeping its value), a coercion beyond RR64's from RR32, and the specification's sentence stating more than the landed library",
}
const INTRO_LIFTED = {
  E: "E restates NatRtBigSize's lines beyond NN32, moving its three lines beyond 4294967295 to the refusal test, and renames row 418's expected failure into a plain test (the decision on a size's range), and renames the three expected failures of rows 450 and 451 into plain tests once they pass, no assertion changed (POSITIONS.md, 2026-09-26, rung O of climb batch 4)",
  V: "V restates RR32's declarations and the team's test lines that assert RR32 below RR64, each keeping the value it checks, and renames row 435's expected failure into a plain test (route A and answer 8)",
}
const OVERLAP_RUNG = {
  E: "E edits checker files under ProjectFortress/src/com/sun/fortress/scala_src/, possibly runtimeSystem/MethodInstantiater.java, interpreter/evaluator/EvalType.java and what else walk's reading needs, the Lcm, Choose and Pow classes and their helpers in interpreter/glue/prim/Int.java, Long.java, NN32.java and UnsignedLong.java, the range bodies of rows 450 and 451 in Library/RangeInternals.fss and CompactFullRange's opr |self| in Library/FortressLibrary.fss, ProjectFortress/compiler_tests/NatRtBigSize.fss and new tests there, the owed pairs of rows 447 and 505 among them, and renames ProjectFortress/tests/XXXNatBigSizeWalk.fss and the three range tests of rows 450 and 451 and adds tests there.",
  P: "P edits Specification/ (never Specification-1.0-frozen/, and not Specification/fortress.pdf, which the gather rebuilds), the messages and comments of five revival tests and of any test whose citation its edits move, the scalar block's two comments in Library/FortressLibrary.fss and .fsi, and adds two XXX walk tests in ProjectFortress/tests/.",
  G: "G edits runtimeSystem/InstantiatingClassloader.java, RTHelpers.java and what the lock or row 420 needs, compiler/codegen/CodeGen.java and compiler/OverloadSet.java, additiveIdentity and multiplicativeIdentity in Library/FortressLibrary.fss, and adds and promotes tests in ProjectFortress/compiler_tests/ and library_tests/.",
  V: "V edits RR32's declarations in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, Number's comprises clause and =, and RR64's header and a coerce, in Library/FortressLibrary.fsi and .fss, the team's test lines that assert the subtype, the numbers.tex passage and its entries in Specification/appendices/changes.tex, and adds a test and renames XXXRR32MixedRungF.fss in ProjectFortress/tests/.",
}

const BATCH_INTRO = [
  "This batch is the repair batch of the plan's phase 2b (explorations/coordinator/PLAN.md, \"Phase 2b. The repair batch from the conformance reviews\"): what the conformance reviews of batches 3 to 6 found, with three findings of the reviews of batches 6b, 7 and 7R, repaired before phase 3.",
  RUN === 'first' ? "This run is its first, batch 6.5, rungs G and P; the second, batch 6.5b, carries rungs E and V and is cut from the tree this run lands. G runs first by Pavol's decision, since its rows are on microGPT's compiled run (POSITIONS.md, 2026-09-27, the numerics plans, decision 5); P and V edit the specification's number chapter and its changes appendix, so they run apart, and a run of the four would be the longest yet (the record's section 1, \"Two runs\")." : RUN === 'second' ? "This run is its second, batch 6.5b, rungs E and V, cut from the tree batch N's first run landed (rungs I, K, T and M) on top of batch 6.5's first run (rungs G and P), whose P edited the specification's number chapter and its changes appendix before V does (the record's section 1, \"Two runs\"). Batch N's first run edited none of E's or V's declarations; where its checker's inference, walk's inference, the inference chapter and each integer type's own MIN, MAX and MINMAX meet E and V is in the record's section 4, \"Against batch N's first run\", and in each rung's section, \"Where this rung meets batch N\". It also carries, in rung E, the tests batch N's first run owes for rows 447 and 505 (POSITIONS.md, 2026-09-29, batch N's first run)." : "This run carries the batch's four rungs as one, on Pavol's word; P and V share Specification/basic-lib/numbers.tex and Specification/appendices/changes.tex, which the gather orders as the record's section 4 says (the record's section 1, \"Two runs\").",
  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),
  "Each rung's section of the record opens with the answers of its section 1 that it follows; section 1's one question is answered (batch N carries the numeral switch) and changes no rung.",
  "A rung that captures the checker count or the distance stage before and after its edit takes as its before the last landed gate's table, the one the gate itself compares against (checker-count.txt or distance.txt in the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: climb-batch-7C/gate/ for the first run; for the second, climb-batch-N/gate/, batch N's first run's, which landed after the first), and does not run the stage on its unchanged base; it captures only the after, on its own tree. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, 2026-09-28, on rungs re-running measurements the landed gate had already taken; the process review's measure 4, explorations/reviews/process-review-6b-7-7R.md section 9).",
  "Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it (the same review's measure 5, approved with it): the worker reads that line before the entry and acts on it, and the skeptic, the repair round and the judges find the same lines in each tail of the record's section 7.",
  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file another rung of this run owns.',
  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next run waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1); the gather re-anchors the same way a citation that one rung's edit moved in another rung's test.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5, 4 and 5.",
  "Cite a FACTS.md entry by its bold title beside its line, since the gather's own insertions move lines.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).",
].filter(Boolean).join(' ')
const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + (RUN === 'first'
  ? "One file is shared, Library/FortressLibrary.fss, on two declarations far apart: G's two identity functions after the reductions (about :3124-3148 on the record's tree) and P's scalar block comment near the end (about :4596-4601); the gather applies G first, then P. The identity functions have no api declaration, so P's comment in the .fsi is P's alone. G touches no Specification/ file and P no source file. The shared directories are ProjectFortress/compiler_tests/ and library_tests/, where G adds and promotes its tests and P edits the messages of two compiler tests and of MaybeRungM, disjoint files; G's tests cite none of the chapters P edits, so P's re-anchoring reaches none of them. P's two new tests go to ProjectFortress/tests/, which moves the testSystem shards, compared by their sum. G changes no declared type and P two comments, so neither moves the checker count. The files they reach beyond their own are the three record files, FACTS.md, the ledger and the handover, folded centrally by the gather."
  : RUN === 'second'
  ? "One file is shared, Library/FortressLibrary.fss, on disjoint declarations far apart: V's Number and RR64 near the top of the tower (about :358-406) and E's CompactFullRange opr |self| (about :3912-3924 on the tree batch N landed, below its rung M's integer members and batch 6.5's rung G's identity functions); the gather applies V first, then E. The .fsi and ProjectFortress/LibraryBuiltin/ are V's alone; Library/RangeInternals.fss, the four glue files Int.java, Long.java, NN32.java and UnsignedLong.java, the checker and the evaluator are E's alone (RR32's natives are glue/prim/RR32.java, should V's fallback touch one). ProjectFortress/tests/ gets both rungs' files, disjoint: E renames XXXNatBigSizeWalk.fss and the three range tests of rows 450 and 451 and adds two, and a third if the tuple shifts of row 503 fail under walk, V renames XXXRR32MixedRungF.fss and adds one; compiler_tests/ is E's, its refusal test, NatRtBigSize and the owed pairs of rows 447 and 505. E touches no Specification/ file; V's numbers.tex passage and Appendix I entries sit on the tree P and batch N's rung T landed, V's entries after T's \"The inference of a call's static arguments\". E's test messages cite the integer chapter as P and T left it, and the gather checks P's landed integer text against E's natives: for CHOOSE and the power P's text rests on the specification's general sentence (Specification/basic/operators/opr-overview.tex:154-155). Both rungs compare the interpreter corpus in three passes, each on its own branch; they share the box, not a file. Batch N's first run is landed under both and edited none of their declarations: E's opr |self| calls rung M's own ZZ32 MAX, V restates RR32's own MIN, MAX and MINMAX, the family of M's device, walk's and the checker's inference with coercion (rungs K and I) read V's new coercion, and E keeps rung K's XXXNatValueNN32RungK (row 486) as it is; the record's section 4 lists them declaration by declaration. The checker count reads V's changed declared types, so V's table is the only one that may move. The files they reach beyond their own are the three record files, FACTS.md, the ledger and the handover, folded centrally by the gather."
  : "Each pair of the two runs shares Library/FortressLibrary.fss on declarations far apart (G and P, E and V). P and V share Specification/basic-lib/numbers.tex on disjoint passages (V's at about :27-49, P's rational listing at about :92-93 and :144-145 on the record's tree; V applied first there) and Specification/appendices/changes.tex at one place, since each adds its subsections after the appendix's last revision entry: the gather applies P's entries before V's, resolving the same-point hunk by hand as its rule allows for unrelated regions, and says so. Library/FortressLibrary.fss is edited by V (Number and RR64 near the top), G (the identity functions after the reductions), E (CompactFullRange's opr |self|) and P (the scalar block's two comments near the end), disjoint; V applied first, then G, then E, then P. P's edits may move a specification line one of E's new test messages cites, which the gather re-anchors by passage, and the gather checks P's integer text against E's natives. The shared directories are ProjectFortress/tests/, compiler_tests/ and library_tests/, where the rungs touch disjoint files. V's table is the only checker table that may move. The files they reach beyond their own are the three record files, folded centrally by the gather.")
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
// The briefing: the first step of every role that works on a rung. The agents
// were not trained on Fortress, the language was never finished, and what they
// write from other languages' habits contradicts the specification and the
// library unless they have absorbed what the project has gathered (Pavol,
// 2026-09-27). And what the agents of the later climbs missed was on record: a
// ledger row, a POSITIONS entry, an earlier judge's ruling, the library's own
// precedent (explorations/reviews/worker-global-decisions.md). So the planner
// writes each rung's briefing, a list of facts-extract.sh keys in its manifest
// entry, carrying besides the record the specification's sections, the notes
// and the precedent code the rung's subject touches: the rung worker reads it whole as its step 1, and the
// skeptic, the repair round and the judges read its checks sub-list, the
// decisions and ledger rows their checks need and the specification's sections
// and precedent code they compare against. Nothing is printed to every
// agent alike: a blanket read first cost more than the gathering it could
// remove, and on skeptics and repairs it was a cost in every case
// (worker-context-cost.md). The tool prints in parts of at most 28 KB, under
// what one shell command shows an agent, and says the size.
// climb-batch-workflow.md, "Shared prefix".
// ---------------------------------------------------------------------------

const LOOKUP_TOOL = 'explorations/coordinator/tools/facts-extract.sh'
const keyOk = (q) => typeof q === 'string' && q.trim() !== '' && !q.startsWith('-') && !/["\x60$\\\n]/.test(q)
RUNGS.forEach(r => {
  for (const field of ['briefing', 'checks']) {
    if (r[field] === undefined) continue
    const bad = Array.isArray(r[field]) ? r[field].filter(q => !keyOk(q)) : [String(r[field])]
    if (bad.length) throw new Error('rung ' + r.id + ': ' + field + ' is a list of strings, none empty or opening with -, and none holding a double quote, a backtick, a dollar sign, a backslash or a newline, since each is rendered in double quotes: ' + bad.join(' | '))
  }
  const stray = (Array.isArray(r.checks) ? r.checks : []).filter(q => !(Array.isArray(r.briefing) && r.briefing.includes(q)))
  if (stray.length) throw new Error('rung ' + r.id + ': checks is a sub-list of briefing, and these keys are not in the briefing: ' + stray.join(' | '))
})
const keysOf = (r, field) => Array.isArray(r[field]) ? r[field] : []
// The command as the prompt shows it, one key a line, indented as code.
const lookupCommand = (keys) => ['        ' + LOOKUP_TOOL + ' \\'].concat(keys.map((q, i) => '            "' + q + '"' + (i < keys.length - 1 ? ' \\' : '')))
const SEARCH_FIRST = 'explorations/coordinator/INDEX.md, FACTS.md and POSITIONS.md beside it, the gap ledger (explorations/fortress-gap-ledger.md) and the maps under explorations/coordinator/map/'
const MORE_PARTS = 'Output that ends by naming a next part is continued by the same command with --part 2, then 3, until it says it printed the last.'

// Step 1 of the rung worker, and of a worker resumed after a stop: the rung's
// whole briefing.
function briefingStep(rung, where) {
  const keys = keysOf(rung, 'briefing')
  if (!keys.length) return ['1. This rung has no briefing. Before anything else, search ' + SEARCH_FIRST + ' for its topics, before the tree.']
  return [
'1. You are working in Fortress, a language you were not trained on, whose design was never finished. It is not Java or Scala, and habits from them often mislead here. Before anything else, run this command in ' + where + ' and read all it prints. It is your mission briefing, gathered for this rung by the batch\'s planner: the decisions on record and earlier rulings, the facts established so far, the map of the tree, the gap-ledger rows, the specification, the notes and probes already on file, and the library code that already solves the same kind of problem. Learn from it how Fortress does things, then do the rung: design in the library\'s own way, with the ledger and the decisions on record in mind. Where the rung takes you past what the briefing covers, look in the same places before you choose. ' + MORE_PARTS,
'',
...lookupCommand(keys),
'',
'   For a topic the briefing does not cover, search ' + SEARCH_FIRST + ' before the tree.',
  ]
}

// Step 1 of a skeptic, a repair round and a judge, on one rung (rungs = [rung],
// in its worktree) or on the merged tree (rungs = RUNGS, in the main tree): the
// checks slice of each rung's briefing. lead opens the step: step 1 of a
// numbered order by default, the words given in a role that has none.
function sliceStep(rungs, where, lead) {
  const sliced = rungs.filter(r => keysOf(r, 'checks').length)
  const one = rungs.length === 1
  const open = lead || '1. Before anything else,'
  if (!sliced.length) return [open + ' search ' + SEARCH_FIRST + ' for the decisions and ledger rows ' + (one ? 'this rung rests on' : 'the rungs rest on') + ', before the tree: ' + (one ? 'this rung\'s briefing has no checks list.' : 'no rung of this run has a checks list in its briefing.')]
  return [
open + ' run ' + (sliced.length > 1 ? 'these commands' : 'this command') + ' in ' + where + ' and read all ' + (sliced.length > 1 ? 'they print' : 'it prints') + '. ' + (one
  ? 'It is the part of this rung\'s briefing that the checks on it need: the decisions of Pavol\'s and the ledger rows the rung rests on, the rulings and facts they turn on, and the specification\'s sections and the precedent code the checks compare against, each whole. The rung\'s first pass read the whole briefing.'
  : 'Each is the part of a rung\'s briefing that the checks on it need, for ' + sliced.map(r => r.id).join(', ') + ' in that order: the decisions of Pavol\'s and the ledger rows each rung rests on, the rulings and facts they turn on, and the specification\'s sections and the precedent code the checks compare against, each whole.') + ' ' + MORE_PARTS,
'',
...[].concat.apply([], sliced.map((r, i) => (i ? [''] : []).concat(one ? [] : ['        # ' + r.id]).concat(lookupCommand(keysOf(r, 'checks'))))),
'',
'   For an entry ' + (one ? 'the slice lacks' : 'the slices lack') + ', search ' + SEARCH_FIRST + ' before the tree.',
  ]
}

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
'## Your briefing - read it before you search the tree',
'',
'You were not trained on Fortress, and the language was never finished: what you would write from other languages\' habits often contradicts its specification and its library. And the agents of the early climbs went wrong on decisions made locally, where what they missed was on record: a decision of Pavol\'s in explorations/coordinator/POSITIONS.md, a row of the gap ledger (explorations/fortress-gap-ledger.md), an earlier judge\'s ruling, the library\'s own way for the same family. So the batch\'s planner gathered a briefing for each rung: the POSITIONS.md entries, the ledger rows and the earlier rulings the rung rests on, the specification\'s sections its subject touches, the notes already written on it, the library code that is the precedent for the same kind of problem, and the explorations/coordinator/FACTS.md entries (what the project has established, grouped by area, each cited by its bold title) and the map rows and sections of its area, each printed whole by ' + LOOKUP_TOOL + '. Step 1 of every role that works on a rung runs it: the rung worker reads the whole briefing, and the skeptic, the repair round and the judges read the part of it that their checks need. For a topic it does not cover, search explorations/coordinator/INDEX.md (one line per standalone note), FACTS.md, POSITIONS.md, the ledger and the relevant map below before the tree. Cite a FACTS entry by its bold title.',
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
'4. The interpreter is evidence, not an oracle. The static type checker runs only on the compile path and walk turns it off, so the interpreter accepts programs the language does not and reports what would be type errors as run-time dispatch failures; 55 ledger rows record its own defects. When walk and the compiled run disagree, that is a question and the specification answers it. Three real outcomes: the specification settles it against the compiled run, so repair; it settles it against the interpreter, so the compiled side may be right and a ledger row is owed against the interpreter; or the specification is silent. A silent specification is NOT a reason to stop - it is the reason to think harder: review the architecture around the construct, derive the candidate behaviours with what each costs and what else it touches, decide holistically which is right for the language, execute that one, and record the decision in your report: the candidates, what each costs, and why the one you executed is right. (The stops that apply to every rung of this batch, on top of the standing ones, are the stops the batch record\'s intro reserves for Pavol, at the head of this prefix.)',
'',
'A fourth case exists and is legitimate: the specification settles the divergence but the repair lies outside this rung\'s scope. Then the rung lands and opens a verified ledger row naming the defect, the specification clause, the probes both ways, the location of the fix and what the fix is. That is what rungs 6 and 7 did with row 317 and it was right.',
'',
'## What a measured defect is worth: the three homes',
'',
'This batch closes the gap the last three campaigns left - 22 defects measured by skeptics, 2 of them gated. Every defect anyone in this rung measures has exactly one of three homes, and the record says which and why:',
'',
'1. **Measured by anyone and repaired in this rung** - by the worker in its own first pass, by the skeptic, or in a repair round: it gets an ASSERTION in the rung\'s own gated test, and that assertion exists and passes BEFORE the second skeptic runs. Not a FACTS line, not a probe: an assertion. The cheapest form is an extra assert in the .fss file the rung already added; a new file is only needed when the defect is in another area. The assert message string carries the citation - the ledger row number or the specification line - and nothing else does: no provenance comment in the source (see "What you write" below).',
'',
'2. **Deferred, and the specification settles it** - the rung does not repair it, but the specification says what the answer is: it gets a gated EXPECTED-FAILURE test, whose file name starts with XXX. The harness makes this a real check, not a wish. FileTests.java:932 sets shouldFail = s.startsWith("XXX") from the file name; :587 and :654 make (shouldFail != failed) the failure condition, so an XXX test that STARTS PASSING turns the suite red, and :851 says the suite prints "XXX tests that succeed". So write XXX<Name>.fss asserting what the SPECIFICATION says, with a .test file beside it; it fails today, which is expected, and the day anyone repairs the defect without closing the ledger row the gate says so. 224 XXX*.test files in compiler_tests/ already use this. One caveat, from the harness\'s own author at FileTests.java:853 -"WARNING: expect_failure is not treated consistently" - so the first XXX file a rung adds is shown to go red on a deliberate local fix, and the report says it was shown. The test is owed in the batch that measures the defect, even when a later rung or batch is planned to repair it: "its test can wait for the rung that fixes it" was ruled against at the gather or review of batches 6b, 7R and 7C (explorations/reviews/batch-7C-review.md, the repeat).',
'',
'3. **Deferred, and the specification is silent** - a probe file with its captured output, named .txt, committed under probes/, and a ledger row that cites it. This is the only home that is not a gated test, and the record says explicitly that it is here because the specification is silent, not because it was easier.',
'',
'## Register',
'',
'Plain sentences, no self-congratulation - we are humble custodians here and deserve no credit. No unactionable comments in the source tree: provenance and rationale belong in your report, not in code. A test file carries at most ONE comment line, pointing at its REPORT.md - not a provenance essay (protocol.md, principle 1; compiler_tests/AtomicTopLevelVar.fss:13-42 is the 30-line comment that rule exists to prevent). Verify against primary sources before asserting, and cite file:line. If you make a decision, say in your report that it was a decision and what the alternatives were: a decision buried in a report is a decision not made. No estimates in days or weeks.',
'',
'## What you write, and what you must not touch',
'',
'Everything you produce goes under explorations/compile-ladder/SLUG/ in your own worktree, where SLUG is in your tail:',
'',
'- REPORT.md - what you found, what changed and why, every citation as file:line, the recorded failure and the recorded pass, the precedent search, what the specification settles and the passages that settle it, every differential you ran.',
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
'## If your context is compacted',
'',
'Your brief is the first message of your own transcript, the newest agent-*.jsonl under ~/.claude/projects/*/*/subagents/workflows/ whose first line holds this prefix\'s title and your role\'s heading ("# Your role: ..."). After a compaction, re-read from it what your next step needs, and the files you have written, and go on. The boot that CLAUDE.md asks for after a compaction (explorations/coordinator/README.md, the protocol, FACTS.md and POSITIONS.md read whole) is the coordinator\'s and not yours, and so is the coordinator\'s own session transcript: read neither. Batch N\'s gather spent about 70K tokens re-orienting after its compaction, 45K of them on those two (explorations/reviews/batch-N-review.md, question 1).',
'',
].join('\n')

// ---------------------------------------------------------------------------
// The rung worker's role block. The tails are in the manifest.
// ---------------------------------------------------------------------------

// The paths neither the checker count nor the distance stage reads. Both run the
// compiler's phase order over the library, Shell.compilerPhases with
// PhaseOrder.compilerPhaseOrder (tools/checker-count/WorldFlip.java,
// tools/distance/DistanceMulti.java; PhaseOrder.java:137-147, ENVGEN off), which
// reads no test, text or record and runs no code of walk's evaluator or natives:
// outside interpreter/ those are named only by walk's commands in Shell.java and by
// ENVGEN's compiler/environments/. A rung whose edit touches nothing else does not
// run either stage (Pavol, POSITIONS.md 2026-09-29, the weighing of cost against what
// a rule protects; batch N's rung K ran the count twice on an interpreter-only edit
// and read the landed total twice, explorations/reviews/batch-N-review.md, question 4).
const STAGE_BLIND = ['explorations/', 'Specification/', 'Documentation/', 'ProjectFortress/tests/', 'ProjectFortress/*_tests/',
  'ProjectFortress/src/com/sun/fortress/interpreter/evaluator/', 'ProjectFortress/src/com/sun/fortress/interpreter/glue/']
const STAGE_BLIND_TEXT = STAGE_BLIND.slice(0, -1).join(', ') + ' or ' + STAGE_BLIND[STAGE_BLIND.length - 1]

function stageBlindStep() {
  return 'A checker-count or distance table that your tail or the batch intro asks you to capture after your edit is not captured when your edit cannot move it: when every path your edit adds or changes (git diff --name-only ' + BASE + ' in your worktree, and git status --short for new files) is under ' + STAGE_BLIND_TEXT + '. Both stages run the compiler\'s phase order over the library, which reads no test, text or record and runs no code of walk\'s evaluator or natives (explorations/coordinator/tools/checker-count/WorldFlip.java and tools/distance/DistanceMulti.java call Shell.compilerPhases). Then write in REPORT.md and record.md that the count and the distance are unchanged and not run because the edit touches no path they read, with the paths, and run neither: the gate measures both on the merged tree (Pavol, POSITIONS.md 2026-09-29, on weighing what a rule costs against what it protects). Any other path, a library, checker, parser, runtime or build file among them, and the stage runs as asked.'
}

function rungRole(rung, repairRound) {
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
...(repairRound ? sliceStep([rung], 'your worktree (' + rung.path + ')') : briefingStep(rung, 'your worktree (' + rung.path + ')')),
...(rung.testIsStage ? [
'2. Your rung declares testIsStage in the manifest, so its failing-then-passing test is the gate\'s checker-count stage (gate step 8) and NOT a .fss program: no program can yet be compiled against the interpreter\'s prelude, and this is the one place the test-first rule is met by a permanent stage instead of a test file (explorations/coordinator/library-route-judgement.md section 2 step 1; Pavol\'s decision of 2026-09-21, POSITIONS.md, "the library route"). So FIRST, before any edit, read the header of explorations/coordinator/tools/checker-count/run.sh and run it in your worktree (ant compileAll must have run there first):',
'',
'        explorations/coordinator/tools/checker-count/run.sh explorations/compile-ladder/SLUG/probes/checker-count-preedit.txt $TMPDIR/cc-pre',
'',
'   It runs the compiler\'s static checker over Library/FortressLibrary.fss with the interpreter\'s prelude in scope, under its own private cache, and prints one row per api with that api\'s error count, then #total, #locations and #crash; 20 s measured in the main tree, and it writes nothing but the table. That table IS your recorded failure: it goes under probes/ as a committed .txt and its #total is the number your record.md says the batch starts from.',
'3. After the edit, run the same stage again and capture it as checker-count-postedit.txt beside the first; put the diff of the two tables in REPORT.md, and say what moved and why, api by api. If the total changes, the manifest must declare the number it reaches as expectedCheckerCount and the crash line as expectedCheckerCrash when that moves - say in REPORT.md and in record.md which values the manifest needs, because the gate prints the declared total beside the one it measures, your skeptic compares your post-edit table with your report, and a crash line no rung declared is red. A rung of this kind writes no .test file; everything else in this list is unchanged, including the ladder subset of step 8 of this list and the three homes of its step 9. Where your tail asks for the distance stage\'s table as well (gate step 9: the whole library, every checker stage run, the setting any, the overloading memo off), run explorations/coordinator/tools/distance/run.sh explorations/compile-ladder/SLUG/probes/distance-preedit.txt $TMPDIR/dist-pre before the edit, and after it the same with distance-postedit.txt and $TMPDIR/dist-post, each through run_bg, since one run takes 13 to 24 minutes, and compare the two with explorations/coordinator/tools/distance/compare.sh; errors.tsv in each scratch directory lists every error with its site.',
] : [
'2. Write the failing test FIRST, into ProjectFortress/compiler_tests/ (checker and codegen rungs) or ProjectFortress/library_tests/ (library rungs): a .fss component that prints PASS, plus a .test file in the format of ProjectFortress/library_tests/Boolean.test (a tests= line naming the components, then link, run, and the check line). The check line is exactly',
'',
'        run_out_contains=PASS',
'',
'   run_out_WIcontains, which Boolean.test and PLAN.md write, is implemented in the harness as of 2026-09-19 (FileTests.java:147-155, whitespace-insensitive containment beside _contains) but this batch writes _contains: one key, one meaning, and the seventeen older files are not this batch\'s business. A native-helper rung whose declarations are library declarations is a library rung: rung 7 put its test in library_tests/ (IntLiteralArithRung7).',
'3. Run it and capture the failure output to a file BEFORE the edit exists, named .txt. A report with no recorded failure is refused by your skeptic. The process this rules out is the one-off validation script: proving once by hand that something works and going ahead without leaving a permanent check in the corpus.',
]),
'4. Make the edit, as small as the test needs.',
'5. Rebuild: ant compileAll if you touched .java or .scala, then the library-order bytecode-cache rebuild. A rung that edits only CompilerLibrary rebuilds CompilerLibrary, CompilerAlgebra and CompilerSystem (25-30 s); one that edits CompilerBuiltin rebuilds from CompilerBuiltin down (about 125 s); the full five only after ant compileAll.',
'6. Run the test again and capture the pass.',
'7. Grep BOTH corpora - ProjectFortress/tests/ and every *_tests/ directory - for a competing declaration of every name you add. Rung 1 lost a full cycle to library_tests/MaybeTest9.fss declaring its own trait Equality, which only a full run revealed; this grep costs seconds and covers it. And grep src/com/sun/fortress/ whole, not compiler/ and runtimeSystem/ alone, for every name you add: rung M found Maybe, Just and Nothing named from syntax_abstractions/, outside the scope the climb had been grepping.',
'8. Run the ladder subset for the files your names were blocking, before and after. Use the restricted driver explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh with its subset.txt (corpus<TAB>file per line): copy both into explorations/compile-ladder/SLUG/, set LADDER_ROOT to a directory inside your worktree, and list the files the batch record names for your rung plus any file whose recorded first error in explorations/compile-ladder/baseline-2026-09-19/raw/ names one of your names. Never run the full-corpus driver with its default root: that root is shared and its cache pruning corrupts a parallel run.',
'9. Every defect you measure gets one of the three homes the shared prefix names, and your report says which and why for each. The assertions of home 1 are in place and passing before you report; the XXX file of home 2 is in place and failing as expected, and if it is this rung\'s first one you also show it going red on a deliberate local fix and then undo the fix.',
'10. The provenance block. Under the title of REPORT.md, FIVE lines, each ending in a file:line or the literal none. problem: the measurement that made this a rung (a program line or a ladder file). spec: the governing prose passage under Specification/basic or basic-lib, found from the feature\'s row in explorations/coordinator/map/spec-to-implementation.md; a citation under Specification/library/apis/ is labelled (api listing) and is not sufficient on its own; none when the prose is silent, with the grep that shows it. precedent: the interpreter\'s declaration, the team\'s dormant draft, or the in-file shape you copied. deviation: one line per way your edit differs from the precedent and from the specification\'s spelling. historical: every file of the original 2012 tree this rung edits - anything outside explorations/ and outside the test corpora this campaign created - or none. the protocol\'s hard rule on the gate requires those edits to be flagged at commit time, and the gather copies this line into the commit message. Your skeptic opens every line the block cites and refuses the rung if one is missing or does not say what the block says.',
'11. Ledger rows. Rungs 6 and 7 opened row 317 when the specification settled a divergence the rung could not repair; do the same if you meet one. Number a new row provisionally from ' + LEDGER_FROM + ' in record.md and say that it is provisional: another rung may open one too, and the gather assigns the final numbers in manifest order (' + RUNGS.map(r => r.id).join(', ') + ').',
'12. The tracked-path check of the shared prefix, last, after your final commit.',
'',
...(rung.testIsStage ? [] : [stageBlindStep(), '']),
'Report at the end in the structured form the tool requires, and write the full detail into REPORT.md.',
'',
'Two fields of that form the script reads itself. reportText and recordText carry the full text of REPORT.md and record.md, word for word as you wrote them to the files: in batch 5 the harness refused every rung worker\'s write of REPORT.md, and a file your branch does not carry is written by the gather from these fields verbatim, so they are the report whenever the file is not. If the harness refuses a write, say so in notDone and go on. stopsMet lists every stop the batch record\'s intro reserves for Pavol that this rung met, including one met on part of the work while the rest lands (a passage reported without choosing, an output the comparison does not account for), each with its evidence as file:line; a stop the intro names as lifted, or that another decision of his lifts, carries in liftedBy the POSITIONS.md line of that decision. Only Pavol lifts a stop: an entry without such a line holds the batch\'s push until he does, and an empty list says the rung met none. forPavol lists every point for Pavol that this rung does not settle, one entry each, with its evidence as file:line: a decision taken here on a question that was his, a fork with its candidates and costs, a defect or divergence that lands unrepaired and needs his word, anything REPORT.md or record.md says goes to him. The reports the tail\'s "What comes back to Pavol" names are not such points; they reach him with the landing. The gather puts each point into PLAN.md.',
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
...sliceStep([rung], 'the rung\'s worktree (' + rung.path + ')'),
'2. The provenance block under REPORT.md\'s title: FIVE lines now - problem, spec, precedent, deviation, historical. Open every file:line it cites with sed -n and check that the line says what the block says. A missing line, a line that does not say it, a spec: line that cites only Specification/library/apis/, or a historical: line that omits a file of the 2012 tree the diff edits, is a refusal.',
(rung.testIsStage
  ? '3. The recorded failure, which for THIS rung is a table and not a program. Its manifest entry sets testIsStage: no program can yet be compiled against the interpreter\'s prelude, so the failing-then-passing test is the gate\'s checker-count stage (gate step 8, explorations/coordinator/tools/checker-count/run.sh), and the worker was required to capture that stage\'s table BEFORE the edit existed and again after it. Find both captures under explorations/compile-ladder/' + rung.slug + '/probes/, check that the pre-edit one is what the tree printed before the edit, and RUN THE STAGE YOURSELF in the worktree to see the post-edit table come out again: that run is your check that the test passes, in place of running a .fss test. A rung of this kind with no pre-edit table, or whose post-edit table you cannot reproduce, is refused exactly as a missing .fss failure would be. Check also that the report names the total the manifest must declare as expectedCheckerCount, and the crash line as expectedCheckerCrash if that moved: the gate prints the declared total beside the one it measures, and a crash line no rung declared makes the batch\'s gate red. Check 10 compares that total with the table. Where the rung\'s tail asks for the distance stage\'s tables too, re-run explorations/coordinator/tools/distance/run.sh in the worktree through run_bg (13 to 24 minutes) and compare your table with the worker\'s post-edit one with explorations/coordinator/tools/distance/compare.sh: they agree within the checker\'s run-to-run variation of 2 to 4 errors. Everything else in this list is unchanged.'
  : '3. The recorded failure. The worker was required to run the new test and capture its failure BEFORE the edit existed. Find that captured output. A rung whose report has no recorded failure is refused - this is not negotiable and it is the point of the whole discipline.'),
'4. The diff, read line by line against the specification passages cited and against the provenance block. Does the edit do what the report says, and only that? Is it as small as the test needs?',
'5. The precedent search. Did the worker find what the team already did here, and did it follow the right precedent? Where a precedent repaired a defect, did the worker count the other sites in that file and give the number? If the worker followed none, look for one yourself in the interpreter\'s library, the compiler prelude and the team\'s tests: a device the rung invented where the library already has one is a finding, with the library\'s file:line.',
'6. The test. Does it actually exercise the defect? The rung\'s tail names the cases that matter for this rung. Check also that the test file carries at most one comment line and no provenance essay.'
  + (rung.testIsStage ? ' This rung writes no test file: what you check instead is that the two tables differ in the way the report says, and that the difference is the defect and not a cache or a build artefact.' : ''),
'7. The competing-declaration grep across both corpora AND across src/com/sun/fortress/ whole.',
'8. The record.md fragment. Are the FACTS lines true as written and sourced? Does the ledger note cite an existing row without renumbering anything? Would a reader six months from now be able to check it?',
'9. The three homes. For every defect the report names as measured: home 1 (repaired in this rung) must be a passing assertion in the rung\'s gated test, and you run the test yourself to see it pass; home 2 (deferred, specification settles it) must be an XXX-named file that the harness treats as expected-to-fail, and you check the name and the .test file; home 3 (deferred, specification silent) must be a committed .txt capture and a ledger row, and the report must say the specification is silent and show the grep. A defect in your OWN findings that the worker then repairs is home 1 too, and its assertion is in place before you approve.',
(rung.testIsStage
  ? '10. The rung\'s own count table against its report: a file read, nothing to run. Its brief names the table: explorations/compile-ladder/' + rung.slug + '/probes/checker-count-postedit.txt, committed on ' + rung.branch + '.'
  : '10. The rung\'s own count table against its report: a file read, nothing to run. The general part of its brief names no table, because the rung does not set testIsStage; its tail may name one, and the report says which table, if any, it committed.')
  + ' Take the table\'s #total row and compare it with the total the report declares in REPORT.md, record.md and the structured report'
  + (rung.expectedCheckerCount !== undefined ? '; write the manifest\'s expectedCheckerCount, ' + rung.expectedCheckerCount + ', beside the two in SKEPTIC.md, as the prediction it is, not a value the table must meet' : '')
  + '. A mismatch between the table and the report is a finding for repair, not a stop: put it in requiredCorrections with both numbers, so that the report is corrected, and do not refuse the rung over it alone. If no table path is named and the rung declares a count, in its report or as expectedCheckerCount, report "no count table" in findings. A rung that declares no count and names no table has nothing to compare; one line saying so is enough.'
  + (rung.testIsStage ? '' : ' Nor does a rung that says its count and distance are unchanged and not run because its edit touches no path the two stages read: check its paths against git diff --name-only ' + BASE + '...HEAD, which must list none outside ' + STAGE_BLIND_TEXT + ' (the rule of the worker\'s order of work); a path outside them without a table is the finding "no count table".'),
'11. The ledger and the sibling sites. Search explorations/fortress-gap-ledger.md with terms of your own for rows that bear on the rung, and the tree for every other site of the defect the rung repairs: in the files it edits, in the sibling types and widths, and on the other path. A missed row that changes what the rung should do is a finding; a sibling site the rung leaves gets one of the three homes or a recommendedRows entry.',
'12. The decisions on record. For each entry of explorations/coordinator/POSITIONS.md that the briefing printed or the rung\'s section of ' + BATCH_RECORD + ' cites, check that the landed text says what the decision says, in its scope and its words. A rule stated narrower or broader than the decision, or a case the decision names that the landed text leaves out, is a finding for repair; a landed text that contradicts a decision is a ground to refuse.',
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
'Every point you find that is Pavol\'s and that the rung does not settle - a decision the rung took on a question that was his, a fork, a defect or divergence that lands unrepaired and needs his word - goes in forPavol, one entry each with its evidence as file:line. The gather puts each into PLAN.md.',
'',
'Write your findings to explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md in that worktree, and your probes under explorations/compile-ladder/' + rung.slug + '/probes/skeptic/, every capture named .txt. Run the tracked-path check of the shared prefix over SKEPTIC.md before you report. ' + (round > 1
  ? 'Carry the text of this second judgement, word for word, in skepticText, and not the first judgement\'s, which the script already holds from the first round: a file the branch does not carry is written by the gather from the two fields verbatim, this judgement first, so if the harness refuses your write, say so in findings and go on.'
  : 'Carry SKEPTIC.md\'s full text, word for word, in skepticText: a file the branch does not carry is written by the gather from that field verbatim, so if the harness refuses your write, say so in findings and go on.') + ' In stopsMet, name every stop the batch record\'s intro reserves for Pavol that the rung as it stands meets, whether or not the worker named it, with its evidence as file:line; a stop the intro names as lifted, or that another decision of his lifts, carries in liftedBy the POSITIONS.md line of that decision. Your approval does not lift a stop: an entry without such a line holds the batch\'s push until he lifts it. Do not edit the worker\'s source changes yourself and do not run ant testFast or ant testSystem. Commit SKEPTIC.md and your probes on the rung\'s branch, ' + rung.branch + ', with the footer the shared prefix gives, and push it; touch nothing else in the commit. The worker\'s own commits are on that branch, so git log ' + BASE + '..HEAD shows its milestones and git diff ' + BASE + '...HEAD its net change.',
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
'First, before anything below: take step 1 of the order of work above, in ' + rung.path + (verdict ? '. In a repair round it is the part of the briefing that the checks on the rung read, not the whole briefing, which the first pass read.' : ', the rung\'s whole briefing.'),
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
'Read the judge\'s full ruling in explorations/compile-ladder/' + rung.slug + '/JUDGE.md' + (verdict ? ' and the skeptic\'s findings in SKEPTIC.md beside it' : '') + '. Carry out the judge\'s instructions in order. Where an instruction turns out wrong against a primary source, do what the source says, and say so in REPORT.md with the file:line that settles it - the judge read the two reports and the diff, not the whole tree.',
'',
'Every defect this round repairs - including one the skeptic measured and you now fix - gets its assertion in the rung\'s gated test, in place and passing, BEFORE you report: the second skeptic will look for it and its absence is a refusal ground. A defect this round does not repair gets home 2 or home 3 of the shared prefix, and the report says which. Re-run the test and re-capture the output, update REPORT.md and record.md (including the historical: line of the provenance block if the repair touched a file of the 2012 tree) and, with them, reportText, recordText, stopsMet and forPavol in your structured result, forPavol carrying every point for Pavol the rung still has, the earlier pass\'s included, re-run the tracked-path check, commit and push on your branch, and do not run the full gate.',
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
    review: 'The merged-diff review found something blocking in the source hunks after the gather. Diagnose it holistically on the merged tree and decide the repair; do not bisect rungs. The gate is still running beside you in this tree: do not read ' + GATE_OUT + '/ or wait for it; rule on the review and the merged diff alone. ' + LAND_RULE,
    gate: 'The gate is red on the merged tree. Read the failing evidence and decide the repair. The gate has five ways to be red and they point at different places: a failing or erroring JUnit suite (its output is under ProjectFortress/TEST-RESULTS/); a suite whose test COUNT fell against the last landed summary, which usually means a .test file or a tests= line went missing rather than a test failing; a FAIL or a repeated timeout in the four-thread runs of the compiled atomic programs, which is a lost update and is about the transaction runtime rather than about the suites; a ladder regression, where a file that compiled and ran before now reaches a lower phase or prints different output - the stage hands you the diff; and, from the checker count over the interpreter\'s library, a crash line no rung declared or a stale checker shadow (the total itself is reported and never red), which is about the distance to the one library Pavol decided on (POSITIONS.md, 2026-09-21, "the library route"; library-route-judgement.md section 2 step 1) and whose evidence is the two tables the stage diffs, ' + GATE_OUT + '/checker-count.txt against the last landed one. The distance stage (' + GATE_OUT + '/distance.txt, the whole library with every checker stage run) is reported and never red, so it is never why the gate is red, though its table may help you place a checker change. Pavol\'s standing rule: identify the source of the conflict holistically and rework that part in the merged batch; dropping a rung is the retreat, taken only when its approach is wrong rather than its code, and then it is recorded and returned to the ranking.',
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
  ? sliceStep([rung], 'the rung\'s worktree (' + rung.path + ')').join('\n') + '\n2. The net change: git -C ' + rung.path + ' diff ' + BASE + '...HEAD, and the milestones: git log ' + BASE + '..HEAD.\n3. explorations/compile-ladder/' + rung.slug + '/REPORT.md and record.md in that worktree' + (verdict ? ', and SKEPTIC.md beside them' : '') + '.\n4. Every specification passage the two cite, by file:line with sed -n, in Specification/ under that worktree - the prose chapters, not library/apis/. Read at least ten lines either side of each.\n5. The precedents both name, at the cited lines.\n6. explorations/coordinator/map/spec-to-implementation.md only if the question is where a fix belongs.'
  : sliceStep(RUNGS, 'the main tree (' + MAIN + ')').join('\n') + '\n2. The composed commits: git -C ' + MAIN + ' log ' + BASE + '..HEAD and git diff ' + BASE + '...HEAD.\n3. The stage\'s outputs named above, and for a red gate the failing tests\' own output under ProjectFortress/TEST-RESULTS/, the summary and comparison under ' + GATE_OUT + '/, and the full logs, which are NOT committed and are under ' + LOG_DIR + '/.\n4. Each rung\'s REPORT.md, SKEPTIC.md and record.md under explorations/compile-ladder/<slug>/.\n5. The specification passages the reports cite, by file:line.',
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
    forPavol: { type: 'array', items: { type: 'string' }, description: 'what must reach Pavol out of the loop, one entry per point: a fork with its candidates and costs, a divergence that lands unrepaired, a decision taken under a silent specification; the gather, or the repair on the merged tree, puts each into PLAN.md; empty if nothing' },
    summary: { type: 'string', description: 'at most 10 lines' },
  },
  required: ['kind', 'decision', 'instructions', 'ruling', 'summary'],
}

// The merged-diff review's judge has a fourth decision, land (Pavol, POSITIONS.md
// 2026-09-29, the entry on rerunning the gate: "The same weighing of cost against
// what a rule protects applies to the other rules of the batch workflow"). A ruling
// whose settlement is tests and records only no longer holds the batch for a repair
// and a second review: the batch lands on its gate, and the ruling's steps go to the
// next batch with the findings it upholds, listed for Pavol, as a second review's
// remaining findings have since his rule of the same day on a review that still
// blocks after its repair (12d5525d5). In batch N the repair of such a ruling and the
// second review after it cost about 0.7M tokens and, with the judge, 54 minutes after
// a green gate (explorations/reviews/batch-N-review.md, question 4, item 1).
const LAND_RULE = 'You have a fourth decision here, land (Pavol, POSITIONS.md 2026-09-29, the entry on rerunning the gate: the same weighing of cost against what a rule protects applies to every rule of the batch workflow). Decide land when every finding you uphold is settled by tests and records only: test files in ProjectFortress/tests/ or a ProjectFortress/*_tests/ directory, and files under explorations/, with no source, library, checker, interpreter or specification file changed. Then no repair and no second review run now: the batch lands on its gate, and your numbered instructions, written as for a repair worker, go to the next batch with the findings you uphold and are listed for Pavol, as a second review\'s remaining findings have gone since his rule of 2026-09-29 on a review that still blocks after its repair. The tests land one batch later, as rows 447 and 505\'s did by that rule. A finding whose settlement needs a source, library, checker, interpreter or specification change is a repair, as before, and so is a ruling that mixes the two.'
const REVIEW_JUDGE_SCHEMA = Object.assign({}, JUDGE_SCHEMA, {
  properties: Object.assign({}, JUDGE_SCHEMA.properties, {
    decision: { type: 'string', enum: ['repair', 'land', 'drop', 'stop'], description: 'repair: the next Opus worker executes the instructions on the merged tree; land: every finding upheld is settled by tests and records only, so the batch lands on its gate and the instructions go to the next batch, listed for Pavol; drop: a rung\'s approach is wrong; stop: a reserved fork, this reaches Pavol' },
    instructions: { type: 'array', items: { type: 'string' }, description: 'numbered steps, each with the file:line it rests on: for the repair worker on repair, for the next batch on land; empty otherwise' },
  }),
})

// ---------------------------------------------------------------------------
// For Pavol. Every item a rung's worker, skeptic or judge, a merged-diff review
// or a merged-tree judge marks for Pavol becomes an entry of PLAN.md, under
// "Pavol's answers, in the order they are needed" or "Off the path, parked".
// The gather routes the rungs' items in its commits and lists them, and each
// it could not route; the review routes its own and any the gather missed; the
// repair on the merged tree routes its judge's. Nothing waits on them: an item
// not in PLAN.md is logged and carried in the script's result for the
// coordinator (Pavol, 2026-09-27, on the proposal). The measure is item 4 of
// explorations/reviews/worker-global-decisions.md: a judge's "For Pavol"
// section or a rung's list for him stopped in the rung's files, and no stage
// moved it into PLAN's queue (a size's range, rung F's = on Number, rows 417,
// 419 and 420).
// ---------------------------------------------------------------------------

const PLAN_SECTIONS = ['Pavol\'s answers, in the order they are needed', 'Off the path, parked']
const PLAN_RULE = 'Each item for Pavol becomes an entry of explorations/coordinator/PLAN.md: under "' + PLAN_SECTIONS[0] + '" when it asks for his decision or answer before work on the path can go on, in the group of the phase it must come before; under "' + PLAN_SECTIONS[1] + '" otherwise. The entry says in one or two plain sentences what he is asked or told, the default or recommendation on record if there is one, and where the evidence is, by file:line. An item PLAN.md already holds is not written again: name that entry. Several items on one point make one entry.'
const PAVOL_ROUTED = { type: 'array', description: 'one entry per item for Pavol this role put into PLAN.md or found there, by the id the role gives it; several ids may share one PLAN.md entry',
  items: { type: 'object', properties: {
    id: { type: 'string', description: 'the item\'s id, as the role gives it' },
    section: { type: 'string', description: 'the PLAN.md section the entry is in: ' + PLAN_SECTIONS.map(x => '"' + x + '"').join(' or ') },
    entry: { type: 'string', description: 'the entry\'s opening words, enough to find it' },
  }, required: ['id', 'section', 'entry'] } }
const strings = (x) => Array.isArray(x) ? x.filter(t => typeof t === 'string' && t.trim()) : (typeof x === 'string' && x.trim() ? [x] : [])
const numbered = (prefix, list) => strings(list).map((text, i) => ({ id: prefix + '.' + (i + 1), text }))
// A rung's items: its last worker's, each skeptic round's, and its judges'.
function pavolItemsOf(r) {
  const twoRounds = !!(r.firstVerdict && r.firstVerdict !== r.verdict)
  return [].concat(
    numbered(r.rung + '.worker', r.worker && r.worker.forPavol),
    twoRounds ? numbered(r.rung + '.skeptic', r.firstVerdict.forPavol) : [],
    numbered(r.rung + (twoRounds ? '.skeptic2' : '.skeptic'), r.verdict && r.verdict.forPavol),
    numbered(r.rung + '.judge-stop', r.stopJudge && r.stopJudge.forPavol),
    (r.judge && r.judge !== r.stopJudge) ? numbered(r.rung + '.judge', r.judge.forPavol) : [])
}
const inPlanSection = (x) => typeof x === 'string' && PLAN_SECTIONS.some(sec => x.toLowerCase().indexOf(sec.toLowerCase().replace(/^pavol's /, '')) >= 0)
// The ids a stage's result says it put into PLAN.md, under one of the two sections.
const routedIds = (results) => new Set([].concat.apply([], results.filter(Boolean).map(x => Array.isArray(x.pavolItems) ? x.pavolItems : []))
  .filter(e => e && typeof e.id === 'string' && inPlanSection(e.section)).map(e => e.id))

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
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this rung does not settle, one entry each with its evidence as file:line; the gather puts each into PLAN.md; empty if none' },
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
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this skeptic finds that the rung does not settle, one entry each with its evidence as file:line; the gather puts each into PLAN.md; empty if none' },
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
// verbatim where the branch lacks the file (the harness refuses a rung worker's write
// of REPORT.md: batch 5, and all four rungs of batch N). Since 2026-09-29 they are not
// pasted into the gather's brief: the script names, per file, the command that writes
// the field from the run's journal, which holds every agent's structured result, so
// that the text never passes through the gather's context (Pavol, POSITIONS.md
// 2026-09-29, the weighing of cost against what a rule protects; in batch N the texts
// were 195K tokens of the gather's brief, and it spent 88K more copying five of them
// back out, explorations/reviews/batch-N-review.md, question 2). The labels are the
// ones this script gives: the last result of rung:, resume: or repair: is the worker
// the script kept, and a second skeptic round's text comes first, the first round's
// after it under "## First round".
const TEXT_TOOL = 'explorations/coordinator/tools/journal-text.py'
function rungTextCommands(r) {
  const dir = 'explorations/compile-ladder/' + r.slug + '/'
  const cmd = (file, field, labels) => 'python3 ' + TEXT_TOOL + ' --out ' + dir + file + ' ' + field + ' ' + labels
  const workers = ['rung', 'resume', 'repair'].map(p => p + ':' + r.rung).join(' ')
  const twoRounds = !!(r.verdict && r.firstVerdict && r.firstVerdict !== r.verdict)
  const skeptic = twoRounds ? 'skeptic2:' + r.rung + ' --first-round skeptic:' + r.rung : ((r.verdict || r.firstVerdict) ? 'skeptic:' + r.rung : '')
  const out = { 'REPORT.md': cmd('REPORT.md', 'reportText', workers), 'record.md': cmd('record.md', 'recordText', workers) }
  if (skeptic) out['SKEPTIC.md'] = cmd('SKEPTIC.md', 'skepticText', skeptic)
  return { textCommands: out }
}

function gatherRole(approved, notLanded, items) {
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
'   Then the rung\'s three files. The texts its agents returned for them - reportText for REPORT.md and recordText for record.md from its last worker, skepticText for SKEPTIC.md from its last skeptic and, where there were two rounds, the first round\'s after a line "## First round" - are in the run\'s journal and not in this brief, and each rung below carries in textCommands the command that writes each file from there, byte for byte, without the text passing through your context (' + TEXT_TOOL + '; it finds the journal itself, the newest one whose last started agent is this gather, and says which on stderr). For each of the three files under explorations/compile-ladder/<slug>/ that the branch does not carry, run its command from ' + MAIN + ', and compose nothing: the rung\'s own words, not a summary of them. From there on the file is treated as one the rung wrote; read of it only what a later step needs. A file the branch carries stands as it is, and its command is not run. Name in the batch record every file written this way. A command that exits 1 wrote nothing (no journal found, or no text in the field): report that file as missing rather than composing it. In batch 5 the harness refused every rung worker\'s write of REPORT.md and the gather composed each from a 15-line summary; in batch N these texts, pasted into the gather\'s brief, were 195K tokens of it, re-read and copied back out (explorations/reviews/batch-N-review.md, question 2).',
'2. Fold its record: explorations/compile-ladder/<slug>/record.md (now in the tree) carries finished prose for three places. The FACTS.md line goes into explorations/coordinator/FACTS.md under the section of its area (the file is grouped by area, its README gives the rule: "Landed semantics" for a rule of the language or the library as it now stands, "The harness and the gate" for test mechanics, "The checker and the one library" for the checker), after that section\'s last entry, as one bullet with its source. The ledger note is APPENDED to the notes of the row it names in explorations/fortress-gap-ledger.md - rows are never renumbered, moved or deleted; where the note needs the landed commit\'s hash write the literal placeholder <short hash>, which the commit stage replaces. The handover state line goes into the first section of explorations/microgpt-run-c-handover.md ("Where the work stands"). If record.md opens a new row, the number is provisional (from ' + LEDGER_FROM + '): assign the final numbers in MANIFEST order (' + RUNGS.map(r => r.id).join(', ') + ') as you fold, append each row to the ledger\'s last table, and correct every citation of the provisional number in that rung\'s record.md, REPORT.md and probes in the same commit. Any file:line a record cites that a previously applied rung has shifted is re-anchored by SYMBOL - find the declaration or the assert by name in the current file and cite the line it is at now, rather than trusting the number the record was written with.',
'3. Close every requiredCorrections item of that rung\'s skeptic verdicts, listed below; each is a checklist item and the last climb left two of them unmade.',
'4. Open or refuse every recommendedRows item of that rung\'s skeptic, in one sentence each, recorded in the batch record. Opening it means a real ledger row with the probe it cites; refusing it means one sentence saying why the tree does not owe it. The last batch lost a codegen defect a skeptic had narrowed precisely, because nothing carried a recommendation that was not a required correction.',
'5. Its items for Pavol, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, REPORT.md, SKEPTIC.md or JUDGE.md, at the line it is now at.',
'   A text mismatch is not blocking. Where the batch intro has you check one rung\'s specification text against another rung\'s landed code, a mismatch the decisions on record settle you fix on the side they settle, as before; one they do not settle you do NOT report to the review as blocking, whatever the intro says. It is reversible, so it lands as a reserved stop met does, listed for Pavol (POSITIONS.md, 2026-09-27, the stops; 2026-09-29, the weighing of cost against what a rule protects), with the three records that keep it from being a discrepancy no one can see (POSITIONS.md, 2026-09-24, on updating the specification): the text stands as the rung wrote it; the path that departs from it gets a ledger row and a gated home-2 test (XXX) asserting the text\'s rule; and the text\'s entry in Specification/appendices/changes.tex names that row among its departures, so that the text claims no more than holds. All three go in the commit of the later of the two rungs, and the mismatch goes in your forPavol, with its ledger row and its test, and into PLAN.md by step 5\'s rule, with the ids gather.1, gather.2 in the order of forPavol. In batch N the rule "report any other to the review as blocking" made row 516 half of the first review\'s block, a judge ruling, a repair and a second review, and the judge reversed it in one line (explorations/reviews/batch-N-review.md, question 4, item 3).',
'6. One commit: the applied source, the tests, the rung\'s files under explorations/compile-ladder/<slug>/ (REPORT.md, record.md, SKEPTIC.md, JUDGE.md if any, and each probe and capture named one by one), the three record files, and PLAN.md when step 5 wrote to it. Stage those files by an explicit list, never by git add of the directory, and read git diff --cached --stat before you commit: 85 MB of a worker\'s experimental caches reached main that way on 2026-09-19 and the protocol\'s hard rule on worker commits now forbids it. Title line: what the repair does, in the plain register; body: the two or three sentences of record.md that say why. If git diff --name-only for this commit shows ANY path outside explorations/, the body also carries a line beginning "historical:" naming the files of the original 2012 tree the commit edits, taken from the rung\'s provenance block - the protocol\'s hard rule on the gate requires those edits to be flagged at commit time. Footer as given. Do not push.',
'',
(notLanded.length
  ? '## The rungs that did not land\n\nThese rungs stopped, were dropped, or their worker died, or the script withheld them (state withheld) because their manifest entry names in landsOnlyWith a rung that was not approved; the reason says which. Their source changes are NOT applied and their branches stay as they are. But their skeptics\' findings are about the tree, not about the rung, and they have nowhere else to go: fold them into ' + BATCH_DIR + '/RECORD.md under a heading "Not landed", one section per rung, carrying the reason it did not land, the findings of its SKEPTIC.md if it has one, and every recommendedRows entry, each opened as a real ledger row or refused in one sentence exactly as step 4 requires. Its items for Pavol go into PLAN.md as step 5 says, in the commit that carries its "Not landed" section. Take that rung\'s REPORT.md, SKEPTIC.md, record.md and the probes its findings actually cite out of its branch by an explicit list of paths (git checkout <branch> -- <path> ..., one path at a time), never the whole directory, so the probes are tracked and nothing else comes with them; where the branch lacks one of the three files, write it with its command from textCommands below, as step 1 says for a landed rung. Apply none of its source.\n\n' + JSON.stringify(notLanded.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state, reason: r.withheldReason || (r.judge && r.judge.summary) || (r.worker && r.worker.stopReason) || '', skepticFindings: (r.verdict && r.verdict.findings) || [], recommendedRows: (r.verdict && r.verdict.recommendedRows) || [] }, rungTextCommands(r))), null, 2) + '\n'
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
JSON.stringify(approved.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, historicalFiles: (r.worker && r.worker.historicalFiles) || [], requiredCorrections: [].concat((r.firstVerdict && r.firstVerdict.requiredCorrections) || [], (r.verdict && r.verdict.requiredCorrections) || []), recommendedRows: [].concat((r.firstVerdict && r.firstVerdict.recommendedRows) || [], (r.verdict && r.verdict.recommendedRows) || []) }, rungTextCommands(r))), null, 2),
'',
'The items for Pavol, by id (' + (items.length ? items.length + ' of them' : 'none') + '):',
'',
JSON.stringify(items, null, 2),
'',
'Return the structured result the tool requires: the commit hash per rung, the order you applied them in and why, the conflicts met and how each was resolved, the corrections closed, the recommended rows opened or refused, the tracked-path check\'s output, forPavol, the points you find yourself (a text mismatch the decisions do not settle among them), pavolItems, one entry for every id above and every gather.N of forPavol with the PLAN.md section and entry that holds it, and pavolUnrouted, every id you could not put in with the reason, for the coordinator. Nothing waits on these: the batch goes on to its review, gate and commit either way.',
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
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this gather finds itself, a text mismatch the decisions do not settle among them, one entry each with its ledger row, its test and its evidence as file:line; each goes into PLAN.md as gather.1, gather.2 in this order; empty if none' },
    pavolItems: PAVOL_ROUTED,
    pavolUnrouted: { type: 'array', description: 'every item for Pavol you could not put into PLAN.md, for the coordinator; empty if none', items: { type: 'object', properties: {
      id: { type: 'string' }, why: { type: 'string', description: 'why it could not go in' } }, required: ['id', 'why'] } },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'pavolItems', 'pavolUnrouted', 'summary'],
}

// The merged-diff review. The first runs beside the gate. A second, after a repair on
// the merged tree, runs beside the commit stage (besideCommit): it can no longer hold a
// batch whose gate is green (Pavol, POSITIONS.md 2026-09-29, a review that still blocks
// after its repair), so the commit's work does not wait on it; only the push does, for
// its stopsMet (below "The run.", the second review).
const COMMIT_TITLE = 'Record the landed commits\' hashes and the gate summary'
function reviewRole(gather, label, items, besideCommit) {
  return MAIN_TREE_ROLE + [
'# Your role: merged-diff reviewer',
'',
'The rungs were judged one at a time in their own worktrees; nobody has yet read the changes together, and the rung skeptics could not see the three record files, which were folded after them. You read both.',
'',
(besideCommit
  ? 'This is the second review, of the tree after the repair on the merged tree. THE COMMIT STAGE IS RUNNING BESIDE YOU, in this same tree: it lands the gate\'s summary and the landed commits\' hashes in one commit, titled "' + COMMIT_TITLE + '". The gate has run and does not run again, and your review can no longer hold the batch (Pavol, POSITIONS.md 2026-09-29, on a review that still blocks after its repair): a blocking finding of yours goes to the next batch and is listed for Pavol. That is why you run beside the commit and not before it (the same day\'s entry on rerunning the gate: the weighing of cost against what a rule protects). The push waits for you: the script holds it on any stop you list in stopsMet that no decision of his lifts, and check 10 reads the repair\'s commit (git log for REPAIR-review.md) as it reads a rung\'s hunks. The three rules below are for this.'
  : 'THE GATE IS RUNNING BESIDE YOU, in this same tree, on the commits the gather made. That is deliberate and it costs nothing as long as your own fixes stay inside explorations/ - the gate\'s result stands. It is why the two rules below matter.'),
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
'9. Last, because it needs the gate\'s table: the checker count. Its total is reported and never red on its own (explorations/coordinator/checker-gate-review.md), so explaining it falls to you. The gate writes ' + GATE_OUT + '/checker-count.txt at its step 8, and the table\'s last line is its #shadow row; its step 9, the distance stage, is reported and never red, and is not yours to explain. Wait for that row in calls of at most eight minutes, for i in $(seq 96); do grep -q \'^#shadow\' ' + GATE_OUT + '/checker-count.txt 2>/dev/null && break; sleep 5; done, and after five calls without it write "no gate table" in checkerRows and leave this check. Diff the table against the last landed one, the first path that git log --name-only --pretty=format: -- explorations/compile-ladder/gate-baseline/checker-count.txt \'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt\' prints. Every row that is new or whose count rose (a row is an api, that is one .fsi file) must be explained as the consequence of a named rung edit, with its file:line: an early error a rung cleared, for example, lets the checker\'s later rules run on that api for the first time (StaticChecker.java:268-272). Where the rows alone do not say, the file:line of every error is in the gate\'s full output, ' + LOG_DIR + '/checker-count/run.txt; read it and write nothing there. One line per row goes in checkerRows. A new or risen row you cannot tie to a rung edit is blocking, for the judge and a repair. A total that misses a rung\'s declared one is not a finding by itself: the declarations are predictions.',
'10. The stops. Every stop the batch record\'s intro reserves for Pavol that a landed rung meets - in its hunks, or where its REPORT.md, SKEPTIC.md or record.md says it met one (a passage reported without choosing, an output a comparison does not account for, a line that waits for him) - goes in stopsMet with the rung\'s id, the evidence as file:line, and in liftedBy the POSITIONS.md line of the decision of his that lifts it, or nothing. The script holds the batch\'s push on any entry with no such line, and on the rungs\' own entries too; it is not a blocking finding, and you do not fix it.',
'11. The items for Pavol. For each id of the list below, the PLAN.md entry the gather\'s pavolItems names is in explorations/coordinator/PLAN.md, under one of the two sections, and says what the item says. An item the gather left out or placed wrong you put in yourself, in your corrections commit. Every point you yourself find that is Pavol\'s goes in forPavol, one entry each, with the ids ' + label + '.1, ' + label + '.2 in the order of forPavol. ' + PLAN_RULE + ' pavolItems lists every id you put in or moved, with its section and entry. It is not a blocking finding.',
'',
'The items for Pavol from the rungs and the gather, by id:',
'',
JSON.stringify(items, null, 2),
'',
'Two kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections", listed in your return. A defect in the source hunks - a rule broken, an edit that is not what its report says, an interaction between two rungs - you do NOT fix; you return it as blocking, precisely enough that a judge can rule on it from your words and the diff. A mismatch between one rung\'s specification text and another rung\'s code that the decisions do not settle, which the gather filed as a reversible stop met (the text as the rung wrote it, the ledger row and gated XXX test of the path that departs, the row named among the text\'s departures in Specification/appendices/changes.tex, and an item for Pavol), is not blocking: check that the four are there, complete a missing record yourself, and return a missing test as blocking. Do not run the gate and do not push.',
'',
...(besideCommit ? [
'## Three rules because the commit stage is running beside you',
'',
'First: make no edit until the commit stage\'s commit is in, so that the two of you never edit one file at once. Read and check everything first; then, before your first edit, wait for it in calls of at most eight minutes, for i in $(seq 96); do git log --format=%s ' + BASE + '..HEAD | grep -qxF "' + COMMIT_TITLE + '" && break; sleep 5; done, and after five calls without it go on and say so in your summary.',
'',
'Second: every correction stays inside explorations/. The gate has run on this tree and does not run again, so a correction that would need a source, library, checker, interpreter, specification or test file is not yours to make: return it as blocking, and it goes to the next batch. Record the hash HEAD is at BEFORE your corrections commit, and the hash after, run git diff --name-only <before> <after>, and return both hashes and in pathsOutsideExplorations every path it prints that is NOT under explorations/; that list must be empty, and a path in it holds the push.',
'',
'Third: do not touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, from which the commit stage copies the gate\'s tables, and retry a git command that fails on index.lock.',
] : [
'## Two rules because the gate is running beside you',
'',
'First: record the hash HEAD is at BEFORE your corrections commit, and the hash after, and run',
'',
'    git diff --name-only <before> <after>',
'',
'and return both hashes and every path that command prints which is NOT under explorations/. If that list is non-empty the gate may have to run again on your result, and the script decides from your answer. Keep your own fixes inside explorations/ wherever you can; if a correction genuinely needs a source file, make it and report it rather than leaving it.',
'',
'Second: do not touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, which are the gate\'s, and retry a git command that fails on index.lock.',
]),
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
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this review finds, one entry each with its evidence as file:line; empty if none' },
    pavolItems: PAVOL_ROUTED,
    summary: { type: 'string' },
  },
  required: ['approved', 'blocking', 'fixed', 'stopsMet', 'forPavol', 'pavolItems', 'summary'],
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
const ATOMIC_COMPILER = 'AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG'

function gateRole(expectedMoves, expectedChecker) {
  return MAIN_TREE_ROLE + [
'# Your role: the gate',
'',
'Run the full gate once on the tree as it stands, exactly, and report what it says. You change no source and you commit nothing: the review agent is committing in this tree beside you, and the commit stage adds your summary to the tree after both of you are done. Your logs go to ' + LOG_DIR + '/, which is untracked and stays untracked - .gitignore:64 ignores /tmp/, and .gitignore:42,46 would swallow a .out or a .log anywhere. Your three tracked outputs are ' + GATE_OUT + '/summary.txt, ' + GATE_OUT + '/checker-count.txt and ' + GATE_OUT + '/distance.txt, which you WRITE but do not commit.',
'',
'The steps, in order. Use run_bg and wait_for from the shared prefix for every long one, and never pipe ant through tail.',
'',
'1. mkdir -p ' + LOG_DIR + ' ' + GATE_OUT + '. df -h / first; if under 1 GB free, sweep /tmp/fortress*rats, ProjectFortress/test-tmp and ProjectFortress/test-caches and check again; if still under 500 MB, stop and report.',
'2. rm -rf ProjectFortress/TEST-RESULTS. Then ant compileAll to ' + LOG_DIR + '/compileAll.txt. BUILD SUCCESSFUL must appear at its end. Then, at once and before step 3, start the distance stage in the background; step 9 reads it. It needs the classes compileAll just built and nothing any later step writes, it runs one JVM on one core for 13 to 24 minutes, and it is started here so that it runs beside steps 3 to 8 instead of after them:',
'',
'        run_bg ' + LOG_DIR + '/distance.txt "explorations/coordinator/tools/distance/run.sh ' + GATE_OUT + '/distance.txt ' + LOG_DIR + '/distance"',
'',
'   Start it once per gate run, never a second one beside it, and do not wait for it here. It reads only ProjectFortress/build and the library sources and writes only under ' + LOG_DIR + '/distance/ and ' + GATE_OUT + '/distance.txt, with its own -Dfortress.caches and its own java.io.tmpdir, so the library rebuild, the suites and the ladder do not touch it and it touches none of them.',
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
'6. The four-thread runs of the compiled atomic programs. The gate is pinned to one thread - env.sh:6 and, since 2026-09-19, the fastTrack and systemShard macros themselves (build.xml) - which makes both suites blind to a lost update: AtomicTopLevelVar passed at one thread and failed at four on the same unrepaired tree, 34,104 of 40,000. These thirteen programs are the ones the repair batch measured at both counts and found 22 of 22 PASS, so a FAIL here is a regression and not a discovery. FirstLoadThreadsRungG, added by climb batch 6.5\'s rung G, is row 417\'s gated home: the first load of generic instantiations from four threads at once, a race one thread never runs; until the file is in compiler_tests/ the stage reports it ABSENT, which is not red. A correct transaction runtime cannot lose an update, so this stage adds no flakiness to a green gate:',
'',
'        ATOMIC_OTHER="' + ATOMIC_OTHER + '"        # other_compiler_tests/, the ten atomicTest.test names',
'        ATOMIC_COMPILER="' + ATOMIC_COMPILER + '"  # compiler_tests/, the three the repair batch added and climb batch 6.5\'s FirstLoadThreadsRungG (row 417)',
'        atomic_runs () {                  # atomic_runs <out-file>; appends "# atomic ..." lines, exit 1 if any is not PASS',
'            local O="$1" p d i out rc',
'            case "$O" in /*) ;; *) O="$PWD/$O" ;; esac     # resolve before the cd: the gate passes GATE_OUT, which is relative to the main tree',
'            cd "$FORTRESS_HOME/ProjectFortress" || return 1',
'            for p in $ATOMIC_COMPILER $ATOMIC_OTHER ; do',
'                case " $ATOMIC_COMPILER " in *" $p "*) d=compiler_tests ;; *) d=other_compiler_tests ;; esac',
'                [ -f "$d/$p.fss" ] || { echo "# atomic $p ABSENT" >> "$O" ; continue ; }     # a program a batch adds before it lands: reported, not red',
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
'   Run atomic_runs ' + GATE_OUT + '/summary.txt so the result lines land in the summary: 39, and one ABSENT line while compiler_tests/FirstLoadThreadsRungG.fss does not exist; 42 once it does. Any FAIL, any NO-PASS, any COMPILE-FAILED and any program that timed out twice is RED. A single timeout that passes on its re-run is not.',
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
'   from ' + MAIN + '. It compiles the two sources beside it - WorldFlip.java, which flips the world with the public Shell.useInterpreterLibraries() and PhaseOrder.compilerPhaseOrder, and an instrumented copy of StaticChecker that names each api it checks and survives the OverloadingChecker crash - against bin/fortress_classpath, and runs the compiler phase order over Library/FortressLibrary.fss with its own -Dfortress.caches under ' + LOG_DIR + '/, so default_repository/ is neither read nor written and no library rebuild is needed. Since climb batch 7 it runs with the overloading checker\'s memo off (-Dfortress.analyzer.overload.cache=false): the memo is keyed on declaration pairs and hides 27 to 35 errors depending on the build order once an api reaches its overloading check (FACTS.md, "The hidden layer, classified"), which the FortressLibrary api does once a rung clears its early errors; with it off every build gives one count. 20 s measured in the main tree on 2026-09-22, 33 s on 2026-09-27; budget a minute. It edits nothing and its only tracked output is the table, which you write and, like the summary, do NOT commit. Print the table in your result: one row per api with that api\'s own error count, then #total, #locations (the distinct file:line the errors were reported at, by this script\'s count), #crash (the crash the checker meets after the apis: none in every table landed since climb batch 4; before it, the nat gap, Not yet implemented at STypesUtil.scala:557), #cache (the memo\'s setting; a landed table without the row was measured with the memo on, which gave the same 62 on the tree of 2026-09-27) and #shadow.',
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
'9. The distance stage, started at step 2: the same checker over the whole interpreter library, the twelve prelude apis and their twelve components, with every stage of every unit run whatever the earlier stages reported, so that nothing hides behind an api\'s early return. Step 8 sees only the errors before each early return, 62 of about 1,750 on the tree of 2026-09-27. This stage is Pavol\'s answer 11 (POSITIONS.md, 2026-09-26): the full measurement of the distance to the switch-over "becomes a report-only stage of phase 3\'s gates, whose job is driving it down". It runs the setting any, the compiled path with the implicit bound Any, because batch 7\'s question 1 was answered (a) (POSITIONS.md, 2026-09-27, the numerics plans), and the overloading memo off; the header of explorations/coordinator/tools/distance/run.sh says why and what each row is. Wait for it with wait_for ' + LOG_DIR + '/distance.txt, called again until it prints its EXIT= line; never start it a second time. Then compare its table with the last landed one, found the way the others are found:',
'',
'        last_landed_distance () {',
'            git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \\',
'                \'explorations/compile-ladder/gate-baseline/distance.txt\' \\',
'                \'explorations/compile-ladder/climb-batch-*/gate/distance.txt\' | grep -m1 \'distance.txt$\'',
'        }',
'',
'   Run explorations/coordinator/tools/distance/compare.sh "$(last_landed_distance)" ' + GATE_OUT + '/distance.txt and append its output to ' + GATE_OUT + '/summary.txt with every line prefixed by "# distance ". It prints DISTANCE DOWN, UP or SAME with the two totals, or DISTANCE FIRST when no table has landed yet, then every kind, root-cause class and unit whose count moved and every crash that went or came. It is REPORTED and never red: not on a rise, not on a new crash, not on SHADOW STALE (a shadow edit that no longer matches the tracked sources, so the checker did not run) and not on DISTANCE NO TABLE (a run that produced no count). A move of 2 to 4 errors in the components\' type errors, or in which LEXICO, SQCAP or INVERSE pair an overloading error names, is the checker\'s run-to-run variation, not a change. Print in your result the table\'s #total, #kind, #class, #seconds and #shadow rows and the comparison\'s lines.',
'',
'## What green means',
'',
'Zero failures and zero errors in every suite of testFast and of testSystem, BUILD SUCCESSFUL on compileAll and on both suites, no COUNT DOWN and no SUITE GONE line from gate_compare, every atomic run PASS, no undeclared DOWN, STDOUT or MISSING line from the ladder comparison, and from the checker count an unchanged crash line, unless a rung declared the new one, and no stale shadow. The checker\'s total, up or down, declared or not, is reported and never red, and so is everything the distance stage of step 9 prints, a run of it that produced no table included. Anything else is red.',
'',
'Write ' + GATE_OUT + '/summary.txt, ' + GATE_OUT + '/checker-count.txt and ' + GATE_OUT + '/distance.txt as the snippets and the scripts produce them - do not hand-write any of them; the last two batches wrote agent prose and one of them got a suite count wrong. Do NOT commit them. Return the structured result. If red, name every failing test and copy the first failure\'s output lines into the result; the judge reads them.',
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
    distance: { type: 'string', description: 'the distance stage of step 9, reported and never red: the table\'s #total, the verdict line compare.sh printed with the last landed total, the kinds and classes that moved, the crashes that went or came, #seconds, and #shadow; or why the run produced no table' },
    failing: { type: 'array', items: { type: 'string' }, description: 'failing test names with the key output line each' },
    stopped: { type: 'boolean', description: 'true if the gate could not be run (disk, build failure before tests)' },
    summaryPath: { type: 'string', description: 'the path of the summary file you wrote, and the path of the last landed one you compared against' },
    summary: { type: 'string' },
  },
  required: ['green', 'failing', 'stopped', 'summary'],
}

// Pavol, 2026-09-29 (POSITIONS.md, rerunning the gate after a repair that only
// added tests): a repair on the merged tree that changes no source, library,
// checker, interpreter or specification file does not rerun the gate. It runs the
// test files it added or changed in the harness, the gate's own JUnit mechanics
// for those files, and the first gate's tables stand. A test file is a .fss, .fsi
// or .test file directly in one of the corpora the harness reads, the directories
// named tests or ending in _tests under ProjectFortress/ (FileTests reads them flat).
const TEST_FILE = /^ProjectFortress\/(tests|[A-Za-z_]+_tests)\/[^/]+\.(fss|fsi|test)$/
const repoPath = (p) => p.trim().replace(/^\.\//, '')
const codePathsOf = (paths) => strings(paths).map(repoPath).filter(p => !p.startsWith('explorations/') && !TEST_FILE.test(p))
const testPathsOf = (paths) => strings(paths).map(repoPath).filter(p => TEST_FILE.test(p))

function repairTestsStep(kind, failing) {
  return [
'',
'## Your tests, and whether the gate runs again',
'',
'Record the hash HEAD is at before your first commit and the hash after your last, and return both, and in pathsChanged every path git diff --name-only <before> <after> prints. The script decides from that list whether the whole gate runs again after you (Pavol, POSITIONS.md 2026-09-29, on rerunning the gate after a repair that only added tests). A path outside explorations/ that is not a test file - source, library, checker, interpreter or specification - reruns it, as before. Test files and records only do not: then your runs below are the verification of your tests, the first gate\'s tables stand, and the commit stage records your tests\' lines beside the first gate\'s summary. A test file here is a .fss, .fsi or .test file directly in one of the corpora the harness reads, ProjectFortress/tests/ and the ProjectFortress/*_tests/ directories.',
'',
'Every test file you add or change there you run in the harness on the merged tree, placed where the gate reads it, with the gate\'s own JUnit mechanics, and all the files of one corpus TOGETHER, in one harness run, one JVM, as the gate\'s track runs them: a file that passes alone can fail beside others in one JVM, as batch 6.5\'s WitnessIdentityRungG did under the gate (explorations/reviews/batch-6.5-review.md, item 78), and running them together is the one thing a second gate would still have added (explorations/reviews/batch-N-review.md, question 4). The .test files of compiler_tests/, and those of library_tests/, each through one call of ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> <the directory> <Name.test>..., which runs fortress junit once over the list, the harness\'s FileTests.suiteFromListOfFiles, its compile and link tests before its run tests, so a link test still runs before its XXX run test; the interpreter tests of tests/ through one call of explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch dir under tmp/> <file.fss>..., which runs SystemJUTest, the class testSystem\'s shards run, once over a directory holding only the named files with testSystem\'s JVM settings. Batch N\'s repair ran each file in its own JVM (explorations/compile-ladder/climb-batch-N/merged-tests/repair-junit-placed.txt); do not. Capture each run\'s output under ' + BATCH_DIR + '/repair-' + kind + '-tests/ and commit the captures with your tests. In testRuns return one entry per file: the file, the added or changed test paths its lines in the run exercise (a .test and the .fss it names), the summary.txt row it adds to (fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system for tests/), the JUnit cases it adds (its lines of the run; the files of one run add up to the n of its OK (n tests) or Tests run: n), its verdict (pass only when the run that held it printed OK, so a failure anywhere in a run fails every file of it), and the path of that run\'s capture. A test path you changed that no run exercises, or a run that did not pass, reruns the gate.',
...(kind === 'gate' ? [
'',
'The gate was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'In failingAnswered return one entry per line, in order: the line, and the test file of testRuns whose passing run now answers it, or empty where no run of yours does (an atomic run, the ladder, a suite count, the checker count). The gate does not run again only when every line is answered and your commit changed no path that reruns it.',
] : []),
'',
  ]
}

function mergedRepairRole(decision, kind, failing) {
  return MAIN_TREE_ROLE + [
'# Your role: repair on the merged tree (' + kind + ')',
'',
...sliceStep(RUNGS, 'the main tree (' + MAIN + ')', 'First, before the ruling below,'),
'',
'The judge has ruled on the merged tree; you execute the ruling. Its decision:',
'',
JSON.stringify(decision, null, 2),
'',
(strings(decision && decision.forPavol).length
  ? 'The judge marked these for Pavol. ' + PLAN_RULE + ' The entries go in your commit, and pavolItems lists each by its id.\n\n' + JSON.stringify(numbered('judge-' + kind, decision.forPavol), null, 2) + '\n\n'
  : '') + 'Its full ruling is in ' + BATCH_DIR + '/JUDGE-' + kind + '.md. Carry out the instructions in order. Where one turns out wrong against a primary source, do what the source says and record the deviation in ' + BATCH_DIR + '/REPAIR-' + kind + '.md with the file:line that settles it. Rebuild what the edit needs (ant compileAll for Java, then the library-order rebuild), run the tests the ruling names, and commit locally, one commit, with the record files updated where the ruling says and a historical: line in the body if the commit touches a file of the 2012 tree. Every defect this repair measures and fixes gets its assertion in a gated test, as the shared prefix requires. Do not run the full gate; the gate stage runs it after you when the section below says it does. Do not push.',
...repairTestsStep(kind, failing),
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

// The repairs whose tests stand beside the gate's summary instead of a second gate
// (repairRerun): each { kind, runs, answered } as the script kept it.
function besideStep(beside) {
  if (!beside.length) return []
  const cases = [].concat.apply([], beside.map(b => b.runs)).reduce((n, t) => n + (Number(t.cases) || 0), 0)
  return [
'1a. The gate below ran on the tree before a repair on the merged tree that changed test files and records only, so it was not run again (Pavol, POSITIONS.md 2026-09-29, on rerunning the gate after a repair that only added tests): its tables stand, and the repair ran its tests in the harness on the merged tree. Record them beside the summary, in the same commit as step 1, so that the next batch\'s comparand is stated honestly: after the gate\'s own lines, append to ' + GATE_DIR + '/summary.txt one line per run below, tab-separated and prefixed "# repair-tests", with the repair\'s kind, the summary row it adds to, its JUnit cases, its verdict, the file and the capture\'s path; then, for each line the gate failed on that the repair answered, a line "# repair-tests answered", the gate\'s line and the file whose run answers it; and last "# repair-tests total" with ' + cases + ', the cases these runs add, by which every count the next gate reads rises beyond this summary\'s rows. Do not change the gate\'s own rows. The runs and answers:',
'',
JSON.stringify(beside, null, 2),
'',
  ]
}

// The commit stage. part is 'all' (steps 1 to 4, the usual case), or, when a second
// review follows a repair on the merged tree, 'local' (steps 1 and 2, beside that
// review) and then 'push' (steps 2 to 4, once the review's stops are known): the
// commit's work does not wait on the second review, and the push still does.
function commitRole(gather, gate, heldBy, beside, part) {
  part = part || 'all'
  const held = heldBy.length > 0
  beside = beside || []
  const answered = beside.some(b => strings((b.answered || []).map(a => a && a.failing)).length)
  const tree = beside.length
    ? 'The gate ran on the tree before a repair of test files and records only and was not run again; its tables stand, ' + (answered ? 'the lines it was red on answered by the repair\'s passing runs' : 'green') + ' (step 1a).'
    : 'The gate is green on the tree as it stands.'
  if (part === 'push') return MAIN_TREE_ROLE + [
'# Your role: commit, the push',
'',
'The commit stage has landed this batch on the local main, in the commit titled "' + COMMIT_TITLE + '", beside the second review of the repaired tree, whose corrections commit, if it made one, follows it (Pavol, POSITIONS.md 2026-09-29: that review no longer holds a batch whose gate is green, so the commit did not wait on it; the push did, for the stops it lists). ' + (held ? 'The script holds the push (step 3).' : 'Push it.') + ' Steps 2 to 4 of the commit stage are yours; step 1 is done, and you do not repeat it.',
'',
'2. Verify every commit since ' + BASE + ', the second review\'s included, ends with the two footer lines and contains no model identifier (git log ' + BASE + '..HEAD --format=%B), and that every commit whose diff touches a path outside explorations/ carries a historical: line.',
commitPushSteps(held, heldBy)[0],
commitPushSteps(held, heldBy)[1],
'',
(held
  ? 'Return the structured result: the hash main is at locally as mainHead, pushed empty, pushHeld true, and the stops above in heldBy.'
  : 'Return the structured result: the hash main is at on origin, the commits pushed, and what was cleaned up.'),
'',
  ].join('\n')
  return MAIN_TREE_ROLE + [
'# Your role: commit',
'',
part === 'local'
  ? tree + ' Land it on the local main: steps 1 and 2 below, and nothing after them. The second review of the repaired tree runs beside you in this tree; it makes no edit until your step 1 commit is in, and the script pushes after you both return, in a step of its own, holding the push on any stop that is met and not lifted (Pavol, POSITIONS.md 2026-09-29: that review no longer holds a batch whose gate is green, so the commit does not wait on it).'
  : held
  ? tree + ' Land it on the local main; the script holds the push (step 3).'
  : tree + ' Land it.',
'',
'1. Replace every literal <short hash> placeholder in the ledger, FACTS and the handover with the hash of the commit it refers to, from the gather stage\'s result below. Copy the gate\'s outputs into the tree first: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/ - the gate wrote them under tmp/, untracked, so that a run that stops before this stage leaves nothing untracked in the tree, and it committed nothing because the review was committing in this tree at the same time. Then add ' + GATE_DIR + '/summary.txt, ' + GATE_DIR + '/checker-count.txt, ' + GATE_DIR + '/distance.txt and ' + GATE_DIR + '/ladder/ to the same commit, and copy ' + LOG_DIR + '/distance/errors.tsv to ' + GATE_DIR + '/distance-sites.tsv and add it too: the distance stage\'s per-site list, which the next batch\'s count and distance rungs read as their "before" instead of re-running the stage on an unchanged base (POSITIONS.md, 2026-09-28, the entry on rungs re-running measurements). The checker-count and distance tables are the comparands the next batch\'s gate reads, so a batch that lands without them leaves the next gate comparing against older ones. Title it "Record the landed commits\' hashes and the gate summary". grep -rn "<short hash>" explorations/ afterwards must be empty, and the full gate logs under ' + LOG_DIR + '/ are NOT committed and never are.',
...besideStep(beside),
'2. Verify every commit since ' + BASE + ' ends with the two footer lines and contains no model identifier (git log ' + BASE + '..HEAD --format=%B), and that every commit whose diff touches a path outside explorations/ carries a historical: line.',
...(part === 'local' ? [
'3. Stop here: do not push, do not remove a worktree, and write no "Not pushed." paragraph. The script\'s push step does those after the second review.',
] : commitPushSteps(held, heldBy)),
'',
'The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'The gate stage returned:',
'',
JSON.stringify(gate, null, 2),
'',
(part === 'local'
  ? 'Return the structured result: the hash main is at locally as mainHead, pushed empty, containerBranchAtMain false, pushHeld false (the push is the script\'s next step, not held by you), and heldBy empty.'
  : held
  ? 'Return the structured result: the hash main is at locally as mainHead, pushed empty, pushHeld true, and the stops above in heldBy.'
  : 'Return the structured result: the hash main is at on origin, the commits pushed, and what was cleaned up.'),
'',
  ].join('\n')
}

// Steps 3 and 4 of the commit stage: the push and the clean-up, or the held push.
function commitPushSteps(held, heldBy) {
  return [
held
  ? '3. Do NOT push: not main, not ' + CONTAINER_BRANCH + ', no branch. The script holds the push, because landed rungs carry stops that were met and that no decision of Pavol\'s lifts:\n\n' + heldBy.map(h => '- ' + h).join('\n') + '\n\n   Append to ' + BATCH_DIR + '/RECORD.md a paragraph headed "Not pushed." that names each of these stops with its rung and evidence, gives the hash origin/main stays at, and says that the push waits on Pavol, as batch 4\'s and batch 5\'s records did; commit it locally with the footer. The coordinator pushes once he has lifted them.'
  : '3. git push origin main; then git push origin main:' + CONTAINER_BRANCH + ' so the container\'s own branch stays at main. Retry a failed push up to four times with 2, 4, 8, 16 seconds between.',
held
  ? '4. Keep every wip/ worktree and its local branch: their removal follows the push, as batch 5\'s commit stage kept them while its push was held.'
  : '4. For each wip/ branch: confirm git -C <worktree> status -sb shows nothing ahead of its origin; then git worktree remove <worktree> and git branch -D <branch>. Leave the remote wip/ branches: the proxy refuses branch deletion from here, and Pavol removes them in the GitHub UI.',
  ]
}

// The repair on the merged tree returns a worker's result, the items for Pavol it
// put into PLAN.md, the paths its commits changed and its tests' runs, from which
// the script decides whether the gate runs again (repairRerun, below).
const MERGED_REPAIR_SCHEMA = Object.assign({}, RUNG_SCHEMA, {
  properties: Object.assign({}, RUNG_SCHEMA.properties, {
    pavolItems: PAVOL_ROUTED,
    headBefore: { type: 'string', description: 'the hash HEAD was at before your first commit' },
    headAfter: { type: 'string', description: 'the hash HEAD is at after your last commit' },
    pathsChanged: { type: 'array', items: { type: 'string' }, description: 'every path git diff --name-only <headBefore> <headAfter> prints, inside explorations/ or not' },
    testRuns: { type: 'array', description: 'one entry per test file added or changed outside explorations/, run in the harness on the merged tree together with the other files of its corpus, one run per corpus; empty if none',
      items: { type: 'object', properties: {
        file: { type: 'string', description: 'the file run, as the repository path' },
        paths: { type: 'array', items: { type: 'string' }, description: 'the added or changed test paths its lines of the run exercise' },
        suite: { type: 'string', description: 'the summary.txt row it adds to: fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system' },
        cases: { type: 'integer', description: 'the JUnit cases it adds' },
        verdict: { type: 'string', enum: ['pass', 'fail'], description: 'pass only when the run that held it printed OK' },
        capture: { type: 'string', description: 'the path of that run\'s capture, shared by the files of the run' },
      }, required: ['file', 'paths', 'suite', 'cases', 'verdict', 'capture'] } },
    failingAnswered: { type: 'array', description: 'the gate\'s repair only: one entry per line of the gate\'s failing list, in order; empty for the review\'s repair',
      items: { type: 'object', properties: {
        failing: { type: 'string' },
        file: { type: 'string', description: 'the testRuns file whose passing run answers it; empty if none does' },
      }, required: ['failing', 'file'] } },
  }),
  required: RUNG_SCHEMA.required.concat(['headBefore', 'headAfter', 'pathsChanged', 'testRuns']),
})

// Whether the gate runs again after a repair on the merged tree. It does when the
// repair, or the review's corrections before it (reviewPaths), changed a path
// outside explorations/ that is not a test file; when a test path they changed is
// not exercised by a passing run of the repair's; when the repair did not say what
// it changed; and, after the gate's repair (redGate, the gate it repaired), when the
// gate's own counts fell or a suite went, when it named no failing line, or when a
// line it failed on is not answered by a passing run. Otherwise the first gate's
// tables stand and the repair's runs are recorded beside its summary. The second
// review's corrections no longer enter it: since 2026-09-29 that review runs beside
// the commit, after this decision, and a path it changes outside explorations/ holds
// the push instead (below "The run.").
function repairRerun(repair, reviewPaths, redGate) {
  if (!repair) return { rerun: true, why: 'the repair returned nothing' }
  if (!Array.isArray(repair.pathsChanged)) return { rerun: true, why: 'the repair did not list the paths it changed' }
  const changed = strings(repair.pathsChanged).concat(strings(reviewPaths))
  const code = codePathsOf(changed)
  if (code.length) return { rerun: true, why: 'changed outside explorations/, not a test file: ' + code.join(', ') }
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
  return { rerun: false, runs: passing, answered: lines.length ? repair.failingAnswered : [], why: testPathsOf(changed).length ? 'test files and records only' : 'records only' }
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
// An agent that comes back with nothing, and the retry.
//
// agent() gives the script nothing in two ways (the workflow-authoring
// reference, agent(), parallel(), pipeline() and budget): it returns null when
// the subagent dies on a terminal API error or the user skips it, and it throws
// when the token budget is spent, when its options are malformed, or when the
// run is aborted. In climb batch 6 (run wf_b262c534-337, 2026-09-27, 03:34:03
// UTC) rung R's second skeptic returned its verdict, approved, through the
// structured-output tool; the API's safety filter then blocked its next
// message, a false positive, the harness marked the agent failed, agent()
// returned null, and the stage below recorded R as dropped. Pavol asked for a
// retry in the script.
//
// callAgent is the one door to agent(). It treats null, undefined and a thrown
// error alike, runs the role again up to two more times, and logs every attempt
// that came back with nothing by the role's label; only after the last attempt
// does it return null, which every call site already reads as a dead agent. A
// user's skip returns the same null as a death, so a skipped agent is retried
// too. A retry's prompt opens with retryHead: an earlier attempt ended without
// its result, and what that attempt may have left, per stage (the recover*
// functions below), so that it continues rather than redoes the work.
//
// Cache keys. The run's journal keys each call by a hash over the previous
// call's key, the prompt and the options, and journals a null result as failed,
// never as a result, so resumeFromRunId has no empty result to hand back. On
// top of that, attempt n > 1 opens its prompt with a head that names n and
// carries a label ending ":attempt<n>", so no two attempts of a role share a
// prompt, options or key. Attempt 1 passes the call's prompt and options
// unchanged, byte for byte, so its key is the one the unwrapped call had.
// ---------------------------------------------------------------------------

const ATTEMPTS = 3   // the first attempt and up to two more: Pavol asked for the retry on 2026-09-27, the coordinator's brief set the count

// What every retry is told first, at the head of its prompt, before the shared
// prefix. recovery is the stage's own list of what the earlier attempt may have
// left and how to take it over.
function retryHead(role, attempt, recovery) {
  const earlier = attempt === 2 ? 'The first attempt' : 'The first ' + ['', 'one', 'two', 'three', 'four'][attempt - 1] + ' attempts'
  return [
'# Attempt ' + attempt + ' of ' + ATTEMPTS + ' at the role ' + role + ': read this first',
'',
earlier + ' at this same role ended without returning a result to the script: a false positive of the API\'s safety filter, or an agent that died. This retry was built after such a case in climb batch 6, on 2026-09-27: rung R\'s second skeptic wrote and returned its verdict, the filter then blocked its next message, and the verdict never reached the script. So what came before you may have done none of this role\'s work, part of it, or all of it. What it left is yours. Read it first, continue from where it stopped rather than redo it, and then return the result your role asks for, in the structured form the tool requires. Say in your summary that you are attempt ' + attempt + ', what you found, and what you took over as it was.',
'',
'What ' + (attempt === 2 ? 'the earlier attempt' : 'the earlier attempts') + ' may have left, and how to take it over (below, "the earlier attempt" means ' + (attempt === 2 ? 'it' : 'them together') + '):',
'',
...recovery.map(s => '- ' + s),
'',
'The brief below is the one the first attempt received, word for word. Where it assumes a fresh start - a clean tree, a first run, a file not yet written - read it as continuing from the state you found.',
'',
  ].join('\n')
}

async function callAgent(prompt, opts, recovery) {
  const role = opts.label
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const retry = attempt > 1
    let result = null
    let why = 'no result (null: the agent died, was blocked, or was skipped)'
    try {
      result = await agent(retry ? retryHead(role, attempt, recovery) + prompt : prompt,
                           retry ? Object.assign({}, opts, { label: role + ':attempt' + attempt }) : opts)
    } catch (e) {
      result = null
      why = 'an error thrown by agent(): ' + String((e && e.message) || e).slice(0, 300)
    }
    if (result !== null && result !== undefined) {
      if (retry) log(role + ': attempt ' + attempt + ' of ' + ATTEMPTS + ' returned its result')
      return result
    }
    log(role + ': attempt ' + attempt + ' of ' + ATTEMPTS + ' ended with ' + why
        + (attempt < ATTEMPTS
          ? '; running the role again as attempt ' + (attempt + 1) + ', told to take over what this one left'
          : '; no attempt left, so the script takes its path for a dead agent'))
  }
  return null
}

// A command started with run_bg (nohup) may outlive the agent that started it.
const bgCheck = (tree) => 'A command the earlier attempt started with run_bg (nohup) may still be running. Before you start a build, a test or any long run, list what runs: ps -eo pid,etime,args | grep -E "ant|java|fortress" | grep -v grep, and readlink /proc/<pid>/cwd for the tree each runs in (other agents of this batch run in their own trees). A step still running in ' + tree + ' is the earlier attempt\'s: wait for its log with wait_for and use its result; never start the same step, or a second ant, beside it.'

// The rung worker's first pass: its branch, its worktree, its own directory.
function recoverRung(rung) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '. Set up the shell as the shared prefix says, then run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb (commits not yet pushed show as ahead) and ls -lt tmp/ | head -20, and read what exists of explorations/compile-ladder/' + rung.slug + '/: REPORT.md, record.md, probes/.',
    'The shared prefix\'s section "If your branch already carries commits" applies in full: committed work is yours to verify, not to redo; uncommitted edits are yours once you have read them; a log whose last step failed or was cut off is a step still to do.',
    'Test first still holds. A recorded failure counts only if it was captured before the edit existed. If the earlier attempt made the edit and captured no failure, set the edit aside (git stash), capture the failure, restore the edit (git stash pop), and say so in REPORT.md.',
    bgCheck(rung.path),
    'Commit what you took over once you have read it, push what is committed and not pushed, and go on with the order of work from the first step not done.',
  ]
}

// The rung worker's continuation after a judge's ruling: on a stop (resume) or
// on a skeptic's refusal (repair).
function recoverRungRepair(rung, afterRefusal) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '. Run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb and ls -lt tmp/ | head -20, and read explorations/compile-ladder/' + rung.slug + '/JUDGE.md' + (afterRefusal ? ', SKEPTIC.md' : '') + ', REPORT.md and record.md. The commits after the one that carries the judge\'s ruling are the earlier attempt\'s, and so are uncommitted edits.',
    'Take the judge\'s numbered instructions one at a time and check each against the tree before acting: a step already done is not done again. An assertion already in the test is not added a second time, a line already in REPORT.md or record.md is not written twice, and a capture already taken after the edit is not taken again unless it is cut off. Continue at the first step not done.',
    bgCheck(rung.path),
    'Commit what you took over once you have read it, push what is committed and not pushed, and finish as the repair round below says, with reportText, recordText and stopsMet describing the rung as it now stands.',
  ]
}

// A skeptic, first or second judgement: SKEPTIC.md and probes/skeptic/.
function recoverSkeptic(rung, round) {
  const f = 'explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb and ls -lt tmp/ | head -20, and read ' + f + ' and probes/skeptic/ beside it.',
    round > 1
      ? 'SKEPTIC.md already held the first judgement, which refused, before the repair round. Only a second-judgement section written after the repair round\'s last commit on the branch is the earlier attempt\'s work; the first judgement is not your verdict.'
      : 'This is the rung\'s first judgement, so whatever SKEPTIC.md and probes/skeptic/ hold is the earlier attempt\'s work.',
    'If the earlier attempt\'s verdict is complete (a verdict, the checks of the role below, the differentials with their captures under probes/skeptic/), it is your verdict. Confirm that each capture it cites exists and says what the verdict cites it for, commit and push whatever of it is not committed and pushed, and return it, with skepticText ' + (round > 1 ? 'this second judgement\'s text' : 'the file\'s text') + ' word for word. It may have been returned already and lost on the way, which is the case this retry exists for.',
    'If it is partial, finish the checks and differentials it has not done and complete the file in place: never a second copy of a section. A differential whose capture exists and is whole is not run again.',
    bgCheck(rung.path),
  ]
}

// A judge on one rung, on a stop or a refusal: JUDGE.md on the rung's branch.
function recoverJudgeRung(rung, kind) {
  const f = 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Run git log --oneline ' + BASE + '..HEAD, git status --short and git status -sb, and read ' + f + ' with git log --format="%h %ci %s" -- ' + f + '.',
    'JUDGE.md may already hold an earlier ruling on this rung on another question (a ruling on a stop comes before one on a refusal). The earlier attempt\'s is a ruling on this question, the ' + kind + ', written after the ' + (kind === 'refusal' ? 'skeptic\'s' : 'worker\'s') + ' last commit on the branch.',
    'If that ruling is complete, it is your ruling: commit and push it if it is not yet committed and pushed, and return the decision it records, with its numbered instructions as the file numbers them. If it is partial, complete it in place, then commit and push once.',
  ]
}

// A judge on the merged tree, on a blocking review or a red gate.
function recoverJudgeMain(kind) {
  const f = BATCH_DIR + '/JUDGE-' + kind + '.md'
  return [
    'You are in the main tree, ' + MAIN + '. Run git log --oneline ' + BASE + '..HEAD and git status --short, and read ' + f + ' with git log --format="%h %ci %s" -- ' + f + '. Whatever that file holds is the earlier attempt\'s.',
    'If its ruling is complete, it is your ruling: commit it locally if it is not committed (one commit, retrying on index.lock), and return the decision it records, with its numbered instructions as the file numbers them. If it is partial, complete it in place and commit once. Do not push.',
  ]
}

// The gather: it applies patches to main and folds the record, so a retry must
// never apply a rung twice or fold a line twice.
function recoverGather() {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean. The precondition that git status --porcelain is empty held for the first attempt; a dirty tree now is the earlier attempt\'s work in progress and your starting point, not a failed precondition. Check only that ' + BASE + ' is still an ancestor of HEAD.',
    'Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --cached --stat, git diff --stat, and ' + BATCH_DIR + '/RECORD.md if it exists. An approved rung whose commit is already on main (one per rung, carrying its source change and explorations/compile-ladder/<slug>/) is done: never apply its patch again, and name it in your result with its hash.',
    'Before you apply any other rung\'s patch, regenerate it (git diff ' + BASE + '...<branch>) and run git apply --reverse --check on it. If that succeeds, the patch is already in the tree, applied and not committed; applying it again is the one thing this retry must not do. Continue that rung from the step after the apply. A file with conflict markers (git diff --check, grep -n "^<<<<<<<") is a 3-way apply the earlier attempt left half resolved: resolve it by the rules of the role, or return the conflict as the role says.',
    'The three record files may already carry a rung\'s fold. Before you fold a rung, grep FACTS.md, the ledger and the handover for its lines and for each ledger row it opens, and fold only what is missing: never a line or a row twice. The same holds for the batch record\'s "Not landed" sections, for a rung\'s three files written from the run\'s journal (a file its command already wrote stands, and the command is not run again), and for PLAN.md\'s entries for the items for Pavol: grep PLAN.md for each item before you write it.',
    'Scratch patches the earlier attempt wrote may still be where it put them; regenerate them rather than trust them. Retry a git command that fails on index.lock, as the role says.',
  ]
}

// The merged-diff review, first or second: its one corrections commit and the
// head it records before it.
function recoverReview(besideCommit) {
  return [
    'You are in the main tree, ' + MAIN + ', with ' + (besideCommit ? 'the commit stage' : 'the gate') + ' running beside you or finished. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short. A commit titled "Fold the review\'s corrections" made after the last commit of the stage before you (the gather\'s last rung commit, or the repair\'s commit on a second review' + (besideCommit ? ', with the commit stage\'s own commit possibly between' : '') + ') is the earlier attempt\'s. Then headBefore is that commit\'s parent, not the HEAD you find, so that pathsOutsideExplorations covers both attempts\' corrections; headAfter is HEAD when you finish.',
    'Uncommitted edits under explorations/ are the earlier attempt\'s corrections in progress: read them, keep what is right, and commit them with your own, in one commit of the same title, or in one more such commit if the earlier attempt already made its own. Do not fix a finding twice.',
    'Never touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, and wait for the gate\'s table in check 9 exactly as the role says' + (besideCommit ? ', and for the commit stage\'s commit before your first edit.' : '.'),
  ]
}

// The repair on the merged tree, after a blocking review or a red gate.
function recoverMergedRepair(kind) {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean. Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --stat, ' + BATCH_DIR + '/JUDGE-' + kind + '.md, and ' + BATCH_DIR + '/REPAIR-' + kind + '.md if it exists. A commit after the one that carries JUDGE-' + kind + '.md is the earlier attempt\'s repair, uncommitted edits are its repair in progress, and the tree as you find it is your starting point.',
    'Take the judge\'s instructions one at a time and check each against the tree before acting: an edit already in place is not applied again, an assertion already in a test is not added twice, and a record line already written is not written again. Continue at the first step not done.',
    bgCheck(MAIN),
    'The role asks for one commit. If the earlier attempt made it already, what you finish goes in one further commit, and your result says so; headBefore is then the parent of the earlier attempt\'s first commit, so that pathsChanged covers both attempts, and a test run it captured under ' + BATCH_DIR + '/repair-' + kind + '-tests/ on the tree as it still is stands and is not run again. Do not push.',
  ]
}

// The gate: its logs under LOG_DIR and its outputs under GATE_OUT. It commits
// nothing, so what a retry must not do is repeat a finished step or append a
// line to the summary twice.
function recoverGate() {
  return [
    'You are in the main tree, ' + MAIN + '. The earlier attempt\'s logs are under ' + LOG_DIR + '/ and its outputs under ' + GATE_OUT + '/: ls -lt both. A log is the earlier attempt\'s only if it is newer than the newest commit that touches a path outside explorations/ (git log -1 --format=%ci -- . ":(exclude)explorations"); an older one is from a gate run on an earlier tree of this batch and counts for nothing.',
    bgCheck(MAIN),
    'Steps 2 to 4 each leave a log: compileAll.txt, library.txt, testFast.txt, testSystem.txt. One that is the earlier attempt\'s and ends in EXIT=0 with BUILD SUCCESSFUL (library.txt: EXIT=0) is a step done: do not run it again. Above all, do not repeat step 2 once step 4 has finished, since its rm -rf ProjectFortress/TEST-RESULTS deletes the suites\' results. Continue at the first of those steps whose log is missing, cut off or failed. Step 3\'s two copies stand only if library.txt finished and both copies exist; otherwise redo step 3 whole, copies included.',
    'The distance stage that step 2 starts in the background leaves ' + LOG_DIR + '/distance.txt, its run_bg log, which ends in an EXIT= line when the run is over, and writes ' + GATE_OUT + '/distance.txt at the end, a table whose last row is #shadow. If that log is the earlier attempt\'s, the stage was started: when the log ends in EXIT=, it finished; when it does not and a java DistanceMulti runs in ' + MAIN + ' (the ps and readlink above), it is still running. Either way do not start it again; wait for it at step 9. Only when the log has no EXIT= line and no such process runs did the run die with the earlier attempt: remove the log and start it again as step 2 says, before going on.',
    'Steps 5 to 9 write into summary.txt: step 5 rewrites it, and steps 6, 7e, 8 and 9 append to it. A step whose output is all there is done: step 6 when the summary carries its # atomic lines (39 and one ABSENT line, or 42, as step 6 says), step 7 when ' + GATE_OUT + '/ladder/ holds ladder.tsv, microgpt-phase.md and the comparison, step 8 when checker-count.txt ends in its #shadow row and the summary carries the # checker lines, step 9 when the summary carries the # distance lines. Continue at the first of them not done; if one stopped partway, with some of its lines already in the summary, run again from step 5, which rewrites the file, so that no line lands in it twice; the distance stage itself is not run again for that, only its comparison.',
    'Return the result, as the role says, from the logs and tables as they stand when you finish.',
  ]
}

// The commit: its local commits, and the push or the held push. part as commitRole's:
// the push part's step 1 is done by the local part and never its to redo.
function recoverCommit(held, part) {
  part = part || 'all'
  const local = part === 'push'
    ? 'You are in the main tree, ' + MAIN + '. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short. The commit titled "' + COMMIT_TITLE + '" is the local part\'s, and a commit titled "Fold the review\'s corrections" after it the second review\'s; neither is yours to redo. Your steps are 2 to 4.'
    : 'You are in the main tree, ' + MAIN + '. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short, and run grep -rn "<short hash>" explorations/. A commit titled "' + COMMIT_TITLE + '" is the earlier attempt\'s step 1: do not make it again, and finish what it left uncommitted, if anything, in one further commit. If the role has a step 1a and ' + GATE_DIR + '/summary.txt already carries "# repair-tests" lines, they are the earlier attempt\'s: do not copy the gate\'s summary over that file again and do not append them twice.'
  if (part === 'local') return [local, 'Push nothing and remove nothing: the role stops after step 2.', 'Return the result for the state you leave, counting the earlier attempt\'s commits as done.']
  return [
    local,
    held
      ? 'The push is held. Look for the "Not pushed." paragraph in ' + BATCH_DIR + '/RECORD.md: if the earlier attempt wrote it, do not append it again, and commit it if it is not committed. Push nothing, as the role says.'
      : 'Check what is already pushed: git fetch origin, then git rev-parse HEAD origin/main origin/' + CONTAINER_BRANCH + '. A push the earlier attempt made is not made again; push only what origin lacks. git worktree list and git branch --list "wip/*" show which worktrees and branches step 4 has already removed; confirm that each one left shows nothing ahead of its origin before removing it.',
    'Return the result for the state you leave, counting the earlier attempt\'s commits' + (held ? ' as done.' : ' and pushes as done: pushed lists every commit of this batch that origin/main now carries, whichever attempt pushed it.'),
  ]
}

// ---------------------------------------------------------------------------
// The run.
// ---------------------------------------------------------------------------

log('Climb batch ' + BATCH + ': ' + RUNGS.length + ' rungs (' + RUNGS.map(r => r.id).join(', ') + '), two at a time in the order '
    + SCATTER.map(r => r.id).join(', ') + ' (longest expected worker first), each judged by its own skeptic before the merge; then gather, review beside the gate, commit. Base ' + BASE + '.')

const results = await pipeline(
  SCATTER,

  // Stage 1: the rung worker.
  (rung) => callAgent(PREFIX + rungRole(rung) + rung.tail, {
    label: 'rung:' + rung.id,
    phase: 'Rung',
    schema: RUNG_SCHEMA,
    model: OPUS,
  }, recoverRung(rung)),

  // Stage 2: the skeptic, with one repair round; the judge on a stop or a refusal.
  async (worker, rung) => {
    let judgeOnStop = null
    const out = (state, extra) => Object.assign({ rung: rung.id, slug: rung.slug, branch: rung.branch, state, stopJudge: judgeOnStop }, extra)
    if (!worker) return out('worker-died', { worker: null, verdict: null })

    if (worker.stopped) {
      log(rung.id + ' stopped and is reporting: ' + (worker.stopReason || '(no reason given)') + '; the judge decides whether it is a fork')
      judgeOnStop = await callAgent(PREFIX + judgeRole('stop', rung, worker, null, null), Object.assign({
        label: 'judge:' + rung.id + ':stop',
        phase: 'Judge',
        schema: JUDGE_SCHEMA,
      }, judgeTier(null)), recoverJudgeRung(rung, 'stop'))
      if (!judgeOnStop || judgeOnStop.decision !== 'repair') {
        return out('stopped', { worker, verdict: null, judge: judgeOnStop })
      }
      const resumed = await callAgent(PREFIX + rungRole(rung) + rung.tail + repairPrompt(rung, null, judgeOnStop), {
        label: 'resume:' + rung.id,
        phase: 'Rung',
        schema: RUNG_SCHEMA,
        model: OPUS,
      }, recoverRungRepair(rung, false))
      if (!resumed || resumed.stopped || !resumed.landed) {
        return out('stopped', { worker: resumed || worker, verdict: null, judge: judgeOnStop })
      }
      worker = resumed
    }

    const verdict = await callAgent(PREFIX + skepticRole(rung, worker, 1), {
      label: 'skeptic:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
      model: OPUS,
    }, recoverSkeptic(rung, 1))

    if (verdict && verdict.approved) {
      return out('approved', { worker, verdict, repaired: false, judge: judgeOnStop })
    }

    log(rung.id + ' refused by its skeptic: ' + ((verdict && verdict.refusalReason) || 'no reason returned') + '; the judge rules before the one repair round')

    const decision = await callAgent(PREFIX + judgeRole('refusal', rung, worker, verdict, null), Object.assign({
      label: 'judge:' + rung.id,
      phase: 'Judge',
      schema: JUDGE_SCHEMA,
    }, judgeTier(judgeOnStop)), recoverJudgeRung(rung, 'refusal'))
    if (!decision || decision.decision === 'drop') {
      return out('dropped', { worker, verdict, firstVerdict: verdict, judge: decision, repaired: false })
    }
    if (decision.decision === 'stop') {
      return out('stopped', { worker, verdict, firstVerdict: verdict, judge: decision, repaired: false })
    }

    const repaired = await callAgent(PREFIX + rungRole(rung, true) + rung.tail + repairPrompt(rung, verdict, decision), {
      label: 'repair:' + rung.id,
      phase: 'Rung',
      schema: RUNG_SCHEMA,
      model: OPUS,
    }, recoverRungRepair(rung, true))

    const verdict2 = await callAgent(PREFIX + skepticRole(rung, repaired || worker, 2), {
      label: 'skeptic2:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
      model: OPUS,
    }, recoverSkeptic(rung, 2))

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

// The items for Pavol: the rungs' now, the merged tree's as its stages return.
// Every return carries each item with the PLAN.md entry that holds it, or none.
const rungItems = [].concat.apply([], rungs.map(pavolItemsOf))
const routers = []           // every stage result that may carry pavolItems
const mergedItems = []       // the reviews' and the merged-tree judges' items
function pavolStatus() {
  const routed = routedIds(routers)
  return rungItems.concat(mergedItems).map(i => Object.assign({}, i, { inPlan: routed.has(i.id) }))
}
const finish = (extra) => Object.assign(report, { forPavol: pavolStatus() }, extra)

if (approved.length === 0) {
  log('No rung approved; nothing to gather. ' + rungs.map(r => r.rung + ': ' + r.state).join(', '))
  return finish({ landed: false, reason: 'no rung approved' })
}
log('Approved: ' + approved.map(r => r.rung + ' (' + r.state + ')').join(', ')
    + (notLanded.length ? '. Not landed, findings folded anyway: ' + notLanded.map(r => r.rung + ' (' + r.state + ')').join(', ') : '')
    + '. Gathering onto main.')

// Gather: one composed local commit per approved rung, plus the not-landed findings.
const gather = await callAgent(PREFIX + gatherRole(approved, notLanded, rungItems), { label: 'gather', phase: 'Gather', schema: GATHER_SCHEMA, model: OPUS }, recoverGather())
report.gather = gather
routers.push(gather)
if (!gather || gather.unresolved) {
  log('Gather stopped: ' + ((gather && gather.summary) || 'agent died'))
  return finish({ landed: false, reason: 'gather unresolved' })
}
// The gather's own points for Pavol, a text mismatch the decisions do not settle
// among them (gatherRole, "A text mismatch is not blocking"); the reviews check
// their PLAN.md entries with the rungs'.
const gatherItems = numbered('gather', gather.forPavol)
mergedItems.push(...gatherItems)
const reviewItems = rungItems.concat(gatherItems)

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
const gateRun = callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
let review = await callAgent(PREFIX + reviewRole(gather, 'review', reviewItems), { label: 'review', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS }, recoverReview())
report.review = review
routers.push(review)
mergedItems.push(...numbered('review', review && review.forPavol))
const reviewBlocks = !!(review && !review.approved && review.blocking && review.blocking.length)
let reviewDecision = null
if (reviewBlocks) {
  log('Review found blocking: ' + review.blocking.length + ' item(s); the judge rules while the gate runs on')
  reviewDecision = await callAgent(PREFIX + judgeRole('review', null, null, null, review), Object.assign({ label: 'judge:review', phase: 'Judge', schema: REVIEW_JUDGE_SCHEMA }, judgeTier(null)), recoverJudgeMain('review'))
  report.reviewJudge = reviewDecision
  mergedItems.push(...numbered('judge-review', reviewDecision && reviewDecision.forPavol))
}
let gate = await gateRun
report.gate = gate

// A blocking review means a judge, and on a repair ruling a repair on the merged
// tree; the gate that ran beside it is discarded when the repair changed code under
// it; after a repair of tests and records only its tables stand (repairRerun). On a
// land ruling nothing runs after the judge but what a green gate always leads to.
let gateIsStale = !!(review && review.pathsOutsideExplorations && review.pathsOutsideExplorations.length)
const beside = []   // the repairs whose runs stand beside the gate's summary instead of a second gate
let secondReview = false   // a repair on the merged tree ran after a blocking review: the second review runs beside the commit
if (gateIsStale) {
  log('The review\'s corrections touched ' + review.pathsOutsideExplorations.length + ' path(s) outside explorations/ ('
      + review.pathsOutsideExplorations.join(', ') + '); the gate that ran beside it is stale and runs again')
}

if (reviewBlocks) {
  const decision = reviewDecision
  if (decision && decision.decision === 'land') {
    // Pavol, 2026-09-29 (POSITIONS.md, rerunning the gate: the same weighing of cost
    // against what a rule protects applies to the other rules): a ruling settled by
    // tests and records only does not hold the batch. No repair and no second review
    // run; the batch lands on its gate, and the ruling's steps go to the next batch,
    // listed for him, as a second review's remaining findings do (LAND_RULE).
    log('The review\'s judge ruled land: its ' + strings(decision.instructions).length + ' step(s) of tests and records go to the next batch with the review\'s findings, listed for Pavol (' + BATCH_DIR + '/JUDGE-review.md); no repair and no second review run, and the batch lands on its gate')
    report.reviewRouted = { findings: strings(review.blocking), instructions: strings(decision.instructions), ruling: BATCH_DIR + '/JUDGE-review.md' }
    mergedItems.push(...numbered('judge-review-land', decision.instructions))
  } else if (!decision || decision.decision !== 'repair') {
    return finish({ landed: false, reason: 'review blocking, judge did not order a repair' })
  } else {
    report.repairReview = await callAgent(PREFIX + mergedRepairRole(decision, 'review'), { label: 'repair:review', phase: 'Review', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('review'))
    routers.push(report.repairReview)
    secondReview = true
    // Pavol, 2026-09-29 (POSITIONS.md, rerunning the gate after a repair that only
    // added tests): the gate runs again only when the repair, or the review's
    // corrections, changed a path outside explorations/ that is not a test file, or
    // a test path no passing run of the repair's exercised (repairRerun); otherwise
    // the repair's own runs verify its tests and the first gate's tables stand. The
    // second review no longer decides it: it runs beside the commit and changes
    // nothing outside explorations/ (reviewRole, besideCommit).
    const after = repairRerun(report.repairReview, strings(review && review.pathsOutsideExplorations), null)
    report.repairReviewRerun = after
    if (after.rerun) {
      log('After the review\'s repair the gate runs again: ' + after.why)
      gateIsStale = true
    } else {
      log('The review\'s repair changed ' + after.why + ' (' + after.runs.length + ' test file(s) run in the harness by the repair); by Pavol\'s rule of 2026-09-29 the gate does not run again and its tables stand')
      beside.push({ kind: 'review', runs: after.runs, answered: [] })
      gateIsStale = false
    }
  }
}

if (gateIsStale || !gate) {
  gate = await callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate:after-review', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
  report.gateAfterReview = gate
  beside.length = 0   // this gate ran on the repaired tree, the repair's tests among its counts
}

if (!gate || gate.stopped) {
  return finish({ landed: false, reason: 'gate could not run' })
}
if (!gate.green) {
  log('Gate red: ' + gate.failing.length + ' failing; the judge diagnoses on the merged tree')
  const decision = await callAgent(PREFIX + judgeRole('gate', null, null, null, gate), Object.assign({ label: 'judge:gate', phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(report.reviewJudge)), recoverJudgeMain('gate'))
  report.gateJudge = decision
  mergedItems.push(...numbered('judge-gate', decision && decision.forPavol))
  if (!decision || decision.decision !== 'repair') {
    return finish({ landed: false, reason: 'gate red, judge did not order a repair' })
  }
  report.repairGate = await callAgent(PREFIX + mergedRepairRole(decision, 'gate', gate.failing), { label: 'repair:gate', phase: 'Gate', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('gate'))
  routers.push(report.repairGate)
  // The same rule after the gate's repair: when it changed test files and records
  // only and its passing runs answer every line the gate was red on, the gate is
  // not run again. A red gate after its repair still stops the batch.
  const after = repairRerun(report.repairGate, [], gate)
  report.repairGateRerun = after
  if (after.rerun) {
    log('After the gate\'s repair the gate runs again: ' + after.why)
    gate = await callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate2', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
    report.gate2 = gate
    beside.length = 0
    if (!gate || !gate.green) {
      log('Gate red after one repair: the batch stops here, nothing pushed; the failing tests and the diagnosis are the record')
      return finish({ landed: false, reason: 'gate red twice' })
    }
  } else {
    log('The gate\'s repair changed ' + after.why + ' and its runs answer the ' + strings(gate.failing).length + ' line(s) the gate was red on; by Pavol\'s rule of 2026-09-29 the gate does not run again and its tables stand beside the runs')
    beside.push({ kind: 'gate', runs: after.runs, answered: after.answered })
  }
}

// Commit: hashes into the notes, the gate summary added, push, fast-forward the
// container branch, clean up; or, while a landed rung carries a stop that was met
// and not lifted, the same without the push and the clean-up (pushHeldBy).
// The items for Pavol that no stage put into PLAN.md, for the coordinator: the
// commit stage does not wait on them, and the result carries each with inPlan.
const notInPlan = pavolStatus().filter(i => !i.inPlan)
if (notInPlan.length) log('Items for Pavol not in PLAN.md, for the coordinator: ' + notInPlan.map(i => i.id).join(', ')
    + ((gather && Array.isArray(gather.pavolUnrouted) && gather.pavolUnrouted.length) ? '; the gather says why: ' + gather.pavolUnrouted.map(u => u && (u.id + ': ' + u.why)).join('; ') : ''))

if (!secondReview) {
  const heldBy = pushHeldBy(approved, review)
  if (heldBy.length) log('Push held: ' + heldBy.length + ' stop(s) met and not lifted: ' + heldBy.join('; '))
  const commit = await callAgent(PREFIX + commitRole(gather, gate, heldBy, beside), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(heldBy.length > 0))
  report.commit = commit
  return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy, besideGate: beside })
}

// The second review, after a repair on the merged tree, runs BESIDE the commit
// (Pavol, POSITIONS.md 2026-09-29: it no longer holds a batch whose gate is green,
// and the same weighing of cost against what a rule protects applies to the other
// rules). In batch N it sat alone on the critical path for 17 minutes. The commit's
// local work (the hashes, the gate's tables, step 1a, the footer check) does not
// wait on it; the push does, because the push is held on a stop that is met and not
// lifted, and a stop the repair met is one only this review checks before the push
// (its check 10). So: the local commit and the review together, then a push step
// that reads the review's stops. After rather than beside would save nothing before
// the script returns, which is when the coordinator's landing steps begin. The
// review edits nothing until the commit's commit is in, and nothing outside
// explorations/: the gate does not run again on it.
log('The second review runs beside the commit; the push waits for its stops')
const commitLocal = callAgent(PREFIX + commitRole(gather, gate, [], beside, 'local'), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(false, 'local'))
const review2 = await callAgent(PREFIX + reviewRole(gather, 'review2', reviewItems, true), { label: 'review2', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS }, recoverReview(true))
report.review2 = review2
routers.push(review2)
mergedItems.push(...numbered('review2', review2 && review2.forPavol))
// Pavol, 2026-09-29 (POSITIONS.md, a review that still blocks after its repair): it
// does not hold a batch whose gate is green. The batch lands, and the review's
// remaining findings go to the next batch and are listed for him.
if (review2 && !review2.approved) {
  log('The second review still blocks (' + strings(review2.blocking).length + ' finding(s)); by Pavol\'s rule of 2026-09-29 the batch lands on its green gate and they go to the next batch')
  report.reviewStillBlocking = strings(review2.blocking)
  mergedItems.push(...numbered('review2-blocking', review2.blocking))
}
const local = await commitLocal
report.commitLocal = local
if (!local) {
  return finish({ landed: false, reason: 'the commit stage returned nothing', besideGate: beside })
}
const heldBy = pushHeldBy(approved, review2 || review)
if (!review2) heldBy.push('review2: the second review returned nothing, so no review has checked the repair on the merged tree for a stop')
const late = strings(review2 && review2.pathsOutsideExplorations).map(repoPath).filter(p => !p.startsWith('explorations/'))
if (late.length) heldBy.push('review2: its corrections changed ' + late.join(', ') + ' after the gate, which has not run on them')
if (heldBy.length) log('Push held: ' + heldBy.length + ' stop(s) met and not lifted: ' + heldBy.join('; '))
const commit = await callAgent(PREFIX + commitRole(gather, gate, heldBy, beside, 'push'), { label: 'commit:push', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(heldBy.length > 0, 'push'))
report.commit = commit
return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy, besideGate: beside })
