# RR32 a sibling of RR64 in the specification: the decision record

Climb batch 6.5b, rung V (`explorations/coordinator/CLIMB-BATCH-6.5.md`, section 3, V). This record gives the full reasoning of the rung's Appendix I entry "The single-precision floating-point type" (`\secref{revival-rr32}`, `Specification/appendices/changes.tex:1714-1790`), of the callout it points from (`Specification/basic-lib/numbers.tex:50-56`), and of the sentence of batch 6's entry "The number types" it revises (`Specification/appendices/changes.tex:485-487`). Line numbers are on this rung's tree unless they say the base (`382b9fe7f`) or the Working Draft of February 2011 (`Specification-1.0-frozen/`).

## 1. Why the specification changes

The number chapters describe the one library (POSITIONS 2026-09-26, answer 6; the number chapters under S2), and Pavol's requirement of 2026-09-24 is that no open discrepancy stand between the specification and the implementation (POSITIONS 2026-09-24, a requirement on the plan). Until this rung the library declared `value object RR32 extends RR64` (base `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47`, `.fss:203`) with `RR64 comprises { Float, FloatLiteral, RR32 }` (base `Library/FortressLibrary.fsi:291-294`), and batch 6's entry said so ("The library's ℝ32 stays below ℝ64, as before", base `Specification/appendices/changes.tex:485-486`), as a reading of batch 6's record and not a decision (`explorations/reviews/batch-6-conformance.md`, finding 3). The rung makes `RR32` a sibling under `Number` in the library; the chapter then names it, in the S1 form (POSITIONS 2026-09-26, S1): the passage edited in place, a `\revision` callout, an Appendix I entry quoting what the text said before, and this record.

## 2. What settles it

- The specification: "These types are mutually exclusive; no value has more than one of them" (`Specification/basic/types-vals-vars.tex:536`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/types-vals-vars.tex:502`). A value of a type below `RR64` is a value of both.
- The team's later Types chapter keeps the sentence (`Documentation/Specification/Prose/Language/types.tick:977-978`; POSITIONS 2026-09-26, the lineage note).
- Route A (POSITIONS 2026-09-24): the number types siblings under `Number`, each carrying its own algebra.
- Answer 8 (POSITIONS 2026-09-26): an exact conversion is a coercion, a lossy one explicit. Every `RR32` value is exact in `RR64` (a binary32 value is a binary64 value), so `RR64` coerces from `RR32`, and the conversion the other way (`narrow`, `Library/FortressLibrary.fsi:379-380`) stays explicit.
- The coercion chapter's worked example declares `trait ℝ32` and `trait ℝ64` apart, `ℝ64` with `coerce(x: ℝ32) widens`, and computes `c + a·b` with `a`, `b : ℝ32` and `c : ℝ64` by `ℝ64`'s `+` after coercing the `ℝ32` product (`Specification/basic/conversions-coercions.tex:875-927`, the Working Draft's `:844-896`).
- The team's built intent: the compiler library has `RR32` and `RR64` siblings, `trait RR32 extends { Number, Equality[\RR32\] } excludes { ZZ64, ZZ32, RR64 }` and `RR64`'s `coerce(x: RR32)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:475`, `:433-435`). They have been siblings there since Chase's `6896886fb` of 2009-08-31, whose message says "RR32 is NOT a subtype of RR64" and ends "this would be a good time to get coercion working"; that change added no coercion. `coerce(x: RR32)` is first seen in `26718e298` (2011-12-06), where the file reappears whole after the conversion's cut of its parent links, so history dates it no more closely than between the two (`probes/skeptic/coerce-history.txt`).
- Steele's retrospective draws the floats as siblings under a `Float` node: "Number → {Integral → ZZ32, ZZ64, ZZ; Float → RR32, RR64}" (`research/extracts/SteeleJuliaCon2016-extract.md:159-161`, slide 38).

Nothing on record argues for the subtype: it entered as batch 6's reading, and the planner's probe found nothing in the library or the corpus that relies on it beyond `RR32`'s own declarations and three library sites (`explorations/compile-ladder/plan-6.5/NOTES.md`, section 6).

## 3. The passage and what it says

`Specification/basic-lib/numbers.tex:27-49` names the number types and their coercions. Two lines change in place and a callout follows the passage:
- `:31`, "and the floating-point type ℝ64 (RR64)" becomes "and the floating-point types ℝ64 (RR64) and ℝ32 (RR32)". The sentence after it, "They are siblings under the trait `Number`: each is a subtype of `Number`, and none is a subtype of another" (`:32-33`), then covers `ℝ32` without change.
- `:43`, "ℝ64 (RR64) coerces from ℤ32, and from integer numerals" becomes "coerces from ℝ32, from ℤ32, and from integer numerals".
- `:50-56`, the callout `revival-rr32`.

What the passage now states and the landed library it is checked against:
- `ℝ32` is a number type, a subtype of `Number`: `value object RR32 extends { Number, StandardPartialOrder[\RR32\], StandardMinMax[\RR32\], AdditiveGroup[\RR32\], MultiplicativeRing[\RR32\] }` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47-48`, `.fss:203-204`); `Number comprises { RR64, RR32, QQ, AnyIntegral }` (`Library/FortressLibrary.fsi:282`, `.fss:359`).
- None of the number types is a subtype of another: `RR64 excludes { QQ, AnyIntegral, RR32 } comprises { Float, FloatLiteral }` (`Library/FortressLibrary.fsi:291-294`), and an object type excludes every type that is not its supertype (`Specification/basic/types-vals-vars.tex:256-258`), so `RR32` excludes `RR64`, `QQ` and the integer types.
- `ℝ64` coerces from `ℝ32`: `coerce(x: RR32)` (`Library/FortressLibrary.fsi:296`, `.fss:392`, body `asFloat(x)`).
- Every other conversion is explicit: the library declares no other `coerce` from or into `RR32` (a grep of `coerce(` over `Library/*.fsi` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` finds none naming `RR32` but `RR64`'s).

The passage does not state `ℝ32`'s operators, as it states none of `ℝ64`'s; the chapter has no listing of either.

## 4. Decisions taken inside the rung, for the text

1. **The two lines of the passage are edited, not a sentence added.** A sentence added after the passage ("ℝ32 is also a sibling ...") would leave its first sentence naming ℝ64 as the one floating-point type and its table without the coercion, the passage contradicting itself. Rejected for that.
2. **The callout sits after the passage's last sentence, as rung P's and batch 6's callouts sit after theirs** (`Specification/basic-lib/numbers.tex:73`, `:221` on the base). It moves every later line of the chapter by 7; the tests whose messages cite those lines are re-anchored in the same commit (REPORT.md, section 8). Rejected: the callout on one source line to move nothing, against the chapter's own wrapping.
3. **The entry revises batch 6's sentence, as batch N's rung T revised one sentence of batch 7R's entry "The integer type of a range"** (`Specification/appendices/changes.tex:1108-1111`), and quotes it under "Original text". Rejected: leaving the sentence, which the landed library would contradict.
4. **The original text quoted is the revival's own, and the Working Draft's statements on ℝ32 are cited, not quoted in full.** The Working Draft names ℝ32 in no passage of the number chapters (`grep -rn 'mathbb{R}32' Specification-1.0-frozen/` finds only `preliminaries/overview.tex:579` and the coercion example, `basic/conversions-coercions.tex:840-896`).
5. **Route C: the same.** Route C relaxes instantiation exclusion for chains of a self-typed trait; it does not relax the sentence that the numeric types are mutually exclusive, which is what excludes `RR32` below `RR64`.

## 5. What reversing would take

Restoring `value object RR32 extends RR64`, `RR64`'s `comprises` of `RR32` and the `b:RR64` parameters of `RR32`'s natives, and this text; row 435's defect returns with it (`ProjectFortress/tests/RR32MixedRungF.fss` would fail), and the specification's sentence of mutual exclusion would again be contradicted by the library.
