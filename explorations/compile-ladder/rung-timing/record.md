<!-- Rung T of climb batch 1: the record lines for the coordinator to fold at merge time.
     Finished prose, ready to paste.  Nothing here edits FACTS.md, the ledger, PLAN.md,
     POSITIONS.md, INDEX.md or the handover; folding them is the coordinator's. -->

# Rung T: the record lines

## The FACTS.md line, ladder section

`recordTime` and `printTime` are in the compiler world's prelude (`Library/CompilerLibrary.fsi:250-255`, bodies and the stored time at `.fss:545-558`), over `__globalTimeInformation: RR64 := 0.0` — the first top-level mutable variable in that prelude, and the first library use of the transactional cell rung 3 and R1 made possible. The specification names none of `recordTime`, `printTime` or `nanoTime` anywhere, prose chapters and api renderings alike (`grep -rn` over `Specification/`, captured in `compile-ladder/rung-timing/probes/spec-grep.txt`), so the precedent is the interpreter's `Library/FortressLibrary.fss:4111-4118` and the deviations are argued in `compile-ladder/rung-timing/REPORT.md`. The compiler world's clock is `nanoTime(): RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:23`) where the interpreter's is `ZZ64`, so the elapsed interval is an `RR64` and `printTime` prints real milliseconds (`Operation took 341.574931ms`) where the interpreter rounds to a whole one (`Operation took 18ms`): the compiler world has no `RR64`-to-integer conversion and adding one would be a `.java` rung.

## The FACTS.md line, ladder pass count

`nestedTransactions1.fss`, `nestedTransactions2.fss` and `nestedTransactions4.fss` move from `disambiguate` to `pass` — compile and run clean with no `fail`/`FAIL` in the output, which is `compile-ladder/classify.py:21-22`'s criterion — measured with the restricted driver on a private ladder root before and after the edit (`compile-ladder/rung-timing/results-before.tsv` and `results.tsv`, raw output in `raw-before/` and `raw/`). They are this batch's first ladder passes. The coordinator's merge-time count should add three to the ladder's `pass` total and subtract three from `disambiguate`, subject to the full re-run.

## The ledger note

**Append to row 320** (a top-level variable exported through an api does not link). Do not renumber it and do not open a new row: this is the same defect in a second failure mode, and it corrects the row's closing sentence, which holds only of the shape the row probed.

Text to append to the "notes" column of row 320:

> Extended by rung T of climb batch 1 (2026-09-19). The row's `NoClassDefFoundError` is the failure when the api and the declaring component have *different* names, so that `NamingCzar.jvmClassForToplevelDecl(id, packageAndClassName)` on the importing component's package name names a class nobody emits. When the two names are the *same*, which is every prelude api's case, that class does exist and the run dies one step later, on the field: `NoSuchFieldError: Class fortress.CompilerLibrary$__globalTimeInformation does not have member field 'com.sun.fortress.compiler.runtimeValues.FRR64 ONLY'`. Measured by exporting `Library/CompilerLibrary`'s own stored time — `var __globalTimeInformation: RR64` in the api and `var __globalTimeInformation: RR64 = 0.0` in the component, the only spelling the checker accepts on both sides — and reading it from a second component (`compile-ladder/rung-timing/probes/ReadStoredTime.fss`, capture `probes/export-variable-3.txt`; `probes/export-variable.txt` and `-2.txt` are the two spellings the checker refuses first, "due to different mutabilities" and "due to different modifiers", which is `Specification/basic/components/source-code.tex:340-342` enforced). The mechanism is derived from two code sites, both read in the tree: `CodeGen.generateVarDeclInnerClass:5872-5906` gives a **mutable** top-level variable's singleton field the descriptor `NamingCzar.descFortressMutableFValueInternal` — R1's cell — and an immutable one the declared type's descriptor (`:5878-5881`); `CodeGen.forVarRef`'s fresh-import path `:5953-5971` always builds a plain `VarCodeGen.StaticBinding` with `tyDesc = NamingCzar.jvmTypeDesc(ty, thisApi())` (`:5966-5970`) and never consults the imported declaration's mutability, unlike `addTopLevelVarBinding:5934-5951`, whose branch at `:5945-5950` does. So the fix has two parts, not one: the class name, and the descriptor, which needs the fresh-import path to know the imported declaration's mutability and to emit a `MutableStaticBinding` when it is mutable. A repair that fixes only the class name would move the failure from one exception to the other. This matters for the batch that takes row 320: both target programs export a top-level variable from their api (`explorations/apl/mg/MicroGptApl.fsi:18`, `explorations/run-c4/src/MicroGptFlat.fsi:16`).

No new ledger row is claimed by this rung, so nothing is reserved from 329 on its account.

## The handover state line

Rung T landed: `recordTime` and `printTime` in `Library/CompilerLibrary`, 22 lines across the `.fsi` and `.fss`, no `.java`, gated by `ProjectFortress/library_tests/TimingRungT` (`Tests run: 2, Failures: 2` before, `OK (2 tests)` after). Three ladder files reach `pass`. Report and probes in `explorations/compile-ladder/rung-timing/`.

## The decisions to report to Pavol

Two, both taken because the specification is silent and both written up in REPORT.md under "The decisions".

**The rendering of the elapsed time.** `printTime` prints real milliseconds, `Operation took 341.574931ms`, where the interpreter prints whole ones, `Operation took 18ms`. The alternatives were: round as the interpreter does and print `3.0ms`, which throws the fraction away and still does not match; reach a true integer, which needs a new native and so a `.java` rung; or reach one by string surgery on `Double.toString`'s output, which breaks on scientific notation. The fraction is not noise — two of the four intervals this rung's own test measures are reported as `0ms` by the interpreter and as `0.001982ms` and `0.087981ms` by the compiled path. If Pavol would rather the two paths' timing lines read alike, the cost is a rounding helper in `simpleDoubleArith.java` and a `.java` slot in a later batch.

**The stored time is not exported.** It stays out of `CompilerLibrary.fsi`, as the interpreter keeps its own out of `FortressLibrary.fsi`. Exporting it is spellable and does not work; that is the row 320 addition above.

## What this rung did not touch

No `ant testFast`, no `ant testSystem`: the batch is gated once after the merge. No `.java`, no `.scala`, no `ant compileAll`. No file outside this worktree, and nothing under `explorations/coordinator/`.
