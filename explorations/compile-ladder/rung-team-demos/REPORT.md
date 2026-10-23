<!-- Climb batch 21b, run 2, rung D (rung-team-demos): the team demos running under walk (P-79), with the demos probe's repairs, Generator22D's rects halving by DIV and its walk test, the api file GenomeUtil2d.fsi, and trips.fss's generator ordered as itself (row 710); worktree /home/user/fortress-teamdemos, branch wip/rung-team-demos, base aa5c67d48. -->

# Rung D: the team demos running (P-79)

- problem: rows 468 (`explorations/fortress-gap-ledger.md:602`) and 710 (`:298`), and the demos probe's base run, in which 30 of the 52 programs of the team's `DemoTests` reach their end under walk and 22 stop: `explorations/perf-probes/team-demos/REPORT.md:60-90`
- spec: the demos are the team's programs, and no passage names them (`grep -rln -i "ProjectFortress/demos\|team demo" Specification Documentation` prints nothing). For `rects`: "When the operator / is used to divide one integer by another, the result is rational. The operator ÷ performs truncating integer division", subsection "Multiplication, Division, Modulo, and Remainder Operators", `Specification/basic/operators/opr-overview.tex:125-128`. For row 710: a declaration that extends an instantiation of a self-typed trait "must be a subtype of the static argument of that instantiation for the self-type parameter", `Specification/basic/traits.tex:306-312`
- precedent: the probe's repairs, `explorations/perf-probes/team-demos/demos-repairs.patch:1-454`; the library's halving `n DIV 2`, `Library/FortressLibrary.fss:4389`; for row 710, the demo's own `trip` ordered at itself, `ProjectFortress/demos/trips.fss:50-51`
- deviation: none from the probe's patch, which applies as it stands; the one line beyond it is fork 27's repair of row 710, `ProjectFortress/demos/trips.fss:96`
- historical: all 23 files are in the team's last commit, a874948ac; the lines are those at aa5c67d48: `Library/Generator22D.fss:144-145`, `:150`; under `ProjectFortress/demos/`: `ArrayListLong.fss:159`, `BiCGSTAB.fss:177`, `BiCGSTAB2.fss:163`, `BirdCount1m.fss:28`, `BirdCount1n.fss:27`, `BirdCount1o.fss:27`, `DemoGenerator22D.fss:67`, `GenomeUtil1z.fss:68`, `GenomeUtil2a.fss:74`, `HeapShakedown.fss:108`, `:170`, `Integrate2.fss:48`, `IntegrationStats.fss:90-91`, `PureListLong.fss:153`, `SatEx.fss:18`, `:22`, `Satisfiability.fss:89`, `aStar.fss:38`, `:40`, `:59`, `:63`, `:342-345`, `buffons.fss:24`, `:46`, `mg.fss:20`, `:159`, `:167`, `npbft.fss:31`, `:36`, `trips.fss:67-68`, `:98`, `wordcount.fss:84`, `ProjectFortress/demos/wordcount2.fss:75`, `:106`

## 1. What changed and why

Commit `3cd33d0b0` on `wip/rung-team-demos` holds the test and the repairs together.

**Generator22D's `rects` (row 468).** `rectsImpl` counted an array's row and column ranges as `(s0 (s0+1))/2` and `(s1 (s1+1))/2`, and its local `ss(n)` as `((n-1) n) / 2` (`Library/Generator22D.fss:144`, `:145`, `:150` at aa5c67d48). On two `ZZ32`s, `/` answers a rational. So `array[\Generator[\E\]\](ss0, ss1)` at `:146` found no overload. The three sites now halve with `DIV`. Each halved product, `s (s+1)` or `(n-1) n`, is even, so `DIV` gives the exact count.

These were the file's only `/` sites on integers. `git show aa5c67d48:Library/Generator22D.fss | grep -n "/" | grep -v "=/=\|(\*\|\*)\|/|\||\\\\"` prints the two licence lines, then `:144`, `:145` and `:150`. After the fix it prints no code line.

**The demos (P-79).** `git apply explorations/perf-probes/team-demos/demos-repairs.patch` applies to the base as it stands. Every repair is the probe's (its section 3.1):

| demo | repair |
|---|---|
| BiCGSTAB, BiCGSTAB2 | `ss = asFloat(t) / 1000000000.0` (`BiCGSTAB.fss:177`, `BiCGSTAB2.fss:163`), row 791's |
| ArrayListLong, PureListLong | `(asFloat(ms)/1000.0)` (`ArrayListLong.fss:159`, `PureListLong.fss:153`) |
| Integrate2 | `asFloat(final - init) / (10.0^9)` (`:48`) |
| IntegrationStats | `elapsedSec(init:ZZ64, final:ZZ64): RR64 = asFloat(final - init) / (10.0^9)` (`:90-91`) |
| SatEx | `asFloat(fin-start)` and `asFloat(fin'-start')` (`:18`, `:22`) |
| buffons | `time = nanoTime()` (`:24`), `asFloat(nanoTime() - time) / 1000000000.0` (`:46`) |
| wordcount | `(asFloat(f-s)/10.0^6)` (`:84`) |
| wordcount2 | `embiggen[\WordState\](...)` (`:75`), `asFloat(f-s)` (`:106`) |
| BirdCount1m, 1n, 1o | `asFloat((SUM[...] ...)/(10^(\|frac\|)))` (`BirdCount1m.fss:28`; `1n` and `1o`, `:27`) |
| HeapShakedown | `asFloat((fin-start) / 10^6)` (`:108`), row 449's; `<\|[\RR64\] 1.0 s, s lg s \|>` (`:170`) |
| DemoGenerator22D | `ss = asFloat(t) / 1000000000.0` (`:67`), beside row 468's library fix |
| BirdCount1z, BirdCount2a | `nextRange(): ()` removed from `trait ReadList` (`GenomeUtil1z.fss:68`, `GenomeUtil2a.fss:74` at aa5c67d48), row 670 |
| npbft | `asFloat(last) / base` (`:31`); `object Complex(r:RR64, i:RR64) extends AdditiveGroup[\Complex\]` (`:36`), row 670 |
| trips | the demo's own `opr MIN` and `opr MAX` on `ZZ32` removed (`:67-68` at aa5c67d48) |
| mg | `typecase I of (ZZ32, ZZ32, ZZ32) -> RR64 => ....tabulate(I) else => ....fill(I) end` (`:20-23`), row 464's; `asFloat(...)` in the two timing lines (`:162`, `:170`) |
| aStar | the static parameter `Self` renamed `Inst` (`:38`, `:40`, `:59`, `:63`); `asFloat(i)` in `NanoInterval`'s four getters (`:342-345`) |
| BirdCount2d | the new `ProjectFortress/demos/GenomeUtil2d.fsi` |
| SatEx, given a query | `<\|[\List[\ZZ32\]\] ...\|>` in `Satisfiability.fss:89` |

**`GenomeUtil2d.fsi` (fork 24).** `BirdCount2d.fss:17` imports the api `GenomeUtil2d`. Its component `GenomeUtil2d.fss` is in the tree, but no commit ever added its api file.

The new file is the team's `GenomeUtil2c.fsi` with its `api` line renamed: `diff ProjectFortress/demos/GenomeUtil2c.fsi ProjectFortress/demos/GenomeUtil2d.fsi` prints only `13c13 < api GenomeUtil2c --- > api GenomeUtil2d`. Likewise, `GenomeUtil2d.fss` is `GenomeUtil2c.fss` with comments added and its own name.

**Row 710 (fork 27).** `trips.fss`'s `object generator(doc:String, max:ZZ32, fun:ZZ32->List[\trip\])` extended `StandardTotalOrder[\trip\]`, though a `generator` is no `trip`. Its own `opr CMP(self, other:generator)` orders generators by their `doc` (`trips.fss:97-100` at aa5c67d48).

It now extends `StandardTotalOrder[\generator\]` (`trips.fss:96`), as the demo's `trip` extends `StandardTotalOrder[\trip\]` (`:50-51`).

## 2. The test: failing on the base, passing after

`ProjectFortress/tests/Generator22DRects.fss` builds a 2 by 3 array whose cell `(i, j)` holds `2^(3 i + j)`, so the sum of a rectangle names its cells. It asserts that `rects` gives 18 rectangles (3 row ranges times 6 column ranges), and each of the 18 cell masks once.

The failing run, from 21:03:07 to 21:03:18 UTC, was on the base's code: the tree at aa5c67d48 with only the test added, before the library edit.

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-team-demos/h1 ProjectFortress/tests/Generator22DRects.fss

    # harness-one 2026-10-23T21:03:07Z; tree aa5c67d48; nproc=4; load 1.81 1.35 2.24; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    com.sun.fortress.exceptions.ProgramError: com.sun.fortress.exceptions.ProgramError: Library/Generator22D.fss:146:9-40:
    Failed to find any matching overload, args = (Ratio,Ratio), overload = {
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

The passing run is the same command on the tree at `3cd33d0b0`, after the last change of code and after the demo runs:

    # harness-one 2026-10-23T21:42:30Z; tree 3cd33d0b0; nproc=4; load 1.02 1.53 2.34; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled
    OK (1 test)

Before the failing run, the test's program also ran in a scratch folder, beside a scratch copy of `Generator22D.fss` with the fix, and printed 'PASS'. The 18 sums it gives there are `<|1, 3, 7, 2, 6, 4, 9, 27, 63, 18, 54, 36, 8, 24, 56, 16, 48, 32|>`.

## 3. The 52 demos under walk, before and after

**The set.** The 52 programs of `DemoTests` are every `.fss` file of `ProjectFortress/demos/` except `Syntax`, `DynamicSemantics`, `Satisfiability` and the seven `GenomeUtil*` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:934-935`).

**How they ran.** All ran on the final tree (`3cd33d0b0`), one at a time, as the probe ran them (its section 1):

- from `ProjectFortress/demos`, as `timeout -k 15 600 ../../bin/fortress X.fss < /dev/null`;
- `wordcount2` from the tree's root;
- `tennisRanking` with the three files of `FileTests.java:806-815`.

**The criterion.** A demo reaches its end if it exits 0 and its output holds no "fail" in any case (`grep -qi fail`). This is stricter than the case-sensitive `fail` and `FAIL` of `FileTests.java:382-385`. The driver's text is in section 13.

    demos: 52 run, 52 reached their end

None reached the 600 s limit. The before is the probe's base run at 23878af0e (its section 2), which was not run again. Times are masked as `…` in the lines quoted below.

| demo | before (the probe's base run) | after (this tree) |
|---|---|---|
| ArrayListLong | stops, `ArrayListLong.fss:159`, 'args = (17923: ZZ64,1000.0)' | end, 'Succeeded in …s' |
| BiCGSTAB | stops, `BiCGSTAB.fss:177`, row 791 | end, 29 residuals, then 'elapsed time … ns ( … s)' |
| BiCGSTAB2 | stops, `BiCGSTAB2.fss:163`, row 791 | end, the same |
| BirdCount1m, 1n, 1o | stop in `stringToFloat`, 'args = (1.0,Ratio)' | end, their tables |
| BirdCount1p, 1q, 1r, 1s, 1t, 1u, 1v, 1w, 1y | end | end |
| BirdCount1z | refused at load, 'Object FileBasedReadList does not define an abstract method declared in type ReadList', row 670 | end |
| BirdCount2a | refused at load, the same, row 670 | end, 'Merged Events:' |
| BirdCount2b, 2c | end | end |
| BirdCount2d | stops at load, 'Could not find an implementation for API GenomeUtil2d' | end; its output equals `BirdCount2c`'s, 1,072 lines (`diff` prints nothing) |
| Cfa | end | end |
| DemoGenerator22D | stops, `Library/Generator22D.fss:146`, 'args = (Ratio,Ratio)', row 468 | end, '(the answer is 3)' at 4 by 4 and '(the answer is 20)' at 8 by 8, of its random arrays |
| FeatherweightJava, Generator2Demo | end | end |
| HeapShakedown | stops, `HeapShakedown.fss:128`, 'Type of expression, Ratio, not a subtype of RR64.', row 449 | end, its tables |
| Integrate2 | stops, `Integrate2.fss:48`, 'args = (…: ZZ64,1.0E9:RR64)' | end, its 'Time(s) Area' table |
| IntegrationStats | stops, `:100`, 'Closure/Constructor for elapsedSec param 1 (init:RR64) got arg …: ZZ64' | end, 'Done' |
| Lambda, LogFib | end | end |
| PureListLong | stops, `PureListLong.fss:153`, 'args = (22479: ZZ64,1000.0)' | end, 'Succeeded in …s' |
| SatEx | stops, `SatEx.fss:18`, 'args = (…: ZZ64,1.0E9:RR64)' | end, 's SATISFIABLE' |
| Words | end | end |
| aStar | stops at parse, `aStar.fss:38:28`, 'Syntax Error' | end, 'Final result:' |
| buffons | stops, `buffons.fss:24`, 'RHS expression type Long is not assignable to LHS type RR64' | end, 'Buffons: estimated Pi = 3.1144211238997968 took time …' |
| conjGrad, fact64, lutx | end | end |
| mg | stops, `mg.fss:20`, 'Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr', row 464 | end, 'L2 Norm is 0.0' |
| mm, mm64, mm64x, newtictactoe | end | end |
| npbft | refused at load, 'Object Complex does not define an abstract method declared in type Number', row 670 | end, 'Checksum 1 : 570.4182371381474+385.43365014877793i' |
| posFeedback, prebuffons, sudoku, tennisRanking, tictactoe | end | end |
| trips | stops at `trips.fss:266:59`, 'Overloading of MAX(...) ... and MAX(a:ZZ32,b:ZZ32) ... fails because their parameter lists have the same types' | end, 'The 16 trips under 100 in canonical order:' |
| turnersParaffins0 | end | end, '===== Enumeration and counting paraffins & radicals completed. =====' |
| wordcount | stops, `wordcount.fss:84`, 'args = (…: ZZ64,1000000.0:RR64)' | end, 'Total run in …ms' |
| wordcount2 (from the root) | stops, `Library/FortressLibrary.fss:1376`, 'CastError' | end, '<\|The\|>: 1104 times' among its counts |

`tennisRanking` writes its second argument, `ProjectFortress/demos/tennis051707`, which is neither tracked nor ignored. It was moved into the scratch folder after the run and is not committed.

So the batch's first run (rungs S, B, X and N, landed at `c53063bbd`) broke no demo. On its landed tree with the probe's patch, every demo reaches its end. The planner found the same on the first run's text as first drafted (`explorations/coordinator/CLIMB-BATCH-21.md:511-516`).

## 4. Row 710: the checker's driver on `trips.fss`, before and after

This is row 710's reproducer: the distance stage's driver over the demo alone. The stage's shadow classes were made from the tracked sources by `shadow-patch.py` and `add-patch.py`. Then `java ... -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false -cp <shadow-classes>:<classes>:<fortress classpath> DistanceMulti -order check -setting any ProjectFortress/demos/trips.fss` ran (section 13).

Before, on the base's `trips.fss`:

    @@SC STAGE	component trips	acyclic	errors=1
    @@SC ERR	component trips	acyclic	.../ProjectFortress/demos/trips.fss:98:13-38:     generator extends StandardTotalOrder[\trip\], whose self parameter is trip, but generator is not a subtype of trip.
    @@SC STAGE	component trips	typecheck	errors=18
    @@TC COMPONENT	trips	errors=57

After, on the final `trips.fss`:

    @@SC STAGE	component trips	acyclic	errors=0
    @@SC STAGE	component trips	typecheck	errors=18
    @@TC COMPONENT	trips	errors=54

With the positions masked, the two runs differ in three things only: row 710's message, the two `MIN` and `MAX` declarations that the patch removes (each `errors=0` before), and the component's total.

The driver still refuses the demo:

- 18 typecheck errors:
  - seven `generator` calls whose function it types `ZZ32->List.List[\Any\]`: '(String, ZZ32, ZZ32->List.List[\trip\])->generator is not applicable to an argument of type (String, IntLiteral, ZZ32->List.List[\Any\])' (`:113`, `:130`, `:139`, `:146`, `:153`, `:199`, `:216`);
  - eight `__generate` calls at `Reduction[\List.List[\Any\]\]`;
  - `seq` of a `Range[\ZZ32\]` (`:303`);
  - `perfectSqrt`'s body, typed `AnyMaybe` (`:82`);
  - 'Cannot assign to immutable variable: approx' (`:76`);
- 'Missing parameter type for' `trips`, `xs` and `ps` (`:232`, `:255`, `:263`);
- 'TryChecker returned an untyped expr' at `run`'s comprehension (`:286`);
- in the overloading stage, which the driver runs whatever came before, an `OptionUnwrapException` at `OverloadingChecker.scala:129`.

These are NEW-D-1 (section 12). Walk runs the demo to its end (section 3).

## 5. Where the fix belongs, and the precedent search

- **Generator22D is walk's library**, in `Library/` outside the compiler's files, and no other program imports it. `grep -rln "Generator22D" Library ProjectFortress/LibraryBuiltin ProjectFortress/tests ProjectFortress/*_tests ProjectFortress/test_library ProjectFortress/demos explorations --include=*.fs?` lists `Library/Generator22D.fsi`, `Library/Generator22D.fss`, the new test and `ProjectFortress/demos/DemoGenerator22D.fss`. The fix is in its body. Its api (`Library/Generator22D.fsi`) is unchanged.
- **The library halves an integer with `DIV`:**
  - `Library/FortressLibrary.fss:4389` (`(self || self)^(n DIV 2)`);
  - `Library/CompilerLibrary.fss:364`, `:378`, `:388`, `:396` (`z DIV 2`);
  - `Integral`'s `opr DIV(self,b:I):I` (`Library/FortressLibrary.fsi:461`).

  In `Generator22D.fss` the precedent's defect had three sites. All three are repaired, and no other remains (section 1).
- **The demos' repairs are the probe's**, each in a form that the record or the team's later code uses (the probe's section 6, decision 5). A `ZZ64` or a `QQ` that meets a float goes through `asFloat` (P-74; `Library/FortressLibrary.fsi:289`; `nanoTime(): ZZ64`, `:2546`).

  By grep, 16 demos call `nanoTime()`, 42 calls in all, two of them (`trips.fss:238-239`) inside a comment. Each time feeds a repaired line or integer arithmetic: `trips.fss:234`, `turnersParaffins0.fss:436`, and the `DIV` in `ArrayListLong.fss:158` and `PureListLong.fss:152` before their repaired lines. Every one of the 16 reaches its end.
- **`npbft`'s `Complex`** drops `Number`, whose `comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }` does not list it (`Library/FortressLibrary.fss:380-381`). It extends `AdditiveGroup[\Complex\]`, which is `SumReduction`'s bound (`Library/FortressLibrary.fss:3440`).
- **`trips`'s `MIN` and `MAX`** duplicate `ZZ32`'s own (`Library/FortressLibrary.fss:751-752`).
- **Row 710** takes the shape of the demo's own `trip`: `object trip (...) extends StandardTotalOrder[\trip\]` with `opr CMP(self, other:trip)` (`trips.fss:50-54`).
- **The maps place nothing here.** `explorations/coordinator/map/spec-to-implementation.md` and `modules-and-phases.md` concern phase, checker and walk code, and none of it changes.

## 6. What the specification settles

- `/` on two integers is rational, and `÷` (`DIV`) truncates (`Specification/basic/operators/opr-overview.tex:125-128`). So `rects`'s counts are `DIV`'s.
- A declaration that extends a self-typed trait's instantiation must be a subtype of its self-type argument (`Specification/basic/traits.tex:306-312`). `StandardTotalOrder[\generator\]` meets this rule.
- Nothing in the specification names a demo or `Generator22D`. This rung edits no specification text.

## 7. The stages, the suites and the ladder

- **Neither stage ran.** The rung changes these paths:
  - `Library/Generator22D.fss`;
  - 22 files and the new `GenomeUtil2d.fsi` under `ProjectFortress/demos/`;
  - `ProjectFortress/tests/Generator22DRects.fss`;
  - this folder.

  `Library/Generator22D.fss` and the demos are not among the twelve components that the distance stage reads (`explorations/coordinator/tools/distance/run.sh:85-87`). The count stage reads `Library/FortressLibrary.fss` (`explorations/coordinator/tools/checker-count/run.sh:67`), which imports neither. So neither stage can move.
- **No speed pass.** No checker code changes.
- **No whole suite.** The rung changes no Java or Scala. Its own test ran (section 2), and the gate runs the suites.
- **The ladder subset is empty.** No ladder program's recorded output names anything the rung touched: `grep -rlE "Generator22D|GenomeUtil|demos/|trips|npbft" explorations/compile-ladder/baseline-2026-09-19/raw explorations/compile-ladder/baseline-2026-09-19/ladder.tsv explorations/compile-ladder/climb-batch-21/gate/ladder/ladder.tsv` prints nothing (rc 1). The compiled path's library does not hold `Generator22D`.

## 8. Old against new

- `Generator22DRects` through the harness: on the base's code, 'Failed to find any matching overload, args = (Ratio,Ratio)' at `Library/Generator22D.fss:146`; on the final tree, 'OK (1 test)' (section 2).
- The checker's driver over `trips.fss`: the base's demo shows row 710's message, and the final one does not (section 4).
- The demos: the before is the probe's base run (section 3), as the brief asks. It was not run again.

## 9. Sentences of the specification made false

None. No `\revision`, `\note{}` or Appendix I effect names a demo, `Generator22D` or `rects`.

- `grep -rn -i "demo\|Generator22D\|rects\b\|trips" Specification/appendices/changes.tex` matches only the word "directs", whose end matches `rects\b` (lines 1171 to 2316).
- `grep -rln -i "ProjectFortress/demos\|team demo" Specification Documentation` prints nothing.

## 10. Points to report

1. **Each demo's line before and after.** Section 3's table gives them. All 52 reach their end within the limit. The 22 that stopped on the probe's base run now reach it, and the 30 that reached it still do. Evidence: section 3, 'demos: 52 run, 52 reached their end'.
2. **Each repair that departs from the probe's:** none. The patch applies as it stands: `git apply --check explorations/perf-probes/team-demos/demos-repairs.patch` accepted it on aa5c67d48. The one line beyond it is row 710's, `trips.fss:96`, fork 27's default.
3. **GenomeUtil2d.fsi, a new file in the team's folder:** `ProjectFortress/demos/GenomeUtil2d.fsi:1-50`. It is the team's `GenomeUtil2c.fsi` with `api GenomeUtil2d` at `:13`, and its copyright header is kept as the team wrote it in `GenomeUtil2c.fsi`.
4. **Row 710's repair, and the checker's driver on `trips.fss` before and after:** the repair is `ProjectFortress/demos/trips.fss:96`.
   - Before: 'acyclic errors=1' with row 710's message, and 'trips errors=57'.
   - After: 'acyclic errors=0' and 'trips errors=54'. The 18 typecheck errors are unchanged (section 4; NEW-D-1).
5. **Any demo that the batch's first run broke:** none (section 3).
6. **A file edited beyond those named:** none. The files are:
   - the 22 files of the patch, among them `trips.fss`, which also holds the generator line;
   - `GenomeUtil2d.fsi`;
   - `Library/Generator22D.fss` (`:144`, `:145`, `:150`);
   - the test;
   - this folder's `REPORT.md` and `record.md`.
7. **Team lines changed** (the batch record's list of points): 22 team demos and `Generator22D`'s `rectsImpl` (section 1).

## 11. Decisions, each with the ways not taken

1. **The test names each rectangle by a weighted sum.** Cell `(i, j)` holds `2^(3 i + j)`, so each rectangle's `SUM` is the bit mask of its cells. The test asserts 18 sums and each of the 18 masks once. Not taken:
   - comparing `rects xs`'s printed form, which prints each subarray's bounds and layout;
   - asserting the list's order, which would fix the generator's order beyond what `rects` promises (`Library/Generator22D.fsi`, `rects`, declares only the type);
   - asserting only the demo's maximum rectangle sum, which does not say which rectangles came.
2. **The test is a plain walk test in `ProjectFortress/tests/`.** `Generator22D` is walk's library, and the compiled prelude has none of it. The defect is repaired here, so the test needs no `XXX` stage (home 1).
3. **`DIV` for the halving**, row 468's fix and the library's way (section 5). Not taken:
   - the floor of the rational, `|\(s0 (s0+1))/2/|`, which answers a `ZZ` and needs a `narrow`;
   - `RSHIFT 1`, which the library does not use for a count;
   - `narrow` of an `RR64` quotient.
4. **The probe's patch as it stands**, every repair its own (fork 23). No demo needed another repair (section 3).
5. **Row 710: `StandardTotalOrder[\generator\]`** (fork 27), the order that the object's own `CMP` defines. Not taken:
   - removing the `extends` clause, which leaves `CMP` with no order trait to answer `<`;
   - renaming the object.
6. **The driver over `trips.fss` alone,** with every api stage (`-Dprobe.all=true`), as row 710's reproducer runs it, but without the three library targets that rung S's run put beside it. The self-type error is in the demo's own acyclic stage, which a run on the demo alone reaches. Not taken: the full distance stage, which does not read the demos.
7. **One new row for the checker's other refusals of `trips.fss`:** NEW-D-1, `NEGATIVE-BOUNDED`. Fork 25 gives no rows for the demo defects that the rung repairs, and the rung does not repair these. Not taken:
   - one row per kind, before a probe of the checker over each demo has sorted the demos' defects from the checker's (PLAN, phase 3, item 19's demos line);
   - no row, which would leave row 710's close reading as though the checker took the demo.
8. **The demo driver is the probe's procedure written out** (section 13). It uses `grep -qi fail` over the output, which is stricter than the team's case-sensitive check, and gives `tennisRanking` its three files as absolute paths, as `FileTests.java:806-815` passes them. The file that `tennisRanking` writes was moved to scratch.
9. **No timing is reported.** The demos' timing lines are quoted with their times masked, by the skill's rule and the batch record's 87eb95047.
10. **Revival change:** `Generator22D`'s `rects`, a library body that differs from the team's. The demos are the team's programs, not one of the sources that section covers (record.md).

## 12. Defects, with their homes

| defect | home | where |
|---|---|---|
| row 468, `rects` halving with `/` | 1, repaired | `Library/Generator22D.fss:144`, `:145`, `:150`; `Generator22DRects` |
| row 791, the BiCGSTAB timing lines | repaired, closed by the demo runs | `BiCGSTAB.fss:177`, `BiCGSTAB2.fss:163` |
| row 670, three demos refused at load | repaired, closed by the demo runs | `GenomeUtil1z.fss`, `GenomeUtil2a.fss` (`nextRange` removed), `npbft.fss:36` |
| row 449, HeapShakedown's quotient | repaired, closed by the demo runs | `HeapShakedown.fss:108` |
| row 464, mg's `fill` | repaired, closed by the demo runs | `mg.fss:20-23` |
| row 710, trips' generator | repaired, closed by the driver run | `trips.fss:96` |
| the probe's drafts A to I | repaired; the drafts stay in the probe's report (fork 25) | section 1's table |
| NEW-D-1, the checker's other refusals of `trips.fss` | 3, a ledger row only: no gated test reads the demo under the checker | `ProjectFortress/demos/trips.fss` |

No gated test reads the demos: `DemoTests` is in no suite. So rows 791, 670, 449, 464 and 710 close with `--test none`, and the runs as their note (record.md).

## 13. Commands worked out

**The demo driver.** It runs from the tree's root, after the setup lines, as `run-demos.sh <out-dir>`:

    set -u
    FH=$PWD ; OUT=$1 ; case "$OUT" in /*) ;; *) OUT="$FH/$OUT" ;; esac ; mkdir -p "$OUT"
    cd "$FH/ProjectFortress/demos"
    LIST=$(ls *.fss | grep -v -E 'Syntax\.fss$|DynamicSemantics\.fss$|Satisfiability\.fss$|GenomeUtil')
    : > "$OUT/summary.tsv"
    for f in $LIST ; do
      n=${f%.fss}
      case "$n" in
        wordcount2) ( cd "$FH" && timeout -k 15 600 bin/fortress ProjectFortress/demos/$f < /dev/null ) > "$OUT/$n.txt" 2>&1 ; rc=$? ;;
        tennisRanking) timeout -k 15 600 ../../bin/fortress $f "$FH/ProjectFortress/demos/tennis050307" "$FH/ProjectFortress/demos/tennis051707" "$FH/ProjectFortress/demos/tennisGames" < /dev/null > "$OUT/$n.txt" 2>&1 ; rc=$? ;;
        *) timeout -k 15 600 ../../bin/fortress $f < /dev/null > "$OUT/$n.txt" 2>&1 ; rc=$? ;;
      esac
      if grep -qi fail "$OUT/$n.txt" ; then fl=fail-in-output ; else fl=clean ; fi
      if [ $rc -eq 0 ] && [ $fl = clean ] ; then v=END ; elif [ $rc -eq 124 ] || [ $rc -eq 137 ] ; then v=LIMIT ; else v=STOP ; fi
      printf '%s\t%s\trc=%s\t%s\t%s\n' "$n" "$v" "$rc" "$fl" "$(grep -v '^ *$' "$OUT/$n.txt" | tail -1 | cut -c1-160)" >> "$OUT/summary.tsv"
    done
    echo "demos: $(grep -c . "$OUT/summary.tsv") run, $(awk -F'\t' '$2=="END"' "$OUT/summary.tsv" | wc -l) reached their end"

**The checker's driver over one demo.** It runs from the tree's root, as steps 1 and 2 of `explorations/coordinator/tools/distance/run.sh` with the one target:

1. Make `$S/shadow-src` with `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress $S/shadow-src && python3 explorations/coordinator/tools/distance/add-patch.py $S/shadow-src`.
2. Compile the seven shadow sources and `DistanceMulti.java`, as `run.sh:102-112` does.
3. Run the driver:

       java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Djava.io.tmpdir=$S/tmp -Dfortress.caches=$S/caches \
            -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false \
            -cp $S/shadow-classes:$S/classes:$CP DistanceMulti -order check -setting any ProjectFortress/demos/trips.fss

`CP` is the class path that `run.sh` makes from `bin/fortress_classpath`. The driver's own line reported 53 s for the target before the repair, under `nice -n 19`, nproc 4.
