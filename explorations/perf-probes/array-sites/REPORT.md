<!-- The array sites' no-decision ways measured: what the library's own ways (reviews/array-sites-ways.md, section 5) do to the array errors of the distance, with decision E's diff re-based beside them and the component's dead sizes for comparison. Decides nothing. Base: main at ea0a1f0a8. Its Library/, ProjectFortress/ and build.xml equal the climb batch 19 gate commit ebd39a6bd (git diff --stat is empty). main moved on to f4c6fba1a during the work, by record-only commits, also code-equal. Run in /home/user/fortress-probe-array-sites, seeded from the main tree's gate build, implementation unchanged: the distance stage 3 times; the 40 Vector/Matrix/DOT walk tests and microGPT's quick pair on step 1 + E3; the same on the base, in a second seeded worktree at ea0a1f0a8, since removed. No build, suite, count stage, checker, walk, test or model edit. Only FortressLibrary.fss and .fsi were edited, and those edits are uncommitted: the patches carry them. Written 2026-10-20 by an Opus probe worker for ask 3 and returned as text, since the harness refused it a report file; committed by the coordinator with the patches and scripts from `wip/probe-array-sites` (`7ab0e18eb`). -->

# The array sites' ways, measured


## In short

| Tree | Distance | Sites gone | Sites come |
|---|---|---|---|
| Landed, batch 19 | 31 | | |
| Step 1: `ways.patch` (1a, 1c, 2a, 3d, 4d, 4f) | **12** | 19 typecheck sites, and 3 of the first export error's 17 entries | none |
| Step 2: step 1 + `e3-rebased.patch` | **11** | the same 19, and the first export error whole | none |
| Step 3: step 1 + `dead-sizes-in-component.patch` (4b) | **11** | the same as step 2, site for site | none |

- **The second export error does not move.** It has 44 entries before and after every step, and they are the same entries (masked comparison).
- **Walk and microGPT on step 1 + E3:** no value or verdict moves.

## Step 1: `ways.patch` (+38/−15)

**The edits.**
- **1a:** `fill(v:T):Vector[\T,s0\]` and `tabulate(f:ZZ32->T):Vector[\T,s0\]` in `Vector`, with `StandardMutableArrayType`'s two bodies (`fss:2305-2312`). The same at `Matrix[\T,s0,s1\]`, with `tabulate` over `(ZZ32,ZZ32)->T`. The 4 api lines go with them, and `matrix(v)` now calls `matrix[\T,s0,s1\]()`.
- **1c:** `cast[\Vector[\T,s0\]\]` around 5 bodies and `cast[\Matrix[\T,s0,s1\]\]` around 4.
- **2a:** a `cast` in each of the 3 factory arms.
- **3d:** `Col(cast[\Array2[\T,0,s0,0,1\]\](…))` and `Row(cast[\Array2[\T,0,1,0,s1\]\](…))`.
- **4d:** the api's two `immutableArray` ranks put inside `(* … *)`, as the component has them.
- **4f:** `array3[\T, nat s0, nat s1, nat s2\](v:T):Array3[\T,0,s0,0,s1,0,s2\]` added to the api.

**The distance:**
```
$ explorations/coordinator/tools/distance/run.sh tmp/distance/step1.txt tmp/distance/step1
#total 12 | #kind typecheck 10, export 2 | #class X1 2, BR 2, GF 1, OT 7 | #crash none | #seconds 132 | #shadow every shadow edit matched
$ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-19/gate/distance.txt tmp/distance/step1.txt
DISTANCE DOWN   31 -> 12 (-19)
    kind typecheck 29 -> 10 (-19);  class V2 17 -> 0 (-17);  class OT 9 -> 7 (-2)
$ python3 explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/distance/step1/errors.tsv
landed 31 now 12
GONE Col…, GONE Row…, GONE "Array1[\T,0,s0\] … Vector[\T,s0\]" x8, GONE "…Vector[\T,s1\]", GONE "Array2… Matrix" x5, GONE the 3 OR(...) arms
export 'does not define all declarations': landed 17 entries, now 14
  entry GONE array3[\T,nat s0,nat s1,nat s2\]():…;  entry GONE immutableArray(x,y);  entry GONE immutableArray(x,y,z)
export 'are not matched by the declarations': landed 44 entries, now 44
```

**Gone, 19 sites, at their landed lines:**
- the 14 bodies: `:2526`, `:2528`, `:2529`, `:2530`, `:2532`, `:2596`, `:2598`, `:2903`, `:2908`, `:2839`, `:2841`, `:2842`, `:2843`, `:2977`;
- the 3 factory arms: `:2551`, `:2562`, `:2946`;
- `Col` `:2697` and `Row` `:2701`.

**Come:** none.

**4f clears `array3`'s export entry.** The note had left that unknown. This and 4d's two entries are attributed by reading: 4d and 4f are the only edits that name those declarations, and neither was run alone.

**The 12 that stay**, all on the landed list:
- the 2 export errors at `:12`;
- `:642` three times, and `:643`;
- `:4368` and `:4374`;
- `:4540` and `:4556`;
- `:1463`;
- `List.fss:146`.

## Step 2: E3 re-based (`e3-rebased.patch`)

**Where the patch came from.** The brief's path is not in today's tree: `84aef6a4f` ("Cleaning by kind") removed it. I took it from `84aef6a4f^`. That copy was last written by `2a7709c31`; the note's citation of `fb10482ba` is wrong, since that commit touches only `array-design-ways.md`.

**The re-base.** `T extends Number` is respelled as `T extends { Number, MultiplicativeRing[\T\] }`, and nothing else changes. It applies to today's api at offset 66 with no fuzz. A check that the changed lines are the old patch's with the bound respelled printed "changed lines are the old patch's with the bound respelled". It has 17 lines:
- the vector `+`, `-` and unary `-` drop `nat m`;
- the 6 vector products drop `nat m, nat p`;
- the 8 matrix-vector, vector-matrix and scalar products drop `nat p`.

**The distance:**
```
$ explorations/coordinator/tools/distance/run.sh tmp/distance/step2.txt tmp/distance/step2
#total 11 | typecheck 10, export 1 | X1 1, BR 2, GF 1, OT 7 | #crash none | #seconds 155 (shared the machine with walk/mG runs)
$ compare.sh tmp/distance/step1.txt tmp/distance/step2.txt  ->  DISTANCE DOWN 12 -> 11 (-1); kind export 2 -> 1
$ compare-sites.py step1 step2 -> GONE the first export error; its entries 14 -> 0 (7 DOT, 7 juxtaposition); second error 44 -> 44
```

Against the landed list, 31 → 11.

**The first export error's 17 entries.** All 17 clear:
- E3 clears the 14 products;
- 4d (in step 1) cleared the two `immutableArray` ranks;
- `array3`'s entry cleared in step 1, by 4f. E3 does not touch `array3`.

E3's three vector `+`/`-` lines were never entries of the error.

## Step 3: 4b (`dead-sizes-in-component.patch`, 14 component headers)

The headers get `nat n, nat m, nat p`: the 6 vector products at `fss:2603-2618`, and the 8 others at `:2992-3014`. The component has no top-level vector `+` or `-`, so the api's 3 dead sizes there have no header to copy into. The tree was step 1, with E3 reverted (`git apply -R`; afterwards `git diff` equalled `ways.patch`), then 4b.
```
$ explorations/coordinator/tools/distance/run.sh tmp/distance/step3.txt tmp/distance/step3
#total 11 | typecheck 10, export 1 | #crash none | #seconds 133
$ diff <(cut -f1,6,7 tmp/distance/step2/errors.tsv) <(cut -f1,6,7 tmp/distance/step3/errors.tsv) && echo identical
step 2 and step 3 lists identical, line numbers included
```

4b clears the same 14 entries and brings no new site. C4's three `DOT` refusals (cleared by E3, left by 4b, per the note) are not in the distance and were not measured.

## Step 4: walk and microGPT, steps 1+2

**Walk.** I ran 40 tests: the files in `ProjectFortress/tests/` whose text holds `Vector`, `Matrix` or `DOT`, plus `subArray` and `Array2SubscriptInBounds`. That covers the brief's 7, and matches the note's "about 40"; whole-word matching would give 31, all among the 40. None has a `.test` file. All 40 ran in one harness call per tree, each from an empty cache.
```
$ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/walk/h-new <40 files>
# harness-one …; tree ea0a1f0a8; …; FORTRESS_THREADS=4; cache empty
OK (40 tests)   exit=0        (base worktree, same command: OK (40 tests) exit=0)
$ python3 explorations/perf-probes/array-sites/compare-walk.py <base> <new>
equal after masks: 36 of 40
DIFFERS HeapTest, QuickCheckTest, FixedWidthOverflowRungB, RationalTest; ORDER ONLY RangePrototype
```

The differences are not values:
- `HeapTest` prints `nanoTime` timings (`HeapTest.fss:108-115`), and `QuickCheckTest` prints random draws. Both are on `coordinator/tools/count-run/unstable.txt`, the record's list of tests that vary from run to run.
- `FixedWidthOverflowRungB` and `RationalTest` differ by the blank line the harness prints after whichever test runs last; the shuffled order differs per tree.
- `RangePrototype` prints the same lines in another order, from four threads.

`XXXArrayInferredElementVectorWalk` still fails as expected.

**microGPT** (`explorations/coordinator/tools/mg-run.sh tmp/mg/new steps12`, and the same on the base):
- MicroGptFlatQuick: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, rc=0, on both trees.
- MicroGptAplQuick: the same verdict, rc=0, on both trees.

The outputs differ only in the load average, the Rats! parser paths and the timings. For example, `batch 1 step 2 loss 3.424272783871772 vs 3.424272783871772 … diff 0.0 PASS` appears on both. No model line changed.

## Text of a way that I had to change or fill in

- **`Row`'s cast type:** `Array2[\T,0,1,0,s1\]`. The note gives only `Col`'s. The range subscript's result is 0-based (`fss:2668-2675`), so this is the twin. `subArray.fss:80` and `Array2SubscriptInBounds.fss:20` exercise it.
- **`array3(v)`'s result type** comes from the component's header (`fss:3183`).
- **The E3 patch's location and commit**, as above.
- **Placement:** `fill`/`tabulate` open the trait in the component and close it in the api. This is form only.

## Decisions and points

- **"Whether any value moves"** I read as a comparison with a base run, in a seeded worktree at `ea0a1f0a8`. I did not use `count-run.sh`, because it runs every interpreter test, a whole suite.
- **No curator decision was needed or taken.** E3 is applied nowhere; it stays the diff that P-40 holds for the curator.
- **Defects:** none.
- **Spec sentences made false:** none.
- **Questions for the curator:** none new. Choosing between E3 and 4b is the note's existing question; this probe adds only that both measure the same.

**For FACTS (hand-over):**
- On `ea0a1f0a8`, the note's no-decision ways as one patch take the distance from 31 to 12. They clear all 19 typecheck sites of the array code (V2 17, OT 2) and 3 of the first export error's entries.
- E3, or 4b, then clears the remaining 14 entries, for 11, and neither brings a site. What is left of the array code is the second export error (44 entries).
- With E3, walk's 40 tests and microGPT's quick pair are unchanged.
- Test: the distance stage with these patches, and the commands above.

## Commands I worked out
- `explorations/perf-probes/array-sites/compare-sites.py <before.tsv> <after.tsv>`: compares two site lists with line numbers masked, and the export errors entry by entry.
- `explorations/perf-probes/array-sites/compare-walk.py <base> <new>`: compares two harness-one outputs test by test, with the gate's masks.
- `git show 84aef6a4f^:explorations/reviews/decision-d-diff/rebase-2026-09-29/library-e3.patch` recovers the E3 patch.

## Machine and state
- Machine: nproc 4, Xeon @ 2.10GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1` for the distance stage. Loads at start were 0.22, 0.98 and 3.11. Step 2's run shared the machine with the walk and microGPT runs, so its seconds measure nothing.
- Each patch applies alone to `ea0a1f0a8` (`git apply --check`), and the other two apply after `ways.patch`.
- The worktree `/home/user/fortress-probe-array-sites` is left clean (Library restored) on `wip/probe-array-sites`. The scratch base worktree and the parser directories are removed.
