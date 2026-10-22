<!-- A read-only health check of the gap ledger at 34fbf49d4 on 2026-10-22: its ten template failures with their fixes, staleness signals found by script without builds, its sizes and growth since the rework, a 43-row sample of open rows assessed by the record rubric, and a recommendation for a full pass and for checks at each landing. -->

# The gap ledger's health, 2026-10-22

Reader: the coordinator, and through the coordinator the curator. I edited nothing tracked and committed nothing. The scripts and their outputs are in this folder (section 8).

(The worker's harness refused this file; the coordinator saved it from the worker's final message, word for word. Of the outputs in section 8, the large ones that the scripts write again at `34fbf49d4` are not committed: `signals.tsv`, `guards.tsv`, `form-signals.tsv`, `unpinned.tsv`, `sample-rows.md`.)

## Summary

- **Template.** `ledger.py check` fails 10 of 793 rows. Seven cite a specification chapter that the build generates from `Library/FortressLibrary.fsi` and that git never held. One cites a generated keyword file. Two name an `XXX` test that a later fix promoted. Corrected lines for all ten are in `template-fixes.rows`, and `ledger.py check --rows` passes them. A row that fails the template also refuses every `note`, because `note` lints the whole line. So five open rows (8, 75, 305, 314, 316) take no note today, and row 642 takes neither a note nor a close.
- **Staleness.** The strongest signal is a note that `ledger.py` refused: 40 open rows have a refused note, listed in a batch record, that never went in, and the row has not changed since. The next strongest are tests that were promoted (rows 307, 642, 665) and commits that say they fix a row (rows 642, 577). Two open rows are fixed in the tree: 642 by `054c4bcfd`, and 577 by `9d24290fb`. Parts of other rows are fixed too: 307, 441, 665 and 330, and probably 44. 280 of 439 open rows (64%) have no gated test, so no landing would notice if one of them were fixed.
- **Sizes.** 281 of 439 open rows have no room for a note of 100 characters, mostly because their notes cell is full (274). The file grew 22.6% since the rework (`ae4f8e38a`, 2026-10-08), from 540,693 to 662,866 characters, through 155 new rows. Of the 347 open rows that predate the rework, 320 have not changed since.
- **Sample.** 43 open rows from all 15 sections: 20 Keep, 15 Reword, 2 Reorganize, 4 Investigate, 2 Close. The check failed most often is consistency (16), then scope and present meaning (12 each). The common faults: the claim no longer matches the notes or the tree (a fixed half or a renamed message stays in the claim), notes that tell the row's repair history, and a reproducer that does not reproduce the claim. Among the rows that a signal flags, 14 of 16 need action. Among the unflagged rows, 9 of 27 do.
- **Recommendation.** Yes, a full pass is needed: a reading of all 439 open rows (about 529K characters), not only the flagged ones. By the sample's rates, about 180 of them need a change (between about 120 and 250), and about 30 to 40 need a re-measurement first. The pass is not possible with today's tool. `ledger.py` cannot rewrite an open row's claim, cut its notes, close a `CONTESTED` row, or close a row whose test is not in the test folders (review-queue item 165). So the routes come first. Then six cheap checks at each landing would keep the ledger in shape (section 6.3). Five of them need no reading; the sixth is a short reading of the rows the landing touches.

## 1. Base and method

- I started at `772a5a2af`. `main` moved to `34fbf49d4` during the work, but only the boot note changed (`git diff --stat 772a5a2af 34fbf49d4 -- explorations/fortress-gap-ledger.md explorations/coordinator/FACTS.md explorations/coordinator/POSITIONS.md explorations/coordinator/tools/ledger.py` is empty). Every number below holds at `34fbf49d4`.
- **The rework's date.** The brief dates the rework 2026-10-13. Git dates the rework commit 2026-10-08: `ae4f8e38a`, "Gap ledger rewritten to the row template in fifteen topic sections; its history file; the ledger's line citations re-pointed to rows", the day after `ledger.py` landed (`a8896972b`). The ten batches since then are 11 to 20 (with 13b and 15b), which matches the brief's "ten climb batches". Section 4 measures growth from both dates.
- Open rows: `NEGATIVE-VERIFIED` (414), `NEGATIVE-BOUNDED` (12) and `CONTESTED` (13), 439 in all (`count.txt`). The 117 `POSITIVE-VERIFIED` rows are outside the brief's definition and outside the sample.
- No build, test or program was run. Every claim about the tree below comes from reading it or its git history.
- The rubric is `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", adapted to a row: the claim is the row's current claim and its scope, and the evidence is the reproducer and the cited lines. I added one disposition to its four, **Close**: the row's defect is fixed in the tree, and the close is owed.
- Eras, by row number: A, rows 1 to 310, entered up to 2026-09-16; B, rows 311 to 639, up to the rework; C, rows 640 to 794, since the rework.

## 2. Template failures and their fixes

`python3 explorations/coordinator/tools/ledger.py check` (`check.txt`):

    ledger.py check: fortress-gap-ledger.md, 793 rows, 10 fail the template; rows (or places) failing each rule: spec-path 8, reproducer-path 2, spec-section 1

Nine of the ten failures date from the rework: climb batch 12's gather counted "the base's eight `spec-path` and one `spec-section` failures" (`compile-ladder/climb-batch-12/RECORD.md:54`). Since then the tool has added two.

| Row | Status | Rule | Cause | Corrected cell |
|---|---|---|---|---|
| 8 | NEGATIVE-VERIFIED | spec-path `fortress/fortress-keywords.tex` | The spec build writes this file (`Specification/fortress/keywords.pl:14-18`, from `SpecData/tables/fortress-keywords`), and `basic/lexical-structure.tex:777` inputs it. Git never held it. | spec: `basic/lexical-structure.tex`, "Reserved Words" (86 reserved words, `label` among them; the list is generated at the specification's build from `SpecData/tables/fortress-keywords`) |
| 72, 73, 75, 305, 314, 162 | DUPLICATE, FIXED, NEGATIVE-VERIFIED ×3, POSITIVE-VERIFIED | spec-path `Specification/library/apis/FortressLibrary.tex` (162: `library/apis/…`) | The spec build typesets this chapter from the api (`Specification/fortress/build.xml:42`, `library.api`), and `library/default-libraries.tex:27` inputs it. Git never held it. Its headings are the doc comments of `Library/FortressLibrary.fsi`: Simple Combinators `:19`, Assertions `:236`, Numeric hierarchy `:257`, Array support `:1204`, Ranges `:2173`, Top-level primitives `:2541`. | spec: `library/default-libraries.tex`, "FortressLibrary" (subsection Array support, typeset from `Library/FortressLibrary.fsi`), with each row's own subsection |
| 316 | NEGATIVE-VERIFIED | spec-path, as above; and spec-section "Ranges" | The same. The section check failed only because the file was missing. | spec: `basic/operators/juxtameaning.tex`, "Juxtaposition"; `library/default-libraries.tex`, "FortressLibrary" (subsection Ranges, trait `String`, typeset from `Library/FortressLibrary.fsi`) |
| 535 | FIXED | reproducer-path `XXXInferLoneUnionClosedTrait.fss` | Promoted to `InferLoneUnionClosedTrait.{fss,test}` by `0856f3e6a` (climb batch 14), which touched this row's table without fixing the cell. | reproducer: `ProjectFortress/compiler_tests/InferLoneUnionClosedTrait.test`. Its notes are also false: they say "`k(pk0(Tri, Sq))` is now refused at `BoxT[\Any\]`, a refusal the `XXX` test pins", but the promoted test runs and asserts `k(pk0(Tri, Sq)) -> BoxT[Fig]`. The corrected notes say so. |
| 642 | CONTESTED | reproducer-path `XXXInferResultOnlyLabelBody.test` | `054c4bcfd` (climb batch 12 rung C) fixed the row under Q48(a) and promoted the test: "the team's checker's omissions are gaps repaired (rows 642, 644 and 651)". `ledger.py close` refuses a `CONTESTED` row, and `note` refuses a row whose reproducer is gone, so the close has been owed since 2026-10-09 (`climb-batch-12/RECORD.md:60`, `:149`; PLAN gather.2; review-queue item 165). | The `FIXED` line: claim's first sentence; reproducer `ProjectFortress/compiler_tests/InferResultOnlyLabelBody.test`; notes "fixed `054c4bcfd` (climb batch 12 rung C, under the curator's answer to Q48(a)); full text: history, row 642" |

- The ten corrected lines are in `template-fixes.rows`. `ledger.py check --rows template-fixes.rows` reports "10 rows, 0 fail the template". The longest is row 314, at 1,188 characters.
- No command writes these lines today, except a hand edit with the history file. A `rewrite` route (section 6.2) would write them.
- Other way, for the seven api rows: teach `lint_spec` that `library/apis/NAME.tex` is generated from `Library/NAME.fsi` (or `ProjectFortress/LibraryBuiltin/NAME.fsi`), and read its headings from the `* \subsection*{…}` doc lines. The seven rows would then pass unchanged. `TEX_HEAD` would need to accept the leading `* `.
- Unresolved, minor: row 8 says 86 reserved words, but `SpecData/tables/fortress-keywords` holds 79 and `fortress-specialReservedWords` 6.

## 3. Staleness signals

Scripts: `scripts/signals.py` (path, reproducer, commit and record signals, output `signals.tsv`), `scripts/refused_notes.py` (`refused-notes.tsv`), `scripts/guards.py` (`guards.tsv`, `guards-table.txt`), `scripts/form_signals.py` (`form-signals.tsv`, `.txt`) and `scripts/unpinned.py` (`unpinned.tsv`). Each takes 5 to 35 seconds. The "real" column counts the hits I confirmed by reading; the scripts cannot tell the cases apart.

### 3.1 The signals over the 439 open rows

| Signal | Rows | Real, by reading | Examples |
|---|---|---|---|
| A note refused by `ledger.py` and listed in a batch record's "Ledger notes not written", with the row unchanged since | 40 | All 10 read are real; the notes hold facts that the row now lacks | 307: "the checker accepts arithmetic in a size (f623ce187; `XXXNatArithChecker` promoted …)"; 533: "`MultiplicativeRing`'s api power is now `abstract opr ^(self, other:AnyIntegral): T`"; 726: "`FlatString`'s api no longer declares the pair"; 577 holds six such notes |
| The row names an `XXX` test that no longer exists | 3 | 3 | 307 (`XXXNatArithChecker`, renamed `NatArithSize` in `7fd8fddc8`); 642; 665 (`XXXOverrideNothingGenericWalk` and `…TraitWalk`, promoted in `efd6bb2f2`) |
| The reproducer is an `XXX` test whose file is gone, and a plain twin exists | 2 | 1 | 642. False: 559, a run-time pair |
| The reproducer was renamed from an `XXX` name | 1 | 0 | 268: the team's own rename, in 2007 |
| An open `NEGATIVE-VERIFIED` row whose spec cell is not `silent` and whose reproducer is a plain test | 6 | 3 of the 4 read | 731 (its test asserts the fixed sibling), 313 (a walk test; the defect is compiled), 330 (the test pins a half that the curator ruled on). 746 is a deliberate pin, as its class says. 315 and 675 not read |
| A commit or tool commit since the rework names the open row with a repair word | 3 | 1 | 642 (`054c4bcfd`). False: 539 and 778 |
| A commit's subject names the open row | 1 | 1 | 577: `9d24290fb` "Distance classes: classify.py finds its library places by declaration (row 577)" |
| FACTS or POSITIONS names the open row with a repair word | 24 | 0 | All 24 read: future-tense plans (P-38, P-69), measurements (F-245) or agreement (F-85, F-141, F-143) |
| FACTS or POSITIONS names a FIXED row with an open word | 12 | 1 | F-174: "Each path fails some sets that the rules accept, and Appendix I names them (rows 159, 537, 539, 542)", but row 159 is FIXED (`6d187d069`, climb batch 17). Others false: F-12, F-42, F-70, F-114, F-143, F-158, F-232 |
| Text after the "full text: history, row N" marker | 17 | 17, by its form | 20: "… history, row 20 A set comprehension shows it too: row 646." 539, 589: "Climb batch 17 rung G: …" `note` appends after the marker |
| The claim names a closed row | 2 | 1 of the 1 read | 495 defines its defect as "the compiled dispatch defects of rows 493 and 494", both FIXED. 546 not read |
| A cited path is gone: a probe under `explorations/`, and the row says where to read it | 168 | allowed | The template says how to read such a path from history |
| … the row does not say where | 35 | allowed, but a reader must know the template's rule | 84's `g4a_base.fss` and four more "beside it"; 158, 207 |
| … never in git | 18 rows (24 citations) | 5 are the template rows | The others: probes never committed (672's `NanLess.fss`, skeptic probes such as `SkCompiledLeft.fss`), placeholders (`P.fss`, `bytecode_cache/`), and 745's `testFile.txt`, a file its command writes |
| … a file of the original tree | 1 | 1 | 642 |
| A cited line lies past the file's end | 3 | 1 | 268: `ProjectFortress/build.xml:1264` is the 18-line deprecated stub; the target is the root `build.xml` (`testsyntax` at `:1264` on `052a7c3fe`, now `:1507`). False: 223 and 229 read `line:column` |
| A line "at HASH" whose file changed since HASH | 70 | allowed by the template | 44 of them at the rework's base `052a7c3fe`, mostly in `Library/FortressLibrary.fss` (+416 −249 lines since) |
| An original-tree `file:line` with no commit anywhere in the row | 97 of the 330 that cite one | form | 405: `STypeEnv.scala:192-193`, the refusal now at `:200` |
| Every listed sibling is closed | 36 | weak | 405, 219, 416, 510 |
| `NEGATIVE-VERIFIED` beside spec `silent` | 76 | a template question (section 7) | 141, 268, 336 |
| An F- or P- number that FACTS or POSITIONS no longer holds | 0 | | |

### 3.2 Who guards an open row

`guards-table.txt`, by the reproducer's kind:

    era  xxx  plain  probe  other-path  none  missing  total
    A      3      1     25           1   134        0    164
    B     91     10      9           2    71        0    183
    C     45      9      3           2    32        1     92
    all  139     20     37           5   237        1    439

- An `XXX` test turns red at the gate when its defect is fixed, and a plain test that pins today's behaviour turns red when the behaviour changes. So the 159 rows with either are guarded.
- The other 280 rows (64%) are not: 237 have reproducer `none`, 37 name only a probe that no gate runs, 5 name a file that is no test, and 1 names a test that is gone. By area: parser 66, walk 57, library 56, checker 40, prelude 18, codegen 15, specification 11.
- Of the 164 open rows of era A, 160 are unguarded. They were measured from 2026-09-08 to 09-16, before most of the ledger's 208 FIXED rows were fixed.
- The sample found two era-A claims that the tree has since made false (44, and 20 probably), and one era-A row that cites the wrong file (268).

### 3.3 What the signals do not catch

Of the 23 sampled rows that need action, 9 carry no signal: 731, 313, 782, 97, 330, 44, 141, 59 and 584. Two of these show that scripts cannot settle staleness alone:

- Row 44's claim was false from `d846e3644` on (2026-09-27), when `SUM` was retyped. That is before the rework, which kept the claim.
- Row 782's claim keeps the figure "from 17 entries to 165", while its own last note says "those 17 entries are gone".

Only a reader finds such cases.

## 4. Sizes and growth

`scripts/sizes.py` (`sizes.txt`) and `scripts/growth.py` (`growth.tsv`):

    group     rows  row>=1190  row>=1150  row>=1100  row>=1000  notes>=690  notes>=650  notes>=600  median_row  median_notes
    open       439         20         77        135        256          79         193         274        1032           634
    positive   117          1          2          9         29          14          32          41         842           527
    closed     237          0          1          2          4           2           2           4         489           138

- 281 of 439 open rows cannot take a note of 100 characters: 274 because of the notes cell, and 135 because of the whole row (some for both). 52 claims are at 280 or more of their 300 characters.
- The limits have turned overflow into lost notes. The batch records of climb batches 11 to 20 list 131 notes, over 84 rows, that did not go in whole: 117 refused and 14 condensed. The texts survive only in those records (`refused-notes.tsv`). Review-queue item 165 tracks them.
- New rows are written near the limit. The 92 open rows added since the rework have a median of 1,049 characters, and 43 of them already stand at 1,100 characters or more, or at 600 characters of notes or more.

Growth since the rework, `ae4f8e38a` (2026-10-08):

    file: 540693 -> 662866 characters (+122173, +22.6%)
    rows: 638 -> 793 (155 new, rows 640 to 794)
    new rows: 135492 characters; by status now: NEGATIVE-VERIFIED 75, CONTESTED 10, FIXED 63, NEGATIVE-BOUNDED 7
    old rows changed: 66 (grew 26 by 2644 characters, shrank 40 by 16118 characters, mostly closes)
    old rows still open: 347; of them changed since: 27

Since `250fdafe8`, the last ledger commit of 2026-10-13: +74,586 characters (+12.7%), 92 new rows, and 28 of the 374 old open rows changed (`sizes-since-1013.txt`).

So the growth is all new rows. Existing open rows barely change: they are full, so they cannot take what the batches learn about them.

## 5. The sample

### 5.1 How the sample was chosen

- 43 open rows, from all 15 sections: 12 of era A, 12 of era B and 19 of era C. The number of each section is `sample-rows.txt`.
- 16 rows carry a strong signal of section 3; 27 carry none.
- The rows as they stood are in `sample-rows.md`. The assessment, with the quoted failing passage of each failed check, is in `sample-assessment.tsv`.
- P = pass, F = fail, U = unresolved (evidence needed, not guessed).

### 5.2 Results by check

| Check | Pass | Fail | Unresolved |
|---|---|---|---|
| Scope | 30 | 12 | 1 |
| Present meaning | 29 | 12 | 2 |
| Evidence | 35 | 6 | 2 |
| Comprehension | 38 | 5 | 0 |
| Ownership | 37 | 6 | 0 |
| Consistency | 27 | 16 | 0 |

### 5.3 Results by disposition

| Disposition | Rows | Which |
|---|---|---|
| Keep | 20 | 5, 84, 405, 652, 776, 112, 787, 786, 792, 94, 672, 436, 716, 35, 794, 746, 790, 207, 745, 641 |
| Reword | 15 | 307, 313, 665, 782, 539, 495, 682, 726, 336, 330, 141, 59, 584, 701, 268 |
| Reorganize | 2 | 731 (another row's correction in its notes; a reproducer of the fixed sibling), 441 (the walk half is fixed under P-153; the row becomes P-153's compiled half) |
| Investigate | 4 | 20, 533, 97, 44 |
| Close | 2 | 642 (`054c4bcfd`), 577 (`9d24290fb`) |

By era: A, 6 Keep of 12; B, 2 Keep of 12; C, 12 Keep of 19. The rows written since the rework are in the best shape, and the era-B rows, written by batches and noted most, are in the worst.

### 5.4 The table

Sc = scope, Pr = present meaning, Ev = evidence, Co = comprehension, Ow = ownership, Cn = consistency. NV = NEGATIVE-VERIFIED, NB = NEGATIVE-BOUNDED, CON = CONTESTED.

| Row | Era | Status | Sc | Pr | Ev | Co | Ow | Cn | Disposition | The failing passage, or why it passes |
|---|---|---|---|---|---|---|---|---|---|---|
| 5 | A | NV | P | P | P | P | P | P | Keep | The parser grammars are unchanged since the team (`git log a874948ac..HEAD -- ProjectFortress/src/com/sun/fortress/parser/*.rats` is empty). |
| 84 | A | NV | P | P | P | P | P | P | Keep | `Expression.rats:384-386` still reads `PrimaryItem = LeftAssociatedPrimary / MathPrimary`. |
| 405 | B | NV | P | P | P | P | P | P | Keep | Minor: `STypeEnv.scala:192-193` carries no commit, and the refusal is now at `:200`. Two refused notes wait. |
| 652 | C | NV | P | P | P | P | P | P | Keep | |
| 20 | A | NV | U | U | U | F | P | F | Investigate | "probe and full text: history, row 20 A set comprehension shows it too: row 646." Row 646 is FIXED (F-143), and walk now types a comprehension by its elements' join (F-228). Not measured again since run-b. |
| 307 | B | NV | F | F | P | P | P | F | Reword | "Arithmetic in a size … is refused (`XXXNatArithChecker`) where walk runs it": `7fd8fddc8` promoted that test to `NatArithSize`, and the checker accepts arithmetic in a size (F-146). Three refused notes wait; the row is at 1,194 characters. |
| 533 | B | NV | F | F | F | P | P | F | Investigate | Claim: "ties `RR64`'s `opr ^(self, b:RR64)` with `MultiplicativeRing`'s `opr ^(self, other:ZZ64)`". The ring's power is now `abstract opr ^(self, other:AnyIntegral): T` (`Library/FortressLibrary.fsi:283`). Notes: "Not measured since batch 8's numeral library". |
| 642 | C | CON | F | F | F | P | P | F | Close | Fixed by `054c4bcfd`. Notes: "The test pins today's refusal", but the test was promoted. |
| 731 | C | NV | P | F | F | P | F | P | Reorganize | Notes: "Row 425's text corrected: its expected-type half is fixed since climb batch 14's rung A". The reproducer `InferBigOperatorUnwritten` is a passing run test of the plain-bounded case (its header: "instantiates the operator at its bound; ledger row 425"), not of the F-bounded defect that the claim states. |
| 776 | C | NV | P | P | P | P | P | P | Keep | |
| 112 | A | NV | P | P | P | P | P | P | Keep | No revival change to value objects found in FACTS, POSITIONS or `git log -S isValueObject`. |
| 313 | B | NV | P | P | P | F | P | P | Reword | The reproducer `ProjectFortress/tests/immutableTopLevel.fss` is a walk test that passes. The defect shows only when the program is compiled. |
| 665 | C | NV | F | F | P | P | F | F | Reword | Claim: "the load checks … of an `override` that overrides nothing skip generic objects … and generic traits": fixed in `efd6bb2f2` (climb batch 13). Notes: "`XXXOverrideNothingGenericWalk`, `XXXOverrideNothingGenericTraitWalk` … gate the other shapes" (both promoted); "Rows 667 and 668 are fixed (668 by f9fe5c874)". |
| 782 | C | NB | F | F | P | P | P | F | Reword | Claim: "grows from 17 entries to 165". Notes: "Batch 20 rung A: those 17 entries are gone." |
| 97 | A | NV | P | U | U | P | P | P | Investigate | Measured in run-b2. Batches 13 to 19 rewrote walk's overloading check (its message is still at `OverloadedFunction.java:601`), and sibling 159 is FIXED. |
| 539 | B | NV | F | F | P | F | P | F | Reword | The claim quotes "'at least one pair of parameters must have excluding types'"; the refusal now says "fails the Meet Rule" (review item 187). Notes: "full text: history, row 539 Climb batch 17 rung G: only m[\P\] beside m[\Q\] is refused". |
| 787 | C | NV | P | P | P | P | P | P | Keep | `OverloadedFunction.java:943` reads the `where` clauses as the row says. |
| 495 | B | NV | P | P | P | F | P | P | Reword | Claim: "generic dotted methods keep the compiled dispatch defects of rows 493 and 494". Both rows are FIXED, so the claim names its defect through two closed rows. |
| 682 | C | CON | P | P | P | F | P | P | Reword | Notes: "Unsettled: …" and "Settled for the checker: `reviews/array-judgements-popl-check.md` § 7". The hinge, review-queue item 30 (way 4a), is not named. Climb batch 17's note (the type face is refused too) waits. |
| 726 | C | NV | P | F | P | P | P | F | Reword | Notes: "`FlatString`'s api declares this pair (`Library/FlatString.fsi:17`, `:20`)". The api now declares only the `\|\|` with `self` first (`FlatString.fsi:16-21`; climb batch 19's refused note). |
| 786 | C | CON | P | P | P | P | P | P | Keep | |
| 336 | B | NV | P | P | P | P | F | F | Reword | "Fix: a zero test raising `DivisionByZero` as `Int.overflow()` (`:258`)": the helper `Int.divisionByZero()` now exists (`Int.java:263`). The `ZZ` case (climb batch 12) and the helper (batch 20) wait as refused notes. |
| 441 | B | NV | F | F | F | P | P | F | Reorganize | Claim: "a negative power of an integer has no specified result … `2^(-1)` is `0.5` … under walk". Notes: "The curator chooses a rational, a throw, or `RR64`". P-153 chose. Walk raises (`Int.java:291`), and P-153's "Still to build" names this row for the compiled half. |
| 792 | C | CON | P | P | P | P | P | P | Keep | |
| 94 | A | NV | P | P | P | P | P | P | Keep | There is no `pi` in `FortressLibrary.fsi`, and no `RationalValueTimesPi` in `Library/`. |
| 330 | B | NV | F | F | P | P | P | F | Reword | Claim: "the float types' `floor` and `ceiling` return a float where the specification returns an integer". P-68 rules that they keep the float (Built). The open part is the brackets, `round` and `truncate` to `ZZ`. |
| 672 | C | CON | P | P | P | P | P | P | Keep | |
| 44 | A | NV | F | F | F | P | P | F | Investigate | Claim: "the library's `SUM` is sealed twice over, by `[\T extends Number\]` and an `unwrap` that is `cast[\Number\]`". `opr SUM[\T extends AdditiveGroup[\T\]\]` since `d846e3644` (2026-09-27), and row 436 says a nonempty `SUM` over a user `AdditiveGroup` runs. |
| 436 | B | NV | P | P | P | P | P | P | Keep | F-85 agrees with it. |
| 716 | C | NV | P | P | P | P | P | P | Keep | |
| 35 | A | NV | P | P | P | P | P | P | Keep | No postfix `^T`, matrix power or matrix norm in the apis; there is a vector norm (`FortressLibrary.fsi:1686`). |
| 794 | C | NV | P | P | P | P | P | P | Keep | |
| 141 | A | NV | P | P | P | P | P | F | Reword | Status `NEGATIVE-VERIFIED` ("the specification settles it") beside spec `silent` and class `deliberate (library)`. The row records a documented behaviour (`FlatString.fss:150`). |
| 59 | A | NV | F | P | P | P | F | P | Reword | The claim joins a race that the memory model defines ("a bare `acc := acc + c` inside a parallel `for` silently loses updates") with the unbuilt reduction variables, under `implementation gap (walk)`, though both show compiled too. Notes: "Fixed half: `atomic` on a top-level variable lost updates on the compiled path until repair batch R1". |
| 746 | C | NV | P | P | P | P | P | P | Keep | Minor: "its revision box waits for the next rung that edits `if.tex`" is task bookkeeping. |
| 584 | B | NV | P | P | P | P | F | F | Reword | "Admitted to its three loops: 49→249, 200 errors in 11 families": F-245 owns the count (205 at `d212b2c1f`). Three refused notes wait (batch 20: `isDeclaredName` is now at `OverloadingChecker.scala:742-746`). |
| 701 | C | NV | F | P | P | P | P | F | Reword | Claim: "refuses every function, object and trait declaration that carries a `where` clause or a contract". An `extends` entry's `where` clause compiles (row 774), and a contract never reaches the code generator (row 781). Review item 182; the row is at 1,199 characters. |
| 790 | C | NV | P | P | P | P | P | P | Keep | |
| 207 | A | NV | P | P | P | P | P | P | Keep | It names its probes as gone. |
| 268 | A | NV | P | P | F | P | P | P | Reword | "`ProjectFortress/build.xml:1264` (`testsyntax`)": that file is the 18-line deprecated stub. The target is the root `build.xml` (`:1507` now, `testNightly` `:1564`). |
| 577 | B | NV | F | F | P | P | F | F | Close | Fixed by `9d24290fb`. Its notes are a log of sightings: "seen again in batch 9 rung R …; batch 10 rungs N and G …; full text: history, row 577 again: rung-library-slips, section 6". |
| 745 | C | NB | P | P | P | P | P | P | Keep | |
| 641 | C | NB | P | P | P | P | P | P | Keep | |

### 5.5 What the sample shows

1. **A row's claim is not kept in step with its notes or the tree.** A batch fixes half of a row or changes its message. The note that says so is refused, or goes in after the history marker, and the claim keeps the old statement. Cases: 307, 330, 441, 539, 665, 701, 726 and 782. No command corrects an open row's claim (`records.md`, "Three limits of `ledger.py`"). This is the main source of the consistency failures.
2. **Fixed but open.** 642 and 577 are fixed and stay open only because `close` has no route for them: a `CONTESTED` row, and a test outside the test folders (`explorations/coordinator/tools/distance/test_classify.py`). 44 is probably fixed by `d846e3644`; it is in the Investigate group because a CastError on nested arrays may remain.
3. **Notes that tell the repair history.** Over all open rows, 162 of 439 name at least one of these: a batch or rung (84 rows), a skeptic, judge or gather (63), a repair design (41), a repair story (26) (`form-signals.txt`). On 2026-10-08 the archaeology found 81% to 88% of era B to D rows naming a batch, so the rework cut this a great deal. What remains is concentrated in the rows that batches note: 577 is the extreme, a log of every batch's sighting. 731 carries another row's correction. 59, 307 and 665 tell what was fixed when.
4. **A reproducer that does not reproduce.** In 731, 313 and 330 the reproducer is a plain test that passes, and in 731 it tests the fixed sibling. A reader takes the cell as the defect's test.
5. **Rows written since the rework are in the best shape** (12 of 19 Keep). The template works for new text, but those rows also start near the limit (section 4).
6. **The era-A rows that hold are the parser and library rows whose code no one has touched** (5, 84, 94, 35, 112, 207). The era-A rows that fail sit where batches 13 to 20 worked: overloading, reductions and inference (20, 44, 97).

## 6. Recommendation

### 6.1 A full pass: needed

- **What it covers.** Every open row, all 439 (about 529K characters of row text, about 170K tokens to read). Read the 117 `POSITIVE-VERIFIED` rows too if the budget allows: they were not sampled.
- **Why every row.** Of the 16 sampled rows that a signal flags, 14 need action, but 9 of the 23 sampled rows that need action carry no signal. So a pass over the flagged rows alone would miss most of the work.
- **What it does to each row.** It applies the rubric of section 5, with this ledger's checks:
  - the claim states what fails now, and names no fixed half;
  - the reproducer reproduces the claim (an `XXX` test while the spec settles it);
  - the notes hold the mechanism with a pinned line, the workaround and the siblings, and no repair story;
  - FACTS and POSITIONS agree with the row.
- **Its size, by the sample's rates.**
  - Flagged rows: 60 × 14/16 ≈ 53. Unflagged rows: 379 × 9/27 ≈ 126. About 180 rows in all need a change. With 27 unflagged rows sampled, the range is roughly 120 to 250.
  - Of these, about 2 in 23 are a close owed, 4 in 23 need a re-measurement (Investigate: about 30 to 40 rows, a later run, not part of the reading), and the rest are a rewrite of the claim or the notes.
  - The 40 rows with refused notes are part of the 180: their notes' texts are in the batch records, so the writer can start from them.
- **Order.** First the routes (6.2). Then the 10 template rows and the 2 owed closes (642, 577). Then the 60 flagged rows, then the rest by section. A reader who knows Fortress but not the batches checks the rewritten rows, as the rubric asks.
- **Not part of it.** Running the 237 `none` rows again. The pass lists the rows whose evidence is too old to trust (Investigate), and a later probe runs them. It does not move rows between sections.

### 6.2 Tool routes before the pass

These are review-queue item 165's routes, which the pass cannot do without. Every gather since climb batch 15 has met these limits.

1. **`ledger.py rewrite N FILE`.** It writes a whole new line for an open row, checked by the template, and keeps the old line in the history ("rewritten"), as `record.py set` does for FACTS. The full pass writes through it, and so do the template fixes and claim corrections such as items 182 and 187. A `--base` check already proves that no text is lost.
2. **`close` for a `CONTESTED` row whose question is settled (642), and for a fix whose test lies outside the test folders (577).** For the second, either accept a test under `explorations/coordinator/tools/`, or accept `--test none` with a reason.
3. **`note` inserts before the "full text: history, row N" marker,** not after it (17 rows show the result). It should lint only the cells it changes, so that a template failure elsewhere in the row does not block a note.
4. **Optional: `lint_spec` reads `library/apis/NAME.tex` as typeset from `NAME.fsi`** (section 2).

### 6.3 Checks at each landing

All of these run on the landing's diff and the ledger, with no build. The synthesis review asks for no full audit after every landing, so these checks look only at the rows that the landing touches. They would have caught 642, 535, 577, 307, 665 and the 40 rows with refused notes when each happened.

1. **`ledger.py check` with a zero allowance.** Run it on the whole ledger, and also `check --base <the batch's base>`. The gather fails on any new failure: batch 12's gather noticed row 642's failure and landed it anyway (`climb-batch-12/RECORD.md:54`).
2. **Renamed or deleted `XXX` tests.** For every `XXX` file that the landing deletes or renames (`git diff --name-status -M BASE..HEAD | grep XXX`), each row that names it in any cell must be closed or rewritten in the same landing. Use `ledger.py find --cites` or a grep for the stem. This catches promotions such as 642, 535, 307 and 665.
3. **Rows that a landing commit names.** List every row named in the landing's commit messages with a repair word, or in a subject as "(row N)". Each must be closed, or its notes changed, in that landing (as for 642 and 577). `scripts/signals.py`'s `commit_signals` does this over a range.
4. **No refused note left over.** The gather's "Ledger notes not written" list must be empty, or each of its items must go through a route of 6.2 before the routing ends. Today 117 refused texts wait in the batch records, and 40 open rows have one that never went in (`scripts/refused_notes.py`).
5. **Rows on the files the landing changes.** For each original-tree file in the diff, `ledger.py find --cites FILE` lists the open rows that cite it, and the record pass reads them by the rubric. This is the "affected related entries" step that the synthesis review gives for FACTS, applied to the ledger.
6. **FACTS and POSITIONS.** For each entry the landing changes, list the rows it names, and compare their statuses. An entry that calls a FIXED row open, as F-174 does row 159, is a finding.

Size budget, for the curator to choose: write a new row at 900 characters at most, so that it can take later notes. 43 of the 92 new open rows began near the limit.

## 7. Report items

- **Defects.** These are in the record's own tools, not in the language implementation:
  - `ledger.py note` appends after the history marker, and lints the whole line, so a row that already fails the template takes no note (`explorations/coordinator/tools/ledger.py:778-793`).
  - `close` refuses a `CONTESTED` row (`:809-810`) and a test outside the test folders (`:806`).
  - No command rewrites an open row.
  - These are recorded in review-queue item 165. Nothing is added.
- **Sentences of the specification made false.** None.
- **Decisions.**
  - I took "open" as the brief defines it, three statuses, and left out `POSITIVE-VERIFIED`.
  - I added the disposition Close to the rubric's four, for a row fixed in the tree.
  - I measured growth from `ae4f8e38a`, the rework commit by git, and also from 2026-10-13 as the brief dates it.
  - I counted a probe path under `explorations/` that is gone as allowed, by the template's rule for reading such a path from history.
  - I sampled rows that the signals flagged on purpose, so the projection in 6.1 is stratified, not a plain rate.
- **For FACTS** (a correction, not a new fact).
  - F-174 says "Each path fails some sets that the rules accept, and Appendix I names them (rows 159, 537, 539, 542)". Row 159 is FIXED by `6d187d069` (climb batch 17 rung G).
  - What it means for the work: a reader of F-174 takes walk's refusal of two generic declarations, one more specific, as live.
  - Evidence: `python3 explorations/coordinator/tools/ledger.py show 159 --short` prints `159 | FIXED`, with "fixed `6d187d069`" in its notes. Whether Appendix I still names row 159 was not checked.
- **Commands.** Each script's header in `scripts/` gives what it does. Of note: `ledger.py check --rows FILE` lints candidate lines without writing.
- **Questions for the curator.**
  1. The template defines `NEGATIVE-VERIFIED` as "the specification settles it", but 76 open rows hold it beside a spec cell of `silent`: home-3 defects, and some deliberate behaviours such as 141. Which status does a defect take where the specification is silent? Alternatives: keep `NEGATIVE-VERIFIED` and widen its definition; use `CONTESTED`; or use `POSITIVE-VERIFIED` for a behaviour that is a choice. Default: the rows as they are, until the full pass. Cost: one line of the template, and the status of up to 76 rows in the pass.
  2. Should a new row be held to 900 characters at entry (6.3)? Default: no new limit.
  3. Is the full pass (6.1) worth about 180 row rewrites and 30 to 40 re-measurements, after the routes of 6.2? Default: no pass. The landing checks still stop new staleness, but the existing 180 or so rows stay as they are.

## 8. Files

All under `explorations/coordinator/ledger-health-2026-10-22/`:

- Inputs measured: `check.txt`, `count.txt` (`ledger.py check` and `count`).
- `template-fixes.rows`: the ten corrected lines (section 2).
- `scripts/signals.py` → `signals.tsv`, `signals-counts.txt` (section 3.1).
- `scripts/refused_notes.py` → `refused-notes.tsv`: each refused or condensed note in the batch records of climb batches 11 to 20, and whether its row changed since.
- `scripts/guards.py` → `guards.tsv`, `guards-table.txt` (section 3.2).
- `scripts/form_signals.py` → `form-signals.tsv`, `form-signals.txt`.
- `scripts/unpinned.py` → `unpinned.tsv`.
- `flagged-rows.tsv`: the 60 open rows with a strong signal.
- `scripts/sizes.py` → `sizes.txt`, `sizes-since-1013.txt`; `scripts/growth.py` → `growth.tsv` (section 4).
- `sample-rows.txt`, `sample-rows.md`, `sample-assessment.tsv` (section 5).
