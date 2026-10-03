<!-- A design experiment, written 2026-10-03 by a top-tier worker for Pavol and the coordinator, blind to the project's batch pipeline (the batch script, its manual, the batch records' sections 6 to 8, the reviews and post-mortems were not opened). Read for it: `coordinator/CLIMB-BATCH-10.md` sections 1 to 5; `coordinator/POSITIONS.md`, "The specification's revision" and "How we work"; `coordinator/FACTS.md`, "The harness and the gate" and "The container", and the entry "The true distance to the switch-over"; `coordinator/build-cache-exploration.md` sections 3 and 6; `coordinator/tools/seed-worktree.sh`, `old-fortress.sh`, `checker-count/run.sh` and `distance/run.sh`, their headers; `compile-ladder/rung-inference-walk/harness-one.sh`; `iteration-cost.md`, its gate lines; `protocol.md`, "Hard rules"; `build.xml`, the `fastTrack` and `systemShard` macros; the `workflow-authoring` skill. Nothing was built or run. The requirements that bind are POSITIONS' "Test first, the test kept", "The suite's verdict is the check", "Nothing is built or run twice on the same code", the full suites green on the merged tree, "What a batch commits", "The specification's revision", "Which tier runs what", "The Fable rule" and "Estimates in the project's units"; the rest of "How we work" was read as background. -->

# Climb batch 10, designed from its goals

## 1. The design in plain words

The batch is four pieces of work that share no code decision: W changes walk's load-time checks and one inference rule (Java under `interpreter/evaluator/`, interpreter tests, two specification passages); C repairs five checker defects and traces four crashes (Scala and Java under the checker, compiled tests, one specification passage); G and N repair one-off slips in disjoint sections of the one library (no Java or Scala, one or three walk tests each, the count and distance stages as their test). The files overlap only where git merges cleanly by construction: `FortressLibrary` by section between G and N, `changes.tex` by entry between W and C, `ProjectFortress/tests/` by file among W, G and N.

So the shape is: four workers, each in its own worktree seeded in 3 s from the one base build the coordinator built before the launch; each worker writes its tests first, sees them fail through the harness, commits them alone, then repairs, runs the one suite its edit can break (W the interpreter suite, C the compiler and library tracks, G and N nothing beyond the harness on their own tests) and, for C, G and N, the two stages once on its final tree; it commits only what `main` is to hold and pushes to its own `wip/` branch; it writes its report, with the ledger, FACTS and PLAN lines it owes, instead of editing those files. A skeptic per rung then reads: the branch's first commit (tests alone), the worker's transcript (the harness run that failed before the fix), the diff against the brief's checklist, and runs three to six small programs of its own on the rung's build and on the base build with a private cache. It builds nothing and reruns nothing. A refusal, on a closed list of grounds, gets one repair round in the same worktree and a second read narrowed to the refusal; a disagreement after that gets one ruling on Opus, and a ruling on the top tier only when the Opus judge says the question is one of design across two of the specification, the library and the implementation (the Fable rule's standing pre-approval). A rung that is not approved stays on its branch and its items go to the next record; the batch lands without it.

With two agents at a time on this box, the four rungs run longest first (C, W, then N, G), and each skeptic starts as its worker finishes, so the slots are never idle. One gather merges the approved branches onto `main`'s head in one more seeded worktree and composes the records from the four reports. One gate builds that merged tree once (`ant compileAll`, the library order) and runs, one after another with nothing else on the machine, `ant testFast`, `ant testSystem`, the compile ladder, the checker count and the distance. Green means the two suites at zero failures and no ladder file that passed before failing; the count and distance are reported. A red gate gets one repair in the merged tree and one more gate, since that is new code. A landing agent writes the gate's numbers into the landing note, commits the gate tables and the per-site list (the next batch's before), fast-forwards `main` and pushes.

What this leaves out that a longer pipeline might have: no separate review of the merged diff (the records check is the gather's; the code check is the gate's; the conformance review after the batch is Pavol's standing practice outside the run), no judge unless the skeptic and the repair disagree, no top-tier call unless flagged, no clean build anywhere (the base once, seeded copies everywhere, `compileAll` only on trees whose Java or Scala changed), no stage run on the base, no output comparison. The cost moves from the tail, which took about a quarter of batch 9, to the workers, where the work is.

## 2. The script

The script is a Workflow script; the coordinator launches it once, from the repository, with the arguments below, and resumes it with `resumeFromRunId` and byte-identical arguments if the platform's 13-hour stop or an interrupt kills it. Everything the agents must know is in their prompts; they read the rest of the knowledge base only where a prompt points. Models are named by tier alias, never by identifier.

**Before the launch, the coordinator:** builds the base once in a worktree at `main`'s head (`ant compileAll`, `git checkout -- default_repository/caches/global.map`, the library order; about 4 minutes; nothing is compiled or run there afterwards); checks `df -h /` and removes old `/tmp/fortress*rats` directories; extracts the four rung sections of the record into the arguments (`awk '/^### W\. /,0' ... | sed '/^### [^W]/,$d'`, each section from its heading to the next `###` or `##` line); finds the first free ledger row number; decides P1's line for W (null if its judgement has not landed); and keeps the arguments in a file, since a resume needs them byte for byte.

```js
export const meta = {
  name: 'climb-batch-10-from-goals',
  description: 'Climb batch 10: four rungs test-first in seeded worktrees, a skeptic each, one merge, one gate, one landing',
  phases: [
    { title: 'Rungs', detail: 'W, C, G, N: worker, skeptic, at most one repair round, a judge only on a disagreement' },
    { title: 'Merge', detail: 'the approved branches merged onto main in one seeded worktree; the records composed from the reports' },
    { title: 'Gate', detail: 'one build of the merged tree; testFast, testSystem, the ladder, the count and the distance, once' },
    { title: 'Land', detail: 'the gate tables and the landing note committed; main fast-forwarded and pushed' },
  ],
}

// args, byte for byte the same on a resume:
//   base        main's head at the launch, full hash (its code directories are cec70988b's)
//   baseBuild   the one base build, a worktree at `base` built once before the launch, never compiled or run in again
//   wtRoot      where the worktrees go, e.g. /home/user/wt-batch10
//   mainTree    /home/user/fortress
//   ledgerFrom  the first free ledger row number
//   before      the landed gate directory: explorations/compile-ladder/climb-batch-9/gate
//   p1          null, or the line the coordinator writes into rung W's answers line
//   topTier     the alias the harness resolves for the top tier (used for a second ruling only)
//   sections    { W, C, G, N }: each rung's section of CLIMB-BATCH-10.md, verbatim
const A = args
const FOOTER = 'Co-Authored-By: Claude <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB'

// Longest first: with two slots, the two longest start together and the tail is shortest.
const RUNGS = [
  { id: 'C', name: 'rung-checker-defects',    code: 'both', corpus: 'ProjectFortress/compiler_tests', stages: true,
    suite: 'after your last edit, once: the compiler and library tracks of testFast (the JUnit classes CompilerJUTest, LibraryJUTest and OtherCompilerJUTest as build.xml\'s fastTrack runs them, FORTRESS_THREADS=1, a private cache), and the ladder subset the brief names' },
  { id: 'W', name: 'rung-walk-meet',          code: 'java', corpus: 'ProjectFortress/tests',          stages: false,
    suite: 'after your last edit, once: ant testSystem in your worktree (about 4 minutes, all four cores), its verdict lines into the report' },
  { id: 'N', name: 'rung-number-order-slips', code: 'none', corpus: 'ProjectFortress/tests',          stages: true,
    suite: 'no suite run: harness-one on your own tests is your load check, since every interpreter test loads the library' },
  { id: 'G', name: 'rung-generator-slips',    code: 'none', corpus: 'ProjectFortress/tests',          stages: true,
    suite: 'no suite run: harness-one on your own tests is your load check, since every interpreter test loads the library' },
]

// ---- schemas -------------------------------------------------------------------------------------
const WORKER = { type: 'object', required: ['status', 'head', 'reportPath', 'tests', 'filesTouched', 'stops'], properties: {
  status: { type: 'string', enum: ['done', 'stopped'] },            // stopped: an item left as an XXX test with a row
  head: { type: 'string' }, reportPath: { type: 'string' },
  tests: { type: 'array', items: { type: 'object', properties: { file: { type: 'string' }, addedIn: { type: 'string' },
    failingLine: { type: 'string' }, passingLine: { type: 'string' } } } },
  filesTouched: { type: 'array', items: { type: 'string' } },
  stops: { type: 'array', items: { type: 'object', properties: { what: { type: 'string' }, where: { type: 'string' }, done: { type: 'string' } } } },
  after: { type: 'object', properties: { count: { type: 'number' }, distance: { type: 'number' }, byClass: { type: 'string' } } },
  notes: { type: 'string' } } }
const VERDICT = { type: 'object', required: ['verdict', 'grounds', 'notes', 'programsRun'], properties: {
  verdict: { type: 'string', enum: ['approve', 'refuse'] },
  grounds: { type: 'array', items: { type: 'object', properties: { ground: { type: 'string', enum: ['a', 'b', 'c', 'd', 'e', 'f'] },
    saw: { type: 'string' }, where: { type: 'string' }, repair: { type: 'string' } } } },
  notes: { type: 'array', items: { type: 'string' } },
  programsRun: { type: 'number' }, transcriptFound: { type: 'boolean' } } }
const RULING = { type: 'object', required: ['ruling', 'reason', 'designQuestionAcrossTwo'], properties: {
  ruling: { type: 'string', enum: ['approve', 'drop'] }, reason: { type: 'string' },
  designQuestionAcrossTwo: { type: 'boolean' }, aspects: { type: 'array', items: { type: 'string' } } } }
const GATHER = { type: 'object', required: ['mergedHead', 'merged', 'conflicts', 'rows'], properties: {
  mergedHead: { type: 'string' }, merged: { type: 'array', items: { type: 'string' } },
  conflicts: { type: 'array', items: { type: 'string' } }, rows: { type: 'array', items: { type: 'string' } }, stopped: { type: 'string' } } }
const GATE = { type: 'object', required: ['green', 'testFast', 'testSystem', 'ladder', 'count', 'distance', 'failing'], properties: {
  green: { type: 'boolean' },
  testFast: { type: 'object', properties: { tests: { type: 'number' }, failures: { type: 'number' }, errors: { type: 'number' } } },
  testSystem: { type: 'object', properties: { tests: { type: 'number' }, failures: { type: 'number' }, errors: { type: 'number' } } },
  ladder: { type: 'object', properties: { passed: { type: 'number' }, stoppedPassing: { type: 'array', items: { type: 'string' } } } },
  count: { type: 'number' }, distance: { type: 'object', properties: { total: { type: 'number' }, byClass: { type: 'string' }, crashes: { type: 'number' } } },
  failing: { type: 'array', items: { type: 'string' } }, seconds: { type: 'object' } } }
const LAND = { type: 'object', required: ['landed', 'pushed'], properties: { landed: { type: 'string' }, pushed: { type: 'boolean' }, stopped: { type: 'string' } } }

// ---- one retry for an agent the harness marks failed after it delivered (FACTS, the agent() entry) ----------
async function call(prompt, opts) {
  for (let i = 0; i < 2; i++) {
    const head = i ? 'An earlier attempt at this task may have left work in the worktree, committed or not. Read its state first (git status, git log, the report) and continue from it; redo nothing finished.\n\n' : ''
    const r = await agent(head + prompt, opts)
    if (r) return r
    log(`${opts.label}: returned nothing${i ? '' : '; one retry'}`)
  }
  return null
}

// ---- prompts --------------------------------------------------------------------------------------
const wtOf = r => `${A.wtRoot}/${r.name}`

const buildRule = r => r.code === 'none'
  ? 'You edit no Java or Scala. Walk re-analyses an edited library source on its next run and needs nothing; a compiled run of an edited library component needs `fortress compile` of that component first (an edited .fsi of the five prelude components: all five in library order).'
  : 'After a Java or Scala edit: `ant compileAll` in your worktree (about 80 s on the seeded tree, since only the changed sources recompile), then `git checkout -- default_repository/caches/global.map`. Before any compiled run (fortress compile or run, the compiler harness, the ladder) the library order once (explorations/repo-internals.md, "Compile order matters", about 100 s). harness-one, the two stages and the suites use their own caches and need neither.'

const stagesRule = (r, wt) => r.stages
  ? `THE TWO STAGES, once, after your last edit: \`explorations/coordinator/tools/checker-count/run.sh ${wt}/tmp/count.txt ${wt}/tmp/scratch\` (20 s) and \`explorations/coordinator/tools/distance/run.sh ${wt}/tmp/distance.txt ${wt}/tmp/scratch\` (13 to 24 minutes, one core, in the background and polled). Your before is the landed set at ${A.before}/ and the per-site list explorations/compile-ladder/gate/distance-sites.tsv; never run a stage on the base. Read your after by class through the per-site list with each line mapped through your diff (ledger row 577: an insertion moves the stage's fixed ranges), and name every site that moved, cleared or appeared.`
  : 'THE TWO STAGES: not run. Every path you edit is one the checker-count and distance stages do not read (walk\'s evaluator, the interpreter tests, the specification); say so in the report with the paths.'

const prefix = (r, wt) => `You are the worker of rung ${r.id} (${r.name}) of climb batch 10 of the Fortress revival. Your brief is the rung's section of the batch record, at the end of this message, after the working rules. The rules bind. The brief describes the problem, not the solution: list every way the language, the library and the tree offer before you choose, and report each choice with the ways not taken and the evidence that settled it.

THE TREE. First \`df -h /\`: under 2 GB free, remove /tmp/fortress*rats directories older than a day; still under, stop and report. Make your worktree from the one base build, never a clean build: \`${A.mainTree}/explorations/coordinator/tools/seed-worktree.sh ${A.baseBuild} ${wt} wip/${r.name}\` (3 s; it checks out branch wip/${r.name} cut from ${A.base}). Work only there: \`cd ${wt} && export FORTRESS_HOME=${wt} && source explorations/experiment/env.sh\`. Never edit, build or run anything in ${A.mainTree} or in ${A.baseBuild}. Scratch (programs, captures, logs, tables, copies of tools) goes under ${wt}/tmp/, which is ignored and never committed.

TEST FIRST, THE TEST KEPT. Before any edit: write the tests the brief names in ${r.corpus}/ (promote an existing XXX file with git mv where the brief says so, by topic), run each alone through the harness on the unedited tree and see it fail, then commit the tests alone as the first commit on your branch. After the edit, run each the same way and see it pass; quote both harness lines in the report. Interpreter test: \`explorations/compile-ladder/rung-inference-walk/harness-one.sh ${wt}/tmp/h1 <file.fss> [<file.test>]\`. Compiled test: the same shape over the compiler harness (the JUnit class build.xml's fastTrack id="compiler" runs, over a directory holding only your files, a private cache, FORTRESS_THREADS=1); a runner exists in the repository: \`grep -rl ONE_JVM explorations/compile-ladder --include='*.sh' | head -3\`, use its shape. A test asserts the value that matters with the suite's own mechanisms (an assert in an interpreter test; run_out_equals or compile_err_contains in a compiled one); no expected-output file, no output comparison, no baseline run. A test captures the core of the problem as a clean minimal program, not the shape a probe met it in, and cites the specification by file and section, never by line. A repair you cannot finish leaves its test as an XXX expected failure with a ledger row in your report; that item's status is stopped and the batch still lands.

NOTHING BUILT OR RUN TWICE. ${buildRule(r)} Never wipe a cache. The old code is the base build, run only as \`explorations/coordinator/tools/old-fortress.sh ${A.baseBuild} ${wt}/tmp/old-caches <fortress arguments>\`, which uses a private copy of its caches; nothing else touches ${A.baseBuild}. THE ONE SUITE RUN: ${r.suite}. ${stagesRule(r, wt)}

WAITS. A Bash call dies at 10 minutes and your prompt cache at 5. Run anything over 3 minutes in the background, its output to a file under tmp/ and a done-file at its end, and wait in steps of at most 270 s each (Monitor on the done-file with a 270000 ms limit, repeated), so that you never wake to a cold cache.

WHAT YOU COMMIT. Only what main is to hold: the Fortress change; the tests; the specification passages the brief names, in the S1 form (a \\revision{<label>}{...} callout at the changed passage, as Specification/basic/inference.tex:255 shows one; the entry in Specification/appendices/changes.tex with the reason, the original sentences quoted with their path and line in Specification-1.0-frozen/, and route C with what reversing would take; the full reasoning in your decision record); and your report explorations/compile-ladder/${r.name}/REPORT.md with its decision-record.md. No captured output, log, list or copy of a tool. Commit as you go, each commit one command naming its paths, \`git add -- <paths> && git commit -m "<message>" -- <paths>\`, the message ending with these two lines exactly:
${FOOTER}
and push after each commit, \`git push -u origin wip/${r.name}\`. Never touch main, the ledger, FACTS.md, PLAN.md or the batch record: the lines you owe them go into your report, where the gather takes them.

THE REPORT, explorations/compile-ladder/${r.name}/REPORT.md. (1) What was built, in plain words. (2) Each test: its file, the commit that added it alone, the harness line that showed it failing before the edit and the one that showed it passing after. (3) Each repair: the ways listed, the one taken, what settled it (file and line; the text's section; the library's precedent). (4) What you measured: the suite's verdict lines; the stages' totals by class against the before, each moved site named. Nothing predicted. (5) Every stop of the brief you met: where, and what you did (listed, never asked). (6) The lines you owe the records: each new ledger row's full text in the ledger's row form, unnumbered (the gather numbers them); each note on an existing row; each FACTS line (the fact, its source, its test, no date); each PLAN routing line. (7) What comes back to Pavol, as the brief's paragraph of that name asks. (8) The files you touched, against the brief's "Files it may touch". Nothing in the brief is a question for Pavol: a default is taken and listed. Then return the structured output.

THE BRIEF, the record's section for your rung, verbatim:
`

const workerPrompt = r => prefix(r, wtOf(r))
  + (r.id === 'W' && A.p1 ? `\nTHE ANSWERS LINE, as the coordinator writes it at the launch (it replaces the section's first paragraph): ${A.p1}\n\n` : '\n')
  + A.sections[r.id]

const skepticPrompt = (r, w, refusal, rep) => `You are the skeptic of rung ${r.id} (${r.name}) of climb batch 10. You build nothing and repeat nothing the worker ran: you read, and you run small programs of your own. The worker's worktree ${wtOf(r)} holds its build and branch wip/${r.name} at ${(rep || w).head}; its report is ${wtOf(r)}/${w.reportPath}. New code: \`cd ${wtOf(r)} && export FORTRESS_HOME=${wtOf(r)} && source explorations/experiment/env.sh\`, then bin/fortress. Old code: \`explorations/coordinator/tools/old-fortress.sh ${A.baseBuild} ${wtOf(r)}/tmp/skeptic-old-caches <fortress arguments>\`; nothing else touches the base build. Your programs go under ${wtOf(r)}/tmp/skeptic/; you commit nothing. Waits in steps of at most 270 s, as the worker's rule.

READ, in this order. (1) The brief below: its paragraphs "For the skeptic", "Stops" and "Files it may touch" are your checklist. (2) \`git log --stat ${A.base}..wip/${r.name}\`: the first commit adds or promotes tests and nothing else. (3) \`git diff ${A.base}..wip/${r.name}\`: the code, the library, the specification and the tests. (4) The worker's report, and its tables under tmp/ where the report cites them. (5) The worker's transcript, for test-first only: the newest file among \`grep -l '${r.name}' ~/.claude/projects/*/*/subagents/agent-*.jsonl\`; read only its tool calls and their results, never the assistant's own text (jq: the tool_use entries' .input.command and the tool_result entries' content); find the harness run of each test before the fix commit, and its failing line. If no transcript is found, say so; it is a ground only if the report's quoted failing line is missing too.

CHECK. Each item of "For the skeptic" against the diff and the text or precedent it names. Each "Stops" item against the diff. Each touched file against "Files it may touch". Three to six programs of your own, the ones "For the skeptic" asks for first, each run on the new code and on the old; a value or verdict that differs is a finding unless the brief says it should move. The worker's suite verdict and stage tables you read from its report and its tmp/, never rerun.

VERDICT: approve or refuse. A refusal names grounds from this list only: (a) a test not seen failing before its fix, or not committed alone first; (b) a stop of the brief met and not listed; (c) a repair against the text or the library's practice the brief cites, with the citation; (d) a file touched outside the brief's list; (e) a walk or compiled value changed without the brief's warrant; (f) a test that cannot fail for the reason it names. Anything else is a note, listed for Pavol with the landing. For each ground: what you saw, where (file:line, program, command), and what a repair would be.
${refusal ? `THIS IS THE SECOND READ. A repair worker answered the refusal below with commits up to ${rep ? rep.head : w.head}. Check only the refusal's grounds against those commits and the repair's report; do not reopen what the first read approved.\nTHE REFUSAL: ${JSON.stringify(refusal.grounds)}\n` : ''}
THE BRIEF, verbatim:
${A.sections[r.id]}`

const repairPrompt = (r, w, s) => `You are the repair worker of rung ${r.id} (${r.name}) of climb batch 10. The worktree ${wtOf(r)}, its build and its branch wip/${r.name} (head ${w.head}) are the first worker's; its report is ${wtOf(r)}/${w.reportPath}. Work only there, with FORTRESS_HOME=${wtOf(r)} and explorations/experiment/env.sh sourced. The skeptic refused on these grounds and nothing else:
${JSON.stringify(s.grounds, null, 1)}
Repair exactly those. A ground (a) or (f) means the test is rewritten or added first and seen failing through the harness before any further edit, and committed alone. ${buildRule(r)} Never wipe a cache; never touch ${A.mainTree} or ${A.baseBuild}. Waits in steps of at most 270 s. Commit only what main is to hold, each commit one command naming its paths, the message ending with
${FOOTER}
and push to wip/${r.name}. Add a section "The repair" to the report: each ground, what you changed, the harness lines. Return the structured output with the new head.

THE BRIEF, for the rules it cites:
${A.sections[r.id]}`

const rulingPrompt = (r, w, s1, rep, s2, first) => `You rule on rung ${r.id} (${r.name}) of climb batch 10, where the skeptic refused twice. Read, in ${wtOf(r)}: the brief below; the first refusal; the repair's report section and commits (${rep ? rep.head : 'no repair was returned'}); the second refusal. Build nothing and run nothing; read the diff \`git diff ${A.base}..wip/${r.name}\` where a ground needs it. Rule approve (the rung merges as it stands, the skeptic's grounds listed for Pavol as notes) or drop (the branch stays unmerged, its items go to the next record), with the reason in the record's words: the decision on record or the text that settles it. Say also whether the disagreement is a design question that touches two or more of the specification, the library and the implementation, with no decision on record settling it.${first ? ' You are the second ruling, on the top tier, because the first ruling found such a question: the first ruling is below as advice, not as the answer.' : ' If it is, the top tier rules after you and your ruling is advice.'}
FIRST REFUSAL: ${JSON.stringify(s1.grounds)}
SECOND REFUSAL: ${JSON.stringify(s2 ? s2.grounds : 'the second skeptic returned nothing')}
${first ? 'FIRST RULING: ' + JSON.stringify(first) : ''}
THE BRIEF:
${A.sections[r.id]}`

const gatherPrompt = (approved, all) => `You are the gather of climb batch 10. Build nothing, run nothing. Approved rungs, in the record's order: ${JSON.stringify(approved.map(x => ({ rung: x.rung, branch: x.branch, head: x.worker.head, report: `${A.wtRoot}/${x.name}/${x.worker.reportPath}`, status: x.worker.status, skepticNotes: x.skeptic ? x.skeptic.notes : [] })))}. Not merged: ${JSON.stringify(all.filter(x => x.status !== 'approved').map(x => ({ rung: x.rung, why: x.why })))}.
1. \`cd ${A.mainTree} && git fetch origin main\`. Check that main's code is the base's: \`git diff --stat ${A.base} origin/main -- Library ProjectFortress Specification Documentation build.xml bin\` prints nothing; if it prints anything, stop and return it as stopped. Make the merged worktree from the base build, the branch cut from main's head: \`explorations/coordinator/tools/seed-worktree.sh ${A.baseBuild} ${A.wtRoot}/merged wip/batch-10-merged origin/main\`.
2. In it, merge each approved branch with \`git merge --no-ff\` in the order N, G, W, C (the two library rungs first, since they share FortressLibrary). A conflict is resolved by ownership as the record's section 4 gives it: FortressLibrary by section and declaration, changes.tex by entry, tests/ by file. A conflict outside those is a stop: report it, merge nothing more.
3. Compose the records from the reports' section 6, in the merged worktree: in explorations/fortress-gap-ledger.md append the new rows numbered from ${A.ledgerFrom} in the order W, C, G, N, each in the ledger's row form, and apply the notes on existing rows; in explorations/coordinator/FACTS.md add each report's FACTS lines under the heading they belong to, in the file's timeless form; in explorations/coordinator/PLAN.md the routing lines; and write the landing note explorations/compile-ladder/climb-batch-10/RECORD.md: what each rung built, every stop listed for Pavol, what comes back to him from each report's section 7, the skeptics' notes, the rungs not merged and why, and the token GATE-PENDING where the gate's numbers go. Commit these in one commit naming its paths, the message ending with
${FOOTER}
and push wip/batch-10-merged. Return the merged head, the branches merged in order, every conflict and how it was resolved, and the row numbers given.`

const gatePrompt = (g, attempt, fix) => `You run the gate of climb batch 10, attempt ${attempt}, on the merged tree ${A.wtRoot}/merged (branch wip/batch-10-merged, head ${fix ? fix.head : g.mergedHead}). You change no file outside explorations/compile-ladder/climb-batch-10/gate/ and explorations/compile-ladder/gate/distance-sites.tsv, and you commit nothing. \`cd ${A.wtRoot}/merged && export FORTRESS_HOME=${A.wtRoot}/merged && source explorations/experiment/env.sh && df -h /\`.
Build once: \`ant compileAll\` (in the background, polled in steps of at most 270 s), then \`git checkout -- default_repository/caches/global.map\`, then the library order (explorations/repo-internals.md, "Compile order matters"). A build failure is a red gate: return it with the error's lines.
Then one at a time, nothing else running, each in the background with its output to a file and polled in steps of at most 270 s: (1) \`ant testFast\`, read from ProjectFortress/TEST-RESULTS; (2) \`ant testSystem\`, the four shards summed; (3) the ladder: compile and run each file of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt and compile the microGPT components to the phase explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.md names; (4) \`explorations/coordinator/tools/checker-count/run.sh\` and \`explorations/coordinator/tools/distance/run.sh\`, their out-files in the gate directory, their scratch under tmp/.
Write explorations/compile-ladder/climb-batch-10/gate/summary.txt (each suite's tests, failures and errors; every failing test's name and first message; the ladder's files that stopped passing; the count; the distance total and by class against ${A.before}/distance.txt; each stage's seconds and the load), checker-count.txt and distance.txt, and the per-site list to explorations/compile-ladder/gate/distance-sites.tsv. Green: testFast and testSystem at zero failures and errors, and no ladder file that passed before failing. The count and the distance are reported, never red. Return the structured output.`

const gateRepairPrompt = (g, gate) => `The gate of climb batch 10 is red on the merged tree ${A.wtRoot}/merged (head ${g.mergedHead}): ${JSON.stringify(gate.failing)}; the summary is explorations/compile-ladder/climb-batch-10/gate/summary.txt there. A deeper pass, not a halt: identify the source across the merged rungs as one tree (no bisection, no revert of a rung), rework it in the merged worktree. The rungs' intent is in their reports under explorations/compile-ladder/rung-*/REPORT.md. Where the fix changes code, the failing test or a new one is seen failing through the harness first (harness-one for an interpreter test, the compiler harness for a compiled one, as the worker's rule) and committed alone; rebuild only what you edit (ant compileAll after Java or Scala, global.map restored, the library order before a compiled run); never wipe a cache; waits in steps of at most 270 s. Commit only what main is to hold, each commit one command naming its paths, the message ending with
${FOOTER}
and push wip/batch-10-merged. Add to RECORD.md a section "The gate's repair": the cause, the change, the harness lines. Return the structured output with the new head.`

const landPrompt = (g, gate) => `Land climb batch 10. In ${A.wtRoot}/merged: replace GATE-PENDING in explorations/compile-ladder/climb-batch-10/RECORD.md with the gate's numbers from explorations/compile-ladder/climb-batch-10/gate/summary.txt (the suites' counts; the ladder; the count; the distance total and by class against the before, each class's movement); commit the gate directory, explorations/compile-ladder/gate/distance-sites.tsv and the note in one commit naming its paths, the message ending with
${FOOTER}
and push wip/batch-10-merged. Then in ${A.mainTree}: \`git fetch origin main\`. If origin/main is the merge base of wip/batch-10-merged, \`git merge --ff-only wip/batch-10-merged\` on main. If main moved and every moved path is under explorations/, merge origin/main into wip/batch-10-merged in the merged worktree (records only; the gated code is unchanged), push it, then fast-forward main. If any moved path is outside explorations/, stop and return it as stopped: the gate does not cover it. Leave other workers' uncommitted edits in ${A.mainTree} alone. Push \`git push origin main\` and then \`git push origin main:claude/worker-brief-fable-vnnuv8\`. Last, start the two microGPT programs under walk on the landed tree in the background, \`nohup explorations/coordinator/tools/mg-run.sh > ${A.mainTree}/tmp/mg-run-batch10.log 2>&1 &\`, and return without waiting. Return the landed commit and whether both pushes went.`

// ---- the run ---------------------------------------------------------------------------------------
phase('Rungs')
const rungs = await pipeline(RUNGS, async (r) => {
  const o = l => ({ label: `${l} ${r.id}`, phase: 'Rungs', model: 'opus' })
  const w = await call(workerPrompt(r), { ...o('worker'), schema: WORKER })
  if (!w) return { rung: r.id, name: r.name, status: 'dropped', why: 'the worker returned nothing twice' }
  const base = { rung: r.id, name: r.name, branch: `wip/${r.name}`, worker: w }
  const s1 = await call(skepticPrompt(r, w, null, null), { ...o('skeptic'), schema: VERDICT })
  if (!s1) return { ...base, status: 'dropped', why: 'the skeptic returned nothing twice' }
  if (s1.verdict === 'approve') return { ...base, status: 'approved', skeptic: s1 }
  log(`rung ${r.id}: refused on ${s1.grounds.map(g => g.ground).join(',')}; one repair round`)
  const rep = await call(repairPrompt(r, w, s1), { ...o('repair'), schema: WORKER })
  const s2 = await call(skepticPrompt(r, w, s1, rep), { ...o('second read'), schema: VERDICT })
  if (s2 && s2.verdict === 'approve') return { ...base, status: 'approved', worker: rep || w, skeptic: s2, firstRefusal: s1 }
  let ruling = await call(rulingPrompt(r, w, s1, rep, s2, null), { ...o('ruling'), schema: RULING })
  if (ruling && ruling.designQuestionAcrossTwo) {
    log(`rung ${r.id}: a design question across ${ruling.aspects.join(' and ')}; the top tier rules`)
    ruling = await call(rulingPrompt(r, w, s1, rep, s2, ruling), { ...o('second ruling'), model: A.topTier, schema: RULING })
  }
  if (ruling && ruling.ruling === 'approve') return { ...base, status: 'approved', worker: rep || w, skeptic: s2 || s1, ruling, firstRefusal: s1 }
  return { ...base, status: 'dropped', why: ruling ? ruling.reason : 'no ruling returned', firstRefusal: s1, secondRefusal: s2, ruling }
})

phase('Merge')
const all = rungs.filter(Boolean)
const approved = all.filter(x => x.status === 'approved')
log(`${approved.length} of ${RUNGS.length} rungs approved: ${approved.map(x => x.rung).join(' ')}`)
if (!approved.length) return { status: 'nothing to land', rungs: all }
const gather = await call(gatherPrompt(approved, all), { label: 'gather', phase: 'Merge', model: 'opus', schema: GATHER })
if (!gather || gather.stopped) return { status: 'merge stopped', gather, rungs: all }

phase('Gate')
let gate = await call(gatePrompt(gather, 1, null), { label: 'gate', phase: 'Gate', model: 'sonnet', effort: 'low', schema: GATE })
let fix = null
if (gate && !gate.green) {
  log(`gate red: ${gate.failing.length} failing; one repair in the merged tree, then the gate once more on the new code`)
  fix = await call(gateRepairPrompt(gather, gate), { label: 'gate repair', phase: 'Gate', model: 'opus', schema: WORKER })
  gate = await call(gatePrompt(gather, 2, fix), { label: 'gate 2', phase: 'Gate', model: 'sonnet', effort: 'low', schema: GATE })
}
if (!gate || !gate.green) return { status: 'red', gate, fix, gather, rungs: all }

phase('Land')
const land = await call(landPrompt(gather, gate), { label: 'land', phase: 'Land', model: 'sonnet', effort: 'low', schema: LAND })
return { status: land && land.pushed ? 'landed' : 'not pushed', land, gate, gather, rungs: all }
```

**Agents, tier by tier.** Opus: the four workers (each reads its rung section, the files and lines it names, the ledger rows, POSITIONS and FACTS entries it cites by title, the precedents its "What the tree already does" names; output: the branch, the report, the structured summary), the four skeptics (read the branch, the diff, the report, the transcript's tool lines; run 3 to 6 programs old and new; output: the verdict on closed grounds), a repair worker and a second read per refusal, a ruling per double refusal, the gather (merges and composes the records), a gate repair if the gate is red. Sonnet, low effort: the gate runner and the landing, which run scripts and move numbers and need no judgement. The top tier: a second ruling only, and only when the Opus ruling says the disagreement is a design question across two of the specification, the library and the implementation, which is the Fable rule's standing pre-approval; nothing else in the run touches it.

## 3. How correctness is assured, and where the checking is worth its cost

The checks, each with what it costs and what it protects.

- **Test first, read from git and the transcript.** The skeptic reads `git log --stat` (the first commit holds tests alone) and the worker's transcript's tool lines (the harness run that failed before the fix). About 20K to 30K tokens per skeptic, no build. It protects the rule Pavol holds first, and it is the only place it can be checked without repeating the work. Worth it on every rung.
- **The worker's one suite run.** W runs `ant testSystem` once (about 4 minutes; a library type or team test refused at load is this rung's one serious risk, and the gate would find it an hour later at the cost of a repair round and a second gate, about 50 minutes and 0.5M). C runs the compiler and library tracks once (about 8 minutes) for the same reason. G and N run only the harness on their own tests, which loads the whole library and so is the load check. Cheap insurance; worth it.
- **The skeptic's own programs, old against new.** Three to six per rung, the old code run from the base build with a private cache. About 50K to 80K per skeptic. For W and C it is the only independent check of the semantics before the merge (a Meet Rule misread, an instance that moved where it should not), so it is worth it. For G and N the stages and the gate's interpreter suite already assert most of what matters, so the skeptic runs the three programs the brief names and no more.
- **The two stages once per library rung and once for C.** About 20 minutes of one core each, about 15K tokens of polling. They give each rung its own after, which the gate's merged run cannot: on the merged tree C's checker and G's and N's library meet, and a crash C repairs unmasks errors in G's and N's sections. The before is never re-measured. Worth it; the one place it could be cut is G and N, if attribution by declaration ownership from the gate's per-site list is accepted (section 5), which saves CPU time but no wall time, since the stage runs on one core beside the other slot's work.
- **The gate, once, on the merged tree.** One build and about 45 to 50 minutes of suites and stages, about 0.12M of a low-effort agent. Required by the binding rule; nothing else runs beside it, so its numbers are kept.
- **One repair round, on closed grounds.** A refusal must name one of six grounds, each a rule of the record; anything else is a note for Pavol. This is what keeps a refusal chain from becoming the 0.7M it cost in batch 9: the second read checks only the refusal, and the judge rules only when the two disagree.

Where the checking is not worth its cost, and is left out.

- A separate review of the merged diff. Its records check is the gather's job, done once while composing the records; its code check is the gate's; the conformance review after the batch is Pavol's standing practice outside this run.
- A judge for every rung, or a top-tier ruling by default. A ruling only on a double refusal; the top tier only when the Opus ruling flags a design question across two aspects.
- A clean build anywhere but the base. Every worktree is seeded; `ant compileAll` runs only where Java or Scala changed, and recompiles only the changed sources; the gate builds the merged tree once, from the seeded copy.
- Per-rung gates. Two suites at once on four cores add their walls; one gate on the merged tree is the rule and the saving.
- Re-running a stage, a suite or a harness run on code another agent has already run; a baseline or output comparison of any kind.
- The worker running the distance stage after each edit. Once, at the end; an intermediate single-unit run is offered only if the tool supports it (section 5).

What stays unchecked, and is accepted: the specification passages are read by the skeptic against walk and the checker as built, not built as LaTeX (building the specification is untested); the ledger, FACTS and PLAN lines are composed by the gather from the reports with no second reader, which the post-batch review catches; whether a worker listed every way before choosing is read from its report, not verified.

## 4. The estimate

Tokens are writes only; the ranges come from the agent floor of about 45K, the first prompt of each role (the shared rules plus the rung section, about 8K to 12K), about 2K of new tokens per tool call, and one cold-cache rewrite of about 200K budgeted for each worker, since one wait over five minutes is likely despite the rule.

- **Workers, Opus, 4 agents: 2.5M to 3.3M.** C 0.9M to 1.1M (five rows, four traces, about ten Scala builds at 80 s, two suite tracks, the stages; about 120 tool calls). W 0.6M to 0.8M. G and N 0.5M to 0.7M each (many sites, little compilation, one stage run). Batch 9's workers wrote 2.2M without a restart; this batch's C is heavier.
- **Skeptics, Opus, 4 agents: 0.8M to 1.2M.** 0.2M to 0.3M each: a diff, a report, a transcript's tool lines, three to six programs, no build; batch 9's first skeptics averaged 0.31M, and the saving is the poll discipline and the closed grounds.
- **Refusal chains, Opus, 3 agents each: 0.6M per chain.** A repair 0.3M, a second read 0.15M, a ruling 0.15M; a second ruling on the top tier 0.15M more, rarely. One chain is expected (batch 9 had two, under broader grounds); two are budgeted: 0.6M to 1.2M.
- **The tail: 0.4M to 0.6M.** The gather 0.25M (Opus). The gate 0.1M to 0.15M (Sonnet, low). The landing 0.08M (Sonnet, low). A red gate adds a repair of 0.4M and a second gate of 0.1M; expected once in three batches.
- **The coordinator, outside the workflow: about 0.25M.** The pre-launch (the base build, the arguments, the extraction) and about twelve check-ins 45 minutes apart over nine hours.
- **Total: 4.3M to 6.8M, about 5.2M expected**, over 11 agents (every rung approved at the first read, a green gate) to 19 (two refusal chains with second rulings, a red gate), 13 to 14 expected. Batch 9 wrote 6.9M over 22 agents; the difference is the tail (1.56M there, about 0.5M here), the narrowed refusals and the skeptics' polling.

Wall time, with two agents at a time and the rungs ordered C, W, N, G: the worker spans assumed are C 4 h, W 3 h, N and G 2.5 h each, a skeptic 0.6 h, a repair round 1 h. The slots fill as C and W start together, N starts when W finishes at about 3 h, G when C finishes at about 4 h, and the skeptics run in the gaps; the rung phase ends at about 7 to 7.5 h with no refusal, 8 to 8.5 h with one. The gather about 0.4 h; the gate about 0.8 h (the build 4 minutes, `testFast` 8 to 10 minutes, `testSystem` 4 to 5 minutes, the ladder about 10 minutes assumed, the count 20 s, the distance 15 to 20 minutes, one after another); the landing 0.2 h. About 9 to 10 hours in all, 11 to 12 with two refusals and a red gate, inside the platform's 13-hour stop; a stop is resumed from the journal with the same arguments, every finished agent kept.

Assumptions behind the numbers: the worker spans are batch 9's shape with C heavier; the suite times are the idle-machine figures (`testFast` 440 s wall at the old count, now 1,731 tests; `testSystem` about 150 s at 382 tests, now 470) with a margin for the other slot's load; the distance stage's 786 s to 1,212 s at a gate; the ladder's time is a guess, since nothing read here measures it; the seeded `ant compileAll` is the measured 77 s with the dates fixed.

## 5. What to measure or decide before running it

To measure.

- The wait mechanism inside a workflow agent: whether `Monitor` takes a 270000 ms limit and returns the agent to a warm cache, as the design assumes, or whether a Bash background command's completion wake (one cold rewrite per long run) is the only form. The polling rule in every prompt depends on it; a cold wake per long run adds about 0.2M per worker.
- The compiled-test single-file runner: the design tells C to find it with `grep -rl ONE_JVM`; confirm it exists at a stable path, or copy it beside `harness-one.sh` under `coordinator/tools/` so the brief can name it.
- The skeptic's transcript read: that `~/.claude/projects/*/*/subagents/agent-*.jsonl` is where this harness writes a workflow agent's transcript, and that an Opus skeptic reading only tool lines is not stopped by the safety filter that stopped a top-tier worker reading a transcript's tail.
- Whether `distance/run.sh` can run one unit (`FortressLibrary`, about 13 of its 20 minutes) for a library worker's intermediate check, and its time; without it, the worker gets one measurement at the end.
- The ladder stage's duration and runner on this tree; the estimate guesses 10 minutes.
- Whether the distance tool writes the per-site list beside its table, or a second script makes it; the gate and the library workers need the list, not only the totals.
- The alias the harness resolves for the top tier in `agent()`'s `model`, for the second ruling; if none exists, the second ruling is the coordinator's own call outside the run, and the script returns the rung as `ruling pending`.

To decide, Pavol's.

- **Approvals with required corrections** (parked in PLAN): a skeptic whose finding is a small written fix (a message's wording, a missing report line) writes the correction into its verdict and the gather applies it, instead of a repair worker, a second read and a ruling. It turns a 0.6M chain into about 50K when the fix is small. The design runs the full round until he says yes.
- **Sonnet for the gate runner and the landing.** His tier rule names Opus for workers, Sonnet for archaeology and the top tier for judgements; the gate and the landing are neither, mechanical runs of scripts and moves of numbers. Opus there costs about 0.1M more and risks nothing; Sonnet is the default here.
- **The gate on the seeded merged tree plus `ant compileAll`, not a clean build.** The protocol's hard rule says "on a clean build"; the seeding decision says nothing is built twice, and the copied classes come from sources identical to the base's. The design takes the seeded build; a clean build costs about 4 minutes more and his word.
- **No separate merged-diff review inside the batch.** His position keeps one beside the gate; this design folds its records check into the gather and leaves the conformance review to the pass after the batch. If he keeps the review, it is one Opus agent reading the merged diff while the gate runs, about 0.25M, and its findings in code go to the gate repair's prompt.
- **Attribution by ownership for G and N**, if he wants the two library rungs' stage runs dropped: their after is then read from the gate's per-site list by section, and the record says so.
- **The P1 line for W** at the launch: null, or the judgement's way, written by the coordinator into the arguments.
- **The ledger's first free row** at the launch, since other work may open rows before it.
