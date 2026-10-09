# Rung G of climb batch 12: the identity-less reductions' devices typed at the element type (row 628)

- problem: the 13 sites of row 628 in batch 11's landed per-site list, `explorations/compile-ladder/gate/distance-sites.tsv:2-9` (8 abstract-method), `:23-26` (4 at the generator bindings) and `:118` (1 at `MonoidReduction`'s `lift`)
- spec: `Specification/basic/expressions/if.tex:49-52` (a generator binding's condition expression is a `Condition[\E\]`, which `AnyMaybe` is not); the reductions themselves, `Specification/basic/expressions/reductions.tex:76-79`, describe no lifting (`grep -rn 'AnyMaybe\|simpleJoin' Specification/` finds no sentence)
- precedent: `Library/FortressLibrary.fsi:1869` and `:1908` (`lift(r:R)`), `Library/FortressLibrary.fsi:1979` and `:1987` (`simpleJoin(a:T, b:T): T`), `Library/Set.fss:134-136` (`Intersection`'s lifted type `Maybe[\Set[\E\]\]`), `Library/FortressLibrary.fss:3105` (the empty case's `Nothing[\R\]`)
- deviation: the api's own `abstract simpleJoin(a:Any, b:Any): Any` is retyped too (`Library/FortressLibrary.fsi:1907`); every precedent line is already on the side the rung moves towards
- deviation: the component's untyped `simpleJoin(a, b)` of `MinReduction` and `MaxReduction` takes the api's typed form (`Library/FortressLibrary.fss:3291`, `:3300`)
- deviation: four test lines and one demo line that named `AnyMaybe` as a static argument or declared `simpleJoin` at `Any` are respelled at the typed lifted type (`ProjectFortress/tests/HeapTest.fss:80`, `ProjectFortress/tests/RangePrototype.fss:213`, `:336-337`, `ProjectFortress/tests/GeneratorDeclarations.fss:14`, `ProjectFortress/demos/HeapShakedown.fss:99`)
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `Library/Set.fss`, `Library/Set.fsi`, `Library/Generator22D.fss`, `ProjectFortress/tests/HeapTest.fss`, `ProjectFortress/tests/RangePrototype.fss`, `ProjectFortress/demos/HeapShakedown.fss`

The commits on `wip/rung-reduction-types`:
- `17dfc355b`: the tests, with `XXXUnwrittenBigMinMaxWalk.fss` promoted by `git mv` before the edit.
- `1410a62de`: the library edit, the respelled lines and the new expected failure.

The base is `7fa767d48`, and the worktree was seeded from `/home/user/fortress-base12`.

## 1. What changed and why

The identity-less reductions are `BIG MIN`, `BIG MAX`, `BIG MINMAX`, the four tuple forms, `BIG //` and `Set`'s `BIG INTERSECTION`. They carried three devices typed `Any` so that walk's reductions ran while walk gave an unwritten static argument `Bottom` (row 628). Since batch 11's rung W, walk leaves an F-bounded parameter open (FACTS, "Under `walk`, a type parameter whose bound mentions itself and that nothing at a call fixes is left open, ..."), so the devices can take the element type. The edit is all in `Library/`:

- `trait AssociativeReduction[\R\] extends ActualReduction[\R,Maybe[\R\]\]` with `join(a: Maybe[\R\], b: Maybe[\R\]): Maybe[\R\]`, `simpleJoin(a:R, b:R): R`, `lift(r:R): Maybe[\R\] = Just[\R\](r)` and `unlift(r:Maybe[\R\]): R` (`Library/FortressLibrary.fss:3104-3124`; api `Library/FortressLibrary.fsi:1904-1910`).
- `LiftedCommutativeMonoidReduction[\R\] ... extends ActualReduction[\R,Maybe[\R\]\]`, with its `empty`, `join`, `lift` and `unlift` at `Maybe[\R\]` and `Just[\R\]` (`Library/FortressLibrary.fss:3129-3149`).
- `MonoidReduction`'s `lift(r:R): R = r` (`Library/FortressLibrary.fss:3162`), as the api declares it (`.fsi:1920`). This is P2's outcome (i), so the line "under P2(b)" applies.
- Three edits complete the typing under walk, each as the api or the library already writes it (probe P2, the batch record's answers line for G):
  - `ActualReduction`'s abstract `lift(r: R): L` (`Library/FortressLibrary.fss:3062`, api `.fsi:1869`);
  - `Just[\R\](...)` for `Just(...)` in the five lifted bodies, as the empty case writes `Nothing[\R\]`;
  - `MinReduction`'s and `MaxReduction`'s `simpleJoin(a:T, b:T): T` (`Library/FortressLibrary.fss:3291`, `:3300`; api `.fsi:1979`, `:1987`).
- The declared types of the identity-less big operators and their sugar (`Library/FortressLibrary.fss:3293-3416`, `:3523-3528`; api `.fsi:1982-2026`, `:2114`):
  - `BIG MIN` and `BIG MAX`: `BigReduction[\T,Maybe[\T\]\]` and `__bigOperatorSugar[\T,T,T,Maybe[\T\]\]`;
  - `BIG MINMAX`: `Comprehension[\T,(T,T),(T,T),Maybe[\(T,T)\]\]`;
  - the four tuple forms: `Comprehension[\(T,U),(T,U),(T,U),Maybe[\(T,U)\]\]`;
  - `BIG //`: `Comprehension[\Any,String,String,Maybe[\String\]\]`;
  - `Set`'s `BIG INTERSECTION`: `Maybe[\Set[\R\]\]` (`Library/Set.fsi:65`, `Library/Set.fss:128-132`).
- What names the lifted type follows it:
  - the fusion pairs `MaxSumReductionPair` and `MinSumReductionPair` extend `ReductionPair[\T,Maybe[\T\]\]`, and `SumReduction`'s two `distribute` declare `PossibleReductionPair[\Maybe[\T\]\]` (`Library/FortressLibrary.fss:3248`, `:3254`, `:3263`, `:3265`); row 433's bounds are untouched;
  - `Generator22D` calls `generateAT[\Maybe[\SomeMSS2DTuple[\R\]\]\]` (`Library/Generator22D.fss:207`).
- The trait `AnyMaybe` stays: `Maybe` extends it and `HasRank` excludes it (`Library/FortressLibrary.fsi:947-964`, `:1195`). `Library/QuickCheck.fss:758` names the trait in a `typecase` and needs no change.

Probe P2 measured why each completing edit is needed, on shadows, and the last point was measured again here:
- With the types alone, walk's `Just(r)` builds `Just` at the run-time class of `r`, and walk's generics are invariant. So `BIG MIN`, `BIG MAX` and `BIG //` stop ('join param 1 (a:Maybe[\OPEN\]) got arg Just[\Int\]', P2).
- With `ActualReduction`'s abstract `lift(r: Any)`, walk picks that abstract declaration over a typed `lift` (P2, `simpleSum.fss`).
- `MinReduction`'s `simpleJoin(a, b)` has untyped parameters. Under walk these do not implement an abstract `simpleJoin(a:R, b:R)` (row 405's mechanism). Batch 10's rung G measured that stop (`explorations/compile-ladder/rung-generator-slips/REPORT.md` section 8).
- A program's own reduction that declares `simpleJoin` at `Any` stops for the same reason. `RangePrototype.fss`, with `:336-337` respelled and `:213` left at `Any`, stops at 'MethodClosure simpleJoin(a:R,b:R):R Library/FortressLibrary.fss:3116:5-27 has neither body nor def' (my probe: `harness-one.sh` on a copy with `:213` restored, 2026-10-09T11:02:02Z).

## 2. The tests

### The failing runs, on the base's code, before the edit

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-reduction-types/h1 \
        ProjectFortress/tests/UnwrittenBigOperatorsWalk.fss ProjectFortress/tests/UnwrittenBigMinMaxWalk.fss \
        ProjectFortress/tests/UnwrittenTupleMinMaxWalk.fss
    # harness-one 2026-10-09T10:56:46Z; tree 7fa767d48; nproc=4; load 2.66 3.26 4.60; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    ** bug! MethodClosure simpleJoin(a:Any,b:Any):AnyLibrary/FortressLibrary.fss:3116:5-33 has neither body nor def instanceof Method
    FAILURES!!!
    Tests run: 3,  Failures: 3,  Errors: 0

In that run `UnwrittenBigMinMaxWalk.fss` (promoted) and `UnwrittenTupleMinMaxWalk.fss` fail at the abstract `simpleJoin(a:Any, b:Any)`. The third failure was `UnwrittenBigOperatorsWalk.fss`'s own missing `import List.{...}` ('Operator <|_|> is not defined'). With the import added, the guard test passes on the base, as P2 found:

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-reduction-types/h1 ProjectFortress/tests/UnwrittenBigOperatorsWalk.fss
    # harness-one 2026-10-09T10:57:21Z; tree 7fa767d48; ...; cache filled
    PASS
    OK (1 test)

### The passing runs, on the edit

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-reduction-types/h2 <15 files>     (2026-10-09T11:00:00Z)
    . interpret tmp/rung-reduction-types/h2/tests/UnwrittenTupleMinMaxWalk
    PASS
    . interpret tmp/rung-reduction-types/h2/tests/UnwrittenBigMinMaxWalk
    PASS

That run had three failures: `HeapTest.fss`, `RangePrototype.fss` and `GeneratorDeclarations.fss`, at the lines P2 named (section 9). Respelled, the three pass:

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-reduction-types/h2 \
        ProjectFortress/tests/GeneratorDeclarations.fss ProjectFortress/tests/HeapTest.fss ProjectFortress/tests/RangePrototype.fss
    # harness-one 2026-10-09T11:01:30Z; tree 17dfc355b; ...; cache filled
    OK (3 tests)

The interpreter suite ran once, after the last edit of code (the tree later committed as `1410a62de`):

    $ ant testSystem      (2026-10-09T11:07Z to 11:13Z)
    [echo] Caches /home/user/fortress-reductions/default_repository/caches kept
    [junit] Tests run: 129, Failures: 0, Errors: 0, Skipped: 0      (and 133, 132, 135: 529 in all)
    BUILD SUCCESSFUL
    Total time: 6 minutes 6 seconds

That is 529 tests against batch 11's 526 (`explorations/compile-ladder/climb-batch-11/gate/summary.txt`): the three new files, while the promotion only renames one.

### The tests

- `ProjectFortress/tests/UnwrittenBigOperatorsWalk.fss` is P2's program and the rung's first test, a guard that passes before and after. It runs the unwritten clause form of the 12 operators P2 found running on the base, over a non-empty generator, and asserts each value:
  - `BIG MIN[i <- 0#4] (3 - i)` is `0` and `BIG MAX` is `3`;
  - `SUM` is `6` and `PROD[i <- 1#3]` is `6`;
  - `BIG AND` and `BIG OR` are `true`, and `BIG BITXOR[i <- 0#3]` is `3`;
  - `BIG ||` is `"012"`, `BIG |||` is `"0 1 2"`, and `BIG //` is `("0" // "1") // "2"`;
  - `BIG LEXICO[i <- 1#2] (i CMP 1)` is `GreaterThan`;
  - `Map`'s `BIG UNION` of `{[\ZZ32,ZZ32\] i |-> 10 i}` has 3 entries and `20` at `2`.

  It also asserts row 628's `BIG MIN <|[\ZZ32\] 4, 2, 7 |>` is `2`. The ten operators P2 found stopping on the base stay out of it.
- `ProjectFortress/tests/UnwrittenBigMinMaxWalk.fss` was promoted from `XXXUnwrittenBigMinMaxWalk.fss` (row 473's open half) by `git mv` in `17dfc355b`, before the edit. Its assertions are unchanged: `(0, 3)` over `0#4`.
- `ProjectFortress/tests/UnwrittenTupleMinMaxWalk.fss` is new. It fails on the base and passes on the edit: the four tuple forms, unwritten, over `(i MOD 2, i)` for `i` in `0#4`, answer `(0, 0)`, `(0, 2)`, `(1, 1)` and `(1, 3)`.
- `ProjectFortress/tests/XXXUnwrittenSetBigOperatorsWalk.fss` is a new expected failure (section 8, 662). It was shown through the harness both ways:

      $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-reduction-types/h2 ProjectFortress/tests/XXXUnwrittenSetBigOperatorsWalk.fss     (11:06:39Z)
      com.sun.fortress.exceptions.ProgramError: com.sun.fortress.exceptions.ProgramError: Library/FortressLibrary.fss:1304:18-34:
       OK Saw expected exception
      OK (1 test)
      $ ... the same with BIG UNION[\ZZ32\] and BIG INTERSECTION[\ZZ32\] written, for one run     (11:06:42Z)
      PASS
       Missing expected failure
      Tests run: 1,  Failures: 1,  Errors: 0

- These tests kept their verdicts, in the 15-file run and in the suite:
  - `BigMinMax.fss`;
  - batch 11's rung W's `UnwrittenReductionWalk.fss` and `InferUnfixedFBoundedWalk.fss`;
  - `XXXUnwrittenEmptyFloatSumWalk.fss` (row 645), 'OK Saw expected exception';
  - `simpleSum.fss`, `setSum.fss`, `SetTest.fss`, `ListTest.fss` and `MapTest.fss`;
  - `GeneratorDeclarations.fss`, with its line 14 respelled. Its fused arm's three values (`fusedMax` 6, 4, 5) and the lifted sum's `Just(0)` and `Just(5)` are unchanged.

## 3. The count and the distance

The count ran on the edit (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-reduction-types/checker-count-postedit.txt tmp/rung-reduction-types/cc-post`). Its `diff` against `explorations/compile-ladder/climb-batch-11/gate/checker-count.txt` prints nothing: `#total 1` (`isLeftZero`, row 582), unchanged.

The distance, on the edit:

    $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-11/gate/distance.txt tmp/rung-reduction-types/distance-postedit.txt
    DISTANCE DOWN   207 -> 194 (-13)
        kind abstract-method          8 -> 0      (-8)
        kind typecheck              156 -> 151    (-5)
        unit component FortressLibrary    194 -> 181    (-13)

Its class lines (`D1 -8`, `MB -4`, `OT -35`, `V1 +17`, `G1 +18`, `S1 +1`, `I1 -1`, `R4 -1`) are not read. The distance tools' classifier changed between the landed gate's commit `f9d3ec826` and the base: `git diff --name-only f9d3ec826 7fa767d48` lists `explorations/coordinator/tools/distance/classify.py`, `table.py` and `run.sh`. The class is not the row (row 577), so the sites are read by kind, unit and location: `tmp/rung-reduction-types/dist-post/errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`.

- Gone, 13, all row 628's:
  - abstract-method at `FortressLibrary.fss:3289`, `:3298`, `:3307`, `:3338`, `:3358`, `:3378`, `:3398` and `:3496`;
  - typecheck at `:3107`, `:3119`, `:3133`, `:3144` and `:3162`.
- Come: none.
- Same site, message changed, 5:
  - row 433's two `distribute` return-type sites (`FortressLibrary.fss:3075,3263` and `:3075,3265`) now read `PossibleReductionPair[\Maybe[\T\]\]` where they read `PossibleReductionPair[\AnyMaybe\]`; the site and its kind are unchanged;
  - row 425's two `BIG MIN` sites (`:4194`, `:4200`, `String`'s `upto` and `beyond`) now print `BigReduction[\T,Maybe[\T\]\]`;
  - the export site `FortressLibrary.fss:12` lists 44 unmatched declarations where it listed 45. `AssociativeReduction`'s `lift` now matches the api, and `ActualReduction` no longer names an abstract `lift` that the api does not declare (it stays listed for its other members).

No table is committed: the gate's tables on the merged tree are the record.

## 4. Where the fix belongs, and the precedent search

The fix belongs in the library's reductions section and in its `Set` sibling, with no walk or checker edit. `explorations/coordinator/map/spec-to-implementation.md`, row "reductions and big operators", says the reductions are desugared to `__bigOperator` and `__generate` calls with the reduction objects of `Library/FortressLibrary.fsi`. The ways the language and the library offer:

1. Type the devices at the element type, as the api and `Set`'s `Intersection` already write them. The api has `lift(r:R)` at `.fsi:1869`, `:1908` and `:1920`, and `simpleJoin(a:T, b:T): T` at `.fsi:1979` and `:1987`. `Intersection` has `Maybe[\Set[\E\]\]` (`Library/Set.fss:136`). Taken.
2. Write the same types without the three completing edits (row 628's words alone). Not taken: under walk it stops `BIG MIN`, `BIG MAX` and `BIG //`, and 13 of the interpreter suite's 526 tests (P2).
3. Keep `AnyMaybe` and the `Any` devices, and leave the 13 sites (the base). Not taken: the record's answer is the typing (row 628; the P1 judgement, section 5, "a later library rung").
4. Use `where` clauses or a non-generic `Nothing` (POSITIONS, "`Maybe`'s empty case"). Not taken: neither is built on either path.

The library's own spelling of a `Maybe` value is `Just[\T\](x)` and `Nothing[\T\]`. After the edit, `Library/FortressLibrary.fss` writes `Just[\` at 31 places. It builds a bare `Just(...)` at one place only, `just(t:Any):AnyMaybe = Just(t)` (`:1483`), whose type is `AnyMaybe` on purpose. At the base, the five lifted bodies were the other bare ones.

Two declarations with `Any` devices of the same kind are left in the reductions section:
- `ActualReduction`'s `distribute(r: Any)`, which its comment calls "a hack to avoid the error of overloaded methods" (`:3074-3076`);
- `MIMapReduceReduction` with `embiggen` (`:3542-3557`, row 631).

The `Any` of `BIG ||`, `BIG |||` and `BIG //` is their documented input type, not a device.

The team's own port of the protocol declares exactly this typing: `trait AssociativeReduction[\R extends Any\] extends ActualReduction[\R,Maybe[\R\]\]` with `abstract simpleJoin(a:R, b:R): R` and `lift(r:R): Maybe[\R\]` (`ProjectFortress/BirdyLib/Util.fsi:26-32` and `Util.fss:38-56`; Tristan King, 2012-05-12, `98f797296`). It is on no source path and run by no suite, so it is corroboration, not the precedent.

## 5. What the specification settles

The specification settles two things:
- the value of each reduction: `Specification/basic/expressions/reductions.tex:76-79` says the values "are combined together using *Op*";
- the generator binding of `join`: `if.tex:49-52` says the condition's type must be a `Condition[\E\]`, which `Maybe[\R\]` is and `AnyMaybe` is not.

It does not specify the library's lifting. The change is a library repair, and the rung leaves the specification's text unchanged.

## 6. Old against new

Each program ran on the base build's code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base12 <tree>/tmp/old-caches P.fss`) and on the edit (`bin/fortress P.fss`). The probes are under `tmp/rung-reduction-types/probes/` and are not committed.

| program | base | edit |
|---|---|---|
| `BIG MINMAX[i <- 0#4] i`, the four tuple forms | stop at the abstract `simpleJoin(a:Any,b:Any)` | `(0,3)`; `(0,0)`, `(0,2)`, `(1,1)`, `(1,3)` (the tests) |
| `Set`'s `BIG INTERSECTION[i <- 0#3] {[\ZZ32\] i, 1}` | 'MethodClosure simpleJoin(a:Any,b:Any):Any ... has neither body nor def' | 'lift param 1 (r:Set[\OPEN\]) got arg NodeSet[\ZZ32\]' |
| `Set`'s `BIG UNION[i <- 0#3] {[\ZZ32\] i}` | 'join param 1 (a:Set[\OPEN\]) got arg NodeSet[\ZZ32\]' | 'lift param 1 (r:Set[\OPEN\]) got arg NodeSet[\ZZ32\]' |
| `BIG SQCAP[i <- 0#3] Just[\ZZ32\](2)`, `BIG SQCUP` | 'join param 1 (a:UniqueItem[\BOTTOM\]) got arg Just[\ZZ32\]' | 'lift param 1 (r:UniqueItem[\BOTTOM\]) got arg Just[\ZZ32\]' |
| `List`'s and `PureList`'s `BIG CONCAT[i <- 0#3] <\|[\ZZ32\] i \|>` | 'join param 1 (a:List[\BOTTOM\]) got arg ArrayList[\ZZ32\]' (`PureList[\ZZ32\]`) | 'lift param 1 (r:List[\BOTTOM\]) got arg ...' |
| `PrefixSet`'s `BIG UNION` | 'join param 1 (a:PrefixSet[\OPEN,BOTTOM\]) got arg fastPrefixSet[...]' | 'lift param 1 (r:PrefixSet[\OPEN,BOTTOM\]) ...' |
| written forms: `BIG MINMAX[\ZZ32\]`, `BIG MIN_MIN[\ZZ32,ZZ32\]`, `BIG MAX_MAX[\ZZ32,ZZ32\]`, `BIG MIN[\ZZ32\]`, `BIG MAX[\ZZ32\]`, `BIG //`, `Set`'s `BIG INTERSECTION[\ZZ32\]` and `BIG UNION[\ZZ32\]` | `(0,3)`, `(0,0)`, `(1,3)`, `0`, `3`, `0` and `1` on two lines, `{1}`, `{0,1,2}` | the same |
| `ProjectFortress/demos/HeapShakedown.fss` | 148 progress dots, then 'Type of expression, Ratio, not a subtype of RR64' at `:128` (row 449) | before `:99` was respelled: 48 dots, then 'generate param 1 (r:Reduction[\AnyMaybe\]) got arg TestReduction' at `:99`; respelled: 148 dots, then row 449's stop at `:128`, as on the base |

Every operator that stops on the edit stopped on the base too. Of P2's ten that stopped, the four tuple forms now answer. The seven that still stop now stop at the typed `lift` in `__bigOperator` (`Library/FortressLibrary.fss:1304`), not at `join` or at the abstract `simpleJoin`. `Set`'s two are recorded as 662 (section 8). The five with a `BOTTOM` parameter are D2's case (PLAN, "Climb batch 9, listed for his review", D2's entry), already on record.

## 7. The ladder subset

`run-subset.sh` and `classify.py` were copied under `tmp/rung-reduction-types/ladder/` and run on 11 files:
- the edited `HeapTest.fss`, `RangePrototype.fss` and `GeneratorDeclarations.fss`;
- the files whose recorded first error names a reduction declaration that the rung touched or reads: `Generator2Test.fss` (`ActualReduction`), `generatorTest.fss` (`SumReduction`), `IntMapTest.fss` (`Comprehension`) and `BigMinMax.fss`;
- the four new or promoted tests.

None of them is in the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-11/gate/ladder/ladder.tsv`), so they are compared with the baseline's `ladder.tsv`. Each recorded file keeps its phase, `disambiguate`, with its first error naming a declaration the compiler's prelude lacks:
- `HeapTest.fss`: 'CommutativeMonoidReduction is undefined.'
- `RangePrototype.fss`: 'LexicographicOrder is undefined.'
- `Generator2Test.fss`: 'ActualReduction is undefined.'
- `IntMapTest.fss`: 'Comprehension is undefined.'
- `generatorTest.fss`: 'Function SumReduction is not defined.', where the baseline of 2026-09-19 reads 'Variable SumReduction'; that wording changed before the base.

The new files stop at `disambiguate` too ('Operator BIG MIN_MIN is not defined.', 'ImmutableArray is undefined.'). Nothing moved DOWN and nothing is MISSING: the compiled path compiles against the compiler's own library, which the rung does not touch.

## 8. Defects and their homes

- Row 628, the 13 sites: home 1, repaired. The distance stage (13 sites gone, none come) and the guard `UnwrittenBigOperatorsWalk.fss` record it.
- Row 473's open half, `BIG MINMAX` unwritten stopping at the abstract `simpleJoin(a:Any, b:Any)`: home 1, repaired. `UnwrittenBigMinMaxWalk.fss`, promoted, records it.
- The four tuple forms unwritten stopping on the base, by the same mechanism, measured by P2 and again here, and in no row: home 1, repaired. `UnwrittenTupleMinMaxWalk.fss` records it.
- `Set`'s `BIG UNION` and `BIG INTERSECTION` unwritten stop under walk before and after, at `Set[\OPEN\]`, which admits no `NodeSet[\ZZ32\]`: home 2. The specification gives the value (`reductions.tex:76-79`), and a gated test can pass while the defect shows. It is recorded by `XXXUnwrittenSetBigOperatorsWalk.fss` and the new row 662 (`record.md`).
- The plain-bounded monoid operators unwritten (`BIG SQCAP`, `BIG SQCUP`, `List`'s and `PureList`'s `BIG CONCAT`, `PrefixSet`'s `BIG UNION`) stop at a `BOTTOM` parameter before and after: D2's case, already on record (PLAN, "Climb batch 9, listed for his review", D2's entry). They get no new home; the stop moved from `join` to `lift`.
- A program's own reduction that declares `simpleJoin` at `Any`, or names `AnyMaybe` as an identity-less reduction's lifted type, stops under walk after the edit. This is not a defect but the change's consequence, recorded as the revival change in `record.md`. The four test lines and the demo line are respelled (section 9).

## 9. Points to report

- **A value walk prints that changes.**
  - `BIG MINMAX[i <- 0#4] i` unwritten: a stop on the base ('MethodClosure simpleJoin(a:Any,b:Any):Any ... has neither body nor def'), `(0, 3)` on the edit (`ProjectFortress/tests/UnwrittenBigMinMaxWalk.fss:7`).
  - The four tuple forms over `(i MOD 2, i)`: the same stop, then `(0, 0)`, `(0, 2)`, `(1, 1)` and `(1, 3)` (`UnwrittenTupleMinMaxWalk.fss:7-19`).
  - The seven operators that stop before and after print another stop message (section 6).
  - No value of a program that runs on the base changed: the guard test and the suite's 526 earlier tests keep their verdicts.
- **Row 473's expected failure moving.** `XXXUnwrittenBigMinMaxWalk.fss` turned red on the edit and is promoted to `ProjectFortress/tests/UnwrittenBigMinMaxWalk.fss` (`17dfc355b`), after it was seen failing on the base (section 2). Row 433's two `distribute` sites did not move: they keep their site and kind, and their message now names `PossibleReductionPair[\Maybe[\T\]\]` (`Library/FortressLibrary.fss:3263`, `:3265`; section 3).
- **A team test line changed.** Each keeps the value it checks:
  - `ProjectFortress/tests/HeapTest.fss:80` (the team's: Jan-Willem Maessen, `a9556395f`, 2008; `git blame` stops at the conversion's cut `^5a68404fd`): `(mn,sz,mx) = h.generate[\AnyMaybe\](TestReduction, sing).getDefault(0,0,0)` becomes `(mn,sz,mx) = h.generate[\Maybe[\(ZZ32,ZZ32,ZZ32)\]\](TestReduction, sing).getDefault(0,0,0)`.
  - `ProjectFortress/tests/RangePrototype.fss:213` (the team's: Jan-Willem Maessen, `ec62365b1`, 2008): `simpleJoin(l:Any,r:Any):Any = do` becomes `simpleJoin(l:(ZZ32,ZZ32,ZZ32),r:(ZZ32,ZZ32,ZZ32)):(ZZ32,ZZ32,ZZ32) = do`.
  - `ProjectFortress/tests/RangePrototype.fss:336-337` (the team's `generate[\AnyMaybe\]`, Jan-Willem Maessen, `ec62365b1`, 2008; the revival respelled its `strideUnit` call in `3be1fecd7`): `g = f.generate[\AnyMaybe\](StrideReduction(f),strideUnit(f))` and `gg = seq(f).generate[\AnyMaybe\](...)` become `generate[\Maybe[\(ZZ32,ZZ32,ZZ32)\]\](...)`.
  - `ProjectFortress/demos/HeapShakedown.fss:99` (the team's demo; the line Jan-Willem Maessen's, `28cb348b8`, 2008) is respelled like `HeapTest.fss:80`, as batch 6's rung O respelled the demo after its test twin (`explorations/coordinator/CLIMB-BATCH-6.md:193`). Without it the demo stops at `:99`, where it stopped at `:128` (section 6).
  - `ProjectFortress/tests/GeneratorDeclarations.fss:14` is the revival's (`a9b9933e6`), not the team's, but a test line the typing reaches: `__bigOperator2[\ZZ32,ZZ32,ZZ32,AnyMaybe,...` becomes `__bigOperator2[\ZZ32,ZZ32,ZZ32,Maybe[\ZZ32\],...`.
- **An api declaration changed beyond the lifted type.** `AssociativeReduction`'s `abstract simpleJoin(a:Any, b:Any): Any` becomes `abstract simpleJoin(a:R, b:R): R` (`Library/FortressLibrary.fsi:1907`). The rung's section names it as row 628's first device (api `.fsi:1907`). Every other api line changed is the lifted type (`.fsi:1904`, `:1906`, `:1908`, `:1909`, `:1982`, `:1990`, `:1999`, `:2014`, `:2018`, `:2022`, `:2026`, `:2114`; `Library/Set.fsi:65`). It is listed because the point's words, "beyond the lifted type", cover it.
- **A big operator whose unwritten clause form stops under walk after the typing.** None stops newly: each that stops on the edit stopped on the base. They are listed with the bound and the stop because the point's words cover them:
  - `Set`'s `BIG UNION` and `BIG INTERSECTION` (`R extends StandardTotalOrder[\R\]`): 'lift param 1 (r:Set[\OPEN\]) got arg NodeSet[\ZZ32\]', `Library/FortressLibrary.fss:1304`;
  - `BIG SQCAP` and `BIG SQCUP` (`T`, unbounded): 'lift param 1 (r:UniqueItem[\BOTTOM\]) got arg Just[\ZZ32\]';
  - `List`'s and `PureList`'s `BIG CONCAT` (`T`): 'lift param 1 (r:List[\BOTTOM\]) ...';
  - `PrefixSet`'s `BIG UNION` (`E extends StandardTotalOrder[\E\], F extends List[\E\]`): 'lift param 1 (r:PrefixSet[\OPEN,BOTTOM\]) ...'.
- Not reached: a declaration of the ranges section edited; a checker or walk edit.

## 10. Sentences made false

Three sentences of the specification say that `BIG MINMAX` unwritten stops under walk (row 473). This rung's section has no specification edit, so the gather corrects them:

- `Specification/basic/inference.tex:305-311`, the `revival-inference` box: "... but an empty such reduction takes the identity of \EXP{\mathbb{Z}32} whatever the type of the expression (row~645 of the revival's gap ledger), and \EXP{\OPR{BIG}\:\OPR{MINMAX}}, whose reduction joins pairs of elements, stops (row~473)."
- `Specification/appendices/changes.tex:1065-1071`, the Effect of `revival-reductions`: "... an empty one gives the identity of \EXP{\mathbb{Z}32} whatever the type of the expression (row~645 of the revival's gap ledger), and \EXP{\OPR{BIG}\:\OPR{MINMAX}} still stops (row~473)."
- `Specification/appendices/changes.tex:1916-1923`, the Effect of `revival-inference`: "... (row~645), and \EXP{\OPR{BIG}\:\OPR{MINMAX}}, whose reduction joins pairs of elements, still stops (row~473)."

In the skill and the record, for the gather:
- `.claude/skills/fortress-repo/references/library.md:25`: "and `BIG MINMAX` stops (ledger row 473)".
- `.claude/skills/fortress-repo/references/revival-changes.md:90`: "`BIG MINMAX` still stops (ledger row 473)".
- FACTS, "Under `walk`, a type parameter whose bound mentions itself and that nothing at a call fixes is left open, ...". Its residues list `XXXUnwrittenBigMinMaxWalk.fss`, and it cites row 473 as the witness of "`(Int, Int)` is not below `(OPEN, OPEN)` at dispatch". By reading, the witness no longer shows it: the abstract `simpleJoin` now has the implementer's own signature, so dispatch has no second declaration to choose. The sentence itself is not measured here.

Outside the rung's files, these break by the change and are not edited:
- `explorations/astra/worker/notation/NotationGenericBigSum.fss:9-20`, an exploration's program, declares `simpleJoin(x:Any,y:Any):Any` and `Comprehension[\T,T,T,AnyMaybe\]`. It stops under walk before and after the change, at load, on the same refusal: its `SUM` overloads the library's ("Overloading of BIG +[\T extends AdditiveGroup[\T\]\]():BigReduction[\T,T\] ... and BIG +[\T extends AdditiveGroup[\T\]\]():Comprehension...", `Library/FortressLibrary.fss:3269`), so the change does not reach it (the skeptic's run, `SKEPTIC.md`).
- `ProjectFortress/BirdyLib/`, `ProjectFortress/not_working_library_tests/GenTest4.fss` and `GenTest5.fss` name the devices too, but run in no suite.

## 11. Decisions

1. **All 13 sites, `MonoidReduction`'s `lift` included** (P2's outcome (i), the lines "under P2(b)" applied).
   - Not taken: 12 sites with that `lift` left (outcome (ii)).
   - Evidence: P2's outcome (i) in the batch record's answers line; the monoid operators that stop also stopped on the base (section 6).
2. **The three completing edits**: `ActualReduction`'s abstract `lift` at `R`, `Just[\R\]` in the five lifted bodies, and `MinReduction`'s and `MaxReduction`'s `simpleJoin` at `T`.
   - Not taken: the types alone, which stop `BIG MIN`, `BIG MAX` and `BIG //` (P2).
   - Not taken: a `Just` built at `Maybe[\R\]` by coercion in `join`, which the library does nowhere.
   - Evidence: P2 and section 1.
3. **The fusion pairs and `distribute` follow the lifted type** (`ReductionPair[\T,Maybe[\T\]\]`, `PossibleReductionPair[\Maybe[\T\]\]`).
   - Not taken: keeping `AnyMaybe` there, which would declare pairs of reductions at a lifted type they no longer have.
   - Evidence: the rung's section ("it follows the lifted type's spelling where that type changes"); `GeneratorDeclarations.fss`'s fused-arm values are unchanged; the two sites stay (section 3).
4. **`Generator22D.fss:207` at `Maybe[\SomeMSS2DTuple[\R\]\]`**, the lifted type of `MSS2DReductionAbove[\R\]`.
   - Not taken: `AnyMaybe`, which walk's invariance refuses, as it refused `HeapTest.fss:80`.
   - Evidence: no test reaches the line, since `rects` cannot run under walk (row 468).
5. **The respelled lines keep their values, in the library's spelling** (the skill's tests-writing.md, "Names, comments, citations").
   - Not taken: leaving them failing, or making them expected failures.
   - For `RangePrototype.fss:213`, the one declaration is retyped, since its body destructures triples. Not taken: `HeapTest.fss`'s shape, a second typed `simpleJoin` beside the `Any` one.
   - Evidence: the probe with `:213` left at `Any` (section 1).
6. **`HeapShakedown.fss:99` respelled**, though the section names no demo.
   - Not taken: leaving the demo to stop at `:99`, earlier than its stop on the base.
   - Evidence: section 6; the precedent `explorations/coordinator/CLIMB-BATCH-6.md:193`.
7. **The tests.** P2's program is the guard `UnwrittenBigOperatorsWalk.fss`, with `import List.{...}` for row 628's list form. The tuple forms are a separate new test.
   - Not taken: adding them to the promoted `UnwrittenBigMinMaxWalk.fss`, which keeps row 473's reproducer as it was.
8. **`Set`'s unwritten operators: home 2**, an expected failure and a new row.
   - Not taken: home 3 (a row only).
   - Not taken: folding them into D2's case, whose parameters are plain-bounded at `BOTTOM`, where `Set`'s `R` is F-bounded and open.
   - Evidence: section 6.
9. **D2's monoid operators get no new record.**
   - Not taken: a new row for their stop moving from `join` to `lift`.
   - Evidence: D2's entry already holds the case.
10. **No commit of the count or distance tables**, as the brief says.

No decision of the curator was needed beyond those that the section follows.
