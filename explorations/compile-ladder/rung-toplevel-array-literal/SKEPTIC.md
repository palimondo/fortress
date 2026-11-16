# Rung B, rung-toplevel-array-literal: the skeptic's verdict

Verdict: approved. Head judged 89cb9b092a; head after the fix 481dba2553. One fix, a correction, settled; none contested. No code of walk was changed by the skeptic, so no build and no suite ran: the report's suite run, stage tables, demos and quick checks are those of the worker's head.

## What was checked

1. **Stages.** The diff edits `ProjectFortress/src/com/sun/fortress/interpreter/env/LazilyEvaluatedCell.java`, outside the stage-blind folders, so both stages were owed and both ran. The worker's last change of code was at 02:45:36 (call DU7G9E), its last build ended 02:46; the distance stage started 02:53 and the count stage 02:57, on 06b90ba6cf's tree. The saved tables say `#total 0`, `#crash none` for both, and `diff explorations/compile-ladder/climb-batch-30/gate/checker-count.txt` against the worker's count table prints nothing. The checker was not edited, so no timing was owed.
2. **Test first.** The harness ran on the unedited worktree at 02:38:00 (`# harness-one 2026-11-16T02:38:00Z; tree db352c1776`), 'Non-object receiver (27,16,27): (ZZ32,ZZ32,ZZ32) trying to invoke method _[_]', `Tests run: 2,  Failures: 2`; the first build started at 02:38:37 (call JoJvaX). The later additions failed on the base build at 02:45:12, `Tests run: 3,  Failures: 3`. The last run after the last change of code, 02:46:29: `OK (4 tests)`. The `XXX` test was shown red on a one-run change at 02:46:39, 'Missing expected failure'.
3. **The diff.** `libraryArray` is the block's code moved unchanged; `forLValue` keeps its arms. The cell builds the paste before the coercion that it already made; `forVarDecl4`'s mutable arm builds it before its type check; `forVarDecl3` gives a `var`'s cell its declared type. The edit is in the place of its precedent, b628871a26. The file beyond the section, `LazilyEvaluatedCell.java`, is reported by the worker with its reason, which holds: a build in `forVarDecl4` alone leaves the paste with every reader that forced the cell first.
4. **Citations.** Each provenance line was opened. `BaseEnv.java:549-557` is `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BaseEnv.java`, which the report names without its folder.
5. **The suite.** `ant testSystem` on 06b90ba6cf's tree: four `Failures: 0` lines, 213 + 207 + 207 + 207 = 834, `BUILD SUCCESSFUL`, read in the worker's saved log; 830 at the last gate (`explorations/compile-ladder/climb-batch-30/gate/summary.txt:61-64`) and its four files.
6. **Names.** `libraryArray` and `topLevelArray` are declared once each; no other test file holds a name of the rung's tests or of the skeptic's.
7. **Sentences of the specification made false.** None found: `Specification/appendices/changes.tex` holds no entry on an array literal at the top level, and the two notes on matrix unpasting stay true.

## The differential

Old is `/home/user/fortress-base33/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base33 <worktree>/tmp/old-caches P.fss`, new the worktree's `bin/fortress P.fss`, both under walk. The compiled path is not in the diff, and the worktree's bytecode cache is empty after the worker's build, so no compiled run was made on the new code; the prelude has no array type.

- A component that imports `shp: ZZ32[3]`, `var cnt: ZZ32[2]` and `names: String[2]` from another's api: old 'Non-object receiver (1,2): (ZZ32,ZZ32) trying to invoke method _[_]', new `18`, `[0#3][ 27 16 27 ]`, `b`, `[0#2][ 7 2 ]`.
- `one: ZZ32[1] = [5]`: old 'Type mismatch binding (5): ZZ32 (type ZZ32) to one', new 5. `viaF: ZZ32[2] = f()` with `f() = [1 2]`, `rr: RR64[2] = [xi yi]` with `ZZ32` names (`[0#2][ 3.0 4.0 ]`, as the block's), `un: Any[2] = [1 "a"]`, `r32: RR32[2] = [0.1 0.25]`, `g3: ZZ32[2,3] = [1 2 3; 4 5 6]` (`g3[1,2]` is 6), a read through a function from an initializer above, `m2: ZZ32[2] := [8 9]`: all bind on the new code.
- Still refused, with the array in the message where one was built: `ax: Array1[\ZZ32,1,3\] = [1 2 3]` ('Type mismatch binding __DefaultVector[\ZZ32,3\] ... to ax (type Array1[\ZZ32,1,3\])'), `g: ZZ32[2,3] = [1 2; 3 4; 5 6]` ('__DefaultMatrix[\ZZ32,3,2\] ... to g (type Array2[\ZZ32,0,2,0,3\])'), `g: ZZ32[6]` of a rank-2 literal and `w: Array[\ZZ32,ZZ32\] = [1 2]` (the paste, as before), `var s: ZZ32[2] = ["a" "b"]`, `b: NN32[2] = [1 -2]` ('got arg -2: ZZ32 of type ZZ32'), `z: ZZ32[2] = [1 3000000000]`, a rank-4 literal ('Missing type Array4', old and new, top level and block).
- `any: Any = [1 2]` is bound as its paste, and `println(any)` stops with 'RHS does not yield a tuple', as an untyped literal does (row 49).
- Threads: a program that reads a top-level literal of 40 elements and writes each element of a `var` one in a parallel `for` prints `1640` and `820` at `FORTRESS_THREADS=1` and `=4`; `tests/TopLevelArrayLiteral.fss` and `tests/ObjectFieldArrayLiteral.fss` exit 0 at both.

## Findings

1. **The edit reaches an object's field, which the report and the tests did not hold.** `object Q  v: ZZ32[2] = [1 2] end`: old 'Type mismatch binding (1,2): (ZZ32,ZZ32) (type (ZZ32,ZZ32)) to $v (type Array1[\ZZ32,0,2\])', new `2`; the same for a field of a constructed object, `object P(n: ZZ32)  v: ZZ32[2] = [n (2 n)] end`, and for a `var` field. It is right: "A field declaration in an object declaration is syntactically identical to a top-level variable declaration ..., with the same meanings attached" (`Specification/basic/objects.tex:295-297`). A point to report, another of the list's kind.
2. **In a block a `var` bound to a literal is immutable** (old and new): `var t: ZZ32[2] = [5 6]` then `t := u` stops with 'Cannot assign to immutable t'. The block is a reserved point: recorded, not repaired (row 1024).
3. **A literal assigned to a variable is not built** (old and new): `t := [7 8]` stops with 'Type mismatch assigning (7,8): (ZZ32,ZZ32) (type (ZZ32,ZZ32)) to t (type Array1[\ZZ32,0,2\])'. An assignment is not the section's binding: recorded, not repaired (row 1025).
4. **Row 1022 had a home.** The report gave the block's literal of another size a ledger row alone, since no program asserts a refusal inside a block. A block inside a top-level initializer does, as a refusal at load.
5. **The tests' comments.** The rung's four test files carried a header of several lines, and `TopLevelArrayLiteral.fss` four more comment lines; the skill asks for one.
6. **The failure-mode question.** No loud failure became a quiet wrong value. What was refused and now binds is the array that the block gives. The wrong size, the wrong lower bound, the wrong rank and the wrong element stay refused at load. A typed literal at `Any`, or without a type, stays a paste that fails at its first use, as before.

Where the skeptic differs from the worker's account: its decision 5 calls the block's wrong size a row without a test; finding 4 gives it one. Nothing else.

## The fix

Commit 481dba2553, "Skeptic's fix: rung B's tests for an object's field and three deferred defects, and the report's corrections". A correction: tests and the two record files, no code.

- `ProjectFortress/tests/ObjectFieldArrayLiteral.fss` (finding 1). Settled by `Specification/basic/objects.tex:295-297` and `Specification/basic/expressions/aggregate.tex`, "Array Expressions". On the base's code, `FORTRESS_HOME=/home/user/fortress-base33 /home/user/fortress-base33/explorations/compile-ladder/rung-inference-walk/harness-one.sh <worktree>/tmp/sk-old-harness <the four new tests and the .test file>`:

      # harness-one 2026-11-16T04:13:53Z; tree 84f1c37190; ... cache empty
      Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) (type (ZZ32,ZZ32,ZZ32)) to $shp (type Array1[\ZZ32,0,3\])
      Tests run: 4,  Failures: 1,  Errors: 0

  On the head, `explorations/compile-ladder/rung-inference-walk/harness-one.sh <worktree>/tmp/sk-h1 <the same>`: `OK (4 tests)`.
- `ProjectFortress/tests/XXXArrayLiteralLocalVar.fss` (finding 2), `XXXArrayLiteralAssigned.fss` (finding 3), `XXXBlockArrayLiteralSize.fss` and `.test` (finding 4): the harness reports ' OK Saw expected exception' for the first two and ' Saw expected failure: loaded and ran, not refused at load' for the third, on the base and on the head.
- The rung's four tests keep one comment line each, their declarations and assertions unchanged. All eight tests of the rung on the head, in one harness run at 04:14:35: `OK (8 tests)`.
- `REPORT.md`: the field in "What changed and why" and in the points reached; the test's line numbers; defect 3's home; defects 6 and 7; the file list. `record.md`: the field in the finding, the FACTS entry and the Revival change; row 1022's reproducer; rows 1024 and 1025, each passing `ledger.py check --rows` but for its number.

## For the curator

The worker's two questions stand: row 323's notes against row 1023, and the index order of a rank-3 literal.
