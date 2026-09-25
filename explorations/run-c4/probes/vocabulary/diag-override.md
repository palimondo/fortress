# The diagonal's product as an override of `mul`

Probe for row 39 of the re-approval table (POSITIONS 2026-09-24): the
microGPT vocabulary's `Diag[\nat s\]` stays a subtype of the library's
`Matrix[\RR64,s,s\]` and gets its row-scaling product back by overriding
`mul`, the method the library's `Matrix Matrix` juxtaposition and `DOT`
forward to (`Library/FortressLibrary.fss:2627-2633`; `mul` declared at
`Library/FortressLibrary.fsi:1590`, body `Library/FortressLibrary.fss:2512-2553`).
Shape 3 (the override) was tried first and passed, so shape 1 (a plain
`Diag` and the old operator) was not built. Interpreter path only; no library
file and no model line changed. Runs on 2026-09-25 between 21:34:40Z and
22:20:30Z, every time below from `date -u`.

## Result

- Shape 3 loads and runs in both vocabularies at the first attempt. The
  interpreter refused nothing: no overload, override or return-type message.
- The api needs no `mul` line. Both `.fsi` files keep
  `object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\] end`,
  and the override is reached from other components through that
  declaration. Listing `mul` in the api was not tried, because nothing called
  for a variation.
- The declared result `Matrix[\RR64,s,s2\]` was accepted. The body's static
  type is `Array2[\RR64,0,s,0,s2\]` (what `ivmap` returns,
  `Library/FortressLibrary.fsi:1576`), which is the same step the library's
  own `opr +` on `Matrix` takes (`Library/FortressLibrary.fss:2506-2507`). At
  run time the value is a `Matrix`, because `ivmap` fills
  `other.replica[\RR64\]()`, and for a numeric element type that is
  `array2`, which makes a `matrix` (`Library/FortressLibrary.fss:2606-2608`).
- `MicroGptFlatCheck` and `MicroGptAplCheck`, each run from an empty cache:
  40 PASS, 0 FAIL on today's tree and 40 PASS, 0 FAIL with the override.
  Every non-timing line is the same in all four runs, and the baseline lines
  match the committed captures of 2026-09-19
  (`run-c4/cold-cache/repair/MicroGptFlatCheck-threads1.txt`,
  `MicroGptAplCheck-threads1.txt`).
- On the diagonal's line the override costs what the operator it replaces
  cost: 14 against 13 ms at n = 16 and 52-55 against 52-53 ms at n = 64, in
  the same run. The library's product over a plain view costs 203-215 and
  3001-3126 ms there, 14-15x and 57-58x.
- The library's operator does dispatch to the override. A right factor that
  counts calls of its `replica` shows one call per product through the
  vocabulary's `Diag` (juxtaposition, a function with `Matrix`-typed
  parameters, and `DOT`) and none through a plain view.

## The four files (the final shape, uncommitted in the working tree)

```diff
diff --git a/explorations/apl/mg/FlatArrays2.fsi b/explorations/apl/mg/FlatArrays2.fsi
index d93d809b6..7df8def3c 100644
--- a/explorations/apl/mg/FlatArrays2.fsi
+++ b/explorations/apl/mg/FlatArrays2.fsi
@@ -19,8 +19,9 @@
    Kept from C4 and not from the sketch: the four constructors, because
    FlatData2, AplMg, the model and the check call them; the matrix transpose,
    because the grammar's ⍉ rule writes a call and a postfix ^T may not follow
-   one (rows 144, 158, 293); and the Diag product operator, because the
-   diagonal as a Matrix view costs 13-54x on its line (row 291).
+   one (rows 144, 158, 293); and the row-scaling Diag product, now Diag's own
+   mul, because the library's product over a plain Matrix view costs 13-54x
+   on its line (row 299).
    39 declarations against C4's 38 and the sketch's 28. *)
 api FlatArrays2
 
@@ -74,8 +75,8 @@ log[\T extends Number, I\](a: Array[\T,I\]): Array[\RR64,I\]
 (* ----------------------------------------------------- the diagonal ------
    diag(v) m scales the rows of m: the Dyalog's v ×⍤0 1 m.  The s of the
    diagonal IS the row count of the matrix.  The diagonal is a read-only
-   Matrix view of its own s x s shape, so the product is the library's and
-   needs no declaration here. *)
+   Matrix view of its own s x s shape; the library's product forwards to its
+   mul, which scales the rows, and the overriding mul needs no line here. *)
 object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\] end
 diag[\nat s\](v: Vector[\RR64,s\]): Diag[\s\]
 
diff --git a/explorations/apl/mg/FlatArrays2.fss b/explorations/apl/mg/FlatArrays2.fss
index 6b33e3479..c2a533b2c 100644
--- a/explorations/apl/mg/FlatArrays2.fss
+++ b/explorations/apl/mg/FlatArrays2.fss
@@ -40,12 +40,14 @@ log[\T extends Number, I\](a: Array[\T,I\]): Array[\RR64,I\] = a.map[\RR64\](log
 
 (* ----------------------------------------------------- the diagonal ------ *)
 (* the s of the diagonal is the row count of the matrix; a read-only Matrix
-   view, so its product is the library's *)
+   view whose own mul, which the library's product forwards to, scales the rows *)
 object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\]
     get(ij: (ZZ32,ZZ32)): RR64 = do (i, j) = ij; if i = j then d[i] else 0.0 end end
     put(ij: (ZZ32,ZZ32), x: RR64): () = fail("a diagonal is read-only")
     init0(ij: (ZZ32,ZZ32), x: RR64): () = fail("a diagonal is read-only")
     replica[\U\](): Array2[\U,0,s,0,s\] = array2[\U,s,s\]()
+    mul[\nat s2\](other: Matrix[\RR64,s,s2\]): Matrix[\RR64,s,s2\] =
+        other.ivmap[\RR64\](fn (ij: (ZZ32,ZZ32), e: RR64): RR64 => do (i, j) = ij; d[i] e end)
 end
 diag[\nat s\](v: Vector[\RR64,s\]): Diag[\s\] = Diag[\s\](v)
 
diff --git a/explorations/run-c4/src/FlatArrays.fsi b/explorations/run-c4/src/FlatArrays.fsi
index bb725c8c3..5d5f98798 100644
--- a/explorations/run-c4/src/FlatArrays.fsi
+++ b/explorations/run-c4/src/FlatArrays.fsi
@@ -19,7 +19,7 @@ opr >[\I\](a: Array[\RR64,I\], s: RR64): Array[\RR64,I\]
 opr SQRT[\I\](a: Array[\RR64,I\]): Array[\RR64,I\]
 exp[\I\](a: Array[\RR64,I\]): Array[\RR64,I\]
 log[\I\](a: Array[\RR64,I\]): Array[\RR64,I\]
-(* diag(v) m scales the rows of m: a read-only Matrix view, the product the library's *)
+(* diag(v) m scales the rows of m: a read-only Matrix view whose own mul, which the library's product forwards to, is the row scaling *)
 object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\] end
 diag[\nat s\](v: Vector[\RR64,s\]): Diag[\s\]
 
diff --git a/explorations/run-c4/src/FlatArrays.fss b/explorations/run-c4/src/FlatArrays.fss
index b9c1da556..f156bd976 100644
--- a/explorations/run-c4/src/FlatArrays.fss
+++ b/explorations/run-c4/src/FlatArrays.fss
@@ -31,12 +31,15 @@ opr SQRT[\I\](a: Array[\RR64,I\]): Array[\RR64,I\] = a.map[\RR64\](fn (e: RR64):
 exp[\I\](a: Array[\RR64,I\]): Array[\RR64,I\] = a.map[\RR64\](fn (e: RR64): RR64 => exp(e))
 log[\I\](a: Array[\RR64,I\]): Array[\RR64,I\] = a.map[\RR64\](fn (e: RR64): RR64 => log(e))
 (* diag(v) m scales the rows of m: the Dyalog's v ×⍤0 1 m.  A diagonal is a
-   read-only Matrix view, so its product is the library's. *)
+   read-only Matrix view; the library's product forwards to its mul, which
+   scales the rows without forming the matrix. *)
 object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\]
     get(ij: (ZZ32,ZZ32)): RR64 = do (i, j) = ij; if i = j then d[i] else 0.0 end end
     put(ij: (ZZ32,ZZ32), x: RR64): () = fail("a diagonal is read-only")
     init0(ij: (ZZ32,ZZ32), x: RR64): () = fail("a diagonal is read-only")
     replica[\U\](): Array2[\U,0,s,0,s\] = array2[\U,s,s\]()
+    mul[\nat s2\](other: Matrix[\RR64,s,s2\]): Matrix[\RR64,s,s2\] =
+        other.ivmap[\RR64\](fn (ij: (ZZ32,ZZ32), e: RR64): RR64 => do (i, j) = ij; d[i] e end)
 end
 diag[\nat s\](v: Vector[\RR64,s\]): Diag[\s\] = Diag[\s\](v)
 
```

The `mul` body is the old operator's (`git show
8590d7a9e^:explorations/run-c4/src/FlatArrays.fss`, lines 40-43), applied to
`other` with `d` in scope. The comment lines rewritten are the ones that said
the product is the library's (`FlatArrays.fss:34-35`, `FlatArrays.fsi:22`,
`FlatArrays2.fss:43`, `FlatArrays2.fsi:78-79`). The header of
`FlatArrays2.fsi` (lines 22-24 now) still named "the Diag product operator" and
cited row 291 for the cost. The cost is ledger row 299; row 291 is now a
compiler row. One line that went stale with `8590d7a9e` and is not about the
diagonal was left alone: `FlatArrays2.fsi:25`, "39 declarations against C4's
38 and the sketch's 28", has not been recounted since the seven drops.

## Checks from an empty cache

Method: `explorations/run-c4/README.md` (C4 from `run-c4/src`) and the header
of `explorations/apl/mg/MicroGptAplCheck.fss` (APL from `apl/mg`),
`../../../bin/fortress <Check>.fss`, `source explorations/experiment/env.sh`
(threads 1, `-Xmx4g -Xss64m`). The empty cache is a freshly created private
directory given as `FORTRESS_CACHES` and `-Dfortress.caches`, with a private
`java.io.tmpdir`. This is the method of the 2026-09-19 repair runs
(`run-c4/cold-cache/CAPTURES.md`, `ROWS.md`). `default_repository/caches` was
not touched; its interpreter caches were empty before and after. The two checks
of each pair ran at the same time on the machine's four cores, so the
baseline pair and the override pair ran under the same load.

| program | shape | capture (`run-c4/cold-cache/diag-override/`) | start / end (UTC) | verdict | check total | batch-4 loss line |
|---|---|---|---|---|---|---|
| `MicroGptFlatCheck` | today (plain view) | `flatcheck-baseline.out` | 21:34:40 / 21:52:39 | 40 PASS, 0 FAIL | 1034 s | 33871 ms |
| `MicroGptAplCheck` | today (plain view) | `aplcheck-baseline.out` | 21:34:40 / 21:51:53 | 40 PASS, 0 FAIL | 968 s | 32013 ms |
| `MicroGptFlatCheck` | override | `flatcheck.out` | 21:53:20 / 22:09:31 | 40 PASS, 0 FAIL | 937 s | 29352 ms |
| `MicroGptAplCheck` | override | `aplcheck.out` | 21:53:20 / 22:08:55 | 40 PASS, 0 FAIL | 884 s | 27688 ms |

The comparison takes each capture's lines containing PASS, FAIL or the
header, with the `(NNNN ms)` step timings removed: 42 lines each, identical
across the four captures and identical to the two committed repair captures.
The losses, gradient differences, Adam differences and finite-difference
values are the same to the last digit. The override does, per element, the
one multiply `d[i] e` the operator did. The plain view's full product adds
exact zeros to that same product, which is why it gave the operator's lines
on 09-19 (commit `8590d7a9e`; `reviews/c4-flatarrays-review.md`, around line
136) and today's baseline gives them too.

The timings are recorded, not judged. The override takes 4.3-4.5 s off the
batch-4 step in both programs and 84-97 s off each check total. The APL
check's rise from its committed 420 s to 926 s on 2026-09-19 (`ROWS.md`,
"which is where to look first") therefore comes mostly from something other
than the diagonal: with the override it is still 884 s.

## Rows, not columns

`v07b_diag_override.out` line (4): `(diag(v) m).get((2,1)) = 18.0`, and
`v[2] m[2,1] = 18.0` for `v = (1,2,3)`, `m[i,j] = 2i + j + 1`. Lines (1)-(3)
print the same 3 x 2 matrix, `[1 2; 6 8; 15 18]`, for the plain view, the
override and the old operator. `v07c_diag_dispatch.out` line (6):
`(diag(v) cm).get((2,1)) = 18.0`, where column scaling would give
`v[1] cm[2,1] = 12.0`. The 40 check lines, identical to the baseline, are
the model-scale confirmation: `MicroGptFlat.fss:63`,
`dL = diag(vm / nv) (pr - onehot(tg, vocabSize))`, feeds every gradient
check.

## The override is reached, not merely present

`run-c4/probes/vocabulary/v07c_diag_dispatch.fss` (+ `.out`, 21:53:40Z,
exit 0) uses a right factor `CountingM` whose `replica` increments a counter.
The override builds its result with `other.ivmap`, which calls
`other.replica`. The library's `mul` builds its result with `matrix()` and
reads the right factor only through `get`. So the counter moves exactly when
the override ran:

```
(0) replicas before any product: 0
(1) diagM(v) cm, the plain view: replicas 0; row 2 = 15.0 18.0
(2) diag(v) cm, FlatArrays' Diag: replicas 1; row 2 = 15.0 18.0
(3) viaMatrix(diag(v), cm), both typed Matrix: replicas 2; row 2 = 15.0 18.0
(4) diag(v) DOT cm: replicas 3; row 2 = 15.0 18.0
(5) viaMatrix(diagM(v), cm), the plain view again: replicas 3; row 2 = 15.0 18.0
```

`viaMatrix[\nat n, nat m, nat p\](a: Matrix[\RR64,n,m\], b: Matrix[\RR64,m,p\]) = a b`
receives the `Diag` as a `Matrix`, and the library's juxtaposition still
reaches `Diag.mul`. The APL vocabulary's `Diag` is the same code, and its
timing below (Time2b, 57 ms) shows the same dispatch there.

## Timings against row 299

Method: the committed runner `run-c4/probes/vocabulary/run.sh` (env.sh,
threads 1, source path `.` then `run-c4/src` then the shipped libraries, run
from the probe directory, last line `exit N  (S s)`). The difference: each run
used a freshly created private cache and wrote to a named file, so no
committed `.out` was overwritten. Nothing else ran on the machine during
these runs.

- `v07b_diag_override.fss` is `v07_diag_matrix.fss` with a third diagonal:
  DiagM (v07's plain view, the library's product), FlatArrays' `Diag` (now
  the override) and DiagOp (a plain object with the operator of
  `8590d7a9e^`, as the reference in the same run). Same shapes and
  repetitions as v07 (n = 16 x 200, n = 64 x 50, 27 columns). It was run
  twice, 22:09:56Z-22:13:45Z and 22:13:56Z-22:17:40Z. Both runs are in
  `v07b_diag_override.out`, each ending with its own exit line.
- `Time1b.out` (22:17:45Z-22:18:41Z) is `Time1.fss` unchanged, through
  `run-c4/src/FlatArrays` with the override.
- `Time2b.out` (22:19:34Z-22:20:30Z) is the body of `Time2.fss` through
  `apl/mg/FlatArrays2` with the override. `Time2.fss` itself imports the
  vocabulary review's sketch `FlatArrays2` in its own directory, and the
  interpreter always puts the main file's directory at the head of the source
  path (`Shell.sourcePath`, `ProjectFortress/src/com/sun/fortress/Shell.java:1175-1189`).
  So a byte-identical copy of `Time2.fss` was run from a scratch directory
  with `apl/mg` first on the source path. Run in place, it stops before
  timing anything, as described below.

| measurement | 2026-09-15 (row 299) | 2026-09-25, same run |
|---|---|---|
| n = 16, plain view (library product) | 94 ms (v07) | 203, 215 ms |
| n = 16, row scaling | 7 ms (the operator, v07) | override 14, 14 ms; operator 13, 13 ms |
| n = 64, plain view (library product) | 1379 ms (v07); 1499 ms (Time2, sketch) | 3126, 3001 ms |
| n = 64, row scaling | 22 ms (the operator, v07); 26 ms (Time1) | override 55, 52 ms; operator 53, 52 ms (v07b); override 55 ms (Time1b, C4), 57 ms (Time2b, APL) |
| ratio view / row scaling, n = 16 | 13x (v07) | 14-15x |
| ratio view / row scaling, n = 64 | 63x (v07), 58x (Time2 against Time1); row 299 and the review say 54x | 57-58x |

The absolute numbers of 2026-09-25 are about twice those of 2026-09-15
everywhere, including in columns that never touch the diagonal. Time1b
against Time1: row lifts 84/88/512/349 against 47/44/258/173 ms, `t t^T`
2382 against 1087, the elementwise chain 95 against 40. The factor is 1.8-2.4
across the board, and a rerun of Time1 with the old default heap
(`-Xmx256m -Xss32m`) gave the same figures, so the heap setting is not the
cause. It was not looked into further. The comparison that does not depend on
the day is within one run: the override costs what the operator costs, to
within 2 ms, and the plain view costs 14-15x at n = 16 and 57-58x at n = 64.

Seen on the way, not part of the question: run in place against today's
library from an empty cache (22:18:47Z-22:19:07Z, exit 1), `Time2.fss`
stops at its first `+` (`Time2.fss:12:77`, the `3 i + j` of its first
`fill`). The interpreter checks the `+` of the review's sketch vocabulary
(`run-c4/probes/vocabulary/FlatArrays2.fss:99`, a `Matrix` plus a rank-3
array) against the library's `AdditiveGroup` `+`:

```
com.sun.fortress.exceptions.ProgramError: /home/user/fortress/Library/FortressLibrary.fss:333:5-28: and
/home/user/fortress/explorations/run-c4/probes/vocabulary/FlatArrays2.fss:99:1-105:28:

AdditiveGroup[\T extends AdditiveGroup[\T\]\](uninstantiated)[\T extends AdditiveGroup[\T\]\].+(self:AdditiveGroup[\T\],other:T):T/home/user/fortress/Library/FortressLibrary.fss:333:5-28 and
+[\nat r,nat c\](m:Matrix[\FortressLibrary.RR64,r,c\],t:Array[\FortressLibrary.RR64,(FortressLibrary.ZZ32, FortressLibrary.ZZ32, FortressLibrary.ZZ32)\]):Array[\FortressLibrary.RR64,(FortressLibrary.ZZ32, FortressLibrary.ZZ32, FortressLibrary.ZZ32)\]/home/user/fortress/explorations/run-c4/probes/vocabulary/FlatArrays2.fss:99:1-105:28 have parameters
with generic type, at least one pair of parameters must have excluding types
```

So `Time2.fss` no longer runs in place from an empty cache. `Smoke2.fss`
imports the same sketch and was not tried. The sketch is not one of the
vocabularies this probe changes, and the refusal was not pursued.

## Conclusion

The override shape works as the type system promises. `Diag` stays a
`Matrix[\RR64,s,s\]`, so it can be passed anywhere a matrix is expected. Its
`mul`, two lines in each vocabulary's `.fss` and nothing in either api,
replaces the library's full product for every product the library forwards to
`mul`: juxtaposition and `DOT`, called directly or through `Matrix`-typed
parameters. It computes each element once, `d[i] m[i,j]`, which scales rows,
and it costs what the dedicated operator cost, one fourteenth to one
fifty-seventh of the plain view on this line. Both check programs pass 40 of
40 from an empty cache with numbers identical to today's and to the
committed captures. Shape 1 is not needed.

## Files

- `explorations/run-c4/src/FlatArrays.{fss,fsi}`, `explorations/apl/mg/FlatArrays2.{fss,fsi}`: the override and the rewritten comment lines (uncommitted).
- `explorations/run-c4/probes/vocabulary/v07b_diag_override.fss` + `.out`, `Time1b.out`, `Time2b.out`: the timings.
- `explorations/run-c4/probes/vocabulary/v07c_diag_dispatch.fss` + `.out`: the dispatch.
- `explorations/run-c4/cold-cache/diag-override/flatcheck-baseline.out`, `aplcheck-baseline.out`, `flatcheck.out`, `aplcheck.out`: the four check captures.

## The machine

Added by the coordinator on 2026-09-25 at 22:37 UTC, after the runs: 4 CPUs, `Intel(R) Xeon(R) Processor @ 2.80GHz` (2800 MHz), load average 1.04 at that time with one other worker running, JDK 25, `FORTRESS_THREADS=1`; the VM had booted at 21:25 UTC that day. The 09-15 captures of row 299 name no machine.
