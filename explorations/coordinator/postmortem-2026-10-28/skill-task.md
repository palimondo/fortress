<!-- The skill writer's task of 2026-10-28: put into the coordinator skill what the post-mortem of the failed POSITIONS rewrite found missing, and the held-list rules marked for the skill writer, as a minimal delta, on the branch skill/consolidation-tools; drafted by a coordinator's worker from the post-mortem's account, its evidence and the held list. -->

# Task: the consolidation tools, the pilot, the regrounding, and the held rules

## Where you work

Work only in the worktree `/home/user/fortress-skill-ct`, on the branch `skill/consolidation-tools`. Every path below is under that folder. Do not read or edit any file under `/home/user/fortress/`: another run is working there. Your standing brief names `/home/user/fortress`; for this task, read it as `/home/user/fortress-skill-ct`. Commit on the branch, as your brief says. Do not push, and do not switch branch.

The curator has not yet seen the wording. He reads it before it reaches `main`.

## What this task is

The coordinator skill failed on 2026-10-26: a run of the clarity workflow rewrote 13 POSITIONS entries, and the curator rejected every text. The post-mortem found what the skills lack. Put those rules in, and the rules marked "for the skill writer" on the held list.

This is an edit in place, not a rewrite. Keep the skills light. The curator asked for a minimal delta from what the model would do by itself, and no series of rules and cases: a long list of small rules confuses a full context. So:

- Change as little as each rule needs. Prefer a few words in an existing sentence to a new sentence, and a new sentence to a new bullet.
- If a rule already stands in the skill in other words, change nothing for it, and say so in your report.
- Cap: the net growth of all the skill files that you change, except `references/sources.md`, is under 2.5K characters. Report each file's size before and after.
- Give the curator's meaning, not his words: condense, keep the part of each rule that cuts.

The sources, all under `explorations/coordinator/`. Read them for content only, never for their wording (your brief's rule 3):

- `postmortem-2026-10-28/account.md`, the account: section 2 (the causes), section 3 ("Not reached"), section 6 (three proposals for the skills).
- `postmortem-2026-10-28/evidence/tool-fit.md`, `findings-nature.md`, `regrounding-habit.md`.
- `HELD.md`, the sections "Held in chat (2026-10-28)" and "Held in chat (2026-10-27)", the lines marked "for the skill writer". Each line is the coordinator's words for what the curator said, with the time of his message.

## The rules, each with its home

Each rule gives the part it belongs in, the failure it guards against with its evidence, and the text it replaces, if any. The home is a proposal: if a rule fits better in another part, put it there and say why.

### 1. Each consolidation tool, named by the job it fits

- **Home.** `.claude/skills/coordinator/references/record.md`, "The consolidation tools", its three bullets.
- **Rule.** Name each tool by the job it fits, not by what it does:
  - the clarity workflow keeps an entry's meaning while it makes the entry read on its own; with a review's findings in a chunk's folder (`findings.md`, its README), it corrects what the review found, and changes nothing else;
  - the mining workflow traces an entry to its sources: the curator's words, or an agent's summary or default;
  - the orientation workflow writes `fortress-repo`'s revival part.
- **Failure.** The skill gave the clarity workflow one job, "Run it when entries no longer read on their own." No tool was named for correcting what a review found, so the coordinator bent a tool to that job with a run brief (account, section 2, cause 3; held 10-28 12:24). The mining workflow's correction by rule 0 never reached the skill (account, section 4, `b6f5268e1`). The findings of a review are readings of the team's sources, which only the clarity workflow, with its findings input, now takes (`findings-nature.md`, sections 2 and 3; `tool-fit.md`, section 2).
- **Replaces.** In the clarity bullet, "Run it when entries no longer read on their own." In the mining bullet, its first sentence, if the new words say the same more exactly. The orientation bullet probably needs no change: check.
- Check each claim against the tool's README before you write it: `tools/record-clarity/README.md`, `positions-audit/README.md`, `tools/orientation/README.md`.

### 2. A run gives a tool data, never rules over the tool's own briefs

- **Home.** `record.md`, "The consolidation tools", its opening paragraph.
- **Rule.** Give a tool's run its arguments and its data files only. If the tool's own briefs do not fit the job, propose the change of those briefs to the curator.
- **Failure.** The run brief of 10-26 told four stages of the clarity tool "Where they differ, this brief wins", through a hook that the coordinator added (`bedc80b01`). It set aside the writer's "Keep the meaning." The texts grew to 1.9 times the entries and carried dates (account, section 2, cause 1). The hook was taken out at `18788035c`; the rule lives only in that commit's message (account, section 3, "Not reached").
- **Replaces.** Nothing.

### 3. A pilot chunk that the curator reads before the rest runs

- **Home.** `record.md`, "A consolidation" (account, section 6, proposal 3).
- **Rule.** A consolidation, or a correction of more than a few entries, runs as runs of the consolidation tools, chunked by subject. One chunk runs first, and the curator reads its texts, new beside old, before the other chunks run. The coordinator writes and edits no entry text in such a run. Keep the line on running it on FACTS before each batch.
- **Failure.** On 10-26 no pilot ran: the curator saw all 13 texts at once, after the trap test, which scored them 12 of 12. No tool checks length, register or dates; only his read of a first chunk caught them on 10-22 ("I felt the tone was good") (account, section 2, cause 4, and section 3, lesson 3; `tool-fit.md`, section 4, check 6). The coordinator then proposed to write the corrections by its own hand, from "The pass owns each entry's final wording" (account, section 2, cause 5). Held 10-28 07:37: a batch of entry changes of this size runs through the clarity workflow, chunked, with a specialist Opus writer, never by the coordinator's hand.
- **Replaces.** The six bullets of "A consolidation", the recipe of 10-13 (chunks of 20 to 32, a Sonnet scout, an Opus writer, a quiz), which the runs of 10-22 did not follow (account, section 3, "Not reached"). Keep the quiz's purpose in one line: after the runs, test the changed entries with the record-test kit (`process-engineering/record-test/`); the decisions must stay as good. If "The pass" then needs a bound, so that a reader knows it governs one worker's findings and not a correction of many entries, add the fewest words that give it (account, section 2, "The failures that no rule covered", last bullet).

### 4. The writer of a correction changes as little as a finding needs

- **Home.** `record.md`, inside rule 1's clarity bullet or rule 3's text, as a clause.
- **Rule.** In a correction, each entry changes only where a finding names it, and grows only by what the correction needs.
- **Failure.** Rule 0 of the audit's writer, "Change as little as you can.", stood only in that tool's brief (account, section 3, "Not reached"). The 10-26 texts grew from 11.2K to 21.2K characters, and P-26 from 1.2K to 3.2K (account, section 2, cause 1).
- **Replaces.** Nothing. The clarity tool's own briefs now hold this rule (`postmortem-2026-10-28/brief-additions.md`, applied). The skill names it only so far as the coordinator needs it to choose the tool and judge the output. If one clause does that, write one clause.

### 5. After each boot and before each ask, state where we are

- **Home.** `.claude/skills/coordinator/SKILL.md`, "The boot" (after the steps, for the full and the light boot) and "An ask" (its context, item 2, or a line before the numbered order).
- **Rule.** After each boot, and before each ask, state in a few lines: where we are, what the step must produce, and what it protects against. Do not repeat the fixed part that the skill and POSITIONS' "History he knows" already hold.
- **Failure.** The coordinator worked without regrounding in the goals (held 10-28 12:18). A fresh boot wrote the run brief of 10-26 eight minutes after a compaction, from the boot note's plan, without checking it against `record.md` (account, section 2, cause 2). On 10-28 at 05:40 it put an ask that the curator could not read (cause 5). The curator asked for this statement himself after 16 of 84 manual compactions, and no skill states it (`regrounding-habit.md`, "Counts" and "What the record and the skills say"; held 10-28 12:24, "his calibration check after compactions ... is to come back as a rule").
- **Replaces.** Nothing.

### 6. The register for the curator

- **Home.** `SKILL.md`, "Talking to the curator", the first bullets.
- **Rule.** Halfway to ASD-STE100, no Claudisms (the register that the model falls into by habit: hedges, flourishes, invented phrases), no internal shorthand, and no reference to a position in your own reasoning that the curator has not seen. Take as known to him the terms that the skills define, and nothing else.
- **Failure.** The ask of 10-28 05:40:11, "a. Write 1 to 10, and do 11", in the numbers of the coordinator's own sort, was refused as undecipherable (account, section 2, cause 5). The rejection of 10-26 19:08: "It is in the Claude speak." (account, section 8). Held 10-28 06:41.
- **Replaces.** Most of this already stands ("halfway to ASD-STE100", "Use no internal shorthand", "Define a term that is new to the curator"). Add only what is missing, in the existing bullets.

### 7. Guard the context: delegate the reading

- **Home.** `SKILL.md`, "The standing goal", its bullet "Give exploration, tracing, transcripts, ledger rows and source to workers. Read a worker's final report yourself."; `SKILL.md`, "The boot"; `references/delegating.md`, "Which tier runs what" and "What a brief holds".
- **Rule.**
  - Delegate heavily. Sonnet does archaeology of exact words only. Opus workers process evidence into reports, and comb large reports into summaries or exact quotes sized for the coordinator. Let a worker brief the coordinator. Act on the summaries. Read no transcript and no overlong report yourself.
  - Keep briefs light: no micromanagement.
  - After a boot, load at once the parts of the coordinator skill that the work in hand needs, and `delegating.md` before any reading that a worker could do.
  - The curator asked for Opus workers at extra high reasoning effort for this combing. Write it only if a launch tool in the skill sets a reasoning effort; otherwise list it in your report as not placed.
- **Failure.** On 10-26 the brief was written at 466K tokens of context, 235K of it boot reading (account, section 2, cause 2). The coordinator read the Fable judgement of 55K itself (held 10-27 07:13). The curator saw its delegation decline since the early Fable sessions (held 10-28 10:39). Held 10-28 06:41 and 07:37.
- **Replaces.** Extend the existing bullets where they say part of this ("Read a worker's final report yourself." conflicts with "no overlong report": settle it in one sentence). `delegating.md` already says "Use Sonnet for archaeology and retrieval only": change it only if "of exact words" adds what it misses.

### 8. Fable writes no text that enters the record as written

- **Home.** `delegating.md`, "Which tier runs what", the bullet "Run every writer on Opus ...".
- **Rule.** Fable writes no text that goes as written into the permanent record. It may give its reasoning as corrections to a text that Opus writes. It may edit a batch record in place, as its review does. The reason: its compressed register degrades the reasoning of those who read it.
- **Failure.** The 10-26 run's first source and target was the 55K Fable judgement; the account infers that it carried Fable's register into the texts (account, section 2, cause 1, last bullet). Held 10-27 07:12 and 07:47.
- **Replaces.** Probably only a clause in the existing bullet, which already runs every writer on Opus. Name the tier only, no version (your brief, rule 5); state the rule as it holds now, with no end date.

### 9. POSITIONS and the skills: a minimal delta, the culture of the project

- **Home.** `record.md`, "What an entry is", the POSITIONS bullet; `references/skill-rewrite.md`.
- **Rule.**
  - A POSITIONS entry is not the curator's voice. It holds his meaning, factually correct, in the smallest form from which a fresh worker or coordinator, with the skills loaded, decides right. The record is how decisions are taken where the curator is not asked, so a wrong premise in it spreads.
  - The skills, too, are a minimal delta from the model's trained behaviour, light, with no series of rules and cases.
- **Failure.** The 10-26 texts held history, dates and the judge's register, and grew past the length the record allows (account, section 2, cause 1). Held 10-28 07:26.
- **Replaces.** `skill-rewrite.md` already says, for the coordinator skill, "Guide lightly, by a few general principles" and "Keep only what the model would not do by itself". Widen it to every skill only if it does not already hold for every skill.

### 10. A correction of POSITIONS rests on the team's sources

- **Home.** `record.md`, "What an entry is", the POSITIONS bullet ("and why"); or `SKILL.md`, "The curator's role and decisions", beside the three principles.
- **Rule.** An entry's reason, and each correction of it, rests on the evidence of the design, found in the repository: the specification, the team's later word, the library and the code. The curator's words are evidence of what he decided, not the ground of the design. The aim is to resolve the contradictions that the team left, not to match his words.
- **Failure.** The review's findings were readings of the team's sources: a reason from the wrong layer or date, a missing ground from the language. The mining workflow keys every change to his words, so it could not make these corrections (`findings-nature.md`, sections 1 and 2). Held 10-28 12:13.
- **Replaces.** Check it against "Quote the curator only where the exact words are the decision", in the same part, so that the two do not conflict.

## Not in this task

- The changes to the clarity workflow's own briefs. They are applied (`postmortem-2026-10-28/brief-additions.md`).
- The held lines with no "for the skill writer" mark.
- `fortress-repo`. If a rule above seems to belong there, do not move it: list it in your report.

## When you are done

- Add one line per change to `.claude/skills/coordinator/references/sources.md`. The source of rules 1 to 4 is the post-mortem's account of 2026-10-28 and the curator's go in chat, 2026-10-28, between 21:10 and 21:19 UTC. The source of rules 5 to 10 is the held line's date and time, as the curator's word in chat.
- Run the skills lint on the files that you changed, and commit on the branch.
- Report as your brief says: each changed passage's old and new text, each file's size before and after, each rule that you did not place and why, and the decisions not taken.
