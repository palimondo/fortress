<!-- The entries writer's report for climb batch 35's landing: for each change of owed.md whose writer is entries, the old and the new words, the meaning, the length and the questions. -->

# The entries writer's report, climb batch 35

The files: `record.apply` (17 entry lines, 2 noted blocks), `rows.rewrite` (17 rows), `rows.add` (1 new row), `clean.txt` (the 17 entry lines and the 18 row lines). There is no `cut-only.txt`: each POSITIONS change adds words.

Each entry line in `record.apply` equals the entry in the record except for the words below. A word diff of the 17 lines against `FACTS.md` and `POSITIONS.md` showed no other change. Lengths are those of the whole line, before and after.

## FACTS and POSITIONS

### C3, F-88 (646 to 594 characters)

- Old: "The code generator compiles `override` by the same reading, and the checker refuses one that overrides nothing (F-400)."
- New: "The code generator compiles `override` by the same reading (F-400)."
- Meaning: unchanged. F-400 states the checker's refusal. The entry is back under 600 characters.

### C5, F-240's history only (a noted block)

- The entry's text is kept. The commit stage named no sentence false.
- The note records two limits. First, the gate ran on a 2.30 GHz CPU and climb batch 34b's on a 2.10 GHz CPU, so the comparison "against 176 s (108 s) at 0.22" compares two CPUs. Second, the count stage's 73 to 75 s lies below the "about 90 s" from which the sentence on the rise starts.
- Meaning: unchanged.

### C10, F-351 (1894 to 1900)

- Old: "commits the transaction on an exit, a `LabelExit`, and throws the exit on (F-401), a commit that fails taking the abort path, and throws everything else on"
- New: "commits the transaction on an exit, a `LabelExit`, and throws the exit on, or takes the abort path where that commit fails (F-401), and throws everything else on"
- Meaning: unchanged. The clause now has its verb. It grew 6 characters by that clause alone.
- Over 600: kept by question 1 (each step of the handler changes what a reader expects of a compiled transaction).

### C17, F-397 (1045 to 1175)

- Added: "It builds P-174's digit count."
- Old: "A message that quotes the numeral shows it as written, and a folded `MIN`, `MAX` or `|x|` that answers a written radix-point operand keeps its text, so its numeral type in a checker message counts the operand's zeros."
- New: "A message that quotes the numeral shows it as written. A folded `MIN`, `MAX` or `|x|` whose answer is a written radix-point operand keeps that operand's text, so its numeral type in a checker message counts the operand's zeros; a folded `+` takes its value's digits. This rule for folded constants is a worker's choice, not a decision of the curator; no coercion reads a folded constant's numbers (P-174)." (fix round)
- Test and report paths shortened to the record's form (`tests/...`, `compile-ladder/...`).
- Meaning: the entry now says that the folded operand's text is a worker's default (R.worker.1, `PLAN.md:936`), and names the decision that it builds (P-174; the rung's report: "where P-174 and `literals.tex:101` make `n` 3"). The queue's rule records a default that is not consequential in FACTS.
- Over 600: the new sentences pass question 1, since a reader who sees a checker message with the zeros counted needs to know it is intended. Nothing was moved out first, and the paths were shortened.

### C18, F-398 (1522 to 1744)

- Added after the sentence on a numeral at its declared type: "Where such a right side does not convert to the names' types, walk's message names the temporary, not the name, as 'Type mismatch binding (5,6) ... to *tuple_<span> (type (NN32,String))'; this message is a worker's choice, not a decision of the curator." (fix round)
- Meaning: one claim added, W.reserved.4's default, from `PLAN.md:938`, `rung-walk-subscript-tuple-binding/JUDGE.md:57` and `SKEPTIC.md:79`. No other entry or row held it.
- Over 600: the entry grew by that clause only. It is kept by question 1, because a reader who meets the message must not take `*tuple_<span>` for a defect of the program.

### C19, F-399 (1327 to 1357)

- Old: "The method is an instance method of the receiver's class, self in local 0 and the other arguments after it in their order; `OverloadSet.argumentLocal` ..."
- New: "The method is an instance method of the receiver's class, with self in local 0 and the other arguments after it in their order. `OverloadSet.argumentLocal` ..."
- Old: "A call reaches the method where ..."; new: "A call reaches the dispatch method where ...".
- Old: "Not reached: a generic functional method ..."; new: "It does not reach two forms: a generic functional method ...".
- Meaning: unchanged. Row 594's clause stays. It is where the batch record puts S's limit, with C40.
- Over 600: kept by questions 1 and 2. The wording grew by 30 characters, which the missing nouns cost.

### C20, F-400 (1773 to 1774)

- Old: "Two forms stay code-generator walls, an override ... (row 1106); the checker refuses an override ... (row 1107) and checks none in an object expression (row 1108); under walk an object's override ... (row 1109)."
- New: "Two forms stay code-generator walls: an override ... (row 1106). The checker refuses an override ... (row 1107), and does not check an override in an object expression (row 1108). Under walk an object's override ... (row 1109)."
- Meaning: unchanged. One sentence of four rows is now three sentences, and each clause is kept. The repair's wording of the row-1107 clause is kept word for word.

### C21, F-401 (1313 to 1336)

- Old: "Neither path tells an exit to an enclosing label from one to a completed label block, so the latter commits the blocks it passes too (row 1041)."
- New: "Neither path tells an exit to an enclosing label from one to a label block that has completed, so such a late exit also commits the atomic blocks it passes (row 1041)."
- Meaning: unchanged. The sentence states the tree. The curator's question on it stays with review-queue item 562, and no word of his is in the entry.

### C24, P-174 (2571 to 2845)

- Old: "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause."
- New: "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause. The tree departs too, with no row, where the numeral coercions of the one library and of many tests call a getter on the four numbers, as `v.asZZ32`, and where the checker and the literals chapter read each of the four as a `ZZ` value wherever it stands (F-342, F-345)."
- Checked against the tree: `Library/FortressLibrary.fss:388-389`, `:847`, `:954`, `:1065`; `literals.tex:186-188`. Thirteen test files write such a getter in a coercion's body, not only rung R's two.
- Not cut only. The sentence is brought in line with the tree by the curator's rule of 2026-10-31.
- The decision, before and after: a numeral's type exists only at compile time, and every number type takes a numeral through a coercion generic over the four numbers. Unchanged.
- Its reach, before and after: every number type, the library's too. Unchanged.
- Its requirement, before and after: a coercion's body is a computation at compile time, with no method invocation; a number used as a value there converts where it stands. Unchanged.

### C25, P-40 (1962 to 2032)

- Old: "a numeral type's four static parameters have none, and read as values are `ZZ` (P-174)"
- New: "a numeral type's four static parameters have none, and read as values convert where they stand, as a numeral does, a `ZZ` where nothing fixes a type (P-174)"
- Not cut only. The clause restated P-174 as it stood before `be43ddc647`. It follows his "YES!!" of 13:0x UTC on 2026-11-23.
- The decision, before and after: sizes are checked, and a size that inference leaves unknown is an error only where it is used. Unchanged.
- Its reach, before and after: `nat` and `int` static parameters used as sizes; the bound is for the sizes of arrays, vectors and matrices. Unchanged.
- Its requirement, before and after: the checker refuses a size beyond `NN32` or `ZZ32`, and a JVM array checks its length. Unchanged.

### C26, P-173 (3561 to 3616)

- Old: "and a `nat` parameter used as a value is a `ZZ32` where it is a size (P-40), and a `ZZ` where it is one of a numeral type's four numbers (P-174)."
- New: "and a `nat` parameter used as a value is a `ZZ32` where it is a size (P-40), and, where it is one of a numeral type's four numbers, converts where it stands, a `ZZ` where nothing fixes a type (P-174)."
- Not cut only. Same ground as C25.
- The decision, before and after: a numeral converts where it stands, into the type its place fixes, or into the machine default. Unchanged.
- Its reach, before and after: every numeral, and a literal after the fold. Unchanged.
- Its requirement, before and after: the conversion is exact or rounds once, and the default is `ZZ32`, `ZZ64`, `ZZ` or `RR64`. Unchanged.

### C27, F-342 (1816 to 1880)

- Old: "It builds P-173's checker, P-174's written-only rule and four numbers, and P-40's size value;"
- New: "It builds P-173's checker, P-174's written-only rule and P-40's size value, but not P-174's four numbers, which P-174 converts where they stand (no row);"
- Meaning: the entry no longer claims that it builds what P-174 now asks of the four numbers. The checker's reading, in the sentence before, is unchanged.

### C28, F-345 (1580 to 1648)

- Old: "... read as `ZZ` and folded, one value per place."
- New: "... read as `ZZ` and folded, one value per place; P-174 instead converts each of the four where it stands (no row)."
- Meaning: one clause states that the text departs from P-174 since its rewrite. The title is unchanged.

### C29, F-323 (1115 to 1185)

- Old: "another number type writes `asFloat(x)` (P-165)."
- New: "another number type writes `asFloat(x)`, where P-165 names the getter `x.asRR64`, which no type declares (no row)."
- Meaning: the tree's sentence stays. The pointer now says how P-165 differs from it.

### C30, F-324 (1080 to 1169)

- Old: "It builds P-160's second step and P-165."
- New: "It builds P-160's second step and P-165, but for P-165's name: the types declare `asFloat`, not the getter `asRR64` (no row)."
- Meaning: the claim is narrowed to what the tree builds.

### C31, F-396 (1946 to 2163)

- Old: "The library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first."
- New: "The track compiles the fourteen first since its programs use them. The checker's choice at a tie among the most specific declarations follows the JVM's identity-hash order (row 935), but a tie that self's type makes in a trait whose `comprises` clause lists types keeps the trait's own declaration in any order (row 1100)."
- Meaning: the false sentence is replaced by the two facts of the review and the repair. The order dependence of row 1100 is gone. The other ties keep it.
- Over 600: kept by question 1, since a reader of the track must not trust the compile order as a guard. The entry grew by 217 characters, the change's own clauses. Nothing was moved out first: the entry's other sentences each name a departure at its row.

### C32, F-354's history only (a noted block)

- The entry's text holds and is kept.
- The note records the second instance: at climb batch 35's first gate, one build compiled `QQ`'s `denominator(self)` call at `(Ratio)` in ant's JVM and at `(QQ)` in one-JVM runs. The site was the checker's tie (row 1100), not the code generator's order (row 996).
- Meaning: unchanged.

### C33, F-281

- Old: `OverloadingChecker.scala:766-773`. New: `:828-831`, where `isCheckedName` stands at the landing (read).
- Meaning: unchanged.

### C34, F-366

- Old: `Functionals.scala ... :1117`. New: `:1143`, where `numeralAttempt.flatMap(resolved(_, true)).orElse(resolved(es, false))` stands at the landing (read). `:980-1021` and `:1066` are kept, as the sort reads them.
- Meaning: unchanged.

## The ledger

### C36, row 1100 (notes 664 characters)

- Added to the notes: "The test guards that fix only under `-XX:hashCode=0`: in the default hash mode it passed on the unfixed code, 'OK (3 tests)'."
- Meaning: one note added (REPAIR, "Tests").

### C37, a new row in section 5 (`rows.add`)

- Claim: a call on `self` in a trait whose `comprises` clause lists types, at a tie between the trait's declaration and a listed type's, takes the trait's declaration and its return type. The specification takes the listed type's, the more specific one, whose return type may be narrower.
- Status `NEGATIVE-VERIFIED`; class `implementation gap (checker)`; spec citation `basic/overloading.tex`, "Overloading Resolution"; reproducer `none`; found by "climb batch 35 gate repair"; siblings 1100, 815 and 935.
- The notes give the mechanism, the evidence (REPAIR, "The site", the runs of the instrumented and reversed copies, and "Deviations from the ruling", 3), that the tied declarations of both libraries return one type, and the link to row 815. They name no plan, rung or fork. Notes about 666 characters (fix round).

### C38, row 815 (row 1196 characters, notes about 685)

- Added: "Since `b7b5b0c02b` a call on `self` in the trait dies too: '\=width{...}(SelfGetterValueProbe$Solid)' (`climb-batch-35/REPAIR-gate.md`, "Deviations from the ruling", 4)." Sibling 1100 is added.
- Cut to fit the limits, with the marker "full text: history, row 815":
  - "(once `(R)` on a first compile)";
  - "Old code (`aa5c67d48`) the same.";
  - "So did the one library's QQ and Ratio `denominator`: `(Ratio)` once FortressLibrary was compiled again alone, a VerifyError in `isFinite`."
- Meaning: the second form is added. The cut sentence on `QQ` and `Ratio` named a `VerifyError`, which row 1100 now explains as the checker's tie. See the decisions not taken.

### C39, row 935 (notes about 690)

- Old: "since row 929's fix a tie keeps the first minimal candidate in it (`Functionals.scala:831-836`)."
- New: "a tie keeps the first minimal candidate in it (`Functionals.scala:831-836`, row 929), but one that self's type makes in a trait that comprises types keeps the trait's own (row 1100, since `b7b5b0c02b`)." Sibling 1100 is added.
- To fit 700 characters, the shuffle numbers and the base build's path are condensed ("three stop the base build, six of 100 to 125 the worktree's build"), and the folder `compiler_tests/` is dropped twice. The marker is "full text: history, row 935".
- Meaning: one exception added; the rest unchanged.

### C40, row 594 (notes about 693)

- Added: "Not the dispatch method's site: since its fix (`1db0e878c8`, row 573) the reproducer dies with the same message."
- To fit, the quoted message is cut to its ends, and `CodeGen.java`'s path is shortened. The marker is "full text: history, row 594" (the row held it already).
- Meaning: one note added.

### C41, rows re-anchored by content at `0a83a70498`

- Row 119: `DesugarerVisitor.java:1547` to `:1576` (`translateEnsures`), and `:1565-1569` to `:1594-1598`.
- Row 406: `CodeGen.java:6085-6108` to `:6795-6817` (the `BoolArg` branch to the throw).
- Row 470: `Functionals.scala:1191` to `:1774` (`staticInstantiation` for a top-level overloading).
- Row 526: `CodeGen.java:2022` to `:2478` (`forTry`).
- Row 724: `:4375` to `:4989` (`forObjectDeclPrePass`), `:4666` to `:5331`, `:6897` to `:8682`.
- Row 764: `Functionals.scala:1152` to `:1735` (the `normalizedSchema` call of the method invocation; the same line at `c124c6b65`).
- Row 835: `OverloadingChecker.scala:848-852` to `:910-914` (`coverOverloading`'s filter).
- Row 889: `CodeGen.java:6051` to `:6760` (the arrow branch).
- Row 983: `CodeGen.java:5126` to `:5563` (`getFreeVars`).
- Row 995: `CodeGen.java:6306-6312` to `:6388-6394`.
- Row 1088: `CodeGen.java:7209-7234` to `:7291-7316` (`emitBodyGivenBy`).
- Row 1103: `CodeGen.java:5100-5106` to `:5182-5188` (`forClinit`, `ONLY`).
- Kept, and the reason for each:
  - Row 377: its citation stands in the sentence "at c124c6b65 stops ..., thrown at `CodeGen.java:2874`", and the line held that throw at `c124c6b65` (read).
  - Row 480: "`Functionals.scala:1396-1402` ... at c124c6b65" is bounded in its parenthesis.
  - Row 876: the sentence ends "at c124c6b65", and `:5028-5033` held the `compute` code there (read).
  - Row 1043: "`Functionals.scala:1304-1356` ... at c1ce2a35e1" is bounded in its parenthesis.
- Meaning: unchanged in every row.

## Decisions not taken

- F-88. The sort proposed "The code generator compiles `override` (F-400)." I kept "by the same reading", which ties the sentence to the entry's subject. The alternative is the sort's shorter words.
- "(no row)" in F-342, F-345, F-323, F-324, and "with no row" in P-174, as the check corrected "no row yet" (a plan word). The alternative is to drop them, and let each sentence state only the departure.
- Row 815's sentence on the one library's `QQ` and `Ratio`. I cut it to fit the new note, with the history marker. Alternatives:
  - keep it and cut the report pointer "Program and outputs: ..." instead;
  - rewrite it as "The one library's `QQ` and `Ratio` `denominator` is an instance (REPAIR, 'Deviations', 4)."
- The new row's status. I chose `NEGATIVE-VERIFIED` with reproducer `none`: the specification settles the case, and `javap` showed the trait's arrow at each tie site. No program shows a narrower return type. The alternative is `NEGATIVE-BOUNDED`.
- F-397 names the decision that it builds, "It builds P-174's digit count." The draft did not. The alternative is to leave the pointer out.

## For the skill writer

- `.claude/skills/fortress-repo/references/revival-changes.md:99`, "So `v.asZZ32` is `ZZ`'s getter", departs from P-174 since `be43ddc647` (the review, "Corrections owed in the record"). This is the routing's or the skill writer's, not an entry's.

## Questions for the curator

None. The coordinator names to him the three POSITIONS changes, P-174's last sentence, P-40's clause and P-173's half-clause, each with its old and new words above.

## The fix round

From `check.md`:
- C24, C27, C29, C30 (form): "no row yet" is now "no row". Meaning: unchanged.
- C28 (fidelity, form): F-345's clause is now "one value per place; P-174 instead converts each of the four where it stands (no row)". The departure is now said, not read as a relative clause on "place".
- C37 (coverage, fidelity): the new row's notes are cut from 707 characters, which `ledger.py add` refused, to about 666. The source now names REPAIR's "The site", which holds the runs. Changes from the cold read:
  - "as `Ratio`'s `denominator(self)`" is cut: the reader took `Ratio`/`QQ` for a pair that meets the departure.
  - "Neither library has such a pair" is now "In both libraries the tied declarations return one type" (REPAIR, "Deviations", 3: "all 38 are `ZZ`").
  - "self has the trait's type met with the listed types'" is now "self is the trait met with the listed types", as row 1100 says it.
  - "so the call's static type is" is now "so the call takes".
  - `Functionals.scala:1103-1134` is replaced by "row 1100", which cites it.
- C38 (fidelity): row 815 now reads "Since `b7b5b0c02b` a call on `self` in the trait dies too:". It no longer reads as a second workaround.

From `cold-read.md`, the passages read two ways, in my homes:
- F-397 and F-398: "at a default" is now "a worker's choice, not a decision of the curator". F-397 names its subject, "This rule for folded constants". Meaning: unchanged.
- F-399: "the local after its place" is now "the local after its own place", which is the argument's place. Meaning: unchanged.
- F-400: "checks none in an object expression" is now "does not check an override in an object expression", the claim of row 1108. Meaning: unchanged.
- Kept, with no source in hand that settles them:
  - F-399's "as an inherited one does";
  - F-400's "only by the clause's bound", the repair's words;
  - row 935's "none both" over two ranges of shuffles, the source row's own form. Row 935 has no room under 700 characters for a longer wording.
  - Row 1100's "so the checker ties the two declarations", which the cold reader took for an endorsement of the tie. Row 1100 was changed only by its note. The new row says that the tie is the checker's reading of the trait's own self parameter.
- Not in my homes: the skill's `SKILL.md:126` contradicts F-401 (row 1039, closed); the counts of number types across entries; terms the skill lacks ("math item", `tryatomic`, `RTTIc`).

Not mine: `queue-check.py`'s two failures (the queue's head form) and the cut-only exit of `words-subset.py`. P-174, P-40 and P-173 add words, so none is cut only.

## What I could not do

- `skills-lint.py`, `ledger.py check` and my own length scripts need Python, which this session may not run. I measured the lengths with `cut` and `wc`, and `checks.sh` runs the record's checks.
