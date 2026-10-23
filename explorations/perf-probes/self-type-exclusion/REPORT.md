<!-- Probe A1 of 2026-10-23 for P-157: whether the 8 pairs that the compiled checker's full symbolic-operator check refuses between AdditiveGroup's + and - and the library's generic array-and-scalar block clear when the overloading check's exclusion test reads a self-typed trait's self as C[\X\] & X (shadow (i)) and when its existential reduction reads the static parameters' bounds (shadow (ii)), as the type-decisions judgement of the same day argues (reviews/type-decisions-review/judgement.md, V1, section 2 item 2, section 4 change 1, section 7 item 1). Checker shadows on the base aa5ff2423, measured on the distance stage with the full check on, the count stage, small probes and the compiled tests; nothing on main changes. Branch wip/probe-a1, worktree /home/user/fortress-probe-a1, seeded from /home/user/fortress-base21. The worker's write of this file was refused by the harness; the text is the worker's returned text. -->

# The self type and the bounds in the overloading check's exclusion test: probe A1 for P-157

## In short

- **(i) alone clears 0 of the 8.** Reading `self` as `C[\X\] & X` in the exclusion test only makes no library pair valid. It clears the concrete probe `VecPairsC` (the pair at `Rr`), not the generic block: the generic right-hand pairs also need the equality `T = V`, which only the bounds give.
- **(ii) alone clears 4 of the 8,** the four scalar-on-the-left pairs (`FortressLibrary.fsi:2703`, `:2708`; `FortressLibrary.fss:4907`, `:4912`). In (ii), the exclusion test's reduction reads each static parameter at the top of the meet as its bounds.
- **(i) and (ii) together clear all 8.** The distance stage with the full check goes from 191 to 183. That is the same 183 as the earlier probe's A2 (vectors out of `AdditiveGroup`), here with no library line changed.
- **Nothing else moves, under any shadow.** Every other site of the stage is the same, site by site. There are three exceptions in wording only:
  - The fancy rule's three errors name another `Vector` or `Matrix` pair of the same family under (i). Their count, kind, unit and declarations are unchanged.
  - That rule reads only `lteq`, which no shadow touches (`OverloadingChecker.scala:426`).
  - The caught `AnyList` crash is printed with another span.
- **The other measurements:**
  - The count stage: 102 with the full check, 102 under (i), 100 under (ii) and 98 under both. Only the api's four scalar pairs move. It is 3 without the full check.
  - The compiled tests: the 35 files in scope (52 tests) give word-for-word the same output with no shadow, with the full check alone, and with the full check and both shadows: `OK (52 tests)` each time.
  - A variant that reads the bounds in every existential reduction (`global`) also gives 183. Nothing more moves.
- **Time: no slowdown and no stall.** The stage takes 230 to 279 s under the shadows, against 272 s and 253 s for two runs with the full check alone. `FortressLibrary` takes 170 to 219 s, against 207 s and 187 s. The stall path that the self-typed bodies judgement watched did not show: every target finished, `#crash none`.
- **One crash, in a first form of (ii), not in the measured shadows.** Keeping each parameter beside its F-bound, as `X & AddG[\X\]`, sends the constraint solver into a recursion without end: `Formula.tImplies` and `primImp`, a `StackOverflowError` also at a 1 GB stack. The measured (ii) reads the parameter as its bounds alone and never meets it. A ledger row is drafted (section 8).
- **Row 786's `tint` pair is still refused under (ii).** The reduction now carries the bounds: it merges the two parameters into one bounded by `Blue` and `Red`. But `Box[\Bottom\]` is an instance of that one parameter, so the meet is not empty. This is the contested point of the row.
- **Against the judgement.** Its conclusion holds: (i) and (ii) together clear the 8 and bring none. Its split does not: "(i) alone clears the four scalar-on-the-right pairs" (section 2, item 2) is false for the library's generic block.

## 1. Where and how

- **Tree.** I seeded worktree `/home/user/fortress-probe-a1`, branch `wip/probe-a1`, from the base build `/home/user/fortress-base21` (`aa5ff2423`) with `explorations/coordinator/tools/seed-worktree.sh`. I did not build in the base build or run anything there.
- **Same code as the earlier probe.** The code at the base is that of the earlier probe's commit: `git diff --stat d97001d19 aa5ff2423 -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin ProjectFortress/astgen build.xml` prints nothing. So its measurements hold here.
- **Why the full check ran again.** Its site list was no longer on disk, and the site comparison needs it. I ran the full check alone twice, `full` and `full2`. Both give `#total 191`, the earlier probe's full-catch total, and the same 191 sites (section 3).
- **The instrument.** The gate's `explorations/coordinator/tools/distance/run.sh`, unchanged, run through `run.sh` beside this note.
  - It is `perf-probes/symbolic-operators-2/run-shadow.sh` with that probe's shadow generator replaced by `shadow.py`.
  - `shadow.py` always writes the earlier probe's full check with crashes caught per name: its `checker-shadow.py <tree> <out> catch`, whose patch is `../symbolic-operators-2/checker-full-check.patch`. It then adds the shadows that the words name.
  - The classes are compiled by scalac ahead of the build on the stage's class path. The tracked sources are never edited.
- **The machine.** `nproc` 4, Intel Xeon @ 2.10 GHz, JDK 25.0.4.1, `FORTRESS_THREADS=1`, every run under `nice -n 19`. Other agents' JVMs ran beside these runs: the load at start was 3.1 to 12.4 (the `#machine` rows). Each timing is one run, a smoke test (P-148).

## 2. The shadows

### 2.1 Shadow (i): the self type in the exclusion test only (`self-exclusion.patch`, word `selfexc`)

- **What the tree does.** Under P-146, `FunctionalMethod` gives the overloading check a self parameter at the plain trait type, when the self type was read from the F-bound (`compiler/index/FunctionalMethod.java:43-67`, `parameters()` at `:152-166`). The declaration's own syntax tree keeps the `TraitSelfType` whose comprised list holds `X`. `TypeAnalyzer.removeSelf` reads that type as `C[\X\] & X` (`scala_src/types/TypeAnalyzer.scala:567-579`).
- **The shadow** (`scala_src/typechecker/OverloadingChecker.scala`):
  - `toFunctionArrows` (`:127`) and `toFunctionalMethodArrows` (`:173`) make the plain arrow as before. For a functional method whose `ast` parameters differ from `parameters()`, they also make a second arrow, by the same steps from the `ast` parameters.
  - The second arrow is kept in an identity map, keyed by the plain arrow.
  - The exclusion test of `validOverloadingInner` (`:585`) passes the second arrow where there is one: `oa.excludes(forExclusion(fa), forExclusion(ga))`.
- **What keeps the plain signature.** Specificity (`oa.lteq`), the Meet Rule's meet, the coverage rule, the fancy rule, duplicate detection and the Return Type Rule all read the plain arrows.
- **What it does not reach.** A trait whose `comprises` clause lists types already carries its intersection in the signature (F-225), so the shadow does not touch it.

### 2.2 Shadow (ii): the bounds in the exclusion test's reduction (`bound-exclusion.patch`, word `bounds`)

- **What the tree does.**
  - `reduceED` (`scala_src/types/TypeSchemaAnalyzer.scala:366-433`) conjoins the bounds (`ubConjuncts`, `:384-389`) with the constraint that keeps the body off Bottom (`:398`). This is the paper's `unify(C ∧ C′)`.
  - But C is computed with each parameter replaced by a bare inference variable, so an intersection `T & AddG[\V\]` yields only "`#T` does not exclude `AddG[\#V\]`". The solver's unifier takes equalities only from a lower bound that equals an upper bound (`Formula.scala:684-698`, `getEquality`). It never uses `#T <: AddG[\#T\]` to derive `#T = #V`.
  - So the earlier probe's `emptybounds` (the bounds added to `emptyED`'s False test) could not clear `VecPairsLeft` (`../symbolic-operators-2/REPORT.md`, section 3.2, row A1).
- **The shadow** (`TypeSchemaAnalyzer.meetEmptyWithBounds` and `emptyWithBounds`, added after `emptyED` at `:444`):
  - The meet of the two domains, renamed apart and not reduced, gets one more conjunct in its constraint. That conjunct is the body off Bottom where each type parameter at the top of the body is read as the meet of its declared bounds. "The top" is the body itself, a tuple's element, a member of an intersection or union, and the parts of a self type read as `removeSelf` reads them.
  - Each instance of a parameter lies below its bounds, so the new conjunct is implied by the old one. It adds the equalities that only the bounds show: from `AddG[\#T\]` against `AddG[\#V\]`, `#T = #V`.
  - The meet is empty when the whole constraint is False. It is also empty when, for each disjunct of it, the equalities that the unifier takes from that disjunct leave a body below Bottom, its parameters merged with their bounds by `boundsSubstitution`.
  - A disjunct whose equalities do not unify, or whose images break a bound, is not read as empty.
  - `OverloadingOracle.excludes` (`scala_src/overloading/OverloadingOracle.scala:322-327`) becomes `sa.subtypeED(md, BOTTOM) || sa.emptyED(md) || sa.meetEmptyWithBounds(fd, gd)`. It only adds a way to be valid.
- **The variant `global`** (not one of the brief's shadows) also adds the bounded conjunct to `reduceED`'s own constraint. Every existential reduction then reads the bounds: specificity, the Meet Rule's meet and the Return Type Rule's special arrow.
- **The variant `keepvar`** reproduces the crash of section 8. It is the first form of the shadow, with the parameter kept beside its bounds (`X & B`).

The patches apply to `aa5ff2423` in this order: `../symbolic-operators-2/checker-full-check.patch`, then `self-exclusion.patch`, then `bound-exclusion.patch`. I checked them with `git apply --check` and `git apply` in a scratch copy of the three files. The result is byte for byte the sources that the `both` run compiled.

## 3. The distance stage with the full check on

Command, for each row (`<words>` as in the table):

    explorations/perf-probes/self-type-exclusion/run.sh $PWD/tmp/dist/<run>.txt $PWD/tmp/dist/<run> <words>
    python3 explorations/perf-probes/self-type-exclusion/sites.py tmp/dist/full/d/errors.tsv tmp/dist/<run>/d/errors.tsv tmp/dist/full/d/run.txt tmp/dist/<run>/d/run.txt

| Run | Words | `#total` | Of the 8 | Other sites gone / come | Caught crashes | Stage s | FortressLibrary s | Load at start |
|---|---|---|---|---|---|---|---|---|
| full | (none) | 191 | 0 cleared | (the base list) | 3 (`\|\|` in List's api and component, and String's component) | 272 | 207 | 3.40 |
| full2 | (none) | 191 | 0 | 0 / 0 | the same 3 | 253 | 187 | 12.42 |
| (i) | `selfexc` | 191 | 0 | 0 / 0 * | the same 3 * | 230 | 170 | 5.66 |
| (ii) | `bounds` | 187 | **4** (the left pairs) | 0 / 0 | the same 3 | 243 | 183 | 3.80 |
| both | `selfexc bounds` | **183** | **8** | 0 / 0 * | the same 3 * | 257 | 190 | 3.13 |
| global | `selfexc bounds global` | 183 | 8 | 0 / 0 * (against both) | the same 3 * | 279 | 219 | 6.50 |

\* Changes of wording only, explained below.

- **The 8 sites, as the stage prints them** (`full`, `errors.tsv`):

      Invalid overloading of + in API FortressLibrary: [\T extends AdditiveGroup[\T\]\](AdditiveGroup[\T\], T)->T @ FortressLibrary.fsi:267:5-37 and [\T extends Number AdditiveGroup[\T\], I\](Array[\T,I\], T)->Array[\T,I\] @ FortressLibrary.fsi:2702:1-89
      Invalid overloading of + in API FortressLibrary: [\T extends AdditiveGroup[\T\]\](AdditiveGroup[\T\], T)->T @ FortressLibrary.fsi:267:5-37 and [\T extends Number AdditiveGroup[\T\], I\](T, Array[\T,I\])->Array[\T,I\] @ FortressLibrary.fsi:2703:1-89

  The other six are `-` at `fsi:268` against `:2704` and `:2708`, and the component's `+` and `-` at `fss:361` and `:362` against `:4906`, `:4907`, `:4908` and `:4912`. The table classes them as `L1 8`, "the static-parameter sentence's families". The row is gone under both: `#kind overloading` falls from 182 to 174, and `#class M1 174` is unchanged.
- **(ii)'s four** are the scalar-on-the-left pairs, in `sites.py`'s words:

      GONE  overloading  api FortressLibrary  FortressLibrary.fsi:267,FortressLibrary.fsi:2703  Invalid overloading of + ...
      GONE  overloading  api FortressLibrary  FortressLibrary.fsi:268,FortressLibrary.fsi:2708  Invalid overloading of - ...
      GONE  overloading  component FortressLibrary  FortressLibrary.fss:361,FortressLibrary.fss:4907  ...
      GONE  overloading  component FortressLibrary  FortressLibrary.fss:362,FortressLibrary.fss:4912  ...
      # 191 sites in the first, 187 in the second; 4 gone, 0 come

- **\* The fancy rule's three errors.**
  - Under (i), both and global, the three "Overload violation: the declaration of top-level function + on line ... is more specific than the declaration of the functional method + ..." name another `Vector` or `Matrix` declaration of the same family. Before, they were `fsi:1654` against `:1619`, `:1660` against `:269`, and `:1767` against `:268`. After, they are `:1654` against `:267`, `:1657` against `:268`, and `:1770` against `:1741`. Their count (3), kind (`other/overloading`) and unit are unchanged.
  - The rule reports the first violating pair that it meets (`OverloadingChecker.scala:426`), and it reads only `oracle.lteq` on the plain arrows, which the shadows do not change. So this is a change of iteration order, not of a verdict.
  - The earlier probe saw the same variation between runs ("which Vector or Matrix pair is named varies from run to run", `../symbolic-operators-2/REPORT.md`, section 1.2). Here `full` and `full2` agree. The shift comes with (i)'s identity map, plausibly through the identity hash codes that it draws. I did not trace it.
- **\* The caught crash.** The `AnyList` crash on `||` (the earlier probe's section 1.3) is caught on the same three names in every run. Under (i), both and global, its message gives another span (`List.fss:252:19` for `:106:13`) or another kind-environment dump. It crashes in the same place.
- **global against both:** the same 183 sites but two of the fancy rule's messages, and the same caught crashes. On this library, reading the bounds in every reduction moves nothing that the exclusion test alone does not.

## 4. The count stage

Command, for each run (`plain` is the stage as the gate runs it, with no shadow):

    explorations/perf-probes/self-type-exclusion/count.sh $PWD/tmp/count/<run>.txt $PWD/tmp/count/<run> plain
    explorations/perf-probes/self-type-exclusion/count.sh $PWD/tmp/count/<run>.txt $PWD/tmp/count/<run> full [selfexc] [bounds]

| Run | `#total` | `#locations` | `#crash` | s (with scalac) |
|---|---|---|---|---|
| plain | 3 | 3 | none | 93 |
| full | 102 | 41 | none | 76 |
| full, (i) | 102 | 41 | none | 76 |
| full, (ii) | 100 | 39 | none | 76 |
| full, both | 98 | 35 | none | 74 |

The places that move, from the stage's `run.txt`, are only the api's four scalar pairs. Under (ii), `fsi:2703` and `:2708` go, and `fsi:267` and `:268` are each named once less. Under both, `fsi:2702`, `:2703`, `:2704` and `:2708` go, with `:267` and `:268`. The count stage stops early in the components (`references/compiler.md`, "count stage"), so it sees none of their four.

## 5. The probes

The programs run under `bin/fortress typecheck` with the shadow classes first on the class path, the overloading memo off and a fresh copy of the caches for each run. They use a word operator, `PLUS`, as the earlier probe did. Each file is

    component <Name>
    export Executable
    <the common lines>
    <the declaration of the row>
    run(): () = ()
    end

with these common lines (the earlier probe's shapes, section 3.2):

    trait AnyAddG end
    trait AddG[\T extends AddG[\T\]\] extends AnyAddG
      opr PLUS(self, other: T): T
    end
    trait Numb end
    trait HasRk excludes { Numb } end
    object Rr extends { Numb, AddG[\Rr\] }
      opr PLUS(self, other: Rr): Rr = self
    end
    trait Arry[\E\] extends HasRk end
    object Vv extends { Arry[\Rr\], AddG[\Vv\] }
      opr PLUS(self, other: Vv): Vv = self
    end

| Program | Its declaration | Plain checker | (i) | (ii) | both |
|---|---|---|---|---|---|
| VecPairs | `opr PLUS[\T extends { Numb, AddG[\T\] }\](x: Arry[\T\], y: T): Arry[\T\] = x` | refused | refused | refused | **accepted** |
| VecPairsC | `opr PLUS(x: Arry[\Rr\], y: Rr): Arry[\Rr\] = x` | refused | **accepted** | refused | accepted |
| VecPairsLeft | `opr PLUS[\T extends { Numb, AddG[\T\] }\](y: T, x: Arry[\T\]): Arry[\T\] = x` | refused | refused | **accepted** | accepted |
| VecPairsLeftC | `opr PLUS(y: Rr, x: Arry[\Rr\]): Arry[\Rr\] = x` | accepted | accepted | accepted | accepted |
| VecLib, the library's shape: `Numb comprises { Rr, Zz }`, `Arr[\E, I\] extends HasRk`, `Vec[\T extends Numb, nat s\] extends { Arr[\T, ZZ32\], AddG[\Vec[\T,s\]\] }`, the four `PLUS`/`MINUS` scalar declarations with `I` | (four) | 4 errors | 4 errors | 2 errors (the right pairs) | **0** |

The plain checker's verdicts are the earlier probe's (its section 3.2), measured again here.

- **Why (i) needs (ii) on the generic right-hand pair.** (ii)'s trace of `VecPairs`, with `-Dprobe.excdebug=true`, shows the bounds giving `#T = #V`. Without (i), the merged first position `AddG[\W\] & Arry[\W\]` is not Bottom. With (i), it is `AddG[\W\] & W & Arry[\W\]`, and `W`'s bound `Numb` excludes `Arry`:

      @@PROBE BOUNDS false [\T$21 extends AddG[\T$21\], T$22 extends Numb AddG[\T$22\]\]AND((AddG[\T$21\], T$21),(Arry[\T$22\], T$22)) ... c=And(Map(#2fql -> TPrimitive(Set(#ulve),Set(),Set(#ulve),...
      @@PROBE BOUNDS true  [\T$13 extends AddG[\T$13\], T$14 extends Numb AddG[\T$14\]\]AND(((AddG[\T$13\] & {T$13}), T$13),(Arry[\T$14\], T$14)) ...

- **Negative probes, still refused under both.** Each would be a wrong acceptance:
  - `NegLeft` and `NegRight`: the scalar declarations with `T extends AddG[\T\]` only, beside `object Ww extends { Arry[\Ww\], AddG[\Ww\] }`. The value `(Ww, Ww)` is in both domains.
  - `NegShared`: `g[\T extends A\](x: Box[\T\], y: T)` beside `g[\T extends B\](x: Box[\T\], y: T)`, with `object C extends { A, B }`. They meet at `T = C`.
- **Row 786's `tint`** (`object Red`, `object Blue`, `object Box[\T\]`, `tint[\T extends Red\](x: Box[\T\])` beside `tint[\T extends Blue\](x: Box[\T\])`) is refused on the plain checker and under (ii) and both, with the same message:

      Invalid overloading of tint in component Tint:
           [\T extends Blue\]Box[\T\]->String @ .../Tint.fss:9:1-53
       and [\T extends Red\]Box[\T\]->String @ .../Tint.fss:8:1-50

  (ii)'s trace shows the reduction carrying the bounds. The two parameters unify, `#jq25 = #j0o2`, into one bounded by `Blue` and `Red`. `Box[\W\]` with that `W` is not Bottom, since `W = Bottom` is an instance. So (ii) reads `tint` as the 2011 paper's rule does. It moves neither way on the row's open question, whether `Box[\Bottom\]` counts (row 786: "Bottom lies within both bounds, so which path moves is open").

## 6. Time and the stall path

- **The stall path** that the self-typed bodies judgement watched is the exclusion test of an intersection, through `normConjunct`, `dExc` and `pExcInner` (`reviews/self-typed-bodies-judgement.md:73`, `:204`). Under (i), that test now sees `C[\X\] & X` at every self-typed functional method of the library's top-level and per-provider sets.
- **No run stalled.** Every target finished in every run, and every table reads `#crash none`. `FortressLibrary`, the stage's longest target, took 170 s under (i), 183 s under (ii), 190 s under both and 219 s under global. It took 207 s and 187 s with the full check alone (section 3's table, from each table's `#seconds` row).
- **No slowdown of several times.** One run of each, beside other agents' JVMs, as a smoke test (P-148). I do not analyse the differences.

## 7. The compiled tests

The tests in scope are `compiler_tests/SelfType*`, `XXXSelfType*`, `OverloadGeneric*`, `GenericPair*` and `*Comprises*`: 35 `.test` files, 52 tests. They ran in one JVM each time, at `FORTRESS_THREADS=4`, on a private copy of the caches:

    T=$(cd ProjectFortress/compiler_tests && ls SelfType*.test XXXSelfType*.test OverloadGeneric*.test GenericPair*.test *Comprises*.test | sort -u)
    explorations/perf-probes/self-type-exclusion/tests.sh $PWD/tmp/tests/plain plain -- $T
    explorations/perf-probes/self-type-exclusion/tests.sh $PWD/tmp/tests/full full -- $T
    explorations/perf-probes/self-type-exclusion/tests.sh $PWD/tmp/tests/both full selfexc bounds -- $T

- **The verdicts.** Each run ends `OK (52 tests)`, `exit=0`. The three outputs, 166 lines each, are identical once the times are masked. Every diagnostic that an `XXX` test pins is printed the same.
- **The team's own self-type tests**, outside the brief's list, were also run with no shadow and under both: `XXX10k.test` (the checker's `(T[\U\] & {U})` reading) and `AfterTypeChecking.test` (`Compiled10.l`, `Compiled10.m`). Both runs end `OK (98 tests)`, with identical output.
- **No verdict changes under the shadow that clears the most.**

## 8. Defects

**The constraint solver's implication test recurses without end on an F-bound beside its own variable** (new row, drafted, not filed; ledger section 5, "Overloading on the compiled path: checker and dispatch"):

`| ? | the compiled checker's constraint solver recurses without end on an intersection that holds an inference variable beside its F-bound, as #T & Numb & AddG[\#T\] & AddG[\#V\]: Formula.tImplies and primImp call each other through TypeAnalyzer.excludes until a StackOverflowError, also at a 1 GB stack | NEGATIVE-BOUNDED | implementation gap (checker) | silent | perf-probes/self-type-exclusion/REPORT.md | the self-type exclusion probe | siblings: 736. Formula.scala:282 (tImplies' pu1.exists(t1 => primImp(p, ta.excludes(e2, t1)))) and :287-292 at aa5ff2423; the team's comment there says a recursive implies will not terminate, and forall's stackLevel guard (:308-314) is not on this path. Reached from normConjunct's subtype test (TypeAnalyzer.scala:779) under TypeAnalyzer.equivalent(body, BOTTOM): shadow.py bounds keepvar, typecheck of the report's VecPairsLeft or VecPairs. No plain-checker program is known to reach it; source cannot write such an intersection. |`

The reproduction, from the worktree's root, with `tmp/probe/VecPairsLeft.fss` as section 5 gives it:

    S=tmp/qs-keepvar; python3 explorations/perf-probes/self-type-exclusion/shadow.py $PWD $S/src bounds keepvar
    CP=$(bin/fortress_classpath | tail -1); java -cp "$CP" scala.tools.nsc.Main -nowarn -classpath "$CP" -d $S/classes -encoding UTF-8 $S/src/*.scala
    cp -a default_repository/caches $S/caches; cd tmp/probe
    java -Xmx4g -Xss1g -Dfortress.caches=$PWD/../qs-keepvar/caches -cp "$PWD/../qs-keepvar/classes:$CP" com.sun.fortress.Shell typecheck VecPairsLeft.fss
    Exception in thread "main" java.lang.StackOverflowError

The full stack, taken with `-XX:MaxJavaStackTraceDepth=1000000`, runs as follows. `OverloadingOracle.excludes` calls `meetEmptyWithBounds`, then `emptyWithBounds`, then `TypeAnalyzer.equivalent`. The normalizer calls `normConjunct`'s `sub` (`:779`), then `pSubInner` (`:153`), then `Formula.reduce`, then `maximalCFormulas` (`:358-360`), then `implies`, and then `tImplies` and `primImp` alternate without end.

**Notes for rows** (drafted, not filed):

- **584:** with the full check on at `aa5ff2423`, the 8 scalar `+`/`-` sites beside `AdditiveGroup` clear when the exclusion test reads `self` as `C[\X\] & X` and its reduction reads the static parameters' bounds (`perf-probes/self-type-exclusion/REPORT.md`, section 3). The distance with the full check falls from 191 to 183 with no library edit. The self type alone clears none of the 8; the bounds alone clear the four scalar-on-the-left pairs.
- **786:** a reduction that reads the bounds into its constraint (`perf-probes/self-type-exclusion/REPORT.md`, section 5) still refuses `tint`. It merges `T` into one parameter bounded by `Blue` and `Red`, and `Box[\Bottom\]` remains an instance. Accepting the pair needs a rule that an existential whose parameter has excluding bounds is empty, which is the row's open question.

## 9. Decisions

No POSITIONS entry covers these. I acted on the readings given.

1. **(ii) is confined to the exclusion test.** It is an added way to be valid, beside `subtypeED` and `emptyED`. This is how the existential-reduction probe confined its own `emptyED` (`perf-probes/existential-reduction/REPORT.md`, decisions, item 2), and how the brief confines (i).
   - The alternative is to read the bounds in every reduction. I measured it as the variant `global` (section 3): no further move on this library. It reaches specificity and the Return Type Rule, so it would need its own tests.
2. **(ii) reads the bounds in the constraint generator, not in the solver.** A parameter at the top of the body is read as its bounds, in one more conjunct.
   - Alternatives: teach `Formula`'s unifier to derive equalities from an upper bound and a non-exclusion constraint, the paper's `unify` over its full constraint language (larger, in a file that every inference uses). Or meet each parameter with its bounds in place (`X & B`), which crashes (section 8).
   - Soundness: each instance of `X` lies below `B`, so the conjunct only weakens what the meet's being nonempty already implies.
3. **(ii)'s emptiness is decided disjunct by disjunct.** Each disjunct uses only the equalities that the unifier takes from it, which that disjunct implies.
   - `reduceED`'s path takes the first unifiable disjunct of an `Or` (`Formula.scala:793-798`), which is not implied by the whole. So I did not reuse it for an emptiness test.
   - A disjunct whose unification fails, or whose solution breaks a bound, counts as not empty. This choice can only refuse more.
4. **(i) is built from the declaration's own parameters.** It uses `FunctionalMethod.ast`, by the same steps as the plain arrow (the trait's replacer and the own parameters' renaming), only where they differ from `parameters()`, that is, only for a self type read from the F-bound. A self type from a `comprises` clause is left as it is.
5. **I ran the full check alone twice** (`full`, `full2`), though the brief takes the earlier report's numbers as the starting values. The site comparison needs a site list, and the earlier one was not on disk. The totals match that report's 191.
6. **The probes use the word operator `PLUS`,** as the earlier probe's did, so that they read the same with and without the full check.
7. **I ran the compiled tests three times** (no shadow, the full check alone, the full check with both shadows), so that a change could be laid to the full check or to the shadows. None changed.

## 10. For FACTS

- **The fact.** With the full symbolic-operator check on, the compiled checker refuses the 8 pairs between `AdditiveGroup`'s `+`/`-` and the generic array-and-scalar block only for two gaps of its exclusion test. Reading a self-typed trait's `self` as `C[\X\] & X` in that test, and the static parameters' bounds in its reduction's constraint, clears all 8 and moves no other site of the distance stage (191 to 183) or of the count stage (102 to 98). The self type alone clears none of the 8; the bounds alone clear the four scalar-on-the-left pairs.
- **What it means for the work.** P-157's stated reason, that the two cannot both pass "while it reads a self-typed trait's `self` in a signature as the plain trait type", holds of the checker as built. A checker change that keeps the signatures plain for specificity and the Return Type Rule removes it with no library line. That checker change would also need (ii); (i) alone does not suffice.
- **The number.** 8: the distance stage's `#class L1` row under the full check.
- **The command and its output.** `explorations/perf-probes/self-type-exclusion/run.sh <out> <scratch> selfexc bounds` gives `#total 183`; with no word, `#total 191`.
- **The detail.** Sections 3 to 5 of this note.

## 11. Commands worked out

- `shadow.py <tree> <out-dir> [selfexc] [bounds] [global] [keepvar]`: writes the full-check shadow (with `catch`) and this probe's shadows from the tracked sources. Each edit must match once.
- `run.sh <out> <scratch> [words]`: the distance stage with those shadows.
- `count.sh <out> <scratch> plain|full [words]`: the count stage with them. Its one changed line of `checker-count/run.sh` puts `$EXTRA_CP` first on the class path.
- `tests.sh <scratch> plain|full [words] -- <tests>`: compiled `.test` files in one JVM, with the shadow classes first and a private copy of the caches.
- `sites.py <errors.tsv> <errors.tsv> [<run.txt> <run.txt>]`: the site-by-site comparison of two distance runs, renamed variables masked, and of their caught crashes.
- `-Dprobe.excdebug=true` on a shadowed checker's JVM prints each meet that (ii) decides, with its constraint.

## 12. Questions for the curator (decisions not taken)

1. **P-157: withdraw it, or land it.**
   - The way that this probe measures is a checker rung that builds (i) and (ii) in the exclusion test: `Vector` and `Matrix` stay `AdditiveGroup`s, and the scalar block stays. It reads anew P-146's sentence "The method signatures keep the plain trait type" for the exclusion test only. It needs the extender rule that P-146 already builds, and it leaves specificity and the Return Type Rule as P-146 has them.
   - The alternative, A2 as P-157 decides, gives the same 183 with 6 library lines, and gives up `SUM` and `zero` over vectors.
   - Default: withdraw P-157 and brief the checker rung. It clears the same 8, brings nothing on the library, the count stage or the 35 tests, keeps the team's `Vector` and `Matrix`, and touches no library, walk or model line.
2. **The form of (ii) in that rung.**
   - In the exclusion test only, as measured, or in every existential reduction (`global`).
   - Default: the exclusion test only. It is narrower, the library shows no difference, and the global form reaches specificity and the Return Type Rule untested.
3. **Row 786's `tint`.**
   - It stays refused under (ii). Accepting it needs a further rule: an existential whose parameter's merged bounds exclude each other has no instance, so `Bottom` is not taken as a static argument.
   - Default: keep the refusal, as row 786 records P-26 pointing to it, and leave the row `CONTESTED`.
4. **The solver's recursion (section 8).**
   - File the drafted row now, or only if the rung's form of (ii) meets it.
   - Default: file it now. It is the checker's own termination gap, and a rung that reads bounds by meeting a parameter with them in place would meet it.
