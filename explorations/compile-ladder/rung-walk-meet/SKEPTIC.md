# Skeptic of rung W (rung-walk-meet), first judgement

Judged head: `a5d443a46c5272fc5d1a01b56c3de53d3967e85d`. Verdict: **approved, with required corrections** (section 8). No finding needs a change to the rung's Java code. Each one is a test line, a home-2 or home-3 test, a sentence of text, a ledger row or a sentence of the report.

My programs are in `tmp/rung-walk-meet/skeptic/`. Each ran three ways through `run3.sh` in that directory:
- walk on the rung's build (`FORTRESS_HOME=$W $W/bin/fortress P.fss`);
- walk in the rung's base copy (`FORTRESS_HOME=$W-base $W-base/bin/fortress P.fss`);
- `fortress compile` and `fortress run` in the base copy. The rung edits no code on the compiled path, so the compiled answer is the head's answer too.

One thread throughout: the diff touches no mutable state, no transaction and no library code that writes.

## 1. Test first (check 3)

The order holds.
- `d365bbd06` holds the six test files and two keys alone (`git log --stat`).
- In the worker's transcript (`agent-ac7f17fcef729d710.jsonl`), call `Uotjph` at 07:30:09 runs `harness-one.sh .../h-base` over the uncommitted tests on the base's code. Its lines: `Missing expected refusal at load` for `FunctionalMethodMeetInherited` and `OverloadSingleParamBoundAny`, `FAIL: J5/0:other =/= J10/0:BoxU[ZZ32]; ...` for `InferContravariantWalk`, and `Tests run: 6,  Failures: 4`.
- The commit (`iSVnro`) is at 07:31:08. The first source edit (`3Ysu9i`) is at 07:32:45 and the first build (`Kyr39p`) at 07:34:25.
- The last source edit is `YEi7jz` at 07:48:25. `build3` runs after it at 07:48:38 (`Yh4uzH`), and its `h-dev3` run on that build prints `OK Saw expected refusal at load` twice and `OK (7 tests)`.
- `h-xxx` at 07:53:31, on the same build, passes `FunctionalMethodMeetProvided` with the `over(Ko, 3)` assertion. It fails both new XXX files as expected and both stand-ins: `Missing expected failure`, `Tests run: 5,  Failures: 2`.
- The interpreter suite ran on `c3d077fa9`, whose code is `build3`'s: `tmp/rung-walk-meet/suite/run2-c3d077fa9/shard-{0..3}.log`, `OK (128 tests)`, `OK (126 tests)`, `OK (129 tests)`, `OK (126 tests)`. `a5d443a46` changes no code.
- The first suite run (`run1-f0cef8d83`) failed the team's `disp0`. The rung repaired that before landing.

## 2. Provenance block (check 2)

Every cited line says what the block says:
- `overloading.tex:469-517` is the Meet Rule for Functional Methods and its cover paragraph.
- `traits.tex:518-527` and `:585-595` are "inherits/provides" and `override`.
- `overloading.tex:134-162` is the restriction and its revival-bound box.
- `inference.tex:99-118` is the bullet whose `:104` says "Inference never instantiates a static parameter at BottomType".
- `OverloadingChecker.scala:563-618`, `:484-490` and `:647-651` hold the meet, the cover, `checkBoundAny` and `isDeclaredName`.
- `OverloadedFunction.java:1023` is `overlapPieces`.
- `MakeInferenceSpecific.java:81-88` is the clamp; `doClamp` is true for the dual map (`:38`), the contravariant walk.
- Every deviation range holds what it names.

The historical line lists the three Java files and three `.tex` files the diff edits.

## 3. The diff against the text (check 4)

- **Row 534** (`OverloadedFunction.java:256-259`, `:635-654`). The condition is `checkBoundAny`'s: a single parameter whose type is a type parameter with `AnyType` written in its extends clause, in a set of two or more. Walk leaves methods out. A functional method always has two parameters with `self`, so that costs nothing.
  - Mine, under walk: `SkAnyTwoSingles` (`k(x: ZZ32)` beside `k[\T extends { Any }\](x: T)`) is refused on the head with the checker's words; the base prints `k(3) = 1`; compiled refuses, "A functional which takes a single parameter of a parametric type bound by Any".
  - `SkAnyBeside` (`f[\T\](x: T)` beside `f[\U extends Any\](x: U, y: ZZ32)`, and `h[\T extends Any\](x: Maybe[\T\])`) loads on both trees. The restriction reaches a written `Any` only, as the callout and POSITIONS, "The implicit bound of an unbounded type parameter is `Any`", say.
- **Row 544** (`OverloadedFunction.java:1076-1320`, `BuildEnvironments.java:1062-1072`, `:1206-1213`). The meet search does what `meetRule` with `withoutSelf` does. A candidate must have its self type below both declaring types (`:1277`, over every position including self), and the overlap is cut over the other positions only (`:1291`). The cover reuses walk's `overlapPieces` and `someBelow`.
  - "Provides" is read as the traits chapter's inheritance, override counted only for a declaration of the type itself (`inherited`, `:1211-1233`). Finding 1 is about that reading.
  - Names are `isDeclaredName`'s (`checkedName`, `:1237-1241`).
- **Row 588** (`EvaluatorBase.java:156-240`, `:450-451`, `:783-784`). A type parameter that the declared parameter types mention only in an odd number of arrow domains, and never in a static argument, takes `boundOf`, the interval's upper end, where its lower end is `BottomType`. Big operators and `rechecks` are excluded.
  - This is the paper's solving step (extract section 4.2: "taking the intersection of the upper bounds", "never instantiates method type parameters with Bottom").
  - It is also POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom`": declared bound `Any` if none, met with what the arguments require.

## 4. My differentials

| program | walk, head | walk, base | compiled | verdict |
|---|---|---|---|---|
| `SkMeetParam`: `S.f(self, Number)`, `T.f(self, ZZ32)`, the meet declared on `object Ob` | `3`, `1` | same | loads; `f(Ob, 1) = 1`, `f(Ob, r) = 1` | loads on all three. The numeral is the documented departure (`literals.tex`, box of "Literals"). |
| `SkCoverTraits`: a cover by two declarations of a trait `R` below both, `X1` a closed trait | `3 4 1 2` | same | refused, "Invalid overloading of mark in trait R" | walk right by the cover paragraph; finding 7 |
| the worker's `FunctionalMethodMeetProvided` | `PASS` | | refused at `Pq` (the cover) and `Ko` (W-a) | finding 7 |
| `SkPartialCover`: only `X1` of the overlap `{X1, X2}` covered | refused, the new message | refused, "first parameters x:[A] and x:[B] are unrelated" | refused | agree; see finding 3 |
| `SkNoOwn`: `object Ob extends { P, Q } end` over `mark(self, x: A)` / `(self, x: B)` | refused at `Ob` | refused at `Ob` by the object-level check | | finding 3 |
| `SkDiamondOverride`: `W extends S` overrides `S.tag`; `object Dio extends { W, S }` | refused at `Dio` | `tag(Wo, 3) = 1`, `tag(Dio, 3) = 1` | refused at `W` and `Dio` | finding 1 |
| `SkSelfPositions`, `SkSelfPositions2`: self at different positions | the base's top-level check, unchanged | same | refused | not the rung's |
| `SkOprMeet`: two traits with `opr ||(self, b: ZZ32)`, `object Vo extends { S, T }` | `Vo \|\| 3 = 1` | same | "Ambiguous coercion in call to operator \|\|" | finding 5 |
| `SkAnyTwoSingles` | refused, row 534's words | `k(3) = 1`, `k("s") = 2` | refused | the repair |
| `SkAnyBeside` | `1 2 3 4` | same | `f(3) = 1`, `f(3, 4) = 1`, `3`, `4` | finding 4 |
| `SkUnboundedVars` (`f[\T\](x: T)` beside `f(x: ZZ32, y: ZZ32)`; and the worker's `OverloadSingleParamUnbounded`) | `f(a, b) = 2`, `f(3, 4) = 2` | same | `f(a, b) = 2`, `f(3, 4) = 1`; the worker's test `FAIL: 1 =/= 2; f(3, 4) runs the declaration of two parameters` | finding 4 |
| `SkAnyDotted`: `object Ob` with `m[\T extends Any\](x: T)` beside `m(x: ZZ32, y: ZZ32)` | "Missing type T" | same | compiles; `Ob.m(3) = 1`, then `ClassCastException` at `Ob.m(3, 4)` | recommended row |
| `SkAbove`: `ap[\T\](g: T -> ZZ32, n: ZZ32)` with a function of a `Number` | `BoxU[Number]` | `other` | `BoxU[Number]` | repaired; agrees |
| `SkAbove`: `apTup[\T\](g: (T, ZZ32) -> ZZ32)` | `BoxU[ZZ32]` | `other` | `BoxU[ZZ32]` | repaired |
| `SkAbove`: `apCurried[\T\](g: ZZ32 -> (T -> ZZ32))` | `BoxU[ZZ32]` | `other` | `BoxU[ZZ32]` | repaired |
| `SkAbove`: `apBoth[\T\](g: T -> ZZ32, x: T)` with `Fruit`, `Apple` | `BoxU[Apple]` | same | same | bounded below, unchanged |
| `SkAbove`: `typecase x of T => g(x)` in a body, `T` bounded from above by a `ZZ32` function, `x = 5` | `6` | `-1` | | the instance reaches the body |
| `SkAbove`: `apN[\T extends Number\]` given a function of a `String` | "Cannot unify String->ZZ32 ... abm=T=(BOTTOM,Number)" | same | "not applicable" | stays loud |
| `SkAbove`: `ap2[\T\](g, h)` with functions of a `Red` and of a `Round` | "Cannot unify Round->ZZ32 ... abm=T=(BOTTOM,Red)" | same | compiles; dies loading `Intersection??` (row 559) | finding 6 |
| `SkLoneD5`: `loneS`/`loneT` over `Apple, Apple, Apple`, `Pear, Pear, Apple` and `Apple, Pear, Pear` | `Apple Apple Fruit Pear Fruit` | same | refused, "not applicable to an argument of type (Apple, Pear, Pear)" | the pin's values match batch 9's second skeptic (`rung-walk-instance/SKEPTIC.md` section 3) |
| `SkUnwrittenBig`: unwritten `SUM` | "join param 1 (a:BOTTOM) got arg 2" | same | | F-bounded half unchanged |
| `SkOddForms`: a generic supertrait `S[\ZZ32\]`, tuple, arrow, varargs and default parameters | loads; the same values on both trees | | | no crash in the check |

One divergence the specification settles against the compiled checker: `SkCoverTraits` and the worker's `Pq`. One it settles against walk, out of the rung's reach: `SkOprMeet`. The numeral cases are walk's documented departure (`Specification/basic/expressions/literals.tex`, section "Literals", the box: the interpreter gives a numeral the type `ZZ32`).

## 5. Findings

1. **Walk now refuses an object that extends both a trait and the supertrait whose declaration that trait overrides.**
   - The program: `trait W extends S` with `override tag(self, x: Number)` over `S`'s `tag(self, x: ZZ32)`, and `object Dio extends { W, S } end`.
   - `bin/fortress SkDiamondOverride.fss` on the head:
     ```
     Invalid overloading of tag in Dio: Dio provides the functional methods tag(self, Number) of W and tag(self, ZZ32) of S, whose parameter types are unrelated (neither subtype, excludes, nor equal) ...
     ```
   - The base ran it (`tag(Dio, 3) = 1`).
   - `inherited` counts as overriding only a declaration of the type itself (`OverloadedFunction.java:1211-1233`), so `Dio` inherits `S.tag` through `S` and `W.tag` through `W`.
   - The chapter's sentence is "except those method declarations that are overridden" (`Specification/basic/traits.tex:518-527`), with no owner named. The team's note under it reads "Method declarations that are overridden by some declaration are not accessible. They are not considered for overloading checks" (`traits.tex:577-579`).
   - Read globally, it would strip `S.tag` from an unrelated `X extends S`. Read as overridden by a declaration the type provides, `Dio` provides `W.tag` alone. Read as the rung does, `Dio` is refused, and the compiled checker agrees.
   - The text does not settle which reading is meant: home 3, no code. The rung's report names its reading (W2) but not this consequence.
2. **A sentence of Appendix I that the rung makes false is not named.**
   - `Specification/appendices/changes.tex:2749-2752`, section "Passages not yet revised", says: "The box of \secref{reduction-expr} still says that the compiled type checker takes \TYP{BottomType} for the element type of a reduction that no argument of its big operator fixes; it now takes the bound of the big operator's static parameter".
   - The rung revised that box (`Specification/basic/expressions/reductions.tex:30-39`), so the sentence is now false.
   - The report's section 8 says "Sentences made false that this rung did not edit: none found." The gather removes the sentence, since the entry is neither of the two the rung edits.
3. **The precedent search missed the team's object-level check.**
   - The report says the "object level" that walk's comment names is something "which no code implemented", and that "no other path refused one" (REPORT section 2, and its paragraph "The defect counted").
   - It exists: `Constructor.java:358-367`, "This will pop an error if the set of defined functions is a bad overload", builds an `OverloadedMethod` over an object's methods, inherited functional methods among them with self dropped.
   - The base refuses `SkNoOwn` there:
     ```
     $ FORTRESS_HOME=$W-base $W-base/bin/fortress SkNoOwn.fss
     first parameters x:[A] and x:[B] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present
     Context: .../SkNoOwn.fss:12:3-28: .../SkNoOwn.fss:17:1-29:
     ```
   - It misses row 544's program because both declarations have empty parameter lists once self is dropped, and it does not reach traits. That is a reason for the new check, but the report must cite the precedent and say why it was not extended. I found no program that the old check refuses and the new one accepts.
4. **`OverloadSingleParamUnbounded` asserts, under a citation that does not say it, the value that the specification's coercion order contradicts.**
   - `ProjectFortress/tests/OverloadSingleParamUnbounded.fss:14` is `assert(f(3, 4), 2, "f(3, 4) runs the declaration of two parameters (advanced/overloading.tex, section \"Principles of Overloading\")")`, and `:16` is the same for `g`.
   - "Principles of Overloading" says the set may be declared, not which declaration a call runs.
   - With numerals of type `IntLiteral` (`Specification/basic/expressions/literals.tex`, section "Literals"), `f[\T\](x: T)` at `T = (IntLiteral, IntLiteral)` is applicable without coercion and `f(x: ZZ32, y: ZZ32)` only with it. So by `Specification/basic/conversions-coercions.tex`, section "Coercion Resolution", and POSITIONS, "Conversions never change which declaration runs", `f(3, 4)` runs the generic.
   - The compiled path prints exactly that. The worker's own test fails there:
     ```
     $ fortress compile OverloadSingleParamUnbounded.fss && fortress run OverloadSingleParamUnbounded   (base copy)
     FAIL:  1 =/= 2; f(3, 4) runs the declaration of two parameters (advanced/overloading.tex, section "Principles of Overloading")
     ```
   - Walk's 2 is its documented numeral departure, which a gated assertion should not present as the text's answer.
   - With `ZZ32` variables both paths and the text agree: `SkUnboundedVars`, `f(a, b) = 2` on all three. `g(3, 4) = 4` is right either way (a tuple is not an `Object`), but it carries the same citation.
5. **Row W-b's home is 2, not 3.**
   - The specification settles it: the Meet Rule for Functional Methods applies to operators as to identifiers (row 584's citation, `Specification/basic/operators/intro.tex`, chapter Operators, with `advanced/overloading.tex`, section "Meet Rule").
   - A walk expected failure can hold a user program, as `XXXFunctionalMethodMeetInherited` held row 544 until this rung: `SkOprMeet` loads and runs `Vo || 3 = 1` on both trees.
   - What no test can hold is the library's five sites. The user program can be held, with a `.test` keyed `load_exception_contains=Invalid overloading of ||`. "Home 3 by necessity" (REPORT section 7) is not right.
6. **The interpreter box's new sentence overstates.**
   - `Specification/basic/inference.tex:199-207`: "it instantiates at the intersection of the upper bounds that its declared bound and the arguments place on it ... such a type parameter whose bound mentions a static parameter, or that is declared with several bounds that it cannot meet, it still instantiates at BottomType."
   - When the arguments place two upper bounds walk cannot meet, the call fails before `instanceOf`:
     ```
     $ bin/fortress SkAbove.fss   (ap2(fn (x: Red) ..., fn (x: Round) ...), T unbounded; head and base alike)
     Cannot unify Round->ZZ32(...) with T->FortressLibrary.ZZ32(...) abm=T=(BOTTOM,Red)
     ```
   - The chapter gives `Red ∩ Round`. This is a pre-existing walk defect, row 588's sibling, with no home. The box and the Effect at `changes.tex:1851-1854` need the case named.
7. **The rung's own guard test is refused by the compiled checker for a reason the report does not name.**
   - `compiler: Invalid overloading of mark in trait Pq: (P, A)->ZZ32 ... and (Q, B)->ZZ32`, and the same for `SkCoverTraits` at `R` and `Ro`.
   - The per-provider meet compares the other parameters without self (`OverloadingChecker.scala:584-586`). The cover is handed the whole arrows (`:615`), so the open self types' overlap `P ∩ Q` is never covered.
   - The Meet Rule for Functional Methods asks the cover of "declarations provided by C, having self parameter at i" (`overloading.tex:509-513`), read per provider as the dotted rule's `R0 <: (P0 ∩ Q0)` is. So the text settles it against the checker.
   - The report's divergences list W-a for `disp0` but not this. A compiled expected failure is owed in `compiler_tests/`, rung C's directory, as for W-a.
8. **The object-expression sibling of row 544 has no home.**
   - Walk's check reaches no object expression (`BuildEnvironments.java:1206-1213`). The worker measured `XXXFunctionalMethodMeetObjectExpression`'s program running `A` on both trees.
   - The Meet Rule covers declarations "occurring in trait or object declarations or object expressions" (`overloading.tex:470-471`), so the text settles it: home 2. An interpreter expected failure keyed on the refusal at load is owed.
   - The report lists the case only under "what walk's check does not reach".

Nothing else found against the decisions on record (check 12):
- the naked-`Any` reach is a written bound only;
- row 588's instance is the meet of the declared bound and the arguments' upper bounds;
- the covers read `comprises` at the level of values.

No loud failure became quiet. The row 534 and 544 changes add refusals. Row 588 replaces a silent `BottomType` instance with the upper end, and a function argument outside the declared bound still fails with a unification error (`SkAbove`, `apN`). The check swallows `FortressException` only to skip a pair (`:1108`, `:1229`, `:1257`, `:1280`), never in a program's run.

## 6. Homes (check 9)

The rung's own homes hold:
- Rows 544, 534 and 588: home 1. Assertions and keys passed in `h-dev3`, `h-xxx` and the suite on `c3d077fa9`.
- The `disp0` over-refusal: home 1, `over(Ko, 3)`, which passed in `h-xxx`.
- W-c (`XXXInferAboveBoundMentionsParamWalk`) and W-e (`XXXOverrideInTraitWalk`): home 2, XXX names, shown red on stand-ins.
- W-d: home 3, with the pin `InferLoneBoundMentionsParamWalk`. Its values match the measurement.
- W-a: owed in `compiler_tests/`, whose text the record carries.

What is still owed is findings 1, 5, 6, 7 and 8 (section 8).

## 7. Count, grep, ledger (checks 7, 10, 11)

- `git diff --name-only 9c9e823d5...HEAD` lists only `interpreter/evaluator/`, `tests/`, `Specification/` and the rung's directory. So no count table is owed, and the rung declares none.
- The new Java names occur in the rung's files only. `checkedName` also occurs as a local in `scala_src/typechecker/impls/Functionals.scala`.
- The new test names collide with nothing in any corpus.
- Ledger rows read: 544, 534, 588, 584, 424, 425, 546, 551, 556, 570 and 591. None changes what the rung should have built.
- Row 591's `XXXInferSeveralBoundsWalk.fss` holds no function-argument form. So the Rationale's "gated by expected failures" (`changes.tex:1755-1761`) reaches `co2B` through row 591's mechanism only. A note, not a correction.

## 8. Required corrections

1. **`OverloadSingleParamUnbounded.fss`** (finding 4). Make the two-argument calls with `ZZ32`-typed variables, as `a: ZZ32 = 3; b: ZZ32 = 4; f(a, b)` and `g(a, b)`, so that walk, the compiled path and the coercion order agree. Cite a section that says which declaration a call runs (`basic/overloading.tex`, section "Overloading Resolution", or `conversions-coercions.tex`, section "Coercion Resolution").
2. **`Specification/appendices/changes.tex:2749-2752`, section "Passages not yet revised"** (finding 2). The sentence on the reductions box goes; the gather makes the edit. REPORT section 8 names it as a sentence the rung made false.
3. **REPORT section 2** (finding 3). Cite the object-level check, `interpreter/evaluator/values/Constructor.java:358-367`. Replace "which no code implemented" and "no other path refused one" with what it does: it refuses at an object, with self dropped, a pair whose other parameters are unrelated, and misses self-only pairs and traits. Say why the rung did not extend it.
4. **`Specification/basic/inference.tex:199-207` and the Effect at `changes.tex:1851-1854`** (finding 6). Name the case where the arguments place on such a type parameter two upper bounds the interpreter cannot meet: the call fails, as for functions of a `Red` and of a `Round`. The home-2 test and row are recommended below.
5. **REPORT section 6 and the divergences list** (finding 7). Name the compiled checker's refusal of `FunctionalMethodMeetProvided` at `Pq` and its cause, beside W-a.
6. **Homes owed that need no code** (the rows below):
   - finding 1, a plain pin;
   - finding 5, W-b's home 2, replacing "home 3 by necessity" in REPORT section 7 and the record;
   - finding 6 and finding 8, home 2 each;
   - finding 7, a compiled expected failure in `compiler_tests/`.

## 9. Stops

- **"A parameter nothing fixes bound to anything but its declared bound"**: listed by the worker for `coS` and `co2B`, which keep `BottomType` (`EvaluatorBase.java:173-177`). I keep it. Reversible, lifted by POSITIONS, "Reversible stops do not hold a batch."
- I measured no other stop:
  - no team test changed verdict;
  - no library type or team test is refused (suite on `c3d077fa9`);
  - no set walk loads runs another declaration (finding 1 is a refusal, of no team or library program);
  - the F-bounded case is unchanged (`SkUnwrittenBig`);
  - no team test line, demo, library, checker or harness file is touched;
  - the text edits are boxes and Appendix I entries only.
