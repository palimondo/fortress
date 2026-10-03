# Rung W of climb batch 10: walk's Meet Rule for functional methods, the naked Any at load, and a parameter bounded from above

*The row numbers are the final ones the gather of climb batch 10 assigned: the rung's provisional rows W-a to W-e are rows 610 to 614.*

problem: ProjectFortress/tests/FunctionalMethodMeetInherited.fss:6 (row 544), ProjectFortress/tests/OverloadSingleParamBoundAny.fss:6 (row 534), ProjectFortress/tests/InferContravariantWalk.fss:7 (row 588), each an expected failure on the base under its XXX name
spec: Specification/advanced/overloading.tex:469-517 (section "Meet Rule", the Meet Rule for Functional Methods and its covering declarations); Specification/basic/traits.tex:518-527, :585-595 (section "Method Declarations", what a type inherits and provides); Specification/advanced/overloading.tex:134-162 (section "Principles of Overloading", a bound written Any); Specification/basic/inference.tex:99-118 (section "The Static Arguments of a Call", the intersection of the upper bounds, never BottomType)
precedent: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:563-618 (the per-provider Meet Rule, withoutSelf, coverageRule), :484-490 (checkBoundAny), :647-651 (isDeclaredName); ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1023 (overlapPieces, walk's cover reading); ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java:81-88 (the team's clamp of a contravariant type parameter to its most general bound)
deviation: provides is read by the traits chapter's inheritance where the checker reads every supertype's declaration (OverloadedFunction.java:1166-1235); symbolic operators, generic providers and object expressions are not checked, as the checker skips the first and checks no object expression (OverloadedFunction.java:1237-1241, BuildEnvironments.java:1206-1213); a pair walk cannot read or settle is not refused (OverloadedFunction.java:1083-1112, :1268-1320); a parameter bounded only from above whose bound mentions a static parameter or that has several bounds keeps BottomType (EvaluatorBase.java:173-177)
historical: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java, Specification/basic/inference.tex, Specification/basic/expressions/reductions.tex, Specification/appendices/changes.tex

(The harness refused this agent's write of REPORT.md. This text is the report, for the gather to write verbatim.)

## 1. What changed

- **Row 544.** Walk's load check applies the Meet Rule for Functional Methods per providing type. `BuildEnvironments.checkComprisesClauses`, which `Driver.evalComponent` calls once with every unit, now also runs `OverloadedFunction.FunctionalMethodMeets` over every trait and object without static parameters of every component (`BuildEnvironments.java:1066-1072`, `:1206-1213`; `OverloadedFunction.java:1076-1320`).
  - A type provides the functional methods it declares and those it inherits, as the traits chapter reads inheritance.
  - Two of one name, declared in different types with self at one position, whose parameter lists are neither one below the other nor excluding, need a declaration the type provides on their meet, or declarations that cover it through the `comprises` clauses.
  - The refusal names walk's words for an uncovered overlap, which the test's key names.
- **Row 534.** `finishInitializingSecondPart` refuses an overloaded functional whose single parameter is one of its own type parameters with the bound `Any` written, in the checker's words (`OverloadedFunction.java:256-259`, `:635-654`).
- **Row 588.** A type parameter that the declared parameter types mention only in arrow domains, an odd number deep, and never inside a static argument, takes its interval's upper end where its lower end is `BottomType`. That upper end is the meet of its declared bound and the bounds the arguments place on it (`EvaluatorBase.java:156-240`, the calls at `:450-451`, `:783-784`).
  - Not changed: a big operator's parameters (batch 9's D2), and a parameter in `rechecks`, whose bound mentions a static parameter or that has several bounds walk cannot meet.
- **D5's reach** is pinned by a plain test, `tests/InferLoneBoundMentionsParamWalk.fss`.
- **Text.** The interpreter's box in the inference chapter, the reductions callout and their two Appendix I entries are revised in the S1 form (section 8). The decision record is `decision-record.md` in this directory.

Commits on `wip/rung-walk-meet`:
- `d365bbd06` holds the tests alone.
- `f0cef8d83` holds the first edit.
- `c3d077fa9` holds the final code: the inheritance reading, the override guard and two expected failures.
- `a5d443a46` holds the text, the decision record and the record.

The worktree was made fresh by `seed-worktree.sh` from the batch's base build; nothing was inherited.

## 2. Where the fix belongs, and the precedents

Walk's overloading checks at load live in `OverloadedFunction.finishInitializingSecondPart` and in `BuildEnvironments.checkComprisesClauses`, the second called once from `Driver.evalComponent` (`interpreter/Driver.java:227`) after every type is built. `Driver.java` is outside `interpreter/evaluator/` (a stop).

**The checker's precedents, read whole:**
- `OverloadingChecker.checkOverloading` gathers every method of each trait or object with `STypesUtil.allMethods`, that is `gatherMethods`, every declaration of the type and of every supertype (`scala_src/useful/STypesUtil.scala:1563-1613`). It drops in a component an abstract one implemented below, and checks the functional methods among them as methods (`OverloadingChecker.scala:361-371`, `:135-157`).
- For two functional methods at one position it asks a third, below both, whose domain without self is their meet (`meetRule`, `:569-592`), or a cover (`coverageRule`, `:607-618`).
- `checkBoundAny` (`:484-490`) refuses, in every set of two or more, a declaration whose domain is a type variable whose bound is written `Any`.
- `isDeclaredName` (`:647-651`) skips symbolic operators (row 584).

**Walk's precedents:**
- `overlapPieces` (`OverloadedFunction.java:1023-1067`) cuts an overlap through `comprises` clauses, and `someBelow` decides a part's inclusion; the new check reuses both.
- Walk's top-level check marks two functional methods with different self types distinct and leaves them, by its comment, to "the object level" (`OverloadedFunction.java:429-436` at the base). The object level is the team's check when an object's constructor is finished (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:358-367`, in `Constructor.finishInitializing`): it builds an `OverloadedMethod` for every method name an object has more than one declaration of, its functional methods among them with self dropped, and so refuses, at an object, a pair whose other parameters are unrelated; it misses a pair whose only parameter is self, and it checks no trait. *(Corrected at the gather of climb batch 10, from the skeptic's required correction: the report first said that no code implemented the object level.)*
- For row 588, the team's `MakeInferenceSpecific` already clamps a type parameter in a contravariant position of the return type to its most general bound (`interpreter/evaluator/MakeInferenceSpecific.java:81-88`). Batch 9's `boundOf` (`EvaluatorBase.java:131-134`) gives the interval's upper end.

**The defect counted.** The case of the old "Somebody Else's Problem" occurs once in the file. Every pair of functional methods with different self types took that path; the object-level check of `Constructor.java:358-367` then refused, at an object, those whose other parameters are unrelated, and no path refused a self-only pair or a pair that a trait provides. The rung did not extend the object-level check, and its report gave no reason; the gather notes that the check sees an object's methods with self dropped, so it cannot read a functional method's self position (decision record W2) or provides by the traits chapter, and reaches no trait, which is what the per-provider rule at load needed. *(Corrected at the gather of climb batch 10, from the skeptic's required correction.)*

## 3. The tests, first

`d365bbd06` holds the tests alone:
- the three expected failures promoted by `git mv` to `FunctionalMethodMeetInherited`, `OverloadSingleParamBoundAny` and `InferContravariantWalk`, the last with two more assertions (a declared bound `Number` met with an argument's `Any`, and two function arguments);
- `FunctionalMethodMeetProvided`, a type with its meet declared and an object whose two declarations cover the overlap of `A` and `B` through their `comprises` clauses, and two functional methods that no type provides both of;
- `OverloadSingleParamUnbounded`, the unwritten bound beside an overload;
- the D5 pin.

On the base, from the worktree before any edit (`d365bbd06`'s code is the base's):

```
explorations/compile-ladder/rung-inference-walk/harness-one.sh $W/tmp/rung-walk-meet/h-base <the six .fss and two .test files>
. interpret tmp/rung-walk-meet/h-base/tests/FunctionalMethodMeetInherited
 Missing expected refusal at load
. interpret tmp/rung-walk-meet/h-base/tests/OverloadSingleParamBoundAny
 Missing expected refusal at load
FAIL: J5/0:other =/= J10/0:BoxU[ZZ32]; a function of a ZZ32 bounds the type parameter above by ZZ32, which it takes, never BottomType (inference.tex, section "The Static Arguments of a Call")
Tests run: 6,  Failures: 4,  Errors: 0
```

The fourth failure was the test's own slip, `PQ is not a valid object name`: an all-capitals name is an operator. It was renamed `Pq`, and the file passed on the base before the commit (`h-base2`: `OK (1 test)`). The other two new tests passed on the base: `OverloadSingleParamUnbounded` `PASS` and `InferLoneBoundMentionsParamWalk` `PASS`.

**After the edit,** on the build of `c3d077fa9`'s code, with `disp0`:

```
explorations/compile-ladder/rung-inference-walk/harness-one.sh $W/tmp/rung-walk-meet/h-dev3 <the six tests, two keys, tests/disp0.fss>
 OK Saw expected refusal at load        (OverloadSingleParamBoundAny, FunctionalMethodMeetInherited)
OK (7 tests)
```

The interpreter suite on `c3d077fa9` (section 5) runs each of them too.

**Later in the rung:**
- `FunctionalMethodMeetProvided` gained the override case, which the first edit refused (section 5.1).
- Two expected failures were added, each shown red on a stand-in:

```
harness-one.sh $W/tmp/rung-walk-meet/h-xxx tests/XXXOverrideInTraitWalk.fss tests/XXXInferAboveBoundMentionsParamWalk.fss <the two stand-ins> tests/FunctionalMethodMeetProvided.fss
FAIL: J5/0:other =/= J10/0:BoxU[ZZ32]; S is fixed at ZZ32 by z, ...
 OK Saw expected exception
FAIL: a Int: 1 =/= a Int: 2; W's functional method tag over Number overrides S's over ZZ32, ...
 OK Saw expected exception
 Missing expected failure        (each stand-in)
Tests run: 5,  Failures: 2,  Errors: 0
```

- The stand-ins are an object that declares the overrides itself, which walk runs correctly, and the call with its static arguments written.

## 4. The repairs and what the text settles

### 4.1 Row 544

The Meet Rule for Functional Methods (`Specification/advanced/overloading.tex:469-517`): if a trait or object C provides both, there is a declaration on the meet provided by C, or declarations provided by C, self at the same position, below both, that cover it.

"Provides" is the traits chapter's (`Specification/basic/traits.tex:518-527`): a type "inherits method declarations from the declarations of its immediate supertraits except those method declarations that are overridden ... or whose parameter type (not including the type of the self parameter) is equal to the parameter type of a method declaration that occurs in the trait declaration", and "provides the method declarations that it declares or inherits". An `override` declaration overrides inherited ones whose parameter types but self's are strictly below its own (`:585-595`).

Walk now refuses at load, in the checker's order:
- the row's program;
- the checker's tests `XXXFunctionalMethodMeetJoinOfClosedTraits` (at `Join`), `XXXFunctionalMethodMeetBetweenTraits` (at `M`) and `XXXFunctionalMethodMeetSelfSecondNoMeet` (at `D`);
- the ledger's closed-trait program with the meet declared only on the object (`PrClosedNoMeet`, at `V`);
- a subtype that widens a parameter without `override` (`PrWidened`).

It loads:
- `FunctionalMethodMeetPerProvider`, `FunctionalMethodMeetSelfSecond` and `XXXFunctionalMethodMeetNarrowedSelfNotFirst`;
- the closed-trait program with the meet on `V`;
- the team's `disp0` and `PrOverrideWiden`, whose `override` declarations override the inherited ones.

Section 6 has the table.

### 4.2 Row 534

The restriction is stated against a bound written `Any`, and an unbounded type parameter does not fall under it (`overloading.tex:134-162`; POSITIONS, "The implicit bound of an unbounded type parameter is `Any`").

Walk refuses `f[\T extends Any\](x: T)` beside `f(x: ZZ32, y: ZZ32)` and the chapter's `makeSet` pair. It loads `f[\T\](x: T)` and `g[\T extends Object\](x: T)` beside two-parameter overloads, and a lone `f[\T extends Any\](x: T)`.

The suite shows no library set refused; the callout's "the checker draws no such refusal on the one library" is true of walk as well.

### 4.3 Row 588

The rule is the intersection of the upper bounds, never `BottomType` (`inference.tex:99-118`; the paper's solving step, `research/extracts/ParkPOPL2019-extract.md` section 4.2; POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom`"). Under walk, on the edit and in the rung's base copy (`PrAbove`):

| call | edit | base |
|---|---|---|
| `co[\T\](g: T -> ZZ32)` with `fn (x: ZZ32): ZZ32 => x` | `BoxU[ZZ32]` | other (`BottomType`) |
| `coN[\T extends Number\]` with `fn (x: Any): ZZ32 => 1` | `BoxU[Number]` | other |
| `co2[\T\](g, h)` with functions of a `Number` and of a `ZZ32` | `BoxU[ZZ32]` | other |
| `coS[\S, T extends S\](g: T -> ZZ32, s: S)` | other | other |
| `coF[\T extends Cmp[\T\]\](g: T -> ZZ32)` | other | other |
| `co2B[\T extends { Red, Round }\](g: T -> ZZ32)` | other | other |
| `coNested[\T\](g: (T -> ZZ32) -> ZZ32)` | `BoxU[ZZ32]` | `BoxU[ZZ32]` |
| `coUntyped[\T\](g: T -> ZZ32)` with `fn x => 1` | `BoxU[Any]` | other |

- `coS` is gated as an expected failure (row 612).
- `coF` is P1's.
- `co2B` is row 591's mechanism.
- `coNested`'s `T` is bounded from below, an even number of domains deep, and is unchanged.
- An untyped function expression's parameter gives `T` the upper bound `Any`, which `T` now takes.

## 5. The interpreter suite

The command is `tmp/rung-walk-meet/suite/shard.sh <i>` for i from 0 to 3, run in parallel. It runs `SystemJUTest` over `ProjectFortress/tests/` as `build.xml`'s `systemShard` does: 768 MB, `-Xss32m`, `FORTRESS_THREADS=1`, private caches, `-Dfortress.suite.shard=i/4`, plus `-Dfortress.inference.trace`. There is one run per code state.

### 5.1 On `f0cef8d83`, the first edit

```
OK (130 tests)
Tests run: 126,  Failures: 1,  Errors: 0
OK (126 tests)
OK (125 tests)
```

The one failure was the team's `disp0`:

```
Invalid overloading of f in B: B provides the functional methods f(self, Number) of B and f(self, ZZ32) of A, whose parameter types are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present, ...
```

`object B extends A` declares `override f(self, other: Number)` over `A`'s `f(self, other: ZZ32)`. The traits chapter does not let `B` inherit the overridden declaration, so `B` provides one `f` and needs no meet. The first edit read provides as the checker does, every declaration of every supertype.
- `c3d077fa9` reads it by the chapter (decision record W2).
- `FunctionalMethodMeetProvided` gained the case (`over(Ko, 3)`) as a gated assertion.

The compiled checker refuses `disp0` (section 6), a divergence the text settles in walk's favour (row 610). It also refuses the rung's `FunctionalMethodMeetProvided` at `Pq`, 'Invalid overloading of mark in trait Pq: (P, A)->ZZ32 ... and (Q, B)->ZZ32', where `Pq`'s own declarations cover the overlap of `A` and `B` through their `comprises` clauses: its `coverageRule` passes the whole arrows, self included, to `coversOverlap` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:615`), where `meetRule` compares them without self (`:584-586`), a second divergence the text settles in walk's favour (`Specification/advanced/overloading.tex`, section "Meet Rule"; row 617, with `compiler_tests/XXXFunctionalMethodMeetCoverWithoutSelf`). *(The second divergence added at the gather of climb batch 10, from the skeptic's required correction.)*

### 5.2 On `c3d077fa9`, after the last code edit

```
# shard i/4 2026-10-03T07:54:30Z tree c3d077fa9 status: 0 changed src files
OK (128 tests)
OK (126 tests)
OK (129 tests)
OK (126 tests)
```

509 tests, no failure, 523 files. Among them:
- the expected failures of rows 549, 587, 589, 591 and 592 and `XXXUnwrittenSumRungF` keep their verdict, as do the two new ones;
- `ComprisesMeetWalk`, `GenericBesidePlainTwoBounds`, `ComprisesUnlistedExtender`, `InferUnfixedBoundWalk` and `InferLoneUnboundedWalk` pass.

**Sets walk now refuses at load:**
- in the suite, only the rung's two promoted tests;
- no library type and no team test;
- outside the suite, the programs of section 6.

**Generic calls whose instance moved** (the trace's `above` lines, the rule's own label). The suite's other trace lines are batch 9's rules, unchanged. Only the rung's own three calls moved, nothing in the library or the team's tests:

| declaration | parameter | before | after |
|---|---|---|---|
| `co[\T\](g: T -> ZZ32)` (`tests/InferContravariantWalk.fss:7`) | T | BottomType | ZZ32 |
| `coN[\T extends Number\](g: T -> ZZ32)` (`:8`) | T | BottomType | Number |
| `co2[\T\](g: T -> ZZ32, h: T -> ZZ32)` (`:9`) | T | BottomType | ZZ32 |

**Load time.** `bin/fortress Hello.fss` five times each, alternating: base 4.00 3.55 3.52 3.36 3.31 s, edit 4.07 3.57 4.29 3.51 3.33 s. Medians 3.52 and 3.57.

## 6. Differentials

Under walk on this rung's build (`FORTRESS_HOME=$W $W/bin/fortress P.fss`) and in the rung's base copy (`FORTRESS_HOME=$W-base $W-base/bin/fortress P.fss`). The compiled checker ran in the base copy (`fortress compile P.fss`), its code untouched by this rung. Programs are in `tmp/rung-walk-meet/probes/`.

| program | walk, edit | walk, base | compiled checker |
|---|---|---|---|
| `PrClosedNoMeet` (row 544's program, meet only on the object) | refused at `V` | `tag = 3` | Invalid overloading of tag in trait V |
| `PrClosedMeet` (meet on `V`) | `tag = 3 1` | same | |
| `PrWidened` (`W extends S` widens `tag`'s parameter, no `override`) | refused at `W` | `tag = 1` | Invalid overloading of tag in trait W |
| `PrOverrideWiden` (the same with `override`) | `tag = 1 mark = 3` | same | Invalid overloading of tag in trait W |
| `tests/disp0.fss` (team) | `f PASS` / `g PASS` | same | Invalid overloading of f in trait B |
| `tests/FunctionalMethodMeetProvided.fss` (the rung's test) | `PASS` | | Invalid overloading of mark in trait Pq, and at `Ko` (row 610): the per-provider cover counts self (row 617, added at the gather from the skeptic's finding) |
| `PrMakeSet` (the chapter's pair) | refused, row 534's words | `makeSet = 1` | "A functional which takes a single parameter of a parametric type bound by Any cannot be overloaded." |
| `PrUnwrittenBeside` (`f[\T\](x: T)` beside `f[\T extends Any\](x: T, y: T)`, a lone `[\T extends Any\]`) | `f = 1 2 lone = 3` | same | no error |
| `compiler_tests/XXXFunctionalMethodMeetJoinOfClosedTraits` | refused at `Join` | `B` | (its key) |
| `compiler_tests/XXXFunctionalMethodMeetBetweenTraits` | refused at `M` | `3` | (its key) |
| `compiler_tests/XXXFunctionalMethodMeetSelfSecondNoMeet` | refused at `D` | `A` | |
| `compiler_tests/FunctionalMethodMeetPerProvider`, `...SelfSecond`, `XXX...NarrowedSelfNotFirst` | `PASS` | `PASS` | |
| `compiler_tests/XXXFunctionalMethodMeetObjectExpression` | `A` (not checked) | `A` | |
| `PrGenericSupers` (an object below `G[\ZZ32\]` and `H[\String\]`) | refused at `O` | | |
| `PrGenericProvider` (`V[\X\] extends { S, T }`, `object Vo extends V[\ZZ32\]`) | refused at `Vo`, not `V` | | |
| `PrOverrideDotted` (override in a trait and in an object) | `trait: tag = 1 dot = 1; object: tag = 3 dot = 3` | same | |

The last row is a measured walk defect the text settles: in a trait the override should give 2 (row 614).

## 7. Every measured defect and its home

| defect | home | where |
|---|---|---|
| row 544: walk loads a type providing two overlapping functional methods with no meet | 1 | `tests/FunctionalMethodMeetInherited.fss` (promoted), `FunctionalMethodMeetProvided.fss` |
| row 534: walk loads a single parameter written bounded by `Any` beside an overload | 1 | `tests/OverloadSingleParamBoundAny.fss` (promoted), `OverloadSingleParamUnbounded.fss` |
| row 588: a parameter bounded only from above at `BottomType` | 1 | `tests/InferContravariantWalk.fss` (promoted, three assertions) |
| the first edit refused `disp0`'s override (measured in this rung, repaired before landing) | 1 | `tests/FunctionalMethodMeetProvided.fss`, the `over(Ko, 3)` assertion; `tests/disp0.fss` |
| row 610: the compiled checker refuses an override the traits chapter allows (`disp0`, `PrOverrideWiden`) | 2 | `compiler_tests/XXXOverrideFunctionalMethodWiden` (rung C's directory; placed at the gather of climb batch 10 from the record's text) |
| row 611: walk's check skips symbolic operators as the checker does; over them five library sites break the rule | 2 | `tests/XXXFunctionalMethodMeetOperator.fss`, an interpreter expected failure over a user-level operator program, keyed on the refusal at load (placed at the gather of climb batch 10, from the skeptic's required correction: the report first gave home 3, the ledger row alone, reading that no gated test could hold an over-acceptance of library declarations; a user-level program can) |
| row 612: a parameter bounded only from above whose bound mentions another static parameter keeps `BottomType` | 2 | `tests/XXXInferAboveBoundMentionsParamWalk.fss` |
| row 613: D5's reach, whether the chapter solves a call's type parameters jointly | 3 | `tests/InferLoneBoundMentionsParamWalk.fss` |
| row 614: walk runs the overridden declaration below a trait whose `override` overrides it | 2 | `tests/XXXOverrideInTraitWalk.fss` |
| row 591's form bounded only from above (`co2B`) | 2 (row 591's) | note on row 591 |

## 8. The text

Revised in the S1 form, the passages the section names and no others:
- `Specification/basic/inference.tex:198-207`, the interpreter's box in "The Static Arguments of a Call": the sentence on row 588 now says what walk does, with the two examples the test asserts and the two exceptions measured.
- `Specification/basic/expressions/reductions.tex:30-39`: the callout's sentence on the two implementations. Walk takes `BottomType` (row 424); the compiled checker takes the bound, which gives a plain bound's type and no applicable instance for an F-bounded one (row 425's note: `InferBigOperatorUnwritten`, the GB sites' 'not applicable to an argument of type ()').
- `Specification/appendices/changes.tex`, entry "The inference of a call's static arguments":
  - Change: `:1663-1665`, the old clause dated; `:1677-1685`, the old sentence quoted and the new one described.
  - Rationale: `:1750-1761`.
  - Effect: `:1851-1854`.
- `Specification/appendices/changes.tex`, entry "Reductions whose element type nothing fixes": Change `:1017-1023`, the box's old sentence quoted; Rationale `:1029-1035`.

**Sentences made false that this rung did not edit:** none found. A grep of `Specification/` for "bounds only from above", "row~588" and "lower end of the" finds only the passages above. No passage says walk does not apply the Meet Rule for functional methods or the naked-`Any` restriction. The overloading chapter's callout "the checker draws no such refusal on the library" (`advanced/overloading.tex:160-162`) stays true of walk.

The braces and math delimiters of the three files balance as before; the PDF was not built (the commit stage builds it).

## 9. The stages and the ladder

**The checker count and the distance are unchanged and were not run.** The edit touches no path they read:
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` (`EvaluatorBase.java`, `BuildEnvironments.java`, `values/OverloadedFunction.java`);
- `ProjectFortress/tests/`;
- `Specification/`;
- `explorations/compile-ladder/rung-walk-meet/`.

**The ladder subset is empty.** The rung adds no name to the library or the compiled path, and no compiled file's recorded first error names one of its names.

**The corpora were grepped.** The test names and the Java names this rung adds were grepped in `tests/`, every `*_tests/` directory and `src/com/sun/fortress/`. The only other hit is a local `checkedName` in `scala_src/typechecker/impls/Functionals.scala:896`, another class's value.

## 10. Stops

- **"A parameter nothing fixes bound to anything but its declared bound", met on part of the work.** A parameter bounded only from above whose bound mentions another static parameter keeps `BottomType` (`EvaluatorBase.java:173-177`; gated by `XXXInferAboveBoundMentionsParamWalk.fss`). So does one with several bounds walk cannot meet (row 591). Reversible; lifted by POSITIONS, "Reversible stops do not hold a batch."
- **Not met:**
  - No interpreter test changed verdict but by intent.
  - No library type or team test is refused at load on the landed code.
  - No set walk loads today runs another declaration.
  - No key admits another failure.
  - The F-bounded case is unchanged.
  - No team test line and no demo was touched.
  - No normative text beyond the named passages was changed.
  - No library, checker or harness file was edited.

## 11. For Pavol

1. **Symbolic operators skipped.** Walk's Meet Rule check skips symbolic operators, as the checker does (row 584). Over them the rule breaks at five library sites, measured on the first edit's reading and holding under the final one by reading:
   - `EmptyString` provides its own `||(self, String)` and `Concatenable`'s `||(self, EmptyString)` with no `||(self, EmptyString)` of its own (`Library/String.fss:275-325`, `:33-37`);
   - `CompactFullRange2D` and `CompactFullRange3D` each provide `|_|` from `CompactFullRange` and from `FullRange2D`/`FullRange3D` and `DelegatedIndexed`, with none of their own (`Library/RangeInternals.fss:1130-1156`, `:1161-1190`).

   Applying the rule to operators refuses these at load. That waits on his item 38 (row 585) and on the checker's row 584; row 611.
2. **The checker and override.** The compiled checker reads every supertype's declaration as provided and refuses the team's `disp0` and any `override` that widens a functional method's parameter, which the traits chapter allows (`Specification/basic/traits.tex:518-527`, `:585-595`). Walk now follows the chapter. A checker repair, and its compiled expected failure in `compiler_tests/` (rung C's directory), are owed; row 610, whose expected failure the gather placed (`compiler_tests/XXXOverrideFunctionalMethodWiden`). Beside it, the checker refuses the rung's `FunctionalMethodMeetProvided` at `Pq`, because its per-provider cover counts the self position (`OverloadingChecker.scala:615` against `:584-586`): row 617, with `compiler_tests/XXXFunctionalMethodMeetCoverWithoutSelf` (added at the gather).
3. **Override in a trait.** Walk runs the overridden declaration below a trait whose `override` overrides it, functional and dotted (`tests/XXXOverrideInTraitWalk.fss`); row 614.
4. **D5's reach** stays his question: whether the chapter solves a call's type parameters jointly. Now pinned (`tests/InferLoneBoundMentionsParamWalk.fss`); row 613.
5. **The equal-parameter clause.** The traits chapter's clause on equal parameter types does not say "self at the same position". It is read so, as the override clause and the checker's `removeIdenticallyCoveredMethods` read it (decision record W2; `traits.tex:518-527`).
6. **What walk's check does not reach:** a generic trait or object as the provider (its non-generic extenders are checked), an object expression, and a pair whose parameter types it cannot evaluate or whose overlap it cannot settle (decision record W4, W5).

## 12. What comes back to Pavol

- **The sets walk now refuses at load:**
  - a trait or object without static parameters that provides two overlapping functional methods of an identifier or word-operator name, declared in different types with self at one position, with no meet and no cover among the declarations it provides;
  - an overloaded functional whose single parameter is a type parameter with `Any` written.

  No library type or team test is among them (section 5.2).
- **Row 588's instance as built:** the upper end of the interval, `ZZ32`, `Number` and `ZZ32` in the test. A parameter whose bound mentions a static parameter, or that has several bounds walk cannot meet, keeps `BottomType`.
- **The revised passages:** section 8.
