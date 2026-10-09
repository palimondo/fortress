# Record lines: climb batch 13, rung V (`rung-array-bound`)

## FACTS

New entry, in "The checker and the one library":

- **The compiled checker keeps a type parameter's bound list as it is when its overloading check reduces two declarations. A bound list that names a trait with a `comprises` clause no longer crashes it. Calls through such a bound are still refused or crash, and with the one library's array family under `T extends { Number, MultiplicativeRing[\T\] }` the overloading check of its api takes about 17 minutes** (`compile-ladder/rung-array-bound/REPORT.md`; row NEW-V-1 fixed; rows NEW-V-3, NEW-V-4, NEW-V-5).
  - `TypeSchemaAnalyzer.boundsSubstitution` (`scala_src/types/TypeSchemaAnalyzer.scala:471-495`) keeps each image variable's bounds without `Any` and duplicates. It proves the variable below each bound in turn, and a bound that the variable was given needs no proof.
  - The team's code met the list and cast the conjuncts to `BaseType`. The meet of `{ K, R[\T\] }`, with `K comprises { A, B, C }` and `C` outside `R`, is a union, so the cast threw.
  - A call whose argument carries the caller's own two-bound parameter is refused, 'not applicable' (`XXXInferCallerTwoBoundsClosedTrait`). A call that converts a numeral beside such a parameter crashes in `Formula.slv` (`XXXCoerceTwoBoundsClosedTrait`). Writing the static argument works around both.
  - With the library's array family bounded so, the checker-count stage's checker spends about 17 minutes of one core in `checkApi FortressLibrary` (two runs on 2026-10-09), past the stage's 900 s limit. The time goes to `TypeAnalyzer`'s normalization of each variable's bound intersection, which expands `Number`'s `comprises` clause (`scala_src/types/TypeAnalyzer.scala:224`, `:648-649`). Fork 2's library half is held for it.
  - Gated by `compiler_tests/OverloadTwoBoundsClosedTrait`.

Rewrite in place the entry of "The checker and the one library" whose title begins "The compiled checker gives a call its expected type in a clause of an `if` without `else`". Three changes:

- **The title and its source.** Its title's list becomes "... a `typecase` clause and a juxtaposition, loose or tight, ...". Its source parenthesis becomes (`compile-ladder/rung-checker-expected-type/REPORT.md`, `compile-ladder/rung-checker-contexts/REPORT.md`, `compile-ladder/rung-array-bound/REPORT.md`; rows 560, 627, 642, 644, 651 and 660 fixed).
- **The sites.** The sentence on the other sites becomes: "The other sites: `impls/Decls.scala:51-58` (`checkLetBody`), `impls/Operators.scala:170-197` (the loose juxtaposition), `:362-386` (a tight juxtaposition of items none of which is a function) and `:390-403` (the repeated operator). In the last three, whether the multifix application applies is decided without the expected type. The type is then given to the multifix application where it fits, and otherwise to the outermost of the left-associated binary applications."
- **The gaps left, and the gates.** The sentence beginning "The checker still gives no expected type to an argument of another call" ends after "(row 455, `XXXInferContextDrops`)." Its clause on the tight juxtaposition, row 660 and `impls/Operators.scala:362-374` goes. The gated list gains `InferTightJuxtContext` after `InferLooseJuxtContext`.

Correct in place the entry "Route A's generic container obligations still need body-level checks". "except `matrix(v)` for `NN32` and `NN64` (row 437)" becomes "except `matrix(v)` for `RR32`, `NN32` and `NN64` (row 437)". The base refuses `matrix[\RR32,2,2\](narrow(2.0))`: 'Unification error: Closure/Constructor for init0 param 2 (v:RR32) got arg 0: ZZ32 of type Int' (rung V's REPORT, section 6).

## Ledger

- **Row 660.** Append this note, then close the row: `ledger.py close 660 --commit d3d31b5b2 --test InferTightJuxtContext`.
  - Note: "Repaired by climb batch 13 rung V. The `SMathPrimary` case gives the expected type to the multifix juxtaposition where it applies, and otherwise to the outermost left-associated binary one (`impls/Operators.scala:362-386` at 816251130). `a(b)(c)` is asserted with it. No distance site was this row's, and none moved."
- **Row 437.** Append:
  - "On the base `matrix(v)` is refused for `RR32` too: `matrix[\RR32,2,2\](narrow(2.0))`, 'Unification error: Closure/Constructor for init0 param 2 (v:RR32) got arg 0: ZZ32 of type Int'.
  - Climb batch 13 rung V built the repair in fork 2's form: `v.zero` under `T extends { Number, MultiplicativeRing[\T\] }` (d3d31b5b2). It is held with the library half (row NEW-V-5).
  - With the repair, `RR32`, `NN32` and `NN64` run, and an `RR64` matrix's off-diagonal zero prints `0.0 : FloatLiteral` where it printed `0.0 : Float`."
- **Row 455.** Append: "Climb batch 13 rung V gives the expected type to a tight juxtaposition (row 660), not to an argument. `XXXInferContextDrops` keeps its verdict ('Saw expected failure' in the rung's `ant testQuick`)."
- **Row 591.** Append: "With the array family bounded by `{ Number, MultiplicativeRing[\T\] }` (climb batch 13 rung V, d3d31b5b2, held), walk ran these green: the seven array tests, `RationalTest`, `IntegerOrderNumerals`, `GenericBesidePlainTwoBounds` and `ArrayElementAlgebra`. Every call of the family fixes `T`."
- **Row NEW-V-1.** Add it (below), then close it: `ledger.py close NEW-V-1 --commit 816251130 --test OverloadTwoBoundsClosedTrait`. The fix came in d3d31b5b2 and took its final form in 816251130.

## New rows

Section "5. Overloading on the compiled path: checker and dispatch":

| NEW-V-1 | the compiled checker's overloading check crashed on two overloads whose type parameter has a bound list naming a trait with a `comprises` clause one of whose listed types the other bound excludes: `TypeSchemaAnalyzer.boundsSubstitution` cast the union that the bounds' meet became to `BaseType` | NEGATIVE-VERIFIED | implementation gap (checker) | `advanced/overloading.tex`, "Declarations with Static Parameters"; `basic/trait-parameters.tex`, "Type Parameters" | `ProjectFortress/compiler_tests/OverloadTwoBoundsClosedTrait.test` | climb batch 13 rung V | `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:474-477` at a1a75716a: `conjuncts(imageTa.meet(e))` cast to `BaseType`; for `T extends { K, R[\T\] }` with `K comprises { A, B, C }` and `C` outside `R`, 'class com.sun.fortress.nodes.UnionType cannot be cast to class com.sun.fortress.nodes.BaseType' under `reduceED` (`:421`), `normalizeED` (`:216`), `subtypeEDInner` (`:171`). With the array family bounded by `{ Number, MultiplicativeRing[\T\] }` it crashed the api's and the component's overloading and the export stage (`explorations/reviews/array-fork2-judgement.md` section 3). |

| NEW-V-5 | the compiled checker's overloading check of the one library's api takes about 18 minutes once the array family is bounded by `T extends { Number, MultiplicativeRing[\T\] }`, against seconds under `T extends Number`: each subtype query on such a variable expands `Number`'s `comprises` clause | NEGATIVE-BOUNDED | implementation gap (checker) | silent | none | climb batch 13 rung V | With fork 2's default on `Library/FortressLibrary.fss` and `.fsi` (d3d31b5b2) and rung V's checker, the count stage's checker ran 17:47:05 to 18:05:06 UTC, past the stage's 900 s limit, count still 1. Thread dumps: `TypeAnalyzer.pSubInner` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:224`), `pNorm`, `normConjunct` (`:648-649`), `dExc`, `pExc` (`:402-472`), called from `TypeSchemaAnalyzer.reduceED` (`:370`) and `subEDsolution` (`:194`, `:198`); `IntLiteral` excludes `MultiplicativeRing[\T\]`. On 09-29 the distance stage's FortressLibrary took 3,825 s against 704 s with this bound (`explorations/reviews/array-design-ways.md:324`). |

Section "2. Types: generics, static parameters, inference and coercion":

| NEW-V-2 | the compiled checker refuses `Vector[\T,s0\]` and `Matrix[\T,s0,s1\]` as the declared result of the first of each overloaded factory pair, 'The static argument T does not satisfy the corresponding bound Number', where it accepts the same type three lines below | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/trait-parameters.tex`, "Type Parameters" | none | climb batch 13 rung V | siblings: 399. `vector[\T extends Number, nat s0\]():Vector[\T,s0\]` (`Library/FortressLibrary.fss:2454`) and `matrix[\T extends Number, nat s0, nat s1\]():Matrix[\T,s0,s1\]` (`:2831`), against `tabulatedVector` at `:2457`: `TypeWellFormedChecker.scala:154-167` tests each written argument against its bound in an analyzer extended with the declaration's static parameters (`:130-137`), and `T` reaches the test with no bound in scope (`explorations/reviews/array-fork2-judgement.md` section 2.2; not traced to its line). The distance stage's sites (`explorations/compile-ladder/gate/distance-sites.tsv:144`, `:154`). |

| NEW-V-3 | the compiled checker refuses a call whose argument carries the caller's type parameter, bounded as the callee's by a closed trait and a bound excluding one of its listed types: in `g[\T extends { K, R[\T\] }\](x: Box[\T\]): T = h(x)`, `h` 'is not applicable to an argument of type Box[\T\]' | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/inference.tex`, "The Static Arguments of a Call" | `ProjectFortress/compiler_tests/XXXInferCallerTwoBoundsClosedTrait.test` | climb batch 13 rung V | Refused at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:721` (`typedApplication`) on a1a75716a and after rung V's `boundsSubstitution` fix, so not that code; not traced to the inference step that fails. The norm's `squaredNorm(me)` (`Library/FortressLibrary.fss:2483`) was refused so on a library copy with the two-trait array bound (`explorations/reviews/array-fork2-judgement.md` section 3). With `K`'s clause naming no type outside `R` the call checks. Workaround: write the static argument, `h[\T\](x)`, which compiles and runs. |

| NEW-V-4 | the compiled checker crashes on a call that converts a numeral when the callee's type parameter is bounded by a closed trait and a bound excluding one of its listed types: `f(A, 1)` for `f[\T extends { K, R[\T\] }\](x: T, y: ZZ32)`, 'Applied a substitution to an And and got an Or' | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/inference.tex`, "The Static Arguments of a Call" | `ProjectFortress/compiler_tests/XXXCoerceTwoBoundsClosedTrait.test` | climb batch 13 rung V | `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:593` (`slv`) under `solveToBounds` (`:497`), `STypesUtil.inferStaticParamsHelper` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1036`) and `Functionals.checkApplicableWithCoercion` (`impls/Functionals.scala:371`, `:379`), on a1a75716a and after rung V's `boundsSubstitution` fix. The same call with a `ZZ32` variable, `f(A, z)`, checks and runs. Workaround: a typed argument, or the written static argument `f[\A\](A, 1)`, which compiles and runs. |

Every row passes `python3 explorations/coordinator/tools/ledger.py check --rows`, apart from the placeholder number. NEW-V-5's claim says about 18 minutes, the first run's wall time. The second run's `checkApi FortressLibrary` alone took about 17 minutes of a full core.

## Handover

Climb batch 13 rung V (`wip/rung-array-bound`; 5b52d0705, d3d31b5b2, 816251130):
- The compiled checker no longer crashes on a bound list that names a closed trait. `boundsSubstitution` keeps the list (NEW-V-1, `OverloadTwoBoundsClosedTrait`).
- A tight juxtaposition gets its expected type (row 660, `InferTightJuxtContext` promoted). Appendix I's Effect is amended.
- Fork 2's library half (Q13.2's default) was built and held. With it, the count stage's checker takes about 17 minutes in the api's overloading check (NEW-V-5, in `TypeAnalyzer.scala`). The library is the base's, and the 23 sites and row 437 stay. Q-V1 is the curator's.
- Two call-site defects of the same bound list are expected failures (NEW-V-3, NEW-V-4). The factory sites have a row (NEW-V-2).
- `ant testQuick` is green (compiler 1093). The count is 1 and the distance 153, both unchanged, with no site moved. FortressLibrary took 666 s.

## Revival change

Revival change: none.
- The checker's two repairs make it do what the team's specification already says: a set of overloaded declarations with static parameters is decided by the three rules over the instances of their bounds (`Specification/advanced/overloading.tex:531-559`). A call written by tight juxtaposition has the expected type (`Specification/basic/inference.tex:149-151`).
- The team's checker crashing on a bound list, or giving no expected type, is a gap repaired, not a rule changed. No team source says otherwise.
- Walk is unchanged.
- The one change to the library's language that the rung built, fork 2's bound, is held and not landed.