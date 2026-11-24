<!-- Round 1 of the pilot of the consolidation of FACTS (2026-11-24): six of the sorting map's seven cases rewritten by its rules, each entry's old and new text with where each claim went, for the curator to check, corrected after the pilot's two checks; its apply file is `round-1.apply` beside it. -->

# The consolidation's pilot, round 1: six cases

This round rewrites the entries of six cases of the sorting map (`../sorting-map/MAP.md`, section 7), by the writers' brief (`../sorting-map/brief-pilot.md`). Case 2 (F-143 into F-141, with F-228) is round 2's. The apply file `round-1.apply` beside this file rewrites 19 entries. It adds no entry, merges none and removes none. `record.py apply` and then `record.py check --base HEAD` ran in the worktree `/home/user/rec-pilot-1`, on `92f2e628d4`: "FACTS.md 339 entries, POSITIONS.md 107 entries; 0 failures". They ran again from the same base after the fixes of the pilot's checks ("After the checks", at the end), with the same result. The reports that the check lists (34 unresolved `from` lines, all in older history blocks) were there before.

Claim numbers are those of the claims files (`../sorting-map/claims-<chunk>.md`). "The history" is `FACTS-history.md`, which keeps each old line word for word.

## The sizes

Characters of each entry's line, before and after.

| Entry | Before | After | Change |
|---|---|---|---|
| F-374 | 1,770 | 1,236 | -534 |
| F-351 | 1,900 | 2,186 | +286 |
| F-279 | 766 | 866 | +100 |
| F-157 | 1,117 | 988 | -129 |
| F-63 | 1,265 | 1,036 | -229 |
| F-286 | 1,146 | 921 | -225 |
| F-297 | 1,680 | 1,061 | -619 |
| F-64 | 848 | 856 | +8 |
| F-171 | 1,186 | 1,604 | +418 |
| F-240 | 2,201 | 915 | -1286 |
| F-111 | 1,364 | 1,228 | -136 |
| F-43 | 705 | 841 | +136 |
| F-179 | 282 | 413 | +131 |
| F-102 | 783 | 789 | +6 |
| F-103 | 749 | 880 | +131 |
| F-104 | 913 | 835 | -78 |
| F-383 | 587 | 451 | -136 |
| F-108 | 712 | 650 | -62 |
| F-98 | 498 | 595 | +97 |
| Sum | 20,472 | 18,351 | -2121 |

The 19 entries hold 2,121 characters fewer, 10 %. Two entries grew because they took a claim from another entry: F-351 (F-374's atomic expression) and F-171 (F-64's reading of the specification). Five grew by an evidence kind or by a claim moved in: F-43, F-179, F-102, F-103 and F-98.

## Case 1. A split: F-374, with F-351

An entry that holds two subjects keeps the one that its title states, and its other subject goes to the entry that owns it.

F-374 keeps the cell of a `var` field. Its atomic expression goes to F-351, which owns "transactions and atomic expressions".

### F-374

Old, 1,770 characters:

> F-374 **A compiled object's `var` field lives in a cell that the object holds, and an atomic expression is its body in an atomic block.** On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor; each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var`, and a loop body or a function expression in the object's method captures the cell. The batch's planner chose the cell as a default, and the curator has not decided it. So an `atomic` block tracks a `var` field (row 319, fixed), and every access of one pays the transaction check, outside `atomic` too (row 641). A field without `var` holds its value and has no check. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322); a numeral as its value at a place of declared type is refused or fails verification, since the checker carries no declared type into it (row 1043). So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is not strictly equivalent to another built alike: `V(1) === V(1)` is `false`, since `SEQV` compares the cells by identity. The one library declares one, `Lazy` (`Library/Lazy.fss:18`). Tests: `compiler_tests/AtomicFieldCompiled`, `compiler_tests/VarFieldCapturedCompiled`, `compiler_tests/AtomicExprCompiled`. Detail: `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" and "The bytecode".

New, 1,236 characters:

> F-374 **A compiled object's `var` field lives in a cell that the object holds, and every read and write of it takes the code of a top-level `var`.** On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor. Each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, and a loop body or a function expression in the object's method captures the cell. So an `atomic` block tracks a `var` field, and every access of one pays the transaction check, outside `atomic` too (row 641: the check's measured cost). A field without `var` holds its value and has no check. The batch's planner chose the cell as a default, and the curator has not decided it. A change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a `var` field's cell as it does a top-level `var`'s. In a `value` object, a `var` field, which nothing refuses, makes two objects built alike not strictly equivalent (row 112). Gated by `compiler_tests/AtomicFieldCompiled`. Detail: `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" and "The bytecode".

Where each claim went (`claims-landed-3.md`):

| Claim | Where it stands now |
|---|---|
| 1. A `var` value parameter or field is a `MutableFValue` cell in a `public final` field, made by the constructor | F-374, "On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell ..." |
| 2. Each read and write checks `inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var`; a loop body or function expression captures the cell | F-374: the title, "every read and write of it takes the code of a top-level `var`", and "Each read and write checks `BaseTask.inATransaction()` ... captures the cell." |
| 3. The planner chose the cell as a default; the curator has not decided it | F-374, word for word |
| 4. An `atomic` block tracks a `var` field (row 319, fixed) | The tracking stays in F-374 as a present property, "So an `atomic` block tracks a `var` field", gated by `AtomicFieldCompiled`. "(row 319, fixed)" goes to the history. |
| 5. Every access pays the transaction check, outside `atomic` too (row 641) | F-374 keeps the sentence with "(row 641: the check's measured cost)". Row 641 holds the check's sites, its cost and what was not measured. |
| 6. A field without `var` holds its value and has no check | F-374, word for word |
| 7. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322) | F-351, "The code generator compiles `atomic e`, for a body other than a `do` block, as the atomic block that holds `e` alone, so the expression has the block's limits (row 322: as a call's later argument it fails verification)." `forAtomicBlock` by name: the report's "What changed and why", item 1. "(row 875, fixed)": the history. |
| 8. A numeral as an atomic expression's value at a declared type is refused or fails verification (row 1043) | F-351, "The checker carries no declared type into an atomic expression's body, so a numeral as its value where a type is declared is refused or fails verification (row 1043)." Row 1043 holds the two cases and their test. |
| 9. A change of the transaction's variable code reaches fields; a new nested context must capture the cell | F-374, word for word |
| 10. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is not strictly equivalent: `V(1) === V(1)` is `false`, since `SEQV` compares the cells | F-374 keeps "In a `value` object, a `var` field, which nothing refuses, makes two objects built alike not strictly equivalent (row 112)." Row 112 holds the specification's section, `V(1) === V(1)`, `SEQV` and its line. |
| 11. The one library declares one, `Lazy` (`Library/Lazy.fss:18`) | Row 112's notes: "The one library declares one, `Lazy` (`Library/Lazy.fss:18`)". The map sent it to the report, which does not name `Lazy`. |
| 12. Tests: `AtomicFieldCompiled`, `VarFieldCapturedCompiled`, `AtomicExprCompiled` | F-374 names `AtomicFieldCompiled`. The report names all three; `AtomicExprCompiled` is also in F-351's pattern. |
| 13. Detail: the report | F-374, word for word |

### F-351

Old, 1,900 characters:

> F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), commits the transaction on an exit, a `LabelExit`, and throws the exit on, or takes the abort path where that commit fails (F-401), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:295-322`,`compiler/codegen/CodeGen.java:2148-2180` (`forAtomicBlock`), `:2490-2494` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

New, 2,186 characters:

> F-351 **A compiled `atomic` block runs as a transaction that validates itself and every ancestor, and an abort restarts the block whose transaction it names; an atomic expression is compiled as such a block.** The transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with `EMPTY`, a mark that validation reads as no value. The global lock is a counter that each commit raises, and a transaction keeps a value of it, its snapshot, set when it starts and at each validation. Validation, at a read once the counter has moved past the snapshot and at a commit that finds it moved, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), commits the transaction on an exit, a `LabelExit`, and throws the exit on, or takes the abort path where that commit fails (F-401), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. A nested block is not atomic against a plain write that another thread of its outer block makes (row 984). The code generator compiles `atomic e`, for a body other than a `do` block, as the atomic block that holds `e` alone, so the expression has the block's limits (row 322: as a call's later argument it fails verification). The checker carries no declared type into an atomic expression's body, so a numeral as its value where a type is declared is refused or fails verification (row 1043). Gated by `compiler_tests/*Atomic*Compiled`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why"; `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" (the expression).

Where each claim went (`claims-exec.md`):

| Claim | Where it stands now |
|---|---|
| C1 to C5. Validation, the reads recorded, the handler, the nested commit | F-351, word for word, but the title, which now also names the atomic expression, and C2 and C3, which now say what the global lock, the snapshot and the mark are (the pilot's cold read) |
| C6. The exception-table entry of a block or a `try` follows its body, so a nested one is taken first | F-351, word for word. The map sends it to F-373; see "Where the map could not be followed". |
| C7. A nested block sees a plain write by another thread of its outer block (row 984) | F-351, "A nested block is not atomic against a plain write that another thread of its outer block makes (row 984)". Row 984 holds the mechanism and the probe. |
| C8. The source lines | The history. The report's "What changed and why" gives them at the rung's commit. Three had moved (`stale-claims.md`, F-351). |
| C9. Nine tests | `compiler_tests/*Atomic*Compiled` matches seven of them. The report names all nine, `NestedTryInnerCatch` and `ArrayStoreJUTest` among them. |
| In: F-374's claims 7 and 8 | See F-374 above. |

## Case 3. A defect beside its property: F-279, with F-157

An entry that states a property and also describes a defect keeps the property, and the defect's description goes to the defect's row in the gap ledger.

### F-279

Old, 766 characters:

> F-279 **Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, except a shifted `Array2`.** `Array2.subarray` and `Array3.subarray` hand their 0-based views the offset less the base, and `Array3`'s `[:]` passes its base, as `Array1`'s do (`Library/FortressLibrary.fss:2999`, `:3401`, `:3380`; `:2711`). `SubArray2`'s own `subarray` subtracts the output base instead of its own (`:3083`, row 808), so a slice of a shifted `Array2` still reads the wrong elements, and a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`. Tests: `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`. Detail: `compile-ladder/rung-slices-list-equality/REPORT.md`, sections 1 and 5.

New, 866 characters:

> F-279 **Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, except an `Array2` that `shift` moved to a new base.** `Array2.subarray` and `Array3.subarray` hand their 0-based views the offset less the base, and `Array3`'s `[:]` passes its base, as `Array1`'s do. Such a shifted `Array2` is a `SubArray2` view, and `SubArray2`'s own `subarray` (`Library/FortressLibrary.fss:3083`) subtracts the output base instead of its own. So a slice of a shifted `Array2` reads the wrong elements, and `shift` of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException` (row 808: its cases, the one-line repair and a way around). Gated by `tests/Array*SliceAtNonzeroBase`; row 808's expected failure is `tests/XXXArray2ShiftedSlice`. Detail: `compile-ladder/rung-slices-list-equality/REPORT.md`, sections 1 and 5.

Where each claim went (`claims-arrays.md`):

| Claim | Where it stands now |
|---|---|
| 1. `Array2.subarray` and `Array3.subarray` hand their views the offset less the base; `Array3`'s `[:]` passes its base | F-279, word for word |
| 2. The source lines | `:2999`, `:3401`, `:3380` and `:2711` go to the history; the report's section 1 has the lines of its own day. `:3083`, the defect's site, stays until row 808 gives today's line (proposal below). |
| 3. `SubArray2`'s `subarray` subtracts the output base, so a slice of a shifted `Array2` reads the wrong elements (row 808) | F-279 keeps it, with "(row 808: its cases, the one-line repair and a way around)", and says what a shifted `Array2` is: one that `shift` moved to a new base, a `SubArray2` view. Row 808 holds it: "every subscript of a shifted `Array2` reads the wrong elements", and in its notes `SubArray2.subarray` "subtracts the output base". |
| 4. A shift of a slice, a column, a row or a shifted `Array2` ends in `ArrayIndexOutOfBoundsException` (row 808) | Row 808's claim, word for word. F-279 keeps it whole too, since "its shifts fail" did not say which shifts (the pilot's cold read). |
| 5. Tests | F-279: the pattern `tests/Array*SliceAtNonzeroBase` and row 808's expected failure `XXXArray2ShiftedSlice`. The report names all three. |
| 6. Detail | F-279, word for word |

### F-157, the owner of "array views and slices"

F-279 stays beside F-157: F-157 owns the subject, but the two answer different questions (the view idiom and its cost; walk's slices at a base above zero), so neither merges into the other. F-157's own disposition is "rewritten in place", with its two measurements going to their rows.

Old, 1,117 characters:

> F-157 **An array is a trait with `get` and `put`, and a view is an object that implements it over other storage; this is the language's own idiom for a view of a runtime shape, as the library's own `TransposedMatrix` is.** Under walk, a subtype of `Matrix` that overrides `mul` gets its own product through the library's `Matrix` juxtaposition and `DOT`, which forward to `mul`. It needs no api line, since walk dispatches the method on the receiver's run-time type; the override was measured under walk only. In two measurements under walk at `b176a4b79`, views through the library cost more. On lifting a function over the rows of a 64 × 16 matrix, the row slice `m[i,:]` took five times as long as a six-line user view (row 298). The library's product with a diagonal that is a plain `Matrix` view, without the override, took 13 times as long as a row-scaling operator at n = 16, and 58 to 63 times at n = 64 (row 299, which says 54). Detail: `reviews/c4-flatarrays-review.md` section 1 (the idiom); `run-c4/probes/vocabulary/diag-override.md`, "Result" (the override) and "Timings against row 299" (the ratios).

New, 988 characters:

> F-157 **An array is a trait with `get` and `put`, and a view is an object that implements it over other storage; this is the language's own idiom for a view of a runtime shape, as the library's own `TransposedMatrix` is.** Under walk, a subtype of `Matrix` that overrides `mul` gets its own product through the library's `Matrix` juxtaposition and `DOT`, which forward to `mul`. It needs no api line, since walk dispatches the method on the receiver's run-time type; the override was measured under walk only. Under walk the library's own views cost more than a user's: its row slice `m[i,:]` five times a six-line user view (row 298), and its product through a diagonal held as a plain `Matrix` view 13 times a row-scaling operator at n = 16, and 58 to 63 times at n = 64 (row 299, which says 54 at n = 64). Detail: `reviews/c4-flatarrays-review.md` section 1 (the idiom); `run-c4/probes/vocabulary/diag-override.md`, "Result" (the override) and "Timings against row 299" (the ratios).

| Claim | Where it stands now |
|---|---|
| 1. The view idiom, as `TransposedMatrix` | F-157, word for word |
| 2. A subtype of `Matrix` that overrides `mul` gets its own product under walk, with no api line | F-157, word for word |
| 3. The override was measured under walk only | F-157, word for word. The map calls it history and sends it out; it is the limit of claim 2, so it stays. |
| 4. At `b176a4b79`, `m[i,:]` took five times a six-line user view (row 298) | Row 298 holds the measurement, its commit and its sizes. F-157 keeps "its row slice `m[i,:]` five times a six-line user view (row 298)". |
| 5. The diagonal view's product took 13 times a row-scaling operator at n = 16, and 58 to 63 times at n = 64 (row 299, which says 54) | F-157 keeps it, each ratio with its size: "13 times a row-scaling operator at n = 16, and 58 to 63 times at n = 64 (row 299, which says 54 at n = 64)". The probe's "Timings against row 299" holds 13x, 63x and 58x, and that row 299 says 54x. Row 299's text is a proposal below. |
| 6. Detail | F-157, word for word |

## Case 4. An entry that today's checks found false or stale: F-63, with F-286, F-297 and F-64

An entry whose claims today's checks found false, stale or unsettled is reworded to what its support holds, and its claims are sorted to the entries that own their subjects.

### The curator's question

He asked of F-63: "what is uniting the things in it under one fact, other than they probably originated from the same batch?"

Nothing else united them. Its four statements (`String`'s `split` pair, `List`'s missing `zip`, `Condition.map`'s return type, `QQ`'s `comprises { ... }`) share only that rung L of climb batch 3 changed each line of the api on 2026-09-22. Each answers its own question, and they changed apart (`../f63-traced.md`, section 1.6). The entry recorded one rung's work, not one property.

After the sorting, its claims go to four places:

- The `split` pair is `String`'s, and F-286 already holds it among `String`'s 14 members written `abstract`. Its reason, that the component defines neither method, is false today, and goes to the history only.
- "No api-declared type extends `QQ`" bears only on row 354's refusal, so it goes to F-64, which owns that refusal.
- The history ("In their earlier forms ...", "The other repairs tried ...", "seen only under a checker change that did not land") goes to the history.
- Three statements stay in F-63: `List`'s `zip`, `Condition.map` and `QQ`'s clause. What joins them now is one subject, which the map names "the api's members against its components": each is a line where the one library's api states a member or a type as its component declares it, as the compiled export check asks. F-282 gives that rule for the whole api, and F-286 owns the subject for `String`'s members. The entry now also says what the three lines mean for the work: two other apis still depart in the same ways (rows 355 and 357).

The three statements still have little work value. They are notes on choices that a worker made, and rows 355 and 357 already hold their own repairs. The map keeps F-63 as an entry, so this round keeps it. Whether the three should leave FACTS (to the history and the report, with rows 355 and 357 left to stand alone) is a question for the curator, below.

### F-63

Old, 1,265 characters:

> F-63 **The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract; redeclares no `zip` in `List`, where the inherited `ZeroIndexed.zip` serves; has `Condition.map` return `Condition[\G\]`, the component's type; and closes `QQ` by `comprises { ... }`.** `Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:1008`. In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured). The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count; the forms kept follow the specification's export rules (the report's Decisions). The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check's comparison of return types, and no test gates that edit. `QQ`'s clause lists no type, since its one value type `Ratio` is private to the component, and an api may leave out a private type only by `...` (`Library/FortressLibrary.fsi:397`). No api-declared type extends `QQ`, so F-64's refusal, which falls on such a type, does not arise. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Summary", "Decisions" and "Defects and their homes".

New, 1,036 characters:

> F-63 **Three lines of the one library's api follow their components, as the compiled export check asks: `List` declares no `zip` of its own, the sequential generator `Condition`'s `map` returns `Condition[\G\]`, and `QQ` is closed by `comprises { ... }`.** `List` takes the `zip` that it inherits from `ZeroIndexed`, as its component does. `QQ`'s component lists its one value type, `Ratio`, which is private to the component, and an api may leave out a private type only by `...`. A worker chose each form (the report's "Decisions"). That the count and distance stages would refuse `Condition.map`'s earlier `SequentialGenerator[\G\]` is read from the export check's code (F-282), not measured. Two other apis still depart in the same ways: `Library/PureList.fsi` declares a `zip` that its component lacks (row 355), and `Library/IntMap.fsi`'s closed trait needs `...` for a private type, and the checker then refuses the extender that the api declares (row 357). Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Decisions".

Where each claim went (`claims-checker-2.md`):

| Claim | Where it stands now |
|---|---|
| 1. The api declares `String`'s `split` and `splitWithOffsets` once, abstract | F-286, "for `String`, the api writes `abstract` on each of the 14 members that the component's trait declares without a body". The two are among the 14: the history's old line of F-286 lists them, and `rung-abstract-declared/REPORT.md` section 1 names both among the 12 members declared bodyless. "Once" (not twice, as before rung L) goes to the history. |
| 2. `List` redeclares no `zip`; the inherited `ZeroIndexed.zip` serves | F-63: the title, and "`List` takes the `zip` that it inherits from `ZeroIndexed`, as its component does." |
| 3. `Condition.map` returns `Condition[\G\]`, the component's type | F-63: the title, "the sequential generator `Condition`'s `map` returns `Condition[\G\]`", under "follow their components". `Library/FortressLibrary.fsi:1008` goes to the history. |
| 4. `QQ` is closed by `comprises { ... }`, since its one value type `Ratio` is private, and an api may leave out a private type only by `...` | F-63, word for word but for the order. `:397` goes to the history. |
| 5. In their earlier forms the pair and `List`'s `zip` made the checker refuse the api; the other repairs tried read the same count | The history. The report's "Decisions" gives each count (103). |
| 6. The forms kept follow the specification's export rules (the report's Decisions) | F-63, "A worker chose each form (the report's "Decisions")", and the title's "as the compiled export check asks". The reason that the report gives for the abstract pair is false today (`stale-claims.md`, F-63); it leaves with claim 1. |
| 7. The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check, and no test gates that edit | "Seen only under a checker change that did not land": the history. "No test gates that edit", false today in part, is reworded to what its support holds: "That the count and distance stages would refuse `Condition.map`'s earlier `SequentialGenerator[\G\]` is read from the export check's code (F-282), not measured." Which rule refused it on 2026-09-22 stays open (to investigate). |
| 8. No api-declared type extends `QQ`, so F-64's refusal does not arise | F-64, "No api-declared type of the one library extends `QQ`, which its api closes by `comprises { ... }` (F-63), so the refusal does not fall on it". |
| New | Rows 355 (`PureList.fsi`'s `zip`) and 357 (`IntMap.fsi`'s clause), which the old text did not name. |

### F-286, the owner of "the api's members against its components"

Old, 1,146 characters:

> F-286 **The api's `String` writes `abstract` on every member that its component's trait leaves without a body, and every string object defines them.** `Library/FortressLibrary.fsi:2583-2658` writes 14 of `String`'s members `abstract`: `size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `asDebugStringIndented`, `get`, `uncheckedSubstring`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`, `opr ||(self, c:Char)` and `writeOn`. The component's trait (`Library/FortressLibrary.fss:4596-4732`) declares all 14, none with a body. `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14 under walk. `String`'s `excludes` clause is `{ Number, Char, AnyMultiplicativeRing }` on both sides; `AnyList` states its exclusion of `String` itself (`Library/List.fsi:55`). So `String` has no entry in the `FortressLibrary` export error (F-282). `CatString`'s `rangeContains` answers what its flat halves answer, so it carries row 607's miss. Gated by `ProjectFortress/tests/StringMembersPromisedWalk.fss` and by the distance stage's per-site list. Detail: `compile-ladder/rung-string-members/REPORT.md`, sections 1, 2 and 5.

New, 921 characters:

> F-286 **The `FortressLibrary` component declares every member that its api writes `abstract`; for `String`, the api writes `abstract` on each of the 14 members that the component's trait declares without a body, and every string object defines all 14.** F-297 gives the export check that asks for this. `FlatString`, `CatString`, `EmptyString` and `SubString` each define the 14 under walk; `CatString`'s `rangeContains` answers what its flat halves answer, so it carries row 607's miss of a later occurrence. `String`'s `excludes` clause is `{ Number, Char, AnyMultiplicativeRing }` on both sides, and `AnyList` states its exclusion of `String` itself (`Library/List.fsi`). Gated by `ProjectFortress/tests/StringMembersPromisedWalk.fss` and by the distance stage's per-site list. Detail: `compile-ladder/rung-string-members/REPORT.md`, sections 1, 2 and 5; `compile-ladder/rung-abstract-declared/REPORT.md`, section 1.

| Claim (`claims-checker-4.md`) | Where it stands now |
|---|---|
| 1. The api's `String` writes 14 members `abstract`, and the component's trait declares all 14 without a body | F-286, in its title. The 14 names and the two line ranges go to the history. The two reports list them in parts: `rung-string-members/REPORT.md` section 1, `rung-abstract-declared/REPORT.md` section 1. |
| 2. `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14 under walk | F-286, word for word |
| 3. `String`'s `excludes` on both sides; `AnyList` states its exclusion of `String` | F-286, word for word. `List.fsi:55`, a comment line today, is cited by the file. |
| 4. So `String` has no entry in the export error (F-282) | Cut, a copied gate value. F-282 holds it: "So among the members the export check reads, it finds no difference, and the distance holds no export error". |
| 5. `CatString`'s `rangeContains` carries row 607's miss | F-286, "so it carries row 607's miss of a later occurrence". Row 607 holds the miss and `CatString`'s case. |
| 6. Tests | F-286, word for word |
| 7. Detail | F-286, with `rung-abstract-declared/REPORT.md` section 1 added |
| In: F-297's claim 2 | F-286, "The `FortressLibrary` component declares every member that its api writes `abstract`" |
| In: F-63's claim 1 | See F-63 above. |

### F-297

Old, 1,680 characters:

> F-297 **The compiled export check asks the component to declare each member its api writes `abstract`, at the api's header, with a body or without one, and the `FortressLibrary` component declares them all.** `equalListMembers` counts every api member (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:831`) and matches an abstract one through `equalAbstractMember`, `equalFnHeaders(..., true)` (`:863-875`), the team's 2009 comparison; a component that leaves one out is refused 'missing members of the trait/object in the component', one at another header 'different method'. An abstract getter is also matched by a component field of its name and type that is neither `hidden` nor `private` (`:867-873`), since a trait's field declaration declares its abstract getter (`Specification/basic/traits.tex:722-723`); an api's field met by a component's getter stays refused (row 842). The 12 members the component's traits lacked (`String`'s `depth`, `isBalanced`, `verify`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`; `Range`'s `isEmpty`; `ReadableArray`'s `opr[_:TrivialOpenRange]`; `ActualReduction`'s `empty` and `join`; `AnyMaybe`'s `holds`) are declared bodyless; the compiler's prelude declares its 85. Walk compares no component with its apis (row 841). Gated by `compiler_tests/XXXExportAbstractMemberAbsent`, `XXXExportAbstractMemberOtherHeader`, `ExportAbstractMemberBodyless`, `ExportAbstractMemberDefined` and `ExportAbstractGetterField`, and by the distance stage's per-site list. Detail: `compile-ladder/rung-abstract-declared/REPORT.md`, sections 1, 3 and 5; `compile-ladder/rung-abstract-declared/JUDGE.md`, section 1.

New, 1,061 characters:

> F-297 **The compiled export check asks the component to declare each member that its api writes `abstract`, at the api's header, with a body or without one.** A component that leaves one out is refused 'missing members of the trait/object in the component', and one that declares it at another header 'different method'. An abstract getter is also matched by a component field of its name and type that is neither `hidden` nor `private`, since a trait's field declaration declares its abstract getter (`Specification/basic/traits.tex:722-723`); an api's field met by a component's getter stays refused (row 842). The `FortressLibrary` component declares them all (F-286). Walk compares no component with its apis (row 841). Gated by `compiler_tests/*ExportAbstract*` and by the distance stage's per-site list. Read in the code: `scala_src/typechecker/ExportChecker.scala`, `equalListMembers` and `equalAbstractMember`. Detail: `compile-ladder/rung-abstract-declared/REPORT.md`, sections 1, 3 and 5; `compile-ladder/rung-abstract-declared/JUDGE.md`, section 1.

| Claim (`claims-checker-4.md`) | Where it stands now |
|---|---|
| 1. The export check asks the component to declare each abstract api member, at its header | F-297, word for word |
| 2. The `FortressLibrary` component declares them all | F-286, its title's first clause. F-297 keeps "The `FortressLibrary` component declares them all (F-286)." |
| 3. `equalListMembers` and `equalAbstractMember`, the team's 2009 comparison, with two refusal messages | The two messages stay in F-297. The two functions stay as the evidence ("Read in the code"). Their lines and "the team's 2009 comparison" go to the report: section 1 and its header's "deviation" line. |
| 4. An abstract getter is also met by a component field | F-297, word for word |
| 5. An api's field met by a component's getter stays refused (row 842) | F-297, word for word. Row 842 holds the case and its test. |
| 6. The 12 members the traits lacked; the prelude declares its 85 | The report: the 12 in section 1, the 85 in section 3. |
| 7. Walk compares no component with its apis (row 841) | F-297, word for word. Row 841 holds the case. |
| 8. Five tests and the per-site list | F-297: the pattern `compiler_tests/*ExportAbstract*`, which matches all five, and the per-site list |
| 9. Detail | F-297, word for word |

### F-64, which takes F-63's claim on `QQ`

Old, 848 characters:

> F-64 **The compiled checker refuses every type that an api declares, trait or object, that extends a trait whose `comprises` clause has `...`, whether the clause lists it or not (row 354, open).** So the form `comprises { T, ... }` cannot stand in an api that declares `T`. The refusal runs only when the checker checks an api, so a component's types may extend such a trait. The specification's text allows `...` in an api's clause, and an extender that the clause lists (`Specification/basic/traits.tex`, "Trait Declarations"). Only a draft note refuses the api's own declaration of an extender, and a release build leaves draft notes out. The team's `compiler_tests/XXX3q` and `XXX10p` pin the refusal, so a fix that skips it for a listed type turns them red. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Defects and their homes".

New, 856 characters:

> F-64 **The compiled checker refuses every type that an api declares, trait or object, that extends a trait whose `comprises` clause has `...`, whether the clause lists it or not (row 354: the refusal's message, its site and the way around).** The refusal runs only when the checker checks an api, so a component's own types may extend such a trait. The specification allows a listed extender there (F-171), so this is a defect of the checker. The team's `compiler_tests/XXX3q` pins the refusal, with a second test that row 354 names, so a fix that skips it for a listed type turns both red. No api-declared type of the one library extends `QQ`, which its api closes by `comprises { ... }` (F-63), so the refusal does not fall on it; it falls on `IntMap`'s api (row 357). Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Defects and their homes".

| Claim (`claims-checker-2.md`) | Where it stands now |
|---|---|
| 1. The checker refuses every api-declared type that extends a trait whose `comprises` has `...`, listed or not (row 354) | F-64's title, with "(row 354: the refusal's message, its site and the way around)". Row 354 holds it. |
| 2. So `comprises { T, ... }` cannot stand in an api that declares `T` | Row 354's claim: "so the grammar's listed-plus-ellipsis form cannot be written in an api that declares the listed type". |
| 3. The refusal runs only when the checker checks an api, so a component's types may extend such a trait | F-64, word for word ("a component's own types"). Row 354's notes imply it ("a test of `isApi` and the ellipsis alone"; "Workaround: declare the extender in the component") but do not say it, so it stays until they do (proposal below). |
| 4. The specification allows `...` in an api and a listed extender; only a draft note refuses it, and a release build leaves draft notes out | F-171, "In an api, the clause may also hold `...` beside the extenders that it lists; only a draft note, a remark of the editors that a release build leaves out, refuses the api's own declaration of an extender". F-64 keeps "The specification allows a listed extender there (F-171), so this is a defect of the checker." |
| 5. `XXX3q` and `XXX10p` pin the refusal, so a fix for listed types turns them red | F-64 names `XXX3q` and keeps the consequence. Row 354's notes name both tests. |
| In: F-63's claim 8 | See F-63 above. |

### F-171, which takes F-64's reading of the specification

F-171 owns "the specification: comprises clauses". It takes F-64's claim 4 and a pointer to F-64. After the pilot's cold read, its title names the restart that it compares with (F-166 owns that text). Nothing else in it changes.

Old, 1,186 characters:

> F-171 **The specification reads a `comprises` clause as the restart's Types chapter does: every value of the trait is a value of a listed type.** So a trait or object that extends the closed trait must be below a listed type, with two exceptions. A trait with a `comprises` clause of its own may stay unlisted if each of its own listed types is below a listed type of the closed trait. A trait with static parameters may stay unlisted if at least one type extends it and every type that extends it is below a listed type. A listed type may be an instantiation at the trait's static parameters or `where`-clause variables. The text does not say whether a bare type variable may be listed; walk overflows its stack on one (row 407). The compiled checker departs in three ways: it checks only the closed trait's immediate subtypes (row 487), it reads the clause in the subtrait's own type-variable names (row 489), and it finds extenders by the simple text of a name (row 490). Whether the team's commented `comprises Integral[\I\] where [\I\]` is valid is open (F-121). Detail: `compile-ladder/rung-spec-comprises/decision-record.md` section 2; `Specification/basic/traits.tex:246-269`.

New, 1,604 characters:

> F-171 **The specification reads a `comprises` clause as the Types chapter of the team's unfinished restart does (`Documentation/Specification/`, F-166): every value of the trait is a value of a listed type.** So a trait or object that extends the closed trait must be below a listed type, with two exceptions. A trait with a `comprises` clause of its own may stay unlisted if each of its own listed types is below a listed type of the closed trait. A trait with static parameters may stay unlisted if at least one type extends it and every type that extends it is below a listed type. A listed type may be an instantiation at the trait's static parameters or `where`-clause variables. In an api, the clause may also hold `...` beside the extenders that it lists; only a draft note, a remark of the editors that a release build leaves out, refuses the api's own declaration of an extender (`Specification/basic/traits.tex`, "Trait Declarations"). The text does not say whether a bare type variable may be listed; walk overflows its stack on one (row 407). The compiled checker departs in three ways: it checks only the closed trait's immediate subtypes (row 487), it reads the clause in the subtrait's own type-variable names (row 489), and it finds extenders by the simple text of a name (row 490). It also refuses every extender that an api declares of a trait whose clause has `...` (F-64). Whether the team's commented `comprises Integral[\I\] where [\I\]` is valid is open (F-121). Detail: `compile-ladder/rung-spec-comprises/decision-record.md` section 2; `Specification/basic/traits.tex:246-269`.

## Case 5. An entry that is mostly history: F-240, with F-111 and F-43

An entry that is mostly a log of past measurements becomes one measurement bounded to its day, with the rules that last, and the log goes to the history.

### F-240

Old, 2,201 characters:

> F-240 **The checker's count stage takes about 65 s and its distance stage 117 s at the last landed gate, climb batch 36's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 75 s), over fourteen components, ran at a start load of 0.29, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 130 s (85 s) at 0.55 at climb batch 35b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-36/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

New, 915 characters:

> F-240 **At the last landed gate, climb batch 36's, the checker's count stage took about 66 s and its distance stage 117 s, and load can lengthen a stage more than twofold, so a time compares only with one taken under a like load.** A gate runs each stage once. The count table records no seconds, so its time is read from the file times of the gate's log. The distance stage, over fourteen components (`FortressLibrary` 75 s), started at a load of 0.29 and then ran beside the first minutes of `testFast`, so its time was taken under that suite's load. Climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. Source: the file times of the gate's log; `compile-ladder/climb-batch-36/gate/distance.txt` (`#seconds`, `#machine`). Detail: `reviews/batch-36-review.md`, section 6; `reviews/batch-16-review.md`, section 2.

| Claim (`claims-checker-3.md`) | Where it stands now |
|---|---|
| 1. At climb batch 36's gate the count stage took about 65 s and the distance stage 117 s | F-240, as the measurement of its day. "About 65 s" becomes "about 66 s", as `reviews/batch-36-review.md` section 6 gives it. 117 s and `FortressLibrary`'s 75 s are in `climb-batch-36/gate/distance.txt` (`#seconds`). |
| 2. At climb batch 15b's gate, 325 s and 1,075 s; the solver's memos made most of the difference | The history; `reviews/batch-16-review.md` section 2 |
| 3. The rise from about 90 s at climb batch 21b, by rung runs of 91 s, 99 s, 149 s and 151 s | The history; `reviews/batch-22-review.md` section 2 |
| 4. Checking every operator costs the count stage 15 to 25 % | `reviews/batch-21b-review.md` section 2, "So checking every operator costs about 15 to 25 % of the stage"; the history |
| 5. From climb batch 22 to 26, 150 s to 180 s; both halved at climb batch 27, cause not measured | The history; `reviews/batch-27-review.md` section 2, "Both stages about halved. No run measured why." |
| 6. The count table records no seconds, so times come from the log's file times; the distance stage ran under `testFast`'s load | F-240, word for word, with the start load 0.29 from `distance.txt`'s `#machine` |
| 7. Load can lengthen a stage more than twofold, so times compare only under a like load | F-240: the title, and the 217 s and 574 s sentence |
| 8. Source and twelve reviews | F-240 keeps the source and the two reviews that hold its kept claims. The other ten stay in the history's old line. |

"Each gate ran each stage once", the ground of claim 5's "no run measured why", stays as "A gate runs each stage once".

### F-111, the owner of "how the count and distance stages run"

F-240 moves no claim to F-111: its kept claims are on the stages' times, which F-111 does not state. F-111's own disposition is "rewritten in place", for a claim that is false today and citations that moved.

Old, 1,364 characters:

> F-111 **The checker-count and distance stages read only the compiler's phases, so an edit under `Specification/`, `Documentation/`, the test corpora, walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`), or `explorations/` outside the stages' own folders cannot move their counts.** The stages' own folders are `explorations/coordinator/tools/checker-count/` and `distance/`. Both stages run the compiled checker on the interpreter's library, not on the tests. The count stage calls `Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder`. The distance stage calls it with that list's first six phases, up to the type check. None of these phases is walk's own: walk's `OVERLOADREWRITE_FOR_INTERPRETER` is not among them, and walk's evaluator is not a phase. Compiler code that names walk's classes, such as `SimpleClassLoader`, was read and does not change what the checker reports. The library names walk's natives in strings: a glue class, which only walk resolves, or a helper of `nativeHelpers/`, which the stages read through the compiled path's rewrite at the parse as a call checked against the helper's Java signature (F-298, F-299). Evidence: read in the code, not measured: `checker-count/WorldFlip.java:25` and `:42`; `distance/DistanceMulti.java:40-43` and `distance/run.sh:127`; `compiler/phases/PhaseOrder.java:125-147`.

New, 1,228 characters:

> F-111 **The checker-count and distance stages run only the compiled checker's phases, so an edit under `Specification/`, `Documentation/`, the test corpora, walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`), or `explorations/` outside the stages' own folders cannot move their counts.** The stages' own folders are `explorations/coordinator/tools/checker-count/` and `distance/`. Both stages run the compiled checker on the interpreter's library, not on the tests, through the compiler's phases up to the type check. None of these phases is walk's own: walk's `OVERLOADREWRITE_FOR_INTERPRETER` is not among them, and walk's evaluator is not a phase. Compiler code that names walk's classes, such as `SimpleClassLoader`, was read and does not change what the checker reports. The library names walk's natives in strings: a glue class, which only walk resolves, or a helper of `nativeHelpers/`, which the stages read through the compiled path's rewrite at the parse as a call checked against the helper's Java signature (F-298, F-299). Evidence: read in the code, not measured: `checker-count/WorldFlip.java` and `run.sh`, `distance/DistanceMulti.java` and `run.sh`, `compiler/phases/PhaseOrder.java`.

| Claim (`claims-harness.md`) | Where it stands now |
|---|---|
| C1. The stages read only the compiler's phases, so edits under the named folders cannot move their counts | F-111, word for word |
| C2. Both run the checker on the interpreter's library, not on the tests | F-111, word for word |
| C3. The count stage runs `PhaseOrder.compilerPhaseOrder`; the distance stage its first six phases | False today for the count stage, which runs `WorldFlip -stop check` since 2026-10-24. Reworded to what the code holds: "through the compiler's phases up to the type check". The calls and the phase lists go to the history. |
| C4. None of these phases is walk's own; compiler code that names walk's classes does not change the report | F-111, word for word |
| C5. The library names walk's natives in strings (F-298, F-299) | F-111, word for word |
| C6. Read in the code, not measured; the lines | F-111 keeps the kind and the files. The lines go to the history (`WorldFlip.java:25` and `:42` had moved). |

### F-43, the scenario's entry

F-43 turned out false today. The map listed it as unsettled against F-80 (section 8): F-43 said the memo keeps a verdict per pair across traits and hides errors, and F-80 said it is keyed on all the inputs of the check. F-80 is right. Rung O of climb batch 8 rekeyed the memo on everything that its check reads (`compile-ladder/rung-overloading-checker/REPORT.md` section 7, commit `70d5486f99`, 2026-10-02), and row 562, "the compiled overloading checker's memo answered 'valid' for a pair of declarations in every trait context", is FIXED. After the fix the count stage gave the same output with the memo on and off (89 errors both ways). The tree's key holds the four inputs (`scala_src/typechecker/OverloadingChecker.scala:580-600`). F-43's text came from `perf-probes/nat/triage.md`, of climb batch 3's time. The clarity pass of 2026-10-22 rewrote the entry from that file after the fix.

Old, 705 characters:

> F-43 **The overloading checker's memo hides some errors, and which ones changes from one build of the checker to another, so the gate's checker count and distance run with the memo off.** The memo keeps a "valid" verdict per pair of declarations. A pair that several traits inherit is checked once per trait, at that trait's instantiation, in hash-set order, so a pair valid for one trait is taken as valid for the next (`perf-probes/nat/triage.md` section 1). The memo is on by default (`OverloadingChecker.scala:79`), so an ordinary `fortress compile` can miss these errors. The JVM property `-Dfortress.analyzer.overload.cache=false` turns it off; the gate's checker count and distance stages set it.

New, 841 characters:

> F-43 **The overloading checker's memo is keyed on everything that its check reads, so a pair of declarations valid in one context is not taken as valid in another; the gate's checker count and distance run with the memo off all the same.** The key holds the two declarations' types as instantiated where the pair is checked, with their `self` positions, the set of the other declarations there, whether they are dotted methods, and the static parameters in scope (row 562, the fix). The memo is on by default (`scala_src/typechecker/OverloadingChecker.scala:79`); the JVM property `-Dfortress.analyzer.overload.cache=false` turns it off, and the gate's two stages set it. After the fix the count stage gave the same errors with the memo on and off, in one measurement. Detail: `compile-ladder/rung-overloading-checker/REPORT.md` section 7.

| Claim (`claims-checker-1.md`) | Where it stands now |
|---|---|
| 1. The memo hides some errors, which ones changing from build to build | False since row 562's fix. The history; `perf-probes/nat/triage.md` section 1 (before the fix); `rung-overloading-checker/REPORT.md` section 7 (the fix). F-43 now says what holds: the memo is keyed on everything that its check reads. |
| 2. It keeps a "valid" verdict per pair, so a pair valid for one inheriting trait is taken as valid for the next | False since the fix; the same homes as claim 1. |
| 3. The memo is on by default, so a plain `fortress compile` can miss these errors | "On by default" stays. "Can miss these errors" is false since the fix and goes to the history. |
| 4. `-Dfortress.analyzer.overload.cache=false` turns it off, and the gate's two stages set it | F-43, word for word. The map cuts it as a copied gate value, but no other entry holds it. |

## Case 6. A sound entry with one subject: F-179

An entry that today's checks found sound, with one subject, stays nearly as it is.

Old, 282 characters:

> F-179 **Tasks and transactions are implemented twice, in `interpreter/evaluator/` and in `runtimeSystem/`, independently.** A fix in one copy does not reach the other: row 302's fix is in the compiled copy only. Detail: `coordinator/map/modules-and-phases.md`, "B.11 The runtime".

New, 413 characters:

> F-179 **Tasks and transactions are implemented twice, independently: for walk in `interpreter/evaluator/tasks/` and `transactions/`, and for the compiled path in `runtimeSystem/`.** A fix in one copy does not reach the other: row 302's fix, of an eager debug message in `inATransaction`, is in the compiled copy only. Evidence: a reading of the code, `coordinator/map/modules-and-phases.md`, "B.11 The runtime".

No claim leaves, and no claim is cut. Three things are added, each because the definition of an entry asks for it:

- Which copy is walk's and which is the compiled path's, with walk's two folders as the cited map section names them. A reader new to the project cannot tell that `interpreter/` is walk's (question 6), and scenario 3 asks for "the same for walk".
- What row 302 holds, in a few words: an eager debug message in `inATransaction`. A pointer that stays carries a few words on what it holds.
- The kind of its evidence: a reading of the code, which the map section gives.

## Case 7. One whole subject: "the harness: XXX tests and refusals at load"

A subject that several entries share is sorted so that each claim stands once, under the entry that owns its question.

### The subject after the sorting

The subject stands as four entries, with one claim of F-108 joined to F-102. Two entries outside it take a claim or keep one: F-98 takes F-104's three streams, and F-108 keeps its own subject, the order of the ambiguity message.

- F-102, the owner: the interpreter corpus's `XXX` rule. A `.test` file only names a refusal at load, by the `load_` keys of F-383, in place of the pointer to F-29. It takes F-108's claim that, without a `.test` file, the harness reads only that the program fails, and that no gate stage compares its message.
- F-103: the compiled corpora's `XXX` rule. It takes F-383's claim 3, that a compiled refusal test is `XXX`-named, joined to its own rule for a failure at compile time.
- F-104: a thrown `CompilerError`'s path through the harness. Its three streams go to F-98.
- F-383: walk's harness counts a phase's static error as a refusal at load.

> F-102 **An `XXX*.fss` in the interpreter corpus is a gated expected-failure test.** `SystemJUTest` marks a file of `ProjectFortress/tests/` whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Without a `.test` file the harness reads only that the program fails, not its message, and no gate stage compares that message. The test needs a `.test` file only to name a refusal at load by its `load_` keys, as any program of `tests/` does (F-383, what counts as a refusal at load). An `XXX` test that imports an api with its component, as `XXXImportImportCollision.fss` does, takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora's rule differs (F-103). Read in the code: `tests/unit_tests/FileTests.java`.

> F-103 **The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express, in one `.test` file, a program that compiles and then fails at run time.** The `XXX` prefix of a `.test` file's name makes every command that the file drives a must-fail. So such a defect needs two `.test` files over one component: a plain-named file that drives `link`, and an `XXX` file that drives `run`. A failure at compile time, a refusal among them, needs one `XXX` compile test, since a plain-named compile test is red whenever the compile reports errors. An `XXX` compile test with a `compile_err_contains` key whose program compiles is red: "Saw wrong failure". Read in the code and measured. Detail: `compile-ladder/rung-tryatomic/REPORT.md`, "The measured defect, and its home"; `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions" (the refusal).

> F-104 **A thrown `CompilerError` takes the third of a command's streams through the test harness, the exception stream, keyed on the component that `tests=` names, with check keys `compile_exception_*`.** `Shell` does not catch a `CompilerError` from the code generator, such as a code-generator wall (a `sayWhat` call), so the harness reads it as an exception of the component that the `.test` file's `tests=` line names (F-98 gives the three streams). If that component's name holds `XXX`, a link or compile exception is green whatever the `.test` file is called; only an unmet key of that command makes it red. A `compile_exception_contains` key pins the wall's text, so the test turns red when the wall goes away or changes. Evidence: a reading of the code, `explorations/compile-ladder/climb-batch-2/REPAIR-review.md` section 2.

> F-383 **Walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load, so a walk `.test` whose `load_` keys expect a refusal at load passes on such an error that its keys match.** Read in the code: `tests/unit_tests/FileTests.java`, `InterpreterTest.thrownAtLoad`. Test: `tests/TypecaseUndefinedArmWalk.test`. Detail: `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".

Beside it:

> F-98 **The harness checks each command's output, error output and thrown exception by the keys of its `.test` file, and a `_WIcontains` key such as `run_out_WIcontains` is whitespace-insensitive containment.** It collapses runs of whitespace in both the stream and the expected string, where `_WImatches` collapses them in the stream only. A key that `generalTestFailed` does not know sets no check, so a misspelt key checks nothing. A `run_out` with no check falls to the default: the output contains `pass` or `PASS`. Read in the code: `tests/unit_tests/FileTests.java`, `generalTestFailed`.

> F-108 **Under walk, the overload-ambiguity message names its two declarations in an order that is not a property of the program (row 430).** As `bin/fortress` and the suites run walk, the order varies from run to run. With three JVM flags set, `-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`, the order is fixed for a given library, and a library edit can flip it. The three were always set together, so which of them fixes the order is not known. No test reads the order (F-102: an `XXX` program without a `.test` file passes on any failure). Evidence: observed: `compile-ladder/rung-wrap-operators/JUDGE.md` sections 3 to 5.

Together the six entries hold 4,200 characters, against 4,242 before. The subject's duplication is with the `fortress-repo` skill's `tests-writing.md`, not inside FACTS, and the brief does not let a skill's sentence take a fact's place. So the subject gains its order, not its size. Each entry also now states the kind of its evidence.

### F-102

Old, 783 characters:

> F-102 **An `XXX*.fss` in the interpreter corpus is a gated expected-failure test.** `SystemJUTest` marks a file of `ProjectFortress/tests/` whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Such a test needs a `.test` file only to name a refusal at load, as any program of `tests/` does (F-29: walk's load check and its `load_exception_contains` key). An `XXX` test that imports an api with its component, as `XXXImportImportCollision.fss` does, takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora's rule differs (F-103). Source: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:784-786` and `:395-413`; the `fortress-repo` skill's `tests-writing.md`, "How `XXX` works".

New, 789 characters:

> F-102 **An `XXX*.fss` in the interpreter corpus is a gated expected-failure test.** `SystemJUTest` marks a file of `ProjectFortress/tests/` whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Without a `.test` file the harness reads only that the program fails, not its message, and no gate stage compares that message. The test needs a `.test` file only to name a refusal at load by its `load_` keys, as any program of `tests/` does (F-383, what counts as a refusal at load). An `XXX` test that imports an api with its component, as `XXXImportImportCollision.fss` does, takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora's rule differs (F-103). Read in the code: `tests/unit_tests/FileTests.java`.

| Claim (`claims-harness.md`) | Where it stands now |
|---|---|
| C1. `SystemJUTest` marks an `XXX` file of `tests/` as one that must fail | F-102, word for word |
| C2. Such a test needs a `.test` file only to name a refusal at load (F-29: the load check and its `load_exception_contains` key) | F-102, with the pointer to F-29 replaced by F-383, "(F-383, what counts as a refusal at load)". F-29 is the load check of closed traits and names no key (`stale-claims.md`, F-102). |
| C3. An `XXX` test that imports an api with its component takes them from `test_library/` | F-102, word for word |
| C4. The compiled corpora's rule differs (F-103) | F-102, word for word |
| C5. The source lines; the skill's section | The lines go to the history. The skill's section is no longer cited: a fact never cites a skill. |
| In: F-108's C4 | F-102, "Without a `.test` file the harness reads only that the program fails, not its message, and no gate stage compares that message." |

### F-103

Old, 749 characters:

> F-103 **The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express, in one `.test` file, a program that compiles and then fails at run time.** The `XXX` prefix of a `.test` file's name makes every command that the file drives a must-fail. So such a defect needs two `.test` files over one component: a plain-named file that drives `link`, and an `XXX` file that drives `run` (the `fortress-repo` skill's `tests-writing.md`, "Writing an `XXX` test"). A compile-stage failure needs one `XXX` compile test. An `XXX` compile test with a `compile_err_contains` key whose program compiles is red: "Saw wrong failure". Detail: `explorations/compile-ladder/rung-tryatomic/REPORT.md`, "The measured defect, and its home".

New, 880 characters:

> F-103 **The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express, in one `.test` file, a program that compiles and then fails at run time.** The `XXX` prefix of a `.test` file's name makes every command that the file drives a must-fail. So such a defect needs two `.test` files over one component: a plain-named file that drives `link`, and an `XXX` file that drives `run`. A failure at compile time, a refusal among them, needs one `XXX` compile test, since a plain-named compile test is red whenever the compile reports errors. An `XXX` compile test with a `compile_err_contains` key whose program compiles is red: "Saw wrong failure". Read in the code and measured. Detail: `compile-ladder/rung-tryatomic/REPORT.md`, "The measured defect, and its home"; `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions" (the refusal).

| Claim | Where it stands now |
|---|---|
| C1 to C3. One `.test` file cannot express a program that compiles and then fails; two files over one component | F-103, word for word, without the skill's section |
| C4. A compile-stage failure needs one `XXX` compile test | F-103, joined to F-383's C3: "A failure at compile time, a refusal among them, needs one `XXX` compile test, since a plain-named compile test is red whenever the compile reports errors." |
| C5. An `XXX` compile test whose program compiles is red, "Saw wrong failure" | F-103, word for word |
| Evidence | Now stated: read in the code and measured, with F-383's report added for the refusal |

### F-104

Old, 913 characters:

> F-104 **A thrown `CompilerError` takes a third path through the test harness, the exception stream, keyed on the component that `tests=` names, with check keys `compile_exception_*`.** The harness checks three streams of a command: its output, its error output and a thrown exception. `Shell` does not catch a `CompilerError` from the code generator, such as a code-generator wall (a `sayWhat` call; the `fortress-repo` skill's `references/compiler.md`). So the harness reads it as an exception of the component that the `.test` file's `tests=` line names. If that component's name holds `XXX`, a link or compile exception is green whatever the `.test` file is called; only an unmet key of that command makes it red. A `compile_exception_contains` key pins the wall's text, so the test turns red when the wall goes away or changes. Detail: `explorations/compile-ladder/climb-batch-2/REPAIR-review.md` section 2.

New, 835 characters:

> F-104 **A thrown `CompilerError` takes the third of a command's streams through the test harness, the exception stream, keyed on the component that `tests=` names, with check keys `compile_exception_*`.** `Shell` does not catch a `CompilerError` from the code generator, such as a code-generator wall (a `sayWhat` call), so the harness reads it as an exception of the component that the `.test` file's `tests=` line names (F-98 gives the three streams). If that component's name holds `XXX`, a link or compile exception is green whatever the `.test` file is called; only an unmet key of that command makes it red. A `compile_exception_contains` key pins the wall's text, so the test turns red when the wall goes away or changes. Evidence: a reading of the code, `explorations/compile-ladder/climb-batch-2/REPAIR-review.md` section 2.

| Claim | Where it stands now |
|---|---|
| C1. The harness checks three streams of a command: output, error output and a thrown exception | F-98's title. F-104 keeps "the third of a command's streams" and "(F-98 gives the three streams)". |
| C2. `Shell` does not catch a `CompilerError` from the code generator, such as a wall | F-104, word for word. The map sends it to F-34; see "Where the map could not be followed". |
| C3 to C5. The exception stream keyed on `tests=`; an `XXX` component; `compile_exception_contains` | F-104, word for word, without the skill's section |

### F-383

Old, 587 characters:

> F-383 **Walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load, so a walk `.test` whose `load_` keys expect a refusal at load passes on such an error that its keys match.** `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`, `InterpreterTest.thrownAtLoad`. Test: `tests/TypecaseUndefinedArmWalk.test`. A compiled refusal test is still `XXX`-named: a plain-named compile test is red whenever the compile reports errors. Detail: `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".

New, 451 characters:

> F-383 **Walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load, so a walk `.test` whose `load_` keys expect a refusal at load passes on such an error that its keys match.** Read in the code: `tests/unit_tests/FileTests.java`, `InterpreterTest.thrownAtLoad`. Test: `tests/TypecaseUndefinedArmWalk.test`. Detail: `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".

| Claim | Where it stands now |
|---|---|
| C1. A phase's static error before the run counts as a refusal at load | F-383, word for word |
| C2. Source and test | F-383, with the kind, "Read in the code" |
| C3. A compiled refusal test is still `XXX`-named: a plain-named compile test is red whenever the compile reports errors | F-103 (above) |

### F-108

Old, 712 characters:

> F-108 **The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program.** Without the flags below, as `bin/fortress` and the suites run walk, the order varies from run to run. With three JVM flags set, `-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`, the order is fixed for a given library, and a library edit can flip it. The three were always set together, so which of them fixes the order is not known. The harness reads only that the `XXX` test fails, not the order. Row 430 records this order, and no gate stage compares the message (P-103). Evidence: observed: `compile-ladder/rung-wrap-operators/JUDGE.md` sections 3 to 5.

New, 650 characters:

> F-108 **Under walk, the overload-ambiguity message names its two declarations in an order that is not a property of the program (row 430).** As `bin/fortress` and the suites run walk, the order varies from run to run. With three JVM flags set, `-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`, the order is fixed for a given library, and a library edit can flip it. The three were always set together, so which of them fixes the order is not known. No test reads the order (F-102: an `XXX` program without a `.test` file passes on any failure). Evidence: observed: `compile-ladder/rung-wrap-operators/JUDGE.md` sections 3 to 5.

| Claim | Where it stands now |
|---|---|
| C1. The order varies from run to run as `bin/fortress` and the suites run walk (row 430) | F-108: the title with "(row 430)", and "As `bin/fortress` and the suites run walk, the order varies from run to run." Row 430 holds the runs (11 of 16) and the cause. |
| C2, C3. Three flags fix the order for a given library; which one is not known | F-108, word for word. Row 430 points to F-108 for them. |
| C4. The harness reads only that the `XXX` test fails, and no gate stage compares the message (P-103) | F-102 (above), without the pointer to P-103, the decision that the sentence builds. F-108 keeps "No test reads the order (F-102: an `XXX` program without a `.test` file passes on any failure)." |

### F-98, which takes F-104's three streams

Old, 498 characters:

> F-98 **The harness's `run_out_WIcontains` key is whitespace-insensitive containment.** It collapses runs of whitespace in both the output and the expected string, where `_WImatches` collapses them in the output only. A key that `generalTestFailed` does not know sets no check, so a misspelt key checks nothing. A `run_out` with no check falls to the default: the output contains `pass` or `PASS`. Source: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:156-189`, `:277-283`.

New, 595 characters:

> F-98 **The harness checks each command's output, error output and thrown exception by the keys of its `.test` file, and a `_WIcontains` key such as `run_out_WIcontains` is whitespace-insensitive containment.** It collapses runs of whitespace in both the stream and the expected string, where `_WImatches` collapses them in the stream only. A key that `generalTestFailed` does not know sets no check, so a misspelt key checks nothing. A `run_out` with no check falls to the default: the output contains `pass` or `PASS`. Read in the code: `tests/unit_tests/FileTests.java`, `generalTestFailed`.

| Claim | Where it stands now |
|---|---|
| C1, C2. `_WIcontains` collapses whitespace in both strings, `_WImatches` in the output only | F-98, for every stream, as `generalTestFailed` reads the key for each (`pfx + which + "_WIcontains"`) |
| C3. A key that `generalTestFailed` does not know sets no check | F-98, word for word. No ledger row holds it (proposal below). |
| C4. A `run_out` with no check needs `pass` or `PASS` | F-98, word for word |
| C5. The source lines | The history; F-98 keeps the file and the function |
| In: F-104's C1 | F-98's title |

## New entries

None. No subject of these cases lacked an owner.

## Entries over 600 characters, and the question that keeps each

| Entry | Characters | Why |
|---|---|---|
| F-374 | 1,236 | Question 1. A rung on row 641 or on `var` fields acts on each sentence: the cell's status (the planner's default), the capture, the shared variable code. |
| F-351 | 2,186 | Question 1. Question 6 for the global lock, the snapshot and the mark. Each sentence is a rule of the compiled transaction that a worker on `atomic` code follows. Its two sentences on the atomic expression came from F-374. |
| F-279 | 866 | Question 1. The defect's site, `:3083`, stays until row 808 gives today's line. Question 6: what a shifted `Array2` is, and which shifts fail. |
| F-157 | 988 | Question 1 for the idiom and the override, question 2 for "measured under walk only" and for each ratio's size. |
| F-63 | 1,036 | Question 2. Without each form's reason, "follow their components" reads as false for `QQ`. Question 1 for the evidence's kind and rows 355 and 357. |
| F-286 | 921 | Question 1. A worker who adds a string object must define the 14 members, and meets row 607's miss. |
| F-297 | 1,061 | Question 1. The two refusal messages, the getter rule, and rows 841 and 842 are what a worker on the export check meets. |
| F-64 | 856 | Question 1. A fix that skips the refusal turns the team's tests red, a component may declare the extender, and the refusal falls on `IntMap`, not on `QQ`. |
| F-171 | 1,604 | It owns the specification's reading of `comprises`, and took F-64's sentence on `...` (question 5, the other way). The rest is unchanged. |
| F-240 | 915 | The rule for a count that each landing changes: one entry holds the current value. Question 1 for the load. |
| F-111 | 1,228 | Question 1. Which edits cannot move the counts, and the natives, which can. |
| F-43 | 841 | Question 1. A reader of the older notes, which say that the memo hides errors, needs the key and the measurement after the fix. |
| F-102 | 789 | Question 1, with F-108's claim joined. |
| F-103 | 880 | Question 1, with F-383's claim joined. |
| F-104 | 835 | Question 1. |
| F-108 | 650 | Question 1. Row 430 points to it for the three flags. |

## The gap ledger

### Rows whose text must change

- **Row 808**, its notes. Its lines are old: `:2828` is today's `:3083`. Proposed: in the notes, "(`Library/FortressLibrary.fss:2828`)" becomes "(`Library/FortressLibrary.fss:3083` at `92f2e628d4`)", "(`:2515`)" becomes "(`:2761-2765`)", "(`:2727-2734`)" becomes "(`:2982-2990`)", and "(`:2448-2453`)" becomes "(`:2696-2701`)". After that, F-279 can drop `:3083`.
- **Row 299**, its claim. "13-54×" becomes "13-63×". The probe measured 63x at n = 64 (`v07`) and 58x (`Time2` against `Time1`), and its section "Timings against row 299" says that the row's 54x is wrong. Proposed, in the claim: "same numbers at 13-63× the cost of a row-scaling `opr juxtaposition(Diag, Matrix)`: 94 against 7 ms at n = 16, 1379-1499 against 22-26 ms at n = 64 (63× in `v07`, 58× in `Time2` against `Time1`) (a 27-column right factor)". After that, F-157 can drop "whose 54 the probe's timings correct".

- **Row 354**, its notes (the pilot's check). After "is a test of `isApi` and the ellipsis alone", add "so a component's own types may extend such a trait". After that, F-64 can drop its sentence "The refusal runs only when the checker checks an api, so a component's own types may extend such a trait."

### Defects with no row

- **F-98's misspelt key.** No row holds it (`ledger-find:misspelt` finds only row 882, on another subject). Proposed row, for the section that holds the harness's rows: `| ? | the test harness ignores a `.test` key that `generalTestFailed` does not know, so a misspelt check key, such as `run_out_contians`, checks nothing and the test passes on the default check alone | NEGATIVE-BOUNDED | implementation gap (tests) | silent | none | FACTS F-98's reading | Read in the code, not run: `generalTestFailed` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:142-283` at 92f2e628d4) reads only the keys that it names, and nothing lists a `.test` file's other keys. To confirm: a `.test` with `run_out_contians=PASS` over a program that prints nothing, through `junit.sh`, should pass. |`. The status is `NEGATIVE-BOUNDED` only once that run shows it. Until then the claim stays in F-98.
- F-43's two defects had "no row named" in the map. They have one, row 562, and it is FIXED (case 5).

## Test names that no cited report holds

- `compiler_tests/ExportAbstractGetterField` (F-297). F-297's pattern `*ExportAbstract*` still matches it. Its report, `rung-abstract-declared/REPORT.md`, does not name it, but the rung's `SKEPTIC.md` does.

Every other test name that left an entry is named in the report that the entry cites, or in the row that it names.

## Claims to investigate

- **F-63, `Condition.map`.** It is still open which rule refused `SequentialGenerator[\G\]` on 2026-09-22: the override rule (`rung-library-defects/record.md:19`, `Specification/basic/traits.tex:525-531`) or the export check's comparison of return types (the report's "Decisions"). Row 834 bears on it. It is CONTESTED, and says that the text accepts a component's narrower return type, so the specification may allow the earlier form. The entry now claims only what is read today. To settle it: on a copy of the library whose api's `Condition.map` returns `SequentialGenerator[\G\]`, run the count stage.
- **F-240, "beside the first minutes of `testFast`"** at climb batch 36's gate. The gate's log is not in the tree, and `reviews/batch-36-review.md` gives the times but not what ran beside them. The start load 0.29 is in `distance.txt`. The claim is kept as the entry had it.
- **F-111, "cannot move their counts".** It is read in the code and not measured (the harness pilot's "What I could not check"). The entry says so.
- **F-98, the misspelt key.** Not run (above).

## Where the map could not be followed, and what I did

- **F-351, claim 6** (the exception-table order). The map sends it to F-373, "label and exit". I kept it in F-351. F-351's rule for a nested abort rests on it (question 2), and the claim came from the transaction's rung, whose report holds it under "The order in which a nested abort finds its handler". F-373 is unchanged.
- **F-104, claim 2** (`Shell` does not catch a `CompilerError`). The map sends it to F-34, "what the code generator refuses against the one library". I kept it in F-104, whose path through the harness starts from it (question 2). F-34 is about the declarations of the fourteen components, not about how a wall reaches the harness. So F-34 takes no claim from these cases, and I did not rewrite it. F-325, which takes F-34's claim 4 by F-34's own disposition, is also unchanged.
- **F-43.** The map rewrites it in place, cuts claim 4 as a copied gate value, and sends claims 1 and 3 to a new row. Claims 1 to 3 are false since row 562's fix, so I reworded them to what the support holds. Claim 4 is not held by any other entry, so I kept it. No new row is needed.
- **F-240, claim 1.** The disposition sends it out as detail. The case's own text keeps it as "a measurement bounded to its day", and I followed the case's text.
- **F-374, claim 4.** The map sends it to the history. Only "(row 319, fixed)" is history. The tracking is a present property, which scenario 3's key reads and `AtomicFieldCompiled` gates, so it stays.
- **F-374, claim 11** (`Lazy`). The map sends it to the report, which does not name `Lazy`. Row 112's notes hold it word for word, so it went there.
- **F-157, claim 3.** The map calls it history. It is the limit of claim 2, so it stays.
- **F-279, claim 2** (the lines). The report gives older lines (`:2816`), so `:3083` stays until row 808 gives it (proposal above).
- **F-297, claim 3.** The map sends it out as detail. The two refusal messages stay (question 1), and the rest goes to the report.
- **F-171 and F-286** take claims from these cases; nothing else in them changed. F-282's claims 5 to 7, which the map also sends to F-286, belong to the chunk "export" and were not moved.
- No claim of these cases goes to an entry of the chunk "inference".

## For the coordinator

- **Scenario 4 of the record test** (`process-engineering/record-test/2026-11-24/key.md`) rests on F-43's old text, which is false since 2026-10-02. Its right answer, "The worker's clean compile ran with the memo on, so it is no evidence", no longer holds by the memo alone. The key needs its F-43 row redone before the test is run on the pilot.
- **F-80's sentence on the memo** ("keyed on all the inputs of the check ...") now says what F-43 owns. The writer of the chunk "overloading" should make it a pointer to F-43.

## Questions for the curator

- **F-63.** Its three remaining statements are worker's choices on three api lines, and rows 355 and 357 hold their own repairs. Should F-63 stay as an entry, as the map keeps it? The alternative is to let it leave FACTS: its lines would go to the history and its reasons to the report's "Decisions". Then F-64 would point to the api's `QQ` line instead of to F-63.

## After the checks

Two checks read round 1 (`checks-coldread.md`, a cold reader; `checks-check.md`, a checker against the sources). Each failure was fixed by the smallest change that removes it, with no condition cut. The new texts above are the corrected ones.

| Failure | Check | What I did |
|---|---|---|
| F-351: "the global lock has moved", "get the lock at its snapshot" and "with a mark" are not defined | cold read | Said what each is, from the report's items 2, 3 and 5 and `runtimeSystem/Transaction.java:127-165`: the global lock is a counter that each commit raises; a transaction's snapshot is a value of it, set when it starts and at each validation; the mark is `EMPTY`, which validation reads as no value. |
| F-279: "a shifted `Array2`" and "its shifts" are not defined | cold read | The title says "an `Array2` that `shift` moved to a new base". The body says that it is a `SubArray2` view, and names the shifts that fail as row 808 does: of a slice, a column, a row or a shifted `Array2`, with Java's `ArrayIndexOutOfBoundsException`. |
| F-157: "whose 54" is unclear | cold read | Folded into the next fix: "(row 299, which says 54 at n = 64)". |
| F-157: "13 to 63 times" drops the sizes that the ratios were measured at | checker | Each ratio has its size again: 13 times at n = 16, and 58 to 63 times at n = 64. |
| F-171: "the restart" is not defined, and "draft note" is not glossed | cold read | The title names the team's unfinished restart, `Documentation/Specification/`, with F-166, which owns it. "A draft note" is glossed as "a remark of the editors that a release build leaves out". |
| F-64: "a component's types may extend such a trait" was sent to row 354, which holds it only by implication | checker | The sentence stays in F-64, word for word but for "own", as the brief asks while the row does not hold a claim. Row 354's note is a proposal above. |
| F-102: "no gate stage compares what a test prints with an earlier run" is wider than the old "no gate stage compares the message", and has lost P-103 | checker | Scope only, as the coordinator directed: "and no gate stage compares that message", which is no wider than F-108's old sentence. The pointer to P-103 stays out, since a fact does not point back at the decision that it builds. |

Three notes on passing entries were also fixed, each by a few words: F-63's "refuses beside" ("and the checker then refuses the extender that the api declares"), and the label of F-179's and F-104's evidence ("Evidence: a reading of the code, ..." in place of "Read in the code:", since each cites a note that reads the code). F-374's two vague phrases ("the batch's planner", "the transaction's variable code") are left as they were. The cold reader could still read the entry, scenario 3's key quotes both phrases, and a rewording could narrow what the variable code covers.

The 19 entries now hold 18,351 characters, against 20,472 before.
