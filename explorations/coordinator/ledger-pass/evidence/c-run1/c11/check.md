# Check: chunk c11 (base c124c6b65)

`mech.md`: 9 lines, 0 failing; apply and `ledger.py check` (plain and `--base`) exit 0. I re-read every `file:line` below at c124c6b65 with `git show c124c6b65:<path>`. Result: 6 pass, 6 fail.

## Row 69 (rewrite): FAIL
- **Fidelity.** The passage "`typecheck-old` (`:467`) uses the interpreter library but cannot typecheck that library itself" is stale and says less than the code shows. At `Shell.java:467-474` (c124c6b65), `typecheck-old` calls `useInterpreterLibraries(); setScala(false); setTypeChecking(true);`. With Scala off, `StaticChecker.java:228-229` throws 'The Java version of the type checker is gone now.' (the same branch row 833 cites). So every component that reaches the checker stops there, not only the library. The cold read also could not resolve "cannot typecheck that library itself" (what fails, and with what message).
- **Correction.** In the notes, replace "`typecheck-old` (`:467`) uses the interpreter library but cannot typecheck that library itself." with "`typecheck-old` (`:467-474`) uses the interpreter library with the Scala checker off and type checking on, so, by reading, a component that reaches the checker stops at 'The Java version of the type checker is gone now.' (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:229`)." The notes come to about 560 of 700.
- These pass: the dropped tokens (`:465` and `Shell.java:453-457` are re-pointed to `:467` and `:455-457`, both checked), Present, Reproducer `none` with the probe's absence stated, Status (NEGATIVE-VERIFIED beside `silent`, item 265), `siblings: 833`, and silent `choice`.

## Row 71 (keep): pass
The cited lines hold their words at the pin cc47b637d. No commit since touches them, and there is no signal.

## Row 74 (rewrite): FAIL
- These pass: Fidelity (`CompilerLibrary.fsi:161` is `ZZ32Addition`, `:178-179` the `BIG +` pair, `:181-182` the `BIG MAX` pair, and `library_tests/BigSumRung8.test` exists), Nothing lost (`40216550c` and the rung8 report go to the history, row 74; `:180-181` is re-pointed), Present, Status and Form.
- **Cold read.** The passage "the open part is the generator tower" names a concept that the line does not define. The reader could not resolve "the generator tower" or "user-declared reductions" (two readings). A worker would stumble on it too.
- **Correction.** In the notes, replace "the open part is the generator tower." with "open: a `BIG` operator over `Generator[\T\]` at any `T`, and a reduction object that a program declares at its own element type." The notes come to 646 of 700.

## Row 314 (keep): pass
`CompilerLibrary.fsi:45-58` and `:36` hold the declarations the notes list. `ladder.tsv:315-318` holds the four `objectCC_*mutVar*` refusals. The later commits to the file touch other members.

## Row 331 (rewrite): pass
`CompilerLibrary.fsi:221-234` holds `Maybe` with `coerce(_: Nothing)`, `NothingObject[\T\]` and `value object Nothing end`. `tests/ExceptionScoping.fss` and `tests/oddJuxt.fss` exist, and the dropped `:223-236` is re-pointed. The cold read's "corpus" and the bare `oddJuxt.fss` resolve (mech finds the path), so nothing blocks a worker.

## Row 332 (rewrite): pass
- `FortressLibrary.fss:1628-1638` is `value trait Maybe[\T\]` with `SQCAP`, `|self|`, `[i]`, `map` and `ivmap`, and no `isNothing` (none in `FortressLibrary.fss` or `.fsi`).
- `:1643` is `Just`'s `holds() = true`, and `:1673` is `Nothing`'s `holds() = false`.
- `CompilerLibrary.fsi:224` is `getter isNothing(): Boolean`, and `CompilerLibrary.fss:529` is its body.
- `MaybeRungM.fss` and `.test` exist.
- The dropped `.fss:531`, `:1506`, `:1536`, `:226` and `:1493-1501` are all re-pointed.

## Row 339 (rewrite): FAIL
- **Fidelity.** `NamingCzar.java:1212` is right: the snowman in `makeAnArrowDescriptor`'s empty branch. But `:1304-1305` is the header of `makeBoxedTupleName` and its `isVoidType` test, and the `return Naming.SNOWMAN;` for `()` is at `:1306`. Correction: "`:1304-1305`" becomes "`:1305-1306`".
- **Cold read.** "a dispatched generic arm too" and "Run right: a parameter not of type `T`; walk." were unresolved. Workers would also stumble on them. The REPORT gives the first as `over(())`, dispatch to a generic overload. Corrections:
  - In the claim, "a dispatched generic arm too" becomes "also when dispatch picks a generic overload". The claim comes to 258 of 300.
  - In the notes, "Run right: a parameter not of type `T`; walk." becomes "Workaround: a parameter not of type `T`, or walk." The notes come to about 669 of 700.
- These pass:
  - The new claim `h[\T\](x: T)` called as `h(())`: the REPORT's table row "`id` at `()`, I" dies AME under the bound `Any`, the compile command's bound now.
  - The dropped `Object` and `h[\()\](())`: their home is FACTS.md:25 ("`()` fails whatever the bound (row 339)", with written static arguments passing unchecked under row 470) and the history.
  - Reproducer `none`, with the program and REPORT given, `siblings: 832`, and the `InstantiatingClassloader` lines (the REPORT's `:604-605`, `:1009-1010`, `:1116`, `:1229`).

## Row 470 (keep): pass
The cited lines hold their words at d4d454f9d and are unchanged since. The refused notes of batches 12, 17 and 18 add nothing that the row and F-250 lack.

## Row 514 (rewrite): pass
`CompilerLibrary.fsi:171-172` holds the two `ZZ32` range operators only, and `XXXStridedRangeRungT.fss` and `.test` exist. The dropped `:173-174` is re-pointed, and the sibling 661 sentence is now in the notes.

## Row 604 (rewrite): FAIL
- **Fidelity.** "Calls with zero, five or six varargs arguments, the body's typing and the export check pass (`VarargsNoTrailingArgument`)" claims more than the cited test shows. `compiler_tests/VarargsNoTrailingArgument.fss` holds only `g(x: Any, y: Any, rest: Any...)` called as `g("a", "b")`, with zero varargs arguments. In the history (row 604), the five- and six-argument calls were the one library's `assert` calls in `Library/String.fss`, which at c124c6b65 are `:446-447` (five) and `:486` (six). Once the repair story was removed, nothing ties those counts to the one library. The cold read asked "why those counts; is one to four refused?"
- **Cold read.** The cold read could not resolve "red at the switch-over" (expected or required, and why) or "The specification keeps `HeapSequence`, with a box." Workers would stumble on both. The tests turn red because the VarRef rule refuses only while `traits.typeCons(immutableHeapSeqName)` is empty (`Misc.scala:633-635`), and the one library declares `trait ImmutableArray` (`Library/FortressLibrary.fsi:1486`).
- **Correction.** The new notes, 695 of 700: "siblings: 314. 'The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.', the `VarRef` rule (`scala_src/typechecker/impls/Misc.scala:629-640` at c124c6b65); it is bound at `ImmutableArray[\T, ZZ32\]` of the library in use (`staticenv/STypeEnv.scala:191-193`). A call with no varargs argument passes (`VarargsNoTrailingArgument`), as do the one library's `assert` calls with five and six (`Library/String.fss:446-447`, `:486`). Also `XXXVarargsParamNotItsElement`, `XXXVarargsContractUse`, `XXXVarargsFunctionExpressionUse`; all four go red at the switch-over, whose library declares `ImmutableArray`. Codegen: row 624. full text: history, row 604"
  - This drops "the body's typing and the export check" and the `HeapSequence` sentence. Their home is the history, row 604, whose full text holds both.
- These pass: Present (the repair story is gone), the citations `Misc.scala:629-640` and `STypeEnv.scala:191-193`, the reproducer `XXXVarargsBodyIterates.test` (`compile_err_contains` the refusal), Status, and the dropped `aa07efb31` and "climb batch 10, rung C" (their home is the history).

## Row 832 (rewrite): FAIL
- **Cold read.** The claim's "under the bound `Object` and the bound `Any` alike" and the notes' "The compile command's bound `Any` lets a tuple static argument reach it" were unresolved: what picks `Object`? Workers would stumble too. `fortress compile` now bounds an unbounded parameter by `Any` (FACTS.md:25, 1bc0a9083). The `Object` case survives only as `U extends Object` written: the REPORT, line 166, says `first` dies alike under the `Object` setting, and row 64 of the table says the tuple static argument is refused there.
- **Correction.**
  - The claim drops ", under the bound `Object` and the bound `Any` alike" and comes to 236.
  - The new notes, 700 of 700: "siblings: 339. Compiled and run (`explorations/perf-probes/bound-any-compiled/REPORT.md`): `object Box[\T\](x: T) first[\U\](y: (U, U)): U = do (a, c) = y; a end end`. It dies alike under `U extends Object`; under `Any`, `fortress compile`'s bound for an unbounded `U`, a tuple static argument reaches it: `b.wrap[\(ZZ32,ZZ32)\]((2, 3))` for `wrap[\U\](y: U)` dies alike. `receiverPrependedDomainType` (`compiler/codegen/CodeGen.java:6529-6542` at c124c6b65) prepends the receiver to a tuple domain's elements, so cannot tell one tuple-typed parameter from several. The call casts to a three-place arrow, the loader makes a two-place closure. Workaround: two parameters, as `second[\U\](y: U, z: U)`."
- These pass: `CodeGen.java:6529-6542` is `receiverPrependedDomainType`, reproducer `none` with the program, and `siblings: 339`. The team's comment, dropped from the history line, now reads at `:6531-6533`, which is the cited range.

## Row 833 (rewrite): FAIL
- These pass:
  - `Shell.java:422-424` is walk's `useInterpreterLibraries(); setScala(false);`, and walk calls no `setTypeChecking`.
  - `:1277` is the default `false`, and `StaticChecker.java:229` is the throw.
  - `git grep -l CoercionInvocation c124c6b65 -- ProjectFortress/src/com/sun/fortress/interpreter` is empty.
  - The dropped tokens are re-pointed, and `siblings: 69` is set.
  - The F-9 signal states the gap; it is not a fix.
- **Cold read.** "The reproducer is walk's run-time choice, P-59's limit until then" was unresolved (what the test asserts, and what P-59's limit is). Workers would stumble too. `tests/XXXCoercionStaticRungC.fss` asserts `f(c) = 3` for `c: C = D`, where `D extends {B, C}` and `C` coerces to `A`. Walk dispatches `f(B)`. P-59 is "walk chooses a coercion by the run-time value until it runs the checker".
- **Correction.**
  - Replace that sentence with "The reproducer: walk calls `f(B)` for `c: C = D`, not the static coercion's `f(A)` (P-59's limit)."
  - To fit, cut "its default" from "leaves `fortress.compile.typecheck` false, its default (". The notes come to about 688 of 700.

## Closes, duplicates, questions, pairs
None written. `questions.md` claims no measurement, and that is sound. Pairs: 339 and 832 are two defects joined by `siblings:`, and none is owed to the reconcile.
