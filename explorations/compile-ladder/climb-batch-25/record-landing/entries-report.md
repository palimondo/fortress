<!-- The entries writer's report for climb batch 25's record landing: what it did with each change of owed.md whose writer is `entries`, with the old and new text, the meaning, the sizes and the questions for the curator. -->

# The entries writer's report, climb batch 25's landing

The landing commit is `11d2d8764`. All the new lines are in `record.apply`, and `clean.txt` holds them without provenance. No change has a gap-ledger row as its home, so there is no `rows.rewrite`. `cut-only.txt` is empty: the one POSITIONS change, P-38, adds words.

Sizes are in characters, before and after. The old line of each entry is its line at AT, which `entries.md` gives under "Now". This report quotes the sentences that changed.

## C1, F-24 (1168 to 950)

- Old: "... so `DIV` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raises `DivisionByZero` (F-299, F-306, F-308). Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes; `DIV`, `REM` and `MOD` by zero on the five integer types raise `DivisionByZero` through their helpers (F-312). Gated by ... `tests/NN64DivisionByZeroWalk.fss`, and `tests/ZZ32RemainderByZeroWalk.fss` with its four siblings."
- New: "... so `DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raise `DivisionByZero` (F-299, F-306, F-308, F-312). Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes. Gated by ... and for a helper by `tests/NativeHelperRaiseWalk.fss` and, for each of the five types, `tests/<type>DivisionByZeroWalk.fss` and `tests/<type>RemainderByZeroWalk.fss`."
- Meaning: unchanged. The repeated claim is folded into the sentence before it. The ten test files exist under these names (checked with a file search).
- Over 600: each sentence that stays answers question 1 (the mechanism, the scope and the gates).

## C2, F-32 (2006 to 1955)

- Old: "Of the 449, 24 are `IntLiteral`'s five conversions `asZZ32` to `asZZ` and 19 of its operators (`FortressBuiltin.fss:489-554`), 4 among the 154 and 20 among the 158; ..."
- New: "Of the 449, 29 are object `IntLiteral`'s (`FortressBuiltin.fss:486-563`), 4 among the 154 and 25 among the 158; ..."
- Meaning: a count corrected to the tree, by the review's finding 5. I counted the `builtinPrimitive` lines of object `IntLiteral` at the landing: 29, all on glue classes. The list of kinds was false with the count (19 operators), so I cut it.
- Over 600: no sentence was added. The other sentences answer question 1 (what blocks the move of each class) and question 2 (the classes A to D are defined by the matching sentence).

## C3, F-34 (1478 to 1468)

- Old title: "Under the switch-over's setting the code generator refuses 47 declarations of the library's fourteen components, in 11 kinds, ..."
- New title: "Under the switch-over's setting the code generator refuses 47 declarations of the fourteen components that the distance stage checks, in 11 kinds, ..."
- Old: "Measured after climb batch 25's rung C with climb batch 25's planner's control (...), against 50 in 14 kinds on its base in the same session; rung C's three kinds, ... no longer occur (F-315). On climb batch 22's code (`2bff2fe23`), with the checker's failures caught per declaration and the bound `Any`, the distance stage's setting, it was 52 of twelve components."
- New: "The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. Measured once, on climb batch 25's base (`97a416b18`) with the code generator as landed, by `compile-ladder/plan-25/probes/codegen.sh` with the 173 helper strings put back on their glue classes; the base's code generator gave 50 in 14 kinds in the same session. The three kinds that F-315 removes, `Any` in an `extends` clause, `forbid` and the `test` modifier, no longer occur."
- Meaning: unchanged. The bound of the measurement is now a code state. `git diff 97a416b18 11d2d8764` changes one file of the code generator, `CodeGen.java`, so "the code generator as landed" is the code that the probe ran. The measurement of 52 on climb batch 22's code moved to the history (question 3).
- Over 600: the remaining sentences answer question 1 (what the count is, what it blocks) and question 2 (the setting).

## C5, F-118 (1221 to 1215)

- Old title: "A numeral's value reaches the compiled world intact, and the compiled path prints a large unsigned value unsigned, but it cannot compare a numeral beyond `ZZ64` with another numeral."
- New title: "A numeral's value reaches the compiled world intact, and the compiled path prints a large `NN32` or `NN64` value unsigned, but it cannot compare a numeral beyond `ZZ64` with another numeral." (Fix round: the compiled path is back in the printing clause. Size 1221 to 1218.)
- Old: "(F-313; row 326, fixed; `compiler_tests/UnsignedPrintingCompiled`)". New: "(F-313; test `compiler_tests/UnsignedPrintingCompiled`)".
- Meaning: unchanged. The closed row went to the history.

## C6, F-125 (668 to 662)

- Old: "`CHOOSE` answers 0 for `k < 0` or `k > n` on the four fixed widths; on `ZZ` it answers 1 there (row 887, `tests/XXXChooseZZOutOfRangeWalk.fss`)."
- New: "On the four fixed widths `CHOOSE` answers 0 for `k < 0` or `k > n`; on `ZZ` it answers 1 there, where the specification gives 0 (row 887)."
- Meaning: unchanged. "Where the specification gives 0" is row 887's claim. The reproducer is row 887's (question 5).

## C7, F-240 (1833 to 1969)

- Old: "From climb batch 22's gate to climb batch 24's it stayed between about 150 s and 170 s, which no batch moved beyond noise: runs on climb batch 22c's base and on climb batch 23's and 24's rung trees took 129 to 181 s, at loads of up to 10.73."
- New: "From climb batch 22's gate to climb batch 24's it stayed between about 150 s and 170 s, which no batch moved beyond noise."
- Added after the sentence on the distance stage: "That rise has no measured cause: each gate ran the stage once, and at climb batch 25's gate the stage started 9 s before `testFast`, whose four JVMs ran beside it, where at climb batch 24's it started 53 s before."
- Added to Detail, first: "`reviews/batch-25-review.md`, section 2".
- Meaning: one circumstance added, from the review's section 2. No figure changed: 160 s, 271 s, 205 s and 0.59 are the commit stage's.
- Moved out first: the rung runs of 129 to 181 s, which the reviews named in Detail hold (`reviews/batch-24-review.md:31` holds the 129, 181 and 10.73).
- Over 600: the entry grew by the owed clause and its Detail. The other sentences answer question 1 (how to compare a time) and question 2 (why the times differ from earlier gates).

## C8, F-268 (611 to 598)

- Old: "**The code generator emits `Any` as a static argument of an `extends` entry, but crashes ...** It emits ... (`CodeGen.java:5845-5851`); for `Holder[\(Any, ZZ32)\]` it stops with '...'. Row 889. Test: ..."
- New: "**The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits ... (`CodeGen.java:5845-5851`). For `Holder[\(Any, ZZ32)\]` it stops with '...' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`."
- Fix round: "emits" is back in the title, and the second test drops its repeated folder, so the entry no longer grows.
- Meaning: unchanged. The bare pointer is now in the sentence of the crash that the row holds.

## C9, F-298: keep

The added sentences on rows 882 to 886 hold by `rows.md`. I did not split the rewrite's limits into their own entry: no question of "What an entry is" asks for it, and they change with the rewrite that the entry owns.

## C10, F-299: keep

The 288 holds by the review's section 6. Its "`RR32` 50 (F-310, its `asFloat` F-311)" now agrees with F-310, which counts 50 on helpers. I did not split the entry (see "Decisions not taken").

## C11, F-303 (1775 to 1760)

- Old: "... `|\self/|` and `|/self\|` (`LibraryBuiltin/FortressBuiltin.fss:156-189`), over item 331."
- New: "... `|\self/|` and `|/self\|` (`LibraryBuiltin/FortressBuiltin.fss:156-189`)."
- Meaning: unchanged. A review-queue item does not belong in an entry (record rule, "What an entry is"). For the routing writer: review-queue item 331 should name F-303.

## C12, F-305: keep

The `NN32` binding, `simpleUnsignedIntArith.unsignedIntOverflowingChoose` through the `NN32` transfer (F-313), holds by the gather's block from rung U.

## C13, F-306: keep

The counts 26, 22, 48, 29 and 11 hold by the merged-diff review's block.

## C14, F-308 (1950 to 1950)

- Old: "One of the 94 bindings over these types, `UnsignedLong`'s `asFloat` at `RR64` among them, stays on a glue class: `Char`'s `asExprString` (row 861)."
- New: "Of the 94 bindings over these types, `UnsignedLong`'s `asFloat` at `RR64` among them, only `Char`'s `asExprString` stays on a glue class (row 861)."
- Meaning: unchanged; the old sentence could be read as if `UnsignedLong`'s `asFloat` stayed on a glue class.
- A correction to owed.md: it says rung A moved `UnsignedLong`'s `asFloat`. Rung U moved it, onto `unsignedLongToDouble` (`rung-natives-unsigned/REPORT.md`, "1. What changed and why"). Rung A moved the other five `asFloat`s.

## C15, F-310 (980 to 940)

- Old title: "Value object `RR32`'s 49 native bindings name the 46 helpers of `simpleFloatArith`, over a Java `float`, and every value they give under walk is the glue class `RR32`'s."
- New title: "50 of value object `RR32`'s 51 native bindings name helpers, and every value they give under walk is the glue class `RR32`'s."
- New body opens: "49 name the 46 helpers of `simpleFloatArith`, over a Java `float`: ..." and states "The 50th, `asFloat`, names `simpleDoubleArith.floatToDouble` at `RR64` (F-311). The 51st, `^` at a `Float` exponent, still names a glue class." "No prelude file imports the class" now reads "No file of the compiler's prelude imports `simpleFloatArith`."
- Meaning: unchanged; the count is stated once. I counted at the landing: `FortressBuiltin.fss:205-368` holds 51 `builtinPrimitive` lines, 49 on `simpleFloatArith`, 1 on `floatToDouble`, 1 on `Float$Pow`.
- Moved out first: the misnamed binding's message, to the rung's report, "Suites and stages", which holds it.

## C16, F-311 (920 to 912)

- Old: "`LibraryBuiltin/FortressBuiltin.fss:241`, `:374`, `:383`, `:396`, `:570`; the abstract at ...". New: "Bindings: `LibraryBuiltin/FortressBuiltin.fss:241`, ...; the abstract: `Library/FortressLibrary.fsi:291`; the specification: `numbers.tex:49`."
- Cut to the history: "climb batch 23's fork 12" (question 3).
- Detail: `compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why", as the other entries write it.
- Meaning: unchanged.

## C17, F-312: keep

It holds against rows 336 and 848 FIXED. Fix round: my rewording of "626 printed pairs are the old code's" made the entry grow without a ground, so I took it out. `record.apply` has no F-312 block now.

## C18, F-313: keep

It holds against rows 326, 860 and 873 FIXED, and it states that the compiled prelude's `NN64` printing and prefix `BOXMINUS` move with the helpers.

## C19, F-314 (1150 to 1035)

- Fix round, a fidelity fix: the title said `partitionL` "on the five integer types", but `ZZ` has none. The report's table gives 18 = `ZZ32` 3, `ZZ64` 3, `NN64` 4, `ZZ` 4, `NN32` 3 and `nanoTime` 1. The title now says "`GCD` and `LCM` on the five integer types, `partitionL` on the four fixed widths". The cold reader counted 19 from the old title.

- Old: "The strings are at `Library/FortressLibrary.fss:785`, ... `:468`; the helpers at the ends of ..., every fixed width's divisor from one unsigned Euclid, `simpleUnsignedLongArith.unsignedLongGcd`."
- New: "The helpers stand at the ends of `simpleIntArith`, ... and `simpleArbitraryPrecisionArith`, and the fixed widths' helpers share one unsigned Euclid's algorithm, `simpleUnsignedLongArith.unsignedLongGcd`." The Detail says that the report's table gives each string's line and its helper.
- "`ZZ`'s `CHOOSE` keeps `BigNum`'s 1 ... (row 887)" now adds "where the specification gives 0".
- Meaning: unchanged. I checked the shared algorithm in the code: `simpleIntArith`, `simpleLongArith` and `simpleUnsignedIntArith` call `unsignedLongGcd`.

## C20, F-315 (866 to 1210)

- Fix round: the `forbid` sentence now reads "An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890)." This replaces "throws on, as ...", which the cold reader could not parse. It also replaces the clause on the compiled `try` in general, which belongs to the row. "Does not run" is row 890's claim. "The library's `test stringifyChars` stops next at a varargs call (row 624)." is back: it says what the fact still blocks.

- Old title: "... and a function declared `test`." New title: "... and a function or a method declared `test`."
- Added: "It throws before the `finally` clause runs, and so does the compiled `try` when it passes on an exception that no clause takes (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:2947-2949`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it."
- Added: "F-34 gives what the code generator still refuses in the library." Tests: "for row 890, `XXXFinallyOnEscape.test`". Detail: the review's splits 3 and 4.
- Moved out first: the fall of the refusals from 50 to 47 in 14 to 11 kinds (F-34 holds it, question 5).
- Meaning: changed, by the review's finding 5 and its splits 3 and 4. The scope of `test` widens to methods, from the code (`fnDeclCompilableModifiers` is the guard of `forFnDecl`, which compiles functions and methods) and from the review's probe. The `forbid` path's order against `finally` is row 890's claim.
- Over 600: each added sentence answers question 1: a worker who writes a method declared `test`, or a `forbid` with a `finally`, acts otherwise without it.

## C21, P-38 (562 to 702)

- Old title: "The compiler prelude's defects are not repaired: they go with it at the switch-over."
- New title: "The compiler prelude's own text is not repaired: its defects go with it at the switch-over."
- Added after the title: "A helper of `nativeHelpers/` that the one library binds is fixed for the one library, and the prelude's value moves with it (F-313)."
- Not cut only: the change adds words.
- The decision, before and after: the prelude's defects are not repaired; they go with the prelude at the switch-over. The body is unchanged.
- Its reach, before: the title read as the whole prelude, the helpers that it binds included. After: the prelude's own text, its `Maybe` block, its `REM` guard and its reversed spellings, as the body names them. A shared helper of `nativeHelpers/` is fixed for the one library.
- Its requirement, before and after, the same: the `Maybe` block and the `REM` guard stay as landed until the prelude is deleted, with their tests; then the respelling, rows 381 and 383, and `XXXShiftDeclRungI`, as the body says.
- Ground: the review's split 1 and finding 4. Climb batch 25's rung U fixed `unsignedLongToString` and `unsignedLongWrappingNeg` (`f7a33b97b`), and the prelude's `NN64` printing and prefix `BOXMINUS` changed with them. Climb batch 24's rung K did the same for the prelude's compiled `CHOOSE` (rows 521 and 855). The new words are the review's own proposal (finding 4).
- This change lands under his rule of 2026-10-31 ("you don't need my approval to bring the record in line with reality"). The landing report names it to him.

## The entries over 600 characters

After the fix round, `record.apply` holds 14 lines. All but F-268 (598) are over 600 characters. The FACTS entries were over 600 at AT (C22), and P-38 passed 600 by the sentence that C21 owes. The question that keeps the extra sentences is given under each change above. Three entries grew, each by what its change owes: F-240 (+142), F-315 (+344) and P-38 (+140). No split is owed by this landing.

## The fix round

`check.md` failed C5 (fidelity), C8, C17 and C20 (form). Each is fixed as its section above says. Two smaller changes answer the cold read, at a few characters each:

- F-34: "the 173 helper strings" now reads "the base's 173 helper strings", because the reader asked why 173 when F-32 gives 288. Size 1478 to 1475.
- F-240: "ran at a load of 0.59" now reads "ran at a start load of 0.59", because the reader could not tell when the load was sampled (review section 2: "a start load of 0.59"). This adds 6 characters; the entry is now 1975, from 1833 at AT.

I kept these passages of the cold read as they are. Each is in text that this landing did not change, and a fix would grow an entry past 600 with no ground in `owed.md`:

- F-32: what "live", "owner" and the 23 renamed helpers mean.
- F-118: "exact bit length" and "the same program".
- F-125: "the sign" and "So the team's test".
- F-308: "generic owner" and "as walk does".
- F-310: why the prelude's imports matter.
- P-38's body, its "closes" and its "finds": POSITIONS changes only in the sentence that the tree made false.

For the skill writer, from the cold read: `ProgramError`, "abbreviated type", `partitionL`, `narrow`, the directed roundings and "the bound `Any`" are not defined in the `fortress-repo` skill.

## Decisions not taken

- F-299: split into the loader's rules and the count (the boot note's open item). Alternatives: split now, with F-299 keeping the loader and a new entry the count by type; or keep it whole. I kept it whole: the sort owes no split, and a split repoints F-32, F-303, F-306, F-310 and others that cite the count.
- F-298: split the rewrite's limits (rows 882 to 886) into their own entry. Alternatives as for F-299. I kept it whole.
- F-311: name `UnsignedLong`'s `asFloat`, which answers `RR64` too (F-313; rung U's report). Alternatives: add one sentence to F-311, which grows it past what C16 owes; or leave F-313 and F-308 to state it, as now. I left it out.
- F-240: bring the range "from climb batch 22's gate to climb batch 24's" to climb batch 25's, with the count stage's runs of 151 s to 197 s on climb batch 25's rung trees (review section 2). C7 changes no figure, so I left the range as it is.

## For the skill writer

- The modifier guard admits `test` on a function and a method (F-315), and a `forbid` path throws before `finally` (row 890). The `fortress-repo` skill's `references/compiler.md` does not say this; the sort lists it under "For the coordinator".

## Questions for the curator

- P-38: does the narrowed title, "The compiler prelude's own text is not repaired: its defects go with it at the switch-over", with the sentence on a shared helper, state your decision? The change lands under your rule of 2026-10-31. If you meant the helpers that the prelude binds to stay unrepaired too, the record should say so, and rung U's fix of the two helpers would bend it.
