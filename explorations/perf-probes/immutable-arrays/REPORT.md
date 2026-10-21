<!-- Probe of 2026-10-20 on the one library's immutable arrays, an Opus worker: what an immutable array is for and who uses one (varargs, program arguments, ArrayList; microGPT through varargs, rank 1 only), how the rank-2 and rank-3 forms came to sit in comments in 2007-2008, what uncommenting them does (walk refuses every program at load; the distance stage reads 1 where it read 5, blind to the library's stop), and a shadow ImmutableArray2 and ImmutableArray3 with freeze at ranks 2 and 3 (+337 library lines) that walk runs and the checker accepts with the distance unchanged at 5. Decides nothing. Base: main at 4069f1a8b. -->

# Immutable arrays at ranks 2 and 3, measured

Base: `main` at `4069f1a8b`. Branch `wip/probe-immutable`: `0d545d7b6` (comments removed) and `5667c5ae8` (sketch), both edit the library on the branch only. Patches beside this report: `uncomment.patch` (`4069f1a8b..0d545d7b6`) and `ranks23.patch` (`4069f1a8b..5667c5ae8`, with the walk test).

## In short

| Tree | Walk, any program | `immutableArray[\ZZ32\](2,3)` | Distance | Walk suite, microGPT |
|---|---|---|---|---|
| main `4069f1a8b` | loads | "Unification error ... param 1 (x:ZZ32) got arg (2,3)" | 5 (batch-20 table) | 668 pass; quick pair 7/7, 7/7 (gate) |
| comments removed `0d545d7b6` | refused at load: "ImmutableArray2 is undefined." | the same refusal | reads 1, a blind spot | every program refused at load |
| sketch `5667c5ae8` | loads | an `ImmutableArray2`; the new test passes | 5; second export error 43 to 45 entries | 669 pass; quick pair 7/7, 7/7 |

## 1. Why, and who uses one

**What it is.** `ImmutableArray[\E,I\]` extends only `ReadableArray`, and excludes `Array` (`Library/FortressLibrary.fsi:1455-1469`). It has no `put`. `thaw()` gives a mutable copy (`:1467-1468`), and `Array.freeze()` an immutable copy (`:1488-1489`). eee07d7d5 calls them "1-D immutable arrays (actually initialization-only arrays, a subtle distinction that is exploited in ArrayList)". Elements come from `init`, `fill` and `tabulate`, at most once each (`Specification/advanced/parallelism-locality/arrays-distributed.tex:71`).

**What it is for:**
- **Parallel sharing.** "Immutable fields and variables must be used wherever practical" (`Specification/basic/memory-model.tex:93-94`), and a reader "will obtain the initial value written" (`:108-110`).
- **Varargs.** "We agreed to implement varargs tuples using ReadOnlyHeapSequence which is immutable and invariant" (`Specification/basic/functions.tex:207-214`, note of 10/30/07). Walk binds the parameter to `__immutableFactory1`'s `ImmutableArray1` (`interpreter/evaluator/values/NonPrimitive.java:224-251`, `compiler/WellKnownNames.java:51`). The checker types it `ImmutableArray[\T,ZZ32\]` (`compiler/Types.java:47-49`; `functions.tex:183-196`).
- **Contracts.** A contract's `arg` is "an immutable array containing the arguments" (`Specification/basic/types-vals-vars.tex:362-364`).
- **Program arguments.** `System.args` (`Library/System.fss:28-33`; `interpreter/glue/prim/StringPrim.java:125-135`).
- The papers do not treat immutable arrays: `grep -rn -i 'immutable\|freeze' Papers --include=*.tex` finds only variables and fields (`Papers/Dispatch/body.tex:1225`, `:1579`, `:1593`).

**Users today, all at rank 1:**
- **Library:** `ArrayList` (`Library/List.fss:252`, `:193`, `:213`, `:221`); `CovariantCollection.toImmutableArray` (`Library/CovariantCollection.fss:78-79`); `Library/PureList.fss:133`; `Library/PrefixSet.fss:410`; `shuffle`'s thaw and freeze (`Library/Shuffle.fss:30-33`); every `assert` with a message, through its varargs (`Library/FortressLibrary.fss:307`).
- **The team's tests:** `nativeImmutableArrayTest.fss:17`, `whileTest.fss:27`, `genericMethod1.fss:37`, `CovCollTest.fss:59`, `:68`.
- **The revival's tests:** `TabulateRungA.fss:22`, `ImmutableArrayRangeSubscript.fss:6`, `TransposedMatrixAndFreeze.fss:17-22`, `VectorMatrixCastsWalk.fss:203-208`.
- **Demos:** none by name; five reach one through varargs (`HeapShakedown.fss:17`, `aStar.fss:302`, `BiCGSTAB.fss:75`, `BiCGSTAB2.fss:60`, `Words.fss:70`).
- **microGPT:** varargs only, through `flat` (`explorations/run-c4/src/FlatArrays.fss:180`, `explorations/apl/mg/FlatArrays2.fss:182`; called at `MicroGptFlat.fss:71`).

**Under walk, "immutable" holds only partly.** A read of an element never initialized raises. A second `init` replaces the element, against the api's "An error will be signaled if ... an initialized element is re-initialized" (`.fsi:1410-1414`). Run on 97ccd5f1f (`old-fortress.sh /home/user/fortress-base20 <tree>/tmp/old-caches ReInit.fss`):

    immutable after second init: 9 3
    mutable after second init: 3 3
    ... Access to uninitialized element 1 of array PrimImmutableArray[\ZZ32,2\]

## 2. History

Found by `git log --follow --name-only` on each file, then each version's text tested; `-S` stops at the conversion's cut links.

1. **eee07d7d5, 2007-11-15, jmaessen.** Added ImmutableArray, ImmutableArray1, PrimImmutableArray, Array.freeze and Array1.freeze. Added all three `immutableArray` ranks with `__imm1` to `__imm3`, uncommented; `__imm2` and `__imm3` name four undeclared names. `Array2.freeze` and `Array3.freeze` answer `fail("Freeze not defined yet!")`. The version before, 96a02cc76, has no immutable array.
2. **1c492019f, 2007-12-13, jmaessen**, "Built first cut at FortressLibrary.fsi. This is untested". The api declares all three ranks, open, until 2026.
3. **7c1ec62bc, 2007-12-13, EricAllen**, "Added a fortress-configure script to make it easy to set things up for the static front end". Comments out `__imm2` and `__imm3`, in the same commit as StaticChecker and TypeChecker edits.
4. **b93f04938, 2008-07-01, nbeckman**, "The disambiguator now actually reports errors. This caused me to change a number of tests in very small ways." Comments out the component's two factories.
5. **a874948ac**, the team's last commit, has today's text (`.fss:1941-1956`, `.fsi:1351-1353`, freeze `.fss:2402`, `:2768`).
6. **e487cec2d, 2026-10-20, climb batch 20, rung A.** Comments out the api's two ranks, to clear the first export error (`explorations/compile-ladder/rung-array-sites/REPORT.md:23`, "4d").

No version declares the two types (452 component versions, 322 api versions). No comment gives a reason; the only nearby comment is on the helpers being top-level (`.fss:2273-2274`). The commit messages tie each step to a static phase that began reporting undefined names.

## 3. Uncommenting (0d545d7b6)

The edit removes `.fss:2266`, `:2271`, `:2277`, `:2282` and `.fsi:1501`, `:1504`.

**Walk.** Both probes fail at load, rc=255:

    .../Library/FortressLibrary.fss:2276:5-18:  ImmutableArray2 is undefined.
    .../Library/FortressLibrary.fss:2278:5-18:  ImmutableArray3 is undefined.

The probes were a rank-1-only program, which prints "load ok, rank 1: (immutable) 4" on 4069f1a8b, and the call `immutableArray[\ZZ32\](2,3)`. On 4069f1a8b that call gives "Unification error: Closure/Constructor for immutableArray param 1 (x:ZZ32) got arg (2,3)". `immutableArray2` and `immutableArray3` are not reported, because name binding stops at the types. Every walk program loads the library, so microGPT and the tests fail at load too; that is inferred, not run.

**Distance** (run 1 of 2):

    #total 1 (#unit component List 1; #seconds 133 FortressLibrary <empty>)
    compare.sh: DISTANCE DOWN 5 -> 1 (-4)

`run.txt` holds the two name errors, then `### done Library/FortressLibrary.fss rc=-1 seconds=57`. The checker never typed FortressLibrary, and `errors.py` and `table.py` count neither name error. `#seconds`'s pattern `rc=[0-9]*` misses `-1`, so the empty FortressLibrary seconds field is the only sign (defect 2).

Baseline: 5, from `climb-batch-20/gate/distance.txt` (510fac459). `git diff --stat 510fac459 4069f1a8b -- Library ProjectFortress/LibraryBuiltin ProjectFortress/src` is empty.

## 4. The sketch (5667c5ae8)

Size against main: api +74 −4, component +263 −7, test +42.

**The component:**
- `ImmutableArray2` (`.fss:2988`) extends `Indexed1`, `Indexed2`, `Rank2`, `StandardImmutableArrayType[\ImmutableArray2[...],T,(ZZ32,ZZ32)\]` and `ImmutableArray[\T,(ZZ32,ZZ32)\]`, and excludes `Number` and `String`.
- Its bodies are `Array2`'s read-only members, copied: size, sizes, bounds, asString, `|self|`, offset, toIndex, range subscript, `[:]`, shift, subarray, zeroIndices, replica, copy, map, ivmap.
- Added at its own type, as ImmutableArray1 has them: fill, tabulate and mutability; `thaw()` goes through `__builtinFactory2`.
- Objects and functions: `__DefaultImmutableArray2`, row-major over `PrimImmutableArray[\T,(s0 s1)\]` (`:3079`); `__ImmutableSubArray2` (`:3088`); a rank-2 `__subarrayI` (`:3071`); `__immutableFactory2` (`:3098`); `immutableArray2` (`:3102`).
- The same at rank 3: `.fss:3325`, `:3427-3460`.
- `Array2.freeze():ImmutableArray2[\T,b0,s0,b1,s1\]` tabulates `__immutableFactory2` from `get` (`:2746-2747`); rank 3 at `:3268-3270`.
- The team's factories and helpers are unchanged.

**The api** adds the traits, factories and narrower freeze at `.fsi:1729`, `:1758-1789`, `:1894`, `:1906-1939`.

**Walk.** `ProjectFortress/tests/ImmutableArrayRanks23.fss`:
- fails on the old code: "ImmutableArray2 is undefined.", FAILURES!!!, 1 of 1;
- passes on the sketch: harness-one with 10 array tests, "OK (11 tests)", the two `XXXArray*SliceAtNonzeroBase` failing as expected.

It prints:

    [0#2,0#3](immutable)[ 0 1 2
      10 11 12 ]
    [0#2,0#2,0#2](immutable)[ 0 10
      100 110 ;;
      1 11
      101 111 ]

**Distance** (run 2 of 2):

    #total 5   typecheck 4, export 1, X1 1, BR 2, OT 2, crash none
    compare.sh: DISTANCE SAME 5

`compare-sites.py` against the landed `distance-sites.tsv`: landed 5, now 5. The second export error has 43 entries landed, 45 now:
- COME `ImmutableArray2`: "different method bounds", "Asbtract method get ... is not declared in the API";
- COME `ImmutableArray3`: "different method bounds".

**What the checker and walk accept:**
- Nothing cleared, no new site.
- The two new entries are the same mismatches `Array2`'s and `Array3`'s entries carry. The api types bounds `CompactFullRange[\(ZZ32,ZZ32)\]`, the component `CompactFullRange2D`. `ImmutableArray2`'s api writes `get` without `abstract`, as `Array2`'s api writes `put`.
- The checker types the 258 new body lines with no error.
- Its overloading check accepts three arities of `immutableArray` and of `__subarrayI`, and the narrower `freeze`.
- Walk's checks at load refuse nothing.
- Not measured: whether fixing the api clears the two entries.

**Left out:** `a[:, j]` and `a[i, :]` (immutable Col and Row needed), `t()`, view-of-view flattening, and an immutable Matrix (`array2` gives a Matrix at number types, `immutableArray2` does not).

## 5. microGPT and the tests

On 5667c5ae8:
- `ant testSystem`: shards 168, 166, 166, 169 = 669; 0 failures, 0 errors; BUILD SUCCESSFUL.
- `mg-run.sh tmp/mg sketch`: MicroGptFlatQuick and MicroGptAplQuick each "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", rc=0.

The gate had 162+171+162+173 = 668; the one added is `ImmutableArrayRanks23`. On 0d545d7b6 every walk program is refused at load. Neither tree reaches the compiled path, whose prelude has no arrays.

## Defects (rows to add; checked with `ledger.py check --rows`, only `?` fails)

Section 9, beside row 466:

| ? | under walk, a second `init` of an immutable array's element replaces its value: `a = immutableArray[\ZZ32\](2).fill(3); a.init(0, 9)` leaves `9 3`, where a mutable array keeps `3 3` (row 466) | NEGATIVE-VERIFIED | implementation gap (walk) | `advanced/parallelism-locality/arrays-distributed.tex`, "Distributed Arrays" | none | immutable-arrays probe | siblings: 466. `PrimImmutableArrayObject.init` stores the value before it tests the old one (`interpreter/glue/prim/PrimImmutableArray.java:73-82`); `init0` discards `init00`'s answer (`LibraryBuiltin/NativeArray.fss:36-40`). Walk on 97ccd5f1f, `run()` of `a = immutableArray[\ZZ32\](2).fill(3); a.init(0, 9); println(a[0] " " a[1])` prints `9 3`. The api says a re-initialization signals an error (`Library/FortressLibrary.fsi:1410-1414`), and eee07d7d5 says both kinds of array check it. A varargs parameter's array is one of these. |

Section 14, beside row 577:

| ? | the distance stage counts a library component that stops in name binding as having no errors: with `immutableArray`'s ranks 2 and 3 out of their comment, FortressLibrary stops at "ImmutableArray2 is undefined." (rc=-1) and the table reads 1 where it read 5, with no `#check` row | NEGATIVE-VERIFIED | packaging (tools) | silent | `explorations/perf-probes/immutable-arrays/uncomment.patch` | immutable-arrays probe | `DistanceMulti` prints the two errors and `### done Library/FortressLibrary.fss rc=-1`; `errors.py` and `table.py` count neither, and the `#seconds` row's pattern `rc=[0-9]*` misses `-1`, so FortressLibrary's seconds print empty, the only sign (`explorations/coordinator/tools/distance/run.sh`, the `#seconds` line). The checker's four errors of FortressLibrary leave the table, and `compare.sh` prints DISTANCE DOWN 5 -> 1. Measured on 0d545d7b6 (the patch applied to 4069f1a8b). Workaround: grep the run's `run.txt` for `rc=-1`. |

## Decisions

No decision of the curator covers these.
1. **Standalone `ImmutableArray2`/`ImmutableArray3`**, not a `ReadableArray2`/`ReadableArray3` above both kinds (rank 1's shape, `.fss:2340-2372`). This leaves `Array2`, `Array3` and `Matrix` untouched except `freeze`, at the cost of about 40 copied lines per rank.
2. **0-based view offset (`o0-b0`)**, as `ImmutableArray1.subarray` does (`.fss:2398-2400`). `Array2` and `Array3` pass `o`, the defect the two `XXXArray*SliceAtNonzeroBase` tests record.
3. **`freeze` answers the sized type**, as `Array1.freeze` does (`.fsi:1609`).
4. **`immutableArray2` and `immutableArray3` build the default object directly**, as `array3` does; there is no number-type typecase, since there is no immutable Matrix.
5. **The team's commented text is kept word for word.**
6. **I ran `ant testSystem` once**, because brief question 5 asks about the team's tests. The skill leaves a library edit to the gate.
7. **The ledger rows are in this report only.**

## For FACTS

1. **Uncommenting the two ranks as the team left them makes walk refuse every program at load.** They name types that were never declared. Shown by `uncomment.patch` and any walk run.
2. **Rank 2 and 3 immutables cost 337 library lines in the library's shape.** The checker accepts them with distance 5 (5667c5ae8, against 5 on 4069f1a8b) and two more export entries. The walk suite (669) and microGPT pass. The switch-over neither needs nor is blocked by them. Test: `ImmutableArrayRanks23` in `ranks23.patch`.
3. **Under walk a second `init` replaces an immutable element** (defect 1).
4. **The distance stage reads a component stopped in name binding as error-free** (defect 2).

## Commands

For a declaration's state across history with the cut links, list the versions with `git log --follow --name-only --format='C %h %ad %an' --date=short -- <file>`. Then test each version's text from `git show <hash>:<path>` with a regular expression, and print where the answer changes.

## Questions for the curator

The switch-over needs none of these.
1. **Build ranks 2 and 3 as a rung?** (a) No, rank 1 only. (b) A rung from `ranks23.patch`, about 340 lines, with the api's `abstract get` and range types fixed. Default: (a), today's behaviour, since nothing uses them.
2. **If not built, the comments and the failing freeze?** (a) Keep the team's text. (b) Delete the commented code. (c) Declare `freeze` at rank 1 only. Default: (a).
3. **Write-many immutables under walk?** (a) Record the row only. (b) Refuse a second `init` outside transactions; the team dropped the check because of failed transactions (`NativeArray.fss:38-39`). Default: (a).
4. **The distance stage's blind spot?** (a) Record it, and read `run.txt` by hand when an api changes. (b) Have `run.sh` print a `#check` row for any unit whose `rc` is not 0 and count its name errors. Default: (b), a tools change.
