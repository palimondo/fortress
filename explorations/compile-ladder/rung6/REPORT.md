<!-- Rung 6 of coordinator/PLAN.md: the stubbed IntLiteral comparing family in the compiler-world prelude, test-first.  Written 2026-09-17 by the worker that landed it; the sections "Why asZZ64 and not asZZ" and "What this rung opened" were corrected and added the same day after review. -->

# Rung 6: the comparing operators of `IntLiteral`

Landed. Eight bodies in one file, no api change, no Java, no Scala, no `ant compileAll`; `ant testFast` and `ant testSystem` both at zero failures and zero errors; three of the seven blocked files go from a run-time throw to a clean run whose output is byte-identical to the interpreter's, which moves the ladder's pass count from 75 to 78. It also opens one new gap, ledger row 317, recorded and not repaired: on an integer literal the code generator has wrapped negative, the comparisons now answer the opposite of the interpreter where the stub used to throw.

This is the first rung whose files reach a run. Rungs 1 to 5 all moved files between compile phases; this one is past disambiguation, past the checker, past codegen and past the link, and the defect it closes is in the library's bodies rather than in its declarations.

## Why this name

The baseline's missing-name ranking is five times spent. Re-derived after rungs 1 to 5, with `//` removed, the head is `ImmutableArray` 26, `LexicographicOrder` 20, `head of empty list` 11, `Array1` 7, `Char` 6, `Thread` 6, `Array` 5, `builtinPrimitive` 5, `Missing parameter type` 5, `Can't compile ObjectExpr` 5, `BIG +` 4, `big` 3.

Every entry above 4 is behind a fork the plan reserves or behind a substantial feature, and each was checked rather than assumed; rung 5's report carries that derivation for all of them but `Char`.

`Char` is the largest clean one at 6 files and is not a library rung at all. The compiler world already carries the same entity under the name `Character` (`CompilerBuiltin.fsi:483-530`) and char literals type as `Character`, so the only honest shape is `type Char = Character`; type aliases are unimplemented, `IndexBuilder.scala:187` is `case d:TypeAlias => bug("Not yet implemented: " + d)`, which is ledger row 18. Of the six files only two name `Char` on their own; the other four reach it through interpreter-only apis (`File.fsi`, `FileSupport.fsi`, `FlatString.fsi`, `Stream.fsi`, `Format.fsi`) that carry `Maybe` and the generator tower behind them. None of the six could reach a run.

The cluster this rung takes does not appear in the missing-name ranking at all, because no name is missing. Seven files of `ProjectFortress/tests/` compile clean, link clean and then die in the same place: `fortress.CompilerBuiltin$IntLiteral$DefaultTraitMethods`, `CompilerFailureDetectedAtRunTime`. They are the files closest to passing anywhere on the ladder, and they are the only remaining cluster where a library edit reaches the run phase.

## The defect

A binding written without a declared type from an integer literal keeps the static type `IntLiteral` on the compile path. That is the same typing ledger row 79 records from the other side, where `typecase` reads it and gives a different answer than the interpreter.

The compiler world declares the whole operator family on `trait IntLiteral`, 33 declarations at `CompilerBuiltin.fsi:378-410`, and every body at `.fss:816-848` is `throw CompilerFailureDetectedAtRunTime`.

Because an applicable `IntLiteral` overload is therefore always found, coercion to `ZZ32` or `ZZ64` never runs, and the program reaches the throwing body. Declaring the family is what causes the failure; the stubs are not a fallback behind a coercion, they are in front of it. That is ledger row 80.

## Where the line goes, and why it is the interpreter's own line

`FortressBuiltin.fss:472-481` keeps the interpreter's `IntLiteral` comparing family live with real bodies over `cmp`, and `:483-525` comments out the arithmetic family under the note "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals."

The compiler world enabled the whole family as throwing stubs. This rung draws the interpreter's line in the compiler world and no further: bodies for the comparisons, nothing touched in the arithmetic.

`MIN` and `MAX` belong on the comparing side. The interpreter gets them for free because its `IntLiteral` extends `ZZ32`; the compiler world's extends `Number` and `Equality` only, so they need bodies of their own, and they can have them, because each returns one of its two operands and so needs no way to build a new `IntLiteral`. That is exactly what separates them from the arithmetic family, whose results are new values.

## The edit

Eight bodies in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, in `trait IntLiteral`, replacing eight `throw CompilerFailureDetectedAtRunTime`:

    opr <(self, other:IntLiteral): Boolean = self.asZZ64 < other.asZZ64
    opr <=(self, other:IntLiteral): Boolean = self.asZZ64 <= other.asZZ64
    opr >(self, other:IntLiteral): Boolean = self.asZZ64 > other.asZZ64
    opr >=(self, other:IntLiteral): Boolean = self.asZZ64 >= other.asZZ64
    opr =(self, other:IntLiteral): Boolean = self.asZZ64 = other.asZZ64
    opr =/=(self, other:IntLiteral): Boolean = self.asZZ64 =/= other.asZZ64
    opr MIN(self, other:IntLiteral): IntLiteral = if self <= other then self else other end
    opr MAX(self, other:IntLiteral): IntLiteral = if self <= other then other else self end

Nothing in `CompilerBuiltin.fsi`. The api already declares all eight; no call site changes type, and nothing can move down in the checker.

## Why `asZZ64` and not `asZZ`

`asZZ64` and not `asZZ32`, because a literal too large for `ZZ32` must still compare.

It is not the widest choice, and an earlier draft of this report said it was; that was wrong on both halves and is corrected here. The getters are `.fsi:371-376`, not `:379-384`, which are the unary and additive operator declarations; among them is `abstract getter asZZ(): ZZ` at `.fsi:374`. `FIntLiteral.asZZ()` is `FZZ.make(this.toString())` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java`), which loses nothing of what the code generator stored, and `trait ZZ` in the same `CompilerBuiltin.fss` (`:495`) carries the whole comparison family live over `BigInteger` -- `jAPLt`, `jAPLe`, `jAPGt`, `jAPGe`, `jAPEq`. So `asZZ` was available and is wider.

What `asZZ64` was actually taken for is that it is what the three passing files need and what the test pins, and that `ZZ`'s compiled path is exercised by nothing in this tree's suites, so routing the `IntLiteral` comparisons through it is a change this rung did not measure. That is a reason to keep the rung small, not a reason to call `asZZ64` the better getter. The choice between them is open.

The two differ observably at one boundary: a literal of `bitLength` above 64 is held in `FIntLiteral.largerVal` as a decimal string, `asZZ64` refuses it -- `java.lang.Error: Not in range for ZZ64: 18446744073709551616` -- where `walk` answers `false` (`probes/BigLit.fss`, `BigLit.walk`, `BigLit.compiled`). `asZZ` does not refuse it, by its body: `FZZ.make(this.toString())` reads `largerVal` itself. That was not run here. That is not a regression, since the same program threw `CompilerFailureDetectedAtRunTime` before this rung, but it is not an improvement either.

Below that boundary neither getter helps, because the value is already wrong when the getter runs: see "What this rung opened".

The comparisons are written over the getter rather than over a `cmp`, because the compiler world's `IntLiteral` has no `cmp`: the interpreter's is a `builtinPrimitive` (ledger row 309), which the compile path has no counterpart for.

`MIN` and `MAX` are written over this trait's own `<=` rather than over `asZZ64`, so that the two families cannot drift apart, and so that the three-way relation between `MIN`, `MAX` and `<=` holds by construction.

## The test

`ProjectFortress/library_tests/IntLiteralRung6.fss` and `IntLiteralRung6.test`, in the shape of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`).

It pins the eight operators with twenty-three assertions. Both operands come from `pick(b: Boolean): IntLiteral = if b then 4 else 9 end`, computed at run time rather than written twice as a literal, so a body returning a constant or comparing boxes would not pass.

Each comparison is asserted in both directions and on equal operands, which is what catches a body that has the sense of its comparison reversed and a body that gets the boundary case wrong.

`MIN` and `MAX` are checked through `.asZZ32` against a `ZZ32`, so their values are pinned by `ZZ32`'s equality and not by the `IntLiteral` equality the same test is checking.

Before the edit, `../bin/fortress junit library_tests/IntLiteralRung6.test` links OK and then dies at `CompilerBuiltin$IntLiteral$DefaultTraitMethods` at `CompilerBuiltin.fss:832` from `IntLiteralRung6.fss:59`, "Failed to satisfy default check run_out_contains=PASS", `Tests run: 2, Failures: 1, Errors: 0` (`probes/junit-before.out`, captured by reverting the edit and rebuilding the five library jars). After it, `OK (2 tests)` (`probes/junit-after.out`).

## The check

No `ant compileAll`: nothing outside `LibraryBuiltin/` changed, and `fortress compile` reads the `.fss` directly. The compiler-world library jars were rebuilt in the repo-internals order, `AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`, before anything was run.

`ant testFast`: 47 `Tests run:` lines, 1,389 tests, every line `Failures: 0, Errors: 0`; the two added are this rung's link and run. `ant testSystem`: four shards, 97 + 95 + 95 + 95 = 382, all `Failures: 0, Errors: 0`. Both grepped, not read off `BUILD SUCCESSFUL`, which means nothing here: `build.xml:781-934` sets `haltonfailure="off"` on every `junit` task.

`testSystem` is untouched by construction: `CompilerBuiltin` is compiler-world only, and the interpreter reads `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, which is not edited.

The edit adds no name. Unlike rungs 1 and 5 it cannot collide with a private declaration in a test, because every one of the eight declarations was already in the api and already resolved to the body being replaced.

## The subset, before and after

The seven files that stop in `IntLiteral$DefaultTraitMethods`, run before and after with the baseline driver's private cache and private `java.io.tmpdir` (`run-subset.sh`, a copy of `rung5/run-subset.sh`). Raw outputs in `raw-before/` and `raw/`, exit codes in `results-before.tsv` and `results.tsv`, phases by the ladder's own `classify.py`.

| file | operator it stopped on | before | after |
|---|---|---|---|
| `tests/testParen.fss` | `=` (:836) | run | **pass**, prints `false` |
| `tests/chain2.fss` | `<=` (:833) | run | **pass**, prints `PASS` twice |
| `tests/tupleTest1.fss` | `MIN` (:843) | run | **pass**, silent, exit 0 |
| `tests/XXXcaseTest.fss` | `=` (:836) | run | run, now `CompilerLibrary$MatchFailure` |
| `tests/precedence.fss` | `juxtaposition` (:838) | run | run, still `juxtaposition` |
| `tests/forFnDecl.fss` | `juxtaposition` (:838) | run | run, still `juxtaposition` |
| `tests/ampersand.fss` | `juxtaposition` (:838) | run | run, still `juxtaposition` |

Three pass by the ladder's own criterion (`classify.py:123`: exit 0 and no `fail`/`FAIL` in the output), so the ladder's pass count goes 75 to 78. Nothing moved down; all seven compiled clean before and compile clean now.

All three were also run under `walk` and the compiled output is byte-identical (`probes/testParen.walk`, `chain2.walk`, `tupleTest1.walk`). `testParen.fss` is the one that matters: it is `x = 3` then `println (x = 2)`, the equality this rung wrote, and both paths print `false`.

`XXXcaseTest.fss` stops throwing from the stub and now reaches its own intended `CompilerLibrary$MatchFailure`. It moves within the run phase without changing phase; it is an `XXX` negative test and its compiled behaviour is now the interpreter's.

`precedence.fss`, `forFnDecl.fss` and `ampersand.fss` clear nothing here. All three stop on `juxtaposition` at `CompilerBuiltin.fss:838`, which is the arithmetic family and is rung 7.

## What this rung opened

Giving the comparisons bodies turned one loud failure into a silent wrong answer, which is the class ledger row 79 calls the most dangerous item in the ledger. It is ledger row 317, and it is recorded rather than repaired: the cause is in the code generator and a codegen edit is a rung of its own, with its own test.

`CodeGen.forIntLiteralExpr` (`CodeGen.java:3859-3893`) splits on `BigInteger.bitLength()`. `bitLength() <= 32` goes through `BigInteger.intValue()` and `bitLength() <= 64` through `BigInteger.longValue()`, but `bitLength()` of a non-negative `BigInteger` does not count a sign bit, so a positive literal in `[2^31, 2^32)` has bitLength exactly 32 and a positive literal in `[2^63, 2^64)` has bitLength exactly 64, and both wrap negative. `4294967295` and `18446744073709551615` are each stored as `-1`. The author's own comment on the line above the split is "This might not work".

`asZZ64` hands that wrapped value to the comparisons this rung wrote. `probes/p37.walk` against `probes/p37.compiled`, on `explorations/compiler-probes/p37.fss`:

    a = 18446744073709551615     walk  p37 a<c false      compiled  p37 a<c  true
    b = 4294967295               walk  p37 b<c false      compiled  p37 b<c  true
    c = 5

Before this rung the same program threw `CompilerFailureDetectedAtRunTime` from the stub.

The wrap itself is older than this rung and is not confined to the `IntLiteral` path. `explorations/compiler-probes/p37a.fss` writes the binding with its type, `a: ZZ64 = 4294967295`, so the comparison is `ZZ64`'s and had a real body all along; the coercion `ZZ64.coerce(x: IntLiteral) = x.asZZ64` (`CompilerBuiltin.fss:557`) reads the same wrapped value, and walk answers `false` where the compiled program answers `true` (`probes/p37a.walk`, `probes/p37a.compiled`). Annotating the binding is therefore not a workaround, and no workaround is known.

What this rung changed is the other half: where a literal carried as `IntLiteral` used to stop the program loudly, it now gives the wrong answer quietly. No getter can repair either half, `asZZ` included, because the value is wrong before the getter is called. The repair belongs in `forIntLiteralExpr`, whose third branch -- the decimal string through `FIntLiteral.make(String)` -- does not wrap; the two narrow branches need to test the signed range rather than `bitLength`.

## What is deliberately not in the rung

`MINMAX`, `even` and `odd`, which are writable the same way — `MINMAX` returns a tuple of its two operands, `even` and `odd` test `asZZ64` — but which no blocked program reaches, so no test would cover them.

The whole arithmetic family: juxtaposition, unary and binary `-`, `+`, `DOT`, `DIV`, the `BOX` and `DOT` variants, `CROSS`, `BITAND`/`BITOR`/`BITXOR`/`BITNOT`, `CHOOSE` and `|self|`. Every one of those returns a new `IntLiteral`, and the compiler world has no way to build one: the trait has getters out of `IntLiteral` and no constructor into it.

That is rung 7, and its shape is known: a `nativeHelpers` method plus an entry in `NamingCzar.java:367-377` beside `charMakeCharacterWithSpecialCompilerHackForCharacterResultType`, which is the precedent for exactly this problem on `Character`. Three of this rung's seven files wait on it.

Row 80's own probe, `explorations/compiler-probes/p36.fss`, now compiles and runs. It answers `p36  1` against the interpreter's `p36 1`: the value is the interpreter's, and the one remaining character of difference is row 76's inserted space in string juxtaposition, which is not this row's.

Ledger row 79, the `typecase` reading of the same `IntLiteral` typing, is not closed by this rung and keeps its state. The typing is unchanged; only the bodies reached through it are.
