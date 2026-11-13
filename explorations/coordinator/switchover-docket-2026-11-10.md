# Docket: the curator's answers on the road to the switch-over

Read on `main` at `832f7d0d91`, 13:2x UTC on 2026-11-10, before climb batch 30's record landing. Nothing was built or run.

Scope: PLAN's 27 review-queue items, D1 and D2 of the parallelism review, and 7 points of climb batch 30's review: 36 items. 19 are in 14 asks, 12 are the coordinator's, 4 are settled, 1 is not classed.

Terms used below:
- Names batch: the batch that moves the compiled path onto the interpreter's library and deletes the compiler's prelude.
- Prelude: the compiler's own library files.
- Distance: the checker's errors over the fourteen library components, now 0.
- Glue: walk's Java classes for native functions. The compiled path cannot run them.
- Climb batch 30b: the next batch, under his go: rungs Y (`tryatomic`), C (numerals) and the equality rung.

## Part 1. The asks, in the order the work needs them

**1. Do `Reflect`'s 28 native bindings stay on glue, walk only? (item 437)**
- Default: yes, until a compiled reflection is designed or walk runs the checker.
- A yes is an exception to "every native binding names a static helper that both paths run" (P-58).
- Gates: the natives' remainder, which is the next work after climb batch 30b, and the names batch's brief. A no adds rungs before the names batch.
- Ready: `reviews/natives-remainder-2026-11-07.md`, section 4 (its Q4). He answered Q1 to Q3 of that review.
- Missing: nothing. microGPT: not on its path.

**2. Is "`NN32` converts into `RR64` implicitly" (P-75) withdrawn, or built? (items 281 and 21)**
- Default: withdraw. His words of 2026-09-29 were firm: "if it fits, then there should be direct conversion. No question about it." So the withdrawal reverses his decision.
- Built, it makes a `ZZ32` with an `NN32` ambiguous on both paths, against "mixed widths take the narrowest type that holds both" (P-74; row 575).
- Gates: if P-75 stays, one library rung and two sentences of the specification before the names batch. If withdrawn, a record edit only.
- Ready: `reviews/phase3-exit/judgement.md`, section 3.1, item 2; the three ways to build it in item 21; row 575's measurement.
- Missing: nothing; the measurement is of 2026-10-02. microGPT: no line named.

**3. Does way 4a stand under his decision on sizes? (items 30 and 229)**
- Way 4a: the checker reads a size known only at run time as fixed for one call. Built by climb batch 13 at the judgement's default.
- Default: as built. It reads anew "a size that inference leaves unknown is an error where it is used" (P-40).
- Item 229 rides on it: does the third array question (a factory for a run-time size) still wait until after the switch-over (P-85)? Default: it waits.
- Gates: the distance. Way 4a cleared ten library calls. Another way puts them back, and the names batch needs the distance at 0. Row 682's checker half hangs on it.
- Ready: `reviews/array-fork3-judgement.md`, section 6 (ways 4a to 4e); `reviews/array-judgements-popl-check.md`, sections 3 and 7.
- Missing: nothing. microGPT: two lines of the parked sized-types diff depend on it.

**4. A call above a sized declaration's domain: where is it refused? (items 35 and 460, row 446)**
- No default for item 35. Item 460's default: way (a), as climb batch 29 landed it.
- Today the compiled run dies with a Java exception where the declaration reads its size.
- Gates: the names batch's brief, if the one library holds such a call. The phase 3 exit judgement says it can wait for the array design if the names batch does not meet it.
- Ready: the three candidates in row 446 and item 35; the three ways in item 460; the judgement's recommendation (section 5.2).
- Missing: a probe of whether a compiled program reaches such a call in the one library. One ways review that joins items 35 and 460 and the dead sizes of ask 6, since one candidate is the dead sizes' route.
- Climb batch 30's landing narrows item 449 to rows 962 and 446, which this ask then carries.

**5. How do the number traits read in the one library at the switch-over? (items 371 and 372)**
- 371: `value trait ZZ32`, and the same for the other number traits. Default: decided with the names batch.
- 372: walk's five native number objects, `Int` among them, made private below their traits. Default: public, as landed.
- Both came from his reading of 2026-11-06. The record holds no word of his that decides either.
- Gates: the names batch's brief. There the compiled numbers meet the one library's traits.
- Ready: each item's two ways; the patterns are the library's `value trait Maybe` and the I/O objects' design (P-164).
- Missing: a ways review, and a count of the programs that name one of the five objects.

**6. The dead sizes, the linker row and walk's unknown size, as diffs (item 36)**
- Nine api declarations declare a size that no type uses. Row 320: an api implemented by a component of another name does not link.
- Default: left until the names batch's design. His rule is that these sizes go only by a diff shown to him (P-40's history), and row 320 is part of the switch-over's design (P-33).
- Gates: the names batch's brief.
- Missing: the names batch's design, which is not drafted, and the diffs. This ask goes with that design.

**7. What does "the whole preparation for the arrays" cover? (item 230)**
- His words of 2026-09-22: "we should do the whole prep for the arrays" before the switch-over (P-85).
- Default: plain explainers of the array decisions.
- Gates: what array work runs before the names batch. The judgement puts his answer before phase 5's briefs.
- Ready: `reviews/arrays-reminder-2026-11-10.md`, which he asked for today.
- Missing: no review lists what more preparation could be.

**8. D2: strong or weak atomicity on the compiled path (parallelism review; rows 948 and 984)**
- Today a compiled `atomic` block is not atomic against a plain write outside `atomic`. Walk is. Row 984, from climb batch 30's rung X, is the same question one level down, in a nested block.
- No default on record, and no queue item yet.
- Gates: further rungs on the compiled transaction. From the switch-over, the one library's own `atomic` blocks run compiled.
- Ready: the three options in `reviews/parallelism-foundations-2026-11-08.md`, "Questions for the curator"; both rows measured.
- Missing: a ways review in the ask's form, with the primer that he asked for on transactional memory (PLAN, phase 6). The cost of the option that locks plain writes is not measured.
- microGPT: it opens no transaction. One option adds a cost to every plain write of a mutable variable, so its speed can depend on the answer.

**9. D1: arrays of unboxed numbers and `atomic` (parallelism review; row 953)**
- The compiled transaction tracks elements of the boxed store only. The `double[]` store takes no part.
- His word of 2026-11-08, 02:1x: every number type's array must run unboxed (P-84), and the element tracking was chosen because "a compiled atomic write into any array needs that keying" (P-169). One option contradicts that reason.
- No default on record. No queue item yet.
- Gates: array decision A in phase 5, and the preparation of ask 7. Not the names batch: no factory chooses an unboxed store before decision A.
- Ready: the three options in the same section of the review.
- Missing: a ways review in the ask's form. The per-element check's cost is an estimate from row 641's rate.
- microGPT: needs none of it for correctness. Its speed depends on it.

**10. The checker's third and fourth attempts at a call (item 2)**
- His decision names two attempts (P-49). Four are built. No source says he saw the fourth.
- Default: kept, as built. The judgement recommends it.
- Gates: nothing under the default. A reversal refuses calls with an untyped function argument (row 507) and reopens the distance.
- Ready: F-78, which gives all four.
- Put it after climb batch 30b lands: its equality rung adds the numeral's case to P-49.

**11. Three readings by rung P of "a group joins every arm before it completes abruptly" (P-175) (review, finding 3)**
- After a JVM error the group does not join. Later arms' exceptions are dropped. The analyzer misses a function declared later in the file.
- Default: as landed. Gates: nothing before the switch-over. The first batch after it measures the reductions.
- Ready: the review's three options. Missing: a ledger row for the analyzer's defect.

**12. The grain size is 16, and the model's vectors are 16 wide (review, finding 1)**
- A reduction over a model-width vector forks nothing. His aim: "you need the right forking constants".
- Default: 16, as landed. Told to him at 12:5x and 13:0x.
- Gates: the first batch after the switch-over.
- Missing: the measurement on compiled reductions, which cannot exist before the switch-over. Which model reductions use this range is by reading only.
- microGPT: its speed, and its last bits if the value moves.

**13. A compiled program initializes every used component before it starts (review, finding 2)**
- Default: as landed; it closed rows 971 and 979.
- Gates: nothing now. Missing: the start cost on the one library. Today it is about 40 ms.
- microGPT: its start time.

**14. A numeral with a radix point that rounds to an infinity where nothing fixes a type (row 980)**
- Both paths give `Infinity`. The text refuses it only at a place that fixes a type.
- No default on record. Gates: nothing.
- Missing: a short ways note. The numeral dialogues hold no word of his on it.

## Part 2. The coordinator decides

Each goes on the review list.

- **39**, a generator's counted size: as built. The other way deletes three size bodies that the team wrote.
- **108**, the strided range `0:10:3` as a generator: one api line in the names batch, the judgement's default. Only the route was open.
- **212**, the self-typed rule widened to the team's `Containment` mixins: as built. The coordinator took it on 2026-10-14 by the method he approved at 00:12 UTC. It reads the library as the team wrote it.
- **295**, an object may add `var` to a value parameter: the check's reading stands. The team's library writes the `var`, and the team's parser refuses it in an api. The text's sentence follows at the next specification rung.
- **319**, `CompilerSystem`: deleted with the prelude, and its 28 programs import the one library's `System`. Ground: "one library" (P-37), and his words of 2026-10-29 that `System` is needed for the switch-over because of the compiler's tests. Named to him at the names batch's landing.
- **339**, `char` of a code point out of range: the prelude's answer, an exception, kept through the switch-over. Ground: the prelude is the team's later word, and his principle of 2026-11-06 on the interpreter library's early ideas. The exception's type goes with the rows on a `Char` past U+FFFF.
- **360**, walk refuses a helper parameter declared `String`: the step stays. The names batch brings the checker's table in line. No library binding has such a parameter.
- **374**, a program's `+` beside the library's array `+` across an import (row 918): a gap of the checker. The POPL 2019 paper's Meet Rule, walk and the checker inside one component all refuse the pair (`reviews/meet-rule-popl2019-2026-11-08.md`, section 6). He was answered from that review on 2026-11-08.
- **375** and **376**, the code generator under a type assumption: built where a declaration of the fourteen components needs it, since the library must emit before the prelude goes (P-37). The planner picks the route after the refusals are measured on the landed tree.
- **477**, `Numeral` below `Number`: as landed. The team's `IntLiteral` extended `Number`, and by the repair he took on 2026-11-08 a numeral at `Number` takes its default type either way.
- **The restart of a nested block in place of a throw** (review, rung X's second point): as landed. The specification is silent, and the exception was seen under reads that no longer hold. Rung Y of climb batch 30b builds on it.

## Part 3. Settled

- **408**, the compiled transaction's livelock: climb batch 30's rung X repaired it. Row 933 is `FIXED` (`594da41299`). The landing moves the item out.
- **450**, the class that holds a numeral's place at a generic type: "one value for each instance" (P-176) answers it. Rung C of climb batch 30b builds it (`CLIMB-BATCH-30.md`, fork C1). It closes when that batch lands.
- **470**, the library's `=/=` at a numeral: his answer of 11:3x UTC today, that `u = 0` must be `true` (`HELD.md`, "Held in chat (2026-11-10)"). The equality rung of climb batch 30b gives `Equality` its `=/=`. It closes when that batch lands.
- **The prelude's two coercions from an integer numeral** (review, Part 1, point 3): his exception for the numerals (P-37) covers them. Rung N landed them (`f36a651243`).

## What climb batch 30's landing touches

- Leave the queue or change: 408 (answered); 449 (narrowed, so ask 4 grows); 470 with 487 (answered).
- Get their first queue entries: asks 11, 12 and 13, row 984 and the restart. D1 and D2 get PLAN lines.
- Reworded: P-175, P-174 and P-176, which asks 11 and 12 and items 450 and 477 cite.

## What I could not class

- **455**, `10^k` for `k: ZZ32` ties among three `^` declarations. His numeral rule of 11:3x today sends a numeral to the most specific declaration that takes it. Whether that rule breaks this tie is not in the record. It needs one probe on climb batch 30b's landed tree. Until then the landed step stands: the library's one site has a `ZZ32` base.

Limits of this reading:
- For items 39, 108, 360, 375 and 376 I read the item and the phase 3 exit judgement only, and searched no transcript for his words.
- I did not read P-49's history for item 2, and for item 319 I rely on the item's account of P-33's history.
- My search of the numeral dialogue files found no word of his on items 477 and 455 or row 980.
- Ask 5 and item 339 are the closest calls. If his reading of 2026-11-06 held a wish, items 371 and 372 are his word to carry out, not asks.
