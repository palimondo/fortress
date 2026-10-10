<!-- An audit of the three project skills for the coordinator's agenda and the curator's decision process leaked into text that workers load: 19 findings by file, how the climb-batch workflow writes skill text, a fix that leaves skill text to the skill writer and a cold read, and a lint pattern list. Read-only audit of 2026-10-10, at `bb70ea5cb`. -->

# Agenda in the skills: an audit

## What was checked, and the rule used

Every file under `.claude/skills/` was read whole: `fortress-repo` (`SKILL.md`, its 15 parts and `sources.md`), `coordinator` (`SKILL.md`, its 7 parts and `sources.md`) and `cloud-container` (`SKILL.md`, its 4 parts and `sources.md`). Grep was used to find the commits and to test the lint.

The yardstick is two POSITIONS entries: "The skills are written for a reader new to the repository, and checked against what the workers did." (`fortress-repo` "carries no batch structure", names no authority an agent cannot act on, and holds no rule an agent cannot act on) and "The delta from the original Fortress is a part of the skill, kept current." (each entry is the original contradiction, the resolution and its reason). Principle 3 of `explorations/reviews/skills-writing-principles.md` already bans "a slogan (a decision's title copied from the record)" and "a provenance word".

The five kinds of finding:

1. A process handle: a question, item, batch, rung, page thread or decision named by its handle.
2. Status or provenance in place of the rule: who decided, when, whether it is answered.
3. A coordinator's record named as the authority for what to do: PLAN, a batch record, the boot note, the held list, a review's "For Pavol".
4. Text that goes stale when the curator answers, a batch lands or a count moves.
5. In `fortress-repo` only: the coordinator's process or the batch workflow's roles.

Two lines were drawn when judging:

- A sentence that names the curator's decisions as the authority for a class of rules is kept. `SKILL.md` makes that the worker's rule ("Carry out the curator's decisions as the record states them"), and `exploring.md` uses it as a trigger. Examples kept: `library.md:20`, the heading "The curator's decisions on the library"; `records.md:18`, "The reader of your report brings it to the curator."
- A sentence that gives the provenance or status of one rule, in place of its reason, is a finding.

## The count

19 findings: 18 in `fortress-repo`, 1 in `coordinator`, 0 in `cloud-container`. Six are severe: a question's handle, its status or who decided it, standing as a rule's text or reason in a part that workers load (RC2 to RC6, CO2). The rest are minor wording.

By file:

- `fortress-repo/references/revival-changes.md`: 6 (5 severe)
- `fortress-repo/references/compiler.md`: 5 (1 severe)
- `fortress-repo/references/gate.md`: 2
- `fortress-repo/references/interpreter.md`: 1
- `fortress-repo/references/exploring.md`: 1
- `fortress-repo/references/tests-writing.md`: 1
- `fortress-repo/references/sources.md`: 2 (it is maintenance-only, so only status counts there; see below)
- `coordinator/references/boot.md`: 1
- `cloud-container`: none

By kind (a finding can show several kinds): kind 1 in 4 findings, kind 2 in 11, kind 3 in 3, kind 4 in 11, kind 5 in 3.

## Findings, by file

### fortress-repo/references/revival-changes.md

**RC1. Line 11.** "Each resolution is a decision of the curator."

- Kind 2. It gives provenance for every entry, and it is false for an entry that landed at a default the curator has not answered, which the batch fold puts in (RC2, RC6).
- Fix: restate. "Each resolution is the rule of this tree. Follow it as you follow a decision of the curator, and question it only on new evidence (`SKILL.md`, "When to explore")."
- Introduced by `24af7743b` (2026-10-08). Other: the skills-rewrite Workflow `wf_185878c8`, its consolidating agent.

**RC2. Line 126.** "This is the default of Q43 in `explorations/coordinator/CLIMB-BATCH-13.md`, which the curator has not answered."

- Kinds 1, 2, 3, 4. Q43 is a handle; "default" and "has not answered" are status; the batch record is named as the source; the sentence goes false when the curator answers. Item 43 is still open in `review-queue.md:261`.
- Fix: delete. The provenance is in `sources.md:437`.
- Introduced by `9ba86f7da`, climb batch 13's gather (rung O): the rung's `record.md` text, folded word for word ("the default of Q43 (way 1b) ... which the curator has not answered", in the batch 13 journal). The cold read `29e4b4bd8` kept it and dropped only "(way 1b)".

**RC3. Line 171.** "Reason: the curator's answer to Q50 in `explorations/coordinator/CLIMB-BATCH-12.md`."

- Kinds 1, 2, 3. The reason is given as "who answered" and a batch record.
- Fix: delete this first sentence of the Reason. The next sentence is the reason itself: "The lexicographic order serves sorting, and a corner outside the bounds on any axis is outside them." The provenance is in `sources.md:435`.
- Introduced by `abe8b0342`, climb batch 12's gather (rung R), as "the curator's answer to Q50." The cold read `3711db681` flagged "A reader of the skill cannot find Q50" and fixed it by adding the batch record's path (batch 12 journal, cold reader's flags).

**RC4. Line 176.** "This is the curator's decision: POSITIONS, "The open range `(:)` keeps its wildcard type, and its five cutting methods fail (item 49, row 656).""

- Kinds 1, 2. A provenance sentence, and a POSITIONS title copied as a slogan, with the handle "item 49" inside it.
- Fix: delete. `sources.md:582` already records the decision and its commit.
- History of the sentence:
  - `abe8b0342`, climb batch 12's gather (rung R): "This is Q49's default, and his answer is pending." This is the defect that started this audit.
  - `3711db681`, batch 12's cold read: "This is the default of Q49 in `explorations/coordinator/CLIMB-BATCH-12.md`, which the curator has not answered." Its flag: "Q49 cannot be found, and "his" has no antecedent"; its fix made the handle findable.
  - `1794398eb`, the skill writer, on the coordinator's task of 2026-10-10 ("Correct the sentence to state the present"): the present text. Status became provenance; the agenda stayed.

**RC5. Line 189.** "Reason: the curator kept the declared integer result."

- Kind 2. Who decided, in place of the reason.
- Fix: restate. "Reason: the declared result type is ℤ, and a division by zero whose result is an integer throws `DivisionByZero` (...)", keeping the citation that follows.
- Introduced by `74b28e9d4`, climb batch 12's gather (rung S), from the rung's `record.md`.

**RC6. Line 202.** "This is the default of Q45 in `explorations/coordinator/CLIMB-BATCH-13.md`, which the curator has not answered."

- Kinds 1, 2, 3, 4, as RC2. Item 45 is still open in `review-queue.md:267`.
- Fix: delete. The provenance is in `sources.md:438`.
- Introduced by `8f90e1e8c`, climb batch 13's gather (rung G), as "the default of item 45". The cold read `29e4b4bd8` renamed it to "Q45", "consistent" with the other entries. The agenda already in the part served as the model.

### fortress-repo/references/compiler.md

**CO1. Line 27.** "The record does not yet say what happens to `CompilerSystem` at the switch-over."

- Kinds 2, 4. The status of an undecided question. The sentence goes stale once the question is decided, and it tells a worker nothing to do. An unsettled question already sends the worker to exploring (`SKILL.md`, "When to explore").
- Fix: delete. If the question is to be tracked, it belongs in PLAN.
- Introduced by `8de47c11c` (2026-10-05). Other: an Agent-tool writer that fixed the skill from a cold read, before the standing writer.

**CO2. Line 50.** "The curator decided that array storage will be an unboxed `double[]`. This is not built yet. The other questions of the array design wait until after the switch-over."

- Kinds 2, 4. Who decided, the build status, and the coordinator's schedule for open questions. POSITIONS "The array design's three questions are open" holds that schedule.
- Fix: restate as "Array storage is to be an unboxed `double[]`. The code generator does not build it yet: every element is a boxed object (`SKILL.md`, "The compiled run time")." Delete the sentence on the other questions. Keep the `positions:` query, which is a narrow read with a trigger.
- Introduced by `24af7743b`. Other: the skills-rewrite Workflow.

**CO3. Line 56.** "Open ledger rows name it, such as rows 408 and 559."

- Kind 4 (minor). "Open" goes false when a row closes.
- Fix: "Ledger rows 408 and 559 name it."
- Introduced by `c69504e17`. The skill writer.

**CO4. Line 94.** "Both were written in September 2026, before the revival's batches, so a status or a line number in them can be stale."

- Kind 5 (minor). It names the batch structure.
- Fix: "Both date from September 2026, so a status or a line number in them can be stale."
- Introduced by `2a4a4b294`. The skill writer.

**CO5. Line 104.** "224 of the 549 `.test` files in `compiler_tests/` pin a whole diagnostic with `compile_err_equals` ..."

- Kind 4 (minor). The count moves with every new test.
- Fix: "Many `.test` files in `compiler_tests/` pin a whole diagnostic ... `grep -l compile_err_equals ProjectFortress/compiler_tests/*.test` lists them."
- Introduced by `2a4a4b294`. The skill writer.

### fortress-repo/references/interpreter.md

**IN1. Line 16.** "This is an accepted limit until the switch-over."

- Kinds 2, 4 (minor). "Accepted" is a decision's status. "Until the switch-over" is the coordinator's plan (POSITIONS "Walk chooses coercions on the value, for now.").
- Fix: restate as a fact and its record. "Walk has no static types, so it cannot choose statically. The gated tests `XXXCoercionStaticRungC` and `XXXCoercionStaticNarrowRungC` record the difference."
- Introduced by `70736a81d` (2026-10-04). Other: the coordinator's first writing of the skills.

### fortress-repo/references/exploring.md

**EX1. Line 16.** "Where their late positions disagree with the specification's earlier text, the curator gives the late positions more weight."

- Kind 2 (minor). Who weighs, in place of the rule.
- Fix: "... the late positions weigh more."
- Introduced by `24af7743b` (other: the skills-rewrite Workflow) in `specification.md`, and moved here by `be000aa07` (the skill writer).

### fortress-repo/references/gate.md

**GA1. Line 7.** "When the results land, the microGPT walk check of the landed tree adds its `VERDICT:` and `rc=` lines, as `# microgpt-walk` lines."

- Kind 5. This is the batch workflow's commit stage (`climb-batch-workflow.md:244`, step 0), told as part of the gate.
- Fix: describe the file, not the stage. "A landed summary can also end with `# microgpt-walk` lines: the `VERDICT:` and `rc=` lines of the microGPT walk check (`interpreter.md`, "The model program"), run on the landed tree."
- Introduced by `7b3226bb2`. The skill writer, in its batch 11 corrections.

**GA2. Lines 11 to 17.** "Steps 5 and 7 use shell functions from `explorations/coordinator/climb-batch-workflow.js`, where each of their lines is a JavaScript string."

- Kind 5. The gate's procedure lives in the batch workflow script, and the skill extracts it with `node` and `awk`. This is not agenda, but it is the batch workflow inside `fortress-repo`.
- Fix: move the six functions to a tool, such as `explorations/coordinator/tools/gate-functions.sh`. Have the script and the skill both source it. `sources.md:353` already notes this move ("until the outline's sourced file of the functions lands").
- Introduced by `24af7743b`. Other: the skills-rewrite Workflow.

### fortress-repo/references/tests-writing.md

**TW1. Line 51.** "The revival has added none there."

- Kind 4 (minor). It is a count, and it goes false with the first test added.
- Fix: as an instruction: "Put no new test there."
- Introduced by `1327c3b0d`. The skill writer.

### fortress-repo/references/sources.md

This file is for maintaining the skill. Its job is provenance (POSITIONS: "its `sources.md` traces each entry to the batch landing or the report it comes from"), so kinds 1, 3 and 5 are expected there. Only status that goes stale was counted.

**SO1. Line 477.** "... the pending edit holds the replacement texts for the manual and the script, to be applied before the next batch."

- Kind 4. "Next batch" has passed several times since.
- Fix: say whether it was applied, and by which commit, or that it is still only in `pending-script-edit.md`.
- Introduced by `33902baad` (2026-10-04). Other: the coordinator.

**SO2. Line 487.** "The skill follows the script's text and leaves the question to the curator."

- Kinds 2, 4. An open status with no outcome.
- Fix: give the question's place in the record, or its answer.
- Introduced by `073d3f607` (2026-10-05). Other: an Agent-tool writer, before the standing writer.

Not counted: nine lines that say "put to the curator" (lines 119, 210, 288, 485, 517, 523, 529, 532 and 533). They are past events, so they are history. None of them records the outcome, so a maintainer cannot tell whether the point is settled. The writer should add the answer when one comes.

### coordinator/references/boot.md

The coordinator's process belongs in this skill. The status of one particular question does not, and no part names one. One count goes stale:

**BO1. Line 22.** "It costs about 250K tokens of context, `FACTS.md` about a third of it ..."

- Kind 4 (minor). The figure moves as FACTS grows. `coordinator/references/sources.md:36` already notes that the FACTS entry it comes from has outgrown its title.
- Fix: drop the figures and keep the point: "It is the largest single cost of a boot, and `FACTS.md` is the largest part of it: the price of full context, paid once per boot."
- Introduced by `33902baad`. Other: the coordinator.

### cloud-container

No findings. Its figures (4 CPUs, about 37 GB, 12 h 58 min) describe the platform, not the project's progress.

### Checked and not counted

- State of the tree: "today" (`SKILL.md:73`), "until the switch-over" (`revival-changes.md:86`, `:120`; `compiler.md:41`), "not yet". These describe the tree and change only when code changes, which the after-landing update covers.
- Ledger rows as evidence, everywhere.
- Paths of tools that sit in batch or rung folders, such as `rung-inference-walk/harness-one.sh` (`tests-running.md:90`, `worktrees.md:68`) and `climb-batch-N/merged-tests/junit.sh` (`tests-running.md:111`), and the gate's `climb-batch-*` folders (`gate.md:9`, `:25`). These are the tree's layout. The tools would sit better under `explorations/coordinator/tools/`.
- Approximate suite sizes with a pointer to the exact counts (`tests-running.md:14`, `:21`, `:25`).

## How it got there

### Which batch stages write into `.claude/skills/`

Three stages of a climb batch write skill text. The constant is `DELTA_PART`, the path of `revival-changes.md` (`climb-batch-workflow.js:65`).

1. **The gather.** Step 2 folds each rung's entry into the part "as the rung wrote it but for what the part's form needs". It also adds one line to `sources.md` (`climb-batch-workflow.js:1181`). Step 5 commits both in the rung's own code commit (`:1185`). The result returns `deltaEntries` (`:1208`, `:1222`), which decide whether a cold read runs (`:2043-2045`). The manual says the same (`climb-batch-workflow.md:33`, `:160`), and so does `process-engineering/batch-redesign.md:14`, `:133`, `:290`.
2. **The merged-diff review.** It may correct the part in its own commit ("keep your own corrections inside explorations/ and" the part, `:1245`). Its check 3 asks only that the entries be "true of the code as landed" (`:1258`; manual `:176`, `:183`; `batch-redesign.md:144`). In batches 11 to 13 its three commits to the part fixed content only (`79ce86fd1`, `5ac066690`, `510e80b8f`).
3. **The cold reader.** It commits its fixes to the part (`:1294-1325`, launched at `:2083-2094`; manual `:236-238`; `batch-redesign.md:163-167`).

The rung worker may not edit `.claude/` (`:793`). The skeptic may correct the entry inside `record.md` on the branch (`:908`). The commit stage writes no skill text. It treats `.claude/` like `explorations/`, with no `historical:` line (`:1690`), and `codePathsOf` leaves `.claude/` out of the paths that rerun the gate (`:1526`; `batch-redesign.md:291`).

Outside the script, the coordinator skill makes the per-landing update a rule with no named writer (`coordinator/references/roles-and-records.md:36`). It sends to the skill writer only "every skill edit that a comment asks for" (`coordinator/references/talking.md:45`).

### What the rung worker is told

- Its brief ends with its section of the batch record, word for word, which "opens with the answers on record that it follows" (`:780`). The manifest's sections carry the handles and the status. For example: "**The answers this rung follows.** Item 15 is answered (2026-10-09): 15a with its part (b) ..." (`:95`), and "Under Q43, row 634's tuple half ..." (`:174`).
- Its `record.md` holds "the entry for the skill's part on what the revival changed ... in that part's form and register (explorations/reviews/skills-writing-principles.md)", or "Revival change: none" with the reason (`:790`; manual `:97`; `batch-redesign.md:78`).
- Nothing tells it to leave out the brief's Q-numbers, item numbers, batch names or the status of a decision. `batch-redesign.md:256` notes that the part shows its form "only by example". So the worker copies the frame of its brief into the entry.

### What the gather does with the entry

It folds the entry word for word into the part. It adds the `sources.md` line and lands both in the rung's code commit (`:1181`, `:1185`). No step reads the entry for anything but its form and, in the review, its truth.

### What the cold reader checks

- It reads `SKILL.md` and the part "as an agent new to this repository would, given only the skill", and "nothing else of the record" (`:1306`).
- It flags "a term not defined where it is used, a claim a reader could not check, a sentence that reads two ways, a gotcha the entry leaves out, a sentence that breaks the part's register" (`:1310`).
- It may fix "its wording, a term defined, a reference made exact". It may not fix a flag "whose fix would change what an entry claims (the team's source it contradicts, the revival's resolution, or the reason)" (`:1310`).
- So a handle that a newcomer cannot follow is treated as an undefined reference, and the allowed fix is to make it findable. That is what happened. Batch 12's reader made "Q49" and "Q50" exact by adding `CLIMB-BATCH-12.md`. Batch 13's reader dropped "(way 1b)" as an undefined term but kept the rest, and renamed "item 45" to "Q45" for consistency. Removing a provenance-only Reason sentence (RC3, RC5) counts as changing "the reason", so the reader could at most return it to the coordinator, and it did not.

### Does anything stop status words

No stage does.

- The worker is pointed to the writing principles "for the register". Principle 3 bans "a slogan (a decision's title copied from the record)" and "a provenance word" (`skills-writing-principles.md:21`), but no stage checks it.
- The gather folds verbatim. The review checks truth. The cold reader makes handles exact.
- The coordinator's after-landing step settles the cold read's flags (`climb-batch-workflow.md:271`). The writer's post-batch corrections (`38def33a9`, `6c021c983`) fixed sentences that the batch made false, not handles.
- The writer's own rule, "Provenance goes only in the skill's `references/sources.md`" (`explorations/coordinator/skill-writer-brief.md:59`), did not stop `1794398eb`. The coordinator's task asked it to "state the present" of Q49, and the writer stated who decided.

### Who wrote into `.claude/skills/` since 2026-10-08

58 commits since 2026-10-08 00:00 UTC. All carry the author name "Claude", so each was attributed from the earliest transcript record that holds its hash, compared with the commit time. The transcripts searched were the local ones and those on the `transcripts-blinded` backup branch. The writer's reports under `tmp/skill-writer/` were also used.

- **Batch stages: 17.**
  - Gather: 11. Batch 11: `369982d85`, `2d22d3a35`, `b872d65a1`. Batch 12: `74b28e9d4`, `aadd02f23`, `abe8b0342`, `fdd377ead`. Batch 13: `9ba86f7da`, `8f90e1e8c`, `7fd8fddc8`, `efd6bb2f2`.
  - Merged-diff review: 3 (`79ce86fd1`, `5ac066690`, `510e80b8f`).
  - Cold read: 3 (`9928f59d8`, `3711db681`, `29e4b4bd8`).
  - Commit stage: 0.
- **Skill writer: 37.** 34 by the standing headless writer (`tools/skill-writer.sh`), from 2026-10-08 04:36 to 2026-10-10 06:20 UTC. 3 by the Agent-tool writer that came before it and whose brief became the standing one (`a6138453d`, `d00caf0a0`, `79e2aa569`).
- **Coordinator: 1** (`9e5fca711`, a one-line fix after a page comment).
- **Other: 3.** The skills-rewrite Workflow `wf_185878c8`: its consolidating agent (`24af7743b`), its fixer after the cold reads (`9a9c30d95`), and its Fable comparison (`cae2a0ad5`).

The five severe findings in `revival-changes.md` came in through four gather commits (`abe8b0342` brought two). The two cold reads kept all five, and made the Q49 and Q50 handles findable instead of removing them. The writer then turned Q49's status into provenance.

## Proposed fix to the mechanism

Goal: skill text is written only by the skill writer, under its standing brief, and then read cold. This is the rule POSITIONS already states ("One writer does the writing"), applied to the revival's changes too.

1. **The batch writes no skill text.**
   - Take `DELTA_PART` out of the gather's step 2 and step 5 (`climb-batch-workflow.js:1181`, `:1185`).
   - Take it out of the review's write scope and out of check 3 (`:1245`, `:1258`). The review keeps checking that the material is true of the landed code.
   - Remove the batch's cold-read role and its launch (`:1294-1325`, `:2083-2094`), and the `deltaEntries` routing (`:2043-2045`).
   - The commit stage checks that `git diff --name-only BASE HEAD -- .claude/` prints nothing, and lists a `skill-touched.N` item if it does.
2. **The rung's `record.md` carries material, not skill text.** Its "Revival change" section has two labelled parts:
   - The change: the team's source and what it says or does, with file:line; what the tree now does, with the test; and the reason as evidence (a passage, a checker refusal, a measured failure).
   - Provenance: the question or item, the answer or default it follows, and the batch.
   - The worker is told: "Name no question, item, batch, rung or record file in the change, and give no decision's status there; provenance goes in its own part." The gather copies both parts into the batch's `RECORD.md`, under "Revival changes, for the skill writer".
3. **After the landing, before the next launch, the writer writes.** The manual's "After the landing" step 4 (`climb-batch-workflow.md:271`) becomes one task for the standing writer:
   - the batch's revival-change material;
   - the skill sentences that the batch made false, which the post-batch review already lists, as in `38def33a9` and `6c021c983`.
   - The writer states each entry as a rule of the tree: Original, Resolution, Reason. Provenance goes only in `sources.md`, written as dated history ("rung O's REPORT.md; landed at Q43's default, 2026-10-09"), never as current status.
   - POSITIONS asks for the part to be "updated after every batch's landing, so that the next batch reads the fresh version". This keeps that: the next batch already waits for step 4.
4. **Then a cold read of the changed parts**, by an agent given only the skill, as POSITIONS asks for every rewritten part. Its brief adds one flag kind: "a question, item, batch, rung, review or record file named as the source of a rule, or a decision's status (who decided, answered, pending, default): delete it; never make it exact." A Reason sentence that gives only provenance may be deleted, since that changes no rule. The writer fixes the flags. The coordinator pushes.
5. **The writer's standing brief gains one rule**, beside its line 59: "A part states each rule as the tree holds it. Name no question, item, batch, rung or record file as its source, and give no decision's status. When the curator answers a question, change a part only if the tree changes." The writer runs the lint below before each commit.
6. **The coordinator stops sending status updates to the skill.** An answer that confirms a landed default changes no skill text. An answer that reverses one changes the code in a batch, and the writer updates the entry after that landing. A task like "state the present of Q49" does not arise.
7. **Records to update with the fix:**
   - `coordinator/references/roles-and-records.md:36`: name the writer and the cold read.
   - `coordinator/references/talking.md:45`: every skill edit, not only those that a comment asks for.
   - The manual: `climb-batch-workflow.md:33`, `:97`, `:160`, `:176`, `:183`, `:236-238`, `:271`.
   - `batch-redesign.md` §7, item 3.
   - The cold-read scenarios of `tools/workflow-scenarios.js`.

Cost: the batch's cold read, about 0.08M when it ran (`batch-redesign.md:219`), moves after the landing. It joins the writer's correction task, which already runs after every batch.

## Lint pattern list

Python `re` syntax, case-insensitive unless a pattern says `(?-i:...)`. Each set has a scope:

- `fortress-repo` and `cloud-container` parts and `SKILL.md`: every set.
- `coordinator` parts and `SKILL.md`: the handle set (coordinator form), the status set and the stale set. The coordinator's process belongs there, so the other sets do not apply.
- Every `references/sources.md`: the sources set only. Its job is provenance.

Process handles (kind 1). In `coordinator`, only the first four, with `rung [A-Z]` and no `rung's`:

    \bQ\d+(\.\d+)?\b                                        Q43, Q13.3
    \bitems? (1\d|[2-9]\d|\d{3})[a-z]?\b                    PLAN items 10 and up; the parts' own "item 1" to "item 3" pass
    \b(climb )?batch(es)? \d+('s)?\b                        batch 12, batch 12's
    \brung (?!-)[A-Z]\b|\brung's\b                          rung R; folders such as rung-inference-walk/ pass
    \b(review|gather|coldread|delta-unfolded|review-routed|judge-review)\.\d+\b

Status (kind 2, and kind 4 when it can go stale):

    \b(pending|unanswered|not (yet )?answered|has not answered|awaiting|still open|leaves the question|to be applied)\b
    \bdoes not yet say\b|\b(is|are) not yet (decided|known|answered)\b
    \bthe default of (Q\d|item \d|way)|\bat (its|the) default\b|\bway \d+[a-z]?\b

Provenance (kind 2):

    \bcurator('s)? (decided|kept|chose|ruled|answered)\b
    \bthe curator (gives|weighs|keeps)\b
    \bcurator's (answer|decision|ruling|choice)\b          (review: "needs the curator's decision" is a rule)
    \bis a decision of the curator\b
    \b(his|her) (answer|decision|word|go|review|choice)\b
    \b(taken|decided|landed) on the recommendation\b
    \baccepted (limit|default)\b
    \b(listed|filed) for (his|the curator's) review\b
    \bPavol\b

Records named as authority (kind 3):

    CLIMB-BATCH-\d+|(?-i:\bPLAN(\.md)?\b)|review-queue|held[- ]list|boot note|For Pavol
    POSITIONS(\.md)?,? "                                   a POSITIONS title quoted in prose; the positions: query passes
    explorations/reviews/batch-\d+-review

Stale (kind 4):

    \b(next|this|last|previous) batch\b                    (review in coordinator: process rules say "the next batch")
    \b\d+ of the \d+\b                                     "224 of the 549"
    \bopen (ledger )?rows?\b
    \bhas added (none|no|\d+)\b
    \b\d+(\.\d+)?[KM] tokens\b                             (review: harness figures such as 45K pass)
    \bdistance (to the switch-over )?(is|fell|rose|of) \d

Batch structure (kind 5):

    \bthe (gather|skeptic|judge|cold reader|commit stage)\b|\bmerged-diff review\b|\brung worker\b
    climb-batch-workflow\.(js|md)
    \bthe revival's batches\b
    \bwhen the results land\b

Sources set (every `references/sources.md`):

    \b(unanswered|not (yet )?answered|has not answered|awaiting|still open|leaves the question|to be applied|next batch)\b|\bpending\b(?![- ](script-)?edit)

Checked on this tree with a scratch script. The sets hit all 19 findings. They also give six hits to read and pass:

- `fortress-repo/SKILL.md:3`: "boot notes" in the description, which sends that work to the coordinator skill.
- `fortress-repo/references/records.md:18`: "needs the curator's decision", a rule.
- `coordinator/references/agents.md:18` and `boot.md:11`: the harness's 45K and the Read tool's 25K.
- `coordinator/references/decisions.md:24` and `:31`: "the next batch" in process rules.

Where to run it:

- The writer runs it before each commit.
- The cold reader runs it first and treats every hit as a flag.
- A check in `tools/workflow-scenarios.js`, or a pre-commit hook on `.claude/skills/`, can run it on every commit to the skills.
