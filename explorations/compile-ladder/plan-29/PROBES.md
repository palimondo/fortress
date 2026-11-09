<!-- The probes of climb batch 29's planner, 2026-11-09, for `coordinator/CLIMB-BATCH-29.md`: the `=` pairs over the numeral types kept on the prototype of `probes/literal-default.patch`, with and without its step 5 and its chained coercion; the compiled path's fold phase run in walk's phase order; the base fold's two defects; the counts of the library's lines that name the two literal types. Each in the worktree `/home/user/fortress-p29`, seeded from the base build `/home/user/fortress-base29` (`8cde0b2c4f`) at `main`'s `7da318db4d`, whose code is the base's (`git diff --stat 8cde0b2c4f 7da318db4d -- Library ProjectFortress Specification build.xml bin` prints nothing), and removed after. The prototype's own measurements are cited, not taken again (`probes/literal-default.md`). -->

# Climb batch 29: the planner's probes

**Machine:** nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` (the suites set 4), loads 0.08 to 1.70 at the starts, the record writer's agent the only other work on the box. The worktree's setup lines are `fortress-repo`'s `build-and-caches.md`, "Setting up each call".

## Probe 1. The `=` pairs over the numeral types kept, on the prototype

**Why.** The prototype dropped the 15 `=` pairs over the literal types, and with them `u = 0` for a `u` of `NN32`, `NN64` or `RR32` fell to the `=` over `Any` (`probes/literal-default.md`, section 5). P-173 keeps the pairs, "their conversion of a numeral folded", and P-172 gives `QQ`, `RR64` and `RR32` the pair that goes with each coercion from a float numeral. No measurement of the checker with the pairs kept existed, and the prototype's step 5 (a numeral's coercion into its own default ranked as no coercion) and its chained coercion (`viaDefault`, refused by review-queue item 439's default) were built for the case the pairs answer.

**What was built.** `git apply probes/literal-default.patch`, then the delta `probes/pairs-kept.patch` on it (41 lines in, 6 out):
- 1a: the library's hunks only. The 15 pairs over `IntLiteral` restored at their old places, both ways: `opr =(self, b:IntLiteral)` in `RR64`, `QQ`, `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32`, each `do c: T = b; (self = c) end`, and on the prototype's `trait IntLiteral` the seven reversed, `opr =(self, b:T) = do c: T = self; (c = b) end`; new pairs over `FloatLiteral` in `RR64`, `QQ` and `RR32`, and the three reversed on the object `FloatLiteral`. A first placement, right after each type's `coerce`, was refused before the checker: 53 errors, "Coercion declarations should come first." and "Field/getter/setter declarations should come before method declarations." (`Library/FortressLibrary.fss:392:5-40` and on): a pair goes after the getters, where the library had it.
- 1b: also `CoercionOracle.buildCoercion` without step 5's mark and without `viaDefault`, so `buildCoercion` returns the coercion it checked and nothing else.

**The program**, `probes/LitPairs.fss`: `u: NN32`, `v: NN64`, `r: RR32`, `q: QQ`, `z: ZZ`, `i: ZZ32` and `w: RR64` compared with numerals (`u = 0`, `v = 0`, `r = 0`, `r = 0.5`, `q = 0.5`, `z = 0`, `i = 0`, `w = 0.5`) and `h = (1/2 = 0.5)`, checked by the count stage's driver with the prototype's trace, from the tree's root:

    CP=$(bin/fortress_classpath | tail -1)
    FORTRESS_LITERAL_TRACE=1 java -Xmx4g -Xss64m -Dfortress.caches=$PWD/tmp/wf1 -cp tmp/p1/count/classes:$CP WorldFlip -stop check tmp/probe/LitPairs.fss

A `LITERAL-DEFAULT` line names each numeral that took its default; a numeral at a pair's numeral-typed parameter prints none.

**Results.**
- **1a.** Count `#total 0`, `#locations 0`, `#crash none`, `real 1m52.846s` (`explorations/coordinator/tools/checker-count/run.sh tmp/p1/count.txt tmp/p1/count`). Distance `#total 0`, every kind 0, `#crash none`, `real 2m48.452s`. The trace printed one line: "`LitPairs.fss:9:13 ZZ32 at parameter Any of (Any, Any)->Boolean`", the `0` of `r = 0`. Every other comparison chose its pair. `RR32` declares no coercion from an integer numeral (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:48-60` at the base declares none), so no pair holds `r = 0`, which answers `SEQV` of an `RR32` and a `ZZ32`, `false` for `r = 0.0` too. P-76 has `RR32` convert from an integer numeral with one rounding: the coercion and its pair are rung N's.
- **1b.** Count `#total 0`, `#locations 0`, `#crash none`, `real 1m47.643s`. Distance `#total 0`, `#crash none`, `#seconds 185 FortressLibrary 114` (1a: `#seconds 166 FortressLibrary 104`). The trace printed the same line for `r = 0`, and two more for `h`'s numerals, "`LitPairs.fss:19:8-10 RR64 at parameter Any of (Any, Any)->Boolean`" and `:19:14-15`: the prototype's fold makes `1/2` the numeral `0.5`, and without step 5 the two numerals meet at the `=` over `Any`, `SEQV` of two equal doubles, `true`. With step 5 they met at a pair. Under the record's fold (fork F1) `1/2` stays the quotient of two integer numerals, a `QQ`, and `QQ`'s pair answers. Every other comparison chose its pair, as in 1a.
- **What it means.** With the pairs kept, the one library checks clean with neither step 5 nor the chain, and the comparisons the prototype lost come back to their types: rung C builds neither (forks C2 and C4), rung N keeps every pair and adds `RR32`'s (fork N9). The prototype's step 5 changed no compiled test's verdict (`probes/literal-default.md`, section 4.6). The Fable review of the record changed fork C4 after this probe: rung C keeps step 5 in its narrow form, a numeral's conversion into its own default ranked as no coercion, so that `gg(5, w)` runs the `ZZ32` declaration statically, by P-173's reading of P-49; the chain stays out (`coordinator/climb-batch-29-review.md`).


## Probe 2. The fold phase in walk's phase order, at the base

**Why.** P-173's fold runs "before the checker" and walk is to answer as the compiled path does; the fold phase, `INTEGERLITERALFOLDING`, is in `PhaseOrder.compilerPhaseOrder` only (`ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java:137-147`). No run had put it in walk's order.

**What was built.** On the clean seeded tree, one line, `INTEGERLITERALFOLDING,` after `PRETYPECHECKDESUGAR,` in `interpreterPhaseOrder` (`PhaseOrder.java:125-133`), then `ant compileAll` (47 s) and `ant testSystem` once.

**Results.** `Tests run: 197, Failures: 0`; `194, 1`; `195, 0`; `205, 1`: 789 of 791 pass, against the last gate's 791 of 791 on this code (`compile-ladder/climb-batch-28/gate/summary.txt`). The two:
- `tests/NativeHelperFamilyZZ32Walk.fss:31`, `assert(overflows(fn () => 65536 DOT 65536), "DOT overflows")`: "FAIL: DOT overflows". The fold makes the product the numeral 4294967296, which walk evaluates as a `ZZ64`, so nothing overflows: P-173's answer for numerals alone. The test means `ZZ32`'s `DOT`; its operands are to be typed.
- `tests/ChooseZZ32Walk.fss`: "UNEXPECTED exception": the visitor's `CHOOSE` fold throws at `3 CHOOSE 5`, `5 CHOOSE (-1)` and `(-5) CHOOSE 2` (probe 3).

So the phase runs under walk as it is, the library folds as the compiled path's does, and only operations on numerals alone change.

## Probe 3. Two defects of the base's fold, on the compiled path

`probes/FoldChoose.fss` (`println("3 CHOOSE 5 = " (3 CHOOSE 5))`) and `probes/FoldWrap.fss` (`a: ZZ32 = 2147483647 BOXPLUS 1`), each compiled and run with the old code, `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base29 <worktree>/tmp/old-caches compile|run|walk`:
- `FoldChoose`: the compile stops, "Exception in thread "main" com.sun.fortress.exceptions.CompilerError: Integer Literal folding: Need to do something for factorial of negative values" (`IntegerLiteralFoldingVisitor.java:38-55`, `choose` by three factorials, and `:89-90`). Walk prints `3 CHOOSE 5 = 0`, `ZZ32`'s answer.
- `FoldWrap`: it compiles; the run dies, "java.lang.Error: Not in range for ZZ32: 2147483648". The visitor folds `+`, `BOXPLUS` and `DOTPLUS` alike as exact addition (`:63-64`), and `-` with `BOXMINUS` and `DOTMINUS` (`:65-66`), so a wrapping or saturating operator on numerals loses its meaning at a typed place. Walk refuses the program, "Operator ? is not defined": the one library declares no `BOXPLUS` at `ZZ32`.

No ledger row holds either (`facts-extract.sh 'ledger-find:fold'`, `'ledger-find:CHOOSE'`). Both are rung F's to repair (fork F2); the record hands them to the record writer as rows.

## Probe 4. The lines that name the two literal types

`grep -cw 'IntLiteral\|FloatLiteral'` at the base: `Library/FortressLibrary.fsi` 18, `.fss` 18; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` 38, `.fss` 63; `Library/Constants.fsi` 2, `.fss` 2; `Library/ReflectiveQuickCheck.fss` 2 (`theType[\IntLiteral\]`, a static argument). `FortressBuiltin.fss` holds 24 `glue.prim.IntLiteral$` and `glue.prim.FloatLiteral$` strings. The tests that name either type: 12 files under `ProjectFortress/tests/` and 38 under `compiler_tests/` and `library_tests/` (`git grep -l 'IntLiteral\b\|FloatLiteral\b'`), the prototype's section 4.3 among them.

## Not run

The suites and stages on the base, which climb batch 28's gate measured on this code; a prototype of rung N's walk half, of rung G or of rung S; the demos; the specification's build.
