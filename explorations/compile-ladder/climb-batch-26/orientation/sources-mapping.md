<!-- Climb batch 26, orientation update: what changed in `orientation.md` against `.claude/skills/fortress-repo/references/revival-changes.md` at `f00fd0c2b`, and the source of each change. -->

# Sources mapping: climb batch 26

## Changed

"Traits and objects", the self-typed trait's second paragraph, last sentence.

- Old: "Walk loads the library's pairs, but refuses such a pair where a program's own component declares both (row 804)."
- New: "Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component. Walk still refuses the pair in two cases:", then a list of two items: `T` is self-typed only through another self-typed trait that it extends; the method has static parameters of its own.
- Sources: F-318; F-277 (changed); P-157, P-152; row 804, FIXED (`c41c3d2b0`, `explorations/fortress-gap-ledger.md:414`); `explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md:104-111`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:814-817` (`traitMethod`: no static parameters of its own), `:845-867` (`selfTypeParameter`: a directly self-typed trait only).

## Changed in the fix round

Each change is from `cold-read.md`, section 2 (item numbers below). Meaning is unchanged.

- "Traits and objects", walk's two refusals (item 2): framed as walk's load check, not the verdict. They cite no ledger row, and the checker's definition of a self-typed trait takes both branches.
- "Traits and objects", the definition's second branch (item 6): "a self-typed trait that `T` extends at `X`" becomes an example, `trait T[\X extends U[\X\]\] extends U[\X\]`. Source: `OverloadedFunction.java:836-844`, the comment of `selfTypeParameter`.
- "Traits and objects", the exclusion rule under walk (item 4): "applies no instantiation exclusion" becomes "does not apply the rule", and the refusal is read as "not excluding". Row 416.
- "Numbers", the tied declarations (item 9): "differ only at the positions of the call's numerals".
- "Static parameters", the code generator and `where` (item 11): "compiles" becomes "accepts".
- "Reductions", `simpleJoin` (item 10): "The team's tests declare `simpleJoin` so".
- "Implementation limits", the bold rule (item 3): split. The plan that walk runs the checker after the switch-over is stated as a plan. Source: P-12, P-59.

## Proposed line for `sources.md`

Replace the line for "Traits and objects", the self type in the exclusion test (change A), now `sources.md:819`, with:

- `revival-changes.md`, "Traits and objects", the self type in the exclusion test (change A): `self` in signatures stays `T[\X\]` except in the exclusion test, which reads `T[\X\] & X` and the declared bounds; the library's scalar `+` and `-` beside `AdditiveGroup`'s. F-225, F-277, P-146, P-157; `explorations/compile-ladder/climb-batch-21/RECORD.md`, rung X (`64fa505c4`); `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:553-561`; `Library/FortressLibrary.fsi:2701-2707`; `explorations/perf-probes/self-type-exclusion/REPORT.md:7-9`.
- `revival-changes.md`, "Traits and objects", walk's reading of the same pair in a program's own component, and its two exceptions (climb batch 26, 2026-11-05): F-318, P-157, P-152; `explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md:104-111` (`c41c3d2b0`); `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:814-817`, `:845-867`.

## Not placed here

- Rows 893 and 894, walk's new departures: `interpreter.md`, "What walk checks", as the admission says.
- The scratch demonstration with `Number`'s `comprises` clause removed: evidence only, for `sources.md` if anywhere.
