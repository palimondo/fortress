<!-- A design for keeping the curator's intent into the record, devised by a fresh Fable 5.2 worker at medium effort on 2026-11-10 from the problem statement alone (no skill of the project loaded, no file read), at the curator's order of 05:4x UTC, as the experiment to set beside his own design, the verifier workflow on the held list; for the post-mortem of climb batch 29's numeral design. Its text is the worker's final message, unedited. -->

# Design: anchor every decision to the curator's own words

## Diagnosis

The record is a chain of paraphrases, and every check compared one link with the previous link. The fix is to give each decision an anchor outside the coordinator's wording and to make every later check read that anchor. Two anchors exist: the curator's messages in the transcript, and the curator himself. I would use both, because they fail differently.

## The design

**1. A decision line carries its source (coordinator and script, at write time).**
- Each line in the running list and each decisions-file entry has three parts:
  - the coordinator's one-line statement;
  - the transcript timestamps of the curator messages it rests on;
  - one to three verbatim quotes from those messages.
- A script copies the quotes out of the JSONL by timestamp, so the coordinator never types them. The script refuses a quote that is not from a curator message.
- Each entry also has a "Rejected" line: the alternative that was on the table and who proposed it. In the incident this would have read "Rejected: fields of a run-time value (coordinator's suggestion)".
- Anything the curator did not say but the coordinator filled in is marked "coordinator's fill-in, unconfirmed".
- Cost: about 300 tokens per line, and no curator attention.

**2. A contrastive read-back at the moment of decision (coordinator and curator).**
- Before recording a decision, the coordinator says it back in two or three spoken sentences: "You decided X. You did not take Y, which was my suggestion. Is that right?"
- The curator answers yes or corrects it. His answer is a transcript message and becomes the strongest quote.
- It is required whenever the coordinator offered an alternative during the discussion, because that is when the inversion risk is real. Uncontested points need only step 1.
- Cost: about 100 tokens and 15 to 20 seconds of his listening per contested decision. I expect a handful per session.

**3. A blind source check before an entry can be built from (fresh agent).**
- A script extracts the transcript span for the cited timestamps, plus the surrounding turns on that topic, labelled by speaker.
- A fresh agent reads the span without seeing the coordinator's line. It answers fixed questions:
  - What did the curator decide, in his own terms?
  - Which alternatives were raised, by whom, and what happened to each?
  - Where is he ambiguous or self-contradicting?
- A second, small step compares that answer with the coordinator's entry. The same agent can do it after committing its answer. It reports "agrees", "differs" or "source ambiguous".
- "Differs" and "ambiguous" go to the curator as one short question. They are never settled by the coordinator alone.
- Cost: 20k to 60k tokens per decision for a long evening's span. A build that follows a decision costs millions, so this is about 1%. It costs the curator nothing unless it flags.

**4. A status gate (script and hook).**
- Entries are "unverified" until the read-back (when required) and the blind check have passed. Then a script stamps them "verified" with the check's commit.
- An end-of-turn hook lists unverified lines older than the current session segment.
- The brief-launching script refuses a planner or builder brief that cites an unverified entry.
- Cost: no tokens.

**5. Workers and reviewers get the quotes.**
- Briefs include the entry's quotes and its Rejected line.
- A reviewer asked "is the decision coherent?" or "does the plan match?" is told to check against the quotes and to flag any gap between the quotes and the statement.
- Cost: a few hundred tokens per brief.

**6. Compaction is not a source.**
- Before compaction, a hook makes the coordinator flush every pending point to the running list, with timestamps.
- After compaction, decisions are read from the files only. A decision that exists only in the summary is treated as unverified and re-sourced from the transcript.

## What it catches and what it does not

Catches:
- **Inversion or drift while condensing** (the incident). The blind check reads his messages and reports static parameters. The Rejected line would have forced the coordinator to write its own alternative under "rejected". The read-back would have let him hear "fields" and object.
- **Drift through compaction and rewriting.** The quotes travel with the entry, and the gate blocks unsourced entries.
- **Talking past each other while the coordinator sincerely believes its line.** This is the case the blind check exists for, because the checker does not share the coordinator's belief. If his words support his position, it reports "differs". If his words are truly ambiguous, it reports "ambiguous" and the contrastive question goes to him.

Does not catch:
- The curator saying "yes" to a read-back without listening. The blind check is the backstop for this.
- The curator misspeaking consistently, or a dictation error that changes meaning in every cited message.
- Consequences he never addressed. These are only marked as fill-in, not verified.
- A coordinator that cites the wrong span. Having the script include neighbouring turns on the topic mitigates this in part.
- Later drift between entry, plan and build. The existing reviews still cover that.

## Testing before trusting it

- **Replay the incident.** Run step 3 on that evening's transcript with the wrong line. It must report "differs". Do the same with the earlier drift.
- **Seeded errors.** Take about ten past decisions the curator has confirmed. Have a separate agent write a subtly wrong variant of half of them (inverted contrast, dropped condition, widened scope). Run the check on all twenty. I would want at least 9 of 10 wrong ones caught and at most 1 false alarm. Tune the fixed questions until it gets there.
- **Blindness.** Run the same set with the checker shown the line first. If the catch rate does not fall, blindness can be dropped to save a step. I expect it to fall.
- **The gate.** Try to launch a brief from an unverified entry and confirm it is refused.
- **Cost.** Measure tokens per check and count the curator's read-backs over one real session.

## Alternatives, and my choice

- **Read-back only.** Cheapest, and the only check that reaches what he meant, not just what he said. But it spends his attention and depends on him listening when tired.
- **Blind source check only.** Spends none of his attention, but it cannot resolve real ambiguity.
- **Curator reviews every entry.** Rejected: it spends the scarcest resource on every line.

I would choose both the read-back and the blind check, with the read-back limited to contested decisions. Each covers the other's blind spot, and together they cost about 1% of a build.

## Natural behaviour versus written rules

Leans on what agents do well:
- restating a position from a source text;
- comparing two short statements;
- noticing ambiguity when asked directly.

Needs written rules or scripts, because agents will otherwise not do it:
- Quote, do not paraphrase. Agents condense into their own vocabulary by default.
- Name the rejected alternative and its author. An agent's own suggestion feels like the conclusion to it.
- Never hand a checker your line as "the decision". Checkers anchor on what they are given and find coherent text coherent.
- Do not trust the compaction summary for decisions.
- The gate must be a script, not a rule. A coordinator that believes its line will see no reason to check it.
