# Rung B, rung-toplevel-array-literal: record lines

## Finding

Under walk a top-level variable declared with an array type and bound to an array literal is the array that the same declaration gives in a block. It holds for an immutable and a `var` variable whose declared type is the library's array trait of the literal's rank (`T[n]`, `T[n,m]`, `T[n,m,k]`, `Array1` to `Array3`, `Vector[\T,n\]`, `Matrix[\T,n,m\]`), for elements that are numerals, top-level names, expressions, strings and pasted arrays; a numeral element converts to the element type (`RR64[3] = [1 2 0.5]`, `NN32[2] = [1 2]`). An initializer above the variable reads the array. A literal whose size is not the declared type's is refused at load, 'Type mismatch binding __DefaultVector[\ZZ32,3\] ... to shp (type Array1[\ZZ32,0,4\])', and an element that the array refuses is reported, 'Unification error: ... got arg "a" of type String'.

Evidence: `ProjectFortress/src/com/sun/fortress/interpreter/env/LazilyEvaluatedCell.java:71-74`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:764-767` and `:718-723`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:126-168`; tests `ProjectFortress/tests/TopLevelArrayLiteral.fss`, `TopLevelArrayLiteralSize.fss` and `TopLevelArrayLiteralElement.fss` with their `.test` files; commit 06b90ba6cf. The harness on the base's code:

    FORTRESS_HOME=/home/user/fortress-base33 /home/user/fortress-base33/explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/old-harness <the three tests and two .test files>
    Non-object receiver (27,16,27): (ZZ32,ZZ32,ZZ32) trying to invoke method _[_]
    Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) (type (ZZ32,ZZ32,ZZ32)) to shp (type Array1[\ZZ32,0,4\])
    Tests run: 3,  Failures: 3,  Errors: 0

and on the edit, `explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/h1 <the same and XXXTopLevelVarForwardRead.fss>`: `OK (4 tests)`.

What it means for the work: a table of the model can be a top-level literal with a declared type, as `shp: ZZ32[9] = [...]` or `names: String[9] = [...]`, under walk. The compiled path is not touched; its prelude has no array type.

What is left as it was:

- A top-level literal without a declared type loads and is bound as its paste, a tuple of tuples at rank 2, with no error at the binding; its first use fails: `println(shp)` and `(a, b, c) = shp` with 'RHS does not yield a tuple', `shp[1]` with 'Non-object receiver'. In a block the same literal is refused at the binding, 'Can't infer element type for array construction' (row 49).
- A top-level literal declared at `Array[\RR64,ZZ32\]` is refused, 'Type mismatch binding (1.0,2.0): (RR64,RR64) (type (RR64,RR64)) to w (type Array[\RR64,ZZ32\])'; in a block it leaves the variable unbound (row 104).
- A literal in a block: no change of behaviour or message; `LHSEvaluator.forLValue` calls the code it held, now `libraryArray`.

## FACTS entry

**Under walk a top-level array literal with a declared type is built into the library array of that type, in the variable's cell.** `LazilyEvaluatedCell.getValueNull` builds an immutable variable's literal when the cell is first forced, so a reader above the declaration, an importer and `forVarDecl4`'s type check all see the array; `BuildEnvironments.forVarDecl4` builds a `var` variable's. Both call `LHSEvaluator.topLevelArray`, which runs the block's code, `libraryArray`. The declared size is checked only at the top level, by `forVarDecl4`; a block binds a literal of another size (row NEW-B-1). An untyped top-level literal stays a paste (row 49). Tests: `ProjectFortress/tests/TopLevelArrayLiteral.fss`, `TopLevelArrayLiteralSize.fss`, `TopLevelArrayLiteralElement.fss`. Detail: `explorations/compile-ladder/rung-toplevel-array-literal/REPORT.md`, "What changed and why".

## Ledger

Close row 142: `ledger.py close 142 --commit <the landing commit of 06b90ba6cf> --test ProjectFortress/tests/TopLevelArrayLiteral.fss --note TEXT`, TEXT:

    An untyped top-level literal is still bound as its paste, a tuple of tuples at rank 2, with no error at the binding; its first use fails ('RHS does not yield a tuple', 'Non-object receiver'): row 49.

Rows 49 and 104: no note; no test of theirs changed (`ProjectFortress/tests/XXXArrayLiteralArgRungC.fss` still reports its expected failure in the suite's run).

New rows, for section "9. Arrays, vectors and matrices" (NEW-B-1) and "3. Traits, objects and components" (NEW-B-2, beside row 323); each line passes `ledger.py check --rows` but for its number:

| NEW-B-1 | under walk an array literal bound in a block to a declared array type of another size is not refused: `a: ZZ32[4] = [27 16 27]` binds an array of three elements, and `a[1]` is 16; the same declaration at the top level is refused | NEGATIVE-VERIFIED | implementation gap (walk) | `Specification/basic/variables.tex`, "Top-Level Variable Declarations"; `Specification/basic/expressions/aggregate.tex`, "Array Expressions" | none | climb batch 32 rung B | siblings: 49, 104. `LHSEvaluator.forLValue` stores the array that `libraryArray` builds at the literal's own extents and never compares it with the declared type (`LHSEvaluator.java:204-206` at 06b90ba6cf); the top-level binding checks it in `BuildEnvironments.forVarDecl4`, 'Type mismatch binding __DefaultVector[\ZZ32,3\] ... to shp (type Array1[\ZZ32,0,4\])' (test `TopLevelArrayLiteralSize`). Command: `bin/fortress BodyBad.fss`, whose `run()` is `a: ZZ32[4] = [27 16 27]` then `println(a[1])`, prints `16` and exits 0. No test: no program asserts a refusal inside a block. The compiled prelude has no array type. |
| NEW-B-2 | under walk a top-level initializer that reads a mutable top-level variable declared later fails at load: `early: ZZ32 = late + 1` above `var late: ZZ32 = 3` gives `Failed to find any matching overload, args = (thunk (IntLiteralExpr …`; the compiled path prints 4 | NEGATIVE-VERIFIED | implementation gap (walk) | `Specification/basic/variables.tex`, "Top-Level Variable Declarations" | `ProjectFortress/tests/XXXTopLevelVarForwardRead.fss` | climb batch 32 rung B | siblings: 323. Before its own initialization a mutable variable's reference cell holds a `LazilyEvaluatedCell` (`BuildEnvironments.java:722-723` at 06b90ba6cf) that a plain reference passes on unforced: `early: ZZ32 = late` gives 'Attempt to find type of uninitialized variable: thunk', `var early: ZZ32 = late` the same. A subscript or a method call on the variable forces the cell, so `var first: ZZ32 = tally[0]` above `var tally: ZZ32[2] = [5 6]` is 5. `tests/InitOrderWithMutable.fss` passes because its reader is untyped and only printed. Workaround: declare the mutable variable first, or make the later one immutable. |

Row 323's notes say that `InitOrderWithMutable.fss` "shows walk accepts a *top-level* initializer reading a later mutable variable; the failure is specific to a singleton object's field". NEW-B-2 measures otherwise for a typed or computing reader. No rewrite of row 323 is given here: its own claim, the field's initializer, stands; the gather may add `siblings: NEW-B-2` to it.

## Handover line

Rung B: under walk a top-level array literal with a declared type is an array (row 142 closed, 06b90ba6cf, `tests/TopLevelArrayLiteral.fss`); untyped top-level literals stay pastes (row 49); two new rows, a block's literal of the wrong size (NEW-B-1) and a forward read of a later `var` (NEW-B-2, `tests/XXXTopLevelVarForwardRead.fss`).

## Revival change

**The change.** The team's walk bound a top-level variable declared with an array type to the literal's paste, a tuple, and stopped: `shp: ZZ32[3] = [27 16 27]` gave 'Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) (type (ZZ32,ZZ32,ZZ32)) to shp (type Array1[\ZZ32,0,3\])'; only a declaration in a block built the array (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:170-207`, the block's binding; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:788-803`, the top-level check, which built nothing). The tree now builds a top-level literal with a declared array type into the library array of that type, for an immutable and a `var` variable, with numerals, names, expressions, strings or pasted arrays as elements; a reader above the declaration sees the array; a literal of another size than its declared type, or with an element that is not of the element type, is refused at load. Test: `ProjectFortress/tests/TopLevelArrayLiteral.fss`, with `TopLevelArrayLiteralSize` and `TopLevelArrayLiteralElement` for the refusals. The reason: the specification gives an array expression one type wherever it stands, `Arrayk[\T, 0, n0, ...\]` (`Specification/basic/expressions/aggregate.tex`, "Array Expressions"), and a top-level declaration `id : Type = expr` the same meaning as a local one (`Specification/basic/variables.tex`, "Top-Level Variable Declarations"). Still so: a top-level literal without a declared type is bound as its paste and fails at its first use; write the type. A literal in a block of another size than its declared type is not refused.

**Provenance.** Ledger row 142; the batch's fork B1, "A typed array literal at the top level is the array that the same literal is in a function body", built within P-87 (no model line changes) and P-173 (a numeral element converts at the element type); climb batch 32, rung B.
