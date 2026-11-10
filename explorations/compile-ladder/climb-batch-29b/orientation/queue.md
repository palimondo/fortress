<!-- The orientation workflow's review-queue items from climb batch 29b's update, in the form of `explorations/coordinator/review-queue.md`: none, because the judge held no section of orientation.md; the points that are not items, for the coordinator. -->

# Climb batch 29b's update of the orientation: items for the review queue

The judge held no section (`judgement.md` in this folder), so this run files no item for `coordinator/review-queue.md`. Two sections install:
- **"Static parameters, `where` clauses and sizes"**: the paragraph on `reflect` says once that the call runs only under walk, before and after the switch-over, and keeps the row-307 rule.
- **"Numbers"**: the static numerals (P-174, P-173, P-40, P-37, P-176). A numeral's type is `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]`, with its four numbers as static arguments. No numeral value exists when a program runs. A program's own type takes a numeral through a coercion generic over the numbers, whose body reads them as `ZZ` values, and whose `where` clause bounds the numerals it takes. A folded constant reaches a program's own type only through its coercion from the constant's default type. The numeral types declare no `asFloat`. To compare a typed value with a numeral, bind the numeral at the value's type first (row 973). The route C sentence is cut.

The opening, "Dispatch and overloading", "Traits and objects", "Reductions and comprehensions" and "Implementation limits" are unchanged.

`judgement.md` records these points, which are not items, because none is a held section:
- **The install's two corrections in "Numbers".**
  - Line 91: "The checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`)" is false. That test is a refusal test, and the checker refuses the numeral statically, 'The numeral 300 does not meet the where clause of the coercion to Byte.' (`tests-writing.md:105`; `CoercionOracle.scala:221`; `RECORD.md:143`). It caused round 2's only non-right quiz grade, case 32. The correction states the static refusal and walk's refusal when the binding runs.
  - Line 93: the fold sentence on a program's own type leaves out P-174's exception for a negated numeral, against line 91's `-3` rule (`cold-read-2.md` item J). The correction adds "Except for a negated numeral, as `-3` above".
  - See "Numbers: install".
- **The install's condition: the area-part corrections in the same push.**
  - The landing's data gives the skill writer the stale sentences (`record-landing/owed.md`, "For the coordinator"). The admission's "Elsewhere" adds `compiler.md:34` (P-37's numerals exception), `library.md:23` (row 442) and row 974 in `interpreter.md`.
  - `interpreter.md:23` tells a worker to write `NOT (u = 0)`, which is now `true` for a zero `u: NN32`, against line 99's binding form.
  - `interpreter.md:25` (row 968) and `compiler.md:109` (row 961), both closed, caused a hedge in case 32 in both quiz rounds.
  - If the writer's update cannot carry them, the orientation's commit is not pushed without them. The coordinator lands them next, before any worker reads the skill.
  - See "The install", step 3.
- **The quiz's uncommitted `key.md` and `questions.md`** go with this folder: cases 5, 16, 26 and 31 changed, case 32 added. Case 32's "Skill" line (the `where` clause, now stated; `compiler.md:109`, not listed) and case 16's quotation of writer 1's text are stale against the installed text, for the quiz author's next update.
- **The size exception.** The part grows from 28,023 to 29,283 characters with the corrections, against a budget of 8,000 to 12,000. The exception is accepted for this install, because a hold keeps numeral sentences that the landing made false. This is the sixth update in a row to accept it. This one cut about 200 characters.
  - The batch 27, 28 and 29 judges asked for the conflict to be settled first. I found no settlement in the record.
  - The curator's word of 2026-11-02, 06:51, calls a consolidation pass overdue, by this workflow and the cold reads.
  - The coordinator settles it before the next update adds to the part: a consolidation run, or a new budget.
  - See "Size".
- **Findings for the next update.** There are seven.
  - The first two: the default of a folded quotient with a radix point, as `x = 1.0/3` (`cold-read-2.md` item K), to measure under walk before the wording changes; and whether a folded quotient compiles at the prelude's `RR64` (item L).
  - The others: "no getters, no `asFloat`" read as refusing `asFloat(3)`; an operator over a numeral type; the `Byte` example's `v.asZZ32` on the compiled path (row 349); the opening's conventions and other unchanged text, the earlier judges' findings; history to cut in a consolidation.
  - See that section of `judgement.md`.
