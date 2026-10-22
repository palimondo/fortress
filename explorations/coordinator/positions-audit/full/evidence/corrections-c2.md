<!-- The POSITIONS audit's full run, chunk c2 (P-27 to P-40, ten entries): the corrected record proposed by the writer's brief (positions-audit/full/evidence/briefs/writer.md, rules 0 to 12), entry by entry, with each new sentence's source, what leaves POSITIONS and where it goes, the history lines, the questions for the curator and the pointers elsewhere; record.py run on a scratch copy only; nothing applied. -->

# Chunk c2 corrected: a proposal

Writer: one Opus session. Sources: `judgement-c2.md`; the ten scouts' reports in this folder (`P-27.md` to `P-40.md`); his page comments of 2026-10-21 (`positions-audit/evidence/curator-comments-2026-10-21.md`); his messages of 2026-09-19T16:39:48.865Z, 2026-09-20T07:20:24.519Z and 2026-10-09T05:20:34.111Z, read whole (`curator-profile/show.py`); the coordinator's texts of 2026-09-21T16:58:52.471Z (the transcript, part 000, line 9880), 2026-10-16T10:28:40.684Z and 12:49:17.721Z (`positions-audit/tools/near.py`); `process-engineering/library-extension-rule-archaeology.md`, sections 5 to 7; `HELD.md`, the 2026-10-09 lines; PLAN (its phases, item 12, "Off the path, parked"); the review queue (items 30, 36, 50 and 99); FACTS (F-35, F-53, F-66, F-97, F-140, F-264); the gap ledger's rows 320, 348, 381, 383 and 527; `reviews/array-design-review.md`, decision E; `compile-ladder/rung-nat-checker/REPORT.md`, decision 1; `explorations/microgpt-port.md`, "Step-0 results"; and the skills' lines that the pointers name. Nothing in the real record changed.

- The apply file is `corrections-c2.apply`, beside this file. `record.py` ran it on a copy of the record, in the scratch folder `positions-audit/full/fix-c2/root/`, with `--root`.
- `rewritten-c2.txt` holds the ten entries as each would stand: all ten stay.
- `review-queue-items-c2.md` holds three drafted items, Q-?1 to Q-?3, and four small changes to items the queue already holds.
- Each entry's "Pointers elsewhere" is from `positions-audit/tools/pointers.py N`, run at HEAD `25f48b11e`; its output is `fix-c2/pointers.txt`. Lines that it does not search, found by grep, are marked "outside".

All times are UTC. Each is a message of his or of the coordinating session, unless it is named as a page comment. No entry of this chunk has a page comment of his on its own text; his comment of 23:05 on P-10 names P-30 (scout P-30, section 7). "Rule n" is the brief's rule n.

## The verdicts

- **P-27**: rewritten, and a question for him. Its first sentence, "What microGPT invented goes into the standard library", is reworded from his later word of 09-20 and his page comment of 10-09, which said the record's citations contradict his position (rule 12). The rest kept word for word.
- **P-28**: rewritten. Its premise "Next is the algebraic layer" is corrected: PLAN parks the layer off microGPT's path, which his answer of 10-16 took as given (rule 8).
- **P-29**: rewritten. "Hundreds of times slower" leaves for its report, with a pointer (rule 11). "No performance decision of any kind" is reworded to his words: no decision rests on walk's timings (rule 4). The gate's compile-only stage and the later non-gating run leave for the review queue (drafted item Q-?1; rule 2).
- **P-30**: rewritten. "The full check programs run only when asked." leaves for the review queue (drafted item Q-?2; rule 2). The rest kept word for word.
- **P-32**: rewritten. The title kept. The purpose sentence is widened to his scope, all the record's maps kept current and used, not the territory map alone (rules 4 and 12).
- **P-33**: rewritten. "six phases" is corrected (phase 2b; rule 8), "with their workers" struck as a one-time approval, carried out (rule 3), and the landed phases go to the history; what is left is one "Still to build" line (rule 9).
- **P-37**: kept, word for word. Its sources are listed below for the history, since the tool cannot add them.
- **P-38**: rewritten, and a question for him. Its title made five answers, given one row at a time, a rule for every defect of the compiler prelude; it now names the five (rule 4). The rest kept word for word.
- **P-39**: rewritten. The title's "never turns the gate red" holds for the count's total only (rule 8), and the second sentence gets back the sense that a rewrite lost.
- **P-40**: rewritten. The storage refusal, his yes, is not built, and the entry now says so (rule 8). "How the checker represents it is not his choice." leaves for the review queue (drafted item Q-?3; rule 2). "The other unused sizes of the 25 go only by a diff shown to him." leaves for review-queue item 36, which holds it (rule 2). "is built" goes to the history (rule 9).

## P-27

**Before.**

> - P-27 **The library's own practice is the standard.** What microGPT invented goes into the standard library, in the library's own style. Whoever extends the library first studies how it does the same kind of thing, and follows that pattern; exclusion, for one, is all over it. He had to find the diagonal's override himself (P-88) because that study was skipped. No fix is designed from the specification alone or from a workaround on the user's side.

**After.**

> - P-27 **The library's own practice is the standard.** What microGPT needs goes into the standard library only as an extension with a precedent in the library itself, a form that it has for one number type or rank and lacks for another, such as scalar addition on `Matrix`; a form specific to microGPT stays in the model's own components, and he judges each extension. Whoever extends the library first studies how it does the same kind of thing, and follows that pattern; exclusion, for one, is all over it. He had to find the diagonal's override himself (P-88) because that study was skipped. No fix is designed from the specification alone or from a workaround on the user's side.

**Each sentence and its source.**
1. Title: kept. His words of 2026-09-19T18:31:44.057Z, fairly condensed (`judgement-c2.md`, "P-27"). Climb-batch records and the batch script cite it by these words (`coordinator/climb-batch-workflow.js:287`, `CLIMB-BATCH-8.md` to `-11.md`), so it stays word for word.
2. "What microGPT needs goes into the standard library only as an extension with a precedent ..." (rewritten; rule 12). The old sentence was his 18:31:44 words alone: "all the extensions that it invented need to go directly to the standard library in the spirit of the standard library". His later words narrow it, and the entry did not carry them:
   - 2026-09-20T07:20:24.519Z, read whole with `show.py`. It answers the coordinator's 06:42:33.439Z summary, "Your ruling sends every invented extension into the library, but only the scalar extension went". He does not want the library extended with forms specific to C4's use case. An extension with a precedent in the library itself is fine with him. Patterns of the natural numbers or the integers extended to floats are "exactly what I will be after". He wants to know what moved into the library, and to judge each.
   - 2026-10-09T05:20:34.111Z, a page comment on the skill bullet that the old sentence became (`.claude/skills/fortress-repo/references/library.md`, "Designing a change", its first bullet). The citations of him still contradict his position. He would at most extend the library for C4 where it misses an obvious extension, a form that a lower-rank `Array` or `Matrix` has and a higher one lacks. Scalar addition on `Matrix` is his example of a desired change.

   The new sentence takes both. "One number type or rank": his integers to floats (09-20) and his lower rank to higher (10-09). "A form specific to microGPT stays in the model's own components": his "I don't want that we extend the library ... with forms that are specific to our use case in C4" (09-20). The model's components are where such a form then lives, as the diagonal did (P-88). "He judges each extension": his 09-20 words. The Opus re-reading of 10-09 states the same rule (`process-engineering/library-extension-rule-archaeology.md`, section 5, points 2 to 4; section 7). He has not approved that re-reading (`HELD.md`, 2026-10-09, 04:21 UTC). So the new sentence goes to him as question 1.
3. "Whoever extends the library first studies ...": kept. His words at 18:31:44 ("study the existing parts of the fortress library meticulously, and use those patterns for extending the standard library in the native way"; "it is a practice that is all over the standard library"), answering the coordinator's 18:22:49.203Z text, which proposed `excludes` in the library as a fourth route.
4. "He had to find the diagonal's override himself (P-88) because that study was skipped.": kept (rules 0 and 6 conflict; see "The rules, where they fit badly"). His question at 2026-09-24T18:30:37.463Z was why he had to invent the solution, and why it was not obvious to the coordinator or the workers. The coordinator's 18:31:40.955Z answered that it had skipped the step of checking the library's own way. He then wrote "record that" (18:37:13.721Z).
5. "No fix is designed from the specification alone or from a workaround on the user's side.": kept. It is the coordinator's rewording of his 18:31:44 words and of his refusal of the user-side `planeSum` rename at 18:13:00.524Z ("That's not Fortress!"). The coordinator's 18:32:33.957Z told him that his decision was on record in these terms. I found no objection of his (`judgement-c2.md`, "P-27").

**What leaves POSITIONS, and where it goes.** Only the old first sentence's breadth. It goes to the history. Review-queue item 50 already holds the skill's bullet that rests on it, with the revised bullet as "the other way". No new item.

**History line.** The first sentence reworded from 2026-09-20T07:20:24.519Z (answering the 06:42:33.439Z summary) and from the page comment of 2026-10-09T05:20:34.111Z. The sources the blocks lack: 18:31:44.057Z, answering 18:22:49.203Z; 18:13:00.524Z and the coordinator's 18:32:33.957Z; "record that" at 2026-09-24T18:37:13.721Z, answering 18:31:40.955Z, on his 18:30:37.463Z question. The line is given whole in "What record.py wrote".

**Questions for him.**
1. Your page comment of 2026-10-09, 05:20 UTC, said that the record's citations of you contradict your position. The entry's first sentence was your 09-19 words alone: "What microGPT invented goes into the standard library, in the library's own style." The proposal puts in its place: "What microGPT needs goes into the standard library only as an extension with a precedent in the library itself, a form that it has for one number type or rank and lacks for another, such as scalar addition on `Matrix`; a form specific to microGPT stays in the model's own components, and he judges each extension." Is that your position? Review-queue item 50 would then hold only the skill's bullet.

**Pointers elsewhere.**
- `POSITIONS.md`, P-28, "It goes into the standard library itself (P-27)": needs nothing. The algebraic layer is the library's own design, not a form that only the model needs.
- `reviews/open-asks-2026-10-16.md:248` and `:256` cite P-27 for the library's own device: need nothing.
- `.claude/skills/coordinator/references/sources.md:55`, "The library's way first: P-27's clause": stale before this proposal. That clause was cut at `1632b5dfa`, and its rule moved to `references/road.md`, "Procedures". This change does not touch it.
- `.claude/skills/fortress-repo/references/sources.md:635`, `:652`, `:700` cite P-27 by its title, which is unchanged: need nothing.
- Outside: `.claude/skills/fortress-repo/references/library.md:30`, "Put each extension into this library, outside the compiler's files. This includes an extension that only the model program needs." It rests on the old sentence, which he said contradicts his position. Under the new text it contradicts POSITIONS too, until item 50 is answered. Rule 12 asks that his later word reach the skill as well. Item 50's revised bullet is that change. It is the skill writer's task at his yes, and this proposal does not edit the skill.
- Outside: `process-engineering/blind-brief/content.md:232-234` quotes an older text. It is history.

## P-28

**Before.**

> - P-28 **Fleshing out the standard library is a very important task.** Next is the algebraic layer: `Ring`, `Field` and what the matrices and tensors of machine learning need, so that the library's traits reach them. It goes into the standard library itself (P-27), not into a tree of the revival's own.

**After.**

> - P-28 **Fleshing out the standard library is a very important task.** Its next layer is the algebraic one: `Ring`, `Field` and what the matrices and tensors of machine learning need, so that the library's traits reach them; it is parked off microGPT's path (PLAN, "Off the path, parked"). It goes into the standard library itself (P-27), not into a tree of the revival's own.

**Each sentence and its source.**
1. Title: kept. His words at 2026-09-15T10:42:06.544Z: "I think that fleshing out the standard library is one very important task to close it."
2. The algebraic layer: kept, but for the order word and the new clause. His same message: first finish the `RR64` fix, then go to the higher dimension, so that machine learning's matrices and tensors get the mathematical rigour that this kind of library promises. `Ring` and `Field` are named in the coordinator's text that he reacted to (09:51:20.618Z, "Ring, Field, and which specification"). His "then" ordered the layer after the `RR64` fix. That fix is built (`d846e3644`, climb batch 6's rung F). So "next" still holds as the library's order. It does not hold as the next work.
3. "it is parked off microGPT's path (PLAN, "Off the path, parked")" (new; rule 8). The premise "Next is" read as the next work, and it is false today. PLAN puts "The library's algebraic layer (P-28)" under "Off the path, parked" (`PLAN.md:191`, written at `6c32529e5`). The coordinator's 2026-10-16T12:49:17.721Z text recalled his decision that the library's algebra is very important. It proposed to "park both [matrix ideas] with that algebra work, off the path to microGPT compiled". He answered "Park both with the algebra work." at 13:01:50.455Z. His answer takes the algebra work as parked. The coordinator placed it, and he did not object (`judgement-c2.md`, "P-28").
4. "It goes into the standard library itself (P-27), not into a tree of the revival's own.": kept. On 09-15 he deferred the question: "2. Later" (21:14:56.200Z), to item 2 of the coordinator's 11:02:11.020Z list (the sealed `Library/`, or a tree of the revival's own). His later words settle it: on 2026-09-16 at 22:43:26.489Z, the next phase unseals the library and modifies the original repository; on 09-19 at 18:31:44.057Z, the extensions go to the standard library (P-27), which the coordinator's 18:32:33.957Z took to close the question of 09-15; on 2026-09-20 at 14:39:06.836Z, the compiler's second library is a bootstrap to remove.

**What leaves POSITIONS.** Nothing.

**History line.** The premise corrected from PLAN's parked line and his 13:01:50.455Z, answering 12:49:17.721Z. The sources the block lacks: 10:42:06.544Z, answering 09:51:20.618Z; "2. Later" at 21:14:56.200Z, answering 11:02:11.020Z; and the later words of 09-16, 09-19 and 09-20.

**Questions for him.** None. The parking is the coordinator's placement, and his answer of 10-16 took it as given.

**Pointers elsewhere.** `PLAN.md:191`, "The library's algebraic layer (P-28), with two matrix ideas parked beside it ...": needs nothing. The new clause points to it. No other line in the eight places names P-28.

## P-29

**Before.**

> - P-29 **Walk's speed is irrelevant to every judgement of Fortress's performance.** Walk is hundreds of times slower than Python's interpreter. So no performance decision of any kind, and no edit of C4, the flat model program, for speed, until microGPT runs compiled. The gate never runs the two microGPT programs, too long-running to be tests: it compiles them and records the phase that each reaches. A run of them, once possible, goes to a stage that does not gate.

**After.**

> - P-29 **Walk's speed is irrelevant to every judgement of Fortress's performance.** Walk is far slower than Python's interpreter (`explorations/microgpt-port.md`, "Step-0 results"). So no performance decision rests on walk's timings, and no edit of C4, the flat model program, is made for speed until microGPT runs compiled. The gate never runs the two microGPT programs, too long-running to be tests.

**Each sentence and its source.**
1. Title: kept. His words at 2026-09-19T16:43:19.420Z: the interpreter, hundreds of times slower than the Python interpreter, "is irrelevant for any performance discussions", and nothing about Fortress's performance can be judged while there is no compiler. The message answers item 4 of the coordinator's 16:26:24.607Z results text ("The tuples slow C4 down. ... Editing C4 is your call; my default is yes"), which it quotes.
2. "Walk is far slower than Python's interpreter (pointer)" (rule 11). "Hundreds of times" is his word, but it rests on one measurement. It is the port's projection of 2026-08-23: about 20 s a step for the Karpathy configuration, "roughly 170× CPython", projected from timed pieces (`explorations/microgpt-port.md:188-191`, in "Step-0 results"). He called it established at 2026-08-24T05:53:08.591Z ("one hundred and seventy times slower"). No later measurement of walk against Python is on record (scout P-29, section 2). The entry keeps the reason in words, with the pointer.
3. "So no performance decision rests on walk's timings, and no edit of C4 ... is made for speed until microGPT runs compiled." (reworded; rule 4). The old clause, "no performance decision of any kind", is the coordinator's, from its 16:43:26.371Z ("Agreed, and I withdraw the suggestion"). It is wider than his words. Those rule out judging performance from walk. They do not rule out every decision about performance. He made one the same evening, at 18:32:48.384Z: "we must go to double array for performance. There is again no question about this." The checker-speed rule (P-148) was decided before microGPT runs compiled as well. Read by its letter, the old clause forbids work that he ordered. The new words are his: walk's slowness is irrelevant to any performance discussion, and performance is discussed once the compiler runs ("I don't care how slow the interpreter is, because ... once we get the compiler running, then we will be talking about performance"). The C4 half is kept. The coordinator withdrew its own default, editing C4 for speed, at 16:43:26.
4. "The gate never runs the two microGPT programs, too long-running to be tests.": kept, his words at 16:39:48.865Z ("Th those are too long running to be tests."). F-97 holds what the gate does with them.

**What leaves POSITIONS, and where it goes.**
- "it compiles them and records the phase that each reaches": a default that an agent landed, waiting for his review (rule 2). It is decision 6 of the coordinator's six process decisions of 14:53:40.072Z ("The two microGPT programs will be part of the ladder check"). He answered that text at 14:54:15.024Z: "I am not reading this, but go." At 16:39:48.865Z he quoted decision 6. He wrote that the two programs did not yet compile, so he did not understand the idea. Once the compiled path runs, a ladder check makes sense to him, but not with the microGPT programs, which are too long running to be tests. The coordinator's 16:39:58.548Z answered that the stage only compiles them and never runs them. He did not reply. The stage has run in every gate since (F-97; `fortress-repo`, `gate.md`, "The ladder regression"). No item of the queue holds it, so it goes as **drafted item Q-?1**.
- "A run of them, once possible, goes to a stage that does not gate.": the coordinator's design, from the same 16:39:58 answer, in keeping with his "too long running to be tests". No home holds it (scout P-29, section 5). It goes into Q-?1 with the stage.

**History line.** Three changes, with the sources above. The sources the block lacks: 16:43:19.420Z, answering item 4 of 16:26:24.607Z; 16:39:48.865Z, on decision 6 of 14:53:40.072Z; "I am not reading this, but go." at 14:54:15.024Z; and 2026-08-24T05:53:08.591Z, his figure.

**Questions for him.** None for the entry. Q-?1 asks the routine question: does the gate's compile-only stage stand, and does a later run of the programs stay out of the gate?

**Pointers elsewhere.** No line in the eight places names P-29. `FACTS.md`, F-97, holds the stage as built and needs nothing.

**His later word, not added.** At 2026-10-16T10:39:28.136Z he questioned the coordinator's plan to hold five probes until a batch landed, so as not to skew its time measurements: "Do you have in mind positions that we are somewhere measuring the performance of the walking like something that matters?" He said that an idle machine is rarely needed for any measurement here. The scout set it aside as naming no entry, and the judgement read it as an application of P-29. I left it out. Its rule is about an idle machine for any measurement, not about walk alone, so P-29 would narrow it. It is not on record. The coordinator may want it in its own skill.

## P-30

**Before.**

> - P-30 **The microGPT walk check after a batch runs in under a minute.** It runs about two forward-and-backward passes against the reference values, which shows that the model's mathematics still works and that the library's changes did not break it. The full check programs run only when asked. A slower check is to him a waste of time.

**After.**

> - P-30 **The microGPT walk check after a batch runs in under a minute.** It runs about two forward-and-backward passes against the reference values, which shows that the model's mathematics still works and that the library's changes did not break it. A slower check is to him a waste of time.

**Each sentence and its source.**
1. Title: his words at 2026-10-08T17:49:22.269Z: "it needs to run under a minute, okay? That's the goal. Otherwise, it's useless waste of time." It answers the coordinator's 17:47:57.097Z reply ("About 30 forward-and-backward passes per program") to his question at 17:47:43.413Z, how many iterations run. The minute is his goal. It has been met at each landing but climb batch 16's, whose 65 s is PLAN's open item (`PLAN.md:448`). The latest is 47 s and 41 s at climb batch 20 (`PLAN.md:9`).
2. The two passes, and what they show: a fair rewording of the same message. He would have run two backward-forward passes, to check that the math works and that the library's changes, such as the arrays, do not break it. "Against the reference values" is the coordinator's, and true (`run-c4/src/MicroGptFlatQuick.fss:1-9` and `apl/mg/MicroGptAplQuick.fss:1-8`, seven checks against the goldens).
3. "A slower check is to him a waste of time.": his words, condensed.

**What leaves POSITIONS, and where it goes.** "The full check programs run only when asked.": a default that an agent landed, still waiting for his review (rule 2). It is the coordinator's wording, in its worker brief at 17:49:42.994Z ("The full 40-check programs stay as they are, for when someone asks for them") and its reply at 17:49:58.927Z. He answered neither. It is in keeping with his "Not a full training that takes ages." of 16:20:06.948Z. `tools/mg-run.sh` and the `fortress-repo` skill hold it as built (`references/interpreter.md`: "Add the word `full` only if your brief asks for it"). No item holds it, so it goes as **drafted item Q-?2**.

**History line.** The sentence leaves for Q-?2. The sources the block lacks: 17:49:22.269Z, answering 17:47:57.097Z, on his question at 17:47:43.413Z; his "Yes, but only if they run few iterations. Not a full training that takes ages. Adjust if needed." at 16:20:06.948Z, answering the coordinator's 16:09:48.942Z offer to run the two checks once.

**Questions for him.** None for the entry. Q-?2 asks the routine one.

**Pointers elsewhere.**
- `POSITIONS.md`, P-10, "its APL microGPT program stays in the walk check (P-30)": needs nothing. The walk check still runs both quick programs (`tools/mg-run.sh:9`). His page comment of 23:05 on 10-21 called that clause "a valuable position". Chunk c1 has P-10.
- `PLAN.md:9` ("within P-30's minute") and `:448` ("past P-30's minute"): need nothing.
- Outside, by the title of 10-08, "The microGPT walk check is quick.": `coordinator/climb-batch-workflow.md:248`, `coordinator/climb-batch-workflow.js:1315-1316` and `.claude/skills/fortress-repo/references/sources.md:198`. They were stale before this proposal, since the title changed at `b87a17de5`. Each could read "P-30". This change does not touch them.

## P-32

**Before.**

> - P-32 **The territory map (`coordinator/map/`) maps the tree down to where the design intent is written, in the papers as well as the specification.** It exists so that nothing on record is found again from scratch.

**After.**

> - P-32 **The territory map (`coordinator/map/`) maps the tree down to where the design intent is written, in the papers as well as the specification.** It and the record's other maps, FACTS and `INDEX.md`, are kept current and used, so that nothing on record is found again from scratch.

**Each sentence and its source.**
1. Title: kept (rules 0 and 3 conflict; see "The rules, where they fit badly"). His request of 2026-09-16T22:43:26.489Z: a thorough map of the territory, before the library is unsealed. The coordinator's 22:44:25.808Z reflected it back, and he gave his "word" at 22:46:21.111Z. Then at 22:57:42.006Z, after the coordinator's launch notice of 22:47:41.773Z: parts of the design intent are written in some of the papers, not in the specification, so the map must include them, so that we know where to look up the design intent. The map was built that night, and its papers survey is `map/design-intent-sources.md` (`2e33f4ab2`). The title is true today.
2. "It and the record's other maps, FACTS and `INDEX.md`, are kept current and used, so that nothing on record is found again from scratch." (reworded; rules 4 and 12). The old sentence entered at `bc8902f47` from a separate entry. That entry recorded his 2026-09-24T06:44:33.963Z, which answered the coordinator's 06:39:41.052Z (the index searched, not read, at boot). The maps of the repository were built for a reason, he does not want them skipped and rederived, and up-to-date maps are an investment. His "maps" are the record's maps, not `coordinator/map/` alone:
   - 2026-09-27T05:57:11.388Z, on FACTS and the index: the investment in up-to-date maps is so that nothing needs rediscovering each time.
   - 2026-09-21T01:14:56.336Z: why was the map not used to read context on demand, and was it out of date again?
   - 2026-09-30T05:24:08.253Z, his stated position: no searching with a flashlight in a dark room; he wants to give a map of the territory.

   "Kept current and used" is his "up-to-date maps" and his "skipping those and rederiving". How they are read, the boot's whole reading of FACTS, POSITIONS and `INDEX.md` and a worker's briefing from the maps, is the `coordinator` skill's (`SKILL.md`, "The boot"). The entry does not repeat it.

**What leaves POSITIONS.** Nothing.

**History line.** The purpose sentence reworded to his scope, with 06:44:33.963Z (answering 06:39:41.052Z), 05:57:11.388Z, 01:14:56.336Z and 05:24:08.253Z. The title's sources the blocks lack: 22:43:26.489Z, 22:46:21.111Z ("word", answering 22:44:25.808Z) and 22:57:42.006Z. The block of 2026-10-13 19:07Z names `map/README.md`, section 3, as its source, which holds none of these sentences (scout P-32, section 3).

**Questions for him.** None.

**Pointers elsewhere.**
- `.claude/skills/coordinator/references/sources.md:33`, "P-32's boot clause": stale before this proposal. The clause was cut at `1632b5dfa`, and its rule is the skill's `SKILL.md`, "The boot". It could read "the boot clause that P-32 held until `1632b5dfa`". This change does not touch it.
- `.claude/skills/coordinator/references/sources.md:87`, "The territory map: P-32.": needs nothing.

## P-33

**Before.**

> - P-33 **The plan (`coordinator/PLAN.md`) has six phases, approved with their workers.** Phases 1 and 2 are landed: the wrapping operators, the revised specification, the run-time sizes, the flat number tower and the overflow natives. 3 is the checker at a true zero; 4, the switch-over, natives then names; 5, microGPT compiles: its static types, the array design and the code generator's holes; 6, microGPT fast. Where the work stands: PLAN's "Where we stand". Re-approval row 41 (ledger row 320: a component named apart from its api does not link) joins the switch-over's design.

**After.**

> - P-33 **The plan (`coordinator/PLAN.md`) holds the phases in the order he approved.** Still to build: 3, the checker at a true zero; 4, the switch-over, natives then names; 5, microGPT compiles: its static types, the array design and the code generator's holes; 6, microGPT fast. Where the work stands: PLAN's "Where we stand". Re-approval row 41 (ledger row 320: a component named apart from its api does not link) joins the switch-over's design.

**Each sentence and its source.**
1. Title (rewritten; rules 8 and 3). His "Yes, this order and workers are go." at 2026-09-26T09:04:41.396Z. It answers the coordinator's 08:40:51.388Z text, which named the six phases and asked "yes to this order, and to starting four Opus workers now". He had asked for the order at 08:20:06.663Z: help organize all open issues into the best order to reach the running compiler.
   - "six" is false today. PLAN has a phase 2b, the repair batch from the conformance reviews, added at `d5b5fa786` (2026-09-27) after his 06:13:29.788Z of that day: the reviews of batches 5 and 6 would possibly yield other batches that go in before phase three. Phase 2b is built.
   - "with their workers": a one-time approval, carried out (rule 3). W1 to W4 ran on 2026-09-26 and are done. `892687076` already dropped their names under his rule of 2026-09-27T02:26:42.155Z, that a one-off go needs no place in the permanent record.
2. "Still to build: 3, ...; 6, microGPT fast." (rule 9): the four phases as he approved them, word for word but for "3 is" becoming "3,". The landed phases leave (below).
3. "Where the work stands: PLAN's "Where we stand".": kept. It is a pointer, and now the only place in the entry that says what has landed.
4. Row 41: kept. The 08:40:51 text said, before its ask, "Your unanswered re-approval rows don't take priority. They're off the path, except row 41, which becomes part of the switch-over's design." His yes was to "this order", so the thread is loose (`judgement-c2.md`, "P-33"). The text states it fairly, and PLAN (`PLAN.md:189`, item 12) and review-queue item 36 hold it in the same words. The row itself is still unanswered (item 36).

**What leaves POSITIONS, and where it goes.** "Phases 1 and 2 are landed: the wrapping operators, the revised specification, the run-time sizes, the flat number tower and the overflow natives." goes to the history (rule 9), which keeps the old line. The note names what built them: phase 1, climb batch 5's rungs Z and S and its follow-up rung D (`ab914b6e0`); phase 2, climb batch 6, rung R (`7278e11f7`) and the follow-up 6b, rung O (`917bb7b32`); phase 2b, climb batches 6.5 (`d9c62446e`) and 6.5b (`e3214cbf1`) (PLAN, "The phases"). "Approved with their workers" goes nowhere.

**History line.** The three changes, with the sources above. The source the blocks lack: "Yes, this order and workers are go." at 09:04:41.396Z, answering 08:40:51.388Z, after his request at 08:20:06.663Z.

**Questions for him.** None.

**Pointers elsewhere.**
- `POSITIONS.md`, P-17, "unboxed arithmetic is PLAN phase 6 (P-33)": needs nothing. Phase 6 stays in the line.
- `PLAN.md:1` and `:5`, "the plan Pavol approved that day (P-33)": need nothing.
- `.claude/skills/coordinator/references/sources.md:55`, "PLAN's order and parked rows: P-33's clause": stale before this proposal. The clause was cut at `1632b5dfa`, and its rule is `references/road.md`, "Procedures". This change does not touch it.

## P-37

**Before and after.** Kept, word for word:

> - P-37 **One library, the interpreter's, is the library the compiler checks.** The interpreter's `FortressLibrary` and `FortressBuiltin` become the compiled path's library. He sees the compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) as a bootstrap to remove, so no declaration goes into it, and its three files are deleted at the switch-over with their tests kept. Code-generator rungs go on. How the checker comes to accept the library is a plan shown to him step by step, not a question to ask again. Still to build: PLAN phase 4.

**The parts** (rule 1; `judgement-c2.md`, "P-37").
- The title, the two files and the bootstrap: his words. At 2026-09-20T14:33:50.777Z he wrote "we need to unify this. into single library", to the coordinator's 14:28:17 text ("Which library"). At 14:39:06.836Z: "I fully believe that the compiler second library is just a bootstrap and we need to get rid of it." He restated it at 2026-09-29T12:17:07.180Z.
- "so no declaration goes into it", the files deleted with their tests kept, the code-generator rungs, the plan shown step by step: his yes to the coordinator's reading. His "2. What's decisions there to make that want ahead make?!?" at 2026-09-21T02:35:47.256Z answered item 2 of the 02:34:00.565Z list. The coordinator's 02:36:16.321Z read it as "That decision is made" and listed these four points. His "That wasn't already made" at 02:37:02.090Z was his own fix of the autocorrected question. At 02:40:19.981Z he wrote "You decoded it correctly. ... Don't revert!??"
- "no declaration goes into it" holds in the tree. Two commits changed `CompilerBuiltin.fss` after 09-21, each at a decision of his (`6bec1b004`, `ce0c7f453`). They add import names and change existing bodies, and add no declaration (`judgement-c2.md`, "P-37").
- "Still to build: PLAN phase 4.": rule 9 keeps it, one short line with its PLAN item.
- His bound of 2026-09-24T01:02:52.634Z, "Only which file survives.", shows that one library settled which files survive, not the tower inside them. The entry claims no more than that, so it stands. The bound goes into its history line.

**What leaves POSITIONS.** Nothing.

**History line.** Listed under "History lines the tool cannot write".

**Questions for him.** None.

**Pointers elsewhere.** `FACTS.md`, F-11, "the arrays reach the compiled path with the one library (P-37)": needs nothing. Outside: `PLAN.md:86` and `:240` name it by its old words ("POSITIONS 2026-09-21, the library route"): need nothing.

## P-38

**Before.**

> - P-38 **The compiler prelude's defects are not repaired: they go with it at the switch-over.** Its `Maybe` block and its `REM` guard `if other = -1 then 0` stay as landed until the prelude is deleted, and their tests stay. Then the compiled tests respell its reversed wrapping and saturating operators (row 348), `ZZ64`'s compiled shift closes (row 381), and the specification's `shift` reaches the compiled path (row 383). `XXXShiftDeclRungI` is then promoted, and the switch-over batch finds the compiler tests that bind `shift`, a reserved name from then on. Still to build: PLAN phase 4.

**After.**

> - P-38 **The compiler prelude keeps these five items as they are until the switch-over deletes it.** Its `Maybe` block and its `REM` guard `if other = -1 then 0` stay as landed until the prelude is deleted, and their tests stay. Then the compiled tests respell its reversed wrapping and saturating operators (row 348), `ZZ64`'s compiled shift closes (row 381), and the specification's `shift` reaches the compiled path (row 383). `XXXShiftDeclRungI` is then promoted, and the switch-over batch finds the compiler tests that bind `shift`, a reserved name from then on. Still to build: PLAN phase 4.

**Each sentence and its source.**
1. Title (rewritten; rule 4). The old title made a standing rule out of five answers, each given for one row. `55f1a1352` wrote it on 2026-10-13, and no message of his says it (scout P-38, section 1). The record repaired prelude defects after the one-library decision, at his decisions: `6bec1b004` (2026-09-23, "as Pavol decided for row 321") and `ce0c7f453` (2026-09-24, his integer rules of 2026-09-22 on the compiled path). Read as a rule, the old title would refuse such a repair. What he approved is narrower: each of the five stays as it is, at no cost now, because the prelude goes. The new title says that. The wider rule, "the compiler prelude's own defects retire with it, each gated", is the coordinator's plan (`PLAN.md:86`). It goes to him as question 1.
2. The `Maybe` block: his yes. At 2026-09-21T21:20:29.106Z he chose to keep the team's parametric spelling of `Maybe`'s empty case ("paramedic speaking", dictated), with the future work gated on `where` clauses. That answered option 1 of the coordinator's 21:08:15.030Z: approve rung M as landed, with its tests kept and its lines gone at the switch-over.
3. The `REM` guard: his "Row 30 approve as landed." (2026-09-24T13:49:02.932Z), to the coordinator's 09:38:47.121Z ("The guard is approved as landed and dies with the prelude; its test carries the check to the switch-over rung").
4. Row 348: his yes to the wrap note at 2026-09-26T07:48:29.318Z. The note from O looked solid to him, he saw no credible alternative, and it was to go on the record. That answered item 1 of the coordinator's 07:43:57.296Z. The respelling at the switch-over is the note's section 10 (`reviews/wrap-dependent-code.md:171`). He took the note whole.
5. Row 381: his "yes" (09:33:32.071Z), to the coordinator's 09:30:15.820Z ("Row 381 ... closes by itself when the compiled path reads this library"). The ledger's row 381 is a `ZZ32` receiver shifted by a `ZZ64` count, which the compiled path sends to `ZZ64`'s method. "`ZZ64`'s compiled shift" is loose wording, not a change of meaning, so it stays (rule 0).
6. Row 383, `XXXShiftDeclRungI` and the reserved `shift`: his "yes, close at the switch-over." (09:36:51.997Z), to the coordinator's 09:34:07.043Z, which states each.
7. "Still to build: PLAN phase 4.": rule 9 keeps it.

**What leaves POSITIONS.** The old title's breadth, to the history.

**History line.** The title reworded, with the two repairs. The sources the blocks lack: each answer above with the text that it answered.

**Questions for him.**
1. The entry's title read "The compiler prelude's defects are not repaired". Your five answers each covered one item, and two prelude repairs landed at your decisions on 09-23 and 09-24. The proposal names the five only: "The compiler prelude keeps these five items as they are until the switch-over deletes it." Is that your intent? Or do you want a rule for every defect of the prelude, so that each new one waits for the switch-over too?

**Pointers elsewhere.**
- `POSITIONS.md`, P-69, "the compiled path gets `shift` and the any-width count at the switch-over (P-38)": needs nothing.
- `review-queue.md:607` (item 89) and `:1134` (item 167, "row 331 is the compiled prelude's, which the switch-over deletes (P-38)"): need nothing.
- Outside: `PLAN.md:86`, "The compiler prelude's own defects retire with it, each gated", lists the range and `RR32` defects. It needs nothing from this change. But it states as a plan the wider rule that the title no longer gives as his. His answer to question 1 decides whether it stays a plan of the coordinator's or becomes his rule.

## P-39

**Before.**

> - P-39 **The checker count is measured in every gate and never turns the gate red.** The gate reports the count stage on its own. The distance to the switch-over (F-53), over all apis and components, is a report-only stage of the phase-3 gates, whose work drives it down.

**After.**

> - P-39 **The checker count is measured in every gate, and its total never turns the gate red.** A rise of the count is reported and never fails a batch on its own; F-66 gives what turns its stage red. The distance to the switch-over (F-53), over all apis and components, is a report-only stage of the phase-3 gates, whose work drives it down.

**Each sentence and its source.** His "Agreed, option 1" at 2026-09-26T12:24:01.196Z, to "Answer 11" of the coordinator's 12:21:03.045Z. The option: keep the count, report-only, and add the full measurement at phase boundaries. When phase 3 starts, its whole job is driving that number down, so the full measurement then becomes a report-only stage in those batches' gates.
1. Title (corrected; rule 8). "Never turns the gate red" is false today for the stage. Its comparison is red on a crash line that no rung declared, a stale shadow or a table with no total (`coordinator/climb-batch-workflow.js:1114-1132`, `checker_compare`; F-66). What he approved, "report-only", is the count's total. "Its total" says so.
2. "A rise of the count is reported and never fails a batch on its own" (restored). The old sentence, "The gate reports the count stage on its own.", is `55f1a1352`'s rewrite of "reported and never red on its own" (`bc8902f47`), and it lost that sense. "A rise" is the case that matters: a fix can raise the count (F-66). "F-66 gives what turns its stage red" is a pointer, so that the reader does not take the stage for one that can never be red (record.md, question 2).
3. The distance: kept, his yes, word for word.

**What leaves POSITIONS.** Nothing.

**History line.** The premise corrected and the lost sense restored. The source the blocks lack: "Agreed, option 1" at 12:24:01.196Z, answering 12:21:03.045Z. "Option 1, agreed." at 12:01:24.267Z answers answer 8, not this one (scout P-39, section 1).

**Questions for him.** None.

**Pointers elsewhere.**
- `.claude/skills/coordinator/references/sources.md:48`, `:87`, `:90`: need nothing.
- Outside: `coordinator/climb-batch-workflow.md:234`, "(P-39, "The checker count is measured, never red.")": the title of 09-30, stale before this proposal. It could read "(P-39)". This change does not touch it. `review-queue.md:1179` names old titles in a settled list, which is history.

## P-40

**Before.**

> - P-40 **Sizes are checked, and a size left unknown is an error only where it is used.** The checker checks `nat` and `int` static parameters and refuses a size beyond `NN32` or `ZZ32` (F-140). Storage refuses a JVM array length over 2^31-1. A size that inference leaves unknown is an error only when it reaches a type, a name or a value. How the checker represents it is not his choice. A size that a call cannot fix refuses the call, also inside an overload set, instead of dropping the arm (row 400, its compiled half open). Every static argument but an operator counts in the exclusion rule; booleans join once the checker has boolean parameters (row 406). A size used as a value converts to `ZZ32` as a numeral does (row 485). The unused sizes of the api's 17 vector and matrix operators go by decision E's diff, which he read and took for the switch-over (ask 3, 2026-10-20; `perf-probes/array-sites/e3-rebased.patch`): it finishes the team's own fix of 2008, which took them out of the component only (F-35), and is built, with the array sites' other fixes. The other unused sizes of the 25 go only by a diff shown to him.

**After.**

> - P-40 **Sizes are checked, and a size left unknown is an error only where it is used.** The checker checks `nat` and `int` static parameters and refuses a size beyond `NN32` or `ZZ32` (F-140). Where the array design creates a JVM array, it refuses a length over 2^31-1; not built yet (PLAN phase 5; under walk, row 527). A size that inference leaves unknown is an error only when it reaches a type, a name or a value. A size that a call cannot fix refuses the call, also inside an overload set, instead of dropping the arm (row 400, its compiled half open). Every static argument but an operator counts in the exclusion rule; booleans join once the checker has boolean parameters (row 406). A size used as a value converts to `ZZ32` as a numeral does (row 485). The unused sizes of the api's 17 vector and matrix operators go by decision E's diff, which he read and took for the switch-over (ask 3, 2026-10-20; `perf-probes/array-sites/e3-rebased.patch`): it finishes the team's own fix of 2008, which took them out of the component only (F-35).

**Each sentence and its source.** All are his yes to a question that the entry states fairly (rule 1), but the parts below that leave.
1. Title and "The checker checks `nat` and `int` static parameters": his 2026-09-19T18:32:48.384Z, after the coordinator's 18:32:33.957Z: the `nat` sizes cannot be sidestepped, since they are a central design point of the team's arrays. Built (F-67). The title's second half is the 09-21 answer (4 below).
2. "refuses a size beyond `NN32` or `ZZ32` (F-140)": at 2026-09-27T06:38:06.255Z he asked whether 32 bits is the JVM's largest index size, about item 3 of the coordinator's 06:29:24.257Z. The coordinator's 06:38:29.847Z recommended following the specification: a size is an `NN32` value, and anything larger is refused. He quoted that line and gave an emphatic yes at 06:44:55.156Z. Built (F-140).
3. "Where the array design creates a JVM array, it refuses a length over 2^31-1; not built yet (PLAN phase 5; under walk, row 527)." (corrected; rules 8 and 9). It is his yes in the same exchange: the 06:38:29 text said "The array design adds a check where it creates a JVM array: a length over 2^31-1 is refused there." The old sentence stated it as built, and it is not. Under walk, an array of a static size from 2^31 dies with a raw `NegativeArraySizeException` (row 527, NEGATIVE-VERIFIED; F-140, "Open"; review-queue item 99). The compiled array design is not built (PLAN, phase 5, the array design). The new text keeps his decision and says where it stands.
4. The unknown size: his "So the previous decision one, I think the middle uh, is a clear winner." (2026-09-21T16:57:37.256Z), to the middle option of "Lesson two" (03:09:13.588Z).
5. Row 400: his "Agreed, decision 3 stands" (2026-09-26T12:20:23.332Z), to "Answer 12" (12:17:56.921Z). "Its compiled half open" is kept: what is still to build, in one clause (rule 9), and true (row 400, NEGATIVE-VERIFIED).
6. The exclusion rule and the booleans: his "Option 1, sizes count" (09:24:48.043Z), to "Batch-5 answer 2" (09:20:38.889Z), which states both.
7. A size as a value: his "Option 1, go ahead." (2026-09-28T19:17:29.239Z), to the 19:13:35.474Z re-ask of the 19:08:35.914Z question, option 1.
8. Decision E's diff: his yes at 2026-10-20T05:42:24.706Z: he agreed with the recommendation, and the patch made sense to him. Before it, at 05:32:27.765Z, he had read `e3-rebased.patch`. It answered ask 3 (05:06:36.884Z) as restated at 05:38:40.474Z. "And is built, with the array sites' other fixes" leaves (below).

**What leaves POSITIONS, and where it goes.**
- "How the checker represents it is not his choice.": a default that an agent landed, never answered (rule 2). At 16:57:37 on 09-21 he asked what decision two, which he had not understood, asked of him. The coordinator's 16:58:52.471Z answered that it was a choice inside the checker's code, how to represent an unknown size while solving: a new syntax-tree node, which regenerates generated code, or an existing node with a reserved name. It was his only if he cared about that regenerated diff; otherwise it was the coordinator's. He did not reply. The checker rung built the node (`compile-ladder/rung-nat-checker/REPORT.md`, decision 1: "Pavol left this to the rung"). So the sentence is spent. No item holds it, so it goes as **drafted item Q-?3**, routine, needed by never.
- "The other unused sizes of the 25 go only by a diff shown to him.": a default that an agent landed, still waiting for his review (rule 2). It is the array review's default, "E3 as the library edit shown to Pavol as a six-line diff" (`reviews/array-design-review.md`, decision E). That was option 3 of the 09-21 question, and he did not take it: he took the middle option, which leaves the dead sizes in place. The coordinator's ask 3 of 10-20 then told him "Your decision on record says these unused sizes go only by a diff shown to you"; that was the record's reading, not his word (`judgement-c2.md`, "P-40"). **Review-queue item 36** holds it: "the other 8 dead sizes ... not built", each put to him as a diff with the switch-over's design. No new item. Its default protects his say, so nothing is lost while he has not answered.
- "and is built, with the array sites' other fixes": a status (rule 9). It goes to the history: climb batch 20's rung A built decision E's diff (`e487cec2d`; F-264).

**History line.** Four changes, with the sources above. The sources the blocks lack: each answer above with the text that it answered, and 18:32:48.384Z for the title.

**Questions for him.** None for the entry. Item 36 holds the other dead sizes, and Q-?3 the representation.

**Size.** 1,129 characters before, 1,046 after (`record.py check`). It stays over 600. Each sentence is a separate rule of his that a worker on sizes must keep, and record.md's question 1 keeps each.

**Pointers elsewhere.**
- `FACTS.md`, F-35: "They check clean, and they go only by a diff shown to the curator; the 17 vector and matrix operators' dead sizes went by decision E's diff (P-40; F-264)." The pointer still holds for decision E's diff. But "they go only by a diff shown to the curator" now rests on item 36's default, not on P-40, and a FACTS entry states it as a fact. It could read "(review-queue item 36)" for that clause.
- `FACTS.md`, F-67 (`:60`), F-69 (`:62`), F-140 (`:155`) and F-264 (`:190`): need nothing. F-140's "Open: walk's arrays at a size from 2^31 (row 527)" agrees with the new text.
- `PLAN.md:128` (item 12) and `:165` (fork 3, "it reads P-40 anew"): need nothing.
- `review-queue.md:265`, item 30's home, "P-40, "Sizes."": the title of 09-30, stale before this proposal; it could read "P-40, "Sizes are checked ..."". `:297` and `:301`, item 36: need nothing; its home's words still open the title.
- `review-queue.md`, item 99 (not found by the number: it does not name P-40): row 527, "Needed by: never; no PLAN item names row 527". P-40's decision asks that storage refuse a length over 2^31-1, which is the ledger row's fix. The item could name P-40 in its home (`review-queue-items-c2.md`).
- `reviews/open-asks-2026-10-16.md:240` and `:252`: need nothing. `:261`, "P-40: they go only by a diff shown to him with the switch-over's design": it names a sentence that leaves. The file is a dated review, so it is history and needs nothing. Item 36 holds the point.
- `.claude/skills/fortress-repo/references/sources.md:760`: needs nothing.

## History lines the tool cannot write

The tool has no route for these lines. An entry line equal to the entry is skipped, and a call that changes nothing is refused (the c3 writer's probe, `corrections-c3.md`, "History lines the tool cannot write"). The lines are in the history's provenance form, ready for a provenance-only block once the tool has one. Each gives his message's time and a fair rewording. A quote appears only where a short answer is itself the decision (rule 10).

**P-37**
- 2026-09-20T14:33:50.777Z · his words: "we need to unify this. into single library" · answering the coordinator's 2026-09-20T14:28:17 text ("Which library": one library serving both worlds, which needs the tower errors classified first; no default).
- 2026-09-20T14:39:06.836Z · he approves a stable worker to review the library's unification, and holds the compiler's second library to be a bootstrap to remove · answering the coordinator's 2026-09-20T14:34:56.912Z (his leans recorded, to confirm: one library, not two).
- 2026-09-21T02:40:19.981Z · his words: "You decoded it correctly. Disregard it as sparse message. Don't revert!??" · answering the coordinator's 2026-09-21T02:36:16.321Z ("That decision is made": no declaration into the prelude, the code-generator rungs go on, the three files deleted at the switch-over with their tests kept, and the checker's way to the library a plan shown to him), after his own fix of his autocorrected question at 02:37:02.090Z and the coordinator's revert at 02:37:36.943Z.
- 2026-09-24T01:02:52.634Z · his words: "Only which file survives." · answering the coordinator's 2026-09-24T00:47:26.776Z, which restated question 3 of 00:14:12.114Z (does one library forbid the prelude's tower shape, or settle only which files survive?); at 01:20:29.306Z he called the brief's reading of it correct.
- 2026-09-29T12:17:07.180Z · he restates it: keeping a compiler library and an interpreter library is wrong, and Fortress must use one library.

**A defect common to the chunk's history.** The blocks of chunk P1 (2026-10-13 19:07Z) for P-27 to P-33 name `bc8902f47` as their commit, or `cba1664bb` for P-30. Those are the commits that wrote the earlier texts. The rewrite is `b87a17de5` (2026-10-13T19:07:21Z, "POSITIONS: chunk P1 consolidated, P-7 to P-33 and P-95 to P-98"; `git show -s`). The blocks of chunk P2 (18:16Z) for P-37 to P-40 name `bc8902f47` as well, and their rewrite is `55f1a1352`. The history only grows, so the old blocks stay. For P-37 a provenance-only block would say so. For the nine entries that this proposal rewrites, the new block follows the wrong one, and the fact is noted here.

## What record.py wrote

**How it ran.** The scratch root `fix-c2/root/` holds copies of the four record files from `explorations/coordinator/`: `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `FACTS-history.md`. Every other path in it is a symbolic link into the real tree, so that the `from` paths resolve. The tool was the real `explorations/coordinator/tools/record.py`. It ran with `--root` on the copy, with `GIT_DIR` set to the real repository, read only, so that `check --base` can read the base. The base is HEAD at the run, `25f48b11e`. The four record files there are the same as in the working tree (`git status`, `git diff e5b63d56c HEAD` on them: empty). The commands, run from the scratch folder:

    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py apply /home/user/fortress/explorations/coordinator/positions-audit/full/evidence/corrections-c2.apply --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root

**check before the apply** (`fix-c2/check-before.txt`), exit 0:

    reported, not failing:
      POSITIONS.md: size: 18 entries over 600 characters: P-40 1129, P-43 662, P-45 1678, P-46 887, P-48 724, P-51 696, P-60 805, P-146 727, P-147 669, P-148 632, P-149 812, P-151 1095, P-152 1303, P-154 948, P-155 831, P-79 836, P-153 986, P-85 653
    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

(The FACTS size list, 85 entries, is left out here and below; it is the same before and after.)

**apply** (`fix-c2/apply-out.txt`), exit 0:

    P-27: rewritten
    P-28: rewritten
    P-29: rewritten
    P-30: rewritten
    P-32: rewritten
    P-33: rewritten
    P-38: rewritten
    P-39: rewritten
    P-40: rewritten

**check after the apply** (`fix-c2/check-after.txt`), exit 0:

    reported, not failing:
      POSITIONS.md: size: 19 entries over 600 characters: P-27 683, P-40 1046, P-43 662, P-45 1678, P-46 887, P-48 724, P-51 696, P-60 805, P-146 727, P-147 669, P-148 632, P-149 812, P-151 1095, P-152 1303, P-154 948, P-155 831, P-79 836, P-153 986, P-85 653
    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

What changed, against the run before the apply:
- POSITIONS still has 83 entries: nothing is struck whole.
- One more entry is over 600 characters: P-27, 452 to 683. P-40 is shorter, 1,129 to 1,046. The question that keeps each extra sentence:
  - P-27: would a worker who extends the library do otherwise without the new first sentence? Yes. The old one sent every form that the model invented into the library, which he said contradicts his position (record.md, question 1).
  - P-40: each sentence is a separate rule of his that a worker on sizes must keep (question 1); the storage clause's "not built yet" keeps a reader from taking the refusal for built (question 2).
- The other sizes, before and after: P-28 303 to 376, P-29 468 to 401, P-30 337 to 292, P-32 216 to 287, P-33 582 to 448, P-37 561 (unchanged), P-38 592 to 597, P-39 271 to 342.
- No refusal, and no pointer words refreshed. No title that another entry quotes changed: P-27's title is unchanged, and no entry quotes the other titles.
- No cited section failed to resolve: the new citation in P-29, `explorations/microgpt-port.md`, "Step-0 results", resolves (`facts-extract.sh 'doc:explorations/microgpt-port.md#Step-0 results'`, lines 174 to 202).
- FACTS is unchanged (`fix-c2/FACTS.diff` is empty), and `FACTS-history.md` is byte for byte the same (`cmp`).
- After this file was finished, the apply file was run again on a fresh copy (`fix-c2/root2/`), so that its `from` headings are checked against this file's final form. It gave the same `POSITIONS.md` (`cmp`), the same history but for the time, and the same `check` output, exit 0 (`fix-c2/apply-out2.txt`, `fix-c2/check-after2.txt`).

**POSITIONS.md.** Nine lines rewritten, each as in its "After"; P-37 unchanged (`fix-c2/POSITIONS.diff`). The blocks that the tool appended to `POSITIONS-history.md` are below, verbatim, from `fix-c2/POSITIONS-history.diff`. The time is the copy's clock, and a real apply would stamp its own and name its own `by`.

```
### P-27

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-27" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-27" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: the first sentence reworded from his later word, since he said the record's citations of him contradict his position. It read "What microGPT invented goes into the standard library, in the library's own style.", his words of 2026-09-19T18:31:44.057Z alone (all the extensions that microGPT invented go directly to the standard library, in its spirit), which answered the coordinator's 18:22:49.203Z (the load check exists only where a trait says excludes; the correction belongs in the library, not in C4). At 2026-09-20T07:20:24.519Z, answering the coordinator's 06:42:33.439Z summary that his ruling sends every invented extension into the library, he set a condition: no forms specific to C4's use case; an extension with a precedent in the library itself is fine, a pattern of the natural numbers or integers extended to floats being exactly what he is after; he wants to know what moved and to judge each one. At 2026-10-09T05:20:34.111Z, in a page comment on the skill bullet that the sentence had become (the fortress-repo skill's references/library.md, "Designing a change"), he wrote that the citations of him still contradict his position: at most an obvious missing extension, a form that a lower-rank Array or Matrix has and a higher one lacks, scalar addition on Matrix his example. It is put to him to confirm; review-queue item 50 holds the skill's bullet and its revision (process-engineering/library-extension-rule-archaeology.md, sections 5 and 7). The rest kept. Its sources: 2026-09-19T18:31:44.057Z, as above: study the library's existing parts meticulously and use their patterns, the native way; exclusion is a practice all over the library; 2026-09-19T18:13:00.524Z, his refusal of the user-side planeSum rename as not Fortress, and the coordinator's 18:32:33.957Z, which told him that by his decision no fix is designed from a reading of the specification alone or from a user-side workaround, with no objection of his; 2026-09-24T18:37:13.721Z, his "record that", answering the coordinator's 18:31:40.955Z (it had skipped the step of checking the library's own way), on his question of 18:30:37.463Z why he had to invent the diagonal's override himself.

- P-27 **The library's own practice is the standard.** What microGPT invented goes into the standard library, in the library's own style. Whoever extends the library first studies how it does the same kind of thing, and follows that pattern; exclusion, for one, is all over it. He had to find the diagonal's override himself (P-88) because that study was skipped. No fix is designed from the specification alone or from a workaround on the user's side.

### P-28

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-28" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-28" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: the premise corrected: "Next is the algebraic layer" read as the next work, but PLAN parks it, under "Off the path, parked" (written at 6c32529e5), on the coordinator's 2026-10-16T12:49:17.721Z proposal to park his two matrix ideas with that algebra work, off the path to microGPT compiled; his answer at 13:01:50.455Z, "Park both with the algebra work.", takes the algebra work as parked. "Next" was his order of 2026-09-15, first the RR64 and AdditiveGroup fix, then the higher dimension, and the fix is built (d846e3644). The rest kept. Its sources: 2026-09-15T10:42:06.544Z, answering the coordinator's 09:51:20.618Z ("The words"; "Ring, Field, and which specification"): fleshing out the standard library is one very important task; first the RR64 fix, then the higher dimension, so that the matrices and tensors of machine learning get the mathematical rigour that the library's construction promises; 2026-09-15T21:14:56.200Z, his "2. Later", answering item 2 of the coordinator's 11:02:11.020Z (the sealed Library/, or a tree of the revival's own); the standard library itself, by his later words: 2026-09-16T22:43:26.489Z (the next phase unseals the library and modifies the original repository), 2026-09-19T18:31:44.057Z (P-27; the coordinator's 18:32:33.957Z took it to close the question of 09-15) and 2026-09-20T14:39:06.836Z (the compiler's second library is a bootstrap to remove).

- P-28 **Fleshing out the standard library is a very important task.** Next is the algebraic layer: `Ring`, `Field` and what the matrices and tensors of machine learning need, so that the library's traits reach them. It goes into the standard library itself (P-27), not into a tree of the revival's own.

### P-29

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-29" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-29" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: three changes. "Walk is hundreds of times slower than Python's interpreter." keeps his reason in words with a pointer, since "hundreds" rests on one measurement: the port's projection of 2026-08-23, roughly 170 times CPython for the Karpathy configuration, from timed pieces, which he called established at 2026-08-24T05:53:08.591Z. "So no performance decision of any kind ... until microGPT runs compiled" is reworded to his words: the coordinator's 2026-09-19T16:43:26.371Z wrote it, wider than his message, and he made a performance decision the same evening, at 18:32:48.384Z, unboxed double arrays, with no question about it. "it compiles them and records the phase that each reaches" and "A run of them, once possible, goes to a stage that does not gate." leave for the review queue as a drafted item: the compile-only stage is decision 6 of the coordinator's six process decisions of 14:53:40.072Z, to which he wrote "I am not reading this, but go." at 14:54:15.024Z; at 16:39:48.865Z he quoted decision 6 and said that he did not understand its idea, since the two programs did not yet compile, and that they are too long running to be tests; the coordinator's 16:39:58.548Z answered that the stage only compiles them, and that once they run, the run belongs to a separate stage that does not gate; he did not answer. F-97 holds the stage as built. The rest kept. Its sources: 2026-09-19T16:43:19.420Z, answering item 4 of the coordinator's 16:26:24.607Z results text (the tuples slow C4 down; editing C4 the coordinator's default, which it withdrew at 16:43:26.371Z): he does not care how slow the interpreter is, since performance is discussed once the compiler runs; walk, hundreds of times slower than Python's interpreter, is irrelevant to any performance discussion, and nothing about Fortress's performance can be judged while there is no compiler; 2026-09-19T16:39:48.865Z, as above.

- P-29 **Walk's speed is irrelevant to every judgement of Fortress's performance.** Walk is hundreds of times slower than Python's interpreter. So no performance decision of any kind, and no edit of C4, the flat model program, for speed, until microGPT runs compiled. The gate never runs the two microGPT programs, too long-running to be tests: it compiles them and records the phase that each reaches. A run of them, once possible, goes to a stage that does not gate.

### P-30

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-30" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-30" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: "The full check programs run only when asked." leaves for the review queue as a drafted item: it is the coordinator's wording, in its worker brief of 2026-10-08T17:49:42.994Z (the full 40-check programs stay, for when someone asks for them) and its reply of 17:49:58.927Z (mg-run.sh runs the quick pair by default and the full programs only when asked); he answered neither, though it keeps his "Not a full training that takes ages." of 16:20:06.948Z. The rest kept. Its sources: 2026-10-08T17:49:22.269Z, answering the coordinator's 17:47:57.097Z (about 30 forward-and-backward passes per program), on his question of 17:47:43.413Z how many iterations run: he would run two forward-and-backward passes, to check that the math works and that the library's changes, such as the arrays, do not break it; "it needs to run under a minute, okay? That's the goal.", or it is a useless waste of time; 2026-10-08T16:20:06.948Z, his "Yes, but only if they run few iterations. Not a full training that takes ages. Adjust if needed.", answering the coordinator's 16:09:48.942Z offer to run the two checks once on the current tree.

- P-30 **The microGPT walk check after a batch runs in under a minute.** It runs about two forward-and-backward passes against the reference values, which shows that the model's mathematics still works and that the library's changes did not break it. The full check programs run only when asked. A slower check is to him a waste of time.

### P-32

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-32" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-32" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: the purpose sentence reworded to his scope. It read "It exists so that nothing on record is found again from scratch.", which bc8902f47 took over from a separate entry on his 2026-09-24T06:44:33.963Z, answering the coordinator's 06:39:41.052Z (the index searched, not read, at boot): the maps of the repository were built for a reason, he does not want them skipped and rederived, and up-to-date maps are an investment. His maps are the record's, not coordinator/map/ alone: at 2026-09-27T05:57:11.388Z, on FACTS and the index, the investment in up-to-date maps is so that nothing needs rediscovering each time; at 2026-09-21T01:14:56.336Z he asked why the map was not used to read context on demand, and whether it was out of date again; at 2026-09-30T05:24:08.253Z he gave his stated position, no searching with a flashlight in a dark room, but a map of the territory. How the maps are read is the coordinator skill's (SKILL.md, "The boot"). The title kept. Its sources: 2026-09-16T22:43:26.489Z, his request for a thorough map of the territory before the library is unsealed, which the coordinator's 22:44:25.808Z reflected back; 22:46:21.111Z, his "word" to it; 22:57:42.006Z, after the coordinator's launch notice of 22:47:41.773Z: parts of the design intent are written in the papers, not in the specification, so the map includes them, so that we know where to look up the design intent. The block of 2026-10-13 19:07Z names map/README.md, section 3, as its source, which holds none of these sentences.

- P-32 **The territory map (`coordinator/map/`) maps the tree down to where the design intent is written, in the papers as well as the specification.** It exists so that nothing on record is found again from scratch.

### P-33

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-33" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-33" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: three changes. "six phases" corrected: PLAN has phase 2b, the repair batch from the conformance reviews, added at d5b5fa786 after his 2026-09-27T06:13:29.788Z that the reviews of batches 5 and 6 would possibly yield other batches that go in before phase three; it is built. "approved with their workers" struck as a one-time approval, carried out: the four Opus workers W1 to W4 ran on 2026-09-26, and 892687076 already dropped their names under his rule of 2026-09-27T02:26:42.155Z that a one-off go needs no place in the permanent record. "Phases 1 and 2 are landed: ..." goes to this history, and the phases left become one line: phase 1 was built by climb batch 5's rungs Z and S and its follow-up rung D (ab914b6e0); phase 2 by climb batch 6, its rung R (7278e11f7) and its follow-up 6b, rung O (917bb7b32); phase 2b by climb batches 6.5 (d9c62446e) and 6.5b (e3214cbf1) (PLAN, "The phases"). The rest kept. Its sources: 2026-09-26T09:04:41.396Z, his "Yes, this order and workers are go.", answering the coordinator's 08:40:51.388Z (the six phases; the unanswered re-approval rows off the path, except row 41, which becomes part of the switch-over's design; the ask: yes to this order, and to starting four Opus workers now), after his request of 08:20:06.663Z to put all open issues into the best order to reach the running compiler.

- P-33 **The plan (`coordinator/PLAN.md`) has six phases, approved with their workers.** Phases 1 and 2 are landed: the wrapping operators, the revised specification, the run-time sizes, the flat number tower and the overflow natives. 3 is the checker at a true zero; 4, the switch-over, natives then names; 5, microGPT compiles: its static types, the array design and the code generator's holes; 6, microGPT fast. Where the work stands: PLAN's "Where we stand". Re-approval row 41 (ledger row 320: a component named apart from its api does not link) joins the switch-over's design.

### P-38

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-38" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-38" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: the title reworded, since it made a standing rule out of five answers, each given for one row: it read "The compiler prelude's defects are not repaired: they go with it at the switch-over.", written at 55f1a1352, and no message of his says so. The record repaired prelude defects at his decisions after the one-library decision: 6bec1b004 (2026-09-23, row 321) and ce0c7f453 (2026-09-24, his integer rules of 2026-09-22 on the compiled path). What he approved is that each of these five stays as it is, at no cost now, because the prelude goes; the wider rule is the coordinator's plan (PLAN, phase 4). It is put to him to confirm. The rest kept. Its sources: 2026-09-21T21:20:29.106Z, answering option 1 of the coordinator's 21:08:15.030Z (rung M approved as landed, its tests kept, its lines gone at the switch-over): keep the team's parametric spelling of Maybe's empty case, the future work gated on where clauses; 2026-09-24T13:49:02.932Z, his "Row 30 approve as landed.", answering the coordinator's 09:38:47.121Z (the REM guard approved as landed, dying with the prelude, its test carrying the check to the switch-over rung); 09:33:32.071Z, his "yes", answering the coordinator's 09:30:15.820Z (row 380 widened; row 381 closes by itself when the compiled path reads this library); 09:36:51.997Z, his "yes, close at the switch-over.", answering the coordinator's 09:34:07.043Z (row 383: no new declaration in the prelude; the test promoted then; shift a reserved name; the switch-over batch measures the compiler tests that bind it); 2026-09-26T07:48:29.318Z, answering item 1 of the coordinator's 07:43:57.296Z (the code that relies on wrapping): the note from O is solid, he sees no credible alternative, and it goes on the record; the respelling of row 348 is the note's section 10 (reviews/wrap-dependent-code.md).

- P-38 **The compiler prelude's defects are not repaired: they go with it at the switch-over.** Its `Maybe` block and its `REM` guard `if other = -1 then 0` stay as landed until the prelude is deleted, and their tests stay. Then the compiled tests respell its reversed wrapping and saturating operators (row 348), `ZZ64`'s compiled shift closes (row 381), and the specification's `shift` reaches the compiled path (row 383). `XXXShiftDeclRungI` is then promoted, and the switch-over batch finds the compiler tests that bind `shift`, a reserved name from then on. Still to build: PLAN phase 4.

### P-39

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-39" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-39" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: the premise corrected: "never turns the gate red" holds for the count's total only; the stage's comparison is red on a crash line that no rung declared, a stale shadow or a table with no total (F-66; checker_compare in coordinator/climb-batch-workflow.js). "The gate reports the count stage on its own.", 55f1a1352's rewrite of bc8902f47's "reported and never red on its own", had lost that sense, which comes back. The rest kept. Its source: 2026-09-26T12:24:01.196Z, his "Agreed, option 1", answering "Answer 11" of the coordinator's 12:21:03.045Z (keep the count, report-only, and add the full measurement at phase boundaries; when phase 3 starts, its whole job is driving that number down, so the full measurement becomes a report-only stage in those batches' gates); his "Option 1, agreed." at 12:01:24.267Z answers answer 8, not this one.

- P-39 **The checker count is measured in every gate and never turns the gate red.** The gate reports the count stage on its own. The distance to the switch-over (F-53), over all apis and components, is a report-only stage of the phase-3 gates, whose work drives it down.

### P-40

2026-10-22 02:07Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c2.md`, "P-40" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c2.md`, "P-40" · by the POSITIONS audit's writer for chunk c2 (Opus), proposed for his review: four changes. "Storage refuses a JVM array length over 2^31-1." corrected: it is his yes, but not built; under walk an array of a static size from 2^31 dies with a raw NegativeArraySizeException (row 527; F-140, "Open"; review-queue item 99), and the compiled array design, where the coordinator's 2026-09-27T06:38:29.847Z placed the refusal, is PLAN phase 5. "How the checker represents it is not his choice." leaves for the review queue as a drafted item: at 2026-09-21T16:57:37.256Z he asked what decision two asked of him; the coordinator's 16:58:52.471Z answered that it was a choice inside the checker's code, a new syntax-tree node or an existing node with a reserved name, his only if he cared about the regenerated diff, otherwise the coordinator's; he did not reply, and the checker rung built the node (compile-ladder/rung-nat-checker/REPORT.md, decision 1). "The other unused sizes of the 25 go only by a diff shown to him." leaves for review-queue item 36, which holds it: the array review's default (reviews/array-design-review.md, decision E), option 3 of the question of 2026-09-21, which he did not take, and which the coordinator's ask 3 of 2026-10-20T05:06:36.884Z gave him as his decision on record. "and is built, with the array sites' other fixes" goes to this history: climb batch 20's rung A built decision E's diff (e487cec2d; F-264). The rest kept. Its sources: 2026-09-19T18:32:48.384Z, after the coordinator's 18:32:33.957Z: the nat sizes cannot be sidestepped, a central design point of the team's arrays; 2026-09-21T16:57:37.256Z, answering "Lesson two" of the coordinator's 03:09:13.588Z: the middle option of decision one, an unknown size an error only when it reaches a type, a name or a value, is the clear winner; 2026-09-26T09:24:48.043Z, his "Option 1, sizes count", answering "Batch-5 answer 2" of 09:20:38.889Z (every static argument but an operator counts in the exclusion rule; booleans once the checker supports boolean parameters); 2026-09-26T12:20:23.332Z, his "Agreed, decision 3 stands", answering "Answer 12" of 12:17:56.921Z (a size that a call cannot fix refuses the call, extended to overload sets; row 400); 2026-09-27T06:44:55.156Z, his emphatic yes to the line "Recommended: follow the spec", answering the coordinator's 06:38:29.847Z (a size is an NN32 value and anything larger is refused; the array design refuses a JVM array length over 2^31-1 where it creates one), on his question of 06:38:06.255Z whether 32 bits is the JVM's largest index size, about item 3 of 06:29:24.257Z; 2026-09-28T19:17:29.239Z, his "Option 1, go ahead.", answering the coordinator's 19:13:35.474Z, on its question of 19:08:35.914Z (a size used as a value converts to ZZ32 as a numeral does); 2026-10-20T05:42:24.706Z, after he read e3-rebased.patch at 05:32:27.765Z: he agrees with the recommendation, and the patch made sense to him, answering ask 3 of 05:06:36.884Z as restated at 05:38:40.474Z.

- P-40 **Sizes are checked, and a size left unknown is an error only where it is used.** The checker checks `nat` and `int` static parameters and refuses a size beyond `NN32` or `ZZ32` (F-140). Storage refuses a JVM array length over 2^31-1. A size that inference leaves unknown is an error only when it reaches a type, a name or a value. How the checker represents it is not his choice. A size that a call cannot fix refuses the call, also inside an overload set, instead of dropping the arm (row 400, its compiled half open). Every static argument but an operator counts in the exclusion rule; booleans join once the checker has boolean parameters (row 406). A size used as a value converts to `ZZ32` as a numeral does (row 485). The unused sizes of the api's 17 vector and matrix operators go by decision E's diff, which he read and took for the switch-over (ask 3, 2026-10-20; `perf-probes/array-sites/e3-rebased.patch`): it finishes the team's own fix of 2008, which took them out of the component only (F-35), and is built, with the array sites' other fixes. The other unused sizes of the 25 go only by a diff shown to him.
```

**What check does not see.** It checks pointers only inside FACTS and POSITIONS, and only for a live target and its quoted words. The lines elsewhere that this proposal makes stale, or that were stale before it, pass. Each entry's "Pointers elsewhere" lists them. The ones that this proposal makes stale:
- `.claude/skills/fortress-repo/references/library.md:30` (P-27's old breadth; review-queue item 50);
- `FACTS.md`, F-35's "they go only by a diff shown to the curator" (P-40's last sentence, now item 36's);
- `PLAN.md:86`'s wider rule for the prelude's defects (P-38, question 1);
- review-queue items 36, 50 and 99 (`review-queue-items-c2.md`).

## The rules, where they fit badly

- **Rule 0 against rule 6, on P-27's diagonal sentence.** The judgement calls "He had to find the diagonal's override himself (P-88) because that study was skipped." a remark, which rule 6 strikes, and record.md's question 3 would move it to the history as how the rule came about. But it is true, it went on record at his own "record that" (2026-09-24T18:37:13.721Z), and it shows a worker what skipping the study costs. His page comments of 23:21 and 23:29 ask that a correct text stay. I kept it word for word.
- **Rule 12 and rule 4 together, on P-27's first sentence.** Rule 12 has his later word update the entry, and rule 4 asks for a rewording from his intent, or a question where none follows. A wording follows from his two later messages, so I wrote it. It is still a reading of two dictated messages, and the Opus re-reading that says the same has not had his yes. So it also goes to him (P-27, question 1). Rule 12's "even where it went into a skill" reaches `references/library.md:30`. The brief says to edit nothing but the files it names, so the skill's line is listed, with item 50 as its home.
- **Rule 11 against rule 0, on P-29's "hundreds of times".** The words are his own reason. They are not exactly his number, 170 times, and that number is one projection of 2026-08-23. Rule 11 sends the number to its report and keeps the reason in words with a pointer, so the sentence reads "far slower". If he prefers his own phrase, it is a fair rounding of his own figure, and only the pointer need be added.
- **Rule 2 and P-29's two gate sentences.** One is landed (the compile-only stage) and one is not built (the non-gating run). Rule 2 speaks of a landed default. The unbuilt one is the coordinator's design from the same answer of 16:39:58 on 09-19, so it goes into the same drafted item, Q-?1, and not to a question of its own.
- **Rule 2 and P-30's "The full check programs run only when asked."** It is in keeping with his words, and the skill holds it as built. It is still the coordinator's wording, never put to him, so rule 2 takes it out, to Q-?2. The entry loses nothing that a worker needs: the skill gives the command and when to add `full`.
- **Rule 3 against rule 0, on P-32's title.** The judgement calls the title a one-time request, carried out, which rule 3 strikes. But the title is his request and true today, and the entry's purpose sentence needs its subject. Without the title, the entry would have to be retitled around the purpose, a larger change than rule 0 allows. I kept it.
- **Rule 9 on P-33.** Rule 9 sends a list of what is built to the history and keeps what is still to build as one short line. The phases still to build are the decision itself, so the "Still to build" line is the four phases, in his order. Its PLAN item is the plan itself.
- **Rule 4 on P-38's title.** The judgement found the title a summary that changed the meaning. The new title says what he approved, five items left as they are. Whether he wants the wider rule is a choice that his words do not make, so it goes to him as question 1, beside the rewording.
- **Rule 8 and rule 9 together, on P-40's storage sentence.** The premise was false (stated as built). Rule 8 corrects it. Since the decision is his and still to build, rule 9 keeps it as a short clause with its PLAN phase. The walk side is row 527, whose queue item 99 says "never". That item and his decision disagree on when, which the coordinator should see (`review-queue-items-c2.md`, item 99).
- **Rule 2 and rule 6 on P-40's "not his choice".** It is an agent's default (rule 2), and it is spent, since the checker is built (rule 6's state of one day). Rule 2 asks for a drafted item, so Q-?3 is drafted, with "Needed by: never". The coordinator may file it at once as information only.
- **Rule 10 and the history.** I quoted his words only where a short answer is the decision: "record that", "2. Later", "Park both with the algebra work.", "I am not reading this, but go.", "Yes, but only if they run few iterations. ...", "it needs to run under a minute, okay? That's the goal.", "word", "Yes, this order and workers are go.", "Row 30 approve as landed.", "yes", "yes, close at the switch-over.", "Agreed, option 1", "Option 1, sizes count", "Agreed, decision 3 stands", "Option 1, go ahead.", "You decoded it correctly. ...", "Only which file survives." and "we need to unify this. into single library". His longer messages are reworded. His answer of 06:44:55 on 09-27 is given as "his emphatic yes", not quoted.
- **The brief's "edit none" and the tool.** No change in this chunk needs another entry's pointer rewritten, so the apply touches only the chunk's own lines.
