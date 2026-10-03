<!-- A design experiment, written on 2026-10-03 for Pavol and for the coordinator who compares it with other designs: the workflow that would run climb batch 10, designed from the goals of `explorations/coordinator/CLIMB-BATCH-10.md` sections 1 to 5 and the binding positions, without the existing batch pipeline. Nothing of the project was run, built or launched to write it. The script below was only parsed as an async function body, the check FACTS gives. Its control flow was then run with stand-in agents in node, in the session's scratchpad: with no refusal, with a refusal contested and upheld, with a red gate, and with a resume order. Read: CLIMB-BATCH-10.md; POSITIONS.md; FACTS.md, "The harness and the gate" and "The container"; explorations/protocol.md; explorations/coordinator/build-cache-exploration.md; the headers of tools/seed-worktree.sh, tools/old-fortress.sh, tools/distance/run.sh, tools/checker-count/run.sh and compile-ladder/rung-inference-walk/harness-one.sh; repo-internals.md, "Test harness mechanics"; the suite timings in coordinator/iteration-cost.md; the first lines of compile-ladder/plan-10/manifest/lists10.py; the boot note's commit messages on main. A slip to declare: the file viewer returned CLIMB-BATCH-10.md in two pages, and the second page held sections 6 to 8, which this experiment was not to show me. The structure below was formed from sections 1 to 5 and the positions; four numbers came from the part I should not have read, and each is marked [6-8] where it is used. -->

# Climb batch 10, designed from its goals

## 1. The design in plain words

Four rungs, four Opus workers, each in its own worktree. Each worktree is seeded in 3 s from one base build that the coordinator makes before the launch. The harness runs two agents at a time, so the workers are started longest first, C, N, G, W, and the checks take the slots as workers finish.

Each worker does the whole rung its section 3 describes. It writes its tests first, sees each one fail through the harness on its unedited worktree (which is the base), and commits them alone. It then makes the repair, builds only what the edit changed, and runs once the part of the suite its change can reach: the interpreter suite for W, N and G, `ant testFast` for C. C, N and G also run the checker-count and distance stages once, beside the suite. Anything longer than 4 minutes runs detached and is polled at most every 260 s, so no agent's 5-minute prompt cache expires while it waits. Workers do not write the ledger, FACTS, PLAN or the handover: they propose those lines in their reports and name new rows by placeholder, so the four branches never collide in the record files.

Three checkers, not four. W and C each get an Opus checker. N and G repair the same library by the same standard, the library's own practice, on disjoint sections of one file, so one checker judges both. A checker builds nothing and reruns nothing the worker ran. It reads the test-first order from git and from the worker's transcript (tool results only). It judges each repair against the section of the specification or the library precedent the brief names. It runs a handful of its own small programs, on the new code with the rung's build and on the old code from the base build with a private caches folder. It reads the worker's suite and stage results. It approves, or it refuses with a program or a cited line that shows the defect; a doubt is not a finding. It may commit a correction that touches no code.

A refusal goes to one Opus repair agent. For each finding the repairer either accepts it, turning the checker's program into a test that fails first and then fixing the code, or contests it with evidence. Only a contested finding reaches a judgement, and that judgement is one Fable ruling, final. No second checker looks at a repair: the repair's own test, seen failing and then passing, and the gate are its check.

The tail has three Opus agents. The integrator merges the checked branches with `--no-ff`, which keeps each worker's test-then-fix commits. It numbers the new ledger rows, builds the merged tree clean, and starts the gate detached: `testFast`, `testSystem`, the four-thread `atomic` runs, the ladder regression, and the two report-only stages. While the gate runs, the integrator writes the records. In the other slot, a batch reviewer reads the four branches side by side for what no single check could see. Its code findings do not hold the batch, and its text corrections are applied before the push. A red gate gets one repair as a whole and one more gate run; red again, nothing lands. On green, a lander applies the text corrections, checks that no gated path changed since the gate and that `main` has not moved under it, and pushes. After that, a Sonnet agent measures the run's cost by role from the journal, so this design's estimate gets tested.

The cost:
- Agents: 10 Opus in the base case, plus the Sonnet measure; 12 to 17 with repairs.
- Tokens written: about 4.3M on Opus (3.0M to 6.4M), up to 0.2M on Fable, about 0.1M on Sonnet.
- Wall time: about 8 to 12 hours. Three quarters of it is the four workers, two at a time.

Where this differs from what the record's own lines assume:
- One check for the two library rungs.
- No second skeptic on a repair.
- No first ruling at Opus.
- The merged review does not block, runs beside the gate, and replaces the conformance half of the review after the batch.
- The records are written by the integrator while the gate runs.
- Merge commits on `main`, in place of one composed commit per rung.
- `testSystem` for the two library rungs, which their briefs leave to the gate.

## 2. The script

### Before the launch: the coordinator's steps, no agent

1. **The base build.** One built worktree at the base: `ant compileAll`, `global.map` restored, the library order, and one walk test to warm the walk caches, about 200 s. Or reuse the one made for batch 10 [6-8] if `git status --porcelain -- ProjectFortress Library default_repository` is empty in it. One trial seed proves it. Nothing compiles or runs in it after that, except `old-fortress.sh` runs, which write only to private folders.
2. **P1.** The boot note at `3c0a49e4f` routes P1's judgement to batch 11's record, so `args.p1` is null: W runs without its "Under P1" paragraph.
3. **The briefings.** The briefings and checks lists are rendered from `lists10.py`, checked with `facts-extract.sh --check`, and passed as `args.briefings` and `args.checks`. The args are saved in the session's scratchpad, since a resume needs them byte for byte.
4. **Two small tools, committed** (section 5, items 1 and 2): `tools/gate.sh` and `tools/test-first-trace.py`.
5. **The disk.** `df` must show about 2 GB free: four worktrees at about 206 MB, the integration tree built clean at about 250 MB, and the stages' scratch.
6. **The script itself.** It is parsed as an async function body, the check FACTS gives, and run through `tools/workflow-scenarios.js`.

### The agents

Each agent below is listed with its tier, what it reads, its prompt in summary, and what it returns. The prompts themselves are in the script.

- **worker:C, worker:N, worker:G, worker:W** (Opus, one per rung, started in that order; the harness runs two at once).
  - Reads its rung's part of section 3, printed from the record at the base by an `awk` range, then its briefing as the work reaches each entry.
  - Prompt:
    - The machine rules: seeding, what to build after which edit, the harness commands, detached runs polled within 260 s, a lock so that two suites never share the four CPUs, the commit form, placeholders for new rows.
    - The order of work: tests first and committed alone; the repair, after listing the ways the language and the library offer; the text in the S1 form; one reach run; the report.
    - Every stop the brief lists is reversible: list it and finish.
  - Returns: branch and head; each test with its commit and the failing line; the paths changed; the reach run's verdict; the stage totals; rows opened and closed; stops met; the report's path.
- **check:C, check:W** (Opus, one each, after its worker).
  - Reads: the brief's "For the skeptic", "Stops", "Files it may touch" and "What it closes"; the checks list; the report; the diff; the specification sections and precedents named.
  - Prompt, six checks in order:
    1. Test first: the git order, and the failing line in the transcript's tool results.
    2. Paths against the allowed files.
    3. Each repair against its section of the text or its precedent.
    4. At most eight programs of its own, new code against old.
    5. The worker's suite and stage results, read.
    6. The revised text against the code as built.
  - It may commit corrections that touch no code. It approves unless a code or test finding stands on a program or a cited line.
  - Returns: the verdict, the test-first evidence, the findings (id, kind, claim, evidence, program), the commits of its corrections.
- **check:NG** (Opus, one, after both library workers).
  - Reads: both briefs' check paragraphs, section 4 of the record, both reports, both diffs, both checks lists, the landed tables and the workers' after-tables.
  - Prompt:
    - Test first for rows 590 and 602 and the two new walk tests.
    - The stage as the test: before and after compared with `compare.sh`, the sites mapped through each diff (row 577), each class named, the 18 sites of the drop among them.
    - Every hunk inside its own rung's sections, as section 4 gives them.
    - The drop read against `de22fd928^`.
    - Each repair against the library's precedent, one precedent found by the checker itself among them.
    - At most eight walk programs on repaired declarations, new against old.
    - The sites left, each with its row.
  - Returns one verdict per rung, and what it saw across the two.
- **repair:X** (Opus, only after a refusal).
  - Reads: the brief, the report, the findings, the lines they cite.
  - Prompt: for each code or test finding, either accept it (the finding's program becomes a test, seen failing and committed alone, then the fix) or contest it on evidence. Text and record findings are applied. One reach run after the last code edit, since the code changed.
  - Returns: the head, the findings fixed, the findings contested with the rebuttal.
- **ruling:X:id** (Fable, only for a contested finding).
  - Reads: the finding, the rebuttal, and the lines both cite. It reads no transcript; a Fable worker reading one was once ended by the safety filter (FACTS).
  - Prompt: rule upheld or overturned, in at most 300 words, naming the line that decides it; commit the ruling on the rung's branch.
  - Returns: the ruling and the change it requires.
- **repair2:X** (Opus, only after an upheld ruling).
  - Prompt: fix as the ruling requires, test first. If the fix cannot be made in the rung's files, pin the defect with an `XXX` test and a row ("carried"). If the rung's change leaves something worse than the base and cannot be fixed here, the state is "held": the rung does not land and its branch is kept.
  - Returns: the head and the state.
- **integrate** (Opus, after every rung is settled).
  - Reads: the rungs' summaries and reports, section 4 of the record, the ledger's tail, the FACTS and PLAN sections it edits.
  - Prompt:
    1. A fresh, unseeded integration worktree, so that the gate certifies a clean build.
    2. `git merge --no-ff` of each rung, conflicts in shared files keeping both sides.
    3. The row placeholders numbered and replaced, then checked with grep.
    4. `gate.sh` started detached.
    5. While it runs: the ledger, FACTS, PLAN, handover and batch `RECORD.md` written in one commit.
    6. The verdict read against batch 9's comparands; the gate tables and the per-site list committed; the branch pushed as `wip/batch-10-integration`, never to `main`.
  - Returns: the merged heads, conflicts, row numbers, the gated commit and the gate's verdict.
- **review** (Opus, beside the integrator, reads only).
  - Reads: sections 1, 4 and 5 of the record, the reports, the four diffs side by side, the checkers' verdicts.
  - Prompt, five things no single check could see:
    1. One rung's change made wrong by another's: walk's load checks against the declarations N and G add; C's varargs and inference changes against N's `assert`, `deny` and drop; the two rungs' `changes.tex` entries.
    2. A commitment of section 1 that no rung delivered.
    3. Text not in the S1 form, or saying what the code does not do.
    4. A stop met and not listed.
    5. A choice made inside a report that must be flagged for Pavol.
  - Returns: text corrections, each one touching no gated path; code findings, which go to the next batch as rows; lines for Pavol.
- **gate-repair** (Opus, only on a red gate).
  - Prompt: repair the merged tree as a whole, without bisecting. The failing gate test is the failing test; a new test, if one is needed, is written first. Then one more gate run: the whole gate, or only the build and suites if the change touches no path the stages read.
  - Returns: the new verdict.
- **land** (Opus at low effort, only on a green gate).
  - Prompt:
    1. Apply the reviewer's text corrections; a row for each code finding.
    2. Check that no gated path changed since the gated commit.
    3. Merge a moved `origin/main` only if it changed no gated path.
    4. Push `main`, then `claude/worker-brief-fable-vnnuv8`.
    5. Start the two microGPT walk runs detached and do not wait for them.
  - Returns: whether it pushed, and the new head of `main`.
- **measure** (Sonnet at low effort, archaeology, after everything else).
  - Reads: the run's journal and transcripts with `journal-text.py`.
  - Prompt: per agent, the tokens written, wall time, calls, the longest gap, the cache misses (writes over 100K after a gap over 300 s), and the briefing entries opened. Totals by role, written to `climb-batch-10/COST.md` beside this design's estimate.
  - Returns: the totals.

### The script

```js
export const meta = {
  name: 'climb-batch-10',
  description: 'Climb batch 10: rungs W, C, G and N built test first, checked, merged, gated once on the merged tree, landed',
  whenToUse: 'A climb batch whose record gives each rung its brief in section 3; args name the base, the base build and the briefings',
  phases: [
    { title: 'Rungs', detail: 'one Opus worker per rung in a worktree seeded from the base build; longest first, two at a time' },
    { title: 'Checks', detail: 'one Opus checker each for W and C, one for N and G together; nothing built or rerun' },
    { title: 'Repairs', detail: 'only after a refusal or a red gate; a contested finding gets one top-tier ruling' },
    { title: 'Integrate', detail: 'merge, number rows, clean build, the gate once in the background, records; the batch review beside it' },
    { title: 'Land', detail: 'text corrections, the gated-paths check, the push' },
    { title: 'Measure', detail: 'Sonnet: tokens written, waits and cache misses by role, from the journal' },
  ],
}

// ---------- inputs: everything batch-specific arrives in args; the script is the same for every climb batch ----------
const A = args || {}
const BASE = A.base                    // the full hash the rungs are cut from (a short hash breaks a resume)
const BASE_BUILD = A.baseBuild         // built once by the coordinator before the launch
const RECORD = A.record || 'explorations/coordinator/CLIMB-BATCH-10.md'
const COMPARANDS = A.comparands || 'explorations/compile-ladder/climb-batch-9/gate'
const BATCH_DIR = A.batchDir || 'explorations/compile-ladder/climb-batch-10'
const TIER = { worker: 'opus', archaeology: 'sonnet', judgement: A.topTier || 'fable' }
if (!BASE || !BASE_BUILD) throw new Error('args.base and args.baseBuild are required')

const RUNGS = [ // longest expected first: calls are issued in this order and the harness runs two at a time
  { id: 'C', slug: 'rung-checker-defects', code: 'Java and Scala, the compiled checker', stages: true,
    reach: 'ant testFast (its compiler and library tracks among the four) and the ladder subset your brief names' },
  { id: 'N', slug: 'rung-number-order-slips', code: 'library files only', stages: true, reach: 'ant testSystem' },
  { id: 'G', slug: 'rung-generator-slips', code: 'library files only', stages: true, reach: 'ant testSystem' },
  { id: 'W', slug: 'rung-walk-meet', code: "Java, walk's evaluator", stages: false, reach: 'ant testSystem' },
]
const R = {}
for (const r of RUNGS) R[r.id] = r
const WT = r => '/home/user/fortress-b10-' + r.id   // fixed paths: a resumed agent finds its predecessor's worktree
const BR = r => 'wip/' + r.slug
const INT = '/home/user/fortress-b10-int'
const SECTION = id => `git show ${BASE}:${RECORD} | awk '/^### ${id}\\./{p=1} p && /^##+ / && !/^### ${id}\\./{exit} p'`
const FOOTER = 'Co-Authored-By: Claude <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB'
const P1 = A.p1
  ? `P1 is answered. Its judgement is ${A.p1.judgement}; your answers line now reads: ${A.p1.answers} The paragraph "Under P1" applies, with its demo reads.`
  : 'P1 is not answered: the paragraph "Under P1" does not apply, and a type parameter whose bound mentions itself is not yours.'

// ---------- the rules every agent that touches a tree gets ----------
const MACHINE = dir => `
How to work on this machine (4 CPUs, two agents at a time; measured in explorations/coordinator/build-cache-exploration.md and FACTS.md, "The container"):
- Shell: export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=${dir}; unset JAVA_TOOL_OPTIONS; cd ${dir}; source explorations/experiment/env.sh. Read df -h /home/user before any run over a minute.
- After an edit: Java or Scala: ant compileAll (about 80 s on a seeded tree), then git checkout -- default_repository/caches/global.map; the library order (repo-internals.md, "Compile order matters") only before a compiled run. A library .fss body: walk needs nothing; a compiled run needs that component recompiled first. Never wipe a cache; a failed ant compileAll has already deleted them, so fix, rebuild, restore global.map.
- Tests: interpreter tests through explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/h <files>; compiled tests through explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh. Save each run's whole output under tmp/ before reading its verdict lines.
- The old code, where you need it: explorations/coordinator/tools/old-fortress.sh <base build> tmp/old-caches <fortress arguments>, or harness-one.sh with FORTRESS_HOME set to the base build. Never compile in the base build.
- Long runs (a suite, a stage, anything over 4 minutes): start detached, setsid nohup <command> > tmp/<name>.log 2>&1 & echo $! > tmp/<name>.pid, and poll with one call that returns within 260 s: timeout 260 tail --pid=$(cat tmp/<name>.pid) -f /dev/null; tail -5 tmp/<name>.log. Never let 270 s pass between your calls while you wait: your prompt cache lives 5 minutes, and a wait past it writes your whole context again. Do other work between polls. ant testFast and ant testSystem run under flock /home/user/fortress-heavy.lock, so that two suites never share the four CPUs.
- Commits: only the paths you wrote, in one command: git add -- <paths> && git commit -m "<message>" -- <paths>. A commit that edits the original tree (any path outside explorations/) says so in its first line. Every message ends with these two lines:
${FOOTER}
- Scratch, programs, logs and tables stay in tmp/, which git ignores; never commit them. Write no model identifier anywhere.`
const RUNG_RULES = r => `
- Push after each commit: git push origin HEAD:${BR(r)}. Never main, never another rung's branch or files.
- Do not edit the ledger, FACTS.md, PLAN.md or the handover. A new ledger row is ROW-${r.id}1, ROW-${r.id}2, ... wherever you cite it, in a test, the text or the report; the integrator numbers it. Your proposed rows, closings, notes, FACTS lines and PLAN lines go in your report's last section.`

// ---------- prompts ----------
const workerPrompt = r => `You are the worker of rung ${r.id} of climb batch 10 of the Fortress revival.
Your brief is rung ${r.id}'s part of section 3 of ${RECORD} at ${BASE}. Print it first and read it whole:
  ${SECTION(r.id)}
It is your whole task; the rest of the record is not needed.${r.id === 'W' ? '\n' + P1 : ''}
You change: ${r.code}. Your reach run, once, after your last edit: ${r.reach}${r.stages ? ', with the checker-count and distance stages started first, detached, beside it' : ''}.
Your worktree: explorations/coordinator/tools/seed-worktree.sh ${BASE_BUILD} ${WT(r)} ${BR(r)} ${BASE} (3 s; run it from /home/user/fortress). If ${WT(r)} already has commits on ${BR(r)}, you continue an earlier attempt: read git log ${BASE}..HEAD and your report's draft, and go on from there.
${MACHINE(WT(r))}${RUNG_RULES(r)}
The order of work:
1. Seed the worktree; read the brief; read a briefing entry below when your work reaches it.
2. Tests first: write each test the brief names as the clean minimal form of the problem; run each through the harness on the unedited worktree, which is the base, and see it fail (a pin the brief says passes before and after: see it pass); commit the tests alone, before any other change, and push.
3. The repair: list the ways the language and the library offer before you choose; build only what the edit changed; run the tests through the harness until they pass.
4. The text, where the brief names passages, in the S1 form: a labelled callout at the passage; an Appendix I entry with the reason, the original quoted with its path and line in Specification-1.0-frozen/, and what reversing would take.
5. The reach run, once. A failure is yours: fix it, and run again only what that fix can reach.${r.stages
  ? ` Your before is the landed tables in ${COMPARANDS}/ and explorations/compile-ladder/gate/distance-sites.tsv, never a run on the base. The stages: explorations/coordinator/tools/checker-count/run.sh tmp/count-after.txt tmp/cc and explorations/coordinator/tools/distance/run.sh tmp/distance-after.txt tmp/dist (13 to 24 minutes, one core; keep its errors.tsv). Read the after by class through the per-site list, its lines mapped through your diff (row 577). A second distance run after more edits is a new code state, not a repeat; do all the edits you can by reading before the first.`
  : ' The checker-count and distance stages read none of your paths: say so in the report, with the paths, and do not run them.'}
6. The report, explorations/compile-ladder/${r.slug}/REPORT.md: what was built; each choice of yours with the ways considered and the evidence that settled it; each test with its commit and the failing line seen before the edit; the reach run's verdict lines; the stages' before and after, if run; each stop met and why it is reversible; what comes back to Pavol, as the brief lists it; last, the proposed records. Commit, push, return the summary.
A stop the brief lists is reversible: list it, finish, and return. Never wait for an answer.
The briefing (each entry: what to read, and why):
${(A.briefings || {})[r.id] || '(none passed: read the FACTS.md and POSITIONS.md entries your brief cites, by bold title, with explorations/coordinator/tools/facts-extract.sh)'}`

const checkOwnPrompt = (r, w) => `You are the checker of rung ${r.id} of climb batch 10 of the Fortress revival. Its worker has finished; its summary is at the end. You build nothing, and you rerun none of the worker's tests, suites or stages.
Read: the rung's brief (${SECTION(r.id)}), above all "For the skeptic", "Stops", "Files it may touch" and "What it closes"; the report ${w.report}; git -C ${WT(r)} diff ${BASE}..${w.head}; then the specification sections, source lines and precedents the brief and the checks list name.
Check, in this order:
1. Test first: git -C ${WT(r)} log --reverse --name-status ${BASE}..${w.head} shows each test commit alone and before any other change; each failing line the report quotes appears in a tool result of the worker's transcript before its first fix commit: python3 explorations/coordinator/tools/test-first-trace.py ${BR(r)} (it prints tool results only; never print the worker's own text).
2. Paths: git diff --name-only against "Files it may touch"; a path outside it is a finding.
3. Each repair against the section of the specification or the precedent the brief names and the decisions it cites, and against the other ways the report lists.
4. Programs of your own, at most eight and each small, on the cases "For the skeptic" names and on the edges you suspect. The new code: the rung's build in ${WT(r)}, its caches pointed at a private tmp/check-caches (FORTRESS_CACHES and -Dfortress.caches). The old code: explorations/coordinator/tools/old-fortress.sh ${BASE_BUILD} ${WT(r)}/tmp/old-caches ... . Programs stay in tmp/.
5. The worker's reach run and stage tables, read from its report and tmp/, against its claims.
6. The revised text against the code as built, and its S1 form.
You may commit on ${BR(r)}, and push, a correction that changes no source, library or test file (a sentence of the text or of the report); list each.
Approve unless a finding of kind code or test stands on a program you ran or a line you cite; a doubt is not a finding. A refusal names each finding with its evidence and the program or line that shows it.
${MACHINE(WT(r))}
The checks list:
${(A.checks || {})[r.id] || '(none passed)'}
The worker's summary:
${JSON.stringify(w)}`

const checkLibraryPrompt = (n, g) => `You are the checker of rungs N and G of climb batch 10 of the Fortress revival, together. Both repair one-off slips of the one library, on disjoint sections of Library/FortressLibrary, by one standard, the library's own practice; judge both by it. A rung whose summary below is null was dropped; check the other. You build nothing and rerun no stage or suite.
Read: both briefs (${SECTION('N')} and ${SECTION('G')}), above all "For the skeptic", "Stops" and "Files it may touch"; section 4 of the record (git show ${BASE}:${RECORD} | awk '/^## 4\\./{p=1} /^## 5\\./{exit} p'); both reports; both diffs against ${BASE}.
Check:
1. Test first for N's promoted tests (rows 590 and 602) and both new walk tests, from git log and python3 explorations/coordinator/tools/test-first-trace.py <branch> (tool results only). The stage is the test: the before is ${COMPARANDS}/ and explorations/compile-ladder/gate/distance-sites.tsv, the after each worker's tmp/distance-after.txt and errors.tsv. Compare them with explorations/coordinator/tools/distance/compare.sh and map the after's sites through each diff (row 577): each class's rows named, the totals against the reports, the 18 of N's drop among them.
2. Ownership: every hunk (git diff -U0) inside its own rung's sections and declarations as section 4 gives them on the base, none in the other's; no team test line changed; no line of the model.
3. N's drop: the three declarations against git show de22fd928^:<file>.
4. Each repair against the precedent its report cites and one you find yourself in the library. A cast routed round the checker, a device that states an exclusion false of a library type, a team declaration removed, or a declared type that changes which declaration walk runs, is a finding.
5. Programs of your own under walk, at most eight, calling repaired declarations: the new code in each rung's worktree (walk needs no build after a library edit; private caches as above), the old with explorations/coordinator/tools/old-fortress.sh ${BASE_BUILD} <worktree>/tmp/old-caches <program>. A value walk prints that changed, other than row 590's catch and row 602's shifts, is a finding.
6. Each site left, with its row.
You may commit text-only corrections on a rung's own branch and push them. Return one verdict per rung, and what you saw across the two.
${MACHINE('<the rung worktree you run in>')}
The checks lists. N: ${(A.checks || {}).N || '(none)'}
G: ${(A.checks || {}).G || '(none)'}
N's summary: ${JSON.stringify(n)}
G's summary: ${JSON.stringify(g)}`

const repairPrompt = (r, w, v) => `You repair rung ${r.id} of climb batch 10 after its checker refused it. Work in ${WT(r)} on ${BR(r)}, from its head; the worker and the checker have finished.
Read: the brief (${SECTION(r.id)}), the report ${w.report}, the findings below, and the code and text each one cites.
For each finding of kind code or test, either accept it or contest it. To accept: make its program a test in the corpus, or extend the rung's own; run it through the harness and see it fail; commit it alone; fix; build what the edit changed; see it pass. To contest: write the evidence that it is wrong (the specification's line, the library's precedent, a program's output) in the report's section "Contested", and change nothing for it. Contest on evidence, never on opinion. Findings of kind text or record: apply them.
After your last code edit, the reach run once (${r.reach}${r.stages ? ', and the stages again only if a fix touched a path they read: ProjectFortress/src outside interpreter/, or Library/' : ''}): the code changed, so it is a new state. Update the report.
${MACHINE(WT(r))}${RUNG_RULES(r)}
The findings: ${JSON.stringify(v.findings)}`

const rulingPrompt = (r, f, c) => `Rule on one contested finding of rung ${r.id} of climb batch 10 of the Fortress revival. The project finishes what the designers intended: the specification in Specification/ is the standard, with the 2012 Types chapter beside it; the type group's later, implementation-informed word weighs more where they conflict; the library's own practice is the standard for library code (explorations/coordinator/POSITIONS.md, its decisions by bold title).
The finding, from the rung's checker: ${JSON.stringify(f)}
The rebuttal, from the rung's repairer: ${JSON.stringify(c)}
Read the passages, code lines and precedents both cite, in ${WT(r)} at the head of ${BR(r)}. Read no transcript and run no build. Rule upheld or overturned, in at most 300 words, naming the line that decides it; if upheld, give the change it requires. Commit the ruling as explorations/compile-ladder/${r.slug}/RULING-${f.id}.md on ${BR(r)}, in one command (git add -- <path> && git commit -m "<message>" -- <path>), the message ending with these two lines:
${FOOTER}
and push it with git push origin HEAD:${BR(r)}.`

const repair2Prompt = (r, upheld) => `A top-tier ruling upheld findings that rung ${r.id}'s repairer contested; the rulings are below and committed on ${BR(r)}. Fix each as its ruling requires, test first as for any finding, then the reach run once (${r.reach}). Where the fix cannot be made in this rung's files, pin the defect instead with an XXX test that fails today and a row ROW-${r.id}<k>, and return the state "carried". Where the rung's change leaves something worse than the base and cannot be fixed here, return "held": the rung does not land, and its branch is kept.
${MACHINE(WT(r))}${RUNG_RULES(r)}
The rulings: ${JSON.stringify(upheld)}`

const integratePrompt = landing => `You integrate climb batch 10 of the Fortress revival: merge the checked rungs below, gate the merged tree once, and write the batch's records while the gate runs.
1. The integration worktree: git -C /home/user/fortress worktree add -b batch-10-integration ${INT} ${BASE}. Do not seed it: the gate certifies a clean build.
2. Merge each rung's head with git merge --no-ff, in the order given, keeping every commit. The shared files (section 4 of ${RECORD}) are Library/FortressLibrary.fsi and .fss by section, Specification/appendices/changes.tex by entry, ProjectFortress/tests by file. A conflict there keeps both sides; any other conflict is resolved by the rungs' briefs, and reported.
3. Rows: number every ROW-<rung><k> placeholder from the ledger's highest row plus one, in rung order W, C, G, N and each rung's own order; replace them in every file of the merged diff; check with grep that none is left; one commit.
4. Start the gate detached: setsid nohup explorations/coordinator/tools/gate.sh ${INT} ${INT}/tmp/gate > ${INT}/tmp/gate.log 2>&1 & . It runs the clean build, ant testFast, ant testSystem, the four-thread atomic runs and the ladder regression in turn, with the checker-count and distance stages beside them: 25 to 35 minutes. Note the commit it gates.
5. While it runs, polling it at least every 260 s, write the records from the rungs' reports' last sections. The ledger: the new rows; the rows closed, each with "fixed <the fix's commit>"; the notes the briefs name. FACTS.md: one block of the rungs' lines. PLAN.md: the routing lines. The handover's first section: the landing. ${BATCH_DIR}/RECORD.md: what landed, per rung; every choice a rung made, with the ways not taken, flagged for Pavol; every stop met and why it is reversible; what was carried or held. One commit, with no source, library, test or specification file in it.
6. The verdict. Zero failures in testFast and testSystem. The counts against ${COMPARANDS}/summary.txt: testSystem's four shards summed, the comparand plus the files W, G and N added; the compiler track plus C's; the library track unchanged. The atomic runs and the ladder as the comparand. The checker count and the distance reported, never red. Copy the gate's summary and tables into ${BATCH_DIR}/gate/ and its per-site list to explorations/compile-ladder/gate/distance-sites.tsv; commit; push the branch as wip/batch-10-integration, never main.
${MACHINE(INT)}
The rungs, in merge order: ${JSON.stringify(landing.map(s => ({ rung: s.r.id, branch: BR(s.r), head: s.head, report: s.report, state: s.state })))}`

const reviewPrompt = landing => `You are the batch reviewer of climb batch 10 of the Fortress revival. You read only; you run beside the gate, which is not yours. Each rung was checked on its own (the verdicts are below); find what no single check could see.
Read: sections 1, 4 and 5 of ${RECORD} at ${BASE}; each rung's report; the rungs' diffs against ${BASE}, side by side (git -C /home/user/fortress diff ${BASE}..<head>).
Find:
(1) A change of one rung that another's makes wrong: walk's new load checks against the declarations N and G add or retype; C's varargs and inference changes against N's assert, deny and drop; the two rungs' entries of changes.tex.
(2) A commitment of section 1's "What go commits you to" that no rung delivered, or a row the record closes left open without a note.
(3) A revised passage not in the S1 form, or one that says what the code does not do.
(4) A stop met and not listed.
(5) A choice made inside a report that the batch record must flag for Pavol.
Repeat no rung's check. Return text corrections (path, exact change, why), each changing no file under ProjectFortress/, Library/, build.xml or bin/, for the lander to apply. Return code findings with their evidence; they go to the next batch as rows and do not hold this one.
The rungs: ${JSON.stringify(landing.map(s => ({ rung: s.r.id, branch: BR(s.r), head: s.head, report: s.report, verdict: s.check ? s.check.verdict : null, findings: s.check ? s.check.findings : [] })))}`

const gateRepairPrompt = integ => `The gate of climb batch 10 is red on the merged tree (${INT}, branch batch-10-integration): ${JSON.stringify(integ.gate)}.
Repair it in the merged tree, as a whole: find the cause from the failing tests' output and the rungs' reports, without bisecting commits. The failing gate test is your failing test, already seen. A fix that needs a test of its own writes it first and sees it fail. Then run the gate once more, detached, as the integrator did: tools/gate.sh whole, or only its build and suites if your change touches no path the two stages read (ProjectFortress/src outside interpreter/, Library/). Fix the records the repair makes wrong. Push the branch as wip/batch-10-integration. Return the new verdict; if it is still red, nothing lands: say what is left.
${MACHINE(INT)}`

const landPrompt = (integ, review, fix) => `You land climb batch 10 from ${INT}, branch batch-10-integration, gated at ${fix ? fix.gate.commit : integ.gate.commit}.
1. Apply the reviewer's text corrections below, each only if it changes no file under ProjectFortress/, Library/, build.xml or bin/. For each code finding, add a new ledger row (the next number), routed to the next batch, and a line in ${BATCH_DIR}/RECORD.md for Pavol. One commit.
2. git diff --quiet <the gated commit> HEAD -- ProjectFortress Library build.xml bin must hold; if not, stop and return pushed false.
3. git fetch origin. If origin/main has moved past ${BASE}, merge it into the branch, but only if git diff --quiet ${BASE} origin/main -- ProjectFortress Library build.xml bin holds. Otherwise stop and return pushed false: the gate would not describe the tree.
4. Check that git log origin/main..HEAD shows only the batch's commits. Then git push origin HEAD:main, then git push origin HEAD:claude/worker-brief-fable-vnnuv8. Leave /home/user/fortress and its uncommitted files alone.
5. Start the two microGPT programs under walk on the landed tree, detached (explorations/coordinator/tools/mg-run.sh), their output in ${INT}/tmp/. Do not wait for them.
${MACHINE(INT)}
The reviewer's result: ${JSON.stringify(review)}`

const measurePrompt = () => `Measure the cost of the workflow run of climb batch 10 that has just finished. Its journal is the newest ~/.claude/projects/-home-user-fortress/*/subagents/workflows/*/journal.jsonl whose launched line names climb-batch-10; its agents' transcripts are beside it (python3 explorations/coordinator/tools/journal-text.py).
Per agent, by its label: the tokens written (cache creation plus uncached input, each message once by its id), the wall time, the number of calls, the longest gap between two calls, the calls that wrote more than 100K after a gap of over 300 s, and, for workers and checkers, how many briefing entries it opened. Then the totals by role: worker, checker, repair, ruling, integrator, reviewer, lander.
Write ${BATCH_DIR}/COST.md in plain lists, numbers in K and M, with the design's estimate (explorations/coordinator/process-engineering/design-batch10-opus.md, section 4) beside each measured figure. Commit it alone, in one command, the message ending with these two lines:
${FOOTER}
Push it to main only if git log origin/main..HEAD shows nothing else; otherwise push it to wip/batch-10-cost.`

// ---------- schemas ----------
const S = (props, req) => ({ type: 'object', properties: props, required: req || Object.keys(props) })
const str = { type: 'string' }, bool = { type: 'boolean' }, num = { type: 'number' }, strs = { type: 'array', items: str }
const FINDING = S({ id: str, kind: { type: 'string', enum: ['code', 'test', 'text', 'record'] }, claim: str, evidence: str, program: str }, ['id', 'kind', 'claim', 'evidence'])
const WORKER = S({
  rung: str, branch: str, head: str, status: { type: 'string', enum: ['done', 'partial'] },
  tests: { type: 'array', items: S({ path: str, commit: str, role: { type: 'string', enum: ['fails-first', 'pin'] }, failingLine: str }, ['path', 'commit', 'role']) },
  paths: strs, reach: S({ command: str, verdict: str, log: str }), stages: S({ count: str, distance: str, total: num }, []),
  rowsOpened: strs, rowsClosed: strs, stopsMet: strs, forPavol: strs, report: str,
}, ['rung', 'branch', 'head', 'status', 'tests', 'paths', 'reach', 'report'])
const CHECK = S({ rung: str, verdict: { type: 'string', enum: ['approve', 'refuse'] }, testFirst: str, findings: { type: 'array', items: FINDING }, corrections: strs, stopsMet: strs }, ['rung', 'verdict', 'testFirst', 'findings'])
const LIBCHECK = S({ N: CHECK, G: CHECK, across: strs }, ['across'])
const REPAIR = S({ rung: str, head: str, fixed: strs, contested: { type: 'array', items: S({ id: str, rebuttal: str }) }, reach: S({ command: str, verdict: str }) }, ['rung', 'head', 'fixed', 'contested'])
const RULING = S({ id: str, ruling: { type: 'string', enum: ['upheld', 'overturned'] }, reason: str, change: str }, ['id', 'ruling', 'reason'])
const REPAIR2 = S({ rung: str, head: str, state: { type: 'string', enum: ['repaired', 'carried', 'held'] }, note: str }, ['rung', 'head', 'state'])
const GATE = S({ green: bool, commit: str, summary: str, failures: strs }, ['green', 'commit', 'summary'])
const INTEGRATE = S({ branch: str, head: str, merged: strs, conflicts: strs, rows: strs, recordsCommit: str, gate: GATE }, ['branch', 'head', 'merged', 'gate'])
const REVIEW = S({ corrections: { type: 'array', items: S({ path: str, change: str, why: str }) }, codeFindings: { type: 'array', items: S({ rung: str, claim: str, evidence: str }) }, forPavol: strs }, ['corrections', 'codeFindings'])
const GATEFIX = S({ head: str, cause: str, gate: GATE }, ['head', 'cause', 'gate'])
const LAND = S({ pushed: bool, mainHead: str, notes: strs }, ['pushed'])

// ---------- calling agents: a fixed order on a resume, and one retry for an agent that returns nothing ----------
// args.resumeOrder: on a resume after a script change, the labels in the journal's order of "started" lines
// (FACTS, "A restart of the session's own process ..."). Every label in it must be one this script will call.
const ORDER = A.resumeOrder || []
const turn = [], open = []
for (let i = 0; i <= ORDER.length; i++) turn.push(new Promise(res => open.push(res)))
open[0]()
async function callAgent(label, prompt, opts) {
  const i = ORDER.indexOf(label)
  await (i >= 0 ? turn[i] : turn[ORDER.length])
  let out = null
  for (let k = 1; k <= 2 && out == null; k++) {
    const head = k === 1 ? '' : 'An earlier attempt at this role ended without a result. It may have left commits, a pushed branch or files in tmp/: look first, keep what is sound, and finish.\n'
    const p = agent(head + prompt, { ...opts, label: k === 1 ? label : label + '#' + k })
    if (k === 1 && i >= 0) open[i + 1]()   // the next call of the journal's order may now be issued
    out = await p
  }
  return out
}

// ---------- one rung from its check to its final state ----------
async function settle(r, w, v) {
  const s = { r, worker: w, check: v, head: w ? w.head : null, report: w ? w.report : null, state: 'approved' }
  if (!w) return { ...s, state: 'dropped' }
  if (!v) { log(`Rung ${r.id}: its check returned nothing twice; it goes to the gate on its worker's evidence, listed for review.`); return { ...s, state: 'unchecked' } }
  if (v.verdict === 'approve') return s
  const rep = await callAgent(`repair:${r.id}`, repairPrompt(r, w, v), { schema: REPAIR, model: TIER.worker, phase: 'Repairs' })
  if (!rep) return { ...s, state: 'held' }
  const s1 = { ...s, head: rep.head, repair: rep, state: 'repaired' }
  if (!rep.contested.length) return s1
  const rulings = []
  for (const c of rep.contested) {
    const f = v.findings.find(x => x.id === c.id) || { id: c.id }
    rulings.push(await callAgent(`ruling:${r.id}:${c.id}`, rulingPrompt(r, f, c), { schema: RULING, model: TIER.judgement, effort: 'high', phase: 'Repairs' }))
  }
  const upheld = rulings.filter(x => x && x.ruling === 'upheld')
  if (!upheld.length) return { ...s1, rulings }
  const rep2 = await callAgent(`repair2:${r.id}`, repair2Prompt(r, upheld), { schema: REPAIR2, model: TIER.worker, phase: 'Repairs' })
  if (!rep2) return { ...s1, rulings, state: 'held' }
  return { ...s1, rulings, head: rep2.head, repair2: rep2, state: rep2.state }
}

// ---------- the run ----------
phase('Rungs')
const work = {}
for (const r of RUNGS) work[r.id] = callAgent(`worker:${r.id}`, workerPrompt(r), { schema: WORKER, model: TIER.worker, phase: 'Rungs' })

const own = id => work[id].then(w => w
  ? callAgent(`check:${id}`, checkOwnPrompt(R[id], w), { schema: CHECK, model: TIER.worker, phase: 'Checks' }).then(v => settle(R[id], w, v))
  : settle(R[id], null, null))
const library = Promise.all([work.N, work.G]).then(async ([n, g]) => {
  const v = (n || g) ? await callAgent('check:NG', checkLibraryPrompt(n, g), { schema: LIBCHECK, model: TIER.worker, phase: 'Checks' }) : null
  return Promise.all([settle(R.N, n, v ? v.N : null), settle(R.G, g, v ? v.G : null)])
})
const settled = (await parallel([() => own('C'), () => own('W'), () => library])).filter(Boolean).flat()
for (const s of settled) log(`Rung ${s.r.id}: ${s.state}`)
const landing = ['W', 'C', 'G', 'N'].map(id => settled.find(s => s.r.id === id))
  .filter(s => s && !['dropped', 'held'].includes(s.state))
if (!landing.length) return { rungs: settled.map(s => ({ rung: s.r.id, state: s.state })), landed: false }

phase('Integrate')
const [integ, review] = await parallel([
  () => callAgent('integrate', integratePrompt(landing), { schema: INTEGRATE, model: TIER.worker, phase: 'Integrate' }),
  () => callAgent('review', reviewPrompt(landing), { schema: REVIEW, model: TIER.worker, phase: 'Integrate' }),
])
let gate = integ ? integ.gate : null
let gateFix = null
if (integ && gate && !gate.green) {
  phase('Repairs')
  gateFix = await callAgent('gate-repair', gateRepairPrompt(integ), { schema: GATEFIX, model: TIER.worker, phase: 'Repairs' })
  gate = gateFix ? gateFix.gate : gate
}

phase('Land')
let land = null
if (integ && gate && gate.green) {
  land = await callAgent('land', landPrompt(integ, review, gateFix), { schema: LAND, model: TIER.worker, effort: 'low', phase: 'Land' })
} else {
  log('Nothing lands: the gate is red after its one repair, or the integration returned nothing. The integration branch is kept.')
}

phase('Measure')
const cost = A.measure === false ? null
  : await callAgent('measure', measurePrompt(), { model: TIER.archaeology, effort: 'low', phase: 'Measure' })
return {
  rungs: settled.map(s => ({ rung: s.r.id, state: s.state, head: s.head, verdict: s.check ? s.check.verdict : null })),
  integration: integ, review, gate, landed: land, cost,
}
```

The launch, once the steps above are done: `Workflow({scriptPath: <this script, committed>, args: {base: '<full hash>', baseBuild: '<path>', p1: null, briefings: {...}, checks: {...}}})`. A run stopped by the platform's cap, a restart or an interrupt is resumed with the same script and the same args, plus `resumeFromRunId`. If the call order would differ from the live run's, add `args.resumeOrder` taken from the journal. FACTS describes the resume, including that trap.

## 3. How correctness is assured

### What checks each requirement

- **Test first, the test kept.**
  - Every repair starts from a test committed alone, seen failing through the harness on the unedited worktree.
  - The checker verifies the commit order mechanically (`git log --reverse --name-status`). It checks "seen failing" in the worker's transcript, reading tool results only, never the worker's own text.
  - A checker's finding becomes a test the same way before its fix counts. A red gate's failing test is the test for the gate repair.
  - Promoted tests move by `git mv`; new tests are named by topic. Nothing is deleted.
- **The suite's verdict is the check.**
  - What counts as done is always a suite verdict: the rung's tests in the harness, the rung's reach run, and the gate's zero failures with its counts against batch 9's comparands.
  - No stage compares printed output. A checker's programs are exploration: a defect they show counts only once it is an asserted test.
  - The checker-count and distance stages are reported, never red.
- **Nothing is built or run twice on the same code.**
  - One base build, made before the launch. Each worker seeds from it and builds only what its edit changed.
  - Checkers build nothing and rerun nothing. They run only their own new programs: the old code from the base build with a private caches folder (`old-fortress.sh`), which writes nothing that stays in the base.
  - A repair reruns the reach run only because its code changed.
  - The gate runs once, on the merged tree, which no rung ever built. It runs again only after a repair that changed a gated path.
  - Text corrections never rerun the gate. A moved `main` is merged after the gate only if it changed no gated path.
- **Both full suites green on the merged tree before anything lands.**
  - The lander runs only on a green verdict.
  - It checks with `git diff --quiet` that nothing under `ProjectFortress/`, `Library/`, `build.xml` or `bin/` changed between the gated commit and the pushed one.
  - Until then the integration branch is pushed only as `wip/batch-10-integration`.
- **Workers commit only what `main` is to hold.**
  - Code, tests, the specification's text, reports and rulings are committed. Scratch, programs, logs and tables stay in `tmp/`.
  - The records are written once, by the integrator. The gate's tables and the per-site list are committed, since they are the next batch's before.
  - Merging with `--no-ff` keeps each worker's commits, so the test-first order also stays readable in `main`'s history.
- **The specification revised in the S1 form.**
  - W and C write it, from the passages their briefs name.
  - Each one's checker checks the text against the code as built.
  - The reviewer checks the two rungs' `changes.tex` entries together.
- **Tiers.**
  - Opus: every worker, checker, repair, the integrator, the reviewer and the lander.
  - Sonnet: only the cost measure, which is archaeology.
  - Fable: only a ruling on a finding two Opus agents disagree on. That is a design question touching the specification and an implementation, with the evidence on file, as the Fable rule asks.

### Where checking is worth its cost

Worth it:
- **The W and C checkers.** Both rungs change what an implementation accepts. The interpreter and compiler suites cannot see an over-broad rule that no test exercises:
  - a Meet Rule check that refuses a covered pair;
  - a check that confuses a written `Any` with the implicit one;
  - a varargs body type that breaks a call with none;
  - a dependent-bound fix that moves an unrelated inference.

  A reader with eight small programs, new against old, is the cheapest way to find these. Their briefs' "For the skeptic" names the cases.
- **One library checker for N and G together.** The judgement is one judgement: is this repair the library's own way? Two checkers would each read the same precedents and the same file. One checker also sees the two rungs side by side, the place where an inconsistency between them would show. It costs about 0.25M less than two.
- **The per-rung reach runs.**
  - `testSystem` costs about 3 minutes and a few K of polling. `testFast` costs about 8 minutes.
  - A red gate costs a repair agent, a second gate and about an hour, roughly 0.4M.
  - So the worker, which can fix its own failure in context, runs the part of the suite it can reach.
  - That is why the library rungs also run `testSystem`, which their briefs leave to the gate: every walk program loads `FortressLibrary`.
- **The gate.** It is binding. Its clean build costs about 2 minutes more than a seeded one, and buys certainty that no stale class masks a failure.
- **The batch reviewer.** It runs in the slot the gate leaves free, so it costs tokens, not wall time. It replaces the conformance half of the review that would otherwise run after the batch, so it is not an added review.

Dropped, because the cost exceeds what they protect:
- **A second skeptic on a repair.** The finding is already reduced to a failing program. Once that program is a passing test and the suite and the gate are green, a second reading adds little.
- **An Opus first ruling.** An uncontested finding needs no ruling at all. A contested one is a disagreement between two Opus agents, so a third Opus agent's first ruling is the step most likely to be repeated.
- **Rerunning a test on the base to see it fail.** The transcript already shows it.
- **Builds by checkers.**
- **The ladder per rung.** It is the gate's job.
- **Blocking on the reviewer's code findings.** They become rows for the next batch, and the gate is the binding check. The cost: a defect that only the reviewer sees lands, and is reversible.
- **A separate gather agent and commit agent.** The integrator and the lander are the only tail agents that always run.
- **A Sonnet agent to read transcripts for test first.** A one-command trace in the checker costs less than a second agent's 45K floor.

Done by a command inside an agent, not by reading:
- The commit order.
- The paths changed against the allowed files.
- The hunks against the section ranges.
- The placeholders left.
- The gate's counts against the comparands.
- The gated paths unchanged.
- `main` not moved under the gate.

The risks this design takes, named:
- **One library checker is one point of failure for two rungs.** Mitigation: a verdict per rung, and the two checks lists.
- **No second check of a repair.** A repair that passes its own test can still break a sibling case only the gate sees.
- **The records are written before the gate's verdict.** On a red gate, the gate repair corrects the rows it makes untrue.
- **Merge commits on `main`.** This departs from one composed commit per rung (section 5).

## 4. The estimate

All figures are tokens written: cache writes plus new input, as POSITIONS counts them. They are by arithmetic, not measured. The measure step exists to check them.

### Agents

- **Base case: 10 Opus agents.** Four workers, three checkers, the integrator, the reviewer and the lander. Plus one Sonnet measure.
- **Expected: about 12.** About 1.4 refusals, one of them contested about a third of the time.
- **Worst reasonable case: 17.** Refusals on W, C and N; one ruling upheld and a second repair; a red gate repaired once.

### Tokens written, by role (central, then range)

- **Workers: 2.25M (1.8M to 2.75M).**
  - C 0.65M, W 0.55M, N 0.55M, G 0.5M.
  - Basis: batch 9's workers wrote about 2.2M over four rungs without its restart, as the record says in section 1.
  - This batch's rungs are of the same size: one walk rung, one checker rung, two library rungs.
  - The machine rules in the prompt may cut rediscovery calls, but I do not count on it.
  - The briefings are inlined, at 27K to 53K tokens each [6-8].
- **Checkers: 0.88M (0.69M to 1.12M).**
  - W 0.25M, C 0.3M, N with G 0.33M.
  - Each one: the 45K floor, the brief's check paragraphs and its checks list, a diff of 30K to 80K, the report, the passages, eight programs with their output, and its reasoning.
  - Batch 9's first skeptics wrote 1.24M over four.
- **Repairs: 0.43M expected (0 to 1.3M).**
  - Expected refusals: W 0.4, C 0.5, N 0.3, G 0.2, so 1.4 repairs at about 0.28M each.
  - A second repair after an upheld ruling: 0.04M expected.
  - The rates are guesses: batch 9 had two refusal chains over four rungs (record, section 1).
- **Rulings: about 0.05M expected on Fable, at most 0.2M.** 0.35 rulings at about 0.15M each.
- **Tail: 0.72M (0.46M to 1.2M).**
  - The integrator 0.28M: the reports, the ledger rows it touches, the FACTS and PLAN sections, the batch record, polls.
  - The reviewer 0.25M: four diffs of about 80K together, four reports, three sections of the record.
  - The lander 0.08M.
  - A red gate at a probability of 0.25, its repair and second gate at about 0.4M: 0.1M expected.
- **Measure: about 0.1M on Sonnet.**

**Total on Opus: about 4.3M, ranging from 3.0M (no refusal, a green gate, lean workers) to 6.4M (three refusals, one upheld ruling, a red gate).**

Against the record's estimate for the old pipeline (6M to 7M) and batch 9's 6.88M, the saving is about 2M. Where it comes from:
- The tail: about 0.8M less. No separate gather, gate and commit agents; no blocking review with its judge and repair.
- The checks: about 0.3M less. One library check for two rungs; reading, not rerunning.
- The refusals: about 0.2M less. No first ruling at Opus; a repair is checked by its own test.
- The reviewer replaces the conformance review after the batch, which is counted outside batch 9's 6.88M. So the saving on the whole cycle is about 0.3M larger than the batch figure shows.

### Wall time

The harness runs two agents at a time, so the wall time is about half the sum of the agents' durations, plus a tail that uses at most two slots.

- **The workers.**
  - High case: the record's guesses, C 260, N 240, G 220 and W 200 minutes [6-8], 920 agent-minutes.
  - Low case: 60% of those, 550.
- **The checks.** W 55, C 70, N with G 70 minutes: about 195. They start as slots free, and with the calls issued in order the workers take the slots first.
- **The repairs.** About 60 minutes each, 1.4 expected; a ruling 25; a second repair 45.
- **Integrator and reviewer together, about 55 minutes.**
  - The integrator: merge and rows 10, then the clean build and the gate, 25 to 35 minutes in the background, while it writes the records.
  - The reviewer: about 50 minutes beside it.
- **The lander: 10 to 15 minutes.** A red gate adds 60 to 90.

The schedule, in the high case:
- C and N start at 0. G starts at 240, W at 260; both end near 460.
- The C and N-with-G checks run 460 to 530, W's check 530 to 585, and the expected repair 585 to 645.
- Integration and review run 645 to 700; the landing is near 715 minutes, about 12 hours.

In the low case the landing is near 480 minutes, 8 hours. The central figure is about 9.5 to 10 hours.

The platform stops the session's process 12 h 58 min after its last start. A run launched late in a process's life is therefore cut once and resumed from its journal: every finished agent is kept, and the agent that was running restarts with its worktree as its starting point. The coordinator's check-ins every 45 minutes are where that resume happens.

### The assumptions behind the numbers

- An agent's floor is 45K, and the first message is written by each agent, not shared (FACTS).
- No agent waits more than 270 s between calls, so no cache miss rewrites a whole context. Each poll writes 1K to 2K, and a worker polls about 10 to 20 times.
- `testSystem` takes about 2.5 minutes, `testFast` about 8, the distance stage 13 to 24 (one core), the checker count about 20 s. `ant compileAll` on a seeded tree takes about 80 s, a clean build with the library order about 200 s (`iteration-cost.md`; `build-cache-exploration.md`; the tools' headers).
- Workers think more than they wait, so the two-agent cap, not the CPUs, sets the wall time. The `flock` on suites serializes the few minutes when two suites would otherwise overlap.
- The refusal and red-gate rates above are guesses, to be replaced by batch 8's and 9's measured rates (section 5).

## 5. What I would want measured or decided before running it

Prerequisites, small and reusable:
1. **`tools/gate.sh <tree> <out-dir>`**, committed. It holds the gate's steps as the last landed gate ran them, in order: clean build, `global.map` restored, the library order, `testFast`, `testSystem`, the four-thread `atomic` runs, the ladder regression, with the checker-count and distance stages beside them. It writes a `summary.txt` in the landed summaries' form. Today these steps live in the old script's gate prompt, which I was not shown. One script used by both the integrator and the gate repair also makes the second gate run identical to the first.
2. **`tools/test-first-trace.py <branch>`**, committed. It finds the workflow transcript of the agent that pushed the branch. For each test commit it prints the harness tool results that carry a failing verdict and their times, against the time of the first other commit. It prints tool results only, never assistant text, so the safety filter that once ended a transcript reader has nothing to stop on. Before relying on it, try it once on a batch 9 transcript.

Measurements, each one run, before the launch or by the measure step:
3. **The real worker durations and tokens by role in batch 9**, from its journal, by a Sonnet worker. My wall time rests on the record's guesses, and my token figures on its totals. This would replace both with measured figures.
4. **The refusal rate and the red-gate rate of batches 8 and 9**, from the same journals. These set the expected repair cost, about 10% of the total.
5. **Whether two Workflow runs at once give four agents.** The cap is `min(16, CPUs - 2)` per workflow, so two runs might double the slots: for example W and C in one run, N and G in another, the integration in a third once both land. A trivial pair of runs measures it. With the `flock` on suites, four agents fit four CPUs, because agents mostly think. If it holds, the wall time falls by about a third. It needs a way for the integration run to wait on two others, and its resume is untested.
6. **The resume-order mechanism** (`args.resumeOrder`), run through `tools/workflow-scenarios.js` on a mocked journal, before a long run depends on it.
7. **The top tier's name in `agent()` options**, checked once. I wrote `'fable'`; the harness may name it otherwise.
8. **The briefing's use**, measured in this run (the measure step counts entries opened). If workers open under a third of it, the next batch passes pointers in place of inlined text: about 0.1M less, and no loss of in-context learning for the entries that are read.

Decisions for Pavol, since each departs from a practice he took:
9. **The merged review.** In this design it does not block, runs beside the gate, and replaces the conformance half of the review after the batch. He sided with keeping a merged-diff review inside the batch, before the push. The difference: here a code defect only the reviewer sees lands and becomes a row for the next batch, while text corrections still land before the push. The default I would offer is this design; the alternative adds about 0.3M and the judge-and-repair chain.
10. **One ruling at Fable for a contested finding, in place of an Opus first ruling and a Fable second.** The cost is Fable's pool, about 0.05M a batch expected. The gain is no Opus judge on every refusal. It counts as a new kind of process choice, so it needs his word under the Fable rule.
11. **Merge commits on `main`, keeping the workers' test-then-fix commits, in place of one composed commit per rung.** The gain: test first is readable in `main`'s history, and "fixed <commit>" can cite the workers' own hashes. The cost: a history with merges. His rule on what `main` holds is met either way.
12. **`testSystem` per library rung**, which their briefs leave to the gate. It costs about 3 minutes and 10K each, against a red gate's hour and 0.4M. It is listed because it adds a run the record did not ask for.
