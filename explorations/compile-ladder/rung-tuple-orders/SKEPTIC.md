# Skeptic's verdict: climb batch 13, rung O (`rung-tuple-orders`)

The worker's head was `4f84f330a085d830a923f1fe74ed836b3b99bc1f` on `wip/rung-tuple-orders`, base `a1a75716a`.

The skeptic's work ran in two sessions. The first stopped before it committed this file. The second read the first's commits and programs again, checked them, and went on. Its commits:
- `03193eec1`: the worker's `REPORT.md` and `record.md`, written from the run's journal. A second extraction is byte-equal to them.
- `9322ecb28`: a pin of a value walk now refuses (finding 1).
- `782c547c1` and `f7e3f3ca4`: corrections to the report and the record (findings 2 to 4).
- `4eaf4530f`: a test of the lazy `LEXICO`'s two new arms (finding 7).
- `dc97a82f5` and `99b8bbc3c`: corrections to the report and the record (findings 7 to 9).
- This file, last.

No library or implementation code changed after the worker's head. My commits add two tests and correct prose. So the report's count and distance tables are those of the worker's code, and I ran neither stage. The interpreter suite the worker ran on its last code state (`069f2f0b4`) still covers the head's code.

**Verdict: approved.** The rung is right with my corrections, and none of them is contested.

## 1. The stage: count and distance

I compared the distance against the landed gate:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt tmp/rung-tuple-orders/distance-postedit.txt
    DISTANCE DOWN   153 -> 133 (-20)
        kind overloading              2 -> 0      (-2)
        class G1                     18 -> 1      (-17)  generic code with no bound compares its values (tuples' <, CMP; LexicographicOrder)
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared

The three crash rows "gone" and "new" are the same three crashes, three lines lower (`FortressLibrary.fss:1304` at the base, `:1307` on the head).

I compared the sites row by row with a script of my own. It maps each location in the worker's post-edit `errors.tsv` back to the base's line with `difflib`, then compares the rows with `explorations/compile-ladder/gate/distance-sites.tsv` by kind, unit, stage, location and message (`python3 tmp/rung-tuple-orders/skeptic/sitemap.py`):

    GONE: 20
      1 overloading FortressLibrary.fsi:1927,FortressLibrary.fsi:93 Invalid overloading of isLeftZero in trait LexicographicReduction: ...
      1 typecheck FortressLibrary.fss:130 Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,To
      3 typecheck FortressLibrary.fss:4551 Could not check call to operator CMP - ((NN64 & {UnsignedLong}), NN64)->TotalComparison is not appli
    CAME: 0

The 20 are:
- the `isLeftZero` pair in the api and in the component;
- the 17 "Could not check call to operator CMP" rows at `FortressLibrary.fss:4459`, `:4469`, `:4479`, `:4489`, `:4499` (twice), `:4511` (twice), `:4521` (twice), `:4531` (twice), `:4541` (twice) and `:4551` (three times);
- row 488's site at `:130`.

This is what the report says.

The count's table reads 0 for every api, and `#total 1`, `#locations 1`. Against `explorations/compile-ladder/climb-batch-12/gate/checker-count.txt`, `FortressLibrary 2` went to `0` and `#locations 2` to `1`. The run's log (`tmp/rung-tuple-orders/cc-post/run.txt`, on `636d687b3`) shows where the 1 comes from:

    @@PROBE checkApi FortressLibrary -> errors=0
    @@PROBE checkComponent FortressLibrary
    /home/user/fortress-orders/Library/FortressLibrary.fss:1307:10:
        Missing parameter type for i
    File FortressLibrary.fss has 1 error.

So the brief's "the count's table at 0" holds for the api rows, and the total does not reach 0. The worker put that to the curator, and the question stands.

Rung N types the row parameters of `Array2` and `Array3`, two of the three "Missing parameter type for i" crashes (`:2500`, `:2899` at the base). It leaves `__bigOperator`'s `body(i)` (`:1304` at the base), which is the count's first error here. So the merged tree's count will stop there too.

Both stages ran on `636d687b3`. The last code edit after it, `Library/Reflect.fss` (`069f2f0b4`), is outside both stages' inputs: it is not among the distance's twelve components (`explorations/coordinator/tools/distance/run.sh:83-85`), and `FortressLibrary` does not import it.

## 2. Test first, in the worker's transcript

- `18:29:37` to `18:30:04`: the tests were written.
- `18:30:12` (call `3m746d`): the harness ran on the worktree's own unedited code. The first library edit came later, at `18:31:50` (call `2kWnmv`). The run's lines:

      Failed to find any matching overload, args = (Unordered,FnExpr at Library/FortressLibrary.fss:4499.26 ()->BOTTOM ...
      FAIL: a Boolean: false =/= a Boolean: true; LessThan is a left zero of the lexicographic reduction
      ** bug! MethodClosure genComb[\That,Result\](f:(FortressLibrary.ZZ64, SingletonIM[\Val\], SingletonIM[\That\])->...
      Tests run: 6,  Failures: 5,  Errors: 0

- After the edit, two refusal keys changed and one expected map was swapped (`18:34:11`).
- The final texts ran through the base build's harness on the old code at `19:02:54` (call `26LN85`): `Tests run: 7,  Failures: 5`.
- They ran on the head at `19:03:00`, after the last code change: `OK (7 tests)`.

This satisfies `tests-writing.md`, "The order", step 2, both before the edit and, for the final texts, on the old code. `IntMapSymdiffSingleton` pins today's values with no fix, and was seen passing on both.

## 3. The diff against the section and the decisions

`git diff a1a75716a...4f84f330a` does what the section says, line by line:
- the ten operators bound per element by `StandardPartialOrder`;
- the two `=` operators unbounded;
- the three `LEXICO` arms beside `:138`, `:177` and `:211`, with their api lines;
- `Unordered => false` in the eight `typecase`s;
- `isLeftZero(_:TotalComparison)` in both files;
- the 2008 comment dropped, which the judgement allows;
- `genComb` in `EmptyIM`, `SingletonIM` and `NodeIM`.

Beyond the section's files, `Library/Reflect.fss` changed. The bound refused its set of `(String, Type, Maybe[...])` triples, and the suite found it. The worker listed it as a point and as a question for the curator, and I agree.
- Its list follows the documentation, "Returns a list of every members" (`Library/Reflect.fss:123`, `:122` at the base; the api's `Library/Reflect.fsi:85`), and `ReflectiveQuickCheck`'s list over the same members (`Library/ReflectiveQuickCheck.fss:293-297`).
- At the base, a set holding two triples with one name and type compared their `Maybe` elements, which have no `CMP` ("args = (Just[\Int\],Just[\Int\])", my `Sk_maybe`), and stopped. So the set dropped no duplicate that the list now keeps; only the order changes.

The worker's decision 6 cites the documentation as `Library/Reflect.fss:121`. That line is blank at the base; the sentence is at `:122` there and at `:123` on the head. I left the decision's text as the worker wrote it.

The precedents hold:
- `PCMP` bounded per element in `0948c2b1c` (`git show 0948c2b1c:Library/RangeInternals.fss`, `:125-128`);
- the tuple reductions' bounds, at `Library/FortressLibrary.fsi:2011-2027` at the base;
- the prelude's lazy `LEXICO` at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:704`. Its body is one declaration on `Comparison`, `if self=EqualTo then other() else self end` (`CompilerBuiltin.fss:1496-1497`). The rung splits it into three arms, as the judgement directs and as the interpreter library's strict form is split (`Library/FortressLibrary.fss:138`, `:176`, `:210` at the base);
- `IntMap`'s own `addU`, `add`, `UNION` and `intersectionOp` shapes for `genComb`.

No other site in the library compares tuples through an unbounded parameter. A grep for generic `<`, `<=`, `>`, `>=` and `CMP` over `Library/` and `LibraryBuiltin/` finds only the ten operators. `Tuple.fsi` declares no order.

The library's other callers of a tuple order, which the suite does not run:
- `QuickCheck`'s `checkResult` sorts `(freq, objs)` pairs (`Library/QuickCheck.fss:1128`), whose `objs` is a `List[\Any\]`;
- `Relation` keeps sets of `(T,T)` pairs (`Library/Relation.fss:221-227`) over a `T` that its `Set[\T\]` already orders.

Both pass the bound: a list is a `LexicographicOrder` at every element type (row 634). My `Sk2_anyList`, `(1, <|[\Any\] 1, "a"|>) < (1, <|[\Any\] 2|>)`, is `true` on both trees. `Map.fromCopiedArray` sorts `(Key,Val)` pairs by its own `lt` on the keys (`Library/Map.fss:157-160`).

`TotalComparison`'s three `LEXICO` overloads (strict, `()->TotalComparison`, `()->Comparison`) are ordered by their arrow types, since `()->TotalComparison` is below `()->Comparison`. So they are not the thunk-only ambiguity that row 553 repaired in `openRangeHelper`, whose arrow types are unrelated. The distance's overloading stage reads 0.

The sibling rungs' branches touch none of O's declarations, and `git merge-tree` of O's head with each of the four branches reports no conflict:
- N's library hunks are in `Array2` and `Array3`;
- G's are in `Generator`, `Indexed`, the new `SimpleIndexValuePairs` and `RelationalPredicateCondition`. The last is below the tuple operators and compares no tuple;
- V's branch edits no library file;
- W's walk check refuses only declarations with the modifier `override`, and the rung declares none.

The sibling rungs' new tests compare no tuple, by grep.

## 4. My programs: old code against the rung's tree

All my programs are under `tmp/rung-tuple-orders/skeptic/`.
- Walk, new code: `bin/fortress P.fss` in the worktree.
- Walk, old code: `old-fortress.sh /home/user/fortress-base13 /home/user/fortress-orders/tmp/old-caches P.fss`.
- The rung writes no mutable state. My `IntMap` program ran at `FORTRESS_THREADS=1` and at `=4`, and the others at 1. The harness runs its tests at 4.

### The tuple orders and the comparisons

71 small programs, each printing one or two values: `runall.sh` over `t/` and `t2/`, and `s2/runall2.sh` over `s2/`. These moved:

| expression | old | new |
|---|---|---|
| `(1, 2) < (1, 2.5)` | `true` | refused: "Failed to find any matching overload, args = ((1,2): (Int,Int),(1,2.5): (Int,FloatLiteral))" |
| `(1, 2) < (1.5, 2)`, `(1, 2.5) <= (1, 3)`, `(1,2,3) < (1,2,3.5)` | `true` | refused, the same |
| `(1, 2) CMP (1, 2.5)` | `LessThan` | refused, the same |
| `(1, 2) < (widen(1), 2)` | `false` | refused: "args = ((1,2): (Int,Int),(1,2): (Long,Int))" |
| `(1, 2, (3,4)) < (1, 3, (0,0))` | `true` | refused |
| `(1, (2,3)) CMP (2, (0,0))` | `LessThan` | refused |
| `(1, fn (x:ZZ32) => x) < (2, fn (x:ZZ32) => x)` | `true` | refused |
| `(1, Nothing[\ZZ32\]) < (2, Nothing[\ZZ32\])` | `true` | refused |
| `(0.0/0.0, 1) CMP (0.0/0.0, 1)` | stops at `:4499`, `LEXICO` with `Unordered` | `Unordered` |
| `(1, 0.0/0.0, 1) > (1, 1.0, 1)` | `MatchFailure` at `:4531` | `false` |
| `Unordered LEXICO: Unordered`, `(0.0/0.0 CMP 1.0) LEXICO: (1 CMP 2)` | stop | `Unordered` |
| `EqualTo LEXICO (fn (): Comparison => Unordered)` | stop: "args = (EqualTo,FnExpr ... ()->Comparison ...)" | `Unordered` |
| `Unordered LEXICO f`, with `f: ()->Comparison = fn () => GreaterThan` | stop | `Unordered` |
| `isLeftZero` of `LessThan`, `GreaterThan`, `EqualTo` | `false`, `false`, `false` | `true`, `true`, `false` |
| `LexicographicReduction.isLeftZero(Unordered)` | `true` | refused: "Failed to find any matching overload, args = (Unordered)" |

These did not move:
- pairs of `ZZ64`, `NN32`, `ZZ`, `RR32`, `QQ`, `Char`, `Boolean`, `String` triples, ranges and comparisons, each typed alike in both pairs;
- a long concatenated `String` against a literal one, at either position, `true`: walk joins the two string classes at `String`;
- `(P1, 1) < (P2, 0)` over two objects of a trait `Pt extends StandardTotalOrder[\Pt\]`, `true`: walk joins them at `Pt`;
- `(1, <|[\Any\] 1, "a"|>) < (1, <|[\Any\] 2|>)`, `true`, and `(2, ...) < (1, ...)`, `false`;
- `((1,2),3) = ((1,2),3)`;
- the strict `LEXICO` with `Unordered` or `EqualTo` on the left;
- the lazy `LEXICO` with `LessThan`, `GreaterThan` or `EqualTo` on the left of the thunk that `LEXICO:` builds;
- a thunk held in a variable declared `()->Comparison` whose function expression declares no return type: `EqualTo LEXICO f` is `GreaterThan` on both, since the value is still typed `()->BOTTOM`;
- `BIG LEXICO`;
- sets and maps of pairs, including `{[\(ZZ32,RR64)\] (1,2.5), (1,2), (0,1.0)}`;
- operands declared with one type: `do a: RR64 = 2; b: RR64 = 2.5; (1, a) < (1, b) end` and `p: (ZZ32,RR64) = (1,2)` against `q` are `true` on both;
- stops on both, `(1, "a") < (1, 'b')` and `(Just(1), 2) < (Just(1), 3)`: at the base inside the element comparison, now at the outer call.

The new rows of the table are findings 1, 2, 7 and 8 below.

### `IntMap`'s `combine`

`im/SkIntMapComb.fss` builds thirteen key sets:
- the empty set, `{1}`, `{5}` and `{-3}`;
- `0#8`, `4#8`, and the evens and odds;
- `-8..-1` with `3`;
- `{100,200,300}` and `{0,64,65}`;
- `{2^40, 2}` and `0#16`.

It combines every ordered pair of them two ways:
- `addV` with `keepAll` and `neg`;
- a function that drops even keys, with `dropEven` and `keepAll`.

It checks each result's structure with `check()` and compares it, by the trie's structural `=`, with a map built key by key from `member`:

    checked 338 combines, 0 mismatches          (new code, FORTRESS_THREADS=1 and =4)
    ** bug! MethodClosure genComb[\That,Result\](f:(FortressLibrary.ZZ64, SingletonIM[\Val\], ...   (old code)

### The compiled path

`comp/SkCompTuple.fss`, `comp/SkCompIntMap.fss` and `s2/comp/SkCompLexico.fss` ran with `fortress compile` and `fortress run`, on the rung's tree and on the old code. The compiled path links the compiler's prelude, so they give the same answers on both:
- "Could not check call to operator < ... not applicable to an argument of type ((IntLiteral, IntLiteral), (IntLiteral, IntLiteral))";
- "Library/IntMap.fsi:86:23-34: Comprehension is undefined.";
- `LessThan`, `Unordered` and `Unordered`, for `LessThan`, `EqualTo` and `Unordered` `LEXICO` a thunk `fn (): Comparison => Unordered`.

The last is what walk now answers, where walk stopped at the base (finding 7). The worker's `NanLess` probe answers `false` for `nan < 1.0` on both paths.

## 5. Findings and what I did

1. **A value walk prints that changes, not in the report: a position whose numbers have two run-time types is now refused.**
   - The cases: `(1,2) < (1,2.5)` was `true`, `(1,2) CMP (1,2.5)` was `LessThan`, and `(1,2) < (widen(1),2)` was `false`; each is now refused (section 4).
   - The cause: walk takes the element type at the join of the two run-time types, which is no `StandardPartialOrder`. That is row 511's tuple shape ("a tuple parameter `(T, T)` is not promoted"), on which the specification is silent, now meeting the bound.
   - The judgement's list of unchanged values (`explorations/reviews/tuple-comparisons-judgement.md:83`) names only element types that are alike in both pairs.
   - What I did:
     - pinned the refusal, as the worker's decision 3 pinned `(1,()) < (2,())`: `ProjectFortress/tests/TupleOrderMixedRefused.fss` and `.test`, `load_exception_contains=Failed to find any matching overload, args = ((1,2): (Int,Int),(1,2.5): (Int,FloatLiteral))` (`9322ecb28`);
     - added it to the report's value changes, to the record's FACTS entry and row 634 note, to a new note for row 511, and to the revival-change entry (`782c547c1`);
     - listed it as a point and a question for the curator.
   - The pin's runs, through the harness:

         FORTRESS_HOME=/home/user/fortress-base13 /home/user/fortress-base13/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/sk-old-harness ProjectFortress/tests/TupleOrderMixedRefused.{fss,test}
          Missing expected refusal at load
         Tests run: 1,  Failures: 1,  Errors: 0
         explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/sk-h1 <the same files>     (tree 03193eec1, the worker's code)
          OK Saw expected refusal at load
         OK (1 test)

   - Settled by the section's bound, way 1b (`explorations/coordinator/CLIMB-BATCH-13.md:223`), and by its point "A value walk prints that changes, each with its before and after ... and any other" (`:419`). The pin asserts what that bound makes walk do.

2. **More values that change, not in the report.**
   - A pair nested as a later element of a pair or triple: `(1,2,(3,4)) < (1,3,(0,0))` was `true`, `(1,(2,3)) CMP (2,(0,0))` was `LessThan`.
   - A function or a `Maybe` as an element: `(1, fn ...) < (2, fn ...)` and `(1, Nothing[\ZZ32\]) < (2, Nothing[\ZZ32\])` were `true`.
   - All are now refused. They have the mechanism of the worker's pinned nested and `()` cases, so I added them to the report's value changes (`782c547c1`) with no further pin.

3. **Citations, corrected in `782c547c1`.** The report gave:
   - the pair `=` operator at `.fss:4450`, which is `:4451` on the head;
   - "name-type pairs *are* unique" at `Library/Reflect.fss:130`, which is `:131` at the base;
   - "Returns a list of every members" at `:121`, which is `:123` on the head.

4. **Row 457's note, in `record.md`, attributed `LessThan LEXICO: Unordered` to the lazy `LEXICO` the rung adds.**
   - The thunk that `LEXICO:` builds is typed `()->BOTTOM` under walk (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java:239`; row 587), so a total comparison on the left keeps the team's `()->TotalComparison` arm.
   - That value is `LessThan` at the base too, and my `GreaterThan LEXICO: Unordered` gives `GreaterThan` on both.
   - The note now says so (`f7e3f3ca4`, refined in `dc97a82f5`).

5. **`IntMap`'s `genComb` is right.** It gave 338 of 338 structurally equal results (section 4). No defect.

6. **The count's total stays 1**, at the component crash `FortressLibrary.fss:1307` (section 1). It is confirmed, and the worker's question stands.

7. **The report said the two new arms are not reached under walk. A thunk declared to return `Comparison` reaches them, and no test asserted them.**
   - The report's section 1.2 said "Under walk the arms are not reached". The rung's tests reach the lazy `LEXICO` only through the thunks `LEXICO:` builds, typed `()->BOTTOM`. Those thunks fit the team's `()->TotalComparison` arm, so no test ran `TotalComparison`'s or `EqualTo`'s new arm.
   - A function expression with a declared return type `Comparison` is typed `()->Comparison` and reaches them. At the base no declaration took it, and walk stopped: `EqualTo LEXICO (fn (): Comparison => Unordered)` gave "Failed to find any matching overload, args = (EqualTo,FnExpr ... ()->Comparison ...)". On the rung's tree it is `Unordered`, the compiled path's answer.
   - What I did:
     - wrote `ProjectFortress/tests/ComparisonLazyLexico.fss` (`4eaf4530f`). For a thunk `fn (): Comparison => ...`, it asserts the `LEXICO` table's answer with `LessThan`, `GreaterThan`, `EqualTo` (twice) and `Unordered` on the left;
     - corrected the report's sentence, its value changes, points and homes, and the record's FACTS entry, "Gated by" line and row 457 note (`dc97a82f5`).
   - Its runs, through the harness:

         FORTRESS_HOME=/home/user/fortress-base13 /home/user/fortress-base13/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/sk2-old-harness ProjectFortress/tests/ComparisonLazyLexico.fss
         Failed to find any matching overload, args = (LessThan,FnExpr at .../ComparisonLazyLexico.fss:6.17 ()->Comparison ...
         FAILURES!!!
         Tests run: 1,  Failures: 1,  Errors: 0
         explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/sk2-h1 ProjectFortress/tests/ComparisonLazyLexico.fss     (tree f7e3f3ca4, the worker's code)
         PASS
         OK (1 test)

   - Settled by `Specification/advanced-lib/comparison.tex`, trait `Fortress.Standard.Comparison`, `opr LEXICO`: "The operator LEXICO returns its right argument if the left argument is EqualTo; otherwise it returns its left argument" (`:168-169`). Also by the section's arms, "its default = Unordered beside :138, TotalComparison's = self beside :177 and EqualTo's = other() beside :211" (`explorations/coordinator/CLIMB-BATCH-13.md:223`).

8. **A value walk prints that changes, not in the report: `LexicographicReduction.isLeftZero(Unordered)` was `true` and is now refused**, "Failed to find any matching overload, args = (Unordered)" (`s2/Sk2_ilzU.fss`).
   - At the base the team's `isLeftZero(_:Comparison)` took it. The curator's decision declares that overload over `TotalComparison`, the reduction's own element type (POSITIONS, "`LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached (row 582).").
   - The specification says `isLeftZero` is "true for all other comparison values", `Unordered` among them (`comparison.tex`, trait `Fortress.Standard.Comparison`). That sentence is about a method of the comparison values themselves, which takes an `Operator[\LEXICO\]`, not about this reduction object over `TotalComparison`. So it is no evidence against the decision.
   - "Nothing calls `isLeftZero`" (the decision).
   - What I did: added the value change to the report's section 6 and its points, and to the record's row 582 note, its handover and its revival-change line (`dc97a82f5`). There is no pin: the call is outside the reduction's declared domain, which the decision sets.

9. **A citation, corrected in `99b8bbc3c`.** The report cited the tuple reductions' bounds at `Library/FortressLibrary.fsi:2011-2027`, which are the base's lines. They are `:2014-2030` on the head.

## 6. Homes

- Row 634's tuple half, row 582, row 667 and `Reflect`'s members: home 1, each with its test.
- The lazy `LEXICO` with a thunk declared `()->Comparison` (finding 7): home 1, part of row 634's repair; `ComparisonLazyLexico`.
- NEW-O-1 (`IntMap`'s `SYMDIFF`; the specification is silent on `IntMap`): home 3, `IntMapSymdiffSingleton`. I confirmed the cause at `Library/IntMap.fss:544-545` at the base, `self.seek(other.key) SYMDIFF other`, beside the singleton's own `:352-355`.
- NEW-O-2: home 3, `TupleOrderBounds.fss:19`, `CONTESTED`.
  - `opr-overview.tex`, "Comparisons Operators", says a float comparison with a NaN throws `FloatingComparisonError`.
  - `numbers.tex`, "Rational Numbers", makes `QQ`'s 0/0 comparisons `false` "for compatibility with floating-point arithmetic".
  - Both libraries declare `FloatingComparisonError` (`Library/FortressLibrary.fss:1719`, `Library/CompilerLibrary.fss:239`), and nothing throws it.
  - The same paragraph of `opr-overview.tex` also says a rational comparison at 0/0 throws `RationalComparisonError`, so the two passages disagree for rationals as well. That is beside the row, and adds nothing to its repair.
- Both new rows pass `ledger.py check --rows`, apart from their placeholder numbers.
- Finding 1: home 3. The specification is silent on the tuple shape (row 511's citation cell), so it gets a test of today's value, `TupleOrderMixedRefused`, and a note on row 511.
- Finding 8: not a defect. The decision on record sets the domain.

## 7. The failure-mode question

- Where walk stopped on a pair or triple whose deciding elements are unordered, with a `MatchFailure` or a missing `LEXICO` arm, it now answers:
  - `false` to `<`, `<=`, `>` and `>=`. That is the judgement's default (`explorations/reviews/tuple-comparisons-judgement.md`, section 3), and what `RR64`'s own comparisons answer;
  - `Unordered` to `CMP`, as the specification's `LEXICO` table gives (`Specification/advanced-lib/comparison.tex`, trait `Fortress.Standard.Comparison`, `opr LEXICO`).
- The specification is silent on tuples. For a NaN element, the quiet `false` agrees with `numbers.tex` and not with `opr-overview.tex` (NEW-O-2).
- A comparison followed by a thunk declared `()->Comparison` stopped walk, and now gets the `LEXICO` table's answer, the compiled path's (finding 7).
- `combine` turns walk's `InterpreterBug` into a map, and my programs show that map is right.
- In the other direction, values become refusals: findings 1, 2 and 8, and the worker's pins.

## 8. The rest of the checks

- The specification: nothing it says is made false.
  - No Appendix I entry or `\revision` box names tuple comparisons, `LEXICO`, `isLeftZero`, `IntMap` or `Reflect`.
  - The `Tuple` revision in `Specification/basic-lib/objects.tex`, "No tuple type extends a trait", agrees with the nested refusal.
- Competing declarations: none.
  - The new test names, `TupleOrderMixedRefused` and `ComparisonLazyLexico` included, occur only in their own files across `ProjectFortress/src`, `tests`, `test_library`, `compiler_tests`, `library_tests`, `other_compiler_tests` and `Library`.
  - No sibling rung adds a file of those names.
- The ledger:
  - `ledger-find` for tuples, `LEXICO`, `isLeftZero`, thunk, `IntMap`, `Reflect`, NaN, `Unordered`, `FloatingComparisonError`, `RationalComparisonError` and `SYMDIFF` turns up rows 511, 457, 462, 440, 488, 553, 587, 665 and 667.
  - The record notes each that the rung reaches. Row 511 is now among them. Rows 553 and 587 need no note (section 3, finding 4).
  - No existing row covers NEW-O-1 or NEW-O-2.
- The model program's sources compare no tuples, by grep. No spec example under `SpecData/examples` compares tuples.
- A whole suite for my fixes: none. They are two test files and a `.test`, with no Java, Scala or library change.

## 9. Points to report the rung reaches

The worker's eleven hold. Findings 1, 2, 7 and 8 add to the first, "a value walk prints that changes ... and any other". None holds the push: each change is a library edit or a test, and can be undone.

## 10. Questions for the curator

The worker's four stand.

One more, from finding 1. Under item 43's default, walk refuses a pair whose elements at one position are numbers of two run-time types: `(1,2) < (1,2.5)`, which answered `true`. The cause is that walk does not promote a tuple position before it checks the bound (row 511's tuple shape). The ways:
- keep the refusal, the default as built;
- have walk promote the position first, a walk edit under row 511;
- bound the operators otherwise.

Evidence: `ProjectFortress/tests/TupleOrderMixedRefused.test:1`; `explorations/fortress-gap-ledger.md:161` (row 511); `explorations/reviews/tuple-comparisons-judgement.md:83`.
