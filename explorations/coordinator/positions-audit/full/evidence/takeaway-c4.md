<!-- The POSITIONS audit's full run, chunk c4: what the cold reader (cold-read-c4.md) took away from the ten entries (rewritten-c4.txt: P-51, P-53, P-54, P-56, P-57, P-58, P-60 and P-62 rewritten; P-52 and P-59 kept word for word), checked against the curator's messages; match or drift for each, where a drift comes from, and a fix where the text is at fault. Nothing in the record changed. -->

# The cold read against his decisions: chunk c4

- **P-51**: match. The reader's "is this a departure from the team?" is project context: his reading was gaps the team did not implement (2026-10-09T06:55:25.847Z).
- **P-52**: match.
- **P-53**: match.
- **P-54**: match on today's state. Drift from a kept sentence, the last one: "the methods keep the type" does not say which methods, so the reader could not tell whether `ceiling` later returns `QQ` or stays `ZZ`. Fix proposed (2026-10-09T07:28:28.361Z, with way 3 of the 07:19:47.208Z question that he took).
- **P-56**: match.
- **P-57**: match. The reader guesses that `Unordered` gets the inherited answer, which is wrong, since walk refuses it. The rewrite moved that fact to drafted item Q-?1 on purpose, so the entry needs no fix.
- **P-58**: match, including the added timing sentence: rung by rung, his "option 1" (2026-10-10T05:27:34.812Z) to the 00:17:43.858Z question.
- **P-59**: match. The reader takes the last sentence, the coordinator's unmeasured premise about microGPT, as the decision's reason. The writer's question to him already covers it, so no fix.
- **P-60**: match on the reading and the proof's scope. Slight drift from the rewrite: with the checker's sentence gone, nothing says the intersection typing stops at the boundary. Fix proposed (his forward of 2026-09-29T17:29:19.700Z).
- **P-62**: match.

Reader: one Opus session, 2026-10-22. I compared `cold-read-c4.md` with `rewritten-c4.txt`, with `corrections-c4.md`'s sources for each entry, and with his messages. His chat messages come from `curator-profile/show.py`. The coordinator's texts that they answered come from the transcript `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl.parts/000.jsonl`, and for 2026-09-26 from `...until-2026-10-08T15-41.jsonl.parts/001.jsonl`. `positions-audit/tools/comments.py` finds no page comment of his on any entry of this chunk. All times are UTC.

I set aside the cold reader's questions about the project's terms (walk, rung, the switch-over, row numbers, "the team"). I judged meaning, not wording. His page comment of 2026-10-21 23:21 says to correct a factual mistake and to leave a correct wording alone. So I propose a fix only where the text can lead a worker to do what he did not decide.

## P-51

**Match.**
- **What to do.** The reader's version matches his yes. He wrote "Q48(b) wide, go ahead" (2026-10-09T22:10:09.585Z), and the coordinator's 11:56:38.064Z list had defined wide as "any inferred call", against narrow, "only a type parameter that appears just in the result".
- **The reason.** The reader's "one inference rule then covers every case, including cases the team did not build" is his own reading: "this is all about unifying the time inference rules about like everywhere and we are covering gap about cases that they didn't implement yet" (06:55:25.847Z, dictated; "time" is "type").

**Not drifts.**
- "Past the cases the team built: an extension or a departure?" He set a condition: the mechanism should be specified, and the way to build it known (06:55:25). The probe met it. The specification already says that static arguments are inferred from the call's context, and names this context only as "not yet described" (`reviews/argument-context-probe.md`, section 5). This is project context, and the probe's report, which the entry names, answers it.
- "Several candidates succeed?" and "Which candidates?". The probe gives the rule: the most specific wins, and a tie goes on as today (`argument-context-probe.md:34`). That is detail the pointer carries.

## P-52

**Match.**
- The reader's version matches his "Q50 (a) as recommended" (2026-10-09T07:13:27.273Z).
- The question that he took was about `narrowToRange` alone: "`r.narrowToRange(other)` ... must raise `IndexOutOfBounds` when `other` reaches outside", with the same example and `PCMP` (the coordinator's 07:09:23.365Z). So the entry's scope, the check behind `narrowToRange`, is his. The reader's "other containment tests too?" asks beyond what he decided.
- "Corner by corner" against "point-by-point" is a wording point. The reader resolves it rightly, axis by axis.

## P-53

**Match.**
- The reader's version matches his "agreed with the recommendation." (2026-10-09T07:18:49.726Z). That was his next message after the 07:14:01.035Z question, whose way 1 returned `Just` and said that walk's print changes.
- The empty string and the compiled path are outside what he decided, and the declared `Maybe` answers the empty case.

## P-54

**Match on what holds now.** `ceiling` and `truncate` keep `ZZ` and raise at the infinities and 0/0, `floor`, `round` and the brackets raise too, and the paragraph is revised. This is way 2 of the 07:19:47.208Z question. He took it at 2026-10-09T07:28:28.361Z: "QQ's ceiling and truncate per your recommendation that we first make it pass and then we'll later make it consistent with the ruling on, on float."

**Drift, from a kept sentence: "the methods keep the type".**
- **How it misled.** The reader asks whether `ceiling` is one of "the methods", and whether "keep the type" means `QQ` or keeping `ZZ`. `truncate` is a method too, yet it is listed as giving ℤ. So the reader cannot tell which state is the target. A worker building P-68's rung could keep `ceiling` at `ZZ`, or turn `truncate` into `QQ`.
- **What he meant.** His "later make it consistent with the ruling on float" took way 3 of 07:19:47 as the later step: "the `floor` and `ceiling` methods return `QQ` and pass infinities through, while the brackets and `truncate` return `ZZ` and raise". The float ruling, P-68, names the same split: `floor` and `ceiling` keep the type; ⌊x⌋, ⌈x⌉, `round` and `truncate` give ℤ.
- **Where it comes from.** The last sentence was kept word for word. The rewrite changed only "peer methods" into "peer languages". The mix of `ZZ` and ℤ in one entry adds to the doubt. They are one type, but a reader without context cannot know it.
- **Fix.** "A rung after the switch-over makes `QQ` follow the float ruling (row 330): `floor` and `ceiling` then keep `QQ`, and the brackets, `round` and `truncate` give `ZZ`." This rests on 2026-10-09T07:28:28.361Z and on way 3 of the 07:19:47.208Z text that it took.

**Not drifts.**
- "Is the paragraph revised already?" It is: Appendix I records the change, and names `DivisionByZero` as the exception (`Specification/appendices/changes.tex:3815-3820`). The reader lacks this status.
- "Which brackets?" is project context: ⌊x⌋ and ⌈x⌉, as P-68 names them.
- The writer's note that PLAN's line for P-68's rung (`PLAN.md:90`) does not name `QQ` stands. The fix gives that line the words to add.

## P-56

**Match.**
- The reader's version matches his decision: "when we ran the probe P3, I understood that basically it made all the things worse. So I guess only option A with the fail bot is works." (dictated: "the fail bodies works") (2026-10-09T14:54:50.968Z). He then answered the coordinator's "If you confirm (a), Q49 is closed." with "OK then." (15:01:26.240Z).
- "More values lost than gained" is his "made all the things worse" in the probe's terms: 25 lost and 16 gained, as the coordinator put it to him at 11:56:38.064Z.
- The reader rightly keeps the five `Stop` tests and does not take them for callers to repair.

**Not drifts.**
- The measure behind "values" and the letters of ways (a) and (b) are in the review that the entry names.
- The reader's link to P-62 (covariance would remove the obstacle) is not his decision. His earlier worry about index types (07:05:31.926Z) leaned to (c), and he set it aside after P3.

## P-57

**Match.**
- The reader's version matches the question's way 1, "Declare the team's parameter `TotalComparison`. The team's answers are reached" (14:56:40.919Z).
- He took it at 2026-10-09T15:10:56.122Z: "let's do it. I have no idea what I'm deciding on, but let's push forward to zero", and "Let's do the team zone answer. ... I like getting the checker counts to zero." (dictated: "the team's own answer")
- The Why, the last api error cleared, is a fair restatement of "push forward to zero".

**Not drifts.**
- **"Fact or change?"** The text says "the team's overload `isLeftZero(_:Comparison)` is declared over `TotalComparison`". The reader acts on it rightly, as a change.
- **The reader's guess on `Unordered`** ("presumably the inherited answer") is wrong: walk refuses the call (`compile-ladder/rung-tuple-orders/SKEPTIC.md:142`).
  - The rewrite removed the sentence that said so, on purpose, under rule 2. The question that he answered never named `Unordered`.
  - It waits in drafted item Q-?1 (`review-queue-items-c4.md`). While it stayed in P-57, PLAN and the queue read it as his decision.
  - Nothing calls `isLeftZero(Unordered)`, so the gap cannot lead a worker into a wrong build. Q-?1 has to be filed for the fact to stay on record.

## P-58

**Match.**
- The form: one `builtinPrimitive` string naming a static helper, the compiled rewrite, and the refusal of a string that names no helper.
- The timing, the added sentence: rung by rung. His "Item 35, agreed with recommendation, option 1." (2026-10-10T05:27:34.812Z) answered the 00:17:43.858Z question, whose option 1 was "Rung by rung, from the first natives rung. Each rung's bindings are checked as they land." The reader carries it rightly.

**Not drifts.**
- **"Already true, or the target?"** "Still to build: the natives rungs" answers it, and the reader reads the bindings as written by those rungs.
- **No reason given for rejecting way 2.** The 00:17:43 text gave it, "the compiler library's form, which the specification doesn't have", and he took the recommendation, not a reason of his own. Adding it is not needed for a worker to act.
- **"Beside its glue classes"** is project context.

## P-59

**Match.**
- The reader's version matches his message of 2026-09-29T14:07:20.452Z: "item seven as recommended. So one now and two after the switch. ... at the moment we do not touch the walk system until we switch the library and then when ... we start running the type checker in the walk it will gain types and can switch."
- That message also answers the reader's "does walk survive the switch-over?": it does, and it gains types.

**A kept premise, not his word.**
- The reader's "Decides" gives "harmless for microGPT because microGPT's static types are concrete" as the decision's reason.
- That sentence is the coordinator's premise, from item 7 of the review page and his 14:08:16.691Z text, and nothing has measured it. His message does not mention microGPT.
- The writer already puts it to him (`corrections-c4.md`, P-59, question 1). So I propose no fix ahead of his answer.

**Not drifts.**
- The status of the step after the switch-over: it is not built, and PLAN's Q-walk calls it R7's second step, not yet designed (`PLAN.md:87`). The reader cannot tell this.
- Rule 9's "Still to build: R7's second step (PLAN, Q-walk)" would answer it. But the entry is correct as it stands, so this is the coordinator's option, not a correction.

## P-60

**Match on the reading.**
- His "Yes" (2026-09-29T11:25:37.094Z) took the coordinator's "option 1 with Astra's three points built into 7b's briefs". That option was the value reading, "covers" defined once, and the Meet Rule's closed-trait case. The reader carries all of it, and the intersection typing with run-time uniqueness.
- The proof's scope, now with "at calls that need no coercion", matches the addendum that he pasted (11:20:08.691Z) and his forward of Astra's note (17:29:19.700Z): "ground/no-coercion scope".

**Slight drift, from the rewrite: what happens at the boundary.**
- **How it misled.** The reader asks what the checker does with a generic declaration outside the proof: refuse it, fall back to static uniqueness, or allow it without proof. The rule, as stated, covers "a call whose argument sits between closed traits". So a worker could extend the intersection typing to generic families, on the reading that only the proof stops there.
- **What he meant.** His forward of 2026-09-29T17:29:19.700Z says: "Do not generalize the new typing rule on the strength of the appendix proof." The specification agrees that "the type of such a call is not yet given" (`Specification/advanced/overloading.tex:728-730`).
- **Where it comes from.** The rewrite moved the last sentence to review-queue items 58 and 15, under rule 2, and rightly so: the checker's narrower condition is a default that waits for him. But that sentence was the entry's only word that the checker stops short of generic families.
- **Fix.** "A generic declaration that needs a run-time instance is outside it, and the intersection typing is not extended to it; the specification states that boundary." This rests on his forward of 2026-09-29T17:29:19.700Z. It leaves item 58, the narrower condition, open.

**Not drifts.**
- "Values" in the title against "type-level" in the addendum's file name. The file is named after the question, whether a clause is read at the level of types, so this is project context.
- Astra's third point, that the proof holds only where closed families are in fact closed (rows 487 and 551), has been absent since the consolidation. The writer names it for the coordinator. The reader takes away nothing wrong from its absence, and the specification states the assumption (`overloading.tex:731-734`).

## P-62

**Match.**
- The reader's version matches his decisions.
  - "Does that go into the ledger somewhere as future work ... or is it on the critical path" (2026-09-26T08:05:26.356Z). The coordinator answered, "It isn't on the critical path. It becomes future work in the ledger", with the defect row and its expected-failure tests (08:05:53.363Z). He wrote "Agreed." (08:18:07.238Z).
  - "When we get to covariant ... we try this. Let me try to resurrect this." (11:38:29.550Z). The rewrite's "a rung tries to bring back" matches it.

**Not drifts.**
- **"Owed by whom, and when?"** No PLAN or queue line holds the tests, as the writer finds. Its proposed PLAN line is the remedy, not a change to the entry.
- **"May a worker write `covariant` today?"** This is project context: the coordinator's 08:05:53 text notes that no declaration in the library uses the keyword.
- **P-80's "Their return with covariance".** It now says more than P-62. The writer names it, and it is outside this chunk.

## Across the chunk

The reader finds the status marked unevenly. Under the writer's rule 9, a built entry carries no status line, and only work still to build keeps one with its PLAN item.
- By that rule, three entries hold work still to build:
  - P-58 says so.
  - P-54's later rung has no PLAN line that names `QQ` (the writer's note).
  - P-62's owed tests have no PLAN line (the writer's note).
- P-59's step after the switch-over is also still to build, as noted under P-59.
- P-51's "Built." is the one built entry that says so. No reader of this chunk is misled by it.
