# Skeptic, rung C (`rung-library-comments`): first judgement (refused), and the second judgement (approved) at the end

At the gather (2026-09-22) the provisional row 354 this text cites became ledger row 359: rung L, earlier in manifest order, took 354 to 358.

**Verdict: refused.** One thing must change. Comment 2 (`Array3`'s `excludes AnyAdditiveGroup`,
`Library/FortressLibrary.fss:2671-2676`, `.fsi:1661-1666`) says the clause lets "an operator between
an Array3 and **a number** or a lower-rank array" be declared without colliding with `AdditiveGroup`'s
`+`. The lower-rank half is true and load-bearing. The number half is false in this library. On a
cold cache, a user `+` between an `RR64` and an `Array3` is rejected with the clause present. It is
rejected against the library's own scalar-block `+`, not against `AdditiveGroup`'s. Once that `+` is
removed, the same pair loads with or without the clause (probe B, below). The words "a number or"
must go from both files, or the sentence must be rewritten so that it claims only what the matrix
probe (A) shows. The rest of the rung is sound. The diff is comment-only; I checked that
independently. The checker count is 93 before and after, and its full output is identical once
positions are mapped back. My own walk probes print the same output on the base library and on
this branch.

What I inherited: the branch carries the worker's three commits (`76c55b270` pre-edit captures,
`43ec9ce17` the edit and post-edit captures, `3fecffe64` REPORT, record, gated runs). Nothing had been
through a skeptic. I re-ran the checker-count stage, the worker's `parse-compare.sh` and an insertion
check of my own. I did not rely on the worker's logs.

All runs were at `FORTRESS_THREADS=1`. The rung touches no mutable state, field, atomic block or
library write, so one thread is enough.

## 0. The provenance block

- **problem:** `POSITIONS.md:47` says a `NOT YET`-style comment goes at the line "either way", and
  `:44` approves the scalar block and the `Array3` clause as landed. Both lines say this. But
  `library-findings-explained.md:193` is **option B**, "keep it on `Array3` as committed, add only the
  comment". The explainer's default was A, the move to `Rank3` (`:199`), and Pavol chose B by
  approving the clause as landed. So the block's words "on the explainer's defaults for them at
  …:193" are wrong for `Array3`. `:249-255` and `:272-283` are the defaults 3a-A and 3b-A, as it says.
  This needs a correction; it is not grounds for refusal.
- **spec:** `traits.tex:76-88`, `:231-235` and `:218-222`, and `advanced/overloading.tex:178-216`, all
  say what the block says. I read each with ten lines either side. But the block says "none for the
  scalar block (no prose on array-scalar arithmetic …: `grep … 'scalar\|elementwise…'` has no hit on
  arrays)", and that grep does hit arrays. `Specification/basic/operators/opr-overview.tex:143-147`:
  "Multiplication of a vector or matrix by a scalar is done with juxtaposition … Division of a matrix
  or vector by a scalar may be expressed using `/`." So the specification is silent only on `+`, `-`,
  `MIN` and `MAX` between an array and a scalar, and on what those return. The comments do not
  contradict the passage: the scalar `juxtaposition` pairs that comment 4 calls commutative are the
  specification's own. But the block and REPORT.md:124-125 ("no array-scalar arithmetic at all") must
  be corrected.
- **precedent:** `.fss:1297`, `:1374` and `:1589-1590`, and `.fsi:818` and `:1063`, all checked. They
  are the three `.fss` notes and the two `.fsi` notes, in the two forms the block describes. `.fss:4503`
  is the scalar block's `(*)` header.
- **deviation:** every cited line checked (.fss:613, .fsi:410, .fss:1297, aggregate.tex:120-121,
  .fss:4512-4515, .fsi:2547). The reversed `-` is at base `:4500`, as the block says.
- **historical:** it names `Library/FortressLibrary.fss` and `.fsi`, which are the only files of the
  2012 tree the diff edits.

## 1. The recorded failure

No failing test exists, and none can: the batch record exempts C by design
(`explorations/coordinator/CLIMB-BATCH-3.md:112`, "a comment-only rung has nothing to make red").
The worker captured the base tree's behaviour before any edit existed, in commit `76c55b270`
(`probes/checker-count-preedit.txt`, `probes/checker-count-preedit-run.txt`, `probes/CommentedDecls-preedit.txt`), and I
compared my post-edit runs against those captures. I do not treat the missing failure as grounds
for refusal, because the batch record, which is the decision record for this batch, sets C's proof
as the suites alone.

## 2. The diff

31 inserted lines, none deleted, in the two library files only. My own
`probes/skeptic/sk-insertion-check.py` checks it without the worker's tools
(`probes/skeptic/sk-insertion-check.txt`). Each file minus its inserted lines is the base, byte for
byte. Every inserted run starts and ends at comment depth 0 and is whole comments. Read line by line,
comments 1, 3 and 4 say what the brief asked for, and nothing more.

- **Comment 1** carries the team's wording, in each file's own form.
- **Comment 3** says "Nothing is lost at run time". I probed that claim on views as well as whole
  arrays: `SkNothingLost.txt` and `SkViews.txt`. `(m + 1.0) v` is a `Vector` of the right values. A
  transposed view plus a scalar is a `Matrix`. A sub-array based at 1 keeps its bounds `[1,2,3]`.
- **Comment 4** says `+`, `MIN` and `MAX` commute. That holds for `RR64` with NaN, `0.0` and `-0.0`,
  in both orders (`SkScalarOrders.txt`: `Math.min`/`Math.max` behind the float `MIN`/`MAX`,
  `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:96-98` binding `interpreter/glue/prim/Float.java:280-290`).
- **Comment 2** is where the rung goes wrong; see finding F1.

## 3. The precedent search

Correct and complete for what the rung needed. The worker found all five `NOT YET` notes, and the one
`.fsi` trait that carries none (`AnyUniqueItem`, `.fsi:886`). It followed each file's own form and
recorded that choice as a decision. No precedent repaired a defect here, so there were no other sites
to count.

## 4. The test

None, by the batch record's design. No test file was added, so the one-comment-line rule has nothing
to apply to.

## 5. The competing-declaration grep

The rung adds no names. I still grepped the three names the comments rest on (`AnyAdditiveGroup`,
`AnyIntegral`, `Array3`) across `ProjectFortress/tests`, `compiler_tests`, `library_tests`,
`test_library`, `static_tests` and the whole of `ProjectFortress/src/com/sun/fortress`:

- `tests/tupleInfer.fss:16` uses `AnyIntegral` as a bound.
- `compiler/typechecker/TypeNormalizer.java:97` names `Array3` for rank-3 type sugar.

Neither is affected by a comment.

## 6. record.md

- **FACTS line 1:** true as written, with one exception: it says the suites were not run "by the
  batch's rule". The batch record asked for the suites (CLIMB-BATCH-3.md:112), and the shared
  prefix forbade running them. The line should say which rule it followed. It must also change with
  comment 2's text (F1).
- **FACTS line 2, D1:** reproduced exactly (`parse-compare.sh` re-run, identical to
  `probes/parse-compare.txt`, `sk-checker-count.txt` last line); the dispatch listing in the worker's
  `probes/ArrayLiteralArg-postedit.txt:23` shows the first `-` of the scalar block at
  `FortressLibrary.fss:4511:1-4514:88`.
- **Row 49's note** cites an existing row and renumbers nothing. `Evaluator.java:725-732` and
  `LHSEvaluator.java:120-150` say what it says.
- **Row 354** is new and provisional. That is correct, and I agree with it.

## 7. The three homes, for the worker's defects

- **D1 (spans), home 3.** The capture is committed (`probes/SpanAbsorb.txt`) and the provisional row is
  in record.md. The report says the specification is silent but shows no grep, and the rule asks for
  one. Here it is:
  `grep -rn -i -w 'span\|spans\|source location\|source locations' Specification/basic
  Specification/basic-lib Specification/advanced` finds only `basic/components/source-code.tex:39`
  (the concatenation sentence) and `opr-overview.tex:234-236` (intervals). The REPORT should carry it.
- **D2 (row 49, argument position).** The specification settles it, which makes it home 2, but no XXX
  test was added. The worker's reason is real: an XXX file in `ProjectFortress/tests/` moves
  `testSystem` from the declared 385 to 386 and breaks the byte-identical obligation. I record it as
  the one home not met, and it is the gather's to place (a recommendation, not a correction).

## Differentials (my own programs, all in `probes/skeptic/`)

The compiled path does not read `FortressLibrary`, and its prelude has no `Array`, `Vector` or
`Array3`, and `Matrix` only as an empty stub trait (`Library/CompilerLibrary.fsi:281`; rows 72 and 305). So for every array construct the compiled answer is a static
error. The one construct both paths have is the scalar block, whose compiled counterpart is
`CompilerLibrary`'s `ZZ32Vector` block. Before the compiled runs I rebuilt the library bytecode cache
in this worktree in library order.

| program | walk | compiled | verdict |
|---|---|---|---|
| `SkScalarOrders.fss` | `3 - x` = 2 1 0; `x - 3` = -2 -1 0; `+`, `MIN`, `MAX` equal in both orders, NaN and signed zeros included; base = branch | `Array is undefined` (2 errors) | comment 4 holds; the compiled path has no arrays (rows 72, 305) |
| `SkVecScalarC.fss` | (the same expressions, in `SkScalarOrders`) | `x - 3` = -2 -1 0, `x + 3` = 4 5 6, `MIN` 1 2 2, `MAX` 2 2 3 | agree |
| `SkVecScalarRevC.fss` | `3 - x` = 2 1 0, `3 + x` = 4 5 6 | static error: `(ZZ32Vector, ZZ32)->ZZ32Vector is not applicable to (IntLiteral, ZZ32Vector)` | differ; see below |
| `SkNothingLost.fss` | `m + 1.0` a `Matrix`; `(m + 1.0) v` = 8 14, a `Vector`; `(m+1)(m+1)` = 16 21 28 37; transposed view + 1.0 a `Matrix`; `10.0 - t` an `Array3`; base = branch | `Vector is undefined`, `Array3 is undefined` | comment 3 holds |
| `SkViews.fss` | sub-array based at 1 keeps bounds `[1,2,3]` through `+` and reversed `-`; `x[1:3] + 1` keeps `[0,1,2]`; base = branch | not run (no array type) | comment 3 holds |
| `SkA3Mat.fss` | loads on this branch, cold; **rejected without the clause, cold**, against `AdditiveGroup.+` at `FortressLibrary.fss:333`; passes without it on a warm cache | `Array is undefined` (13 errors); the checker driver crashes at `STypesUtil.scala:557` on the fixture's `nat` parameters | comment 2's lower-rank half is true |
| `SkA3Num.fss` | **rejected with the clause, cold**, against the scalar block's `+` at `.fss:4509`; the same without it; loads with or without the clause once the block's `+` is removed; passes on a warm cache | not run (no array type) | comment 2's number half is false: F1 |
| gated `ArrayOperatorsBesideLibrary.fss`, clause removed | cold: rejected against `:333`; run again at once: passes | — | pins the clause only on a cold cache: F3 |
| `SkA3Concrete.fsi` through the checker driver | — | 0 errors with the clause and without | today's checker gives no evidence either way |

The captures are `SkScalarOrders.txt`, `SkVecScalarC.txt`, `SkNothingLost.txt`, `SkViews.txt`,
`SkArray3Exclusion.txt` (A1-A5, B1-B6) and `SkA3Concrete-checker.txt`. `scratch-libraries.txt` holds
the diffs of the scratch libraries (`base`, `noAAG`, `noBlk`, `noBlkNoAAG`, each loaded through the
`.` entry at the head of `fortress.source.path`) and, through `SkWhichLib.fss`, which copy each
directory loaded.

**The one walk/compiled divergence** is on the reversed operators, `3 - x` and `3 + x`. It falls
under the third outcome of rule 4: the specification is silent. Its prose covers only juxtaposition
and `/` between an array and a scalar (`opr-overview.tex:143-147`). The design is decided by the
library route (POSITIONS, 2026-09-21): the interpreter's library becomes the one library, and no
declaration goes into `CompilerLibrary`. So `CompilerLibrary.fsi:186-190`'s one-order block is a
bootstrap to be deleted, not a defect to repair, and I recommend no row.

**Also re-run:** the checker-count stage. It reads 93 errors at 52 locations, the `NativeArray`
crash line is unchanged, and the table is identical to the worker's pre-edit table. The whole
253-line output is identical to the pre-edit capture once positions are mapped back by my own
`sk-remap.py`, which reads the inserted lines from `git diff -U0` and not from the worker's table
(`sk-checker-count.txt`).

## Findings

- **F1 (the refusal).** Comment 2, `.fss:2672` and `.fsi:1662`: "between an Array3 and a number or a
  lower-rank array".
  - Measured (`SkArray3Exclusion.txt`): with the clause, cold, a user pair
    `opr +[\nat a,nat b,nat d\](y: RR64, t: Array3[\RR64,0,a,0,b,0,d\])` and its mirror is
    rejected. The rejection is against `opr +[\T extends Number, I\](x: Array[\T,I\], y: T)` (B1),
    and the same happens without the clause (B3). With the block's two `+` lines removed it loads,
    both with the clause (B5) and without it (B6). So the clause plays no part for a number, and in
    this library the number case cannot be declared at all.
  - Why: under the clauses as written the tower is closed, and the interpreter makes a trait with a
    `comprises` clause exclude whatever all its leaves exclude
    (`interpreter/evaluator/types/FType.java:281-297`). So `RR64` already excludes `AdditiveGroup`,
    and `Array3`'s clause is not needed. The specification reaches the same place from an object
    type excluding every type that is not its supertype (`types-vals-vars.tex:221-224`) and from its
    `comprises` reasoning (`:549-570`). Under the open closure that comment 1's `NOT YET` names, a
    user `Integral` could be an additive group and this would no longer follow. The scalar block's
    `+` would still hold the slot (B1).
  - The matrix half is load-bearing: A1 loads, A2 is rejected against `:333`.
  - The brief's own wording was "something on the numeric side (C4's plane-wise `+`)"
    (CLIMB-BATCH-3.md:108). "A number" is the worker's addition.
  - The fix is comment text only, and the rung stays comment-only.
- **F2.** REPORT.md:121-123 says the interpreter "does not check a user declaration's overloading
  against the library's". That is false. On a cold cache it checks the pair and rejects it (A2, A4,
  B1). On a warm cache ledger row 341's mask hides the check (A3, A5, B2). The worker ran the gated
  tests singly, and `ArrayOperatorsBesideLibrary` ran second (`probes/gated-tests-postedit.txt:16`), after
  earlier post-edit runs had cached the edited library, so it met a warm cache. The worker's run therefore said nothing about the clause.
- **F3.** The gated `ArrayOperatorsBesideLibrary.fss` does pin the clause, but only when it meets a
  cold library cache (A4 against A5). Whether `ant testSystem` gives it one was not measured. This
  goes to the gather as recommended row 1.
- **F4.** The provenance errors of section 0: the `:193` wording, and the specification's silence on
  the scalar block, which is partial and not total.
- **F5, a note and not a correction.** The worker called the specification silent on rank 3. The
  editor's margin notes at `aggregate.tex:152-162` show the design intent: "An array of two [or
  more] dimensions … is a matrix", with `Matrix` types of rank `k > 1`, and an editor's dissent,
  "Jan: I continue to disbelieve". `\marginnote` is suppressed in a release build
  (`Specification/fortress/fortress.tex:35-37`), so this is draft text, not the standard. But it
  leans toward the future that comment 2 says the clause forecloses. Pavol decided without seeing
  it, as far as the record shows.
- **F6, a note and not a correction.** Comment 2's premise is the Incompatibility Rule. The
  specification also has the static-parameter sentence (`basic/overloading.tex:100-104`), applied to
  imported declarations by `components/source-code.tex:257-259`. Under that sentence the fixture's
  generic plane-wise `+` is an invalid overloading against `AdditiveGroup`'s functional `+`, whatever
  the exclusion. The batch record lists that sentence as Pavol's to decide (CLIMB-BATCH-3.md:164), so
  the comment is right not to mention it.
- **F7, a note.** "No Array3 can be an additive group" is the language's rule (`traits.tex:218-222`).
  The interpreter does not check exclusions at declaration (row 293), so today it would accept such a
  type.
- **F8.** `ProjectFortress/library_tests/TryAtomicRungB.fss:42` cites `.fss:1570`, which is now
  `:1571`. C is the only rung of the batch that edits `FortressLibrary.fss`, so the number is final.
  The worker flagged it for the coordinator.

## Required corrections

These are for the repair round, except the last, which is for the commit stage.

1. **(Refusal.)** Comment 2 in both files: drop "a number or" (`.fss:2672`, `.fsi:1662`), or make
   the sentence claim only what A1/A2 show. Then re-run `comment-only-check.py`, the checker-count
   stage and `parse-compare.sh`, and recommit their captures.
2. REPORT.md:121-123: replace the interpreter claim with the measured behaviour (A2/A4 cold, A3/A5
   warm, row 341), and say that the worker's own gated run met a warm cache.
3. REPORT.md:4 and :124-125: cite `opr-overview.tex:143-147`, and narrow "silent" to `+`, `-`, `MIN`
   and `MAX` between an array and a scalar, and their result types.
4. REPORT.md:3: `:193` is option B; the default was A (`:199`); Pavol's approval as landed chose B.
5. REPORT.md §6 D1: show the grep that establishes the silence (section 7 above).
6. record.md: FACTS line 1 follows comment 2's new text and names the rule under which the suites
   were not run.
7. **(Commit stage.)** `ProjectFortress/library_tests/TryAtomicRungB.fss:42`: change `:1570` to
   `:1571`.

## The failure-mode question

Not applicable. The rung replaces no stub, error or loud failure. Comments compute nothing, and the
checker, the parser (up to the three span ends of D1) and walk give the same answers before and after.

## Files

- `probes/skeptic/`: the programs `SkScalarOrders.fss`, `SkVecScalarC.fss`, `SkVecScalarRevC.fss`,
  `SkNothingLost.fss`, `SkViews.fss`, `SkA3Mat.fss`, `SkA3Num.fss` with `SkA3NumVocab.fsi` and
  `.fss`, `SkA3Concrete.fsi` and `SkWhichLib.fss`.
- `probes/skeptic/`: the tools `sk-insertion-check.py` and `sk-remap.py`.
- `probes/skeptic/`: the captures `SkScalarOrders.txt`, `SkVecScalarC.txt`, `SkNothingLost.txt`,
  `SkViews.txt`, `SkArray3Exclusion.txt`, `SkA3Concrete-checker.txt`, `scratch-libraries.txt`,
  `sk-insertion-check.txt` and `sk-checker-count.txt`.

---

# Second judgement, after the repair round: approved, with three corrections for the commit stage

**Verdict: approved.** The refusal ground is repaired as the judge worded it. Comment 2 no longer says
"a number" (`Library/FortressLibrary.fss:2671-2676`, `.fsi:1661-1666`, the same six lines in both
files, the judge's text word for word). The rung is still comment-only, and I checked that again
with my own tool. Every claim the reworded comment makes holds when I measure it. Two of those
claims hold only on the compile path's static checker, because walk does not check an exclusion at
declaration (ledger row 293). The report and the record now say what was measured. There are three
corrections: one for the report and two for the commit stage. None of them changes a line of
Fortress.

What I inherited: the branch at `23d319c73`, with a clean worktree. The worker's two repair commits
are `9bd8ee7a5` (comment 2 and the re-run captures) and `23d319c73` (REPORT.md and record.md), on
top of the judge's `166e089d1`. I re-ran the checks myself and did not rely on the worker's logs.
I ran everything at `FORTRESS_THREADS=1`: the rung has no mutable state, field, atomic block or
library write. Every shell used `tmp/sk2/shell.sh`, which sets what `experiment/env.sh` sets but
skips its `rm -rf /tmp/fortress*rats`, so the other rungs' Rats! directories survive.

My mechanism in the first judgement (lines 177-182 above: "`RR64` already excludes
`AdditiveGroup`") was wrong, as the judge said. `RR64` is a `Number`, and `Number` extends
`AdditiveGroup[\Number\]` (`Library/FortressLibrary.fss:352-355`). A type does not exclude its own
supertype (`Specification/basic/types-vals-vars.tex:138-142`, :159-162). The measurements B1-B6
still stand, and the record now carries them without my explanation.

## 0. The provenance block, re-read

It has five lines: problem, spec, precedent, deviation and historical. I opened every file:line they
cite with `sed -n`.

- **problem.** `POSITIONS.md:44` ("Others approved … the `Array3` exclusion … approved as landed";
  "A `NOT YET`-style comment at the line goes in either way"), `:47`, and the explainer's A at
  `:189` ("(default)"), B at `:193` and "Default: A" at `:199`, 3a-A at `:249-255` and 3b-A at
  `:272-283` all say what the line says. Correction 4 of the first judgement is made.
- **spec.** I re-ran the grep and it prints exactly six hits: `conversions-coercions.tex:496` and
  `:695`, `aggregate.tex:180`, `types-vals-vars.tex:279`, and `opr-overview.tex:143` and `:147`.
  The line sorts them correctly. `opr-overview.tex:143-147` says what the line says. Correction 3 is
  made.
- **One citation is not the standard: finding G1.** `traits.tex:231-235` is inside a `\note{…}`.
  A release build defines `\note` as empty, exactly as it defines `\marginnote`
  (`Specification/fortress/fortress.tex:35-37`). REPORT.md §4 item 2 dismisses the `aggregate.tex`
  margin notes as "draft text, not the standard", but §4 item 1 and the spec line rest the closure's
  derivation on a note box of the same kind. The normative rule is 25 lines below the note, in the
  prose, at `traits.tex:259-275`: `Molecule comprises { OrganicMolecule, InorganicMolecule }` …
  "Therefore, the following trait declaration is not allowed: `trait ExclusiveMolecule extends
  Molecule end`". That sentence makes `trait Integral[\I\] … extends { …, AnyIntegral }`
  (`.fss:615`) illegal under `comprises { ZZ }`. The same closure reasoning appears in
  `types-vals-vars.tex:549-570`: "because of the comprises clauses of S and T … any subtype of both
  S and T must be a subtype of V". So comment 1 stands, and the citation must change (correction 1).
  The batch record makes the same slip for rung L: `CLIMB-BATCH-3.md:97` cites
  `traits.tex:236-241`, which is inside the same note. That is the gather's to check, not this rung's.
- **precedent.** `.fss:1297`, `:1374`, `:1589-1590`, `.fsi:818`, `:1063` and `.fss:4503` are
  unchanged and checked.
- **deviation.** `.fss:613`, `.fsi:410`, `.fss:1297`, `aggregate.tex:120-121`, `.fss:4512`,
  `.fss:4512-4515` and `.fsi:2547` are checked. The reversed `-` is at base `:4500` in the `.fss`
  and base `:2543` in the `.fsi`. The new clause cites `CLIMB-BATCH-3.md:108` and
  `SkArray3Exclusion.txt` B1-B6, and `.fss:2672` now reads "between an Array3 and a lower-rank
  array".
- **historical.** `git diff --name-only d610695c0...HEAD`, outside `explorations/`, lists exactly
  the two library files named.

## 1. The recorded failure

The first judgement's ruling stands. The batch record exempts C by design
(`CLIMB-BATCH-3.md:112`). The base tree's captures were committed before the edit in `76c55b270`,
and the repair round compared against them again.

## 2. The diff, re-read

`git diff 166e089d1 9bd8ee7a5 -- Library/` touches only comment 2's second and third lines, in both
files. `git diff --stat d610695c0 -- Library/` still reads 16 + 15 = 31 insertions and no deletions.

- **Insertion check.** My `sk-insertion-check.py`, re-run on both files, finds that each file minus
  its inserted lines is the base byte for byte, and that every inserted run is whole comments at
  depth 0 (`probes/skeptic/sk2-checks.txt` §1-2).
- **What comment 2 claims, and what I measured.** I wrote programs the worker did not write
  (§ Differentials):
  - "an operator between an Array3 and a lower-rank array … without colliding with AdditiveGroup's
    +(self, other: T)" holds at rank 1 as well as at rank 2 (W1/W2).
  - The clause also licenses `-` against `AdditiveGroup`'s `-(self, other: T)` (W3/W4). The comment
    names `+` as its example, so this is not an error.
  - "no Array3 can be an additive group" is what the static checker enforces (C5/C6).
  - "Array1 and Array2 cannot exclude it: Vector and Matrix extend them and are additive groups":
    the checker reports exactly that when either one does (C1/C2).

## 3. The precedent search

Unchanged since the first judgement, and correct. The repair is a rewording, so it needed no new
precedent.

## 4. The test

None, by the batch record. No test file was added.

## 5. The competing-declaration grep

The rung adds no names. I re-ran the grep over `tests`, `compiler_tests`, `library_tests`,
`test_library`, `static_tests`, `not_working_library_tests` and `src/com/sun/fortress` for
`AnyAdditiveGroup` and `AnyIntegral`. The only hit is `tests/tupleInfer.fss:16`, and the only
`Array3` file under `src` is `compiler/typechecker/TypeNormalizer.java`. There is one assert
message that cites a library line and that the rung moves:
`library_tests/TryAtomicRungB.fss:42`, whose `:1570` is now `:1571` (correction 2). The other
test-file citations of `FortressLibrary` lines are `(*)` comments. The ones the rung shifts
(`TimingRungT.fss:5-6,17`, `LineConcatRung5.fss:8-9,18`) were already a few lines off at the base.

## 6. record.md

- **FACTS line 1.** True as written. It names both suite rules, the new comment text and
  `probes/gated-cold-postrepair.txt`.
- **FACTS line 2.** True. I re-ran `parse-compare.sh` and got the worker's capture, below its header
  line (`sk2-checks.txt` §4).
- **The row 49 note.** Unchanged since the first judgement, and checked then.
- **The two row-341 notes.** Both are measured, and both cite committed `.txt` captures. The
  scalar-block extent `:4509-4519` is right: the first `+` is at `:4509` and the last `MAX` at
  `:4519`, with the reversed-`-` note at `:4512-4514`. The worker was right to correct the judge's
  `:4509-4516`. The "warm-cache mask" of note 1 is the mechanism rows 342 and 98 record. A pointer
  to row 342 would help the reader, but the row can be checked without one.
- **Row 354.** The number is provisional from 354, and the ledger's highest row is 353. The row has
  eight columns and uses the ledger's own `NEGATIVE-BOUNDED`. It shows the grep, which I reproduced
  in the first judgement.

## 7. The three homes

- **F1: repaired.** It was a false sentence in the deliverable, not an implementation defect, so no
  new assertion is owed. What the sentence now claims is asserted by the gated
  `tests/ArrayOperatorsBesideLibrary.fss:23-24`. I ran it myself on an empty cache on this branch
  and it prints its nine lines with rc=0 (`sk2-checks.txt` §5). It fails cold without the clause
  (`SkArray3Exclusion.txt` A4).
- **F3 and the number pair: home 3.** They are notes on row 341, and their captures are committed.
- **D1: home 3.** Row 354, with the grep.
- **D2 (row 49 in argument position): owed home 2, not met in the rung.** The byte-identical
  obligation and R's declared 385 rule it out here, as the judge ruled. The record carries it as a
  gather note, and correction 3 makes the commit stage close it either way.
- **Round 2's own measurements.** All are either confirmations of the comment or re-sightings of
  row 293, so I raise no new defect of this rung. The row-293 note is in recommendedRows.

## Differentials (round 2, my own programs, all in `probes/skeptic/`)

The compiled column has two parts. The first is `bin/fortress compile` with the compiler's prelude.
It has no `Array`, `Array2`, `Array3` or `AnyAdditiveGroup` (rows 72 and 305), so every answer
there is a static error (`SkRound2Compiled.txt`). The second is the compile path's static checker
with the interpreter's library in scope: the checker-count stage's own driver, `WorldFlip`
(`SkRound2Checker.txt`). The scratch libraries are listed in `scratch-libraries-round2.txt`.

| program | walk (`SkRound2Walk.txt`) | compile path | verdict |
|---|---|---|---|
| `SkA3Vec.fss` + `SkA3VecVocab.fs{i,s}`: `+` between a `Vector` and an `Array3`, both orders | cold on the branch: 12.0 and 11.0, rc=0 (W1). Cold on `noAAG`: refused against `AdditiveGroup`'s `+` at `FortressLibrary.fss:333` (W2). Warm on `noAAG`: passes (W10, row 341's mask) | `Vector`, `Array3` and `Array` are undefined: 6 errors | "a lower-rank array" holds at rank 1 |
| `SkA3Minus.fss` + `SkA3MinusVocab.fs{i,s}`: `-` between a `Matrix` and an `Array3` | cold on the branch: -8.0 and 7.0, rc=0 (W3). Cold on `noAAG`: refused against `AdditiveGroup`'s `-(self, other: T)` at `:334` (W4) | `Array3` and `Array` are undefined: 4 errors | the clause licenses `-` too, and the comment's `+` is its example |
| `SkA3Group.fss` / `SkA3GroupApi.fsi`: `trait A3G extends { Array3[…], AdditiveGroup[\A3G\] }` | cold on the branch: accepted, rc=0 (W5) | checker, branch: "Types Array3[\RR64,0,2,0,2,0,2\] and AdditiveGroup[\SkA3GroupApi.A3G\] exclude each other. A3G must not extend them." (C5). Checker, `noAAG`: no exclusion error (C6) | the paths differ; see below |
| `SkRank12.fss` on `a2AAG` and `a1AAG` (`Array2` or `Array1` made to exclude `AnyAdditiveGroup`) | accepted, and `m` is both an `AnyAdditiveGroup` and an `Array2` (W6, W7; W8 and W9 show which copy loaded) | `AnyAdditiveGroup` and `Array2` are undefined. Checker on the scratch library: 93 → 97, "Types AdditiveGroup[\Matrix[\T,s0,s1\]\] and Array2[\T,0,s0,0,s1\] exclude each other. Matrix must not extend them." (C1), and the same for `Vector`/`Array1` (C2) | the paths differ; see below |

**Where walk and the compile path's checker disagree.** They disagree on W5 against C5, and on W6/W7
against C1/C2. This is the second outcome of rule 4: the specification settles against the
interpreter. `Specification/basic/traits.tex:218-222` says "neither can extend the other, and no
trait can extend them both". Ledger row 293 already records that the interpreter does not check an
exclusion at declaration. These are row 293's defect seen through this rung's comment, not a defect
of the rung. The comment states the language's rule, and the checker enforces it. The new fact is
that the compile path's checker does report this family: the first judgement's F7 said only that
walk does not. That fact goes to recommendedRows as a note on row 293.

**The rung's own checks, re-run** (`sk2-checks.txt`):

- **Checker-count table.** It reads 93 errors at 52 locations, the same `NativeArray` crash line,
  and `#shadow` matching. It is identical to the pre-edit table.
- **Checker's full output.** Byte-identical to the worker's post-edit capture once the worktree
  prefix is removed. Identical to the pre-edit run, 253 lines, after my own `sk-remap.py`.
- **`parse-compare.sh`.** Identical to the worker's capture.
- **The gated fixture, cold.** It prints its nine lines with rc=0, and it wrote `FortressLibrary`
  and `ArrayOperatorVocabulary` into the empty cache.

## The failure-mode question

Not applicable. The rung computes nothing and replaces no loud failure.

## Corrections the commit stage must close

1. **REPORT.md, the spec line (`:4`) and §4 item 1 (`:98-105`).** Cite `traits.tex:259-275`, the
   normative "not allowed" example, and `types-vals-vars.tex:549-570` as the rule. Say that
   `:231-235` is a `\note` which a release build suppresses (`fortress.tex:35-37`). Reason: rule 3
   of the shared prefix, and REPORT.md's own treatment of the `aggregate.tex` margin notes.
2. **`ProjectFortress/library_tests/TryAtomicRungB.fss:42`.** The assert message's `:1570` becomes
   `:1571`, which is `TryAtomicFailure`'s `asString` after this rung. C is the only rung that edits
   `FortressLibrary.fss`, so the number is final. This carries over correction 7 of the first
   judgement, and record.md's gather note already names it.
3. **Row 49 in argument position: home 2.** The gather adds the expected-failure test
   `ProjectFortress/tests/XXX…` with its `.test`, asserting what `aggregate.tex:129-137` says
   (`3 - [1 2]` is `[2 1]`), and adjusts the declared `testSystem` count. Or it records in one
   sentence why it does not. Either closes the item; leaving it silent does not.

## Files (round 2)

- `probes/skeptic/` programs: `SkA3Vec.fss` with `SkA3VecVocab.fsi`/`.fss`, `SkA3Minus.fss` with
  `SkA3MinusVocab.fsi`/`.fss`, `SkA3Group.fss`, `SkA3GroupApi.fsi` and `SkRank12.fss`.
- `probes/skeptic/` captures: `SkRound2Walk.txt`, `SkRound2Checker.txt`, `SkRound2Compiled.txt`,
  `sk2-checks.txt` and `scratch-libraries-round2.txt`.
