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
// freed slot going to the next queued agent, FIFO. k is 4 in the first run
// (I, K, T, M) and 1 in the second (Q).
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order
// only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction, never red) and
// expectedCheckerCrash (compared exactly with the table's #crash field; no
// rung of this batch declares one, so any change of the crash row is red).
// K and T predict CHECKER_BASE, the last landed total; I, M and Q report.
// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; T
// names I, and the script applies it after the scatter, so T reaches the
// gather only when I is approved. briefing: the rung's mission briefing, which
// the planner writes from the record so that the agents learn in context what
// they were never trained on: the keys of
// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries
// (positions:DATE WORDS), gap-ledger rows (ledger:ROW) and earlier rulings
// (doc:PATH#HEADING) the rung rests on; the notes already written on the
// subject, found through INDEX.md (doc:); the specification's sections its
// subject touches (doc: on a .tex heading, code: on a passage); the library,
// checker and interpreter code that is the precedent for the same kind of
// problem (code:PATH#FROM..TO); and the FACTS.md entries and map rows of its
// area; in reading order, decisions first. The rung worker reads it whole as
// its step 1. And checks, the sub-list of briefing that the skeptic, the
// repair round and the judges read as their step 1: the decisions and ledger
// rows their checks need, and the specification's sections and the precedent
// code those checks compare against. No key holds a double quote, backtick,
// dollar sign or backslash, since each is rendered in double quotes. Each list
// is checked with the tool's --check to match exactly one place per key (on
// main at the drafting; re-checked at each launch). Each briefing key has a
// one-line reason, why it is there and what the rung does with it, rendered
// at the end of the rung's tail (listsn.py; Pavol, 2026-09-28, the process
// review's measure 5).
//
// Batch N's values are CLIMB-BATCH-N.md, sections 3, 6 and 7. Each tail is
// that rung's section of section 3 word for word, with the record's code-span
// backticks dropped (this file carries none), then its briefing's reasons;
// ASCII only. I's, T's and Q's sections open with their answers line,
// Q1 = (1), the default the conversion judgement took as the numeral tie
// rule, which the coordinator changes at launch if Pavol answers otherwise.
// Three values are set at each launch and nowhere else: RUN ('first' is
// batch N, rungs I, K, T and M; 'second' is batch Nb, rung Q, launched once
// the first has landed; the record's section 1, "Two runs of one record"),
// LEDGER_FROM (one above the highest row of the gap ledger at that launch)
// and CHECKER_BASE (the #total of the last landed checker-count.txt); the
// block refuses to load while either is unset. Manifest order is the ledger
// numbering order: I, K, T, M in the first run, Q in the second. The scatter
// starts the longest expected first: K, I, T, M. No rung declares a ladder
// move. The base is <base>, passed at launch as args.base, not written here.
// ===========================================================================

const RUN = 'first'     // SET AT LAUNCH: 'first' (batch N: I, K, T and M) or 'second' (batch Nb: Q, once the first run has landed); the record's section 1, "Two runs of one record"
const LEDGER_FROM = 504   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch
if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\'s launch')
const CHECKER_BASE = 75   // SET AT LAUNCH: the #total of the last landed checker-count.txt, the one the gate compares against (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base)
if (!Number.isInteger(CHECKER_BASE)) throw new Error('CHECKER_BASE is not set: the #total of the last landed checker-count.txt')
if (!['first', 'second'].includes(RUN)) throw new Error('RUN is not one of first, second')

const BATCH = RUN === 'second' ? 'Nb' : 'N'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-N.md'

const I_TAIL = [
"",
"## Your rung: I - inference with coercion in the checker",
"",
"SLUG is rung-inference-checker. WORKTREE is /home/user/fortress-infer, branch wip/rung-inference-checker.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-N.md, section 3, under \"I. Inference with coercion in the checker\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q1 = (1), the numeral tie rule of the conversion judgement (explorations/reviews/conversion-overloading-judgement.md section 4), taken as its default and listed for Pavol's review. (Section 1 of the batch record gives the question and its options; where this section says \"under Q1 = (1)\", that text applies while the coordinator has written that answer here; under (2) the default is the expected type then a refusal, under (3) a refusal.)",
"",
"**Its briefing.** The decisions the rung rests on (the numerics plans, the two decisions of the conversion judgement, probe K's item 9, answer 8, answer 9, a numeral's type, a size used as a value, route A, the library's practice, the library route, answer 12, the JVM principle, under which Q1's default is read, the probe rule, the landed gate's tables as a rung's before, the launch of phase 3's batches, the stops, rung D's stop); ledger rows 401, 388, 455, 447, 484, 485, 488, 390 and 391; the conversion judgement's rule, its Q1 section, where it lands and the findings that stand under every way; the fork's measurement and why the shadow took the plain arm, and the soundness note's sections on the static and dynamic choice and on numerals; the shadow note's answers and its sections on the edit, the probes, microGPT, the distance, the compiler's tests and the forks, with rule.patch and RuleCRun.fss; evidence B's sections on how a static argument is inferred, whether the expected type is used and whether coercion is considered; measurement D's section on what the kept context changes; the conformance reviews' findings on the solver's two behaviours, on a size used as a value and on the library's numeral strides, and row 488's probe; batch 6.5's judge and its review on the compiled prelude's widen(0), whose pick varied from run to run, and the review's finding on where item 25 meets 6.5b's rung E; item 26's judgement on a call whose argument's static type sits between two declarations, with its probe; the specification's inference chapter, its sections on applicability with coercion, coercion resolution and applicability to named calls; the checker's applicability methods, checkApplication, moreSpecificCandidate, the tight juxtaposition's cases, inferStaticParams, the type a size used as a value gets, the coercion oracle's getCoercionsTo and substitutableFor; the two libraries' IntLiteral; the two expected failures it promotes and NatRtBigSize; the FACTS entries on inference, the expected type, a numeral's type, the coercion refused by an inferred generic, microGPT's checker errors, the specification's silence, the distance, rung R's refusal, the size checks and the harness; the walkthrough's section on how the checker walks the tree and the map's checker row. The keys are in section 7, each with its reason at the end of the tail; checks is the decisions (the numerics plans, the conversion judgement's two decisions, answer 8, a numeral's type, the JVM principle, the stops), rows 401, 388, 455, 447, 484 and 391, the judgement's rule and its Q1 section, the shadow's sections on the tests and the forks, the applicability section, the applicability methods, moreSpecificCandidate, the two tests and the harness entry on a pinned expected failure.",
"",
"**The problem.**",
"- The checker infers a generic's static arguments from the arguments' types by subtyping alone. Its constraint is \"argType <: domain\", with \"range <: context\" when a context is given (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:928-947); the solver binds each variable to the join of its lower bounds, a union (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:527); checkApplicableWithInference is documented \"with static argument inference and no coercion\" (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:172-174), and coercions are built only for a candidate with no static parameter left (:279-341). So a numeral or a narrower number for a declared parameter of a generic is refused (row 401: scale(Box[\\3\\](2), 3) with m: ZZ32, under the compiler library, whose IntLiteral is not a ZZ32; row 388: gf[\\T\\](x: Wide, y: T) with a Narrow, and the container shape scale(b, z) for b: Box[\\RR64\\]), and a call over mixed widths infers a union (pick(l, 3) is OR(ZZ64,IntLiteral)), where answer 8 names the narrowest type both convert into (FACTS.md, \"Static arguments are inferred from the arguments alone, on both paths, and never through a coercion\").",
"- The expected type is dropped at a call written f(x): the parser builds it as a tight juxtaposition, which the checker turns into a MathPrimary and then a _RewriteFnApp without passing expected (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala:85, :345, :197; :89-90 is reached only by desugarings), while a method invocation and an operator keep it (row 455). Kept alone, the context refuses calls that pass today by converting their result afterwards (a: ZZ64 = idt(3), 6 of 12 probe calls; FACTS.md, \"Keeping the expected type at a call written f(x) is four one-token edits\").",
"- The ranking: checkApplication sorts the applicable candidates with moreSpecificCandidate and takes the head (Functionals.scala:462), and the check that the head is more specific than every other is a comment with no code (:463, \"ensure that head is actually more specific.\"); moreSpecificCandidate ranks a candidate that uses no coercion above one that does before it compares domains (STypesUtil.scala:1085-1095, the team's, 2009). So the shadow's promotion, which ran inside the first attempt and wrapped the converted argument in a coercion, lost to a plain declaration over Any beside it (explorations/reviews/before-n-questions.md appendix A.2), and a call whose candidates tie takes one of them by a pick that is not stable: ZZ32's widen is declared before NN32's (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:269, :328), and widen(0) took NN32's in batch 6.5's merged gate and in the gate's rerun under the same seed, ZZ32's in a fresh compile of the same file (row 391; explorations/compile-ladder/climb-batch-6.5/REPAIR-review.md section 2, deviation 1; explorations/reviews/batch-6.5-review.md finding 2; before-n-questions.md appendix B.3 had read it as the list's head), so a base failure captured once alone may not be what the suite does.",
"- The stock compiled path crashes on a promoted generic beside a plain op(a: ZZ64, b: ZZ64): op(z, w) stops with \"Overloading instanceof match failure: Should not happen!\" (ProjectFortress/src/com/sun/fortress/runtimeSystem/MiscCodegenFunctions.java:20; explorations/reviews/option-2-soundness/captures/O2Z64.stock.txt). Typed at ZZ64 statically, the call dispatches to plain64 (measured on the shadow's build, explorations/reviews/option-2-soundness.md section 2). No row holds it yet.",
"- Under the numeral switch (rung Q, run 2) a numeral is no longer a ZZ32 in the one library, and every such call meets these refusals: on the switch's library copy the checker refuses every range that starts with a numeral in both microGPT programs (13 and 11 declarations) and row 401's shape in heads, unheads and onehot (FACTS.md, \"MicroGPT's own programs through the compiled checker against the one library\").",
"",
"**The decisions.** The numerics plans, decision 3 (explorations/coordinator/POSITIONS.md, 2026-09-27): the checker infers a static argument with coercion, answer 8's promotion rule its number case, and keeps the expected type at f(x) with a retry without it, so that a binding's coercion still applies. The conversion rule (POSITIONS 2026-09-28, the two decisions of the conversion judgement, decision 1; the judgement's sections 1, 4 and 5): declarations are chosen by the coercion chapter's order on their declared, quantified domains, a generic declaration applicable when some instance within its bounds is (answer 9); a generic candidate whose declared domain holds the arguments stays in the first attempt although the promotion then converts, moreSpecificCandidate's coercion-first test does not count a coercion the promotion introduced, and a promoted candidate is compared on its declared domain; the chosen declaration is then instantiated by answer 8's promotion, its coercions inserted in the call. The ambiguity check at Functionals.scala:463: a call whose applicable candidates have no one more specific than every other is an error, except where the tie is a numeral's, which Q1's default settles (the judgement's section 4); a non-numeral argument whose conversion targets are incomparable stays the specification's ambiguity error. The check does not refuse a tie among candidates applicable without coercion: under the Meet rule such a tie arises only for a call whose argument's static type sits between two declarations, below both and not below the declaration that is their meet by the comprises clauses (g: G[\\ZZ32\\] with f(S) and f(T) applicable and f(V) not), whose typing is batch 7b's rung C's; such a call keeps today's typing, the head of the sort, and the rung reports it (explorations/reviews/comprises-type-level-judgement.md section 2, its note on batch N; PLAN item 26, not decided, its option 1 batch 7b's default). Answer 8 (2026-09-26): a call over mixed widths infers the narrowest type both sides convert into, ZZ64 for ZZ32 with NN32 though neither argument is a ZZ64; ZZ64 does not convert into RR64. Under Q1 = (1): a type parameter that only numerals fix, whose bound IntLiteral does not meet, takes ZZ32 (or ZZ64 or ZZ for a numeral whose value ZZ32 cannot hold, where the value is at hand), and a call whose declarations each take a numeral only by coercion, none most specific, takes the ZZ32 declaration. A size used as a value (POSITIONS 2026-09-28, 19:17 UTC, item 25): it converts to ZZ32 as a numeral does; the checker already types it as a numeral (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:67-68, row 485), and the rule converts it as one. Answer 12 (2026-09-26): a size the call cannot fix stays refused at the call (batch 6's rung R, in checkApplication). Not this rung's: walk (rung K); the one library's numeral (rung Q, run 2); a type parameter that only the result mentions, which stays BottomType (rows 425 and 447; 447's candidates are Pavol's), and the solver that binds it (Formula.scala), whose two behaviours this rung records; the other places the expected type is dropped (measurement D section 1.3).",
"",
"**What the tree and the team already do.** Evidence, not the brief; the rung lists every way before it chooses.",
"- The shadow (explorations/reviews/inference-rule-shadow.md, section 1; explorations/reviews/inference-rule-shadow/rule.patch) is one way, measured: measurement D's four one-token edits in Operators.scala; in Functionals.scala, a call's candidates tried by subtyping with the expected type, then with coercion, then without the expected type, the last kept only when the most specific candidate's result converts to the expected type; a method checkApplicableWithCoercion that infers from the positions whose declared types mention a static parameter other than as the whole type, chooses for a lone type parameter the narrowest of its arguments' types and its bound, and admits every argument by subtyping or by a coercion built as checkApplicableWithoutInference builds one; and a union bound to a lone parameter replaced by its narrowest member when every argument converts into it. It left the solver, the coercion oracle and the library alone. What it did not build: a type neither argument's (ZZ32 with NN32), Q1's default, the ranking the conversion rule asks for, the ambiguity check, and any change for a structured position or a result-only parameter.",
"- The fork, measured (explorations/reviews/before-n-questions.md appendix A.1, the shadow's build and stock, explorations/reviews/before-n-questions/fork/): OpAnyZW's op(z, w), op[\\T extends Number\\](a: T, b: T) beside op(a: Any, b: Any), prints op generic[ ZZ32 , ZZ64 ] on stock and op plain[ ZZ32 , ZZ64 ] under the shadow; with two ZZ32s both keep the generic. The conversion rule makes it op generic[ ZZ64 , ZZ64 ]. No test, demo or microGPT call reaches the shape (explorations/compile-ladder/plan-n/probe-k/PROBE-K.md:11, :17; before-n-questions.md A.3).",
"- The judgement's programs, run on stock, the shadow's build and a build of the other reading (explorations/reviews/option-2-soundness/, summary.txt, opt2.patch): O2Z64 crashes on stock and prints plain64 for op(z, w) once the call is typed at ZZ64; O2Num's op(1, w) prints generic[ IntLiteral , ZZ64 ] on stock; O2Meet prints the meet declaration and O2Pos prints plain for gg(5, w) and 2 for ee(5) on stock and on the shadow's build, and the build that exempts every coercion of a generic candidate flips gg(5, w) to the generic, which the conversion rule forbids (option-2-soundness.md section 5).",
"- The team's pieces: checkApplicableWithoutInference builds coercions for a non-generic candidate (Functionals.scala:279-341); the coercion oracle answers substitutableFor and buildCoercion (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:118, :141) and finds the coercions into a target, not out of a source (getCoercionsTo, :85-115; a trait type only, :92); the trait table can be iterated (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:99-110), which is what a lookup from a source to its targets needs; the solver's own heuristic extension tries a single lower bound's ancestors (Formula.scala:528-541); Steele's comments at STypesUtil.scala:1002-1003 on BottomType as an upper bound. The team's intent, in commented-out text: \"a variant of local type inference is used by the type checker to infer instantiations of polymorphic function applications\" (Papers/Types/discussion.tick:7); and in 2009 \"ZZ32 now coerces IntLiteral as described in the spec ... as we gradually migrate to a flat numeric hierarchy\" (128f313b5).",
"- Row 488 and its probe (explorations/reviews/row-488-probe.md): the checker's errors in big operators' bodies over the one library move with what the checker queried earlier in the run (explorations/reviews/batch-7C-review.md finding 4). With the trait table's clause cache (TraitTable.scala:81-97) off, the distance stage gives the landed 626 errors and the count stage the landed 75, site for site and line for line, so the memo is not the cause: this rung owes row 488 nothing for it, may edit TraitTable.scala for its lookup and leaves the memo on. The effect is real, deterministic and caused by the hierarchy pass's extra queries, and this rung adds subtype queries of its own, so after its edit a move in the distance stage's BR family (the big operators' reductions, the sites of row 488 among them, Library/FortressLibrary.fss:1535, :304, :314) or its neighbours is read as the edit's until shown otherwise; the control on file is the one row 488's skeptic ran, the stage on a build with the edit's queries removed and its verdicts kept (explorations/compile-ladder/rung-comprises-checker/probes/skeptic/distance-attribution.txt).",
"- Peers: Java and Scala infer a generic method's type argument from the expected type as well as the arguments; Julia promotes mixed numbers to a common type; Haskell defaults an unresolved numeric literal; Java, C++, Swift and Julia run a declaration that needs no conversion before one that does (the judgement, section 1).",
"- The compiler tests pin one message a retry could change, XXX6bu's compile_err_equals: the shadow's first build kept the retry whatever the result and changed it; the condition on the result kept it (shadow section 1).",
"",
"**The test, first.** In ProjectFortress/compiler_tests/, each captured failing on the base and passing after, unless it is named a guard; the tie tests (the numeral tie's two cases and the refusal test below) are captured on the base in a suite-shaped run as well, several .test files in one JVM under the gate's seed as CompilerJUTest runs them, beside the one-file run, since batch 6.5's widen(0) pick differed between the two (explorations/reviews/batch-6.5-review.md finding 2 and its measure 1):",
"- The two expected failures the rule turns green, promoted: XXXNatLitArgChecker (row 401) and XXXCoercionGenericFnCompiledRungC (row 388's compiled half) become plain tests by git mv, each .test driving compile, link and run with run_out_contains=PASS. On the base the plain test fails at compile, which is the recorded failure; after the edit it passes. Left as they are they would go red, since the harness reports an XXX test whose program compiles as a wrong failure (FACTS.md, \"An XXX compile test pinned by compile_err_contains whose program compiles is reported as a wrong failure\"). XXXCoercionGenericFnCompiledRungC's own assertion then fails on the compiled path's spacing, \"gf got  2  and  two\" (row 76; shadow section 5), so its promoted form states what the call must return in a way both paths print alike, and its changed line is listed with its before and after.",
"- One new test of the rule's shapes, from explorations/reviews/inference-rule-shadow/probes/RuleCRun.fss (compiled and run under the shadow): row 401's shape with sizes; a numeral and a ZZ32 for a declared ZZ64 parameter of a generic; a lone parameter fixed by another argument (scale(b, 3), scale(b, z)); promotion (pick(z, l) a ZZ64); answer 8's ZZ32 with NN32 giving ZZ64; the expected type fixing a parameter (a: BoxT[\\ZZ64\\] = wrapT(3)); the retry (a: ZZ64 = idt(3)); a numeral tie the default settles, pickn(3) with pickn(x: NN32) declared before pickn(x: ZZ32) taking the ZZ32 declaration, where today the pick is not stable (above), and the library's own case of it over the compiler library, cast[\\ZZ64\\](widen(0)) as WitnessIdentityRungG wrote its ZZ64 branch before batch 6.5's repair (ZZ32's and NN32's widen both reached by the numeral's coercion, neither more specific; the checker took NN32's in the merged gate's suite and ZZ32's in a fresh compile of the same file, explorations/compile-ladder/climb-batch-6.5/JUDGE-review.md section 7, climb-batch-6.5/merged-review/witness-identity-gate.txt; row 391's note), which under the default takes ZZ32's and answers a ZZ64 0, the pick pinned; each asserting its value and, where the compiled path can show it, its type.",
"- Five tests of the conversion rule, from the judgement's programs (explorations/reviews/before-n-questions/fork/OpAnyZW.fss; explorations/reviews/option-2-soundness/O2Z64.fss, O2Num.fss, O2Meet.fss, O2Pos.fss), each driving compile, link and run under the compiler library and asserting its printed lines: OpAnyZW's op(z, w) prints generic[ ZZ64 , ZZ64 ]; O2Z64's op(z, w) prints plain64, which closes the stock crash's row the rung opens; O2Num's op(1, w) prints the generic at ZZ64; these three fail on the base (the stock lines above, O2Z64 by the crash). O2Meet's op(z, w) prints the meet declaration and O2Pos prints plain for gg(5, w) and 2 for ee(5): guards, passing on the base and after, against a ranking that exempts more coercions than the promotion's.",
"- A guard of the requirement that the check not refuse an unconverted tie, compiled and run under the compiler library: item 26's judgement's probe (explorations/reviews/comprises-type-level-judgement/probes/MeetViaExclusion.fss: trait S comprises { U, V }, trait T comprises { V } excludes U, V extends { S, T }, with f(S), f(T) and f(V), a set the checker accepts through the meet its normalizer finds, PASS compiled) with a trait G[\\X\\] extends { S, T } whose only extender is object H extends { G[\\ZZ32\\], V }, and the call f(g) for g: G[\\ZZ32\\] = H, whose static type sits between: it must compile and run f(V)'s body, by reading as the base does. The rung runs it on the base first; if the base refuses the program, the rung reports where and keeps the shape as a probe under probes/ with its capture.",
"- New XXX tests, pinned by compile_err_contains, of what the rule must still refuse: a narrowing, a: BoxT[\\ZZ32\\] = wrapT(l) with l: ZZ64 (shadow section 2.4); and a call the ambiguity check refuses, a non-numeral argument whose conversion targets are incomparable (the judgement's section 4, whose example, an NN32 against declarations at ZZ64 and NN64, holds in the one library; with the compiler library, whose ZZ64 declares no coercion from NN32 (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:147-149), two traits of the test's own that each declare a coercion from one source type and exclude each other), which today compiles by an unstable pick (above): row 391's shape (f(x: A), f(x: B), A and B coercing from N and excluding each other, f(NOf(1)) printing f(B) today where walk says \"Ambiguous coercion\"), which this test and the widen(0) case above close.",
"- Under the one library, where no program can yet be compiled: a probe under probes/, the shadow's RuleL.fss shapes, Q1's cases and the library's two numeral strides (SUFFIX_SUM's seq((|x| - 2):0:-1), Library/FortressLibrary.fss:4600, and seq((|a| - 1):-1:-1), Library/Shuffle.fss:23, whose -1 meets a parameter typed by I once a numeral is not a ZZ32; explorations/reviews/batch-7R-conformance.md finding 7) through the shadow's driver (explorations/reviews/inference-rule-shadow/check.sh) on the base's library and on a copy of it with the switch's library half (the plan-6.5 probe's explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch, carried to the base, as explorations/perf-probes/prelude/distance-triage/variants.py A0 applies it to the library of 2026-09-27), before and after (home 3, the record saying that no program compiles against the one library before the switch-over). Whether the rule takes each stride is reported for rung Q; if it does not, rung J's device, a ZZ32 strided form beside the generic one, is the library's way (the same finding).",
"- The solver's two behaviours, home 3: one probe program compiled against the compiler library on the rung's build, f[\\T\\](): T (bounded by Any) refused and f[\\T extends Object\\](): T accepted with T bound to Bottom (Formula.scala:492-493 against :524; explorations/reviews/batch-6b-7-conformance.md finding 5), its capture committed and cited by the row the rung opens, since the specification is silent (the inference chapter names it as not covered).",
"- The distance stage (explorations/coordinator/tools/distance/run.sh) and the checker-count stage after the edit, each through run_bg, captured as probes/distance-postedit.txt and probes/checker-count-postedit.txt; their before is the last landed gate's tables and its per-site list (below, \"The checker count\"), and compare.sh reads the two.",
"",
"**What it writes.** The checker change, the ranking and the ambiguity check among it; the tests and the probes; its report and record, which name every attempt's order and every choice with the ways not taken.",
"",
"**The measurements.** Every .fss file the gate's compiler tests compile or link (382 at the shadow's count), through the shadow's ctests.sh method, before and after, every file whose diagnostics change named with its cause (expected: the two promoted and the calls the ambiguity check refuses, each named); the 85 files of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt under the subset driver, phase and stdout, before and after; the compiler library's five components rebuilt in library order after the edit; the machine line on every capture.",
"",
"**What it clears.** Measured by the shadow on the library of 917bb7b32, before batch 7 (explorations/reviews/inference-rule-shadow.md):",
"- Probe programs: 375 error sites to 160 over five programs, three settings and two libraries, none new; 3 sites per run keep their refusal with the call's message instead of the binding's.",
"- Compiler tests: 2 of 382 files change, the two promoted; 469 errors to 466; every other file's diagnostics identical, XXX6bu's pinned message included.",
"- The distance on today's library: 1,736 to 1,385 under walk's setting and 1,748 to 1,401 under any, all of it the kept expected type's (340 natives, 10 fail calls); against measurement D's expected type alone, by site, only the run-to-run variation differs. On this batch's base batch 7's rung B has cleared those by its written bound (its branch: 1,747 to 1,337 under any), so by arithmetic this rung moves the distance by about nothing, and the coercion attempt and the promotion change nothing on today's library.",
"- On the switch's library copy: the switch's cost falls from 36 errors to 3 under any; microGPT's refusals at # from 13 to 2 and 11 to 2, none on the copy with ranges over ZZ32; row 401's shape accepted (five of five probe calls).",
"- Not measured by the shadow: ZZ32 with NN32; Q1's default; the conversion rule's ranking and the ambiguity check; the rule on the library of batches 7, 7R and 7C; code generation beyond RuleCRun and the compiler library's five components.",
"",
"**Files it may touch.**",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala: checkApplicable (:126), checkApplicableWithInference (:176), checkApplicableWithoutInference (:279) only if the coercion step shares it, the second checkApplication (the one taking iargs, :439, with the ambiguity check at :463), and new methods beside them. Not its SCaseExpr case (:817 on), batch 7R's rung J's site (J's edit at :15 and :871-881).",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala: the four cases of checkExprOperators named above.",
"- ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala: moreSpecificCandidate (:1068-1095), only as the ranking of a promoted candidate needs.",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala, and TraitTable.scala only if the lookup from a source to its coercion targets needs it.",
"- New and promoted files under ProjectFortress/compiler_tests/; its own directory.",
"- Not: ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java, whose copy the count stage checks, nor the files the distance stage patches as it runs (explorations/coordinator/tools/distance/shadow-patch.py, add-patch.py); the solver, Formula.scala; Library/, ProjectFortress/LibraryBuiltin/, interpreter/, Specification/.",
"",
"**Java or Scala.** Scala. ant compileAll, default_repository/caches/global.map restored after it (FACTS.md, \"ant compileAll deletes a tracked file\"), and the library-order cache rebuild before any compiled test (explorations/repo-internals.md).",
"",
"**The checker count.** Reported, not predicted: the ambiguity check can add errors where a call over the one library has no most specific declaration (row 484's MAX family among them, which rung M's declarations resolve in the same run), and each is named with its site. Before: the last landed gate's checker-count.txt and distance.txt with its per-site list distance-sites.tsv, the tables the gate itself compares against (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: batch 6.5's first run's climb-batch-6.5/gate/, count 75 and distance 626), not a run of the stages on the rung's unchanged base; after: captured on the rung's tree and declared with the distance stage's totals (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken; the intro says when the base has changed under the table).",
"",
"**What must stay green, or keep its verdict.** Every compiler test other than the two promoted, rung R's refusals (XXXNatUnknownSizeArm, XXXNatUnknownSizeVal, XXXNatUnknownSizeFnValue), XXX6bu and XXXCoercionAnyOverloadRungC (row 390, a plain declaration over Any taking a call a converted one would, which the conversion rule keeps) among them, and NatRtBigSize, where batch 6.5b's rung E and item 25 meet (section 4); the ladder's 85 files; the compiler library's rebuild.",
"",
"**Stops.**",
"- A compiled test's verdict changing other than the two promoted and the rung's own.",
"- A new checker error the distance stage shows as caused rather than unmasked, which the report does not account for.",
"- A ladder file moving down.",
"- A ranking that lets a declaration needing a conversion win over one that fits the call as it is (the conversion rule; O2Pos's gg(5, w) is the measured case).",
"- An edit to the solver, to StaticChecker.java or to a file the count or distance stage shadows; any library, walk or specification edit.",
"- A binding chosen for a type parameter that nothing at the call fixes other than today's (row 447's candidates are Pavol's).",
"- A line of explorations/run-c4/src/ or explorations/apl/mg/ (shown to Pavol as a diff first, POSITIONS 2026-09-19).",
"- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The two promoted tests and the three failing conversion-rule tests red on the base and green after, the two guards green on both; the shadow's probe programs (explorations/reviews/inference-rule-shadow/probes/, measurement D's DCtx, DArg, DMore, DComp) through the shadow's drivers against the rung's build, their error sites compared with the shadow's captures; the fork's shapes (OpAnyZW, OpAnyZZ) and answer 8's ZZ32 with NN32 and Q1's cases on the switch's library copy; the compiler tests' diagnostics; each error the ambiguity check adds, on the compiler tests and in the count stage's table, tied to its call, and the in-between call's guard compiled and run; the tie tests run in the suite's order under the gate's seed as well as alone (explorations/reviews/batch-6.5-review.md finding 2); the distance tables, each new site classified as unmasked or caused, a move in the BR family read as the edit's unless the control shows otherwise (row 488's probe); the compiled runs of the new test against walk on the same shapes where walk's library has them.",
"",
"**What comes back to Pavol.** The messages that changed; the attempts' order; how a promoted candidate is ranked; Q1's default as built; the lookup behind answer 8's promotion; the calls the ambiguity check refuses, by site.",
"",
"**What it closes.** Row 401 (fixed). Row 455 (fixed). Row 391 (fixed: the non-numeral tie refused as walk refuses it, the numeral tie settled by the default, both gated). Row 388's compiled half; the row closes with rung K. Opens and closes, home 1: the stock compiled crash on a promoted generic beside op(ZZ64, ZZ64) (its O2Z64 test). Opens, home 3: the solver's two behaviours for a result-only type parameter, refused under the bound Any and bound to Bottom under any written bound, with its probe's capture. Notes appended: to row 447, that the expected type kept at f(x) binds a result-only parameter to BottomType as before, measured; to row 485, that the checker types a size used as a value as a numeral and the rule converts it as one.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-27 numerics plans: The decision this batch builds, decision 3: inference with coercion and the promotion, the expected type kept at f(x) with a retry; quote it for every choice you report.",
"- positions:2026-09-28 two decisions of Fable's judgement: The conversion rule you build (decision 1): a declaration chosen on its declared types, then instantiated by the promotion; and row 484's library fix (decision 2); cite it wherever the rule decides a call.",
"- positions:2026-09-28 probe K's item 9: Pavol's principle behind the conversion rule, fast code a JVM can specialise, and his ask for one global rule; read it before you weigh a ranking.",
"- positions:2026-09-26 answer 8: Answer 8: the narrowest type every number argument converts into, ZZ64 for ZZ32 with NN32, and ZZ64 into RR64 kept explicit; your promotion's number case.",
"- positions:2026-09-26 answer 9: Answer 9: declarations compared on their quantified types, inference instantiating the chosen one; the order the conversion rule takes.",
"- positions:2026-09-27 numeral's type: Pavol's decision that a numeral has its own type, IntLiteral, converting into each number type; the switch run 2 builds and the reason Q1 arises.",
"- positions:2026-09-24 exclusion route rung P's fork: Route A: each number type carries its own algebra and converts from the narrower ones by coerce; the tower your rule converts within.",
"- positions:2026-09-19 answering the open question: The library's own practice is the standard: a device the library already uses beats a new one; name the precedent for each choice.",
"- positions:2026-09-21 library route: The library route: the compiler library is not edited, and it is the model the one library takes.",
"- positions:2026-09-26 answer 12: Answer 12: a size the call cannot fix is refused at that call, rung R's code in checkApplication, the method you edit; keep its three refusals.",
"- positions:2026-09-28 size used as a value: Pavol's decision on item 25: a size used as a value converts to ZZ32 as a numeral does; the checker already types it IntLiteral, so your rule converts it as one.",
"- positions:2026-09-22 a design principle: The JVM principle, Java's default where it makes sense: the ground on which Q1's default, ZZ32 for a numeral nothing else fixes, is read.",
"- positions:2026-09-22 on planning: Pavol's rule that a fork a probe can settle is probed first; probe K settled this batch's, so cite its result and do not re-measure it.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your count's and distance's before: the last landed gate's tables and its distance-sites.tsv, not a run of the stages on your unchanged base; capture only the after.",
"- positions:2026-09-27 launch of phase 3's batches: The standing go for phase 3's batches; it launched this run, and nothing in it is yours to re-ask.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- ledger:401: Row 401, a numeral for a declared parameter of a generic, the shape of microGPT's heads; you fix it and promote its expected failure.",
"- ledger:388: Row 388, a narrower type for a declared parameter of a generic; you fix its compiled half and promote that expected failure.",
"- ledger:455: Row 455, the expected type dropped at f(x); you fix it with the retry the decision names.",
"- ledger:447: Row 447, a result-only type parameter bound to Bottom; not yours to change, a note appended that your rule leaves it so.",
"- ledger:484: Row 484, b MAX 1 tied under walk; your ambiguity check meets the same tie on the checker, which rung M's declarations resolve in this run.",
"- ledger:485: Row 485, whether a nat parameter may be a component of a range; Pavol settled it, and your rule converts a size value as a numeral.",
"- ledger:488: Row 488, checker errors that move with earlier queries; its probe cleared the clause cache, so a BR-family move after your edit is read as yours.",
"- ledger:390: Row 390, XXXCoercionAnyOverloadRungC: a plain declaration over Any beats a converted one; it stays an expected failure under your ranking.",
"- ledger:391: Row 391, two declarations reached only by coercion, neither more specific: your ambiguity check refuses the non-numeral call and the default settles widen(0); your two tests close it.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule: The rule stated for the specification: resolution, then instantiation, then dispatch, the numeral tie; build the checker's half exactly as stated.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#4. Q1's default: Q1's default as the tie rule for a numeral alone, and where it applies: the ambiguity check you build at Functionals.scala:463.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order: Your amendments listed: the promoted candidate kept in the first attempt, the ranking, the ambiguity check and the five tests.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#7. The findings that stand under every way: The stock compiled crash your O2Z64 test closes, and the ambiguity check the specification assumes.",
"- doc:explorations/reviews/before-n-questions.md#A.1 What was run for question A, and why: The fork run on both shadows: both took the plain arm; your ranking must take the generic at ZZ64 instead.",
"- doc:explorations/reviews/before-n-questions.md#A.2 Why the checker's shadow takes the plain arm: Why the shadow lost the generic: moreSpecificCandidate ranks a coercion-free candidate first; the test you change.",
"- doc:explorations/reviews/option-2-soundness.md#2. Static and dynamic agreement: What the compiled dispatcher does after your static choice: O2Z64 dispatches to plain64, O2Wide splits from walk; the lines your tests assert.",
"- doc:explorations/reviews/option-2-soundness.md#5. Numerals and rung Q: The numeral cases of the rule, O2Num and O2Pos, and why a looser exemption flips gg(5, w); your guards.",
"- doc:explorations/reviews/inference-rule-shadow.md#The answers: The shadow's measured answers, the one way already built; list it among your ways with its numbers.",
"- doc:explorations/reviews/inference-rule-shadow.md#1. The edit: The shadow's edit: the attempts' order and checkApplicableWithCoercion; a starting point, not the answer.",
"- doc:explorations/reviews/inference-rule-shadow.md#2. The probes: The probe programs and their error sites; your skeptic compares your build's sites with these.",
"- doc:explorations/reviews/inference-rule-shadow.md#3. microGPT and row 401: MicroGPT's refusals and row 401's shape on the switch's library copy; the one-library probe you rerun.",
"- doc:explorations/reviews/inference-rule-shadow.md#4. The distance: The shadow's distance numbers, all the expected type's; by arithmetic your rung moves the landed distance by about nothing.",
"- doc:explorations/reviews/inference-rule-shadow.md#5. The compiler's tests: The compiler tests' diagnostics under the shadow, 2 files changed; your measurement's baseline and its method.",
"- doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets: What the rule leaves out and the forks: stay inside it, and report any fork you meet rather than choose it.",
"- doc:explorations/reviews/inference-rule-shadow/rule.patch: The shadow's code; read it before you write yours, and say where yours departs from it and why.",
"- doc:explorations/reviews/inference-rule-shadow/probes/RuleCRun.fss: The compiled probe of the rule's shapes; your new test grows from it.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#3.2 How a static argument is inferred: How the checker infers today, with citations; the code you change.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#3.3 Whether the expected type is used: Where the expected type is dropped, f(x) among them; the four sites of measurement D.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#3.4 Whether a coercion is considered while solving: Why the solver never converts, and why the rule adds an attempt beside it rather than editing it.",
"- doc:explorations/reviews/numerics-plan-coordinator/measure-D.md#2.2 What else the kept context changes: What keeping the context changes on its own, a result-only parameter bound to Bottom; why the retry exists.",
"- doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The checker's solver treats a parameter bounded by: The solver's two behaviours for a result-only parameter; you record them with a probe's capture and open their row.",
"- doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value: Why a size used as a value is typed as a numeral by KindEnv; your rule converts it as one.",
"- doc:explorations/reviews/batch-7R-conformance.md#Findings@The one library writes two numeral strides: The library's two numeral strides; your one-library probe shows whether the rule takes each.",
"- doc:explorations/reviews/row-488-probe.md#What it means for batch N's rung I: Row 488's probe for you: the memo is not the cause, you may edit TraitTable.scala, and a BR-family move after your edit is yours until the control shows otherwise.",
"- doc:explorations/compile-ladder/climb-batch-6.5/JUDGE-review.md#7. For Pavol, out of the loop: The compiled prelude's widen(0), whose pick between ZZ32's and NN32's widen varied from run to run; your test of the numeral default pins it to ZZ32's.",
"- doc:explorations/reviews/batch-6.5-review.md#Findings@Batch N's rung I describes the numeral tie wrongly: Why a tie's base failure is captured in a suite-shaped run as well as alone: the pick differed between the gate's suite and a fresh compile.",
"- doc:explorations/reviews/batch-6.5-review.md#Findings@Batch 6.5b's half of the record predates item 25: Where item 25 meets batch 6.5b's rung E, NatRtBigSize's sizes read back into ZZ64; if 6.5b landed before you, report what your conversion makes of its lines.",
"- doc:explorations/reviews/comprises-type-level-judgement.md#2. What was checked, and what was measured: Item 26's judgement, its note on batch N: your ambiguity check must not refuse the unconverted tie of a call whose argument's static type sits between.",
"- doc:explorations/reviews/comprises-type-level-judgement/probes/MeetViaExclusion.fss: The set the checker accepts through a comprises meet; your guard test adds G, H and the in-between call f(g) to it.",
"- doc:Specification/basic/inference.tex: The chapter rung T writes, today notes; what the specification says of inference, nothing yet.",
"- doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion: Applicability by substitutability, the specification's definition your coercion attempt implements.",
"- doc:Specification/basic/conversions-coercions.tex#Coercion Resolution: The order of choice: a declaration applicable without coercion first; the order your ranking keeps.",
"- doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls: Applicability to a named call, with its static arguments inferred; the text your change must agree with.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def checkApplicable(preCandidate: PreAppCandidate,..def checkApplicableWithoutInference(: The applicability methods you edit, with the coercion builder for a plain candidate you can share.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#Type check the application of the given arrow candidates to the given args: checkApplication, the sort and the comment at :463 where the ambiguity check goes; rung R's refusal lives here too.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def moreSpecificCandidate: The ranking whose coercion-first test you leave the promotion's coercion out of; the team's code, changed as little as the rule needs.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(info, multi, infix, front::rest, true, true): The tight juxtaposition's cases where f(x) drops its expected type; the four one-token edits.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def inferStaticParams(fnType: ArrowType,: The inference by subtyping you add coercion beside; not the solver, which is a stop.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala#def getType: The checker's type for a size used as a value, IntLiteral, as Pavol's item 25 decision reads it; unchanged.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala#def getCoercionsTo(uu: Type): The lookup from a target to its sources; the reverse lookup the promotion needs goes beside it.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala#def substitutableFor(t: Type, u: Type): Substitutability as the checker answers it; your admission of an argument uses it.",
"- code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends: The compiler library's numeral type, a sibling converting into each integer type; the one your compiled tests run against.",
"- code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral extends: The one library's numeral type today, below ZZ32; what the checker sees in the count and distance stages until run 2.",
"- doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.fss: Row 401's expected failure; you promote it by git mv once it passes.",
"- doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.test: Its .test, pinned by compile_err_contains; the promoted one drives compile, link and run.",
"- doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.fss: Row 388's compiled expected failure; you promote it, restating its line for row 76's spacing.",
"- doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.test: Its .test file; the promoted one drives compile, link and run.",
"- doc:ProjectFortress/compiler_tests/NatRtBigSize.fss: The test where item 25 meets batch 6.5b's rung E: sizes read back as values into ZZ64; it keeps its verdict, and a change there is a reserved stop, reported with the reading you followed.",
"- Static arguments are inferred from the arguments alone, on both paths: The fact your rung changes on the checker's side; cite it with its measurements.",
"- Keeping the expected type at a call written: Measurement D's four edits and why they bind Bottom alone; the retry's reason.",
"- A numeral's type depends on the path and on the library in scope: Why IntLiteral differs by library; your compiled tests use the compiler library's.",
"- An inferred generic refuses a coercion that the method it forwards to accepts: The container shape scale(b, z) your rule accepts; one of your test's cases.",
"- MicroGPT's own programs through the compiled checker against the one library: MicroGPT's refusals on the checker; your rule's effect on them is measured on the switch's library copy.",
"- The specification never wrote static-argument inference: Why the chapter is empty; rung T writes it from your rule.",
"- The true distance to the switch-over: What the distance stage counts; read it before you classify a moved site as caused or unmasked.",
"- The compiled checker refuses a call whose most specific arm has a size the call cannot fix: Rung R's refusal in checkApplication, which your ranking must keep.",
"- The compiled type checker checks nat and int static parameters: How sizes are checked, so that your promotion leaves a size argument alone.",
"- An XXX compile test pinned by compile_err_contains whose program compiles: Why the two XXX tests go red once your rule passes them: promote both.",
"- The XXX expected-failure mechanism in compiler_tests: How an XXX compile test is read; your two new refusal tests use it.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll, or the linker's state is lost.",
"- The checker-count stage's table: What the count stage's rows mean; tie each moved row to your edit.",
"- map:compile-path-walkthrough.md#How it walks the tree: How the checker walks the tree, so that your edit lands at the right node.",
"- map:README.md#Touch this@scala_src/typechecker: What else moves when you touch the checker; check each before you report.",
"",
].join('\n')

const K_TAIL = [
"",
"## Your rung: K - inference with coercion in walk",
"",
"SLUG is rung-inference-walk. WORKTREE is /home/user/fortress-walkinfer, branch wip/rung-inference-walk.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-N.md, section 3, under \"K. Inference with coercion in walk\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** None of section 1's question changes this rung: walk's numeral is a ZZ32, ZZ64 or ZZ until rung Q, so Q1's cases do not arise under walk in this run, and Q builds walk's default in run 2.",
"",
"**Its briefing.** The decisions (the numerics plans, the two decisions of the conversion judgement, probe K's item 9, answer 8, answer 9, a numeral's type, a size used as a value, route A, the library's practice, rung C's held push and batch 5's masks, the probe rule, the launch of phase 3's batches, the stops, rung D's stop); ledger rows 388, 389, 432, 364, 430, 486 and 390; the conversion judgement's rule, its section on walk at run time and where it lands; the fork's measurement and the soundness note's section on the static and dynamic choice; probe K's forks; the shadow note's answers, its section on what walk would need and its forks, with the one-shape walk program; evidence B's sections on walk's inference, rung C's coercion at a generic callee and how the three interact; rung C's report on what changed and its decisions; the batch 7R judge's ruling that left row 486's test to this rung, and the probe that measured it; the specification's sections on applicability with coercion, coercion resolution and applicability to named calls; walk's inferAndInstantiateGenericFunction, bestMatchWithCoercion, bestMatchInternal, coercionFor, typecheckParams and FType.join; the two expected failures it promotes, the test form and the helper that shows a value with its type; the FACTS entries on walk's coercion, inference, the refused container shape, a numeral's type, the flat tower and the harness; the map's interpreter row. The keys are in section 7, each with its reason at the end of the tail; checks is the decisions, rows 388, 389, 432 and 486, the judgement's section on walk, the shadow's walk section, coercion resolution, the three walk methods, rung C's entry and the harness entry on an XXX test.",
"",
"**The problem.**",
"- Walk infers a generic's static arguments in EvaluatorBase.inferAndInstantiateGenericFunction (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:50-251): it unifies every argument's run-time type with its declared parameter type, whether or not that type mentions a static parameter, before any conversion (:131-181), and joins two lower bounds to a common supertype (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:350-380). So gf(NarrowOf(2), \"two\") is refused, \"Cannot unify NarrowOf ... with Wide\" (row 388), scale64(BoxT[\\String\\](2), 3) is refused, \"Cannot unify Int ... with FortressLibrary.ZZ64\", and scale(b, z) for b: Box[\\RR64\\] instantiates T at Number and fails, \"Unification error: ... (b:Box[\\Number\\]) got arg Box[\\RR64\\]\" (FACTS.md, \"An inferred generic refuses a coercion that the method it forwards to accepts, on both paths\"). A call over mixed widths converts nothing: same(z, w) runs with T a common supertype and its arguments unconverted, where answer 8 names ZZ64.",
"- Rung C's coercion pass for an overloaded call skips every generic declaration (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:826, if (sfn instanceof GenericFunctionOrMethod) continue;), so a generic declaration is never chosen by coercion.",
"- A declaration chosen by bestMatchInternal's subtyping pass (OverloadedFunction.java:856-895) keeps the instance today's inference gives it, the join, and converts nothing: OpAnyZW's op(z, w) prints op generic[ZZ32,ZZ64] (explorations/reviews/before-n-questions/fork/OpAnyZW.walk-stock.txt). Probe K's shadow, whose inference moved the promoted generic out of that pass, ran the plain declaration instead, op plain[ZZ32,ZZ64] (OpAnyZW.walk-apply.txt), the reading the conversion rule does not take.",
"- A generic trait's coercion is not applied: Coercions.coercionFor instantiates the target's lifted coercion from the value alone, before the target's static arguments are known (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:48-71, :59; row 389).",
"- Walk refuses a nat parameter used as a value at an NN32 binding: u: NN32 = n with nat n = 3 stops, \"RHS expression type Int is not assignable to LHS type NN32\", where the compiled run prints 3 (row 486; explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkNatType.fss). No test holds it: batch 7R's rung U could add none, and its judge left the test to this rung, the next that may edit ProjectFortress/tests/ (explorations/compile-ladder/climb-batch-7R/JUDGE-review.md section 5).",
"",
"**The decisions.** The numerics plans, decision 3 (explorations/coordinator/POSITIONS.md, 2026-09-27): \"walk does the same at dispatch\" as the checker, inference with coercion and answer 8's promotion. The conversion rule (POSITIONS 2026-09-28, the two decisions of the conversion judgement, decision 1; the judgement's section 3, taken as its default and listed for Pavol's review): walk chooses the declaration on the domains it compares today, the join instantiation, until batch 7b's rung W compares declared domains; it then re-instantiates the chosen generic by the promotion from the arguments' run-time types and converts at binding; it does not instantiate without conversion. So bestMatchInternal's choice stays as it is, its code unchanged, and the winner is re-instantiated before application: the one edit to bestMatchInternal this rung may make, reported. The coercion pass keeps generic declarations, for the calls no declaration takes unconverted. Where a static type is wider than its value, the paths then run the same body at different instances (O2Wide: compiled op(n, w) at Number, walk at ZZ64): recorded, not a stop, a row the gather opens. Answer 8 (2026-09-26): the narrowest type every number argument converts into, ZZ64 for ZZ32 with NN32. Walk has no static context, so the checker's expected type has no counterpart; a typed binding already converts after the call (Coercions.coerceToDeclared, Coercions.java:124). A size used as a value (POSITIONS 2026-09-28, item 25): it converts as a numeral does, so row 486's binding is to answer 3, the home-2 test this rung owes; its repair is rung Q's switch, or later, as probe Q measures. Not this rung's: the numeral's run-time type and walk's numeral default (rung Q, run 2); walk's conversion at a declared return type (row 387, rung Q); how walk compares a generic declaration with a plain one on declared domains, its load-time check and the dispatch of a converted call again (batch 7b's rung W, answer 9: O2Z64's set is refused at load today, OverloadedFunction.java:527); a generic method's own static arguments (row 21).",
"",
"**What the tree and the team already do.** Evidence, not the brief; the rung lists every way before it chooses.",
"- The shadow's reading of walk (explorations/reviews/inference-rule-shadow.md section 6, not built): three places. The argument loop of inferAndInstantiateGenericFunction split in two passes as the checker's edit splits the positions: first unify only the arguments whose declared type is not a type parameter alone; then, for a lone parameter the first pass fixed, leave its arguments to the binding's conversion; for one nothing fixed, try its arguments' run-time types and its bound and keep the narrowest each argument matches (typeMatch) or converts into (Coercions.coercionFor(t, a) != null). In OverloadedFunction.bestMatchWithCoercion (:821-852), instantiate a generic declaration by that inference and build its per-argument coercions against the instantiated domain, as :829-837 builds them for a plain one. In Coercions.coercionFor, instantiate a generic target's lifted coercion with the target's static arguments first, as the checker does (\"the lifted args are given in U\", ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:193-196).",
"- The admission half exists: an instantiated function's arguments are converted at binding by rung C's Coercions.coerce in NonPrimitive.buildEnvFromParams and typecheckParams (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/NonPrimitive.java:134-185, :212-257), reached from FunctionClosure.applyInnerPossiblyGeneric; a generic that is not overloaded is applied through GenericFunctionOrConstructor.applyInnerPossiblyGeneric (evaluator/values/GenericFunctionOrConstructor.java:50-57), whose instantiated closure converts at binding, so place 1 serves it.",
"- Walk's run-time types are the implementation objects under the library's traits (Int, Long, BigNum, Float, NN32), not the traits: SUM <|1, 2, 3|> fails because Int is not an AdditiveGroup[\\Int\\] (row 432), and the checker's solver meets the same case with its ancestor heuristic (Formula.scala:528-541). How a choice among a lone parameter's candidates reads an argument's type is the rung's to decide and report.",
"- The one-shape walk cases, each with its capture (explorations/reviews/numerics-plan-fable/probes/one-shape/walk/: ScaleZ, Scale3, SameZW, SameZR, LohiZW, LohiZU, AddZW, AddZR, SumLit), as one program in explorations/reviews/inference-rule-shadow/probes/OneShapeW.fss.",
"- The judgement's programs under walk (explorations/reviews/option-2-soundness/summary.txt): O2Wide and O2Lone, a static type wider than its value, both modes of probe K's shadow; O2Meet and O2Z64 refused at load in both (\"at least one pair of parameters must have excluding types\"), batch 7b's rung W's.",
"",
"**The evidence on file.** Probe K's measurement (section 6), a logging shadow of the three places over every file of ProjectFortress/tests/, the demos and the two microGPT checks, printing each call whose chosen declaration, inferred static arguments or converted arguments change (explorations/compile-ladder/plan-n/probe-k/PROBE-K.md, 2026-09-28, measured on main at 158aa7dce, batch 7 landed and batch 7R not; the shadow shadow.patch, the captures under captures/). Four distinct calls change in the 422 tests, and none in the 62 demos (each cut at 120 s) or in either microGPT check: row 388's gf(NarrowOf(2), \"two\") (XXXCoercionGenericFnRungC.fss:25; refused today, T = FlatString with the first argument converted under the rule) and row 389's coercion to WideG[\\ZZ32\\] (XXXCoercionGenericTraitRungC.fss:25), both then printing PASS, the only two verdicts that change; commonSuper.fss:32's f(13.0, 5), A = Number today and RR64 under the rule, so the test prints 5.0 and 35.0 for 5 and 35 (answer 8; the test checks nothing and keeps its verdict); and bounded1Range behind XXXRangeSizeZZ64RungO.fss:10, I = AnyIntegral today and ZZ64 with the dummy ZZ32 converted, its output unchanged, a call batch 7R removed (the test is RangeSizeRungO.fss since, restated to a ZZ32 shape, 3be1fecd7). No overloaded call changes its declaration in the corpus. Both microGPT checks pass 40 of 40, every printed value unchanged. Beyond these, only the tree's own run-to-run variation (17 tests) and row 430's overload-listing order (XXXInheritedOverload, XXXCoercionTupleOverloadRungC, which the shadow's extra types move) differ; so the comparison expects the three changed outputs and nothing else. The two forks probe K found outside the corpus are settled: the promoted generic beside a plain declaration applicable by subtyping (PKOpZW) runs the generic at ZZ64 under the conversion rule, walk and the checker alike, where both shadows took the plain one when the call was run (probe K had read the checker's shadow the other way; explorations/reviews/before-n-questions.md appendix A.1); the re-instantiation reaches no call probe K's corpus holds, since that fork is the one shape it changes (PROBE-K.md:11, :17; the judgement's section 5, \"No probe first\"); and the range over NN32 through the factories' dummy argument is gone with batch 7R. No question for Pavol from the corpus.",
"",
"**The test, first.** In ProjectFortress/tests/, each captured failing on the base and passing after, unless it is named an expected failure:",
"- The two expected failures promoted by git mv to plain names: XXXCoercionGenericFnRungC.fss (row 388's walk half) and XXXCoercionGenericTraitRungC.fss (row 389). Each fails on the base as a plain test and passes after; left as XXX files they would go red once they pass (FACTS.md, \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\").",
"- One new test in the form of ProjectFortress/tests/roundBug.fss, each assertion's message citing its source, each value shown with its type as ProjectFortress/tests/IntSemanticsRungI.fss's zz32Shown shows it: scale(b, z) and scale(b, 3) for b: Box[\\RR64\\] (T = RR64, the argument converted); same(z, w) and sameAdd(z, w) (ZZ64, both converted); same(z, r) (RR64); lohi(z, w); twice(l, z) with T extends Integral[\\T\\] (ZZ64); pick(z, u) with u: NN32 (ZZ64, answer 8); pick(l, r) with l: ZZ64, r: RR64 (no promotion, as answer 8 keeps ZZ64 into RR64 explicit); an overloaded generic chosen by coercion; and the conversion rule's shape, OpAnyZW's op(z, w) (explorations/reviews/before-n-questions/fork/OpAnyZW.fss) printing op generic[ZZ64,ZZ64], the generic chosen and then re-instantiated, where the base prints op generic[ZZ32,ZZ64].",
"- Row 486's owed test, home 2: XXX-named, u: NN32 = n for a nat n = 3 answering 3, as the specification (Specification/basic/trait-parameters.tex:83-86) and Pavol's decision on a size used as a value give; it fails today with walk's message, which is what the gate expects of it, and it is written in this batch because this batch measures the row's context (explorations/coordinator/climb-batch-workflow.md, the three homes). Rung Q promotes it if its switch repairs the binding.",
"- The split the conversion rule leaves where a static type is wider than its value: O2Wide and O2Lone (explorations/reviews/option-2-soundness/) run under the rung's build, captured under probes/ with the compiled lines from summary.txt, for the row the gather opens (home 3: the specification resolves coercion statically, Specification/basic/conversions-coercions.tex:598-605, and walk has only run-time types; the judgement took walk's promotion as its default).",
"",
"**The comparison.** As batch 6b's rung O's (explorations/compile-ladder/rung-walk-overflow/count-run.sh, count-compare.py): every file of ProjectFortress/tests/ except the new tests, in three passes, base A, the edit, base B, one JVM per test with private caches, normalised as batch 5 normalised, XXXInheritedOverload.fss listed as unstable (row 430); every changed output listed with its call, the declaration or static arguments that changed and the specification's answer, against probe K's list. The two microGPT checks from an empty cache at FORTRESS_THREADS=1, 40 of 40 with their printed values unchanged. The demos under ProjectFortress/demos/, one pass before and one after, each run cut at 120 seconds, outputs compared. The machine line on every capture; each pass's caches deleted once its outputs are captured, and df read before each pass.",
"",
"**What it clears.** Rows 388's walk half and 389, by their tests. Probe K gives the changed outputs; the re-instantiation's shape reaches none of its corpus.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java (inferAndInstantiateGenericFunction); ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java (bestMatchWithCoercion and what it calls, and in bestMatchInternal the re-instantiation of the declaration its subtyping pass chooses, reported; not bestMatchInternal's comparison or the load-time check, which are batch 7b's rung W's); ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java (coercionFor); ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java only if the promotion's lookup needs it; the promoted and new tests; its own directory. Not: interpreter/glue/prim/, FIntLiteral.java and the return check of Simple_fcn.java (rung Q's, run 2); the library; the checker; the specification.",
"",
"**Java or Scala.** Java. ant compileAll before the tests can pass, default_repository/caches/global.map restored after it, the interpreter's caches wiped before every run.",
"",
"**The checker count.** Unchanged: the stage reads neither the interpreter nor the tests, and the manifest predicts the last landed total. Before: the last landed gate's checker-count.txt (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: climb-batch-6.5/gate/, 75), not a run of the stage on the rung's unchanged base; after: the count stage captured on the rung's tree; the distance stage not run, since the rung edits nothing it reads (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken).",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict other than the two promoted; the library loads under walk; CoercionRedispatchRungC.fss, CoercionOverloadRungC.fss (its p(NarrowOf(1)) prints p(Any): a plain declaration over Any that fits beats one that needs a conversion), CoercionMostSpecificRungC.fss and the other rung C tests; FlatTowerRungF.fss; the two microGPT checks at 40 of 40 with unchanged values.",
"",
"**Stops.**",
"- A changed output or exit code that the comparison does not account for as a call whose inference changed as the decision gives.",
"- A changed value printed by either microGPT check.",
"- An overload set of the library or of a test that walk loads today and refuses after, or the reverse.",
"- An edit to bestMatchInternal beyond the re-instantiation of the declaration its subtyping pass chooses, or to the load-time check, unreported; any edit under interpreter/glue/prim/, to FIntLiteral.java, or to the library, the checker or the specification.",
"- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop). Nor the instance split where a static type is wider than its value (O2Wide), which the decision takes and the gather records.",
"",
"**For the skeptic.** The differential is walk against the compiled run on the one-shape shapes, RuleCRun's and the new test's, with rung I's checker where the compiler library has the shape; OpAnyZW on both paths (the generic at ZZ64); each changed output against probe K's list and its stated cause; the two promoted tests red on the base; row 486's test failing for the reason its message gives; the O2Wide capture against the compiled lines; the microGPT checks' values; the load-time verdicts before and after.",
"",
"**What comes back to Pavol.** The changed outputs with their causes; any microGPT value that moved; how a lone parameter's choice reads a run-time type; the edit to bestMatchInternal; the instance split where a static type is wider than its value.",
"",
"**What it closes.** Row 389 (fixed). Row 388's walk half; with rung I the row closes. Row 486's test, home 2, the row left open. A note appended to row 432 with what the rung found at a structured position. The gather opens the row for the instance split from the rung's capture.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-27 numerics plans: The decision this batch builds, decision 3: walk does the same at dispatch as the checker; quote it for every choice you report.",
"- positions:2026-09-28 two decisions of Fable's judgement: The conversion rule, decision 1: walk re-instantiates the declaration it chose by the promotion from run-time types; the one bestMatchInternal edit you may make.",
"- positions:2026-09-28 probe K's item 9: Pavol's principle behind the conversion rule, fast code a JVM can specialise, and his ask for one global rule; read it before you weigh a ranking.",
"- positions:2026-09-26 answer 8: Answer 8: the narrowest type every number argument converts into, ZZ64 for ZZ32 with NN32, and ZZ64 into RR64 kept explicit; your promotion's number case.",
"- positions:2026-09-26 answer 9: Answer 9: batch 7b's walk rung compares on declared domains after you; your edit stays out of bestMatchInternal's comparison.",
"- positions:2026-09-27 numeral's type: Pavol's decision on a numeral's type; walk's numeral stays a ZZ32 in this run, so Q1 does not arise for you.",
"- positions:2026-09-28 size used as a value: Pavol's decision on item 25: a size used as a value converts as a numeral does, so walk's refusal of u: NN32 = n is the defect your XXX test records.",
"- positions:2026-09-24 exclusion route rung P's fork: Route A: each number type carries its own algebra and converts from the narrower ones by coerce; the tower your rule converts within.",
"- positions:2026-09-19 answering the open question: The library's own practice is the standard: a device the library already uses beats a new one; name the precedent for each choice.",
"- positions:2026-09-26 climb batch 4's held push: Rung C's held push and the masks: Java line numbers and identity hashes are masked in every comparison you run.",
"- positions:2026-09-26 climb batch 5 (coordinator: Batch 5's comparison masks, its Q2; your corpus comparison normalises the same way.",
"- positions:2026-09-22 on planning: Pavol's rule that a fork a probe can settle is probed first; probe K settled this batch's, so cite its result and do not re-measure it.",
"- positions:2026-09-27 launch of phase 3's batches: The standing go for phase 3's batches; it launched this run, and nothing in it is yours to re-ask.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- ledger:388: Row 388, gf(NarrowOf(2), \"two\") refused; you fix its walk half and promote its expected failure.",
"- ledger:389: Row 389, a generic trait's coercion not applied; you fix it in coercionFor and promote its expected failure.",
"- ledger:432: Row 432, SUM over numerals refused under walk; a structured position, a note appended with what you found.",
"- ledger:364: Row 364, walk reading a generic object's static argument from the argument's run-time class; how your lone parameter's choice reads a run-time type meets the same question.",
"- ledger:430: Row 430, the overload listing's order; XXXInheritedOverload is unstable in your comparison.",
"- ledger:486: Row 486, walk refusing u: NN32 = n for a nat n; you write its owed XXX test, home 2.",
"- ledger:390: Row 390, a plain declaration over Any that fits beats a converted one; the order your re-instantiation keeps.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule: The rule in full, for walk the same as for the checker: choose, then instantiate, then dispatch the converted call.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#3. Walk at run time: Walk's half of the rule: choose on today's domains, re-instantiate the winner by the promotion, convert at binding; exactly your edit.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order: Your amendments listed: the bestMatchInternal edit, OpAnyZW printing generic at ZZ64, O2Wide's split recorded, not a stop.",
"- doc:explorations/reviews/before-n-questions.md#A.1 What was run for question A, and why: The fork run on walk under probe K's shadow: the plain arm; your build must print the generic at ZZ64.",
"- doc:explorations/reviews/option-2-soundness.md#2. Static and dynamic agreement: O2Wide and O2Lone: where a static type is wider than its value the paths split on the instance; you capture it for the gather's row.",
"- doc:explorations/compile-ladder/plan-n/probe-k/PROBE-K.md#6. The forks it meets: Probe K's forks, the first settled by the conversion rule and its checker reading corrected; the others yours to report.",
"- doc:explorations/reviews/inference-rule-shadow.md#The answers: The shadow's answers, for the checker; your walk rule must agree with them on every shape both paths run.",
"- doc:explorations/reviews/inference-rule-shadow.md#6. What walk would need: The three places of walk's rule as the shadow read them; a starting point, not the answer.",
"- doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets: What the rule leaves out; stay inside it.",
"- doc:explorations/reviews/inference-rule-shadow/probes/OneShapeW.fss: The one-shape walk program; your new test's shapes come from it.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#4.2 How a generic call's static arguments are inferred: How walk infers today, with citations; the loop you split in two passes.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#4.3 Rung C's coercion at dispatch meets a generic callee: Why rung C's coercion pass skips generics and what refusing scale64(b, 3) costs; the continue you remove.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#8. How the three interact: observations, with their sources: How inference, coercion and dispatch interact under walk; read before you change their order.",
"- doc:explorations/compile-ladder/rung-interp-coercion/REPORT.md#1. What changed: Rung C's coercion pass, the code you extend; what it changed.",
"- doc:explorations/compile-ladder/rung-interp-coercion/REPORT.md#5. Decisions: Rung C's decisions, the most specific coercion among them; keep them.",
"- doc:explorations/compile-ladder/climb-batch-7R/JUDGE-review.md#5. Considered and left as ruled@Row 486: The judge's ruling that row 486's test waits for this rung; you write it.",
"- doc:explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkNatType.fss: The program that measured row 486; your XXX test restates its T3 line as an assertion.",
"- doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion: Applicability by substitutability; the specification's definition walk's coercion pass implements.",
"- doc:Specification/basic/conversions-coercions.tex#Coercion Resolution: The order of choice, a declaration applicable without coercion first; the order your edit keeps.",
"- doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls: Applicability to a named call; the text your change must agree with.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction: Walk's inference, the loop you split in two passes.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion: The coercion pass whose continue skips generics; you let it keep them.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchInternal: The subtyping pass: its choice stays, and the winner is re-instantiated before application, the one edit you may make here.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java#static SingleFcn coercionFor: coercionFor, which instantiates a generic target too early (row 389); you fix it.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/NonPrimitive.java#public List<FValue> typecheckParams: Where an instantiated function's arguments are converted at binding; place 1 relies on it.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java#public static Set<FType> join(List<FValue> evaled): Walk's join of lower bounds, today's instance; the promotion replaces it only for the chosen generic.",
"- doc:ProjectFortress/tests/XXXCoercionGenericFnRungC.fss: Row 388's walk expected failure; you promote it by git mv.",
"- doc:ProjectFortress/tests/XXXCoercionGenericTraitRungC.fss: Row 389's expected failure; you promote it by git mv.",
"- doc:ProjectFortress/tests/roundBug.fss: The test form your new test follows: each assertion with a message citing its source.",
"- doc:explorations/reviews/before-n-questions/fork/OpAnyZW.fss: The fork's program; your new test asserts its op(z, w) at ZZ64 under walk.",
"- code:ProjectFortress/tests/IntSemanticsRungI.fss#zz32Shown(v: Any): String: The helper that shows a value with its type; show each value of your test through it.",
"- Under walk, the interpreter converts by coercion at its three kinds of type check: Rung C's three conversion sites; your rule's conversions happen at binding through them.",
"- Static arguments are inferred from the arguments alone, on both paths: The fact your rung changes on walk's side; cite it with its measurements.",
"- An inferred generic refuses a coercion that the method it forwards to accepts: The container shape scale(b, z) your rule accepts under walk.",
"- A numeral's type depends on the path and on the library in scope: Why walk's numeral is a ZZ32 in this run; Q1 is not yours.",
"- The one library's number tower is flat: The flat tower your promotion converts within: each type's own algebra, coerce from the narrower ones.",
"- An XXX*.fss in the interpreter corpus IS a gated expected-failure test: Why the two XXX tests go red once they pass, and how your row-486 test is gated.",
"- testSystem's four shards are one suite split by sorted index: How testSystem counts your new and renamed files; the gate compares shard sums.",
"- The interpreter's overload-ambiguity message names its two declarations: Walk's ambiguity message; a changed listing order is row 430, not a stop.",
"- Three heaps run the interpreter: The heaps your comparison runs under; set them as the gate does.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll, or the linker's state is lost.",
"- map:README.md#Touch this@interpreter/ (evaluator: What else moves when you touch walk's evaluator; check each before you report.",
"",
].join('\n')

const T_TAIL = [
"",
"## Your rung: T - the type-inference chapter",
"",
"SLUG is rung-spec-inference. WORKTREE is /home/user/fortress-specinfer, branch wip/rung-spec-inference.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-N.md, section 3, under \"T. The type-inference chapter\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q1 = (1): the chapter names ZZ32 as the type a numeral takes when its candidate types are incomparable, ZZ64 or ZZ when its value does not fit, stated once as the tie rule for a numeral alone (explorations/reviews/conversion-overloading-judgement.md section 4; under (2), the expected type then a refusal; under (3), a refusal). T lands only if I lands (its manifest entry's landsOnlyWith).",
"",
"**Its briefing.** The decisions (the numerics plans, the two decisions of the conversion judgement, answer 8, answer 9, a numeral's type, a size used as a value, the JVM principle, under which Q1's default is read, the S1 form, the name of the unrevised copy, the lineage note, the requirement on the plan, the number chapters under S2, the stops, rung D's stop); ledger rows 447, 425, 455, 401, 388, 485 and 486; the conversion judgement's rule as stated for the specification, its Q1 section and where it lands; the conformance reviews' findings on the solver's two behaviours, the implicit bound and a size used as a value, and the overloading judgement's item on the implicit bound; the shadow note's answers, its edit and its forks; evidence B's sections on the inference chapter the text cites, on coercion at a call and on the later Types chapter and the papers; the specification's inference chapter, its sections on applicability with coercion, coercion resolution and applicability to named calls, the type parameters section, the ranges section, the integer chapter's callout, and Appendix I's entry on the integer type of a range, \"Passages not yet revised\" and its reductions entry; batch 5's decision record's form section; the FACTS entries on the specification's silence, its lineage, the frozen copy, the number chapters, a generic object without its static arguments, inference and the expected type; the map's specification row. The keys are in section 7, each with its reason at the end of the tail; checks is the decisions (the numerics plans, the conversion judgement's two decisions, the JVM principle, the S1 form, the unrevised copy's name, the stops), rows 447 and 485, the judgement's rule, the shadow's forks, the chapter, the callout, \"Passages not yet revised\", the form and the entry on the specification's silence.",
"",
"**The problem.** The chapter that the overloading rules (Specification/basic/overloading.tex:170-175, static parameters \"inferred as described in \\chapref{type-inference} before checking the applicability\"), Specification/basic/expressions/var-ref.tex:35-40 and Specification/basic/expressions/method-invocation.tex:49-52 cite, Specification/basic/inference.tex, is 27 lines of heading and notes: \"This chapter will include the Fortress static type inference mechanism.\" (:15), with three open items, the last \"Do we want to forbid such cases where type inference infers BottomTypes for static parameters?\" (:24-25). The revival's own text points into it: answer 8's callout, \"A generic call or a range over two different integer types is to infer the narrowest type that both coerce into, by a rule to be written into \\chapref{type-inference} together with its implementation; until then such a call writes its static argument\" (Specification/basic-lib/basic-integers.tex:80-94 as batch 7R's rung U left it, which dropped \"or a range\"), and the paragraph of Appendix I's \"Passages not yet revised\" that repeats it (Specification/appendices/changes.tex:1552-1555). Once rung I lands, the checker infers by a rule no text states, and chooses a declaration before it instantiates it by a rule the coercion chapter states only in part: an open discrepancy (POSITIONS 2026-09-24, the requirement on the plan). The later restart's Types chapter never says \"infer\" (FACTS.md, \"The specification never wrote static-argument inference or a numeral's type hierarchy, and named a range's integer width only in climb batch 7R\"). Two passages beside it: the ranges section converts a numeral to ZZ32 and makes a component of another integer type a static error (Specification/basic/expressions/ranges.tex:46-48), and \"Passages not yet revised\" says whether a nat parameter may be a component of a range is not settled (Specification/appendices/changes.tex:1556-1560; row 485), which Pavol's decision on a size used as a value now settles; and the type parameters section still says an unbounded type parameter \"has an implicit extends Object clause\" (Specification/basic/trait-parameters.tex:49-50), where batch 7's question 1 (a) made it Any (explorations/reviews/batch-6b-7-conformance.md finding 6).",
"",
"**The decisions.** The numerics plans, decision 3 (explorations/coordinator/POSITIONS.md, 2026-09-27): \"the specification's type-inference chapter is written in the S1 form and lands only with the checker rung\". The conversion rule (POSITIONS 2026-09-28, the two decisions of the conversion judgement, decision 1; the judgement's sections 1 and 5): the chapter states the instantiation step as the second step after the coercion chapter's resolution, in the words of the judgement's section 1 (\"Instantiation\", \"Dispatch\", \"Numerals\"), with the static insertion of the instance's coercions, the dispatch of the converted call, the numeral default once, and a callout that walk applies the same rule from run-time types; the resolution itself stays the coercion chapter's, and its cross-reference sentence is batch 7b's rung S's. Answer 8 (2026-09-26): the promotion rule is \"written into the specification's empty inference chapter\". Under Q1 = (1), the chapter states the numeral's default. A size used as a value (POSITIONS 2026-09-28, 19:17 UTC, item 25): it converts to ZZ32 as a numeral does, so the ranges section says so beside the numeral, which both paths run today (the checker types it as a numeral, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:67-68; walk makes it a ZZ32), and \"Passages not yet revised\" no longer calls it open; its other contexts (an NN32 binding, row 486) are rung Q's to build and to write. The implicit bound: the chapter's callout names Any as the bound its rule assumes, batch 7's question 1 (a), which the library, walk and the gate run, and says that batch 7b's rung S revises the sentence of trait-parameters.tex:49-50. The reason: the specification's naked-Any rule (Specification/advanced/overloading.tex:114-127), read under the bound Any, forbids any overload of a declaration such as array1(v: T), which the checker does not report (explorations/reviews/overloading-judgement.md, its item 4 on the implicit bound); so the sentence and that rule are revised together, and the rule is in the overloading chapter rung S rewrites and this rung may not edit. The form, S1 (2026-09-26): the normative text edited in place, a \\revision callout at each changed passage (Specification/fortress/fortress.tex:87), an Appendix I entry per change quoting the original as \"the Working Draft of February 2011\" by its path and line in Specification-1.0-frozen/ (2026-09-26, the first of the batch-5 answers), and the reasons in a decision record; the later Types chapter cited beside where it covers the topic (2026-09-26, the lineage note). Not this rung's: the overloading chapters and the coercion chapter's cross-reference, which batch 7b's rung S writes after this batch; the literals section and the coercion chapter's note on the interpreter's numerals (rung Q, run 2); the reductions callout (Specification/basic/expressions/reductions.tex:27-44), whose rows 424 and 425 stay open.",
"",
"**What the specification and the team already say.** Evidence, not the brief.",
"- Applicability with coercion is defined by substitutability, \"T <: U or T coerces to U\", and names no static parameter (Specification/basic/conversions-coercions.tex:417-432, :455-457); a declaration applicable without coercion is chosen first, otherwise \"the coercion that yields the most specific type\" (:472-480, :533-553); coercion happens where the context expects a type, among them \"arguments to functionals and constructors where the corresponding parameters have declared types\" and \"body expressions of functionals and constructors where the return types are declared\" (:102-127); \"types named by type parameters do not have coercions\" (:363-365); the expected type re-chooses a declaration only in widening, \"not yet supported\" (:820-862, :15).",
"- A numeral has a type of its own, and \"Libraries define coercions from numerals to integers\" (Specification/basic/expressions/literals.tex:127-148); its hierarchy is a note (:87-96).",
"- A nat parameter \"may be used to instantiate other nat parameters, or to appear in any context that a variable of type NN32 can appear, except that it cannot be assigned to\" (Specification/basic/trait-parameters.tex:83-86), typed NaturalStatic (Specification/basic/expressions/constant.tex:96-97); the specification's own ranges bound by one (SpecData/examples/basic/Fun.Decl.fss:23; Specification/advanced-lib/binary.tex:716-717, :951, :1086-1089; Specification/basic/matrix-unpasting.tex:160-161; row 485).",
"- The team's papers: static inference with the results \"passed to the run-time system to ensure that run-time type inference at a function call is sound\" (Papers/Types/discussion.tick:34-38, commented out); run-time inference of a dispatched declaration's type parameters \"beyond the scope of this paper\" (Papers/Types/rules.tick:118-129); a declaration \"is applicable to a type if and only if at least one of its instances is\" (Papers/Types/setup.tick:394-397); the join of two argument types in the code generator's plan (Papers/Implementation/MethodMapping.tex:309-319). The later Types chapter gives the coercion relation (Documentation/Specification/Prose/Language/types.tick:938-947), a generic type's coercion (:393-400) and valid instantiation (:771-789), and no inference.",
"- The models: batch 5's rung S (explorations/compile-ladder/rung-spec-route-a/decision-record.md, section 3.9, the form) and batch 6's rung T (explorations/compile-ladder/rung-spec-numbers/decision-record.md).",
"",
"**What it writes.** First, before any edit, the list: every passage of Specification/ outside library/apis/ that cites the chapter or presumes its rule, with what the decision makes of it, whether it is revised now or left, and the source that settles it; the implicit-bound sentence and the naked-Any rule among those left, with batch 7b's rung S as the source. Then:",
"- the chapter: what a static argument is inferred from, stated as far as rung I builds it and no further, as the second step after the coercion chapter's choice of a declaration on its declared types: the arguments whose declared parameter types mention the static parameter, by subtyping; the expected type of the call, including a call written f(x), and the retry without it when the result converts; the other arguments then admitted by substitutability against the instantiated parameter types, a coercion applied where one is needed, inserted statically; a type parameter that stands alone as a parameter's type, fixed by nothing else, taking the narrowest of its arguments' types and its bound; answer 8's promotion, the narrowest type every number argument converts into; the converted call dispatching at run time by subtyping to the most specific declaration applicable to the converted values; under Q1 = (1), the numeral's default, once, as the tie rule for a numeral alone in either step; that run-time dispatch infers a dispatched declaration's static arguments by the same rule from the arguments' run-time types (walk's implementation is rung K's; if K has not landed the callout says what walk does); and what the chapter leaves open, the team's note on BottomType kept (row 447), with a result-only parameter (the solver refusing one bounded by Any and binding one with any written bound to Bottom, explorations/reviews/batch-6b-7-conformance.md finding 5) and a type fixed through a structure named as not covered;",
"- the \\revision callout at the chapter, naming Any as the bound it assumes and batch 7b's rung S as the rung that revises trait-parameters.tex:49-50 with the naked-Any rule;",
"- the ranges section's sentence (Specification/basic/expressions/ranges.tex:46-48): a nat or int parameter used as a value converts to ZZ32 as an integer numeral does (Pavol's decision on a size used as a value), with its callout;",
"- answer 8's callout at Specification/basic-lib/basic-integers.tex:80-94, as batch 7R's rung U left it, and the paragraph of \"Passages not yet revised\" that repeats it, revised to say the rule is written, keeping the rest of each; the paragraph of \"Passages not yet revised\" on a nat parameter in a range (Specification/appendices/changes.tex:1556-1560) and the sentence of the entry \"The integer type of a range\" that points to it (:1107-1108), revised to say it is settled and where;",
"- the Appendix I entry, a new subsection inserted immediately before \"Passages not yet revised\", after the last revision entry there (batch 6.5's rung P's \"The algebra of the rational trait\" on 6016fac3f; re-read on the base), quoting the original chapter from Specification-1.0-frozen/basic/inference.tex:12-27, and the revival's ranges sentence, callout and paragraphs from git show <base>:<path>, since they are batch 7R's and not the Working Draft's (the Working Draft's ranges passage is quoted in batch 7R's entry, \"The integer type of a range\");",
"- the decision record, explorations/compile-ladder/rung-spec-inference/decision-record.md;",
"- every citation of a line of a chapter it edits in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, re-anchored by the map of unchanged lines from git show <base>:<chapter> to its tree, never an assertion; an edit to the callout that changes its line count moves every test citation of basic-integers.tex below it (ten files on 6016fac3f: ProjectFortress/tests/WrapOperatorsRungD.fss, FixedWidthOverflowRungB.fss, IntSemanticsRungI.fss, ResultBoundsRungB.fss; ProjectFortress/compiler_tests/IntLiteralWrapRepairR2.fss, IntSemanticsRungB.fss, XXXShiftDeclRungI.fss, XXXNNShiftRungP.fss, XXXZZNarrowRungP.fss; ProjectFortress/library_tests/IntegralOpsRungN.fss; and rung M's test if it cites the chapter), and an edit to ranges.tex those of ranges.tex (nine files: ProjectFortress/tests/RangeSizeRungO.fss, RangeZZ32RungJ.fss, XXXRangeBoundsRungO.fss, XXXRangeEmptyHashRungO.fss, XXXSeqRangeTopRungO.fss; ProjectFortress/compiler_tests/XXXRangeEqRungJ.fss, XXXRangeInRungJ.fss, XXXSeqHashBoundsRungO.fss, XXXSeqMidpointRungO.fss); re-read on the base.",
"",
"**How it is checked.** No test can go red for a prose edit. The specification is built as rungs S and T built it (./ant genSource, then ./ant tex, in Specification/fortress/, with FORTRESS_HOME the worktree), on the base and after, the four logs captured; pdftotext of the two PDFs diffed, showing only the new chapter, the callouts, the ranges sentence, the appendix entry and paragraphs and page shifts; git diff --stat showing only the listed files; every re-anchored citation opened. Any example the chapter prints is run on both paths after rungs I and K land, at the gather. The rung does not commit Specification/fortress.pdf; the gather rebuilds it once on the merged tree.",
"",
"**Files it may touch.** Specification/basic/inference.tex; Specification/basic/expressions/ranges.tex, the one sentence and its callout; Specification/basic-lib/basic-integers.tex, the callout only; Specification/appendices/changes.tex, its new subsection at its place, the paragraph of \"Passages not yet revised\" that names the rule, the paragraph there on a nat parameter in a range, and the one sentence of \"The integer type of a range\" that points to it; the messages and comments of the tests whose citations its edits move; its own directory. Not: Specification-1.0-frozen/; Specification/fortress.pdf; Specification/basic/trait-parameters.tex, Specification/basic/overloading.tex and advanced/overloading.tex (batch 7b's rung S); Specification/basic/expressions/literals.tex and conversions-coercions.tex (rung Q; the cross-reference, rung S); any source, library or test assertion.",
"",
"**Java or Scala.** Neither.",
"",
"**The checker count.** Unchanged: the rung edits nothing the stage reads, and the manifest predicts the last landed total. Not captured: the gate's own run is the after.",
"",
"**Stops.** Any edit under Specification-1.0-frozen/. Normative text stating more than rung I builds (the chapter) or than both paths run today (the ranges sentence), an answer to the team's BottomType question among it. A passage whose new text neither the decisions nor rung I's section settles: the rung reports it and does not choose. An assertion changed in a re-anchored test. A file another rung edits. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** Every sentence of the chapter against the decisions, against the judgement's section 1 and against rung I's section (rung I's checker is not in T's tree; the gather checks the text against I's landed tests once both are applied); the ranges sentence against both paths today; every quoted original against git show <base>:<path> and against the frozen copy's line; the two builds and the pdftotext diff; each re-anchored citation opened; the list against the passages evidence B section 1.2 names.",
"",
"**What comes back to Pavol.** The chapter as the pdftotext diff; the ranges sentence; the Appendix I entry; the list, with what was left and why.",
"",
"**What it closes.** Row 485 (fixed by the ranges sentence, on Pavol's decision). Notes appended to rows 447 and 425: the chapter keeps the team's question on BottomType open and names the solver's two behaviours as not covered. The FACTS entry \"The specification never wrote static-argument inference or a numeral's type hierarchy, and named a range's integer width only in climb batch 7R\" is corrected at the gather: the chapter is written.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-27 numerics plans: The decision this batch builds: the chapter written in the S1 form, landing only with the checker rung; quote it in your decision record.",
"- positions:2026-09-28 two decisions of Fable's judgement: The conversion rule you state: choice by the coercion chapter, then instantiation by the promotion, then dispatch, the numeral tie once.",
"- positions:2026-09-26 answer 8: Answer 8: the promotion rule written into the empty inference chapter; the sentence you write.",
"- positions:2026-09-26 answer 9: Answer 9: batch 7b's rung S rewrites the overloading chapters after you; you edit neither, and the coercion chapter's cross-reference is S's.",
"- positions:2026-09-27 numeral's type: A numeral's own type, the model run 2 builds; your chapter's numeral rule is written for it.",
"- positions:2026-09-28 size used as a value: Pavol's decision on item 25, with his reasoning: the sentence you write into the ranges section, and why a size converts to ZZ32 there.",
"- positions:2026-09-22 a design principle: The JVM principle, Java's default where it makes sense: the ground on which Q1's default, ZZ32 for a numeral nothing else fixes, is read.",
"- positions:2026-09-26 S1: The S1 form: text in place, a revision callout, an Appendix I entry, reasons in a decision record; every change you make takes it.",
"- positions:2026-09-26 first of the batch-5 answers: The unrevised copy is called the Working Draft of February 2011, cited by its path and line in Specification-1.0-frozen/.",
"- positions:2026-09-26 lineage note: The later Types chapter is cited beside where it covers a topic; it covers no inference, and you say so.",
"- positions:2026-09-24 requirement on the plan: No open discrepancy between the specification and the implementation: why the chapter lands with rung I.",
"- positions:2026-09-26 number chapters under S2: How the number chapters were revised; the callout you revise is one of theirs.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- ledger:447: Row 447, the team's BottomType question; the chapter keeps it open, a note appended.",
"- ledger:425: Row 425, the reductions' element type; named as not covered, a note appended.",
"- ledger:455: Row 455, the expected type at f(x); the chapter states that it is kept, with the retry.",
"- ledger:401: Row 401, the shape the rule accepts; an example the chapter may give.",
"- ledger:388: Row 388, a narrower argument for a declared parameter of a generic; the admission step the chapter states.",
"- ledger:485: Row 485, a nat parameter in a range, now settled by Pavol; your ranges sentence closes it.",
"- ledger:486: Row 486, walk refusing a size value at an NN32 binding; that context is rung Q's to write, so your text stops at ranges.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule: The rule as the judgement states it for the specification; your chapter's instantiation, dispatch and numeral paragraphs follow its words.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#4. Q1's default: Q1's default as the numeral tie rule, stated once, in your chapter; it ranks nothing but numerals.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order: Your amendment: the two steps, the static insertion, the dispatch, the numeral once, walk's callout; and what is batch 7b's.",
"- doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The checker's solver treats a parameter bounded by: The solver's two behaviours for a result-only parameter; your not-covered list names both.",
"- doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The specification's implicit bound stays: The implicit bound still Object in the text; your callout names Any as the bound the chapter assumes.",
"- doc:explorations/reviews/overloading-judgement.md#10. Left open for him@The implicit bound: Why the sentence waits for rung S: under Any the naked-Any rule reads as forbidding overloads, and S revises both.",
"- doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value: The evidence behind Pavol's item 25 decision; your ranges sentence and the notrevised paragraph follow it.",
"- doc:explorations/reviews/inference-rule-shadow.md#The answers: The shadow's measured answers; the chapter states no more than rung I builds from them.",
"- doc:explorations/reviews/inference-rule-shadow.md#1. The edit: The attempts' order as built; the chapter's words for the expected type and the retry.",
"- doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets: What the rule does not reach; your chapter names it as not covered.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#1.2 Static arguments, and the inference chapter the text cites: Every passage that cites the chapter; your list starts from it.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#1.3 Coercion at a call and in a typed binding: What the specification says of coercion at a call; the ground your chapter stands on.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#2. The team's later Types chapter and the Types papers: The team's later word and papers, silent on inference; cite them beside your text.",
"- doc:Specification/basic/inference.tex: The chapter you write, today 27 lines of notes; its BottomType note stays.",
"- doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion: Applicability by substitutability; your admission step cites it.",
"- doc:Specification/basic/conversions-coercions.tex#Coercion Resolution: The resolution your chapter follows as its first step; you cite it and do not restate it.",
"- doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls: The passage that says static parameters are inferred as the chapter describes; your list says what becomes of it.",
"- doc:Specification/basic/trait-parameters.tex#Type Parameters: The implicit-bound sentence, Object in the text; not yours to edit, named in your callout and your list.",
"- doc:Specification/basic/expressions/ranges.tex#Ranges: The ranges section batch 7R revised; you add a size used as a value beside the numeral in its one sentence.",
"- code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in: Answer 8's callout; you revise its last rule to say the chapter now states it.",
"- doc:Specification/appendices/changes.tex#The integer type of a range: Batch 7R's entry whose Effect sentence points to the open question; you revise that one sentence.",
"- doc:Specification/appendices/changes.tex#Passages not yet revised: The paragraphs on the rule and on a nat parameter in a range; you revise both, and insert your entry before this section.",
"- doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes: The reductions entry, rows 424 and 425; left, and your chapter names the class as not covered.",
"- doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form: The form batch 5's rung S used; your entry and decision record take it.",
"- The specification never wrote static-argument inference: The fact your chapter corrects; the gather rewrites it.",
"- The team's latest word on types: The later Types chapter, cited beside your text where it covers the topic.",
"- Specification-1.0-frozen/ is byte for byte: Where to quote the original from; never edit it.",
"- The specification's number chapters describe the flat library: The number chapters' state; your callout sits in one of them.",
"- A generic object referenced without its static arguments is a static error on the compiled path: A case your chapter must not contradict: inference does not supply a generic object's static arguments.",
"- Static arguments are inferred from the arguments alone, on both paths: Today's behaviour, which the chapter's rule replaces.",
"- Keeping the expected type at a call written: The expected type at f(x) and the retry, in the words of the measurement.",
"- map:README.md#Touch this@Specification/ (the standard): What else moves when you touch the specification: Part IV's rendering, test citations.",
"",
].join('\n')

const M_TAIL = [
"",
"## Your rung: M - each integer type's own MIN, MAX and MINMAX",
"",
"SLUG is rung-integer-minmax. WORKTREE is /home/user/fortress-minmax, branch wip/rung-integer-minmax.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-N.md, section 3, under \"M. Each integer type's own MIN, MAX and MINMAX\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** None of section 1's question changes this rung: its declarations take arguments of their own type, and a numeral is walk's ZZ32 in this run.",
"",
"**Its briefing.** The decisions (the two decisions of the conversion judgement, of which decision 2 is this rung, answer 8, route A, the library's practice, the library route, the JVM principle, the landed gate's tables as a rung's before, the launch of phase 3's batches, the stops, rung D's stop); ledger rows 484 and 421; the conversion judgement's section on row 484 and its rule; the question the judgement answered, with its walk runs, the reason + answers where MAX does not, the checker's view, what the numeral switch meets and what the option writes; the specification's coercion resolution and the integer chapter's ZZ declarations; the library's StandardTotalOrder, QQ's and RR64's MIN, MAX and MINMAX, ZZ64's own + and <=, NN32's declarations and the compiler library's per-type MIN, MAX and MINMAX; walk's most-specific relation; the test form and the helper that shows a value with its type; the FACTS entries on the flat tower, walk's coercion, the overload-ambiguity message, the harness and the checker-count table; the map's library row. The keys are in section 7, each with its reason at the end of the tail; checks is the decisions (the conversion judgement's two decisions, answer 8, the library's practice, the library route, the stops), rows 484 and 421, the judgement's section on row 484, what the option writes, the precedent code and walk's relation.",
"",
"**The problem.**",
"- Under walk, b MAX 1 for a ZZ64 b stops the run, \"Ambiguous coercion\", while b + 1 and b <= 1 answer (row 484). Measured on main in 23 one-call runs (explorations/reviews/before-n-questions.md appendix B.1, explorations/reviews/before-n-questions/walk-max/summary.txt): MAX, MIN and MINMAX with a numeral stop for a ZZ64 and a ZZ; w MAX z for a ZZ64 w and a ZZ32 z stops too; z MAX w and 1 MAX b answer a QQ; for an NN32 or NN64 b the numeral calls answer a QQ; ZZ32 and RR64 answer at their own type.",
"- Why (appendix B.2): on the integer types MIN, MAX and MINMAX come from the generic order traits (StandardMax, StandardMinMax and StandardTotalOrder, Library/FortressLibrary.fss:253, :267, :286, through Integral, :650), whose self is typed as the trait, which converts into nothing (Specification/basic/overloading.tex:159-161), so the inherited declaration and QQ's (:582-586) are incomparable by the specification's relation (Specification/basic/conversions-coercions.tex:486-500) and walk's coercion pass reports the tie (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:163-190). ZZ64 declares its own + and <= (:796, :786), which is why b + 1 answers. The compiled checker takes one candidate by a pick that varied in batch 6.5 between the gate's suite and a fresh compile (row 391; explorations/reviews/batch-6.5-review.md finding 2), until rung I's ambiguity check.",
"- The conversion rule leaves it as it is: no ordering rule settles it (the judgement, section 6). Under rung Q, ZZ32's b MAX 1 and the library's own 0 MAX (index - 1) (Library/SkipList.fss:310, Library/FortressLibrary.fss:3902-3904) meet the same tie, by reading (appendix B.4).",
"",
"**The decisions.** The conversion judgement's decision 2 (POSITIONS 2026-09-28, the two decisions of the conversion judgement, option 1; the judgement's section 6): each integer type declares its own MIN, MAX and MINMAX, as QQ, RR64, the compiler library and the specification's ZZ do, a library rung in batch N's first run, before rung Q; every such call then answers at answer 8's type, as + does. The library's practice (2026-09-19) and the library route (2026-09-21): the one library is edited, the compiler library is the model and is not edited. Route A (2026-09-24): each number type carries its own operations at its own type. Not this rung's: walk's reading of an inherited method's self (the judgement's option 2, not taken); StandardMinMax's declarations (batch 7's rung B wrote their T, row 421); StandardMin's and StandardMax's headers and the scalar block's MIN and MAX (batch 7b's rung L); IntLiteral's own (rung Q, run 2); the checker (rung I).",
"",
"**What the library and the tree already do.** Evidence, not the brief; the rung lists every way before it chooses.",
"- The one library's own device in this family: QQ declares MIN, MAX and MINMAX at its own type (Library/FortressLibrary.fss:582-586, api Library/FortressLibrary.fsi:412-414), and so does RR64 (.fss:427-429, api :326-328), beside the ones they inherit.",
"- The compiler library declares all three on every number type: ZZ (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:137-139), ZZ64 (:198-200), ZZ32 (:261-263, though it also extends StandardTotalOrder[\\ZZ32\\]), NN32 (:318-320), NN64 (:378-380) and IntLiteral (:425-427). The specification's ZZ declares its own MAX and MIN (Specification/basic-lib/basic-integers.tex:263-264).",
"- The bodies StandardTotalOrder gives them (Library/FortressLibrary.fss:285-288): MIN and MAX by one <, MINMAX as a pair; NN32 is declared in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:82 and .fss:387, with its own < and +. What the option writes, by reading (appendix B.5): three declarations on each of ZZ32, ZZ64, NN64 and ZZ in Library/FortressLibrary.fsi and .fss, and on NN32 in FortressBuiltin.fsi and .fss, fifteen in all, in the compiler library's api form.",
"- By reading (appendix B.2): with ZZ64's own MAX, (ZZ64, ZZ64) is more specific than every other candidate of b MAX 1 and w MAX z, and NN32's u MAX z reaches ZZ64's and NN64's v MAX z reaches ZZ's, as the + control does (b + 1 answers ZZ for an NN64 b).",
"- The team's tests of the family: ProjectFortress/tests/ holds calls of MIN and MAX on the integer types; the rung's comparison finds any whose output changes.",
"",
"**The test, first.** In ProjectFortress/tests/, captured failing on the base and passing after: one new test in the form of ProjectFortress/tests/roundBug.fss, each assertion's message citing row 484 or its source, each value shown with its type as ProjectFortress/tests/IntSemanticsRungI.fss's zz32Shown shows it: b MAX 1, b MIN 1 and b MINMAX 1 for a ZZ64 and a ZZ b (3, 1, (1, 3) at the receiver's type); w MAX z and z MAX w (ZZ64); 1 MAX b for a ZZ64 b (ZZ64); u MAX z for an NN32 u (ZZ64) and v MAX z for an NN64 v (ZZ), answer 8's types; and, unchanged on the base, ZZ32's and RR64's. The NN32 and NN64 calls with a numeral are left to rung Q's test, since the numeral's type decides them and changes in run 2 (a ZZ64 and a ZZ in this run, the receiver's type after the switch).",
"",
"**What it writes.** The fifteen declarations, in the api and the component; the test; its report and record.",
"",
"**The comparison.** As rung K's, in one pass before and one after: every file of ProjectFortress/tests/ except the new test, one JVM per test with private caches, normalised as batch 5 normalised, XXXInheritedOverload.fss listed as unstable (row 430); every changed output listed with its call and the declaration that now answers it. The two microGPT checks from an empty cache at FORTRESS_THREADS=1, 40 of 40 with their printed values unchanged. The machine line on every capture; each pass's caches deleted once captured, and df read before each pass.",
"",
"**What it clears.** Row 484's walk refusals and the QQ answers above, by its test; on the compiled path nothing, since the compiler library already declares them.",
"",
"**Files it may touch.** Library/FortressLibrary.fsi and .fss: three declarations in each of ZZ32 (.fss:694), ZZ64 (:766), NN64 (:850) and ZZ (:914), nothing else; ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss: three declarations in NN32; the new test; its own directory. Not: the headers or other members of those types, StandardMin, StandardMax, StandardMinMax, StandardTotalOrder or Integral; IntLiteral; Library/CompilerLibrary.* and ProjectFortress/LibraryBuiltin/Compiler* (POSITIONS 2026-09-21, the library route); walk, the checker and the specification.",
"",
"**Java or Scala.** Neither: a library rung. ant compileAll is not needed for a library edit; the interpreter's caches are wiped before every run.",
"",
"**The checker count.** Reported: the FortressLibrary and FortressBuiltin apis gain declarations the count stage checks, and a new or gone row is tied to one of them. Before: the last landed gate's checker-count.txt and distance.txt with its per-site list distance-sites.tsv (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: climb-batch-6.5/gate/, count 75 and distance 626), not a run of the stages on the rung's unchanged base; after: both captured on the rung's tree through run_bg and compared with compare.sh, declared with the distance stage's totals (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken; the intro says when the base has changed under the table).",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict; the library loads under walk; FlatTowerRungF.fss, IntSemanticsRungI.fss, FixedWidthOverflowRungB.fss, WrapOperatorsRungD.fss; the rung C tests; every compiled test (the compiler library is untouched); the two microGPT checks at 40 of 40 with unchanged values.",
"",
"**Stops.**",
"- A changed walk output other than a call of MIN, MAX or MINMAX now answering at answer 8's type, which the comparison lists.",
"- An overload set of the library that walk loads today and refuses after.",
"- A changed value printed by either microGPT check, or any line of explorations/run-c4/src/ or explorations/apl/mg/.",
"- An edit to a declaration other than the fifteen, to the compiler library, walk, the checker or the specification.",
"- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The new test red on the base and green after, each value against the compiled path's answer with the compiler library (explorations/reviews/before-n-questions/max-compiled/); each declaration against StandardTotalOrder's body and the compiler library's api form; the comparison's changed outputs, each a call of the family; the count stage's table, each moved row tied to a declaration; the microGPT checks' values.",
"",
"**What comes back to Pavol.** The fifteen declarations as a diff; the changed outputs.",
"",
"**What it closes.** Row 484 (fixed).",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-28 two decisions of Fable's judgement: Decision 2 is this rung: each integer type declares its own MIN, MAX and MINMAX, as QQ, RR64, the compiler library and the specification's ZZ do.",
"- positions:2026-09-26 answer 8: Answer 8: the type each call now answers at, ZZ64 for NN32 with ZZ32, ZZ for NN64 with ZZ32; your test's expected types.",
"- positions:2026-09-24 exclusion route rung P's fork: Route A: each number type carries its own algebra and converts from the narrower ones by coerce; the tower your rule converts within.",
"- positions:2026-09-19 answering the open question: The library's own practice is the standard: QQ's and RR64's own MIN and MAX are the device you extend.",
"- positions:2026-09-21 library route: The library route: you edit the one library only; the compiler library is the model for the api form and is not edited.",
"- positions:2026-09-22 a design principle: The JVM principle; Java's Math.max has one overload per number type, the same shape.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your count's and distance's before: the last landed gate's tables and its distance-sites.tsv, not a run of the stages on your unchanged base; capture only the after.",
"- positions:2026-09-27 launch of phase 3's batches: The standing go for phase 3's batches; it launched this run, and nothing in it is yours to re-ask.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- ledger:484: Row 484, b MAX 1 for a ZZ64 stopping walk; you fix it, home 1.",
"- ledger:421: Row 421, StandardMinMax's MIN and MAX declared T by batch 7; not yours to edit, the inherited declarations you add beside.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#6. Question B, row 484: The judgement on row 484: the rule leaves the tie, the library's device fixes it; your rung.",
"- doc:explorations/reviews/before-n-questions.md#Question B: b MAX 1: The question as put, its options and the measured runs; option 1 is what you build.",
"- doc:explorations/reviews/before-n-questions.md#B.1 Every walk result for question B: The 23 walk runs; your test's calls and their answers today.",
"- doc:explorations/reviews/before-n-questions.md#B.2 Why + and <= answer where MAX does not: Why ZZ64's own + answers and the inherited MAX ties; the reading your declarations rest on.",
"- doc:explorations/reviews/before-n-questions.md#B.3 The compiled checker, by reading: The checker takes the list's head today; rung I's ambiguity check meets the same tie, which your declarations resolve.",
"- doc:explorations/reviews/before-n-questions.md#B.4 Rung Q, by reading: What the numeral switch meets at MAX after you, and IntLiteral's exclusion of QQ; rung Q's, read so your test leaves the numeral cases to it.",
"- doc:explorations/reviews/before-n-questions.md#B.5 What option 1 would write: The fifteen declarations and their bodies; your edit.",
"- doc:Specification/basic/conversions-coercions.tex#Coercion Resolution: The specification's most specific coercion, by which your declarations win; cite it in your test's messages.",
"- code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in: The integer chapter's callout on mixed widths; your calls follow answer 8 as it states.",
"- code:Library/FortressLibrary.fss#trait StandardTotalOrder: The bodies your declarations take: MIN and MAX by one <, MINMAX as a pair.",
"- code:Library/FortressLibrary.fss#opr MIN(self, other:QQ):QQ =..opr MINMAX(self, other:QQ):(QQ,QQ) =: QQ's own MIN, MAX and MINMAX, the one library's precedent for a type declaring its own.",
"- code:Library/FortressLibrary.fss#opr MIN(self, b:RR64):RR64 = asFloat..opr MINMAX(self, b:RR64): RR64's own, the second precedent.",
"- code:Library/FortressLibrary.fss#opr <=(self, b:ZZ64):Boolean = NOT..opr +(self,b:ZZ64):ZZ64 =: ZZ64's own <= and +, why b + 1 answers today; your MAX plays the same part.",
"- code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object NN32 extends: NN32's api, in FortressBuiltin; three of your declarations go here and in the .fss.",
"- code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr MIN(self, other:ZZ64): ZZ64..opr MINMAX(self, other:ZZ64): The compiler library's api form for ZZ64's three; copy the form, not the file.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java#private static boolean noLessSpecific: Walk's most-specific relation; why your ZZ64 declaration beats QQ's and the inherited one.",
"- doc:ProjectFortress/tests/roundBug.fss: The test form: each assertion with a message citing row 484 or its source.",
"- code:ProjectFortress/tests/IntSemanticsRungI.fss#zz32Shown(v: Any): String: The helper that shows a value with its type; your test shows each answer's type through it.",
"- The one library's number tower is flat: The flat tower: each type's operations at its own type; your declarations follow it.",
"- Under walk, the interpreter converts by coercion at its three kinds of type check: Rung C's coercion pass, which now finds your declarations most specific.",
"- The interpreter's overload-ambiguity message names its two declarations: The message row 484's calls print today; your test fails on it on the base.",
"- An XXX*.fss in the interpreter corpus IS a gated expected-failure test: How the interpreter corpus gates a test; yours is a plain one.",
"- testSystem's four shards are one suite split by sorted index: How testSystem counts your new file.",
"- The checker-count stage's table: What the count stage's rows mean; tie each moved row to one of your declarations.",
"- map:README.md#Touch this@Library/FortressLibrary.fss and the other: What else moves when you touch the library: the specification's Part IV, walk, the count stage.",
"",
].join('\n')

const Q_TAIL = [
"",
"## Your rung: Q - the numeral's own type",
"",
"SLUG is rung-numeral-type. WORKTREE is /home/user/fortress-numeral, branch wip/rung-numeral-type.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-N.md, section 3, under \"Q. The numeral's own type\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q1 = (1): under walk a type parameter that only numerals fix, whose bound IntLiteral does not meet, takes ZZ32 (or ZZ64 or ZZ for a value ZZ32 cannot hold), and a call whose declarations each take a numeral only by coercion, none most specific, takes the ZZ32 declaration, as rung I built for the checker in run 1 and rung T wrote as the tie rule for a numeral alone (under (2), the expected type is not walk's to use, so a refusal; under (3), a refusal). This rung runs in run 2, on the tree where run 1 (rungs I, K, T and M) has landed.",
"",
"**Its briefing.** The decisions (a numeral's type, the numerics plans, the two decisions of the conversion judgement, a size used as a value, answer 8, answer 7, route A, the library's practice, the library route, the model lines, the JVM principle, rung C's held push and batch 5's masks, the S1 form, the name of the unrevised copy, the landed gate's tables as a rung's before, the launch of phase 3's batches, the stops, rung D's stop); ledger rows 79, 443, 454, 387, 426, 432, 437, 401, 325, 318, 442, 484, 485 and 486; the plan-6.5 probe of the numeral with its library and Java patches; the conversion judgement's findings that stand under every way and its section on row 484, the ways note's section on what the library does in the same family, the soundness note's section on numerals, and what the numeral switch meets at MAX; the conformance findings on a size used as a value and on the library's numeral strides; evidence B's sections on where a numeral gets its type on the checker and under walk, the compiler library, the library's devices for a T in generic code and microGPT's numerals; the shadow note's one-shape cases, microGPT, the distance and the forks; the literals section's numeral passage, the coercion chapter's note on integers in floating-point expressions and its Appendix I entry, and \"Passages not yet revised\"; the two libraries' IntLiteral, Number's = and exactValue, the compiled library's Equality, the strided range operators, the library's identity functions, FIntLiteral.make, the return check walk switches off; the tests on numerals and on a converted return; the FACTS entries on a numeral's type and value, the sum's identity, the flat tower, walk's coercion, microGPT's checker errors, the distance by root cause, the specification's silence and the harness; the map's library and interpreter rows. The keys are in section 7, each with its reason at the end of the tail; checks is the decisions (a numeral's type, the numerics plans, the conversion judgement's two decisions, the JVM principle, the stops, rung D's stop), rows 79, 443, 454 and 387, the plan-6.5 probe, the judgement's findings that stand under every way, the compiler library's IntLiteral, Number's = and exactValue, FIntLiteral.make, the literals section and the entry on a numeral's type.",
"",
"**The problem.**",
"- A numeral's type is modelled three ways (FACTS.md, \"A numeral's type depends on the path and on the library in scope, and only x.one and the witness typecase produce a T in generic code on both paths\"). The compiled checker types every integer numeral IntLiteral (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:467-473): with the compiler library a trait that each integer type converts from (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390), with the one library object IntLiteral extends { ZZ32 }, its arithmetic withheld \"until coercion is implemented\" (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:117, :125-127). Walk makes an integer numeral an Int, a Long or a BigNum by magnitude (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56).",
"- The rows it makes: typecase on a numeral answers other compiled and ZZ32 under walk, and the same split reaches overload dispatch, ee(5) giving walk 1 and compiled 2 (row 79); s: RR64 = 3000000000 is refused under walk, \"RHS expression type Long is not assignable to LHS type RR64\" (row 443); a: NN32 = 3 and a: NN64 = 3 are refused on both paths (row 454's integer half), and u: NN32 = n for a nat n under walk (row 486, whose expected-failure test rung K wrote); SUM <|1, 2, 3|> is refused under walk (row 432); matrix(v)'s numeral 0 does not reach an NN32 or NN64 element (row 437); answer 7's identity functions (Library/FortressLibrary.fss:3124-3156, as batch 6.5's rung G left them) bind ZZ32's 0 to a typed name before cast[\\T\\] and pass widen(0), unsigned(0) and big(0) for the other integer types, with else => 0, each of which the switch must keep converting (row 426, fixed on the compiled path by G at fd5cb4864).",
"- What the switch meets, measured by the plan-6.5 probe (explorations/compile-ladder/plan-6.5/NOTES.md section 1): with walk's numeral an IntLiteral and the compiler library's model in the one library, the library does not finish loading. Model A0 stops at 0 <= r (\"Ambiguous coercion\": ZZ32's own <= comes from the generic StandardTotalOrder[\\T\\], which the coercion pass skipped until rung K); A1, with ZZ32's comparisons stated on ZZ32 itself as ZZ64 states them, stops at 2:46 (a generic range, gone with batch 7R); B stops at the dummy 0 asif ZZ32, which the specification refuses since the subexpression of asif must be a subtype (Specification/basic/expressions/type-annotation.tex:40-52); the library writes a numeral asif a number type at 38 sites. By reading, then: a numeral returned at a declared number type, getter zero(): ZZ32 = 0, which walk does not convert (row 387; ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java:42-45, \"Jam on, for now.\"); the identity functions' numerals (widen(0), unsigned(0), big(0), else => 0); and every generic call with a numeral for a declared ZZ32 parameter, which walk refuses before conversion until rung K's rule is in the tree (as it refuses scale64(b, 3) today, evidence B section 4.3): emptyList's ArrayList(..., 0, ..., 0, ...) in Library/List.fss:488 and microGPT's heads, unheads and onehot (explorations/run-c4/src/FlatArrays.fss:93, :106, :174), which is why this rung runs in run 2, on K's landed tree (section 1). On the checker, the switch's library copy under rung I's rule costs 3 errors on the library of 2026-09-27 (shadow section 4): three numeral-only ranges, which batch 7R's ZZ32 ranges take by coercion, and three CMP 0 comparisons that resolve to a declaration answering Comparison where TotalComparison is declared; widen(4) resolves to NN32's declaration (shadow section 2.3). Walk's changed outputs under the whole switch are probe Q's to measure (section 6).",
"- Number's = and a numeral. Once IntLiteral is a sibling under Number, x = 0 for a ZZ32 x has Number's = (Library/FortressLibrary.fss:361-371, rung F's, d846e3644) and the top-level opr =(a: Any, b: Any) (:96, the team's) fitting without a conversion and ZZ32's own = only with one, so under the conversion rule Number's runs; it compares through exactValue, a typecase over QQ and the five integer types with else => Ratio(0, 0) (:374-383), so an IntLiteral falls to Ratio(0, 0): a wrong answer, silent. By reading, assert(v, 3, msg), the form of nearly every test, compares through the same path; and inside a generic body, whose static type is a type parameter with no coercions (Specification/basic/conversions-coercions.tex:363-365), Number's = is reached under every rule (explorations/reviews/conversion-overloading-judgement.md section 7, finding 1; explorations/reviews/conversion-overloading-ways.md section 5). Neither the A0 patch nor distance-triage/variants.py touches exactValue.",
"- Row 484's tie after the switch. With rung M's per-type MIN, MAX and MINMAX landed, ZZ32's b MAX 1 and the library's own 0 MAX (index - 1) (Library/SkipList.fss:310, Library/FortressLibrary.fss:3902-3904) resolve only if every type that converts into ZZ32 excludes QQ, so IntLiteral must exclude QQ, as the compiler library's IntLiteral excludes every number type it has (explorations/reviews/before-n-questions.md appendix B.4; CompilerBuiltin.fsi:390).",
"- The library's two numeral strides: SUFFIX_SUM's seq((|x| - 2):0:-1) (Library/FortressLibrary.fss:4600) and seq((|a| - 1):-1:-1) (Library/Shuffle.fss:23), where the -1 meets a parameter typed by I of the generic strided operator (Library/FortressLibrary.fsi:2319, opr :[\\I\\](r: Range[\\I\\], stride:I)) once a numeral is not a ZZ32; whether the rule takes it when the range argument fixes I is rung I's probe's to show, and probe Q's under walk (explorations/reviews/batch-7R-conformance.md finding 7).",
"",
"**The decisions.** A numeral's type (explorations/coordinator/POSITIONS.md, 2026-09-27): \"walk needs to be corrected and switched to using IntLiteral\"; the one library takes the compiler library's IntLiteral, \"a numeral's own type that each number type converts from\", the implementers' later word weighing more than the unfinished text; the changed interpreter outputs measured first; \"Rows 79, 432, 437 and 443 are its measure.\" The numerics plans, decision 3 (2026-09-27): \"the one library and walk take the compiler library's sibling IntLiteral with its coercions\". The conversion rule (POSITIONS 2026-09-28, the two decisions of the conversion judgement, decision 1): a declaration that fits without a conversion runs before one that needs one, so ee(5) takes the plain declaration over Any and prints 2 (row 79's pair; explorations/reviews/option-2-soundness/O2Pos.fss, 2 on every build), and plain declarations are unchanged. The exactValue requirement (the judgement's section 7, taken as its default and listed for Pavol's review): x = 0 answers correctly after the switch, by one of the library's devices, each listed with the others and measured by probe Q: a numeral case in exactValue, the one library's own typecase; Number's = promoting to the narrowest common type, Julia's way, instead of QQ; or the compiled library's shape, no catch-all = on Number, each number type declaring its own and equality of other values coming from Equality[\\T\\] comprises T (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:96, the = arms of each type; Library/CompilerAlgebra.fsi:24-26). The correct answer now; the shape's cost (two rational conversions per i = 0 by exactValue's route) is a row this rung opens for phase 6, since no performance decision is taken before microGPT runs compiled (POSITIONS 2026-09-19). A size used as a value (POSITIONS 2026-09-28, 19:17 UTC, item 25): it converts as a numeral does; if the switch gives walk's size value the numeral's type, row 486's binding answers and rung K's expected-failure test is promoted. Answer 8 (2026-09-26): integer literals coerce into RR64; under route A (2026-09-24) each wider type declares its coerce. Under Q1 = (1), walk's default as above. The library's practice (2026-09-19) and the library route (2026-09-21): the compiler library is not edited. Not this rung's: FloatLiteral (the decision names the integer numeral; row 454's RR32 half); the compiled cast's failure to match (row 426, fixed by batch 6.5's rung G); whether \"exact\" in answer 8 excludes a numeral above 2^53 (parked; the coercion rounds once); a type parameter's coercion in the checker (row 437's checker half); the fast shape of the = family (phase 6).",
"",
"**What the libraries and the tree already do.** Evidence, not the brief; the rung lists every way before it chooses.",
"- The compiler library's model (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390-429): trait IntLiteral extends { Number, Equality[\\IntLiteral\\] } excludes {ZZ32, ZZ64, NN32, RR64, RR32, Character, Boolean, String, NN64, ZZ} with abstract getters asZZ32, asZZ64, asNN32, asZZ, asNN64, asRR64, its own arithmetic, comparison and bit operators, its own MIN, MAX and MINMAX (:425-427), and a coerce(x: IntLiteral) on ZZ, ZZ64, ZZ32, NN32 and NN64 (:104, :148, :211, :274, :333), none on RR64 (row 442). It declares no = on Number (:96); each number type and IntLiteral declares its own.",
"- The plan-6.5 probe's patches (explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch, numeral-lib-A1.patch, numeral-lib-B.patch, numeral-java.patch) are a measurement, not a proposed edit: object IntLiteral extends Number, Number's comprises clause taking it, ZZ32's giving it up, a coerce(x: IntLiteral) on ZZ32, ZZ64, NN32, NN64, ZZ, QQ and RR64, the team's arithmetic block enabled, five conversion natives beside the team's IntLiteral natives (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java), and FIntLiteral.make returning an IntLiteral for every numeral.",
"- The flat tower's pattern: a number type with arithmetic carries its algebra at its own type (RR64 and QQ extend AdditiveGroup and MultiplicativeRing at their own type; FACTS.md, \"The one library's number tower is flat\"); SUM is generic over AdditiveGroup[\\T\\].",
"- The one library's = family: the top-level opr =(a: Any, b: Any), Number's = and per-type = on RR64, QQ, NN64, ZZ32, ZZ64 and IntLiteral (explorations/reviews/conversion-overloading-ways.md section 5); z + w reaches ZZ64's own + because no declaration fits without a conversion.",
"- The library's devices for a number of a known type: a typed binding converts (rung C); x.zero and x.one need an element in hand; widen, unsigned, big name a fixed type (evidence B section 6.2); rung J's ZZ32 point operators beside the generic ones, \"so that a numeral meets a ZZ32 parameter and the library's coercion\" (explorations/compile-ladder/rung-ranges-zz32/REPORT.md section 4).",
"- The team's tests on numerals: ProjectFortress/tests/NumeralTest.fss, litCoercion.fss, and XXXextendIntLiteral.fss, which asserts that a program cannot extend IntLiteral: the object form keeps it an expected failure, a trait form would turn it green.",
"- Walk's conversion at a declared return type is switched off at Simple_fcn.check (:42-45); its expected failure is ProjectFortress/tests/XXXCoercionReturnRungC.fss (row 387); rung C's typed-binding conversion is Coercions.coerceToDeclared (Coercions.java:124).",
"",
"**The evidence on file.** Probe Q's measurement (section 6), the switch as a walk shadow on the tree after run 1 over every file of ProjectFortress/tests/, the demos and the two microGPT checks, with the chosen = device and the two strides among what it shows: to be written here before the launch, with any real choice it finds brought to Pavol first.",
"",
"**The test, first.** In ProjectFortress/tests/, each captured failing on the base and passing after:",
"- XXXCoercionReturnRungC.fss promoted by git mv to a plain name (row 387): the rung takes walk's conversion at a declared return (section 1 reads it so, and the library needs it under the switch, getter zero(): ZZ32 = 0); it fails on the base as a plain test and passes after.",
"- One new test in the form of ProjectFortress/tests/roundBug.fss, each assertion citing its source: typecase 7 answering the specification's branch, other beside a ZZ32 clause, and ee(5) taking the declaration applicable without coercion (row 79); s: RR64 = 3000000000 holding a float (row 443); a: NN32 = 3 and a: NN64 = 3 (row 454); x = 0 and x =/= 0 for a ZZ32, a ZZ64 and an NN32 x, each true where the values are equal, and the same inside a generic body (the exactValue requirement); b MAX 1 for an NN32 and an NN64 b, answering at the receiver's type, and ZZ32's b MAX 1 (row 484's numeral half after rung M); SUM <|1, 2, 3|> (row 432, if the rung's device carries it); matrix(v) for NN32 elements (row 437's walk half); the empty SUM and PROD over ZZ32, ZZ64 and NN32 through the identity functions as rung G left them (answer 7); twice(3, 4), lohi(2, 46) and widen(0) under Q1's default; row 401's shape with an untyped numeral binding passed to a ZZ32 parameter of a generic, as microGPT's heads passes blockSize; a numeral stride, seq(3:0:-1), as the library's two strides write it; and 3 + 4, 2147483647 + 1 with numeral operands and with ZZ32 operands, each value with its type.",
"- Rung K's row-486 test promoted by git mv if the switch repairs the binding; otherwise it stays an expected failure and the report says why.",
"- On the checker, the count stage and the distance stage after the edit, each through run_bg, captured and compared with the last landed gate's tables (run 1's), as \"The checker count\" below says.",
"",
"**What it writes.** The one library's IntLiteral as the compiler library's sibling, with its coercions, its exclusions (QQ among them) and the declarations its arithmetic needs; the chosen device for Number's =; walk's numeral; walk's default under Q1 in EvaluatorBase.inferAndInstantiateGenericFunction and OverloadedFunction.bestMatchWithCoercion as rung K left them; the library's numeral sites that the switch breaks, each respelled with the library's own devices and listed with its before and after; the literals section's numeral passage (Specification/basic/expressions/literals.tex:83-96, :127-148) and the sentence of the coercion chapter's note that says the interpreter does not yet convert a numeral outside ZZ32 (Specification/basic/conversions-coercions.tex:74-88), each in the S1 form with its Appendix I entry, inserted after rung T's; the tests; its report, record and decision record.",
"",
"**The comparison.** As rung K's: every file of ProjectFortress/tests/ in three passes, the same runner and normalisation, XXXInheritedOverload.fss unstable; every changed output listed with its cause against probe Q's list. The two microGPT checks from an empty cache, 40 of 40 with their printed values unchanged. The demos, one pass before and one after, cut at 120 seconds. The specification's examples under SpecData/examples/ that hold an integer numeral, under walk before and after, reported, not gated. The machine line on every capture; pass caches deleted once captured; df read before each pass.",
"",
"**What it clears.** On the checker, measured by the shadow on the switch's library copy of 2026-09-27 under the rule: the switch's cost 3 errors under any (1,404 against 1,401), microGPT's own errors unchanged on the copy with ranges over ZZ32; on this batch's base, by arithmetic, fewer, since batch 7R's ZZ32 ranges take the numeral-only ranges by coercion and batch 7's rung B has bounded the 24 IntLiteral natives' result. Under walk nothing is measured: probe Q gives the changed outputs.",
"",
"**Files it may touch.**",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss: IntLiteral and its members, NN32's coercions.",
"- Library/FortressLibrary.fsi and .fss: Number's comprises clause, its = and exactValue as the chosen device needs, ZZ32's comprises clause, a coerce(x: IntLiteral) in each of ZZ32, ZZ64, NN64, ZZ, QQ and RR64, ZZ32's comparison operators if the rung states them on ZZ32 itself, and the numeral sites the switch breaks, each named (the identity functions among them, as batch 6.5's rung G left them). Not the headers of AnyIntegral and Integral (batch 7's rung H), fail and StandardMinMax (rung B), the fill and tabulate members (rung A), rung M's declarations, RR64's header (batch 6.5's rung V, if its second run has landed first), or any declaration batch 7b's rung L names.",
"- Any other library file whose numeral site the switch breaks, found by the rung's comparison and named.",
"- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java (make), ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java, Simple_fcn.java's return check (or the site the rung finds for row 387), and EvaluatorBase.java's and OverloadedFunction.java's methods rung K edited, for walk's default only.",
"- Specification/basic/expressions/literals.tex, the note and the paragraph named; Specification/basic/conversions-coercions.tex, the one sentence named; Specification/appendices/changes.tex, its new subsection.",
"- The new test, the promoted ones; its own directory.",
"- Not: Library/CompilerLibrary.*, Library/CompilerAlgebra.*, ProjectFortress/LibraryBuiltin/Compiler* (POSITIONS 2026-09-21, the library route); the checker; Specification-1.0-frozen/; explorations/run-c4/ and explorations/apl/.",
"",
"**Java or Scala.** Java. ant compileAll, default_repository/caches/global.map restored after it, the interpreter's caches wiped before every run.",
"",
"**The checker count.** Reported: the FortressBuiltin and FortressLibrary apis change. Before: the last landed gate's checker-count.txt and distance.txt with its per-site list distance-sites.tsv (run 1's, climb-batch-N/gate/, the newest on the base), not a run of the stages on the rung's unchanged base; after: both captured on the rung's tree and declared with the distance stage's totals (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken; the intro says when the base has changed under the table).",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict other than those the comparison accounts for; XXXextendIntLiteral.fss an expected failure; FlatTowerRungF.fss, FixedWidthOverflowRungB.fss, IntSemanticsRungI.fss, WrapOperatorsRungD.fss; rung K's and rung M's tests; the two microGPT checks at 40 of 40 with unchanged values; every compiled test (the compiler library is untouched).",
"",
"**Stops.**",
"- A changed walk output that the comparison does not account for against probe Q's list.",
"- A changed value printed by either microGPT check, or any line of explorations/run-c4/src/ or explorations/apl/mg/ (shown to Pavol as a diff first, POSITIONS 2026-09-19).",
"- A team test line changed, or an expected failure of the team's turning green (XXXextendIntLiteral.fss among them).",
"- A comparison of numbers answering differently from the base where the values are equal (the exactValue requirement).",
"- A new checker error the distance stage shows as caused rather than unmasked, which the report does not account for.",
"- An edit to the compiler library, the checker, Specification-1.0-frozen/, or a declaration another batch's rung owns (above) beyond a numeral site the switch breaks, unreported.",
"- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The new test's assertions red on the base and green after; walk against the compiled run on the same numerals (typecase 7, ee(5), s: RR64 = 3000000000, the empty sums, x = 0) with the compiler library, and against the checker's view on the one library; the = device against the others listed; each respelled library site against its before, value by value; each changed output against probe Q's list; the distance tables; the microGPT checks' values; the specification text against the library as landed.",
"",
"**What comes back to Pavol.** The changed outputs with their causes; the library sites respelled; whether IntLiteral is an object or a trait and what algebra and exclusions it carries; the device chosen for Number's =, with the others; the specification's new text as a pdftotext diff.",
"",
"**What it closes.** Rows 79, 443 and 387 (fixed); row 454's integer half; row 432 if the new test carries it; row 437's walk half, its checker half left open with the reason; row 486 if the switch repairs it. Opens: the = shape's cost for phase 6 (home 3, a performance row with no gated test, the correct answer being gated). Notes appended to rows 318 and 442 (the compiler library's model is the one library's now; both close at the switch-over). Batch 6.5's question 1 is answered.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-27 numeral's type: The decision this rung builds: walk switched to IntLiteral, the one library taking the compiler library's; rows 79, 432, 437 and 443 its measure.",
"- positions:2026-09-27 numerics plans: Decision 3: the one library and walk take the sibling IntLiteral with its coercions; the switch you land.",
"- positions:2026-09-28 two decisions of Fable's judgement: The conversion rule: a declaration that fits without conversion runs first, so ee(5) takes the Any arm and x = 0 reaches Number's =; and the exactValue requirement.",
"- positions:2026-09-28 size used as a value: Pavol's decision on item 25: a size used as a value converts as a numeral does; if your switch gives walk's size value the numeral's type, row 486 closes.",
"- positions:2026-09-26 answer 8: Answer 8: integer literals coerce into RR64, exact; each wider type declares its coerce.",
"- positions:2026-09-26 answer 7 catch-all: Answer 7: the identity functions pass numerals through cast; the numeral half of row 426 is yours.",
"- positions:2026-09-24 exclusion route rung P's fork: Route A: each number type carries its own algebra and converts from the narrower ones by coerce; the tower your rule converts within.",
"- positions:2026-09-19 answering the open question: The library's own practice is the standard: a device the library already uses beats a new one; name the precedent for each choice.",
"- positions:2026-09-21 library route: The library route: the compiler library is not edited, and it is the model the one library takes.",
"- positions:2026-09-19 on the FlatArrays review: That's not Fortress: no microGPT line changes; a changed model line is a stop, shown to Pavol as a diff.",
"- positions:2026-09-22 a design principle: The JVM principle, Java's default where it makes sense: the ground on which Q1's default, ZZ32 for a numeral nothing else fixes, is read.",
"- positions:2026-09-26 climb batch 4's held push: Rung C's held push and the masks: Java line numbers and identity hashes are masked in every comparison you run.",
"- positions:2026-09-26 climb batch 5 (coordinator: Batch 5's comparison masks, its Q2; your corpus comparison normalises the same way.",
"- positions:2026-09-26 S1: The S1 form for your literals and coercion passages: text in place, callout, Appendix I entry.",
"- positions:2026-09-26 first of the batch-5 answers: The unrevised copy is the Working Draft of February 2011; quote originals from it.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your count's and distance's before: the last landed gate's tables and its distance-sites.tsv, not a run of the stages on your unchanged base; capture only the after.",
"- positions:2026-09-27 launch of phase 3's batches: The standing go for phase 3's batches; it launched this run, and nothing in it is yours to re-ask.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run.",
"- ledger:79: Row 79, typecase and dispatch on a numeral split between the paths; you fix it.",
"- ledger:443: Row 443, s: RR64 = 3000000000 refused under walk; you fix it.",
"- ledger:454: Row 454, a numeral refused for NN32 and NN64; you fix its integer half.",
"- ledger:387: Row 387, walk's return conversion switched off; you switch it on, the library needs it under the switch.",
"- ledger:426: Row 426, cast on the compiled path, fixed by batch 6.5's rung G; the identity functions it left must keep converting their numerals under your switch.",
"- ledger:432: Row 432, SUM over numerals under walk; closed if your IntLiteral carries the algebra.",
"- ledger:437: Row 437, matrix(v)'s numeral for NN32 elements; you fix the walk half.",
"- ledger:401: Row 401's shape, a numeral binding passed to a ZZ32 parameter of a generic; your test asserts it under walk.",
"- ledger:325: Row 325, an older numeral row; read so your switch does not reopen it.",
"- ledger:318: Row 318, the compiler library's model; a note appended that the one library takes it now.",
"- ledger:442: Row 442, the compiler library's missing RR64 coerce from IntLiteral; the one library declares it, a note appended.",
"- ledger:484: Row 484, fixed by rung M; after the switch its numeral cases need IntLiteral to exclude QQ.",
"- ledger:485: Row 485, a size in a range, settled; your switch keeps it converting to ZZ32.",
"- ledger:486: Row 486, walk refusing u: NN32 = n; rung K's XXX test is yours to promote if your switch repairs it.",
"- doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type: The plan-6.5 probe: where the switch stops under models A0, A1 and B; the sites you meet first.",
"- doc:explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch: The probe's library half, a measurement, not your edit; the declarations it wrote.",
"- doc:explorations/compile-ladder/plan-6.5/probes/numeral/numeral-java.patch: The probe's Java half: FIntLiteral.make and the conversion natives.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#7. The findings that stand under every way: The exactValue requirement and its devices: x = 0 must answer correctly after your switch.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#6. Question B, row 484: Row 484 after rung M, and the library's own 0 MAX (index - 1) your switch meets.",
"- doc:explorations/reviews/conversion-overloading-ways.md#5. What the library already does in the same family: The = family and its catch-alls, and why the switch reaches Number's =; the devices you choose among.",
"- doc:explorations/reviews/option-2-soundness.md#5. Numerals and rung Q: The numeral cases under the rule: ee(5) prints 2, a numeral converts only for the chosen declaration.",
"- doc:explorations/reviews/before-n-questions.md#B.4 Rung Q, by reading: What your switch meets at MAX, and the condition that IntLiteral exclude QQ.",
"- doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value: Why a size used as a value converts as a numeral; walk's half of it may be your switch's.",
"- doc:explorations/reviews/batch-7R-conformance.md#Findings@The one library writes two numeral strides: The two numeral strides your switch meets at a generic stride parameter.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#3.1 Where a numeral gets: Where the checker gives a numeral its type; unchanged by you.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#4.1 A numeral's run-time type: Where walk gives a numeral its type; FIntLiteral.make, which you change.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#5. The compiler library: The compiler library's IntLiteral model in detail; the sibling you copy.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#6.2 The library's devices for a number of type T in generic code: The library's devices for a number in generic code; your respellings use them.",
"- doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#7.1 Where a numeral meets a non-: Where microGPT's numerals meet a non-ZZ32 type; your comparison's microGPT check.",
"- doc:explorations/reviews/inference-rule-shadow.md#2.3 Fable's one-shape cases: The one-shape cases on the checker; your test's walk counterparts.",
"- doc:explorations/reviews/inference-rule-shadow.md#3. microGPT and row 401: MicroGPT under the switch on the checker; the values your microGPT check must keep.",
"- doc:explorations/reviews/inference-rule-shadow.md#4. The distance: The switch's cost on the checker, 3 errors under the rule; your distance run's expectation.",
"- doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets: What the rule leaves out; stay inside it.",
"- code:Specification/basic/expressions/literals.tex#Numeric literals in Fortress are referred to as..and rational numbers (for compound numerals).: The literals section's numeral passage, a numeral's own type and its note; you revise the note and the paragraph.",
"- code:Specification/basic/conversions-coercions.tex#revision{revival-int-float}: The coercion chapter's note on the interpreter's numerals; you revise its one sentence.",
"- doc:Specification/appendices/changes.tex#Integers in floating-point expressions: The entry of that note; your entry follows its form.",
"- doc:Specification/appendices/changes.tex#Passages not yet revised: Where your Appendix I entry goes, after rung T's.",
"- code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends: The compiler library's IntLiteral, the model: its exclusions, getters, arithmetic, MIN and MAX.",
"- code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral extends: The one library's IntLiteral api today; you replace it.",
"- code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#object IntLiteral extends ZZ32: Its component, with the arithmetic withheld until coercion; you enable what the switch needs.",
"- code:Library/FortressLibrary.fss#opr =(self, other:Number):Boolean =: Number's =, which x = 0 reaches after the switch; one of the devices changes it.",
"- code:Library/FortressLibrary.fss#exactValue(x: Number): QQ =: exactValue, whose else answers Ratio(0, 0) for a numeral; one device adds a numeral case here.",
"- code:Library/CompilerAlgebra.fsi#trait Equality: The compiled library's Equality comprises T, the device with no catch-all =; one of your choices.",
"- code:Library/FortressLibrary.fsi#stride:I): Range: The generic strided operator the library's numeral strides reach; where a ZZ32 form beside it would go.",
"- code:Library/FortressLibrary.fss#The identity of + and of juxtaposition for the number type named by the..multiplicativeIdentity[: The identity functions and their cast of a numeral, as batch 6.5's rung G left them; row 426's numeral half.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java#public static FValue make(BigInteger v): FIntLiteral.make, walk's numeral by magnitude; you make it an IntLiteral.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java#protected FValue check(FValue x): The return check with its Jam on; you switch the conversion on (row 387).",
"- doc:ProjectFortress/tests/XXXCoercionReturnRungC.fss: Row 387's expected failure; you promote it by git mv.",
"- doc:ProjectFortress/tests/NumeralTest.fss: The team's numeral test; its lines must keep their verdict.",
"- doc:ProjectFortress/tests/litCoercion.fss: The team's literal coercion test; its lines must keep their verdict.",
"- doc:ProjectFortress/tests/XXXextendIntLiteral.fss: The team's expected failure that a program cannot extend IntLiteral; a trait form turns it green, a stop.",
"- A numeral's type depends on the path and on the library in scope: The fact your switch makes single; cite it.",
"- A numeral's value reaches the compiled world intact: How a numeral's value reaches the compiled path; the checker's view you keep.",
"- The replacement for SUM's and PROD's catch-all: Answer 7's identity functions and their numerals; row 426.",
"- The one library's number tower is flat: The flat tower IntLiteral joins as a sibling under Number.",
"- Under walk, the interpreter converts by coercion at its three kinds of type check: Rung C's conversions, through which a numeral converts after your switch.",
"- MicroGPT's own programs through the compiled checker against the one library: MicroGPT on the checker; its errors after the switch are counted by your distance run.",
"- The distance to the switch-over by root cause: The distance by root cause; classify each moved site.",
"- The specification never wrote static-argument inference: Why the literals section's numeral hierarchy is a note; you revise it.",
"- An XXX*.fss in the interpreter corpus IS a gated expected-failure test: Why a promoted XXX test must be renamed, and why XXXextendIntLiteral must stay failing.",
"- testSystem's four shards are one suite split by sorted index: How testSystem counts your new and renamed files.",
"- The interpreter's overload-ambiguity message names its two declarations: Walk's ambiguity message; a changed listing order is row 430, not a stop.",
"- Three heaps run the interpreter: The heaps your comparison runs under; set them as the gate does.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll, or the linker's state is lost.",
"- map:README.md#Touch this@Library/FortressLibrary.fss and the other: What else moves when you touch the library: Part IV, walk, the count stage.",
"- map:README.md#Touch this@interpreter/ (evaluator: What else moves when you touch walk's evaluator.",
"",
].join('\n')

const I_ENTRY = { id: 'I', slug: 'rung-inference-checker', path: '/home/user/fortress-infer', branch: 'wip/rung-inference-checker', tail: I_TAIL, expectedMinutes: 200, writesState: false, testIsStage: false,
    blurb: "the compiled checker infers a generic's static arguments with coercion, answer 8's promotion rule its number case and Q1's default for a numeral, chooses a declaration on its declared types before the promotion instantiates it, checks that a call has a most specific declaration, and keeps the expected type at a call written f(x) with a retry without it; rows 401 and 455, row 388's compiled half, the stock crash of a promoted generic; Scala.",
    briefing: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-28 probe K's item 9",
      "positions:2026-09-26 answer 8", "positions:2026-09-26 answer 9", "positions:2026-09-27 numeral's type",
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-19 answering the open question", "positions:2026-09-21 library route",
      "positions:2026-09-26 answer 12", "positions:2026-09-28 size used as a value", "positions:2026-09-22 a design principle",
      "positions:2026-09-22 on planning", "positions:2026-09-28 rungs re-running measurements", "positions:2026-09-27 launch of phase 3's batches",
      "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:401", "ledger:388", "ledger:455", "ledger:447",
      "ledger:484", "ledger:485", "ledger:488", "ledger:390", "ledger:391", "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule",
      "doc:explorations/reviews/conversion-overloading-judgement.md#4. Q1's default",
      "doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order",
      "doc:explorations/reviews/conversion-overloading-judgement.md#7. The findings that stand under every way",
      "doc:explorations/reviews/before-n-questions.md#A.1 What was run for question A, and why",
      "doc:explorations/reviews/before-n-questions.md#A.2 Why the checker's shadow takes the plain arm",
      "doc:explorations/reviews/option-2-soundness.md#2. Static and dynamic agreement",
      "doc:explorations/reviews/option-2-soundness.md#5. Numerals and rung Q", "doc:explorations/reviews/inference-rule-shadow.md#The answers",
      "doc:explorations/reviews/inference-rule-shadow.md#1. The edit", "doc:explorations/reviews/inference-rule-shadow.md#2. The probes",
      "doc:explorations/reviews/inference-rule-shadow.md#3. microGPT and row 401", "doc:explorations/reviews/inference-rule-shadow.md#4. The distance",
      "doc:explorations/reviews/inference-rule-shadow.md#5. The compiler's tests",
      "doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets",
      "doc:explorations/reviews/inference-rule-shadow/rule.patch", "doc:explorations/reviews/inference-rule-shadow/probes/RuleCRun.fss",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#3.2 How a static argument is inferred",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#3.3 Whether the expected type is used",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#3.4 Whether a coercion is considered while solving",
      "doc:explorations/reviews/numerics-plan-coordinator/measure-D.md#2.2 What else the kept context changes",
      "doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The checker's solver treats a parameter bounded by",
      "doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value",
      "doc:explorations/reviews/batch-7R-conformance.md#Findings@The one library writes two numeral strides",
      "doc:explorations/reviews/row-488-probe.md#What it means for batch N's rung I",
      "doc:explorations/compile-ladder/climb-batch-6.5/JUDGE-review.md#7. For Pavol, out of the loop",
      "doc:explorations/reviews/batch-6.5-review.md#Findings@Batch N's rung I describes the numeral tie wrongly",
      "doc:explorations/reviews/batch-6.5-review.md#Findings@Batch 6.5b's half of the record predates item 25",
      "doc:explorations/reviews/comprises-type-level-judgement.md#2. What was checked, and what was measured",
      "doc:explorations/reviews/comprises-type-level-judgement/probes/MeetViaExclusion.fss", "doc:Specification/basic/inference.tex",
      "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def checkApplicable(preCandidate: PreAppCandidate,..def checkApplicableWithoutInference(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#Type check the application of the given arrow candidates to the given args",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def moreSpecificCandidate",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(info, multi, infix, front::rest, true, true)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def inferStaticParams(fnType: ArrowType,",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala#def getType",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala#def getCoercionsTo(uu: Type)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala#def substitutableFor(t: Type, u: Type)",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral extends", "doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.fss",
      "doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.test", "doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.fss",
      "doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.test", "doc:ProjectFortress/compiler_tests/NatRtBigSize.fss",
      "Static arguments are inferred from the arguments alone, on both paths", "Keeping the expected type at a call written",
      "A numeral's type depends on the path and on the library in scope", "An inferred generic refuses a coercion that the method it forwards to accepts",
      "MicroGPT's own programs through the compiled checker against the one library", "The specification never wrote static-argument inference",
      "The true distance to the switch-over", "The compiled checker refuses a call whose most specific arm has a size the call cannot fix",
      "The compiled type checker checks nat and int static parameters", "An XXX compile test pinned by compile_err_contains whose program compiles",
      "The XXX expected-failure mechanism in compiler_tests", "ant compileAll deletes a tracked file", "The checker-count stage's table",
      "map:compile-path-walkthrough.md#How it walks the tree", "map:README.md#Touch this@scala_src/typechecker"],
    checks: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 answer 8",
      "positions:2026-09-27 numeral's type", "positions:2026-09-22 a design principle", "positions:2026-09-27 stops a batch record reserves", "ledger:401",
      "ledger:388", "ledger:455", "ledger:447", "ledger:484", "ledger:391", "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule",
      "doc:explorations/reviews/conversion-overloading-judgement.md#4. Q1's default",
      "doc:explorations/reviews/inference-rule-shadow.md#5. The compiler's tests",
      "doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets",
      "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def checkApplicable(preCandidate: PreAppCandidate,..def checkApplicableWithoutInference(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def moreSpecificCandidate",
      "doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.fss", "doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.fss",
      "An XXX compile test pinned by compile_err_contains whose program compiles"],
    expectedMoves: [] }

const K_ENTRY = { id: 'K', slug: 'rung-inference-walk', path: '/home/user/fortress-walkinfer', branch: 'wip/rung-inference-walk', tail: K_TAIL, expectedMinutes: 220, writesState: false, testIsStage: false, expectedCheckerCount: CHECKER_BASE,
    blurb: "walk infers a generic's static arguments with coercion at dispatch by the same rule, its coercion pass considers generic declarations, the declaration it chooses is re-instantiated by the promotion from run-time types, and a generic trait's coercion is applied; rows 389 and 388's walk half, row 486's expected failure; Java.",
    briefing: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-28 probe K's item 9",
      "positions:2026-09-26 answer 8", "positions:2026-09-26 answer 9", "positions:2026-09-27 numeral's type", "positions:2026-09-28 size used as a value",
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-19 answering the open question",
      "positions:2026-09-26 climb batch 4's held push", "positions:2026-09-26 climb batch 5 (coordinator", "positions:2026-09-22 on planning",
      "positions:2026-09-27 launch of phase 3's batches", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "ledger:388", "ledger:389", "ledger:432", "ledger:364", "ledger:430", "ledger:486", "ledger:390",
      "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule",
      "doc:explorations/reviews/conversion-overloading-judgement.md#3. Walk at run time",
      "doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order",
      "doc:explorations/reviews/before-n-questions.md#A.1 What was run for question A, and why",
      "doc:explorations/reviews/option-2-soundness.md#2. Static and dynamic agreement",
      "doc:explorations/compile-ladder/plan-n/probe-k/PROBE-K.md#6. The forks it meets", "doc:explorations/reviews/inference-rule-shadow.md#The answers",
      "doc:explorations/reviews/inference-rule-shadow.md#6. What walk would need",
      "doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets",
      "doc:explorations/reviews/inference-rule-shadow/probes/OneShapeW.fss",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#4.2 How a generic call's static arguments are inferred",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#4.3 Rung C's coercion at dispatch meets a generic callee",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#8. How the three interact: observations, with their sources",
      "doc:explorations/compile-ladder/rung-interp-coercion/REPORT.md#1. What changed",
      "doc:explorations/compile-ladder/rung-interp-coercion/REPORT.md#5. Decisions",
      "doc:explorations/compile-ladder/climb-batch-7R/JUDGE-review.md#5. Considered and left as ruled@Row 486",
      "doc:explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkNatType.fss",
      "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchInternal",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java#static SingleFcn coercionFor",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/NonPrimitive.java#public List<FValue> typecheckParams",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java#public static Set<FType> join(List<FValue> evaled)",
      "doc:ProjectFortress/tests/XXXCoercionGenericFnRungC.fss", "doc:ProjectFortress/tests/XXXCoercionGenericTraitRungC.fss",
      "doc:ProjectFortress/tests/roundBug.fss", "doc:explorations/reviews/before-n-questions/fork/OpAnyZW.fss",
      "code:ProjectFortress/tests/IntSemanticsRungI.fss#zz32Shown(v: Any): String",
      "Under walk, the interpreter converts by coercion at its three kinds of type check",
      "Static arguments are inferred from the arguments alone, on both paths",
      "An inferred generic refuses a coercion that the method it forwards to accepts", "A numeral's type depends on the path and on the library in scope",
      "The one library's number tower is flat", "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
      "testSystem's four shards are one suite split by sorted index", "The interpreter's overload-ambiguity message names its two declarations",
      "Three heaps run the interpreter", "ant compileAll deletes a tracked file", "map:README.md#Touch this@interpreter/ (evaluator"],
    checks: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 answer 8",
      "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:388", "ledger:389", "ledger:432", "ledger:486",
      "doc:explorations/reviews/conversion-overloading-judgement.md#3. Walk at run time",
      "doc:explorations/reviews/inference-rule-shadow.md#6. What walk would need", "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java#static SingleFcn coercionFor",
      "Under walk, the interpreter converts by coercion at its three kinds of type check",
      "An XXX*.fss in the interpreter corpus IS a gated expected-failure test"],
    expectedMoves: [] }

const T_ENTRY = { id: 'T', slug: 'rung-spec-inference', path: '/home/user/fortress-specinfer', branch: 'wip/rung-spec-inference', tail: T_TAIL, expectedMinutes: 110, writesState: false, testIsStage: false, landsOnlyWith: ["I"], expectedCheckerCount: CHECKER_BASE,
    blurb: "the specification's type-inference chapter, today notes only, written to rung I's rule in the S1 form (the choice of a declaration, then its instantiation, the numeral tie once), a size used as a value in the ranges section, answer 8's callout and Appendix I; lands only with I; no source and no test assertion.",
    briefing: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 answer 8",
      "positions:2026-09-26 answer 9", "positions:2026-09-27 numeral's type", "positions:2026-09-28 size used as a value",
      "positions:2026-09-22 a design principle", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
      "positions:2026-09-26 lineage note", "positions:2026-09-24 requirement on the plan", "positions:2026-09-26 number chapters under S2",
      "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:447", "ledger:425", "ledger:455", "ledger:401",
      "ledger:388", "ledger:485", "ledger:486", "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule",
      "doc:explorations/reviews/conversion-overloading-judgement.md#4. Q1's default",
      "doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order",
      "doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The checker's solver treats a parameter bounded by",
      "doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The specification's implicit bound stays",
      "doc:explorations/reviews/overloading-judgement.md#10. Left open for him@The implicit bound",
      "doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value",
      "doc:explorations/reviews/inference-rule-shadow.md#The answers", "doc:explorations/reviews/inference-rule-shadow.md#1. The edit",
      "doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#1.2 Static arguments, and the inference chapter the text cites",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#1.3 Coercion at a call and in a typed binding",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#2. The team's later Types chapter and the Types papers",
      "doc:Specification/basic/inference.tex", "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls", "doc:Specification/basic/trait-parameters.tex#Type Parameters",
      "doc:Specification/basic/expressions/ranges.tex#Ranges",
      "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
      "doc:Specification/appendices/changes.tex#The integer type of a range", "doc:Specification/appendices/changes.tex#Passages not yet revised",
      "doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form", "The specification never wrote static-argument inference",
      "The team's latest word on types", "Specification-1.0-frozen/ is byte for byte", "The specification's number chapters describe the flat library",
      "A generic object referenced without its static arguments is a static error on the compiled path",
      "Static arguments are inferred from the arguments alone, on both paths", "Keeping the expected type at a call written",
      "map:README.md#Touch this@Specification/ (the standard)"],
    checks: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-22 a design principle",
      "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-27 stops a batch record reserves",
      "positions:2026-09-28 size used as a value", "ledger:447", "ledger:485", "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule",
      "doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets", "doc:Specification/basic/inference.tex",
      "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
      "doc:Specification/appendices/changes.tex#Passages not yet revised",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form", "The specification never wrote static-argument inference"],
    expectedMoves: [] }

const M_ENTRY = { id: 'M', slug: 'rung-integer-minmax', path: '/home/user/fortress-minmax', branch: 'wip/rung-integer-minmax', tail: M_TAIL, expectedMinutes: 90, writesState: false, testIsStage: false,
    blurb: "each integer type, ZZ32, ZZ64, NN32, NN64 and ZZ, declares its own MIN, MAX and MINMAX, as QQ, RR64, the compiler library and the specification's ZZ do, so that walk answers b MAX 1 at answer 8's type; row 484; library only.",
    briefing: [
      "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 answer 8", "positions:2026-09-24 exclusion route rung P's fork",
      "positions:2026-09-19 answering the open question", "positions:2026-09-21 library route", "positions:2026-09-22 a design principle",
      "positions:2026-09-28 rungs re-running measurements", "positions:2026-09-27 launch of phase 3's batches",
      "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:484", "ledger:421",
      "doc:explorations/reviews/conversion-overloading-judgement.md#6. Question B, row 484",
      "doc:explorations/reviews/before-n-questions.md#Question B: b MAX 1",
      "doc:explorations/reviews/before-n-questions.md#B.1 Every walk result for question B",
      "doc:explorations/reviews/before-n-questions.md#B.2 Why + and <= answer where MAX does not",
      "doc:explorations/reviews/before-n-questions.md#B.3 The compiled checker, by reading",
      "doc:explorations/reviews/before-n-questions.md#B.4 Rung Q, by reading",
      "doc:explorations/reviews/before-n-questions.md#B.5 What option 1 would write",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
      "code:Library/FortressLibrary.fss#trait StandardTotalOrder",
      "code:Library/FortressLibrary.fss#opr MIN(self, other:QQ):QQ =..opr MINMAX(self, other:QQ):(QQ,QQ) =",
      "code:Library/FortressLibrary.fss#opr MIN(self, b:RR64):RR64 = asFloat..opr MINMAX(self, b:RR64)",
      "code:Library/FortressLibrary.fss#opr <=(self, b:ZZ64):Boolean = NOT..opr +(self,b:ZZ64):ZZ64 =",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object NN32 extends",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr MIN(self, other:ZZ64): ZZ64..opr MINMAX(self, other:ZZ64)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java#private static boolean noLessSpecific",
      "doc:ProjectFortress/tests/roundBug.fss", "code:ProjectFortress/tests/IntSemanticsRungI.fss#zz32Shown(v: Any): String",
      "The one library's number tower is flat", "Under walk, the interpreter converts by coercion at its three kinds of type check",
      "The interpreter's overload-ambiguity message names its two declarations", "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
      "testSystem's four shards are one suite split by sorted index", "The checker-count stage's table",
      "map:README.md#Touch this@Library/FortressLibrary.fss and the other"],
    checks: [
      "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 answer 8", "positions:2026-09-19 answering the open question",
      "positions:2026-09-21 library route", "positions:2026-09-27 stops a batch record reserves", "ledger:484", "ledger:421",
      "doc:explorations/reviews/conversion-overloading-judgement.md#6. Question B, row 484",
      "doc:explorations/reviews/before-n-questions.md#B.5 What option 1 would write", "code:Library/FortressLibrary.fss#trait StandardTotalOrder",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr MIN(self, other:ZZ64): ZZ64..opr MINMAX(self, other:ZZ64)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java#private static boolean noLessSpecific"],
    expectedMoves: [] }

const Q_ENTRY = { id: 'Q', slug: 'rung-numeral-type', path: '/home/user/fortress-numeral', branch: 'wip/rung-numeral-type', tail: Q_TAIL, expectedMinutes: 260, writesState: false, testIsStage: false,
    blurb: "the numeral's own type: the one library takes the compiler library's sibling IntLiteral with its coercions, walk gives every integer numeral that type and converts a body to its declared return type, Number's = answers a numeral, the library's numeral sites the switch breaks respelled; rows 79, 443, 387, 454's integer half; library, Java and specification.",
    briefing: [
      "positions:2026-09-27 numeral's type", "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement",
      "positions:2026-09-28 size used as a value", "positions:2026-09-26 answer 8", "positions:2026-09-26 answer 7 catch-all",
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-19 answering the open question", "positions:2026-09-21 library route",
      "positions:2026-09-19 on the FlatArrays review", "positions:2026-09-22 a design principle", "positions:2026-09-26 climb batch 4's held push",
      "positions:2026-09-26 climb batch 5 (coordinator", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
      "positions:2026-09-28 rungs re-running measurements", "positions:2026-09-27 launch of phase 3's batches",
      "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:79", "ledger:443", "ledger:454", "ledger:387",
      "ledger:426", "ledger:432", "ledger:437", "ledger:401", "ledger:325", "ledger:318", "ledger:442", "ledger:484", "ledger:485", "ledger:486",
      "doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type",
      "doc:explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch",
      "doc:explorations/compile-ladder/plan-6.5/probes/numeral/numeral-java.patch",
      "doc:explorations/reviews/conversion-overloading-judgement.md#7. The findings that stand under every way",
      "doc:explorations/reviews/conversion-overloading-judgement.md#6. Question B, row 484",
      "doc:explorations/reviews/conversion-overloading-ways.md#5. What the library already does in the same family",
      "doc:explorations/reviews/option-2-soundness.md#5. Numerals and rung Q", "doc:explorations/reviews/before-n-questions.md#B.4 Rung Q, by reading",
      "doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value",
      "doc:explorations/reviews/batch-7R-conformance.md#Findings@The one library writes two numeral strides",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#3.1 Where a numeral gets",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#4.1 A numeral's run-time type",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#5. The compiler library",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#6.2 The library's devices for a number of type T in generic code",
      "doc:explorations/reviews/numerics-plan-coordinator/evidence-B.md#7.1 Where a numeral meets a non-",
      "doc:explorations/reviews/inference-rule-shadow.md#2.3 Fable's one-shape cases",
      "doc:explorations/reviews/inference-rule-shadow.md#3. microGPT and row 401", "doc:explorations/reviews/inference-rule-shadow.md#4. The distance",
      "doc:explorations/reviews/inference-rule-shadow.md#7. What the rule does not reach, and the forks it meets",
      "code:Specification/basic/expressions/literals.tex#Numeric literals in Fortress are referred to as..and rational numbers (for compound numerals).",
      "code:Specification/basic/conversions-coercions.tex#revision{revival-int-float}",
      "doc:Specification/appendices/changes.tex#Integers in floating-point expressions",
      "doc:Specification/appendices/changes.tex#Passages not yet revised",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral extends",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#object IntLiteral extends ZZ32",
      "code:Library/FortressLibrary.fss#opr =(self, other:Number):Boolean =", "code:Library/FortressLibrary.fss#exactValue(x: Number): QQ =",
      "code:Library/CompilerAlgebra.fsi#trait Equality", "code:Library/FortressLibrary.fsi#stride:I): Range",
      "code:Library/FortressLibrary.fss#The identity of + and of juxtaposition for the number type named by the..multiplicativeIdentity[",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java#public static FValue make(BigInteger v)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java#protected FValue check(FValue x)",
      "doc:ProjectFortress/tests/XXXCoercionReturnRungC.fss", "doc:ProjectFortress/tests/NumeralTest.fss", "doc:ProjectFortress/tests/litCoercion.fss",
      "doc:ProjectFortress/tests/XXXextendIntLiteral.fss", "A numeral's type depends on the path and on the library in scope",
      "A numeral's value reaches the compiled world intact", "The replacement for SUM's and PROD's catch-all", "The one library's number tower is flat",
      "Under walk, the interpreter converts by coercion at its three kinds of type check",
      "MicroGPT's own programs through the compiled checker against the one library", "The distance to the switch-over by root cause",
      "The specification never wrote static-argument inference", "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
      "testSystem's four shards are one suite split by sorted index", "The interpreter's overload-ambiguity message names its two declarations",
      "Three heaps run the interpreter", "ant compileAll deletes a tracked file", "map:README.md#Touch this@Library/FortressLibrary.fss and the other",
      "map:README.md#Touch this@interpreter/ (evaluator"],
    checks: [
      "positions:2026-09-27 numeral's type", "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement",
      "positions:2026-09-22 a design principle", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "positions:2026-09-28 size used as a value", "ledger:79", "ledger:443", "ledger:454", "ledger:387",
      "doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type",
      "doc:explorations/reviews/conversion-overloading-judgement.md#7. The findings that stand under every way",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends",
      "code:Library/FortressLibrary.fss#opr =(self, other:Number):Boolean =", "code:Library/FortressLibrary.fss#exactValue(x: Number): QQ =",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java#public static FValue make(BigInteger v)",
      "code:Specification/basic/expressions/literals.tex#Numeric literals in Fortress are referred to as..and rational numbers (for compound numerals).",
      "A numeral's type depends on the path and on the library in scope"],
    expectedMoves: [] }

const RUNGS = RUN === 'first' ? [I_ENTRY, K_ENTRY, T_ENTRY, M_ENTRY] : [Q_ENTRY]
const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)

const INTRO_RUNG = {
  I: "I makes the compiled checker infer a generic's static arguments with coercion, answer 8's promotion rule its number case (the narrowest type every number argument converts into), and keep the expected type at a call written f(x), with a retry without it so that a binding's coercion still applies (POSITIONS.md, 2026-09-27, the numerics plans, decision 3); a declaration is chosen on its declared types and only then instantiated by the promotion, and a call with no most specific declaration is refused unless the tie is a numeral's (POSITIONS.md, 2026-09-28, the two decisions of the conversion judgement, decision 1).",
  K: "K makes walk infer a generic's static arguments with coercion at dispatch, by the same rule: the arguments whose declared types mention a static parameter fix it, the others are converted, and a parameter that stands alone takes the narrowest type its arguments convert into; its coercion pass considers generic declarations, the declaration it chooses is re-instantiated by the promotion from the arguments' run-time types, and a generic trait's coercion is applied (row 389).",
  T: "T writes the specification's type-inference chapter, today notes only, to the rule rung I builds, in the S1 form, the choice of a declaration first and its instantiation second, and writes Pavol's answer on a size used as a value into the ranges section; it lands only with I.",
  M: "M gives each integer type its own MIN, MAX and MINMAX, the library's device for row 484 (POSITIONS.md, 2026-09-28, the two decisions of the conversion judgement, decision 2).",
  Q: "Q gives a numeral its own type: the one library takes the compiler library's sibling IntLiteral with a coercion into each number type, walk gives every integer numeral that type and converts a body to its declared return type (row 387), Number's = answers a numeral correctly, and the library's numeral sites the switch breaks are respelled (POSITIONS.md, 2026-09-27, a numeral's type).",
}
const INTRO_STOPS = {
  I: "for I, a compiled test's verdict changing other than the two it promotes and its own, a new checker error the distance stage shows as caused and the report does not account for, a ladder file moving down, a ranking that lets a declaration needing a conversion win over one that fits the call as it is, an edit to the solver, to compiler/StaticChecker.java or to a file the count or distance stage shadows, any library, walk or specification edit, a binding chosen for a type parameter nothing at the call fixes other than today's, and a line of explorations/run-c4/src/ or explorations/apl/mg/",
  K: "for K, a changed walk output its comparison does not account for, a changed microGPT value, an overload set whose load-time verdict changes, an edit to bestMatchInternal beyond the re-instantiation of the declaration its subtyping pass chooses, or to the load-time check, unreported, and any edit under interpreter/glue/prim/, to FIntLiteral.java, or to the library, the checker or the specification",
  T: "for T, any edit under Specification-1.0-frozen/, normative text stating more than rung I builds or than both paths run today (an answer to the team's BottomType question among it), a passage whose new text neither the decisions nor I's section settles (reported, not chosen), an assertion changed in a re-anchored test, and a file another rung edits",
  M: "for M, a changed walk output other than a call of MIN, MAX or MINMAX now answering at answer 8's type, an overload set of the library that walk refuses after, a changed microGPT value or a line of explorations/run-c4/src/ or explorations/apl/mg/, and an edit to a declaration other than its fifteen, to the compiler library, walk, the checker or the specification",
  Q: "for Q, a changed walk output its comparison does not account for against probe Q's list, a changed microGPT value or any line of explorations/run-c4/src/ or explorations/apl/mg/, a team test line changed or a team expected failure turning green (XXXextendIntLiteral.fss among them), a comparison of numbers answering differently from the base where the values are equal, a new checker error the distance stage shows as caused and the report does not account for, and an edit to the compiler library, the checker, Specification-1.0-frozen/ or another batch's declaration beyond a numeral site the switch breaks, unreported",
}
const INTRO_LIFTED = {
  I: "I makes the checker accept calls it refuses today, refuses a call with no most specific declaration that it compiles today, changes the message of a call no attempt accepts, and promotes two expected-failure compiler tests (POSITIONS.md, 2026-09-27, the numerics plans, decision 3; 2026-09-28, the two decisions of the conversion judgement)",
  K: "K changes which static arguments walk infers and which arguments it converts at a generic call, re-instantiates a declaration bestMatchInternal chose, and promotes two expected-failure interpreter tests (the same decisions)",
  T: "T writes a chapter of the specification and revises a sentence of the ranges section (the same decisions, and 2026-09-28, a size used as a value)",
  M: "M adds fifteen library declarations that change the answers of MIN, MAX and MINMAX under walk (2026-09-28, the two decisions of the conversion judgement, decision 2)",
  Q: "Q changes the one library's declared numeral type and every integer numeral's run-time type under walk, declares IntLiteral as the compiler library does, changes the path of Number's = for a numeral, respells library numeral sites, and promotes expected-failure interpreter tests (POSITIONS.md, 2026-09-27, a numeral's type, and the numerics plans; 2026-09-28, the two decisions of the conversion judgement)",
}
const OVERLAP_RUNG = {
  I: "I edits, in ProjectFortress/src/com/sun/fortress/scala_src/, typechecker/impls/Functionals.scala (checkApplicable, checkApplicableWithInference, the checkApplication taking iargs with its ambiguity check, and new methods beside them, not its SCaseExpr case), typechecker/impls/Operators.scala (four cases of checkExprOperators), useful/STypesUtil.scala (moreSpecificCandidate), typechecker/CoercionOracle.scala and possibly typechecker/TraitTable.scala; and adds and promotes tests in ProjectFortress/compiler_tests/.",
  K: "K edits, in ProjectFortress/src/com/sun/fortress/interpreter/evaluator/, EvaluatorBase.java (inferAndInstantiateGenericFunction), values/OverloadedFunction.java (bestMatchWithCoercion, and the re-instantiation in bestMatchInternal), values/Coercions.java (coercionFor) and possibly types/FType.java; and adds two tests and promotes two in ProjectFortress/tests/.",
  T: "T edits Specification/basic/inference.tex, one sentence of Specification/basic/expressions/ranges.tex, the callout of Specification/basic-lib/basic-integers.tex, its subsection, two paragraphs of Passages not yet revised and one sentence of The integer type of a range in Specification/appendices/changes.tex, and the messages of tests whose citations its edits move; never Specification-1.0-frozen/ or Specification/fortress.pdf.",
  M: "M edits, in Library/FortressLibrary.fsi and .fss, three members each of ZZ32, ZZ64, NN64 and ZZ, and in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss three members of NN32; and adds one test in ProjectFortress/tests/.",
  Q: "Q edits IntLiteral and NN32's coercions in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss; in Library/FortressLibrary.fsi and .fss the comprises clauses of Number and ZZ32, Number's = and exactValue as its device needs, a coerce member in six number types, possibly ZZ32's comparison operators, and the numeral sites the switch breaks, each named; FIntLiteral.java, interpreter/glue/prim/IntLiteral.java, the return check of Simple_fcn.java and, for walk's default, the two methods rung K edited; Specification/basic/expressions/literals.tex, one sentence of conversions-coercions.tex and its subsection of changes.tex; and adds one test and promotes one or two in ProjectFortress/tests/.",
}

const BATCH_INTRO = [
  RUN === 'first'
    ? "This run is climb batch N, the inference rule with the numeral switch, as Pavol decided it on 2026-09-27 (POSITIONS.md, the numerics plans, the synthesis's decision 3, \"Agreed.\"), with the rule for conversions and overloading and row 484's library fix he accepted on 2026-09-28 (POSITIONS.md, the two decisions of the conversion judgement, 19:06 UTC), in its first run: the checker's rule, walk's rule, the specification's chapter and each integer type's own MIN, MAX and MINMAX. It runs after climb batches 7, 7R and 7C and batch 6.5's first run have landed. Its second run, batch Nb, rung Q, the numeral's own type, runs once this one has landed, because the switch under walk needs walk's rule in its worker's tree (the record's section 1)."
    : "This run is climb batch Nb, the second run of batch N, the inference rule with the numeral switch, as Pavol decided it on 2026-09-27 (POSITIONS.md, the numerics plans, the synthesis's decision 3, and a numeral's type), with the conversion rule of 2026-09-28: rung Q, the numeral's own type. Batch N's first run (rungs I, K, T and M: the checker's rule, walk's rule, the inference chapter and each integer type's own MIN, MAX and MINMAX) has landed before it, with I and K among its landed rungs, since the switch lands only with the rule on both paths.",
  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),
  "Each rung's section of the record opens with the answers of its section 1 that it follows; section 1's one question, Q1, is taken at its default (1), the numeral tie rule of the conversion judgement, listed for Pavol's review, and the coordinator writes another answer into those lines at launch only if he gives one.",
  "A rung that captures the checker count or the distance stage around its edit takes as its before the last landed gate's tables, the ones the gate itself compares against (checker-count.txt, distance.txt and its per-site list distance-sites.tsv in the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: batch 6.5's first run's climb-batch-6.5/gate/, count 75 and distance 626, for the first run; the first run's climb-batch-N/gate/ for the second), and does not run the stages on its unchanged base; it captures only the after, on its own tree. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, 2026-09-28, on rungs re-running measurements the landed gate had already taken).",
  "Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it (Pavol, 2026-09-28, the process review's measure 5): the worker reads that line before the entry and acts on it, and the skeptic, the repair round and the judges find the same lines in each tail of the record's section 7.",
  RUN === 'first' ? "A home-2 test is owed in the batch that measures the defect, even when a later rung or batch is planned to repair it (explorations/coordinator/climb-batch-workflow.md, the three homes). This run owes: K's expected-failure walk test of row 486 (u: NN32 = n for a nat n), the row's context measured by batch 7R and settled by Pavol's decision on a size used as a value; any defect a rung measures and does not repair gets its test in this run, not in run 2." : "A home-2 test is owed in the batch that measures the defect, even when a later rung or batch is planned to repair it (explorations/coordinator/climb-batch-workflow.md, the three homes): any defect Q measures and does not repair gets its test in this run.",
  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file another rung of the run owns, or a declaration section 4 of the record names as another batch\'s rung\'s.',
  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next run waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1); it leaves the files another rung edits, and the gather re-anchors those the same way after every rung is applied.",
  HAS_RUNG('T') ? "The gather's rules: T lands only if I lands, whatever the approved list says (T's landsOnlyWith); after both are applied, the gather checks every rule T's chapter states against I's landed tests and the refusals they pin, fixes T's text where the decisions settle a mismatch, and reports any other to the review as blocking." : '',
  "No rung commits Specification/fortress.pdf: after every rung is applied, the gather rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf), since a rung edits the specification and Part IV is rendered from the library's .fsi files, and removes the build's ignored products.",
  "The worktrees share one disk: a rung that runs the three-pass comparison over ProjectFortress/tests/ or a distance run deletes each pass's caches and each run's scratch directory under its tmp/ once the outputs are captured, and reads df before each.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5 to 7R.",
  "Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).",
].filter(Boolean).join(' ')
const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + (RUN === 'first' ? "No file and no declaration is shared among I, K, T and M. T's text states I's rule and lands only with it; after both are applied the gather checks T's chapter against I's landed tests. M's calls reach walk's coercion pass, which K edits, but M's declarations are plain and the conversion rule leaves plain declarations as they are; the merged gate runs M's test with K applied. On the checker, I's ambiguity check can report the MAX family's ties in the one library, which M's declarations resolve; each rung ties its own count and distance to its own edit. Batches 7, 7R, 7C and batch 6.5's first run have landed in the base: I edits no declaration of theirs (7R's rung J's SCaseExpr case of Functionals.scala lies below I's methods, its import at :15 moving them by one line); T revises the callout and the paragraphs of Passages not yet revised as 7R's rung U and 6.5's rung P left them, and inserts its Appendix I subsection after the last entry there; M's types are headers none of them edited. The checker count and the distance read I's and M's changes; K and T change nothing they read and predict the last landed total. The gather applies I, then K, then T, then M. The files every rung reaches are the three record files, folded centrally by the gather." : "Q is alone in this run. Batch N's first run has landed in the base: Q edits two methods rung K edited, for walk's numeral default only, edits the integer types rung M added members to without touching those members, may promote K's row-486 test, and inserts its Appendix I subsection after rung T's. Batches 7, 7R and 7C and batch 6.5's first run landed earlier: Q edits no declaration of their rungs beyond a numeral site the switch breaks, each named (the identity functions as 6.5's rung G left them among them); if batch 6.5's second run has landed, Q re-reads Number's comprises clause and its =, which its rung V edited. The checker count and the distance read Q's changes to the FortressBuiltin and FortressLibrary apis. The files Q reaches beside its own are the three record files, folded centrally by the gather.")
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
'1. Replace every literal <short hash> placeholder in the ledger, FACTS and the handover with the hash of the commit it refers to, from the gather stage\'s result below. Copy the gate\'s outputs into the tree first: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/ - the gate wrote them under tmp/, untracked, so that a run that stops before this stage leaves nothing untracked in the tree, and it committed nothing because the review was committing in this tree at the same time. Then add ' + GATE_DIR + '/summary.txt, ' + GATE_DIR + '/checker-count.txt, ' + GATE_DIR + '/distance.txt and ' + GATE_DIR + '/ladder/ to the same commit, and copy ' + LOG_DIR + '/distance/errors.tsv to ' + GATE_DIR + '/distance-sites.tsv and add it too: the distance stage\'s per-site list, which the next batch\'s count and distance rungs read as their "before" instead of re-running the stage on an unchanged base (POSITIONS.md, 2026-09-28, the entry on rungs re-running measurements). The checker-count and distance tables are the comparands the next batch\'s gate reads, so a batch that lands without them leaves the next gate comparing against older ones. Title it "Record the landed commits\' hashes and the gate summary". grep -rn "<short hash>" explorations/ afterwards must be empty, and the full gate logs under ' + LOG_DIR + '/ are NOT committed and never are.',
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
    'Steps 5 to 9 write into summary.txt: step 5 rewrites it, and steps 6, 7e, 8 and 9 append to it. A step whose output is all there is done: step 6 when the summary carries its # atomic lines (39 and one ABSENT line, or 42, as step 6 says), step 7 when ' + GATE_OUT + '/ladder/ holds ladder.tsv, microgpt-phase.md and the comparison, step 8 when checker-count.txt ends in its #shadow row and the summary carries the # checker lines, step 9 when the summary carries the # distance lines. Continue at the first of them not done; if one stopped partway, with some of its lines already in the summary, run again from step 5, which rewrites the file, so that no line lands in it twice; the distance stage itself is not run again for that, only its comparison.',
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
  if (!review) {
    return finish({ landed: false, reason: 'the second review returned nothing' })
  }
  // Pavol, 2026-09-29 (POSITIONS.md, a review that still blocks after its repair):
  // it does not hold a batch whose gate is green. The batch lands, and the
  // review's remaining findings go to the next batch and are listed for him.
  if (!review.approved) {
    log('The review still blocks after one repair (' + strings(review.blocking).length + ' finding(s)); by Pavol\'s rule of 2026-09-29 the batch lands on a green gate and they go to the next batch')
    report.reviewStillBlocking = strings(review.blocking)
    mergedItems.push(...numbered('review2-blocking', review.blocking))
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
