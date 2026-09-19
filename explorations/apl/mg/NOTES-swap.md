<!-- Worker notes for the swap of the focused base onto its own array
     vocabulary, 2026-09-15.  Plain record: what changed declaration by
     declaration, what the shared nats catch, what the interpreter refused. -->

# The swap: FlatArrays2 in the focused base

Pavol's decision, in his words: "we should use the nat parameters in our
operators, which makes sense", and "of course we should swap".  So the focused
base (`explorations/apl/mg/`) now stands on its own vocabulary,
`FlatArrays2.fsi`/`.fss` here, derived from the sketch of the vocabulary review
(`../../run-c4/probes/vocabulary/REPORT.md` and its `FlatArrays2`) with the
dimension equalities put back into the types as SHARED nat names.  Nothing in
the APL text changed; nothing outside this directory changed.

## The counts

| api | declarations | with the model's `^T` pair |
|---|---|---|
| C4's `FlatArrays.fsi` (`../../run-c4/src/`) | 38 | 40 |
| the review's sketch (`../../run-c4/probes/vocabulary/FlatArrays2.fsi`) | 36 | 30 |
| `FlatArrays2.fsi` here | **39** | **41** |

(the same filter the review used, `grep -cE '^(opr |object |[a-z][A-Za-z0-9]*(\[|\())'`)

The eleven declarations above the sketch are the four constructors, the matrix
`transpose`, the `Diag` product operator, the second rank of the dyadic row
lift, and the four extra ranks of the two elementwise operators that take two
arrays (`×` and the array-by-array `/` are three declarations each, one per
rank, instead of one index-generic declaration each); each has a reason below.
The last of these is Pavol's decision of the same day, which closes departure 5
below: the two operators state their shape agreement with shared nat names, the
way the six product and lift declarations already did.

## Declaration by declaration

"shared" names the nats that assert an agreement between two parameters;
"none" means the declaration carries no nat because it has nothing to agree
with, which is the review's rule for dropping them.

| # | declaration here | C4 | the sketch | nats here |
|---|---|---|---|---|
| 1-4 | `vec`, `zeros`, `keys`, `mat` | as here | dropped as habits | none |
| 5-15 | the 11 elementwise operators with ONE array parameter, `[\T extends Number, I\]` | `[\I\]`, `RR64` fixed | as here | none: a lone array has no second shape to agree with |
| 16-18 | `opr ×` over `Vector[\T,s\]`, `Matrix[\T,n,d\]`, `Array3[\T,0,p,0,n,0,d\]` | one `[\I\]` declaration | one index-generic declaration | **shared `s`** / **`n`, `d`** / **`p`, `n`, `d`**: the two arrays are of ONE shape |
| 19-21 | `opr /` (two arrays) over the same three ranks | one `[\I\]` declaration | one index-generic declaration | as #16-18 |
| 22-23 | `object Diag[\nat s\]`, `diag[\nat s\]` | as here | `Diag` a `Matrix` view | the `s` carries the diagonal's length into the type, for #24 |
| 24 | `opr juxtaposition[\nat s, nat c\](dg: Diag[\s\], m: Matrix[\RR64,s,c\])` | `[\nat s, nat r, nat c\]` | no operator | **shared `s`**: the diagonal's length IS the matrix's row count |
| 25 | `transpose[\nat r, nat c\](m: Matrix[\RR64,r,c\])` | as here | dropped (`m.t()`) | the result's shape, `c x r` |
| 26 | `transpose[\nat a, nat b, nat c\](t: Array3[…])` | as here | nat-free over `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]` | the result's shape; the `Array3` spelling is forced by the family (row 289) |
| 27-30 | `view`, `heads`, `unheads`, `plane` | one to five nats each | as here | none: one array argument, the shapes are run-time or come from `reflect` |
| 31 | `opr juxtaposition[\nat p, nat n, nat d, nat m\](x: Array3[\RR64,0,p,0,n,0,d\], y: Array3[\RR64,0,p,0,d,0,m\])` | six independent nats | nat-free | **shared `p` and `d`**: the same plane count, and x's columns are y's rows |
| 32 | `opr +[\nat p, nat n, nat d\](m: Matrix[\RR64,n,d\], t: Array3[\RR64,0,p,0,n,0,d\])` | five independent nats | `[\nat r, nat c\]` on the matrix only | **shared `n` and `d`**: the matrix's shape IS a plane's shape |
| 33 | `rows[\I\](f, a)` monadic | two declarations, by rank | as here (one `typecase`) | none: one array argument, nothing to agree with |
| 34 | `rows[\nat n, nat d\](f, x: Matrix[\RR64,n,d\], y: Matrix[\RR64,n,d\])` | `[\nat r, nat c, nat r2, nat c2\]` | one index-generic declaration | **shared `n` and `d`**: the rows are paired |
| 35 | `rows[\nat p, nat n, nat d\](f, x: Array3[…], y: Array3[…])` | six independent nats | (as #34) | **shared `p`, `n`, `d`** |
| 36 | `gather[\T extends Number\](m, ks)` | `[\T, nat r, nat c, nat k\]` | `[\T\]` | none: the keys index the rows, their count is free |
| 37 | `onehot(ks, width)` | `[\nat k\]` | as here | none |
| 38 | `pick[\nat k, nat c\](m: Matrix[\RR64,k,c\], ks: Vector[\ZZ32,k\])` | `[\nat r, nat c, nat k\]` | nat-free | **shared `k`**: one key per row of `m` |
| 39 | `flat(ms…)` | as here | as here | none |
| (40-41) | the model's `^T` pair, `MicroGptApl.fss` | as here (C4:23-24) | unchanged | the result's shape; the `Array3` spelling is the one place a family dispatches on rank (row 289) |

Twelve declarations carry a shared nat: #16-18 and #19-21 (the elementwise
`×` and `/`), #24, #31, #32, #34, #35, #38.  Every other nat in the api spells a
result's shape (#25, #26, the `^T` pair) or carries a size into a type that a
later declaration shares (#22, #23).  C4 writes 30 nat parameters over these
declarations and none of them agrees with another; here there are 29, and 25 of
them agree with a second parameter -- the twelve added by the six elementwise
rank declarations all agree, every one of them.

## What the shared nats catch: the mismatch probe

`mismatch_probe.fss`, output `checks/mismatch_probe.out`.  Case 0 is every
agreeing call; cases 1 and up are the mismatches, one per run, the case number
passed as `-Dmm=N` in `JAVA_FLAGS`.  Every mismatch is caught, at the call, and
every failing case was run twice (ledger row 98).

The file holds two runs, both kept.  The first is the run of the swap: six
agreeing calls in case 0, cases 1-7.  The second is the run after `×` and the
array-by-array `/` took their shared nats: twelve agreeing calls in case 0
(`(0g)` to `(0l)` are the six new ones, and all twelve run), and cases 8-13, a
wrong-shape `×` and a wrong-shape `/` at each of the three ranks.  **13 of 13
mismatches refused at the call, every one terminal, exit 1.**

| case | the mismatch | what the interpreter says |
|---|---|---|
| 1 | batched product, 4 planes against 2 | `Failed to find any matching overload, args = (HeadsView[\4,2,3\],HeadsView[\2,3,2\])` |
| 2 | batched product, plane counts agree, inner size 3 against 2 | `Failed to find any matching overload, args = (HeadsView[\4,2,3\],HeadsView[\4,2,2\])` |
| 3 | dyadic `rows`, a 4x3 matrix against a 5x3 | `Failed to find any matching overload, args = (…,__DefaultMatrix[\RR64,4,3\],__DefaultMatrix[\RR64,5,3\])`, and the three `rows` declarations printed in full, `x:Matrix[\RR64,n,d\],y:Matrix[\RR64,n,d\]` among them |
| 4 | dyadic `rows` at rank 3, 4 planes of 2x3 against 2 planes of 3x2 | as case 3, `args = (…,HeadsView[\4,2,3\],HeadsView[\2,3,2\])` |
| 5 | a 5x3 matrix onto 4 planes of 2x3 | `Failed to find any matching overload, args = (__DefaultMatrix[\RR64,5,3\],HeadsView[\4,2,3\])`, the candidates being the library's own `+` |
| 6 | a diagonal of 5 times a 4x3 matrix | `Failed to find any matching overload, args = (Diag[\5\],__DefaultMatrix[\RR64,4,3\])` |
| 7 | `pick`, 5 keys for a matrix of 4 rows | `Unification error: … Cannot unify __DefaultVector[\ZZ32,5\] … with Vector[\FortressLibrary.ZZ32,k\] … abm=c=(3,Any) k=(4,Any)` |
| 8 | elementwise `×` at rank 1, a vector of 4 against one of 5 | `Failed to find any matching overload, args = (__DefaultVector[\RR64,4\],__DefaultVector[\RR64,5\])`, and the three `BY` declarations of `FlatArrays2` printed in full, `a:Vector[\T,s\],b:Vector[\T,s\]` among them |
| 9 | elementwise `×` at rank 2, a 4x3 matrix against a 5x3 | `… args = (__DefaultMatrix[\RR64,4,3\],__DefaultMatrix[\RR64,5,3\])` |
| 10 | elementwise `×` at rank 3, 4 planes of 2x3 against 2 planes of 3x2 | `… args = (HeadsView[\4,2,3\],HeadsView[\2,3,2\])` |
| 11 | elementwise `/` at rank 1, a vector of 4 against one of 5 | `… args = (__DefaultVector[\RR64,4\],__DefaultVector[\RR64,5\])`, and all four `/` declarations of `FlatArrays2` printed, the three rank ones and the array-over-scalar one |
| 12 | elementwise `/` at rank 2, a 4x3 matrix against a 5x3 | `… args = (__DefaultMatrix[\RR64,4,3\],__DefaultMatrix[\RR64,5,3\])` |
| 13 | elementwise `/` at rank 3, 4 planes of 2x3 against 2 planes of 3x2 | `… args = (HeadsView[\4,2,3\],HeadsView[\2,3,2\])` |

Two verdicts on the brief's question.

**The failure is terminal, not catchable.**  Case 1 wraps its mismatched call
in `try … catch e  Exception => println "CAUGHT: " e  end`.  No `CAUGHT` line
and no line after the `try` is printed: the run ends with the
`com.sun.fortress.exceptions.ProgramError` above and exit status 1.  A shared
nat is a static promise checked at dispatch and enforced by stopping the
program; it is not an exception a program can handle.

**The diagnostic is better than "no matching overload" where the name is not
overloaded.**  `pick` is one declaration, so the interpreter goes straight to
unification and names the conflict: `k` was bound to 4 by the matrix and the
vector of 5 does not unify with it (case 7).  Where the name is overloaded the
message is the generic one, but it prints the argument types with their sizes
(`HeadsView[\4,2,3\]` against `HeadsView[\2,3,2\]`) and, for `rows`, the
declarations with their shared nats, so the mismatch is readable off the two
lines.  Ledger row 83's "uncatchable overload error" is confirmed for the
overloaded declarations and CORRECTED for the unoverloaded one, which fails
earlier and more precisely.

## Departures, each with its evidence

1. **The four constructors stay.**  The review calls `vec`, `zeros`, `keys`,
   `mat` habits, and they are; but `FlatData2` is FlatData with its import
   line changed and nothing else, and its loaders call `zeros`, `keys` and
   `vec`; `AplMg` calls `mat` and `keys`; the model and the check call `zeros`
   and `keys`.  Dropping them means rewriting FlatData's body, which the brief
   excludes.
2. **The matrix `transpose` stays.**  The review calls it a habit because the
   library's `m.t()` spells it.  In this base it is forced: the grammar's `⍉`
   rule writes `transpose((r))` around an arbitrary expression
   (`AplMgSyntax.fsi:253`), and `^T` may not follow a call (rows 144, 158).
   The model's `^T` pair is over it, as C4 has it.
3. **The `Diag` product stays an operator**, per the brief and row 291: the
   `Matrix`-view form costs 13x at n = 16 and 54x at n = 64.
4. **The dyadic row lift takes its rank pair back.**  The sketch merges the two
   ranks into one index-generic declaration with a `typecase`; a shape can only
   be named inside a rank, so stating "the two arrays have one shape" costs the
   merge.  The monadic lift, which has nothing to agree with, keeps the sketch's
   single declaration and its `typecase`.
5. ~~**The elementwise `×` and `/` do NOT state their shape agreement.**~~
   **CLOSED, same day, by Pavol's decision: they do.**  Their two arrays must
   agree, but the sizes are not in the index type, so stating it means
   rank-specialising.  Both routes were probed, cold:
   - the specialised declaration BESIDE the index-generic one, in one component,
     is refused (`elemwise_nat_probe.fss`, `checks/elemwise_nat_probe.out.0`):
     `BY[\T extends FortressLibrary.Number,nat n,nat d\](a:Matrix[\T,n,d\],b:Matrix[\T,n,d\]):Matrix[\T,n,d\] … and BY[\T extends FortressLibrary.Number,I\](a:Array[\T,I\],b:Array[\T,I\]):Array[\T,I\] … have parameters with generic type, at least one pair of parameters must have excluding types`
     (ledger row 159, now with the element-generic bound);
   - the three ranks with shared nats and NO index-generic declaration are
     accepted and all three run (`elemwise_rank_probe.fss`,
     `checks/elemwise_rank_probe.out`: `rank 1 4.0 rank 2 25.0 rank 3 121.0`).

   Pavol's decision: state the agreement, "the way the six product and lift
   declarations already do", even at three declarations per operator instead of
   one index-generic one.  So the index-generic `×` and the index-generic
   two-array `/` are gone, and in their place stand three declarations each over
   `Vector[\T,s\]`, `Matrix[\T,n,d\]` and `Array3[\T,0,p,0,n,0,d\]`, the shape
   shared between the two parameters, element-generic in `T extends Number`, each
   commented with what its nats assert.  The scalar forms of `/` are untouched:
   one array parameter, nothing to agree with, no nat.  The results keep the
   loose `Array[\T,…\]` type the index-generic form had, as every other
   nat-typed declaration in this api does -- only the parameters carry the shape,
   so no call site's static type changed.  The api goes from **35 declarations to
   39** (41 with the model's `^T` pair), and the twelve new nat parameters all
   agree with a second parameter.

   What it bought and what it cost, measured: six more mismatches refused at the
   call (cases 8-13 of the mismatch probe, all terminal, exit 1), and nothing
   else moved -- the model's five losses, the forward-pass diff and all 40 checks
   are unchanged, byte for byte where they are comparable (the runs below).  The
   APL text did not change; no caller changed.
6. **The two vocabularies cannot stand in one component**, so the forward-pass
   diff is against the previous run's values.  `diag_fwd.fss` was first adapted
   to import C4's `FlatArrays` beside `FlatArrays2` under aliases
   (`import FlatArrays.{transpose => transposeC4, …}`); the import is accepted
   by the parser and the program is then refused
   (`checks/diag_fwd_two_vocabularies_rejected.out.0`):
   `rows[\I\](…):Array[\RR64,I\] …/apl/mg/FlatArrays2.fss:122:1-139:6 and rows[\nat a,nat b,nat c\](…) …/run-c4/src/FlatArrays.fss:153:1-158:4 have parameters with generic type, at least one pair of parameters must have excluding types`.
   An alias renames the reference, not the declaration: the two apis' `rows`
   declarations are checked as one overload family.  (A bare `import FlatArrays`
   for qualified names is a syntax error; the form the parser wants is
   `import api FlatArrays`, which imports the api, not its names.)
   So `diag_fwd.fss` is the previous run's file with its two import lines
   changed and nothing else, and its output must reproduce the previous run's
   digit for digit -- which it does, byte for byte
   (`checks/diag_fwd_flatarrays2.out` against `checks/diag_fwd.out`).
7. **The model gained the `^T` pair.**  The focused base had none: the APL text
   reaches the transposes through the grammar, which writes a call.  The pair is
   back in `MicroGptApl.fss`, C4:23-24 verbatim, over FlatArrays2's two
   `transpose`s, as the brief asks and because it is the one signature where the
   `Array3` spelling dispatches (row 289).  It is declared and unused by the APL
   text.

Nothing else had to be bent.  No shared nat had to be dropped because the
interpreter refused it: every one of the six was accepted cold and every one of
them dispatches on the model's real shapes.

## The runs

All from this directory, walk interpreter, JDK 25, `FORTRESS_THREADS=1`, source
path `.:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library`
-- **run-c4/src is not on it**, and no file in this directory imports
`FlatArrays` or `FlatData` any more.

| what | file | verdict |
|---|---|---|
| the vocabulary called with agreeing shapes, every declaration | `vocab_probe.fss` | 14 lines, all as expected |
| the model, five losses | `checks/model_run_flatarrays2.out` | identical to `checks/model_run.out` to the last digit |
| the forward pass, APL against C4's lines | `checks/diag_fwd_flatarrays2.out` | byte-identical to `checks/diag_fwd.out`: every intermediate maxdiff 0.0, the loss diff 0.0, every printed sum equal |
| the dimension mismatches | `checks/mismatch_probe.out` | 7 of 7 caught, terminal, exit 1 |
| the check smoke | `checks/check_smoke_flatarrays2_threads1_40of40.out` | `VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS`, 427 s; every check line, every measured difference included, is IDENTICAL to the FlatArrays run (`checks/check_smoke_threads1_complete_40of40.out`, 454 s) with only the per-check times differing |

And again after the elementwise `×` and `/` took their shared nats (departure 5
closed), same conditions, caches wiped first:

| what | file | verdict |
|---|---|---|
| the vocabulary called with agreeing shapes | `vocab_probe.fss` | the same 14 lines, unchanged |
| the model, five losses | `checks/model_run_elemwise_nats.out` | `3.3659669475848513 3.424272783871772 3.177802125458053 3.066355684224198 3.2208830897506235`, identical to `checks/model_run.out` to the last digit |
| the forward pass, APL against C4's lines | `checks/diag_fwd_elemwise_nats.out` | byte-identical to `checks/diag_fwd_flatarrays2.out` and to `checks/diag_fwd.out` (same md5): every intermediate maxdiff 0.0, the loss diff 0.0 |
| the dimension mismatches | `checks/mismatch_probe.out`, second run | 13 of 13 caught, terminal, exit 1; the twelve agreeing calls of case 0 all run |
| the check smoke | `checks/check_smoke_elemwise_nats_threads1_40of40.out` | `VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS`, 437 s; every check line, every measured difference included, is IDENTICAL to the run above with only the per-check times differing |

A cold first run failed twice here with a bogus overload conflict against a
declaration nobody had touched (`MAX` against the library's
`StandardTotalOrder.MAX`, and `BY` against `MultiplicativeRing.BY`); the second
run of the same file was green both times.  Ledger row 98, again: run twice
before believing.

Corrected 2026-09-19: the conflict was not bogus and "run twice" was not the
answer.  The interpreter's verdict was right -- the pairs are illegal
overloadings under `Specification/basic/overloading.tex:100-105` and the Meet
Rule of `advanced/overloading.tex:247-262` -- and the cache hid it, because a
component is written to `interpreter_cache` before the check runs on it and is
never re-checked (ledger rows 341, 342).  The repair is in the standard library,
commit 02d09a39f: `FlatArrays2` no longer declares the scalar extension of
`+`, `-` and `MAX`, nor the `Diag` product, all of which the library now
serves, and `Diag` is a read-only `Matrix` view.  The check is 40 PASS at the
FIRST run of an empty cache, at one and at four threads, every non-timing line
identical to `checks/threads1_flatarrays2.txt` and `checks/threads4_flatarrays2.txt`
(`../../run-c4/cold-cache/repair/MicroGptAplCheck-threads{1,4}.txt`).

Per-step times, ms.  The model was run twice (ledger row 98's discipline), the
first run on a cold cache for every component in this directory:

| step | FlatArrays2, run 1 (cold) | FlatArrays2, run 2 | FlatArrays (`checks/model_run.out`) |
|---|---|---|---|
| 1 | 4491 | 3682 | 4308 |
| 2 | 4427 | 3902 | 4001 |
| 3 | 4066 | 3952 | 3856 |
| 4 | 4401 | 3946 | 4223 |
| 5 | 4211 | 3861 | 4134 |
| mean | 4319 | **3869** | **4104** |

With the shared nats on `×` and `/` the same five steps were 4302, 4110, 3571,
3812, 3882 ms (mean 3935) on the second run, against 3869 above.

The two runs of the same code differ by 10 %, which is the size of the effect
being looked for, so these five steps say nothing about cost either way; the
check smoke, 116 steps, ran 427 s before the elementwise nats and 437 s after,
against the FlatArrays run's 454 s.  The review measured the pieces that changed
(the row lift about 2 %, the `diag` operator kept because dropping it costs
5 %).  The comparison that settles cost
is the coordinator's two recorded check runs.
