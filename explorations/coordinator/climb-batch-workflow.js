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
    { title: 'Commit', detail: 'hashes into the ledger notes, push main, fast-forward the container branch, remove the worktrees' },
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
// FIFO. k is 3 in this batch, so the queue sets the wall.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order
// only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction since a2b4809a5, never red) and
// expectedCheckerCrash (compared exactly with the table's #crash field; no
// rung of this batch declares one, so any change of the crash row is red).
//
// Batch 5's values are CLIMB-BATCH-5.md, sections 3, 6 and 7. Each tail is
// that rung's section of section 3 word for word, with the record's code-span
// backticks dropped (this file carries none); ASCII only. Each section opens
// with an answers line (Q2 for D, Q5 for S, Q3 for Z) holding the
// defaults of the record's section 5; if Pavol answers otherwise before the
// launch, the coordinator changes the letter in that line, in the tail and in
// the record, and nothing else.
// Manifest order D, S, Z is the ledger numbering order; the scatter starts Z,
// then D, then S. Every rung predicts the checker total 125. No rung declares
// a ladder move. The base is <base>, passed at launch as args.base, not
// written here.
// ===========================================================================

const BATCH = '5'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-5.md'
const BATCH_INTRO = "This batch builds three rungs Pavol decided on 2026-09-24 and 2026-09-26. D declares the specification's wrapping operators DOTPLUS, DOTMINUS (binary and unary) and DOTTIMES on Integral and on ZZ32, ZZ64, NN32, NN64 and ZZ in the interpreter's library, and respells with them the library bodies and the team tests that mean to wrap, changing no output (rows 403 and 348; rung O's natives are batch 6). S revises the specification for route A, except the three number chapters, in the team's layered form, with a decision record keeping the original text, the reasons and route C. Z carries a size at run time as a descriptor from the factory RTTIsize.of (design B), with B's dispatcher, the extends-clause and value-position pieces and the one-method hash fix, and adds row 402's size case to the checker's exclusion rule. Each rung's section opens with the answers of the record's section 5 that it follows. The stops reserved for Pavol in this batch, on top of the standing ones: a changed interpreter output in D's comparison that its step 2 does not account for; a line of C4's model or of the APL base, which is shown to him as a diff first; any edit under Specification-1.0-frozen/ or to the three number chapters; Z editing compiler/StaticChecker.java (the checker-count tool's copy); any rung editing a file another rung of this batch owns; and a checker rule that accepts a program the specification, as rung S revises it, refuses. Three standing stops are lifted by his decisions and by nothing else: D's added members on the declared integer types of the one library, which the standing text calls a change to a declared type, and D's restated assertions in six of the team's tests (POSITIONS.md, the entry on rung O and the fifth batch-5 answer), and Z's promotion of three XXX tests into plain ones (POSITIONS.md, design B); none of them deletes a test. A stop that a rung meets and that is not lifted holds the commit stage's push, as batch 4's landing held it. Z's size case in checkP stands on rung S's text: if S does not land and Z does, the gather applies Z without its TypeAnalyzer.scala hunk and without its two row-402 tests (git apply --exclude=<path> on Z's patch, one per file), leaves row 402 open with a note, and folds none of Z's record lines that close it. If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and the gather composes the file from it, as in batches 3.5 and 4. Cite a FACTS.md entry by its bold title beside its line, since the gather's own insertions move lines. Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md section 6)."
const BATCH_OVERLAPS = "None at file level. D edits Library/FortressLibrary.fsi and .fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss (NN32's block only), Library/RangeInternals.fss, Random.fss, ChunkedSparseArray.fss and IntMap.fss, adds classes to interpreter/glue/prim/Int.java, Long.java, NN32.java and UnsignedLong.java, restates six tests in ProjectFortress/tests/ and adds one there. S edits Specification/ (never Specification-1.0-frozen/, never the three number chapters) and re-renders Specification/fortress.pdf. Z adds compiler/runtimeValues/RTTIsize.java and its unit test, edits runtimeSystem/MethodInstantiater.java and Naming.java, compiler/codegen/CodeGen.java, compiler/OverloadSet.java and scala_src/types/TypeAnalyzer.scala, and adds and renames tests in ProjectFortress/compiler_tests/. D's new test moves the testSystem shards; the gate compares them by their sum. The checker count reads D's apis through Z's checker; the two do not add, and the review ties each moved row to a rung edit. The files every rung reaches are the three record files, folded centrally by the gather."
const LEDGER_FROM = 405   // the first free ledger row when the batch was planned (the highest is 404)

const D_TAIL = [
"",
"## Your rung: D - the wrapping operators",
"",
"SLUG is rung-wrap-operators. WORKTREE is /home/user/fortress-wrap, branch wip/rung-wrap-operators.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-5.md, section 3, under \"D. The wrapping operators\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q2 = (a). (Section 5 of the batch record gives the question and both options; where this section says \"under Q2 = (b)\", that text applies only if the coordinator has written that letter here. How NN32 and NN64 bind the new operators is decided, not asked: section 5, U.)",
"",
"**The problem.** Under walk, +, -, unary - and multiplication on the fixed-width integers keep the low 32 or 64 bits of a result that does not fit, where the specification says \"For integer results, overflow throws an IntegerOverflow\" (Specification/basic/operators/opr-overview.tex:154-155, :195-196). The specification gives code that means to wrap operators of its own, which \"do not overflow\": wraparound addition and subtraction DOTPLUS and DOTMINUS (:205-209), wraparound multiplication DOTTIMES (:172-176), a unary DOTMINUS beside unary - (Specification/basic-lib/basic-integers.tex:376-384), and on the unbounded ZZ the same operators as +, - and multiplication, since operations on it \"never need to wrap or saturate\" (:369-370); the parser reads the ASCII names as the specification's characters (ProjectFortress/src/com/sun/fortress/parser/Literal.rats:263, :270-271). The interpreter's library declares none of the three, so a use ends a walk run with \"Operator ? is not defined\" (ledger row 348). Code of the 2012 tree that means to wrap therefore spells it +, - or multiplication and relies on walk wrapping: four library files and six of the team's tests (row 403; explorations/reviews/wrap-dependent-code.md sections 3, 9 and 11). While it does, row 379's fix cannot land: with the ten signed natives checked, 11 interpreter tests stop with an uncaught IntegerOverflow (explorations/compile-ladder/rung-walk-overflow/REPORT.md section 1). The compiled path throws on these operations already, so the same bodies throw there at the switch-over whatever walk does (explorations/compile-ladder/rung-walk-overflow/JUDGE.md section 3, point 1).",
"",
"**The decisions.** Pavol, 2026-09-26 (explorations/coordinator/POSITIONS.md:108), the note's option 1, the specification's own way: the wrapping operators declared on Integral[\\I\\] and on ZZ32, ZZ64, NN32, NN64 and ZZ in the interpreter's library, \"bound to wrapping natives of their own beside the checked ones\"; the library bodies that mean to wrap and the team tests that assert or rely on wrapping \"rewritten with them, every expression fully parenthesised since the operators' precedence is stated only among themselves, and the strided distance that must not overflow is reordered and keeps the checked operators\"; the saturating family left for a step of its own. The fifth batch-5 answer (:149): the rung \"also rewrites the intended wraps in Steele's ProjectFortress/tests/UnsignedTest.fss (:195-211, unary - as 2^w minus a value, and the wrapping products) and any unsigned wraps in the library\", \"keeping the values and changing no output\". Checking the natives, signed and unsigned, is rung O in batch 6, not this rung (explorations/coordinator/PLAN.md:35; POSITIONS.md:149).",
"",
"**What it declares.** In the layout + has in each trait, with the specification's spellings and not the compiler prelude's reversed ones (row 348; explorations/compile-ladder/rung-walk-overflow/JUDGE.md section 5, step 1):",
"- on trait Integral[\\I\\], abstract: opr DOTPLUS(self, b:I):I, opr DOTMINUS(self, b:I):I, opr DOTMINUS(self):I and opr DOTTIMES(self, b:I):I (Library/FortressLibrary.fsi:414-436, Library/FortressLibrary.fss:615-644), which the range library needs, being generic in I extends Integral[\\I\\] (Library/RangeInternals.fss:1013, :1183);",
"- on ZZ32 (Library/FortressLibrary.fss:646-702, api Library/FortressLibrary.fsi:465-497) and ZZ64 (.fss:704-772, api .fsi:499-535): bodies bound to new wrapping native classes, four per width (add, subtract, multiply, negate) with today's bodies (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:98-120, Long.java:112-134), written after the last class of each file so that no Java line an interpreter stack trace prints moves. They are new classes because batch 6's rung O changes today's classes in place (explorations/compile-ladder/rung-walk-overflow/natives.patch); +, - and multiplication stay on today's classes, unchanged;",
"- on NN64 (.fss:774-824, api .fsi:438-462) and on NN32 (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:387-448, api ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:82-107): bodies bound to new wrapping native classes, four per width, with today's bodies (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java:103-126, UnsignedLong.java:104-125), written after the last class of each file, beside NN32$Add, UnsignedLong$Add and their siblings, which +, -, unary - and multiplication keep and which batch 6's rung O then checks in place (POSITIONS.md:149); the shape of the signed widths, and the one the team's 2011 compiler library gives every integer type (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:766-775);",
"- on ZZ (.fss:826-898): bodies bound to the exact natives +, - and multiplication use (BigNum$Add, BigNum$Sub, BigNum$Mul, BigNum$Negate), since on ZZ the operators are the plain ones (basic-integers.tex:369-370).",
"",
"**What it rewrites.** Every respelled expression gives the value it gives today, because the wrapping operator is the arithmetic the site gets today, and every one is fully parenthesised: DOTPLUS and DOTMINUS have a precedence stated only against each other and against DOTTIMES (Specification/appendices/operators.tex:215-224), and \"If no precedence relationship is stated explicitly\" between two operators, \"then there is no precedence relationship between those two operators\" (:27-29). The sites are those of explorations/reviews/wrap-dependent-code.md section 9, cases (a) to (i):",
"- Library/RangeInternals.fss, the six range splits (:1030-1031, :1045-1046, :1200-1201, :1220-1221, :1241-1242, :1265-1266): split-1 becomes (split DOTMINUS 1), and (lo BITXOR hi)+1 becomes ((lo BITXOR hi) DOTPLUS 1). The strided distance ... - lo - 1 at :1201, :1221, :1242 and :1266, which must not overflow rather than wrap, is reordered so that 1 is subtracted from the split point first and lo after, and keeps the checked operators.",
"- Library/Random.fss:235 and :241: ((mult DOTTIMES widen(state)) DOTPLUS add) MOD modulus, and the same with widen(newseed BITXOR p).",
"- Library/ChunkedSparseArray.fss:76: popCount((mask DOTMINUS 1) BITAND fe).",
"- Library/IntMap.fss:675-676: partitionL(((mn DOTMINUS 1) BITXOR mx) DOTPLUS 1) and (DOTMINUS p) BITAND mx.",
"- ProjectFortress/tests/HeapTest.fss:98: ((c1 DOTTIMES n) DOTPLUS c2, n).",
"- ProjectFortress/tests/intPrim.fss:21-22 and longPrim.fss:21-22: (a.minimum DOTMINUS 1) and (a.maximum DOTPLUS 1). The assertions that - and + throw there belong to rung O in batch 6, since this rung leaves the natives wrapping. longPrim's a: ZZ64 = 0 holds a ZZ32 (row 146) and stays as it is.",
"- ProjectFortress/tests/QuickCheckTest.fss:89-90 and ReflectiveQuickCheckTest.fss:16-17: the associativity property stated of DOTPLUS, ((p DOTPLUS q) DOTPLUS r) = (p DOTPLUS (q DOTPLUS r)), which still should pass.",
"- ProjectFortress/tests/UnsignedTest.fss: every intended unsigned wrap, unary - as 2^w minus a value and the wrapping products and differences, at :195-211 by the decision and wherever else the logging pass below finds one (by reading also :155-157 and :173-180, and their twins in the file's NN32 half, :50-52, :68-75 and from :89), respelled with DOTMINUS, DOTPLUS and DOTTIMES.",
"- Any wrap over NN32 or NN64 in a library body that the logging pass finds.",
"- Nothing else. Code that must avoid overflow is reordered, not respelled with a wrap it does not mean (wrap-dependent-code.md section 9, \"In general\").",
"",
"**The test, first.** One new file in ProjectFortress/tests/, the interpreter's corpus, in the form of tests/roundBug.fss (a component exporting Executable whose run() asserts), as rungs I and C did: DOTPLUS, binary and unary DOTMINUS and DOTTIMES wrap at the minimum and the maximum of ZZ32, ZZ64, NN32 and NN64, and on ZZ equal +, - and multiplication; ZZ64 values are made with widen, not from numerals (row 146); each assertion's message cites opr-overview.tex:172-176 or :205-209. Captured failing before the edit (row 348's \"Operator ? is not defined\", exit 255). It is not an XXX file, and a file in that directory needs no .test file (FACTS.md, \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\").",
"",
"**No output changes: the comparison.** The rung's stop is any changed interpreter output, and before it reports, the rung shows there is none:",
"1. Every file of ProjectFortress/tests/ except the new test runs under walk in three passes, base A, the edit, base B, one JVM per test with private caches, with rung O's runner and comparison (explorations/compile-ladder/rung-walk-overflow/count-run.sh, count-compare.py; its REPORT.md section 2). A file whose two base passes differ varies on its own and is judged by hand, as rung O judged its seventeen.",
"2. Under Q2 = (a), three things are normalised before comparing, and nothing else: the Java line numbers in a printed stack frame and an object's identity hash (@ followed by hex digits), as explorations/compile-ladder/rung-interp-coercion/compare-runs.py normalises them, which is how Pavol read rung C's three changed outputs (POSITIONS.md:106); and every Fortress source position in a file this rung edits, mapped back to its base line through the edit's line map, because the new declarations move every line below them in FortressLibrary.fss and FortressBuiltin.fss (precedent: explorations/compile-ladder/rung-library-comments/remap-lines.py). Every normalised difference is listed in REPORT.md with its file, and the same list is a capture under probes/, so that it survives a refused report file (section 8). Under Q2 = (b), nothing is normalised.",
"3. Any other difference in a stable file, or any changed exit code, is the stop.",
"4. The logging pass, which reads no output: rung O's probes/overflow-probe.patch (each native prints a line where it meets an overflow, and still wraps), extended to the add, subtract, multiply and negate natives of NN32.java and UnsignedLong.java, is run as a classpath shadow over every file of ProjectFortress/tests/, over ProjectFortress/demos/*.fss and over the two microGPT check programs (explorations/run-c4/src/MicroGptFlatCheck.fss, explorations/apl/mg/MicroGptAplCheck.fss), on the base and after the edit, each demo with a timeout of 120 s and the ones that reach it listed. On the base it names every site that relies on a wrap: rung O's eleven files, and whatever batch 4's landed rungs added, since rung K's widened shift makes a ZZ32 sum wrap at 32 bits where it used to be a ZZ64 sum (explorations/compile-ladder/climb-batch-4/RECORD.md, \"For rung O when it runs again\"). After the edit the ten signed natives and the eight unsigned ones must meet none, which predicts batch 6's rung O count at zero on all eighteen; the pass's site list before and after is a capture under probes/, as rung O's probes/overflow-probe-summary.txt is.",
"5. Each changed file's outputs go under probes/count/, as rung O's do, and every pass is headed by the machine line (explorations/protocol.md section 6).",
"",
"**Files it may touch.** Library/FortressLibrary.fsi and .fss (the declarations above, nothing else); ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss (NN32's block only); Library/RangeInternals.fss, Library/Random.fss, Library/ChunkedSparseArray.fss and Library/IntMap.fss (the sites above, and any wrap the logging pass finds); interpreter/glue/prim/Int.java, Long.java, NN32.java and UnsignedLong.java (the new classes only); the six test files named above and the new one; its own directory.",
"",
"**Java or Scala.** Java and the library. ant compileAll before the test can pass, and default_repository/caches/global.map restored after it (FACTS.md, \"ant compileAll deletes a tracked file\"); the interpreter's caches wiped before every run that reads the edited library.",
"",
"**The checker count.** Predicted 125, unchanged. The stage reads Library/FortressLibrary.fsi and FortressBuiltin.fsi, and both apis stop at their hierarchy errors (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:268-272; in the FortressBuiltin api NN32's own header FortressBuiltin.fsi:82 is among them, in the batch 4 gate's full checker output, which is not committed) before any check that reads a method's declaration, as rung K measured for its api lines (FACTS.md, \"The interpreter's integer rules\"). The rung captures the stage's table before and after its edit and declares the total it measured.",
"",
"**What must stay green.** Every interpreter test, printing what it prints today (the comparison); ProjectFortress/tests/IntSemanticsRungI.fss; ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss, which stays row 379's expected failure because the ten natives are unchanged; the team's shift tests, BitTwiddle.fss:33-39, the shift assertions of UnsignedTest.fss:30-137 (whose other lines this rung respells) and QuickCheckTest.fss:97-103.",
"",
"**Stops.** Any changed interpreter output or exit code that step 2 of the comparison does not account for. A site whose value would change. A difference the rung traces to its own respelling is the rung's to fix; one that the correct respelling leaves is the stop, and it is Pavol's to read (\"changing no output\", POSITIONS.md:149), not a judge's: the rung reports stopped with the list, as rung O did with its count. A declaration changed other than by the additions named. An edit to a file another rung of this batch owns, or to any file not named above. A line of C4's model or of the APL base (explorations/run-c4/src/, explorations/apl/mg/): none is expected, and any is shown to Pavol as a diff before it is built (POSITIONS.md:39). Adding members to the declared integer types of the one library is not a stop here, because Pavol's decision names these declarations (POSITIONS.md:108), and restating the assertions of six team tests is not the deletion of a test and is his decision too (:108, :149).",
"",
"**For the skeptic.** The compiled path spells DOTPLUS and DOTMINUS as saturating and has no DOTTIMES (row 348, gated by ProjectFortress/compiler_tests/XXXBoxDotSpellingsRungW.test), so a compiled differential of the new operators differs from walk by design until the switch-over, and that is not a finding. The differentials that matter: each new operator under walk against the wrapped value the specification gives, at both signed widths' bounds and at the unsigned widths; each rewritten site under walk before and after, which must agree; an unparenthesised mix of DOTPLUS with + or BITAND, which must be refused rather than read with a precedence the specification does not state; and the comparison's normalised lines, one by one. Library/Random.fss:235 writes a field, and the respelling leaves the write as it is.",
"",
"**What comes back to Pavol.** The normalised differences, if any; the logging pass's sites before and after the edit; the unsigned sites found beyond UnsignedTest.fss:195-211.",
"",
"**What it closes.** Row 403, with the logging pass as its evidence: the library and the tests no longer rely on +, - or multiplication wrapping. Row 348's interpreter half, since walk has the specification's wrapping spellings; its compiled half, the prelude's reversed spellings in 10 compiled test files, closes at the switch-over. Row 379 stays open for rung O in batch 6, its note pointing here.",
"",
].join('\n')

const S_TAIL = [
"",
"## Your rung: S - the specification",
"",
"SLUG is rung-spec-route-a. WORKTREE is /home/user/fortress-spec, branch wip/rung-spec-route-a.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-5.md, section 3, under \"S. The specification\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q5 = (b). (Section 5 of the batch record; under Q5 = (a), route C also gets an entry in the internal appendix's \"Proposed Features\" section, Specification/appendices/future.tex:12.)",
"",
"**The problem.** The specification (Specification/, the July 2012 draft, the project's standard) never states the rule route A keeps, that no type is a subtype of two different instantiations of one generic, and says the opposite (Specification/basic/trait-parameters.tex:339-340, :365-367); and its examples use shapes the rule refuses: three where-clause examples, Nothing, the root's algebra, three passages of the internal appendix, and the number tower (FACTS.md, \"The specification's own examples that the multiple instantiation exclusion refuses\"). Pavol's requirement (explorations/coordinator/POSITIONS.md:85): \"our plan needs to update the spec with the change that we do and somehow properly record why we decided that way, so that there is no open discrepancy between the spec and our implementation that would be confusing to people. We need to preserve the original historic record somewhere in a document with our reasoning why we did the switch and preserve the option to go the route C.\" It is an edit to the original tree and is flagged as one.",
"",
"**The decisions.** Route A (POSITIONS.md:92). The form, S1 (:109): \"1, teams' way\", the layered form of explorations/reviews/spec-change-form.md section 9, option 1. The team's later Types chapter cited beside Specification/ wherever it covers a topic (:110). The per-example verdicts, S2 (:111-130), from explorations/reviews/spec-refused-examples-judgement.md sections 3 to 5 and 7. The number chapters (:132): \"Rung S in a batch without the flattening rung leaves them untouched and lists them as deferred, with the reason.\" The unrevised copy's name (:145): \"the Working Draft of February 2011\", each citation with its path and line in Specification-1.0-frozen/, which stays untouched. Sizes count (:146): \"Every static argument counts except operator arguments. Rung S states the rule that way.\" The covariant keyword (:147): one sentence in the revival callout at the covariance example. Row 404 (:131).",
"",
"**What it writes.** First, before any edit, the list: every passage of Specification/ outside library/apis/ that the rule refuses or that states the rule's opposite, each with its file:line, its verdict from the judgement, and whether it is revised now or deferred. The judgement's inventory is the start (sections 3.1 to 3.5 and 7) and the gatherer's scan its check (explorations/reviews/spec-refused-examples.md). Then, from the judgement's section 7:",
"- The rule, once, in Luchangco's two-part form (Documentation/Specification/Prose/Language/types.tick:353-376), over every static argument except operator arguments. In Specification/basic/types-vals-vars.tex, beside the exclusion properties (:210-216), which instantiations exclude each other: two instantiations of one generic trait exclude each other unless every static argument other than an operator argument is the same; named \"instantiation exclusion\", the later chapter's short form, with \"multiple instantiation exclusion\" and the type group's paper cited (Papers/Types/exclusion.tick:141-152). In Specification/basic/traits.tex, beside the \"Not allowed\" example (:286-292), the rule on declarations: a trait or object may not extend two different instantiations of one generic, directly or through its supertraits. Operator arguments do not count (judgement section 4); sizes and boolean arguments do (judgement section 6). The section's definition, the relations are \"the smallest ones that satisfy all the properties given\" (types-vals-vars.tex:184-189), keeps its form.",
"- The where-clause section, Specification/basic/trait-parameters.tex: one sentence, that a where-clause variable may not appear as a static argument in an extends clause. The covariance example (:339-353) is kept as \"Not allowed\", with the library's widening function with bounded static parameters as the way (Library/CovariantCollection.fss:14-35), and its callout carries one sentence: that the type group's later design declares variance with a covariant modifier (types.tick:320-339), that it is implemented on neither path, and a pointer to the decision record and ledger row 404. \"A subtrait of every instantiation\" (:355-381) is kept as the counterexample that introduces the rule, with the sentence that it is not allowed and why. The empty list (:382-399) is kept as \"Not allowed\", with object Empty[\\T\\] extends List[\\T\\] beside it. Luchangco's note at basic/traits.tex:174-180 is answered there.",
"- Specification/basic-lib/convenience.tex:37-53: value object Nothing[\\T\\] extends Maybe[\\T\\], the library's (Library/FortressLibrary.fsi:864), with no excludes clause, which the grammar gives no object (Specification/basic/objects.tex:84-86), and Maybe[\\T\\] comprises { Nothing[\\T\\], Just[\\T\\] }; the defaults in Specification/basic/exceptions.tex:110-129 and Specification/basic-lib/exception.tex:22-23 become Nothing[\\String\\] and Nothing[\\Exception\\].",
"- Specification/basic-lib/objects.tex:134-140 and :149-156: Object and Tuple without the algebraic supertraits, as the library has them (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32), with === an operator on Any (Library/FortressLibrary.fsi:2474).",
"- Specification/appendices/internal-document.tex: one sentence at each of :305-362, :363-417 and :483-512.",
"Each original stays in the text as \"Not allowed\", the specification's own form (basic/traits.tex:286-292). Each changed example is written in its file's convention, the plain Fortress in % comments above the typeset Fortress block (basic-lib/objects.tex:134-140 is one); an example generated from SpecData/examples/ (Specification/fortress/build.xml:121-157) is reported, not edited.",
"",
"**The form.** S1's option 1, as spec-change-form.md section 9 gives it:",
"- the normative sentences edited in place;",
"- at each changed passage a labelled callout, a new macro that prints in both builds, not the team's \\note, which reads as the authors' own and is empty in a release build (Specification/fortress/fortress.tex:35-36, :58-62);",
"- in Appendix I (Specification/appendices/changes.tex:12-16, in the build through Specification/appendices/appendices.tex:23) a section \"Changes made by the 2026 revival to the working draft\", one entry per change, with the affected section, the change, the rationale, the effect, the original text verbatim cited as \"the Working Draft of February 2011\" with its path and line in Specification-1.0-frozen/, and route C with what reversing to it takes (FACTS.md, \"Route C built whole as a shadow\"). The section says once that the directory's name is misleading, its sources being the working draft of 2011-02-02 and only fortress.1.0.pdf in it the 1.0 release (POSITIONS.md:145; FACTS.md, \"Specification-1.0-frozen/ is byte for byte the working draft of 2011-02-02\"), and it lists the three number chapters as deferred, with the reason;",
"- one paragraph in the front-matter figure (Specification/fortress/preamble.tex) and a changed title-page line (Specification/fortress/fortress.tex:111-115);",
"- the full reasoning in the decision record in the rung's own directory, cited by each entry: per passage the original text verbatim with its file:line at the base and in the frozen copy, the new text, the reason (route A and the judgement's verdict), route C as the way back with its measured state and its cost, and, at the covariance example, the covariant keyword as the type group's later direction (types.tick:320-339, :355-360; row 404). The record also states the correction of CLIMB-BATCH-4.md section 1, question 2, option (b), which row 389 overturned (the batch record, section 2).",
"The frozen copy's lines equal Specification/'s in every file this rung edits except two. In basic-lib/objects.tex, Specification/ has two more lines at :17-18 (the stray \\tracingcommands line of the parentless import 5a68404fd), so its :134-140 is :132-138 in the frozen copy; fortress/fortress.tex was restyled by the revival (4672b71cd). Each citation is read from the frozen copy itself. The stray line stays: removing it is not this rung's decision.",
"",
"**Deferred.** Specification/basic-lib/basic-integers.tex, Specification/basic-lib/numbers.tex and Specification/advanced-lib/numbers-advanced.tex are not touched. They change with the flattening rung in batch 6, never earlier (POSITIONS.md:132; judgement section 3.3), because a specification that runs ahead of the library is as much an open discrepancy as one that lags it. Until then the revised rule refuses the nested tower those chapters still describe, as the checker refuses the library's (FACTS.md, \"The compiled checker's exclusion rule is the designers' multiple instantiation exclusion\"); the Appendix I section says so. RationalQuantity is a question for the flattening rung's brief (explorations/coordinator/PLAN.md:79).",
"",
"**How it is checked.** No test can go red for a prose edit; the precedent is batch 3's comment-only rung (\"None, and the record says why\", explorations/coordinator/CLIMB-BATCH-3.md:114). The specification is built. The build is two targets in Specification/fortress/, with FORTRESS_HOME set to the worktree: ./ant genSource, then ./ant tex (Specification/fortress/README:5-14). genSource (Specification/fortress/build.xml:107) makes the machine-generated inputs: the three reserved-words tables by Perl (:109-118) and, by texExs (:121-157), the renderings of the examples under SpecData/examples/ and the api chapters of Part Library from Library/*.fsi and ProjectFortress/LibraryBuiltin/*.fsi, which bin/foreg and bin/fortex make by running Emacs in batch mode over Fortify/fortify.el. Every one of these outputs is gitignored (.gitignore:53-60) and absent from a fresh worktree, and fortress/fortress.tex:152 inputs Part Library unconditionally (library/library.tex:19, library/default-libraries.tex:27), so tex alone (:70-80: the reserved-words tables, bib, then two pdflatex passes) stops at the first missing input; the README's sentence that tex regenerates every machine-generated file describes genSource. The build is untested on this container (CLAUDE.md, \"Layout\"): it last ran on 2026-08-23 in another one, when two revival commits changed the source and re-rendered the committed PDF, 599 pages (4672b71cd, 9622f9db3). pdflatex, bibtex, perl, emacs, pdftotext and the mdframed package are installed here (read with which and kpsewhich on 2026-09-26). The build file's task definitions load from ProjectFortress/build (build.xml:47-58), which is copied into the worktree; ant compileAll is run only if they fail to load. Required:",
"- genSource and tex on the base and after the edit, all four logs captured;",
"- the build directory's PDF copied to Specification/fortress.pdf, as both precedent commits did (.gitignore:40 ignores the build directory's copy);",
"- pdftotext of the base build's PDF and of the edited build's, diffed: only the revised passages, the callouts, the appendix section, the front matter and page shifts differ; and pdftotext of the base build's PDF against the committed PDF's, reported, which says whether this container's TeX renders the sources as the 2026-08-23 one did;",
"- git diff --stat showing only the listed .tex files and the PDF; the generated inputs are ignored and are not committed.",
"The fallback, if the base build fails for a reason outside the rung's edits: the first error recorded, with the target it came from. If genSource fails, the failure is in the Fortress tools (Emacs over fortify.el, or the ant tasks over the worktree's classes): ant compileAll in the worktree and one retry; if it still fails, no PDF can be built, since Part Library and the examples are inputs of every build. If genSource passes and tex fails in bibtex, ./ant onlyTex (:81-90, two pdflatex passes without bibtex) is tried, and its PDF is used only if its pdftotext against the committed PDF differs where the edit does and nowhere else. Otherwise the sources are edited and each edited file checked mechanically (braces and environments balanced, each new macro defined once, each \\input resolving), Specification/fortress.pdf is left at the base, and the record and the handover line say that the committed PDF lags the source, which comes to Pavol as an open item. A build that passes on the base and fails after the edit is the rung's to fix; it does not land broken.",
"",
"**Files it may touch.** Under Specification/, not Specification-1.0-frozen/: basic/types-vals-vars.tex, basic/traits.tex, basic/trait-parameters.tex, basic/exceptions.tex, basic-lib/convenience.tex, basic-lib/exception.tex, basic-lib/objects.tex, appendices/internal-document.tex, appendices/changes.tex, fortress/preamble.tex, fortress/fortress.tex (the callout macro and the title-page line), whatever else its list finds outside the three number chapters, and Specification/fortress.pdf; its own directory. No source, library or test file.",
"",
"**Java or Scala.** Neither.",
"",
"**The checker count.** 125, unchanged: the stage reads the compiled checker and Library/, and this rung touches neither.",
"",
"**Stops.** Any edit under Specification-1.0-frozen/. An edit to one of the three number chapters. A passage whose new text neither the rule nor the judgement's verdicts settle: the rung reports it and does not choose. New normative text for a construct that runs on neither path, other than the one decided callout sentence on covariant. The build changing a tracked file other than Specification/fortress.pdf.",
"",
"**For the skeptic.** There is no program to run both ways. The checks are: the list against the specification (every refused passage outside the number chapters is on it, and nothing else is edited); every quoted original against git show <base>:<path> and against the frozen copy's line; the two builds and the pdftotext diff; and each replacement's claim to run on both paths against the captures under explorations/reviews/spec-refused-examples/captures/ (AltEmptyParam, AltCovariantBounded, and the library's Nothing[\\T\\], judgement section 3).",
"",
"**What comes back to Pavol.** The revised pages, as the pdftotext diff and the PDF; the Appendix I section; the front-matter paragraph and the title-page line, whose wording is the rung's; the decision record.",
"",
"**What it closes.** No ledger row. Notes appended: row 402, that the specification now states the rule over sizes (the checker's size case is rung Z's); row 331, that the specification's Nothing is the library's Nothing[\\T\\]; row 404, that the covariance callout points to it.",
"",
].join('\n')

const Z_TAIL = [
"",
"## Your rung: Z - sizes at run time",
"",
"SLUG is rung-size-runtime. WORKTREE is /home/user/fortress-size, branch wip/rung-size-runtime.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-5.md, section 3, under \"Z. Sizes at run time\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q3 = (b). (Section 5 of the batch record; where this section says \"under Q3 = (a)\", that text applies only if the coordinator has written that letter here.)",
"",
"**The problem.** Since rung N the compiled checker accepts a program with a size, a nat or int static parameter such as the 3 of Vec[\\RR64,3\\], and then the compiled program fails. It dies at load with NoClassDefFoundError: 3$RTTIc, because the run time has no object for a number (ProjectFortress/compiler_tests/XXXNatArgRungS.fss); code generation refuses an overload set with a size-generic arm (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1199; compiler_tests/XXXNatDispArmChecker.fss) and a size in an extends clause (compiler/codegen/CodeGen.java:5793; compiler_tests/XXXNatOverrideChecker.fss); and a size used as a number in a body fails at load (pNatVec$s0; FACTS.md, \"A size at run time can follow the opr path, 28 lines, and a size in value position is 25 more\"). The specification makes a size a value: \"These parameters are instantiated at runtime with numeric values\" (Specification/basic/trait-parameters.tex:82-86). And the checker's exclusion rule compares type arguments only, so two different sizes of one generic do not exclude each other (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:455-468, \"Todo: Handle int, nat, bool args\"; ledger row 402).",
"",
"**The decisions.** Design B, 2026-09-24 (explorations/coordinator/POSITIONS.md:93): \"a size at run time gets the same descriptor object a type argument has, filling the slot the team's code generator already reserved\"; the rung is \"B's 60 built lines, the per-literal emitter or the factory variant, the 25-line value-position piece, gated by the five sized compiler tests and the four probe programs\"; the two defects found on the way \"become ledger rows at the size rung's gather\". The factory, 2026-09-26 (:148): \"RTTIsize.of(n) keeps one descriptor per number in a table, with no holder class. The run-time size rung is briefed with it and with the one-method hash fix, and it measures the table lookup's cost on a dispatched call\"; it is the team's instantiation pattern applied to numbers (ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:2677-2720). Sizes count in the rule, 2026-09-26 (:146): \"The run-time size rung's brief takes row 402's checker fix at checkP with its test, and measures whether any library declaration is newly refused.\" The rule as it goes into this brief, with its bracket settled by the factory: explorations/reviews/size-runtime-design-brief.md section 9.",
"",
"**The evidence on file.** Built and measured on shadow stacks before rung N landed; each patch is evidence of a piece's shape, not the edit, and the rung says where its edit departs. The descriptor class, 17 lines (explorations/perf-probes/nat/java/java-shadow.patch, its RTTIsize.java half; its FnNameInfo.java half landed with rung N). The factory, 26 lines added and 4 removed in RTTIsize.java, runtimeSystem/MethodInstantiater.java, compiler/codegen/CodeGen.java and compiler/OverloadSet.java, about 20 without the probe's flag (explorations/perf-probes/nat/size-rung-probes/size-factory.patch; size-rung-probes.md section 2.1). The hash, one method (size-rung-probes/size-hash.patch): every size hashes alike today (size-rung-probes/r1-descriptor.txt:7), 17 distinct of 17 with the fix (:28). The dispatcher, 29 lines (explorations/perf-probes/nat/size-probes/dispatch-b.patch). The extends clause, 14 lines (size-probes/extends-b.patch). Value position, 25 lines in runtimeSystem/Naming.java, MethodInstantiater.java and CodeGen.java (explorations/perf-probes/nat/runtime/value-position.patch). On nine programs the factory gives the answers the holder classes give (size-rung-probes/r2-summary.txt), and DOT's shared size needs no code of its own: the dispatcher compares the two sizes with the check the team wrote for a type variable in two invariant positions (compiler/OverloadSet.java:1481-1505; size-rung-probes.md section 3). The costs: a few kilobytes at load and nothing on the hot path (explorations/perf-probes/nat/size-cost.md); the factory's table lookup on a dispatched call through a literal leaf was not measured (size-rung-probes.md section 4).",
"",
"**What it builds.**",
"1. The descriptor: compiler/runtimeValues/RTTIsize.java, whose className() is the size's text as NamingCzar.spkTagger writes it, whose runtimeSupertypeOf is true only for an equal size, and whose hashCode is its text's; RTTIsize.of(text) keeps one descriptor per number, with no holder class; MethodInstantiater.rttiReference, the extends-clause push and the dispatcher's literal leaf call it instead of reading <n>$RTTIc.ONLY.",
"2. The extends clause: a size symbol pushes the parameter's field, and a literal the number's descriptor (CodeGen.java:5784-5793).",
"3. The dispatcher: a size symbol in an arm's parameter type is read off the value's descriptor through its getter and handed to the closure loader as a type variable is; a literal compares descriptors; a size parameter's extends Object bound is not checked (OverloadSet.java:1199).",
"4. Value position: a size read as a value compiles to a Nat constant in the loader's substitution channel, which the loader replaces with an integer LDC of the instantiated text followed by IntLiteral.make(int) (CodeGen.forVarRef; FACTS.md, the entry named in the problem).",
"5. Row 402: an SIntArg case in cP beside the STypeArg case (TypeAnalyzer.scala:460-463), so that two different literal sizes exclude each other, as rung S states the rule. It is kept separable: its edit touches only TypeAnalyzer.scala, and its two tests are files of their own, so that the gather can apply the rest of the rung without it if rung S does not land (the batch record, section 4).",
"6. Row 366, under Q3 = (a) only: MethodInstantiater.rttiReference takes the descriptor's ONLY when no descriptor-bearing argument is left (three lines, measured on row 366's reproducer, explorations/perf-probes/nat/size-probes/s4-row366.out), and compiler_tests/XXXOprParamRungS is promoted if it passes. Under Q3 = (b) this rung does not touch row 366.",
"Out of scope: arithmetic in a size; bool, dim and unit parameters; a size made from a number known only at run time (array[E](n), with the array design after the switch-over, explorations/coordinator/PLAN.md:57).",
"",
"**The test, first.** Each piece's test is written and captured failing before the piece, in ProjectFortress/compiler_tests/, as a component printing PASS with a .test file driving link and run with run_out_contains=PASS, or run_out_equals where the printed value is the point:",
"- the four probe programs, explorations/perf-probes/nat/size-probes/pNatDisp.fss, pNatDispTrait.fss, pNatDispSize.fss and pNatDispLit.fss, with the answers size-rung-probes.md section 2.2 gives;",
"- the programs of the design brief's rule: explorations/perf-probes/prelude/pNat1.fss, explorations/perf-probes/nat/runtime/pNatOver.fss, explorations/perf-probes/nat/NatExtends1.fss, NatExtends2.fss and pNatVec.fss, and size-probes/NatGetter.fss, pNatCase2.fss and pNatCaseGen.fss;",
"- DOT's shared size and a literal size in an extends clause, size-rung-probes/pDot.fss (3, -1, 3, -1 -1) and pExtLit.fss (1 2 1 2 -1);",
"- the hash, as a Java unit test beside RTTIsize.java in the tree's form for one (ProjectFortress/src/com/sun/fortress/runtimeSystem/NamingJUTest.java; the root build.xml:801 runs every *JUTest): sizes 0 to 16 give 17 distinct hash codes (size-rung-probes/SizeCheck.java);",
"- row 402: object V extends { Vec[\\3\\], Vec[\\4\\] } refused with the rule's error, an XXX compile test pinned by compile_err_contains (the judgement's JSizeDouble, explorations/reviews/spec-refused-examples-judgement.md section 6); and the pair g(b: Tg[\\3\\]), g(b: Tg[\\4\\]) on a generic trait accepted, compiled and run, printing 3 and 4 as its type twin does (explorations/compile-ladder/rung-nat-checker/probes/skeptic/SkLitTrait.fss).",
"The three expected failures rung N left for this rung, XXXNatArgRungS (with its link half NatArgRungSLink.test), XXXNatDispArmChecker and XXXNatOverrideChecker, are promoted when they pass: file and component renamed without the prefix (git mv), because a compile or link exception of a component whose name contains XXX is reported as expected whatever its .test file is called (FACTS.md, \"Two constraints of the test and native machinery\"), and each .test file set to link, run and run_out_contains=PASS. If XXXNatArgRungS loads and prints the size other than walk's Vec[\\3\\], it stays an expected failure with its reason re-pointed: the rendering is row 364's, not this rung's.",
"",
"**The measurements.** Each is a capture under probes/, named .txt, cited beside its line in REPORT.md, so that it survives a refused report file (section 8).",
"- The checker count before and after, and, before and after the row-402 piece, the per-declaration run rung N used (explorations/perf-probes/nat/followup/run-all.sh, its perdecl step; explorations/compile-ladder/rung-nat-checker/REPORT.md section 10): which library declarations, if any, the size case newly refuses. Reported, not repaired: the repair would be a line of Library/, which is not this rung's, and each one gets a ledger row.",
"- The table lookup's cost on a dispatched call: a loop through an arm generic in its element type that names a literal size (pNatDispLit's h[\\T\\](v: Vec[\\T,3\\])) against the same call resolved statically, the two interleaved, with the machine line (explorations/protocol.md section 6). If the lookup shows, the remedy on record, the dispatcher's class fetching the literal's descriptor once into a static field (size-rung-probes.md section 2.6), is reported, not built.",
"- Row 400's shape once value position works (explorations/compile-ladder/rung-nat-checker/probes/skeptic/SkDeadVal.fss and explorations/compile-ladder/rung-nat-checker/probes/DeadValWritten.fss): what the dropped arm's unknown size does now, reported in the row's note.",
"",
"**Files it may touch.** compiler/runtimeValues/RTTIsize.java and its unit test, both new; runtimeSystem/MethodInstantiater.java; runtimeSystem/Naming.java; compiler/codegen/CodeGen.java; compiler/OverloadSet.java; scala_src/types/TypeAnalyzer.scala (the cP case); new and renamed files under ProjectFortress/compiler_tests/; its own directory. Any other file is reported as a decision, except these, which are stops: compiler/StaticChecker.java (the checker-count tool keeps a copy checked against its checksum, explorations/coordinator/tools/checker-count/run.sh:36, and an edit makes the stage's #shadow row stale, which is red); Library/, ProjectFortress/LibraryBuiltin/, interpreter/ and Specification/.",
"",
"**Java or Scala.** Both: Java for the run time and code generation, Scala for cP. ant compileAll, then the library-order cache rebuild, since the generated code of sized generics changes.",
"",
"**The checker count.** Predicted 125, not measured. Only the cP piece reaches the checker, and it can move the count either way: up, by a hierarchy error where a library type is below two sizes of one generic; down, by an overloading error cleared where two arms differ only in a size. By reading, the library's Rank1, Rank2 and Rank3 already exclude each other by clause (Library/FortressLibrary.fsi:1077-1083). The rung captures the stage's table before and after and declares the total it measured. The crash row stays none, and no crash line is declared.",
"",
"**What must stay green, or keep its verdict.** The five sized compiler tests, Compiled1.ah, Compiled1.av and Compiled6.af under compiler_tests/AfterTypeChecking.test, and Compiled1.p and Compiled5.z under XXX1p.test and XXX5z.test; compiler_tests/Compiled12.invariantInference.test; rung N's plain tests (NatInferredChecker, NatWrittenChecker, NatMethodChecker, NatExportChecker) and its other expected failures (XXXNatMismatchChecker, XXXNatArithChecker, XXXNatBoolChecker, XXXNatLitArgChecker, XXXNatRetSizeChecker, XXXNatDispRTRChecker), each unless this rung's fix makes it pass and the rung promotes it with its reason; XXXOprParamRungS (row 366), unchanged under Q3 = (b); and, because code generation changes for sized generics, the 85 files of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt under the subset driver of step 7 of the order of work, phase and stdout, before and after the edit, with no move.",
"",
"**Stops.** The stop files above. A number's descriptor that needs anything but the literal's text; an arm whose size occurs in two parameters that needs more than the second occurrence compared by equality (the design brief's two, section 9; the probes met neither). A gated test's verdict changing, other than an expected failure the rung promotes with its reason. A ladder file moving down.",
"",
"**For the skeptic.** RTTIsize.of writes a table any thread may reach, so the manifest sets writesState and every differential runs at FORTRESS_THREADS=1 and =4. Sized programs now run on both paths, so the differential is walk against the compiled run; for row 402's trait pair walk refuses the set (row 402), and there the compiled run is checked against the rule as rung S states it. The cases to probe: two sizes in one call (pDot); a size in an extends clause (pExtLit, NatExtends1); a size read inside a sized object's method (NatGetter); a literal leaf in a dispatched arm (pNatDispLit); a negative int argument, which the factory's first-character test admits (size-rung-probes.md section 2.1); and one size first reached from two threads at once.",
"",
"**What comes back to Pavol.** The lookup cost, with its machine line; any library declaration the size case newly refuses; row 400's shape after value position; XXXNatArgRungS's rendering, if it stays an expected failure.",
"",
"**What it closes, and the rows it opens.** Row 307's run-time half closes (the row stays open for bool, dim and unit), and row 402 closes. Notes: row 214, its compiled twin (pNatDisp) now gated; row 340, explorations/perf-probes/nat/runtime/pNatCase.fss and pTypeCase.fss as further evidence of its shape (the design brief, section 9); row 400, re-measured. The rows owed at this rung's gather (FACTS.md, the entries \"The brief's three size probes\" and \"What a size costs at run time\"):",
"- a ZZ32Vector passed to a generic object's constructor fails at load, because both hand-written vector classes name their descriptor RTTIv while stamped code asks for <class>$RTTIc (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32Vector.java:79-82, runtimeSystem/MethodInstantiater.java:134-138; explorations/perf-probes/nat/size-cost/VecCtorControl.fss; explorations/compiler-probes/vectors/vectors.md): opened, not repaired here;",
"- every size descriptor hashing alike (compiler/runtimeValues/RTTI.java:51; size-rung-probes/r1-descriptor.txt:7): opened and closed by piece 1;",
"- of the size probes entry's four: the checker dropping a size parameter from a generic arrow, opened and closed by rung N's keep-size-params (3f297441c); a dispatched arm generic in a size, opened and closed by piece 3; the compile path giving a size parameter the bound extends Object (compiler/desugarer/PreDisambiguationDesugaringVisitor.java:77-86, :135-148), which the dispatcher now skips, opened; the fourth gap, design A's own, not owed under B (the design brief, section 9).",
"",
].join('\n')

const RUNGS = [
  { id: 'D', slug: 'rung-wrap-operators', path: '/home/user/fortress-wrap', branch: 'wip/rung-wrap-operators', tail: D_TAIL, expectedMinutes: 120, writesState: false, testIsStage: false, expectedCheckerCount: 125,
    blurb: "the specification's wrapping operators DOTPLUS, DOTMINUS and DOTTIMES declared on Integral and the five integer types of the interpreter's library, and the library bodies and six team tests that mean to wrap respelled with them, no output changed (POSITIONS 2026-09-26, rung O and the fifth answer; rows 403, 348). Library, new wrapping native classes, one new interpreter test.",
    expectedMoves: [] },
  { id: 'S', slug: 'rung-spec-route-a', path: '/home/user/fortress-spec', branch: 'wip/rung-spec-route-a', tail: S_TAIL, expectedMinutes: 90, writesState: false, testIsStage: false, expectedCheckerCount: 125,
    blurb: "the specification revised for route A without the three number chapters: the rule stated once over every static argument except operator arguments, the refused examples rewritten to the library's shapes, in the team's layered form with Appendix I entries and a decision record keeping the original text and route C; an original-tree edit, Specification-1.0-frozen/ untouched, Specification/fortress.pdf re-rendered. No source and no test.",
    expectedMoves: [] },
  { id: 'Z', slug: 'rung-size-runtime', path: '/home/user/fortress-size', branch: 'wip/rung-size-runtime', tail: Z_TAIL, expectedMinutes: 150, writesState: true, testIsStage: false, expectedCheckerCount: 125,
    blurb: "a size carried at run time as a descriptor from RTTIsize.of (design B, the factory), with the hash fix, B's dispatcher, the extends-clause and value-position pieces, and row 402's size case in checkP; Java under compiler/ and runtimeSystem/, Scala in TypeAnalyzer.scala; compiler tests, three of rung N's expected failures promoted. writesState, because RTTIsize.of writes a table any thread may reach.",
    expectedMoves: [] },
]
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
const LOG_DIR = 'tmp/gate-batch-' + BATCH          // untracked: .gitignore:65 ignores /tmp/, and .gitignore:42,46 would swallow .out/.log anywhere
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
'4. The interpreter is evidence, not an oracle. The static type checker runs only on the compile path and walk turns it off, so the interpreter accepts programs the language does not and reports what would be type errors as run-time dispatch failures; 55 ledger rows record its own defects. When walk and the compiled run disagree, that is a question and the specification answers it. Three real outcomes: the specification settles it against the compiled run, so repair; it settles it against the interpreter, so the compiled side may be right and a ledger row is owed against the interpreter; or the specification is silent. A silent specification is NOT a reason to stop - it is the reason to think harder: review the architecture around the construct, derive the candidate behaviours with what each costs and what else it touches, decide holistically which is right for the language, execute that one, and write the reasoning down. (The batch record names the stops that apply to every rung of this batch, on top of the standing ones: a change to a declared type the prelude already has, and a renamed or removed declaration a gated test uses.)',
'',
'A fourth case exists and is legitimate: the specification settles the divergence but the repair lies outside this rung\'s scope. Then the rung lands and opens a verified ledger row naming the defect, the specification clause, the probes both ways, the location of the fix and what the fix is. That is what rungs 6 and 7 did with row 317 and it was right.',
'',
'## What a measured defect is worth: the three homes',
'',
'This batch closes the gap the last three campaigns left - 22 defects measured by skeptics, 2 of them gated. Every defect anyone in this rung measures has exactly one of three homes, and the record says which and why:',
'',
'1. **Measured by anyone and repaired in this rung** - by the worker in its own first pass, by the skeptic, or in a repair round: it gets an ASSERTION in the rung\'s own gated test, and that assertion exists and passes BEFORE the second skeptic runs. Not a FACTS line, not a probe: an assertion. The cheapest form is an extra assert in the .fss file the rung already added; a new file is only needed when the defect is in another area. The assert message string carries the citation - the ledger row number or the specification line - and nothing else does: no provenance comment in the source (see "What you write" below).',
'',
'2. **Deferred, and the specification settles it** - the rung does not repair it, but the specification says what the answer is: it gets a gated EXPECTED-FAILURE test, whose file name starts with XXX. The harness makes this a real check, not a wish. FileTests.java:922 sets shouldFail = s.startsWith("XXX") from the file name; :577 and :644 make (shouldFail != failed) the failure condition, so an XXX test that STARTS PASSING turns the suite red, and :841 says the suite prints "XXX tests that succeed". So write XXX<Name>.fss asserting what the SPECIFICATION says, with a .test file beside it; it fails today, which is expected, and the day anyone repairs the defect without closing the ledger row the gate says so. 224 XXX*.test files in compiler_tests/ already use this. One caveat, from the harness\'s own author at FileTests.java:843 - "WARNING: expect_failure is not treated consistently" - so the first XXX file a rung adds is shown to go red on a deliberate local fix, and the report says it was shown.',
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
'9. The provenance block. Under the title of REPORT.md, FIVE lines, each ending in a file:line or the literal none. problem: the measurement that made this a rung (a program line or a ladder file). spec: the governing prose passage under Specification/basic or basic-lib, found from the feature\'s row in explorations/coordinator/map/spec-to-implementation.md; a citation under Specification/library/apis/ is labelled (api listing) and is not sufficient on its own; none when the prose is silent, with the grep that shows it. precedent: the interpreter\'s declaration, the team\'s dormant draft, or the in-file shape you copied. deviation: one line per way your edit differs from the precedent and from the specification\'s spelling. historical: every file of the original 2012 tree this rung edits - anything outside explorations/ and outside the test corpora this campaign created - or none. protocol.md:97 requires those edits to be flagged at commit time, and the gather copies this line into the commit message. Your skeptic opens every line the block cites and refuses the rung if one is missing or does not say what the block says.',
'10. Ledger rows. Rungs 6 and 7 opened row 317 when the specification settled a divergence the rung could not repair; do the same if you meet one. Number a new row provisionally from ' + LEDGER_FROM + ' in record.md and say that it is provisional: another rung may open one too, and the gather assigns the final numbers in manifest order (' + RUNGS.map(r => r.id).join(', ') + ').',
'11. The tracked-path check of the shared prefix, last, after your final commit.',
'',
'Report at the end in the structured form the tool requires, and write the full detail into REPORT.md.',
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
'Write your findings to explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md in that worktree, and your probes under explorations/compile-ladder/' + rung.slug + '/probes/skeptic/, every capture named .txt. Run the tracked-path check of the shared prefix over SKEPTIC.md before you report. Do not edit the worker\'s source changes yourself and do not run ant testFast or ant testSystem. Commit SKEPTIC.md and your probes on the rung\'s branch, ' + rung.branch + ', with the footer the shared prefix gives, and push it; touch nothing else in the commit. The worker\'s own commits are on that branch, so git log ' + BASE + '..HEAD shows its milestones and git diff ' + BASE + '...HEAD its net change.',
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
'Every defect this round repairs - including one the skeptic measured and you now fix - gets its assertion in the rung\'s gated test, in place and passing, BEFORE you report: the second skeptic will look for it and its absence is a refusal ground. A defect this round does not repair gets home 2 or home 3 of the shared prefix, and the report says which. Re-run the test and re-capture the output, update REPORT.md and record.md (including the historical: line of the provenance block if the repair touched a file of the 2012 tree), re-run the tracked-path check, commit and push on your branch, and do not run the full gate.',
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
    stop: 'The rung worker stopped, reporting a stop condition. Decide whether it is genuinely one of the reserved forks that reach Pavol (the array representation, the library route, a change of semantics against what the specification does say, deleting a test, and the batch record\'s own two: a change to a declared type the prelude already has, a renamed or removed declaration a gated test uses) or a silent specification that rule 4 says to think harder about. If the latter, derive the candidate behaviours with their costs and decide, and the instructions are the continuation. If the former, write what reaches Pavol: the fork, the candidates, what each costs, and your recommendation.',
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
    summary: { type: 'string', description: 'at most 15 lines of prose' },
  },
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'recordedFailure', 'summary'],
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
    summary: { type: 'string' },
  },
  required: ['slug', 'approved', 'failureWasRecorded', 'differentialsRun', 'summary'],
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
'2. Fold its record: explorations/compile-ladder/<slug>/record.md (now in the tree) carries finished prose for three places. The FACTS.md line goes into explorations/coordinator/FACTS.md under the section of its area (the file is grouped by area, its README gives the rule: "Landed semantics" for a rule of the language or the library as it now stands, "The harness and the gate" for test mechanics, "The checker and the one library" for the checker), after that section\'s last entry, as one bullet with its source. The ledger note is APPENDED to the notes of the row it names in explorations/fortress-gap-ledger.md - rows are never renumbered, moved or deleted; where the note needs the landed commit\'s hash write the literal placeholder <short hash>, which the commit stage replaces. The handover state line goes into the first section of explorations/microgpt-run-c-handover.md ("Where the work stands"). If record.md opens a new row, the number is provisional (from ' + LEDGER_FROM + '): assign the final numbers in MANIFEST order (' + RUNGS.map(r => r.id).join(', ') + ') as you fold, append each row to the ledger\'s last table, and correct every citation of the provisional number in that rung\'s record.md, REPORT.md and probes in the same commit. Any file:line a record cites that a previously applied rung has shifted is re-anchored by SYMBOL - find the declaration or the assert by name in the current file and cite the line it is at now, rather than trusting the number the record was written with.',
'3. Close every requiredCorrections item of that rung\'s skeptic verdicts, listed below; each is a checklist item and the last climb left two of them unmade.',
'4. Open or refuse every recommendedRows item of that rung\'s skeptic, in one sentence each, recorded in the batch record. Opening it means a real ledger row with the probe it cites; refusing it means one sentence saying why the tree does not owe it. The last batch lost a codegen defect a skeptic had narrowed precisely, because nothing carried a recommendation that was not a required correction.',
'5. One commit: the applied source, the tests, the rung\'s files under explorations/compile-ladder/<slug>/ (REPORT.md, record.md, SKEPTIC.md, JUDGE.md if any, and each probe and capture named one by one), and the three record files. Stage those files by an explicit list, never by git add of the directory, and read git diff --cached --stat before you commit: 85 MB of a worker\'s experimental caches reached main that way on 2026-09-19 and protocol.md section 4 now forbids it. Title line: what the repair does, in the plain register; body: the two or three sentences of record.md that say why. If git diff --name-only for this commit shows ANY path outside explorations/, the body also carries a line beginning "historical:" naming the files of the original 2012 tree the commit edits, taken from the rung\'s provenance block - protocol.md:97 requires those edits to be flagged at commit time. Footer as given. Do not push.',
'',
(notLanded.length
  ? '## The rungs that did not land\n\nThese rungs stopped, were dropped, or their worker died. Their source changes are NOT applied and their branches stay as they are. But their skeptics\' findings are about the tree, not about the rung, and they have nowhere else to go: fold them into ' + BATCH_DIR + '/RECORD.md under a heading "Not landed", one section per rung, carrying the reason it did not land, the findings of its SKEPTIC.md if it has one, and every recommendedRows entry, each opened as a real ledger row or refused in one sentence exactly as step 4 requires. Take that rung\'s REPORT.md, SKEPTIC.md, record.md and the probes its findings actually cite out of its branch by an explicit list of paths (git checkout <branch> -- <path> ..., one path at a time), never the whole directory, so the probes are tracked and nothing else comes with them. Apply none of its source.\n\n' + JSON.stringify(notLanded.map(r => ({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state, reason: (r.judge && r.judge.summary) || (r.worker && r.worker.stopReason) || '', skepticFindings: (r.verdict && r.verdict.findings) || [], recommendedRows: (r.verdict && r.verdict.recommendedRows) || [] })), null, 2) + '\n'
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
JSON.stringify(approved.map(r => ({ rung: r.rung, slug: r.slug, branch: r.branch, historicalFiles: (r.worker && r.worker.historicalFiles) || [], requiredCorrections: [].concat((r.firstVerdict && r.firstVerdict.requiredCorrections) || [], (r.verdict && r.verdict.requiredCorrections) || []), recommendedRows: [].concat((r.firstVerdict && r.firstVerdict.recommendedRows) || [], (r.verdict && r.verdict.recommendedRows) || []) })), null, 2),
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
    summary: { type: 'string' },
  },
  required: ['approved', 'blocking', 'fixed', 'summary'],
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
'Run the full gate once on the tree as it stands, exactly, and report what it says. You change no source and you commit nothing: the review agent is committing in this tree beside you, and the commit stage adds your summary to the tree after both of you are done. Your logs go to ' + LOG_DIR + '/, which is untracked and stays untracked - .gitignore:65 ignores /tmp/, and .gitignore:42,46 would swallow a .out or a .log anywhere. Your two tracked outputs are ' + GATE_OUT + '/summary.txt and ' + GATE_OUT + '/checker-count.txt, which you WRITE but do not commit.',
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

function commitRole(gather, gate) {
  return MAIN_TREE_ROLE + [
'# Your role: commit',
'',
'The gate is green on the tree as it stands. Land it.',
'',
'1. Replace every literal <short hash> placeholder in the ledger, FACTS and the handover with the hash of the commit it refers to, from the gather stage\'s result below. Copy the gate\'s outputs into the tree first: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/ - the gate wrote them under tmp/, untracked, so that a run that stops before this stage leaves nothing untracked in the tree, and it committed nothing because the review was committing in this tree at the same time. Then add ' + GATE_DIR + '/summary.txt, ' + GATE_DIR + '/checker-count.txt and ' + GATE_DIR + '/ladder/ to the same commit. The checker-count table is the comparand the next batch\'s gate reads, so a batch that lands without it leaves the next gate comparing against an older one. Title it "Record the landed commits\' hashes and the gate summary". grep -rn "<short hash>" explorations/ afterwards must be empty, and the full gate logs under ' + LOG_DIR + '/ are NOT committed and never are.',
'2. Verify every commit since ' + BASE + ' ends with the two footer lines and contains no model identifier (git log ' + BASE + '..HEAD --format=%B), and that every commit whose diff touches a path outside explorations/ carries a historical: line.',
'3. git push origin main; then git push origin main:' + CONTAINER_BRANCH + ' so the container\'s own branch stays at main. Retry a failed push up to four times with 2, 4, 8, 16 seconds between.',
'4. For each wip/ branch: confirm git -C <worktree> status -sb shows nothing ahead of its origin; then git worktree remove <worktree> and git branch -D <branch>. Leave the remote wip/ branches: the proxy refuses branch deletion from here, and Pavol removes them in the GitHub UI.',
'',
'The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'The gate stage returned:',
'',
JSON.stringify(gate, null, 2),
'',
'Return the structured result: the hash main is at on origin, the commits pushed, and what was cleaned up.',
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
    summary: { type: 'string' },
  },
  required: ['mainHead', 'pushed', 'containerBranchAtMain', 'summary'],
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
const rungs = RUNGS.map(r => byId[r.id]).filter(Boolean)
const approved = rungs.filter(r => r.state === 'approved' || r.state === 'approved-after-repair')
const notLanded = rungs.filter(r => r.state !== 'approved' && r.state !== 'approved-after-repair')
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
// container branch, clean up.
const commit = await agent(PREFIX + commitRole(gather, gate), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS })
report.commit = commit
return Object.assign(report, { landed: !!(commit && commit.pushed && commit.pushed.length) })
