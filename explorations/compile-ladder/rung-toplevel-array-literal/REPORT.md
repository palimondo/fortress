# Rung B, rung-toplevel-array-literal: an array literal with a declared type at the top level is an array under walk

- problem: under walk `shp: Vector[\ZZ32,9\] = [27 16 27 ...]` at the top level fails with 'Type mismatch binding (27,16,...)', while the same declaration in a function body works (ledger row 142): explorations/fortress-gap-ledger.md:769
- spec: "The type of a k-dimensional array expression is Arrayk[\T, 0, n0, ..., 0, nk-1\]", and `id : Type = expr` at the top level: Specification/basic/expressions/aggregate.tex:130 and Specification/basic/variables.tex:58
- precedent: the typed cell of a top-level variable, which converts the value to the declared type when it is first forced (commit b628871a26): ProjectFortress/src/com/sun/fortress/interpreter/env/LazilyEvaluatedCell.java:37
- deviation: the block's code refuses neither a wrong size nor, with a message of its own, a wrong element; the top level refuses both, the size by the check `forVarDecl4` already had, the element by a wrap in `topLevelArray`: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:160
- historical: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java, ProjectFortress/src/com/sun/fortress/interpreter/env/LazilyEvaluatedCell.java: ProjectFortress/src/com/sun/fortress/interpreter/env/LazilyEvaluatedCell.java:71

## What changed and why

Commit 06b90ba6cf, on `wip/rung-toplevel-array-literal`, cut from db352c1776. Three files of walk, four tests.

Walk evaluates an array literal to a paste, an `IUOTuple` (`Evaluator.forArrayElements`). In a block, `LHSEvaluator.forLValue` builds a paste into a library array when the variable has a declared type that is the array trait of the paste's rank. At the top level nothing built it: an immutable variable's cell (`LazilyEvaluatedCell`) kept the paste, and `BuildEnvironments.forVarDecl4` then compared the paste with the declared type and stopped.

1. `LHSEvaluator.libraryArray(paste, declared, at)` (`LHSEvaluator.java:120-152`) is the block's building code, moved out of `forLValue` unchanged: the element type from the declared type, the factory `arrayK[\T, sizes\]()` at the paste's extents, the copy. It returns null where the declared type is not the array trait of the paste's rank. `forLValue` calls it (`:204-206`) and keeps its other arms as they were.
2. `LHSEvaluator.topLevelArray` (`:154-168`) calls it for a top-level variable: it returns the paste itself where nothing is built, so that `forVarDecl4`'s 'Type mismatch binding' stays the report, and it reports an element that the array refuses as 'Unification error: ...' at the literal, as `Evaluator.invokeMethod` and `Fcn.functionInvocation` do for a call (`Evaluator.java:1047-1053`). Without the wrap the run printed `null`: no call encloses a top-level binding, and the `UnificationError` lost its message on its way out of the task pool.
3. `LazilyEvaluatedCell.getValueNull` (`LazilyEvaluatedCell.java:71-74`) builds the literal of an immutable variable declared with a type when the cell is first forced, before the coercion to the declared type that the cell already made. So every reader sees the array: an initializer above the declaration, a function, an importer, and `forVarDecl4`'s check, which now passes, or refuses an array of another size.
4. `BuildEnvironments.forVarDecl4`, mutable arm (`BuildEnvironments.java:764-767`), builds a `var` variable's literal before its type check. `forVarDecl3` (`:718-723`) gives the cell that a `var` holds before its initialization the declared type, so that an initializer above it that subscripts the variable sees the array and not the paste.

No library file, no model line, nothing of the compiled path.

## The failing run and the passing run

The tests were written first and run through the harness in the worktree while it held the base's build and no edit (2026-11-16T02:38:00Z, tree db352c1776), then, after each addition to the tests, on the base build's code:

    FORTRESS_HOME=/home/user/fortress-base33 /home/user/fortress-base33/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/old-harness ProjectFortress/tests/TopLevelArrayLiteral.fss ProjectFortress/tests/TopLevelArrayLiteralSize.fss ProjectFortress/tests/TopLevelArrayLiteralSize.test ProjectFortress/tests/TopLevelArrayLiteralElement.fss ProjectFortress/tests/TopLevelArrayLiteralElement.test
    # harness-one 2026-11-16T02:45:12Z; tree 84f1c37190; ... cache filled
    Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) (type (ZZ32,ZZ32,ZZ32)) to shp (type Array1[\ZZ32,0,4\])
    Type mismatch binding (a,b): (String,String) (type (String,String)) to shp (type Array1[\ZZ32,0,2\])
    Non-object receiver (27,16,27): (ZZ32,ZZ32,ZZ32) trying to invoke method _[_]
    Tests run: 3,  Failures: 3,  Errors: 0

(The base build's worktree is at 84f1c37190, a commit of `explorations/` only before db352c1776; its code is the base's.) The last run after the last change of code:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 <the same five files> ProjectFortress/tests/XXXTopLevelVarForwardRead.fss
    # harness-one 2026-11-16T02:46:29Z; tree db352c1776; ... cache empty
     OK Saw expected exception
     OK Saw expected refusal at load
     OK Saw expected refusal at load
    OK (4 tests)

`FORTRESS_THREADS=1 bin/fortress ProjectFortress/tests/TopLevelArrayLiteral.fss` exits 0 with no output.

The walk suite, once, on the final code (06b90ba6cf's tree): `ant testSystem`

    [junit] Tests run: 213, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 224.536 sec
    [junit] Tests run: 207, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 233.204 sec
    [junit] Tests run: 207, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 242.804 sec
    [junit] Tests run: 207, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 252.733 sec
    BUILD SUCCESSFUL

834 tests, the last gate's 830 (`explorations/compile-ladder/climb-batch-30/gate/summary.txt:61-64`) and the four new files.

The team demos, `bash tmp/run-demos.sh tmp/demos` on the same code: `demos: 52 run, 52 reached their end`.

microGPT's quick checks, `explorations/coordinator/tools/mg-run.sh tmp/rung-toplevel-array-literal/mg final`: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0`, for both programs.

## What the tests assert

`ProjectFortress/tests/TopLevelArrayLiteral.fss`: `shp: ZZ32[3] = [27 16 27]` and `shp[1]`, `|shp|`, a read in a function and by an initializer above it; `grid: ZZ32[3,2] = [1 2; 3 4; 5 6]` and `grid[2,0]`; `dims: ZZ32[2,2] = [vocabSize nEmbd; (4 nEmbd) nEmbd]`, the names bound by `(vocabSize, nEmbd) = (27, 16)` above; `names: String[9]`; `vec: Vector[\ZZ32,3\]` and `vec DOT vec`; numerals at `RR64[3]` and `NN32[2]`; `weights: Matrix[\RR64,2,2\]`; `twice: ZZ32[6] = [shp shp]`, a literal that pastes arrays; `var tally: ZZ32[2] = [5 6]`, its element assigned, and read by `var first: ZZ32 = tally[0]` above it; and each rank against the same literal in `run()`'s block. Rank 3 is asserted only as equal to the block's, element by element: the index order of a rank-3 literal (`cube[0,0,1]` is 5 for `[1 2; 3 4;; 5 6; 7 8]`) is the block's own and is not judged here.

`TopLevelArrayLiteralSize` (`shp: ZZ32[4] = [27 16 27]`) and `TopLevelArrayLiteralElement` (`shp: ZZ32[2] = ["a" "b"]`) are refusals at load, each with a `.test` key that the base's message does not hold.

## Where the fix belongs, and the precedent search

`explorations/coordinator/map/modules-and-phases.md`, "B.8 The interpreter tail": walk populates a component's environment in passes; pass 1 puts a lazy cell for each immutable top-level variable, pass 4 forces it and checks its type (`BuildEnvironments.java:663-695`, `:734-806`). `BaseEnv.getValueNullTail` replaces the cell by its value the first time anything reads the name (`BaseEnv.java:549-557`), which can be before pass 4 reaches the declaration. So the value has to be right when the cell is forced, not when pass 4 checks it.

The precedent is commit b628871a26, which gave the cell its declared type so that a value is converted by coercion when the cell is forced (`LazilyEvaluatedCell.java:37-44`, `:75`), and 3de571bac7, which added the numeral's conversion beside it. This edit puts the literal's building at the same place. The cell is constructed at 5 sites (`BuildEnvironments.java:515`, `:687-688` twice, `:722`, `BuildNativeEnvironment.java:161`); 2 passed a declared type before, 3 do now (`:722`).

The paste is built into an array at 1 site, `LHSEvaluator.forLValue`; nothing else in `interpreter/` reads an `IUOTuple` but `EvaluatorInPaste` and `IndexedArrayWrapper`, which make and copy it.

## What the specification settles

`aggregate.tex`, "Array Expressions": an array expression has the type `Arrayk[\T, 0, n0, ...\]` wherever it stands. `variables.tex`, "Top-Level Variable Declarations": `id : Type = expr` declares a variable whose value is the value of `expr`, whose static type must be a subtype of `Type`; "The initializer expressions of top-level variable declarations can refer to variables declared later in textual order." So the typed literal is an array, a literal of another size is an error, and a read from above sees the array. The specification does not say how a rank-3 literal's `;;` dimension is indexed beyond "the horizontal dimension of an array is the last dimension mentioned in the array index".

## Programs run old against new

Old is `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base33 tmp/old-caches`; new is the worktree's `bin/fortress`.

- The three tests through each harness: above.
- `early: ZZ32 = late` above `var late: ZZ32 = 3`: old and new 'Attempt to find type of uninitialized variable: thunk (IntLiteralExpr ...'.
- `var early: ZZ32 = late + 1` above `var late: ZZ32 = 3`: old and new 'Failed to find any matching overload, args = (thunk (IntLiteralExpr ...'.
- `var early: ZZ32 = late` above `late: ZZ32 = 3`: old and new print 3.
- `var early: ZZ32 = late` above `var late: ZZ32 = f()`: old and new 'Attempt to find type of uninitialized variable'.
- Old only, the compiled path, which the edit does not reach: `early: ZZ32 = late + 1` above `var late: ZZ32 = 3`, `compile` then `run`, prints 4.

New only, programs the planner's probes did not hold:

- An untyped top-level literal, `shp = [27 16 27]` and `g = [1 2; 3 4]`: the component loads; `println(shp)` and `(a, b, c) = shp` stop with 'RHS does not yield a tuple'. It is still bound as its paste.
- `w: Array[\RR64,ZZ32\] = [1.0 2.0]` at the top level: 'Type mismatch binding (1.0,2.0): (RR64,RR64) (type (RR64,RR64)) to w (type Array[\RR64,ZZ32\])'.
- `w: ZZ32 = [1 2]`: 'Type mismatch binding (1,2): (ZZ32,ZZ32) (type (ZZ32,ZZ32)) to w (type ZZ32)'.
- `var shp: ZZ32[4] = [27 16 27]`: 'Type mismatch binding __DefaultVector[\ZZ32,3\] (type __DefaultVector[\ZZ32,3\]) to shp (type Array1[\ZZ32,0,4\])'.
- `(a, b): (ZZ32[2], ZZ32) = ([1 2], 3)` at the top level prints `[0#2][ 1 2 ]` for `a`; it did not go through the edited code.
- In a block, before the edit was built: each form of the test binds and reads (`ZZ32[3]`, `ZZ32[3,2]`, names and expressions, `String[3]`, `Vector`, `RR64[3] = [1 2 3]`, `NN32[2]`, `var`, `Matrix`); `a: ZZ32[4] = [27 16 27]` binds, and `a[1]` prints 16; `s: ZZ32[2] = ["a" "b"]` stops with 'Closure/Constructor for init param 2 (v:ZZ32) got arg "a" of type String'.

## The stages

`ProjectFortress/src/com/sun/fortress/interpreter/env/LazilyEvaluatedCell.java` is not under one of the folders whose edits cannot move the stages, so both ran, once, on 06b90ba6cf, which is the final code:

- Count, `explorations/coordinator/tools/checker-count/run.sh`: `diff explorations/compile-ladder/climb-batch-30/gate/checker-count.txt <the new table>` prints nothing.
- Distance, `explorations/coordinator/tools/distance/run.sh`: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-30/gate/distance.txt <the new table>` prints `DISTANCE SAME   0`. `errors.tsv` holds its header alone, as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site moved.

The checker was not edited, so its time was not measured. No table is committed.

The files, for STAGE_BLIND: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java`, `ProjectFortress/src/com/sun/fortress/interpreter/env/LazilyEvaluatedCell.java`, `ProjectFortress/tests/TopLevelArrayLiteral.fss`, `ProjectFortress/tests/TopLevelArrayLiteralSize.fss` and `.test`, `ProjectFortress/tests/TopLevelArrayLiteralElement.fss` and `.test`, `ProjectFortress/tests/XXXTopLevelVarForwardRead.fss`, and the two files of this folder.

## The ladder subset

Empty. `grep -rlE "Type mismatch binding|LHSEvaluator|LazilyEvaluatedCell|BuildEnvironments|IUOTuple|array construction" explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing: no file's recorded first error names what the edit touched, and the ladder is the compiled path, which the edit does not reach.

## Competing declarations

`grep -rn "libraryArray\|topLevelArray" ProjectFortress/src` finds the two methods and their three calls only. No file of `ProjectFortress/` but the new tests holds `TopLevelArrayLiteral` or `TopLevelVarForwardRead`.

## Sentences of the specification made false

None. `Specification/basic/variables.tex:15-16` and `Specification/basic/expressions/aggregate.tex:15`, "matrix unpasting ... not yet supported", stay true. No Effect of `Specification/appendices/changes.tex` and no note names a top-level array literal.

## Points to report reached

1. Row 142's typed probes fail on the base and pass after: rank 1, 2 and 3, numerals, names and expressions, strings, a `Vector`, a `Matrix`, a pasting literal, a `var`. Evidence: `ProjectFortress/tests/TopLevelArrayLiteral.fss:13-39`, the two runs above.
2. An untyped top-level literal on this tree: it loads, bound as its paste, and fails at its first use, 'RHS does not yield a tuple'. Not repaired (row 49; fork B1).
3. No existing test changed its verdict, output or pinned message: `ant testSystem`, 834 run, 0 failures, 830 before and 4 new. No program of the suite or of the demos relied on a top-level binding of a pasted tuple; the one such line in the demos, `ProjectFortress/demos/turnersParaffins0.fss:134`, is inside a comment.
4. A file edited beyond those the section names: `ProjectFortress/src/com/sun/fortress/interpreter/env/LazilyEvaluatedCell.java:71-74`, the cell that `forVarDecl4` forces. For that file the two stages ran; both tables are the last gate's.
5. Beyond the literal: `BuildEnvironments.java:718-723` gives every mutable top-level variable's cell before initialization its declared type, so a value read from above the declaration, where such a read works at all (row NEW-B-2), is converted by coercion as the initialization converts it. No test changed.
6. The top level and the block now differ in two refusals: a literal of another size than its declared type (refused at the top level, bound in a block, row NEW-B-1) and the message for a refused element ('Unification error: ...' at the top level). The block is not changed: it is a reserved point.

## Decisions

1. The literal is built in the variable's cell, when it is first forced. Ways not taken: build it in `forVarDecl4` alone, after the cell is forced, which leaves the paste with every reader that forced the cell earlier (the test's `early`, declared above `shp`, fails so) and in an importer's copy; a subclass of the cell declared in `BuildEnvironments.java`, which would keep the edit inside `interpreter/evaluator/` but must either copy `getValueNull` or patch the stored value after the parent stored the paste; `Coercions.coerceToDeclared`, which is another rung's file. Evidence: the precedent b628871a26; `BaseEnv.java:549-557`.
2. The building code is shared as one static method, `libraryArray`, moved from `forLValue` with no change. Ways not taken: a copy in `BuildEnvironments`; moving `forLValue`'s other arms (`FTypeArray`, `FTypeMatrix`, `FTypeVector`) too, which the top level does not need and row 104 sits on.
3. A `var` variable's literal is built in `forVarDecl4`'s mutable arm, and its cell before initialization takes the declared type. Ways not taken: leave that cell untyped, with which `var first: ZZ32 = tally[0]` above `var tally` stopped with 'Non-object receiver (5,6)' on the first build of the edit; make `forVarDecl4` reuse the cell's value instead of evaluating the initializer again, which changes every mutable top-level variable.
4. An element that the array refuses is reported by a wrap in `topLevelArray`, at the top level only. Ways not taken: leave it, the run then prints `null`; wrap inside `libraryArray`, which would change the block's message, a reserved point.
5. The declared size is checked by the check `forVarDecl4` had. Way not taken: a check in `libraryArray`, which would refuse the block's literal too, a reserved point; it is row NEW-B-1.
6. Where the declared type is not the array trait of the paste's rank (row 104's `Array[\E,I\]`, a type that is no array), the paste is left and 'Type mismatch binding' reports it, as before. Way not taken: a message of its own.
7. Both stages ran, since one edited path is outside the folders named as unable to move them. Way not taken: decision 1's subclass, to stay inside those folders.
8. Rank 3 is asserted against the block's literal, not against values, since the record does not settle its index order.
9. `TopLevelArrayLiteralSize.test` pins `[\ZZ32,3\]) to shp (type Array1[\ZZ32,0,4\])`, the sizes of the two types, and not `__DefaultVector`, the library's name for the built array.

## Defects and their homes

1. A typed top-level array literal is bound as a tuple (row 142). Home 1: `ProjectFortress/tests/TopLevelArrayLiteral.fss` and its two refusal tests.
2. A refused element of a top-level literal printed `null`. Seen only on the first build of this edit, and repaired in it. Home 1: `ProjectFortress/tests/TopLevelArrayLiteralElement.fss`.
3. In a block a literal of another size than its declared type is bound (NEW-B-1). The specification settles it, but no program can assert a refusal inside a block, so no gated test can hold it: the ledger row alone, with its command in the notes.
4. A top-level initializer that reads a later mutable top-level variable fails at load unless the read is a subscript or a method call (NEW-B-2). Home 2: `ProjectFortress/tests/XXXTopLevelVarForwardRead.fss`, the first `XXX` test of this change. As it is the harness reports `OK Saw expected exception`; with `var late: ZZ32 = 3` changed to `late: ZZ32 = 3` for one run it reported 'Missing expected failure', `Tests run: 1,  Failures: 1`, and the file was restored. The compiled path prints 4. Row 323's notes say the opposite for a top-level reader, from a test whose reader is untyped.
5. An untyped top-level literal is bound as an unusable paste with no error at the binding. It is row 49's gap at the top level; it goes into row 142's close, as the section asks.

## For FACTS

In `record.md`, "FACTS entry".

## Commands worked out

None beyond the skill's.

## Not done

The compiled path: nothing, by the section. Row 49 and row 104: not repaired, by the section.
