<!-- The entries writer's report of the record-landing run for climb batch 32: for each change of owed.md whose writer is `entries`, the old words and the new, whether the meaning changed, the sizes, the POSITIONS decisions before and after, and the questions for the curator. -->

# The entries writer's report, climb batch 32

## How to read this report

- `record.apply` holds 49 entry lines, each with its provenance line: 20 entries whose words change, and 29 whose line citations alone move (C19, C20).
- `clean.txt` holds the 20 entries whose words change. It leaves out the 29 citation-only entries, because a cold reader has nothing to judge in them.
- `cut-only.txt` names P-46 and P-79.
- No `rows.rewrite`: no change has a row as its home.
- This report gives each changed passage, old and new, not the whole lines. The whole old line of each entry is in `entries.md`, or printed by `facts-extract.sh 'F-N'`. The whole new line is in `record.apply`.
- A size is the entry's characters, as `record.py check` counts them. The blocks under "The changes" give the wording and the sizes of round 1. "The fix round" gives each wording that changed after it, with its new size.
- "Question N" is a question of "What an entry is" in the `coordinator` skill's `references/record.md`.

## What every entry over 600 characters keeps past the 600

Every entry below is over 600 characters. Each was over 600 before this run. The same three questions keep their sentences past the 600:

- Question 1: the conditions, the limits and the open rows. A reader would act otherwise without them.
- Question 2: the examples and the paths. A reader would misread the rule without them.
- The evidence: the tests and the report sections, which the form of a FACTS entry asks for.

Where an entry grew, its block says what it grew by and what moved out first.

## The changes

### C1, F-53

- Old: "Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285)."
- New: the sentence is cut. No other word changes.
- Meaning: one false sentence removed. Ground: row 731 is FIXED by `d159b71975` (F-364).
- Size: 1489 to 1376.

### C2, F-240

- Old: "ran at a start load of 0.31, against 128 s (83 s) at 0.14 at climb batch 30's"
- New: "ran at a start load of 0.31 and beside the first minutes of `testFast`, so its time is one under load, against 128 s (83 s) at 0.14 at climb batch 30's"
- New in the Detail: "`reviews/batch-32-review.md`, section 4;" before the other reviews.
- Meaning: one condition added, that the 165 s is a time under load. No figure changes. Ground: the review, section 4.
- Size: 2030 to 2145. It grew by the clause and its Detail pointer. Nothing moved out first: the brief keeps every other sentence of this entry as the commit stage wrote it.

### C3, F-58

- Old: "that was tied between `RR64`'s and `QQ`'s product until the numeral rule resolved it at `RR64` (F-366; row 989, closed), as at `MicroGptFlatQuick.fss:40`."
- New: "which that tree's checker left tied between `RR64`'s and `QQ`'s product, as it left `MicroGptFlatQuick.fss:40`."
- Old: "The top-level tuple bindings of lines 17 to 19 compile (F-369; row 988, closed), and with their names typed, line 77's `beta1 m` is a site that row 474 hid; the counts above are those before climb batch 32."
- New: "No run has counted the sites since `832f7d0d91`, and two changes of the checker move `MicroGptFlat`'s. It now takes both numeral lines at `RR64`'s product (F-366). It now types the names of a top-level tuple binding, and lines 17 to 19 compile (F-369): by one run of that change alone, line 41's `if` of pairs is no longer a site, and line 77's `beta1 m`, an `RR64` times an unsized array, is a new one."
- Old: "The checker stops a block at its first failing statement (row 474)."
- New: "The checker stops a block at its first failing statement, so each count is a floor."
- New in the Detail: "`compile-ladder/rung-tuple-binding/REPORT.md`, "Programs run old against new"".
- The title and every count stay.
- Meaning: unchanged for the counts. One fact added from its ground: line 41's site is gone in the run of the tuple-binding change (`rung-tuple-binding/REPORT.md:104-107`). The sentence on a block's first failing statement keeps its claim and loses its pointer to a closed row. The claim's evidence is the switch rehearsal's section, which the Detail names.
- Size: 1924 to 1947. It grew by the sentences on what moved since the count. Moved out first, by question 4: the per-file breakdown of the 17 ("`FlatArrays` 7, `FlatData` 1 ..., `MicroGptFlat` 8, `MicroGptFlatQuick` 1"), which the switch rehearsal's section holds; and the kinds of `FlatArrays`' other 8 sites, which "1. The counts" holds.

### C4, F-59

- Old: "(F-364; row 731, closed)". New: "(F-364)".
- Old: "Walk runs such a call: it instantiates the big operator". New: "Walk instantiates the big operator".
- Meaning: unchanged. "Such a call" pointed to the refused call, which the entry no longer states.
- Size: 1479 to 1441.

### C5, F-221

- Old: "an F-bounded one takes the expected type, else the type of its body (F-364)"
- New: "one whose bound names its parameter takes that type, else its body's (F-364)"
- Meaning: unchanged. The record's other entries call this big operator "one whose bound names its parameter".
- The review's point on a reduction written as a call's argument is not added here: F-364 states it.
- Size: 859 to 860.

### C6, F-285

- Old: "The library follows P-78's workaround for row 731:". New: "It follows P-78:".
- Old: "So the distance holds no site of rows 731 and 632, and the checker now fixes an unwritten argument of such a big operator itself (F-364; row 731, closed)."
- New: "So the distance holds no site of an unwritten argument or of the fused arm. The checker now fixes such an unwritten argument itself (F-364); the library's sites stay written."
- Citations of `Library/FortressLibrary.fss`: `:4580`, `:4586` to `:4581`, `:4587`; `:2719`, `:3105`, `:3110` to `:2720`, `:3106`, `:3111`; `:4764`, `:4781` to `:4765`, `:4782`; `:1585` to `:1586`; `:2739` to `:2740`. I read each new line in the worktree.
- Meaning: unchanged. Rows 731 and 632 are both FIXED, so the sentence names what each held, not its number.
- Size: 1696 to 1682.

### C7, F-341

- Old: "Dispatch fits it as it is at its default, unless its own coercion reaches a declaration strictly below (F-366), then by its own type's coercions only, and reads a tie at the default"
- New: "Dispatch fits it at its default, or at a declaration strictly below that its own coercion reaches (F-366), else by its own type's coercions only, and reads a tie at the default"
- Old: "the numeral going to `QQ`'s `=` by its own coercion in place of the library's `=` over `Any`"
- New: "by `QQ`'s `=`, which the numeral reaches by its own coercion, not the library's `=` over `Any`"
- Meaning: unchanged.
- Size: 2262 to 2259.

### C9, F-349

- Keep. Its last sentence agrees with F-366, and the sorter read its two citations of `OverloadedFunction.java` in the worktree. No line in `record.apply`.

### C10, F-362

- Old: "and an infix or postfix use of either sign, and `opr ∑` in an import's list, is a `Syntax Error` (row 42)"
- New: "and an infix or postfix use of either sign is a `Syntax Error`, as is `opr ∑` in an import's list, which is a gap (row 42)"
- Old: "It means that the model's sums and its `^T` can be written in the specification's form on both paths."
- New: "So on both paths a model line can write `∑` for `SUM`, and the helper file's api can declare `^T`; no test applies the sign to an array."
- Meaning: narrowed in two places. Row 42 holds only the import list's refusal, so the row's number now stands at that clause alone. The limit of the tests is new. Ground: the review, section 3, "The diffs that the landed tree makes possible".
- Size: 1004 to 1062. It grew by those two clauses.

### C11, F-363

- Old: "after a dotted method call parses too;". New: "after a dotted method call parses too, which no test asserts;".
- Old: "For the work: a model line". New: "So a model line".
- The paths of `Expression.rats`, `Evaluator.java` and the three tests lose `ProjectFortress/src/com/sun/fortress/` and `ProjectFortress/`, as the `fortress-repo` skill writes them.
- Meaning: one limit of the evidence added. Ground: the review, section 2, S1.
- Size: 1831 to 1721.

### C12, F-364

- Old: "P-78's workaround for row 731 stays in the library and the model."
- New: "the library and the model still write it (F-285, F-59)."
- Old: "A big operator with two or more static parameters is still refused (row 1007)."
- New: the same, and ", and where the bound names its parameter, a type error in an unwritten reduction's body is reported as the big operator's refusal (row 1015)."
- Old: "The library's three sites unwritten give 3 errors on the base and 0 on the tree; `explorations/run-c4/src/MicroGptFlat.fss:43` unwritten, 43 errors on the base and 42 on the tree, the one gone at `:43`."
- New: "Observed once, in copies with the argument removed: the library's two `BIG MIN` sites and its list comprehension (F-285), and `explorations/run-c4/src/MicroGptFlat.fss:43`, give no error."
- The path of `Functionals.scala` loses its prefix.
- Meaning: unchanged, with one open row named. The base's counts go to the history, by question 3; "5. Old against new" holds them.
- Size: 1908 to 1987. It grew by the clause on row 1015.

### C13, F-365

- Old: "So the compiled half of the model's row lift, `rows(rmsn, x)` with a sized `rmsn`, has its checker."
- New: "The test passes a sized generic function to a callee that is not generic; no test compiles the form of the model's row lift, `rows(rmsn, x)`, a generic callee whose sizes its other argument fixes."
- Old: "as at a parameter of type `Any` (row 1012)."
- New: the same, and ", and a functional method of a generic trait passed as a value inside the trait (row 1013)."
- The path of `Functionals.scala` loses its prefix.
- Meaning: narrowed. The old sentence let a reader conclude that the model's row lift compiles. Ground: the review, section 3, item 2: "No test compiles a generic function passed to a generic callee whose sizes the other argument fixes, the form of the row lift." `owed.md` does not name this sentence; the pass's scope check found it.
- Size: 2265 to 2415. It grew by the clause on row 1013 and by the narrowed sentence.

### C14, F-366

- Old title: "A numeral at a call goes to the most specific declaration that takes it, on both paths: a declaration that only the numeral's own coercion reaches runs in place of the one that fits the numeral at its default where its declared parameter types lie strictly below, by subtyping; otherwise the one that the default fits runs."
- New title: "On both paths a numeral at a call leaves the declaration that fits it at its default only for one that its own coercion reaches and whose declared parameter types lie strictly below, by subtyping."
- Old: "It builds P-46."
- New: "It builds P-46's rule for a numeral at a call; P-46 does not word the order, and the worker that built the rule chose subtyping."
- Old: the two sentences on the checker's comparison, walk's dispatch cache and `Numerals.rangeKey`.
- New: "The checker compares only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, so a call such as `i + 1` costs nothing more; the report gives walk's dispatch cache."
- The paths of `Functionals.scala` and `OverloadedFunction.java` lose their prefix.
- Meaning: unchanged for the rule. One fact added: a worker chose the order. Ground: the review, finding 2, and `history:P-46`, which says that the curator "did not word the dispatch rule".
- Size: 2890 to 2527. Moved out, by question 4: the detail of walk's dispatch cache, which "1. What changed and why" of the rung's report holds.

### C15, F-367

- Old: "so `pick(twice)` now runs an arrow-typed `pick` where it ran `pick(x: Any)`"
- New: "so `pick(twice)`, for an overloaded `twice` with a generic declaration, runs the `pick` declared over an arrow type and not `pick(x: Any)`, which no test pins"
- Meaning: unchanged, with the limit of the evidence added. Ground: the review, section 2, F.skeptic.1.
- Not written: the clause on a declared arrow return type and on a field. It waits for a run.
- Size: 1868 to 1951.

### C16, F-368

- Old: "So a table of the model can be a top-level literal with a declared type, as `shp: ZZ32[9] = [...]`, under walk; the compiled path is not touched."
- New: "So under walk a table of the model can be a top-level literal with a declared type, as `shp: ZZ32[9] = [...]`; the code generator compiles no array literal (the `fortress-repo` skill's `references/compiler.md`), so such a line does not compile."
- Meaning: one consequence stated. "Not touched" let a reader think that the line compiles as before. Ground: the review, finding 3.
- Size: 1218 to 1317.

### C17, F-369

- Old: "is a checker site against the one library that row 474 hid." New: "is a new checker site against the one library (F-58)."
- Old: "a wildcard binds nothing, and a binding of wildcards alone never evaluates its right side (row 1011)."
- New: "a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011)."
- Old: "is still unchecked (row 1029)."
- New: the same, and ", and a typed tuple binding over an `if` with tuple branches stops the code generator (row 1031)."
- The paths of `Decls.scala` and `CodeGen.java` lose their prefix.
- Meaning: unchanged, with row 1011's whole subject and row 1031 named.
- Size: 1668 to 1778. It grew by those two clauses.

### C18, F-280

- Old title: "The library's `=/=` and three-argument `assert` see ...". New title: "The library's `=/=` over `Any` and its three-argument `assert` see ...".
- Old: "(`Library/FortressLibrary.fss:98`, `:307`)". New: "(`Library/FortressLibrary.fss:98`, `:308`)".
- New sentence, after the sentence on row 807: "A type that extends `Equality` reaches `Equality`'s own `=/=` before the one over `Any`: the negation of its `=` (`:102`; F-366)."
- Meaning: the scope of the title narrowed to the `=/=` over `Any`, and one fact added. Ground: `Library/FortressLibrary.fss:98-103`, read in the worktree. The sentence on the three-argument `assert` keeps its words.
- Size: 723 to 868. It grew by the new sentence.

### C19, the moved line citations in FACTS

28 entries, each with its citations repointed and no other word changed. For each file I took the hunks of `git diff -U0 db352c177 c0c35b4f9`, computed each new line, and compared the old line at the base with the new line in the worktree. Each pair is equal.

- `Library/FortressLibrary.fss`, one line added at 102, so every line from 102 on moves by one: F-44, F-85, F-254, F-279, F-286, F-302, F-303, F-305, F-306, F-307, F-312, F-324, F-327, F-330, F-332, F-356.
- `Library/FortressLibrary.fsi`, one line added at 75: F-35, F-44, F-63, F-79, F-276, F-286, F-324.
- `Functionals.scala`: F-78 `:781-785` to `:962-966`; F-334 `:761`, `:771-776`, `:809-828` to `:942`, `:952-957`, `:1036-1056`.
- `CoercionOracle.scala`: F-334 `:350-369` to `:352-371`.
- `TypeAnalyzer.scala`: F-48 `:544-551` to `:548-555`; F-121 `:1023` to `:1032`; F-235 `:597-617`, `:408-439`, `:985-1015` to `:601-621`, `:412-443`, `:994-1024`.
- `Specification/basic/inference.tex`: F-173 `:237-299`, `:399-460`, `:45-122` to `:284-346`, `:447-511`, `:45-125`.
- `Specification/appendices/changes.tex`: F-175 `:3345-3541`, `:1616-1619`, `:3611-3618` to `:3464-3660`, `:1674-1677`, `:3730-3737`.
- `Specification/basic/conversions-coercions.tex`: F-272 `:527-543`, `:607` to `:558-574`, `:641`.

Meaning: unchanged in each.

Three points differ from the review's count:

- The review names 29 entries, and its tool is not in the worktree. I found 28, and F-280 and F-285, which C18 and C6 hold.
- F-48 is not in the review's list. Its citation of `TypeAnalyzer.scala` moved by four lines.
- In F-173, the range `:399-460` held four lines that the landing rewrote (403 to 406). The new range `:447-511` starts and ends on the same two lines of text.

I searched only citations written in backticks with a line number. A citation written in words, such as "lines 100 to 120", is not found by this search.

### C20, P-154 and P-166

- P-166. Old: "(`Library/FortressLibrary.fss:648`)". New: "(`Library/FortressLibrary.fss:649`)", the line of `value object Ratio` in the worktree. No other word changes. The decision, its reach and its requirement are the same before and after.
- P-154. Keep, no line. Its two citations name a commit: "`a874948ac:Library/FortressLibrary.fss:1735-1741`" and "`a874948ac:Library/List.fsi:67`". A line of a named commit does not move. The review's reason for this change is wrong for P-154.

### C23, P-78

- Old: "The compiled checker fixes it from neither the generators, the body nor a declared type that receives the value, and refuses every such `SUM` or `PROD` that leaves it out (row 731, a gap of the checker). Row 731's workaround is to write it in every clause form of `SUM` and `PROD`, as in `SUM[\ZZ32\][j <- 0#n] f(j)`."
- New: "The compiled checker fixes it from the reduction's expected type, else from the type of its body, where a `SUM` or `PROD` leaves it out (F-364). It is written as in `SUM[\ZZ32\][j <- 0#n] f(j)`."
- Not cut only: the first sentence has new words.
- The decision, before and after: `SUM` and `PROD` are one generic reduction each over the library's algebra, and take their identity from the static argument.
- Its reach, before and after: every `SUM` and `PROD`; the clause forms write the argument, and a sum without generators writes none.
- Its requirement, before and after: "A reduction written with generators writes its static argument where nothing at the call fixes the element type."
- Size: 1395 to 1272.

### C24, P-79

- Old: "The compiled checker refuses `trips.fss` (row 817), and the reductions that leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731)."
- New: "The compiled checker refuses `trips.fss` (row 817)."
- Cut only.
- The decision, before and after: every team demo is kept running as the tree changes.
- Its reach, before and after: the programs in `ProjectFortress/demos/`.
- Its requirement, before and after: the batch that breaks a demo rewrites it where the way is known.
- The entry claims nothing new: no run shows which demos the checker now accepts.
- Size: 1032 to 857.

### C25, P-46

- Old: "Rows 973 and 966: walk answers `false` for `u = 0`, and `true` for `u =/= 0`, which follows `=`."
- New: the sentence is cut.
- Cut only.
- The decision, before and after: a conversion only makes a call possible, except a numeral's own conversion at a call.
- Its reach, before and after: every overloaded call on both paths.
- Its requirement, before and after: `u = 0` is `true` for `u: NN32 = 0`, by the rule of way B.
- The sentence on a value typed `Any` or `Number`, and the words "the most specific", stay as they are (C27, C28).
- Size: 2454 to 2357.

### C26, P-173

- Old: "(P-46 gives the rule and its ground; rows 973 and 966 hold where walk departs)"
- New: "(P-46 gives the rule and its ground; row 1016 holds where walk departs, and row 1017 where both paths do)"
- Not cut only.
- The decision, before and after: a numeral converts where it stands, into the type that its place fixes, else into the machine default.
- Its reach, before and after: every numeral, on both paths.
- Its requirement, before and after: a numeral argument goes to the most specific declaration that takes it, with its default as the last resort.
- Size: 3534 to 3561.

## The fix round

`check.md` passes every change of mine, C1 to C26. Its two failures, C65 and C88, are the routing writer's. `mech-1.md` passes every check. So this round fixes only passages that the cold reader read two ways or could not resolve. Each new wording below replaces the round 1 wording that the blocks above quote. "Meaning: unchanged" holds for each, except where a line says otherwise.

- F-240, the clause of C2. Now: "ran at a start load of 0.31, then beside the first minutes of `testFast`, so its time is one under that suite's load". The reader could not tell which load was meant. Size: 2160.
- F-58. "the report lists the other 8" now names the report: "`model-closure-check.md` lists the other 8". Size: 1961.
- F-59 and F-285. "fixed" and "fixes" read as "repaired". Now: "before the checker inferred an unwritten argument (F-364)" and "The checker now infers such an unwritten argument itself (F-364)". Sizes: 1444 and 1683.
- F-341. Now: "Dispatch fits it at its default, unless its own coercion reaches a declaration strictly below, which then runs (F-366), else by its own type's coercions only". The round 1 wording did not say which of the two runs; the checker remarked on it too. Size: 2272.
- F-362. Now: "The build after a grammar edit regenerates the two tracked parsers, ..., and the edit's commit holds them." The reader read the old sentence three ways. Ground: `compile-ladder/rung-parser-declarations/REPORT.md:163`. Size: about 1106.
- F-363. Now: "a superscript after a subscript that is a math item of its own, `x[5]^2` or `B.f()[5]^2`, still fails on both paths (row 1 under walk, row 1005 compiled); in `B.data[5]^2` the subscript is part of the dotted primary." The reader saw a contradiction between `B.data[5]^2`, which runs, and `B.f()[5]^2`, which fails. Ground: `compile-ladder/rung-superscript-after/REPORT.md:65`, `:124` and `:133`. Size: 1798.
- F-364. Now: "where the big operator typed alone has an instance (a plain bound, or no static parameter)". Ground: the rung's report, "Step 1, row 731: the reduction", point 1. Size: 2033.
- F-365. Now: "such as one that only the function's return type mentions". "Among them" had no referent. Size: 2423.
- F-366, three passages. Size: 2633, still below the base's 2890.
  - "The order between the declaration that the default fits and one that the coercion reaches is subtyping on the declared parameter types".
  - "Where a call reaches two declarations only by coercion and they are not ordered, the one whose parameter the numeral's default fits as it is runs". Ground: the rung's report, section 1, on `numeralTie`.
  - "the report says which choices walk keeps in its dispatch cache".
- F-367. Now: "... and not `pick(x: Any)` (`...OverloadedFunction.java:2970`); no test pins this choice." "Which" could point to `pick(x: Any)` alone. Size: 1957.

Passages that the cold reader marked and that stay as they are:

- Every marked passage of F-53, of F-240 outside my clause, and of P-46, P-78, P-79 and P-173. The brief lets me change only the sentence that each change names.
- F-58's title in the present tense. It is decision not taken 1 below.
- P-78, "when must the argument be written". It is question 1 for the curator below.
- F-341's "its own type's coercions" and "a store keeps its default alone"; F-368's "stays a paste"; F-285's "twelve components", which agrees with F-53's "twelve, and `List`'s two imports". No source that I read settles a better wording, and the batch did not touch them.
- F-369's "not at load as under walk" beside F-368's "when the cell is first forced". The review states both (its section 1, "What the two paths still do differently"); F-368 tells how walk serves a reader above the declaration.

For the skill writer, from the cold read: the `fortress-repo` skill's `references/library.md` still says that the checker refuses a reduction without its static argument (row 731). F-59 and F-364 now say the opposite. `owed.md` already lists this line under "For the coordinator".

## Decisions not taken

1. F-58's title says "has 42 distinct error sites" in the present, and the body now says that two changes moved the sites.
   - Taken: the title stays, as `owed.md` asks, until a run counts the merged tree.
   - The alternative: bound the title to `832f7d0d91`.
2. F-366 says "on both paths" and does not say how walk came to have the rule.
   - Taken: no word on it. `owed.md` names only the reading of "most specific" for this entry.
   - The alternative: one clause that walk's half was built at a default of the batch's plan, beside P-59.
3. F-362 keeps "A grammar edit regenerates the two tracked parsers".
   - Taken: the sentence stays. I did not find it in the `fortress-repo` skill.
   - The alternative: move it to the skill's `references/toolchain.md` and cut it here. This is for the skill writer.
4. F-221 keeps "now runs it, not the binary one". The word "now" tells a change that is older than this batch, so I left it.

## Questions for the curator

1. P-78 asks a reduction with generators to write its static argument "where nothing at the call fixes the element type". The checker now takes an unwritten argument from the reduction's expected type, else from its body. Does the requirement still ask the model's line 43 to write `SUM[\ZZ32\]`? The diff of line 43 is already put to you with the model's other diffs.
2. F-366 now says that a worker chose subtyping as the order of "most specific". Finding 2 of the review puts that choice to you. If you confirm it, the sentence on the worker's choice leaves F-366, and P-46 gains the order.

## For the skill writer

- The detail that left F-366: walk keeps each choice of a numeral's declaration in its dispatch cache, except a choice that asked a type of a program's own for its numeral coercion; the cache's key tells a negative constant from a numeral of the same default. The rung's report holds it. `references/interpreter.md` does not.
