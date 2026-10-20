<!-- Climb batch 20, rung A: the array sites of the distance by the library's own devices (the leaf fill and tabulate, the library's cast) with decision E's diff of the api's unused sizes, from the array probe's two patches unchanged; a walk guard of the casts at the eight number types. Base 97ccd5f1f; branch wip/rung-array-sites. -->

# Rung A: the array sites by the library's own devices, with decision E's diff

- problem: the distance's 19 array sites and its first export error, climb batch 19's per-site list, `explorations/compile-ladder/gate/distance-sites.tsv:2`, `:4-5`, `:13-27`, `:29`, `:31` (31 at that gate, `explorations/compile-ladder/climb-batch-19/gate/distance.txt:2`), measured 31 to 11 by the array probe (`explorations/perf-probes/array-sites/REPORT.md:6-16`)
- spec: no passage of `Specification/basic` or `basic-lib` names these declarations (`grep -rn 'immutableArray\|array3\|tabulatedVector\|__builtinFactory\|__immutableFactory\|pmul\|rmul\|lmul' Specification --include=*.tex | grep -v library/apis/` prints none of them); beside them, a one-dimensional array of numbers "is a vector" and one of two dimensions "is a matrix", `Specification/basic/expressions/aggregate.tex:152-155`, `:165-166`, and a matching definition's "header and type ... must be the same as the header and type of d", `Specification/basic/components/apis.tex:249-256`
- precedent: `ImmutableArray1`'s leaf `fill` and `tabulate` at its own type, `Library/FortressLibrary.fss:2407-2414`, `.fsi:1580-1581`; `array1`'s arms returning through the library's `cast`, `Library/FortressLibrary.fss:2585-2592` (row 685's fix); the component's own headers of the vector and matrix products, `Library/FortressLibrary.fss:2611-2627`, `:3008-3031`
- deviation: none from the two patches, which are applied unchanged (`git apply` of `explorations/perf-probes/array-sites/ways.patch`, then `e3-rebased.patch`, no fuzz): `Library/FortressLibrary.fss:2525-2540`
- deviation: the leaf `fill` and `tabulate` open `Vector` and `Matrix` in the component and close them in the api, where `ImmutableArray1` puts them mid-trait in both (form only, the probe's): `Library/FortressLibrary.fsi:1624-1625`, `:1746-1747`
- deviation: the guard asserts a column's and a row's type and size, not their elements, on an `Array2` based above zero, where the brief asks for the elements, because the base reads them at the wrong offset (new row NEW-A-1, section 9): `ProjectFortress/tests/VectorMatrixCastsWalk.fss:136-141`
- historical: `Library/FortressLibrary.fss:2522-2535`, `:2551-2568`, `:2697`, `:2701`, `:2835-2914`, `:2945-2950`, `:2976-2977`; `Library/FortressLibrary.fsi:1499-1501`, `:1613-1622`, `:1649-1677`, `:1731-1742`, `:1774-1804`, `:1860` (lines at the base `97ccd5f1f`)

## 1. What changed and why

Two commits on `wip/rung-array-sites`: the tests, `73e47c30d`; the library, `48d809df2`, which is `ways.patch` and then `e3-rebased.patch` applied as they are (`git apply`, no fuzz; `git apply --check -R` of `e3-rebased.patch` on the result passes).

The compiled checker, run over the interpreter's library, refused 19 bodies of the array code and reported 17 api declarations that the component lacks. Each fix is a device the library already uses for the same kind of thing (P-27):

- **1a, the leaf `fill` and `tabulate`.** `Vector` and `Matrix` declare `fill(v:T)` and `tabulate(f)` at their own type, with `StandardMutableArrayType`'s two bodies (`Library/FortressLibrary.fss:2525-2532`, `:2846-2853`; api `.fsi:1624-1625`, `:1746-1747`), as `ImmutableArray1` does at its own. So `vector(v)`, `tabulatedVector`, `rmul` and `lmul`, which build through `vector[\T,s0\]().fill` or `.tabulate`, answer a `Vector` (`:2604`, `:2606`, `:2922`, `:2927`), and `matrix(v)` builds through `matrix[\T,s0,s1\]()` where it called `array2[\T,s0,s1\]()` (`:2993`). Five sites.
- **1c, the library's `cast`** (`Library/FortressLibrary.fss:33-37`) around `Vector`'s `+`, binary and unary `-`, `scale` and `pmul` (`:2534-2540`) and `Matrix`'s `+`, binary and unary `-` and `scale` (`:2855-2859`), whose bodies call the parent's `map` and `ivmap`, typed `Array1` and `Array2`. Nine sites.
- **2a, a `cast` in the size-tested arm:** the `N[\0\]` arm of `__builtinFactory1` and `__immutableFactory1` (`:2562`, `:2573`) and `__builtinFactory2`'s first branch (`:2963`). Three sites.
- **3d, `Col` and `Row`** take `cast[\Array2[\T,0,s0,0,1\]\](self[(b0,i1)#(s0,1)])` and `cast[\Array2[\T,0,1,0,s1\]\](self[(i0,b1)#(1,s1)])` (`:2705`, `:2709`): the range subscript answers the unsized `Array[\T,(ZZ32,ZZ32)\]`, and its value is a 0-based sized `Array2` (`:2676-2683`). Two sites; row 678's own.
- **4d, `immutableArray`'s ranks 2 and 3** inside `(* ... *)` in the api (`.fsi:1500-1503`), as the component has had them since the team's last commit (`.fss:2264-2280`; `a874948ac` `Library/FortressLibrary.fss:1941-1952`). No `ImmutableArray2` or `ImmutableArray3` exists. Two entries of the first export error.
- **4f, `array3[\T, nat s0, nat s1, nat s2\](v:T):Array3[\T,0,s0,0,s1,0,s2\]`** declared in the api (`.fsi:1867`), as `array1(v)` and `array2(v)` are; the component has it (`.fss:3199`). One entry.
- **E3, decision E's diff (P-40):** the api's 17 vector and matrix operators lose their unused sizes (`.fsi:1653-1680`, `:1780-1802`): the vector `+`, binary and unary `-` drop `nat m`; the six vector `DOT` and juxtaposition forms drop `nat m, nat p`; the eight matrix-vector, vector-matrix and scalar forms drop `nat p`. The matrix `+` and `-`, which use their `m`, keep it (`.fsi:1763-1770`). The component's headers already had the shorter form (`.fss:2611-2627`, `:3008-3031`). Fourteen entries; the three vector `+`/`-` lines were never entries.

## 2. The failing runs and the passing runs

**The library's sites: the distance stage.** Its before is climb batch 19's landed tables, not run again (POSITIONS.md, "No re-measuring what the record holds."):

    explorations/compile-ladder/climb-batch-19/gate/distance.txt
    #total	31
    #kind	typecheck	29
    #kind	export	2
    #class	V2	17	arrays: a sized array's body or factory (sizes lost in joins and factories)

The after, on the final tree `48d809df2` (started 2026-10-20T07:23:55Z):

    $ explorations/coordinator/tools/distance/run.sh tmp/rung-array-sites/distance-postedit.txt tmp/rung-array-sites/dist-post
    #total	11
    #kind	typecheck	10
    #kind	export	1
    #seconds	152	FortressLibrary 110

**The guard, `ProjectFortress/tests/VectorMatrixCastsWalk.fss`.** A guard of a behaviour that holds today, so it has no failing run: it passes on the base and after.

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-array-sites/h-guard ProjectFortress/tests/VectorMatrixCastsWalk.fss
    # harness-one 2026-10-20T07:16:32Z; tree 97ccd5f1f; nproc=4; load 0.95 0.73 0.58; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled
    . interpret tmp/rung-array-sites/h-guard/tests/VectorMatrixCastsWalk
    PASS
    OK (1 test)

and, after the edit, in the run of the 42 files of section 5 (`# harness-one 2026-10-20T07:20:21Z; tree 73e47c30d`, the library edit in the working tree, committed unchanged as `48d809df2`):

    . interpret tmp/rung-array-sites/h-walk-new/tests/VectorMatrixCastsWalk
    PASS
     OK (time = 1444ms)
    OK (42 tests)

At each of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`, through generic helpers called with the type written (`vectorOps[\T\]`, `matrixOps[\T\]`, `slices[\T\]`, `factories[\T\]`), it asserts the type and the elements of: `Vector`'s `+`, binary and unary `-`, `scale`, `pmul`, `fill` and `tabulate`; `Matrix`'s the same, with `rmul` and `lmul`; `vector(v)`, `tabulatedVector` and `matrix(v)` (diagonal and zero); a transposed matrix and its `+`; `a[:, j]` and `a[i, :]` of a matrix; both arms of `__builtinFactory1`, called at base 0 and 1 and reached through `map` of a 0-based column and of a 1-based subarray; both arms of `__immutableFactory1`; and `__builtinFactory2` at base (0,0) and (1,1), with a column and a row of the latter. The values: 5, 2 and 3 at the five integer types (by `widen`, `unsigned` and `big`), 5/2, 1/2 and 3/4 at `QQ`, 5.0, 2.0 and 0.75 at `RR32` (by `narrow`), 2.5, 0.5 and 0.75 at `RR64`; each type holds each value exactly, and every sum, difference and product the helpers form. The unsigned types meet unary minus on an array of zeros: an unsigned type negates only zero (a nonzero one raises `IntegerOverflow` in the element's own `-`, inside `map`, before any cast), so the vector's and the matrix's unary minus are asserted at `NN32` and `NN64` on `fill(0)`.

**The new expected failure, `ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss`** (row NEW-A-1, section 9), on the base's code:

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-array-sites/h-xxx ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss
    # harness-one 2026-10-20T07:17:05Z; tree 97ccd5f1f; nproc=4; load 1.14 0.80 0.61; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    FAIL: a Int: 22 =/= a Int: 11; the column's first element is a[b0,b1]; ranges.tex, implicit ranges: the range : is treated as l:u
     OK Saw expected exception
    OK (1 test)

and shown red on a deliberate fix through the same command: `sliceAt[\1,1\]()` changed for one run to `sliceAt[\0,0\]()`, where the defect does not show, then restored:

    PASS
     Missing expected failure
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

After the edit it still fails as expected (the 42-file run: `FAIL: a Int: 22 =/= a Int: 11; ...`, ` OK Saw expected exception`).

## 3. Where the fix belongs, and the precedent

- **The place.** The library: the bodies, factories and api declarations the checker refuses are in `Library/FortressLibrary.fss` and `.fsi`, walk's library, which the compiled path will check at the switch-over (the map's arrays row, `explorations/coordinator/map/spec-to-implementation.md:329`: library `Library/FortressLibrary.fsi`, compiler prelude "absent"). No checker change clears them: `Array1[\T,0,s0\]` is a supertype of `Vector[\T,s0\]`, and a rule that accepted it as `Vector` would accept a non-vector array (the ways note, section 1, way 6).
- **The ways the language and the library offer**, each with its evidence in the ways note (`explorations/reviews/array-sites-ways.md`, sections 1 to 5): for the 14 bodies, 1a the leaf redeclaration, 1b the bodies through the factory's `tabulate`, 1c the `cast`, 1d `map` overloaded at the element type, 1e a self type on the leaves; for the 3 arms, 2a the `cast`, 2b a checker that refines a size in the arm, 2c overloading on the witness, 2d no branch, 2e an `if` that refines; for `Col` and `Row`, 3a a `SubArray2` at the run-time offset, 3b the receiver's `subarray` with the offset opened, 3c `Col` and `Row` over the unsized array, 3d the `cast`, 3e a sized subscript result; for the first export error, 4a decision E's diff, 4b the component carrying the unused sizes, 4c an export check that ignores them, 4d the two ranks commented out, 4e the two ranks built, 4f `array3(v)` declared. The rung builds 1a with 1c, 2a, 3d, 4a, 4d and 4f: the batch record's forks 4 to 6 and P-40.
- **The precedents and their sites.** The `cast` that gives a factory's result its sized type is row 685's fix (`a0f839ad7`): at the base the component calls `cast` 38 times (39 lines with its declaration at `:33`: `array1`'s 8 arms, `array2`'s 8, `additiveIdentity`'s 18, `openRange`'s 3 and one at `:4394`), and after this rung 52 (53 lines: 9 bodies, 3 arms, `Col` and `Row`). The leaf `fill` and `tabulate` had one precedent, `ImmutableArray1` (`f3b62bc83`); with this rung three leaves declare them. Of the defect these precedents repaired, a sized array's body or factory typed by an unsized or parent type (the distance's class V2, and `Col` and `Row` in class OT), no site remains in the distance (section 4).

## 4. The checker count and the distance

Neither stage was run on the base (POSITIONS.md, "No re-measuring what the record holds."): the before is climb batch 19's gate, `explorations/compile-ladder/climb-batch-19/gate/checker-count.txt` and `distance.txt`, and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv`. Each stage ran once, on `48d809df2`. The machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`, under `nice -n 19`, beside rung I's agent.

**The count**, 28 to 9, as the brief read it:

    $ time explorations/coordinator/tools/checker-count/run.sh tmp/rung-array-sites/checker-count-postedit.txt tmp/rung-array-sites/cc-post
    $ diff explorations/compile-ladder/climb-batch-19/gate/checker-count.txt tmp/rung-array-sites/checker-count-postedit.txt
    14,15c14,15
    < #total	28
    < #locations	27
    ---
    > #total	9
    > #locations	8

Every api row stays at 0 and the crash line at `none`. **The count stage's seconds: 67** (`real 1m7.256s`, `user 1m47.243s`; load at start 2.97 2.64 1.48), against about 64 s at climb batch 19's gate (the brief). No checker code changed, so no speed pass (the batch record's fork 17).

**The distance**, 31 to 11, nothing come:

    $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-19/gate/distance.txt tmp/rung-array-sites/distance-postedit.txt
    DISTANCE DOWN   31 -> 11 (-20)
        kind typecheck               29 -> 10     (-19)
        kind export                   2 -> 1      (-1)
        class X1                      2 -> 1      (-1)  export: component against api
        class V2                     17 -> 0      (-17)  arrays: a sized array's body or factory (sizes lost in joins and factories)
        class OT                      9 -> 7      (-2)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary     30 -> 10     (-20)

The stage took 152 s (FortressLibrary 110), against 153 (111) at the landed gate.

**Site by site**, `tmp/rung-array-sites/dist-post/errors.tsv` read against the landed list by row (row 577), with `explorations/perf-probes/array-sites/compare-sites.py`:

    $ python3 explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/rung-array-sites/dist-post/errors.tsv
    landed 31 now 11
    export 'does not define all declarations': landed 17 entries, now 0
    export 'are not matched by the declarations': landed 44 entries, now 44

Gone, 20 rows of the landed list, at their landed lines:
- row 2, the first export error at `FortressLibrary.fss:12`, all 17 entries: the 7 vector and matrix `DOT` forms and 7 juxtapositions with `nat n, nat m, nat p` (E3), `array3[\T,nat s0,nat s1,nat s2\]()` (4f), and `immutableArray[\E\](x,y)` and `(x,y,z)` (4d);
- rows 4 and 5, `Col` at `:2697` and `Row` at `:2701` (3d; row 678);
- rows 13 to 21, "Function body has type Array1[...], but declared return type is Vector[...]" at `:2526`, `:2528`, `:2529`, `:2530`, `:2532` (1c), `:2596`, `:2598`, `:2903`, `:2908` (1a);
- rows 22 to 26, "... Array2[\T,0,s0,0,s1\], but declared return type is Matrix[\T,s0,s1\]" at `:2839`, `:2841`, `:2842`, `:2843` (1c) and `:2977` (1a);
- rows 27, 29 and 31, the three `OR(...)` arms at `:2551`, `:2562`, `:2946` (2a).

Stay, 11 rows, each with its landed message: row 3, the second export error at `:12`, its 44 entries the same; rows 6, 7, 12 and 32 at `:642` and `:643`; rows 8 and 9, `BIG MIN` at `:4368` and `:4374`, now `:4384` and `:4390`; rows 10 and 11 at `:4540` and `:4556`, now `:4556` and `:4572` (the 16 lines the rung adds above them); row 28 at `:1463`; row 30 at `List.fss:146`. **Come: none.**

These are the probe's numbers, site for site (`explorations/perf-probes/array-sites/REPORT.md:6-16`, step 2).

## 5. Old against new

- **Walk's array tests.** The 40 files the probe ran (each `ProjectFortress/tests/*.fss` whose text holds `Vector`, `Matrix` or `DOT`, with `subArray` and `Array2SubscriptInBounds`), with the guard and the new `XXX` test, 42 files in one harness call per code state, each from an empty cache (`COLD_CACHE=1`): on the base's code before the library edit (`tree 73e47c30d`, tests only; 2026-10-20T07:18:19Z) and on the edit (2026-10-20T07:20:21Z). Both: `OK (42 tests)`, `exit=0`. Compared test by test with the masks of the skill's `gate.md`, "Comparing with an earlier run" (`Operation took`, `@` hashes, library line numbers): 40 of 42 equal; `HeapTest` prints `nanoTime` timings and `QuickCheckTest` random draws, both on `explorations/coordinator/tools/count-run/unstable.txt`; `RangePrototype` equal up to the order of its lines, from four threads. `XXXArrayInferredElementVectorWalk` still fails as expected with the same message; `ArrayFactoryAbstractNumber` (row 685) passes on both. No value and no verdict moves; no test's message changes.
- **`ant testSystem`**, once, on the final tree: `BUILD SUCCESSFUL`, `Total time: 6 minutes 19 seconds`; shards of 162, 173, 165 and 166 tests, 666 in all, 0 failures and 0 errors (climb batch 19's gate: 664; the two new files).
- **`ant testSpecData`**, once (P-124): `Tests run: 130, Failures: 0, Errors: 0`, `BUILD SUCCESSFUL`, `Total time: 1 minute 9 seconds`.
- **microGPT's quick pair** under walk, `explorations/coordinator/tools/mg-run.sh tmp/rung-array-sites/mg new`: `MicroGptFlatQuick` `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0 secs=74`; `MicroGptAplQuick` the same verdict, `rc=0 secs=82`. No model line changed (P-87).
- **Row 465's example**, `array3[\ZZ32,2,2,2\](5)`, runs under walk on the edit and answers an `Array3[\ZZ32,0,2,0,2,0,2\]` holding 5 (a scratch program printing `array3(v) 5 true`); the api now declares the call.
- **The compiled tracks** (compiler, library, other-compiler) were not run: the edit changes no Java or Scala, and no compiled test imports `FortressLibrary` (`grep -l 'import FortressLibrary\|FortressLibrary\.'` over `ProjectFortress/{compiler,library,other_compiler,parser}_tests/*.fs?` lists 8 files, each naming it only in a comment). They are the gate's.

## 6. The ladder

The rung's own subset, after the edit only (the skill's `gate.md`, "The ladder regression"), the drivers copied under `tmp/rung-array-sites/ladder/` with copies of the tree's caches:

- **The 17 files** whose recorded first error in the baseline names a declaration the api change touches (`Vector`, `Matrix`, juxtaposition, `Array1`, `Array2`; `awk` over `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`, Java `cannot be cast` messages left out): `AfterTypeChecking`, `ColonOperator`, `ImplicitBlocks`, `InferTest`, `ReplicaTest`, `arrayTest0`, `genericTest3`, `ho`, `nativeArrayTest`, `nativeImmutableArrayTest`, `objectExprMystery`, `primOverloadTest`, `rangeOperators`, `rightOverload`, `typeTests`, `wrongOverload`, `zeno`. Each error is the compiled path's, against its own library (`CompilerLibrary.Array1`, "Array1 is undefined.", the prelude's juxtaposition), which this rung does not touch. None is among the gate's 85, so they are compared with the baseline's `ladder.tsv`: all 17 at the same phase with the same first error, `typeTests`' error differing only in the tree's path within it.
- **The eighteen microGPT components' phase step** (`microgpt-phase.sh`, `microgpt-phase.py`), since a `Library` api changes (`explorations/reviews/batch-19-review.md`, finding 6): every phase and first error equal to `explorations/compile-ladder/climb-batch-19/gate/ladder/microgpt-phase.md` (a `diff` of the two tables' file, phase and first-error columns prints nothing): all 18 at disambiguate, with "Array is undefined.", "Char is undefined.", "ImmutableArray is undefined.", "DelegatedIndexed is undefined." and "Vector is undefined." as there.

## 7. What the specification settles, and the sentences made false

The specification names none of the declarations (the grep of the provenance's spec line). Part IV is the api rendered (`Specification/library/default-libraries.tex:27`), so it changes with the api without an edit: the two `immutableArray` ranks leave it, `array3(v)` and `Vector`'s and `Matrix`'s `fill` and `tabulate` join it, and the 17 operators' headers lose their unused sizes (section 8). The arrays chapter's table of `fill` and `tabulate` (`Specification/advanced/parallelism-locality/arrays-distributed.tex:51-56`) and Appendix I's "Initializing an array from a function" (`Specification/appendices/changes.tex:1245-1281`) stay true: a vector's `fill` takes a value and its `tabulate` a function of the index. That a vector's and a matrix's operations answer a vector and a matrix is what `aggregate.tex:152-155`, `:165-166` say they are. `apis.tex:249-256` asks for the same header in the api and the component; E3, 4d and 4f bring the api to the component's headers.

**Sentences of the specification made false: none.** No Appendix I effect, `\revision` or `\note` names these declarations or the export check's verdict on them (`grep -n -i 'unused size\|dead size\|export check\|does not define all\|ImmutableArray2\|column extraction' Specification/appendices/*.tex Specification/basic/*.tex Specification/basic/*/*.tex Specification/advanced/*/*.tex Specification/library/*.tex` prints nothing).

**Sentences of the record made false**, for the gather (no skill sentence: the skill's `library.md:26` and `revival-changes.md:79-83` on `fill` and `tabulate` stay true):
- F-35, "The `FortressLibrary` api has 25 declarations with a dead size": 8 now; and "Six vector `DOT` and juxtaposition operators have this shape, `[\T, nat n, nat m, nat p\]` in the api and `[\T, nat n\]` in the component, and give one of the distance's export errors (F-53)": the api has the component's shape, and that export error is gone (`explorations/coordinator/FACTS.md:28`).
- F-260, "After climb batch 19, `fill` and `tabulate` redeclared ... take the distance from 31 to 12 ... E3 re-based ... then give 11": the ways are built, 31 to 11 on the tree (`FACTS.md:191`).
- F-53, "The distance to the switch-over is 31 errors and the checker count is 28": 11 and 9 once the gate lands (`FACTS.md:46`).
- F-54, "the sized arrays and the one-off body errors lead": class V2 is 0 (`FACTS.md:47`).
- F-58, "3 `DOT` calls that fail on the api's unused sizes (F-35)": by reading E3 clears them (the ways note, 4a, citing `array-design-ways.md:54`); not measured here (`FACTS.md:51`).
- F-158, "`fill` takes a value and `tabulate` a function, both defined where the array diamond meets ... `StandardMutableArrayType` and `ImmutableArray1` ... define them": `Vector` and `Matrix` now also declare them at their own type (`FACTS.md:188`); and PLAN's "`fill` and `tabulate` sit where the array diamond meets, `StandardMutableArrayType` and `ImmutableArray1`, not in each leaf trait" (`explorations/coordinator/PLAN.md:198`, review-queue item 112): two more leaves declare them; the meet keeps its bodies, so either answer to item 112 stands (the ways note, 1a).
- PLAN's phase 3 entry "The arrays' 21 sites by the library's own devices ... and the first export error's 14 unused sizes by decision E's diff" (`PLAN.md:67`) and item 12, "built with the array sites' fixes from `perf-probes/array-sites/e3-rebased.patch`" (`PLAN.md:134`): built.
- Row 678's claim, that the checker refuses both calls: no longer (closed by the gather).
- Row 465's example: now a declared call (its note, record.md).

## 8. Points to report

1. **The two patches taken as they are**: `ways.patch` then `e3-rebased.patch`, by `git apply`, unchanged (`48d809df2`; `Library/FortressLibrary.fss:2525-2540`). Their measured text is the batch's default (fork 4), they apply at this base with no fuzz, and the guard and the stages found nothing to change.
2. **The distance and count tables, before and after**, site by site and the first export error entry by entry: section 4. Distance 31 to 11, count 28 to 9. No site comes.
3. **The count stage's seconds**: 67 s on the tree, against about 64 s at the landed gate (section 4).
4. **Walk**: no value moves, no cast fails at any of the eight element types, no test's message or verdict changes (section 5).
5. **The declarations that leave or join the api, and so Part IV**: `immutableArray[\E\](x:ZZ32,y:ZZ32)` and `(x,y,z)` leave (`Library/FortressLibrary.fsi:1500-1503`, fork 5); `array3[\T, nat s0, nat s1, nat s2\](v:T)` joins (`.fsi:1867`); `Vector`'s `fill(v:T):Vector[\T,s0\]` and `tabulate(f:ZZ32->T):Vector[\T,s0\]`, and `Matrix`'s `fill(v:T):Matrix[\T,s0,s1\]` and `tabulate(f:(ZZ32,ZZ32)->T):Matrix[\T,s0,s1\]` join (`.fsi:1624-1625`, `:1746-1747`); the 17 operators' headers lose `nat m`, `nat m, nat p` or `nat p` (`.fsi:1653-1680`, `:1780-1802`).
6. **Sentences made false**: none of the specification; those of the record in section 7.
7. **A ladder file, compiled test, specification example or microGPT component whose verdict, phase or first error changes**: none (sections 5 and 6).
8. **A file edited beyond those named**: `ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss`, a second new test beside the guard, the gated home of the defect the guard met (row NEW-A-1; section 9). No edit of the number traits, walk, the checker or the code generator.
9. **The guard's reach at a base above zero** is its type and size, not its elements (the provenance's third deviation): the base reads them at the wrong offset (row NEW-A-1).

## 9. Defects and their homes

- **The 19 array sites and the first export error** (the landed list's rows 2, 4, 5, 13-27, 29, 31): home 1, repaired by this change; its test is the distance stage on the tree, with `VectorMatrixCastsWalk` guarding walk's values. Row 678 is among them, closed by the gather with the guard's column and row assertions (`ProjectFortress/tests/VectorMatrixCastsWalk.fss:127-141`) and its two sites gone.
- **NEW-A-1: a column, a row or a range subscript of an `Array2` based above zero reads the wrong elements under walk.** On a 2 by 3 array based at (1,1) with `a[i,j] = 10 i + j`, `(a[:,1])[0]` is 22 where `a[1,1]` is 11, `(a[1,:])[0]` and `[1]` are 22 and 23, and the next element of each raises Java's `ArrayIndexOutOfBoundsException` ("Index 7 out of bounds for length 6", "Index 6 out of bounds for length 6"; scratch programs run on the old code through `old-fortress.sh`). The cause, by reading: `Array2.subarray` passes the offset `(o0,o1)`, which the range subscript gives in the array's own index space, to `SubArray2`, whose offsets are 0-based ("m_i, o_i are multiplier and offset (0-based)"), with no `- b0` (`Library/FortressLibrary.fss:2727-2731`, `:2795`), where `Array1.subarray` subtracts it (`:2454-2457`); both the team's code (before the conversion's cut, `5a68404fd`; `a874948ac` `Library/FortressLibrary.fss:2384` and `:2122`). `Array3.subarray` has the same shape (`:3128-3133`), not measured. Every 0-based array, and so every matrix, is unaffected. Home 2: the specification settles the answer, "The implicit range `:` is treated as `l:u`" for an axis whose lower bound is `l` (`Specification/basic/expressions/ranges.tex:115-119`), so `a[:, j]` holds `a[l..u, j]`; the gated `XXX` test asserts it and fails today (section 2). Its row is NEW-A-1 in `record.md`. The fix is not this rung's: `Array2.subarray` is outside its files. The compiled path's library has no `Array2`.
- **Found on the way, outside the tree:** the probe's `explorations/perf-probes/array-sites/compare-walk.py:9` starts a test's block only at a line that begins `. interpret`, so a test whose `interpret` line follows a lone `.` progress line is folded into the block before it; on these two runs it reported `ArrayScalarExtension`, `TabulateRungA`, `wrongOverload`, `realArith` and `XXXArrayInferredElementVectorWalk` as differing where they are equal. The comparison of section 5 used a parser that matches `interpret` anywhere in a line and drops blank and `.` lines (scratch). It is a script of the record, not the tree, so it takes no home; the probe's own "differ by the blank line" entry for `FixedWidthOverflowRungB` and `RationalTest` (`explorations/perf-probes/array-sites/REPORT.md:112`) has this cause.

## 10. Decisions

1. **The two patches unchanged**, not improved. Ways not taken: the leaf `fill` and `tabulate` placed mid-trait as `ImmutableArray1` has them (form only); `ways.patch` without E3 (the first export error would stay; P-40 takes E3). Evidence: fork 4's default is "as the patch"; the measured text is the probe's; the guard and the stages found nothing to change.
2. **The guard through generic helpers called with the element type written** (`each[\ZZ32\](...)` to `each[\RR64\](...)`), not eight copies of concrete code, nor helpers whose type walk infers from the arguments. Evidence: an inferred `T` would be the values' run-time class (a `QQ` value is a ratio object, an `NN64` an `UnsignedLong`), which may not meet `MultiplicativeRing[\T\]`; with `T` written, `vector[\T,2\]()` and `cast[\Vector[\T,s0\]\]` run at exactly the eight types the bound admits.
3. **The unsigned types' unary minus on zeros**, not left out at those types and not asserted to raise. Evidence: a nonzero unsigned negation raises in the element's `-` inside `map`, before the cast the guard must reach; on zeros the cast is reached and answers the leaf type.
4. **The guard covers `__immutableFactory1`'s and `__builtinFactory2`'s casts too**, beside the brief's list, since 2a puts a cast in each; the alternative was the brief's list alone. Every `assert` with a message reaches `__immutableFactory1` through varargs (`Library/FortressLibrary.fss:307`), so it was reached already.
5. **At a base above zero the guard asserts type and size, and a separate `XXX` test the elements.** Ways not taken: fixing `Array2.subarray` (outside the rung's files, which list `Vector`, the two factories, `Col` and `Row`, `Matrix`, `__builtinFactory2` and `matrix(v)` "only"); asserting today's wrong elements in the guard (a guard asserts what is right); dropping the base-above-zero column and row (the brief asks for the cast's reach there, where the cast's base-0 type differs from the receiver's base).
6. **NEW-A-1's home is 2, not 3.** Evidence: `ranges.tex:115-119` gives `:` as `l:u` for the axis's lower bound `l`, which settles which elements a column holds; row 678's "silent" is about the subscript's static type, not its elements.
7. **The ladder subset is the 17 files whose baseline first error names `Vector`, `Matrix`, juxtaposition, `Array1` or `Array2`**, not an empty subset. Evidence: by reading those errors name the compiled path's own library, so none was expected to move; running them shows it.
8. **No `ant testQuick`.** Evidence: no Java or Scala changed; no compiled test imports `FortressLibrary` (section 5); the brief's "After the change" names `ant testSystem` and `ant testSpecData`, and its step 6 runs the checker's suite only for a checker edit. The gate runs the compiled tracks.
9. **The walk comparison by a parser of my own**, not `compare-walk.py` as it is (section 9, found on the way).

No decision of the curator is reversed or bent; the forks taken are the batch record's 4 to 6 at their defaults, and P-40's E3.

## 11. For FACTS

- The array code's 19 typecheck sites and the api's first export error are gone from the distance: `Vector` and `Matrix` redeclare `fill` and `tabulate` at their own type, the library's `cast` types 9 parent-typed bodies, 3 factory arms and `Col`'s and `Row`'s subscript value, and the api drops its 17 operators' unused sizes, comments out `immutableArray`'s ranks 2 and 3 and declares `array3(v)`. It means the distance's class V2 is empty and its first export error gone; the 11 sites that stay are none of the array code. Numbers: distance 31 to 11 (typecheck 29 to 10, export 2 to 1), count 28 to 9, nothing come. Test: `ProjectFortress/tests/VectorMatrixCastsWalk.fss` (walk's values at the eight number types) and the distance stage. Detail: this report, sections 2 and 4. It replaces F-260's measurement by the built change, and corrects F-35's two sentences (section 7).
- Under walk, a column, a row or a range subscript of an `Array2` based above zero reads at the array's base as an extra offset (row NEW-A-1). Test: `ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss`. Detail: section 9.

## 12. Commands worked out

- The comparison of two harness runs test by test, with the skill's masks, whose block parser matches `interpret <path>/tests/<name>` anywhere in a line and drops blank and `.` lines: a 25-line Python script, `tmp/rung-array-sites/scripts/cmpwalk.py` (scratch), run as `python3 -I tmp/rung-array-sites/scripts/cmpwalk.py <base log> <new log>`.
- The ladder subset's list: `awk -F'\t' 'NR>1 && $11 ~ /Vector|Matrix|juxtaposition|Array1|Array2|DOT|immutableArray|array3/ && $11 !~ /cannot be cast/ {print $1"\t"$2}' explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`.
- REPORT.md and record.md could not be written: the harness refused the write ("Subagents should return findings as text, not write report files"); their text is the rung's result, for the skeptic to write onto the branch.
