export const meta = {
  name: 'batch-practice-characterization',
  description: 'Git-only characterization of every climb batch (what each committed, by category), the token spend per run, and the revival tests against the team test-suite practice',
  phases: [
    { title: 'Characterize', detail: 'one reader per pair of batches, plus tokens and test practice' },
  ],
}

const COMMON = `You are a read-only analyst for the Fortress revival, working in /home/user/fortress. Pavol, who directs the work, is angry that the batch practice commits hundreds of scratch files per batch: batch 6.5b committed about 280 lines of Fortress code, 90 of specification and 710 of tests, beside 866 record files and 46K lines, 583 of them cited by no report. Your answer is evidence for two later reviews, one by an Opus worker and one by Fable, that will propose a better practice, plus an archaeology of how the practice drifted. Report what is there, measured. Do not recommend.

Rules. Change nothing in the repository. Write no file in the tree and commit nothing. If you need scratch files, put them under /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/characterize/ in a directory named after your task. Keep every command's output bounded (head, wc, awk sums), because the record files are large. Where the tree's records already give a number, cite them rather than re-deriving them, but check that the number fits git.

Categories, used by every reader so the tables line up:
- CODE: Library/*, ProjectFortress/LibraryBuiltin/*, ProjectFortress/src/**/*.java, ProjectFortress/src/**/*.scala, ProjectFortress/astgen/*, build.xml and other build files. Split into library, Java and Scala.
- SPEC: Specification/**/*.tex (text), and Specification/fortress.pdf (binary: whether rebuilt, and the bytes).
- TESTS: ProjectFortress/tests/, compiler_tests/, library_tests/ and any other test corpus under ProjectFortress/. Count each of these:
  - new plain tests;
  - new XXX (expected-failure) tests;
  - promotions (an XXX file renamed to a plain name);
  - modified and deleted tests;
  - test lines added and deleted;
  - files whose name carries a batch or rung suffix (RungE, RungV, and so on).
- RECORDS under explorations/, split into:
  - REPORTS: .md files;
  - CAPTURES: .txt, .tsv, .out, .log, .csv and .json run outputs;
  - PROBES: .fss, .fsi and .test files under explorations/;
  - SCRIPTS: .sh, .py, .js, .java and the like;
  - OTHER.
  For each give files, lines and bytes.
- COORDINATOR: explorations/coordinator/{FACTS,POSITIONS,PLAN,INDEX}.md, explorations/fortress-gap-ledger.md and explorations/microgpt-run-c-handover.md: lines added and deleted.
- A RECORDS file counts as CITED if its path or basename appears in any tracked .md file at today's HEAD (use git grep -F on the basename; strip common basenames such as README.md, REPORT.md and record.md, which are cited through their directory). Give cited and uncited files and lines.`

const PER_BATCH = `For each batch you are given, find its own commits on main. Its record lists them: the rung commits composed at the gather, the gather, the review corrections, the judge's rulings, the repairs and the landing records. Batch records live in explorations/compile-ladder/climb-batch-*/RECORD.md. The repair batch and batches 1 and 2 have a gate summary and per-rung record.md files under explorations/compile-ladder/, and the eight-rung ladder climb of 2026-09-17 is explorations/compile-ladder/CLIMB.md. Leave out the coordinator's own commits that interleave with the batch on main, but name them in one line if they touch the batch's files. Sum git show --numstat -M over the batch's commits, by category.

Return one markdown section per batch, in this template:
### <batch name>
- Range: base, landing commit, number of its own commits, dates.
- Purpose: one line from its record, and whether it did it.
- Fortress change: CODE by library, Java and Scala (files, +/-); SPEC text (files, +/-); PDF rebuilt (bytes).
- Tests: new plain, new XXX, promoted, modified, deleted (files, and lines +/-); rung-suffixed names; the three largest new test files with their lines.
- Records: REPORTS, CAPTURES, PROBES, SCRIPTS and OTHER (files, lines, bytes); the five largest files, with lines and what each is (a build log, an output comparison, a citation dump, a test run and so on); CITED against UNCITED (files, lines).
- Coordinator records: lines +/- per file.
- Ledger rows opened and closed, from the record.
- Ratios: RECORDS lines per CODE+SPEC line changed; TESTS lines per CODE line.
- Anything odd: duplicated captures, whole build logs, dumps, and files that are committed and then deleted.

Also return the numbers you measured, per batch, in the "numbers" object.`

const SCHEMA = { type: 'object', properties: { section: { type: 'string' }, numbers: { type: 'object' } }, required: ['section', 'numbers'] }

const GROUPS = [
  'the eight-rung ladder climb of 2026-09-17 and the repair batch of 2026-09-18',
  'climb batches 1 and 2 (2026-09-19 and 09-20)',
  'climb batches 3 and 3.5 (2026-09-22 to 09-24)',
  'climb batches 4 and 5 (2026-09-26)',
  'climb batches 6 and 6b (2026-09-27)',
  'climb batches 7 and 7R (2026-09-27 and 09-28)',
  'climb batches 7C and 6.5 (the first run of 6.5) (2026-09-28)',
  'climb batch N (its first run) and batch 6.5b (2026-09-29)',
]

const TOKENS = `Your task: the token spend of every batch run. The Workflow runs of this session are the directories under /root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/. Each holds a journal.jsonl (one "launched" line, then "started" lines with key, agentId, label and phase, and "result" lines) and one agent-<id>.jsonl transcript per agent.

1. Map each run to its batch. Use the batch records (explorations/compile-ladder/climb-batch-*/RECORD.md) and FACTS.md, which name run IDs such as wf_07b95462-a7d. Name the runs that were killed and relaunched or resumed.
2. For each run and each stage label (rung, skeptic, judge, repair, gather, gate, review, review2, commit and so on), give tokens from the transcripts' message.usage, deduplicated by message id:
   - output;
   - cache writes;
   - cache reads;
   - the number of API calls;
   - the wall minutes from first to last timestamp.
3. Total per batch.
4. Show which stage kinds dominate across all batches, in shares of output plus cache writes, and of cache reads.

Batches run before this session (the eight-rung climb of 09-17 in session bdff267d) are not on this disk. Take their figures from explorations/coordinator/iteration-cost.md and climb-batch-3-cost.md, say so, and do not mine the transcripts branch.

Return a markdown section: one table-free list per batch, then the cross-batch shares; and the numbers in "numbers".`

const TESTS = `Your task: the revival's tests against the original team's test-suite practice.

The team's corpus is the 2012 tree at a874948ac: ProjectFortress/tests/, compiler_tests/, library_tests/ and the rest. The revival's tests are every test file added or changed since then on main: git log --diff-filter=AM --name-only a874948ac..HEAD over those directories.

1. The team's practice, measured at a874948ac:
   - file naming, and how XXX expected-failure files are used;
   - typical length (median and quartiles of lines);
   - how a test states what it checks (the harness passes an interpreter test when there is no exception and no "fail" in its output, FACTS.md, and a compiler test on its exit code plus PASS);
   - the number of checks per file (assertions, PASS prints, fail calls);
   - whether a file tests one feature or many;
   - comments and provenance in tests;
   - the .test file forms.
   Quote three representative team tests, briefly.
2. The same measures for the revival's added tests:
   - counts per suite;
   - names carrying batch or rung suffixes (Rung*, and so on);
   - lengths, and the largest files;
   - checks per file;
   - comments that cite ledger rows, rungs, batches or specification lines;
   - the XXX share, and the two-file link-and-run pairs.
   Quote three representative revival tests, briefly.
3. Where the revival's tests differ from the team's practice, as measured differences only, with examples. Also list the revival tests that are edits to the team's own test files (FACTS.md and POSITIONS.md record several approved respellings).

Return a markdown section and the numbers in "numbers".`

phase('Characterize')
const jobs = GROUPS.map((g, i) => () => agent(COMMON + '\n\n' + PER_BATCH + '\n\nYour batches: ' + g + '.', { label: 'batches-' + (i + 1), phase: 'Characterize', schema: SCHEMA }))
jobs.push(() => agent(COMMON + '\n\n' + TOKENS, { label: 'tokens', phase: 'Characterize', schema: SCHEMA }))
jobs.push(() => agent(COMMON + '\n\n' + TESTS, { label: 'test-practice', phase: 'Characterize', schema: SCHEMA }))
const results = await parallel(jobs)
const labels = GROUPS.map((g, i) => 'batches-' + (i + 1) + ': ' + g).concat(['tokens', 'test-practice'])
return results.map((r, i) => ({ label: labels[i], section: r ? r.section : '(no result)', numbers: r ? r.numbers : null }))
