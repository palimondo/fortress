<!-- The final report of the post-mortem of 2026-09-27 on the Opus coordinator's record keeping (the one-page `postmortem-2026-09-27-record-keeping.md` beside this file), written on 2026-10-29 by an Opus worker from that page, the commits of 2026-09-27, the record files that cite it and the session transcript: what it found, the commits that carried his direction (the owed FACTS catch-up among them, `f0958b4db`), where each lesson lives now in the `coordinator` and `fortress-repo` skills, how the trial was judged, and the one small item still open. -->

# The post-mortem of 2026-09-27, record keeping: final report

## Terms and sources

- **The curator** is Pavol, who directs the revival. **The coordinator** is the long-running Claude Code session that talks to him, briefs workers and keeps the record. **Fable** and **Opus** are model tiers. The coordinator ran on Fable until the compaction of 2026-09-25 and on Opus from then, on trial.
- **The record** is the project's memory in `explorations/`. Here it means mainly `FACTS.md` (what is true of the project), `POSITIONS.md` (the curator's decisions), their history files `FACTS-history.md` and `POSITIONS-history.md`, and the boot note, the coordinator's note of what runs now. **The protocol**, `explorations/protocol.md`, was then the coordinator's rulebook.
- **A compaction** replaces the coordinator's context with a summary; **the boot** is the reading it does after one. **A climb batch** is a Workflow run that makes several code changes and lands them together.
- **The page** is `postmortem-2026-09-27-record-keeping.md`, this post-mortem's one file.
- **The transcript** is the coordinator's session transcript, `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`; its part up to 2026-10-08 is on the branch `transcripts-blinded`. A time below with no file is a time in it, in UTC.
- A sentence marked **"the writer's judgement"** is this report's own. Everything else is cited.

## 1. What the post-mortem was

- It is one page, written at 03:09 on 2026-09-27 (`22e5784f2`) and revised at 03:18 (`0c2c3d2df`). The Fable review of the new protocol was kept beside it at 04:42 (`06953428d`, `protocol-guides-review.md`).
- His words that started it, at 01:30:24: "Jesus. That's pedantic and rules-lawyerly. You will soon flood the permanent record that's read no boot up with ton of little minutiae that will confuse you and degrade the performance. Launch an archeology for when and how we did a previous consolidation sweep with Fable."
- At 01:47:28 he gave the reason for the trial and his worry: "You are doing a good job of talking to me in a plain language and I don't have to constantly correct you from slipping into the smart Alec essayist register. But you seem to be much more literal in instruction following, with less common sense judgment compared to Fable."

Sources:
1. `git log -- explorations/coordinator/postmortem-2026-09-27-record-keeping.md`.
2. Transcript, 2026-09-27 01:30:24 and 01:47:28.

## 2. What it found

- On the night of 2026-09-26 to 27 the Opus coordinator wrote each side remark of his into the record as a dated decision, often in three files. It appended "Corrected …" and "Superseded …" clauses beside wrong lines, 43 in a day, against about one every two days under Fable. It appended to the boot note 79 times without a rewrite, from 12.8 KB to 54.5 KB. It invented a check-in that had to be armed again by hand, though the record held a technique that worked. It reported each edit of the record to him.
- The cause, in the page's words: the boot read "held two instructions that conflict", the rule of 2026-09-15 that "entries are never deleted", and his reason for the clean-up of 2026-09-24, that the boot files hold "a clean current state". Fable served the purpose of both; Opus followed the letter of the first.
- The evidence and the two periods compared are in `record-keeping-proposal.md`, sections 1 and 3, written the same night by a fresh Fable worker.

Sources:
1. The page, "What happened" and "Why".
2. `record-keeping-proposal.md`, its header and sections 1 and 3.

## 3. What was done, and where it landed

- **He did not judge the proposal himself.** At 03:02:37: "I will read the record-keeping-proposal.md, but I doing feel qualified to judge it and rule over it. Is all about how you'd interpret it and whether it would shape your behavior the right way. I dunno how to test that. … So it's a trust plunge I guess? Because I want you to remain in the role." At 03:04:20: "TL; DR. Nope, I am not wearing my time with reading that."
- **His direction, as the page records it,** came in his messages of that night: the boot read stays whole ("I'm am fine with paying 125k in each session for that peace of mind", 02:21:51); a one-off go "does not need to be entered into the permanent record at all" (02:26:42); "Boot note's only propose is to instruct the post compaction Claude about what's currently in flight" (02:36:49); "My experience with Fable was that it did better less stringent rules" (02:47:20); workers go on extending FACTS, and the coordinator consolidates the disproven facts (02:56:48).
- **The commits, all on 2026-09-27:**
  - `9e7d12c75` (03:18): the protocol rewritten as principles and the README by role, the dropped rules moved to their manuals.
  - `892687076` (03:24): POSITIONS' entries that were only a go removed, its corrections fixed in place.
  - `3eacc0315` (03:30): the boot note holds only what is in flight.
  - `886a06e1d` (04:16): POSITIONS split into the decisions in force and their history.
  - `cda7d86a6` (05:17): what the first clean-up had removed from POSITIONS, restored word for word to its history.
  - `aaa3d77cd` (08:23): the held list kept as an index into the transcript, as before.
  - `f0958b4db` (08:31): "FACTS consolidated: appended corrections folded, stale lines fixed, the replaced text in the history". This is the catch-up that the page and its commit `0c2c3d2df` said was still waiting. It ran at 08:31, before climb batch 6b, where the page had planned it after batches 6 and 6b had landed; the boot note's commit of 08:33, `ccb680ad6`, reads "R landed, FACTS consolidated, 6b next", where R is a rung of climb batch 6.
  - `efaf0fb85` (04:42): the Fable review's four changes to the protocol, one protocol for both tiers ("look before reinventing, plain wording, no re-asking, a register pass").
- **A measure of the catch-up, the writer's own:** for a commit C, `git show C:explorations/coordinator/FACTS.md | grep -o -E 'Corrected|Superseded|corrected [0-9]|superseded by' | wc -l` prints 18 at `22e5784f2` and 1 at `f0958b4db`.

Sources:
1. Transcript, 2026-09-27 02:21:51, 02:26:42, 02:36:49, 02:47:20, 02:56:48, 03:02:37, 03:04:20.
2. The commits named above, by `git log --since=2026-09-27T03:00 --until=2026-09-28`.

## 4. What it taught, and where each lesson lives now

The protocol was retired on 2026-10-13 (`fe4dcc1e4`). Its header now says that its rules live in the `coordinator` and `fortress-repo` skills. The page's lessons are there:

- **Follow the purpose, not the wording.** Home: `.claude/skills/coordinator/SKILL.md:112`: "Weigh a rule by what it protects against what it costs. If its words would defeat its purpose, do the better thing, say so in one line, and propose a fix."
- **Notice what goes wrong and propose the fix before he has to.** Home: `SKILL.md:111`, and the end of `:112` ("Propose one too when a file grows or a rule makes clutter").
- **A side remark changes the behaviour, not the record; a one-off go is written nowhere.** Home: `SKILL.md:110`.
- **A wrong line is fixed in place, and the history keeps the old text.** Home: `SKILL.md:203` ("They state the present, and the history files keep how an entry came about"); `.claude/skills/fortress-repo/references/records.md:38` ("no 'corrected' or 'superseded' notes"); the tool `explorations/coordinator/tools/record.py`, which writes each old text to the history file.
- **Workers add to FACTS, and the coordinator consolidates it before each batch launches.** Home: `coordinator/references/record.md`, "A consolidation"; `fortress-repo/references/records.md`, "Writing to the record".
- **The boot note says only what is in flight, rewritten whole.** Home: `SKILL.md:228`; the header of `explorations/coordinator/BOOT.md`.
- **The boot read stays whole.** Home: `SKILL.md:217`, step 1 of the boot. Two later changes bend it at his word: a light boot that skips FACTS, POSITIONS and INDEX (`SKILL.md:224`), and INDEX skipped on trial (`BOOT.md:84`).
- **No report of each edit of the record.** Home: `SKILL.md:166`: "Do not tell the curator about edits to the record."

## 5. How the trial was judged

- The page set the test: "Pavol chose experience over a scripted test: whether he still has to correct the coordinator on record keeping, on literal readings, or on reports nobody asked for."
- The nearest verdict on record is his message of 05:14:18 on 2026-10-11, in a brief for a scout: "We later switch to Opus 5.5 are successful trial. Main motivation for the switch was escaping the Clever Alec essayist agentic speech register, secondary only was token economy."
- The writer's judgement: that verdict is on the trial as a whole, not on record keeping. Record keeping failed again in other forms. On 2026-10-13 at 09:05:37 he said: "we are hitting some gap in our record keeping process regarding the positions. Because what I am telling you didn't enter the permanent record." The post-mortem of the record of 2026-10-20 to 22 took the next failure, and its `postmortem-2026-10-20-record/REPORT.md` closes it.
- The session runs on Fable again since about 05:5x UTC on 2026-10-28, by his choice (`BOOT.md:83`).

Sources:
1. The page, "How to judge it".
2. Transcript, 2026-10-11 05:14:18 and 2026-10-13 09:05:37.
3. `postmortem-2026-10-20-record/REPORT.md`; `BOOT.md`, "The record, the machine, the pages".

## 6. What is still open, and where each item lives

- **Nothing that the page owed is still open.** Its one owed step, the catch-up of FACTS, landed in `f0958b4db`, and the page's other changes landed the same day (section 3). The page itself was never brought up to date; this report records the outcome.
- **The page's "Where to restart from" is history.** It points to the protocol at `bf291a22d` and the README at `2f105225a`. The writer's judgement: since 2026-10-13 the restart point would be the `coordinator` skill, whose history is in git.
- **One proposed line for the page's header was not applied.** The draft of the record-keeping part, `process-engineering/record-rule-draft.md:361`, proposed that this page and three other dated notes get the line "Its rule for an entry's length is replaced by the record-keeping part of the `coordinator` skill." The draft's "What an entry is" became `coordinator/references/record.md`, "What an entry is" (`coordinator/references/sources.md:59`), but none of the four notes carries the line (writer's check by grep). Home: that draft, line 361. The writer's judgement: a small fix, which this report does not make, since its task was to write only this report and its INDEX line.
