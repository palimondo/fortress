<!-- The full run's writer brief, one Opus writer per chunk of entries; the launch names the chunk. -->

# The writer's brief

You are a writer in the Fortress revival repository (`/home/user/fortress`). Change no tracked file. Write only the files named below, and scratch under `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/positions-audit/full/fix-CHUNK/`. Commit nothing.

`explorations/coordinator/POSITIONS.md` records the decisions of the curator, the person in charge of the project. For each entry of your chunk, a scout traced what it rests on (`positions-audit/full/evidence/P-N.md`) and a reader judged its parts (`positions-audit/full/evidence/judgement-CHUNK.md`). Propose the corrected record for these entries, by the rules below, and show exactly what the record's tool would write. Nothing is applied: the curator reads your proposal first. The trial's writer did the same for ten entries: `positions-audit/trial/evidence/corrections.md` shows the form.

Read first: `.claude/skills/coordinator/references/record.md`, "What an entry is"; `explorations/coordinator/tools/record.py`'s header.

**His standing word on the record's wording** (2026-10-13T09:05:37Z, 2026-10-14T11:49:45Z): an entry is a fair, concise rewording of his intent, not his dictated words; quote him only where the exact words are the decision. A history line gives his message's time and a fair rewording.

**The rules**

0. Change as little as you can. An entry, or a sentence, that is his and correct stays word for word, even where you would word it otherwise. Change only what is factually wrong, not his, or stale (his page comment of 2026-10-21, 23:21 UTC).
1. His decision, or his yes to a question stated fairly: it stays, as a fair, concise rewording of his intent, checked against his words.
2. An agent's default that waits for his review: it leaves POSITIONS for the review queue (`explorations/coordinator/review-queue.md`); where no item holds it, draft one in the queue's form, numbered `Q-?1`, `Q-?2` (the coordinator numbers them).
3. A one-time approval, carried out, that carries no standing rule: struck, with the reason in its history.
4. A summary that changed the meaning: reworded from his intent; where no wording follows from his words, propose no text and put it to him as a question.
5. No source of his: a question for him, confirm or strike, unless his words already settle it.
6. A remark, or the state of the project on one day: struck. His test of actionable: an entry that says what someone does, what is not pursued, or what must keep working is actionable, a closed line of work included; only an observation or the state of one day is not (his page comments of 2026-10-21, 20:10 and 23:05 UTC, in `positions-audit/evidence/curator-comments-2026-10-21.md`).
7. The coordinating session's example or gloss inside his decision: it stays only if it neither narrows nor adds; where he approved the whole text, his approval wins, and it becomes a question.
8. A premise false today: corrected from its source, or dropped.
9. A status sentence: a list of what is built goes to the history; what is still to build stays as one short line with its PLAN item; a pending answer or a default goes to the review queue.
10. A history line: his message's time and a fair rewording; only a short answer that is itself the decision is quoted.
11. A number from one measurement leaves POSITIONS for FACTS or its report; the entry keeps the decision and its reason in words, with a pointer.
12. His later word on the entry's subject updates the entry, even where it went into a skill.

Where a rule does not fit, or two rules conflict, say so; do not force it.

**The mechanics.** Copy `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `FACTS-history.md` from `explorations/coordinator/` into your scratch folder; run `record.py` there with `--root`, never on the real files: `apply`, then `check`. Keep their output. The tool cannot add a history line to an entry whose text does not change: list such lines separately. For each entry, `tools/pointers.py N` lists the lines elsewhere that a strike or rewrite would affect: list what each would need; edit none.

**Your output**, in `explorations/coordinator/positions-audit/full/evidence/`:
1. `corrections-CHUNK.md`: at the top, one line per entry with its verdict (kept, rewritten, struck, or a question for him). Then per entry: the text before; the text after, or "struck"; each new sentence with its source; what leaves and where it goes; the history lines; the questions for him; the pointers elsewhere. Then what `record.py check` reported. Write it as soon as the first entry is done, and revise it as you go.
2. `corrections-CHUNK.apply`: the apply file you ran on the copy.
3. `rewritten-CHUNK.txt`: each kept or rewritten entry's line as it would stand, one per line, nothing else.
4. `review-queue-items-CHUNK.md`: the items drafted, if any.

Your final message: the paths, and one verdict line per entry.
