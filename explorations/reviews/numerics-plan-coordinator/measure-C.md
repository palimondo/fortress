# Measure C: the cheap fixes on one tree, scalar ranges over ZZ32, and what other integer ranges cost

For the coordinator's plan on the numerics on the path to compilation. This is measurement only and recommends nothing. Gathered 2026-09-27, 16:20 to 17:15 UTC, on `main` at `d7ca74708`. `Library/` and `ProjectFortress/LibraryBuiltin/` are byte for byte those of `d65892d34`, the sources the triage ran on (`git diff --quiet d65892d34 HEAD -- Library ProjectFortress/LibraryBuiltin`). The only source change since then is `917bb7b32`, in the interpreter's natives.

## How to read this

- `C/` means `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C/`, and `W/` means `C/work/`. Every capture and script named below is there.
- [measured] marks a count taken from a run's capture. [read] marks something read from source or text and not run.
- **Line numbers are the tree's.** L0 and tree 1 have the tree's lines, since tree 1 moves no line. Tree 2's locations are carried back to tree 1's lines, except where a location says "in the copy".
- An *error* is one distinct error as `distance-triage/fullerrs.py` counts it, with the whole message. A *site* is an error's kind and location, the n-th error at a line matched with the n-th. This is how `compare.py --sites` counts. Classes are those of `distance-triage/classify.py`, unchanged.
- **Machine for every run.** `nproc` 4; `Intel(R) Xeon(R) Processor @ 2.10GHz`; `cpu MHz` 2100.000; OpenJDK 25.0.4; `FORTRESS_THREADS=1`; `-Xmx4g -Xss64m`.
  - Another worker's runs (`probes-D`, up to eight JVMs) shared the machine from about 16:40.
  - Load average at the start of each run, from the capture's head: L0 1.31 / 1.35, T1 9.31 / 9.37, T2 14.38 / 14.38 (walk / any).
  - Elapsed: L0 927 / 919 s, T1 1,607 / 1,605 s, T2 1,445 / 1,441 s (`W/stage-*.out`, `ELAPSED`).
  - No timing here is a comparison. The counts do not depend on load.

## Method

- **Driver.** `distance-triage/run.sh` step `stage` is used unchanged, through `C/stage.sh`: DistanceMulti over the twelve prelude components of a library copy, every stage and declaration, overload memo off, one private cache per run.
  - `C/stage.sh` adds only `-Djava.io.tmpdir` under `W/`, through run.sh's `EXTRA_FLAGS`.
  - The shadows and drivers were built into `W/` by `run.sh <W> build` (`C/build.log`, `W/make-shadows.txt`). `ant` was not run.
- **The two settings.**
  - Walk's setting is `-setting walk`.
  - The third setting is the flat note's `stage-any`: `switch-over-distance-flat/run-all.sh` runs `DistanceMulti -order check -setting any`, which means the bound `Any` with compiled-expression desugaring on (`DistanceMulti.java` header; flat note § 5). `run.sh stage <v> any` passes the same flag.
- **Library copies.** `C/lib.sh <name> <variant>` copies every `.fsi`/`.fss` of `Library/` and `LibraryBuiltin/` into `W/libs/<name>/`, then runs `C/variants_c.py`.
  - `variants_c.py` calls `distance-triage/variants.py` unchanged for BP, R421, BOUNDS and DEVICE, and adds FAILB and Z32 (below).
  - Every edit asserts its count.
  - The copies are `W/libs/L0` (control), `T1` and `T2`. The diffs are `C/tree1.patch` (L0 to T1, 418 lines) and `C/tree2.patch` (T1 to T2, 3,316 lines).
- **Classification and comparison.**
  - Classes: `classify.py`.
  - Tree 1 against the controls: `compare.py --sites -v`. Tree 1 moves no line, so no line map is needed.
  - Tree 2 against tree 1: `C/compare_c.py`. It is compare.py with two changes. Its line map is taken after a normalisation that forgets static argument lists, the names I, J, K and ZZ32, and spacing. It classifies tree 2's errors at tree 1's lines, because classify.py has four line-range rules (I1, V1, G1) that tree 2's shifted lines would otherwise miss.
  - `C/transitions.py` gives, site by site, what became of each base error (gone, or still an error and in which class) and the new sites. `C/families.py` splits L1 and M1 by family and gives the range parts of M1, OT and NM.
- **Walk.** `C/walk.sh <copy> <Test>` runs `com.sun.fortress.Shell` on `ProjectFortress/tests/<Test>.fss` with `-Dfortress.source.path=;.;<copy>;…/test_library`, a private cache and a private temp directory.
  - The triage's scripts do not put a copy in front of the interpreter; their copies are checker targets only. `explorations/reviews/sum-replacement-judgement/walk-shadow.sh` and `perf-probes/nat/zero/run-all.sh` do, with this property.
  - I checked that the mechanism reaches the copy. A copy with `roundToStride` renamed fails `RangeTest` with "Variable roundToStride is not defined" at the copy's `RangeInternals.fss:39` [measured; the capture was overwritten, and the check is repeatable with `walk.sh`].
- **Controls** [measured]: L0 gives **1,738** under walk's setting and **1,746** under `any` (`W/stage-L0-*.tally.txt`).
  - The triage's L0 walk was 1,738, and my classes match its `classes.txt` except O1 13 against 15 and BR 11 against 9. Those are the run-to-run variation families (`C/classes-L0.txt`).
  - The flat note's single `any` run was 1,747.

## 1. Tree 1: BP, FAILB, R421, BOUNDS, DEVICE

**What is in it** (`C/tree1.patch`; [read] from the diff):
- BP: `builtinPrimitive[\T extends Object\]` in `FortressBuiltin.fsi:30` and `.fss`.
- FAILB: the written bound `Object` on the two result-only static parameters behind N2.
  - `fail[\T extends Object\](s:String):T` at `FortressLibrary.fsi:37` and `.fss:54`. This covers 21 of N2's 24 errors, and `RangeInternals.fss:157`, whose loop fails on the `fail` inside it at `:159`.
  - `opr BIG <|[\T extends Object\]|>` at `List.fsi:109` and `List.fss:177`: the nullary comprehension behind `List.fss:150`.
  - Not changed: N2's `FortressLibrary.fss:169`, `opr >=(self, other:Comparison): Boolean = NOT (other < self)`. Its whole message ends "Could not infer static arguments A, B without context. - Could not infer static arguments A, B, C without context" (`W/full-L0-walk.tsv`). That is the tuple comparisons `opr <[\A,B\]` and `[\A,B,C\]`, whose parameters appear in their argument types. They are not result-only.
- R421: `StandardMinMax`'s `MIN` and `MAX` declared `T`, api and component.
- BOUNDS: the 138 `AnyIntegral` bounds become `Integral[\X\]`, and `RightScalarRange` and `emptyScalarRange` take that bound.
- DEVICE: the 18 operators pass their own first arguments instead of `0 asif ZZ32`.

**Is writing `extends Object` on a static parameter the library's own practice?** [read, by grep] No, not in `Library/` or `ProjectFortress/LibraryBuiltin/`.
- The only `extends Object` there is on declarations, not parameters: `String.fsi:25` `object StringStats() extends Object` and `CompilerLibrary.fsi:281` `trait Matrix[\T, nat s0, nat s1\] extends Object`.
- The library writes the bound `Any` instead: `cast`, `instanceOf`, `identity`, `shared`, `localize` and `copy` at `FortressLibrary.fsi:24,26,32,45,49,52`, and throughout `CompilerLibrary.fs?`.
- The specification's examples do write it on static parameters:
  - `SpecData/examples/basic/Fun.Decl.fss:19` `Cons[\T extends Object, nat length\](…)` and `:21`;
  - Fortress source in `Specification/appendices/internal-document.tex:431` `value trait LinearSequence[\T extends Object, nat n\]` and `future.tex:242`;
  - `where` clauses at `basic-lib/convenience.tex:61` and `basic/trait-parameters.tex:359`, `:405`.
- So do compiler tests, e.g. `ProjectFortress/other_compiler_tests/Go1a.fss:15`, `IGO2.fss:26`, `GenMet6.fss:14`.

**Totals** [measured]:
- **Walk's setting: 1,738 → 1,239**. By site, 513 went and 14 appeared (`C/compare-T1-walk.txt`).
- **The `any` setting: 1,746 → 1,253**. By site, 512 went and 19 appeared (`C/compare-T1-any.txt`).
- The same eight declarations crash the checker as in L0 (`W/stage-T1-*.tally.txt`, crash section).

**Per-class moves, walk** (`C/classes-T1.txt`; the sites' fates are in `C/transitions-T1-walk.txt`):
- N1 340 → 0, from BP.
- N2 24 → 1. 22 sites went. `List.fss:150` is now GB, "BottomType->CovariantCollection.AnyCovColl is not applicable…", the message the compile path's setting gives there (digest, part 5, item 9). The one left is `FortressLibrary.fss:169`, above.
- R1 32 → 0 and R4 18 → 4, from R421. OT −4 are row 421's cascades (`List.fss:72`, `:75`, `:332`, `RangeInternals.fss:449`), and TS −1 is `List.fss:320`.
- I1 81 → 4. 69 went, and 8 sites are now I3 (numerals unmasked behind `+`). The 4 left are the unbounded `opr (x:I):[\I\]`, `openRange[\I\]()`, `opr (l:I)::[\I\]` and `opr ::[\I\](l:I,s:I)` (`FortressLibrary.fss:3921`, `:3946`, `:3957`, `:3966`).
- I2 18 → 2. The device's 18 all went. The 2 new are `List.fss:322` and `:333`, `fill` on `ImmutableArray`: the misclassification of the digest's part 5, item 4, unmasked by R421.
- I3 149 → 160: 2 went, 2 are now RG, 8 came from I1, and 7 are new sites (the extent helpers' `-` with a numeral at `RangeInternals.fss:1451`, `:1460`, `:1470`, and `:702`).
- D2 18 → 20: +2 at `RightScalarRange` (`RangeInternals.fss:681`), unmasked by its new bound.
- RG 29 → 31 (+2 from I3); X1 12 → 10 (row 358's two).
- The rest move within the variation families only: OT −2 besides row 421's 4 (`FortressLibrary.fss:1317`, `:1320`, the ranges inferred at `IntLiteral`); V2 42 → 39; BR 11 → 10; O1 13 → 13 (one pair renamed); GB 7 → 8 (N2's).

**Per-class moves, `any`** (`C/classes-T1.txt` columns 3 and 4):
- The same moves as walk's, with D1 12 → 12 (the compiled desugaring's abstract methods), X1 11 → 10, and V2 39 → 41 (3 gone, 5 new, the variation family).

**What rungs A and H would add on top** [read: the digest's reading applied to tree 1's measured class counts; not run]:
- **Rung A, the `fill` rename.** It clears, by the digest's reading (part 2, "7 A"):
  - A1 244 (both settings: under `any`, A1 is 244 in `C/classes-T1.txt`, as the flat note § 5 says);
  - A2 58;
  - R3's `array1`/`array2`/`array3` 5 (2 + 2 + 1, both settings; `W/classes-T1-*.txt`).
  - That is up to **307**.
- **Rung H.** By its brief, H1 38 and H2 2, **40**. By the digest's reading ("7 H") also O1 13, R2's 17 `Unordered` pairs, MB 7 and L1's `CMP` 4, **41 more**, all as counted in tree 1.
- **Arithmetic only.** Tree 1 less rung A and H's brief is walk 1,239 − 347 = 892 and `any` 1,253 − 347 = 906. With H's by-reading families it is 851 and 865. Interactions between the rungs and tree 1 are not measured.
- One interaction [read]: H's keep-the-rule sketch drops `AnyIntegral` from `Integral`'s extends clause (digest, H2). In tree 1, `RangeInternals` and the range operators no longer name `AnyIntegral`: 0 mentions in `RangeInternals.fs?`, down from 21 and 12. `FortressLibrary.fss` and `.fsi` still name it 28 and 20 times outside the range block (grep over `W/libs/T1`).

## 2. Tree 2: scalar ranges over ZZ32 only

**The shadow** is `C/z32.py`, run as `variants_c.py … Z32` on a copy of tree 1. Its output is `W/lib-T2.log` and its diff is `C/tree2.patch`. What it did [measured from its log]:
- **Removed parameters.** In `RangeInternals.fsi`/`.fss` and in `FortressLibrary.fsi`/`.fss`'s operator block, every static parameter bounded by `Integral[\X\]` or `AnyIntegral` was removed. The operator block runs from "The # and : operators serve as factories" up to the generic `opr :[\I\](r: Range[\I\], stride:I)`, and holds the `sized1Range`/`left1Range` family's callers. The name was replaced by `ZZ32` throughout the declaration.
  - `RangeInternals.fsi`: 95 declarations, 173 parameters.
  - `RangeInternals.fss`: 95 declarations, 173 parameters.
  - `FortressLibrary.fsi`: 18 declarations, 36 parameters.
  - `FortressLibrary.fss`: 18 declarations, 36 parameters.
- **Shortened argument lists.** Written static argument lists of the 75 `RangeInternals` names that lost parameters (73 lose them all) were shortened everywhere in the copy: 532 in `RangeInternals.fss`, 337 in `.fsi`, 16 in `FortressLibrary.fss` (e.g. `sized1Range[\ZZ32\](0,b0,s0)`), 3 in `Random.fsi`, 4 in `Random.fss`.
  - Multi-dimensional ranges keep their shape. `Range2D` is now `trait Range2D extends Range[\(ZZ32,ZZ32)\]` with `range1(): ScalarRange`, and `ActualRange2D[\T, Scalar1, Scalar2\]` keeps its non-integer parameters.
- **Split point operators.** `opr (x:I):[\I\]`, `opr (l:I)::[\I\]` and `opr ::[\I\](l:I,s:I)` (api and component) each became three overloads, `ZZ32`, `(ZZ32,ZZ32)` and `(ZZ32,ZZ32,ZZ32)`, the shapes `#` and `:` already have.
- **Kept generic, and why:**
  - FortressLibrary's public range traits (`Range`, `PartialRange`, `OpenRange`, `RangeWithExtent`, `ExtentRange`, `BoundedRange`, `RangeWithLeft`, `LeftRange`, `RangeWithRight`, `RightRange`, `FullRange`, `CompactFullRange`, `StridedFullRange`, at `FortressLibrary.fss:3690-3886`). Their parameter is an index type, a ZZ32 or a tuple of them, which the arrays' `Indexed[\E,I\]` and every 2-D and 3-D range instantiate.
  - The functions over such an index: `openRange[\I\]()`, `opr :[\I\](r: Range[\I\], stride:I)`, `opr #[\I\](r: PartialRange[\I\], size:I)`, and `RangeInternals`' `checkSelection[\R extends Range[\I\], I\]`, which the public traits call with their own `I`.
  - `tupleFlatten[\I, J, K\]`, a tuple utility with no bound.
  - These are the only `I`/`J`/`K` left in the edited regions (z32.py's own check, `W/lib-T2.log`).
- It is a shadow. Correctness of every body was not attempted.

**Totals** [measured]:
- **Walk's setting: 1,239 → 1,012**. By site, 245 went and 18 appeared (`C/compare-T2-walk.txt`, `C/transitions-T2-walk.txt`). From L0 that is 1,738 → 1,012.
- **The `any` setting: 1,253 → 1,021**. By site, 248 went and 16 appeared (`C/compare-T2-any.txt`, `C/transitions-T2-any.txt`). From L0 that is 1,746 → 1,021.
- **A new checker crash hides part of what went.** `ExtentScalarRange` (`RangeInternals.fss:377-456` in the tree; `:363-442` in the copy) now crashes the checker with "Not in the trait table: FortressLibrary.GeneratorZZ32" (`W/stage-T2-walk.out`, `@@TC DECL-CRASH`). Crashes go from 8 to 9 declarations in both settings (`W/stage-T2-*.tally.txt`).
  - This is the crash the flat note § 2.6 described as hidden behind the declaration's `case` clauses, "It returns once those clauses check". With `ZZ32` they check.
  - Its 37 typecheck errors of tree 1 (I3 34, I5 2, NM 1) count among the 245 gone. They are hidden, not measured as cleared (`C/transitions-T2-walk-v.txt`, filtered by location).
- **Of the 245 gone (walk):** 37 are hidden by that crash; 4 sit at a site that keeps another error (TS 2, whose two messages merged once I and J both read ZZ32, RG 1, I3 1); and 204 are sites with no error left. `any` gives the same split of its 248.

**What went, by class and family** (walk; `any` is identical except V2's variation; `C/families-T2-*.txt`, `C/transitions-T2-*.txt`) [measured]:
- **The integer family, I1 to I6: tree 1's 192 → 18 by class label.**
  - I3 160 → 8. 151 went, 34 of them hidden by the crash. One site is now OT: `List.fss:276` `0 # |self|` now checks the range and fails on the declared `ZeroIndexed[\ZZ32\]`. The 8 left are not range numerals:
    - rung G's `else => 0`/`1` at `FortressLibrary.fss:3108`, `:3121`;
    - row 437's `:2718`;
    - `even`'s `self MOD 2` at `:658`;
    - `RangeInternals.fss:1129`, `CompactFullRange3D` called with 4 arguments where it takes 6;
    - rung V's `FortressBuiltin.fss:327`;
    - SF's cascade at `String.fss:156`;
    - `String.fss:79` `0#size`, where `size` is now read as `()->ZZ32` (SF's shape).
  - I5 15 → 0: 13 cleared, 2 hidden.
  - I6 8 → 0.
  - I4 3 → 0. Three OT sites are relabelled I4 because their messages now read `ZZ32`: the wrong-arity calls at `RangeInternals.fss:917`, `:964`, `:1290`, OT's range-body slips.
  - I1 4 → 2 left. `:3921` and `:3957` went with the split. `openRange[\I\]` at `:3946` and the 3-D `opr ::` at `:3966` stay. Three new sites are also labelled I1 (below).
  - I2 2 → 2: the `List.fss` `fill` pair, not the device.
- **D2 20 → 2.** 18 went. `IN`'s and `CAP`'s missing instances at the range objects are gone. What stays is `|_|` of `Indexed` in `StridedFullParScalarRange` (`RangeInternals.fss:1183`) and `StridedFullSeqScalarRange` (`:1284`).
- **RG 31: 1 went; 30 stay.** 17 are still RG and 13 are relabelled OT, because "Function body has type RangeInternals.Range2D, but declared return type is RangeInternals.FullRange2D" no longer carries static arguments. One is new (below).
- **TS 8: none cleared.** 2 are merged messages, and 6 stay, relabelled OT: "argument of type (ZZ32, (ZZ32, ZZ32))" at `RangeInternals.fss:1355`, `:1359` and the like.
- **L1, by family:**
  - `CAP` 36 → 0.
  - `IN` 14 → 14.
  - `openRangeHelper` 6 → 0 as L1. 2 went and 4 are now M1, the Meet Rule: the three overloads on `()->ZZ32`, `()->(ZZ32,ZZ32)`, `()->(ZZ32,ZZ32,ZZ32)`. With 2 new M1 sites, `openRangeHelper` still holds 6 errors.
  - `seq` 10, `MIN`/`MAX` 12, `CMP` 4 and juxtaposition 3 are unchanged.
- **M1's range families: 55 → 61.** `FORWARD_CMP` 38, `IN` 15 and `map` 2 are unchanged; `openRangeHelper` 6 is added. The non-range 45 are unchanged.
- **OT's range part: 51 → 70.** An error counts as range when its message names a `…Range…` type or its location is in `RangeInternals` or `FortressLibrary.fss:3680-4030` / `.fsi:2076-2320`. None cleared: +6 from TS, +13 from RG, +1 from I3, −3 to I4, +2 new. The non-range 59 are unchanged.
- **NM's range part: 19 → 18.** The one gone, `RangeInternals.fss:439` "No such method Range[\I\].intersectWithExtent", is inside the crashed declaration.
- **Unchanged:** every non-range class (A1, A2, H1, H2, R2, R3, S1, V1, SF, G1, CV, MB, Z1, F1, X1, GB, GF), apart from the variation families below.

**New errors in tree 2** [measured; `C/transitions-T2-walk-v.txt`, lines `N`]:
- Walk has 18 new sites; `any` has 16.
- **From the shadow's own edits, 8 in both settings:**
  - M1 2: `openRangeHelper` on arrow types, above.
  - I1 3, by classify.py's line-range rule, at `RangeInternals.fss:1449`, `:1457`, `:1466`. The extent helpers' bodies read "Function body has type OR(RangeInternals.ExtentScalarRange,RangeInternals.CompactFullParScalarRange), but declared return type is ExtentRange[\ZZ32\]"; the numeral errors that stood there in tree 1 are gone.
  - RG 1: `RangeInternals.fss:147` "Function body has type Range[\ZZ32\], but declared return type is RangeInternals.ScalarRangeWithLeft".
  - OT 2: the split 2-D and 3-D `opr ::` forms (`FortressLibrary.fss:3965-3967` in the copy). `(l:):s` finds no `:` for `(LeftRange[\(ZZ32, ZZ32)\], (ZZ32, ZZ32))`.
- **The run-to-run variation families** (flat note § 5): 10 under walk and 8 under `any`.
  - O1 4 or 5: `INVERSE`, `LEXICO` and `SQCAP` pairs renamed.
  - V2 4 or 1: array joins.
  - BR 2: `FortressLibrary.fss:3224`, `:3419`.
  - Against these, O1 1, V2 3 or 6 and BR 2 went. They are not attributed.

**Walk with the copy** [measured; captures `C/walk/<Test>.<copy>.txt`, each with its machine line]:
- **Tree 2 loads under walk.** I ran FlatTowerRungF and five range tests of my choice:
  - `RangeTest`: the range operators, `<<`/`>>`, `openRange[\ZZ32\]`;
  - `subArray`: 2-D ranges, `a2[(0,1)#(2,2)]`;
  - `StringTests`: string ranges;
  - `array3test`: 3-D bounds;
  - `RandomTest`: `Random`'s `FullScalarRange`, which the shadow edited.
- **Results:**
  - L0: all six exit 0.
  - T1: all six exit 0.
  - T2: all six exit 0.
  - None of the six prints output. The interpreter suite's own criterion is the exit code (`FileTests.java`, "exit codes are definitive"). Outputs are identical to L0's, empty.
- **Two more tests, beyond the five:**
  - `rangeOperators`: exit 0 on L0 and T1; **exit 1 on T2**. Walk's overload check pairs the test's `opr #(x:String, y:String)` (`rangeOperators.fss:20`) with the library's `opr #[\I\](r: PartialRange[\I\], size:I)`, which I kept generic (`FortressLibrary.fss:4024` in the tree). The error is "with generic type, at least one pair of parameters must have excluding types", raised at `interpreter/evaluator/values/OverloadedFunction.java:527` [read]. The same pair exists in L0 and T1, which pass. Why T2 reaches it is not traced.
  - `RangePrototype`: exit 0 on L0 and T1; **exit 255 on T2**, by construction. It imports `RangeInternals` and writes `ScalarRange[\I\]` over `I extends Integral[\I\]` (37 lines). T2 says "Incorrect number of static arguments for type 'RangeInternals.ScalarRange': provided 1, expected 0" at `RangePrototype.fss:21`.
- Elapsed 22 to 64 s per test; not a comparison.

## 3. What ranges over other integer types cost

**Where the tree builds a range whose integer is not ZZ32 or a numeral** [read].
- **Method.** `C/nonzz32.py` blanks comments and strings. It collects, per declaration, the names typed `ZZ64`, `NN32`, `NN64` or `ZZ`, or bound from `widen(`, `unsigned(` or `big(` (to a fixpoint). It flags range forms over them (`#`, `:`, `::`, `seq(`, a generator over such a range).
  - Output: `C/nonzz32-candidates.txt`, 16 lines.
  - Every range-form line of every file that names those types or calls those conversions, 974 lines, is in `C/rangelines.txt`. I read the ones outside `FortressLibrary.fs?` by hand, and the library ones by the checks named below.
- **Searched:**
  - `ProjectFortress/tests` (422 files);
  - `ProjectFortress/demos` (71);
  - `Library` (128, `CompilerLibrary` included);
  - `ProjectFortress/LibraryBuiltin` (10);
  - `explorations/run-c4/src` (7);
  - the specification: `SpecData/examples` (135 files, the sources of its example boxes) and the Fortress source in `%` lines of `Specification/**/*.tex` (172 files).

**Range constructions, 7 lines, plus 1 `for` line over one of them:**
1. `ProjectFortress/tests/XXXRangeBoundsRungO.fss:19` `wideTop = (lMax - widen(2)) # widen(three)`: ZZ64, `#` (`lMax: ZZ64` at `:11`).
2. `ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss:10` `r = widen(one):widen(three)`: ZZ64, `:`.
3. `ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss:17` `rN = uOne:uThree`: NN32, `:` (`uOne: NN32` at `:15`).
4. `ProjectFortress/tests/XXXSeqRangeTopRungO.fss:19` `wideTop = seq(lLo:lMax)`: ZZ64, `seq` over it (`lMax: ZZ64` at `:9`, `lLo = lMax - widen(2)` at `:18`).
   - `ProjectFortress/tests/XXXSeqRangeTopRungO.fss:21` `for i <- wideTop do`: the `for` over it.
5. `SpecData/examples/advanced/Generators.GeneratorDefn.fss:21` `seq(self): SequentialGenerator[\ZZ64\] = seq(lo:hi)`: ZZ64, `seq`, inside `object BlockedRange(lo: ZZ64, hi: ZZ64, b: ZZ64) extends Generator[\ZZ64\]` (`:19`). The specification typesets it as the figure "Sample Generator definition: blocked integer ranges" (`Specification/advanced/parallelism-locality/defining-generators.tex:49-51`).
6. `SpecData/examples/basic/Expr.Do.mySum.fss:21` `for j <- 0:i do`: a numeral and a ZZ64 bound, and a `for` over it, in `mySum(i:ZZ64):ZZ64` (`:19`). Typeset at `Specification/basic/expressions/blocks.tex:72`.
7. `Specification/basic-lib/basic-integers.tex:544` `%%   property FORALL (m) m! = PROD[k<-1:m] k`: a numeral and a ZZ bound, and a generator over it. It is `ZZ`'s factorial property under `opr (self)! : ZZ` (`:537`), typeset at `:545-547`.

**Counts by kind:**
- By integer type: ZZ64 5 (items 1, 2, 4, 5, 6); NN32 1 (3); ZZ 1 (7); NN64 0.
- By form: `:` 6, `#` 1; `seq(a:b)` over such values 2 (4, 5); a `for` or generator over such a range 3 (4's `:21`, 6, 7).
- **Interpreter tests among them.**
  - 3 in `ProjectFortress/tests` (items 1 to 4, 5 lines), all expected-failure tests (`XXX`) that climb batch 6b's rung O added for gap ledger rows 450 to 452. `ant testSystem` runs them.
  - 2 are specification examples (items 5, 6). `ant testSpecData` runs those under the interpreter (`build.xml:1139`); `testFast` excludes them (`build.xml:988`).
  - None of them is on the gate as a passing test.
- **Nowhere else** [read]:
  - No demo, no file of `explorations/run-c4/src` (none names these types), and no component of `Library/` or `LibraryBuiltin/` builds a range on a ZZ64, NN32, NN64 or ZZ bound.
  - Checked in the library: there is no range form inside the `ZZ64`, `NN64`, `ZZ` and `QQ` traits of `FortressLibrary.fss` or the `NN32` object, and none anywhere in `FortressBuiltin.fss` (awk over each declaration, and grep). `IntMap`'s keys are ZZ64, but it builds no range over them.
- **Near misses, not counted.** These build a ZZ32 range and convert inside it:
  - `ProjectFortress/demos/fact64.fss:22-23` `for i <- seq(0#20) do j:ZZ64 = widen(i)`;
  - `ProjectFortress/demos/LogFib.fss:40` `println(fib big(i)), i <- seq(0:100)`;
  - `ProjectFortress/tests/FlatTowerRungF.fss:115-127` (`SUM[\ZZ64\][j <- 0#4] j` and the like);
  - `ProjectFortress/tests/IntMapTest.fss:27` (`widen(x) |-> … | x <- (-7):57:3`).
- **Generic ranges whose integer is a type parameter,** outside the range machinery [read]:
  - `Library/QuickCheck.fss:491-504` `object genRange[\I\](genI:Gen[\I\])`, which builds `(left:right)` from generated `I`s. Its comment reads "Mostly for the testing of subscripts. (XXX not tested)" (`:490`).
  - `Library/Random.fsi:258` / `Random.fss:370` `object UniformDistribution[\T\](range:FullScalarRange[\T\])`. `RandomTest.fss:53`, `:69`, `:85` instantiate it at `ZZ32` only.
  - `ProjectFortress/tests/RangePrototype.fss`, over `I extends Integral[\I\]` through `RangeInternals`' own types (37 lines). It is instantiated at `ZZ32` only (`:264`).
- **The compiled path's own library** declares its ranges over ZZ32 only: `Library/CompilerLibrary.fsi:143` `trait Range extends GeneratorZZ32`, and `:173-174` `opr :(lo:ZZ32, hi:ZZ32): Range`, `opr #(lo:ZZ32, sz:ZZ32): Range` [read].

**What such ranges do under walk today and under tree 2** [measured, `C/probe/WideRangesC.fss`, run by `C/walk-probe.sh`; captures `C/walk/WideRangesC.L0.txt` and `.T2.txt`]:
- **L0, today's library:**
  - `(widen(1):widen(3)).size` is 3, and so is `(widen(1) # widen(3)).size`.
  - `for i <- seq(lo64:hi64)` makes 3 iterations.
  - `for j <- 0:hi64` makes 4 (`mySum`'s shape).
  - `(unsigned(1):unsigned(3)).size` is 3.
  - A ZZ range, `for k <- big(1):big(3)` (the factorial property's shape), stops the run: "Failed to find any matching overload, args = (3:ZZ)" at `partitionL` (`RangeInternals.fss:1045`). `partitionL` exists for `NN32`, `ZZ32`, `ZZ64`, `NN64` only.
- **T2:** the first ZZ64 range stops the run: "Failed to find any matching overload, args = (1: ZZ64,3: ZZ64)" for `:`, whose overloads are now `ZZ32`, the two tuples, `()` and the generic stride form. That the other shapes fail the same way is [read] from that overload list.
- **The three tests** (`C/walk/XXX*.{L0,T1,T2}.txt`). All three exit 1 on L0, T1 and T2.
  - `XXXRangeBoundsRungO` and `XXXSeqRangeTopRungO` stop at their first, ZZ32, lines on all three copies (`IntegerOverflow` at `sized1Range`'s `lo+ex-1`, and at the sequential range's step). Their ZZ64 lines are never reached.
  - `XXXRangeSizeZZ64RungO` stops at `|r|`'s typecase ("typecase match failure given Long", `FortressLibrary.fss:3876`, from the test's `:13`) on L0 and T1. On T2 it stops earlier, at the construction on `:10`. Its in-file control, `r.size = 3`, no longer runs.

**The specification's text on ranges** [read]:
- **The 2012 draft**, unchanged since `a874948ac` (`git diff --quiet`):
  - `Specification/basic/expressions/ranges.tex:37-44`: "A range expression is used to create a special kind of Generator for a set of integers, called a Range … Assume that a, b, and c are expressions that produce integer values." No integer type or width is named.
  - `:47` (`a:b` is the max(0, b−a+1) integers a to b), `:54-56` (strided), `:64-65` (`a#n`), `:103-106` (`|…|` is the number of integers).
  - `Specification/basic/expressions/generators.tex:97` lists `l:u` as "Any range expression".
  - `Specification/preliminaries/overview.tex:581-583` names the integer types ZZ64, ZZ32 and ZZ.
  - The draft's own examples above build ZZ64 and ZZ ranges (items 5 to 7).
- **The revival's text:** `Specification/basic-lib/basic-integers.tex:61-65`, in a `\revision{revival-numbers}` block written 2026-09-27 (`d9c415395`): "A generic call or a range over two different integer types is to infer the narrowest type that both coerce into, by a rule to be written into [type inference] … until then such a call writes its static argument". It presupposes ranges over any of the five integer types listed at `:23-31` (also revival text).
- **The later restart:** its ranges section is only a heading (`Documentation/Specification/Prose/Language/Expressions/ranges.tick:12`).

## Scripts and captures, all under `C/`

- **Scripts.**
  - Runs: `stage.sh`, `lib.sh`.
  - Library copies: `variants_c.py`, `z32.py`.
  - Comparison: `compare_c.py`, `transitions.py`, `families.py`.
  - Walk: `walk.sh`, `walk-set.sh`, `walk-xxx.sh`, `walk-probe.sh`, `probe/WideRangesC.fss`.
  - Question 3: `nonzz32.py`.
- **To repeat.** Build with `…/distance-triage/run.sh C/work build`. Make the copies with `C/lib.sh L0` (or run.sh's `lib L0`), `C/lib.sh T1 BP+FAILB+R421+BOUNDS+DEVICE` and `C/lib.sh T2 BP+FAILB+R421+BOUNDS+DEVICE+Z32`. Then run `C/stage.sh <copy> walk|any`, and `compare.py --sites` / `C/compare_c.py --sites … --map W/libs/T1 W/libs/T2`.
- **Captures.**
  - Runs: `W/stage-*.out`, `.tally.txt`, `W/full-*.tsv`.
  - Classes: `classes-L0.txt`, `classes-T1.txt`, `W/classes-*-*.txt`.
  - `classes-all-unmapped.txt` classifies T2 at its own lines. It differs from the mapped counts only in I1 3 against 5 and OT 131 against 129; use the mapped ones in `compare-T2-*.txt`.
  - Comparisons: `compare-T1-*.txt`, `compare-T2-*.txt`, `transitions-T*-*.txt`, `families-T2-*.txt`.
  - Walk: `walk/*.txt`. Question 3: `nonzz32-candidates.txt`, `rangelines.txt`.
  - Library copies: `W/libs/{L0,T1,T2}`, `tree1.patch`, `tree2.patch`.
- Nothing tracked was changed, and nothing was written to `default_repository/`.
