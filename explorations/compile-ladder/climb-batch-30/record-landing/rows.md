<!-- The record-landing workflow's evidence of the gap ledger: each row that 9d0147ff9..f592b7c0f opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- rewritten: 322, 442
- closed as FIXED: 324, 497, 888, 933, 934, 937, 947, 949, 950, 951, 958, 967, 971, 974, 979
- noted: 466, 640, 948, 960
- opened: 980, 981, 982, 983, 984, 985, 986

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 322, rewritten (claim, spec, reproducer, notes)

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: an `atomic do … end` block or a `try … catch` as a call's argument after the first, where the arguments run in order, produces a class that fails verification on the compiled path: `VerifyError: Inconsistent stackmap frames at branch target 1`
- Claim at the base: an `atomic do … end` block as the trailing expression of a `do … also` arm produces a class that fails verification on the compiled path: `VerifyError: Inconsistent stackmap frames at branch target 5`
- Reproducer: `ProjectFortress/compiler_tests/XXXAtomicBlockLaterArgument.test`
- Notes now: siblings: 526. `CodeGen.forAtomicBlock` and `forTry` branch from a handler, which clears the operand stack, to a label reached with the earlier arguments on it (`compiler/codegen/CodeGen.java:1837-1865`, `:2154-2222`, at 728c0fde79), so each is right only on an empty stack. `two(k, atomic do … end)` and `two(k, try boomVal(k) catch e Boom => e.code end)` fail when the class loads. Not met in an arm of a `do … also`, nor in an argument that forks, which runs in a task on an empty stack (`compiler_tests/AtomicEndsArmCompiled`, `TryInArmRungG`). Walk is right. Workaround: bind the block's value in a statement of its own. full text: history, row 322
- The notes gained: `CodeGen.forAtomicBlock` and `forTry` branch from a handler, which clears the operand stack, to a label reached with the earlier arguments on it (`compiler/codegen/CodeGen.java:1837-1865`, `:2154-2222`, at 728c0fde79), so each is right only on an empty stack. `two(k, atomic do … end)` and `two(k, try boomVal(k) catch e Boom => e.code end)` fail when the class loads. Not met in an arm of a `do … also`, nor in an argument that forks, which runs in a task on an empty stack (`compiler_tests/AtomicEndsArmCompiled`, `TryInArmRungG`). Walk is right. Workaround: bind the block's value in a statement of its own.; they lost: `CodeGen.generateTaskCompute` keeps `this` on the operand stack across the arm's body for the result's `PUTFIELD` (`CodeGen.java:5028-5036`); `CodeGen.forAtomicBlock` branches from its handler, which clears the stack, back to `startOver`, its first label (`:1736-1764`). So `atomic` is right only on an empty stack: not as an arm's trailing expression nor as a call's argument after the first. A `...

## Row 324, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a Fortress exception thrown out of an `atomic` block leaves the block's writes visible on the compiled path: `atomic do g := 7; throw Boom end`, …
- Claim at the base: a Fortress exception thrown out of an `atomic` block leaves the block's writes visible on the compiled path: `atomic do g := 7; throw Boom end`, caught and read, gives 7 compiled and 100 under walk, at one thread and at four
- Reproducer: `ProjectFortress/compiler_tests/AtomicThrowRevertsCompiled.test`
- Notes now: fixed `594da4129`; full text: history, row 324
- The notes gained: fixed `594da4129`;; they lost: Also for a local and an object. By reading, not measured: `CodeGen.forAtomicBlock` handles only `TransactionAbortException` (`CodeGen.java:1779-1782`), so an `FException` leaves without `BaseTask.cleanupTransaction`, and `Transaction.TXRead` returns an ancestral write (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:195-200,219-224`, at fe19fdad), which a later read finds;...

## Row 442, rewritten (claim, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: the compiled path's prelude lacks conversions and operations the revised number chapters state: `ZZ32` values into `RR64`, `NN32` into `ZZ64`, `RR64`'s `check`/`check_star`, `/` on `ZZ32`, `^` on `ZZ64`, shifts, `GCD` and `LCM` on `NN32`/`NN64`
- Claim at the base: the compiled path's prelude lacks conversions and operations the revised number chapters state: `ZZ32` and integer numerals into `RR64`, `NN32` into `ZZ64`, `RR64`'s `check`/`check_star`, `/` on `ZZ32`, `^` on `ZZ64`, shifts, `GCD` and `LCM` on `NN32`/`NN64`
- Reproducer: `ProjectFortress/compiler_tests/XXXInferPromoteNN32.test`
- Notes now: siblings: 349. Closes at the switch-over (POSITIONS, "The library route."). `RR64` coerces from the two numeral types and `RR32` only, `RR32` from the two numeral types only, `ZZ64` from `NaturalNumeral` and `ZZ32` only (`LibraryBuiltin/CompilerBuiltin.fsi:401-404`, `:444-446`, `:147-149`): a `ZZ32` value where an `RR64` is expected is refused; write `i.asRR64`. `ZZ`, `ZZ64`, `NN64` lack `asRR64` and `asFloat`; `StandardTotalOrder` (`Library/CompilerAlgebra.fsi:16-22`) lacks `MIN`/`MAX`. Also gated: `XXXNNShiftRungP`, `XXXNNGcdLcmRungP`, `XXXMaxNN32IntoZZ64RungM`. full text: history, row 442
- The notes gained: the two numeral types and `RR32` only, `RR32` from the two numeral types only, `ZZ64` from `NaturalNumeral` and `ZZ32` only (`LibraryBuiltin/CompilerBuiltin.fsi:401-404`, `:444-446`, `:147-149`): a `ZZ32` value where an `RR64` is expected is refused; write `i.asRR64`.; they lost: `RadixPointNumeral` and `RR32` only, `ZZ64` from `NaturalNumeral` and `ZZ32` only (`LibraryBuiltin/CompilerBuiltin.fsi:401-403`, `:147-149`). Its numeral half differs by path: compiled, `r: RR64 = 3` is refused, and walk binds `3.0` through `FortressLibrary.fss:389`; `NumeralFoldFloats.fss:11` writes `16777217.0` for it.

## Row 466, noted

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: **a second initialization of an array element is silently ignored, and the element keeps its first value**: under walk `a = array[\ZZ32\](2).fill(3); a.fill(4)` leaves `3 3`, and an immutable array's too; so does the compiled `Object[]` store, while the two RR64 stores keep the second
- Reproducer: `ProjectFortress/tests/ArrayInitOnceWalk.fss`
- Notes now: `PrimitiveArray.init0` and `PrimImmutableArray.init0` discard the `Boolean` of `init00`, the store's init (`LibraryBuiltin/NativeArray.fss:21-24`, `:31-34` at fe19fdad), since, the team says, validation fails after a failed transaction's init. `AtomicArray.init` and `FortressArrayStore.init` store into an empty element only, also where two compiled transactions init one element: the read of the empty element is recorded, and the later commit aborts (`compiler/runtimeValues/ArrayStoreJUTest.java`). The api says a duplicate signals an error (`Library/FortressLibrary.fsi:1551-1556`). Workaround: `a[i] := v`. full text: history, row 466
- The notes gained: only, also where two compiled transactions init one element: the read of the empty element is recorded, and the later commit aborts (`compiler/runtimeValues/ArrayStoreJUTest.java`).; they lost: only; but two compiled transactions that init one empty element both succeed and the later wins, 935 to 988 of 1,000 rounds at f5aa647de, as `runtimeSystem/Transaction.java:227` records no empty read (parallelism review, N7).

## Row 497, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a local declared in a `do … also` arm takes local slot 0 of the task's `compute`, the slot of `this`, so a later read of a variable the arm captured …
- Claim at the base: a local declared in a `do … also` arm takes local slot 0 of the task's `compute`, the slot of `this`, so a later read of a variable the arm captured fails verification: `VerifyError: Bad type on operand stack`
- Reproducer: `ProjectFortress/compiler_tests/TaskArmLocalSlot.test`
- Notes now: fixed `76b21f498`; full text: history, row 497
- The notes gained: fixed `76b21f498`;; they lost: `CodeGen.generateTaskCompute` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5014`) never calls `mv.reserveSlot0()`, as `forFnExpr`'s `apply` does. Met by a local in an arm, by a local a nested `also` reads, and by a named `typecase` clause or a `catch` name in an arm (`XXXTryInArmRungG`, with row 322). Not met by a local function called from both arms, or calling itself f...

## Row 640, noted

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-BOUNDED. Class: implementation gap (runtime).
- Claim: on the compiled path at four threads, a 1,000-deep recursion whose operands are forked, `one() + countDown(n - one())`, overflows a worker thread's stack in 8 of 12 runs under the JVM's default 1 MB thread stacks; at one thread, or with `-Xss64m`, 12 of 12 pass
- Reproducer: `ProjectFortress/library_tests/TimingRungT.fss`
- Notes now: The test's run step with `FORTRESS_THREADS=4` and no `JAVA_FLAGS` (`bin/run`'s `-Xmx1536m`): `StackOverflowError` at `TimingRungT.fss:39` via `BaseTask.joinOrRun` (`runtimeSystem/BaseTask.java:190`) and `ForkJoinTask.join`. The frames per Fortress call were not measured. Workaround: `fastTrack` pins `JAVA_FLAGS` to `-Xmx4g -Xss64m` (`build.xml`, `840368f92`). `explorations/coordinator/process-engineering/build-efficiency.md` section 6.1. A call's arguments fork as an operator's operands do (`CodeGen.evalArg`), so `add(one(), countDown(n - 1))`, 1,000 deep, meets it: 'StackOverflowError' in 9 of 12 runs at four threads and default stacks, at 728c0fde79.
- The notes gained: (`runtimeSystem/BaseTask.java:190`) and `ForkJoinTask.join`. The frames per Fortress call were not measured. Workaround: `fastTrack` pins `JAVA_FLAGS` to `-Xmx4g -Xss64m` (`build.xml`, `840368f92`). `explorations/coordinator/process-engineering/build-efficiency.md` section 6.1. A call's arguments fork as an operator's operands do (`CodeGen.evalArg`), so `add(one(), countDown(n - 1))`, 1,000 deep, meets it: 'StackOverflowError' in 9 of 12 runs at four threads and default stacks, at 728c0fde79.; they lost: (`runtimeSystem/BaseTask.java:170`) and `ForkJoinTask.join`. The frames per Fortress call were not measured. Workaround: `fastTrack` pins `JAVA_FLAGS` to `-Xmx4g -Xss64m` (`build.xml`, `840368f92`). `explorations/coordinator/process-engineering/build-efficiency.md` section 6.1.

## Row 888, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path a `try` nested in another `try` in one body is matched against the outer `try`'s `catch` clause first: an exception that both …
- Claim at the base: on the compiled path a `try` nested in another `try` in one body is matched against the outer `try`'s `catch` clause first: an exception that both clauses take is caught by the outer one, and one that only the inner one takes leaves the body uncaught
- Reproducer: `ProjectFortress/compiler_tests/NestedTryInnerCatch.test`
- Notes now: fixed `594da4129`; full text: history, row 888
- The notes gained: fixed `594da4129`; full text: history, row 888; they lost: `CodeGen.forTry` writes its exception-table entry before it visits its body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2033` at c124c6b65), so the inner `try`'s entry comes after the outer one's over the same range, and the JVM takes the first entry that covers the throw. A compiled probe of the test's two functions printed `outer`, then ended with 'FortressException:...

## Row 933, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: on the compiled path, an `atomic` block that reads a variable that it wrote, then commits a nested `atomic` block and reads again, never ends: each …
- Claim at the base: on the compiled path, an `atomic` block that reads a variable that it wrote, then commits a nested `atomic` block and reads again, never ends: each attempt aborts at the second read and runs again
- Reproducer: `ProjectFortress/compiler_tests/AtomicOwnWriteNestedCompiled.test`
- Notes now: fixed `594da4129`; full text: history, row 933
- The notes gained: fixed `594da4129`; full text: history, row 933; they lost: A read of the transaction's own write records that write in the read set (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:220-224`, at fe19fdad); the nested commit moves the global clock (`:306`, `:346`), so the next read validates against the committed value (`:247`) and aborts, and each retry repeats it; array elements share the path. The compiled run step has no timeout...

## Row 934, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path an `atomic` block nested in another in one body hands its abort to the outer block's handler, which starts the outer block again …
- Claim at the base: on the compiled path an `atomic` block nested in another in one body hands its abort to the outer block's handler, which starts the outer block again inside its own old transaction, so that attempt's writes never commit: a parallel `for` of `atomic do atomic do d := d + 1 end end` loses updates
- Reproducer: `ProjectFortress/compiler_tests/AtomicNestedSameBodyCompiled.test`
- Notes now: fixed `594da4129`; full text: history, row 934
- The notes gained: fixed `594da4129`; full text: history, row 934; they lost: siblings: 888. `CodeGen.forAtomicBlock` writes its exception-table entry before it visits its body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1746`, at fe19fdad): `javap` lists the outer entry first over the inner range; its `cleanupTransaction` pops only the inner transaction (`runtimeSystem/BaseTask.java:203-212`), so the restarted block and the task's later blocks n...

## Row 937, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path `abort` in an `atomic` block nested in another reruns the outer block, whose first try's write stays: `o := o + 1` in the outer …
- Claim at the base: on the compiled path `abort` in an `atomic` block nested in another reruns the outer block, whose first try's write stays: `o := o + 1` in the outer block, then an inner block that aborts before a deadline, gives `o` = 2 where walk gives 1, and a later read outside every block can end the run
- Reproducer: `ProjectFortress/compiler_tests/NestedAtomicAbortCompiled.test`
- Notes now: fixed `594da4129`; full text: history, row 937
- The notes gained: fixed `594da4129`; full text: history, row 937; they lost: siblings: 888, 324, 934. By reading: `CodeGen.forAtomicBlock` writes its exception-table entry before its body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1746` at 157323e51), so the outer block's entry comes first over the inner block's range and takes its `TransactionAbortException`; `BaseTask.cleanupTransaction` pops one level (`runtimeSystem/BaseTask.java:203-212`),...

## Row 947, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path a `do … also` group whose first arm completes abruptly does not wait for its other arms: they run on after the group has …
- Claim at the base: on the compiled path a `do … also` group whose first arm completes abruptly does not wait for its other arms: they run on after the group has completed, so code after a `catch` around the group sees an arm's write arrive later
- Reproducer: `ProjectFortress/compiler_tests/AlsoArmThrowsJoinsCompiled.test`
- Notes now: fixed `76b21f498`; a try around a group in one function joins the arms with the exception-table order of 594da41299, and the test's last case asserts it; full text: history, row 947
- The notes gained: fixed `76b21f498`; a try around a group in one function joins the arms with the exception-table order of 594da41299, and the test's last case asserts it; full text: history, row 947; they lost: siblings: 322, 497. `CodeGen.genParallelExprs` forks arms 1 to n-1, runs arm 0 in place, then joins left to right on the normal path only (`compiler/codegen/CodeGen.java:1662-1712`, at f5aa647de), so a throw in arm 0, or a join that rethrows, skips the later joins. Probe: `do boomArm() also do slowArm() end` in a `try`, `slowArm` setting `flag := 1` after 0.2 s: 'after the catch: flag 0, a seco...

## Row 948, noted

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: on the compiled path an `atomic` block is not atomic with respect to writes made outside `atomic`: a block that reads `x` twice while another task assigns `x` without `atomic` sees two values in 2,405 to 2,994 of 3,000 blocks; under walk, 0 of 300
- Reproducer: none
- Notes now: A plain write is `MutableFValue.setValue`, a volatile store that neither takes nor moves the global sequence lock (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:83`), a read validates only when that lock has moved (`:235-236`), and a read-only commit returns unvalidated (`:304-305`). Walk's plain write aborts the cell's readers and writer (`interpreter/env/ReferenceCell.java:134-140`, `:166-171`). The program is outside the discipline of `basic/memory-model.tex`, "Programming Discipline"; atomic.tex's last paragraph still asks for atomicity. At 157323e5: 2,085 to 2,983 of 3,000.
- The notes gained: (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:83`), a read validates only when that lock has moved (`:235-236`), and a read-only commit returns unvalidated (`:304-305`).; they lost: (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:76`), a read validates only when that lock has moved (`:216`), and a read-only commit returns unvalidated (`:301`).

## Row 949, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: on the compiled path the implicit threads of one `atomic` block share its read set, a `Hashtable` that validation iterates unlocked, so a parallel …
- Claim at the base: on the compiled path the implicit threads of one `atomic` block share its read set, a `Hashtable` that validation iterates unlocked, so a parallel `for` inside a block dies with `ConcurrentModificationException` while another task commits
- Reproducer: `ProjectFortress/compiler_tests/AtomicSharedReadsCompiled.test`
- Notes now: fixed `594da4129`; full text: history, row 949
- The notes gained: fixed `594da4129`; full text: history, row 949; they lost: `TXValidateHelperTopLevelTransaction` iterates `reads.entrySet()` (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:243`) while a sibling's `TXReadLocation` puts into it (`:223`, `:228`); a read validates once the global lock has moved (`:216`). A child task takes its parent's transaction (`runtimeSystem/BaseTask.java:86`), as atomic.tex asks. Probe: 3,000 blocks of `for i <...

## Row 950, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: on the compiled path a nested `atomic` block validates only its own reads, so it can see a state that no commit made: the outer block reads `x`, its …
- Claim at the base: on the compiled path a nested `atomic` block validates only its own reads, so it can see a state that no commit made: the outer block reads `x`, its nested block reads `y`, other blocks change `x` and `y` together, and the nested block sees them differ
- Reproducer: `ProjectFortress/compiler_tests/AtomicNestedViewCompiled.test`
- Notes now: fixed `594da4129`; full text: history, row 950
- The notes gained: fixed `594da4129`; full text: history, row 950; they lost: `TXValidateHelperNestedTransaction` checks the nested transaction's reads against its ancestors' writes and the committed values, never the ancestors' reads (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:257-278`), and the read then takes a fresh snapshot (`:216-217`); the outer block aborts only at its own next validation, so the nested block computes, prints or throws o...

## Row 951, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path a call's arguments are evaluated in order, never forked, so a reduction runs its bodies one at a time: the prelude's `gen` passes …
- Claim at the base: on the compiled path a call's arguments are evaluated in order, never forked, so a reduction runs its bodies one at a time: the prelude's `gen` passes its two halves as one call's arguments; 64 slow `SUM` bodies run at most 1 at once where a parallel `for` runs 4
- Reproducer: `ProjectFortress/compiler_tests/CallArgumentsForkCompiled.test`
- Notes now: fixed `76b21f498`; the prelude's gen, which does not fork, is row 982; full text: history, row 951
- The notes gained: fixed `76b21f498`; the prelude's gen, which does not fork, is row 982; full text: history, row 951; they lost: `CodeGen.evalArg` evaluates a tuple argument's elements in order, under the team's comment 'Why isn't this parallel???' (`compiler/codegen/CodeGen.java:6935-6955`); `gen` differs from `seqgen` only there (`Library/CompilerLibrary.fss:381-414`), and the one library's ranges do the same (`Library/RangeInternals.fss:1320`), so after the switch-over every `SUM`, `DOT` and `BIG MAX` would too. P-175...

## Row 958, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk a float numeral to the left of an `RR32` operand runs `RR64`'s operator, not `RR32`'s, where the same numeral to the right runs `RR32`'s: …
- Claim at the base: under walk a float numeral to the left of an `RR32` operand runs `RR64`'s operator, not `RR32`'s, where the same numeral to the right runs `RR32`'s: for `a: RR32 = narrow(1.5)`, `2.5 + a` and `2.5 a` are `RR64`, `a + 2.5` and `a 2.5` are `RR32`
- Reproducer: `ProjectFortress/tests/NumeralLeftOfRR32Walk.fss`
- Notes now: fixed `f36a65124`; full text: history, row 958
- The notes gained: fixed `f36a65124`; full text: history, row 958; they lost: Both declarations apply by one coercion, the numeral into `RR32` or the `RR32` into `RR64`, and `RR32`'s is the more specific. Walk's candidate for `RR64`'s `+` has the self type `RR64 & Float`, the method's instance for the numeral's default, and walk's coercion-based specificity (`Coercions.noLessSpecific`) finds no coercion into an intersection, so the two tie and the tie reads the numerals...

## Row 960, noted

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: a numeral with a radix point loses all but one of its leading zeros before its four numbers are read: `00.5`'s digit count `n` is 2, where the Working Draft counts 3; an integer numeral keeps them, `007` has 3
- Reproducer: `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss`
- Notes now: `ExprFactory.makeFloatLiteralExpr` trims leading zeroes from the text it keeps (`nodes_util/ExprFactory.java:1640-1643`), and both paths count that text's digits (`nodes_util/NumeralNumbers.java`, `of`), so the checker's `n` and walk's both see 2; `makeIntLiteralExpr` trims none. Only a program's coercion that reads `n` sees it. The reproducer declares `Digits(count: ZZ32)` with a coercion over `RadixPointNumeral[\n, m, r, v\]` that answers `Digits(n.asZZ32)`, and asserts 3 for `00.5`: under walk it fails with 'a ZZ32: 2 =/= a ZZ32: 3'. It runs under walk only; the compiled path reads the same node.
- The notes gained: declares `Digits(count: ZZ32)` with a coercion over `RadixPointNumeral[\n, m, r, v\]` that answers `Digits(n.asZZ32)`, and asserts 3 for `00.5`: under walk it fails with 'a ZZ32: 2 =/= a ZZ32: 3'. It runs under walk only; the compiled path reads the same node.; they lost: reads the deleted getters `x.digits`, `x.fractionDigits`, `x.radix` and `x.digitValue`, so it fails for that reason and cannot show a repair. A new reproducer is owed, for the next batch that edits walk's numerals or the parser's float text: a program's coercion over `RadixPointNumeral[\n, m, r, v\]` that returns `n` for `00.5`, asserting 3.

## Row 967, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk a numeral that rounds to an infinity at a typed place of `RR32` or `RR64` converts to `Infinity` with no error: `wide: RR32 = …
- Claim at the base: under walk a numeral that rounds to an infinity at a typed place of `RR32` or `RR64` converts to `Infinity` with no error: `wide: RR32 = 340282356779733661637539395458142568448` prints `Infinity`, where the specification makes it a static error
- Reproducer: `ProjectFortress/tests/NumeralRoundsToInfinityWalk.fss`
- Notes now: fixed `f36a65124`; with a radix point, ProjectFortress/tests/NumeralPointRoundsToInfinityWalk.fss, the skeptic's fix; folded, NumeralFoldedRoundsToInfinityWalk.fss; full text: history, row 967
- The notes gained: fixed `f36a65124`; with a radix point, ProjectFortress/tests/NumeralPointRoundsToInfinityWalk.fss, the skeptic's fix; folded, NumeralFoldedRoundsToInfinityWalk.fss; full text: history, row 967; they lost: siblings: 325. Walk converts through the place type's coercion from the numeral type, which rounds by IEEE's rule in `simpleDoubleArith.numeralToFloat` and `numeralToDouble` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:268-290`); its range check covers the bounded integer types only (`interpreter/evaluator/values/Numerals.java`, `inRange`). The compiled checker re...

## Row 971, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: on the compiled path a numeral coercion whose body spawns a task fails its component class's load, `ClassCastException: Thread cannot be cast to …
- Claim at the base: on the compiled path a numeral coercion whose body spawns a task fails its component class's load, `ClassCastException: Thread cannot be cast to FortressTaskRunner`: an operator or an argument list over two calls of the program's own functions spawns, as `small(n) - small(m)` does
- Reproducer: `ProjectFortress/compiler_tests/NumeralCoercionSpawnCompiled.test`
- Notes now: fixed `f36a65124`; full text: history, row 971
- The notes gained: fixed `f36a65124`; full text: history, row 971; they lost: siblings: 313, 957. The parallelism analyzer spawns an operator over two calls of the program's own functions, and an argument list holding two (`compiler/codegen/ParallelismAnalyzer.java:44`, `:158-212`); each numeral coercion's method keeps them. `MainWrapper.main` loads the component class before it starts the task pool (`runtimeSystem/MainWrapper.java:61-64` at a2be3e9e1d), and `<clinit>` f...

## Row 974, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk a numeral type written as a type that an object or a trait extends, or as a static argument, loads and runs: `object O extends …
- Claim at the base: under walk a numeral type written as a type that an object or a trait extends, or as a static argument, loads and runs: `object O extends NaturalNumeral[\1, 10, 3\]` and `Wrap[\NaturalNumeral[\1, 10, 3\]\](3)` run, where the text makes each a static error (P-174)
- Reproducer: `ProjectFortress/tests/NumeralTypeWrittenWalk.fss`
- Notes now: fixed `f36a65124`; one test for each form: NumeralTypeExtendedWalk.fss and NumeralTypeStaticArgumentWalk.fss; a comprises clause is row 981; full text: history, row 974
- The notes gained: fixed `f36a65124`; one test for each form: NumeralTypeExtendedWalk.fss and NumeralTypeStaticArgumentWalk.fss; a comprises clause is row 981; full text: history, row 974; they lost: siblings: 893, 973. Walk has no static types (P-12): it refuses a numeral type only where a numeral meets it when a place runs, as a variable, a field or a declared return type of a numeral type ('Type mismatch binding 3', `tests/NumeralTypeNoValueWalk.fss`). The compiled checker refuses both forms, 'NaturalNumeral cannot be written in a program except as a parameter's type.' (`compiler_tests/L...

## Row 979, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: on the compiled path a numeral's place in an imported component whose coercion's body spawns a task hangs the program at four threads: the importing …
- Claim at the base: on the compiled path a numeral's place in an imported component whose coercion's body spawns a task hangs the program at four threads: the importing program's `made().s`, for `made(): Cell = 3` in the imported component, never returns in 5 of 6 runs, and passes at one thread
- Reproducer: `ProjectFortress/compiler_tests/NumeralCoercionSpawnImported.test`
- Notes now: fixed `f36a65124`; full text: history, row 979
- The notes gained: fixed `f36a65124`; full text: history, row 979; they lost: siblings: 971, 313. An imported component's class initializes at its first use, on a worker of the program's pool; its `<clinit>` fills each place (`compiler/codegen/CodeGen.java:7271-7307`) and forks the task (`runtimeSystem/BaseTask.java:136-144`); a worker that steals it calls a function of that class and waits on its initialization, while the initializer joins the task (`:170`). `timeout 8...

## Row 980, opened

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED. Class: design limit (specification).
- Claim: a numeral with a radix point that no place types and that rounds to an infinity at `RR64`, its default, is the `RR64` infinity on both paths, with no error: `x = 17976931348623157081...680.0`, of 309 digits before the point, prints `Infinity` under walk and compiled
- Reproducer: none
- Notes: siblings: 967, 325. The text makes such a numeral a static error at a place that fixes a type, and says of a place that fixes none only that it is converted into its default; an integer numeral there takes `ZZ`, and one with a radix point has only `RR64`. Walk makes the default in `Numerals.radixPoint` (`interpreter/evaluator/values/Numerals.java`), with no range check. Probe at 7b13e86f83: `bin/fortress PInf.fss`, and `fortress compile PInf.fss`, `fortress run PInf`, print `Infinity`. An operator's operand takes the default too: `(1.5 TIMES 10^400) + d` prints `Infinity`, and `e: RR64 = -1.5 TIMES 10^400` binds `-Infinity`, on both paths. Open: whether the default refuses it; the curator's.

## Row 981, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a numeral type written in a `comprises` clause loads and runs: `trait T comprises { NaturalNumeral[\1, 10, 3\] } end` runs, where the text makes it a static error (P-174) and walk refuses the same type in an `extends` clause or as a static argument at load
- Reproducer: `ProjectFortress/tests/XXXNumeralTypeComprisedWalk.fss`
- Notes: siblings: 974, 551. Walk's load check reads the types that a trait or an object extends and the static arguments (`interpreter/evaluator/BuildEnvironments.java`, `checkNumeralTypesWritten`), fork N3's two forms. The compiled checker refuses it, 'NaturalNumeral cannot be written in a program except as a parameter's type.' A numeral type as a variable's, a field's or a return type is refused under walk only when a numeral meets it (`tests/NumeralTypeNoValueWalk.fss`).

## Row 982, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: on the compiled path a reduction of the compiler's prelude runs its bodies one at a time: the parallelism analyzer skips every call written in the prelude's files, so the two halves that `gen` passes to `r.join` do not fork; 64 slow `SUM` bodies run at most 1 at once where a parallel `for` runs 4
- Reproducer: none
- Notes: siblings: 951. `ParallelismAnalyzer.for_RewriteFnAppOnly` returns where the node's printed form holds `CompilerLibrary` or `CompilerBuiltin` (`compiler/codegen/ParallelismAnalyzer.java:197-203`); a call prints as its span, '_RewriteFnApp at …/Library/CompilerLibrary.fss:387.16', so the test is of the source file's path, and a program under a path that holds either word forks no call either. `SUM[i <- 0#64] slow(i)`: 'SUM of 64 bodies: 2016, at most 1 at once; parallel for: at most 4 at once', 3 of 3 at four threads at ef9bc9d7cd. The same halves written in a program fork (`compiler_tests/CallArgumentsForkCompiled`). The specification allows either. Ends at the switch-over.

## Row 983, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: on the compiled path a task captures every variable in scope that is named as a static parameter in the type of a function its expression calls: `n`, `r` and `v` for every numeral, whose coercion is `coerce[\nat n, nat r, nat v\]`; the extra value is passed to the task and never read
- Reproducer: none
- Notes: siblings: 497. `FreeVariables.forId` collects the name of each `StaticParam` and `IntRef` in a `FnRef`'s arrow type (`compiler/codegen/FreeVariables.java:98`), and `CodeGen.getFreeVars` keeps each that names a variable in scope (`compiler/codegen/CodeGen.java:5126`). An instrumented copy printed 'PROBE Id r', 'forStaticParam', 'forTypeInfo', 'forArrowType', 'forFnRef' for the `1` of `up(k + 1)`. Where the name was the variable a binding declares, `r: ZZ32 = add(up(k), up(k + 1))`, the task read its slot before it was set, 'VerifyError: Bad local variable type'; repaired in `forLocalVarDecl` (`compiler_tests/LocalBindingForkedNumeralCompiled`). What remains costs a constructor argument.

## Row 984, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: on the compiled path a nested `atomic` block is not atomic with respect to a write that another thread of its outer block makes outside a nested block: a nested block that reads `u` twice while an arm of the outer block assigns `u` sees two values
- Reproducer: none
- Notes: siblings: 948. A write in the outer transaction is a put into its write set that moves no clock, a nested read takes the nearest ancestor's write as it is then, and a read validates only when the global lock has moved (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-248`, `:286-290` at 13c90e37e). Probe: an outer block with two arms, one calling 3,000 times `atomic do p: ZZ32 = u; q: ZZ32 = u; … end`, the other assigning `u := u + 1` 30,000 times: 'SAW u = 0 then 1355', 1, 0 and 186 such lines in three runs at four threads; walk 0 in two runs. No gated test: the race does not show in every run.

## Row 985, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk an `atomic` block does not answer at its commit for what a nested `atomic` block read: where the nested block reads `x` and the outer block then assigns `x`, the commits of other blocks on `x` in between are lost
- Reproducer: `ProjectFortress/tests/XXXAtomicNestedReadsKeptWalk.fss`
- Notes: By reading: a read records the reading transaction, the nested one (`ProjectFortress/src/com/sun/fortress/interpreter/env/ValueNode.java:66-68` at 13aeef114), and a writer aborts only active readers (`:98-99`), which a nested transaction that ended is not. 100 blocks `p = readX(); …; x := p + 1`, `readX()` an `atomic do x end`, beside 1,000 blocks `x := x + 1`: x = 109, 116 of 1,100 at four threads, 1,100 at one; also where the nested block writes, or throws and the outer block catches (103). With the read in the outer block: 1,100. The compiled path lost them at 9d0147ff9 (3,267 of 3,300) and keeps them (`compiler_tests/AtomicNestedReadsKeptCompiled.test`).

## Row 986, opened

- Section: 14. Contracts, tests and tools. Status: NEGATIVE-BOUNDED. Class: design limit (tests).
- Claim: the team demo `Generator2Demo` stops with `IntegerOverflow` on some of its random data: it draws 400 numbers from -5 to 4 and multiplies each prefix, so a run whose first fifty or so numbers hold no zero overflows; the 52 demos then reach 51 ends
- Reproducer: none
- Notes: siblings: 640. `ProjectFortress/demos/Generator2Demo.fss:62` fills `xit` with `\|\\random(10)-5/\|`, and `:121` takes `PROD` of each prefix; the team's arithmetic wrapped, the revival's raises. Seen once in the gather's run of the 52 demos on 594da41299, 'IntegerOverflow' at `Library/FortressLibrary.fss:3634` under 'Applying GGs to Array'; two more runs there and one on the base reached their end. Not the batch's: a walk program that takes `PROD[\Number\]` of a list of sixty `4`s stops with the same error at the same line on the base 9d0147ff9e and on 594da41299. By reading, a run fails where no zero is among the first fifty or so numbers, about one run in 200. Workaround: run it again.
