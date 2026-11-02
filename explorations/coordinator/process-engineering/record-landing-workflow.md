<!-- The design of one reusable workflow that brings the record in line with a landed batch (FACTS, POSITIONS and their histories, INDEX, PLAN, PLAN-history and the review queue), which the coordinator launches with three arguments and whose result it reads as one diff, written 2026-11-02 by an Opus worker for the coordinating session and the curator, reading only: what the record's tools take, write and check, and where the clarity workflow's reuse failed; the landing's record work step by step at climb batches 23 and 24; the five stages with their inputs, outputs, checks and models; the cost from the workers measured on 2026-10-31; the risks; what stays with the coordinator; the smallest first version; and the decisions for the curator, each with a default. Nothing was built or launched. -->

# One workflow for the record after a landing

## For the curator

- **Your question.** Yes, the record's work after a landing can be one workflow that the coordinator launches. It takes three arguments: the batch's number, its base and its landing commit. It gathers the evidence, sorts it, writes, checks, and commits on a branch of its own. The coordinator reads one file, `diff.md`, with one line per change, and then lands the branch on `main`. It does not read the record to brief anyone.
- **Not a mode of the clarity workflow.** The clarity workflow has one job: entries that no longer read on their own, rewritten with their meaning kept, back into the entry's text. The landing's work changes meaning on purpose (a false sentence made true), and it goes to nine homes, of which the entry's text is one. A new workflow, `tools/record-landing/`, reuses what worked: the headless Opus writer stream in the register (`writer-stream.sh`), `record.py` for the entries and their history, the clarity cold reader's brief as it is, and the clarity checker's and judge's methods. The orientation workflow reuses the stream in the same way, with no change to the clarity tool.
- **Where the last reuse went wrong.** On 10-26 a run's own brief overrode the clarity tool's rules (`bedc80b01`, undone at `18788035c`). On 10-28 the tool got a findings input in its own briefs, at your yes. On 10-29 its one output put every finding into the entry's text: it wrote 21 findings there, and 8 of them belonged there. So this design sorts each change by its home and its weight before anything is written, and each writer writes only its own homes.
- **The evidence is mostly written already.** The batch's record (`RECORD.md`: its items for you, and what it left for the coordinator) and the post-batch review's Part 4 do what the scouts' files did in the consolidation. A script adds the rest from git: the record's diff, the ledger's changed rows, and each entry, PLAN line and queue item that names them. At climb batch 24 these lists hold every entry that the record pass of 10-31 changed: its six FACTS entries are among the 17 that the batch added or changed, and its three sentences of your decisions (P-73, P-151, P-156) are the ones that name a row the batch changed.
- **Cost.** About 0.9M to 1.7M tokens written for a landing like climb batch 24's. On 10-31 the two workers wrote 0.63M, and the coordinator up to 0.17M more. The difference buys the checks that today's route lacks: a fidelity check, a cold read, a judge, and a check that PLAN's moves are word for word.
- **First version.** All five stages and both writers; the orientation update stays its own run. Tested first as a replay of climb batch 24's landing, compared with the result that landed by hand.
- **Your decisions,** each with a default: section 6.

## 1. What exists

### The clarity workflow

`explorations/coordinator/tools/record-clarity/`: `record-clarity.js`, its README, six briefs, `writer-stream.sh` and `wait.py`.

- **Input.** `kind` (`positions` or `facts`, one kind a run), `out`, `chunks` (about ten entries each), `stream`, and `from: 'judge'`. Since `9a37e8401`, also a file `findings.md` in a chunk's folder: one block per entry, each finding with the sentence at issue, the right reading and its ground.
- **Stages, per chunk.** For FACTS first an assessment by the six checks of the coordinator skill's `references/record.md` ("What an entry is"); only the entries that it marks reword or reorganize go on. Then the writer, in the stream; a cold read by a reader with only the worker skill; a check of fidelity against the sources, and of the reader's answers against the meaning; the writer's fix round, in the same stream; a second cold read; a judge that applies or holds each entry, once.
- **Output.** Files in the chunk's folder: `proposals.md`, `clean.txt`, `proposals.apply`, `concepts.md`, the reports, `judgement.md`, `final.apply` and `queue.md`. It writes no record file.
- **Checks.** Fidelity (no more and no less than the source, no lost condition, no default shown as the curator's decision) and comprehension. The script checks no length and no register. After a chunk the coordinator applies `final.apply` with `record.py`, runs `record.py check --base`, commits, and files `queue.md`.
- **Its guard.** The writer's "Keep the meaning." (`writer.md`). Its findings clause lets a named sentence change from its ground, and nothing else.

### The writer stream

`writer-stream.sh STREAM TASK` runs one task in a headless Opus session (`claude -p --model opus`).

- The session is resumed while its context stays under 400K tokens written and its cache is warm (under 50 minutes idle). Otherwise a fresh one starts. The tasks of one stream run one at a time.
- Its standing brief is the skill writer's (`skill-writer-brief.md`): the register, halfway to ASD-STE100, and the writing principles. The task's own brief replaces its parts on skill files and on commits.
- Its tools are the read and edit tools, `facts-extract.sh` and read-only git. It cannot run `record.py` or `ledger.py`. So it writes apply files, and another step runs the tool. `record.py apply` then writes each entry, and its history block from the file's provenance line: the time, the kind of change, the source, the commit, who, and why. This is the part that writes "the position with its history".
- It works in the checkout that holds the copy of the script that runs (`cd "$repo"`). So the copy in a worktree works in that worktree, with no change to the script.
- A Sonnet agent drives it. The agent starts the command in the background and waits with `wait.py`. In the orientation run of 10-31 each driver wrote 65K to 66K.
- The fix round resumes the session that wrote the text, with its evidence in the cache: 61K in the clarity pilot, 22K in the orientation update of 10-31.

### The ledger clarity run

`tools/ledger-clarity/`. Input: `out`, and chunks of rows. Per chunk an Opus writer (a Workflow agent, not a stream) judges each row by the six checks and writes its new line, a close or a question. An Opus checker checks them against the tree. A judge applies or holds each, once. Output: `final.rewrite`, `final.closes` and `queue.md`. `apply.py` applies them through `ledger.py rewrite` and `close`, also in another checkout (`--root`). It ran once, on 10-22: 58 rows, 53 rewritten and one closed (`e553d8949`). The landing workflow can reuse `apply.py`.

### The orientation workflow's update mode

`tools/orientation/orientation.js` with `mode: 'update'`. Input: `facts`, the entries that the landing added or changed, and a stream's name.

- **Admission** (Opus): an entry goes in only if it changes what a worker must do. The agent names the default assumption, the correction, the mistake that it prevents, and the evidence of that mistake.
- **Write:** the stream of `record-clarity/` rewrites in place the sections that the admitted entries touch, within 8K to 12K characters.
- **Checks,** side by side: preservation, a cold read with only the skill's core, and the regression quiz (author, reader, grader).
- **Fix** in the same stream, a second cold read and the quiz again, and a **judge**: install or hold, section by section. The skill writer installs the judged sections.
- On 10-31 it took the batch's 17 entries, admitted two (F-181, F-270), and ran 47 minutes. Its 12 Workflow agents wrote 1.18M, its stream 55K. Its judge has let the part pass its budget three landings in a row (19.8K against 12K, the boot note).
- It is the model for this design: admit, write, check, fix, judge, with the stream taken by path from another tool's folder, and that tool unchanged.

### The batch's own stages

- **The gather** folds each rung's `record.md`: new and rewritten FACTS entries through `record.py`, each with the rung's report section as its source; ledger notes, rewrites, new rows and closes through `ledger.py`; the items for the curator into PLAN; and the batch's `RECORD.md`, with its sections "Items for the curator" and "Left for the coordinator and the skill writer". Then `ledger.py landing-check BASE` must print nothing (`climb-batch-workflow.js:1220` and `:1228`).
- **The merged-diff review** corrects the folded record. At climb batch 24 it made four rewrites of FACTS entries: citations, a comma, a list (`FACTS-history.md`, the blocks of 15:57Z on 10-31).
- **The commit stage** writes the gate's figures into F-53 and F-240 by `record.py set`, numbers only. It changes no other word, and names for the coordinator each sentence that the figures make false (`:1633`).
- **The rungs' entries are drafts.** The worker skill says: "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." (`fortress-repo`, `references/records.md`, "Writing to the record"). No stage of the batch rewrites them, and no brief of the script quotes "The pass". At climb batch 24 all 17 entries that the batch added or changed stood over 600 characters at the landing, from 960 to 2,789. The record writer after the landing changed six of them: it cut three for size (F-299 to 1,917, F-308 to 1,740, F-298 to 1,656), and corrected three (F-34, F-240, F-306), which stayed past 600. It did not touch the other 11 (my count, from `FACTS.md` at `25238e60c` and at `85b2998e9`).
- **A skill sentence that this makes false.** The coordinator skill's "The pass" says: "In a batch, the commit stage runs it, with this part quoted in its prompt." Its `references/batch.md`, "The landing", step 2, says to check "that the commit stage folded the batch's entries". The gather folds them, and no stage runs the pass. After a batch, the pass has no home but the coordinator's hand.

### Where the clarity workflow was reused with another input, and the gap

From its git history (`git log -- explorations/coordinator/tools/record-clarity/`) and the post-mortem of 10-28 (`postmortem-2026-10-28/account.md`, `REPORT.md` and `evidence/last-consolidation.md`):

- `d56844991` and `913ba1cbf`, 10-22: the tool, its judge and the writer stream, from the pilot. Its runs that day took only `kind`, `out` and `chunks`. Each agent's task was two lines: the brief's path, then the entries and the folder.
- `bedc80b01`, 10-26: to correct what the foundations review found, the coordinator added `args.extra`, a run's own brief for the writer, the fix round, the checker and the judge. It said "Where they differ, this brief wins.", and made a judge's list of behaviours binding over the writer's "Keep the meaning." The 13 texts grew to 1.9 times the entries and carried batches, counts and dates. The curator rejected all 13. The run wrote about 2.7M.
- `18788035c`, 10-27: the hook undone, at the curator's word. No run brief can override the tool's own briefs.
- `9a37e8401` and `9a2721125`, 10-28: at the curator's yes, a findings input in the tool's own briefs. The writer corrects each sentence that a finding names, from its ground, and changes nothing else. The checker checks each change against its ground. A ground's dates, counts and commits go to the history's note, not into the entry.
- 10-29: the corrections ran as a pilot of four entries and two chunks of seven. The curator's read found the next fault. The tool has one output, the entry's text, so every finding went there: it wrote 21 findings into the texts, and 8 of them belonged there. Of the 30 findings, 7 belonged in the history, 6 in FACTS, and 9 needed no change. The texts that landed (`8c99e258e`) were written by one Opus writer outside the tool, from two sorts of the findings and the curator's comments, and checked with the tool's check and cold-read briefs.

The gap had four parts:

1. **The input.** The first reuse gave the tool rules, not data.
2. **The homes.** The tool writes to one home. The corrections had four: the entry's text, its history, FACTS, or no change.
3. **The weight.** Nothing weighed a finding before the writing. Of 30 findings, four needed new words in an entry.
4. **The check of form.** Only the curator's read of a small pilot caught length, register, history in an entry and the wrong home.

Two more limits of the script matter for a landing. It takes one kind a run, so FACTS and POSITIONS need two runs. And for FACTS the assessment chooses the writer's entries (`write: a ? a.rewrite : []` in `record-clarity.js`), while the assessment's brief does not read `findings.md`: a finding on an entry that the assessment marks "keep" is never written.

## 2. The landing's record work today

### Climb batch 24: base `b0f6cd6b7`, landed at `25238e60c` on 10-31

After the batch's own stages:

1. **The post-batch review** (`43cd61b62`; one Opus reviewer, 582K, 16:17 to 16:55 UTC). Its Part 4 lists what the record owes: entries false, stale or past 600 characters (F-34, F-306 and a sentence of F-240; F-299, F-308 and F-298; clauses of P-73, P-151 and P-156); PLAN's stale and built lines; the items for the curator that PLAN lacks; new rows with no PLAN line; two notes out of line with the tree.
2. **The orientation update** (`6d4e58a3b`), started beside the review, on the batch's 17 entries.
3. **The record writer** (`be3b07aac`, `08cc69e2d`; Opus, 207K, 16:55 to 17:11). Six FACTS entries and three sentences of POSITIONS through `record.py apply`, each with its source; `record.py check --base` and `ledger.py check` clean; two line fixes by hand, in the batch record and in the map.
4. **The routing worker** (`b49631cb4`, `85b2998e9`; Opus, 427K, 16:55 to 17:26). PLAN's "Where we stand" rewritten; phase 4's lines; 37 lines moved word for word to PLAN-history under "Climb batch 24's landing, 2026-10-31"; queue items 326 to 343 with their defaults and "Needed by", item 182 moved to (a), the queue's head and its counts; seven INDEX lines that `check-index.sh` reported; one pointer in the boot note.
5. **The coordinator** read the review, wrote the two briefs (4.5K and 6.2K characters, much of each the review's Part 4 restated), launched them side by side, read their reports and pushed. From 16:11 to 17:45 UTC it wrote 174K over 43 calls, and its context grew from 183K to 354K tokens. Not all of that was record work.

### Climb batch 23: landed at `df71bc585` on 10-30

The same steps, by other hands: FACTS before the review (`b5103253a`); the orientation update (`79f5c4ce1`, nothing admitted); the map (`f2714393a`); the review (`473a3b864`); F-240 by its finding 3 (`1e6a93a04`); the routing, with queue items 306 to 317 and an INDEX line made false (`19605be4a`); one ledger rewrite by its finding 9 (`29b4e5107`); and INDEX lines for two reviews (`fead8e24c`). Routing workers wrote 353K at climb batch 16 and 399K at 18 (`process-engineering/batch-costs-14-18.md`), and 427K at 24.

### Which steps need what

**Mechanical: a script does them.**

- The record's diff against the base: each entry added, changed or removed, with its history blocks and who wrote each (the gather, the merged-diff review, the commit stage).
- The ledger's changed rows: opened, closed, rewritten, noted.
- Each other entry, PLAN line, queue item and INDEX line that names a changed row or entry. At climb batch 24 this finds the three POSITIONS sentences that the landing made false: P-73 names row 521, and P-151 and P-156 name row 701. It finds one more, F-129, which names row 307 and which the sort must judge (my count).
- `record.py check --base` (the entries over 600, the sources that do not resolve), `ledger.py check` and `landing-check BASE`, and `check-index.sh`.
- Applying an apply file with `record.py`, and a row file with `ledger.py`; a commit by named paths.
- Checking that each line taken out of PLAN stands word for word in PLAN-history; the queue's numbers and section counts; that a cut only deletes words (`words-subset.py`); each changed entry's length before and after.
- A queue item's "Needed by" where the batch record or the review states it, and the head's counts. Where neither states it, it is a choice (below).

**An Opus writer's judgement.**

- The pass on each entry that the batch added or changed: its wording, and the question that keeps a sentence past 600.
- An entry made false that no rung named: F-34, which only the review found.
- A POSITIONS sentence made false: the fewest words, the decision unchanged.
- PLAN: "Where we stand"; which line is built, answered or stale; a line cut to a pointer; a line that PLAN lacks.
- A queue item: what is asked, its default as the record states it, its evidence; a "Needed by" where the record gives none, marked for the curator's word.
- An INDEX line, from the note's header comment.

**The coordinator or the curator.**

- A decision, or a change of what the curator decided: his, by an ask or a hold.
- A default that the record does not hold: written "no default on record", for him.
- A "Needed by" that a worker set, and an item's kind, consequential or routine: the coordinator confirms them, and the curator may change them. On 10-31 the routing worker set four (items 326, 335, 338 and 339, the boot note).
- Each POSITIONS change named in the landing report, with its old and new words: the curator's rule of 10-31, "you don't need my approval to bring the record in line with reality" (`HELD.md`, "Held in chat (2026-10-31)").
- When to launch, and landing the result on `main`.

## 3. The design

### Its shape

A new folder, `explorations/coordinator/tools/record-landing/`, holds `record-landing.js`, a README, five briefs (`sort.md`, `entries.md`, `routing.md`, `check.md`, `judge.md`) and four scripts (`prepare.sh`, `checks.sh`, `final.sh`, `plan-moves.py`). It reuses, by path and unchanged: `record-clarity/writer-stream.sh`, `wait.py` and `coldread.md`, and `ledger-clarity/apply.py`.

It runs five stages, in the pattern of `orientation.js`: evidence and sort; write; check; fix; judge. All its work happens in its own worktree, `/home/user/fortress-landing-<N>`, on a branch `record/landing-<N>` made at `main`'s head at the launch. The judge commits there. The main tree is not touched until the coordinator lands the branch. It asks nothing new of the rungs: their `record.md` stays a draft, as the worker skill says.

**home**
: File and place where a change goes. The record has nine: a FACTS entry; a POSITIONS entry; an entry's history only; a gap-ledger row; a PLAN line; PLAN-history; a review-queue item; an INDEX line; a line of another note. A change can also need none, or belong outside the record: a skill sentence, the orientation, the batch script.

### Why a new workflow, and not a mode of the clarity workflow

- The clarity workflow's job is form, with the meaning kept. The landing's job is mostly content: a sentence that the tree made false, a line built, an item filed.
- Its one output is the entry's text. The landing's changes go to nine homes. A mode with one output for them repeats the fault of 10-29.
- Its input is a list of entries in chunks, chosen by its caller. The landing's input is two commits and two reports, and the list of changes is what the first stage finds. A new input bolted onto it is what went wrong on 10-26, and the curator had the script restored "to original form that worked well for what it was designed" (10-27, 22:13:20 UTC).
- It takes one kind a run, and for FACTS a finding on an entry that its assessment keeps is lost.
- The orientation workflow shows the reuse that worked: the stream, `wait.py` and the driver taken by path, its own briefs, and the clarity tool unchanged.
- The clarity workflow stays the tool for a consolidation, when entries drift. The landing workflow can name entries for it, and does not do its job.

### The arguments

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-landing/record-landing.js',
               args: { batch: '24', base: 'b0f6cd6b7', landing: '25238e60c' } })

The rest follows from them: the batch record `compile-ladder/climb-batch-<N>/RECORD.md`; the review `reviews/batch-<N>-review.md`; the run's folder `compile-ladder/climb-batch-<N>/record-landing/`, inside the worktree; and two streams, `landing-<N>-entries` and `landing-<N>-routing`. A replay adds `at`, the commit at which the worktree is made. There is no text argument: a run gives the workflow data, never rules of its own. A killed run resumes with the same arguments and `resumeFromRunId`, and each script skips a step whose output exists.

### Stage 1. Evidence and sort

One Opus agent, the sorter, with `sort.md`.

**First, a script.** The sorter runs `prepare.sh N BASE LANDING`. The script makes the worktree and its branch, and writes the evidence into the run's folder:

- `entries.md`: each FACTS and POSITIONS entry that the range added, changed or removed, and each changed since the landing; its line at the base and now, its size, its history blocks of the range with who wrote each, and the report sections that it cites, printed by `facts-extract.sh 'doc:...'` and bounded.
- `rows.md`: the ledger rows that the range opened, closed, rewrote or noted, with their claims (`ledger.py heads` on copies at both commits).
- `cites.md`: each other entry, PLAN line, queue item and INDEX line that names a changed entry or row, with its file, its line and its sentence.
- `plan.md`: the PLAN lines that the batch added, and the lines that name its rows.
- `checks.md`: at the worktree's head, `record.py check --base BASE`, `ledger.py landing-check BASE`, the notes that `check-index.sh` finds without a line, and the citations of PLAN by line number (`git grep -n 'PLAN\.md:[0-9]'`).
- `sources.md`: where the review's Part 4 and "For the curator" are, and the batch record's "Items for the curator" and "Left for the coordinator and the skill writer", as `facts-extract.sh` queries.

This is the scouts' work of the consolidation, done by a script. The record cites its sources in a form that the tools resolve, so a landing needs no Sonnet scout. The review's Part 4 has had the same five sections in the reviews of climb batches 22, 22c, 23 and 24.

**Then the sort.** The sorter reads the evidence, the review's Part 4 and the batch record's two sections. Before it calls an item for the curator open, it searches POSITIONS and INDEX for his answer, as the manual's routing step asks. It writes `owed.md`: one line per change that the record owes, each with:

- its home;
- its kind: the pass on a batch entry, made false, stale, past 600, built, answered, a new item for the curator, a new note;
- its weight: high (a reader would act otherwise), low (wording or a pointer), or none (no change);
- its ground: the file and line, the commit, or the review's section;
- whether a stage of the batch did it, or part of it;
- whether it needs the curator's word, and why;
- its writer: the entries writer, the routing writer, or none.

A change of weight none stays in `owed.md` with its reason, so that the checker can see that nothing was missed. A change whose home is outside the record goes to a last section, for the coordinator: the skill writer's material, the orientation's list of entries, a fault of the batch script. The sorter's structured result: the counts by home, the entries for the orientation update, and the changes that need the curator's word.

### Stage 2. Write

Two Opus writers, each a headless stream started by the worktree's copy of `writer-stream.sh`, so that each works in the worktree. Each task is two lines: the brief's path, then the batch, the folder and the worktree. One Sonnet driver starts both streams in the background and waits for both.

**The entries writer** (`entries.md`) takes the changes of `owed.md` whose home is a FACTS entry, a POSITIONS entry, an entry's history or a ledger row. It writes into the run's folder:

- `record.apply`: each entry's whole new line, with its provenance line (the source, the landing commit, "by: climb batch N landing workflow", the reason), and a `note` block where only the history changes;
- `rows.rewrite`: a row's whole new line, where a change's home is the ledger (rare: one at climb batch 23, none at 24);
- `clean.txt`: the changed entries alone, for the cold reader;
- `entries-report.md`: for each entry, the old line and the new; "Meaning: unchanged", or the change with its ground; for an entry past 600, the question that keeps each sentence; for a POSITIONS change, "cut only" where it only deletes words.

It writes each entry as the coordinator skill's `references/record.md` says in "What an entry is" and "The pass", and as the clarity writer's brief says in "How to write each entry" and in its findings clause. Those stay the one home of these rules. For POSITIONS it changes only the sentence that a change names, by the fewest words, and never what the curator decided, where it applies or what it requires. Where a change would need more, it keeps the text and writes a question for the curator.

**The routing writer** (`routing.md`) takes the changes whose home is PLAN, PLAN-history, the queue, INDEX or another note. It edits those files in the worktree, as the manual's routing step says: each moved line word for word, under the landing's heading and the heading that it stood under; a line whose whole text another home holds, cut to one line with a pointer; each new queue item with what is asked, its default or "no default on record", its evidence and its "Needed by"; the queue's head and counts; each citation of a moved line repointed. It writes `routing-report.md`, one line per change.

**Then the driver runs `checks.sh 1`.** In the worktree, the script resets FACTS, POSITIONS, their histories, the ledger and its history to the worktree's base. It applies `record.apply` with `record.py`, and `rows.rewrite` with `apply.py`. Then it runs every mechanical check:

- `record.py check --base` at the worktree's base: nothing lost, and the entries over 600;
- `ledger.py check` and `ledger.py landing-check BASE`;
- `check-index.sh`;
- `plan-moves.py`: each line taken out of `PLAN.md`, or changed in it, stands word for word among the lines that `PLAN-history.md` gained;
- the queue: the new numbers follow the last, each new open item has its "Needed by" line, and each section's count equals its items;
- `words-subset.py` on the POSITIONS lines marked "cut only";
- each changed entry's length before and after.

It writes `mech-1.md`.

### Stage 3. Check

Two Opus agents, side by side.

**The checker** (`check.md`) reads `owed.md`, the evidence, both reports, `record.apply`, the worktree's `git diff` and `mech-1.md`. It checks:

- coverage: each change of `owed.md` is done, or named as left, with a reason;
- fidelity, by the clarity checker's method (`record-clarity/check.md`, step 1): no more and no less than the ground, no lost condition, the batch's figures untouched; for a POSITIONS change, what the curator decided, where it applies and what it requires are the same before and after, both quoted;
- form: no plan or status in an entry; no date, batch or commit in an entry; each pointer with a few words on what it holds; an entry past 600 only with a question that keeps its sentence;
- routing: each item for the curator filed with what is asked, its default and its "Needed by"; each move right (built by a named commit, answered by his answer cited with its time, stale by a decision or a landed change); no default invented; no item moved to (a) without that citation.

It writes `check.md`: pass, or each failure with its class (coverage, fidelity, form, routing) and the correction.

**The cold reader** runs `record-clarity/coldread.md` as it is, on `clean.txt`, and writes `cold-read.md`.

### Stage 4. Fix

The driver resumes both streams with `check.md`, `cold-read.md` and `mech-1.md`. Each writer fixes only its own homes, in the same session, with its evidence still in the cache. Then the driver runs `checks.sh 2`, which writes `mech-2.md`. There is no second fix round and no second cold read.

### Stage 5. Judge, the diff and the commits

One Opus agent, with `judge.md`.

- **For each change:** apply, or hold, once, by the clarity judge's rule. A held entry keeps its text: its block stays out of `final.apply`. A held routing change is undone in the worktree. A POSITIONS change that touches what the curator decided is always held, with its question for him.
- **The commits.** The judge runs `final.sh`: the record files reset; `final.apply` and `final.rewrite` applied; every check again, which must pass; then two commits on the branch, by named paths, with the footer of `fortress-repo`'s committing part. The first holds FACTS, POSITIONS, their histories and the ledger. The second holds PLAN, PLAN-history, the queue, INDEX, the other notes and the run's folder. A check that fails holds its change, and the judge runs the script again.
- **`diff.md`,** for the coordinator, one line per change, by home:
  - FACTS: the entry, what changed, and the ground;
  - POSITIONS: the entry, the old words and the new, "decision unchanged", and the ground, ready for the landing report;
  - PLAN: each rewritten line; the moved lines by kind, with their count and their first words;
  - the queue: each new item's number, its question in a few words, its default and its "Needed by";
  - INDEX and the other notes: each line;
  - "Held": each held change, and why;
  - "For the curator": each change that needs his word, each default that the record does not hold, each "Needed by" set by the workflow;
  - "Checks": one line each;
  - "Next": the two commits, and the orientation update's arguments, ready to copy.
- **Its final message:** the counts applied and held, the commits, and the path of `diff.md`.

Three lines of such a diff, as climb batch 24's landing would have given them:

- F-34, made false: the 52 refusals become a measurement of climb batch 22's code; four stopped first at a header `where` clause, which the code generator compiles since rung G. Ground: the review's Part 4.
- P-73, made false, cut only: "and at `CHOOSE` (row 521)" goes; decision unchanged. Ground: rung K closed row 521.
- Queue item 326, new, consequential: the hard set at way 2b, with the cost that the checker no longer checks which helper a binding names; default as landed; needed by the next batch that moves a binding over `NN32`, `NN64` or `Char`.

### What the coordinator reads, and what it no longer reads

- It still reads `diff.md` (an estimate: 5K to 10K characters for a landing like climb batch 24's), the judge's final message, and `git show --stat` of the two commits. The coordinator reads FACTS, POSITIONS and INDEX whole at each boot. `diff.md` is how it learns what a landing changed in them, without reading them again.
- It still reads the review's "For the curator", for the landing report. That is not record work.
- It no longer reads, for the record: the review's Part 4; the batch record's items and what it left for the coordinator; the entries and their sources; PLAN's and the queue's lines; the workers' reports. It writes no brief.

### The models

- The sorter, both writers, the checker, the cold reader and the judge: Opus. The writers are headless Opus sessions.
- The driver: Sonnet. It runs commands and reports their output, and judges nothing, as in the clarity and orientation workflows.
- No agent runs on Fable. The script names each agent's model, since the coordinating session may run on Fable.

### The cost, from the workers of 10-31

The method: tokens written, input plus cache creation, once per message id, by `tools/spend.py` on each agent's transcript, as the review's section 3 measured the batch. On 10-31:

- the record writer (agent `a8640320`): 207K; the routing worker (`a862bf70`): 427K; together 634K;
- the coordinator, from 16:11 to 17:45 UTC: 174K, not all of it record work;
- the orientation run's agents, for the roles of this design: admission 206K, judge 144K, preservation 113K, the two cold reads 61K and 67K, the two Sonnet drivers 65K and 66K; its stream 33K and 22K;
- outside the record work: the review (`a4b707ad`) 582K, the batch script's fixes (`a467a44d`) 250K, the skill's cold read (`a1beb317`) 105K.

The estimate for one landing like climb batch 24's:

- the sorter, with its script: 150K to 250K;
- the driver's write round, with the checks: 60K to 100K;
- the entries writer's first task: 120K to 300K, since it runs the pass on all 17 FACTS entries of the batch, where the record writer of 10-31 changed six, and three POSITIONS entries;
- the routing writer's first task: 200K to 350K, since the sort takes over its reading of the review and the batch record;
- the checker: 120K to 200K;
- the cold reader: 50K to 80K;
- the driver's fix round, with the checks: 60K to 100K;
- both writers' fix rounds: 50K to 120K;
- the judge, with the final script: 120K to 200K.

In all, about 0.9M to 1.7M tokens written, against 0.63M for the two workers of 10-31 and up to 0.17M of the coordinator's. The coordinator's context grows by the diff, where on 10-31 it grew by 171K tokens. Those writes of the coordinator ran on Fable, which `batch-costs-14-18.md` weighs at three to four times Opus, and they count against Fable's weekly limit. The run takes about 1 to 1.5 hours, an estimate, against 31 minutes for the two workers of 10-31 after the review.

### The risks, and the guard for each

1. **A writer changes what a decision means.** The sorter names the sentence and the landed fact that makes it false. The writer changes the fewest words and quotes the old and the new. `words-subset.py` checks each cut. The checker compares what was decided, where it applies and what it requires, before and after. The judge holds any change past the false clause, and its question goes to the curator.
2. **A step needs the curator's word.** A default that the record does not hold is written "no default on record". A "Needed by" that the record does not hold is marked as set by the workflow. An item moves to (a) only with his answer cited by its time, or with the commit that made it moot. Each goes to "For the curator" in `diff.md`.
3. **A stage of the batch already made the change.** The evidence says who wrote each history block of the range: the gather, the merged-diff review or the commit stage. The workflow keeps the figures of F-53 and F-240, and changes only a sentence that the commit stage named as false. It closes no row, since the gather does, and `landing-check` must stay clean.
4. **A run's own rules bend the tool,** as on 10-26. The workflow takes three arguments and no text. Its briefs are files, which change only at the curator's yes.
5. **One output for many homes,** as on 10-29. The sort by home and weight comes before any writing, and each writer writes only its own homes.
6. **Entries grow.** The texts of 10-26 grew 1.9 times, and the orientation has passed its budget three times. The length table shows each change. An entry grows only by what its change needs. The judge holds growth that no question keeps.
7. **`main` moves during the run,** and the cherry-pick conflicts. During the run the coordinator writes none of the files that the workflow writes; a decision that the curator gives meanwhile is recorded after the landing. On a conflict, the coordinator applies `final.apply` with `record.py` on `main`, and cherry-picks the routing commit alone.
8. **A false entry that neither the review nor the search finds.** It is missed today too; the workflow misses no more.
9. **The cost passes 1.7M.** The levers: drop the cold read (50K to 80K), or let the judge do the checker's routing part.
10. **A replay reads the future.** In a replay, an agent that reads the main tree sees the record as the hand route left it. Every path that a brief gives is the worktree's, and a third agent makes the comparison. `words-subset.py` reads the main tree by a fixed path (its `ROOT`): for the replay it needs a `--root` option, or it is left out.

## 4. What stays with the coordinator

- Launching the workflow after the review is committed, with its three arguments.
- Reading `diff.md` and the judge's final message, and landing the branch: `git cherry-pick` of the two commits onto `main`, `record.py check --base` and `ledger.py landing-check` there, the pushes, and the worktree removed.
- The landing report, which names each POSITIONS change with its old and new words, by the curator's rule of 10-31.
- The changes for the curator: each by the skill's ask rules, one at a time, or on the review list; a hold at once.
- Each held change: run it again, file it in the queue, or leave it.
- Confirming each "Needed by" and each kind that the workflow set.
- The landing's other work, which is not the record's: the orientation update, with the arguments that `diff.md` gives; the skill writer's task and its cold read; the batch script's fixes.
- Recording a decision of the curator's in POSITIONS when he states it. The workflow never writes a decision.
- The boot note and the held list.

## 5. The smallest first version worth building

- **What it holds:** all five stages; both writers; the mechanical checks; the checker and one cold read; one fix round; the judge, `diff.md` and the two commits on the branch.
- **What it leaves out:** a second cold read; the orientation as a stage (it stays its own run, launched after); the record test's quiz; landing on `main` by the workflow; a PLAN tool that moves a line by its first words and copies it itself.
- **Why both writers.** Without the routing writer the coordinator still writes its longest brief, 6.2K characters on 10-31, and the routing is the larger share of the work: 427K of 634K. The routing writer adds one brief and one check script.
- **The build:** one Opus builder for the script, the five briefs, the four scripts and the README: about 0.4M to 0.7M, an estimate. The five briefs then go on a page for the curator's read before any run, since they are the workflow's rules.
- **The test, a replay.** A worktree at `43cd61b62`, the review's commit, before the record pass and the routing of climb batch 24. The workflow runs there with `base: 'b0f6cd6b7'`, `landing: '25238e60c'` and `at: '43cd61b62'`. An Opus worker compares its two commits with what landed by hand (`be3b07aac`, `08cc69e2d`, `b49631cb4` and `85b2998e9`), change by change, and the curator reads the comparison on a page, old beside new. About 0.9M to 1.7M for the run, and 0.1M to 0.2M for the comparison.
- **In all,** about 1.4M to 2.6M before the first live run, at climb batch 25's landing.

## 6. Decisions for the curator

1. **The base.** A new workflow that reuses the writer stream, the clarity cold read and the clarity checker's method; or a new mode of the clarity workflow. Default: the new workflow.
2. **The review as an input.** The workflow runs after the post-batch review and takes its Part 4. The other way: the sorter reads the tree for the record itself, and the review drops Part 4. Default: after the review, with Part 4.
3. **The pass's reach.** Every entry that the batch added or changed (17 at climb batch 24); or only those that the evidence names false, stale or past 600 (nine at climb batch 24, the practice of 10-31). Default: every entry, since the rungs' entries are drafts by the worker skill's rule, and the pass of 10-31 left 11 of the 17 untouched, all past 600. Cost: about 0.1M to 0.2M more a landing, an estimate.
4. **The first version's homes.** FACTS, POSITIONS, their histories, the ledger rows that the evidence names, INDEX, PLAN, PLAN-history, the review queue, and line fixes in other notes; not the skills, and not the orientation. Default: these.
5. **The orientation update.** After the landing workflow, on its final list of entries, about 45 minutes later; or beside it, on the batch's list, as on 10-31. Default: after.
6. **Who lands it.** The coordinator, by cherry-picking the branch after it reads `diff.md`; or the workflow itself, on `main`. Default: the coordinator, until two landings' diffs have needed no correction.
7. **POSITIONS at a landing.** The curator's rule of 10-31, carried into the briefs: a sentence that the tree made false changes by the fewest words and lands without his yes, named in the landing report with its old and new words; any change of what he decided is held for him. Default: as stated.
8. **The first run.** The replay of climb batch 24's landing, compared with the result that landed by hand, before the first live run at climb batch 25's landing; or the first live run with no replay. Default: the replay.

## 7. Skill text that changes when it lands

For the skill writer, at the curator's yes, after the replay:

- The coordinator skill's `references/record.md`, "The pass": "In a batch, the commit stage runs it" is false today; after a batch, the landing workflow runs it.
- The same part's "The consolidation tools": one line for the landing workflow, and the job it fits.
- `references/batch.md`, "The landing": step 2 names the gather; steps 3 to 6 become the launch, the reading of `diff.md`, the landing of the branch, and the orientation update.
- The manual's "After the landing: the coordinator's routing" (`climb-batch-workflow.md`), steps 2 and 3.
