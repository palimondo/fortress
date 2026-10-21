# Rung P (rung-existential-reduction): the skeptic's review

Head judged: `ff576359e` (the worker's last commit). The worker's `REPORT.md` was written from the run's journal and committed alone (`0dad9e891`); `record.md` was already on the branch.

**Verdict: approved.** The change does what P-152 asks on both paths, test first, and the count and the distance hold. One defect of the change, a load under walk of a pair that breaks the Meet Rule, is fixed test first (`5fa3e42c3`, refined in `84957e6ef`). The deferred defects that my own programs measured now have homes (`a105556a9`). Two sentences of Appendix I's Effect are corrected (`5f06c723b`, `b9711575b`). None of my fixes is contested.

## 1. The count and the distance

The count stage, run by me once on the base build and once on the worker's tree, in one session, with the same command (`time explorations/coordinator/tools/checker-count/run.sh $K/$N.txt $K/$N`, `K=tmp/rung-existential-reduction/skeptic/count`). The machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, FORTRESS_THREADS=1, beside rung S's skeptic.

| run | tree | load at start | seconds |
|---|---|---|---|
| base | `/home/user/fortress-base19` (612869b4a) | 4.84 | 70.9 (`real 1m10.871s`) |
| head | this tree, code of `a93fb3bfd` | 5.41 | 61.3 (`real 1m1.289s`) |

- `diff base.txt head.txt` prints nothing, and the head's table equals the landed `explorations/compile-ladder/climb-batch-18/gate/checker-count.txt` (`#total 30`, `#locations 29`, `#crash none`).
- The two `run.txt` files are equal after each tree's path is replaced by `TREE`, and the head's equals the worker's `change` run the same way.
- The worker's times (67.8 s and 75.4 s) are mine in order of size. No slowdown shows. The worker made no pass edit, so its commit of step 1 and its head hold the same checker code, and the comparison of the two is this one.
- The distance: the worker's `tmp/rung-existential-reduction/distance-postedit.txt` against `climb-batch-18/gate/distance.txt` gives `DISTANCE SAME 34`. Its `errors.tsv` equals `explorations/compile-ladder/gate/distance-sites.tsv`. The tables differ only in `#seconds` and `#machine`.
- My fixes change walk only. These tables are those of the worker's head; the gate's tables on the merged tree are the record.

## 2. Test first, from the worker's transcript

All times are UTC, with the last six characters of each call id.

- The failing runs, on the seeded base build, are at 00:48:03 (`9Dqq8R`, walk) and 00:48:35 (`WHPCAM`, compiled). Walk printed 'Overloading of o[\T\](x:Q[\T\],b:Box[\T\])...', ` OK Saw expected refusal at load` for the guard, and `Tests run: 2,  Failures: 1`. The compiled run printed 'Invalid overloading of copyOf', '... of o', `r`, `viaR`, `pairOf` and `plainOf`, ` Saw expected failure` for the guard, and `Tests run: 7,  Failures: 6`.
- The patches' code went in at 00:52:43 (`UbziKg`, `git apply`), and the last edits of code were made from 00:53:03 to 00:53:57 (`hcWcsy`, `zZQuJX`, `rFgt1F`, `tAJn9q`). The first build ran at 00:54:04 (`Wo1ton`), then the library order.
- The passing runs came after the last change of code: 00:56:48 (`gyhkm7`, `OK (3 tests)`) and 00:57:05 (`B32jGn`, `OK (7 tests)`).
- The red demonstration of the first `XXX` test ran at 00:57:26 (`vCxSDd`).
- The suites were all on `a93fb3bfd`'s code: `testQuick` at 01:14:26 (1276/86/263), `testSystem` at 01:23:46 (162/160/171/164), `testSpecData` at 01:28:34 (130). Each had no failure.

## 3. The diff, and the defect of the change

- **The checker.** `emptyED` (`TypeSchemaAnalyzer.scala:444`) goes through `replaceTypeParametersWithInferenceVariables`, which differs from `checker.patch`'s copy of `reduceED`'s setup only in `getWhere(ty)`. A meet's outermost type information has no `where` clause: `meetED` builds it with `makeIntersectionType` over two types that `clearStaticParams` stripped of theirs (`TypeSchemaAnalyzer.scala:242`, `types/TypeAnalyzerUtil.scala:81-85`, `useful/STypesUtil.scala:461`). So the two compute the same thing. `excludes` is called only from `validOverloadingInner` (`typechecker/OverloadingChecker.scala:585`). `OverloadSet` uses `lteq` and not `excludes`, so no dispatch code changes. I found no defect.
- **Walk, `domainsExcludeTogether`.** Steps 1 and 2 match instances of one generic type into one union-find (`argsMayBeEqual`, `mayBeEqual`). They read equalities of static arguments, as instantiation exclusion gives them. Step 4 compared the two parameter types at each position of the meet with `excludesOther`. That method reads an object type apart from every type that is not among its supertypes as written (`interpreter/evaluator/types/FType.java:236-245`). Where a static parameter is still free, the other type can be one of those supertypes at some instance. My program shows it:

      trait Box[\T\] end
      trait R[\T\] end
      object Ob[\U\] extends R[\ZZ32\] end
      object BoxOb extends Box[\Ob[\ZZ32\]\] end
      h[\T\](x: Box[\T\], y: T): String = "first"
      h[\U\](x: Box[\Ob[\U\]\], y: R[\U\]): String = "second"

  A Box of `Ob[ZZ32]` with an `Ob[ZZ32]` is in both domains (T = Ob[ZZ32]; U = ZZ32, Ob[ZZ32] being an R[ZZ32]), and neither declaration lies inside the other. On the worker's head, walk loaded the pair and ran the first declaration. The base refused it, and the compiled checker refuses it on both:

      walk, head (bin/fortress KObjSub.fss):   first
      walk, base (old-fortress.sh ... KObjSub.fss):   Overloading of h[\U\](x:Box[\Ob[\U\]\],y:R[\U\]) ... fails the Meet Rule: neither is found to be more specific ...
      compiled, head and base (... compile KObjSub.fss):   Invalid overloading of h in component KObjSub:

  So the change made walk accept a pair that breaks the Meet Rule, and walk and the checker then disagreed on it.

**The fix** (`5fa3e42c3`, refined in `84957e6ef`): a new `excludesAtMeet` (`OverloadedFunction.java:1041`) reads the position at the meet.
- Where the two types mention no static parameter, it reads them as `excludesOther` does. That is the patch's reading of ground types.
- Two instances of one generic type exclude where their static arguments cannot be equal, as before.
- A static parameter excludes a type where one of its bounds does.
- Two object types exclude.
- An object type excludes another type where neither the object type nor any type it extends may be that type (`mayBeEqual`), since a value of an object type has no other type.
- Two trait types exclude by `excludesOther` only where neither has a `comprises` clause. `excludesOther` reads such a clause through the listed object types in the same written way.

The first version (`5fa3e42c3`) read no object type beside a type over a static parameter. That refused `k[\T\](x: T, b: Box[\T\])` beside `k[\U\](x: Q[\U\], b: Box[\Lone\])`, where a Box of `Lone` forces T to the object type `Lone`, which is no Q. That pair is valid, the worker's head loads it, and the base's checker compiles and runs it. The second version reads it by `mayBeEqual` and loads it again.

The fix is settled:
- `Specification/advanced/overloading.tex`, "Declarations with Static Parameters", the Meet Rule: "$d_1$ and $d_2$ exclude each other, or one of them is more specific than the other, or some declaration of the set is more specific than both and applicable to every call to which both are applicable".
- The same section's existential reduction, "each static parameter stands for any type within its bound", reads exclusion at every instance.
- P-45 has walk and the checker accept the same pairs.

**The tests, through the harness.**
- `tests/GenericPairObjectSupertypeOverlapWalk` (`load_exception_contains=fails the Meet Rule`):
  - on the worker's head, `harness-one.sh $PWD/tmp/.../h-head ProjectFortress/tests/GenericPairObjectSupertypeOverlapWalk.fss ...test`: ` Missing expected refusal at load`, `Tests run: 1,  Failures: 1`;
  - on the base (`FORTRESS_HOME=/home/user/fortress-base19 .../harness-one.sh`): ` OK Saw expected refusal at load`, `OK (1 test)`.
- `tests/GenericPairForcedObjectApartWalk`: on the first fix and on the base, `FAILURES!!!`, `Tests run: 1,  Failures: 1` (refused at load).
- After the second fix, one harness run of both new tests, the rung's walk tests, the three `XXX` tests below, and the generic-pair tests of climb batches 16 to 18 that the brief names (`DispatchRenamedGenericArmWalk` to `XXXOverloadExistentialMeetWalk`, `ShuffleTest`, `GenericPairExcludingWalk`) gave `OK (22 tests)`.

**The suites the fix needs**, once, on `84957e6ef`'s code with the three `XXX` files in the tree (committed unchanged in `a105556a9`):

    ant testSystem     Tests run: 170 / 160 / 165 / 167 (662), Failures: 0; BUILD SUCCESSFUL; Total time: 2 minutes 57 seconds
    ant testSpecData   Tests run: 130, Failures: 0; BUILD SUCCESSFUL; Total time: 54 seconds

The 662 are the worker's 657 and my five new walk tests. No other verdict moved. The checker's code is the worker's, so `testQuick` needs no new run. After the build, I ran the library order again to refill the tree's caches; all five jars are present.

**Limits of the fix.**
- Walk now refuses a pair whose exclusion holds only at the meet, through a `comprises` clause, over a static parameter still free there. The worker's head read such a clause there by `excludesOther`, which is unsound for the reason above.
- None of my programs reaches this case. A pair that excludes through a `comprises` clause as declared is still read by the parameter check, unchanged.

## 4. My programs, old against new, walk and compiled

The programs are under `tmp/rung-existential-reduction/skeptic/` (scratch).
- The old code was run with `/home/user/fortress-base19/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base19 /home/user/fortress-existential/tmp/old-caches`.
- The new code was run with this tree's `bin/fortress` and a private caches folder.
- Walk was run at FORTRESS_THREADS=1. The harness runs above were at 4.
- The diff adds no mutable variable, field or `atomic` block to a Fortress program. Walk's load check is the only Java it touches.

| program | walk, base | walk, worker's head | walk, fixed | compiled, base | compiled, head |
|---|---|---|---|---|---|
| `KObjSub` (above) | fails the Meet Rule | `first` | fails the Meet Rule | Invalid overloading of h | the same |
| `GenericPairForcedObjectApartWalk`'s pair | refused | PASS | PASS | PASS | PASS |
| `KChain`: `f[\T, U\](Box[\T\], Pr[\T, U\], P[\U\])` beside `f[\V\](Box[\V\], Pr[\V, V\], Q[\V\])` | fails the Meet Rule | PASS | PASS | Invalid overloading of f | PASS |
| `KFreeX`: `f[\T\](x: T, b: Box[\T\])` beside `f[\U\](x: ZZ32, b: Box[\U\])` | fails the Meet Rule | the same | the same | Invalid overloading of f | the same |
| `KGenMixed`: `f[\T\](P[\T\], Box[\T\])` beside `f[\U\](Q[\String\], Box[\U\])` | fails the Meet Rule | the same | the same | Invalid overloading of f | the same |
| `TPlainMixed`, `TSizeMixed`, `TObjTwo`, `KObjSubPlain` (trait parameter types, plain or generic) | fails the Meet Rule | the same | the same | Invalid overloading | the same |
| `KWhere`: row 740's pair, the first with `where { T extends Object }` | fails the Meet Rule | the same | the same | Invalid overloading of o | accepted; the code generator stops, 'Don't know how to compile this kind of FnDecl' |
| `KSameObjPlain`: `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, `Box` an object | `generic` (loads) | the same | the same | Invalid overloading of g | the same |
| `KBoundObj2`: `h[\T extends R[\ZZ32\]\](x: Box[\T\], y: T)` beside `h[\U\](x: Box[\Ob[\U\]\], y: Ob[\U\])`, `Ob[\U\] extends R[\U\]` | `first` (loads) | the same | the same | Invalid overloading of h | the same |
| `KObjOne`: `h[\T\](y: BoxR[\T\])` beside `h[\U\](y: R[\L[\U\]\])` | `first` (loads) | the same | the same | Invalid overloading of h | the same |
| `KBoundObj`: `KBoundObj2` with `h[\U, V\](x: Box[\V\], y: Ob[\U\])` | `first` (loads) | the same | the same | 'V is not in the kind env [][][]' | the same |
| `K759A`: `g[\T extends Any\](a: T)` beside `g(a: Any)` | 'cannot be overloaded' | the same | the same | 'cannot be overloaded', 'multiple declarations of g with the same parameter type: T' | the same |
| the probe's twelve shapes and the worker's four | as in REPORT section 5 | as in REPORT section 5 | the same as the head | as in REPORT section 5 | as in REPORT section 5 |

- The worker's head column for these two was run on its walk code. I compiled `a93fb3bfd`'s `OverloadedFunction.java` into a scratch class folder and put it first on the class path, then ran `java ... -cp "$Q/classes:$CP" com.sun.fortress.Shell P.fss`. It printed `PASS` and `first`.
- Row 759's departure: the checker accepts the pair only where T's bound is not written. I corrected Appendix I's sentence (`b9711575b`).
- Where the paths disagree, the specification answers. The pairs that walk loads above break the Meet Rule, so walk is wrong on them. Walk refuses the pair with the `where` clause, which by the existential reduction is valid, so walk is wrong on it too. Their homes are below.

## 5. Defects and their homes

| defect | home | where |
|---|---|---|
| Row 740, both paths | 1 | the worker's tests |
| Row 741, `copyOf` | 1 | the worker's test |
| `tint`, row 786 | 3 | the worker's row |
| Walk loaded `KObjSub` after the change | 1 | `tests/GenericPairObjectSupertypeOverlapWalk`, with `tests/GenericPairForcedObjectApartWalk` for the fix's other half |
| Walk refuses a pair with a `where` clause that the checker now accepts (walk reads none, `OverloadedFunction.java:943`) | 2 | `tests/XXXGenericPairWhereExcludesTogetherWalk`, row 787 |
| Walk loads pairs through an object type over a static parameter read apart by its written types (base and head) | 2 | `tests/XXXGenericObjectInstanceBesidePlainWalk` and `XXXGenericBoundObjectOverlapWalk` (each keyed `fails the Meet Rule`, green while it loads), row 788; `KObjOne` as a note on row 697 |
| The checker's 'V is not in the kind env' for `KBoundObj` (base and head) | 3 | row 789, reproducer none, its command and output in the notes |

- The three `XXX` tests run on the head and on the base: ` Saw expected failure: loaded and ran, not refused at load` (twice), ` OK Saw expected exception` (the `where` test, refused 'fails the Meet Rule'), and `OK (3 tests)` on each.
- The first of them, with its `where` clause removed for one run and then restored (`cmp` equal), printed `PASS`, `FAILURES!!!` and `Tests run: 1,  Failures: 1`.
- The rows are in `record.md`, in the row template. `ledger.py check --rows` on them, with numbers in their first cells, gave `3 rows, 0 fail the template`.

## 6. The record and the report

- **Provenance lines.**
  - The cited lines say what the report claims: `OverloadedFunction.java:1364-1373` at `a93fb3bfd` (`oneInstance`, now `:1402`), `TypeSchemaAnalyzer.scala:346`, `:435-446` and `OverloadingOracle.scala:326`; the specification's `types-vals-vars.tex:235-242` and `basic/overloading.tex:100-108`.
  - Two are loose. `GenericPairExcludesTogetherWalk.fss:23-27` leaves out `trait R` at `:22`. The probe's `REPORT.md:5-18` is its summary, not the measurement.
  - `record.md`'s team-source lines check at `a874948ac`: `OverloadingOracle.scala:190-195`, `TypeSchemaAnalyzer.scala:404`, and `OverloadedFunction.java:497-499`, the message at `:527`.
- **`ownGeneric`'s comment** is the text of `climb-batch-17/JUDGE-review.md`, section 4, word for word. It is true of the code: `GenericFunctionalMethod.Own` extends `FGenericFunction`, not `GenericFunctionalMethod` (`GenericFunctionalMethod.java:151`), and `preferredDeclaration` is at `:2329-2335` at `a93fb3bfd` (now `:2367`).
- **Specification.**
  - The passage at `overloading.tex:585-586` says "or their elements at one position", which the brief's words do not. I keep it. A parameter type is the whole parameter, a tuple where there are several, so the brief's words alone would leave out row 740's own pair.
  - The Effect's new sentence on rows 740 and 741 said both implementations read such pairs. It is false for walk where a declaration has a `where` clause. I added the departure with row 787 and made the `tint` sentence "They also differ" (`5f06c723b`).
  - The specification builds: `genSource` and `tex` both end `BUILD SUCCESSFUL`, and the strict log grep prints 0.
  - Made false and left to the gather, as the worker lists: `future.tex:280-284`, F-238, F-252, P-45, P-152 and the skill's `revival-changes.md:56`, `:58`, `:61`.
- **`record.md`** now carries the fix in its FACTS entry and its Revival change, the two new tests, rows 787 to 789 and the note on row 697.
- **Where I differ from the report.**
  - The report says the whole body of `domainsExcludeTogether` sits inside its `try` "so any exception answers 'not shown'". The method catches `FortressException` and `EmptyLatticeIntervalError`, as `genericMeetCovered` does. Any other exception still reaches the load check.
  - The report's section 5 says the paths agree on every shape but `tint`. On the worker's head they also disagreed on `KObjSub`, which the fix removes, and they disagree on a pair with a `where` clause (row 787).
- **Names.** `domainsExcludeTogether`, `emptyED` and `excludesAtMeet` are each declared once in `ProjectFortress/src/com/sun/fortress/`. Each new test component name is used by one file.
- **The failure mode.** The change turns a refusal at load, or 'Invalid overloading', into a load. Walk's new reading answers false, the old refusal, on the exceptions it catches. Neither path makes a loud failure quiet.

## 7. Points to report

- The patches, taken with the worker's two changes. Walk's step at the meet is now `excludesAtMeet` (`OverloadedFunction.java:1041`).
- No probe shape is given otherwise on either path, before or after my fix.
- The count runs: the worker's 67.8 s and 75.4 s, mine 70.9 s and 61.3 s. There was no pass; `emptyED` has no profile sample.
- No suite verdict moved beyond the promotions and the new tests.
- `tint`: row 786.
- The team lines changed are `OverloadingOracle.scala:326`. In walk, only revival lines changed, mine among them.
- The specification sentences edited: `overloading.tex:584-606` (the worker's) and `changes.tex`'s Effect, the worker's and my two.
- Files beyond those the brief names: my five walk test files. No library, desugaring or code-generator file is edited.
