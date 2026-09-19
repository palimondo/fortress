<!-- Rung T of climb batch 1 (explorations/coordinator/CLIMB-BATCH-1.md, section T): recordTime and
     printTime in the compiler world's prelude, test-first.  Written 2026-09-19 by the worker that
     landed it.  One line per paragraph. -->

# Rung T: `recordTime` and `printTime`

problem: `ProjectFortress/tests/nestedTransactions1.fss:34` (`recordTime(6.0)`; `:36` `printTime(6.0)`), the same pair at `nestedTransactions2.fss:46,48` and `nestedTransactions4.fss:30,32`, each recorded as a disambiguation stop at `explorations/compile-ladder/ladder.tsv:305,306,308`.
spec: none — `grep -rn "recordTime\|printTime\|nanoTime" Specification/` finds nothing anywhere in the specification, prose chapters and api renderings alike (`probes/spec-grep.txt`).
precedent: `Library/FortressLibrary.fss:4111-4118` (the interpreter's `__globalTimeInformation: ZZ64 := 0`, `recordTime`, `printTime`), declared at `Library/FortressLibrary.fsi:2393-2394`.
deviation: the stored time and the elapsed interval are `RR64`, not `ZZ64`, because the compiler world's clock is `nanoTime(): RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:23`); the elapsed time is printed as a real number of milliseconds where the interpreter rounds to a whole one (`Library/FortressLibrary.fss:4117`), because the compiler world has no `RR64`-to-integer conversion; the message is built with `||` and not with juxtaposition, which inserts a space on the compiled path (`Library/CompilerLibrary.fss:95-96`); the initializer is `0.0` and not `0`, because `trait RR64` coerces from `FloatLiteral` and `RR32` only (`CompilerBuiltin.fsi:414-415`).

## What landed

Two declarations in `Library/CompilerLibrary.fsi:250-255` and, in `Library/CompilerLibrary.fss:545-558`, a top-level mutable variable and the two bodies over it. No `.java`, no `.scala`, no `ant compileAll`; only `CompilerLibrary`, `CompilerAlgebra` and `CompilerSystem` rebuilt, 25 s.

`ProjectFortress/library_tests/TimingRungT` goes from `Tests run: 2, Failures: 2` to `OK (2 tests)`.

`nestedTransactions1.fss`, `nestedTransactions2.fss` and `nestedTransactions4.fss` go from `disambiguate` to **`pass`**: all three compile (`crc=0`), run (`rrc=0`) and print no `fail`/`FAIL`, which is the ladder classifier's criterion for a pass (`explorations/compile-ladder/classify.py:21-22`). They are the batch's first ladder passes and the first three files this climb has moved all the way to `pass` since the baseline.

## Where this belongs

`explorations/coordinator/map/spec-to-implementation.md:133` fixes the compiler prelude as exactly `CompilerLibrary`, `CompilerBuiltin` and `AnyType`, selected by `compiler/WellKnownNames.java:113-126`, with `CompilerAlgebra` reached transitively; so a top-level function the compiler world lacks and that needs no native belongs in `Library/CompilerLibrary`, which is the file rung 8 added `BIG +` to for the same reason (`explorations/compile-ladder/rung8/REPORT.md`, "The edit").

`map/modules-and-phases.md:421-437` places the transaction machinery in `runtimeSystem/` and records that tasks and transactions are implemented twice and independently, so nothing here is shared with the interpreter's copy; the variable this rung declares is read and written through the compiled world's cell only.

The name is a plain top-level function, not a method or an operator, so there is no checker or codegen site to change: `map/spec-to-implementation.md:356` records that the prelude declares its own functions and operators and that codegen treats them as ordinary calls. The measured stop is `TypeDisambiguator`'s "Variable recordTime is not defined.", which is a missing declaration and not a missing visitor.

## Precedent search

**The interpreter's declaration, which is the only prior art for these two names.** `Library/FortressLibrary.fss:4108-4118`: `nanoTime():ZZ64` bound to `Long$NanoTime`, then `__globalTimeInformation: ZZ64 := 0`, `recordTime(dummy: Any): () = do __globalTimeInformation := nanoTime() end`, and a `printTime` that reads the clock, subtracts, re-records, and prints `(e+500000) DIV 1000000` whole milliseconds. The api exports the two functions and not the variable (`Library/FortressLibrary.fsi:2388-2394`).

**No dormant draft, and one dead copy.** Nothing in the live compiler world declares or comments out either name: `grep -rn "recordTime\|printTime\|__globalTimeInformation" --include=*.fss --include=*.fsi .` finds the interpreter's library, the four `nestedTransactions` files, six `demos/` programs, `Fortify/example/buffons.fss` — every one of those a *use* — and one further declaration, `CompilerLibrary/FortressLibrary.fsi:2384-2385` (`probes/name-grep.txt`). That last is in the top-level `CompilerLibrary/` directory, which is on no source path (`default_repository/configuration:44`) and referenced by no build file or source (`map/spec-to-implementation.md:135`, `map/modules-and-phases.md:510`); it is a verbatim copy of the interpreter's api, and it keeps `nanoTime():ZZ64` at `:2379`, so whoever wrote that stub would have kept the interpreter's integer clock. The live compiler world's `RR64` clock was decided later and only in `CompilerBuiltin`. So there is one live precedent, not several, and the question rung 3 got wrong — how many shapes does the team have for this, and which is right — has the answer "one, plus a dead copy that agrees with it".

**The shapes inside the file.** A top-level function whose parameter is ignored: `ignore(_: Any): () = ()`, `Library/CompilerLibrary.fss:36`. A message assembled from a string and a value: the comparing `assert`s at `:97-119`, which use `||` and `debugString`, under the file's own comment at `:95-96` — "The messages are built with `||` rather than with juxtaposition, which inserts a space on the compiled path". A section placed beside "Random numbers" (`.fss:536-543`, `.fsi:241-248`), mirroring the interpreter's grouping of `nanoTime`, `recordTime`/`printTime` and `random` under one "Numeric primitives" heading (`FortressLibrary.fss:4105-4127`).

**The revival's own rendering precedent, which the first pass of this search missed.** The two target programs already render an elapsed `nanoTime` and they do it by integer division, not as a real: eight sites, six as whole milliseconds — `explorations/apl/mg/MicroGptApl.fss:124`, `MicroGptAplCheck.fss:61`, `:67`, `explorations/run-c4/src/MicroGptFlat.fss:95`, `MicroGptFlatCheck.fss:59`, `:65` — and two as whole seconds, `MicroGptAplCheck.fss:97` and `MicroGptFlatCheck.fss:95`, each of the form `((nanoTime() - t0) DIV 1000000) " ms"`. That is the house convention and it agrees with the interpreter's `printTime` rather than with this rung's. It is a precedent for the **rendering** and not for these two names, which no revival file declares. One consequence the coordinator needs: those eight sites as written cannot compile on the compiled path whatever `printTime` does, because the compiler world's `nanoTime` returns `RR64` (`CompilerBuiltin.fsi:23`) and its `trait RR64` declares no `DIV` at all (`CompilerBuiltin.fsi:413-442` at the batch base; `:425-465` after rung F).

**The top-level mutable variable.** There is exactly one in each prelude and this rung writes the compiler world's: `grep -n "^[A-Za-z_][A-Za-z0-9_]*\s*:.*:=" ` over `Library/CompilerLibrary.fss`, `CompilerAlgebra.fss`, `CompilerSystem.fss`, `LibraryBuiltin/CompilerBuiltin.fss` and `AnyType.fss` finds only the line this rung adds, and the same grep over the interpreter's prelude finds only `FortressLibrary.fss:4111` (`probes/name-grep.txt`). It compiles at all because of rung 3 and R1: `CodeGen.forVarDeclPrePass`/`generateVarDeclInnerClass` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5872-5951`) emit a one-field singleton class per top-level declaration, and for a mutable one the field holds a `MutableFValue` cell so reads and writes go through the transaction (`VarCodeGen.MutableStaticBinding`, `VarCodeGen.java:310-399`).

## The specification

It is silent, and the grep is the evidence: `grep -rn "recordTime\|printTime\|nanoTime" Specification/` returns nothing at all — not in `basic/`, not in `basic-lib/`, not in `advanced/` or `advanced-lib/`, and not in the `library/apis/` renderings either (`probes/spec-grep.txt`). Timing is not a language feature; it is a library primitive the team added for its own benchmarks.

Two clauses of the specification do bear on the edit, and both were read in the tree.

`Specification/basic/traits.tex:181-183`: "every trait except `Any` and `Object` implicitly extends the trait `Object` if it does not do so explicitly". That is why a parameter of type `Any` accepts the arguments the corpus passes — `6.0` is a `FloatLiteral` (`CompilerBuiltin.fsi:448`) and `6` an `IntLiteral` (`:370`), and neither names `Object` in its `extends` clause.

`Specification/basic/components/source-code.tex:332-343`: an api's top-level variable declaration is satisfied by a component's declaration of the same name and type, and "the modifiers including the mutability of a variable must be the same in the exported and satisfying declarations". That governs the export question below.

Rule 4 of the brief applies in full here: the specification is silent, so this rung derives its behaviour and says so. The derivations are the two decisions.

## The edit

`Library/CompilerLibrary.fsi`, a new "Timing" section after "Random numbers":

    recordTime(dummy: Any): ()
    printTime(dummy: Any): ()

`Library/CompilerLibrary.fss`, in the same place:

    __globalTimeInformation: RR64 := 0.0

    recordTime(dummy: Any): () = do __globalTimeInformation := nanoTime() end

    printTime(dummy: Any): () = do
        r: RR64 = nanoTime()
        e: RR64 = r - __globalTimeInformation
        __globalTimeInformation := r
        println("Operation took " || (e / 1000000.0) || "ms")
      end

`nanoTime()` needs no import: `CompilerLibrary` already imports `CompilerBuiltin.{...}` (`.fss:17`), where it is declared at `.fsi:23` and bound at `.fss:335` to `jNanoTime`, which is `simpleDoubleArith.doubleNanoTime` (`.fss:211`), which is `(double)System.nanoTime()` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:72-74`). `opr ||` renders its right operand itself — `opr ||(self, b:Object): JavaString = jConcatenate(self, b.asString.asJavaString)` (`CompilerBuiltin.fss:415`) — and `RR64.asString` is `jDoubleToString`, that is `Double.toString` (`CompilerBuiltin.fss:859`, `simpleDoubleArith.java:16-18`), so no `debugString` call is needed.

## The decisions

### 1. The elapsed time is printed as a real number of milliseconds

The interpreter prints whole milliseconds, rounded to nearest: `secs: ZZ64 = (e+500000) DIV 1000000` (`FortressLibrary.fss:4117`). This rung prints `e / 1000000.0`, an `RR64`. Measured, walk prints `Operation took 18ms` for `nestedTransactions1.fss` and the compiled run prints `Operation took 341.574931ms` for the same program (`probes/walk.txt`, `raw/tests/nestedTransactions1.fss.run`). The two paths' timing lines therefore differ in rendering, and it is a decision, not an oversight.

The specification says nothing about either, so the question is what is right for the language given the compiler world's clock.

The alternatives, with what each costs. **(a)** Print the real milliseconds. **(b)** Keep the interpreter's rounding by computing `|\ (e + 500000.0) / 1000000.0 /|` — but `opr |\self/|` returns `RR64` (`CompilerBuiltin.fsi:437`), so the output would be `Operation took 3.0ms`: the same information as (a) with the fraction thrown away and a `.0` that the interpreter's output does not have either. **(c)** Get a real integer. **At the batch base this path could not**: `trait RR64` had no `asZZ32`/`asZZ64` getter where `ZZ64`, `ZZ32`, `IntLiteral` and `FloatLiteral` all have their conversions (`CompilerBuiltin.fsi:254`, `:371-376`, `:449-450`), `simpleDoubleArith.java` had no rounding helper, and adding one would have made this a `.java` rung, which batch rule 3 reserves to rung F. **But rung F is that rung, and it is in this batch**: `CLIMB-BATCH-1.md` section F charters `round` and `truncate` on `trait RR64`, its cited precedent returns `ZZ64` (`Library/FortressLibrary.fsi:332`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:188-191`), and if F lands them with `ZZ64` returns then after the merge (c) is a one-line library edit here — `round(e / 1000000.0)` — and not a `.java` slot in a later batch. So the cost of (c) is contingent on a rung of this same batch, and the report must not price it as a `.java` slot Pavol has to authorise. **(d)** Reach an integer by string surgery — `strToInt(ms.asString.upto('.'))` is spellable with what exists (`CompilerBuiltin.fsi:94`, `:46`) and is rejected: it breaks on `Double.toString`'s scientific notation and on `Infinity`, and it would put a parsing bug in a timer.

(a) was taken. **What it does at its extremes, measured**: `Double.toString` renders scientifically at `>= 1.0e7` and at any non-zero value `< 1.0e-3` (measured on this worktree's JDK 25, `probes/skeptic/double-boundary.txt`, source `DoubleToStringBoundary.java` beside it). So the chosen rendering prints `Operation took 1.0174680816587E7ms` for any interval at or above 2.78 hours — that exact line is a measurement, from a probe that called `printTime` with no preceding `recordTime` (`probes/skeptic/compiled.txt`) — and `9.99E-4ms` for any non-zero interval below 1000 ns, and `0.0ms` for exactly zero. The shortest interval actually measured here is 1338 ns, printing `0.001338ms`, and this rung's own test's shortest was 1982 ns, so nothing measured has yet fallen into the small-value regime. Scientific notation is thus a property of (a) as well as a cost of (d), and it is recorded here as one rather than only against the alternative that was rejected for it. That said, (a) is still the choice: it is the only one that neither invents a conversion nor discards what the clock gives, and the fraction is real precision rather than noise: the three `nestedTransactions` programs do so little work that the interpreter's rounding reports `0ms` for two of the four intervals this rung's own test measures, where the compiled path reports `0.001982ms` and `0.087981ms` (`probes/walk.txt` against `probes/junit-after.txt`). Its cost is that a program's timing line reads differently on the two paths, which no test can compare in any case, since the two paths take different times.

### 2. The stored time is not exported through `CompilerLibrary.fsi`

The interpreter does not export its variable either (`FortressLibrary.fsi:2388-2394` lists `nanoTime`, `printTaskTrace`, `recordTime` and `printTime` and no variable), so this follows the precedent; but the brief names ledger row 320 as the reason, and the reason turned out to be sharper than the row records. Three probes, each a full rebuild of the three library components:

`probes/export-variable.txt` — `__globalTimeInformation: RR64` in the api against `__globalTimeInformation: RR64 := 0.0` in the component is refused by the checker, "Unmatched declarations: {(__globalTimeInformation:RR64, due to different mutabilities)}", which is `source-code.tex:340-342` enforced.

`probes/export-variable-2.txt` — `var __globalTimeInformation: RR64` in the api against the same component declaration is refused too, "due to different modifiers": the component side must also be spelled `var`.

`probes/export-variable-3.txt` — `var __globalTimeInformation: RR64` in the api and `var __globalTimeInformation: RR64 = 0.0` in the component is the spelling the checker accepts. The library builds, a second component that reads the name compiles clean, and the run dies: `java.lang.NoSuchFieldError: Class fortress.CompilerLibrary$__globalTimeInformation does not have member field 'com.sun.fortress.compiler.runtimeValues.FRR64 ONLY'` (`probes/ReadStoredTime.fss`).

So the export is possible to write and does not work, which settles the decision. The alternative — export it, so that a program could read the recorded time — buys nothing any caller needs and would put a name in the prelude's api that cannot be read.

That third probe also earns an addition to row 320, below.

### 3. The parameter type is `Any`, and the corpus requires it

The interpreter writes `dummy: Any` and this rung copies it. That is not merely faithfulness: a narrower type does not work. `ProjectFortress/tests/nestedTransactions1.fss:34` passes `6.0`, `ProjectFortress/demos/mm.fss:211` passes `6` and `ProjectFortress/demos/sudoku.fss:90` passes `6.847`; `trait RR64` coerces from `FloatLiteral` and `RR32` only (`CompilerBuiltin.fsi:414-415`), so a parameter of type `RR64` would reject `recordTime(6)`. `Any` takes all three without a coercion, by `traits.tex:181-183`. The test passes both literal kinds for this reason.

## The test

`ProjectFortress/library_tests/TimingRungT.fss` and `.test`, in the format of `library_tests/Boolean.test`: `tests=`, `link`, `run`, and `run_out_contains=PASS` — not `run_out_WIcontains`, which `Boolean.test` and `PLAN.md` write and which the harness does not implement (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:147` checks `_contains`; an unknown key falls through to the default at `:266-270`).

It pins the two call shapes the corpus writes: the plain pair with a float-literal argument around work with a duration, and the pair around an `atomic do ... end` containing a `for` over a range with a nested `atomic`, with an integer-literal argument — the shape of `nestedTransactions1.fss:18-27`. A third pair calls `printTime` twice in a row, which exercises the re-record: the two reported intervals are `0.001982ms` and `0.087981ms`, so the second measured from the first `printTime` and not from the `recordTime` above it (`probes/junit-after.txt`).

The two timestamps it takes are deliberately left unannotated, and that is what makes the file its own differential: `nanoTime()` is `RR64` here and `ZZ64` in the interpreter, so a written type would tie the file to one world, while `t1 > t0` holds in both. The same file prints `PASS` under `../bin/fortress library_tests/TimingRungT.fss` (`probes/walk.txt`).

Every bound and every comparison operand is computed by a function rather than written as a literal (`zero()`, `one()`, `five()`, `thousand()`), so the test does not depend on integer-literal arithmetic, which is rungs 6 and 7's ground; and the work it times is a recursion rather than a loop over a shared accumulator, so it cannot race and its answer is exact at any thread count.

**The collision grep, before the edit and again after.** Nothing under `ProjectFortress/tests/`, `compiler_tests/`, `library_tests/`, `linker_tests/`, `not_working_*_tests/`, `other_compiler_tests/`, `parser_tests/`, `syntax_abstraction_tests/`, `obsolete_interpreter_tests/`, `test_library/` or `LibraryBuiltin/` declares `recordTime`, `printTime` or `__globalTimeInformation`; in `Library/` the only declarations are the interpreter's own and this rung's, and the only other declaration in the tree is the dead stub's; and nothing anywhere uses the name `TimingRungT` (`probes/name-grep.txt`). This is the check rung 1 lost a cycle to, and it costs seconds.

## The recorded failure and the recorded pass

Both captures are of the identical test text, taken in order in one scripted cycle, with this test's own cache entries deleted first so that nothing stale was linked (`tmp/recapture2.sh`, the trap `repo-internals.md` records and `CLIMB-BATCH-1.md` repeats).

`probes/junit-before.txt`, the library reverted to the batch base and the three components rebuilt: seven disambiguation errors — `Variable recordTime is not defined.` at `:54`, `:65`, `:77` and `Variable printTime is not defined.` at `:60`, `:71`, `:78`, `:79` — then `Failed to satisfy run_out_contains; expected PASS` and `Tests run: 2,  Failures: 2,  Errors: 0`.

`probes/junit-after.txt`, the edit restored and the same three components rebuilt: `Operation took 581.822329ms`, `Operation took 138.007975ms`, `Operation took 0.001982ms`, `Operation took 0.087981ms`, `PASS`, and `OK (2 tests)`.

## The ladder subset

The three files `CLIMB-BATCH-1.md` names for this rung, and no others: they are the only files in either ladder corpus whose recorded output names `recordTime` or `printTime` (`grep -rln` over `explorations/compile-ladder/after/raw/`). `nestedTransactions3.fss` uses the same pair but stops earlier, on `TryAtomicFailure` (`explorations/compile-ladder/ladder.tsv:307`), which is not this rung's name.

Run with the repair batch's restricted driver, copied here as `run-subset.sh` with `subset.txt`, retargeted to a private ladder root inside this worktree (`tmp/ladder-rung-timing`) so that no shared cache is touched.

Before: `results-before.tsv`, `raw-before/` — `crc=255` for all three, each reproducing its recorded first error exactly, two errors per file.

After: `results.tsv`, `raw/` — `crc=0 rrc=0` for all three, compile output empty, run output `Starting test` and one `Operation took ...ms` line each. The `assert(count, 25, "test1 failed")` and `assert(count,70,...)` inside them are silent, so the transactions counted right; the same three programs print the same lines under walk with the interpreter's rendering of the number (`probes/walk.txt`).

## The ledger row this rung earns

An addition to row 320, not a new row: it is the same defect — a top-level variable exported through an api does not link — in a second failure mode the row does not record, and row 320's closing sentence, "R1's change of the field's descriptor did not regress it", is true only of the shape the row probed.

Measured (`probes/export-variable-3.txt`): when the api and the declaring component have the *same* name, which is every prelude api's case, `NamingCzar.jvmClassForToplevelDecl(id, packageAndClassName)` on the importing component's package name lands on the class that does exist, so the run gets past row 320's `NoClassDefFoundError` and dies one step later on the field: `NoSuchFieldError: Class fortress.CompilerLibrary$__globalTimeInformation does not have member field 'com.sun.fortress.compiler.runtimeValues.FRR64 ONLY'`.

Derived from two code sites, both read in the tree. `CodeGen.generateVarDeclInnerClass:5872-5906` gives a *mutable* top-level variable's singleton field the descriptor `NamingCzar.descFortressMutableFValueInternal` — the cell — and an immutable one the declared type's descriptor (`:5878-5881`). `CodeGen.forVarRef`'s fresh-import path `:5953-5971` always builds a plain `VarCodeGen.StaticBinding` with `tyDesc = NamingCzar.jvmTypeDesc(ty, thisApi())` (`:5966-5970`) and never consults the imported declaration's mutability — unlike `addTopLevelVarBinding` twenty lines above it (`:5934-5951`, the branch at `:5945-5950`), which does branch on `lv.isMutable()` and picks `MutableStaticBinding`. So the reader asks for the declared type's descriptor and the emitted field has the cell's.

The fix therefore has two parts, not one: the class name (row 320's half) and the descriptor, which needs the fresh-import path to know the imported declaration's mutability and to emit a `MutableStaticBinding` when it is mutable. That matters for the next batch, where row 320 is the named `.java` candidate and both target programs export a top-level variable from their api (`explorations/apl/mg/MicroGptApl.fsi:18`, `explorations/run-c4/src/MicroGptFlat.fsi:16`); a repair that fixes only the name would move the failure from one exception to the other.

This rung does not repair it: it is a codegen rung in `.java`, batch rule 3 gives this batch's one `.java` slot to rung F, and nothing this rung lands needs it.

## What was not done

`ant testFast` and `ant testSystem` were not run: the batch is gated once after the merge.

The `RR64`/`ZZ64` split between the two worlds' `nanoTime` is recorded and not repaired, as `CLIMB-BATCH-1.md` section T directs. It is the root of decision 1 and of the test's unannotated timestamps.

No probe was written for `printTime` called with no preceding `recordTime`. Its behaviour follows from the initializer and matches the interpreter's: both report the whole interval since the clock's own origin, a large number in both worlds.
