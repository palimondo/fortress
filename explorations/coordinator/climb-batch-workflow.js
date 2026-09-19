// Workflow script: climb batch 1 of the compile-path ladder (2026-09-19).
// The repair batch's script (repair-batch-workflow.js) generalised to four
// rungs; the decision record is explorations/coordinator/CLIMB-BATCH-1.md and
// the design explorations/coordinator/batched-climb-plan.md section 3 (revised
// 2026-09-18). Launch, after the four worktrees exist (remote-container.md,
// "Setting up a batch's worktrees"):
//   Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js',
//             args: {base: '<the commit main is at>'}})
// Every worker, skeptic, gather, review and gate agent is pinned to Opus; the
// judge inherits the session's model. No backticks anywhere in this file.

export const meta = {
  name: 'fortress-climb-batch-1',
  description: 'Four Fortress compile-ladder rungs (RR64 functions, Maybe, integral operators, timing) in isolated worktrees, each judged by its own skeptic, gathered, reviewed, gated once and pushed',
  phases: [
    { title: 'Rung', detail: 'test-first repair in an isolated worktree, committed and pushed to wip/ as it goes; never runs the full gate' },
    { title: 'Skeptic', detail: 'independent judgement with its own walk-vs-compiled differential; one repair round allowed' },
    { title: 'Judge', detail: 'the session model, only on a refusal, a stop or a red gate: reads the reports and the diff, decides, writes the decision' },
    { title: 'Gather', detail: 'net change of each approved branch applied to main, record folded, one local commit per rung' },
    { title: 'Review', detail: 'the merged diff against the batch rules and the folded record as a whole' },
    { title: 'Gate', detail: 'ant compileAll, the library-order rebuild, testFast and testSystem, once, in the main tree' },
    { title: 'Commit', detail: 'hashes into the ledger notes, push main, fast-forward the container branch, remove the worktrees' },
  ],
}

const OPUS = 'opus'   // every worker, skeptic, gather, review and gate agent; the judge inherits the session's model
const BASE = args && args.base
if (!BASE) throw new Error('args.base is required: the commit both wip/ branches were cut from')
const CONTAINER_BRANCH = 'claude/worker-brief-fable-vnnuv8'   // this container's infrastructure branch; kept at main
const MAIN = '/home/user/fortress'

// ---------------------------------------------------------------------------
// The shared prefix. batched-climb-plan.md section 8: every agent in a batch
// opens with the same block, byte-identical and in the same order. No backticks
// anywhere in these strings; code is indented instead.
// ---------------------------------------------------------------------------

const PREFIX = [
"# Fortress climb batch 1 - shared prefix",
"",
"You are an agent in the Fortress revival's compile-path climb (@palimondo's revival of Sun's Fortress programming language). This batch is the first ordinary batch of the ladder after the repair batch of 2026-09-19: four library rungs, chosen by what the target program (microGPT compiled to bytecode) names and by what the ladder blocks on. Read explorations/coordinator/CLIMB-BATCH-1.md in your worktree first: it is the decision record this brief executes, and it names all four rungs and why they were chosen.",
"",
"## The batch manifest",
"",
"Four rungs, each in its own worktree on its own branch, two running at a time, gated once together after the merge:",
"",
"- F, slug rung-rr64-functions, worktree /home/user/fortress-rr64, branch wip/rung-rr64-functions: the functional methods of trait RR64 the program and the ladder need - exp, log, sin, cos, tan, asin, acos, atan, atan2, floor, ceiling, round, truncate. The only rung of this batch that touches .java (a native helper under nativeHelpers/).",
"- M, slug rung-maybe, worktree /home/user/fortress-maybe, branch wip/rung-maybe: Maybe, Just and Nothing for the compiler world, over the Option machinery it already has. Library only; carries a naming decision.",
"- N, slug rung-integral-ops, worktree /home/user/fortress-ints, branch wip/rung-integral-ops: the named integral operators MOD, REM, GCD, LCM, LSHIFT, RSHIFT on ZZ32 and ZZ64. Library only, pure Fortress.",
"- T, slug rung-timing, worktree /home/user/fortress-time, branch wip/rung-timing: recordTime and printTime over the existing nanoTime and a top-level mutable variable. Library only.",
"",
'All four branches are off ' + BASE + ' on main. F and N both edit CompilerBuiltin.fsi and .fss in different traits (RR64; ZZ32 and ZZ64); M may edit either prelude file; T edits CompilerLibrary. Batch rule 1 - no two rungs add or change the same declaration, trait body or operator - is what keeps the merge clean; the merge is the coordinator\'s, not yours.',
'',
'## Your worktree',
'',
'Work ONLY in the worktree your tail names. The other rungs are running at the same time in their own worktrees; never read or write outside your own. Never touch /home/user/fortress, which is the main tree.',
'',
'Set up every shell (substitute your worktree path for WORKTREE):',
'',
'    cd WORKTREE',
'    source experiment/env.sh',
'    export TMPDIR=WORKTREE/tmp',
'    export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=WORKTREE/tmp"',
'',
'env.sh sets FORTRESS_HOME from its own location, so check that echo $FORTRESS_HOME prints your worktree and not /home/user/fortress. It also runs rm -rf /tmp/fortress*rats; source it once per shell and never mid-run, because the other agent\'s Rats! temp directories live there too.',
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
'The Bash tool has a 10-minute ceiling. Run ant compileAll and any long step in the background and poll it; never pipe ant through tail, because the summary you need is at the end and you will have to re-run to see it (that mistake cost 21.7 minutes of the last climb). Capture full output to a file and grep the file.',
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
'2. Precedent search before writing code. Ask "has the team solved this here already, and in how many ways", and answer it by citation. Rung 3 is the case in point: the right shape existed twice in VarCodeGen.java and the wrong shape once, and it copied the wrong one.',
'',
'3. The specification\'s prose chapters are the standard; the api renderings are not. Specification/library/structure.tex:25-31 says Part Library "is largely automatically generated from the API code for the libraries themselves", so citing Specification/library/apis/*.tex to justify an edit to the matching .fsi is circular, and two rung reports did exactly that. Cite Specification/basic/ and Specification/basic-lib/.',
'',
'4. The interpreter is evidence, not an oracle. The static type checker runs only on the compile path and walk turns it off, so the interpreter accepts programs the language does not and reports what would be type errors as run-time dispatch failures; 55 ledger rows record its own defects. When walk and the compiled run disagree, that is a question and the specification answers it. Three real outcomes: the specification settles it against the compiled run, so repair; it settles it against the interpreter, so the compiled side may be right and a ledger row is owed against the interpreter; or the specification is silent. A silent specification is NOT a reason to stop - it is the reason to think harder: review the architecture around the construct, derive the candidate behaviours with what each costs and what else it touches, decide holistically which is right for the language, execute that one, and write the reasoning down. (CLIMB-BATCH-1.md names the two stops that apply to every rung of this batch: a change to a declared type the prelude already has, and a renamed or removed declaration a gated test uses.)',
'',
'A fourth case exists and is legitimate: the specification settles the divergence but the repair lies outside this rung\'s scope. Then the rung lands and opens a verified ledger row naming the defect, the specification clause, the probes both ways, the location of the fix and what the fix is. That is what rungs 6 and 7 did with row 317 and it was right.',
'',
'## What you write, and what you must not touch',
'',
'Everything you produce goes under explorations/compile-ladder/SLUG/ in your own worktree, where SLUG is in your tail:',
'',
'- REPORT.md - what you found, what changed and why, every citation as file:line, the recorded failure and the recorded pass, the precedent search, the specification derivation, every differential you ran.',
'- record.md - the record lines the coordinator will fold at merge time: the FACTS.md line or lines this rung earns, the ledger note (which row, and exactly what to append - rows are never renumbered or moved, they are cited from thirty-five reports), and the handover state line. Write them as finished prose, ready to paste.',
'- probes/ - your probe programs and their captured outputs.',
'',
'Do NOT edit explorations/coordinator/FACTS.md, the gap ledger, PLAN.md, POSITIONS.md, INDEX.md, the handover document, CLAUDE.md, explorations/protocol.md, or anything under .claude/. Parallel rungs conflict on every one of those - 28 of 28 replayed pairs conflict on FACTS.md and on the handover - which is the whole reason the record leaves you and is folded centrally.',
'',
'Do NOT run ant testFast or ant testSystem. The batch is gated once, after the merge, by the coordinator. Running the gate here costs 582 s and buys nothing: across nine skeptic runs of the last climb, not one of the 26 findings was load-bearing on a suite failure.',
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
'## Register',
'',
'Plain sentences, no self-congratulation - we are humble custodians here and deserve no credit. No unactionable comments in the source tree: provenance and rationale belong in your report, not in code. Verify against primary sources before asserting, and cite file:line. If you make a decision, say in your report that it was a decision and what the alternatives were: a decision buried in a report is a decision not made. No estimates in days or weeks.',
'',
].join('\n')

// ---------------------------------------------------------------------------
// The rung worker's role block and the two tails.
// ---------------------------------------------------------------------------

const RUNG_ROLE = [
'',
'---',
'',
'# Your role: rung worker',
'',
'## The order of work - test first, and the failure observed',
'',
'From explorations/coordinator/PLAN.md, and this is the part Pavol called load-bearing:',
'',
'1. Write the failing test FIRST, into ProjectFortress/compiler_tests/ (checker and codegen rungs) or ProjectFortress/library_tests/ (library rungs): a .fss component that prints PASS, plus a .test file in the format of ProjectFortress/library_tests/Boolean.test (a tests= line naming the components, then link, run, run_out_contains=PASS). NOT run_out_WIcontains, which Boolean.test and PLAN.md still write: the harness does not implement it (FileTests.java:147 checks _contains; an unknown key silently falls back to the default "stdout contains PASS"). A native-helper rung whose declarations are library declarations is a library rung: rung 7 put its test in library_tests/ (IntLiteralArithRung7).',
'2. Run it and capture the failure output to a file BEFORE the edit exists. A report with no recorded failure is refused by your skeptic. The process this rules out is the one-off validation script: proving once by hand that something works and going ahead without leaving a permanent check in the corpus.',
'3. Make the edit, as small as the test needs.',
'4. Rebuild: ant compileAll if you touched .java or .scala, then the library-order bytecode-cache rebuild. A rung that edits only CompilerLibrary rebuilds CompilerLibrary, CompilerAlgebra and CompilerSystem (25-30 s); one that edits CompilerBuiltin rebuilds from CompilerBuiltin down (about 125 s); the full five only after ant compileAll.',
'5. Run the test again and capture the pass.',
'6. Grep BOTH corpora - ProjectFortress/tests/ and every *_tests/ directory - for a competing declaration of every name you add. Rung 1 lost a full cycle to library_tests/MaybeTest9.fss declaring its own trait Equality, which only a full run revealed; this grep costs seconds and covers it.',
'7. Run the ladder subset for the files your names were blocking, before and after. Use the restricted driver R1 of the repair batch left, explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh with its subset.txt (corpus<TAB>file per line): copy both into explorations/compile-ladder/SLUG/, set LADDER_ROOT to a directory inside your worktree, and list the files CLIMB-BATCH-1.md names for your rung plus any file whose recorded first error in explorations/compile-ladder/after/raw/ names one of your names. Never run explorations/compile-ladder/run-ladder.sh with its default root: that root is shared and its cache pruning corrupts a parallel run.',
'8. The provenance block. Under the title of REPORT.md, four lines, each ending in a file:line or the literal none. problem: the measurement that made this a rung (a program line or a ladder file). spec: the governing prose passage under Specification/basic or basic-lib, found from the feature\'s row in explorations/coordinator/map/spec-to-implementation.md; a citation under Specification/library/apis/ is labelled (api listing) and is not sufficient on its own; none when the prose is silent, with the grep that shows it. precedent: the interpreter\'s declaration, the team\'s dormant draft, or the in-file shape you copied. deviation: one line per way your edit differs from the precedent and from the specification\'s spelling. Your skeptic opens every line the block cites and refuses the rung if one is missing or does not say what the block says. The same four lines are what the ledger note and the FACTS line cite.',
'9. Ledger rows. Rungs 6 and 7 opened row 317 when the specification settled a divergence the rung could not repair; do the same if you meet one. Number a new row provisionally from 329 in record.md and say that it is provisional: another rung may open one too, and the gather assigns the final numbers in manifest order (F, M, N, T).',
'',
'Report at the end in the structured form the tool requires, and write the full detail into REPORT.md.',
'',
].join('\n')

const F_TAIL = [
"",
"## Your rung: F - the functional methods of trait RR64",
"",
"SLUG is rung-rr64-functions. WORKTREE is /home/user/fortress-rr64, branch wip/rung-rr64-functions.",
"",
"The problem (CLIMB-BATCH-1.md section F): the target program calls exp and log on RR64 - exp(z - (BIG MAX[t <- z] t)) in the softmax at explorations/apl/mg/MicroGptApl.fss:42 and explorations/run-c4/src/MicroGptFlat.fss:28, log(pick(pr, tg)) in the loss at MicroGptFlat.fss:61 - and passes exp and log as function values to Array.map at explorations/apl/mg/FlatArrays2.fss:44-45; it calls round three times. The compiler prelude has none of exp, log, sin, cos, tan, asin, acos, atan, atan2, round, truncate, and has ceiling and floor commented out at ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:439-440. On the ladder, buffons.fss stops on ceiling/floor, roundBug.fss on round/truncate, juxtTwice.fss and oprTests.fss on the transcendentals (explorations/compile-ladder/after/raw/ holds each file's recorded error).",
"",
"Add all thirteen as functional methods of trait RR64 - declared with an explicit self, so that exp(x) and the bare name exp both work - in CompilerBuiltin.fsi and .fss. The shape to copy is opr SQRT(self): RR64 = jDoubleSQRT(self) at CompilerBuiltin.fss:900, with its native bound in the import java block at .fss:205-214 (simpleDoubleArith.doubleSQRT => jDoubleSQRT). floor and ceiling need no native: doubleFloor and doubleCeiling are already bound at .fss:212-213 and used by the enclosing operators at .fss:898-899.",
"",
"The specification. Specification/basic-lib/numbers.tex:464-476 defines floor, ceiling, round and truncate on QQ, returning ZZ: floor the largest integer not greater, ceiling the smallest not less, round the closest integer with an exact half going to the EVEN integer, truncate toward zero. Read those lines yourself. The chapter's section on real numbers is commented out (numbers.tex:920), and no prose chapter names exp, log or a trigonometric function (grep -rn over Specification/basic, Specification/basic-lib and Specification/advanced-lib/numbers-advanced.tex finds nothing); for those the specification is silent and the precedent governs. That is your spec: line - the passage for the four rounding methods, none with the grep for the rest.",
"",
"The precedent is the interpreter: Library/FortressLibrary.fsi:319-332 declares sin, cos, tan, asin, acos, atan, atan2(self, x: Number), log, exp, floor and ceiling returning RR64 and truncate returning ZZ64; ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162-190 binds them to the Float$... primitives, with round(self): ZZ64 at :189-190. Two deviations to argue and record, not to paper over: the specification's QQ methods return ZZ where the interpreter's RR64 versions return RR64 (floor, ceiling) or ZZ64 (truncate, round); and Java's Math.round rounds a half UP, so a round built on it violates numbers.tex:470-472 - use Math.rint or argue why not, and put the half-way cases in your test.",
"",
"The natives. ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java has doublePow (:68), doubleSQRT (:80), doubleFloor (:84), doubleCeiling (:88) and no others of these; each missing one is a static method over java.lang.Math. Put them in that file, the team's own, or in a new file beside it as rung 7 did (simpleIntLiteralArith.java); argue the choice in one line. They deal in double, so no NamingCzar clause is needed: rung 7 needed one only because its helper dealt in a Fortress type (compiler/NamingCzar.java:341-343). The two operational traps of the shared prefix apply: a fortress compile whose source has not changed writes nothing, and a changed native signature leaves a stale class under default_repository/caches/nativewrapper_cache.",
"",
"Your edit is in .java, so ant compileAll is required before your test can pass, then the full five-component library rebuild.",
"",
"The test goes in ProjectFortress/library_tests/: every one of the thirteen, including exp(0) = 1, log(exp(1)) within an epsilon of 1, atan2 in each quadrant, round(2.5) = 2 and round(3.5) = 4 and round(-2.5) = -2, truncate(-2.7) = -2, floor(-2.5) = -3, and exp passed as a function value. There is no comparing assert at RR64 (rung 4 added the ZZ32, String and Character forms only, Library/CompilerLibrary.fsi:35-46): use the Boolean form over = or an epsilon, or add the RR64 form and say so in the provenance block. Record its failure before the edit exists. Your ladder subset: buffons, roundBug, juxtTwice, oprTests, realArith, testRR32, before and after.",
"",
].join('\n')

const M_TAIL = [
"",
"## Your rung: M - Maybe, Just and Nothing for the compiler world",
"",
"SLUG is rung-maybe. WORKTREE is /home/user/fortress-maybe, branch wip/rung-maybe.",
"",
"The problem (CLIMB-BATCH-1.md section M): 59 of the 139 interpreter tests stopped at the disambiguate wall name Maybe, Just or Nothing, more than any other name (explorations/coordinator/next-climb/candidates.md section 2), and the compiler world declares none of them. ExceptionScoping.fss (Nothing[\\ZZ32\\].get) and oddJuxt.fss name nothing else; ImmutableArray's 26 files and LexicographicOrder's 20 hit it inside Library/List.fsi and Set.fsi. The target program does not name it; the rung is here for what it unblocks.",
"",
"The specification's prose uses the type as a given and settles one thing: Specification/basic/exceptions.tex:62-69 declares settable message: Maybe[\\String\\] on Exception, and :114-117 write the defaults as = Nothing - an unparameterised Nothing where a Maybe[\\String\\] is expected. Read those lines. Specification/library/default-libraries.tex is an api rendering and is not evidence (rule 3).",
"",
"Two precedents, and they disagree. The interpreter: value trait Maybe[\\T\\] at Library/FortressLibrary.fss:1306 (api .fsi:829), value object Just[\\T\\](x:T) at :1312, value object Nothing[\\T\\] at :1342, with AnyMaybe at :1292; every corpus file writes Nothing[\\ZZ32\\]. The team's own draft for THIS world, commented out at Library/CompilerLibrary.fsi:217-229: Maybe[\\T\\] comprises { Just[\\T\\], NothingObject[\\T\\] } with coerce(x: Nothing), value object NothingObject[\\T\\] with the same coerce, and a separate object Nothing end - which is exactly what makes the specification's = Nothing type-check, because the compiler path has coercion and the interpreter does not (explorations/coordinator/map/README.md, the twelve facts). The compiler world already implements the protocol under other names: value trait Option[\\E19\\] extends Condition[\\E19\\] comprises { NoneObject[\\E19\\], Some[\\E19\\] } with coerce(_: None) and value object None, CompilerBuiltin.fsi:648-660, bodies at CompilerBuiltin.fss:1309-1367. grep -rn of ProjectFortress/src/com/sun/fortress/compiler and runtimeSystem for Option, Some, None and NoneObject finds nothing, so nothing in Java or Scala special-cases these names: a pure library rung.",
"",
"The decision is yours and it must be argued: the team's draft (NothingObject[\\T\\] plus object Nothing and a coercion; the specification's = Nothing works; the corpus's Nothing[\\ZZ32\\] does not) or the corpus (Nothing[\\T\\]; the specification's = Nothing does not type-check). Both cannot coexist. Weigh what the files at the wall actually write (count them in explorations/compile-ladder/after/raw/), what exceptions.tex:114 needs, and what the draft's author chose for this world. Whether Maybe is built over Option (a supertype or a wrapper of it, so one implementation serves both) or beside it as a second copy is part of the same decision. Say in REPORT.md that it was a decision and what the alternative costs.",
"",
"Do NOT delete or rename Option, Some, NoneObject or None: ProjectFortress/library_tests/ uses them (grep both corpora as step 6 requires; the MaybeTest*.fss files are about this exact area and rung 1 lost a cycle to MaybeTest9), and removing a declaration a gated test uses is a reserved stop. If your argument concludes that the right shape needs that, stop and report it (the tool's stopped field) rather than doing it.",
"",
"Where to put it: the draft sits in CompilerLibrary.fsi:217-229 and Option in CompilerBuiltin; follow the draft's location unless your design needs Option's file, and say why. No .java, so no ant compileAll; rebuild from the component you edit downwards.",
"",
"The test goes in ProjectFortress/library_tests/: construct both cases, dispatch on them (typecase or the trait's own methods), get and its default form or their equivalents, a for over a Maybe (it is a generator in both precedents), and - if you take the draft - a binding written as = Nothing at a Maybe type, coerced. Record its failure before the edit exists. Your ladder subset: ExceptionScoping.fss and oddJuxt.fss, before and after.",
"",
].join('\n')

const N_TAIL = [
"",
"## Your rung: N - the named integral operators on ZZ32 and ZZ64",
"",
"SLUG is rung-integral-ops. WORKTREE is /home/user/fortress-ints, branch wip/rung-integral-ops.",
"",
"The problem (CLIMB-BATCH-1.md section N): the target program uses MOD 32 times on ZZ32 indices - m[i DIV nc, i MOD nc] at explorations/apl/mg/AplMg.fss:14, v[i MOD |v|] at :33, the strided views' get and put at explorations/apl/mg/FlatArrays2.fss:77-89 - and the compiler prelude has no MOD, REM, GCD, LCM, LSHIFT or RSHIFT on ZZ32 (CompilerBuiltin.fsi:202-256) or ZZ64 (:147-201); it has DIV, <<, >>, <<<, BITAND, BITOR, BITXOR, CHOOSE, MIN, MAX. On the ladder chain0.fss (GCD, LCM, MOD) and rshiftbug.fss (RSHIFT) stop on nothing else.",
"",
"The specification: Specification/basic-lib/basic-integers.tex:439-456. REM is the remainder of the truncating division (the division-sign operator, rounding toward zero); MOD is the remainder of floor division, \"rounds inexact results towards negative infinity\"; both throws IntegerDivisionByZero; GCD and LCM at :247-248. Read those lines yourself. So MOD is NOT Java's %, which is REM: (-7) MOD 3 is 2 and (-7) REM 3 is -1; 7 MOD (-3) is -2 and 7 REM (-3) is 1. The sign of MOD's result follows the divisor; REM's follows the dividend. Put every sign combination in your test.",
"",
"The precedent: the interpreter declares the six in trait Integral[\\I\\] at Library/FortressLibrary.fss:622-636 (LSHIFT and RSHIFT take an AnyIntegral) and binds them per type to Int$Rem, Int$Mod, Int$Gcd, Int$Lcm at :666-676 for ZZ32 and :736-742 for ZZ64. The compiler world has no native for any of them (nativeHelpers/simpleIntArith.java), and needs none: REM over DIV, - and juxtaposition; MOD over REM with the sign correction; GCD by Euclid over REM, with the sign and zero cases decided and tested (GCD(0, 0), GCD(-4, 6)); LCM over GCD and DIV; LSHIFT and RSHIFT as names for the << and >> the traits already have (their overloads are at CompilerBuiltin.fsi:180-191 for ZZ64 and the matching lines for ZZ32). Pure Fortress inside the compiler world's flat design; do not introduce Integral or touch the tower. Division by zero: what DIV does today on the compiled path is the precedent for MOD and REM; establish it with a probe, make MOD and REM do the same, and record it - the failure-mode question of the skeptic's brief.",
"",
"Which overloads: i MOD 3 with a literal must resolve. Rungs 6 and 7 made IntLiteral's own operators real (CompilerBuiltin.fss:816-848), and how i DIV 3 resolves today (coercion of the literal, or an IntLiteral overload) decides which overloads MOD and the rest need; check it before deciding. ZZ32 and ZZ64 both, as candidates.md says; NN32 and NN64 only if it costs nothing and you say so.",
"",
"No .java, so no ant compileAll; rebuild from CompilerBuiltin downwards (about 125 s).",
"",
"The test goes in ProjectFortress/library_tests/, with the comparing assert at (ZZ32, ZZ32, String) that rung 4 added: every operator, every sign combination for MOD and REM, GCD and LCM on the identity GCD(a, b) LCM(a, b) = |a b|, the shifts against << and >>, and a ZZ64 case beyond ZZ32. Record its failure before the edit exists. Your ladder subset: chain0.fss and rshiftbug.fss, before and after.",
"",
].join('\n')

const T_TAIL = [
"",
"## Your rung: T - recordTime and printTime",
"",
"SLUG is rung-timing. WORKTREE is /home/user/fortress-time, branch wip/rung-timing.",
"",
"The problem (CLIMB-BATCH-1.md section T): nestedTransactions1.fss, nestedTransactions2.fss and nestedTransactions4.fss in ProjectFortress/tests/ name recordTime and printTime and nothing else at the disambiguate wall, and the rest of each file - atomic do ... end, a for over a range, the comparing assert, println - is supported on this path, so they are the ladder's likeliest passes (explorations/coordinator/next-climb/candidates.md section 2). The target program does not name them; it calls nanoTime() directly.",
"",
"The specification is silent: no prose chapter names recordTime, printTime or nanoTime (grep -rn over Specification/basic, basic-lib, advanced, advanced-lib). Precedent governs; your spec: line is none with that grep.",
"",
"The precedent: Library/FortressLibrary.fss:4109-4118 - nanoTime(): ZZ64, a top-level mutable __globalTimeInformation: ZZ64 := 0, recordTime(dummy: Any): () storing nanoTime(), printTime(dummy: Any): () printing the elapsed milliseconds (\"Operation took \" secs \"ms\") and re-recording. The compiler world's nanoTime(): RR64 is declared at CompilerBuiltin.fsi:23 and bound at CompilerBuiltin.fss:335 to simpleDoubleArith.doubleNanoTime; the type is RR64 where the interpreter's is ZZ64, a deviation you record (the elapsed time computed in RR64, the milliseconds printed as an integer - decide how and say so), not one you repair.",
"",
"The top-level mutable variable is what rung 3 (explorations/compile-ladder/rung3/REPORT.md) and R1 of the repair batch (explorations/compile-ladder/repair-r1-atomic-static/REPORT.md) made possible on this path: it now lives in a transactional cell, and yours is the first library use of it. Two facts from R1 bear on you: a top-level variable exported through an api does not link (ledger row 320), so the variable must NOT be exported through CompilerLibrary.fsi; and the three nestedTransactions files call recordTime and printTime around atomic blocks, so your skeptic's differential should do the same.",
"",
"Put the two functions and the variable in Library/CompilerLibrary.fss with the two declarations in CompilerLibrary.fsi, as rung 8 did for SUM (explorations/compile-ladder/rung8/REPORT.md). No .java, so no ant compileAll; rebuild CompilerLibrary, CompilerAlgebra and CompilerSystem only (25-30 s).",
"",
"The test goes in ProjectFortress/library_tests/: recordTime(0), work that takes measurable time, printTime(0), and PASS; and one call pair around an atomic block. Record its failure before the edit exists. Your ladder subset: the three nestedTransactions files, before and after; if any reaches pass, that is the batch's first ladder pass and the report says so plainly, without ceremony.",
"",
].join('\n')

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
'0. The provenance block under REPORT.md\'s title: open every file:line it cites with sed -n and check that the line says what the block says. A missing line, a line that does not say it, or a spec: line that cites only Specification/library/apis/ is a refusal (rule 3 of the shared prefix).',
'1. The recorded failure. The worker was required to run the new test and capture its failure BEFORE the edit existed. Find that captured output. A rung whose report has no recorded failure is refused - this is not negotiable and it is the point of the whole discipline.',
'2. The diff, read line by line against the specification passages cited and against the provenance block. Does the edit do what the report says, and only that? Is it as small as the test needs?',
'3. The precedent search. Did the worker find what the team already did here, and did it follow the right precedent? The rung\'s tail names its precedents; for M the two precedents disagree and the tail says how.',
'4. The test. Does it actually exercise the defect? For N: negative operands, since MOD and REM differ only there, and division by zero. For F: the half-way cases of round and the sign of truncate. For M: a file that writes Nothing[\\ZZ32\\] and a binding written = Nothing. For T: a measurable interval, and a call pair around an atomic block.',
'5. The competing-declaration grep across both corpora.',
'6. The record.md fragment. Are the FACTS lines true as written and sourced? Does the ledger note cite an existing row without renumbering anything? Would a reader six months from now be able to check it?',
'',
'## Your required differential - this is not optional',
'',
'For every construct the rung touches, write your OWN small program, run it under the interpreter (bin/fortress FILE.fss) and under the compiler path (bin/fortress compile then bin/fortress run), and compare the answers. Do not satisfy this by reading the rung\'s own test; write programs the worker did not write. This requirement exists because four of the 26 items the last climb\'s skeptics raised came from differential probes they invented on their own initiative, and those four were the highest-value findings of eight rungs.',
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
'Write your findings to explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md in that worktree, and your probes under explorations/compile-ladder/' + rung.slug + '/probes/skeptic/. Do not edit the worker\'s source changes yourself and do not run ant testFast or ant testSystem. Commit SKEPTIC.md and your probes on the rung\'s branch, ' + rung.branch + ', with the footer the shared prefix gives, and push it; touch nothing else in the commit. The worker\'s own commits are on that branch, so git log ' + BASE + '..HEAD shows its milestones and git diff ' + BASE + '...HEAD its net change.',
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
'Read the judge\'s full reasoning in explorations/compile-ladder/' + rung.slug + '/JUDGE.md' + (verdict ? ' and the skeptic\'s findings in SKEPTIC.md beside it' : '') + '. Carry out the judge\'s instructions in order. Where an instruction turns out wrong against a primary source, do what the source says, and say so in REPORT.md with the file:line that settles it - the judge read the two reports and the diff, not the whole tree. Re-run the test and re-capture the output, update REPORT.md and record.md, commit and push on your branch, and do not run the full gate.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The judge. Escalated to the session's model (no model override) at three
// points only: a skeptic's refusal, a worker's stop, a red gate or a blocking
// review on the merged tree. It does not build or test; it reads what the two
// Opus agents already wrote, rules on it, and writes instructions the next
// Opus agent executes. Its context is assembled here from the structured
// outputs so it does not have to gather it by tool calls.
// ---------------------------------------------------------------------------

function judgeRole(kind, rung, worker, verdict, extra) {
  const inWorktree = (kind === 'refusal' || kind === 'stop')
  const where = inWorktree ? rung.path : MAIN
  const outFile = inWorktree
    ? 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md'
    : 'explorations/compile-ladder/climb-batch-1/JUDGE-' + kind + '.md'
  const question = {
    refusal: 'The rung worker landed and its skeptic refused. Decide what the repair is: which of the two is right on each point, by citation, and exactly what the repair round must do. If the skeptic is wrong on its refusal ground, the repair round is a report-only repair that settles it, and you say so.',
    stop: 'The rung worker stopped, reporting a stop condition. Decide whether it is genuinely one of the reserved forks that reach Pavol (the array representation, the library route, a change of semantics against what the specification does say, deleting a test, and for this batch the two CLIMB-BATCH-1.md names: a change to a declared type the prelude already has, a renamed or removed declaration a gated test uses) or a silent specification that rule 4 says to think harder about. If the latter, derive the candidate behaviours with their costs and decide, and the instructions are the continuation. If the former, write what reaches Pavol: the fork, the candidates, what each costs, and your recommendation.',
    review: 'The merged-diff review found something blocking in the source hunks after the gather. Diagnose it holistically on the merged tree and decide the repair; do not bisect rungs.',
    gate: 'The gate is red on the merged tree. Read the failing tests and their output, find the cause across the merged change as a whole, and decide the repair. Pavol\'s standing rule: identify the source of the conflict holistically and rework that part in the merged batch; dropping a rung is the retreat, taken only when its approach is wrong rather than its code, and then it is recorded and returned to the ranking.',
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
  ? '1. The net change: git -C ' + rung.path + ' diff ' + BASE + '...HEAD, and the milestones: git log ' + BASE + '..HEAD.\n2. explorations/compile-ladder/' + rung.slug + '/REPORT.md and record.md in that worktree' + (verdict ? ', and SKEPTIC.md beside them' : '') + '.\n3. Every specification passage the two cite, by file:line with sed -n, in Specification/ under that worktree - the prose chapters, not library/apis/.\n4. The precedents both name, at the cited lines.\n5. explorations/coordinator/map/spec-to-implementation.md only if the question is where a fix belongs.'
  : '1. The composed commits: git -C ' + MAIN + ' log ' + BASE + '..HEAD and git diff ' + BASE + '...HEAD.\n2. The stage\'s outputs named above, and for a red gate the failing tests\' own output under ProjectFortress/TEST-RESULTS/ and the gate files under explorations/compile-ladder/climb-batch-1/gate/.\n3. Each rung\'s REPORT.md, SKEPTIC.md and record.md under explorations/compile-ladder/<slug>/.\n4. The specification passages the reports cite, by file:line.',
'',
'## How to rule',
'',
'Rule 4 of the shared prefix governs: the interpreter is evidence, not an oracle, and the specification answers a divergence; a silent specification is the reason to think harder, not to stop, except where the silence falls exactly on the point at issue and PLAN.md names it a fork. Rule holistically: the goal is one tree with everything running, not the largest subset that happens to be green. Every point in your ruling is a citation, file:line, that the repair worker can check. Say which claims of the worker and of the skeptic were right and which were wrong. If you take a decision under a silent specification, say that you did and what the alternatives were: it is reported to Pavol out of the loop.',
'',
'Write the full ruling to ' + outFile + ' in ' + where + (inWorktree
  ? ', commit it on the rung\'s branch ' + rung.branch + ' with the footer the shared prefix gives, and push it.'
  : ', and commit it locally on main with that footer; do not push.'),
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
    recordedFailure: { type: 'string', description: 'path to the captured pre-edit failure output, and the key line from it' },
    recordedPass: { type: 'string', description: 'path to the captured post-edit pass output, and the key line from it' },
    precedentSearch: { type: 'string', description: 'what the team already did here, by citation, and which precedent was followed' },
    specCitations: { type: 'array', items: { type: 'string' } },
    divergences: { type: 'array', items: { type: 'string' }, description: 'each walk-vs-compiled divergence found, with which side the specification favours' },
    decisions: { type: 'array', items: { type: 'string' }, description: 'decisions taken inside the rung, each with the alternative rejected' },
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
    failureWasRecorded: { type: 'boolean', description: 'whether a pre-edit captured failure actually exists' },
    differentialsRun: { type: 'array', items: { type: 'string' }, description: 'the skeptic\'s OWN probes: program, walk answer, compiled answer, verdict' },
    loudToQuiet: { type: 'string', description: 'whether a loud failure became a quiet value, and what the value is' },
    findings: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
  required: ['slug', 'approved', 'failureWasRecorded', 'differentialsRun', 'summary'],
}

const RUNGS = [
  { id: 'F', slug: 'rung-rr64-functions', path: '/home/user/fortress-rr64',  branch: 'wip/rung-rr64-functions', tail: F_TAIL },
  { id: 'M', slug: 'rung-maybe',          path: '/home/user/fortress-maybe', branch: 'wip/rung-maybe',          tail: M_TAIL },
  { id: 'N', slug: 'rung-integral-ops',   path: '/home/user/fortress-ints',  branch: 'wip/rung-integral-ops',   tail: N_TAIL },
  { id: 'T', slug: 'rung-timing',         path: '/home/user/fortress-time',  branch: 'wip/rung-timing',         tail: T_TAIL },
]

// ---------------------------------------------------------------------------
// The four stages below the scatter, written 2026-09-18. All in the main tree,
// all Opus except the judge. batched-climb-plan.md section 3, "Gather and
// gate" and "Commit", as corrected on 2026-09-17: the landed commit is composed
// at the gather from each branch's net change, never merged.
// ---------------------------------------------------------------------------

const MAIN_TREE_ROLE = [
'',
'---',
'',
'You work in the MAIN tree, ' + MAIN + ', on branch main. The rule in the shared prefix about never touching it was written for the rung workers, whose stage is over; the wip/ worktrees are now read-only history to you. Source experiment/env.sh in every shell; do not export TMPDIR or JAVA_FLAGS beyond what it sets. The batch base is ' + BASE + '. Commit locally with the footer the shared prefix gives; push only if your role below says so.',
'',
].join('\n')

function gatherRole(approved) {
  return MAIN_TREE_ROLE + [
'# Your role: gather',
'',
'Compose one clean local commit per approved rung on main, in this order: ' + approved.map(r => r.rung).join(', ') + '. Nothing is merged: each rung\'s branch stays as it is and is never a parent of anything on main.',
'',
'Preconditions, checked first and reported if they fail: git status --porcelain is empty; ' + BASE + ' is an ancestor of HEAD (git merge-base --is-ancestor).',
'',
'For each rung, in order:',
'',
'1. Its net change: git diff ' + BASE + '...<branch> > <scratch>/<slug>.patch, then git apply --3way --index <patch>. A hunk that fails in a file another rung also touched is the conflict this stage exists to see: if the hunks are in unrelated regions, resolve it by hand from both sides and say so; if both changed the same logic, do NOT guess - leave the tree clean (git checkout -- . && git clean -fd on the touched paths), and return with the conflict named.',
'2. Fold its record: explorations/compile-ladder/<slug>/record.md (now in the tree) carries finished prose for three places. The FACTS.md line goes into explorations/coordinator/FACTS.md under "The compile-path ladder baseline", after the last rung entry, as one bullet with its source. The ledger note is APPENDED to the notes of the row it names in explorations/fortress-gap-ledger.md - rows are never renumbered, moved or deleted; where the note needs the landed commit\'s hash write the literal placeholder <short hash>, which the commit stage replaces. The handover state line goes into the first section of explorations/microgpt-run-c-handover.md ("Where the work stands"). If record.md amends an existing row, apply the amendment as written. If it opens a new row, the number is provisional (from 329): assign the final numbers in manifest order (F, M, N, T) as you fold, append each row to the ledger\'s last table, and correct every citation of the provisional number in that rung\'s record.md, REPORT.md and probes in the same commit.',
'3. Close every requiredCorrections item of that rung\'s skeptic verdicts, listed below; each is a checklist item and the last climb left two of them unmade.',
'4. One commit: the applied source, the tests, the rung\'s explorations/compile-ladder/<slug>/ directory (REPORT.md, record.md, SKEPTIC.md, JUDGE.md if any, probes), and the three record files. Title line: what the repair does, in the plain register; body: the two or three sentences of record.md that say why; footer as given. Do not push.',
'',
'The rungs and their verdicts:',
'',
JSON.stringify(approved.map(r => ({ rung: r.rung, slug: r.slug, branch: r.branch, requiredCorrections: [].concat((r.firstVerdict && r.firstVerdict.requiredCorrections) || [], (r.verdict && r.verdict.requiredCorrections) || []) })), null, 2),
'',
'Return the structured result the tool requires: the commit hash per rung, the conflicts met and how each was resolved, and the corrections closed, by item.',
'',
  ].join('\n')
}

const GATHER_SCHEMA = {
  type: 'object',
  properties: {
    commits: { type: 'array', items: { type: 'object', properties: { rung: { type: 'string' }, hash: { type: 'string' }, files: { type: 'array', items: { type: 'string' } } }, required: ['rung', 'hash'] } },
    conflicts: { type: 'array', items: { type: 'string' }, description: 'each hunk that did not apply cleanly, the file, and how it was resolved or that it was not' },
    unresolved: { type: 'boolean', description: 'true if a conflict was left unresolved and the tree was returned to clean' },
    correctionsClosed: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'summary'],
}

function reviewRole(gather) {
  return MAIN_TREE_ROLE + [
'# Your role: merged-diff reviewer',
'',
'The rungs were judged one at a time in their own worktrees; nobody has yet read the four changes together, and the rung skeptics could not see the three record files, which were folded after them. You read both.',
'',
'The composed commits: git log ' + BASE + '..HEAD; the whole change: git diff ' + BASE + '...HEAD. The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'Check, and cite file:line for every finding:',
'1. Batch rule 1 against the real hunks: no two rungs add or change the same declaration, method, trait body or operator. Rule 2: no rung\'s edit depends on another\'s for its meaning or its test.',
'2. Each commit carries its edit, its test and its record together, and nothing of another rung.',
'3. The folded record as a whole: every FACTS line true as written and sourced; every ledger note appended to an existing row with no row renumbered, moved or deleted, and the ledger\'s own counts still right; the handover\'s first section consistent; every new row numbered in manifest order with no gap or duplicate against the rows already there, and no provisional number left anywhere.',
'4. Every requiredCorrections item the gather says it closed is actually closed.',
'5. Footers present and exact; no model identifier anywhere in the commits.',
'6. The provenance block of every REPORT.md: four lines, each ending in a file:line or none, and its SKEPTIC.md says the lines were opened.',
'',
'Two kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections", listed in your return. A defect in the source hunks - a rule broken, an edit that is not what its report says, an interaction between the two rungs - you do NOT fix; you return it as blocking, precisely enough that a judge can rule on it from your words and the diff. Do not run the gate.',
'',
  ].join('\n')
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    approved: { type: 'boolean', description: 'true if nothing blocking remains after your own record fixes' },
    blocking: { type: 'array', items: { type: 'string' }, description: 'source-level findings, each with file:line and which rule or claim it breaks' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'record or mechanical defects you fixed, and the commit hash' },
    summary: { type: 'string' },
  },
  required: ['approved', 'blocking', 'fixed', 'summary'],
}

const GATE_ROLE = MAIN_TREE_ROLE + [
'# Your role: the gate',
'',
'Run the full gate once on the tree as it stands, exactly, and report what it says. You change no source. One rung (F) is in .java, so ant compileAll is required and the order is:',
'',
'1. df -h / first; if under 1 GB free, sweep /tmp/fortress*rats, ProjectFortress/test-tmp and ProjectFortress/test-caches and check again; if still under 500 MB, stop and report.',
'2. rm -rf ProjectFortress/TEST-RESULTS. Then ant compileAll, in the background with all output to explorations/compile-ladder/climb-batch-1/gate/compileAll.out, polled until done; BUILD SUCCESSFUL must appear at its end.',
'3. The library-order bytecode-cache rebuild, the five fortress compile commands of the shared prefix, output to gate/library.out.',
'4. ant testFast, in the background, all output to gate/testFast.out, polled; then ant testSystem the same way to gate/testSystem.out. Never both at once; never pipe either through tail.',
'5. From the two files, grep the per-suite summaries: for testFast every "Tests run:" line with its Failures and Errors, and "Tests expected to pass are failing" if present; for testSystem the pass/fail/skip counts. Green means zero failures and zero errors in every suite of testFast and 0 fail / 0 skip in testSystem, and BUILD SUCCESSFUL on both.',
'',
'Write gate/summary.md with the counts, the failing tests by name if any, and the wall time of each step, and commit it locally (only that file). Return the structured result. If red, name every failing test and copy the first failure\'s output lines into the result; the judge reads them.',
'',
].join('\n')

const GATE_SCHEMA = {
  type: 'object',
  properties: {
    green: { type: 'boolean' },
    compileAll: { type: 'string', description: 'BUILD SUCCESSFUL or the first error' },
    testFast: { type: 'string', description: 'suites, tests, failures, errors' },
    testSystem: { type: 'string', description: 'pass, fail, skip' },
    failing: { type: 'array', items: { type: 'string' }, description: 'failing test names with the key output line each' },
    stopped: { type: 'boolean', description: 'true if the gate could not be run (disk, build failure before tests)' },
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
'Its full reasoning is in explorations/compile-ladder/climb-batch-1/JUDGE-' + kind + '.md. Carry out the instructions in order. Where one turns out wrong against a primary source, do what the source says and record the deviation in explorations/compile-ladder/climb-batch-1/REPAIR-' + kind + '.md with the file:line that settles it. Rebuild what the edit needs (ant compileAll for Java, then the library-order rebuild), run the tests the ruling names, and commit locally, one commit, with the record files updated where the ruling says. Do not run the full gate; the gate stage runs it after you. Do not push.',
'',
  ].join('\n')
}

function commitRole(gather, gate) {
  return MAIN_TREE_ROLE + [
'# Your role: commit',
'',
'The gate is green on the tree as it stands. Land it.',
'',
'1. Replace every literal <short hash> placeholder in the ledger, FACTS and the handover with the hash of the commit it refers to, from the gather stage\'s result below, in one small commit "Record the landed commits\' hashes". grep -rn "<short hash>" explorations/ afterwards must be empty.',
'2. Verify every commit since ' + BASE + ' ends with the two footer lines and contains no model identifier (git log ' + BASE + '..HEAD --format=%B).',
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

log('Climb batch 1: 4 rungs (F, M, N, T), two at a time, each judged by its own skeptic before the merge; then gather, review, one gate, commit. Base ' + BASE + '.')

const results = await pipeline(
  RUNGS,

  // Stage 1: the rung worker.
  (rung) => agent(PREFIX + RUNG_ROLE + rung.tail, {
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
      judgeOnStop = await agent(PREFIX + judgeRole('stop', rung, worker, null, null), {
        label: 'judge:' + rung.id + ':stop',
        phase: 'Judge',
        schema: JUDGE_SCHEMA,
      })
      if (!judgeOnStop || judgeOnStop.decision !== 'repair') {
        return out('stopped', { worker, verdict: null, judge: judgeOnStop })
      }
      const resumed = await agent(PREFIX + RUNG_ROLE + rung.tail + repairPrompt(rung, null, judgeOnStop), {
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

    const decision = await agent(PREFIX + judgeRole('refusal', rung, worker, verdict, null), {
      label: 'judge:' + rung.id,
      phase: 'Judge',
      schema: JUDGE_SCHEMA,
    })
    if (!decision || decision.decision === 'drop') {
      return out('dropped', { worker, verdict, firstVerdict: verdict, judge: decision, repaired: false })
    }
    if (decision.decision === 'stop') {
      return out('stopped', { worker, verdict, firstVerdict: verdict, judge: decision, repaired: false })
    }

    const repaired = await agent(PREFIX + RUNG_ROLE + rung.tail + repairPrompt(rung, verdict, decision), {
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

const rungs = results.filter(Boolean)
const approved = rungs.filter(r => r.state === 'approved' || r.state === 'approved-after-repair')
const report = { batch: 'climb-1', base: BASE, rungs }

if (approved.length === 0) {
  log('No rung approved; nothing to gather. ' + rungs.map(r => r.rung + ': ' + r.state).join(', '))
  return Object.assign(report, { landed: false, reason: 'no rung approved' })
}
log('Approved: ' + approved.map(r => r.rung + ' (' + r.state + ')').join(', ') + '. Gathering onto main.')

// Gather: one composed local commit per approved rung.
const gather = await agent(PREFIX + gatherRole(approved), { label: 'gather', phase: 'Gather', schema: GATHER_SCHEMA, model: OPUS })
report.gather = gather
if (!gather || gather.unresolved) {
  log('Gather stopped: ' + ((gather && gather.summary) || 'agent died'))
  return Object.assign(report, { landed: false, reason: 'gather unresolved' })
}

// Review: the merged diff and the folded record as a whole. A blocking finding goes to the judge once.
let review = await agent(PREFIX + reviewRole(gather), { label: 'review', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS })
report.review = review
if (review && !review.approved && review.blocking && review.blocking.length) {
  log('Review found blocking: ' + review.blocking.length + ' item(s); the judge rules')
  const decision = await agent(PREFIX + judgeRole('review', null, null, null, review), { label: 'judge:review', phase: 'Judge', schema: JUDGE_SCHEMA })
  report.reviewJudge = decision
  if (!decision || decision.decision !== 'repair') {
    return Object.assign(report, { landed: false, reason: 'review blocking, judge did not order a repair' })
  }
  await agent(PREFIX + mergedRepairRole(decision, 'review'), { label: 'repair:review', phase: 'Review', schema: RUNG_SCHEMA, model: OPUS })
  review = await agent(PREFIX + reviewRole(gather), { label: 'review2', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS })
  report.review2 = review
  if (!review || !review.approved) {
    return Object.assign(report, { landed: false, reason: 'review still blocking after one repair' })
  }
}

// Gate: once; red goes to the judge and one repair on the merged tree; red again stops the batch.
let gate = await agent(PREFIX + GATE_ROLE, { label: 'gate', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS })
report.gate = gate
if (!gate || gate.stopped) {
  return Object.assign(report, { landed: false, reason: 'gate could not run' })
}
if (!gate.green) {
  log('Gate red: ' + gate.failing.length + ' failing; the judge diagnoses on the merged tree')
  const decision = await agent(PREFIX + judgeRole('gate', null, null, null, gate), { label: 'judge:gate', phase: 'Judge', schema: JUDGE_SCHEMA })
  report.gateJudge = decision
  if (!decision || decision.decision !== 'repair') {
    return Object.assign(report, { landed: false, reason: 'gate red, judge did not order a repair' })
  }
  await agent(PREFIX + mergedRepairRole(decision, 'gate'), { label: 'repair:gate', phase: 'Gate', schema: RUNG_SCHEMA, model: OPUS })
  gate = await agent(PREFIX + GATE_ROLE, { label: 'gate2', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS })
  report.gate2 = gate
  if (!gate || !gate.green) {
    log('Gate red after one repair: the batch stops here, nothing pushed; the failing tests and the diagnosis are the record')
    return Object.assign(report, { landed: false, reason: 'gate red twice' })
  }
}

// Commit: hashes into the notes, push, fast-forward the container branch, clean up.
const commit = await agent(PREFIX + commitRole(gather, gate), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS })
report.commit = commit
return Object.assign(report, { landed: !!(commit && commit.pushed && commit.pushed.length) })
