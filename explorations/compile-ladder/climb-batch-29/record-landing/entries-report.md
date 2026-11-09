<!-- The entries writer's report for climb batch 29's record landing: for each change of owed.md that the entries writer owns (C1 to C81, C86 to C89), what changed in its entry or row, whether the meaning changed, the questions that keep an entry past 600 characters, the POSITIONS changes named for the curator, and the questions for him. -->

# The entries writer's report, climb batch 29's landing

## The files

- `record.apply`: 55 entry lines and one note. The lines are 45 FACTS entries (13 passes, 8 sentences made false, 24 moved citations) and 10 POSITIONS entries. The note is F-240's.
- `rows.rewrite`: rows 893, 961, 965 and 579. No status changes.
- `cut-only.txt`: P-76, P-173, P-154.
- `clean.txt`: the 55 new entry lines, then the 4 new rows.

Each old line is in `entries.md`, or in the record at `fa630b65f`. Each new line is in `record.apply`. Below, each change quotes only the words that changed. Sizes are in characters. Every changed entry is past 600 characters, before and after. I could not measure exact sizes, because this session cannot run Python, awk or `record.py`. I checked each length against the old size with a bounded `grep`: `^- F-N .{old-6,}`. So "not longer" means at most the old size. "Grew" names the clause that the change owes. `skills-lint.py` did not run, for the same reason.

## The fix round

This part supersedes the wording and sizes given below for each entry that it names. `check.md` names nine failures in my homes. I fixed each one by its correction.

- **C1, F-32 (form).** "they left the one library with it (F-79)" is now "they left the one library with it, for the numeral types of F-79". Meaning: unchanged.
- **C9, F-118 (fidelity).** "It compares two `IntLiteral` values at `ZZ64`, so" is back in place of "So". The title also changed, to keep the entry within its old size: "but it cannot compare two `IntLiteral` values beyond `ZZ64`". Meaning: unchanged, and the title is still no broader than the body. Size: not longer than 1463.
- **C17, F-229 (form).** "(row 722)" is now "(row 722, the same cast in `openRange`)". Meaning: unchanged.
- **C21, F-262 (fidelity).** The text now reads "fold `^` of numerals by an integer numeral up to 4096 (F-339)". This puts back the bound and, for the cold reader, the numeral base. Meaning: the old text's bound, restored.
- **C23, F-278 (form).** Its 817-character sentence lists what reads as `Index` on each path. Question 1 keeps it: each clause is a case where a worker writes something different. I kept it as one sentence, because its semicolons join one list.
- **C33, F-342 (form).** I kept the entry. Its 812-character sentence lists the places that take the default and the checker's refusals, and question 1 keeps it: each clause changes what a program may write.
- **C36, F-345 (form).** I kept the entry. Its 680-character sentence lists the specification's parts that state the design, each with its file, and question 4 keeps it: a worker who edits the text needs each place.
- **C40, F-122 (form).** The new sentence is the checker's: "On both paths, a numeral within half an ulp of a tie rounds as its nearest double, not as the rational that it denotes, by P-173's tie reading (P-172; the guard `tests/RoundNearTieNumeral.fss`)." Meaning: the behaviour is unchanged, and it is no longer against the specification. Size: grew by about 30, the owed clause.
- **C89, row 579 (coverage; `mech-1.md`).** "the case of a numeral is not measured" is now "a numeral's case is not measured", which keeps the notes within 700 characters.

The cold reader's passages. I fixed only those that lie in a sentence that this run wrote:

- **F-79.** The four numbers are now named: `digits`, `fractionDigits`, `radix` and `digitValue` (rung N's report, [S6]). "an `=` pair both ways" read two ways. It is now "`=` declared in both orders". "`RR64` comprises `Float` alone." is cut, to keep the size. The entry grows by under 20 characters, and only for the cold reader. Meaning: unchanged.
- **F-74.** "its four numbers (F-341)" is now "(F-79, F-341)", because F-79 names them.
- **F-169.** "(P-174, F-345)" is now "(P-174, F-345; F-79 names them)".
- **F-118.** The unclear "So" is fixed by C9.
- **F-262.** The unclear base is fixed by C21.

I left the cold reader's other passages as they stand. Each lies in text older than this run, or its fix needs a source that I did not open, such as the three narrow cases of F-73, the witness `typecase` of F-57, or F-327's 15 helpers against its 16 bindings. In F-341, `h = 0.5` stays as written, to keep the entry within its size. `mech-1.md`'s other findings are information only, as `check.md` reads them.

## The line citations checked against the code

I mapped each moved citation through the hunk headers of `git diff -U0 b430f9f42 7daf51fe8`. This covers the four library files, `Functionals.scala`, `CoercionOracle.scala`, `CodeGen.java`, `FileTests.java` and the specification files. Every start line in `owed.md` agrees with that mapping. I also read some lines at the head: `FortressLibrary.fsi:489` and `:2707`, `IntegerLiteralFoldingVisitor.java:292-302` (the `^` fold) and `:373-377` (the prefix `-` fold), `literals.tex:139`, `constant.tex:118-122`, `numbers.tex:56-73` and `changes.tex:3050-3052` and `:4291-4292`. Where an entry cites a range and `owed.md` gives only its start, I moved the end by the same mapping. These are F-44, F-170, F-175, F-276, F-286, F-302, F-306, F-312, F-330 and F-332. One range has a different end from the sort's, and one grew inside:

- **P-165, `numbers.tex:46-54`.** The sort gives `:56-64`. At the head, the base's lines 46 to 50 are `:56-60`. Rung T then inserted 9 lines: the numeral types' `asFloat` and the `revival-numerals` callout. The base's lines 51 to 54, the `revival-asfloat` callout, are now `:70-73`. So I wrote `:56-73`. A range of `:56-64` would end inside the numerals' callout, and it would leave out the `asFloat` callout that the old range held.
- **F-170, `ranges.tex:42-58`.** This range holds the hunk at `:56-58`, which is now five lines. So the range is now `:42-60`. The sort names only `:88` to `:90`.

## FACTS: the passes (C1 to C37)

The pass cuts toward the record's form. Where the pass finds an entry right, the entry has no line, and its reason is below.

- **C1, F-32. Changed.** Old: "Of the 449, 29 were object `IntLiteral`'s (`FortressBuiltin.fss:549-629` at `a1f8c4b8b`), 4 among the 154 and 25 among the 158; its 8 conversions and comparisons were then Fortress text over its `asZZ`. Its other 21, and `FloatLiteral`'s 3, left the one library with the two objects, whose place the numeral types `NaturalNumeral` and `RadixPointNumeral` take (F-79; row 578)." New: "Of the 449, 29 were the object `IntLiteral`'s, 4 among the 154 and 25 among the 158; they left the one library with it (F-79)." The rest of that history moved to the note. Meaning: unchanged. Size: about 1890, from 2123. Past 600: the 449's classes are a measurement bounded by its commit (question 1). The pointers each carry a family that a worker looks up (question 5).
- **C2, F-53. Keep.** The commit stage wrote the gate's figures and named no sentence false. The pass finds every sentence true at climb batch 29's gate.
- **C3, F-55. Keep.** The gather's `ZZ32` agrees with F-344 and row 510.
- **C4, F-57. Changed.** Old: "Walk gives an integer numeral where nothing fixes a type its default by its magnitude, ..., and converts it where its place fixes a type (F-341)." New: "Where nothing fixes a type, walk gives an integer numeral its default by its magnitude, ...; where its place fixes a type, walk converts it (F-341)." In the Detail, "measured before the numeral switch" is now "measured on an earlier library". "The numeral switch" was a handle. Meaning: unchanged. Size: not longer. Past 600: each path's rule is needed to read the generic rule (question 2).
- **C5, F-73. Changed.** Old: "refuses a call beyond 64 combinations of candidate types (row 506), a numeral's lone parameter counting one choice and a call with an untyped function argument (row 507)". New: "refuses a call with an untyped function argument (row 507), and a call beyond 64 combinations of candidate types, where a lone parameter that numerals alone fix counts one choice (row 506)". "which F-51 also cites" is cut. Meaning: unchanged, and no longer read as a third refusal. Size: not longer. Past 600: the rule, the tie and the refusals are one mechanism (question 2).
- **C6 with C38, F-74. Changed.** See C38.
- **C7, F-79. Changed.** The old title said that each of the eight number types converts from both numeral types. The body said that the integer types convert from `NaturalNumeral` only. The new title: "In the interpreter's library, the numeral types are the value objects `NaturalNumeral` and `RadixPointNumeral` below `trait Numeral`, a sibling of the number types under `Number`, with the four numbers as fields." The body now opens: "Each of the eight number types converts from `NaturalNumeral`, and `QQ`, `RR64` and `RR32` from `RadixPointNumeral`, each with an `=` pair both ways". This is rung N's table ([S6]). Meaning: the title is no broader than the body. Size: not longer. Past 600: the conversions by type (question 1).
- **C8, F-84. Keep.** The merged-diff review cut the `IntLiteral` limit. Each remaining sentence passes question 1, and the team's `fail` is the ground of the bound.
- **C9, F-118. Changed.** Old title: "but it cannot compare a numeral beyond `ZZ64` with another numeral." New: "but it compares two values of the numeral type `IntLiteral` at `ZZ64`, so not one beyond `ZZ64`." The reason: a comparison of numerals alone folds before the checker (F-339), and row 328's case is `lt(a: IntLiteral, b: IntLiteral)`. "the compiled world" is now "the compiled code". Meaning: the title is no broader than the body. Size: not longer.
- **C10, F-123. Keep.** Each sentence holds at the head (F-344, F-341, F-342).
- **C11, F-131. Keep.** Its "from which each of the eight converts (F-79)" names the numeral types together, and F-79 now gives them by type.
- **C12, F-137. Keep, with a doubt.** See "Read and not changed" below.
- **C13, F-138. Keep.** 559 characters, and true at the head.
- **C14, F-140. Keep.** "The checker types such a value `ZZ32` (P-173, F-342)" and row 962's sentence hold.
- **C15, F-151. Changed.** "It landed when the curator said to land it." moved to the history (question 3). Meaning: unchanged. Size: about 1615, from 1658.
- **C16, F-228. Keep.** Row 717's new example holds (rows.md, row 717).
- **C17, F-229. Changed.** ", as `openRange` did before walk read an `Int` value at `ZZ32` (row 722, fixed)" is now " (row 722)". The rest moved to the history (question 3). Meaning: unchanged. Size: not longer.
- **C18, F-240. Keep the line.** The note is C47.
- **C19, F-249. Keep.** The gather's example with a variable is the gate's (F-343).
- **C20, F-253. Keep.** The messages print `ZZ32` (F-344).
- **C21, F-262. Changed.** Old title: "can tell `10^16` from `10^(-16)`". New title: "can tell a positive exponent from a negative one, as in `x^16` and `x^(-16)`". The reason: the fold makes `10^16` a numeral, which no overload sees. The body now says this: "`10^16` is a numeral, and `10^(-16)` stays an operation whose exponent is a numeral". The fold's conditions are now F-339's pointer (question 5): at most 4096, not negative, or a radix-point or quotient base. Meaning: the title's example is one that the claim covers; the claim is unchanged. Size: not longer than 1187. Past 600: each path's typing and fold are the reason for the title (question 2).
- **C22, F-263. Keep.** The fold sentence that the merged-diff review wrote holds (`IntegerLiteralFoldingVisitor.java:298-299`).
- **C23, F-278. Changed.** "; the stock count (3) and distance (5) do not move" moved to the history. It is a measurement on climb batch 21's base, and F-53 owns the count and the distance. Meaning: unchanged. Size: about 1560.
- **C24, F-285. Changed.** Old: "Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`, where it answered a list of its elements' run-time class; `PureList`'s, at `Library/PureList.fss:73`, still does (row 824)." New: "Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`; `PureList`'s, at `Library/PureList.fss:73`, answers a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824)." The nine `FortressLibrary.fss` lines are the head's (C24's mapping). Meaning: row 824's scope as rows.md gives it. Size: grew by about 45, after I moved out "where it answered ..." (question 3). Past 600: the sites are the gate's check (question 1).
- **C25, F-299. Keep.** It is the count's entry, and its by-type list maps each kind to its entry (question 5). The review's process finding 11 says that the revival page's `update.py` reads F-299's wording, so I left the wording as it is.
- **C26, F-304. Changed.** The team's two or three roundings, the old line `CodeGen.java:2035-2045`, the old example and "(row 862, fixed)" moved to the history (question 3). Meaning: unchanged. Size: about 560, from 840, now under 600.
- **C27 to C31, F-326, F-328, F-331, F-339, F-340. Keep.** Each holds at the head as the merged-diff review or the gather wrote it.
- **C32, F-341. Changed.** Old: "and `1/2 = 0.5` is `true`". New: "and `h = 0.5` is `true` for `h: QQ = 1/2`". The old example is a comparison of numerals alone, which folds before walk (F-339). The review's split 13 ran this one. Meaning: the example is one that the entry's conversion answers. Size: not longer.
- **C33, F-342. Keep.**
- **C34, F-343. Keep.** "sections 1, 4 and 8" names the report's numbered sections ("1. What changed and why"), so a reader finds them. The record's check reads only quoted headings.
- **C35 to C37, F-344, F-345, F-346. Keep.**

## FACTS: sentences that the landing made false or stale (C38 to C71)

- **C38 with C6, F-74. Changed.** These words are cut:
  - "F-74 is why P-76's walk half waits; F-79 is the library half, built." Walk's half is built (F-341; rows 443 and 454 fixed).
  - In the title, "it stays so until walk has the checker's static types, since without them a list of numerals and a generic's static argument take their types from the values". The magnitude default is P-173's decided default, and F-344 reads such values at their traits.

  The new title is "Under walk, an integer numeral where nothing fixes a type takes its default by its value: ... (P-173)". The citation `FortressBuiltin.fsi:125`, `:128`, `:223` is now `:128`, `:131`, `:200`. Probe Q's measurement moved to the history, and the judgement stays in the Detail. **Meaning: changed.** The title no longer says that the type by value is temporary. Its ground is P-173 and F-341. Size: about 1000, from 1609.
- **C39, F-169. Changed.** Old: "and gives an integer numeral the type `IntLiteral`, the implementations' name, where P-76 and P-174 take the Working Draft's `NaturalNumeral`, its four numbers as fields". New: "and gives a numeral the Working Draft's types `NaturalNumeral` and `RadixPointNumeral` below `Numeral`, with the numeral's four numbers as fields (P-174, F-345)". The citation `literals.tex:154-156` is now `:139 (revival-numerals, ...)`. Meaning: the revised text's content as T wrote it. Size: about the same as 1238 (question 1: the Working Draft's own text is the ground).
- **C40, F-122. Changed.** Old: "On both paths, a numeral within half an ulp of a tie is rounded as its nearest double, not as the rational that it denotes, against the specification (row 360)." New: "On both paths a numeral with a radix point at `round`, `floor`, `ceiling` or `truncate` converts into `RR64`, so one within half an ulp of a tie rounds as its nearest double, as P-172 decides: `round(2.50000000000000001)` is 2 (the guard `tests/RoundNearTieNumeral.fss`)." Meaning: the behaviour is unchanged, but it is no longer against the specification. P-172 and P-173 decide it, and the text states it. Size: grew by about 60, the owed clause. Past 600: the gates by path (question 1).
- **C41, F-128. Changed.** Old: "a declared return (row 387)". New: "a value other than a numeral at a declared return (row 387; a numeral converts there, F-341)". Meaning: the scope is narrowed to what row 387 still holds. Size: grew by about 55, the owed clause.
- **C42, F-327.** "372" is now "374". `:717-762` is now `:780-825`, and `:402-428` is now `:401-427`. Meaning: unchanged.
- **C43 to C46: F-173, F-272, F-78 and F-334.** The pointers are as in `owed.md`. Meaning: unchanged.
- **C47, F-240's history.** A note correcting the commit stage's block of 08:46Z, from the review's section 2 and its Findings. The entry's figures and sentences stay.
- **C48 to C71, the 24 re-anchored entries.** These are F-35, F-44, F-58, F-63, F-85, F-102, F-168, F-170, F-175, F-268, F-276, F-279, F-283, F-286, F-302, F-303, F-305, F-306, F-307, F-311, F-312, F-315, F-330 and F-332. Only the line numbers change, as in `owed.md`, with the range ends above. Meaning: unchanged. The same size within a digit.

## POSITIONS (C72 to C81)

These follow the curator's rule of 2026-10-31. For each one, the decision, its reach and its requirement are the same before and after.

- **C72, P-165. Not cut only.** Old: "`RR64` and `NaturalNumeral` (P-174) each declare". New: "`RR64`, `NaturalNumeral` and `RadixPointNumeral` (P-174) each declare". The citation `numbers.tex:46-54` is now `:56-73`.
  - Decision: `asFloat` leaves `Number`, and each built-in number type keeps its own. Unchanged.
  - Reach: each concrete number type. The list now names both numeral types, as the tree has them (`FortressLibrary.fsi:489`).
  - Requirement: `asFloat(x)` is unchanged at every concrete type. Unchanged.

  His to confirm: the review's finding 3, (a) as landed, or (b) the method dropped.
- **C73, P-171. Not cut only.** The pointer `constant.tex:81-85` is now `:118-122`. Decision, reach and requirement: unchanged.
- **C74, P-76. Cut only.** These words are cut: "a numeral at an `NN32` or `NN64` binding (row 454), a numeral beyond `ZZ32`'s range at an `RR64` binding (row 443), and". "Walk gaps:" now lists rows 395 and 511 alone. Decision (`NaturalNumeral`, its conversions, walk converting at each place that fixes a type), reach and requirement: unchanged.
- **C75, P-172. Not cut only.** Three edits:
  - "(row 862: the compiled path rounds two or three times)" is cut.
  - "at a binding, a parameter and a field" is now "at a binding, a parameter, a field and a declared return type".
  - "(`FortressBuiltin.fsi:44`)" is now "(`FortressBuiltin.fsi:44` at `b430f9f42`)".

  Decision (`RadixPointNumeral` holds the exact value; `QQ` exact, `RR64` and `RR32` one rounding): unchanged. Reach: the places where walk converts now include a declared return type. P-173 already names that reach ("walk converts from the exact value at the same places"). Requirement: unchanged.
- **C76, P-173. Cut only.** "through `QQ`'s `=` pair" is cut, so the text now reads "`1/2 = 0.5` is `true`". Decision, reach and requirement: unchanged. The answer `true` stands, by the fold that the same sentence states.
- **C77, P-169. Not cut only.** "leave the library" is now "left the library". "are Fortress text over its `asZZ` (F-331)" is now "left with it". Decision (no carrier is designed for the numerals' bindings), reach and requirement: unchanged.
- **C78, P-154. Cut only.** These words are cut: "; it waits until walk runs the checker (P-12) or row 364, walk's typing of a generic at its argument's run-time class, is fixed". Decision (a list is ordered only where its element type is totally ordered): unchanged. Requirement: the condition that he set for walk's half is met (row 364 is fixed), so the entry no longer states a wait. Row 774 stays open.
- **C79 to C81, P-166, P-163, P-175.** Pointers only, as in `owed.md`. Decision, reach and requirement: unchanged.

## The gap ledger (C86 to C89)

- **C86, row 893.** `changes.tex:4105-4110` is now `:4291-4292`. Two passages name row 893. The other passage, `:3050-3052`, is about walk's test of exclusion. `:4291-4292` is the Effect of the self-parameter entry: "loads a declaration that the paragraph refuses". The note's words, "applies no extender rule of P-146", mean this one.
- **C87, row 961.** `IntegerLiteralFoldingVisitor.java:148-153` is now `:373-377 at 7daf51fe8`, the prefix `-` fold at the head.
- **C88, row 965.** `FortressLibrary.fsi:2662` is now `:2707`.
- **C89, row 579.** Old: "Repair: `Integral`'s api states the three, `IntLiteral`'s api its own three." New: "Repair: `Integral`'s api states the three; the case of a numeral is not measured." The quoted message stays, as the probe printed it. The row was 1215 characters, over the template's 1,200, and it grows by about 4.

## Read and not changed: outside the changes of owed.md

For the coordinator to route. I made no change without a change of `owed.md`.

- **F-137's last sentence.** "Nor does it reach, by inference and not measured, a numeral that fits `ZZ32` passed alone for a parameter whose bound a `ZZ32` neither extends nor coerces into, since walk reads such a numeral as a `ZZ32` (P-76)." P-76 no longer says this. F-341's dispatch rule fits a numeral at its own type, then by its own type's coercions. Investigate before any new wording.
- **F-276.** "so under walk `"ab" || "cd"` stays a `FlatString` of depth 0". This holds, but the concatenation of two literals is now folded before walk (F-343), so the example no longer shows the dispatch. This is the same finding as [S10]'s for F-249. I only re-anchored its line.
- **P-76.** "the name that the compiler's prelude and the interpreter's library give the type". The interpreter's library no longer gives it (F-79). The fewest words would be "the name that the compiler's prelude gives the type".
- **P-172.** "`q: QQ = 0.5` binds and `1/2 = 0.5` is `true`". This is the same mechanism as C76: `1/2 = 0.5` folds. The answer stands.

## Decisions not taken

- **F-299's wording, kept.** The alternative is to cut the by-type list to the kinds with the largest share, as the record's rule for a count asks. That waits until `update.py` stops reading the entry's wording (process finding 11).
- **The four sentences above, not changed.** The alternatives: change each by its fewest words in this run, or route each to the next landing's pass.
- **F-74's title.** I changed its meaning by the pass's scope check. The alternative was to keep "it stays so until ..." and to ask the curator. P-173's default matches walk's, so no source keeps the old reading.

## Questions for the curator

1. P-165's list: (a) keep `RadixPointNumeral`'s `asFloat`, as landed and as the list now reads, or (b) drop the method, which changes `asFloat(x)` at that type? (The review, finding 3.)
2. The POSITIONS changes made under his rule of 2026-10-31, for his sight:
   - P-165 (list and pointer);
   - P-171 (pointer);
   - P-76 (walk gaps, cut);
   - P-172 (row 862 clause cut, declared return type added, pointer);
   - P-173 ("through `QQ`'s `=` pair" cut);
   - P-169 (the numerals' bindings, in the past tense);
   - P-154 (the wait on row 364, cut);
   - P-166, P-163 and P-175 (pointers).
