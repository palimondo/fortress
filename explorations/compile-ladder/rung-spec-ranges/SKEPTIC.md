# Skeptic: rung U, the specification's ranges over ZZ32 (climb batch 7R, rung-spec-ranges)

(Note at the gather: the provisional row 477 this judgement cites is ledger row 485, and the provisional row 476 of the rung's record is row 484.)

Verdict: **approved, with three required corrections** (section 9). The branch `wip/rung-spec-ranges` at `e933b30e6`, base `26c5d3dd7`. Read: the briefing slice (`explorations/coordinator/tools/facts-extract.sh` with the ten keys of the brief, one part), the batch record's sections 1 to 6 (`explorations/coordinator/CLIMB-BATCH-7R.md`), the net diff, the worker's structured report (its `reportText`, since the harness refused REPORT.md), `record.md`, `decision-record.md` and every probe it cites. Nothing of the worker's source changes was edited. My probes and captures are under `explorations/compile-ladder/rung-spec-ranges/probes/skeptic/`.

Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, load 13.7 to 17.4 at the start of each capture (rung J was running beside), `FORTRESS_THREADS` 1 and 4 as each capture names. The compiled runs used a cache built in library order on this worktree (AnyType 31 s, CompilerBuiltin 111 s, CompilerLibrary 51 s, CompilerAlgebra 4 s, CompilerSystem 6 s, load 13.76 at the start).

## 1. The provenance block

The five lines of the report's block, each opened with `sed -n`:
- problem: `explorations/reviews/numerics-plan-coordinator/measure-C.md:195-197` are items 5 to 7 (GeneratorDefn, mySum, the factorial property); `Specification/basic-lib/basic-integers.tex:61` is the callout's first line, now without " or a range". Holds.
- spec: `Specification/basic/expressions/ranges.tex:42-44` (the revised assumption), `explorations/coordinator/map/spec-to-implementation.md:257` (the ranges row), `basic-integers.tex:25` (ZZ64 coerces from ZZ32 and NN32), `Specification/basic/expressions/literals.tex:146-148` (libraries define coercions from numerals to integers). Prose chapters, no `library/apis/`. Holds.
- precedent: `explorations/compile-ladder/rung-spec-numbers/decision-record.md:85-100` (rung T's decisions 1 to 14, fortify and quotes without alignment commands among them), `Specification/appendices/changes.tex:1028-1069` (rung A's entry), `Library/CompilerLibrary.fsi:173-174` (`opr :(lo:ZZ32, hi:ZZ32): Range`, `opr #(lo:ZZ32, sz:ZZ32): Range`), `ProjectFortress/demos/fact64.fss:22-23` (`for i <- seq(0#20) do j:ZZ64 = widen(i)`). Holds.
- deviation: `ranges.tex:78-91` (the wider-counter paragraph and loop), `SpecData/examples/advanced/Generators.GeneratorDefn.fss:35` (the midpoint), `defining-generators.tex:389-438`, `changes.tex:479`, `blocks.tex:73-77`, `changes.tex:1116-1139`, `changes.tex:1255-1259`. Each line says what the block says.
- historical: the seven 2012-tree files the diff edits under `Specification/` and `SpecData/`. The nine test files it edits are revival files (their messages only). Holds.

## 2. The recorded failure

A prose rung has no test to turn red; the brief asks for the base build and the examples run under walk before the edit. They are committed in `cb4551e2d`, before the specification commit `aa71ed0ca`: `probes/build/base-tex.txt` (623 pages), `probes/examples/GeneratorDefn-base-walk.txt` ("Ambiguous coercion, args = (3: ZZ64,1: ZZ32)" at `b MAX 1`, rc 1), `probes/examples/GeneratorDefnFloorZZ32-base-walk.txt` (the midpoint defect itself, "got arg 6:ZZ"), `probes/examples/mySum-base-walk.txt`. The edited build is `probes/build/edit-tex.txt` (626 pages). The last LaTeX pass of each build has the same warnings, which I compared line by line. Recorded.

## 3. The diff, against the decision and the S1 form

- `ranges.tex:42-48`: the components of an explicit range are ZZ32 values, a numeral converts, another integer type is a static error: the decision's words (POSITIONS.md, 2026-09-27, the numerics plans, decision 1: "A range over another integer type becomes a static error"). `:78-91`: the wider counter as a typed binding, `j: ZZ64 = i`. The prose chapters name no integer `widen` (a grep of `Specification/basic*`, `advanced*` finds only the unrelated generic `widen` of `trait-parameters.tex:376-386`), and the binding's coercion is stated at `basic-integers.tex:25`; the choice is right. Callout `:92-99`.
- The three places of the callout's range half (`basic-integers.tex:61`, `changes.tex:479`, `changes.tex:1076` at the base) lose " or a range", the call half kept (answer 8, 2026-09-26). Line counts unchanged.
- The examples: `mySum(i:ZZ32):ZZ64`; the figure's generator over ZZ32 with `mid = lo + (hi - lo) DIV 2`; the adapted generator's three source and three typeset lines ZZ64 to ZZ32. The factorial property as `0! = 1` and `m >= 0 IMPLIES (m+1)! = (m+1) m!`, typeset as today's fortify gives it (`probes/build/fortify-output.txt`), the guard the chapter's own (`basic-integers.tex:791-792` now), `FORALL` optional in the grammar (`Specification/basic/tests.tex:236-237`).
- Appendix I: I.1.18 and I.1.19 after rung A's entry and before "Passages not yet revised"; the nat sentence at `changes.tex:1255-1259` chooses nothing.
- Every quoted original checked: `Specification-1.0-frozen/basic/expressions/ranges.tex:42-44`, `Specification-1.0-frozen/basic-lib/basic-integers.tex:559-561`, `Specification-1.0-frozen/advanced/parallelism-locality/defining-generators.tex:405`, `:407`, `:411` (each equal to the quote once its alignment commands are dropped, rung T's decision 13), `:50` and `Specification-1.0-frozen/basic/expressions/blocks.tex:72` (the `\input` lines); the two typeset examples in I.1.19 are byte-equal to `probes/examples/mySum-base-typeset.txt` and `GeneratorDefn-base-typeset.txt`; both sources are identical at `2f8b4331a` (2011-02-02) and at the base; the revival's three sentences are `git show 26c5d3dd7:` of `basic-integers.tex:61-65`, `changes.tex:479-481` and `:1076-1079`, all from `d9c415395` (2026-09-27, `git blame`). The labels the new text references exist (`natparams` at `trait-parameters.tex:69`, `using-coercion` at `conversions-coercions.tex:268`, whose `:363-365` is the sentence the rationale leans on).
- `git diff --stat 26c5d3dd7...HEAD` outside `explorations/`: the seven specification and example files and nine test files, nothing under `Specification-1.0-frozen/`, no `Specification/fortress.pdf`, no file of J's.

One statement is wrong as written (correction 1): I.1.19's rationale says the new midpoint "is a ℤ32 value equal to it whenever lo ≤ hi" (`changes.tex:1170-1171`; the same in `decision-record.md:86`, "The new midpoint equals the floor for `lo <= hi`"). It forms `hi - lo`, which leaves ZZ32 when the bounds are far apart: `mid(-1, 2147483647)` raises `IntegerOverflow` on both paths (`probes/skeptic/SkMidpointWide.fss`, `probes/skeptic/differential3.txt:2-31`), where the floor is 1073741823. Inside the figure the case never arises, because the generator's own `size : ZZ32 = hi - lo + 1` overflows first; so the example is right and only the claim needs its condition: equal whenever `lo ≤ hi` and the size `hi - lo + 1` is a ℤ32 value.

## 4. Precedent

The worker followed the S1 form as rungs S, T and A applied it and says where it departs. The compiler library's ZZ32 ranges (`Library/CompilerLibrary.fsi:143`, `:173-174`) and the demos' widening loop are the library's precedent; the specification's own coercion replaces the demos' unlisted `widen`, a right choice. No device was invented where the library has one.

## 5. The test

None: the rung's files exclude tests and assertions. The re-anchoring was checked independently (`probes/skeptic/cite-check.py`, output `probes/skeptic/cite-check.txt`): every citation of a line of the five edited chapters in every file of `ProjectFortress/tests/`, `compiler_tests/` and `library_tests/`, at the base and at HEAD; 100 citations, 37 of them moved (on 36 lines; the report's "36 citation groups" counts lines), every cited text equal before and after, no line changed outside a number. J's four files keep their base citations (15 lines, listed in the capture) for the gather. No comment line was added to any test.

## 6. The competing-declaration grep

The rung declares nothing new. `object BlockedRange` and `mySum(` appear only in their own examples across `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `ProjectFortress/src/com/sun/fortress`, `SpecData` and `Library`.

## 7. The differentials

My own programs, each under walk and compiled (`fortress compile`, then `fortress run`), at `FORTRESS_THREADS=1` and `=4`, since the examples write a mutable variable in a parallel `for` (`probes/skeptic/run-diff.sh`):

| Probe | Walk | Compiled | Verdict |
|---|---|---|---|
| `SkWideCounter.fss`: the ranges section's loop, `for i <- 0#n do j: ZZ64 = i`, summing `j` times 10^9 with `atomic`, and over `seq(0#n)` | 10000000000 three ways, both thread counts (`differential2.txt:2-11`) | the same (`differential2.txt:12-23`) | agree; the binding widens, as `ranges.tex:78-91` says |
| `SkMidpoint.fss`: `lo + (hi - lo) DIV 2` for nine pairs, negative and at both ends of ZZ32 | floor((lo+hi)/2) every time, e.g. (-3,-2) gives -3, (2147483640, 2147483647) gives 2147483643 (`differential.txt:22-43`) | the same (`differential.txt:44-67`) | agree, and right |
| `SkMidpointWide.fss`: the same at (-1, MAX) | `IntegerOverflow` at `hi - lo` (`differential3.txt:2-23`) | `IntegerOverflow` (`differential3.txt:24-31`) | agree; correction 1 |
| `SkMySumThreads.fss`: the respelled `mySum`, at 3 and 100000 | 6 and 5000050000 at one thread; 3 and 3343924325 at four (`differential.txt:68-75`) | 6 and 5000050000 at one; 6 and 4986607299 at four (`differential.txt:76-85`) | agree at one thread; both lose updates at four (row 59) |
| The respelled `Expr.Do.mySum` itself (a byte copy of the SpecData file at `e933b30e6`, removed after the run) | 6 at one thread, 0 at four (`differential2.txt:98-103`) | 6 and 6 (`differential2.txt:104-111`) | row 59; the base's original prints 3 at four threads once in three (`probes/skeptic/orig-mySum-threads.txt`) |
| The respelled `Generators.GeneratorDefn` (a byte copy, removed after) | `<|2, 4, ..., 20|>` at both thread counts (`differential2.txt:112-117`) | refused: `List.fsi` names the one library's `LexicographicOrder`, `Comprehension`, `BigReduction`, `MonoidReduction` (`differential2.txt:118-140`) | the compiled path cannot build the example at all; not the rung's |
| `SkRangeZZ32b.fss`: `3:7`, `a:b`, `0#a`, `a#n` with n negative, `b:a`, a sum over `a#4` | 5, 5, 3, 0, 0, 18 (`differential2.txt:24-39`) | the same (`differential2.txt:40-57`) | agree, as the bullets say (`ranges.tex:50-76`) |
| `SkRangeZZ64.fss`: `seq(lo:hi)` with ZZ64 bounds | 3 elements on the base (`differential.txt:128-133`) | refused: "(ZZ32, ZZ32)->Range is not applicable to an argument of type (ZZ64, ZZ64)" (`differential.txt:134-139`) | the compiled path already gives the static error the new text states; walk refuses it only after J |
| `SkRangeNN32.fss`: an NN32 range | refused at the binding `one: NN32 = 1` (row 454) (`differential.txt:152-173`) | refused at `:`, "(ZZ32, ZZ32)->Range is not applicable to ... (NN32, NN32)" (`differential.txt:174-179`) | the compiled static error matches the new text |
| `SkRangeBigNumeral.fss`: `seq(2147483645 : 3000000000)` | `IntegerOverflow` in `RangeInternals.fss:1081` on the base (`differential.txt:192-213`) | compiles; at run time "Not in range for ZZ32: 3000000000" (`differential.txt:214-223`) | both loud; the compiled one is row 325's run-time form of a static error |
| `SkNatBound.fss`: `seq(0#n)` for `nat n = 3` | 3 (`differential.txt:224-229`) | 3 (`differential.txt:230-237`) | agree: both paths accept a nat parameter as a range's size today |
| `SkNatType.fss`: `nat n = 3` bound to a ZZ32, `1:(n-1)`, bound to an NN32 | 3, 2, then refused: "RHS expression type Int is not assignable to LHS type NN32", at both thread counts (`differential2.txt:58-85`) | 3, 2, 3 (`differential2.txt:86-97`) | **diverge**; section 8 |

`SkWideCounter` first failed under walk on a variable named `big` ("Variable big is already declared", row 147; `differential.txt:2-9`), renamed `giga` for `differential2.txt`. `SkRangeZZ32.fss` is the first form of `SkRangeZZ32b.fss`; the compiled checker refused its helper over `Generator[\ZZ32\]` (`differential.txt:102-127`), a property of the compiler library's generator traits, not of ranges.

## 8. The divergence, and the rule-4 outcome

`u: NN32 = n` for a `nat` parameter `n`: walk refuses it, the compiled run accepts it. The specification settles it against walk: a `nat` parameter may "appear in any context that a variable of type ℕ32 can appear" (`Specification/basic/trait-parameters.tex:82-84`), and a typed binding of ℕ32 is such a context. Outcome 2: the compiled side is right and a ledger row is owed against the interpreter (recommended below). Walk types the parameter in value position as an `Int` and `NN32` declares no coercion from it, row 454's mechanism, but the specification's sentence here is about the parameter, not a numeral. Not the rung's to repair.

The same probes bear on the rung's open question, row 477: today the compiled run treats a `nat` parameter in value position as it treats a numeral (it binds at ZZ32 and at NN32 and bounds a range), and walk as a ZZ32; both accept `0#n` and `1:(n-1)`. And the rung's row and its entry for Pavol do not cite POSITIONS.md, 2026-09-27, a size's range: "A `nat` parameter is an `NN32` value and an `int` parameter a `ZZ32` (`Specification/basic/trait-parameters.tex:82-90`); a larger one is refused". That decision fixes the parameter's magnitude; read with the new `ranges.tex:47-48`, it can be read as candidate (b), refusal, which is why it belongs in the question put to him (correction 2).

## 9. Required corrections

1. `Specification/appendices/changes.tex:1170-1171` and `explorations/compile-ladder/rung-spec-ranges/decision-record.md:86`: qualify the midpoint claim, "equal to it whenever lo ≤ hi and the generator's size hi − lo + 1 is a ℤ32 value" (or equivalent), since `lo + (hi - lo) DIV 2` raises `IntegerOverflow` at (-1, 2147483647) on both paths (`probes/skeptic/differential3.txt`). Keep the paragraph's line count, or update every `changes.tex` line the record and report cite below it.
2. `record.md`'s provisional row 477 and `probes/for-pavol.txt` item 1 (and the report's "For Pavol"): cite POSITIONS.md, 2026-09-27, a size's range, with one sentence on why it does not settle the question (it fixes a `nat` parameter's magnitude, not whether it converts in a range); and replace "The compiled checker's behaviour on such a range was not measured" with the measurement: the compiled run accepts `seq(0#n)` and `1:(n-1)` for `nat n = 3` (3 and 2 elements) and binds `n` at ZZ32 and at NN32, walk at ZZ32 only (`probes/skeptic/differential.txt:224-237`, `probes/skeptic/differential2.txt:58-97`).
3. `decision-record.md` section 6, row 5 (the gather's run of the examples): say that the runs are at `FORTRESS_THREADS=1`, as `probes/examples/run-walk.sh` pins it, and that at four threads `Expr.Do.mySum` loses updates on both paths as its original did (row 59), so a printed 0 or 3 there is not a regression of J's library.

## 10. Other findings, not required

- "An integer numeral converts to ℤ32" (`ranges.tex:46`) is unqualified, as rung T's "ℝ64 coerces from integer numerals" is; a numeral outside ℤ32 does not convert, and on the compiled path that is still a run-time error (row 325; `differential.txt:214-223`).
- The mySum loop is the reduction-variable form the specification describes and marks "not yet supported" (`Specification/basic/evaluation/reduction.tex:15`, `:28-40`): right by the specification, wrong at four threads on both implementations, row 59, before and after the rung.
- The report's S2 value `mySum(100000) = 5000050000` holds at one thread only (`differential.txt:72-75`).
- The checker count: the rung declares none and names no table; nothing to compare.
- The ledger rows that cite moved lines (333, 334, 335, 337, 383, 421, 424, 425, 434, 450 to 453, 472, a grep of mine) are the ones `record.md` names; FACTS.md cites a moved line only at `:56` and `:138`, as it says.

## 11. Stops met

Both as the worker lists them, each lifted by POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him:
- A passage whose new text neither the decision nor J's section settles: the `nat`-bounded ranges (`SpecData/examples/basic/Fun.Decl.fss:23`; `Specification/advanced-lib/binary.tex:716-717`, `:951`, `:1086-1089`; `Specification/basic/matrix-unpasting.tex:160-161`), reported and not chosen (`changes.tex:1255-1259`).
- An example that does not run under walk on the base: only the Working Draft's `Generators.GeneratorDefn` (`probes/examples/GeneratorDefn-base-walk.txt`); both respelled examples run on the base.

Not met: no edit under `Specification-1.0-frozen/`; no assertion changed (section 5); no file of J's or declaration of batch 7's edited; the normative text states no more than J's section builds (section 3; the numeral sentence in section 10 is the chapter's own unqualified form).
