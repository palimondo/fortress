# Rung A (`rung-tabulate`): `fill`'s function form renamed `tabulate`

problem: the checker-count stage's 22 "Invalid overloading of fill" in `NativeArray`'s two objects, `explorations/compile-ladder/rung-tabulate/probes/checker-count-preedit.txt:8` (44, the stage counting each error twice), of `#total 62` at `:14`; the distance stage's 244 value-against-function and 58 diamond refusals, most of them behind the api's early return, `explorations/compile-ladder/rung-tabulate/probes/distance-preedit.txt:14-15`; the new test fails on the base, `explorations/compile-ladder/rung-tabulate/probes/test-preedit.txt:3-4`
spec: `Specification/advanced/parallelism-locality/arrays-distributed.tex:53-55` (the figure's two initialization rows, prose outside Part IV); `Specification/advanced/overloading.tex:176-180` (the Incompatibility Rule the pair fails) and `:114-127` (a lone parameter of a naked type variable bounded by `Any`); `Specification/basic/trait-parameters.tex:49-54` (the implicit bound and the tuple and arrow instances); the prose under `Specification/basic/` and `Specification/basic-lib/` never names `fill` (`explorations/compile-ladder/rung-tabulate/probes/spec-grep.txt:2-3`)
precedent: a declaration where two parents meet, returning the self type, as `StandardMutableArrayType` declares `assign` (`Library/FortressLibrary.fsi:1439-1440` at `ff1649cea`), beside the leaves' redeclarations of `copy`, `map`, `ivmap` and `replica` ("Copied here for better return type information", `:1635`; `:1492`, `:1518`, `:1631`, `:1763`); a second name for a function-taking form, `ivmap` beside `map` (`:1349-1350`) and Steele's `fill2` beside `fill` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:577-579`); a variant factory named by an adjective before the type, `immutableArray1`, `primitiveArray` (`Library/FortressLibrary.fsi:1554`, `:1421` at `ff1649cea`)
deviation: the declarations below the diamond sit where it meets, `StandardMutableArrayType` and `ImmutableArray1` (`Library/FortressLibrary.fsi:1441-1442`, `:1495-1496`), not in each of the four leaves answer 10 names, because the leaf placement leaves `StandardMutableArrayType`'s own check refusing both methods (decision D1, `explorations/compile-ladder/rung-tabulate/probes/distance-sites-leaves.txt:348`); `StandardImmutableArrayType`'s two become abstract, as its `copy` is (D1, `Library/FortressLibrary.fsi:1431-1432`); the factories are named `tabulatedArray1`, `tabulatedArray2`, `tabulatedArray3` and `tabulatedVector`, a name the decision does not give (D2, `Library/FortressLibrary.fsi:1556`); `array3`'s function form takes three indices and is exported (row 247, D3, `Library/FortressLibrary.fsi:1778`); 32 lines of eight demos are respelled though the brief's list of files names no demo (D4, `ProjectFortress/demos/lutx.fss:62`)
historical: Library/FortressLibrary.fsi, Library/FortressLibrary.fss, Library/Generator22D.fss, Library/List.fss, Library/Random.fss, Library/System.fss; ProjectFortress/tests/RandomTest.fss, ShuffleTest.fss, matrixOps.fss, sparseMatrix.fss, vectorOps.fss; ProjectFortress/demos/BiCGSTAB.fss, BiCGSTAB2.fss, DemoGenerator22D.fss, Generator2Demo.fss, conjGrad.fss, lutx.fss, npbft.fss, posFeedback.fss; Specification/advanced/parallelism-locality/arrays-distributed.tex, Specification/appendices/changes.tex; and, the revival's own, ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss and ArrayScalarExtension.fss (added at `02d09a39f`, 2026-09-19) and the new file ProjectFortress/tests/TabulateRungA.fss in the team's corpus (`Library/FortressLibrary.fsi:1360`, the first line the rung edits, on the branch; `:1365` on `main`)

**How this file was written.** The harness refused the worker's write of this file ("Subagents should return findings as text"); the gather writes it from the structured result's `reportText`.

## 1. For Pavol

What comes back to you, as the brief lists it:
- **The counts.** The checker-count stage goes from 62 to 40: `NativeArray` goes from 44 to 0 and every other row is unchanged (section 4). The distance stage goes from 1,747 to 1,434: the value-against-function class 244 to 0, the diamond class 58 to 0, and the five factory return-type refusals to 0. Every other row that moved is a moved or rewritten position, a body that moved, or the stage's own run-to-run variation, which a second run on the untouched base confirms (section 5).
- **The respelled test lines**: twelve lines in seven team tests, each keeping its value (section 7; `explorations/compile-ladder/rung-tabulate/probes/test-lines.txt`). They are the eleven the judgement listed plus `sparseMatrix.fss:35`, a factory call with a function.
- **The vocabulary diff as applied**: the twelve lines of `explorations/reviews/overloading-judgement.md:163-191` with `tabulate`, line for line, and the four probe lines (section 8; `explorations/compile-ladder/rung-tabulate/probes/vocabulary-diff.txt`). No line of `MicroGptFlat.fss` or `MicroGptApl.fss` changed. Both microGPT checks pass 40 of 40 with the same printed values (section 12).

Decisions taken here that touch your words (section 9):
- D1 puts the declarations at the diamond's meet, not in each leaf, because the leaf placement leaves the meet itself refused, exactly as the library's `copy` is refused there today.
- D2 names the factories `tabulatedArray1` and siblings; the decision gave them no name.
- D4 respells the demos.

Two passages of the specification this rung may not edit are left for you or rung S (section 10). Two ledger rows are opened, 464 and 465 (section 15).

## 2. What changed

**The library's api** (`Library/FortressLibrary.fsi`, lines on the branch):
- `ReadableArray`, `ImmutableArray`, `Array`: `abstract fill(f:I->E)` becomes `abstract tabulate(f:I->E)` with the same return type (`:1360`, `:1379`, `:1399`). `fill(v:E)` stays.
- `StandardImmutableArrayType`: `abstract tabulate(f:I->E):T` and `abstract fill(v:E):T` (`:1431-1432`), abstract as its `copy` is (`:1433`).
- `StandardMutableArrayType`, below `Array` and `StandardImmutableArrayType`: declares `tabulate(f:I->E):T` and `fill(v:E):T` (`:1441-1442`) beside its `assign`.
- `ImmutableArray1`, below `ImmutableArray` and `StandardImmutableArrayType`: declares `fill(v:T)` and `tabulate(f:ZZ32->T)`, both returning `ImmutableArray1[\T,b0,s0\]` (`:1495-1496`).
- The factories: `array1(f)` becomes `tabulatedArray1` (`:1556`), `vector(f)` becomes `tabulatedVector` (`:1563`), `array2(f)` becomes `tabulatedArray2` (`:1666`), and `tabulatedArray3[\T, nat s0, nat s1, nat s2\](f:(ZZ32,ZZ32,ZZ32)->T)` is added beside `array3()` (`:1778`; row 247).
- The doc comment above `ReadableArray`'s `tabulate` and `fill` (`:1357-1359`, and `Library/FortressLibrary.fss:1951-1953`) said the two forms "are defined with more specific self types in StandardImmutableArrayType". After D1 `StandardImmutableArrayType` declares them abstract, and they are defined in `StandardMutableArrayType` and `ImmutableArray1`, so the comment names those two, in the same three lines of each file. The skeptic's correction 2, made at the gather; the `.fsi` comment is rendered into Part IV of the specification.

**The component** (`Library/FortressLibrary.fss`): the same declarations. The two bodies move unchanged from `StandardImmutableArrayType` (base `:2076-2083`) to `StandardMutableArrayType` (`:2093-2100`), and are copied into `ImmutableArray1` (`:2185-2192`). The factories' bodies call `.tabulate(f)` (`:2358`, `:2367-2368`, `:2719-2720`, `:2936-2937`), and `array3`'s function type becomes `(ZZ32,ZZ32,ZZ32)->T`.

**The library's call sites of the function form**: 33, each `.fill(` changed to `.tabulate(`, or the factory to its new name, and nothing else (`explorations/compile-ladder/rung-tabulate/probes/library-diff.txt`):
- `FortressLibrary.fss`, 21: the bodies of `copy`, `thaw`, `freeze`, `map` and `ivmap` in `ImmutableArray1`, `Array1`, `Array2` and `Array3`; `Matrix.rmul` and `lmul`; `matrix(v)`, whose numeral `0` stays (row 437); and the four factory bodies.
- `Generator22D.fss`, 7 (`:58`, `:101`, `:146`, `:314`, `:318`, `:324`, `:327`).
- `List.fss`, 2 (`mapArr` and `ivmapArr`, `:462`, `:467`).
- `System.fss`, 1 (`:34`).
- `Random.fss`, 2 (`vector(f)` at `:292`, `:315`).

The calls of the value form stay. So does `List.fss`'s own private `fill[\T\](start, under)` (`:310-393`), which is not the array's method.

**The new test**, `ProjectFortress/tests/TabulateRungA.fss`:
- `tabulate` on one-, two- and three-dimensional arrays, on a shifted, an immutable and a numeric one; the four factories; `copy`, `map`, `ivmap` and `Matrix.rmul`. Each asserts the value `fill(f)` gave on the base (`explorations/compile-ladder/rung-tabulate/probes/TabulateBase.fss`, captured on the base as `TabulateBase.txt`).
- `fill` with a function on an array whose element type is a function type, which stores it.
- `fill` with a function on an array of `Any`, directly, through the value factory and through generic code, each of which now stores the function.

## 3. Test first: the recorded failure and the recorded pass

The manifest sets `testIsStage`, so the recorded failure is the checker-count stage before the edit: `#total 62`, `NativeArray 44` (`explorations/compile-ladder/rung-tabulate/probes/checker-count-preedit.txt:8`, `:14`). Its 22 errors are "Invalid overloading of fill in trait PrimitiveArray" and "... PrimImmutableArray".

The new test was written first and fails on the base (`explorations/compile-ladder/rung-tabulate/probes/test-preedit.txt:3-12`, exit 255): "Function tabulatedArray1 is not defined", and the same for the other three factories. `.tabulate` itself is not reported, because walk resolves a dotted method at run time.

The recorded pass: the stage reads `#total 40`, `NativeArray 0`, `#crash none` (`explorations/compile-ladder/rung-tabulate/probes/checker-count-postedit.txt:8`, `:14`), and the test passes with exit 0 (`explorations/compile-ladder/rung-tabulate/probes/test-postedit.txt:3`).

## 4. The checker-count stage, api by api

```
< NativeArray	44
> NativeArray	0
< #total	62
< #locations	36
> #total	40
> #locations	28
```

- `NativeArray`: the 22 "Invalid overloading of fill" errors in its two objects are gone. The objects extend `Array1` and `ImmutableArray1`. Nothing else in the stage's output changed except the file total; this was read from the two runs' full outputs, which are not kept.
- `FortressLibrary` 38 (19 errors counted twice) and `RangeInternals` 42 are unchanged. The api still stops at its hierarchy pass on rung H's 19 errors, so its own `fill` refusals are not on this stage; they are on the distance stage.
- Every other api reads 0 before and after, and the crash line is `none` before and after.

**For the manifest:** `expectedCheckerCount` 40 for this rung alone; `expectedCheckerCrash` unchanged (none). On the merged tree the counts do not add. Once rung H lets the `FortressLibrary` api reach its overloading check, this rung's removal of the api's `fill` refusals shows there too.

## 5. The distance stage

The stage was run by `explorations/coordinator/tools/distance/run.sh` (setting `any`, memo off) before the edit and after it:
- before: `explorations/compile-ladder/rung-tabulate/probes/distance-preedit.txt`, identical row for row to the gate baseline `explorations/compile-ladder/gate-baseline/distance.txt` except its timing lines;
- after: `distance-postedit.txt`.

The two tables were compared by `explorations/coordinator/tools/distance/compare.sh` (`distance-compare.txt`), and error by error by `explorations/compile-ladder/rung-tabulate/distance-sites.py` (`distance-sites.txt`), which maps every position in a file this branch changed back to its line on the base.

```
DISTANCE DOWN   1747 -> 1434 (-313)
    kind overloading            502 -> 201    (-301)
    kind return-type             91 -> 86     (-5)
    kind typecheck              980 -> 973    (-7)
    class A1                    244 -> 0      (-244)  fill: function form against value form
    class A2                     58 -> 0      (-58)  fill: the array diamond
    class O1                     15 -> 16     (+1)
    class R3                     40 -> 35     (-5)
    class I1                     81 -> 82     (+1)
    class V1                     44 -> 40     (-4)
    class V2                     39 -> 32     (-7)
    class G1                     18 -> 15     (-3)
    class OT                    116 -> 122    (+6)
```

What went (337 rows):
- every "Invalid overloading of fill", 302 in all: 97 in the api and 205 in the component;
- the five factory return-type refusals: `array1` and `array2` in both files, and `array3` in the component;
- the body errors of the calls that now resolve to `tabulate` (`Library/FortressLibrary.fss` base `:2185`, `:2188`, `:2238`, `:2240`, `:2348`, `:2925`);
- `StandardImmutableArrayType`'s two body errors, which moved with the bodies (below).

What is new (24 rows), each classified:
- **11 are the same error at a moved or rewritten position** (marked `NEW=` in `distance-sites.txt`):
  - the two export errors, whose lists are the same once positions are dropped;
  - `Array3.shift`'s two return-type errors, whose span now ends on a rewritten line;
  - three filter errors that print an inner position the edit shifted;
  - four body errors on rewritten lines: `Array1.freeze`, `tabulatedVector`, and `matrix(v)` twice, the second of which is row 437's numeral. Each is present on the base at the same line.
- **2 moved with the bodies.** "Function body has type StandardMutableArrayType[\T,E,I\], but declared return type is T" is reported at the two bodies now in `StandardMutableArrayType` (`INSERTED2093`, `INSERTED2097`). The base reported the same of `StandardImmutableArrayType` at those two bodies (base `:2076`, `:2080`, now gone): the checker types `self` as the trait rather than its self-type parameter (class S1), whichever trait holds the body.
- **11 are the stage's run-to-run variation.** A second run of the stage on the untouched base, in a checkout of `ff1649cea`, read 1,745 against the first run's 1,747 (`explorations/compile-ladder/rung-tabulate/probes/distance-preedit-2.txt`). Their difference, error by error (`distance-base-variation.txt`), falls in these families:
  - which pairs of `LEXICO`, `INVERSE` and `SQCAP` declarations are reported as having the same parameter type;
  - which candidate `BIG ||`'s message names at `:298` and `:308`;
  - which `__bigOperatorSugar` bodies are reported as typed at their element: `:3187` and `:3399` in one base run, `:3224` in the other;
  - which type a join infers for an array body.

  Of this rung's 11, 8 appear word for word in the second base run. The `LEXICO` pair at `:170`/`:171` is one of the family's pairs, printed with another rendered type. The two remaining rows are `__bigOperatorSugar` bodies (`:130`, `:3217`), in the family whose reported sites move between runs. The edit touches none of those declarations.

No new row is caused by this edit. The base's four crashes are the same four declarations at their shifted lines (`distance-compare.txt`).

**The first placement, measured.** The edit as first committed (`77b429e01`) declared `fill` and `tabulate` in each of the four leaf traits, with `StandardImmutableArrayType`'s declarations abstract. The stage then read 1,432, with A1 at 0 and A2 at 2 (the table is `distance-postedit-leaves.txt`). There were four new rows, "Invalid overloading of fill in trait StandardMutableArrayType" and "... of tabulate ...", in the api and in the component (`explorations/compile-ladder/rung-tabulate/probes/distance-sites-leaves.txt:348`, `:350`, `:354`, `:355`).

The checker refuses `copy` at `StandardMutableArrayType` in the same way, on the base and after: 2 rows, "Invalid overloading of copy in trait StandardMutableArrayType", unchanged. `copy` is also declared in the leaves and not where the diamond meets. This measurement is decision D1.

## 6. Where the fix belongs, and the precedent

**Where.** The arrays are Part IV's library (`explorations/coordinator/map/spec-to-implementation.md:329`, the row "arrays, vectors, matrices"). The compiler's own prelude has no arrays, and the checker's refusal is its overloading rules doing their job (`explorations/reviews/overloading-judgement.md` section 4.1). So the fix belongs in the library's declarations, as answer 10 decided, and no checker or interpreter code changes. `NativeArray.fsi`'s two objects needed nothing: they extend `Array1` and `ImmutableArray1` and inherit the new declarations.

**Precedent, and how many.** The library answers the diamond in two ways:
- a declaration where the two parents meet, which `StandardMutableArrayType` already is for `assign` (`Library/FortressLibrary.fsi:1437-1441` at `ff1649cea`);
- a redeclaration in each leaf, which it uses for `copy`, `map`, `ivmap`, `replica` and `shift` (`ImmutableArray1` `:1474-1497`, `Array1` `:1501-1522`, `Array2` `:1603-1640`, `Array3` `:1718-1770`).

The second leaves the meet itself refused whenever the meet is a trait of its own, as it is for `copy`: 2 rows on the base and after (section 5). That defect sits at every method both `Array` and `StandardImmutableArrayType` declare. They share exactly two, `fill` and `copy`, so `copy` is the one other site. `copy` is not this rung's (the batch record's section 4 names `fill` and `tabulate` as A's).

For the second name, the library twice derived a name for the function-taking form (`ivmap`; `fill2`, `CompilerBuiltin.fsi:579`, 2011), and `assign` is a third verb beside `fill` (`Library/FortressLibrary.fsi:1401`). For the factory names, the library's variant factories put an adjective before the type: `immutableArray`, `immutableArray1`, `primitiveArray`, `primitiveImmutableArray` (`:1417-1423`, `:1554`).

## 7. The team's test lines and the demos

Twelve test lines, each respelled to the new name and nothing else, each keeping the value it checks (`explorations/compile-ladder/rung-tabulate/probes/test-lines.txt`):

```
ArrayOperatorsBesideLibrary.fss:13   array[\RR64\](3).fill(fn ...)           -> .tabulate(fn ...)
ArrayOperatorsBesideLibrary.fss:22   array3[\RR64,2,2,2\]().fill(fn ...)     -> .tabulate(fn ...)
ArrayScalarExtension.fss:19          array[\RR64\](3).fill(fn ...)           -> .tabulate(fn ...)
ArrayScalarExtension.fss:41          array[\ZZ32\](3).fill(fn ...)           -> .tabulate(fn ...)
RandomTest.fss:96                    vector[\ZZ64,624\](fn ...)              -> tabulatedVector[\ZZ64,624\](fn ...)
ShuffleTest.fss:20                   array[\ZZ32\](50).fill(fn i => i)       -> .tabulate(fn i => i)
matrixOps.fss:27-29                  array2[\RR64,n,m\](fn (i,j) => 0.0)     -> tabulatedArray2[\RR64,n,m\](fn (i,j) => 0.0)
sparseMatrix.fss:35                  array1[\SparseVector[\RR64,n\],n\](row) -> tabulatedArray1[...](row)
sparseMatrix.fss:43                  array1[\RR64,n\](f)                     -> tabulatedArray1[\RR64,n\](f)
vectorOps.fss:21                     vector[\RR64,5\]().fill(fn ...)         -> .tabulate(fn ...)
```

These are the judgement's eleven plus `sparseMatrix.fss:35`, where `row` is a local function `ZZ32 -> SparseVector[\RR64,n\]` passed to the factory; the brief leaves that count to the rung.

The other `fill` calls of the corpus pass a value and stay: `conditionalGenerator`, `generatedExpr`, `HeapTest` twice, `ReplicaTest`, `SubscriptedExpr` twice and `quicksortTest`. `zeno.fss:72` is inside a comment. The comment at `objectExprMystery.fss:15` names the old signature; it is not a call, so it stays. Their values: section 11.

**The demos** (`ProjectFortress/demos/`, outside the gate), decision D4: 32 lines in eight files follow the rename (`explorations/compile-ladder/rung-tabulate/probes/demo-lines.txt`):
- 28 lines change `.fill(fn ...)` to `.tabulate(fn ...)`: `BiCGSTAB.fss` 9, `BiCGSTAB2.fss` 9, `DemoGenerator22D.fss:61`, `Generator2Demo.fss:62-64`, `lutx.fss:109`, `:112`, and `npbft.fss:85`, `:92`, `:99`, `:135`.
- Four are factory calls with a function: `lutx.fss:62`, `vector[\ZZ32,n\](identity[\ZZ32\])`; `posFeedback.fss:121`, `array1[\ZZ32,10\](filler)`; and `conjGrad.fss:35` and `:43`, as in `sparseMatrix`.

One demo line is left, `mg.fss:20`, `array[\RR64\](x, y, z).fill(I)`. The constructor's field `I` is the value `0` at `:138-139` and a three-argument function at `:49-59`, so the line relies on walk choosing between the two forms at run time. It cannot follow a rename without a `typecase` or two constructors, which is more than a respelling, so it stays as the team wrote it.

The nine demos were run under walk on the base and after the edit (`demo-run.sh`; `explorations/compile-ladder/rung-tabulate/probes/demos-base.txt`, `demos-edit.txt`, compared in `demos-compare.txt`):
- every exit code is the same;
- six demos print the same last lines;
- `conjGrad` and `Generator2Demo` print random data, differently on each run, and both exit 0;
- `mg`, which on the base stops at `mg.fss:159` (a `ZZ64` time divided by a float, as on `main`), now stops earlier, at `:20`, when `fill` is given a function (row 464).

Outside the tree's corpora, 311 files under `explorations/` call the function form. They are probes and captures of earlier work, none gated; they record what ran then and are not edited, as rung F left its review probes.

## 8. The microGPT vocabulary and the probe lines

The lines were applied exactly as `explorations/reviews/overloading-judgement.md:163-191` shows them, with `tabulate`:
- the vocabulary: `explorations/run-c4/src/FlatArrays.fss:14`, `:16`, `:17`, `:171`; `explorations/apl/mg/AplMg.fss:14`, `:19`; `explorations/apl/mg/FlatArrays2.fss:12`, `:14`, `:15`, `:175`, `:178`, `:181`;
- the four probe lines: `explorations/apl/mg/elemwise_nat_probe.fss:14` and `elemwise_rank_probe.fss:14-16`.

`git diff ff1649cea -- explorations/run-c4 explorations/apl` shows these sixteen lines and no others (`explorations/compile-ladder/rung-tabulate/probes/vocabulary-diff.txt`). Its distinct lines equal the judgement's block, plus the probe lines. The value lines (`zeros`, `flat`, the corpus's token matrix and line list) stay `fill`.

## 9. Decisions

**D1. Where the declarations below the diamond sit.**
Taken: `StandardMutableArrayType` (below `Array` and `StandardImmutableArrayType`) and `ImmutableArray1` (below `ImmutableArray` and `StandardImmutableArrayType`) each declare `fill` and `tabulate` with a body, and `StandardImmutableArrayType` declares both abstract.

The ways considered:
- **The four leaves, each with a body**: answer 10's words and the copy precedent. Measured, the meet `StandardMutableArrayType` stays refused for both methods, 4 rows (section 5), as it is for `copy`, and the placement needs four copies of each body.
- **The leaves and the meet**: clears the checker, but the leaves' declarations add nothing the meet's self type `T` does not already give (`T` is the leaf there), and the bodies are four copies instead of two.
- **The meet and `ImmutableArray1`**, the shape the judgement measured (its section 9, the fill worker's `meet()`, `explorations/reviews/fill-overloads-ways/variants/edits.py:23-35`): clears every `fill` refusal on both stages, with two copies of each body. Taken.

The bodies are generic in the index type and belong in a generic trait, where they were before in `StandardImmutableArrayType`. `StandardImmutableArrayType`'s declarations become abstract because both of its subtraits now define them, as with its `copy`.

The judgement's words ("the way-0 redeclarations of both forms in `ImmutableArray1`, `Array1`, `Array2`, `Array3`", section 4.4) and its measured variant differed; the measurement settles it. `explorations/reviews/fill-overloads-ways.md` says in its "Way 0" that either placement satisfies the Meet Rule; that is measured false for the leaves.

**D2. The factories' name.**
Taken: `tabulatedArray1`, `tabulatedArray2`, `tabulatedArray3`, `tabulatedVector`. Answer 10 renames the factories' function form with the method but names no factory.

The ways considered:
- one overloaded `tabulate` factory: refused, because `tabulate[\T,s0\](f:ZZ32->T)` and `tabulate[\T extends Number,s0\](f:ZZ32->T)` for arrays and for vectors have the same parameter type, and arrow types never exclude (`Specification/basic/types-vals-vars.tex:434-437`);
- `tabulate1`, `tabulate2`, `tabulate3` and `tabulateVector`: verbs, where the library names every factory by the type it builds;
- removing the function factories, the caller writing `array1[\T,s0\]().tabulate(f)`: not a rename, and `vector[\T,s0\]().tabulate(f)` is statically an `Array1`, not a `Vector`;
- an adjective before the type, as `immutableArray1` and `primitiveArray` are named. Taken.

The name is yours to change; the change is a rename of four declarations and eight calls.

**D3. `array3`'s function form.** Its parameter becomes `(ZZ32,ZZ32,ZZ32)->T`, and it is exported as `tabulatedArray3` (row 247). `array3(v)` stays in the component and out of the api, as on the base. Walk calls it anyway, through the exported name `array3` (`explorations/compile-ladder/rung-tabulate/probes/Array3Value.txt:4`), while it refuses a component-only name (`ComponentOnly.txt:4`); that is row 465. The compiled export check lists `array3()` among the api declarations the component does not match, before and after. Exporting `array3(v)` is beyond the brief's line and was left out.

**D4. The demos.** The brief's list of files names seven team tests and no demo, while its check for the skeptic reads "no `fill(f` left in the library, the tests or the demos except as the value form". Taken: the demos follow the rename, 32 lines, each listed in section 7, and `mg.fss:20` is left, with the reason. The other way, leaving every demo, leaves 32 calls of a method that no longer exists. The demos are outside the gate either way.

**D5. The new test's assertions for the value form** (home 1): `fill` with a function on an array of `Any`, directly, through the value factory `array1[\Any,3\]`, and through a generic value fill, each asserting that the function is stored. These are the three cases of `FillWalk` (`explorations/reviews/fill-overloads-ways/captures/FillWalk.txt:5`, `:8`, `:9`) where walk tabulated the function on the base (`explorations/compile-ladder/rung-tabulate/probes/TabulateBase.txt:17-19`).

**D6. The placement of the specification's callout**: after the figure's `\end{figure}`, since the figure is a float and the callout box is an `mdframed` environment. It prints just before the paragraph that follows the figure.

**D7. The comparison's schedule.** The machine was at load 25 to 36 from three rungs' workers. The three passes ran at the same time rather than in turn, which puts the same drift into each of them. The seven runs that timed out at 600 s were re-run at 2400 s in each configuration (section 11). Running them in turn would have taken about 2 hours per pass at that load.

## 10. The specification

**What it settles.**
- The figure gives two initialization methods of one name (`Specification/advanced/parallelism-locality/arrays-distributed.tex:53`, `:55` at `ff1649cea`, the same text as in `Specification-1.0-frozen/`):
  - `a.fill(v: E)`, "Initializes all elements with value v";
  - `a.fill(f: I -> E)`, "Calls f at each index and initializes the corresponding element with the result of the call".
- Whether the two may share the name is for the overloading chapters to say. Neither parameter type is a subtype of the other, and with an element type that is `Any` or a function type they do not exclude, so the Incompatibility Rule fails (`Specification/advanced/overloading.tex:176-180`). And a lone parameter of a naked type variable bounded by `Any` may not be overloaded at all (`:114-127`).
- The draft's implicit bound `Object` (`Specification/basic/trait-parameters.tex:49-50`) would separate them. But the draft's next sentence instantiates type parameters with tuple and arrow types (`:53-54`), and the library instantiates arrays at tuples. Your answer (a) to the batch's Q1 (POSITIONS 2026-09-27, the numerics plans) takes `Any`, which rung S writes in batch 7b.

So the specification settles that, under the bound both implementations use, the pair cannot share a name, and answer 10 settles which form keeps it.

**The edit**, in the S1 form (POSITIONS 2026-09-26, S1):
- the figure's row renamed (`arrays-distributed.tex:55`);
- a `\revision` callout after the figure (`:62-69`);
- an Appendix I entry, "Initializing an array from a function" (`\seclabel{revival-tabulate}`), inserted immediately before "Passages not yet revised" (`Specification/appendices/changes.tex:1028-1070`). It gives the change, the rationale, the effect, the original row quoted from `Specification-1.0-frozen/advanced/parallelism-locality/arrays-distributed.tex`, line 55, as "the Working Draft of February 2011", and route C.

No other passage was edited, and not rung S's place in the appendix.

**The build**, as climb batch 5's rung S checked its edit (`explorations/coordinator/CLIMB-BATCH-5.md:134-139`): `./ant genSource` and `./ant tex` in `Specification/fortress/`, on the base and after the edit, all passing. Logs: `explorations/compile-ladder/rung-tabulate/probes/build/base-genSource.txt`, `base-tex.txt`, `edit-genSource.txt`, `edit-tex.txt`.
- The base built 621 pages, and its `pdftotext` equals the committed PDF's line for line.
- The edit builds 623 pages, with no undefined reference in the final pass.
- The two `pdftotext` outputs were compared with whitespace collapsed and every standalone number masked (`explorations/compile-ladder/rung-tabulate/probes/spec-build-content-diff.txt`). What differs:
  - the renamed row, the callout and the entry;
  - Part IV's rendering of the changed `.fsi` declarations;
  - "Passages not yet revised" and "Route C", renumbered from I.1.17 and I.1.18 to I.1.18 and I.1.19; every reference to them is a `\secref`, and each follows;
  - three floats and a footnote that moved with the two added pages.

`Specification/fortress.pdf` is not committed; the gather rebuilds it.

**Two passages this rung may not edit**, for you or rung S:
- Appendix I's introduction says "Every change below follows from one decision of the revival, taken on 24 September 2026 and called route A" (`Specification/appendices/changes.tex:48-49`). This entry does not, and says so in its first sentence; rung S's overloading entries (batch 7b) will not either.
- The paragraph after the figure says "the \VAR{fill} methods themselves are defined in terms of calls to \VAR{init}" (`arrays-distributed.tex:71`). That is still true of `fill`, and it is silent on `tabulate`, which is defined the same way.

## 11. The comparison

Every file of `ProjectFortress/tests/` except the new test, 418 files (`explorations/compile-ladder/rung-tabulate/count-list.txt`), ran under walk in three passes: base A, the edit, base B.
- **The runner**: `explorations/compile-ladder/rung-tabulate/count-run.sh`, rung O's runner with the tree as an argument. It runs one JVM per test, one core each (`-XX:ActiveProcessorCount=1`), private caches per shard, `-Xmx4g -Xss64m`, `FORTRESS_THREADS=1`.
- **The trees**: the base passes ran a checkout of the base (its library and its tests), the edit pass this worktree.
- **The comparison**: rung F's comparison with one addition, the two trees' roots replaced by one token (`explorations/compile-ladder/rung-tabulate/compare-normalised.py`). It normalises Java line numbers in stack frames and identity hashes, and maps library positions through the edit's line map.
- **The unstable list**: `XXXInheritedOverload.fss` is listed as unstable, citing row 430.
- **The machine**: each pass is headed by its machine line (`explorations/compile-ladder/rung-tabulate/probes/passes/machine-baseA.txt`, `machine-edit.txt`, `machine-baseB.txt`, `machine-rerun.txt`). The load was 11 to 36, with the three passes overlapping (D7).
- **The re-runs**: seven runs timed out at 600 s and were re-run at 2400 s; every re-run exited 0 (`explorations/compile-ladder/rung-tabulate/probes/passes/rc-distribution.txt`). They were `QuickCheckTest` and `ReflectiveQuickCheckTest` in all three passes, and `RangePrototype` in base A.
- **The caches**: each pass's caches were deleted once its outputs were captured.

**Result** (`explorations/compile-ladder/rung-tabulate/probes/passes/compare-normalised.txt`): `tests 418 same 391 normalised 9 changed 1 unstable 17 missing 0`. Every pass has 338 exits of `rc=0`, 73 of `rc=1` and 7 of `rc=255`, so no exit code changed.
- **Normalised, 9**: `XXXArrayLiteralArgRungC`, `XXXFnRenderRungS`, `XXXRangeBoundsRungO`, `XXXRangeEmptyHashRungO`, `XXXRangeSizeZZ64RungO`, `XXXTupleSevenRungS` and `XXXUnwrittenSumRungF` (library positions moved by the edit), and `taskTrace2` and `taskTrace3` (identity hashes).
- **Unstable, 17**: base A and base B differ, as in rung F's comparison, and the names are the same seventeen: `ArrayListQuick`, `CovCollTest`, `HeapTest`, `PureListQuick`, `QuickCheckTest`, `ShuffleTest`, `SkipListTest`, `TimingTests`, `TreapTest`, `WordCountSmall`, `abortBlock`, `buffons`, `nestedTransactions1` to `4`, and `quicksortTest`. All exit 0 in every pass. `ShuffleTest` is one of the respelled tests, and in every pass each of its printed arrays is a permutation of 0 to 49.
- **Changed, 1**: `XXXInheritedOverload` names its two ambiguous overloads in the other order, and its verdict (an expected failure, `rc=1`) is unchanged. This is row 430's instability, which a library edit is known to flip (FACTS.md, "The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program"). Its outputs are under `explorations/compile-ladder/rung-tabulate/probes/passes/changed/`. By rung D's stop (POSITIONS 2026-09-26) this is a ledger note, not a stop.
- **The respelled tests**: `ArrayOperatorsBesideLibrary`, `ArrayScalarExtension`, `RandomTest`, `matrixOps`, `sparseMatrix` and `vectorOps` print exactly what they printed on the base, and `ShuffleTest` is covered above. So each respelled line keeps its value.

The expectation was no changed output (the judgement's section 4.4), and it holds, apart from row 430's order.

## 12. The two microGPT checks

`explorations/run-c4/src/MicroGptFlatCheck.fss` and `explorations/apl/mg/MicroGptAplCheck.fss` ran under walk, each from an empty cache at `FORTRESS_THREADS=1`, on the base checkout and after the edit (`explorations/compile-ladder/rung-tabulate/mg-run.sh`, `MG_TIMEOUT=10800`). The captures are `explorations/compile-ladder/rung-tabulate/probes/mg-base-MicroGptFlatCheck.txt`, `mg-base-MicroGptAplCheck.txt`, `mg-edit-MicroGptFlatCheck.txt` and `mg-edit-MicroGptAplCheck.txt`, each with its machine line (load 6.4 at the start).

The result: `VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS` for both checks, on the base and after. Their printed values are identical once the machine lines, the timings and the paths are masked (`explorations/compile-ladder/rung-tabulate/probes/mg-compare.txt`, `diff rc=0` twice).

The first base runs, with rung F's 5400 s timeout, were cut off four fifths of the way through at load 30, and were re-run.

## 13. The ladder subset

`explorations/compile-ladder/rung-tabulate/run-subset.sh`, a copy of `repair-r1-atomic-static/run-subset.sh` that does not source `env.sh`, ran over the seven respelled tests (`subset.txt`), on the base checkout and after the edit (`explorations/compile-ladder/rung-tabulate/probes/ladder-compare.txt`). No recorded first error in `explorations/compile-ladder/baseline-2026-09-19/raw/` names `fill` or `tabulate`, so no other file was added.

All seven stop at the compiler's name resolution before and after (`crc=255`), with the same errors, except `matrixOps.fss`. Its three errors at `:27-29` now name `tabulatedArray2` where they named `array2`; the compiler's own prelude declares neither. No ladder file moves.

## 14. Competing declarations

Each new name (`tabulate`, `tabulatedArray1`, `tabulatedArray2`, `tabulatedArray3`, `tabulatedVector`) was grepped as a word (`explorations/compile-ladder/rung-tabulate/probes/names-grep.txt`) over:
- `ProjectFortress/tests/` and every `ProjectFortress/*_tests/`;
- the demos and `SpecData/`;
- `Library/` and `ProjectFortress/LibraryBuiltin/`;
- all of `ProjectFortress/src/com/sun/fortress/`.

Every hit is a line this rung wrote, and no Java or Scala source names `fill` or `tabulate` as a string.

## 15. The three homes

- **Home 1, repaired and asserted.**
  - Under walk, `fill` with a function on an array of element type `Any` called the function at each index instead of storing it (`FillWalk` cases 3, 6 and 7). Three assertions citing `arrays-distributed.tex:53` hold it, at `ProjectFortress/tests/TabulateRungA.fss:47`, `:49` and `:51`.
  - Row 247, `array3`'s two-argument function type: the assertion citing "row 247" at `:33`.
  - The checker's `fill` refusals and the five factory refusals: held by the checker-count stage (`NativeArray` 44 to 0) and the distance stage (A1 244 and A2 58 to 0, factories 5 to 0). Both are gate stages, and the manifest's `testIsStage` makes them this rung's test.
  - The meet's own refusal that the first placement left (section 5): held by the distance stage in the same way.
- **Home 2**: none. No defect this rung met is deferred with the specification settling it in a form a gated test can hold.
- **Home 3 and the ledger**:
  - Row 464: `ProjectFortress/demos/mg.fss:20`. A team demo outside the gate relies on walk's run-time choice between the two forms and now fails there when given a function. This is a program's line, not a defect of the implementation, so no gated test can hold it; the probe is `explorations/compile-ladder/rung-tabulate/probes/demos-compare.txt`.
  - Row 465: walk calls `array3(v)`, an overload the api does not declare. The specification settles it (`Specification/basic/components/source-code.tex:140`, `:175`: an import brings the api's declarations), but neither gated home can hold it: an `XXX` file making the call passes today and would turn the gate red, and a passing test cannot assert a static refusal. The probes are `Array3Value.txt` and `ComponentOnly.txt`.
  - Row 437, the numeral `0` in `matrix(v)`, is rung F's and stays open. The call is renamed and the numeral stays, and its distance row is unchanged.

## 16. Stops

None of the stops the batch record reserves was met:
- no line of `MicroGptFlat.fss` or `MicroGptApl.fss` changed, and no vocabulary or check line beyond the twelve and the four;
- every team test line follows the rename and keeps its value;
- no declaration section 4 names as rung H's or rung B's was edited. In `Library/List.fss`, rung B's declaration is the nullary comprehension operator at `:177`, and this rung's edits are at `mapArr` and `ivmapArr`, `:462-467`;
- no walk output changed, apart from row 430's order;
- no passage of the specification was edited except the figure's row, its callout and its entry.

The standing stops met are lifted by answer 10 (POSITIONS 2026-09-26, answer 10): a library declaration renamed that gated tests use, and team test lines restated with their values.

## 17. How it was run

- **Inherited**: nothing. The branch started at `ff1649cea` with no commit.
- **Build**: `ant compileAll` once (1 min 43 s), with `default_repository/caches/global.map` restored after it. No Java or Scala changed, so there was no rebuild and no bytecode cache.
- **Machine**, for every timing here: `nproc` 4; Intel(R) Xeon(R) Processor @ 2.10GHz, `cpu MHz` 2100.000; OpenJDK 25.0.4; `FORTRESS_THREADS=1`. The load at the start ranged from 1.4 (the build) to 36 (the passes), with two other rungs' workers on the box, and each capture carries its own line. No timing here is a comparison.
- **The base tree**: the base passes, the base microGPT checks, the second base distance run, the base demos and the base ladder ran in a `git worktree add` of `ff1649cea` under `tmp/basetree`, on this worktree's build, which was symlinked in. That checkout has since been removed.
  - The interpreter finds its library through `FORTRESS_AUTOHOME`. Without it, the interpreter derives its home from the canonical path of the classpath (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:34-45`), which is this worktree.
  - A first base pass and a first base microGPT check ran the edited library that way. Both were recognised by their `fill` failures, deleted, and re-run with `FORTRESS_AUTOHOME` set (`explorations/compile-ladder/rung-tabulate/count-run.sh`, `mg-run.sh`).
  - The base ladder run compiles against the compiler's own prelude, which neither tree changed, and its test files were the base's, so it stands.
- **The runner edited during a run**: `count-run.sh` was edited while the three passes were in their final `wait`, then restored byte for byte. Each pass ended with a shell syntax error after its `wait`. Every one of the 1,254 logs has its one `rc=` trailer, and nothing after the `wait` writes a log.
