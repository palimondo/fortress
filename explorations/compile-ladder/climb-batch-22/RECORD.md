# Climb batch 22: the gather's record

Written at the gather stage of climb batch 22 (2026-10-24), the batch of `explorations/coordinator/CLIMB-BATCH-22.md` for the distance's last five errors (rungs E, R and T), on `main` from the base `64386618b3717aebade3662cb09483043825e124`. `main` was at the base when the gather began, and no other commit came to it while the gather worked. Every rung was approved by its skeptic, with no contested fix, no judge and no repair round. Nothing was merged: each branch stays as it is, `wip/rung-export-last` at `4236e2f7a`, `wip/rung-body-arguments` at `c246fc9f3`, `wip/rung-string-members` at `aef18c9ff`.

**Preconditions.** `git status --porcelain` printed nothing, and `64386618b` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0). `ledger.py landing-check 64386618b3717aebade3662cb09483043825e124` on the base printed "64386618b..HEAD: no finding"; `record.py check --base 64386618b` "0 failures".

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff 64386618b...<branch>`. The rung commits were composed on `main` itself, each patch applied with `git apply --3way --index`, its record folded and its commit made before the next patch was applied. For the merged-tree tests a tree was seeded outside the main tree from the batch's base build, `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base22 /home/user/fortress-gather22 - 64386618b3717aebade3662cb09483043825e124` ("seeded from /home/user/fortress-base22 (08c95c708) in 3 s"; `git diff --stat 08c95c708 64386618b -- Library ProjectFortress build.xml bin Specification` prints nothing, so the base build's code is the base's). The batch edits no Java, Scala or grammar, so the seeded build stands and the gather tree needed no `ant compileAll` and no library order (the rungs edit walk's library only). Nothing was built or run in the main tree or in the base build. In the gather tree the three patches were applied together, in the order below, with `git apply --3way --index` (no conflict). The code and tests the merged-tree tests ran on are `main`'s: the gather tree's index, written as a tree (`git write-tree`, `0524963a5`), against `main` after the three rung commits, `git diff --stat 0524963a5 c8e013faf -- Library ProjectFortress Specification build.xml bin`, prints nothing.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | E, `rung-export-last` | `wip/rung-export-last` at `4236e2f7a` | `8dd64e8fc` |
| 2 | R, `rung-body-arguments` | `wip/rung-body-arguments` at `c246fc9f3` | `bd00ad997` |
| 3 | T, `rung-string-members` | `wip/rung-string-members` at `aef18c9ff` | `c8e013faf` |
| | the rows' closes | | `30ead0f11` |

## The order the rungs were applied in

E, R, T: the manifest's order, which both rules also give.
- No rung declares `landsOnlyWith`, so the first rule orders nothing.
- Shared files, from `git diff -U0 64386618b...<branch>` per branch, compared only within one file, each rung's lowest edited line at the base:
  - `Library/FortressLibrary.fss`, edited by all three: E at `:498` (`RR64`'s brackets), R at `:1476` (the fused arm), T at `:4336` (`String`'s `excludes` clause). So E, R, T.
  - `Library/FortressLibrary.fsi`, edited by E and T: E at `:125` (`TotalComparison`'s `=`), T at `:2454`. So E before T.
  - No other file is shared: R's `Library/List.fss` and T's `Library/String.fss` and `Library/FlatString.fss` are each one rung's.
- The two shared files order no pair both ways, so no pair falls back to the manifest's order.
- Each patch applied with no conflict, on the gather tree together and on `main` in turn: every hunk "cleanly", or after git's fallback to direct application for the files new to the tree. The rungs change different declarations (the batch record's "No two rungs change one declaration").

**Lines moved.** The folded record cites `main`'s lines; the rung files (`REPORT.md`, `SKEPTIC.md`) cite their own rung's tree and are not re-anchored in place, as in climb batches 21 and 21b. The moves on `main`, each re-anchored by symbol where the gather wrote it:
- Rung E's api text is 6 lines shorter below `Library/FortressLibrary.fsi:1978` (+1 after `:125`, +1 after `:943`, -1 at `:1014`, +2 at `:1023`, -1 at `:1039`, -1 at each of the arrays' four `OpenRange` subscripts, -4 at the big operators' getters). So rung T's `String` lines are six lower: its trait `:2453-2528` is `:2447-2522`, its clause `:2454` is `:2448`, and its nine `abstract` lines `:2455`, `:2459-2461`, `:2465`, `:2482`, `:2486`, `:2502`, `:2512` are `:2449`, `:2453-2455`, `:2459`, `:2476`, `:2480`, `:2496`, `:2506`. Row 607's `Generator` comment, `:853-854` on rung T's tree, is `:854-855`.
- Rung E's component line `getter size(): ZZ32 = |self|` at `Library/FortressLibrary.fss:2101` moves every later line one down. So rung R's two `BIG MIN` sites `:4395`, `:4401` are `:4396`, `:4402`, and the `SUM` sites its record cites, `:2553`, `:2932`, `:2937`, `:4579`, `:4595` and `__builtinFactory1`'s arm `:2573`, are `:2554`, `:2933`, `:2938`, `:4580`, `:4596`, `:2574`; rung R's fused arm `:1476` stands. Rung T's `String` trait `:4335-4445` is `:4336-4446`, and its clause `:4336` is `:4337`.
- Rung E's own lines moved FACTS citations that no report listed, re-anchored in `8dd64e8fc`: F-35's `:1243` is `:1245`; F-44's `:979` and `fss:4882-4888` are `:981` and `fss:4883-4889`; F-58's `:284` and `:366-367` are `:285` and `:367-368`; F-63's `:933` and `:399` are `:934` and `:400`; F-276's `:2530-2551` is `:2524-2545`; F-279's `fss:2741`, `:3122`, `:3143`, `:2467` and `:2825` are `:2742`, `:3123`, `:3144`, `:2468`, `:2826`.
- Rung T's `String.fss` and `FlatString.fss` lines move the rows its record lists: rewritten in `c8e013faf`, each with its claim unchanged (387, 674, 611, 316, 823, 138, 141; row 138's `fsi:1314-1316`, moved two down by rung E, re-anchored to `:1316-1318` in the same rewrite).
- Not re-anchored: open ledger rows that cite a line of `Library/FortressLibrary.fsi` or `.fss` below rung E's first moved line without the commit it was true at, the point of climb batch 21's review.1 (`PLAN.md:561`); row 141's `Library/FortressLibrary.fsi:2450-2461`, which at the base already pointed at `String`'s header and not at `split`; and `PLAN.md`'s citations, the coordinator's (`PLAN.md:71`'s `Library/FortressLibrary.fss:2825` is `:2826`).

## The tests on the merged tree

From `/home/user/fortress-gather22`, the three patches on `64386618b`, whose code and tests are `main`'s (above), each run under `nice -n 19`, one at a time:
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/gather/h1` on every walk test that the rungs add or change (`ExportAlignedMembersWalk`, `InferUnfixedFBoundedWalk`, `OpenParameterListComprehensionWalk`, `StringMembersPromisedWalk`, `WrittenReductionArgumentsWalk`, `XXXPureListStridedSubscriptWalk`) and three the records name beside them (`NestedReductionFusion` and `GeneratorDeclarations`, which run the fused arm; `StringPieces`, row 607's), 9 files in one JVM:
  `# harness-one 2026-10-24T03:32:08Z; tree 64386618b; nproc=4; load 0.12 0.29 0.83; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty`
  `. interpret tmp/gather/h1/tests/XXXPureListStridedSubscriptWalk` / ` OK Saw expected exception`; `. interpret tmp/gather/h1/tests/StringMembersPromisedWalk` / `PASS` / ` OK (time = 503ms)`; `. interpret tmp/gather/h1/tests/OpenParameterListComprehensionWalk` / `PASS` / ` OK (time = 491ms)`
  `OK (9 tests)`
- The distance stage, `explorations/coordinator/tools/distance/run.sh tmp/gather/distance.txt tmp/gather/dist`, from 03:32:56Z:
  `#total	0`, every `#kind` 0, `#crash	none`, `#seconds	204	FortressLibrary 150`, `#machine	nproc=4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 0.50 0.40 0.84; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=1`, `#shadow	every shadow edit matched the tracked sources`
  `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21b/gate/distance.txt tmp/gather/distance.txt`: `DISTANCE DOWN   5 -> 0 (-5)`, `kind typecheck                4 -> 0      (-4)`, `kind export                   1 -> 0      (-1)`
  `python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/gather/dist/errors.tsv`: `landed 5 now 0`, four GONE lines (the export error; the two `BIG MIN`, "x2"; `GONE	typecheck	FortressLibrary.fss:L	Function body has type OR(I0,O0), but declared return type is O0.`; `List.fss`'s), and `export 'are not matched by the declarations': landed 15 entries, now 0`, with all 15 `entry GONE`, `String`'s among them; nothing come.
- The count stage, `explorations/coordinator/tools/checker-count/run.sh tmp/gather/checker-count.txt tmp/gather/cc`, from 03:36:23Z to its table at 03:38:54Z: every api 0, `FortressLibrary	0`, `#total	0`, `#locations	0`, `#crash	none`; its run `### rc=0` with no error line, the clean check that the stage reads as 0 since `36ec68cab`. Against `explorations/compile-ladder/climb-batch-21b/gate/checker-count.txt`, only `#total` and `#locations` differ, 3 to 0.
- `bash tmp/gather/run-demos.sh tmp/gather/demos`, the demo driver as `compile-ladder/rung-team-demos/REPORT.md` section 13 gives it, from 03:38:54Z to 04:06:41Z, `FORTRESS_THREADS=1`, nproc 4:
  `demos: 52 run, 52 reached their end`
  Among them `BiCGSTAB` ('elapsed time 68840901007 ns ( 68.840901007 s)'), `npbft` ('  Checksum 1 : 570.4182371381474+385.43365014877793i'), `trips` ('{[trip 3 4 5],[trip 5 12 13],...'), `mg` and `wordcount`. So rung E's api and component lines, rung R's written arguments and cast, and rung T's `String` lines and bodies, which walk reads, move no demo (P-79; F-283).
- Each closing test passed there: row 632's, the distance stage's GONE line for the fused arm; row 826's, `StringMembersPromisedWalk`.

**The interaction check.** The rungs share two files, `Library/FortressLibrary.fsi` (E, T) and `Library/FortressLibrary.fss` (E, R, T), in different declarations; no hunk of one touches a line another rung's hunk touches, and the patches applied together with no conflict. On the merged tree the distance is 0 and the count 0, the planner's measurement of the three rungs' text together (the batch record's "The zero"), with nothing come and no crash. The merged tree runs every walk test the rungs add or change, and all 52 demos. No suite was run by the gather: the gate measures the merged tree. Its `ant testSystem` should count 683, the landed 678 (`explorations/compile-ladder/climb-batch-21b/gate/summary.txt`, the four shards 166, 170, 172 and 170) and the batch's five new walk test files (`ExportAlignedMembersWalk`, `WrittenReductionArgumentsWalk`, `XXXPureListStridedSubscriptWalk`, `OpenParameterListComprehensionWalk`, `StringMembersPromisedWalk`); each rung's own run counted 679, the landed 678 and one new file; and `ant testSpecData` 130.

## Rows opened

Numbered by `ledger.py add` in the order the rungs were applied, each rung's rows in the order of their placeholders, each in the section its record names, as its record wrote it (each passed the template as written). Each placeholder was replaced by its number in the rung's `REPORT.md` and `SKEPTIC.md` (as "row N"), in row 825's sibling list, and in the FACTS entries, PLAN entries, handover lines and revival changes below, before the rung's commit; no test and no specification text cited one.

| Row | Placeholder | Rung | Section | Status | Claim, in short |
|---|---|---|---|---|---|
| 824 | NEW-R-1 | R | 8 | open, `NEGATIVE-VERIFIED`, `XXXPureListStridedSubscriptWalk` | under walk a pure list's range subscript at a stride other than 1 answers a list of its elements' run-time class; `List`'s half fixed by rung R |
| 825 | NEW-R-2 | R (its skeptic) | 2 | open, `CONTESTED`, `OpenParameterListComprehensionWalk` | under walk a list comprehension written at a self-bounded type parameter that nothing fixed ends in `CastError` at its unwrap's cast (`Library/List.fss:179`), and since rung R so does `List`'s strided subscript on a list of that open element type |
| 826 | NEW-T-1 | T | 10 | closed in `30ead0f11` | under walk string objects lack members the api's `String` declares: `CatString`'s `rangeContains`, `FlatString`'s and `EmptyString`'s `balanced`, `EmptyString`'s `isBalanced`, and a substring's `rangeContains` and `IN` that reach a `CatString` |

Row 825 is in section 2, which its writer names, "beside row 663"; row 663 itself stands in section 8 (`explorations/fortress-gap-ledger.md:643` at the base), so the two are not neighbours. Row 824 is in section 8, its writer's first choice.

## Rows closed

Each by `ledger.py close N --commit <the rung's commit on main> --test <the test>`, after its test passed on the merged tree as the rung last ran it, in `30ead0f11`:
- Rung R, `bd00ad997`: 632, test `explorations/coordinator/tools/distance/run.sh`: its site, `FortressLibrary.fss:1466` at the base, GONE in `compare-sites.py` on the merged tree.
- Rung T, `c8e013faf`: 826 (NEW-T-1), test `ProjectFortress/tests/StringMembersPromisedWalk.fss`, 'OK' through `harness-one.sh` on the merged tree.

`python3 explorations/coordinator/tools/ledger.py landing-check 64386618b3717aebade3662cb09483043825e124` after the closes: "ledger.py landing-check: 64386618b..HEAD: no finding". `python3 explorations/coordinator/tools/record.py check --base 64386618b3717aebade3662cb09483043825e124`: "FACTS.md 219 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2".

## Each rung

### E (`rung-export-last`), landed first as `8dd64e8fc`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The worker's `REPORT.md` and `record.md` were written from the run's journal on the branch (`1623254e8`); no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes**, two corrections, none contested, no ruling:
- `8526d727d`: `ProjectFortress/tests/ExportAlignedMembersWalk.fss:39`, `:53`, `:60`, `:78`, `:92`, `:99`, `:110`, `:132` had eight section comments beside the header line, where a test carries one comment line; its message at `:16` cited `ranges.tex`, section "Ranges", for an implicit-range subscript being based at 0, which that section does not say (it says only that the implicit range stands for the axis's whole range).
- `2e83f38d1`: `REPORT.md:6-7` had two deviation lines where the provenance block is five lines; `REPORT.md:6` cited the `TrivialOpenRange` subscripts at `fss:2401` and `:2459` (`:2402` and `:2460` on the head); `REPORT.md:20` cited `Condition`'s trait at `fss:1518` (`:1519`); `REPORT.md:26` cited `DelegatedIndexed`'s api lines as `fsi:1393-1394` (`:1395-1396`); and row 533's claim, which the api no longer bears out, handed to the gather.

**Folded.** F-282 rewritten with the record's text ("... and the `FortressLibrary` export error names one trait, `String`."), rewritten again in `c8e013faf` for rung T. Row 330 rewritten with the record's line (1,048 characters; the worker's scratch check of an earlier draft had refused at 724 characters of notes, the record's line passes at 660). Notes on rows 188 and 283, as the record gives them (rows 869 and 828 characters). Row 816 unchanged (question 1 holds it). E.worker.1 with E.skeptic.1, and E.worker.2 with E.skeptic.2, in `PLAN.md`.

**Corrections.**
- The skeptic's first `leftForGather` item, row 533: rewritten, not closed. Its claim named `RR64`'s `opr ^(self, b:RR64)` and `MultiplicativeRing`'s `opr ^(self, other:ZZ64)`; the api now declares `opr ^(self, b:Number)` (`Library/FortressLibrary.fsi:367`) and `MultiplicativeRing`'s takes `AnyIntegral` (`:285`). Its new line keeps the claim as measured ("tied ... when measured"), with notes that open "Not reproduced at 64386618b" and give the skeptic's measurement, cut to fit (1,173 characters). Whether to close it, against which commit, or retire it is the question rows 188 and 283 put to the curator, so the gather joined it to that entry as gather.1.
- The skeptic's second item, row 735, "for the record only": `object Both extends { DelegatedIndexed[\ZZ32,ZZ32\], Sized }`, with `Sized`'s `getter size(): ZZ32 = 77`, answers `size` 77 at `64386618b` and 3 after, since `DelegatedIndexed` now declares its own `size` (`Library/FortressLibrary.fss:2101`) and walk keeps the first trait's (row 735's departure; the checker refuses the object). The row's notes are full (a note would make them 906 characters), so the instance is here and in `compile-ladder/rung-export-last/SKEPTIC.md` section 3, not in the ledger.
- `REPORT.md` section 7 lists no sentence of the specification made false, and the gather's reading agrees: `Specification/basic/expressions/if.tex:53` and `while.tex:29` say only that a `Condition` generates 0 or 1 element; Part IV renders the api (`Specification/library/default-libraries.tex:25-27`). Its record sentences: F-282 (rewritten); P-68's "and `round` and `truncate` are `ZZ64`, `ZZ` or `RR64` by declaration" (`explorations/coordinator/POSITIONS.md:74`), the curator's text, left as it stands (E.worker.1); row 330's notes (rewritten); F-63's `:933` (re-anchored); row 533's claim (rewritten). Beyond its list, the gather's grep found F-58's "`RR64` declares `^(self, b:AnyIntegral)` beside its `^(self, b:RR64)` ... Whether the powers still tie, and between which two declarations, is not measured", now `^(self, b:Number)`, with the skeptic's measurement of `10.0^(-5)` and `10.0^(-8)`, rewritten in `8dd64e8fc`; and the line moves above.

### R (`rung-body-arguments`), landed second as `bd00ad997`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The worker's `REPORT.md` and `record.md` were written from the run's journal on the branch (`68b527766`); no repair round, and the gather wrote no file from the journal.

**Skeptic's fix**, one correction, none contested, no ruling:
- `aafa12827`: a second walk value moves, which the report did not hold. Under walk, `List`'s range subscript at a stride other than 1, on a list whose element type walk left open (F-143), now ends in `CastError` at `Library/List.fss:179` (reached from `:151`), where the base answered its elements: the written `<|[\E\] ... |>` reaches the `CastError` that a list comprehension written at an open type parameter already met on the base. Recorded with `ProjectFortress/tests/OpenParameterListComprehensionWalk.fss` and row 825 (NEW-R-2); `REPORT.md` sections 5, 12, 13 and 15 and row 824's stated length (1,080 to 1,086 characters) corrected.

**Folded.** F-285 ("The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, ...") at the end of "The checker and the one library", the record's text with its lines re-anchored and row 824 named. Of its "Entries the gather changes": F-85 (the fused branch's site becomes the cast at `:1476`) and F-59 (the library writes the argument at its own sites, F-285) rewritten in `bd00ad997`; F-53 rewritten in `c8e013faf`, once the merged tree was whole. Row 731 rewritten with the record's line, its two sites re-anchored to `:4396`, `:4402` (1,145 characters). Rows 824 and 825 added. Row 632 closed in `30ead0f11`. R.worker.1 with R.skeptic.3, R.skeptic.1, R.skeptic.2, and R.worker.2 with R.skeptic.4, in `PLAN.md`.

**Corrections.**
- The skeptic's two `leftForGather` items: row 825 added with `ledger.py add` in section 2, its sibling NEW-R-1 numbered 824; F-143 gains that a list comprehension written at the open parameter ends in `CastError` at its unwrap's cast, and so does `List`'s strided subscript on a list of that open type (row 825), with `OpenParameterListComprehensionWalk.fss` among its tests, rewritten in `bd00ad997`.
- `REPORT.md` section 12's sentence of the specification, `Specification/appendices/changes.tex:2470-2473`, is in the rationale of an Appendix I entry, not in an Effect and not in a note on walk or the compiled path: it gives a decision's reason, "the revival decided that the library's own practice is the standard, and the library does not route round a gap of the type checker", which the code does not state. So it is the skeptic's decision not taken (R.skeptic.1), and the gather left the text as it stands.
- Its record sentences: F-53, F-85 and row 731's notes (rewritten); row 632's claim (closed); `PLAN.md:62`, "row 731's three sites ...: a checker project before the switch-over", corrected in `bd00ad997` to what landed, the sites by the written argument with row 731's checker gap open (R.worker.1's entry names it); `PLAN.md:63`, item 46 by the call, which stays true as a description of the way taken, left for the coordinator's routing; `ProjectFortress/tests/InferUnfixedFBoundedWalk.fss:29`'s message, respelled by the rung. Beyond its list, the gather's grep found F-81's "Elsewhere in the library some still differ, such as `__bigOperator2`'s fused branch (F-85)", rewritten in `bd00ad997`.

### T (`rung-string-members`), landed third as `c8e013faf`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The worker's `REPORT.md` and `record.md` were written from the run's journal on the branch (`7263f23ea`), the harness having refused the worker's write; no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes**, two corrections, none contested, no ruling:
- `4680740cb`: a fifth route of row 826 had no assertion: `SubString`'s `rangeContains` (`Library/String.fss:438-439`) stopped on the base for a substring of any `CatString` ('Library/String.fss:430:9-64: Cannot find definition for method rangeContains given receiver CatString'); the change repairs it, but the test asserted none of its values, and neither the report's defect table nor the row named it. Now `ProjectFortress/tests/StringMembersPromisedWalk.fss:34-36` asserts it, and the row names it.
- `8d10d0cae`: `REPORT.md:3`, `:24`, `:61`, `:79`, `:127` and `:181` cited `explorations/coordinator/CLIMB-BATCH-22.md` at lines inside the rung briefings (`:203`, `:222-226`, `:209`, `:189-203`, `:208`, `:210-211`), which do not hold what the sentences say.

**Folded.** F-286 ("The api's `String` writes `abstract` on every member that its component's trait leaves without a body or does not declare, and every string object defines them.") at the end of "The checker and the one library", the record's text with its lines re-anchored and row 607's route added. F-83 rewritten with the record's proposed sentence (`String` has no export entry), its row-607 sentence given `CatString`'s route; F-282 rewritten for the export error with no entry, `String`'s nine members counted with the 57 (66); F-53 rewritten (rung R's item, above). Row 826 added and closed. Row 607 rewritten with the record's line, its `Generator` comment re-anchored to `:854-855` (1,093 characters). Rows 387, 674, 611, 316, 823, 138 and 141 rewritten with the lines the edit moves, claims unchanged. T.worker.1, T.skeptic.1 and T.worker.2 held by PLAN's existing entries (below).

**Corrections.** No `leftForGather` item. `REPORT.md` section 8 lists no sentence of the specification made false, and the gather's reading agrees: Appendix I has no entry on `String`'s members, and Part IV renders the api (`Specification/library/default-libraries.tex:25-27`). Its record sentences: F-83 and F-282 (rewritten). Its skill sentence, `.claude/skills/fortress-repo/SKILL.md:100`'s example span 'FlatString.fss":12:1~156:2', now `12:1~158:2`, is the skill writer's (below, "Left for the coordinator and the skill writer").

### Text mismatches

None. No rung edits `Specification/`, so no rung's specification text meets another rung's code. No record entry of one rung is made false by another's code beyond the line moves above and the export error's count, which rung E's record left to rung T's (F-282's two rewrites).

## Files written from the journal

None by the gather: every branch carried its `REPORT.md`, `record.md` and `SKEPTIC.md`, no `SKEPTIC.md` was only the word "committed", and no rung had a repair round. On the branches the worker's `REPORT.md` and `record.md` came from the run's journal: E `1623254e8`, R `68b527766`, T `7263f23ea`.

## The rungs that did not land

None: every rung of the batch was approved.

## Ledger notes

Every note a record asked for is written: rows 188 and 283 (E) by `ledger.py note`. Row 533's change, which the skeptic found no room for as a note (1,508 characters with it), went in by a rewrite whose notes state the row as it stands now. Row 735's instance (E's skeptic, "for the record only") is in the corrections above, not in the ledger. No note was refused and left out.

## Handover lines

Each rung's handover line, as its record gives it, with the rows' numbers put in. The hashes in them are the branches'; each rung's commit on `main` is in the table above.

**E.**

Climb batch 22, rung E (the api's last export entries) is on `wip/rung-export-last` at `94179a74a`.
- What it did: rung-E.patch as it stands; the export error goes from 15 entries to 1 (`String`'s, rung T's).
- The stages: the distance 5 and the count 3, as landed, with no site come.
- Walk: 679 interpreter tests and the specification's 130 examples green; the guard `ExportAlignedMembersWalk` passes on the base and after.
- The specification: no sentence made false. Part IV loses six subscripts, four getters and three other lines, gains seven, and renames four parameters.
- The ledger: row 330 rewritten; notes on rows 188 and 283.

**R.**

Rung R (`rung-body-arguments`, `wip/rung-body-arguments`, `55a87a61c` and `3f3bff4ab`):
- What it did: row 731's three library sites now write their static argument (`BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond`, `<|[\E\] ... |>` in `List`'s range subscript), and `__bigOperator2`'s fused arm casts its result to `O0`.
- Its stages on its own tree: the distance 5 to 1 and the count 3 to 1, the export error left in each.
- Under walk, `List`'s strided subscript now answers a `List[\E\]`. `PureList`'s does not yet (row 824, `XXXPureListStridedSubscriptWalk`). On a list whose element type walk left open, a program the checker refuses, it now ends in `CastError`, as a comprehension written at that open type already did (row 825, `OpenParameterListComprehensionWalk`, the skeptic's).
- Rows: row 731 rewritten, row 632 to close, rows 824 and 825 new.

**T.**

Climb batch 22 rung T (rung-string-members), branch `wip/rung-string-members` at `650263804`:
- String's api writes `abstract` on its nine bodyless or undeclared members, and its `excludes` clause is one text, `{ Number, Char, AnyMultiplicativeRing }`;
- CatString's `rangeContains`, FlatString's and EmptyString's `balanced` and EmptyString's `isBalanced` are written;
- row 826 is opened and closed by `StringMembersPromisedWalk`;
- distance 5, the export error 15 to 14 entries (String's gone), count 3, '#crash none'; the count stage about 91 s;
- testSystem 679 and testSpecData 130, no failure;
- row 607's reach through CatString recorded in its rewrite.

## Points to report

None holds the push: every point below is reversible, and the gather took no step that cannot be undone or that acts against a decision on record. Where the worker and the skeptic listed one point twice, it is listed once, with both measurements where they differ. Lines are on the rung's tree, as its files give them; their lines on `main` are under "Lines moved".

Rung E:
- `rung-E.patch`, taken as it is: the tree's diff, its `index` lines left out, equals the patch (`diff <(git diff 64386618b 94179a74a -- Library | grep -v '^index ') <(grep -v '^index ' explorations/compile-ladder/plan-22/probes/rung-E.patch)` printed nothing); the stage cleared its 14 entries with nothing come.
- The distance and the export error's entries: distance 5 and 5 ('DISTANCE SAME   5'); the export error 15 entries to 1, 14 GONE (`BigReduction`, `Comprehension`, `Just`, `Nothing`, `ActualReduction`, `Array1`, `Array2`, `Array3`, `Condition`, `DelegatedIndexed`, `ImmutableArray1`, `Maybe`, `RR64`, `TotalComparison`), `String`'s staying ('landed 5 now 5', 'landed 15 entries, now 1'); no site came in any component; the count 3, its table equal to the landed one (`diff explorations/compile-ladder/climb-batch-21b/gate/checker-count.txt <table>` printed nothing).
- The count stage's seconds: about 99 (02:10:33Z to the log's last write at 02:12:12Z; load 1.76 at start); the distance stage's '#seconds 226 FortressLibrary 169'.
- The api's declarations that join, leave or change, and so Part IV: join 7 lines (`TotalComparison`'s two `=`, `Condition`'s range subscript, `Just`'s four `SQCAP` and `SQCUP`); leave 13 (`TotalComparison`'s `=(Comparison)`, `Just`'s two over `UniqueItem`, the six subscripts, which are `Just`'s and `Nothing`'s `Range` subscripts and the four arrays' `OpenRange` subscripts, and `BigReduction`'s and `Comprehension`'s four getters); change 11 (`RR64`'s `^`, `Condition`'s `extends`, `indices`, `indexValuePairs`, `ivmap`, `Maybe`'s `extends`, the three distributes, `BigReduction`'s `r` renamed `reduction`, `Comprehension`'s `u`, `r`, `singleton` renamed `unwrap`, `reduction`, `body`) (`Library/FortressLibrary.fsi:125-126`, `:367`, `:934`, `:941-942`, `:945`, `:955`, `:998`, `:1024-1027`, `:1903`, `:1906`, `:1909`, `:1968`, `:1973`). What clients see, by the skeptic's checker runs: `j[r]` on a `Just` is a `Condition`, a `Condition`'s `indices` a `Generator`, `j SQCAP u` with `u: UniqueItem` a `UniqueItem`, and `x^q` with `q: QQ` now checks ('SkClient' base 'errors=15', head 'errors=6').
- Walk values that move and verdicts that change: no verdict changes (`ant testSystem` on `94179a74a`: 'Tests run: 168', '174', '171', '166, Failures: 0, Errors: 0', 679 with the guard; `ant testSpecData`: 'Tests run: 130, Failures: 0, Errors: 0'); the guard's 77 assertions hold on the base and after. One value moves, in a program the checker refuses: an object extending `{ DelegatedIndexed, Sized }` answers `size` 3 where it answered 77 (row 735; `Library/FortressLibrary.fss:2101`; 'diff SkMix2-old.txt SkMix2-new.txt': '< both size 77 |bo| 3' / '> both size 3 |bo| 3').
- Every sentence made false: none in `Specification/` (`Specification/basic/expressions/if.tex:53`, `while.tex:29` stay true); in the record F-282's 15 entries, P-68's 'round and truncate are ZZ64, ZZ or RR64 by declaration' (`explorations/coordinator/POSITIONS.md:74`; `Library/FortressLibrary.fss:501`), row 330's notes on `truncate`, F-63's `fsi:933`, and row 533's claim (`Library/FortressLibrary.fsi:367`); and F-58, found by the gather.
- A file edited beyond those named, or any edit of `String`, the checker or walk's Java: none (`git diff --name-only 64386618b 4236e2f7a`: the two library files, `ProjectFortress/tests/ExportAlignedMembersWalk.fss`, and the rung's `REPORT.md`, `record.md`, `SKEPTIC.md`).
- Team lines changed: 24 api lines out or rewritten and 18 written, 8 component lines rewritten and 1 added, of the team's 2012 `Library/FortressLibrary.fsi` and `.fss` (`git diff --numstat 64386618b 94179a74a -- Library`: '18 24 Library/FortressLibrary.fsi', '9 8 Library/FortressLibrary.fss'); Part IV loses six subscripts and four getters.
- One run of `ledger.py rewrite 330` with `--ledger` and `--history` on scratch copies under the worker's `tmp/`, to check row 330's draft line against the template; it refused for length ('notes-length: 724 characters; at most 700') and wrote nothing tracked. The line the record gives, and the gather wrote, passes at 660 characters of notes.

Rung R:
- `rung-R.patch`, taken as it is: `python3 -I explorations/compile-ladder/plan-22/probes/last5-edits.py /home/user/fortress-bodyargs min731 list731 cast46` printed 'applied min731 list731 cast46', and the diff's index line `d5abf7e6a..1997672c7` is the patch's (`explorations/compile-ladder/plan-22/probes/rung-R.patch:2`).
- The distance site by site: 5 to 1, the two `BIG MIN` (`fss:4395`, `:4401`), the fused arm (`fss:1466`) and `List.fss:146` gone, the export error left with its 15 entries, nothing come (`explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21b/gate/distance.txt tmp/rung-body-arguments/distance-postedit.txt`: 'DISTANCE DOWN   5 -> 1 (-4)', 'kind typecheck 4 -> 0 (-4)'; `compare-sites.py`: 'landed 5 now 1', three GONE lines, 'landed 15 entries, now 15').
- The count stage's table: 3 to 1. The clean-check reading (`36ec68cab`) is on the tree; the 1 is the export error, which the component's unit now reaches ('#total 1', '#locations 1', '#crash none'; 'Library/FortressLibrary.fss:12:11-25: The following declarations in API FortressLibrary are not matched by the declarations in component FortressLibrary.').
- The count stage's seconds: 149 (started 2026-10-24T02:38:25Z, table written 02:40:53.9Z; nproc 4, Intel Xeon @ 2.10GHz, load 0.45 0.70 2.21, openjdk 25.0.4.1, `FORTRESS_THREADS=1`).
- Walk values that move and verdicts that change: `List`'s strided range subscript now answers a `List[\E\]` where it answered a list of its elements' run-time class (`ArrayList[\Int\]`, `ArrayList[\FlatString\]`); on a list whose element type walk left open it now ends in `CastError` where it answered its elements (the skeptic's finding, row 825). `WrittenReductionArgumentsWalk` is red on the base and green after ('FAIL: a ArrayList[\Int\]: <|10, 12, 14|> =/= a ArrayList[\ZZ32\]: <|10, 12, 14|>' on the base's code); `OpenParameterListComprehensionWalk` red on the base and green on the head; `XXXPureListStridedSubscriptWalk` new and green; no other verdict changes (`ant testSystem`: 'Tests run: 169', '168', '168', '174', 'Failures: 0, Errors: 0'; `ant testSpecData` 130, no failure) (`Library/List.fss:151`).
- Row 731's rewritten line (1,145 characters, its claim unchanged) and row 632's close by `ledger.py close` with the distance stage as its test.
- Every sentence made false: none in the specification by the worker's grep; `Specification/appendices/changes.tex:2470-2473` at its general reading, the skeptic's (R.skeptic.1); in the record F-53, F-85, row 632's claim, row 731's notes, `explorations/coordinator/PLAN.md:62-63`, and a test message respelled (`explorations/coordinator/FACTS.md:47`, `:79`; `ProjectFortress/tests/InferUnfixedFBoundedWalk.fss:29`); and F-81, found by the gather.
- A file edited beyond those named: one message of `ProjectFortress/tests/InferUnfixedFBoundedWalk.fss:29`, its value kept; the new `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss`; the skeptic's new `ProjectFortress/tests/OpenParameterListComprehensionWalk.fss`; no edit of the checker or the desugarer (`git diff --stat 64386618b HEAD` lists nothing under `ProjectFortress/src`).

Rung T:
- `rung-T.patch`, taken as it is (`git diff 64386618b...650263804 -- Library/` equals `explorations/compile-ladder/plan-22/probes/rung-T.patch`, index lines aside); the bodies written are `Library/String.fss:128-133` (`CatString`'s `rangeContains`), `Library/FlatString.fss:52` (`FlatString`'s `balanced`), `Library/String.fss:286` (`EmptyString`'s `isBalanced`) and `:333` (`EmptyString`'s `balanced`).
- The four defects before and after: before, through `harness-one.sh` on `64386618b` (02:04:39Z), 'Cannot find definition for method rangeContains given receiver CatString', '... balanced given receiver "abc"', '... isBalanced given receiver EmptyString', '... balanced given receiver EmptyString', and for `IN` the first, at 'Library/String.fss:422:51-91'; after, `ProjectFortress/tests/StringMembersPromisedWalk.fss` green (' interpret .../StringMembersPromisedWalk  OK (time = 669ms)' in `ant testSystem`), the skeptic's fifth route at `ProjectFortress/tests/StringMembersPromisedWalk.fss:34-36`.
- The distance and the export error's entries, and the count stage's table: 'DISTANCE SAME   5'; 'export ... landed 15 entries, now 14', `String`'s entry GONE, no site come, the same five sites at the same locations; the count '#total 3', '#locations 3', '#crash none', its table equal to `climb-batch-21b/gate/checker-count.txt`.
- The count stage's seconds: about 91 (started 02:08:53, table written 02:10:24.35; under `nice -n 19` on nproc 4, Xeon @ 2.10GHz, load at start 1.16 0.52 0.50, openjdk 25.0.4.1, `FORTRESS_THREADS=1`); the distance stage '#seconds 222 FortressLibrary 167' at load 11.17.
- The api's declarations that change, and so Part IV: `Library/FortressLibrary.fsi:2455`, `:2459`, `:2460`, `:2461`, `:2465`, `:2482`, `:2486`, `:2502` and `:2512` now `abstract` (getters `size`, `depth`, `asFlatString`, `isBalanced`; `verify`, `uncheckedSubstring`, `rangeContains`, `balanced`; `opr ||(self, c:Char)`), and `:2454`'s `excludes { AnyMultiplicativeRing }` now `excludes { Number, Char, AnyMultiplicativeRing }`; Part IV is generated from the api (`Specification/library/default-libraries.tex:25-27`) and needs no edit.
- Walk values that move beyond the four, and verdicts that change: none; `ant testSystem` 174+164+171+170 = 679 (the landed 678 and the new test), 'Failures: 0, Errors: 0'; `ant testSpecData` 'Tests run: 130, Failures: 0, Errors: 0'; `SkExcl` and `SkUserString` print the same on the old and new code; each new body is reached only by calls that stopped before (`Library/String.fss:373-376`, `:426-439`), and those values agree with the reference in 2,410 + 243 calls.
- The new row and its test: row 826 (NEW-T-1), 'ledger.py check --rows: 1 rows, 0 fail the template', its test `ProjectFortress/tests/StringMembersPromisedWalk.fss`; opened and closed by the gather.
- Every sentence made false: in the specification none (`grep -rn -E 'rangeContains|isBalanced|balanced\(|CatString|FlatString|EmptyString' Specification/ --include=*.tex` prints nothing); in the record F-83's `String`-entry sentence (`explorations/coordinator/FACTS.md:77`) and F-282's 'names 15' and '(57 written abstract ...)' (`explorations/coordinator/FACTS.md:118`); in the skill, `.claude/skills/fortress-repo/SKILL.md:100`'s span `FlatString.fss 12:1~156:2`, now `~158:2`.
- A file edited beyond those named: none (`git diff --name-only 64386618b...aef18c9ff`: the four library files, `ProjectFortress/tests/StringMembersPromisedWalk.fss`, and the rung's folder).
- Team lines changed: the team's api lines for nine of `String`'s members are now `abstract` (`Library/FortressLibrary.fsi:2455-2512`, the team's at `a874948ac` `Library/FortressLibrary.fsi:2281-2339`); the team's component `excludes` clause loses `AnyList` (`Library/FortressLibrary.fss:4336`, from `:3956` at `a874948ac`); the api's clause line is the revival's (`070ef39e5`).

The gather's own: the merged tree's tests (above); row 533 rewritten, not closed, and put to the curator with rows 188 and 283 (gather.1); and `PLAN.md:62` corrected (R.worker.1). No other.

## Items for the curator, and where each is in `PLAN.md`

None asks for an answer before work on the path can go on: each has a default acted on or none needed, and each is reversible. So every entry is under "Off the path, parked": six new entries in the new subsection "Climb batch 22, listed for his review" (`explorations/coordinator/PLAN.md:585`), each opening with the ids it holds, and three items held by entries already there.
- E.worker.1 and E.skeptic.1, one point: "E.worker.1 and E.skeptic.1 of climb batch 22's rung E, one point: P-68's account of today, ..." (`PLAN.md:589`): should P-68's "`ZZ64`, `ZZ` or `RR64` by declaration" read "`ZZ64` or `ZZ` by declaration"? Both recommend it; no default on record, and the gather left his text.
- E.worker.2, E.skeptic.2 and gather.1, one point: "E.worker.2, E.skeptic.2 and gather.1 of climb batch 22, one point: rows 188 and 283 do not reproduce at the base ..." (`PLAN.md:590`): close rows 188, 283 and 533, against which commit, or retire them? Default: none; each stays open with its "Not reproduced at 64386618b" note or line.
- R.worker.1 and R.skeptic.3, one point: "R.worker.1 and R.skeptic.3 of climb batch 22's rung R, one point: fork 17 clears row 731's three library sites ..." (`PLAN.md:591`): for his sight, the distance's zero with row 731's checker gap open, and phase 3's line corrected (`PLAN.md:62`). Default: as landed.
- R.skeptic.1: "R.skeptic.1 of climb batch 22's rung R: Appendix I's rationale in \"The contexts that give a call an expected type\" ..." (`PLAN.md:592`): keep `changes.tex:2470-2473` for both readings, or reword it to its narrow one? No default on record; the text stands.
- R.skeptic.2: "R.skeptic.2 of climb batch 22's rung R: row 825 (`CONTESTED`) needs a ruling. ..." (`PLAN.md:593`). Default: today's behaviour, asserted by `OpenParameterListComprehensionWalk.fss`.
- R.worker.2 and R.skeptic.4, one point: "R.worker.2 and R.skeptic.4 of climb batch 22's rung R, one point: `Library/PureList.fss:73` holds the same unwritten comprehension ..." (`PLAN.md:594`). Default: it waits for a rung that names `PureList` (row 824).
- T.worker.1 and T.skeptic.1, question 1 (row 816), already on record: held by "E.skeptic.1 of climb batch 21b's rung E: 4i and the run-time call (row 816, `CONTESTED`). ..." (`PLAN.md:575`), at its default, fork 20's reading. Not written again. The evidence rung T adds, for his reading with this batch's record: the api lines added for `depth`, `isBalanced`, `verify`, `rangeContains` and `balanced` rest on that reading, as `splitWithOffsets` and `split` already did (`Library/FortressLibrary.fsi:2453-2496` on `main`; `Library/FortressLibrary.fss:4336-4446`); under the other reading the component's `String` must declare seven bodyless members, and until then a compiled client's call of one stays row 816's `NoSuchMethodError` (`compile-ladder/rung-string-members/REPORT.md:183-184`, section 9; `explorations/coordinator/CLIMB-BATCH-22.md:61-81`). The skill's rule, "So declare each such member in the component too, at the api's header: a call of a missing one dies with NoSuchMethodError" (`.claude/skills/fortress-repo/references/library.md:39`), and its precedent, rung S, which declared its two new `String` members in both (`explorations/compile-ladder/rung-string-slips/REPORT.md:41`), go the other way; the batch record put the component's declarations out of rung T's reach (`explorations/coordinator/CLIMB-BATCH-22.md:220`).
- T.worker.2, row 607's repair: held by "Row 607: `FlatString.rangeContains` finds only the first occurrence of a character; default pinned. Review-queue item 118." (`PLAN.md:333`), the repair the curator's (`compile-ladder/rung-string-slips/JUDGE.md` section 2). Not written again. The route rung T adds, `CatString`'s new `rangeContains` through its flat halves ('cat.rangeContains(10#10, 'a') = false' for `"abcdefghijklmnopqrsa" || "ABCDEFGHIJKLMNOPQRST"`, `Library/String.fss:128-133`, `Library/FlatString.fss:117`), is in row 607's rewritten line and F-83.

No item went unrouted. The gather adds one of its own, gather.1, in the second entry above: row 533's tie does not reproduce either (`explorations/fortress-gap-ledger.md:169`; `compile-ladder/rung-export-last/SKEPTIC.md:124`).

## Left for the coordinator and the skill writer

- P-68's sentence (`explorations/coordinator/POSITIONS.md:74`), the curator's text (E.worker.1's entry); left as it stands.
- F-53's numbers, "the distance to the switch-over is 5 errors and the checker count is 3", are the last landed gate's until this batch's gate lands; the gather rewrote its account of the five sites to say that the batch's rungs clear them, measured 0 and 0 on the merged tree, and left the numbers to the commit stage, which also drops the list of the five once the numbers are 0.
- PLAN's phase 3, item 19 (`PLAN.md:59`, "Next, climb batch 22, ...") and its "The last-5 batch" lines (`PLAN.md:60-66`, the gather having corrected `:62`), and item 46 under "Pavol's answers, in the order they are needed" (`PLAN.md:165`), which rung R's cast settles: the coordinator's routing. `PLAN.md:71`'s `Library/FortressLibrary.fss:2825` is `:2826`.
- F-282, F-285 and F-286 are past the record's 600 characters (`record.py check` reports the sizes), as the records wrote them.
- The skill's sentences made false, which the batch does not write: `.claude/skills/fortress-repo/SKILL.md:100`'s example cache entry, '`(Component @"/home/user/fortress/Library/FlatString.fss":12:1~156:2 ...`', now `12:1~158:2` (rung T's report); and `.claude/skills/fortress-repo/references/library.md:39`'s rule that a member the api writes `abstract` is declared in the component too, which `String`'s seven members do not follow under question 1's default (T.skeptic.1). By the gather's reading, `.claude/skills/fortress-repo/references/revival-changes.md`'s "A reduction's static argument depends on the path. The checker does not infer it for `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, whose bound names the parameter (row 731). Write it in every clause form" stays true, and the library now follows it (F-285).

## Revival changes, for the skill writer

Each landed rung's "Revival change" section, both its parts word for word, in the order the rungs landed, with the rows' numbers in place of the placeholders and the lines it cites that an earlier rung's hunk moved re-anchored by symbol to `main`'s ("Lines moved", above): in R's, `BIG MIN`'s `Library/FortressLibrary.fss:4395`, `:4401` are `:4396`, `:4402`, and NEW-R-2 is row 825; in T's, the api's nine `abstract` lines `:2455`, `:2459-2461`, `:2465`, `:2482`, `:2486`, `:2502`, `:2512` are `:2449`, `:2453-2455`, `:2459`, `:2476`, `:2480`, `:2496`, `:2506`, and the clause's `fsi:2454` and `fss:4336` are `:2448` and `:4337`. Quoted checker messages keep the lines they printed. E's lines are `main`'s as written. The skill's sentences made false are under "Left for the coordinator and the skill writer", above.

### E (`rung-export-last`, `8dd64e8fc`)

**The change.**
- **The team's api** (`Library/FortressLibrary.fsi` at `a874948ac`) declared members that its component defines at other headers, or never defines:
  - `TotalComparison`'s `opr =(self, other:Comparison)` (:123). The component has `=` at `TotalComparison` and at `Unordered` (`Library/FortressLibrary.fss:164-165` at `a874948ac`).
  - `RR64`'s `opr ^(self, b:RR64)` (:318). The component's takes `b:Number` (fss:402).
  - `Condition` extending `SequentialGenerator` alone, with `indices` a `CompactFullRange[\ZZ32\]`, and `indexValuePairs` and `ivmap` answering `Generator` (:767, :774-775, :787). The component's `Condition` extends `ZeroIndexed` too (fss:1200). The api's `Maybe` extended `ZeroIndexed[\T\]` (:830).
  - `Just`'s and `Nothing`'s `opr[r:Range[\ZZ32\]]` (:844, :868). The component moved them to `Condition` in 2008 (`28ecf5f0d`).
  - `Just`'s `SQCAP` and `SQCUP` over `UniqueItem` (:852-853). The component's are over `NotUnique`, `Just` and `Nothing` (fss:1333, :1335).
  - The four arrays' `opr[_:OpenRange[\ZZ32\]]` (:1414, :1445, :1550, :1675), which no component defines.
  - `ActualReduction`'s distributes over a `Reduction[\R\]` answering a `Maybe` of a pair (:1724 on).
  - `BigReduction(r)` and `Comprehension(u, r, singleton)`, with getters `reduction`, `body` and `unwrap` (:1789-1799). The component names the parameters `reduction`, and `unwrap`, `reduction`, `body` (fss:2973, :2978).
- **The team's component** answered at other types than its api:
  - `RR64`'s brackets answered `ZZ` and its `truncate` `RR64` (fss:415, :418), where the api and `Float` answer `ZZ64`;
  - `DelegatedIndexed`'s `generator` answered `Indexed[\E,I\]` (fss:1767), where the api has `Generator[\E\]` (fsi:1215);
  - the arrays' `bounds` and `zeroIndices` answered `CompactFullRange2D` and `CompactFullRange3D` (fss:2295, :2387, :2670, :2752), where the api has the `CompactFullRange` types.
- **What the tree now does.**
  - The api states the component's headers for the first group, and leaves out the subscripts that no component defines (`Library/FortressLibrary.fsi:125-126`, `:367`, `:934-955`, `:998`, `:1015-1027`, `:1903-1909`, `:1962-1975`).
  - The component states the api's types for the second group (`Library/FortressLibrary.fss:498-501`, `:2102`, `:2657`, `:2745`, `:3065`, `:3147`), and `DelegatedIndexed` states the `size` it inherits from `Indexed` (`:2101`).
  - Part IV, the api rendered, changes with it: six subscripts and four getters leave, and four parameters are renamed.
  - The tests: the compiled checker's export check, run over the interpreter's library, no longer names the 14 traits and objects. Walk's values for these members are the same before and after (`ProjectFortress/tests/ExportAlignedMembersWalk.fss`).
- **The reason.**
  - `Specification/basic/components/apis.tex:252-256`: "The header and type of $d'$ must be the same as the header and type of $d$."
  - The export check refused each pair, e.g. '(TraitDecl TotalComparison at FortressLibrary.fsi:122.1, due to different method = @ FortressLibrary.fsi:125:5-42)' and '(TraitDecl RR64 at FortressLibrary.fsi:297.1, due to different method ^ @ FortressLibrary.fsi:366:5-28)'.
  - Where the component moved instead: `Float`'s natives answer `ZZ64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191`). The api at the component's `ZZ` and `RR64` is refused, as in 'For truncate, the return type of Float->ZZ64 @ FortressBuiltin.fss:190:5-191:81 should be a subtype of the return type of (RR64 & {Float, FloatLiteral})->RR64'. The api cannot name `RangeInternals`' types, which import it. `FlatString` overrides `generator` at `Generator[\Char\]` (`Library/FlatString.fss:45`). Without the api's `size` line, the checker reports four abstract-method errors in `RangeInternals`' 2D and 3D ranges.

**Provenance.**
- The items: F-282's export entries, all but `String`'s, in climb batch 22's rung E.
- The answers and defaults followed:
  - P-27, the library's own practice;
  - the coordinator's call of way A+ for `Condition` (the batch record's "Defaults already taken", 2);
  - fork 3 in place of the rounding call (default 3);
  - forks 4 to 12;
  - P-90's reading (the bare `Nothing` only);
  - P-68 for the float rounding's later `ZZ`.
- The record's sentences this makes false: F-282's 15 entries and its list; P-68's 'or `RR64` by declaration' for `truncate`; row 330's notes on `truncate`; F-63's line `fsi:933`.

### R (`rung-body-arguments`, `bd00ad997`)

**The change.**
- What the team's library does: at `a874948ac` it writes three clause forms without their static argument, `n = BIG MIN[i <- self.indices, self[i]=c] i` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4008`, `:4014`) and `<| self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:150`). Its `__bigOperator2` fused arm returns `(outer'.unwrap)(...)` uncast (`Library/FortressLibrary.fss:1158`).
- What the tree now does: it writes `BIG MIN[\ZZ32\][...]` (`Library/FortressLibrary.fss:4396`, `:4402`) and `<|[\E\] self[i] | i <- r |>` (`Library/List.fss:151`), and passes the arm's result through `cast[\O0\]` (`:1476`). Under walk, `List`'s range subscript at a stride other than 1 now answers a `List[\E\]`. Before, it answered a list of its elements' run-time class, as an `ArrayList[\Int\]` for a `List[\ZZ32\]`, which was unequal to a list of the same elements and refused by a binding or parameter of the list's type. The test that shows it is `ProjectFortress/tests/WrittenReductionArgumentsWalk.fss`. `PureList`'s range subscript keeps the team's text and its walk behaviour (`Library/PureList.fss:73`, `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss`). On a list whose element type walk left open (F-143), in a program the checker refuses, `List`'s strided subscript now ends in `CastError`, as a list comprehension written at that open type already did (`ProjectFortress/tests/OpenParameterListComprehensionWalk.fss`, row 825).
- The reason, as evidence:
  - The compiled checker refuses each of the four sites over the interpreter's library: 'Could not check call to operator BIG MIN - [\T extends StandardMin[\T\]\]()->BigReduction[\T,Maybe[\T\]\] is not applicable to an argument of type ().'; 'Function body has type OR(List.List[\Any\],List.List[\E\]), but declared return type is List.List[\E\].'; 'Function body has type OR(I0,O0), but declared return type is O0.' (`explorations/compile-ladder/gate/distance-sites.tsv:3-6`).
  - The specification's revision box asks a program that both implementations are to run to write such an argument (`Specification/basic/expressions/reductions.tex:51-55`).
  - Under walk, the unwritten comprehension gave 'RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]'.

**Provenance.** P-78's workaround for row 731 ("write it in every clause form"); the batch's forks 17 and 18; item 46, the coordinator's call by the record (`cast[\O0\]`, the team's pattern kept). Climb batch 22, rung R.

### T (`rung-string-members`, `c8e013faf`)

**The change.**
- **The team's text.**
  - The team's api for the interpreter's prelude declared these members of `String` without `abstract`: `size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `uncheckedSubstring`, `rangeContains`, `balanced` and `opr ||(self, c:Char)` (`Library/FortressLibrary.fsi`, its `trait String`, at `a874948ac`).
  - The team's component's `trait String` declared four of them without a body and never declared `depth`, `isBalanced`, `verify`, `rangeContains` or `balanced` (`Library/FortressLibrary.fss:3955` on, at `a874948ac`).
  - Its string objects lacked four of the members: `CatString` had no `rangeContains`, `FlatString` no `balanced`, and `EmptyString` neither `balanced` nor `isBalanced` (`Library/String.fss:75`, `:270` and `Library/FlatString.fss:34`, at `a874948ac`).
  - So, by reading, the team's walk stopped on `c.rangeContains(r, x)` for a concatenated `c`, on `"abc".balanced()`, and on the empty string's `isBalanced` and `balanced()`.
  - The team's component's `excludes` clause was `{Number, Char, AnyMultiplicativeRing, AnyList}` (`Library/FortressLibrary.fss:3956` at `a874948ac`); the team's api's `String` had none.
- **What the tree does now.**
  - The api writes the nine `abstract` (`Library/FortressLibrary.fsi:2449`, `:2453-2455`, `:2459`, `:2476`, `:2480`, `:2496`, `:2506`).
  - String's clause is `excludes { Number, Char, AnyMultiplicativeRing }` in the api and the component (`Library/FortressLibrary.fsi:2448`, `Library/FortressLibrary.fss:4337`).
  - The objects define the four: `CatString`'s `rangeContains` asks its halves over the parts of the range in each (`Library/String.fss:128-133`); `FlatString`'s and `EmptyString`'s `balanced()` answer `self` (`Library/FlatString.fss:52`, `Library/String.fss:333`); `EmptyString`'s `isBalanced` is `true` (`Library/String.fss:286`).
  - Test: `StringMembersPromisedWalk`. The distance stage's export error no longer names `String`.
- **Departures.**
  - The component's trait does not declare `depth`, `isBalanced`, `verify`, `rangeContains`, `balanced`, `splitWithOffsets` or `split`. After the switch-over, a compiled client's call of one of them on a String is row 816's case.
  - `CatString`'s `rangeContains` answers what its flat halves answer, so it misses a later occurrence of the character, as `FlatString`'s does (row 607).
- **The reason.**
  - The specification: "A matching definition of a declaration $d$ is a definition $d'$ with the same name as $d$ that includes definitions for all declarations other than the methods or fields declared abstract in $d$. The header and type of $d'$ must be the same as the header and type of $d$." (`Specification/basic/components/apis.tex:252-256`).
  - The compiled checker refused the api against its component: '(TraitDecl String at FortressLibrary.fsi:2453.1, due to different method size @ FortressLibrary.fsi:2455:5-24, ..., Asbtract method size @ FortressLibrary.fss:4337:5-24 is not declared in the API, different excludes clauses for traits)'.
  - Under walk the four calls stopped, through the harness on the earlier code: 'Cannot find definition for method rangeContains given receiver CatString', and the same for `balanced` on "abc" and on EmptyString, and for `isBalanced` on EmptyString.
  - Exclusion is symmetric (`Specification/basic/traits.tex:234-244`), and `AnyList` excludes `String` itself (`Library/List.fsi:55`).

**Provenance.**
- F-83 and F-282.
- P-27, and the library's rule for a member the component leaves without a body (the `fortress-repo` skill's `library.md`, "Designing a change").
- The batch record's forks at their defaults: 13 (`abstract` in the api), 14 (one `excludes` text), 15 (the four bodies) and 16 (one row opened and closed).
- Question 1 at its default, option 1: no component member for an api member written `abstract` (row 816).
- The planner's `rung-T.patch`, taken as written.
- Climb batch 22, rung T.
