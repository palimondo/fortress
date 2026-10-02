# Skeptic: rung M, rung-library-meets

*The gather of climb batch 8 corrected the provisional row numbers to the final ones: 559 is row 582 and 560 row 583. The skeptic's recommended rows are 584 (the checker skips symbolic operators), 585 (`String`'s four sibling families) and 586 (`UniformDistribution` over a strided range), and a note on row 316. The gather's corrections are marked "added at the gather" where they stand.*

Verdict: **approved, with required corrections** (section 9). The worktree is `/home/user/fortress-meets`, at HEAD `e995c31c0`, clean. All my scratch is under `tmp/rung-library-meets/skeptic/`.

## 1. The rung's test: the two stages, re-run

**Count stage**, on `e995c31c0`:

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-library-meets/skeptic/checker-count-skeptic.txt tmp/rung-library-meets/skeptic/cc-scratch

It printed `#total 39`, `#locations 27`, `FortressLibrary 72`, `RangeInternals 6` and `#crash none`. This is the worker's table. The report's diff is the diff between this table and `explorations/compile-ladder/climb-batch-7b/gate/checker-count.txt` (59, 48, 106, 12). `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing, so the landed table is a valid before.

By family, the 39 are: FORWARD_CMP 19, IN 7+1, seq 3, generate 4, SQCAP 1, isLeftZero 1, the full ranges' map 2, and unsigned 1. That matches REPORT section 3. The report declares `expectedCheckerCount` 39 and leaves the crash line unchanged; both match the table.

**Distance stage** (846 s):

    explorations/coordinator/tools/distance/run.sh tmp/rung-library-meets/skeptic/distance-skeptic.txt tmp/rung-library-meets/skeptic/dist-scratch

Compared with `compare.sh`:
- against the worker's post-edit table: `DISTANCE SAME 545`;
- against the landed table: `DISTANCE DOWN 598 -> 545 (-53)`.

Sorted, my `errors.tsv` is identical to the worker's `dist-post/errors.tsv`. Compared without line numbers, 58 sites went and 5 came:
- What went is the M1 families `copy` 2, `ivmap` 3, `juxtaposition` 3, `lift` 6, `map` 4 and `nest` 1; the R2 and R3 slips; and the bodies the report lists.
- The 5 new are BR big-operator body messages at declarations the rung did not touch. `climb-batch-7C/gate/distance-sites.tsv` holds the same set (two `RR64`, `LEXICO`, two `UniqueItem`), which supports row 488's variation as their cause.
- The classes G1 and I1 move by fixed line ranges in `explorations/coordinator/tools/distance/classify.py:24-25`, `:29-30`, as the report says.

## 2. What the report does not say: the export check's unmatched list

The export error's "not matched" list has 68 entries before and after. It lost `LessThan` and `GreaterThan`'s `CMP`, as reported. It also gained two entries:

    (TraitDecl AssociativeReduction at FortressLibrary.fsi:1856.1, due to different method lift @ FortressLibrary.fsi:1860:5-23)
    (TraitDecl StandardMutableArrayType at FortressLibrary.fsi:1460.1, due to different method copy @ FortressLibrary.fsi:1466:5-1467:1, ..., Asbtract method copy @ FortressLibrary.fss:2134:5-2135:1 is not declared in the API)

The distance stage counts the whole list as one row, so its total cannot show this.

- **`copy`.** The new api declaration `copy():T` lacks `abstract`. The adjacent `StandardImmutableArrayType` declares `abstract copy():T` (`Library/FortressLibrary.fsi:1456`) and is not in the list. My probe pair (`cprobes/exp/SkExpA`, `SkExpB`, `fortress typecheck -compiler-lib`) shows the rule: an api `copy(): ZZ32` against a bodiless component method gives "due to different method copy ... Asbtract method copy ... is not declared in the API", and `abstract copy(): ZZ32` gives rc=0.
- **`lift`.** This entry is the cost of P2's device. The api now says `lift(r:R)` (`fsi:1860`, as at `:1821`), while every component `lift` says `lift(r:Any)` (`fss:3005`, `:3060`, `:3085`).

## 3. The checker's blind spot, and the sibling sites of the juxtaposition pair

`OverloadingChecker.isDeclaredName` admits an `SOp` only when `NodeUtil.validOp` holds (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:567-571`). `validOp` admits names of capitals and underscores, plus eight listed words (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1460-1477`, the team's 2012 code). So the loops at `OverloadingChecker.scala:169` and `:314` skip every symbolic operator.

My probe `cprobes/SkOpBlind.fss` declares the same unrelated pair, `(A,A)` against `(B,B)`, for `||`, `+`, `<`, `MYOP` and a function `f`. `fortress typecheck -compiler-lib SkOpBlind.fss` prints:

    Invalid overloading of MYOP in component SkOpBlind:
    Invalid overloading of f in component SkOpBlind:
    File SkOpBlind.fss has 2 errors.

The worker found the same for `||` in a trait (REPORT sections 4 and 7) and gave it no home. The specification settles it: `Specification/basic/operators/intro.tex`, at the chapter's opening ("so operators may have overloaded declarations"), with `Specification/advanced/overloading.tex`. Its home is 2.

The blind spot hides the sibling sites of the pair this rung repaired. `String`'s `||`, `|||`, `//` and `///` each pair `(a:Any, self)` with `(self, b:Any)`:
- api: `Library/FortressLibrary.fsi:2411-2412`, `:2418-2419`, `:2424-2425`, `:2430-2431`;
- component: `Library/FortressLibrary.fss:4173-4174`, `:4184-4185`, `:4194-4195`, `:4204-4205`.

That is the shape the text refuses (`overloading.tex`, the paragraphs after "The Meet Rule for Functional Methods"). REPORT section 4 names three of the four and gives none a home.

## 4. `UniformDistribution` over a strided range

`min` and `max` call `range.lower` and `range.upper`. Only `CompactFullRange` declares those (`Library/FortressLibrary.fsi:2218-2220`). `FullRange[\T\]` (`fsi:2210-2216`), the rung's new parameter type, does not, and neither did `FullScalarRange` (`Library/RangeInternals.fsi:341-360`).

Under walk, on the base and on the edit alike, `probes/SkUniformStrided.fss` prints:

    T1 REACHED
    T2 2
    Cannot find definition for method lower given receiver StridedFullParScalarRange   (Library/Random.fss:373:74-83)

`Random.fss` is in neither stage (`distance/run.sh:79-81`). So the question row 483 left open, whether the body checks through the new type, is unmeasured, and for `lower` and `upper` the answer is no.

## 5. Differentials

**Walk.** Every probe ran on the edit (`bin/fortress`) and on the base library (`tmp/rung-library-meets/walk-base.sh`, a `git archive` of `493b4076f`; I checked its six edited library files byte for byte). Probes under `tmp/rung-library-meets/skeptic/probes/`.

Identical on base and edit:
- `SkJuxt`: 19 cases, including a local type's own functional juxtaposition and a local top-level pair.
- `SkJuxtOwn2` and `SkJuxtOwn3`: a component's own top-level juxtaposition beside String's.
- `SkMaybe`: M1 to M11, through `Condition`-, `Maybe`- and `UniqueItem`-typed receivers.
- `SkArr`, `SkRange`, `SkFilterMap`, `SkUniformInfer`, `SkUniformStrided`, `SkBigEmptyMax`, and `SkEmptySum` (row 424's `CastError`).

Changed only as the rung intends:

| probe | base | edit |
|---|---|---|
| `SkBig` | `Unification error: ... Comprehension param 2 ... got arg MinMaxReduction[\ZZ32\]` | `B3 (5,7)` ... `B8 (1,9)`; an empty generator stays loud, `EmptyReduction` |
| `SkSplit` | `RHS expression type Nothing[\Generator[\(ZZ32,String)\]\] is not assignable to LHS type Generator[\String\]` | `S3 Nothing`, `S5 400 0:320 320:80` |
| `SkAvFlat` | `F1 RR64 8.0` | `F1 RR32 8.0` |
| `SkUniformRR` | `W2 not RR64 1` | `Unification error ... ($range:FullRange[\RR64\]) got arg CompactFullParScalarRange` |
| `SkNestSeq` | `N1 100,200,300,200,300, notseq` | the same elements, `seq` (also N2 to N5, N7, N8) |

The rung changes which generators are sequential, so `SkSeqThreads` (for loops writing a mutable `String`) also ran at `FORTRESS_THREADS=1` and in three runs at 4 on each tree. All eight outputs are identical.

**Compiled.** The compile path reads the compiler's own library, which this rung does not edit.
- `cprobes/SkCompiled.fss` compiled and run prints `C1  a 1`, `C2  a b`, `C4  Just(4)`, `C5  3`. Walk prints `C1 a1`, `C2 ab`, `C4 Just(4)`, `C5 3`. The strings differ only by row 76's inserted space.
- `cprobes/SkCompiledLeft.fss` (`1 || "a"`) is refused when compiled, `(String, Object)->String is not applicable to an argument of type (IntLiteral, String)`; walk prints `D1 1a`. This is pre-existing: the compiler's `String` declares these operators with `self` on the left only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37-40`). It is outcome 4 of rule 4: `Specification/basic/operators/juxtameaning.tex` (its String rule) permits the program, and the repair lies outside this rung's scope.

## 6. The tests

`harness-one.sh` on `e995c31c0` over:
- the rung's tests: `LibraryMeetDeclarations`, `BigMinMax`, `SequentialGeneratorMap`, `XXXUniformDistributionRangeType`, `StringAvFlat`, `FlatStringSplit`, `XXXComprisesMeetUncoveredWalk`, `ComprisesMeetWalk`;
- three team tests: `HeapTest` (which extends `AssociativeReduction` and which the worker did not run), `overloadGenericNon` and `LongStringTests`.

Result: `OK (11 tests)`. The XXX file counts as an expected failure at its line 8, the construction.

On the base, by my own `walk-base.sh` runs:
- `LibraryMeetDeclarations`: `PASS`;
- `SequentialGeneratorMap`: `FAIL: a Boolean: false =/= a Boolean: true; a sequential mapped generator mapped again is sequential`;
- `StringAvFlat`: `FAIL: J10/0:8.0 : RR64 =/= J10/0:8.0 : RR32`;
- `FlatStringSplit`: the row-356 `ProgramError`;
- `BigMinMax`: the `Comprehension` unification error;
- `XXXUniformDistributionRangeType`: `REACHED`, `Just(1)`, `PASS` (its missing expected failure).

**Register.** The new files carry one comment line each and cite the specification by section. `SequentialGeneratorMap`'s message matches its section and `Specification/basic/expressions/generators.tex`, section "Generators".

The two promoted files keep what they had:
- `FlatStringSplit.fss`'s message opens with `row 356:` and cites `Library/FortressLibrary.fsi:2330-2331`, which now reads "from %A% and striding by %B%" (the abstract pair is at `:2392-2393`). Its comment is a pointer to a record file.
- `StringAvFlat.fss`'s comment is `(*) explorations/compile-ladder/rung-rr32-sibling/REPORT.md`.

The review-routed message matches the test's declarations and `overloading.tex:367-372`. The rename changes the component only.

## 7. The rest of the checks

- **Provenance block.** Every cited line says what the block says at HEAD, and `historical:` names the eight 2012 files the diff edits.
- **Diff.** It does what the report says. The retypes no rung's section names (`FilterGenerator.filter`, `MappedGenerator.map`, `RightScalarRange.every`) are each needed by a named slip or a respelled error. No device states an exclusion, no declaration of rung Q's is touched, and no checker or walk source changes.
- **Precedent.** The meet declarations follow `SimpleSeqFilterGenerator`, `SimpleMappedIndexed` and the array diamond. `copy`'s api form is the one departure (section 2). `meetRule` asks `fsp == gsp` (`OverloadingChecker.scala:508-509`), which confirms why all three juxtaposition declarations moved together.
- **Competing declarations.** The corpora's own top-level juxtapositions all pass. Walk resolves juxtaposition through the environment (`interpreter/evaluator/Evaluator.java:655-685`).
- **Decisions on record.** All followed. `cross` is rung O's by the record's own partition rule: its message shows the captured `F`.
- **Record.** The FACTS entry's "26 slips retyped" is the stage's 26 return-type rows that went (R3 24, R2 2); the declarations retyped are 23. Row 483's note omits section 4 of this file.

## 8. Stops met

Both are met and both are lifted by `explorations/coordinator/POSITIONS.md:98`, "Reversible stops do not hold a batch."

1. **A slip whose repair changes a value walk prints, left with a row.** `isLeftZero` (`Library/FortressLibrary.fss:122-123`) is left with provisional row 582, as the section prescribes.
2. **The same stop, on slips the rung repaired although walk's output changes:**
   - `avFlat` (`Library/String.fss:508`, row 531, which the section names as closed);
   - `UniformDistribution` (`Library/Random.fss:370`, row 483, which the section names as closed);
   - `BIG MINMAX` (`Library/FortressLibrary.fss:3259-3260`);
   - `split` (`Library/String.fss:317-318`, `Library/FlatString.fss:146-147`, row 356).

## 9. Required corrections

1. **`copy`.** `Library/FortressLibrary.fsi:1466` becomes `abstract copy():T`, as at `:1456`. Re-run the count stage and quote it (39, `#crash none`).
2. **REPORT section 3.** Say that the unmatched list gained `AssociativeReduction` (`lift`) and `StandardMutableArrayType` (`copy`) as well as losing `CMP`, and that the distance total counts the list as one row.
3. **The promoted tests' register.**
   - `FlatStringSplit.fss`: drop `row 356:` and the stale `fsi:2330-2331` from the message, and replace the comment pointer with one line saying what the program checks.
   - `StringAvFlat.fss`: replace its comment pointer the same way.
   - No assertion changes.
4. **Home 2 for the checker's blind spot** (section 3). An expected-failure compiled test owed in this batch: `compiler_tests/XXX<topic>.fss` with its `.test` (`compile`, `compile_err_contains=Invalid overloading of +`), shown through `junit.sh`. Add it to REPORT section 6 and add its ledger row to record.md.
5. **Home 2 for `UniformDistribution` over a strided range** (section 4). `tests/XXX<topic>.fss` asserts min `Just(2)` and max `Just(8)` for `UniformDistribution[\ZZ32\](2:8:3)`, shown through `harness-one.sh`. Row 483's note gains section 4's facts.
6. **String's four sibling families** (section 3). They get a ledger row, which is their home while no program can observe the refusal. REPORT section 4 names all four.
7. **FACTS entry.** "26 slips retyped" becomes "23 declarations retyped (the stage's return-type rows 29 -> 3)".

## 10. For Pavol

- **The stages' zero is not a true zero for operators.** The checker skips every symbolic operator, so neither table has counted the one library's symbolic-operator families.
- **String's operator families are no longer uniform.** Juxtaposition is now three top-level operators, while `||`, `|||`, `//` and `///` keep the refused shape. Which device the four take is a fork.
- **`lift`'s api and component disagree.** The api's `lift(r:R)` against the component's `lift(r:Any)`. The other way, the api declaring `Any`, was not measured.
