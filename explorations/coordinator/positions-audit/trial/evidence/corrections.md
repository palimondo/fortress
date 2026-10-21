<!-- The correction trial of 2026-10-21 on the POSITIONS audit's ten trial entries: the corrected record proposed by the coordinating session's eight rules, entry by entry, with each new sentence's source, what leaves POSITIONS and where it goes, the history lines, the questions for the curator and the pointers elsewhere; record.py run on a scratch copy only; nothing applied. -->

# The ten entries corrected: a proposal

Writer: one Opus session, from `judgement.md`, the ten scouts' reports in this folder, `RESULTS.md`, and the sources named below, with the eight rules of the coordinating session's brief and the curator's clarification on rewording (his messages of 2026-10-13T09:05:37.307Z and 2026-10-14T11:49:45.308Z: a fair, concise rewording of his intent, checked against his words; his exact words quoted only where they are the decision). Nothing in the real record changed. The apply file is `corrections.apply` beside this file; `record.py` ran it on a copy of the record in the session's scratch folder (`scratchpad/positions-audit/fix/root/`), with `--root`. The items drafted for the review queue are in `review-queue-items.md`.

"His page comment" is one of his comments on the trial's page on 2026-10-21, as the brief quotes them; they are not among his messages, so `show.py` cannot check them (`judgement.md`, "P-66"). Every other time is a message of his or of the coordinating session, UTC. "Rule n" is the brief's rule n.

## The verdicts

- **P-10**: struck, at his word (page comments 20:06 and 20:13). One part, the APL program in the walk check, goes to the review queue (drafted item 205).
- **P-18**: struck, at his word (page comment 20:10).
- **P-55**: rewritten. Its decision kept, checked against what he was shown. The forks 3 and 2 sentence leaves: review-queue items 30 and 31 already hold both.
- **P-66**: rewritten, one clause dropped ("the sign of `GCD`"), and a question for him, since his page comment of 20:18 approved the text read whole.
- **P-85**: rewritten. The `RR32` sentence leaves (review-queue item 37 holds it). His preparation clause comes back. A false pointer to P-55 is replaced. Two questions for him.
- **P-86**: struck, as a one-time approval, since carried out.
- **P-88**: rewritten. The `ReadableArray2` sentence leaves for the review queue (drafted item 206).
- **P-148**: rewritten. His "ideally" comes back. One question for him on the coordinator's gloss.
- **P-150**: rewritten. Its premise is corrected (1.8 % was start-up alone; the cap is 6.4 %). The re-weighing clause goes back to his words.
- **P-151**: rewritten. Its reason is rewritten from his words, with a question to confirm it. Two defaults leave: review-queue items 188 and 177 already hold them. The "Built:" list goes to the history.

## P-10

**Before.**

> - P-10 **The APL side quest is closed: its remaining ground, tacit functions, characters and nested arrays, is not pursued.** Its sub-language expands APL to Fortress code over native arrays, and its APL microGPT program stays in the walk check (P-30).

**After.** Struck.

**Why.** His page comments settle it (rule 5's "unless his own words above already settle it", and rule 6). At 20:06 and 20:13 he said that he recognizes the entry and that it needs no investigation. He also said that it is not actionable and does not rise to the level of POSITIONS. His rule (page comments 20:10 and 20:25): an entry of POSITIONS is actionable, and a statement of the project's state at one time is not a position.

The parts, for the record:
- The title is his decision (2026-09-15T07:28:31.808Z, which answers the coordinator's 07:23:52.724Z question on the remaining APL ground: only the part that microGPT in APL needs, the rest out of scope). He calls it non-actionable now.
- The sub-language sentence is his decision of 2026-09-12T10:17:30.754Z (convert APL into efficient Fortress code, not an interpreter). Rule 1 would keep it. His word on the whole entry overrides that: with the quest closed, no work follows from it.
- "stays in the walk check (P-30)": a default that an agent landed (rule 2). Consolidation chunk P1 wrote it at `b87a17de5`, from the `fortress-repo` skill, with no word of his. His words behind P-30 (2026-10-08T17:49:22.269Z: two forward-and-backward passes, under a minute) name no program.

**What leaves POSITIONS, and where it goes.**
- The walk check's APL program goes to the review queue as **drafted item 205** (`review-queue-items.md`). The queue holds no such item: item 194 is the APL port's compile error, not the walk check.
- The closed ladder is still stated in `explorations/apl/README.md:25`, and the conversation record holds the decisions of 09-15 (`explorations/conversations/01-apl-close-and-rung-4b.md:53`). No reader loses where the side quest stands.

**History line.** Struck at his word, with his page comments of 20:06 and 20:13 and his rule of 20:10 and 20:25, reworded. The sources it rested on, each with the coordinator's message that it answered:
- 2026-09-15T07:28:31.808Z, after the 07:23:52.724Z question: only the part that microGPT in APL needs, the rest out of scope.
- 06:53:25.073Z, after the 06:47:52.588Z account of rung 4's frame stack: he wants the side quest closed.
- 2026-09-12T10:17:30.754Z, after the 10:16:25.057Z status: APL is converted into efficient Fortress code, not interpreted.

The line also says where the last clause came from and where it goes. This and every line below is given whole, as `record.py` wrote it, in "What record.py wrote".

**Questions for him.** None on the entry. Drafted item 205 asks one routine question: whether the walk check keeps the APL program.

**Pointers elsewhere.** No pointer to P-10 in `POSITIONS.md`, `FACTS.md`, `PLAN.md`, `review-queue.md` or `.claude/skills/` (grep for `P-10\b`). `HELD.md`, "Held from his page comments", 20:10, and `BOOT.md` name it as the example of his rule. They are history and need nothing.

## P-18

**Before.**

> - P-18 **He is coming round to Hsu's view that language paradigms are accidental complexity.**

**After.** Struck.

**Why.** His page comment of 20:10 settles it: strike it from the record, because it is not actionable, changes nothing about the project and is a subjective observation (rule 6). The judgement found the condensation fair but no decision (`judgement.md`, "P-18").

**What leaves POSITIONS, and where it goes.** Nothing goes to the queue. The history keeps the source. `curator-profile/evidence.md:68` holds the same remark as a background fact, independent of P-18.

**History line.** Struck at his word, page comment of 20:10. Source: 2026-09-15T09:49:52.021Z. The remark was unprompted, in his reply to the coordinator's 09:43:56.338Z text on `nat` size parameters, which says nothing of Hsu. He was coming round to Hsu's critique that each paradigm meant to solve the software crisis added accidental complexity. His exact words, for the check: "Every of these attempts to solve software crisis has ultimately led us astray and has complexified everything to the level where we are just Inventing optimizations to deal with accidental complexities that we have invented along the way."

**Questions for him.** None.

**Pointers elsewhere.** None in the five places. `HELD.md`, 20:10, names it as his example. That is history and needs nothing.

## P-55

**Before.**

> - P-55 **A size may hold arithmetic, compared by its written form once numerals are folded (item 15, 15a with (b)).** The checker accepts a sum, difference, product or power in a size. `2 3` folds to `6`, but `s0 s1` is not `s1 s0`. The class loader computes the value when it makes a class. A size name may equal a numeral, as the team's Q&A answers, so the `N[\0\]` arm of a `typecase N[\b0\]` is reachable. The library keeps the team's sizes written as products and sums. Two later array forks stand at defaults while his answers are pending: fork 3, a size known only at run time, at way 4a, where his reading of P-40 is asked; and fork 2, the bound of `Vector` and `Matrix`, at the two-trait bound (PLAN items 13 and 52).

**After.**

> - P-55 **A size may hold arithmetic, compared by its written form once numerals are folded (array fork 1, 15a with (b)).** The checker accepts a sum, difference, product or power in a size. `2 3` folds to `6`, but `s0 s1` is not `s1 s0`. The class loader computes the value when it makes a class. A size name may equal a numeral, as the team's Q&A answers, so the `N[\0\]` arm of a `typecase N[\b0\]` is reachable. The library keeps the team's sizes written as products and sums.

**Each sentence and its source.** His yes is "Item 15: 15a with (b) yes." at 2026-10-09T13:51:11.783Z (rule 1). It answers item 1 of the coordinator's 11:56:38.064Z list ("Item 15, arithmetic in sizes (array fork 1) … Recommended: 15a with (b) yes"). The list item is short; the full form is the coordinator's 07:59:01.341Z text, which I read in the transcript (`fe616d40….jsonl.parts/000.jsonl:7697`). I checked each sentence against those two texts, the ones he saw:
1. Title: 07:59:01, way 1 ("The checker compares sizes by their written form after folding numbers"), and 11:56:38. "item 15" becomes "array fork 1", the 11:56:38 text's own name: PLAN's "item 15" now names another line (`PLAN.md:74`, phase 3, item 15, the `where` clauses).
2. "accepts a sum, difference, product or power": 07:59:01 ("The specification allows sums and products in sizes"); the four operations are the specification's list (`reviews/array-forks-now.md`, Q15, citing `concrete-syntax.tex:540-547`). He saw "sums and products". The difference and the power come from the document that his yes took in, so this is a fair reading, not an addition.
3. `2 3` and `s0 s1`: 07:59:01, way 1 ("`2 3` is `6`"; "The limit: `s0 s1` and `s1 s0` don't count as equal").
4. The class loader: 07:59:01, way 1 ("and the class loader computes the value").
5. A size name and a numeral: 07:59:01, part (b), and 11:56:38 ("a size name may equal a number (part b)").
6. The library's sizes: 07:59:01 ("no library or model line changed"; "keeping the team's text").

The rewording is faithful. One place where meaning could shift: Q15's way 15a also holds "range-checks what it folds" and "one specification sentence and an Appendix I entry". The first text of the entry had both, and `55f1a1352` dropped them. Neither was in the two texts that he saw, and the scout found no sign that he read Q15 itself. So I left both out. If his yes took in Q15 whole, the two clauses belong to his decision.

**What leaves POSITIONS, and where it goes.** The last sentence, forks 3 and 2 at defaults, is an agent's default, landed and waiting for his review (rule 2). The queue already holds both: **item 30** (fork 3, way 4a, with his reading of P-40) and **item 31** (fork 2, the bound). No new item. Its "PLAN items 13 and 52" also goes: item 52 is now in PLAN-history.

**History line.** His answer "Item 15: 15a with (b) yes." (quoted, since the words are the decision) at 13:51:11.783Z, to item 1 of the coordinator's 11:56:38.064Z list, whose full form is its 07:59:01.341Z text. Each sentence was checked against those two texts and kept. The forks sentence leaves for items 30 and 31. Behind the forks' building is his question of 2026-10-09T15:10:56.122Z, which answers the coordinator's 14:56:40.919Z text: can forks 2 and 3 go into the next batch? The coordinator's 15:13:34.608Z reply then put them into batch 13 at the judgements' defaults.

**Questions for him.** None for the entry. Items 30 and 31 hold the open questions.

**Pointers elsewhere.**
- `POSITIONS.md`, P-85: "P-55 holds the forks taken before the switch-over" turns false. This apply rewrites P-85 (below).
- `FACTS.md`, F-146: "It builds P-55, with array fork 3 at its default." Still true. Optional: name item 30 for the default, which P-55 no longer states.
- `FACTS.md`, F-176: "It states P-55." Needs nothing.
- `review-queue.md`, item 30, "Home", and item 31, "Home": both cite `P-55, "A size may hold arithmetic, compared by its written ..."`. The words still open the new title. But P-55 no longer holds forks 3 and 2, so each home should drop P-55, or name it only as the decision that fork 3 builds on. Each item's "Landed" line says "on the standing go". His 15:10:56 question on 10-09 is nearer, and it could be named there (`judgement.md`, "P-55", doubts).
- `review-queue.md`, the settled list, "Item 15, arithmetic in a size (array fork 1)" (line 1179): needs nothing.
- `PLAN.md` and `.claude/skills/`: no pointer.

## P-66

**Before.**

> - P-66 **The integer principle: Java's and the JVM's defaults stay where they make sense, and are corrected where they fail high performance or mathematical precision.** The team did so with rounding and the sign of `GCD`. A hardware behaviour that bytecode can express gets its own explicit spelling, as the specification's wrapping and saturating operators do. Where the JVM prevents a correct implementation, the project gives way for now. The peers to compare are Julia, X10, Swift and Rust.

**After.**

> - P-66 **The integer principle: Java's and the JVM's defaults stay where they make sense, and are corrected where they fail high performance or mathematical precision.** The team did so with rounding. A hardware behaviour that bytecode can express gets its own explicit spelling, as the specification's wrapping and saturating operators do. Where the JVM prevents a correct implementation, the project gives way for now. The peers to compare are Julia, X10, Swift and Rust.

**Each sentence and its source.** All are from his message of 2026-09-22T07:17:57.713Z, which answers the coordinator's 07:06:49.525Z text on Swift's masking shift. I read the message whole with `show.py`. It weighs the options and makes no call: he said that he did not feel informed enough yet to decide the shifts, and that this was how he would weigh the options. The entry records the way of weighing, which is fair.
1. Title: "use Java or JVM defaults where it makes sense, but We shouldn't be shy to correct the mistakes of, of JVM when seen through the lens of high performance and mathematical precision" (quoted to show the rewording is faithful).
2. Rounding: his example ("where he deviated, for example, by the rounding"). The premise holds: the specification rounds a rational exactly halfway to the even integer (`Specification/basic-lib/numbers.tex:461-463`), where Java's `Math.round` rounds it up.
3. The explicit spelling: his words. A hardware behaviour that can be expressed in bytecode should be expressed, as with Swift's trapping operators. "Its own spelling" is the coordinator's framing of 07:06:49, which he took up ("that's interesting"). The specification has the wrapping and saturating operators (`Specification/basic-lib/basic-integers.tex:402-403`, `:426-427`).
4. Giving way: his words. If the JVM prevents such an implementation, the project stops fighting it for now, maybe not in the medium or long term.
5. The peers: his words. Swift's and Rust's reasoning; Julia, which he calls the counterpart, and X10.

**What leaves POSITIONS, and where it goes.** "and the sign of `GCD`" is dropped (rules 7 and 8). The coordinator added it in its reply of 07:18:38.151Z. As a case of the team correcting a Java default, it is false. Java has no `GCD` operator. The nonnegative result is the specification's own rule (`basic-integers.tex:553-555`). The negative answer it corrected, `0 GCD -4` giving -4, came from the team's interpreter (fixed by the revival, `d6faad28f`; P-66 scout). It goes nowhere: P-70 holds the `GCD` rule itself.

**Rules in conflict.** Rule 7 drops the coordinator's example. But his page comment of 20:18 said that the entry, read whole and not only its bold part, is "a correct and precise expression of my position". That is a yes to the whole text, `GCD` included (rule 1). I followed rules 7 and 8 here because his yes was to the statement of his position, not to the example's history. That is my reading, so it goes to him as a question.

**History line.** The `GCD` example dropped, with the reason above. The rest kept. Source: 07:17:57.713Z, reworded in the line as the five points above; the line notes that he did not yet feel informed enough to decide the shifts. Also his page comment of 2026-10-21 20:18 approving the text read whole.

**Questions for him.**
1. Your comment of 20:18 approved P-66 read whole. Its example "the sign of `GCD`" is the coordinator's, and no Java default was corrected there. Drop it, as proposed, or keep it?

**Pointers elsewhere.** `POSITIONS.md`, P-74, "(P-66)": needs nothing. No other pointer in the five places.

## P-85

**Before.**

> - P-85 **The array design's three questions are open, with no default, and return after the switch-over with array decisions A, B and D (PLAN item 13).** The three: a store per element type chosen by the factory, the size also kept as a field of the store, and a factory for a size known only at run time that returns the unsized `Array`. A is how `double[]` goes under a float vector, B where unboxed arithmetic happens, D sizes in the model's own types (P-87). Also open: why `RR64` and not `RR32`, since LLMs train at FP32 at most; the one reason given is the Python reference's float64 output. P-55 holds the forks taken before the switch-over.

**After.**

> - P-85 **The array design's three questions are open, with no default, and return after the switch-over with array decisions A, B and D (PLAN item 13).** The three: a store per element type chosen by the factory, the size also kept as a field of the store, and a factory for a size known only at run time that returns the unsized `Array`. A is how `double[]` goes under a float vector, B where unboxed arithmetic happens, D sizes in the model's own types (P-87). The whole preparation for the array work is done before the switch-over. Array fork 3, on the third question's ground, is built at a default that waits for his review (review-queue item 30).

**Each sentence and its source.**
1. Title, "open, with no default": his "Row 40: close as no decision taken." at 2026-09-25T23:36:16.868Z (quoted: the words are the decision). It answers the coordinator's 23:23:23.166Z ask, whose option was that the three stop being defaults and come back with the array design after the switch-over (rule 1). "return after the switch-over with A, B and D": 2026-09-22T05:21:45.608Z, read whole with `show.py`. He is fine with delaying the array work until after the switch-over to the one library. The message answers the coordinator's 05:03:23.486Z row table.
2. The three questions: the 23:23:23 ask's three defaults, as the judgement found them stated fairly.
3. The glosses of A, B and D: the coordinator's 05:22:20.356Z words, which he did not dispute. The judgement found them fair, so rule 7 keeps them.
4. The preparation (new; rule 1, since the text said less than he did): the same 05:21:45 message. He is fine with the array work after the switch-over, "But at the same time, like I think we should do the whole prep for the arrays." (quoted to show the rewording). The first text of the entry had this as "with plain explainers prepared beforehand", and `ab933086b` dropped it. Meaning could shift here: "the whole prep" is his phrase, and what it covers is not stated. The coordinator read it as plain explainers (review-queue item 37: "Plain explainers are to be prepared before the switch-over").
5. Fork 3 (replaces "P-55 holds the forks taken before the switch-over", rule 8): with P-55 rewritten, that pointer turns false. Corrected from its source: fork 3, a size known only at run time, is built at way 4a while his answer is pending (PLAN item 13, fork 3; review-queue item 30). Its ways include 4c, the unsized return that the third question names (`PLAN-history.md:330`, per the P-85 scout). The sentence states a default, labelled as one, because without it "open, with no default" misleads on that ground (`judgement.md`, "P-85", the tension). Fork 2, the bound, is not on the ground of the three questions, so the sentence leaves it out.

**What leaves POSITIONS, and where it goes.** The width sentence: his question of 23:29:15.074Z stands as his. Its place among the questions that return after the switch-over was the coordinator's recommendation of 23:30:06.653Z, which he did not answer (rule 2). **Review-queue item 37** holds it: "His own question, why microGPT uses `RR64` and not `RR32`, is owed an answer". No new item, but item 37 misstates the width's place (see the pointers).

**History line.** The width sentence leaves for item 37, with his question's time and the unanswered recommendation. His preparation clause comes back from 05:21:45.608Z, which answers the 05:03:23.486Z row table. The pointer to P-55 is replaced. The rest is kept, with "Row 40: close as no decision taken." at 23:36:16.868Z to the 23:23:23.166Z ask.

**Questions for him.**
1. The third question, a factory for a size known only at run time, was to come back after the switch-over with no default. Fork 3, on the same ground, has since been built at way 4a, after your question at 15:10 UTC on 10-09 whether forks 2 and 3 could go into the next batch. Does the third question still wait for the switch-over, or did that question bring it forward? Item 30 holds the way itself.
2. "The whole prep for the arrays" (05:21 UTC on 09-22): the coordinator read it as plain explainers prepared before the switch-over. Is that what you meant, or more?

**Pointers elsewhere.**
- `POSITIONS.md`, P-84, "array decision A (P-85)": needs nothing.
- `FACTS.md`, F-151: "The bound is array fork 2's default, the curator's answer pending (PLAN item 52, P-85)." This is wrong before and after this change. PLAN item 52 is now in PLAN-history, and P-85 has not held fork 2 since `ab933086b`. It needs "(PLAN item 13, fork 2; review-queue item 31)". `record.py` does not refuse this apply over it: a pointer with no quoted words is checked only for a live target.
- `FACTS.md`, F-159, "array decision A (P-85)": needs nothing.
- `PLAN.md:163`, item 13's lead: "his ruling on row 40 holds, and so does the array decisions' place after the switch-over (P-85)". Its fork 4, the width, sits under that sentence. The width's place after the switch-over is the coordinator's recommendation, not his. The lead needs to say so, and to point at item 37.
- `review-queue.md`, item 37, "Its cost: After the switch-over, by his decision." and "Needed by: … P-85 returns these forks after the switch-over". Both hold for forks 5 and 6 (decisions D and A). Neither holds for fork 4, the width.
- `review-queue.md`, item 198 ("waits on P-85", twice): needs nothing.
- `.claude/skills/`: no pointer.

## P-86

**Before.**

> - P-86 **The integration review's checks stand for the array work.** A generic `Vector` or `Matrix` body is checked against what each operation needs, with no blanket ring bound that would exclude integer arrays. An empty reduction is checked for its type and its value. A small product through `PView` and a transpose is checked, with controls. The checks: `reviews/numeric-hierarchy-integration-review.md` section 5.

**After.** Struck.

**Why.** It is a one-time approval, since carried out (rule 3). His only word is "Yes." at 2026-09-26T10:21:32.097Z. It answers the coordinator's 10:14:55.886Z ask: take Astra's review into `main` and carry its checks into batch 6's briefs. A yes committed him to the flattening and `SUM` briefs carrying its four checks. Both were done. `03f215fe4` (2026-09-29) moved the entry out as a "go carried out that carries no standing rule". That follows his rule of 2026-09-27T02:26:42.155Z: a one-off go stays out of the permanent record. `bc8902f47` (2026-09-30) put it back as a standing rule, with no reason given. The review itself says that it authorizes nothing (`reviews/numeric-hierarchy-integration-review.md:107`).

Its ring clause also changed the meaning of the review (rule 4), but the strike makes that moot. The clause kept one reason, that integers had no ring, which has been false since 2026-09-27. It dropped the live one: a copying operation, such as C4's `gather`, needs less than an arithmetic one (`:47-51`).

**What leaves POSITIONS, and where it goes.** Nothing that is his. The bound's question is **review-queue item 31**. The live reason that the clause lost is in `BOOT.md`, task 1, and not in item 31. `review-queue-items.md` proposes it as an added sub-bullet of item 31, for the coordinator to place with task 1.

**History line.** Struck as a one-time approval, since carried out, with the facts above: "Yes." at 10:21:32.097Z to the 10:14:55.886Z ask; `03f215fe4` and his rule of 09-27 02:26:42.155Z; `bc8902f47` with no reason; the ring clause's lost reason; the bound is item 31.

**Questions for him.** None for the entry. `BOOT.md`'s task 1, aligning on item 31 and P-86, is where he answers the bound.

**Pointers elsewhere.** None in the five places, so the strike is not refused. Outside them: `BOOT.md`, task 1, names P-86 and would lose that half if he approves. `reviews/item31-drafts.md`, Parts 1 and 4, propose new texts for P-86 (lines 126 and 154). The strike would replace them, which he should see beside item 31. `CLIMB-BATCH-13.md:182` ("bends the letter" of P-86) is history.

## P-88

**Before.**

> - P-88 **The model's vocabulary leaves `+`, `-` and `MAX` between an array and a scalar to the library's scalar block, and its diagonal keeps its own product.** `Diag` extends `Matrix` and overrides `mul`, as the type system promises (row 299). A read-only matrix trait, `ReadableArray2` under `Array2`, is a library change for a later ledger row, not a vocabulary hack.

**After.**

> - P-88 **The model's vocabulary leaves `+`, `-` and `MAX` between an array and a scalar to the library's scalar block, and its diagonal keeps its own product.** `Diag` extends `Matrix` and overrides `mul`, as the type system promises (row 299).

**Each sentence and its source.**
1. Title: his "Okay, agreed. That is the plan." at 2026-09-24T18:30:37.463Z (`show.py`; quoted, the words are the decision). It answers the coordinator's 18:25:56.634Z ask: the six scalar drops approved as landed, and the diagonal's product back in the override shape if Friday's probe passed. The probe passed (`405a31b0e`, 2026-09-25). The drops are the six copies of `+`, `-` and `MAX` between an array and a scalar (row 39's text of 16:32:34.428Z, per the P-88 scout).
2. `Diag` and `mul`: the same yes. The shape is his own idea, at 18:13:14.832Z, answering the coordinator's 18:07:05.518Z text: why can the diagonal not be a matrix with its own optimized operations? "as the type system promises" condenses his "this promise that with these strong types, you can define like a diagonal matrix" (same message). "(row 299)": the ledger row of the override, POSITIVE-VERIFIED (`explorations/fortress-gap-ledger.md:918`, per the P-88 scout).

**Rules that fit badly.** Rule 3 could also apply: he approved landed work and a restore on a condition, and both are carried out. I kept the entry because it carries a standing rule. A worker who edits the vocabulary would otherwise put the scalar operators back, or drop the override. Rule 2 does not fit the `ReadableArray2` sentence, though the judgement put it there: nothing landed, no row, no code. Rule 5 fits it better: it has no source of his. Either rule takes it out of POSITIONS.

**What leaves POSITIONS, and where it goes.** The `ReadableArray2` sentence. It was the coordinator's proposal, in the explanation part of its 18:25:56 message, not in the ask that he agreed to. No ledger row was filed. His question behind it is his: at 18:25:08.391Z he asked whether the library has an immutable matrix, since the diagonal is read-only. He asked again at 2026-10-20T13:17:04.645Z. The immutable-arrays probe of 10-20 then chose the other shape: a standalone `ImmutableArray2`, "not a `ReadableArray2`/`ReadableArray3` above both kinds" (`perf-probes/immutable-arrays/REPORT.md`, "Decisions", 1). Its questions are owed to him (`BOOT.md`). The queue has no item on it: item 202 is the api's commented ranks, a neighbour. So it goes as **drafted item 206**.

**History line.** The `ReadableArray2` sentence leaves for drafted item 206, with his two questions by time. The rest is kept, with "Okay, agreed. That is the plan." at 18:30:37.463Z to the 18:25:56.634Z ask, and the shape from his 18:13:14.832Z, answering 18:07:05.518Z.

**Questions for him.** None for the entry. Drafted item 206 holds the read-only matrix.

**Pointers elsewhere.** `POSITIONS.md`, P-27, "He had to find the diagonal's override himself (P-88)": needs nothing, since the override stays. No other pointer in the five places. `process-engineering/library-extension-rule-archaeology.md:198` reads the `ReadableArray2` sentence. It is history.

## P-148

**Before.**

> - P-148 **The checker's speed comes right after its correctness.** A rung that changes the checker measures how the change affects the time that the checker needs. First the rung makes the change correct. Then it does a second pass that makes the checker faster. This pass must not change the checker's results: the checker accepts and refuses the same programs as before, with the same errors at the same places. The rung's skeptic checks the time and the results. This work is part of the rung, not a separate step after the landing. Built in the `fortress-repo` skill (`compiler.md`), the batch script's rung and skeptic prompts, and the batch manual.

**After.**

> - P-148 **The checker's speed comes right after its correctness.** A rung that changes the checker measures how the change affects the time that the checker needs. First the rung makes the change correct. Then it does a second pass that makes the checker faster. This pass must not change the checker's results: the checker accepts and refuses the same programs as before, with the same errors at the same places. Ideally the rung does this work itself, and its skeptic checks the time and the results, rather than a manual step after the landing. Built in the `fortress-repo` skill (`compiler.md`), the batch script's rung and skeptic prompts, and the batch manual.

**Each sentence and its source.**
1. Title: 2026-10-14T19:06:22.989Z, his yes to recording the checker's performance as a high priority right after its correctness. It answers the coordinator's 19:04:27.473Z question whether to put it in POSITIONS.
2. to 4. Measure, then make it correct, then make it faster: his rephrasing at 19:16:45.667Z: after checker changes we always measure the performance impact, and after the initial correctness pass we follow it up with a performance optimization pass (reworded; `show.py`).
5. The same results: the coordinator's gloss of 19:18:57.169Z. It answered his question at 19:18:46.953Z, what "keeping every answer" means and what effect is wanted. At 19:20:20.984Z he asked only for plainer words (ASD-STE100, halfway). He did not reject the meaning. Kept by rule 7, read as follows. An optimization pass that changed the checker's verdicts would not be an optimization, so the gloss spells out his "performance optimization pass" and neither narrows nor adds to it. The skill's own definition is the same: "The checker's results are the programs that it accepts and refuses, and each error with its text and its place" (`.claude/skills/fortress-repo/references/compiler.md`, "The checker's time"). This is my reading, so it goes to him as a question.
6. "Ideally …" (changed; rule 1): his words at 19:16:45: "Ideally this would be done within the worker's rung and validated by the skeptic. Not as an extra post landing manual process that we are doing now." (quoted to show the rewording). The old text made his "ideally" a must.
7. "Built in …": status, not his. Its source is the commits `315420c02`, `b875d2de7`, `11fb10c64` and `dc06efbbc` (history block of 2026-10-15 01:08Z). The places exist today (`compiler.md`, "The checker's time"; `climb-batch-workflow.js`, the rung and skeptic prompts; P-148 scout). Rule 5 would make this a question for him. That does not fit a line that a commit bears out, so I kept it as the entry's form asks (see "The rules", below).

**What leaves POSITIONS, and where it goes.** Nothing.

**History line.** "Ideally" comes back from 19:16:45.667Z. The rest is kept. The sources that the blocks lacked: 19:06:22.989Z, answering 19:04:27.473Z; his question at 19:18:46.953Z, after the rewritten entry of 19:17:31.763Z; the coordinator's 19:18:57.169Z answer as the source of the same-results clause, and his 19:20:20.984Z request for plainer words; the same idea four days before, at 2026-10-10T05:27:34.812Z, which answers the coordinator's 04:07:38.892Z question where the fix should go: a part of the batch should have done this optimization.

**Questions for him.**
1. The clause "This pass must not change the checker's results … the same errors at the same places" is the coordinator's answer to your question at 19:18 UTC on 10-14. You asked for plainer words, not another meaning. Keep it as your rule?
2. With "ideally" back, may the speed pass fall outside the rung when the rung cannot do it, as climb batch 13b's fix did? Or did you mean always inside? The skill's steps (`compiler.md`, steps 1 to 6) ask for it in every rung that changes the checker.

**Pointers elsewhere.**
- `POSITIONS.md`, P-150, "(P-148)": needs nothing.
- `PLAN.md:457` ("a checker change under P-148") and `:481` ("P-148's second pass"): need nothing.
- `review-queue.md`, item 184 (lines 1088, 1093): needs nothing.
- `.claude/skills/coordinator/references/sources.md:111` and `.claude/skills/fortress-repo/references/sources.md:670`, `:673`: they cite P-148 as the source of `compiler.md`'s steps and of the skeptic's count stage. They need nothing unless his answer to question 2 allows the pass after the landing. Then `compiler.md` would say when.

## P-150

**Before.**

> - P-150 **No resident compiler is built.** One warm JVM that serves many Fortress commands, as Scala 2's `fsc` did, would save at most 1.8 % of the workers' time, so the speed work goes to the checker itself (P-148). It is weighed again only if that share grows much, for example once programs are compiled often after the switch-over.

**After.**

> - P-150 **No resident compiler is built.** One warm JVM that serves many Fortress commands, as Scala 2's `fsc` did, would save little: the suites already run in one JVM each, and the commands that workers type took 6.4 % of the workers' time, their start-up alone at most 1.8 %. So the speed work goes to the checker itself (P-148). It is not attempted again unless something significant changes.

**Each sentence and its source.**
1. Title: his yes to the coordinator's conclusion, stated fairly (rule 1). The coordinator wrote at 2026-10-16T08:56:38.403Z that a resident compiler is not worth building and that it will not propose one. He wrote at 09:15:00.365Z that the research had shown why it is not worth doing, and that it should be recorded so that we do not attempt it again unless something significant changes (`show.py`, reworded).
2. The premise (corrected; rules 4 and 8): from the report, `process-engineering/fresh-jvm-commands.md`, "Summary" and "What a resident compiler could save, at most" (line 182, read at the source). 1.8 % is the saving from removing start-up alone. A process that also kept the library loaded and the checker warm, which is what `fsc` did, is capped by the commands' whole time, 6.4 % of the workers' lifetime. The report's most generous reading of the waits gives 11.6 %, so the entry says "took 6.4 %", as F-234 does, and not "at most". The coordinator's 08:56:38 summary to him gave both figures. "the suites already run in one JVM each": the coordinator's answer of 07:40:53.963Z to his question of 07:39:59.688Z on the test suites, and F-234. That question was about the suites, so the reader needs this clause.
3. "So the speed work goes to the checker itself (P-148)": the coordinator's 08:56:38 conclusion ("The lever is the checker's own speed, which is rung S"). He took it in at 09:15.
4. "It is not attempted again unless something significant changes" (changed; rule 7): his own words of 09:15, reworded. The old clause, "only if that share grows much, for example once programs are compiled often after the switch-over", was the coordinator's (09:16:12.388Z: "The wording is mine"), and it narrowed his "something significant" to one measure.

**What leaves POSITIONS, and where it goes.** The coordinator's narrowing example. It goes nowhere.

**History line.** The premise corrected from the report, line 182, with the 08:56:38 summary that gave both figures. The suites' clause from 07:40:53.963Z and F-234. The re-weighing clause from 09:15:00.365Z, with the coordinator's narrowing dropped. The sources the block lacked: his question of 07:39:59.688Z, after the coordinator's 07:31:44.128Z summary of checker-speed techniques; his go of 07:45:26.869Z to measure it from the transcripts, which answers the coordinator's 07:40:53.963Z.

**Questions for him.** None that the evidence leaves open. One limit of the report, for him to know: it did not look inside the suites, builds and stages, 47.8 % of the command time, and it leaves that to his word (`fresh-jvm-commands.md`, "Decisions not taken"). The coordinator's 08:56:38 summary named the 47.8 % but not that the report left it unexamined. The entry stays within the report's scope.

**Pointers elsewhere.** `FACTS.md`, F-234, "(P-150)": it already gives 6.4 % and 1.8 %, as the new text does, and needs nothing. No other pointer in the five places.

## P-151

**Before.**

> - P-151 **Only the `where` forms the team wrote down are built.** A trait that extends another under a `where` condition is that type only where the condition holds, and its members are checked under the condition; a method's `where` condition bounds its static parameters; and the team's comment `AnyList comprises List[\E\] where [\E\]` becomes live. `SUM`'s fusion with `MAX` and `MIN` stays, the team's commented generic `distribute` measured for its two type errors; the rest of `AnyList` moves into `List`. Why: build what the team left, and add nothing it did not. Built: the method condition and the generic `distribute`, by climb batch 17's rung L (`2b1cd8e63`), and `AnyList`'s clause, by its rung A (`24db899fa`), with `AnyList`'s bodies respelled within `AnyList`, not moved into `List`; conditional extension in the compiled checker, by climb batch 18's rung X (`372b9bf6a`), and the `where` forms' checks where they apply, by its rung K (`396e4ed8d`). Still to build: the members scoped to the condition, since a member checked under it stays callable where it fails (row 773); where an object's value parameters fall under the condition (judge-review.1 of climb batch 18, its default taken: with the members); walk's half (row 774); and the code generator's half (row 701), after the switch-over (PLAN, phase 3, the `where` clauses' line).

**After.**

> - P-151 **Only the `where` forms the team wrote down are built.** A trait that extends another under a `where` condition is that type only where the condition holds, and its members are checked under the condition; a method's `where` condition bounds its static parameters; and the team's comment `AnyList comprises List[\E\] where [\E\]` becomes live. `SUM`'s fusion with `MAX` and `MIN` stays, the team's commented generic `distribute` measured for its two type errors; the rest of `AnyList` moves into `List`. Why: a feature with little support in the team's work bends the language beyond what he can review; one is built where the team left enough design intent for it, or where it is on the critical path to running fast compiled. Still to build: the rest of `AnyList` moved into `List`, which climb batch 17 built otherwise (review-queue item 188); the members scoped to the condition, since a member checked under it stays callable where it fails (row 773); walk's half (row 774); and the code generator's half (row 701), after the switch-over (PLAN, phase 3, the `where` clauses' line).

**Each sentence and its source.**
1. Title, and the decision through "moves into `List`": his "3 for the where clauses." at 2026-10-16T16:42:39.606Z (`show.py`; quoted, the words are the decision). It chooses option 3 of the coordinator's 15:55:06.719Z ask: build the forms the team wrote down and stop there; keep the fusion and measure the team's commented fix; fix the rest of `AnyList` by moving its operations into `List`. The conditional-extension rule is his yes at 12:35:52.756Z to the coordinator's 12:28:59.751Z text: the rules feel solid, and if we know how to build it, he would go for it. The fusion stays because of his 15:53:43.352Z, which answers the coordinator's 14:09:23.192Z report that removed it: he does not want it deleted as if it were not needed (rule 1).
2. "Why" (rewritten; rule 4): his words of 11:18:08.438Z, read whole with `show.py`. A language feature with little support in the team's work bends the language beyond where he is comfortable, because he cannot review it without learning much more about language design. If the team left enough breadcrumbs or design intent, "we might as well do it". If it is on the critical path to having it run fast in a compiler, "we will do it". The coordinator's "add nothing it did not" dropped the second condition (`judgement.md`, "P-151"). Meaning could shift here. He said this at 11:18, before the three options existed, about whether to build `where` clauses at all. Whether these are his reasons for choosing option 3 over option 1 ("go past it where needed") is not in the evidence. So the rewording goes to him as a question (rule 4: a wording follows from his words, but it is still a reading).
3. "Still to build" (status; the entry's form): the rest of `AnyList` into `List` is still owed by his option 3. Climb batch 17's rung A built it otherwise, which is review-queue item 188, with its default. Rows 773, 774 and 701 are NEGATIVE-VERIFIED and worded as the entry says (`fortress-gap-ledger.md:227`, `:228`, `:793`, per the P-151 scout). "PLAN, phase 3, the `where` clauses' line" is `PLAN.md:74`.

**What leaves POSITIONS, and where it goes.**
- "with `AnyList`'s bodies respelled within `AnyList`, not moved into `List`": a default that an agent landed, waiting for his review (rule 2). **Review-queue item 188** holds it, with its default. The entry no longer contradicts itself: the decision says the bodies move, and the status says the move is still owed and was built otherwise.
- "where an object's value parameters fall under the condition (…, its default taken: with the members)": a default that an agent landed (rule 2). **Review-queue item 177** holds it. It leaves "Still to build" as well, since item 177 answers it with row 773 (that item's "Needed by").
- "Built: …": history (`record.md`, question 3). The list goes to the history line with its rungs and commits, and the tool keeps the old line verbatim under it.

**History line.** The reason rewritten from 11:18:08.438Z, after the coordinator's 11:17:41.076Z restart notice, with the condition that "add nothing it did not" dropped. The decision kept from 16:42:39.606Z to the 15:55:06.719Z ask, from 12:35:52.756Z to 12:28:59.751Z, and from 15:53:43.352Z to 14:09:23.192Z. The two defaults leave for items 188 and 177. The built list, with rungs L, A, X and K and their commits.

**Questions for him.**
1. The reason, rewritten from your words of 11:18 UTC on 10-16: a feature with little support in the team's work bends the language beyond what you can review; it is built where the team left enough design intent for it, or where it is on the critical path to running fast compiled. Is that why you chose option 3? Should the critical-path half stand, since you turned down option 1, going past the team's forms where needed?

**Pointers elsewhere.**
- `POSITIONS.md`, P-154, "(P-151)": needs nothing.
- `FACTS.md`, F-242, "The fusion stays (P-151)": needs nothing.
- `PLAN.md:74`, `:92`, `:457`, `:472`: need nothing. `PLAN.md:464` (gather.3 of climb batch 17, "P-151's 'Still to build' is left for the coordinator") is a stale line of a review list. It needs nothing from this change.
- `review-queue.md`, item 188, "Landed": its default would rewrite P-151's sentence to "the rest of `AnyList` stays in `AnyList`, respelled under the live clause". That fits this proposal: the entry now names item 188, and his answer to item 188 decides the sentence. Items 175, 177 and 178, line 33 ("Kind"), and the settled lines 1215 and 1219 need nothing.
- `.claude/skills/coordinator/references/sources.md:118` and `.claude/skills/fortress-repo/references/sources.md:700`, `:701`, `:712`, `:713`: they cite P-151 with their own rungs and commits, and need nothing.

## What record.py wrote

**How it ran.** The scratch root `scratchpad/positions-audit/fix/root/` held copies of the four record files: `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `FACTS-history.md`, from `explorations/coordinator/`. Every other path in it is a symbolic link into the real tree, so that the `from` paths resolve. The tool was the real `explorations/coordinator/tools/record.py`, run with `--root` on that copy and with `GIT_DIR` set to the real repository, read only, so that `check --base` can read the base. Before the apply, `check --base HEAD` on the copy gave 0 failures and 85 entries (`fix/check-before.txt`). The items drafted for the queue are numbered 205 and 206 provisionally, since the queue's highest is 204. After this file was finished, the apply file in this folder was run again on a fresh copy (`fix/root2/`): the same `POSITIONS.md`, and the same history but for the time, so the `from` headings it cites still resolve. The commands, from the scratch folder:

    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py apply corrections.apply --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base 2681a035a --root root

**apply** (`fix/apply-out.txt`), exit 0:

    P-10: removed
    P-18: removed
    P-86: removed
    P-55: rewritten
    P-66: rewritten
    P-85: rewritten
    P-88: rewritten
    P-148: rewritten
    P-150: rewritten
    P-151: rewritten

**check --base 2681a035a** (`fix/check-after.txt`), exit 0. `2681a035a` was HEAD at the run, and the four record files are the same there as at the copy. The tool reported:

    record.py check: FACTS.md 198 entries, POSITIONS.md 82 entries; 0 failures; reported: size 2

What changed in it, against the run before the apply:
- POSITIONS: 85 entries, now 82. Over 600 characters: 19 entries before, 18 now.
- P-55 (726 characters) is under 600 now. P-151 is 1354, now 1095.
- P-148 is 654, now 666; P-85 is 648, now 653. The size is reported, never refused.
- FACTS's list is unchanged, and `FACTS.md` and `FACTS-history.md` are byte for byte the same (`cmp`).

**Refusals.** None. No remove was refused for a pointer: no entry of FACTS or POSITIONS points to P-10, P-18 or P-86. No pointer words needed refreshing: P-55's title changed only after its opening words, which other places quote, and no entry of the record quotes it.

**POSITIONS.md.** Three lines are gone: P-10, P-18 and P-86. Seven are rewritten as in the "After" texts above (`fix/POSITIONS.diff`). The blocks that it appended to `POSITIONS-history.md`, verbatim (`fix/history-blocks.txt`; the time is the trial's clock, and a real apply would stamp its own and name its own `by`):

```
### P-10

2026-10-21 22:07Z · removed · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-10" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-10" · by the correction trial's writer (Opus), proposed for his review: struck at his word: on the trial's page, 2026-10-21 20:06 and 20:13 UTC, he knows this and it needs no investigation, but it is not actionable and does not belong in POSITIONS; his rule there, 20:10 and 20:25 UTC: an entry of POSITIONS is actionable, and a statement of the project's state at one time is not one. Its sources: 2026-09-15T07:28:31.808Z, answering the coordinator's 07:23:52.724Z question whether the remaining APL ground is worth climbing: only the part that microGPT in APL needs, the rest out of scope; 2026-09-15T06:53:25.073Z, answering the coordinator's 06:47:52.588Z account of rung 4's frame stack: he wants the side quest closed; 2026-09-12T10:17:30.754Z, after the coordinator's 10:16:25.057Z status: APL is converted into efficient Fortress code, not interpreted. Its last clause, the APL program in the walk check, was consolidation chunk P1's (`b87a17de5`), taken from the fortress-repo skill with no word of his; it goes to the review queue as a drafted item. The closed ladder stays in `explorations/apl/README.md`.

- P-10 **The APL side quest is closed: its remaining ground, tacit functions, characters and nested arrays, is not pursued.** Its sub-language expands APL to Fortress code over native arrays, and its APL microGPT program stays in the walk check (P-30).

### P-18

2026-10-21 22:07Z · removed · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-18" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-18" · by the correction trial's writer (Opus), proposed for his review: struck at his word: on the trial's page, 2026-10-21 20:10 UTC, it is a subjective observation, not actionable, and changes nothing about the project. Its source: 2026-09-15T09:49:52.021Z, unprompted, in his reply to the coordinator's 09:43:56.338Z text on `nat` size parameters, which says nothing of Hsu: he is coming round to Hsu's critique that each paradigm meant to solve the software crisis added accidental complexity.

- P-18 **He is coming round to Hsu's view that language paradigms are accidental complexity.**

### P-86

2026-10-21 22:07Z · removed · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-86" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-86" · by the correction trial's writer (Opus), proposed for his review: struck as a one-time approval, since carried out: his only word is "Yes." at 2026-09-26T10:21:32.097Z, to the coordinator's 10:14:55.886Z ask to take Astra's review into `main` and carry its checks into batch 6's briefs, which they carried. `03f215fe4` moved it out as a go carried out, by his rule of 2026-09-27T02:26:42.155Z that a one-off go stays out of the permanent record; `bc8902f47` put it back as a standing rule, with no reason given. Its ring clause kept only the review's reason that integers had no ring, false since 2026-09-27, and lost the live one, that a copying operation needs less than an arithmetic one (`reviews/numeric-hierarchy-integration-review.md:47-51`); the bound is review-queue item 31.

- P-86 **The integration review's checks stand for the array work.** A generic `Vector` or `Matrix` body is checked against what each operation needs, with no blanket ring bound that would exclude integer arrays. An empty reduction is checked for its type and its value. A small product through `PView` and a transpose is checked, with controls. The checks: `reviews/numeric-hierarchy-integration-review.md` section 5.

### P-55

2026-10-21 22:07Z · rewritten · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-55" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-55" · by the correction trial's writer (Opus), proposed for his review: his answer "Item 15: 15a with (b) yes." at 2026-10-09T13:51:11.783Z, to item 1 of the coordinator's 11:56:38.064Z list of open decisions, whose full form is its 07:59:01.341Z text (ways 15a to 15d, and part (b)); each sentence checked against those two texts, which are what he saw, and kept; "item 15" relabelled array fork 1, since PLAN's item 15 now names another line. The last sentence leaves: forks 3 and 2 stand at defaults that climb batch 13 built while his answers are pending, review-queue items 30 and 31. Behind their building is his question of 2026-10-09T15:10:56.122Z, answering the coordinator's 14:56:40.919Z text, whether forks 2 and 3 can go into the next batch; the coordinator's 15:13:34.608Z reply put them into batch 13 at the judgements' defaults. Its "PLAN item 52" is now in PLAN-history.

- P-55 **A size may hold arithmetic, compared by its written form once numerals are folded (item 15, 15a with (b)).** The checker accepts a sum, difference, product or power in a size. `2 3` folds to `6`, but `s0 s1` is not `s1 s0`. The class loader computes the value when it makes a class. A size name may equal a numeral, as the team's Q&A answers, so the `N[\0\]` arm of a `typecase N[\b0\]` is reachable. The library keeps the team's sizes written as products and sums. Two later array forks stand at defaults while his answers are pending: fork 3, a size known only at run time, at way 4a, where his reading of P-40 is asked; and fork 2, the bound of `Vector` and `Matrix`, at the two-trait bound (PLAN items 13 and 52).

### P-66

2026-10-21 22:07Z · rewritten · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-66" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-66" · by the correction trial's writer (Opus), proposed for his review: the example "the sign of `GCD`" dropped: it is the coordinator's, added in its reply of 2026-09-22T07:18:38.151Z, and no Java default was corrected there: Java has no `GCD` operator, the nonnegative result is the specification's own (`Specification/basic-lib/basic-integers.tex:553-555`), and the -4 was the team's interpreter. The rest kept. Source: 2026-09-22T07:17:57.713Z, his way of weighing the shift operators, answering the coordinator's 07:06:49.525Z text on Swift's masking shift: keep Java's and the JVM's defaults where they make sense, correct them where they fail high performance or mathematical precision, as the team did with rounding; give a hardware behaviour that bytecode can express its own spelling; give way where the JVM prevents it, for now; compare Julia and X10 beside Swift and Rust; he did not yet feel informed enough to decide the shifts themselves. On the trial's page, 2026-10-21 20:18 UTC, he called the entry, read whole, a correct and precise statement of his position; the drop is put to him as a question.

- P-66 **The integer principle: Java's and the JVM's defaults stay where they make sense, and are corrected where they fail high performance or mathematical precision.** The team did so with rounding and the sign of `GCD`. A hardware behaviour that bytecode can express gets its own explicit spelling, as the specification's wrapping and saturating operators do. Where the JVM prevents a correct implementation, the project gives way for now. The peers to compare are Julia, X10, Swift and Rust.

### P-85

2026-10-21 22:07Z · rewritten · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-85" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-85" · by the correction trial's writer (Opus), proposed for his review: the width sentence leaves: his question of 2026-09-25T23:29:15.074Z, after the coordinator's 23:27:51.239Z note on `FZZ32Vector`, why `RR64` and not `RR32` since LLMs train at FP32 at most, stands, but its place among the questions that return after the switch-over was the coordinator's recommendation of 23:30:06.653Z, which he did not answer; it is review-queue item 37 (PLAN item 13, fork 4). His preparation clause put back, from 2026-09-22T05:21:45.608Z, answering the coordinator's 05:03:23.486Z row table: he is fine with the array work after the switch-over, and the whole preparation for it is done before. "P-55 holds the forks taken before the switch-over" replaced, since P-55 no longer holds them. The rest kept: his answer "Row 40: close as no decision taken." at 2026-09-25T23:36:16.868Z, to the coordinator's 23:23:23.166Z ask with that recommendation; and the 05:21:45 message for A, B and D after the switch-over.

- P-85 **The array design's three questions are open, with no default, and return after the switch-over with array decisions A, B and D (PLAN item 13).** The three: a store per element type chosen by the factory, the size also kept as a field of the store, and a factory for a size known only at run time that returns the unsized `Array`. A is how `double[]` goes under a float vector, B where unboxed arithmetic happens, D sizes in the model's own types (P-87). Also open: why `RR64` and not `RR32`, since LLMs train at FP32 at most; the one reason given is the Python reference's float64 output. P-55 holds the forks taken before the switch-over.

### P-88

2026-10-21 22:07Z · rewritten · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-88" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-88" · by the correction trial's writer (Opus), proposed for his review: the `ReadableArray2` sentence leaves: it was the coordinator's proposal in the explanation of its 2026-09-24T18:25:56.634Z message, not in the ask that he agreed to, and no ledger row was filed. His question behind it, 18:25:08.391Z, whether there is an immutable matrix since the diagonal is read-only, asked again at 2026-10-20T13:17:04.645Z, goes to the review queue as a drafted item beside the immutable-arrays probe (`perf-probes/immutable-arrays/REPORT.md`, "Decisions", 1). The rest kept: his "Okay, agreed. That is the plan." at 2026-09-24T18:30:37.463Z, to the coordinator's 18:25:56.634Z ask (the six scalar drops approved as landed; the diagonal's product back in the override shape if the probe passed, which it did, `405a31b0e`); the shape is his own question of 18:13:14.832Z, after the coordinator's 18:07:05.518Z text: why the diagonal cannot be a matrix with its own optimized operations.

- P-88 **The model's vocabulary leaves `+`, `-` and `MAX` between an array and a scalar to the library's scalar block, and its diagonal keeps its own product.** `Diag` extends `Matrix` and overrides `mul`, as the type system promises (row 299). A read-only matrix trait, `ReadableArray2` under `Array2`, is a library change for a later ledger row, not a vocabulary hack.

### P-148

2026-10-21 22:07Z · rewritten · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-148" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-148" · by the correction trial's writer (Opus), proposed for his review: his "ideally" put back: at 2026-10-14T19:16:45.667Z he rephrased the entry: after each checker change, measure its effect on performance; after the correctness pass, follow with an optimization pass; ideally within the worker's rung and checked by the skeptic, not as a manual step after the landing. The rest kept. Its other sources: his yes at 19:06:22.989Z to the coordinator's 19:04:27.473Z question whether to record the priority in POSITIONS; his question at 19:18:46.953Z what "keeping every answer" means, after the coordinator's rewritten entry of 19:17:31.763Z; the coordinator's answer of 19:18:57.169Z is the source of the clause on the same results, which he then asked only to put in plainer words (19:20:20.984Z); and the same idea four days before, 2026-10-10T05:27:34.812Z, answering the coordinator's 04:07:38.892Z question where the fix should go: a part of the batch should have done this optimization.

- P-148 **The checker's speed comes right after its correctness.** A rung that changes the checker measures how the change affects the time that the checker needs. First the rung makes the change correct. Then it does a second pass that makes the checker faster. This pass must not change the checker's results: the checker accepts and refuses the same programs as before, with the same errors at the same places. The rung's skeptic checks the time and the results. This work is part of the rung, not a separate step after the landing. Built in the `fortress-repo` skill (`compiler.md`), the batch script's rung and skeptic prompts, and the batch manual.

### P-150

2026-10-21 22:07Z · rewritten · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-150" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-150" · from `explorations/coordinator/process-engineering/fresh-jvm-commands.md`, "What a resident compiler could save, at most" · by the correction trial's writer (Opus), proposed for his review: premise corrected from its report: 1.8 % is the saving from start-up alone, and a warm process that also keeps the library loaded and the checker warm, as `fsc` did, is capped by the commands' whole 6.4 % (the report's line 182), which the coordinator's summary to him of 2026-10-16T08:56:38.403Z also gave; that the suites already run in one JVM each is the coordinator's answer of 07:40:53.963Z and F-234's. The re-weighing clause put to his words of 09:15:00.365Z: record it so that it is not attempted again unless something significant changes; the coordinator's "only if that share grows much, for example once programs are compiled often after the switch-over" narrowed them and is dropped. Its other sources: his question of 2026-10-16T07:39:59.688Z, after the coordinator's 07:31:44.128Z summary of checker-speed techniques, whether a resident compiler like Scala 2's could speed up compiling the test suites; his go to measure it from the transcripts, 07:45:26.869Z, answering the coordinator's 07:40:53.963Z.

- P-150 **No resident compiler is built.** One warm JVM that serves many Fortress commands, as Scala 2's `fsc` did, would save at most 1.8 % of the workers' time, so the speed work goes to the checker itself (P-148). It is weighed again only if that share grows much, for example once programs are compiled often after the switch-over.

### P-151

2026-10-21 22:07Z · rewritten · from `explorations/coordinator/positions-audit/trial/evidence/corrections.md`, "P-151" · from `explorations/coordinator/positions-audit/trial/evidence/judgement.md`, "P-151" · by the correction trial's writer (Opus), proposed for his review: the reason rewritten from his words of 2026-10-16T11:18:08.438Z, after the coordinator's 11:17:41.076Z restart notice: a feature with little support in the team's work bends the language beyond what he can review; it is worth building if the team left enough design intent for it, and it will be built if it is on the critical path to running fast compiled; the coordinator's "add nothing it did not" dropped that condition. The decision kept: his "3 for the where clauses." at 16:42:39.606Z, to option 3 of the coordinator's 15:55:06.719Z ask; the conditional-extension rule, his yes at 12:35:52.756Z to the coordinator's 12:28:59.751Z rule; the fusion kept after his 15:53:43.352Z, answering the coordinator's 14:09:23.192Z report that removed it: he does not want it deleted as if it were not needed. Two defaults leave: `AnyList`'s bodies respelled within `AnyList`, review-queue item 188, and an object's value parameters checked with the members, item 177. The built list goes to this history: the method condition and the generic `distribute` (climb batch 17's rung L, `2b1cd8e63`), `AnyList`'s clause (its rung A, `24db899fa`), conditional extension in the compiled checker (climb batch 18's rung X, `372b9bf6a`) and the `where` forms' checks where they apply (its rung K, `396e4ed8d`).

- P-151 **Only the `where` forms the team wrote down are built.** A trait that extends another under a `where` condition is that type only where the condition holds, and its members are checked under the condition; a method's `where` condition bounds its static parameters; and the team's comment `AnyList comprises List[\E\] where [\E\]` becomes live. `SUM`'s fusion with `MAX` and `MIN` stays, the team's commented generic `distribute` measured for its two type errors; the rest of `AnyList` moves into `List`. Why: build what the team left, and add nothing it did not. Built: the method condition and the generic `distribute`, by climb batch 17's rung L (`2b1cd8e63`), and `AnyList`'s clause, by its rung A (`24db899fa`), with `AnyList`'s bodies respelled within `AnyList`, not moved into `List`; conditional extension in the compiled checker, by climb batch 18's rung X (`372b9bf6a`), and the `where` forms' checks where they apply, by its rung K (`396e4ed8d`). Still to build: the members scoped to the condition, since a member checked under it stays callable where it fails (row 773); where an object's value parameters fall under the condition (judge-review.1 of climb batch 18, its default taken: with the members); walk's half (row 774); and the code generator's half (row 701), after the switch-over (PLAN, phase 3, the `where` clauses' line).
```

**What the tool could not do.** It has no way to put a source back into the history of an entry whose text does not change. An apply line equal to the entry is skipped, and a call that changes nothing is refused. Tried on the copy with P-30's line unchanged and a note, the tool answered `record.py apply: nothing changes`, exit 1, and wrote nothing (`fix/probe-unchanged-out.txt`). In this trial every kept entry also changed, so all 19 of the judgement's sources went into change blocks. In the full run, an entry kept word for word has no route for its sources. Two examples: P-66, if he keeps "the sign of `GCD`"; and an entry as P-148 would have been without its "ideally". A provenance-only block, such as a `note N` command, is needed first.

**What check does not see.** It checks pointers only inside FACTS and POSITIONS, and only for a live target and its quoted words. The stale places named under each entry's pointers pass:
- F-151's "(PLAN item 52, P-85)": P-85 is live, but it does not hold fork 2.
- PLAN item 13's lead.
- Review-queue items 30, 31 and 37.

## Where the trial's evidence was not enough

The question was whether the ten reports and the judgement are enough to correct the record. For classing each part and giving each part its source, they were: every class and every source line here comes from them, and nothing in them was wrong. For writing the corrected text, they were not enough in six ways.

1. **Checking a wording needed the full texts that he saw.** The evidence quotes them in part.
   - P-55: rule 1 checks the text against what he approved. The judgement checked it against way 15a in `reviews/array-forks-now.md`, Q15. He saw the coordinator's 07:59:01 and 11:56:38 texts, and I read the first in the transcript. It differs from Q15: it has no range check and no specification revision. That decides which clauses are his.
   - P-150: the coordinator's 08:56:38 and 09:16:12 texts had to be read whole.
   - P-151: his 11:18:08 message had to be read whole, since the evidence quotes it in part.
2. **Some premises lie outside the trace.**
   - P-66's `GCD`: the scout marked the Java default as thin. Settling it needed the specification (`basic-integers.tex:553-555`) and the interpreter's `gcd` (`interpreter/glue/prim/Int.java:320`). It also needed what Java offers: no `GCD` operator, and a nonnegative `BigInteger.gcd`. That last point is my knowledge of Java's library, not checked in this tree.
   - P-150: its premise needed the report itself, at the line that the judgement named (line 182), and its "Summary" for the 11.6 % reading.
3. **Where a leaving part goes.** The evidence names items 177, 188 and 31. It does not name items 30 and 37, or the immutable-arrays probe that P-88's sentence belongs beside. Every rule-2 part needed a read of `review-queue.md`, and the scouts' brief did not ask for one. For the full run, the reader should name the queue item for each default, or say that there is none.
4. **Pointers.** The evidence does not list them. The grep found the stale ones: F-151, PLAN item 13's lead, and items 30, 31 and 37.
5. **What only he can settle.** These are the questions above. No more evidence settles them, because each asks what he meant or whether a reading is his:
   - P-66: the `GCD` example against his 20:18 approval.
   - P-85: the third question against fork 3, and what "the whole prep" covers.
   - P-148: the gloss, and whether "ideally" allows exceptions.
   - P-151: whether his 11:18 words are his reason for option 3.
   - P-55: whether his yes took in Q15 whole. The scout found no sign either way.
6. **His page comments are not checkable.** They are not among his messages. The strikes of P-10 and P-18, and the P-66 question, rest on the brief's quotes and on `HELD.md`, not on a source that `show.py` reads.

In short:
- The evidence alone wrote P-10, P-18, P-86 and P-88. The P-88 queue item also needed the probe's report.
- P-55, P-66, P-150 and P-151 each needed one more read at the source.
- P-85, P-148, P-151 and P-66 have proposed texts that wait on his answers.

## The rules, where they fit badly

- **Status lines** (P-148's "Built in …", P-151's "Built:" and "Still to build:"). Rule 5 makes a part with no source of his a question for him. Rule 6 strikes the state of one day. Neither fits: `record.md`'s form asks a POSITIONS entry for "what is still to build, with its PLAN item". So I kept "Still to build" and the short "Built in" pointer, each sourced to a commit or a row, and moved the "Built:" list to the history (`record.md`, question 3). For the full run: a status line needs a commit, a row or a report as its source, not his word, and it must not read as his decision.
- **Rule 2 and P-88's `ReadableArray2` sentence.** Nothing landed: it is the coordinator's proposal with no source of his, so rule 5 fits. The outcome is the same.
- **Rule 3 and P-88.** P-88 began, like P-86, as an approval of landed work and a restore on a condition, both carried out. I kept it because it also carries a standing rule, which a worker would break without it. Rule 3 needs "and carries no standing rule", as `03f215fe4` worded it.
- **Rules 1 and 7 on P-66.** His 20:18 yes to the whole text stands against rule 7 on the coordinator's example. I followed rules 7 and 8, and the conflict is his question 1.
- **Rule 1 against the record rule on the history.** `record.md:20` says that the dictated words go to the history, with their time. The curator's clarification (2026-10-13T09:05:37.307Z, 2026-10-14T11:49:45.308Z) asks for the time and a fair rewording. I followed the clarification. The history lines quote only the short answers that are the decisions: "Item 15: 15a with (b) yes.", "Row 40: close as no decision taken.", "Okay, agreed. That is the plan.", "3 for the where clauses." and "Yes.". The time points to the exact words in the transcript. `record.md:20` would need the same change.
- **Rule 1 and P-10.** The sub-language sentence is his decision of 09-12, which rule 1 keeps. His page comment strikes the whole entry. His later word wins.
- **Rule 1 and P-55.** Is "what he approved" the document behind the question (Q15) or the texts put to him? I took the texts that he saw, and flagged the difference.
- **Rule 8 and P-85.** This proposal itself makes the pointer to P-55 false. I corrected it from its source (item 30), which puts a default, labelled as one, into a POSITIONS entry. Dropping it would leave "open, with no default" misleading on fork 3's ground.
