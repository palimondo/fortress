<!-- Climb batch 30's orientation preservation check (update mode): whether the one admitted finding, F-341, is in the new orientation with its conditions, and whether any sentence says more than its source. -->

# Climb batch 30: preservation check of the orientation update

Checked: `orientation.md` in this folder against `.claude/skills/fortress-repo/references/revival-changes.md` on `main` and against `admission.md`. A diff of the two texts shows one change, in "Numbers", line 89: the sentence "Walk gives `Infinity` for the second (row 967)." is deleted. Every other byte is the same, so no other rule, condition or path difference of the old part is lost.

The admitted rule is in the new text, and the path difference is kept (the checker statically, walk at run time). Two failures, both of the kind "the sentence says more, or other, than its source". Both are in the kept sentence, which the deletion now makes cover the infinity case under walk.

## Failures

### 1. The kept sentence gives walk's refusal at a binding only, with one message; the source gives it at every place that fixes a type

- Source, `FACTS.md`, F-341: "At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts ... a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64` ... is refused there when it runs". `admission.md`, the correction: "Walk now refuses it when the place runs, with 'Type mismatch binding'".
- New text, "Numbers", line 89: "A numeral outside the type's range, or that rounds to an infinity there, is refused: by the checker statically, by walk when the binding runs, with 'Type mismatch binding' and the numeral."
- What the tree does: the message depends on the place. At a parameter it is "got arg" (`interpreter/evaluator/values/NonPrimitive.java:266`; `tests/NumeralPointRoundsToInfinityAtParameterWalk.test`, `load_exception_contains=got arg`). At a declared return type it is 'Type mismatch returning' (`Numerals.java:577`; `tests/NumeralAtReturnOutOfRangeWalk.test`). At an assignment it is 'Type mismatch assigning' (`LHSEvaluator.java:102`, by reading).
- Consequence for a worker: a test of the refusal at a parameter or a return that expects 'Type mismatch binding' fails, and the worker may record the other message as a defect. A worker may also read "when the binding runs" as saying that walk refuses only at a binding.
- Before this update the sentence had the same limit for a numeral out of range, so the limit is not new. The update widens what the sentence covers under walk. The writer saw the parameter's message and left it out (`sources-mapping.md`, "Not placed").
- Smallest repair: "by walk when the place runs, at a binding with 'Type mismatch binding'".

### 2. "and the numeral" is not sourced for a numeral that rounds to an infinity

- Source: the three walk tests expect only `load_exception_contains=Type mismatch binding`; `RECORD.md`, rung N, item 3, gives only "('Type mismatch binding')". For a numeral out of range the tests do pin the numeral ("Type mismatch binding 3000000000").
- New text: "with 'Type mismatch binding' and the numeral", now for both cases under walk.
- By reading, not by a run: `Coercions.java:354-355` prints the value `v`. For a numeral with a radix point, `v` is a `FloatNumeral`, an `FFloat` whose value is already the infinity, so the message probably shows `Infinity`, not the digits as written. For an integer numeral at `RR32` (`tests/NumeralRoundsToInfinityWalk`), `v` is an integer and the digits print.
- Consequence for a worker: a `.test` file that expects the written digits after 'Type mismatch binding' can fail for a radix-point numeral. Small.
- I did not run a program to confirm the printed text.

## Kept, and noted

- The rule of F-341 (and F-57's same correction) is in the new text. The limit to `RR32` and `RR64` is kept by "there", after "with one rounding into `RR64` and `RR32`".
- Where nothing fixes a type, the new text claims no refusal: "Elsewhere the numeral takes its default ... `RR64` with a radix point". So row 980 (`CONTESTED`) is not contradicted. The row's probe also records that `e: RR64 = -1.5 TIMES 10^400` binds `-Infinity` on both paths, at a typed place. Neither F-341 nor the new text states that case; a worker who meets it should find row 980 before recording a defect.
- The new text ends the next paragraph with "`interpreter.md` and `compiler.md` give the other departures from these rules." `references/interpreter.md:24` still says: "A numeral that rounds to an infinity at `RR32` or `RR64` gives `Infinity`, with no error (ledger row 967)." Until that line is removed, the skill contradicts itself on this point. `admission.md` names the line under "Outside the orientation, for the skill writer"; it is not the orientation's to fix.
- The destinations of the findings that were not admitted were not opened: the brief's check in update mode is of the admitted findings.

## Count

Admitted findings checked: 1 (F-341). Failures: 2, both in the one kept sentence. Other sentences changed: none.
