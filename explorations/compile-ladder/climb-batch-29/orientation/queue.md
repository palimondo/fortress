<!-- The orientation workflow's review-queue items from climb batch 29's update, in the form of `explorations/coordinator/review-queue.md`: none, because the judge held no section of orientation.md; the points that are not items, for the coordinator. -->

# Climb batch 29's update of the orientation: items for the review queue

The judge held no section (`judgement.md` in this folder), so this run files no item for `coordinator/review-queue.md`. Three sections install:
- **"Traits and objects"**: a numeral at `Index` takes its default, a `ZZ32`, so `f(3)` is valid for `f(x: Index)` (F-278). The `SEQV` paragraph drops the closed rows 943 and 945, points to "Numbers" for the `||` fold, and gives "`y: RR64 = 0.5` is `SEQV` a computed `RR64` 0.5".
- **"Numbers"**: P-173's rule, "A numeral converts where it stands", with P-174's numeral types and the written-only rule; the new rule "An expression of numerals alone folds exactly before the checker, on both paths" (P-173, F-339, F-343), with the typed-operand rule for tests; walk's argument conversion narrowed by row 387; "the two numeral types" in the `Number` rule; the reason for `asFloat` on a `ZZ64`.
- **"Reductions and comprehensions"**: row 20, closed, dropped.

The opening, "Dispatch and overloading", "Static parameters" and "Implementation limits" are unchanged.

`judgement.md` records these points, which are not items, because none is a held section:
- **The install's two corrections in "Numbers".**
  - Line 91: rows 964 and 965 leave the list of departures from the numeral rules. Row 964 is a `typecase` pattern crash and row 965 the prelude's `||` with a `Character` first; neither is about numerals. Both go to `compiler.md`.
  - Line 95: "at its default" becomes "as its default", which clears the skills lint's status pattern. The other way is an `ALLOW` entry.
  - See "Numbers: install".
- **The install's condition: the area-part corrections in the same push.**
  - Line 91 ends "`interpreter.md` and `compiler.md` describe them", but neither part cites any open row of this landing. `interpreter.md:16-25` and `compiler.md:106` still give the closed rows 943, 944, 945, 364 and 721 as departures to assert as `XXX` tests.
  - In both quiz rounds, case 29 failed on `interpreter.md:23` alone, and each round's reader took two false side claims from `interpreter.md:18-22` against this text.
  - The landing's data (`record-landing/owed.md`) gives the skill writer the stale sentences. The judgement adds the open rows for each part, from `admission.md`, "Elsewhere": walk's 958, 960, 962, 966 (with `NOT (u = 0)`), 967, 968 and 387; the compiled 957, 961, 962, 963, 964 and 965, and F-340's static initializer.
  - If the writer's update cannot carry them, the orientation's commit is not pushed without them. The coordinator lands them next, before any worker reads the skill.
  - See "The install", step 3.
- **The quiz's uncommitted `key.md` and `questions.md`** go with this folder: cases 16, 28 and 29 changed, case 31 added.
- **The size exception.** The part grows from 25,337 to 27,684 characters with the corrections, against a budget of 8,000 to 12,000. The exception is accepted for this install. This is the fifth update in a row to accept it. This one cut only the closed rows, about 400 characters.
  - The batch 27 and 28 judges asked for the conflict to be settled first. The record shows no settlement: the boot note lists the size budgets among skill fixes not done.
  - The curator's word of 2026-11-02, 06:51, calls a consolidation pass overdue, by this workflow and the cold reads.
  - The coordinator settles it before the next update adds to the part: a consolidation run, or a new budget.
  - See "Size".
- **Findings for the next update.** There are seven.
  - The first: once the area parts hold this landing's departures, line 89's clauses on rows 967 and 962 and line 91's list of rows repeat them, against the curator's rule of 2026-11-08 that a path's behaviour is noted only in that path's part. Cutting them saves about 400 characters.
  - The others: F-344's clause, which is not needed once `interpreter.md:23` is fixed; walk's exact `QQ` for a `ZZ64` divided by a float numeral; row 966's silent `=/=`; row 506 in no part; the opening's conventions and other unchanged text, the earlier judges' findings; history to cut in a consolidation.
  - See that section of `judgement.md`.
