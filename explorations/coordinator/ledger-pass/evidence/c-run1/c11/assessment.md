# Assessment: chunk c11 (base c124c6b65)

Marks: scope / present meaning / evidence / comprehension / ownership / consistency.

## 69: rewrite
- scope pass; present meaning pass; evidence fail: "`typecheck-old` (`:465`)" is a blank line at the base, the command now at `Shell.java:467`, the typecheck block at `:455-457`; comprehension pass; ownership pass; consistency fail (minor): row 833 names 69 as sibling, 69 does not name 833.
- Change: pins re-pointed at c124c6b65; `siblings: 833` added. Read beyond evidence: `Shell.java:450-470`. Nothing dropped. Silent: `choice` (silent.txt).

## 71: keep
- All pass. The cited `CovariantCollection.fsi` and `List.fsi` lines hold their names at the base (`Library/List.fsi:69,70,116,119,126,137` read; `CovariantCollection.fsi` lines shown by the evidence); the script's "moved" marks come from matching every backticked word against every line. No commit since cc47b637d touches the cited files.

## 74: rewrite
- scope pass; present meaning fail: "The `SUM` half at `ZZ32` is fixed by `40216550c` (ladder rung 8 ...)" tells the repair; evidence fail: "`Library/CompilerLibrary.fsi:180-181`" is now a blank line and `BIG MAX`, the pair at `:178-179`; comprehension pass; ownership fail: "three ladder files then stop in the checker on `SUM` applied to a vararg parameter" is row 604's defect told as a ladder story; consistency pass.
- Change: notes state the present prelude (`:178-179`, `:161`, `:181-182`) and its gating test `BigSumRung8.test`; the varargs `SUM` refusal points to row 604. Dropped: the commit 40216550c and the rung8 report's ladder counts (home: the history, row 74, which keeps the old line). Read: `CompilerLibrary.fsi:155-190`.

## 314: keep
- All pass. `CompilerLibrary.fsi:45-58` and `:36` hold the declarations the notes list (read at the base); the file's later commits touch other members.

## 331: rewrite
- evidence fail: "`Library/CompilerLibrary.fsi:223-236` at 052a7c3fe" shifted by -2; the rest pass. FACTS lines 44, 248, 271 and POSITIONS 100 agree.
- Change: pin `:221-234` at c124c6b65. Nothing dropped. Read: `CompilerLibrary.fsi:215-236`.

## 332: rewrite
- evidence fail: "`Library/FortressLibrary.fss:1493-1501` at 052a7c3fe" is now `SequentialGenerator`; `Maybe` is at `:1628-1638`; "`Library/CompilerLibrary.fsi:226`" is now `seq()`, `isNothing` at `:224`; "(`:1506`)", "(`:1536`)" read as `CompilerLibrary.fsi` lines past its end; comprehension fail for those two referents; consistency fail (minor): "Row 331 is the chapter's other `Maybe` divergence" stated as prose, not `siblings:`.
- Change: pins re-pointed (`FortressLibrary.fss:1628-1638`, `:1643`, `:1673`; `CompilerLibrary.fsi:224`, `.fss:529`); the trait's members listed as they stand; `siblings: 331`. Nothing dropped. Read: `grep isNothing` over the libraries (none in `Library/FortressLibrary.fss`), `FortressLibrary.fss:1625-1640`.

## 339: rewrite
- evidence fail: reproducer "`explorations/perf-probes/bound-any-compiled/REPORT.md`" is a report, not a program; "`NamingCzar.java:1155-1170`, `:1259-1260`" shifted +46 (now the snowman at `:1212` in `makeAnArrowDescriptor` and `:1304-1305` in `makeBoxedTupleName`); consistency fail (minor): row 832 shares its probe and FACTS line 25 names both rows, without a `siblings:`.
- Change: reproducer `none`, the claim's program and the report as its run; pins re-pointed; `siblings: 832`. Dropped: "Also under the bound `Object` with `()` written, `h[\()\](())`, which row 470 lets pass" (home: FACTS.md:25, which says a written static argument passes unchecked (row 470) and that `()` fails whatever the bound (row 339); and the history, row 339). Read: `NamingCzar.java:1192-1216`, `:1300-1308`, the report's table.

## 470: keep
- All pass. The cited lines hold their words at the pin d4d454f9d and are unchanged since. The refused notes of batches 12, 17 and 18 say what the row already says (dotted calls check; `where` constraints in F-250).

## 514: rewrite
- evidence fail: "`Library/CompilerLibrary.fsi:173-174`, at d4d454f9d" shifted -2; the rest pass.
- Change: pin `:171-172` at c124c6b65. Nothing dropped.

## 604: rewrite
- present meaning fail: "Fixed half: calls with zero, five or six varargs arguments, the body's typing and the export check, fixed aa07efb31 (climb batch 10, rung C)" is a repair story; evidence fail: `Misc.scala:628-639` shifted +1, `STypeEnv.scala:184-186` now `makeBinding`'s tail, the varargs binding at `:191-193`; consistency fail (minor): row 314 names 604 as sibling, 604 does not name 314.
- Change: the working half stated as the present behaviour with its test `VarargsNoTrailingArgument`; pins re-pointed; `siblings: 314`. Dropped: the commit aa07efb31 and "climb batch 10, rung C" (home: history, row 604). Read: `Misc.scala:624-642`, `STypeEnv.scala:185-195`, `XXXVarargsBodyIterates.test`.

## 832: rewrite
- evidence fail: reproducer is the report, not a program; "`CodeGen.java:6250-6263` at bedc80b01" shifted +279 (now `addTopLevelVarBinding`); the method is at `:6529-6542`; consistency fail (minor): no `siblings: 339` though they share the probe and FACTS line 25.
- Change: reproducer `none`, the program in the notes with the report as its run; pin re-pointed; `siblings: 339`. Nothing dropped. Read: `CodeGen.java:6529-6545`.

## 833: rewrite
- evidence fail: "`Shell.java:420-424`, `:1275` at bedc80b01" shifted +2; "`compiler/StaticChecker.java:228-229`" ambiguous with the checker-count shadow copy, the throw at `:229`; the rest pass. The record-says-fixed signal is F-9 stating the same gap, not a fix.
- Change: pins re-pointed at c124c6b65, `StaticChecker.java` by full path; the grep command shortened to `interpreter/`. Nothing dropped. Read: `Shell.java:1274-1280`, `StaticChecker.java:226-230`, `XXXCoercionStaticRungC.fss`.

## Pairs
- 339 and 832 share a probe, two defects: siblings, both rewritten. 69 and 833: siblings. 314 and 604: siblings. 514 and 661 (another chunk): siblings already named both ways; no pair for the reconcile run.
