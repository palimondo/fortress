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
| the review's sketch (`../../run-c4/probes/vocabulary/FlatArrays2.fsi`) | 28 | 30 |
| `FlatArrays2.fsi` here | **35** | **37** |

(the same filter the review used, `grep -cE '^(opr |object |[a-z][A-Za-z0-9]*(\[|\())'`)

The seven declarations above the sketch are the four constructors, the matrix
`transpose`, the `Diag` product operator and the second rank of the dyadic row
lift; each has a reason below.

## Declaration by declaration

"shared" names the nats that assert an agreement between two parameters;
"none" means the declaration carries no nat because it has nothing to agree
with, which is the review's rule for dropping them.

| # | declaration here | C4 | the sketch | nats here |
|---|---|---|---|---|
| 1-4 | `vec`, `zeros`, `keys`, `mat` | as here | dropped as habits | none |
| 5-17 | the 13 elementwise operators, `[\T extends Number, I\]` | `[\I\]`, `RR64` fixed | as here | none; the shared `I` is all the index type can say (see the departures) |
| 18-19 | `object Diag[\nat s\]`, `diag[\nat s\]` | as here | `Diag` a `Matrix` view | the `s` carries the diagonal's length into the type, for #20 |
| 20 | `opr juxtaposition[\nat s, nat c\](dg: Diag[\s\], m: Matrix[\RR64,s,c\])` | `[\nat s, nat r, nat c\]` | no operator | **shared `s`**: the diagonal's length IS the matrix's row count |
| 21 | `transpose[\nat r, nat c\](m: Matrix[\RR64,r,c\])` | as here | dropped (`m.t()`) | the result's shape, `c x r` |
| 22 | `transpose[\nat a, nat b, nat c\](t: Array3[…])` | as here | nat-free over `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]` | the result's shape; the `Array3` spelling is forced by the family (row 289) |
| 23-26 | `view`, `heads`, `unheads`, `plane` | one to five nats each | as here | none: one array argument, the shapes are run-time or come from `reflect` |
| 27 | `opr juxtaposition[\nat p, nat n, nat d, nat m\](x: Array3[\RR64,0,p,0,n,0,d\], y: Array3[\RR64,0,p,0,d,0,m\])` | six independent nats | nat-free | **shared `p` and `d`**: the same plane count, and x's columns are y's rows |
| 28 | `opr +[\nat p, nat n, nat d\](m: Matrix[\RR64,n,d\], t: Array3[\RR64,0,p,0,n,0,d\])` | five independent nats | `[\nat r, nat c\]` on the matrix only | **shared `n` and `d`**: the matrix's shape IS a plane's shape |
| 29 | `rows[\I\](f, a)` monadic | two declarations, by rank | as here (one `typecase`) | none: one array argument, nothing to agree with |
| 30 | `rows[\nat n, nat d\](f, x: Matrix[\RR64,n,d\], y: Matrix[\RR64,n,d\])` | `[\nat r, nat c, nat r2, nat c2\]` | one index-generic declaration | **shared `n` and `d`**: the rows are paired |
| 31 | `rows[\nat p, nat n, nat d\](f, x: Array3[…], y: Array3[…])` | six independent nats | (as #30) | **shared `p`, `n`, `d`** |
| 32 | `gather[\T extends Number\](m, ks)` | `[\T, nat r, nat c, nat k\]` | `[\T\]` | none: the keys index the rows, their count is free |
| 33 | `onehot(ks, width)` | `[\nat k\]` | as here | none |
| 34 | `pick[\nat k, nat c\](m: Matrix[\RR64,k,c\], ks: Vector[\ZZ32,k\])` | `[\nat r, nat c, nat k\]` | nat-free | **shared `k`**: one key per row of `m` |
| 35 | `flat(ms…)` | as here | as here | none |
| (36-37) | the model's `^T` pair, `MicroGptApl.fss` | as here (C4:23-24) | unchanged | the result's shape; the `Array3` spelling is the one place a family dispatches on rank (row 289) |

Six declarations carry a shared nat: #20, #27, #28, #30, #31, #34.  Every other
nat in the api spells a result's shape (#21, #22, the `^T` pair) or carries a
size into a type that a later declaration shares (#18, #19).  C4 writes 30
nat parameters over these declarations and none of them agrees with another;
here there are 17, and 13 of them agree with a second parameter.

## What the shared nats catch: the mismatch probe

`mismatch_probe.fss`, output `checks/mismatch_probe.out`.  Case 0 is every
agreeing call (all six run); cases 1-7 are the mismatches, one per run, the
case number passed as `-Dmm=N` in `JAVA_FLAGS`.  Every mismatch is caught, at
the call, and every failing case was run twice (ledger row 98).

| case | the mismatch | what the interpreter says |
|---|---|---|
| 1 | batched product, 4 planes against 2 | `Failed to find any matching overload, args = (HeadsView[\4,2,3\],HeadsView[\2,3,2\])` |
| 2 | batched product, plane counts agree, inner size 3 against 2 | `Failed to find any matching overload, args = (HeadsView[\4,2,3\],HeadsView[\4,2,2\])` |
| 3 | dyadic `rows`, a 4x3 matrix against a 5x3 | `Failed to find any matching overload, args = (…,__DefaultMatrix[\RR64,4,3\],__DefaultMatrix[\RR64,5,3\])`, and the three `rows` declarations printed in full, `x:Matrix[\RR64,n,d\],y:Matrix[\RR64,n,d\]` among them |
| 4 | dyadic `rows` at rank 3, 4 planes of 2x3 against 2 planes of 3x2 | as case 3, `args = (…,HeadsView[\4,2,3\],HeadsView[\2,3,2\])` |
| 5 | a 5x3 matrix onto 4 planes of 2x3 | `Failed to find any matching overload, args = (__DefaultMatrix[\RR64,5,3\],HeadsView[\4,2,3\])`, the candidates being the library's own `+` |
| 6 | a diagonal of 5 times a 4x3 matrix | `Failed to find any matching overload, args = (Diag[\5\],__DefaultMatrix[\RR64,4,3\])` |
| 7 | `pick`, 5 keys for a matrix of 4 rows | `Unification error: … Cannot unify __DefaultVector[\ZZ32,5\] … with Vector[\FortressLibrary.ZZ32,k\] … abm=c=(3,Any) k=(4,Any)` |

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
5. **The elementwise `×` and `/` do NOT state their shape agreement.**  Their
   two arrays must agree, but the sizes are not in the index type, so stating it
   means rank-specialising.  Both routes were probed, cold:
   - the specialised declaration BESIDE the index-generic one, in one component,
     is refused (`elemwise_nat_probe.fss`, `checks/elemwise_nat_probe.out.0`):
     `BY[\T extends FortressLibrary.Number,nat n,nat d\](a:Matrix[\T,n,d\],b:Matrix[\T,n,d\]):Matrix[\T,n,d\] … and BY[\T extends FortressLibrary.Number,I\](a:Array[\T,I\],b:Array[\T,I\]):Array[\T,I\] … have parameters with generic type, at least one pair of parameters must have excluding types`
     (ledger row 159, now with the element-generic bound);
   - the three ranks with shared nats and NO index-generic declaration are
     accepted and all three run (`elemwise_rank_probe.fss`,
     `checks/elemwise_rank_probe.out`: `rank 1 4.0 rank 2 25.0 rank 3 121.0`).
   So the agreement IS statable, at three declarations per operator instead of
   one: `×` and `/` are the only two of the 13 with two array parameters, so the
   api would go from 35 to 39.  Not done here, because the brief enumerates the
   declarations that were to take shared nats and this is not one of them, and
   because the review measured the index-generic form as the form that serves
   every rank and every element type at once.  It is a one-line decision if
   Pavol wants the sizes there too.
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
| the check smoke | `checks/check_smoke_flatarrays2_threads1.out` | SMOKEVERDICT |

Per-step times, ms (`checks/model_run_flatarrays2.out` against
`checks/model_run.out`, the same host, one run each):

| step | FlatArrays2 | FlatArrays |
|---|---|---|
| 1 | 4491 | 4308 |
| 2 | 4427 | 4001 |
| 3 | 4066 | 3856 |
| 4 | 4401 | 4223 |
| 5 | 4211 | 4134 |
| mean | **4319** | **4104** |

One run each, so this is a difference of about 5 % against noise of the same
order; the review measured the pieces that changed (the row lift about 2 %, the
`diag` operator kept because dropping it costs 5 %).  The comparison that
settles cost is the coordinator's two recorded check runs.
