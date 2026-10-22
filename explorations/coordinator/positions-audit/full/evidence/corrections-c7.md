<!-- The POSITIONS audit's full run, chunk c7 (P-153, P-84, P-87, P-89, P-90, P-91, P-95, P-96, P-97, P-98): the corrected record proposed by the writer's brief (positions-audit/full/evidence/briefs/writer.md, rules 0 to 12), entry by entry, with each new sentence's source, what leaves POSITIONS and where it goes, the history lines, the questions for the curator and the pointers elsewhere; record.py run on a scratch copy only; nothing applied. -->

# Chunk c7 corrected: a proposal

Writer: one Opus session, from `judgement-c7.md`, the ten scouts' reports in this folder (`P-153.md` and the rest), and the sources named below, checked where the text turned on them: the coordinator's texts of 2026-10-20T05:51:32.573Z and 05:56:57.217Z (by `positions-audit/tools/near.py`), PLAN, the review queue, the gap ledger's rows 321, 363, 441 and 523, the specification's `convenience.tex` and `trait-parameters.tex`, `reviews/decision-d-diff.md`, `reviews/default-rendering-judgement.md` and the library. Nothing in the real record changed. The apply file is `corrections-c7.apply` beside this file; `record.py` ran it on a copy of the record in the session's scratch folder (`scratchpad/positions-audit/full/fix-c7/root/`), with `--root`. The item drafted for the review queue is in `review-queue-items-c7.md`; the lines as they would stand are in `rewritten-c7.txt`.

Every time is a message of his or of the coordinating session, UTC. "Rule n" is the brief's rule n. No entry of this chunk has a comment of his on a page (each scout's section 7).

## The verdicts

- **P-153**: rewritten. The title leads with the split on the base, at his later word of 2026-10-20T05:56:19Z. "Built ..." goes to the history; the timing of the compiled half leaves for the review queue (drafted item Q-?1). His decision is unchanged.
- **P-84**: kept word for word.
- **P-87**: rewritten, one clause added: where the decision D patch is now. A question for him on the diff rule.
- **P-89**: rewritten. The false pointer to PLAN item 10 is dropped, and "Built; no model line changed" goes to the history.
- **P-90**: rewritten, and a question for him. The premise of the future-work gate is false today: instantiation exclusion forbids the bare `Nothing` with or without `where` clauses. The parked re-gating leaves: review-queue item 167 holds it.
- **P-91**: rewritten. "Built" overstated: the compiled `asDebugString` (row 363) is part of the recommendation he took, and it is not built.
- **P-95**: kept word for word, and a question for him: is "`Specification-1.0-frozen/` is never touched" a standing rule of his?
- **P-96**: kept word for word.
- **P-97**: kept word for word.
- **P-98**: kept word for word.

## P-153

**Before.**

> - P-153 **An integer raised to a negative power raises an error; a fraction comes from a float or rational base (contract E, item 58).** Each integer type's `^` answers its own type at every exponent: a negative exponent raises `IntegerOverflow` where the result is no integer, a base of 0 raises `DivisionByZero`, and the bases 1 and -1 give their exact power. A program that wants a fraction writes a float or rational base, as `2.0^(-1)`. Why: the team's later code types an integer power by its integer at a signed exponent (P-26); overloads choose by type, and no type carries an exponent's or a numeral's sign, so the split is on the base, with the sign tested at run time as the library tests every sign-refined subset (P-80). Built in the one library and under walk. Still to build: the compiled path's own powers by the same contract, which answer 0 at a negative exponent today, when phase 4's natives bind the one library's `^` (rows 441 and 523; PLAN, phase 4, the natives).

**After.**

> - P-153 **The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction (contract E, item 58).** Each integer type's `^` answers its own type at every exponent: a negative exponent raises `IntegerOverflow` where the result is no integer, a base of 0 raises `DivisionByZero`, and the bases 1 and -1 give their exact power. A program that wants a fraction writes a float or rational base, as `2.0^(-1)`. Why: the team's later code types an integer power by its integer at a signed exponent (P-26); overloads choose by type, and no type carries an exponent's or a numeral's sign, so the split is on the base, with the sign tested at run time as the library tests every sign-refined subset (P-80). Still to build: the compiled path's powers by the same contract (rows 441 and 523; PLAN, phase 4, the natives).

**Each sentence and its source.**
1. The title, reworded (rule 12). At 05:56:19 on 10-20 he answered the coordinator's 05:51:32.573Z, which had said "You decided it last night: a negative power raises an error". He wrote that this is not how he recalls it: the resolution was a split, with an error perhaps in one case. The coordinator's reply of 05:56:57.217Z restated the decision as "The split is on the base's type, not on the exponent": an integer base gives an integer, an error where the true result is no integer, the exact power where it is one, and a float or rational base gives the fraction. He went on from it ("Okay, let's get through them.", 06:01:04.054Z). The old title was not wrong in meaning, since its second clause held the split (`judgement-c7.md`, "P-153"). But it led with the short form that he did not recognise, and its first clause is false for the bases 1 and -1. The new title says the same decision in the words that he went on from. "(contract E, item 58)" stays: item 58 is now in PLAN-history, PLAN has no other item 58, and the label is the one that PLAN-history and the review queue use.
2. The contract, the fraction sentence and the Why: unchanged. They are his answer "Yes." at 2026-10-20T00:44:34.730Z. He quoted the recommendation line of the coordinator's 00:19:08.321Z ask 2 and answered option 1 (E), whose text the entry follows (rule 1; `judgement-c7.md`, "P-153", first two bullets).
3. "Still to build: the compiled path's powers by the same contract (rows 441 and 523; PLAN, phase 4, the natives).": shortened (rule 9). That the compiled path meets the contract follows from his decision, which covers "each integer type's `^`". PLAN's phase 4, "The natives", binds the one library's natives to compiled helpers, the `ZZ32`, `NN32` and `NN64` powers among them (rows 523 to 525).

**What leaves POSITIONS, and where it goes.**
- "Built in the one library and under walk.": the state of one day (rules 6 and 9). It goes to the history: climb batch 20's rung I, `5ad4a9957`. F-263 holds the built state, and review-queue item 26 (settled) too.
- "which answer 0 at a negative exponent today": the state of one day. F-263's last sentence holds it: "The compiled path's own library still answers 0 at a negative exponent, and a raw exception at 0 (rows 441 and 523)".
- "when phase 4's natives bind the one library's `^`": the timing of the compiled half. Climb batch 20's routing set it (POSITIONS-history, P-153, the block of 2026-10-20 12:51Z), and it was never put to him: the coordinator's text of 2026-10-20T11:58:26.450Z told him only "P-40 and P-153 to mark as built" (rule 2; `judgement-c7.md`, "P-153"). No item of the queue holds it. Item 26 is settled; items 165 and 201 hold other points (P-153's scout, section 5). PLAN's phase 4 binds rows 523 to 525 but leaves "negative exponents ... to row 441". So it is drafted as **item Q-?1** (`review-queue-items-c7.md`). The pointer "(PLAN, phase 4, the natives)" stays, by rule 9. See "The rules, where they fit badly", 2.

**History line.** The title reworded at his later word (05:56:19.215Z on 10-20, after the coordinator's 05:51:32.573Z), and the coordinator's restatement of 05:56:57.217Z that he went on from. "Built" goes to the history, the clause on today's compiled value goes to F-263, and the timing goes to the queue, never put to him (the 11:58:26.450Z text). The rest is kept, with his sources:
- `2026-10-20T00:44:34.730Z`: his answer "Yes." to the coordinator's 00:19:08.321Z ask 2, option 1 (E), whose recommendation he quoted.
- `2026-10-19T23:55:49.331Z`, after the coordinator's 23:33:57.594Z first form of ask 2 (E, Z, R and X): he wants a combination of options, and asks whether overloads can split the negative exponents from the positive ones.
- `2026-10-20T00:01:06.669Z`, after the coordinator's 2026-10-19T23:57:18.359Z: launch Fable with that question.

The line that `record.py` wrote is given whole under "What record.py wrote".

**Questions for him.** None on the entry. Drafted item Q-?1 asks the timing.

**Pointers elsewhere.**
- `review-queue.md:1218`, item 26 (settled), quotes the old title whole: `P-153, "An integer raised to a negative power raises an error; ..."`. Its words would need the new title. `record.py` refreshes quoted words only inside FACTS and POSITIONS. The item also says "his answer of 00:45 UTC"; his message is of 00:44:34Z.
- `review-queue.md:656`, item 201, quotes "each integer type's `^` answers its own type": still in the entry, so it needs nothing.
- `review-queue.md:954` (item 195), `:968` (item 200), `PLAN.md:147` and `.claude/skills/fortress-repo/references/sources.md:758`: need nothing.
- PLAN, phase 4, "The natives", which does not name P-153: "negative exponents left to row 441" is stale since contract E. The binding's negative branch now follows P-153. Q-?1 names it.
- Ledger row 441 still says "The curator chooses a rational, a throw, or `RR64`". This is not a pointer to P-153, but it is stale since contract E. Its note was refused for length (review-queue item 165).

## P-84

**Before** and **after**, word for word (kept, rule 1):

> - P-84 **Storage is `double[]`, unboxed, and arrays keep the team's `nat` sizes.** A high-performance language cannot box its array elements, and the sizes are central to the team's design. So both are built together: sized types, the checker taught `nat` parameters, in the library's own patterns. How `double[]` goes under a float vector is array decision A (P-85).

**Each sentence and its source.** His message of 2026-09-19T18:32:48.384Z answers, by its content, the coordinator's 18:24:23.475Z: the array design's four questions, Q1 the storage and Q4 the sizes, with Q4's layered default. The reply chain gives 18:22:49.203Z instead, on C4's operators (P-84's scout, section 1).
1. The title and the second sentence: his words, condensed fairly. "we must go to double array for performance. There is again no question about this", "it cannot be boxed", and the `nat` sizes as "a central design point that they are using".
2. "So both are built together ...": the coordinator's reading of his hedge, "I don't know we can sidestep the net NAT uh, issue". The reading is that he rejected Q4's layered default, which put the sizes on later as fields. The coordinator's brief to the design worker said so at 18:33:22 ("the layered default is rejected"). The judgement finds the meaning held. Today "together" means only that the storage does not come as a layer before the sized types. The checker's half is built (F-67), and the storage waits until after the switch-over (P-85). Rule 7 keeps the reading: it neither narrows nor adds beyond rejecting that default. "In the library's own patterns" is his general rule of 18:31:44.057Z, applied here.
3. The pointer to P-85: the coordinator's. P-85 says "A is how `double[]` goes under a float vector".

His later word does not change it. At 2026-09-20T14:27:53.739Z he restated the reason: a high-performance language on the JVM that does not use the native array representation cannot be high-performance.

**What leaves POSITIONS.** Nothing.

**History lines.** The entry's text does not change, so the tool cannot write them (see "History lines the tool cannot write").

**Questions for him.** None.

**Pointers elsewhere.** `POSITIONS.md:17`, P-17 ("The storage is P-84's decision"): needs nothing. `PLAN.md:582` names the decision by its date ("POSITIONS 2026-09-19"): needs nothing. It could name P-84.

## P-87

**Before.**

> - P-87 **The model's text is the notation, and the vocabulary is repaired around it.** An operator in the model never becomes a function call to satisfy an overload check. Any repair that changes a model line is shown to him as a diff before it is built. Decision D, the sized signatures of the flat program C4's vocabulary, is such a diff (`reviews/decision-d-diff.md`); nothing of it is applied before PLAN phase 5.

**After.**

> - P-87 **The model's text is the notation, and the vocabulary is repaired around it.** An operator in the model never becomes a function call to satisfy an overload check. Any repair that changes a model line is shown to him as a diff before it is built. Decision D, the sized signatures of the flat program C4's vocabulary, is such a diff (`reviews/decision-d-diff.md`, its patch in the parent of `84aef6a4f`); nothing of it is applied before PLAN phase 5.

**Each sentence and its source.**
1. The title and the operator sentence: his decision, reworded fairly (rule 1). At 2026-09-19T18:13:00.524Z he answered the coordinator's 18:08:05.767Z C4 fix, in which "one `+` in the model becomes a function call". He pasted the mask line before and after (`mask + ...` became `planeSum(mask, ...)`) and wrote "NO. NO! NOOOOO! That’s not Fortress!". "The vocabulary is repaired around it" follows his 17:01:32.913Z: the fix is to compose the algorithm from the standard array operations. It also follows his 18:21:22.941Z, after the coordinator's 18:16:23.727Z: the operations must compose in the normal mathematical ways.
2. The diff rule: kept, and put to him as a question. He never stated it. Its seed is his one-time request of 18:02:13.648Z, answering the coordinator's 17:57:51.005Z: "if we found a minimal fix for the C4, like just show it to me". Its wording is the coordinator's (`bd84d76d9`, and its own 18:16:23.727Z: "so that you see the diffs before anything is done"). On 09-27 the coordinator's ask gave it to him as background, "Your rule of 09-19 applies: any change to a model line is shown to you as a diff first" (19:31:23.674Z). He took the ask and did not contest the rule. The skills carry its practice apart from P-87. The `fortress-repo` skill's `references/interpreter.md`, "The model program", says "If you change a line of the model, put the change in your report as a diff". The `coordinator` skill's `SKILL.md` counts a decision that touches a line of the model program as consequential. See "The rules, where they fit badly", 1.
3. Decision D: his yes to a question stated fairly. "Yes. Agree with recommendation." at 2026-09-27T19:34:10.747Z answers option 1 of the coordinator's 19:31:23.674Z: write the sized types now as a diff, and apply nothing until phase 5. The premise was partly false (rule 8): the patch is no longer where the review says it is. `84aef6a4f` (2026-09-30, the cleaning of `explorations/reviews`) removed `reviews/decision-d-diff/`, with `decision-d.patch` and its re-based copy `rebase-2026-09-29/decision-d.patch`. Both are read from the parent of that commit (`git ls-tree 84aef6a4f^ explorations/reviews/decision-d-diff/`). Only the review stays in the tree. The added clause says so. The other half of the judgement's doubt is that no message of his shows that he saw the diff. The entry does not say that he saw it: the diff is shown to him when fork 5 comes (PLAN item 13, fork 5). So that half needs no text.

**What leaves POSITIONS.** Nothing.

**History line.** The patch's place added, from `84aef6a4f`. The rest is kept, with his sources:
- `2026-09-19T18:13:00.524Z`, his "NO. NO! NOOOOO! That’s not Fortress!", to the coordinator's 18:08:05.767Z C4 fix, in which one `+` of the model became a function call. He pasted the mask line before and after.
- `2026-09-19T17:01:32.913Z`, on the C4 review's rename of `MAX`: the fix is to compose the algorithm from the standard array operations. `2026-09-19T18:21:22.941Z`, after the coordinator's 18:16:23.727Z: the operations must compose in the normal mathematical ways.
- `2026-09-19T18:02:13.648Z`, after the coordinator's 17:57:51.005Z: show him a minimal C4 fix. This is the diff rule's seed; the question is below.
- `2026-09-27T19:34:10.747Z`, his "Yes. Agree with recommendation.", to the coordinator's 19:31:23.674Z: decision D's diff now, nothing applied until phase 5.

**Questions for him.**
1. P-87 says: "Any repair that changes a model line is shown to him as a diff before it is built." You never said this as a rule. It grew from your request of 2026-09-19, 18:02 UTC, to see a minimal C4 fix. The coordinator wrote it as a rule, and on 09-27 called it "your rule of 09-19" in the decision D ask, which you took. Is it your standing rule? Confirm it, or strike it. If you strike it, the skills' practice stays (a worker reports a model-line change as a diff, and such a change is consequential), but P-87 no longer makes it a position.

**Pointers elsewhere.**
- `POSITIONS.md:91`, P-85 ("D sizes in the model's own types (P-87)"): needs nothing.
- `.claude/skills/coordinator/references/sources.md:63`, "The ledger: P-87's clause, P-133, F-219": stale. `1632b5dfa` cut P-87's ledger clause (POSITIONS-history, P-87, the block of 2026-10-13 19:58Z: "its rule at its home: the coordinator skill, references/record.md, "INDEX and the gap ledger""). The line should name P-87's history, or drop P-87.
- `PLAN.md:77` cites `reviews/decision-d-diff/rebase-2026-09-29/` (`decision-d.patch`, `library-e3.patch`), and review-queue item 36, "Home", cites `reviews/decision-d-diff/rebase-2026-09-29/library-e3.patch`. Both left the tree at `84aef6a4f`. Each should say "in the parent of `84aef6a4f`".
- `reviews/open-asks-2026-10-16.md:260` ("a diff shown to him before anything is built, in phase 5"), review-queue item 37's D1 and PLAN item 13, fork 5 ("each shown to him as a diff"): each stands or falls with question 1.
- `reviews/open-asks-2026-10-16.md:252`: needs nothing.
- `reviews/decision-d-diff.md` itself says "It is `decision-d-diff/decision-d.patch`": a report, not the record. A note at its head would help the reader at phase 5.

## P-89

**Before.**

> - P-89 **`fill` takes a value, `tabulate` a function (answer 10).** It is his answer to PLAN item 10. `fill` keeps the value form, every peer language's meaning of the word, and the function form takes Scala's name `tabulate`. Built; no model line changed.

**After.**

> - P-89 **`fill` takes a value, `tabulate` a function (answer 10).** `fill` keeps the value form, every peer language's meaning of the word, and the function form takes Scala's name `tabulate`.

**Each sentence and its source.** His "Agreed, tabulate." at 2026-09-26T12:17:35.442Z, answering the coordinator's 12:14:58.152Z, answer 10. The ask: the diamond fix, plus the function form renamed `tabulate` or the name he prefers, with `tabulate` recommended. It said that "wherever other languages say `fill` (Java, Scala, Kotlin, C++, Rust, Julia), it means the value form" (rule 1). "Every peer language's meaning of the word" is fair: the one exception, X10, overloads one name, and that name is not `fill` (`reviews/fill-overloads-ways.md:446-458`).

**What leaves POSITIONS, and where it goes.**
- "It is his answer to PLAN item 10.": a premise false today (rule 8). PLAN's item 10 is now "Batch 12" (`PLAN.md:50`). The `fill` item left PLAN at `ad56edb62` and is in PLAN-history as item 10, "The `fill` pairs". It is dropped: the title's "(answer 10)" already names the ask he answered, and no correction would tell a reader more.
- "Built; no model line changed.": the build (rule 9), to the history. Climb batch 7's rung A (`f3b62bc83`) built it. F-158 holds the build and points here ("It builds P-89"). No line of `MicroGptFlat.fss` or `MicroGptApl.fss` changed (`compile-ladder/rung-tabulate/REPORT.md:16`, `:309`).
- The diamond half of his yes is not restored. It said "in the leaf array traits", and the build put the fix where the diamond meets. That placement is review-queue item 112, "his to confirm", and PLAN, "Off the path, parked". Writing the leaf placement back would state a form that is not built and that the item weighs (rule 2).

**History line.** "It is his answer to PLAN item 10" dropped, since PLAN's item 10 is another line. "Built; no model line changed" moves to the history (`f3b62bc83`; F-158). The diamond's placement is in F-158 and in item 112. The rest is kept: `2026-09-26T12:17:35.442Z`, his "Agreed, tabulate.", to the coordinator's 12:14:58.152Z answer 10.

**Questions for him.** None. Item 112 asks the placement.

**Pointers elsewhere.** `FACTS.md:187`, F-158 ("It builds P-89"): needs nothing. By content, not by number: `PLAN.md:199` and `:200` and review-queue items 112 and 113 need nothing. An aside for F-158, not for this entry: the compiled prelude's `ZZ32Vector` still declares `fill(f)` beside `fill(v)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:577-579`). That file is outside `f3b62bc83` (P-89's scout, section 2). With "Built" gone, the entry claims nothing about it.

## P-90

**Before.**

> - P-90 **`Maybe`'s empty case is the team's parametric `Nothing[\T\]`, in the one library and the specification.** The bare `Nothing` is future work: it needs a `where` clause that binds a type variable in an `extends` clause, which neither path implements, and it is not tried before then. Gating row 331 on static-argument inference instead is parked (PLAN, "Off the path, parked").

**After.**

> - P-90 **`Maybe`'s empty case is the team's parametric `Nothing[\T\]`, in the one library and the specification.** The bare `Nothing`, one object for every `T`, is not tried: instantiation exclusion forbids it with or without a `where` clause, and the specification marks it "Not allowed" (F-21, F-167).

**Each sentence and its source.**
1. The title: unchanged. "The team's parametric `Nothing[\T\]`, in the one library" is his word of 2026-09-21T21:20:29.106Z, answering option 1 of the coordinator's 21:08:15.030Z, "Rows 26 and 33 together". "Maybe’s empty case, keep team’s paramedic speaking" is dictation for "parametric spelling". "And the specification" is his S2 yes: "S2 yes, take the verdicts for rung S" at 2026-09-26T08:07:48.939Z, and "Yes. Sure." at 08:18:07.238Z, quoting the coordinator's 08:00:01.931Z ask. Its verdicts held `Nothing[\T\]` as "the library's shape and your row 331 decision of 09-21".
2. The bare `Nothing`: corrected from its source (rule 8), and put to him as a question. Its premise is false today. His word was "Document the future work gate on where clause availability". The specification that rung S wrote under his S2 yes (`3924e7ec3`) refuses the bare declaration, `object Nothing extends Maybe[\T\] ... where {T extends Object}`, as "Not allowed". The reason: "It would make `Nothing` a `Maybe[T]` for every `T` at once, which instantiation exclusion forbids". The `revival-nothing` callout says "instantiation exclusion closes that road" (`Specification/basic-lib/convenience.tex`). The rules chapter states it in general: "A where-clause variable may not appear as a static argument in an extends clause" (`Specification/basic/trait-parameters.tex:397-398`). The coordinator's own note says the same: building `where` clauses "will not reopen it" (`reviews/open-asks-2026-10-16.md:258`). Since his "3 for the where clauses." (P-151), the team's `where` forms are being built. So the old text would let a reader think that the gate is about to open. What stays from his word is the part that cuts: the bare form is not tried. The new reason rests on instantiation exclusion itself (P-25, P-97), not only on the rules chapter's sentence that review-queue item 41 questions. F-21 and F-167 hold the facts: the specification marks it "Not allowed", and it bars the form.

**What leaves POSITIONS, and where it goes.**
- "it needs a `where` clause that binds a type variable in an `extends` clause, which neither path implements, and it is not tried before then": replaced as above. Its old text goes to the history.
- "Gating row 331 on static-argument inference instead is parked (PLAN, "Off the path, parked").": an agent's default, waiting for his review (rule 2). The S2 ask listed it under "Not covered by this yes ... one per message after it". His "Yes, this order and workers are go." (2026-09-26T09:04:41.396Z) answered the plan message of 08:40:51.388Z. That message names as parked his unanswered re-approval rows, not this item (`judgement-c7.md`, "P-90", doubts). **Review-queue item 167** holds it ("Landed: Parked ... Needed by: never; row 331 is the compiled prelude's, which the switch-over deletes (P-38)"). So does PLAN, "Off the path, parked" ("Row 331's bare `Nothing` re-gated on type inference ...; parked. Review-queue item 167."). No new item.

**History line.** The bare form's premise is corrected and put to him as a question. His word of 2026-09-21T21:20:29.106Z, to the coordinator's 21:08:15.030Z, option 1, set the gate. The specification under his S2 yes (`3924e7ec3`) closes that road by instantiation exclusion. The parked re-gating leaves for item 167. His sources:
- `2026-09-21T21:20:29.106Z`, after the coordinator's 21:08:15.030Z ("Rows 26 and 33 together", option 1): keep the team's parametric spelling, and record the bare form as future work gated on `where` clauses.
- `2026-09-26T08:07:48.939Z`, his "S2 yes, take the verdicts for rung S", and `08:18:07.238Z`, his "Yes. Sure.", both to the coordinator's 08:00:01.931Z S2 ask, whose verdicts held `Nothing[\T\]`.

**Questions for him.**
1. On 09-21 you kept the team's `Nothing[\T\]` and had the bare `Nothing` recorded as future work, gated on `where` clauses. The specification that your S2 yes of 09-26 ordered refuses the bare `Nothing` by instantiation exclusion, with or without a `where` clause. One object would be a `Maybe` of every type at once. So building the team's `where` forms (P-151) does not open that gate. The proposal: drop the future-work gate and say only that the bare form is not tried, because exclusion forbids it. Take the proposal, or keep the gate as written? Your plain explainer on the rules chapter's `where` sentence (review-queue item 41) bears on the general sentence. It does not bear on this case, which the rule itself refuses.

**Pointers elsewhere.**
- `FACTS.md:15` (F-21, "(P-90)") and `FACTS.md:215` (F-184, "(row 331, P-90)"): need nothing.
- `PLAN.md:74`: "Still open beside it: `Maybe`'s bare `Nothing` (P-90; row 331, "Off the path, parked")". Under the new text it would be false: the bare form is not tried, and only the re-gating on inference is parked. It would read, for example: "`Maybe`'s bare `Nothing` is not tried (P-90); its re-gating on inference is parked (row 331, "Off the path, parked")".
- `PLAN.md:63`: "Its contract entries wait beside P-90's bare `Nothing` (`Maybe`)". The bare form no longer waits on any work, so the line should say what `Maybe`'s contract entries wait for, or drop P-90.
- `reviews/open-asks-2026-10-16.md:258` ("P-90's wording, which ties it to them, may want a line"): this correction answers it. `:138` is a list of that day: needs nothing.
- `fortress-gap-ledger.md:764` cites `(POSITIONS, "`Maybe`'s empty case")`: the title is kept, so it needs nothing.
- Review-queue item 167: its "Home" names PLAN only. It now holds the parking alone and could name P-90's former last sentence (POSITIONS-history, P-90).

## P-91

**Before.**

> - P-91 **What an object with no `asString` prints: its bare Fortress type name, walk's spelling, on both paths.** The debug marker he had in mind goes in `asDebugString`. Built, but for an object with a member named `toString`, which still overflows the stack when compiled (row 321).

**After.**

> - P-91 **What an object with no `asString` prints: its bare Fortress type name, walk's spelling, on both paths.** The debug marker he had in mind goes in `asDebugString`. Still to build on the compiled path: `asDebugString` as walk prints it, `a Box: Box` (row 363), and an object with a member named `toString`, which overflows the stack (row 321; PLAN, phase 4, "From the reviews").

**Each sentence and its source.**
1. The title: his yes, unchanged. "yes,  row 27 close per default-rendering-judgement recommendation." at 2026-09-22T04:45:52.849Z answers the coordinator's 2026-09-21T21:53:45.883Z ("Labelled default: the bare type name, the interpreter's spelling, on both paths. Say yes and row 27 closes"), repeated at 23:23:34.884Z. "Walk's spelling" is the judge's phrase.
2. The marker sentence: unchanged. It is the coordinator's line in that ask ("The debug marker you had in mind has a home already: ... `asDebugString`"), within the recommendation he took (rule 7: it neither narrows nor adds). The marker he had in mind was option 2, the Java class name in angle brackets ("Leaning 2, as these are debug messages in my mind", 21:26:46.253Z).
3. "Still to build ...": rewritten from "Built, but ..." (rules 8 and 9), since "Built" overstated. The recommendation he took "per default-rendering-judgement recommendation" also says: "give the compiled `Object` a `getter ilkName()` and restore the interpreter's five-line article `asDebugString` ... so the debug rendering agrees too" (`reviews/default-rendering-judgement.md`, "5. Recommendation"). The compiled `asDebugString` is still `self.asString` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:357`, the article body commented out below it). Ledger row 363 holds the difference: walk prints `a Box: Box`, the compiled path `Box`. Row 321's case stays as it was. Its PLAN home is phase 4's bullet "From the reviews: printing an object with no `asString` overflows the stack once the compiled path reads the one library", since row 321 "Blocks adopting walk's `trait Object`". Row 363 has no PLAN line. It is a gap of the compiled prelude, which the switch-over replaces (PLAN, phase 4, "The names").

**What leaves POSITIONS, and where it goes.** "Built": the build of the bare type name on both paths goes to the history (climb batch 3's rung S, `6bec1b004`; F-123, which also names rows 321 and 363).

**History line.** "Built, but ..." rewritten as what is still to build, with row 363 added from the recommendation he took. The build goes to the history. The rest is kept, with his sources:
- `2026-09-22T04:45:52.849Z`, his "yes,  row 27 close per default-rendering-judgement recommendation.", to the coordinator's 2026-09-21T21:53:45.883Z (the judge's ruling, "Say yes and row 27 closes"), repeated at 23:23:34.884Z.
- `2026-09-21T21:26:46.253Z`, after the coordinator's 21:22:24.200Z three options for row 321: he leans to option 2, since these are debug messages to him.
- `2026-09-21T21:32:52.066Z`, after the coordinator's 21:27:08.642Z: still option 2, and the same behaviour in the interpreter and the compiler, if possible.
- `2026-09-21T21:44:45.138Z`, after the coordinator's 21:39:02.511Z: a fresh Fable reviews the alternatives and recommends one.

**Questions for him.** None.

**Pointers elsewhere.** No line names P-91 by number. Ledger row 363 cites `POSITIONS, "What an object with no `asString` prints"`: the title is kept. FACTS F-123 (`FACTS.md:139`), `HELD.md:91` and `PLAN.md:84` need nothing.

## P-95

**Before** and **after**, word for word (kept):

> - P-95 **Every change to the specification is recorded with its reason.** No discrepancy between the specification and the implementation stays open to confuse a reader. The original text and the reasons are kept, so that route C, the way back to the patents' forest rule (P-43), stays open. Every change takes the S1 form (P-96). `Specification-1.0-frozen/` is never touched.

**Each sentence and its source.**
1. From the title to "stays open": his decision, condensed fairly (rule 1). His message of 2026-09-24T07:03:57.849Z says that the plan updates the specification with each change and records why, so that no open discrepancy between the specification and the implementation confuses people. It also says that the original historic record is kept in a document with the reasoning, and that the option of route C is kept. By its content it answers the exclusion brief (the coordinator's 2026-09-24T00:47:26.776Z) and the coordinator's 01:51:27.946Z on going A then C. The chain gives 07:02:57.716Z. "The way back to the patents' forest rule (P-43)" is the coordinator's gloss of route C, and it is fair.
2. "Every change takes the S1 form (P-96).": a pointer to his own S1 choice of 09-26.
3. "`Specification-1.0-frozen/` is never touched.": the coordinator's clause ("The frozen 1.0 copy is not touched", 07:05:14.631Z). It was put to him in the route ask of 14:36:56.498Z for one rung ("A rung of batch 4, flagged as an original-tree edit, the frozen copy untouched"). He answered "Agreed. Route A it is." (14:41:40.798Z). On 09-26 the coordinator's text of 09:08:39.457Z called the copy one "which we never touch", inside the ask he answered with "Option 1, agreed." (09:19:58.593Z, P-96's source). That ask was about what the citations call the copy, not about touching it. The standing "never" is the coordinator's extension, and it fits his "preserve the original historic record" (rule 7: he approved texts that held it, so his approval wins and it becomes a question). The tree keeps it: `git diff --stat 201834fa8 HEAD -- Specification-1.0-frozen` is empty (P-95's scout, section 2).

**What leaves POSITIONS.** Nothing.

**History lines.** See "History lines the tool cannot write".

**Questions for him.**
1. P-95 ends: "`Specification-1.0-frozen/` is never touched." You agreed to it for the route A rung of batch 4 ("the frozen copy untouched", 2026-09-24, 14:36 UTC). The coordinator made it a standing rule, which fits your wish to keep the original record. Is it your standing rule? Confirm it, or strike it.

**Pointers elsewhere.** `POSITIONS.md:7`, P-7 ("The specification is a living document that states the revival's changes (P-95)"): needs nothing. By title, not by number: `.claude/skills/fortress-repo/references/sources.md:398`, `CLIMB-BATCH-8.md:117`, `CLIMB-BATCH-9.md:82`, `CLIMB-BATCH-10.md:74`, `process-engineering/blind-brief/content.md:322`: the title is kept, so they need nothing.

## P-96

**Before** and **after**, word for word (kept, rule 1):

> - P-96 **The S1 form: a change of the specification is shown in the layered form that the team used for 1.0 and its 2009 draft.** A callout that prints in every build, not a `\note`, marks each changed passage. Appendix I's revival section gives each change its reason, its original text, the way back to route C and the decision it follows. The front matter has one paragraph on the revision, and a repository document holds the full reasoning. The unrevised copy is cited as the Working Draft of February 2011. The parts in detail: fortress-repo skill, `references/specification.md`.

**Each sentence and its source.** His yes to three questions, each stated fairly (`judgement-c7.md`, "P-96").
1. The layered form, the callout, Appendix I, the front matter and the repository document: "S1 — 1, teams’ way." (2026-09-26T07:48:29.318Z), to option 1 of the coordinator's 01:56:02.857Z. Option 1 read: "Layered, as the team did: a labelled mark at each changed passage that prints in every build, a revival section in Appendix I with the reason, the original sentences and route C, a paragraph in the front matter, and the full reasoning in a repository document". "Not a `\note`" is from the same text: a `\note` "would also vanish in a release build".
2. The Working Draft of February 2011: "Option 1, agreed." (09:19:58.593Z), to option 1 of the coordinator's 09:08:39.457Z.
3. "the decision it follows": his answer to item 23 in 2026-09-29T17:44:02.015Z. Option (a) of the coordinator's 15:53:50.678Z: "each entry names its own".
4. The pointer to the skill: the coordinator's. The skill's part exists (`.claude/skills/fortress-repo/references/specification.md:17-39`).

The form is not always kept, but that is not an error of the entry. Review-queue item 197 records that climb batch 20's rung I wrote no repository document. A keyword probe of Appendix I finds 13 of its 41 entries without a named decision outside their original text (P-96's scout, section 2). That probe is not a reading.

**What leaves POSITIONS.** Nothing.

**History lines.** See "History lines the tool cannot write". Block :740 of the history cites F-164, which FACTS no longer has. Its point is now in F-163. That block is a history line, and nothing rewrites it.

**Questions for him.** None.

**Pointers elsewhere.** `POSITIONS.md:61` (P-147), `:85` (P-80), `:100` (P-95) and `:109` (P-123), review-queue items 197 and 169: they need nothing.

## P-97

**Before** and **after**, word for word (kept, rule 1):

> - P-97 **The refused examples (S2) take the one library's shapes, under one statement of instantiation exclusion.** Each refused example stays, marked "Not allowed" as the specification marks one, beside the library's shape. The rule is stated once, in Luchangco's two-part form (P-25). The covariance example's callout adds that the type group's later design has a `covariant` modifier, which neither path implements (row 404). The calculi of Appendix A keep their rules, under a callout that they predate the rule.

**Each sentence and its source.** His yes to three questions, each stated fairly (`judgement-c7.md`, "P-97").
1. Sentences 1 to 3: "S2 yes, take the verdicts for rung S" (2026-09-26T08:07:48.939Z) and "Yes. Sure." (08:18:07.238Z), to the coordinator's 08:00:01.931Z. That ask stated each verdict and the rule "in the two-part form from Luchangco's 2012 Types chapter".
2. The covariance callout: "Option 2, agreed." (09:29:33.563Z), to option 2 of the coordinator's 09:25:29.526Z: one sentence that "the type group's later design declares variance with a `covariant` modifier, that it isn't implemented on either path". Row 404 is still NEGATIVE-VERIFIED.
3. The calculi: "Agreed." (18:59:23.595Z), quoting the recommendation of option 1 of the coordinator's 18:11:02.962Z ("A short callout at each calculus ... leaving the formal rules as the team wrote them"). That text named three calculi, and a fourth got the same callout later under the same decision. The entry gives no count.

**What leaves POSITIONS.** Nothing.

**History lines.** See "History lines the tool cannot write".

**Questions for him.** None.

**Pointers elsewhere.** `FACTS.md:197` (F-167, "It builds P-97") and review-queue `:1179` (settled): they need nothing.

## P-98

**Before** and **after**, word for word (kept, rule 1):

> - P-98 **`TotalComparison` extends `StandardMinMax[\TotalComparison\]`, so that it has `MIN` and `MAX`.** It does so in the api and in the component, and keeps its five restated members. He took it on the coordinator's recommendation and wants it explained in more detail when he has the energy, so it is on the list for his review (PLAN, "Pavol's answers, in the order they are needed").

**Each sentence and its source.** His message of 2026-09-29T17:44:02.015Z, on item 22, answers the coordinator's 15:53:50.678Z. That text gave option (b), "The library's own device: `extends { Comparison, StandardMinMax[\TotalComparison\] }` ... one header line in the api, one in the component and a test", with "**Recommendation:** (b)", and ended "Your answer to both: (b) on 22 and (a) on 23?".
1. The title: option (b), which he took.
2. "It does so in the api and in the component, and keeps its five restated members.": "one header line in the api, one in the component" from the ask he took. "Keeps its five restated members" follows from a header-only change, and the tree bears it out (`Library/FortressLibrary.fsi:126-132`). The compiled prelude keeps its own `TotalComparison extends { Comparison }` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:719-722`). The entry speaks of the one library's api and component, as the ask did.
3. The last sentence: his words, condensed. "I'll have to rely on your recommendation there", "the default stays, it doesn't block the run", and "we should go over it one more time later where you explain it to me in more detail when I have more energy". The PLAN pointer is right: `PLAN.md:158` is under "For his review; nothing waits on them", in "Pavol's answers, in the order they are needed".

The judgement reads his yes as provisional, "in effect a default that still waits for his review". I keep the sentence by rules 0 and 1. It is his and correct, it already says that the decision waits for his explanation, and review-queue item 109 holds the explanation owed ("no decision"). See "The rules, where they fit badly", 5.

**What leaves POSITIONS.** Nothing.

**History lines.** See "History lines the tool cannot write". Block :750 quotes "I need to pay that down" at "17:44 UTC". It names neither the ask nor his "rely on your recommendation".

**Questions for him.** None.

**Pointers elsewhere.** `FACTS.md:70` (F-77, "(P-98)"), `PLAN.md:158`, `review-queue.md:747` and `:748` (item 109): they need nothing.

## History lines the tool cannot write

`record.py` writes a history block only for a change: an apply line equal to the entry is skipped, and a call that changes nothing is refused (`positions-audit/trial/evidence/corrections.md`, "What the tool could not do"; `record.py` has no command for a provenance-only block). The five kept entries' sources are listed here, for the coordinator to write when the tool can. Each gives his message's time, the coordinator's text it answered, and a fair rewording. A short answer that is the decision is quoted.

**P-84**
- `2026-09-19T18:32:48.384Z`, answering by content the coordinator's 18:24:23.475Z (the array design's four questions, Q1 the storage and Q4 the sizes); the reply chain gives 18:22:49.203Z. Arrays must be `double[]`, unboxed, beyond question, for a high-performance language. He doubts that the team's `nat` sizes can be sidestepped, a central point of their design.
- `2026-09-19T18:31:44.057Z`, answering the coordinator's 18:22:49.203Z (C4's operators): the library's extensions follow the patterns of the existing library.

**P-95**
- `2026-09-24T07:03:57.849Z`, answering by content the exclusion brief (the coordinator's 2026-09-24T00:47:26.776Z) and the coordinator's 01:51:27.946Z; the chain gives 07:02:57.716Z. The plan updates the specification with each change and records why, so that no discrepancy stays open. The original is kept with the reasoning, and route C stays open.
- `2026-09-24T14:41:40.798Z`, his "Agreed. Route A it is.", answering the coordinator's 14:36:56.498Z route ask (the frozen copy untouched, for batch 4's specification rung).

**P-96**
- `2026-09-26T07:48:29.318Z`, his "S1 — 1, teams’ way.", answering the coordinator's 2026-09-26T01:56:02.857Z (the four options of the S1 note); the chain gives the coordinator's 07:46:20 turn.
- `2026-09-26T09:19:58.593Z`, his "Option 1, agreed.", answering the coordinator's 09:08:39.457Z (what rung S's citations call the unrevised copy).
- `2026-09-29T17:44:02.015Z`, answering the coordinator's 15:53:50.678Z (items 22 and 23): for item 23, option (a). The appendix lists the changes, and each entry names its decision.

**P-97**
- `2026-09-26T08:07:48.939Z`, his "S2 yes, take the verdicts for rung S", answering the coordinator's 08:00:01.931Z ("The ask: take these verdicts for rung S"). His 08:18:07.238Z "Yes. Sure." quotes the same ask.
- `2026-09-26T09:29:33.563Z`, his "Option 2, agreed.", answering the coordinator's 09:25:29.526Z (batch 5's answer 3, the `covariant` keyword: one sentence in the callout).
- `2026-09-26T18:59:23.595Z`, his "Agreed." to option 1, a callout at each calculus, answering the coordinator's 18:11:02.962Z (the calculi of Appendix A).

**P-98**
- `2026-09-29T17:44:02.015Z`, answering the coordinator's 15:53:50.678Z (items 22 and 23; "Your answer to both: (b) on 22 and (a) on 23?"). On item 22 he cannot focus on reading it whole and relies on the recommendation, (b). The default stays and does not block the run. He wants it explained in more detail later, when he has more energy.

## What record.py wrote

**How it ran.** The scratch root `scratchpad/positions-audit/full/fix-c7/root/` holds copies of the four record files from `explorations/coordinator/` at `db0e0ad9b` (HEAD at the run; `git status` showed them unmodified): `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `FACTS-history.md`. Every other path in it is a symbolic link into the real tree, so that the `from` paths resolve. The tool was the real `explorations/coordinator/tools/record.py`, run with `--root` on that copy and with `GIT_DIR` set to the real repository, read only, so that `check --base` can read the base. Before the apply, `check --base db0e0ad9b` on the copy gave 0 failures, 83 entries in POSITIONS (`fix-c7/check-before.txt`). The commands, from the scratch folder:

    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py apply /home/user/fortress/explorations/coordinator/positions-audit/full/evidence/corrections-c7.apply --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base db0e0ad9b --root root

After this file was finished, with its history blocks quoted inside a fence below, the apply file was run again on a fresh copy (`fix-c7/root2/`, `fix-c7/apply2-out.txt`). It gave the same `POSITIONS.md` and the same history except for the time, and `check --base db0e0ad9b` again gave 0 failures. So each `from` heading of this file ("P-153" and the rest) still resolves to one heading.

**apply** (`fix-c7/apply-out.txt`), exit 0:

    P-153: rewritten
    P-87: rewritten
    P-89: rewritten
    P-90: rewritten
    P-91: rewritten

**check --base db0e0ad9b** (`fix-c7/check-after.txt`), exit 0:

    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

What changed in it, against the run before the apply:
- POSITIONS: 83 entries before and after; nothing struck. Over 600 characters: 18 entries before and after. P-153 is 986 characters, now 882; the size is reported, never refused. The others of the chunk are under 600: P-87 457, P-89 192, P-90 303, P-91 373.
- No `from` path or cited section was reported as unresolved.
- FACTS's list is unchanged, and `FACTS.md` and `FACTS-history.md` are byte for byte the same as the real files (`cmp`).

**Refusals.** None. No pointer words needed refreshing: P-153 is the only entry retitled, and no entry of FACTS or POSITIONS quotes its title. The one quote of it is in `review-queue.md`, outside the tool's reach (see "P-153", pointers).

**POSITIONS.md.** Five lines are rewritten as in the "After" texts above (`fix-c7/POSITIONS.diff`). The blocks that the apply appended to `POSITIONS-history.md`, verbatim (`fix-c7/history-blocks.txt`; the time is the run's clock, and a real apply would stamp its own and name its own `by`):

```

### P-153

2026-10-22 01:20Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c7.md`, "P-153" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c7.md`, "P-153" · commit `5ad4a9957` · by the full run's writer for chunk c7 (Opus), proposed for his review: the title reworded to lead with the split, at his later word: at 2026-10-20T05:56:19.215Z, answering the coordinator's 05:51:32.573Z, which had said that he decided a negative power raises an error, he did not recall the decision so: it was a split, with an error perhaps in one case; the coordinator's restatement of 05:56:57.217Z, the split on the base's type with the error as one case of it, is the one he went on from (06:01:04.054Z). "Built in the one library and under walk" goes to this history: climb batch 20's rung I (`5ad4a9957`; F-263). From "Still to build", the clause that the compiled powers answer 0 at a negative exponent today leaves for F-263, and their timing, when phase 4's natives bind the one library's `^`, leaves for the review queue as a drafted item: climb batch 20's routing set it, and the coordinator's 2026-10-20T11:58:26.450Z told him only that P-153 was to be marked built. The rest kept: his answer "Yes." at 2026-10-20T00:44:34.730Z, quoting the recommendation of the coordinator's 00:19:08.321Z ask 2, option 1 (E): each integer `^` returns its own type, a negative exponent raises `IntegerOverflow`, a base of 0 `DivisionByZero`, the bases 1 and -1 their exact power, and a program that wants 1/2 writes `2.0^(-1)`. The idea of a split is his: 2026-10-19T23:55:49.331Z, answering the coordinator's 23:33:57.594Z first form of ask 2 (E, Z, R and X): a combination of options, and whether overloads can split the negative exponents from the positive; and 2026-10-20T00:01:06.669Z, answering the coordinator's 2026-10-19T23:57:18.359Z: launch Fable with that question.

- P-153 **An integer raised to a negative power raises an error; a fraction comes from a float or rational base (contract E, item 58).** Each integer type's `^` answers its own type at every exponent: a negative exponent raises `IntegerOverflow` where the result is no integer, a base of 0 raises `DivisionByZero`, and the bases 1 and -1 give their exact power. A program that wants a fraction writes a float or rational base, as `2.0^(-1)`. Why: the team's later code types an integer power by its integer at a signed exponent (P-26); overloads choose by type, and no type carries an exponent's or a numeral's sign, so the split is on the base, with the sign tested at run time as the library tests every sign-refined subset (P-80). Built in the one library and under walk. Still to build: the compiled path's own powers by the same contract, which answer 0 at a negative exponent today, when phase 4's natives bind the one library's `^` (rows 441 and 523; PLAN, phase 4, the natives).

### P-87

2026-10-22 01:20Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c7.md`, "P-87" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c7.md`, "P-87" · commit `84aef6a4f` · by the full run's writer for chunk c7 (Opus), proposed for his review: the patch's place added: `84aef6a4f` removed `reviews/decision-d-diff/`, with the patch and its re-based copy (`rebase-2026-09-29/decision-d.patch`), and only the review stays in the tree. The rest kept. The operator rule: at 2026-09-19T18:13:00.524Z, answering the coordinator's 18:08:05.767Z C4 fix, in which one `+` of the model became a function call, he pasted the mask line before and after (`mask + ...` to `planeSum(mask, ...)`) and wrote "NO. NO! NOOOOO! That’s not Fortress!". The vocabulary repaired around the model: his 17:01:32.913Z, on the C4 review's rename of `MAX`: the fix is to compose the algorithm from the standard array operations; and his 18:21:22.941Z, after the coordinator's 18:16:23.727Z: the operations must compose in the normal mathematical ways. The diff rule is put to him as a question: its seed is his one-time request of 18:02:13.648Z, answering the coordinator's 17:57:51.005Z, that a minimal C4 fix be shown to him; its wording is the coordinator's (`bd84d76d9`); the coordinator's 2026-09-27T19:31:23.674Z ask gave it as his rule of 09-19, and he did not contest it. Decision D: his "Yes. Agree with recommendation." at 2026-09-27T19:34:10.747Z, answering that 19:31:23.674Z ask: write decision D's diff now and apply nothing until phase 5.

- P-87 **The model's text is the notation, and the vocabulary is repaired around it.** An operator in the model never becomes a function call to satisfy an overload check. Any repair that changes a model line is shown to him as a diff before it is built. Decision D, the sized signatures of the flat program C4's vocabulary, is such a diff (`reviews/decision-d-diff.md`); nothing of it is applied before PLAN phase 5.

### P-89

2026-10-22 01:20Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c7.md`, "P-89" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c7.md`, "P-89" · commit `f3b62bc83` · by the full run's writer for chunk c7 (Opus), proposed for his review: "It is his answer to PLAN item 10" dropped: PLAN's item 10 is now another line, and the `fill` item left PLAN at `ad56edb62` (PLAN-history, item 10, "The `fill` pairs"). "Built; no model line changed." goes to this history: climb batch 7's rung A (`f3b62bc83`; F-158), with no line of `MicroGptFlat.fss` or `MicroGptApl.fss` changed. The diamond half of his yes, the fix in the leaf array traits, was built at the meet instead: F-158 holds the build, and review-queue item 112 the placement, his to confirm. The rest kept: his "Agreed, tabulate." at 2026-09-26T12:17:35.442Z, answering the coordinator's 12:14:58.152Z answer 10: the diamond fix, plus the function form renamed `tabulate` or a name he prefers, `tabulate` recommended, since wherever Java, Scala, Kotlin, C++, Rust and Julia say `fill` it means the value form.

- P-89 **`fill` takes a value, `tabulate` a function (answer 10).** It is his answer to PLAN item 10. `fill` keeps the value form, every peer language's meaning of the word, and the function form takes Scala's name `tabulate`. Built; no model line changed.

### P-90

2026-10-22 01:20Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c7.md`, "P-90" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c7.md`, "P-90" · commit `3924e7ec3` · by the full run's writer for chunk c7 (Opus), proposed for his review: the bare form's premise corrected, and put to him as a question: his word of 2026-09-21T21:20:29.106Z, answering the coordinator's 21:08:15.030Z "Rows 26 and 33 together", option 1, keeps the team's parametric spelling and records the bare form as future work gated on `where` clauses; but the specification that rung S wrote under his S2 yes (`3924e7ec3`) says that one `Nothing` for every `T` is what instantiation exclusion forbids, "instantiation exclusion closes that road" (`Specification/basic-lib/convenience.tex`, the `revival-nothing` callout; `Specification/basic/trait-parameters.tex:397-398`), so building `where` clauses (P-151) does not open the gate (the coordinator's own note, `reviews/open-asks-2026-10-16.md:258`). "and the specification": his "S2 yes, take the verdicts for rung S" at 2026-09-26T08:07:48.939Z and "Yes. Sure." at 08:18:07.238Z, both answering the coordinator's 08:00:01.931Z ask, whose verdicts held `Nothing[\T\]` as the library's shape and his row 331 decision. The parked re-gating of row 331 on static-argument inference leaves: an agent's default, which the S2 ask listed as not covered by that yes; review-queue item 167 and PLAN, "Off the path, parked", hold it.

- P-90 **`Maybe`'s empty case is the team's parametric `Nothing[\T\]`, in the one library and the specification.** The bare `Nothing` is future work: it needs a `where` clause that binds a type variable in an `extends` clause, which neither path implements, and it is not tried before then. Gating row 331 on static-argument inference instead is parked (PLAN, "Off the path, parked").

### P-91

2026-10-22 01:20Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c7.md`, "P-91" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c7.md`, "P-91" · commit `6bec1b004` · by the full run's writer for chunk c7 (Opus), proposed for his review: "Built, but ..." rewritten as what is still to build: the recommendation that he took also restores walk's article `asDebugString` on the compiled path so that the debug rendering agrees (`reviews/default-rendering-judgement.md`, "5. Recommendation"), and the compiled `asDebugString` is still `self.asString` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:357`), row 363. The built half, the bare type name on both paths, goes to this history: climb batch 3's rung S (`6bec1b004`; F-123). The rest kept: his "yes, row 27 close per default-rendering-judgement recommendation." at 2026-09-22T04:45:52.849Z, answering the coordinator's 2026-09-21T21:53:45.883Z, repeated at 23:23:34.884Z: the judge's ruling, the bare type name, the interpreter's spelling, on both paths. The marker sentence is the coordinator's line in that ask, within the recommendation. Before it, his 21:26:46.253Z, answering the coordinator's 21:22:24.200Z three options for row 321: he leans to option 2, the Java class name, since these are debug messages to him; his 21:32:52.066Z, answering the coordinator's 21:27:08.642Z: still option 2, and the same behaviour on both paths if possible; his 21:44:45.138Z, answering the coordinator's 21:39:02.511Z: a fresh Fable reviews the alternatives and recommends one.

- P-91 **What an object with no `asString` prints: its bare Fortress type name, walk's spelling, on both paths.** The debug marker he had in mind goes in `asDebugString`. Built, but for an object with a member named `toString`, which still overflows the stack when compiled (row 321).
```

**What the tool could not do.** Five entries are kept word for word: P-84, P-95, P-96, P-97 and P-98. Their sources have no route into the history, since an apply line equal to the entry is skipped and a call that changes nothing is refused (`positions-audit/trial/evidence/corrections.md`, "What the tool could not do"). The lines are listed under "History lines the tool cannot write". The two questions on kept text (P-87's diff rule and P-95's frozen copy) also leave no block until he answers.

**What check does not see.** It checks pointers only inside FACTS and POSITIONS. The stale or affected lines named under each entry's pointers pass:
- `review-queue.md:1218`, item 26, quoting P-153's old title.
- PLAN, phase 4, "The natives": "negative exponents left to row 441".
- `.claude/skills/coordinator/references/sources.md:63`: "P-87's clause" on the ledger, cut in October.
- `PLAN.md:77` and review-queue item 36: paths under `reviews/decision-d-diff/` that left the tree at `84aef6a4f`.
- `PLAN.md:63` and `:74`: P-90's bare `Nothing` as waiting or open.

## The rules, where they fit badly

1. **P-87's diff rule: rules 1, 2, 5 and 7.** The judgement classes the sentence as "a default that an agent landed, still waiting for his review as a standing rule". By rule 2 it would leave for the queue. But it is a standing process rule, not a choice among ways that landed in the tree. The queue's form, "Landed", "The other way", "Its cost", fits it badly. It also has a source of his, though only a one-time one (18:02:13 on 09-19). The 09-27 ask gave it to him as his own rule, and he took that ask. Rule 5 says that text without a source of his stays, and becomes a question; rule 0 and his page comment of 23:29 on 10-21 ("we are somehow too aggressive in touching everything") point the same way. So it stays, and becomes question 1 of P-87.
2. **P-153's timing: rules 2 and 9.** Rule 9 keeps "what is still to build" as one short line with its PLAN item. Rule 2 sends a default to the queue. The PLAN pointer that rule 9 keeps, phase 4's natives, is itself the timing. I kept the pointer and moved the clause that stated the timing. I drafted Q-?1, because PLAN's phase 4 binds the positive half and leaves "negative exponents ... to row 441", so the negative half's place there is the routing's alone. If the coordinator reads phase 4's natives as already PLAN's home for both halves, Q-?1 can be dropped and the entry stays as proposed.
3. **P-90: rules 1, 8 and 4.** The future-work gate is his decision (rule 1), and its premise is false today (rule 8). Correcting the premise changes what his decision means: the gate never opens. So I proposed text from the source, kept the part of his rule that cuts ("not tried"), and put the whole sentence to him as a question.
4. **P-95's frozen copy: rule 7.** The standing "never" adds to what he approved, a single rung. But he approved texts that held it, so rule 7's last clause applies: it stays and becomes a question. Rule 5 would give the same outcome.
5. **P-98: rule 2 against rule 1.** The judgement says that his yes is "in effect a default that still waits for his review". His words are a decision ("the default stays"), and the explanation owed is not a decision (review-queue item 109: "no decision"). Moving the entry to the queue would lose the library's shape that must keep working, so it stays word for word.
6. **P-89 and P-91, rule 9 against rule 0.** "Built" is correct in P-89 and overstated in P-91. Neither is his. Rule 9 sends a list of what is built to the history. Rule 0 keeps only what is his and correct, so rule 9 applies. P-89's "no model line changed" goes with "Built". It ties the entry to P-87, but tells a reader nothing to do.
