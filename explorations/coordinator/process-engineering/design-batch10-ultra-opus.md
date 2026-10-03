# Batch 10 under ultracode: a workflow design (Opus designer)

The step is the one `blind-brief/content.md` describes: four independent pieces, W (walk's
load-time checks and the instance rule), C (the compiled checker's defects and its four
crashes on the library), G (generators, `Maybe`, reductions) and N (numbers, orderings,
`List`, the natives, the drop of three written bounds). The binding rules are the five of
`blind-brief/requirements.md`. This design was written from those two files, the brief's
`machine.md`, the project skill `.claude/skills/fortress-repo/` (all parts but
`references/sources.md`), the ledger, `explorations/repo-internals.md`, the source tree and
the specification. It names models by tier only. It has not been run.

## 1. The design in plain words

The step runs as three workflows in sequence, with the coordinating session reading each
one's result before it starts the next: **plan**, **build**, **integrate**. Before the first,
the coordinator builds the base once, in a worktree of its own, and every later worktree is a
3-second seed of that build; nobody else builds the base.

**Plan** writes no file of the tree. Four readers check the brief against the base commit
(every file, line, declaration, test name, ledger row and number it cites) and stop the step
if the brief does not describe that base. The work is then cut into 22 units: W into two
tasks (the load checks of rows 544 and 534; the instance rule of row 588 with the pin and
the specification), C into eight (row 563 with 574; 593; 604 with its specification entry;
605; 597's checker half; three crash traces), G into five clusters and N into seven, each
a section of the library with its distance sites. One planner per unit writes the tests,
the fix, the way not taken and the specification text; two or three critics, each with its
own lens, try to break that plan; one judge per piece settles every objection and writes
the piece's final plan; a last reader looks for interactions between the four plans.

**Build** implements each unit test first, in its own seeded worktree and branch for W and
C, and in one worktree per library piece for G and N, where the clusters follow each other.
Every test is committed alone and seen failing (or, for a pin, passing) on the code before
the fix, through the harness, before the fix is written. W's and C's tasks are then merged
into one branch per piece and built once. Each piece's final code is measured once in the
background (the suites it reaches, and for C, G and N the checker count and the distance),
and verified by independent lenses that never saw the implementer's context: a refuter of
the semantics (who writes probe programs and runs them against the piece's build and the
base's build side by side, without building anything), a reader of reach and regressions,
a reader of the measurement site by site, an auditor of the specification's revision form,
an auditor of the binding rules and of ownership. Every serious finding faces three
skeptics; what two of them cannot refute goes to a fixer, test first, and the touched lenses
run again, until a round finds nothing or three rounds have passed.

**Integrate** merges the four piece branches into one integration branch, folds the
pieces' ledger, FACTS and plan lines into the records, and runs the gate once on that merged
tree, while a reviewer looks for what the pieces break in each other. Two readers check the
gate against the last landed summary and reconcile the merged distance with the 340 sites
of the base, site by site. A judge of the strongest tier walks every "what done means" item
of the brief and every binding rule, asks for evidence for each, and says GO or NO-GO. On
GO, the report and the measurement tables are committed (they change only `explorations/`,
so the gate stands), a last audit reads the whole commit range, and the coordinator lands
the branch on `main` on Pavol's go.

Two mechanisms run through everything. **A run registry** keyed by the content of the code
(the git tree hashes of `ProjectFortress/src`, `ProjectFortress/LibraryBuiltin`, `Library`,
`build.xml` and `bin`) records every build and run; no agent builds or runs without asking
it first, so a resumed agent, a verifier or a skeptic reuses a result instead of redoing it
(rule 3). **Idempotent agents**: every agent starts by reading its worktree, its branch, its
progress note and the registry, and continues at the first step not done, so a process stop
costs only the unfinished agents' thinking, never a commit, a build or a finished run.

Tiers: Fable where a subtle wrong answer would pass every test (the walk and checker
implementers of the hard tasks, the piece judges, the semantic refuters, the cross-piece
reviewer and the final judge); Opus for planners, critics, library implementers, mergers,
readers and the report; Sonnet for audits, lint and the agents that start and watch long
runs.

## 2. The scripts

### 2.1 Places, names and the shared mechanisms

- **Root of the step**: `/home/user/fortress-b10/`, outside the main tree.
  - `base/`: the base build (`git worktree add --detach`, then `ant compileAll`, the
    `global.map` restore, the library order, one walk run of
    `ProjectFortress/tests/BooleanOps.fss`). Built by the coordinator once; afterwards only
    `old-fortress.sh` runs it.
  - `wt/<task>/`: a seeded worktree per W and C task (`seed-worktree.sh base wt/<task>
    b10/<task>`); `wt/W`, `wt/C`: the piece merges; `wt/G`, `wt/N`: the library pieces;
    `wt/I`: the integration tree, made with plain `git worktree add` and built only by the
    gate.
  - `probe/<piece>-<lens>/`: verifiers' and skeptics' probe programs and private caches,
    outside every build, as `old-fortress.sh` requires.
  - `runs/registry.tsv`, `runs/locks/heavy.0`, `runs/locks/heavy.1`, `shell.sh`,
    `args/` (each workflow's arguments, byte for byte, and its run id).
- **Branches**: `b10/<task>` (WL, WI, CA, CI, CV, CF, CO, CX1, CX2, CX3), `b10/W`, `b10/C`,
  `b10/G`, `b10/N`, `b10/integration`; each pushed to origin as it moves.
- **Reports**: one per piece, `explorations/compile-ladder/climb-batch-10/{W,C,G,N}.md`,
  written by the piece's agents on the piece's branch (task sections merged by the piece
  merger), each also the decision record that the S1 form's fourth part asks for; the step
  report `climb-batch-10/REPORT.md` and the measurement record `climb-batch-10/gate/`
  (summary, checker-count table, distance table) with the landed per-site list
  `explorations/compile-ladder/gate/distance-sites.tsv` overwritten (decision D2, section 4).
- **`shell.sh`** (the coordinator's scratch, never committed), sourced at the start of every
  Bash call with the agent's tree as argument: the exports of `env.sh` (`JAVA_HOME` for JDK
  25, `PATH`, `FORTRESS_HOME=<tree>`, `FORTRESS_THREADS=1`, `unset JAVA_TOOL_OPTIONS`),
  plus `TMPDIR=<tree>/tmp` and `JAVA_FLAGS="-Xmx1g -Xss64m -Djava.io.tmpdir=<tree>/tmp"`
  for probes (tests keep their harness's own heap), and without `env.sh`'s sweep of
  `/tmp/fortress*rats`, which would delete another agent's live parser directories. It
  defines the skill's `run_bg` and `wait_for` with the wait capped at 240 s, and:
  - `codekey <tree>`: the hash of `git rev-parse HEAD:ProjectFortress/src
    HEAD:ProjectFortress/LibraryBuiltin HEAD:Library HEAD:build.xml HEAD:bin`, refused when
    any of those paths is dirty (commit before running).
  - `once <tree> <kind> <log> "<command>"`: the run registry. The key is the code key plus,
    for a suite, the tree hash of the corpus it reads, for a harness run the hash of the
    files named, for a probe the hash of the program. A finished row (an `EXIT=` line, pass
    or fail) is reused and its log path printed; a row whose command is still alive is
    waited for; a row cut off (no `EXIT=`, no process) is no result, and the run starts. A
    row records tree, kind, key, log, start and end read from the clock, and exit.
  - `heavy "<command>"`: takes one of the two heavy-job locks (`flock`), for `ant
    compileAll`, a whole suite, a testFast track, the library order, the ladder and the
    distance; probes, single harness runs and the checker count are light.
- **The preamble** (`PRE`), the same text at the head of every prompt: the agent's tree,
  branch and base commit; load `.claude/skills/fortress-repo/SKILL.md` and the parts listed
  for it, never `references/sources.md`; source `shell.sh` in every Bash call; no call
  waits longer than about 240 s; long commands only through `run_bg`, `once` and `heavy`,
  polled; never pipe `ant` through `tail`; stop only processes under its own tree; scratch
  under `<tree>/tmp/`; commit only its own paths, in one command, with the protocol's
  footer and no model identifier; never edit FACTS, POSITIONS, PLAN, INDEX, the ledger,
  the handover, `CLAUDE.md`, the protocol, `explorations/coordinator/tools/` or `.claude/`,
  but write their lines in the report; read the brief's sections 1 and 3, its piece's
  section, the decisions that section names in section 4, and `requirements.md`; begin by
  recovering (read `<tree>/tmp/progress.md`, `git log`, `git status`, the registry rows of
  its tree) and continue at the first step not done, updating `progress.md` after each
  step; evidence is a command with two to five quoted lines.
- **`withRecovery`**: an agent that returns null is retried once with the same prompt under
  a recovery header ("an earlier attempt ended without a result; its commits, worktree,
  progress note and registry rows are its leftovers; continue from them"); a second null is
  returned as `{failed: true}` and logged, never dropped silently.

### 2.2 The agents

The skill parts are named without their `references/` prefix. "Base" means the commit the
brief describes, read with `git show <base>:<path>` or in `base/` (read only).

**Workflow 1, `b10-plan`** (no file of the tree is written)

| Agent | Tier, effort | Skill parts | Reads | Prompt in summary | Output |
|---|---|---|---|---|---|
| `audit-{W,C,G,N}` (4) | Sonnet, medium | `area-records` | the brief's sections 1, 3, 5 and the piece; at base: every cited file and line, the ledger rows, the tests named (promoted, owed, must keep), the landed per-site list and distance table | Check every claim the piece's section makes about the base: each file:line holds the declaration or text named, each test file exists under the name given, each row has the status implied, each count matches. Blocking: a named file, declaration, test or row missing. Drift: a line moved (give the new one). | `{piece, mismatches:[{claim, actual, blocking}], lineMap}` |
| `propose-<unit>` (22) | Opus, high | the area part (`area-interpreter`, `area-compiler` or `area-library`), `tests-writing`, `area-records`; `area-specification` for WI, CV, CO; `checker-measurements` for C, G, N | the unit's part of its piece's section and the decisions it names; the code, library and specification at base; the precedents the brief names; for G and N the unit's rows of the landed per-site list | For each defect or site: the cause; the precedent (the checker's existing code, or the library's own device elsewhere, with file:line); the tests as minimal programs with their keys, their verdict on base and after and the harness that shows it, cited by file and section; the fix's place and shape; the specification edits in the S1 form for the unit that owns them; the way not taken; the risks (walk values, other library types, String's symbolic families, the ladder files, the distance tool's patched files); the ledger lines with placeholders `NEW-<unit>-<k>`; for each G or N site a verdict: repair, leave with a row (with the passage that makes it the checker's fault), or walk-observable (a failing walk test exists). | `PLAN` |
| `critique-<unit>-<lens>` (54) | Opus, high | as the unit's planner | the plan, the brief's piece section and decisions, the sources the plan cites | W and C units, three lenses: **standard** (does the planned behaviour match the passages and the decisions "Standard", "Late word", "Instance rule", "Conversions", "Answer 9", "Implicit bound Any"?), **reach** (what else the change touches: every library type and team test walk loads, the checker's other callers, `NodeUtil`'s callers on both paths, the 85 ladder programs), **tests** (does each test fail on base for the stated reason and pass after; is its `XXX` shape one the harness can hold; does it pin a varying output). G and N units, two lenses: **practice** (is each repair the library's own device; no cast routed round the checker, no `Any` narrowed to `Object`, no team declaration removed, no walk value changed, no declaration of the other piece or of nobody's), **clears** (read the Scala checker: will the repair clear the error, what will it unmask, is a "leave with a row" verdict right). Object whenever unsure; each objection with evidence. | `OBJECTIONS` |
| `judge-{W,C,G,N}` (4) | Fable, xhigh | the planners' parts, `area-specification` | all the piece's plans and objections; the brief's piece section and section 4 | Accept or reject every objection with a reason; write the piece's final plan (ordered tasks, each with tests, fix, specification edits, ledger lines, the way not taken); name questions for Pavol only where no decision on record settles them, each with the reading the build will follow if he does not answer; never answer the lone-parameter question. | `PIECE_PLAN` |
| `cross` (1) | Opus, xhigh | `area-library`, `area-records` | the four piece plans; the brief's section 3 | Find interactions: a declaration G or N adds or changes that W's two new refusals would refuse (two overlapping functional methods without their meet; an overloaded single parameter written `extends Any`); N's `MatchFailure` against every `catch` and `throws` of it or of `CheckedException`; C's varargs type reaching walk through `NodeUtil`; hunks of G and N that would touch adjacent lines (the numeric primitives against the generators of generators in both files); the `changes.tex` entries of W and C; ledger numbering. | `CROSS`: constraints per piece, the merge order, predicted conflicts |

**Workflow 2, `b10-build`**

| Agent | Tier, effort | Skill parts | Reads | Prompt in summary | Output |
|---|---|---|---|---|---|
| `impl-WL`, `impl-WI` | Fable, high | `build-and-caches`, `worktrees`, `tests-writing`, `tests-running`, `area-interpreter`, `machine`, `agents-and-recovery`, `committing`; `area-specification` for WI | its judged task plan and the cross constraints | Seed `wt/<task>`; write the plan's tests; commit them alone, flagged as an original-tree edit; push; run them through `harness-one.sh` on the seeded (base) build and quote the failing (or, for the pin and the guard, passing) lines; then the fix; `ant compileAll` (the keep-caches form is allowed for an edit only under `evaluator/`), the `global.map` restore; the tests again, passing; the task's must-keep tests in one harness call; WI's specification edits in the S1 form and the note for row 425; its report section (the sets walk now refuses, row 588's instance as built, the revised passages, every sentence made false, the ledger lines); commit; push. No whole suite. | `TASK_RESULT` |
| `impl-CI`, `impl-CV`, `impl-CO` | Fable, high | `build-and-caches`, `worktrees`, `tests-writing`, `tests-running`, `area-compiler`, `checker-measurements`, `machine`, `agents-and-recovery`, `committing`; `area-specification` for CV and CO | as above | The same order, with `ant compileAll`, the restore and the library order before compiled runs, and the tests through `junit.sh` in one JVM per corpus. An edit that must touch `StaticChecker.java` or a file the distance patches stops and returns `needsToolUpdate`, since the tools are the coordinator's. CV's and CO's specification edits in the S1 form. | `TASK_RESULT` |
| `impl-CA`, `impl-CF` | Opus, high | as for CI | as above | As for CI (row 563 with the note on row 561 and the message of row 574; row 605). | `TASK_RESULT` |
| `impl-CX1`, `impl-CX2`, `impl-CX3` | Opus, high | as for CI | the crash's declaration and its `#crash` row in the landed distance table | Reproduce the crash with a minimal compiled program; trace it to its cause; where the text makes the program valid, an `XXX` test keyed on the crash's output; repair only where the trace finds a few lines in the checker and the text says what it should report (test first as above); otherwise the row alone with the trace. | `TASK_RESULT` |
| `impl-G1`..`impl-G5`, `impl-N1`..`impl-N7`, in turn per piece | Opus, high | `area-library`, `build-and-caches`, `worktrees`, `tests-writing`, `tests-running`, `checker-measurements`, `machine`, `agents-and-recovery`, `committing` | its judged cluster plan; the cross constraints | In `wt/G` or `wt/N` (the first cluster seeds it): write the cluster's guard test by topic, calling each declaration it will repair with today's value asserted; see it pass on the code before the cluster's edit (on base through `old-fortress.sh` and the base's harness); for a walk-observable site, a failing walk test first (N7: the promotions of rows 590 and 602, seen failing as plain tests, committed in their own commit just before the repair); commit; apply the repairs in the library's own spelling; the tests again; the cluster's report section with each repair, its way not taken and the sites left with their rows; commit; push. No distance run. | `TASK_RESULT` |
| `merge-W`, `merge-C` | Opus, high | `worktrees`, `build-and-caches`, `committing`, `tests-running` | the task results | Seed `wt/<piece>`; merge the task branches with `--no-ff` in the plan's order; resolve a conflict by keeping both tasks' intent (record each); no other edit; one build (C also the library order); the union of the tasks' new tests in one harness call per corpus (a new code state); assemble the piece report from the task sections; commit; push. | `MERGED` |
| `measure-<piece>-r<k>` | Sonnet, low | `machine`, `tests-running`, `checker-measurements`, `gate` | the piece's head | Through `once` and `heavy`, start in the background on the piece's tree whatever its final code has not had: W `ant testSystem`; C `ant testFast`, `ant testSystem` when the plan's reach names walk (`NodeUtil` serves both paths), its ladder subset, the checker count, the distance; G and N `ant testSystem`, the checker count, the distance. Suites in one tree run in sequence. A change of tests, prose or records alone starts nothing and names the tests to run through the harness. Return at once. | `RUNS_STARTED` |
| `verify-<piece>-semantics` (W, C) | Fable, xhigh | the area part, `worktrees`, `tests-writing` | the piece diff base..head, the brief's piece section, the passages cited | Refute the claim that the piece does what the text says and nothing else: write probe programs for every case the brief lists (a type with the meet declared; one covered by two declarations below both; no `extends` beside a written `Any`; a parameter bounded from above through a function argument; varargs with none, one, five and six arguments and the parameter used as a sequence; a field beside an inherited getter; an object expression against a closed trait) and the cases its own reading adds; run each against the piece's build and the base's build with `old-fortress.sh` and private caches under `probe/` (registered); report each divergence from the text. | `FINDINGS` |
| `verify-<piece>-practice` (G, N) | Opus, xhigh | `area-library`, `tests-writing` | the piece diff, the plans, the library around each hunk | Refute each repair as the library's own device; look for a cast, a narrowed `Any`, a removed team declaration, a changed walk value, an edit outside the piece's declarations, a new overloading set W would refuse, a written `extends Any` on an overloaded single parameter. | `FINDINGS` |
| `verify-<piece>-reach` (all) | Opus, high | the area part, `tests-running`, `gate` | the diff, the finished suite logs (it waits for them), the must-keep lists | Name every path the change reaches and the test that guards it; read the suite verdicts and counts; check every must-keep test kept its verdict, every promoted test passes, every expected failure the brief names is still one; for C, the ladder subset against the baseline (an UP named in advance is progress; DOWN, MISSING, STDOUT red). | `FINDINGS` |
| `verify-<piece>-measure` (C, G, N) | Opus, high | `checker-measurements` | the piece's distance per-site list (it waits for it), the landed base list, the diff | Map every line through the diff by declaration; for each site the piece owns: cleared, left with a row, or still there; every new site tied to an edit or to an unmasking; the totals by kind and by class read through the per-site list (row 577's caution); the checker count's rows. | `FINDINGS` with the table |
| `verify-<piece>-spec` (W, C) | Sonnet, medium | `area-specification` | the diff under `Specification/` | Each changed passage has a `\revision` callout whose label resolves to a `\seclabel` of a `changes.tex` entry; each entry has the reason, the original sentences with their path and line in `Specification-1.0-frozen/` (which exist), route C; the original text is kept; no `\note`; `Specification-1.0-frozen/` untouched; the passages the brief lists are all revised and none other. | `FINDINGS` |
| `verify-<piece>-guard` (G, N) | Sonnet, medium | `tests-writing` | the diff, the guard tests, the registry | Every declaration the diff changes is called in a guard test with today's value asserted, and the registry shows that test passing on the code before the edit and after. | `FINDINGS` |
| `verify-<piece>-process` (all) | Sonnet, medium | `committing`, `tests-writing` | `git log` and diff base..head, the registry | Test commits precede their fixes and stand alone; each failing run ended before the fix's first build (registry clock); the original-tree flag; the footer; no model identifier; no scratch, log or capture; no team test line changed; no model line; nothing in the compiler's prelude; the piece's paths and declarations only (G and N by declaration, each hunk mapped to its enclosing declaration); no (key, kind) run twice. | `FINDINGS` |
| `refute-<finding>-<k>` (3 per serious finding) | Opus, high | the lens's parts | the finding, its evidence, the diff | Try to show the finding wrong; refute only with evidence (a quoted passage, a registered run, a probe); reuse a registered probe rather than run it again. | `VERDICT` |
| `fix-<piece>-r<k>` | the piece's implementer tier (W, C Fable; G, N Opus), high | as the implementers | the confirmed findings | For a behaviour defect, a failing test first (committed alone, seen failing on the current build), then the fix, the build, the test passing; for a defect of form, the correction; update the report; commit; push; say which domains changed (code, tests, specification, report). | `FIXED` |

**Workflow 3, `b10-integrate`**

| Agent | Tier, effort | Skill parts | Reads | Prompt in summary | Output |
|---|---|---|---|---|---|
| `merge-all` | Opus, high | `worktrees`, `committing`, `area-records` | the piece results, the cross plan, the base's ledger, FACTS and PLAN | `git worktree add` `wt/I` on `b10/integration` at base (not built); merge `b10/W`, `b10/C`, `b10/N`, `b10/G` with `--no-ff` in that order; resolve conflicts by the brief's ownership (section 3) and record each; then one records commit: ledger row numbers allocated from the base's last row, placeholders replaced in the reports, rows closed (544, 534, 588, 563, 593, 604, 605, 574, 590, 602; 560's first part), notes (425, 561, 577, 597, 488 if its site moved), new rows (the lone-parameter question, one per crash, the G and N sites left), the FACTS entry on the written `Object` bound rewritten, PLAN item 20 built; push. | `MERGED` |
| `gate-build`, `gate-testFast`, `gate-testSystem`, `gate-tail`, `gate-distance` (in turn) | Sonnet, medium/low | `gate`, `build-and-caches`, `machine`, `tests-running`, `checker-measurements`, `worktrees` | `wt/I` | The gate as `gate.md` gives it, on the merged tree, every step through `once` and `heavy`: `df`, `TEST-RESULTS` cleared, `ant compileAll`, the restore, the distance started in the background, the library order one command at a time with its jars checked; `ant testFast`; `ant testSystem`; the atomic runs, the ladder regression with the eighteen microGPT phases, the checker count; then the distance's end, `errors.py` and `compare.sh` against the last landed table. Each returns its verdict lines with commands. | `GATE_STEP` |
| `cross-review` | Fable, xhigh | `area-interpreter`, `area-compiler`, `area-library`, `area-specification`, `worktrees` | the merged diff, the four piece reports | Refute that the four pieces compose: walk's new refusals over every declaration G and N changed or added and over `String`'s symbolic families; `MatchFailure` unchecked against every catch; C's varargs type under walk; W's corrected sentence on the checker's half of the reductions callout against C's change; the `changes.tex` entries against each other. Probes against the merged build only after `gate-build` has registered it, through `old-fortress.sh`. | `FINDINGS` |
| `spec-lint`, `process-merged` | Sonnet, medium | `area-specification`; `committing`, `tests-writing` | the merged diff | The spec lens and the process lens of workflow 2, over the whole range base..integration, including the merge resolutions and the records commit. | `FINDINGS` |
| `gate-read` | Opus, high | `gate`, `tests-running` | the gate's outputs, the newest landed summary, the piece results | Red or green by `gate.md`; every change of a suite's count tied to a named test file (the shards compared by their sum); every ladder change named in advance or red. | `GATE_READ` |
| `distance-reconcile` | Opus, xhigh | `checker-measurements` | the base, C, G, N and merged per-site lists, the merged diff | For each of the 340 base sites: cleared and by which piece, left and under which row, or still there unexplained; every new merged site tied to an edit or an unmasking; the setup variance of two to four errors (classes BR, V2, O1) named as such; the outcome against the brief's 148 by reading. | `RECON` |
| `judge` | Fable, max | `gate`, `tests-writing`, `area-specification`, `area-records` | the brief whole, `requirements.md`, everything above | For each "what done means" item of the four pieces, each binding rule and each line of the step's aim: the evidence (commit, test, verdict line, table row) or the gap; then what is missing (a lens not run, a claim unverified, a source unread, an unsettled finding). GO only with no gap. | `VERDICT_ALL` |
| `report` | Opus, high | `area-records`, `committing`, `area-specification` | the piece reports, the gate read, the reconciliation, the verdict | The step report: per piece the repairs as built with the way not taken, the sites left with their rows, the passages revised, the distance by class through the per-site list, the gate's verdict lines with their commands; the measurement record (D2); commit on `b10/integration` (paths under `explorations/` only, so the gate stands); push. | `REPORTED` |
| `process-final` | Sonnet, medium | `committing`, `tests-writing` | `requirements.md`, the range base..integration, the registry | The process lens over the final range, plus rule 4 path by path and rule 3 over the whole registry. | `FINDINGS` |

### 2.3 The script skeletons

The three scripts share a header (pasted into each; a workflow script has no imports). The
prompt builders return `PRE(tree)` followed by the agent's text as summarised in 2.2.

```js
// ---- shared header
const T = { F: 'fable', O: 'opus', S: 'sonnet' }          // tier aliases
const ROOT = '/home/user/fortress-b10'
const call = (label, tier, effort, prompt, schema, ph) =>
  agent(prompt, { label, phase: ph, model: tier, effort, schema })
async function withRecovery(label, tier, effort, prompt, schema, ph) {
  const r = await call(label, tier, effort, prompt, schema, ph)
  if (r) return r
  log(`${label}: no result; one attempt from its leftovers`)
  const r2 = await call(`${label}-recover`, tier, effort, RECOVER + prompt, schema, ph)
  if (!r2) log(`${label}: no result twice; left to the coordinator`)
  return r2 || { label, failed: true }
}
const key = f => `${f.where.file}|${f.where.declaration}|${f.claim.slice(0, 80)}`
const dedupe = fs => [...new Map(fs.map(f => [key(f), f])).values()]
// RECOVER, the prompt builders (auditPrompt ... processPrompt) and the schemas are the texts of 2.2
```

```js
// ---- workflow 1
export const meta = {
  name: 'b10-plan',
  description: 'Batch 10, plan: check the brief against the base, plan each unit, critique by lens, judge per piece, cross-check',
  phases: [
    { title: 'Audit', detail: 'one reader per piece' },
    { title: 'Propose', detail: 'one planner per unit' },
    { title: 'Critique', detail: 'two or three lenses per unit' },
    { title: 'Judge', detail: 'one judge per piece', model: 'fable' },
    { title: 'Cross', detail: 'interactions between the plans' },
  ],
}
// args: { base: '<full commit hash>', units: [22 unit descriptors: piece, id, scope, sites, files] }
const A = args
phase('Audit')
const audits = await parallel(['W', 'C', 'G', 'N'].map(p => () =>
  withRecovery(`audit-${p}`, T.S, 'medium', auditPrompt(A.base, p), AUDIT, 'Audit')))
if (audits.some(a => a.failed || a.mismatches.some(m => m.blocking)))
  return { stop: 'the brief does not describe this base', audits }       // barrier: early exit
const lineMap = Object.fromEntries(audits.map(a => [a.piece, a.lineMap]))
const LENSES = { code: ['standard', 'reach', 'tests'], lib: ['practice', 'clears'] }
const plans = await pipeline(['C', 'N', 'G', 'W'],
  p => parallel(A.units.filter(u => u.piece === p).map(u => async () => {
    const plan = await withRecovery(`propose-${u.id}`, T.O, 'high', proposePrompt(A.base, u, lineMap[p]), PLAN, 'Propose')
    if (plan.failed) return { unit: u.id, failed: true }
    const lenses = LENSES[p === 'G' || p === 'N' ? 'lib' : 'code']
    const objections = await parallel(lenses.map(l => () =>
      withRecovery(`critique-${u.id}-${l}`, T.O, 'high', critiquePrompt(A.base, u, plan, l), OBJECTIONS, 'Critique')))
    return { unit: u.id, plan, objections }
  })),
  (units, p) => withRecovery(`judge-${p}`, T.F, 'xhigh', judgePrompt(A.base, p, units), PIECE_PLAN, 'Judge'),
)
phase('Cross')
const cross = await withRecovery('cross', T.O, 'xhigh', crossPrompt(A.base, plans), CROSS, 'Cross')
return { base: A.base, audits, plans, cross }
```

```js
// ---- workflow 2
export const meta = {
  name: 'b10-build',
  description: 'Batch 10, build: each unit test first in a seeded worktree, merged per piece, measured once per code state, verified by adversarial lenses, fixed until dry',
  phases: [
    { title: 'Implement' }, { title: 'Merge' }, { title: 'Measure' },
    { title: 'Verify' }, { title: 'Triage' }, { title: 'Fix' },
  ],
}
// args: { base, plans: workflow 1's judged plans with the cross constraints folded in }
const A = args
const IMPL = { WL: T.F, WI: T.F, CI: T.F, CV: T.F, CO: T.F, CA: T.O, CF: T.O, CX1: T.O, CX2: T.O, CX3: T.O }
const EARLY = { W: ['semantics', 'spec', 'process'], C: ['semantics', 'spec', 'process'],
                G: ['practice', 'guard', 'process'], N: ['practice', 'guard', 'process'] }
const LATE = { W: ['reach'], C: ['reach', 'measure'], G: ['reach', 'measure'], N: ['reach', 'measure'] }
const LT = { semantics: T.F, practice: T.O, reach: T.O, measure: T.O, spec: T.S, guard: T.S, process: T.S }
const FIXER = p => (p === 'W' || p === 'C') ? T.F : T.O
const relens = (p, touched, confirmed) => [...new Set([          // the lenses a fix's domains call back
  ...confirmed.map(f => f.lens),
  ...(touched.includes('code') ? [...EARLY[p], ...LATE[p]] : []),
  ...(touched.includes('spec') ? ['spec'] : []),
  ...(touched.includes('tests') ? ['reach', 'guard', 'process'] : []),
].filter(l => EARLY[p].includes(l) || LATE[p].includes(l)))]

async function implementPiece(p) {
  const tasks = A.plans[p].tasks
  if (p === 'W' || p === 'C')                       // a worktree and branch per task
    return parallel(tasks.map(t => () =>
      withRecovery(`impl-${t.id}`, IMPL[t.id], 'high', implPrompt(A.base, p, t), TASK_RESULT, 'Implement')))
  const done = []                                   // G, N: clusters in turn, one worktree
  for (const t of tasks)
    done.push(await withRecovery(`impl-${t.id}`, T.O, 'high', implPrompt(A.base, p, t, done), TASK_RESULT, 'Implement'))
  return done
}
async function mergePiece(impl, p) {
  const lost = impl.filter(r => r.failed)
  if (lost.length) log(`${p}: ${lost.length} unit(s) without a result, listed as open`)
  if (p === 'G' || p === 'N') return { p, head: (impl.filter(r => !r.failed).slice(-1)[0] || {}).head, impl, lost }
  return { ...(await withRecovery(`merge-${p}`, T.O, 'high', mergePrompt(A.base, p, impl), MERGED, 'Merge')), impl, lost }
}
async function lens(p, l, head, runs, r) {
  return withRecovery(`verify-${p}-${l}-r${r}`, LT[l], l === 'semantics' || l === 'practice' ? 'xhigh' : 'high',
    verifyPrompt(A.base, p, l, head, runs, r), FINDINGS, 'Verify')
}
async function verifyUntilDry(merged, p) {
  let head = merged.head, early = EARLY[p], late = LATE[p]
  const notes = [], unsettled = [], notRun = []
  for (let r = 0; r < 3; r++) {
    const runs = await withRecovery(`measure-${p}-r${r}`, T.S, 'low', measurePrompt(A.base, p, head, r), RUNS_STARTED, 'Measure')
    const res = [
      ...(await parallel(early.map(l => () => lens(p, l, head, runs, r)))),
      ...(await parallel(late.map(l => () => lens(p, l, head, runs, r)))),   // these wait for the runs
    ]
    res.forEach((x, i) => { if (x.failed) notRun.push(`${[...early, ...late][i]} r${r}`) })
    const found = dedupe(res.filter(x => !x.failed).flatMap(x => x.findings.map(f => ({ ...f, lens: x.lens }))))
    notes.push(...found.filter(f => f.severity === 'note'))
    const serious = found.filter(f => f.severity !== 'note')
    if (!serious.length) return { p, head, rounds: r + 1, runs, notes, unsettled, notRun, merged }
    const judged = await parallel(serious.map(f => async () => {      // barrier: one fixer gets them all
      const votes = (await parallel([0, 1, 2].map(k => () =>
        call(`refute-${p}-r${r}-${f.id}-${k}`, T.O, 'high', refutePrompt(A.base, p, head, f, k), VERDICT, 'Triage')))).filter(Boolean)
      const stands = votes.filter(v => !v.refuted).length
      return { f, state: stands >= 2 ? 'confirmed' : votes.length - stands >= 2 ? 'refuted' : 'unsettled' }
    }))
    unsettled.push(...judged.filter(j => j.state === 'unsettled').map(j => j.f))
    const confirmed = judged.filter(j => j.state === 'confirmed').map(j => j.f)
    if (!confirmed.length) return { p, head, rounds: r + 1, runs, notes, unsettled, notRun, merged }
    const fix = await withRecovery(`fix-${p}-r${r}`, FIXER(p), 'high', fixPrompt(A.base, p, head, confirmed, r), FIXED, 'Fix')
    if (fix.failed) return { p, head, escalated: true, open: confirmed, notes, unsettled, notRun, merged }
    head = fix.head
    early = [...new Set([...relens(p, fix.touched, confirmed).filter(l => EARLY[p].includes(l)), 'process'])]
    late = relens(p, fix.touched, confirmed).filter(l => LATE[p].includes(l))
  }
  log(`${p}: three rounds without a dry one; escalated`)
  return { p, head, escalated: true, notes, unsettled, notRun, merged }
}
return pipeline(['C', 'N', 'G', 'W'], implementPiece, mergePiece, verifyUntilDry)
```

```js
// ---- workflow 3
export const meta = {
  name: 'b10-integrate',
  description: 'Batch 10, integrate: merge the pieces and the records, gate once beside a cross-piece review, reconcile, judge, report',
  phases: [
    { title: 'Merge' }, { title: 'Gate' }, { title: 'Cross-review' },
    { title: 'Read' }, { title: 'Judge', model: 'fable' }, { title: 'Report' },
  ],
}
// args: { base, heads: { W, C, G, N }, pieces: workflow 2's results, landed: paths of the last landed tables }
const A = args
phase('Merge')
const m = await withRecovery('merge-all', T.O, 'high', mergeAllPrompt(A), MERGED, 'Merge')
if (m.failed || m.blocking) return { go: false, stop: 'merge', m }
const gateChain = async () => {
  const steps = {}
  for (const s of ['build', 'testFast', 'testSystem', 'tail', 'distance']) {
    steps[s] = await withRecovery(`gate-${s}`, T.S, s === 'build' || s === 'tail' ? 'medium' : 'low',
      gatePrompt(A.base, m, s), GATE_STEP, 'Gate')
    if (s === 'build' && !steps[s].ok) break
  }
  return steps
}
const review = () => parallel([
  () => withRecovery('cross-review', T.F, 'xhigh', crossReviewPrompt(A, m), FINDINGS, 'Cross-review'),
  () => withRecovery('spec-lint', T.S, 'medium', specLintPrompt(A, m), FINDINGS, 'Cross-review'),
  () => withRecovery('process-merged', T.S, 'medium', processPrompt(A, m, 'merged'), FINDINGS, 'Cross-review'),
])
const [gate, rev] = await Promise.all([gateChain(), review()])
phase('Read')
const [gread, recon] = await parallel([
  () => withRecovery('gate-read', T.O, 'high', gateReadPrompt(A, m, gate), GATE_READ, 'Read'),
  () => withRecovery('distance-reconcile', T.O, 'xhigh', reconcilePrompt(A, m, gate), RECON, 'Read'),
])
phase('Judge')
const verdict = await withRecovery('judge', T.F, 'max', judgePromptAll(A, m, gate, rev, gread, recon), VERDICT_ALL, 'Judge')
if (verdict.failed || !verdict.go) return { go: false, verdict, gate, rev, gread, recon }
phase('Report')
const rep = await withRecovery('report', T.O, 'high', reportPrompt(A, m, gate, gread, recon, verdict), REPORTED, 'Report')
const audit = await withRecovery('process-final', T.S, 'medium', processPrompt(A, rep, 'final'), FINDINGS, 'Report')
return { go: !audit.failed && audit.findings.every(f => f.severity === 'note'), head: rep.head, verdict, audit }
```

The schemas, in short: `AUDIT {piece, mismatches[{claim, actual, blocking}], lineMap}`;
`PLAN {unit, defects[{id, cause, precedent, tests[{file, program, keys, onBase, after,
harness}], fix{files, shape}, spec[{file, passage, callout, entry}], wayNotTaken, risks,
ledgerLines, verdict}]}`; `OBJECTIONS {lens, objections[{target, claim, evidence,
severity}]}`; `PIECE_PLAN {piece, tasks[...as PLAN, ordered], rejected[{objection,
reason}], questions[{question, defaultReading}]}`; `TASK_RESULT {task, branch, head,
commits[{sha, kind}], tests[{file, beforeRun{cmd, lines, registryRow}, afterRun{cmd,
line, registryRow}}], files, ledgerLines, needsToolUpdate, open}`; `MERGED {head, codeKey,
conflicts[{file, resolution}], testsVerdict, blocking}`; `RUNS_STARTED {codeKey,
runs[{kind, log, reused}]}`; `FINDINGS {lens, findings[{id, severity: blocking | must-fix |
note, claim, evidence, where{file, declaration}, suggested}]}`; `VERDICT {refuted,
evidence}`; `FIXED {head, touched[code | tests | spec | report], commits}`; `GATE_STEP {ok,
verdictLines[{cmd, lines}], logs}`; `GATE_READ {green, reds, countsReconciled}`; `RECON
{table, unexplained}`; `VERDICT_ALL {go, items[{item, evidence | gap}], missing,
unsettled}`; `REPORTED {head, files}`.

### 2.4 How the results combine and land on `main`

- Workflow 1's result is read by the coordinator; questions for Pavol go to him one at a
  time in plain text; his answers (or the stated default readings) are folded into the
  plans, which become workflow 2's arguments, saved under `args/` before launch.
- Workflow 2's result is one record per piece: its head, its finished runs and per-site
  list, its notes, unsettled findings, lenses not run and any escalation. An escalated
  piece is the coordinator's to decide (a further fix run of workflow 2 restricted to that
  piece, or the piece left out of the step with its rows); the step does not integrate a
  piece with a confirmed finding open.
- Workflow 3 merges the four heads in the order W, C, N, G. Each piece keeps its commits
  (test, then fix) under a `--no-ff` merge, so the order of work stays visible in `main`'s
  history. The records commit and the report commit sit on top.
- A NO-GO sends the gaps back: a gap in a piece goes to a fix run of workflow 2 on that
  piece, then workflow 3 runs again (a new merged state, so a new gate, not a repeat).
- Landing, by the coordinator after Pavol's go (D4): `git fetch`; if `origin/main` has
  moved, merge it into `b10/integration` and test `git diff --quiet <gated> HEAD --
  ProjectFortress Library build.xml`; a change there other than test files means a new
  gate, otherwise the gate stands; then in the main tree `git merge --ff-only
  b10/integration`, `git log origin/main..main` showing only the step's commits, `git push
  origin main`, `git push origin main:claude/worker-brief-fable-vnnuv8`. The handover's
  first section is the coordinator's own commit after it. The worktrees stay until Pavol has
  read the report.

## 3. Correctness, the machine, the restarts

### 3.1 How correctness is assured

1. **The brief is checked before it is believed.** Four readers check every claim of the
   brief against the base; a missing file, declaration, test or row stops the step, and a
   moved line is passed to the planners as a map.
2. **Plans are attacked before they are built.** Every unit's plan meets two or three
   critics with distinct lenses that object when unsure, and a judge of the strongest tier
   settles each objection in writing; the rejected alternatives become the reports' "way
   not taken". A cross-reader checks the four plans against each other before any edit.
3. **Test first is enforced, not trusted** (rule 1). The test commit stands alone before
   its fix; its failing run is in the registry with a clock time before the fix's first
   build; the process lens checks both from the commit graph and the registry, not from
   the implementer's word. Promotions are seen failing as plain tests on the code before
   the fix.
4. **Verification is independent and adversarial.** No verifier shares the implementer's
   context. The semantic refuter writes its own probes and runs them against the piece's
   build and the base's build side by side through `old-fortress.sh`, never by rebuilding
   either. Lenses are diverse (semantics, practice, reach, measurement, form, rules), since
   each catches a failure the others cannot.
5. **Findings are tried before they are fixed.** Three skeptics per serious finding; two
   failing to refute it confirm it, two refuting it drop it, a split keeps it as unsettled
   and shows it to the final judge and to Pavol, so neither a false alarm nor a real defect
   is decided by one voice.
6. **Fix until dry.** Every fix round is test first, makes a new code state, is measured
   once and re-verified by the lenses whose domain it touched, the process lens always;
   three rounds without a dry one escalate.
7. **The merged result is gated once and read twice** (rule 2). The gate as the skill
   gives it on the merged tree, a cross-piece review beside it, the gate read against the
   last landed summary, and the distance reconciled site by site across the base, C, G, N
   and the merged tree, so that an unmasked error is not read as a caused one and the
   variance of two to four errors is named.
8. **Completeness is judged against the brief, not against the work.** The final judge
   walks every "what done means" item, every rule and every line of the aim, and asks for a
   commit, a test, a verdict line or a table row for each; anything without evidence is a
   gap.
9. **What lands is audited path by path** (rules 4 and 5): only the change, its tests, its
   reports and the records; no scratch, log, capture or model identifier; the footer; the
   `global.map` restore; `Specification-1.0-frozen/`, the compiler's prelude, the model and
   the team's tests untouched; every changed passage with its callout and entry.
10. **Nothing runs twice** (rule 3). The registry is consulted before every build and run;
    the last landed tables are the befores; a verifier or skeptic reads a finished run
    instead of repeating it; the final audit checks that no (key, kind) pair appears twice.

### 3.2 The machine's limits

- **Two agents at a time.** The design never asks for more: long runs are started in the
  background and returned from at once, so a slot is not held by an idle wait except where
  a reader needs the result (the late lenses and the gate's steps, each a small Sonnet or
  Opus context). The pipelines are ordered C, N, G, W so the longest chains start first.
- **Four cores, about 15 GB and no swap.** At most two heavy jobs machine-wide (the two
  `flock` locks): a test suite of four 768 MB JVMs beside the distance's 4 GB JVM fits;
  probes run at 1 GB. Times taken under that sharing are not recorded, and none of the
  numbers the step keeps depends on load (the distance is identical site for site across
  runs of one setup).
- **Disk.** Sixteen worktrees of about 250 MB each and the parser directories: every run's
  `java.io.tmpdir` is its own tree's `tmp/`, each agent sweeps its own `tmp/fortress*rats`
  after a batch of runs, `df -h /` is checked before every heavy job, and a task worktree
  is removed once its piece merge has been verified (its branch is pushed).
- **`/tmp` and `env.sh`.** No agent sources `env.sh` (its sweep could delete another
  agent's live parser directory); `shell.sh` sets the same variables without the sweep.
  The scripts that source `env.sh` themselves (`junit.sh`, the measurements) are run with
  every agent's temporary files already outside `/tmp` (M4).
- **The Bash tool's limit and the cache's life.** No call waits longer than about 240 s;
  every wait is a poll of a log, inside a subagent's five-minute cache life.
- **Empty agent results.** `withRecovery` retries once from the leftovers; a second empty
  result is logged and surfaces to the coordinator, never as silent loss.

### 3.3 Surviving stops and restarts

- **The step outlives a process.** The step will span at least one of the platform's
  stops. Before each workflow the coordinator reads `uptime -s`, arms one-shot
  `send_later` check-ins 45 minutes apart and one a few minutes after the predicted stop.
- **Workflows resume, not relaunch.** Each workflow's arguments are saved under `args/`
  byte for byte with its run id and the script as launched; after a stop the coordinator
  resumes with `resumeFromRunId`. Finished agents keep their results; unfinished ones run
  again from their start. Labels are deterministic; no prompt depends on anything but the
  arguments and earlier results.
- **Agents are idempotent.** An agent run again finds its worktree, its pushed branch, its
  `tmp/progress.md` and its registry rows, and continues at the first step not done. A
  background build or run outlives the process (not a VM restart): the registry shows it
  alive or finished and nobody starts a second copy. A run cut off by a VM restart left no
  result, so starting it again is not a repetition.
- **Nothing that took hours lives only on disk.** Every branch is pushed as it moves; the
  plans and results live in the workflows' journals and under `args/`; the scratch that is
  lost (`tmp/`, logs) is either reproducible from the registry rule or no longer needed.
- **Short workflows.** Three workflows, each resumable alone, with the coordinator's
  review between them, keep the cost of a stop to the agents that were running.

## 4. What to measure or decide before running

Decisions for Pavol:

- **D1. Rule 1 for a library repair that only the checker sees.** Most of G's 57 sites and
  N's 60 (and the drop's 18) are type slips that walk does not observe, and no test in the
  corpus can run the compiled checker over the one library before the switch-over. The
  design's default: the failing evidence is the site in the base's landed per-site list,
  the corpus test is the guard that calls each repaired declaration with today's value
  (passing before and after, as the brief owes), and a site with a walk-observable face gets
  a failing walk test first. If rule 1 is meant strictly, another form of test is needed
  (for example a gated test that runs the checker over one library component), and the
  library pieces wait for it.
- **D2. Is the measurement record part of "its report"?** The gate summary, the checker
  count and distance tables and the per-site list are what the next step reads as its
  before, which rule 3 asks for. The design commits them with the report; logs and raw
  outputs stay out.
- **D3. The base.** At today's `main`, the tests the brief names as `XXX` carry plain names
  (`ProjectFortress/tests/FunctionalMethodMeetInherited.fss`,
  `ProjectFortress/compiler_tests/InferDependentBound.fss`, the varargs tests) and the
  ledger shows rows 534, 544, 563, 588, 590, 593, 605 FIXED, so the brief describes an
  earlier commit. The run needs that commit's full hash as its base; the audit stops the
  step if the base is wrong.
- **D4. Landing.** Whether a GO verdict with a clean final audit lands on `main` at once,
  or waits for Pavol's reading of the report.
- **D5. The strongest tier's pool.** The design asks Fable for 4 judges, 5 implementers,
  the semantic refuters of W and C in every round, the cross-piece reviewer, the final
  judge and the fixers of W and C. If the pool cannot carry that, the fallback is Opus at
  the highest effort for the implementers first, keeping Fable for the judges and refuters.
- **D6. Names and places.** The `b10/*` branches pushed to origin, the report directory
  `climb-batch-10/`, and the per-piece reports as the S1 form's decision records.
- **D7. The preamble as an agent type.** The common preamble could be a project agent type
  (`.claude/agents/`), read from the cache by every agent of the type; a type written
  during a session is found only after a process restart, so it must exist before the
  launch. The default is the preamble inline in every prompt.

Measurements (each once, before the first workflow):

- **M1.** `df -h /` against the disk the sixteen worktrees, the probe directories and the
  parser directories need.
- **M2.** Memory: `free -g` while the first suite runs beside the first distance (observed
  on a run the step makes anyway, not a run of its own).
- **M3.** The harness's concurrency at launch (two on this box).
- **M4.** Whether the ant suites, `junit.sh`, `harness-one.sh` and the two measurement
  scripts honour `java.io.tmpdir` from the environment or still write parser directories to
  `/tmp`; if any does, `env.sh`'s sweep inside another agent's script can delete a live
  directory, and those runs must be serialized.
- **M5.** Whether `old-fortress.sh` and the base's `harness-one.sh` accept a piece's
  rebuilt worktree as their build (the skill says any build; the design relies on it for
  every verifier and skeptic).
- **M6.** Whether a clean, built tree at the base's code key already exists (the main tree
  or a worktree), so that the base is seeded rather than built again.
- **M7.** Whether the harness's resume matches agent calls made from concurrent pipelines
  as the design assumes, on a toy workflow before the real one.
- **M8.** The time of the next process stop (`uptime -s` plus 12 h 58 min), so that
  workflow 3's gate does not start in the last half hour before it.
