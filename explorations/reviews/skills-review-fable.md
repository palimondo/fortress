<!-- A fresh Fable review of the three project skills under .claude/skills/ (fortress-repo, remote-container, coordinator), made with the coordinator's boot context (CLAUDE.md, the protocol, the coordinator README, FACTS whole, POSITIONS whole, INDEX, the handover's first section, the boot note), then every skill file, with read-only checks against the tree. The skills were edited from it; nothing was committed. -->

# Review of the three project skills

Read first, in the boot order: `CLAUDE.md`, `explorations/protocol.md`, `explorations/coordinator/README.md`, `FACTS.md` whole (in 15-line pages), `POSITIONS.md` whole, `INDEX.md`, the first section of `explorations/microgpt-run-c-handover.md`, the boot note (`postmortem-2026-09-19/held-list.md`, line 7). Then every file of the three skills, each `SKILL.md` and every file under `references/`, `sources.md` included. Claims were checked against the tree with `grep`, `sed -n`, `git log`, `git show`, `cat`, `ls`, `df` and the tools' own `--help`; no build, test, Fortress program or `ant` was run; no transcript was read.

## 1. Verdict

- `fortress-repo`: correct in substance and well made. The router is short and lists its parts; the parts give commands and paths where the records give them; the report contract ("What every report holds") is clear and is the one home the coordinator skill points to. Eight small corrections of fact or wording were needed, one of them a rule that read against a position (the opening line of `committing.md`), and its `sources.md` had stale citations (the old `CLAUDE.md`, a session scratchpad file) and two stray bullets. Fixed.
- `remote-container`: correct and complete against FACTS "The container" and `coordinator/remote-container.md`; every figure re-read on the machine today agrees (4 CPUs at 2.80 GHz, 15 GB, `df` Used 28 GB plus Avail 10 GB, the backup log's last line, the manager log's three line kinds). The dependence runs one way, as required. No change made.
- `coordinator`: correct against the protocol, the README and POSITIONS; the five tests of a consequential decision and the three routes stand as confirmed. Two lines needed to be concrete where a number or a line number exists (the FACTS page size, the boot note's line), and two facts the records hold and the skill's job needs were missing (the boot's cost; that a record naming a model on purpose is not stripped). Fixed.

## 2. Changes made, file by file

Every change is in `.claude/skills/`; its source is in that skill's `references/sources.md`, also updated.

### fortress-repo

- `references/committing.md`, opening paragraph. Was: "Commit only when your task says to." Now: a worker commits its own files as it goes, on its own branch, unless its brief says not to commit. Reason: the old line inverted the default the records set, and the same file's "How" section said "as you go", a contradiction inside one part. Source: POSITIONS "Workers commit their own files as they go."; the protocol's hard rule on workers' commits.
- `references/area-records.md`, "The repository's history". Was: "Everything after `a874948ac` is the revival's own work." Now: "The commits after `a874948ac` are the revival's." Reason: FACTS says `main` descends from a graft commit that copied 1,506 files onto `a874948ac`, so "own work" overclaimed; the part points to `lineage.md` for the rest, as before. Source: FACTS "`palimondo/fortress` is a 2018 GitHub fork ..."; POSITIONS "The third-party Java 9 port" (why the part names no more).
- `references/area-records.md`, "FACTS, POSITIONS and the rest". Was: the record is updated in the same commit as the work that establishes the fact or takes the decision. Now: a fact enters in the commit that establishes it; a decision in the next commit after the curator states it. Source: `coordinator/README.md`, "How they are kept".
- `references/area-library.md`, the flat tower. Added `RR32` to the siblings under `Number`. Source: FACTS "The one library's number tower is flat".
- `references/area-interpreter.md`, `import java`. Was: "does not work under walk". Now: wired and unfinished under walk, no test uses it, walk's natives are the `builtinPrimitive` strings. Source: FACTS, "The territory map", the entry opening "`import java` works on the interpreter path through `ForeignComponentWrapper` + `ClosureMaker`".
- `references/area-interpreter.md`, microGPT under walk. Added: in auto mode the automatic permission check refuses `mg-run.sh`'s `rm -rf` of its own work directories, and the way through is the curator's (pointer to the `remote-container` skill). Source: the handover's first section (the paragraph on climb batch 10's landing); `PLAN.md`, the last entry under "Climb batch 10, listed for his review"; `mg-run.sh:16`.
- `references/toolchain.md`. Added that `explorations/experiment/setup.sh` does a fresh container's whole setup. Source: `setup.sh:14-35`.
- `references/worktrees.md`. Added that `.claude/worktrees/` and `.claude/agents/` are kept out of `git status` by the untracked `.git/info/exclude`, which a fresh clone lacks. Source: the file itself; the boot note's paragraph on the container.
- `references/tests-running.md`, "The two suites". The "never pipe `ant` through `tail`" sentence was said three times across the two skills; here it is now a pointer to the `remote-container` skill's long-commands part, which is its home (the `SKILL.md` rule keeps its one-line form).
- `references/sources.md`:
  - Every "`CLAUDE.md` before `9cd56be21`" citation (the text the boot note called stale) now reads "the old `CLAUDE.md`", defined once in the header as `git show 9cd56be21^:CLAUDE.md`, whose facts now live in these parts and nowhere else in the tree; the smoke-test bullet cites `git show 6c9dcd89e^:CLAUDE.md` the same way.
  - The two citations of a session scratchpad file (`old-fortress-script-patch.md`) now cite `explorations/coordinator/pending-script-edit.md`, which holds that text in the tree.
  - The "checker count's time" bullet said `checker-count/run.sh`'s header still says the count may only fall; the header now says a change is reported, not red. The bullet names what still says it: `INDEX.md:143`, the manual `:131` and the manifest comment.
  - The smoke-test bullet said the skill gives `BooleanOps.fss`; the skill gives `mandelbrot_canonical.fss` first (the curator's choice) and `BooleanOps.fss`. Corrected.
  - Two stray bullets after "What to re-check" (the method rule; the repository's history) moved into their sections (`SKILL.md`; `area-records.md`).
  - Sources added for each change above, and two re-check items (the `mg-run.sh` refusal; the `import java` line at PLAN item 35).

### remote-container

- No change. Every part was checked against FACTS "The container", `coordinator/remote-container.md`, the tracked and home `settings.json`, the launcher's hook file, `/tmp/env-manager.log`, the backup log and the machine itself; all agree.

### coordinator

- `references/boot.md`, step 3. Was: "in pages the Read tool can hold". Now: pages of about 15 to 20 lines, the Read tool's page holding 25K tokens and the lines being long. Source: the boot note (about 20 lines); this review read FACTS whole in 15-line pages, the longest about 40 KB.
- `references/boot.md`, "What the boot reads". Added: the boot costs about 250K tokens of context, `FACTS.md` about a third of it. Source: FACTS "A boot after a compaction costs about 285K tokens of context ..." (its text, which gives 250K and a third).
- `references/roles-and-records.md`, the boot note. Was: "at the top of" the held list. Now: line 7. Source: the README's first paragraph.
- `references/roles-and-records.md`, "How the records are kept". Added: the rule against committing a model identifier governs what the agents themselves write and push; a record that names a model on purpose (a transcript, an index) is not stripped of it. Reason: the coordinator edits records and indices, and the position settles what it may not do to them. Source: POSITIONS "The record is public and names models on purpose."
- `references/sources.md`: sources added for the four changes.

## 3. Decisions taken, apart from the changes

- The old `CLAUDE.md` citations: made resolvable (`git show 9cd56be21^:CLAUDE.md`) rather than re-sourced one by one. Alternatives: hunt a primary source for each (most bullets already cite one beside it, `repo-internals.md`, POSITIONS, `env.sh`); or drop the citations. Evidence: the boot note calls them stale because the file no longer holds the text; git does, and the header now says so once.
- `committing.md`'s opening: the worker's default is to commit as it goes; a brief's "do not commit" is the exception. Alternative: keep "only when your task says to" (safe for a review worker, wrong for a batch worker); or say nothing about when. Evidence: POSITIONS "Workers commit their own files as they go." and the protocol's hard rule say "as it goes".
- The history sentence: "the commits after `a874948ac` are the revival's", which neither overclaims the content nor names the port. Alternatives: leave the old sentence; name the graft's origin. Evidence: FACTS's lineage entry; POSITIONS "The third-party Java 9 port" forbids the mention.
- The `mg-run.sh` refusal went into `area-interpreter.md` as one sentence with a pointer, not into the `remote-container` skill's permission part (which stays general). Alternative: leave it to the general rule. Evidence: a worker running the microGPT checks meets exactly this refusal, and the handover records it as the present state.
- The page size for FACTS: "about 15 to 20 lines" rather than the boot note's "about 20". Evidence: the longest 15-line page read today was about 40 KB; 20 lines near the long entries would approach the tool's page.
- The coordinator skill's description was left long. It lists its triggers in full, and trimming it risks the skill not loading when it should; nothing in it is wrong.
- `area-specification.md`'s "an edit under `Specification/` needs no gate run of its own" was left as written. It follows the batch manual's rule since 2026-10-02 ("A repair of tests and records only": a path no gate stage reads leaves the first gate's tables standing), which rests on POSITIONS "Nothing is built or run twice on the same code." See section 5 for the wording tension in POSITIONS it sits beside.

## 4. Stops met

- None that would reverse or bend a position. The five tests of a consequential decision and the three routes (`coordinator/references/decisions.md`) were read against POSITIONS "Which decisions taken inside the work reach Pavol, and how." and stand as confirmed; untouched.
- One fix not made because a position forbids it: `area-records.md`'s history paragraph could say where the graft commit's 1,506 files came from, which would make it exact; POSITIONS "The third-party Java 9 port" says no mention anywhere. The part points to `lineage.md` instead.
- The commit footer in `committing.md` names no model, as the protocol's hard rule requires, although the harness's own attribution reminder suggests a footer naming one. Left as the protocol has it; already noted in that skill's `sources.md`.

## 5. Fixes that belong outside the skills

- `explorations/protocol.md:21-22`: "Standing approval covers only the approved ladder in `modernization-plan.md` and the push order below" is stale; the standing goes in force are POSITIONS's (the phase-3 standing go, the judge's second ruling, the top-tier review of a batch record). Suggested: "Standing approval covers only what POSITIONS names."
- `explorations/protocol.md:172-174`: the pointers to `coordinator/remote-container.md` and to the batch manual should name the `remote-container` skill for the container (the note stays as the long form and the incidents' record) and may name the `coordinator` skill for conduct.
- `explorations/coordinator/README.md:5-9`: the boot order does not name the `coordinator` skill, whose description says to load it at session start and after every compaction; `CLAUDE.md` does. One clause at the head of the order ("load the `coordinator` skill, then ...") would make the README self-contained, since the compaction hook sends the session to the README.
- `explorations/coordinator/INDEX.md:143` (the line on `tools/checker-count/`): "and the count may only fall" is stale; the count is reported and never red on its own.
- `explorations/coordinator/climb-batch-workflow.md:131`: says `run.sh`'s header still says the count may only fall; the header now says a change is reported, not red. Only the manifest comment on `expectedCheckerCount` is left.
- The boot note (`held-list.md`, line 7): "The session's process last started at 10:23 UTC on 10-04, so the platform's cap falls at about 23:21 UTC." `/tmp/env-manager.log` shows a `SIGTERM` at 18:28:25 UTC on 10-04 after a run of 721 s (not the cap's length) and "Set session mode ... resume" at 18:29:12 UTC, so the clock reset then and the cap now falls at about 07:27 UTC on 10-05. The note's times are stale; the coordinator should re-read the log before writing them.
- POSITIONS "A tests-only repair does not rerun the gate." names "specification" among the files whose change is not a tests-only repair, while the batch manual (since 2026-10-02, by POSITIONS "Nothing is built or run twice on the same code.") leaves a repair that touches only the specification ungated, and the skills follow the manual. No wording is proposed here; it is the curator's position to word, if the two sentences are to read alike.
- `explorations/coordinator/map/README.md:128` and `map/modules-and-phases.md:217`: `global.map` restore lines, stale since the file became untracked; already listed in `pending-script-edit.md`.

## 6. Checked and found right

- Paths: all 31 scripts, tools, baselines, notes and test fixtures the skills name exist at the paths given.
- `env.sh`: sets `JAVA_HOME` (JDK 25), `FORTRESS_HOME` from its own location, `FORTRESS_THREADS=1`, `JAVA_FLAGS="-Xmx4g -Xss64m"`, unsets `JAVA_TOOL_OPTIONS`, sweeps `/tmp/fortress*rats`, as `build-and-caches.md` says.
- `build.xml`: `cache0`/`cache1` at `:42`/`:46`, deleted by `cleanCache` (`:356-359`); `junitMem` 768m (`:131`), used by the `fastTrack` and `systemShard` forks; `testOnly` with `-DtestPattern` (`:777-799`).
- `PhaseOrder.compilerPhaseOrder` (`:137-147`) is the list `area-compiler.md` gives, `INTEGERLITERALFOLDING` before `TYPECHECK`, `ENVGEN` absent.
- `FileTests.java:382-386`: an interpreter test fails on `fail` or `FAIL` in stdout or stderr or a non-zero exit; `:934-935`: the skipped names (`Syntax.fss`, `DynamicSemantics.fss`, `Satisfiability.fss`, `GenomeUtil`).
- The `STAGE_BLIND` list in the batch script (`:1093-1094`) is the blind-path list of `checker-measurements.md`.
- `fortress.source.path` (`default_repository/configuration:44`): `.`, `LibraryBuiltin`, `Library`, `test_library`, in that order.
- The `\revision` macro at `Specification/fortress/fortress.tex:87-92`; Appendix I's entry layout at `changes.tex:64-70`.
- `harness-one.sh` copies every argument into its scratch `tests/` (so an `X.test` beside `X.fss` works), runs `SystemJUTest` at 768 MB with a private cache; `junit.sh` honours `ONE_JVM=1` and sources its own tree's `env.sh`; `mg-run.sh` takes `<work-dir> <label> [threads]` with a 5,400 s timeout; `distance/run.sh` takes a third `setting` argument and `compare.sh`'s verdict words are as listed; `facts-extract.sh --help` gives the query forms `area-records.md` lists.
- `old-fortress.sh` and `seed-worktree.sh` headers match `worktrees.md` (exit 2 on an unbuilt or unclean base; a folder inside the base refused; `SEED_FORCE=1`).
- The hooks: the tracked `.claude/settings.json` and `~/.claude/settings.json` both hold the `Stop` backup hook and the `SessionStart` hook with matcher `compact`; `/root/.claude/launcher-settings.json` and `~/.claude/stop-hook-git-check.sh` exist and were rewritten at today's 18:29 UTC start, as the skill says happens at every start.
- The machine today: `nproc` 4, Xeon at 2.80 GHz, `free -g` 15, `df -B1 /` Size 252 GB, Used 28 GB, Avail 10 GB (the allowance read as Used plus Avail, about 37 GB); the backup log's last line has the fields `container-loss.md` names (`copier_rc=0 commit=<hash> ahead=1 push=ok`).
- `.gitignore` ignores `/tmp/` and every cache directory; `.git/info/exclude` holds `.claude/worktrees/` and `.claude/agents/`.
- No person's name, no model identifier, no table, no date and no commit hash appears in any task part of the three skills (the one hash, `a874948ac`, is the tree's own tip, a fact and not provenance); the only occurrences of names and dates are in the `sources.md` files, where provenance lives.
- The dependence runs one way: `fortress-repo` and `remote-container` never name the `coordinator` skill; the coordinator skill points to the other two for the report contract, the records, committing, the cache and stops.
- The coordinator skill's boot order matches the README's, `check-index.sh` included; its rules match the protocol's hard rules and principles, and its "Failures to watch for" is the protocol's "What keeps going wrong".
- Against POSITIONS: "Test first, the test kept.", "The suite's verdict is the check.", "Nothing is built or run twice on the same code.", "Which tier runs what.", "The Fable rule.", "The judge's rulings.", "Reversible stops do not hold a batch.", "A blocking second review does not hold a green batch.", "A tests-only repair does not rerun the gate.", "What a batch commits.", "Check-ins and stops.", "Estimates in the project's units.", "The register.", "Asks and decisions.", "Format." and "Which decisions taken inside the work reach Pavol, and how." are each stated once in one skill as the position stands.
