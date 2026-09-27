# Climb batch 6: the review's repair

Written 2026-09-27 on `main` at `595c5fdec`, carrying out the judge's ruling on the merged-diff review (`explorations/compile-ladder/climb-batch-6/JUDGE-review.md`, "The repair, in order", steps 1-12). Every capture is under `explorations/compile-ladder/climb-batch-6/repair-review/`, named `.txt`, and each run's capture carries its machine line: 4 cores (`nproc`), Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4, `FORTRESS_THREADS=1`, the load average in each header. Nothing under `Library/`, `ProjectFortress/src/` or `Specification-1.0-frozen/` changed, and nothing was built in the tree but the specification. Five deviations from the ruling are marked **Deviation** below, each with the source that settles it.

## 1. The negation entries (step 1)

`Specification/basic-lib/basic-integers.tex:373-375`: the three `%%` lines end `ZZ` in place of `QQ`. `:376-378`: the `\Method` line and the two `\Method*` lines end `\mathbb{Z}}}` in place of `\mathbb{Q}}}`. No line was added or removed: with step 2, the file's diff is seven lines changed in place.

## 2. The chapter's callout (step 2)

The ruling's sentence is appended to `basic-integers.tex:291`, after "This chapter does not give it." and before the `}` that closes `\revision{revival-integers}{...}`, on the same line.

## 3. Appendix I's integer entry (step 3)

In `Specification/appendices/changes.tex`: (a) the ruling's sentence at the end of `:778`, the Change; (b) at the end of `:787`, the Rationale, after "floating-point value)."; (c) "Negating an integer gives an integer." at the end of `:790`, the Effect; (d) the ruling's ten lines after `:840` ("is set as a line."), now `:841-850`. The three `\Method` lines, `:845-847`, are each found once as a whole line in `Specification-1.0-frozen/basic-lib/basic-integers.tex`, at `:380`, `:381` and `:382` (`grep -Fxc`, `quote-identity.txt`). The frozen listing's lines 228-230 give ℤ, as the new sentence says (read at `Specification-1.0-frozen/basic-lib/basic-integers.tex:226-231`). The build accepted `\RenewDocumentCommand` (section 5).

## 4. The citations the insertion moved (step 4)

The insertion moved `changes.tex:841` and every later line down by ten. Re-anchored, each opened in the tree:
- As ruled: `explorations/compile-ladder/climb-batch-6/RECORD.md:95` and `:205` (`:1026` to `:1036`, the sentence in "Passages not yet revised"), `:196` (`:1021-1022` to `:1031-1032`, that subsection's first sentence); `explorations/compile-ladder/rung-spec-numbers/REPORT.md:290` (`:985-1016` to `:995-1026`, I.1.16).
- **Deviation 1**, found by the ruled grep: `RECORD.md:178`, the continuation `` `:1026` `` after `changes.tex` (to `:1036`, the same sentence); T's `REPORT.md:242` (`:435-1016` to `:435-1026`, the range of the Appendix I entries, whose last line moved) and `:296` (`:963-966` to `:973-976`, I.1.15's Change; `:970-974` to `:980-984`, its Effect). The ruling lists the citations it expected and says to fix any other at or after 841; these are those.
- No citation of `changes.tex` at or after 841 is in T's `record.md` or `decision-record.md`, the ledger, `FACTS.md` or the handover.
- **Deviation 2, a decision**: `JUDGE-review.md`'s own citations of `changes.tex:1021-1022` and `:1026` (`:51`, `:73`, `:86`) are left. Its header dates every line number to `537213698` (`JUDGE-review.md:3`), which gives it the standing the ruling gives T's `SKEPTIC.md` and `JUDGE.md`. The alternative, editing the ruling's text, would make it cite a tree it was not written on.

## 5. The rebuild (step 5)

`./ant genSource`, then `./ant tex`, in `Specification/fortress/` with `FORTRESS_HOME=/home/user/fortress` (`spec-genSource.txt`, `BUILD SUCCESSFUL`, 41 s; `spec-tex.txt`, `BUILD SUCCESSFUL`, 38 s; each headed by its machine line).

`fortress.log` (`spec-log-counts.txt`): 0 `LaTeX Warning: Reference`, 0 "There were undefined references", 0 "multiply defined", 0 "Undefined control sequence", 0 "Emergency stop". Four lines match "LaTeX Error". They are macro-trace lines, the log tracing macros: hyperref's bookmark strings for two subsection titles holding `\KWD{self}` and `\KWD{where}`, with no `! ` error line. A control build was made to place them: a scratch copy of this `Specification/` with `basic-integers.tex` and `changes.tex` taken from `HEAD`, `./ant tex`. Its log has the same four lines, and its normalised text equals the committed PDF's. So the four lines predate the repair, and the diff below is the repair's alone.

The build's PDF has **621 pages, as before**; it is copied to `Specification/fortress.pdf` (`cmp` identical). `pdftotext-diff.txt` is the committed PDF's normalised text against the new one's (`explorations/compile-ladder/rung-spec-numbers/probes/build/norm.sh`), 6 hunks, each with its cause:
1. `15475c15475,15477`: step 2, the callout's sentence (page 371).
2. `15528,15530c15530,15532`: step 1, the three negation entries now `: Z` (page 373).
3. `28580,28582c28582,28584`: step 3(a), I.1.12's Change, its paragraph reflowed (page 593, as are 4-6).
4. `28586c28588,28589`: step 3(b), the Rationale's sentence. Its closing period is missing from the normalised text only, since `norm.sh` drops a line-final " ." with the TOC's dot leaders; the raw `pdftotext` line ends "was a subtype of Q ." (checked).
5. `28588,28591c28591,28593`: step 3(c), "Negating an integer gives an integer.", and the reflow of the paragraph after it, `\nolinkurl` breaking at another place.
6. `28624,28625c28626,28632`: step 3(d), the ten lines: the sentence, the three quoted entries as lines, the closing sentence.

No hunk is a page shift: the page count did not change and no break moved a line across the normalisation. Then `git clean -fXq -- Specification` removed the build's ignored products; `git status --short --ignored Specification` shows only the three tracked files the ruling changes.

## 6. The quote check (step 6)

`quotecheck.py` is rung T's skeptic's script with its `git diff` comparing `e5414f5bf` with the working tree. Run from the repository root, it prints 57 `NOTQUOTED` lines (`quotecheck.txt`). They are line for line the 57 of `explorations/compile-ladder/rung-spec-numbers/probes/repair/quotecheck.txt`, whose reasons 1-57 hold. None is a negation line: the three `\Method` lines are removed lines of the diff, and Appendix I now quotes them.

## 7. ℚ's `^` under `walk` (step 7)

`QQPowerExponent.fss` prints `q^e` for `q: QQ = 1/2` and the five exponents. `qq-power-walk.sh` runs it at `FORTRESS_THREADS=1`, each run from an empty private cache, the device of `explorations/compile-ladder/rung-flat-tower/perturb-probe.sh:9-17`. The whole program stops at its first failure, so it also runs each power alone, then `(big(2))^(big(3))`, then `QQPowerUnsigned.fss` (`qq-power-walk.txt`):
- `3` (`ZZ32`) and `widen(3)` (`ZZ64`): `1/8` (`:17-24`).
- `big(3)` (`ZZ`): "Value 3 might not fit in ZZ64", raised at `Library/FortressLibrary.fss:611`, the component's `^` (`:25-31`).
- `widen(unsigned(3))` (`NN64`): `StackOverflowError` (`:32-39`).
- `-big(3)`: the same "might not fit", through `:609` and `:611` (`:40-47`).
- `(big(2))^(big(3))`: the same "might not fit" (`:48-52`).
- `QQPowerUnsigned.fss`: for `u = widen(unsigned(3))`, `-u` is `18446744073709551613`, `-u > 0` is `true` and `u < 0` is `false`; for `v = unsigned(3)`, `-v` is `4294967293` and `-v > 0` is `true`; `q^v`, an `NN32` exponent, overflows the stack too (`:53-64`).

**Deviation 3: the exponent is parenthesized.** The ruling writes `q^e` with `e` = `widen(3)`, and the test `(1/2)^big(3)`. Written without parentheses, `q^widen(3)` is `(q^widen)(3)`. The specification puts superscripting in the group above tight juxtaposition (`Specification/basic/operators/precedence.tex:44-50`, then `:52-55`), and `walk` parses it that way: the first run's `q^widen(3)` reached `^` with the function `widen` as the exponent (`qq-power-walk-unparenthesized.txt`). The probe writes `q^(widen(3))`, and the test writes `(1/2)^(big(3))`.

## 8. Row 445 and its test (step 8)

`walk` refused the `ZZ` and the `NN64` exponents, so the ruling's second branch applies: NEGATIVE-VERIFIED, home 2, `ProjectFortress/tests/XXXQQPowerExponent.fss` asserting `(1/2)^(big(3))` and `(1/2)^(widen(unsigned(3)))` equal to `1/8`, each message `"row 445, numbers.tex:326-331"`, with its one comment line pointing at this file.

**Deviation 4: the refusals are not the api's.** `walk` dispatches on the component, whose exponent is already `AnyIntegral` (`Library/FortressLibrary.fss:607`). With the api's two exponents made `AnyIntegral` in a shadow copy, `walk` fails exactly as stock (`xxx-qq-power.txt:30-36`). The causes are two:
- **A `ZZ` exponent.** The component raises the numerator and the denominator to the exponent (`Library/FortressLibrary.fss:609`, `:611`). The six integer `^` natives read the exponent with `getLong`: `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:221`, `Long.java:233`, `UnsignedLong.java:226`, `NN32.java:225`, `BigNum.java:114` (through `ZL2N`) and `IntLiteral.java:109` (through `KL2N`). `FBigNum.getLong` throws "might not fit in ZZ64" for every value (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FBigNum.java:48-50`).
- **An unsigned exponent.** The component takes the reciprocal when `-other > 0` (`Library/FortressLibrary.fss:608`, written so that the most negative `ZZ64` does not recurse forever). An unsigned negation wraps, so for every nonzero `NN32` or `NN64` exponent the test holds, and the method recurses on the reciprocal until the stack overflows.

So "passing against a shadow api copy" cannot be shown. What `xxx-qq-power.sh` shows instead uses the team's own devices for a fix kept out of the tree. The first is a class overlay compiled with `javac` and put first on the classpath (`explorations/reviews/sum-replacement-judgement/walk-shadow.sh`, `explorations/compile-ladder/rung-interp-coercion/harness-one.sh`). The second is a shadow library directory put first on `fortress.source.path` (`walk-shadow.sh`; `explorations/repo-internals.md`, "Name resolution"). The capture `xxx-qq-power.txt` (the three fixes as diffs at `:8-22`):
- `walk`, stock: fails at the `ZZ` assertion (`:23-29`).
- `walk`, the api's exponents `AnyIntegral` alone: the same failure (`:30-36`).
- `walk`, the class overlay alone (`FBigNum.getLong` answering a value of fewer than 64 bits): the `ZZ` assertion passes, and the unsigned one overflows the stack (`:37-44`).
- `walk`, the class overlay and the shadow component line `if other < 0 AND -other > 0 then`, with the api fix: `REACHED`, `PASS`, `rc=0` (`:45-48`).
- The `testSystem` harness (`SystemJUTest` over a directory holding only the test), stock: "OK Saw expected exception" (`:49-55`).
- The harness with both fixes: "Missing expected failure", one failure, so the suite would go red (`:56-69`). This shows the new `XXX` file goes red on a deliberate local fix, as the shared prefix asks of a rung's first one.
- The harness with the class overlay alone: the expected failure is still seen (`:70-76`).

**The row.** Row 445 is after row 444 (`explorations/fortress-gap-ledger.md:456`), in the eight columns, with the ruling's content. Its claim names the api's `ZZ64` against the component's `AnyIntegral` and the chapter's ℤ (pre-existing at `e5414f5bf`, `fsi:273`, `:398`; `fss:349`, `:578`), and `walk`'s two faces. Status: "NEGATIVE-VERIFIED (`walk`'s `ZZ` and unsigned exponents); by reading (the api's declarations)". The fix column gives the api's fix as ruled (`other: AnyIntegral` in both declarations, and why not `other: ZZ`), and a fix location for each `walk` face.

**Deviation 5, a decision: one row, not three.** Walk's two faces could have been rows 446 and 447: the natives' refusal of a `ZZ` exponent, which also fails `(big(2))^(big(3))`, and the component's sign test on an unsigned exponent. They are in row 445, for two reasons. The ruling opened one row for the rational power's exponent, with one reproducer and one `XXX` test holding both `walk` exponents. And the three faces are what that power does with the exponents the chapter admits. The cost: the integer face `(big(2))^(big(3))` is recorded in the notes of a row about the rational power. Its gate is the test's first assertion, which cannot pass while that cause stands, and a later fix of the natives alone leaves the file failing on the second assertion (`xxx-qq-power.txt:37-44`), with row 445 still open for its other faces.

**Afterwards.** `explorations/coordinator/FACTS.md:154` ("The ledger") re-anchored: `:772` to `:773` ("### Counts by kind") and `:632` to `:633` ("## Revival worklist, ordered by rows closed"), both opened after the insertion. `RECORD.md:149` reads "446 onward". No other citation of a ledger line at or after 456 exists in `FACTS.md`, the handover or the batch's records (grep).

## 9. The 177 references in the 25 older tests (step 9)

`reanchor.py` builds, for each of the eight chapters, the map of the equal blocks of `difflib.SequenceMatcher(None, base, tree, autojunk=False)`. The base is `git show e5414f5bf:<chapter>`, the tree is the working tree after steps 1-3. The script rewrites explicit references and continuations as the ruling defines them. It skips rung F's four files, which the gather re-anchored, the new `XXXQQPowerExponent.fss`, which cites the tree, and rung S's seven files, which are left as ruled.

`reanchor.txt` lists each rewrite as file:line with its kind, chapter, and old and new reference. It then gives the text check and the position on the line. The summary:
- **177 references, 161 explicit and 16 continuations, in 25 files, exactly the 25 of `JUDGE-review.md:32-34`.** By chapter: `conversions-coercions.tex` +17 (76), `basic-integers.tex` −4, −7, −11, −13, −16 and −21 (74), and `numbers.tex` −25 (27), the ruling's offsets and counts.
- For every one, the old lines' text at the base equals the new lines' text in the tree, and the reference sits inside an assert message or a comment.
- 0 references fail to map, and none names `Specification-1.0-frozen/`.
- 15 references in 7 files cite lines that did not move and are unchanged. `IntLiteralWrapRepairR2.fss`, `NatRtBigSize.fss` and `XXXInferredStaticArgRungS.fss` have only such references, which is why the ruling's list does not name them.
- The line check over `git diff` of the three corpora: 25 files, 161 lines changed, 0 differing outside the reference digits (every `.tex:N[-M]` and bare `:N[-M]` replaced by `#`).

The ruling's two examples are among them: `basic-integers.tex:384` to `:380` (`XXXFixedWidthOverflowRungB.fss:28`, `IntSemanticsRungB.fss:89`), and `conversions-coercions.tex:73-75` to `:90-92` (`library_tests/IntConversionsRungW.fss:87`).

## 10. The records (step 10)

- `RECORD.md`:
  - A new section, "The judge's ruling on the review, and its repair".
  - Statement 7 (`:86`): the exponent is row 445.
  - Statement 9 (`:88`): settled against the library by `basic-integers.tex:498`; rows 438 and 441 are its home.
  - Statement 12 (`:91`) and correction 10 (`:77`): settled by route A and fixed in the chapter and I.1.12; the gather's own reading is kept as what it did.
  - `:93`: no mismatch is left without a fix in the text or a row.
  - "Re-anchored" (`:97`): the 25 older tests, re-anchored at the repair.
  - "Final row numbers" (`:17`): row 445.
  - "For the gate" (`:160`): 413, since step 8 added a test.
  - The review's "Stops" (`:205`): the negation is not a stop.
  - `:149`: "446 onward".
- T's `decision-record.md`, section 6: "the exponent is row 445" appended to statement 7's last cell, and the ruling's sentence to statement 12's.
- T's `probes/list.txt`: one line appended to its corrections section, that L14's first item is fixed at this repair.
- `explorations/microgpt-run-c-handover.md:27`: the clause replaced by the ruling's text, word for word.
- `FACTS.md:123`: unchanged, the page count being 621 as before. `FACTS.md:154`: re-anchored (section 8).

## 11. The homes of what this repair measured

- **ℤ's negation entries typed ℚ**, fixed in the chapter (steps 1-3). It is a prose defect: "No test can go red for a prose edit" (`explorations/coordinator/CLIMB-BATCH-6.md:135`; `JUDGE-review.md:75`). The check is the rebuild, the text diff and the quote check. The behaviour the corrected text states, that ℤ's negation is a ℤ, is the library's already (`Library/FortressLibrary.fsi:434`).
- **Row 445, the api's `ZZ64` exponent**: by reading. No gated form exists: `walk` reads the component, and the compiled path has no `QQ` (row 442). The row is its record, as for rows 438 and 439.
- **Row 445, `walk`'s `ZZ` exponent** (`FBigNum.getLong` under the natives): home 2, `ProjectFortress/tests/XXXQQPowerExponent.fss:8`.
- **Row 445, `walk`'s unsigned exponent** (the component's sign test): home 2, `XXXQQPowerExponent.fss:9`.
- **The integer power with a `ZZ` exponent**, `(big(2))^(big(3))`: the first face's cause, recorded in row 445's notes. Its gate is `XXXQQPowerExponent.fss:8` (Deviation 5).
- **`q^widen(3)` read as `(q^widen)(3)`**: not a defect. `walk` does what `precedence.tex:44-55` says.

## 12. Stops

None is met. Nothing under `Specification-1.0-frozen/` changed, and no word of `numbers-advanced.tex`. No normative text was added for a construct neither path runs, since `walk` runs ℤ's negation. The negation entries are settled by the ruling, so they are not the kind of passage the lift of `POSITIONS.md:119` covers. No file of `Library/` or `ProjectFortress/src/` changed; the fixes shown in section 8 live in a scratch directory.

## 13. For the gate

- `testSystem`: 413, which is 412 plus `XXXQQPowerExponent.fss`, failing as expected.
- The compiler track: 768. The library track: 83. The edits to their files are messages and comments only (section 9).
- The checker count: 62, since no `Library/` file changed.
- The ladder and the four-thread `atomic` runs: unchanged.

The gate was not run here.

## 14. Checks before the commit (step 11)

The shared prefix's tracked-path check over this file, `RECORD.md` and `JUDGE-review.md`, run after staging, printed nothing. `git diff --cached --stat` names only the paths the ruling allows:
- the two `.tex` files and the PDF;
- the 25 test files and `ProjectFortress/tests/XXXQQPowerExponent.fss`;
- the ledger, `FACTS.md` and the handover;
- files under `explorations/compile-ladder/climb-batch-6/` and `explorations/compile-ladder/rung-spec-numbers/`.
