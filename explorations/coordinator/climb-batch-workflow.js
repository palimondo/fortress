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
// the merged-diff review and the gate run side by side, a cold reader reads the skill text
// the batch added, and the commit stage lands the gate's tables, runs the microGPT walk
// check and pushes. Every agent is pinned to Opus but a judge's second ruling on the same
// rung or tree, which runs on Fable (POSITIONS.md, "The judge's rulings."). Every prompt
// points to the fortress-repo skill for how to build, test, run the old code, wait and
// commit, and says only what the role does in this batch. No backticks and no non-ASCII
// character anywhere in this file (the gate's awk line excepted).
//
// Every agent() call goes through callAgent ("An agent that comes back with nothing"),
// which runs a role again, up to two more times, when its agent returns nothing; a usage
// or rate limit, or a rung worker, skeptic or judge that returns nothing after its
// attempts, stops the run there and decides nothing, and resumeFromRunId with the same
// script and args then runs that role again.

export const meta = {
  name: 'fortress-climb-batch',
  description: 'One batch of Fortress compile-ladder rungs in seeded worktrees: each rung done test first by its worker and checked by a skeptic that fixes what it finds, a judge only on a contested fix or a refusal; gathered onto main, reviewed beside one gate, the skill text it adds cold-read, landed and pushed',
  phases: [
    { title: 'Rung', detail: 'the rung done test first in its own seeded worktree, committed and pushed to its wip/ branch as it goes' },
    { title: 'Skeptic', detail: 'the rung checked by reading and by programs of its own on the old and new code; what it finds it fixes, test first, and it marks a fix contested when nothing on record settles it' },
    { title: 'Judge', detail: 'Opus for a first ruling, Fable for a second on the same rung or tree: only on a contested fix, a refusal, a worker that stopped, a blocking review or a red gate' },
    { title: 'Gather', detail: 'each approved rung applied to main in one commit with its record folded, the new ledger rows added through ledger.py, the rows it fixed closed' },
    { title: 'Review', detail: 'the merged diff, the skeptics\' fixes and the folded record read as a whole, once, beside the gate' },
    { title: 'Gate', detail: 'compileAll, the suites at four threads, testSpecData once a rung brings it, the atomic runs, the ladder regression, the checker count, and the distance stage beside them, reported and never red' },
    { title: 'Cold read', detail: 'the skill text the batch added, read by an agent given only the skill' },
    { title: 'Commit', detail: 'the gate\'s tables landed, the microGPT walk check run, main pushed to its three branches, the worktrees removed; no push while a step that cannot be undone is unlifted' },
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
const DELTA_PART = '.claude/skills/fortress-repo/references/revival-changes.md'   // POSITIONS.md, "The delta from the original Fortress is a part of the skill, kept current."
const LEDGER = TOOLS + '/ledger.py'

// ===========================================================================
// MANIFEST - the coordinator replaces everything between this line and the
// "END MANIFEST" line, and changes nothing else in this file.
//
// Generated by explorations/compile-ladder/plan-12/manifest/gen12.py from
// CLIMB-BATCH-12.md (section 3, each rung's section word for word; section 5, the
// manifest fields and the intro) and the briefings of lists12.py; check12.js checks it.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order only),
// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line
// for the batch table), section (the rung's section of the record, read by every role
// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the
// worker reads first, each with its reason), checks (the sub-list the skeptic, a judge
// and a repair round read), expectedMoves (ladder moves declared, none here), and the
// optional landsOnlyWith, expectedCheckerCount and expectedCheckerCrash (none here).
// No value is set at launch. The base and the base build are args.base and
// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The
// Workflow harness runs two agents at once on this box"); the scatter starts the
// longest expected worker first.
// ===========================================================================

const BATCH = '12'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-12.md'
const BRIEFING_LISTS = 'explorations/compile-ladder/plan-12/manifest/lists12.py'

const W_SECTION = [
"**The answers this rung follows.** None of the curator's open questions touches this rung. Rows 614 and 615 stand as landed (PLAN, \"Climb batch 10, listed for his review\", row 615's entry): a trait's override declarations override for every type below it, and walk counts as not inherited only what a type's own override declarations override. Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- Row 649: an object that inherits an abstract method and declares no body for it loads, and the call stops with an InterpreterBug, '... has neither body nor def'; the traits chapter makes the program a static error (\"any object inheriting an abstract method must define a body expression for the method\", Specification/basic/traits.tex:571). Walk's load checks read no abstract method (BuildEnvironments.checkFunctionalMethodMeets, checkComprisesClauses); row 614's repair reaches the case anew. The fix is a load check where walk builds an object's methods from what its traits provide (values/Constructor.java, finishInitializing at :154-270, overriddenInTraits at :448, accumulateEnvMethods at :535): every inherited abstract method has a body in the object or in a trait it extends, else a refusal at load. It covers object expressions, which walk lifts to objects.",
"- Row 653, walk's half: a method declaration with the modifier override that overrides no inherited declaration loads and runs, where the chapter says \"It is a static error if a declaration with the modifier override does not override any inherited declaration\" (traits.tex:594-595). The fix is a load check beside row 614's bookkeeping (Constructor.overriddenInTraits computes what each trait's override declarations override): an override that overrides nothing is refused at load. The checker's half waits on row 650 (section 4).",
"- Row 647: the load check of the Meet Rule for Functional Methods skips every type with static parameters (checkFunctionalMethodMeets visits declarations without static parameters, interpreter/evaluator/BuildEnvironments.java:1214-1221; finishObjectTrait checks an object expression only without them, :993), so a generic object, and an object expression inside a generic function, extending two traits that each declare pick(self) with no declaration on the meet load and run A's pick. The rule covers declarations \"occurring in trait or object declarations or object expressions\" (Specification/advanced/overloading.tex, section \"Meet Rule\"). The fix checks the generic declaration too, over its own static parameters or at the instantiation walk makes; the worker says which and why, and reports the cost on the library's load.",
"- Row 648: a top-level variable initialised with an object expression stops the program at load, 'Missing value: *objectexpr_ObjectExpr', since CUWrapper.initVars binds the lifted constructors (registerObjectExprs) after it visits the component's variables (interpreter/env/CUWrapper.java:272-286). The fix binds them first. The text: Specification/basic/expressions/object.tex, section \"Object Expressions\".",
"- Notes, not repairs: row 570 (the checker's half of rows 618 and 647: the compiled overloading checker checks no object expression per provider); row 650 (row 653's compiled half waits on it); row 615 (the landed reading, which row 653's check follows: an override overrides what the type's own traits provide).",
"",
"**Distance sites.** None. The count and distance stages do not read walk (FACTS, \"The checker-count and distance stages read only the compiler's phases ...\"). What moves is walk's refusals at load.",
"",
"**Files.** Under ProjectFortress/src/com/sun/fortress/interpreter/:",
"- evaluator/BuildEnvironments.java (checkFunctionalMethodMeets, finishObjectTrait) and evaluator/values/OverloadedFunction.java (FunctionalMethodMeets), for row 647;",
"- evaluator/values/Constructor.java (finishInitializing, overriddenInTraits, accumulateEnvMethods), for rows 649 and 653;",
"- env/CUWrapper.java (initVars, registerObjectExprs), for row 648;",
"- new and promoted files in ProjectFortress/tests/.",
"- Not: the library, the checker, the test harness.",
"",
"**Tests, first.**",
"- Row 649: ProjectFortress/tests/XXXAbstractMethodUndefinedWalk.fss and its .test promoted, the refusal at load named in load_exception_contains=. One more case in the same file or beside it: an object expression inheriting an abstract method with no body, refused alike.",
"- Row 653: the owed expected failure written first, ProjectFortress/tests/XXXOverrideNothingWalk.fss with a .test keyed load_exception_contains= on the refusal's message, green while walk loads and runs the program (the skill's tests-writing.md, \"Where a test goes, and how it passes\"); then promoted when the check lands. Its program: trait A with f(x: ZZ32): String = \"A\", object B extends A with override f(x: String): String = \"B\", as row 653's note gives it.",
"- Row 647: ProjectFortress/tests/XXXFunctionalMethodMeetGenericProviderWalk.fss and its .test promoted, the refusal at load named (as FunctionalMethodMeetObjectExpressionWalk names it, load_exception_contains=Invalid overloading of pick).",
"- Row 648: ProjectFortress/tests/XXXObjectExpressionTopLevelVariableWalk.fss promoted, the variable's value asserted.",
"- Keep their verdicts: FunctionalMethodMeetObjectExpressionWalk, OverrideInTraitWalk, FunctionalMethodOverrideOtherPathWalk (row 615's pin); the team's disp0.fss, disp1.fss and FunctionalMethodMeetProvided.fss, which declare override on objects; the expected failures of rows 591, 592, 612 and 616.",
"- After the edit: the interpreter suite once (ant testSystem), since every load check reads every component walk loads, the one library among them; ant testSpecData is the gate's.",
"",
"**Specification.** None. The texts already make rows 649 and 653 static errors, the Meet Rule already covers object expressions and generic declarations, and row 648 is a defect against \"Object Expressions\". A grep of Specification/ for these rows' numbers finds none.",
"",
"**Overlaps by file.**",
"- No other rung edits walk.",
"- ProjectFortress/tests/: R, G and S add distinct files.",
].join('\n')

const C_SECTION = [
"**The answers this rung follows.** Q48's part (a) is answered (2026-10-09): yes, the curator's choice and the record's default (POSITIONS, \"A label body takes the expected type of the whole label.\"; section 2, Q48), so row 642 is this rung's and every line marked \"under Q48\" applies. Part (b) is not answered: the argument-context probe measured it (explorations/reviews/argument-context-probe.md) and it waits for the curator's answer, out of this batch, so row 455's argument faces stay as the expected failure XXXInferContextDrops and no line marked \"under Q48(b)\" applies. Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- Row 644: the checker gives no expected type to an operator repeated between three or more operands that no multifix declaration accepts. SAmbiguousMultifixOpExpr (scala_src/typechecker/impls/Operators.scala:382-387) tries the multifix application and then the left-associated binary ones, both with no expected type, so the outer application's result-only parameter takes its bound: with opr OPLUS[\\T\\](a: Any, b: ZZ32): BoxV[\\T\\], y: BoxV[\\ZZ64\\] = 1 OPLUS 2 OPLUS 3 is refused, 'Right-hand side has type BoxV[\\Object\\], but declared type is BoxV[\\ZZ64\\].', where 1 OPLUS 2 checks. The fix mirrors the loose juxtaposition's since rung E (:170-197): try the multifix application with the expected type, else check the left-associated applications with it. The chapter's sentence after its list of contexts gives an operator application the expected type (Specification/basic/inference.tex:143-145), and Appendix I's entry \"The contexts that give a call an expected type\" says the checker gives none to a repeated operator (Specification/appendices/changes.tex:2047-2051, which names row 644): a sentence this repair makes false, amended whatever Q48's answer.",
"- Row 651: an invocation of a dotted method with its static arguments written, one of whose type parameters is bounded by a type at another, stops the checker, 'R is not in the kind env'. staticArgsMatchStaticParamsForApp (scala_src/useful/STypesUtil.scala:771-794) checks each written argument against its parameter's bound with the other written arguments not put in; the fix substitutes them, as StaticTypeReplacer does elsewhere. Two expected failures pin it: XXXMethodStaticArgsBoundNamesOther (rung C's) and XXXMethodStaticArgsBoundNamesOtherSameName (rung E's skeptic's, the same-name shape that the base accepted only through row 627's capture).",
"- Under Q48, row 642: the checker checks the body of a label with no expected type (impls/Misc.scala:706, newChecker.checkExpr(body)), so a call that ends the body and whose type parameter only its result mentions takes the bound Any. The fix passes the label's expected type into the body and, by the same union rule, into the with values of its exits. One site: Library/String.fss:431, SubString.verify, a typecase ending a label body.",
"- Under Q48(b) only: row 455's two argument faces. Not this rung's at the default.",
"- Notes, not repairs: row 455 (the argument faces stay with it); row 560 (item 36 complete under Q48, its thirteenth site); row 627 (row 651's second shape came from its renaming, which is right).",
"",
"**Distance sites.** Row 642, 1 site, String.fss:431, under Q48. Rows 644 and 651: none on the one library; their programs are tests. By row, not class (row 577).",
"",
"**Files.** scala_src/typechecker/impls/Operators.scala (SAmbiguousMultifixOpExpr, :382-387, against the juxtaposition at :170-197); scala_src/useful/STypesUtil.scala (staticArgsMatchStaticParamsForApp, :771-794); under Q48, scala_src/typechecker/impls/Misc.scala (the label at :706 and the exit case near it); new and promoted files in ProjectFortress/compiler_tests/. Not: the library, walk, the overloading checker (providedAndOverridden, row 653's compiled half waits on row 650), the disambiguator.",
"",
"**Tests, first** (each through junit.sh on the base):",
"- Row 644: XXXInferRepeatedOperatorContext promoted to a name by topic, compiling and its value asserted.",
"- Row 651: XXXMethodStaticArgsBoundNamesOther and XXXMethodStaticArgsBoundNamesOtherSameName promoted, each compiling and printing its value (1 and 11, as the rows give them).",
"- Under Q48: XXXInferResultOnlyLabelBody promoted, with one more label whose exit's with value is a result-only call, asserted.",
"- Keep their verdicts: InferLooseJuxtContext, InferResultOnlyIfWithoutElse, InferResultOnlyAfterLocalDecl, InferResultOnlyTypecaseBranch, MethodStaticArgReceiverSameName, InferDependentBound, InferBigOperatorUnwritten, the inference tests of batches N, 8 and 10; XXXInferContextDrops (row 455), Q48(b) not answered; the ladder's 85 files.",
"- After the edit: the compiler and library test tracks once; the count and distance stages once.",
"",
"**Specification.** Row 644, whatever Q48's answer: the Appendix I entry \"The contexts that give a call an expected type\" (Specification/appendices/changes.tex:1984-2082) says at :2047-2051 that the checker gives no expected type to an operator repeated between three or more operands that no multifix declaration accepts, naming row 644; the sentence is amended in the S1 form with the reason and the row (POSITIONS, \"Every change to the specification is recorded with its reason.\"; \"The S1 form\"). The chapter itself changes nothing for row 644: its sentence after the list already gives an operator application the expected type (Specification/basic/inference.tex:143-145). Under Q48, in the inference chapter: the list of contexts with an expected type (:128-142) gains the body of a label expression and the with values of its exits; the \"not yet described\" item (:266-268) loses the label body and keeps the argument of another call and the body of a for loop; and the same entry's sentences at :1998-2001 and :2043-2046, which name the label body as outside the list, are amended with row 642. Row 651: none; no passage names the crash.",
"",
"**Overlaps by file.**",
"- No other rung edits the checker. S edits the specification too, apart from this rung's passages: Specification/basic-lib/numbers.tex and a new Appendix I entry near the end of the revival section, not the inference chapter or the entry \"The contexts that give a call an expected type\" (changes.tex:1984-2082).",
"- ProjectFortress/compiler_tests/: C alone.",
].join('\n')

const R_SECTION = [
"**The answers this rung follows.** Q50 is answered (2026-10-09): way (a), point by point, as recommended and the record's default (POSITIONS, \"A range of rank 2 or 3 checks containment corner by corner.\"; section 2, Q50), so row 657's value change is this rung's and every line marked \"under Q50\" applies. Q49 is not yet answered: the curator's word is pending, and probe P3 has measured way (c) (section 2, Q49, \"P3, measured\": 25 values walk prints lost, 16 gained, 7 changed, the object's four operators retyped beside the five methods). This rung runs at Q49's default, way (a), fail bodies, so row 656 is this rung's and every line marked \"under Q49\" applies. If the curator answers Q49 (b) or (c), the lines marked \"under Q49\" are dropped and the five sites stay; (c) is then built as P3 measured it, unless the record is amended before the launch to build it here. Item 40's answer stands (batch 11's Q3, way (a); POSITIONS, \"The order of the work after batch 10.\"): the generic range bodies move to the ZZ32 kinds of rank 1 to 3. Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- Row 655, 2 sites: checkSelection, the bounds check behind narrowToRange (Library/RangeInternals.fss:125-138), compares its ranges' bounds with > and < on the index type I, which declares neither (:129, :133). Its three callers are generic: Range.narrowToRange(other: Range[\\I\\]) (Library/FortressLibrary.fss:3839-3840), BoundedRange's (:3909-3910) and FullRange's (:3940-3946, rung E's site in batch 11, now landed); the OpenRange overloads beside them (:3841, :3908, :3939) call no check. Under item 40's way (a) the comparisons move to the ZZ32 kinds with the callers: the generic traits declare narrowToRange abstract (api Library/FortressLibrary.fsi:2180-2181, :2232-2233, :2262-2263; RangeInternals.fsi:42) and the ZZ32, pair and triple kinds of rank 1 to 3 hold the bodies, with checkSelection at each index type, as batch 11's rung L moved CMP, FORWARD_CMP and |self| (FACTS, \"The one library's range types provide a declaration on the meet ...\"). Not taken by rung L, and not here: a typecase on (this, other) inside the generic function; overloaded helpers with a generic fallback (its decision 6).",
"- Under Q50, row 657: the rank-2 and rank-3 bounds checks compare point by point with PCMP (RangeInternals.fss:113), not in the tuples' lexicographic order (FortressLibrary.fss:4436-4525), so ((0,0):(9,9)).narrowToRange((2,-1):(5,5)) raises IndexOutOfBounds where it answered (2,0):(5,5). A value walk prints changes; the pin at ProjectFortress/tests/RangeKindBodies.fss:94 changes with it, its before and after listed for you.",
"- Row 654, 1 site: FullRange.narrowToRange(other: OpenRange[\\I\\]) (FortressLibrary.fss:3939) declares FullRange[\\I\\] and answers self INTERSECTION other, which the library types BoundedRange[\\I\\]. Widening it breaks the return-type rule against its sibling narrowToRange(other: Range[\\I\\]): FullRange[\\I\\] (:3940). The repair, now that rung E has landed: the sibling's typecase on FullRange[\\I\\], whose else branch E's change types; or a FullRange meet over an OpenRange; or, with row 655's move, a body at each ZZ32 kind. The worker takes the library's own way and says why. Walk answers today: (0:9).narrowToRange(::2) is 0:8:2 (RangeDeclarations.fss:104), a value to keep.",
"- Under Q49, row 656, 5 sites: TrivialOpenRange's truncL, truncR, every, imposeStride and atMost (FortressLibrary.fss:3873-3879) apply #, : and :: to an Any and declare ranges over Any, which no range of a ZZ32 kind is. Way (a): fail bodies with a message naming the open range, as the team's else in FullRange.narrowToRange (:3944) and batch 11's BoundedRange2D and BoundedRange3D meets (RangeInternals.fss:593-608) do. Five values walk prints become stops, listed for you with their values today ((:).truncL(3) is LeftScalarRange(3,1), and the other four).",
"- Row 658: PrefixSet declares no indices, so IndexValuePrefixSetGenerator.indices, which reads s.indices (Library/PrefixSet.fss:478), stops walk on every prefix set, \"Cannot find definition for method indices given receiver fastPrefixSet\". The repair is 0 # |s|, the shape of ZeroIndexed's bounds (FortressLibrary.fss:1909), the precedent line this rung cites, under the library rule (the archaeology's section 5: write the missing one in the shape of the one the library has, and cite that line). No new api declaration.",
"- Row 608, 1 site: ImmutableArray1's opr[r: Range[\\ZZ32\\]] reads r'.lower (FortressLibrary.fss:2255), which FullRange[\\ZZ32\\] does not declare. The repair is r'.left.get, as its twin in Array1 reads (:2313), the stride kept as the twin keeps it (m = r'.stride).",
"- Notes, not repairs: rows 599 and 600 (closed; their last sites are rows 654 to 656); row 577 (the classes, again); row 634 (the tuple order the moved check leaves, under Q50); row 659 (a stop this rung does not touch).",
"",
"**Distance sites.** Row 654 1, row 655 2, row 656 5 (under Q49), row 608 1: up to 9. By row, not class (row 577). Rows 657 and 658 have no site; row 657 is the value, row 658 a walk stop.",
"",
"**Files.**",
"- Library/FortressLibrary.fss, the ranges section (:3806-3960) and :2255; Library/FortressLibrary.fsi, the ranges section (:2163-2276).",
"- Library/RangeInternals.fss and .fsi (checkSelection and the ZZ32, pair and triple kinds).",
"- Library/PrefixSet.fss (:478).",
"- New tests and the changed pin in ProjectFortress/tests/.",
"- Not: the reductions section of FortressLibrary (G's, :3080-3500 and .fsi:1860-2030); Library/Set.fsi (G's); the arrays section but ImmutableArray1's opr[] at :2255, and QQ, String, SUFFIX_SUM and the api's __immutableFactory1 (S's); the checker; walk; the team's test lines, but the pin under Q50, which is the revival's (batch 11's rung L).",
"",
"**Tests, first.**",
"- Rows 654 and 655: the count and distance stages are the failing-then-passing test, before from batch 11's landed tables, after once on the rung's tree, read by row. Beside them, one walk test calling each moved narrowToRange body at rank 1, 2 and 3 with today's values, passing before and after; RangeDeclarations.fss:104 already pins (0:9).narrowToRange(::2).",
"- Row 657 under Q50: the pin at RangeKindBodies.fss:94 changes to the raise, caught and asserted, failing on the base; its before and after listed for you.",
"- Row 656 under Q49: one walk test that asserts today's five values before the edit and, after it, asserts the five stops, each caught with its message.",
"- Row 658: one walk test of ps.indexValuePairs.indices on a prefix set, failing on the base (the stop) and passing after, its values asserted.",
"- Row 608: the stage as the test, and one walk test of ImmutableArray1's range subscript with a stride, today's value, passing before and after.",
"- Keep their verdicts: RangeDeclarations, RangeKindBodies (but the pin under Q50), RangeBoundedEveryForward, IndicesGetterCalls, the team's range tests.",
"- After the edit: the interpreter suite once, since walk reads the library.",
"",
"**Specification.** None. The text describes no range of rank 2 and no method of the open range (Specification/basic/expressions/ranges.tex, section \"Ranges\"), and narrowToRange, checkSelection and PrefixSet are the library's. Part IV is rendered from the api files, so abstract declarations reach it when the PDF is rebuilt.",
"",
"**Overlaps by file.**",
"- G edits Library/FortressLibrary.fss and .fsi too, in the reductions section only (:3080-3500; .fsi:1860-2030), hundreds of lines from R's declarations; no declaration is both rungs'.",
"- S edits Library/FortressLibrary.fss and .fsi too: QQ's rounding methods (:644-652), the arrays section's storing objects, factory, immutable subarray and Matrix's mul (:2376-2792, not ImmutableArray1, whose opr[] at :2255 is this rung's), String's left and right (:4140-4141), SUFFIX_SUM (:4684-4688) and the api's __immutableFactory1 (.fsi:1621-1624); no declaration is both rungs'.",
"- ProjectFortress/tests/: W, G and S add distinct files.",
].join('\n')

const G_SECTION = [
"**The answers this rung follows.** None of the curator's open questions touches this rung. It runs on probe P2's outcome (i) (section 5, \"Before the launch\"), measured on 2026-10-09 under walk on the base build (fe74fb738) and on shadows seeded from it, none of them committed: outcome (i) on the typing completed by the three edits below, which the rung makes; the typing as Rows words it alone would have given outcome (iii). Of this section's 22 candidates, the unwritten clause form of 12 runs on the base over a non-empty generator: BIG MIN[i <- 0#4] (3 - i) is 0, BIG MAX[i <- 0#4] i is 3, SUM[i <- 0#4] i is 6, PROD[i <- 1#3] i is 6, BIG AND[i <- 0#4] (i < 4) is true, BIG OR[i <- 0#4] (i = 2) is true, BIG BITXOR[i <- 0#3] i is 3, BIG ||[i <- 0#3] i is \"012\", BIG |||[i <- 0#3] i is \"0 1 2\", BIG //[i <- 0#3] i is (\"0\" // \"1\") // \"2\", BIG LEXICO[i <- 1#2] (i CMP 1) is GreaterThan, and Map's BIG UNION[i <- 0#3] {[\\ZZ32,ZZ32\\] i |-> 10 i} has 3 entries, 20 at key 2. The rung's first test is these 12 in one program, each value asserted; that program passed on the base and on the completed shadow, run directly and through harness-one.sh at four threads. The other 10 stop on the base and stay out of the test: BIG MIN_MIN, BIG MIN_MAX, BIG MAX_MIN, BIG MAX_MAX and Set's BIG INTERSECTION at the abstract simpleJoin(a:Any, b:Any) ('has neither body nor def', as BIG MINMAX does, row 473), Set's BIG UNION at join (Set[\\OPEN\\] given a NodeSet[\\ZZ32\\]), and BIG SQCAP, BIG SQCUP, List's BIG CONCAT and PrefixSet's BIG UNION at join, a parameter at BOTTOM (D2's case; PureList's BIG CONCAT the same). The typing as Rows words it, types alone and every body kept (56 lines in the four files and Generator22D.fss:207), stops three identity-less operators that run on the base: BIG MIN and BIG MAX ('join param 1 (a:Maybe[\\OPEN\\]) got arg Just[\\Int\\]') and BIG // ('(a:Maybe[\\String\\]) got arg Just[\\FlatString\\]'), since walk's Just(r) takes the run-time class of r and walk's generics are invariant; 13 of the interpreter suite's 526 tests fail on it, written forms too (BigMinMax.fss). Three more edits in the rung's files complete the typing, each as the api or the library already writes it, and on them no operator that runs on the base stops and every value stays: ActualReduction's abstract lift(r: Any): L (Library/FortressLibrary.fss:3062) at lift(r: R): L, as the api declares it (.fsi:1869), else walk picks that abstract declaration over a typed lift ('lift(r:Any):L ... has neither body nor def', simpleSum.fss); Just[\\R\\](...) for Just(...) in the lifted bodies, AssociativeReduction's join and lift and LiftedCommutativeMonoidReduction's empty, join and lift, as the empty case already writes Nothing[\\R\\]; and MinReduction's and MaxReduction's simpleJoin(a, b) (:3291, :3300) at simpleJoin(a: T, b: T): T, as the api declares them (.fsi:1979, :1987), else walk picks the abstract simpleJoin(a: R, b: R) (batch 10's measured stop). The monoid operators that stop on the base stop on the completed shadow too, now at the typed lift, so no new stop is at a monoid operator, every line marked \"under P2(b)\" applies, and the rung takes all 13 sites. On the completed shadow the interpreter suite has 4 failures of 526, each a test line the typing reaches and a point to report: XXXUnwrittenBigMinMaxWalk.fss passes, since BIG MINMAX and the four tuple forms unwritten now answer, (0, 3) over 0#4 and (0, 0), (0, 2), (1, 1) and (1, 3) over (i MOD 2, i) for i in 0#4, so row 473's open half moves and the test's promotion is the rung's; GeneratorDeclarations.fss:14 names AnyMaybe in __bigOperator2's static arguments, Maybe[\\ZZ32\\] there; and the team's HeapTest.fss:80 and RangePrototype.fss:336-337 name AnyMaybe as generate's static argument, Maybe[\\(ZZ32,ZZ32,ZZ32)\\] there, RangePrototype's StrideReduction also declaring simpleJoin(l:Any, r:Any): Any (:213), which takes (ZZ32,ZZ32,ZZ32) for both parameters and its result; so written, the three pass on the completed shadow. An operator that stops on the base too is not this rung's. The curator's answer to batch 11's Q1 stands (POSITIONS, \"The order of the work after batch 10.\"): walk leaves an F-bounded type parameter open where nothing at a call fixes it, which is what lets these reductions run once typed. Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- Row 628, 13 sites: the identity-less reductions keep three devices typed Any so that walk's reductions ran while walk gave an unwritten static argument Bottom. They are AssociativeReduction's abstract simpleJoin(a: Any, b: Any): Any (Library/FortressLibrary.fss:3116; api Library/FortressLibrary.fsi:1907), where its eight implementers declare simpleJoin at the element type, so the checker reports the abstract method as not implemented in each (8 sites, :3289, :3298, :3307, :3338, :3358, :3378, :3398, :3496); the lifted type AnyMaybe (AssociativeReduction[\\R\\] extends ActualReduction[\\R,AnyMaybe\\], :3104; LiftedCommutativeMonoidReduction, :3129), which is no Condition, so the generator binding if av <- a cannot bind in join (4 sites, :3107, :3119, :3133, :3144); and lift(r: Any) in AssociativeReduction (:3117) and, under P2(b), in MonoidReduction (:3162) against the api's lift(r: R) (.fsi:1908, :1920) (1 site, :3162). The fix, as the row says: simpleJoin(a: R, b: R): R and lift(r: R) (MonoidReduction's under P2(b)), and the lifted type Maybe[\\R\\] where AnyMaybe stood: in the two traits, in LiftedCommutativeMonoidReduction, and in the declared types of the identity-less big operators and their sugar (.fsi:1982-2027, :2114, with the component's BigReduction[\\T,AnyMaybe\\], __bigOperatorSugar[\\T,T,T,AnyMaybe\\] and Comprehension[\\...,AnyMaybe\\] lines) and Set's BIG INTERSECTION (Library/Set.fsi:64-66, Set.fss:128-132). The trait AnyMaybe itself stays: Maybe extends it and HasRank excludes it (.fsi:947-964, :1195).",
"- The precedent, under the library rule (the archaeology's section 5): the api already declares lift(r: R) in both traits, and Set's Intersection already names Maybe[\\Set[\\E\\]\\] as its lifted type (ReductionWithZeroes[\\Set[\\E\\],Maybe[\\Set[\\E\\]\\]\\], Library/Set.fss:134-136). This rung extends nothing; it types what the library has at the type its api and its sibling already write.",
"- Notes, not repairs: row 433 (the fusion pairs' distribute declares PossibleReductionPair[\\AnyMaybe\\]; it follows the lifted type's spelling where that type changes, and its ill-formed bounds stay, so its six sites stay and its two distribute sites are a point to report if they move); row 473 (BIG MINMAX's open half, XXXUnwrittenBigMinMaxWalk.fss, keeps its verdict or moves: a point to report); row 645 (the empty reduction's identity, not this rung's); rows 424 and 425 (what made the devices necessary and what still refuses an unwritten reduction compiled); row 436 (the identities' else => 0, not this rung's); row 631 (embiggen's Comprehension[\\T,T,Any,Any\\], a team test line, not this rung's); D2's entry (the plain-bounded big operators, which P2 measured).",
"",
"**Distance sites.** 13, all in component FortressLibrary, row 628's: 8 abstract-method, 4 typecheck at the generator bindings, 1 at lift. The stage files them under the abstract-method kind and OT; by row, not class (row 577).",
"",
"**Files.**",
"- Library/FortressLibrary.fss, the reductions section (:3080-3500): AssociativeReduction, LiftedCommutativeMonoidReduction, MonoidReduction (under P2(b)), the eight implementers, the identity-less big operators' declared types and sugar.",
"- Library/FortressLibrary.fsi (:1904-1910, :1919-1921, :1982-2027, :2114).",
"- Library/Set.fsi (:64-66) and Library/Set.fss (:128-132); Library/Generator22D.fss:207 and Library/QuickCheck.fss:758, which name the lifted type, if the type they name changes.",
"- New tests in ProjectFortress/tests/.",
"- Not: the ranges section of FortressLibrary and RangeInternals (R's); Library/PrefixSet.fss (R's); the numbers, arrays and strings sections and SUFFIX_SUM (R's :2255 and S's); the identities (additiveIdentity, multiplicativeIdentity, :3200-3240); the checker; walk.",
"",
"**Tests, first.**",
"- The count and distance stages are the failing-then-passing test, before from batch 11's landed tables, after once on the rung's tree, read by row: the 13 sites gone and no site come.",
"- One walk test, P2's program handed to the rung as its first test: the unwritten clause form of each library big operator whose reduction inherits a typed device and whose form P2 found running on the base, over a non-empty generator, each value asserted. The candidates are BIG MIN, BIG MAX, BIG MIN_MIN and its three siblings, SUM, PROD, BIG AND, BIG OR, BIG BITXOR, BIG SQCAP, BIG SQCUP, BIG ||, BIG |||, BIG //, BIG LEXICO, Set's BIG UNION and BIG INTERSECTION, List's BIG CONCAT, Map's and PrefixSet's BIG UNION; P2's base run says which of them the test holds, and one that stops on the base stays out with a note. BIG MINMAX is out already: its unwritten form stops on the base (row 473, XXXUnwrittenBigMinMaxWalk.fss, green while the run fails). The test passes before and after; the two values row 628 names (BIG MIN <|[\\ZZ32\\] 4, 2, 7 |> is 2, BIG MIN[i <- 0#4] (3 - i) is 0) are among them.",
"- Keep their verdicts: BigMinMax.fss; batch 11's rung W's promoted tests of the unwritten reductions; XXXUnwrittenBigMinMaxWalk.fss (row 473) and row 645's expected failure; the team's simpleSum.fss and setSum.fss; GeneratorDeclarations.fss, SetTest.fss, ListTest.fss, MapTest.fss.",
"- After the edit: the interpreter suite once, since walk reads the library; the count and distance stages once.",
"",
"**Specification.** None. A grep of Specification/ and of the skill's parts for AnyMaybe and simpleJoin finds no sentence; the reductions chapter (Specification/basic/expressions/reductions.tex, section \"Summations and Other Reduction Expressions\") describes the operators, not the library's lifting. The row's citation of the if chapter is the generator binding the typed lifted type lets the checker read (Specification/basic/expressions/if.tex, section \"If Expressions\").",
"",
"**Overlaps by file.**",
"- R edits Library/FortressLibrary.fss and .fsi too, in the ranges section and at :2255; no declaration is both rungs'.",
"- S edits Library/FortressLibrary.fss and .fsi too, in the numbers, arrays and strings sections, at SUFFIX_SUM and at the api's __immutableFactory1 (.fsi:1621-1624), none of them the reductions'; no declaration is both rungs'.",
"- ProjectFortress/tests/: W, R and S add distinct files.",
].join('\n')

const S_SECTION = [
"**The answers this rung follows.** Items 42 and 44 are answered (2026-10-09): String's left and right answer Just of the character (POSITIONS, \"String's left and right answer Just(c).\"), and QQ's ceiling and truncate keep their declared ZZ and raise at +infinity, -infinity and 0/0, the specification's paragraph revised in the S1 form (POSITIONS, the entry \"QQ's ceiling and truncate keep ZZ and raise ...\" of item 44). The array sites need no answer of the curator's: they are the 28 that need no answer to the six array forks (explorations/reviews/array-forks-now.md, sections 1 and 3), taken as the library's one-off slips (PLAN, \"The principle for the batches\", pile 1) on the coordinator's routing of 2026-10-09. The array design's open questions are not touched (POSITIONS, \"The array design's three questions are open.\"), and the storing objects take Number, the bound their traits already have, not a ring bound (POSITIONS, \"The integration review's checks\"). Not this rung's: every array site that needs an answer to a fork, item 15's arithmetic in a size (13), the bound of Vector and Matrix (25) and a size known only at run time (9), and the 19 that need a list of ways first (section 4). Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- The storing objects, 19 sites, no row: __DefaultVector (Library/FortressLibrary.fss:2407), __DefaultMatrix (:2766) and TransposedMatrix (:2774) declare their own T with no bound and extend Vector[\\T,s0\\] or Matrix[\\T,s0,s1\\], whose T extends Number (:2392, :2700), so the checker reports \"The static argument T does not satisfy the corresponding bound Number\" at their lines and at the methods they inherit (:2407, :2708, :2752 twice, :2757 twice, :2762, :2767, :2774, :2775, :2781 to :2785, :2786 twice, :2787 twice). The repair: each declares T extends Number, as its trait does. This is way 6b of explorations/reviews/array-design-ways.md section 7, \"a slip under every way\" of the bound, measured on 2026-09-29 on a library copy through the distance stage (19 of the 21 bound errors gone, none new; the two at the factories vector, :2455, and matrix, :2816, stay, fork 2's) and under walk (the seven array tests vectorOps, matrixOps, ArrayScalarExtension, ArrayOperatorsBesideLibrary, FlatTowerRungF, TabulateRungA and sparseMatrix printing the same). Three lines; the line numbers have moved since, the edit has not (array-forks-now.md section 2).",
"- __immutableFactory1, 2 sites, no row: it declares ReadableArray1[\\T,b0,s0\\] (:2432; api Library/FortressLibrary.fsi:1624) where its two callers need an ImmutableArray1, ImmutableArray1's replica (:2272) and Array1's freeze (:2336): \"Function body has type ReadableArray1[\\U,b0,s0\\], but declared return type is ImmutableArray1[\\U,b0,s0\\]\", and ReadableArray[\\T,ZZ32\\] for freeze's tabulate. Both arms of its body answer an ImmutableArray1 (immutableArray1, :2451, and ImmutableArray1's subarray, :2265). The repair declares ImmutableArray1[\\T,b0,s0\\] in the component and the api, as its twin __builtinFactory1 declares its own array type, Array1[\\T,b0,s0\\] (:2421; .fsi:1619). Its body's own site at :2432, a size tested in a branch, and the typecase arm at :2435 (fork 1's rule) stay, the first naming ImmutableArray1 in its message: a point to report. ImmutableArray1's opr[] at :2255 is rung R's (row 608); this rung does not edit ImmutableArray1.",
"- __ImmutableSubArray1's put, 1 site, no row: the immutable subarray declares put(i, v) = arr.put(index(i), v) (:2381) on an ImmutableArray1, which declares no put (\"No such method ImmutableArray1[\\T,b_a,s_a\\].put\"); its sibling, the immutable store PrimImmutableArray, declares none (ProjectFortress/LibraryBuiltin/NativeArray.fss:32-41). The repair follows the sibling, no put on the immutable subarray, or keeps the declaration with a fail body in the team's shape (FortressLibrary.fss:3944); the worker says which and why. By reading, a put called on it stops walk today either way.",
"- Matrix's mul, 2 sites, no row: its local functions mma and mm declare () and end, on two of their arms each, in a parallel pair (mma(...), mma(...)), typed ((), ()) (:2712, :2730): \"Function body has type OR(((), ()),()), but declared return type is ()\". The repair keeps the two calls parallel in a block of type (), as the team's library writes two parallel calls of type () with do ... also do ... end (Library/QuickSort.fss:40-44). The products' arithmetic on T in the same functions (:2714, :2716, :2732) is fork 2's and stays.",
"- TransposedMatrix's add, subtract and negate, 3 sites, no row: they call mem.add, mem.subtract and mem.negate (:2782-2784), which Matrix does not declare (\"No such method Matrix[\\T,s1,s0\\].add\"); Matrix declares the operators +, - and prefix - (:2703-2707). The repair calls those operators, as scale beside them calls what Matrix declares (mem.scale(f).t(), :2785). By a grep nothing in the library or the tests calls the three, and by reading each stops walk today. Whether they stay methods or become overrides of Matrix's operators is the worker's, with why; an override changes which declaration walk runs for a transposed matrix's +, a point to report.",
"- SUFFIX_SUM, 1 site, no row: seq((|x| - 2):0:-1) (:4686) passes seq the strided range that opr : declares as Range[\\ZZ32\\] (FortressLibrary.fsi:2391), which is no generator. The repair writes the same descending loop over a generator the library already gives, the worker naming its precedent line: PREFIX_SUM beside it writes seq(1 # (|x| - 1)) (:4679), and Generator declares reverse (:1144-1146). No api declaration changes. Its value is pinned at ProjectFortress/tests/IntegerOrderNumerals.fss:60-61.",
"- Row 606, 2 sites, item 42: String's left and right (:4140-4141; api .fsi:2421-2422) answer self.get(0) and self.get(self.size-1), a Char, where they declare Maybe[\\Char\\]: \"Function body has type OR(Char,Nothing[\\Char\\]), but declared return type is Maybe[\\Char\\]\". The repair answers Just[\\Char\\] of the character, as List's left and right answer Just[\\E\\] of the element (Library/List.fss:258-263). What walk prints changes from the character to Just of it.",
"- Row 635, 2 sites, item 44: QQ's ceiling and truncate (:646, :651) are declared ZZ and answer self, a QQ, where the denominator is 0, at +infinity, -infinity and 0/0: \"Function body has type (QQ & {Ratio}), but declared return type is ZZ\". The repair raises there, the exception and its message the worker's in the library's own spelling, each named with its precedent line. floor, round and the two brackets call them (:644, :645, :650, :652), so by reading they raise at the same values; each is listed with its before and after. Making QQ consistent with the float ruling (row 330) is not this rung's: it comes later, after the switch-over.",
"- Notes, not repairs: row 437 (matrix(v)'s numeral 0 at :2819, whose repair's form follows fork 2; it stays); row 330 (the float types' rounding, which QQ follows later); row 577 (count by row and line, never by class).",
"",
"**Distance sites.** 32, all in component FortressLibrary: the storing objects' 19; the nine slips at :2272, :2336, :2381, :2712, :2730, :2782, :2783, :2784 and :4686; row 606's 2 (:4140, :4141); row 635's 2 (:646, :651). Three lines, :2782 to :2784, each hold one of the 19 and one of the slips. By row and line, not class (row 577).",
"",
"**Files.**",
"- Library/FortressLibrary.fss: QQ's rounding methods (:644-652); in the arrays section, __DefaultVector (:2407), __immutableFactory1 (:2432-2438), __ImmutableSubArray1 (:2376-2388), Matrix's mul (:2709-2751), __DefaultMatrix (:2766-2772) and TransposedMatrix (:2774-2792); String's left and right (:4140-4141); SUFFIX_SUM (:4684-4688).",
"- Library/FortressLibrary.fsi: __immutableFactory1 (:1621-1624) only.",
"- Specification/basic-lib/numbers.tex (:456-472) and a new entry in Specification/appendices/changes.tex.",
"- New tests and the changed pins in ProjectFortress/tests/.",
"- Not: ImmutableArray1, whose opr[] at :2255 is R's, and the ranges section (R's); the reductions section, Set, Generator22D and QuickCheck (G's); any array site that needs a fork or a list of ways (the storage fields :2620, :2768 and :2991 and NativeArray.fsi; Vector's and Matrix's arithmetic bodies and their parent-trait results; the run-time factories and reflect; the factories vector and matrix; matrix(v) at :2819; the scalar-extension block, :4690-4706); the checker; walk; the team's test lines.",
"",
"**Tests, first.**",
"- The stage is the failing-then-passing test of the 32 sites: before from batch 11's landed tables, after once on the rung's tree, read by row and line: the 32 gone and no site come.",
"- Row 606: the pins at ProjectFortress/tests/StringPieces.fss:60-61 (flat.left is 'a', flat.right is 'c') changed to Just of the character, failing on the base; the two at :35-36, which compare a concatenated string's left and right with its flat form's, assert Just of the character too; each before and after listed for you.",
"- Row 635: the pin at ProjectFortress/tests/NumberOrderListDeclarations.fss:23 (ceiling and truncate of 1/0 are a QQ) changed to the raise of each, caught and asserted, failing on the base, with -1/0 and 0/0 beside 1/0 and floor and round with them; its before and after listed for you.",
"- The slips walk runs: one walk test, values asserted: a transposed matrix's add, subtract and negate (failing on the base, a stop by reading), Matrix's mul of two small matrices, an immutable array's replica and an array's freeze, the last three passing before and after; SUFFIX_SUM's value is pinned already (IntegerOrderNumerals.fss:60-61).",
"- The storing objects: the stage alone; walk's array tests keep their verdicts.",
"- Keep their verdicts: the team's vectorOps, matrixOps, sparseMatrix and RationalTest; ArrayScalarExtension, ArrayOperatorsBesideLibrary, FlatTowerRungF, TabulateRungA and IntegerOrderNumerals; the other lines of StringPieces and NumberOrderListDeclarations.",
"- After the edit: the interpreter suite once, since walk reads the library; the count and distance stages once.",
"",
"**Specification.** Row 635, under item 44: the sentence \"All of these methods simply return the argument if it is +infinity, -infinity, or 0/0\" (Specification/basic-lib/numbers.tex:471-472, ending the paragraphs at :456-472 on floor, ceiling, round and truncate) is revised in the S1 form to say that they raise there, with its callout, and a new Appendix I entry goes before \"Passages not yet revised\" (Specification/appendices/changes.tex:3025): the reason (the declared integer result and the peers win over the paragraph), the original sentence quoted from Specification-1.0-frozen/basic-lib/numbers.tex:479-481, and route C; it names the entry \"The rational trait\" (:667), which revised the same sentence's opening words (POSITIONS, \"Every change to the specification is recorded with its reason.\"; \"The S1 form\"). Row 606 and the arrays: none; the text says nothing of these declarations' bodies.",
"",
"**Overlaps by file.**",
"- R and G edit Library/FortressLibrary.fss and .fsi too: R the ranges section and ImmutableArray1's opr[] at :2255, G the reductions section; this rung the numbers, arrays (but ImmutableArray1) and strings sections, SUFFIX_SUM and the api's __immutableFactory1. No declaration is two rungs'.",
"- C edits Specification/appendices/changes.tex too, in the entry \"The contexts that give a call an expected type\" (:1984-2082) and the inference chapter; this rung adds an entry of its own before \"Passages not yet revised\" and edits numbers.tex, which C does not.",
"- ProjectFortress/tests/: W, R and G add distinct files; this rung adds its own and changes the pins in StringPieces.fss and NumberOrderListDeclarations.fss, which no other rung touches.",
].join('\n')

const W_ENTRY = { id: 'W', slug: 'rung-walk-load-checks', path: '/home/user/fortress-walkloads', branch: 'wip/rung-walk-load-checks', expectedMinutes: 100,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "Walk: three load checks (rows 647, 649 and 653's walk half) and a top-level object expression (row 648)",
    blurb: "walk refuses at load an object that inherits an abstract method and gives it no body (row 649), an override that overrides nothing (row 653's walk half) and a generic provider or an object expression in a generic function that breaks the Meet Rule for Functional Methods (row 647), and binds a top-level variable initialised with an object expression (row 648); Java under interpreter/evaluator/ and interpreter/env/; no library, checker or specification edit.",
    section: W_SECTION,
    pointsToReport: [
      "An interpreter test whose verdict changes other than by the rung's intent: each with its before and after.",
      "A library type, a team test or a demo that walk now refuses at load, with the declaration and the check that refuses it.",
      "A change to which declaration walk runs for a set it loads today.",
      "A load check that instantiates a generic type to read it, or that runs at every instantiation, with its cost on the one library's load.",
      "A team test line changed or a demo edited.",
      "Normative text changed.",
      "A library, checker or test-harness edit.",
    ],
    briefing: [
      "positions:The specification stays the standard", "positions:The comprises passages read at the level of values", "ledger:649", "ledger:653",
      "ledger:647", "ledger:648", "ledger:614", "ledger:615", "ledger:618", "ledger:570", "ledger:650",
      "doc:Specification/basic/traits.tex#Method Declarations", "doc:Specification/advanced/overloading.tex#Meet Rule",
      "doc:Specification/basic/expressions/object.tex#Object Expressions",
      "doc:explorations/compile-ladder/rung-walk-open-param/REPORT.md#1. What changed and why",
      "doc:explorations/compile-ladder/rung-walk-open-param/SKEPTIC.md#3. Findings and corrections",
      "doc:explorations/compile-ladder/rung-checker-overloading/SKEPTIC.md#2. Findings, each with the output it rests on",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java#void checkFunctionalMethodMeets()",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java#public void finishObjectTrait(ObjectDecl x, FTypeObject ftt)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#public static final class FunctionalMethodMeets",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#public void finishInitializing()",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private Set<Applicable> overriddenInTraits()",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/env/CUWrapper.java#public void initVars()",
      "Walk applies at load the Meet Rule for Functional Methods"],
    reasons: [
      "The text is the standard: rows 649 and 653 are static errors by the traits chapter, row 647 by the Meet Rule, and walk refuses each at load; row 648 is a walk defect against the object expression's text.",
      "The Meet Rule's covering declarations, which your check of a generic provider accepts as walk's load check of a declared type does.",
      "Your first load check: an object that inherits an abstract method and gives it no body is refused at load; promote its test with its load key, and cover an object expression too.",
      "Your second load check, walk's half only: an override that overrides nothing is refused at load; write the owed XXXOverrideNothingWalk first, then promote it. The checker's half waits on row 650.",
      "Your third load check: the Meet Rule for Functional Methods on a generic object and on an object expression in a generic function; say whether you check the declaration or the instantiation, and why.",
      "Your binding order: a top-level variable initialised with an object expression stops at load because the lifted constructors are bound after the variables; bind them first; promote its test.",
      "What batch 11 built: walk reads what each trait provides by the traits chapter; your checks for rows 649 and 653 sit beside that bookkeeping.",
      "The landed reading of overridden, a type's own override declarations, which row 653's check follows; its pin keeps its verdict.",
      "Walk's Meet Rule check on object expressions without static parameters, batch 11's; row 647 extends it to the generic case.",
      "The checker's half of rows 618 and 647, not yours: after your rung walk refuses at load pairs the checker still accepts; say so in your report.",
      "The code generator's override, not yours: row 653's compiled half waits on it; a note, not a repair.",
      "The two sentences you make true under walk: an object inheriting an abstract method must define a body, and an override that overrides nothing is a static error.",
      "The Meet Rule for Functional Methods per providing type, covering declarations among it, which applies to generic declarations and object expressions as to declared objects.",
      "What an object expression evaluates to: the text row 648's repair follows.",
      "Batch 11's rung W on row 614: how walk now computes what a trait provides and what an override overrides, the bookkeeping your checks join.",
      "The skeptic that found rows 647, 648 and 649, with the programs and the outputs it rests on.",
      "The skeptic that found row 653, with its program on both paths.",
      "Walk's load check of the Meet Rule, which visits declarations without static parameters: where row 647's generic case joins it.",
      "Where an object expression's type is finished and checked only without static parameters: row 647's other site.",
      "The check itself, per providing type, built by batch 10's rung W; a generic provider is one more.",
      "Where walk builds an object's methods from what its traits provide: the place for row 649's check that every inherited abstract method has a body.",
      "Row 614's bookkeeping of what each trait's override declarations override: the place for row 653's check that an override overrides something.",
      "Row 648: the lifted constructors are registered after the component's variables are visited.",
      "What batch 10 and 11 built at load and the residues they left, rows 647 among them.",
    ],
    checks: [
      "positions:The specification stays the standard", "positions:The comprises passages read at the level of values", "ledger:649", "ledger:653",
      "ledger:647", "ledger:648", "ledger:615", "ledger:570", "doc:Specification/basic/traits.tex#Method Declarations",
      "doc:Specification/advanced/overloading.tex#Meet Rule",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private Set<Applicable> overriddenInTraits()"] }

const C_ENTRY = { id: 'C', slug: 'rung-checker-contexts', path: '/home/user/fortress-checkctx', branch: 'wip/rung-checker-contexts', expectedMinutes: 90,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The checker: the expected type at a label body (row 642, under Q48) and at a repeated operator (row 644), and a crash on a written static argument (row 651)",
    blurb: "the compiled checker gives an operator repeated between three or more operands its expected type (row 644), stops crashing on a written static argument whose bound names another parameter (row 651, both expected failures), amends Appendix I's sentence that says a repeated operator gets no expected type (row 644), and under Q48 (default yes) passes the expected type into the body of a label and the with values of its exits (row 642, 1 site, item 36's thirteenth), with the inference chapter's two lists and the entry's label sentences amended; Scala under scala_src/typechecker/impls/ and scala_src/useful/.",
    section: C_SECTION,
    pointsToReport: [
      "A compiled test whose verdict changes other than by the rung's intent.",
      "A program the text allows that the checker now refuses, or one the text refuses that it now accepts, outside rows 642, 644 and 651.",
      "The argument faces of XXXInferContextDrops (row 455) cleared or changed.",
      "A change in which declaration an operator application chooses once the expected type reaches it.",
      "Normative text changed beyond the inference chapter's two lists and the amended Appendix I entry.",
      "A library or walk edit.",
    ],
    briefing: [
      "positions:A type parameter the arguments do not fix", "positions:The specification stays the standard",
      "positions:The order of the work after batch 10", "positions:A label body takes the expected type",
      "positions:The checker count is measured, never red", "positions:Every change to the specification is recorded with its reason",
      "positions:The S1 form", "ledger:644", "ledger:651", "ledger:642", "ledger:455", "ledger:560", "ledger:627",
      "doc:Specification/basic/inference.tex#The Static Arguments of a Call", "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie",
      "doc:Specification/basic/expressions/label.tex#Label and Exit", "doc:Specification/basic/expressions/typecase.tex#Typecase Expressions",
      "doc:Specification/basic/operators/chained-multifix.tex#Chained and Multifix Operators",
      "doc:Specification/basic/expressions/method-invocation.tex#Dotted Method Invocations",
      "doc:Specification/appendices/changes.tex#The contexts that give a call an expected type",
      "doc:explorations/compile-ladder/rung-checker-expected-type/REPORT.md#8. Questions for the curator",
      "doc:explorations/compile-ladder/rung-checker-expected-type/SKEPTIC.md#2. A written static argument whose bound names a renamed parameter",
      "doc:explorations/compile-ladder/rung-checker-expected-type/SKEPTIC.md#3. An operator repeated between three operands gets no expected type",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case SAmbiguousMultifixOpExpr(info, infixOp, multifixOp, args)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala#case label@SLabel(SExprInfo(span, paren, _), name, body)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def staticArgsMatchStaticParamsForApp(",
      "The compiled checker gives a call its expected type"],
    reasons: [
      "A result-only parameter the arguments do not fix takes its bound, never Bottom: so the checker must pass in the type the text requires, at a label body and at a repeated operator.",
      "The text says the type each context gives; the checker passes it in. Row 651 is a crash where the text gives a check.",
      "The answer to batch 11's Q2: a typecase clause takes the enclosing expected type by the union rule; Q48 reads a label body the same way.",
      "Q48(a) answered yes: a label body and its exits' with values take the expected type of the whole label, by the union rule; the chapter's list and Appendix I's entry change.",
      "The count and the distance are reported and never red.",
      "Why the inference chapter's two lists change under Q48, in the amended Appendix I entry.",
      "The form of your text change: the lists revised in place with a callout, the entry amended with its reason.",
      "Your first repair: the multifix fallback drops the expected type; try the multifix application with it, else check the left-associated applications with it, as the loose juxtaposition does since rung E.",
      "Your second repair: a written static argument is checked against its bound with the other written arguments not put in; substitute them; promote both expected failures.",
      "Under Q48(a), answered yes: the label body and the with values of its exits take the expected type; promote XXXInferResultOnlyLabelBody; one site, String.fss:431.",
      "The argument faces, not yours: Q48(b) waits for the curator's answer after its probe, so XXXInferContextDrops keeps them as an expected failure; a note.",
      "Item 36's thirteen sites, twelve cleared by rung E; row 642 is the thirteenth.",
      "Rung E's renaming of a method's own static parameters, which exposed row 651's second shape; the renaming is right.",
      "The rule, and at inference.tex:128-142 the list of contexts with an expected type, whose sentence after it (:143-145) gives an operator application the type (row 644); under Q48 the label body joins the list.",
      "The chapter's end, and at inference.tex:266-268 the list of what it does not yet describe, which under Q48 loses the label body and keeps the argument of a call.",
      "The type of a label: the union of its body's last expression and its exits' with values, the form Q48 reads as a typecase's.",
      "The union rule the curator read for a typecase clause (batch 11's Q2), the model for the label body.",
      "How an operator repeated between operands is read: the multifix application where one applies, else the binary ones; the application has the expected type either way.",
      "A dotted method invocation with written static arguments, row 651's shape.",
      "Rung E's Appendix I entry: its sentence at changes.tex:2047-2051 says a repeated operator gets no expected type (row 644), which your repair makes false; amend it in the S1 form, and under Q48 its label-body sentences too.",
      "Where row 642's question was put, with its yes and no.",
      "Row 651's second shape, the trace to staticArgsMatchStaticParamsForApp, and the repair the skeptic names.",
      "Row 644 as the skeptic found it, with the program and the output.",
      "Row 644's site: the multifix try and the left-associated fallback, both without the expected type.",
      "The loose juxtaposition since rung E: the multifix try with the expected type and the fallback with it, the model for row 644.",
      "Row 642's site: the body checked with no expected type, and the exit types joined with it.",
      "Row 651's site: each written argument against its bound, the other written arguments not substituted.",
      "What rung E built: the four contexts and the renaming; your rung adds the repeated operator and, under Q48, the label body.",
    ],
    checks: [
      "positions:A type parameter the arguments do not fix", "positions:The specification stays the standard",
      "positions:The order of the work after batch 10", "positions:A label body takes the expected type", "ledger:644", "ledger:651", "ledger:642",
      "ledger:455", "doc:Specification/basic/inference.tex#The Static Arguments of a Call",
      "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie",
      "doc:Specification/appendices/changes.tex#The contexts that give a call an expected type",
      "doc:Specification/basic/expressions/label.tex#Label and Exit",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)"] }

const R_ENTRY = { id: 'R', slug: 'rung-range-kinds', path: '/home/user/fortress-rangekinds', branch: 'wip/rung-range-kinds', expectedMinutes: 85,
    writesState: false, testIsStage: true, gateJoins: [], expectedMoves: [],
    title: "The library: the ranges' last generic bodies (rows 654, 655 and, under Q50, 657), the open range's five methods under Q49 (row 656), and two slips (rows 658 and 608)",
    blurb: "the one library's last generic range bodies move to the ZZ32 kinds with their bounds check (row 655, 2 sites; under Q50, default yes, point by point at rank 2 and 3, row 657, a value walk prints), FullRange.narrowToRange over an open range types (row 654, 1 site), under Q49 (default way a) the open range's five methods get fail bodies (row 656, 5 sites), PrefixSet gets its indices as 0 # |s| (row 658, a walk stop) and ImmutableArray1 reads r'.left.get (row 608, 1 site); library declarations only, up to 9 sites.",
    section: R_SECTION,
    pointsToReport: [
      "A value walk prints that changes, each with its before and after: item 50's raise and the pin at RangeKindBodies.fss:94, item 49's five stops, and any other.",
      "A library caller of the open range's five methods, found by reading or by a stop in the interpreter suite.",
      "A new api type or declaration beyond the moved bodies, or a team declaration removed.",
      "A declaration of the reductions section edited (G's).",
      "A team test line changed.",
      "A checker or walk edit, or a site whose only repair is a checker change.",
    ],
    briefing: [
      "positions:Scalar ranges are over ZZ32 only", "positions:The library's own practice is the standard",
      "positions:The order of the work after batch 10", "positions:A range of rank 2 or 3 checks containment corner by corner",
      "positions:The checker count is measured, never red",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement", "ledger:655", "ledger:657", "ledger:654",
      "ledger:656", "ledger:658", "ledger:608", "ledger:600", "ledger:634", "ledger:659", "ledger:577",
      "doc:explorations/compile-ladder/rung-range-types/REPORT.md#9. Decisions",
      "doc:explorations/compile-ladder/rung-range-types/REPORT.md#10. Defects and their homes", "doc:Specification/basic/expressions/ranges.tex#Ranges",
      "code:Library/RangeInternals.fss#checkSelection", "code:Library/FortressLibrary.fss#trait Range[",
      "code:Library/FortressLibrary.fss#trait BoundedRange[", "code:Library/FortressLibrary.fss#trait FullRange",
      "code:Library/RangeInternals.fss#trait BoundedRange2D",
      "code:Library/RangeInternals.fsi#opr SCMP(a: ZZ32, b: ZZ32): Comparison..opr PCMP(a: (ZZ32, ZZ32, ZZ32), b: (ZZ32, ZZ32, ZZ32)): Comparison",
      "code:Library/FortressLibrary.fss#object TrivialOpenRange", "code:Library/FortressLibrary.fss#trait ZeroIndexed",
      "code:Library/PrefixSet.fss#value object IndexValuePrefixSetGenerator", "The one library's range types provide a declaration on the meet",
      "The one library's scalar ranges are over"],
    reasons: [
      "Scalar ranges are over ZZ32 and the public range traits stay generic: the bounds check moves to the ZZ32, pair and triple kinds with its callers (item 40, way a).",
      "Each repair in the library's own spelling: a body its declared type cannot hold is a fail (Q49), the ranges' own order is PCMP (Q50), a missing indices is written as ZeroIndexed writes bounds (row 658).",
      "The answer to batch 11's Q3: item 40's way (a), the generic bodies moved to the ZZ32 kinds, which row 655's move completes.",
      "Q50 answered (a): the moved check compares rank-2 and rank-3 bounds point by point with PCMP, and the pin at RangeKindBodies.fss:94 changes to the raise, its before and after listed.",
      "The count and the distance are reported and never red; they are your rung's test, before from batch 11's landed tables.",
      "The library rule as the curator reads it: extend only where the library has a form for one type, rank or sibling and lacks it for another, and cite the precedent line; row 658's 0 # |s| cites ZeroIndexed's bounds.",
      "Your main move: checkSelection's > and < on I, two sites; it moves to the ZZ32 kinds with its three generic callers, which become abstract in the generic traits.",
      "Under Q50, answered (a): the rank-2 and rank-3 checks compare point by point with PCMP, a value walk prints; the pin at RangeKindBodies.fss:94 changes with its before and after listed.",
      "FullRange.narrowToRange over an open range, one site: the sibling's typecase, a FullRange meet, or a body at each ZZ32 kind; the library's own way, and why.",
      "Under Q49, his word pending after P3 measured way c, at the default way a: fail bodies for the open range's five methods, five sites; five values walk prints become stops, listed.",
      "PrefixSet declares no indices, a walk stop: 0 # |s|, as ZeroIndexed's bounds; one walk test failing on the base.",
      "ImmutableArray1 reads r'.lower where FullRange declares left: r'.left.get as the Array1 twin reads, the stride kept; one site.",
      "Item 40's row, closed by rung L: the eleven sites it cleared and the seven it left, rows 655 and 656; how it moved CMP, FORWARD_CMP and |self| to the ZZ32 kinds, the model for your move.",
      "The tuples' lexicographic order the generic check dispatches to today, and the team's doubt about it; under Q50 the moved check uses PCMP instead.",
      "A stop you do not touch: a bounded range of rank 2 or 3 strided both ways; a note if your move meets it.",
      "The distance stage's classes read by stale line ranges: count your sites by row, never by class.",
      "Rung L's decisions: what it moved and how (3, 5, 8, 9), and what it left for you (4, 6, 7), with the ways it did not take.",
      "The rows rung L opened, 654 to 659, each with its home and its measurement.",
      "The text describes no range of rank 2 and no method of the open range; your text change is none.",
      "The bounds check you move, with its two comparisons on I.",
      "The first generic caller, Range.narrowToRange(other: Range[I]), which becomes abstract.",
      "The second generic caller.",
      "The third generic caller, rung E's site, and row 654's sibling body beside it.",
      "Batch 11's named meet of rank 2 with its fail bodies, a precedent for Q49's way and a kind that takes a moved body.",
      "The comparisons declared at ZZ32 and the two tuple types, PCMP among them: what the moved checks compare with under Q50.",
      "The open range's object and its five methods, row 656's sites, under Q49.",
      "The precedent line for row 658: bounds written as 0 # |self|.",
      "Row 658's site, the indices that read s.indices.",
      "What batch 9's rung R and batch 11's rung L built for the ranges, which your rung completes.",
      "Batch 7R's ZZ32 kinds, the model for moving the generic bodies.",
    ],
    checks: [
      "positions:Scalar ranges are over ZZ32 only", "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:A range of rank 2 or 3 checks containment corner by corner", "ledger:655", "ledger:657", "ledger:654", "ledger:656", "ledger:658",
      "ledger:608", "doc:explorations/compile-ladder/rung-range-types/REPORT.md#9. Decisions", "code:Library/RangeInternals.fss#checkSelection",
      "code:Library/FortressLibrary.fss#trait ZeroIndexed"] }

const G_ENTRY = { id: 'G', slug: 'rung-reduction-types', path: '/home/user/fortress-reductions', branch: 'wip/rung-reduction-types', expectedMinutes: 95,
    writesState: false, testIsStage: true, gateJoins: [], expectedMoves: [],
    title: "The library: the reductions' three Any devices typed at the element type (row 628)",
    blurb: "the identity-less reductions' three Any devices are typed at the element type, simpleJoin(a: R, b: R): R, lift(r: R) and the lifted type Maybe[\\R\\] where AnyMaybe stood, in the two traits, the lifted monoid wrapper and the declared types of the identity-less big operators in FortressLibrary and Set (row 628, 13 sites, or 12 with MonoidReduction's lift left under P2's outcome (ii)), on probe P2's reading that no library big operator's unwritten clause form that runs today stops under walk once the devices are typed; library declarations only.",
    section: G_SECTION,
    pointsToReport: [
      "A big operator whose unwritten clause form stops under walk after the typing, with the operator, its parameter's bound and the stop.",
      "A value walk prints that changes, each with its before and after.",
      "An api declaration changed beyond the lifted type of the identity-less reductions and their big operators (FortressLibrary.fsi, Set.fsi).",
      "Row 433's two distribute sites or row 473's expected failure moving.",
      "A declaration of the ranges section edited (R's).",
      "A team test line changed.",
      "A checker or walk edit.",
    ],
    briefing: [
      "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:A type parameter the arguments do not fix", "positions:SUM and PROD without the Number catch-all",
      "positions:The checker count is measured, never red", "positions:Maybe's empty case", "ledger:628", "ledger:424", "ledger:425", "ledger:645",
      "ledger:473", "ledger:433", "ledger:436", "ledger:631", "doc:explorations/reviews/p1-judgement.md#5. Points still open",
      "doc:explorations/reviews/p1-judgement.md#3. The work for batch 11",
      "doc:explorations/compile-ladder/rung-generator-slips/REPORT.md#8. The sites left, each with its row",
      "doc:Specification/basic/expressions/reductions.tex#Summations and Other Reduction Expressions",
      "doc:Specification/basic/expressions/if.tex#If Expressions", "code:Library/FortressLibrary.fss#trait AssociativeReduction",
      "code:Library/FortressLibrary.fss#object LiftedCommutativeMonoidReduction", "code:Library/FortressLibrary.fss#trait MonoidReduction",
      "code:Library/FortressLibrary.fss#object MinReduction", "code:Library/FortressLibrary.fss#object NewlineReduction",
      "code:Library/FortressLibrary.fsi#trait AssociativeReduction", "code:Library/FortressLibrary.fsi#trait ActualReduction",
      "code:Library/FortressLibrary.fss#value trait AnyMaybe", "code:Library/Set.fss#object Intersection",
      "code:Library/FortressLibrary.fss#object UniqueItemMeetReduction",
      "Under walk, a type parameter whose bound mentions itself and that nothing at a call fixes is left open"],
    reasons: [
      "Each repair in the library's own spelling: the devices typed at the type the api and the sibling Set already write, and nothing new declared.",
      "The library rule as the curator reads it: your rung extends nothing; where you write a type anew, cite the line that already writes it, Set's Intersection and the api's lift(r: R).",
      "The instance rule: never Bottom. Walk leaves an F-bounded parameter open since batch 11, which is what lets the typed reductions run; D2's plain bounds still get Bottom, which probe P2 measured.",
      "Why the reductions carry Any devices: answer 7 took the Number catch-all away, and walk then gave an unwritten static argument Bottom.",
      "The count and the distance are reported and never red; they are your rung's test, before from batch 11's landed tables.",
      "Maybe's parametric spelling Nothing[T] is the one library's: the lifted type you write is Maybe[R], never a bare Nothing.",
      "Your repair: simpleJoin and lift at R, the lifted type Maybe[R] where AnyMaybe stood, in the two traits, the lifted monoid wrapper and the identity-less big operators' declared types; 13 sites, MonoidReduction's lift under P2(b).",
      "The F-bounded half closed by rung W: walk leaves the parameter open, so a typed simpleJoin accepts every element.",
      "The checker's side: an unwritten reduction is still refused compiled; not yours.",
      "The empty reduction's identity under walk, an expected failure that keeps its verdict; not yours.",
      "BIG MINMAX's open half, an expected failure that keeps its verdict or moves: a point to report.",
      "The fusion pairs' distribute, which declares PossibleReductionPair[AnyMaybe]: it follows the lifted type's spelling, its bounds stay, its six sites stay; a point to report if they move.",
      "The identities' else => 0, not yours: additiveIdentity and multiplicativeIdentity stay as they are.",
      "embiggen's Comprehension[T,T,Any,Any], its own Any devices and a team test line; not yours.",
      "D2's case, a big operator's plain-bounded parameters at Bottom: what P2 measured against your typing, and what stays out.",
      "The judgement's records paragraph on row 628: typing the reductions at their element type is this rung, after rung W.",
      "Batch 10's rung G on the thirteen sites it left under row 628, with the two stops it measured before rung W.",
      "The operators your reductions implement; the text describes no lifting, so your text change is none.",
      "The generator binding if av <- a, which needs a Condition: why the lifted type must be Maybe[R], not AnyMaybe.",
      "The trait with all three devices: simpleJoin(a: Any, b: Any), the AnyMaybe join and lift(r: Any).",
      "The lifted monoid wrapper, also over AnyMaybe, which takes the same lifted type.",
      "lift(r: Any): R = r against the api's lift(r: R): the one-line device, one site, typed under P2(b) only.",
      "An implementer that declares simpleJoin without types; the eight implementers are the abstract-method sites.",
      "The implementer at String, the eighth site.",
      "The api's declarations you make the component meet: lift(r: R), and the lifted type you change there too.",
      "The abstract reduction with lift(r: R) and unlift(l: L), the shape every device must meet.",
      "The trait that stays: Maybe extends it and HasRank excludes it.",
      "The sibling that already names Maybe[Set[E]] as its lifted type: your precedent line.",
      "A monoid reduction under a plain-bounded big operator, BIG SQCAP[T]: its unwritten clause form stops on the base and on P2's shadows (D2's case), so your test leaves it out.",
      "What rung W built: the open parameter, every value passing where walk checks against it, and the cases that still get Bottom.",
    ],
    checks: [
      "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:A type parameter the arguments do not fix", "ledger:628", "ledger:433", "ledger:473",
      "doc:explorations/reviews/p1-judgement.md#5. Points still open", "code:Library/FortressLibrary.fss#trait AssociativeReduction",
      "code:Library/FortressLibrary.fsi#trait AssociativeReduction", "code:Library/Set.fss#object Intersection"] }

const S_ENTRY = { id: 'S', slug: 'rung-library-slips', path: '/home/user/fortress-libslips', branch: 'wip/rung-library-slips', expectedMinutes: 110,
    writesState: false, testIsStage: true, gateJoins: [], expectedMoves: [],
    title: "The library: the arrays' slips that need no fork (28 sites), String's left and right (row 606, item 42) and QQ's ceiling and truncate (row 635, item 44)",
    blurb: "the one library's slips that need no answer to the array forks, the storing objects __DefaultVector, __DefaultMatrix and TransposedMatrix taking the bound Number their traits have (19 sites, way 6b) and nine one-off slips of the arrays and SUFFIX_SUM in the library's own spelling (9 sites), and under the curator's answers String's left and right answering Just of the character (row 606, item 42, 2 sites) and QQ's ceiling and truncate raising at the infinities and 0/0 with the specification's paragraph revised in the S1 form (row 635, item 44, 2 sites); library declarations, their tests and one paragraph of the specification, 32 sites.",
    section: S_SECTION,
    pointsToReport: [
      "A value walk prints that changes, each with its before and after: String's left and right, QQ's ceiling, truncate, floor, round and the two brackets at the infinities and 0/0, and any other.",
      "An array site that needs an answer to the array forks or a list of ways moved or touched, or a site that comes, with __immutableFactory1's own body at :2432 among them.",
      "An api declaration changed beyond __immutableFactory1's result type, or a team declaration removed.",
      "A change to which declaration walk runs for a set it loads today, a transposed matrix's operators among them.",
      "A declaration of R's or G's sections edited, ImmutableArray1's opr[] at :2255 among them.",
      "A team test line changed.",
      "Normative text changed beyond numbers.tex's paragraph and its new Appendix I entry.",
      "A checker or walk edit.",
    ],
    briefing: [
      "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:String's left and right answer Just(c)", "positions:QQ's ceiling and truncate keep ZZ",
      "positions:The array design's three questions are open", "positions:The integration review's checks",
      "positions:The specification stays the standard", "positions:Every change to the specification is recorded with its reason", "positions:The S1 form",
      "positions:The checker count is measured, never red", "ledger:606", "ledger:635", "ledger:437", "ledger:330", "ledger:577",
      "doc:explorations/reviews/array-forks-now.md#None of the six: 28",
      "doc:explorations/reviews/array-forks-now.md#Fork 2, the bound of Vector and Matrix: 44",
      "doc:explorations/reviews/array-design-ways.md#7. Question 6: the bounds that give Vector and Matrix their arithmetic",
      "doc:Specification/basic-lib/numbers.tex#Rational Numbers", "doc:Specification/appendices/changes.tex#The rational trait",
      "code:Library/FortressLibrary.fss#floor(self):ZZ = if self < 0..round(self): ZZ = do x", "code:Library/FortressLibrary.fss#object __DefaultVector",
      "code:Library/FortressLibrary.fss#object __DefaultMatrix", "code:Library/FortressLibrary.fss#object TransposedMatrix",
      "code:Library/FortressLibrary.fss#trait Matrix[", "code:Library/FortressLibrary.fss#():ReadableArray1[",
      "code:Library/FortressLibrary.fss#object __ImmutableSubArray1", "code:ProjectFortress/LibraryBuiltin/NativeArray.fss#object PrimImmutableArray[",
      "code:Library/FortressLibrary.fss#opr SUFFIX_SUM", "code:Library/List.fss#getter left(): Maybe[..getter right():Maybe["],
    reasons: [
      "Each repair in the library's own spelling, its precedent line named: the bound the traits have, a twin factory's own type, a sibling with no put, the parallel block, List's Just.",
      "The library rule as the curator reads it: your rung extends nothing; each repair writes what the library already has, in the shape it has it, and cites that line.",
      "Item 42 answered: String's left and right answer Just of the character; the pins at StringPieces.fss:35-36 and :60-61 change, each before and after listed.",
      "Item 44 answered: QQ's ceiling and truncate keep ZZ and raise at the infinities and 0/0; the numbers.tex paragraph is revised; the pin at NumberOrderListDeclarations.fss:23 changes.",
      "What your rung leaves alone: the array design's questions, and every array site that needs an answer to a fork or a list of ways.",
      "No blanket ring bound on the array traits: the storing objects take Number, the bound their traits already have, and nothing more.",
      "The text is the standard: under item 44 the curator chose the declared integer result over the paragraph, which is revised so that it does not stay false.",
      "Why the rational paragraph changes: a new Appendix I entry with the reason, the original sentence and route C.",
      "The form of your text change: the paragraph revised in place with a callout, and the entry with its reason.",
      "The count and the distance are reported and never red; they are your rung's test, before from batch 11's landed tables.",
      "String's left and right answer a Char where they declare Maybe[Char]: two sites; the repair answers Just of the character.",
      "QQ's ceiling and truncate answer the rational itself at an infinity and 0/0: two sites; the repair raises there.",
      "matrix(v)'s numeral 0, not yours: its repair's form follows the bound of Vector and Matrix, so its site stays.",
      "The float types' rounding, which QQ is to follow later, after the switch-over: not yours.",
      "The distance stage's classes: count your sites by row and line, never by class.",
      "The nine one-off slips among the array sites no fork clears, and the groups beside them that are not yours.",
      "The storing objects' 19 bound errors, way 6b, a slip under every way, and the fork-2 sites that stay.",
      "Way 6b measured on 2026-09-29: 19 of the 21 bound errors gone and none new, and walk's seven array tests printing the same.",
      "The paragraph you revise: the method entries type the rounding methods Z, and the sentence after says they return the argument at an infinity.",
      "The entry that revised the same sentence's opening words; your new entry names it.",
      "QQ's rounding methods: ceiling and truncate, which you change, and floor, round and the brackets that call them.",
      "The first storing object: its T has no bound, under Vector, whose T extends Number.",
      "The second storing object, under Matrix.",
      "The third storing object, whose add, subtract and negate call methods Matrix does not declare.",
      "Matrix's operators the transposed methods can call, and mul's local functions that end in a parallel pair.",
      "__immutableFactory1, declared ReadableArray1 where its two callers need ImmutableArray1; its twin __builtinFactory1 sits above it.",
      "The immutable subarray whose put calls a put that ImmutableArray1 does not declare.",
      "The immutable store, the subarray's sibling, which declares no put: your precedent.",
      "SUFFIX_SUM's seq over a strided Range, which no seq takes; PREFIX_SUM just above it is the precedent.",
      "The precedent for String's getters: List's left and right answer Just of the element.",
    ],
    checks: [
      "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:String's left and right answer Just(c)", "positions:QQ's ceiling and truncate keep ZZ",
      "positions:The array design's three questions are open", "positions:The S1 form", "ledger:606", "ledger:635",
      "doc:explorations/reviews/array-forks-now.md#None of the six: 28",
      "doc:explorations/reviews/array-forks-now.md#Fork 2, the bound of Vector and Matrix: 44", "code:Library/FortressLibrary.fss#object TransposedMatrix",
      "code:Library/FortressLibrary.fss#():ReadableArray1["] }

const RUNGS = [W_ENTRY, C_ENTRY, R_ENTRY, G_ENTRY, S_ENTRY]
const BATCH_INTRO = "This run is climb batch 12, the record CLIMB-BATCH-12.md, phase 3's next batch after 11, toward the checker at a true zero: one walk rung, one checker rung and three library rungs. The curator has answered Q48's part (a), Q50 and items 42 and 44; rung R runs at Q49's default until he answers it, and rung G on probe P2's outcome (i). The distance stands at 207 and the count at 1 after batch 11 (compile-ladder/climb-batch-11/gate/). The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another rung of the batch. W edits walk alone, C the checker alone, R, G and S the library: all three edit Library/FortressLibrary.fss and .fsi, R in the ranges section and at ImmutableArray1's range subscript, G in the reductions section, S in the numbers, arrays and strings sections, at SUFFIX_SUM and at one api factory, none of R's or G's declarations; R alone edits RangeInternals and PrefixSet, G alone Set. ProjectFortress/tests/ takes W's, R's, G's and S's distinct files, ProjectFortress/compiler_tests/ C's. C and S edit the specification in different passages: C the inference chapter and its Appendix I entry, S the rational numbers' paragraph and a new Appendix I entry. R's, G's and S's library changes all move sites of component FortressLibrary, and W's load checks read every component walk loads; the gate measures and runs the merged tree. ant testSpecData runs in the gate because batch 11's landed summary has it."
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
// The head every role's brief opens with (the cold reader's excepted). Agents share the
// prompt cache only for the system prompt and tools, and the first message only when the
// whole prompt is identical (FACTS.md, "The Workflow harness runs two agents at once on this
// box"), so a head shared byte for byte saves nothing, and each role is given only what it
// needs. What every agent needs to know of how to work here is the fortress-repo skill's,
// which CLAUDE.md has every agent load (POSITIONS.md, "The skills are written for a reader new
// to the repository ..."): the head points there and does not repeat it.
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
'   The after runs once, on your final code, after your last edit is built, into tmp/' + rung.slug + '/: the count (20 s) at once, and the distance (13 to 24 minutes, one core) in the background, started with nohup in the form of the skill\'s session.md, "Long commands", and read when your report is written:',
'',
'        ' + COUNT_RUN + ' tmp/' + rung.slug + '/checker-count-postedit.txt tmp/' + rung.slug + '/cc-post',
'        nohup bash -c \'( ' + DIST_RUN + ' tmp/' + rung.slug + '/distance-postedit.txt tmp/' + rung.slug + '/dist-post ) > tmp/' + rung.slug + '/distance-run.txt 2>&1; echo EXIT=$? >> tmp/' + rung.slug + '/distance-run.txt\' >/dev/null 2>&1 &',
'',
'   Its before is ' + LANDED_TABLES + ': never run a stage on your unchanged base, and never run a stage\'s driver on part of the library on code the full stage then measures (POSITIONS.md, "No re-measuring what the record holds."). Put in REPORT.md the diff of the count tables, what ' + DIST_COMPARE + ' prints for the distance tables, and each site that moved, read through tmp/' + rung.slug + '/dist-post/errors.tsv against the per-site list by row, not by the stage\'s class (row 577). Commit no table: the gate\'s tables on the merged tree are the record.',
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
...(mode === 'repair' ? [sliceStep([rung], 'your worktree', '2. Before anything else,').join('\n')] : briefingStep(rung, 2)),
rung.testIsStage
  ? '3. The test. Step 7 below is this rung\'s test for the library\'s sites; the walk tests your section names are written first, as the skill\'s tests-writing.md, "The order", says.'
  : '3. The test, first, as the skill\'s tests-writing.md says ("The order"; "Promoting an XXX test"): the essence of the defect as a clean minimal program named by its topic, seen failing through the harness on the base\'s code in a run that ends before your edit is first built (under walk, before you edit a library source it reads), then the fix, then the test seen passing in your last run after your last change of code. The test and the fix may share a commit. ' + (mode === 'repair' ? 'The merged-diff review reads this order in your transcript' : 'Your skeptic reads this order in your transcript') + ' and runs nothing again, so the failing run goes through the harness, never only by hand. A rung that edits only prose has no test; its text is checked against the tree and the decisions on record.',
'4. Where the fix belongs, before you edit: explorations/coordinator/map/spec-to-implementation.md and modules-and-phases.md for the place, the skill\'s library.md for the library\'s own way. Where a precedent repaired the same defect, count the other sites in its file and give the number. List every way the language and the library offer before you choose, and put the choice in your decisions with the ways not taken.',
'5. The edit, as small as the test needs, and the build it needs (the skill\'s build-and-caches.md, "Building" and "After an edit of the library").',
'6. Whole suites, only as the skill\'s tests-running.md says ("When to run a whole suite"): once for each code state, after your last edit, when your edit changes Java or Scala of the checker, of walk or of a phase both share; your own tests otherwise. The gate is another agent\'s: run only the suite that part names for your edit (ant testQuick for the checker, ant testSystem for walk, both for a shared phase), once, and never the gate\'s whole set.',
...stagesStep(rung, 7),
'8. Every defect you measure gets one of the three homes of the skill\'s tests-writing.md ("How a defect is recorded"), and REPORT.md says which and why. A new ledger row goes in record.md in the row template of ' + LEDGER + ' (its header), with NEW-' + rung.id + '-1, NEW-' + rung.id + '-2 for its number, also where a test or a report cites it: the gather adds the rows through ' + LEDGER + ' and puts their numbers in. Never run ' + LEDGER + ' add or note yourself. The first XXX test you add is shown red on a deliberate fix, through the harness (tests-writing.md, "Writing an XXX test").',
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
'- record.md: the record lines the gather folds, as finished prose. The FACTS.md entry the rung earns (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md). Each ledger note (the row, and the text to append). Each new row (NEW-' + rung.id + '-n, in the row template). The handover line. And the entry for the skill\'s part on what the revival changed in the team\'s Fortress, ' + DELTA_PART + ', in that part\'s form and register (explorations/reviews/skills-writing-principles.md), when your change makes the revival\'s Fortress differ from what one of the team\'s sources (the specification, walk, the compiler, the library) says or does; otherwise the line "Revival change: none", with the reason.',
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
  : '1. The count and distance tables the report declares, against the worker\'s files under tmp/' + rung.slug + '/, a file read; or, where the report says neither stage ran, that git diff --name-only ' + BASE + '...HEAD lists no path outside ' + STAGE_BLIND_TEXT + '.'),
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
'9. The report: its five provenance lines, each cited line opened with sed -n and saying what the line claims; the sentences of the specification the change makes false, listed; the whole-suite run the skill asks of a checker or walk edit, its verdict, command and commit those of the head; every point to report the rung reaches; record.md\'s FACTS entry, notes, rows and revival-change entry true as written.',
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
'- Settled or contested. A fix is settled when the rung\'s section, the specification or a decision on record says that what your fix makes the code do is right: cite that sentence with the fix. A fix is contested when (a) the worker\'s report argues for the behaviour your fix changes, not only for its form; or (b) nothing on record settles it and you chose among ways; or (c) it touches a path the section does not give the rung, or reaches a point to report. Make a contested fix all the same, in a commit of its own, and list it in contested with the worker\'s argument and yours: a judge rules on it alone, and may revert it.',
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
    gate: 'The gate is red on the merged tree. Read the failing evidence and decide the repair. The ways the gate is red: a failing or erroring JUnit suite (ProjectFortress/TEST-RESULTS/); a suite whose test count fell against the last landed summary, which usually means a .test file or a tests= line went missing; a FAIL or a repeated timeout in the four-thread atomic runs, a lost update in the transaction run time; a ladder regression, a file that compiled and ran before reaching a lower phase or printing other output; a failing example of testSpecData once it is a gate step; and, from the checker count, a crash line no rung declared or a stale checker shadow (its total is reported and never red, and the distance stage is never red). Find the source of the conflict as a whole and rework that part in the merged batch; dropping a rung is the retreat, taken only when its approach is wrong.',
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
'Ascending order of each rung\'s lowest edited line in the files two or more rungs share, so that a later rung\'s hunk does not shift the lines a landed record cites: work it out from git diff ' + BASE + '...<branch> per branch before you apply anything, and say in your result what order you chose and why.',
'',
'## For each rung, in that order',
'',
'1. Its net change: git diff ' + BASE + '...<branch> > tmp/gather/<slug>.patch, then git apply --3way --index on it. A hunk that fails in a file another rung also touched is the conflict this stage exists to see: in unrelated regions, resolve it by hand from both sides and say so; where both changed the same logic, do not guess: leave the tree clean, and return with the conflict named. Then its files under explorations/compile-ladder/<slug>/. The branch carries REPORT.md and record.md where the skeptic wrote them from the run\'s journal, and SKEPTIC.md. Where it lacks one, run that file\'s command from textCommands below, from ' + MAIN + ' (the journal tool finds the journal itself), and compose nothing; where the rung had a repair round (repaired true), run the REPORT.md and record.md commands even where the branch carries the files, since the repair round\'s texts replace the worker\'s. A command that exits 1 wrote nothing: report the file missing; so is a SKEPTIC.md whose text is only the word committed.',
'2. Its record, record.md, folded. The FACTS.md entry under the section of its area (the file\'s README gives the rule), after the section\'s last entry: the fact, its source and its test in a few lines. Each ledger note with ' + LEDGER + ' note N "TEXT". Each new row: its line, its number cell ?, into a file under tmp/gather/, then ' + LEDGER + ' add FILE --section "TITLE", the section its writer names or the one its class fits; the tool numbers it and checks it against the template, and a row it refuses you correct to the template, keeping its claim. Replace the row\'s placeholder (NEW-<rung>-<n>) with its number everywhere the rung\'s files and tests cite it, before the rung\'s commit. The handover line in the first section of explorations/microgpt-run-c-handover.md. The rung\'s entry for the skill\'s part on the revival\'s changes, ' + DELTA_PART + ': where record.md has one, put it into that part in the part\'s form, in the group it belongs to, as the rung wrote it but for what the part\'s form needs; and if the skill\'s references/sources.md has a section for that part, one line there naming the rung\'s REPORT.md. If the part does not exist, fold nothing into .claude/ and list the entries in deltaEntries as not folded, for the coordinator. Any file:line a record cites that an earlier rung\'s hunk shifted is re-anchored by symbol.',
'3. The corrections still owed: each leftForGather item of the rung\'s skeptic, below; each sentence of the specification that the rung\'s REPORT.md lists as made false by its change and that the rung did not edit, an Appendix I Effect or a note on walk or the compiled path, corrected to what the code does, each clause checked against the code line it states. Such a sentence states what the code does, so it is not a text mismatch.',
'4. Its items for the curator, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, at the line it is now at.',
'   A text mismatch is not blocking. Where one rung\'s specification text and another rung\'s code disagree and the decisions on record settle it, fix the side they settle. Where they do not, it is reversible and lands as a point to report: the text stands as the rung wrote it; the path that departs gets a ledger row and a gated XXX test asserting the text\'s rule; the text\'s entry in Specification/appendices/changes.tex names that row among its departures; all in the later rung\'s commit, and the mismatch goes in your forCurator.',
'5. One commit: the applied source and tests, the rung\'s REPORT.md, SKEPTIC.md and JUDGE.md if any, a decision record if it has one (record.md is folded, not landed: take it out of the index and the tree once step 2 has folded it), FACTS.md, the ledger and its history file, the handover, PLAN.md when step 4 wrote to it, and ' + DELTA_PART + ' (and sources.md) when step 2 wrote to it. Stage them by an explicit list and read git diff --cached --stat before you commit. Title: what the repair does, in plain words; body: the two or three sentences of record.md that say why, and where the commit touches any path outside explorations/ and .claude/, a line beginning "historical:" naming the files of the original 2012 tree it edits, from the provenance block. The skill\'s footer. Do not push.',
'',
'## After the rungs',
'',
'6. Close each row a landed rung fixed, as its rowsClosed and REPORT.md name it, once its test passes on the merged tree as the rung last ran it: ' + LEDGER + ' close N --commit <the rung\'s commit on main> --test <the test>. Then ' + LEDGER + ' check. One commit, titled "Close the rows climb batch ' + BATCH + ' fixed".',
'7. ' + BATCH_DIR + '/RECORD.md: the rungs applied, in what order and why, each with its commit hash; the rows opened (number, rung, claim) and closed; each skeptic\'s fixes and contested rulings, by commit; every file written from the journal; the rungs that did not land (below); the points to report every landed rung reached, from the lists below; the items for the curator and where each is in PLAN.md. One commit.',
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
'Return the structured result the tool requires: each rung\'s commit hash, the order and why, the conflicts and how each was resolved, the rows opened and closed, the entries for ' + DELTA_PART + ' and whether each was folded, forCurator (your own points, a text mismatch the decisions do not settle among them, as gather.1, gather.2), curatorItems, one entry for every id above and every gather.N with the PLAN.md section and entry that holds it, and curatorUnrouted, every id you could not put in, with the reason. Nothing waits on these: the batch goes on to its review, gate and commit either way.',
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
    rowsOpened: { type: 'array', items: { type: 'string' }, description: 'one line per row added: its number, its placeholder and its rung' },
    rowsClosed: { type: 'array', items: { type: 'string' }, description: 'one line per row closed: its number, the commit and the test' },
    deltaEntries: { type: 'array', description: 'the rungs\' entries for the skill\'s part on the revival\'s changes', items: { type: 'object', properties: {
      rung: { type: 'string' }, title: { type: 'string' }, folded: { type: 'boolean' } }, required: ['rung', 'title', 'folded'] } },
    notLandedFolded: { type: 'array', items: { type: 'string' } },
    head: { type: 'string', description: 'the hash HEAD is at when you finish' },
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every point for the curator this gather finds itself, one entry each with its evidence as file:line; each goes into PLAN.md as gather.1, gather.2 in this order; empty if none' },
    curatorItems: CURATOR_ROUTED,
    curatorUnrouted: { type: 'array', description: 'every item for the curator you could not put into PLAN.md, for the coordinator; empty if none', items: { type: 'object', properties: {
      id: { type: 'string' }, why: { type: 'string' } }, required: ['id', 'why'] } },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'deltaEntries', 'curatorItems', 'curatorUnrouted', 'summary'],
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
'The rungs were checked one at a time in their own worktrees; nobody has yet read the changes together, nor the record as the gather folded it. You read both. THE GATE IS RUNNING BESIDE YOU in this same tree, on the gather\'s commits: keep your own corrections inside explorations/ and ' + DELTA_PART + ', and the gate\'s result stands.',
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
'3. The folded record as a whole: every FACTS line true as written, sourced and checkable; every ledger note and new row in place (' + LEDGER + ' check passes; no NEW- placeholder left where a row is cited: grep -rn "NEW-[A-Z]-[0-9]" explorations/fortress-gap-ledger.md explorations/coordinator/FACTS.md explorations/coordinator/PLAN.md explorations/compile-ladder/ ProjectFortress/ ' + DELTA_PART + ', where a line of the batch\'s RECORD.md that gives a placeholder beside its number is not a finding, and the batch record and the synthesis under explorations/coordinator/, which name the form as an example, are not searched); every row the gather closed fixed by a landed commit; the handover\'s first section consistent; the entries the gather put into ' + DELTA_PART + ' true of the code as landed.',
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
// The cold read: whenever a batch writes skill text, an agent given only the skill reads it as
// the workers who use it would (POSITIONS.md, "The skills are written for a reader new to the
// repository ...": a cold reader given only the skill reads each rewritten part before the
// curator does; the gather's fold into the revival-changes part is such text, so it gets the
// same read: batch-redesign.md, "The cold read of new skill text"). Its brief carries nothing
// of the batch, so that it reads cold. It fixes what changes no claim, and returns what would.
// ---------------------------------------------------------------------------

function coldReadRole() {
  return [
'# Your role: cold reader of new text in the fortress-repo skill',
'',
'You work in ' + MAIN + ', on main. Read .claude/skills/fortress-repo/SKILL.md, then ' + DELTA_PART + ' whole, as an agent new to this repository would, given only the skill: you know nothing of the batch that wrote it, and you read nothing else of the record. The entries to judge are those this command shows, added or changed since ' + BASE + ':',
'',
'    git -C ' + MAIN + ' diff ' + BASE + ' HEAD -- ' + DELTA_PART,
'',
'For each passage of those entries that would send such a reader wrong or make it search, flag it with your confidence: a term not defined where it is used, a claim a reader could not check, a sentence that reads two ways, a gotcha the entry leaves out, a sentence that breaks the part\'s register (explorations/reviews/skills-writing-principles.md, which you may read for the register only). Fix in place each flag whose fix changes no claim of the entry: its wording, a term defined, a reference made exact. Do not fix a flag whose fix would change what an entry claims (the team\'s source it contradicts, the revival\'s resolution, or the reason): return it in forCoordinator, unfixed. Commit your fixes locally in one commit titled "Cold read of the revival\'s changes, climb batch ' + BATCH + '", with the footer of the skill\'s committing.md, naming that one path: git add -- ' + DELTA_PART + ' && git commit -m ... -- ' + DELTA_PART + ', since the gate runs in this tree beside you; do not push. If a git command fails on index.lock, wait five seconds and retry, up to four times.',
'',
'Return the structured result: every flag with its passage, its confidence and whether you fixed it, and forCoordinator.',
'',
  ].join('\n')
}

const COLDREAD_SCHEMA = {
  type: 'object',
  properties: {
    flags: { type: 'array', items: { type: 'object', properties: {
      passage: { type: 'string' }, problem: { type: 'string' }, confidence: { type: 'string', enum: ['high', 'medium', 'low'] }, fixed: { type: 'boolean' } }, required: ['passage', 'problem', 'confidence', 'fixed'] } },
    forCoordinator: { type: 'array', items: { type: 'string' }, description: 'each flag whose fix would change a claim, unfixed' },
    commit: { type: 'string', description: 'the hash of your commit, or empty if you fixed nothing' },
    summary: { type: 'string' },
  },
  required: ['flags', 'forCoordinator', 'summary'],
}

// ---------------------------------------------------------------------------
// The gate. Its steps and their reasons are the skill's gate.md, which this role follows; what
// stands here is what the skill points to the script for: the shell functions that write and
// compare the summary, the atomic runs' lines in it, the ladder's comparison, the checker count
// and the distance stage (the ladder's metrics, which the skill does not carry: POSITIONS.md,
// "The skills are written for a reader new to the repository ..."), testSpecData once a rung
// brings it, and the machine line. It commits nothing: the review commits in this tree beside it,
// and the commit stage lands its outputs.
// ---------------------------------------------------------------------------

const ATOMIC_OTHER = 'atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 nestedTransactions0 nestedTransactions1 nestedTransactions2'
const ATOMIC_COMPILER = 'AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG'
const MACHINE = 'explorations/compile-ladder/rung-flat-tower/machine.sh'

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
'5. The summary, with the machine it ran on, and its comparison with the last landed one. Run exactly this, from ' + MAIN + ':',
'',
'        gate_summary () {                 # gate_summary <log-dir> <out-file>',
'            local L="$1" O="$2" R="$FORTRESS_HOME/ProjectFortress/TEST-RESULTS" f',
'            {',
'              printf \'#suite\\ttests\\tfailures\\terrors\\tskipped\\n\'',
'              for f in "$R"/fast-*/TEST-*.txt "$R"/system-*/TEST-*.txt "$R"/TEST-*SpecDataJUTest.txt ; do',
'                [ -f "$f" ] || continue',
'                awk -v track="$(case "$(basename "$(dirname "$f")")" in TEST-RESULTS) echo specdata ;; *) basename "$(dirname "$f")" ;; esac)" -F\'[ ,:]+\' \'',
'                  /^Testsuite:/ { n = split($2, p, "."); s = p[n] }',
'                  /^Tests run:/ { print track "/" s "\\t" $3 "\\t" $5 "\\t" $7 "\\t" $9 ; exit }\' "$f"',
'              done | sort',
'              for f in compileAll testFast testSystem testSpecData ; do',
'                [ -f "$L/$f.txt" ] && grep -h \'^BUILD \\|^Total time:\' "$L/$f.txt" | sed "s|^|# $f: |"',
'              done',
'              bash ' + MACHINE + ' "gate batch ' + BATCH + '" | sed \'s|^|# machine |\'',
'            } > "$O"',
'        }',
'',
'        gate_compare () {                 # gate_compare <last-landed-summary> <this-summary>; prints the red lines, exit 1 if any; the system-<i> rows are one suite split by sorted index, so compared by their sum',
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
'   Then gate_summary ' + LOG_DIR + ' ' + GATE_OUT + '/summary.txt, and gate_compare "$(last_landed_summary)" ' + GATE_OUT + '/summary.txt. A COUNT DOWN or SUITE GONE line is red, with the suite named: it almost always means a .test file or a tests= line went missing. A count that went up is the batch\'s new tests. A suite that is new in the summary is not red by itself.',
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
'7. The ladder regression, as gate.md\'s "The ladder regression" runs it, with OUT at ' + LOG_DIR + '/ladder and LADDER_ROOT at ' + LOG_DIR + '/ladder/root, where step 3 put the two copies. The eighteen microGPT components are compiled only, never linked or run here. Compare with these:',
'',
'        ladder_filter () { sed -E \'s/Operation took [0-9.]+ms/Operation took <time>ms/\' "$1" ; }',
'        ladder_compare () {               # ladder_compare <baseline-dir> <now-dir>; one DOWN, UP, NEW, MISSING or STDOUT line per moved file',
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
'        mg_phases () { awk -F\'|\' \'/^\\| *[0-9]+ *\\| *`/ { gsub(/[` ]/, "", $3); gsub(/ /, "", $4); print $3 "\\t" $4 }\' "$1" ; }',
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
'   Run checker_compare "$(last_landed_checker_count)" ' + GATE_OUT + '/checker-count.txt "' + ((expectedChecker && expectedChecker.counts && expectedChecker.counts.length) ? expectedChecker.counts.join(', ') : 'none') + '"' + ((expectedChecker && expectedChecker.crashes && expectedChecker.crashes.length) ? ' "' + expectedChecker.crashes[0].replace(/^[^:]*: /, '') + '"' : '') + ' and append its output to the summary, each line prefixed "# checker ". The total is reported and never red (POSITIONS.md, "The checker count is measured, never red."); a crash line no rung declared, and SHADOW STALE, are red.',
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
'1. Copy the gate\'s outputs into the tree: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/, and ' + LOG_DIR + '/distance/errors.tsv to ' + SITES + ' (mkdir -p its folder), the per-site list the next batch\'s rungs read as their before. Write the landed figures into explorations/coordinator/FACTS.md, numbers only, from ' + GATE_DIR + '/distance.txt and checker-count.txt: in the entry "The true distance to the switch-over", every figure it gives of the last landed gate, the lines of distance.txt it cites and the batch number in the paths it cites; in "The checker-count stage\'s table", the count\'s total and that path. Change no other word; a sentence the new figures make false you name in your summary for the coordinator. When a landed commit changed a file under Specification/ (git diff --name-only ' + BASE + '..HEAD -- Specification/), build the PDF once, in Specification/fortress/, ./ant genSource then ./ant tex, each logged under ' + LOG_DIR + '/, and copy Specification/fortress/fortress.pdf to Specification/fortress.pdf. Then wait for step 0 with wait_for ' + MG_LOG + ', called again until it prints EXIT= (or 10 minutes have passed, which you then report), and append to ' + GATE_DIR + '/summary.txt its verdict lines, each prefixed "# microgpt-walk ": grep -h "VERDICT\\|^rc=" ' + MG_DIR + '/*.txt for the run\'s folder. A FAIL there is reported, and holds nothing. One commit, titled "' + COMMIT_TITLE + '": the summary, the two tables, ladder/, the per-site list, FACTS.md and the PDF; the logs under ' + LOG_DIR + '/ are never committed.',
...besideStep(beside),
'2. Check every commit since ' + BASE + ' (git log ' + BASE + '..HEAD --format=%B): each ends with the skill\'s two footer lines, none holds a model identifier, and each whose diff touches a path outside explorations/ and .claude/ carries a historical: line.',
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
'Return the structured result: the hash main is at, the branches pushed (empty when held), pushHeld and heldBy, what was cleaned up, and in microgptWalk the verdict lines of the two programs.',
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
    summary: { type: 'string' },
  },
  required: ['mainHead', 'pushed', 'pushHeld', 'microgptWalk', 'summary'],
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
// gate, the cold read, the commit and a repair on the merged tree that come back with nothing keep
// their paths.
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
    'The record may already carry a rung\'s fold. Before you fold, grep FACTS.md, the ledger (' + LEDGER + ' find with the row\'s words, and for each placeholder its claim) and ' + DELTA_PART + ' for its lines, and fold only what is missing: never a line or a row twice. A row closed already is not closed again (' + LEDGER + ' show N). The same holds for PLAN.md\'s entries and RECORD.md.',
    'Retry a git command that fails on index.lock.',
  ]
}

function recoverReview() {
  return [
    'You are in the main tree, ' + MAIN + ', with the gate running beside you or finished. A commit titled "Fold the review\'s corrections" after the gather\'s last commit is the earlier attempt\'s: then headBefore is that commit\'s parent, so that pathsOutsideExplorations covers both attempts\' corrections.',
    'Uncommitted edits under explorations/ are the earlier attempt\'s corrections in progress: keep what is right and commit them with your own, in one more commit of the same title. Do not fix a finding twice. Never touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/.',
  ]
}

function recoverColdRead() {
  return [
    'You are in the main tree, ' + MAIN + '. A commit titled "Cold read of the revival\'s changes, climb batch ' + BATCH + '" is the earlier attempt\'s, and uncommitted edits of ' + DELTA_PART + ' are its fixes in progress: keep what is right, fix nothing twice, commit once more if needed.',
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
    + SCATTER.map(r => r.id).join(', ') + '; each rung checked by a skeptic that fixes what it finds; then gather, review beside the gate, cold read, commit. Base ' + BASE + '.')

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
const deltaFolded = (Array.isArray(gather.deltaEntries) ? gather.deltaEntries : []).filter(d => d && d.folded)
const deltaLeft = (Array.isArray(gather.deltaEntries) ? gather.deltaEntries : []).filter(d => d && !d.folded && !/^\s*none\b|Revival change: none/i.test(String(d.title || '')))   // a rung whose record gives "Revival change: none" has nothing to fold
if (deltaLeft.length) mergedItems.push(...numbered('delta-unfolded', deltaLeft.map(d => 'The entry of rung ' + d.rung + ' for ' + DELTA_PART + ', "' + d.title + '", was not folded: the part is not in the tree; it is in the rung\'s record.md')))

// The commits each rung's branch holds after its worker's: the skeptic's fixes and a repair round,
// which the review reads, there being no second skeptic.
const checkingByRung = approved.map(r => ({ rung: r.rung, branch: r.branch, state: r.state,
  skepticFixes: (r.verdict && r.verdict.fixes) || [], rulings: (r.judge && r.judge.rulings) || [],
  repairRound: r.repaired ? { judgeInstructions: (r.judge && r.judge.instructions) || [], summary: (r.worker && r.worker.summary) || '' } : null }))

// The review beside the gate: the review reads and never builds, the gate builds and never reads
// the record; the gate commits nothing, so the two never commit at once. The cold read follows the
// review, beside the gate's tail, when the gather folded skill text.
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
let coldRun = null, coldDone = false
// The cold reader commits in the main tree; it is awaited before any other agent but the gate
// (which commits nothing) works there: a repair on the merged tree, a second gate, the commit.
async function awaitColdRead() {
  if (!coldRun || coldDone) return
  coldDone = true
  report.coldRead = await coldRun
  const cr = report.coldRead
  mergedItems.push(...numbered('coldread', cr ? cr.forCoordinator : ['The cold reader returned nothing after ' + ATTEMPTS + ' attempts, so no cold read was made of the entries the gather folded into ' + DELTA_PART + '.']))
}
if (deltaFolded.length) {
  log('The gather folded ' + deltaFolded.length + ' entr' + (deltaFolded.length === 1 ? 'y' : 'ies') + ' into ' + DELTA_PART + '; a cold reader reads them beside the gate')
  coldRun = callAgent(coldReadRole(), { label: 'coldread', phase: 'Cold read', schema: COLDREAD_SCHEMA, model: OPUS }, recoverColdRead())
  coldRun.catch(() => null)
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
    await awaitColdRead()
    return finish({ landed: false, reason: 'review blocking, judge did not order a repair' })
  } else {
    await awaitColdRead()
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

await awaitColdRead()

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
// The quick pair prints "VERDICT: n PASS, 0 FAIL of n -- ALL PASS" each when it passes. Anything
// else, a failing check, a run cut off or refused, is listed for the coordinator; it holds nothing.
const mgPassed = (t) => typeof t === 'string' && (t.match(/-- ALL PASS/g) || []).length >= 2 && !/-- FAILED|rc=[1-9]/.test(t)
if (commit && !mgPassed(commit.microgptWalk)) mergedItems.push(...numbered('microgpt-walk', ['The microGPT walk check on the landed tree did not show both quick programs passing: ' + ((commit.microgptWalk || '').trim() || 'no lines returned')]))
return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy, besideGate: beside, microgptWalk: commit && commit.microgptWalk })
