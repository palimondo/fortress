# Judge, rung T (`rung-spec-numbers`): ruling on the skeptic's refusal

*Row numbers, noted at the merged-diff review of climb batch 6: the rows 431, 432, 433 and 434 this file cites are rung T's provisional numbers, which the gather opened as ledger rows 440, 441, 442 and 443 in that order; the ledger's rows 431-434 are rung F's (`explorations/compile-ladder/climb-batch-6/RECORD.md`, "Final row numbers").*

**Decision: repair.** The rung's approach is right and stays: the seven sibling types, rung F's integer and rational coercions, `check`/`check_star` on ℝ64, ℚ holding ±∞ and 0/0, the superseded chapter kept word for word, answer 7's note. The skeptic's two refusal grounds are right, and so are most of its eight corrections. It is wrong on one point, the direction of correction 5. No stop the batch record reserves for Pavol is met. One repair round, by the numbered steps in section 4.

Base `e5414f5bf`; branch tip before this file `1c9f12c72`; worktree `/home/user/fortress-numbers`. I read the net diff, `record.md`, `decision-record.md`, `probes/list.txt`, `SKEPTIC.md`, the skeptic's captures, the worker's structured report (its `reportText` stands in for the refused REPORT.md), and every passage cited below with at least ten lines either side. I built nothing and ran nothing.

## 1. Point by point

### 1.1 Appendix I says the method entries had "the same signatures". The skeptic is right.

- `Specification/appendices/changes.tex:730-731` (I.1.11) says the frozen method entries at lines 327-328, 338-339, 345-346, 385-388, 416-417, 488-493 and 546-562 had "the same signatures" as the quoted listing. Two do not:
  - `Specification-1.0-frozen/basic-lib/numbers.tex:339` gives division's result as ℚ\*. The quoted listing line has ℚ# (`changes.tex:702`).
  - `:387` gives `CMP` the parameter type ℚ, returning `TotalComparison`. The listing has ℚ\* (`changes.tex:704`).
- `changes.tex:810-811` (I.1.12) makes the same claim for the integer entries. Two do not match:
  - `Specification-1.0-frozen/basic-lib/basic-integers.tex:622` gives the absolute value's result as ℕ. The listing has ℤ≥, spelled differently even though ℕ was its synonym.
  - `:816` gives `lowBits` the result ℕ. The listing's line, `:284`, already says ℤ, so it is not quoted at all.
- None of these four originals can be read anywhere in the revised document. The brief requires "Every original stays readable in Appendix I, verbatim" (`explorations/coordinator/CLIMB-BATCH-6.md`, section 3, T, "What it writes"). This is a defect in the rung's own text, and its home is 1: repaired in this round and checked in the rebuilt text.

### 1.2 The reductions callout. The skeptic is right.

- `Specification/basic/expressions/reductions.tex:27-38` and I.1.16 (`changes.tex:967-969`) say that "the compiled type checker" takes `BottomType`, and they recommend writing `SUM[\ZZ32\][j <- 0#i]`.
- Row 425 measured the checker on a library copy that already had answer 7's generic `SUM`. The row itself says "The compiled prelude never met it: its no-argument big operators are not generic" (`explorations/fortress-gap-ledger.md:436`).
- The compiled path as it runs programs checks against its own prelude. That prelude declares `opr BIG +(): ReductionZZ32`, `opr BIG +(g: GeneratorZZ32): ZZ32` and the same two for `BIG MAX` (`Library/CompilerLibrary.fsi:180-184`). The prelude takes no new declaration before the switch-over (`explorations/coordinator/POSITIONS.md:46`), so rung F leaves these alone (`CLIMB-BATCH-6.md` section 3, F, "Files it may touch").
- The skeptic measured the consequence: the recommended spelling is refused, "Wrong number or kind of static arguments for function: BIG +" (`probes/skeptic/SkSumClauseTyped.t1.txt`, `.t4.txt`), and the unwritten form runs (`probes/skeptic/SkSumClause.t1.txt`).
- Answer 7's approved content stays: the desugaring is not type-directed on either implementation, so a clause form writes its static argument, citing rows 424 and 425 (`POSITIONS.md:165`). What the repair adds is the scope: which checker takes `BottomType`, and what the compiled path does until the switch-over.

### 1.3 The `opr-overview.tex` citations. The skeptic is right.

- "For rational results, division by zero produces 1/0" is at `Specification/basic/operators/opr-overview.tex:166`. The integer sentence is at `:165`.
- The frozen copy has the same line numbers.
- Lines `:176-185` are about rounding modes.
- The wrong citations are `:182-183` and `:181`. They appear in `record.md:9`, `decision-record.md` sections 2 and 5, `probes/list.txt:22`, `:25` and `:141` (L4's `:176-183`), and `reportText` sections 3 and 4 with its `specCitations`.
- The chapter's own callout quotes the sentence and cites `\chapref{operators}`, which is correct.

### 1.4 ℤ's `^` and negative powers. The skeptic is right about the gap. The worker's decision 4 stands.

The retyping itself follows the brief's rule:
- The rule: "a signature that names a refined type (`NN`, `QQ_GE` and their siblings) takes the type the library declares for it, and where the library does not declare the method the unrefined type" (`CLIMB-BATCH-6.md` section 3, T).
- The brief names `NN` as a refined type.
- The library's integer `^` has a different signature, `opr ^(self, b:AnyIntegral):RR64` (`Library/FortressLibrary.fsi:438`), and `AnyIntegral` is not a type of the specification. So ℕ → ℤ is correct under that rule (`Specification/basic-lib/basic-integers.tex:489-490`).

Its consequence is new, and nothing settles it:
- In the original, ℤ was a subtype of ℚ. A negative power therefore went to ℚ's `^(self, power: ZZ): QQ_splat`, whose property is `x^y = 1/(x^(-y))` (`Specification-1.0-frozen/basic-lib/numbers.tex:344-355`). So `2^(-1)` was 1/2.
- Now ℤ's own `^` accepts a negative power, and its entry still speaks only of "a nonnegative integer power" (`basic-integers.tex:492`).
- The two paths answer differently: walk gives `0.5`, the compiled path gives `0` (`probes/skeptic/SkIntPowerNeg.t1.txt`, `SkIntPowerType.t1.txt`).

This falls under T's own stop, "A passage whose new text neither the decisions nor rung F's table settle: the rung reports it and does not choose" (`CLIMB-BATCH-6.md` section 3, T, "Stops"). That stop is not among those the intro reserves for Pavol. So the repair reports it:
- in the integer listing's callout;
- in I.1.12's Effect;
- in the record;
- to Pavol.

The chapter's normative text is not changed. The row's home is 3, because after the revision the specification is silent.

### 1.5 Example 1 against the numerals. The skeptic is right that there is a contradiction, and wrong about which side gives way.

The contradiction:
- `Specification/basic/conversions-coercions.tex:154-155`, the team's Example 1: "For any floating-point parameter, a decimal integer literal argument may be used".
- The rung's new text restricts that coercion: "ℝ64 coerces from ℤ32, and from every integer numeral whose value ℤ32 holds" (`Specification/basic-lib/numbers.tex:43`; the same at `conversions-coercions.tex:64-68`, `:81`, and `changes.tex:448`, `:934-935`).
- The list's L2 wrongly records Example 1 as agreeing (`probes/list.txt`, L2).

The skeptic would keep the restriction and add a callout saying that a numeral outside ℤ32 no longer converts. That makes the interpreter's representation the standard, against rule 4 of the brief. The decisions settle the point the other way:

- **Answer 8** (`POSITIONS.md:159`): "`ZZ32` and integer literals coerce into `RR64` (exact)."
- **T's own brief** says that after this batch "only `ZZ32` and numerals convert automatically" (`CLIMB-BATCH-6.md` section 3, T, "What it writes").
- **The rung's own rationale** says "the decision names ℤ32 and the numerals" (`changes.tex:938-939`) and "declared from ℤ32 and the numerals only" (`:467`).
- **Rung F's table** gives the restriction only as the effect of `RR64`'s `coerce(x: ZZ32)` **under walk**: "`RR64` from `ZZ32`, which under walk is also every numeral that fits it" (`CLIMB-BATCH-6.md` section 3, F, "The coercions"). Walk gives a numeral inside ℤ32's range an `Int` and a larger one a `Long` or a big integer (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`).
- **The language's model:**
  - A numeral has a type of its own, and the libraries define the coercions from it (`Specification/basic/expressions/literals.tex:126-148`).
  - The compiled checker gives every numeral one type whatever its value (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:466-467`).
  - The team's prelude declares `coerce(x: IntLiteral)` once on each integer type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:104`, `:148`, `:211`, `:274`, `:333`).
  - In that model, "ℝ64 coerces from integer numerals" is one declaration covering every numeral, not a range.

So the normative sentences follow answer 8's words: ℝ64 coerces from ℤ32 and from integer numerals. Example 1 then stays true and unchanged.

Walk's narrowing is an implementation divergence that the specification settles: `s: RR64 = 3000000000` should hold a float. On the base, walk holds the `Long` unconverted (`probes/skeptic/SkNumeralFloat.t1.txt`, "3000000000"). On the flat library it will refuse the binding, since no coercion from ℤ64 into ℝ64 exists. That is a home-2 defect, but T may add no test. So, as with row 431, it goes to a provisional ledger row with the `XXX` walk test it is owed: the brief's fourth case.

I take this as a decision that answer 8's words settle. The one residue it leaves is reported to Pavol, not decided in the text: whether a numeral that ℝ64 cannot hold exactly (above 2^53) converts by coercion, since answer 8 gives exactness as its reason (section 3).

### 1.6 The decision record's section 6. The skeptic is right. I add two statements.

Section 6 of `decision-record.md` lists the chapters' statements for the gather to check against the landed library. It needs these changes:
- **L3's deferred statement:** dividing two integers of any type by `/` gives a rational (`literals.tex:151-159`; `probes/list.txt`, L3).
- **`RR32`'s checks:** `RR32` declares `check`/`check_star` too (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:56-59`; checked).
- **ℤ's `^`:** the mismatch with the library's ℝ64 result (`FortressLibrary.fsi:438`) is pre-existing and not blocking.
- **Explicit conversion into ℝ64:** the chapters say it is explicit and name no conversion (`numbers.tex:46-49`). The skeptic's recommended row on this is premature. Rung F writes the explicit conversions at its sites (`CLIMB-BATCH-6.md` section 3, F, "The coercions", last sentence). So the gather looks up what the landed api declares. Today it is `asFloat`, declared on `Number` in the component only (`Library/FortressLibrary.fss:358`).
  - If the api declares it, the gather names it in the chapter.
  - Otherwise it becomes a row.
- **Statement 3:** it becomes the numeral statement of 1.5.

### 1.7 Report section 10. The skeptic is right.

- `git status --ignored --short Specification` prints nothing at the tip.
- The report's sentence that the build's ignored products are left in the worktree is not true of the committed state.

### 1.8 The rows

- **Row 431, amended (the skeptic is right):**
  - `0/0 CMP 0/0` is `EqualTo` under walk (`probes/skeptic/SkRatSpec.t1.txt:22`).
  - The specification makes 0/0 unordered with itself (`numbers.tex:355-359`), and its `CMP` returns `Unordered` for an unordered pair (`numbers.tex:365-369`).
  - The owed `XXX` test asserts both faces.
- **New row, the negative power:** as the skeptic recommends, home 3. One change of wording: "the compiled 0 is wrong under every reading" becomes "the compiled 0 matches no source". The sources are the Working Draft's 1/2 and the library's declared ℝ64.
- **New row, the compiled prelude:** it lacks what the revised chapters state (the skeptic's recommendation), which I accept as a record closed by the switch-over. The precedents are rows 314 and 316, which are prelude gaps kept as rows (`explorations/fortress-gap-ledger.md:325`, `:327`).
  - It is not work before the switch-over (`POSITIONS.md:46`).
  - The batch record's "not a finding" (`CLIMB-BATCH-6.md` section 3, F, "For the skeptic") excuses rung F from those differences. It does not erase the measurement.
  - With 1.5, its numeral face is that `r: RR64 = 3` is refused, "Right-hand side has type IntLiteral, but declared type is RR64" (`probes/skeptic/SkNumeralFloat.t1.txt`). The prelude's ℝ64 coerces from `FloatLiteral` and `RR32` only (`CompilerBuiltin.fsi:433-435`).
- **New row, from 1.5:** walk converts into ℝ64 only the numerals ℤ32 holds.
- **Not a row now:** the explicit-conversion naming (1.6).

### 1.9 What both sides got right, and what I checked beyond them

- **The central reading, ℚ holding ±∞ and 0/0:**
  - It follows from answer 6's run-time checks (`POSITIONS.md:158`), the library's `Ratio` (`Library/FortressLibrary.fss:599-602`), `opr-overview.tex:166`, and the original's own "neither totally ordered nor a field" for the type that holds 0/0 (frozen `numbers.tex:104`).
  - Both sides accept it, and so do I.
  - It still goes to Pavol as the reading with the most consequence, as the worker proposed.
- **The integer power property** keeps `y: ℕ` (`basic-integers.tex:498`). The list's L14 leaves it, reading ℕ as the language chapter's unsigned type ("their unsigned equivalents (of type ℕ)", `Specification/basic/types-vals-vars.tex:541`), which the numeric-type list keeps. The property remains true of a nonnegative power. No change.
- **The skeptic's other checks hold:**
  - the provenance block;
  - the two large quotes, identical to the frozen copy;
  - its rebuild at 619 pages;
  - its competing-declaration grep.

## 2. What the specification settles here

**Settled:**
- *Rational division by zero produces 1/0:* `opr-overview.tex:166`.
- *0/0 is unordered with itself, so `=` is false and `CMP` is `Unordered`:* `numbers.tex:355-359`, `:365-369`.
- *A floating-point parameter accepts a decimal integer literal:* `conversions-coercions.tex:154-155`, with answer 8's "integer literals coerce into `RR64`" (`POSITIONS.md:159`).
- *The desugaring of a reduction is type-directed:* `Specification/advanced/parallelism-locality/defining-generators.tex:147-157`. The two implementations lag it, rows 424 and 425.

**Silent after the revision:**
- *The result of a negative integer power.* It is reported, not chosen.
- *Whether a numeral that ℝ64 cannot hold exactly converts by coercion.* This is the residue of 1.5. Answer 8 says "integer literals" and gives "(exact)" as its reason. The literals chapter already has a numeral in a floating-point computation rounded once (`literals.tex:170-173`). It is reported, not chosen.

## 3. The decision taken, for Pavol

The coercion into ℝ64 is stated as answer 8 words it, "from ℤ32 and from integer numerals", not "from the numerals ℤ32 holds".
- **Why:** answer 8's words, T's brief, the rung's own rationale, the specification's numeral model, and the compiled checker's one numeral type. The restriction comes only from walk typing a numeral by its width.
- **The alternative, the skeptic's:** keep the restriction and mark Example 1 as superseded. That would make a program such as `s: RR64 = 3000000000` illegal by the specification, because the interpreter cannot type that numeral as ℤ32.
- **Cost of the ruling:** one provisional ledger row, and one `XXX` walk test owed by a rung that may edit tests.
- **Open for him:** whether "(exact)" excludes numerals above 2^53.

## 4. Instructions for the repair round

The steps are numbered in the order to execute them. Each names the file and line it rests on, with line numbers at `1c9f12c72`.

1. **Setup.** Work in `/home/user/fortress-numbers` on `wip/rung-spec-numbers`, pulling this commit first. Source `explorations/experiment/env.sh` once, then check that `echo $FORTRESS_HOME` prints the worktree. Set `TMPDIR` to the worktree's `tmp/`. Read this file and `SKEPTIC.md`. Build nothing but the specification; run no gate target.

2. **I.1.11, the rational entries' originals** (`Specification/appendices/changes.tex:730-731`).
   - Replace "with the same signatures in the method entries (lines 327--328, 338--339, 345--346, 385--388, 416--417, 488--493 and 546--562);" with a sentence saying that the method entries at lines 327--328, 345--346, 388, 416--417, 488--493 and 546--562 repeated the listing's signatures, and that two did not.
   - Quote those two verbatim with their line numbers: `Specification-1.0-frozen/basic-lib/numbers.tex:339` (`\Method{\EXP{\KWD{opr} /(\KWD{self}, \VAR{other}\COLON \mathbb{Q})\COLON \mathbb{Q}^*}}`) and `:387` (`\Method{\EXP{\KWD{opr} \mathord{\OPR{CMP}}(\KWD{self}, \VAR{other}\COLON \mathbb{Q})\COLON \TYP{TotalComparison}}}`).
   - Quote them as `\Method` lines inside the `quote`. If the build refuses `\Method` there, quote their `\EXP` content inside a `Fortress` block. In that case, add a sentence saying the wrapper was dropped, as the entry already says of the alignment commands (decision-record decision 12).

3. **I.1.12, the integer entries' originals** (`changes.tex:810-811`).
   - Do the same for the integer entries. The entries that repeated the listing are lines 425, 507, 551, 600, 669--672 and 888--899.
   - Quote verbatim `Specification-1.0-frozen/basic-lib/basic-integers.tex:622` (`\Method{\EXP{\KWD{opr} \left|\mathord{\KWD{self}}\right| \mathrel{\mathtt{:}} \mathbb{N}}}`) and `:816` (`\Method{\EXP{\VAR{lowBits}(\KWD{self}, k\COLON \TYP{IndexInt})\COLON \mathbb{N}}}`). Note that the listing's `lowBits` line, `:284`, already said ℤ.
   - In the Change at `changes.tex:763-766`, write "the result of \VAR{lowBits} in its method entry" in place of listing `lowBits` among the listing's retyped results.

4. **The reductions callout** (`Specification/basic/expressions/reductions.tex:27-38`).
   - Keep answer 7's content: the desugaring is type-directed in the specification, neither implementation does it yet, and a clause form whose element type no argument fixes writes its static argument, with the example and rows 424 and 425. Also keep "The normative text is unchanged".
   - Scope the checker sentence. `BottomType` is taken by the interpreter, and by the compiled type checker when it checks the libraries this specification describes (row 425).
   - Add one sentence. Until the compiled path is built on those libraries, it compiles against a smaller library of its own. Its big operators ∑ and `BIG MAX` take no static argument and range over ℤ32 only. There the clause form runs unwritten, and the written static argument is refused.
   - Cite no repository path in the callout.

5. **I.1.16** (`changes.tex:953-975`).
   - Make the Change (`:957-960`) and the Rationale (`:967-969`) say the same as step 4.
   - Cite the compiled path's declarations as `\nolinkurl{Library/CompilerLibrary.fsi}`, lines 180--184.
   - Cite the skeptic's measurement as `\nolinkurl{explorations/compile-ladder/rung-spec-numbers/probes/skeptic/SkSumClauseTyped.t1.txt}`, beside rows 424 and 425.

6. **ℤ's `^`, reported and not chosen** (`Specification/basic-lib/basic-integers.tex:269-285`, the `revival-integers` callout).
   - Add sentences saying that the exponent, ℕ in the Working Draft, is now ℤ, so a negative power is admitted. The Working Draft gave its result through ℚ's exponentiation, since ℤ was a subtype of ℚ (\EXP{2^{-1}} was 1/2, frozen `numbers.tex:344-355`), and this chapter does not give it.
   - Put the same sentence in I.1.12's Effect (`changes.tex:778`).
   - Do not edit the `^` entry (`basic-integers.tex:489-499`), its property, or any other normative sentence.

7. **The numerals into ℝ64** (section 1.5).
   - `Specification/basic-lib/numbers.tex:43`: write that ℝ64 coerces from ℤ32 and from integer numerals (`\secref{literals}`), dropping "every integer numeral whose value ℤ32 holds".
   - `Specification/basic/conversions-coercions.tex:64-68`: write "of values of type ℤ32, and of integer numerals, to the floating-point type ℝ64". Keep the rest of the sentence.
   - The callout, `:75-83`:
     - Replace "from ℤ32 and from the integer numerals it holds" (`:80-81`) with "from ℤ32, and the decision names the integer numerals too".
     - Add a sentence saying that the interpreter gives an integer numeral outside ℤ32's range a wider integer type, and so does not yet convert it.
     - Add a sentence saying that the compiled path's own library declares no conversion into ℝ64 from an integer.
   - Leave Example 1 (`:154-155`) unchanged. It is true again.
   - `changes.tex:448` (I.1.10 Change): "from ℤ32 and from integer numerals".
   - `:934-935` (I.1.15 Change): "that of ℤ32 values and of integer numerals to ℝ64".
   - I.1.15 Effect (`:940-942`): add that Example 1 of `\secref{coercion}` stands as written.
   - Cite no provisional row number anywhere under `Specification/`.

8. **Rebuild the specification** as the rung first did (`Specification/fortress/README:5-14`): `./ant genSource`, then `./ant tex`, in `Specification/fortress/`, with `FORTRESS_HOME` set to the worktree.
   - Capture the logs as `probes/build/repair-genSource.txt` and `probes/build/repair-tex.txt`, each headed by its machine line: nproc, CPU model and MHz, load average, JDK, `FORTRESS_THREADS`.
   - Confirm `BUILD SUCCESSFUL` and the page count, and that `fortress.log` has no undefined or multiply defined reference.
   - Copy the PDF to `Specification/fortress.pdf`.
   - Regenerate `probes/build/base-vs-edit-pdftotext-diff.txt` with `probes/build/norm.sh`.
   - Update `probes/build/diff-hunks.txt` so that every hunk has a cause, including the new ones from steps 2 to 7.
   - Then remove the build's ignored products with `git clean -X -- Specification`, and confirm with `git status --ignored --short Specification`.

9. **The prose rung's check** (home 1, before the second skeptic).
   - From the worktree root, run `python3 explorations/compile-ladder/rung-spec-numbers/probes/skeptic/quotecheck.py > explorations/compile-ladder/rung-spec-numbers/probes/repair/quotecheck.txt`.
   - Confirm that none of the four lines of steps 2 and 3 appears as `NOTQUOTED`.
   - Append to the same capture one line per remaining `NOTQUOTED` line, giving its reason. These are `\Method` forms whose signatures the entry says the listing repeated, the `imagpart` line whose only change is the closing alignment, the check entries named by line, and the internal document's box that the decision record quotes.
   - Also capture `grep -n` of the rebuilt PDF's text for "integer numerals", the negative-power sentence and the scoped reductions sentence, as `probes/repair/text-check.txt`.

10. **`probes/list.txt`.** Leave the text written before the edit as it is. Append under its "CORRECTIONS MADE AFTER THE LIST WAS COMMITTED" section:
    - `opr-overview.tex:182-183` becomes `:166`;
    - `:181` becomes `:165`;
    - L4's `:176-183` becomes `:164-169`;
    - L2 was wrong: Example 1 at `conversions-coercions.tex:141-144` (tip `:154-155`) was contradicted by T2's and T15's first wording and agrees with them as repaired (this file, 1.5);
    - T12's `:816` quote is now in I.1.12.

11. **`decision-record.md`.**
    - Section 2 and section 5, decision 1: fix the `opr-overview` citations.
    - Section 3.1: change "ℝ64 from ℤ32 and every integer numeral ℤ32 holds" to answer 8's words, citing this file.
    - Section 5, decision 4: add its consequence and the report of step 6.
    - Section 5: add decision 12, stating the numeral wording as this judgement's ruling, with the skeptic's alternative.
    - Section 6, statement 3: ℝ64 coerces from ℤ32 (`coerce(x: ZZ32)` in `trait RR64`). The numerals clause has no `.fsi` counterpart, since walk types numerals by width, and walk's narrowing is the new provisional row of step 12.
    - Section 6, statement 5: add that `RR32` declares both checks as well (`FortressBuiltin.fsi:56-59`).
    - Section 6: add three statements. Statement 9 is ℤ's `^`, a pre-existing mismatch and not blocking. Statement 10 is L3's integer division giving a rational for every integer type. Statement 11 is the explicit conversion into ℝ64, with its gather rule (this file, 1.6).

12. **`record.md`.**
    - **The FACTS line:**
      - "ℝ64 from ℤ32 and integer numerals";
      - `opr-overview.tex:166`;
      - "quote every original" (true after steps 2 and 3);
      - the integer-to-float sentence as in step 7;
      - the new page count.
    - **Row 431:** add the `CMP` face (1.8), and make the owed `XXX` walk test assert both `NOT (0/0 = 0/0)` and `(0/0 CMP 0/0) = Unordered`.
    - **Notes to rows 424 and 425:** add the compiled path's own library clause of step 4.
    - **Three provisional rows after 431**, the gather assigning final numbers:
      - (a) The negative power, home 3, with `probes/skeptic/SkIntPowerNeg.fss`, `.t1.txt`, `SkIntPowerType.fss` and `.t1.txt`. Its text is the skeptic's recommended row, with "matches no source" for "wrong under every reading".
      - (b) The compiled prelude lacks the chapters' conversions and checks: `SkIntFloat.t1.txt`, `SkNumeralFloat.t1.txt`, `SkNN32Wide.t1.txt` and `SkRRCheck.t1.txt`. It is closed by the switch-over (`POSITIONS.md:46`), with precedent rows 314 and 316.
      - (c) Walk does not convert an integer numeral outside ℤ32's range into ℝ64. The specification is `conversions-coercions.tex:154-155` with answer 8. The evidence is `SkNumeralFloat.t1.txt` on the base, "3000000000" unconverted, to be re-measured at the gather on the merged tree, where it is expected to be refused. The mechanism is `FIntLiteral.java:40-56`. The owed `XXX` walk test asserts that `s: RR64 = 3000000000` holds a float. The fix location is walk's conversion at a typed binding or parameter, which would have to know that an argument is a numeral; it is not measured.
    - **The handover line:** add, as open for Pavol, the negative power (walk 0.5, compiled 0, Working Draft 1/2) and the numeral wording with its "(exact)" residue.

13. **The report.**
    - Revise `reportText` sections 3, 4, 7, 9 and 10 and its `specCitations` to match steps 2 to 12.
    - Section 10 says the ignored products are not in the worktree.
    - Section 9 adds the two items of step 12's handover line and this judgement's decision (section 3 here).
    - Add a section "Repair round" that lists each step above with its result and its capture.
    - Try to write `explorations/compile-ladder/rung-spec-numbers/REPORT.md`. If the harness refuses, say so and carry the full text in the structured result. Write the list for Pavol (section 9) as `probes/repair/for-pavol.txt`.

14. **Close.**
    - Run the shared prefix's tracked-path loop over `REPORT.md` (if written), `record.md`, `decision-record.md` and `JUDGE.md`, and fix every line it prints.
    - Check that `git diff --stat e5414f5bf -- . ':!explorations'` still lists only the eight `.tex` files and the PDF, and that `git diff --quiet e5414f5bf -- Specification-1.0-frozen` succeeds.
    - Commit with the footer of `explorations/protocol.md:117-122` and push to `wip/rung-spec-numbers` only.

## 5. What the second skeptic checks

- The four quotes against the frozen copy.
- The reductions callout against `CompilerLibrary.fsi:180-184` and rows 424 and 425.
- The numeral sentences against answer 8 and Example 1.
- The negative-power sentence: it reports and does not choose.
- The rebuilt PDF, its text diff with every hunk caused, and `probes/repair/quotecheck.txt`.
- The three new provisional rows and row 431's amendment.
- The corrected citations.
- That no normative text changed beyond steps 2 to 7.
