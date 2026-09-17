<!-- Rung 8 of coordinator/PLAN.md: the accumulator SUM, which the parser names "BIG +", in the compiler-world prelude, test-first.  Written 2026-09-17 by the worker that landed it. -->

# Rung 8: the accumulator `SUM`

Landed. Two declarations in `Library/CompilerLibrary.fsi` and two bodies in `Library/CompilerLibrary.fss`, four lines in all; no Java, no Scala, no `ant compileAll`, only the three library components from `CompilerLibrary` downwards rebuilt.

`ProjectFortress/library_tests/BigSumRung8` goes from two failures of two to `OK (2 tests)`. `ant testFast` is 1,393 tests over 47 suites with zero failures and zero errors, `LibraryJUTest` moving 67 to 69 for this rung's link and run; `ant testSystem` is 382 over four shards, all zero. Each count was grepped from the output.

The ladder's pass count stays at 81. The movement is the result: three of the four blocked files go from disambiguation into the checker and the fourth clears all eight of its `BIG +` sites, with nothing moving down. This is the same honest shape as rung 5.

## Why this name

The baseline the rung inherited was seven rungs stale, so the whole ladder was re-run on the current tree at `2027f519b` with the driver's own recipe, a private cache and a private `java.io.tmpdir` (`probes/ladder-at-head.tsv`, `probes/summary-at-head.txt`). It confirms the incremental accounting of rungs 3 to 7 exactly: 78 of 381 interpreter tests plus 3 of 29 `not_working_library_tests` pass, the 81 rung 7 claimed. Phases: parse 1, disambiguate 142, typecheck 130, codegen 20, link 5, run 5, pass 78.

The re-derived first-stop ranking is `ImmutableArray` 26, `LexicographicOrder` 20, `Array1` 7, `Char` 6, `Thread` 6, `Array` 5, `builtinPrimitive` 5, `Nothing` 4, `array1` 4, `BIG +` 4, `big` 3, `Array2` 3, `TryAtomicFailure` 3, `matrix` 3, `recordTime` 3.

Everything above `BIG +` was passed over for a reason that is not this rung's to settle. `ImmutableArray`, `Array1`, `Array`, `array1`, `Array2`, `matrix` and `array` are the array-representation fork, which `PLAN.md`'s stop conditions reserve. `LexicographicOrder` is `Library/List.fsi:67` and walks into the generic generator tower, which is the library-route fork, also reserved. `Char` is ledger row 18, type aliases (`IndexBuilder.scala:187` is a `bug()` call), and only two of its six files name `Char` themselves. `Thread` is six `Spawn` files with no `Spawn` visitor in `CodeGen` and no thread runtime on the compiled path. `builtinPrimitive` is ledger row 309 and three of its five files are `XXX` negatives. `Nothing` is the head of the commented-out `Maybe`/`Condition` protocol, ledger row 71 and step 2 of the plan, whose `Maybe` cascade reaches 50 files; supplying the bare name would clear nothing behind it. `TryAtomicFailure` is the dormant exception block plus transaction semantics codegen does not have.

On the typecheck side the clusters are `head of empty list` 11 (behind the array fork), the `VarType`/`TraitType`-to-`IntExp` `ClassCastException` 7 (ledger row 307, `nat` static parameters, step 1 of the map, a 200-300 line checker project) and `Missing parameter type` 5 (real parameter-type inference). The largest codegen refusal is `Can't compile ObjectExpr` at 5 files, which needs a visitor `CodeGen` does not have plus the object-expression scoping defects of ledger rows 127 and 128; `Can't compile LetFn`, the plan's named next codegen hole (ledger row 304), is 2 files today.

Four files for four lines of library, and every attention, softmax and loss term of `run-c4` and `apl/mg` is a reduction.

## The defect

This is gap-ledger row 74, "G4 — no `SUM`, no generic `BIG` operators, no user reductions", whose recorded symptom is verbatim the one measured here: `Operator BIG + is not defined.`, evidence `compiler-probes/p11.fss`.

The parser turns the source token `SUM` into the operator name `BIG +` (`ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:252-253`, `NodeFactory.makeOpBig`), and the reduction desugaring rewrites the bracketed form into a call to `__bigOperator` with that operator's nullary form as the reduction object. `Library/CompilerLibrary` declares no form of it, so four files of `ProjectFortress/tests/` stop in disambiguation.

## The edit

`Library/CompilerLibrary.fsi`, immediately above `opr BIG MAX` at `:178-179`:

    opr BIG +(): ReductionZZ32
    opr BIG +(g: GeneratorZZ32): ZZ32

`Library/CompilerLibrary.fss`, immediately above `opr BIG MAX` at `:477-478`:

    opr BIG +(): ReductionZZ32 = ZZ32Addition
    opr BIG +(g: GeneratorZZ32): ZZ32 = __bigOperator(ZZ32Addition, fn(r, b) => g.generate(r, b))

Nothing else was missing. `trait ReductionZZ32` is at `.fss:453`; the object `ZZ32Addition` with `empty() = 0` and `join(a, b) = a + b` is at `:463` and was declared and used by nothing; `__bigOperator` and `__generate` are at `:330-343`; the parallel and sequential `gen`/`seqgen` walks at `:383-420`; `Range` with `opr :` and `opr #` at `:445-446`; and `opr BIG MAX` at `:477-478` is the exact shape copied. `compiler_tests/Compiled18.fss` already drives the same desugaring end to end through a reduction it declares itself, so the mechanism is exercised by the gate today.

The collision check rung 5 had to learn was done before the edit: nothing under `compiler_tests/`, `other_compiler_tests/`, `library_tests/`, `not_working_*_tests/` or `test_library/` declares `BIG +` or `SUM`. `Compiled10.Comprehensions3` and `4` and `Compiled18` all use private names (`TESTSUM`, `TESTCOLON`, their own `BIG ||`).

## The test

`ProjectFortress/library_tests/BigSumRung8.fss` and `.test`, in the format of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`).

It pins both declared forms: the bracketed form over a generator, the same with a filter clause, the unary form applied to a generator directly, an empty generator whose answer must be the reduction's identity rather than a failure, and a body expression `(x + x)` so that a reduction that ignored its body would not pass. Every bound is computed at run time by `ten()` and `zero()` rather than written as a literal. It avoids `2 x` deliberately, so the rung is not entangled with `IntLiteral` coercion, which is rungs 6 and 7's ground.

Before the edit, `../bin/fortress junit library_tests/BigSumRung8.test` reports `Operator BIG + is not defined.` at all five `SUM` sites (`:52`, `:55`, `:58`, `:61`, `:64`) and gives `Tests run: 2, Failures: 2, Errors: 0` (`probes/junit-before.out`). After it, `OK (2 tests)` with `PASS` printed (`probes/junit-after.out`). The same source file also prints `PASS` under the interpreter, `../bin/fortress library_tests/BigSumRung8.fss`, so the rung's own test carries its differential check.

## What moves

The four blocked files were re-run with the ladder driver's private cache before and after the edit, `run-subset.sh` and `subset.txt` here, raw output in `raw-before/` and `raw/`, phases in `results-before.tsv` and `results.tsv`. None of the four compiles either way, so the pass count does not change; the first error does.

`restTest.fss`, `restTest2.fss` and `restTest2a.fss` go from disambiguate to typecheck. The name is gone and each now reports `Could not check call to operator BIG +`, neither `()->ReductionZZ32` nor `GeneratorZZ32->ZZ32` being applicable to an argument of type `ZZ32`, because their `SUM x` applies the accumulator to a vararg parameter `x:ZZ32...` which the checker presents as `ZZ32`. `restTest2` and `restTest2a` carry a second error of the same family, `Could not check call to function foo`, `ZZ32->ZZ32` not applicable to a five-element tuple of `IntLiteral`s. That vararg question is a rung of its own.

`simpleSum.fss` clears all eight of its `BIG +` sites but does not change phase: it still stops in disambiguation on `MOD`, on the `?` reported at its `DIVIDES` site, on `BIG juxtaposition` (`PROD`, three sites) and on `BIG MIN`.

`naiveSeq.fss` is untouched; its first stop was always `Variable partition is not defined.` and `BIG +` was only named later in the file.

## Deliberately not in the rung

`PROD` (`BIG juxtaposition`) and `BIG MIN`, which `simpleSum` also wants: each needs a new reduction object the prelude does not have, and no file in any gated corpus could reach a run through them, so no test would cover them.

The commented-out `opr BIG ||` at `CompilerLibrary.fss:474` and `.fsi:175-177`, which is one file in the ranking and a `String` reduction, a different trait.

The generic half of ledger row 74: `BIG` operators over `Generator[\T\]` and user-declared reductions at arbitrary element types. That is the generator tower and step 2 of the plan, and row 74 stays open for it.

## Records

Ledger row 74 is partly closed, the `SUM` half at `ZZ32` over `GeneratorZZ32`, and says so in its notes; no row is added. `FACTS.md` gains one line. `explorations/microgpt-run-c-handover.md` gains one sentence on its state paragraph.

No design fork was taken and no test was moved or deleted.
