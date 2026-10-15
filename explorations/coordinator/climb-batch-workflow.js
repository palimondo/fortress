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
// Generated by explorations/compile-ladder/plan-15/manifest/gen15.py from
// CLIMB-BATCH-15.md (section 3, each rung's section word for word; section 5, the
// manifest fields and the intro) and the briefings of lists15.py; check15.js checks it.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order only),
// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line
// for the batch table), section (the rung's section of the record, read by every role
// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the
// worker reads first, each with its reason), checks (the sub-list the skeptic, a judge
// and a repair round read), expectedMoves (ladder moves declared, none here), and the
// optional landsOnlyWith, expectedCheckerCount and expectedCheckerCrash (rungs B and C
// declare the checker count 1 on their own trees, B's error at row 680's crash or at
// body(i), C's at body(i); no rung declares landsOnlyWith or a crash).
// No value is set at launch. The base and the base build are args.base and
// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The
// Workflow harness runs two agents at once on this box"); the scatter starts the
// longest expected worker first.
// ===========================================================================

const BATCH = '15'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-15.md'
const BRIEFING_LISTS = 'explorations/compile-ladder/plan-15/manifest/lists15.py'

const B_SECTION = [
"**The answers this rung follows.** P-48 is decided, in its words: \"A type parameter that a call's arguments do not fix takes its bound, never Bottom. Its instance is the intersection of its upper bounds, constrained by the call's static return type, never the arguments' union or the value's type alone.\" Walk departs from it by decision D2 of climb batch 9's rung W: a big operator's plain-bounded parameter keeps BottomType (F-141), so __bigOperator's local body(i) cannot be typed I (F-220, row 703). Review-queue item 17 and PLAN item 53 asked how walk keeps P-48 there. The coordinator settled it under the curator's rule for forks by the walk probe's way 6 + 7 (explorations/perf-probes/walk-plain-bound/REPORT.md, sections 1, 3, 7 and 9): the specification's desugaring fixes the parameter by the type N of the expression (Specification/advanced/parallelism-locality/defining-generators.tex, figure generatedExpressions, :154-197); the record already reads walk's run-time element types as walk's counterpart of N (F-143; Specification/basic/inference.tex:367-369), so P-48's \"never ... the value's type alone\" is read as not reaching a parameter the desugaring fixes by N; P-59 accepts walk's choice of a coercion by the value until the switch-over, which the call reads as covering this choice too; and way 7 is P-48's \"constrained by the call's static return type\". Way 7 reaches a declared variable and a declared return type at an unwritten clause form, as measured (the probe's question 2, way (a)); it does not reach an argument's expected type, which is row 510's general repair. Both calls are on the curator's review list. Start from the probe's patch, explorations/perf-probes/walk-plain-bound/patches/wayDE-elements-expected-body.patch (392 lines, which git apply --check accepts on the base): write your tests first, then apply it, read it and own it. Its library additions are implementation hooks, not an extension of the library's api, by the coordinator's call 5 (section 2), typed as this section gives. Each library line takes the library's own spelling (P-27).",
"",
"**Rows.**",
"- Row 703, no distance site: the count's error, body(i) at Library/FortressLibrary.fss:1314, is typed body(i: I): L. With D2 lifted and the elements' hint, row 703's two programs print <|0, 2, 4|> and { 0 |-> 0, 1 |-> 1, 2 |-> 2 } (the probe's section 6, probes/P703List.fss and P703Map.fss). On the base's walk with only the line typed they stop: 'Unification error: Closure/Constructor for body param 1 (i:BOTTOM) got arg 4: ZZ32 of type Int'.",
"- Rows 646 and 662 (way 6) and 645 (way 7), each gated by an expected failure that the patch turns to \"Missing expected failure\": XXXComprehensionTypedBindingWalk (646), XXXUnwrittenSetBigOperatorsWalk (662), XXXUnwrittenEmptyFloatSumWalk (645, by emptyRSum's declared RR64). Promote each to a name by topic.",
"- A new row, NEW-B-1 (the probe's section 10): IntMap's opr BIG {|->[\\Val\\] } is declared IntMap[\\Val\\] (Library/IntMap.fsi:82, IntMap.fss:732), while its body is a Comprehension; under the elements' hint the declared result decides the instance, NodeIM[\\Any\\], until it is corrected. The patch declares it Comprehension[\\(ZZ64,Val),IntMap[\\Val\\],AnyCovColl,AnyCovColl\\], as Map's own is (Library/Map.fsi:104), the api importing AnyCovColl as PrefixSet's does (Library/PrefixSet.fsi:33). Write the row in record.md; the gather adds it and closes it with your test.",
"- The design points the probe left to the rung (its section 7). Each is your decision, with its reason:",
"  - The hints. The patch keeps the element and expected-type hints in thread-locals, and bypasses the per-argument instance caches while one is set (values/OverloadedFunction.java:1414, :1430; values/GenericFunctionOrConstructor.java:52, :55). Walk runs its tasks on a work-stealing pool (interpreter/evaluator/tasks/): a thread that has set a hint and waits can run another task, which would then read a hint set for another node or another instance. Carry the hint explicitly to the big operator's own instantiation, or key the caches by the arguments and the hint, so that no other evaluation can read it. If you keep a thread-local, set it only around the instantiation that consumes it, and say in your decisions why no task can run there: the hints are read where the operator is instantiated (inferAndInstantiateGenericFunction, from applyInnerPossiblyGeneric), before its body is evaluated, and the window after that is the operator's body, library code whose calls of two or more arguments fork tasks and join (Evaluator.evalExprListParallel, Evaluator.java:337-353; TupleTask.worthSpawning, tasks/TupleTask.java:120), a thread that joins running other tasks meanwhile. The patch clears its two hints with remove() (Evaluator.bigOperatorByElements), where expectedFor restores the value it found, so a clause form evaluated inside another's big operator clears the enclosing one's hint.",
"  - The reach. The collection step runs for every unwritten clause form, SUM and BIG AND included, and keeps every element until the reduction runs. It must reach the plain-bounded comprehensions (rows 703, 646) and Set's F-bounded reductions (row 662). Restrict it or not, with the reason. Report the interpreter suite's time against batch 14's gate (testSystem, 4 min 6 s; compile-ladder/climb-batch-14/gate/summary.txt).",
"  - The contexts of way 7: a local variable declared with a type (BuildLetEnvironments.java:80) and a function's declared return type (values/FunctionClosure.java:199). Name each other declared-type context it leaves, a top-level variable or a field, and why.",
"  - __bigOperator2's fused path is not routed through the collection step, and its plain-bounded parameters take the bound. Say whether that stands. It is the one other path: the desugarer emits __bigOperator and __bigOperator2 only (compiler/desugarer/PreDisambiguationDesugaringVisitor.java:404-416), and nothing emits __bigOperatorSugar.",
"  - The library additions. The patch adds, after __bigOperator, the collector: __ElemsAny, __ElemsNone, __Elems, __ElemsOne, __ElemsTwo, __elemsJoin, __ElemsReduction, __elemsOne, __elemsOf and __replayOf. As written, their parameters are typed Any and they call methods and functions on Any (r.empty(), u(v), desugaredClauses(...)), and __replayOf returns an untyped function expression, fn (r, u) => e.__replay(r, u). By reading the compiled checker refuses each of these, and the stages read FortressLibrary, so they would bring sites, and an untyped parameter can become the count's next thrown error. Type each declaration so that the checker accepts it, in the library's own spelling (the reductions beside them; BigOperator's getters, Library/FortressLibrary.fsi:1943-1947), with walk's values unchanged. The hardest by reading is __ElemsReduction.join, which passes two __ElemsAny to __elemsJoin, whose parameters are __Elems[\\A\\] and __Elems[\\B\\]: a typecase clause names a type and binds no type parameter (Specification/basic/expressions/typecase.tex, its grammar), so the join reaches each operand's element type only through a method of __Elems[\\T\\]. Keep them named as the library's other hooks that the implementation calls by name (__bigOperator, __generate; ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:61-69), in the component and not its api: the coordinator's call 5.",
"- Notes, not repairs: row 424 (D2 lifted; its note names decision D2); row 20 (way 7 repairs its list face where the type is declared, the probe's section 10); row 510 (way 7 is not its general repair; XXXInferExpectedTypeRungK keeps its verdict); row 577 (count by row and line).",
"",
"**Distance sites.** None by reading. FortressLibrary.fss changes, so run the count and distance stages once on your final tree, before from climb batch 14's landed tables (compile-ladder/climb-batch-14/gate/, compile-ladder/gate/distance-sites.tsv), read by row and line. With body(i) typed the crash row at :1312-1316 goes, and the checker reads __bigOperator's body, which by reading checks: o.body is I->R, and r is an ActualReduction[\\R,L\\] with lift: R->L (Library/FortressLibrary.fsi:1943-1947, :1880). A site that __bigOperator's body or the collector brings is yours to clear by its types, or a point to report. The count is 1 by reading (F-53): its error moves from :1314 to row 680's crash in Array3 (:2922), and the stage checks the component past :1314 for the first time. Its time decides the line. The stage stops a run at 900 s, and the gate reads a table with no total as red; today the stage takes about 300 s, the component to :1311 about 108 s (explorations/perf-probes/checker-speed/REPORT.md section 7). If your run prints no total or takes more than 690 s, do not land the typed body(i): land the rest of the rung without it, and report the time and the table. Rung C measures the stage over the whole component, which the gate reads once C's row 680 repair lands too.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/: EvaluatorBase.java (instanceOf, D2's line at :170, the hints), Evaluator.java (for_RewriteFnApp, :695), BuildLetEnvironments.java (:80), values/FunctionClosure.java (:199), values/OverloadedFunction.java (applyInnerPossiblyGeneric, :1411-1432, only), values/GenericFunctionOrConstructor.java (:49-58).",
"- Library/FortressLibrary.fss (__bigOperator, :1312-1316, and the collector after it); Library/IntMap.fsi (the import after :12, and :82) and Library/IntMap.fss (:732).",
"- Specification/basic/inference.tex (:265; :362-377), Specification/basic/expressions/reductions.tex (:30-37), Specification/appendices/changes.tex (the entries \"Reductions whose element type nothing fixes\", its Change at :1024-1031, its way back at :1048-1052 and its Effect at :1068-1074, and \"The inference of a call's static arguments\", its Change at :1785-1795, D2's paragraph at :1852-1857 and its Effect at :1977-1985).",
"- New and promoted files in ProjectFortress/tests/.",
"- Not: the checker; Constructor.java (rung O's); OverloadedFunction.java's load checks; FortressLibrary.fss's array1 and array2 and IntMap.fss's UPLUS (rung L's); CovariantCollection.fss; the compiler prelude.",
"",
"**Tests, first.** Each through harness-one.sh on the base's code.",
"- Row 703: a walk test by topic of an unwritten list comprehension and an unwritten map comprehension, their values asserted (the probe's P703List and P703Map). It is green on the base, where body(i) has no type; the row's defect shows only with the line typed, so its failing run is the base's walk with that one line edited, red at (i:BOTTOM), as the probe ran it (section 6). Then the walk change, green.",
"- The probe's section 7 tests, each red on the base: BIG CONCAT[k <- 0#3] <|[\\ZZ32\\] k|> is <|0, 1, 2|>, and the nested BIG CONCAT[ys <- <|<|1, 2|>, <|3|>|>] <| 2 y | y <- ys |> is <|2, 4, 6|> (both stop on the base, 'lift param 1 (r:List[\\BOTTOM\\])'); an empty unwritten list comprehension is an instance of List[\\Any\\] (on the base ArrayList[\\BOTTOM\\]); xs: List[\\ZZ32\\] = <| 2 k | k <- 0#3 |>, the same over 0#0, and ys: List[\\Number\\] = <| k | k <- 0#3 |>, each refused on the base; evens(n): List[\\ZZ32\\] = <| 2 k | k <- 0#n |> at 3 and at 0, ArrayList[\\Int\\] and ArrayList[\\BOTTOM\\] on the base.",
"- A guard, green on the base and after: <| <| j | j <- 0#i |> | i <- 1#2 |> equals <|<|0|>, <|0, 1|>|> (a draft that kept the caches built it as ArrayList[\\Object\\]).",
"- NEW-B-1: an unwritten IntMap comprehension bound to a variable declared IntMap[\\ZZ32\\], its value asserted. It is green on the base; show it red with the walk change and IntMap's line as it is, then green with the line corrected.",
"- The promotions: XXXComprehensionTypedBindingWalk, XXXUnwrittenSetBigOperatorsWalk and XXXUnwrittenEmptyFloatSumWalk, each \"Missing expected failure\" with the patch (the probe's section 6), each to a name by topic.",
"- Keep their verdicts: the seven tests that the bound turned red (ResultBoundsRungB, booleanGuard, NumberOrderListDeclarations, RangePrototype, MapTest, QuickCheckTest, CovariantTest) and the specification's example Generators.GeneratorDefn (the probe's section 5); UnwrittenReductionWalk and the other Unwritten*Walk tests; XXXInferExpectedTypeRungK (row 510); IntMapTest and the IntMap tests.",
"- After the edit: the interpreter suite once (ant testSystem), and the specification's examples once (ant testSpecData), since every unwritten clause form in them now goes through the collection step and an example that fails turns the gate red (P-124); the count and distance stages once.",
"",
"**Specification.** The normative text, the desugaring by N, is unchanged. The revival's sentences on what walk does with a big operator's parameter become false, each listed by the probe (section 7, \"Sentences made false\"; the lines are unchanged since): Specification/basic/inference.tex:265 (\"It does not yet fix a type parameter by the expected type.\", now true but for an unwritten clause form at a declared type); :362-377 (the open parameter, the empty reduction at ZZ32's identity of row 645, the set reductions that stop of row 662, and \"It still erases to BottomType the other static parameters of a big operator ...\" of row 424); Specification/basic/expressions/reductions.tex:30-37 (\"Neither implementation directs it by type yet ... except that an empty one takes the identity of ZZ32\"); Specification/appendices/changes.tex:1068-1074 (the Effect of \"Reductions whose element type nothing fixes\"), :1852-1857 (D2's paragraph in \"The inference of a call's static arguments\") and :1977-1985 (its Effect). Correct each to what walk then does, in the S1 form (P-95, P-96), with the coordinator's call as its reason, each box's revision recorded in its entry's Change as the two entries record that of 9 October 2026 (:1024-1031, :1785-1795), and the way back of \"Reductions whose element type nothing fixes\" (:1048-1052) restated; the compiled checker's sentences beside them (reductions.tex:38-44, row 425) stay. List every other sentence your change makes false, the skill's among them (the probe's section 7 names its entries on a type parameter that a call does not fix, on SUM and PROD, and on static parameters), as revival-change material.",
"",
"**Overlaps by file.**",
"- O edits walk too, only Constructor.definedBelow. OverloadedFunction.java is yours in applyInnerPossiblyGeneric; O reads its OVERLAP_PARTS and someBelow and edits no line of it.",
"- L edits FortressLibrary.fss's array1 and array2 (:2452, :2824) and IntMap.fss's NodeIM UPLUS (:520): other declarations of your two files. IntMap's fromCC (:727-730) builds a comprehension by UPLUS, so your IntMap line and L's repair meet in the interpreter suite only.",
"- Specification/appendices/changes.tex: you amend two entries; O amends the Effects of two others; L edits future.tex and, for its box, the Change and the Original text of \"Overloading with static parameters\" (:2398-2401, :2559-2561), whose Effect O amends.",
"- ProjectFortress/tests/: B, L and O add distinct files; you alone promote the three tests of rows 645, 646 and 662.",
].join('\n')

const C_SECTION = [
"**The answers this rung follows.** Each repair is the checker probe's, measured (explorations/perf-probes/checker-bound-defects/REPORT.md, sections 1, 2, 4, 5, 6 and 7): write your tests first, then apply its three patches, read them and own them. Rows 686, 687, 689 and 690 have one cause, traced (section 2.2): TypeAnalyzer.normConjunct expands a closed trait over a conjunct that names a type or inference variable, and the union rule, first-match in the order of the type group's subtyping figure (Papers/Types/fig-subtype.tick), then splits the union before the variable's bound is read. One change there clears all four; a guard in the solver does not (section 2.3). The change keeps every union the checker builds free of variables, the condition under which the POPL 2019 paper proves matching complete (research/extracts/ParkPOPL2019-extract.md section 6), the type group's late word (P-26). The sibling patch is in this rung by the coordinator's call, listed for review: it fixes a crash of the same root at a ground second bound, was measured green on the three tracks, and keeps the team's expansion for ground meets (section 2.5); its solver takes the intersection of the upper bounds, as P-48 says. Row 680 is the checker's, not plane's body: the local function group's return-type thunks are primed without the group in scope (impls/Decls.scala:414), while the specification makes the local functions of one scope mutually recursive (Specification/basic/functions.tex, \"Local Function Declarations\"); the library line is valid as written (section 4). No decision of the curator covers the analyzer's normal form (section 10).",
"",
"**Rows.**",
"- Rows 686 (1 site, the norm's squaredNorm(me), Library/FortressLibrary.fss:2493), 687, 689 and 690, each gated by its expected failure: XXXInferCallerTwoBoundsClosedTrait (686, 'is not applicable to an argument of type Box[\\T\\]'), XXXCoerceTwoBoundsClosedTrait (687) and XXXCallerParamTwoBoundsClosedTrait (689), each 'Applied a substitution to an And and got an Or', and XXXReturnRuleTwoBoundsClosedTrait (690, 'should be a subtype of the'). The repair is patches/rows-686-687-689-690-normal-form.patch, one local function in normConjunct (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:692-713): a closed trait is expanded only against a conjunct that names no type variable and no inference variable. The normal form (normalize) is read by meet and join (TypeAnalyzer.scala:79, :81), by equivalent (:337), by the exclusion oracle (typechecker/ExclusionOracle.scala:66), by the schema analyzer that the overloading and abstract-method checkers use (types/TypeSchemaAnalyzer.scala:228, :348, :370, :424) and by the inference's solution (useful/STypesUtil.scala:1041): a verdict that moves in one of them is the tracks' and the stages' to show, and a point to report. The rows cite lines that have drifted: the solver's stop is now Formula.scala:640, the refusal Functionals.scala:755 (section 2.1).",
"- The ground sibling, NEW-C-1 (the probe's proposed row 1 in its section 9, the row's text there): g[\\T extends { K, Q }\\](x: T): T = h(x), with trait Q excludes { C }, crashes on the base and still after the normal-form patch, since K & Q is ground and still expanded. The repair is patches/sibling-ground-bound.patch: two cases before the union rule in pSubInner (TypeAnalyzer.scala:165), each only where the check is not negated. An inference variable below a union takes the union as one upper bound, and a type variable below a union is tried through its bound as well. It changes the mechanism row 518 names, a union on the right taken before the inference-variable cases; InferUnionInstanceArg keeps its verdict.",
"- Row 680, its crash row (:2886-2999, 'TryChecker returned an untyped expr' at :2922). The repair is patches/row-680-local-function-group.patch: makeTryChecker(this) becomes makeTryChecker(newChecker) in the SLetFn case (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:408-414). The row's claim names a body that fails, and its note says \"A compiler-world program of the same shape typechecks\": both are false, since repro/LocalSiblingInLoop.fss and LocalSiblingDirect.fss crash the checker on the base (section 4). Write the corrected claim in record.md for the close (ledger.py close --claim). Behind the crash the probe found no site: Array3's whole declaration checks with no error, its two calls of a size known only at run time (the __subarray calls at :2954-2955 and :2964-2966) among them.",
"- The test that review-routed.1 owes (PLAN, \"Climb batch 14, listed for his review\"), in this rung since it writes compiler_tests/: a compiled test of trait Animal extends Shape[\\Animal\\] and object Cat extends { Animal, Shape[\\Animal\\] } that runs twin(Cat).tag and asserts cat with run_out_contains, green on the base, so that a change of the code generator that moves row 695's bound turns a suite red. Note row 695 with it.",
"- Notes, not repairs: row 685 (rung L's); row 688 (the count stage's time under the new normal form, from your count run); row 577.",
"",
"**Distance sites.** With your first two patches and L's (not the sibling's), the probe measured 54 to 49: :2493 yours and L's four, the crash row gone, no site new (section 6). On your tree: :2493 and the crash row :2886-2999 go, and none come; the sibling's effect on the distance is not measured, so read the table by row and line. Run the count and distance stages once on your final tree, before from climb batch 14's landed tables. Your count is 1, its error body(i) at :1314; its time shows the normal form's effect on the api check, which row 688's memo brought within the limit, against batch 14's gate (under 5 minutes) and the 900 s limit; a first run past 690 s is a point to report, with the api check's time. Then run the count stage once more on your final tree with one line changed for that run only and restored after it, so that git diff shows nothing of it: body(i) at Library/FortressLibrary.fss:1314 written body(i: I): L. Never commit that line: rung B lands it, and with your row 680 repair the gate's stage then checks the library component whole for the first time. This run is the batch's one measure of that stage: report its time and its table (by reading about 43 errors, the component's 36 typecheck and 8 wellformed sites less your :2493, F-53's rise). If it prints no total or takes more than 690 s, do not land row 680's line: land the normal form and the sibling, and report. 690 s leaves room within the 900 s limit for the 27 % the stages slowed under load (the probe's 2,185 s against the 1,714 s of batch 14's gate).",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala (normConjunct, :692-713; pSubInner, two cases before :165).",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala (the SLetFn case, :408-414).",
"- New and promoted files in ProjectFortress/compiler_tests/.",
"- Not: Formula.scala, OverloadingOracle.scala, Functionals.scala, TypeWellFormedChecker.scala; OverloadingChecker.scala and AbstractMethodChecker.scala (rung O's); the library (B's and L's); walk; the code generator.",
"",
"**Tests, first.** Each through junit.sh on the base.",
"- The four expected failures promoted to names by topic, compiled, linked and run with run_out_contains=PASS, as the skill's tests-writing.md, \"Promoting an XXX test\", says: each fails on the base as a plain test (section 2.1) and passes after.",
"- The sibling: repro/BoundsGround.fss as a plain compiled run test, its two values asserted. It crashes on the base, 'Applied a substitution to an And and got an Or', and after the normal-form patch alone; it passes with the sibling's.",
"- Row 680: LocalFunctionSiblingInLoop and LocalFunctionSiblingCall as typecheck tests, from repro/LocalSiblingInLoop.fss and LocalSiblingDirect.fss (link stops at the code generator's 'Can't compile LetFn'), each crashing on the base; and from repro/LocalRecursiveUntyped.fss an XXX compile test keyed compile_err_contains=reference cycle, where the base says 'Result of typechecking still contains intermediate nodes'.",
"- review-routed.1's test, green on the base.",
"- Keep their verdicts: OverloadTwoBoundsClosedTrait and OverloadTwoBoundsClosedFamily, InferUnionInstanceArg (row 518), the Compiled* and Infer* tests; TypeAnalyzerJUTest, TypeSchemaAnalyzerJUTest, FormulaJUTest and ConstraintJUTest.",
"- After the edit: the compiler and library test tracks once (ant testQuick); the count stage twice and the distance once, as Distance sites says.",
"",
"**Specification.** None, by the probe's search: the Appendix I entries on bounds and closed traits, basic/inference.tex and advanced/overloading.tex make no claim that the normal form changes, and the rationale of the entry revival-paramtype (Specification/appendices/changes.tex, near :3317-3333) gives the crash messages of rows 620 to 622 as history, which stays true. Grep again for rows 680 and 686 to 690 and for the two crash messages, and list every sentence your change makes false.",
"",
"**Overlaps by file.**",
"- O edits the checker too, in OverloadingChecker.scala and AbstractMethodChecker.scala; no checker file is both rungs'. TypeAnalyzer.scala is yours alone: O's coverage for row 709 reads comprises clauses through it without editing it.",
"- The library: B and L edit FortressLibrary.fss; the line your second count run writes is B's, and never committed.",
"- ProjectFortress/compiler_tests/: C and O add and promote distinct files.",
].join('\n')

const L_SECTION = [
"**The answers this rung follows.** Each repair takes the library's own way (P-27). Row 685 is a library line, traced by the checker probe (explorations/perf-probes/checker-bound-defects/REPORT.md section 3): array1 and array2 call vector[\\T,s0\\]() and matrix[\\T,s0,s1\\]() with their own unbounded T inside a typecase on __thrower[\\T\\], which does not bound T. So the instance is ill-formed (Specification/basic/trait-parameters.tex, \"Type Parameters\"), and the checker's refusal is right; the team's comment says \"TODO: fix when Number is covariant\" (Library/FortressLibrary.fss:2451, :2823). The repair is the probe's patch, patches/row-685-array-factories.patch, in the shape of additiveIdentity (:3229-3262): one typecase arm per number type over the () -> T witness, each building the value at that type and returning it through cast. Write your tests first, then apply it, read it and own it. By the coordinator's call, listed for review (the probe's section 11, way (a)), row 685 is closed with its claim corrected to that library line (ledger.py close --claim), and the error's location, reported at the callee's declared type, gets a row of its own. Row 704 follows the coordinator's call on L.skeptic.3 of climb batch 14 (PLAN, \"Climb batch 14, listed for his review\"): NodeIM's UPLUS with a one-entry map takes the library's own addNew, which throws KeyOverlap on a shared key as the library's comment promises (Library/IntMap.fss:517-518). The specification is silent on IntMap; of a map comprehension it says that a key repeated with a different value throws KeyOverlap (Specification/basic/expressions/comprehensions.tex:76-80), and the library's Map comprehension throws on any repeated key (Library/Map.fss:161-168).",
"",
"**Rows.**",
"- Row 685, 4 sites: Library/FortressLibrary.fss:2464 and :2837, two each, against Number and MultiplicativeRing[\\T\\]. The checker names the callee's declared result because the call's type keeps the declaration's spans; the calls are at :2454 and :2826. The patch's arms are ZZ32, ZZ64, NN32, NN64, ZZ, QQ, RR32 and RR64, each within the family's bound (Library/FortressLibrary.fsi:296, :394, :446; ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47); the else arm is unchanged. Under walk the eight types keep their vectors and matrices (repro/ArrayFactoryWalk.fss gives the same output on the base and the patch). At an abstract number type, array1[\\Number,2\\]() and array1[\\AnyIntegral,2\\]() become plain arrays where they were vectors (repro/ArrayFactoryAbstract.fss): Vector[\\Number,n\\] is ill-formed under the family's bound, a point to report. The array literal goes through __builtinFactory1 to array1 and is unaffected. The corrected claim for the close is the probe's proposed row 2 (section 9).",
"- A new row, NEW-L-1, the probe's proposed row 3 (section 9, the row's text there): the checker reports a call's static argument that fails the callee's bound at the callee's declared type, not at the call (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:137, :183, :158-165), reproducer explorations/perf-probes/checker-bound-defects/repro/FactoryUnboundedCaller.fss. A row only, no repair here.",
"- Row 704, no distance site: NodeIM's opr UPLUS(self, other: SingletonIM[\\Val\\]) = self.add(other) (Library/IntMap.fss:520) keeps the many-entry map's value on a shared key, while the reverse order throws through SingletonIM's other.addNew(self) (:339-340). The repair is self.addNew(other) (addNew at :488-490). By reading, two many-entry maps meet the same line: nodeNode (:521-524, :586-610) recurs down to a node and a singleton, so the row's case of keys 2 to 7 UPLUS keys 0, 3, ..., 15 goes with it; assert both orders. IntMap's fromCC (:727-730) builds every IntMap comprehension by UPLUS, so a comprehension with a repeated key then throws KeyOverlap where it kept one value, as the specification says of a map comprehension whose key repeats with a different value and as Map's comprehension does on any repeated key: a point to report, with each test it changes.",
"- Notes, not repairs: row 678 (Array2's Col and Row, the arrays' lists); row 364 (a catch of KeyOverlap[\\ZZ32\\] misses walk's KeyOverlap[\\Int\\], so catch UncheckedException, as the pin test does); row 671 (SYMDIFF's repair, the precedent); row 577.",
"",
"**Distance sites.** Row 685's four go (measured with C's two patches, 54 to 49; the patch moves the lines below it, +9 between the factories and +16 after array2). The stages are this rung's test for the four: before from climb batch 14's landed tables, after once on your final tree, read by row and line. The count stays 1, its error body(i) at :1314. IntMap is not among the stages' components.",
"",
"**Files.**",
"- Library/FortressLibrary.fss: array1 (:2452-2456) and array2 (:2824-2828) only.",
"- Library/IntMap.fss: NodeIM's UPLUS with a SingletonIM (:520) only.",
"- Specification/appendices/future.tex (the revival box at :257-264); Specification/appendices/changes.tex, the entry \"Overloading with static parameters\": its Change's sentence on the box (:2398-2401) and its Original text on the box (:2559-2561), not its Effect.",
"- ProjectFortress/tests/: IntMapUplusSingleton.fss's two today's-value lines (:24-25) changed; new files named by topic.",
"- Not: __bigOperator and the lines after it, IntMap.fsi, and IntMap's BIG {|->} (rung B's); vector, matrix and the array family's other bodies; the checker; walk.",
"",
"**Tests, first.**",
"- Row 685: a walk test from repro/ArrayFactoryWalk.fss, the eight number types' vectors and matrices and a String array plain, a guard green before and after; beside it the assertions of repro/ArrayFactoryAbstract.fss that array1[\\Number,2\\]() and array1[\\AnyIntegral,2\\]() are plain arrays, red on the base. The four sites' test is the stages.",
"- Row 704: IntMapUplusSingleton.fss's two today's-value lines (:24-25) changed to the throw and its message, red on the base, green after; beside them two many-entry maps on a shared key in both orders, each asserted to throw, and an IntMap comprehension whose key repeats with a different value, asserted to throw KeyOverlap, as the specification says of a map comprehension (say whether it is red on the base, where the order of the shapes decides).",
"- Keep their verdicts: IntMapTest and the team's IntMap tests, IntMapCombine, IntMapSymdiffSingleton and IntMapSymdiffManyEntry, the walk array tests, the reductions' and comprehensions' tests.",
"- After the edit: the interpreter suite once (ant testSystem), since array1 backs every array factory and UPLUS every IntMap comprehension; the count and distance stages once.",
"",
"**Specification.** The revival box revival-overloading in the internal document (Specification/appendices/future.tex:257-264) says that the library writes Jan's pair \"as one factory ... which chooses its result by a typecase on its type argument, a Vector where the argument is a Number\". After the patch the result is a Vector where the argument is one of the eight number types, and not where it is Number, AnyIntegral or another abstract number type: correct the box (the probe's section 8) in the S1 form (P-96). The entry \"Overloading with static parameters\" records that box's revisions in its Change (\"the box on Jan's example in the internal document gives that rule as its reason\", Specification/appendices/changes.tex:2398-2401, written by climb batch 14's rung P when it corrected the same box) and keeps the box's earlier wording in its Original text (:2559-2561): record this revision there, with its reason and the box's old last clause; its sentence that Jan's example is answered by the library's factory (:2406-2409) stays true, and its Effect is O's. The text is silent on IntMap; its map comprehension sentence (Specification/basic/expressions/comprehensions.tex:76-80) is what UPLUS by addNew then meets for a repeated key with a different value. List every other sentence your change makes false.",
"",
"**Overlaps by file.**",
"- B edits FortressLibrary.fss (__bigOperator and the collector after it, from :1312) and IntMap (IntMap.fsi, and IntMap.fss's BIG {|->} at :732): other declarations of your two files.",
"- Specification: future.tex is yours alone. In Specification/appendices/changes.tex you amend the Change and the Original text of \"Overloading with static parameters\" (:2398-2401, :2559-2561); O amends its Effect (:2497-2502), another paragraph of the same entry; B amends two other entries.",
"- ProjectFortress/tests/: you alone change IntMapUplusSingleton.fss.",
].join('\n')

const O_SECTION = [
"**The answers this rung follows.** Each row is gated by an expected failure and traced to its line (PLAN, its lines for rows 707 and 709, and \"Climb batch 14, listed for his review\"). Row 707: the No Duplicates Rule, restated on the non-strict relation by climb batch 14's rung P (row 696; Specification/advanced/overloading.tex:548-549), as the 2011 paper (Papers/Types/rules.tick:158-161) and the 2019 paper state it, the type group's late word (P-26), refuses two declarations whose parameter types are each a subtype of the other, wherever their self parameters stand. Row 708: the coordinator's call on W.skeptic.1, listed for review: walk refuses where its search for a cover does not settle, since P-147 has walk agree with the checker, which refuses there. Row 709: P-147, in its words, \"An object defines an inherited abstract method when its bodies of that name at narrower parameter types together cover the abstract method's parameter types (item 51). It is the team's rule of 2012, in Steele's compiled checker and Welterweight's Covered rule, with comprises clauses read as the checker reads them\"; a comprises clause is read at the level of values (P-60), so a cover of a tuple of parameter types splits each position through its clause, as walk's check already does (F-27, F-145). For row 708 the measurement is on record: in the suite, the demos and the specification's examples no search failed to settle (explorations/compile-ladder/rung-walk-coverage/REPORT.md, sections 6 and 10).",
"",
"**Rows.**",
"- Row 707, no distance site: checkOverloading counts a duplicate only where oracle.equiv holds and the self positions are equal (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:441, the team's line). So f[\\T extends S\\](self, y: T) beside f[\\U extends S\\](x: U, self), and the plain pair f(self, y: S) beside f(x: S, self), pass it, and the code generator stops: 'Likely bug in static analysis, apparently malformed overload set not rejected' (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411). The repair: two functional methods, each with a self position, are a duplicate where oracle.equiv holds, wherever their self parameters stand; a top-level function beside a functional method keeps its own check (:405-410). The message prints a functional method's domain without self: say which of the pair's it prints. Walk refuses both pairs at load. The library declares one such pair, by this record's review's grep of Library/ and ProjectFortress/LibraryBuiltin/: object FlatString's opr ||(self, b:FlatString) and opr ||(a:FlatString, self) (Library/FlatString.fsi:17, :20; the second is row 585's api line, which the component lacks, PLAN item 38); String's ||, |||, // and /// pair (self, b:Any) with (a:Any, self), which are not equivalent. The checker never reaches FlatString's pair, since it checks no overloading of a symbolic operator (isDeclaredName, OverloadingChecker.scala:720-724; row 584), and your repair leaves that as it is: an error in an api stops the count stage before it checks any component (ProjectFortress/src/com/sun/fortress/compiler/phases/TypeCheckPhase.java:45-46), so a refused FlatString api would hide the component's count. Grep again and report each pair, with whether your check reaches it.",
"- Row 709, no distance site: AbstractMethodChecker.checkObjectDeclaration asks whether the abstract method's domain is below the union of the covering bodies' domains (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:81-122, the test at :107). TypeAnalyzer splits a trait type through its clause below a union (scala_src/types/TypeAnalyzer.scala:159-164) but compares a tuple with each member alone (:165-166), so bodies at (Ping, Ping), (Ping, Pong) and (Pong, Side) under g(self, x: Side, y: Side), with Side comprises { Ping, Pong }, are refused. The repair is in AbstractMethodChecker, not in TypeAnalyzer, which is rung C's: where the domain is not below the union, split each position through the comprises clauses of its type (TypeAnalyzer's comprisedTypes, :832, read and not edited) and ask that every combination of parts lie below the union, as walk's Constructor.definedBelow does (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:479-540). Bound the combinations as walk does (OVERLAP_PARTS, 4,096, values/OverloadedFunction.java:868) and refuse past the bound, so that the two paths agree on row 708's shape.",
"- Row 708, no distance site: Constructor.definedBelow returns true where its search does not settle: an exception while reading a domain (:501-503), a cycle, a symbolic type or the step bound (coverParts null, :514), or the combinations past OVERLAP_PARTS (:517). The repair: refuse there, as overlapCoveredBy does (OverloadedFunction.java:890, :894). Generic objects stay unchecked (row 665).",
"- Notes, not repairs: row 574 (row 707's sibling, fixed by climb batch 10's rung C); row 584 (the symbolic operators the check skips, FlatString's pair among them); row 617 (row 709's sibling); row 665 (an unsettled search at a generic declaration, unchecked); row 577.",
"",
"**Distance sites.** None by reading: the distance has no overloading or abstract-method site, and the library's one pair at two self positions is a symbolic operator that the check does not reach (Rows). The stages read OverloadingChecker.scala and AbstractMethodChecker.scala, so run the count and distance stages once on your final tree, before from climb batch 14's landed tables; a site that comes is a point to report. The count stays 1.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala (checkOverloading, :430-455).",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala (checkObjectDeclaration, :81-122, and a helper beside it).",
"- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java (definedBelow, :479-540).",
"- Specification/appendices/changes.tex: the Effect's sentence on row 707 in \"Overloading with static parameters\" (:2497-2502), and the Effect's sentences on rows 708 and 709 in \"Traits with comprises clauses read at the level of values\" (:2876-2888).",
"- Promoted and new files in ProjectFortress/compiler_tests/ and ProjectFortress/tests/.",
"- Not: TypeAnalyzer.scala and impls/Decls.scala (rung C's); OverloadedFunction.java (B edits its applyInnerPossiblyGeneric; you read its OVERLAP_PARTS and someBelow, already open to its package); the library; the code generator.",
"",
"**Tests, first.**",
"- Row 707: XXXNoDuplicatesRuleSelfPositions is keyed today on the code generator's stop, and your fix turns it red. A refusal at compile time stays an XXX compile test (the skill's tests-writing.md, \"Writing an XXX test\"): rekey it to the checker's refusal, compile_err_contains=There are multiple declarations of f, and beside it write the plain pair, f(self, y: S) beside f(x: S, self), keyed the same. Each says 'Saw wrong failure' on the base, where the code generator stops.",
"- Row 709: XXXAbstractMethodCoveredPairs promoted, compiled, linked and run with run_out_contains=PASS, its four values asserted; refused on the base. Beside it an XXX compile test of a shape that is not covered, the body at (Pong, Side) narrowed to (Pong, Ping), refused before and after.",
"- Row 708: XXXAbstractMethodCoverUnsettledWalk promoted to a name by topic, its .test keyed load_exception_contains=does not define an abstract method declared in type H; as the expected failure it passes on the base. Beside it, the same program as an XXX compile test keyed on the checker's message, refused before and after.",
"- Keep their verdicts: AbstractMethodCoveredWalk, PairsRunRangesWalk, FileConversion, XXXUnimplementedMethod, the AbstractMethod*Walk and Override*Walk tests, XXXAbstractMethodUndefinedGenericWalk and XXXAbstractMethodUndefinedGenericObjectExpressionWalk (row 665); row 696's No Duplicates test of dup's pair (XXXNoDuplicatesRule.test) and row 574's XXXFunctionalMethodDuplicateSelfSecond, XXX2f.test, the OverloadTwoBounds* tests.",
"- After the edit: the compiler and library test tracks once (ant testQuick) and the interpreter suite once (ant testSystem); the count and distance stages once.",
"",
"**Specification.** No normative sentence changes: the No Duplicates Rule as restated (Specification/advanced/overloading.tex:548-549) and the traits chapter's coverage (Specification/basic/traits.tex:627-648) already say what both paths then do. The Effects that name the three departures become false; correct each to the agreement (P-95, P-96). In \"Overloading with static parameters\": \"except two functional methods whose self parameters stand at different positions, which only its code generator refuses, as a malformed overload set (row~707 ...)\" (Specification/appendices/changes.tex:2497-2502). In \"Traits with comprises clauses read at the level of values\": \"and it does not refuse an object where its search through the comprises clauses does not settle ... (row~708 ...)\" (:2876-2881), and \"The compiled type checker does not split a tuple of parameter types through comprises clauses ... (row~709 ...)\" (:2882-2886). List every other sentence your change makes false, the skill's among them (its interpreter part and its revival changes say that an unsettled search does not refuse), as revival-change material.",
"",
"**Overlaps by file.**",
"- C edits the checker in TypeAnalyzer.scala and impls/Decls.scala; you in OverloadingChecker.scala and AbstractMethodChecker.scala.",
"- B edits walk's evaluator and OverloadedFunction.applyInnerPossiblyGeneric; you Constructor.definedBelow.",
"- Specification/appendices/changes.tex: you amend two Effects; B amends two other entries; L amends the Change and the Original text of your entry \"Overloading with static parameters\" (:2398-2401, :2559-2561), for its box in future.tex, and not its Effect.",
"- Test folders: distinct files; you alone change the three expected failures of rows 707, 708 and 709.",
].join('\n')

const B_ENTRY = { id: 'B', slug: 'rung-walk-elements', path: '/home/user/fortress-elements', branch: 'wip/rung-walk-elements', expectedMinutes: 130,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [], expectedCheckerCount: 1,
    title: "Walk's big operator by its elements: an unwritten clause form's parameter by a declared type, its elements or its bound (P-48, way 6 + 7; rows 645, 646, 662 and 703)",
    blurb: "under P-48, by the coordinator's call (the walk probe's way 6 + 7), walk instantiates the big operator of a reduction or comprehension that writes no static argument by the declared type it is the value of, else by the join of its elements' run-time types, else at its bound, in place of BottomType (D2 lifted), from the probe's patch with the hint's design and the collector's types the rung's: rows 645, 646 and 662 promoted, __bigOperator's body(i) typed (row 703, held if the count stage's run passes 690 s), IntMap's BIG {|->} declared as Map's (a new row); the inference and reductions texts and three Appendix I passages corrected; no site; Java under interpreter/evaluator/ and Fortress in FortressLibrary and IntMap.",
    section: B_SECTION,
    pointsToReport: [
      "A walk test, a team test or a specification example whose verdict changes other than the three promotions, with its program and the instance walk gave.",
      "The count's table, its error and the stage's time against its 900 s limit, whether body(i) landed, and any site that __bigOperator's body or the collector brings.",
      "The hint's design: how it reaches the instantiation, the caches, and why no other task can read it; the reach of the collection step and of way 7's contexts; the interpreter suite's time against batch 14's gate.",
      "Each library declaration added or changed, its types and its precedent line, IntMap's api lines among them.",
      "Normative text changed, and every revival sentence made false and corrected, the skill's among them.",
      "A checker or code-generator edit, or a walk edit beyond the files the section names.",
    ],
    briefing: [
      "P-48", "P-59", "P-27", "P-124", "P-95", "P-96", "F-141", "F-143", "F-220", "F-53", "F-42", "ledger:703", "ledger:645", "ledger:646", "ledger:662",
      "ledger:424", "ledger:510", "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#1. The answer",
      "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#2. The question and the record",
      "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#3. The ways, the library's own first",
      "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#4. What was measured",
      "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#5. The changed tests, each read against the specification",
      "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#6. Under the way to brief: rows 645 and 662, row 703, microGPT",
      "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#7. What the rung would change",
      "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#8. Decisions", "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#10. Defects",
      "doc:explorations/perf-probes/walk-plain-bound/patches/wayDE-elements-expected-body.patch",
      "doc:Specification/advanced/parallelism-locality/defining-generators.tex#Simple Desugaring of Expressions with Generators",
      "doc:Specification/basic/inference.tex#The Static Arguments of a Call", "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie",
      "doc:Specification/basic/expressions/reductions.tex#Summations and Other Reduction Expressions",
      "doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes",
      "doc:Specification/appendices/changes.tex#The inference of a call's static arguments",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#private static ArrayList<FType> instanceOf(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#private static boolean bigOperator(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java#public FValue for_RewriteFnApp(_RewriteFnApp that)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildLetEnvironments.java#public FValue forLocalVarDecl(LocalVarDecl x)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java#public FValue applyInnerPossiblyGeneric(List<FValue> args)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#public FValue applyInnerPossiblyGeneric(List<FValue> args)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionOrConstructor.java#public FValue applyInnerPossiblyGeneric(List<FValue> args)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java#<T extends Expr> List<FValue> evalExprListParallel(",
      "code:Library/FortressLibrary.fss#desugaredClauses:(Reduction", "code:Library/FortressLibrary.fsi#trait BigOperator[",
      "code:Library/CovariantCollection.fss#object CVReduction[..covariantCompr[", "code:Library/IntMap.fss#private fromCC[",
      "code:Library/Map.fsi#AnyCovColl,AnyCovColl"],
    reasons: [
      "The decision you build, word for word: a parameter that nothing at a call fixes takes its bound, constrained by the call's static return type, never Bottom.",
      "Walk chooses a coercion by the value until the switch-over, which the coordinator's call reads as accepting the elements' run-time types for the type N of the desugaring too.",
      "Each library line in the library's own spelling: IntMap's comprehension declared as Map's, the collector typed as the reductions beside it.",
      "The specification's examples join the gate at zero red: why you run testSpecData once, since its unwritten clause forms now go through the collection step.",
      "Why the revival's sentences on walk's reductions change: each Effect and callout says what walk does, with its reason.",
      "The form of your text changes: each passage revised in place with its callout, each entry amended.",
      "Walk's instance of a parameter that nothing fixes, and decision D2, the departure your rung lifts.",
      "The open type of an F-bounded parameter, which the record reads as walk's counterpart of N, and rows 645, 646 and 662 that it leaves open.",
      "Why body(i) could not be typed under walk: the fact your rung makes false.",
      "The count, its one error at body(i), and its rise once row 680's crash goes too: what your count run reads.",
      "Item 47's refusal of an untyped local parameter: why body(i) is typed, and why the collector's functions must be.",
      "Walk refuses body(i: I) on unwritten list and map comprehensions: your row, closed with your test if the line lands.",
      "An empty unwritten reduction takes ZZ32's identity: way 7 repairs it through emptyRSum's declared RR64.",
      "A set comprehension built at its elements' run-time class and refused at Set[ZZ32]: way 6 repairs it.",
      "Set's unwritten BIG UNION and BIG INTERSECTION stop at their first element: way 6 repairs them.",
      "The F-bounded half of the open parameter, fixed; its note names decision D2, which you lift.",
      "A typed binding that fixes a static argument only the result mentions: the general repair way 7 is not; its test keeps its verdict.",
      "The ways measured side by side, and why 6 + 7 is the one to build.",
      "The mechanism: the desugarer, __bigOperator, the covariant collections and the lift that does nothing at BottomType.",
      "Ways 6 and 7 as built, the cache bypass and IntMap's declared result, and the ways not taken.",
      "The suites and the probes under each way: the verdicts your rung must reproduce.",
      "The seven tests the bound turned red and the three promotions: each value read against the specification.",
      "Row 703's programs with body typed, the three promotions and microGPT's quick check under the patch.",
      "Files, design points, tests to write first, promotions and the sentences made false: the rung as the probe drew it.",
      "The probe's own choices, the cache bypass and way 7's contexts among them, which you take over or change with a reason.",
      "IntMap's declared result, your new row, and the list face of rows 646 and 20.",
      "The patch you start from: apply it after your tests, read it and own it; its collector is yours to type.",
      "The desugaring by the type N of the expression, figure generatedExpressions: the normative rule walk's elements stand in for.",
      "The chapter's rule and its sentence that walk does not yet fix a type parameter by the expected type (:265), which you amend.",
      "What the implementations do not yet do, with walk's open parameter, rows 645 and 662 and D2's BottomType (:362-377): you correct it.",
      "The reductions' box that says neither implementation directs the element type yet (:30-37): you correct walk's half.",
      "The entry whose Effect gives walk's empty reduction and the set reductions (:1068-1074): you amend it.",
      "The entry that states D2 (:1852-1857) and its Effect on rows 645 and 662 (:1977-1985): you amend both.",
      "Walk's instance of a generic's static parameters, D2's line at :170 and where the hints are read.",
      "How walk recognises a big operator, whose plain-bounded parameter D2 keeps at BottomType.",
      "Where the desugared __bigOperator call is evaluated: the patch's collection step goes in here.",
      "A local variable declared with a type: one of way 7's two contexts.",
      "A function's declared return type at its body: way 7's other context.",
      "The per-argument cache of an overloaded call, which the patch bypasses while a hint is set.",
      "The per-argument cache of a generic call, likewise bypassed: key it by the hint or carry the hint past it.",
      "Walk forks a call's arguments as tasks and joins them, so a thread that has set a hint and joins runs other tasks: the window your hint design must close.",
      "__bigOperator, the count's one error at body(i), and the place after it where the collector goes.",
      "The getters that make body(i: I) check, and the types the collector's declarations take.",
      "The comprehensions' collection, lifted to T by upward: why the instance decides a comprehension's element type.",
      "IntMap's comprehension and fromCC, whose declared result you correct; its uni is UPLUS, which rung L repairs.",
      "Map's comprehension operator, the precedent for IntMap's declared result.",
    ],
    checks: [
      "P-48", "P-59", "P-27", "F-141", "F-143", "ledger:703", "ledger:645",
      "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#7. What the rung would change",
      "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#private static ArrayList<FType> instanceOf(",
      "code:Library/FortressLibrary.fss#desugaredClauses:(Reduction"] }

const C_ENTRY = { id: 'C', slug: 'rung-checker-bounds', path: '/home/user/fortress-bounds', branch: 'wip/rung-checker-bounds', expectedMinutes: 110,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [], expectedCheckerCount: 1,
    title: "The checker's normal form over a variable, and its local function groups (rows 686, 687, 689, 690 and their ground sibling; row 680)",
    blurb: "from the checker probe's three patches, the compiled checker expands a closed trait only against a conjunct that names no type variable (rows 686, 687, 689 and 690, the four expected failures promoted), takes an inference or type variable below a union through the union as a whole or through its bound (their ground sibling, a new row, by the coordinator's call), and infers a local function's return type with its group in scope (row 680, Array3's crash, held if the count over the whole component passes 690 s); the count stage run twice, the second time with body(i) typed for that run only; 1 site; Scala in types/TypeAnalyzer.scala and typechecker/impls/Decls.scala.",
    section: C_SECTION,
    pointsToReport: [
      "A compiled test whose verdict changes other than the four promotions and the new tests, or a ladder file that moves.",
      "A site that comes or goes beyond :2493 and the crash row, by row and line.",
      "Both count tables with their times, the second the component's own errors, and whether row 680's line landed.",
      "A patch changed from the probe's, with the reason, and InferUnionInstanceArg's verdict.",
      "A specification sentence the change makes false.",
      "A checker file edited beyond TypeAnalyzer.scala and impls/Decls.scala, or any library or walk edit.",
    ],
    briefing: [
      "P-26", "P-48", "F-94", "F-53", "F-54", "ledger:686", "ledger:687", "ledger:689", "ledger:690", "ledger:680", "ledger:518", "ledger:688",
      "ledger:695", "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#1. The answer, row by row",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#2.1 Reproduction",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#2.2 The trace",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#2.3 Does one fix in the inference step serve 686, 687 and 689?",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#2.4 The fix and its check against the papers",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#2.5 The sibling: a ground second bound",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#4. Row 680: the local function group, not",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#5. The tracks",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#6. The distance stage with the three patches",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#7. The rungs",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#9. Defects, each with its home",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#10. Decisions",
      "doc:explorations/perf-probes/checker-bound-defects/patches/rows-686-687-689-690-normal-form.patch",
      "doc:explorations/perf-probes/checker-bound-defects/patches/sibling-ground-bound.patch",
      "doc:explorations/perf-probes/checker-bound-defects/patches/row-680-local-function-group.patch",
      "doc:research/extracts/ParkPOPL2019-extract.md#6. What it proves and what it leaves open", "doc:Papers/Types/fig-subtype.tick",
      "doc:Specification/basic/functions.tex#Local Function Declarations",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#protected def normConjunct(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#protected def pSubInner(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala#case SLetFn(SExprInfo(span, paren, _), body, fns) => {"],
    reasons: [
      "The type group's late word: the POPL 2019 paper's condition that no union the checker builds holds a type parameter, which the normal-form change keeps.",
      "A parameter that nothing fixes takes the intersection of its upper bounds: the solver's choice under the sibling's union cases.",
      "The checker's failures at a parameter bounded by a closed trait, which your normal-form change repairs; the fact is rewritten after the landing.",
      "The count and its rise: with body(i) typed and row 680 fixed the stage reads the component whole, which your second count run measures.",
      "The sized arrays' count is a floor while row 680's crash hides Array3's body: what your row 680 repair uncovers.",
      "Your site, the norm's squaredNorm(me) at :2493: refused at a type parameter bounded by a closed trait.",
      "The crash on a converted numeral beside such a parameter: the same cause, through the coercion attempt.",
      "The crash on the caller's own parameter as the argument: the same cause.",
      "The false Return Type Rule error at the meet of the two domains: the same cause.",
      "Array3's crash, whose claim and note the probe found false: your row, closed with its claim corrected.",
      "The mechanism the sibling's first case changes, a union on the right before the inference-variable cases: a note, and its test keeps its verdict.",
      "The memo that keeps the count stage within its 900 s limit: the limit your two count runs are read against.",
      "The compiled body that returns self at an object type: review-routed.1's test of its bound is yours to write.",
      "Each row's cause traced to its line and its patch, and the distance with the fixes together.",
      "The four gated programs and the sibling, their messages on the base, and the drifted lines.",
      "The normal form, the union rule and why each row fails: the reading behind the patch.",
      "Why a guard in the solver is not the fix and the normal form is.",
      "The fix read against the subtyping and meet figures, the POPL 2019 condition and the Return Type Rule, and the precision it gives up.",
      "The sibling's crash, its two union cases and what was measured: in your rung by the coordinator's call.",
      "The bisection, the thunks primed without the group, the compiled reproducers and the fix.",
      "The three tracks with the patches: the four promotions are the only verdicts that change.",
      "54 to 49 measured with your first two patches and rung L's: your stage's comparand.",
      "The tests first, the distance and the specification for each fix, as the probe drew them.",
      "The sibling's row, NEW-C-1, and row 680's false note: the text of your record lines.",
      "Why the expansion is kept for ground meets, and the ways not taken.",
      "The normal-form patch: apply it after your tests, read it and own it.",
      "The sibling's two union cases, on top of the normal form: apply, read and own it.",
      "The one line of row 680's repair: the thunks primed with the checker that holds the group.",
      "The completeness condition the normal-form change keeps: no type parameter inside a union the checker builds.",
      "The type group's subtyping algorithm, first-match: the order of the union rule and the variable cases.",
      "Local functions of one scope are mutually recursive: why row 680 is the checker's.",
      "The normal form's conjunct step, where a closed trait is expanded: your first patch's site.",
      "The subtype rules, the union rule at :159-166 among them: the sibling's two cases go before it.",
      "The local function group's check, its thunks primed at :414: row 680's site.",
    ],
    checks: [
      "P-26", "F-94", "ledger:686", "ledger:680",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#2.4 The fix and its check against the papers",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#2.5 The sibling: a ground second bound",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#4. Row 680: the local function group, not",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#protected def normConjunct(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala#case SLetFn(SExprInfo(span, paren, _), body, fns) => {"] }

const L_ENTRY = { id: 'L', slug: 'rung-library-factories', path: '/home/user/fortress-factories', branch: 'wip/rung-library-factories', expectedMinutes: 70,
    writesState: false, testIsStage: true, gateJoins: [], expectedMoves: [],
    title: "The library's array factories and IntMap's disjoint union (rows 685 and 704)",
    blurb: "from the checker probe's patch, array1 and array2 build a vector or a matrix per number type by a typecase with cast, in additiveIdentity's shape, in place of a call at their unbounded T (row 685, closed with its claim corrected by the coordinator's call, and its error's location filed as a new row); IntMap's UPLUS of a many-entry and a one-entry map throws KeyOverlap on a shared key, by the library's own addNew (row 704, a revival test's two pins changed); the revival box on the factory corrected; 4 sites; Fortress in FortressLibrary and IntMap.",
    section: L_SECTION,
    pointsToReport: [
      "A walk value that changes: array1 or array2 at an abstract number type, and each IntMap test whose value or throw changes, a comprehension with a repeated key among them.",
      "Each repair's precedent line, and each team line changed.",
      "The pins changed in IntMapUplusSingleton.fss, each with its before and after.",
      "A site that comes or goes beyond row 685's four.",
      "Normative text changed, and each sentence made false.",
      "A checker or walk edit.",
    ],
    briefing: [
      "P-27", "P-96", "ledger:685", "ledger:704", "ledger:671", "ledger:364", "ledger:678",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#3. Row 685: a library line, by the team's own TODO",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#8. Sentences of the specification made false",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#9. Defects, each with its home",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#11. For the curator",
      "doc:explorations/perf-probes/checker-bound-defects/patches/row-685-array-factories.patch",
      "doc:Specification/basic/trait-parameters.tex#Type Parameters", "doc:Specification/appendices/future.tex#Functions and Overloading",
      "doc:Specification/appendices/changes.tex#Overloading with static parameters",
      "doc:Specification/basic/expressions/comprehensions.tex#Comprehensions",
      "code:Library/FortressLibrary.fss#static argument alone, with no element in hand..multiplicativeIdentity[",
      "code:Library/IntMap.fss#opr UPLUS(self, other: SingletonIM..opr UPLUS(self, other: NodeIM", "code:Library/IntMap.fss#private fromCC[",
      "code:Library/Map.fss#lt(kv1, kv2): Boolean =..fromSortedArrayFragment", "code:ProjectFortress/tests/IntMapUplusSingleton.fss#run(): () = do"],
    reasons: [
      "Each repair in the library's own way: the arrays' factories in additiveIdentity's shape, UPLUS by the library's own addNew; name each precedent line.",
      "The form of your text change: the revival box in the internal document revised in place.",
      "Your four sites, whose claim the probe found false: closed with the claim corrected to the library line.",
      "IntMap's UPLUS of a many-entry and a one-entry map keeps a value where the reverse throws: your second row.",
      "SYMDIFF's repair of the same node map, the precedent for a library repair of IntMap and its pins.",
      "Walk's KeyOverlap carries the value's run-time class, so a catch of KeyOverlap[ZZ32] misses it: catch UncheckedException in your test.",
      "Array2's Col and Row, a size lost in a factory: not yours, a note.",
      "The trace of row 685 to the library's call at an unbounded T, the fix and what it changes under walk.",
      "The revival box in future.tex that your patch makes false.",
      "The corrected claim for row 685's close and the error-location row you file, NEW-L-1.",
      "The two ways for row 685's record: the coordinator's call took (a).",
      "The patch you start from: apply it after your tests, read it and own it.",
      "An instance whose argument fails the parameter's bound is ill-formed: why the checker's refusal is right.",
      "The revival box on Jan's pair and the factory, whose last clause you correct.",
      "The entry that records the box's revisions in its Change (:2398-2401) and Original text (:2559-2561): you record yours there; its Effect is rung O's.",
      "A map comprehension whose key repeats with a different value throws KeyOverlap (:76-80): what IntMap's comprehensions meet once UPLUS takes addNew.",
      "The precedent: the identities built per number type by a typecase over the witness, each through cast.",
      "Row 704's site and the node-to-node UPLUS through nodeNode, which reaches it.",
      "fromCC builds every IntMap comprehension by UPLUS: why a repeated key now throws.",
      "Map's comprehension sorts its pairs and throws KeyOverlap on any repeated key: the library's precedent for IntMap's throw.",
      "The revival test that pins today's two values: its lines 24 and 25 change.",
    ],
    checks: [
      "P-27", "ledger:685", "ledger:704", "doc:Specification/basic/expressions/comprehensions.tex#Comprehensions",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#3. Row 685: a library line, by the team's own TODO",
      "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#9. Defects, each with its home",
      "code:Library/FortressLibrary.fss#static argument alone, with no element in hand..multiplicativeIdentity[",
      "code:Library/IntMap.fss#opr UPLUS(self, other: SingletonIM..opr UPLUS(self, other: NodeIM"] }

const O_ENTRY = { id: 'O', slug: 'rung-duplicates-coverage', path: '/home/user/fortress-dupcover', branch: 'wip/rung-duplicates-coverage', expectedMinutes: 100,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The No Duplicates Rule at two self positions, and coverage on both paths (rows 707, 708 and 709)",
    blurb: "the compiled checker refuses two functional methods of one name with equivalent parameter types wherever their self parameters stand (row 707), and covers an inherited abstract method through every combination of the types the comprises clauses of its parameter types list, bounded as walk is (row 709); walk refuses where its coverage search does not settle, by the coordinator's call under P-147 (row 708); the three expected failures rekeyed or promoted, three Appendix I sentences corrected; no site; Scala in OverloadingChecker.scala and AbstractMethodChecker.scala, Java in walk's Constructor.java.",
    section: O_SECTION,
    pointsToReport: [
      "A library, team or test declaration that the checker or walk now refuses, a functional-method pair at two self positions or an object whose search does not settle.",
      "A compiled or walk test whose verdict changes other than the three tests of the rows, or a ladder file that moves.",
      "The message row 707's refusal prints, and the bound row 709's split takes.",
      "A count or distance site that moves.",
      "Normative text changed beyond the three Appendix I sentences, and every sentence made false, the skill's among them.",
      "An edit of TypeAnalyzer.scala or of OverloadedFunction.java, or any library or code-generator edit.",
    ],
    briefing: [
      "P-147", "P-26", "P-60", "P-95", "P-96", "F-145", "F-27", "ledger:707", "ledger:708", "ledger:709", "ledger:574", "ledger:584", "ledger:696",
      "ledger:665", "doc:explorations/compile-ladder/rung-walk-coverage/REPORT.md#6. What walk now refuses and accepts",
      "doc:explorations/compile-ladder/rung-walk-coverage/REPORT.md#11. Decisions",
      "doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "doc:Specification/basic/traits.tex#Method Declarations",
      "doc:Specification/appendices/changes.tex#Overloading with static parameters",
      "doc:Specification/appendices/changes.tex#Traits with comprises clauses read at the level of values",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def checkOverloading(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala#private def checkObjectDeclaration(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#def comprisedTypes(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private static boolean definedBelow(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private static List<Set<FType>> coverParts(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#static private boolean overlapCoveredBy("],
    reasons: [
      "The decision you build for rows 708 and 709, word for word: coverage defines an inherited abstract method, comprises clauses read, walk agreeing with the checker.",
      "The type group's late word: the 2011 and 2019 papers state the No Duplicates Rule on the non-strict relation, which refuses row 707's pairs.",
      "A comprises clause is read at the level of values: a cover of a tuple splits each position through its clause.",
      "Why the Appendix I sentences change: each Effect says what the implementations do.",
      "The form of your text changes: each entry amended in place.",
      "What walk refuses at load, its unsettled search that does not refuse (row 708) and the checker's miss of row 709: the fact your rung makes false.",
      "Walk's own cover through comprises clauses, every combination of parts below a declaration: the shape row 709's split follows.",
      "Your first row: the duplicate check that needs equal self positions, and the code generator's stop.",
      "Your walk row: the coverage search that does not settle and does not refuse.",
      "Your second checker row: a tuple of parameter types compared with each covering domain alone.",
      "Row 707's sibling, fixed by climb batch 10's rung C: the precedent repair in the same checker.",
      "The checker checks no overloading of a symbolic operator, so FlatString's opr || pair at two self positions is not reached; not yours, and left so.",
      "The No Duplicates Rule restated on the non-strict relation, with its compile test of dup's pair.",
      "Generic objects stay unchecked by walk's coverage: not yours, its expected failures keep their verdicts.",
      "The measurement on record: no search failed to settle in the suite, the demos or the specification's examples.",
      "Decision 2, not to refuse where the search does not settle, which the coordinator's call reverses.",
      "The No Duplicates Rule as restated, which row 707's pairs break.",
      "The coverage sentence and its callout: what both paths then do.",
      "The entry whose Effect names row 707 as the checker's departure (:2497-2502): you amend it.",
      "The entry whose Effect names rows 708 and 709 (:2876-2888): you amend both sentences.",
      "The duplicate check, its self-position condition at :441: row 707's site.",
      "The compiled checker's coverage: the domain against the union of covering domains at :107, row 709's site.",
      "How the checker reads a trait's comprises clause: read for your split, not edited, since TypeAnalyzer is rung C's.",
      "Walk's coverage check: row 708's three returns where the search does not settle, and the combination search row 709 follows.",
      "Walk's split of a type into parts through comprises clauses, null where it does not settle.",
      "Walk's Meet Rule cover, which refuses where its search does not settle: the precedent for row 708.",
    ],
    checks: [
      "P-147", "P-26", "P-60", "ledger:707", "ledger:708", "ledger:709", "ledger:584",
      "doc:Specification/appendices/changes.tex#Traits with comprises clauses read at the level of values",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def checkOverloading(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala#private def checkObjectDeclaration(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private static boolean definedBelow("] }

const RUNGS = [B_ENTRY, C_ENTRY, L_ENTRY, O_ENTRY]
const BATCH_INTRO = "This run is climb batch 15, the record CLIMB-BATCH-15.md, phase 3's next batch after batch 14, toward the checker at a true zero: one walk rung with the library lines it needs, one checker rung, one library rung, and one rung on both paths. It builds two probes taken for it, perf-probes/walk-plain-bound and perf-probes/checker-bound-defects, starting from their patches, and the coordinator's calls that settled their questions under the curator's rule for forks: walk instantiates an unwritten clause form's big operator by a declared type, its elements or its bound (way 6 + 7, under P-48); row 685 closed with its claim corrected and its error's location filed; the ground sibling's patch in the normal-form rung. It also builds the calls on batch 14's review list for item 53, rows 704 and 708, and PLAN's lines for rows 707 and 709. The distance stands at 54 and the count at 1 after climb batch 14 (compile-ladder/climb-batch-14/gate/). The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another. B edits walk's evaluator, FortressLibrary's __bigOperator and the collector after it, and IntMap's comprehension; L edits FortressLibrary's array1 and array2 and IntMap's UPLUS; C edits the checker's TypeAnalyzer.scala and impls/Decls.scala; O the checker's OverloadingChecker.scala and AbstractMethodChecker.scala and walk's Constructor.java. Specification/appendices/changes.tex takes B's amendments of two entries and O's of the Effects of two others; L corrects one box in future.tex and records it in the Change of the entry whose Effect O amends. B and C move the count stage's stop: with both lines landed the gate's stage checks the library component whole for the first time, and each of the two guards the stage's 900 s limit with its own line. B, C and L move the checker's view of component FortressLibrary; B, L and O reach the interpreter suite; the gate measures and runs the merged tree. ant testSpecData runs in the gate because batch 14's landed summary has it."
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
'- record.md: the record lines the gather folds, as finished prose. The FACTS.md entry the rung earns (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md). Each ledger note (the row, and the text to append). Each new row (NEW-' + rung.id + '-n, in the row template). The handover line. And a section headed "Revival change": the material from which the skill writer, after the landing, writes the skill\'s part on what the revival changed in the team\'s Fortress, when your change makes the revival\'s Fortress differ from what one of the team\'s sources (the specification, walk, the compiler, the library) says or does. It has two labelled parts. "The change": the team\'s source and what it says or does, with file:line; what the tree now does, with the test that shows it; and the reason, as evidence (a passage of a source, a checker refusal, a measured failure). "Provenance": the question or item, the answer or default it follows, and the batch. Name no question, item, batch, rung or record file in the change, and give no decision\'s status there; provenance goes in its own part. You write no skill text: the gather copies both parts into the batch\'s RECORD.md for the writer. When your change makes no such difference, the section is the line "Revival change: none", with the reason.',
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
'2. Its record, record.md, folded. The FACTS.md entry under the section of its area (the file\'s README gives the rule), after the section\'s last entry: the fact, its source and its test in a few lines. Each ledger note with ' + LEDGER + ' note N "TEXT". Each new row: its line, its number cell ?, into a file under tmp/gather/, then ' + LEDGER + ' add FILE --section "TITLE", the section its writer names or the one its class fits; the tool numbers it and checks it against the template, and a row it refuses you correct to the template, keeping its claim. Replace the row\'s placeholder (NEW-<rung>-<n>) with its number everywhere the rung\'s files and tests cite it, before the rung\'s commit. The handover line in the RECORD.md of the batch, section "Handover lines" (the first section of the old handover file is retired into the first section of PLAN.md, which the coordinator keeps). The rung\'s "Revival change" section is folded into no file: copy it, both its parts word for word, or its line "Revival change: none" with the reason, to tmp/gather/<slug>-revival-change.md for step 7. Write nothing under .claude/: the batch writes no skill text, and the skill writer writes the skill from RECORD.md after the landing. Any file:line a record cites that an earlier rung\'s hunk shifted is re-anchored by symbol.',
'3. The corrections still owed: each leftForGather item of the rung\'s skeptic, below; each sentence of the specification that the rung\'s REPORT.md lists as made false by its change and that the rung did not edit, an Appendix I Effect or a note on walk or the compiled path, corrected to what the code does, each clause checked against the code line it states. Such a sentence states what the code does, so it is not a text mismatch.',
'4. Its items for the curator, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, at the line it is now at.',
'   A text mismatch is not blocking. Where one rung\'s specification text and another rung\'s code disagree and the decisions on record settle it, fix the side they settle. Where they do not, it is reversible and lands as a point to report: the text stands as the rung wrote it; the path that departs gets a ledger row and a gated XXX test asserting the text\'s rule; the text\'s entry in Specification/appendices/changes.tex names that row among its departures; all in the later rung\'s commit, and the mismatch goes in your forCurator.',
'5. One commit: the applied source and tests, the rung\'s REPORT.md, SKEPTIC.md and JUDGE.md if any, a decision record if it has one (record.md is folded, not landed: take it out of the index and the tree once step 2 has folded it), FACTS.md, the ledger and its history file, the handover, and PLAN.md when step 4 wrote to it. Stage them by an explicit list and read git diff --cached --stat before you commit. Title: what the repair does, in plain words; body: the two or three sentences of record.md that say why, and where the commit touches any path outside explorations/ and .claude/, a line beginning "historical:" naming the files of the original 2012 tree it edits, from the provenance block. The skill\'s footer. Do not push.',
'',
'## After the rungs',
'',
'6. Close each row a landed rung fixed, as its rowsClosed and REPORT.md name it, once its test passes on the merged tree as the rung last ran it: ' + LEDGER + ' close N --commit <the rung\'s commit on main> --test <the test>. Then ' + LEDGER + ' check. One commit, titled "Close the rows climb batch ' + BATCH + ' fixed".',
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
    applyOrder: { type: 'string', description: 'the order the rungs were applied in and the lowest edited line that decided it' },
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
'3. The folded record as a whole: every FACTS line true as written, sourced and checkable; every ledger note and new row in place (' + LEDGER + ' check passes; no NEW- placeholder left where a row is cited: grep -rn "NEW-[A-Z]-[0-9]" explorations/fortress-gap-ledger.md explorations/coordinator/FACTS.md explorations/coordinator/PLAN.md explorations/compile-ladder/ ProjectFortress/, where a line of the batch\'s RECORD.md that gives a placeholder beside its number is not a finding, and the batch record and the synthesis under explorations/coordinator/, which name the form as an example, are not searched); every row the gather closed fixed by a landed commit; the handover\'s first section consistent; the revival-change material the gather copied into ' + BATCH_DIR + '/RECORD.md, under "Revival changes, for the skill writer", true of the code as landed.',
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
