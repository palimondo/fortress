# Sources of this skill (for maintaining it only)

Not for a task: an agent doing work never loads this file. It says where each fact in the parts came from, so that the skill can be re-checked when the tree changes. FACTS entries are named by their bold title (print one with `explorations/coordinator/tools/facts-extract.sh 'TITLE WORDS'`). "Exploration" is `explorations/coordinator/build-cache-exploration.md`; "the script" is `explorations/coordinator/climb-batch-workflow.js`; "the manual" is `explorations/coordinator/climb-batch-workflow.md`; "brief-machine" is `explorations/coordinator/process-engineering/blind-brief/machine.md`; "the gate summary" is `explorations/compile-ladder/climb-batch-10/gate/summary.txt`; "the old `CLAUDE.md`" is that file before it was cut to what every session needs, `git show 9cd56be21^:CLAUDE.md`, whose facts now live in these parts and nowhere else in the tree; "the pending edit" is `explorations/coordinator/pending-script-edit.md`.

## SKILL.md

- Two paths, one library goal, microGPT: the old `CLAUDE.md` (Project goal); `explorations/repo-internals.md:97-123`; POSITIONS "The library route."
- Original tree = all but explorations/, research/, CLAUDE.md: the old `CLAUDE.md` (Layout).
- "Who works here": the curator and the coordinator as the `coordinator` skill's `SKILL.md` defines them; the brief: that skill's `delegation.md`, "A brief". The rung worker: the script's prefix, "Your worktree" (`:906-924`: it makes its worktree, works only there, never touches the main tree) and "Commit and push as you go - on your own branch only" (`:1045-1050`: its own `wip/` branch, cut from the base, never `main`); the roles after it: the manual's "Skeptic", "Gather", "Gate" and "Commit" sections. The compile ladder and the climb: `explorations/compile-ladder/CLIMB.md` (its head: the rungs climbed, the ladder re-run), `explorations/compile-ladder/REPORT.md`. The worker launched alone on `main` in the main tree: POSITIONS "Where the work lives." (the work runs in the container on `main`); `explorations/protocol.md`, the hard rule on worker commits (it pushes after `git log origin/main..main`); `explorations/coordinator/process-engineering/design-batch10-brief.md:22`, a brief that has a worker commit and push `main` itself. The base in a batch: the prefix's manifest line "All branches are off BASE on main" (`:904`) and the manual's "Before the launch". The record: `area-records.md`'s sources.
- Rules: `explorations/protocol.md` hard rules (gate, test first, commit) and principles 2, 5; POSITIONS "Test first, the test kept.", "The suite's verdict is the check.", "Nothing is built or run twice on the same code.", "No re-measuring what the record holds.", "The library's own practice is the standard."; exploration § 2 (never a wipe); the script's prefix "Long commands" (`:960-979`), whose how-to is now the `claude-session` skill's.
- The harness named at first use: `harness-one.sh` and `junit.sh` headers (both run the suites' own `FileTests` cases, `SystemJUTest` and `Shell junit`). The prose edit with no test: the manual, "Rung worker" (a rung that edits only the specification or other prose makes no test-only commit and has no failure to see).
- The ladder stage as the one output comparison: POSITIONS "The suite's verdict is the check." (no batch compares the corpus's printed outputs) against the gate's step 7 (the script `:1870-1900`, phase and stdout of the 85 baseline files), a fixed baseline, not the test corpora.
- "Nothing twice" made precise (the cold read of 2026-10-05, finding 1.5): POSITIONS "Nothing is built or run twice on the same code." ("no stage re-runs a build, a suite or a measurement on a code state another stage has already run"; the skeptic "runs its own small programs" and reads test-first from the transcript); the prefix `:1037` ("a code state is a commit of the branch, and only a commit that changes code starts a new one"); `explorations/protocol.md` principle 2 (reproduce before explaining) and principle 5 (a finding is measured again only when the tree has changed under it).
- The rule on setting up each call: as `build-and-caches.md`, "Setting up each call", below.
- The specification as the standard of meaning and the library as the model for a change (the cold read, finding 2.8): POSITIONS "The specification stays the standard, the Types chapter beside it." and "The library's own practice is the standard." (whose subject is how the library is extended: "use those patterns for extending the standard library in the native way").
- Never `ant` through `tail`, with its reason: the script's prefix `:960-962` ("the summary you need is at the end and you will have to re-run to see it"; capture to a file under `tmp/` and grep it); `session.md` below.
- The stop, defined in the report rule: the `coordinator` skill's `delegation.md` ("It names the stops it reserves: the points the work must report as met"); `area-records.md`'s sources.
- The method rule ("Every claim is checked against a primary source ..."): `explorations/protocol.md`, principle 1 (no self-credit, attribution reconstructed where git does not record it, every claim verified against a primary source) and principle 2 (one variable per step; reproduce before explaining, now in the "Nothing twice" rule). Carried here when the coordinator skill took the protocol's conduct rules.
- The router's example span with `committing.md` and the report form (the cold read, 2.11): `committing.md` holds the footer that replaces the harness's, `area-records.md` the report contract.
- The curator: the role that names the person who curates the restoration and decides what is committed; the skill names the role, never the person (the review of this skill). This skill says nothing about the curator's review: what an agent's report holds is its contract with whoever reads the report (`area-records.md`, below), and which items reach the curator, and how, is decided outside this skill, which never points to it (the review of the skills: the dependence runs one way, through the contract).
- The router line to `cloud-container`, and the part `session.md`: the container, the session, restarts and agents were split into one skill, `remote-container`, at the review of this one; that skill was split in two on 2026-10-05, a Claude Code session's behaviour anywhere (`claude-session`) and the cloud platform's (`cloud-container`). On the same day the curator judged that what a worker needs of the session belongs here, where every worker has it loaded before a long command: the Bash tool, long commands, waits, stopping processes, interrupts and stops of the process, and the permission check moved into `session.md` (below), and the router's pointers to `claude-session` now name that part. What stays in `claude-session` (launching agents, agent types, resuming a Workflow run, relaunching a worker, the compaction hook) goes to the `coordinator` skill. The frontmatter description, left for the description optimizer, still names `claude-session`.
- The register of the whole skill (the curator's word of 2026-10-05, relayed by the coordinator): about halfway toward ASD-STE100, Simplified Technical English: one instruction per sentence in the imperative, short sentences, the condition before the instruction and a warning before its step, one word for one thing, and no sentence that neither instructs nor gives a fact needed to act.
- The description (frontmatter): from the skill-creator's description optimization on 2026-10-04 (its `run_loop` script over 20 trigger queries; the best of two iterations by the held-out score), its last sentence reworded so that it routes only the container, the session and restarts to `remote-container`, and the reworded text scored again with the same script; that sentence reworded again when `remote-container` was split, to route long waits and agents to `claude-session` and the disk and the container to `cloud-container`, a wording not yet scored; the eval set, the scores and the old description are in `explorations/reviews/skills-description-optimization.md`.
- "The team" introduced in the opening sentences, in the curator's wording (comments of 2026-10-05 on the review page: the word is used later for the original team and the repo as they left it, and needs its meaning where it first appears): `CLAUDE.md` (Sun Labs, 2003-2012); POSITIONS "The type group's late positions outweigh the early text."; `area-specification.md`, "Weighing the sources".
- Walk as the default and a tree-walking interpreter, in the opening (the curator's comments of 2026-10-05 on the review page: said in a few words inside the original sentence): `Shell.java:420-424` and `:470-475` (`walk`, and any argument ending in `.fss`, run the interpreter); FACTS, the first entries of "Execution model" (43.5 % of a walk run is the tree walk itself); POSITIONS "Interpreter performance is irrelevant.".

## build-and-caches.md

- env.sh contents: `explorations/experiment/env.sh:1-10`. Rats directories and `df` before a long run: FACTS "The disk allowance fills with parser-generation temp directories"; `distance/run.sh:16-19` (tmpdir; it never removes `/tmp/fortress*rats`, "which other runs on the machine use"); the script `:924` (source once per shell and never mid-run, "because the other agent's Rats! temp directories live there too"); the manual's "Measured, and not" on 2026-09-29 (`junit.sh` not run beside running rungs because it sources env.sh, "which clears `/tmp/fortress*rats` under the running rungs"). TMPDIR and JAVA_FLAGS with tmpdir, `echo $FORTRESS_HOME`: the script, "Your worktree" (`:917-924`); `bin/fortress_home` (takes FORTRESS_HOME from the shell); the manual `:48`.
- "Setting up each call" (the cold read of 2026-10-05, finding 1.1; a fault in a rule, listed for the curator in that fix's report): every Bash call is a new shell, by the Bash tool's own description, checked the same day by one call exporting a variable and the next reading it empty. The block is env.sh's lines 2-8 with the prefix's TMPDIR and JAVA_FLAGS lines (`:921-922`) and env.sh's line 10, the deletion, left out; `explorations/coordinator/tools/mg-run.sh:7-9` sets env.sh's variables by hand the same way. `mkdir -p tmp`: a TMPDIR that does not exist breaks the tools that use it; the manual's "Before the launch" makes `tmp` in the base build the same way. Which runs keep their temporary files out of `/tmp`: `build.xml`'s `fastTrack` and `systemShard` macros (`-Djava.io.tmpdir=${PF}/test-tmp`); `harness-one.sh:15`; `distance/run.sh:116`; `mg-run.sh:21`. `junit.sh:10` sources env.sh, whose `JAVA_FLAGS` its JVMs then take (`:20`, `:25`). That a run whose directory is deleted may fail is the record's reason above (the script `:924`, the manual), not a measurement.
- Only build file: `explorations/repo-internals.md:21-22`.
- compileAll times: brief-machine:14 (57 s, 82 s fresh, 25-40 s small edit); exploration § 1 (82 s), § 2 (25.8 s); gate summary (48 s); the old `CLAUDE.md` (~80 s).
- compileAll deletes caches and global.map, which is untracked and ignored and which the linker writes afresh, so nothing restores it: FACTS "`ant compileAll` deletes a tracked file"; `build.xml:539, :715, :356-360`; `.gitignore` (the `global.map` line, `clean-ladder`'s); `ProjectFortress/src/com/sun/fortress/linker/RepoState.java:366-385`.
- After compileAll the library order before compiled runs; failed compileAll: exploration § 2 "The rules for a worker"; FACTS "`ant compileAll` leaves the bytecode cache holding no library jars".
- Test targets do not compile: `explorations/coordinator/map/test-coverage.md` D.1; map README § 6.
- Cache anatomy: `explorations/repo-internals.md:147-157`; path keys: exploration § 1; staleness by date and api dependence: exploration § 2, `GraphRepository.java:243-244, :282-283, :614`. `default_repository/caches` at the tree's root: `build.xml:42` (`cache0`, a location relative to the root build file). The api, a component's interface in its `.fsi`: `explorations/repo-internals.md` ("The two worlds"); the specification's components and apis chapter.
- The five components the library order builds, AnyType shared by both libraries (the cold read, finding 1.6): `compiler/WellKnownNames.java:113-138` (both default-library lists end in `anyTypeLibrary()`); `explorations/coordinator/two-libraries.md:21` ("`AnyType.fss` (17 lines) is shared"); map README § 7, row `LibraryBuiltin/AnyType.fss` ("both"). CompilerSystem as the compiled path's `System`: `explorations/repo-internals.md:106`; `Library/CompilerSystem.fsi`.
- The bytecode cache's five jars, read in the main tree on 2026-10-05: `ls default_repository/caches/bytecode_cache/`.
- Which runs read default_repository/caches: exploration § 2 "Which runs read".
- Private cache dirs not ignored: `explorations/repo-internals.md:149-151`.
- Rebuild rules per edit kind, component times: exploration § 2 "The rules for a worker"; the script's "After an edit, and after a failed build" (`:926-945`).
- Interpreter-library edit needs nothing; compiled path does not link it: exploration § 2 (walk); map README § 7 row "Library/FortressLibrary.fss".
- nativewrapper stale class, unchanged-source compile writes nothing: the script `:945` (rung 7's traps).
- Library order commands and times: `explorations/repo-internals.md:175-182`; exploration § 1 (17, 63, 27, 2, 2).
- Symptoms: `explorations/repo-internals.md:160-173`; exploration § 2; FACTS "`ant compileAll` leaves the bytecode cache holding no library jars", "The compiled path's bytecode cache can come up empty after a library-order rebuild that reports exit 0" (`explorations/perf-probes/boxing/REPORT.md:46-51`, which records no cause; the check of the five jars after the library order follows from it).
- Keeping caches flag: exploration § 6 "Keeping the caches through a rebuild". `cache0` and `cache1` named: `build.xml:42`, `:46` and `cleanCache` (`:356-360`).
- The safe list for kept caches (the cold read, finding 1.7): the exploration's safe list says "code that no compile or run uses (the test harness, `Shell`'s options)"; map README § 7, row "`Shell.java` flags and phase orders" (both paths; which desugarings and checks run per path) and row `compiler/` phases 1-4 (which desugarers run is a `Shell` switch, `Shell.java:268-286`, `:371-386`). So `Shell.java` moved to the plain build, the test harness named by its package, and every path the list does not name, `interpreter/env/` among them, takes the plain build.
- Name resolution: `explorations/repo-internals.md:133-145, :24-28, :118-123, :61`.
- The rule on wiping, scoped to what was measured (the curator's comment of 2026-10-05 on the review page, that "never wipe" had become a dogma): `explorations/coordinator/build-cache-exploration.md:65`, `:71`, `:193` (a missed recompile is fixed by recompiling; a wipe is never the fix for it); the caches deleted only by `compileAll`'s first step, `cleanCache` (`build.xml:356-359`, `:715`). Keeping the caches with `-Dcache0`/`-Dcache1`, its safe list and its unsafe list: `build-cache-exploration.md`, "Keeping the caches through a rebuild" (by reading), measured by Fable in `process-engineering/cache-sharing.md` section 2 (the caches intact, a compile after it 4.6 s); the stale native wrapper given there as the example of a kept stale entry: the script `:945` (rung 7's traps). Placed under Building, where the deletion is, at the curator's comment of 2026-10-05 that the section be rewritten whole.

## toolchain.md

- Toolchain traps: the old `CLAUDE.md` (Build and run); `explorations/repo-internals.md:189-200` (javac target, ASM 3.1), `:131` (classfile 1.6); JDKs: the old `CLAUDE.md`; installed JDKs: `ls /usr/lib/jvm`; `JAVA_HOME`: `explorations/experiment/env.sh`, brief-machine:7. The fresh container's setup: `explorations/experiment/setup.sh:14-35` (the package list, the build stage) and its `transcripts` stage; the transcript backup said in a clause: the `cloud-container` skill, `hooks.md`.
- Generated sources, churn, S*Pattern: `explorations/repo-internals.md:80-86, :206-218`; the old `CLAUDE.md`.

## worktrees.md

- The base and the base build, what each is and who makes it in a batch (the cold read of 2026-10-05, finding 1.3): the manual, "Before the launch" (the coordinator builds one worktree at the batch's base, `args.base`, at a path such as `/home/user/fortress-base<N>`, before the launch; the script refuses to start without `args.baseBuild`) and "Climb batch 9: one base build, and a skeptic that reads"; the prefix's "Your worktree" (`:908-913`, the base build named to the rung). The base outside a batch, and the checks that a worktree can serve as a base build (its commit, a clean `git status --porcelain`, the library jar): `seed-worktree.sh:52-60`, the conditions it refuses a base on. The recipe: the manual's "Before the launch" with its `git checkout -- default_repository/caches/global.map` line dropped (the file is untracked since `6e2907707`; the pending edit's last section); about 200 s and the BooleanOps warm-up: exploration § 5. Building one at a path of your own and saying so: the prefix's rule for a seed that exits 2 (`:915`), applied to a missing base build. Checking a fix's old code against its starting commit: the manual, "Climb batch 9" (the skeptic runs the old code against the batch's base); `git merge-base` is git's own.
- seed-worktree.sh usage and behaviour: its header `explorations/coordinator/tools/seed-worktree.sh:1-42`, messages `:124-132`; exploration §§ 1, 3, 6.
- Never symlink: `explorations/coordinator/remote-container.md` § Setting up a batch's worktrees (last paragraph); the script `:928`.
- Two agents never compile into one cache: the manual `:48`; exploration § 1. A rung worker making its worktree with the script and working only there: the prefix, "Your worktree" (`:908-913`). A worker launched alone working where its brief says, often the main tree: POSITIONS "Where the work lives."; seeding a worktree of its own when it needs its own build follows from the rule on one cache.
- old-fortress.sh: its header `explorations/coordinator/tools/old-fortress.sh:1-25`; exploration § 6; the harness line on old code: the pending edit, section "climb-batch-workflow.js" (the third command line of "The old code beside the new"). The `junit` line (the cold read, finding 1.4), by reading, not run: the tool passes any `fortress` arguments to the base build's `bin/fortress` with both variables exported (`old-fortress.sh:42`); `Shell junit` runs the list through `FileTests` (`Shell.java:1086`); a `.test` file's `run` step starts `bin/fortress run` with the parent's environment (`FileTests.java:541-566`), and `bin/run_classpath:25` takes the bytecode cache from `FORTRESS_CACHES`.
- Never pointing `FORTRESS_CACHES` at the base build's own caches: the same reason as never running its `bin/fortress` without the tool (the manual, "Climb batch 9"; the pending edit), since `bin/fortress_classpath:25` and `ProjectProperties` take the caches from that variable.
- `.git/info/exclude` keeping `.claude/worktrees/` and `.claude/agents/` out of `git status`: the file itself, read on the machine; the boot note's paragraph on the container. `explorations/experiment/setup.sh` does not write these lines.
- FORTRESS_CACHES for a hand-composed run's run step: FACTS "A harness run against another build's classes must point `FORTRESS_CACHES` at that build's caches" (`compile-ladder/rung-return-type-rule/REPORT.md:90`, where "that build's caches" were the caches the run's compile wrote). The part says "the same folder as `-Dfortress.caches`", which is what the entry means, so that it is not read as the base build's own caches.

## session.md

Moved on 2026-10-05 from the `claude-session` skill's `long-commands.md`, `agents.md`, `interrupts-and-resume.md` and `compaction-and-permissions.md`, with the provenance below taken from its `sources.md`. "brief-machine" is `explorations/coordinator/process-engineering/blind-brief/machine.md`.

- Every Bash call a new shell, its functions and variables gone, an agent's working directory reset: the Bash tool's own description; checked on 2026-10-05 by one call exporting a variable and the next reading it empty. So `run_bg` and `wait_for` are defined in each call that uses them.
- The Bash tool's timeout: FACTS "The Bash tool's 10-minute ceiling kills long runs"; brief-machine:32; the tool's own description (default 120000 ms, at most 600000). A call moved to the background at the default timeout: seen in the session that wrote the `remote-container` skill and in the session that split it.
- `run_bg`, `wait_for`, never through `tail`, stopping only your own processes: the script's prefix "Long commands" (`:960-979`). What the two functions do: read from their code.
- The prompt cache's lives, the rewrite at every wake, the 270 s cap: FACTS "An agent that waits longer than the prompt cache lives writes its whole context again at every wake"; brief-machine:31. The main session's waits under an hour: POSITIONS "Check-ins and stops.". `Monitor` for the main session only: FACTS "The Bash tool's 10-minute ceiling ..." (`Monitor`, 1800000 ms) read with the cache-life entry.
- Agents sharing the cores, nothing else beside a kept time: brief-machine:7, :29; FACTS "The Workflow harness runs two agents at once on this box"; FACTS "The Bash tool's 10-minute ceiling kills long runs" ("nothing else running when a number is to be kept").
- `pkill -f` killing its own call: seen in the session that wrote the `remote-container` skill (the call exited 144) and in the session that split it.
- Interrupts and messages: FACTS "Stopping a turn kills every background agent alive at that moment ...", "A user interrupt of the coordinating session's turn kills a background Workflow run", "A message ... that arrives while the coordinator is inside a turn kills a running Workflow's agents ..." (does not hold). What a stop of the process kills and keeps, `nohup` commands surviving it: FACTS "A restart of the session's own process kills its background runs ...". A VM restart: the `cloud-container` skill.
- Starting again after an interrupt or a stop, steps 1, 3 and 4: FACTS "A restart of the session's own process ..." (shell scripts survive); the manual "The distance stage" (a retry finds its run by its log). Step 2, a complete log stands unless the tree changed: the script's prefix, "If your branch already carries commits" (`:1054`); the manual, "Shared prefix".
- The automatic permission check, its refusal after a go in chat, the way through: FACTS "The session's automatic permission check refuses a step ...". Reporting the refusal and not routing around it: `explorations/coordinator/PLAN.md`, the entry on climb batch 10's microGPT checks (the commit agent said so in its result and did not route around it).

## tests-running.md

- Tracks and shards: `build.xml:930-998, :1171-1213`; CompilerJUTest/LibraryJUTest sweep: `explorations/coordinator/test-discipline.md` § 5.
- Times and counts: the gate summary (testFast 11 min 11 s, 1,815; testSystem 3 min 46 s, 516); brief-machine:16-17 (635 s, 243 s); exploration § 4 gate row (541 s, 165 s).
- Never both at once: the script `:1799`; map test-coverage D.1 (shared test-caches); `build.xml:964, :1205` (each deletes test.caches).
- Results path: `build.xml:128`; `explorations/repo-internals.md:225-226`.
- BUILD SUCCESSFUL equivalence: the script `:1800` (gate step 5).
- FORTRESS_THREADS pinned, 768 MB: FACTS "The gate's thread count is pinned in the build file"; `build.xml:131`.
- Shards by sorted index, compare sum; count down means missing .test: FACTS "`testSystem`'s four shards are one suite split by sorted index"; the script `:1800`.
- harness-one.sh: its header and body, `explorations/compile-ladder/rung-inference-walk/harness-one.sh`; times: exploration § 2 (15-16 s for three), § 6 (25 s on old code). Passing X.test beside X.fss: inferred from the script copying every argument and `FileTests.java:841-860` reading `Name.test` beside `Name.fss`.
- Direct run for diagnostics: `explorations/repo-internals.md:231-233`; heaps: FACTS "Three heaps run the interpreter".
- junit.sh: its header, `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh:1-29`; one JVM together: the manual "Rules weighed", item 6.
- `fortress junit` by hand, testOnly, switches: map test-coverage D.2; `build.xml:777-812`; `FileTests.java:909, :1220, :1244, :1256`.
- One whole-suite run per code state, no partial stage runs: the script `:1035-1039`.
- One track by hand: the `fastTrack` macro `build.xml:930-958` (properties, env, memory); `harness-one.sh` (the same pattern for SystemJUTest, global.map seed); `explorations/compile-ladder/rung-overloading-checker/REPORT.md:438` (tracks run as one JVM each with a private cache tree through `junit.textui.TestRunner`); `CompilerJUTest.java:22-24` (main runs TestRunner); compiler track 428 s: map test-coverage D.1. The command itself is composed from these, not copied from one script. `testCompiler`/`testLibrary`/`testOtherCompiler` depend on `cleanCache, compile`: `build.xml:818, :844, :869, :588`.
- Complete log stands: the manual "Shared prefix" (resumed worker paragraph).
- Outside the gate: FACTS "`ant testSpecData` runs 130 of the specification's 133 extracted examples under walk ..." and POSITIONS "The specification's examples join the gate at zero red."; `build.xml:988`, `:1114`, `:1139`; `explorations/coordinator/map/test-coverage.md:228`; FACTS "The gate: two corpora, hand-ported ..." (the orphaned folders); `explorations/repo-internals.md:62-68`.

## gate.md

- Re-gate rule and test-file definition: the manual "A repair of tests and records only"; exploration § 4-5.
- Gate contents: `explorations/protocol.md` hard rule "The gate"; the script's gate steps `:1786-1880`; red conditions `:1977`.
- Gate time ~25 min: exploration § 4 gate row (1,467 s) and "For Pavol" (25-minute gate); component times there, the gate summary, and FACTS "The true distance to the switch-over" (786-1,252 s).
- Atomic runs: the script `:1775-1776, :1839-1869`; fourteen programs, 42 lines: the gate summary.
- Ladder regression: the script `:1870-1900`; FACTS "The ladder-regression stage's baseline is ..."; never the full-corpus driver: the script `:1137`; ladder subset rule: the script `:1137`.
- microGPT never in the gate: POSITIONS "Interpreter performance is irrelevant."

## tests-writing.md

- Test first, essence, transcript as record, no one-off script, assert inside the test: POSITIONS "Test first, the test kept.", "The suite's verdict is the check."; `explorations/protocol.md` hard rule "The gate"; the script's REPORT.md paragraph `:1028` (two to five lines quoted).
- Seen failing before the edit is built: the manual "Climb batch 9", "The skeptic builds nothing." (the condition on the recorded failure).
- Interpreter pass rule, skipped names: `FileTests.java:383-421, :934-935`; `explorations/coordinator/test-discipline.md` § 5.
- test_library apis: FACTS "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test".
- .test file as enumeration, keys: `explorations/coordinator/test-discipline.md` § 5; `FileTests.java:129-200, :280`; example `ProjectFortress/library_tests/EqualityRung1.test`; WIcontains: FACTS "The harness's `run_out_WIcontains` key ...".
- XXX mechanics: FACTS "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test", "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only ...", "A thrown `CompilerError` takes a third path ...", "Two constraints of the test and native machinery ...", "An `XXX` compile test pinned by `compile_err_contains` ..."; REACHED keys: the manual "Shared prefix", home 2; example `ProjectFortress/compiler_tests/XXXTryAtomicCodegenRungB.test`.
- Load refusal key: FACTS "Walk checks at load the `comprises` clauses of the program's main component ..."; `FileTests.java:455-480, :836-860`; example `ProjectFortress/tests/ComprisesUnlistedExtender.test`.
- Promotion by rename: POSITIONS "The order of the checker's attempts at a call" ("promoted"); `explorations/coordinator/tools/count-run/compare-normalised.py` docstring (promotion by git mv).
- Three homes: the manual "Shared prefix", "What a measured defect is worth".
- Naming by topic, one comment line: the manual "Shared prefix" (register paragraph); POSITIONS "The new batch practice ..." (named by topic).
- Spec citations by section: FACTS "The test corpora cite the specification by file and section, never by line"; renamed section rule: the manual "Shared prefix".
- Respelled team test lines: POSITIONS "The gate's comparisons."
- Threads 1 and 4: the script `:1276`.
- Ambiguity message order: FACTS "The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program".

## checker-measurements.md

- What each measures, zero necessary not sufficient, per-api rows double: FACTS "The true distance to the switch-over ..."; "The checker-count stage's table ..."; `explorations/coordinator/tools/checker-count/run.sh:1-40`; `explorations/coordinator/tools/distance/run.sh:1-66`.
- Commands, private caches, no rebuild: the two run.sh headers; `distance/compare.sh:1-20`.
- Times: `checker-count/run.sh:19` (20 s); brief-machine:18-19; exploration § 4 (139 s, 840 s); FACTS "The true distance ..." (786-1,212 s, 14-24 min); `explorations/compile-ladder/climb-batch-10/gate/distance.txt:41` (1,252 s, FortressLibrary 749).
- Settings: `distance/run.sh:24-37`; the manual "The distance stage".
- Per-site lists: `distance/run.sh:123-125`; FACTS "The true distance ..." (`compile-ladder/gate/distance-sites.tsv`).
- Landed tables as the before, no partial runs, no re-runs: POSITIONS "No re-measuring what the record holds.", "Nothing is built or run twice on the same code."; the script `:1039`; FACTS "The checker-count stage's table ..." (how the last landed table is found).
- Never red, a fix can raise it: POSITIONS "The checker count is measured, never red."; the manual "The checker count, and a rung whose test is that stage".
- Variation and row 488: FACTS "The true distance ..."; `distance/compare.sh:14-18`.
- Memo off: `checker-count/run.sh:34-40`; the manual "The checker count ..." (last paragraph).
- Shadows: `checker-count/run.sh:21-32, :44` (STOCK_SHA); map README § 7 row `scala_src/typechecker/` (an edit to StaticChecker.java turns the gate red); `distance/run.sh:48-52, :90-107`.
- Blind paths: FACTS "The checker-count and distance stages read only the compiler's phases ..."; the manual "Rules weighed", item 5.

## area-interpreter.md

- Layout: `explorations/repo-internals.md:49, :97-110`.
- Heaps, 256 MB claims: FACTS "Three heaps run the interpreter".
- Threads and implicit parallelism: FACTS "The gate's thread count is pinned ..." (floor(nproc/2)); Execution model, "Implicit parallelism".
- Walk times: brief-machine:20; exploration § 1 (4.0 s), § 2 (walk re-reads, 13.7 s then 3.7 s).
- claude_demo.fss red: `explorations/fortress-gap-ledger.md` row 424; `explorations/coordinator/PLAN.md:107`; exploration § 1. BooleanOps: exploration § 5. hello.fss: the old `CLAUDE.md`. mandelbrot_canonical.fss as the smoke test: the old `CLAUDE.md` (Build and run), kept at the curator's choice on the skill page (`6c9dcd89e`).
- mg-run.sh: its header and body; the permission check refusing its `rm -rf` (`mg-run.sh:16`): `explorations/microgpt-run-c-handover.md`, first section, the paragraph on climb batch 10's landing; `explorations/coordinator/PLAN.md`, the last entry under "Climb batch 10, listed for his review"; model diffs: `explorations/protocol.md` principle 1.
- No checking under walk; typecheck uses the compiler prelude: FACTS Execution model, first three entries; `explorations/repo-internals.md:129`.
- Coercion on the value: POSITIONS "Walk chooses coercions on the value, for now."
- Message order: FACTS "The interpreter's overload-ambiguity message ...".
- No interpreter timing: `explorations/protocol.md` principle 2; POSITIONS "Interpreter performance is irrelevant."
- import java under walk, wired and unfinished, no test using it: FACTS, section "The territory map", the entry opening "`import java` works on the interpreter path through `ForeignComponentWrapper` + `ClosureMaker`"; map README § 7 row `nativeHelpers/`.
- Natives and FortressError: FACTS "Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees"; FACTS "The one library binds its natives with `builtinPrimitive`" (boxed values).
- Load checks: FACTS "Walk checks at load the `comprises` clauses ...".
- Suites and blind paths: the script `:1037`; FACTS "The checker-count and distance stages read only ...".
- Shared early phases: map README § 7 row `compiler/` phases 1-4.

## area-compiler.md

- Layout: `explorations/repo-internals.md:50-58`. Incomplete not broken: the old `CLAUDE.md`.
- Running, times: `explorations/repo-internals.md:175-182`; brief-machine:20.
- Phases: `explorations/repo-internals.md:127`; Shell switch: map README § 7 row `compiler/` phases 1-4.
- Where a fix belongs: the script's prefix (territory map `:987-997`, rule 1 of `:998-1009`).
- Code generator: `explorations/repo-internals.md:131`; FACTS Execution model (RTTIsize, generic instantiation).
- Compiler prelude, nothing added: POSITIONS "The library route."; map README § 7 row `Library/CompilerLibrary.fss`.
- Natives: FACTS "The one library binds its natives ..."; "Two constraints of the test and native machinery ..."; nativewrapper: the script `:945`.
- Quick loop: map README § 6 (the shadow loop); `checker-count/run.sh:21-32`; caches never checked against the compiler: exploration § 6.
- Tracks once per code state: the script `:1037`.
- Atomic runs and threads: the script `:1839`; map README § 7 row `runtimeSystem/`.
- extends Object: FACTS "Between the interpreter's library and bytecode stands the checker ..."; POSITIONS "The implicit bound of an unbounded type parameter is `Any`".
- Api/component name: FACTS "An exported function fails exactly as an exported variable does ...".
- 0-byte jar on a failed program compile: FACTS Execution model (boxing/kernels entry); failed library compile writes nothing: exploration § 2.
- The `fortress` commands: `Shell.java:403-487` (the dispatch) and `:371-386` (the library switch), read on the tree; `explorations/repo-internals.md:41-43`, `:111-117`; the agents' use of each command counted over session `fe616d40`'s agent transcripts on 2026-10-04 (`compile`, `run`, `junit` and walk regular; `typecheck`, `parse` and `link` occasional; `api`, `test` and `unparse` almost never).

## area-library.md

- One library, prelude deleted, nothing added: POSITIONS "The library route."; `explorations/repo-internals.md:24-28`.
- Library's way first: POSITIONS "The library's own practice is the standard."; `explorations/protocol.md` principle 2.
- Decisions listed: POSITIONS "The exclusion rule stays and the tower is flat (route A).", "The implicit bound of an unbounded type parameter is `Any`", "A type parameter the arguments do not fix takes its bound ...", "Conversions never change which declaration runs."; the siblings named, `RR32` among them: FACTS "The one library's number tower is flat".
- Comment spans: FACTS "A comment placed after a declaration that ends in an expression or a type ...".
- FortressAst generated: `explorations/repo-internals.md:82-86`.
- Natives, Writer: FACTS "The one library binds its natives ...".
- Respelled test lines: POSITIONS "The gate's comparisons."
- library_tests holds compiler-prelude tests: map README § 7 row `Library/CompilerLibrary.fss`; `explorations/repo-internals.md:109`.

## area-specification.md

- Standard, frozen copy, its name, types.tick: the old `CLAUDE.md` (Project goal); POSITIONS "The specification stays the standard ...", "The S1 form"; `Specification/appendices/changes.tex:18-63`; `explorations/coordinator/spec-lineage.md` Summary.
- Weighing: POSITIONS "The type group's late positions outweigh the early text."; `explorations/protocol.md` principle 1.
- apis/*.tex circular: FACTS "The test corpora cite the specification by file and section ..." (the generated-file note).
- Revision form: POSITIONS "Every change to the specification is recorded with its reason.", "The S1 form", "The refused examples (S2)."; macro `Specification/fortress/fortress.tex:87-92`; entry layout `Specification/appendices/changes.tex:64-70`.
- Report false sentences: the script's REPORT.md paragraph `:1028`.
- Disagreement handling: the manual "Rules weighed", item 4.
- Citing: FACTS "The test corpora cite ..."; the manual "Shared prefix".
- Blind: FACTS "The checker-count and distance stages read only ..."; the manual "A repair of tests and records only".

## area-records.md

- facts-extract.sh queries: `explorations/coordinator/tools/facts-extract.sh --help`.
- File roles: `explorations/coordinator/README.md`; the old `CLAUDE.md`; the script's prefix (territory map list, `:987-997`).
- git archaeology: `explorations/repo-internals.md:88-95, :237-244`.
- Old READMEs: the old `CLAUDE.md` (last paragraph).
- The coordinator's boot reads FACTS whole: `explorations/coordinator/README.md` (boot order).
- Practices: `explorations/protocol.md` principles 2, 4, 5; POSITIONS "No re-measuring what the record holds."; the script `:1041-1043` (what you cite).
- Ledger: `explorations/fortress-gap-ledger.md:43-53`; never renumbered: the script's record.md paragraph `:1029`; rows as bug reports: POSITIONS "Test first, the test kept."
- FACTS/POSITIONS form, one home: `explorations/coordinator/README.md`; POSITIONS "The record's form: an optimized build and a debug build."; `explorations/protocol.md` principle 6.
- A fact in the commit that establishes it, a decision in the next commit after the curator states it: `explorations/coordinator/README.md`, "How they are kept" (the old `CLAUDE.md` said "the same commit" of both).
- Files a parallel agent does not edit: the script `:1033`.
- "The repository's history": moved from the old `CLAUDE.md`'s opening paragraph at the curator's review comment of 2026-10-04 (it is lookup material, not something every agent needs); `research/authorship.md:14-22`; FACTS, "`palimondo/fortress` is a 2018 GitHub fork ...". That entry says `main` descends from the graft commit `8fe1daa8f`, which copied files onto `a874948ac`, so the part says "the commits after `a874948ac` are the revival's" and not that everything after it is the revival's own work; what the graft copied is named only in `lineage.md` (POSITIONS, "The third-party Java 9 port").
- Everything under explorations/: POSITIONS "Where the work lives."; decks: `explorations/protocol.md` hard rules.
- What every report holds: the review of the skills (its four items, the agent deciding nothing about what is reviewed and asking the curator nothing). Defects and their homes: the manual "Shared prefix", "What a measured defect is worth"; `tests-writing.md`'s sources. Decisions with their alternatives: the script's prefix "Register" (`:1022`, "If you make a decision, say in your report that it was a decision and what the alternatives were: a decision buried in a report is a decision not made"); POSITIONS "Ownership."; the reading acted on: `explorations/protocol.md` principle 4. Stops met, part of the work included: the script's result field `stopsMet` (`:1145`, `:1292`, `:1351`). The script's result field for points a rung puts to the curator (`:1145`) is replaced here by the decision not taken; the script itself is not changed by this skill.
- The line in `SKILL.md` on what every report holds: the same.
- An untitled FACTS entry cited by its opening words: `explorations/coordinator/README.md`, "How they are kept".

## committing.md

- All rules: `explorations/protocol.md` hard rules and principle 1; POSITIONS "What a batch commits.", "Workers commit their own files as they go." (the opening line: a worker commits as it goes, so the part states that as the default and a brief's "do not commit" as the exception); the branch trap: `explorations/coordinator/remote-container.md` "The branch trap" (the re-provisioning itself is in the `cloud-container` skill); no rule on global.map, untracked and ignored: FACTS "`ant compileAll` deletes a tracked file".
- The test runs and the distance polled in the background: the `claude-session` skill's long commands; never `ant` through `tail`: the script `:960-979`.
- Pushing `main` after every commit: FACTS "The push loop pushes `main` every 4 minutes ..." (no loop runs; the coordinator pushes after every commit); POSITIONS "Workers commit their own files as they go.".

## Where the sources disagree or are stale

- Wiping caches: the old `CLAUDE.md` ("wipe `default_repository/caches/*` and recompile in library order"; "wipe them if library edits seem to have no effect") and `explorations/repo-internals.md:160-167` ("When in doubt, wipe"; wipe after any library edit) against exploration § 2 ("Do not wipe the cache for any of these"; `:41`, the wipe rule "no longer holds for walk") and the script's "After an edit". The skill follows the exploration; `global.map` is untracked, so a wipe needs no restore (`repo-internals.md:201-205`).
- The walk smoke test: the `CLAUDE.md` before `6c9dcd89e` (`git show 6c9dcd89e^:CLAUDE.md`) named `explorations/claude_demo.fss`, which dies at its unwritten `SUM` (ledger row 424; PLAN.md:107; exploration § 1). The skill gives `explorations/mandelbrot_canonical.fss`, the curator's choice, and `ProjectFortress/tests/BooleanOps.fss` (exploration § 5).
- The old code beside the new: the manual `:48` and the script's prefix (`:947-958`) still describe a per-worktree seeded copy `<worktree>-base`; exploration § 6, `seed-worktree.sh:14-15` and `old-fortress.sh` describe the base build run with a private caches folder, and the pending edit holds the replacement texts for the manual and the script, to be applied before the next batch. The skill gives `old-fortress.sh`.
- Suite counts and times: brief-machine:16-17 (1,782 tests, 635 s; 504 tests, 243 s) and the distance "340 now" (brief-machine:19) predate the gate summary (1,815 and 516; distance 253). `explorations/repo-internals.md:222-224` (testFast ~12 min, testSystem 382 tests ~2 min) and map test-coverage D.1 (5 min 23 s, 2 min 8 s) are older still.
- The checker count's time: `checker-count/run.sh:19` says 20 s; brief-machine:18 and exploration § 4 measured 139 s beside other jobs. `checker-count/run.sh`'s header now says a change in the count is reported, not red; `INDEX.md:143` (the line on `tools/checker-count/`), the manual `:131` (which says the header still says it) and the manifest comment on `expectedCheckerCount` still say the count may only fall. The count is reported and never red on its own.
- The distance stage's time: the manual "The distance stage" says 13 to 24 minutes; FACTS gives 786 to 1,212 s at gates; the newest table says 1,252 s.
- Failed compiles: FACTS Execution model says a failed compile leaves a 0-byte jar in the bytecode cache (a program's compile, `perf-probes/kernels/REPORT.md`); exploration § 2 says a failed library compile writes nothing, and a killed one may write only its jar. The skill states both, each for its case.
- The commit footer: `explorations/protocol.md:34-37` gives a footer naming no model; the harness's own attribution reminder may suggest one naming a model. The skill gives the protocol's.
- The working draft's name: the old `CLAUDE.md` called `Specification/` "the Working Draft of 2010-12"; Appendix I and POSITIONS "The S1 form" call the unrevised copy "the Working Draft of February 2011"; `spec-lineage.md` says the frozen sources are a January 2012 clone whose text was last edited 2010-12-09. The skill uses only the name the revision form prescribes.
- Spec citations: the ledger's header (`fortress-gap-ledger.md:51-52`) cites the specification by line; the test corpora cite by section, never by line (FACTS). The skill's rule is for tests.
- Atomic programs: the script's comment says thirteen; its list and the gate summary have fourteen.
- `FileTests.java` line numbers drift: `test-discipline.md` and the manual cite older lines (`:932`, `:587`) than FACTS (`:1049`, `:605-610`). The skill cites no line numbers.

## What to re-check when the tree changes

- Every count and time above against the newest gate summary and tables (`git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt'`).
- The rebuild rules if `seed-worktree.sh`, `old-fortress.sh` or `build.xml`'s `cleanCache` change.
- The blind-path list if `STAGE_BLIND` in the script, or what `Shell.compilerPhases` reads, changes.
- The atomic program list and the ladder baseline if the gate's step 6 or 7 changes.
- The prelude files and the "add nothing" rule at the switch-over, when the compiler's prelude is deleted.
- `claude_demo.fss` once ledger row 424 is closed.
- The `mg-run.sh` refusal once the curator has given the session an allow rule for it, or the script no longer removes directories.
- The `import java` line under walk when the natives' one binding text is chosen (PLAN item 35) and built.
