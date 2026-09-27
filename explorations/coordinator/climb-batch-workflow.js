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
// freed slot going to the next queued agent, FIFO. k is 3 in the first run (H,
// A, B), 4 in the second (S, C, W, L), 7 as one run: the queue sets the wall.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order
// only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction, never red) and
// expectedCheckerCrash (compared exactly with the table's #crash field; no
// rung of this batch declares one, so any change of the crash row is red).
// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; the
// script applies it after the scatter, so S, which names C, reaches the gather
// only when C is approved. briefing: the rung's mission briefing, which the
// planner writes from the record so that the agents learn in context what they
// were never trained on: the keys of
// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries
// (positions:DATE WORDS), gap-ledger rows (ledger:ROW) and earlier judges'
// rulings (doc:PATH#HEADING) the rung rests on; the notes already written on
// the subject, found through INDEX.md (doc:, index:); the specification's
// sections its subject touches (doc: on a .tex heading, code: on a passage);
// the library code that is the precedent for the same kind of problem
// (code:PATH#FROM..TO); and the FACTS.md entries and map rows and sections of
// its area; in reading order, decisions first. The rung worker reads it whole
// as its step 1. And checks, the sub-list of briefing that the skeptic, the
// repair round and the judges read as their step 1: the decisions and ledger
// rows their checks need, and the specification's sections and the precedent
// code those checks compare against. No key holds a double quote, backtick,
// dollar sign or backslash, since each is rendered in double quotes. H's, A's
// and B's lists are checked with the tool's --check to match exactly one place
// per key, on main at 205a68a0a (re-checked at each launch). S, C, W and L
// carry instead the facts field of the record's first draft, data the script
// does not read, until their briefings are written before the second run is
// briefed; until then their step 1 says the rung has no briefing (the record's
// section 8, item 4).
//
// Batch 7's values are CLIMB-BATCH-7.md, sections 3, 6 and 7. Each tail is that
// rung's section of section 3 word for word, with the record's code-span
// backticks dropped (this file carries none); ASCII only. S's, L's and B's
// sections open with their answers line (Q1, Q3; Q2; Q1), which the coordinator
// writes in at launch. Four things are set at launch and nowhere else: RUN
// (which run this is: 'first' is batch 7, rungs H, A and B; 'second' is batch
// 7b, rungs S, C, W and L; 'all' is the seven as one batch 7; the record's
// section 1, "Two runs of one record"), LEDGER_FROM (the first free ledger row
// at this run's launch; the block refuses to load while it is unset), H_RIDES
// (false if batch 6 landed without the errors rung H repairs), and P1_COUNT
// (each rung's predicted checker total, from probe P1 and the base's landed
// table; undefined declares none). Manifest order is the ledger numbering
// order: H, A, B in the first run, S, C, W, L in the second, S, C, W, L, H, A,
// B as one run; the scatter starts the longest expected first (A, H, B; L, W,
// C, S; L, A, W, C, H, B, S). No rung declares a ladder move. The base is
// <base>, passed at launch as args.base, not written here.
// ===========================================================================

const RUN = 'first'     // SET AT LAUNCH: 'first' (batch 7: H, A and B), 'second' (batch 7b: S, C, W, L) or 'all' (the seven as one batch 7); the record's section 1, "Two runs of one record"
const H_RIDES = true    // the record's section 1: rung H rides if the landed table still shows the 19 errors of its section 3; false drops it
const LEDGER_FROM = 456   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch (455 at e6de3f86a)
if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\'s launch')
const P1_COUNT = { S: undefined, C: undefined, W: undefined, L: undefined, H: undefined, A: undefined, B: undefined }   // SET AT LAUNCH from probe P1

if (!['first', 'second', 'all'].includes(RUN)) throw new Error('RUN is not one of first, second, all')
const BATCH = RUN === 'second' ? '7b' : '7'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-7.md'

const S_TAIL = [
"",
"## Your rung: S - the overloading chapters",
"",
"SLUG is rung-spec-overloading. WORKTREE is /home/user/fortress-ovspec, branch wip/rung-spec-overloading.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"S. The overloading chapters\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q1 = (a); Q3 = (a). (Section 1 of the batch record gives the questions and their options; where this section says \"under Q1 = (a)\" or \"under Q3 = (a)\", that text applies only while the coordinator has written that letter here.)",
"",
"**Read first.** Most of the knowledge base is not this rung's. explorations/coordinator/FACTS.md, the entries \"The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters\"; \"Measured by the overloading judgement on private library copies\"; \"The checker's return-type rule lets the more specific declaration choose its own instantiation\"; \"Specification-1.0-frozen/ is byte for byte the working draft of 2011-02-02\"; \"The team's latest word on types and on the exclusion rule is the unfinished restart\"; \"The specification states instantiation exclusion, and its refused examples are the library's shapes\"; \"Citing Specification/library/apis/*.tex as an independent standard is circular\", and the rest of its section \"The specification and the repository's lineage\" as far as it bears on the files above. explorations/coordinator/INDEX.md, the notes explorations/reviews/overloading-judgement.md, explorations/reviews/overload-static-params-ways.md, explorations/reviews/spec-change-form.md, explorations/reviews/spec-refused-examples-judgement.md, explorations/coordinator/spec-lineage.md, explorations/reviews/mie-probes/spec-sentences-dated.md, explorations/coordinator/CLIMB-BATCH-5.md. The map, explorations/coordinator/map/: spec-to-implementation.md (the chapters and the tower's layered picture, section 4) and design-intent-sources.md (where the team's rationale is written). The manifest entry carries the same list as its facts field.",
"",
"**The problem.** The specification says that declarations of one name may not differ in their static parameters: \"it is an error for their static parameters to differ (up to alpha-equivalence), or for one declaration to have static parameters and another to not have them\" (Specification/basic/overloading.tex:100-107), and again \"Overloaded declarations must have static parameters that are identical (up to alpha-equivalence) ... static parameters ... are ignored in the remainder of this chapter\" (Specification/advanced/overloading.tex:95-102). It says static parameters are inferred before a declaration's applicability is checked and before two declarations are compared (basic/overloading.tex:173-176, :292-295). Neither path has enforced the sentence: walk has accepted different lists since May 2007, and the compiled checker applies the 2011 paper's three rules, No Duplicates, Meet and Return Type, to domains read as existentially quantified over their static parameters (Papers/Types/rules.tick:158-180; ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:66-117); the library overloads across different lists throughout (FACTS.md, \"Measured by the overloading judgement on private library copies\", and \"The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters\"). The sentence is 2009 text that displaced the 1.0 release's section 15.6.1, which itself expected to be replaced once the checker existed; the team's 2012 restart of the specification dropped it (Documentation/Specification/Prose/Language/overloading.tick:100-114). The team's list of future work still carries the question (Specification/appendices/future.tex:236-266). Under Q1 = (a), a second passage: the specification gives an unbounded type parameter the implicit bound Object (Specification/basic/trait-parameters.tex:49-50), while the library is written, and walk and the gate's checker count read it, under Any (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzerUtil.scala:81-82; explorations/reviews/overloading-judgement.md section 10, item 4); and the rule that a function whose single parameter is a naked type parameter bounded by Any cannot be overloaded (advanced/overloading.tex:114-127) is checked only against a written Any.",
"",
"**The decisions.** Answer 9 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 9): the sentence goes; the specification is revised to the type group's 2011 model the checker runs, the original kept as superseded text in the S1 form. The checker keeps the paper's three rules with two changes: the return-type rule is checked over every instance, and two generic declarations in the more-specific relation agree on their static parameters position by position (Java's overriding rule; row 398). What the recommendation says the revised text states is explorations/reviews/overloading-judgement.md section 3.4 (the rules, the reduction of exclusion between two quantified domains through instantiation exclusion and the bounds, the positional rule, the three examples, the future-work entry and the decision record's contents); the wording is this rung's. Under Q1 = (a) (the judgement's section 10, item 4): the implicit-bound sentence says Any, and the naked-Any rule is stated as the checker applies it, with the library's value factory pair measured against it. Under Q3 = (a) (item 7): Naden's 2012 run-time instantiation restricted by the return type (Papers/RuntimeInstantiation/2012-6-15 return type instantiation restrictions.txt, RTRinstantionTheory.tex) is named in the decision record as the type group's fuller answer to the case the positional rule closes, implemented on neither path, as batch 5's rung S recorded the covariant keyword. The form is S1 (POSITIONS 2026-09-26, S1), as rung S of batch 5 used it: the normative text edited in place, a \\revision callout at each changed passage (Specification/fortress/fortress.tex:87), an Appendix I entry per change with the original quoted as \"the Working Draft of February 2011\" with its path and line in Specification-1.0-frozen/ (POSITIONS 2026-09-26, the first of the batch-5 answers), and the grounds of each change, with their sources, in a decision record in the rung's own directory. The later Types chapter is cited beside where it covers the topic (POSITIONS 2026-09-26, the lineage note): function types that hold generic and plain declarations together (Documentation/Specification/Prose/Language/types.tick:553-558, :794-801), a static parameter that appears in no parameter type dropped from the quantified type (:764-767), and under Q1 = (a) function types under Object but tuples not (:232-236).",
"",
"**What it writes.** First, before any edit, the list: every passage of Specification/ outside library/apis/ that states the sentence, its consequence that static parameters are ignored, inference of static parameters before applicability or comparison, or, under Q1 = (a), the implicit bound or the naked-Any rule; each with its file:line, what the decisions make of it, and whether it is revised now or left, with the decision or source that settles it. The scan covers at least the passages above, Specification/appendices/future.tex:259-266 and :288, and the calculi of Appendix A (Core Fortress with Overloading). Then:",
"- In basic/overloading.tex and advanced/overloading.tex: the sentence and its echo replaced by the model the decisions name, and the two \"inferred ... before\" passages rewritten so that inference instantiates the chosen declaration and does not precede the comparison.",
"- The examples, in the specification's own form, \"Not allowed\" beside the allowed repair (Specification/basic/traits.tex:286-292 is one): the paper's pair that the return-type rule refuses, a generic declaration beside a plain one with which declaration a call gets, and an override that reorders its static parameters. Each is the shape of a probe on file (explorations/reviews/overload-static-params-ways/: GenPlainRTR, GenPlainSub, PermuteReturn), so that rung C's tests check the same shapes.",
"- In appendices/future.tex: the relaxation marked done where it is listed, with Jan's array1 pair answered by the library's own factory (Library/FortressLibrary.fss:2245-2250 before batch 6; re-read on the base) and the exclusion question answered by the paper's reduction.",
"- In Appendix I (Specification/appendices/changes.tex): one entry per change in rung S's form, inserted as new subsections immediately after the subsection \"The calculi\" and before the first subsection batch 6's rung T added (\"The number types\" on T's branch; re-read on the base). Rung A inserts its one entry at a different place (section 4); neither edits the other's.",
"- The decision record, explorations/compile-ladder/rung-spec-overloading/decision-record.md: the sentence's date and author, the 1.0 section it displaced and that section's own expectation of replacement, walk since 2007, the paper, the restart, the way back (enforcing the sentence) with its price (179 library api pairs refused at the least, explorations/reviews/mie-probes/scope-call-site-dispatch.md), and under Q3 = (a) Naden's design.",
"- The front matter's paragraph (Specification/fortress/preamble.tex) only if it names a passage this rung revises.",
"Each changed example is written in its file's convention; an example generated from SpecData/examples/ is reported, not edited.",
"",
"**How it is checked.** No test can go red for a prose edit. The specification is built as rung S and rung T built it, with FORTRESS_HOME set to the worktree: ./ant genSource, then ./ant tex, in Specification/fortress/ (Specification/fortress/README:5-14; the build's history and fallbacks are in explorations/coordinator/CLIMB-BATCH-5.md section 3, S, \"How it is checked\"). Required: both targets on the base and after the edit, the four logs captured; pdftotext of the two PDFs diffed, showing only the revised passages, the callouts, the appendix entries and page shifts; git diff --stat showing only the listed .tex files. The rung does not commit Specification/fortress.pdf: rungs L, H and A change the .fsi files Part IV is rendered from, and rung A edits the specification too, so the gather rebuilds the PDF once on the merged tree (section 4).",
"",
"**Files it may touch.** Under Specification/, not Specification-1.0-frozen/: basic/overloading.tex, advanced/overloading.tex, appendices/future.tex, appendices/changes.tex (its entries, at its place), fortress/preamble.tex (only as above), under Q1 = (a) basic/trait-parameters.tex, and whatever else its list finds; its own directory. Not: Specification/fortress.pdf (the gather's); advanced/parallelism-locality/arrays-distributed.tex (rung A's); no source, library or test file.",
"",
"**Java or Scala.** Neither.",
"",
"**The checker count.** Unchanged by this rung: the stage reads the compiled checker and Library/, and this rung touches neither.",
"",
"**Stops.** Any edit under Specification-1.0-frozen/. Normative text for a rule neither path will run once rung C lands: the checker step the judgement's option 2 describes (a domain exclusion concluded because the only way two domains could meet contradicts a bound), which answer 9 declined; Naden's instantiation as a rule; the promotion rule for mixed widths (batch 8). An edit to a passage rung A owns, or to rung A's place in Appendix I. A passage whose new text neither the decisions nor the judgement's section 3.4 settle: the rung reports it and does not choose. The build changing a tracked file.",
"",
"**For the skeptic.** There is no program to run both ways. The checks: the list against the specification (every passage it should hold is on it, and nothing else is edited); every quoted original against git show <base>:<path> and against the frozen copy's line; the two builds and the pdftotext diff; each rule the text states against the paper (Papers/Types/rules.tick, overloading-check.tick) and against rung C's section of this record, since the gather checks it against the landed checker; each example's verdict against its probe's capture on file and against what rung C's tests assert.",
"",
"**What comes back to Pavol.** The revised pages, as the pdftotext diff; the Appendix I entries; the list, with what was left and why.",
"",
"**What it closes.** No ledger row. Notes appended: row 398, that the specification states the positional rule; row 412, under Q1 = (a), that the specification's implicit bound is now Any and the compile path's Object setting is the divergence.",
"",
].join('\n')

const C_TAIL = [
"",
"## Your rung: C - the return-type rule and the positional rule",
"",
"SLUG is rung-return-type-rule. WORKTREE is /home/user/fortress-rtr, branch wip/rung-return-type-rule.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"C. The return-type rule and the positional rule\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** None of section 1's questions changes this rung. (P1's result is written into \"The evidence on file\" before the launch.)",
"",
"**Read first.** Most of the knowledge base is not this rung's. explorations/coordinator/FACTS.md, the entries \"The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters\"; \"The checker's return-type rule lets the more specific declaration choose its own instantiation\"; \"The return-type rule now reads a size as it reads a type parameter\"; \"The compiled type checker checks nat and int static parameters\"; \"The hidden layer, classified\"; \"The true distance to the switch-over\"; \"Between the interpreter's library and bytecode stands the checker\"; \"The XXX expected-failure mechanism in compiler_tests/ and library_tests/\"; \"A thrown CompilerError takes a third path through the test harness\"; \"ant compileAll deletes a tracked file\", and the rest of its sections \"The checker and the one library\" and \"The harness and the gate\" as far as it bears on the files above. explorations/coordinator/INDEX.md, the notes explorations/reviews/overloading-judgement.md, explorations/reviews/overload-static-params-ways.md, explorations/perf-probes/prelude/switch-over-distance.md, explorations/perf-probes/nat/triage.md, explorations/coordinator/tools/checker-count/. The map, explorations/coordinator/map/: compile-path-walkthrough.md (the checker's section), modules-and-phases.md (scala_src/typechecker/) and README.md section 7, the scala_src/typechecker/ row. The manifest entry carries the same list as its facts field.",
"",
"**The problem.** Two defects of the compiled checker's overloading rules, both measured.",
"- The return-type rule solves the match of two declarations' domains once and checks that one instance (ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:81-117), where the paper requires it of every applicable instance (Papers/Types/rules.tick:174-180; the theorem at Papers/Types/overloading-check.tick:166-172). So the paper's own counterexample, a generic declaration returning its type parameter beside a plain declaration on a subtype returning that subtype, type-checks, and the JVM verifier then refuses the class, \"Bad return type\"; walk refuses the pair when it loads (explorations/reviews/overload-static-params-ways.md section 2.2, probe GenPlainRTR, and section 2.3, defect 2).",
"- An override whose return type reorders its own static parameters type-checks, and the compiled run dies with ClassCastException, because a call that writes its static arguments hands them by position to whichever declaration dispatch reaches (row 398; FACTS.md, \"The checker's return-type rule lets the more specific declaration choose its own instantiation\"; probes SubOvSwapTRun, explorations/compile-ladder/rung-nat-checker/probes/compile-probes.txt:29-33, and PermuteReturn); walk refuses the binding. The specification refuses the pair (Specification/advanced/overloading.tex:95-103, :158-170), and the paper accepts it, because it has no written static arguments (explorations/reviews/overloading-judgement.md section 8, first item).",
"Beside them, not this rung's repair: code generation fails for two generic declarations on a bare type variable, a duplicate class name or unreadable serialized data (defect 3; probes GenBoundedFix, GenBoundedFixU).",
"",
"**The decisions.** Answer 9 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 9): the checker keeps the paper's three rules with two changes, the return-type rule checked over every instance, and two generic declarations in the more-specific relation agreeing on their static parameters position by position, which closes row 398. The recommendation's description is explorations/reviews/overloading-judgement.md section 3.5; its account of one way to build the first change (the less specific declaration's parameters kept quantified except where the domains force an equality, as rung N already keeps a size, OverloadingOracle.scala:92-106) is one way among those the rung lists, not the brief. Not the checker step of the judgement's option 2 (an exclusion concluded from a bound), which answer 9 declined. Defect 3 gets a ledger row and an expected-failure compiler test; its fix is on phase 5's code-generation list (judgement section 3.7).",
"",
"**The evidence on file.** The four defects and their probes, explorations/reviews/overload-static-params-ways.md sections 2.2 and 2.3, with captures under explorations/reviews/overload-static-params-ways/. P1's measurement on the landed flat library: which library declarations each of the two rules, as the paper states them, newly refuses; to be written here before the launch (section 6). The compiler tests that declare a generic overload, 43 files listed in explorations/reviews/mie-probes/scope/compiler-tests.txt (scope-call-site-dispatch.md, the shadow's measurements), printed the same under the call-site shadow and route C's changes, which makes them the list to run before and after.",
"",
"**The test, first.** In ProjectFortress/compiler_tests/: an expected-failure compile test on GenPlainRTR's shape and one on SubOvSwapTRun's shape, each an XXX-named .test file driving compile and pinned by compile_err_contains on the refusal the rung's rule reports; today each compiles, so the harness reports the missing expected failure, and that capture is the recorded failure, as rung R's was. A plain link and run pair on GenPlainSub's shape (a generic declaration beside a plain one, the compiled run printing circle, generic, circle) and on a pair of generic declarations that agree position by position, which must compile and run before and after. And defect 3's expected failure on GenBoundedFixU's shape, asserting what the specification says (it compiles, links and prints its answer), which today dies at run time with \"Unable to read serialized data\": two .test files over one component, a plain one driving link and an XXX one driving run (home 2; the mechanics are FACTS.md, \"The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only, and a run-time defect needs two .test files\", and \"A thrown CompilerError takes a third path through the test harness, keyed on the tests= name, with check stream compile_exception_*\").",
"",
"**The measurements.** The checker count before and after; the distance stage's table before and after (section 8; until it exists, the measurement's driver, explorations/perf-probes/prelude/switch-over-distance/run-all.sh), its overloading and return-type rows with every newly refused library declaration named; the 85 files of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt under the subset driver, phase and stdout, before and after; the 43 generic-overload compiler tests and rung N's and rung Z's sized tests (NatInferredChecker, NatWrittenChecker, NatMethodChecker, NatExportChecker, the NatRt* tests and the expected failures beside them), before and after.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/scala_src/ (the checker files the fix needs, each named in the report); new files under ProjectFortress/compiler_tests/; its own directory. Stops: ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java (the checker-count tool keeps a copy checked against its checksum, explorations/coordinator/tools/checker-count/run.sh:36, and an edit makes the stage's #shadow row stale, which is red); Library/, ProjectFortress/LibraryBuiltin/, interpreter/ and Specification/.",
"",
"**Java or Scala.** Scala. ant compileAll, then the library-order cache rebuild before any compiled test.",
"",
"**The checker count.** To be measured by P1 on the landed flat library. If P1 finds no library declaration newly refused, predicted unchanged from the base's. The rung captures the table before and after and declares the total it measured; a change of the crash row is declared.",
"",
"**What must stay green, or keep its verdict.** Every compiler test; a verdict that changes is reported with its reason and is a stop unless it is one of the rung's own tests.",
"",
"**Stops.** The stop files above. A library declaration newly refused, unless P1's list names it and this section says whose repair it is. A compiled test's verdict changing other than the rung's own. A ladder file moving down. A walk edit. A rule beyond the paper's three and the positional rule, such as option 2's step. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The differential is walk against the compiled run on the probe shapes: GenPlainRTR and the reordering override are refused by walk at load or binding and now by the checker; GenPlainSub still compiles and prints circle, generic, circle, as walk will once rung W lands; a generic override that keeps its list (the library's map[\\R\\], ivmap[\\R\\], replica[\\U\\]) is still accepted. Each newly refused library declaration against P1's list. The positional rule against its statement in rung S's section.",
"",
"**What comes back to Pavol.** The two refusals' messages; any library declaration newly refused; any compiled test or ladder file that moved.",
"",
"**What it closes.** Row 398 (fixed). Rows it opens: defect 2, the return-type rule checking one solved instance (home 1, the rung's test); defect 3, code generation for two generic declarations on a bare type variable (home 2, the two .test files).",
"",
].join('\n')

const W_TAIL = [
"",
"## Your rung: W - walk's choice of declaration",
"",
"SLUG is rung-walk-dispatch. WORKTREE is /home/user/fortress-dispatch, branch wip/rung-walk-dispatch.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"W. Walk's choice of declaration\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** None of section 1's questions changes this rung. (P4's result is written into \"The evidence on file\" before the launch.)",
"",
"**Read first.** Most of the knowledge base is not this rung's. explorations/coordinator/FACTS.md, the entries \"The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters\"; \"Under walk, the interpreter converts by coercion at its three kinds of type check\"; \"Every functional-method name of the library is reserved in every program that imports it\"; \"The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program\"; \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\"; \"testSystem's four shards are one suite split by sorted index\"; \"Three heaps run the interpreter\"; \"ant compileAll deletes a tracked file\", and the rest of its sections \"Landed semantics\" and \"The harness and the gate\" as far as it bears on the files above. explorations/coordinator/INDEX.md, the notes explorations/reviews/overloading-judgement.md, explorations/reviews/overload-static-params-ways.md, explorations/repo-internals.md. The map, explorations/coordinator/map/: modules-and-phases.md (the interpreter's evaluator and dispatch), test-coverage.md (the interpreter corpus) and README.md section 7, the interpreter/ row. The manifest entry carries the same list as its facts field.",
"",
"**The problem.** Under walk, the choice between a generic declaration and a plain one depends on the order they were written. bestMatchInternal (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:856) instantiates each generic declaration at the arguments' types (:871-880, through EvaluatorBase.inferAndInstantiateGenericFunction) and keeps a candidate only when its domain is strictly more specific than the best so far (:888-891), so an instance whose domain equals a plain declaration's loses to whichever came first. The probe GenPlainSub, describe[\\T extends Shape\\](x: T) beside describe(x: Circle), prints generic three times under walk where the compiled run prints circle, generic, circle, and walk prints the compiled answer when the plain declaration is written first (explorations/reviews/overload-static-params-ways.md section 2.2 and section 2.3, defect 1; capture GenPlainSub.txt). This is the reading of a generic declaration as its instances, which the Types paper rejects (Papers/Types/introduction.tick:171-251). The load-time check that refuses generic declarations lacking an excluding pair of parameters (OverloadedFunction.java:416-425, :519-527) compares declared types; whether it reads a generic declaration the same way is the rung's to measure.",
"",
"**The decisions.** Answer 9 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 9): \"Walk dispatches by declared domains, which ends its dependence on declaration order.\" The recommendation: walk compares a generic declaration with another on their declared, quantified domains, not on the instance made from the arguments, in bestMatchInternal and its load check (explorations/reviews/overloading-judgement.md section 3.5, last item; section 3.7, defect 1); walk keeps its load-time check. The load check already compares declared parameter types, so whether it changes is the rung's to measure and report. Instantiation still happens for the declaration chosen. Not this rung's: how walk infers a generic declaration's static arguments (row 388's walk half is batch 8's), and whether walk follows decision 3 for an unused unknown size (waits for E3).",
"",
"**The evidence on file.** P4's logging pass: every call in ProjectFortress/tests/, the demos and the two microGPT checks where a choice on declared domains differs from today's choice, and every overload set whose load-time verdict would differ; to be written here before the launch (section 6).",
"",
"**The test, first.** One new file in ProjectFortress/tests/, in the form of ProjectFortress/tests/roundBug.fss (a component exporting Executable whose run() asserts), each assertion's message citing its source: GenPlainSub's shape twice, once with the plain declaration written first and once written second, each asserting circle, generic, circle (the compiled run's answer and the paper's). Captured failing on the base, where the second order prints generic three times. It is not an XXX file, and a file in that directory needs no .test file (FACTS.md, \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\").",
"",
"**The comparison.** Every file of ProjectFortress/tests/ except the new test runs under walk in three passes, base A, the edit, base B, one JVM per test with private caches, with rung O's runner and comparison (explorations/compile-ladder/rung-walk-overflow/count-run.sh, count-compare.py; its REPORT.md section 2). Normalised, and nothing else: Java line numbers in a printed stack frame, an object's identity hash, as batch 5 normalised (POSITIONS 2026-09-26, batch 5's go, Q2). ProjectFortress/tests/XXXInheritedOverload.fss is listed as unstable, citing row 430. Every changed output of a stable file is listed in REPORT.md and as a capture under probes/, each with the call whose chosen declaration changed, both declarations named, and the specification's answer. The two microGPT checks, explorations/run-c4/src/MicroGptFlatCheck.fss and explorations/apl/mg/MicroGptAplCheck.fss, each from an empty cache at FORTRESS_THREADS=1, before and after: 40 of 40 each, with their printed values captured. Every pass is headed by the machine line (explorations/protocol.md, principle 2). The pass caches under tmp/ are deleted once a pass's outputs are captured; df is read before each pass.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java and what else under ProjectFortress/src/com/sun/fortress/interpreter/ the change needs, each named, except interpreter/glue/prim/; the new test; its own directory.",
"",
"**Java or Scala.** Java. ant compileAll before the test can pass, and default_repository/caches/global.map restored after it (FACTS.md, \"ant compileAll deletes a tracked file\"). The interpreter's caches are wiped before every run.",
"",
"**The checker count.** Unchanged: the stage reads neither the interpreter nor the tests. The rung captures it before and after.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict; the library loads under walk; the two microGPT checks at 40 of 40 with unchanged values.",
"",
"**Stops.** A changed output or exit code that is not a call whose chosen declaration changed in the direction the decision gives. A changed value printed by either microGPT check. A generic declaration's inference changed beyond what the comparison needs. An overload set of the library or of a test that walk loads today and refuses after, or the reverse. A library, test or specification edit beyond the new test. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The differential is walk against the compiled run on GenPlainSub's shape in both orders, and on the library's own generic-beside-plain sets the comparison names; each changed output against its stated cause; the load-time verdicts before and after; the two microGPT checks' values. The compiled path runs its own prelude, so a program that answers differently there because its prelude lacks a declaration is not a finding.",
"",
"**What comes back to Pavol.** The changed outputs with their causes; the load-time verdicts that moved, if any; the two microGPT checks' result.",
"",
"**What it closes.** Row it opens and closes: defect 1, walk's order-dependent choice between a generic and a plain declaration (home 1, the new test).",
"",
].join('\n')

const L_TAIL = [
"",
"## Your rung: L - the overload families",
"",
"SLUG is rung-overload-families. WORKTREE is /home/user/fortress-families, branch wip/rung-overload-families.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"L. The overload families\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q2 = (a). (Under Q2 = (a) the rung chooses the seq family's device per pair and reports each choice as a decision; under Q2 = (b) the coordinator writes Pavol's device here.)",
"",
"**Read first.** Most of the knowledge base is not this rung's. explorations/coordinator/FACTS.md, the entries \"Measured by the overloading judgement on private library copies\"; \"The hidden layer, classified\"; \"The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters\"; \"The true distance to the switch-over\"; \"The compiled checker's exclusion rule is the designers'\"; \"The one library's number tower is flat\" (rung F's entry, folded at batch 6's gather); \"Every functional-method name of the library is reserved in every program that imports it\"; \"testSystem's four shards are one suite split by sorted index\"; \"The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program\", and the rest of its sections \"The checker and the one library\" and \"The library's arrays and algebra\" as far as it bears on the files above. explorations/coordinator/INDEX.md, the notes explorations/reviews/overloading-judgement.md, explorations/reviews/overload-static-params-ways.md, explorations/perf-probes/nat/triage.md, explorations/perf-probes/prelude/switch-over-distance.md, explorations/coordinator/tools/checker-count/, explorations/reviews/mie-probes/flat-world-for-users.md, explorations/repo-internals.md. The map, explorations/coordinator/map/: spec-to-implementation.md section 4 (the tower's layered picture), dormant-code.md (the library's commented-out declarations and \"not yet\" notes) and README.md section 7, the Library/FortressLibrary.fss row. The manifest entry carries the same list as its facts field.",
"",
"**The problem.** The compiled checker refuses these overload families of the one library. Counts are the judgement's, on the nested tower (explorations/reviews/overloading-judgement.md section 9); on the flat library, to be measured after batch 6 lands (P1):",
"- CAP, 12: ScalarRange[\\I\\] against Range2D[\\I,J\\] and Range3D[\\I,J,K\\] (Library/RangeInternals.fsi:46, :63-64, :98-99, :136, :191, :237); their domains exclude only through instantiation exclusion plus a bound, a step the checker does not take.",
"- The array MIN and MAX, 8: the scalar-extension block's opr MIN[\\T extends Number, I\\](x: Array[\\T,I\\], y: T) and its mirror and MAX (Library/FortressLibrary.fsi:2557-2560) against StandardMin's and StandardMax's functional methods (:185, :196): two open traits.",
"- String's juxtaposition, 3: String's declarations (FortressLibrary.fsi:2361-2363) against MultiplicativeRing[\\T\\]'s (:271); nothing declares String exclusive of AnyMultiplicativeRing.",
"- openRangeHelper, 3 (Library/RangeInternals.fsi:612-616): three declarations told apart only by the arrow type of a thunk, which the language itself calls ambiguous, since a function value can have several arrow types (Specification/basic/types-vals-vars.tex:400-403; Documentation/Specification/Prose/Language/types.tick:518-519).",
"- seq, 5: functional methods seq(self) of ReadableArray (FortressLibrary.fsi:1274), FilterGenerator (:2044) and SequentialGenerator (:763), open traits under Generator, so another component could declare a type extending two of them.",
"Under walk these families run today; the gap is the checker's. Not this rung's: CMP and MINMAX, the comparisons' and the tower's (rung H, batch 6's rung F); StandardMinMax's MIN and MAX, row 421 (rung B, batch 7); the Meet Rule pairs FORWARD_CMP, IN, map, ivmap (batch 8); fill (rung A).",
"",
"**The decisions.** Answer 9 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 9): \"The library's refused families are repaired by its own devices (125 to 113 measured on a copy).\" No checker change: the judgement's option 2, a checker step that concludes exclusion from a bound, was declined with answer 9 (explorations/reviews/overloading-judgement.md section 3.5, fourth item). The standard is the library's own practice (POSITIONS 2026-09-19). Under Q2 = (a), the seq family's device, exclusion or a declaration on the meet, is chosen per pair by the rung with the count in hand and reported as a decision with the other way (the judgement's section 10, item 6).",
"",
"**What the library already does in the same families.** Evidence, not the brief; the rung lists every way the language and the library offer before it chooses, the library's own first. Plain parent traits that exclude each other where a where-clause excludes cannot be written: Rank1, Rank2, Rank3, \"Potemkin exclusion traits\" (FortressLibrary.fsi:1074-1084), and AnyMaybe. An excludes clause against an algebraic marker, for the same reason, an array operator against an algebraic trait's method: Vector excludes { AnyMultiplicativeRing } (:1467). A type below two of the seq traits: SimpleSeqFilterGenerator extends FilterGenerator and SequentialGenerator and declares its own seq (FortressLibrary.fss:3524-3529 on the flat library). Names where arrows meet: the numbered open1Range, open2Range, open3Range beside openRangeHelper. A choice by typecase on a witness: array1's factory (FortressLibrary.fss:2245-2250, the specification's own example, Specification/appendices/future.tex:241-245; probe TypecaseWitness runs on both paths). The object witness is refused by the checker without option 2's step (NullaryObjWitness). The judgement measured one set of these on a nested-tower copy (section 9: 125 to 113, CAP 17 to 5 with the 5 left same-list pairs that the flattening removes, MIN, MAX and juxtaposition to 0; openRangeHelper and seq not measured). Walk's side: the probe DifferMIEPotemkin runs the CAP shape with plain exclusion traits on both paths (explorations/reviews/overload-static-params-ways.md section 2.2).",
"",
"**The test, first.** The manifest sets testIsStage: the recorded failure is the checker-count stage's table before the edit, where RangeInternals' CAP and openRangeHelper rows show, and the table after. Where the FortressLibrary api still stops before its overloading check on the base (it does until rung H lands), its families are measured by the distance stage's table before and after (section 8; until it exists, the measurement's driver, explorations/perf-probes/prelude/switch-over-distance/run-all.sh), each family's row named. Beside them, a new interpreter test in ProjectFortress/tests/, in the form of ProjectFortress/tests/roundBug.fss, written before the edit and passing before and after: each repaired family called under walk with today's values asserted (CAP on one-, two- and three-dimensional ranges, the array MIN and MAX against a scalar, String juxtaposition, openRange, seq on an array and on a filter generator).",
"",
"**The comparison.** As rung W's: three passes over ProjectFortress/tests/ with rung O's runner, the same normalisation, XXXInheritedOverload.fss listed as unstable; the two microGPT checks before and after, 40 of 40 with unchanged values; the machine line; pass caches deleted once captured. Expected: no changed output.",
"",
"**Files it may touch.** Library/RangeInternals.fsi and .fss, and Library/FortressLibrary.fsi and .fss, only for the declarations section 4 names as rung L's and the new declarations the devices add; the new test; its own directory.",
"",
"**Java or Scala.** None. If a family cannot be repaired without a Java or Scala change, that family is a stop.",
"",
"**The checker count.** To be measured by P1 on the landed flat library with the devices applied. The count stage sees RangeInternals' families (CAP 12 and openRangeHelper 3 there before batch 6, by the triage's list); the FortressLibrary families show in the count stage once rung H has landed (the first run), and until then only in the distance stage. The rung captures the table before and after and declares the total it measured.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict; the new test; ArrayScalarExtension.fss and ArrayOperatorsBesideLibrary.fss; RangeTest.fss; the two microGPT checks at 40 of 40.",
"",
"**Stops.** A team test line changed. A declaration section 4 names as another rung's. A checker or walk edit. A family whose only repair is a checker change. A line of C4's model, vocabulary, data or check, or of the APL program. A changed walk output. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** Each family's count before and after, in the count stage and in the distance stage, re-run; each device against the library's precedent it names and against the other ways the rung listed; that no device states something false of the library's types (an exclusion between two traits some library type extends together); under Q2 = (a) each seq pair's device with its reason; the new test's values against the base; the comparison.",
"",
"**What comes back to Pavol.** Each family's device, with the way not taken; under Q2 = (a) the seq pairs' devices; the counts.",
"",
"**What it closes.** Row it opens: openRangeHelper's three declarations ambiguous by the language's own rule on arrow types (library defect; fixed in the rung, home 1).",
"",
].join('\n')

const H_TAIL = [
"",
"## Your rung: H - what the flattening left",
"",
"SLUG is rung-exclusion-remainder. WORKTREE is /home/user/fortress-remainder, branch wip/rung-exclusion-remainder.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"H. What the flattening left\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** None of section 1's questions changes this rung. (Its 19 errors are on batch 6b's landed table, explorations/compile-ladder/climb-batch-6b/gate/checker-count.txt, 38 on the FortressLibrary row, each counted twice; Library/ and ProjectFortress/LibraryBuiltin/ have not changed since d846e3644.)",
"",
"**The problem.** On rung F's library, now main's (d846e3644 carries the branch wip/rung-flat-tower's Library/ byte for byte, unchanged since; batch 6b's landed table reads the same), the checker-count stage reads 62, and the FortressLibrary api still stops at the checker's hierarchy pass (its acyclic stage) on 19 errors, so its overloading and return-type checks never run in the gate (explorations/compile-ladder/rung-flat-tower/probes/skeptic/checker-count-rerun.txt, the table and its 18 exclusion reports; explorations/compile-ladder/rung-flat-tower/probes/distance/walk-flat.txt:86-106, all 19 with their lines; the stage's per-api rows read twice the total in every landed table, so the api's 38 is 19 of the 62). The declarations, at their lines on that library:",
"- TotalComparison extends Comparison, which is a StandardPartialOrder[\\Comparison\\], and StandardTotalOrder[\\TotalComparison\\] (Library/FortressLibrary.fsi:100-121), so it is below two instantiations of one generic; its three objects LessThan, EqualTo and GreaterThan are refused with it.",
"- AnyMaybe extends Equality[\\AnyMaybe\\] beside AnyUniqueItem, Maybe[\\T\\] extends AnyMaybe beside UniqueItem[\\T\\], and Just and Nothing are refused with them (:879-905).",
"- RelationalPredicateCondition[\\E\\] extends Condition[\\()\\] and excludes Condition[\\()\\] in one line (:2558), a type that excludes its own supertype.",
"- AnyIntegral comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } (:428) while Integral[\\I\\] extends it (:431), so the checker reports \"AnyIntegral has a comprises clause but its immediate subtype Integral is not eligible to extend it\" (walk-flat.txt:106); the team's comment between the two lines says what they meant, \"not yet: comprises Integral[\\I\\] where [\\I\\]\" (:429), a where clause neither path implements (POSITIONS 2026-09-21, row 331). The base had the same shape and the same error (e5414f5bf:Library/FortressLibrary.fsi:409-412; it is in neither list of probes/checker-count/diff-before-after.txt, so the flattening kept it), and it is one of the 18 by which 62 exceeds the flattened copy's 44, since that copy dropped Integral's extends clause as well as the comparisons' and Maybe's second instantiations.",
"The first three are the comparisons' and Maybe's groups of the 61 errors instantiation exclusion made on the library (FACTS.md, \"The compiled checker's exclusion rule is the designers' \"multiple instantiation exclusion\", relaxing it alone is unsound, and the real fork is the code generator's dispatch of generics\") and the one Condition site; the fourth is the checker's comprises rule, not the exclusion rule.",
"",
"**The decisions.** Route A (explorations/coordinator/POSITIONS.md, 2026-09-24, route A): the compiled checker keeps the rule and the library conforms. Its measured price names these edits among the \"extends clauses that go\": \"StandardTotalOrder[\\TotalComparison\\] on TotalComparison (the prelude's own edit, CompilerBuiltin.fss:1521-1523), Equality[\\AnyMaybe\\] on AnyMaybe\" (explorations/reviews/mie-probes/price-keep-the-rule.md:25), and the count it expected, 22, assumes them. The overloading judgement assigns the comparisons to route A (explorations/reviews/overloading-judgement.md section 3.6, CMP and MINMAX), and Pavol agreed to it (POSITIONS 2026-09-26, answer 9). The Condition site is a library defect with no question attached (explorations/coordinator/library-route-judgement.md section 2, step 1). For the AnyIntegral clause nothing is decided beyond route A's \"the library conforms\": the ways on file are below, the rung chooses with its measurements in hand and reports the choice as a decision with the ways not taken, and section 1 says when the choice goes to Pavol instead (a walk output changed, or an error the distance stage shows as caused rather than unmasked).",
"",
"**What the library and the specification already do.** Evidence, not the brief; the rung lists every way before it chooses. The compiler prelude's TotalComparison has its StandardTotalOrder clause commented out and extends Comparison only (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:719-722, .fss:1526-1528). The specification's TotalComparison extends Comparison and the LEXICO algebra, not StandardTotalOrder (Specification/advanced-lib/comparison.tex), and its Maybe extends nothing but its own cases (Specification/basic-lib/convenience.tex:37-53, as batch 5's rung S revised it). The keep-the-rule measurement's copy dropped those two clauses and wrote TotalComparison's inherited MIN, MAX, <= and >= by hand (price-keep-the-rule.md, \"Smaller pieces\"; the copy's script explorations/reviews/mie-probes/keep/make-flat-lib.py:36-37, :72-73). For Condition[\\()\\] a component-only repair was measured, which kept walk loading and Generator2Test byte-identical (FACTS.md, \"Crashes reach zero in the shadow, and clearing the early errors exposes a hidden layer\"). For AnyIntegral: the keep-the-rule sketch drops AnyIntegral from Integral[\\I\\]'s extends clause and lets each integer type extend both, as they already do on the flat library (explorations/reviews/mie-probes/keep/flat-tower-sketch.fsi:69-84, make-flat-lib.py:59-60), and on that copy the api kept one error, the Condition site (explorations/perf-probes/prelude/switch-over-distance.md section 5); rung F kept the clause and the extends, and it had dropped AnyIntegral from Integral[\\I\\]'s extends clause on its branch and restored it, because without it walk's overload check refuses C4's generic array operators beside Integral's generic ones (its decision D4, explorations/compile-ladder/rung-flat-tower/REPORT.md section 6; 077beba2d). The ellipsis form, comprises { ... }, is refused by the checker for every api-declared type that extends the trait (row 354, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:209-212; the one-line checker fix batch 3 tried and measured, explorations/compile-ladder/rung-library-defects/probes/deliberate-checker-fix.txt, is Scala and not this rung's). The specification's word on a comprises clause in an api is Specification/basic/traits.tex:236-241 and basic/components/source-code.tex:386-392. What depends on an Integral[\\I\\] being an AnyIntegral (the bounds I extends AnyIntegral beside I extends Integral[\\I\\] in Library/RangeInternals.fsi, Number comprises { RR64, QQ, AnyIntegral }) is the rung's to measure: both stages, walk's corpus and the two microGPT checks.",
"",
"**The test, first.** The manifest sets testIsStage: the recorded failure is the checker-count stage's table before the edit, with the api's 19 errors at the hierarchy pass, and the table after. Clearing them lets the FortressLibrary api reach its overloading and return-type checks in the stage for the first time, so the table after may rise: every new row is listed as unmasked, with P1's run of the same library as the prediction, and the distance stage's table before and after shows that nothing new was caused. Beside them, a new interpreter test in ProjectFortress/tests/, written before the edit and passing before and after: CMP and LEXICO over comparisons, MIN and MAX of comparison values, = on Maybe values, Just and Nothing as generators, and a relational predicate condition combined by AND, each with today's value asserted.",
"",
"**The comparison.** As rung W's: three passes, the same normalisation and unstable list, the two microGPT checks, the machine line, pass caches deleted once captured. Expected: no changed output.",
"",
"**Files it may touch.** Library/FortressLibrary.fsi and .fss, only for the declarations section 4 names as rung H's; the new test; its own directory.",
"",
"**Java or Scala.** None.",
"",
"**The checker count.** The 18 exclusion errors go, and the comprises error with whichever shape the rung takes; the api reaches its overloading and return-type checks only when all 19 are gone, and what they then report is new on the stage: every new row is classified as unmasked (the distance stage's table before the edit already shows it) or caused. The rung captures both stages' tables before and after and declares the total it measured.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict; Generator2Test.fss; the new test; the two microGPT checks at 40 of 40.",
"",
"**Stops.** A changed walk output. A team test line changed. A declaration section 4 names as another rung's. A checker, walk or specification edit; a library declaration that the specification lists, changed so that the specification no longer describes it. A new error the distance stage shows as caused, not unmasked. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The 19 gone, re-run; every new row of the table after classified as unmasked or caused, against the distance stage's table before the edit; each changed declaration against the prelude's, the sketch's and the specification's; the AnyIntegral clause's shape against the ways listed and against what depends on it; the new test's values; the comparison.",
"",
"**What comes back to Pavol.** The declarations changed and the ways not taken, the AnyIntegral clause's among them; the count's rise, with the unmasked rows by family.",
"",
"**What it closes.** No row by number: the comparisons' and Maybe's groups of route A's 61 errors, and the comprises error, noted on the entry of FACTS.md named above and on \"The true distance to the switch-over\".",
"",
].join('\n')

const A_TAIL = [
"",
"## Your rung: A - tabulate",
"",
"SLUG is rung-tabulate. WORKTREE is /home/user/fortress-tabulate, branch wip/rung-tabulate.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"A. tabulate\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** None of section 1's questions changes this rung.",
"",
"**The problem.** The compiled checker refuses fill 95 times on the one library: 22 printed by the checker-count stage (in ProjectFortress/LibraryBuiltin/NativeArray.fsi's two objects) and 73 behind the FortressLibrary api's early return (FACTS.md, \"The fill refusals, counted on the one library, and how each path treats the pair\"). 77 pair the value form fill(v: E) with the function form fill(f: I -> E): with an unbounded element type a value can be a function, and under walk a function passed as a value to an array of element type Any is called per index instead of stored (explorations/reviews/fill-overloads-ways.md, probe FillWalk, cases 3, 6 and 7). 18 are the diamond: an array object inherits fill from two parents with no declaration below both (Library/FortressLibrary.fsi:1297-1369). array1 and array2's value and function factories are refused by the return-type rule. And array3(f) takes a two-argument function for a three-dimensional array and is absent from the api (Library/FortressLibrary.fss:2830 against .fsi:1712; row 247).",
"",
"**The decisions.** Answer 10 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 10): the diamond is fixed by redeclaring fill in the leaf array traits, as the library does for copy, map and replica (\"Copied here for better return type information\", FortressLibrary.fsi:1420-1437, :1446-1461, :1553-1576); the function form is renamed tabulate, after Scala's Array.tabulate; fill keeps the value form. It covers about 30 library call sites, 11 test lines, the function row of the specification's arrays figure (Specification/advanced/parallelism-locality/arrays-distributed.tex:55), and 12 lines of the microGPT vocabulary helpers, which are the diff of explorations/reviews/overloading-judgement.md section 4.4 with tabulate as written there, plus the four lines of the two probe files beside the APL program it names; no model line changes. Measured to clear all 95 fill refusals and both factory refusals (125 to 103, the judgement's section 9). The specification's change takes the S1 form (POSITIONS 2026-09-26, S1).",
"",
"**The test, first.** The manifest sets testIsStage: the recorded failure is the checker-count stage's table before the edit, with NativeArray's 22, and the table after; the distance stage's table before and after for the 73 behind the early return. Beside them, a new interpreter test in ProjectFortress/tests/, in the form of ProjectFortress/tests/roundBug.fss: tabulate on one-, two- and three-dimensional arrays gives what fill(f) gives on the base, and fill with a function value on an array whose element type is a function type stores the function. It fails on the base, where tabulate is not declared.",
"",
"**What it writes.** The declarations the decision names and their bodies, in the api and the component; array1(f), array2(f) and array3(f) and, where the element is a number, vector(f), Vector's and Matrix's function form, renamed; array3's function type and its api line (row 247); the library's call sites (FortressLibrary.fss:2086-2144, :2398-2406, :2558-2563, :2622, :2770-2776 before batch 6, Library/Generator22D.fss, Library/List.fss, Library/System.fss, Library/Random.fss; re-read on the base); the team's test lines that call the function form (ArrayOperatorsBesideLibrary, vectorOps, ArrayScalarExtension, ShuffleTest, matrixOps, RandomTest, sparseMatrix, and any factory call with a function the rung counts), each keeping the value it checks, each listed; the 12 vocabulary lines and the four probe lines (explorations/run-c4/src/FlatArrays.fss, explorations/apl/mg/AplMg.fss, explorations/apl/mg/FlatArrays2.fss, explorations/apl/mg/elemwise_nat_probe.fss:14, elemwise_rank_probe.fss:14-16; re-read on the base, since batch 6's rung F changed a line of two of them); the figure's function row in arrays-distributed.tex, with a \\revision callout, and one Appendix I entry inserted immediately before the subsection \"Passages not yet revised\" of Specification/appendices/changes.tex, quoting the original as \"the Working Draft of February 2011\" with its path and line in Specification-1.0-frozen/. The rung builds the specification to check its edit as rung S does and does not commit Specification/fortress.pdf. Row 437, the numeral 0 in matrix(v)'s body refused for NN32 and NN64 elements under walk, is not this rung's: the call is renamed and the numeral stays.",
"",
"**The comparison.** As rung W's: three passes, the same normalisation and unstable list, the two microGPT checks from an empty cache, 40 of 40 with their printed values unchanged, the machine line, pass caches deleted once captured. Expected: no changed output (the judgement's section 4.4).",
"",
"**Files it may touch.** Library/*.fsi and Library/*.fss for the declarations section 4 names as rung A's and the call sites above, except the compiler's own prelude files there (Library/CompilerLibrary.*, CompilerAlgebra.*, CompilerSystem.*), which take no new declaration before the switch-over (POSITIONS 2026-09-21, the library route); ProjectFortress/LibraryBuiltin/NativeArray.fsi and .fss if the redeclarations reach them; the test files above; the new test; the vocabulary and probe lines above and nothing else under explorations/run-c4/src/ or explorations/apl/mg/; Specification/advanced/parallelism-locality/arrays-distributed.tex and its one entry in Specification/appendices/changes.tex; its own directory.",
"",
"**Java or Scala.** None.",
"",
"**The checker count.** NativeArray's 22 go (the judgement's section 9: 125 to 103, NativeArray 44 rows to 0). The rung captures the table before and after and declares the total it measured.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict; the respelled tests; the two microGPT checks at 40 of 40 with unchanged values.",
"",
"**Stops.** A line of explorations/run-c4/src/MicroGptFlat.fss or explorations/apl/mg/MicroGptApl.fss, or any vocabulary or check line beyond the 12 and the four probe lines: it is shown to Pavol as a diff before it is built (POSITIONS 2026-09-19). A team test line changed other than to follow the rename, keeping its value. A declaration section 4 names as another rung's. A changed walk output. An edit to a passage of the specification other than the figure's row and its entry, or to rung S's place in Appendix I. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The 95 and both factory refusals gone, in both tables, re-run; no fill(f left in the library, the tests or the demos except as the value form; each respelled line's value against the base; the vocabulary diff against the judgement's section 4.4, line for line; array3 against its api and the specification; the specification's row and entry against the frozen copy; the comparison.",
"",
"**What comes back to Pavol.** The respelled test lines; the vocabulary diff as applied; the counts.",
"",
"**What it closes.** Row 247 (fixed). The fill refusals of FACTS.md's entry named above, noted there.",
"",
].join('\n')

const B_TAIL = [
"",
"## Your rung: B - the written bounds and row 421",
"",
"SLUG is rung-result-bounds. WORKTREE is /home/user/fortress-bounds, branch wip/rung-result-bounds.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"B. The written bounds and row 421\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q1 = (a), answered by Pavol on 2026-09-27: a type parameter written without a bound is bounded by Any, so the bound this rung writes is not implied. (Line numbers in this section are on main at ad2d25f11, whose Library/ and ProjectFortress/LibraryBuiltin/ are byte for byte those of d65892d34, the sources the measurements ran on.)",
"",
"**The problem.** Two defects of the one library, both measured by the distance driver under walk's setting, which bounds an unbounded type parameter by Any, as Q1's answer does.",
"- A type parameter that appears only in the result. builtinPrimitive[\\T\\](javaClass:String):T (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:30, .fss:34) is the body of 340 native declarations whose return type is written, such as widen(self):ZZ64 = builtinPrimitive(\"...Int$ToLong\"). With T bounded by Any, the compiled checker reports \"Could not infer static argument T without context\" at every one of them: class N1, 340 errors, in FortressBuiltin.fss 183, FortressLibrary.fss 125, FlatString.fss 14, Writer.fss 11 and NativeArray.fss 7 (explorations/perf-probes/prelude/distance-triage.md section 3.1; the split by file is explorations/reviews/numerics-plan-coordinator/measure-D.md section 3). fail[\\T\\](s:String):T (Library/FortressLibrary.fsi:37, .fss:54) has the same shape, and so has List's nullary comprehension operator opr BIG <|[\\T\\]|> (Library/List.fsi:109, List.fss:177, called at List.fss:150): class N2, 24 errors (explorations/reviews/numerics-plan-coordinator/measure-C.md section 1). Under walk nothing is wrong: the interpreter replaces a native's body with its glue class (row 309), and fail throws.",
"- Row 421. StandardMinMax declares its default MIN and MAX as returning (T,T), where their bodies return one T (Library/FortressLibrary.fsi:209-210, .fss:260-261). The compiled checker, forced past the api's early return, reports each against the method it overrides and in the bodies that use them: classes R1, 32 errors, and R4, 18 (ledger row 421; distance-triage.md section 3). Walk runs the bodies and does not check the declared type, and no library type inherits the two defaults (StandardTotalOrder declares its own at FortressLibrary.fss:279-280, RR64 and QQ theirs at .fsi:321-322 and :407-408), so no output is wrong today.",
"",
"**The decisions.** The numerics plans (explorations/coordinator/POSITIONS.md, 2026-09-27, the numerics plans): batch 7 carries this rung, extends Object written on the result-only type parameter of builtinPrimitive, fail and List's nullary BIG <|[\\T\\]|>, and row 421's four lines; Q1 is taken at (a). The written bound clears the natives by binding Bottom, which is harmless for natives whose bodies the switch-over replaces (row 309). Not this rung's, by the same entry and its evidence: row 358's bounds and the dummy 0 asif ZZ32 device, measured beside these edits in measurement C's tree 1 and left out; and the checker's own fix, the expected type kept at a call written f(x) (row 455), which binds Bottom the same way and refuses calls that convert their result today, so it belongs with the inference rule (measure-D.md; explorations/reviews/numerics-plan-synthesis.md sections 4 and 6, decision 2). Row 421's fix is the row's own: (T,T) to T on the two lines of the api and the two of the component, as the bodies return and as the specification says MAX and MIN return whichever argument is larger or smaller (Specification/basic-lib/basic-integers.tex:590-601). The library's practice is the standard (POSITIONS 2026-09-19).",
"",
"**What the library and the specification already do.** Evidence, not the brief. The library writes extends Object on no static parameter; where it bounds a parameter that appears only in the result it writes Any (cast and instanceOf, FortressLibrary.fsi:24, :26), and Any changes nothing here (run BPANY, builtinPrimitive[\\T extends Any\\], leaves all 340; distance-triage.md section 3). The specification's examples and the compiler's tests write extends Object on static parameters (SpecData/examples/basic/Fun.Decl.fss:19; ProjectFortress/other_compiler_tests/Go1a.fss:15), so the line is the specification's idiom, not the library's (measure-C, section 1). The compile path's own setting gives every unbounded parameter the bound Object (row 412), which is why these errors do not appear under it. A written Object excludes a tuple or an arrow type as the parameter's instance. No native returns one (run BP added no error). The nullary comprehension is instantiated at a tuple by ProjectFortress/tests/RangePrototype.fss:275-276, WordCountSmall.fss:96, booleanGuard.fss:27, Library/Generator22D.fss:155 and Library/QuickCheck.fss:1128; RangePrototype ran unchanged under walk on measurement C's tree 1 (section 2, \"Two more tests\"), and Generator22D and QuickCheck are outside the twelve components the distance driver checks.",
"",
"**The test, first.** The manifest sets testIsStage. The checker-count stage's table is captured before and after the edit, as the order of work asks, and is expected unchanged on the batch's base: the stage counts apis, and the FortressLibrary api stops at its hierarchy pass until rung H lands, so its return-type check, where row 421's errors are, does not run there, and N1 and N2 sit in component bodies. So the recorded failure is the distance measurement's table before the edit, and the test is the same table after it: until the distance stage of section 8 exists, the driver measurement C ran, explorations/perf-probes/prelude/distance-triage/run.sh (build once, then lib L0 and stage L0 walk in the worktree before the edit and again after it, each copy under its own name), classified by classify.py and compared by compare.py --sites beside it; the classes N1, N2, R1 and R4 are the four families, and every other class that moves is listed. Beside them, a new interpreter test in ProjectFortress/tests/, in the form of ProjectFortress/tests/roundBug.fss, written before the edit and passing before and after, each value today's: an object that extends StandardMinMax and declares only MINMAX, so that its MIN and MAX are the two defaults row 421 corrects; MIN and MAX on RR64 and QQ values; one native of FortressBuiltin and one of FortressLibrary; fail caught as FailCalled, as ProjectFortress/tests/FlatTowerRungF.fss:12-13 catches it; and list comprehensions whose elements are tuples and functions, which instantiate the nullary operator where the bound Object would not admit the element type. No gated test can fail for row 421 before the edit: walk does not check a declared return type, no library type inherits the two defaults, and no compiled program can yet import the one library. So row 421's gated home is the checker-count stage, which reports its errors from the first run's merged tree on, once rung H lets the api reach its return-type check (reported, never red; the merged-diff review ties every new row to a rung edit), and the new test is the gated test that runs the two corrected bodies under walk.",
"",
"**The comparison.** As rung W's: three passes, the same normalisation and unstable list, the two microGPT checks from an empty cache, 40 of 40 with their printed values unchanged, the machine line, pass caches deleted once captured. Expected: no changed output.",
"",
"**What it clears.** Measured by the distance driver on library copies under walk's setting, each edit alone or with row 358's bounds and the device; the three edits together without those two were not run.",
"- builtinPrimitive's bound alone (run BP): 1,738 to 1,400; N1 340 to 0, and BR's run-to-run variation (distance-triage.md section 3; distance-triage/compare-BP-walk.txt).",
"- Row 421 alone (run R421): 1,738 to 1,686; R1 32 to 0, R4 18 to 4, OT 4 fewer; unmasked behind it, two errors at List.fss:322 and :333, calls of ArrayList's own fill[\\T\\] with an array of the list's E, which is not rung A's fill (distance-triage/compare-R421-walk.txt; measure-C's class I2).",
"- fail's and the comprehension's bound, measured only within tree 1: N2 24 to 1; 22 sites gone, List.fss:150 now reported under class GB with the message the compile path's setting gives there, and FortressLibrary.fss:169 left, whose A and B appear in its argument types and are not result-only (measure-C, section 1).",
"- With row 358's bounds and the device, measurement C's tree 1: 1,738 to 1,239 under walk's setting and 1,746 to 1,253 under the any setting, Q1's answer carried to the compiled path. Of the 499, row 358's bounds and the device take 85 on their own (run BOUNDS+DEVICE, 1,653), and the separate runs of this rung's edits sum to about 410, the triage having found separate runs nearly additive (summed, their changes made -622, and run together -616; distance-triage.md section 3). So this rung alone is predicted at about 1,330 under walk's setting, by arithmetic.",
"",
"**Files it may touch.** ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, builtinPrimitive's declaration line in each; Library/FortressLibrary.fsi and .fss, fail's declaration line and StandardMinMax's MIN and MAX in each; Library/List.fsi and .fss, the nullary opr BIG <|[\\T\\]|>'s declaration line in each: eight lines in all. The new test; its own directory.",
"",
"**Java or Scala.** None.",
"",
"**The checker count.** Unchanged on the batch's base (above). On the first run's merged tree, where H lets the FortressLibrary api reach its return-type check, row 421's errors are absent from the table because this rung removed them; the counts do not add (section 4). The rung captures both tables before and after and declares the total it measured.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict; the new test; RangePrototype.fss, WordCountSmall.fss and booleanGuard.fss, whose comprehensions instantiate the nullary operator at a tuple; FlatTowerRungF.fss, which catches FailCalled; the two microGPT checks at 40 of 40 with unchanged values.",
"",
"**Stops.** A changed walk output. A team test line changed. An edit beyond the eight lines, row 358's bounds and the dummy device among them, or a bound other than Object on the three parameters. A declaration section 4 names as another rung's. A checker, walk or specification edit. A new error the distance table shows as caused rather than unmasked. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** Both distance tables re-run, the four families against the runs on file (BP, R421 and tree 1's N2), every new site classified as unmasked or caused; the two count tables equal; the eight lines against the decision and against measurement C's explorations/reviews/numerics-plan-coordinator/probes-C/tree1.patch, with nothing of row 358's bounds or the device; the bound's effect under walk: the comparison, the named tests and the new test's tuple and function comprehensions and caught fail; the two corrected bodies run by the new test.",
"",
"**What comes back to Pavol.** The eight lines as a diff; the distance table's move by family; any walk output that moved.",
"",
"**What it closes.** Row 421 (fixed). A note appended to row 309: the natives' T is written bounded by Object, which the compiled checker solves to Bottom, so their bodies go unchecked until the switch-over replaces them. Row it may open: the two List.fss errors row 421's fix unmasks, if the rung's table confirms them (library defect; left, not repaired here).",
"",
].join('\n')

const S_ENTRY = { id: 'S', slug: 'rung-spec-overloading', path: '/home/user/fortress-ovspec', branch: 'wip/rung-spec-overloading', tail: S_TAIL, expectedMinutes: 100, writesState: false, testIsStage: false, expectedCheckerCount: P1_COUNT.S, landsOnlyWith: ['C'],
    blurb: "the specification's overloading chapters revised to the 2011 model the checker runs (answer 9): the sentence forbidding overloads that differ in static parameters goes, the paper's three rules and the positional rule stated, the original kept in the S1 form; under Q1 = (a) the implicit bound; an original-tree edit, Specification-1.0-frozen/ untouched, the PDF left to the gather. No source and no test.",
    facts: ["The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters", "Measured by the overloading judgement on private library copies", "The checker's return-type rule lets the more specific declaration choose its own instantiation", "Specification-1.0-frozen/ is byte for byte the working draft of 2011-02-02", "The team's latest word on types and on the exclusion rule is the unfinished restart", "The specification states instantiation exclusion, and its refused examples are the library's shapes", "Citing Specification/library/apis/*.tex as an independent standard is circular", "The specification and the repository's lineage", "explorations/reviews/overloading-judgement.md", "explorations/reviews/overload-static-params-ways.md", "explorations/reviews/spec-change-form.md", "explorations/reviews/spec-refused-examples-judgement.md", "explorations/coordinator/spec-lineage.md", "explorations/reviews/mie-probes/spec-sentences-dated.md", "explorations/coordinator/CLIMB-BATCH-5.md", "explorations/coordinator/map/spec-to-implementation.md", "explorations/coordinator/map/design-intent-sources.md"],
    expectedMoves: [] }

const C_ENTRY = { id: 'C', slug: 'rung-return-type-rule', path: '/home/user/fortress-rtr', branch: 'wip/rung-return-type-rule', tail: C_TAIL, expectedMinutes: 160, writesState: false, testIsStage: false, expectedCheckerCount: P1_COUNT.C,
    blurb: "the compiled checker's return-type rule checked over every instance and the positional rule for generic declarations in the more-specific relation (answer 9; row 398 and defect 2), with expected-failure compile tests and defect 3's expected failure; Scala under scala_src/.",
    facts: ["The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters", "The checker's return-type rule lets the more specific declaration choose its own instantiation", "The return-type rule now reads a size as it reads a type parameter", "The compiled type checker checks nat and int static parameters", "The hidden layer, classified", "The true distance to the switch-over", "Between the interpreter's library and bytecode stands the checker", "The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "A thrown CompilerError takes a third path through the test harness", "ant compileAll deletes a tracked file", "The checker and the one library", "The harness and the gate", "explorations/reviews/overloading-judgement.md", "explorations/reviews/overload-static-params-ways.md", "explorations/perf-probes/prelude/switch-over-distance.md", "explorations/perf-probes/nat/triage.md", "explorations/coordinator/tools/checker-count/", "explorations/coordinator/map/compile-path-walkthrough.md", "explorations/coordinator/map/modules-and-phases.md", "explorations/coordinator/map/README.md"],
    expectedMoves: [] }

const W_ENTRY = { id: 'W', slug: 'rung-walk-dispatch', path: '/home/user/fortress-dispatch', branch: 'wip/rung-walk-dispatch', tail: W_TAIL, expectedMinutes: 180, writesState: true, testIsStage: false, expectedCheckerCount: P1_COUNT.W,
    blurb: "walk chooses between a generic and a plain declaration on their declared domains, not on the instance made from the arguments, so declaration order no longer decides (answer 9, defect 1); Java under interpreter/. writesState, because walk's overloaded functions cache their choices.",
    facts: ["The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters", "Under walk, the interpreter converts by coercion at its three kinds of type check", "Every functional-method name of the library is reserved in every program that imports it", "The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program", "An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "testSystem's four shards are one suite split by sorted index", "Three heaps run the interpreter", "ant compileAll deletes a tracked file", "Landed semantics", "The harness and the gate", "explorations/reviews/overloading-judgement.md", "explorations/reviews/overload-static-params-ways.md", "explorations/repo-internals.md", "explorations/coordinator/map/modules-and-phases.md", "explorations/coordinator/map/test-coverage.md", "explorations/coordinator/map/README.md"],
    expectedMoves: [] }

const L_ENTRY = { id: 'L', slug: 'rung-overload-families', path: '/home/user/fortress-families', branch: 'wip/rung-overload-families', tail: L_TAIL, expectedMinutes: 200, writesState: false, testIsStage: true, expectedCheckerCount: P1_COUNT.L,
    blurb: "the one library's refused overload families (CAP, the array MIN and MAX, String's juxtaposition, openRangeHelper, seq) repaired by the library's own devices (answer 9); library and one guard test, no Java.",
    facts: ["Measured by the overloading judgement on private library copies", "The hidden layer, classified", "The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters", "The true distance to the switch-over", "The compiled checker's exclusion rule is the designers'", "The one library's number tower is flat", "Every functional-method name of the library is reserved in every program that imports it", "testSystem's four shards are one suite split by sorted index", "The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program", "The checker and the one library", "The library's arrays and algebra", "explorations/reviews/overloading-judgement.md", "explorations/reviews/overload-static-params-ways.md", "explorations/perf-probes/nat/triage.md", "explorations/perf-probes/prelude/switch-over-distance.md", "explorations/coordinator/tools/checker-count/", "explorations/reviews/mie-probes/flat-world-for-users.md", "explorations/repo-internals.md", "explorations/coordinator/map/spec-to-implementation.md", "explorations/coordinator/map/dormant-code.md", "explorations/coordinator/map/README.md"],
    expectedMoves: [] }

const H_ENTRY = { id: 'H', slug: 'rung-exclusion-remainder', path: '/home/user/fortress-remainder', branch: 'wip/rung-exclusion-remainder', tail: H_TAIL, expectedMinutes: 150, writesState: false, testIsStage: true, expectedCheckerCount: P1_COUNT.H,
    blurb: "the instantiation-exclusion refusals batch 6's flattening left (TotalComparison and its objects, AnyMaybe, Maybe, Just, Nothing) and RelationalPredicateCondition's excludes, made to conform (route A), so the FortressLibrary api reaches its overloading check in the gate; library and one guard test, no Java.",
    briefing: [
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-23 how the exclusion-rule fork", "positions:2026-09-26 answer 9",
      "positions:2026-09-21 library commit", "positions:2026-09-23 climb batch 3's checker count", "positions:2026-09-27 numerics plans",
      "positions:2026-09-21 ledger row 331", "positions:2026-09-19 answering the open question", "positions:2026-09-24 after finding the override shape",
      "positions:2026-09-26 answer 11", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:354",
      "ledger:358", "ledger:331", "doc:explorations/compile-ladder/rung-flat-tower/REPORT.md#6. Decisions@D4",
      "doc:explorations/compile-ladder/rung-flat-tower/REPORT.md#14. The checker count",
      "doc:explorations/coordinator/climb-batch-7-review.md#1. Changes made, one reason each@19th error named",
      "doc:explorations/compile-ladder/rung-flat-tower/probes/skeptic/checker-count-rerun.txt",
      "doc:explorations/reviews/mie-probes/price-keep-the-rule.md#1. What flat means for this library",
      "doc:explorations/perf-probes/prelude/switch-over-distance.md#5. The flattened copy",
      "doc:explorations/reviews/overloading-judgement.md#3.6 The library's refused set, repaired@CMP",
      "doc:explorations/perf-probes/nat/zero.md#3. The Condition",
      "doc:explorations/perf-probes/prelude/switch-over-distance-flat.md#1. How it was measured",
      "doc:explorations/perf-probes/prelude/switch-over-distance-flat.md#5. The distance stage for phase 3's gates", "index:checker-count",
      "doc:Specification/basic/types-vals-vars.tex#Trait Types", "doc:Specification/basic/traits.tex#Trait Declarations",
      "doc:Specification/basic/components/source-code.tex#Export Statements",
      "code:Specification/advanced-lib/comparison.tex#%% value trait TotalComparison..%% GreaterThan: TotalComparison",
      "doc:Specification/basic-lib/convenience.tex#Convenience Types", "code:Library/FortressLibrary.fsi#trait Comparison..trait TotalComparison",
      "code:Library/FortressLibrary.fsi#trait AnyIntegral extends..trait Integral[",
      "code:Library/FortressLibrary.fsi#value trait AnyMaybe..value trait Maybe[", "code:Library/FortressLibrary.fsi#trait RelationalPredicateCondition",
      "code:Library/FortressLibrary.fss#trait RelationalPredicateCondition..relationalPredicate[",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait TotalComparison..object EqualTo extends TotalComparison",
      "doc:explorations/reviews/mie-probes/keep/flat-tower-sketch.fsi", "The compiled checker's exclusion rule is the designers'",
      "The specification states instantiation exclusion, and its refused examples are the library's shapes",
      "The specification's own examples that the multiple instantiation exclusion refuses", "The exclusion fork, priced three ways and dated",
      "The tower closure of 02d09a39f has no spelling the compiler's checker accepts",
      "The compiled checker refuses every api-declared trait that extends a trait whose comprises clause has", "Crashes reach zero in the shadow",
      "The true distance to the switch-over", "The checker-count stage's table", "The one library's number tower is flat",
      "A comment placed after a declaration that ends in an expression or a type", "testSystem's four shards are one suite split by sorted index",
      "The interpreter's overload-ambiguity message names its two declarations", "ant compileAll deletes a tracked file",
      "map:spec-to-implementation.md#4.2 The tower in", "map:README.md#Touch this@Library/FortressLibrary.fss and the other"],
    checks: [
      "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-26 answer 9", "positions:2026-09-21 library commit",
      "positions:2026-09-24 after finding the override shape", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "ledger:354", "ledger:358", "doc:explorations/compile-ladder/rung-flat-tower/REPORT.md#6. Decisions@D4",
      "doc:explorations/compile-ladder/rung-flat-tower/probes/skeptic/checker-count-rerun.txt",
      "doc:explorations/reviews/mie-probes/price-keep-the-rule.md#1. What flat means for this library",
      "doc:explorations/perf-probes/prelude/switch-over-distance-flat.md#1. How it was measured",
      "doc:Specification/basic/types-vals-vars.tex#Trait Types",
      "code:Specification/advanced-lib/comparison.tex#%% value trait TotalComparison..%% GreaterThan: TotalComparison",
      "doc:Specification/basic-lib/convenience.tex#Convenience Types",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait TotalComparison..object EqualTo extends TotalComparison",
      "doc:explorations/reviews/mie-probes/keep/flat-tower-sketch.fsi", "The tower closure of 02d09a39f has no spelling the compiler's checker accepts",
      "The true distance to the switch-over"],
    expectedMoves: [] }

const A_ENTRY = { id: 'A', slug: 'rung-tabulate', path: '/home/user/fortress-tabulate', branch: 'wip/rung-tabulate', tail: A_TAIL, expectedMinutes: 190, writesState: false, testIsStage: true, expectedCheckerCount: P1_COUNT.A,
    blurb: "fill redeclared where the array traits' diamond meets and its function form renamed tabulate (answer 10): about 30 library call sites, the team's test lines that call it, 12 approved microGPT vocabulary lines and four probe lines, the arrays figure's row; library, tests and one specification passage, no Java.",
    briefing: [
      "positions:2026-09-26 answer 10", "positions:2026-09-19 answering the open question", "positions:2026-09-24 after finding the override shape",
      "positions:2026-09-19 FlatArrays review's repair", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
      "positions:2026-09-26 answer 11", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:247",
      "ledger:437", "doc:explorations/reviews/overloading-judgement.md#4.3 The decision and why",
      "doc:explorations/reviews/overloading-judgement.md#4.4 What it changes",
      "doc:explorations/reviews/overloading-judgement.md#9. Measured for this judgement",
      "doc:explorations/reviews/fill-overloads-ways.md#What the checker refuses, measured",
      "doc:explorations/reviews/fill-overloads-ways.md#2. What each path does today, measured", "doc:explorations/reviews/fill-overloads-ways.md#Way 0",
      "doc:explorations/reviews/fill-overloads-ways.md#Way 3",
      "doc:explorations/reviews/fill-overloads-ways.md#5. What the library does in the same family",
      "doc:explorations/perf-probes/prelude/switch-over-distance-flat.md#1. How it was measured", "index:checker-count",
      "doc:Specification/advanced/parallelism-locality/arrays-distributed.tex#Distributed Arrays",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
      "doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes",
      "doc:Specification/appendices/changes.tex#Passages not yet revised",
      "doc:explorations/coordinator/CLIMB-BATCH-5.md#S. The specification@How it is checked",
      "code:Library/FortressLibrary.fsi#trait ReadableArray[..trait StandardMutableArrayType[",
      "code:Library/FortressLibrary.fss#trait StandardImmutableArrayType[..trait StandardMutableArrayType[",
      "code:Library/FortressLibrary.fsi#trait ReadableArray1[..trait Array1[", "code:Library/FortressLibrary.fsi#trait Array2[",
      "code:Library/FortressLibrary.fsi#(f:ZZ32->T):Array1..(f:ZZ32->T):Vector",
      "code:Library/FortressLibrary.fss#(): T = throw ForbiddenException..(f:ZZ32->T):Vector",
      "code:Library/FortressLibrary.fss#T,nat s0, nat s1, nat s2..(f:(ZZ32,ZZ32)->T)", "doc:ProjectFortress/tests/roundBug.fss",
      "The fill refusals, counted on the one library, and how each path treats the pair",
      "Measured by the overloading judgement on private library copies", "The hidden layer, classified",
      "Route A's generic container obligations still need body-level checks", "The one library's number tower is flat",
      "The true distance to the switch-over", "The checker-count stage's table",
      "The specification states instantiation exclusion, and its refused examples are the library's shapes", "Specification-1.0-frozen/ is byte for byte",
      "Citing Specification/library/apis/*.tex as an independent standard is circular", "Every functional-method name of the library is reserved",
      "A comment placed after a declaration that ends in an expression or a type", "testSystem's four shards are one suite split by sorted index",
      "The interpreter's overload-ambiguity message names its two declarations", "ant compileAll deletes a tracked file",
      "map:spec-to-implementation.md#Parts IV", "map:README.md#Touch this@Library/FortressLibrary.fss and the other",
      "map:README.md#Touch this@explorations/apl/mg/", "map:README.md#Touch this@Specification/ (the standard)"],
    checks: [
      "positions:2026-09-26 answer 10", "positions:2026-09-19 FlatArrays review's repair", "positions:2026-09-26 S1",
      "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
      "ledger:247", "doc:explorations/reviews/overloading-judgement.md#4.4 What it changes",
      "doc:explorations/reviews/overloading-judgement.md#9. Measured for this judgement",
      "doc:Specification/advanced/parallelism-locality/arrays-distributed.tex#Distributed Arrays",
      "code:Library/FortressLibrary.fsi#trait ReadableArray[..trait StandardMutableArrayType[", "code:Library/FortressLibrary.fsi#trait Array2[",
      "code:Library/FortressLibrary.fss#T,nat s0, nat s1, nat s2..(f:(ZZ32,ZZ32)->T)",
      "The fill refusals, counted on the one library, and how each path treats the pair"],
    expectedMoves: [] }

const B_ENTRY = { id: 'B', slug: 'rung-result-bounds', path: '/home/user/fortress-bounds', branch: 'wip/rung-result-bounds', tail: B_TAIL, expectedMinutes: 140, writesState: false, testIsStage: true, expectedCheckerCount: P1_COUNT.B,
    blurb: "the written bound Object on the result-only type parameter of builtinPrimitive, fail and List's nullary comprehension operator, and StandardMinMax's MIN and MAX declared returning T (row 421), on Pavol's yes to the numerics synthesis's decision 2; eight library lines and one guard test, no Java.",
    briefing: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-19 answering the open question", "positions:2026-09-21 library route",
      "positions:2026-09-26 answer 11", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:421",
      "ledger:309", "ledger:412", "ledger:447", "ledger:425", "ledger:455", "ledger:358", "doc:explorations/reviews/numerics-plan-synthesis.md#Decision 2",
      "doc:explorations/reviews/numerics-plan-coordinator/measure-C.md#1. Tree 1",
      "doc:explorations/reviews/numerics-plan-coordinator/measure-D.md#The answers",
      "doc:explorations/reviews/numerics-plan-coordinator/measure-D.md#5. What this does not settle",
      "doc:explorations/perf-probes/prelude/distance-triage.md#1. How it was measured",
      "doc:explorations/perf-probes/prelude/distance-triage.md#3. The measurements",
      "doc:explorations/reviews/overloading-judgement.md#3.6 The library's refused set, repaired@StandardMinMax's slip", "index:checker-count",
      "doc:Specification/basic/trait-parameters.tex#Type Parameters", "doc:Specification/basic/inference.tex#Type Inference",
      "code:Specification/basic-lib/basic-integers.tex#whichever argument is larger..if the arguments are equal",
      "doc:SpecData/examples/basic/Fun.Decl.fss", "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#(javaClass:String):T",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#(javaClass:String):T", "code:Library/FortressLibrary.fsi#cast[..localize[",
      "code:Library/FortressLibrary.fss#fail[", "code:Library/FortressLibrary.fsi#trait StandardMinMax[",
      "code:Library/FortressLibrary.fss#trait StandardMinMax[..trait StandardTotalOrder[", "code:Library/List.fsi#List comprehensions..g:Generator",
      "code:Library/List.fss#Vararg factory for lists; provides aggregate list constants **)..__bigOperatorSugar",
      "code:Library/List.fss#filter(p: E -> Boolean)", "code:ProjectFortress/tests/FlatTowerRungF.fss#group(g: () -> ()): ZZ32 =",
      "doc:ProjectFortress/tests/roundBug.fss", "The distance to the switch-over by root cause",
      "The cheap fixes and scalar ranges over ZZ32, measured on one library copy",
      "Keeping the expected type at a call written f(x) is four one-token edits", "Static arguments are inferred from the arguments alone, on both paths",
      "The true distance to the switch-over", "The checker-count stage's table", "Between the interpreter's library and bytecode stands the checker",
      "The one library's number tower is flat", "testSystem's four shards are one suite split by sorted index",
      "The interpreter's overload-ambiguity message names its two declarations", "ant compileAll deletes a tracked file",
      "map:compile-path-walkthrough.md#The extends Object rewrite", "map:compile-path-walkthrough.md#7. Native bindings in both worlds",
      "map:README.md#Touch this@Library/FortressLibrary.fss and the other"],
    checks: [
      "positions:2026-09-27 numerics plans", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:421",
      "ledger:309", "ledger:447", "doc:explorations/reviews/numerics-plan-coordinator/measure-C.md#1. Tree 1",
      "doc:explorations/perf-probes/prelude/distance-triage.md#1. How it was measured",
      "doc:explorations/perf-probes/prelude/distance-triage.md#3. The measurements", "doc:Specification/basic/trait-parameters.tex#Type Parameters",
      "code:Specification/basic-lib/basic-integers.tex#whichever argument is larger..if the arguments are equal",
      "code:Library/FortressLibrary.fss#trait StandardMinMax[..trait StandardTotalOrder[",
      "code:Library/List.fss#Vararg factory for lists; provides aggregate list constants **)..__bigOperatorSugar",
      "The cheap fixes and scalar ranges over ZZ32, measured on one library copy"],
    expectedMoves: [] }

const ANSWER9_RUNGS = [S_ENTRY, C_ENTRY, W_ENTRY, L_ENTRY]
const LIBRARY_RUNGS = (H_RIDES ? [H_ENTRY] : []).concat([A_ENTRY, B_ENTRY])
const RUNGS = RUN === 'first' ? LIBRARY_RUNGS : RUN === 'second' ? ANSWER9_RUNGS : ANSWER9_RUNGS.concat(LIBRARY_RUNGS)
const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)

const INTRO_RUNG = {
  S: "S revises the specification's two overloading chapters to the 2011 model the checker runs (answer 9): the sentence that overloads may not differ in static parameters goes, the paper's three rules and the positional rule are stated, and the original is kept in the S1 form.",
  C: "C makes the compiled checker check the return-type rule over every instance and refuse an override that reorders its own static parameters (answer 9, row 398).",
  W: "W makes walk choose between a generic and a plain declaration on their declared domains, so that the order they were written in no longer decides (answer 9).",
  L: "L repairs the one library's refused overload families with the library's own devices (answer 9).",
  H: "H makes the comparisons, Maybe and RelationalPredicateCondition conform to instantiation exclusion and the AnyIntegral clause to the checker's comprises rule (route A), so that the FortressLibrary api reaches its overloading check in the gate.",
  A: "A redeclares fill where the array traits' diamond meets and renames its function form tabulate (answer 10).",
  B: "B writes the bound Object on the type parameter that appears only in the result of builtinPrimitive, fail and List's nullary comprehension operator, so that the compiled checker stops reporting it as not inferred, and declares StandardMinMax's MIN and MAX returning T, as their bodies do (row 421; POSITIONS.md, 2026-09-27, the numerics plans).",
}
const INTRO_STOPS = {
  S: "for S, any edit under Specification-1.0-frozen/, normative text for a rule neither path will run once C lands, and a passage whose new text the decisions do not settle",
  C: "for C, an edit to compiler/StaticChecker.java, a library declaration newly refused that its section does not assign, a compiled test's verdict changing other than its own, a ladder file moving down, and any walk edit",
  W: "for W, a changed walk output that is not a call whose chosen declaration changed as the decision gives, a changed microGPT value, and an overload set whose load-time verdict changes",
  L: "for L, a team test line changed, a family whose only repair is a checker change, and a changed walk output",
  H: "for H, a changed walk output, a team test line changed, a library declaration the specification lists changed so that the specification no longer describes it, and a new checker error the distance stage shows as caused rather than unmasked",
  A: "for A, a line of the two model files or any vocabulary or check line beyond the approved twelve and the four probe lines (shown to him as a diff first), a team test line changed other than to follow the rename, and a changed walk output",
  B: "for B, a changed walk output, a team test line changed, an edit beyond its eight lines (row 358's bounds and the range operators' dummy device among them) or a bound other than Object, and a new checker error the distance measurement shows as caused rather than unmasked",
}
const INTRO_LIFTED = {
  C: "C makes the checker refuse two shapes it accepts today (answer 9)",
  W: "W changes which declaration walk runs where a generic and a plain declaration tie (answer 9)",
  L: "L adds exclusions and markers to library traits (answer 9)",
  H: "H changes declared extends, excludes and comprises clauses of the one library (route A)",
  A: "A renames a declaration gated tests use, fill's function form, and restates the team's test lines that call it, keeping each value (answer 10)",
  B: "B changes declared types of the one library: the bound of three result-only type parameters, and the return type of StandardMinMax's MIN and MAX to what their bodies return (the numerics plans, 2026-09-27; row 421)",
}
const OVERLAP_RUNG = {
  S: "S edits Specification/basic/overloading.tex, advanced/overloading.tex, appendices/future.tex, its own subsections of appendices/changes.tex (after The calculi) and, under Q1 = (a), basic/trait-parameters.tex; never Specification/fortress.pdf.",
  C: "C edits checker files under ProjectFortress/src/com/sun/fortress/scala_src/ and adds tests in ProjectFortress/compiler_tests/.",
  W: "W edits OverloadedFunction.java and what else under interpreter/ it needs, not interpreter/glue/prim/, and adds one test in ProjectFortress/tests/.",
  L: "L edits Library/RangeInternals.fsi and .fss and, in Library/FortressLibrary.fsi and .fss, only the declarations section 4 of the record names as L's, and adds one test in ProjectFortress/tests/.",
  H: "H edits, in Library/FortressLibrary.fsi and .fss, only the declarations section 4 of the record names as H's (the comparisons, the Maybe family, RelationalPredicateCondition and the Condition functions that build it, and the headers of AnyIntegral and Integral), and adds one test in ProjectFortress/tests/.",
  A: "A edits, in Library/*.fsi and *.fss, the fill declarations and call sites section 4 of the record names as A's, seven team tests, the approved vocabulary and probe lines of explorations/run-c4/src/ and explorations/apl/mg/, Specification/advanced/parallelism-locality/arrays-distributed.tex and its own subsection of appendices/changes.tex (before Passages not yet revised), and adds one test in ProjectFortress/tests/; never Specification/fortress.pdf.",
  B: "B edits eight lines: builtinPrimitive's declaration in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss, fail's and StandardMinMax's MIN and MAX in Library/FortressLibrary.fsi and .fss, and the nullary comprehension operator in Library/List.fsi and .fss; and adds one test in ProjectFortress/tests/.",
}

const BATCH_INTRO = [
  RUN === 'first'
    ? "This run is climb batch 7, the first of the plan's phase 3, the checker at a true zero, as Pavol decided it on 2026-09-26 (answers 9 to 12), 2026-09-24 (route A) and 2026-09-27 (the numerics plans): " + (HAS_RUNG('H') ? "three library rungs that follow no open question of his: H, which repairs the instantiation-exclusion refusals and the comprises error batch 6's flattening left; A, answer 10's tabulate; and B, which writes the bound Object on three result-only type parameters and fixes row 421." : "two library rungs that follow no open question of his: A, answer 10's tabulate, and B, which writes the bound Object on three result-only type parameters and fixes row 421.") + " Answer 9's four rungs follow as batch 7b."
    : RUN === 'second'
    ? "This run is climb batch 7b, phase 3's batch of answer 9's four rungs, as Pavol decided it on 2026-09-26: the specification's sentence that overloads of one name may not differ in static parameters goes, in four rungs, specification, checker, walk and library. Batch 7 (rungs H, A and B) has landed before it, so the FortressLibrary api reaches its overloading check in the count stage."
    : "This batch is the first of the plan's phase 3, the checker at a true zero, as Pavol decided it on 2026-09-26 (answers 9 to 12) and 2026-09-24 (route A): the specification's sentence that overloads of one name may not differ in static parameters goes, in four rungs, specification, checker, walk and library; answer 10's tabulate rides beside them" + (HAS_RUNG('H') ? "; one library rung repairs the instantiation-exclusion refusals and the comprises error batch 6's flattening left" : '') + "; and one library rung writes the bound Object on three result-only type parameters and fixes row 421 (2026-09-27, the numerics plans).",
  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),
  "Each rung's section of the record opens with the answers of its section 1 that it follows.",
  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a declaration or a file section 4 of the record names as another rung\'s.',
  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "A stop that a rung meets and that is not lifted holds the commit stage's push, as in batches 4 to 6.",
  "Every choice a rung makes that its section leaves to it is reported as a decision, with the alternatives considered and the evidence that settled it.",
  HAS_RUNG('S') ? "The gather's rules: S lands only if C lands, whatever the approved list says: when C is not approved, the gather applies no file of S and folds its findings as for any rung that did not land. After S and C are applied, the gather checks each rule S's text states against C's landed test programs and the refusals they pin, fixes S's text where the decisions settle a mismatch and reports any other to the review as blocking." : '',
  "No rung commits Specification/fortress.pdf: after every rung is applied, the gather rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf), since Part IV is rendered from the .fsi files the library rungs change" + (HAS_RUNG('S') || HAS_RUNG('A') ? " and a rung edits the specification too" : "") + ", and removes the build's ignored products.",
  RUNGS.length + " worktrees share one disk: a rung that runs the three-pass comparison over ProjectFortress/tests/ deletes each pass's caches under its tmp/ once the pass's outputs are captured, and reads df before each pass.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5 to 6.",
  "Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).",
].filter(Boolean).join(' ')
const AND_LIST = (xs) => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1]
const LIBRARY_EDITORS = ['L', 'H', 'A', 'B'].filter(HAS_RUNG)
const TEST_ADDERS = ['W', 'L', 'H', 'A', 'B'].filter(HAS_RUNG)
const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' '
  + (LIBRARY_EDITORS.length > 1
      ? "Library/FortressLibrary.fsi and .fss are shared by " + AND_LIST(LIBRARY_EDITORS) + ", each on the declarations section 4 of the record names as its own" + (HAS_RUNG('L') && HAS_RUNG('A') ? " (ReadableArray's header is L's and its fill members A's)" : " (no trait carries edits from two rungs)") + ". "
      : "No library file is shared: " + LIBRARY_EDITORS.join('') + " alone edits Library/. ")
  + (HAS_RUNG('A') && HAS_RUNG('B') ? "Library/List.fss is shared by A and B, A at its calls of fill's function form in mapArr and ivmapArr and B at the nullary comprehension operator. " : "")
  + (HAS_RUNG('S') && HAS_RUNG('A') ? "Specification/appendices/changes.tex is shared by S and A, each inserting new subsections at its own place, neither editing an existing one. " : "")
  + "The one shared directory is ProjectFortress/tests/, where " + AND_LIST(TEST_ADDERS) + " each add one file" + (HAS_RUNG('A') ? " and A edits seven team tests no other rung touches" : "") + "; a file added there moves the testSystem shards, which the gate compares by their sum. "
  + (HAS_RUNG('B') ? "B's own errors sit in component bodies and in the FortressLibrary api's return-type check, so the count stage shows them only where H has let the api reach that check, and the distance measurement shows them all. " : "")
  + (HAS_RUNG('H') ? "H lets the FortressLibrary api reach its overloading check in the count stage, so the counts do not add: every row that appears is unmasked or caused, and the review ties each to a rung edit. " : "The checker count reads the library rungs' changes through " + (HAS_RUNG('C') ? "C's checker" : "the checker") + " on the merged tree; the review ties each moved row to a rung edit. ")
  + "The files every rung reaches are the three record files, folded centrally by the gather."
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
