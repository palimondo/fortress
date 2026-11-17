<!-- The orientation workflow's preservation check, update mode, for climb batch 31's landing (run 1): the two admitted entries, F-377 and F-225, against the rewritten sentence of "Traits and objects"; two failures, both on row 1052. -->

# Preservation check: climb batch 31, run 1 (update)

Inputs: `orientation.md` (the new text), the skill's current part `.claude/skills/fortress-repo/references/revival-changes.md` (last changed `220916891d`, 31,052 bytes), `admission.md`, `sources-mapping.md`. Base: `main` at `9317123078`. A `diff` of the two texts shows one change: the old `:41` became the new `:41-47`. Every other line is the same, so no other rule is lost.

## Failures

### 1. Row 1052's condition is narrowed from "a value" of the self-type parameter to "another argument"

The sources:

- F-225 (`FACTS.md:101`): "A default body that calls a method on a value of the self-type parameter dies at load with a `ClassCircularityError` where the object lists the trait first (row 1052)."
- Ledger row 1052 (`fortress-gap-ledger.md:1053`): "a compiled default body of a trait with a self-type parameter that calls a method on a value of that parameter dies at load, `ClassCircularityError`, where the object lists the trait first". Its notes give the mechanism: `Class.forName` in `runtimeSystem/MethodInstantiater.java:269` "loads the static argument's class to choose the call's opcode". The mechanism depends on the static type of the receiver, not on the receiver being a parameter.
- The review (`explorations/reviews/batch-31-review.md:405`): "a default body that calls a method on a value of the self parameter where the object lists the trait first (row 1052)".
- The admission's correction column for F-225 (`admission.md:29`): "a default body that calls a method on a value of the self-type parameter dies at load". Only its "mistake it prevents" column says "the other argument". The writer may have taken the phrase from there.

The new text (`orientation.md:45`): "a default body that calls a method on another argument of type `X` gives a `ClassCircularityError` where the object lists `T` first in its `extends` clause (row 1052)."

Consequence for a worker: the source's claim covers a call on any value of type `X`. The new sentence covers only a parameter. A worker who calls a method on a local `s: X`, on a field of type `X`, or on a result of type `X` in a trait that the object lists first takes the call as safe. An example is probe E's `self.twin().tag` (`rung-comprises-cast/REPORT.md:94`). It ran only because E's object lists the trait second (`:100`). If the call fails, the worker meets the `ClassCircularityError` with no account of it, which is what F-225's admission is meant to prevent. Fix: "calls a method on a value of type `X`".

### 2. The record does give a workaround for row 1052, and the mapping says it gives none

The source, ledger row 1052, notes (`fortress-gap-ledger.md:1053`, landed in `255179ba3a`, which is in the base): "Walk runs it. Workaround: declare the method in the object." It is also in `record-landing/rows.md:296`.

The new texts:

- `sources-mapping.md:19`: "No workaround is given for row 1052, as the record gives none."
- `orientation.md:47`: "For the first two shapes, bind `self` at the type first, as `r: R = self`, and use `r`." The third shape gets no workaround.

The error starts in the admission's points for the writer (`admission.md:33`): "The record gives no workaround for row 1052; do not invent one."

Consequence: the mapping's sentence says more than its source. Once added to `references/sources.md`, it would tell a maintainer that the record holds no workaround. A worker who meets row 1052 gets workarounds for the other two shapes and none for this one. The row's own text has one, and walk runs the program. The fix round can add "declare the method in the object" and cite row 1052. No run of it is cited, so the admission's test of a run workaround may keep it out. Either way, the mapping's sentence must be corrected.

## Checked and kept

- **F-377 and F-225, the fix.** Old `:41`: "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695)." New `:41`: "A compiled body of `T` that returns `self` at `X` runs, also where `X` is an object type." Sources: F-225 ("runs, also where the parameter is an object type ... (row 695, fixed)"), F-377 (`twin(self): S = self` "verify and run"), and `compiler_tests/SelfTypeReturnSelfRun.fss` (`object Pt(t: String) extends Shape[\Pt\]`). The citation of row 695 is dropped, rightly: the row is FIXED, and by the orientation's convention at `:7` a cited row marks a behaviour that is not settled.
- **Row 1050** (`:43`). The new text puts it at `X`. Source: the row's "The same for `fn (): S => self` in `trait Shape[\S extends Shape[\S\]\]`", and probe H (`REPORT.md:96`).
- **Row 1051** (`:44`). The new text puts it at `X`. Sources: the run that failed on record, gather.1's `mx(self, other: T): T = if lt(other, self) then self else other end` (`RECORD.md`, "The tests on the merged tree"), and the row's note "The same at a self-type parameter". "Another value in the other" keeps the exception "With `self` in both arms it runs". `StandardTotalOrder`'s `MIN` and `MAX` are written as a shape, not as a measured failure (admission point 3). The shape is checked: `Library/FortressLibrary.fss:291-292`, a trait with no `comprises` clause.
- **The workaround and its scope** (`:47`). It is limited to the first two shapes and "tested only at a type that a `comprises` clause lists, not at `X`", as admission point 1 asks. Sources: probe W (`REPORT.md:97`, `2 2 0 PASS`) and the notes of rows 1050 and 1051 ("at the listed type").
- **Row 1052's other conditions.** "Where the object lists `T` first" is kept. The compiled-only scope is kept through the lead sentence ("A compiled body"). Walk runs the program, which is the default, so nothing is lost there.
- **Scope at the listed type.** Admission point 4 sends the listed-type shapes of rows 1050 and 1051, together with rows 991, 307 and 1053, to `compiler.md`. None of them is in the new text.

## Notes for the cold read (not failures)

- `:44` cites `Library/FortressLibrary.fss:291` for `MIN` and `MAX`. `MAX` is at `:292`, and the mapping and the admission both cite `:291-292`.
- `:44` does not say that the five integer types, `QQ` and `RR64` declare their own `MIN` and `MAX` (P-47, `admission.md:35`). A reader may conclude that every ordered number type fails. Neither F-377 nor F-225 carries that qualification, so its absence is not a preservation failure.
- `:47`'s example `r: R = self` names `R`, a type the section never introduces. Only the next sentence says that `R` is a listed type.

## Count

Two admitted entries checked: F-377 and F-225. They were checked against the four points for the writer (`admission.md:33-36`), ledger rows 695, 1050, 1051 and 1052, rung K's probe tables (`rung-comprises-cast/REPORT.md:89-98`, `SKEPTIC.md:20-32`), and a diff of the whole text. Two failures, both on row 1052. No other rule, condition or path difference is lost.
