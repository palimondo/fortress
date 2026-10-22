# Chunk l3: check

The writer's `rows.rewrite` (11 lines) and `closes.txt`, checked against the tree at `HEAD` (`b3dad547d`; since `d4d454f9d` only files under `explorations/coordinator/` changed, so every pin "at d4d454f9d" reads the same at `HEAD`). Each row's old line was read with `ledger.py show N`. Nothing was built or run.

Form: `python3 explorations/coordinator/tools/ledger.py check --rows explorations/coordinator/ledger-health-2026-10-22/evidence/clarity/l3/rows.rewrite` prints "11 rows, 0 fail the template".

Counts: pass 9 (441, 457, 463, 465, 510, 511, 514, 523, 537); fail 2 (470, 495). Row 533 has no new line (investigate; its question is in `questions.md`). Closes: none proposed, and none is due: every row's defect stands in the tree (below).

## 441: pass

- `intExp` casts `Math.pow` to `int` and throws `new RuntimeException("Overflow Error:")` above `Integer.MAX_VALUE` (`simpleIntArith.java:400-406`), bound at `CompilerBuiltin.fss:744` (import `:75`). So `2^(-1)` is `(int)0.5 = 0`, `0^(-1)` is infinite and throws, and the bases 1 and -1 give 1, -1. `intToIntPower` (`:380-398`): `a == 1` gives 1, `a < 0` throws `DivisionByZero`, else 0, as the note says; `perf-probes/integer-power/REPORT.md` §7 item 2 agrees.
- The contract is `basic-integers.tex:534-537` (section "Integers", `:13`) and P-153; F-263 names row 441 for the compiled half. `NN32.java:232` calls `UnsignedLong.negativePow`, so the cut sign-extension note is past.
- Reproducer: `XXXIntegerPowerContractCompiled.fss` asserts `2^(-1)` throws `IntegerOverflow` and `0^(-1)` throws `DivisionByZero`, with `IntegerPowerContractCompiledLink.test` beside it. `tests/IntegerPowerContractWalk.fss` asserts walk's side.

## 457: pass

- `FortressLibrary.fss:138` is `opr LEXICO(self, other:Comparison): Comparison = Unordered`; `TotalComparison` declares `LEXICO` at `:177-179` only (a `TotalComparison` and two thunk forms); `EqualTo`'s thunk form is `:214`. `CompilerBuiltin.fss:1494-1495` is the specification's body.
- The lazy-form sentence matches `climb-batch-13/RECORD.md:174` and `tests/ComparisonLazyLexico.fss:6-12`. The workaround `LEXICO:` follows from that note ("`LessThan LEXICO: Unordered` is `LessThan`").
- Reproducer: `XXXLexicoUnorderedRungH.fss:8-9` asserts the left argument.

## 463: pass

- `PreTypeCheckDesugaringVisitor.java`: `forIf` `:249-270`, its `__cond` call built in `addIfClause` (`:276-289`); `forWhile` builds `__whileCond` at `:306-317`. `FortressLibrary.fss:1269-1273` declares `__cond` (twice) and `__whileCond` over `Condition[\E\]`. No `__cond` or `__whileCond` in `Library/CompilerLibrary.fs*` or `ProjectFortress/LibraryBuiltin/`.
- "with `__cond` declared in the program that refusal goes": `climb-batch-11/RECORD.md:145` ("the first shown red with `__cond` declared in the program"); a compile `XXX` test is red when its `compile_err_contains` key is unmet.
- Reproducer: `XXXIfGeneratorClause.test` (`compile`, `compile_err_contains=Variable __cond is not defined`); `XXXWhileGeneratorClause.test` pins the `while` form.
- Note, not a failure: the cited `:245-280` ends before the `__cond` call is built (`:285-288`); `:249-298` would cover it.

## 465: pass

- `FortressLibrary.fss:2707` and `:2711` declare `opr[_:TrivialOpenRange, i1:ZZ32]` and `opr[i0:ZZ32, _:TrivialOpenRange]`, live (the comment above closes at `:2705`). The api's `Array2` (`FortressLibrary.fsi:1695-1732`) declares `opr[]` at `(ZZ32,ZZ32)` assignment, `Range[\(ZZ32,ZZ32)\]`, `OpenRange[\ZZ32\]` and `TrivialOpenRange`, and none takes `(TrivialOpenRange, ZZ32)`; `Matrix` (`:1736-1749`) adds none. `VectorMatrixCastsWalk.fss:158-165` runs `m[:, 1]` and `m[1, :]`.
- `__thrower` is declared only in the component (`FortressLibrary.fss:2580`; no match in the `.fsi`). `ComponentOnly.fss` is in `9269f7bd2^`.
- The example's source: `climb-batch-20/RECORD.md:135` and `rung-array-sites/REPORT.md` finding 4. Reproducer `none` is right: `VectorMatrixCastsWalk` stays green when the api declares the subscripts.

## 470: fail

- Passage: "A dotted call checks it (`staticInstantiationForApp`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:803-832`, at d4d454f9d; F-70)".
- Source: `STypesUtil.scala:803-832` is `staticArgsMatchStaticParamsForApp`, the bound check. `staticInstantiationForApp` is `:729-775`, and it calls that check at `:741`. The name and the lines point at two different functions.
- Correction: `:803-832` becomes `:729-741` (same length; the line then passes the template, checked), or the name becomes `staticArgsMatchStaticParamsForApp` with 8 characters cut elsewhere.
- The rest holds: `Functionals.scala:1034` calls `staticInstantiationForApp` for a dotted call; `:1191` calls `staticInstantiation` for an `SFunctionalRef`; `staticInstantiation` (`:674-727`) calls `staticArgsMatchStaticParams` at `:686`, which matches kinds only (`:782-801`). F-70 and F-250 say this and name row 470. The dropped `g[\(ZZ32, ZZ32)\]` and `g[\ZZ32 -> ZZ32\]` examples are kept in the history.

## 495: fail

- Passage 1, the claim: "overloaded generic dotted methods die at dispatch: ...". Source: the old line bounded the defect by rows 493 and 494, an arm that names its static parameters otherwise than the dispatcher (493) and an arm reached at `ZZ32` (494). `reviews/mie-probes/scope-call-site-dispatch.md` §4 says the renamed-arm cast and the `ZZ32` spelling stay "in dotted methods". The three measured shapes are of those two kinds: `grab[\X\]`/`grab[\Y\]`, the swapped pair, `Kint`'s pair at `ZZ32` (`XXXDispatchMethodArmRungG.fss:15-23`). Nothing measured shows a same-named pair at a non-`ZZ32` type dying. Without the conditions, the claim says more than the evidence.
- Passage 2: "as does the swapped pair", with the probe paths cut because "the `XXX` test reproduces" (`assessment.md`). Source: `XXXDispatchMethodArmRungG.fss` has `K` (renamed) and `Kint` (`ZZ32`), and no swapped pair. The swapped pair is the probe `MethSwapped.fss` (`pair[\A,B\](t: Two[\A,B\])` beside `pair[\B,A\](t: SubTwo[\B,A\])`, at `ab067d9b6^:explorations/compile-ladder/rung-generic-runtime/probes/MethSwapped.fss`). The row names no source for that case, and "the swapped pair" does not say what is swapped.
- Correction: state the conditions in the claim, name the swapped pair, and restore its probe pointer. One line that does this and passes the template (1,184 characters, checked with `ledger.py check --rows`):

  `| 495 | on the compiled path, overloaded generic dotted methods die at dispatch where an arm renames its static parameters or is reached at `ZZ32`: `K`'s `grab[\X\](t: Tag[\X\])` and `grab[\Y\](t: Sub[\Y\])` die on `K.grab(b2)`, `ClassCastException` (`Marker⟦Y⟧`), as do `pair[\A,B\]` and `pair[\B,A\]` | NEGATIVE-VERIFIED | implementation gap (codegen) | `basic/overloading.tex`, "Principles of Overloading"; "Overloading Resolution" | `ProjectFortress/compiler_tests/XXXDispatchMethodArmRungG.test` | climb batch 6.5 rung G | siblings: 496. A pair at `ZZ32` dies on the run time's spelling of `ZZ32`. The swapped pair: probe `compile-ladder/rung-generic-runtime/probes/MethSwapped.fss`, in the parent of `ab067d9b6`. The method's dispatcher template is made on the generic-function-class path, the trait's static parameters first (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2393-2414`, at d4d454f9d). Top-level functions' call-site dispatch (`DispatchSwappedArmRungG`) does not reach it. An inherited generic arm beside a plain method dies in `readAndExpandGenericThing` (`perf-probes/generic-distribute/REPORT.md` §7). full text: history, row 495 |`

  To fit, it drops the `mie-probes` note citation (the `OverloadSet.java` lines are the primary source) and the `IndexOutOfBoundsException` name, which the history keeps.
- The rest holds: `OverloadSet.java:2393-2414` (`convertGenericMethodToClosureDecl` with the trait's static parameters, `generateGenericFunctionClass` at `:2414`); `DispatchSwappedArmRungG` is a plain gated test; rows 493 and 494 are FIXED, and row 21 too, so cutting "Walk cannot run these" is right.

## 510: pass

- `XXXInferExpectedTypeRungK.fss` asserts the function form. `XXXExpectedTypeFixRungT.fss` asserts the method form, an assignment and a field (`H.f`). `BoxT[\Any\]` is from `climb-batch-17/RECORD.md:191`.
- F-55 holds the `idK` contrast and the missing coercion. F-228 says a clause form takes a local variable's declared type, and that a clause form in a call's argument gets none (rows 510, 705). Row 705 is open and names 510 as a sibling; 455 is FIXED. P-12 says walk is not changed before the switch-over, which matches "whether before the switch-over (P-12) is the curator's".
- Workaround `wrapK[\ZZ64\](3)`: walk converts a `ZZ32` argument at a written `ZZ64` static argument (`tests/DispatchWrittenStaticArgWalk.fss:18`).

## 511: pass

- `EvaluatorBase.java:606-610` (varargs) and `:634-637` (a declared type that mentions a type parameter) unify unpromoted. `values/Coercions.java:199-219` is `coercionTargets`, which looks up only declared coercion types, and no tuple type declares one.
- `tests/TupleOrderMixedRefused.{fss,test}` refuses `(1,2) < (1,2.5)` at load, "Failed to find any matching overload". The pair order is `opr <[\A ..., B ...\](t1:(A,B), t2:(A,B))` (`FortressLibrary.fss:4626`), the tuple shape. F-92, `revival-changes.md` ("Pairs and triples ...") and `climb-batch-13/RECORD.md:175` name row 511 for it. P-76 names rows 395 and 511 together.
- Reproducer: `XXXInferVarargsRungK.fss`.

## 514: pass

- `CompilerLibrary.fsi:173-174` declares only `opr :(lo:ZZ32, hi:ZZ32): Range` and `opr #(lo:ZZ32, sz:ZZ32): Range`. The one library's strided `:` is `opr :[\I\](r: Range[\I\], stride:I): Range[\I\]` (`FortressLibrary.fsi:2412`), `Range[\ZZ32\]` at a `ZZ32` range, as row 661 states.
- Reproducer: `XXXStridedRangeRungT.test`, `compile_err_contains=(ZZ32, ZZ32)->Range is not applicable to an argument of type (Range, IntLiteral)`, over `seq(0:10:3)`.

## 523: pass

- `intExp` (`simpleIntArith.java:400-406`): `2^31 = 2147483648.0 > MAX_VALUE` throws a plain `RuntimeException`; `(-3)^21` and `(-2)^33` are below `MIN_VALUE`, and the `(int)` cast saturates them to `-2147483648`. `CompilerBuiltin.fss:744`.
- Walk: `tests/PowChooseLcmRungE.fss:58` asserts `2^31` throws `IntegerOverflow` (the new line says no more than that walk raises it). `intToIntPower` checks overflow (`:388-392`) and breaks the contract at a negative exponent (see 441).
- Reproducer: `XXXPowZZ32CompiledRungE.fss:9-10` asserts `IntegerOverflow` for `(-3)^21` and `2^31`, with `PowZZ32CompiledRungELink.test`.

## 537: pass

- `XXXOverloadTwoGenericBare`, `XXXOverloadExistentialMeet` and `XXXGenericBoundsMeet` exist. `XXXGenericBoundsMeet.fss:12-14` is the three `sort` declarations over `ListI` bounded by `A`, `B` and `{A, B}`. `rung-popl-examples/REPORT.md:66-67` shows it dying, "Unable to read serialized data", after `REACHED`, so the checker accepted it. `tests/XXXGenericOverload2.fss` exists.
- What the old line's "Also XXXGenericBoundsMeet." meant is now stated before the marker.

## 533: no new line

The writer proposes to investigate. The assessment's citations hold: `FortressLibrary.fsi:283` is `abstract opr ^(self, other:AnyIntegral): T`, and `:365-366` are `RR64`'s two powers. `climb-batch-20/RECORD.md:133` says the tie is not measured. Not checked further: there is no line to check.

## Closes

`closes.txt` proposes none. None is due. Every row's defect stands in the tree: `intExp` is still bound (441, 523); `:138` is unchanged (457); no compiled `__cond` (463); the api lacks the `Array2` subscripts (465); `staticInstantiation` matches kinds only (470); the `XXX` reproducers of 495, 510, 511, 514 and 537 keep their prefixes.
