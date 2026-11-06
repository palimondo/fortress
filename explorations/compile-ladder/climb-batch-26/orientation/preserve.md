<!-- Preservation check, update mode, climb batch 26: `orientation.md` in this folder against `.claude/skills/fortress-repo/references/revival-changes.md` (unchanged between `f00fd0c2b` and `d7a03f34f`) and `admission.md`. -->

# Climb batch 26: preservation check

## Failures

1. **Row 804's refusal survives in `sources.md`, the destination the admission names for the citation (F-318, "For the writer").**
   - Old (`.claude/skills/fortress-repo/references/sources.md:819`): "... the library's scalar `+` and `-` beside `AdditiveGroup`'s; walk's refusal in a program's own component. F-225, F-277, P-146, P-157; row 804; ..."
   - New: absent. The writer did not edit `sources.md` (its brief keeps it to this folder). The replacement lines are drafted in `sources-mapping.md`, "Proposed line for `sources.md`", and they match the admission: rung W's report is named, row 804 is dropped, and P-152 is added.
   - Consequence: a worker who traces the new sentence to its sources finds a refusal and row 804 cited for it. The record then contradicts the part until someone applies the proposed lines.

2. **Walk's new departures (rows 893, 894) are absent from their destination, `interpreter.md`, "What walk checks", and that file still states the old refusal.**
   - Admission: "Walk's new departures (row 893: it loads an object that extends a self-typed trait at a type it is not a subtype of; row 894) go to `interpreter.md`, "What walk checks", not here."
   - Destination now (`.claude/skills/fortress-repo/references/interpreter.md:53`): "Where a program's own component declares both, it refuses a generic operator between an array of a number type and a number, on either side, beside the operator of a self-typed trait ... (ledger row 804)." Rows 893 and 894 appear in no file under `references/`.
   - Consequence: the orientation now says walk loads this pair, and the area part says walk refuses it. A worker who reads both gets two contradicting rules. Also, no worker is told that walk loads (row 893) an object the checker refuses, the one that extends `T[\A\]` and is not an `A` (orientation, "Traits and objects": "The checker refuses a type that extends `T[\A\]` and is not an `A`"). This is outside this writer's file: PLAN's gather.1 assigns it. It stays open until that edit lands.

## Checked and kept

- F-318's rule is in the new text: walk loads the pair "in the library and in a program's own component". Both exceptions are kept, and they match F-318 ("A trait self-typed through another self-typed trait, and a method with static parameters of its own, ... keep the refusal") and the code (`OverloadedFunction.java:814-817`, `:845-867`). F-318's condition "no `comprises` clause or one that lists only `...`" is not lost. It is part of the part's definition of a self-typed `T` (`orientation.md:38`), and the first exception takes the definition's second branch (`:39`).
- The path difference is kept: the checker also reads the bounds, and the new text claims only that walk reads `self` "in the same way". It says no more than F-318.
- Row 804 is removed from the part (no match in `orientation.md`). F-277 (changed) is covered, as the admission folds it.
- P-152: the admission says to "cite P-157 and P-152 as now". The old paragraph cites only P-157, and the new one does the same, so nothing is lost. P-152 goes into the sources line instead (writer's log). The coordinator decides whether the part should cite it too.
- The other 15 entries are not admitted. Their destinations are area parts that PLAN's gather.1 owns, so this check of the orientation does not cover them.

Rows checked: 1 admitted entry (F-318), with F-277 (changed) folded into it. Its two destinations were checked: `sources.md` and `interpreter.md`.
