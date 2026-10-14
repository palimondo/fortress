problem: the distance stage's four `wellformed` sites of row 685, `Vector[\T,s0\]` and `Matrix[\T,s0,s1\]` against `Number` and `MultiplicativeRing[\T\]`, at the last landed gate (`explorations/compile-ladder/gate/distance-sites.tsv:48-49`, `:54-55`; `explorations/compile-ladder/climb-batch-14/gate/distance.txt:9`), which the checker probe traced to the library's two calls (`explorations/perf-probes/checker-bound-defects/REPORT.md:115`); and row 704, the value the revival's own test pinned (`ProjectFortress/tests/IntMapUplusSingleton.fss:24-25` at ee1aa1a95)
spec: `Specification/basic/trait-parameters.tex:39-49` ("Type Parameters": a type parameter's bound is its `extends` clause), with `Specification/basic/inference.tex:56-58` (an instance "whose static arguments satisfy their bounds"); for `IntMap` none, the text names no `IntMap` (`grep -rn IntMap Specification` prints nothing), and what `UPLUS` by `addNew` meets is a map comprehension's repeated key, `Specification/basic/expressions/comprehensions.tex:78-80`
precedent: `additiveIdentity`, a `typecase` over a witness of its result type with one arm per number type, each value built at that type and returned through `cast` (`Library/FortressLibrary.fss:3229-3244` at ee1aa1a95, `:3245-3260` now); `NodeIM`'s own `addNew` (`Library/IntMap.fss:488-490`), which `SingletonIM`'s `UPLUS` already calls (`Library/IntMap.fss:339-340`)
deviation: the witness is of the factory's result type, `__thrower[\Array1[\T,0,s0\]\]`, so each arm matches `T` exactly, where the checker probe's patch took a witness of `T`, `__thrower[\T\]`, whose arms also match a type below a number type and then threw `CastError` at the `cast` (section 4); `Library/FortressLibrary.fss:2455-2464`, `:2834-2843`
deviation: the team's comment "TODO: fix when Number is covariant" is replaced by a comment that says what the factory does; `Library/FortressLibrary.fss:2451-2453`, `:2832`
historical: `Library/FortressLibrary.fss`, `Library/IntMap.fss`, `Specification/appendices/future.tex`, `Specification/appendices/changes.tex` (all present at a874948ac); none other

# Climb batch 15, rung L: the library's array factories and IntMap's disjoint union (rows 685 and 704)

Branch `wip/rung-library-factories`, cut from ee1aa1a95 and seeded from `/home/user/fortress-base15` by `seed-worktree.sh` (exit 0, "seeded from /home/user/fortress-base15 (ee1aa1a95) in 11 s"). Commits, all pushed: the tests `052c18fc3`, the library `787bf3588`, the specification `f1cb33933`, the open-range expected failure `b92180717`. The harness refused the worker's write of this report and of `record.md`; their text is in the rung's result.

## 1. What changed, and why

**Row 685, `array1` and `array2` (`Library/FortressLibrary.fss:2451-2465`, `:2832-2844`).** The team's two factories chose a vector or a matrix by `typecase __thrower[\T\] of () -> Number => vector[\T,s0\]()` (and `matrix[\T,s0,s1\]()`), under the team's comment "TODO: fix when Number is covariant" (`Library/FortressLibrary.fss:2451-2456`, `:2823-2828` at ee1aa1a95; `:2239-2244`, `:2599-2604` at a874948ac). The `typecase` does not bound `T`, so the call instantiates `vector`, whose element type is bounded by `{ Number, MultiplicativeRing[\T\] }` (`Library/FortressLibrary.fsi:1613`, `:1644`), at an unbounded `T`: an instance the bound refuses, which the compiled checker reports four times (two calls, two bounds each), at the callee's declared result. Now each factory has one arm per number type, `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`, over a witness of its result type:

    array1[\T, nat s0\]():Array1[\T,0,s0\] =
        typecase __thrower[\Array1[\T,0,s0\]\] of
            () -> Array1[\ZZ32,0,s0\] => cast[\Array1[\T,0,s0\]\](vector[\ZZ32,s0\]())
            ... one arm for each of the other seven ...
            else => PrimitiveArray[\T,s0\]()
        end

`array2` is the same with `Array2[\T,0,s0,0,s1\]`, `matrix` and its unchanged `else` arm, `__DefaultArray2`. Each of the eight types satisfies the family's bound (`Library/FortressLibrary.fsi:296-297`, `:446`, `:532`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47`). `Array1` and `Array2` are invariant, so an arm matches only where `T` is that number type, and there the `cast` cannot fail.

What changes under walk: the eight number types keep their vectors and matrices (`ArrayFactoryNumberTypes`, green on the base and after). Every other element type gets the plain array, as `String` always did: an abstract number type such as `Number` or `AnyIntegral`, where the base gave a `Vector[\Number,2\]`, a type that the family's bound makes ill-formed (`ArrayFactoryAbstractNumber`, red on the base); and a type below a number type, such as `Int`, the class at which walk instantiates `T` from a `ZZ32` value (row 364), where the base gave the equally ill-formed `Vector[\Int,3\]` (sections 4 and 6).

**Row 704, `NodeIM`'s `UPLUS` with a `SingletonIM` (`Library/IntMap.fss:520`).** It was `self.add(other)`, and `add` keeps a key the map already holds (`:297-298`), so a many-entry map `UPLUS` a one-entry map on a shared key kept the many-entry map's value, while the reverse order threw through `SingletonIM`'s `other.addNew(self)` (`:339-340`). Now it is `self.addNew(other)`, which throws `KeyOverlap` on a shared key (`:488-490`, `:300-302`), as the comment above the three declarations says (`:517-518`): "%UPLUS% (disjoint union) throws the %KeyOverlap% exception when a key occurs in both maps." Two many-entry maps reach the same line through `nodeNode` (`:521-524`), so both orders of keys 2 to 7 and keys 0, 3, ..., 15 now throw (`IntMapUplusManyEntry`). `fromCC` builds every `IntMap` comprehension, and the map expression `{k |-> v, ...}` through it, by `UPLUS` (`:723-730`), so a repeated key now throws `KeyOverlap` in every order of the entries (`IntMapComprehensionRepeatedKey`), as `Map`'s comprehension throws on any repeated key (`Library/Map.fss:161-168`).

## 2. The tests: failing on the base, passing after

Written first and committed before the edit (`052c18fc3`), all in `ProjectFortress/tests/`:

- `ArrayFactoryNumberTypes.fss`: the eight number types give a vector through `array1` and a matrix through `array2`; `array` with run-time sizes gives a vector and a matrix; `String` gives plain arrays; a `ZZ32` vector has its `DOT`; and an array built at a `T` inferred from a `ZZ32` argument holds its values. A guard, green on the base and after.
- `ArrayFactoryAbstractNumber.fss`: `array1[\Number,2\]()`, `array1[\AnyIntegral,2\]()`, `array2[\Number,2,2\]()` and `array[\Number\](3)` are plain arrays, and a plain `Number` array holds a `ZZ32` and an `RR64` element. Red on the base.
- `IntMapUplusSingleton.fss`, the revival's test: its two lines that pinned today's value now assert the throw (the pins, section 8). Red on the base.
- `IntMapUplusManyEntry.fss`: keys 2 to 7 `UPLUS` keys 0, 3, ..., 15 throws `KeyOverlap` in both orders; two many-entry maps on disjoint keys hold every entry in both orders. Red on the base.
- `IntMapComprehensionRepeatedKey.fss`: a comprehension whose key 0 repeats last with a different value, one whose keys 0 and 1 each repeat, and a map expression whose key 0 repeats each throw `KeyOverlap`; a comprehension with distinct keys holds four entries. Red on the base, on its first assertion. The order of the shapes decided on the base: `{k MOD 3 |-> k | k <- 0#4}` and the map expression kept a value, while `{k MOD 2 |-> k | k <- 0#4}` already threw (section 6).
- `XXXArrayInferredElementVectorWalk.fss` (expected failure; row 364): the array that `array[\T\]` builds at a `T` inferred from a `ZZ32` argument is a vector, as the specification gives it. Red on the base, where it was a `Vector[\Int,3\]`; green after.
- `XXXOpenRangeInferredIndexWalk.fss` (expected failure; row 364; `b92180717`): `openRange[\I\]()` at an `I` inferred from a `ZZ32` argument is a `ZZ32` open range. Green on the base and after: `openRange`'s container `cast` throws `CastError` at walk's `Int` (section 4).

The failing run, on the base before any library edit (2026-10-14T12:42:45Z):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-library-factories/h-base ProjectFortress/tests/ArrayFactoryNumberTypes.fss ProjectFortress/tests/ArrayFactoryAbstractNumber.fss ProjectFortress/tests/XXXArrayInferredElementVectorWalk.fss ProjectFortress/tests/IntMapUplusSingleton.fss ProjectFortress/tests/IntMapUplusManyEntry.fss ProjectFortress/tests/IntMapComprehensionRepeatedKey.fss
    FAIL: a Boolean: true =/= a Boolean: false; array1 at Number gives a plain array (trait-parameters.tex, section "Type Parameters")
    FAIL: a Boolean: false =/= a Boolean: true; a map comprehension whose key 0 repeats last with a different value throws KeyOverlap (comprehensions.tex, section "Comprehensions")
    FAIL: a Boolean: false =/= a Boolean: true; keys 2 to 7 UPLUS keys 0, 3, ..., 15 throws KeyOverlap on a shared key
    FAIL: J12/0:no exception =/= J36/0:IntMap.KeyOverlap: 1 |-> 1 and |-> 9; a many-entry map UPLUS a one-entry map holding its key throws KeyOverlap
    Tests run: 6,  Failures: 5,  Errors: 0

The fifth failure is the expected failure's "Missing expected failure"; `ArrayFactoryNumberTypes` passed. The guard's last assertion, added after the edit, was run on the old code: `FORTRESS_HOME=/home/user/fortress-base15 /home/user/fortress-base15/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-library-factories/old-harness $PWD/ProjectFortress/tests/ArrayFactoryNumberTypes.fss` prints `OK (1 test)`.

The passing run, after the edit (`787bf3588`, 2026-10-14T12:45:44Z), with the team's and the revival's `IntMap` tests:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-library-factories/h-edit (the six files above) ProjectFortress/tests/IntMapTest.fss ProjectFortress/tests/IntMapCombine.fss ProjectFortress/tests/IntMapSymdiffSingleton.fss ProjectFortress/tests/IntMapSymdiffManyEntry.fss
    OK (10 tests)

`XXXArrayInferredElementVectorWalk` fails there at its second assertion ("an array of three at a T inferred from a ZZ32 argument is a vector"), and the harness reports "OK Saw expected exception". Changed for one run to write `filled[\ZZ32\](z)` in that assertion, then restored, the harness reported it red: "PASS / Missing expected failure", `Tests run: 1,  Failures: 1`. `XXXOpenRangeInferredIndexWalk`, run alone on the edited tree and on the old code: "FortressException: CastError / OK Saw expected exception", `OK (1 test)` on both.

The four sites' test is the two stages (section 3).

## 3. The checker count and the distance

Both ran once, on the final library (`787bf3588`; the later commits change only tests and text), with the brief's commands, into `tmp/rung-library-factories/`.

**The count.** Its table is the landed one, line for line: `diff explorations/compile-ladder/climb-batch-14/gate/checker-count.txt tmp/rung-library-factories/checker-count-postedit.txt` prints nothing.

    #total	1
    #locations	1
    #crash	none

Its one error is still `__bigOperator`'s `body(i)`: "FortressLibrary.fss:1314:10: Missing parameter type for i". The run took about 361 s (12:54:28 to 13:00:29 UTC; `nproc` 4, Intel Xeon @ 2.10GHz, load at start 6.87, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`), beside other agents' work.

**The distance.**

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-14/gate/distance.txt tmp/rung-library-factories/distance-postedit.txt
    DISTANCE DOWN   54 -> 50 (-4)
        kind wellformed               8 -> 4      (-4)
        class V1                      2 -> 0      (-2)  arrays: element type bounded by Number, which declares no arithmetic
        class OT                     15 -> 13     (-2)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary     48 -> 44     (-4)
        crash gone   decl	TraitDecl FortressLibrary.fss:2886:1-2999:2	InterpreterBug	** bug! TryChecker returned an untyped expr: ...
        crash new    decl	TraitDecl FortressLibrary.fss:2902:1-3015:2	InterpreterBug	** bug! TryChecker returned an untyped expr: ...

The stage took 1815 s, `FortressLibrary` 1016 s, load at start 2.30.

Read by row, not by class (row 577): the run's `errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`, the landed lines mapped through the edit (+9 for the base's lines 2457 to 2822, +16 from 2829), and, as a second check, with every number in the messages masked. Of the landed 54 sites, 50 are on the rung's tree with the same kind, place and message; three of them differ only in a number inside the message (the two `distribute` return-type sites now at `:3300` and `:3302`, whose spans end at `:3301:28` and `:3303:28`; the export of `FortressLibrary`, which lists component lines; and the `:4423` typecheck site). The four gone are row 685's: `Vector[\T,s0\]` at the base's `:2464` against `Number` and against `MultiplicativeRing[\T\]`, and `Matrix[\T,s0,s1\]` at the base's `:2837` against both. No site came. The crash rows "gone" and "new" are one crash, row 680's `Array3` (`TraitDecl`), moved 16 lines. The class table's V1 -2 and OT -2 sum to the four sites, and no other class moved. Row 678's two sites moved from `:2567` and `:2571` to `:2576` and `:2580`; the factories' neighbours `vector(v)` and `tabulatedVector` (`:2475`, `:2477`) and `matrix(v)` (`:2856`) keep their landed errors at their new lines.

## 4. Where the fix belongs, the ways, and the probe's patch

The defect is a library line (the checker probe's section 3; the coordinator's call 3, `explorations/coordinator/CLIMB-BATCH-15.md:75`), so the fix is the library's: the checker's refusal is right, and nothing in the checker or walk changes (`explorations/coordinator/map/modules-and-phases.md`). No other call in `Library/FortressLibrary.fss` instantiates `vector` or `matrix` at an unbounded type: the other five calls (`:2475`, `:2477`, `:2724`, `:2785`, `:2790`) are inside declarations bounded as the family is. The library's ways to build a value per type from a static argument alone:

1. `typecase __thrower[\T\]` with an arm per number type and `cast`, the checker probe's patch (`explorations/perf-probes/checker-bound-defects/patches/row-685-array-factories.patch`), in the shape of `additiveIdentity` and `multiplicativeIdentity` (`Library/FortressLibrary.fss:3245-3277`) and of `openRange` (`:4075-4080`).
2. The same `typecase` binding the witness, `w: () -> ZZ32 => cast[...](__vector1(w, N[\s0\]))`, with a helper bounded as `vector` that infers its element type from the witness, as `__arr1` infers `E` from `__thrower[\E\]` (`:2124`, `:2132-2133`).
3. A `typecase` over a witness of the result type, `__thrower[\Array1[\T,0,s0\]\]`, with an arm per number type and `cast` (taken).
4. A checker rule by which a `typecase` on `__thrower[\T\]` bounds `T` in its arm: a language change, the curator's (the probe's section 10).

Measured:

- **Way 1 throws where walk instantiates `T` at a value's run-time class.** Applied verbatim (`git apply`, before the final edit), it passed the guard and `ArrayFactoryAbstractNumber` through the harness, but the program `filled[\T\](x: T): Array[\T,ZZ32\] = array[\T\](3).fill(x)` with `z: ZZ32 = 5` and `filled(z)`, which the base runs, failed (`cd ProjectFortress && ../bin/fortress <that program>`):

      /home/user/fortress-factories/Library/FortressLibrary.fss:36:13-27:
      CastError
      /home/user/fortress-factories/Library/FortressLibrary.fss:2456:23-66:

  Walk infers `T` as `Int`, the class of the value (row 364; `Int` is `ZZ32`'s one listed type, `Library/FortressLibrary.fsi:532-534`); `() -> Int` matches the arm `() -> ZZ32`, and the `ZZ32` vector is not an `Array1[\Int,0,3\]`. `Int` is a type of the api (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`), so a program that writes `array1[\Int,3\]()` would meet the same `CastError` on either path. In the harness the expected failure saw that throw: "FortressException: CastError / OK Saw expected exception".
- **Way 2 throws too.** In a shadow copy of the library (a `FortressLibrary.fss` in the run's directory, which the source path reads first, with private caches), walk inferred the helper's element type as `ZZ32`, the type that satisfies the F-bound, and the `cast` to `Array1[\Int,0,3\]` failed again ("CastError" at the shadow's `FortressLibrary.fss:2455:26-71`). Way 2 also adds two declarations to the component.
- **Way 3 never throws.** Its arms match `T` exactly, so `T = Int` takes the `else` arm and gets a plain array; the shadow and the final tree print the same for the probe programs (section 6). The compiled checker accepts its shape: a self-contained program in the shape of `explorations/perf-probes/checker-bound-defects/repro/FactoryUnboundedCaller.fss` (a closed trait, a two-bound vector family), whose factory has a `typecase` over `thrower[\Arr[\T,s0\]\]` with arms `() -> Arr[\A,s0\] => castTo[\Arr[\T,s0\]\](vec[\A,s0\]())`, gives no error under `bin/fortress typecheck`, while the same program with one arm calling `vec[\T,s0\]()` gives row 685's two errors ("Ill-formed type: V[\T,s0\] / The static argument T does not satisfy the corresponding bound K.", and the same for `R[\T\]`). The stages confirm it on the library (section 3).

`openRange`, the revival's container `cast` over a `() -> I` witness (`Library/FortressLibrary.fss:4075-4080` on this tree; landed in 070ef39e5), has way 1's shape and throws at walk's `Int` on the base already: `openAt[\I\](x: I): OpenRange[\I\] = openRange[\I\]()` with `openAt(z)` prints "CastError" at `FortressLibrary.fss:4077:23-58`. It is outside this rung's files, so it gets its expected failure, `XXXOpenRangeInferredIndexWalk`, and a note on row 364 (section 10). `additiveIdentity` and `multiplicativeIdentity` return a value, not a container, so their `cast[\T\](v)` holds at `T = Int`.

The precedent for `IntMap` is the library's own: the singleton's `UPLUS` by `addNew` (`Library/IntMap.fss:339-340`), and row 671's repair of `SYMDIFF` in the same node map (604d0e23c), which also took the singleton's body with the roles exchanged.

## 5. What the specification settles

- An instance is within its parameter's bound (`Specification/basic/inference.tex:56-58`; the bound is the `extends` clause, `Specification/basic/trait-parameters.tex:39-49`), so `Vector[\Number,n\]` is not well-formed under `Vector[\T extends { Number, MultiplicativeRing[\T\] }, nat s0\]` (`Library/FortressLibrary.fsi:1613`): `Number` extends `AnyMultiplicativeRing`, not `MultiplicativeRing[\Number\]` (`:286`). The checker's refusal is right, and the factory's result at an abstract number type can only be a plain array.
- The text against this: "A one-dimensional array whose elements are a subtype of \TYP{Number} is a vector." and "An array of two dimensions whose elements are a subtype of \TYP{Number} is a matrix." (`Specification/basic/expressions/aggregate.tex:165-166`, `:152-155`). Section 7 lists them.
- At a `T` inferred from a `ZZ32` argument the specification instantiates `ZZ32` (`Specification/basic/inference.tex`, "The Static Arguments of a Call"), so `filled(z)` is a vector; walk's `Int` (row 364) is the departure, which `XXXArrayInferredElementVectorWalk` records.
- The text is silent on `IntMap`. Of a map comprehension it says: "If \EXP{e_{1}} produces the same value but \EXP{e_{2}} a different value on more than one iteration of the generator list, a \TYP{KeyOverlap} exception is thrown." (`Specification/basic/expressions/comprehensions.tex:78-80`). `IntMap`'s comprehensions now meet it in every order of their entries, where on the base they met it in some. The text does not say what a key repeated with the same value gives; `IntMap`'s `addNew` and `Map`'s comprehension (`Library/Map.fss:161-168`) both throw (section 11).

## 6. Old code against new

Each probe program ran under walk on the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base15 /home/user/fortress-factories/tmp/old-caches P.fss`, or on this tree before its edit) and on the final tree (`bin/fortress P.fss`), at `FORTRESS_THREADS=1`; the `IntMap` program also at 4.

- The factories at written and inferred types (`array[\ZZ32\](3)`, its `copy()`, `g(5)` and `g(x)` with `g[\T\](x: T) = array[\T\](3).fill(x)`, `h(x)` with `array1[\T,3\]()`, and array literals), each classified by a `typecase`: identical output. `array[\ZZ32\](3)` and its `copy()` are `Vector[ZZ32,3]` on both; `g(5)` is an `Array1[\Int,0,3\]` on both (a `Vector[\Int,3\]` on the base and a plain array after, which that `typecase` does not tell apart).
- `f = filled(5)`, then `f + f`, `-f` and `SUM f`: the base prints `plus [0#3][ 10 10 10 ]` and `neg [0#3][ -5 -5 -5 ]` and stops at `SUM f`; the final tree stops at `f + f`: "Failed to find any matching overload, args = (PrimitiveArray[\Int,3\],PrimitiveArray[\Int,3\])". `f DOT f` stops on both ("args = (__DefaultVector[\Int,3\],__DefaultVector[\Int,3\])" on the base). So the base's `Vector[\Int,3\]` had `Vector`'s own `+` and unary `-`, and no `DOT`; the array at walk's `Int` now has neither. Under the specification `T` is `ZZ32`, and all of them run. This is the walk value that changes at a run-time class (section 8).
- The `IntMap` shapes, each wrapped to print its `KeyOverlap` message or "no exception": on the base, `{k MOD 3 |-> k | k <- 0#4}`, `{k MOD 2 |-> k | k <- 0#3}`, `{k MOD 4 |-> k | k <- 0#5}`, `{k MOD 5 |-> k | k <- 0#6}`, the last-and-first repeats over `0#5`, the map expression `{0 |-> 0, 1 |-> 1, 2 |-> 2, 0 |-> 3}` and the same-value repeat `{k MOD 3 |-> 7 | k <- 0#4}` threw nothing, and keys 2 to 7 `UPLUS` keys 0, 3, ..., 15 gave the ten-entry map with the left map's values at 3 and 6; only `{k MOD 2 |-> k | k <- 0#4}` and the reverse `UPLUS` threw. After, every one throws `KeyOverlap`, at 1 and at 4 threads alike: "IntMap.KeyOverlap: 0 |-> 0 and |-> 3", "IntMap.KeyOverlap: 0 |-> 7 and |-> 7", "IntMap.KeyOverlap: 3 |-> 53 and |-> 1", and so on.
- The probe's `repro/ArrayFactoryWalk.fss`: `array1 RR64 is a vector`, `array1 NN32 is a vector`, `array1 String is plain`, `array2 RR64 is a matrix`, `PASS` on the base and after; `repro/ArrayFactoryAbstract.fss`: `array1 Number is a vector` and `array1 AnyIntegral is a vector` on the base (the probe's section 3), `is plain` for both after.

**The interpreter suite** on the final library: `ant testSystem` prints `BUILD SUCCESSFUL`, `Total time: 6 minutes 6 seconds`; the shards ran 153, 157, 147 and 152 tests, 609 in all, with no failure or error: the landed 604 (`explorations/coordinator/CLIMB-BATCH-15.md:374`) and the five new files then in the tree. `XXXOpenRangeInferredIndexWalk` was added after the suite and ran alone (section 2). The build kept the caches ("Caches /home/user/fortress-factories/default_repository/caches kept"). The team's `IntMapTest` and `IntMapCombine`, the revival's `IntMapSymdiffSingleton` and `IntMapSymdiffManyEntry`, the walk array tests (`arrayTest0` to `arrayTest3`, `vectorOps`, `matrixOps`, `TabulateRungA`, `ArrayElementAlgebra` among them) and the reductions' and comprehensions' tests kept their verdicts.

**The ladder subset.** No file of the baseline's `raw/` names a declaration this change touched (`grep -rlE 'array1|array2|UPLUS|IntMap|KeyOverlap' explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing), and the compiled path does not read `Library/FortressLibrary.fss` or `Library/IntMap.fss`. So the subset is the seven files whose first error in the baseline's `ladder.tsv` names `array1`, `array` or `array2`: `Region`, `SubscriptedExpr`, `labelExit`, `setterTest`, `conditionalGenerator`, `generatedExpr` and `matrixOps`, none of them in the newest landed `explorations/compile-ladder/climb-batch-14/gate/ladder/ladder.tsv`, so compared with the baseline's rows. Run with the drivers copied under `tmp/rung-library-factories/ladder/` (`bash run-subset.sh`, `python3 classify.py`), each keeps its phase, `disambiguate`, and its first error, "Function array1 is not defined.", "Function array is not defined." or "Function matrix is not defined.". `matrixOps`'s missing names read `matrix ; tabulatedArray2 ; vector` where the baseline reads `matrix ; array2 ; vector`, because f3b62bc83 respelled that test after the baseline (`ProjectFortress/tests/matrixOps.fss:27-29`).

**Competing names.** The rung adds no library name. The six new components and their helpers (`fill3`, `filled`, `openAt`, `overlap`, `sharedKey`) appear nowhere else in `ProjectFortress/tests`, the `ProjectFortress/*_tests` folders, `ProjectFortress/test_library`, `Library`, `ProjectFortress/LibraryBuiltin` or `ProjectFortress/src/com/sun/fortress` (`grep -rlw NAME ...` prints each test's own file only; `filled` and `overlap` are local to their components, as in `TabulateRungA` and `IntMapUplusSingleton`).

**The specification's build.** `( cd Specification/fortress && ./ant genSource && ./ant tex )`: `BUILD SUCCESSFUL` twice, 676 pages. `grep -c 'LaTeX Warning: Reference\|multiply defined\|^! Undefined control sequence' Specification/fortress/fortress.log` prints 0. The skill's own grep matches 42 lines, each the traced definition of LaTeX's warning macro (`x@warning {Reference `#1' on page \thepage \space undefined}}{}`), not a warning. One later rewording (`the factory of \library\ ` for `\library's factory`) was not rebuilt. The build's files were removed (`git clean -fXq -- Specification`).

## 7. The specification's text, and the sentences made false

Changed in the S1 form (P-96), in place:

- The revival box `revival-overloading` on Jan's pair in the internal document (`Specification/appendices/future.tex:257-268`): the factory chooses "a \TYP{Vector} where the argument is one of the eight number types \TYP{ZZ32}, ..., and a plain array where it is any other type, \TYP{Number} among them, since a \TYP{Vector} of \TYP{Number} is not well-formed under the bound that \library\ give the element type of a \TYP{Vector} (\secref{type-param})". It said "a \TYP{Vector} where the argument is a \TYP{Number}".
- Appendix I, "Overloading with static parameters": its Change records the revision with its reason (`Specification/appendices/changes.tex:2402-2409`), and its Original text keeps the box's former last clause (`:2567-2571`). Its sentence that Jan's example is answered by the library's factory (`:2414-2417`) stays true. Its Effect is rung O's.

Made false and not edited here:

- `Specification/basic/expressions/aggregate.tex:165-166`, "A one-dimensional array whose elements are a subtype of \TYP{Number} is a vector.", and `:152-155`, "An array of two dimensions whose elements are a subtype of \TYP{Number} is a matrix.": false now for `array1` and `array2` at `Number`, `AnyIntegral` or any element type other than the eight, and at walk's `Int`. They were already false for the library's other arrays, `primitiveArray`, the immutable arrays and every view (row 54), and they cannot hold for `Number` itself under the library's bound on `Vector` (F-151). They are normative text, not a box or an Effect, and no decision says which side gives way (section 11).
- FACTS F-151, "The checker still refuses the first factories' results (row 685) and the norm's call (row 686).": its row 685 half is false with this rung.
- None in an Appendix I Effect or a `\note`: `grep -n 'Vector\|vector' Specification/appendices/changes.tex` names only this entry's lines; `grep -rn 'IntMap\|UPLUS' Specification --include=*.tex` names the operator tables only (`Specification/appendices/operators.tex:328`, `:1355`; `Specification/basic/operators/opr-overview.tex:226`).
- In the skill, none: `references/revival-changes.md` speaks of `IntMap`'s `SYMDIFF` only, and `references/library.md:26` of `fill` and `tabulate`.

The front matter's paragraph on the revision (`Specification/fortress/preamble.tex:54-64`) stays true. The section asked for no decision record; the reasoning is here.

## 8. Points to report

- **A walk value that changes, `array1` and `array2` at an abstract number type:** `array1[\Number,2\]()`, `array1[\AnyIntegral,2\]()`, `array2[\Number,2,2\]()` and `array[\Number\](3)` give plain arrays where they gave a `Vector` or a `Matrix` (`ProjectFortress/tests/ArrayFactoryAbstractNumber.fss:6-9`).
- **A walk value that changes, at walk's run-time class:** an array that `array`, `array1` or `array2` builds at a `T` that walk instantiates at `Int` from a `ZZ32` value is plain where it was a `Vector[\Int,n\]`; its `+` and unary `-`, which the base ran, now find no overload (section 6; `ProjectFortress/tests/XXXArrayInferredElementVectorWalk.fss:10`). The probe's patch threw `CastError` there instead.
- **Each `IntMap` test whose value or throw changes:** `IntMapUplusSingleton.fss:24-25` (the pins, below); the new `IntMapUplusManyEntry.fss:23-24` and `IntMapComprehensionRepeatedKey.fss:17-28`, each red on the base. A comprehension or map expression with a repeated key throws `KeyOverlap` in every order (`IntMapComprehensionRepeatedKey.fss:17-26`); one whose key repeats with the same value throws too (section 6). The team's `IntMapTest` and `IntMapCombine` hold no repeated key and keep their values.
- **Each repair's precedent line:** `additiveIdentity` (`Library/FortressLibrary.fss:3229-3244` at ee1aa1a95, `:3245-3260` now), with the witness taken of the result type (the deviation above); `NodeIM`'s `addNew` (`Library/IntMap.fss:488-490`) and `SingletonIM`'s `UPLUS` by `addNew` (`:339-340`).
- **Each team line changed:** `Library/FortressLibrary.fss:2451-2456` at ee1aa1a95 (the team's comment "TODO: fix when Number is covariant", the `typecase __thrower[\T\]` and its arm `() -> Number => vector[\T,s0\]()`), now `:2451-2465`; `:2823-2828` at ee1aa1a95 (the same comment and `()->Number => matrix[\T,s0,s1\]()`), now `:2832-2844`; `Library/IntMap.fss:520`, `self.add(other)`, now `self.addNew(other)`. The team's `else` arms and its comment "array2 is a factory for 0-based 2-D arrays." are kept.
- **The pins changed in `IntMapUplusSingleton.fss`:**
  - `:24` before: `assert(overlap(fn () => three UPLUS one), "no exception", "today's value: a many-entry map UPLUS a one-entry map holding its key throws nothing")`; after: `assert(overlap(fn () => three UPLUS one), "IntMap.KeyOverlap: 1 |-> 1 and |-> 9", "a many-entry map UPLUS a one-entry map holding its key throws KeyOverlap")`.
  - `:25` before: `assert(three UPLUS one, three, "today's value: a many-entry map UPLUS a one-entry map holding its key keeps the many-entry map's entries")`; after: `assert(overlap(fn () => three UPLUS one), overlap(fn () => one UPLUS three), "a many-entry map UPLUS a one-entry map holding its key throws as the reverse order does")`.
  - `:1`, the header comment, before: "IntMap's UPLUS of a many-entry map and a one-entry map on a shared key, whose value under walk throws KeyOverlap only with the one-entry map on the left."; after: "IntMap's UPLUS of a many-entry map and a one-entry map throws KeyOverlap on a shared key in either order, and holds every entry otherwise."
- **A site that comes or goes beyond row 685's four:** none; 54 to 50, the four gone and no site new (section 3).
- **Normative text changed:** the revival box in the internal document (`Specification/appendices/future.tex:264-268`) and its Appendix I entry's Change and Original text (`Specification/appendices/changes.tex:2402-2409`, `:2569-2571`); the sentences made false are in section 7.
- **A checker or walk edit:** none.
- **Of the same kind, a repair that departs from the patch the section names:** the witness of the result type in place of the probe's witness of `T` (section 4; `Library/FortressLibrary.fss:2455`, `:2834`).
- **Of the same kind, a defect outside the rung's files given a test:** `openRange`'s `CastError` at walk's `Int` (`ProjectFortress/tests/XXXOpenRangeInferredIndexWalk.fss:10`; `Library/FortressLibrary.fss:4076-4079`).

## 9. Decisions

1. **The witness of the result type (way 3), not the probe's patch as written (way 1).** Ways not taken: way 1, which throws `CastError` for a statically well-formed call at a type below a number type, `Int` among them, and so in walk's generic code at an inferred `T` (section 4, measured); way 2, which throws the same and adds two declarations (measured in a shadow copy); way 4, a language change. Evidence: the `CastError` runs of section 4; the base runs `filled(z)`; the compiled checker accepts way 3's shape (section 4), and the stages confirm it (section 3). The section says to apply the probe's patch and own it; this keeps its arms, its eight types, its `cast` and its `else` arms, and changes only what the `typecase` tests. No decision of the curator covers the choice of witness.
2. **The team's TODO comment is replaced, not kept.** Kept, it would say the factory waits on `Number` becoming covariant, which no longer describes the code. Way not taken: keeping it beside the new comment.
3. **`IntMapUplusSingleton.fss:25` asserts that both orders throw alike**, where the pinned value no longer exists. Ways not taken: deleting the line (the skill keeps every assertion), or asserting the message a second time.
4. **The `KeyOverlap` messages of many-entry maps and comprehensions are asserted as one of their possible forms**, the repeated key with its two values in either order, since which repeated key `nodeNode`'s recursion meets first, and in which role, is not something the library promises. Way not taken: pinning the message one run printed (the same at 1 and 4 threads).
5. **The array tests use `instanceOf[\AnyVector\]` and `instanceOf[\AnyMatrix\]` for "plain"**, so no test names an ill-formed `Vector[\Number,2\]`. Way not taken: the probe's `typecase` against `Vector[\RR64,2\]`, which a `String` array never meets anyway.
6. **The run-time-class consequence is recorded as an expected failure** (home 2), since the specification instantiates `ZZ32` there. Way not taken: a test pinning walk's plain array with a new row (home 3); the departure is row 364's, so its note names the test.
7. **`openRange`'s `CastError` gets an expected failure and a note, not a repair**, since `openRange` is not in this rung's files. Way not taken: repairing it here by the result type's witness.
8. **The same-value repeated key is not asserted** in any test, since the text names only a different value (section 5). Way not taken: pinning the throw, which `Map` also gives.
9. **The ladder subset is the seven files whose recorded first error names a factory this change touched in the other library**, since none of the baseline's `raw/` names one; run to show they do not move.
10. **The probe programs ran against a shadow copy of the library before the edit**, not against an edit of the tracked file, so the tests' failing runs came first (the skill's "The order", step 2). Way not taken: editing the library and reverting it.

## 10. Defects, each with its home

- **Row 685** (the factories at an unbounded `T`): home 1, repaired; `ArrayFactoryAbstractNumber` and the two stages. Closed with its claim and class corrected to the library line (`record.md`).
- **Row 704** (`UPLUS` keeps a value on a shared key in one order): home 1, repaired; `IntMapUplusSingleton`, `IntMapUplusManyEntry`, `IntMapComprehensionRepeatedKey`. Closed.
- **720** (the checker reports a call's static argument that fails the callee's bound at the callee's declared type): home 3, a row only, as the section asks. Its reproducer, `explorations/perf-probes/checker-bound-defects/repro/FactoryUnboundedCaller.fss`, gives on this tree, under `bin/fortress typecheck`, "FactoryUnboundedCaller.fss:11:42-48: Ill-formed type: V[\T,s0\]" twice (against `K` and `R[\T\]`): line 11 is `vec`'s declared result, and the call is on line 16.
- **The factories' array at walk's inferred `Int`** (plain, where the specification gives a vector): home 2, `XXXArrayInferredElementVectorWalk`; row 364's departure, so a note on row 364.
- **`openRange` at walk's inferred `Int`** (`CastError`): home 2, `XXXOpenRangeInferredIndexWalk`; a note on row 364. It was there on the base.
- **The probe patch's `CastError`** at a type below a number type: not landed, so not a defect of the tree; section 4 keeps it.

## 11. For the curator

- **The vector and matrix sentences of "Array Expressions".** "A one-dimensional array whose elements are a subtype of \TYP{Number} is a vector." (`Specification/basic/expressions/aggregate.tex:165-166`) and the matrix sentence (`:152-155`) cannot hold at `Number` under the library's bound on `Vector` (`Library/FortressLibrary.fsi:1613`; F-151), and walk now gives a plain array there (`ProjectFortress/tests/ArrayFactoryAbstractNumber.fss:6`). Should the text say "whose element type is one of the number types" (with a box and an Appendix I entry), or does the library's bound give way? Default: the text as it stands, the departure listed here, for the gather or a later text rung.
- **A key repeated with the same value in a map comprehension.** The text throws `KeyOverlap` where a key repeats with a different value (`Specification/basic/expressions/comprehensions.tex:78-80`) and says nothing of the same value; `Map`'s comprehension (`Library/Map.fss:161-168`) and now every `IntMap` comprehension throw on any repeated key ("IntMap.KeyOverlap: 0 |-> 7 and |-> 7" for `{k MOD 3 |-> 7 | k <- 0#4}`, section 6). Default: the libraries' throw, untested.
