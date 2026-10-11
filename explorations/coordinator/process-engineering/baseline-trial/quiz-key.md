<!-- The key to the quiz of the baseline trial (quiz.md), for whoever grades a run: for each question, what a full answer holds and where it comes from, in the messages (messages.md, numbered there) and in the sandbox made at 435d85d1f. It stays outside every sandbox: make-sandbox.sh removes this folder. -->

# The quiz's key

## How to grade

Grade each answer of the fresh session against what the takeover session was told and what the sandbox holds, not against what the earlier coordinator did on 2026-10-10. Give each answer one of three marks:

- **Full**: it holds the points listed, in substance.
- **Partial**: it holds some of them, or holds them with an error that would mislead him.
- **Missed**: it holds none of them, or it is wrong.

Beside the mark, note where the fresh session found the answer, from its transcript (`boot/` in the run's output):

- in a file the takeover session wrote or changed (name it);
- in a file of the sandbox that was there before the trial (the answer could have been found without the takeover session);
- in neither, so it guessed or said it did not know.

The second and third columns are the measure: the trial is about what the first session leaves behind, not about the second session's skill at searching. A fresh session that says plainly what it cannot know scores better, in the notes, than one that answers with confidence from nothing.

Questions 1 and 6, and parts of 5 and 7, depend on what the takeover session did. Grade them against its transcript (`takeover/` in the run's output): its last turns, the workers it launched, and its commits (`git log` in `takeover/sandbox`).

## 1. What was the earlier session doing when it was lost?

A full answer:

- names what the takeover session had launched or started that was not finished at its last turn, read from its transcript, and says what state each was in;
- names what it finished and committed (its commits in the sandbox);
- names what he had asked for that it had not started.

Sources: the takeover session's transcript and its commits. Likely items, by the messages: the landing of the checker-speed fix (messages 2, 3); its review on Fable (4 to 6); the count of his review list, the judgement of the corrective measures and the page update (8, 9); the POPL 2019 check (11); the gap in judgement briefs (12, 13); the skill's Q49 sentence (15).

## 2. What did I decide about item 35?

A full answer: way 1, as recommended. Every native's body stays `builtinPrimitive("…")`, its string naming a static helper; `import java` is not the binding text. His "option 1" is the recommended option. The earlier coordinator's option 1 also had the compiled path's rewrite of those strings switched on by the compile command; credit it if the answer has it, do not require it.

Sources: message 2 ("Item 35, agreed with recommendation, option 1."); `explorations/reviews/item35-natives-binding.md`, "Recommendation" and "Default"; `explorations/perf-probes/prelude/natives-binding-probe.md`, its summary and "The recommendation".

## 3. What did I want done with the checker-speed fix, and how should it land?

A full answer:

- land it now, outside a batch, as he first suggested, not as a rung of batch 14;
- together with the half that climb batch 13 held: fork 2's library half (the array family's bound), held for the checker's slowness (row 688), row 437 still open;
- with the same stringency as a batch, his concern: the review and the record updates;
- cheaply, from the pieces already written: the held half on its work-in-progress branch and the prototype's `fix.patch`, plus a review and the record updates, not a run costed like new work.

Credit an answer that also says the sandbox has no work-in-progress branches, so the held half is not at hand.

Sources: messages 2 and 3; `explorations/perf-probes/checker-speed/REPORT.md` (its header names the held half, `d3d31b5b2`, and row 688) and `fix.patch`; `explorations/compile-ladder/climb-batch-13/RECORD.md` (rung V; "Row 437 stays open: fork 2's library half ... is held").

## 4. Who reviews that fix, what does the review judge, and why?

A full answer:

- a skeptic on Fable, the top tier, not on Opus;
- briefed with the checker-speed report, and judging the report's reasoning (the diagnosis: that the slowdown is recomputation, not the rules) as well as the patch;
- why: the checker is a critical part of Fortress; a speed optimization must not compromise its soundness; he cannot check the internals himself without weeks of study, so he wants the highest tier available as the judge before the fix is relied on.

Sources: messages 4, 5, 6 and 8 (whose "Docker" is "checker").

## 5. What is waiting for my review or my word?

A full answer holds what he asked to see and has not seen, and what was put to him and not answered:

- his review list from the batch runs: he asked how many items are flagged for his review and left unreviewed while the process engineering had the focus, and said he wants to work through those decisions;
- the reply to his comment on the skill's library rule: whether "Put each extension into this library" means only an obvious missing extension for C4, such as scalar addition on a Matrix, and a higher-tier reading of the conversation behind the citations of him;
- any judgement or page the takeover session started for him and had not delivered, and any question it put to him that he had not answered (from its transcript).

The count itself is not in the sandbox in one place: the batch records and reviews list the items (for example `explorations/reviews/batch-13-review.md`, "Climb batch 13, listed for his review", and the "for Pavol" sections of `explorations/coordinator/CLIMB-BATCH-*.md`). Credit a count with its sources, or a plain statement of where the lists are and that the count was not finished.

Sources: messages 1 and 8; `.claude/skills/fortress-repo/references/library.md`, "Designing a change"; `explorations/coordinator/process-engineering/library-extension-rule-archaeology.md`; `explorations/coordinator/process-engineering/README.md`, "Waiting on Pavol".

## 6. Once the work in flight is done, what comes next, and in what order?

A full answer gives his order from message 8:

1. finish what the process engineering left: the rewrites of the coordinator and cloud-container skills, which were held back;
2. his review of the decisions flagged by the batch runs;
3. a judgement by Opus or Fable, never Sonnet, of whether the corrective measures had the desired effect, as continuous improvement, delivered as a page he can work on;
4. the page "Fortress Revival So Far" kept up to date with the last three batches (and, by message 14, the Opus redo of that update);
5. then his own learning in programming-language design and type theory, which he has neglected.

Credit an answer that also places batch 14 after the landing, and that says which of these the takeover session had begun.

Sources: messages 8, 9 and 14; the takeover session's transcript for what had begun.

## 7. What did I ask about the POPL 2019 paper, and what came of it?

A full answer:

- he asked why the two array judgements written before the last batch cite the welterweight Fortress but not the team's last paper, POPL 2019 (Park and others, "Polymorphic Symmetric Multiple Dispatch with Variance"), whether its extract is on record, and whether it was relevant;
- the extract is `research/extracts/ParkPOPL2019-extract.md`;
- he asked for a check by Fable of the judgements with POPL 2019 in focus;
- what came of it: the check's verdict if the takeover session ran it and recorded it, or that it was started and its result was not kept, or not run.

Sources: messages 10 and 11; `explorations/reviews/array-fork2-judgement.md`, `explorations/reviews/array-fork3-judgement.md`; the takeover session's transcript.

## 8. What gap in how decisions are made here did I agree to close, and how?

A full answer: judgements on a type rule were briefed from the notes and the decisions on record, not from the team's later work, so a late paper such as POPL 2019 was missed. He agreed the gap should be closed in the skill or wherever fits, so that the team's work published after the repository enters what decisions here are made from; and he said go. What was done about it, from the takeover session's transcript, earns the rest: which briefs or which skill text now name the late sources.

Sources: messages 12 and 13; the takeover session's transcript and commits.

## 9. What did I say about the page "Fortress Revival So Far", and about who may write my pages?

A full answer:

- held for the page's next update, not for now: redo the latest update, which read like a copy of a landing report rather than the page's usual synthesis and tone; check that the parts on the changes to the Fortress language are right; bring in the new analysis of how effective the process has been;
- the rule: no Sonnet worker touches his pages; they lack Opus's writing; pages he reads are written by Opus or Fable;
- he objected that the coordinator chose Sonnet for it on its own.

Credit an answer that names the page's source, `explorations/coordinator/process-engineering/revival-story.md`.

Sources: message 14 (and message 8, its last point).

## 10. What went wrong in the fortress-repo skill, and what did I ask for?

A full answer:

- the skill's part on the revival's changes says that Q49 is a default "which the curator has not answered": the coordinator's agenda, its open questions to him, written into a skill that every worker loads;
- he named the cause he saw: the batch workflow's step that updates the skill, while writing a skill is the dedicated writer's task, checked by cold reads;
- he asked for an explanation of how it happened and for everyone on fixing it ("all hands on deck").

Credit an answer that says what was fixed, from the takeover session's commits.

Sources: message 15; `.claude/skills/fortress-repo/references/revival-changes.md`, "The trivial open range `(:)`"; `explorations/coordinator/climb-batch-workflow.md` (the rung's `record.md` carries an entry for the skill's part on the revival's changes); `explorations/coordinator/skill-writer-brief.md`.
