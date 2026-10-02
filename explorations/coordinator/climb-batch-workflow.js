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
// Launch with no rung worktree made: each rung worker makes its own, by the one
// command in the shared prefix's "Your worktree", from the base, path and branch
// named here (climb batch 7b's review, finding 9), seeding it from the batch's
// one base build, which the coordinator makes and builds before the launch
// (climb-batch-workflow.md, "Before the launch"):
//   Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js',
//             args: {base: '<the commit main is at>', baseBuild: '<the base build, a built worktree at that commit>'}})
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
// A usage or rate limit, or a rung worker, skeptic or judge that comes back with
// nothing after its attempts, stops the run there and decides nothing; resumeFromRunId with the
// same script and args then runs that role again (climb batch 7b's review, finding 1).

export const meta = {
  name: 'fortress-climb-batch',
  description: 'One batch of Fortress compile-ladder rungs in isolated worktrees, each judged by its own skeptic, gathered, reviewed and gated once (suite counts, four-thread atomic runs, ladder regression, the checker count over the interpreter library, and the distance to the switch-over reported beside them) before it lands',
  phases: [
    { title: 'Rung', detail: 'test-first repair in an isolated worktree, committed and pushed to wip/ as it goes; never runs the full gate' },
    { title: 'Skeptic', detail: 'independent judgement that builds nothing: test-first read in the worker transcript, its own walk-vs-compiled differential on the rung build and a copy of the base build; one repair round allowed, then a second judgement of the repair alone' },
    { title: 'Judge', detail: 'Opus for the first ruling on a rung or on the merged tree, Fable for a second ruling on the same one; only on a stop, a refusal, a blocking review or a red gate: reads the reports and the diff, decides, writes the decision' },
    { title: 'Gather', detail: 'net change of each approved branch applied to main, record folded, one local commit per rung' },
    { title: 'Review', detail: 'the merged diff against the batch rules and the folded record as a whole, once, beside the gate; a finding that touches code goes to the judge and a repair, one settled by tests and records goes to the next batch' },
    { title: 'Gate', detail: 'compileAll, library rebuild, testFast, testSystem, the summary diff, the four-thread atomic runs, the ladder regression, the checker count over the interpreter library, and the distance stage in the background beside them, reported and never red' },
    { title: 'Commit', detail: 'hashes into the ledger notes, the gate tables and the per-site list, push main, fast-forward the container branch, start the microGPT programs under walk in the background, remove the worktrees; no push while a landed rung carries a stop that was met and not lifted' },
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
// The batch's one base build (POSITIONS.md, "Nothing is built or run twice on the same
// code."): a worktree at BASE that the coordinator built once before the launch and that
// nobody compiles or runs in. Every rung worktree is seeded from it, and so is each
// rung's private copy of the base, WORKTREE-base, where the old code runs
// (explorations/coordinator/build-cache-exploration.md, section 5;
// explorations/coordinator/tools/seed-worktree.sh).
const BASE_BUILD = args && args.baseBuild
if (typeof BASE_BUILD !== 'string' || !/^\/[A-Za-z0-9._\/-]+$/.test(BASE_BUILD) || /\/$/.test(BASE_BUILD))
  throw new Error('args.baseBuild is required: the absolute path of the worktree at the base, built once before the launch (climb-batch-workflow.md, "Before the launch"), with no trailing slash, space or quote')
const SEED = BASE_BUILD + '/explorations/coordinator/tools/seed-worktree.sh'
const baseCopy = (rung) => rung.path + '-base'   // a rung's private copy of the base, for the old code
const CONTAINER_BRANCH = 'claude/worker-brief-fable-vnnuv8'   // this container's infrastructure branch; kept at main
const MAIN = '/home/user/fortress'

// ===========================================================================
// MANIFEST - the coordinator replaces everything between this line and the
// "END MANIFEST" line, and changes nothing else in this file.
//
// Concurrency, which the manifest does NOT set: at most two agents at once here
// (FACTS.md, "The Workflow harness runs two agents at once on this box"), a
// freed slot going to the next queued agent, FIFO. k is 4: the queue sets the
// wall. Per rung: id, slug, path, branch, expectedMinutes (the scatter's start
// order only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction, never red) and
// expectedCheckerCrash; no rung of this batch declares a count or a crash.
// Optional: landsOnlyWith, which no rung of this batch needs. briefing, the
// rung's briefing, which the planner writes from the record so that the agents
// learn in context what they were never trained on: the keys of
// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries
// and FACTS.md entries by their bold titles, gap-ledger rows (ledger:ROW), notes,
// rulings and specification sections (doc:PATH#HEADING), the library and source
// code that is the precedent or the site (code:PATH#FROM..TO), map sections and
// INDEX lines, in reading order, decisions first. The rung worker reads it whole
// as its step 1. And checks, the sub-list of briefing that the skeptic, the
// repair round and the judges read as their step 1. No key holds a double
// quote, backtick, dollar sign or backslash. Each list is checked with the
// tool's --check to match exactly one place per key, on the tree the run is cut
// from. Each briefing key has a one-line reason, rendered at the end of the
// rung's tail (explorations/compile-ladder/plan-8/manifest/lists8.py).
//
// Batch 8's values are CLIMB-BATCH-8.md, sections 3 and 6. Each tail is that
// rung's section of section 3 word for word, with the record's code-span
// backticks dropped (this file carries none), then its briefing's reasons;
// ASCII only. Each section opens with its answers line, which the coordinator
// writes in before the launch. One value is set at launch and nowhere else:
// LEDGER_FROM, the first free ledger row at the launch, which the block refuses
// to load while unset. Manifest order is the ledger numbering order: I, O, Q, M.
// The scatter starts the longest expected first: I, Q, O, M. No rung declares
// a ladder move or a checker count. The base is <base>, passed at launch as
// args.base, not written here. Each rung worker makes its own worktree, at
// path on branch, by the shared prefix's command.
// ===========================================================================

const LEDGER_FROM = 559   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch
if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\'s launch')

const BATCH = '8'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-8.md'

const I_TAIL = [
"",
"## Your rung: I - the checker's inference: the paper's instance rule and the order of attempts",
"",
"SLUG is rung-instance-bound. WORKTREE is /home/user/fortress-bound, branch wip/rung-instance-bound.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-8.md, section 3, under \"I. The checker's inference: the paper's instance rule and the order of attempts\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are listed in section 2 of the record, and the questions its answers line names are in section 1; read them there.",
"",
"**The answers this rung follows.** No question of section 1 reaches this rung. It builds two decisions on record, the paper's instance rule (POSITIONS, \"A type parameter the arguments do not fix takes its bound, never Bottom\") and the order of the checker's attempts at a call (POSITIONS, \"The order of the checker's attempts at a call\"), each named there as one checker rung of batch 8 and joined here because they edit one file and one Appendix I entry and both turn on the expected type.",
"",
"**The problem.**",
"- A type parameter that nothing at a call fixes is bound to BottomType by the compiled checker: killIvars binds an inference variable left open to BOTTOM (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1954-1955), and the solver takes it (scala_src/typechecker/Formula.scala, solve at :486; under the bound Any the same parameter is refused instead, :492-493 against :524). So et[\\T\\](x: ZZ32): BoxT[\\T\\] with r: Any = et(z) compiles and dies loading the instance (row 447, compiler_tests/XXXInferResultOnlyCoerced); c1(): ZZ32 = fAny() for fAny[\\T extends Any\\](): T fails JVM verification, and f[\\T extends Any\\]() with no expected type is refused while any written bound binds Bottom (row 505, XXXInferResultOnlyAny); and a generic big operator's clause form whose static argument is not written is refused, \"BottomType->BottomType is not applicable to an argument of type ZZ32\" for SUM[j <- lo#i] (3 j) (row 425, measured on a library copy; no gated test).",
"- A lone type parameter with no narrowest candidate takes the union of the arguments' types, where the chapter has given the bound since batch 7b (Specification/basic/inference.tex, \"The Static Arguments of a Call\"): unbounded, pick0(w, r) for a ZZ64 and an RR64 is a BoxT[\\OR(ZZ64,RR64)\\] (row 516's compiled half, XXXInferLoneUnbounded); g0(w, r, z) is refused where the chapter instantiates it at Any with z converted (row 515, XXXInferUnionCoercedArg); an instance at a union is refused as an argument (row 518, XXXInferUnionInstanceArg); and the union of a closed trait's listed types reaches code generation and fails verification (row 535, XXXInferLoneUnionClosedTrait with its link test). The union candidate is built in checkApplicableWithCoercion, named (scala_src/typechecker/impls/Functionals.scala:336-343).",
"- Generic inference on an argument whose static type is an intersection binds the parameter to one conjunct, which follows declaration order (row 541, XXXCoverageReturnInferred); the ledger puts its repair in the constraint solver, a neighbour of rows 515 and 518.",
"- The order of attempts (row 508). typedApplication tries subtyping with the expected type, then coercion with it, then both without it (Functionals.scala:696-707), so a: V = k(NOf(1)), with k[\\T extends N\\](x: T): T beside k(x: V): V, runs the converted k(V) where the base and walk run the generic. Gated by XXXInferContextKeepsFit; the operator and method-invocation faces by XXXExpectedTypeChoiceRungT and XXXExpectedTypeFnChoiceRungT.",
"- The text describes today's checker. The chapter's list of what it does not yet describe holds a static parameter that neither an argument nor the expected type fixes and leaves open whether inference may give it BottomType (inference.tex:199-204); its callout says the checker binds such a parameter to BottomType (:219-231); the team's draft note asks \"Do we want to forbid such cases where type inference infers BottomTypes for static parameters?\" (:241-242). Its Appendix I entry, \"The inference of a call's static arguments\", lists rows 508, 515, 516, 518 and 541 as the checker's departures (Specification/appendices/changes.tex:1684-1696), and \"Passages not yet revised\" names the list item and the callout as not yet revised (:2504-2508).",
"",
"**The decisions.** The paper's instance rule: a type parameter that the arguments do not fix takes the intersection of its upper bounds, its declared bound (Any if none), under what the call's static return type requires; never Bottom, never the union of the arguments' types, never the value's type alone (POSITIONS; research/extracts/ParkPOPL2019-extract.md, section 4.2; explorations/reviews/decisions-review/popl-recheck.md, sections 1.8 and 1.9). The order of attempts: subtyping without the expected type first, kept when its result converts to the expected type, then coercion with the context, so that a declaration that fits the arguments as they are is not passed over for one reached by coercion; its cost is re-reading the calls whose instance the context fixes (POSITIONS; row 508; explorations/reviews/batch-N-review.md, finding 2). The conversion rule stands (POSITIONS, \"Conversions never change which declaration runs\"), and answer 8's promotion is untouched: for number arguments it decides the instance before the paper's rule applies (popl-recheck, section 1.9). The text changes in the S1 form (POSITIONS, \"Every change to the specification is recorded with its reason\" and \"The S1 form\"). Walk is not this rung's: its erasure of an unwritten static argument to Bottom (row 424) and its common supertype for an unbounded lone parameter (row 516's walk half) are the walk rung's after this batch (PLAN, phase 3, batch 8's line).",
"",
"**What the tree already does.** Evidence, not the brief; list every way before you choose. The solver already treats a result-only parameter two ways by its bound (row 505). Batch N's rung I keeps the expected type at a call written f(x) with a retry without it, and its promotion replaces the union by a named bound where one is written: pick[\\T extends Number\\](w, r) is a BoxT[\\Number\\] (row 516). Batch 7b's rung C made the lone-parameter test a plain test of the written bound (compiler_tests/InferLoneBound) and left the unbounded case its expected failure. Rung B's written extends Object bounds on builtinPrimitive, fail and List's nullary comprehension exist to select the Bottom branch (PLAN item 20); under this rung they become unnecessary and stay.",
"",
"**The test, first.** In ProjectFortress/compiler_tests/, each seen failing through the harness on the base and committed alone before the edit, passing after:",
"- XXXInferResultOnlyCoerced (row 447) and XXXInferResultOnlyAny (row 505) promoted by git mv to plain names by topic, with row 447's overloaded shape (the ledger's UkTypeRange) added where neither holds it.",
"- XXXInferLoneUnbounded (row 516's compiled half), XXXInferUnionCoercedArg (515), XXXInferUnionInstanceArg (518) and XXXCoverageReturnInferred (541) promoted.",
"- XXXInferLoneUnionClosedTrait (535) rewritten: under the bound pk0(Tri, Sq) is a BoxT[\\Any\\] and k(pk0(Tri, Sq)) a static error (the row's reading; the checker types every argument before it infers the enclosing call, row 425's note, so no expected type reaches the inner call), so the pair becomes one compile test asserting the refusal: its link test, InferLoneUnionClosedTraitLink.test, rewritten to compile_err_contains, and its run test removed. The link test going red on the base's program after the edit is the rung's intent, not a stop. The gate is red on a suite whose test count fell (gate_compare's COUNT DOWN; the compiler track is one suite, 959 tests on the landed summary), so the rung's own additions (row 447's shape where neither file holds it, row 425's test) must outnumber the file it removes, or the rung keeps the count another way and says which; it does not count on rung O's additions.",
"- XXXInferContextKeepsFit (508) promoted, and XXXExpectedTypeChoiceRungT and XXXExpectedTypeFnChoiceRungT promoted if the new order reaches an operator and a method invocation; if it does not, they stay expected failures and the report says why.",
"- Row 425's shape, a big operator's clause form with its static argument unwritten, as a compiled test where the compiler's own library can hold it; where it cannot, its sites on the distance stage are its evidence, named in the report. The row says it may need the big-operator desugaring's bounds as well; the rung finds out which and says so.",
"After the edit: the compiler and library tracks once, the one whole-suite run the prefix allows a checker rung, since the bound and the new order can move any compiled test's verdict; from that run, the compiled tests whose instance the expected type fixes, each that moved listed with its before and after (row 508's cost); the ladder subset; the count and distance stages once.",
"",
"**What it writes.** The checker change. The tests. In Specification/basic/inference.tex: the item on a parameter nothing fixes moved out of the list of what the chapter does not describe and stated as the rule (the bound under the expected type, never BottomType), the element type of a reduction that only its generator clauses determine kept on the list if the rung leaves row 425 open; the callout at :219-231 revised to what the checker then does and what walk still does (row 424); the team's draft note at :241-242 answered in the S1 form by the paper's rule, the note itself kept. In Specification/appendices/changes.tex: the entry \"The inference of a call's static arguments\" (its Change, Rationale and Effect: the departures this rung closes removed, those left named) and the sentence of \"Passages not yet revised\" on that item and callout (:2504-2508). The decision record, explorations/compile-ladder/rung-instance-bound/decision-record.md.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala (checkApplicableWithCoercion, typedApplication and their helpers), scala_src/useful/STypesUtil.scala, scala_src/typechecker/Formula.scala, and another file of the constraint solver it needs, named in its report; scala_src/types/TypeAnalyzer.scala only for a declaration of the solver's that row 541 needs, named, never staticParam (rung O's); new, promoted and rewritten files in ProjectFortress/compiler_tests/; Specification/basic/inference.tex; in Specification/appendices/changes.tex the inference entry and its sentence of \"Passages not yet revised\"; its own directory. Not: scala_src/typechecker/OverloadingChecker.scala, scala_src/overloading/OverloadingOracle.scala, ProjectFortress/src/com/sun/fortress/compiler/Types.java (rung O's); any library, walk or other specification file.",
"",
"**Java or Scala.** Scala. ant compileAll in the worktree, default_repository/caches/global.map restored after it.",
"",
"**The checker count and the distance.** Before: the last landed gate's tables, batch 7b's (explorations/compile-ladder/climb-batch-7b/gate/checker-count.txt and distance.txt) with the per-site list explorations/compile-ladder/gate/distance-sites.tsv; after: both stages once on the rung's tree. Not predicted: the bound in place of Bottom can clear errors of class GB (a function argument inferred at BottomType) and others, and bring new ones where a body relied on Bottom; name every class that moves.",
"",
"**What must stay green, or keep its verdict.** Every compiled test but the ones above, InferLoneBound and batch N's inference tests (InferNumeralTie among them) included; the ladder's 85 files. The gate judges a verdict on the merged tree.",
"",
"**Stops.** A compiled test whose verdict changes other than by this rung's intent. A change to answer 9's positional or return-type rule, or to anything section 4 names as rung O's. A parameter nothing fixes bound to anything but its bounds under the expected type (the union, the value's type, Bottom). Normative text beyond the inference chapter's named passages and its entry. A walk edit. A line of the model.",
"",
"**For the skeptic.** Each promoted and rewritten test failing on the worker's test-only commit and passing at the head; the bound against the decision's words and the extract's solving step (section 4.2 of the extract); the order against the chapter's (\"The Static Arguments of a Call\") and the conversion rule; the worker's compiler-track run against the landed summary, read and not repeated; each listed moved instance against its test; the chapter's new text against the checker as built and walk as landed.",
"",
"**What comes back to Pavol.** The rule as built; the calls whose instance the expected type now fixes, each with its before and after; any library call the bound newly refuses; the revised passages; item 20 to read again (rung B's written bounds, now unnecessary).",
"",
"**What it closes.** Rows 447, 505, 515, 518, 535, 541 and 508, each as its test passes; row 516's compiled half (a note; the walk half stays); row 425 if its test holds it, else a note with the cause measured. Notes on row 424 (walk's half, the walk rung) and row 538 (the compiled dispatcher's instance, phase 5).",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:A type parameter the arguments do not fix: The rule you build: the bound under the expected type, never Bottom, never the union; take its words and its In batch 8 sentence, and check that no case you build departs from them.",
"- positions:The order of the checker's attempts at a call: The order you build: subtyping without the expected type first, kept when its result converts, then coercion with the context; XXXInferContextKeepsFit is its test.",
"- positions:Conversions never change which declaration runs: The rule the new order serves: a conversion never changes which declaration runs when one already fits; answer 8's promotion stays the number case, untouched.",
"- positions:The implicit bound of an unbounded type parameter: The bound an unbounded parameter takes is Any, the top, which holds tuples, functions and (); the bound your rule gives where none is written.",
"- positions:The type group's late positions outweigh the early text: Why the POPL 2019 paper's rule outweighs the chapter's earlier union and the team's open draft note; cite it in the decision record.",
"- positions:Every change to the specification is recorded with its reason: Why the inference chapter changes with the checker in your rung: no discrepancy between the text and what the checker builds stays unrecorded.",
"- positions:The S1 form: The form of your text changes: the passage revised in place with a revision callout, the Appendix I entry updated, the team's draft note kept.",
"- positions:Test first, the test kept: Write the ledger row's core problem as a clean minimal test first, see it fail through the harness, commit it alone; your skeptic sees it fail again.",
"- positions:No re-measuring what the record holds: Your before is the last landed gate's tables (batch 7b's), not a run of the stage on your unchanged base; run only the after, into tmp/.",
"- positions:Reversible stops do not hold a batch: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- ledger:447: A result-only parameter bound to Bottom, and the compiled run dying at load; its run test and link test pair is yours to promote, the overloaded shape beside it.",
"- ledger:505: The solver's two behaviours for a result-only parameter by its bound; both give the bound under your rule, and its pair is yours to promote.",
"- ledger:425: A big operator's clause form with an unwritten static argument refused at Bottom; find whether a compiled test can hold it, and whether the desugaring's bounds are needed too.",
"- ledger:516: The lone parameter's union: its compiled half, the unbounded case, is yours; the walk half stays for the walk rung, and you append that note.",
"- ledger:515: A lone parameter beside a coerced argument refused; the bound in place of the union fallback is its repair, and its expected failure is yours to promote.",
"- ledger:518: An instance at a union refused as an argument; it goes once no union is built, and its expected failure is yours to promote.",
"- ledger:535: The union of a closed trait's types reaching code generation; under the bound the call is a static error, so its link test is rewritten to the refusal.",
"- ledger:541: Inference keeping one conjunct of an intersection; its repair is in the solver beside 515 and 518, and its expected failure is yours to promote.",
"- ledger:508: The attempt order's defect and its three gated faces, a call, an operator and a method invocation; promote each the new order reaches, and say why for any it does not.",
"- ledger:424: Walk's erasure to Bottom, not yours: the chapter's callout keeps saying what walk does until the walk rung, and you append a note.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1.8 Row 447: The paper's case against the Bottom binding, its fix and its tests, and where the solver binds Bottom today; your rung is its section 3, item 3.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1.9 Row 516: The union replaced by the bound in the checker's candidates; the few checker lines this names are yours, with the bound under the expected type.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1.13 Row 508: The paper is silent on coercion, so the attempt order rests on decision 1 alone; do not cite the paper for it.",
"- doc:research/extracts/ParkPOPL2019-extract.md#4.2 The dynamic choice: The paper's solving step, the intersection of the upper bounds under the static return type; the source your callout and entry cite.",
"- doc:explorations/reviews/batch-N-review.md#Findings@Item 34's default is against decision 1: Why the landed order runs against decision 1 and the landed chapter; the ground of your order and its decision record.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule: Decision 1's text for the specification, the order the chapter states and your checker must follow.",
"- doc:Specification/basic/inference.tex#Type Inference: The chapter whole: its rule, the list of what it does not describe, the callout on Bottom and the team's draft note, the passages you revise.",
"- doc:Specification/appendices/changes.tex#The inference of a call's static arguments: Its entry: remove from its Effect the departures you close, name those left, and record the bound's case in its Change and Rationale.",
"- doc:Specification/appendices/changes.tex#The instance at which a dispatched declaration runs: The paper's rule as batch 7b stated it for dispatch; your static rule matches it and cites it.",
"- doc:Specification/appendices/changes.tex#Passages not yet revised: Its sentence on the inference chapter's item and callout goes once you revise them; leave every other sentence.",
"- doc:Specification/basic/conversions-coercions.tex#Coercion Resolution: The set of declarations applicable to a call and the coercion order; the attempt order must give what this section gives.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def killIvars: Where an open inference variable becomes BOTTOM; one site of the change, but check every caller before you change it.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala#def solve(c: CFormula)..private def slv(c: CFormula): The solver the checker shares; the bound for a variable with no lower bound, and row 541's conjunct, are decided here.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def checkApplicableWithCoercion(: The candidates a lone parameter gets, the union fallback among them; the bound replaces the union here.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def typedApplication(: The attempts list and the fallback without the context; the new order goes here, and its ambiguity check below stays batch N's.",
"- The compiled checker infers a generic's static arguments with coercion: What batch N built: inference with coercion and the promotion, the expected type kept with a retry; your change sits on it.",
"- Keeping the expected type at a call written: Why keeping the expected type cleared the natives only by binding Bottom; your bound is the end of that story.",
"- The specification gives the run-time instance of a dispatched declaration: The text's bound for dispatch and for a lone parameter since batch 7b; the checker departs from it until your rung.",
"- The specification's type-inference chapter states the rule of climb batch N: The chapter's rule and its claim to state what the checker builds; keep the claim true after your edit.",
"- The XXX expected-failure mechanism in compiler_tests/ and library_tests/: How your promoted and rewritten tests gate: a run defect needs its run test and its link test, a refusal one compile test.",
"- An XXX compile test pinned by compile_err_contains whose program compiles: What a refusal test reports on the base; that is its failure before your edit.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll.",
"- The true distance to the switch-over: The distance stage your rule moves; read your after by class against the landed table.",
"- map:modules-and-phases.md#B.6 Type checking: Where inference sits in the checker's phases and which files hold it.",
"- map:README.md#Touch this@scala_src/typechecker/: What a checker edit moves and what guards it.",
"- index:inference: The notes on file on inference; open those your change touches.",
"",
].join('\n')

const O_TAIL = [
"",
"## Your rung: O - the overloading checker: functional methods, the capture, the memo and two crashes",
"",
"SLUG is rung-overloading-checker. WORKTREE is /home/user/fortress-ovcheck, branch wip/rung-overloading-checker.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-8.md, section 3, under \"O. The overloading checker: functional methods, the capture, the memo and two crashes\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are listed in section 2 of the record, and the questions its answers line names are in section 1; read them there.",
"",
"**The answers this rung follows.** Q1 = (a), the default while Pavol has not answered: this rung builds row 556's first way. (Under Q1 = (b) the coordinator deletes row 556 from this section before the launch; the rest stands.)",
"",
"**The problem.**",
"- Row 556, under Q1 = (a). The compiled checker puts functional methods into the top-level set and checks every pair of them by the Meet Rule for functions (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:89-104, :201, :557-562), where the specification gives functional methods a rule of their own that asks a meet only of a type that provides both (Specification/advanced/overloading.tex, \"Meet Rule\", the Meet Rule for Functional Methods, as batch 7b's rung S left it). Gated by compiler_tests/XXXFunctionalMethodMeetPerProvider. By reading the landed per-site list, 78 distance errors are top-level pairs of two functional methods: FORWARD_CMP 38, IN 29, seq 10, SQCAP 1.",
"- The capture. Instantiating an inherited generic method, the checker lets the trait's type parameter capture the method's of the same name (OverloadingChecker.scala:131-157, toFunctionalMethodArrows and toMethodArrows; FACTS, \"The hidden layer, classified\"; explorations/perf-probes/nat/triage.md, section 3, (e2)): Generator.generate[\\R\\] inherited by PossibleReductionPair[\\R\\] reads [\\R\\](Generator[\\PossibleReductionPair[\\R\\]\\], Reduction[\\R\\], ...). The triage cleared it by renaming the library's R, a workaround. By reading, 19 distance errors show it: generate 7 and the reduction pairs' map 9 and ivmap 3 (Indexed.map[\\R\\] and ivmap[\\R\\] inside PossibleReductionPair[\\R\\]).",
"- The memo. validOverloadingMemo is keyed on the two declarations alone (OverloadingChecker.scala:441-462), so a pair found valid in one trait's context answers valid in another's, and the errors it hides depend on the order the checker visits the traits (27 to 35 on the library, FACTS, \"The hidden layer, classified\"). The gate's stages run with it off, -Dfortress.analyzer.overload.cache=false; the compiled tests run with it on.",
"- Row 557. A generic trait with an excludes clause, a type below it that provides one of its functional methods, and a top-level function of the same name stop the checker, \"T is not in the kind env\" (scala_src/types/TypeAnalyzer.scala:779, staticParam); gated by compiler_tests/XXXGenericTraitExcludesKindEnv.",
"- Row 477. Every character literal is typed FortressBuiltin.Character, a static final made from the compiler's builtin (ProjectFortress/src/com/sun/fortress/compiler/Types.java:65) that the world switch useFortressLibraries() does not re-point (:83-88); the one library's character type is Char (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:207). Five declarations crash the distance stage, \"Not in the trait table: FortressBuiltin.Character\" (batch 7b's distance.txt, its #crash rows): two in Library/FortressLibrary.fss, two in ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, one in Library/String.fss. A three-line fix was measured in a shadow (FACTS, \"Crashes reach zero in the shadow\").",
"",
"**The decisions.** The specification stays the standard (POSITIONS), and its text as batch 7b left it keeps the Meet Rule for Functional Methods, which asks a meet only of a type that provides both declarations; the gather's reading set row 556's home to 2 on that text, and its first way, the checker checking pairs of functional methods by that rule and keeping the per-provider check, is its default on record (PLAN, \"Climb batch 7b, listed for his review\", row 556) and this record's Q1. A family that mixes a top-level function with functional methods keeps today's check, since the text does not say which rule governs it (row 545). The coverage of generic families (row 546) and answer 9's positional and return-type rules (scala_src/overloading/OverloadingOracle.scala) are not this rung's. No declaration goes into the compiler's prelude (POSITIONS, \"The library route.\"), and the library is not edited to route round the capture (POSITIONS, \"The library's own practice is the standard.\"). For row 477 the record holds one measurement, a three-line fix in a shadow that re-pointed the checker's name at the one library's type (FACTS, \"Crashes reach zero in the shadow\"); the rung lists the ways the tree offers before it takes one, and none puts a declaration into the compiler's prelude.",
"",
"**What the tree already does.** The per-provider check of functional methods, which stays; the world switch's pattern for STRING, JAVASTRING, EXCEPTION and CHECKED_EXCEPTION (Types.java:83-88); capture-avoiding renaming of static parameters elsewhere in the checker, which the rung looks for before it writes one; Types.REGION, another name of one world only (row 477's note), which the rung reports and leaves.",
"",
"**The test, first.** In ProjectFortress/compiler_tests/, each seen failing through the harness on the base and committed alone before the edit, passing after:",
"- Under Q1 = (a), XXXFunctionalMethodMeetPerProvider (row 556) promoted by git mv to a plain name by topic.",
"- XXXGenericTraitExcludesKindEnv (row 557) promoted; its program's verdict after the crash is the one today's check of a mixed family gives, and the test asserts that verdict.",
"- The capture: one new test by topic, a trait with a type parameter R inheriting a generic method whose own parameter is named R, a valid set the checker refuses today.",
"- The memo: one new test whose verdict the memo hides, where a program shows it whatever order the checker visits the traits in. If none does, the count stage run once with the memo on and once off after the edit, equal, is its evidence, and the report says why no test file holds it.",
"- Row 477: no program is compiled against the one library, so its before is the landed distance table's five Character crash rows and its after the distance stage on the rung's tree.",
"After the edit: the compiler and library tracks once, as the prefix allows a checker rung; the ladder subset; the count and distance stages once.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala; scala_src/overloading/OverloadingOracle.scala for the rule on functional methods only, not the positional or return-type rule; scala_src/types/TypeAnalyzer.scala for row 557's crash; ProjectFortress/src/com/sun/fortress/compiler/Types.java for row 477; new and promoted files in ProjectFortress/compiler_tests/; its own directory. Not: Functionals.scala, STypesUtil.scala or Formula.scala (rung I's); any library or specification file.",
"",
"**Java or Scala.** Both. ant compileAll in the worktree, default_repository/caches/global.map restored after it.",
"",
"**The checker count and the distance.** Before: the landed tables, as rung I's section names them; after: both stages once. Not predicted: by reading, the rule for functional methods and the capture reach 97 of the distance's errors, and the Character fix lets five declarations' bodies be checked, so their errors appear as unmasked, not caused; name every class that moves and every crash row that goes.",
"",
"**What must stay green, or keep its verdict.** Every compiled test but the two promoted, batch 7b's coverage tests (CoverageReturnGood, CoverageReturnGoodReversed, ComprisesMeetFunctionalMethod) among them, and the expected failures of rows 543 and 546; the ladder's 85 files. The gate judges a verdict on the merged tree.",
"",
"**Stops.** A compiled test whose verdict changes other than by this rung's intent. The Meet Rule dropped for a type that provides both functional methods, or changed for a family that mixes a top-level function with functional methods (row 545). A change to answer 9's positional or return-type rule, or to the coverage check batch 7b's rung C built. A library edit. Anything section 4 names as rung I's.",
"",
"**For the skeptic.** Each test failing on the test-only commit and passing at the head; the functional-method rule against the specification's Meet Rule for Functional Methods, and a program of the skeptic's own showing the per-provider check still refusing a provider that lacks the meet; the capture fix against the triage's renamed copy (the same verdicts); the memo's answer against the trait context it was found in; the five crash rows gone and the errors behind them named as unmasked; the worker's compiler-track run read, not repeated.",
"",
"**What comes back to Pavol.** Row 556's rule as built and what it moved on the distance, class by class; the errors the Character fix unmasked.",
"",
"**What it closes.** Rows 556 (under Q1 = (a)), 557 and 477, fixed; one row each opened and closed for the capture and for the memo. A note on row 547: not this rung's, its carried state not traced, and the memo is made per compilation unit (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:275).",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:The specification stays the standard: The text is the standard; where the checker is stricter than the text, the checker moves, which is row 556's first way.",
"- positions:The static-parameter sentence goes: The 2011 model the text states, the Meet Rule for functional methods among it; answer 9's positional and return-type rules are not yours to change.",
"- positions:The comprises passages read at the level of values: The coverage check stays local to overload checking and generic families' coverage is left; your rule changes neither.",
"- positions:The library's own practice is the standard: No fix routed round the checker in the library: the capture is fixed in the checker, never by renaming the library's R.",
"- positions:The library route: No declaration goes into the compiler's prelude; row 477 is fixed by pointing the checker at the one library's Char.",
"- positions:Test first, the test kept: Write the ledger row's core problem as a clean minimal test first, see it fail through the harness, commit it alone; your skeptic sees it fail again.",
"- positions:No re-measuring what the record holds: Your before is the last landed gate's tables (batch 7b's), not a run of the stage on your unchanged base; run only the after, into tmp/.",
"- positions:Reversible stops do not hold a batch: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:The checker count is measured, never red: The count and the distance are reported and never red; declare what you measure, and name every crash row that goes.",
"- ledger:556: Row 556, under Q1 = (a): the checker applies the function rule to functional methods; its first way is yours, the per-provider check kept, its test promoted.",
"- ledger:545: A family mixing a top-level function with functional methods: the text does not say which rule governs, so its check stays as today; not yours.",
"- ledger:546: The Meet Rule's case for generic families, refused by the checker; Pavol's question, not yours: keep its expected failure.",
"- ledger:557: The kind environment crash under a generic excludes clause; promote its test, and the verdict after the crash is today's check of a mixed family.",
"- ledger:477: Character typed by a name only the compiler's library declares; the shadow's measured fix and the world switch's pattern are evidence, list the ways before you take one, and note Types.REGION, not yours.",
"- ledger:547: A verdict carried between compilations in one JVM; not yours, not traced; the memo you rekey is made per unit, so do not claim it.",
"- ledger:544: Walk applies no Meet Rule for functional methods; the walk rung's, so nothing of walk changes in your rung.",
"- doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@The rest of the one library's seq family: Row 556's three ways and its default, (1), which Q1 = (a) makes yours; the per-provider check stays.",
"- doc:explorations/compile-ladder/plan-7b/probes/P2.md#The answers: Probe P2's library devices for the Meet Rule class; under Q1 = (a) the top-level pairs are yours by rule and rung M builds only the per-provider ones.",
"- doc:explorations/perf-probes/nat/triage.md#3. The classification: The capture, (e2), and the memo as the triage found them; their mechanisms, and the rename that only routed round the capture.",
"- doc:explorations/perf-probes/nat/triage.md#1. The two copies, reproduced, and why the count moves: How the memo makes the count move with the build order; the evidence your memo test or stage run replaces.",
"- doc:Specification/advanced/overloading.tex#Meet Rule: The Meet Rule for functions and for functional methods as batch 7b left them; your rule follows the second for functional methods.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def getFunctionalMethods(: Where functional methods are gathered; follow where they join the top-level set and where the per-provider check reads them.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def toFunctionalMethodArrows(..private def toMethodArrows(: Where an inherited method is instantiated by its trait's replacer; the capture happens here.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private val validOverloadingMemo..private def validOverloadingInner(: The memo keyed on the two declarations alone, so its answer carries from one trait's context into another's; how it stops is yours to choose and report.",
"- code:ProjectFortress/src/com/sun/fortress/compiler/Types.java#public static void useFortressLibraries(): The world switch, which re-points String and Exception and not Character; row 477's fix goes beside them.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#def staticParam(x: Id): Where row 557's crash is raised; find which caller extends the kind environment too little, and fix the caller.",
"- The hidden layer, classified: The memo, the capture and the classes of the overloading layer; name every class your edits move.",
"- Crashes reach zero in the shadow: Row 477's three-line fix measured in a shadow, and why a crash hides a declaration's whole body.",
"- The compiled checker accepts the Meet Rule's comprises example by a coverage check: Batch 7b's coverage check for functions and functional methods; your rule must keep its tests' verdicts.",
"- The one library's refused overload families are repaired by its own exclusions: What the library already repaired, and the seq pairs left for row 556.",
"- The XXX expected-failure mechanism in compiler_tests/ and library_tests/: How your promoted tests gate; a refusal is one compile test.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll.",
"- The true distance to the switch-over: The distance stage your edits move; read your after by class and by crash row.",
"- map:modules-and-phases.md#B.7 Overloading: The overloading phase and its files.",
"- map:README.md#Touch this@scala_src/typechecker/: What a checker edit moves and what guards it.",
"- index:overloading: The notes on file on overloading; open those your rule touches.",
"",
].join('\n')

const Q_TAIL = [
"",
"## Your rung: Q - the numeral's own type in the library, and NN32 into RR64",
"",
"SLUG is rung-numeral-library. WORKTREE is /home/user/fortress-numlib, branch wip/rung-numeral-library.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-8.md, section 3, under \"Q. The numeral's own type in the library, and NN32 into RR64\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are listed in section 2 of the record, and the questions its answers line names are in section 1; read them there.",
"",
"**The answers this rung follows.** No question of section 1 reaches this rung. It builds the library half of the numeral switch (POSITIONS, \"The numeral switch, split by where the static types are\") and R9 (POSITIONS, \"NN32 coerces into RR64.\"), one rung because both add coerce declarations to RR64.",
"",
"**The problem.**",
"- The one library's numeral type is object IntLiteral extends { ZZ32 } (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:169), its arithmetic withheld by the team's warning, \"Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals.\" (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:495-496); the compiler library's IntLiteral is a sibling under Number from which each integer type converts (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390-429). The checker types every integer numeral IntLiteral (FACTS, \"A numeral's type depends on the path and on the library in scope\"), so against the one library a: NN32 = 3 and a: NN64 = 3 are refused (row 454's integer half), and on probe Q's library copy batch N's ambiguity check refuses z CMP 0 for a ZZ32 z (PLAN item 33).",
"- MAXNUM and MINNUM over the integer types stop walk with \"Ambiguous coercion\" once a conversion is needed: Integral's two tie with QQ's (row 517, ProjectFortress/tests/XXXIntegerMaxNumRungM.fss).",
"- RR64 converts from ZZ32, RR32 and integer numerals only (Library/FortressLibrary.fsi:293-298), so an NN32 needs asFloat, though the conversion is exact. The specification says the same in three places: the coercion chapter's paragraph and its callout on answer 8 (Specification/basic/conversions-coercions.tex:65-68, :74-87) and the number chapter's list and paragraph beside batch 6.5b's rung V's callout (Specification/basic-lib/numbers.tex:41-49).",
"- ZZ32's unsigned(self): NN32 (Library/FortressLibrary.fsi:556) against Integral[\\I\\]'s unsigned(self): NN64 (:466) breaks the Return Type Rule on the flat tower: the one return-type slip among the number types' declarations, which section 4 gives this rung.",
"",
"**The decisions.** The numeral switch (POSITIONS): this rung is Q-lib, library and glue only, no evaluator file. As the numeral switch's judgement lists it (explorations/reviews/numeral-switch-judgement.md, section 4.4): the compiler library's IntLiteral as a sibling under Number, Number's comprises clause taking it and ZZ32's giving it up, the getters asZZ32, asZZ64, asNN32, asNN64 and asZZ over five natives in ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java, the team's arithmetic block enabled with its warning quoted whole in the rung's report, and coerce(x: IntLiteral) on ZZ32, ZZ64, NN32, NN64, ZZ, QQ and RR64; kind A's device, AnyIntegral's coerce(x: IntLiteral) or the per-type overloads, the smaller unless the rung finds a reason; ZZ32's >, >=, <= and CMP stated on ZZ32 itself, CMP on each integer type that lacks it, and ten declarations of MAXNUM and MINNUM, one pair per integer type (PLAN item 33, decided with the numeral switch: the type's own declaration, POSITIONS, \"Each integer type declares its own MIN, MAX and MINMAX\"); the numeral case in exactValue; the literals section's numeral passage and the coercion chapter's sentence on the interpreter in the S1 form. As an object, IntLiteral excludes QQ under walk, and XXXextendIntLiteral.fss stays an expected failure. R9 (POSITIONS): RR64 declares coerce(x: NN32), one api line and one body line, a test, and the callout on answer 8 reworded, with the number chapter's passage beside rung V's callout (explorations/reviews/batch-6.5b-review.md, finding 10). Answer 8 (POSITIONS, \"Mixed widths convert by declared coercions (answer 8).\"): an exact conversion is a coercion, a lossy one stays explicit. The compiler library is not edited (POSITIONS, \"The library route.\"). Walk's numeral stays an Int until Q-walk, after the switch-over's static-types step. The named measurement: the rung measures where arithmetic lands under walk on the two microGPT programs and the interpreter tests before it lands, one measurement inside the rung (POSITIONS, the numeral switch; kept by the post-mortem's synthesis, section 2(a)).",
"",
"**What the libraries already do.** The compiler library's model (CompilerBuiltin.fsi:390-429, with coerce(x: IntLiteral) on ZZ, ZZ64, ZZ32, NN32 and NN64). The patches probe Q measured, removed from the tree by the cleaning and read with git show ab067d9b6^:explorations/compile-ladder/plan-n/probe-q/lib-switch.patch (and lib-r.patch, lib-r1.patch, lib-eq1.patch beside it): a measurement, not the brief. ZZ64's comparisons stated on ZZ64 itself. Batch N's rung M's per-type MIN, MAX and MINMAX (row 484), the precedent for MAXNUM and MINNUM. The flat tower's coerce lists (Library/FortressLibrary.fsi:297-298, :394-398, :482, :564-565, :614-617).",
"",
"**The test, first.** In ProjectFortress/tests/, each seen failing through the harness on the base and committed alone before the edit, passing after:",
"- XXXIntegerMaxNumRungM.fss promoted by git mv to a plain name by topic (row 517).",
"- One new test by topic: an NN32 value where an RR64 is expected, at a typed binding, an argument and a returned value, the value unchanged; z CMP 0 and b MAXNUM 1 for each integer type, each value with its type. Its pins of the library's numeral sites, which pass before and after: the strides seq((|x| - 2):0:-1) (Library/FortressLibrary.fss, SUFFIX_SUM) and seq((|a| - 1):-1:-1) (Library/Shuffle.fss:23), 0 MAX (index - 1), the empty SUM and PROD over ZZ32, ZZ64 and NN32, and widen(0).",
"- The numeral case in exactValue and the coercions from IntLiteral into NN32 and NN64 cannot be seen under walk, whose numeral is an Int: the distance stage after the edit is their evidence (the judgement expects it about 4 below the landed table), and row 454's integer half closes on the checker's side only.",
"Then the named measurement, after the last edit, in the background: one edit pass over ProjectFortress/tests/ with the batch's runner (explorations/coordinator/tools/count-run/, section 6), compared with the base pass the coordinator started before the launch, the listed unstable tests masked (the base pass's work directory is /home/user/fortress/.claude/worktrees/batch8-base/tmp/q-base, its logs under log/, started 2026-10-02 at 10:48 UTC on 9c20a62d7, whose tree under Library/, ProjectFortress/src/, ProjectFortress/LibraryBuiltin/ and Specification/ is b0eb41516's; its pass.txt gives the commit the comparison takes and ends with a done= line when the pass is complete); and the two microGPT checks under walk once on the rung's tree (explorations/coordinator/tools/mg-run.sh), each expected 40 of 40 with the values the last landing printed. Every changed output listed with its cause. This edit pass is the rung's one whole-suite run (its glue edit is walk's source); the skeptic reads it and does not repeat it. The count and distance stages once.",
"",
"**What it writes.** The library and glue change. The tests. In the S1 form, each with its callout and Appendix I text: the literals section's numeral passage (Specification/basic/expressions/literals.tex:127-148), saying that the library's numeral type is IntLiteral and that walk gives a numeral that type after the switch-over; the coercion chapter's paragraph and callout (conversions-coercions.tex:65-87: NN32 among the types that coerce into RR64, and the sentence on the interpreter); the number chapter's list and paragraph (numbers.tex:41-49). In Specification/appendices/changes.tex: one new entry for the numeral's type in the library, after the last revision subsection and before \"Passages not yet revised\", and the entry \"Integers in floating-point expressions\" revised for R9. Its report quotes the team's warning whole.",
"",
"**Files it may touch.** ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss: IntLiteral, NN32 and their members. Library/FortressLibrary.fsi and .fss: the number types' declarations section 4 names as this rung's. ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java. Specification/basic/expressions/literals.tex, Specification/basic/conversions-coercions.tex and Specification/basic-lib/numbers.tex, the passages named; in Specification/appendices/changes.tex, its new entry and the entry \"Integers in floating-point expressions\". The new and promoted tests. Its own directory. Not: Library/CompilerLibrary.*, Library/CompilerAlgebra.*, ProjectFortress/LibraryBuiltin/Compiler*; the checker; walk's evaluator (FIntLiteral.java, EvaluatorBase.java, OverloadedFunction.java, Simple_fcn.java); Specification-1.0-frozen/; explorations/run-c4/ and explorations/apl/.",
"",
"**Java or Scala.** Java (glue). ant compileAll in the worktree, default_repository/caches/global.map restored after it, the interpreter's caches wiped before every run.",
"",
"**The checker count and the distance.** Before: the landed tables, as rung I's section names them; after: both stages once. The judgement's reading puts the distance about 4 below the landed table; not predicted; name every class that moves (I3 and I4, a numeral or a fixed width where a type parameter is expected, among them).",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict and value but those the measurement accounts for; XXXextendIntLiteral.fss an expected failure; the two microGPT checks 40 of 40 with their values; every compiled test (the compiler library is untouched).",
"",
"**Stops.** A changed walk output the measurement does not account for. A changed value printed by either microGPT check, or any line of the model, its vocabulary or the APL program. A team test line changed, or a team expected failure turning green. An edit to the compiler library, the checker, walk's evaluator, or a declaration section 4 names as rung M's. Number's = changed beyond exactValue's numeral case. A comparison of numbers answering differently from the base where the values are equal. A repair of unsigned that needs more than the one declaration or changes a value: then the slip is left with a row. Not a stop: an output the untouched tree already varies from run to run, its verdict unchanged; it is a ledger row.",
"",
"**For the skeptic.** The tests failing on the test-only commit and passing at the head; the model against the compiler library's, declaration by declaration, IntLiteral's exclusions (QQ among them) included; the warning quoted whole; kind A's device against the other way; the measurement's changed outputs against their causes, and the microGPT checks, read and not repeated; the text against the library as landed.",
"",
"**What comes back to Pavol.** The measurement: every changed output with its cause, or none; IntLiteral's shape, algebra and exclusions; kind A's device and the way not taken; unsigned's device or its row; the revised passages.",
"",
"**What it closes.** Row 517 (fixed) and PLAN item 33; row 454's integer half on the checker's side (a note: walk's half stays for Q-walk). Notes on rows 442 (the one library has the conversions the compiled prelude lacks) and 484.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:The numeral switch, split by where the static types are: Your rung is Q-lib: library and glue, the warning quoted, the one measurement; walk's numeral stays an Int, which is Q-walk's.",
"- positions:NN32 coerces into RR64: R9: RR64 coerces from NN32, one api line, one body line, a test, the callout reworded; with Q-lib because both add coerce declarations to RR64.",
"- positions:Mixed widths convert by declared coercions: Exact conversions implicit, lossy ones explicit; check every coerce you add against it.",
"- positions:Each integer type declares its own MIN, MAX and MINMAX: Decision 2's device, each integer type's own declaration, which item 33 extends to CMP, MAXNUM and MINNUM.",
"- positions:The exclusion rule stays and the tower is flat: Each number type carries its own algebra under Number; IntLiteral is a sibling and excludes what the compiler library's excludes.",
"- positions:The library route: The compiler library is not edited; its IntLiteral is the model you copy, not a file you touch.",
"- positions:The library's own practice is the standard: Take the library's own device for each piece, the compiler library's model first.",
"- positions:Every change to the specification is recorded with its reason: The literals passage and the coercion and number chapters change with the library in your rung.",
"- positions:The S1 form: The form of each text change: the passage in place, a revision callout, the Appendix I entry.",
"- positions:The model's text is the notation: No line of the model or its vocabulary; your measurement checks the two microGPT programs, it does not edit them.",
"- positions:Test first, the test kept: Write the ledger row's core problem as a clean minimal test first, see it fail through the harness, commit it alone; your skeptic sees it fail again.",
"- positions:No re-measuring what the record holds: Your before is the last landed gate's tables and the coordinator's base pass; run only your edit pass and your after.",
"- positions:Reversible stops do not hold a batch: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- ledger:454: A numeral at an NN32 or NN64 binding refused; your coerce from IntLiteral closes the checker's side, and walk's stays for Q-walk, which you note.",
"- ledger:517: MAXNUM and MINNUM tie under walk; the ten declarations close it and promote its expected failure.",
"- ledger:484: The per-type MIN, MAX and MINMAX, the precedent for your MAXNUM, MINNUM and CMP.",
"- ledger:442: The compiled prelude lacks the conversions the chapters state; the one library gains them in your rung, and you append a note.",
"- ledger:79: A numeral's typecase and dispatch split between the paths; Q-walk's, not yours, since walk's numeral stays an Int.",
"- doc:explorations/reviews/numeral-switch-judgement.md#4.4 What goes into each half: The list of what Q-lib holds, piece by piece; build these and nothing of the walk half.",
"- doc:explorations/reviews/numeral-switch-judgement.md#4.5 The = device: Why the numeral case goes into exactValue now and what it costs once walk's numeral is an IntLiteral; not paid in your rung.",
"- doc:explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md#The answers: Probe Q's measured switch: the library loads, microGPT's values do not move; the evidence, not your brief.",
"- doc:explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md#5. Number's =, the named sites and the probe programs: The library's numeral sites and the = device as measured; your test pins the sites.",
"- doc:explorations/reviews/batch-N-review.md#Findings@Item 33's second half: Why the ten MAXNUM and MINNUM declarations are yours: decision 2 and the specification's ZZ give them.",
"- doc:explorations/reviews/batch-6.5b-review.md#Findings@Batch 8's R9 will make the passage V revised false: The number chapter's passage R9 makes false; it changes in your rung, beside rung V's callout.",
"- doc:Specification/basic/expressions/literals.tex#Literals: The literals section, whose numeral passage you revise to name the library's IntLiteral.",
"- doc:Specification/basic/conversions-coercions.tex#Principles of Coercion: The paragraph and the callout on answer 8 that you reword for NN32, and the sentence on the interpreter.",
"- doc:Specification/appendices/changes.tex#The single-precision floating-point type: Rung V's entry on the number chapter's passage, beside whose callout R9's text goes; read the passage itself at numbers.tex:41-49.",
"- doc:Specification/appendices/changes.tex#Integers in floating-point expressions: The entry for the callout on answer 8; revise it for R9.",
"- code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral: The compiler library's IntLiteral, its exclusions, getters and operators; the model you take.",
"- code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral: The one library's IntLiteral below ZZ32 today; what you replace.",
"- code:Library/FortressLibrary.fsi#trait RR64 extends: RR64's coerce list, where coerce from NN32 and from IntLiteral go.",
"- code:Library/FortressLibrary.fsi#trait ZZ64 extends: ZZ64's comparisons stated on ZZ64 itself, the precedent for ZZ32's.",
"- code:Library/FortressLibrary.fss#exactValue(x: Number): The typecase that gives a numeral Ratio(0, 0) today; the numeral case goes here.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java#public class IntLiteral: The team's IntLiteral natives, beside which the five getters' natives go.",
"- A numeral's type depends on the path and on the library in scope: Why the checker sees IntLiteral and walk an Int, and what your model changes on each side.",
"- The numeral switch, measured under walk: Probe Q's measurement of the whole switch; the half you build changes no walk output by its reading.",
"- The one library's number tower is flat: The siblings under Number and their coerce lists, which you extend.",
"- Under walk, the interpreter converts by coercion at its three kinds of type check: Where walk applies a coerce you add: a typed binding, an argument, a return.",
"- The coercions between number types carry a sum's zero: Why the empty sums your test pins keep their identities across the coercions.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll.",
"- The true distance to the switch-over: The distance stage your model moves, expected about 4 below the landed table; read it by class.",
"- map:README.md#Touch this@Library/FortressLibrary.fss: What a library edit moves: walk, the stages and the commit stage's PDF.",
"- index:numeral: The notes on file on numerals; open those your passages touch.",
"",
].join('\n')

const M_TAIL = [
"",
"## Your rung: M - the Meet Rule's library devices and the one-line slips",
"",
"SLUG is rung-library-meets. WORKTREE is /home/user/fortress-meets, branch wip/rung-library-meets.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-8.md, section 3, under \"M. The Meet Rule's library devices and the one-line slips\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are listed in section 2 of the record, and the questions its answers line names are in section 1; read them there.",
"",
"**The answers this rung follows.** Q1 = (a), the default while Pavol has not answered: rung O builds the specification's rule for functional methods, so this rung repairs only the pairs a type provides together, String's own juxtaposition pair and the slips, and leaves every top-level pair of two functional methods to O. (Under Q1 = (b) the coordinator writes here before the launch that this rung also builds probe P2's exclusion devices K, G and R for the top-level pairs, and DelegatedIndexed's marker.)",
"",
"**The problem.** The distance stage's errors this rung owns, read from the landed per-site list (explorations/compile-ladder/gate/distance-sites.tsv) with the stage's own classify.py:",
"- Meet Rule pairs inside one type, 26 of class M1 (the messages \"Invalid overloading of ... in trait ...\"): map and ivmap of Maybe, Just and Nothing (5); map of the two full sequential scalar ranges, CompactFullSeqScalarRange and StridedFullSeqScalarRange (2); map of SimpleMappedSeqGenerator and SimpleNestedSeqGenerator (2); cross (3); nest (1); lift of the reductions under AssociativeReduction (6); isLeftZero of LexicographicReduction (2); copy of StandardMutableArrayType (2); and String's own juxtaposition pair, (Any, String) against (String, Any) (3), whose two functional methods put self at different positions, which the specification refuses outright (probe P2).",
"- The Return Type Rule slips: class R3 less ZZ32's unsigned (rung Q's), 26: atMost and every in Library/RangeInternals.fsi and .fss (6), distribute (2), filter (1), SimpleMappedIndexed's map (1), relation and target (2), seq of SimpleNestedGenerator and SimplePairGenerator (4), shift of Array3 (4), split and splitWithOffsets in Library/String.fss and Library/FlatString.fss (4), subarray of Col and Row (2); class R2, CMP of LessThan and GreaterThan (2); class R4, StandardMinMax's (T, T) in bodies (Library/FortressLibrary.fss:290, :3243, :3257; row 421's neighbours).",
"- Row 483: UniformDistribution[\\T\\] returns ZZ32 values as a declared T (Library/Random.fss:370, Library/Random.fsi:258). Row 531: String's avFlat is declared RR32 over an RR64 body (Library/String.fss:508), gated by ProjectFortress/tests/XXXStringAvFlatRungV.fss.",
"- Two test files owed by the next batch since batch 7b's merged-diff review (PLAN, \"Climb batch 7b, listed for his review\", review-routed.1 and review-routed.2): the messages at ProjectFortress/compiler_tests/ComprisesMeetCompiled.fss:18 and ProjectFortress/tests/ComprisesMeetWalk.fss:18 still say that V is the intersection of S and T, where the text now says that V covers S intersected with T; and ProjectFortress/tests/XXXComprisesMeetUncovered.fss shares its component name with a compiled test, so it becomes XXXComprisesMeetUncoveredWalk.fss, its component with it. No assertion changes.",
"Not this rung's: every top-level pair of two functional methods (FORWARD_CMP, IN, seq, SQCAP: rung O's rule under Q1 = (a)); generate and the reduction pairs' map and ivmap, whose messages show a method's type parameter captured by its trait's (rung O's capture fix); the number types' declarations (rung Q's); the self-typed bodies (class S1, section 1, Q2).",
"",
"**The decisions.** The library's own practice is the standard (POSITIONS): each pair's device is the library's for the same kind of problem, a declaration on the meet where a type provides both declarations (probe P2's devices M, Q and C: Maybe's map and ivmap, copy on StandardMutableArrayType), and a slip's declared type corrected (P2's S: lift, isLeftZero). P2 found that none of the Meet Rule families needs the checker step answer 9 declined (explorations/compile-ladder/plan-7b/probes/P2.md). The meet rule and the residue are batch 8's (POSITIONS, \"AnyIntegral's closure and how the checker reads comprises.\"); the families are repaired by the library's own devices (POSITIONS, \"The static-parameter sentence goes (answer 9).\"); every device states an exclusion or a meet the exclusion rule reads (POSITIONS, route A). No line of the model or its vocabulary (POSITIONS, \"The model's text is the notation.\"). A slip is repaired to what its body and its callers already do; where that would change a value walk prints, the slip is left with a row.",
"",
"**What the library already does.** Declarations on the meet: SimpleSeqFilterGenerator's own seq; fill and tabulate redeclared where the array diamond meets, the place P2's copy device takes (FACTS, \"fill takes a value and tabulate a function, both defined where the array diamond meets\"). Plain exclusion traits where a generic excludes cannot be written, Rank1 to Rank3 (\"Potemkin exclusion traits\", Library/FortressLibrary.fsi), and AnyMaybe. narrow where an RR64 body must answer an RR32 (row 531's note).",
"",
"**The test, first.** The manifest sets testIsStage: the failing-then-passing test is the count and distance stages, before the landed tables and per-site list, after both once on the rung's tree, each pair's and slip's rows named. Beside them, in ProjectFortress/tests/: one new test by topic calling each repaired declaration under walk with today's value, which passes before and after; row 483's shape, UniformDistribution[\\ZZ64\\](1:3) whose values are ZZ64 or which is refused, as the repair decides, seen failing on the base; XXXStringAvFlatRungV.fss promoted by git mv to a plain name (row 531). The two review-routed files change in a message and a name only.",
"",
"**Files it may touch.** Library/FortressLibrary.fsi and .fss, the declarations section 4 names as this rung's and the declarations its devices add; Library/RangeInternals.fsi and .fss; Library/String.fss; Library/FlatString.fss; Library/Random.fsi and .fss; the new and promoted tests; the three review-routed test files; its own directory.",
"",
"**Java or Scala.** None. A pair whose only repair is a checker change is a stop.",
"",
"**The checker count and the distance.** The rung's test, as above: before the landed tables, after both stages once, the totals declared as measured.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict, judged by the gate on the merged tree; RangeTest.fss, rangeOperators.fss, Generator2Test.fss, RandomTest.fss and batch 7b's LibraryOverloadFamilies.fss among them.",
"",
"**Stops.** A team test line changed. A checker or walk edit. A pair whose only repair is a checker change. A device that states an exclusion false of some library type. A declaration section 4 names as rung Q's. A line of the model, its vocabulary or the APL program. A slip whose repair changes a value walk prints, left with a row instead. Not a stop: an output the untouched tree already varies from run to run, its verdict unchanged; it is a ledger row.",
"",
"**For the skeptic.** Each pair's and slip's rows before and after, the after re-run by the skeptic; each device against the library's precedent and the other ways the rung listed; that no device states an exclusion false of a library type; the new test's values against the base; row 483's test failing on the base; the review-routed files changed in their messages and names only.",
"",
"**What comes back to Pavol.** Each device with the way not taken; String's juxtaposition pair's device; the slips left, each with its row.",
"",
"**What it closes.** Rows 483 and 531 (fixed); review-routed.1 and review-routed.2 (done). A note on row 421 for the bodies' slips.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:The library's own practice is the standard: Each pair's device is the library's own for the same kind of problem; list every way before you choose, the library's first.",
"- positions:The static-parameter sentence goes: The library's families repaired by its own devices, with no checker step; the decision your devices extend.",
"- positions:AnyIntegral's closure and how the checker reads comprises: The Meet Rule and the residue are batch 8's; your share is the pairs a type provides together and the slips.",
"- positions:The exclusion rule stays and the tower is flat: Every device states an exclusion or a meet the rule reads; none states an exclusion false of a library type.",
"- positions:The model's text is the notation: No line of the model or its vocabulary is yours.",
"- positions:Test first, the test kept: Write the ledger row's core problem as a clean minimal test first, see it fail through the harness, commit it alone; your skeptic sees it fail again.",
"- positions:No re-measuring what the record holds: Your before is the last landed gate's tables (batch 7b's), not a run of the stage on your unchanged base; run only the after, into tmp/.",
"- positions:Reversible stops do not hold a batch: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- ledger:556: Row 556, under Q1 = (a) rung O's: every top-level pair of two functional methods is O's rule, not your device.",
"- ledger:483: UniformDistribution returning ZZ32 values as a declared T; one of the row's two ways is yours, with a test seen failing.",
"- ledger:531: avFlat declared RR32 over an RR64 body; narrow is the row's repair, and its expected failure is yours to promote.",
"- ledger:421: StandardMinMax's MIN and MAX, fixed in batch 7; the (T, T) slips in bodies are its neighbours and yours.",
"- ledger:492: The Meet Rule example both paths now accept; the review-routed messages that still call V the intersection are yours to reword.",
"- doc:explorations/compile-ladder/plan-7b/probes/P2.md#The answers: What the library's devices clear and what they leave; under Q1 = (a) take only the meet declarations and the two slips.",
"- doc:explorations/compile-ladder/plan-7b/probes/P2.md#2. The devices and what each clears: Devices M, Q, C and S as measured; their api halves, to which you add the component halves.",
"- doc:explorations/compile-ladder/plan-7b/probes/P2.md#3. What it settles and leaves open: The pairs P2 did not measure: the full sequential ranges' map, String's juxtaposition, cross and nest; yours to repair or report.",
"- doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@review-routed.1: The two messages to reword in plain words to what the text now says, no assertion changed.",
"- doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@review-routed.2: The walk file to rename with its component, no assertion changed.",
"- doc:explorations/perf-probes/nat/triage.md#3. The classification: The classes of the overloading layer, the meet rule and the library slips among them; generate's capture is rung O's.",
"- doc:Specification/advanced/overloading.tex#Meet Rule: The rule your devices satisfy: a declaration on the meet where a type provides both.",
"- doc:Specification/advanced/overloading.tex#Principles of Overloading: The Return Type Rule your slips break; repair each to what its body and callers already do.",
"- code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3: The library's plain exclusion traits; a device for a family told apart by a plain parent.",
"- code:Library/FortressLibrary.fsi#trait Maybe[: Maybe, the meet of Condition and Indexed, where its map and ivmap are declared under P2's device M.",
"- code:Library/FortressLibrary.fsi#trait StandardMutableArrayType[: The array diamond's meet, where copy goes under P2's device C, as fill and tabulate did.",
"- code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[: A type below two generators that declares its own seq: the library's meet declaration, your precedent.",
"- code:Library/Random.fsi#object UniformDistribution: Row 483's object; its range parameter no longer ties its T.",
"- The hidden layer, classified: The overloading layer's classes; name every row your devices move by class.",
"- The one library's refused overload families are repaired by its own exclusions: Batch 7b's devices for the families, and what they left.",
"- fill takes a value and tabulate a function, both defined where the array diamond meets: The array diamond's meet as the library already uses it.",
"- Every functional-method name of the library is reserved: Why a new name can collide with a program's own; choose names the library does not already reserve.",
"- testSystem's four shards are one suite split by sorted index: Your new test moves the shards; the gate compares their sum.",
"- The interpreter's overload-ambiguity message names its two declarations: The ambiguity message's order is not the program's; do not compare it verbatim.",
"- The true distance to the switch-over: The distance stage your devices move; read it by family against the landed per-site list.",
"- map:README.md#Touch this@Library/FortressLibrary.fss: What a library edit moves: walk, the stages and the commit stage's PDF.",
"- map:dormant-code.md#1.1 Commented-out declarations in: The library's commented-out declarations; a device the team began may be there.",
"- index:overloading: The notes on file on overloading; open those your pairs touch.",
"",
].join('\n')

const I_ENTRY = { id: 'I', slug: 'rung-instance-bound', path: '/home/user/fortress-bound', branch: 'wip/rung-instance-bound', tail: I_TAIL, expectedMinutes: 240, writesState: false, testIsStage: false,
    blurb: "the compiled checker's inference: a type parameter nothing at a call fixes takes its declared bound (Any if none) under what the expected type requires, never Bottom and never the union of the arguments' types (the paper's instance rule), and a call is tried by subtyping without the expected type first, kept when its result converts, before coercion with it (the order of attempts, row 508); rows 425, 447, 505, 515, 516 (compiled half), 518, 535 and 541; the inference chapter's Bottom passages and the team's draft note in the S1 form; Scala under scala_src/.",
    briefing: [
      "positions:A type parameter the arguments do not fix", "positions:The order of the checker's attempts at a call",
      "positions:Conversions never change which declaration runs", "positions:The implicit bound of an unbounded type parameter",
      "positions:The type group's late positions outweigh the early text", "positions:Every change to the specification is recorded with its reason",
      "positions:The S1 form", "positions:Test first, the test kept", "positions:No re-measuring what the record holds",
      "positions:Reversible stops do not hold a batch", "ledger:447", "ledger:505", "ledger:425", "ledger:516", "ledger:515", "ledger:518", "ledger:535",
      "ledger:541", "ledger:508", "ledger:424", "doc:explorations/reviews/decisions-review/popl-recheck.md#1.8 Row 447",
      "doc:explorations/reviews/decisions-review/popl-recheck.md#1.9 Row 516", "doc:explorations/reviews/decisions-review/popl-recheck.md#1.13 Row 508",
      "doc:research/extracts/ParkPOPL2019-extract.md#4.2 The dynamic choice",
      "doc:explorations/reviews/batch-N-review.md#Findings@Item 34's default is against decision 1",
      "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule", "doc:Specification/basic/inference.tex#Type Inference",
      "doc:Specification/appendices/changes.tex#The inference of a call's static arguments",
      "doc:Specification/appendices/changes.tex#The instance at which a dispatched declaration runs",
      "doc:Specification/appendices/changes.tex#Passages not yet revised", "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def killIvars",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala#def solve(c: CFormula)..private def slv(c: CFormula)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def checkApplicableWithCoercion(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def typedApplication(",
      "The compiled checker infers a generic's static arguments with coercion", "Keeping the expected type at a call written",
      "The specification gives the run-time instance of a dispatched declaration",
      "The specification's type-inference chapter states the rule of climb batch N",
      "The XXX expected-failure mechanism in compiler_tests/ and library_tests/",
      "An XXX compile test pinned by compile_err_contains whose program compiles", "ant compileAll deletes a tracked file",
      "The true distance to the switch-over", "map:modules-and-phases.md#B.6 Type checking", "map:README.md#Touch this@scala_src/typechecker/",
      "index:inference"],
    checks: [
      "positions:A type parameter the arguments do not fix", "positions:The order of the checker's attempts at a call",
      "positions:Conversions never change which declaration runs", "positions:The implicit bound of an unbounded type parameter", "positions:The S1 form",
      "ledger:447", "ledger:505", "ledger:425", "ledger:516", "ledger:535", "ledger:541", "ledger:508",
      "doc:explorations/reviews/decisions-review/popl-recheck.md#1.8 Row 447", "doc:explorations/reviews/decisions-review/popl-recheck.md#1.9 Row 516",
      "doc:research/extracts/ParkPOPL2019-extract.md#4.2 The dynamic choice", "doc:Specification/basic/inference.tex#Type Inference",
      "doc:Specification/appendices/changes.tex#The inference of a call's static arguments",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def typedApplication(",
      "The XXX expected-failure mechanism in compiler_tests/ and library_tests/"],
    expectedMoves: [] }

const O_ENTRY = { id: 'O', slug: 'rung-overloading-checker', path: '/home/user/fortress-ovcheck', branch: 'wip/rung-overloading-checker', tail: O_TAIL, expectedMinutes: 210, writesState: false, testIsStage: false,
    blurb: "the compiled overloading checker: under Q1 = (a), functional methods checked by the specification's own Meet Rule for them, the per-provider check kept (row 556); an inherited method's type parameter no longer captured by its trait's; the overloading memo no longer answering in one trait's context for what it found in another's; no crash on a character literal against the one library (row 477) or under a generic excludes clause (row 557); Scala and Java.",
    briefing: [
      "positions:The specification stays the standard", "positions:The static-parameter sentence goes",
      "positions:The comprises passages read at the level of values", "positions:The library's own practice is the standard",
      "positions:The library route", "positions:Test first, the test kept", "positions:No re-measuring what the record holds",
      "positions:Reversible stops do not hold a batch", "positions:The checker count is measured, never red", "ledger:556", "ledger:545", "ledger:546",
      "ledger:557", "ledger:477", "ledger:547", "ledger:544",
      "doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@The rest of the one library's seq family",
      "doc:explorations/compile-ladder/plan-7b/probes/P2.md#The answers", "doc:explorations/perf-probes/nat/triage.md#3. The classification",
      "doc:explorations/perf-probes/nat/triage.md#1. The two copies, reproduced, and why the count moves",
      "doc:Specification/advanced/overloading.tex#Meet Rule",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def getFunctionalMethods(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def toFunctionalMethodArrows(..private def toMethodArrows(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private val validOverloadingMemo..private def validOverloadingInner(",
      "code:ProjectFortress/src/com/sun/fortress/compiler/Types.java#public static void useFortressLibraries()",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#def staticParam(x: Id)", "The hidden layer, classified",
      "Crashes reach zero in the shadow", "The compiled checker accepts the Meet Rule's comprises example by a coverage check",
      "The one library's refused overload families are repaired by its own exclusions",
      "The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "ant compileAll deletes a tracked file",
      "The true distance to the switch-over", "map:modules-and-phases.md#B.7 Overloading", "map:README.md#Touch this@scala_src/typechecker/",
      "index:overloading"],
    checks: [
      "positions:The specification stays the standard", "positions:The static-parameter sentence goes",
      "positions:The comprises passages read at the level of values", "positions:The library's own practice is the standard",
      "positions:The library route", "ledger:556", "ledger:545", "ledger:546", "ledger:557", "ledger:477",
      "doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@The rest of the one library's seq family",
      "doc:explorations/perf-probes/nat/triage.md#3. The classification", "doc:Specification/advanced/overloading.tex#Meet Rule",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def toFunctionalMethodArrows(..private def toMethodArrows(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private val validOverloadingMemo..private def validOverloadingInner(",
      "The hidden layer, classified"],
    expectedMoves: [] }

const Q_ENTRY = { id: 'Q', slug: 'rung-numeral-library', path: '/home/user/fortress-numlib', branch: 'wip/rung-numeral-library', tail: Q_TAIL, expectedMinutes: 230, writesState: false, testIsStage: false,
    blurb: "the one library takes the compiler library's sibling IntLiteral under Number with a coerce into each number type, ZZ32's comparisons on ZZ32, each integer type's own CMP, MAXNUM and MINNUM (item 33, row 517), the numeral case in exactValue (Q-lib), and RR64 coerces from NN32 (R9); the literals, coercion and number chapters in the S1 form; the one measurement the numeral switch names, under walk; library and glue, no evaluator file.",
    briefing: [
      "positions:The numeral switch, split by where the static types are", "positions:NN32 coerces into RR64",
      "positions:Mixed widths convert by declared coercions", "positions:Each integer type declares its own MIN, MAX and MINMAX",
      "positions:The exclusion rule stays and the tower is flat", "positions:The library route", "positions:The library's own practice is the standard",
      "positions:Every change to the specification is recorded with its reason", "positions:The S1 form", "positions:The model's text is the notation",
      "positions:Test first, the test kept", "positions:No re-measuring what the record holds", "positions:Reversible stops do not hold a batch",
      "ledger:454", "ledger:517", "ledger:484", "ledger:442", "ledger:79",
      "doc:explorations/reviews/numeral-switch-judgement.md#4.4 What goes into each half",
      "doc:explorations/reviews/numeral-switch-judgement.md#4.5 The = device", "doc:explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md#The answers",
      "doc:explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md#5. Number's =, the named sites and the probe programs",
      "doc:explorations/reviews/batch-N-review.md#Findings@Item 33's second half",
      "doc:explorations/reviews/batch-6.5b-review.md#Findings@Batch 8's R9 will make the passage V revised false",
      "doc:Specification/basic/expressions/literals.tex#Literals", "doc:Specification/basic/conversions-coercions.tex#Principles of Coercion",
      "doc:Specification/appendices/changes.tex#The single-precision floating-point type",
      "doc:Specification/appendices/changes.tex#Integers in floating-point expressions",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral", "code:Library/FortressLibrary.fsi#trait RR64 extends",
      "code:Library/FortressLibrary.fsi#trait ZZ64 extends", "code:Library/FortressLibrary.fss#exactValue(x: Number)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java#public class IntLiteral",
      "A numeral's type depends on the path and on the library in scope", "The numeral switch, measured under walk",
      "The one library's number tower is flat", "Under walk, the interpreter converts by coercion at its three kinds of type check",
      "The coercions between number types carry a sum's zero", "ant compileAll deletes a tracked file", "The true distance to the switch-over",
      "map:README.md#Touch this@Library/FortressLibrary.fss", "index:numeral"],
    checks: [
      "positions:The numeral switch, split by where the static types are", "positions:NN32 coerces into RR64",
      "positions:Mixed widths convert by declared coercions", "positions:Each integer type declares its own MIN, MAX and MINMAX",
      "positions:The library route", "ledger:454", "ledger:517", "doc:explorations/reviews/numeral-switch-judgement.md#4.4 What goes into each half",
      "doc:explorations/reviews/batch-6.5b-review.md#Findings@Batch 8's R9 will make the passage V revised false",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral", "code:Library/FortressLibrary.fss#exactValue(x: Number)",
      "A numeral's type depends on the path and on the library in scope"],
    expectedMoves: [] }

const M_ENTRY = { id: 'M', slug: 'rung-library-meets', path: '/home/user/fortress-meets', branch: 'wip/rung-library-meets', tail: M_TAIL, expectedMinutes: 180, writesState: false, testIsStage: true,
    blurb: "the one library's remaining Meet Rule pairs inside one type repaired by its own devices (declarations on the meet), String's own juxtaposition pair, the Return Type Rule slips of its declarations, rows 483 and 531, and batch 7b's two review-routed test files; under Q1 = (a) no device for a top-level pair of two functional methods; library declarations only.",
    briefing: [
      "positions:The library's own practice is the standard", "positions:The static-parameter sentence goes",
      "positions:AnyIntegral's closure and how the checker reads comprises", "positions:The exclusion rule stays and the tower is flat",
      "positions:The model's text is the notation", "positions:Test first, the test kept", "positions:No re-measuring what the record holds",
      "positions:Reversible stops do not hold a batch", "ledger:556", "ledger:483", "ledger:531", "ledger:421", "ledger:492",
      "doc:explorations/compile-ladder/plan-7b/probes/P2.md#The answers",
      "doc:explorations/compile-ladder/plan-7b/probes/P2.md#2. The devices and what each clears",
      "doc:explorations/compile-ladder/plan-7b/probes/P2.md#3. What it settles and leaves open",
      "doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@review-routed.1",
      "doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@review-routed.2",
      "doc:explorations/perf-probes/nat/triage.md#3. The classification", "doc:Specification/advanced/overloading.tex#Meet Rule",
      "doc:Specification/advanced/overloading.tex#Principles of Overloading",
      "code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3", "code:Library/FortressLibrary.fsi#trait Maybe[",
      "code:Library/FortressLibrary.fsi#trait StandardMutableArrayType[", "code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[",
      "code:Library/Random.fsi#object UniformDistribution", "The hidden layer, classified",
      "The one library's refused overload families are repaired by its own exclusions",
      "fill takes a value and tabulate a function, both defined where the array diamond meets", "Every functional-method name of the library is reserved",
      "testSystem's four shards are one suite split by sorted index", "The interpreter's overload-ambiguity message names its two declarations",
      "The true distance to the switch-over", "map:README.md#Touch this@Library/FortressLibrary.fss",
      "map:dormant-code.md#1.1 Commented-out declarations in", "index:overloading"],
    checks: [
      "positions:The library's own practice is the standard", "positions:The static-parameter sentence goes",
      "positions:AnyIntegral's closure and how the checker reads comprises", "positions:The exclusion rule stays and the tower is flat", "ledger:556",
      "ledger:483", "ledger:531", "doc:explorations/compile-ladder/plan-7b/probes/P2.md#The answers",
      "doc:explorations/compile-ladder/plan-7b/probes/P2.md#2. The devices and what each clears",
      "doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@review-routed.1",
      "doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@review-routed.2", "doc:Specification/advanced/overloading.tex#Meet Rule",
      "code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3", "code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator["],
    expectedMoves: [] }

const RUNGS = [I_ENTRY, O_ENTRY, Q_ENTRY, M_ENTRY]
const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)

const INTRO_RUNG = {
  I: "I makes the compiled checker bind a type parameter that nothing at a call fixes to its declared bound, Any if none, under what the expected type requires, never to Bottom and never to the union of the arguments' types (Pavol's decision on the POPL 2019 paper's instance rule), and try a call by subtyping without the expected type first, keeping that attempt when its result converts, before coercion with the context (his decision on row 508); it promotes or rewrites the expected failures of rows 447, 505, 508, 515, 516, 518, 535 and 541, gates row 425 where a compiled test can hold it, and revises the inference chapter's passages on Bottom and its Appendix I entry in the S1 form.",
  O: "O makes the compiled overloading checker, under Q1 = (a), check pairs of functional methods by the specification's Meet Rule for them, which asks a meet only of a type that provides both, keeping the per-provider check (row 556); instantiates an inherited method without letting its trait's type parameter capture the method's; stops the overloading memo answering in one trait's context for what it found in another's; and ends two crashes, every character literal typed by a name only the compiler's library declares (row 477) and the kind environment under a generic excludes clause (row 557).",
  Q: "Q gives the one library the compiler library's numeral type, IntLiteral as a sibling under Number with a coerce into each number type, ZZ32's comparisons on ZZ32, each integer type's own CMP, MAXNUM and MINNUM (PLAN item 33, row 517) and the numeral case in exactValue, the library half of Pavol's numeral switch (Q-lib), with RR64 coercing from NN32 beside it (R9), the literals, coercion and number chapters in the S1 form, and takes the one measurement his decision names: where arithmetic lands under walk on the two microGPT programs and the interpreter tests.",
  M: "M repairs, with the library's own devices, the Meet Rule pairs a type provides together, String's own juxtaposition pair and the Return Type Rule slips of the library's declarations, fixes rows 483 and 531, and rewords and renames the two test files batch 7b's merged-diff review left to the next batch; under Q1 = (a) it builds no device for a top-level pair of two functional methods, which rung O's rule takes.",
}
const INTRO_STOPS = {
  I: "for I, a compiled test whose verdict changes other than by I's intent, a change to answer 9's positional or return-type rule or to a file section 4 of the record names as O's, a parameter nothing fixes bound to anything but its bounds under the expected type, normative text beyond the inference chapter's named passages and entry, and any walk edit",
  O: "for O, a compiled test whose verdict changes other than by O's intent, the Meet Rule dropped for a type that provides both functional methods or changed for a family that mixes a top-level function with functional methods (row 545), a change to answer 9's positional or return-type rule or to batch 7b's coverage check, any library edit, and a file section 4 names as I's",
  Q: "for Q, a changed walk output its measurement does not account for, a changed value printed by either microGPT check, a team test line changed or a team expected failure turning green, an edit to the compiler library, the checker or walk's evaluator, Number's = changed beyond exactValue's numeral case, a comparison of numbers answering differently from the base where the values are equal, and a declaration section 4 names as M's",
  M: "for M, a team test line changed, a checker or walk edit, a pair whose only repair is a checker change, a device that states an exclusion false of some library type, a slip whose repair changes a value walk prints, and a declaration section 4 names as Q's",
}
const INTRO_LIFTED = {
  I: "I changes which programs the compiled checker accepts and at which instance, and states the rule in the inference chapter, normative text in the S1 form, its departures removed from its Appendix I entry (the paper's instance rule and the order of attempts); it promotes expected failures, and rewrites row 535's link test into the refusal the rule gives",
  O: "O makes the compiled checker accept pairs of functional methods the text accepts (under Q1 = (a)) and sets the checker's character type to the one library's Char, and promotes rows 556's and 557's expected failures",
  Q: "Q changes the one library's numeral type and Number's and ZZ32's comprises clauses, adds coercions, comparisons, MAXNUM and MINNUM to the number types, and states them in three chapters in the S1 form (the numeral switch, R9 and item 33)",
  M: "M adds declarations on the meet and corrects declared types in the library, and renames one walk test file with its component, no assertion changed (review-routed.2)",
}
const OVERLAP_RUNG = {
  I: "I edits Functionals.scala, STypesUtil.scala and Formula.scala under scala_src/ (and TypeAnalyzer.scala only for a solver declaration row 541 needs, named), adds, promotes and rewrites files in ProjectFortress/compiler_tests/, and edits Specification/basic/inference.tex and, in Specification/appendices/changes.tex, the entry The inference of a call's static arguments and its sentence of Passages not yet revised.",
  O: "O edits OverloadingChecker.scala, OverloadingOracle.scala (the rule for functional methods only), TypeAnalyzer.scala (staticParam's caller, row 557) under scala_src/ and compiler/Types.java, and adds and promotes files in ProjectFortress/compiler_tests/.",
  Q: "Q edits ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, the number types' declarations of Library/FortressLibrary.fsi and .fss that section 4 of the record names as Q's, interpreter/glue/prim/IntLiteral.java, the literals, coercion and number chapters, a new entry and the entry Integers in floating-point expressions of Specification/appendices/changes.tex, and adds and promotes files in ProjectFortress/tests/.",
  M: "M edits the declarations of Library/FortressLibrary.fsi and .fss that section 4 of the record names as M's, Library/RangeInternals.fsi and .fss, Library/String.fss, Library/FlatString.fss and Library/Random.fsi and .fss, adds and promotes files in ProjectFortress/tests/, and rewords two test messages and renames one walk test file.",
}

const BATCH_INTRO = [
  "This run is climb batch 8, the record CLIMB-BATCH-8.md and phase 3's next batch after 7b, toward the checker at a true zero: two checker rungs and two library rungs. It builds Pavol's decisions of 2026-09-29 on the POPL 2019 paper's instance rule and on the order of the checker's attempts at a call (rung I), the library half of his numeral switch with NN32 coercing into RR64 beside it (rung Q), and the Meet Rule and the residue his decision on AnyIntegral's closure left to batch 8 (rungs O and M), with the record's Q1 to Q4 at the answers its section 1 records. Batch 7b and the batch script's fixes from its review have landed before it, and so has the one-time strip of the tests' specification line numbers.",
  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),
  "Each rung's section of the record opens with its answers line: Pavol's answers to the record's questions, or the default each takes while he has not answered. Text a section marks with an answer applies only while that answer is written in the line.",
  "A rung that measures the checker count or the distance stage takes as its before the last landed gate's table and per-site list, the ones the gate itself compares against (checker-count.txt and distance.txt in the newest explorations/compile-ladder/climb-batch-*/gate/, and explorations/compile-ladder/gate/distance-sites.tsv), and does not run the stage on its unchanged base; it runs the after once, on its own tree, into its tmp/SLUG/. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, No re-measuring what the record holds).",
  "Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it: the worker and the repair round read that line before the entry and act on it, and the skeptic and the judges, who are not given the tail, find each key's line beside it in explorations/compile-ladder/plan-8/manifest/lists8.py.",
  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a declaration or a file section 4 of the record names as another rung\'s.',
  'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.',
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, Reversible stops do not hold a batch): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before. A stop that turns on a test's verdict is judged by the gate on the merged tree; a rung runs a whole suite only as the shared prefix allows a checker or walk rung, once per code state.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, Reversible stops do not hold a batch).",
  "Every choice a rung makes that its section leaves to it is reported as a decision, with the alternatives considered and the evidence that settled it.",
  "The one corpus comparison in this run is rung Q's, named by Pavol's decision on the numeral switch: one edit pass over ProjectFortress/tests/ with the runner under explorations/coordinator/tools/count-run/, against the base pass the coordinator started before the launch, the listed unstable tests masked, and the two microGPT checks under walk once on Q's tree. No other rung compares the interpreter corpus's outputs or runs a microGPT check.",
  "The gather's rules: rows close only where their tests pass on the merged tree. Under Q1 = (a), the Meet Rule class is partitioned between rungs O and M by the shape of each error's message, and the post-batch review ties every moved row of the merged tree's tables to a rung's edit. A new test cites the specification by file and section or entry, never by line; a rung that renames or removes a cited section updates that citation in the commit of its edit.",
  "No rung commits Specification/fortress.pdf: the commit stage rebuilds the specification once on the landed tree, since rungs I and Q edit its text and rungs Q and M the .fsi files Part IV is rendered from.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is a section of its REPORT.md, which the landing report carries to him.",
  "Cite a FACTS.md entry and a POSITIONS.md position by its bold title, since both files' line numbers move.",
].filter(Boolean).join(' ')
const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + "Shared: Library/FortressLibrary.fsi and .fss between Q and M, by declaration as section 4 of the record names them; Specification/appendices/changes.tex between I and Q, by entry; TypeAnalyzer.scala between O and I only where I names a solver declaration of its own; ProjectFortress/compiler_tests/ between I and O and ProjectFortress/tests/ between Q and M, on distinct files. A file added to ProjectFortress/tests/ moves the testSystem shards, which the gate compares by their sum. The checker count and the distance read I's, O's, Q's and M's changes alike; none predicts a total. The files every rung reaches are the record files, folded centrally by the gather."
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
const SITES = 'explorations/compile-ladder/gate/distance-sites.tsv'   // the distance stage's per-site list, one fixed path overwritten at each landing (post-mortem 2026-09-29, synthesis item 37)
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
"You are an agent in the Fortress revival's compile-path climb (@palimondo's revival of Sun's Fortress programming language). " + BATCH_INTRO + " A rung worker's brief, and its repair round's, carries the rung's section of " + BATCH_RECORD + " word for word as its tail; a skeptic's carries that section's paragraph for the skeptic; a judge's and those of the stages on the merged tree carry what they rule on and read. Each role's briefing prints the decisions the rung rests on. Read the record's sections 1 and 2 only where your brief points you there, and never the whole file.",
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
'Work ONLY in the worktree your tail names, and in the rung\'s private copy of the base beside it, WORKTREE-base ("The old code beside the new", below). The other rungs are running at the same time in their own worktrees; never read or write outside your own. Never touch /home/user/fortress, which is the main tree.',
'',
'Nobody made the worktree at the launch: the rung worker makes it, before its step 1, and every later role of the rung finds it made. Substitute WORKTREE and BRANCH from your tail. The command adds the worktree to the main tree\'s repository without touching its files; it reuses a worktree that exists (a relaunch after a VM restart) and a branch already pushed (a relaunch after the container died), and otherwise cuts the branch from the base, ' + BASE + '. And it seeds the worktree from the batch\'s base build, ' + BASE_BUILD + ', a worktree at the base that the coordinator built once before the launch: it copies that build\'s ProjectFortress/build and default_repository/caches and translates the caches\' path keys, in about 3 s, so that the worktree runs walk and the compiled path at once, the library already compiled in order (explorations/coordinator/build-cache-exploration.md; POSITIONS, "Nothing is built or run twice on the same code."):',
'',
'    ' + SEED + ' ' + BASE_BUILD + ' WORKTREE BRANCH ' + BASE,
'    cd WORKTREE && git push -u origin BRANCH',
'',
'Build nothing to set it up: no ant compileAll and no library order, until an edit of yours needs one ("After an edit", below). A worktree that already has a build is left as it is, so a relaunch keeps your own. If the command exits 2 (the base build missing or not clean) it made nothing: then make the worktree with git -C /home/user/fortress worktree add -b BRANCH WORKTREE ' + BASE + ' (without -b BRANCH for a branch that exists), build it once as "After an edit" says for Java or Scala, and say so in REPORT.md.',
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
'## After an edit, and after a failed build',
'',
'ProjectFortress/build and default_repository/caches are gitignored and your worktree\'s own, seeded from the base build. Never symlink another tree\'s build into your worktree: the classpath probe then resolves every cache path to that tree (explorations/coordinator/batched-climb-review.md, finding 2). Fortress notices an edit only when you compile what you edited: compiling your own program never recompiles the library under it, and a step skipped runs the old code with no warning or dies with NoSuchMethodError. Wipe the caches for none of these (explorations/coordinator/build-cache-exploration.md, section 2):',
'',
'- A library component\'s .fss edited, and not its .fsi: fortress compile that component alone (CompilerBuiltin about 60 s, CompilerLibrary about 25 s, the others 2 to 16 s). Programs need no recompile.',
'- The .fsi of AnyType, CompilerBuiltin, CompilerLibrary or CompilerAlgebra edited, the roots every api depends on: all five in the library order below, about 100 s. CompilerSystem.fsi edited: CompilerSystem alone.',
'- Under walk nothing is needed: walk reads an edited library source again on its next run.',
'- Java or Scala edited: ant compileAll through run_bg, 25 to 40 s on a built tree. It deletes default_repository/caches first (build.xml:356-360, :715), so restore the one tracked file in it, git checkout -- default_repository/caches/global.map, and run the library order before your next compiled run (fortress compile, fortress run, junit.sh). harness-one.sh, the checker count, the distance stage and the suites use caches of their own and need neither.',
'- ant compileAll failed: fix the error and run it again; the caches are already gone, and global.map and the library order follow as above. A fortress compile of a library component that failed or was killed wrote nothing, or only its jar: fix it and compile that component again before any compiled run, since until then programs link its old jar without a warning. A NoSuchMethodError from a compiled run means a component was not recompiled after an edit or after ant compileAll: recompile it, or run the library order.',
'',
'The library order, from your worktree:',
'',
'    cd ProjectFortress',
'    ../bin/fortress compile LibraryBuiltin/AnyType.fss',
'    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss',
'    ../bin/fortress compile ../Library/CompilerLibrary.fss',
'    ../bin/fortress compile ../Library/CompilerAlgebra.fss',
'    ../bin/fortress compile ../Library/CompilerSystem.fss',
'',
'about 100 s after ant compileAll: AnyType 17, CompilerBuiltin 63, CompilerLibrary 27, CompilerAlgebra 2, CompilerSystem 2. Two traps measured in rung 7: a fortress compile whose source has not changed writes nothing and exits 0; and a change to a native helper\'s signature leaves a stale class in default_repository/caches/nativewrapper_cache that must be deleted or the old signature is what the run links against.',
'',
'## The old code beside the new',
'',
'A run on the base\'s code once your worktree holds an edit (a test, or a program of your own run old against new) never reverts and rebuilds your worktree. It runs in the rung\'s private copy of the base, WORKTREE-base: a detached worktree at the base, seeded from the base build in about 3 s by the first role of the rung that needs it, and reused by the rung\'s later roles, since the command leaves a copy that exists as it is:',
'',
'    ' + SEED + ' ' + BASE_BUILD + ' WORKTREE-base - ' + BASE,
'',
'Run in it from your own scratch directory with FORTRESS_HOME set on the command line, because bin/fortress takes FORTRESS_HOME from the shell whenever it is set (bin/fortress_home) and env.sh set it to your worktree; the first line is the compiled path, the second walk:',
'',
'    FORTRESS_HOME=WORKTREE-base WORKTREE-base/bin/fortress compile P.fss && FORTRESS_HOME=WORKTREE-base WORKTREE-base/bin/fortress run P',
'    FORTRESS_HOME=WORKTREE-base WORKTREE-base/bin/fortress P.fss',
'',
'Each rung has its own copy and the roles of one rung run one after another, so no two agents ever compile into one cache: every compile rewrites cache files of the tree it runs in. Never compile or run anything in ' + BASE_BUILD + ' itself, from which every worktree of the batch is seeded and which must stay clean, nor in another rung\'s worktree or copy.',
'',
'## Long commands: run them in the background and poll, and never pipe ant through tail',
'',
'The Bash tool has a 10-minute ceiling and ant testFast is longer than that. Never pipe ant (or any long command) through tail: the summary you need is at the end and you will have to re-run to see it, which cost 21.7 minutes of the last climb. Capture the full output to a file under tmp/ and grep the file. Use these two helpers rather than inventing a sleep loop - the last batch lost 8.2 minutes to polls that overshot their sentinel:',
'',
'    run_bg () {            # run_bg <logfile> <command string>; the subshell makes the redirection cover the whole string, so a cd inside it neither escapes the log nor moves a relative log path',
'        nohup bash -c "( $2 ) > \'$1\' 2>&1; echo EXIT=\\$? >> \'$1\'" >/dev/null 2>&1 &',
'    }',
'    wait_for () {          # wait_for <logfile> [max-seconds, default 270]; 5-second granularity; call it again if it times out',
'        local n=0',
'        while ! grep -q \'^EXIT=\' "$1" 2>/dev/null ; do',
'            sleep 5 ; n=$((n+5))',
'            [ "$n" -ge "${2:-270}" ] && { echo "still running after ${n}s" ; return 1 ; }',
'        done',
'        grep -n \'^BUILD \\|^Total time:\\|^EXIT=\' "$1"',
'    }',
'',
'The default bound is 270 s so that each call returns inside the prompt cache\'s five minutes: a longer wait makes your next call write your whole context to cache again, which was half of all the tokens the batches wrote. Call wait_for again until it prints the BUILD line. Do not chain shorter sleeps in one call.',
'',
'Stop or kill only processes that run under your own worktree\'s path (readlink /proc/<pid>/cwd, or the path in their arguments), never by a script\'s name across the box: the other agents of the batch run copies of the same scripts in their own trees, and climb batch 6.5b\'s rung V, stopping its own pass by the name count-run.sh, killed rung E\'s corpus passes (explorations/reviews/batch-6.5b-review.md, finding 4).',
'',
'Your scratch (probe programs, captured outputs, build logs, lists, copies of tools) goes under tmp/SLUG/ in your worktree, which .gitignore:64 ignores. It is never committed, on your branch or anywhere. Your skeptic and your judge read it there.',
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
'1. **Measured by anyone and repaired in this rung** - by the worker in its own first pass, by the skeptic, or in a repair round: it gets an ASSERTION in the rung\'s own gated test, and that assertion exists and passes BEFORE the second skeptic runs. Not a FACTS line, not a probe: an assertion. The cheapest form is an extra assert in the .fss file the rung already added; a new file is only needed when the defect is in another area. The assert message says what is checked and the expected answer in plain words. A specification rule is cited by its file and its section or entry by name (conversions-coercions.tex, section "Principles of Coercion"), never by a line, as every test of the corpora has cited it since the one-time strip of line numbers (dc0eee2fe): a specification edit moves no test\'s citation, and no rung re-cites one for a moved line. What a citation is checked for is that the named section\'s text says what the message says. A rung that renames or removes a section a test names changes that citation in the commit of its edit. No ledger row, POSITIONS entry, FACTS title or PLAN item in a message. The ledger row goes in the commit message and may go in the file\'s one comment line.',
'',
'2. **Deferred, and the specification settles it** - the rung does not repair it, but the specification says what the answer is: it gets a gated EXPECTED-FAILURE test, whose file name starts with XXX. The harness makes this a real check, not a wish. FileTests.java:932 sets shouldFail = s.startsWith("XXX") from the file name; :587 and :654 make (shouldFail != failed) the failure condition, so an XXX test that STARTS PASSING turns the suite red, and :851 says the suite prints "XXX tests that succeed". So write XXX<Name>.fss asserting what the SPECIFICATION says, with a .test file beside it; it fails today, which is expected, and the day anyone repairs the defect without closing the ledger row the gate says so. 224 XXX*.test files in compiler_tests/ already use this. In compiler_tests/ and library_tests/ a run test whose run_out_ check is unmet fails whatever its name, because :583-585 fail it (the check at :534-539) before :587 reads the flag, and a run test with no run_out_ check demands PASS (:276-282): so a program that compiles and then dies at run time is two .test files over one component, a plain link test and an XXX run test whose key names output the failing run does print before it dies, run_out_contains=REACHED with REACHED printed before the failing call, or run_out_does_not_contain=REACHED where it dies before any output, never run_out_contains=PASS (FACTS.md, "The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only, and a run-time defect needs two .test files", and "Two constraints of the test and native machinery, measured by rung S"; climb batch 6.5b\'s gate went red on a PASS key, explorations/reviews/batch-6.5b-review.md, finding 1). One caveat, from the harness\'s own author at FileTests.java:853 -"WARNING: expect_failure is not treated consistently" - so the first XXX file a rung adds is shown through the harness itself, not only by a direct compile and run of its program: placed where the gate reads it, the harness counting it an expected failure, and on a deliberate local fix, the harness failing it (explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh for compiler_tests/ and library_tests/, its link test before its run test; explorations/compile-ladder/rung-inference-walk/harness-one.sh for tests/), and the report quotes each run\'s verdict line with its command. A program the checker accepts that then fails JVM verification, linkage or a range check at run time is settled by the specification under every reading, so its home is 2, not 3 (explorations/reviews/batch-N-review.md, measure 6). The test is owed in the batch that measures the defect, even when a later rung or batch is planned to repair it: "its test can wait for the rung that fixes it" was ruled against at the gather or review of batches 6b, 7R and 7C (explorations/reviews/batch-7C-review.md, the repeat).',
'',
'3. **Deferred, and the specification is silent** - a plain gated test that pins today\'s behaviour, named for what it pins, and a ledger row naming the open question and the test; where no program can observe it, the ledger row alone, quoting the two to five output lines that show it and the command that printed them. The record says the silence is the reason.',
'',
'## Register',
'',
'Plain sentences, no self-congratulation - we are humble custodians here and deserve no credit. No unactionable comments in the source tree: provenance and rationale belong in your report, not in code. A test file is named by its topic, as the team\'s tests are, with no rung letter or batch name, and carries at most ONE comment line saying what the program checks, which may name the ledger row it reproduces and nothing else from the record (protocol.md, principle 1; compiler_tests/AtomicTopLevelVar.fss:13-42 is the 30-line comment that rule exists to prevent). Verify against primary sources before asserting, and cite file:line. If you make a decision, say in your report that it was a decision and what the alternatives were: a decision buried in a report is a decision not made. No estimates in days or weeks.',
'',
'## What you write, and what you must not touch',
'',
'Everything you produce goes under explorations/compile-ladder/SLUG/ in your own worktree, where SLUG is in your tail:',
'',
'- REPORT.md - what you found, what changed and why, every citation as file:line, the failing run\'s two to five lines quoted with its command, and the passing run\'s line, the precedent search, what the specification settles and the passages that settle it, each differential you ran, in a sentence.',
'- record.md - the record lines the coordinator will fold at merge time: the FACTS.md entry this rung earns (the fact, its source and its test in a few lines, a few hundred bytes, under a bold title; the detail stays in your REPORT.md, which the entry cites, so do not restate the report), the ledger note (which row, and exactly what to append - rows are never renumbered or moved, they are cited from thirty-five reports), and the handover state line. Write them as finished prose, ready to paste.',
'',
'Nothing else under explorations/, but the decision record your tail asks for if it asks for one: your scratch is under tmp/SLUG/ in your worktree, which .gitignore ignores, and it is never committed.',
'',
'Do NOT edit explorations/coordinator/FACTS.md, the gap ledger, PLAN.md, POSITIONS.md, INDEX.md, the handover document, CLAUDE.md, explorations/protocol.md, the tools under explorations/coordinator/tools/ (a rung runs them, it does not change them), or anything under .claude/. Parallel rungs conflict on every one of those - 28 of 28 replayed pairs conflict on FACTS.md and on the handover - which is the whole reason the record leaves you and is folded centrally.',
'',
'Do NOT run ant testFast or ant testSystem. The batch is gated once, after the merge, by the coordinator. Running the gate here costs 582 s and buys nothing: across nine skeptic runs of the last climb, not one of the 26 findings was load-bearing on a suite failure.',
'',
'Nor run a whole suite another way (a track\'s JUnit class over its whole corpus, the harness over every file of a corpus, the interpreter suite in shards), with one exception. A rung whose edit changes the checker\'s or walk\'s source (Java or Scala under ProjectFortress/src/) may run the suite its edit reaches, whole, at most once per code state in the rung\'s chain: the compiler and library tracks for the checker, the interpreter suite for walk. The worker runs it once after its last edit, and a repair round once after its own; each quotes the verdict lines, the command and the commit it ran on in REPORT.md. The skeptic reads that result and does not run it again: a code state is a commit of the branch, and only a commit that changes code starts a new one. Every other rung leaves the suites\' verdict to the gate, and so does every rung for a stop of the batch record that turns on a test\'s verdict: the gate judges it on the merged tree. In climb batch 7b one rung\'s chain ran the compiler and library tracks whole five times, twice on an unchanged tree, about 8 minutes of the box each, and none found what its targeted runs had not (explorations/reviews/batch-7b-review.md, finding 5).',
'',
'## What you cite',
'',
'Cite the Fortress tree at file:line and your own REPORT.md. A result from your scratch is quoted in the report, two to five lines, with the command that produced it; never cite a file under tmp/.',
'',
'## Commit and push as you go - on your own branch only',
'',
'Your worktree is on its own wip/ branch, cut from ' + BASE + ', which you pushed when you made it. Commit on it at every milestone and push after every commit with git push -u origin <your branch>: after the failing test is written and seen failing, in a commit that holds the test alone, so that your skeptic sees in the history, and in your transcript, that it came first; after the edit and the pass; after REPORT.md and record.md; after anything else worth not losing. The batch of 2026-09-17 kept every worktree dirty and lost all of it when the container died; this is the insurance against that, and nothing else. Write plain messages that say what state the commit captures; the landed commit is composed by the coordinator from your branch\'s net change, so your commits are not history that must be shaped. Never commit to main, never push to any branch but your own, never force-push, and never put a model identifier in a commit message. End every commit message with exactly these two lines:',
'',
'    Co-Authored-By: Claude <noreply@anthropic.com>',
'    Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB',
'',
'## If your branch already carries commits',
'',
'The batch may have been relaunched after its container died or its VM was restarted; both have happened (2026-09-17, 2026-09-18), and the second time the disk survived and the wip/ branches held every pushed milestone. Then your branch already holds the earlier attempt\'s milestones, and your worktree may hold its uncommitted edits and its tmp/ logs. Before anything else: git log --oneline ' + BASE + '..HEAD, git status --short, and the newest files in tmp/. Committed work is yours to verify, not to redo: read it as you would a colleague\'s, read its checks\' logs, and continue from where it stops. A check whose log is complete (it ends in its EXIT= line, or its verdict or table is whole) stands, and is not run again, unless the tree changed after it (git log -1 --format=%ci and git status against the log\'s time say which); a log that is cut off or whose last step failed means that step is still to be done. Uncommitted edits are the same once you have read them. In climb batch 7b a resumed worker ran the compiler and library tracks and the distance stage again on a tree whose results were complete on disk, about 25 minutes of the box (explorations/reviews/batch-7b-review.md, finding 5). Nothing on the branch has been through a skeptic yet. Say in your report what you inherited and what you re-verified.',
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
'From explorations/coordinator/PLAN.md and Pavol\'s rule of 2026-09-17: the test first, seen failing, then the fix, the test staying in the corpus:',
'',
...(repairRound ? sliceStep([rung], 'your worktree (' + rung.path + ')') : briefingStep(rung, 'your worktree (' + rung.path + ')')),
...(rung.testIsStage ? [
'2. Your rung declares testIsStage: its failing-then-passing test is the gate\'s checker-count stage (gate step 8) and NOT a .fss program: no program can yet be compiled against the interpreter\'s prelude, and this is the one place the test-first rule is met by a permanent stage instead of a test file (explorations/coordinator/library-route-judgement.md section 2 step 1; Pavol\'s decision of 2026-09-21, POSITIONS.md, "the library route"). Its before is the last landed gate\'s table and per-site list, which the batch intro and your tail name (POSITIONS.md, 2026-09-28: a rung does not re-run the stage on an unchanged base); read them, and do not run the stage before your edit.',
'3. Once steps 4 and 5 below are done (the edit and its rebuild), run the stage once in your worktree, to tmp/SLUG/checker-count-postedit.txt; read the header of explorations/coordinator/tools/checker-count/run.sh first; it runs on the worktree\'s ProjectFortress/build, the seed\'s or, after a Java or Scala edit, your ant compileAll\'s:',
'',
'        explorations/coordinator/tools/checker-count/run.sh tmp/SLUG/checker-count-postedit.txt tmp/SLUG/cc-post',
'',
'   It runs the compiler\'s static checker over Library/FortressLibrary.fss with the interpreter\'s prelude in scope, under its own private cache, and prints one row per api with that api\'s error count, then #total, #locations and #crash; 20 s measured in the main tree, and it writes nothing but the table. Start the distance stage in the background at once (gate step 9: the whole library, every checker stage run, the setting any, the overloading memo off; 13 to 24 minutes), and read its table when your report is written, with wait_for tmp/SLUG/distance-run.txt called again until it prints its EXIT= line:',
'',
'        run_bg tmp/SLUG/distance-run.txt "explorations/coordinator/tools/distance/run.sh tmp/SLUG/distance-postedit.txt tmp/SLUG/dist-post"',
'',
'   Put the diff of each pair of tables in REPORT.md and say what moved and why, api by api: the count tables by diff, the distance tables with explorations/coordinator/tools/distance/compare.sh, and errors.tsv in tmp/SLUG/dist-post, which lists every error with its site, against the landed per-site list. Commit no table: the gate\'s tables on the merged tree are the record. If the total changes, the manifest must declare the number it reaches as expectedCheckerCount and the crash line as expectedCheckerCrash when that moves - say in REPORT.md and in record.md which values the manifest needs, because the gate prints the declared total beside the one it measures, your skeptic compares your post-edit table with your report, and a crash line no rung declared is red. A rung of this kind writes no .test file; everything else in this list is unchanged, including the ladder subset of step 8 of this list and the three homes of its step 9.',
] : [
'2. Write the failing test FIRST, into ProjectFortress/compiler_tests/ (checker and codegen rungs) or ProjectFortress/library_tests/ (library rungs): a .fss component that prints PASS, plus a .test file in the format of ProjectFortress/library_tests/Boolean.test (a tests= line naming the components, then link, run, and the check line). The test is the ledger row\'s reproduction written as a clean minimal program of the core problem, not the shape the probe met it in; name it by its topic. The check line is exactly',
'',
'        run_out_contains=PASS',
'',
'   run_out_WIcontains, which Boolean.test and PLAN.md write, is implemented in the harness as of 2026-09-19 (FileTests.java:147-155, whitespace-insensitive containment beside _contains) but this batch writes _contains: one key, one meaning, and the seventeen older files are not this batch\'s business. A native-helper rung whose declarations are library declarations is a library rung: rung 7 put its test in library_tests/ (IntLiteralArithRung7).',
'3. Run it through the harness BEFORE the edit exists and see it fail. Commit the test alone. Quote the failing lines, two to five, in REPORT.md with the command. Your skeptic reads this order in your transcript (the test committed alone, seen failing through the harness on the base\'s code, then the fix) and runs nothing again; a test it does not find failing there is refused. The process this rules out is the one-off validation script: proving once by hand that something works and going ahead without leaving a permanent check in the corpus.',
'   A rung that edits only the specification or other prose, where no test can go red (a prose edit of Specification/ or Documentation/, which moves no test\'s citation, since tests name the section and not the line), makes no test-only commit and has no failure to see: steps 2, 3 and 6 do not apply, its report says so, and its skeptic checks its text against the tree and the decisions on record instead. It commits no build log, capture or PDF: if it builds the specification to see its text compile, it commits nothing the build writes, and the commit stage builds the PDF once for the batch.',
]),
'4. Make the edit, as small as the test needs.',
'5. Build what the edit needs, by the shared prefix\'s "After an edit": a library component\'s .fss, that component alone; a root api\'s .fsi, the five in library order; Java or Scala, ant compileAll, global.map restored and the library order before a compiled run.',
'6. Run the test again through the harness and see it pass; quote its verdict line in REPORT.md.',
'7. Grep BOTH corpora - ProjectFortress/tests/ and every *_tests/ directory - for a competing declaration of every name you add. Rung 1 lost a full cycle to library_tests/MaybeTest9.fss declaring its own trait Equality, which only a full run revealed; this grep costs seconds and covers it. And grep src/com/sun/fortress/ whole, not compiler/ and runtimeSystem/ alone, for every name you add: rung M found Maybe, Just and Nothing named from syntax_abstractions/, outside the scope the climb had been grepping.',
'8. Run the ladder subset for the files your names were blocking, after the edit only. The before is the last landed gate\'s ladder stage, or for a file the gate does not run, the baseline\'s recorded output (explorations/compile-ladder/baseline-2026-09-19/raw/); run a file on the base only when neither covers it or the tree changed under it, and say which. Use the restricted driver explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh with a subset.txt (corpus<TAB>file per line) listing the files the batch record names for your rung plus any file whose recorded first error in explorations/compile-ladder/baseline-2026-09-19/raw/ names one of your names. The driver writes its subset.txt and outputs beside itself (its OUT), so copy it into tmp/SLUG/ladder/ as the gate copies it, point its OUT there and LADDER_ROOT at tmp/SLUG/ladder/root: the copy is scratch and is never committed. Never run the full-corpus driver with its default root: that root is shared and its cache pruning corrupts a parallel run.',
'9. Every defect you measure gets one of the three homes the shared prefix names, and your report says which and why for each. The assertions of home 1 are in place and passing before you report; the XXX file of home 2 is in place and failing as expected, and if it is this rung\'s first one you also show it going red on a deliberate local fix and then undo the fix.',
'10. The provenance block. Under the title of REPORT.md, FIVE lines, each ending in a file:line or the literal none. problem: the measurement that made this a rung (a program line or a ladder file). spec: the governing prose passage under Specification/basic or basic-lib, found from the feature\'s row in explorations/coordinator/map/spec-to-implementation.md; a citation under Specification/library/apis/ is labelled (api listing) and is not sufficient on its own; none when the prose is silent, with the grep that shows it. precedent: the interpreter\'s declaration, the team\'s dormant draft, or the in-file shape you copied. deviation: one line per way your edit differs from the precedent and from the specification\'s spelling. historical: every file of the original 2012 tree this rung edits - anything outside explorations/ and outside the test corpora this campaign created - or none. the protocol\'s hard rule on the gate requires those edits to be flagged at commit time, and the gather copies this line into the commit message. Your skeptic opens every line the block cites and asks for a correction if one is missing or does not say what the block says.',
'11. Ledger rows. Rungs 6 and 7 opened row 317 when the specification settled a divergence the rung could not repair; do the same if you meet one. Number a new row provisionally from ' + LEDGER_FROM + ' in record.md and say that it is provisional: another rung may open one too, and the gather assigns the final numbers in manifest order (' + RUNGS.map(r => r.id).join(', ') + ').',
'',
...(rung.testIsStage ? [] : [stageBlindStep(), '']),
'Report at the end in the structured form the tool requires, and write the full detail into REPORT.md.',
'',
'Two fields of that form the script reads itself. reportText and recordText carry the full text of REPORT.md and record.md, word for word as you wrote them to the files: in batch 5 the harness refused every rung worker\'s write of REPORT.md, and a file your branch does not carry is written by the gather from these fields verbatim, so they are the report whenever the file is not. If the harness refuses a write, say so in notDone and go on. stopsMet lists every stop the batch record\'s intro reserves for Pavol that this rung met, including one met on part of the work while the rest lands (a passage reported without choosing, a test whose verdict changed other than the rung\'s own), each with its evidence as file:line; a stop the intro names as lifted, or that another decision of his lifts, carries in liftedBy the POSITIONS.md line of that decision. Only Pavol lifts a stop: an entry without such a line holds the batch\'s push until he does, and an empty list says the rung met none. forPavol lists every point for Pavol that this rung does not settle, one entry each, with its evidence as file:line: a decision taken here on a question that was his, a fork with its candidates and costs, a defect or divergence that lands unrepaired and needs his word, anything REPORT.md or record.md says goes to him. The reports the tail\'s "What comes back to Pavol" names are not such points; they reach him with the landing. The gather puts each point into PLAN.md.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The skeptic's role blocks. batched-climb-plan.md section 3, as Pavol's decisions
// of 2026-10-02 narrowed them (POSITIONS.md, "Test first, the test kept." and
// "Nothing is built or run twice on the same code."; the four changes of
// explorations/coordinator/skeptic-scope-judgement.md, section 5, that he took): the
// skeptic builds nothing and reads test-first in the worker's transcript; it compiles
// and runs only its own small programs, with the rung's build for the new code and the
// rung's copy of the base build for the old; its brief carries the rung's paragraph
// for the skeptic, not a pointer to the batch record; SKEPTIC.md is committed, not read
// back and sent again; and the second skeptic checks only the repair against its own
// refusal. climb-batch-workflow.md, "Climb batch 9: one base build, and a skeptic that
// reads".
// ---------------------------------------------------------------------------

// The rung's paragraph for the skeptic, from its tail, which carries the rung's section
// of the batch record word for word. Until 2026-10-02 the prefix said the skeptic's brief
// carried that section, and it carried none: every skeptic of climb batch 8 read the
// record for it, 7K to 15K tokens each (skeptic-scope-judgement.md, section 5, item 4).
function forTheSkeptic(rung) {
  const lines = typeof rung.tail === 'string' ? rung.tail.split('\n') : (Array.isArray(rung.tail) ? rung.tail : [])
  const para = lines.find(l => typeof l === 'string' && l.startsWith('**For the skeptic.**'))
  return ['## What the batch record asks of this rung\'s skeptic', ''].concat(para
    ? ['The rung\'s section of ' + BATCH_RECORD + ' (section 3) has a paragraph for the skeptic, here word for word. The rest of that section is the worker\'s brief, and you do not read it. Where the paragraph asks for a build, a stage run again or the test run by you, the worker\'s recorded run stands in its place, by "You build nothing" below:', '', para, '']
    : ['The rung\'s section of ' + BATCH_RECORD + ' has no paragraph for the skeptic. Read that section, under the rung\'s heading in section 3, only for a point a check below needs, and never the whole file.', ''])
}

// The transcripts a skeptic reads instead of running again what their agents ran: the
// worker's (rung:, resume:) or the repair round's (repair:). The harness writes each
// agent's transcript as agent-<id>.jsonl beside agent-<id>.meta.json, whose description
// is the label this script gives the agent, in the run's directory beside its journal;
// the newest meta file that carries the skeptic's own label is in this run's directory.
// The two jq programs were tried on climb batch 8's transcripts (run wf_603242ca-111):
// the list is 30 to 61 lines for a worker, and rung I's shows its base run at 13:10,
// its test-only commit at 13:13:16, the first build of its edit at 13:13:23.
const JQ_LIST = 'select(.type == "assistant") | .timestamp as $t | .message.content[]? | select(.type == "tool_use") | select(.name == "Edit" or .name == "Write" or (.name == "Bash" and (.input.command | test("git (commit|stash)|junit|harness|run_bg|wait_for|fortress compile|compileAll")))) | [$t[11:19], .id[-6:], .name, ((.input.command // .input.file_path) | gsub("[[:space:]]+"; " ") | .[0:150])] | join("  ")'
const JQ_CALL = 'select(.message.content | type == "array") | .timestamp as $t | .message.content[] | select((.type == "tool_use" and (.id | endswith($id))) or (.type == "tool_result" and (.tool_use_id | endswith($id)))) | $t[11:19] + "  " + (if .type == "tool_use" then (.input.command // .input.file_path // (.input | tostring)) else (.content | if type == "array" then map(.text // "") | join("\\n") else . end) end)'
function transcriptStep(rung, own, labels, whose) {
  const id = rung.id.replace(/[^A-Za-z0-9]/g, '.')
  return [
'## ' + whose + ' transcript',
'',
whose + ' transcripts are in this run\'s directory, beside your own, under the labels ' + labels.map(l => l + ':' + rung.id).join(' and ') + ' (a retry adds :attempt2 and on). These two lines print their paths, oldest first, finding the run\'s directory by your own label, ' + own + ':' + rung.id + ':',
'',
'    D=$(dirname "$(ls -t ~/.claude/projects/*/*/subagents/workflows/*/agent-*.meta.json | xargs grep -lE \'"description":"' + own + ':' + id + '(:attempt[0-9]+)?"\' | head -1)")',
'    grep -lE \'"description":"(' + labels.join('|') + '):' + id + '(:attempt[0-9]+)?"\' $(ls -tr "$D"/agent-*.meta.json) | sed \'s/[.]meta[.]json$/.jsonl/\'',
'',
'A transcript runs to megabytes: never read one whole. For a transcript T, the first command below lists its edits, commits, builds and harness runs in order, each with its time (UTC) and the last six characters of its call\'s id, 30 to 60 lines for a worker of climb batch 8; the second prints one call\'s command and its output by that id:',
'',
'    jq -r \'' + JQ_LIST + '\' T',
'    jq -r --arg id ID \'' + JQ_CALL + '\' T | head -80',
'',
  ]
}

// What a skeptic runs, and what it does not (POSITIONS.md, "Test first, the test kept."
// and "Nothing is built or run twice on the same code."). In climb batch 8 the first and
// second skeptics ran ant compileAll 15 times, each on a code state a worker had already
// built (reviews/batch-8-review.md, section 4), 8 to 14 minutes a skeptic with their
// harness runs (skeptic-scope-judgement.md, section 2).
function buildsNothing(rung, whose) {
  const copy = baseCopy(rung)
  return [
'## You build nothing',
'',
whose + ' built this rung\'s code and ran its test, and the gate builds the merged tree and runs every suite on it, so you run no build of your own (POSITIONS, "Test first, the test kept." and "Nothing is built or run twice on the same code."). You start no build tool and no library compile, and you leave the rung\'s worktree on the commit it is at, with its build as it stands. Whether the test came first, was seen failing and then passing, you read in the transcript and the recorded runs, and you run neither the test nor a stage again. What you compile and run is your own small programs: for the new code with the rung\'s own build, in its worktree, where you write them under tmp/' + rung.slug + '/skeptic/; for the old code in the rung\'s private copy of the base, ' + copy + ', seeded from the batch\'s one base build as the shared prefix\'s "The old code beside the new" says. The first line below makes the copy if no role of the rung has made it yet (about 3 s) and leaves it as it is if one has; the second compiles and runs a program P on the old code:',
'',
'    ' + SEED + ' ' + BASE_BUILD + ' ' + copy + ' - ' + BASE,
'    FORTRESS_HOME=' + copy + ' ' + copy + '/bin/fortress compile P.fss && FORTRESS_HOME=' + copy + ' ' + copy + '/bin/fortress run P',
'',
'Where the rung\'s last build is older than its last commit that changes code, its recorded runs are not of its head: that is a finding for your verdict, never a reason to build.',
'',
  ]
}

function skepticRole(rung, workerReport) {
  const copy = baseCopy(rung)
  return [
'',
'---',
'',
'# Your role: skeptic for ' + rung.id + ', ' + rung.slug,
'',
'This is the first judgement of this rung. You may refuse once; the worker then gets exactly one repair round in the same worktree.',
'',
'You did not do this work and you are not here to be agreeable. Your job is to decide whether the claim is true and whether the record is honest. The worktree is ' + rung.path + ' and it is dirty on purpose; read the diff with git diff and git status in that worktree.',
'',
...forTheSkeptic(rung),
'## What the worker reported',
'',
'This is the worker\'s own account. Treat it as a claim to be checked, not as evidence.',
'',
JSON.stringify(Object.assign({}, workerReport, { reportText: undefined, recordText: undefined }), null, 2),
'',
// The report's text, which the script cannot tell is on the branch: the harness refused the worker's write of
// REPORT.md in every rung of climb batch 7b, and its skeptics searched the run's transcripts for it
// (explorations/reviews/batch-7b-review.md, finding 4).
...(workerReport && workerReport.reportText ? ['REPORT.md as the worker returned it in reportText, word for word. Where the branch carries explorations/compile-ladder/' + rung.slug + '/REPORT.md, the file is the report and this is its copy; where it does not (the harness refused the worker\'s write in every rung of climb batch 7b), this is the report, and your checks of REPORT.md are checks of this text:', '', workerReport.reportText, ''] : []),
...buildsNothing(rung, 'The worker'),
...transcriptStep(rung, 'skeptic', ['rung', 'resume'], 'The worker\'s'),
'## What you must check',
'',
...sliceStep([rung], 'the rung\'s worktree (' + rung.path + ')'),
'2. The provenance block under REPORT.md\'s title: FIVE lines now - problem, spec, precedent, deviation, historical. Open every file:line it cites with sed -n and check that the line says what the block says. A missing line, a line that does not say it, a spec: line that cites only Specification/library/apis/, or a historical: line that omits a file of the 2012 tree the diff edits, is a required correction, not a refusal (the rule after check 12).',
(rung.testIsStage
  ? '3. The failure, which for THIS rung is a table and not a program. Its manifest entry sets testIsStage: no program can yet be compiled against the interpreter\'s prelude, so the failing-then-passing test is the gate\'s checker-count stage (gate step 8, explorations/coordinator/tools/checker-count/run.sh). The before is the last landed gate\'s table; the after is tmp/' + rung.slug + '/checker-count-postedit.txt in the worktree. Check that the report\'s diff is the diff of those two, and in the worker\'s transcript (above) that the run that wrote the after table ran after the edit was built, on the head\'s code, by its command and its time: that run is the test seen passing. You run neither the count nor the distance stage: the worker ran them on this code, and the gate measures both on the merged tree (POSITIONS, "Nothing is built or run twice on the same code."; skeptic-scope-judgement.md, section 5, item 2). A rung of this kind whose after table the transcript does not show written on the head\'s code is refused exactly as a test not seen failing would be; a report whose diff is not the diff of those two tables is a required correction. Check also that the report names the total the manifest must declare as expectedCheckerCount, and the crash line as expectedCheckerCrash if that moved: the gate prints the declared total beside the one it measures, and a crash line no rung declared makes the batch\'s gate red. Check 10 compares that total with the table. Where the rung\'s record asks for the distance stage\'s tables too, run explorations/coordinator/tools/distance/compare.sh on the last landed table and the worker\'s post-edit one, a file read, and check that what it prints is what the report says moved, within the checker\'s run-to-run variation of 2 to 4 errors. Everything else in this list is unchanged.'
  : '3. Test first, read in the worker\'s transcript (above), each point by its time and its call\'s id: the test committed alone, in a commit that changes no source or library file, before the commit that holds the fix (git log --stat ' + BASE + '..HEAD shows both); the test seen failing through the harness on the base\'s code, with the failing lines recordedFailure quotes, in a run that ended before the edit was first built or, for a run under walk, which reads the library\'s sources afresh, before a library source it reads was edited; and the test seen passing through the harness on the edit, in the worker\'s last such run, after its last commit that changes code, with the verdict line recordedPass quotes. A test the transcript does not show failing on the base\'s code is refused - this is not negotiable and it is the point of the whole discipline. A passing run older than the head\'s last change of code is a finding, and a ground to refuse unless that change cannot alter the verdict. You run the test neither on the base nor at the head: the worker ran it, and the gate runs it with every suite on the merged tree. A rung that edits only the specification or other prose, where no test can go red (the order of work says which), has no failure to see: check that git diff --name-only ' + BASE + '...HEAD lists no path outside Specification/, Documentation/ and explorations/ but a test file whose change is its citation of a section the rung renamed or removed, and check its text against the tree and the decisions on record instead, each sentence it adds or changes stating what the code and the decisions do. It is not refused for a failure no test can show.'),
'4. The diff, read line by line against the specification passages cited and against the provenance block. Does the edit do what the report says, and only that? Is it as small as the test needs?',
'5. The precedent search. Did the worker find what the team already did here, and did it follow the right precedent? Where a precedent repaired a defect, did the worker count the other sites in that file and give the number? If the worker followed none, look for one yourself in the interpreter\'s library, the compiler prelude and the team\'s tests: a device the rung invented where the library already has one is a finding, with the library\'s file:line.',
'6. The test. Does it actually exercise the defect? The paragraph for the skeptic above names the cases that matter for this rung. Check also that the test file carries at most one comment line and no provenance essay, and that each specification citation in its messages names the file and the section or entry, never a line, and that the named section\'s text says what the message says.'
  + (rung.testIsStage ? ' This rung writes no test file: what you check instead is that the two tables differ in the way the report says, and that the difference is the defect and not a cache or a build artefact.' : ''),
'7. The competing-declaration grep across both corpora AND across src/com/sun/fortress/ whole.',
'8. The record.md fragment. Are the FACTS lines true as written and sourced? Does the ledger note cite an existing row without renumbering anything? Would a reader six months from now be able to check it?',
'9. The three homes. For every defect the report names as measured: home 1 (repaired in this rung) must be a passing assertion in the rung\'s gated test, in the worker\'s last passing run of check 3; home 2 (deferred, specification settles it) must be an XXX-named file that the harness treats as expected-to-fail, and you check the name and the .test file; home 3 (deferred, specification silent) must be a test pinning today\'s behaviour, or a ledger row quoting the output where no program can observe it, and the report must say the specification is silent and show the grep. A defect in your OWN findings that the worker then repairs is home 1 too, and its assertion is in place before you approve.',
(rung.testIsStage
  ? '10. The rung\'s own count table against its report: a file read, nothing to run. Its brief names the table: tmp/' + rung.slug + '/checker-count-postedit.txt in the worktree.'
  : '10. The rung\'s own count table against its report: a file read, nothing to run. The general part of its brief names no table, because the rung does not set testIsStage; its section of the record may name one, and the report says which table, if any, it wrote under tmp/.')
  + ' Take the table\'s #total row and compare it with the total the report declares in REPORT.md, record.md and the structured report'
  + (rung.expectedCheckerCount !== undefined ? '; write the manifest\'s expectedCheckerCount, ' + rung.expectedCheckerCount + ', beside the two in SKEPTIC.md, as the prediction it is, not a value the table must meet' : '')
  + '. A mismatch between the table and the report is a finding for repair, not a stop: put it in requiredCorrections with both numbers, so that the report is corrected, and do not refuse the rung over it alone. If no table path is named and the rung declares a count, in its report or as expectedCheckerCount, report "no count table" in findings. A rung that declares no count and names no table has nothing to compare; one line saying so is enough.'
  + (rung.testIsStage ? '' : ' Nor does a rung that says its count and distance are unchanged and not run because its edit touches no path the two stages read: check its paths against git diff --name-only ' + BASE + '...HEAD, which must list none outside ' + STAGE_BLIND_TEXT + ' (the rule of the worker\'s order of work); a path outside them without a table is the finding "no count table".'),
'11. The ledger and the sibling sites. Search explorations/fortress-gap-ledger.md with terms of your own for rows that bear on the rung, and the tree for every other site of the defect the rung repairs: in the files it edits, in the sibling types and widths, and on the other path. A missed row that changes what the rung should do is a finding; a sibling site the rung leaves gets one of the three homes or a recommendedRows entry.',
'12. The decisions on record. For each entry of explorations/coordinator/POSITIONS.md that the briefing printed or the paragraph for the skeptic above cites, check that the landed text says what the decision says, in its scope and its words. A rule stated narrower or broader than the decision, or a case the decision names that the landed text leaves out, is a finding for repair; a landed text that contradicts a decision is a ground to refuse.',
'',
'Refuse only for the change or the test: the change is wrong or larger than its test needs, the test does not test it or was not seen failing, a sibling defect has no home, a decision on record was not followed. A citation off by a line, a wording, a missing cross-reference is a required correction, not a refusal.',
'',
'## Your required differential - this is not optional',
'',
'For every construct the rung touches, write your OWN small program, run it under the interpreter (bin/fortress FILE.fss) and under the compiler path (bin/fortress compile then bin/fortress run), and compare the answers. Do not satisfy this by reading the rung\'s own test; write programs the worker did not write. This requirement exists because four of the 26 items the last climb\'s skeptics raised came from differential probes they invented on their own initiative, and those four were the highest-value findings of eight rungs. Run each at the rung\'s head with its own build and, where the rung changes what the program does, on the old code in ' + copy + ' as well ("You build nothing", above).',
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
'Write your findings to explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md in that worktree, and your own programs and their outputs under tmp/' + rung.slug + '/skeptic/, which is never committed; quote in SKEPTIC.md the lines of theirs a finding rests on, with the command. Commit SKEPTIC.md alone on the rung\'s branch, ' + rung.branch + ', with the footer the shared prefix gives, and push it; touch nothing else in the commit. In skepticText put the single word committed once that commit is made: the gather reads the file from your branch, so do not read SKEPTIC.md back to copy it. Only if the harness refused your write, say so in findings and carry the file\'s text, word for word, in skepticText instead, since the gather writes a file the branch does not carry from that field verbatim. In judgedHead put the hash the branch\'s HEAD was at before your SKEPTIC.md commit, the head this verdict judges: a second judgement reads the repair\'s diff from it. In stopsMet, name every stop the batch record\'s intro reserves for Pavol that the rung as it stands meets, whether or not the worker named it, with its evidence as file:line; a stop the intro names as lifted, or that another decision of his lifts, carries in liftedBy the POSITIONS.md line of that decision. Your approval does not lift a stop: an entry without such a line holds the batch\'s push until he lifts it. Do not edit the worker\'s source changes yourself, and run neither of the gate\'s suites (testFast, testSystem) nor a whole suite another way: where the worker ran the one whole-suite run the shared prefix allows a checker or walk rung, on the branch\'s head, read its verdict in REPORT.md and check that its command and commit are the head\'s; where none ran, the suites\' verdict is the gate\'s. The worker\'s own commits are on that branch, so git log ' + BASE + '..HEAD shows its milestones and git diff ' + BASE + '...HEAD its net change.',
'',
  ].join('\n')
}

// The second judgement, after a refusal, the judge's ruling and the one repair round:
// only the repair against the skeptic's own refusal (POSITIONS.md, "Nothing is built or
// run twice on the same code."; skeptic-scope-judgement.md, section 5, item 1). In climb
// batch 8 the second skeptic had the first brief with one paragraph changed and re-did
// the whole list, about half of its 350K and 15 to 20 minutes of each refused rung.
function secondSkepticRole(rung, firstVerdict, decision, repaired) {
  const dir = 'explorations/compile-ladder/' + rung.slug + '/'
  const given = firstVerdict && typeof firstVerdict.judgedHead === 'string' ? firstVerdict.judgedHead.trim() : ''
  const head = /^[0-9a-f]{7,40}$/.test(given) ? given : ''
  const refused = head || '"$REFUSED"'
  return [
'',
'---',
'',
'# Your role: skeptic for ' + rung.id + ', ' + rung.slug + ', second judgement',
'',
'This is the SECOND judgement of this rung. You refused it once; the judge ruled on your refusal, and the worker made its one repair round in the same worktree, ' + rung.path + '. You judge the repair, and one question is yours, nothing else of the first judgement\'s list: does the repair answer your refusal, each finding of it the judge upheld and each step the judge ordered, without breaking what your first judgement approved? (POSITIONS, "Nothing is built or run twice on the same code.": the second skeptic checks only the repair against its own refusal; skeptic-scope-judgement.md, section 5, item 1.) Under the design a second refusal drops the rung from the batch: it is recorded with the reason and returned to the ranking, not retried. So refuse again only if the repair does not answer your refusal or breaks what you approved, not if the rung is merely improvable.',
'',
'## Your first judgement, which refused',
'',
'Your structured verdict as the script holds it. Where its skepticText is the word committed, its text is the first judgement in ' + dir + 'SKEPTIC.md on the branch; read of it only what a point below needs.',
'',
JSON.stringify(firstVerdict, null, 2),
'',
'## The judge\'s ruling',
'',
JSON.stringify(decision, null, 2),
'',
'Its full text is ' + dir + 'JUDGE.md in the worktree; read it only where the ruling above leaves a point open.',
'',
'## The repair',
'',
'The repair round\'s own account, a claim to be checked:',
'',
JSON.stringify(Object.assign({}, repaired, { reportText: undefined, recordText: undefined }), null, 2),
'',
'Its commits and its diff since the head you refused' + (head ? ', ' + head : '') + ', your SKEPTIC.md and the judge\'s JUDGE.md left out:',
'',
'    cd ' + rung.path,
...(head ? [] : ['    REFUSED=$(git log --format=%H --reverse ' + BASE + '..HEAD -- ' + dir + 'SKEPTIC.md | head -1)^    # your first verdict named no head: the parent of the commit that brought SKEPTIC.md']),
'    git log --format="%h %ci %s" ' + refused + '..HEAD',
'    git diff ' + refused + '..HEAD -- . ":(exclude)' + dir + 'SKEPTIC.md" ":(exclude)' + dir + 'JUDGE.md"',
'',
...buildsNothing(rung, 'The worker and its repair round'),
...transcriptStep(rung, 'skeptic2', ['repair'], 'The repair round\'s'),
'## How you answer it',
'',
'1. Each finding of your refusal that the judge upheld, and each step it ordered, is done in the diff above. A defect the repair repairs is closed by an assertion in the rung\'s gated test, home 1 of the shared prefix: your own program that measured it showed it at the head you refused (its output is under tmp/' + rung.slug + '/skeptic/), and the repair round\'s recorded run at the repaired head shows the assertion passing (its recordedPass above, its REPORT.md and its transcript). A finding the judge settled another way, by home 2 or 3, by a correction of the report, or against you, is checked as the ruling says. Each specification citation in a message the repair adds names the file and the section or entry, never a line, and that the named section\'s text says what the message says.',
'2. What you approved stands. The diff changes nothing beyond what the ruling asks, or what it changes beyond that you read against the specification as you read the first diff. Run again at the repaired head, with the rung\'s build, those of your programs under tmp/' + rung.slug + '/skeptic/ that the refusal rests on or whose answers the diff could change, and compare their output with what you recorded at the head you refused. For a construct the repair touches you may write new small programs of your own, old against new as in your first judgement; that is the whole of your differential.',
'',
'Refuse only for the repair: a finding the judge upheld left open, an assertion missing or not passing, or a change of the repair\'s that breaks what you approved. A citation, a wording or a cross-reference is a required correction.',
'',
'## Your verdict',
'',
'Approve, or refuse with the one thing that must change. Corrections go in requiredCorrections, precisely; a defect you measure that the rung does not repair goes in recommendedRows with its probe; a point for Pavol goes in forPavol with its evidence as file:line; and stopsMet names every stop the batch record\'s intro reserves for Pavol that the rung as it now stands meets, with liftedBy the POSITIONS.md line of a decision of his that lifts it, or nothing. Your approval does not lift a stop.',
'',
'Write this judgement at the top of ' + dir + 'SKEPTIC.md, under a heading "# Second judgement", with your first judgement below it as it stands, and your new programs and their outputs under tmp/' + rung.slug + '/skeptic/, which is never committed. Commit SKEPTIC.md alone on ' + rung.branch + ' with the footer the shared prefix gives, and push it. In skepticText put the single word committed once that commit is made; only if the harness refused your write, say so in findings and carry this second judgement\'s text, word for word, in skepticText (not the first\'s, which the script already holds). In judgedHead put the hash HEAD was at before your commit. Do not edit the source yourself, and run neither of the gate\'s suites nor a whole suite another way: the repair round\'s one whole-suite run, where the shared prefix allows it one, is read in its REPORT.md.',
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
'Read the judge\'s full ruling in explorations/compile-ladder/' + rung.slug + '/JUDGE.md' + (verdict ? ' and the skeptic\'s findings in SKEPTIC.md beside it' : '') + '. Carry out the judge\'s instructions in order. Where an instruction turns out wrong against a primary source, do what the source says, and say so in REPORT.md with the file:line that settles it - the judge read the two reports and the diff, not the whole tree. Where you need the old code beside your edit, run it in the rung\'s private copy of the base, ' + baseCopy(rung) + ', by the shared prefix\'s "The old code beside the new"; never revert and rebuild your worktree for it, and build in your worktree only what your own edit needs ("After an edit").',
'',
'Every defect this round repairs - including one the skeptic measured and you now fix - gets its assertion in the rung\'s gated test, in place and passing, BEFORE you report: the second skeptic will look for it and its absence is a refusal ground. A defect this round does not repair gets home 2 or home 3 of the shared prefix, and the report says which. Re-run the test through the harness and quote its verdict line, update REPORT.md and record.md (including the historical: line of the provenance block if the repair touched a file of the 2012 tree) and, with them, reportText, recordText, stopsMet and forPavol in your structured result, forPavol carrying every point for Pavol the rung still has, the earlier pass\'s included, commit and push on your branch, and do not run the full gate.',
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
    review: 'The merged-diff review found something blocking in the source hunks after the gather: its blockingCode findings, the ones whose repair touches code, are yours; its routed findings, settled by tests and records only, go to the next batch without a ruling. Diagnose it holistically on the merged tree and decide the repair; do not bisect rungs. The gate is still running beside you in this tree: do not read ' + GATE_OUT + '/ or wait for it; rule on the review and the merged diff alone. ' + LAND_RULE,
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
  : sliceStep(RUNGS, 'the main tree (' + MAIN + ')').join('\n') + '\n2. The composed commits: git -C ' + MAIN + ' log ' + BASE + '..HEAD and git diff ' + BASE + '...HEAD.\n3. The stage\'s outputs named above, and for a red gate the failing tests\' own output under ProjectFortress/TEST-RESULTS/, the summary and comparison under ' + GATE_OUT + '/, and the full logs, which are NOT committed and are under ' + LOG_DIR + '/.\n4. Each rung\'s REPORT.md and SKEPTIC.md under explorations/compile-ladder/<slug>/, and the lines the gather folded from its record.md into the three record files.\n5. The specification passages the reports cite, by file:line.',
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
// whose settlement is tests and records only does not hold the batch for a repair:
// the batch lands on its gate, and the ruling's steps go to the next batch with the
// findings it upholds, listed for Pavol. In batch N the repair of such a ruling and
// the second review after it cost about 0.7M tokens and, with the judge, 54 minutes
// after a green gate (explorations/reviews/batch-N-review.md, question 4, item 1).
// Since the post-mortem of 2026-09-29 the review routes such findings itself and the
// judge sees only those that touch code; land stays for one of them that the judge
// finds settled by tests and records after all.
const LAND_RULE = 'You have a fourth decision here, land (Pavol, POSITIONS.md 2026-09-29, the entry on rerunning the gate: the same weighing of cost against what a rule protects applies to every rule of the batch workflow). Decide land when every finding you uphold is settled by tests and records only: test files in ProjectFortress/tests/ or a ProjectFortress/*_tests/ directory, and files under explorations/, with no source, library, checker, interpreter or specification file changed. Then no repair runs: the batch lands on its gate, and your numbered instructions, written as for a repair worker, go to the next batch with the findings you uphold and are listed for Pavol, as the review\'s routed findings are (the post-mortem of 2026-09-29). The tests land one batch later, as rows 447 and 505\'s did by that rule. A finding whose settlement needs a source, library, checker, interpreter or specification change is a repair, as before, and so is a ruling that mixes the two.'
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
    recordedFailure: { type: 'string', description: 'the hash of the commit that holds the test alone, the harness command, and the two to five lines of its run on the base that show the failure; for a rung that edits only prose, none and why' },
    recordedPass: { type: 'string', description: 'the harness command and the verdict line of the test\'s run on the edit' },
    precedentSearch: { type: 'string', description: 'what the team already did here, by citation, and which precedent was followed' },
    specCitations: { type: 'array', items: { type: 'string' } },
    divergences: { type: 'array', items: { type: 'string' }, description: 'each walk-vs-compiled divergence found, with which side the specification favours' },
    defectHomes: { type: 'array', items: { type: 'string' }, description: 'one line per measured defect: the defect, its home (1 gated assertion, 2 XXX expected-failure test, 3 probe under a silent specification), and where it is' },
    decisions: { type: 'array', items: { type: 'string' }, description: 'decisions taken inside the rung, each with the alternative rejected' },
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
    failureWasRecorded: { type: 'boolean', description: 'first judgement: whether the worker\'s transcript shows the new test failing through the harness on the base\'s code before the edit was built, and then passing (check 3); second judgement: whether each assertion that closes a finding of your refusal was shown failing at the refused head by your own program and passes in the repair round\'s recorded run; false for a rung that edits only prose, which has none' },
    differentialsRun: { type: 'array', items: { type: 'string' }, description: 'the skeptic\'s OWN probes: program, walk answer, compiled answer, verdict; with both thread columns where the rung writes state' },
    threadCounts: { type: 'string', description: 'which thread counts the differentials were run at and why' },
    defectHomes: { type: 'array', items: { type: 'string' }, description: 'one line per defect this skeptic measured: its home (1, 2 or 3) and where the check now is' },
    loudToQuiet: { type: 'string', description: 'whether a loud failure became a quiet value, and what the value is' },
    findings: { type: 'array', items: { type: 'string' } },
    stopsMet: STOPS_MET,
    skepticText: { type: 'string', description: 'the single word committed once SKEPTIC.md is committed on the rung\'s branch, where the gather reads it; the full text of this judgement, word for word, only when the harness refused your write, for the gather to write verbatim' },
    judgedHead: { type: 'string', description: 'the hash the branch\'s HEAD was at before your SKEPTIC.md commit: the head this verdict judges' },
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this skeptic finds that the rung does not settle, one entry each with its evidence as file:line; the gather puts each into PLAN.md; empty if none' },
    summary: { type: 'string' },
  },
  required: ['slug', 'approved', 'failureWasRecorded', 'differentialsRun', 'stopsMet', 'judgedHead', 'summary'],
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
'The batch record the steps below name is ' + BATCH_DIR + '/RECORD.md, and you write it once: no later stage rewrites it, and the commit stage adds to it only the landed hashes, the gate\'s summary line and, when the push is held, a "Not pushed." paragraph (the post-mortem of 2026-09-29).',
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
'   Then the rung\'s three files. The texts its agents returned for them - reportText for REPORT.md and recordText for record.md from its last worker, skepticText for SKEPTIC.md from its last skeptic and, where there were two rounds, the first round\'s after a line "## First round" - are in the run\'s journal and not in this brief, and each rung below carries in textCommands the command that writes each file from there, byte for byte, without the text passing through your context (' + TEXT_TOOL + '; it finds the journal itself, the newest one whose last started agent is this gather, and says which on stderr). For each of the three files under explorations/compile-ladder/<slug>/ that the branch does not carry, run its command from ' + MAIN + ', and compose nothing: the rung\'s own words, not a summary of them. From there on the file is treated as one the rung wrote; read of it only what a later step needs. A file the branch carries stands as it is, and its command is not run. Name in the batch record every file written this way. A command that exits 1 wrote nothing (no journal found, or no text in the field): report that file as missing rather than composing it. So is a SKEPTIC.md the command wrote whose text is only the word committed, which a skeptic puts in skepticText once its commit of the file is made: delete the file it wrote, and report it as missing. In batch 5 the harness refused every rung worker\'s write of REPORT.md and the gather composed each from a 15-line summary; in batch N these texts, pasted into the gather\'s brief, were 195K tokens of it, re-read and copied back out (explorations/reviews/batch-N-review.md, question 2).',
'2. Fold its record: explorations/compile-ladder/<slug>/record.md (now in the tree) carries finished prose for three places. The FACTS.md line goes into explorations/coordinator/FACTS.md under the section of its area (the file is grouped by area, its README gives the rule: "Landed semantics" for a rule of the language or the library as it now stands, "The harness and the gate" for test mechanics, "The checker and the one library" for the checker), after that section\'s last entry, as one bullet with its source: the fact, its source and its test in a few lines, the detail left in the rung\'s report, which it cites (a longer entry from record.md is cut to that before it is folded). The ledger note is APPENDED to the notes of the row it names in explorations/fortress-gap-ledger.md - rows are never renumbered, moved or deleted; where the note needs the landed commit\'s hash write the literal placeholder <short hash>, which the commit stage replaces. The handover state line goes into the first section of explorations/microgpt-run-c-handover.md ("Where the work stands"). If record.md opens a new row, the number is provisional (from ' + LEDGER_FROM + '): assign the final numbers in MANIFEST order (' + RUNGS.map(r => r.id).join(', ') + ') as you fold, append each row to the ledger\'s last table, and correct every citation of the provisional number in the lines you fold from that rung\'s record.md and in its REPORT.md, SKEPTIC.md and tests, in the same commit. Any file:line a record cites that a previously applied rung has shifted is re-anchored by SYMBOL - find the declaration or the assert by name in the current file and cite the line it is at now, rather than trusting the number the record was written with.',
'3. Close every requiredCorrections item of that rung\'s skeptic verdicts, listed below; each is a checklist item and the last climb left two of them unmade.',
'4. Open or refuse every recommendedRows item of that rung\'s skeptic, in one sentence each, recorded in the batch record. Opening it means a real ledger row with the probe it cites; refusing it means one sentence saying why the tree does not owe it. The last batch lost a codegen defect a skeptic had narrowed precisely, because nothing carried a recommendation that was not a required correction.',
'5. Its items for Pavol, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, REPORT.md, SKEPTIC.md or JUDGE.md, at the line it is now at.',
'   A text mismatch is not blocking. Where the batch intro has you check one rung\'s specification text against another rung\'s landed code, a mismatch the decisions on record settle you fix on the side they settle, as before; one they do not settle you do NOT report to the review as blocking, whatever the intro says. It is reversible, so it lands as a reserved stop met does, listed for Pavol (POSITIONS.md, 2026-09-27, the stops; 2026-09-29, the weighing of cost against what a rule protects), with the three records that keep it from being a discrepancy no one can see (POSITIONS.md, 2026-09-24, on updating the specification): the text stands as the rung wrote it; the path that departs from it gets a ledger row and a gated home-2 test (XXX) asserting the text\'s rule; and the text\'s entry in Specification/appendices/changes.tex names that row among its departures, so that the text claims no more than holds. All three go in the commit of the later of the two rungs, and the mismatch goes in your forPavol, with its ledger row and its test, and into PLAN.md by step 5\'s rule, with the ids gather.1, gather.2 in the order of forPavol. In batch N the rule "report any other to the review as blocking" made row 516 half of the first review\'s block, a judge ruling, a repair and a second review, and the judge reversed it in one line (explorations/reviews/batch-N-review.md, question 4, item 3).',
'6. One commit: the applied source, the tests, the rung\'s files under explorations/compile-ladder/<slug>/ (REPORT.md, SKEPTIC.md and JUDGE.md if any, and decision-record.md for a specification rung; record.md is folded, not landed, so take it out of the index and the tree once step 2 has folded it; nothing else under the rung\'s folder), the three record files, and PLAN.md when step 5 wrote to it. Stage those files by an explicit list, never by git add of the directory, and read git diff --cached --stat before you commit: 85 MB of a worker\'s experimental caches reached main that way on 2026-09-19 and the protocol\'s hard rule on worker commits now forbids it. Title line: what the repair does, in the plain register; body: the two or three sentences of record.md that say why. If git diff --name-only for this commit shows ANY path outside explorations/, the body also carries a line beginning "historical:" naming the files of the original 2012 tree the commit edits, taken from the rung\'s provenance block - the protocol\'s hard rule on the gate requires those edits to be flagged at commit time. Footer as given. Do not push.',
'',
(notLanded.length
  ? '## The rungs that did not land\n\nThese rungs stopped, were dropped, or their worker died, or the script withheld them (state withheld) because their manifest entry names in landsOnlyWith a rung that was not approved; the reason says which. Their source changes are NOT applied and their branches stay as they are. But their skeptics\' findings are about the tree, not about the rung, and they have nowhere else to go: fold them into ' + BATCH_DIR + '/RECORD.md under a heading "Not landed", one section per rung, carrying the reason it did not land, the findings of its SKEPTIC.md if it has one, and every recommendedRows entry, each opened as a real ledger row or refused in one sentence exactly as step 4 requires. Its items for Pavol go into PLAN.md as step 5 says, in the commit that carries its "Not landed" section. Take that rung\'s REPORT.md, SKEPTIC.md and record.md out of its branch by an explicit list of paths (git checkout <branch> -- <path> ..., one path at a time), never the whole directory, so that nothing else comes with them; where the branch lacks one of the three files, write it with its command from textCommands below, as step 1 says for a landed rung. Apply none of its source.\n\n' + JSON.stringify(notLanded.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state, reason: r.withheldReason || (r.judge && r.judge.summary) || (r.worker && r.worker.stopReason) || '', skepticFindings: (r.verdict && r.verdict.findings) || [], recommendedRows: (r.verdict && r.verdict.recommendedRows) || [] }, rungTextCommands(r))), null, 2) + '\n'
  : '## The rungs that did not land\n\nNone: every rung of this batch was approved.'),
'',
'The rungs and their verdicts:',
'',
JSON.stringify(approved.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, historicalFiles: (r.worker && r.worker.historicalFiles) || [], requiredCorrections: [].concat((r.firstVerdict && r.firstVerdict.requiredCorrections) || [], (r.verdict && r.verdict.requiredCorrections) || []), recommendedRows: [].concat((r.firstVerdict && r.firstVerdict.recommendedRows) || [], (r.verdict && r.verdict.recommendedRows) || []) }, rungTextCommands(r))), null, 2),
'',
'The items for Pavol, by id (' + (items.length ? items.length + ' of them' : 'none') + '):',
'',
JSON.stringify(items, null, 2),
'',
'Return the structured result the tool requires: the commit hash per rung, the order you applied them in and why, the conflicts met and how each was resolved, the corrections closed, the recommended rows opened or refused, forPavol, the points you find yourself (a text mismatch the decisions do not settle among them), pavolItems, one entry for every id above and every gather.N of forPavol with the PLAN.md section and entry that holds it, and pavolUnrouted, every id you could not put in with the reason, for the coordinator. Nothing waits on these: the batch goes on to its review, gate and commit either way.',
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
    head: { type: 'string', description: 'the hash HEAD is at when you finish' },
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this gather finds itself, a text mismatch the decisions do not settle among them, one entry each with its ledger row, its test and its evidence as file:line; each goes into PLAN.md as gather.1, gather.2 in this order; empty if none' },
    pavolItems: PAVOL_ROUTED,
    pavolUnrouted: { type: 'array', description: 'every item for Pavol you could not put into PLAN.md, for the coordinator; empty if none', items: { type: 'object', properties: {
      id: { type: 'string' }, why: { type: 'string', description: 'why it could not go in' } }, required: ['id', 'why'] } },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'pavolItems', 'pavolUnrouted', 'summary'],
}

// The merged-diff review, once, beside the gate. Since the post-mortem of 2026-09-29
// (postmortem-2026-09-29/synthesis.md, section 2(b)) there is no second review inside a
// batch: the post-batch review is the second look. A finding whose repair touches code
// goes to the judge and a repair; one settled by tests and records only is routed by the
// review to the next batch and listed for Pavol, with no judge (Pavol, POSITIONS.md
// 2026-09-29, the weighing of cost against what a rule protects). The checker count's
// rows are the post-batch review's to explain, so this review does not wait on the
// gate's table.
const COMMIT_TITLE = 'Record the landed commits\' hashes and the gate summary'
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
'7. The three homes: every defect a REPORT.md or SKEPTIC.md says was measured has a gated assertion, an XXX expected-failure file, or a test pinning today\'s behaviour with a ledger row, or a ledger row quoting the output where no program can observe it - and the one it has is the one the specification allows. A defect repaired in the rung whose only trace is a FACTS line is a finding.',
'8. The stops. Every stop the batch record\'s intro reserves for Pavol that a landed rung meets - in its hunks, or where its REPORT.md, SKEPTIC.md or the lines folded from its record.md say it met one (a passage reported without choosing, a test whose verdict changed other than by a rung\'s own intent, a line that waits for him) - goes in stopsMet with the rung\'s id, the evidence as file:line, and in liftedBy the POSITIONS.md line of the decision of his that lifts it, or nothing. The script holds the batch\'s push on any entry with no such line, and on the rungs\' own entries too; it is not a blocking finding, and you do not fix it.',
'9. The items for Pavol. For each id of the list below, the PLAN.md entry the gather\'s pavolItems names is in explorations/coordinator/PLAN.md, under one of the two sections, and says what the item says. An item the gather left out or placed wrong you put in yourself, in your corrections commit. Every point you yourself find that is Pavol\'s goes in forPavol, one entry each, with the ids ' + label + '.1, ' + label + '.2 in the order of forPavol. ' + PLAN_RULE + ' pavolItems lists every id you put in or moved, with its section and entry. It is not a blocking finding.',
'',
'The items for Pavol from the rungs and the gather, by id:',
'',
JSON.stringify(items, null, 2),
'',
'Three kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections", listed in your return. A defect whose repair touches a path outside explorations/ that is not a test file - source, library, checker, interpreter or specification: a rule broken, an edit that is not what its report says, an interaction between two rungs - you do NOT fix; you return it in blockingCode, precisely enough that a judge can rule on it from your words and the diff; a judge rules, a repair runs, and the gate runs again on the repaired tree when the repair changed a path it reads (' + GATE_READS + '; a repair of the specification\'s text alone leaves the first gate\'s tables standing). A finding settled by tests and records only that you do not fix yourself - a test owed or a test file to change - you return in routed, each with the step the next batch owes: no judge and no repair run for it, it goes to the next batch and is listed for Pavol, and it does not hold the batch. Put each routed finding into explorations/coordinator/PLAN.md by check 9\'s rule, with the ids review-routed.1, review-routed.2 in the order of routed, in your corrections commit, and list the ids in pavolItems (the post-mortem of 2026-09-29, section 2(b); Pavol, POSITIONS.md 2026-09-29, the weighing of cost against what a rule protects). A mismatch between one rung\'s specification text and another rung\'s code that the decisions do not settle, which the gather filed as a reversible stop met (the text as the rung wrote it, the ledger row and gated XXX test of the path that departs, the row named among the text\'s departures in Specification/appendices/changes.tex, and an item for Pavol), is not blocking: check that the four are there, complete a missing record yourself, and return a missing test in routed. Do not run the gate and do not push.',
'',
'## Two rules because the gate is running beside you',
'',
'First: record the hash HEAD is at BEFORE your corrections commit, and the hash after, and run',
'',
'    git diff --name-only <before> <after>',
'',
'and return both hashes and every path that command prints which is NOT under explorations/. If that list is non-empty the gate may have to run again on your result, and the script decides from your answer. Keep your own fixes inside explorations/: a correction that needs any other path goes in blockingCode or routed.',
'',
'Second: do not touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, which are the gate\'s, and retry a git command that fails on index.lock.',
'',
  ].join('\n')
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    approved: { type: 'boolean', description: 'true if blockingCode is empty after your own record fixes' },
    blockingCode: { type: 'array', items: { type: 'string' }, description: 'findings whose repair touches a path outside explorations/ that is not a test file (source, library, checker, interpreter or specification), each with file:line and which rule or claim it breaks; the judge rules on these, and the gate runs again after their repair when it changed a path the gate reads (under ProjectFortress/ or Library/, or build.xml); empty if none' },
    routed: { type: 'array', items: { type: 'string' }, description: 'findings settled by tests and records only that you did not fix yourself, each with file:line and the step the next batch owes; no judge runs for them, they go to the next batch and are listed for Pavol, and you put each into PLAN.md as review-routed.N; empty if none' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'record or mechanical defects you fixed, and the commit hash' },
    headBefore: { type: 'string', description: 'the hash HEAD was at before your corrections commit' },
    headAfter: { type: 'string', description: 'the hash HEAD is at after it; same as headBefore if you committed nothing' },
    pathsOutsideExplorations: { type: 'array', items: { type: 'string' }, description: 'every path from git diff --name-only <headBefore> <headAfter> that is not under explorations/; empty if none' },
    stopsMet: STOPS_MET,
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this review finds, one entry each with its evidence as file:line; empty if none' },
    pavolItems: PAVOL_ROUTED,
    summary: { type: 'string' },
  },
  required: ['approved', 'blockingCode', 'routed', 'fixed', 'stopsMet', 'forPavol', 'pavolItems', 'summary'],
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
'   The total is REPORTED and is never red on its own (explorations/coordinator/checker-gate-review.md): a fix can raise it, because the checker stops checking an api at that api\'s first errors (StaticChecker.java:268-272) and clearing them lets its later rules run there for the first time, and two rungs\' changes do not add, so neither a rise nor a missed declaration tells progress from harm. COUNT UP, COUNT DOWN and COUNT SAME each print the declared totals beside the measured one; a declaration is a prediction written before the run, printed and not enforced, and the post-batch review explains every new or risen row of the landed table. A CRASH CHANGED line that no rung declared stays RED, as before, and so does SHADOW STALE, which means the copy beside run.sh is no longer the checker the tree builds and the number is not this tree\'s. The per-api rows and #locations are printed either way, so print the diff in your result. What this batch declared:',
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
//
// Since 2026-10-02 (POSITIONS.md, "Nothing is built or run twice on the same code.")
// the gate reruns only for a path it reads: under ProjectFortress/ (a test file there
// only when no passing run of the repair's exercised it), under Library/, or build.xml.
// Every other path - the specification's text and other prose under Specification/ or
// Documentation/ among them - leaves the first gate's tables standing, recorded as such
// beside its summary (besideStep). In climb batch 8 the gate ran a second time, 24
// minutes on the critical path, after a repair of one sentence of
// Specification/appendices/changes.tex, and its tables came out identical but for
// timing (build-cache-exploration.md, section 4; reviews/batch-8-review.md, section 4).
const TEST_FILE = /^ProjectFortress\/(tests|[A-Za-z_]+_tests)\/[^/]+\.(fss|fsi|test)$/
const repoPath = (p) => p.trim().replace(/^\.\//, '')
const codePathsOf = (paths) => strings(paths).map(repoPath).filter(p => !p.startsWith('explorations/') && !TEST_FILE.test(p))
const testPathsOf = (paths) => strings(paths).map(repoPath).filter(p => TEST_FILE.test(p))
const GATE_READS = 'ProjectFortress/, Library/ or build.xml'
const gateReads = (p) => /^(ProjectFortress|Library)\//.test(p) || p === 'build.xml'
const gateCodeOf = (paths) => codePathsOf(paths).filter(gateReads)       // rerun the gate
const ungatedOf = (paths) => codePathsOf(paths).filter(p => !gateReads(p)) // the gate does not read them

function repairTestsStep(kind, failing) {
  return [
'',
'## Your tests, and whether the gate runs again',
'',
'Record the hash HEAD is at before your first commit and the hash after your last, and return both, and in pathsChanged every path git diff --name-only <before> <after> prints. The script decides from that list whether the whole gate runs again after you (Pavol, POSITIONS.md 2026-09-29, on rerunning the gate after a repair that only added tests; POSITIONS.md, "Nothing is built or run twice on the same code."). A path the gate reads that is not a test file - under ProjectFortress/ or Library/, or build.xml: source, library, checker, interpreter or build - reruns it. A path no gate stage reads, the specification\'s text and other prose under Specification/ or Documentation/ among them, does not: the first gate\'s tables stand, and the commit stage records beside them that your repair changed only such paths. Test files and records do not either: then your runs below are the verification of your tests, and the commit stage records your tests\' lines beside the first gate\'s summary. A test file here is a .fss, .fsi or .test file directly in one of the corpora the harness reads, ProjectFortress/tests/ and the ProjectFortress/*_tests/ directories.',
'',
'Every test file you add or change there you run in the harness on the merged tree, placed where the gate reads it, with the gate\'s own JUnit mechanics, and all the files of one corpus TOGETHER, in one harness run, one JVM, as the gate\'s track runs them: a file that passes alone can fail beside others in one JVM, as batch 6.5\'s WitnessIdentityRungG did under the gate (explorations/reviews/batch-6.5-review.md, item 78), and running them together is the one thing a second gate would still have added (explorations/reviews/batch-N-review.md, question 4). The .test files of compiler_tests/, and those of library_tests/, each through one call of ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> <the directory> <Name.test>..., which runs fortress junit once over the list, the harness\'s FileTests.suiteFromListOfFiles, its compile and link tests before its run tests, so a link test still runs before its XXX run test; the interpreter tests of tests/ through one call of explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch dir under tmp/> <file.fss>..., which runs SystemJUTest, the class testSystem\'s shards run, once over a directory holding only the named files with testSystem\'s JVM settings. Batch N\'s repair ran each file in its own JVM (explorations/compile-ladder/climb-batch-N/merged-tests/repair-junit-placed.txt); do not. Capture each run\'s output under ' + LOG_DIR + '/repair-' + kind + '-tests/, which is not committed (the post-mortem of 2026-09-29: no capture is committed anywhere). In testRuns return one entry per file: the file, the added or changed test paths its lines in the run exercise (a .test and the .fss it names), the summary.txt row it adds to (fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system for tests/), the JUnit cases it adds (its lines of the run; the files of one run add up to the n of its OK (n tests) or Tests run: n), its verdict (pass only when the run that held it printed OK, so a failure anywhere in a run fails every file of it), and the path of that run\'s capture. A test path you changed that no run exercises, or a run that did not pass, reruns the gate.',
...(kind === 'gate' ? [
'',
'The gate was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'In failingAnswered return one entry per line, in order: the line, and the test file of testRuns whose passing run now answers it, or empty where no run of yours does (an atomic run, the ladder, a suite count, the checker count). The gate does not run again only when every line is answered and your commit changed no path that reruns it.',
] : strings(failing).length ? [
'',
'The gate that ran beside the review was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'Your ruling is the review\'s, not the gate\'s: do not take on a line it does not touch. Where your ruling\'s edit is to the test a line names, and your harness run above passes it, that run answers the line. In failingAnswered return one entry per line, in order: the line, and the test file of testRuns whose passing run now answers it, or empty where no run of yours does (a line your ruling does not touch, an atomic run, the ladder, a suite count, the checker count). When every line is answered and your commit changed no path that reruns the gate, no gate judge and no gate repair run after you, and the first gate\'s tables stand beside your runs (Pavol, POSITIONS.md 2026-09-29, on rerunning the gate after a repair that only added tests).',
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
  : '') + 'Its full ruling is in ' + BATCH_DIR + '/JUDGE-' + kind + '.md. Carry out the instructions in order. Where one turns out wrong against a primary source, do what the source says and record the deviation in ' + BATCH_DIR + '/REPAIR-' + kind + '.md with the file:line that settles it. Build what the edit needs by the shared prefix\'s "After an edit" (a library component alone after its .fss, ant compileAll, global.map restored and the library order after Java or Scala), run the tests the ruling names, and commit locally, one commit, with the record files updated where the ruling says and a historical: line in the body if the commit touches a file of the 2012 tree. Every defect this repair measures and fixes gets its assertion in a gated test, as the shared prefix requires. Do not run the full gate; the gate stage runs it after you when the section below says it does. Do not push.',
...repairTestsStep(kind, failing),
  ].join('\n')
}

// The push rule (CLIMB-BATCH-6.md section 8, item 2): the commit stage pushes
// only when no landed rung carries a stop that was met and not lifted. The stops
// are those each landed rung's last worker report and last skeptic verdict list,
// those the merged-diff review lists, and those each repair on the merged tree
// lists (repairs, by label: since the post-mortem of 2026-09-29 no second review
// reads a repair's commit, so its own stopsMet are read here; the script review
// of that night, finding 1); only Pavol lifts a stop, so an entry counts as lifted
// only when its liftedBy cites POSITIONS.md. A malformed entry counts as not
// lifted. Batches 4 and 5 held the push by the landing agent's reading of the
// intro alone, and batch 5's push went out past a stop.
function pushHeldBy(landed, review, repairs) {
  const lifted = (s) => !!(s && typeof s === 'object' && /POSITIONS\.md/.test(s.liftedBy || ''))
  const line = (id, s) => id + ': ' + ((s && s.stop) || String(s)) + ((s && s.evidence) ? ' (' + s.evidence + ')' : '')
  const own = [].concat.apply([], landed.map(r => [].concat((r.worker && r.worker.stopsMet) || [], (r.verdict && r.verdict.stopsMet) || [])
    .filter(s => !lifted(s)).map(s => line(r.rung, s))))
  const reviewed = ((review && review.stopsMet) || []).filter(s => !lifted(s)).map(s => line((s && s.rung) || 'review', s))
  const repaired = [].concat.apply([], Object.keys(repairs || {}).filter(k => repairs[k]).map(k => (repairs[k].stopsMet || []).filter(s => !lifted(s)).map(s => line(k, s))))
  return own.concat(reviewed, repaired)
}

// The repairs whose tests, or whose paths no gate stage reads, stand beside the gate's
// summary instead of a second gate (repairRerun): each { kind, runs, answered, ungated,
// commits } as the script kept it; kind review-corrections is the review's own commit.
function besideStep(beside) {
  if (!beside.length) return []
  const cases = [].concat.apply([], beside.map(b => b.runs || [])).reduce((n, t) => n + (Number(t.cases) || 0), 0)
  const runs = beside.some(b => (b.runs || []).length)
  const ungated = beside.some(b => strings(b.ungated).length)
  return [
'1a. The gate below ran on the tree before a repair on the merged tree, or the review\'s corrections, that changed no path the gate reads (' + GATE_READS + ') but test files the repair ran, so it was not run again (Pavol, POSITIONS.md 2026-09-29, on rerunning the gate after a repair that only added tests; POSITIONS.md, "Nothing is built or run twice on the same code."): its tables stand. Record that beside the summary, in the same commit as step 1, so that the next batch\'s comparand is stated honestly. After the gate\'s own lines, append to ' + GATE_DIR + '/summary.txt, tab-separated:'
  + ' ' + [ungated ? 'for each entry below with ungated paths, a line "# repair-ungated" with its kind, its commits and those paths, which no gate stage reads, saying that the tables above are of the tree before them' : '',
           runs ? 'one line per run below, prefixed "# repair-tests", with the repair\'s kind, the summary row it adds to, its JUnit cases, its verdict and the file; then, for each line the gate failed on that the repair answered, a line "# repair-tests answered", the gate\'s line and the file whose run answers it; and last "# repair-tests total" with ' + cases + ', the cases these runs add, by which every count the next gate reads rises beyond this summary\'s rows' : ''].filter(Boolean).join('; then ')
  + '. Do not change the gate\'s own rows. The entries:',
'',
JSON.stringify(beside, null, 2),
'',
  ]
}

// The commit stage, steps 1 to 5. From 2026-09-29 until the post-mortem of the same
// night a second review after a repair on the merged tree split it in two, a local
// part beside that review and a push after it; with the second review gone it is one
// stage again (postmortem-2026-09-29/synthesis.md, section 4, items 35 and 36).
function commitRole(gather, gate, heldBy, beside) {
  const held = heldBy.length > 0
  beside = beside || []
  const answered = beside.some(b => strings((b.answered || []).map(a => a && a.failing)).length)
  const tree = beside.length
    ? 'The gate ran on the tree before a repair, or the review\'s corrections, that changed no path the gate reads but test files the repair ran, and was not run again; its tables stand, ' + (answered ? 'the lines it was red on answered by the repair\'s passing runs' : 'green') + ' (step 1a).'
    : 'The gate is green on the tree as it stands.'
  return MAIN_TREE_ROLE + [
'# Your role: commit',
'',
held
  ? tree + ' Land it on the local main; the script holds the push (step 3).'
  : tree + ' Land it.',
'',
'1. Replace every literal <short hash> placeholder in the ledger, FACTS, the handover and ' + BATCH_DIR + '/RECORD.md with the hash of the commit it refers to, from the gather stage\'s result below. RECORD.md is the gather\'s, written once: in it you replace the hashes and add the gate\'s summary line, and rewrite nothing else. Copy the gate\'s outputs into the tree first: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/ - the gate wrote them under tmp/, untracked, so that a run that stops before this stage leaves nothing untracked in the tree, and it committed nothing because the review was committing in this tree at the same time. Then add ' + GATE_DIR + '/summary.txt, ' + GATE_DIR + '/checker-count.txt, ' + GATE_DIR + '/distance.txt and ' + GATE_DIR + '/ladder/ to the same commit, and copy ' + LOG_DIR + '/distance/errors.tsv to ' + SITES + ', one fixed path overwritten at each landing (mkdir -p ' + SITES.replace(/\/[^/]*$/, '') + '), and add it too: the distance stage\'s per-site list, which the next batch\'s count and distance rungs read as their "before" instead of re-running the stage on an unchanged base (POSITIONS.md, 2026-09-28, the entry on rungs re-running measurements). The checker-count and distance tables are the comparands the next batch\'s gate reads, so a batch that lands without them leaves the next gate comparing against older ones. Title it "Record the landed commits\' hashes and the gate summary". grep -rn "<short hash>" explorations/ afterwards must be empty, and the full gate logs under ' + LOG_DIR + '/ are NOT committed and never are. When any landed commit changed a file under Specification/ (git diff --name-only ' + BASE + '..HEAD -- Specification/), run ant tex once and add Specification/fortress.pdf to this commit; its log stays under ' + LOG_DIR + '/ and is not committed. The build is the one the rungs used: in Specification/fortress/, ./ant genSource and then ./ant tex, each logged under ' + LOG_DIR + '/; copy Specification/fortress/fortress.pdf to Specification/fortress.pdf and add nothing else the build wrote.',
...besideStep(beside),
'2. Verify every commit since ' + BASE + ' ends with the two footer lines and contains no model identifier (git log ' + BASE + '..HEAD --format=%B), and that every commit whose diff touches a path outside explorations/ carries a historical: line.',
...commitPushSteps(held, heldBy),
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

// Steps 3 to 5 of the commit stage: the push or the held push; the two microGPT
// programs under walk, started in the background on the landed tree and not awaited
// (Pavol, 2026-09-19: running them is a separate non-gating stage; since the
// post-mortem of 2026-09-29 no rung runs them); and the clean-up.
function commitPushSteps(held, heldBy) {
  return [
held
  ? '3. Do NOT push: not main, not ' + CONTAINER_BRANCH + ', no branch. The script holds the push, because landed rungs carry stops that were met and that no decision of Pavol\'s lifts:\n\n' + heldBy.map(h => '- ' + h).join('\n') + '\n\n   Append to ' + BATCH_DIR + '/RECORD.md a paragraph headed "Not pushed." that names each of these stops with its rung and evidence, gives the hash origin/main stays at, and says that the push waits on Pavol, as batch 4\'s and batch 5\'s records did; commit it locally with the footer. The coordinator pushes once he has lifted them.'
  : '3. git push origin main; then git push origin main:' + CONTAINER_BRANCH + ' so the container\'s own branch stays at main. Retry a failed push up to four times with 2, 4, 8, 16 seconds between.',
'4. Start the two microGPT programs under walk on the landed tree in the background, to ' + LOG_DIR + '/microgpt-walk.txt, and do not wait for them: the coordinator reads the file at the landing report or the post-batch review (Pavol, 2026-09-19: a separate non-gating stage). From ' + MAIN + ', with run_bg from the shared prefix, and only if no earlier attempt or run started them, as the log exists once they are started:\n\n        [ -e ' + LOG_DIR + '/microgpt-walk.txt ] || run_bg ' + LOG_DIR + '/microgpt-walk.txt "explorations/coordinator/tools/mg-run.sh ' + LOG_DIR + '/microgpt-walk batch-' + BATCH + '"\n\n   A second start would delete the private caches of the programs already running and put four JVMs of 4 GB on the box. The tool runs MicroGptFlatCheck and MicroGptAplCheck under walk, both at once, each from an empty private cache, about 80 minutes each; each program\'s output goes to ' + LOG_DIR + '/microgpt-walk/<name>.txt, headed by the machine line and ended by rc=, and ' + LOG_DIR + '/microgpt-walk.txt ends in EXIT= when both are done. Nothing of it is committed.',
held
  ? '5. Keep every wip/ worktree and its local branch: their removal follows the push, as batch 5\'s commit stage kept them while its push was held.'
  : '5. For each wip/ branch: confirm git -C <worktree> status -sb shows nothing ahead of its origin; restore the one tracked file a build deletes, git -C <worktree> checkout -- default_repository/caches/global.map (FACTS.md, "ant compileAll deletes a tracked file"); then git worktree remove <worktree>, without --force (its ignored tmp/ goes with it; the transcripts hold what it held), and git branch -D <branch>. Then each rung\'s private copy of the base, <worktree>-base, where one was made (' + RUNGS.map(baseCopy).join(', ') + '): git -C <copy> checkout -- default_repository/caches/global.map, and git worktree remove <copy>, without --force; it is detached and has no branch. The base build, ' + BASE_BUILD + ', is the coordinator\'s and stays. A worktree git refuses to remove holds uncommitted or untracked work: keep it and its branch, and name it in your result with its git status --short; the coordinator decides. Leave the remote wip/ branches: the proxy refuses branch deletion from here, and Pavol removes them in the GitHub UI.',
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
        capture: { type: 'string', description: 'the path of that run\'s capture under ' + LOG_DIR + '/, not committed, shared by the files of the run' },
      }, required: ['file', 'paths', 'suite', 'cases', 'verdict', 'capture'] } },
    failingAnswered: { type: 'array', description: 'the gate\'s repair, and the review\'s repair when the gate beside the review was red and its lines are in your role: one entry per line of the gate\'s failing list, in order; otherwise empty',
      items: { type: 'object', properties: {
        failing: { type: 'string' },
        file: { type: 'string', description: 'the testRuns file whose passing run answers it; empty if none does' },
      }, required: ['failing', 'file'] } },
  }),
  required: RUNG_SCHEMA.required.concat(['headBefore', 'headAfter', 'pathsChanged', 'testRuns']),
})

// Whether the gate runs again after a repair on the merged tree. It does when the
// repair, or the review's corrections before it (reviewPaths), changed a path the
// gate reads that is not a test file (gateReads: under ProjectFortress/ or Library/,
// or build.xml; since 2026-10-02 a path no stage reads, such as the specification's
// text, does not, and is returned as ungated); when a test path they changed is
// not exercised by a passing run of the repair's; when the repair did not say what
// it changed; and, after the gate's repair (redGate, the gate it repaired), when the
// gate's own counts fell or a suite went, when it named no failing line, or when a
// line it failed on is not answered by a passing run. After the review's repair,
// redGate is the red gate that ran beside the review, asked of a repair the first
// call found to be of tests and records only: whether its runs already answer that
// gate's lines, so that no gate judge runs (below "The run."). Otherwise the first gate's
// tables stand and the repair's runs are recorded beside its summary. No second
// review runs after it since the post-mortem of 2026-09-29.
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
//
// A stop that decides nothing (climb batch 7b's review, finding 1; approved by
// Pavol on 2026-09-30). At the account's weekly limit, at 02:16 UTC on 2026-09-30,
// every agent of run wf_61521277-479 came back with nothing: agent() returned
// null, the harness logging "[skeptic:C] failed: You've hit your weekly limit".
// callAgent ran each role three times within seconds; the stage below read each
// null skeptic as a refusal and each null judge as a drop, and the script marked
// C, S and L dropped and started the gather with W alone, which failed on the
// limit too, the only thing that kept W from landing alone
// (explorations/reviews/batch-7b-review.md, section 3). A limit stops every agent
// at once, and the script has no clock to wait it out with. So the run stops,
// before anything more is started or decided, in two cases: agent() throws an
// error that names a usage or rate limit (LIMIT_ERROR), and the role is not run
// again; or a rung worker, a skeptic or a judge (callAgent's needed) comes back
// with nothing after its attempts, whatever the cause, since a null does not say it. Once the
// run stops, callAgent throws at every attempt before it starts an agent, a stage
// of the scatter that throws drops its rung to null, and the script throws below
// the scatter. The journal holds every agent that finished, and each empty attempt
// as failed, so resumeFromRunId with the same script and args returns the finished
// agents from it and runs the stopped role again. The gather, the review, the
// gate, the commit and a repair on the merged tree that come back with nothing, and
// no limit error thrown, keep their paths (gather unresolved, review-missing, the
// gate run once more, not landed, review-unrepaired).
// ---------------------------------------------------------------------------

const ATTEMPTS = 3   // the first attempt and up to two more: Pavol asked for the retry on 2026-09-27, the coordinator's brief set the count
const LIMIT_ERROR = /usage limit|rate limit|rate_limit|ratelimit|weekly limit|daily limit|hit your .{0,30}limit|limit reached|reached your .{0,30}limit|too many requests|\b429\b/i
let runStop = null   // why the run stops, once it does

// The error that stops the run, and its one log line, written when the stop is first met.
function stopRun(why) {
  if (!runStop) {
    runStop = why
    log('The run stops here, nothing decided: ' + why + '. No agent starts after this. Resume it with resumeFromRunId, the same script and the same args, once the cause is gone (a usage limit reset): the agents that finished come back from the journal, and this role runs again.')
  }
  return new Error('Run stopped, nothing decided: ' + runStop + '. Resume it with resumeFromRunId, the same script and the same args, once the cause is gone; the agents that finished come back from the journal, and the role that stopped it runs again.')
}

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

// needed: a rung worker's, a skeptic's or a judge's call, whose nothing after its attempts stops the run.
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
        + (attempt < ATTEMPTS
          ? '; running the role again as attempt ' + (attempt + 1) + ', told to take over what this one left'
          : needed ? '; no attempt left' : '; no attempt left, so the script takes its path for a dead agent'))
  }
  if (needed) throw stopRun(role + ' returned nothing after ' + ATTEMPTS + ' attempts, and a rung worker, skeptic or judge that returns nothing is read neither as a dead worker, a refusal nor a drop')
  return null
}

// A command started with run_bg (nohup) may outlive the agent that started it.
const bgCheck = (tree) => 'A command the earlier attempt started with run_bg (nohup) may still be running. Before you start a build, a test or any long run, list what runs: ps -eo pid,etime,args | grep -E "ant|java|fortress" | grep -v grep, and readlink /proc/<pid>/cwd for the tree each runs in (other agents of this batch run in their own trees). A step still running in ' + tree + ' is the earlier attempt\'s: wait for its log with wait_for and use its result; never start the same step, or a second ant, beside it.'

// The rung worker's first pass: its branch, its worktree, its own directory.
function recoverRung(rung) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '; if it does not exist, make it by the shared prefix\'s command. Set up the shell as the shared prefix says, then run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb (commits not yet pushed show as ahead) and ls -lt tmp/ | head -20, and read what exists of explorations/compile-ladder/' + rung.slug + '/, REPORT.md and record.md, and of its scratch under tmp/' + rung.slug + '/.',
    'The shared prefix\'s section "If your branch already carries commits" applies in full: committed work is yours to verify, not to redo; uncommitted edits are yours once you have read them; a log whose last step failed or was cut off is a step still to do.',
    'Test first still holds: the test is seen failing on the base before the edit. If the earlier attempt made the edit and no test-only commit precedes it, see the test fail through the harness on the base\'s code in the rung\'s private copy of the base (the shared prefix\'s "The old code beside the new"), not by reverting and rebuilding your worktree; commit the test alone (git stash the edit around that commit, git stash pop after it), and say so in REPORT.md.',
    bgCheck(rung.path),
    'Commit what you took over once you have read it, push what is committed and not pushed, and go on with the order of work from the first step not done.',
  ]
}

// The rung worker's continuation after a judge's ruling: on a stop (resume) or
// on a skeptic's refusal (repair).
function recoverRungRepair(rung, afterRefusal) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '. Run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb and ls -lt tmp/ | head -20, and read explorations/compile-ladder/' + rung.slug + '/JUDGE.md' + (afterRefusal ? ', SKEPTIC.md' : '') + ', REPORT.md and record.md. The commits after the one that carries the judge\'s ruling are the earlier attempt\'s, and so are uncommitted edits.',
    'Take the judge\'s numbered instructions one at a time and check each against the tree before acting: a step already done is not done again. An assertion already in the test is not added a second time, a line already in REPORT.md or record.md is not written twice, and a harness run already made after the edit is not made again unless it was cut off. Continue at the first step not done.',
    bgCheck(rung.path),
    'Commit what you took over once you have read it, push what is committed and not pushed, and finish as the repair round below says, with reportText, recordText and stopsMet describing the rung as it now stands.',
  ]
}

// A skeptic, first or second judgement: SKEPTIC.md and its scratch under tmp/<slug>/skeptic/.
function recoverSkeptic(rung, round) {
  const f = 'explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb and ls -lt tmp/ | head -20, and read ' + f + ' and the scratch under tmp/' + rung.slug + '/skeptic/.',
    round > 1
      ? 'SKEPTIC.md already held the first judgement, which refused, before the repair round. Only a "# Second judgement" section written after the repair round\'s last commit on the branch is the earlier attempt\'s work; the first judgement is not your verdict.'
      : 'This is the rung\'s first judgement, so whatever SKEPTIC.md and tmp/' + rung.slug + '/skeptic/ hold is the earlier attempt\'s work.',
    'If the earlier attempt\'s verdict is complete (a verdict, the checks of the role below, the differentials with their outputs under tmp/' + rung.slug + '/skeptic/), it is your verdict. Confirm that each output it quotes is there and says what the verdict quotes it for, commit and push SKEPTIC.md if it is not committed and pushed, and return it, with skepticText the word committed once the file is committed on the branch (' + (round > 1 ? 'this second judgement\'s text' : 'the file\'s text') + ' word for word only if the harness refuses the write) and judgedHead the head the verdict judges. It may have been returned already and lost on the way, which is the case this retry exists for.',
    'If it is partial, finish the checks and differentials it has not done and complete the file in place: never a second copy of a section. A differential whose output exists and is whole is not run again.',
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

// The merged-diff review: its one corrections commit and the head it records
// before it.
function recoverReview() {
  return [
    'You are in the main tree, ' + MAIN + ', with the gate running beside you or finished. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short. A commit titled "Fold the review\'s corrections" made after the gather\'s last rung commit is the earlier attempt\'s. Then headBefore is that commit\'s parent, not the HEAD you find, so that pathsOutsideExplorations covers both attempts\' corrections; headAfter is HEAD when you finish.',
    'Uncommitted edits under explorations/ are the earlier attempt\'s corrections in progress: read them, keep what is right, and commit them with your own, in one commit of the same title, or in one more such commit if the earlier attempt already made its own. Do not fix a finding twice.',
    'Never touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/.',
  ]
}

// The repair on the merged tree, after a blocking review or a red gate.
function recoverMergedRepair(kind) {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean. Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --stat, ' + BATCH_DIR + '/JUDGE-' + kind + '.md, and ' + BATCH_DIR + '/REPAIR-' + kind + '.md if it exists. A commit after the one that carries JUDGE-' + kind + '.md is the earlier attempt\'s repair, uncommitted edits are its repair in progress, and the tree as you find it is your starting point.',
    'Take the judge\'s instructions one at a time and check each against the tree before acting: an edit already in place is not applied again, an assertion already in a test is not added twice, and a record line already written is not written again. Continue at the first step not done.',
    bgCheck(MAIN),
    'The role asks for one commit. If the earlier attempt made it already, what you finish goes in one further commit, and your result says so; headBefore is then the parent of the earlier attempt\'s first commit, so that pathsChanged covers both attempts, and a test run it captured under ' + LOG_DIR + '/repair-' + kind + '-tests/ on the tree as it still is stands and is not run again. Do not push.',
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

// The commit: its local commits, the microGPT programs started in the background,
// and the push or the held push.
function recoverCommit(held) {
  return [
    'You are in the main tree, ' + MAIN + '. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short, and run grep -rn "<short hash>" explorations/. A commit titled "' + COMMIT_TITLE + '" is the earlier attempt\'s step 1: do not make it again, and finish what it left uncommitted, if anything, in one further commit. If the role has a step 1a and ' + GATE_DIR + '/summary.txt already carries "# repair-tests" or "# repair-ungated" lines, they are the earlier attempt\'s: do not copy the gate\'s summary over that file again and do not append them twice.',
    'If ' + LOG_DIR + '/microgpt-walk.txt exists, the earlier attempt took step 4: do not start the two programs again.',
    held
      ? 'The push is held. Look for the "Not pushed." paragraph in ' + BATCH_DIR + '/RECORD.md: if the earlier attempt wrote it, do not append it again, and commit it if it is not committed. Push nothing, as the role says.'
      : 'Check what is already pushed: git fetch origin, then git rev-parse HEAD origin/main origin/' + CONTAINER_BRANCH + '. A push the earlier attempt made is not made again; push only what origin lacks. git worktree list and git branch --list "wip/*" show which worktrees and branches step 5 has already removed; confirm that each one left shows nothing ahead of its origin before removing it.',
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
  }, recoverRung(rung), true),

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
      }, judgeTier(null)), recoverJudgeRung(rung, 'stop'), true)
      if (!judgeOnStop || judgeOnStop.decision !== 'repair') {
        return out('stopped', { worker, verdict: null, judge: judgeOnStop })
      }
      const resumed = await callAgent(PREFIX + rungRole(rung) + rung.tail + repairPrompt(rung, null, judgeOnStop), {
        label: 'resume:' + rung.id,
        phase: 'Rung',
        schema: RUNG_SCHEMA,
        model: OPUS,
      }, recoverRungRepair(rung, false), true)
      if (!resumed || resumed.stopped || !resumed.landed) {
        return out('stopped', { worker: resumed || worker, verdict: null, judge: judgeOnStop })
      }
      worker = resumed
    }

    const verdict = await callAgent(PREFIX + skepticRole(rung, worker), {
      label: 'skeptic:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
      model: OPUS,
    }, recoverSkeptic(rung, 1), true)

    if (verdict && verdict.approved) {
      return out('approved', { worker, verdict, repaired: false, judge: judgeOnStop })
    }

    log(rung.id + ' refused by its skeptic: ' + ((verdict && verdict.refusalReason) || 'no reason returned') + '; the judge rules before the one repair round')

    const decision = await callAgent(PREFIX + judgeRole('refusal', rung, worker, verdict, null), Object.assign({
      label: 'judge:' + rung.id,
      phase: 'Judge',
      schema: JUDGE_SCHEMA,
    }, judgeTier(judgeOnStop)), recoverJudgeRung(rung, 'refusal'), true)
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
    }, recoverRungRepair(rung, true), true)

    // The second skeptic's own short brief: its refusal, the judge's ruling, the repair's
    // diff since the refused head, and the one question (secondSkepticRole).
    const verdict2 = await callAgent(PREFIX + secondSkepticRole(rung, verdict, decision, repaired || worker), {
      label: 'skeptic2:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
      model: OPUS,
    }, recoverSkeptic(rung, 2), true)

    return out((verdict2 && verdict2.approved) ? 'approved-after-repair' : 'dropped', {
      worker: repaired || worker,
      verdict: verdict2,
      firstVerdict: verdict,
      judge: decision,
      repaired: true,
    })
  },
)

// A run stopped inside the scatter (callAgent, "A stop that decides nothing") has a
// rung whose stage threw and came back null: nothing is read from the scatter, so
// no rung is marked dropped, withheld or not landed, and the gather does not start.
if (runStop) throw stopRun()

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
// repair waits for the gate, because both work in this tree. Since the post-mortem
// of 2026-09-29 the judge rules only on the review's blockingCode findings, those
// whose repair touches code; its routed findings, settled by tests and records
// only, take the path of a judge's land ruling with no judge call (synthesis.md,
// section 4, item 34).
const gateRun = callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
gateRun.catch(() => null)   // a run stopped beside the review throws from the review's call first; the gate's own stop is thrown where it is awaited
let review = await callAgent(PREFIX + reviewRole(gather, 'review', reviewItems), { label: 'review', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS }, recoverReview())
report.review = review
routers.push(review)
mergedItems.push(...numbered('review', review && review.forPavol))
// A review that returned nothing: the batch lands on its gate without one, and the
// result says so as an item for the coordinator's landing report; nothing holds the
// push for it (the script review of 2026-09-29, finding 12, as the coordinator took it).
if (!review) {
  log('The merged-diff review returned nothing after ' + ATTEMPTS + ' attempts: the batch lands on its gate without one, listed as review-missing.1 for the landing report; nothing holds the push for it')
  report.reviewMissing = true
  mergedItems.push(...numbered('review-missing', ['The merged-diff review returned nothing after ' + ATTEMPTS + ' attempts, so no review read this batch\'s merged diff and folded record beside its gate; the post-batch review is the first to read them.']))
}
const routedFindings = strings(review && review.routed)
if (routedFindings.length) {
  log('The review routed ' + routedFindings.length + ' finding(s) settled by tests and records only to the next batch, listed for Pavol; no judge runs for them')
  report.reviewRouted = { findings: routedFindings }
  mergedItems.push(...numbered('review-routed', routedFindings))
}
const reviewBlocks = !!(review && strings(review.blockingCode).length)
let reviewDecision = null
if (reviewBlocks) {
  log('Review found ' + strings(review.blockingCode).length + ' finding(s) that touch code; the judge rules while the gate runs on')
  reviewDecision = await callAgent(PREFIX + judgeRole('review', null, null, null, review), Object.assign({ label: 'judge:review', phase: 'Judge', schema: REVIEW_JUDGE_SCHEMA }, judgeTier(null)), recoverJudgeMain('review'), true)
  report.reviewJudge = reviewDecision
  mergedItems.push(...numbered('judge-review', reviewDecision && reviewDecision.forPavol))
}
let gate = await gateRun
report.gate = gate

// A blocking review means a judge, and on a repair ruling a repair on the merged
// tree; the gate that ran beside it is discarded when the repair changed a path the
// gate reads under it; after a repair of tests, records or paths no stage reads its
// tables stand (repairRerun). On a land ruling nothing runs after the judge but what a
// green gate always leads to. The review's own corrections follow the same path rule
// since 2026-10-02 (gateReads; POSITIONS.md, "Nothing is built or run twice on the same
// code.").
const reviewPaths = strings(review && review.pathsOutsideExplorations)
const reviewGated = reviewPaths.map(repoPath).filter(gateReads)
const reviewUngated = ungatedOf(reviewPaths)
let gateIsStale = reviewGated.length > 0
const beside = []   // the repairs whose runs, or whose paths no gate stage reads, stand beside the gate's summary instead of a second gate
if (gateIsStale) {
  log('The review\'s corrections touched ' + reviewGated.length + ' path(s) the gate reads ('
      + reviewGated.join(', ') + '); the gate that ran beside it is stale and runs again')
} else if (reviewUngated.length) {
  log('The review\'s corrections touched ' + reviewUngated.length + ' path(s) outside explorations/ that no gate stage reads ('
      + reviewUngated.join(', ') + '); the gate that ran beside it stands, and the commit stage records why')
}
// A red gate beside the review, which that review's repair may already answer: its
// lines go to the review's repair, and when that repair changed test files and
// records only and its passing runs answer every line, no gate judge and no gate
// repair run (Pavol's rule of 2026-09-29 on rerunning the gate after a repair that
// only added tests, extended; in climb batch 6.5b the review's repair had fixed and
// run the one test the gate failed on, and a gate judge and its repair ran the same
// pair again, 42 minutes and 0.38M tokens: reviews/batch-6.5b-review.md, finding 2).
const redBeside = !!(gate && !gate.stopped && !gate.green && !gateIsStale)
let redAnswered = false

if (reviewBlocks) {
  const decision = reviewDecision
  if (decision && decision.decision === 'land') {
    // Pavol, 2026-09-29 (POSITIONS.md, rerunning the gate: the same weighing of cost
    // against what a rule protects applies to the other rules): a ruling settled by
    // tests and records only does not hold the batch. No repair runs; the batch lands
    // on its gate, and the ruling's steps go to the next batch, listed for him, as the
    // review's routed findings do (LAND_RULE).
    log('The review\'s judge ruled land: its ' + strings(decision.instructions).length + ' step(s) of tests and records go to the next batch with the review\'s findings, listed for Pavol (' + BATCH_DIR + '/JUDGE-review.md); no repair runs, and the batch lands on its gate')
    report.reviewRouted = { findings: routedFindings.concat(strings(review.blockingCode)), instructions: strings(decision.instructions), ruling: BATCH_DIR + '/JUDGE-review.md' }
    mergedItems.push(...numbered('judge-review-land', decision.instructions))
  } else if (!decision || decision.decision !== 'repair') {
    return finish({ landed: false, reason: 'review blocking, judge did not order a repair' })
  } else {
    report.repairReview = await callAgent(PREFIX + mergedRepairRole(decision, 'review', redBeside ? gate.failing : undefined), { label: 'repair:review', phase: 'Review', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('review'))
    routers.push(report.repairReview)
    // A repair that returned nothing, stopped, or did not land leaves the code findings
    // the judge upheld unsettled: they go to the next batch, listed for Pavol, and do
    // not hold the push (Pavol, POSITIONS.md 2026-09-29, a review that still blocks
    // after its repair does not hold a green batch; the script review, finding 1).
    const rr = report.repairReview
    if (!rr || rr.stopped || rr.landed === false) {
      log('The review\'s repair ' + (!rr ? 'returned nothing' : rr.stopped ? 'stopped (' + (rr.stopReason || 'no reason given') + ')' : 'did not land') + ': its ' + strings(review.blockingCode).length + ' code finding(s) go to the next batch as review-unrepaired, listed for Pavol; they do not hold the push')
      report.reviewUnrepaired = strings(review.blockingCode)
      mergedItems.push(...numbered('review-unrepaired', review.blockingCode))
    }
    // Pavol, 2026-09-29 (POSITIONS.md, rerunning the gate after a repair that only
    // added tests) and 2026-10-02 ("Nothing is built or run twice on the same code."):
    // the gate runs again only when the repair, or the review's corrections, changed a
    // path the gate reads that is not a test file (gateReads), or a test path no
    // passing run of the repair's exercised (repairRerun); otherwise the repair's own
    // runs verify its tests, and the first gate's tables stand beside a record of the
    // paths no gate stage reads.
    const after = repairRerun(report.repairReview, strings(review && review.pathsOutsideExplorations), null)
    report.repairReviewRerun = after
    if (after.rerun) {
      log('After the review\'s repair the gate runs again: ' + after.why)
      gateIsStale = true
    } else {
      const red = redBeside ? repairRerun(report.repairReview, strings(review && review.pathsOutsideExplorations), gate) : null
      if (red) report.repairReviewRed = red
      if (red && !red.rerun) {
        redAnswered = true
        log('The review\'s repair changed ' + red.why + ' and its runs answer the ' + strings(gate.failing).length + ' line(s) the gate beside the review was red on; by Pavol\'s rule of 2026-09-29 the gate does not run again, no gate judge or gate repair runs, and its tables stand beside the runs')
        beside.push({ kind: 'review', runs: red.runs, answered: red.answered, ungated: red.ungated, commits: (rr.headBefore || '?') + '..' + (rr.headAfter || '?') })
      } else {
        if (red) log('The gate beside the review was red, and the review\'s repair does not answer it (' + red.why + '); the gate judge rules on it as before')
        if (strings(rr && rr.pathsChanged).length) {
          log('The review\'s repair changed ' + after.why + ' (' + after.runs.length + ' test file(s) run in the harness by the repair); by Pavol\'s rules of 2026-09-29 and 2026-10-02 the gate does not run again and its tables stand')
          beside.push({ kind: 'review', runs: after.runs, answered: [], ungated: after.ungated, commits: (rr.headBefore || '?') + '..' + (rr.headAfter || '?') })
        } else {
          log('The review\'s repair changed nothing: the gate\'s tables are the tree\'s, and no repair runs stand beside them')
        }
      }
      gateIsStale = false
    }
  }
}

// The review's corrections alone touched paths no gate stage reads, and no repair's
// entry carries them: they stand beside the summary too.
if (!gateIsStale && reviewUngated.length && !beside.some(b => b.kind === 'review')) {
  beside.push({ kind: 'review-corrections', runs: [], answered: [], ungated: reviewUngated, commits: ((review && review.headBefore) || '?') + '..' + ((review && review.headAfter) || '?') })
}

if (gateIsStale || !gate) {
  gate = await callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate:after-review', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
  report.gateAfterReview = gate
  beside.length = 0   // this gate ran on the repaired tree, the repair's tests among its counts
}

if (!gate || gate.stopped) {
  return finish({ landed: false, reason: 'gate could not run' })
}
if (!gate.green && !redAnswered) {
  log('Gate red: ' + gate.failing.length + ' failing; the judge diagnoses on the merged tree')
  const decision = await callAgent(PREFIX + judgeRole('gate', null, null, null, gate), Object.assign({ label: 'judge:gate', phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(report.reviewJudge)), recoverJudgeMain('gate'), true)
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
    beside.push({ kind: 'gate', runs: after.runs, answered: after.answered, ungated: after.ungated, commits: ((report.repairGate && report.repairGate.headBefore) || '?') + '..' + ((report.repairGate && report.repairGate.headAfter) || '?') })
  }
}

// Commit: hashes into the notes, the gate summary added, push, fast-forward the
// container branch, the microGPT programs started in the background, clean up; or, while a landed rung carries a stop that was met
// and not lifted, the same without the push and the clean-up (pushHeldBy).
// The items for Pavol that no stage put into PLAN.md, for the coordinator: the
// commit stage does not wait on them, and the result carries each with inPlan.
const notInPlan = pavolStatus().filter(i => !i.inPlan)
if (notInPlan.length) log('Items for Pavol not in PLAN.md, for the coordinator: ' + notInPlan.map(i => i.id).join(', ')
    + ((gather && Array.isArray(gather.pavolUnrouted) && gather.pavolUnrouted.length) ? '; the gather says why: ' + gather.pavolUnrouted.map(u => u && (u.id + ': ' + u.why)).join('; ') : ''))

const heldBy = pushHeldBy(approved, review, { 'repair:review': report.repairReview, 'repair:gate': report.repairGate })
if (heldBy.length) log('Push held: ' + heldBy.length + ' stop(s) met and not lifted: ' + heldBy.join('; '))
const commit = await callAgent(PREFIX + commitRole(gather, gate, heldBy, beside), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(heldBy.length > 0))
report.commit = commit
return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy, besideGate: beside })
