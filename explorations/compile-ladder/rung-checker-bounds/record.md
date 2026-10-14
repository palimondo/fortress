# Climb batch 15, rung C (rung-checker-bounds): record lines

## For FACTS

**The compiled checker keeps an intersection that names a type or inference variable as written, and reads a variable below a union through the union whole or its bound.**

- `normConjunct` expands a closed trait into its listed types only against a conjunct that names no variable (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:708-735`).
- Before the union rule, an inference variable below a union takes the union as one upper bound, and a type variable below a union is also tried through its bound (`:165-180`).
- So a call through a type parameter bounded by a closed trait and a bound that excludes one of its listed types is applicable at the caller's parameter, whether or not the second bound names the parameter. A generic declaration so bounded, beside one on the closed trait, passes the Return Type Rule (rows 686, 687, 689, 690 and NEW-C-1). A call outside the bounds is refused as not applicable, where it stopped the checker.
- One face stays refused: a call whose argument's type carries the caller's parameter, `h(x)` with `x: Box[\T\]`, under a ground second bound (NEW-C-2). The ground bound is still expanded to a union, and the meet of the callee's variable's upper bounds, `T` and that union, is distributed into a union holding `T` (`TypeAnalyzer.scala:696-699`).
- The norm's `squaredNorm(me)` (`Library/FortressLibrary.fss:2493`) left the distance, 54 to 53.
- No union the checker builds over a bound that names the parameter holds a variable, the POPL 2019 condition for complete matching (P-26). A ground bound's expansion is kept, and a meet of it with a variable still gives a union holding the variable (NEW-C-2). The solver takes the intersection of the upper bounds (P-48).
- The meet over a variable is no longer expanded for exclusion either: `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)`, where `Z` excludes the two listed types that extend `R` and the third extends `Z`, was accepted and is now refused as an invalid overloading, as walk refuses it and as the type group's exclusion rules of 2011 decide it (`advanced/overloading.tex`, "Declarations with Static Parameters"). Whether such types exclude is not settled (`appendices/changes.tex`, "Passages not yet revised"): NEW-C-3, gated by `XXXOverloadTwoBoundsClosedTraitExclusion`. Detail: `compile-ladder/rung-checker-bounds/SKEPTIC.md`.
- Gated by `compiler_tests/InferCallerTwoBoundsClosedTrait`, `CoerceTwoBoundsClosedTrait`, `CallerParamTwoBoundsClosedTrait`, `ReturnRuleTwoBoundsClosedTrait`, `CallerParamTwoGroundBoundsClosedTrait`, `CoerceTwoGroundBoundsClosedTrait`, `ReturnRuleTwoGroundBoundsClosedTrait`, `InferCallerTwoGroundBoundsToClosedTrait` and `XXXCallOutsideTwoBoundsClosedTrait`; the face that stays refused by `XXXInferCallerTwoGroundBoundsClosedTrait`.
- Detail: `compile-ladder/rung-checker-bounds/REPORT.md`, sections 1 and 6.

Corrections of entries that are now wrong:

- **F-94** is wrong in its title's last clause, "but fails calls through a parameter so bounded", and in its sentences on rows 686, 687, 689 and 690. Those calls and that overloading now check, compile and run (the four promoted tests). Its sentence on row 688's memo holds. The fact above replaces the rest.
- **F-53**: "Typed, the count would stop at row 680's crash in Array3, still one error; only once that crash is fixed does it show the component's own errors."
  - Now measured. With `body(i)` typed and row 680's line in, the stage checks the component whole: 43 errors (the component's 44 typecheck and wellformed sites less `:2493`) in 809 s, at load 3 to 9 on 4 cores. About 263 s went to the apis and 546 s to the component.
  - That is past the 690 s that climb batch 15 set, so row 680's line is held. On the rung's final code the count is 1 in 378 s, and the distance is 53.
  - Detail: REPORT.md section 6, run 2.
- **F-54**: "The sized arrays' count is a floor: a checker crash hides the rank-3 array trait's body (row 680)."
  - Now measured. With row 680's line, the component's check lists no error in `Array3` (`Library/FortressLibrary.fss:2886-2999`), so nothing is hidden behind the crash, and the floor is exact.
  - The crash row stays in the distance while the line is held.

## Ledger notes

- Row 686: `close 686 --commit 4356454a2 --test InferCallerTwoBoundsClosedTrait --claim CLAIM`, its CLAIM (297 characters): "the compiled checker refuses a call whose argument carries the caller's type parameter, bounded as the callee's by a closed trait and a bound that names it and excludes a listed type: in `g[\T extends { K, R[\T\] }\](x: Box[\T\]): T = h(x)`, `h` 'is not applicable to an argument of type Box[\T\]'". Its claim spoke of any bound excluding a listed type, and the ground face stays refused: it is NEW-C-2 (below). The row has 1,196 characters, so it takes the close's short note only. Its cause, for the history: `TypeAnalyzer.normConjunct` expanded the closed trait over the conjunct `R[\$T\]`, and the union rule split the resulting union before `T`'s bound was read.
- Row 687: `close 687 --commit 4356454a2 --test CoerceTwoBoundsClosedTrait`. Its ground face is gated by `CoerceTwoGroundBoundsClosedTrait`.
- Row 689: `close 689 --commit 4356454a2 --test CallerParamTwoBoundsClosedTrait`.
- Row 690: `close 690 --commit 4356454a2 --test ReturnRuleTwoBoundsClosedTrait`. Its ground face is gated by `ReturnRuleTwoGroundBoundsClosedTrait`.
- NEW-C-1: add it (below), then close it with `--commit 4356454a2 --test CallerParamTwoGroundBoundsClosedTrait`.
- Row 680 stays open.
  - Its claim and its note "A compiler-world program of the same shape typechecks" are false.
  - The corrected claim, for its close (`close --claim`), 285 characters, covering the recursive case that `XXXLocalFunctionRecursiveUntypedReturn` pins: "a local function with no written return type whose body calls a member of its group, itself included, stops the compiled checker, the thunks primed without the group: 'TryChecker returned an untyped expr' in a loop body (Array3's asString at `plane(k)`), 'intermediate nodes' elsewhere".
  - Its reproducer is now `ProjectFortress/compiler_tests/XXXLocalFunctionSiblingInLoop.test`, which `ledger.py` cannot set.
  - The note to append once the gather makes room (its notes hold 691 of 700 characters): "climb batch 15 rung C: cause `impls/Decls.scala:414`, the thunks primed without the group; the fix `makeTryChecker(newChecker)` is held, the whole-component count took 809 s > 690 s; tests XXXLocalFunctionSiblingInLoop, XXXLocalFunctionSiblingCall, XXXLocalFunctionRecursiveUntypedReturn (re-key to 'reference cycle' at the fix)".
- Row 518: append "climb batch 15 rung C (`4356454a2`): before the union rule, an inference variable below a union takes the union as one upper bound, and a type variable below a union is also tried through its bound (`TypeAnalyzer.scala:165-180`); `InferUnionInstanceArg` keeps its verdict" (271 characters; the notes hold 388).
- Row 688: append "count stage at climb batch 15 rung C: 378 s; with body(i) typed and row 680's line, the whole component in 809 s" (112 characters; the notes hold 583).
- Row 695: append once room is made (the notes hold 700 of 700): "at a trait-typed S the body runs: SelfTypeReturnSelfAtTraitRun (climb batch 15 rung C)".
- Row 577: the note would be "climb batch 15 rung C edits no library line; its per-site list equals the landed one but for :2493". The notes hold 699 of 700, so it needs room.
- Row 685: no note from this rung (rung L's).

## New rows

Section "2. Types: generics, static parameters, inference and coercion":

| NEW-C-1 | the compiled checker crashes on a call through a type parameter bounded by a closed trait and a bound naming no type parameter that excludes one of its listed types: `h(x)` in `g[\T extends { K, Q }\](x: T): T` with `trait Q excludes { C }`, 'Applied a substitution to an And and got an Or' | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/inference.tex`, "The Static Arguments of a Call" | `ProjectFortress/compiler_tests/CallerParamTwoGroundBoundsClosedTrait.test` | climb batch 15 checker probe | siblings: 686, 689. `TypeAnalyzer.normConjunct` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:692-698` at ee1aa1a95) normalizes `K` and `Q` to `OR(A,B)`; the union rule (`:165-166`) splits `$T <: OR(A,B)` before the inference-variable case and `T <: OR(A,B)` before T's bound is read, so the solver meets an Or (`typechecker/Formula.scala:640`). Rows 686 to 690's fix leaves it. Walk runs it. Workaround: `h[\T\](x)`. Probe: `explorations/perf-probes/checker-bound-defects/REPORT.md` section 2.5. |

The row passes `ledger.py check --rows` but for the `?` in its number cell (1,043 characters). It is added and closed at once. Nothing else in the tree cites it yet.

In the same section, from the skeptic's measure (`compile-ladder/rung-checker-bounds/SKEPTIC.md`):

| NEW-C-2 | the compiled checker refuses a call whose argument's type carries the caller's type parameter, bounded as the callee's by a closed trait and a ground bound excluding a listed type: `h(x)` in `g[\T extends { K, Q }\](x: Box[\T\]): T`, 'is not applicable to an argument of type Box[\T\]' | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/inference.tex`, "The Static Arguments of a Call" | `ProjectFortress/compiler_tests/XXXInferCallerTwoGroundBoundsClosedTrait.test` | climb batch 15 rung C skeptic | siblings: 686, NEW-C-1. On ee1aa1a95 and after rung C: `K` and `Q` are ground, so `normConjunct` still expands them to `OR(A,B)` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:708-735`); the meet of `h`'s variable's upper bounds `T` and `OR(A,B)` is distributed by `pNorm` (`:696-699`) to `OR(AND(T,A),AND(T,B))`, a union holding `T`, below which `T` is not found (`-Dfortress.debug.analyzer.subtype=true`). With `h`'s bound `K` alone the call checks. Walk runs it. Workaround: `h[\T\](x)`, which compiles and runs. |

The row passes `ledger.py check --rows` but for the `?` in its number cell (1,066 characters). It stays open: the rung keeps the expansion of a ground meet, and a repair changes the normal form of a meet of a variable with a union.

In the same section, from the same measure:

| NEW-C-4 | the compiled checker refuses a call of a generic function whose type parameter has a bound naming the parameter and that no argument fixes: `mk(A)` for `mk[\T extends R[\T\]\](x: K): Box[\T\]`, 'is not applicable to an argument of type A' | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/inference.tex`, "The Static Arguments of a Call" | `ProjectFortress/compiler_tests/XXXInferUnfixedSelfBoundedParam.test` | climb batch 15 rung C skeptic | siblings: 447, 425. The same on ee1aa1a95 and after rung C; not traced. The section's choice rule makes the call applicable, at the instance `A`; its instantiation rule gives such a parameter the intersection of its upper bounds, here a bound that names the parameter, which it does not describe. With the bound `{ K, R[\T\] }` the base stopped instead, 'Applied a substitution to an And and got an Or', and since rung C (`4356454a2`) gives this refusal. Walk runs it. Workaround: `mk[\A\](A)`, which compiles and runs. |

The row passes `ledger.py check --rows` but for the `?` in its number cell (981 characters). The defect predates the rung; the rung turns its closed-trait face from a crash into this refusal.

Section "5. Overloading on the compiled path: checker and dispatch", from the same measure:

| NEW-C-3 | the compiled checker refuses, as an invalid overloading, `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)`, where `K comprises { A, B, C }`, `Z excludes { A, B }` and `C extends Z` but not `R`: only `C` could meet both, and the bound rules it out | CONTESTED | design limit (checker) | `advanced/overloading.tex`, "Declarations with Static Parameters" | `ProjectFortress/compiler_tests/XXXOverloadTwoBoundsClosedTraitExclusion.test` | climb batch 15 rung C skeptic | siblings: 690. Unsettled: Appendix I lists whether two parameter types exclude where only static arguments that a bound rules out could meet them (`appendices/changes.tex`, "Passages not yet revised"). ee1aa1a95 accepted it: `normConjunct` expanded `K` against `R[\T\]` into a union of `A` and `B` meets, which `Z` excludes. Since rung C (`4356454a2`) the meet over `T` stays `K` and `R[\T\]`, which the type group's exclusion rules of 2011 (`Papers/Types/fig-exclusion.tick`, the intersection rule) do not find excluded from `Z`. Walk refuses it at load ('at least one pair of parameters must have excluding types'). With a ground second bound the expansion stays and the pair is accepted. |

The row passes `ledger.py check --rows` but for the `?` in its number cell (1,169 characters). Its test pins today's refusal, which ee1aa1a95 did not give; the curator's answer to the unsettled question decides whether the row turns into a defect of the normal form or closes as the rule.

## Handover

Rung C (rung-checker-bounds) landed the checker probe's normal-form and union-case patches in `TypeAnalyzer.scala` (`4356454a2`).

- Rows 686, 687, 689 and 690 close with their promoted tests, row 686 with its claim narrowed to a bound that names the parameter, and the ground sibling NEW-C-1 closes with `CallerParamTwoGroundBoundsClosedTrait`. The ground faces of rows 687 and 690, a callee bounded by the closed trait alone, and the refusal of a call outside the bounds, which stopped the checker before, have their tests too.
- NEW-C-2, the ground face of row 686, stays open: `XXXInferCallerTwoGroundBoundsClosedTrait`.
- NEW-C-4: a type parameter whose bound names it and that no argument fixes makes a call not applicable, on the base too; with a closed trait in the bound the base crashed and the head refuses: `XXXInferUnfixedSelfBoundedParam`.
- NEW-C-3: an overloading the base accepted through the expansion over a variable is now refused, on a question Appendix I lists as not settled: `XXXOverloadTwoBoundsClosedTraitExclusion`.
- The distance goes from 54 to 53 (`:2493`). The count stays 1, in 378 s.
- Row 680's line was measured and held. With `body(i)` typed for one run, the count over the whole component printed 43 errors in 809 s, past 690 s. Its tests stand as expected failures keyed on today's crashes.
- While the line is held, a landed `body(i)` alone leaves the gate's count at 1, stopped at the crash in `Array3`.
- Review-routed.1's test of row 695's bound at a trait type is `SelfTypeReturnSelfAtTraitRun`, green.

## Revival change

**The change.**

- **What the team's checker did.** It normalised an intersection holding a closed trait by replacing the trait with its listed types that another conjunct excludes, whatever the conjuncts held (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:632-641` at `a874948ac`). It tried a union on the right of a subtype question before its inference-variable and type-variable cases (`:158-159`, before `:164-166` and `:177`).
- **What followed from it.** Take `T extends { K, R[\T\] }` with `K comprises { A, B, C }` and `C` outside `R`. The bound became a union of intersections holding `T`, and the union was split before `T`'s bound was read. A call through such a parameter was refused ('is not applicable to an argument of type Box[\T\]') or stopped the checker ('Applied a substitution to an And and got an Or'). A valid overloading beside it was refused under the Return Type Rule.
- **What the tree does now.** The trait is expanded only against a conjunct that names no type or inference variable (`TypeAnalyzer.scala:708-735`). An inference variable below a union takes the union as one upper bound, and a type variable below a union is also tried through its bound (`:165-180`). The five programs compile and run: `ProjectFortress/compiler_tests/InferCallerTwoBoundsClosedTrait`, `CoerceTwoBoundsClosedTrait`, `CallerParamTwoBoundsClosedTrait`, `ReturnRuleTwoBoundsClosedTrait` and `CallerParamTwoGroundBoundsClosedTrait`; so do `CoerceTwoGroundBoundsClosedTrait`, `ReturnRuleTwoGroundBoundsClosedTrait` and `InferCallerTwoGroundBoundsToClosedTrait`, and a call outside the bounds is refused as not applicable (`XXXCallOutsideTwoBoundsClosedTrait`). A call whose argument's type carries the parameter under a ground second bound is still refused (`XXXInferCallerTwoGroundBoundsClosedTrait`), and a meet over a variable no longer excludes a type through the expansion (`compile-ladder/rung-checker-bounds/SKEPTIC.md`).
- **The reason.**
  - The specification makes such a call applicable at an instance within the bounds (`Specification/basic/inference.tex:56-58`).
  - The type group's subtyping algorithm reads no `comprises` clause, and its inference-variable rule applies as the first match finds it (`Papers/Types/fig-subtype.tick`).
  - The POPL 2019 paper proves matching complete only where no union holds a type parameter (`research/extracts/ParkPOPL2019-extract.md`, section 6).
  - The checker's refusals and crash above are the measured failures.

**Provenance.** The checker probe `explorations/perf-probes/checker-bound-defects/` (rows 686, 687, 689 and 690). The ground sibling's patch was placed in this rung by the coordinator's call under the curator's rule for forks. It follows P-26 and P-48, and was built in climb batch 15, rung C. Row 680's repair is not part of this change: it was held.
