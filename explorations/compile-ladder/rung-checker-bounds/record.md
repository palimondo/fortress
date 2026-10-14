# Climb batch 15, rung C (rung-checker-bounds): record lines

## For FACTS

**The compiled checker keeps an intersection that names a type or inference variable as written, and reads a variable below a union through the union whole or its bound.**

- `normConjunct` expands a closed trait into its listed types only against a conjunct that names no variable (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:708-735`).
- Before the union rule, an inference variable below a union takes the union as one upper bound, and a type variable below a union is also tried through its bound (`:165-180`).
- So a call through a type parameter bounded by a closed trait and a bound that excludes one of its listed types is applicable at the caller's parameter, whether or not the second bound names the parameter. A generic declaration so bounded, beside one on the closed trait, passes the Return Type Rule (rows 686, 687, 689, 690 and NEW-C-1).
- The norm's `squaredNorm(me)` (`Library/FortressLibrary.fss:2493`) left the distance, 54 to 53.
- No union the checker builds over such a bound holds a variable, the POPL 2019 condition for complete matching (P-26). The solver takes the intersection of the upper bounds (P-48).
- Gated by `compiler_tests/InferCallerTwoBoundsClosedTrait`, `CoerceTwoBoundsClosedTrait`, `CallerParamTwoBoundsClosedTrait`, `ReturnRuleTwoBoundsClosedTrait` and `CallerParamTwoGroundBoundsClosedTrait`.
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

- Row 686: `close 686 --commit 4356454a2 --test InferCallerTwoBoundsClosedTrait`. The row has 1,196 characters, so it takes the close's short note only. Its cause, for the history: `TypeAnalyzer.normConjunct` expanded the closed trait over the conjunct `R[\$T\]`, and the union rule split the resulting union before `T`'s bound was read.
- Row 687: `close 687 --commit 4356454a2 --test CoerceTwoBoundsClosedTrait`.
- Row 689: `close 689 --commit 4356454a2 --test CallerParamTwoBoundsClosedTrait`.
- Row 690: `close 690 --commit 4356454a2 --test ReturnRuleTwoBoundsClosedTrait`.
- NEW-C-1: add it (below), then close it with `--commit 4356454a2 --test CallerParamTwoGroundBoundsClosedTrait`.
- Row 680 stays open.
  - Its claim and its note "A compiler-world program of the same shape typechecks" are false.
  - The corrected claim, for its close (`close --claim`), 275 characters: "a local function with no written return type whose body calls a sibling stops the compiled checker, its group's return-type thunks primed without the group: 'TryChecker returned an untyped expr' in a loop body (Array3's asString at `plane(k)`), 'intermediate nodes' elsewhere".
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

## Handover

Rung C (rung-checker-bounds) landed the checker probe's normal-form and union-case patches in `TypeAnalyzer.scala` (`4356454a2`).

- Rows 686, 687, 689 and 690 close with their promoted tests, and the ground sibling NEW-C-1 closes with `CallerParamTwoGroundBoundsClosedTrait`.
- The distance goes from 54 to 53 (`:2493`). The count stays 1, in 378 s.
- Row 680's line was measured and held. With `body(i)` typed for one run, the count over the whole component printed 43 errors in 809 s, past 690 s. Its tests stand as expected failures keyed on today's crashes.
- While the line is held, a landed `body(i)` alone leaves the gate's count at 1, stopped at the crash in `Array3`.
- Review-routed.1's test of row 695's bound at a trait type is `SelfTypeReturnSelfAtTraitRun`, green.

## Revival change

**The change.**

- **What the team's checker did.** It normalised an intersection holding a closed trait by replacing the trait with its listed types that another conjunct excludes, whatever the conjuncts held (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:632-641` at `a874948ac`). It tried a union on the right of a subtype question before its inference-variable and type-variable cases (`:158-159`, before `:164-166` and `:177`).
- **What followed from it.** Take `T extends { K, R[\T\] }` with `K comprises { A, B, C }` and `C` outside `R`. The bound became a union of intersections holding `T`, and the union was split before `T`'s bound was read. A call through such a parameter was refused ('is not applicable to an argument of type Box[\T\]') or stopped the checker ('Applied a substitution to an And and got an Or'). A valid overloading beside it was refused under the Return Type Rule.
- **What the tree does now.** The trait is expanded only against a conjunct that names no type or inference variable (`TypeAnalyzer.scala:708-735`). An inference variable below a union takes the union as one upper bound, and a type variable below a union is also tried through its bound (`:165-180`). The five programs compile and run: `ProjectFortress/compiler_tests/InferCallerTwoBoundsClosedTrait`, `CoerceTwoBoundsClosedTrait`, `CallerParamTwoBoundsClosedTrait`, `ReturnRuleTwoBoundsClosedTrait` and `CallerParamTwoGroundBoundsClosedTrait`.
- **The reason.**
  - The specification makes such a call applicable at an instance within the bounds (`Specification/basic/inference.tex:56-58`).
  - The type group's subtyping algorithm reads no `comprises` clause, and its inference-variable rule applies as the first match finds it (`Papers/Types/fig-subtype.tick`).
  - The POPL 2019 paper proves matching complete only where no union holds a type parameter (`research/extracts/ParkPOPL2019-extract.md`, section 6).
  - The checker's refusals and crash above are the measured failures.

**Provenance.** The checker probe `explorations/perf-probes/checker-bound-defects/` (rows 686, 687, 689 and 690). The ground sibling's patch was placed in this rung by the coordinator's call under the curator's rule for forks. It follows P-26 and P-48, and was built in climb batch 15, rung C. Row 680's repair is not part of this change: it was held.
