# Chunk c42, run c-run2, base c124c6b65

Marks: S scope, P present meaning, E evidence, C comprehension, O ownership, K consistency.

## Row 59: rewrite
- S pass. P fail: "Fixed half: `atomic` on a top-level variable lost updates on the compiled path until repair batch R1 (`AtomicTopLevelVar`)" names a fixed half as a repair story. E pass (probe gone, its path kept; reproducer `none` with output in notes). C pass. O pass. K pass.
- Change: the fixed half becomes a present fact ("`atomic` on a top-level variable is exact on the compiled path too (`compiler_tests/AtomicTopLevelVar`)"); the gone probe gets its history pointer (parent of `ab067d9b6`); `reduction.tex:15` pinned (the "not yet supported" note, read at the base).
- Dropped: "until repair batch R1" (story; history row 59 keeps it). "which would make it right" (cut for length).
- Beyond evidence: `git log` for the probe's deletion; `git ls-tree` for `AtomicTopLevelVar`; `reduction.tex` at the base.

## Row 79: rewrite
- S pass. P pass. E pass. C fail: "POSITIONS, "The numeral switch, split by where the static types are", sends this row to Q-walk": neither that title nor "Q-walk" stands in POSITIONS now; the entry is P-76 (`POSITIONS.md:84`, renamed per POSITIONS-history), which names row 79 among walk's gaps. O pass. K fail on that pointer only.
- Change: the POSITIONS pointer becomes P-76; the gone probe gets its history pointer (parent of `c69cb2064`).
- Dropped: "Q-walk" (no longer a term of the record; P-76 is its home).

## Row 82: rewrite
- All pass but E: the pins `FortressBuiltin.fsi:286` and `FortressBuiltin.fss:722` moved to `:287` and `:725` at the base. `CompilerLibrary` and `CompilerBuiltin` still declare no `Thread` (git grep at c124c6b65). Change: pins only, pinned at c124c6b65. Nothing dropped.

## Row 111: keep
- All six pass. Specified behaviour, `seq` workaround, probe's old path with history pointer (parent of `22ea0cd90`). No commit touches the generator's order; the overlap with 59 is the stated "trap family", not one defect.

## Row 319: rewrite
- E fail: `CodeGen.java:4343-4360` no longer holds `MutableFieldVar`; at the base it is `:4620-4636` (the TODO and the `new VarCodeGen.MutableFieldVar`, read at c124c6b65). `VarCodeGen.java:202-231` still holds the bare GETFIELD/PUTFIELD. Others pass.
- Change: pin moved and pinned at c124c6b65; "every compiled object's fields" shortened to "every object's fields" for the notes limit (the sentence is already about the compiled path). Nothing dropped.

## Row 463: keep
- All pass. `FortressLibrary.fss:1269-1273` shifted by one, but its words still hold (evidence). `CompilerLibrary.fss` declares no `__cond` at the base. The refused note (the two XXX tests) is already in the line. The XXX tests stay expected failures (questions.md).

## Row 480: rewrite
- E fail: `Functionals.scala:1216-1223` at 052a7c3fe; the rule now stands at `:1396-1402` at the base (read: `isContainsSubtype`, `case tt: TraitType => (ancestors(tt) + tt)...`, `case _ => false`), unchanged in substance, so the gap stands. `Evaluator.java:415` is now `:416` (the `extendsGenericTrait(... containsTypeName)` test). C: "Row 476's rule" points to a FIXED row; now "The checker's rule".
- Change: pins to c124c6b65. Nothing dropped (row 476 stays named in history; FACTS.md:189 agrees).

## Row 482: rewrite
- E fail: `Functionals.scala:1233-1242` at 052a7c3fe; the extremum branch is `:1413-1420` at the base (read). `Types.java:372-377` still `NI.nyi()`. Change: pin only. Nothing dropped.

## Row 640: keep
- All pass. NEGATIVE-BOUNDED beside `silent`, so not for silent.txt. The reproducer is the program; the notes give the condition that fails it (four threads, no `JAVA_FLAGS`). `build.xml:1188` still pins `-Xmx4g -Xss64m`. FACTS.md:153 agrees.

## Row 746: rewrite
- O/C fail: "The coordinator's call 6 (`explorations/coordinator/CLIMB-BATCH-16.md` section 2), listed for the curator's review" and "its revision box waits for the next rung that edits `if.tex`" tell process and rung story. E: the cite "`:21-22`" read as Evaluator lines (the evidence's check), but means the two tests' lines. Signal repro-plain-settled: the reproducer is plain and passes; for a `deliberate` row it asserts the chosen reading, which the new notes say.
- Change: the story becomes "a default awaiting the curator's review, not a decision (F-239)"; the test lines named as theirs; Evaluator pins at c124c6b65 (unchanged since 9879d4386).
- Dropped: the CLIMB-BATCH-16.md section pointer (home: F-239, which cites the call, and history row 746); "the next rung" (story).

## Other files
- No closes, duplicates, pairs, questions or silent rows. The overlap of 746 with 377 (outside the run) is two rare names, unrelated. 480 and 482 share the `case` rule but state different defects.
