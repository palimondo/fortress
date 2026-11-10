<!-- The earlier incident of the same kind, for the post-mortem of climb batch 29's numeral design: a Fable 5.2 scout's cited findings, 2026-11-10, on the record post-mortem of 2026-10-20 to 22 (P-86, a condensed text that drifted, where the curator blamed the context's size), its corrective measures with their commits and their text today, the nearest other post-mortems, and which measures were in force and not applied on 2026-11-08. The scout's final message, unedited; paths under EC/ are explorations/coordinator/. -->

All paths below are under `/home/user/fortress/`; `EC/` stands for `explorations/coordinator/`. Nothing was changed.

**The match: the record post-mortem of 2026-10-20 to 22** (`EC/postmortem-2026-10-20-record/REPORT.md`, evidence map `evidence/MAP.md`). It is the only post-mortem in which a text written from his decision had drifted and he blamed the context's size.

1. What happened (REPORT.md:19-24)
- Review item 31 (the element bound of `Vector`/`Matrix`) rested on P-86. The coordinator explained it three times; he "did not recognize P-86 as his words". A scout found "P-86 paraphrased a review by Astra ... The curator's only word behind it, on 09-26, was yes to carrying the review's checks into one batch's briefs" (:23). He held all batches at 16:50. The audit of 75 more entries changed 50 (:34).
- The document's causes:
  - "**A one-time approval became a standing rule.**" (:31)
  - "**The paraphrase changed the meaning.** It kept Astra's reason that integers have no ring, false since 09-27, and dropped the live one" (:32)
  - Failure mode, "**A condensed text that drifts** (the coordinator and later writers) ... Trigger: a review condensed into one clause. ... Guard: a rule to quote the curator where the words decide and to check a condensed text against them; no tool checks it." (:141)
- The context cause is his, and the report files it under "Where the analyses disagree": "The curator blamed its long context, 537K tokens at 13:49, the "dumb zone"." (:40) Against it: "the coordinator blamed its framing. Its own check at 17:28 found that the blind worker, given that framing, raised the live point." (:39) So the report does not name context as the root cause.
- His words:
  - 10-20 13:49:14: "Your context window is at 537k. ... you being deep in your dumb zone. Please launch a fresh Opus worker and a fresh Fable worker ..." (MAP.md:22)
  - 10-20 13:52:16: he tested "whether your context length is the cause of the problem or whether it's how the position is framed" (MAP.md:100)
  - 10-22 16:03:34: "you are 579k of in your context window ... deep in the dumb zone" (MAP.md:83)
  - 10-22 16:28:00: "I am currently blaming you to be in the dumb zone with a full context" (MAP.md:100); REPORT.md:159: "He blamed its context, 579K tokens."
  - 10-22 22:02: his "off hand remarks turn into words of gospel when they enter POSITIONS" (REPORT.md:162; `EC/HELD.md:249`)

2. Corrective measures of that post-mortem
- The condense-and-check rule was already there: `7b434aae52`, 2026-10-13, "coordinator skill: written from scratch, a core and six parts". Today, `.claude/skills/coordinator/references/record.md:27`: "Quote the curator only where the exact words are the decision. Otherwise condense the words into the position, keeping the part of the rule that cuts. Check the condensed text against the words before you write it. The dictated words go to the history, with their time." The post-mortem added no tool for it ("no tool checks it").
- The mining workflow (provenance audit): tool README added in `d568449911` (2026-10-22), skill line in `b6f5268e1d` (2026-10-22). Today, `record.md:107`: "To find whether a POSITIONS entry comes from the curator's words or from an agent's summary or default: the mining workflow. ... Run it on the entries that it has not traced, before the clarity workflow rewrites them." It is run on demand, not at each landing (`EC/positions-audit/README.md:5-11`).
- The light boot, for the context's size: `5160e328f3` (2026-10-20), approved 10-22 22:54 (`references/sources.md:185`); today `SKILL.md:251`.
- One-time go: `SKILL.md:124`, "Write a one-time go nowhere: the launch or the commit is its trace." (the report dates this guard to 10-13, REPORT.md:140).
- Earlier, same family: `2d9663cc37` (2026-10-19), `SKILL.md:193`: "never cite a held line as the curator's yes"; `ea0a1f0a8f` (2026-10-20), `delegating.md:43`, the cleaning pass before his words are quoted.

**Nearest others**
- Post-mortem of 2026-10-28 (`EC/postmortem-2026-10-28/REPORT.md`), the rejected POSITIONS rewrite of 10-26. Cause 2: "A fresh boot wrote the brief eight minutes after a compaction, at 466K tokens of context, from the boot note's plan. Nobody checked it" (:38). Lesson 10, "**Guard the context.** ... the coordinator's context grew from 107K to 693K tokens" (:115). His words: "You are spending your reasoning effort, your context here, on micromanaging workers." (:113); "I am again worried by the lossy compression of information from the process that we are using now." (:116). Measure: `9311b09678` (2026-11-01), `SKILL.md:84`: "Keep your context for decisions. Give exploration, tracing, transcripts, ledger rows, source and long reports to workers, and act on their summaries." The calibration check after a compaction landed in the same commit (`SKILL.md:249`).
- Proposed and never landed: his rule of 2026-11-02 07:4x, `EC/HELD.md:215`: "The coordinator weighs its own context size: at about 540K it should propose when to compact ...". I found no text for it in `.claude/skills/coordinator/` or in `sources.md`.
- Post-mortem of 2026-09-19: he blamed context pollution, not size. The boot after a compaction "accidentally listed worker's cache directory which filled its context with a ton of garbage that I'm blaming for derailing the rest of the session" (`EC/postmortem-2026-09-19/REPORT.md:78`; also `boots.md:166`). Measure: the bounded boot, home `SKILL.md:226` as the report cites it (not re-checked today). Its finding on decisions is a different shape: 25 decisions taken without his yes.
- Haiku window (2026-10-19): wrong model, including two compaction summaries written by Haiku; not a context-size finding.

3. In force on 2026-11-08, and whether followed
- In force: `record.md:27`, `record.md:107` (mining), `SKILL.md:193`, `SKILL.md:84`, the light boot. The 540K rule was only a held line.
- `EC/BOOT.md:44`: "the coordinator's condensation of his position into the held list (22:41 on 11-08) was not checked against his messages, as `coordinator/references/record.md` asks ...; the record writer's brief then named the held list "his words and the coordinator's condensation" as the source; the Fable judge was asked for coherence, not fidelity; the mining workflow never ran on P-173 to P-175."
- So the two guards of the 10-20 post-mortem both existed and neither was applied that evening.
- Context size on the evening of 11-08: the only figure I found is "643.8K of 1M" before the 12:56 compaction (`EC/postmortem-2026-11-09-numerals/recovery/slices/compaction-summaries.md:25`). I found no figure for 22:41, and no place where the 11-09 files name context size as a cause.

4. Same incident under another name
- The P-86 incident appears as "item 31" (`explorations/reviews/item31-drafts.md`, Part 4), "the provenance audit" (`EC/positions-audit/`), "the record consolidation" (`EC/consolidation-2026-10-22/`) and "the dumb zone" (also in `EC/curator-profile/evidence.md`).
- The 11-09 chain (held line, judge's brief, compaction summary, P-174; `design-snapshot.md:103-108`) is the failure mode of REPORT.md:141 again, with one difference: on 10-20 the condensed source was an outside review, on 11-08 it was his own spoken decision.
