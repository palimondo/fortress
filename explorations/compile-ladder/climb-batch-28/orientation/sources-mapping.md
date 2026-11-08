# Climb batch 28: sources mapping for the orientation update

One rule is new, in "Numbers", after "Arguments convert by declared coercions, and a generic call promotes". No other heading changed.

## "An integer converts to another integer type by a checked getter or by a low-bits function (P-161)."

Replaces no old entry: the orientation did not state written integer conversions before.

Sources:

- POSITIONS, P-161; FACTS, F-331 (the landed form under walk).
- FACTS, F-132, F-172 and F-307, as changed by climb batch 28, folded into the rule.
- `explorations/compile-ladder/rung-integer-conversions/REPORT.md`, "What changed and why" and "Programs run old against new" (the walk message for `narrow(z)` of a `ZZ`).
- `Specification/basic-lib/basic-integers.tex:39-98` (F-172): the getters beside the low-bits functions; `ZZ` has neither `narrow` nor `widen`; the `bitsAs…` getters.
- Gap ledger row 349: the compiler's prelude has 8 of the 25 getters, none on `ZZ`, no `big`, and no low-bits function that returns its argument.
- Gap ledger row 346, fixed, so not cited in the rule: the prelude's `narrow` of a `ZZ64` and `widen` of a `ZZ32` keep the low bits (`CompilerBuiltin.fsi:206-207`, `:269-270`, `:328-329`, `:386-387`).
- Fix round: the preservation check's failures 1 and 2, the cold read's 2.12 and 3.2, and the quiz grading's case 6 changed the rule's last four sentences. The cold read's 2.19 changed "but" to "because" in "Dispatch and overloading", the Meet Rule paragraph.
- Checked against the tree: `Library/FortressLibrary.fsi:495-557` (`NN64`), `:560-631` (`ZZ32`), `:634-706` (`ZZ64`), `:709-772` (`ZZ`, `big` only); `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:135-140` (`NN32`, `bitsAsZZ32`); `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:150-336` (the compiler's 8 getters).

History for `sources.md`, not in the rule:

- The team's walk `narrow` of a `ZZ64` raised "Overflow of ZZ32" (RECORD.md, "V"). The revival's low-bits functions never raise.
- The team's callers of `ZZ`'s `narrow` and `widen` were respelled `.asZZ32` or `.asZZ64`: three in `Library/Format.fss`, three in `Library/QuickCheck.fss`, two in the demo `sudoku.fss`, and `XXXZZNarrowRungP` (P-161).
- A revival worker wrote `widen` on a `ZZ` at `Library/QuickCheck.fss:322` in climb batch 6 (`explorations/reviews/quickcheck-widen.md`, section 0).
