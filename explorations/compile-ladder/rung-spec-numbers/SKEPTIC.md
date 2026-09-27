# Skeptic, rung T (`rung-spec-numbers`): the second judgement

*Row numbers, noted at the merged-diff review of climb batch 6: the rows 431, 432, 433 and 434 this file cites are rung T's provisional numbers, which the gather opened as ledger rows 440, 441, 442 and 443 in that order; the ledger's rows 431-434 are rung F's (`explorations/compile-ladder/climb-batch-6/RECORD.md`, "Final row numbers").*

**Verdict: approved, with two required corrections.** The repair round fixes both grounds of the first refusal. The four method-entry originals are now quoted byte for byte, and the reductions callout is scoped to what was measured. The judge's other steps are carried out as instructed. One sentence the repair round wrote is false as written. That is the last clause of the coercion callout (`Specification/basic/conversions-coercions.tex:86-88`), which says the compiled path converts "each" integer type to ℝ64 explicitly, but three of its integer types have no conversion into ℝ64 at all (correction 1). It is one clause of a non-normative callout, and the gather rebuilds the PDF on the merged tree anyway, so it is a correction and not a second refusal. No stop the batch record's intro reserves for Pavol is met.

The judgement was made on `wip/rung-spec-numbers` at `8b36d5ca6`, with base `e5414f5bf`, in worktree `/home/user/fortress-numbers`. The first judgement (below) refused the rung at `1c9f12c72`, and the judge ruled repair at `697c3b51b`. The worker's repair round is `5ae598956` (the text), `8d54e531a` (the rebuild and its checks) and `8b36d5ca6` (the record). I did not rely on the worker's logs. I rebuilt the specification, re-ran the quote check, opened every citation of the provenance block and every line the repair round cites, and ran eleven probes of my own on both paths. Those captures are under `explorations/compile-ladder/rung-spec-numbers/probes/skeptic/` and prefixed `Sk2`, and each opens with its machine line.

## 0. The provenance block (in `reportText`, since the harness refused REPORT.md again)

I opened every citation with `sed -n`, and the block passes.
- **problem**
  - At `e5414f5bf`, `Specification/basic-lib/numbers.tex:36-91` is the tabbing of the eighteen rational types, each "a subtype of" others.
  - `explorations/reviews/flattening-questions-ways/Q3ConditionalExtension.comp.txt:3` is "Cyclic type hierarchy: Type RationalQuantity transitively extends itself."
  - `explorations/coordinator/CLIMB-BATCH-6.md:122` ends "Batch 6's rung F makes the library flat".
- **spec**
  - `Specification/basic/types-vals-vars.tex:535-539` holds "These types are mutually exclusive" (:536) and "The numeric types share the common supertype Number" (:539).
  - `:218-237` is the exclusion rule.
  - `Documentation/Specification/Prose/Language/types.tick:977-978` holds the same two sentences.
  - No citation is to `library/apis/`.
- **precedent**
  - `types-vals-vars.tex:238-250` is rung S's callout.
  - `Specification/appendices/changes.tex:61-117` is its instantiation-exclusion entry.
  - `Library/FortressLibrary.fsi:347-350` declares `getter check(): Maybe[\RR64\]` and `getter check_star(): Maybe[\RR64\]`.
- **deviation**
  - `numbers.tex:196-214` is the listing callout, and `:56-61` is the getter block.
  - `changes.tex:693-728` and `:801-825` are the two quoted `Fortress` blocks.
  - `changes.tex:736` and `:835` are the two `\renewcommand\Method[1]{#1\par}` lines.
  - `numbers-advanced.tex:14-30` is the superseded chapter's callout.
- **historical**
  - It names the eight `.tex` files and the PDF, which are exactly what `git diff --stat e5414f5bf HEAD -- . ':!explorations'` lists.
  - `CLIMB-BATCH-6.md:282` is the provenance rule.

## 1. The recorded failure and the recorded pass

The rung is prose, so no test goes red. The batch record's rule for T ("How it is checked") takes the base build's text as the failure.

**Failure.**
- `probes/build/base-vs-edit-pdftotext-diff.txt:215` is "< Q (QQ ) is the set of rationals (it is a subtype of R and Q∗ )." and `:269` is the tracking sentence.
- On the base build, `probes/build/base-tex.txt:15691` reads "(611 pages, 2026407 bytes)" and `:15694` reads BUILD SUCCESSFUL.
- The refusal's own text defects were captured before the repair: `probes/skeptic/quotecheck.txt` lists the four lines as NOTQUOTED, and `probes/skeptic/SkSumClauseTyped.t1.txt` shows the recommended spelling refused.
- The repair round's refused form is captured in `probes/repair/method-test.txt`: the bare `\Method` inside a quote stops the build at "! Argument of \let has an extra }", at `changes.tex` l.736.

**Pass.** `probes/build/repair-tex.txt:11822` reads "(620 pages, 2072091 bytes)" and `:11825` reads BUILD SUCCESSFUL. `probes/build/repair-genSource.txt:211` reads BUILD SUCCESSFUL. Both are on `5ae598956`.

**My rebuild** (`probes/skeptic/rebuild-repair.txt`) ran at the tip `8b36d5ca6`: `./ant genSource` took 39 s and `./ant tex` 31 s, from a load average of 1.44.
- Both targets succeeded, with 620 pages.
- `fortress.log` has 0 undefined references, 0 multiply defined labels and 0 undefined control sequences. It has no real `! ` error line: the 47 lines that begin with `!` are fragments of the build's own tracing.
- The PDF differs from the committed `Specification/fortress.pdf` in 74 bytes (its date and ID). Their `pdftotext -layout` texts are identical once the date lines are dropped.
- I then ran `git clean -fXq -- Specification`, and `git status --short --ignored Specification` printed nothing.

## 2. The diff: the repair round against the judge's steps

**Steps 2 and 3, the four method-entry originals.**
- `changes.tex:737-738` and `:836-837` equal `Specification-1.0-frozen/basic-lib/numbers.tex:339`, `:387` and `Specification-1.0-frozen/basic-lib/basic-integers.tex:622`, `:816` byte for byte (`cat -A` of each pair).
- I checked "repeated these signatures" entry by entry against the quoted listing lines.
  - The rational entries 328, 345-346, 388, 416-417, 488-493 and 546-562 match; the checks differ from the listing only by a `\:` of spacing.
  - The integer entries 425, 551, 600, 669-672 and 888-899 match.
  - Entry 507 differs only by the caret where listing line 246 has `\char'137`, which the entry now says.
- One more mismatch exists that the entries do not name. The integer `CHOOSE` entry (frozen `basic-integers.tex:565`) already said ℤ where the listing's `:250` said ℕ. The revision leaves that entry as it was, so its original stays readable in the chapter itself, and the sentence "Two did not" is about entries the revision changed. Nothing is lost.
- Decision 14 (a `\renewcommand\Method[1]{#1\par}` local to each `quote`) is sound.
  - `\Method` is `\librarysubsection` (`latex-common/macros/macros.tex:268-277`), and the bare form stops the build.
  - The `quote` environment is a group, so the redefinition ends with it.
  - The rebuilt text prints the four signatures as lines (`opr /(self, other : Q): Q∗`, `opr CMP(self, other : Q): TotalComparison`, `opr |self| : N`, `lowBits(self, k: IndexInt): N`).

**Steps 4 and 5, the reductions callout (`Specification/basic/expressions/reductions.tex:27-44`) and I.1.16 (`changes.tex:985-1016`).**
- The checker clause is scoped to "the compiled type checker when it checks the libraries this specification describes", which is what row 425 measured, on a library copy.
- The added sentence is true on the compiled path as it runs, and my probes extend the first judgement's `SUM` measurement to the other operator and to a non-integer body:
  - `BIG MAX[\ZZ32\][j <- 0#4] j` is refused, "Wrong number or kind of static arguments for function: BIG MAX" (`Sk2MaxTyped.t1.txt`);
  - `BIG MAX[j <- 0#4] j` runs, giving 3 on both paths (`Sk2MaxClause.t1.txt`);
  - `SUM[j <- 0#4] 0.5` is refused on the compiled path, because its `__generate` takes `ZZ32->ZZ32`, while walk gives 2.0 (`Sk2SumFloat.t1.txt`). So "range over ℤ32 only" holds.
- `Library/CompilerLibrary.fsi:180-184` declares exactly `BIG +` and `BIG MAX`; its `BIG ||` (`:177`) sits inside a comment (`:176-178`).
- No repository path is in the callout. I.1.16 cites the prelude's lines and the first judgement's capture, as the judge asked.

**Step 6, the negative power.**
- It is reported at `Specification/basic-lib/basic-integers.tex:286-291` and in I.1.12's Effect (`changes.tex:791-797`, citing frozen `numbers.tex:344-355`, which holds `x^y = 1/(x^-y)` at `:355`).
- The `^` entry and its property are unchanged (`basic-integers.tex:495-505`).
- The text reports the gap and does not choose a result.

**Step 7, the numerals.**
- `numbers.tex:43`, `conversions-coercions.tex:65-66`, I.1.10's Change (`changes.tex:448`), and I.1.15's Change and Effect (`:963-974`) use answer 8's words (`explorations/coordinator/POSITIONS.md:159`, "`ZZ32` and integer literals coerce into `RR64` (exact)").
- Example 1 (`conversions-coercions.tex:158-159`) is unchanged and true again.
- No provisional row number appears under `Specification/` (the one "431" in the added text is a frozen line number).
- The callout's first new sentence is true: walk types a numeral by its width (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`).
- The last sentence is not wholly true. Its first clause is: "The compiled path's own library declares no coercion into ℝ64 from an integer type or an integer numeral", since its `RR64` coerces from `FloatLiteral` and `RR32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`).
- Its second clause, "there each converts to ℝ64 only explicitly", is false for three of the five integer types:
  - the prelude declares `asRR64` on `ZZ32` (`:268`), `NN32` (`:327`) and `IntLiteral` (`:396`) only;
  - `ZZ` (`:103-146`), `ZZ64` (`:147-209`) and `NN64` (`:332-389`) declare no conversion into `RR64`;
  - the compiled path refuses `w.asRR64()` for a `ZZ64`, "No such method ZZ64.asRR64." (`Sk2Z64AsRR64.t1.txt`).
- The worker was right that the judge's wording ("declares no conversion") was false against `:268`, `:327` and `:396`. The replacement overstates the other way. This is correction 1. The same sentence stands in `reportText` (its decision on the callout and section 4, item 7 of "Repair round"). `decision-record.md` section 3.6 states it correctly ("its `ZZ32`, `NN32` and `IntLiteral` declare the explicit `asRR64`").

**No other normative text changed.** Outside Appendix I, the repair round changed normative sentences only at `numbers.tex:43` and `conversions-coercions.tex:65-66`. Its other edits in the chapters are inside `\revision` callouts.

**The text diff** (`probes/build/base-vs-edit-pdftotext-diff.txt`) has 133 hunks, and `probes/build/diff-hunks.txt` gives each a cause ("133 hunks, 0 unclassified"). I spot-checked the repair round's hunks: T14 at base lines 5708-5711, T15 at 7488-7489, and T17 at 28438-28445.

**The quote check.** I re-ran it (`python3 .../probes/skeptic/quotecheck.py`). It lists 57 NOTQUOTED lines, the same 57 as `probes/repair/quotecheck.txt`, and none of the four lines. The worker's reasons for the 57 are true as far as I opened them:
- the checks named by line;
- the qualifier sentences named by line, with their two continuations;
- the two alignment-only lines;
- the `\newpage`;
- the `\Method` entries that the entries now say repeated the listing;
- the internal document's box, which `decision-record.md` section 3.8 quotes.

## 3. The precedent search

Rung S's S1 form is followed, as the first judgement found. The local redefinition of `\Method` has no precedent in Appendix I; it is disclosed as decision 14, with the two alternatives it rejects. Rows 314 and 316 are the right precedent for row 433 (prelude gaps kept as rows), and row 317 for the fourth-case rows.

## 4. The test

The rung may add no test and adds none (its section, "Files it may touch").

## 5. The competing-declaration grep

I re-ran it over `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `ProjectFortress/src/com/sun/fortress` and `Library`. The names the chapters drop (`QQ_star`, `QQ_splat`, `ZZ_star`, `check_LT`, `check_star_LT`) appear only in `Library/incomplete/basic/Fortress.Number.fsi`, which no build compiles. `NN_star` appears nowhere. `RationalQuantity` appears only in `ProjectFortress/tests/conditionalExtension.fss`. `asRR64`, which the new callout names by implication, appears only in the compiled prelude (`CompilerBuiltin.fsi`, `.fss`).

## 6. record.md

- **The FACTS line.** Every citation opens to what it says:
  - `numbers.tex:27-49`, `:51-65`;
  - `basic-integers.tex:16-37`, `:51-65`, `:269-291`;
  - `reductions.tex:27-44`;
  - `conversions-coercions.tex:64-69`, `:158-159`;
  - `opr-overview.tex:166`;
  - `RatValues.walk.txt:3-10`.
  - "Quote every original" is true after the repair. The sentence "the gather checked the chapters against the landed library and rebuilt the PDF on the merged tree" is the gather's to make true.
- **Row 431** is true as written: `SkRatSpec.t1.txt:21-22`, `RatValues.walk.txt:8-9`, `Library/FortressLibrary.fss:215-219`, `:533`; `numbers.tex:355-359`, where the five operators include `=` (`:351-352`), and `:365-369`.
- **Rows 432, 433 and 434** are true as written. I recommend two additions below, to 432 and 433.
- **Numbering.** Nothing is renumbered, and the provisional numbers are marked as the gather's.
- **The notes** to rows 404, 424 and 425 and to worklist item 12 are as the first judgement found, plus the scope sentence.

## 7. The defect homes

This is a prose rung, so for a text repair "the assertion in the rung's gated test" is the rebuilt text and its check. That is how the first judgement and the judge treated it, and the worker's `probes/repair/text-check.txt` and `probes/repair/quotecheck.txt` are those checks for the refusal's items. My rebuild confirms them.

| Defect | Home | Where |
|---|---|---|
| The four unquoted originals and "same signatures" (first refusal, a) | 1, repaired | `changes.tex:730-741`, `:827-840`; `probes/repair/quotecheck.txt`; my re-run |
| The unscoped reductions callout (first refusal, b) | 1, repaired | `reductions.tex:27-44`, `changes.tex:985-1016`; `Sk2MaxTyped`, `Sk2MaxClause`, `Sk2SumFloat` |
| The `opr-overview` citations; Example 1; the decision record's section 6; the report's section 10 | 1, repaired | as the worker lists |
| "There each converts to ℝ64 only explicitly" (this judgement) | 1, by correction 1 at the commit stage, checked in the gather's rebuilt text | `conversions-coercions.tex:86-88`; `Sk2Z64AsRR64.t1.txt` |
| `0/0 = 0/0`, `0/0 CMP 0/0` under walk | fourth case, row 431 with its owed `XXX` test | `record.md` |
| The negative power | 3: the specification is silent after the revision (the callout at `basic-integers.tex:286-291` says "This chapter does not give it"), captures committed | row 432; my `Sk2PowNegEdge.t1.txt` adds its edges (recommended) |
| The compiled prelude's missing conversions and checks | fourth case, row 433 | my `Sk2FloatParam`, `Sk2IntDiv`, `Sk2Z64AsRR64` add three faces (recommended) |
| Walk's numeral narrowing | fourth case, row 434 with its owed `XXX` walk test | `record.md` |
| No spelling for an explicit conversion into ℝ64 on the base one library | the gather's statement 11 (`decision-record.md` section 6); a row only if the landed api declares none | `Sk2Z64AsFloat.t1.txt`, `Sk2Z32AsRR64.t1.txt` (recommended row, conditional) |

## 8. The count

There is no count table. The rung names none and declares 125 "by construction, not run", in `reportText` and `record.md`. The manifest's `expectedCheckerCount` is 125, a prediction beside the rung's 125. The rung touches neither the checker nor `Library/`, so there is nothing to compare.

## Differentials of this judgement

**How they ran.** Each of my probes ran under walk (`bin/fortress X.fss`) and on the compiled path (`bin/fortress compile X.fss`, then `bin/fortress run X`), through the first judgement's `probes/skeptic/run-diff.sh`. The library is the base's (`e5414f5bf`, the nested tower), because rung F's library is not in this worktree.

**Machine.** nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz; openjdk 25.0.4; load average 0.39 to 2.92 at the probes' starts. The bytecode cache was the first judgement's, on an unchanged library.

**Thread counts.** Every probe ran at `FORTRESS_THREADS=1`. The three reduction probes also ran at `=4` (`.t4.txt`), because the reductions note concerns what rung F marks as writing state; their answers were the same. The rung itself writes no state.

| Probe | Walk | Compiled | The revised text | Outcome (rule 4) |
|---|---|---|---|---|
| `Sk2FloatParam`: `half(x: RR64)` called with `3` and `3000000000` (Example 1's own form, a parameter) | `1.5`, `1.5E9` (on the base the `Long` passes by the nested subtyping) | refused twice, "RR64->RR64 is not applicable to an argument of type IntLiteral" | a numeral may be used for any floating-point parameter (`conversions-coercions.tex:158-159`, answer 8) | The specification settles it against the compiled side: its prelude, row 433 (fourth case, closed by the switch-over). |
| `Sk2Z32AsRR64`: `z.asRR64() / 2.0` for a `ZZ32` | refused, "Cannot find definition for method asRR64 given receiver 3: ZZ32" | `1.5` | a conversion into ℝ64 other than the coercions is explicit; no function named | Silent on the name. The one library has no `asRR64`; the gather's statement 11. |
| `Sk2Z64AsRR64`: `w.asRR64() / 2.0` for a `ZZ64` | refused (walk holds `5` as a `ZZ32`, the row-146 mechanism) | refused, "No such method ZZ64.asRR64." | explicit | Correction 1: the compiled path has no conversion from `ZZ64` at all. |
| `Sk2Z64AsFloat`: `asFloat(w) / 2.0` | refused, "Variable asFloat is not defined." (`asFloat` is declared in `Library/FortressLibrary.fss:358`, not in the api) | the same refusal | explicit | Silent on the name. On the base no path gives a program a way to write the conversion from ℤ64; the gather's statement 11. |
| `Sk2MaxTyped`: `BIG MAX[\ZZ32\][j <- 0#4] j` | `3` | refused, "Wrong number or kind of static arguments for function: BIG MAX" | the callout: a written static argument is refused there | Agrees with the callout. |
| `Sk2MaxClause`: `BIG MAX[j <- 0#4] j` | `3` | `3` | the clause form runs unwritten there | Agree. |
| `Sk2SumFloat`: `SUM[j <- 0#4] 0.5` | `2.0` | refused, `__generate` "ZZ32->ZZ32 is not applicable to an argument of type FloatLiteral" | "range over ℤ32 only" | Agrees with the callout. The specification's type-directed desugaring (`Specification/advanced/parallelism-locality/defining-generators.tex:147-157`) settles it for walk; the compiled side is its prelude, closed by the switch-over. |
| `Sk2PowNegEdge`: `(-2)^(-1)`, `2^(-2)`, `0^(-1)`, `ZZ32` operands | `-0.5`, `0.25`, `Infinity` | `0`, `0`, then a raw `java.lang.RuntimeException: Overflow Error:` from `simpleIntArith.intExp` | nothing (the Working Draft: −1/2, 1/4, and 1/0 by ℚ's `^`) | Silent after the revision: home 3, row 432 (recommended addition). |
| `Sk2IntDiv`: `7/2`, `ZZ32` operands | `7/2` | refused, "(RR64, RR64)->RR64 is not applicable to an argument of type (ZZ32, ZZ32)" | ℤ's `/` returns ℚ; an integer quotient is rational (`Specification/basic/expressions/literals.tex:151-159`) | Settled against the compiled side, which has no `/` on `ZZ32` and no ℚ: row 433 (recommended addition). |

**The compiled power's mechanism.**
- The prelude's `ZZ32` `^` is `jIntExp` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744`).
- `intExp` computes `Math.pow(a,b)` as a double and casts it to `int`. It throws `RuntimeException("Overflow Error:")` only when the double exceeds `Integer.MAX_VALUE` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:400-405`).
- So every negative power of a base other than 0 and ±1 truncates to 0, and `0^(-1)`, whose double is +∞, throws.

## The failure-mode question

The rung changes no code, so nothing in either implementation goes from loud to quiet because of it. In the text, the first judgement's two items stand:
- **ℚ holds 1/0.** Assigning an infinite rational no longer throws on paper; the library never threw.
- **A negative integer power.** ℤ's `^` now admits a negative power by type, and the chapter gives no result.

For the second, the value each path gives is now measured:
- walk quietly gives an ℝ64: 0.5, −0.5, 0.25, and ∞ for `0^(-1)`;
- the compiled path quietly gives 0 for every such power of a base other than 0 and ±1, and fails loudly for `0^(-1)` with a raw Java `RuntimeException` rather than a Fortress exception.

The quiet compiled 0 is the costly one. It matches no source (row 432), and the next person to meet it gets a number instead of an error. It goes to Pavol with row 432.

## Stops

None of the stops the batch record's intro reserves is met:
- `git diff --quiet e5414f5bf HEAD -- Specification-1.0-frozen` succeeds.
- `numbers-advanced.tex` has one hunk, `@@ -11,6 +11,23 @@`, with 0 lines removed.
- The new normative text states nothing neither path runs on the merged tree. The coercions, `check`/`check_star` and ℚ's values run under walk once F lands. The numeral clause is the Working Draft's own normative text (its coercion sentence and Example 1), narrowed and not new. The promotion rule appears only as future text in a callout.
- No file of another rung is touched: the net diff is `Specification/` and this rung's directory.

The negative power meets T's own section stop ("A passage whose new text neither the decisions nor rung F's table settle"). It is reported and not chosen, and that stop is not one the intro reserves.

## Required corrections, for the commit stage

1. **`Specification/basic/conversions-coercions.tex:86-88`.** Make the last clause true of the compiled prelude.
   - Replace "; there each converts to \EXP{\mathbb{R}64} only explicitly." with "; there \EXP{\mathbb{Z}32}, \EXP{\mathbb{N}32} and integer numerals convert to \EXP{\mathbb{R}64} only explicitly, and the other integer types not at all." (or drop the clause).
   - Evidence: `CompilerBuiltin.fsi:268`, `:327`, `:396` against `:103-146`, `:147-209`, `:332-389`; `Sk2Z64AsRR64.t1.txt`.
   - Make the same change in the REPORT.md the gather writes from `reportText` (the decision on the callout, and item 7 of "Repair round").
   - The gather's rebuild on the merged tree renders it. Check it in that text, since this callout is not in rung F's files and nothing else moves it.
2. **`decision-record.md` section 6.** Add a statement 12 for the gather, so that it does not report this mismatch as blocking.
   - The statement: the integer negation entries type the unary −, ⊟ and ∸ of ℤ as returning ℚ (`Specification/basic-lib/basic-integers.tex:376-378`), where the listing says ℤ (`:205-207`).
   - This is the team's slip that the list's L14 reports. In the flat tower it now states that negating an integer gives a rational, and it will not match the landed library.
   - It is pre-existing and not new, as statement 9 is for `^`. The gather fixes it only if a decision settles it; otherwise it goes to Pavol with L14.

## Recommended rows (not required corrections)

The gather opens or refuses each in one sentence.

- **Row 432, append.**
  - "Measured further by rung T's second skeptic: with `ZZ32` operands, `(-2)^(-1)` and `2^(-2)` are `-0.5` and `0.25` under walk and `0` and `0` on the compiled path.
  - `0^(-1)` is `Infinity` under walk and a raw `java.lang.RuntimeException: Overflow Error:` on the compiled path (`compile-ladder/rung-spec-numbers/probes/skeptic/Sk2PowNegEdge.fss` with `Sk2PowNegEdge.t1.txt`).
  - The compiled `ZZ32` `^` is `jIntExp` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744`), which casts `Math.pow` to `int` and throws only above `Integer.MAX_VALUE` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:400-405`). So every negative power of a base other than 0 and ±1 is a quiet 0, and a zero base fails with a Java exception, not a Fortress one."
- **Row 433, append.**
  - "Three more faces, measured by rung T's second skeptic:
    - Example 1's own form, a numeral for an `RR64` parameter, is refused: `half(3)` gives 'RR64->RR64 is not applicable to an argument of type IntLiteral' (`compile-ladder/rung-spec-numbers/probes/skeptic/Sk2FloatParam.t1.txt`).
    - The prelude declares no `/` on `ZZ32`, so `7/2` is refused, '(RR64, RR64)->RR64 is not applicable to an argument of type (ZZ32, ZZ32)', where the chapters give ℤ's `/` a ℚ result and `Specification/basic/expressions/literals.tex:151-159` makes an integer quotient rational (`Sk2IntDiv.t1.txt`).
    - `ZZ`, `ZZ64` and `NN64` declare no conversion into `RR64` at all, explicit or not: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-146`, `:147-209`, `:332-389`; 'No such method ZZ64.asRR64.' (`Sk2Z64AsRR64.t1.txt`).
  - Closed by the switch-over, as the row says."
- **Conditional, for the gather's statement 11.**
  - If the landed api declares no explicit conversion into `RR64` from `ZZ64`, `ZZ`, `NN64`, `NN32` or `QQ`, the row the judge names in `JUDGE.md` section 1.6 is owed.
  - Proposed text: "the number chapters say a conversion into ℝ64 from ℤ, ℤ64, ℕ64, ℕ32 or ℚ is written explicitly (`Specification/basic-lib/numbers.tex:46-49`), and the one library gives a program no way to write it."
  - Evidence on the base: walk refuses `asFloat(w)`, "Variable asFloat is not defined.", since `asFloat` is declared only in `Library/FortressLibrary.fss:358` and not in the api (`compile-ladder/rung-spec-numbers/probes/skeptic/Sk2Z64AsFloat.t1.txt`). Walk also refuses `z.asRR64()`, "Cannot find definition for method asRR64" (`Sk2Z32AsRR64.t1.txt`).
  - To be re-measured on the merged tree before it is opened.

## Other findings, not corrections

- **`probes/list.txt`.** The repair round's correction to L2 says Example 1 is at ":154-155 at the tip". That was the first round's tip (`1c9f12c72`). At `8b36d5ca6` it is `:158-159`, as `record.md` and `decision-record.md` say.
- **REPORT.md** is again not on the branch, because the harness refused the worker's write. Its text is `reportText`, for the gather. The tracked-path loop prints "MISSING explorations/compile-ladder/rung-spec-numbers/REPORT.md" for that reason only.

## Tracked-path check

I ran the shared prefix's loop over this file after committing it, and over `record.md`, `decision-record.md`, `JUDGE.md` and `probes/repair/for-pavol.txt`. The only line printed is the MISSING REPORT.md above.

The first judgement follows, word for word as committed at `1c9f12c72`.

# Skeptic, rung T (`rung-spec-numbers`), first judgement

**Verdict: refused.** The one thing that must change: the revised text must be true as written about the original and about both implementations. Two places are not. (a) Appendix I says the method entries carried the listing's signatures (`Specification/appendices/changes.tex:730-731`, `:810-811`) and quotes none of them, but four entries carried other types: `Specification-1.0-frozen/basic-lib/numbers.tex:339` (division returning ℚ\*), `:387` (`CMP` taking ℚ), `Specification-1.0-frozen/basic-lib/basic-integers.tex:622` (absolute value returning ℕ) and `:816` (`lowBits` returning ℕ, where the listing already said ℤ). Those four originals are nowhere readable in the revised document, against the brief's "Every original stays readable in Appendix I, verbatim" and the FACTS line the rung proposes. (b) The reductions callout (`Specification/basic/expressions/reductions.tex:27-38`, with I.1.16 at `changes.tex:967-969`) says the compiled type checker takes `BottomType` for an unfixed element type and advises writing `SUM[\ZZ32\][j <- 0#i]`. The compiled path refuses that spelling today ("Wrong number or kind of static arguments for function: BIG +", `probes/skeptic/SkSumClauseTyped.t1.txt`, `.t4.txt`) and runs the unwritten one (`probes/skeptic/SkSumClause.t1.txt`). Rows 424 and 425 were measured on the one library, 425 through the checker on a library copy, not on the compiled path as it runs programs. The other required corrections below are the checklist for the repair round.

Base `e5414f5bf`; branch tip `265c85eae`; worktree `/home/user/fortress-numbers`. The branch carried the worker's seven commits and a clean tree. I re-ran the build and the quote comparison myself and did not rely on the worker's logs.

## 0. The provenance block (in `reportText`, since the harness refused REPORT.md)

Every citation was opened with `sed -n`:
- **problem**: `numbers.tex:36-91` at `e5414f5bf` is the eighteen-type tabbing. `Q3ConditionalExtension.comp.txt:3` is "Cyclic type hierarchy: Type RationalQuantity transitively extends itself". `CLIMB-BATCH-6.md:122` says "Batch 6's rung F makes the library flat".
- **spec**: `types-vals-vars.tex:535-539` ("These types are mutually exclusive" at :536; "The numeric types share the common supertype Number" at :539). `:218-237` is the exclusion property. `types.tick:977-978` is the same two sentences.
- **precedent**: `types-vals-vars.tex:238-250` is rung S's callout. `changes.tex:61-117` at the tip is the instantiation-exclusion entry. `FortressLibrary.fsi:347-350` declares `check` and `check_star`.
- **deviation**: the lines hold what the block says (`numbers.tex:196-214` is the callout; `:56-61` is the getter block; `changes.tex:693-728` and `:784-808` are the two `Fortress` blocks; `numbers-advanced.tex:14-30` is the callout).
- **historical**: it names all eight `.tex` files and the PDF, which matches `git diff --stat e5414f5bf HEAD -- . ':!explorations'`. The three commits that touch `Specification/` carry the line.

The block passes.

## 1. The recorded failure and pass

There is no test, so there is nothing to go red. That is the batch record's rule for a prose rung (`CLIMB-BATCH-6.md` section 3, T, "How it is checked").
- **Failure.** The failure is the base build's text. `probes/build/base-vs-edit-pdftotext-diff.txt:177` and `:231` show the removed sentences. `base-tex.txt:15691` records 611 pages and `:15694` BUILD SUCCESSFUL.
- **Pass.** `edit-tex.txt:11410` records 619 pages and `:11413` BUILD SUCCESSFUL.
- **Rebuild.** I rebuilt the edited tree myself (`probes/skeptic/rebuild-edit.txt`). Both targets succeeded (genSource 72 s, tex 34 s) and produced 619 pages. `fortress.log` has no undefined reference, no multiply defined label and no undefined control sequence. The normalised text is identical to the committed `Specification/fortress.pdf`, which differs in 76 bytes (its date and ID). I then removed the build's ignored products with `git clean -X` on `Specification/`.

## 2. The diff against the passages and the decisions

The chapters do what the report says:
- seven sibling types under `Number`;
- rung F's coercion table, edge by edge: ℚ from the five integer types; ℝ64 from ℤ32 and the numerals ℤ32 holds; ℤ64 from ℤ32 and ℕ32; ℕ64 from ℕ32; ℤ from the four fixed widths;
- `check`/`check_star` on ℝ64 as `Library/FortressLibrary.fsi:347-350` declares them;
- the tracking sentences and the 17 and 12 checks removed;
- `numbers-advanced.tex` gains 17 added lines and loses none;
- `Specification-1.0-frozen/` untouched (`git diff --quiet`);
- the base equals the frozen copy in all six edited chapters (`diff`).

I accept the central reading, that ℚ holds ±∞ and 0/0. Answer 6's `check_star` refines only a type that holds a NaN. The library's `Ratio` holds all three values (`FortressLibrary.fss:599-602`, `:889-897`; measured in `probes/skeptic/SkRatSpec.t1.txt`). The operator chapter says "For rational results, division by zero produces 1/0". That sentence is at `Specification/basic/operators/opr-overview.tex:166`, not at the `:182-183` the rung cites everywhere (correction 2). The field and order clauses leaving ℚ's listing follows from the original's own "neither totally ordered nor a field" (frozen `numbers.tex:104`).

Beyond the refusal's two points, three things are not as the report says:
- **ℤ's `^` now accepts a negative power, and the chapter no longer says what it gives.** The exponent was retyped from ℕ to ℤ (`basic-integers.tex:489-490`), but the entry still speaks only of "a nonnegative integer power" (`:492`). In the original, ℤ was a subtype of ℚ, so a negative power went to ℚ's `^(self, power: ZZ)`, which gives 1/2 for `2^(-1)` (frozen `numbers.tex:345-346`, with the property `x^y = 1/(x^-y)` at `:355`).
  - Measured on `2^(-1)` with ℤ32 operands: walk answers `0.5`, a run-time ℝ64; the compiled path answers `0`, a ℤ32 (`probes/skeptic/SkIntPowerNeg.t1.txt`, `SkIntPowerType.t1.txt`).
  - The rung's decision 4 does not see this consequence, and section 6's list for the gather does not name ℤ's `^`. The library declares that operator's result as ℝ64 (`FortressLibrary.fsi:438`, `FortressLibrary.fss:706-707`), and the chapter says ℤ. That mismatch predates this rung, but the gather's check will meet it.
- **Example 1 of the coercion chapter now contradicts the numbers chapter.** It reads "For any floating-point parameter, a decimal integer literal argument may be used" (`Specification/basic/conversions-coercions.tex:154-155`; frozen `:141-142`). The revised numbers chapter lets ℝ64 coerce only from the numerals ℤ32 holds (`numbers.tex:43`). The list's L2 calls the passage agreeing. Measured: `s: RR64 = 3000000000` is refused on the compiled path today, and the flat library's walk will refuse it too, since that numeral is not a ℤ32 (`probes/skeptic/SkNumeralFloat.t1.txt`). The brief asks for a callout wherever the list finds a statement the flat library contradicts.
- **The report's section 10 is stale.** It says the build's ignored products are left in the worktree, but `git status --ignored Specification` was empty before my rebuild.

`probes/skeptic/quotecheck.txt` checks every printed line the diff removes against Appendix I. Everything is quoted, or named by line and by the words removed, except the four method-entry lines of the refusal and the check-method entries. For the check methods the "same signatures" claim is true (frozen `numbers.tex:546-562` against `:228-244`; `basic-integers.tex:888-899` against `:290-301`).

## 3. Precedent

Rung S's S1 form is followed: a callout after each changed passage, and one Appendix I entry per change with its affected sections, change, rationale, effect, original and route C. Most originals are verbatim with their frozen path and lines; I checked the two large quotes (`numbers.tex` 19-105, `basic-integers.tex` 16-84) with `diff` against the frozen copy, and they are identical. Removing the alignment commands from quoted listing lines is a disclosed deviation that the build forces.

The list is complete except for Example 1 (above). My own scan outside the edited chapters found nothing else:
- a grep for subtype statements between number types found only `literals.tex:194` (the margin note, kept) and `conversions-coercions.tex:903` (the ℝ32 widening example, deferred by answer 8);
- the ℤ64 and ℤ32 mentions in `overloading.tex:315-316`, `overview.tex:580-582` and the rest assume no nesting.

## 4. The test

The rung may add no test (its section, "Files it may touch"), and it adds none.

## 5. The competing-declaration grep

The names the chapters drop (`QQ_star`, `QQ_splat`, `ZZ_star`, the `_LT`/`_LE`/`_GE`/`_GT`/`_NE` names, `check_LT` and its family, `NN_star`) appear in no file of `ProjectFortress/tests/`, `compiler_tests/`, `library_tests/` or `src/com/sun/fortress/`. In `Library/` they appear only in `Library/incomplete/basic/Fortress.Number.fsi`, which no build compiles. `RationalQuantity` appears only in `tests/conditionalExtension.fss`, the team's parse test that the callout cites. `check_star` appears in `tests/realArith.fss:89-90` and `tests/testRR32.fss:89-91`, on the library's ℝ64 and ℝ32.

ℝ32 also declares both checks (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:56-59`). The chapters name no ℝ32, so nothing they say is false, but statement 5 of the decision record's section 6 should expect it.

## 6. record.md

- The FACTS line cites `opr-overview.tex:182-183` for the rational division sentence, which is at `:166`.
- The FACTS line says the entries "quote every original". That is false until correction 1 is made.
- The handover line omits the negative-power question.
- The ledger notes for rows 404, 424 and 425 and worklist item 12 are correct as written, and nothing is renumbered.
- Row 431 is true as written (`probes/examples/RatValues.walk.txt:8-9`; the specification's `numbers.tex:355-359`; the fix sites `FortressLibrary.fss:534-535`, `:547-556`, `:593-596`). It omits the `CMP` face of the same defect: `0/0 CMP 0/0` is `EqualTo` (`probes/skeptic/SkRatSpec.t1.txt`), where `CMP` should answer `Unordered` for an unordered pair.

## 7. Defect homes

This is a prose rung, so home 1's "assertion in the rung's gated test" has no carrier. The check for a text repair is the rebuilt text and its diff.

- **The two refusal items, and corrections 2-4.** They are defects of the rung's own text, repaired in the repair round and checked in the rebuilt text by the second skeptic.
- **ℤ `^` with a negative power.** After the revision the specification is silent on it, and the original's answer, 1/2, came only through the nesting that route A removes. So it goes to home 3: my captures `probes/skeptic/SkIntPowerNeg.t1.txt` and `SkIntPowerType.t1.txt`, and a ledger row (recommended below). It also goes to Pavol as an unsettled passage, since the rung may not choose.
- **`0/0 CMP 0/0`.** It is row 431's defect and belongs in that row's text.
- **The compiled prelude's missing declarations.** It lacks ℝ64 from ℤ32 and from numerals, ℤ64 from ℕ32, and `check`/`check_star` (`probes/skeptic/SkIntFloat.t1.txt`, `SkNumeralFloat.t1.txt`, `SkNN32Wide.t1.txt`, `SkRRCheck.t1.txt`). The revised chapters settle these. The prelude takes no new declaration before the switch-over (`POSITIONS.md:46`), which replaces it, and this rung may add no test. That is the fourth case, with a recommended row.

## 8. The count

There is no count table. The rung names none and declares 125 "by construction, not run". The manifest's `expectedCheckerCount` is 125, a prediction beside the rung's 125. The rung touches neither the checker nor `Library/`, so there is nothing to compare.

## Differentials

Every probe below is my own, under `probes/skeptic/`. Each one ran under walk (`bin/fortress X.fss`) and on the compiled path (`bin/fortress compile X.fss`, then `bin/fortress run X`), one capture per probe, headed by its machine line. The library is at `e5414f5bf`, the nested tower, because rung F's library is not in this worktree.

**Thread counts.** Every probe ran at `FORTRESS_THREADS=1`. The two reduction probes also ran at `=4`, because the reductions note concerns what rung F marks as writing state; the answers were the same at both counts.

**Machine.** nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz; OpenJDK 25.0.4; load average at start 6.4-7.1.

**Cache build.** From an empty bytecode cache, in library order at load 6.57: AnyType 20 s, CompilerBuiltin 70 s, CompilerLibrary 34 s, CompilerAlgebra 3 s, CompilerSystem 3 s.

| Probe | Walk | Compiled | The revised text says | Verdict |
|---|---|---|---|---|
| `SkIntFloat`: ℤ32 bound to ℝ64 | `3` (the Int, unconverted) | refused, "Right-hand side has type ZZ32, but declared type is RR64" | coercion, 3.0 | Both paths differ on the base. Walk's side is F's group 2. The compiled side is the prelude's, closed at the switch-over (recommended row). |
| `SkNumeralFloat`: numerals 3 and 3000000000 bound to ℝ64 | `3`, `3000000000` | both refused ("IntLiteral") | 3.0; the large numeral is not coerced | Correction 5 (Example 1). |
| `SkWideFloat`: ℤ64 bound to ℝ64 | `5` | refused | explicit only | Compiled agrees with the text. Walk's side is F's. |
| `SkNarrowWide`: ℤ32 max bound to ℤ64, plus 1 | `-2147483648` | `2147483648` | 2147483648 (ℤ64 from ℤ32; also the coercion chapter's own ℤ32/ℤ64/ℤ128 example) | The specification settles against walk. It is row 146's mechanism with a variable (row 19), and F's group 2 repairs it. |
| `SkNN32Wide`: ℕ32 7 bound to ℤ64 | refused at `n: NN32 = 7`, "RHS expression type Int is not assignable to LHS type NN32" | numeral accepted; `l: ZZ64 = n` refused | 7 | Both paths differ. F declares the pair. The prelude lacks it (`CompilerBuiltin.fsi:147-149`; `CLIMB-BATCH-6.md` section 1). |
| `SkIntPower`: `2^3` | `8` | `8` | ℤ | Agree. |
| `SkIntPowerNeg`, `SkIntPowerType`: `2^(-1)` | `0.5`, an ℝ64 at run time | `0`, a ℤ32 (the ℝ64 `typecase` clause is "unreachable") | nothing (the original: 1/2) | Disagree. Rule 4: the revised specification is silent, so home 3 and a question for Pavol. The compiled `0` is wrong under every reading. |
| `SkIntDivZero`: `1 DIV 0` | raw `java.lang.ArithmeticException` | `DivisionByZero` | throws | Both are loud. Walk's side is row 336. |
| `SkIntCmp` | `LessThan`, `EqualTo` | same | `TotalComparison` | Agree. |
| `SkRRCheck`: `check`/`check_star` on ℝ64 | `Nothing`, `Just(Infinity)`, `Nothing`, `Just(2.5)` | refused, "RR64 has no getter called check" (×4) | as walk (`numbers.tex:51-65`) | Walk agrees. The prelude lacks the getters (recommended row). |
| `SkSumClause`: `SUM[j <- 0#4] j`, at 1 and 4 threads | `6` | `6` | write the static argument | Runs on both paths on the base. On the merged tree walk refuses it (row 424). |
| `SkSumClauseTyped`: `SUM[\ZZ32\][j <- 0#4] j`, at 1 and 4 threads | `6` | refused, "Wrong number or kind of static arguments for function: BIG +" | the recommended spelling | Refusal item (b). |
| `SkIntToRat`: ℤ32 bound to ℚ, then `/2` | `7`, `7/2` | "QQ is undefined" | coercion; 7/2 | Walk agrees in value. The prelude has no ℚ, so this is not a finding (F's section, "For the skeptic"). |
| `SkRatSpec`: 35 statements of ℚ's method entries | all as the entries say, except `0/0 = 0/0` `true` and `0/0 CMP 0/0` `EqualTo` | "QQ is undefined" | false; `Unordered` | Row 431 (the specification settles it against the library), with the `CMP` face added. |
| `SkRatFloor`: `floor(1/0)` | `1/0` | "QQ is undefined" | "return the argument", declared ℤ | The team's slip the list names (L14). |
| `SkRatSignum`: `signum(0/0)` | "Variable signum is not defined" | "QQ is undefined" | declared | The library has no `signum`. This predates the rung, and the rung does not touch it. |

## The failure-mode question

Two loud failures become quiet values in the revised text:
- **Assigning an infinite rational to ℚ.** `literals.tex` used to say that assigning a ℚ\* value of `1/0` or `-1/0` to a ℚ variable throws `DivisionByZero` (frozen `literals.tex:198-200`). Now ℚ holds `1/0`: `a: QQ = 1/0` holds `1/0`, and `1/0 + -1/0` is `0/0` (`probes/examples/RatValues.walk.txt:3-6`; `probes/skeptic/SkRatSpec.t1.txt`). The library never threw, so the cost to diagnosability was already paid in practice. On paper, a program that meant finite rationals now carries `1/0` quietly into `0/0`.
- **A negative power of an integer.** ℤ's own `^` used to refuse it by type, and ℚ's `^` answered it with a rational. Now ℤ's `^` accepts it and the text gives no result. The compiled path answers `0` quietly.

Both belong in what comes back to Pavol.

## Stops

None of the stops the batch record's intro reserves is met:
- nothing under `Specification-1.0-frozen/` changed;
- no word of the body of `numbers-advanced.tex` changed;
- the new normative text states constructs that walk runs on the merged tree once F lands (the coercions, `check`/`check_star`, ℚ's values);
- the promotion rule appears only in a callout, as future text;
- no file of another rung was touched.

The ℤ `^` passage meets T's own section stop, "A passage whose new text neither the decisions nor rung F's table settle: the rung reports it and does not choose". That stop is not one the intro reserves, so it is correction 4 and not a `stopsMet` entry.

## Required corrections, for the repair round

1. In I.1.11 and I.1.12, quote the method-entry originals that differ from the listing, or all the changed `\Method` lines. The "with the same signatures" sentences are false for frozen `numbers.tex:338-339` and `:385-388` and for `basic-integers.tex:622` and `:816`.
2. Replace every `opr-overview.tex:182-183` with `:166`, and every `opr-overview.tex:181` with `:165`. They appear in `record.md` (the FACTS line), `decision-record.md` sections 2 and 5, `probes/list.txt` (preamble and L4, whose `:176-183` should be `:164-169`), and `reportText` sections 3 and 4 with its `specCitations`.
3. Scope the reductions callout (`reductions.tex:27-38`) and I.1.16 (`changes.tex:967-969`) to what was measured. Rows 424 and 425 were measured with the library these chapters describe. Until the switch-over, the compiled path's own prelude declares `SUM` without a static parameter, so it runs the clause form unwritten and refuses the written one.
4. ℤ's `^` and negative powers:
   - Add to the integer listing's callout (or the `^` entry's neighbourhood) that the chapter does not give the result of a negative power, which the original answered through ℚ.
   - Report it in `reportText` section 9 and in the handover line as unsettled, with the three measured answers.
   - Add ℤ's `^` to `decision-record.md` section 6 as a pre-existing mismatch with the library's ℝ64 result (`FortressLibrary.fsi:438`), so that the gather does not read it as new and blocking.
5. Give Example 1 of the coercion chapter (`conversions-coercions.tex:154-155`) a callout. As revised, an integer literal outside ℤ32 no longer converts to ℝ64 by coercion. Add it to the list in place of L2's "agree", and to I.1.15.
6. Add to `decision-record.md` section 6 the statement L3 defers to the gather: dividing two integers of any type by `/` gives a rational (`literals.tex:151-159`). In statement 5, note that ℝ32 also declares both checks (`FortressBuiltin.fsi:56-59`).
7. Correct `reportText` section 10: the ignored products were not left in the worktree.
8. After corrections 1, 3, 4 and 5, rebuild (`./ant genSource`, `./ant tex`), copy the PDF, and redo the text diff and its hunk causes. Then correct the page count and the FACTS line's "quote every original" if either moves.

## Tracked-path check

I ran the shared prefix's loop over this file after committing it. It printed nothing.
