<!-- The entries writer's report for climb batch 27's record-landing: for each change of owed.md given to the entries writer, its entry or row, the old and the new words, the meaning, the size, and the questions for the curator. -->

# The entries writer's report, climb batch 27

The files: `record.apply` (21 FACTS entries, 6 POSITIONS entries, one note), `rows.rewrite` (row 52), `clean.txt` (the 27 new lines). No `cut-only.txt`: each POSITIONS change replaces or adds some words, so none is a cut only. The sizes below are counted by hand to about 20 characters; `checks.sh` prints the exact ones.

## FACTS: the pass on the batch's entries

**C1, F-53.** The pass keeps every sentence. The one added clause is C17's, below.

**C2, F-240.** The pass keeps the figures. The sentences change under C13, below.

**C3, F-283.** Rewritten, 1409 to about 960 characters.
- Old: "... its output on climb batch 27's repaired tree is 'demos: 52 run, 52 reached their end'. `turnersParaffins0` writes its expected map's keys `0 asif ZZ32` ... since row 921's fix. `Generator2Demo` draws its arrays by `random` (...), and in one of five runs on that tree a product of them raised `IntegerOverflow` in `PROD` (...), so a single stop of it is not a regression. Detail: the same report, section 3; `compile-ladder/climb-batch-27/REPAIR-review.md`, section 2."
- New: "`Generator2Demo` draws its arrays by `random`, so one stop of it in a run is not a regression. ... its output, measured once on the code that `4445d848b` committed, is 'demos: 52 run, 52 reached their end'. Detail: the same report, section 3; `compile-ladder/climb-batch-27/REPAIR-review.md`, section 2."
- Meaning: unchanged. The account of `turnersParaffins0`'s keys, row 921's fix and the one `IntegerOverflow` went to the history note. The bounding code, `4445d848b`, stays.
- Past 600: question 1 keeps the `Generator2Demo` sentence. Without it, a batch that sees that demo stop once reads a regression and holds the push. The sorter put that account in the history or the Detail; I kept its one rule and moved its account. If the judge reads it otherwise, the Detail already names the section.

**C4, F-323.** Old: "Counts on this tree alone: 315 of 448 live bindings name a helper, 133 a glue class." New: "F-299 and F-32 give the library's counts of bindings." Meaning: unchanged; the rung's own count is superseded. 1172 to about 1140. Question 5 keeps the pointer.

**C5, F-324.** Keep: every check passes; its claims match `compile-ladder/rung-number-open/REPORT.md`, "What changed and why". Only its history gains the note of C29.

**C6, F-325.** Keep, but for C12's sentence, below.

**C7, F-326.** Keep: each clause matches the rung's report and rows 908 and 923.

**C8, F-327.** Old: "Meaning: the 16 count among the helper bindings (F-299, F-32 change by 16), a `ZZ32` count ...". New: "Meaning: the 16 count among F-299's helper bindings, a `ZZ32` count ...". Meaning: unchanged; the plan clause is done by C18 and C19. 1262 to about 1238.

**C9, F-328.** Keep: each clause matches `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

**C10, F-329.** Old Detail: "\"Old against new\"". New: "\"Old against new: every code point in six forms\"". Meaning: unchanged. 797 to about 833: the heading is now whole, so it resolves.

**C11, F-330.** Keep: each clause matches the rung's report; `FileWriteStream`'s reason is row 926's.

## FACTS: sentences that the landing made false or stale

**C12, F-325.**
- Old: "Walk keeps the assumption on a bound value, cannot take apart a tuple under one, and cannot call an overloaded or a generic method on an assumed receiver (rows 919 to 922)."
- New: "Under walk the assumption stays on a bound value (row 919), a tuple under one cannot be taken apart (row 920), and a generic method on an assumed receiver stops (row 922); an overloaded one runs (`tests/AsIfOverloadedMethodWalk`)."
- Meaning: changed, by its ground: row 921 is FIXED by `4445d848b`; rows 919, 920 and 922 stay open. 1339 to about 1390. Past 600: question 1 keeps it; each row now has its own pointer, since one of the four closed.

**C13, F-240.**
- Old: "From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s, which no batch moved beyond noise." and "That fall has no measured cause: each gate ran the stage once, and at both gates the stage started about 10 s before `testFast`, whose four JVMs ran beside it."
- New: "From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s." and "Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause." Its Detail gains `reviews/batch-27-review.md`, section 2.
- Meaning: changed, by the review's section 2: both stages about halved, with no measured cause. The figures stay as the commit stage wrote them. 1960 to about 2000. Past 600: question 1 keeps the new sentence; without it a reader takes the fall for a gain of the batch.

**C14, F-54.**
- Old: "The `#class` rows of each gate's `distance.txt` hold the count of each class, such as X1 ..., BR ..., and OT ...; `explorations/coordinator/tools/distance/classify.py` assigns them. F-53 gives the last gate's. That gate's `distance.txt` reads `#crash none`: the checker checks the `FortressLibrary` component to its end, `Array3`'s body included, without a crash (F-233)."
- New: "`explorations/coordinator/tools/distance/classify.py` assigns each error a class, such as X1 ..., BR ..., and OT ...; no gate's `distance.txt` from climb batch 24's to 27's holds `#class` rows. F-53 gives the last gate's total. That gate's `distance.txt` holds two `#crash` rows: the check of `value object Char` stops in the checker's sort of its candidates, and the `FortressBuiltin` component's leftover stage fails after it (row 929). The checker checks the `FortressLibrary` component to its end without a crash (F-233)." Its Detail gains the review's section 7, point 6.
- Meaning: changed, by the review's section 7, point 6, and row 929. 608 to about 880. Moved out first: "`Array3`'s body included", which F-233 says (question 5). Past 600: question 1 keeps the crash sentence, and question 2 the `#class` clause, since a reader would look for rows that do not exist.

**C15, F-281.**
- Old title end: "the distance and the count are 0, with no crash (F-53)." Old gate: "('#total 0', '#crash none'; '#total 0')".
- New title end: "the distance and the count are 0 (F-53), the distance with two crash rows in `value object Char` (row 929)." New gate: "('#total 0' with two `#crash` rows; '#total 0', '#crash none')".
- Meaning: changed, by row 929. 1501 to about 1580. Past 600: question 1 keeps the clause; the title claimed no crash.

**C16, F-288.**
- Old title end: "and the compiled checker passes all of them." Old: "Over the fourteen, the stage reads '#total 0', '#crash none'."
- New title end: "and the compiled checker finds no error in them, though its check of `value object Char` does not finish (row 929)." New: "Over the fourteen, the stage reads '#total 0', with two `#crash` rows in the `FortressBuiltin` component (F-54)."
- Meaning: changed, by row 929 and the review's section 7, point 6. 1094 to about 1210. Past 600: question 1.

**C17, F-53.**
- Added after "classes them by root cause (F-54).": "At that gate its check of `value object Char` did not finish, so the 0 holds no completed check of that declaration's body (F-54; row 929, the checker's crash)."
- Meaning: changed by one clause, by finding C. Every other sentence and figure stays, as the sort says. 1701 to about 1890. Past 600: question 1 keeps the clause. I moved nothing out first: the sort keeps every sentence. "Climb batch 22 cleared its last five ..." is history by question 3; it stays here only because the sort holds the sentences (decision not taken 1).

**C18, F-32.**
- Old: "... the Java classes that 143 of the one library's 449 live native bindings still name." "F-299 holds the 306 that name one" "Every program's output needs `Writer`'s natives, among the 36 I/O methods, since `println` writes through a native `Writer`."
- New: "... 102 of the one library's 443 ...". "F-299 holds the 341 that name one". "`println` writes through `stdOut`, a plain Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330)." Its Detail gains `compile-ladder/climb-batch-27/RECORD.md`, "The count of the bindings".
- Meaning: changed, by the gather's count and F-330. I checked the code: `println(a: String)` calls `stdOut.write` (`Library/FortressLibrary.fss:4646`), and `stdOut` is `Writer("<stdout>", makeJavaBufferedStdOut())` (`Library/Writer.fss:17`). The classification "at `a1f8c4b8b`, before any binding moved, the 449 were ..." stays: it is a bounded measurement. 1953 to about 2030. Past 600: question 1; the growth is the count's source, which the brief asks for.

**C19, F-299.**
- Old: "... and 306 of the one library's 449 live bindings name one." "The 306 by type: `ZZ32` 25 and `Int` 3, `ZZ64` 26 and `ZZ` 22 (F-306; ...), `Float` 57 and the top-level `fromRawBits` (F-303), `RR32` 50 (...), ..., and `NN32` 27, `NN64` 24, `UnsignedLong` 3 and `Char` 39 (F-308, F-313), the top-level `nanoTime` (F-314), and the string family's 18: 11 of `FlatString`'s 13 methods, all but `=` and the `flatConcat` overload over a `Char`; ...; the other 143 name glue classes."
- New: "... and 341 of the one library's 443 live bindings name one." Added after the refusals: "For `stringOps.typeName` and `equality.sEquiv` it runs walk's own operations instead, by the table of `interpreter/glue/NativeApp.java` (F-328)." "The 341 by type: `ZZ32` 28 and `Int` 3, `ZZ64` 29 and `ZZ` 26 (F-306, F-327; ...), `Float` 62 and the top-level `fromRawBits` (F-303, F-323), `RR32` 51 (...), ..., and `NN32` 30, `NN64` 27, `UnsignedLong` 3 and `Char` 40 (F-308, F-313, F-327), the top-level `nanoTime` (F-314) and `random` (F-323), `Object`'s `ilkName` and `SEQV` over `Any` (F-328), `JavaBufferedWriter`'s 7 (F-330), and the string family's 20: `FlatString`'s 13 methods; ...; the other 102 name glue classes." Its Detail gains the record's count section.
- Meaning: changed, by the gather's count and F-328. The total and the 102 are the gather's. I added up the counts by type from the rungs' own tables: I's 16 (ZZ32 3, ZZ64 3, ZZ 4, NN32 3, NN64 3), F's 9 (Float 5, RR32 1, `random` 1, `FlatString` 2), C's 1, A's 2, W's 7. They sum to 341. No report states the counts by type; the note says so.
- 3149 to about 3480. Past 600: question 1 keeps the count, its kinds and the loader's table; the growth is the owed clauses. I moved nothing out: the entry is the one home of the count, and each per-type part points to its family's entry.

**C20, F-57.** Old: "which it prints `Int`, `Long` and `BigNum`." New: "which it prints by those names (F-328)." Meaning: changed, by F-328. 1447 to about 1443.

**C21, F-308.**
- Old title: "... and `Char`'s 39 bindings name their helpers." Old: "only the walk and compiled guards check that each of the 93 names the unsigned helper. Under walk the 93 keep ..." and "Of the 94 bindings over these types, `UnsignedLong`'s `asFloat` at `RR64` among them, only `Char`'s `asExprString` stays on a glue class (row 861)."
- New title: "... and `Char`'s 40 bindings name their helpers." New: "only the walk and compiled guards check that each of them but `Char`'s `asExprString` names the unsigned helper. Under walk those 93 keep ..." and "All 94 bindings over these types name helpers, `UnsignedLong`'s `asFloat` at `RR64` among them; `Char`'s `asExprString` names `simpleChar.charToExprString` (F-329)."
- Meaning: changed, by F-329 and the gather's C +1. 1950 to about 2005. Past 600: question 1; the "93" sentence needed a referent once 94 name helpers (question 2).

**C22, F-131.** Old: "`Number`'s `=` compares a float with an exact number after `asFloat`, so it is not transitive (row 434)." New: "`Number` declares no `=`; each type declares one at each type it coerces from or into (F-324)." Meaning: changed, by F-324; row 434 is FIXED. 1330 to about 1320.

**C23, F-151.**
- Old: "`Number` stays in the bound because its `comprises` clause lists every type below it, so an element type excludes `String`; the ring alone does not give that. That exclusion makes the four juxtapositions of a vector or a matrix with a scalar `T`, in either order, a valid overloading beside the library's juxtapositions with a `String`. `Number` also declares the `asFloat` that the vector norm calls."
- New: "`Number` stays in the bound, though it has no `comprises` clause now (F-324). The four juxtapositions of a vector or a matrix with a scalar `T`, in either order, stand beside the library's juxtapositions with a `String`, and the checker finds no error in them (F-53); no report says what now makes them exclude. The vector norm is declared at each of the eight number types, by its own `asFloat` (F-324)."
- Meaning: changed, by F-324. The reason that the clause gave is gone, and I state no new reason. In the code, `String` declares `excludes { Number, Char, AnyMultiplicativeRing }` (`Library/FortressLibrary.fsi:2524`, the same at the base). That may be the answer, but no report measures it, so the entry does not say it (question 1 for the curator). 1649 to about 1700. Past 600: question 1.

**C24, F-311.**
- Old: "answer `RR64`, as `Number`'s abstract `asFloat` declares," and "Bindings: `LibraryBuiltin/FortressBuiltin.fss:241`, `:374`, `:383`, `:396`, `:570`; the abstract: `Library/FortressLibrary.fsi:291`; the specification: `numbers.tex:49`."
- New: "answer `RR64`, as each type's own `asFloat` declares in its api (F-324)," and "The specification: `numbers.tex:49`."
- Meaning: changed, by F-324. The bindings' line numbers moved on the merged tree (`git grep` puts them at `:245`, `:379`, `:388`, ...), so they go to the report by question 4. 912 to about 820.

**C25, F-318.** Old: "and with `Number`'s `comprises` clause removed in a scratch copy walk loads and runs". New: "and with `Number`'s `comprises` clause removed, in a scratch copy before F-324 removed it from the library, walk loads and runs". Meaning: unchanged; the measurement keeps its scratch-copy bound. 2033 to about 2083. Past 600: question 2; without it a reader would think the clause is still in the library.

**C26, F-34.**
- Old: "among them varargs (row 624), `asif` (row 818) and \"Not in the trait table\" (row 733)".
- New: "among them varargs (row 624), the type assumption (row 818, now only a dispatched call with an assumption at some of its arguments; F-325) and \"Not in the trait table\" (row 733)". Added: "The count on today's code, with F-325's forms compiled, is not measured."
- Meaning: changed, by F-325 and the review's Findings. The 38 in 10 kinds stays `dbf4825e0`'s measurement. 1525 to about 1690. Past 600: question 1; without the added sentence a reader takes the 38 as today's.

**C27, F-29.** Old: "and four team tests and two demos whose objects extend `Number` or `Exception` directly (row 596)." New: "and three team tests and two demos whose objects extend `Exception` directly (row 596)." Meaning: changed, by row 596. The repairs stay the curator's. 1568 to about 1546.

**C28, F-123.**
- Old: "Open on the compiled path: an object that declares or inherits a zero-argument Fortress member named `toString` overflows the stack when it is printed (row 321),"
- New: "Open on the compiled path: through the prelude's `Object`, an object that declares or inherits a zero-argument Fortress member named `toString` overflows the stack when it is printed (row 321), though not through the one library's `Object`, whose `asString` is `self.ilkName`;"
- Meaning: changed, by its condition: row 321 as rewritten. 913 to about 1020. Past 600: question 1.

**C29, F-324's history.** A noted block: `rung-number-open/SKEPTIC.md` does not exist; no journal line holds N's skeptic's text; N landed on its judge's reading of the diff. The entry is unchanged.

## POSITIONS, by the curator's rule of 2026-10-31

None of these changes what he decided, where it applies or what it requires. Each sentence changes only where the tree made it false.

**C30, P-160.**
- Old: "It goes in two steps." "Then the clause is removed from `Library/FortressLibrary.fss` and `.fsi`; the reflective QuickCheck generator gets a way to generate a `Number`, `Number`'s `=` and `asFloat` leave the trait (P-165), ... and the tests that lean on the clause are repaired."
- New: "It went in two steps." "Then the clause was removed from `Library/FortressLibrary.fss` and `.fsi` (F-324); the reflective QuickCheck generator got a way to generate a `Number`, `Number`'s `=` and `asFloat` left the trait (P-165), ... and the tests that leaned on the clause were repaired."
- Not cut only: the tense changes and "(F-324)".
- The decision: the one library's `Number` has no `comprises` clause, so that a program may declare its own number type below it; before and after, the same. Its reach: the one library's `Number`; `AnyIntegral`'s clause stays; the same. Its requirement: the two steps, in that order; before, as to come; after, as built.

**C31, P-163.**
- Old: "Walk's binding (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:615`)", "(`parser/Literal.rats:460-464`)", and "Row 861, the two paths' different texts, closes with `--settled` when this lands, and F-308's last clause, F-299's count of 306 and F-32's count of 143 each change by one then."
- New: "`:665`", "`:460-466`", and the sentence on row 861 cut.
- Not cut only: the two line numbers change.
- The decision: `Char`'s `asExprString` writes the completed helper's text, which reads back at every code point; the same. Its reach: both paths' binding, the parser's digit choices, the specification's list; the same. Its requirement: before, also row 861's close and three entries' counts; after, those are done, and the sentence goes.

**C32, P-165.**
- Old: "The vector norm takes a bound that promises a float; climb batch 27's rung chooses its form as a fork with a default, which its review list shows." and "The specification's sentence changes with the rung."
- New: "The vector norm takes a bound that promises a float; its form landed at a worker's default, the norm at each of the eight number types by its own `asFloat` (F-324)." The sentence on the specification is cut.
- Not cut only.
- The decision: `asFloat` and `=` leave `Number`, each type keeps its own `asFloat`; the same. Its reach: the nine built-in number types, the norm, `Float`'s `^`, `random`, `atan2` and `printThreadInfo`; the same. Its requirement: the norm "takes a bound that promises a float"; the same words. The form is named as a worker's default, not as his choice, as the sort requires. The specification's sentence is revised (`Specification/basic-lib/numbers.tex:46-54`, with an Appendix I entry).

**C33, P-166.**
- Old: "and `QQ`'s object `Ratio` (`Library/FortressLibrary.fss:664`), a plain object today, becomes a `value object` too (row 911, the two declarations that disagree)." and "... in the revision form (P-96) with one Appendix I entry, in the rung that fixes what `SEQV` means (P-162)."
- New: "and `QQ`'s object `Ratio` (`Library/FortressLibrary.fss:648`) is a `value object` too (F-326)." and "... in the revision form (P-96) with one Appendix I entry."
- Not cut only. I checked the code: `value object Ratio(num: ZZ, den: ZZ) extends { QQ }` is at `Library/FortressLibrary.fss:648`.
- The decision: `ZZ`'s and `QQ`'s values are value objects, and the specification's list follows; the same. Its reach: `BigNum`, `Ratio`, `objects.tex`'s list; the same. Its requirement: `Ratio` declared `value` and the list revised; before, as to come, in a named rung; after, as the tree holds it.

**C34, P-167.**
- Old: "which removes one native and the compiled stack overflow of row 321." and "...stop being types that a program sees or prints; the rung works out the way."
- New: "which removes one native and, once the compiled path reads the one library, the compiled stack overflow of row 321." and "...stop being types that a program sees or prints."
- Not cut only.
- The decision: `ilkName` and `SEQV` name the compiled helpers, walk answers them with its own operations, and `asString` is `self.ilkName`; the same. Its reach: the three natives over `Any`; the same. Its requirement: the same; the removal of row 321's overflow now has its condition, since row 321 holds through the prelude's `Object` until the switch-over.

**C35, P-168.**
- Old: "(rows 906 to 908)" and "The rung's first test is a program with a `value object CC64`, run on both paths beside the review's 14 cases."
- New: "(rows 906 and 907; the prelude's own `===` keeps row 908 until the switch-over)" and "A program with a `value object CC64` tests it on both paths beside the review's 14 cases (F-326)."
- Not cut only.
- The decision: `SEQV` is the specification's rule on both paths, with no special case; the same. Its reach: both paths, strings among the reference objects; the same. Its requirement: the same; the test is stated as it stands.

**C36, P-164, and C37, P-39:** not mine (writer: none); unchanged.

## The gap ledger

**C38, row 52.**
- Old claim: "... carry a user element type in full, but only under the illegal `extends Number`: ...". Old notes: "It works only because walk never checks `comprises` (row 22); the `Number` bound is the specification's own. ..."
- New claim: "... carry a user element type in full, under `extends Number`: ...". New notes: "`Number` has no `comprises` clause (P-160), so a program's type may extend it; the `Number` bound is the specification's own. ..."
- Meaning: changed, by P-160 and F-324. The status stays `POSITIVE-VERIFIED`; nothing is closed.

## The fix round

Each failure of `check.md` in my homes, fixed as `check.md` corrects it, unless a line says otherwise. The new words below replace those given above for the same change.

- **C3, F-283.** New: "`Generator2Demo` draws its arrays by `random`, so a product of them can overflow in `PROD`, and one such `IntegerOverflow` stop in a run is not a regression." The output sentence lost "measured once": the driver ran twice on that code. Meaning: unchanged from the entry before the batch; only an `IntegerOverflow` stop is excused. This also answers the cold reader's question on what a "stop" is.
- **C14, F-54.** New: "The `#class` rows of a gate's `distance.txt` hold the count of each class that occurs, such as X1 ..., BR ..., and OT ...; `explorations/coordinator/tools/distance/classify.py` assigns them, and at a distance of 0 there are none (`tools/distance/table.py:112`)." Meaning: the old sentence's meaning, with its condition; my round-1 reading, that the rows were missing, was wrong. The cold reader could not resolve "the checker's sort of its candidates" and "leftover stage". Both now say what they are, from row 929 and the review's section 7, point 6: "the checker's sort of a call's candidate declarations", and "the `FortressBuiltin` component's leftover stage reports the inference nodes that the stopped check left".
- **C15, F-281.** Its Detail gains `reviews/batch-27-review.md`, section 1. The cold reader saw the title put both crash rows "in `value object Char`", against F-54. The title now reads "two crash rows from its check of `value object Char`".
- **C16, F-288.** Its Detail gains `reviews/batch-27-review.md`, section 1.
- **C21, F-308.** New title counts: "`NN32`'s 30, `NN64`'s 27, `UnsignedLong`'s 3 and `Char`'s 40". New: "each of them but `Char`'s `asExprString` and F-327's six shifts and powers, which its own tests check, names the unsigned helper. Under walk those 93 keep ..." and "All 100 bindings over these types name helpers". Its Detail gains the record's count section. The source is rung I's report, "What changed and why": "At `NN32` and `NN64` the rewrite passes `self` and the result through the transfers of F-308". Meaning: changed, by that source. F-308 and F-299 now agree. My decision not taken 2 is settled.
- **C23, F-151.** New: "no run measures what now keeps a scalar `T` apart from `String`." Meaning: unchanged from round 1. The question goes to the coordinator, not to the curator (below).
- **C26, F-34.** New: "the type assumption (row 818, the forms that F-325 lists as refused)". Meaning: row 818 holds every refused form, not only the partial call.
- **C32, P-165.** New: "The vector norm takes a bound that promises a float; its form is the default of a fork on his review list: the norm at each of the eight number types, each by its own `asFloat` (F-324)." and "The specification's sentence follows (`Specification/basic-lib/numbers.tex:46-54`)." The default is the batch record's (fork N8, review-queue item 393), not a worker's. Both requirements stay: the form goes to his review list, and the specification follows. The decision, its reach and its requirement are the same as before the batch. Only the as-to-come wording of the two sentences changed. This also settles the cold reader's two readings of the norm's form.
- **C33, P-166.** "(F-326)" dropped. F-326 does not name `Ratio`; the line citation holds the claim.

From the cold read, beyond `check.md`:
- **F-327.** Old: "Meaning: the 16 count among F-299's helper bindings". New: "Meaning: the 16 bindings count among F-299's 341". The reader read "16" as a count of helpers, against the 15 helpers named. Meaning: unchanged.
- The other passages that the cold reader could not resolve are in sentences that this run did not change, and no change of `owed.md` names them. Examples: F-53's "fused arm", F-57's "numeral switch", P-166's "bits", and P-168's "Each path changes its own code". They stay. The coordinator may want them for the next consolidation.

The sizes change again: F-54, F-281, F-288, F-308 and P-165 grow by a few tens of characters each, by the corrections above.

## Decisions not taken

1. F-53's "Climb batch 22 cleared its last five ..." is how the fact came about (question 3), and the entry is 1890 characters. The sort keeps every sentence of F-53. Alternatives: move it to F-53's history now, or leave it for the next pass of F-53.
2. Settled in the fix round: F-308 now counts rung I's six (C21). F-306's counts (trait `ZZ64`'s 26 and trait `ZZ`'s 22) and F-310's "The 51st, `^` at a `Float` exponent, still names a glue class" no longer match F-299 and the tree. No change of `owed.md` names them, so they stay, for the coordinator.
3. F-299's counts by type are my sum of the rungs' tables, not a count of the tree. Alternatives: keep them, as written; or have the next gather count the bindings by type.
4. Rung C's `Char` count: the gather's count gives `Char` 40 (39 + 1). The review's section 6 says "`Char`'s 41 helper bindings", and its split 10 says "40 bindings of `Char` already on `simpleChar`" at the base. I followed the gather's count, the sort's ground.
5. F-281's "So the distance stage is the full check of F-245" stays. With `Char`'s check stopped, it is full at every stage but that declaration. The sort names only the title and the gate figures.

## For the coordinator

- The `fortress-repo` skill: no skill detail moved out of an entry in this run.
- F-151: with `Number` open, what keeps the library's juxtapositions of a vector or a matrix with a scalar valid beside those with a `String`? `String`'s own `excludes { Number, Char, AnyMultiplicativeRing }` (`Library/FortressLibrary.fsi:2524`) may give it. This is a question of fact for a probe, not a decision of the curator's.
- F-306 and F-310 are stale against F-299 (decision not taken 2).

## Questions for the curator

None.
