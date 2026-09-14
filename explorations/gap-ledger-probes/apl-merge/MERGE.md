# The APL and Run C4 ledger merge, 2026-09-14

What this merge entered into `explorations/fortress-gap-ledger.md`, how every
reproducer was re-run before its row was entered, what differed, and what was
found wrong in the source tables. Companion to the ledger's own closing section
("The APL side quest and Run C4 merge").

## What was entered

82 rows, **175-256**, continuing from row 174.

- **Run C4** (`explorations/run-c4/gaps.md`, four rows numbered 175-178 as
  candidates): entered as **175-178**, the numbers unchanged. Row 175 into the
  ledger's section 1, 176 and 177 into section 3, 178 into section 13.
- **The APL side quest** (`explorations/apl/gaps.md`, rows 1-85, six rungs):
  **78 entered as 179-256**, **7 folded** into existing ledger rows. The map is
  at the top of `apl/gaps.md`. That file grew while this merge ran: its rows 86
  on are the microGPT rung's and are **not** merged here; the ledger's numbering
  is left ready to continue at **257**.

The folds, each because the APL row is the same claim as a row the ledger
already had, with its evidence added to that row's notes:

| apl row | into ledger row | why |
|---|---|---|
| 36 | 97 | the Meet Rule on exactly the two `Array` instantiations row 97 names |
| 45 | 44 | the shipped `SUM`'s `Number` seal, confirmed on a plain nested array instead of a `Vector` |
| 56 | 145 | `AND` evaluates both operands; the APL row adds the two library declarations and the thunk spelling |
| 64 | 109 | `Matrix` has no elementwise product; the APL row prices what `+`/`-` give free and what `×`/`÷`/`*` cost |
| 66 | 89 | two loose operators of incomparable precedence, another pair (`MOD` and `+`) |
| 78 | 7 | a word of two or more uppercase letters is an operator, met on the sub-language's names |
| 82 | 98 | the overload check is cache-dependent, met from the cold-cache side |

Rows that *sharpen* another APL row (their notes say "sharpens row N", meaning a
row of `apl/gaps.md`) were entered as their own rows and keep the
cross-reference. The four rows about a line break failing to separate two
statements (apl 52, 63, 68, 81 → ledger 228, 238, 241, 253) are one such chain
and are entered as four rows, as the source wrote them.

A new section was added to the ledger for the subject it did not have:
**"16. Syntax extension: grammars, templates and sub-languages"**, 42 of the 78
APL rows. The other 36 went into the existing sections (1, 2, 3, 4, 5, 6, 9, 12,
14, 15) by subject.

Cross-references added from new rows to existing ones: 240 → 157 (`Any` in a
signature), 246 → 147 (a parameter may not take a supertrait's method name),
252 → 240, 214 → 23, 215 → 30 and 132, 221 → 47, 226 → 54 and 55, 193 → 7.

## How every reproducer was re-run

Environment for all runs:

```bash
source /home/user/fortress/experiment/env.sh     # JDK 25, FORTRESS_THREADS=1, -Xmx4g -Xss64m
```

**The APL rungs** (rows 214-256 and every row whose probe is under
`apl/rung-N/`), 74 components with a committed `.out`, run from their own rung
directory as each rung's `REPORT.md` prescribes:

```bash
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-N && $FORTRESS_HOME/bin/fortress <probe>.fss
```

Driver: `rerun_apl.sh` in this merge's scratch directory, one probe at a time,
with a re-run on the cold-cache overload failure of apl gaps row 82 (it never
fired: the caches were warm).

**The retired first library** (rows 179-213, whose probes are `apl/v1-probes/`):
that library is not in the tree. A worktree of the commit before the retirement
was used, and the probes were run from it, against **that commit's
`explorations/apl/v1/base`** — at `0ff5eae27~1` the native design had already
been promoted to `apl/base/`, so `apl/base` there is *not* the retired library:

```bash
git worktree add <scratch>/apl-v1 0ff5eae27~1        # nothing is built; the interpreter is the same binary
export FORTRESS_SOURCE_PATH=".:<scratch>/apl-v1/explorations/apl/v1/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd <scratch>/apl-v1/explorations/apl/v1/rung-{1,2,2b} && $FORTRESS_HOME/bin/fortress <probe>.fss
```

42 components plus five `fortress parse` checks (`p08a_g.fsi`, `p08b_g.fsi`,
`p08d_g.fsi`, that commit's `v1/base/AplSyntax.fsi`, and the shipped
`ProjectFortress/syntax_abstraction_tests/Regex.fsi` for `q12_regex_pre.out`).
Driver: `rerun_v1.sh`.

The two shell probes write their api files into their working directory and
name paths that no longer exist, so adapted copies were run from a scratch
directory and their output is kept here rather than beside the probe:
`p12a_rerun.sh` → `p12a_oprword.rerun.out` (identical to the committed
`p12a_oprword.out`), `q10_canary_rerun.sh` → `q10_canary.rerun.out` (identical
but for the path of `p08a_g.fsi`).

**Run C4** (rows 175-178), default source path:

```bash
cd $FORTRESS_HOME/explorations/run-c4/probes/semicolon && $FORTRESS_HOME/bin/fortress SemiTop.fss
cd $FORTRESS_HOME/explorations/run-c4/probes/types/<V> && $FORTRESS_HOME/bin/fortress MicroGptFlat.fss
```

for `<V>` in `B C D E E2 F G S` (`S` is the control). Driver: `rerun_c4.sh`.

**Comparison.** A re-run counts as agreeing with its committed `.out` when they
differ only in: absolute file paths (several probe directories were renamed at
the 2026-09-13 promotion); the Rats! temporary directory and the generated
`TemplateParserNN` number; the presence or absence of a Rats! regeneration
banner (it depends on the parser cache, not on the program); the Java stack
boilerplate that some committed `.out` files were trimmed of; and, for the Run
C4 variants, the per-step millisecond figures and the runner's trailing
`EXIT=`/`WALL=` lines. Everything else was inspected by hand.

## Re-runs that differed, and what was kept

Seven probes. Each row says so in its notes, and the re-run is kept as
`<probe>.rerun.out` beside the probe (never overwriting a committed `.out`).

| probe | ledger row | difference |
|---|---|---|
| `apl/rung-1/r12_contract` | 220 | the contract violations as committed; the overload-candidate dump printed beside them has grown with the base (rungs 3-6 added `+` over `Array3` and over `(Matrix, RR64)`) |
| `apl/rung-1/r15_runtimerank` | 223 | the same `Syntax Error` for a computed reshape, at column **46** rather than the committed 45 — the grammar has grown since rung 1, so the furthest-failure position moved one character |
| `apl/rung-4/u15_any` | 240 | does not run: `Variable aplTstE is not defined.` |
| `apl/rung-4/u16_res` | 240 | does not run: `Variable aplTstF is not defined.` |
| `apl/rung-4/u04_frame` | 245 | timings: the `aplCall`/lambda ratio 5.06 against the committed 4.10 |
| `apl/rung-4/u21_cost` | 245 | timings: ratios 3.57 (committed 3.53) and 1.00 (0.99), every absolute figure about 2× |
| `apl/rung-6/w04_cost` | 256 | timings: ratios 4.06/2.65/0.65 against 3.80/2.61/0.69, absolutes about 1.7× |

The timing drift is not a change in the interpreter: the microGPT rung's own
worker was running `MicroGptAplCheck.fss` on this host throughout these runs.
The ratios, which are what the rows claim, hold.

One more file differs and is kept for the opposite reason:
`apl/v1-probes/p03a_idgap.rerun.out`. The committed `p03a_idgap.out` was
trimmed after six frames; the re-run carries the whole trace, including the
`Caused by: java.lang.IllegalArgumentException: Parameter 'text' to the IdOrOp
constructor was null` at `TemplateParser3.pExpression$AssignLeft` that apl gaps
rows 4 and 24 quote. The claim is better evidenced than before.

## Reproducers that could not be run

Two, both for ledger row 240 (apl gaps row 67, "an overloaded function whose
declared result type is `Any` does not dispatch"): `apl/rung-4/u15_any.fss` and
`u16_res.fss` call `aplTstD`, `aplTstE` and `aplTstF`, temporary overload
families that rung 4 declared in `apl/base/AplCore.fss` and removed when the
answer was in (both probes' own headers say so). They now stop at `Variable
aplTstE is not defined.` / `Variable aplTstF is not defined.`, and `apl/base/`
may not be touched by this merge — another worker is writing there.

The claim needs no APL, so it was re-established here instead:
`a01_any_result.fss` beside this file declares the same two overloads
(`Vector[\RR64,s\]` and `Matrix[\RR64,r,c\]`, an `()->Any` first parameter),
once with an `Any` result and once with an `Object` result, in plain Fortress
with the default source path:

```bash
cd $FORTRESS_HOME/explorations/gap-ledger-probes/apl-merge && $FORTRESS_HOME/bin/fortress a01_any_result.fss
```

`a01_any_result.out`: the `Object` pair answers `objres(f, v) = 1.5
objres(f, m) = 2.5`; the `Any` pair gives `Failed to find any matching overload,
args = (FnExpr … ()->Any …, __DefaultVector[\RR64,2\])` with both members
listed. Row 240's controls, `u12_disp` and `u13_rank`, re-ran as committed.

One further run was skipped as too long, and the row says so: the 884 s,
40-check run of the model with semicolon-separated hyperparameters
(`run-c4/probes/semicolon/threads1.txt`, row 175). Its probe proper,
`SemiTop.fss`, re-ran character for character.

## What was found wrong in the source tables

1. **The retirement's `sed` over-matched, in both directions.** At `0ff5eae27`
   the strings `rung-1/Rung1`, `rung-2/Rung2` and `rung-2b/Rung2b` (and
   `rung-2b/AplSyntaxB`) in `apl/gaps.md` were replaced by the words
   "v1 (retired; git history)". Thirteen citations in rows 14, 23, 28, 30, 34,
   48, 51, 52, 53, 54 and 55 now name no file at all. Worse, rows 48-55 were
   written *after* the retirement, on the new base, and their "v1 (retired; git
   history)" citations mean the **current** `apl/rung-2/Rung2.out`,
   `Rung2.out.0`, `Rung2.out.1` and `Rung2.fss` — checked: that file, not the
   retired one, contains the `Ex 37b`, `X3-X5`, `X18`, `X19`, `X20` and the
   `Rung2.fss:137:42` those rows quote. The ledger rows carry the repaired
   citations (the retired components as `explorations/apl/v1/rung-N/…` at
   `0ff5eae27~1`, the current ones as `apl/rung-2/Rung2.*`); `apl/gaps.md`
   itself is left as it stands, as the brief requires.
2. **Three rows carry an unescaped `|` inside a code span**, which splits the
   markdown cell and shifts every column after it: row 33 (`` `* + ? { } | [ ] : #` ``),
   row 55 (`` `|select| ≠ |data|` ``) and row 77 (`` Row 17 listed `:` `{` `}` `|` … ``).
   Escaped as `\|` in the ledger rows.
3. **Four rows cite the feasibility table as if it were in the ledger** —
   "merged ledger's apl-probes rows" (row 2), "the apl-probes row on the
   U+2336-U+237A block" (row 7), "Sharpens the apl-probes row on `narrow`"
   (row 10), "the apl-probes row on `b07b_optvar`" (row 19). That table, about
   twenty rows at the end of `explorations/apl-probes/REPORT.md`, has **never**
   been merged: the ledger contains no row from it and does not name the file.
   It is the obvious next merge; it is not in this one's scope.
4. **`run-c4/gaps.md` row 177 left its class open** ("design limit or
   implementation gap"). The grammar settles it, and ledger row 177 says so:
   `appendices/grammars/concrete-syntax.tex:1125-1128` makes `[var] VarWTypes
   := Expr` demand a type (so `p := e` failing is the grammar) while `[var]
   VarMayTypes = Expr` with `VarMayType ::= BindId [IsType]` (`:1135-1137`)
   allows an untyped `var p = e` (so `The type of p is required.` is the
   implementation refusing a form the spec writes).
5. Two smaller things, both carried into the ledger rows rather than corrected
   in place: apl gaps row 15's claim summary ("Accepted: `AA Ab AbC A W2 AB2`;
   rejected: `WE AB ABC AAA A_B`") reads oddly beside its own sentence about the
   spec, but the script's output confirms it exactly, `AA` accepted and `AAA`
   rejected; and rungs 5 and 6 write emphasis in ALL CAPS where rungs 1-4 and
   the ledger use `**bold**`.

## Files this merge wrote

In this directory: `MERGE.md` (this file); `a01_any_result.fss` + `.out` (the
new probe for row 240); `p12a_rerun.sh`, `p12a_oprword.rerun.out`,
`q10_canary_rerun.sh`, `q10_canary.rerun.out` (the two shell probes' adapted
copies and their output).

Beside the probes: `apl/rung-1/r12_contract.rerun.out`,
`apl/rung-1/r15_runtimerank.rerun.out`, `apl/rung-4/u04_frame.rerun.out`,
`apl/rung-4/u15_any.rerun.out`, `apl/rung-4/u16_res.rerun.out`,
`apl/rung-4/u21_cost.rerun.out`, `apl/rung-6/w04_cost.rerun.out`,
`apl/v1-probes/p03a_idgap.rerun.out`.

Edited: `fortress-gap-ledger.md` (82 rows, seven folds, the new section 16, the
header comment, the counts and the closing section), `gap-cross-run.md` (the
`run-c4` and `apl` columns and the 82 new rows), and one line at the top of
`apl/gaps.md` and of `run-c4/gaps.md` giving the map to the ledger's numbers.
Nothing outside `explorations/` was touched, and neither `apl/base/` nor
`apl/microgpt/`.

## Note on the three output files in this directory

`*.out` is gitignored at the repository root (`.gitignore:46`); the probe
outputs under `explorations/apl/` are tracked because they were force-added, and
no earlier merge kept an `.out` in `gap-ledger-probes/` at all — their outputs
live in `transcript.txt`. The three files this merge wrote here
(`a01_any_result.out`, `p12a_oprword.rerun.out`, `q10_canary.rerun.out`) need
`git add -f` to be committed. Their contents are reproduced below so that
nothing is lost if they are not.

### `a01_any_result.out`

```
(a) the same two members with an Object result:
  objres(f, v) = 1.5   objres(f, m) = 2.5
(b) the two members with an Any result:
com.sun.fortress.exceptions.ProgramError: /home/user/fortress/explorations/gap-ledger-probes/apl-merge/a01_any_result.fss:25:34-44:
Failed to find any matching overload, args = (FnExpr at /home/user/fortress/explorations/gap-ledger-probes/apl-merge/a01_any_result.fss:21.9 ()->Any /home/user/fortress/explorations/gap-ledger-probes/apl-merge/a01_any_result.fss:21:9-26:4,__DefaultVector[\RR64,2\]), overload = {
	anyres[\nat s\](f:()->Any,v:Vector[\FortressLibrary.RR64,s\]):Any/home/user/fortress/explorations/gap-ledger-probes/apl-merge/a01_any_result.fss:12:1-59
	anyres[\nat r,nat c\](f:()->Any,m:Matrix[\FortressLibrary.RR64,r,c\]):Any/home/user/fortress/explorations/gap-ledger-probes/apl-merge/a01_any_result.fss:13:1-69}:OverloadedFunction
Context:
/home/user/fortress/explorations/gap-ledger-probes/apl-merge/a01_any_result.fss:25:34-44:
toplevel:

Turn on "-debug interpreter" for Java-level stack trace.
java.lang.Throwable
	at com.sun.fortress.Shell.failureBoilerplate(Shell.java:748)
	at com.sun.fortress.Shell.walk(Shell.java:1166)
	at com.sun.fortress.Shell.walk(Shell.java:1116)
	at com.sun.fortress.Shell.subMain(Shell.java:483)
	at com.sun.fortress.Shell.main(Shell.java:362)
	at com.sun.fortress.Shell.main(Shell.java:349)
```

### `p12a_oprword.rerun.out`

```
nonterminal WE:              Turn on "-debug interpreter" for Java-level stack trace.
nonterminal AB:              Turn on "-debug interpreter" for Java-level stack trace.
nonterminal ABC:             Turn on "-debug interpreter" for Java-level stack trace.
nonterminal AA:              Ok
nonterminal AAA:             Turn on "-debug interpreter" for Java-level stack trace.
nonterminal A_B:             Turn on "-debug interpreter" for Java-level stack trace.
nonterminal Ab:              Ok
nonterminal AbC:             Ok
nonterminal A:               Ok
nonterminal W2:              Ok
nonterminal AB2:             Ok
```

### `q10_canary.rerun.out`

```
=== baselines ===
Regex.fsi as shipped               Ok 
base/AplSyntax.fsi                 Ok 
rung-1/p08a_g.fsi (one escaped +)  /tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad/apl-v1/explorations/apl/v1/rung-1/p08a_g.fsi:5:1-2:     Unmatched delimiter "api". 

=== one escape, with one construct of Regex.fsi above it ===
nothing above it                   REJECTED   (the escape was seen)
^ (Regex.fsi:116)                  REJECTED   (the escape was seen)
$ (Regex.fsi:117)                  REJECTED   (the escape was seen)
. (Regex.fsi:119)                  REJECTED   (the escape was seen)
_ as any character                 REJECTED   (the escape was seen)
pling-escaped # (\#)               REJECTED   (the escape was seen)
a class [A:Za:z0:9~!@%&]           Ok         (the escape went unchecked)
a bare # after a terminal          REJECTED   (the escape was seen)
an escaped : (`:)                  REJECTED   (the escape was seen)
an APL glyph (the rung-1 recipe)   Ok         (the escape went unchecked)

=== which token of Regex.fsi:93 stops the scan ===
a plain template                   REPORTED   (the scan survived it)
a list literal <| … |>           REPORTED   (the scan survived it)
the splice ** alone                silent     (the scan died on it)
<| xs** |> as in Regex.fsi         silent     (the scan died on it)
```
