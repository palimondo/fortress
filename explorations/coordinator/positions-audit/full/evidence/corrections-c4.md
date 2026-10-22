<!-- The POSITIONS audit's full run, chunk c4 (P-51, P-52, P-53, P-54, P-56, P-57, P-58, P-59, P-60, P-62): the corrected record proposed by the writer's brief (positions-audit/full/evidence/briefs/writer.md, rules 0 to 12), entry by entry, with each new sentence's source, what leaves POSITIONS and where it goes, the history lines, the questions for the curator and the pointers elsewhere; record.py run on a scratch copy only; nothing applied. -->

# Chunk c4 corrected: a proposal

Writer: one Opus session. Sources: `judgement-c4.md`; the ten scout reports in this folder (`P-51.md` to `P-62.md`); and the sources named below, read where the text turned on them: the coordinator's text of 2026-10-10T00:17:43.858Z (the transcript `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl.parts/000.jsonl:10115`), the library (`Library/Avl.fss`, `PureList.fss`, `List.fss`, `RangeInternals.fss`, `FortressLibrary.fss:118-151`), `reviews/argument-context-probe.md`, `reviews/comprises-type-level-proof-addendum.md:14-21`, `reviews/decisions-review/judgement.md:354-360`, `CLIMB-BATCH-12.md` (Q49), `compile-ladder/rung-tuple-orders/SKEPTIC.md:142` and `:245`, `compile-ladder/climb-batch-13/RECORD.md:209`, PLAN, PLAN-history, the review queue and the gap ledger's row 404. Nothing in the real record changed.

- The apply file is `corrections-c4.apply`, beside this file. `record.py` ran it on a copy of the record, in the scratch folder `positions-audit/full/fix-c4/root/`, with `--root`.
- `rewritten-c4.txt` holds the ten entries as each would stand, the two kept ones included.
- `review-queue-items-c4.md` holds one drafted item, Q-?1, for P-57's sentence on `Unordered`.

All times are UTC. "Rule n" is the brief's rule n. No entry of this chunk has a comment of his on a page (each scout's section 7), and no scout found a later word of his on an entry's subject (each scout's section 4), so rule 12 changes nothing here.

## The verdicts

- **P-51**: rewritten. The probe's measurement leaves for its report, with a pointer (rule 11). The promoted tests, whose names are gone, and the batch and commit go to the history; "Built." stays (rule 9). His decision is unchanged.
- **P-52**: kept, word for word. Its source is listed for the history.
- **P-53**: rewritten, one clause. "Every other `left` and `right` of the library" is false: `Avl`'s are subtrees. It becomes the ranges' and the lists' (rule 8).
- **P-54**: rewritten, one word. "The peer methods" becomes "the peer languages": the question's peers were Python and Julia (rule 4). A note for the coordinator: PLAN's line for the float rung does not name `QQ`.
- **P-56**: rewritten. Probe P3's "64 small programs" leaves for the review's section 5, and the reason is put in his words, things made worse (rule 11). "Nothing in the tree calls them" gains its exception, the five tests that pin the `fail` (rule 8).
- **P-57**: rewritten. "`isLeftZero(Unordered)` is refused under walk" leaves for the review queue as drafted item Q-?1: an agent's landing, never put to him (rule 2). "Nothing calls `isLeftZero`" is struck: an observation, and false, since its pins call it (rules 6 and 8).
- **P-58**: rewritten, one sentence added. The consolidation dropped the very point that his "option 1" chose: each natives rung's bindings meet the checker as they land (rule 4).
- **P-59**: kept, word for word, and a question for him on the unmeasured premise "MicroGPT's static types are concrete, so both paths agree on it" (rule 5).
- **P-60**: rewritten. The last sentence leaves: its two defaults wait in review-queue items 58 and 15, and its walk half was false (rules 2, 8 and 9). The proof's scope gains its condition, calls that need no coercion. "PLAN item 26" becomes "item 26".
- **P-62**: rewritten. "The ledger's worklist item 12" is gone from the ledger (rule 8). "Come back" becomes a rung that tries to bring them back, as he said it (rule 4).

## P-51

**Before.**

> - P-51 **A call written as another call's argument is retried against each declaration's parameter type (item 48 (b), row 455).** When the checker's attempts at a call keep none, an argument that is a call with inferred static arguments is checked again, with each candidate's parameter type as its expected type. The trigger is wide: any inferred static argument, not only a result-only type parameter. Why: it makes the inference rules one rule everywhere, past the cases the team built. Its probe moves no error of the distance. Its rung promotes the expected failures `XXXInferContextDrops` and `XXXInferLoneUnionClosedTrait`, whose refusals it repairs. Built by climb batch 14 (`0856f3e6a`).

**After.**

> - P-51 **A call written as another call's argument is retried against each declaration's parameter type (item 48 (b), row 455).** When the checker's attempts at a call keep none, an argument that is a call with inferred static arguments is checked again, with each candidate's parameter type as its expected type. The trigger is wide: any inferred static argument, not only a result-only type parameter. Why: it makes the inference rules one rule everywhere, past the cases the team built. Its probe's measurement is in `reviews/argument-context-probe.md`. Built.

**Each sentence and its source.**
1. The title, the retry and the wide trigger: unchanged (rule 1). At 2026-10-09T22:10:09.585Z he wrote "Q48(b) wide, go ahead". It answered the coordinator's 15:13:34.608Z, "Still open for you, no rush: - Q48(b), wide or narrow (recommended wide)". The two options are item 3 of the coordinator's 11:56:38.064Z list: wide is any inferred call, narrow only a type parameter that appears just in the result. The entry's trigger is the list's "wide" (`judgement-c4.md`, "P-51").
2. "Why: ...": unchanged (rule 1). It is a fair rewording of his own reading, 2026-10-09T06:55:25.847Z: the change unifies the inference rules everywhere and covers cases that the team did not build. The same message said yes in principle and asked for a measurement first. The entry drops his condition that the mechanism be specified and the way known; the probe met it before his go, so the loss does not change the meaning (judgement).
3. "Its probe's measurement is in `reviews/argument-context-probe.md`.": new, in place of "Its probe moves no error of the distance." That was a count from one measurement: the probe's distance stage, 207 to 207, on 2026-10-09 (`reviews/argument-context-probe.md`, "The answers", point 6). No later measurement compares with it. Rule 11 sends the number to its report and keeps a pointer. The pointer matters because he asked for the measurement before his go ("Can we do something about measuring before it comes back to me?", 06:55:25).
4. "Built.": the empty case of what is still to build (rule 9). Climb batch 14's rung A built it (`0856f3e6a`), and F-221 holds the built state and its gate (`compiler_tests/InferCallArgument*`).

**What leaves POSITIONS, and where it goes.**
- "Its probe moves no error of the distance.": to its report, `reviews/argument-context-probe.md`, "The answers", point 6, which the entry now names. It also goes to this history.
- "Its rung promotes the expected failures `XXXInferContextDrops` and `XXXInferLoneUnionClosedTrait`, whose refusals it repairs.": to the history (rule 9). It was true at `0856f3e6a`, but both `XXX` names are gone. `compiler_tests/` now holds `InferCallArgumentContext` and `InferLoneUnionClosedTrait`, and no `XXX` file of either. A reader who searched for the old names found only ledger row 535's stale cell.
- "by climb batch 14 (`0856f3e6a`)": to the history. It tells how the entry came about.

**History line.** The tool writes one block with the rewrite; "What record.py wrote" gives it whole. It puts back his two messages above, each with the coordinator's text that it answered. It also corrects two blocks and one time:
- the block of 2026-10-13 18:16Z names `4dc35f685`, the entry's first commit, for the consolidation's rewrite, which was `55f1a1352`;
- the block of 2026-10-14 06:10Z names `7c2c7cd4b` for a rewrite that was `c5210e202` ("POSITIONS: P-51, P-146 and P-147 built by climb batch 14").
- `4dc35f685`'s note dates his go "at about 21:57 UTC"; the transcript has 22:10:09Z (scout §1).

**Questions for him.** None.

**Pointers elsewhere.**
- `FACTS.md:80` and `:89` (F-221, "It builds P-51 under P-49"), `POSITIONS.md:48` (P-50, "P-51 is the other half of item 48"), `PLAN.md:389`, `:390`, `:392`, `review-queue.md:1211` and `.claude/skills/fortress-repo/references/sources.md:636` cite the retry, its definition or its build. They need nothing.
- `PLAN.md:401`: "now the plain `InferLoneUnionClosedTrait` ... as P-51 names (rung A, `0856f3e6a`)". P-51 named only the `XXX` name, and after this rewrite it names neither. The line would end "(rung A, `0856f3e6a`; P-51's history)". It was stale before this audit.
- `review-queue.md:1188` calls P-51's decision "(a batch 14 candidate)". It has been built since `0856f3e6a`, so the line would say "built `0856f3e6a`". It was stale before this audit.

## P-52

**Before and after.** Kept, word for word:

> - P-52 **A range of rank 2 or 3 checks containment corner by corner (item 50, row 657).** The bounds check behind `narrowToRange` compares the other range's bounds by the ranges' point-by-point order, `PCMP`, not by the tuple order, which serves sorting. So `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` raises `IndexOutOfBounds`.

**Why.** It is his yes to a question that the entry states fairly (rule 1). At 2026-10-09T07:13:27.273Z he wrote "Q50 (a) as recommended". The question is the coordinator's 07:09:23.365Z: "Q50: when a 2-D or 3-D range checks whether another range lies inside it, should it compare corner by corner instead of in dictionary order?", with (a) corner by corner and the recommendation (a). The example, `PCMP` and "Dictionary order serves sorting" are all in that question. The reply chain names the 07:11:13 turn, but that turn ends by saying that Q50 still waits (judgement; scout §1).
- The example is true at HEAD: the pin `ProjectFortress/tests/RangeKindBodies.fss:94` is the `shouldRaise` of that call (scout §2).
- `PCMP` is the team's (`5a68404fd`, 2012).
- "which serves sorting" is the coordinator's phrase in the question that he took. It neither narrows nor adds (rule 7).

**What leaves POSITIONS.** Nothing.

**History lines.** The tool cannot write these, since the entry does not change. They are listed under "History lines the tool cannot write".

**Questions for him.** None.

**Pointers elsewhere.** `FACTS.md:84` (F-91) and `review-queue.md:1189` need nothing.

## P-53

**Before.**

> - P-53 **`String`'s `left` and `right` answer `Just(c)` (item 42, row 606).** For a non-empty string they return `Just` of the first and of the last character, as their declared `Maybe[\Char\]` and every other `left` and `right` of the library do. So walk prints `Just` of the character, not the character.

**After.**

> - P-53 **`String`'s `left` and `right` answer `Just(c)` (item 42, row 606).** For a non-empty string they return `Just` of the first and of the last character, as their declared `Maybe[\Char\]` and the `left` and `right` of the library's ranges and lists do. So walk prints `Just` of the character, not the character.

**What changed, and its source.** One clause (rule 8). "Every other `left` and `right` of the library" is false as written:
- `Avl`'s `left` and `right` are subtrees: `getter left() : Avl[\K,V\]` (`Library/Avl.fss:93-94`, also `:199-200`, `:226-227`, `:253-254`).
- `PureList`'s finger-tree node declares `getter left():E` and `getter right():E` (`Library/PureList.fss:318-319`).
- The coordinator's question of 07:14:01.035Z named only "the ranges' (`:3914`) and `List`'s (`List.fss:119-120`)". Its "every other" was already wider than its own examples.

The new clause names the getters that hold: the ranges' (`Library/FortressLibrary.fss:3996-3997`, `RangeInternals.fss`) and the lists' (`List.fss:114-115`, `PureList.fss:49-50`, `:173-174`), all `Maybe` or its `Just` and `Nothing`. That is the reason the question gave. I grepped the library for every `left` and `right` getter.

**The rest, word for word (rule 1).** It is his yes. At 2026-10-09T07:18:49.726Z he wrote "agreed with the recommendation.". This was his next message after the coordinator's 07:14:01.035Z: "Item 42: should `String`'s `left` and `right` return `Just(c)`, as their declaration promises?" Its way 1 returned `Just(self.get(0))`, and its text said that walk's print changes from `a` to `Just(a)`. Its recommendation was "1, the library's own way." No message of his lies between 07:13:27 and 07:18:49 (judgement).

**What leaves POSITIONS.** Nothing.

**History line.** The tool writes one block; "What record.py wrote" gives it whole. It puts back his message and the question, and corrects the block of 2026-10-13 18:16Z, which names `1ea1efa3d` for the rewrite `55f1a1352`.

**Questions for him.** None.

**Pointers elsewhere.** `FACTS.md:83` (F-90, "`left` and `right` build P-53") and `review-queue.md:1186` (the title's opening words, unchanged) need nothing. `PLAN-history.md:256` is history.

## P-54

**Before.**

> - P-54 **`QQ`'s `ceiling` and `truncate` keep `ZZ` and raise at +∞, −∞ and 0/0 (item 44, row 635).** The declared integer result and the peer methods win over the specification's paragraph that returns the argument at an infinity, and that paragraph is revised. `floor`, `round` and the two brackets raise too. A rung after the switch-over makes `QQ` follow the float ruling (row 330): the methods keep the type, and the brackets, `round` and `truncate` give ℤ.

**After.**

> - P-54 **`QQ`'s `ceiling` and `truncate` keep `ZZ` and raise at +∞, −∞ and 0/0 (item 44, row 635).** The declared integer result and the peer languages win over the specification's paragraph that returns the argument at an infinity, and that paragraph is revised. `floor`, `round` and the two brackets raise too. A rung after the switch-over makes `QQ` follow the float ruling (row 330): the methods keep the type, and the brackets, `round` and `truncate` give ℤ.

**What changed, and its source.** One word (rule 4): "the peer methods" becomes "the peer languages".
- The question is the coordinator's 07:19:47.208Z, item 44. Its way 2 read: "Keep `ZZ` and raise an error at ±∞ and 0/0: follows the declaration and the peers." The peers there are other languages: "Python's `math.floor(inf)` raises, and Julia's `floor(Int, Inf)` throws".
- The first text (`35dc7b626`) said "the peers". The consolidation `55f1a1352` made it "the peer methods", which reads as the library's own methods. That changed the reason, in a small way (judgement).
- "Languages" is the word that the question's examples give. I did not name Python and Julia: the repository holds a Python run only (`compile-ladder/rung-library-slips/REPORT.md:86-96`), and no Julia run (scout §2).

**The rest, word for word.**
- The title and the first sentence's decision: his yes (rule 1). At 2026-10-09T07:28:28.361Z he wrote that `QQ`'s `ceiling` and `truncate` go per the recommendation: first make it pass, and later make it consistent with the float ruling. The recommendation was "2 now, which is small and matches the declared type and the peers. The float rung of row 330 can bring `QQ` into line with way 3 later".
- "`floor`, `round` and the two brackets raise too.": kept. The question did not name them, and the judgement calls the sentence the state of the project. But the library makes it follow from his decision: `floor` calls `truncate` and `ceiling`, the brackets call `floor` and `ceiling`, and `round` calls `floor` (`Library/FortressLibrary.fss:649-657`). Climb batch 12's rung S found that they reach the two bodies (`74b28e9d4`). By his test the sentence is actionable: it says what must keep working. See "The rules, where they fit badly", 3.
- The last sentence: his decision, in his own words ("then we'll later make it consistent with the ruling on float"). The float ruling is his of 2026-09-29T15:18:44.154Z, now P-68, and "after the switch-over" is where P-68's rung stands (PLAN's "After the names").

**What leaves POSITIONS.** Nothing.

**History line.** The tool writes one block; "What record.py wrote" gives it whole. It puts back his message and the question, and corrects the block of 2026-10-13 18:16Z, which names `35dc7b626` for the rewrite `55f1a1352`.

**Questions for him.** None.

**Pointers elsewhere.**
- `FACTS.md:83` (F-90, "the rounding P-54") and `review-queue.md:1186` need nothing. `review-queue.md:231` (item 25) names his ruling by its words, which are unchanged.
- `PLAN.md:90`, P-68's library rung after the names, names the float types and `RR32`'s four sites, but not `QQ`. Only P-54 and `PLAN-history.md:262` hold the `QQ` follow-up. So a worker who builds P-68's rung from PLAN would leave `QQ` out (judgement). The line would add: "and `QQ`'s `floor` and `ceiling` keep `QQ`, its brackets, `round` and `truncate` the unbounded ℤ (P-54)". This is the coordinator's to add. It is not a question for him, since his words settle it. It was stale before this audit. Once PLAN holds it, P-54's last sentence could name that PLAN line, by rule 9.

## P-56

**Before.**

> - P-56 **The open range `(:)` keeps its wildcard type, and its five cutting methods fail (item 49, row 656).** `TrivialOpenRange` stays `OpenRange[\Any\]`. A range over `ZZ32` is not a range over `Any`, so no body can type its `truncL`, `truncR`, `every`, `imposeStride` and `atMost`. They are `fail` bodies with a message, the team's own device for such a body. Nothing in the tree calls them on `(:)`. Way (c), `(:)` over `ZZ32`, is not taken: probe P3 found it changes 64 small programs' values.

**After.**

> - P-56 **The open range `(:)` keeps its wildcard type, and its five cutting methods fail (item 49, row 656).** `TrivialOpenRange` stays `OpenRange[\Any\]`. A range over `ZZ32` is not a range over `Any`, so no body can type its `truncL`, `truncR`, `every`, `imposeStride` and `atMost`. They are `fail` bodies with a message, the team's own device for such a body. Nothing in the tree calls them on `(:)` but the five tests that pin the `fail`. Way (c), `(:)` over `ZZ32`, is not taken: probe P3 found that it makes things worse, with more values lost than gained (`reviews/ranges-and-index-types.md`, section 5).

**What changed, and its source.**
1. "Nothing in the tree calls them on `(:)`" gains "but the five tests that pin the `fail`" (rule 8).
   - It was true when he confirmed it.
   - Since rung R (`abe8b0342`), the five tests `ProjectFortress/tests/TrivialOpenRange{TruncL,TruncR,Every,ImposeStride,AtMost}Stop` call them on purpose (`stopped = (:).truncL(3)`; scout §2).
   - No other file of the tree calls them on `(:)`. Elsewhere `(:)` appears in QuickCheck's `genRange`, which no test uses (`Library/QuickCheck.fss:490`, "XXX not tested"), and in two tests that call none of the five (`RangeDeclarations.fss:122`, `RangeNarrowKinds.fss:39`). No file writes `(:):` or `(:)#` (scout §2).
2. "probe P3 found it changes 64 small programs' values" becomes "probe P3 found that it makes things worse, with more values lost than gained (`reviews/ranges-and-index-types.md`, section 5)" (rule 11).
   - 64 is a count from one measurement, of 186 one-expression walk programs on 2026-10-09 (`CLIMB-BATCH-12.md`, Q49, "P3, measured"). It also overstated: 16 of the 64 are stops that stay stops with another error, so they change no value (judgement).
   - The probe's count: 25 values lost (a value today, a stop under (c)), 16 gained, 16 stops that change kind, and 7 values changed.
   - "It makes things worse" is his own reason, at 2026-10-09T14:54:50.968Z: after probe P3 he understood that (c) made everything worse, so he would go with option (a), the `fail` bodies.
   - "With more values lost than gained" is the probe's result in words, 25 against 16. Section 5 of the review, "5. Q49 after probe P3", holds the count.

**The rest, word for word (rule 1).** It is his yes. At 2026-10-09T15:01:26.240Z he quoted "Batch 12 already built it. If you confirm (a), Q49 is closed." and wrote "OK then.". The question is the coordinator's 14:55:36.046Z. It answered his request of 14:54:50 to say what he was deciding: it explained the five methods, why no body can type them, and the three ways. The reasons "no body can type", "the team's own device" and "Nothing in the tree calls them" are the coordinator's, in the text that he confirmed. His earlier lean to (c), at 07:05:31.926Z, came before P3 (judgement).

**What leaves POSITIONS, and where it goes.** "64 small programs' values" goes to its report: `reviews/ranges-and-index-types.md`, section 5, which the entry now names, and `CLIMB-BATCH-12.md`, Q49. It also goes to this history.

**Size.** 498 characters before, 611 after, by `record.py check`. The pointer and the exception add the 113. The exception keeps a reader from taking the five `Stop` tests for callers to repair, and the pointer is what rule 11 asks for in place of the count (record.md, questions 1 and 5).

**History line.** The tool writes one block; "What record.py wrote" gives it whole. It puts back his two messages of 14:54:50 and 15:01:26, each with the coordinator's text that it answered. It also corrects the block of 2026-10-13 18:16Z, which names `8e276cf48` for the rewrite `55f1a1352`.

**Questions for him.** None.

**Pointers elsewhere.**
- `FACTS.md:84` (F-91, "`(:)`'s five cutting methods fail (P-56)") and `review-queue.md:1189` need nothing.
- `.claude/skills/fortress-repo/references/sources.md:582` quotes the title, which is unchanged. It needs nothing.
- `CLIMB-BATCH-12.md:66` and `:108` still read "open" and "pending after P3". They are the batch record as drafted, and need nothing.

## P-57

**Before.**

> - P-57 **`LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached (row 582).** The team's overload `isLeftZero(_:Comparison)` is declared over `TotalComparison`, so the inherited `ReductionWithZeroes.isLeftZero` no longer shadows it. `LessThan` and `GreaterThan` answer `true`, and `EqualTo` `false`. `isLeftZero(Unordered)` is refused under walk. Nothing calls `isLeftZero`. Why: it cleared the count stage's last api error (F-53).

**After.**

> - P-57 **`LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached (row 582).** The team's overload `isLeftZero(_:Comparison)` is declared over `TotalComparison`, so the inherited `ReductionWithZeroes.isLeftZero` no longer shadows it. `LessThan` and `GreaterThan` answer `true`, and `EqualTo` `false`. Why: it cleared the count stage's last api error (F-53).

**The rest, word for word.**
- The title, the overload and the three answers: his yes to a question that the entry states fairly (rule 1).
  - At 2026-10-09T15:10:56.122Z he read the coordinator's recommendation back: declare the team's parameter `TotalComparison`, which takes the count to zero. He wrote "Hey, let's do it. I have no idea what I'm deciding on, but let's push forward to zero.", and added that he had not understood the description.
  - The question is the coordinator's 14:56:40.919Z. Its way 1: "Declare the team's parameter `TotalComparison`. The team's answers are reached: `LessThan` and `GreaterThan` become `true`, as the mathematics says". Its recommendation: "1, the team's own answers."
  - He took it without understanding it, in his own words. The record keeps it as his decision, since he chose the way and its reason. The item drafted below brings the one consequence that he was not shown.
- "Why: it cleared the count stage's last api error (F-53).": his reason, "I like getting the checker counts to zero.", restated after its premise failed. The question promised "The count goes to 0". After the build the count stayed 1, from another stop, so `ddd73d967` restated the reason as the last api error cleared. That is true (climb batch 13's count: every api row 0), and fair to him (judgement).

**What leaves POSITIONS, and where it goes.**
1. "`isLeftZero(Unordered)` is refused under walk.": to the review queue, drafted as **item Q-?1** (`review-queue-items-c4.md`) (rule 2).
   - It is an agent's landing. The question did not name `Unordered`.
   - The team's overload answered `true` for it. `Unordered` extends `Comparison` only (`Library/FortressLibrary.fss:151`), so after the change no declaration takes it. Walk refuses the call: "Failed to find any matching overload, args = (Unordered)" (`compile-ladder/rung-tuple-orders/SKEPTIC.md:142`; `climb-batch-13/RECORD.md:209`). Climb batch 13's rung O built it (`9ba86f7da`).
   - The sentence came into the entry at `ddd73d967`, from that landing. PLAN's batch-13 list once listed the refusal for him with the default "as landed" (`PLAN-history.md:697`, point 3).
   - Then PLAN's consolidation shortened that point to "the `isLeftZero` pins are answered by P-57" (`PLAN.md:382`). The review queue filed it under "Answered by a decision of his" (`review-queue.md:1191`). So the record counts as his decision a consequence that he was never shown (judgement).
   - No open item of the queue holds it, so the item is drafted. It is routine by the queue's test, a changed walk value.
2. "Nothing calls `isLeftZero`.": struck (rules 6 and 8).
   - It is an observation of one day, and it tells no one what to do.
   - It is also false as written: the three pins `ProjectFortress/tests/LibraryMeetDeclarations.fss:33-35` call it. The coordinator's question of 14:56:40 said "Nothing in the library or the tests calls" it, while the pin had stood since `0ae526b31` (scout §2).
   - Corrected, "nothing in the library calls it" would stay an observation. So I strike it rather than correct it. Item Q-?1 keeps the corrected fact as its cost.

**Rules in conflict.** Rule 2 moves the sentence. Rule 0 and his page comment of 2026-10-21, 23:29 ("we are somehow too aggressive in touching everything") ask that correct text stay. The sentence is correct. I still move it, because here the move is what corrects the record. While the sentence stays in P-57, PLAN and the queue read it as settled by his decision. Yet nothing that he answered named it, and it reverses one of the team's answers, which his decision was meant to reach. In the queue it stays visible as landed, with its default "as landed", until he answers. Chunk c8's P-124 went the other way, for a sentence that fairly extended his own choice. This one does not.

**History line.** The tool writes one block; "What record.py wrote" gives it whole. It puts back his message and the question, and corrects the block of 2026-10-13 18:16Z, which names `060be81e5` for the rewrite `55f1a1352`.

**Questions for him.** None in the entry. Item Q-?1 puts the refusal to him in the queue's form.

**Pointers elsewhere.**
- `PLAN.md:382`: "the `isLeftZero` pins are answered by P-57". This holds for the three pins, which are `LessThan`, `GreaterThan` and `EqualTo`. The refusal is no pin: no test pins it (scout §2). After the move, the line would add "; `isLeftZero(Unordered)`'s refusal waits in review-queue item N".
- `review-queue.md:1191`: "P-57, ..., which names the refused `isLeftZero(Unordered)`". It would drop that clause and name item N.
- FACTS has no pointer to P-57.

## P-58

**Before.**

> - P-58 **Every native binding is a `builtinPrimitive` call naming a static helper (item 35).** Each binding stays the library's own form, a body that is exactly `builtinPrimitive("…")`, and its string names a static helper of `nativeHelpers/`, not an interpreter glue class. Walk loads the string through a loader beside its glue classes. The compiled path rewrites each body at the parse into a synthetic `import java` and a call before the checker, and refuses a string that names no helper. Way 2, `import java` blocks in the library, is not taken. Still to build: the natives rungs, PLAN phase 4.

**After.**

> - P-58 **Every native binding is a `builtinPrimitive` call naming a static helper (item 35).** Each binding stays the library's own form, a body that is exactly `builtinPrimitive("…")`, and its string names a static helper of `nativeHelpers/`, not an interpreter glue class. Walk loads the string through a loader beside its glue classes. The compiled path rewrites each body at the parse into a synthetic `import java` and a call before the checker, and refuses a string that names no helper. Each natives rung's bindings meet the checker as they land, not all at once at the switch-over. Way 2, `import java` blocks in the library, is not taken. Still to build: the natives rungs, PLAN phase 4.

**What changed, and its source.** One sentence added (rule 4): "Each natives rung's bindings meet the checker as they land, not all at once at the switch-over."
- At 2026-10-10T05:27:34.812Z he wrote "Item 35, agreed with recommendation, option 1.". The rest of that message answers the 04:07:38.892Z turn, which states no options for item 35 (judgement; scout §1).
- The open question on item 35 was the coordinator's 00:17:43.858Z. I read it whole in the transcript (`000.jsonl:10115`): "The choice: when does the checker start seeing the natives under form 1? 1. Rung by rung, from the first natives rung. Each rung's bindings are checked as they land. A bad binding shows up in the rung that wrote it. ... 2. All at once, at the switch-over. Nothing is checked before then. ... 3. Form 2 instead. ... Recommendation: option 1."
- So his "option 1" chose the timing. The form was already form 1 under options 1 and 2.
- The first text (`046207371`) held it: "the rewrite is switched on by the compile command, so that each natives rung's bindings are checked as they land, from N1". The consolidation `55f1a1352` left it out ("the compile command's switch ... left to the write-up and the probe"). It survives only in `PLAN.md:81`. The coordinator read his answer back that way at 05:29:10.261Z, and he did not object (judgement).
- The new sentence states his option in the question's own words, and the way that he did not take (option 2). "The compile command" is the mechanism that the coordinator chose for it. PLAN's phase 4 line holds it, so the entry does not repeat it.

**The rest, word for word (rule 1).** The form is his yes, stated fairly. An earlier text, 2026-10-09T22:53:37.453Z, put form 1 against form 2 as options 1 and 2. He did not answer it then: at 23:12:54.624Z he had no intuition for choosing between the two forms, and asked for a Fable judgement or a prototype to decide on data. A probe followed (`perf-probes/prelude/natives-binding-probe.md`). So either reading of his "option 1" gives form 1, which the entry states (judgement).
- "refuses a string that names no helper": the probe's gap, stated in the 00:17:43 text ("The rung needs a rule that refuses a string naming no helper").
- "Way 2 ... is not taken": option 3 of 00:17:43, and option 2 of 22:53:37.
- "Still to build: the natives rungs, PLAN phase 4": true at HEAD. No natives rung has landed (scout §5).

**What leaves POSITIONS.** Nothing.

**Size.** 600 characters before, 696 after, by `record.py check`. The added sentence keeps the point that he chose: without it, a natives rung could leave its bindings unchecked until the switch-over (record.md, question 1).

**History line.** The tool writes one block; "What record.py wrote" gives it whole. It puts back his two messages, each with the coordinator's text that it answered. It also corrects the block of 2026-10-13 18:16Z, which names `046207371` for the rewrite `55f1a1352`.

**Questions for him.** None. His option 1 settles the timing.

**Pointers elsewhere.**
- `FACTS.md:26` (F-32) and `:211` (F-180) need nothing.
- `review-queue.md:1183` quotes the current title, which is unchanged. It needs nothing.
- `PLAN.md:81` quotes P-58 by its title before 2026-10-13, "The natives' one binding text is `builtinPrimitive` naming a static helper (item 35).". It would quote the current one, "Every native binding is a `builtinPrimitive` call naming a static helper (item 35)". The tool does not reach PLAN. It was stale before this audit.

## P-59

**Before and after.** Kept, word for word:

> - P-59 **Walk chooses coercions on the value until the switch-over.** Walk has no static types, so it chooses a coercion by the value, where the specification and the compiled path resolve it statically. This is accepted as the interpreter's limit (item 16), stated in one callout of the coercion chapter, with `XXXCoercionStaticRungC` and `XXXCoercionStaticNarrowRungC` as its record. After the switch-over walk takes the static coercions that the checker inserts. MicroGPT's static types are concrete, so both paths agree on it.

**Why, part by part.**
- **The title and the first three sentences.** His yes to a question that the entry states fairly, in his own words (rule 1).
  - At 2026-09-29T14:07:20.452Z he wrote "item seven as recommended. So one now and two after the switch.".
  - He gave his reading: for now walk is not touched until the library is switched; once the checker runs under walk, walk gains types and can switch.
  - The question is item 7 of the review page `reviews/decisions-review/judgement.md:354-360` (`9172ab41f`). Option 1: "Accept it: one callout ... item 16 closed with the two tests as its record". Option 2: "Make walk match: needs static types under walk ... after the switch-over". The recommendation: "1 now; 2 is the later road".
  - The reply chain names the 14:02:59 turn, which is on item 3 (scout §1).
  - The callout stands at `Specification/basic/conversions-coercions.tex:666-679`, and both tests exist (scout §2).
- **"After the switch-over walk takes the static coercions that the checker inserts."** The coordinator's answer to his "Am I missing anything?", 14:08:16.691Z: "Walk then has to take those inserted coercions instead of choosing on the run-time value." He did not take it up. It spells out his own "it will gain types and can switch", so it is fair (rule 7; judgement). It is not built. `PLAN.md:87` (Q-walk) is the nearest PLAN line: it calls that step R7's second step and says that it is not yet designed.
- **"MicroGPT's static types are concrete, so both paths agree on it."** The coordinator's premise, from item 7's first bullet on the review page (`judgement.md:356`) and from the 14:08:16 text. Nothing measured it.
  - Today it cannot be observed: the compiled path stops all of microGPT's components at name resolution (`PLAN.md:10`).
  - It stood in the question that he took "as recommended", but as background, not as option 1.
  - Under rules 5 and 7 it stays, and becomes a question.
- **"(item 16)".** It names PLAN-history's item 16 (`PLAN-history.md:198`, "Decided 2026-09-29 and closed"). PLAN's "16." at `:56` is the list number of a landed batch, not an item, so the label is not ambiguous. Kept.

**What leaves POSITIONS.** Nothing.

**History lines.** The tool cannot write these, since the entry does not change. They are listed under "History lines the tool cannot write".

**Questions for him.**
1. P-59 ends: "MicroGPT's static types are concrete, so both paths agree on it." It is the reason that walk's limit does not touch microGPT. The coordinator wrote it on the review page that you answered on 2026-09-29, and nothing has measured it. Today the compiled path cannot run microGPT, so it cannot be checked yet. Keep it as it stands? Or keep it marked as unmeasured until the compiled path runs microGPT? Or strike it?

**Pointers elsewhere.**
- `FACTS.md:143` (F-128), `POSITIONS.md:12` (P-12, "It comes once walk also takes the static coercions that the checker inserts (P-59)") and `review-queue.md:1206` need nothing.
- `PLAN.md:391`, `:408`, `:409` and `:421`, and `.claude/skills/fortress-repo/references/sources.md:649`, read P-59 as covering other walk choices by analogy: walk's static types at a call argument, unwritten reductions, the elements' run-time types. These are the coordinator's readings, and none is a word of his (scout §4). The entry does not change, so they need nothing from this audit. If he strikes the last sentence, they still stand, since none rests on it.

## P-60

**Before.**

> - P-60 **The specification reads a `comprises` clause at the level of values (PLAN item 26, row 491).** "Covers" is defined once, and the Meet Rule has a closed-trait case. A call whose argument sits between closed traits is typed by the intersection of its candidates' return types, with run-time uniqueness in place of static. Why: the proof addendum (`reviews/comprises-type-level-proof-addendum.md`) shows this sound for ground declarations, `G[\ZZ32\]` among them, with the coverage search local to overload checking. A generic declaration that needs a run-time instance is outside it. The specification states that boundary. The checker's condition is narrower, no static parameters in the whole family (row 543), and walk trusts the clauses' closure unchecked (row 551), both listed for his review.

**After.**

> - P-60 **The specification reads a `comprises` clause at the level of values (item 26, row 491).** "Covers" is defined once, and the Meet Rule has a closed-trait case. A call whose argument sits between closed traits is typed by the intersection of its candidates' return types, with run-time uniqueness in place of static. Why: the proof addendum (`reviews/comprises-type-level-proof-addendum.md`) shows this sound for ground declarations, `G[\ZZ32\]` among them, at calls that need no coercion, with the coverage search local to overload checking. A generic declaration that needs a run-time instance is outside it. The specification states that boundary.

**What changed, and its source.**
1. **The last sentence leaves** (rules 2, 8 and 9). "The checker's condition is narrower, no static parameters in the whole family (row 543), and walk trusts the clauses' closure unchecked (row 551), both listed for his review."
   - Both halves are defaults that agents landed, still waiting for his review, and "listed for his review" is a pending answer. The queue holds both, so no item is drafted:
     - item 58: typing by the intersection is limited to families with no static parameters (row 543), narrower than the text's boundary;
     - item 15: which `comprises` clauses walk checks at load.
   - The walk half is also false today (rule 8). Since climb batch 9's rung K (`7ed2a8387`, 2026-10-03), walk checks the clauses declared in the main component (`interpreter/evaluator/BuildEnvironments.java:1298`). Only a clause declared outside it goes unchecked (row 551; `PLAN.md:266`). The clause had not changed since `d11dfaf43` of 2026-09-30 (judgement). Item 15 states it rightly.
2. **"at calls that need no coercion" is added** to the proof's scope.
   - The addendum keeps the proof's argument "for calls applicable **without coercion**" (`reviews/comprises-type-level-proof-addendum.md:16-17`). Without the condition, the entry lets a reader conclude more than the proof shows.
   - The checker already keeps it: its tie rule leaves out a counted coercion (scout §2).
   - The judgement calls the Why fair but notes this omission. I add it because the record's pass keeps the source's conditions (`references/record.md`, "The pass", step 3).
   - It is the smallest of the three changes. It can be dropped alone if the coordinator reads the omission as fair.
   - A related loss that I do not repair (rule 0). `55f1a1352` also dropped "Astra's three points", which his "Yes" built into batch 7b's briefs (scout §3). He pasted them at 11:20:08.691Z. The second, the coverage search kept local to overload checking, is still in the Why. The third, that the proof holds only where closed families are in fact closed, is not: rows 487 (the compiled checker) and 551 (walk) are its gaps, and F-29 and F-72 hold the checks' state. The briefs were one batch's, carried out, and the judgement did not flag the loss. I name it for the coordinator, not as a change.
3. **"PLAN item 26" becomes "item 26".** PLAN holds no item 26 now: the item stands in `PLAN-history.md:208`. The label is the one that the other entries use ("item 48 (b)", "item 35"). No entry quotes P-60's title, and the queue's quote at `:1209` keeps its opening words.

**The rest, word for word.**
- The values reading, "covers", the Meet Rule's case and the intersection typing: his yes (rule 1). At 2026-09-29T11:25:37.094Z he wrote "Yes" to the coordinator's 11:20:23.184Z: "option 1 with Astra's three points built into 7b's briefs, yes or no?". Option 1 is item 26 as first put at 2026-09-28T20:08:52.590Z and again at 2026-09-29T10:13:54.916Z.
- "Why: the proof addendum ...": the coordinator's summary of the addendum, which his yes took in (judgement).
- "A generic declaration that needs a run-time instance is outside it.": Astra's note. He forwarded it unasked at 2026-09-29T17:29:19.700Z, headed "Astra no POPL2019 impact for next batch:". The coordinator took it at 17:29:52.529Z as a clause under his item 26 decision. By his heading the note is an instruction for the next batch, so the boundary carries his authority as a forward (judgement).
- "The specification states that boundary.": the built state, true (`Specification/advanced/overloading.tex:727-730`; `appendices/changes.tex:3435-3437`). Kept: it is short, and it tells the reader where the boundary is written. See "The rules, where they fit badly", 4.

**What leaves POSITIONS, and where it goes.** The last sentence goes to review-queue items 58 and 15, which hold both points (rule 2). It also goes to this history.

**Size.** 805 characters before, 657 after, by `record.py check`. It stays over 600 by the Why and the boundary, which it held before. Without them a reader could type a generic declaration that needs a run-time instance by the intersection, which the proof does not cover (record.md, question 1).

**History line.** The tool writes one block; "What record.py wrote" gives it whole. It puts back the sources that the judgement names: his "Yes" of 11:25:37; his reason for consulting Astra, 10:58:53.558Z; and his forward of 17:29:19. Each comes with the coordinator's text that it answered. It also corrects the block of 2026-10-13 18:16Z, which names `bc8902f47` for the rewrite `55f1a1352`.

**Questions for him.** None. Items 58 and 15 already put both defaults to him.

**Pointers elsewhere.**
- `FACTS.md:21`, `:69` and `:205` ("It builds P-46 and P-60 under walk", "It builds P-60", "It builds P-48 and P-60") need nothing.
- `review-queue.md:1209` quotes the title's opening words, "The specification reads a `comprises` clause at the level ...", which are unchanged. It needs nothing.
- `.claude/skills/fortress-repo/references/sources.md:655` needs nothing.
- Review-queue items 58 and 15 become the only home of the last sentence. Each already states its point whole, so neither needs a change. Item 58's Home could add "POSITIONS P-60's history".

## P-62

**Before.**

> - P-62 **The `covariant` keyword is future work, off the path to microGPT.** Row 404 records the hole: the checker accepts variance, and neither path carries it to run time. Its expected-failure tests are owed in a batch rung. The ledger's worklist item 12 is declaration-site variance, carried to run time on both paths. When it lands, the specification's sign-refined number types come back as covariant static parameters.

**After.**

> - P-62 **The `covariant` keyword is future work, off the path to microGPT.** Row 404 records the hole: the checker accepts variance, and neither path carries it to run time. Its expected-failure tests are owed in a batch rung. The future work is declaration-site variance, carried to run time on both paths. When it lands, a rung tries to bring back the specification's sign-refined number types as covariant static parameters.

**What changed, and its source.**
1. **"The ledger's worklist item 12 is" becomes "The future work is"** (rule 8).
   - The ledger has no worklist now. `ae4f8e38a` (2026-10-08) moved it to `fortress-gap-ledger-history.md`, item 12 at `:4077`, and called it "stale by then" (`:3839`). Only row 404's note (`fortress-gap-ledger.md:131`) still names it.
   - The work it named is the same: declaration-site variance by the 2012 keywords, carried to run time on both paths. That was item 12's text as reworded on his "Agreed." of 2026-09-26.
2. **"come back as covariant static parameters" becomes "a rung tries to bring back ... as covariant static parameters"** (rule 4).
   - At 2026-09-26T11:38:29.550Z he took option 1 of answer 6. He asked that the original design be clearly recorded, and that when they get to covariance "we try this. Let me try to resurrect this." He also asked whether it would lead into research territory, on what the type system can express.
   - `bc8902f47` kept his word in quotes ("resurrect"). `55f1a1352` made it "come back", an outcome that he did not promise.
   - "A rung tries to bring back" is his attempt, said as what someone does. His words give it, so rule 4's question is not needed.

**The rest, word for word (rule 1).**
- The title, "off the path to microGPT", row 404 and the work: his yes to the coordinator's answer to his own question, stated fairly.
  - He asked at 2026-09-26T08:05:26.356Z whether it goes into the ledger as future work, after the compiler runs, or is on the critical path.
  - The coordinator answered at 08:05:53.363Z: "It isn't on the critical path. It becomes future work in the ledger, in two entries", the defect row and the reworded worklist item 12.
  - At 08:18:07.238Z he quoted "The two ledger entries the judgement proposes" and wrote "Agreed.".
- "Its expected-failure tests are owed in a batch rung.": inside his yes. The 08:05:53 text said that the row "records it with expected-failure tests, one on the compiled path and one under walk, so it can't go silent." They were never written: row 404's test column is "none", and no `XXX` variance test exists (scout §2). No PLAN or queue line holds them, so this entry is their only home (judgement). It says what someone does, so it stays. See the pointers.

**What leaves POSITIONS.** Nothing.

**History line.** The tool writes one block; "What record.py wrote" gives it whole. It puts back his messages of 08:18:07 and 11:38:29, each with the coordinator's text that it answered. It also corrects the block of 2026-10-13 18:16Z, which names `bc8902f47` for the rewrite `55f1a1352`.

**Questions for him.** None.

**Pointers elsewhere.**
- `POSITIONS.md:85`, P-80: "Their return with covariance is P-62's." After this rewrite "return" says more than P-62 does. The line would read "Whether they return with covariance is P-62's." I do not touch P-80 here: it is outside the chunk, the tool does not refuse the rewrite without it, and the brief says to edit no line elsewhere.
- `fortress-gap-ledger.md:131`, row 404's note: "Future work, worklist item 12 (POSITIONS, "The `covariant` keyword is future work")". The worklist is gone, so the note would read "Future work (POSITIONS, "The `covariant` keyword is future work")". The quoted title is unchanged. It was stale before this audit.
- The owed expected-failure tests have no line in PLAN or the review queue (scout §5). A PLAN line would give them a rung, for example under "Off the path, parked", or in a batch's candidates, beside row 404. This is the coordinator's to add, since his yes already settles it. Once PLAN holds it, P-62's sentence could name that line, by rule 9.
- `reviews/popl2019-examples.md:264` and `:326` cite the title, which is unchanged. They need nothing.

## History lines the tool cannot write

`record.py` writes a history block only for a change. An apply line equal to the entry is skipped, and a call that changes nothing is refused. Chunk c8's writer showed this again (`corrections-c8.md`, "History lines for the entries kept word for word"). The two kept entries' sources are listed here, for the coordinator to write when the tool can. They are in the history's provenance form. Each gives his message's time, the coordinator's text it answered, and a fair rewording. A short answer that is itself the decision is quoted (rule 10).

**P-52**
- 2026-10-09T07:13:27.273Z · his words: "Q50 (a) as recommended" · answering the coordinator's 2026-10-09T07:09:23.365Z (Q50: when a 2-D or 3-D range checks whether another range lies inside it, should it compare corner by corner instead of in dictionary order; (a) corner by corner, the out-of-bounds case raising; recommendation (a)). The reply chain names the 07:11:13.370Z turn, which ends by saying that Q50 still waits.
- The block of 2026-10-13 18:16Z names `4e87131f9`, the entry's first commit, for the consolidation's rewrite, which was `55f1a1352`.

**P-59**
- 2026-09-29T14:07:20.452Z · his words: "item seven as recommended. So one now and two after the switch." For now walk is not touched until the library is switched. Once the checker runs under walk, walk gains types and can switch · answering item 7 of the review page `reviews/decisions-review/judgement.md` (`9172ab41f`): 1, accept walk's run-time choice as its limit, with one callout, item 16 closed with the two tests as its record; 2, make walk match after the switch-over; recommendation 1 now, 2 the later road. The coordinator had listed it at 13:43:05.297Z ("Item 7. Accept walk's run-time choice of coercions, with one callout in rung S."). The reply chain names 14:02:59.997Z, which is on item 3.
- 2026-09-29T14:08:16.691Z · the coordinator's answer to his "Am I missing anything?": walk then has to take the inserted coercions instead of choosing on the run-time value. It is the source of "takes the static coercions that the checker inserts". He did not take it up.
- "MicroGPT's static types are concrete, so both paths agree on it" is the coordinator's premise, from item 7 of the review page and its 14:08:16 text. Nothing has measured it. It is put to him.
- The block of 2026-10-13 18:16Z names `bc8902f47` for the consolidation's rewrite, which was `55f1a1352`. The text that it replaced carries `d11dfaf43`'s cites.

## What record.py wrote

**How it ran.** The scratch root `positions-audit/full/fix-c4/root/` holds copies of the four record files from `explorations/coordinator/`: `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `FACTS-history.md`. Every other path in it is a symbolic link into the real tree, so that the `from` paths resolve. The tool was the real `explorations/coordinator/tools/record.py`. It ran with `--root` on the copy, with `GIT_DIR` set to the real repository, read only, so that `check --base` can read the base.
- The base is HEAD at the run. HEAD was `ed2a45803` when the copies were taken and `e5b63d56c` at the run. That commit touched none of the four files, and the copies equal the working tree's (`cmp`).
- The commands, run from the scratch folder:

      GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root
      GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py apply /home/user/fortress/explorations/coordinator/positions-audit/full/evidence/corrections-c4.apply --root root
      GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root

- A first run, on an earlier copy, gave the same lines. Its `check` reported one `from` that did not resolve: P-53's note said "changing from `a` to `Just(a)`", and the check reads "from `a`" as a citation. I reworded the note ("walk then printing `Just(a)` where it printed `a`"), and ran everything again on a fresh copy. The output below is that second run's.
- After this file was finished, with its history blocks quoted inside a fence below, the apply ran once more on a third fresh copy. It gave the same `POSITIONS.md`, and the same history but for the time, and `check --base HEAD` again gave 0 failures. So each `from` heading of this file ("P-51" and the rest) still resolves to one heading.

**check before the apply** (`fix-c4/check-before.txt`), exit 0:

    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

**apply** (`fix-c4/apply-out.txt`), exit 0:

    P-51: rewritten
    P-53: rewritten
    P-54: rewritten
    P-56: rewritten
    P-57: rewritten
    P-58: rewritten
    P-60: rewritten
    P-62: rewritten

**check after the apply** (`fix-c4/check-after.txt`), exit 0:

    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

What changed, against the run before the apply:
- POSITIONS has 83 entries before and after. Nothing is struck.
- The POSITIONS entries over 600 characters go from 18 to 19:
  - P-51 leaves the list: 696 characters, now 563.
  - P-60 stays on it: 805, now 657.
  - P-56 and P-58 join it: 498 to 611, and 600 to 696.
  - Each entry's "Size" part gives the question that keeps the extra sentence. The other 16 are unchanged.
- No `from` path or cited section is reported as unresolved. The two "reported" lines are the two size lists.
- `FACTS.md` and `FACTS-history.md` are byte for byte the same as the real files (`cmp`). FACTS's size list is unchanged.
- No pointer words needed refreshing. P-60 is the only entry retitled, and no entry of FACTS or POSITIONS quotes its title.

**Refusals.** None.

**POSITIONS.md.** Eight lines are rewritten, as in the "After" texts above (`fix-c4/POSITIONS.diff`; `rewritten-c4.txt`). The blocks that the apply appended to `POSITIONS-history.md` follow, verbatim (`fix-c4/history-blocks.txt`, from `fix-c4/PH.diff`). The time is the copy's clock, and a real apply would stamp its own and name its own `by`.

```

### P-51

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-51" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c4.md`, "P-51" · from `explorations/reviews/argument-context-probe.md`, "The answers" · commit `0856f3e6a` · by the POSITIONS audit's writer for chunk c4 (Opus), proposed for his review: the probe's count and the built state go to this history, the rest kept. "Its probe moves no error of the distance" was a count of one measurement, the probe's distance stage 207 to 207 on 2026-10-09; the entry names the probe instead. Climb batch 14's rung A built it (`0856f3e6a`) and promoted the expected failures `XXXInferContextDrops` and `XXXInferLoneUnionClosedTrait`, whose names are gone: `compiler_tests/` holds `InferCallArgumentContext` and `InferLoneUnionClosedTrait`, and F-221 holds the built state and its gate. Its sources: 2026-10-09T06:55:25.847Z, answering the coordinator's 06:46:36.728Z (Q48 (b), whether a call written as another call's argument also gets an expected type; recommendation (a) yes, (b) not now): yes in principle, measured first; it unifies the inference rules everywhere and covers cases the team did not build, so where the mechanism is specified and the way known, it goes ahead. 2026-10-09T22:10:09.585Z, his words "Q48(b) wide, go ahead", answering the coordinator's 15:13:34.608Z (Q48 (b), wide or narrow, wide recommended), whose two options are item 3 of its 11:56:38.064Z list: wide, any inferred call; narrow, only a type parameter that appears just in the result. Two blocks name the wrong commit: that of 2026-10-13 18:16Z names `4dc35f685` for the consolidation's rewrite, which was `55f1a1352`, and that of 2026-10-14 06:10Z names `7c2c7cd4b` for a rewrite that was `c5210e202`; `4dc35f685`'s note dates his go at about 21:57 UTC, where the transcript has 22:10:09Z.

- P-51 **A call written as another call's argument is retried against each declaration's parameter type (item 48 (b), row 455).** When the checker's attempts at a call keep none, an argument that is a call with inferred static arguments is checked again, with each candidate's parameter type as its expected type. The trigger is wide: any inferred static argument, not only a result-only type parameter. Why: it makes the inference rules one rule everywhere, past the cases the team built. Its probe moves no error of the distance. Its rung promotes the expected failures `XXXInferContextDrops` and `XXXInferLoneUnionClosedTrait`, whose refusals it repairs. Built by climb batch 14 (`0856f3e6a`).

### P-53

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-53" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c4.md`, "P-53" · by the POSITIONS audit's writer for chunk c4 (Opus), proposed for his review: "and every other `left` and `right` of the library" corrected to the ranges' and the lists': `Avl`'s `left` and `right` are subtrees (`Library/Avl.fss:93-94`), and `PureList`'s finger-tree node declares `getter left():E` (`Library/PureList.fss:318-319`); the coordinator's question named only the ranges' and `List`'s. The rest kept. Its source: 2026-10-09T07:18:49.726Z, his words "agreed with the recommendation.", answering the coordinator's 07:14:01.035Z (item 42: should `String`'s `left` and `right` return `Just(c)`, as their declaration promises; way 1, `Just(self.get(0))` and its twin, walk then printing `Just(a)` where it printed `a`; recommendation 1, the library's own way). The block of 2026-10-13 18:16Z names `1ea1efa3d`, the entry's first commit, for the consolidation's rewrite, which was `55f1a1352`.

- P-53 **`String`'s `left` and `right` answer `Just(c)` (item 42, row 606).** For a non-empty string they return `Just` of the first and of the last character, as their declared `Maybe[\Char\]` and every other `left` and `right` of the library do. So walk prints `Just` of the character, not the character.

### P-54

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-54" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c4.md`, "P-54" · commit `55f1a1352` · by the POSITIONS audit's writer for chunk c4 (Opus), proposed for his review: the reason restored: the consolidation's "the peer methods" read as the library's own methods, where the question's peers were other languages, Python's `math.floor(inf)` raising and Julia's `floor(Int, Inf)` throwing, and the first text (`35dc7b626`) said "the peers". The rest kept. Its source: 2026-10-09T07:28:28.361Z, answering the coordinator's 07:19:47.208Z (item 44: what `QQ`'s `ceiling` and `truncate` do at ±∞ and 0/0; way 2, keep `ZZ` and raise, which follows the declaration and the peers; recommendation 2 now, the float rung of row 330 bringing `QQ` into line with way 3 later): as recommended, first make it pass, and later make it consistent with the float ruling, which is his of 2026-09-29T15:18:44.154Z (P-68). `floor`, `round` and the brackets raise because they call the two bodies (`Library/FortressLibrary.fss:649-657`; climb batch 12's rung S, `74b28e9d4`). PLAN's line for P-68's rung does not name `QQ`. The block of 2026-10-13 18:16Z names `35dc7b626` for the consolidation's rewrite, which was `55f1a1352`.

- P-54 **`QQ`'s `ceiling` and `truncate` keep `ZZ` and raise at +∞, −∞ and 0/0 (item 44, row 635).** The declared integer result and the peer methods win over the specification's paragraph that returns the argument at an infinity, and that paragraph is revised. `floor`, `round` and the two brackets raise too. A rung after the switch-over makes `QQ` follow the float ruling (row 330): the methods keep the type, and the brackets, `round` and `truncate` give ℤ.

### P-56

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-56" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c4.md`, "P-56" · from `explorations/reviews/ranges-and-index-types.md`, "5. Q49 after probe P3" · commit `abe8b0342` · by the POSITIONS audit's writer for chunk c4 (Opus), proposed for his review: probe P3's count goes to its report and the reason is put in his words: of 186 one-expression walk programs on 2026-10-09, 64 differed, 25 values lost, 16 gained, 16 stops changing kind and 7 values changed (`CLIMB-BATCH-12.md`, Q49), so "64 small programs' values" overstated by the 16 stops. "Nothing in the tree calls them on `(:)`" gains its exception: since rung R (`abe8b0342`) the five `TrivialOpenRange...Stop` tests call them, to pin the `fail`. The rest kept. Its sources: 2026-10-09T14:54:50.968Z, after reading the review's section 5, answering the coordinator's 11:56:38.064Z list (item 2, confirm (a)): he had leaned to (c), but probe P3 showed that it made things worse, so he will go with (a), the `fail` bodies, though he did not yet understand what he was deciding. 2026-10-09T15:01:26.240Z, his words "OK then.", quoting the coordinator's 14:55:36.046Z "Batch 12 already built it. If you confirm (a), Q49 is closed.", which explained the five methods, why no body can type them, and the three ways. His lean to (c) at 07:05:31.926Z came before P3. The block of 2026-10-13 18:16Z names `8e276cf48` for the consolidation's rewrite, which was `55f1a1352`.

- P-56 **The open range `(:)` keeps its wildcard type, and its five cutting methods fail (item 49, row 656).** `TrivialOpenRange` stays `OpenRange[\Any\]`. A range over `ZZ32` is not a range over `Any`, so no body can type its `truncL`, `truncR`, `every`, `imposeStride` and `atMost`. They are `fail` bodies with a message, the team's own device for such a body. Nothing in the tree calls them on `(:)`. Way (c), `(:)` over `ZZ32`, is not taken: probe P3 found it changes 64 small programs' values.

### P-57

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-57" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c4.md`, "P-57" · commit `9ba86f7da` · by the POSITIONS audit's writer for chunk c4 (Opus), proposed for his review: "`isLeftZero(Unordered)` is refused under walk." leaves for the review queue as a drafted item: the question put to him did not name `Unordered`, which the team's overload answered `true`; the refusal came with climb batch 13's rung O (`9ba86f7da`), was listed for his review with the default as landed (PLAN-history, "Climb batch 13, listed for his review", the batch's extensions and pins, point 3), and was then counted as answered by this entry. "Nothing calls `isLeftZero`." struck: an observation, and its three pins call it (`ProjectFortress/tests/LibraryMeetDeclarations.fss:33-35`). The rest kept. Its source: 2026-10-09T15:10:56.122Z, answering the coordinator's 14:56:40.919Z (row 582: 1, declare the team's parameter `TotalComparison`, the team's answers reached and the count to 0; 2, delete the team's overload; recommendation 1, the team's own answers): let's do it and push the checker count to zero, though he had not understood the description. The count stayed 1 after the build, from another stop, so `ddd73d967` restated the reason as the last api error cleared. The block of 2026-10-13 18:16Z names `060be81e5` for the consolidation's rewrite, which was `55f1a1352`.

- P-57 **`LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached (row 582).** The team's overload `isLeftZero(_:Comparison)` is declared over `TotalComparison`, so the inherited `ReductionWithZeroes.isLeftZero` no longer shadows it. `LessThan` and `GreaterThan` answer `true`, and `EqualTo` `false`. `isLeftZero(Unordered)` is refused under walk. Nothing calls `isLeftZero`. Why: it cleared the count stage's last api error (F-53).

### P-58

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-58" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c4.md`, "P-58" · commit `55f1a1352` · by the POSITIONS audit's writer for chunk c4 (Opus), proposed for his review: the timing that his option 1 chose put back: the consolidation left out the first text's "each natives rung's bindings are checked as they land, from N1" (`046207371`), which only PLAN's phase 4 line still held. The rest kept. Its sources: 2026-10-10T05:27:34.812Z, his words "Item 35, agreed with recommendation, option 1.", answering the coordinator's 00:17:43.858Z (the item 35 probe back; when does the checker start seeing the natives under form 1: 1, rung by rung from the first natives rung, each rung's bindings checked as they land; 2, all at once at the switch-over; 3, form 2 instead; recommendation option 1); the reply chain names 04:07:38.892Z, which states no options for item 35; the coordinator read his answer back so at 05:29:10.261Z, and he did not object. Before it, 2026-10-09T23:12:54.624Z, answering the coordinator's 22:53:37.453Z (item 35, form 1 against form 2): he had no intuition for choosing between the two forms, and asked for a Fable judgement or a prototype to decide on data; a probe followed (`perf-probes/prelude/natives-binding-probe.md`). The block of 2026-10-13 18:16Z names `046207371` for the consolidation's rewrite, which was `55f1a1352`.

- P-58 **Every native binding is a `builtinPrimitive` call naming a static helper (item 35).** Each binding stays the library's own form, a body that is exactly `builtinPrimitive("…")`, and its string names a static helper of `nativeHelpers/`, not an interpreter glue class. Walk loads the string through a loader beside its glue classes. The compiled path rewrites each body at the parse into a synthetic `import java` and a call before the checker, and refuses a string that names no helper. Way 2, `import java` blocks in the library, is not taken. Still to build: the natives rungs, PLAN phase 4.

### P-60

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-60" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c4.md`, "P-60" · commit `7ed2a8387` · by the POSITIONS audit's writer for chunk c4 (Opus), proposed for his review: the last sentence leaves for the review queue, whose items 58 (the checker's narrower condition, row 543) and 15 (which `comprises` clauses walk checks at load, row 551) hold its two defaults; its walk half was false, since walk has checked the main component's clauses since climb batch 9's rung K (`7ed2a8387`), and only a clause declared outside it goes unchecked. The proof's scope gains the addendum's own condition, calls applicable without coercion. "PLAN item 26" becomes "item 26": the item is now in PLAN-history. The rest kept. Its sources: 2026-09-29T11:25:37.094Z, his words "Yes", answering the coordinator's 11:20:23.184Z ("option 1 with Astra's three points built into 7b's briefs, yes or no?"); option 1 is item 26 as put at 2026-09-28T20:08:52.590Z and again at 2026-09-29T10:13:54.916Z: the passages restated at the level of values, "covers" defined once, the Meet Rule's closed-trait case, and the intersection typing as a listed default. 2026-09-29T10:58:53.558Z, answering that 10:13:54.916Z: he consulted Astra on item 26, afraid of touching type theory that he cannot judge. 2026-09-29T17:29:19.700Z, he forwarded Astra's note for the next batch: the proof covers ground declarations only, a generic declaration that needs a run-time instantiation must meet every static return promise at once, and `G[ZZ32]` stays ground; it followed his 17:21:46.816Z question on the POPL 2019 paper, and the coordinator's 17:29:52.529Z queued it as a clause of item 26. The block of 2026-10-13 18:16Z names `bc8902f47` for the consolidation's rewrite, which was `55f1a1352`.

- P-60 **The specification reads a `comprises` clause at the level of values (PLAN item 26, row 491).** "Covers" is defined once, and the Meet Rule has a closed-trait case. A call whose argument sits between closed traits is typed by the intersection of its candidates' return types, with run-time uniqueness in place of static. Why: the proof addendum (`reviews/comprises-type-level-proof-addendum.md`) shows this sound for ground declarations, `G[\ZZ32\]` among them, with the coverage search local to overload checking. A generic declaration that needs a run-time instance is outside it. The specification states that boundary. The checker's condition is narrower, no static parameters in the whole family (row 543), and walk trusts the clauses' closure unchecked (row 551), both listed for his review.

### P-62

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-62" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c4.md`, "P-62" · commit `ae4f8e38a` · by the POSITIONS audit's writer for chunk c4 (Opus), proposed for his review: two corrections. "The ledger's worklist item 12 is" becomes "The future work is": `ae4f8e38a` moved the ledger's worklist to its history, stale by then, and only row 404's note still names item 12. "Come back as covariant static parameters" becomes a rung that tries to bring them back: he asked that the original design be recorded and that, when covariance comes, they try it and try to resurrect it, and he asked whether that would land in research territory; the consolidation (`55f1a1352`) made the attempt an outcome. The rest kept; the owed expected-failure tests have no line in PLAN or the review queue. Its sources: 2026-09-26T08:18:07.238Z, his words "Agreed." under the quoted heading "The two ledger entries the judgement proposes", answering the coordinator's 08:05:53.363Z: the keyword is not on the critical path and becomes future work in the ledger in two entries, a defect row with expected-failure tests on both paths and worklist item 12 reworded; that answered his 08:05:26.356Z question whether it is future work after the compiler runs or on the critical path. 2026-09-26T11:38:29.550Z, answering the coordinator's 11:21:27.012Z (answer 6, the sign-refined number types; the ask, option 1): option 1, with the road back above. The block of 2026-10-13 18:16Z names `bc8902f47` for the consolidation's rewrite, which was `55f1a1352`.

- P-62 **The `covariant` keyword is future work, off the path to microGPT.** Row 404 records the hole: the checker accepts variance, and neither path carries it to run time. Its expected-failure tests are owed in a batch rung. The ledger's worklist item 12 is declaration-site variance, carried to run time on both paths. When it lands, the specification's sign-refined number types come back as covariant static parameters.
```

**What the tool could not do.** Two entries are kept word for word: P-52 and P-59. Their sources have no route into the history. An entry line equal to the entry is skipped, and a call that changes nothing is refused (`corrections-c8.md`, "What record.py wrote", "Refusals, tried on purpose"). The lines are listed under "History lines the tool cannot write". P-59's question also leaves no block until he answers.

**What check does not see.** It checks pointers only inside FACTS and POSITIONS. The lines elsewhere that this proposal makes stale, or that were stale before it, pass. Each entry's "Pointers elsewhere" lists them:
- `PLAN.md:401` ("as P-51 names") and `review-queue.md:1188` ("a batch 14 candidate") on P-51;
- `PLAN.md:90`, P-68's rung, without `QQ` (P-54);
- `PLAN.md:382` and `review-queue.md:1191` on P-57's refusal of `Unordered`;
- `PLAN.md:81`, P-58's title before 2026-10-13;
- `POSITIONS.md:85`, P-80's "Their return with covariance is P-62's", which the check passes, since the pointer is a bare number;
- `fortress-gap-ledger.md:131`, row 404's "worklist item 12", and the owed tests of P-62, which have no PLAN line.

## The rules, where they fit badly

1. **P-51's "Built.": rule 9 against rule 0.** Rule 9 sends a list of what is built to the history. The entry's "Its rung promotes ..." and "by climb batch 14 (`0856f3e6a`)" are that list, and its test names are stale, so they go. I keep the one word "Built.", as chunk c8 did for P-124 and P-125: it is the empty case of what is still to build, which record.md asks a POSITIONS entry to state. Chunk c7 dropped "Built" entirely from P-89. If the coordinator prefers c7's way, the word goes too, and nothing else changes.
2. **P-51's and P-56's numbers: rule 11.** Rule 11 keeps "the decision and its reason in words, with a pointer".
   - In P-56 the measurement was his reason. So the entry keeps his reason in his words, "it makes things worse", with the probe's result in words, "more values lost than gained", and the pointer.
   - In P-51 the measurement was his condition before the go, not his reason, which the Why already states. So only the pointer stays. Its sentence reads oddly alone. If the coordinator finds the pointer adds nothing that F-221's detail does not give, it can go, and rule 11 is still met: the number has left.
3. **P-54's "`floor`, `round` and the two brackets raise too": rules 5, 6 and 7.**
   - The judgement calls it the state of the project, and the question did not name the four. So rule 6 would strike it, and rule 5 would make it a question.
   - But it says what must keep working, which his test counts as actionable. The library makes it follow from his decision, since the four call the two bodies. So it neither narrows nor adds to what he chose (rule 7).
   - I keep it, word for word, with no question. If the coordinator reads it as the state of one day, it can go to the history with F-90, which holds the built state.
4. **P-60's "The specification states that boundary.": rule 9 against rule 0.** It is a built state, so rule 9 would move it. It is one short clause, true, and it tells the reader where the boundary he forwarded is written, so I keep it (rule 0). This is the same choice as "Built." in item 1.
5. **P-57's `Unordered` sentence: rule 2 against rule 0 and his page comment of 23:29.** Rule 2 moves it to the queue. Rule 0 keeps correct text, and his comment warns against moving too much. I move it, for the reason given under P-57: the record counts it as settled by him, and he was never shown it. Moving it is the correction. Chunk c8 kept a sentence in a like case (P-124), because that sentence extended his own choice fairly. This one reverses one of the team's answers, the very answers that his decision was meant to reach.
6. **P-57's "Nothing calls `isLeftZero`": rule 8 against rule 6.** Rule 8 would correct it, to "nothing in the library calls it". Rule 6 strikes an observation. Corrected, it would still be an observation, so I strike it. Its corrected fact goes into Q-?1's cost.
7. **P-60's added condition, "at calls that need no coercion".** No rule names this case: a gloss of the coordinator's that leaves out a condition of its source. The judgement calls the gloss fair. Rule 7 keeps a gloss only if it neither narrows nor adds. A sentence that leaves out a condition adds scope, so I restore the condition, by the record's pass, step 3. It and P-60's "item 26" for "PLAN item 26" are the two changes in this chunk that the judgement did not ask for: it noted that the entries' item numbers now stand only in PLAN-history, but proposed no edit. Each can be dropped alone.
8. **P-62's "come back": rule 4.** Rule 4 rewords from his intent, or, where no wording follows from his words, puts it to him. Here his words give it ("we try this. Let me try to resurrect this."). So I reword, and ask nothing.
9. **P-54's `QQ` follow-up and P-62's owed tests: rule 9 without a PLAN item.** Rule 9 keeps what is still to build "as one short line with its PLAN item". Neither has a PLAN item: PLAN's float rung leaves out `QQ`, and no line holds the variance tests. The brief says to edit no line elsewhere. So both entries keep their sentence as it stands, and the PLAN lines that would hold them are listed for the coordinator. Neither is a question for him, since his words already settle both.
10. **The history's wrong commits.** Every block of the consolidation of 2026-10-13 18:16Z in this chunk names a commit that is not the rewrite, `55f1a1352`. The judgement found this, and so did c3's for P-41. The tool cannot rewrite an old block. So each new block, and each listed line for P-52 and P-59, states the right commit. A block of a later write is the only route to the correction.
