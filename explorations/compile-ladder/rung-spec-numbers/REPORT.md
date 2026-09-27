# Rung T: the specification's number chapters revised to the flat library

problem: `Specification/basic-lib/numbers.tex:36-91` at `e5414f5bf` lists eighteen rational types, each "a subtype of" others, which the library never declared and whose defining trait the compiled checker refuses, "Cyclic type hierarchy: Type RationalQuantity transitively extends itself" (`explorations/reviews/flattening-questions-ways/Q3ConditionalExtension.comp.txt:3`); rung F makes the library flat in this batch (`explorations/coordinator/CLIMB-BATCH-6.md:122`)
spec: `Specification/basic/types-vals-vars.tex:535-539` ("These types are mutually exclusive"; "The numeric types share the common supertype Number"), with instantiation exclusion at `Specification/basic/types-vals-vars.tex:218-237`; beside it, `Documentation/Specification/Prose/Language/types.tick:977-978`
precedent: rung S's S1 form, a callout after the changed passage (`Specification/basic/types-vals-vars.tex:238-250`) and an Appendix I entry (`Specification/appendices/changes.tex:61-117`); the library's run-time checks (`Library/FortressLibrary.fsi:301-304`)
deviation: one callout covers a listing with its method entries, not each entry (`Specification/basic-lib/numbers.tex:196-214`); quoted listing lines in Appendix I lose their alignment commands (`Specification/appendices/changes.tex:693-728`, `:801-825`); the four method-entry originals are quoted as their `\Method` lines with `\Method` locally set as a line (`Specification/appendices/changes.tex:736`, `:835`); the getter block is typeset by today's `fortify.el` (`Specification/basic-lib/numbers.tex:56-61`); the superseded chapter's callout precedes its first heading (`Specification/advanced-lib/numbers-advanced.tex:14-30`)
historical: `Specification/basic-lib/numbers.tex`, `Specification/basic-lib/basic-integers.tex`, `Specification/advanced-lib/numbers-advanced.tex`, `Specification/basic/expressions/reductions.tex`, `Specification/basic/conversions-coercions.tex`, `Specification/basic/expressions/literals.tex`, `Specification/appendices/changes.tex`, `Specification/appendices/internal-document.tex`, `Specification/fortress.pdf`; the rule that asks for this line is `explorations/coordinator/CLIMB-BATCH-6.md:282`

## 0. How this report was written, and what was inherited

The harness refused the worker's write of this file in both rounds ("Subagents should return findings as text, not write report files"). This text is carried in the structured result for the gather to write verbatim, as in batches 3.5, 4 and 5. `record.md`, `decision-record.md` and the probes are on the branch.

The first round started from an empty branch at `e5414f5bf` and left seven commits (`37de47cb1` to `265c85eae`). The skeptic refused the rung at `1c9f12c72` (`explorations/compile-ladder/rung-spec-numbers/SKEPTIC.md`), and the judge ruled "repair" at `697c3b51b` (`explorations/compile-ladder/rung-spec-numbers/JUDGE.md`). The repair round started at `697c3b51b` with a clean tree. It re-verified what it relied on:
- it re-read the four frozen method entries and their listing lines;
- it rebuilt the specification;
- it re-ran the skeptic's quote check;
- it opened every line it cites.

It added `5ae598956` (the text), `8d54e531a` (the rebuild, the diff and the checks) and `8b36d5ca6` (the record, the decision record and the list for Pavol).

## 1. What changed

The three number chapters now describe the library that rung F makes flat, in rung S's layered form:
- the normative text is edited in place;
- a `\revision` callout stands at each changed passage;
- Appendix I has one entry per change, quoting the original from the Working Draft of February 2011;
- the reasoning is in `explorations/compile-ladder/rung-spec-numbers/decision-record.md`.

The changes, file by file:
- **Numbers** (`Specification/basic-lib/numbers.tex:19-90`).
  - ℚ holds the finite rationals, +∞, −∞ and 0/0.
  - The chapter's number types, ℤ, ℤ64, ℤ32, ℕ64, ℕ32, ℚ and ℝ64, are siblings under `Number`.
  - The coercions are rung F's: ℚ from the five integer types, and ℝ64 from ℤ32 and from integer numerals (`:43`, answer 8's words since the repair round). Every other conversion is explicit.
  - A subset such as the positive values is tested at run time. The two checks the library declares are stated, `getter check(): Maybe[\RR64\]` and `getter check_star(): Maybe[\RR64\]`.
  - The tracking sentence goes. ℚ, which holds 0/0, is neither totally ordered nor a field.
- **The listing of ℚ** (`:92-214`) extends `Number` alone and declares the five integer coercions, with a method entry (`:217-228`).
  - Signatures that named a refined type take the library's type, or ℚ or ℤ.
  - The seventeen checks leave.
  - Ten "For types ℚ* and ℚ#" qualifiers drop.
  - Two sentences that relied on the refined types go.
- **Integers** (`Specification/basic-lib/basic-integers.tex:16-65`).
  - The five integer types, with their coercions: ℤ64 from ℤ32 and ℕ32; ℕ64 from ℕ32; ℤ from the four.
  - No refined type and no infinity.
  - The callout carries answer 8's interim rule for mixed widths.
- **The listing of ℤ** (`:67-291`) extends `{ Number, IntegerLike[\ZZ\], ... }`, keeps its algebra and declares the four coercions, with a method entry.
  - Signatures are retyped, and the twelve checks leave.
  - The ℤ* and ℕ* sentences go.
  - Since the repair round, its callout (`:269-291`) also says that the exponent of `^` is now ℤ, so a negative power is admitted. The Working Draft gave its result through ℚ (1/2 for `2^(-1)`), and this chapter does not give it.
- **The superseded chapter** (`Specification/advanced-lib/numbers-advanced.tex:14-30`): one callout, and no word of the chapter changed (17 lines added, 0 removed).
- **Reductions** (`Specification/basic/expressions/reductions.tex:27-44`): answer 7's note, with the normative text unchanged. Since the repair round the note:
  - scopes the checker to "the compiled type checker when it checks the libraries this specification describes";
  - says that until the compiled path is built on those libraries, it compiles against a smaller library of its own. There ∑ and `BIG MAX` take no static argument and range over ℤ32 only, so the clause form runs unwritten and a written static argument is refused.
- **Coercions** (`Specification/basic/conversions-coercions.tex:64-88`): the automatic integer-to-float conversion becomes that of ℤ32 values and of integer numerals to ℝ64, with a callout.
  - Since the repair round, the callout says that the interpreter gives a numeral outside ℤ32's range a wider integer type and so does not yet convert it.
  - It also says that the compiled path's own library declares no coercion into ℝ64 from an integer type or an integer numeral; there ℤ32, ℕ32 and integer numerals convert to ℝ64 only explicitly, and the other integer types not at all.
  - Example 1 (`:158-159`) stands unchanged.
- **Literals** (`Specification/basic/expressions/literals.tex:188-210`):
  - one ℚ holds 1/0, −1/0 and 0/0;
  - the ℚ*-to-ℚ assignment rule is gone;
  - the team's margin note is kept.
- **Appendix I** (`Specification/appendices/changes.tex:41-46`, `:52-58`, `:98-99`, the entries `:435-1026`, "Passages not yet revised" `:1028-1051`, route C `:1053-1083`):
  - seven entries, I.1.10 to I.1.16;
  - the rule entry's wording and "Passages not yet revised" replaced;
  - route C updated.
  - Since the repair round, I.1.11 and I.1.12 quote the four method-entry originals whose types differed from the listing (`:730-741`, `:827-840`). I.1.16 carries the reductions scope (`:985-1016`). I.1.10, I.1.12 and I.1.15 carry the numeral wording and the negative power.
- **Rung S's box after E10** (`Specification/appendices/internal-document.tex:522-527`) no longer says that the number chapters are unrevised.
- **`Specification/fortress.pdf`**: the repair round's build, 620 pages (611 at the base; 619 after the first round).

`git diff --stat e5414f5bf -- . ':!explorations'` lists exactly these eight `.tex` files and the PDF.

## 2. Where it belongs, and the precedent search

**Where (rule 1).** The fix belongs in the prose chapters:
- The brief names `basic-lib/numbers.tex`, `basic-lib/basic-integers.tex`, `advanced-lib/numbers-advanced.tex` and `reductions.tex:23-25`.
- The list's scan (`explorations/compile-ladder/rung-spec-numbers/probes/scan/refined.txt`, `explorations/compile-ladder/rung-spec-numbers/probes/scan/relations.txt`) found `conversions-coercions.tex:59-71` and `literals.tex:182-209`. After the edit it found rung S's box in `internal-document.tex`.
- `Specification/library/apis/*.tex` is rendered from the `.fsi` files. It was neither edited nor cited as the standard (FACTS.md, "Citing `Specification/library/apis/*.tex` as an independent standard is circular.").

**Precedent (rule 2).** Rung S's form, used in 16 callouts and 8 entries (`Specification/appendices/changes.tex:55-427` at `e5414f5bf`):
- a callout after the passage;
- an entry with the affected sections, the change, the rationale, the effect, the original text with its frozen path and lines, and route C;
- originals are kept "Not allowed" in the body only for refused declarations. Prose is rewritten in place and quoted in the appendix (rung S's decision record, section 7).

This rung follows that form. No original declaration is kept in the body, since none of the removed lines is a declaration the rule refuses on its own.

The team's own refinement by run-time check exists in two places:
- the library's `check`/`check_star` on `RR64` (`Library/FortressLibrary.fsi:301-304`);
- the specification's `check` family (`numbers.tex:228-244`, `basic-integers.tex:290-301` at the base).

Answer 6 takes the first.

## 3. The specification derivation

**The decisions** (`explorations/coordinator/CLIMB-BATCH-6.md` section 3, T, "The decisions"):
- the chapters change with the flattening (`POSITIONS.md:132`);
- answer 6: the subtype lists are "rewritten as the library's run-time check methods (check/check_star, returning Maybe)", and the advanced chapter is kept word for word and marked superseded (`:158`);
- route A (`:92`);
- answer 8 and rung F's table (`:159`);
- answer 7's note (`:165`);
- the S1 form (`:109`, `:145`);
- the later Types chapter cited beside (`:110`).

**The one reading that settles the rational text** (decision record, section 2): the one type ℚ holds +∞, −∞ and 0/0.
- Answer 6's checks are the library's model: one wide type, refined at run time.
- The library's `QQ` holds `Ratio(1,0)`, `Ratio(-1,0)` and `Ratio(0,0)` (`Library/FortressLibrary.fss:628-631`, made at `:953-960`).
- The operator chapter says "For rational results, division by zero produces 1/0" (`Specification/basic/operators/opr-overview.tex:166`). The first round cited `:182-183`; the skeptic found the sentence at `:166`.
- Measured under walk: `explorations/compile-ladder/rung-spec-numbers/probes/examples/RatValues.walk.txt:3-10`.
- The integers hold no infinity (`Library/FortressLibrary.fss:647-648`), and the operator chapter's integer division by zero throws (`opr-overview.tex:165`; first cited as `:181`).
- The chapter's own words say that the type holding 0/0 is "neither totally ordered nor a field" (`numbers.tex:104` at the base). The rest follows from these.

**The signature rule.** The brief says that "a signature that names a refined type ... takes the type the library declares for it, and where the library does not declare the method the unrefined type". It was applied line by line; the table is in the decision record, sections 3.2 and 3.3. Under it, ℤ's `^` takes a ℤ exponent. The Working Draft's `2^(-1)` went to ℚ's `^` through the nesting that route A removes, so the revised chapter is silent on a negative power's result. The rung reports this and does not choose (section 9, item 5).

**The numeral coercion into ℝ64 follows answer 8's words.** Answer 8 reads "`ZZ32` and integer literals coerce into `RR64` (exact)" (`POSITIONS.md:159`). The first round wrote "every integer numeral whose value ℤ32 holds". That reads rung F's table, "`RR64` from `ZZ32`, which under walk is also every numeral that fits it", as the rule, when the table describes walk's typing of numerals by width (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`). The judge ruled for answer 8's words (`JUDGE.md` section 1.5), for four reasons:
- the specification's numeral model gives a numeral a type of its own, whose coercions the libraries define (`Specification/basic/expressions/literals.tex:126-148`);
- the compiled checker gives every integer numeral one type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:466-467`);
- Example 1 of the coercion chapter says "For any floating-point parameter, a decimal integer literal argument may be used" (`Specification/basic/conversions-coercions.tex:158-159`);
- the rung's own rationale already named "ℤ32 and the numerals".

**The reductions note.** Row 425 measured the compiled checker on a library copy that carried answer 7's generic `SUM`. The compiled path as it runs programs checks against its own prelude, whose `BIG +` and `BIG MAX` are declared for `ZZ32` alone with no static parameter (`Library/CompilerLibrary.fsi:180-184`). There the unwritten clause form runs, and `SUM[\ZZ32\][j <- 0#4] j` is refused (`explorations/compile-ladder/rung-spec-numbers/probes/skeptic/SkSumClause.t1.txt`, `explorations/compile-ladder/rung-spec-numbers/probes/skeptic/SkSumClauseTyped.t1.txt`). The note now says both.

## 4. Decisions

Each decision is listed with the alternative rejected. The full reasoning is in the decision record, section 5, whose numbers these are.
1. ℚ holds ±∞ and 0/0. Rejected: ℚ finite, with division by zero throwing. That contradicts the library, the operator chapter (`opr-overview.tex:166`) and answer 6's checks.
2. ℚ's field and order clauses leave its listing, and nothing replaces them. Rejected:
   - ℚ≠ written ℚ, which states a field whose 0 has an inverse;
   - `AbelianGroup[\QQ,+,-\]` alone, the superseded design's clause for the type with every flag set. It is a choice from the superseded mechanism, and false at +∞ + −∞;
   - leaving them and reporting a stop.
3. The two `CMP` declarations become one returning `Comparison`, the library's. Rejected: keeping two, which is an invalid overload set once both take ℚ.
4. `^` on ℤ takes a ℤ exponent. Rejected: the library's `AnyIntegral`, since the library's integer `^` is another method, returning `RR64`. The judge upheld this (`JUDGE.md` section 1.4). Its consequence, a negative power whose result the chapter no longer gives, is reported and not chosen (callout `basic-integers.tex:269-291`; I.1.12's Effect; row 441 of `record.md`).
5. The positive-integer lattice sentence keeps its mathematics and loses only the type. Rejected: dropping it.
6. One callout per passage group. Rejected: one per method entry.
7. The promotion rule appears only as future text in a callout. Rejected: normative text, which is a stop.
8. `check` and `check_star` are stated once, on ℝ64, in the rational section. Rejected: a new ℝ64 listing.
9. New typeset lines are generated by `fortify` in region mode, in batch. Retyped lines are the team's lines with the type changed.
10. The advanced chapter's callout sits after its label, before its first heading. Rejected: inside the body.
11. Seven number types are named, not `RR32`. Rejected: naming `RR32` below `RR64`, against `types-vals-vars.tex:536`, which stays.
12. **(Repair round, the judge's ruling.)** ℝ64 coerces from ℤ32 and from integer numerals, in answer 8's words.
    - Rejected: the skeptic's alternative, keeping "the numerals ℤ32 holds" and marking Example 1 superseded. That would make `s: RR64 = 3000000000` illegal by the specification, only because walk cannot type that numeral as ℤ32.
    - Cost: one row (443) and an `XXX` walk test owed by a rung that may edit tests.
    - Residue for Pavol: "(exact)" and a numeral above 2^53.
13. Appendix I quotes removed listing lines without their alignment commands. Rejected: keeping the commands verbatim, which stopped the build ("Undefined tab position").
14. **(Repair round.)** The four method-entry originals are quoted as their `\Method` lines, byte for byte, inside a `quote` in which `\renewcommand\Method[1]{#1\par}` sets each as a line (`changes.tex:736`, `:835`).
    - The judge's step 2 asked for `\Method` lines, with a fallback of their `\EXP` content in a `Fortress` block if the build refused `\Method` there.
    - The build does refuse it. `\Method` is `\librarysubsection`, a sectioning command (`latex-common/macros/macros.tex:268-277`), and a test build with the two bare lines stopped at "! Argument of \let has an extra }" (`explorations/compile-ladder/rung-spec-numbers/probes/repair/method-test.txt`).
    - The fallback would drop `\Method{` from the source, so the quote check of the judge's step 9 would still report the four lines unquoted. The local redefinition satisfies both steps.
    - Each entry says that in the chapter the line was the heading of its entry.
    - This is a decision against the letter of the fallback. Rejected: the bare `\Method`, which stops the build, and the fallback, whose source line is no longer verbatim.

## 5. The recorded failure and the recorded pass

No test can go red for a prose edit. The precedents are batch 3's comment-only rung and batch 5's rung S.

**Recorded failure: the base build's text.**
- `explorations/compile-ladder/rung-spec-numbers/probes/build/base-vs-edit-pdftotext-diff.txt:215`: "< Q (QQ ) is the set of rationals (it is a subtype of R and Q∗ )."
- `:269`: "< The Fortress type system tracks these types closely through various arithmetic operations".
- The base build passed: `explorations/compile-ladder/rung-spec-numbers/probes/build/base-genSource.txt:211` BUILD SUCCESSFUL; `explorations/compile-ladder/rung-spec-numbers/probes/build/base-tex.txt:15691` "Output written on fortress.pdf (611 pages, 2026407 bytes).", `:15694` BUILD SUCCESSFUL.
- The compiled checker refuses the trait that defines those types: `explorations/reviews/flattening-questions-ways/Q3ConditionalExtension.comp.txt:3`.
- The base build's text equals the committed PDF's (`explorations/compile-ladder/rung-spec-numbers/probes/build/committed-vs-base-pdftotext-diff.txt`: no difference).

**The refusal's text defects, recorded before the repair.**
- `explorations/compile-ladder/rung-spec-numbers/probes/skeptic/quotecheck.txt` listed the four method-entry lines as NOTQUOTED.
- `explorations/compile-ladder/rung-spec-numbers/probes/skeptic/SkSumClauseTyped.t1.txt` shows the spelling the first callout advised refused on the compiled path.

**Recorded pass (the repair round).**
- `explorations/compile-ladder/rung-spec-numbers/probes/build/repair-tex.txt:11822`: "Output written on fortress.pdf (620 pages, 2072091 bytes)."; `:11825` BUILD SUCCESSFUL.
- `explorations/compile-ladder/rung-spec-numbers/probes/build/repair-genSource.txt:211`: BUILD SUCCESSFUL. This is on the committed tree `5ae598956`.
- The final `fortress.log` has no `LaTeX Warning: Reference`, no "There were undefined references", no "multiply defined" and no "Undefined control sequence" (each counted 0).
- `Specification/fortress.pdf` is that build's output: its normalised text equals the build's.

**The text diff** (`explorations/compile-ladder/rung-spec-numbers/probes/build/base-vs-edit-pdftotext-diff.txt`) has 133 hunks. Each is assigned a cause in `explorations/compile-ladder/rung-spec-numbers/probes/build/diff-hunks.txt`:
- The revised passages, callouts and entries (T1 to T18), five of them with the repair round's changes named.
- Page shifts, where pdftotext re-orders or re-hyphenates the same words across moved page breaks and margin notes.
- In this build, the page break in Chapter 13 falls before the paragraph on matrices, so the team's long margin note (`Specification/basic/expressions/aggregate.tex:156-178`) sits at the top of page 148 and prints every line. The first round's build lost four of them. The two Appendix E hunks of the first round are gone.

**The repair's own checks** (home 1 for a prose rung):
- `explorations/compile-ladder/rung-spec-numbers/probes/repair/quotecheck.txt` no longer lists the four lines, and gives a reason for each of the 57 it still lists.
- `explorations/compile-ladder/rung-spec-numbers/probes/repair/text-check.txt` finds each repaired sentence in the rebuilt PDF's text.

Part IV of the PDF is rendered from the base's `Library/*.fsi`, since this worktree carries the base library. The gather rebuilds on the merged tree (`CLIMB-BATCH-6.md` section 4).

## 6. Differentials

There is no program to run both ways (the brief).

The first round's one probe, `explorations/compile-ladder/rung-spec-numbers/probes/examples/RatValues.fss`, measures the library's rational values under walk on the base (`RatValues.walk.txt:3-11`). The compiled path's prelude has no `QQ`, so it has no counterpart.

The skeptic ran 17 probes on both paths (`explorations/compile-ladder/rung-spec-numbers/probes/skeptic/`, `SKEPTIC.md`, "Differentials"). The two reduction probes also ran at 4 threads. The repair round ran no program: every statement it adds rests on one of those captures or on a declaration it cites.
- the negative power: `SkIntPowerNeg.t1.txt`, `SkIntPowerType.t1.txt`;
- the numeral into ℝ64: `SkNumeralFloat.t1.txt`;
- the reductions note: `SkSumClause.t1.txt`, `SkSumClauseTyped.t1.txt` and `.t4.txt`;
- `0/0 CMP 0/0`: `SkRatSpec.t1.txt:22`;
- the compiled path's integer conversions: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:268`, `:327`, `:396` and `:433-435`.

## 7. Defect homes

**The two refusal items and the skeptic's other text defects.** These are defects of the rung's own text, repaired in this round:
- the unquoted method entries behind the false "same signatures";
- the unscoped reductions callout;
- the wrong `opr-overview` citations;
- Example 1 contradicted by the first numeral wording;
- the decision record's section 6;
- the report's section 10.

Home 1. For a prose rung the gated check is the rebuilt text: `explorations/compile-ladder/rung-spec-numbers/probes/repair/quotecheck.txt`, `explorations/compile-ladder/rung-spec-numbers/probes/repair/text-check.txt`, and the text diff with its causes. All were in place before this report.

**`0/0 = 0/0` and `0/0 CMP 0/0` under walk.** Walk answers `true` and `EqualTo` (`RatValues.walk.txt:8`; `SkRatSpec.t1.txt:22`). The specification makes 0/0 unordered with itself (`Specification/basic-lib/numbers.tex:355-359`) and gives `CMP` the value `Unordered` (`:365-369`). It settles the question against the library, so the home would be 2. This rung may add no test, and `QQ` is rung F's file. So it goes to row 440, with the owed `XXX` test asserting both faces. That is the brief's fourth case.

**The negative integer power.** The specification is silent after the revision, and T's own stop forbids choosing. Home 3: the skeptic's committed captures and row 441.

**The compiled prelude lacks the chapters' conversions and checks.** The specification settles it, but the prelude takes no new declaration before the switch-over (`POSITIONS.md:46`). Fourth case: row 442, closed by the switch-over, with rows 314 and 316 as precedent.

**Walk's numeral narrowing.** The specification settles it (Example 1 with answer 8), and this rung may add no test. Fourth case: row 443, with the owed `XXX` walk test.

**`RR32` below `RR64`.** This contradicts `types-vals-vars.tex:536`. It is a reading kept by the batch record's section 1 and reported (section 9), not measured.

## 8. Stops

None of the stops the batch record's intro reserves for Pavol is met:
- no edit under `Specification-1.0-frozen/` (`git diff --quiet e5414f5bf -- Specification-1.0-frozen` succeeds);
- no word of the advanced chapter's body changed (17 lines added at its head, none removed);
- no normative promotion rule, sign check or `widens`;
- `overloading.tex` and `arrays-distributed.tex` untouched;
- the build changed no tracked file but `Specification/fortress.pdf`;
- no file of another rung touched.

The negative power meets T's own section stop, "A passage whose new text neither the decisions nor rung F's table settle". The rung reports it in the callout and in Appendix I and does not choose. That stop is not one the intro reserves, so it is not a `stopsMet` entry (`JUDGE.md` section 1.4).

The passages whose new text the rung derived, ℚ's value set and its algebra (section 4, items 1 and 2), are presented as settled by answer 6, the library and the specification's own words. The skeptic and the judge accepted that reading.

## 9. What comes back to Pavol

The list is also `explorations/compile-ladder/rung-spec-numbers/probes/repair/for-pavol.txt`.
1. **The revised pages.** `Specification/fortress.pdf`:
   - Chapter 33 from page 361;
   - the head of Section 41.1 on page 415;
   - Section 13.1's literals;
   - Section 13.17 on page 135;
   - Section 17.1 on page 173;
   - Appendix I.1.10 to I.1.16 from page 587.

   The text diff is `explorations/compile-ladder/rung-spec-numbers/probes/build/base-vs-edit-pdftotext-diff.txt`, with its causes in `explorations/compile-ladder/rung-spec-numbers/probes/build/diff-hunks.txt`.
2. **The Appendix I entries** (`Specification/appendices/changes.tex:435-1026`). Every original is quoted, the four method-entry lines included.
3. **The list**, with what was left and why: `explorations/compile-ladder/rung-spec-numbers/probes/list.txt` (T1 to T18, L1 to L16, and the corrections appended).
4. **A decision taken under answer 8's words** (the judge's, `JUDGE.md` section 3). ℝ64 coerces "from ℤ32 and from integer numerals", so Example 1 stands.
   - Walk's narrowing is row 443.
   - Open for Pavol: should a numeral above 2^53, which ℝ64 cannot hold exactly, still coerce, given answer 8's "(exact)"?
5. **Unsettled: the result of a negative integer power.**
   - The Working Draft gave 1/2.
   - Walk gives 0.5; the compiled path gives 0.
   - The one library declares `RR64`.
   - The chapter now says nothing, and the callout reports it.
   - The options: a rational, a throw, or `RR64` (row 441).
6. **The reading with the most consequence:** ℚ holds ±∞ and 0/0, so it is neither totally ordered nor a field. One word reverses it; division by zero would then throw, and the library's `Ratio` would diverge. Separately, the library answers `0/0 = 0/0` true and `0/0 CMP 0/0` `EqualTo`, against the specification (row 440).
7. **`QQ` and the checks.** On the flat library `QQ` loses the `check` and `check_star` it inherits from `RR64` today, so answer 6's checks exist for `RR64` (and `RR32`) only unless rung F restates them on `QQ`. The chapter states them on ℝ64, and the gather adds them to ℚ if F does.
8. **`RR32`.** The library's `RR32` stays below `RR64`, while the specification makes the numeric types mutually exclusive (`Specification/basic/types-vals-vars.tex:536`) and models the widening from ℝ32 as a coercion. The chapters name no ℝ32, so they state nothing false, and the divergence predates this batch.

## 10. Not done

- **The gather's work:**
  - the check of every statement against the landed library (decision record, section 6, now eleven statements, with `RR32`'s checks expected and ℤ's `^` marked pre-existing);
  - the rebuild on the merged tree;
  - the re-measurement of rows 440 and 443 on the flat library.
- **The owed `XXX` tests** of rows 440 and 443: for a rung that may edit tests and `QQ`.
- **The checker count** was not run. It is 125 by construction, since the rung touches neither the checker nor `Library/`.
- **The build's ignored products** are not in the worktree. The repair round removed them with `git clean -fX -- Specification`, and `git status --ignored --short Specification` printed nothing after the rebuild's commit. The first round's sentence that they were left in the worktree was wrong: the skeptic found none at the tip.
- **REPORT.md** is not on the branch: the harness refused the write in both rounds. This text is it, for the gather to write verbatim.

## 11. The tracked-path check

It was run after the last commit over `record.md`, `decision-record.md`, `JUDGE.md` and every `explorations/compile-ladder` path this text cites. It printed one line, "MISSING explorations/compile-ladder/rung-spec-numbers/REPORT.md", from `JUDGE.md`'s citation of this report. That file is the one the harness refused, and the gather writes it from this text. It printed no UNTRACKED line.

## 12. Machine and timings

Every build log opens with its machine line: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`, and the load average at its start.
- **Base** (`e5414f5bf`): `./ant genSource` 81 s (load 1.14), `./ant tex` 58 s (2.20).
- **First round's final build** (`679c542d3`): `genSource` 39 s (2.85), `tex` 32 s (2.12).
- **Repair round's test build** with the bare `\Method` (working tree on `697c3b51b`): `genSource` 51 s, `tex` stopped after 8 s (load 6.25).
- **Repair round's build** (`5ae598956`): `genSource` 58 s (load 6.96), `tex` 35 s (load 8.76). The load came from the other rungs running beside it.

## Repair round

The judge's steps (`explorations/compile-ladder/rung-spec-numbers/JUDGE.md` section 4), each with its result:
1. **Setup.** Worktree `/home/user/fortress-numbers`, branch `wip/rung-spec-numbers` at `697c3b51b`. `env.sh` sourced once, and `FORTRESS_HOME` printed the worktree. `TMPDIR` is the worktree's `tmp/`. Nothing was built but the specification, and no gate target was run.
2. **I.1.11.** "with the same signatures" is replaced (`changes.tex:730-741`): the entries at lines 327--328, 345--346, 388, 416--417, 488--493 and 546--562 repeated the signatures. Frozen `numbers.tex:339` (division returning ℚ\*) and `:387` (`CMP` taking ℚ, returning `TotalComparison`) are quoted verbatim as `\Method` lines. The form is decision 14, the build's refusal of a bare `\Method` is `probes/repair/method-test.txt`, and the entry says each line was its entry's heading.
3. **I.1.12.** The same repair (`changes.tex:827-840`), for lines 425, 507, 551, 600, 669--672 and 888--899.
   - It adds that line 507 set the power as a caret where the listing's line 246 set an underscore. That is a primary-source detail the judge's list did not name, found by reading the lines (frozen `basic-integers.tex:246`, `:507`).
   - Frozen `:622` (`|self| : ℕ`) and `:816` (`lowBits : ℕ`) are quoted, with a note that the listing's `:284` already said ℤ and that ℕ was a synonym for ℤ≥ (frozen `:65`).
   - The Change now names "the result of `lowBits` in its method entry" (`changes.tex:774-777`).
4. **The reductions callout** (`reductions.tex:27-44`). Scoped as the judge wrote, with one sentence on the compiled path's smaller library and no repository path.
5. **I.1.16** (`changes.tex:995-1026`). The Change and the Rationale say the same. The Rationale cites `\nolinkurl{Library/CompilerLibrary.fsi}` lines 180--184 and the skeptic's `SkSumClauseTyped.t1.txt` beside rows 424 and 425.
6. **The negative power.** Three sentences in the `revival-integers` callout (`basic-integers.tex:286-291`) and in I.1.12's Effect (`changes.tex:791-797`). The `^` entry and its property are unchanged (`basic-integers.tex:495-505`).
7. **The numerals.** The edits:
   - `numbers.tex:43`: "from ℤ32, and from integer numerals (`\secref{literals}`)";
   - `conversions-coercions.tex:65-66`: "of values of type ℤ32, and of integer numerals, to the floating-point type ℝ64";
   - the callout (`:74-88`): "from ℤ32, and the decision names the integer numerals too", then the interpreter sentence;
   - I.1.10's Change (`changes.tex:448`), I.1.15's Change (`:973-976`) and Effect (`:980-984`, Example 1 stands). Example 1 itself is unchanged. No provisional row number appears under `Specification/`.

   **One instruction was wrong against a primary source.** The judge's callout sentence was "the compiled path's own library declares no conversion into ℝ64 from an integer". The prelude does declare explicit conversions: `asRR64(): RR64` on `ZZ32`, `NN32` and `IntLiteral` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:268`, `:327`, `:396`). What it lacks is a coercion: its `RR64` coerces from `FloatLiteral` and `RR32` only (`:433-435`). So the sentence reads "declares no coercion into ℝ64 from an integer type or an integer numeral; there ℤ32, ℕ32 and integer numerals convert to ℝ64 only explicitly, and the other integer types not at all" (`conversions-coercions.tex:86-88`), as the second skeptic's correction 1 wrote it at the gather: `ZZ`, `ZZ64` and `NN64` declare no conversion into `RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-146`, `:147-209`, `:332-389`; `explorations/compile-ladder/rung-spec-numbers/probes/skeptic/Sk2Z64AsRR64.t1.txt`).
8. **Rebuild.** `./ant genSource` then `./ant tex` in `Specification/fortress/` with `FORTRESS_HOME` set to the worktree:
   - logs `probes/build/repair-genSource.txt` and `probes/build/repair-tex.txt`, each headed by its machine line;
   - BUILD SUCCESSFUL both, 620 pages, and no undefined or multiply defined reference;
   - the PDF copied to `Specification/fortress.pdf`;
   - the text diff regenerated with `norm.sh` (133 hunks), and `diff-hunks.txt` giving every hunk a cause;
   - `git clean -fX -- Specification`, after which `git status --ignored --short Specification` printed nothing once the PDF was committed.
9. **Checks.**
   - `python3 explorations/compile-ladder/rung-spec-numbers/probes/skeptic/quotecheck.py > explorations/compile-ladder/rung-spec-numbers/probes/repair/quotecheck.txt`, run on `5ae598956`: none of the four lines is reported. Each of the 57 remaining lines has a reason appended: the `\Method` entries that repeated the listing, the two lines whose only change is an alignment command, the check entries named by line, the qualifier sentences named by line, their two continuation lines, a `\newpage`, and the internal document's box quoted in `decision-record.md` section 3.8.
   - `probes/repair/text-check.txt`: `grep -n` of the rebuilt PDF's text for "integer numerals", the negative-power sentences, the scoped reductions sentences, Example 1 and the four quotes.
10. **`probes/list.txt`.** The text written before the edit is untouched. Under "CORRECTIONS MADE AFTER THE LIST WAS COMMITTED" it adds:
    - `:182-183` becomes `:166`; `:181` becomes `:165`; L4's `:176-183` becomes `:164-169`;
    - L2 was wrong about Example 1;
    - the four method-entry lines are now quoted.
11. **`decision-record.md`.**
    - The `opr-overview` citations are fixed (sections 2 and 5, decision 1).
    - Sections 3.1 and 3.6 use answer 8's words; 3.7 gives the reductions scope.
    - Decision 4 has its consequence; decisions 12 (the numerals, the judge's ruling), 13 (alignment commands) and 14 (the `\Method` quotes) are added.
    - Section 6: statement 3 rewritten; statement 5 with `RR32`'s checks (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:56-59`); statements 9 (ℤ's `^`, pre-existing, `Library/FortressLibrary.fsi:457`), 10 (integer `/` gives a rational, the list's L3) and 11 (the explicit conversion into ℝ64, today `asFloat` on `Number` in `Library/FortressLibrary.fss:358` only, the gather's rule).
    - Section 7 has the repair build.
12. **`record.md`.**
    - The FACTS line: ℝ64 from ℤ32 and integer numerals; `opr-overview.tex:166`; "quote every original"; the integer-to-float sentence; 620 pages.
    - Row 440 with the `CMP` face and both assertions.
    - Notes to rows 424 and 425 with the compiled path's own library.
    - Rows 441 (the negative power, home 3, "matches no source"), 442 (the prelude's missing conversions and checks, closed by the switch-over), and 443 (walk's numeral narrowing, with the owed `XXX` test).
    - The handover line with the two open items.
13. **This report.** The harness refused its write, so it is carried in the structured result. The list for Pavol is `probes/repair/for-pavol.txt`.
14. **Close.**
    - The tracked-path check (section 11).
    - `git diff --stat e5414f5bf -- . ':!explorations'` lists the eight `.tex` files and the PDF.
    - `git diff --quiet e5414f5bf -- Specification-1.0-frozen` succeeds.
    - Committed with the protocol's footer and pushed to `wip/rung-spec-numbers` only.
