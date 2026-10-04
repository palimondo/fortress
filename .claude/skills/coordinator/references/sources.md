# Sources of this skill (for maintaining it only)

Not for a task: an agent doing work never loads this file. It says where each rule in the parts came from, so that the skill can be re-checked when the way of working changes. "The protocol" is `explorations/protocol.md`, cited by hard rule or principle; "the README" is `explorations/coordinator/README.md`; POSITIONS entries are named by their bold title, all in `explorations/coordinator/POSITIONS.md`, sections "How we work" and "How he wants to be spoken to"; "the archaeology" is `explorations/coordinator/answer-form-archaeology.md`; "restate-and-hold" is `explorations/coordinator/postmortem-2026-09-19/restate-and-hold.md`; "the boot note" is the top of `explorations/coordinator/postmortem-2026-09-19/held-list.md`; "the script" is `explorations/coordinator/climb-batch-workflow.js`.

## The curator, and the boundary with the other skills

- The human in the loop is named by role, "the curator", the person who curates the restoration and decides what is committed and what the agents are asked to do; no person's name appears in the skill (the curator's review comment on the skill page: a name in a skill is a red flag; the human in the loop described neutrally, by a role).
- The boundary: this skill reads the other two and they never point here; workers never load it; what a report holds is the `fortress-repo` skill's contract, "What every report holds", named here and not restated (the curator's review of the skills, relayed by the coordinator: the coordinator skill will probably supersede the protocol, and the skills must not depend on each other implicitly or explicitly).
- Lines moved here from the other two skills when they were split: "A question for the curator goes in plain text, one at a time, never in a dialog tool. Time is read from the clock, never guessed."; "a step his yes already covers is taken without asking again"; "A question put to the curator names the library's own way first"; "say which reading you acted on" when a goal is unclear; "a closed decision is not reopened or re-asked"; the git-check hook's reminders answered silently and never mentioned to the curator; an accidental stop said so, and the run resumed.

## SKILL.md

- Framing: the README, "The coordinator is two things"; the protocol, principles 3 and 5; POSITIONS "Ownership.", "The coordinator's standing goal".
- Rules: a decision inside a report: the protocol, principle 3; POSITIONS "Ownership.". One ask, plain text, no dialog: the protocol, principle 3 and hard rule "Never the AskUserQuestion dialog". Closed decisions, a step a yes covers: the protocol, hard rule 1 and principle 4. Time: the protocol, principle 3; POSITIONS "Format.". Delegate: the protocol, principle 5. A goal unclear: the protocol, principle 4. Purposes govern, a rule weighed by its cost, propose the fix, proportion: the protocol's opening paragraph and "What keeps going wrong"; POSITIONS "A tests-only repair does not rerun the gate." (weighing cost against what a rule protects).
- Failures to watch for: the protocol, "What keeps going wrong".
- Pointers: the protocol's last paragraph (the container note and the batch manual); the `fortress-repo` and `remote-container` skills.

## roles-and-records.md

- The two roles and their records: the README, "The coordinator is two things"; the analyst: POSITIONS "The coordinator's standing goal" (the two hats: executive assistant and analyst).
- PLAN's lists for review: `explorations/coordinator/PLAN.md`, its sections "Climb batch N, listed for his review". The review queue and its upkeep: `explorations/coordinator/review-queue.md`, header comment.
- The standing goal: POSITIONS "The coordinator's standing goal".
- How the records are kept: the README, "How they are kept"; the protocol, principle 6; POSITIONS "The record's form: an optimized build and a debug build."; the check: `explorations/coordinator/tools/check-verbatim.py`.
- His words only where they are the position: the protocol, principle 6 (the README says "in his words", principle 6 narrows it).
- Folding workers' lines, reviewing after and fixing by a further commit: the protocol, hard rule on workers' commits; the script's prefix, "What you write, and what you must not touch" (`:1028-1033`).
- The transcript as the record of a worker's order of work: the protocol, hard rule "The gate"; POSITIONS "What a batch commits.".
- The boot note's process times: FACTS "The platform stops the session's process ..." (the last start and the next stop are the boot note's). An untitled FACTS entry cited by its opening words: the README, "How they are kept".

## boot.md

- The order and what is read: the README, first paragraph; the protocol, principle 5 ("Boot reads the record and nothing else").
- FACTS in pages: the boot note (its paragraph on the container: FACTS read in pages of about 20 lines, the Read tool's page holding 25K tokens).
- The hook and a worker's own compaction: the `remote-container` skill, its hooks part.
- In flight from the tree: POSITIONS "While a batch runs" (the client showing stale state).
- An order lost and re-asked: the protocol, principle 4.
- Reading disk and pushes after a stop: the `remote-container` skill's rules.

## delegation.md

- What goes to a worker: the protocol, principles 4 and 5; probing forks: POSITIONS "Forks are probed before a batch is briefed.".
- Tiers: the protocol, principle 5; POSITIONS "Which tier runs what.".
- Fable without asking, pre-approvals, the yes: POSITIONS "The Fable rule.", "The judge's rulings.", "The phase-3 batches run on a standing go." (the top-tier review in place of a batch record); the protocol, hard rule 1 and principle 5.
- A brief: the protocol, principles 2 and 5, "What keeps going wrong" (the brief that said "verify, do not trust"); POSITIONS "A brief describes the problem, not the solution.", "No re-measuring what the record holds.", "The mission briefing."; stops reserved: the script `:682`, `:1145`.
- Watching: POSITIONS "The coordinator watches what it launches."; the how, the `remote-container` skill's agents part ("Watching a long run").
- Estimates: POSITIONS "Estimates in the project's units.".
- The mission briefing: POSITIONS "The mission briefing."; the manual, "Shared prefix". After every landed batch: POSITIONS "One review after every batch."; `explorations/reviews/process-review-6b-7-7R.md` (the process measures); `explorations/reviews/batch-10-review.md` (tokens written by role).

## decisions.md

- Reading reports: the `fortress-repo` skill, "What every report holds"; the script's prefix "Register" (`:1022`, "a decision buried in a report is a decision not made").
- What is consequential and the three routes: POSITIONS "Which decisions taken inside the work reach Pavol, and how." (confirmed as written); first drafted from the curator's review of the skills, relayed by the coordinator (reverses one on record, changes a line of the model program, touches two or more of the specification, the library and the implementation, opens a fork, or cannot be undone); the protocol, principle 1 (a line of the model shown as a diff) and principle 5 (two or more of the three).
- Listed for later review instead: POSITIONS "Reversible stops do not hold a batch.", "The gate's comparisons." (masked differences, respelled team lines), "The phase-3 batches run on a standing go." (overnight defaults); `PLAN.md`'s review sections ("each is reversible, and the default is what landed"). Not stops: POSITIONS "Reversible stops do not hold a batch." (an output difference the untouched tree already shows; a rung's small items to the ledger). Engineering choices: POSITIONS "Test first, the test kept." (the suite per edit or per batch), "Nothing is built or run twice on the same code." (how a worktree is seeded).
- The three ways: asked first: POSITIONS "Forks are probed before a batch is briefed."; the protocol, principle 4. Landed and reviewed: the protocol, hard rule 1; POSITIONS "Reversible stops do not hold a batch.", "Ownership." (flagged at the time). A stop that holds: the script `:682` (a stop the record does not reserve, or one that cannot be undone, holds the push); POSITIONS "A blocking second review does not hold a green batch." (a red gate after its repair), "The phase-3 batches run on a standing go." (a default that would reverse a decision); `PLAN.md`, "Stop conditions for autonomous work" (a change of semantics against the specification, deleting a test to get green); the protocol, hard rule 1 (a batch run, a Fable worker).
- Going through the queue: POSITIONS "Ownership." (in detail, grouped by theme, reversals not the measure), "Forks are probed before a batch is briefed." (one per message).
- When something goes wrong: the protocol, principle 2; POSITIONS "A deeper pass, not a halt.", "A blocking second review does not hold a green batch.", "The judge's rulings." (no second repair round).
- Approvals: the protocol, hard rule 1; POSITIONS "The phase-3 batches run on a standing go." ("Go" starts background work only); a closed decision and the search first: the protocol, principle 4; `review-queue.md`, header comment.

## asking.md

- The five parts and their order: the archaeology, sections 1 and 4; the protocol, principle 3. The evidence order: the protocol, principle 2. The refresher: the protocol, principle 3 (first, within the context); the archaeology, section 1 (between the context and the options). The skill follows the protocol, the later text.
- The library's own way first: the protocol, "What keeps going wrong" (a fork put before the library's own way was checked); the archaeology, section 2 (row 40's re-explanation, the library's own way first).
- Lengths: the archaeology, section 1.
- A request for a yes: POSITIONS "Asks and decisions."; the protocol, principle 3.
- Around the form: POSITIONS "Asks and decisions."; the protocol, principles 1 (the model as a diff) and 3 (saying the curator is wrong, the rendered page); a single decision never a page: the archaeology, section 1.

## talking.md

- Register and format: POSITIONS "The register.", "Format."; the protocol, principle 3.
- Time: the protocol, principle 3; POSITIONS "Format.", "While a batch runs" (UTC and local time, Central European).
- What is not said: the protocol, principle 3; POSITIONS "While a batch runs"; the README, "A remark is not a decision" (record edits); the single "." for the hook's reminders: the boot note (its paragraph on the container). The stop said plainly: POSITIONS "Check-ins and stops."; `explorations/coordinator/interrupt-archaeology/judgement.md` § 1 (the curator asking whether a stop was pressed by accident).
- Restate and hold: the protocol, principle 3; restate-and-hold, "The shape that worked" and "Proposed protocol wording"; the boot note (the UTC time of the message; no "holding" on a full answer); the README, "the held list while he reads".
- Comments on a page: the boot note (read, answer on the thread, resolve, a few lines in chat); the ten-watch limit met in session `fe616d40` on 2026-10-04, an old page unwatched first. The `wip/` branches: POSITIONS "What a batch commits.".
