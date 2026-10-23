# Rung D, rung-team-demos: the record

Climb batch 21b, run 2. Branch `wip/rung-team-demos`, commit `3cd33d0b0` (the test, the library fix and the demo repairs), base aa5c67d48. Detail: `explorations/compile-ladder/rung-team-demos/REPORT.md`.

## Findings

1. **All 52 programs of the team's `DemoTests` reach their end under walk, on the tree after climb batch 21's first run, with the demos probe's repairs.**
   - Claim: the probe's `demos-repairs.patch` applies to `main` as it stands. With it, with row 710's line and with `GenomeUtil2d.fsi` added, every one of the 52 exits 0 and prints no "fail". On the probe's base run, 30 reached their end and 22 stopped.
   - Conditions:
     - walk, `FORTRESS_THREADS=1`, `JAVA_FLAGS="-Xmx4g -Xss64m"`;
     - each demo run alone from `ProjectFortress/demos` under `timeout -k 15 600` with an empty standard input;
     - `wordcount2` run from the tree's root, and `tennisRanking` given `FileTests.java:806-815`'s three files.

     `SatEx`, `tictactoe` and `newtictactoe` get the empty input that the team's test gives them.
   - Evidence: 'demos: 52 run, 52 reached their end' on `3cd33d0b0` (REPORT.md section 3, with each demo's line before and after). The driver's text is in REPORT.md section 13. `BirdCount2d`'s output equals `BirdCount2c`'s, 1,072 lines.
   - Meaning: rows 791, 670, 449 and 464 are fixed. P-79's known walk failures are respelled. The first run's rungs S, B, X and N broke no demo.

2. **Under walk, `Generator22D`'s `rects` gives every contiguous rectangle of an `Array2` once.**
   - Claim: `rectsImpl` counts an array's row and column ranges with `DIV` (`Library/Generator22D.fss:144`, `:145`, `:150`). Before, it counted them with `/`, whose rational result made `array[\Generator[\E\]\](ss0, ss1)` find no overload (`:146`).
   - Conditions: walk. The compiled prelude has no `Generator22D`.
   - Evidence: `Generator22DRects` through `harness-one.sh`. On the base: 'Library/Generator22D.fss:146:9-40: Failed to find any matching overload, args = (Ratio,Ratio)', 'FAILURES!!!', 'Tests run: 1,  Failures: 1,  Errors: 0'. On `3cd33d0b0`: 'OK (1 test)'.
   - Meaning: row 468 closes with its test. `DemoGenerator22D` runs.

3. **Row 710's refusal is gone, but the compiled checker still refuses `trips.fss` (NEW-D-1).**
   - Claim: `trips.fss`'s `generator` extends `StandardTotalOrder[\generator\]` (`ProjectFortress/demos/trips.fss:96`). The distance stage's driver over the demo then reports no self-type error. It still reports:
     - 18 typecheck errors;
     - 'Missing parameter type for' three functions;
     - a 'TryChecker returned an untyped expr' bug;
     - an `OptionUnwrapException` in the overloading stage, which the driver runs whatever came before.
   - Conditions: `DistanceMulti -order check -setting any ProjectFortress/demos/trips.fss`, with `-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false` and the stage's shadow classes made from the tracked sources.
   - Evidence: before, '@@SC STAGE component trips acyclic errors=1', with 'trips.fss:98:13-38: generator extends StandardTotalOrder[\trip\], whose self parameter is trip, but generator is not a subtype of trip.', and '@@TC COMPONENT trips errors=57'. After, 'acyclic errors=0', 'typecheck errors=18' and 'trips errors=54'. With the positions masked, the only message that differs is row 710's (REPORT.md section 4).
   - Meaning: row 710 closes. The checker's acceptance of the demo waits on NEW-D-1, and on the probe of the checker's driver over each demo (PLAN, phase 3, item 19's demos line).

4. **Neither stage reads what the rung changes.**
   - Claim: `Library/Generator22D.fss` and the demos are outside the distance stage's twelve components (`explorations/coordinator/tools/distance/run.sh:85-87`) and the count stage's target (`explorations/coordinator/tools/checker-count/run.sh:67`).
   - Conditions: the rung's paths, `git diff --name-only aa5c67d48 3cd33d0b0`: `Library/Generator22D.fss`, `ProjectFortress/demos/` (22 files and `GenomeUtil2d.fsi`) and `ProjectFortress/tests/Generator22DRects.fss`.
   - Evidence: neither stage ran. The ladder subset is empty: `grep -rlE "Generator22D|GenomeUtil|demos/|trips|npbft"` over the baseline's `raw/` and `ladder.tsv` and `climb-batch-21/gate/ladder/ladder.tsv` prints nothing.
   - Meaning: the gate's tables on the merged tree are the record; this rung moves no site.

## For FACTS

**All 52 programs of the team's `DemoTests` reach their end under walk.** Run one at a time from `ProjectFortress/demos`, each exits 0 and prints no "fail". The conditions are a 600 s limit and an empty input, with `wordcount2` from the tree's root and `tennisRanking` given `FileTests.java:806-815`'s three files. The demos run in no suite, so a batch that changes walk or its library runs them again (P-79). No gated test: the command is the driver in `compile-ladder/rung-team-demos/REPORT.md` section 13, and its output is 'demos: 52 run, 52 reached their end'. Detail: the same report, section 3.

**Under walk, `Generator22D`'s `rects` gives every contiguous rectangle of an `Array2` once.** `rectsImpl` counts the row and column ranges with `DIV` (`Library/Generator22D.fss:144`, `:145`, `:150`), since `/` on integers answers a rational (`Specification/basic/operators/opr-overview.tex:125-128`). Test: `Generator22DRects`. Detail: `compile-ladder/rung-team-demos/REPORT.md`, section 2.

## The gap ledger

The closes, after the fix commit (`3cd33d0b0`, its hash after the merge as `H`) is in `HEAD`. No gated test reads the demos, so five rows close with `--test none` and the runs as the note.

    ledger.py close 468 --commit H --test Generator22DRects
    ledger.py close 791 --commit H --test none --note "the demos run in no suite; with asFloat(t) at BiCGSTAB.fss:177 and BiCGSTAB2.fss:163 both run to their end under walk, 29 residuals then the elapsed-time line (compile-ladder/rung-team-demos/REPORT.md section 3)"
    ledger.py close 670 --commit H --test none --note "the demos run in no suite; with nextRange removed from ReadList in GenomeUtil1z.fss and GenomeUtil2a.fss, and npbft's Complex an AdditiveGroup[\Complex\] (npbft.fss:36), BirdCount1z, BirdCount2a and npbft load and run to their end under walk (compile-ladder/rung-team-demos/REPORT.md section 3)"
    ledger.py close 449 --commit H --test none --note "the demos run in no suite; with asFloat((fin-start) / 10^6) at HeapShakedown.fss:108 and the list at :170 written with its static argument RR64, the demo prints its tables and exits 0 under walk (compile-ladder/rung-team-demos/REPORT.md section 3)"
    ledger.py close 464 --commit H --test none --note "the demos run in no suite; with a typecase on I choosing tabulate or fill (mg.fss:20-23) and asFloat in its two timing lines (:162, :170), mg runs to its end under walk, 'L2 Norm is 0.0' (compile-ladder/rung-team-demos/REPORT.md section 3)"
    ledger.py close 710 --commit H --test none --note "trips.fss:96's generator extends StandardTotalOrder[\generator\]; the distance stage's driver over the demo reports no self-type error (acyclic errors=0); its other refusals are row NEW-D-1 (compile-ladder/rung-team-demos/REPORT.md section 4)"

In row 710's note, NEW-D-1 is to be replaced by the new row's number.

NEW-D-1, for section "3. Traits, objects and components", beside row 710. With a number in its first cell, it passes `ledger.py check --rows`: 1,094 characters, claim 295, notes 631.

| NEW-D-1 | past row 710, the compiled checker's driver still refuses the team demo `trips.fss`, which walk runs: 18 typecheck errors, among them seven `generator` calls whose function it types `ZZ32->List.List[\Any\]` and 'Cannot assign to immutable variable: approx' (`ProjectFortress/demos/trips.fss:76`) | NEGATIVE-BOUNDED | library bug (tests) | `basic/variables.tex`, "Local Variable Declarations" | `ProjectFortress/demos/trips.fss` | climb batch 21b rung D | siblings: 710, 731. `DistanceMulti -order check -setting any ProjectFortress/demos/trips.fss` with the distance stage's shadow classes, after row 710's repair: acyclic 0, typecheck 18 (`generator` at `:113`, `:130`, `:139`, `:146`, `:153`, `:199`, `:216`; eight `__generate` at `Reduction[\List.List[\Any\]\]`; `seq` of a `Range[\ZZ32\]`, `:303`; `perfectSqrt`'s body `AnyMaybe`, `:82`), 'Missing parameter type for' `trips`, `xs`, `ps` (`:232`, `:255`, `:263`), 'TryChecker returned an untyped expr' (`:286`), and an `OptionUnwrapException` in the overloading stage (`OverloadingChecker.scala:129`). Causes not each established. |

No other open row cites a file that the rung edits. `ledger.py find --cites` for each of the 23 edited files lists only rows 468, 791, 670, 449, 464 and 710, and row 427, which is FIXED.

The probe's nine drafted rows stay in `explorations/perf-probes/team-demos/REPORT.md` section 5 (fork 25). The rung repairs every defect they record.

## Handover

Rung D is in on its branch at `3cd33d0b0`. With the demos probe's patch, row 710's line and the new `GenomeUtil2d.fsi`, all 52 team demos of `DemoTests` reach their end under walk on the first run's landed tree. `Generator22D`'s `rects` halves by `DIV`, with its walk test `Generator22DRects`. Rows 791, 670, 449, 464, 468 and 710 close. The checker's other refusals of `trips.fss` are NEW-D-1, open, with the curator's question on item 247's reach. Neither stage ran, no suite ran, and the ladder subset is empty.

## Revival change

### The change

The team's `rectsImpl` counted an array's row and column ranges with `/` (`Library/Generator22D.fss:144-145`, `:150` at a874948ac). In the team's library too, two `ZZ32`s divide to a rational: `ZZ32` extended `ZZ`, whose `opr /(self,other:ZZ):QQ` (`Library/FortressLibrary.fsi:533-534` at a874948ac). So `rects` stopped under walk at `array[\Generator[\E\]\](ss0, ss1)`.

The tree halves with `DIV` (`Library/Generator22D.fss:144`, `:145`, `:150`), and `rects` gives each contiguous rectangle of an `Array2` once. Test: `Generator22DRects`.

Reason: "When the operator / is used to divide one integer by another, the result is rational. The operator ÷ performs truncating integer division" (`Specification/basic/operators/opr-overview.tex:125-128`). The measured failure was 'Failed to find any matching overload, args = (Ratio,Ratio)' at `Library/Generator22D.fss:146`, through the harness on the base.

### Provenance

Row 468, and its stated fix. P-79, the team demos kept running, whose `DemoGenerator22D` needs `rects`. P-27, the library's own practice (`n DIV 2`, `Library/FortressLibrary.fss:4389`). The batch record's fork 23, taken at its default. Climb batch 21b, run 2, rung D.
