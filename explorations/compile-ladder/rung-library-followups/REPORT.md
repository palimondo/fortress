problem: the checker count's one error and the distance's crash row at `__bigOperator`'s untyped `body(i)`, and the distance's sites `FortressLibrary.fss:2525` (row 679) and `:688` (P-146's thirtieth), at the last landed gate (`explorations/compile-ladder/climb-batch-13b/gate/checker-count.txt:14`, `explorations/compile-ladder/climb-batch-13b/gate/distance.txt:28`; `explorations/compile-ladder/gate/distance-sites.tsv:61`, `:78`); row 671's walk values, pinned as today's at `ProjectFortress/tests/IntMapSymdiffSingleton.fss:12-13` (at 5bf8a7c84)
spec: `Specification/basic-lib/basic-integers.tex:664-668` (numerator and denominator on each integer type); the specification is silent on `IntMap` (`grep -rn "SYMDIFF" Specification/basic Specification/basic-lib` names only `BooleanInterval`, `booleans.tex:392`, `:447`)
precedent: `Library/FortressLibrary.fss:2241-2245` (Array1's `offset`) and `:2933-2940` (Array3's); `Library/FortressLibrary.fsi:675` and `Library/FortressLibrary.fss:1002` (ZZ's `numerator`); `Library/IntMap.fss:361-363` (the singleton map's own `SYMDIFF`), with `:528-534` (the node map's `union` with a singleton, `self.updateWith` at the singleton's key)
deviation: `__bigOperator`'s `body(i)` stays untyped, against the section's repair `body(i: I): L`: walk refuses it on an unwritten list or map comprehension (section 2); `Library/FortressLibrary.fss:1314`
deviation: the four `numerator` bodies write Integral's old default, `do z: ZZ = self; z end`, where ZZ's own body is `= self`, and sit after each type's `opr /` in the component and the api, where ZZ's sits after its getters in the component; `Library/FortressLibrary.fss:812`, `:905`, `:985`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:470`
deviation: NodeIM's `SYMDIFF` with a singleton is the singleton's body with the two maps' roles exchanged (`self.updateWith(..., other.key)` with `other.val`, where the singleton writes `other.updateWith(..., key)` with `val`); `Library/IntMap.fss:570-572`
deviation: Array2's `offset` keeps its own lines for `c0` and `c1` and Array1's spelling `then oops(...) end`, where Array3 writes `oops(...); end`; `Library/FortressLibrary.fss:2528-2535`
historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `Library/IntMap.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` (all present at a874948ac); none other

# Climb batch 14, rung L: the library's loose ends

Branch `wip/rung-library-followups`, cut from 5bf8a7c84. Code commit 313541641 (the library and the tests), pushed. The harness refused the worker's write of this report and of `record.md`: their text is in the rung's result. `seed-worktree.sh` seeded the worktree from `/home/user/fortress-base14`: exit 0, "seeded from /home/user/fortress-base14 (5bf8a7c84) in 4 s".

## 1. What changed, and why

**Row 679, Array2's `offset` (`Library/FortressLibrary.fss:2528-2535`).** It answered `oops(...)` in two branches of an `if ... elif ... else (c0,c1) end`. `oops` is declared `()` (`:1781`), so the checker typed the body `OR((ZZ32, ZZ32),())` against the declared `(ZZ32, ZZ32)`. Now each bound check is a statement, `if NOT (0 <= c0 < s0) then oops(1, b0, s0, a0) end`, then the same for `c1`, then the pair. This is the shape of Array1's `offset` (`:2241-2245`) and Array3's (`:2933-2940`). Walk answers the same values: in bounds the pair, out of bounds `oops`'s `fail`.

**P-146's thirtieth site, Integral's `numerator` (`:688`).** The revival's default `numerator(self):ZZ = do z: ZZ = self; z end` (d846e3644) converted a value of the type parameter `I` into `ZZ`. No coercion does that: "Right-hand side has type Integral[\I\], but declared type is ZZ." Now `Integral` declares `numerator(self):ZZ` with no body. Each integer type writes the same body at its own type, where `z: ZZ = self` converts by ZZ's coercion from that type:
- `ZZ32`, `ZZ64`, `NN64`: `numerator(self): ZZ = do z: ZZ = self; z end` (`Library/FortressLibrary.fss:812`, `:905`, `:985`), api lines `numerator(self): ZZ` (`Library/FortressLibrary.fsi:580`, `:638`, `:527`);
- `NN32`: the same body (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:470`) and api line (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:170`).

The precedent is ZZ's own `numerator(self): ZZ` (`Library/FortressLibrary.fsi:675`, body `:1002`), as `explorations/reviews/self-typed-bodies-judgement.md`, ":685, shape C, apart", gives it. The four api lines are an extension in the sense of `explorations/coordinator/process-engineering/library-extension-rule-archaeology.md` section 5, point 4, shown ZZ's line. They are the only new api declarations. Walk's values are the same conversion: `NumeratorPerType` passes before and after.

Every object below `Integral` reaches a body. `Int`, `Long` and `UnsignedLong` reach it through their traits, `NN32` declares it, and `BigNum` reaches it through `ZZ`. The only other type below `Integral` in the corpora is `MyIntegral`, a trait (`ProjectFortress/tests/XXXComprisesGenericChildAcrossComponents.fss:6`), which walk's abstract-method check does not visit. `ant testSystem` is green (section 4).

**Row 671, IntMap's node map `SYMDIFF` a singleton (`Library/IntMap.fss:570-572`).** `self.seek(other.key) SYMDIFF other` kept of the node map only the singleton `seek` finds. That is the shape of `INTERSECTION`'s (`:542`), where keeping one entry is right. Now the node map is updated at the singleton's key: the key is dropped if the node map holds it, and given the singleton's value if not. This is what the library's comment says, "returns the key/value mappings contained in exactly one input map" (`:568`). It is the singleton map's own `SYMDIFF` (`:361-363`) with the two maps' roles exchanged. The node map's `union` with a singleton (`:528-534`) already updates `self` at the singleton's key in this way. Under walk `{0,1,2} SYMDIFF {5}` is now `{0,1,2,5}` (was `{2,5}`), and `{0,1,2} SYMDIFF {1}` is `{0,2}` (was empty).

## 2. `__bigOperator`'s `body(i)`: written, run, held

As the section asks, I wrote the line first and ran one walk program with a list comprehension over a generator clause before anything else. With `body(i: I): L = r.lift((o.body)(i))` at `Library/FortressLibrary.fss:1311` (at 5bf8a7c84), the program

    component ProbeListComp
    import List.{...}
    export Executable
    run(): () = do
        xs = <| 2 k | k <- 0#3 |>
        println(xs)
      end
    end

stops under walk (`cd tmp/rung-library-followups/probe && ../../../bin/fortress ProbeListComp.fss`, rc=1):

    com.sun.fortress.exceptions.ProgramError: .../ProbeListComp.fss:6:13-15:
    Unification error: Closure/Constructor for body param 1 (i:BOTTOM) got arg 4: ZZ32 of type Int
    Context:
    .../Library/FortressLibrary.fss:1312:25-47:

The instance walk gave `I` is `BottomType` ("i:BOTTOM"). On the base library the same comprehension prints `<|0, 2, 4|>` (probe `ProbeNum.fss`, run before any edit). Seven more one-line programs were run on the typed line, each `x = ...; println(x)` with `List`, `IntMap` and `Set` imported:

| expression | walk with `body(i: I)` |
|---|---|
| `<\|[\ZZ32\] 2 k \| k <- 0#3 \|>` | `<\|0, 2, 4\|>` |
| `SUM[k <- 0#3] k`, `SUM[\ZZ32\][k <- 0#3] k` | `3`, `3` |
| `{ 2 k \| k <- 0#3 }` (Set) | `{0,2,4}` |
| `{[\ZZ32\] widen(k) \|-> k \| k <- 0#3}` (IntMap) | `{ 0 \|-> 0, 1 \|-> 1, 2 \|-> 2 }` |
| `{ widen(k) \|-> k \| k <- 0#3 }` (IntMap) | 'Unification error: Closure/Constructor for body param 1 (i:(ZZ64,BOTTOM)) got arg (2,2): (Long,Int) of type (Long,Int)' |
| `BIG MAX[k <- 0#3] k`, `BIG AND[k <- 0#3] (k < 5)` | `2`, `true` |

So an unwritten list or map comprehension is refused. Written static arguments run, and so do `SUM` (whose parameter walk leaves open, F-143) and the others. The record explains why:
- The desugarer passes the big operator with only the static arguments the program writes (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:405-408`).
- Walk keeps a big operator's plain-bounded parameter at `BottomType` (F-141, D2; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:170`, `:181`).
- So `BIG <|[\T\]|>`'s `T` (`Library/List.fss:178`), and with it `__bigOperator`'s `I`, are `BottomType`.

By the section I did not land the line and ran no suite on it: `git checkout -- Library/FortressLibrary.fss` restored it before any other edit. The count's error stays at `body(i)`, now `:1314` (three `numerator` lines above it). Typing it waits on `explorations/coordinator/review-queue.md` item 17 and the walk rung on rows 645 and 662. The measured defect is row NEW-L-1 (record lines).

One way around it was measured on walk only: `body` as an untyped function expression passed straight to `desugaredClauses`, `(o.unwrap)(r.unlift(desugaredClauses(r, fn (i) => r.lift((o.body)(i)))))`. The checker types a function expression's untyped parameters from the expected arrow's domain (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1141-1147`), here `I->L`, and walk checks no untyped parameter. On that line walk printed `<|0, 2, 4|>`, `{ 0 |-> 0, 1 |-> 1, 2 |-> 2 }` and `3` for three of the probes above, and I restored the file at once (`git status` clean). Whether the checker then types the call is not measured: the stage runs once, on the final code, and the section names `body(i: I)`. It is a question for the curator (section 8).

## 3. The tests: failing, then passing

The tests were written first and run through the harness on the base's library, before any library edit (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-library-followups/h1 ProjectFortress/tests/IntMapSymdiffSingleton.fss ProjectFortress/tests/NumeratorPerType.fss ProjectFortress/tests/Array2SubscriptInBounds.fss`, 2026-10-14T00:57:29Z, tree 5bf8a7c84 with the tests only):

    . interpret tmp/rung-library-followups/h1/tests/IntMapSymdiffSingleton
    FAIL: { {2 |-> 2} U4 {5 |-> 5} } =/= { { { {0 |-> 0} U1 {1 |-> 1} } U2 {2 |-> 2} } U4 {5 |-> 5} }; a many-entry map SYMDIFF a one-entry map on another key holds all four entries
    FortressException: FailCalled
    Tests run: 3,  Failures: 1,  Errors: 0

`NumeratorPerType` and `Array2SubscriptInBounds` passed there (`PASS`, `OK`), as the section expects: walk converts the same way today, and the offset's site is the checker's.

After the edit (the same command with `IntMapTest.fss`, `IntMapCombine.fss` and `RationalTest.fss` added, 2026-10-14T01:00:15Z):

    OK (6 tests)

The tests:
- `ProjectFortress/tests/IntMapSymdiffSingleton.fss` (the revival's, 9ba86f7da): the two pins of today's values changed (section 6). A node map of five entries `SYMDIFF` a singleton, on a key it holds and on one it lacks, each asserted against the reverse order and by its size.
- `ProjectFortress/tests/NumeratorPerType.fss`, new: `numerator(x)` for a `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` against its `ZZ` value, each result checked to be a `ZZ` by a `typecase`, and `denominator(x)` against `big(1)`.
- `ProjectFortress/tests/Array2SubscriptInBounds.fss`, new: reads and writes of a 2-by-3 array's subscripts in bounds, directly, through a subarray based at `(1,1)`, through a column and through a row. Its out-of-bounds path ends in `fail`, which no interpreter test can hold (row 639).

The stage is the failing-then-passing test of `:2525` and `:688` (section 5).

## 4. Whole suites

`ant testSystem`, once, after the last edit (commit 313541641, `tmp/rung-library-followups/testSystem.txt`):

    [echo] Caches /home/user/fortress-followups/default_repository/caches kept
    [junit] Tests run: 142, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 227.119 sec
    [junit] Tests run: 143, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 227.99 sec
    [junit] Tests run: 147, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 232.71 sec
    [junit] Tests run: 150, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 242.957 sec
    BUILD SUCCESSFUL
    Total time: 4 minutes 13 seconds

582 = 13b's 580 plus `NumeratorPerType` and `Array2SubscriptInBounds`. So these tests keep their verdicts:
- the reductions' and comprehensions' tests;
- the IntMap and Rational tests;
- the array tests.

Walk refuses no type below `Integral` at load. No Java or Scala changed, so no other suite ran (the skill's `tests-running.md`, "When to run a whole suite").

## 5. The checker count and the distance

Both ran once, on the final code (313541641), in the forms of the brief. Machine: nproc=4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`; another rung's agent shared the machine.

**The count** (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-library-followups/checker-count-postedit.txt tmp/rung-library-followups/cc-post`):
- It started at 01:01:19Z at load 0.59 0.78 0.52, and took 303 s by the wrapper's clock against the stage's 900 s limit (13b's 387 s).
- Its table is byte-equal to 13b's landed one (`diff` prints nothing): `#total 1`, `#locations 1`, `#crash none`.

Its error, from the run's output:

    @@PROBE checkComponent FortressLibrary
    /home/user/fortress-followups/Library/FortressLibrary.fss:1314:10:
        Missing parameter type for i
    File FortressLibrary.fss has 1 error.

`body(i)` was held, so the error stays at `body(i)`, moved from `:1311` to `:1314` by the three `numerator` lines above it. Row 680's crash is not yet the count's next error. No site comes from `body`.

**The distance** (`explorations/coordinator/tools/distance/run.sh tmp/rung-library-followups/distance-postedit.txt tmp/rung-library-followups/dist-post`, 1562 s, FortressLibrary 849 s). `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-13b/gate/distance.txt tmp/rung-library-followups/distance-postedit.txt` prints:

    DISTANCE DOWN   85 -> 82 (-3)
        kind typecheck               72 -> 69     (-3)
        class S1                     29 -> 28     (-1)  self type: a generic trait's self is not its type parameter
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        class OT                     16 -> 15     (-1)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary     79 -> 76     (-3)

It also prints the two crash rows as "gone" and "new". They are the same two, at moved lines:
- `FnDecl FortressLibrary.fss:1312:1-1316:4 TypeError ... Missing parameter type for i`;
- `TraitDecl FortressLibrary.fss:2886:1-2999:2 InterpreterBug ** bug! TryChecker returned an untyped expr` (row 680).

By row (row 577), I read `tmp/rung-library-followups/dist-post/errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`. Each `FortressLibrary.fss` line is mapped back through the diff (`git diff -U0 5bf8a7c84 313541641 -- Library/FortressLibrary.fss`: +1 after `:811`, +2 after `:903`, +3 after `:982`, -4 at Array2's `offset`), and messages are compared with library positions masked. Three sites are gone and none is new:
- `FortressLibrary.fss:2525` 'Function body has type OR((ZZ32, ZZ32),()), but declared return type is (ZZ32, ZZ32).' (row 679, class OT): this rung's repair.
- `FortressLibrary.fss:688` 'Right-hand side has type Integral[\I\], but declared type is ZZ.' (class S1): this rung's repair.
- `FortressLibrary.fss:130` 'Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].' (class BR): `BIG LEXICO(g)`. This rung did not touch it, and row 488's notes name it as the file's one big operator over a generator without a return type. A big operator's body error that moves when an edit adds queries elsewhere is row 488's variation (F-53: 2 to 4 errors), so I read it as that, not as this rung's.

The two `distribute` return-type rows print at `:3096` for `:3097`, the line map's -1. The three classes that moved are the three sites' classes, so the table's classes read right here: row 577's fix holds.

## 6. Pins and lines changed in tests

`ProjectFortress/tests/IntMapSymdiffSingleton.fss` is the revival's own test (9ba86f7da); no team test line changed.
- Line 12, before: `assert(three SYMDIFF five, {[\ZZ32\] widen(2) |-> 2, widen(5) |-> 5}, "today's value: a many-entry map SYMDIFF a one-entry map on another key keeps only the entry nearest that key")`. After: `assert(three SYMDIFF five, {[\ZZ32\] widen(0) |-> 0, widen(1) |-> 1, widen(2) |-> 2, widen(5) |-> 5}, "a many-entry map SYMDIFF a one-entry map on another key holds all four entries")`.
- Line 13, before: `assert(|three SYMDIFF one|, 0, "today's value: a many-entry map SYMDIFF a one-entry map holding its key keeps none of its entries")`. After: `assert(three SYMDIFF one, {[\ZZ32\] widen(0) |-> 0, widen(2) |-> 2}, "a many-entry map SYMDIFF a one-entry map holding its key drops that key")`.
- Line 1, the comment: from "whose values under walk keep only the entry nearest the one-entry map's key" to "holds the entries in exactly one of them, in either order".
- Lines 14-20, new: `evens` (keys 0, 2, 4, 6, 8), `four` (key 4, value 40) and `seven` (key 7, value 70). `evens SYMDIFF four` and `evens SYMDIFF seven` are each asserted equal to the reverse order, with sizes 4 and 6.

## 7. Where the fixes belong, and the precedent search

All three repairs are library declarations, where the brief puts them. `explorations/coordinator/map/spec-to-implementation.md:254` and `:256` say that comprehensions and big operators are desugared to `__bigOperator` calls and the library's reductions. The sibling sites, counted:
- Array2's shape: `oops(` is called at three `offset`s (`grep -n "oops(" Library/*.fss`: `:2243`, `:2532-2533`, `:2936-2938`). All are now statements; no other site answers `oops` in a branch.
- `seek(other` in `Library/IntMap.fss`: two other sites, `INTERSECTION` (`:542`) and `intersection` (`:553`). Both are right, since an intersection keeps only the common key.
- The typed-local conversion `a: ZZ = self`: NN64's and NN32's `opr /` (`Library/FortressLibrary.fss:984`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:469`) write it, besides the four new bodies.

The names added were checked against both test corpora and `ProjectFortress/src/com/sun/fortress/` (`grep -rlw`):
- `NumeratorPerType`, `Array2SubscriptInBounds` and `isZZ` occur only in their own files.
- `evens` also occurs in `tests/GeneratorSize.fss`, as a local there.
- Besides the library, `numerator` is declared only as `zeno.fss`'s dotted getter `getter numerator(): ZZ32` (`ProjectFortress/tests/zeno.fss:52`), which `ant testSystem` still passes.

## 8. Decisions

1. **`body(i)` held.** Chosen: not landed, by the section ("If walk refuses a call at body's parameter, do not land the line"), on the measured refusal (section 2). Ways not taken:
   - `body(i: I): L`: walk refuses unwritten list and map comprehensions (measured).
   - `body` as an untyped function expression passed to `desugaredClauses`: walk runs it (measured). The checker's verdict is not measured, and this way leaves the parameter's type to the checker's inference, where item 47's answer has the library write it (F-42).
   - `body(i: Any)`: by reading, the checker refuses `(o.body)(i)`, whose domain is `I`; not measured.
   - A walk edit giving the parameter its bound or the open type: review-queue item 17, the curator's; walk is outside this rung's files.
2. **Row 671's shape.** Chosen: the singleton's own `SYMDIFF` body with the roles exchanged, `self.updateWith(..., other.key)` (`Library/IntMap.fss:361-363`, `:528-534`). Ways not taken:
   - Delegating, `other SYMDIFF self`: one line, and the same answer by the library's comment. But the test's check against the reverse order would then compare one body with itself.
   - Splitting by `nodeNode`, as the node-node case does: not the singleton's shape, and more work.
   - A `typecase` on `other`: the overload already dispatches.
3. **Row 679's shape.** Chosen: Array1's statement form. Ways not taken:
   - Array3's `oops(...); end`: the same shape, one token more.
   - Keeping `if ... elif ... else` and giving `oops` a result type that joins with any: no such declared type in the library, and an api change of the array family.
   - Raising `IndexOutOfBounds` in place of `oops`: it changes walk's failure, and it is not the library's shape.
4. **The numerator bodies.** Chosen: `numerator(self): ZZ = do z: ZZ = self; z end` per type, the judgement's text, with the api line as ZZ's. Ways not taken:
   - `big(self)`: `ZZ32` and `ZZ64` declare `big`, `NN32` and `NN64` do not, so it is not one shape.
   - ZZ's `= self`: it returns the narrower value as declared `ZZ`, a conversion the checker makes at the return, while walk's `z: ZZ = self` makes it visibly; the judgement names the typed local.
   - A self type on `Integral`: P-146 says no self type reaches `:688`.

   The bodies sit after each type's `opr /`, in both files, so each component and api pair reads alike; ZZ's component has it after its getters.
5. **NumeratorPerType's check of the type.** Chosen: a `typecase` helper beside the value checks, since walk's `=` across `ZZ32` and `ZZ` could pass on a result left unconverted. Not taken: values only.
6. **Row NEW-L-1.** Chosen: a new row (home 3, reproducer `none`). Ways not taken:
   - A note on row 645 or 662: other symptoms and other parameters (`SUM`'s open `T`, `Set`'s open `R`).
   - Leaving review-queue item 17 as its only record: it records the instance, not this consequence for the count.
7. **The ladder subset.** Chosen: the seven files whose recorded first error in the baseline's `ladder.tsv` names something this rung touched (`Integral`, `big`/`numerator`, `Array1`, `Array2`): BitTwiddle, RationalTest, ColonOperator, objectExprMystery, rightOverload, wrongOverload, ReplicaTest. None is in the 85 of the landed `ladder.tsv` or in the baseline's `raw/`, so each is compared with its baseline `ladder.tsv` row. Not taken: IntMapTest, whose first error names `Comprehension`.

## 9. Old against new

| program | old (base library) | new |
|---|---|---|
| `IntMapSymdiffSingleton` | red, `{ {2 \|-> 2} U4 {5 \|-> 5} } =/= ...` | green |
| `NumeratorPerType` | green | green |
| `Array2SubscriptInBounds` | green | green |
| `ProbeListComp` (section 2) | `<\|0, 2, 4\|>` | refused at `body` with `body(i: I)` typed; `<\|0, 2, 4\|>` on the landed code |

The ladder subset ran in `tmp/rung-library-followups/ladder/`, with the drivers of the skill's `gate.md`, "The ladder regression", copied there, the caches copied from the tree's, and `bash run-subset.sh && python3 classify.py`. All seven files are at their baseline phase and first error: the `diff` of phase and first error against `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` is empty:

    tests	BitTwiddle.fss	disambiguate	Integral is undefined.
    tests	ColonOperator.fss	typecheck	Unbound type: CompilerLibrary.Array2
    tests	RationalTest.fss	disambiguate	Variable big is not defined.
    tests	wrongOverload.fss	typecheck	Not in the trait table: CompilerLibrary.Array2

The compiled path compiles against the compiler's library, which this rung did not touch.

## 10. Sentences of the specification made false

None. `Specification/basic-lib/basic-integers.tex:667-668`, "For finite integers, the method numerator returns the argument and the method denominator returns 1.", stays true (`NumeratorPerType`). `grep -n "numerator\|SYMDIFF\|IntMap\|Array2\|bigOperator" Specification/appendices/changes.tex` finds only `:890-891`, on the infinities of `ZZ*`, which the library does not declare.

## 11. Points to report reached

- A comprehension refused at `body`'s parameter: `ProbeListComp` (section 2), with `I = BottomType`, and `(ZZ64,BOTTOM)` for an unwritten map comprehension. This holds on the typed line only, which did not land. No gated test's verdict changes (section 4).
- The count's table after the edit: byte-equal to 13b's, total 1, its error `Library/FortressLibrary.fss:1314:10` 'Missing parameter type for i', 303 s against the 900 s limit (13b's 387 s). No site comes from `body`.
- The distance moved one site more than by reading: `FortressLibrary.fss:130` (`BIG LEXICO(g)`, class BR), untouched, row 488's variation (section 5).
- Each repair's precedent line: `Library/FortressLibrary.fss:2241-2245` and `:2933-2940`; `Library/FortressLibrary.fsi:675`; `Library/IntMap.fss:361-363`. No api declaration beyond the four `numerator` lines.
- The pins changed in `IntMapSymdiffSingleton.fss`, lines 12 and 13 (section 6).
- A site whose repair, as the section gives it, waits on a walk change: `body(i)` at `:1314` (review-queue item 17). The untyped function expression is a library-only way, not measured on the checker (section 2).

Not reached: a type below `Integral` refused at load; a team test line changed; a checker or walk edit.

## 12. Defects and their homes

- Row 671, the node map `SYMDIFF` a singleton: home 1, repaired. `IntMapSymdiffSingleton` asserts it (red before, green after).
- Row 679, Array2's `offset` typed `OR((ZZ32, ZZ32),())`: home 1, repaired. The distance stage is its test (site gone), and `Array2SubscriptInBounds` keeps walk's values.
- `:688`, Integral's `numerator` default: home 1, repaired. The distance stage is its test (site gone), and `NumeratorPerType` checks walk's values.
- Walk refuses `body(i: I)` on an unwritten list or map comprehension: home 3, row NEW-L-1, reproducer `none`. No program on the tree as it stands shows it, since the line it needs is not landed; the row's notes give the program and the message. Review-queue item 17 holds the open choice behind it.
- `BIG LEXICO(g)`'s site gone untouched: row 488's variation, already recorded there; a note for it is in the record lines.

## 13. For FACTS

See the record lines. In short: under walk, `__bigOperator`'s `body` cannot be typed `I`, because an unwritten list or map comprehension gives `I` the type `BottomType`. So the count's error stays at `body(i)` until item 17 is answered. The probe of section 2 shows it; no gated test can.

## 14. Commands worked out

- The line map for reading the distance by row: `git diff -U0 5bf8a7c84 313541641 -- Library/FortressLibrary.fss | grep '^@@'`. Then each `FortressLibrary.fss:N` of `dist-post/errors.tsv` is mapped to the base and compared with `distance-sites.tsv` as a multiset of (kind, location, message with library positions masked).
- `python3 explorations/coordinator/tools/ledger.py check --rows FILE` lints a drafted row against the template without writing the ledger (with a number in place of `NEW-L-1`).
