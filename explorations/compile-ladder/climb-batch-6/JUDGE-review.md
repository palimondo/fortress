# Climb batch 6: the judge's ruling on the merged-diff review

Written 2026-09-27 on `main` at `537213698`. The merged-diff review refused approval with two blocking findings (`explorations/compile-ladder/climb-batch-6/RECORD.md`, section "The merged-diff review", "For the judge", `:194-196`). This ruling reads the merged tree and the review. It builds nothing and runs no test. Every line number below is at `537213698` unless it says otherwise.

**Decision: repair.** Finding 1 stands as landed, but the re-anchoring it asks about covers only rung F's four tests. T's commit moved 177 more live citations, in 25 older revival tests, and the repair re-anchors them. On finding 2, the decisions settle ℤ's negation entries at ℤ, so the chapter is fixed. ℚ's `^` exponent gets the ledger row it lacks, row 445. The integer `^` result is already carried by rows 438 and 441, and nothing more is owed for it.

## What was read

- The batch's commits `d846e3644` (F), `d9c415395` (T), `3dd99ecb7` (R's record), `ba0f8cb09` (the gather's follow-up) and `537213698` (the review's corrections). Also `git diff --name-only e5414f5bf...wip/rung-spec-numbers`.
- The batch record: T's section, `explorations/coordinator/CLIMB-BATCH-6.md:118-149`, especially `:127`, `:130`, `:135`, `:137` and `:143`; the gather's rule, `:226`; the lift, `:239`.
- `explorations/coordinator/POSITIONS.md:69` (route A) and `:119` (the lift of 2026-09-26 23:59 UTC).
- The integer chapter, `Specification/basic-lib/basic-integers.tex`: `:150-291` (the listing and its callout), `:360-420` (the method entries) and `:490-500` (the power).
- The rational chapter's power entry, `Specification/basic-lib/numbers.tex:318-337`.
- Appendix I: its integer entry, `Specification/appendices/changes.tex:766-888`, and "Passages not yet revised", `:1018-1041`.
- The Working Draft: `Specification-1.0-frozen/basic-lib/basic-integers.tex:228-230` and `:377-382`, and `Specification-1.0-frozen/basic-lib/numbers.tex:345`.
- The landed library: `Library/FortressLibrary.fsi:254-275`, `:380-440` and `:457`; `Library/FortressLibrary.fss:340-350` and `:600-612`. The base library, `git show e5414f5bf:Library/FortressLibrary.fs?`, at the same declarations.
- T's records: `explorations/compile-ladder/rung-spec-numbers/decision-record.md` section 6 (`:99-127`), `SKEPTIC.md:202-208`, and `probes/list.txt:162-168` (L14).
- Ledger rows 438 and 441-444 (`explorations/fortress-gap-ledger.md`). `FACTS.md:154` ("The ledger"). The handover's rung T paragraph (`explorations/microgpt-run-c-handover.md:27`).
- The assert messages of every test under `ProjectFortress/tests/`, `compiler_tests/` and `library_tests/` that cites one of the eight `.tex` files T edited. The script that counted them is described under finding 1.

## Finding 1: T's commit carries the gather's re-anchoring of F's test messages

**Ruling: it stands.** Nothing in `d846e3644` or `d9c415395` is rewritten.

- **The rung did not edit the files.** `git diff --name-only e5414f5bf...wip/rung-spec-numbers` names only the eight `.tex` files, `Specification/fortress.pdf` and T's own directory. The edits to `FlatTowerRungF.fss`, `XXXEmptyGroupSumRungF.fss`, `XXXRR32MixedRungF.fss` and `XXXUnwrittenSumRungF.fss` are the gather's. `CLIMB-BATCH-6.md:137` ("No source, library or test file") sets what rung T's worker may touch. It does not govern the gather's folds. For the same reason, the reserved stop "any rung editing a file another rung of this run owns" is not met.
- **The commit says so.** Its message names the re-anchoring ("rung F's citations of the four revised chapters re-anchored, in F's test messages among them"). Its `historical:` line says the four `*RungF.fss` files are the revival's own. The review opened each re-anchored citation and found it right (`RECORD.md:179`). The gather re-ran the four tests (`explorations/compile-ladder/rung-flat-tower/probes/gather-tests-after-T.txt`).
- **This placement is the only one that keeps every commit's citations right at that commit.** F's messages are right at `d846e3644`, and T's commit is the one that moves the lines. A separate commit after T's would leave `d9c415395` citing lines it had just moved. Rewriting the two commits now would change the hashes that the gather's "Placeholders, for the commit stage" section names (`RECORD.md:171`), with the gate running on this tree. It would buy nothing.

**The same defect, elsewhere.** The gather re-anchored the citations T moved in F's four tests only (`RECORD.md:97`). Rule 2 of the shared prefix says a repaired defect is evidence of the same defect nearby, so the other sites were counted. T's commit is the first revival edit of these chapters (`git log` on the three chapters shows `5a68404fd` of 2012, then `d9c415395`), so every older test that cites them was written against the base text.

- **The count.** The older tests' messages hold 161 explicit references (`<chapter>.tex:N` or `:N-M`) and 16 continuations (a bare `:N` following a chapter's name in the same message or comment line). That is 177 references in 25 files, all of them now pointing at moved lines. The files:
  - `ProjectFortress/tests/`: `CoercionBindRungC`, `CoercionCallRungC`, `CoercionMostSpecificRungC`, `CoercionOverloadRungC`, `CoercionRedispatchRungC`, `CoercionSpecTableRungC`, `IntSemanticsRungI`, `RoundHalfEvenRungR`, `WrapOperatorsRungD`, `XXXCoercionGenericFnRungC`, `XXXCoercionGenericTraitRungC`, `XXXCoercionReturnRungC`, `XXXCoercionStaticNarrowRungC`, `XXXCoercionStaticRungC`, `XXXCoercionTupleOverloadRungC`, `XXXFixedWidthOverflowRungB`, `XXXRadixTenPointNumeral` and `XXXRoundNearTieNumeral`.
  - `ProjectFortress/compiler_tests/`: `IntSemanticsRungB`, `XXXCoercionAnyOverloadRungC`, `XXXCoercionGenericFnCompiledRungC`, `XXXNatLitArgChecker` and `XXXShiftDeclRungI`.
  - `ProjectFortress/library_tests/`: `IntConversionsRungW` and `IntegralOpsRungN`.
- **Every one can be re-anchored exactly.** Each cited line is unchanged text that only moved. Under the map of unchanged lines from `git show e5414f5bf:<chapter>` to the tree, every reference maps. The offsets are:
  - `numbers.tex` −25 (27 references);
  - `conversions-coercions.tex` +17 (76);
  - `basic-integers.tex` −4, −7, −11, −13, −16 and −21 (74 in all).

  Examples: `basic-integers.tex:384`, "The unary negation operator returns the negative of its argument", is now `:380`; `conversions-coercions.tex:73-75` is now `:90-92`.
- **Why the messages matter.** No file outside the three test corpora cites these chapters by line (`Library/`, `ProjectFortress/src/`, the demos and the two microGPT programs have none). But the shared prefix makes the assert message the one place a test's citation lives ("The assert message string carries the citation ... and nothing else does"). It is read when the test fails, against the tree as it stands.

**A decision, flagged.** The repair re-anchors all 177 references. The alternative was to leave them as dated citations, the way the gather left the ledger's older rows and F's `SKEPTIC.md` and `JUDGE.md`. It was not taken, for two reasons: the gather's own principle for F's tests applies to them unchanged, and the map is exact.

Left for a later scripted pass, because it is not this batch's edit: batch 5's rung S (`3924e7ec3`) moved 13 references in 7 older tests in the same way, and they were never re-anchored. The files are `compiler_tests/XXXFortToStringRungS.fss`, `XXXTupleVarFieldCompiledRungC.fss` and `XXXUnionMethodRungS.fss`, `library_tests/MaybeRungM.fss`, and `tests/XXXFlatStringSplitRungL.fss`, `XXXTupleSeparatorRungS.fss` and `XXXTupleSevenRungS.fss`. Also left: `FACTS.md:45` (`numbers-advanced.tex:71-260`, now `:88-277`), `FACTS.md:96` (`conversions-coercions.tex:477-484` and `:525-536`, now `:494-501` and `:542-553`), `map/dormant-code.md:357` and `map/spec-to-implementation.md:289`. These are for the FACTS catch-up.

## Finding 2: the gather's check of T's chapters against the landed library

The rule is `CLIMB-BATCH-6.md:226`: "a mismatch is fixed in T's text where the decisions settle it, else reported to the review as blocking". The rule assumes the chapter is the side that may be wrong. When the specification settles a mismatch against the library, the chapter needs no fix. The case is then the fourth one of the shared prefix's rule 4: the rung lands, and a verified ledger row names the defect, the clause, the probes, the location of the fix and the fix itself. Each of the three mismatches is ruled on that basis.

**(a) ℤ's `^` result, `RR64` in the library (`Library/FortressLibrary.fsi:457`), ℤ in the chapter: nothing owed.** The specification settles it against the library. "Exponentiation of an integer to a nonnegative integer power produces an integer result" (`Specification/basic-lib/basic-integers.tex:498`). The chapter gave that result before T (the Working Draft's `opr ^(self, power: NN): ZZ`, which Appendix I quotes at `changes.tex:804`), and route A's "each carrying its own algebra" (`POSITIONS.md:69`) agrees. The library's declaration predates the batch. Row 438 is its home: it names the specification line, the probes and the fix, and says why no walk test can express it (walk does not check a return, row 387). The negative power is row 441, and it is named in Appendix I as not yet given (`changes.tex:1026`). The gather's "not blocking" was right in substance. The record will say it is the fourth case, not a mismatch left over.

**(b) ℚ's `^` exponent, `ZZ64` in the api, ℤ in the chapter: a ledger row is owed and missing.**
- **The specification settles it against the api.** The chapter's `opr ^(self, power: ZZ): QQ` (`Specification/basic-lib/numbers.tex:326-327`) keeps the Working Draft's exponent (`Specification-1.0-frozen/basic-lib/numbers.tex:345`, `power: ZZ`). T changed only the result.
- **The review saw half of it.** The library disagrees with itself. The api declares `opr ^(self, other:ZZ64):QQ` in `trait QQ` (`Library/FortressLibrary.fsi:417`) and `opr ^(self, other:ZZ64): T` in `trait MultiplicativeRing` (`:273`). The component declares both with `other:AnyIntegral` (`Library/FortressLibrary.fss:607`, `:349`).
- **It is pre-existing.** The base has the same four declarations (`git show e5414f5bf:Library/FortressLibrary.fsi`, `:273` and `:398`; `.fss`, `:349` and `:578`).
- **Why it matters on the flat tower.** `ZZ64` coerces from `ZZ32` and `NN32` only (`Library/FortressLibrary.fsi:550-551`), so the api admits no `ZZ` or `NN64` exponent. The chapter's ℤ admits every integer type by coercion.
- **What walk does, by reading.** Walk dispatches on the component, so it runs these calls. The compiled path has no `QQ` at all (row 442). The checker, which reads the api, is where the difference shows.
- **The repair.** It measures walk's answers, then opens row 445 in the form of rows 438 and 439. Its fix is the library's own spelling: `other: AnyIntegral` in the two api declarations. It is not made in this batch.

**(c) ℤ's unary negation entries typed ℚ (`Specification/basic-lib/basic-integers.tex:373-378`) against the listing's ℤ (`:205-207`): settled at ℤ, and the chapter is fixed.**

The review's first reading is the right one. The decisions and the chapter itself settle it:
- **Route A.** It makes the number types siblings under `Number`, "each carrying its own algebra" (`POSITIONS.md:69`). ℚ now excludes the integer types (`trait QQ ... excludes { RR64, AnyIntegral }`, `Library/FortressLibrary.fsi:382-384`), so a ℚ result is not an integer.
- **The chapter's own listing.** It declares `opr -(self): ℤ` and extends `CommutativeRing⟦ℤ,+,-,…⟧` (`basic-integers.tex:170-178`, `:205`), whose negation stays in ℤ. The listing already said ℤ in the Working Draft (`Specification-1.0-frozen/basic-lib/basic-integers.tex:228-230`).
- **Appendix I.** Its entry for the revision says the listing keeps "its algebra" (`changes.tex:772`).
- **The landed library.** It negates within the type: `opr -(self):I` on `Integral[\I\]` (`Library/FortressLibrary.fsi:434`) and `opr -(self): T` on `AdditiveGroup[\T\]` (`:259`).

On the nested tower the entries' ℚ was true of an integer, because ℤ was a subtype of ℚ. That is why the slip was harmless in 2011. On the flat tower the entries state something the specification's own listing, its algebra and the library all contradict.

T's brief covers this case: "wherever else the list finds a statement the flat library contradicts: a callout, and the normative sentence edited only where the decisions settle the new text" (`CLIMB-BATCH-6.md:130`). The decisions settle it, so the entry is edited. The rule for signatures that name a refined type (`:127`) does not cover it, because ℚ is not a refined type, but `:130` does.

It is not a stop. T's stop covers a passage "whose new text neither the decisions nor rung F's table settle" (`:143`), and this one is settled, so the lift (`POSITIONS.md:119`) is not needed and the form of the lift does not apply. After the fix, `changes.tex:1021-1022` ("No passage that instantiation exclusion or the reorganized numeric types contradict is known to be unrevised") is true again. Of L14's other slips (`explorations/compile-ladder/rung-spec-numbers/probes/list.txt:162-168`), none changes meaning on the flat tower: a typeset underscore, a source comment's ℕ, ℚ's own `signum` and `floor` sentences, and the power property's ℕ. So the negation is the only one.

**No gated test is owed for (c).** It is a prose defect. "No test can go red for a prose edit" (`CLIMB-BATCH-6.md:135`), and the check is the rebuild, the text diff and the quote check. The behaviour the corrected text states, a ℤ negated is a ℤ, is the library's already and unchanged.

## Who was right

- **The review.** Right on the facts of both findings, and right that route A is a candidate settlement for (c). Right that (b) has no row. Wrong to read `CLIMB-BATCH-6.md:137` as forbidding the gather's fold in finding 1. Its second `stopsMet` entry is not met, because (c) is settled.
- **The gather.** Right in substance on (a). Wrong on (b), which it noted (`RECORD.md:86`) but opened no row for. Wrong on (c): it said no decision settles it (`RECORD.md:77`, `:91`), while route A and the chapter's own listing do. Wrong in form: it left a mismatch unfixed and unrowed while writing "No mismatch is left that is new or blocking" (`:93`). Its re-anchoring of F's tests was right but stopped at this batch's files.
- **Rung T's worker.** Right to report the negation slip in its list (L14). Wrong to leave it under `CLIMB-BATCH-6.md:130`.
- **T's second skeptic.** Right to find the mismatch and to ask for statement 12 (`SKEPTIC.md:206-208`). Wrong to frame the statement "so that it does not report this mismatch as blocking" and to leave open whether a decision settles it. The batch record sends an unsettled mismatch to the review as blocking (`CLIMB-BATCH-6.md:226`).

## Stops

- **Met and lifted.** T's negative integer power. It is named in Appendix I (`Specification/appendices/changes.tex:1026`) and listed for Pavol (`explorations/microgpt-run-c-handover.md:27`), as the lift's form asks (`POSITIONS.md:119`). It does not hold the push.
- **Not met.** The negation entries, since the decisions settle them. The re-anchoring in finding 1, since no rung edited another rung's file.
- **None of T's stops is touched by the repair** (`CLIMB-BATCH-6.md:143`). Nothing under `Specification-1.0-frozen/` changes, and no word of `numbers-advanced.tex`. No normative text is added for a construct neither path runs, since walk runs ℤ's negation.

## The repair, in order

The repair worker runs after the gate, in `/home/user/fortress` on `main`. Captures go in `explorations/compile-ladder/climb-batch-6/repair-review/`, every one named `.txt`. Deviations are recorded in `explorations/compile-ladder/climb-batch-6/REPAIR-review.md` with the file:line that settles them. `Library/`, `ProjectFortress/src/` and `Specification-1.0-frozen/` are not touched.

1. **The negation entries.** In `Specification/basic-lib/basic-integers.tex`, change the result type from ℚ to ℤ in place, without adding or removing a line:
   - `:373-375`: `QQ` becomes `ZZ` at the end of each `%%` line.
   - `:376-378`: `\mathbb{Q}` becomes `\mathbb{Z}` at the end of each `\Method` / `\Method*` line.
2. **The chapter's callout.** In the same file, on `:291`, insert the following text before the closing `}` of `\revision{revival-integers}{...}`, after "This chapter does not give it.". Keep it on line 291 so that no line moves, since 74 older test references and rows 438 and 441 cite lines below.

   > ` The method entries of the three unary negations gave the result \EXP{\mathbb{Q}} where the listing gave \EXP{\mathbb{Z}}; on the flat tower that would make the negative of an integer a rational, and they now give \EXP{\mathbb{Z}}, as the listing does.`
3. **Appendix I's integer entry** (`Specification/appendices/changes.tex:766-888`):
   - (a) At the end of `:778`, append: ` The method entries of the three unary negations give the result \EXP{\mathbb{Z}}, as the listing does.`
   - (b) At the end of `:787`, after "floating-point value).", append: ` Route~A gives each number type its own algebra, and the listing's commutative ring over \EXP{\mathbb{Z}} negates within \EXP{\mathbb{Z}}; the method entries' \EXP{\mathbb{Q}} held of an integer only while \EXP{\mathbb{Z}} was a subtype of \EXP{\mathbb{Q}}.`
   - (c) At the end of `:790`, append: ` Negating an integer gives an integer.`
   - (d) After `:840` ("is set as a line."), insert these ten lines:

   ```
   Lines 380--382 gave the three unary negations the result \EXP{\mathbb{Q}},
   where the listing's lines 228--230 gave \EXP{\mathbb{Z}}:
   \begin{quote}
   \RenewDocumentCommand\Method{sm}{#2\par}
   \Method{\EXP{\KWD{opr} -(\KWD{self})\COLON \mathbb{Q}}}
   \Method*{\EXP{\KWD{opr} \mathord{\boxminus}(\KWD{self})\COLON \mathbb{Q}}}
   \Method*{\EXP{\KWD{opr} \mathord{\dotminus}(\KWD{self})\COLON \mathbb{Q}}}
   \end{quote}
   In the chapter the first line was the heading of its entry and the other two
   continued it; here each is set as a line.
   ```

   The three `\Method` lines must be byte-identical to `Specification-1.0-frozen/basic-lib/basic-integers.tex:380-382`. Check each with `grep -Fxc` against that file. `\RenewDocumentCommand` handles the starred form that T's `\renewcommand\Method[1]` (T's decision 14, `decision-record.md:100`) cannot. If the build refuses it, record the message in `REPAIR-review.md` and stop at this step.
4. **Re-anchor the citations the insertion moved.** Step 3(d) moves `changes.tex:841` and every line after it down by ten. Re-anchor by passage:
   - `explorations/compile-ladder/climb-batch-6/RECORD.md:95` (`:1026` to `:1036`), `:196` (`:1021-1022` to `:1031-1032`) and `:205` (`:1026` to `:1036`).
   - `explorations/compile-ladder/rung-spec-numbers/REPORT.md:290` (`:985-1016` to `:995-1026`).

   Then grep `changes\.tex:[0-9]` in:
   - `explorations/compile-ladder/climb-batch-6/`;
   - T's `REPORT.md`, `record.md` and `decision-record.md`;
   - the ledger, `FACTS.md` and the handover.

   Fix any other citation of a line at or after 841, and open each result. T's `SKEPTIC.md` and `JUDGE.md` stand as dated.
5. **Rebuild the specification as the gather did** (`RECORD.md:101`; `Specification/fortress/README:5-14`).
   - Run `./ant genSource`, then `./ant tex`, in `Specification/fortress/` with `FORTRESS_HOME=/home/user/fortress`. Log to `repair-review/spec-genSource.txt` and `spec-tex.txt`, each headed by its machine line (nproc, CPU model and MHz from `/proc/cpuinfo`, the load average, the JDK, `FORTRESS_THREADS`). Both must end `BUILD SUCCESSFUL`. `fortress.log` must count 0 undefined references, 0 multiply defined labels and 0 undefined control sequences.
   - Before copying the build's PDF to `Specification/fortress.pdf`, save `pdftotext` of the committed PDF. Diff the two texts, both normalised by `explorations/compile-ladder/rung-spec-numbers/probes/build/norm.sh`, into `repair-review/pdftotext-diff.txt`. Give every hunk a cause in `REPAIR-review.md`. The expected hunks are the callout's sentence, the three negation entries, the four additions to Appendix I, and page shifts.
   - Note the page count (621 before).
   - Then run `git clean -fXq -- Specification`. `git status --short --ignored Specification` must show no ignored path, and no tracked file may change except `Specification/fortress.pdf` and the two `.tex` files.
6. **The quote check.** Copy `explorations/compile-ladder/rung-spec-numbers/probes/skeptic/quotecheck.py` to `repair-review/quotecheck.py`, changing its `git diff` to compare `e5414f5bf` with the working tree (drop `"HEAD"` from the argument list). Run it from the repository root before committing, and save the output to `repair-review/quotecheck.txt`. It must print no `NOTQUOTED` line that `explorations/compile-ladder/rung-spec-numbers/probes/repair/quotecheck.txt` does not already list with its reason. In particular, it must print none for the three negation lines.
7. **Measure ℚ's `^` under walk.** Write `repair-review/QQPowerExponent.fss` (component `QQPowerExponent`, `export Executable`). With `q: QQ = 1/2`, it prints `q^e` for five exponents: `3` (a `ZZ32`), `widen(3)` (a `ZZ64`), `big(3)` (a `ZZ`), `widen(unsigned(3))` (an `NN64`) and `-big(3)`. Run it under walk at `FORTRESS_THREADS=1` from an empty private cache, as `explorations/compile-ladder/rung-flat-tower/perturb-probe.sh:9-17` does. Capture the output with its machine line in `repair-review/qq-power-walk.txt`.
8. **Open ledger row 445** after row 444 (`explorations/fortress-gap-ledger.md`), in the table's eight columns:
   - **Claim.** The one library's api declares the rational power's exponent as `ZZ64`, where its component and the specification take any integer: `opr ^(self, other:ZZ64):QQ` (`Library/FortressLibrary.fsi:417`) and `MultiplicativeRing`'s `opr ^(self, other:ZZ64): T` (`:273`), against the component's `other:AnyIntegral` (`Library/FortressLibrary.fss:607`, `:349`). On the flat tower `ZZ64` coerces from `ZZ32` and `NN32` only (`fsi:550-551`), so the api admits no `ZZ` or `NN64` exponent. Pre-existing at `e5414f5bf` (`fsi:273`, `:398`; `fss:349`, `:578`).
   - **Class.** Library bug (a declared type).
   - **Spec citation.** `Specification/basic-lib/numbers.tex:326-331`, `opr ^(self, power: ZZ): QQ`, unchanged in its exponent from `Specification-1.0-frozen/basic-lib/numbers.tex:345`.
   - **Reproducer.** `compile-ladder/climb-batch-6/repair-review/QQPowerExponent.fss` with `qq-power-walk.txt`.
   - **Found by.** Climb batch 6's gather (its check of rung T's chapters, `compile-ladder/climb-batch-6/RECORD.md:86`) and merged-diff review; opened at the review's repair (`compile-ladder/climb-batch-6/JUDGE-review.md`).
   - **Notes and fix.** The fix is to declare the exponent as the component does, `other: AnyIntegral`, in both api declarations. That is the library's own spelling, and it admits every exponent the chapter's ℤ admits by coercion. The alternative, `other: ZZ`, would send every fixed-width exponent through a coercion.
   - **If walk printed all five powers:** the status is "by reading (the api's declarations); walk's answers measured". The notes add that no gated test can express the defect, because walk dispatches on the component and the compiled path has no `QQ` (row 442). The checker, which reads the api, is where it shows, as for rows 438 and 439.
   - **If walk refused the `ZZ` or `NN64` exponent:** the status is NEGATIVE-VERIFIED and the row gets home 2. Write `ProjectFortress/tests/XXXQQPowerExponent.fss` asserting `(1/2)^big(3) = 1/8` and `(1/2)^(widen(unsigned(3))) = 1/8`, with messages citing `row 445` and `numbers.tex:326-331`, and nothing else. Show it failing under walk. Show it passing with the api declarations changed in a shadow copy placed beside the program (the device of `perturb-probe.sh`). Capture both.
   - **Afterwards:** re-anchor `FACTS.md:154` ("The ledger": `:772` to `:773`, `:632` to `:633`; open both). Change `RECORD.md:149`'s "445 onward" to "446 onward".
9. **Re-anchor the 177 references in the 25 older test files** named under finding 1. Change messages and comments only, never an assertion.
   - **The map.** For each of the eight chapters, map line numbers from `git show e5414f5bf:<path>` to the working tree through the equal blocks of `difflib.SequenceMatcher(None, base_lines, tree_lines, autojunk=False)`. The map is computed after steps 1-3; steps 1 and 2 move no line of `basic-integers.tex`.
   - **Which references.** A reference is either `<chapter>.tex:N` or `:N-M` (by basename: `numbers`, `basic-integers`, `numbers-advanced`, `reductions`, `conversions-coercions`, `literals`, `changes`, `internal-document`), or a bare `:N[-M]` preceded by a space, comma or parenthesis whose nearest preceding `name.ext:` on the same line is one of those chapters. Skip the four `*RungF.fss` files, which the gather already re-anchored. Rewrite every reference whose lines map to other numbers.
   - **The expected count.** 177 references (161 explicit, 16 continuations) in 25 files, with the offsets given under finding 1. Any reference that does not map is left and listed in `REPAIR-review.md`; none is expected.
   - **The check.** Save `repair-review/reanchor.txt`. For every rewritten reference it gives file:line, the old and new reference, and whether the old lines' text at the base equals the new lines' text in the tree (all must be equal). It must also show that every changed line of the 25 files differs from its original only inside the reference tokens (compare the two lines with every `\.tex:\d+(-\d+)?` and bare `:\d+(-\d+)?` digit run replaced by `#`).
   - **Not re-anchored.** The 13 references rung S moved in 7 files stay as they are.
10. **Records.**
    - `RECORD.md`:
      - a new section "The judge's ruling on the review, and its repair", after "The merged-diff review", saying what steps 1-9 did, with their captures;
      - statement 7 (`:86`): the exponent is row 445;
      - statement 9 (`:88`): the specification settles it against the library, rows 438 and 441 its home;
      - statement 12 (`:91`) and correction 10 (`:77`): settled by route A and fixed in the chapter and I.1.12;
      - `:93`: no mismatch is left without a fix in the text or a row;
      - the "Re-anchored" paragraph (`:97`): the 25 older tests were re-anchored at the repair;
      - the review's "Stops" (`:205`): the negation is not a stop;
      - "Final row numbers" (`:17`): row 445 was opened at the review's repair;
      - if step 8 added a test, "For the gate" (`:160`) becomes 413.
    - T's `decision-record.md` section 6: append to statement 7's last cell "the exponent is row 445", and to statement 12's last cell "settled by route A and fixed in the chapter and I.1.12 at the merged-diff review's repair (`compile-ladder/climb-batch-6/JUDGE-review.md`)".
    - T's `probes/list.txt`: one line appended to its corrections section, saying that L14's first item is fixed at that repair.
    - The handover's rung T paragraph (`explorations/microgpt-run-c-handover.md:27`): replace "but for two pre-existing slips, the integer `^` (rows 438 and 441) and ℤ's negation entries typed ℚ (for Pavol with the list's L14)" with "but for the library's integer `^` (rows 438 and 441) and its api's rational `^` exponent (row 445), both pre-existing, where the specification's text is kept; ℤ's negation entries, typed ℚ by a slip of the Working Draft, give ℤ since the merged-diff review's judgement (`compile-ladder/climb-batch-6/JUDGE-review.md`)".
    - `FACTS.md`'s rung T bullet (`:123`): update its page count only if step 5's differs from 621.
    - `REPAIR-review.md`: what was done, each capture, and every deviation.
11. **Before committing.**
    - Run the tracked-path check of the shared prefix over `REPAIR-review.md`, `RECORD.md` and this file.
    - `git diff --stat` must name only the paths the ruling touches:
      - `Specification/basic-lib/basic-integers.tex`, `Specification/appendices/changes.tex` and `Specification/fortress.pdf`;
      - the 25 test files (and `ProjectFortress/tests/XXXQQPowerExponent.fss` if step 8 added it);
      - `explorations/fortress-gap-ledger.md`, `explorations/coordinator/FACTS.md` and `explorations/microgpt-run-c-handover.md`;
      - files under `explorations/compile-ladder/climb-batch-6/` and `explorations/compile-ladder/rung-spec-numbers/`.
    - Nothing under `Library/`, `ProjectFortress/src/` or `Specification-1.0-frozen/` may appear. Do not run the gate.
12. **Commit locally, one commit, and do not push.** Title: "Climb batch 6: the review's repair". The body says what the commit does and carries `historical: Specification/basic-lib/basic-integers.tex, Specification/appendices/changes.tex, Specification/fortress.pdf; the 25 test files whose messages are re-anchored are the revival's own.` End it with:

    ```
    Co-Authored-By: Claude <noreply@anthropic.com>
    Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB
    ```

## What the gate should show after the repair

- `testSystem`: 412, or 413 if step 8 added its test, which fails as expected.
- The compiler track: 768. The library track: 83.
- The checker count: 62, since no `Library/` file changes.
- The ladder and the four-thread `atomic` runs: unchanged, since the edits to the tests are messages only.

## For Pavol

- **ℤ's negation entries now give ℤ.** The three unary negation entries of the integer chapter typed their result ℚ, a slip of the Working Draft that on the flat tower said negating an integer gives a rational. The judge ruled that route A ("each carrying its own algebra") and the chapter's own listing settle them at ℤ, and the repair fixes them with a callout sentence and an Appendix I entry. The other way was your lift of 2026-09-26: leave them, and name them in Appendix I as not yet revised.
- **Row 445.** The api types ℚ's `^` exponent as `ZZ64`, where its component and the chapter take any integer. The fix, declaring the api as the component does, is not made in this batch.
- **177 test citations re-anchored.** Rung T's edit moved 177 specification citations in the messages of 25 of our older tests, and the repair re-anchors them. 13 more, moved by batch 5's rung S, are left for a scripted pass. A rule that a rung editing the specification re-anchors the test messages it moves would prevent this; it is not written anywhere.
