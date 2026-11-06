<!-- The follow-ups that the gap ledger pass's five landed runs of 2026-11-06 (p-run1, c-run1 to c-run4) left for the coordinator or a later run: each judge's `queue.md` item that asks for a measurement, a test, a bisect, a shortened rewrite or an edit of the record rather than a decision of the curator, one line each with its row and source chunk; the items that the run's own prober already answered; the rows for a later run; and the wait of `final.silent` on review-queue item 265. -->

# The ledger pass's follow-ups, 2026-11-06

Sources: each chunk's `queue.md` under `explorations/coordinator/ledger-pass/evidence/RUN/CHUNK/`, cited below as `RUN/CHUNK`, with its `judgement.md` beside it; the runs landed at `36045ec72` (p-run1), `4af0c03c6` (c-run1), `4bc7ecb33` (c-run2), `b13ca2a5f` (c-run3) and `55e38733f` (c-run4), all read at base `c124c6b65` except p-run1 (`de6d905f5`). The rule is `explorations/coordinator/tools/ledger-pass/README.md`, "After a chunk", its last paragraph.

The queue files hold 74 items: the 68 bullet items (p-run1 1, c-run1 22, c-run2 6, c-run3 24, c-run4 15), c-run2/c30's two numbered items (rows 23, 393), and c-run4/c-run4-probe's four sections, written as headings (rows 547, 255, the APL base, and a finding on row 555's program). Five of them, which ask the curator, are review-queue items 368 to 370 (section 5; three merged into 370). Of the other 69, 39 asked a measurement that the run's own prober then ran and its judge applied (section 2), and 30 are open. Section 1 has 37 lines: the 30 open items, with rows 184 and 444 and the two halves of row 865's item as a line each, and five follow-ups that answered items leave (the tests owed for rows 393 and 850, F-269, row 545's status word, rows 242 and 244). A chunk's judge holds a row that it could not measure; the run's probe chunk then ran it, so the chunk's item and the probe's item on one row are one line here, both chunks named.

## 1. Open follow-ups

### Measurements and runs

- **Row 747** (c-run3/c-run3-probe, from c-run3/c10's question): the count stage on a seeded worktree with `Library/FortressLibrary.fss:4597`'s `fail[\ZZ32\](` written `fail(`; then keep or close the judge's `NEGATIVE-BOUNDED` line by the question's outcomes.
- **Row 547** (c-run4/c-run4-probe): bisect for the commit that removed the order dependence, `ee6bfcb8d` and `3c67d5204` first (build `X^` and `X`, run the two `fortress junit` lists of the probe's `runs.md`); then close with it and test `none`. If no tree since the row shows the dependence, which commit closes it goes to the curator.
- **Row 297** (c-run3/c-run3-probe; c-run3/c33 asked the measure, which the probe ran): bisect walk on `V18PairT.fss` between the row's line and `c124c6b65` (candidates `6d187d069`, `14e91723f`, `c41c3d2b0`), then close with a gated walk test of the pair; row 97's `siblings: 297` goes with it.
- **Row 219** (c-run1/c-run1-probe; c-run1/c32 asked the measure, which the probe ran): bisect walk on `r07t_edge.fss` between `ae4f8e38a` and `c124c6b65` (candidates `6d187d069`, `5262a2412`, `14e91723f`), then `ledger.py close 219` with a gated walk test that asserts `tally(c)`; row 199 follows.
- **Row 240** (c-run3/c-run3-probe; c-run3/c33 asked the measure, which the probe ran): the close names `8f7e183d4` by reading; optional check, `A01AnyResultT.fss` at `8f7e183d4^` and `8f7e183d4`, and a bisect if the parent also dispatches.
- **Row 30, a lead** (c-run3/c-run3-probe): whether walk enforces a reduction's type bound (it runs `SumReduction` at `W`, outside `AdditiveGroup[\W\]`, by reading `Library/FortressLibrary.fss:3445`); a new row if not. c-run3/c33's measure of row 30 itself was answered (section 2).
- **Row 20** (c-run4/c27, held): run `p2_ascribe.fss` from `e879b6a44^` and `xs: List[\RR64\] = <|1.0, 1.0|>` under walk, quote the refusal, then apply c27's `rows.rewrite` line with it.
- **Row 330** (c-run4/c4, held): print the `ilkName` of `|\x/|`, `|/x\|`, `round(x)` and `truncate(x)` for `x: RR64 = 2.5` and the numeral `2.5`, under walk and compiled; then the writer's line with the check's corrections 2 and 3 and the output.
- **Row 1** (c-run4/c39; optional, needed by never): compile `g02.fss` from `e879b6a44^` to see whether `x[i]^2` loses its first index compiled too.
- **Rows 242 and 244** (c-run4/c44): run their pinned probes `u18_gram.fss` and `u17_gram.fss` with the `FORTRESS_SOURCE_PATH` that c44 gives for row 210; whether they can load waits on item 370 (the APL base).

### Tests owed (changes of the tree, for a worker)

- **Row 44** (c-run1/c-run1-probe, held; c-run1/c32 asked the measure, which the probe ran): a gated walk test asserting `SUM[ u <- seq(n) ] u` of two `RR64` arrays, then the close `44 d846e3644 TEST ...` given in the probe's `queue.md`.
- **Row 135** (c-run3/c-run3-probe; c-run3/c10 asked the measure, which the probe ran): a walk test from `probe/p135/G1eBigUnion1.fss` with asserts; the close by `20474c144` then names it in place of `none`.
- **Row 853** (c-run1/c-run1-probe; c-run1/c23 asked the measure, which the probe ran): `ProjectFortress/compiler_tests/XXXBottomSpecificity.test` from `probe/p853/BottomSpec.fss` (`compile_err_contains=Invalid overloading`), seen failing, and the row's reproducer naming it.
- **Row 184** (c-run3/c-run3-probe; c-run3/c29 asked the measure, which the probe ran): an `XXX` walk test from `probe/p184/EqvUser.fss`, and the row's reproducer naming it.
- **Row 444** (c-run3/c-run3-probe; c-run3/c33 asked the measure, which the probe ran): an `XXX` walk test from `probe/p444/Sk2InheritedPlain.fss` (`load_exception_contains=Invalid overloading of m`), and the row's reproducer naming it.
- **Row 393** (c-run2/c30; the probe ran the measure): an `XXX` compile test of `SkCycle.fss` with `compile_err_contains`, which the row's "no test can gate it" denies; then its reproducer and that sentence.
- **Row 850** (c-run2/c13; the probe ran the measure, both halves hold): the new `XXX` test that c13's outcome names as the reproducer; the row stays `CONTESTED` (P-62).
- **Row 865** (c-run4/c16; needed by never): a compiled `XXX` test of a `builtinPrimitive` helper bound in an object expression's method, then the case restored to the claim.

### Rewrites held because they overrun the row's limits

Each needs the judged line cut to 1,200 characters and its notes to 700, then `ledger.py rewrite N` and a check; the candidate line and the cut are in the chunk's `queue.md` and `check.md`.

- **Row 278** (c-run1/c32): the counterparts named by relation, notes 736 of 700.
- **Row 460** (c-run1/c32): `TcTrait.fss` kept and the PLAN-history pointer, notes 877 of 700.
- **Row 374** (c-run1/c6): P-42 settles the conflict the line presents; row 1,279, notes 796.
- **Row 76** (c-run1/c6): "G6", the prelude-edit aside and row 314; notes 802.
- **Row 458** (c-run1/c6): the batch story in the claim and stale pins; row 1,201, notes 883.
- **Row 104** (c-run3/c10): the check's 2×2-grid sentence; notes 719.
- **Row 343** (c-run3/c10): the claim and the compiled half; row 1,290, notes 787.
- **Row 344** (c-run3/c10): the prelude citation and the switch-over clause; notes 748.
- **Row 841** (c-run3/c10): the pin not in the base's history and the four corrections; row 1,263, notes 816.
- **Row 551** (c-run3/c5): its reproducer is row 22's `object Value extends Number`, which P-160 makes valid; row 1,277, notes 827 (`held-551.corrected`).
- **Row 510** (c-run4/c27): the claim's correction takes it to 329 of 300 characters and the row to 1,229.
- **Row 255** (c-run4/c-run4-probe, held): apply the probe judge's corrected line (957 characters, in its `queue.md`) after c34's applied line, which says `w02_lib.fss` passes where it now stops at load.

### Edits of the record for the coordinator

- **F-130, row 700** (p-run1/p2): F-130's "where the modulus divides 2^width of its type `N`" rewritten to 2^64, since every `widen` gives `ZZ64` (`Library/FortressLibrary.fsi:586`, `:646`, `:699`), by the next change to FACTS.
- **F-269, row 341** (c-run2/c22, through c-run2/c-run2-probe's judgement): F-269's sentence on C4's former `MAX` refusal is false at the base, since row 341 closed by `c41c3d2b0`.
- **F-143, row 825** (c-run4/c27): F-143 still names the stop at `List.fss:179`; the row and the code stop at `Library/CovariantCollection.fss:17`.
- **FACTS.md:133, row 865** (c-run4/c16): it still names the object-expression case that row 865's line cut for lack of a reproducer.
- **A type that extends two instantiations of one trait, row 555's program** (c-run4/c-run4-probe): walk loads `object Apple extends { Red, Round }` with `Red extends Cmp[\Red\]` and `Round extends Cmp[\Round\]` and fails only at the call; no open row names it. A new row, placed by the coordinator or a worker; the probe's default was no row.
- **Probe programs that call `fill` with a function** (c-run3/c-run3-probe): the writer's brief for later runs tells writers to port a probe's `fill(f)` to `tabulate(f)` (since `f3b62bc83`); the questions for rows 164, 240 and 297 met it.
- **Row 545's status word** (c-run1/c19): `CONTESTED` by the template or `NEGATIVE-VERIFIED` as it reads waits on item 265; no step until he answers.

## 2. Answered in their own run

Each of these asked a measurement that no prober had run when the chunk was judged; the run's probe chunk ran it and its judge applied the result, so nothing is owed beyond what section 1 lists for the same row.

- c-run1, by c-run1/c-run1-probe: rows 772 (c-run1/c1), 342 (c-run1/c15), 545 and 315 (c-run1/c19), 853 (c-run1/c23; its test in section 1), 24, 53 and 254 (c-run1/c28), 44, 216, 219 and 223 (c-run1/c32; 44's test and 219's bisect in section 1), 200 (c-run1/c40).
- c-run2, by c-run2/c-run2-probe: rows 850 (c-run2/c13; its test in section 1), 465 (c-run2/c17; prints `2` and `a!`, the gap stands), 789 and 341 (c-run2/c22; 341 closed by `c41c3d2b0`), 390 (c-run2/c26), 23 and 393 (c-run2/c30; 393's test in section 1), and 852 (c-run2/c41; its status is item 369).
- c-run3, by c-run3/c-run3-probe: rows 135 (c-run3/c10), 307 (c-run3/c14), 499 (c-run3/c21), 184 (c-run3/c29), 30, 145, 164, 240, 297 and 444 (c-run3/c33); the tests and bisects that follow are in section 1.
- c-run4, by c-run4/c-run4-probe: rows 694, 100 and 221 (c-run4/c12), 432 and 817 (c-run4/c27), 691 and 751 (c-run4/c31), 210 (c-run4/c44), 377 (c-run4/c8).

## 3. Rows for a later run

Every run's `landing.md` lists no held row and no applied row whose cited files changed since the run read them: p-run1, c-run1, c-run2, c-run3 and c-run4 each give "none" under both. So the landings add no row. The rows that the judges held and that still need a line are those of section 1's measurements (747, 20, 330) and rewrites (278, 460, 374, 76, 458, 104, 343, 344, 841, 551, 510, 255); the closes owed (44, 135, 219, 297, 547) follow their tests and bisects.

## 4. `final.silent` waits on item 265

Each chunk's `final.silent` (the judged reading, defect or choice, of each row whose specification cell is `silent`) waits for the curator's answer to review-queue item 265, which asks the status of such a row; it is applied by script then. Nothing here changes for it.

## 5. Filed in the review queue

- **368**, row 83 retired: c-run3/c-run3-probe.
- **369**, row 852's status: c-run2/c41's outcome, kept `CONTESTED` for him by c-run2/c-run2-probe's judge.
- **370**, the APL base ported or left: merged from c-run1/c-run1-probe, c-run3/c-run3-probe (row 235) and c-run4/c-run4-probe.
