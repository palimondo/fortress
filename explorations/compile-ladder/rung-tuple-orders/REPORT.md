# Rung O of climb batch 13: the tuple orders, `isLeftZero` over `TotalComparison`, and `IntMap`'s `genComb`

- problem: the 19 sites of rows 634 (tuple half) and 582 in the landed per-site list, `explorations/compile-ladder/gate/distance-sites.tsv` (the `isLeftZero` pair at `FortressLibrary.fsi:93` and `FortressLibrary.fss:123`; the 17 "Could not check call to operator CMP" sites at `FortressLibrary.fss:4459`, `:4469`, `:4479`, `:4489`, `:4499` twice, `:4511` twice, `:4521` twice, `:4531` twice, `:4541` twice, `:4551` three times), the count's last error (`explorations/compile-ladder/climb-batch-12/gate/checker-count.txt:5`, `FortressLibrary 2`), and row 667's walk stop at `Library/IntMap.fss:112` at the base
- spec: `Specification/advanced-lib/comparison.tex:65-81` (trait `Fortress.Standard.TotalComparison`: the `LEXICO` table, and `isLeftZero` "returns false for EqualTo and true for all other total comparison values") and `:168-186` (trait `Fortress.Standard.Comparison`: the `LEXICO` table with `Unordered`); tuples: none, `Specification/basic/operators/opr-overview.tex:276-295` (subsection "Comparisons Operators") names numbers, characters, strings and lists, no tuple; `IntMap`, `genComb`, `Reflect`: none, `grep -rn "IntMap\|genComb\|members()" Specification --include=*.tex` prints nothing
- precedent: `PCMP` and `SCMP`, bounded per element by the team (`Integral` per element, `0948c2b1c`, `Library/RangeInternals.fss:125-128` in that commit) and typed `ZZ32` per element by the revival (`Library/RangeInternals.fss:99-121`); the tuple reductions' per-element bounds (`Library/FortressLibrary.fsi:2014-2030`, `:2011-2027` at the base); the strict and lazy `LEXICO` arms of `TotalComparison` and `EqualTo` (`Library/FortressLibrary.fss:176-177`, `:210-211` at the base) and the team's compiler prelude's lazy `LEXICO` on `Comparison` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:704`); for `genComb`, `Map`'s `combine` on its empty and node objects (`Library/Map.fss:260-266`, `:421-436`) and `IntMap`'s own `union`, `addU`, `add`, `UNION` and `intersectionOp` on the same three objects (`Library/IntMap.fss:191`, `:300-302`, `:455-457`, `:488-489`, `:514-521` at the base); for `Reflect`'s `members`, `ReflectiveQuickCheck`'s list over the same members (`Library/ReflectiveQuickCheck.fss:293-297`)
- deviation: the triple headers wrap after the static parameters (`Library/FortressLibrary.fss:4513-4514`, `:4525-4526`, `:4537-4538`, `:4549-4550`, `:4561-4562`), as the team's 2008 `PCMP` header did, and the pair headers stay on one line; the 2008 comment "Shouldn't these operators have to extend something? A,B,C?" (`Library/FortressLibrary.fss:4448` at the base) is removed; the refusal tests key on walk's own message, "Failed to find any matching overload, args = ...", not "Cannot unify" (decision 4); `Library/Reflect.fss:10`, `:137-146`, outside the brief's files, builds its members as a list (decision 6)
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `Library/IntMap.fss`, `Library/Reflect.fss` (first edits `Library/FortressLibrary.fss:123`, `Library/FortressLibrary.fsi:93`, `Library/IntMap.fss:213`, `Library/Reflect.fss:10`)

The harness refused the write of this file; the text is the report.

Branch `wip/rung-tuple-orders`, base `a1a75716a`. Commits: the tests `f7bd159a1`; the library edit `636d687b3`; `Reflect`'s members `069f2f0b4`; the `SYMDIFF` pin `2c7b5d1f8`; the NaN pin `4f84f330a`. Nothing under `ProjectFortress/src/` changed: no Java, no Scala, no build.

## 1. What changed, and why

The answers followed:
- row 582's decision (POSITIONS, "`LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached (row 582).");
- item 43 at the default of `explorations/reviews/tuple-comparisons-judgement.md`, way 1b, on the curator's standing go, listed for his review;
- row 667, by PLAN's line for it.

All 19 sites are gone, row 488's site at `:130` went with them, and no site came. The distance falls from 153 to 133. The count's table reads 0 for every api, but its total stays 1 (section 3).

### 1.1 Row 634's tuple half, under Q43 (17 sites)

- The ten order operators on pairs and triples bound each element type: `[\A extends StandardPartialOrder[\A\], B extends StandardPartialOrder[\B\]\]`, and `C extends StandardPartialOrder[\C\]` on the triples. This is in the api (`Library/FortressLibrary.fsi:2628-2632`, `:2634-2638`) and the component (`Library/FortressLibrary.fss:4457`, `:4468`, `:4479`, `:4490`, `:4501`, `:4513`, `:4525`, `:4537`, `:4549`, `:4561`). The two `=` operators stay unbounded (`.fsi:2627`, `:2633`; `.fss:4451`, `:4507`).
- Each of the eight `typecase`s gains `Unordered => false` (`.fss:4464`, `:4475`, `:4486`, `:4497`, `:4521`, `:4533`, `:4545`, `:4557`). That is what `RR64`'s own `<`, `<=`, `>` and `>=` answer for a NaN (`.fss:442-445` on the rung's tree, `:439-442` at the base). It is also what the specification gives `QQ`'s five comparisons at 0/0, "for compatibility with floating-point arithmetic" (`Specification/basic-lib/numbers.tex:372-376`).
- The 2008 comment above the operators is answered and removed.

### 1.2 The lazy `LEXICO` on `Comparison` (no site; an extension under the library rule)

The new declarations, each beside the strict form and the `()->TotalComparison` arm it has:
- `Comparison` gains `opr LEXICO(self, other:()->Comparison): Comparison = Unordered` (`.fss:139`, api `.fsi:105`).
- `TotalComparison` gains its arm `= self` (`.fss:179`, `.fsi:135`).
- `EqualTo` gains its arm `= other()` (`.fss:214`, `.fsi:167`).

The precedent lines are the `()->TotalComparison` arms at `.fss:177` and `:211` (base) and the team's prelude's `opr LEXICO(self, other:()->Comparison): Comparison` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:704`, body `CompilerBuiltin.fss:1496-1497`).

The answers are the specification's table (`Specification/advanced-lib/comparison.tex:168-180`): `Unordered` on the left gives `Unordered`, `EqualTo` gives the right operand, and a total comparison other than `EqualTo` gives itself.

The bodies over a pair (`(a1 CMP a2) LEXICO: (b1 CMP b2)`) need it. With the bound, `a1 CMP a2` is a `Comparison` and the thunk is a `()->Comparison`. Before, only `Comparison`'s `LEXICO` over a `Comparison` was declared for such a receiver, and it does not take a thunk. Without the two arms, the compiled path would send `LessThan LEXICO: thunk` to the default and answer `Unordered`. This is by reading: no compiled program links this library yet.

Under walk the thunks that `LEXICO:` builds do not reach the two arms. Walk types a function expression without a declared return type as `()->BOTTOM` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java:239`; the old run's message in section 2 reads "FnExpr at Library/FortressLibrary.fss:4499.26 ()->BOTTOM"). That fits `()->TotalComparison`, the more specific arm. With these thunks, only `Unordered` on the left reaches the new default, where the base found no declaration and stopped.

A function expression whose declared return type is `Comparison` is typed `()->Comparison`, and does reach the two arms. At the base no declaration took it, and walk stopped: `EqualTo LEXICO (fn (): Comparison => Unordered)` is now `Unordered`, and `LessThan LEXICO` of it is `LessThan` (the skeptic's `ProjectFortress/tests/ComparisonLazyLexico.fss`).

### 1.3 Row 582 (2 sites)

`LexicographicReduction`'s `isLeftZero(_:Comparison)` is now declared over `TotalComparison` (`.fss:123`, `.fsi:93`), so the inherited `ReductionWithZeroes.isLeftZero(l:TotalComparison)` (`.fss:3189` on the rung's tree) no longer shadows it. `LessThan` and `GreaterThan` answer `true` and `EqualTo` answers `false`, which are the specification's answers (`Specification/advanced-lib/comparison.tex:78-81`). The pin changes (section 6).

### 1.4 Row 667: `genComb` in `IntMap`'s three objects (no site)

`IntMap`'s abstract `genComb` (`Library/IntMap.fss:125`), which `combine` calls (`:112`), gets a body in each object, in the shapes named in the provenance:

- `EmptyIM` (`:213-220`): a non-empty other map goes through `mapThat`; otherwise the result is the empty map.
  - Precedents: `EmptyMap.combine`'s `mapThat(that)` (`Library/Map.fss:260-266`) and `EmptyIM`'s `union = other` (`IntMap.fss:191` at the base).
  - It is a `typecase` with an `else`, written as `NodeIM.intersectionOp` writes it (`:514-521` at the base), because `mapThat` takes a `NonEmptyIntMap`.
- `SingletonIM` (`:386-403`):
  - Against a singleton on its key: `f(key, self, that')`.
  - Against a singleton on another key: the two mapped singletons joined in key order, as `addU` joins them (`if s.key < key then s.ordJoin(self) else self.ordJoin(s)`, `:300-302` at the base).
  - Against a node: it goes down the node's side that holds its key and joins the other side mapped, as `NodeIM.add` does (`if k < key then left.add(k,v).ordJoin(right) else left.ordJoin(right.add(k,v))`, `:455-457` at the base).
  - Against the empty map: `mapThis(self)`, as in `NodeMap.combine`'s `if that.isEmpty then mapThis(self)` (`Library/Map.fss:427`).
- `NodeIM` (`:633-648`):
  - Against a singleton: the same descent on its own sides (`NodeIM.add`'s shape).
  - Against a node: `nodeNode` splits both maps, and the halves are combined and joined at the split key, as `NodeIM`'s `UNION` and `intersectionOp` do (`(l1,l2,k,r1,r2) = self.nodeNode[\V\](other'); (l1 INTERSECTION l2).ordJoin(k, r1 INTERSECTION r2)`, `:488-489` and `:514-521` at the base).
  - Against the empty map: `mapThis(self)` (`Map.fss:427`).

Two forms of `ordJoin` are used:
- A join of two results whose keys may lie outside the node's range uses the one-argument `ordJoin`, which places the split key itself, as `add` does.
- A join of halves split at a known key uses `ordJoin(k, ...)`, as `UNION` and `mapFilter` do.

`IntMapCombine` checks each result's structure with `check()` and compares it with the map built directly. No api declaration changes, since `genComb` is private to the component.

### 1.5 `Reflect`'s `members` as a list (no site; a library caller the bound refused)

The interpreter suite on `636d687b3` failed two tests, `ReflectTest` and `ReflectiveQuickCheckTest` (section 4).

The cause: `Reflect`'s `members` getter built a set of `(String, Type, Maybe[\(Object,Any...)->Any\])` triples (`Library/Reflect.fss:135-145` at the base). The set's sort (`Library/Set.fss:86`, `Library/QuickSort.fss:49`) compared triples whose third element is no partial order. Before the bound, the third elements were never compared, since "name-type pairs *are* unique" (`Library/Reflect.fss:131` at the base). With the bound, walk refused the call at once.

The repair: the getter now builds a list, `<|[\...\] ... |>`, with `import List.{...}` (`Library/Reflect.fss:10`, `:137-146`). This follows its own documentation ("Returns a list of every members", `:123`) and the list that `ReflectiveQuickCheck`'s `properties` builds over the same members (`Library/ReflectiveQuickCheck.fss:293-297`).

The effects:
- The members come in the order the type declares them, not sorted by name and type.
- No duplicates are dropped, and the documentation says there are none.
- Both tests pass (section 4).
- The api is unchanged (`Library/Reflect.fsi:96`, a `Generator`).

## 2. The tests: the failing run and the passing run

Written first (`f7bd159a1`), each named by topic:

- `ProjectFortress/tests/TupleOrderBounds.fss` asserts:
  - pairs of integers, of a float and an integer, of strings and of lists;
  - triples under `CMP`, `<=`, `>=` and `>`;
  - `(1, 0.0/0.0) CMP (2, 0.0/0.0)` is `LessThan`;
  - each of the four order operators on a pair, and on a triple, whose deciding elements are unordered is `false`, and `CMP` is `Unordered`;
  - the lazy `LEXICO` of `Unordered`, `LessThan` and `EqualTo`;
  - a float against a NaN, today's value, for row NEW-O-2 (added in `4f84f330a`).
- `TupleOrderNestedRefused.fss` with its `.test`: the top-level `nested: Boolean = ((1,2),3) < ((1,3),0)`.
- `TupleOrderUnitRefused.fss` with its `.test`: the top-level `unitPair: Boolean = (1,()) < (2,())`, the second shape the judgement names (decision 3).
- `IntMapCombine.fss`: `combine` over empty, one-entry and many-entry maps in both orders. The function answers a sum or `Nothing`, and the two map functions keep, drop or map. One case is a one-entry map on a key below all of a many-entry map's keys. Each result's `check()` is compared with the map built directly.
- The pins `LibraryMeetDeclarations.fss:33` and `NumberOrderListDeclarations.fss:41` (section 6).
- `IntMapSymdiffSingleton.fss` (`2c7b5d1f8`), a test of today's values for row NEW-O-1, with no fix. It passes on the base and on the edit.

The failing run, the final test files on the base's code:

    FORTRESS_HOME=/home/user/fortress-base13 /home/user/fortress-base13/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/old-harness ProjectFortress/tests/{TupleOrderBounds.fss,TupleOrderNestedRefused.fss,TupleOrderNestedRefused.test,TupleOrderUnitRefused.fss,TupleOrderUnitRefused.test,IntMapCombine.fss,IntMapSymdiffSingleton.fss,LibraryMeetDeclarations.fss,NumberOrderListDeclarations.fss}
    # harness-one 2026-10-09T19:02:54Z; tree a1a75716a; nproc=4; ...; FORTRESS_THREADS=4; cache filled
    Failed to find any matching overload, args = (Unordered,FnExpr at Library/FortressLibrary.fss:4499.26 ()->BOTTOM Library/FortressLibrary.fss:4499:26), overload = {
    ** bug! MethodClosure genComb[\That,Result\](f:(FortressLibrary.ZZ64, SingletonIM[\Val\], SingletonIM[\That\])->IntMap.IntMap[\Result\], ...
    FAIL: a Boolean: false =/= a Boolean: true; LessThan is a left zero of the lexicographic reduction
     Missing expected refusal at load
    Tests run: 7,  Failures: 5,  Errors: 0

The first such run was at 2026-10-09T18:30:12Z (`Tests run: 6,  Failures: 5`). It used the tests as committed in `f7bd159a1`, on the worktree's own code before any library edit. After it, the refusal keys were corrected (decision 4), and so was one expected map of `IntMapCombine`, which had its values swapped. The run above is on the final text.

The passing run, the same files on the rung's tree after the last edit:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 <the same files>
    # harness-one 2026-10-09T19:03:00Z; tree 4f84f330a; ...
     OK Saw expected refusal at load
    OK (7 tests)

## 3. The count and the distance

The before is the landed gate's tables (`explorations/compile-ladder/climb-batch-12/gate/checker-count.txt`, `distance.txt`) and the per-site list (`explorations/compile-ladder/gate/distance-sites.tsv`). The after ran once, on `636d687b3`.

The last code edit, `Library/Reflect.fss` (`069f2f0b4`), is outside both stages' inputs:
- the count checks `Library/FortressLibrary.fss` and what it imports;
- the distance checks the twelve components of `explorations/coordinator/tools/distance/run.sh:83-85`;
- none of these is `Reflect` or imports it.

The count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-tuple-orders/checker-count-postedit.txt tmp/rung-tuple-orders/cc-post`, against the landed table (`diff`):

    5c5
    < FortressLibrary	2
    ---
    > FortressLibrary	0
    15c15
    < #locations	2
    ---
    > #locations	1

Every api's row is 0, but `#total` stays 1. With the apis clean, the run goes on to check the component, and its first error stops it (the run's log):

    @@PROBE checkApi FortressLibrary -> errors=0
    @@PROBE checkComponent FortressLibrary
    /home/user/fortress-orders/Library/FortressLibrary.fss:1307:10:
        Missing parameter type for i
    File FortressLibrary.fss has 1 error.

That error is in `__bigOperator`'s local `body(i)` (`Library/FortressLibrary.fss:1307`, `:1304` at the base). It is the distance's first `#crash` row and one of PLAN item 47's three declarations. So the count's api rows reach 0 and its total does not (point 4; a question for the curator).

The distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-tuple-orders/distance-postedit.txt tmp/rung-tuple-orders/dist-post` (1,205 s on one core; nproc=4, Intel Xeon @ 2.10GHz, load at start 1.63, openjdk 25.0.4.1, FORTRESS_THREADS=1), compared by `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt tmp/rung-tuple-orders/distance-postedit.txt`:

    DISTANCE DOWN   153 -> 133 (-20)
        kind overloading              2 -> 0      (-2)
        kind typecheck              129 -> 111    (-18)
        class M1                      2 -> 0      (-2)  overloading: the Meet Rule
        class G1                     18 -> 1      (-17)  generic code with no bound compares its values (tuples' <, CMP; LexicographicOrder)
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        unit api FortressLibrary      1 -> 0      (-1)
        unit component FortressLibrary    143 -> 124    (-19)
        crash gone   decl	FnDecl FortressLibrary.fss:1302:1-1306:4	TypeError	FortressLibrary.fss:1304:10: Missing parameter type for i
        ...
        crash new    decl	FnDecl FortressLibrary.fss:1305:1-1309:4	TypeError	FortressLibrary.fss:1307:10: Missing parameter type for i

The three crash rows are the same three crashes, three lines down.

The sites were read by row, not by class (row 577). Each location of `dist-post/errors.tsv` was mapped to the base's line through the diff of `Library/FortressLibrary.fss` and `.fsi`. The rows were then compared with the per-site list by kind, unit, stage, location and message:

- Gone:
  - the `isLeftZero` pair, in the api (`FortressLibrary.fsi:1927,FortressLibrary.fsi:93`) and the component (`FortressLibrary.fss:123,FortressLibrary.fss:3186`);
  - the 17 `CMP` sites at `FortressLibrary.fss:4459`, `:4469`, `:4479`, `:4489`, `:4499` (2), `:4511` (2), `:4521` (2), `:4531` (2), `:4541` (2), `:4551` (3);
  - `FortressLibrary.fss:130`, "Function body has type TotalComparison, but declared return type is BigReduction[\..\]" (row 488's site, point 5).
- Come: none.
- G1's one row left is `LexicographicOrder`'s `a CMP b` (`FortressLibrary.fss:1935`, `:1932` at the base). It is row 634's list half, waiting for the `where`-clause line.

## 4. The interpreter suite and the ladder subset

`ant testSystem` ran once on each code state the library edits made.

On `636d687b3` (the library edit):
- `BUILD FAILED`; shard totals `Tests run: 141, Failures: 1`, `133, 0`, `143, 1`, `141, 0`.
- The two failures were `ReflectTest` and `ReflectiveQuickCheckTest`. Each reported "Failed to find any matching overload, args = ((answer,ReflectArrow[\()->ZZ32\],Just[\(Object,Any...)->Any\]): (FlatString,ReflectArrow[\()->ZZ32\],Just[\(Object,Any...)->Any\]),(foo,...", with context `Library/QuickSort.fss:49:42-46`, `Library/Set.fss:110:43-70` and `Library/Reflect.fss:136:9-145:74`.
- Section 1.5 repairs it. Both tests then pass through the harness on `069f2f0b4` (`OK (2 tests)`, 2026-10-09T18:47:14Z).

On `069f2f0b4` (the last code edit):
- `BUILD SUCCESSFUL`, `Total time: 4 minutes 49 seconds`; shards `Tests run: 141, Failures: 0`, `133, 0`, `141, 0`, `143, 0` (558 tests).
- The tests the brief keeps answer as before: `NumberOrderListDeclarations`, `ResultBoundsRungB`, `RangeKindBodies`, `LibraryMeetDeclarations`, `IntMapTest`, `mapCombine` and `ExclusionRemainderRungH` are OK.
- `XXXLexicoUnorderedRungH` reports "OK Saw expected exception": row 457's strict `LEXICO` is untouched.
- `IntMapSymdiffSingleton` and the NaN line were added after this run, as tests only. They pass through the harness (section 2).

The ladder subset (`gate.md`, "The ladder regression") ran with the drivers copied under `tmp/rung-tuple-orders/ladder/`. By the rule no file qualifies: the compiled path reads none of the edited declarations. Its programs link the compiler's library, and a program importing `IntMap` or `Reflect` stops at the api's names, which the rung does not touch.

Eight files were run as a check:
- `IntMapTest`, `ReflectTest` and `ReflectiveQuickCheckTest` stop at `disambiguate` with the baseline's first errors ("Comprehension is undefined.", and "ImmutableArray is undefined." twice; `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`).
- `tupleTest1`, `tupleTest2`, `returnAndMutateTuple`, `Comparison1` and `Comparison2` pass, as in `explorations/compile-ladder/climb-batch-12/gate/ladder/ladder.tsv`. Their output equals the baseline's `raw/` once the timing line is masked.

No move.

## 5. Where the fix belongs, the ways, and the precedent search

The place is the interpreter's library only (`explorations/coordinator/map/spec-to-implementation.md:327`, "comparison traits ... `Library/FortressLibrary.fss:100-327`"); `IntMap` and `Reflect` are library components. The checker already resolves an operator through an F-bounded parameter (`MinReduction`'s `a MIN b`, judgement section 3), so no checker edit is needed, and none was made.

The precedent search:

- Tuples:
  - The team bounded `PCMP` and `SCMP` per element in 2008 (`git show 0948c2b1c -- Library/RangeInternals.fss`, `opr PCMP[\I extends Integral[\I\], J extends Integral[\J\]\](a:(I,J), b:(I,J))`): six declarations, four over tuples.
  - The revival typed the same six `ZZ32` per element (`Library/RangeInternals.fss:99-121`).
  - The tuple reductions bound each element by `StandardMinMax` (`Library/FortressLibrary.fsi:2014-2030`, `:2011-2027` at the base).
  - Followed: a bound per element, at the order trait the operators use.
  - The same defect has one other site in the file: `LexicographicOrder`'s `a CMP b` (`:1935`), the list half, which is not this rung's.
- The lazy `LEXICO`: `TotalComparison`'s and `EqualTo`'s `()->TotalComparison` arms (`.fss:177`, `:211` at the base) and the prelude's `Comparison` (`CompilerBuiltin.fsi:703-704`). Followed: the prelude's declaration, with bodies in the shape of the arms beside it.
- `genComb`: section 1.4.
- `Reflect`'s members: section 1.5.

The ways the language and the library offer, and the choice, are in section 9.

## 6. Values walk prints that change, and the pins

These were measured with a probe on the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base13 <tree>/tmp/old-caches ProbeTupleOrder.fss`) and on the rung's tree (`bin/fortress P2.fss`, the same probe without its two refused lines):

| expression | base | after |
|---|---|---|
| `((1,2),3) < ((1,3),0)` | `true` | refused: "Failed to find any matching overload, args = (((1,2),3): ((Int,Int),Int),((1,3),0): ((Int,Int),Int))" |
| `(1,()) < (2,())` | `true` | refused: "Failed to find any matching overload, args = ((1,()): (Int,()),(2,()): (Int,()))" |
| `(nan,1) < (1.0,1)`, and `<=`, `>`, `>=` | stops, "Match failure" | `false` |
| `(1,nan,1) < (1,1.0,1)`, and `<=`, `>`, `>=` | stops, "Match failure" | `false` |
| `(nan,1) CMP (1.0,1)` | stops, "Failed to find any matching overload, args = (Unordered,FnExpr ... ()->BOTTOM ...)" | `Unordered` |
| `(nan,1,1) < (1.0,1,1)` | stops, the same | `false` |
| `(1,nan,1) CMP (1,1.0,1)`, `(nan,1,1) CMP (1.0,1,1)` | stops, the same | `Unordered` |
| `Unordered LEXICO: EqualTo` | stops, the same | `Unordered` |
| `LexicographicReduction.isLeftZero(LessThan)` | `false` | `true` |
| `LexicographicReduction.isLeftZero(GreaterThan)` | `false` | `true` |
| `LexicographicReduction.isLeftZero(EqualTo)` | `false` | `false` |
| `m.combine[\ZZ32,ZZ32\](f, g, h, m')` over any `IntMap` | stops, "MethodClosure genComb ... has neither body nor def" | the combined map |
| the order of `typeOf(x).members` | sorted by name and type | the order the type declares |

Unchanged in both runs:
- `(1,2) < (1,3)` is `true`; `(1,2,3) CMP (1,2,2)` is `GreaterThan`; `(1.5,2) < (2.5,1)` is `true`.
- `(1,nan) CMP (2,nan)` is `LessThan`; `(1,nan) CMP (1,1.0)` is `Unordered`; `(1,nan) < (1,1.0)` is `false`.
- Pairs with strings, lists, characters, booleans and comparisons as elements.
- `BIG LEXICO [i <- 0#3] (i CMP 1)` is `LessThan`, and `LessThan LEXICO: Unordered` is `LessThan`.

Measured by the skeptic, old code against the rung's tree, and not in the table above (`SKEPTIC.md`):
- `(1,2) < (1,2.5)`, `(1,2) < (1.5,2)`, `(1,2.5) <= (1,3)` and `(1,2,3) < (1,2,3.5)` go from `true` to a refusal, `(1,2) CMP (1,2.5)` from `LessThan`, and `(1,2) < (widen(1),2)` from `false`: walk takes the element type of a position whose numbers have two run-time types at their join, which is no partial order (row 511). `TupleOrderMixedRefused` pins the first. Operands declared with one type, `p: (ZZ32,RR64) = (1,2)`, compare as before.
- `(1,2,(3,4)) < (1,3,(0,0))` goes from `true`, and `(1,(2,3)) CMP (2,(0,0))` from `LessThan`, to a refusal: a pair as the last or the second element, of the nested pair's kind.
- `(1, fn (x:ZZ32) => x) < (2, fn (x:ZZ32) => x)` and `(1, Nothing[\ZZ32\]) < (2, Nothing[\ZZ32\])` go from `true` to a refusal: a function and a `Maybe` as an element, of the `()` kind.
- `LexicographicReduction.isLeftZero(Unordered)` goes from `true` to a refusal, "Failed to find any matching overload, args = (Unordered)": the reduction's `isLeftZero` is now declared over `TotalComparison` only, as the curator's decision on row 582 says, and the team's `Comparison` overload answered `true`.
- `EqualTo LEXICO (fn (): Comparison => Unordered)` goes from a stop, "Failed to find any matching overload, args = (EqualTo,FnExpr ... ()->Comparison ...)", to `Unordered`, and `LessThan LEXICO` of it from the same stop to `LessThan`: a thunk declared to return `Comparison` reaches the new arms (section 1.2). `ComparisonLazyLexico` asserts these.

The pins are both the revival's lines (climb batch 8 rung M; climb batch 10 rung N), not the team's:

- `ProjectFortress/tests/LibraryMeetDeclarations.fss:33`:
  - before: `assert(LexicographicReduction.isLeftZero(LessThan), false, "today's value: the lexicographic reduction answers its inherited isLeftZero for a total comparison")`;
  - after, three lines (`:33-35`): `isLeftZero(LessThan)` is `true`, `isLeftZero(GreaterThan)` is `true`, `isLeftZero(EqualTo)` is `false`.
- `ProjectFortress/tests/NumberOrderListDeclarations.fss:41`:
  - before: `assert(((1,2),3) < ((1,3),0), "pairs whose first elements are pairs compare lexicographically")`;
  - after: the line is gone, and `TupleOrderNestedRefused` tests the refusal.

## 7. What the specification settles, and the sentences made false

`Specification/advanced-lib/comparison.tex` settles row 582's answers (`:78-81`) and the lazy `LEXICO`'s (`:65-76`, `:168-180`). The text is silent on tuple comparisons (`opr-overview.tex:276-295`) and on `IntMap`.

No sentence of the specification is made false. The grep in the provenance's spec line prints nothing for `IntMap`, `genComb` and `members()`, and no `\revision` box or Appendix I Effect names tuple comparisons, `isLeftZero` or `Reflect`.

One sentence was already false before the rung, measured in passing on both paths: `Specification/basic/operators/opr-overview.tex:286-287`, "Comparison of floating-point values throws \TYP{FloatingComparisonError} if either argument is a \TYP{NaN}" (row NEW-O-2).

Part IV renders the three new `LEXICO` api lines and the ten new headers when the PDF is rebuilt.

## 8. Points to report

1. Values walk prints that change: section 6's table. Beyond the brief's three:
   - `(1,()) < (2,())` goes from `true` to a refusal;
   - the skeptic's further rows after section 6's table: a position whose numbers have two types, a pair nested as a later element, and a function or `Maybe` as an element, each from a value to a refusal; `LexicographicReduction.isLeftZero(Unordered)` from `true` to a refusal; a thunk declared to return `Comparison` after a total comparison, from a stop to the `LEXICO` table's answer;
   - the triples' unordered cases, and the pairs' and triples' `CMP` with an unordered first element, go from a "Failed to find any matching overload" stop to `Unordered` or `false`;
   - `Unordered LEXICO: x` goes from a stop to `Unordered`;
   - `Reflect`'s members come in declaration order.
2. New api declarations: the three `LEXICO` lines (`Library/FortressLibrary.fsi:105`, `:135`, `:167`) and none beyond. `isLeftZero`'s parameter type changed (`:93`). No team declaration was removed; the team's comment at `Library/FortressLibrary.fss:4448` (base) was.
3. Walk's load check of the three `LEXICO` arms: walk loads the library with them, since every suite test ran. The overloading stage's answer: `@@PROBE checkApi FortressLibrary -> errors=0` and the distance's `kind overloading 0`.
4. The count's total stays 1 while its api rows are all 0. Once the api is clean, the count reaches the component check, whose first error is `FortressLibrary.fss:1307:10` "Missing parameter type for i" (`:1304` at the base; PLAN item 47). See section 3.
5. Row 488's site at `:130` moved: "Function body has type TotalComparison, but declared return type is BigReduction[\..\]" is gone from the distance (section 3). Row 488 says the checker's errors in big operators' bodies depend on what it queried earlier in the run, and that one build's runs agree. The edit adds the `LEXICO` declarations the checker queries. No site came behind the 17.
6. A library caller that compares a triple with an unordered element: `Reflect`'s `members` (`Library/Reflect.fss:135-145` at the base). The interpreter suite found it through `ReflectTest` and `ReflectiveQuickCheckTest`, and it is repaired in `Reflect.fss` (section 1.5), a file outside the brief's list. No suite test compares a pair of pairs.
7. Each `genComb` body's precedent line: section 1.4. Walk now runs `EmptyIM.genComb`, `SingletonIM.genComb` and `NodeIM.genComb` for `combine`, where it stopped. No other `IntMap` dispatch changes (`IntMapTest` and `mapCombine` are green).
8. A team test line changed: none. The two pins changed are the revival's.
9. A checker or walk edit: none. No site's only repair is one.

## 9. Decisions

1. **The bound, way 1b, at item 43's default.** Each element is `StandardPartialOrder`, on the ten operators.
   - Not taken: way 1c's `StandardTotalOrder`, which refuses floats; bounding only the first element, which leaves `b1 < b2` refused; leaving the operators and the 17 sites (the judgement's other ways).
   - Evidence: `explorations/reviews/tuple-comparisons-judgement.md` section 3; `0948c2b1c`'s `PCMP`.
2. **`Unordered => false`**, the default.
   - Not taken: keeping today's stop (a `MatchFailure`), which the judgement names for the curator; throwing `FloatingComparisonError` as `opr-overview.tex:286-287` says of floats, which the library's `RR64` does not do (row NEW-O-2).
   - Evidence: `RR64`'s `<` (`.fss:442`), `numbers.tex:372-376`.
3. **A second refusal test**, `TupleOrderUnitRefused`, beyond the brief's list. The judgement read a pair with `()` as "a stop either way", but the base answers `true` (section 6), so the change of value needed a pin.
   - Not taken: reporting it without a test.
4. **The refusal key** is walk's own message: `load_exception_contains=Failed to find any matching overload, args = (((1,2),3): ((Int,Int),Int),((1,3),0): ((Int,Int),Int))`, and its `()` twin. It is not the brief's `Cannot unify`, which walk does not print for this call, at top level or inside a function. The harness run on `636d687b3` printed "Refused at load, but did not satisfy load_exception_contains; expected Cannot unify".
   - Not taken: keeping the brief's key, which is red on the edit.
5. **`genComb` by structural descent and `nodeNode`**, in each object.
   - Not taken:
     - `SingletonIM` against a node by swapping the roles (`that'.genComb` with `f` flipped and the two map functions exchanged). That needs a function expression whose parameter types walk and the checker must infer, where the descent uses the library's `add` shape.
     - A `typecase` in one place in `IntMap`. The trait's `genComb` is abstract, and each object has its own `union` and `intersection`.
     - Overloading `genComb` on the other map's type, as `UNION` is overloaded. `genComb` is a generic method, and `intersection`, the generic one beside it, uses a `typecase`.
6. **`Reflect`'s `members` as a list.**
   - Not taken:
     - narrowing the bound to let an unordered last element through (the checker then refuses `c1 < c2` again);
     - a lazy generator, `members0.specific(...).filter(...).map(...)`, which would call `wrapMethod` at each traversal;
     - giving `Maybe` an order.
   - Evidence: `Library/Reflect.fss:121`, `Library/ReflectiveQuickCheck.fss:293-297`.
7. **The 2008 comment removed.** The judgement says "the rung may drop it".
   - Not taken: keeping a question the edit answers.
8. **The triple headers wrapped** as the team's 2008 `PCMP` header was, and the api lines kept on one line, as in that commit's api.
   - Not taken: one line everywhere (the component's triples ran past 150 characters).
9. **The count and the distance not rerun after the last edit.** The last code edit (`Reflect.fss`) is outside both stages' inputs (section 3).
   - Not taken: a second distance run (20 minutes of one core) on identical input.
10. **Two pins of today's values for two defects met in passing** (rows NEW-O-1 and NEW-O-2), home 3.
    - Not taken: repairing `NodeIM`'s `SYMDIFF` here (not the rung's row); leaving them unrecorded.

## 10. Defects and their homes

- Row 634's tuple half (17 sites): home 1, repaired; tested by `TupleOrderBounds`, `TupleOrderNestedRefused`, `TupleOrderUnitRefused` and the distance. The row gets a note and stays open for the list half.
- Row 582: home 1, repaired; tested at `LibraryMeetDeclarations.fss:33-35`. It closes.
- Row 667: home 1, repaired; tested by `IntMapCombine`. It closes.
- `Unordered LEXICO: x` stopped walk, since no declaration took a thunk with `Unordered` on the left, and so did any comparison on the left of a thunk declared to return `Comparison`: home 1, repaired by the lazy `LEXICO`; tested by `TupleOrderBounds` (`lexico()`) and the skeptic's `ComparisonLazyLexico`. No row: it is part of row 634's repair.
- `Reflect`'s members refused under the bound: home 1, made by this change and repaired in it; tested by `ReflectTest` and `ReflectiveQuickCheckTest`. No row.
- `NodeIM`'s `SYMDIFF` with a `SingletonIM` keeps only the singleton nearest the other key. Under walk, `{0,1,2} SYMDIFF {5}` is `{2,5}` and `{0,1,2} SYMDIFF {1}` is `{}` (old code, probe `ProbeSymdiff.fss`); the cause is `Library/IntMap.fss:544-545` at the base, `self.seek(other.key) SYMDIFF other`.
  - Home 3: the specification is silent on `IntMap`.
  - `IntMapSymdiffSingleton` pins today's values beside the reverse order's right ones; row NEW-O-1.
- A float compared with a NaN answers `false` on both paths: walk, and the compiled `NanLess` probe ("nan < 1.0 is  false", "nan >= 1.0 is  false"). But `opr-overview.tex:286-287` says the comparison throws `FloatingComparisonError`, while `numbers.tex:372-376` gives `QQ`'s 0/0 `false` "for compatibility with floating-point arithmetic".
  - Home 3: the two passages disagree.
  - `TupleOrderBounds` pins `nan < 1.0` as `false`; row NEW-O-2.

## 11. Programs run old against new

- The probe `ProbeTupleOrder.fss` (section 6), on the old code and on the rung's tree.
- The rung's seven test files through the harness: old (`Tests run: 7, Failures: 5`) and new (`OK (7 tests)`).
- `ProbeSymdiff.fss` on the old code (row NEW-O-1).
- `NanLess.fss` under walk and compiled, on the rung's tree (row NEW-O-2; the compiled path does not read the edited files).

## 12. Commands worked out

- The by-row site comparison is a short script. It maps each `file:line` of `dist-post/errors.tsv` to the base's line through `difflib`, over `git show a1a75716a:Library/FortressLibrary.fss` (and `.fsi`) and the tree's file. It then compares the rows with `explorations/compile-ladder/gate/distance-sites.tsv` as a multiset of kind, unit, stage, location and message head.