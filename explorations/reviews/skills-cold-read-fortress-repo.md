<!-- A cold read of the fortress-repo skill, 2026-10-05, by a reader given only the skill (SKILL.md and references/, sources.md excepted). -->

# Cold read of the fortress-repo skill

I read `SKILL.md`, then each part in the router's order: build-and-caches, toolchain, worktrees, tests-running, gate, tests-writing, checker-measurements, area-interpreter, area-compiler, area-library, area-specification, area-records, committing. I skipped `sources.md` as the router says. I opened no other file of the repository. I read the skill as three workers would: a fixer (a fix under the original tree, test first, build, tests, commit), a skeptic (checking another worker's fix against the old code), and a probe (measuring one thing and writing a report).

Line numbers are the files' own. "I would" is what I would do with only the skill in hand.

## 1. Passages that would lead me to a wrong or costly action

### 1.1 Sourcing env.sh deletes live parser directories, and every Bash call is a new shell

- Where: `references/build-and-caches.md:6-8`.
- Words: "deletes `/tmp/fortress*rats`. Source it once per shell, never in the middle of a run: another agent's live parser directories may be in `/tmp`."
- What I cannot tell: in this harness every Bash call starts a new shell, so "once per shell" means once per call. A background suite is polled from later calls. If each poll sources `env.sh`, it deletes the running job's parser directories, or another agent's. The text says other agents' directories may be there, but sourcing the script deletes them anyway. The `TMPDIR` advice (lines 10-11) comes after the source step and only "when other agents share the machine", which I cannot detect. I also cannot tell whether the ant suites' forked JVMs honour `TMPDIR` or `JAVA_FLAGS`.
- What I would do: source `env.sh` at the top of every Bash call, as "Every shell" says.
- Cost if wrong: a 10-minute suite, or another agent's 25-minute gate, fails with a missing-parser error that looks like a real failure. That run is then wasted, and it may be read as a red verdict.

### 1.2 Who runs the gate, and whether a worker may push to main

- Where: `references/gate.md:3`, `references/tests-running.md:65`, `references/committing.md:3, 27-31`.
- Words: "The gate decides whether a tree lands on `main`." Also "A worker on its own branch ... never touches the main tree, `/home/user/fortress`." Also "To `main`: only after `git log origin/main..main` shows nothing but your own commits".
- What I cannot tell: whether I, a fixer, run the 25-minute gate before landing, or someone else does. Pushing to `main` needs a `main` branch, which lives in the main tree, which a worker never touches. So the "To main" rule seems to be for someone else, but no passage says who. The skill never says what happens after a worker pushes its own branch.
- What I would do: push my branch and stop. A reader who takes "To main" as theirs would commit in the main tree and push `main` without a gate.
- Cost if wrong: ungated code on `main` and on the re-provisioning branch. Or a duplicated 25-minute gate, against "nothing run twice". Or edits to a main tree another session is working in.
- This brief itself shows the gap. It asked me to commit in `/home/user/fortress` on `main`. Under `committing.md:27` a worker never touches that tree, and nothing tells me whether this task counts as a worker's.

### 1.3 "The base" is never fixed, so the old code may be the wrong old code

- Where: `references/worktrees.md:7-17`, `references/tests-writing.md:8`.
- Words: "Build one tree at the base commit once". Also "`git ... worktree add --detach /home/user/fortress-base <base-commit>`". Also "See it fail ... on the base's code".
- What I cannot tell: what the base commit is (`origin/main` now? the commit my branch starts from? a batch's chosen commit?). I cannot tell who builds the base, whether one already exists, or where. `/home/user/fortress-base` is only an example path. I also cannot tell how to check that the base build's commit is the parent of the fix I am checking.
- What I would do: as a skeptic, look for `/home/user/fortress-base` and use it with `old-fortress.sh`.
- Cost if wrong: if that base is older or newer than the fix's parent, my "old code" run measures a different tree. I would then confirm or reject a fix on false evidence. If no base exists and I build one at that path, I may collide with another agent's build (`git worktree add` fails, or two agents build one tree).

### 1.4 Running the harness against the base: "that build's caches" may mean the shared base caches

- Where: `references/worktrees.md:51, 54`.
- Words: line 51, "Never run the base build's `bin/fortress` without the tool: that compiles into the base's own caches." Line 54, "A harness run against another build's classes must set `FORTRESS_CACHES` to that build's caches as well as passing `-Dfortress.caches`".
- What I cannot tell: whether "that build's caches" means the base build's own `default_repository/caches`, or my private copy in `tmp/old-caches`. Read literally, line 54 has me point the run at the base's own caches, which line 51 forbids. I also cannot tell how to pass `-Dfortress.caches` to `junit.sh`. The old-code recipe covers walk, `compile`, `run` and `harness-one.sh`, but not a compiled `.test` run through `junit.sh`.
- What I would do: as a skeptic who needs a compiled `.test` on the old code, I might set `FORTRESS_CACHES=<base-build>/default_repository/caches`.
- Cost if wrong: my run writes into the shared base's caches. `old-fortress.sh` copies those caches into every agent's private folder on first use (line 48). Every later old-code run by any agent then starts from my entries.

### 1.5 "Nothing run twice" against "reproduce", the skeptic's re-run and the gate's re-run

- Where: `SKILL.md:14, 17`, `references/tests-running.md:65-66`, `references/checker-measurements.md:29, 52`, `references/committing.md:8`.
- Words: "Nothing is built or run twice on the same code." Also "Reproduce before explaining". Also "Nobody runs it again on that commit." Also "The gate measures both on the landing tree either way." Also, in committing, never commit "captured outputs, logs, raw run output".
- What I cannot tell:
  - As a skeptic, whether I may re-run the fixer's tests on the fixer's commit. That is running twice on the same code, and reproducing is what I am for.
  - Whether "nothing run twice" covers re-running a failure suspected of being flaky (`tests-running.md:47` says a test that passes alone can fail beside others).
  - Why a worker runs the checker count and the 13-24-minute distance "once on your final code" when the gate measures the same tree again. A worker cannot commit its table, so the table never "exists" on record and the gate cannot cite it. The reason for the worker's run is missing, so I cannot tell when to skip it.
  - The same holds for the whole suite: `tests-running.md:66` says nobody runs it again on that commit, and line 65 says the gate runs everything on the tree that lands.
- What I would do: as a skeptic, re-run the tests anyway and say so. As a fixer, run both measurement stages, because three passages say to.
- Cost if wrong: either a check that verifies nothing, or 15-25 minutes of duplicated measurement per change, against a rule the skill states first.

### 1.6 Which library AnyType and CompilerSystem belong to

- Where: `references/area-library.md:3`, `references/build-and-caches.md:49-50`, `references/area-compiler.md:38`, `references/checker-measurements.md:3`.
- Words: area-library lists the one library's `LibraryBuiltin/` as "(`FortressBuiltin`, `NativeArray`, `AnyType` and the rest)". build-and-caches calls AnyType a "compiler-library component". area-compiler lists the compiler's prelude "with `LibraryBuiltin/AnyType.fss`. Add no declaration to it". The lists of what is deleted at the switch-over name three components (CompilerLibrary, CompilerBuiltin, CompilerAlgebra). CompilerSystem and AnyType are not among them, although both are in the library order.
- What I cannot tell: whether AnyType is shared, the interpreter's, or the compiler's. I cannot tell whether "add no declaration" covers it, or whether CompilerSystem survives the switch-over.
- What I would do: a library fixer reading area-library first would treat AnyType as the one library, edit it, and follow build-and-caches line 51 ("the interpreter's library: nothing" to rebuild).
- Cost if wrong: under build-and-caches line 49 an AnyType edit needs a compile, and its `.fsi` needs the whole library order. Skipping it means compiled runs use the old AnyType "with no warning" (line 47). Or the fixer adds a declaration to a file the compiler's rule forbids.

### 1.7 Editing Shell: keep the caches, or not?

- Where: `references/build-and-caches.md:27` against `references/area-interpreter.md:41`, `references/area-compiler.md:14` and `references/checker-measurements.md:52`.
- Words: build-and-caches lists "`Shell`'s options" among edits after which keeping the caches is safe. area-interpreter says "an edit to the desugarers, the disambiguator or `Shell`'s switches can change both paths". area-compiler says "Which desugarings run is a `Shell` switch". checker-measurements says Shell may move the measurements.
- What I cannot tell: whether "options" and "switches" are different things. If they are the same, an edit that changes which desugarings run is called safe for kept caches. The same list also leaves out `interpreter/env/` (named in `area-interpreter.md:3`), so I cannot tell which build an `env/` edit needs.
- What I would do: keep the caches after a Shell edit, as the build page says.
- Cost if wrong: cached analysis from the old desugaring is used "without warning until the caches are deleted" (line 27). Every compiled result after that is silently stale, and the fix is a cold rebuild.

### 1.8 "Reserved stops" are never defined, nor what meeting one does

- Where: `SKILL.md:20`, `references/area-records.md:63`.
- Words: "each reserved stop the work met". Also "Each stop the brief reserves that the work met ... including one met on part of the work."
- What I cannot tell: what a stop is, whether meeting one halts the work, or only that part, before or after committing, or whether I finish and only list it. "Met on part of the work" suggests the rest continues, but not what happens to the part that met it.
- What I would do: finish the work, commit it, and list the stop in the report.
- Cost if wrong: if a stop means "hold before landing", I would commit and push work the curator had reserved. That is a revert and a decision taken without them.

### 1.9 A probe that measures a defect seems obliged to write gated tests

- Where: `references/tests-writing.md:50-54`, `references/area-records.md:61`.
- Words: "Every defect anyone measures gets one of three homes". Also "a gated `XXX` test asserting the specification's answer, written in the change that measured the defect".
- What I cannot tell: whether a probe, whose brief is to measure and report, must write and commit that test. Doing so is an edit under the original tree, with the full test-first cycle. Or whether naming the home in the report is enough (area-records line 61 says "with its home named").
- What I would do: name the home in the report and write no test, unless the brief asks for one.
- Cost if wrong: either the report is judged incomplete and the probe must be re-run, or a probe makes original-tree edits and commits nobody asked for.

### 1.10 The gate's cache copy is described after the step that changes the caches

- Where: `references/gate.md:11, 15-29, 33`.
- Words: the order is "the library order; `ant testFast`, then `ant testSystem` ...; the four-thread atomic runs; the ladder regression". Line 33 says "Put copies of `default_repository/caches`, taken right after the library order".
- What I cannot tell: the atomic runs compile fourteen programs into `default_repository/caches` before the ladder step, and I only learn of the copy when I reach the ladder. I cannot tell whether a copy taken at the ladder step, with the atomic programs' jars in it, is acceptable to the driver and its "cache pruning".
- What I would do: copy the caches when I reach the ladder step.
- Cost if wrong: if the polluted copy matters, the ladder shows spurious DOWN or STDOUT rows, which are red. If I notice and skip the copy, the driver rebuilds the library (about 145 s).

### 1.11 Code-generator edits: which whole tracks

- Where: `references/tests-running.md:66-67` against `references/area-compiler.md:46`.
- Words: tests-running says "An edit to the checker's or walk's Java or Scala may run the suite it reaches ... Every other change runs only its own tests". area-compiler says "checker or code-generator edit ... the whole tracks at most once".
- What I cannot tell: whether a code-generator edit may run whole tracks. Neither passage names the othercompiler track (`OtherCompilerJUTest`), where the atomic programs live (`gate.md:20`), for a code-generator edit.
- What I would do: run the compiler and library tracks after a code-generator edit.
- Cost if wrong: a regression in `other_compiler_tests/` stays unseen until the gate, or I run a whole suite the testing page says this change does not get.

### 1.12 Spec edits are original-tree edits, but test-first cannot apply

- Where: `SKILL.md:12`, `references/area-specification.md:9, 34`.
- Words: "Every edit under the original tree is test first". Also "A change is an edit of the original tree and its commit says so." Also "no suite reads it".
- What I cannot tell: how a text-only spec revision is test-first. The same question holds for `build.xml`, `Documentation/`, and the `.fsi`-only stubs. I cannot tell whether test-first applies only to code, or whether a spec change needs a companion test.
- What I would do: write the revision with no test, and say so in the report.
- Cost if wrong: a skeptic flags the rule as broken, or I write a test of nothing to satisfy the letter.

## 2. Passages that would make me stop and search

### 2.1 junit.sh: which N, what label, where the output goes

- Where: `references/tests-running.md:40-43`.
- Words: "`explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label>`".
- What I cannot tell: which `climb-batch-N` (the newest? any?), whether the copies differ, what `<label>` names, and where the results land (a tracked path?).
- What I would do: `ls` the folders, take the highest N, and read the script before running it.
- Cost if wrong: an old copy with an old bug, or output written somewhere tracked that I then must not commit.

### 2.2 The gate's own inputs and outputs

- Where: `references/gate.md:5, 11, 33, 37`.
- Words: "`<gated-commit>`". Also "compared with the newest landed summary". Also "`microgpt-phase.md`". Also "unless the change named it in advance as expected". Also "Never run the whole-corpus driver with its default root".
- What I cannot tell:
  - How to find the gated commit.
  - What a gate writes, where (a `climb-batch-*/gate/` folder for a tree that is not a batch?), and in what form `summary.txt` is, so the next gate can compare with it.
  - Where `microgpt-phase.md` is.
  - Where "named in advance" happens: the brief, the commit message, or the report.
  - Which script is "the whole-corpus driver", which I am told never to run.
- What I would do: open `explorations/compile-ladder/` and the newest gate folder, and copy the last gate's layout.
- Cost if wrong: a gate whose summary the next gate cannot read. Or a skeptic who cannot tell whether a DOWN row was announced. Or the shared default root's pruning corrupting a parallel run.

### 2.3 Where a report goes, and whether it is a file

- Where: `references/committing.md:7`, `references/area-records.md:57-64`.
- Words: "Committed: the Fortress change, its tests, its report". Also "What every report holds".
- What I cannot tell: where a report file goes (which folder under `explorations/`, and what name), or whether "the report" is the agent's final message to its caller. The form of its content is clear.
- What I would do: for a probe, write `explorations/<topic>/<name>.md` and repeat its essentials in the final message.
- Cost if wrong: a report nobody finds, or one committed in a place the record does not index.

### 2.4 A defect that already has an XXX test: in what order is test-first done?

- Where: `references/tests-writing.md:8, 36, 53`, `references/area-records.md:47`.
- Words: "it is then renamed without the prefix". Also "even when a later change is planned to repair it". Also "a fix begins by committing the row's reproduction".
- What I cannot tell:
  - When the defect already has a gated `XXX` test (the common case, by line 53), what "seen failing" is. Is it the XXX file reported as an expected failure, then the fix, then red, then the rename? Or is it the rename first, then the plain-named test failing?
  - Whether "begins by committing" means the failing test gets its own commit before the fix. A plain-named failing test committed alone makes that commit red.
- What I would do: rename first, see the plain-named test fail, fix, see it pass, and commit test and fix together.
- Cost if wrong: test-first evidence a skeptic cannot accept, or a red commit on the branch.

### 2.5 "Show the first XXX file of a kind going red on a deliberate local fix"

- Where: `references/tests-writing.md:46`.
- What I cannot tell: what "a kind" is (one of the shapes in lines 41-45?), and whether "first" means first in the corpus or first in my change. I cannot tell how this "deliberate local fix" fits "never revert and rebuild your worktree" (`worktrees.md:36`) and "nothing built twice".
- What I would do: skip it unless I wrote a new shape, and say so.
- Cost if wrong: a missing proof that the harness reads my XXX file at all. A wrongly placed XXX test then passes silently forever.

### 2.6 The revision form names things it does not locate

- Where: `references/area-specification.md:16-18`.
- Words: "Each entry names the decision it follows". Also "One paragraph in the front matter." Also "a decision record in the repository, under `explorations/`".
- What I cannot tell:
  - Whether "the decision it follows" means a POSITIONS entry, which would mean no spec change without a curator's decision.
  - Which file the front matter is.
  - What a decision record looks like and which folder it goes in.
- What I would do: read `Specification/appendices/changes.tex` and look for a folder of decision records.
- Cost if wrong: a revision the next reader cannot trace, or a spec change made without the decision it needs.

### 2.7 Blocked on the curator, but told to ask the curator nothing

- Where: `references/area-interpreter.md:14`, `SKILL.md:20`.
- Words: "the session's automatic permission check refuses its `rm -rf` ... and the way through is the curator's". Also "asks the curator nothing".
- What I cannot tell: whether a probe running `mg-run.sh` should stop, run the two checks by hand, or clear its work directories some other way. I also cannot tell how to know whether I am "in auto mode".
- What I would do: run the two checks by hand, each from its own empty cache, and record the refusal as a decision not taken.
- Cost if wrong: a 90-minute model run started by a route the curator would not have chosen, or a probe that stops when it could have finished.

### 2.8 Two things are each called "the standard"

- Where: `SKILL.md:16`, `references/area-library.md:10`, `references/area-specification.md:3, 26`.
- Words: "The specification is the standard". Also "The library's practice is the standard." Also "A rule that refuses something is answered with how the library gets around it."
- What I cannot tell: which one wins when library practice and the text disagree and no decision on record settles it. area-specification line 26 has the XXX test assert the text's answer, while area-library says to design the fix from the library's practice. I also cannot tell whether "a rule that refuses something" is a checker rule, to be changed, or a language rule, to be worked around.
- What I would do: design from the library, assert the text in the XXX test, and record the choice as a decision.
- Cost if wrong: the wrong side fixed (the checker instead of the library, or the reverse), and a change the curator rejects.

### 2.9 Pushing: which branches, and whose commits

- Where: `references/committing.md:23, 27-33`.
- Words: "`git push -u origin <branch>` the first time". Also "No other branch is pushed without permission (the transcript branches excepted)". Also "shows nothing but your own commits". Also the footer's fixed `Claude-Session:` URL.
- What I cannot tell:
  - Whether "no other branch" forbids pushing a worker's own branch (line 27 says to push it).
  - What the transcript branches are.
  - How to tell my own commits from others'. Every agent in the session carries the same footer and the same session URL.
  - What to do when `origin/main..main` shows someone else's commits.
  - Whether the session URL is meant to stay fixed in a later session, or be replaced with the current one.
- What I would do: push my own branch. On `main`, stop and report if anything unrecognised is ahead. Copy the footer as written.
- Cost if wrong: another agent's unreviewed commits pushed with mine, or a footer pointing at the wrong session.

### 2.10 Who is "working beside others"

- Where: `references/area-records.md:53-54`.
- Words: "A fact enters the record in the commit that establishes it". Also "An agent working beside others does not edit `FACTS.md`, ...".
- What I cannot tell: how an agent knows it works beside others. Read together, the two sentences conflict for any such agent: its fact cannot enter in the commit that establishes it.
- What I would do: assume I am beside others, and write the FACTS lines in my report.
- Cost if wrong: a parallel edit of FACTS or the ledger that conflicts with the coordinator's.

### 2.11 Smaller stop-and-search points

- `references/build-and-caches.md:70`, "running the same commands one at a time produced the jars". I cannot tell what the failing run did differently, since the listing is already one command per line. I also cannot tell whether to check `bytecode_cache/` after every library order. I would `ls` it each time. Cost: compiled runs fall back to the bootstrap stubs and fail with `NoSuchMethodError`.
- `references/area-compiler.md:40` says "delete its stale class under ... `nativewrapper_cache/`". That conflicts with `build-and-caches.md:27, 54` ("use the plain `ant compileAll`"; "The caches go only with `ant compileAll` itself") and with `SKILL.md:15`. I would run the plain build. Cost: small, but one of the two rules is wrong.
- `SKILL.md:13`, "Nobody compares the corpus's printed outputs". `gate.md:37` compares the ladder files' stdout with the baseline's `raw/`. I cannot tell the scope of the rule. Cost: a skeptic who dismisses, or wrongly counts, an output difference.
- `SKILL.md:18`, "Never pipe `ant` through `tail`". The reason is missing (lost exit status? buffering? the tool's timeout?). I cannot tell whether `| grep` or `> file` is also wrong. I would redirect to a file in `tmp/`.
- `SKILL.md:39` gives the example span for an interpreter fix as area, build-and-caches, tests-writing and tests-running. It leaves out `committing.md` (the footer that overrides the harness's) and `area-records.md` (the report's form). A reader following it would commit with the harness's footer, which names a model.

## 3. Small points

- `references/area-interpreter.md:13`, "until row 424's F-bounded half lands". The page is read before area-records, so "row" is not yet the ledger. "F-bounded half" is undefined. I cannot tell whether it has landed, so I cannot tell whether a dying `claude_demo.fss` is expected or a regression. I would avoid it as a smoke test.
- `references/build-and-caches.md:25`, `-Dcache0`, `-Dcache1`. I cannot tell which two folders these are. I could still use the line as written.
- `references/build-and-caches.md:18, 33`, `default_repository/caches`. I cannot tell whether that is at the tree's root or under `ProjectFortress/`. The library order runs from `ProjectFortress/`. I would look.
- `references/area-records.md:28, 54` "the handover", and `references/committing.md:9` "`HANDOVER.md`". I cannot tell whether these are one file or two. "ZIP contents" (`committing.md:9`) is undefined.
- `references/area-specification.md:5`, "the type group", "specialization kept", "the later papers". These are undefined, so I cannot tell which papers outweigh the text.
- `references/checker-measurements.md:34`, the classes "BR, V2 and O1". These are undefined codes, but I could still treat their moves as noise.
- `references/area-interpreter.md:10`, "Measure ... at 256 MB". `env.sh` sets 4 GB through `JAVA_FLAGS`. Unsetting it also drops `-Xss64m`, and the page does not say whether that matters.
- `references/area-specification.md:26`, "named among the departures in the passage's Appendix I entry". I cannot tell what to do when the passage has no entry.
- `references/area-library.md:27`, "The compiled path will need a static helper in `nativeHelpers/` for each". I cannot tell whether that is an instruction now or a note for later.
- `references/worktrees.md:32`, "which a fresh clone lacks". I cannot tell what to do about it in a fresh clone.
- `references/area-records.md:55`, "Everything of ours lives under `explorations/`". `SKILL.md:8` also counts `research/` and `.claude/` as ours.
- Order: these are read before they are defined.
  - "the harness" (`SKILL.md:12`), defined in tests-running.
  - "`XXX`" (`tests-running.md:21`), defined in tests-writing.
  - "stale shadow" (`gate.md:11`), defined in `checker-measurements.md:40`.
  - "the record" (`SKILL.md:14`), defined in `area-records.md:3`.
  - Each is readable on a second pass.

## Terms met undefined

- curator: `SKILL.md`
- reserved stop, stop: `SKILL.md`
- brief: `references/committing.md` (used everywhere; meaning guessable)
- base, base commit, base build: `references/worktrees.md` (used first in `tests-writing.md` in the router's example span)
- batch, climb-batch-N: `references/tests-running.md`
- landed, landing, landing tree: `references/tests-running.md`
- rung, ladder, compile ladder: `references/tests-running.md` (the ladder regression is described later in `gate.md`; rung never is)
- whole-corpus driver: `references/gate.md`
- microgpt-phase.md (a file never located): `references/gate.md`
- cache0, cache1: `references/build-and-caches.md`
- api (a Fortress term the skill uses as known): `references/build-and-caches.md`
- auto mode: `references/area-interpreter.md`
- row 424, F-bounded half: `references/area-interpreter.md`
- sayWhat wall: `references/area-compiler.md` (explained only in `tests-writing.md`)
- the type group, specialization kept: `references/area-specification.md`
- decision record, front matter: `references/area-specification.md`
- exploration: `references/area-records.md`
- the coordinator, the coordinator's boot: `references/area-records.md`
- the handover: `references/area-records.md`
- BR, V2, O1: `references/checker-measurements.md`
- Fable (a tier): `references/committing.md`
- transcript branches: `references/committing.md`
- transcript backup: `references/toolchain.md`
- ZIP contents: `references/committing.md`
