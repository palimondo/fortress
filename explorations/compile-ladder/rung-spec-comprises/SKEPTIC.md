# Skeptic: rung X, the comprises clause in the 2012 reading (climb batch 7C, rung-spec-comprises)

*Note added at the gather: the rung's provisional rows 488 and 489, as this file cites them, are the ledger's rows 491 and 492; rung Y's rows are 487 to 490.*

**Verdict: approved, with required corrections.** The edit does what the decision asks, in the S1 form, and the text states rung Y's rule for every shape I measured under a shadow of Y's edit. One sentence of the new normative text is broader than the decision: read literally, it admits a `where`-clause variable in a listed type's static arguments, which the later Types chapter excludes, the entry's own Rationale denies and both paths refuse (correction 1). The other corrections are wording and record fixes. Nothing here contradicts a decision of Pavol's.

## 1. What I read and ran

- The briefing (`explorations/coordinator/tools/facts-extract.sh` with the ten keys of my brief, one part): POSITIONS 2026-09-28 (`AnyIntegral`'s `comprises` clause), 2026-09-26 (S1; the first of the batch-5 answers; the lineage note), 2026-09-27 (the stops); the judgement's section 3 (`explorations/reviews/anyintegral-comprises-judgement.md:85-118`); the frozen note (`Specification-1.0-frozen/basic/traits.tex:231-241`); the Types chapter's passage (`Documentation/Specification/Prose/Language/types.tick:384-390`); the model entry (`Specification/appendices/changes.tex:119-146`); rung S's form section (`explorations/compile-ladder/rung-spec-route-a/decision-record.md:452-470`). Also the batch record's sections 1 to 5 (`explorations/coordinator/CLIMB-BATCH-7C.md:3-211`), Y's section among them, since X's text states Y's rule.
- The branch: five commits of the worker's, `36012a2bb` (the list and the base build, before any edit), `8e75787bc` (the edit and the edited build), `8b2feaaa1`, `87e147120`, `a30516fa3`. The worktree carried no uncommitted edit. `git diff --stat 715816bdd...HEAD` outside `explorations/` names `Specification/basic/traits.tex`, `Specification/appendices/changes.tex` and the two tests only; `Specification-1.0-frozen/` and `Specification/fortress.pdf` are untouched (`git diff --stat 715816bdd -- Specification-1.0-frozen Specification/fortress.pdf`, empty).
- REPORT.md is not on the branch (the harness refused the worker's write); I read the report text of the worker's structured result, and `record.md`, `decision-record.md` and every capture under `probes/`.
- My own programs, twelve runs, under `probes/skeptic/` (section 9). The shadow of Y's edit is `explorations/reviews/anyintegral-comprises-ways/shadow-thc.py`, whose `-Dprobe.aicw.eligibleNarrow=true` switch turns on the 14 lines of `everyKnownSubtypeListed` that Y lands without a switch (`CLIMB-BATCH-7C.md:96`); `probes/skeptic/build-shadow.sh` builds it, `probes/skeptic/run-sk.sh` runs a program four ways.

## 2. The provenance block

Each cited line opened with `sed -n` on this tree.
- **problem:** `Library/FortressLibrary.fsi:433-436` holds `AnyIntegral` and `Integral` as described. `Specification/basic/traits.tex:236-240`, quoted as "exactly the traits that immediately extend T", says that only at the base `715816bdd`; on this tree those lines are the new text ("then every type listed in its comprises clause extends T, ..."). Correction 2.
- **spec:** `traits.tex:234-246` is "the passage revised", cited by its base lines as rung U's block cites its revised passage (`explorations/compile-ladder/rung-spec-ranges/REPORT.md:4`); `explorations/coordinator/map/spec-to-implementation.md:194` is the map's row for `comprises`; `traits.tex:163-170` (the rendered sentence and Victor's note) and `types.tick:384-390` say what the block says. No citation is to `Specification/library/apis/`.
- **precedent:** `traits.tex:181-185` (the `revival-where` box), `changes.tex:119-146` (its entry), `changes.tex:1086-1103` (rung U's entry, "This change does not follow from route~A" at `:1093`), `explorations/compile-ladder/rung-spec-ranges/probes/reanchor/reanchor.py:1`: all hold.
- **deviation:** `traits.tex:235-252`, `:236`, `:245-248`, `changes.tex:1311-1316` and `ProjectFortress/tests/XXXFlatStringSplitRungL.fss:11` hold.
- **historical:** `Specification/basic/traits.tex` and `Specification/appendices/changes.tex` are both in the 2012 tree (`git cat-file -e a874948ac:...`); the two tests are the revival's (`XXXFlatStringSplitRungL.fss` and `XXXTupleVarFieldCompiledRungC.fss` are absent at `a874948ac`). Complete.

## 3. The recorded failure and the recorded pass

No test can go red for a prose edit (`CLIMB-BATCH-7C.md:149`). The recorded state before the edit exists and was committed before the edit: `36012a2bb` carries `probes/build/base-tex.txt`, whose last pass reads "Output written on fortress.pdf (626 pages, 2095561 bytes)" (`:16398`), and `probes/build/committed-vs-base-pdftotext-diff.txt` (empty: the base build's text equals the committed PDF's, which prints the note). The pass: `probes/build/edit-tex.txt:11562`, 627 pages; the new text and callout at `probes/build/base-vs-edit-pdftotext-diff.txt:2-18`, the removed sentence at `:20-21`, the entry at `:59-106`. The last pass of each build has the same seven "Float too large" and three "Marginpar moved" warnings; the edited build's only undefined references are in its first pass (`edit-tex.txt:238`, `:2845`, `:2850`). Each build log starts with its machine line. `probes/build/diff-hunks.txt:4-5` gives the text as `:235-253` and the callout as `:254-267`, where the text is `:235-252` and the callout starts at `:253` (correction 5).

## 4. The diff against the decision, sentence by sentence

The decision: POSITIONS 2026-09-28, `AnyIntegral`'s `comprises` clause; its content, the judgement's section 3, "The specification change, in the S1 form" (`anyintegral-comprises-judgement.md:100-109`); Y's rule, `shadow-thc.py:45-64` with the switch removed.

- **S1, `traits.tex:235-237`**: every listed type extends `T`; every value of `T` is a value of a listed type. The coverage half is the Types chapter's (`types.tick:387-390`) and Welterweight's (`Papers/Welterweight/grammar.tick:21-22`), and the compiled checker's subtype rule already reads a clause so: a trait with a clause is a subtype of a union when each listed type is (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:152-157`). The "extends `T`" half is decision D1, "explicitly" dropped. It is the checker's unchanged rule (`TypeHierarchyChecker.scala:220-240`, `extendsContains` recursing at `:284-303`) and Welterweight's D-Trait (`Papers/Welterweight/fig-wellformeddecls.tick:53`), and my `SkThroughOwnClause` measures the case that needs the relaxation: listed `A` and `B` that extend `T` only through a subtrait `M` with a clause of its own are accepted by the stock checker and under Y's rule, and run (`probes/skeptic/SkThroughOwnClause.txt`). The old note's "explicitly" would refuse them. D1 is sound and flagged for Pavol.
- **The ellipsis.** I checked whether the rendered coverage sentence now contradicts a clause with `...`, since the exception stays in a `\note` a release build drops (`Specification/fortress/fortress.tex:35-36`). It does not: the rendered satisfaction rule makes a component's clause list the api's types and the component's own extenders, without `...` (`Specification/basic/components/source-code.tex:386-392`), so the complete clause the sentence speaks of exists. No finding.
- **S2, `traits.tex:238-240`**: "A listed type may be an instantiation of a parameterized trait, provided that every static parameter that occurs in its static arguments is a static parameter of T." The specification distinguishes `where`-clause variables from static parameters: "We use the term where-clause variables to refer to static variables that are not also static parameters" (`Specification/basic/trait-parameters.tex:312-315`). A `where`-clause variable is not a static parameter, so the proviso says nothing about one. `trait T comprises { Foo[\I\] } where [\I\]` then meets it vacuously, and so does the team's own "not yet" spelling `comprises Integral[\I\] where [\I\]` (`Library/FortressLibrary.fsi:434`; the same at `:885` for `Maybe`, and `Library/FortressLibrary.fss:1479` for `UniqueItem`). The decision's content excludes it: the Types chapter lists "generic types determined by the generic type of the declaration" (`types.tick:384-386`), `G` determining `G'` "if every parameter of G' is a parameter of G" (`:277-279`), and the judgement says "generic types each of whose parameters is a parameter of the declaring trait" (`anyintegral-comprises-judgement.md:105`). The entry's own Rationale says `Integral` "cannot be listed" (`changes.tex:1296-1297`). Both paths refuse the program, "I is undefined" (`probes/skeptic/SkWhereListed.txt`). So the sentence is broader than the decision, and it is the batch record's stop "a type variable allowed in a clause", met by the literal reading (section 11). Correction 1.
- **S3, `traits.tex:241-248`**: its three cases against Y's `isEligibleToExtend` with the new disjunct. Case one is `comprisesContains`, a subtype test (`TypeHierarchyChecker.scala:268-278`). Case two is the recursion at `:258-265`. Case three is the disjunct `!tt.getArgs.isEmpty && everyKnownSubtypeListed(...)` (`shadow-thc.py:47-48`, `:52-62`). Measured under the shadow:
  - "at least one" (`SkGenNoExtender`) and "every ... is a subtype of a listed type" (`SkGenOneUnlisted`) both refuse, as the text does.
  - An object with static parameters is refused (`SkGenObject`); the text's third case is for a trait.
  - A generic subtrait whose parameters are all `T`'s is accepted (`SkGenSameParams`). This is decision D2, which the judgement's narrower words, "static parameters the closed trait does not have", would refuse; the decision's "a generic child" and Y's code accept it. D2 is right.
  - The code counts the explicit extenders and the text says "every trait or object that extends it". The two agree, since every transitive extender lies below an explicit one.
- **S4, `traits.tex:249-252`**: per instantiation, the substitution at `TypeHierarchyChecker.scala:199-202`. `SkExtraParam` (a parameterized `T`, and `G[\X, Y\]` with a parameter `T` lacks) is accepted under Y's rule and runs.
- **The callout, `traits.tex:253-267`**, and **the entry, `changes.tex:1246-1338`**, say what the text says.
  - The original quoted in the entry equals `Specification-1.0-frozen/basic/traits.tex:231-241` word for word.
  - The base's `traits.tex:234-247` equals the frozen `:229-242` (`diff`, no output).
  - The Welterweight title and authors match `Papers/Welterweight/paper.tick:501-509`.
  - Every `\secref` resolves: `trait-decls` `traits.tex:32`, `internal-types` `types-vals-vars.tex:569`, `more-specific-rule` `overloading.tex:225`, `abstractFunctionDeclarations` `functions.tex:354`, `revival-routec` `changes.tex:1371`, `apis` `apis.tex:13`.
  - Two statements are inaccurate:
    - `changes.tex:1296-1297` says `Integral` "cannot be listed", where S2 lets `Integral[\ZZ32\]` be listed and the callout says it "can be listed only at particular static arguments" (`traits.tex:260-261`). Correction 3.
    - `traits.tex:266-267` and `changes.tex:1265-1267` say the text "answers the draft note on trait identifiers". That note asks three questions (`traits.tex:167-170`): why only `comprises`, where "trait identifier" is defined, and whether it includes instantiations. The text answers the third. Correction 4.
- **The ellipsis sentence and the `Molecule` example** are unchanged: the base's `:241-246` equals the tree's `:269-274`, and `:262-279` equals `:290-307` (content compared).

## 5. The precedent

The S1 form as rung S built it and rungs T and U followed; the `revival-where` box and entry as the model; rung U's "does not follow from route A" Rationale for a change outside route A. All followed. The appendix's introduction still says every change follows from route A (`changes.tex:48-53`); rung U reported that, and the brief gives X its subsection only.

The re-anchoring: rung U's script with one change, decision D11, mapping each citation from the commit that wrote it. I checked D11 by content. Both citations were written before rung S's `3924e7ec3` (`git log -S`: `763ba87bc`, 2026-09-23; `b628871a2`, 2026-09-26 06:00; `3924e7ec3`, 2026-09-26 16:14, +32 lines in `traits.tex`). At the base their numbers point at the functional-method examples and the `getter` sentence. At the new numbers, `:585-591` and `:506-508`, the text equals what each commit cited (the override rule; the setter's single argument). The brief's literal base map would carry the wrong text along. D11 is right, and it is a deviation from the brief's words, flagged for Pavol.

The same defect elsewhere, `probes/reanchor/stale-scan.txt`: 7 citations in 5 files, reported for the gather. `stale-scan.py` maps a citation's first and last line only. For `ProjectFortress/tests/XXXTupleSevenRungS.fss:10` (`basic-lib/objects.tex:144-158` at `763ba87bc`, `:175-189` at the base), three lines inside differ: rung S rewrote `Tuple`'s sentence and declaration. That citation is revised text, not a renumbering. The other three I opened are pure renumberings: `XXXTupleSeparatorRungS` `:161-188` to `:197-224`, `XXXFortToStringRungS` `:117-122` to `:121-126`, `XXXUnionMethodRungS` `:589` to `:623`. Correction 6.

## 6. The tests

X adds no test. The two re-anchored tests change only the line numbers in their message strings (`probes/reanchor/assertion-check.txt`; `git diff`). Neither `.test` pins a message: `XXXTupleVarFieldCompiledRungC.test` checks `REACHED` and `java.lang.VerifyError`, and `XXXFlatStringSplitRungL` is a walk test with no `.test` file. Each carries one comment line (`XXXFlatStringSplitRungL.fss:1`, `XXXTupleVarFieldCompiledRungC.fss:4`).

## 7. The competing-declaration grep

- The label `revival-comprises` occurs twice, at `changes.tex:1247` and `traits.tex:253`, and the subsection title once.
- The source sites that read a `comprises` clause, outside the parser and the generated nodes (`grep -rn 'comprisesTypes\|getComprises\|isComprisesEllipses' ProjectFortress/src/com/sun/fortress`):
  - `TypeHierarchyChecker.scala:191-240`, `:254-266`, Y's.
  - `TypeAnalyzer.scala:152-157` (subtyping by coverage) and `:441-447` (a closed trait excludes what excludes every listed type), both value-level and consistent with the new text.
  - `ExclusionOracle.scala:251-275` (closed types).
  - `ExportChecker.scala:721-738` (the ellipsis, row 354).
  - The interpreter's `FType.java:283`, walk's exclusion test (row 407).
- No site states a rule the new text contradicts.

## 8. The record

- The ledger notes: I compared by content every citation the notes map. The Working Draft's numbering against the tree:
  - `:461-467` is `:521-527`, `:484-495` is `:544-555`, `:509-514` is `:569-574`, `:809-812` is `:869-872`, `:723` is `:783`.
  - `:220-222` is `:225-227`, `:193-194` is `:198-199`, `:236-241` is `:269-274`.
  - `:525-531` is `:585-591`, `:446-448` is `:506-508`.
  - The base's numbering: `:299-313` is `:327-341`, `:262-279` is `:290-307`, `:241-246` is `:269-274`; `:160-162` is unmoved.
  - All are equal. Rows 22, 53, 55, 77, 150, 226, 354, 356, 357, 371, 372, 380, 397, 405, 406, 414, 115, 118 and 459 cite what the notes say they cite (`grep` of `explorations/fortress-gap-ledger.md`).
  - One `traits.tex` citation outside the table is not named, the Astra comparison's `traits.tex:228-235` (`explorations/fortress-gap-ledger.md:663`); the record's general sentence on the Working Draft's numbering covers it.
- The FACTS entry: the new entry is true as written. The correction to "The tower closure of `02d09a39f` has no spelling the compiler's checker accepts" says the rendered text "refuses an extender the clause does not list unless it is a trait with static parameters whose every extender is below a listed type, `:241-248`". The text also admits an unlisted extender below a listed type, and a trait with a clause of its own (`traits.tex:241-244`; `SkThroughOwnClause`). Correction 7.
- Rows 488 and 489 are checkable from their probes. My measurements strengthen both (recommended rows).

## 9. The differentials (one thread; the rung writes no state)

All on this tree (`a30516fa3`, the base's checker and interpreter), `FORTRESS_THREADS=1`. The machine is nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, with the load at each run's start in its capture's first line (one-minute load 0.53 to 3.52). Each program was run four ways: walk, the stock compiled checker, the compiled checker under Y's rule (the shadow), and a compiled run under Y's rule.

| program | walk | compiled, stock | compiled, Y's rule | text | outcome |
|---|---|---|---|---|---|
| `SkInstanceListed` (listed `Foo[\ZZ32\]`; generic `Foo` extends `T` unlisted, one object below the listed type) | PASS | refused, "Foo is not eligible" | accepted; run PASS | allowed (S2, third case) | after Y all three agree |
| `SkGenSameParams` (`G[\X\] extends T[\X\]`, parameters all `T`'s) | PASS | refused | accepted; PASS | allowed (D2) | agree after Y; the judgement's narrower words would refuse it |
| `SkExtraParam` (`T[\X\]`; `G[\X, Y\]`) | PASS | refused | accepted; PASS | allowed (S4) | agree after Y |
| `SkThroughOwnClause` (listed types extend `T` through `M`) | PASS | accepted; PASS | accepted; PASS | allowed (D1) | agree; the old note's "explicitly" would refuse it |
| `SkGenNoExtender` | PASS | refused | refused | refused ("at least one") | walk diverges; the specification settles it against walk, row 22 |
| `SkGenOneUnlisted` | "ObjZ is a T and not an A" | refused | refused | refused | the same, row 22 |
| `SkGenObject` (`object Obj[\X\] extends T`) | "Obj[ZZ32] is a T and not an A" | refused (and "Obj[\X\] excludes T but it extends T") | refused | refused | the same, row 22 |
| `SkInstanceWrongArg` (`FooS extends Foo[\String\]`, listed `Foo[\ZZ32\]`) | "FooS is a T and not a Foo[ZZ32]" | refused | refused | refused | the same, row 22 |
| `SkWhereListed` (`comprises { Foo[\I\] } where [\I\]`) | "I is undefined" | "I is undefined" | "I is undefined" | allowed as worded; excluded by the decision's content | correction 1 |
| `SkMeetSingle` (`S comprises {V}`, `T comprises {V}`, `f(S)`, `f(T)`, `f(V)`) | refused at load, "unrelated ... no excluding pair" | "Invalid overloading of f" | the same | valid (`types-vals-vars.tex:583-588`, `overloading.tex:258-262`) | both paths against the specification: row 489, a smaller reproducer |
| `SkBetweenAssign` (`G[\X\] extends {S, T}`, `object H extends {G[\ZZ32\], V}`, `v: V = g`) | PASS | refused (G not eligible; the assignment) | refused, only "Right-hand side has type G[\ZZ32\], but declared type is V" | unsettled (P1) | row 488, measured |
| the rung's `BetweenTwoClosed` and `MeetExample`, typechecked only (`probes/skeptic/between-narrow.txt`) | — | G not eligible (twice); "Invalid overloading" | G accepted, then "Invalid overloading of f"; MeetExample unchanged | — | the worker's "by reading" claim holds |

In the four divergences marked row 22, the specification settles against the interpreter, and row 22 already records that walk never checks `comprises` (`explorations/fortress-gap-ledger.md:136`). No new row is owed. `SkBetweenAssign` is P1's question on the compiled path once Y lands. The checker holds `G[\ZZ32\]` a subtype of `S` and `T` and not of `V`, against "any subtype of both S and T must be a subtype of V" (`Specification/basic/types-vals-vars.tex:602-604`). Walk's value-level answer agrees with the coverage reading. The specification is now unsettled there, as the rung reported (row 488).

## 10. The failure-mode question, the count, the homes

- No loud failure becomes a quiet value: the rung edits prose. Y's edit turns the checker's "not eligible" error into acceptance for exactly the shapes the text allows (the table).
- The count: X declares none and names no table (`CLIMB-BATCH-7C.md:155`); nothing to compare.
- The homes:
  - Row 489 is home 2 by the rung's own reasoning. Its `XXX` tests are owed and not written, because the manifest gives X "no source and no test assertion" (`CLIMB-BATCH-7C.md:487`) and its files exclude a new test (`:151`). The worker was right not to write them; the three-homes rule and the rung's files conflict here, and no rung is named to write them (for Pavol).
  - Row 488 is home 3 with a committed probe; now measured (`SkBetweenAssign`).
  - The stale citations are record defects, not language ones.

## 11. Stops met

- "A passage of its list whose new text neither the decision nor Y's section settles (reported, not chosen)": P1 to P4 (`Specification/basic/types-vals-vars.tex:602-604`, `Specification/advanced/overloading.tex:303-307`, `Specification/basic/functions.tex:413-415`, `Specification/basic/components/source-code.tex:429`). Lifted by POSITIONS 2026-09-27, the stops.
- "Normative text stating more than the decision and Y's section build: a type variable allowed in a clause": met by S2 as worded, which admits a `where`-clause variable in a listed type's static arguments (`traits.tex:238-240`; `trait-parameters.tex:312-315`). Correction 1 closes it. Lifted by POSITIONS 2026-09-27, the stops (reversible).
- The standing stop on normative text, lifted by the decision: the draft note's first sentence replaced by rendered text (`traits.tex:235-252`; POSITIONS 2026-09-28, `AnyIntegral`'s `comprises` clause).
- Not met:
  - an edit under `Specification-1.0-frozen/`;
  - a rule about objects in other units (the normative text is universal, and the checker's limit is in the entry's Effect, as the brief asks);
  - a change to the ellipsis sentence or to `Molecule`;
  - an assertion changed;
  - a file of Y's.
- D1 states a requirement the judgement's section 3 does not list. It is the checker's unchanged rule, which Y's section keeps (`CLIMB-BATCH-7C.md:100`, "Not: ... the check of listed types (`:220-242`)"), and Welterweight's, so I do not count it as more than the decision and Y's section build.

## 12. Required corrections

1. **`Specification/basic/traits.tex:238-240` and `Specification/appendices/changes.tex:1256-1258`.** The proviso on a listed instantiation covers only static parameters, so a `where`-clause variable passes it vacuously (`Specification/basic/trait-parameters.tex:312-315`; `probes/skeptic/SkWhereListed.txt`). It must cover every static variable, as the Types chapter's "determined by" (`types.tick:277-279`, `:384-386`) and the judgement's "generic types each of whose parameters is a parameter of the declaring trait" do, for example: "provided that every static variable that occurs in its static arguments is a static parameter of T". Record it in the decision record's D4.
2. **The provenance block's `problem:` line.** It quotes "exactly the traits that immediately extend T" at `Specification/basic/traits.tex:236-240`, which on the landed tree is the new text. It should say "at the base 715816bdd", or cite `Specification-1.0-frozen/basic/traits.tex:231-235`.
3. **`Specification/appendices/changes.tex:1296-1297`**, "so it cannot be listed", contradicts S2 and the callout (`traits.tex:260-261`). It should read "cannot be listed at its own static parameter" or "can be listed only at particular static arguments".
4. **`Specification/basic/traits.tex:266-267` and `Specification/appendices/changes.tex:1265-1267`** say the text answers the draft note on trait identifiers, which asks three questions (`traits.tex:167-170`). The text answers the third, whether instantiations are included. They should say so.
5. **`probes/build/diff-hunks.txt:4-5`** give the text as `:235-253` and the callout as `:254-267`. The text is `:235-252` and the callout `:253-267`.
6. **The report's "For the gather" list and `probes/reanchor/stale-scan.txt`** should say that `ProjectFortress/tests/XXXTupleSevenRungS.fss:10`'s cited passage was rewritten inside by rung S (`basic-lib/objects.tex:144-158` at `763ba87bc` against `:175-189` at the base: three lines differ). A renumbering would cite revised text there.
7. **record.md, the correction to the FACTS entry "The tower closure of `02d09a39f` has no spelling the compiler's checker accepts".** "refuses an extender the clause does not list unless it is a trait with static parameters whose every extender is below a listed type" must also name the other two cases, an extender below a listed type and a trait with a clause of its own (`traits.tex:241-248`).

## 13. Recommended rows

- Row 488, provisional: replace "by reading" with the measurement.
  - Under the shadow of Y's rule, `BetweenTwoClosed`'s `G` passes the hierarchy check and the program stops at row 489's overloading refusal (`probes/skeptic/between-narrow.txt`).
  - `probes/skeptic/SkBetweenAssign.fss` shows the type-level consequence without overloading: `v: V = g` is refused, "Right-hand side has type G[\ZZ32\], but declared type is V", while walk runs it (`SkBetweenAssign.txt`).
- Row 489, provisional: add `probes/skeptic/SkMeetSingle.fss` as the smallest reproducer. With one listed type in each clause and no `excludes`, both paths still refuse `f(S)`, `f(T)`, `f(V)` (`SkMeetSingle.txt`), so neither path uses the clauses to find a meet at all.

## 14. For Pavol

- Correction 1 settles the team's own "not yet" spelling, `comprises Integral[\I\] where [\I\]` (`Library/FortressLibrary.fsi:434`, `:885`; `Library/FortressLibrary.fss:1479`), as not a valid clause, as the Types chapter's reading does. The batch record lists the `where` spelling as not a choice of this batch (`CLIMB-BATCH-7C.md:210`), and the text as written admits it by omission. Evidence: `Specification/basic/traits.tex:238-240`; `Specification/basic/trait-parameters.tex:312-315`; `Documentation/Specification/Prose/Language/types.tick:277-279`; `probes/skeptic/SkWhereListed.txt`.
- Row 489's two `XXX` tests (home 2) are owed with no rung to write them: the manifest gives X no test assertion, and the meet rule's library work is batch 8's. Evidence: `CLIMB-BATCH-7C.md:151`, `:487`; `probes/between/MeetExample.txt`; `probes/skeptic/SkMeetSingle.txt`.
- Once Y lands, P1's question is live on the compiled path, not only by reading. The checker holds `G[\ZZ32\]` below `S` and `T` and not below `V`, against `Specification/basic/types-vals-vars.tex:602-604`. Evidence: `probes/skeptic/SkBetweenAssign.txt`.

## 15. Tracked paths

The prefix's check over this file, run before the commit, printed nothing. Every `explorations/compile-ladder/` path cited here exists and is tracked by the commit that carries this file.
