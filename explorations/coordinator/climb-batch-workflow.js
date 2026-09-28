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
    { title: 'Review', detail: 'the merged diff against the batch rules and the folded record as a whole; runs beside the gate' },
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
// (FACTS.md, "The Workflow harness runs two agents at once on this box"), a
// freed slot going to the next queued agent, FIFO. k is 2 in this batch (J, U).
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order
// only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction, never red) and
// expectedCheckerCrash (compared exactly with the table's #crash field; no
// rung of this batch declares one, so any change of the crash row is red).
// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; U
// names J, and the script applies it after the scatter, so U reaches the
// gather only when J is approved. briefing: the rung's mission briefing, which
// the planner writes from the record so that the agents learn in context what
// they were never trained on: the keys of
// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries
// (positions:DATE WORDS), gap-ledger rows (ledger:ROW) and earlier rulings
// (doc:PATH#HEADING) the rung rests on; the notes already written on the
// subject, found through INDEX.md (doc:); the specification's sections its
// subject touches (doc: on a .tex heading, code: on a passage); the library and
// checker code that is the precedent for the same kind of problem
// (code:PATH#FROM..TO); and the FACTS.md entries and map rows of its area; in
// reading order, decisions first. The rung worker reads it whole as its step
// 1. And checks, the sub-list of briefing that the skeptic, the repair round
// and the judges read as their step 1: the decisions and ledger rows their
// checks need, and the specification's sections and the precedent code those
// checks compare against. No key holds a double quote, backtick, dollar sign or
// backslash, since each is rendered in double quotes. Each list is checked
// with the tool's --check to match exactly one place per key (on main at the
// drafting; re-checked at the launch).
//
// Batch 7R's values are CLIMB-BATCH-7R.md, sections 3, 6 and 7. Each tail is
// that rung's section of section 3 word for word, with the record's code-span
// backticks dropped (this file carries none); ASCII only. No section carries
// an answer letter: section 1 asks no question. One value is set at launch and
// nowhere else: LEDGER_FROM, one above the highest row of the gap ledger at the
// launch; it holds the drafting's value, 456, and is reset at the launch,
// since batch 7, which runs first, opens its rows from 456 too. Manifest order
// is the ledger numbering order: J, U. The scatter starts the longest expected
// first: J, U. No rung predicts the checker total: J's is reported, and U
// changes nothing the stage reads. No rung declares a ladder move. The base is
// <base>, passed at launch as args.base, not written here.
// ===========================================================================

const LEDGER_FROM = 476   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch (456 at the drafting, 15255fd2b; reset at the launch, since batch 7 opens rows from 456)
if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\'s launch')

const BATCH = '7r'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-7R.md'

const J_TAIL = [
"",
"## Your rung: J - ranges over ZZ32",
"",
"SLUG is rung-ranges-zz32. WORKTREE is /home/user/fortress-ranges, branch wip/rung-ranges-zz32.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7R.md, section 3, under \"J. Ranges over ZZ32\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** None of section 1's items asks a question. Rows 450 and 451 stay open (their tests are restated, not fixed), row 452 closes, and the Character crash is left for batch 8 or later (section 1, read from the record).",
"",
"**Its briefing.** The decisions the rung rests on (the ranges decision and batch N in the numerics entry, a size's range, answer 8, a numeral's type, route A, the library's practice, the library route, the launch of phase 3's batches, the stops, rung D's stop); ledger rows 450 to 453 and 358; measurement C's method and its sections on tree 2 and on other integer types, with its shadow z32.py and rangeOperators's capture; the two distance notes' sections on the crashes; the synthesis's decision 1 and the Fable plan's section 3.5; the specification's ranges section and its coercion chapter's section on invocations, which says type parameters have no coercions; the compiler library's ZZ32 ranges, the operator block in the api and the component, the public Range trait, the dummy helpers, ExtentScalarRange and UniformDistribution as the library has them; the checker's case site, Types.java's world switch and its two generator-type makers, areCompilerLibraries and the trait-table lookup that throws; the three restated revival tests, the refusal test's precedent, the test form and the team's test of the case path, Compiled280; the FACTS entries on ranges, inference, numerals, microGPT's checker errors, the distance, the crashes and the harness; the map's rows for the checker and the library. The keys are in section 7; checks is the decisions, the rows, measurement C's tree 2, the ranges section, the operator block, ExtentScalarRange and the checker site.",
"",
"**The problem.**",
"- The one library's scalar ranges are generic over an integer type. Every declaration of Library/RangeInternals.fsi and .fss (624 and 1,496 lines) that stands for a scalar range's integer takes a static parameter I extends Integral[\\I\\] or I extends AnyIntegral: 95 declarations and 173 parameters in each file. So do the 18 range operators of Library/FortressLibrary.fss, from \"The # and : operators serve as factories for parallel ranges\" (:3887) to opr :[\\I\\](r: Range[\\I\\], stride:I) (:4019), and of its api (Library/FortressLibrary.fsi:2196-2308) (counted by measurement C's shadow, explorations/reviews/numerics-plan-coordinator/measure-C.md section 2).",
"- The compiled checker cannot check that code, because the language cannot convert a numeral into a type known only as a type parameter: \"types named by type parameters *do not have coercions*\" (Specification/basic/conversions-coercions.tex:363-365; FACTS.md, \"Static arguments are inferred from the arguments alone, on both paths, and never through a coercion\"). On the library copy with batch 7's rung B in (measurement C's tree 1), the range code carries the integer family of errors (classes I1 to I6, 192), the range objects' missing abstract methods (D2, 20), the CAP family (36), openRangeHelper's (6) and IN's (14), among others (measure-C section 2).",
"- To force the result \"at least ZZ32\", the operators pass dummy 0 asif ZZ32 arguments, 36 of them in 18 calls, to helpers with a throwaway first parameter (Library/RangeInternals.fss:1420-1441: \"We pass in bogus ZZ32's to ensure that the result type is at least ZZ32\"; Library/FortressLibrary.fss:3888-3964). The checker refuses them (class I2, 18). And eleven declarations are bounded Integral[\\I\\] in the api and AnyIntegral or nothing in the component (row 358).",
"- Under walk the library builds ranges over ZZ64, NN32 and NN64 today: (widen(1):widen(3)).size is 3, while big(1):big(3) stops at partitionL (Library/RangeInternals.fss:1045), which only the fixed widths declare (measure-C section 3, explorations/reviews/numerics-plan-coordinator/probes-C/walk/WideRangesC.L0.txt). In the whole tree seven range constructions have an integer that is neither a ZZ32 nor a numeral: four in the three expected-failure tests of rows 450 to 452 (three ZZ64, one NN32, with a for over one of them), two specification examples and ZZ's factorial property in a comment line, the last three rung U's (measure-C section 3; FACTS.md, \"The cheap fixes and scalar ranges over ZZ32, measured on one library copy\"). None is in the library, the demos or microGPT.",
"- Behind the change waits a crash of the compiled checker. ExtentScalarRange (Library/RangeInternals.fss:377-456) has case ex of 1 => ... end, a case with no comparison operator. Once its clauses check, the checker asks whether the value is a GeneratorZZ32 (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:866-879, through ProjectFortress/src/com/sun/fortress/compiler/Types.java:129-131), a trait only the compiler's library declares (Library/CompilerLibrary.fsi:111), and the trait-table lookup throws \"Not in the trait table: FortressLibrary.GeneratorZZ32\" (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:723). On measurement C's tree 2 it hides the declaration's 37 errors. Any case without a comparison operator, in any program checked against the one library, crashes the same way (inferred from the code, explorations/perf-probes/prelude/switch-over-distance.md section 2.6). Today the site is not reached, because the clauses' own errors stop the checker first (explorations/perf-probes/prelude/switch-over-distance-flat.md section 2.6).",
"",
"**The decisions.** The ranges decision (explorations/coordinator/POSITIONS.md, 2026-09-27, the numerics plans, decision 1): RangeInternals and the range operators of FortressLibrary lose their integer type parameter; multi-dimensional ranges are tuples of ZZ32 ranges; the public range traits stay generic in their index type; the crash is fixed beside the change; the three expected-failure range tests of rows 450 to 452 and RangePrototype are restated; a range over another integer type becomes a static error. Batch N comes next (the same entry, decision 3), so the operators J writes are the ones a numeral of its own type will meet: a non-generic ZZ32 operator takes a numeral by the library's coercion, by reading, where a generic one refuses it (FACTS.md, \"MicroGPT's own programs through the compiled checker against the one library\"). A size is an NN32 value (2026-09-27, a size's range). The library's practice is the standard (2026-09-19). Not this rung's: the specification (rung U); rows 450 and 451's fixes; the Character crash (batch 8 or later, as batch 7's record places it); every family batch 7b's rung L repairs, openRangeHelper's device among them.",
"",
"**What the library and the tree already do.** Evidence, not the brief; the rung lists every way before it chooses.",
"- The compiler library's ranges are ZZ32 only: trait Range extends GeneratorZZ32 excludes { Number, String, Boolean, Character }, opr :(lo:ZZ32, hi:ZZ32): Range and opr #(lo:ZZ32, sz:ZZ32): Range (Library/CompilerLibrary.fsi:111-174). Its excludes clause is one device for an overload pair of a range and a number or a string. The one library's own Range[\\I\\] carries the same device for numbers, with the team's comment naming the check it serves: excludes Number (* Important or the strided factories can't overload! *) (Library/FortressLibrary.fss:3690-3691).",
"- The library's own comment says what its operators \"Actually want\": opr (x:I)#[\\I\\] : LeftRange[\\I\\] = LeftRange[\\I\\](x) and three more, with no dummy (Library/FortressLibrary.fss:3937-3942).",
"- Measurement C's shadow, explorations/reviews/numerics-plan-coordinator/probes-C/z32.py (its diff probes-C/tree2.patch), is a measurement, \"not a proposed edit\" (its header). It removed every such parameter and put ZZ32 in its place, shortened 892 written static argument lists (532 in RangeInternals.fss, 337 in its api, 16 in FortressLibrary.fss, 7 in Random), and split the three unbounded point operators opr (x:I):[\\I\\], opr (l:I)::[\\I\\] and opr ::[\\I\\](l:I,s:I) into the ZZ32, pair and triple shapes # and : already have. It kept generic the public range traits (Library/FortressLibrary.fss:3690-3886), openRange[\\I\\](), opr :[\\I\\](r: Range[\\I\\], stride:I), opr #[\\I\\](r: PartialRange[\\I\\], size:I), RangeInternals' checkSelection and tupleFlatten. It kept the dummy arguments (tree 1 had already respelled them as the operators' own first arguments). Its own slips, eight new errors: openRangeHelper on three arrow types becoming a Meet Rule pair (2); the extent helpers' bodies typed as a union against a declared ExtentRange (RangeInternals.fss:1449, :1457, :1466 in the copy's line map); a body typed Range[\\ZZ32\\] against a declared ScalarRangeWithLeft (:147); and the split two- and three-dimensional opr ::, where (l:):s finds no : (2).",
"- The crash's site was written as a stopgap: \"It should use a parameterized Generator type but it is not yet supported. Instead, we use GeneratorZZ32 for now\" (Sukyoung Ryu, 525264af1, 2009-10-02), with the parameterized form left commented out beside each use (Functionals.scala:873, :877). The checker already builds that form for a generator clause (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:104-106, Types.makeGeneratorType). Types.useFortressLibraries() re-points the names that differ between the two worlds (Types.java:83-88), and WellKnownNames.areCompilerLibraries() tells the worlds apart (ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:141-143). Types.CHARACTER is the same defect at five declarations, a static the switch never re-points (FACTS.md, \"Crashes reach zero in the shadow\"), and is left for batch 8 or later.",
"- Walk's refusal of a range over another width, after the change, is a run-time \"Failed to find any matching overload\" (measure-C section 3, WideRangesC.T2.txt), as every type error under walk is (FACTS.md, \"The static type checker (Scala, scala_src/typechecker/) runs only on the compile path\"). A test that a program is refused is a gated XXX file in the interpreter corpus, as ProjectFortress/tests/XXXImportImportCollision.fss is (FACTS.md, \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\").",
"- ProjectFortress/tests/RandomTest.fss:53, :69, :85 write UniformDistribution[\\ZZ32\\], so that object keeps its parameter; ProjectFortress/tests/StringTests.fss:276 pins a range's debug string, \"StridedFullParScalarRange(1,19,2)\", so the objects keep their names.",
"",
"**The test, first.** The manifest sets testIsStage.",
"- The checker-count stage's table, before the edit and after it.",
"- The distance stage (explorations/coordinator/tools/distance/run.sh, gate step 9), three times, each through run_bg (14 to 24 minutes), captured under probes/ as distance-preedit.txt, distance-library-only.txt and distance-postedit.txt: before the edit; after the library edit and before the checker fix, where its #crash rows name ExtentScalarRange with \"Not in the trait table: FortressLibrary.GeneratorZZ32\", the recorded failure of the fix; and after the fix, where that row is gone. The tables are compared with explorations/coordinator/tools/distance/compare.sh.",
"- In ProjectFortress/tests/, written before the edit:",
"  - a refusal test in the XXX form: a program that builds a range over ZZ64 and would print PASS after it. On the base the range runs, and the harness reports a missing expected failure, red; after the edit walk refuses it, green. Captured both ways, the failing run's message showing that it fails at the range;",
"  - a guard test, passing before and after, each value today's: ranges over ZZ32 of every form the operators build (#, :, ::; the left, right, extent and open forms; one, two and three dimensions; strided and seq), a range that starts with a numeral, IN, CAP, |r| and .size, asString and asDebugString, and a ZZ32 loop that widens its index into a ZZ64 sum, the shape the specification will name.",
"- The four restated files: RangePrototype.fss passing before and after; XXXRangeBoundsRungO.fss and XXXSeqRangeTopRungO.fss failing at the same ZZ32 line before and after; XXXRangeSizeZZ64RungO.fss restated to the ZZ32 shape a program writes instead and moved by git mv to a plain name, passing after.",
"- The compiled path: the compiler tests whose case has no comparison operator (the rung's grep; ProjectFortress/compiler_tests/Compiled280.fss, the team's test of that path, among them) keep their verdicts, before and after the fix.",
"",
"**What it writes.** The library in the decision's shape, choosing each device with the ways listed; the checker fix at the crash's site; the four restated files, each changed line listed with its before and after; the two new tests; its report and record.",
"",
"**The comparison.** As batch 6's rung F's (explorations/compile-ladder/rung-flat-tower/count-run.sh, compare-normalised.py): every file of ProjectFortress/tests/ except the new tests, in three passes, base A, the edit, base B, one JVM per test with private caches, normalised as batch 5 normalised, XXXInheritedOverload.fss listed as unstable (row 430); every changed output listed with its cause. The two microGPT checks from an empty cache, 40 of 40 with their printed values unchanged. The demos under ProjectFortress/demos/ that use a range, one pass before and one after, each run cut at 120 seconds as batch 6b's logging pass cut them, outputs compared. The machine line on every capture; each pass's caches deleted once its outputs are captured, and df read before each pass. Expected: the four restated files change as stated; rangeOperators.fss keeps its exit code, which on measurement C's copy it did not (the next paragraph); nothing else.",
"",
"**rangeOperators.** On measurement C's tree 2 the team's ProjectFortress/tests/rangeOperators.fss exits 1 where the base exits 0: walk's overload check pairs its opr #(x:String, y:String) (:20) with the kept opr #[\\I\\](r: PartialRange[\\I\\], size:I), \"with generic type, at least one pair of parameters must have excluding types\" (explorations/reviews/numerics-plan-coordinator/probes-C/walk/rangeOperators.T2.txt; ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:527, by reading). The same pair exists on the base, which passes; why the change reaches it was not traced. The check, by reading: walk calls a pair of overloads distinct when some pair of their parameters excludes (OverloadedFunction.java:434, excludesOther) or when every parameter of one side is an object type (:466), and otherwise refuses the pair as soon as a parameter type is a type variable (:452-454, :498). The rung traces it first and repairs it by the library's own means (the excludes clause on Range's header, which the one library writes for Number with the team's comment and the compiler library for Number, String, Boolean and Character, is one), keeping the test's lines and its exit code.",
"",
"**What it clears.** Measured by measurement C, tree 2 against tree 1, the distance driver and the triage's classes, on a copy (measure-C.md section 2; probes-C/compare-T2-walk.txt, transitions-T2-walk.txt, families-T2-walk.txt):",
"- Walk's setting 1,239 to 1,012: 245 sites gone, 18 new. The any setting, which the gate's distance stage runs, 1,253 to 1,021: 248 gone, 16 new.",
"- Of the 245: 204 sites with no error left; 4 at a site that keeps another error; 37 hidden behind the new crash (in tree 1, I3 34, I5 2, NM 1), not measured as cleared.",
"- By class: the integer family 192 to 18 (I3 160 to 8, and none of the 8 left a range numeral; I5 15 to 0; I6 8 to 0; I4 3 to 0); D2 20 to 2; CAP 36 to 0; openRangeHelper's 6 overloading errors gone as such, 2 cleared and 4 now Meet Rule errors, with 2 new Meet Rule errors beside them; the range families of the Meet Rule 55 to 61; IN 14 and the tuple shifts 8 unchanged; the range methods' declared-type errors 31 to 30.",
"- The 18 new: the shadow's 8 slips named above, and 10 in the families that vary from run to run.",
"- Under walk on the copy: FlatTowerRungF, RangeTest, subArray, StringTests, array3test and RandomTest exit 0 as on the base; rangeOperators exits 1 (above); RangePrototype exits 255, by construction, since it is written generic over I; the three XXX tests fail, XXXRangeSizeZZ64RungO earlier than before, at its construction.",
"- On batch 7's landed tree, by arithmetic and not measured: J also removes what row 358's bounds and the dummy arguments cost, 85 errors measured alone on the control (run BOUNDS+DEVICE, 1,738 to 1,653; explorations/perf-probes/prelude/distance-triage.md section 3), since it removes the parameters the first rebounds and the type mismatch the second makes. So about 310 fewer under either setting, before the crash fix. The fix brings the 37 back under the checker; 34 of them are numerals where I was expected, which ZZ32 takes by reading.",
"- Not measured by measurement C: the crash fix, in either world; batch 7's H and A beside the change (after H the FortressLibrary api reaches its overloading check, so the new ZZ32 operators' pairs show in the count stage); the count stage's table; the whole interpreter corpus beyond eleven tests; the demos; the microGPT checks; the compiled path; rangeOperators's cause; the time a range loop takes under walk (no body's algorithm changes, by reading).",
"",
"**Files it may touch.**",
"- Library/RangeInternals.fsi and .fss, whole.",
"- Library/FortressLibrary.fsi and .fss: the range operator block (.fss:3887-4019, .fsi:2196-2308 today), the three point operators in it, openRange only where its call of openRangeHelper needs it, and every written static argument of a RangeInternals name elsewhere in the file: the bounds getters and zeroIndices of ReadableArray1, Array2 and Array3 (.fss:2119, :2145, :2397, :2489, :2778-2779, :2860-2861 today); an excludes clause on a public range trait's header if rangeOperators's repair needs it, reported. Not the public range traits' type parameters.",
"- Library/Random.fsi and .fss: the written static arguments of FullScalarRange in randomR, randomManyR and UniformDistribution's parameter (.fsi:49, :51, :258; .fss:55, :58, :370 today), UniformDistribution keeping its own parameter.",
"- Any other library file that writes a static argument of a RangeInternals name, found by the rung's grep and named (measurement C found none beyond these).",
"- ProjectFortress/src/com/sun/fortress/compiler/Types.java and, if the fix needs them, the case site of ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala and the world switch that calls Types.useFortressLibraries().",
"- ProjectFortress/tests/RangePrototype.fss, XXXRangeBoundsRungO.fss and XXXSeqRangeTopRungO.fss (their ZZ64 lines), XXXRangeSizeZZ64RungO.fss (restated and renamed); the two new tests; its own directory.",
"- Not: Library/CompilerLibrary.*, Library/CompilerAlgebra.*, ProjectFortress/LibraryBuiltin/Compiler*, which take no new declaration before the switch-over (POSITIONS 2026-09-21, the library route); ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java, whose copy the count stage checks (explorations/coordinator/tools/checker-count/run.sh), and the files the distance stage patches as it runs (explorations/coordinator/tools/distance/shadow-patch.py, add-patch.py); interpreter/; Specification/ and SpecData/, which are U's; explorations/run-c4/ and explorations/apl/.",
"",
"**Java or Scala.** Java, possibly Scala at the one site. ant compileAll, default_repository/caches/global.map restored after it (FACTS.md, \"ant compileAll deletes a tracked file\"), and the library-order cache rebuild before any compiled test (explorations/repo-internals.md).",
"",
"**The checker count.** Reported, not predicted. The RangeInternals api's row moves; since batch 7's H the FortressLibrary api reaches its overloading and return-type checks, so the operator block's new pairs are on the stage; the stage's crash row does not move, since the crash is in RangeInternals' component, which the count stage does not check (it checks the apis and Library/FortressLibrary.fss). The rung declares the totals it measured in both stages, and the distance stage's crash rows before and after the fix.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict other than the four restated files'; RangeTest.fss, subArray.fss, StringTests.fss, array3test.fss, RandomTest.fss, rangeOperators.fss, FlatTowerRungF.fss; every compiled test's; the ladder's 85 files; the two microGPT checks at 40 of 40 with unchanged values.",
"",
"**Stops.**",
"- A changed walk output its comparison does not account for, rangeOperators's among them.",
"- A team test line changed other than RangePrototype's; in the three restated revival tests, a line beyond their ZZ64 and NN32 lines and row 452's restatement.",
"- A public range trait's type parameter removed.",
"- A declaration batch 7's rungs own edited (section 4): H's comparisons, Maybe family, Condition functions and the headers of AnyIntegral and Integral; A's fill and tabulate members and factories; B's fail, StandardMinMax and builtinPrimitive and List's comprehension.",
"- An edit to compiler/StaticChecker.java or to a file the count or distance stage shadows; a Java or Scala edit beyond the crash's site; the Character site; any edit under interpreter/.",
"- A compiled test's verdict changing; a ladder file moving down.",
"- A new checker error the distance stage shows as caused by the edit, not unmasked, that the report does not account for.",
"- A line of explorations/run-c4/src/ or explorations/apl/mg/ (shown to Pavol as a diff first, POSITIONS 2026-09-19).",
"- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The three distance tables re-run, the crash row before and after the fix, each new site classified as unmasked or caused against the table before the edit, the shadow's eight slips looked for; the count tables; every restated line against the base, value by value; the refusal test failing at the range, and red on the base; the guard test's values; walk against the compiled run for the ZZ32 shapes the compiler library has (#, :, seq, IN); the fix in both worlds, the compiler tests of a case without a comparison operator and a one-library probe of the same shape; rangeOperators's cause and repair; the microGPT checks.",
"",
"**What comes back to Pavol.** The restated test lines with their before and after; the fix's shape and the ways not taken; rangeOperators's cause and repair; the distance table's move by family; what became of the dummy arguments.",
"",
"**What it closes.** Row 452 (fixed: no range over ZZ64 or NN32 can be built; its test restated and promoted). Row 358 (fixed: the parameters it names are gone). Opens and closes: the GeneratorZZ32 crash. Its home is the distance stage's crash row and a probe: the distance stage is reported and never red (explorations/coordinator/climb-batch-workflow.md, \"The distance stage\"), and the count stage never reaches a component's case, since the type-check phase checks no component while an api has errors (ProjectFortress/src/com/sun/fortress/compiler/phases/TypeCheckPhase.java:45-46), so before the switch-over no gate goes red if the fix is lost; the rung therefore commits under probes/ a one-library probe of a case without a comparison operator, crashing before the fix and checking after it (home 3's form, the record saying that no program can yet be compiled against the one library), beside the crash row's move in its three distance tables and Compiled280's kept verdict for the compiler world. Notes: rows 450 and 451 (their ZZ64 faces gone with the ranges, their ZZ32 faces open, their tests restated); row 453 (the compiler library's ranges, untouched). Opens and leaves open, if no row holds it at the launch: the Character crash, home 3, its capture explorations/perf-probes/prelude/switch-over-distance.md section 2.6, for batch 8 or later.",
"",
].join('\n')

const U_TAIL = [
"",
"## Your rung: U - the ranges in the specification",
"",
"SLUG is rung-spec-ranges. WORKTREE is /home/user/fortress-specranges, branch wip/rung-spec-ranges.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7R.md, section 3, under \"U. The ranges in the specification\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** None of section 1's items asks a question. U lands only if J lands (its manifest entry's landsOnlyWith).",
"",
"**Its briefing.** The decisions (the ranges decision, answer 8, a size's range, the S1 form, the name of the unrevised copy, the lineage note, the requirement on the plan, the number chapters under S2, the stops, rung D's stop); ledger rows 450 to 453; measurement C's section on other integer types and the synthesis's decision 1; the ranges section whole, the integer chapter's callout and factorial entry, the reductions callout, and Appendix I's integer entry and \"Passages not yet revised\"; the two examples and the passages that input them; the later restart's ranges heading; the compiler library's ZZ32 ranges; the two earlier decision records' form sections; the FACTS entries on the specification's lineage, its number chapters and its silence on a range's width. The keys are in section 7; checks is the decisions, the ranges section, the callout, Appendix I's two subsections and the form.",
"",
"**The problem.** The specification's ranges section speaks of \"a set of integers\" and of \"expressions that produce integer values\" and names no integer type or width (Specification/basic/expressions/ranges.tex:37-44, :47, :64-65, :103-106), and its own text builds ranges over wider integer types (measure-C section 3, items 5 to 7):",
"- the example Generators.GeneratorDefn (SpecData/examples/advanced/Generators.GeneratorDefn.fss:18-39, typeset as the figure \"Sample Generator definition: blocked integer ranges\", Specification/advanced/parallelism-locality/defining-generators.tex:49-52): object BlockedRange(lo: ZZ64, hi: ZZ64, b: ZZ64) extends Generator[\\ZZ64\\], whose seq(self) is seq(lo:hi);",
"- the example Expr.Do.mySum (SpecData/examples/basic/Expr.Do.mySum.fss:18-26, typeset at Specification/basic/expressions/blocks.tex:72): for j <- 0:i do with i: ZZ64;",
"- ZZ's factorial property (Specification/basic-lib/basic-integers.tex:544-547): property FORALL (m) m! = PROD[k<-1:m] k, a range over ZZ.",
"And the revival's own text presumes ranges over any integer type: the callout of climb batch 6's rung T at Specification/basic-lib/basic-integers.tex:61-65, \"A generic call or a range over two different integer types is to infer the narrowest type that both coerce into ... until then such a call writes its static argument\", and Appendix I's \"Passages not yet revised\", which repeats it (Specification/appendices/changes.tex:1033-1036). After J, a range's bounds are ZZ32 values and a range over another integer type is an error; the text must say so, or the specification and the library disagree openly (POSITIONS 2026-09-24, the requirement on the plan).",
"",
"**The decisions.** The ranges decision (explorations/coordinator/POSITIONS.md, 2026-09-27, the numerics plans, decision 1): the specification's ranges section, its two ZZ64 examples, ZZ's factorial property and the revival's callout at basic-integers.tex:61-65 are revised in the S1 form; a range over another integer type becomes a static error; a wider counter is written as a ZZ32 loop that widens its index. Answer 8 (2026-09-26): its rule for a generic call over two integer types stays, to be written by batch N; its range half is moot. The form, S1 (2026-09-26): the normative text edited in place, a \\revision callout at each changed passage (Specification/fortress/fortress.tex:87), an Appendix I entry per change quoting the original as \"the Working Draft of February 2011\" with its path and line in Specification-1.0-frozen/ (2026-09-26, the first of the batch-5 answers), and the reasons in a decision record; the later Types chapter cited beside where it covers the topic (2026-09-26, the lineage note); the number chapters describe the library and are checked against it (2026-09-26, the number chapters under S2), which is why the gather checks U's text against J's landed library.",
"",
"**What the specification and the library already say.** Evidence, not the brief.",
"- The later restart's ranges section is a heading only (Documentation/Specification/Prose/Language/Expressions/ranges.tick:12), so it adds nothing to cite beside (FACTS.md, \"The specification never wrote static-argument inference, a numeral's type hierarchy or a range's integer width\").",
"- The compiler library declares its ranges over ZZ32 only (Library/CompilerLibrary.fsi:143, :173-174), and the specification's reductions callout already says that library's big operators \"range over ZZ32 only\" (Specification/basic/expressions/reductions.tex:27-44).",
"- A size is an NN32 and a JVM index a ZZ32 (POSITIONS 2026-09-27, a size's range); the preliminaries name the integer types (Specification/preliminaries/overview.tex:581-583); a generator over a range is \"Any range expression\" (Specification/basic/expressions/generators.tex:97).",
"- The demos already write a wider counter as a ZZ32 loop that widens its index: ProjectFortress/demos/fact64.fss:22-23, for i <- seq(0#20) do j:ZZ64 = widen(i).",
"- Earlier revisions of this kind are the models: batch 6's rung T for the integer chapter and its callout (explorations/compile-ladder/rung-spec-numbers/decision-record.md), and batch 5's rung S for examples kept and marked (explorations/compile-ladder/rung-spec-route-a/decision-record.md).",
"",
"**What it writes.** First, before any edit, the list: every passage of Specification/ outside library/apis/, and every example of SpecData/examples/ the specification inputs, that names a range's integer type or builds a range over an integer that is neither a ZZ32 nor a numeral, with what the decision makes of it, whether it is revised now or left, and the source that settles it; measurement C's search is the starting list (its section 3). Then:",
"- the ranges section: its normative text says that the bounds and stride of an explicit range are ZZ32 values, into which a numeral converts; that a range over another integer type is a static error; and how a wider counter is written; with a \\revision callout;",
"- the two examples, each respelled so that it runs under walk and teaches what it taught (a blocked range generator; a sum in a loop), the rung choosing each spelling and reporting the ways not taken; their typeset form is generated from SpecData/examples/ at build time, so the .fss files are what it edits, with any caption or prose around them that names the type;",
"- ZZ's factorial property, revised: the rung chooses between a range over ZZ32 with a conversion and a statement of the property without a range, and reports the choice;",
"- the callout at basic-integers.tex:61-65 and the paragraph of \"Passages not yet revised\" that repeats it stop naming ranges, keeping the rule for a generic call, which batch N writes;",
"- the Appendix I entries, as new subsections inserted immediately before \"Passages not yet revised\", after the entry batch 7's rung A adds there (re-read on the base), each quoting the original: the Working Draft of February 2011 by its path and line in Specification-1.0-frozen/ (basic/expressions/ranges.tex:37-44, basic-lib/basic-integers.tex:558; the examples through the lines that input them, advanced/parallelism-locality/defining-generators.tex:50 and basic/expressions/blocks.tex:72, with their source from git show <base>:SpecData/examples/..., unchanged since the import); the revival's own callout from git show <base>:Specification/basic-lib/basic-integers.tex, since it is not the Working Draft's;",
"- the decision record, explorations/compile-ladder/rung-spec-ranges/decision-record.md;",
"- every citation of a line of a chapter it edits (ranges.tex, basic-integers.tex, and the chapters that input the examples if their lines move) in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, re-anchored by the map of unchanged lines from git show <base>:<chapter> to its tree, never an assertion: XXXRangeEmptyHashRungO.fss, compiler_tests/XXXSeqMidpointRungO.fss and XXXSeqHashBoundsRungO.fss cite ranges.tex; seven files cite basic-integers.tex, every one of them lines below the callout at :51-65, so an edit to the callout that changes its line count moves them all, and four of them lines below the factorial entry at :537-547: ProjectFortress/tests/WrapOperatorsRungD.fss (:369-409), FixedWidthOverflowRungB.fss (:380, :608-609), IntSemanticsRungI.fss (:15-16, :513-518, :677-681), compiler_tests/IntLiteralWrapRepairR2.fss (:369-370), IntSemanticsRungB.fss (:380-681), XXXShiftDeclRungI.fss (:674-681) and library_tests/IntegralOpsRungN.fss (:428-531) (a grep at the review). J's four restated files are J's: the gather re-anchors their citations after both rungs are applied.",
"",
"**How it is checked.** No test can go red for a prose edit. The specification is built as rungs S and T built it (./ant genSource, then ./ant tex, in Specification/fortress/, with FORTRESS_HOME the worktree), on the base and after, the four logs captured; pdftotext of the two PDFs diffed, showing only the revised passages, the callouts, the appendix entries and page shifts; git diff --stat showing only the listed files; every re-anchored citation opened. Each respelled example is run under walk before and after on the base, where a ZZ32 range already runs, as ant testSpecData would run it (build.xml:1139; not in the gate); the gather runs them again on the merged tree, over J's library. The rung does not commit Specification/fortress.pdf; the gather rebuilds it once on the merged tree, since Part IV is rendered from Library/FortressLibrary.fsi, which J changes (Specification/library/default-libraries.tex:25-27).",
"",
"**Files it may touch.** Specification/basic/expressions/ranges.tex; Specification/basic-lib/basic-integers.tex, the callout at :51-65 and the factorial entry at :537-547 only; Specification/appendices/changes.tex, its new subsections at their place and the paragraph of \"Passages not yet revised\" that names ranges; SpecData/examples/advanced/Generators.GeneratorDefn.fss and SpecData/examples/basic/Expr.Do.mySum.fss; the prose around those two examples in Specification/advanced/parallelism-locality/defining-generators.tex and Specification/basic/expressions/blocks.tex, only where it names the type; what its list finds, each named; the messages and comments of the tests whose citations its edits move, J's four excepted; its own directory. Not: Specification-1.0-frozen/; Specification/fortress.pdf; any source, library or test assertion.",
"",
"**Java or Scala.** Neither.",
"",
"**The checker count.** Unchanged: the rung edits nothing the stage reads. Not captured.",
"",
"**Stops.** Any edit under Specification-1.0-frozen/. Normative text stating more than J's section builds. A passage whose new text neither the decision nor J's section settles: the rung reports it and does not choose. An example that does not run under walk on the base. An assertion changed in a re-anchored test. A file J edits. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** Every sentence of the new text against the decision and against J's section (J's library is not in U's tree; the gather checks the text against it once both are applied); every quoted original against git show <base>:<path> and against the frozen copy's line; the two builds and the pdftotext diff; the respelled examples run under walk; each re-anchored citation opened; the list against measurement C's section 3.",
"",
"**What comes back to Pavol.** The revised pages, as the pdftotext diff; the Appendix I entries; the list, with what was left and why; the spelling chosen for each example and for the factorial property.",
"",
"**What it closes.** No row by number. Notes appended where the rung moved a cited line: row 450 (XXXRangeEmptyHashRungO.fss's citations re-anchored) and row 453 (its two compiled tests'). The FACTS entry \"The specification never wrote static-argument inference, a numeral's type hierarchy or a range's integer width\" is corrected at the gather: the ranges section now names the width.",
"",
].join('\n')

const J_ENTRY = { id: 'J', slug: 'rung-ranges-zz32', path: '/home/user/fortress-ranges', branch: 'wip/rung-ranges-zz32', tail: J_TAIL, expectedMinutes: 240, writesState: false, testIsStage: true,
    blurb: "the one library's scalar ranges over ZZ32 only (RangeInternals and FortressLibrary's range operators lose their integer type parameter; the public range traits keep their index type), the compiled checker's GeneratorZZ32 crash fixed beside it, and the range tests of rows 450 to 452 and RangePrototype restated; library, tests and a few lines of Java.",
    briefing: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-27 size's range", "positions:2026-09-26 answer 8", "positions:2026-09-27 numeral's type",
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-19 answering the open question", "positions:2026-09-21 library route",
      "positions:2026-09-27 launch of phase 3's batches", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "ledger:450", "ledger:451", "ledger:452", "ledger:453", "ledger:358",
      "doc:explorations/reviews/numerics-plan-synthesis.md#Decision 1. Ranges over ZZ32 alone",
      "doc:explorations/reviews/numerics-plan-fable.md#3.5 What the distance is made of, and what is numeric",
      "doc:explorations/reviews/numerics-plan-coordinator/measure-C.md#Method",
      "doc:explorations/reviews/numerics-plan-coordinator/measure-C.md#2. Tree 2: scalar ranges over ZZ32 only",
      "doc:explorations/reviews/numerics-plan-coordinator/measure-C.md#3. What ranges over other integer types cost",
      "doc:explorations/reviews/numerics-plan-coordinator/probes-C/z32.py",
      "doc:explorations/reviews/numerics-plan-coordinator/probes-C/walk/rangeOperators.T2.txt",
      "doc:explorations/perf-probes/prelude/switch-over-distance.md#2.6 Crashes",
      "doc:explorations/perf-probes/prelude/switch-over-distance-flat.md#2.6 Crashes", "doc:Specification/basic/expressions/ranges.tex#Ranges",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Invocations",
      "code:Library/CompilerLibrary.fsi#trait GeneratorZZ32 excludes..opr #(lo:ZZ32, sz:ZZ32): Range",
      "code:Library/FortressLibrary.fsi#The %#% and %:% operators serve as factories..(r: Range",
      "code:Library/FortressLibrary.fss#(** The # and : operators serve as factories..r.imposeStride(stride)",
      "code:Library/FortressLibrary.fss#trait Range[..trait PartialRange[", "code:Library/RangeInternals.fss#object ExtentScalarRange[",
      "code:Library/RangeInternals.fss#Helpers for # to get the type instantiation..open3Range", "code:Library/Random.fss#object UniformDistribution[",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#case SCaseExpr(SExprInfo(span, paren, _), param, compare, equalsOp, inOp,",
      "code:ProjectFortress/src/com/sun/fortress/compiler/Types.java#public static void useCompilerLibraries()..public static void useTypeCheckerLibraries()",
      "code:ProjectFortress/src/com/sun/fortress/compiler/Types.java#public static TraitType makeGeneratorZZ32Type",
      "code:ProjectFortress/src/com/sun/fortress/compiler/Types.java#public static TraitType makeGeneratorType(Type typeArg)",
      "code:ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java#public static boolean areCompilerLibraries",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id)",
      "doc:ProjectFortress/tests/XXXRangeBoundsRungO.fss", "doc:ProjectFortress/tests/XXXSeqRangeTopRungO.fss",
      "doc:ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss", "doc:ProjectFortress/tests/XXXImportImportCollision.fss",
      "doc:ProjectFortress/tests/roundBug.fss", "doc:ProjectFortress/compiler_tests/Compiled280.fss",
      "The cheap fixes and scalar ranges over ZZ32, measured on one library copy", "The distance to the switch-over by root cause",
      "The true distance to the switch-over", "Static arguments are inferred from the arguments alone, on both paths",
      "A numeral's type depends on the path and on the library in scope", "MicroGPT's own programs through the compiled checker against the one library",
      "The specification never wrote static-argument inference", "Crashes reach zero in the shadow", "The one library's number tower is flat",
      "The static type checker (Scala, scala_src/typechecker/) runs only on the compile path",
      "An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "testSystem's four shards are one suite split by sorted index",
      "The interpreter's overload-ambiguity message names its two declarations", "ant compileAll deletes a tracked file",
      "The checker-count stage's table", "map:README.md#Touch this@scala_src/typechecker",
      "map:README.md#Touch this@Library/FortressLibrary.fss and the other"],
    checks: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:450",
      "ledger:451", "ledger:452", "ledger:358", "doc:explorations/reviews/numerics-plan-coordinator/measure-C.md#2. Tree 2: scalar ranges over ZZ32 only",
      "doc:Specification/basic/expressions/ranges.tex#Ranges",
      "code:Library/FortressLibrary.fss#(** The # and : operators serve as factories..r.imposeStride(stride)",
      "code:Library/RangeInternals.fss#object ExtentScalarRange[",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#case SCaseExpr(SExprInfo(span, paren, _), param, compare, equalsOp, inOp,",
      "code:ProjectFortress/src/com/sun/fortress/compiler/Types.java#public static TraitType makeGeneratorZZ32Type",
      "The cheap fixes and scalar ranges over ZZ32, measured on one library copy",
      "An XXX*.fss in the interpreter corpus IS a gated expected-failure test"],
    expectedMoves: [] }

const U_ENTRY = { id: 'U', slug: 'rung-spec-ranges', path: '/home/user/fortress-specranges', branch: 'wip/rung-spec-ranges', tail: U_TAIL, expectedMinutes: 110, writesState: false, testIsStage: false, landsOnlyWith: ["J"],
    blurb: "the specification's ranges section, its two ZZ64 examples, ZZ's factorial property and the revival's callout on mixed integer types revised to ranges over ZZ32, in the S1 form; lands only with J; no source and no test assertion.",
    briefing: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-26 answer 8", "positions:2026-09-27 size's range", "positions:2026-09-26 S1",
      "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 lineage note", "positions:2026-09-24 requirement on the plan",
      "positions:2026-09-26 number chapters under S2", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "ledger:450", "ledger:451", "ledger:452", "ledger:453", "doc:explorations/reviews/numerics-plan-synthesis.md#Decision 1. Ranges over ZZ32 alone",
      "doc:explorations/reviews/numerics-plan-coordinator/measure-C.md#3. What ranges over other integer types cost",
      "doc:Specification/basic/expressions/ranges.tex#Ranges",
      "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
      "code:Specification/basic-lib/basic-integers.tex#The factorial operator is defined only for natural number types..m! = PROD",
      "code:Specification/basic/expressions/reductions.tex#The desugaring of a reduction is directed by..The normative text is unchanged.",
      "doc:Specification/appendices/changes.tex#The integer trait", "doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes",
      "doc:Specification/appendices/changes.tex#Passages not yet revised", "doc:SpecData/examples/advanced/Generators.GeneratorDefn.fss",
      "doc:SpecData/examples/basic/Expr.Do.mySum.fss",
      "code:Specification/advanced/parallelism-locality/defining-generators.tex#Any reduction must define two methods..figlabel{generatorDefn}Sample",
      "doc:Documentation/Specification/Prose/Language/Expressions/ranges.tick",
      "code:Library/CompilerLibrary.fsi#opr :(lo:ZZ32, hi:ZZ32): Range..opr #(lo:ZZ32, sz:ZZ32): Range",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
      "doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#5. Decisions taken inside the rung",
      "The specification never wrote static-argument inference", "The specification's number chapters describe the flat library",
      "Specification-1.0-frozen/ is byte for byte", "The team's latest word on types",
      "The specification states instantiation exclusion, and its refused examples",
      "Citing Specification/library/apis/*.tex as an independent standard is circular",
      "The cheap fixes and scalar ranges over ZZ32, measured on one library copy", "map:README.md#Touch this@Specification/ (the standard)"],
    checks: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
      "positions:2026-09-26 number chapters under S2", "positions:2026-09-27 stops a batch record reserves",
      "doc:Specification/basic/expressions/ranges.tex#Ranges",
      "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
      "doc:Specification/appendices/changes.tex#Passages not yet revised",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form", "The specification never wrote static-argument inference"],
    expectedMoves: [] }

const RUNGS = [J_ENTRY, U_ENTRY]
const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)

const INTRO_RUNG = {
  J: "J makes the one library's scalar ranges ZZ32 only: RangeInternals and the range operators of FortressLibrary lose their integer type parameter, multi-dimensional ranges are tuples of ZZ32 ranges, and the public range traits keep their index type; it fixes beside it the compiled checker's crash the change uncovers (ExtentScalarRange, \"Not in the trait table: FortressLibrary.GeneratorZZ32\"); and it restates the expected-failure range tests of rows 450 to 452 and the team's RangePrototype.",
  U: "U revises the specification to match, in the S1 form: the ranges section, its two ZZ64 examples, ZZ's factorial property and the revival's callout on mixed integer types (Specification/basic-lib/basic-integers.tex:61-65).",
}
const INTRO_STOPS = {
  J: "for J, a changed walk output its comparison does not account for, rangeOperators's among them; a team test line changed other than RangePrototype's; a line of the three restated revival tests beyond their ZZ64 and NN32 lines and row 452's restatement; a public range trait's type parameter removed; an edit to compiler/StaticChecker.java or to a file the count or distance stage shadows, a Java or Scala edit beyond the crash's site, the Character site, or any edit under interpreter/; a compiled test's verdict changing or a ladder file moving down; a new checker error the distance stage shows as caused and the report does not account for; and a line of explorations/run-c4/src/ or explorations/apl/mg/",
  U: "for U, any edit under Specification-1.0-frozen/, normative text stating more than J's section builds, a passage whose new text neither the decision nor J's section settles (reported, not chosen), an example that does not run under walk on the base, and an assertion changed in a re-anchored test",
}
const INTRO_LIFTED = {
  J: "J removes the integer type parameter of RangeInternals' declarations and of FortressLibrary's range operators, so that a range over another integer type is refused, and restates the team's RangePrototype and the ZZ64 and NN32 lines of the expected-failure tests of rows 450 to 452 (the ranges decision, POSITIONS.md 2026-09-27, the numerics plans); that row 452's test, restated, becomes a plain test is the record's reading of that decision, listed for his review (the record's section 1)",
  U: "U revises the specification's ranges section, its two ZZ64 examples, ZZ's factorial property and the revival's callout (the same decision)",
}
const OVERLAP_RUNG = {
  J: "J edits Library/RangeInternals.fsi and .fss; in Library/FortressLibrary.fsi and .fss the range operator block with its three point operators, openRange where needed, the written static arguments of RangeInternals names in the bounds getters and zeroIndices of ReadableArray1, Array2 and Array3, and possibly an excludes clause on a public range trait's header; in Library/Random.fsi and .fss randomR, randomManyR and UniformDistribution's parameter; compiler/Types.java and possibly the case site of scala_src/typechecker/impls/Functionals.scala; and restates four files and adds two in ProjectFortress/tests/.",
  U: "U edits Specification/basic/expressions/ranges.tex, the callout and the factorial entry of Specification/basic-lib/basic-integers.tex, its entries and one paragraph of Specification/appendices/changes.tex, the two examples under SpecData/examples/ and the prose around them, and the messages and comments of the tests whose citations its edits move, J's four excepted; never Specification-1.0-frozen/ or Specification/fortress.pdf.",
}

const BATCH_INTRO = [
  "This batch is climb batch 7R, the ranges batch, as Pavol decided it on 2026-09-27 (POSITIONS.md, the numerics plans, the synthesis's decision 1, \"Option 1, ZZ32\"): the one library's scalar ranges are over ZZ32 only, as the compiler library declares them. It runs after climb batch 7 (rungs H, A and B) has landed, and before batch N, the inference rule with the numeral switch (the same entry, decision 3).",
  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),
  "Each rung's section of the record opens with the answers of its section 1 that it follows; section 1 asks no question.",
  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file the other rung owns, or a declaration batch 7\'s rungs own (the record\'s section 4).',
  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1); it leaves the files the other rung edits, and the gather re-anchors those the same way after both rungs are applied.",
  "The gather's rules: U lands only if J lands, whatever the approved list says (U's landsOnlyWith); after both are applied, the gather checks every rule U's text states against J's landed library and runs U's two respelled examples under walk on the merged tree, as ant testSpecData runs them, fixes U's text where the decision settles a mismatch, and reports any other to the review as blocking.",
  "No rung commits Specification/fortress.pdf: after both rungs are applied, the gather rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf), since Part IV is rendered from Library/FortressLibrary.fsi, which J changes, and U edits the specification, and removes the build's ignored products.",
  "Two worktrees share one disk: J runs a three-pass comparison over ProjectFortress/tests/ and three distance runs, deletes each pass's caches and each distance run's scratch directory once its outputs are captured, and reads df before each.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5 to 6.5.",
  "Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).",
].filter(Boolean).join(' ')
const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + "No file is shared. U's text describes J's library and lands only with it; the gather re-anchors the citations of ranges.tex lines in J's test files after both are applied. Batch 7 (H, A and B) has landed in the base: J edits none of its declarations (H's comparisons, Maybe family, Condition functions and the headers of AnyIntegral and Integral; A's fill and tabulate members and factories; B's fail, StandardMinMax, builtinPrimitive and List's comprehension); J edits members of Array2 and Array3 (bounds, zeroIndices) beside A's fill members, and declarations of Random.fss beside A's calls in MersenneTwister; U inserts its Appendix I entries after A's, before Passages not yet revised. The checker count reads J's changes, the FortressLibrary api's overloading rows among them, which the stage sees since batch 7's H; U changes nothing it reads. The files both rungs reach are the three record files, folded centrally by the gather."
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
'2. **Deferred, and the specification settles it** - the rung does not repair it, but the specification says what the answer is: it gets a gated EXPECTED-FAILURE test, whose file name starts with XXX. The harness makes this a real check, not a wish. FileTests.java:932 sets shouldFail = s.startsWith("XXX") from the file name; :587 and :654 make (shouldFail != failed) the failure condition, so an XXX test that STARTS PASSING turns the suite red, and :851 says the suite prints "XXX tests that succeed". So write XXX<Name>.fss asserting what the SPECIFICATION says, with a .test file beside it; it fails today, which is expected, and the day anyone repairs the defect without closing the ledger row the gate says so. 224 XXX*.test files in compiler_tests/ already use this. One caveat, from the harness\'s own author at FileTests.java:853 -"WARNING: expect_failure is not treated consistently" - so the first XXX file a rung adds is shown to go red on a deliberate local fix, and the report says it was shown.',
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
].join('\n')

// ---------------------------------------------------------------------------
// The rung worker's role block. The tails are in the manifest.
// ---------------------------------------------------------------------------

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
  + '. A mismatch between the table and the report is a finding for repair, not a stop: put it in requiredCorrections with both numbers, so that the report is corrected, and do not refuse the rung over it alone. If no table path is named and the rung declares a count, in its report or as expectedCheckerCount, report "no count table" in findings. A rung that declares no count and names no table has nothing to compare; one line saying so is enough.',
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
    review: 'The merged-diff review found something blocking in the source hunks after the gather. Diagnose it holistically on the merged tree and decide the repair; do not bisect rungs. The gate is still running beside you in this tree: do not read ' + GATE_OUT + '/ or wait for it; rule on the review and the merged diff alone.',
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
// verbatim where the branch lacks the file (the harness refused every rung
// worker's write of REPORT.md in batch 5). A second skeptic round's text comes
// first, the first round's after it.
const rungTexts = (r) => ({
  reportText: (r.worker && r.worker.reportText) || '',
  recordText: (r.worker && r.worker.recordText) || '',
  skepticText: (r.verdict && r.verdict.skepticText) || '',
  firstSkepticText: (r.firstVerdict && r.firstVerdict !== r.verdict && r.firstVerdict.skepticText) || '',
})

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
'   Then the rung\'s three files. Each rung below carries the text its agents returned for them: reportText for REPORT.md and recordText for record.md from its worker, skepticText for SKEPTIC.md from its skeptic, and firstSkepticText from a first skeptic round where there were two. For each of the three files under explorations/compile-ladder/<slug>/ that the branch does not carry, write the field\'s text to it verbatim, byte for byte - SKEPTIC.md as skepticText and, where firstSkepticText is not empty, a line "## First round" and firstSkepticText after it - and compose nothing: the rung\'s own words, not a summary of them. From there on the file is treated as one the rung wrote. A file the branch carries stands as it is. Name in the batch record every file written this way, and report a missing file whose field is empty rather than composing it. In batch 5 the harness refused every rung worker\'s write of REPORT.md and the gather composed each from a 15-line summary.',
'2. Fold its record: explorations/compile-ladder/<slug>/record.md (now in the tree) carries finished prose for three places. The FACTS.md line goes into explorations/coordinator/FACTS.md under the section of its area (the file is grouped by area, its README gives the rule: "Landed semantics" for a rule of the language or the library as it now stands, "The harness and the gate" for test mechanics, "The checker and the one library" for the checker), after that section\'s last entry, as one bullet with its source. The ledger note is APPENDED to the notes of the row it names in explorations/fortress-gap-ledger.md - rows are never renumbered, moved or deleted; where the note needs the landed commit\'s hash write the literal placeholder <short hash>, which the commit stage replaces. The handover state line goes into the first section of explorations/microgpt-run-c-handover.md ("Where the work stands"). If record.md opens a new row, the number is provisional (from ' + LEDGER_FROM + '): assign the final numbers in MANIFEST order (' + RUNGS.map(r => r.id).join(', ') + ') as you fold, append each row to the ledger\'s last table, and correct every citation of the provisional number in that rung\'s record.md, REPORT.md and probes in the same commit. Any file:line a record cites that a previously applied rung has shifted is re-anchored by SYMBOL - find the declaration or the assert by name in the current file and cite the line it is at now, rather than trusting the number the record was written with.',
'3. Close every requiredCorrections item of that rung\'s skeptic verdicts, listed below; each is a checklist item and the last climb left two of them unmade.',
'4. Open or refuse every recommendedRows item of that rung\'s skeptic, in one sentence each, recorded in the batch record. Opening it means a real ledger row with the probe it cites; refusing it means one sentence saying why the tree does not owe it. The last batch lost a codegen defect a skeptic had narrowed precisely, because nothing carried a recommendation that was not a required correction.',
'5. Its items for Pavol, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, REPORT.md, SKEPTIC.md or JUDGE.md, at the line it is now at.',
'6. One commit: the applied source, the tests, the rung\'s files under explorations/compile-ladder/<slug>/ (REPORT.md, record.md, SKEPTIC.md, JUDGE.md if any, and each probe and capture named one by one), the three record files, and PLAN.md when step 5 wrote to it. Stage those files by an explicit list, never by git add of the directory, and read git diff --cached --stat before you commit: 85 MB of a worker\'s experimental caches reached main that way on 2026-09-19 and the protocol\'s hard rule on worker commits now forbids it. Title line: what the repair does, in the plain register; body: the two or three sentences of record.md that say why. If git diff --name-only for this commit shows ANY path outside explorations/, the body also carries a line beginning "historical:" naming the files of the original 2012 tree the commit edits, taken from the rung\'s provenance block - the protocol\'s hard rule on the gate requires those edits to be flagged at commit time. Footer as given. Do not push.',
'',
(notLanded.length
  ? '## The rungs that did not land\n\nThese rungs stopped, were dropped, or their worker died, or the script withheld them (state withheld) because their manifest entry names in landsOnlyWith a rung that was not approved; the reason says which. Their source changes are NOT applied and their branches stay as they are. But their skeptics\' findings are about the tree, not about the rung, and they have nowhere else to go: fold them into ' + BATCH_DIR + '/RECORD.md under a heading "Not landed", one section per rung, carrying the reason it did not land, the findings of its SKEPTIC.md if it has one, and every recommendedRows entry, each opened as a real ledger row or refused in one sentence exactly as step 4 requires. Its items for Pavol go into PLAN.md as step 5 says, in the commit that carries its "Not landed" section. Take that rung\'s REPORT.md, SKEPTIC.md, record.md and the probes its findings actually cite out of its branch by an explicit list of paths (git checkout <branch> -- <path> ..., one path at a time), never the whole directory, so the probes are tracked and nothing else comes with them; where the branch lacks one of the three files, write it from the rung\'s text fields below, verbatim, as step 1 says for a landed rung. Apply none of its source.\n\n' + JSON.stringify(notLanded.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state, reason: r.withheldReason || (r.judge && r.judge.summary) || (r.worker && r.worker.stopReason) || '', skepticFindings: (r.verdict && r.verdict.findings) || [], recommendedRows: (r.verdict && r.verdict.recommendedRows) || [] }, rungTexts(r))), null, 2) + '\n'
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
'The items for Pavol, by id (' + (items.length ? items.length + ' of them' : 'none') + '):',
'',
JSON.stringify(items, null, 2),
'',
'Return the structured result the tool requires: the commit hash per rung, the order you applied them in and why, the conflicts met and how each was resolved, the corrections closed, the recommended rows opened or refused, the tracked-path check\'s output, pavolItems, one entry for every id above with the PLAN.md section and entry that holds it, and pavolUnrouted, every id you could not put in with the reason, for the coordinator. Nothing waits on these: the batch goes on to its review, gate and commit either way.',
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
    pavolItems: PAVOL_ROUTED,
    pavolUnrouted: { type: 'array', description: 'every item for Pavol you could not put into PLAN.md, for the coordinator; empty if none', items: { type: 'object', properties: {
      id: { type: 'string' }, why: { type: 'string', description: 'why it could not go in' } }, required: ['id', 'why'] } },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'pavolItems', 'pavolUnrouted', 'summary'],
}

function reviewRole(gather, label, items) {
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
'9. Last, because it needs the gate\'s table: the checker count. Its total is reported and never red on its own (explorations/coordinator/checker-gate-review.md), so explaining it falls to you. The gate writes ' + GATE_OUT + '/checker-count.txt at its step 8, and the table\'s last line is its #shadow row; its step 9, the distance stage, is reported and never red, and is not yours to explain. Wait for that row in calls of at most eight minutes, for i in $(seq 96); do grep -q \'^#shadow\' ' + GATE_OUT + '/checker-count.txt 2>/dev/null && break; sleep 5; done, and after five calls without it write "no gate table" in checkerRows and leave this check. Diff the table against the last landed one, the first path that git log --name-only --pretty=format: -- explorations/compile-ladder/gate-baseline/checker-count.txt \'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt\' prints. Every row that is new or whose count rose (a row is an api, that is one .fsi file) must be explained as the consequence of a named rung edit, with its file:line: an early error a rung cleared, for example, lets the checker\'s later rules run on that api for the first time (StaticChecker.java:268-272). Where the rows alone do not say, the file:line of every error is in the gate\'s full output, ' + LOG_DIR + '/checker-count/run.txt; read it and write nothing there. One line per row goes in checkerRows. A new or risen row you cannot tie to a rung edit is blocking, for the judge and a repair. A total that misses a rung\'s declared one is not a finding by itself: the declarations are predictions.',
'10. The stops. Every stop the batch record\'s intro reserves for Pavol that a landed rung meets - in its hunks, or where its REPORT.md, SKEPTIC.md or record.md says it met one (a passage reported without choosing, an output a comparison does not account for, a line that waits for him) - goes in stopsMet with the rung\'s id, the evidence as file:line, and in liftedBy the POSITIONS.md line of the decision of his that lifts it, or nothing. The script holds the batch\'s push on any entry with no such line, and on the rungs\' own entries too; it is not a blocking finding, and you do not fix it.',
'11. The items for Pavol. For each id of the list below, the PLAN.md entry the gather\'s pavolItems names is in explorations/coordinator/PLAN.md, under one of the two sections, and says what the item says. An item the gather left out or placed wrong you put in yourself, in your corrections commit. Every point you yourself find that is Pavol\'s goes in forPavol, one entry each, with the ids ' + label + '.1, ' + label + '.2 in the order of forPavol. ' + PLAN_RULE + ' pavolItems lists every id you put in or moved, with its section and entry. It is not a blocking finding.',
'',
'The items for Pavol from the rungs, by id:',
'',
JSON.stringify(items, null, 2),
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
const ATOMIC_COMPILER = 'AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop'

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

function mergedRepairRole(decision, kind) {
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
  : '') + 'Its full ruling is in ' + BATCH_DIR + '/JUDGE-' + kind + '.md. Carry out the instructions in order. Where one turns out wrong against a primary source, do what the source says and record the deviation in ' + BATCH_DIR + '/REPAIR-' + kind + '.md with the file:line that settles it. Rebuild what the edit needs (ant compileAll for Java, then the library-order rebuild), run the tests the ruling names, and commit locally, one commit, with the record files updated where the ruling says and a historical: line in the body if the commit touches a file of the 2012 tree. Every defect this repair measures and fixes gets its assertion in a gated test, as the shared prefix requires. Do not run the full gate; the gate stage runs it after you. Do not push.',
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
'1. Replace every literal <short hash> placeholder in the ledger, FACTS and the handover with the hash of the commit it refers to, from the gather stage\'s result below. Copy the gate\'s outputs into the tree first: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/ - the gate wrote them under tmp/, untracked, so that a run that stops before this stage leaves nothing untracked in the tree, and it committed nothing because the review was committing in this tree at the same time. Then add ' + GATE_DIR + '/summary.txt, ' + GATE_DIR + '/checker-count.txt, ' + GATE_DIR + '/distance.txt and ' + GATE_DIR + '/ladder/ to the same commit. The checker-count and distance tables are the comparands the next batch\'s gate reads, so a batch that lands without them leaves the next gate comparing against older ones. Title it "Record the landed commits\' hashes and the gate summary". grep -rn "<short hash>" explorations/ afterwards must be empty, and the full gate logs under ' + LOG_DIR + '/ are NOT committed and never are.',
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

// The repair on the merged tree returns a worker's result and the items for
// Pavol it put into PLAN.md.
const MERGED_REPAIR_SCHEMA = Object.assign({}, RUNG_SCHEMA, { properties: Object.assign({}, RUNG_SCHEMA.properties, { pavolItems: PAVOL_ROUTED }) })

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
    'The three record files may already carry a rung\'s fold. Before you fold a rung, grep FACTS.md, the ledger and the handover for its lines and for each ledger row it opens, and fold only what is missing: never a line or a row twice. The same holds for the batch record\'s "Not landed" sections, for a rung\'s three files written from its text fields, and for PLAN.md\'s entries for the items for Pavol: grep PLAN.md for each item before you write it.',
    'Scratch patches the earlier attempt wrote may still be where it put them; regenerate them rather than trust them. Retry a git command that fails on index.lock, as the role says.',
  ]
}

// The merged-diff review, first or second: its one corrections commit and the
// head it records before it.
function recoverReview() {
  return [
    'You are in the main tree, ' + MAIN + ', with the gate running beside you or finished. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short. A commit titled "Fold the review\'s corrections" made after the last commit of the stage before you (the gather\'s last rung commit, or the repair\'s commit on a second review) is the earlier attempt\'s. Then headBefore is that commit\'s parent, not the HEAD you find, so that pathsOutsideExplorations covers both attempts\' corrections; headAfter is HEAD when you finish.',
    'Uncommitted edits under explorations/ are the earlier attempt\'s corrections in progress: read them, keep what is right, and commit them with your own, in one commit of the same title, or in one more such commit if the earlier attempt already made its own. Do not fix a finding twice.',
    'Never touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, and wait for the gate\'s table in check 9 exactly as the role says.',
  ]
}

// The repair on the merged tree, after a blocking review or a red gate.
function recoverMergedRepair(kind) {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean. Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --stat, ' + BATCH_DIR + '/JUDGE-' + kind + '.md, and ' + BATCH_DIR + '/REPAIR-' + kind + '.md if it exists. A commit after the one that carries JUDGE-' + kind + '.md is the earlier attempt\'s repair, uncommitted edits are its repair in progress, and the tree as you find it is your starting point.',
    'Take the judge\'s instructions one at a time and check each against the tree before acting: an edit already in place is not applied again, an assertion already in a test is not added twice, and a record line already written is not written again. Continue at the first step not done.',
    bgCheck(MAIN),
    'The role asks for one commit. If the earlier attempt made it already, what you finish goes in one further commit, and your result says so. Do not push.',
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
    'Steps 5 to 9 write into summary.txt: step 5 rewrites it, and steps 6, 7e, 8 and 9 append to it. A step whose output is all there is done: step 6 when the summary carries the 39 # atomic lines, step 7 when ' + GATE_OUT + '/ladder/ holds ladder.tsv, microgpt-phase.md and the comparison, step 8 when checker-count.txt ends in its #shadow row and the summary carries the # checker lines, step 9 when the summary carries the # distance lines. Continue at the first of them not done; if one stopped partway, with some of its lines already in the summary, run again from step 5, which rewrites the file, so that no line lands in it twice; the distance stage itself is not run again for that, only its comparison.',
    'Return the result, as the role says, from the logs and tables as they stand when you finish.',
  ]
}

// The commit: its local commits, and the push or the held push.
function recoverCommit(held) {
  return [
    'You are in the main tree, ' + MAIN + '. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short, and run grep -rn "<short hash>" explorations/. A commit titled "Record the landed commits\' hashes and the gate summary" is the earlier attempt\'s step 1: do not make it again, and finish what it left uncommitted, if anything, in one further commit.',
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
let review = await callAgent(PREFIX + reviewRole(gather, 'review', rungItems), { label: 'review', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS }, recoverReview())
report.review = review
routers.push(review)
mergedItems.push(...numbered('review', review && review.forPavol))
const reviewBlocks = !!(review && !review.approved && review.blocking && review.blocking.length)
let reviewDecision = null
if (reviewBlocks) {
  log('Review found blocking: ' + review.blocking.length + ' item(s); the judge rules while the gate runs on')
  reviewDecision = await callAgent(PREFIX + judgeRole('review', null, null, null, review), Object.assign({ label: 'judge:review', phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(null)), recoverJudgeMain('review'))
  report.reviewJudge = reviewDecision
  mergedItems.push(...numbered('judge-review', reviewDecision && reviewDecision.forPavol))
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
    return finish({ landed: false, reason: 'review blocking, judge did not order a repair' })
  }
  report.repairReview = await callAgent(PREFIX + mergedRepairRole(decision, 'review'), { label: 'repair:review', phase: 'Review', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('review'))
  routers.push(report.repairReview)
  review = await callAgent(PREFIX + reviewRole(gather, 'review2', rungItems), { label: 'review2', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS }, recoverReview())
  report.review2 = review
  routers.push(review)
  mergedItems.push(...numbered('review2', review && review.forPavol))
  if (!review || !review.approved) {
    return finish({ landed: false, reason: 'review still blocking after one repair' })
  }
  gateIsStale = true
}

if (gateIsStale || !gate) {
  gate = await callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate:after-review', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
  report.gateAfterReview = gate
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
  report.repairGate = await callAgent(PREFIX + mergedRepairRole(decision, 'gate'), { label: 'repair:gate', phase: 'Gate', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('gate'))
  routers.push(report.repairGate)
  gate = await callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate2', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
  report.gate2 = gate
  if (!gate || !gate.green) {
    log('Gate red after one repair: the batch stops here, nothing pushed; the failing tests and the diagnosis are the record')
    return finish({ landed: false, reason: 'gate red twice' })
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

const heldBy = pushHeldBy(approved, review)
if (heldBy.length) log('Push held: ' + heldBy.length + ' stop(s) met and not lifted: ' + heldBy.join('; '))
const commit = await callAgent(PREFIX + commitRole(gather, gate, heldBy), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(heldBy.length > 0))
report.commit = commit
return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy })
