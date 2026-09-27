# Rung F (`rung-flat-tower`): the skeptic's judgements

This file holds both judgements. The second, below, comes first. The first judgement, which refused the rung, follows it word for word as committed at `5c6c49fba`. Its numbered sections (0 to 11) are the ones `JUDGE.md` and the report cite. The second judgement's sections are lettered so that those citations keep their meaning.

# The second judgement: approved, with three corrections

**Verdict: approved.** The refusal's one thing is closed.
- Row 424 has its home-2 test, `ProjectFortress/tests/XXXUnwrittenSumRungF.fss`. It fails on the flat library at 1 and 4 threads in my runs, and it was shown red on the base library.
- The first judgement's four further corrections are made.
- The judge gave homes to the rows I recommended in the first judgement, and each now has one: two more `XXX` tests, and home-3 rows with their greps.
- The repair round departs from the judge's instructions in one place. For the three integer `^` sites it recorded a row instead of converting in the body. The specification settles that question in the worker's favour (section E).

Three corrections remain for the commit stage (section L).
- Two are corrections of text, and neither changes code or an assertion's value.
- The third adds nine assertions to the test's identity group, one for each branch of the identity functions the test does not reach. I verified each value at 1 and 4 threads. Section D says why this is a correction on an approval and not a refusal.

Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, cpu MHz 2100.000, openjdk 25.0.4.
- The load average at the start of each run is in the head of its capture, 0.03 to 5.19.
- `FORTRESS_THREADS` is given per run.
- Tree: `wip/rung-flat-tower` at `7b946f599`. The worktree is clean but for this file and my new captures under `probes/skeptic/`.
- The flat library is the worktree's own. The base library is `e5414f5bf`'s 15 edited library files as git-show copies beside each program, which shadow the tree's (`Shell.sourcePath`).
- Every walk run used a fresh private cache.
- The compiled runs used the compiler-prelude cache built in the first judgement (`tmp/sk/ccache`). The rung touches no compiler-prelude file.

## A. The provenance block (check 0)

I opened every file:line in `reportText`'s five lines, ten lines either side.

- **problem.**
  - `probes/checker-count/table-before.txt:14` is `#total 125`.
  - `probes/failure-preedit.txt:8-12` is the first failing line of each of the five groups.
  - `probes/checker-count/diff-before-after.txt:3-8` are the 64 errors the flattening removes: the `comprises` error (`:3`), the 44 hierarchy errors (`:4-7`), and the 19 `RangeInternals` overloading errors (`:8`). The block calls `:3-8` "the hierarchy errors". Those are `:4-7`, as the report's own section 14 says. The `:3-8` came from my first judgement's correction 2, so this slip is mine: correction 1.
- **spec.** Each citation says what the block says. `numbers.tex:371-372` is now the sentence itself ("allow any rational value to be compared numerically to any other rational value", read `:355-395`). The block's other citations also hold, and I read each again:
  - `basic-integers.tex:79`, "ZZ is a commutative ring and is totally ordered";
  - `types-vals-vars.tex:218-237`;
  - `conversions-coercions.tex:78-83`, `:127-132`, `:176-187`, `:224-227`;
  - `opr-overview.tex:156`, `:197`;
  - `reductions.tex:15-26`;
  - `defining-generators.tex:147-157`.

  None is under `Specification/library/apis/`.
- **precedent.** Each citation holds:
  - `CompilerBuiltin.fsi:103-108`: `trait ZZ` and its five `coerce` lines;
  - `CompilerBuiltin.fsi:147-149` and `:332-334`;
  - `FortressLibrary.fss:2342-2346`, and `:2282-2286` at `e5414f5bf`: `array1`'s `typecase __thrower[\T\]`;
  - `sumlib.py:22-37`: the identity functions ending in `else => 0` and `else => 1`.
- **deviation.** Each citation holds:
  - `FortressLibrary.fss:358-365` is D1's `=`.
  - `:958` is `Ratio(a,b)` in `ZZ`'s `/`, which is `:953-960`. `ZZ32` and `ZZ64` reach it through `:757` and `:841`.
  - `:629` is `Ratio.asString`.
  - `:3117` and `:3130` are the two `else` branches.
  - `:3138-3157` are the fusion pairs and `SumReduction`.
  - `Library/QuickCheck.fss:322` is `perturb(big(widen(obj) LSHIFT 32), ...)`.
- **historical.** I classified every path outside `explorations/` that the net diff edits, against `a874948ac`.
  - 15 library files and 21 team tests existed in 2012, and the line lists all 36.
  - The other eight are revival files: `CoercionCallRungC`, `CoercionOverloadRungC`, `CoercionRedispatchRungC`, `XXXFlatStringSplitRungL`, `FlatTowerRungF` and the three new `XXX...RungF`.

## B. The recorded failure (check 1)

It is unchanged: `252639598`, the test and `probes/failure-preedit.txt`, precedes the library edit `f1fe07dc9`.

For the repair round's three expected-failure files, the failure is the verdict. The worker captured each one, and I re-ran each at 1 and 4 threads (section D).

**The red demonstration of the first `XXX` file.** I read `probes/xxx-unwritten-sum-goes-red.txt` in full.
1. The base library's 15 files are checked out.
2. `walk` prints `REACHED`, `PASS`.
3. The testSystem harness, whose scratch directory `harness-one.sh` recreates with fresh caches (`explorations/compile-ladder/rung-interp-coercion/harness-one.sh:10`), prints "Missing expected failure" and `Tests run: 1, Failures: 1`.
4. The flat library is restored, and `git status --short Library ProjectFortress/LibraryBuiltin` prints nothing.
5. The harness runs again and prints "OK Saw expected exception" and `OK (1 test)`.

I did not repeat the checkout in the worktree. The same fix shows in my own base-library runs: under `walk` on the base, the unwritten forms compute (`probes/skeptic/two-path2b.txt:43-52`: `-10100` and `0`, the compiled path's values).

## C. The diff (check 2)

Outside `explorations/compile-ladder/`, the repair round changes the following and nothing else (`git diff 70f0a3da6..HEAD`):
- **`Number`'s doc comment**, three lines in each file (`FortressLibrary.fsi:280-282`, `.fss:355-357`), with no line moved.
  - It now says what the code does. Exact numbers compare as rationals (`exactValue`, `.fss:363`). A float compares with any number after `asFloat` (`:360`, `:362`).
- **The three new tests.**
- **`explorations/apl/mg/diag_fwd.fss:50`**: `BIG MAX[\ZZ32\]` for `dz`, whose parameters are `Array[\ZZ32,ZZ32\]` (`:49`).
  - `:52` (`dr`, `Array[\RR64,ZZ32\]`) keeps `RR64`.
  - Both lines are on the approved list (`explorations/reviews/sum-replacement-judgement.md:210-212`).
  - The run prints its golden (`probes/diag-fwd-line50.txt`, `diff rc=0`), as my scratch run of that spelling did in the first judgement (`probes/skeptic/diag-fwd-line50-zz32.txt`).

`git diff --name-only e5414f5bf HEAD` touches no path under `Specification/`, `ProjectFortress/src/` or `ProjectFortress/compiler_tests/`, no coordinator file and not the ledger. The rest of the rung's diff is the one the first judgement read, and the judge did not reopen it (`JUDGE.md` section 4).

## D. The tests (checks 4 and 7)

**I re-ran all four gated files** (`probes/skeptic/rerun-tests.sh`, `probes/skeptic/rerun-tests.txt`), each at `FORTRESS_THREADS=1` and `4` with a fresh cache:
- `FlatTowerRungF`: `rc=0` at both (`:9-12`).
- `XXXUnwrittenSumRungF`: `REACHED`, then `CastError` through the identity (`FortressLibrary.fss:3109`, from its line 6), `rc=1` at both (`:13-40`).
- `XXXRR32MixedRungF`: `REACHED`, then `InterpreterBug ... getRR32 not implemented for FFloatLiteral` at its line 8, at both (`:41-62`).
- `XXXEmptyGroupSumRungF`: `REACHED`, then "Unification error: Closure/Constructor for unlift param 1 (r:M7) got arg 0: ZZ32 of type Int", at both (`:63-86`).
- The testSystem harness over the three `XXX` files: each "OK Saw expected exception", `OK (3 tests)` (`:87-91`).

**The shape of each new file.**
- One comment line (`:4`).
- The form of `XXXCoercionReturnRungC.fss`: a component exporting `Executable`, `REACHED`, the asserts, `PASS`.
- Assertion messages that carry a citation and nothing else, with no new row number.
- No `.test` file is needed in `ProjectFortress/tests/` (FACTS.md, "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test").

**Each asserts the specification's answer.**
- `emptySum(0)` is `0`, and `SUM[j <- 0#4] j` and `PROD[j <- 1#3] j` are `6`. A generator-form sum is a loop accumulating from `0` (`reductions.tex:58-80`), whose value is the combined value (`:49-52`). The sum over generators is `SUM[\N\]` at the body's type (`defining-generators.tex:147-157`).
- `narrow(1.5) + 2.5` and `narrow(1.5) + 2` give `4.0` and `3.5`. The specification's worked example computes an `RR32` with an `RR64` through `RR64`'s declaration (`conversions-coercions.tex:844-881`, read `:830-900`).
- The empty `SUM[\M7\]` is `M7(0)`. The identity of an operator is unique (`algebraic-constraints.tex:794-797`), and a reduction starts from it (`evaluation/reduction.tex:66-74`).

**Each fails for its defect alone.** The worker's scratch controls show it: `asFloat(narrow(1.5) + narrow(2.5))` is `4.0` (`probes/xxx-rr32-mixed.txt`), and `SUM[\M7\][i <- 0#10] M7(i)` is `M7(3)` (`probes/xxx-empty-group-sum.txt`). The other two assertions of `XXXUnwrittenSumRungF` each fail on their own in scratch copies (`probes/xxx-unwritten-sum-flat.txt`).

**The three homes**, for every defect the report names:
- **Home 1:** rows 428 and 146, `strToFloat` and the vector norm, and `Number`'s `=` exact answers. Each is a passing assertion of `FlatTowerRungF` (`:122-129`, `:41-42`, `:119`, `:174-181`, `:73-74`), passing in my run.
  - **One home-1 gap.** On the base, an empty sum answered `0 : Int` whatever its element type (sum-replacement-verdict outcome 1). The rung repairs this with the identity functions (`FortressLibrary.fss:3107-3131`), 16 branches, one per leaf for the zero and for the one.
  - Group 3 of the test asserts 7 of the 16 (`FlatTowerRungF.fss:98-119`): the `ZZ32`, `RR64`, `ZZ64`, `ZZ` and `QQ` zeros, and the `ZZ32` and `RR64` ones.
  - The other nine have no assertion: the `NN32`, `NN64` and `RR32` zeros, and the `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ` and `RR32` ones. REPORT.md section 7's "Each identity's run-time class is asserted in the test's group 3" says more than the test does.
  - Two of the nine were measured wrong on the base: the empty `NN32` sum (the first judgement, section 9) and the empty `RR32` sum (`probes/skeptic/sk2-exprs.txt`, E7). Both were `0 : Int` on the base, and both are right on the flat library.
  - I ran all nine on the flat library at 1 and 4 threads (`probes/skeptic/identities.sh`, `probes/skeptic/identities.txt`, program `probes/skeptic/r2/SkIdentities.fss`). Each answers the right value and class: `0 : NN32`, `0 : UnsignedLong`, `0.0 : RR32`, `1 : Long`, `1 : NN32`, `1 : UnsignedLong`, `1 : BigNum`, `1 : Ratio`, `1.0 : RR32`.
  - By the letter of the three homes, these assertions should exist before a skeptic approves. **This is my decision: approve with the assertions as correction 3, rather than refuse.**
    - The alternative, a second refusal, would drop a rung whose claim holds on every value I measured.
    - The correction is additive: each expected string is the one printed above.
    - The gate runs the test after the merge.
    - The first judgement measured the `NN32` case and did not ask for this, so the gap is partly mine.
- **Home 2:**
  - row 424, `XXXUnwrittenSumRungF`;
  - `RR32`'s natives (provisional row 435), `XXXRR32MixedRungF`;
  - the empty non-number sum (provisional row 436), `XXXEmptyGroupSumRungF`.

  Each name starts `XXX`, and the harness treated each as an expected failure in my run.
- **Home 3:** rows 431, 432, 434, 437 and 439. Each has a committed `.txt` capture and a row that says the specification is silent, with its grep. I re-ran the greps:
  - `grep -n -i numerically Specification/basic-lib/*.tex` finds `numbers.tex:372` and `basic-integers.tex:591` only.
  - `grep -n signed Specification/basic-lib/*.tex` finds `unsigned` only.
  - `grep -rl QuickCheck Specification/basic Specification/basic-lib` finds nothing.
  - `literals.tex:83-95` is the note "We need to describe the Numeral type hierarchy".
- **The fourth case:** rows 433 and 438, verified rows. The specification settles each, the repair is outside the rung, and no `walk` test can express it: 433 is a checker refusal, and 438 is a declared return type, which `walk` does not check (row 387).

## E. Rule 2's count, and the departure from instruction 6 (check 3)

**The count.** The grep prints 192 lines over `Library/*.fss` without the three compiler-prelude files: `FortressLibrary.fss` 174, `QuickCheck.fss` 5, `Timing.fss` 4, `IntMap.fss` 3, `Random.fss` 3, `StatDigest.fss` 2, `Pairs.fss` 1. That matches the table (`probes/rule2-return-sites.txt`, 192 rows: N 79, T 101, S 12).
- I read the twelve S sites, and the T sites most likely to hide another leaf. None of the latter is S:
  - `StatDigest.fss:18-23`: fields declared `RR64`;
  - `Random.fss:335`: `state`, a typed `ZZ64`;
  - `QuickCheck.fss:280`, `:331`, `:368`, `:382`: `c.random()` is `ZZ32` (`QuickCheck.fss:42`) and meets a float by `RR64`'s coercion;
  - `IntMap.fss:673`;
  - `Pairs.fss:101`;
  - `Timing.fss:30-33`.
- One nuance, not a finding: `QQ.floor` (`:613`) and `QQ.round` (`:621`), classed T, reach the S sites `:615` and `:620` when the denominator is 0, so they too answer the argument. That is what `numbers.tex:479-481` says, and it is the same on both libraries.

**The departure is right.**
- The specification: "Exponentiation of an integer to a nonnegative integer power produces an integer result" (`Specification/basic-lib/basic-integers.tex:506-509`, under `opr ^(self, power: NN): ZZ`).
- What converting in the body would do: make `widen(3)^2` a float, and break `QQ`'s exact `^` (`FortressLibrary.fss:607-611`).
- The use `(widen(3))^2 + 0.5` is refused on the flat library for the same reason `widen(9) + 0.5` is: answer 8 (`POSITIONS.md:159`). Answer 8's explicit route works: `asFloat((widen(3))^2) + 0.5` is `9.5 : Float` at 1 and 4 threads (`probes/skeptic/sk2-exprs.txt`, E5).
- The declaration says `RR64` because a negative power answers a float: `(widen(3))^(-1)` is `0.3333333333333333 : Float` on both libraries (E3).
- The worker flagged this as a decision, with the alternative it rejected. Row 438 names the fix and why it is not this rung's: the declaration at the integer's own type, with the negative power's contract decided apart.

## F. The competing-declaration grep (check 5)

I grepped `XXXUnwrittenSumRungF`, `XXXRR32MixedRungF`, `XXXEmptyGroupSumRungF`, `object M7` and `emptySum` over `ProjectFortress/src/com/sun/fortress/`, `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `test_library` and `Library`. Each name appears only at its own declaration. The first judgement's grep of `additiveIdentity`, `multiplicativeIdentity` and `exactValue` stands, since no declaration changed.

## G. `record.md` (check 6)

- **Rows.** Every row cited exists: 20, 135, 146, 295, 330, 387, 388, 423, 424, 426 and 428. The ledger's last row is 430.
  - New rows 431-439 are provisional, in manifest order, and renumber nothing.
  - Each has the eight columns of row 430, with the status `NEGATIVE-VERIFIED` that 241 rows use.
- **The first judgement's corrections are made:**
  - The FACTS entry cites `numbers.tex:371-372` for the exact half only. It names the float half as the base's comparison kept, not transitive, with row 434.
  - The 18 remaining hierarchy errors include `RelationalPredicateCondition`.
  - Row 146's note adds the declared-return position under row 387.
  - Row 424's note gives its home 2, the red demonstration and the demos count.
- **Rows 435, 438 and 439, checked against the tree.**
  - 32 binary natives of `RR32` take `b:RR64` (`FortressBuiltin.fss:230-330`).
  - The seven `^` lines declared `RR64` are at the cited lines (`FortressLibrary.fss:682`, `:746`, `:830`, `:897`, `:987`; `FortressBuiltin.fss:448`, `:532`).
  - `signed(self):NN64` is at `FortressLibrary.fsi:502` and `.fss:903`. The rung's own coercions use it at `:764`, `:913` and `:915`, and `UnsignedTest.fss:112-113`, `:218-219` use it as a signed value.
- **The demos count.** I checked it against its driver and its summary script. The classification is by regexp (`demos-summary.py:33-34`). One flat log of the `CastError` kind passes the identity at `FortressLibrary.fss:3122` (`BirdCount1p`). The counts add up: 18 at row 424, 3 at answer 8's explicit division, and 3 that ran on neither library, 24 in all.
- **The gather line.** The testSystem sum is 408 at the base (`CLIMB-BATCH-6.md:272` expects 411 with three new files), plus F's four and R's two, which gives 414.
- **One inconsistency with the record is left, in the test.** `FlatTowerRungF.fss:75-76` cite `numbers.tex:372-373` for `1/2 = 0.5` and `big(3) = 3.5`. Those are comparisons of the float half. The record now says that passage covers the exact half only and that the specification is silent on the float half (D1, row 434).
  - Both assertions hold under either candidate behaviour D1 names: after `asFloat`, and by a float's exact rational value. So the values stay; only the citation is wrong. Correction 2.

## H. The count table (check 8)

The rung's table, `probes/checker-count/table-after.txt:14`, reads `#total 62`. REPORT.md section 14, `record.md` and the structured result all declare 62. The manifest's expectedCheckerCount, 44, is a prediction, not a value the table must meet. The table and the report agree, and `#crash` is `none`.

## I. The differentials

These are programs I wrote in this round, which the worker did not write (`probes/skeptic/r2/*.fss`). Drivers:
- `probes/skeptic/two-path2.sh`: walk on the flat library and on the base library at `FORTRESS_THREADS=1` and `4`, three walk JVMs at a time; then `fortress compile` and `fortress run` at 1 and 4. `two-path2.txt` was made by its first form, whose scratch directory was fixed; `two-path2b.txt` by the present form, which takes the directory from `TP`. Nothing else differs.
- `probes/skeptic/sk-exprs.sh` over `sk2-exprs-list.txt`, for the forms the compiler prelude cannot express (no `QQ`, no `RR32` arithmetic, no static arguments on `SUM`).

**No program answered differently at 1 and 4 threads.**

| Program | walk flat (t1 / t4) | walk base (t1 / t4) | compiled (t1 / t4) | Verdict |
|---|---|---|---|---|
| `SkAtomicAcc.fss`: top-level `var acc: ZZ64 = 0`, `atomic do acc := acc + i; cnt := cnt + 1 end` for `i <- 0#100000` (`two-path2.txt:65-93`) | `4999950000`, `100000` / same | `704982704`, `100000` / same | `4999950000`, `100000` / same | The base wraps: row 146 at a top-level `var`. The flat library agrees with the compiled path at both thread counts, and no update is lost under `atomic`. The specification settles it against the base: the declared `ZZ64` converts (`conversions-coercions.tex:78-83`). Repaired; row 146's home-1 assertion is the local binding (`FlatTowerRungF.fss:41-42`), so this position goes in recommended row 2. |
| `SkMaxZC.fss`: unwritten `BIG MAX[i <- 0#5] \|i - 2\|`, `SUM[i <- 0#200] (i - 150)`, `SUM[i <- 0#200, j <- 0#200] (i - j)` (`two-path2b.txt`) | `2`, then a join unification error naming `a:BOTTOM` / same | `2`, `-10100`, `0` / same | `2`, `-10100`, `0` / same | Row 424, now homed. The unwritten `BIG MAX` still runs on the flat library, because its lifted reduction needs no identity. |
| `SkMaxZ.fss`: the same with `PROD[i <- 1#10] i` (`two-path2.txt:94-155`) | `2`, then the join error at the nested sum / same | `2`, `0`, `3628800` / same | refused: "Operator BIG juxtaposition is not defined" (the prelude has no `PROD`) | Row 424, as above. |
| `SkMaxZW.fss`: written `BIG MAX[\ZZ32\]` (the `diag_fwd.fss:50` form), `SUM[\ZZ32\]` over two generators, `SUM[\QQ\][i <- 1#30, j <- 1#30] 1/(i+j)`, `PROD[\ZZ\][i <- 1#40] big(i)`, `SUM[\ZZ64\][i <- 0#100000, j <- 0#3] widen(i) j` (`two-path2.txt:156-204`) | `2`, `0`, `366143141522918655378736349/9690712164777231700912800`, 40!, `14999850000` / same | `2`, `0`, `-24939851/46034336`, 40!, `14999850000` / same | refused: "QQ is undefined" (the prelude has no `QQ` and no static arguments on `SUM`) | Python's `fractions` gives the flat library's `QQ` value exactly. The base's is negative, row 428's wrap. 40! and `14999850000` are exact on both. Parallel joins of exact reductions agree at both thread counts. |
| `SkRetDiv.fss`: `half(): RR64 = 3; half()/2`; `y: RR64 = 3; y/2`; `sq(x: ZZ32): RR64 = x^2; sq(3)/2`; `7/2` (`two-path2.txt:10-64`) | `3/2`, `1.5`, `9/2`, `7/2` / same | `3/2`, `3/2`, `9/2`, `7/2` / same | refused at compile: "Function body has type IntLiteral, but declared return type is RR64", because the compiler prelude's `RR64` declares no coercion from `IntLiteral` or `ZZ32` (`CompilerBuiltin.fsi:433-435`) | `y/2`: the base held an `Int` in a typed `RR64` binding, and the flat library converts (asserted at `FlatTowerRungF.fss:70-71`, `s: RR64 = 7`). `half()/2` and `sq(3)/2` are row 387's unconverted return, on both libraries, homed by `XXXCoercionReturnRungC.fss`; the specification's value is `1.5` (`conversions-coercions.tex:104-105`). `7/2` is a `Ratio` on both, as `basic-integers.tex:239` types it (`QQ#`). No regression of this rung. |

Walk-only expressions, flat against base, each at 1 and 4 threads (`probes/skeptic/sk2-exprs.txt`):
- E1, `narrow(1.5) = 1.5`: `InterpreterBug: getRR32 not implemented for FFloatLiteral` on both libraries. Row 435's reach includes the comparisons: recommended row 1.
- E2, `1.5 + narrow(2.5)`: `4.0 : Float` on both.
- E3, `(widen(3))^(-1)`: `0.3333333333333333 : Float` on both (section E).
- E4, `signed(widen(unsigned(3))) + widen(1)`: `4 : Long` on both (row 439's `Long`).
- E5, `asFloat((widen(3))^2) + 0.5`: `9.5 : Float` on the flat library. The base refuses it: "Variable asFloat is not defined" (D2 publishes `asFloat`).
- E6, `SUM[\RR32\][i <- 0#4] narrow(asFloat(i))`: `6.0 : RR32` on the flat library; the base refuses it the same way.
- E7, `SUM[\RR32\][i <- 0#0] narrow(1.0)`: `0.0 : RR32` on the flat library and `0 : Int` on the base.
- E8, `PROD[\NN32\][i <- 1#4] unsigned(i)`: `24 : NN32` on both.
- `SkIdentities.fss`, the nine identity branches group 3 does not reach, at 1 and 4 threads (`probes/skeptic/identities.txt`): the same nine values at both thread counts (section D). The base cannot run this program, because it has no free `asFloat` ("Variable asFloat is not defined"). The base's column for the two sums measured wrong comes from E7 and the first judgement.

**Which outcome of rule 4 each divergence is in.**
- `SkMaxZC` and `SkMaxZ`: the specification settles it against `walk`, and the repair is outside the rung (row 424). That is the prefix's fourth case, and its home 2 is now in place.
- `SkRetDiv`'s return lines: the same case, under row 387.
- `SkAtomicAcc`, `SkMaxZW`'s `QQ` line and `SkRetDiv`'s `y/2`: the specification settled them against the base, and the rung repairs them.
- The compiled refusals are the compiler prelude's own gaps, which the record rules out as findings before the switch-over.

## J. Loud failures and quiet values

**The repair round** turned no loud failure into a value. It changed a doc comment, one program line that prints what it printed before, and three tests that fail loudly by design.

**The rung as a whole.** The first judgement's section 10 stands.
- Loud to quiet, each with the specification's value: `BIG MAX z` over an `RR64` array, and a nonempty `SUM` over a non-number additive group.
- Quiet to loud: an unwritten clause-form `SUM` or `PROD` (row 424, now gated), an empty non-number `SUM` (now gated), and mixed widths that reached `Number`'s catch-alls.

Measured in this round, wrong quiet values that became right quiet values:
- The empty `RR32` sum: `0.0 : RR32`, where the base gave `0 : Int` (E7).
- `y: RR64 = 3; y/2`: `1.5`, where the base gave `3/2`.
- The empty `NN32` sum: `0 : NN32`, where the base gave `0 : Int` (the first judgement).
- The top-level `ZZ64` accumulator: `4999950000`, where the base gave `704982704`.

## K. Stops

The stops the batch record's intro reserves for F, and that no decision lifts, are not met:
- Q1 = (a), so the (b) stop does not apply.
- No line of C4's model, vocabulary, data or check, or of the APL program, changed beyond the approved list. `diag_fwd.fss:50` is on that list (`sum-replacement-judgement.md:210-212`).
- The repair round declares no `coerce`.
- `Vector` and `Matrix` keep `T extends Number`.
- No file of T or R is edited: no path under `Specification/`, `scala_src/` or `compiler_tests/`. F's new files in `ProjectFortress/tests/` end in `RungF`.

The standing stops met are the ones the first judgement listed, each lifted by Pavol's decisions:
- the tower's declared types, `Number`'s catch-alls, and with them `RR32`'s native parameters (D7) and the published `asFloat` (D2): `POSITIONS.md:92`, `:159`;
- the three operators: `:168`;
- the approved test lines and the C4 and APL lines: `:165`;
- the Q1 lines: `:173`.

The three new tests delete nothing.

## L. Required corrections (the commit stage closes them)

1. **The provenance block's `problem` line** cites `probes/checker-count/diff-before-after.txt:3-8` for "the hierarchy errors the flattening removes". The hierarchy errors are `:4-7`; `:3` is the `comprises` error and `:8` the 19 `RangeInternals` overloading errors. Cite `:4-7`, or keep `:3-8` and call them "the errors the flattening removes". The slip is mine, from the first judgement's correction 2.
2. **`ProjectFortress/tests/FlatTowerRungF.fss:75-76`** cite `numbers.tex:372-373` for `1/2 = 0.5` and `big(3) = 3.5`. Those are comparisons of the float half, which the record says that passage does not cover (D1, row 434). In those two message strings, the commit stage writes the final number the gather gives provisional row 434 in place of `numbers.tex:372-373`, keeping `POSITIONS.md:92` on `:75`. Both assertions and their values stay.
3. **`ProjectFortress/tests/FlatTowerRungF.fss`, group 3 (`identities()`, `:88-120`)** gains one assertion for each identity branch it does not reach. Each uses `shown(...)` and the expected string my probe printed at 1 and 4 threads (`probes/skeptic/identities.txt`), with the message citing `POSITIONS.md:165` as the group's other identity assertions do:
   - `SUM[\NN32\][j <- 0#0] unsigned(j)`, `"0 : NN32"`;
   - `SUM[\NN64\][j <- 0#0] widen(unsigned(j))`, `"0 : UnsignedLong"`;
   - `SUM[\RR32\][j <- 0#0] narrow(asFloat(j))`, `"0.0 : RR32"`;
   - `PROD[\ZZ64\][j <- 1#0] widen(j)`, `"1 : Long"`;
   - `PROD[\NN32\][j <- 1#0] unsigned(j)`, `"1 : NN32"`;
   - `PROD[\NN64\][j <- 1#0] widen(unsigned(j))`, `"1 : UnsignedLong"`;
   - `PROD[\ZZ\][j <- 1#0] big(j)`, `"1 : BigNum"`;
   - `PROD[\QQ\][j <- 1#0] big(j)/big(1)`, `"1 : Ratio"`;
   - `PROD[\RR32\][j <- 1#0] narrow(asFloat(j))`, `"1.0 : RR32"`.

   Then REPORT.md section 7 says that group 3 asserts all 16 identity branches. The test is re-run at 1 and 4 threads with caches wiped, and the pass is captured before the commit.

## M. Rows recommended (not corrections; the gather opens or refuses each)

1. **A note on provisional row 435:** the comparisons are in its reach. `narrow(1.5) = 1.5` ends in `InterpreterBug: getRR32 not implemented for FFloatLiteral` on both libraries at 1 and 4 threads. `1.5 + narrow(2.5)`, where `RR64`'s own `+` takes the `RR32` as a subtype, is `4.0` (`compile-ladder/rung-flat-tower/probes/skeptic/sk2-exprs.txt`, E1 and E2). The `XXX` test gates `+` only.
2. **A note on row 146's closing:** the top-level `var` is closed too, under `atomic` at four threads. `var acc: ZZ64 = 0`, updated by `atomic do acc := acc + i end` over `for i <- 0#100000`, is `4999950000` under `walk` on the flat library and on the compiled path at 1 and 4 threads, and `704982704` on the base (`compile-ladder/rung-flat-tower/probes/skeptic/two-path2.txt:65-93`, program `probes/skeptic/r2/SkAtomicAcc.fss`).

---

# Rung F (`rung-flat-tower`): the skeptic's first judgement

**Verdict: refused, for one thing.** Row 424's defect is measured by this rung and has no home. The rung makes it live on the one library: under `walk`, an unwritten clause-form sum now fails, where the base computed it (the worker's `probes/unwritten-sum-flat.txt`; my `probes/skeptic/two-path-mix-sums.txt:67-130`, where `count(0)` with `SUM[i <- 0#n] i` is `CastError` on the flat library, `0 45 49995000` on the base under `walk`, and `0 45 49995000` on the compiled path). The specification settles the answer: a sum is desugared by the type `N` of its body, `SUM[\N\]` over `SumReduction[\N\]` (`Specification/advanced/parallelism-locality/defining-generators.tex:147-157`), and the static arguments of a reduction are optional (`Specification/basic/expressions/reductions.tex:15-26`). So its home is 2: an `XXX` expected-failure walk test. The record gives it only a note on row 424 (`record.md:25`), and section 17 of the report does not list it among the defects measured. Everything else below is a correction that the repair round closes with it.

The claim itself holds. The number tower is flat, with exactly the record's coercions. The new test's recorded failure on the base is genuine, and the test passes at 1 and 4 threads in my runs as in the worker's. The drop of the three operators is complete, and no reserved stop is met. On every construct I probed, the flat library brings `walk` into agreement with the compiled path where the base diverged.

Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, cpu MHz 2100.000, openjdk 25.0.4. The load average at the start of each run is in the head of each capture, 0.29 to 3.15. `FORTRESS_THREADS` is given per run. Tree: `wip/rung-flat-tower` at `46a1dfee4`, worktree clean but for this file and `probes/skeptic/`. The flat library is the worktree's own. The base library is `e5414f5bf`'s 15 edited library files as git-show copies beside each probe program, which shadow the tree's (`Shell.sourcePath`, the worker's technique). Every run used a private cache.

## 0. The provenance block

I opened every file:line the block cites, in `reportText`'s five lines.
- **spec:** each line says what the block says: `types-vals-vars.tex:218-237`; `conversions-coercions.tex:78-83`, `:127-132`, `:176-187`, `:224-227`; `opr-overview.tex:156`, `:197`; `numbers.tex:372-373`; `basic-integers.tex:79`; `reductions.tex:15-26`. None is under `Specification/library/apis/`.
- **precedent:** each line says what the block says: `CompilerBuiltin.fsi:103-108`, `:147-149`, `:332-334`; `FortressLibrary.fss:2342-2346`, and `:2282-2286` at `e5414f5bf`; `sumlib.py:22-37`.
- **historical:** it lists every file of the 2012 tree that the diff edits. I checked each edited path against `a874948ac`. The four it omits (`CoercionCallRungC`, `CoercionOverloadRungC`, `CoercionRedispatchRungC`, `XXXFlatStringSplitRungL`) are revival files.
- **Two citations do not say what the block says.**
  - **problem:** it cites `probes/checker-count/table-before.txt:4-5, :14` for "the checker refuses the tower's hierarchy". Those lines are per-api counts (`FortressBuiltin 18`, `FortressLibrary 110`) and the total (`#total 125`), and none of them names a hierarchy error. The hierarchy errors are at `probes/checker-count/diff-before-after.txt:3-8`.
  - **deviation:** it cites `Library/FortressLibrary.fss:628-629` for "integer / always answers a Ratio, which prints without /1". Those lines are `Ratio`'s header and its `asString`. The always-`Ratio` division is `:958`, in `ZZ`'s `/`, which `ZZ32` and `ZZ64` reach through `:757` and `:841`.

  Correction 2.

## 1. The recorded failure

It exists, and it came before the edit. Commit `252639598` carries only the new test, the runner and `probes/failure-preedit.txt`. The library edit is the next commit, `f1fe07dc9`. The capture shows each of the five groups failing on the base (`failure-preedit.txt:8-13`), and it heads with its machine line. The two later assertions were also captured failing on the flat library before their edits: `failure-strtofloat.txt`, `failure-norm.txt`.

## 2. The diff, read against the specification

- **The tower and the coercions.** I grepped every `coerce` in `Library/*.fs?` and `FortressBuiltin.fs?`: `FortressLibrary.fss:383`, `:548-552`, `:763-764`, `:847`, `:911-917`, and their api twins. That is exactly the table: `RR64` from `ZZ32`; `QQ` from the five integer types; `ZZ64` from `ZZ32` and `NN32`; `NN64` from `NN32`; `ZZ` from the four fixed widths. No other coercion is declared, and none was declared before (`e5414f5bf` has none).
  - The ten pairs of the five integer types all exclude each other.
  - `Vector` and `Matrix` keep `T extends Number` (`:2292`, `:2600`).
- **The reductions.** `additiveIdentity` and `multiplicativeIdentity` (`:3107-3131`) have eight branches, narrowest first, with `RR32` before `RR64`, each value through `cast[\T\]`. My probes confirm each identity's run-time class at both thread counts (section 9).
- **The drop is complete.** A grep for `BIG MAXN`, `MINMAXN`, `MaxReductionN`, `MinReductionN`, `MinMaxReductionN` and `NSumReductionPair` over `*.fss`, `*.fsi`, `*.tex`, `*.java` and `*.scala` in the whole worktree finds only the judgement's own probes under `explorations/reviews/max-min-identities-judgement/`. `BIG MAXN[i <- 0#3] i` is "Operator BIG MAXN is not defined" on the flat library and `2 : Int` on the base (`probes/skeptic/sk-exprs-equality.txt:55-58`).
- **The approved microGPT lines are the only lines changed in C4 and the APL program.** I checked with `git diff -U0 e5414f5bf...HEAD -- explorations/run-c4 explorations/apl`, against `explorations/reviews/sum-replacement-judgement.md:183-212`. One of them is spelled wrong for its element type.
  - `explorations/apl/mg/diag_fwd.fss:50` is `dz`, whose arrays are `Array[\ZZ32,ZZ32\]`. It now reads `BIG MAX[\RR64\][i <- 0#|a|] |a[i] - c[i]|`, a maximum of `ZZ32` values written at `RR64`.
  - Answer 7's rule is that a clause form writes its static argument, and the argument here is the element type `ZZ32`. Under the specification the `RR64` spelling converts every value by `RR64`'s coercion, so the diagnostic would print `maxdiff 0.0` where the base printed `maxdiff 0` (`explorations/apl/mg/checks/diag_fwd_flatarrays2.out:4-7`). Walk hides this today, since it keeps the `Int` inside the lifted maximum.
  - I ran `diag_fwd` on the flat library as committed (`probes/skeptic/diag-fwd-flat.txt`), and on a scratch copy with `BIG MAX[\ZZ32\]` at line 50 (`probes/skeptic/diag-fwd-line50-zz32.txt`). Both print exactly the golden's intermediates and loss. The line is approved, so this is not a stop, but its spelling is wrong: correction 3.
- **D1, `Number`'s `=`.** Its float half is not what its doc comment says, nor what the record cites.
  - The comment is `FortressLibrary.fsi:280-282` and `FortressLibrary.fss:355-357`: "Two numbers of different types are equal when their values are". The FACTS line cites `numbers.tex:372-373` for the whole of `=`.
  - That passage speaks of rational values only. A float compared through `asFloat` is not a numeric comparison. `1/3 = asFloat(1/3)` is `true`, and `((widen(1) LSHIFT 60) + widen(1)) = asFloat(widen(1) LSHIFT 60)` is `true`, on both thread counts (`probes/skeptic/sk-exprs-equality.txt:19-26`).
  - That is the base's `asFloat` comparison, kept, and it is honest in its mechanism. The exact half does what the passage says (`widen(3) = big(3)` and `big(2)/big(4) = 1/2` are `true`, `:7-10`, `:31-34`).
  - The comment is api text that the gather renders into the specification's Part IV, so it must not claim value equality for the float half: correction 4.

## 3. The precedent search

The worker found the team's flat prelude, `array1`'s witness, the specification's `SumReduction[\N\]`, the judgement's library copy and `Float`'s natives, and followed the right one each time.

Rule 2's count was not given. Report section 2 says "I did not count the library's other sites of the shape by reading". The shape in question is rows 146 and 428: a wide type declared, a narrow value held.

I probed the positions myself (`probes/skeptic/sk-exprs-rationals.txt:27-46`, `probes/skeptic/two-path-row146.txt`). The flat library closes the shape at a typed binding, a declared parameter, a tuple binding and an array element: each gives `2147483648 : Long` where the base wrapped to `-2147483648`.

It stays open at a declared return type. With `ret(): ZZ64 = 2147483647`, `ret() + 1` is `-2147483648` under `walk` on the flat library, at 1 and 4 threads, and `2147483648` on the compiled path (`two-path-row146.txt:7-40`, third line of each block).

That is row 387, whose home is `XXXCoercionReturnRungC.fss`. The specification settles it against `walk` (`conversions-coercions.tex:104-105`), and the repair is outside this rung. In the library itself I found no site of this form below 2^31; `getter maximum(): ZZ64 = 9223372036854775807` (`:768`) is already a `Long` numeral. Row 146's closing note must still say that the declared-return case stays open under row 387: correction 5.

## 4. The test

`ProjectFortress/tests/FlatTowerRungF.fss` has one comment line (`:4`) and no provenance essay. Its five groups cover each case the record's section 3, F, "The test, first", names: shape, the coercion table edge by edge, the verdict's three outcomes with run-time classes, row 428's comparisons and exact arithmetic, and the flat view's product with its controls and `BIG MAX z`. It is not an `XXX` file and needs no `.test`.

I ran it myself:
- `rc=0` at `FORTRESS_THREADS=1` (`probes/skeptic/flat-tower-test-t1.txt`).
- `rc=0` at `FORTRESS_THREADS=4` (`probes/skeptic/flat-tower-test-t4.txt`).

## 5. The competing-declaration grep

I grepped `additiveIdentity`, `multiplicativeIdentity`, `exactValue` and `FlatTowerRungF` over all of `ProjectFortress/src/com/sun/fortress/`, `ProjectFortress/tests`, every `ProjectFortress/*_tests`, `Library`, `LibraryBuiltin`, `ProjectFortress/demos` and `explorations` (`*.fss`, `*.fsi`, `*.java`, `*.scala`). Each name appears only at its own declaration.

## 6. `record.md`

It cites existing rows (20, 135, 146, 295, 330, 388, 423, 424, 426, 428; the last row is 430) and renumbers none. The new rows are 431-433, provisional, in manifest order. Two FACTS lines are not true as written.
- **The 18 hierarchy errors.** The appendix to "The true distance to the switch-over" (`record.md:11`) says the 18 hierarchy errors left are "at `TotalComparison` and at `AnyMaybe`, `Maybe`, `Just` and `Nothing`". My re-run of the stage lists them, and one of the 18 is `RelationalPredicateCondition[\E\] excludes FortressLibrary.Condition but it extends FortressLibrary.Condition` (`probes/skeptic/checker-count-rerun.txt:25-42`, the last line). That is the `excludes Condition[\()\]` site the batch record names in section 3, F, "The checker count".
- **The float half of `=`.** The new entry "The one library's number tower is flat" (`record.md:9`) cites `numbers.tex:372-373` for it (section 2 above).

Correction 4.

## 7. The three homes

- **Rows 428 and 146, `strToFloat`, the norm and `Number`'s `=` answers: home 1.** Each is a passing assertion of `FlatTowerRungF` (`:122-129`, `:41-42`, `:119`, `:174-181`, `:73-76`), and I saw it pass (section 4).
- **Rows 431 and 432: home 3.** Each has a committed `.txt` capture and a provisional row, and each row says the specification is silent. For 431, `grep -rl QuickCheck Specification/basic Specification/basic-lib` finds nothing, and I re-ran it. For 432, the silence is `literals.tex:83-90`, the note on numerals' types, beside `aggregate.tex:105`.
- **Row 433 is fair as a verified row.** The fusion pairs are ill-formed only to the compiled checker, which no gated `walk` test can express before the switch-over.
- **Row 424 has no home.** This is the refusal.

## 8. The count table

- **Table:** `#total 62` in `probes/checker-count/table-after.txt:14`, and the same `62` in my re-run (`probes/skeptic/checker-count-rerun.txt:20`).
- **Report:** 62 in REPORT.md section 14, `record.md:11` and the structured result.
- **Manifest's expectedCheckerCount:** 44, a prediction, not a value the table must meet.

They agree. The crash line stays `none`.

## 9. The differentials

I wrote all of these programs myself; the worker ran none of them. Each ran under `walk` on the flat library and on the base library, at `FORTRESS_THREADS=1` and `=4`; the programs that the compiler prelude can express also ran on the compiled path, `compile` then `run`, at 1 and 4. Drivers: `probes/skeptic/sk-exprs.sh` with `sk-exprs-list1.txt` to `sk-exprs-list3.txt`, and `two-path.sh` with `walk.sh`, `comp.sh` and `diag.sh`. **No program answered differently at 1 and 4 threads.**

Two-path programs:

| Program | walk flat (t1 / t4) | walk base (t1 / t4) | compiled (t1 / t4) | Verdict |
|---|---|---|---|---|
| `SkMix.fss`: `x: ZZ64 = 2147483647; x + 1`; `b: ZZ64 = a`; `a + c`; `f(1)` with `f(x: ZZ64)`; typecase of a `ZZ32` as `ZZ64`, of a `ZZ64` as `ZZ32`; `d + d` | `2147483648`, `7`, `12`, `2147483648`, not a `ZZ64`, not a `ZZ32`, `6000000000` | `-2147483648`, `7`, `12`, `-2147483648`, is a `ZZ64`, is a `ZZ32`, `6000000000` | as walk flat | The base diverged on four lines and the specification settled it against `walk`. The flat library repairs all four: walk and compiled now agree (`two-path-mix-sums.txt:7-66`). |
| `SkSumC.fss`: unwritten `SUM[i <- 0#n] i` at `n` = 0, 10, 10000 | `CastError` at `count(0)` | `0`, `45`, `49995000` | `0`, `45`, `49995000` | They disagree, and the specification settles it against `walk` (`defining-generators.tex:147-157`). The repair is outside this rung, so row 424 applies, but its home 2 is owed (the refusal). `two-path-mix-sums.txt:67-130`. |
| `SkSumW.fss`: the same written `SUM[\ZZ32\]` | `0`, `45`, `49995000` | the same | refused: "Wrong number or kind of static arguments for function: BIG +" | The prelude's non-generic `SUM` (`Library/CompilerLibrary.fsi:180-181`); the record rules this not a finding. `two-path-mix-sums.txt:131-174`. |
| `SkRow146.fss`: row 146's own loop (`a: ZZ64 := 0`, 17 times `a := 10 a + 7`); `b := 2147483647` then `b + 1`; `ret() + 1` with `ret(): ZZ64 = 2147483647` | `77777777777777777`, `2147483648`, `-2147483648` | `266148977`, `-2147483648`, `-2147483648` | `77777777777777777`, `2147483648`, `2147483648` | The flat library closes row 146, including assignment. The declared return type stays open under `walk`: row 387, correction 5 (`two-path-row146.txt`). |

Walk-only programs, flat against base (the compiled prelude has no `QQ`, no generic `SUM` and no integer-to-float coercion):
- **Reductions** (`sk-exprs-reductions.txt`). The flat answers are right at both thread counts:
  - `SUM[\ZZ64\][i <- 0#100000] i` is `4999950000 : Long`; the base gives `704982704 : Int`, wrapped (`:11-14`).
  - `SUM[\ZZ64\][i <- 5#1] i` is `5 : Long`.
  - `SUM[\ZZ\]` of the same range is `4999950000 : BigNum`.
  - `SUM[\QQ\][i <- 1#20] 1/i` is `55835135/15519504`; the base gives `-21550457/52350608`, wrapped (`:23-26`).
  - `PROD[\ZZ\][i <- 1#25] i` is 25!, and `PROD[\ZZ64\][i <- 1#20] i` is 20!; the base gives wrapped `Int`s.
  - The `NN32` empty sum is `0 : NN32`, where the base gives `0 : Int`.
  - `SUM[\RR64\][i <- 0#1000] i` is `499500.0 : Float`, where the base gives `499500 : Int`.
  - `BIG MAX[\QQ\]` is `1 : Ratio`.
  - `SUM[\Vector[\RR64,3\]\]` of two vectors, and of a user `AdditiveGroup` type `M7`, now run; on the base they are `CastError`.
- **Equality and conversions** (`sk-exprs-equality.txt`):
  - `3 = 3.0`, `3.0 = 3`, `3 =/= 3.0`, `widen(3) =/= big(3)`, `3 < 7/2` and `1 < 1/2` answer as on the base.
  - `widen(3) + 0.5`, `1/2 + 0.5` and `widen(3) < 3.5` are now refused, where the base answered through `Number`'s catch-alls. That is answer 8's explicit rule.
  - `6/2` is `3 : Ratio`, where the base gives `3 : Int` (D3).
  - The table's `NN` edges hold large values exactly: `NN64` to `ZZ` gives `18446744073709551615 : BigNum`, and `NN32` to `ZZ64` gives `4294967295 : Long`, which the base refuses.
- **Rationals** (`sk-exprs-rationals.txt`): `(2/3)^2`, `(2/3)^(-2)`, `1/2 + 1` and `1 + 1/2` are exact on both.
- **`diag_fwd`** under `walk`, flat, t1: identical to its golden (`diag-fwd-flat.txt`). This covers six of the approved APL lines that no check program runs.

## 10. Loud failures and quiet values

No loud failure became a wrong quiet value. What moved, with the value each now gives:

**Loud to quiet**, each with the specification's value:
- `BIG MAX z` over an `RR64` array now gives `2.25 : Float` in the test.
- A nonempty `SUM` over a non-number additive group now gives the group's sum, for example `M7(3)` (`sk-exprs-reductions.txt:71`).

**Quiet to loud:**
- An empty `SUM` over a non-number additive group was `0 : Int` on the base (`sk-exprs-reductions.txt:76`). It is now "Unification error: Closure/Constructor for unlift param 1 (r:M7) got arg 0: ZZ32 of type Int" (`:67-70`, `:75`). The identity witness's `else => 0` (D8) is refused by walk's `unlift` check, so it never reaches the program as a value.
- An unwritten clause-form sum was a correct value on the base, and is now `CastError` or a unification error (row 424).
- Mixed widths that reached `Number`'s catch-alls are now "Failed to find any matching overload".

**Wrong quiet to right quiet:**
- Row 146 at bindings, parameters, tuples and array elements.
- Row 428.
- The empty `RR64` sum's class.

`CastError` at `FortressLibrary.fss:36` names neither the sum nor the missing static argument, which is a poor diagnostic, but it is loud.

## 11. Stops

The stops that the batch record's intro reserves for F and that are not lifted are not met:
- Q1 = (a), so its (b) stop does not apply.
- No line of C4's model, vocabulary, data or check, or of the APL program, changed beyond the approved lines.
- No coercion is declared beyond the table.
- `Vector` and `Matrix` keep `T extends Number`.
- No file of T or R is edited: the diff touches no `Specification/`, `scala_src/` or `compiler_tests/` path.

The standing stops the rung meets, each lifted by Pavol's decisions:
- The tower's declared types and `Number`'s catch-alls: `POSITIONS.md:92`, `:159`.
- The three operators: `:168`.
- The approved test lines and the C4/APL lines: `:165`.
- The Q1 lines: `:173`.

## Required corrections (for the repair round; the commit stage checks them)

1. **Row 424 gets a home, the refusal's one thing.** Add a gated expected-failure walk test, an `XXX*.fss` in `ProjectFortress/tests/`. It should assert the specification's answer for an unwritten clause-form sum: for example `SUM[j <- 0#4] j` is `6`, and an empty one in a function declared `ZZ32` is `0`, each assertion's message citing row 424 and `defining-generators.tex:147-157`. Show that it goes red on a deliberate local fix, as the batch rule for a rung's first `XXX` file asks. Add it to REPORT.md section 17 and to the structured result's `defectHomes` as home 2. Say in the record that it is a second new file in `ProjectFortress/tests/`, which moves the shard count by one more than the manifest expects.
2. **The provenance block's two citations.**
   - problem: cite `probes/checker-count/diff-before-after.txt:3-8` for the hierarchy errors, beside the table's total.
   - deviation: cite `Library/FortressLibrary.fss:958` (with `:757`, `:841`) for integer `/` answering a `Ratio`, beside `:629` for its printing.
3. **`explorations/apl/mg/diag_fwd.fss:50`** writes `BIG MAX[\ZZ32\]`, `dz`'s element type, in place of `BIG MAX[\RR64\]`. Re-run `diag_fwd` and show it prints what the golden prints. My scratch run shows it does (`probes/skeptic/diag-fwd-line50-zz32.txt`).
4. **The float half of `Number`'s `=`.**
   - In `FortressLibrary.fsi:280-282` and `.fss:355-357`, the doc comment says what the code does: exact numbers compare as rationals; a float and any number compare after `asFloat`, so an exact value equals its nearest float.
   - In `record.md:9` and D1, `numbers.tex:372-373` is cited for the exact half only, and the float half is named as the base's comparison kept, with `probes/skeptic/sk-exprs-equality.txt:19-26`.
   - In `record.md:11`, the list of the 18 hierarchy errors adds `RelationalPredicateCondition` (`probes/skeptic/checker-count-rerun.txt:42`).
5. **Row 146's closing note** (`record.md:23`) adds: the declared-return position stays open under row 387, where `ret(): ZZ64 = 2147483647; ret() + 1` is `-2147483648` under `walk` and `2147483648` compiled (`probes/skeptic/two-path-row146.txt`). REPORT.md section 2 gives rule 2's count: no such site in the library.

## Rows recommended (not corrections; the gather opens or refuses each)

- **RR32's binary natives.** They call `getRR32()` on their argument, so `narrow(1.5) + 2` and `narrow(1.5) + 2.5` die with `InterpreterBug: getRR32 not implemented for FFloat` or `FFloatLiteral`. This happens on the flat library, where D7 declares the parameter `RR64`, and on the base, where it was `Number` and the error names `FInt` or `FFloatLiteral`. `narrow(1.5) + narrow(2.5)` is `4.0 : RR32`.
  - Specification: an internal error is never the answer, and the declared parameter admits the argument. Home 2 is possible, an `XXX` test asserting a float sum.
  - The fix is in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:90-98`, converting through `getFloat`-style access for a non-`RR32` argument.
  - Probes: `probes/skeptic/sk-exprs-equality.txt:59-62`, `sk-exprs-rationals.txt:47-54`.
- **`Number`'s `=` between a float and an exact number compares after `asFloat`.** It calls unequal values equal and is not transitive: `1/3 = asFloat(1/3)` is `true`, and `(2^60 + 1) = asFloat(2^60)` is `true` while `2^60 + 1 = 2^60` is `false`. The same held on the base for every mixed pair.
  - The specification is silent on comparing a float with an exact number: `numbers.tex:372-373` covers rationals, and `grep -n -i numerically Specification/basic-lib/*.tex` finds only `numbers.tex:372` and `basic-integers.tex:591`. So home 3.
  - Probe: `probes/skeptic/sk-exprs-equality.txt:19-26`.
- **An empty `SUM` over a non-number `AdditiveGroup`** (a `Vector`, or a user type) dies in `unlift` with a unification error, because the witness's `else => 0`, decision D8, supplies an `Int`.
  - The specification's identity is `Identity[\+\]` coerced into `T` (`Specification/advanced-lib/algebraic-constraints.tex:780-797`), which needs `where` clauses (`Specification/basic/functions.tex:15-19`). Home 2 is possible once written.
  - Probe: `probes/skeptic/sk-exprs-reductions.txt:67-78`.
- **A note on row 424: the reach of the unwritten form under `walk` on the flat library.** 24 demos under `ProjectFortress/demos` hold 137 unwritten clause-form `SUM`/`PROD` lines. I counted them with `grep -rcE '(SUM|PROD|∑|∏)\s*\[[^\\]' ProjectFortress/demos --include='*.fss'`.
  - `explorations/reviews/sum-replacement-judgement.md:171-172` (and section 7, `:406`) asked the flattening rung to count which of those demos run today, and the report does not.
  - The demos are not gated.
