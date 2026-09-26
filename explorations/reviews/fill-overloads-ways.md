<!--
2026-09-26. Written by a clean worker: one that had not read the revival's earlier notes
(it read only explorations/protocol.md, explorations/experiment/env.sh, the checker-count
tool, and the two microGPT programs' sources for their uses of fill, array1 and array2).
Sources: Library/FortressLibrary.fsi and .fss, ProjectFortress/LibraryBuiltin/ (NativeArray,
CompilerBuiltin), Library/ (CompilerLibrary, Map, Heap, Sparse, ChunkedSparseArray,
SkipList, Generator22D), the checker's sources (OverloadingChecker.scala, TypeAnalyzer.scala,
StaticChecker.java, Shell.java, PreDisambiguationDesugaringVisitor.java), Specification/
(the July 2012 draft), Specification-1.0-frozen/, Documentation/Specification/Prose/Language/
(types.tick, overloading.tick), Papers/Types/, the gate's test directories, git history up
to 2012, and peer languages' published documentation (URLs in step 6). Every measurement
was taken in a private cache; the drivers, variants, probes and outputs are in
explorations/reviews/fill-overloads-ways/.
-->

# `fill`: the value form and the function form — every way to reconcile them

The array traits declare `fill` twice: `fill(v:E)` stores one value everywhere, and
`fill(f:I->E)` stores `f(i)` at each index `i`
(`Library/FortressLibrary.fsi:1299-1300`, `:1318-1319`, `:1338-1339`, `:1370-1371`). The
top-level factories `array1` and `array2` have the same pair
(`Library/FortressLibrary.fsi:1490-1491`, `:1600-1601`). The interpreter accepts all of them.
The compiled path's static checker, run over the interpreter's library, refuses them. This
note lists every way the language, the specification, the library and the two
implementations offer to resolve that, what each way changes, and then takes the question
through the nine steps of `explorations/protocol.md` § 6. It does not decide.

**Terms used below.**
*Overloading*: several declarations with one name. *Exclusion*: two types exclude each other
when no value can belong to both. The checker accepts a pair of overloaded declarations by one
of three rules (`Specification/advanced/overloading.tex:84-87`, checked in this order at
`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:475-478`):
the *Subtype Rule* (one parameter type is a subtype of the other; `overloading.tex:149-173`),
the *Incompatibility Rule* (the parameter types exclude each other; `:175-222`) and the *Meet
Rule* (a third declaration covers the overlap; `:224-255`). When the Subtype Rule applies, the
*Return Type Rule* also requires the more specific declaration's result to be a subtype of the
other's (`:158-173`). A type parameter's *bound* is the type written after `extends`; the
*implicit bound* is the one it gets when nothing is written. The *compiler world* and the
*interpreter world* are the two settings the front end switches between
(`ProjectFortress/src/com/sun/fortress/Shell.java:371-386`). The *diamond*: an array object
inherits `fill` from two parents that are not related to each other, for instance
`ImmutableArray` and `StandardImmutableArrayType`, with no declaration below both.

## What the checker refuses, measured

The count stage (`explorations/coordinator/tools/checker-count/run.sh`) prints 125 errors, 22
of them "Invalid overloading of fill" (its per-api table counts them as 44 for `NativeArray`) in
the two array objects of
`ProjectFortress/LibraryBuiltin/NativeArray.fsi:14,16` (the brief placed that file under
`Library/`; it is under `ProjectFortress/LibraryBuiltin/`). The errors inside
`FortressLibrary`'s own traits are not printed, because the stock checker returns before the
overloading check when a unit already has errors
(`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:268-272`). A copy of the
count stage's checker that also prints those (the `@@HIDDEN` lines of
`fill-overloads-ways/shadow-src/.../StaticChecker.java`) shows the rest. Every pair is sorted
by `fill-overloads-ways/summarise.py` into two kinds: *value/function* (one parameter an arrow
type, the other not) and *diamond* (the same parameter type inherited from both sides).

| run over a private copy of the library | printed fill pairs (NativeArray) | hidden fill pairs (FortressLibrary api) | factory refusals | errors printed, total |
|---|---|---|---|---|
| as today | 22 = 18 value/function + 4 diamond | 73 = 59 value/function + 14 diamond | 2 (`array1`, `array2`) | 125 |
| diamond declarations only (way 0) | 32 = 32 + 0 | 94 = 94 + 0 | 2 | 135 |
| way 0 + value form renamed (way 3a) | 0 | 0 | 0 | 103 |
| way 0 + value form removed (way 2) | 0 | 0 | 0 | 103 |
| implicit bound Object switched on (way 1a) | 4 = 0 + 4 | 14 = 0 + 14 | 0 | 231 |
| way 0 + element written `extends Object` (way 1b) | 0 | 0 | 0 | 125 |

Captured in `fill-overloads-ways/captures/checker-variants.txt`; driver
`fill-overloads-ways/run-checker.sh`, variants in `fill-overloads-ways/variants/`. Each run
took 3-4 minutes on a 4-core Xeon at 2.1 GHz with a load average of 5 to 7 from the other
workers.

Three things the numbers show:

- **Two problems, not one.** 18 of the 95 fill refusals are the diamond. They go away only
  when `fill` is declared below both sides; they are independent of the value/function
  question. The other 77 are the value/function pairs.
- **The factories are refused by a different rule.** `array1(v:T)` and `array1(f:ZZ32->T)`
  are not reported as "Invalid overloading". Because `T` is the function's own parameter, the
  checker treats `ZZ32->T` as an instance of `T`, so the function form is *more specific* and
  the Subtype Rule applies; the refusal is the Return Type Rule: "For array1, the return type
  of `[\T, nat s0\]ZZ32->T->Array1[\T,0,s0\]` should be a subtype of the return type of
  `[\T, nat s0\]T->Array1[\T,0,s0\]`" (`captures/checker-variants.txt`). The type-level reason:
  called with a function `ZZ32->RR64`, the value factory would build an array *of functions*
  and the function factory an array *of `RR64`*. With the bound `Any`, `array1(v:T)` is also
  the case the specification forbids outright ("a functional which takes a single parameter of
  type a naked type parameter of bound Any cannot be overloaded",
  `Specification/advanced/overloading.tex:114-127`); the checker does not report it under that
  rule because it looks for a *written* `Any` (`OverloadingChecker.scala:433-441`).
  `vector(v:T)`/`vector(f:ZZ32->T)` (`FortressLibrary.fsi:1497-1498`) pass, because there
  `T extends Number`.
- **`Vector` and `Matrix` show only diamond pairs.** Their element is bounded,
  `T extends Number` (`FortressLibrary.fsi:1465`, `:1583`), and a trait type excludes every
  arrow type (`TypeAnalyzer.scala:481`), so their value/function pairs are valid; the
  remaining 2 each are the diamond.

## The ways

Way 0 is needed by every way that keeps `fill` on both sides of the diamond; ways 1 to 10 are
about the value/function pair. The library's own ways come first.

### Way 0 — declare `fill` where the diamond meets (the library's own way)

The library already does this for the other methods that both sides declare: `copy`, `map`,
`ivmap`, `replica`, `shift` and range indexing are redeclared in `ImmutableArray1`, `Array1`,
`Array2` and `Array3` with the most specific return type (`FortressLibrary.fsi:1420-1437`,
`:1446-1461`, `:1553-1576`, `:1688-1704`; the comment at `:1574` reads "Copied here for better
return type information"). `fill` is not redeclared there. The Meet Rule for dotted methods
accepts a declaration provided below both (`Specification/advanced/overloading.tex:344-356`).

- *Library*: the probe put two declarations in `StandardMutableArrayType` (below `Array` and
  `StandardImmutableArrayType`, `FortressLibrary.fsi:1376-1380`, one place for `Array1`,
  `Array2` and `Array3`) and two in `ImmutableArray1` (`:1413-1438`)
  (`fill-overloads-ways/variants/edits.py`, function `meet`); the library's `copy` pattern would
  put them in each leaf trait instead; either satisfies the Meet Rule. Bodies in the `.fss`.
  Measured: diamond pairs 18 → 0.
- *Tests*: none. *microGPT*: none.

### Way 1 — bound the element type so that it excludes arrows (the library's own way for `vector`, `Vector`, `Matrix` and `assign`)

The library makes a value/function pair valid by bounding the value's type with a trait:
`vector[\T extends Number\](v:T)` beside `vector(f:ZZ32->T)` (`FortressLibrary.fsi:1497-1498`),
the `Vector` and `Matrix` traits (`:1465`, `:1583`), and `assign(v:T)` beside `assign(f:I->E)`
where `T extends StandardMutableArrayType[\T,E,I\]` (`:1376-1379`). A trait type excludes every
arrow type (`TypeAnalyzer.scala:480-482`; `Specification/basic/types-vals-vars.tex:215`), so the
Incompatibility Rule accepts the pair. The array family's `E` has no bound.

**1a. Switch on the specification's implicit bound.** The July 2012 draft says a type
parameter written without `extends` has "an implicit `extends Object` clause"
(`Specification/basic/trait-parameters.tex:49-50`). Guy Steele implemented it on 2012-05-28
("static parameters now have implicit boudn [sic] of Object if none given (amazingly, this was not yet
implemented), and also updated libraries and tests to reflect this (many instances of
/extends Any/ inserted)", `91e71e62e`), disabled it the next day "so tahat [sic] interpreter
tests will pass" (`c61723f61`), and on 2012-05-30 put it behind a setting (`afb02f41d`). Today the
compiler world switches it on and the interpreter world off (`Shell.java:372`, `:380`;
`PreDisambiguationDesugaringVisitor.java:135-148`), and the count stage runs in the interpreter
world (`explorations/coordinator/tools/checker-count/WorldFlip.java:37`). With it off, an
unbounded parameter's bound is `Any` (`TypeAnalyzerUtil.scala:81-82`).
- *Library*: measured, every value/function pair and both factory refusals vanish; the 18
  diamond pairs remain (way 0 still needed); but 163 new "Ill-formed type … does not satisfy
  the corresponding bound Object" errors appear in the same apis, total 125 → 231. Most are
  tuple type arguments: `(I, J)` 41, `(I, J, K)` 39, `()` 16, `(ZZ32, ZZ32)` 10, `Any` 9
  (`captures/checker-variants.txt`). The 2-D and 3-D arrays' *index* type is a tuple
  (`FortressLibrary.fsi:1544`), so `I` needs `extends Any` written, as the 2012 team did
  (`6a25b09b9`, Tristan King, "Adapted the code to new bound for static type parameter").
  And the element `E` must stay `Object`-bounded for the pair to be valid, so arrays of
  tuples are refused: the library's own `Library/Map.fss:151-157,175`, `Library/Heap.fss:86`,
  `Library/Sparse.fsi:19`, `Library/Sparse.fss:19,110`,
  `Library/ChunkedSparseArray.fss:53-54`. Measured in the compiler world with a user trait:
  `Filler[\(ZZ32,ZZ32)\]` is refused with "The static argument (ZZ32, ZZ32) does not satisfy
  the corresponding bound Object" (`captures/compiled-probes.txt`, `probes/FillBoxTuple.fss`).
- *Tests*: `ProjectFortress/tests/sparseMatrix.fss:23` (an array of tuples), and whatever
  made the interpreter tests fail in 2012 ("it seems to give the interpreter tests grief",
  Steele's comment in `c61723f61`; not re-measured here).
- *microGPT*: no line. The programs' own unbounded type parameters also get `Object`
  (for instance `FlatArrays.fss:171`'s `T`); not measured on the programs.

**1b. Write `extends Object` on the array family only**, leaving the switch off
(`variants/boundE.py`). Same element restriction as 1a without touching other parameters.
- *Library*: measured, every fill-family refusal goes (0 printed, 0 hidden, 0 factory), and 22
  new "does not satisfy the corresponding bound Object" errors take their place (total stays
  125): the methods that build an array over their own unbounded parameter, `toArray[\E\]`
  (`FortressLibrary.fsi:1209`), and `map[\R\]`, `ivmap[\R\]` and `replica[\U\]` in every array
  trait (`:1288-1289`, `:1306`, `:1315-1316`, `:1321`, `:1335-1336`, `:1342` and their
  redeclarations below). Each needs `extends Object` in turn, and so does every generic
  function elsewhere that makes an array of its parameter (for instance
  `Library/Map.fss:151-152`, which makes an array of `(Key,Val)` tuples and so cannot be
  bounded that way).
- *Tests* and *microGPT*: as 1a for arrays of tuples; no microGPT line (its elements are
  `RR64`, `ZZ32`, `String`).

**1c. Keep the value form only where the library already bounds the element** (`vector`,
`Vector`, `Matrix`), and give the generic arrays the function form only. For generic arrays
this is way 2.

### Way 2 — one `fill`, the function form (the library's own first shape)

In the earliest library on record the value form was a one-line convenience over the function
form: `fill(v:E):T = fill(fn (i:I):E => v)` (`git show 72ae6881b:ProjectFortress/FortressLibrary.fss`,
lines 268-269, January 2007, Jan-Willem Maessen). Way 2 keeps only `fill(f:I->E)`; a value
fill is written with a constant function. Measured in the interpreter:
`array[\ZZ32\](2,3).fill(fn (_: ZZ32, _: ZZ32): ZZ32 => bos)` and the other two shapes below
run and give the expected arrays (`captures/FillClosureWalk.txt`).
- *Library*: remove `fill(v:…)` from `FortressLibrary.fsi:1300,1319,1339,1371` and its bodies
  (`FortressLibrary.fss:1859,1884,1917,1984-1987`); remove the value factories `array1(v)`,
  `array2(v)`, `array3(v)` (`.fsi:1490`, `:1600`; `.fss:2251`, `:2611-2612`, `:2828-2829`);
  rewrite the value calls `FortressLibrary.fss:2260` (inside `vector(v)`, which itself stays
  valid), `Library/Generator22D.fss:350`, `Library/ChunkedSparseArray.fss:54`,
  `Library/SkipList.fss:614`. Measured: all fill-family refusals 0, total 125 → 103.
- *Specification*: the row "`a.fill(v:E)` Initializes all elements with value v" of the
  arrays figure goes (`Specification/advanced/parallelism-locality/arrays-distributed.tex:53`;
  the same row is in `Specification-1.0-frozen/`), original text preserved.
- *Tests* (gate directories): value fills `tests/conditionalGenerator.fss:17`,
  `tests/HeapTest.fss:21,72`, `tests/ReplicaTest.fss:36`, `tests/SubscriptedExpr.fss:17,18`,
  `tests/generatedExpr.fss:19`, `tests/quicksortTest.fss:33` (8 lines); value factories
  `tests/ReplicaTest.fss:24,32`, `tests/MapTest.fss:23`, `tests/labelExit.fss:66,78`,
  `tests/setterTest.fss:21`, `tests/objectExprMystery.fss:23` (7 lines).
  `parser_tests/XXXstaticArg.fss:20,23,26` is only parsed. `vector(v)` calls
  (`tests/vectorOps.fss:20`, `tests/matrixOps.fss:30,31`) are unaffected.
- *microGPT*: 7 lines. The diff, not applied:

```diff
--- explorations/run-c4/src/FlatArrays.fss:15
-zeros(n: ZZ32): Array[\RR64,ZZ32\] = array[\RR64\](n).fill(0.0)
+zeros(n: ZZ32): Array[\RR64,ZZ32\] = array[\RR64\](n).fill(fn (_: ZZ32): RR64 => 0.0)
--- explorations/run-c4/src/FlatData.fss:76
-    out = array[\String\](cnt).fill("")
+    out = array[\String\](cnt).fill(fn (_: ZZ32): String => "")
--- explorations/run-c4/src/FlatData.fss:121
-    tokm = array[\ZZ32\](|names|, blk + 1).fill(bos)
+    tokm = array[\ZZ32\](|names|, blk + 1).fill(fn (_: ZZ32, _: ZZ32): ZZ32 => bos)
--- explorations/apl/mg/FlatArrays2.fss:13
-zeros(n: ZZ32): Array[\RR64,ZZ32\] = array[\RR64\](n).fill(0.0)
+zeros(n: ZZ32): Array[\RR64,ZZ32\] = array[\RR64\](n).fill(fn (_: ZZ32): RR64 => 0.0)
--- explorations/apl/mg/FlatArrays2.fss:183
-    out = array[\RR64\](SUM[m <- ms] |m|).fill(0.0)
+    out = array[\RR64\](SUM[m <- ms] |m|).fill(fn (_: ZZ32): RR64 => 0.0)
--- explorations/apl/mg/FlatData2.fss:79
-    out = array[\String\](cnt).fill("")
+    out = array[\String\](cnt).fill(fn (_: ZZ32): String => "")
--- explorations/apl/mg/FlatData2.fss:124
-    tokm = array[\ZZ32\](|names|, blk + 1).fill(bos)
+    tokm = array[\ZZ32\](|names|, blk + 1).fill(fn (_: ZZ32, _: ZZ32): ZZ32 => bos)
```

### Way 3 — two names (the library's own way where two arrows meet)

Arrow types never exclude arrow types (`TypeAnalyzer.scala:480`;
`Specification/basic/types-vals-vars.tex:402-403`), and where the library has two
function-taking forms it gives them two names: `map(f:E->R)` and `ivmap(f:(I,E)->R)`
(`FortressLibrary.fsi:1178-1179`, `:1288-1289`); in the compiled path's own library Guy
Steele declared `fill(v: ZZ32)`, `fill(f: ZZ32 -> ZZ32)` and a separately named
`fill2(f: (ZZ32, ZZ32) -> ZZ32)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:577-579`,
commit `d535963cb`, 2011-10-12). `assign` is itself a second name beside `fill`, added in 2007
"to augment .fill() methods, since we're catching duplicate initializations in the latter"
(`14fbc5eba`).

**3a. The value form gets a second name.** Measured with the placeholder `fillValue` (the name
is Pavol's to choose): all fill-family refusals 0, total 103 (`variants/rename.py`).
- *Library*: the same declarations and call sites as way 2, renamed instead of removed; the
  value factories renamed or removed.
- *Specification*: the figure row `arrays-distributed.tex:53` renamed.
- *Tests*: the same 15 lines as way 2, renamed.
- *microGPT*: the same 7 lines, `.fill(v)` → `.<name>(v)`; for instance
  `explorations/run-c4/src/FlatArrays.fss:15` `array[\RR64\](n).fill(0.0)` →
  `array[\RR64\](n).<name>(0.0)`.

**3b. The function form gets a second name.** The library calls the function form some 30
times (`FortressLibrary.fss:2086-2144`, `:2398-2406`, `:2558-2563`, `:2622`, `:2770-2776`,
`Library/Generator22D.fss:58,101,146,314,318,324,327`, `Library/List.fss:462,467`,
`Library/System.fss:34`, `Library/Random.fss:291,314`), the tests 11 times
(`tests/ArrayOperatorsBesideLibrary.fss:13,22`, `tests/vectorOps.fss:21`,
`tests/ArrayScalarExtension.fss:19,41`, `tests/ShuffleTest.fss:20`, `tests/matrixOps.fss:27-29`,
`tests/RandomTest.fss:96`, `tests/sparseMatrix.fss:43`), and the programs 12 times:
`explorations/run-c4/src/FlatArrays.fss:14,16,17,171`; `explorations/apl/mg/AplMg.fss:14,19`,
`explorations/apl/mg/FlatArrays2.fss:12,14,15,175,178,181` (and 4 times in the probe files
beside the APL program, `elemwise_nat_probe.fss:14`, `elemwise_rank_probe.fss:14-16`).

### Way 4 — carry the value in a named type

The library makes a function-taking form and an object-taking form coexist by giving the
object a trait type: `reduce(j:(E,E)->E, z:E)` beside `reduce(r: Reduction[\E\])`
(`FortressLibrary.fsi:692-693`). A value wrapped in any trait-typed carrier excludes `I->E`
(`TypeAnalyzer.scala:481`), so `fill(c: <Carrier>[\E\])` beside `fill(f:I->E)` is valid. The
carrier cannot go on the function side: an `Any`-bounded `E` excludes nothing but `Bottom`
(`TypeAnalyzer.scala:424-431`, `:410`), so `E` beside any trait type is still refused.
- *Library*: a carrier type (none exists for this; `Just` is the nearest,
  `FortressLibrary.fsi:840`), the value declarations retyped.
- *Tests*: the 15 value lines of way 2 wrap their argument.
- *microGPT*: the same 7 lines wrap their argument. Not measured.

### Way 5 — a Meet-Rule declaration for the overlap (blocked)

The Meet Rule would accept the pair if a third declaration took `E ∩ (I->E)`
(`Specification/advanced/overloading.tex:247-255`). Intersection types cannot be written in a
program (`Documentation/Specification/Prose/Language/types.tick:151-153`). The
specification's own example satisfies the rule with a *named* type that is the intersection
(`V = S ∩ T`, `overloading.tex:283-307`), and the library does the same for the diamond (way 0,
where the intersection is a declared trait). For a type variable and an arrow type no named
intersection can be declared. No workaround in the library.

### Way 6 — change the overloading rule, check at the call

Accept a value/function pair on a trait's type parameter and resolve each call by the most
specific applicable declaration, at compile time when the argument's type is known and at run
time otherwise. This is what the interpreter does (step 2) and what the basic chapter's text
describes ("any of the applicable declarations such that no other applicable declaration is
more specific than them is chosen", `Specification/basic/overloading.tex:23-28`), and it is
X10's choice for its `Rail` constructors (step 6). It contradicts the advanced chapter, which
checks declarations "to eliminate the possibility of ambiguous calls at run time, whether or
not these calls actually appear in the program" (`Specification/advanced/overloading.tex:60-65`),
and the type group's paper, whose algorithm checks the declarations (`Papers/Types/overloading-check.tick:1-25`).
It keeps the exclusion relation (Route A) but changes the overloading rules, so
`advanced/overloading.tex` would be revised.
- *Library*, *tests*, *microGPT*: none. *Checker*: `OverloadingChecker.scala:465-478` and
  `:433-441`. *Compiled path*: generic call sites need a run-time test against an arrow type
  of the instantiated `E`; the dispatcher has arrow-type structures
  (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1151`); not measured.

### Way 7 — one declaration with a `typecase` inside (the library's 2007 way "in lieu of overloading")

Maessen used `typecase` where overloading did not yet work ("Added typecase (in lieu of
overloading)", `14fbc5eba`), and `array1()` still chooses by `typecase` today
(`FortressLibrary.fss:2246-2250`). One `fill(x: Any)` would test `x` against `I->E`. The
parameter must be `Any`, since the union `E ∪ (I->E)` cannot be written (`types.tick:151-153`),
so `fill` stops checking its argument statically; the compiled path would need the run-time
arrow type of the instantiated `E`. *microGPT*: none. *Tests*: none. Not measured.

### Way 8 — keyword parameters (blocked twice)

A keyword argument names its parameter at the call (`fill(value = 0.0)`), which would tell the
two forms apart by name. Blocked by the implementations: "Keyword and varargs parameters are
not yet supported" (`Specification/basic/overloading.tex:15`, `advanced/overloading.tex:15`).
Blocked by the language as well: a keyword parameter "must be declared with a default
expression" (`Specification/basic/functions.tex:155-158`), and a generic `E` has no default
value. *microGPT*: 7 lines if it were available.

### Way 9 — a `where` clause on the value form (blocked)

`fill(v:E):T where { E extends Object }` would bound `E` for the value form only. Overloaded
declarations "must have static parameters that are identical"
(`Specification/advanced/overloading.tex:95-96`), the `where` syntax is marked out of date
(`Specification/basic/trait-parameters.tex:287`), and the checker extends its analyzer with
the trait's parameters and no `where` clause (`OverloadingChecker.scala:288-289`).

### Way 10 — array comprehensions for the function form (blocked)

The specification's notation for building an array from its indices is the array
comprehension, `[ (i) |-> f(i) | i <- 0#n ]` (`Specification/basic/expressions/comprehensions.tex:101-107`);
with it the function form would not need to be a `fill` at all. "Array comprehensions are not
yet supported" (`comprehensions.tex:15`; also `arrays-distributed.tex:15-16`).
*microGPT*: the 12 function-fill lines would change.

## The nine steps

### 1. The refresher

In mathematics an array is a function from an index set to values. There are two ways to give
one: all indices map to one constant `c` (the constant function), or each index `i` maps to
`f(i)` (tabulating a given function). The constant case is a special case of the second
(`f = λi. c`), which is how the earliest library wrote it (way 2). The two forms are
ambiguous only when the element set itself contains functions from the index set: then "the
constant `g`" and "tabulate `g`" are different arrays built from the same argument.

### 2. What each path does today, measured

- **Interpreter** (`probes/FillWalk.fss`, `captures/FillWalk.txt`): accepts all the
  declarations and chooses by the argument's run-time type. `fill(0.5)` and
  `fill(fn i => 1.0 i)` on `Array[\RR64,ZZ32\]` give `0.5 0.5 0.5` and `0.0 1.0 2.0`. With
  `E = ZZ32->ZZ32` a function argument is stored as the element (`d[1](5) = 105`). With
  `E = Any` a function argument is *tabulated*: `c[1] = 11`, not the function. The same
  happens through generic code written as a value fill:
  `filled[\T\](v:T) = array[\T\](2).fill(v)`, called as `filled[\Any\](fn i => i + 30)`, gives
  `h[1] = 31`. `array1[\Any,3\](fn …)` also takes the function form (`g[1] = 21`). This is the
  ambiguity the checker's rule exists to exclude.
- **Compiled path, compiler world, its own library** (`probes/FillBox.fss`,
  `captures/compiled-probes.txt`): a user trait `Filler[\E\]` with both fills and a top-level
  pair shaped like `array1` compile and run, printing `value`, `function`, `value`,
  `function`; they are valid because the compiler world gives `E` the bound `Object`. Written
  `Filler[\E extends Any\]` (`probes/FillBoxAny.fss`), the trait is refused ("Invalid
  overloading of fill in trait Filler") and the top-level pair is refused by the rule "A
  functional which takes a single parameter of a parametric type bound by Any cannot be
  overloaded" (`Specification/advanced/overloading.tex:114-127`; `OverloadingChecker.scala:375-378`,
  `:433-441`). The compiler library's own `ZZ32Vector` has `fill(v: ZZ32)` and
  `fill(f: ZZ32 -> ZZ32)` (`CompilerBuiltin.fsi:577-578`), valid because `ZZ32` is a trait type
  there (`CompilerBuiltin.fsi:210`).
- **Compiled path, one library** (the count stage): refuses, as in the table above. No
  program can be compiled against the interpreter's library yet, so no compiled run exists
  for it.

### 3. The specification's prose

- **Arrays.** The draft's arrays figure names both methods: "`a.fill(v:E)` Initializes all
  elements with value v" and "`a.fill(f:I->E)` Calls f at each index and initializes the
  corresponding element with the result of the call"
  (`Specification/advanced/parallelism-locality/arrays-distributed.tex:53,55`; identical in
  `Specification-1.0-frozen/`). It lists `array1`, `array2`, `array3` only with no argument
  (`:44-49`); the value and function factories are the library's own. Array comprehensions,
  the notation for the function form, are specified and "not yet supported"
  (`comprehensions.tex:15`, `:101-107`).
- **Overloading.** Declarations are checked pairwise; a pair is valid by one of three rules
  (`advanced/overloading.tex:80-92`). The Incompatibility Rule is exclusion when there is no
  coercion (`:178-182`). A single parameter of a naked type parameter bounded by `Any` cannot be
  overloaded (`:114-127`). The basic chapter describes run-time choice among the most specific
  (`basic/overloading.tex:23-28`); the advanced chapter guarantees it never has to choose
  (`advanced/overloading.tex:60-78`).
- **The same idea under another spelling.** The implicit bound: "If a type parameter does not
  have an `extends` clause, it has an implicit `extends Object` clause"
  (`Specification/basic/trait-parameters.tex:49-50`), next to "Type parameters are instantiated
  with types such as trait types, tuple types, and arrow types" (`:52-53`). Arrow types are
  outside `Object`: "immediate subtypes of Any comprises of tuple types, arrow types, (), and
  Object" (`types-vals-vars.tex:135-136`); "Every trait type also excludes every arrow type and
  every tuple type" (`:215`); "An arrow type excludes any non-arrow type other than Any"
  (`:400-401`). Under the draft, then, `E` implicitly extends `Object`, `Object` excludes
  `I->E`, and the two fills are a valid overloading by the Incompatibility Rule; the draft is
  consistent with its own figure. The later Types chapter changes the premise: `Object` "is a
  supertype of every trait type, arrow type and function type"
  (`Documentation/Specification/Prose/Language/types.tick:232-236`, again at `:484` and
  `:512-514`). Under the later word an `Object`-bounded `E` does not exclude `I->E`.

### 4. Where it sits in the type system

The question is the exclusion between a type variable and an arrow type. The checker decides
it from the variable's bound (`TypeAnalyzer.scala:424-431`) and from its arrow rule: an arrow
type excludes every non-arrow type, including `Object`, and no arrow type
(`TypeAnalyzer.scala:480-482`); only trait types are subtypes of `Object` (`:235`). The type
group's paper states the same arrow rule ("Every arrow type excludes every non-arrow type other
than Any", `Papers/Types/exc-spec.tick:177`). So the implementation and the paper agree with
the 2012 draft and differ from the later Types chapter. Three bounds, three answers:
`Any` (interpreter world, `TypeAnalyzerUtil.scala:81-82`) → refused; `Object` (compiler world)
→ valid under the checker's rule; a numeric trait (`Vector`) → valid. For the top-level
factories the domain of a generic function is an existential type
(`Papers/Types/overloading-check.tick:31-45`), which makes `ZZ32->T` an instance of `T`; that is
why they fail the Return Type Rule rather than the exclusion test. The numeric tower (Route A
flattens it) is not involved: `E` is not a number, and `Number`-bounded elements are the case
that already works.

### 5. What the library does in the same family

| pattern | where | what it resolves |
|---|---|---|
| bound the value's type by a trait | `vector`/`Vector`/`Matrix` `T extends Number` (`.fsi:1465,1497-1498,1583`); `assign(v:T)` with `T` the array type (`.fsi:1376-1379`) | value vs function, by exclusion |
| separate names for two function forms | `map`/`ivmap` (`.fsi:1178-1179`); `fill`/`fill2` (`CompilerBuiltin.fsi:578-579`) | arrow vs arrow |
| a second verb | `assign` beside `fill` (`14fbc5eba`) | re-assignment vs one-time initialisation |
| redeclare at the diamond's meet | `copy`, `map`, `ivmap`, `replica`, `shift` in `ImmutableArray1`/`Array1`/`Array2` (`.fsi:1420-1437,1446-1461,1553-1576`) | the diamond |
| value form as sugar over the function form | `fill(v:E):T = fill(fn (i:I):E => v)` (`72ae6881b`, January 2007) | one declaration |
| `typecase` in lieu of overloading | `14fbc5eba`; `array1()` (`.fss:2246-2250`) | choice by run-time type |
| trait-typed alternative to a function | `reduce(r: Reduction[\E\])` beside `reduce(j:(E,E)->E, z:E)` (`.fsi:692-693`) | function vs object |
| concrete element | `ZZ32Vector.fill(v: ZZ32)`/`fill(f: ZZ32->ZZ32)` (`CompilerBuiltin.fsi:577-578`) | value vs function, by exclusion |

Where the designers departed from Java: Java has no value/function overloading problem for
arrays because it uses two names (step 6); the Fortress library chose one name and relied on
the implicit `Object` bound of its own specification.

A side finding: `array3(f:(ZZ32,ZZ32)->T)` takes a two-argument function for a 3-D array
(`FortressLibrary.fss:2830`), and the api declares only the no-argument `array3`
(`FortressLibrary.fsi:1712`).

### 6. What peers do

| family | language | value form | function form |
|---|---|---|---|
| JVM | Java | `Arrays.fill(a, v)` | `Arrays.setAll(a, i -> f(i))` — [docs](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html) |
| JVM | Scala | `Array.fill(n)(elem)` (by-name, re-evaluated per element) | `Array.tabulate(n)(f)` — [docs](https://www.scala-lang.org/api/2.13.x/scala/Array$.html) |
| JVM | Kotlin | `a.fill(v)` — [fill](https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/fill.html) | `Array(n) { i -> f(i) }` — [arrays](https://kotlinlang.org/docs/arrays.html) |
| JVM / HPC | X10 | `new Rail[T](size, init:T)` | `new Rail[T](size, init:(Long)=>T)` — **same name, overloaded**, resolved at the call — [Rail.x10](https://github.com/x10-lang/x10/blob/master/x10.runtime/src-x10/x10/lang/Rail.x10) |
| close to the metal | C++ | `std::fill` | `std::generate` (nullary generator) — [fill](https://en.cppreference.com/w/cpp/algorithm/fill), [generate](https://en.cppreference.com/w/cpp/algorithm/generate) |
| close to the metal | Rust | `slice.fill(v)` | `slice.fill_with(\|\| …)`, `std::array::from_fn(\|i\| f(i))` — [slice](https://doc.rust-lang.org/std/primitive.slice.html#method.fill), [from_fn](https://doc.rust-lang.org/std/array/fn.from_fn.html) |
| scientific | Julia (multiple dispatch) | `fill(v, dims)` — stores `v` even when it is a function; "Every location of the returned array is set to (and is thus `===` to) the value that was passed" | comprehension `[f(i) for i in 1:n]` — [docs](https://docs.julialang.org/en/v1/base/arrays/) |
| scientific | NumPy | `np.full(shape, v)` | `np.fromfunction(f, shape)` — [full](https://numpy.org/doc/stable/reference/generated/numpy.full.html), [fromfunction](https://numpy.org/doc/stable/reference/generated/numpy.fromfunction.html) |
| unbounded | OCaml | `Array.make n v` | `Array.init n f` — [docs](https://ocaml.org/manual/latest/api/Array.html) |
| unbounded | Haskell (`vector`) | `replicate n v` | `generate n f` — [docs](https://hackage.haskell.org/package/vector/docs/Data-Vector.html) |

Every peer but X10 uses two spellings. The one with multiple dispatch (Julia) does not dispatch
on "is a function": `fill` always stores the value. X10, the closest peer (an HPCS language of
the same era), overloads one name and resolves at the call, which is way 6. Where a peer keeps
one of the two forms under the short name, it is the value form (Java, Kotlin, C++, Rust,
Julia, Scala's `fill`).

### 7. The history in the commits

- 2007-01 (the start of the record): `fill(f:I->E):T` abstract and `fill(v:E):T = fill(fn (i:I):E => v)`;
  `array1(v)`/`array1(f)`; a commented-out `replica(v)`/`replica(f)` pair
  (`git show 72ae6881b:ProjectFortress/FortressLibrary.fss`, lines 267-269, 356-359, 432-434).
- 2007-09/10, Maessen: the value form gets its own loop (`bb0f48ae4`); `assign` added beside
  `fill`; `typecase` "in lieu of overloading" (`14fbc5eba`).
- 2009-08-11, Sukyoung Ryu: the checker enforces "a functional which takes a single parameter of
  a parametric type bound by Any cannot be overloaded" (`33934d525`).
- 2011-10-12, Guy Steele: the compiled library's `ZZ32Vector` with `fill(v)`, `fill(f)` and
  `fill2` (`d535963cb`).
- 2012-05-28 to 05-30, Guy Steele: the implicit `Object` bound implemented, disabled for the
  interpreter tests, then made a setting (`91e71e62e`, `c61723f61`, `afb02f41d`); Tristan King
  adapts the Birdy library the same day (`6a25b09b9`).
- 2012 (undated in the tree): the later Types chapter puts arrow types under `Object`
  (`types.tick:232-236`).

No commit message in the record mentions the `fill` pair being refused. (Commits `91e71e62e`
and `afb02f41d` are parentless snapshots of the conversion, `research/authorship.md`; their
messages and dates stand, their diffs cannot be isolated.)

### 8. Derivation from Pavol's principles

- **"Study the existing parts of the Fortress library meticulously, and use those patterns."**
  The library's patterns (step 5) give: way 0 for the diamond, without alternative; for the
  pair, either a trait bound on the value's type (way 1: the library's own resolution
  wherever the element is bounded) or distinct spellings where two forms cannot be told apart
  (way 3: `map`/`ivmap`, `fill`/`fill2`), or the 2007 shape (way 2). No library pattern makes
  an unbounded element's two forms share a name.
- **"Written in a vacuum early on"; the type group "knew much more about what's feasible";
  "when that wish met reality, then the spec must change."** The draft's design is coherent
  (step 3): implicit `Object` plus arrows outside `Object` make the figure's two fills valid.
  It met reality twice: the implicit bound broke the interpreter tests and was switched off
  (`c61723f61`), and measured today it breaks 163 declarations in the checked apis, mostly
  tuple arguments; and the type group's later chapter put arrows under `Object`, which removes
  the exclusion the draft relied on. The implementation and the type group's paper still keep
  arrows outside `Object` (step 4). So whichever way is chosen, a specification text changes:
  the figure row (`arrays-distributed.tex:53`, ways 2 and 3), the implicit bound or the arrow
  rule (`trait-parameters.tex:49-50`, `types-vals-vars.tex:215,400-401` vs `types.tick:232-236`,
  way 1), or the overloading chapter (`advanced/overloading.tex:60-78`, way 6).
- **Route A (fixed): the checker keeps the exclusion rule.** Every way but 6 keeps it. Way 6
  keeps the exclusion relation but relaxes the overloading rules built on it. Way 1 depends on which
  exclusion rule is "kept": the checker's (arrows exclude `Object`) makes it work; the later
  chapter's does not.
- **The goal: microGPT compiled and fast.** Ways 0+2 and 0+3a are measured to clear every
  fill-family refusal. Way 1a clears the pair but adds 163 refusals; way 1b clears the whole
  family but adds 22, and more wherever else arrays are made generically. On the JVM, ways 2 and 3
  need no overload dispatch for `fill` (one method per name); way 2 adds one call of a
  constant function per element at the 7 value sites, which are allocation-time
  initialisations (`zeros`, `flat`, the corpus's token matrix and line list); not measured on
  the compiled path, which cannot run the one library yet. Ways 6 and 7 add a run-time type
  test at generic call sites.
- **"An operator in it does not become a function call to satisfy the interpreter's overload
  check."** `fill` is a method, not an operator; no way turns an operator into a call. Ways
  0, 1, 6 and 7 change no line of the model; ways 2, 3a and 4 change 7 lines; way 3b changes 12.
  Each such change is shown to Pavol as a diff before it is built (way 2's diff is above).

### 9. The options for his decision

Way 0 goes with every option below except where `fill` leaves one side of the diamond.

1. **Bound the element (way 1a or 1b).** Commits to: arrays whose elements are trait types
   only (no arrays of tuples, functions or `()`), which rewrites `Map`, `Heap`, `Sparse`,
   `ChunkedSparseArray` and `tests/sparseMatrix.fss`; for 1a, `extends Any` written on every
   parameter that takes tuples (163 refusals to clear, measured) and the implicit bound in the
   interpreter world too, where it failed the tests in 2012; for 1b, 22 refusals to clear
   (measured) by bounding every method that makes an array of its own parameter; keeping the draft's
   arrow-outside-`Object` rule against the later Types chapter, recorded in the specification.
   microGPT: no line.
2. **One `fill`, the function form (way 2).** Commits to: removing the value form and the value
   factories; the figure row `arrays-distributed.tex:53` revised with its text preserved; 15
   test lines; 7 microGPT lines (diff above); a constant function per value fill.
3. **Two names (way 3a, or 3b).** Commits to: a new library name, chosen by Pavol; the figure
   row renamed; 15 test lines (3a) or about 11 test and 30 library lines (3b); 7 microGPT lines
   (3a) or 12 (3b).
4. **A carrier type for the value (way 4).** Commits to: a new library type and 7 microGPT lines
   whose argument is wrapped. Not measured.
5. **Change the overloading rule (way 6).** Commits to: revising
   `Specification/advanced/overloading.tex` away from declaration-time checking, which the type
   group's paper and algorithm are built on; accepting the run-time choice measured in step 2
   (a function stored in an `Any` array is tabulated); run-time dispatch against arrow types in
   the compiled path. microGPT: no line.
6. **One declaration with `typecase` (way 7).** Commits to: `fill`'s argument unchecked
   statically; the same run-time choice as option 5. microGPT: no line.

Blocked, each with the rule that blocks it: way 5 (intersection types not writable), way 8
(keyword parameters not implemented), way 9 (identical static parameters; `where` not
checked), way 10 (array comprehensions not implemented).

## A reading (mine, not a decision)

The diamond half has one answer, the library's own (way 0). For the pair, the library's history
and its peers point the same way: the value form began as sugar over the function form, the
compiled library already gave a second arrow form its own name (`fill2`), and nearly
every peer spells the two forms differently. Way 1 is the specification's own resolution and
keeps the model's text, but it costs the library its arrays of tuples and rests on the arrow
rule that the type group's later chapter reversed. I would put way 0 with way 3a or way 2 in
front of Pavol first, with way 1 as the draft-faithful alternative and its cost stated; ways 3a
and 2 differ only in whether the value form keeps a name of its own.

## Files

- `fill-overloads-ways/run-checker.sh`, `WorldFlipFill.java`, `shadow-src/…/StaticChecker.java`,
  `summarise.py`: the checker over a private copy of the library.
- `fill-overloads-ways/variants/`: `meet.py` (way 0), `rename.py` (0 + 3a), `drop.py` (0 + 2),
  `boundE.py` (0 + 1b); way 1a is `run-checker.sh baseline -objectBound`.
- `fill-overloads-ways/probes/`: `FillWalk.fss`, `FillClosureWalk.fss` (interpreter),
  `FillBox.fss`, `FillBoxAny.fss`, `FillBoxTuple.fss` (compiler world).
- `fill-overloads-ways/captures/`: the outputs, each with its machine line.
