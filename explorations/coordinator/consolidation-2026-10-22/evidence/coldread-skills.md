<!-- The cold read of the skill parts changed on 2026-10-22 (fortress-repo and coordinator, base b6f5268e1^): an Opus reader with only the skills; 55 flags, 2 high, 19 medium, 34 low; lint clean. Saved by the coordinator from the reader's final message. -->

Cold read of `fortress-repo` and `coordinator`. Base `b6f5268e1^`, HEAD `ca6f7fee7`. I edited no file.

## 1. The lint's output, whole

`python3 explorations/coordinator/tools/skills-lint.py` on the 12 changed parts printed nothing and exited 0. It had no hits.

## 2. What I would do differently, section by section

**fortress-repo**

- **SKILL.md, glossary (model program, one library).** I would know that microGPT is two programs at the two given paths, each with a quick check beside it. I would know that "one library" is the interpreter's library, which both paths use after the switch-over. Limit: "model line" stays unclear.
- **SKILL.md, the description and the line for the revival part.** I would read `revival-changes.md` whole after `SKILL.md` and before any work, not only when sources disagree.
- **revival-changes.md, introduction.**
  - I would take a sentence with a P-N as the curator's decision.
  - I would take a sentence with a row as a departure, which a test must not assert as correct.
  - I would cite a rule without a P-N, but not as a decision.
  - I would distrust old notes and my training on nested numbers, wrapping and conversion.
  - I would search FACTS and POSITIONS before I called a disagreement a conflict.
  - Limit: I cannot tell whether a bold rule is the tree today or the target.
- **Dispatch and overloading.**
  - I would let overloads differ in their static bounds, and judge a pair by its declared domains.
  - I would read exclusion over the whole tuple, and refuse a pair that leaves a parameter free.
  - I would not trust walk's load check without its row in `interpreter.md`.
  - I would treat functional methods with equal parameter types as duplicates, wherever `self` stands.
  - I would declare the method in an object that inherits it abstract from one trait and concrete from another.
- **Traits and objects.**
  - I would never extend two instantiations of one generic trait.
  - I would read `comprises` over values.
  - I would use `override` only to widen, and declare again without it to replace.
  - I would cover an inherited abstract method with bodies.
  - I would know the type of `self` in a self-typed trait, and not return `self` in compiled code.
  - I would order tuples only on `StandardPartialOrder` elements, and lists of `RR64` not at all under the checker.
- **Static parameters, `where` clauses and sizes.**
  - An unfixed parameter takes its bound. Under walk, I would write the static argument, as `mk[\ZZ64\]()`.
  - I would use only the three `where` forms. The checker ignores other `extends`-`where` clauses without a message. The code generator refuses a declaration's own `where` clause.
  - I would compare sizes by their written form, and keep size powers at or below 4096.
  - I would use `reflect` only under walk until the switch-over.
- **Numbers.**
  - The number types are siblings. "Route A" and "the tower" are the record's words for them.
  - Under walk, a numeral has the class `Int`, `Long` or `BigNum`.
  - I would write the static argument for `array1` and `array2`.
  - I would expect declared coercions, promotion to the narrowest type, and the stop "Ambiguous coercion".
  - Integer powers answer the base's type. I would write `2.0^(-1)`.
- **Reductions and comprehensions.**
  - I would always write `SUM[\T\]` in a clause form.
  - I would know walk's instance rule: a local variable's or a function's declared type, else the join.
  - A reduction without an identity lifts to `Maybe`. I would declare `simpleJoin` at `R`, and not copy the team's tests.
- **Implementation limits.** I would write no `Maybe` as an `if` condition, and write every parameter type.
- **interpreter.md, "What walk checks".**
  - Walk lifts object expressions to the top level.
  - It checks a generic type once, through a stand-in, and skips some pairs through it.
  - I would know its message for each rule, the pairs that keep the team's message, and its six departures with their rows.
  - A member typed with its trait's `comprises`-clause variable stops every program at load.
- **compiler.md, glossary.** The count stage's total is the checker count, cut at each component's first error. How it is cut is unclear.
- **compiler.md, the array query.** I would use the new query string.
- **compiler.md, "The checker's gaps".**
  - The checker refuses the `tint` pair (row 786), and accepts `g[\T\](a: T)` beside `g(a: Any)` (row 759).
  - It checks `where` constraints at a call, except in three cases.
  - It applies a conditional extension's condition only in the places listed.
  - It gives a fresh type to a `comprises`-clause variable for each value, with three departures.
- **library.md.** I would write the element type in every bracketed `SUM` or `PROD`, and write `fail[\T\]` where a type is needed. I have no flags here.
- **exploring.md, step 1.** When two sources disagree, I would look for the construct in `revival-changes.md`.
- **records.md, "The gap ledger".** I would replace a changed row's whole line with `rewrite`, never a repair note.
- **records.md, "Writing to the record".**
  - I would use `rewrite` to correct a claim, cut notes or change the reproducer.
  - I would close a row with a tools file, or with `none --note`, and add `--settled` for a `CONTESTED` row.
  - `landing-check` lists the record's problems.
  - Limits: what FILE's number cell holds, and when to run `landing-check`.

**coordinator**

- **SKILL.md, glossary.**
  - PLAN's phases are 3 to 6. I would cite a PLAN item by section and item, and a review-queue item by number.
  - A default stands in the tree and waits for review.
  - I would know where a batch's folder and a rung's brief are.
  - Limits: the review list against the review queue, and the two senses of "default".
- **record.md, "What an entry is".**
  - An entry reads on its own, with its conditions and the kind of its evidence.
  - It holds no plan, status or review words.
  - A missing part is "row N", with a few words. Pointers carry words. Handles from past conversations go to the history.
  - FACTS entries get six checks and one of four dispositions.
  - Limits: when to apply the checks, and what an evidence fail gets.
- **record.md, "The pass".** The pass owns the wording. A rung reports findings. Step 4 cuts plan and status, and checks that the PLAN or review-queue item names the entry.
- **record.md, "The consolidation tools".**
  - Run the mining workflow before the clarity workflow, on untraced POSITIONS entries.
  - Run the clarity workflow when entries stop reading on their own.
  - Run the orientation workflow's update mode after each landing, and its consolidate mode when the part drifts.
  - Put the open questions on the review queue.
- **delegating.md.**
  - Every writer runs on Opus, also when this session runs on Fable.
  - Run long writing passes as writer streams, one stream for each Workflow run.
  - End each round with one judge. No chunk gets a second fix round.
- **batch.md, the distance.** `distance/run.sh` counts it, and FACTS holds its value.
- **batch.md, "The landing".** The landing check must print nothing. After the landing, run the orientation update and have the writer install it. A built part is no longer cut from POSITIONS.
- **skill-rewrite.md, the method.** After each landing, run the orientation update within its README's length budget. The writer installs what its judge accepts.

## 3. The flags

### fortress-repo/SKILL.md

**F1. Line 29.**
- Passage: "It has two programs: C4, the flat program (...), and the APL program (...)."
- Kind: term not defined.
- Problem: "C4" and "flat" are not defined, so a worker cannot tell what C4 names in a brief.
- Confidence: low.
- Fix, restate: "microGPT, the program by which the revival is measured, written twice: the flat program, which the record calls C4 (`...`), and the APL program (`...`)."

**F2. Line 29.**
- Passage: "A model line is a line of the two programs."
- Kind: reads two ways.
- Problem: it can mean a source line of either program or one of the two versions. The coordinator's `batch.md`:24 treats "a model or APL line" as two things.
- Confidence: medium.
- Fix, restate: "A model line is a source line of either program."

**F3. Line 203.** This text is outside the change, but the change makes it incomplete.
- Passage: "every task needs `records.md`, for its queries and its report."
- Kind: gotcha.
- Problem: the part lists that follow leave out `revival-changes.md`, which line 194 now makes a read for every task.
- Confidence: low.
- Fix, restate: "every task needs `revival-changes.md`, read whole before work, and `records.md`, for its queries and its report."

### fortress-repo/references/revival-changes.md

**R1. Line 5.**
- Passage: "Each rule states the tree as it stands."
- Kind: reads two ways.
- Problem: line 7 says that a sentence citing a row states a departure from a rule. So a worker cannot tell whether a bold rule is the behaviour today, and may assert in a test a rule that one path fails.
- Confidence: medium.
- Fix, restate: "Each bold rule states revived Fortress as decided. A sentence that cites a ledger row states where one path does not follow it yet."

**R2. Line 5.**
- Passage: "the type group's later papers"
- Kind: term not defined.
- Problem: only `exploring.md`:16 defines the term, and the worker reads that part later or never.
- Confidence: low.
- Fix, restate: "the later papers of the type group, the team members who built the checker and the compiler from 2009 to 2012,".

**R3. Line 11.**
- Passage: "the set of argument types that its declared parameter types accept, at every instance within its bounds."
- Kind: reads two ways.
- Problem: "at every instance" reads as the intersection over instances, not the union. Every later rule is applied to this set.
- Confidence: medium.
- Fix, restate: "the set of argument types that its parameter types accept at some instance within its bounds. For `ident[\T extends Shape\](x: T)`, it is `Shape`."

**R4. Line 13.**
- Passage: "The team's walk read exclusion position by position."
- Kind: second question (history).
- Problem: it changes no action.
- Confidence: low.
- Fix: delete.

**R5. Lines 19-22.**
- Passage: "So the checker refuses `f(self, y: S)` beside `f(x: S, self)`", and the two bullets after it that say "the checker refuses".
- Kind: gotcha.
- Problem: the part gives no walk behaviour and no row, so a worker who writes a walk test cannot tell whether to expect a refusal at load.
- Confidence: low.
- Fix: add "Walk refuses them too." or "Walk loads them (row N).", whichever holds.

**R6. Line 29.**
- Passage: "Every value of the closed trait"
- Kind: term not defined.
- Confidence: low.
- Fix, restate: "Every value of the trait that declares the clause".

**R7. Line 29.**
- Passage: "Walk checks only the clauses of the program's main component at load."
- Kind: reads two ways.
- Problem: it does not say what walk checks in a clause, and it does not point to `interpreter.md`:53.
- Confidence: low.
- Fix, restate: "At load, walk checks the extenders of the `comprises` clauses of the program's main component only (`interpreter.md`, "What walk checks")."

**R8. Line 31.**
- Passage: "A trait's `override` holds for every type below it."
- Kind: reads two ways.
- Problem: it can mean that every subtype inherits the override, or that the override must widen at every subtype.
- Confidence: low.
- Fix: restate as a short example of what a worker sees.

**R9. Line 33.**
- Passage: "Both paths stop their search for a cover at limits that `interpreter.md` gives."
- Kind: claim a worker could not check.
- Problem: `interpreter.md`:55 gives walk's limits only, so a worker searches for the checker's limits and finds none.
- Confidence: medium.
- Fix, restate: "Walk stops its search for a cover at limits that `interpreter.md`, "What walk checks", gives." Then give the checker's limit, here or in `compiler.md`, "The checker's gaps".

**R10. Line 35.**
- Passage: "if it has no `comprises` clause, or `comprises { ... }`,"
- Kind: reads two ways.
- Problem: a Java or Scala reader takes `{ ... }` as a placeholder for any list. Then every trait with a parameter bounded by itself looks self-typed.
- Confidence: high.
- Fix, restate: "if it has no `comprises` clause, or the clause `comprises { ... }` with the three dots written literally,".

**R11. Line 46.**
- Passage: "A generic type that holds `OPEN` admits no more than at `Bottom`."
- Kind: reads two ways.
- Problem: a worker cannot test the claim. It also seems to contradict `SKILL.md`:132, "every value passes it".
- Confidence: medium.
- Fix, restate (the writer must confirm it): "A value passes a parameter whose type is `OPEN`. A type with `OPEN` inside, as `BoxU[\OPEN\]`, admits only the values that `BoxU[\Bottom\]` admits."

**R12. Line 63.**
- Passage: "passed where `N[\n\]` is expected"
- Kind: term not defined.
- Confidence: low.
- Fix, restate: "passed where the type `N[\n\]` of `NatReflect.fsi` is expected".

**R13. Line 69.**
- Passage: "`array1` and `array2` give a `Vector` or `Matrix`"
- Kind: term not defined.
- Confidence: low.
- Fix, restate: "The library's array factories `array1` and `array2` give ...".

**R14. Line 71.**
- Passage: "In a few cases the checker settles the tie by the numeral's type instead"
- Kind: claim a worker could not check.
- Problem: a worker cannot tell which calls are settled and which stop with "Ambiguous coercion". Also, line 69 types a numeral as `IntLiteral`, not `ZZ32`.
- Confidence: low.
- Fix: name the cases, or delete the sentence.

**R15. Line 89.**
- Passage: "It takes a `Maybe` as an `if` condition, `Just` as true and `Nothing` as false, and refuses other values."
- Kind: reads two ways.
- Problem: it reads as if walk also refuses a `Boolean`.
- Confidence: medium.
- Fix, restate: "Besides a `Boolean`, walk takes a `Maybe` as an `if` condition, `Just` as true and `Nothing` as false. It refuses any other value."

**R16. Line 91.**
- Passage: "Walk runs it, except in a method that implements an abstract one (row 405)."
- Kind: reads two ways.
- Problem: a worker cannot tell which half row 405 records, so it cannot tell which behaviour a test may assert.
- Confidence: low.
- Fix: put the row on the clause that it records.

### fortress-repo/references/interpreter.md

**I1. Line 36.**
- Passage: "It makes no stand-in, and so no such check, for a declaration with an `opr` static parameter, or where it cannot make the type."
- Kind: reads two ways.
- Problem: "no such check" can mean the functional-method check or every check through the stand-in. A worker cannot tell when walk "cannot make the type".
- Confidence: low.
- Fix, restate: "For a declaration with an `opr` static parameter, or one whose stand-in walk cannot build, walk makes no stand-in, and checks none of its functional-method pairs at load." Name a case where the stand-in cannot be built.

**I2. Line 38.**
- Passage: "the No Duplicates Rule, the Meet Rule and the return-type rule ... (`revival-changes.md`, "Dispatch and overloading")"
- Kind: term not defined.
- Problem: the cited section no longer names these rules, and `SKILL.md`:129 states them without names.
- Confidence: low.
- Fix, restate: "the No Duplicates Rule (no two equal domains), the Meet Rule (a third declaration covers their meet) and the Return Type Rule (`SKILL.md`, "Fortress as a language")".

**I3. Line 42.**
- Passage: "the instances of an explicit instantiation."
- Kind: term not defined.
- Confidence: low.
- Fix: define the term with an example in the same line.

**I4. Line 53.**
- Passage: "walk reads it at every type of the variable (ledger row 754)."
- Kind: reads two ways.
- Problem: it does not say whether walk ignores the bound `E extends Number`.
- Confidence: low.
- Fix, restate (the writer must confirm it): "walk ignores the variable's bound, and allows `NBox[\T\]` at any `T` (ledger row 754)."

### fortress-repo/references/compiler.md

**C1. Line 4.**
- Passage: "counts the errors up to each component's first error."
- Kind: reads two ways.
- Problem: it can mean one error for each failing component, or the errors before the checker stops on a component. A worker who reads a move of the count needs to know which.
- Confidence: medium.
- Fix: state what is counted for one component, and whether a fix can raise the count by uncovering later errors.

**C2. Line 78.**
- Passage: "a static parameter of the arrow"
- Kind: term not defined.
- Confidence: low.
- Fix, restate: "a static parameter of the function's arrow type, as if declared in its `[\ \]`".

**C3. Line 78.**
- Passage: "A trait's or object's own constraint is checked where its type is used, also at a constructor call."
- Kind: reads two ways.
- Problem: `revival-changes.md`:54 says that three `where` forms are built, and its list leaves out a type's own `where` clause. So a worker cannot tell whether it may write one.
- Confidence: medium.
- Fix: add the form to that list with its limits (the code generator refuses it, row 701), or say here that only the checker reads it.

**C4. Lines 79-81.**
- Passage: "(ledger row 470)", on the last bullet only.
- Kind: reads two ways.
- Problem: a worker cannot tell whether the first two gaps have rows. It may add a duplicate row, or record none.
- Confidence: low.
- Fix: give each bullet its row.

**C5. Line 82.**
- Passage: "the condition holds while the checker checks the `extends` entry itself, an object's value parameters and the members."
- Kind: reads two ways.
- Problem: "the members" reads as every member of the type.
- Confidence: low.
- Fix: name which members.

### fortress-repo/references/exploring.md

**E1. Line 41.**
- Passage: "look for the construct in `revival-changes.md` first."
- Kind: reads two ways.
- Problem: "first" can mean before the record search in the same step, or before step 2.
- Confidence: low.
- Fix, restate: "If two of the team's sources disagree, look for the construct in `revival-changes.md` before you search the record."

### fortress-repo/references/records.md

**D1. Line 106.**
- Passage: "`$L rewrite N FILE` replaces row N with the whole line in FILE"
- Kind: gotcha.
- Problem: it does not say whether FILE's number cell holds N or `?`, as for `add`. A first rewrite can fail the template check.
- Confidence: medium.
- Fix, restate (the writer must confirm it): "FILE holds the row's whole new line, with N in its number cell."

**D2. Line 109.**
- Passage: "prints each problem that the commits after BASE leave in the record"
- Kind: reads two ways.
- Problem: a worker reads it as the problems that its own commits made. But `batch.md`:81 says that a finding the base already had counts too. The line also gives no time to run the command.
- Confidence: medium.
- Fix, restate: "prints each problem in the record at `HEAD`, also one that BASE already had, and exits 1 on any. Run it when your brief asks for it."

### coordinator/SKILL.md

**K1. Line 23.**
- Passage: "3, the checker at zero;"
- Kind: reads two ways.
- Problem: it can mean the checker count or the distance, which `batch.md`:26-30 defines as two counts.
- Confidence: medium.
- Fix, restate: "3, the distance at zero (`references/batch.md`);".

**K2. Line 23.**
- Passage: "Its last phases are ... 4, the switch-over;"
- Kind: term not defined.
- Problem: the term is first defined at line 155, in passing. "Last" can also mean the most recent.
- Confidence: low.
- Fix, restate: "Its phases end with ... 4, the switch-over, the move of the compiled path onto the interpreter's library;".

**K3. Lines 25-26, which make lines 53 and 199 and `record.md`:100 unclear.**
- Passage: "**review queue** : `explorations/coordinator/review-queue.md`: numbered items that wait for the curator's word or review."
- Kind: reads two ways.
- Problem: line 53 puts the review list in PLAN, and line 199 puts "the review lists" in `review-queue.md`. So the coordinator cannot tell which file takes an item.
- Confidence: medium.
- Fix: use one term for each file. Keep "review queue" for `review-queue.md`, the one home of each item. Define PLAN's list as the one-line pointers to review-queue items, under each batch.

**K4. Lines 28-29, which make line 157 and `batch.md`:35 and :65 wrong.**
- Passage: "**default** : Choice that an agent made and landed without the curator's word."
- Kind: reads two ways.
- Problem: those lines use the word for the option that stands unless the curator picks another, before anything lands.
- Confidence: medium.
- Fix, restate: "**default** : Option that stands unless the curator picks another: the one that an ask offers, or the one that an agent landed without the curator's word, whose item waits in the review queue."

**K5. Line 35.**
- Passage: "`explorations/coordinator/CLIMB-BATCH-<N>.md`"
- Kind: reads two ways.
- Problem: `batch.md`:6 names the same file `CLIMB-BATCH-<name>.md`.
- Confidence: low.
- Fix: use one placeholder in both.

**K6. Line 93.**
- Passage: "a line of the model program"
- Kind: term not defined.
- Problem: the change removed this skill's glossary entry, and this reader does not load `fortress-repo`.
- Confidence: low.
- Fix: write "a line of its two programs", or restore the entry.

### coordinator/references/record.md

**M1. Line 9, with lines 18 and 22.**
- Passage: "Another entry's number in the sentence that needs it: "It builds P-48.""
- Kind: reads two ways.
- Problem: the new line 22 asks each pointer to carry a few words. The glossary example and line 18 ("the decision it builds, by number") are bare numbers.
- Confidence: low.
- Fix, restate: make the example "It builds P-48, on sizes compared by their written form.", and write "by number and subject" in line 18.

**M2. Line 21.**
- Passage: "If the tree lacks a part of a decision or a fact"
- Kind: reads two ways.
- Problem: a fact describes the tree, so "the tree lacks a part of a fact" has no clear case.
- Confidence: low.
- Fix, restate: "If the tree does not yet do what a decision requires, the missing part is a row of the gap ledger."

**M3. Line 40.**
- Passage: "Judge a FACTS entry by six checks."
- Kind: gotcha.
- Problem: it gives no time to apply the checks, and the pass's steps (lines 76-83) do not use them.
- Confidence: medium.
- Fix, restate: "In a consolidation, judge each FACTS entry by six checks.", or add the checks as a step of the pass.

**M4. Lines 49-54.**
- Passage: "A fail of scope, evidence or consistency blocks the entry."
- Kind: gotcha.
- Problem: "blocks" names no action. No disposition fits support that exists but does not hold the claim: "reword" needs the meaning to hold, and "investigate" needs the support to be unresolved.
- Confidence: medium.
- Fix, restate: "An entry that fails scope, evidence or consistency is not kept as it stands." Add the disposition "- correct: the support does not hold the claim. Restate the claim to what the support shows, or remove the entry."

**M5. Line 56.**
- Passage: "The detail of each check is in `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric"."
- Kind: review named as the source of a rule.
- Problem: it gives no trigger and no bounded query.
- Confidence: high.
- Fix: delete the sentence. Move into the six checks any detail that changes a verdict.

**M6. Line 74, against line 76.**
- Passage: "It writes no finished prose."
- Kind: reads two ways.
- Problem: line 76 says that a rung writes its entries in `record.md`.
- Confidence: low.
- Fix, restate: "A rung writes its findings as draft entries in `record.md`: the claim, its conditions, its evidence and what it means. The pass writes the final wording."

**M7. Line 103.**
- Passage: "by the six checks above"
- Kind: reads two ways.
- Problem: two lists of six stand above this line: the six questions at lines 33-38 and the six checks at lines 42-47.
- Confidence: medium.
- Fix, restate: "by the six checks of "What an entry is": scope, present meaning, evidence, comprehension, ownership and consistency".

**M8. Line 103.**
- Passage: "A cold read and a fidelity check follow the writer, then its fix round, a second cold read, and a judge that applies or holds each entry."
- Kind: second question.
- Problem: the workflow's stages change no step of the coordinator. The README holds them. "Holds" also reads as the held list.
- Confidence: low.
- Fix: delete.

**M9. Line 104.**
- Passage: "run it once, and again when the part drifts."
- Kind: reads two ways.
- Problem: after a compaction, the coordinator cannot tell whether "once" is done. "Drifts" names no test.
- Confidence: medium.
- Fix, restate: "Run its consolidate mode when the part fails [a named test, such as its length budget]."

### coordinator/references/delegating.md

**G1. Lines 16 and 80.**
- Passage: "writes the chunks of a long writing pass" and "applies or holds each chunk's items."
- Kind: term not defined.
- Problem: "chunk", "round", "items" and "holds" are not defined here.
- Confidence: low.
- Fix: define a chunk. Restate line 80: "End each round with one judge. It applies each item that a chunk's reviews raise, or keeps it out and puts it on the review queue."

**G2. Line 78.**
- Passage: "So a fix round resumes the session that wrote the text"
- Kind: term not defined.
- Confidence: low.
- Fix, restate: "So the round that fixes a chunk after its review resumes the session that wrote it".

**G3. Line 79.**
- Passage: "Give each Workflow run its own stream, and run several side by side."
- Kind: reads two ways.
- Problem: "several" can mean several streams or several runs. Line 67 also limits the tool to two agents at once.
- Confidence: low.
- Fix, restate: "Give each Workflow run its own stream. Several such runs can go side by side."

### coordinator/references/batch.md

**B1. Line 30.**
- Passage: "which must reach zero before the switch-over."
- Kind: term not defined.
- Problem: the change dropped the clause that defined the term here.
- Confidence: low.
- Fix: restore ": the move of the compiled path onto the interpreter's library".

**B2. Line 81.**
- Passage: "Any finding fails the stage until it is cleared through `rewrite`, `close` or `note`, or the entry is reworded."
- Kind: gotcha.
- Problem: "the stage" can be the gather or the merged-diff review, and no one is named to clear a finding. Since a finding that the base already had counts, a batch launched on such a base fails at its gather.
- Confidence: medium.
- Fix, restate (the writer must confirm who clears it): "Before the launch, run `ledger.py landing-check` on the base, and clear each finding. In the run, a finding fails the gather and the merged-diff review until [named role] clears it."

**B3. Line 87.**
- Passage: "on the landing's new and changed FACTS entries"
- Kind: gotcha.
- Problem: no command lists these entries.
- Confidence: low.
- Fix: add the command.

### coordinator/references/skill-rewrite.md

**S1. Line 26.**
- Passage: "It rewrites the affected explanation of ... `revival-changes.md` in place ... Have the writer install what its judge accepts."
- Kind: reads two ways.
- Problem: "in place" says that the workflow edits the file, but "install" says that it only proposes text. "Explanation" names no unit of the part.
- Confidence: medium.
- Fix, restate: "It writes new text for each paragraph of `revival-changes.md` that those entries touch, within the length budget that its README gives. Have the writer install the paragraphs that its judge accepts."

**S2. Line 26, and also `batch.md`:87 and `record.md`:104.**
- Passage: "new and changed FACTS entries"
- Kind: gotcha.
- Problem: the revival part cites POSITIONS entries in most rules. So a decision that a landing changes leaves the part stale.
- Confidence: low.
- Fix: write "new and changed FACTS and POSITIONS entries", or say why POSITIONS is left out.

**S3. Line 26, with `batch.md`:87 and `record.md`:104.**
- Passage: the same step, stated in three parts.
- Kind: breaks the register (one home for each thing).
- Problem: the three texts drift apart when the step changes.
- Confidence: low.
- Fix: keep the step in `batch.md`'s landing steps, and point to it from here.

## 4. Undefined terms

- C4, and the flat program: fortress-repo `SKILL.md`:29.
- type group: `revival-changes.md`:5. Only `exploring.md`:16 defines it.
- closed trait: `revival-changes.md`:29.
- `N[\n\]`: `revival-changes.md`:63.
- `array1` and `array2`: `revival-changes.md`:69.
- No Duplicates Rule and Meet Rule: `interpreter.md`:38.
- explicit instantiation: `interpreter.md`:42.
- the arrow: `compiler.md`:78.
- the checker at zero: coordinator `SKILL.md`:23.
- switch-over: coordinator `SKILL.md`:23 (defined only at :155), and `batch.md`:30.
- model program: coordinator `SKILL.md`:93.
- chunk, round, items: `delegating.md`:16 and :80.
- fix round: `delegating.md`:78.
- explanation, as a unit of the revival part: `skill-rewrite.md`:26.

## 5. Gotchas

- A worker plans its reads from fortress-repo `SKILL.md`:203 and skips `revival-changes.md`.
- A worker reads `comprises { ... }` as any list, and takes every self-bounded trait as self-typed (`revival-changes.md`:35).
- A worker looks in `interpreter.md` for the checker's limit on a cover search and finds none (`revival-changes.md`:33).
- A worker writes a walk test for duplicate functional methods without knowing what walk does (`revival-changes.md`:19-22).
- A worker writes a trait's own `where` clause, which the list of built forms leaves out and the code generator refuses (`compiler.md`:78 against `revival-changes.md`:54).
- A worker's first `ledger.py rewrite` fails on the number cell (`records.md`:106).
- A worker blames its own commits for a `landing-check` finding that the base had (`records.md`:109).
- The coordinator launches a batch on a base with a landing-check finding, and the gather fails (`batch.md`:81).
- The coordinator guesses whether a review item goes in PLAN or in `review-queue.md` (coordinator `SKILL.md`:25-26, :53, :199).
- The coordinator finds no disposition for an entry whose evidence fails (`record.md`:49-54).
- The coordinator does not know when to apply the six checks (`record.md`:40).
- A POSITIONS entry changed at a landing leaves the revival part stale (`skill-rewrite.md`:26).
- The coordinator has no command to list the landing's new and changed FACTS entries (`batch.md`:87).

## 6. Count

- 55 flags: 2 high (R10, M5), 19 medium and 34 low.
- 0 lint hits.
