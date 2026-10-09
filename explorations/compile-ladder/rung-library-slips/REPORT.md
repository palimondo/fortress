# Climb batch 12, rung S: the arrays' slips that need no fork, String's left and right, QQ's ceiling and truncate

- problem: the landed per-site list's 32 sites in component `FortressLibrary`, `explorations/compile-ladder/gate/distance-sites.tsv:37`, `:115-116`, `:140-141`, `:144-145`, `:154-155`, `:166-169`, `:179-188`, `:199-203`, `:205-208` (rows 606 and 635, and the arrays' 28 of `explorations/reviews/array-forks-now.md`, sections "None of the six: 28" and "Fork 2, the bound of Vector and Matrix: 44")
- spec: `Specification/basic-lib/numbers.tex:449-472` at the base (the rounding methods' entries, typed ℤ, and the sentence after them). For the arrays and `String`'s getters, none: `grep -rn 'getter left\|getter right' Specification/ --include=*.tex` prints nothing, and `grep -rn 'TransposedMatrix\|immutableFactory\|SUFFIX_SUM\|__DefaultMatrix\|__DefaultVector\|ImmutableSubArray' Specification/ --include=*.tex` prints only `Specification/appendices/changes.tex:2930`, which names the factory as what builds a varargs array
- precedent (lines in this branch's tree): `Library/FortressLibrary.fss:2391` and `:2699` (`Vector`'s and `Matrix`'s `T extends Number`); `:2420` and `Library/FortressLibrary.fsi:1619` (`__builtinFactory1` declares its own `Array1`); `ProjectFortress/LibraryBuiltin/NativeArray.fss:32-41` (`PrimImmutableArray`, no `put`); `Library/QuickSort.fss:40-44` (two parallel calls of type `()` as `do … also do … end`); `Library/FortressLibrary.fss:2800` (`scale` calls what `Matrix` declares); `:4694` and `Library/String.fss:201` (`seq(1 # (|x| - 1))`, `seq(sequence.indices.reverse)`); `Library/List.fss:258-263` (`Just[\E\]` of the element); `Library/FortressLibrary.fss:4201` with `:1651-1653` (a bare `throw` of an argumentless exception in an `if` arm; `DivisionByZero` and its message)
- deviation: `__ImmutableSubArray1` loses its `put`, a team declaration (`Library/FortressLibrary.fss:2381` at the base); the precedent sibling never had one. `SUFFIX_SUM` iterates `(0 # (|x| - 1)).reverse`, combining two precedents (PREFIX_SUM's `#` range and String.fss's `seq(… .reverse)`), where the team's text wrote a strided range. The specification's sentence on the rounding methods now says what the library does, against the Working Draft's sentence (`Specification-1.0-frozen/basic-lib/numbers.tex:479-481`)
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `Specification/basic-lib/numbers.tex`, `Specification/appendices/changes.tex`

Commits: `a64169be9` (library and tests) and `78f858735` (specification), on `wip/rung-library-slips` from base `7fa767d48`.

## 1. What changed and why

Each site is named by its line at the base (`7fa767d48`), as the brief and the landed list name it. A line marked "now" is in this branch's tree. The edit shifts the arrays section by up to +15 lines.

1. **The storing objects, 19 sites (way 6b).** `__DefaultVector` (`:2407`), `__DefaultMatrix` (`:2766`) and `TransposedMatrix` (`:2774`) now declare `T extends Number`, the bound of the traits they extend (`Vector`, `:2392`; `Matrix`, `:2700`). The checker's "The static argument T does not satisfy the corresponding bound Number" is gone from their lines and from the methods they inherit. No ring bound (POSITIONS, "The integration review's checks").
2. **`__immutableFactory1`, 2 sites.** Now declared `ImmutableArray1[\T,b0,s0\]` in the component (now `:2431`) and the api (`Library/FortressLibrary.fsi:1624`), where it was declared `ReadableArray1`. Both arms of its body already return an `ImmutableArray1`, and its two callers need one: `ImmutableArray1`'s `replica` (`:2272`) and `Array1`'s `freeze` (`:2336`). Its twin `__builtinFactory1` declares its own type, `Array1` (`:2421`; `.fsi:1619`).
3. **`__ImmutableSubArray1`'s `put`, 1 site.** Removed (`:2381`). Its sibling, the immutable store, declares no `put` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:32-41`), and neither do `ImmutableArray` and `ImmutableArray1` (`Library/FortressLibrary.fss:2062-2076`, `:2241-2294`); `put` belongs to `Array` (`:2078-2080`). The object's own comment, "The same as above, but immutable." (`:2375`), shows the line was copied from `__SimpleSubArray1` (`:2366`). Walk fills an array through `init`, never `put` (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:54`).
4. **`Matrix`'s `mul`, 2 sites.** The four parallel pairs `(mma(…), mma(…))` and `(mm(…), mm(…))`, typed `((), ())`, are now `do … also do … end` blocks (now `:2718-2722`, `:2730-2734`, `:2742-2746`, `:2754-2758`). The text gives such a block the type `()`: "each expression block must have type `()`; the result and type of the parallel `do` expression is also `()`" (`Specification/basic/expressions/also.tex`, "Parallel Do Expressions"). `Library/QuickSort.fss:40-44` writes two parallel calls of type `()` the same way. The two halves still run in parallel and write disjoint cells of `res`. The products' arithmetic on `T` in the same functions (`:2714`, `:2716`, `:2732`) belongs to fork 2 and stays.
5. **`TransposedMatrix`'s `add`, `subtract` and `negate`, 3 sites.** Their bodies now call `Matrix`'s operators: `(mem + v.t()).t()`, `(mem - v.t()).t()` and `(-mem).t()` (now `:2797-2799`). They called `mem.add`, `mem.subtract` and `mem.negate`, which `Matrix` has not declared since the team's commit `dc0f919ce` (2008-05-08, "Refactored libraries to move arithmetic operators from top level into the relevant traits and objects"). That commit turned `Matrix`'s and `Vector`'s `add`, `subtract` and `negate` into `+`, `-` and prefix `-` and left these three calling the old names. They stay methods (decision 7).
6. **`SUFFIX_SUM`, 1 site.** Now `for i <- seq((0 # (|x| - 1)).reverse) do result[i] += result[i+1] end` (now `:4701`). It wrote `seq((|x| - 2):0:-1)`, a strided range that `opr :` declares `Range[\ZZ32\]` (`Library/FortressLibrary.fsi:2391`), which is not a generator. The indices are the same, `|x| - 2` down to 0, in the same order (section 5). No api declaration changes.
7. **Row 606, 2 sites, item 42.** `String`'s `left` and `right` now return `Just[\Char\](self.get(0))` and `Just[\Char\](self.get(self.size-1))` (now `:4155-4156`), as `List`'s return `Just[\E\]` of the element (`Library/List.fss:258-263`). The empty string still gives `Nothing[\Char\]`.
8. **Row 635, 2 sites, item 44.** `QQ`'s `ceiling` and `truncate` now throw `DivisionByZero` where the denominator is 0, that is at +∞, −∞ and 0/0 (`:646`, `:651`), where they returned `self`. `floor` (`:644`), the brackets `|\x/|` and `|/x\|` (`:645`, `:650`) and `round` (`:652`) all reach them, so they throw at the same values (section 5). The specification gives this exception to an integer result of a division by zero (`Specification/basic/operators/opr-overview.tex:165`). Its message is its own `asString`, "Division by zero" (`Library/FortressLibrary.fss:1651-1653`).
9. **The specification.** The sentence after the rounding methods' entries (`Specification/basic-lib/numbers.tex:471-472` at the base) now says they throw a `DivisionByZero` at the three values, with the callout `revival-rational-rounding` (now `:471-478`). Appendix I has a new entry, "The rounding of an infinite or indefinite rational", before "Passages not yet revised" (now `Specification/appendices/changes.tex:3025-3079`). It gives the reason, the Working Draft's sentence and route C, and names the entry "The rational trait". This report is the repository document that the S1 form asks for; the section did not ask for a decision record.

## 2. The tests: the failing runs and the passing run

The tests were written first, in the order of the skill's tests-writing.md: the new walk test `ProjectFortress/tests/TransposedMatrixAndFreeze.fss`, and the changed pins in `StringPieces.fss` and `NumberOrderListDeclarations.fss`. The failing run, on the base's code (tree `7fa767d48`, no library edit), at 2026-10-09T10:16:06Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/TransposedMatrixAndFreeze.fss ProjectFortress/tests/StringPieces.fss ProjectFortress/tests/NumberOrderListDeclarations.fss

    Cannot find definition for method add given receiver __DefaultMatrix[\ZZ32,2,2\]
    Library/FortressLibrary.fss:2782:61-72:
    tmp/h1/tests/TransposedMatrixAndFreeze.fss:29:20-27:
    FAIL: (a,a) =/= (Just(a),Just(a)); a concatenated string's left getter is String's and answers Just of the first character as its flat form does, ...
    Tests run: 3,  Failures: 3,  Errors: 0

In that run `NumberOrderListDeclarations` failed on its own loop variable, "Variable q is already declared." (the function binds `q` at `:7`). After renaming the variable `x`, I ran it again alone on the same code at 10:16:37Z, with the same command:

    . interpret tmp/h1/tests/NumberOrderListDeclarations
     UNEXPECTED exception
    FortressException: ForbiddenException
    Tests run: 1,  Failures: 1,  Errors: 0

`shouldRaise` throws `ForbiddenException(TestFailure)` when nothing is raised: `ceiling(1/0)` returned `1/0`. `TransposedMatrixAndFreeze` stopped at its first transposed call, line 29. Its earlier assertions (the products, replica, freeze and subarray) held on the base.

The passing run, the last one after the last edit of code (the library edit), at 10:17:38Z. It runs the three tests and the nine whose verdicts must hold, in one JVM:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/{TransposedMatrixAndFreeze,StringPieces,NumberOrderListDeclarations,vectorOps,matrixOps,sparseMatrix,RationalTest,ArrayScalarExtension,ArrayOperatorsBesideLibrary,FlatTowerRungF,TabulateRungA,IntegerOrderNumerals}.fss

    OK (12 tests)

The pins, each before and after (items 42 and 44 ask for them):

- `StringPieces.fss:35`: before `assert(cs.left, cs.asFlatString.left, "… answers the first character as its flat form does, …")`, both sides `'a'`; after `assert((cs.left, cs.asFlatString.left), (Just[\Char\]('a'), Just[\Char\]('a')), "… answers Just of the first character as its flat form does, …")`. The comparison with the flat form is kept.
- `StringPieces.fss:36`: the same for `right`, `'u'` before and `Just[\Char\]('u')` after, on both sides.
- `StringPieces.fss:60`: before `assert(flat.left, 'a', "a string's left getter answers its first character itself")`; after `assert(flat.left, Just[\Char\]('a'), "a string's left getter answers Just of its first character, as a list's does")`.
- `StringPieces.fss:61`: the same for `right`, `'c'` before and `Just[\Char\]('c')` after.
- `NumberOrderListDeclarations.fss:23`: before `assert(instanceOf[\QQ\](ceiling(inf)) AND instanceOf[\QQ\](truncate(inf)), "… ceiling and truncate return the argument if it is an infinity")`. After (`:23-31`): a comment citing `basic-lib/numbers.tex`, section "Rational Numbers", then for each of `inf`, `-inf` and `0/0`, a `shouldRaise[\DivisionByZero\]` of `ceiling`, `truncate`, `floor`, `round`, `|\x/|` and `|/x\|`. The file already asserts a raise this way (`:31` at the base, now `:39`).

Both files are the revival's (batch 9 rung S, `1e176516c`; batch 10 rung N, `a1b5c253d`), so no team test line changed.

`TransposedMatrixAndFreeze` asserts:
- `[1 2; 3 4]` times `[5 6; 7 8]`, and a 1×4 times 4×3 product. Between them these two products run all four parallel arms of `mul`'s `mma` and `mm`: by reading `:2708-2766` (now), the 2×2 product splits on `k` in `mm` and on `i` in both functions, and the 1×4 by 4×3 product splits on `k` in `mma`.
- An immutable array's `map`, which goes through `replica`, and an array's `freeze`: both `(immutable)`, each with its elements.
- A subarray of the frozen array.
- A transposed matrix's `add`, `subtract` and `negate`.

The storing objects have no walk test of their own; walk's array tests keep their verdicts (among the twelve above).

## 3. Where the fix belongs, and the precedent search

All 32 sites are bodies or declared types in the one library's component, plus one api line. The checker reads the library as written, and no checker change is asked for (`explorations/coordinator/map/modules-and-phases.md`). The precedent for each site is in the provenance line above. The searches (lines in this branch's tree):

- **The bound.** Every generic object under `Vector` or `Matrix` (`grep -n 'extends Vector\[\|extends Matrix\[' Library/FortressLibrary.fss`): the three storing objects and no other. This is way 6b of `explorations/reviews/array-design-ways.md` section 7, measured there on a library copy (19 of 21 gone, none new) and measured again here on the tree (section 6).
- **The factory.** The twin `__builtinFactory1` (`:2420`) and `__builtinFactory2` (`:2809`) each declare their own array type.
- **An immutable `put`.** No immutable array type in the library declares `put`: from `:1990` to `:2470` the only `put` lines are `Array`'s declaration and the two subarrays' bodies (`NativeArray.fss:32-41` has none either).
- **Two parallel calls of type `()`.** `do … also do …` is used in the library at `Library/QuickSort.fss:40-44`, `Library/CovariantCollection.fss:53`, `:67`, `:131` and `Library/RangeInternals.fss:1240`, `:1452`, `:1476`.
- **A descending sequential loop.** `Library/String.fss:201` (`seq(sequence.indices.reverse)`) and `Library/QuickCheck.fss:1129` (`seq(sortedfreqmap.reverse)`). `Library/Shuffle.fss:23` writes the same strided form as `SUFFIX_SUM` did (`seq((|a| - 1):-1:-1)`), in a component outside the distance's units; it is not edited (row NEW-S-1). In `SUFFIX_SUM`'s own file the strided form occurred only at `SUFFIX_SUM`.
- **`Just` of an element.** `List`'s `left` and `right` (`Library/List.fss:258-263`), and the ranges' `left` and `right`, declared `Maybe[\I\]` (`Library/FortressLibrary.fsi:2166-2167`).
- **Raising where an integer result has no value.** `throw NegativeLength` (`Library/FortressLibrary.fss:4201`, String's `^`), `throw IndexOutOfBounds…` (`:4183`), and the exceptions declared at `:1651-1720`. The library uses `fail("…")` for its internal errors (`:3959`, `:4375`).

No earlier rung repaired rows 606 or 635. For the arrays' slips, `explorations/reviews/array-forks-now.md` section 3 lists the same nine in this file and no others.

## 4. What the specification settles

- **Item 44.** The method entries type `floor`, `ceiling`, `round`, `truncate` and the two brackets ℤ (`Specification/basic-lib/numbers.tex:449-454`), and the sentence after them said they return the argument at +∞, −∞ and 0/0. The curator chose the declared result (POSITIONS, "`QQ`'s `ceiling` and `truncate` keep `ZZ` and raise at +∞, −∞ and 0/0"), and the sentence is revised in the S1 form (section 1, item 9). `opr-overview.tex:165` names the exception: "For integer results, division by zero throws a `DivisionByZero`". The Working Draft threw the same exception when `1/0` or `-1/0` was assigned to a variable of the rational type without the infinities (`Specification/appendices/changes.tex:962`, the entry `revival-literals`). Among the peers, Python 3.13.16 on the container, run with `python3 -I -c`:

      math.floor(float("inf")) raises OverflowError: cannot convert float infinity to integer
      math.trunc(float("nan")) raises ValueError: cannot convert float NaN to integer
      Fraction(1,0) raises ZeroDivisionError: Fraction(1, 0)

- **Item 42 and the arrays.** The text says nothing of these bodies (provenance, spec). `also.tex` settles the type of a parallel `do`: `()`.
- **Ranges.** `ranges.tex`, "Ranges", calls a range expression "a special kind of `Generator`", useful "for controlling a `for` loop", strided ranges included (`Specification/basic/expressions/ranges.tex:37-40`, `:66-73`). The api's strided `:` declares a `Range`, which extends no `Generator` (row NEW-S-1).

## 5. Programs run old against new

Each program is run with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base12 <tree>/tmp/old-caches P.fss` (old) and with `bin/fortress P.fss` (new), from the tree's `tmp/rung-library-slips/probe/`.

- **`ProbeQQ`.** For each of `1/0`, `-1/0`, `0/0`, `7/2` and `-7/2`, it prints `ceiling`, `truncate`, `floor`, `round` (finite values only, since the old `round` stops), `|\q/|` and `|/q\|`, each in a `try`. It also prints `"abc".left`, `"abc".right` and `"".left`. Old, then new:

      ceiling(1/0) = 1/0 : Ratio            ceiling(1/0) raises Division by zero
      truncate(-1/0) = -1/0 : Ratio         truncate(-1/0) raises Division by zero
      floor(0/0) = 0/0 : Ratio              floor(0/0) raises Division by zero
      |\1/0/| = 1/0 : Ratio                 |\1/0/| raises Division by zero
      |/0/0\| = 0/0 : Ratio                 |/0/0\| raises Division by zero
      abc.left = a : Char                   abc.left = Just(a) : Just[\Char\]
      abc.right = c : Char                  abc.right = Just(c) : Just[\Char\]
      empty.left = Nothing : Nothing[\Char\] (both)

  All fifteen non-finite lines read `= <the argument> : Ratio` old and `raises Division by zero` new. The finite lines are the same old and new (from `ceiling(7/2) = 4 : BigNum` to `|/-7/2\| = -3 : BigNum`).
- **`ProbeRoundAll`.** `round` of the three values, each in a `try`. Old, the run stops at the first: `Library/FortressLibrary.fss:652:69-73: Failed to find any matching overload, args = (Ratio), overload = { … odd(self:Integral[\I\]) …`. New: `round(1/0) raises Division by zero : DivisionByZero`, and the same for `-1/0` and `0/0`.
- **`ProbeSums`.** `SUFFIX_SUM` and `PREFIX_SUM` of an array of ones of size 0, 1, 2 and 5. Old and new are identical: `n=0 SUFFIX_SUM [0#0][] …`, `n=2 SUFFIX_SUM [0#2][ 2 1 ]`, `n=5 SUFFIX_SUM [0#5][ 5 4 3 2 1 ] PREFIX_SUM [0#5][ 1 2 3 4 5 ]`; also `(0 # 4).reverse in seq: <|3, 2, 1, 0|>` and `0 # -1 = []`.
- **`ProbePut`.** `sub.put(0, 99)` on a subarray of a frozen array. Both stop: the old run inside the body, the new one at the call.

      old: Library/FortressLibrary.fss:2381:27-44: Cannot find definition for method put given receiver PrimImmutableArray[\ZZ32,3\]
      new: ProbePut.fss:8:5-17: Cannot find definition for method put given receiver __ImmutableSubArray1[\ZZ32,0,2,0,3\]

- **The transposed matrix.** `TransposedMatrixAndFreeze` (section 2): the old code stops at `mt.add`, the new code returns values.
- **`ProbeBigDiv`, old only.** `big(1) DIV big(0)` in a `try` catching `Exception` ends the run with `Caused by: java.lang.ArithmeticException: BigInteger divide by zero` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:158-160`). This is row 336's defect for the unbounded `ZZ`, and the reason the repair throws before dividing (decision 1).

## 6. The stages

**Checker count.** Before: `explorations/compile-ladder/climb-batch-11/gate/checker-count.txt`. After: on `a64169be9`'s code, at 2026-10-09T10:19:41Z:

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-library-slips/checker-count-postedit.txt tmp/rung-library-slips/cc-post
    diff explorations/compile-ladder/climb-batch-11/gate/checker-count.txt tmp/rung-library-slips/checker-count-postedit.txt

The diff prints nothing: `#total 1`, `FortressLibrary 2`, `#crash none`.

**Distance.** Before: `explorations/compile-ladder/climb-batch-11/gate/distance.txt` and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv`, last written at `f9d3ec826`. `git log f9d3ec826..7fa767d48 -- Library ProjectFortress/LibraryBuiltin ProjectFortress/src` lists no commit, so that list holds for the base. After: on the same code as the count, started at 10:22:46Z. It took 1,264 s (`FortressLibrary` 775 s), with load 3.82 at the start, on 4 CPUs (Xeon 2.10 GHz), OpenJDK 25.0.4.1 and `FORTRESS_THREADS=1`; `ant testSystem` and the specification build ran beside it for part of the run.

    explorations/coordinator/tools/distance/run.sh tmp/rung-library-slips/distance-postedit.txt tmp/rung-library-slips/dist-post
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-11/gate/distance.txt tmp/rung-library-slips/distance-postedit.txt

    DISTANCE DOWN   207 -> 175 (-32)
        kind wellformed              36 -> 17     (-19)
        kind typecheck              156 -> 143    (-13)
        class I1                      1 -> 0      (-1)  integers in generic code: the bound AnyIntegral or none where Integral[\I\] is used
        class S1                     28 -> 29     (+1)  self type: a generic trait's self is not its type parameter
        class R4                      2 -> 1      (-1)  StandardMinMax's (T,T) slip in bodies (row 421)
        class V1                     27 -> 25     (-2)  arrays: element type bounded by Number, which declares no arithmetic
        class V2                     32 -> 27     (-5)  arrays: a sized array's body or factory (sizes lost in joins and factories)
        class NM                      8 -> 7      (-1)  names the api does not declare (getters and methods of Range, String, Generator)
        class OT                     67 -> 26     (-41)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary    194 -> 162    (-32)
        class G1                      0 -> 18     (+18)  generic code with no bound compares its values (tuples' <, CMP; LexicographicOrder)
        crash gone   decl	TraitDecl FortressLibrary.fss:2492:1-2606:2	TypeError	FortressLibrary.fss:2501:9: Missing parameter type for i
        crash gone   decl	TraitDecl FortressLibrary.fss:2865:1-2978:2	TypeError	FortressLibrary.fss:2884:11: Missing parameter type for i
        crash new    decl	TraitDecl FortressLibrary.fss:2491:1-2605:2	TypeError	FortressLibrary.fss:2500:9: Missing parameter type for i
        crash new    decl	TraitDecl FortressLibrary.fss:2880:1-2993:2	TypeError	FortressLibrary.fss:2899:11: Missing parameter type for i

The class rows come from `classify.py`'s fixed line ranges, which the edit shifted (row 577). For example, G1 +18 is the tuple comparisons falling into a stale range, not 18 new errors. The two crash rows are the same two crashes, one line and fifteen lines lower.

Read by row and line instead. Each line of `tmp/rung-library-slips/dist-post/errors.tsv`, and each line number inside its message, was mapped back to the base through the diff of `Library/FortressLibrary.fss` and `.fsi` (Python's `difflib` over `git show 7fa767d48:<file>` and the tree's file). The result was compared with the landed list as a multiset of (unit, location, message): 33 landed rows have no match, and 1 row after the edit has none.

- **Gone, the 32:**
  - `:646`, `:651` (row 635); `:4140`, `:4141` (row 606).
  - `:2272`, `:2336` (the factory's callers); `:2381` (`put`); `:2712`, `:2730` (`mul`).
  - `:2782`, `:2783`, `:2784`: "No such method Matrix[\T,s1,s0\].add" (and `.subtract`, `.negate`).
  - `:4686` (`SUFFIX_SUM`'s `seq`).
  - The 19 "does not satisfy the corresponding bound Number": `Matrix` at `:2708`, `:2762`, `:2767`, `:2774`, `:2775`, `:2781`, `:2782`, `:2783`, `:2784`, `:2785`; `Vector` at `:2407`, `:2752` twice, `:2757` twice, `:2786` twice, `:2787` twice.
- **Respelled, one site** (counted in both lists, so not a move): `__immutableFactory1`'s body at `:2432` (now `:2431`). Before: "Function body has type OR(ImmutableArray1[\T,0,s0\],ImmutableArray1[\T,b0,s0\]), but declared return type is ReadableArray1[\T,b0,s0\]." After: "… but declared return type is ImmutableArray1[\T,b0,s0\]." This is the size tested in a branch, which the checker does not learn inside the arm (array-forks-now.md, "None of the six", 3 sites). Its typecase arm (`:2435`, "The typecase clause, NatReflect.N[\0\], is unreachable.") stays.
- **Stayed, among the sites this rung's edits come near:** the products' arithmetic on `T` in `mul` (`:2714`, `:2716`, `:2732`); the factories `vector` (`:2455`) and `matrix` (`:2816`); `matrix(v)`'s numeral (`:2819`, row 437); `__DefaultMatrix`'s storage size `s0 s1` (`:2768`); and `Vector`'s and `Matrix`'s bodies typed by the parent trait.
- **New sites:** none.

No table is committed: the gate's tables on the merged tree are the record.

**The ladder regression, this change's own subset.** The subset is empty: no file of the baseline's `raw/` and no row of the newest landed `explorations/compile-ladder/climb-batch-11/gate/ladder/ladder.tsv` records a first error that names anything this change touched. Over the baseline's `raw/`, `grep -rlE 'FortressLibrary\.fs[si]|__immutableFactory1|TransposedMatrix|__DefaultMatrix|__DefaultVector|__ImmutableSubArray1|SUFFIX_SUM|DivisionByZero' explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing, and neither does the same grep with `'\b(ceiling|truncate)\b'` or with `'Maybe\[\\Char\\\]|\.left\b|\.right\b'`. Over the landed `ladder.tsv`, `grep -cE` with the first pattern plus `ceiling|truncate` prints 0. The ladder compiles against the compiler's own library, which does not link the interpreter's library that this change edits (`.claude/skills/fortress-repo/references/build-and-caches.md`, "After an edit of the library").

**The interpreter suite.** The section asks for it, since walk reads the library. It ran once, on `78f858735` (the code of `a64169be9`):

    ant testSystem
    [junit] Tests run: 131, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 296.321 sec
    [junit] Tests run: 129, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 311.57 sec
    [junit] Tests run: 134, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 321.623 sec
    [junit] Tests run: 133, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 332.316 sec
    BUILD SUCCESSFUL
    Total time: 5 minutes 45 seconds

That is 527 tests, against 526 at batch 11's gate (`explorations/compile-ladder/climb-batch-11/gate/summary.txt:51-54`); the one extra is the new test. `ant testSpecData` is left to the gate.

**The specification's build.** After the setup lines, `( cd Specification/fortress && ./ant genSource && ./ant tex )`: both steps report `BUILD SUCCESSFUL`. `grep -c "LaTeX Warning: Reference\|LaTeX Warning: .*multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0, and the new label is defined: `\newlabel{sec:revival-rational-rounding}{{I.1.38}{641}…`. The skill's own grep, `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence'`, prints 41 on this log, but every one of the 41 is the traced definition of LaTeX's own `\@warning` macro (`x@warning {Reference `#1' on page \thepage \space undefined}}{}`), not a warning.

**Competing declarations.** The change adds no name to the library. The test adds the component `TransposedMatrixAndFreeze` and its function `entries`. `grep -rn 'component TransposedMatrixAndFreeze\|\bentries(' ProjectFortress/tests ProjectFortress/compiler_tests ProjectFortress/test_library ProjectFortress/src/com/sun/fortress` finds only the test, and no library api declares `entries`.

## 7. Sentences of the specification made false

None remain. The one sentence the change made false, `Specification/basic-lib/numbers.tex:471-472` at the base ("All of these methods simply return the argument if it is +∞, −∞, or 0/0"), is the one revised. What I searched:
- `grep -rn 'return the argument\|simply return\|returns the argument'` over `Specification/basic`, `basic-lib`, `advanced`, `advanced-lib` and `appendices`: the other hits are about other operators.
- Appendix I's mentions of `ceiling`, `truncate` and `__immutableFactory1` (`changes.tex:2865`, `:2930`): they stay true.
- No `\revision` or `\note` names rows 606 or 635.

One test message is now stale, in a file outside the ones this section edits. `ProjectFortress/tests/IntegerOrderNumerals.fss:60` says "ranges.tex, section \"Ranges\", a strided range: SUFFIX_SUM steps down from |x| - 2 to 0 by -1". SUFFIX_SUM still steps down from `|x| - 2` to 0, and the value the test asserts still holds, but it no longer loops over a strided range.

## 8. Points to report reached

1. **A value walk prints that changes** (each before and after is in section 5):
   - `String`'s `left` and `right` of a non-empty string: the character before, `Just` of it after (`Library/FortressLibrary.fss:4155-4156`).
   - `QQ`'s `ceiling`, `truncate`, `floor`, `|\x/|` and `|/x\|` at 1/0, −1/0 and 0/0: the argument before, `DivisionByZero` raised after (`:644-651`).
   - `round` at those values: a walk stop before (`:652`, "Failed to find any matching overload" for `odd`), `DivisionByZero` after.
   - `TransposedMatrix`'s `add`, `subtract` and `negate`: a walk stop before; the transposed sum, difference and negation after (`:2797-2799`).
2. **An array site that needs an answer to a fork was touched.** `__immutableFactory1`'s own body site (`:2432` at the base, now `:2431`) stays, and its message now names `ImmutableArray1` as the declared type (section 6). No such site moved or came; the fork-2 arithmetic in `mul` stays at its mapped lines.
3. **A team declaration was removed:** `__ImmutableSubArray1`'s `put(i:ZZ32,v:T): () = arr.put(index(i),v)` (`Library/FortressLibrary.fss:2381` at the base). No api declaration changed beyond `__immutableFactory1`'s result type (`Library/FortressLibrary.fsi:1624`).
4. **Which declaration walk runs for a set it loads today.** A `put` called on an immutable subarray found the object's `put` before and finds none now; both stop walk (section 5, `ProbePut`). A transposed matrix's operators are unchanged: `add`, `subtract` and `negate` stay methods, and its `+`, `-` and prefix `-` are still `Matrix`'s.

Not reached:
- No declaration in R's or G's sections was edited. `SUFFIX_SUM` calls `reverse` (`:1852`) but edits nothing in the ranges section.
- No team test line changed.
- No normative text changed beyond `numbers.tex`'s sentence and its new Appendix I entry.
- No checker or walk edit.

## 9. Decisions

1. **`QQ`'s raise is `throw DivisionByZero`, in the `then` arm of the existing guard.**
   - Ways not taken:
     - (b) `fail("…")`: the library's `FailCalled` with a message naming the value (as `strToInt`'s, `Library/FortressLibrary.fss:4375` now). A caller cannot catch it apart from every failed assertion.
     - (c) Removing the guard so that `numerator(self) DIV denominator(self)` divides by zero. Under walk that ends the run with a raw `java.lang.ArithmeticException`, which no Fortress `catch` sees (row 336, and `ProbeBigDiv` for the unbounded `ZZ`).
     - (d) `IntegerOverflow`, Python's choice for a float infinity. The library raises it when a fixed-width result does not fit, not when a value has no integer.
     - (e) `RationalComparisonError`, which the text gives to comparisons (`opr-overview.tex:284`).
     - (f) Returning `Maybe[\ZZ\]` or `QQ`, which goes against item 44's declared `ZZ`.
   - Evidence: `opr-overview.tex:165`; the Working Draft's `DivisionByZero` for an infinite rational assigned to the type without the infinities (`changes.tex:962`); the library throws its argumentless exceptions bare in an `if` arm (`throw NegativeLength`, `:4201` now).
   - The message is the object's own `asString`, "Division by zero" (`:1652`), since `DivisionByZero` takes no argument, just as `NegativeLength`'s is "Negative length" (`:1705`).
2. **`String`'s getters return `Just[\Char\]`**, written as `List.fss:258-263` writes it, with the static argument given. Not taken: declaring `Char`, the side of item 42 the curator did not choose.
3. **The storing objects take `T extends Number`.** Not taken: a ring bound (6c), which POSITIONS, "The integration review's checks", rules out for now; leaving `T` unbounded.
4. **`__immutableFactory1` declares `ImmutableArray1` in both the component and the api.** Not taken:
   - A `cast` or `asif` at each caller. The library uses those where a type cannot be stated, not where the factory can say what it builds.
   - Widening `replica`'s and `freeze`'s declared results to `ReadableArray1`, which would change two api declarations, of `ImmutableArray1` and `Array1`, and the types programs see.
5. **`__ImmutableSubArray1` declares no `put`**, since its sibling `PrimImmutableArray`, the precedent the brief names, declares none. Not taken:
   - Keeping the declaration with a fail body in the team's shape (`Library/FortressLibrary.fss:3959` now, `:3944` at the base). That keeps a method that no trait of the object declares and no immutable array has, and its only effect is a `FailCalled` where walk already stops today.
   - A body forwarding to `init0`, which would make an immutable array writable again after its write-once initialisation.
6. **`mul`'s halves become `do … also do … end` blocks.** Not taken:
   - The tuple followed by `()`, which keeps a tuple of units as a statement, a form the library does not use.
   - `ignore((…, …))`.
   - Two sequential calls, which lose the parallelism the team wrote.
7. **`TransposedMatrix`'s `add`, `subtract` and `negate` stay methods**, with bodies that call `Matrix`'s operators. Not taken:
   - Overrides of `Matrix`'s `+`, `-` and prefix `-` (`opr +(self, v: TransposedMatrix[\T,s0,s1\])`, `opr -(self, v: Matrix[\T,s0,s1\])`, `opr -(self)`). That is the shape they had before `dc0f919ce` turned `Matrix`'s methods into operators. But it changes which declaration walk runs for a transposed matrix's operators, adds unmeasured members to those operator families under walk's Meet Rule check and the checker's overloading checks, and goes beyond the slip.
   - Removing the three, which would remove team declarations. Nothing calls them: by reading the receivers, the only calls of `add`, `subtract` or `negate` on a matrix in `Library/*.fss` and `ProjectFortress/tests/*.fss` are the new test's (`grep -rn '\.add(\|\.subtract(\|\.negate(' Library/*.fss ProjectFortress/tests/*.fss`; every other hit is on a map, a set, a tree or a string's balancing forest).
   - This question is put to the curator (forCurator).
8. **`SUFFIX_SUM` iterates `seq((0 # (|x| - 1)).reverse)`.** Not taken:
   - Index arithmetic over `seq(0 # (|x| - 1))` with `i = |x| - 2 - j`, a step further from the team's descending loop.
   - A `while` loop over a mutable counter.
   - Declaring the strided `:` a generator in the api. That is an api declaration in the ranges section (rung R's) and a range-design question (row NEW-S-1).
9. **The rounding pins are `shouldRaise[\DivisionByZero\]`, one per method and value**, as the same file asserts a raise at `:31` (base) and as `StringPieces.fss:94` does. The floor, round and bracket cases sit beside ceiling and truncate, as the section asks. The concatenated string's pins keep their comparison with the flat form, asserted as a tuple against `Just`.
10. **No decision record.** The section does not ask for one (the brief: "A decision record if your section asks for one"). This report holds the reasoning, and the Appendix I entry points to it.

## 10. Defects measured, each with its home

- **The 32 sites** (rows 606 and 635, and the arrays' 28, which have no row): home 1, repaired. The stage is their test (section 6), beside three walk tests: `TransposedMatrixAndFreeze.fss` for the transposed methods' walk stop and the factory's callers, `StringPieces.fss` for row 606 and `NumberOrderListDeclarations.fss` for row 635.
- **`round` of an infinite or indefinite rational stopping walk at `odd`** (`ProbeRoundAll`): home 1, repaired by the same edit; `NumberOrderListDeclarations.fss:28`.
- **`TransposedMatrix`'s `add`, `subtract` and `negate` stopping walk:** home 1; `TransposedMatrixAndFreeze.fss:29-31`.
- **The unbounded `ZZ`'s `DIV` by zero raising a raw `java.lang.ArithmeticException` under walk** (`ProbeBigDiv`; `BigNum.java:158-160`): row 336's mechanism, at a third type. No gated test can pass while walk ends the run, so it is recorded as a note on row 336 (record.md), home 3's ledger form.
- **The one library's strided `:` declared `Range[\ZZ32\]`, which is not a generator, so the checker refuses `seq(a:b:c)`** (measured at `SUFFIX_SUM`'s landed site, `distance-sites.tsv:37`): deferred. The specification settles it (`ranges.tex`, "Ranges"), but no program compiles against the one library yet, so no gated test can show it. Recorded as a new row only, NEW-S-1, with reproducer `none` (record.md).

## 11. Not done

- `ProjectFortress/tests/IntegerOrderNumerals.fss:60`'s message still says "a strided range" (section 7). The file is outside the ones this section edits.
- `Library/Shuffle.fss:23` keeps its strided `seq((|a| - 1):-1:-1)` (row NEW-S-1). It is not a distance site and not this section's.