<!-- The closing report of the post-mortem of climb batch 29's numeral design: written by a Fable 5.2 worker for the coordinator on 2026-11-10 (the coordinator saved the worker's text and changed two sentences, on the skill, after the curator's decision of 07:1x UTC that no skill is updated), from this folder's files, the hook `curator-words-reminder.sh` with its `settings.json` entries, the boot note, and the post-batch reviews of climb batches 29 and 29b. The transcript was not read. -->

# The numerals post-mortem, 2026-11-08 to 10

Times are UTC. **The static numerals** are the curator's design: numeral types that exist only at compile time, with a numeral's four numbers as static parameters. **The field numerals** are the coordinator's alternative: a run-time value with the four numbers as fields.

Sources, cited as "key:line":
- S `design-snapshot.md`; ST `recovery/story.md`; RA `recovery-attempts.md`; EI `earlier-incident-scout.md`; FD `intent-fidelity-design-fresh.md`; IR `intent-replay.md`.
- B `explorations/coordinator/BOOT.md`; O `postmortem-2026-10-20-record/REPORT.md`.
- R29, R29b: `explorations/reviews/batch-29-review.md`, `batch-29b-review.md`.
- H `.claude/hooks/curator-words-reminder.sh`.

## 1. What happened

- 11-08, 20:18 to 22:19. The curator asked for the Working Draft's numeral types: compile-time only, the coercion reading the four numbers from its generic parameters (S:76-86).
- 21:56 to 22:00. The coordinator had the Draft's way costed by reading only, in four minutes (S:102).
- 22:20. The coordinator answered "You're right, and that settles it". It gave four points, then a paragraph labelled "spelling" that put the four numbers into fields and set the static form aside (S:103).
- 22:21. The curator: "That's what I had in my head" (S:87).
- 22:41. The coordinator wrote the held line: "as fields of the numeral's value, not as static parameters" (S:105).
- 23:04 to 23:52. The line went into the judge's brief, the compaction summary and P-174, the decision entry (S:106-108).
- 11-09, 01:23 to 08:49. Climb batch 29 ran and landed the field numerals (ST:46-48).
- 09:21 to 13:22. The curator inquired. A fidelity review answered "carried out in substance". He objected: "I never gave up working draft static parameter form" (ST:51-55).
- 13:54 to 16:02. His design was recovered and confirmed (RA:26-32).
- 17:2x to 11-10, 00:38. The record was corrected, a probe built the static numerals, and climb batch 29b landed them (B:27, B:17, B:10).
- 07:0x. The curator approved the measure, and it was built (B:14).

## 2. The root cause

The coordinator wrote its own proposal into the held list as the curator's decision, and did not compare the line with his messages (B:45). It read a short assent as a yes to every clause of its own long message (RA:85).

Each later check compared a text with the text before it. None read his messages:
- The judge (23:04) checked the design for coherence. Its brief gave the fields form as decided (S:106; B:45).
- The curator's yes (23:23) covered six repairs and the defaults. The form was "already written as settled" (S:98).
- The record writer (23:52) wrote P-174 from the held list, which its brief named as the source (B:45).
- The review of the batch record (00:5x) counted the static form as "against P-174" (S:109).
- The fidelity review (11-09) set the build against P-174 and the held list (S:120).
- The mining workflow, which traces an entry to his words, never ran on P-173 to P-175 (B:45).

## 3. The earlier incident

In the record post-mortem of 2026-10-20 to 22, entry P-86 was a condensed text that had drifted. The curator did not recognize it as his (EI:8).

The same: a condensed text entered the record as his decision, later writers built on it, and he found it, not a check (EI:42; O:141).

Different: in October the source was an outside review. In November it was his own spoken decision, and the line said the opposite (EI:42).

Why October's measures did not hold:
- Both were in force on 11-08: the rule "Check the condensed text against the words before you write it", and the mining workflow. Neither was applied (EI:35-37).
- The rule had no tool: "no tool checks it" (O:141). The mining workflow runs on demand (EI:23).
- So each guard needed the coordinator to doubt a line that it believed (FD:94).

## 4. The recovery on 11-09

1. **The fidelity review missed.** It read his assent as covering the whole message, and it measured the build against P-174 (RA:11-13).
2. **The recheck found the form and recovered nothing.** It found that no sentence of his gives up the static form. It ruled on a dispute and restated no design. He stopped it (RA:19-20).
3. **The third attempt found it.** He named the answer at 13:54. A scout laid out every message of his beside the passage that it answers. The coordinator read all of it, wrote the design as eight points of his quotes, and said it back in words. At 16:02: "Yes, I see no wrong sentence" (RA:26-32).

What the analysis shows:
- He stated the answer. Only this separates the miss from the finds (RA:83).
- Every point of the design has a quote of 11-08 under it (RA:51).
- He gave seven reminders on 11-09. The last four pointed at things that the coordinator already had (RA:55-63).

## 5. What it cost

Tokens written, as the reviews count them:
- Climb batch 29's run: 7.54M, six rungs (R29:33).
- Climb batch 29's landing: 6.61M (R29b:208).
- The post-mortem on 11-09: 4.53M over 15 agents, the probe's 952K among them; 5.70M with the coordinating session's own writes (R29b:221-229).
- Climb batch 29b: preparation 885K (R29b:225); run 3.25M, two rungs (R29b:157).
- Not counted: climb batch 29b's record-landing, the replay, this report.

Rebuilt: climb batch 29b deleted the field numerals (B:9), and the record's entries were rewritten (B:27).

His time: no source measures it. From 09:21 on 11-09 to his go at 19:0x, the post-mortem was the only work (ST:51; B:5). On 11-10 it took 05:4x to 07:0x (B:14).

## 6. The measure

What the curator rejected, and what he asked for:
- Rejected: a question handed back to him. His answer is "go back and read the record" (IR:162).
- Rejected: an independent verifier. He found it heavy and costly (B:14).
- Asked for: "a small prompt" at the write, "whenever it is modifying the held list or boot". Verbatim quotes are not the answer: "recovery of meaning is the point" (B:14).

The hook as built:
- After a Bash, Edit or Write call of the main session, it fires when the call names `HELD.md`, `BOOT.md`, `POSITIONS.md` or `record.py` and one of the three files has changed (`.claude/settings.json`, `PostToolUse`; H:30-36).
- The decisions file, `record.py` and "at most once a turn" are the coordinator's additions, which stood in the text that he approved (B:14). The `Stop` entry removes the once-a-turn flag (H:37-38).
- Its text (H:40): "You wrote to the held list, the boot note or the decisions. If the write records something the curator said or decided: before it stands, go back and read his own messages on the subject, in order, and make the line say what he decided. What he stated himself, argued for or repeated is his position, and a principle that he stated more than once binds everything under it. A short assent of his after a long message of yours accepts the gist he had been arguing for, never each clause of your message. A thing that you proposed and he did not take up in his own words is yours, not his: mark it so. If a clause of your line contradicts something he stated, the clause is wrong: correct it by his words. Do not ask him again what he has already said."

What the replay showed:
- Round 1. Two fresh readers without rules found that the fields form was the coordinator's. Both made it a question for him (IR:47, IR:152).
- Round 2. With five reading rules, two fresh readers corrected the line to the static numerals from his words of 11-08, and asked nothing (IR:162, IR:215, IR:249).
- Round 3. That night's session was resumed from a copy of its transcript, cut after the held-list write, once for each reminder, with no tools (IR:261). With the small reminder alone it saw that the line was not his, then moved the point to "Not decided, to ask" (IR:275-282). With the rules it corrected the line and asked nothing (IR:288-294).

## 7. The limits

- One incident, replayed. No second case was run.
- The reading rules were written knowing the answer, after his objection of 06:3x on 11-10 (IR:162).
- The session's own correction was less complete than the fresh readers'. It left out the unbounded `nat` and "compile-time only" as a point of its own, and it kept as its own default a rule that he had stated (IR:263).
- The built text is not the tested text: its first sentence is new and makes the re-reading conditional (H:22-23).

Not tested:
- The hook in a live session. It has fired once, on the boot note (B:14).
- A decision that reaches a brief or a compaction summary with no write to the three files.

Tests owed:
1. The October incident, replayed (FD:68).
2. Seeded errors in confirmed decisions, for the catch rate and the false alarms (FD:69).
3. A blind reader on the dialogue up to the go, with nothing of 11-09 (RA:94).
4. The built text on that night's session. The copy is deleted, so this needs his word again (IR:261).

The coordinator's proposal, not decided by the curator: one fresh reader with the rules before a batch is planned from a design decision (B:14).

## 8. Process findings that wait for the skill writer

On 11-09 at 14:18 the curator wanted no process rules from the coordinator. These are held until he asks (B:43):
- The failure, as section 2 states it (B:45).
- What caught it: a scout that read his messages alone, each with the passage it answers, and the design said back to him in words before any brief (B:46).
- "Do not push; the coordinator pushes" in workers' briefs is in no skill. `fortress-repo` has a worker on `main` push its own commits (B:47).
- No skill names the hook: the curator decided on 11-10 at 07:1x that the hook's prompt is enough and that no skill is updated for it (B, "No skill update for the measure").

## For the curator

On 8 November you designed the numerals: compile-time types with the four numbers as static parameters. The coordinator wrote its own alternative, fields of a run-time value, into the held list as your decision. It took your short assent as a yes to a paragraph that you had not asked for. No later check read your messages. Batch 29 built the wrong design. You found it, and batch 29b landed your design on 10 November.

The same failure happened in October. The rule against it existed, and nothing made the coordinator apply it. Now a hook tells the coordinator, at each write to the held list, the boot note or the decisions, to re-read your messages and correct the line without asking you again. In the replay, that night's own session then corrected its line.

Still open: the hook is tested on one incident only, and four tests are owed. A fresh reader before each design batch is the coordinator's proposal, not your decision. No skill is changed: you decided that the hook's prompt is enough.
