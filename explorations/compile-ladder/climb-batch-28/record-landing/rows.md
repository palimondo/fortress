<!-- The record-landing workflow's evidence of the gap ledger: each row that 157323e51..d3cd65a81 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 82, 324, 896, 927
- rewritten: 349, 431, 466, 527, 928
- closed as FIXED: 502, 733, 856, 858, 859, 895, 900, 901, 902, 926, 929
- opened: 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 82, noted

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: on the compiled path `spawn` yields a thread handle with no methods: `t.val()` fails with `No such method Thread[\IntLiteral\].val.`
- Reproducer: none
- Notes now: `object Thread[\T\](fcn:()->T)` is declared only in the interpreter's builtin (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:287`, `FortressBuiltin.fss:725`, at c124c6b65); neither `CompilerBuiltin` nor `CompilerLibrary` declares it. Under walk the probe prints `p32 42` (row 61). G12 of `explorations/compiled-path-gaps.md`. Probe `explorations/compiler-probes/p32.fss`, in the parent of `c69cb2064`. `Thread`'s four name `nativeHelpers/runtime` helpers (`val` over a private `valAny(): Any`), which walk answers with its glue (`NativeApp.java`, `OWN_OPERATIONS`); compiled, each raises `FailCalled` "spawn is not compiled yet" (`compiler_tests/RuntimeOwnOperationsCompiled`).
- The notes gained: `Thread`'s four name `nativeHelpers/runtime` helpers (`val` over a private `valAny(): Any`), which walk answers with its glue (`NativeApp.java`, `OWN_OPERATIONS`); compiled, each raises `FailCalled` "spawn is not compiled yet" (`compiler_tests/RuntimeOwnOperationsCompiled`).

## Row 324, noted

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a Fortress exception thrown out of an `atomic` block leaves the block's writes visible on the compiled path: `atomic do g := 7; throw Boom end`, caught and read, gives 7 compiled and 100 under walk, at one thread and at four
- Reproducer: none
- Notes now: Also for a local and an object. By reading, not measured: `CodeGen.forAtomicBlock` handles only `TransactionAbortException` (`CodeGen.java:1779-1782`), so an `FException` leaves without `BaseTask.cleanupTransaction`, and `Transaction.TXRead` returns an ancestral write (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:195-200,219-224`, at fe19fdad), which a later read finds; a second implicit thread reads it too (a child task takes its parent's transaction, `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:83-86`). An `exit` to an enclosing `label` keeps the writes (`atomic.tex`). Workaround: throw before the block. probes and full text: history, row 324
- The notes gained: By reading, not measured: `CodeGen.forAtomicBlock` handles only `TransactionAbortException` (`CodeGen.java:1779-1782`), so an `FException` leaves without `BaseTask.cleanupTransaction`, and `Transaction.TXRead` returns an ancestral write (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:195-200,219-224`, at fe19fdad),; they lost: The mechanism, by reading, not measured: `CodeGen.forAtomicBlock` handles only `TransactionAbortException` (`CodeGen.java:1742-1745`), so an `FException` leaves without `BaseTask.cleanupTransaction`, and `Transaction.TXRead` returns an ancestral write (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:144-149,159-168`),

## Row 349, rewritten (claim, notes)

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: compiled, the prelude has 8 of the 25 checked getters that `basic-integers.tex` states, none on `ZZ`, no `big`, and no `narrow`, `widen`, `signed` or `unsigned` that returns its argument, so `.asZZ32` of a `ZZ`, which walk answers, is refused
- Claim at the base: compiled, the prelude declares no `widen` on `ZZ64` and neither `widen` nor `narrow` on `ZZ`, so `widen` of a `ZZ64` and `narrow` of a `ZZ`, which `walk` answers, are refused; `narrow` of a `ZZ32` 43 compiles by coercion and gives 43 on both paths
- Reproducer: `ProjectFortress/compiler_tests/XXXZZNarrowRungP.test`
- Notes now: siblings: 442. The 8: `asZZ32` of `ZZ32` and `ZZ64`, `asNN32` of `NN32`, `asNN64` of `NN64`, `asZZ` of the fixed widths (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:150-152`, `:206-207`, `:212-214`, `:269-270`, `:275-277`, `:328-329`, `:335-337`, `:386-387`, at 157323e51); its `trait ZZ` (`:103-145`) has no conversion out. The test compiles `z.asZZ32` of a `ZZ` and is refused: 'ZZ has no getter called asZZ32'. `narrow` of a `ZZ32` 43 compiles by coercion through `ZZ64`'s `coerce(x: ZZ32)` (`CompilerBuiltin.fss:580`) and gives 43. Closes at the switch-over (P-37).
- The notes gained: 442. The 8: `asZZ32` of `ZZ32` and `ZZ64`, `asNN32` of `NN32`, `asNN64` of `NN64`, `asZZ` of the fixed widths (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:150-152`, `:206-207`, `:212-214`, `:269-270`, `:275-277`, `:328-329`, `:335-337`, `:386-387`, at 157323e51); its `trait ZZ` (`:103-145`) has no conversion out. The test compiles `z.asZZ32` of a `ZZ` and is refused: 'ZZ has no getter called asZZ32'. `narrow` of a `ZZ32` 43 compiles by coercion through `ZZ64`'s `coerce(x: ZZ32)` (`CompilerBuiltin.fss:580`) and gives 43. Closes at the switch-over (P-37).; they lost: 442, 502, 859. Walk has `widen` on `ZZ64` and both on `ZZ` (`Library/FortressLibrary.fsi:646`, `:698-699`, at de6d905f5); the prelude's `trait ZZ` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-145`) has neither, its `trait ZZ64` (`:147-208`) only `narrow`. `narrow` of a `ZZ32` goes through `ZZ64`'s `coerce(x: ZZ32)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:580`). P-161 (n...

## Row 431, rewritten (claim, notes)

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: library bug (library).
- Claim: `genZZ.perturb` in `Library/QuickCheck.fss` recurses on its argument shifted left by 32 where peeling 32 bits at a time needs a right shift, so only a large `ZZ`'s low 32 bits reach the generator, and one outside `ZZ64` raises: under walk it answers 2^40+7 and 2^50+7 alike, and raises at 2^70+7
- Claim at the base: `genZZ.perturb` in `Library/QuickCheck.fss` recurses on its argument shifted left by 32 where peeling 32 bits at a time needs a right shift, so only a large `ZZ`'s low 32 bits reach the generator: under walk a random function of a `ZZ` answers 2^40+7, 2^50+7 and 2^70+7 alike
- Reproducer: none
- Notes now: `Library/QuickCheck.fss:322` is `perturb(big(obj.asZZ64 LSHIFT 32), ...)`, which stays within 64 bits and ends; the team's `obj LSHIFT 32` never ends on a `BigNum` (`OutOfMemoryError` in `ReflectiveQuickCheckTest`). Probe of `explorations/reviews/quickcheck-widen.md`, 7.3, with a `catch`: '2^40 + 7: 1001751898', '2^50 + 7: 1001751898', '2^70 + 7: IntegerOverflow'. No test sees it: `genZZ.generate` makes no value beyond 64 bits under walk (row 387). Fix: `perturb(obj RSHIFT 32, ...)`, which changes every QuickCheck test's generated data. full text: history, row 431
- The notes gained: is `perturb(big(obj.asZZ64 LSHIFT 32), ...)`, which stays within 64 bits and ends; the team's `obj LSHIFT 32` never ends on a `BigNum` (`OutOfMemoryError` in `ReflectiveQuickCheckTest`). Probe of `explorations/reviews/quickcheck-widen.md`, 7.3, with a `catch`: '2^40 + 7: 1001751898', '2^50 + 7: 1001751898', '2^70 + 7: IntegerOverflow'.; they lost: (at de6d905f5) is `perturb(big(widen(obj) LSHIFT 32), ...)`, which stays within 64 bits and ends; the team's `obj LSHIFT 32`, with no `widen`, never ends on a `BigNum` (`OutOfMemoryError` in `BigInteger.shiftLeft` in `ReflectiveQuickCheckTest`). Measured by probes since removed: `explorations/reviews/quickcheck-widen.md`, sections 3 and 7.3.

## Row 466, rewritten (claim, reproducer, notes)

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: **a second initialization of an array element is silently ignored, and the element keeps its first value**: under walk `a = array[\ZZ32\](2).fill(3); a.fill(4)` leaves `3 3`, and an immutable array's second fill too; the compiled store's `init` keeps the first value as well
- Claim at the base: **under `walk`, a second initialization of an array element is silently ignored, and the element keeps its first value**: `a = array[\ZZ32\](2).fill(3); a.fill(4)` leaves `3 3`
- Reproducer: `ProjectFortress/tests/ArrayInitOnceWalk.fss`
- Notes now: `PrimitiveArray.init0` and `PrimImmutableArray.init0` discard the `Boolean` of `init00`, the store's `init` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:21-24`, `:31-34`, at fe19fdad); the team's comment: validating it fails for an element initialized in a failed transaction. `AtomicArray.init` and `FortressArrayStore.init` store into an empty element only. The specification allows one initialization; its footnote and the api (`Library/FortressLibrary.fsi:1551-1556`) say a duplicate signals an error. Fix: validate outside a transaction, or revise the footnote. Workaround: `a[i] := v`. full text: history, row 466
- The notes gained: and `PrimImmutableArray.init0` discard the `Boolean` of `init00`, the store's `init` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:21-24`, `:31-34`, at fe19fdad); the team's comment: validating it fails for an element initialized in a failed transaction. `AtomicArray.init` and `FortressArrayStore.init` store into an empty element only. The specification allows one initialization; its footnote and the api (`Library/FortressLibrary.fsi:1551-1556`) say a duplicate signals an error. Fix: validate outside a transaction, or revise the footnote. Workaround: `a[i] := v`.; they lost: discards the `Boolean` that `init00` returns (`ProjectFortress/LibraryBuiltin/NativeArray.fss:25-29` at c124c6b65): the team's comment says validating it fails for an element initialized in a failed transaction. The specification allows at most one initialization; its footnote says the present implementation signals a fatal error on a duplicate, which walk does not. Fix: validate outside a tran...

## Row 502, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, `widen` of a `ZZ` outside `ZZ64`'s range keeps the low 64 bits silently: `widen(2^64+5)` is `5` and `widen(-(2^63)-1)` is …
- Claim at the base: under walk, `widen` of a `ZZ` outside `ZZ64`'s range keeps the low 64 bits silently: `widen(2^64+5)` is `5` and `widen(-(2^63)-1)` is `9223372036854775807`
- Reproducer: `ProjectFortress/tests/IntegerConversionsWalk.fss`
- Notes now: fixed `45868b113`; full text: history, row 502
- The notes gained: fixed `45868b113`;; they lost: siblings: 349, 858. `ZZ`'s `widen` (`Library/FortressLibrary.fsi:699`) is the glue `BigNum$ToZZ64`, `x.longValue()` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:292-296`, at de6d905f5). P-161, not landed at de6d905f5, deletes `ZZ`'s `narrow` and `widen`; their callers move onto `.asZZ32` or `.asZZ64`, which raise `IntegerOverflow` where the value does not fit, and it...

## Row 527, rewritten (claim, class, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: under walk an array of a static size from 2^31 to 2^32-1 stops at its store's factory, where no catch sees it: `array1[\ZZ32, 3000000000\](7)` ends with 'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type Long' at `NativeArray.fss:16`
- Claim at the base: under walk an array of a static size from 2^31 to 2^32-1 dies with a raw `java.lang.NegativeArraySizeException`: `array1[\ZZ32, 3000000000\](7)` stops with `NegativeArraySizeException: -1294967296` from `AtomicArray.<init>` and no Fortress location
- Reproducer: none
- Notes now: Such a size is a `ZZ64` value (row 418), and `PrimitiveArray`'s field passes `s0` to `makeJavaArrayStore(n: ZZ32)` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:16`, at fe19fdad), which takes no `ZZ64`; `PrimImmutableArray` and `PrimImmutableRR64Array` likewise (`:28`, `:38`). Fix: refuse a size above 2147483647 with a Fortress error naming it, the refusal P-40 places with the array design. No gated test can tell such a stop from a refusal. Probe `explorations/compile-ladder/rung-size-range/probes/skeptic/SkArraySize.fss`, in the parent of `ab067d9b6`. full text: history, row 527
- The notes gained: `PrimitiveArray`'s field passes `s0` to `makeJavaArrayStore(n: ZZ32)` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:16`, at fe19fdad), which takes no `ZZ64`; `PrimImmutableArray` and `PrimImmutableRR64Array` likewise (`:28`, `:38`). Fix: refuse a size above 2147483647 with a Fortress error naming it, the refusal P-40 places with the array design. No gated test can tell such a stop; they lost: walk's array glue reads `s0` with `getInt()` (`PrimitiveArray.java:40`, `PrimImmutableArray.java:43`, `PrimImmutableRR64Array.java:36` in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`, at c124c6b65), where `FLong.getInt()` is `(int) val` (`FLong.java:23-26`). Fix: read `s0` as a `long` in the three `oneTimeInit` methods and raise a Fortress error naming a size above 2147483647,...

## Row 733, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator crashes, 'Not in the trait table: C', on an object whose first supertrait is an imported api's trait and whose later supertrait …
- Claim at the base: the code generator crashes, 'Not in the trait table: C', on an object whose first supertrait is an imported api's trait and whose later supertrait defines a method of a name that the api's trait declares, also where the two overload validly
- Reproducer: `ProjectFortress/compiler_tests/TraitTableApiTraitCompiled.test`
- Notes now: fixed `d839b7421`; full text: history, row 733
- The notes gained: fixed `d839b7421`; full text: history, row 733; they lost: siblings: 732. `dumpMethodChaining` compares the trait of each same-named method of the first supertrait with the body's trait (`typeAnalyzer.equiv`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1009` at c124c6b65), and the api trait's type is not in the code generator's trait table. Probe, run at 423958063 (`explorations/perf-probes/abstract-sibling-body/REPORT.md`, sect...

## Row 856, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: deliberate (library).
- Claim: on both paths, `signed` of an `NN32` or `NN64` above its signed half wraps to a negative value, with no `IntegerOverflow`: `signed(unsigned(-1))` is …
- Claim at the base: on both paths, `signed` of an `NN32` or `NN64` above its signed half wraps to a negative value, with no `IntegerOverflow`: `signed(unsigned(-1))` is `-1` on `NN32` and on `NN64`, and `signed` of the `NN32` 2^31 is `-2147483648`
- Reproducer: `ProjectFortress/tests/IntegerConversionsWalk.fss`
- Notes now: fixed `45868b113`; full text: history, row 856
- The notes gained: fixed `45868b113`;; they lost: siblings: 502, 858. The bindings (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:469`, `Library/FortressLibrary.fss:985`, at de6d905f5) name helpers that return their `int` or `long` as is (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:242`, `simpleUnsignedLongArith.java:246`). The prelude binds them too (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss...

## Row 858, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, `widen` of an `NN64` reaches `ZZ`'s `widen` by coercion and keeps the low 64 bits as a signed value: `widen` of the `NN64` 2^64-1 is the …
- Claim at the base: under walk, `widen` of an `NN64` reaches `ZZ`'s `widen` by coercion and keeps the low 64 bits as a signed value: `widen` of the `NN64` 2^64-1 is the `ZZ64` -1, with no `IntegerOverflow`
- Reproducer: `ProjectFortress/tests/IntegerConversionsWalk.fss`
- Notes now: fixed `45868b113`; full text: history, row 858
- The notes gained: fixed `45868b113`; full text: history, row 858; they lost: siblings: 502, 856. `NN64` declares no `widen` (`Library/FortressLibrary.fsi:489-534`); of the `widen`s only `ZZ`'s takes an `NN64`, through `ZZ`'s `coerce(x: NN64)` (`Library/FortressLibrary.fss:997-1000`), and its glue `BigNum$ToZZ64` is `x.longValue()` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:292-296`), at 1f5c49b4f. `bin/fortress RWidenNN64.fss`, the program...

## Row 859, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library bug (library).
- Claim: under walk, the one library's integer conversions are not declared on all five integer types, so a call on a type without the member goes by coercion …
- Claim at the base: under walk, the one library's integer conversions are not declared on all five integer types, so a call on a type without the member goes by coercion or fails: `unsigned` of an `NN32` answers an `NN64`, `narrow` of an `NN32` is an ambiguous coercion, `big` of an `NN64` or a `ZZ` finds no overload
- Reproducer: `ProjectFortress/tests/IntegerConversionsWalk.fss`
- Notes now: fixed `45868b113`; full text: history, row 859
- The notes gained: fixed `45868b113`; full text: history, row 859; they lost: siblings: 349, 502. `narrow` is on `ZZ32`, `ZZ64`, `NN64` and `ZZ`; `widen` on `ZZ32`, `ZZ64`, `NN32` and `ZZ`; `big` and `unsigned` on `ZZ32` and `ZZ64`; `signed` on `NN32` and `NN64` (`Library/FortressLibrary.fsi:532-533`, `:586-590`, `:645-648`, `:698-699`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:171-173`), at 1f5c49b4f. `bin/fortress` on `RUnsignedNN32.fss`, `RNarrowNN32.fss`, `...

## Row 895, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: checked against the interpreter's prelude, a binding that names any helper of `nativeHelpers/systemOps` stops its component with …
- Claim at the base: checked against the interpreter's prelude, a binding that names any helper of `nativeHelpers/systemOps` stops its component with 'FortressBuiltin.StringVector is undefined.': the checker reads the whole class, and `systemOps.getArgs` answers an `FStringVector`
- Reproducer: none
- Notes now: fixed `8ff5cb7ff`; Closed by climb batch 28's rung S (8ff5cb7ff): System's two strings name stringOps; the checker over System against the one library (WorldFlip -stop check Library/System.fss): '@@PROBE checkApi System -> errors=0', '### rc=0', against the base's 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.' (compile-ladder/plan-28/PROBES.md, probe 3).; full text: history, row 895
- The notes gained: fixed `8ff5cb7ff`; Closed by climb batch 28's rung S (8ff5cb7ff): System's two strings name stringOps; the checker over System against the one library (WorldFlip -stop check Library/System.fss): '@@PROBE checkApi System -> errors=0', '### rc=0', against the base's 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.' (compile-ladder/plan-28/PROBES.md, probe 3).; full text: history, row 895; they lost: siblings: 368. `getArgs` (`nativeHelpers/systemOps.java:29`, at 93884be8d); `NamingCzar` maps `FStringVector` to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:339-340`), which the interpreter's `FortressBuiltin` does not declare. Run before 93884be8d moved `lineSeparator` from `systemOps` to `stringOps`: the distance stage with `Library/FlatString.fss:25-26` naming `systemOps.lineSe...

## Row 896, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-BOUNDED. Class: implementation gap (runtime).
- Claim: under walk, `getProperty` at an empty name, `""` or an `EmptyString`, raises Java's `java.lang.IllegalArgumentException: key can't be empty`, which reaches the program as a Java exception, not as one of the library's exceptions
- Reproducer: none
- Notes now: `getProperty(name:FlatString, ...)` (`Library/System.fss:49`) names `stringOps.getProperty` (`nativeHelpers/stringOps.java:81-83`), whose `ProjectProperties.get` (`repository/ProjectProperties.java:207-208`) reaches Java's `System.getProperty` (`useful/StringMap.java:164`), which refuses an empty key; walk's loader rethrows a helper's `RuntimeException` as it is (`glue/StaticNativeApp.java:260-264`), at 157323e51. An `EmptyString` name reaches that binding through `asFlatString` (`Library/System.fss:50-54`), by reading. Run: `getProperty("", "?")` under `bin/fortress`: 'Wrapped exception java.lang.IllegalArgumentException: key can't be empty'. Workaround: test the name for emptiness.
- The notes gained: (`Library/System.fss:49`) names `stringOps.getProperty` (`nativeHelpers/stringOps.java:81-83`), whose `ProjectProperties.get` (`repository/ProjectProperties.java:207-208`) reaches Java's `System.getProperty` (`useful/StringMap.java:164`), which refuses an empty key; walk's loader rethrows a helper's `RuntimeException` as it is (`glue/StaticNativeApp.java:260-264`), at 157323e51. An `EmptyString` name reaches that binding through `asFlatString` (`Library/System.fss:50-54`), by reading. Run: `getProperty("", "?")` under `bin/fortress`: 'Wrapped exception java.lang.IllegalArgumentException: key can't be empty'.; they lost: (`Library/System.fss:51`) names `systemOps.getProperty` (`nativeHelpers/systemOps.java:20-21`), whose `ProjectProperties.get` (`repository/ProjectProperties.java:207-208`) reaches Java's `System.getProperty` (`useful/StringMap.java:164`), which refuses an empty key; walk's loader rethrows a helper's `RuntimeException` as it is (`glue/StaticNativeApp.java:252-257`), at 61f1c6a93, by reading. An...

## Row 900, closed as FIXED

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library bug (library).
- Claim: under walk, writing a rope (a string past 32 characters made by `\|\|`) to a `FileWriteStream` stops the run: "Unification error: Closure/Constructor …
- Claim at the base: under walk, writing a rope (a string past 32 characters made by `\|\|`) to a `FileWriteStream` stops the run: "Unification error: Closure/Constructor for writeOn param 1 (stream:WriteStream) got arg <Write handle to …> of type FileWriteStream", at `Library/File.fss:79`
- Reproducer: `ProjectFortress/tests/NativeHelperReaderWalk.fss`
- Notes now: fixed `71d1018d1`; full text: history, row 900
- The notes gained: fixed `71d1018d1`; full text: history, row 900; they lost: siblings: 901. `FileWriteStream` extends only `FileStream` (`Library/File.fsi:102`, `Library/File.fss:66`, at c141e7f6a), not `WriteStream`, so `write(x:String)`'s `x.writeOn(self)` (`Library/File.fss:79`) finds no `writeOn` that takes it. A flat string writes. `bin/fortress` on `o.write("a rope: abc…xyz" \|\| "ABC…XYZ\n")`: the error quoted, rc=1. Fix: extend `WriteStream`, a step that option...

## Row 901, closed as FIXED

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library bug (library).
- Claim: the one library's `FileWriteStream` has no `flush()`, though `Library/File.fsi:131` declares it: under walk `o.flush()` stops the run, "Cannot find …
- Claim at the base: the one library's `FileWriteStream` has no `flush()`, though `Library/File.fsi:131` declares it: under walk `o.flush()` stops the run, "Cannot find definition for method flush given receiver <Write handle to …>"
- Reproducer: `ProjectFortress/tests/NativeHelperReaderWalk.fss`
- Notes now: fixed `71d1018d1`; full text: history, row 901
- The notes gained: fixed `71d1018d1`; full text: history, row 901; they lost: siblings: 841, 900. `object FileWriteStream` in `Library/File.fss:66` declares no `flush`, at c141e7f6a; walk does not check a component against its api (row 841). Extending `WriteStream` (row 900) asks for it too: `abstract flush()`, `Library/Stream.fsi:64`. `bin/fortress` on `o = FileWriteStream("out"); o.write("x\n"); o.flush()`: the error quoted, rc=1. The writer rung of climb batch 27 left...

## Row 902, closed as FIXED

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, opening a missing file stops the run with an error that no `catch` sees: `FileReadStream("…/no-such-file.txt")` inside a `try` whose …
- Claim at the base: under walk, opening a missing file stops the run with an error that no `catch` sees: `FileReadStream("…/no-such-file.txt")` inside a `try` whose `catch` names `IOFailure` ends 'ProgramError: … FileNotFound: …', rc=1
- Reproducer: `ProjectFortress/tests/NativeHelperReaderWalk.fss`
- Notes now: fixed `71d1018d1`; full text: history, row 902
- The notes gained: fixed `71d1018d1`; full text: history, row 902; they lost: siblings: 903. The glue answers `error("FileNotFound: " + name)` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FileReadStream.java:43-44`, at c141e7f6a), a walk error, not a Fortress exception. `bin/fortress` on that `try`: 'FileNotFound: tmp/review-rows/no-such-file.txt', and 'after the try' never printed. The compiled helpers raise `fortress.CompilerBuiltin$FileNotFoundExceptio...

## Row 926, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: design limit (walk).
- Claim: under walk, no object of a `native component` can be a plain Fortress object: walk builds each one through a glue class of its name and evaluates its …
- Claim at the base: under walk, no object of a `native component` can be a plain Fortress object: walk builds each one through a glue class of its name and evaluates its fields once, without the object, so `FileWriteStream` cannot hold its Java writer in a field while `File` stays native
- Reproducer: `ProjectFortress/tests/NativeHelperReaderWalk.fss`
- Notes now: fixed `71d1018d1`; full text: history, row 926
- The notes gained: fixed `71d1018d1`; full text: history, row 926; they lost: `CUWrapper` builds every native component by `BuildNativeEnvironment` (`ProjectFortress/src/com/sun/fortress/interpreter/env/CUWrapper.java:122`), whose `forObjectDecl1` makes each object's constructor from the class `<package>.<Name>` (`interpreter/evaluator/BuildNativeEnvironment.java:99-150`); `NativeConstructor.initializeSelfEnv` evaluates the fields once per constructor (`interpreter/evalu...

## Row 927, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: a `Char` past U+FFFF written through a `Writer` keeps only its low 16 bits: under walk `w.write(char(128512))` to a file reads back as U+F600, on the glue before the writer moved and on `fileOps.jbwWriteChar` after
- Reproducer: XXXWriterCharSupplementaryWalk
- Notes now: siblings: 915. `jbwWriteChar` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java:100`) calls `FortressBufferedWriter.write(int)`, which calls `java.io.BufferedWriter.write(int)`, one 16-bit unit (`compiler/runtimeValues/FortressBufferedWriter.java:38-40`), at 85236bf98; the glue took `FChar.getString`, `String.valueOf((char) val)` (row 915). The old and the new code wrote the same bytes, 'ed 84 9e', for `stdOut.write(char(119070))` and to a file (probe `WriterOldNew.fss`). Workaround: write the character as a string literal. `jbwWriteChar` is now at `nativeHelpers/fileOps.java:105`, below the new `jbrStdIn`.
- The notes gained: `jbwWriteChar` is now at `nativeHelpers/fileOps.java:105`, below the new `jbrStdIn`.

## Row 928, rewritten (claim, notes)

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: design limit (library).
- Claim: under walk, a program's object that extends `JavaBufferedWriter` or `JavaBufferedReader` loads, and its first call of an inherited native method stops, since those are natives over a Java writer or reader and neither trait has a `comprises` clause to name its private native object
- Claim at the base: under walk, a program's object that extends `JavaBufferedWriter` loads, and its first call of an inherited `write`, `flush` or `close` stops, since those are natives over a Java writer and the trait has no `comprises` clause to name its private native object
- Reproducer: none
- Notes now: siblings: 551. Neither trait (`Library/FortressLibrary.fss:1983-2003`) has a `comprises` clause, unlike `ZZ32`'s `comprises { Int }`, since their native objects are private to `FortressBuiltin` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:807`, `:812`); the loader's `unbox` refuses any other value (`interpreter/glue/StaticNativeApp.java:296-303`). `object Fake extends JavaBufferedWriter end` with `Fake.write("x")`: 'No Java FortressBufferedWriter carries Fake'; over `JavaBufferedReader`, `Fake.readLine()`: 'No Java FortressBufferedReader carries Fake'; rc=1 each. Workaround: a program's own stream extends `WriteStream` or `ReadStream`.
- The notes gained: Neither trait (`Library/FortressLibrary.fss:1983-2003`) has a `comprises` clause, unlike `ZZ32`'s `comprises { Int }`, since their native objects are private to `FortressBuiltin` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:807`, `:812`); the loader's `unbox` refuses any other value (`interpreter/glue/StaticNativeApp.java:296-303`). `object Fake extends JavaBufferedWriter end` with `Fake.write("x")`: 'No Java FortressBufferedWriter carries Fake'; over `JavaBufferedReader`, `Fake.readLine()`: 'No Java FortressBufferedReader carries Fake'; rc=1 each. Workaround: a program's own stream extends `WriteStream` or `ReadStream`.; they lost: The trait (`Library/FortressLibrary.fss:1948-1957`) has no `comprises` clause, unlike `ZZ32`'s `comprises { Int }` (`Library/FortressLibrary.fsi:553`), since its native object `JavaBufferedWriterObject` is private to `FortressBuiltin` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:790`); the loader's `unbox` refuses any other value (`ProjectFortress/src/com/sun/fortress/interpreter/glue/S...

## Row 929, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker crashes, 'Comparison method violates its general contract!', at a call with 32 or more applicable candidates: it sorts them by …
- Claim at the base: the compiled checker crashes, 'Comparison method violates its general contract!', at a call with 32 or more applicable candidates: it sorts them by `moreSpecific`, a partial order, with `sortWith`, and Java's TimSort refuses some orders; on climb batch 27's tree, `x = -1` in `Char`'s `digit`
- Reproducer: `ProjectFortress/compiler_tests/PartialOrderCandidatesCompiled.test`
- Notes now: fixed `a3eba5067`; full text: history, row 929
- The notes gained: fixed `a3eba5067`; full text: history, row 929; they lost: siblings: `Functionals.scala:728`, `CoercionOracle.scala:255`, `Formula.scala:609`. `Functionals.scala:761`, at a2f0b5cf2: `Ordering.fromLessThan` reads incomparable candidates as equal, which is not transitive; TimSort checks only on 32 or more. `FortressBuiltin.fss:692` meets 33 candidates of `=`, 24 of them rung N's pairs; their order is the hash order of the overloadings' names (`ExprDisamb...

## Row 930, opened

- Section: 11. Parallelism, exceptions and control flow. Status: FIXED. Class: implementation gap (runtime).
- Claim: on the compiled path no `catch` sees a raise of `IOFailure` or `FileNotFoundException` by `fileOps` or a `FortressBuffered…` class: …
- Reproducer: `ProjectFortress/compiler_tests/FileOpsRaiseCaughtCompiled.test`
- Notes: fixed `70c26e3fd`; full text: history, row 930

## Row 931, opened

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: a character past U+FFFF in a file reads as two `Char`s, its 16-bit halves: under walk `FileReadStream`'s `readChar` on a file holding U+1F600 answers U+D83D, and `characters()` yields three characters for U+1F600 and a newline, on the glue before the reader moved and on `fileOps.jbrRead` after
- Reproducer: XXXReaderCharSupplementaryWalk
- Notes: siblings: 927, 912. `jbrRead` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java:45-47`) answers `FortressBufferedReader.read()`, which answers `java.io.BufferedReader.read()`, one 16-bit unit (`compiler/runtimeValues/FortressBufferedReader.java:55-70`), at c00f51c2; the glue's `readChar` did the same (`interpreter/glue/prim/FileReadStream.java:141-149`). A file of a, U+00E9, U+1F600: old and new `uncheckedReadChar` '97 233 55357 56832', `Reader`'s alike; the compiled `jbrRead` the same. Workaround: `readLine`, whose string keeps the pair.

## Row 932, opened

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: library bug (prelude).
- Claim: under walk, a subscript out of the bounds of a `PrimitiveArray` or a `PrimImmutableArray` ends the run with a raw `java.lang.ArrayIndexOutOfBoundsException`, which no catch sees: `array[\String\](2)[5]`, where a vector's subscript raises `FailCalled`
- Reproducer: none
- Notes: Their `opr [i:ZZ32]` and `opr [i:ZZ32] :=` call `get` and `put`, the api's unchecked indexing (`Library/FortressLibrary.fsi:1561`), not `offset` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:17`, `:19`, `:29`, at fe19fdad); `Array1`'s subscript checks in `offset` (`Library/FortressLibrary.fss:2535-2539`), as the api asks (`.fsi:1436`). At 157323e5 the immutable array's glue checked the index: 'Array index 7 out of bounds, length=3' at the subscript (`interpreter/glue/prim/PrimImmutableArray.java:64-70`). Fix: subscript through `offset(i)`. No gated test passes while the run dies: `array[\String\](2).fill("x")[5]` prints 'Index 5 out of bounds for length 2' at 157323e5 and fe19fdad.

## Row 933, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: on the compiled path, an `atomic` block that reads a variable that it wrote, then commits a nested `atomic` block and reads again, never ends: each attempt aborts at the second read and runs again
- Reproducer: none
- Notes: A read of the transaction's own write records that write in the read set (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:220-224`, at fe19fdad); the nested commit moves the global clock (`:306`, `:346`), so the next read validates against the committed value (`:247`) and aborts, and each retry repeats it; array elements share the path. The compiled run step has no timeout (`tests/unit_tests/FileTests.java:585`), so no gated test. `var x: ZZ32 = 0; var z: ZZ32 = 0` and `atomic do x := 2; y: ZZ32 = x; atomic do z := 1 end; w: ZZ32 = x end`, compiled, under `timeout 30`: exit 124 at 157323e5 and fe19fdad, one thread and four; without `y`, it ends.

## Row 934, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path an `atomic` block nested in another in one body hands its abort to the outer block's handler, which starts the outer block again inside its own old transaction, so that attempt's writes never commit: a parallel `for` of `atomic do atomic do d := d + 1 end end` loses updates
- Reproducer: none
- Notes: siblings: 888. `CodeGen.forAtomicBlock` writes its exception-table entry before it visits its body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1746`, at fe19fdad): `javap` lists the outer entry first over the inner range; its `cleanupTransaction` pops only the inner transaction (`runtimeSystem/BaseTask.java:203-212`), so the restarted block and the task's later blocks nest under the old one (by reading). Over 1#400, 23 runs at four threads: d 299 to 370, or an uncaught `TransactionAbortException` (2 runs at 157323e5, 4 at fe19fdad); 400 at one thread, and under walk at one and four. Workaround: the inner block in a function of its own, 400 in 10 runs of each code.

## Row 935, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker's order of a call's candidate declarations, which a tie among the most specific follows, is not a property of the program: one file at one path gets two orders from two builds of one commit at two tree paths, and from one build by a direct compile and through the harness
- Reproducer: none
- Notes: siblings: 543, 547, 929. At `157323e51`, at the rung's worktree path: of the generator's shuffles of `compiler_tests/PartialOrderCandidatesCompiled.fss`, 100, 110 and 114 of 100 to 115 stop the base build `/home/user/fortress-base28` (`old-fortress.sh compile`), 105, 106, 107, 122, 123 and 125 of 100 to 125 the worktree's build, none both. Under the base build, of shuffles 1 to 12 of `compiler_tests/TieAmongMostSpecificCompiled.fss`, 9 and 11 die by a direct compile and run, 7 through `old-fortress.sh junit`. The order is the hash order of the overloadings (`ExprDisambiguator.scala:870-874`); since row 929's fix a tie keeps the first minimal candidate in it (`Functionals.scala:831-836`).

## Row 936, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk's load check refuses two overloads on closed traits whose overlap declarations below both cover only through a further `comprises` clause: `f(x: P)` beside `f(x: Q)`, with `P comprises { X, Pv }`, `Q comprises { X, Qv }`, `X extends { P, Q } comprises { Xa, Xb }`, `f(x: Xa)` and `f(x: Xb)`
- Reproducer: `ProjectFortress/tests/XXXComprisesCoverNestedWalk.fss`
- Notes: siblings: 492, 539. At `157323e51` walk refuses it at load, 'first parameters x:[Q] and x:[P] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present', and loads it where `P` and `Q` list `Xa` and `Xb` themselves, or with `f(x: X)` declared: its cover cuts the overlap by the clauses of `P` and `Q` only (F-27). The compiled checker accepts the set, and the compiled run gives `f(Xa)`'s value for an `X` that holds an `Xa`, on the base's code and on rung K's.

## Row 937, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path `abort` in an `atomic` block nested in another reruns the outer block, whose first try's write stays: `o := o + 1` in the outer block, then an inner block that aborts before a deadline, gives `o` = 2 where walk gives 1, and a later read outside every block can end the run
- Reproducer: `ProjectFortress/compiler_tests/XXXNestedAtomicAbortCompiled.test`
- Notes: siblings: 888, 324, 934. By reading: `CodeGen.forAtomicBlock` writes its exception-table entry before its body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1746` at 157323e51), so the outer block's entry comes first over the inner block's range and takes its `TransactionAbortException`; `BaseTask.cleanupTransaction` pops one level (`runtimeSystem/BaseTask.java:203-212`), so the rerun nests under the outer block's live transaction. A conflict's abort in a nested transaction takes the same path. A probe with a later top-level block ended in `TransactionAbortException` from `TXRead` outside every block, at one thread and four.

## Row 938, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a spawned thread that completes abruptly never becomes ready: `wait()` and `val()` on `spawn do 1 DIV 0 end` spin forever, where `val` throws the deferred exception and `wait` returns
- Reproducer: none
- Notes: siblings: 61, 82. `SpawnTask.compute` sets `resultIsReady` only after `fcn.functionInvocation` returns (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/tasks/SpawnTask.java:30-39` at 157323e51), and `result()` and `waitForResult()` spin until it is set (`:56-68`), so a thrown exception leaves both spinning and `ready()` false. The section's note says deferred exceptions are not yet supported. No gated test can pass while the run spins. Probe: `h = spawn do 1 DIV 0 end; println("spawned"); h.wait()` printed `spawned` and nothing more until `timeout 60` stopped it, rc=124, on the base's code and on rung H's; `val()` in a `try` the same at one thread and four.

## Row 939, opened

- Section: 9. Arrays, vectors and matrices. Status: DUPLICATE. Class: library bug (prelude).
- Claim: under walk, a subscript outside a 0-based primitive array, a `PrimitiveArray` or a `PrimImmutableArray` such as `System`'s `args`, ends the run with …
- Reproducer: none
- Notes: duplicate of row 932; full text: history, row 939

## Row 940, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator stops, 'Not in the trait table: S', at a type assumption of an imported api's trait that declares the called method twice or more: a functional call whose arguments are all assumptions, as `tag(O asif S, "d" asif String)`, or a dotted call at an assumed receiver
- Reproducer: `ProjectFortress/compiler_tests/XXXAsIfApiTraitCompiled.test`
- Notes: siblings: 733, 941, 942. `methodsNamed` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6469` at 157323e51) gathers the assumed trait's methods with `STypesUtil.allMethodsNotIdenticallyCovered`, whose entries for the trait's own declarations lack the api; `removeIdenticallyCoveredMethods` compares two of one name (`STypesUtil.scala:1587`), and the trait table, over the component, does not find that name. A dotted call, `(O asif S).m("d" asif String)`, reaches it by `assumedReceiverCall` (`:6554`). With the trait local both compile. Walk prints `sd`. In the library, `SubString`'s `(self asif String) CMP (other asif String)` (`Library/String.fss:397`) stops so.

## Row 941, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED. Class: implementation gap (walk).
- Claim: under walk a call whose arguments are type assumptions stops with an internal error, 'has neither body nor def instanceof Method', where the assumed types choose an abstract functional method, as `tag(O asif S, "d" asif String)` with `S`'s `tag` abstract and the body in `O`
- Reproducer: none
- Notes: siblings: 940. Probe at 157323e51's walk: `trait S abstract tag(self, n: ZZ32): String; abstract tag(self, s: String): String end`, `object O extends S tag(self, n: ZZ32): String = "n"; tag(self, s: String): String = s end`, `run(): () = println(tag(O asif S, "d" asif String))`; `bin/fortress P.fss`: 'InterpreterBug ... ** bug! MethodClosure tag(self:S,s:FortressLibrary.String):FortressLibrary.String ... has neither body nor def instanceof Method', also with `S` in an imported api. The compiled path prints `d`. With `S`'s two methods given bodies walk runs `S`'s. The section does not say what such a call runs where the assumed types choose an abstract declaration. Mechanism not traced.

## Row 942, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator stops, 'Not in the trait table: B', on an object that declares a functional method beside one of its name that it inherits, with a body, from an imported api's trait, the two overloading validly, as `tag(self, n: ZZ32)` in `object O extends B` beside `B`'s `tag(self, s: String)`
- Reproducer: `ProjectFortress/compiler_tests/XXXApiTraitOverloadCompiled.test`
- Notes: siblings: 733, 732, 940. Stack: `TypeAnalyzer.typeCons` ← `OverloadingOracle.lteq` ← `OverloadSet.fLessSpecThanG` (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:532`) ← `OverloadSet.split` ← `CodeGen.generateTopLevelOverloads` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7168` at 157323e51) ← `forObjectDeclPrePass` (`:4677`), before `dumpMethodChaining`, so row 733's repair does not reach it; also with `B` a later supertrait. With the api's method abstract, or no method of that name in the object, it compiles. Walk prints each body. Mechanism past `typeCons` not traced.
