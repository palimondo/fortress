# Assessment, chunk r1 (reconcile run, base aa6e4ebee)

Three pairs: 349/442 (p-run1 p1 and c-run1 c1 final.pairs), 288/71 (c-run4 c16), 733/732 (c-run2 c17).

## Row 349: rewrite (pair 349/442: a half moved, siblings)
- scope: passes. present meaning: passes; `Library/FortressLibrary.fsi:646`, `:698-699` and `CompilerBuiltin.fsi:103-145`, `:147-208` unchanged since pin de6d905f5; P-161 has not landed (ZZ's `narrow`/`widen` still at `FortressLibrary.fsi:698-699`). evidence: XXX test `XXXZZNarrowRungP` stands; the probe path is read from history as the template allows. comprehension: passes. ownership: fails: it owns `narrow` of a `ZZ` but row 442 also lists it. consistency: POSITIONS P-161 agrees ("closes ... row 349's half on `narrow` of a `ZZ`").
- disposition: rewrite: `siblings:` gains 442; "P-161, not landed at de6d905f5," shortened to "P-161 (not yet landed)" for the 700 limit. No fact dropped (the pin de6d905f5 is still cited on the walk lines).
- beyond evidence: POSITIONS.md:92 (P-161), p-run1/p1 and c-run1/c1 final.pairs.

## Row 442: rewrite (pair 349/442: the `narrow`-of-`ZZ` half moved to 349)
- scope: fails: "`narrow` on `ZZ`" and gate `XXXZZNarrowRungP` are row 349's defect. present meaning: passes for the rest, read at the base: `CompilerBuiltin.fsi` has no `/` on `ZZ32`, no `^` on `ZZ64` (147-208), `GCD`/`LCM`/shifts only on `ZZ32` and `ZZ64`, none on `NN32`/`NN64`, no `check` on `RR64`; 5ad4a9957 touched only walk's library, not the prelude. evidence: XXX `XXXInferPromoteNN32`. comprehension: passes. ownership: as scope. consistency: FACTS 194, 254 and POSITIONS 78, 79 agree.
- disposition: rewrite: claim drops "`narrow` on `ZZ`"; notes open "siblings: 349 (`narrow` of a `ZZ`)" and drop `XXXZZNarrowRungP` from "Also gated".
- dropped facts and homes: the `narrow` of `ZZ` gap and its test: row 349 (claim and reproducer). The refused batch-21 note (expTest.fss stops compiled, "Variable asFloat is not defined.") is not written: the claim already holds "lack `asRR64` and `asFloat`", the row is at the limit, and `climb-batch-21/RECORD.md:176` and its REPORT keep the instance.

## Row 71: rewrite (pair 288/71: siblings)
- all six checks pass except ownership/consistency: row 288 names 71 in `siblings:`, 71 does not name 288. The `List.fsi` citations are ambiguous only by basename; the claim names `Library/List.fsi`. CovariantCollection.fsi lines unchanged since pin cc47b637d.
- disposition: rewrite: notes open "siblings: 288."; the ambiguous `List.fsi` citation spelled `Library/List.fsi` (mech.py; lines :69-70, :116, :119, :126, :137 hold at the base). Nothing dropped.

## Row 288: keep
- scope, present meaning (citations unchanged since pin c124c6b65), evidence (`none`, probe path in history), comprehension, ownership (names 71, 290, 884), consistency: pass. Silent beside NEGATIVE-VERIFIED: in silent.txt.

## Row 732: rewrite (pair 733/732: siblings)
- checks pass except ownership: 733 names 732 in `siblings:`, 732 does not name 733. CodeGen.java:968, :934-940 unchanged since pin c124c6b65.
- disposition: rewrite: notes open "siblings: 733."; two clauses reworded shorter for the 700 limit ("whose declarations have no body" to "which gives no body"; "need none, as they come through" to "come through"). Nothing dropped.

## Row 733: keep
- all checks pass; it names 732; CodeGen.java:1009 unchanged since pin c124c6b65; the probe report `explorations/perf-probes/abstract-sibling-body/REPORT.md` is in the tree (line 262 holds the crash).
