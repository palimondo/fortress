# Climb batch 3.5: the gather's record

Written at the gather stage of climb batch 3.5 (2026-09-24), on `main` from the base `abdfbb2db` (run `wf_207012c9-0ef`). `main` was at `2e75daee4`, two coordinator commits above the base (`b49f6a4ef`, one line of `POSITIONS.md` at its end; `2e75daee4`, `INDEX.md` and a new review note), which touch neither rung's files. Both rungs were approved; each landed as one commit composed from its branch's net change, and neither branch is a parent of anything on `main`.

## The order the rungs were applied in

B, then I. The rule is ascending order of each rung's lowest edited line in the files two or more rungs share. No source or test file is shared (`git diff --name-only abdfbb2db...<branch>` for both branches, intersection empty): B's net change touches `nativeHelpers/simpleIntArith.java`, `simpleLongArith.java`, `LibraryBuiltin/CompilerBuiltin.fss`, `library_tests/IntConversionsRungW.fss` and `IntegralOpsRungN.fss`, and adds its own files; I's touches `interpreter/glue/prim/Int.java`, `Long.java`, `NN32.java`, `UnsignedLong.java`, `BigNum.java`, `compiler/WellKnownNames.java`, `Library/FortressLibrary.fss` and `.fsi`, `Library/RangeInternals.fss` and `.fsi`, `Library/List.fss` and `tests/RangePrototype.fss`, and adds its own files. The files the two folds share are the three record files and this one; there B's lowest edit is ledger row 333's note and I's is row 334's, so B goes first. Manifest order says the same, and it is the ledger-numbering order the batch record fixes (`explorations/coordinator/CLIMB-BATCH-3.5.md:73`). Both patches applied with `git apply --3way --index` and no conflict, and every applied file was compared byte for byte with its branch.

**Cross-citations re-anchored in I's commit.** No hunk of one rung shifts a line of the other's source, but each rung's records cite the other's files, which the batch record's overlap note (`BATCH_OVERLAPS` in `explorations/coordinator/climb-batch-workflow.js`) did not foresee. I's records cite `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` as it was at `abdfbb2db`, and B's four import lines (`:72-73`, `:198-199`) move every body below them down four; B's records cite `interpreter/glue/prim/Int.java` and `Long.java` for row 379's fix location, and I's edits move those classes. Both are re-anchored by symbol in I's commit (section "Rung I").

## Rung B (`rung-int-semantics-compiled`)

**Written at the gather.** The subagent harness refused the worker's and the skeptic's `.md` writes, and neither routed around it. `explorations/compile-ladder/rung-int-semantics-compiled/REPORT.md`, `record.md` and `SKEPTIC.md` are written from their structured results (run `wf_207012c9-0ef`, `rung:B` and `skeptic:B`), which is the skeptic's correction 1; `REPORT.md` section 0 says so, and its section 12 lists what the gather changed.

**Corrections, all seven closed.**
1. The three files are written; `REPORT.md` opens with the five-line provenance block, the deviation entries on one line separated by semicolons. The test's one comment line (`ProjectFortress/compiler_tests/IntSemanticsRungB.fss:8`) now leads somewhere.
2. The three `DOTCROSS` messages at `IntSemanticsRungB.fss:132-134` cite `row 348, Integer4.fss:124-126`: the skeptic's `:124-125` plus `:126`, the team's pin of saturation to the minimum, which is the quadrant `:132` asserts. No assertion changed. Re-run on `main` after `ant compileAll` and the library-order rebuild: `explorations/compile-ladder/rung-int-semantics-compiled/probes/gather/junit-after-correction2.txt`, `OK (2 tests)`, and `IntConversionsRungW`, `IntegralOpsRungN` and `Integer.test` `OK (31 tests)`.
3. The FACTS line says that every zero factor on `ZZ64` answers `0` and that `REM`, `MOD`, `GCD` and `LCM` no longer throw on a zero quotient, with `3 REM 5 = 3`, `12 GCD 18 = 6`, `12 LCM 18 = 36`.
4. Row 378 cites the skeptic's direct measurement of the unused saturating `Div` and `Abs`, `probes/skeptic/SkNatives-java.txt:2-4`, `:7-9` against `:27-29`, `:32-34`.
5. `REPORT.md` section 7 states the loud-to-quiet change of `narrow` and its cost: `NN64` is left with no checked narrowing to `NN32` on the compiled path. The skeptic's `CompilerBuiltin.fsi:333-389` is `:332-388` in the tree and is cited so.
6. Row 379's note says that `twoL` and `mOneL` hold `ZZ32` values under `walk` (row 146) and cites the skeptic's `SkMulGuards-walk.txt:23-24`, `:29-30`, where every `ZZ64` is built with `widen`.
7. `REPORT.md` section 8 records, as the worker's decision, that row 379's home 2 is owed and not added, on `CLIMB-BATCH-3.5.md:75`; the handover line says so.

**Rows.** B opens rows 378 and 379, the batch's first two numbers, so its provisional numbers are final.

**Recommended rows, each opened or refused:**
- The skeptic's amendment of row 379: opened as row 379 with the amended title (`+`, `-`, unary `-`, `|..|`, `DIV` and multiplication on both widths), the added evidence (`SkWrapAddSub-walk.txt:2-5` against `SkWrapAddSub-compiled.txt:3-6`; `SkMulGuards-walk.txt:13-14`, `:29` against `SkMulGuards-compiled.txt:14-15`, `:30`), the fix location `Int.java` and `Long.java` `Add`, `Sub`, `Negate`, `Mul`, `Div`, the worker's specification column with `opr-overview.tex:195-196` added for addition and subtraction, and the owed `XXX` home.

**Placeholders.** Every `<short hash>` that rung B's commit adds names B's commit: row 333's note, the first batch-3.5 notes of rows 335 and 346, row 378, B's FACTS line, B's handover line, and B's `record.md`.
