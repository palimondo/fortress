# Rung X: the comprises clause in the 2012 reading (climb batch 7C, rung-spec-comprises)

problem: once rung Y lands, the compiled checker accepts the one library's AnyIntegral clause, whose generic Integral extends the closed trait unlisted (Library/FortressLibrary.fsi:433-436), and the traits chapter's draft note refuses it, the listed traits being "exactly the traits that immediately extend T", Specification/basic/traits.tex:236-240 at the base 715816bdd (the Working Draft's Specification-1.0-frozen/basic/traits.tex:231-235)
spec: the passage revised, Specification/basic/traits.tex:234-246 (the map row explorations/coordinator/map/spec-to-implementation.md:194), with the rendered sentence on what a clause lists and Victor Luchangco's question on it, Specification/basic/traits.tex:163-170; the later Types chapter cited beside it, Documentation/Specification/Prose/Language/types.tick:384-390
precedent: the revival's callout answering a draft note in the same section, Specification/basic/traits.tex:181-185, with its Appendix I entry, Specification/appendices/changes.tex:119-146; rung U's entry for a change that does not follow from route A, Specification/appendices/changes.tex:1086-1103; rung U's re-anchoring script, explorations/compile-ladder/rung-spec-ranges/probes/reanchor/reanchor.py:1
deviation: the note's first sentence is replaced by the text rather than kept beside a box (Specification/basic/traits.tex:235-252); "explicitly" is dropped from the requirement on listed types, which the checker and Welterweight state as extension (Specification/basic/traits.tex:236); the third case covers every trait with static parameters, as Y's code tests, wider than the judgement's words (Specification/basic/traits.tex:245-248); one sentence of the entry's Effect names the passages left unrevised (Specification/appendices/changes.tex:1311-1316); the two test citations are mapped from the text they were written against, not from the base as the brief words it (ProjectFortress/tests/XXXFlatStringSplitRungL.fss:11)
historical: Specification/basic/traits.tex, Specification/appendices/changes.tex (the first line the rung edits, Specification/basic/traits.tex:235)

## The answers this rung follows

Q1 (whether the batch runs alone or in batch N's first run) does not change X's work. X lands only if Y lands (its manifest entry's `landsOnlyWith`).

## What I inherited

Nothing: `wip/rung-spec-comprises` had no commit beyond the base `715816bdd`, the worktree no edit and `tmp/` no log. Commits of this rung: `36012a2bb` (the list, before any edit, and the base build), `8e75787bc` (the specification, the edited build, a first re-anchoring), `8b2feaaa1` (the re-anchoring redone, the decision record, the stale-citation scan), `87e147120` and `a30516fa3` (record.md, the points for Pavol, the probes of the passages left). The harness refused the write of this report; the gather writes it from the rung's structured result. Nothing on the branch has been through a skeptic.

## What changed

- **The traits chapter** (`Specification/basic/traits.tex`, trait declarations). The draft note's first sentence (`:236-240` at the base, the Working Draft's `Specification-1.0-frozen/basic/traits.tex:231-235`) is replaced by rendered normative text (`:235-252`): "If a trait declaration of T includes a comprises clause then every type listed in its comprises clause extends T, and every value of type T is a value of one of the listed types. A listed type may be an instantiation of a parameterized trait, provided that every static variable that occurs in its static arguments is a static parameter of T. A trait or object that explicitly extends T must be a subtype of a listed type, unless it is a trait with a comprises clause of its own each of whose listed types meets this requirement, or a trait with static parameters such that at least one trait or object extends it and every trait or object that extends it is a subtype of a listed type. If T has static parameters, these statements hold of each instantiation of T, with the static parameters of T in the listed types replaced by the corresponding static arguments." A `\revision{revival-comprises}` callout follows (`:253-267`): what the Working Draft said, the reading of the later Types chapter and of Welterweight Fortress, why a trait with a static parameter `T` lacks can be listed only at particular arguments and when it may stand unlisted, and that this answers the third question of Victor's note at `:166-170`. (At the gather, on the skeptic's corrections 1 and 4, "static parameter" in the proviso became "static variable", and the callout and the entry name the note's third question.) The note keeps its second sentence, on `...`, word for word (`:268-274`). The `Molecule` example is unchanged (`:292-325`).
- **Appendix I**: I.1.20, "The traits that extend a closed trait" (`Specification/appendices/changes.tex:1246-1338`), after rung U's two entries and before "Passages not yet revised". Its items are Affected sections, Change, Rationale (the Types chapter, Welterweight with its authors and title, the library's `AnyIntegral` and the team's comment at `Library/FortressLibrary.fsi:434`, the decision record), Effect, Original text (the frozen note, `:230-241`, quoted whole) and Route C. The Effect says that the compiled checker accepts `AnyIntegral` as written; that no example changes; that the checker enforces the new case over the declarations it sees, a trait or object in another component being "row 487", Y's row (provisional when written; the gather kept the number); that the interpreter does not check clauses; and that the passages that read a clause at the level of types are not revised. (At the gather, after the check of the text against Y's landed code, the Effect also says that the checker compares the declarations it sees by their names, rows 489 and 490.)
- **Two test messages**: `ProjectFortress/tests/XXXFlatStringSplitRungL.fss:11` (`traits.tex:525-531` to `:585-591`) and `ProjectFortress/compiler_tests/XXXTupleVarFieldCompiledRungC.fss:21-22` (`:446-448` to `:506-508`), no assertion changed (section "The re-anchoring").
- **This directory**: `decision-record.md` (the reasons, eleven decisions, the gather's checks), `record.md`, `probes/`.

`git diff --stat 715816bdd..HEAD -- . ':!explorations'` lists `Specification/basic/traits.tex`, `Specification/appendices/changes.tex` and the two tests, and nothing else. `Specification-1.0-frozen/` and `Specification/fortress.pdf` are not touched; no source, library or test assertion changes.

## Where this belongs (rule 1)

The fix belongs in the specification, and only in its trait chapter's passage and Appendix I. The map's row for `comprises` (`explorations/coordinator/map/spec-to-implementation.md:194`) puts the language rule in `basic/traits.tex` and its enforcement in `TypeHierarchyChecker.scala` (Y's); walk leaves the rule unchecked. The map's row for the specification (`explorations/coordinator/map/README.md:130`) says each change is a `\revision` callout plus an Appendix I entry quoting the original, guarded only by the build. The decision names the place, "an S1 callout in `Specification/basic/traits.tex` in place of the draft note at `:234-246`" (POSITIONS 2026-09-28, `AnyIntegral`'s `comprises` clause).

## Precedent search (rule 2)

- The form: the S1 form (POSITIONS 2026-09-26, S1), as rung S built it (`explorations/compile-ladder/rung-spec-route-a/decision-record.md` section 3.9) and rungs T and U followed it. The closest model is in the same section: a revival box answering the team's draft notes on hidden type variables, placed after the notes (`Specification/basic/traits.tex:181-185`), with its entry "Where-clause variables in extends clauses" (`Specification/appendices/changes.tex:119-146`). Here the note's first sentence is itself the rule being changed, so it is replaced rather than kept, and the box follows the new text.
- A change that does not follow from route A: rung A's and rung U's entries say so in their Rationale and name their record there (`changes.tex:1028-1069`, `:1086-1103`); this entry does the same. The appendix's introduction (`:48-53`) still says every change follows from route A; rung U reported it (its L10) and this rung may not edit it.
- The re-anchoring: rung U's `reanchor.py`, copied, with its chapters replaced and one change (decision 11). The precedent repaired a defect: its judge's finding 1 (`explorations/compile-ladder/climb-batch-6/JUDGE-review.md:21-33`) found that T's commit moved 177 citations nobody re-anchored. So the same defect was counted elsewhere: `probes/reanchor/stale-scan.py` finds 9 of 527 citations of `Specification/` chapters in the three test corpora moved since they were written, all by rung S's `3924e7ec3`. Two are in files this rung owns and 7 are in 5 files it does not (section "For the gather").
- The wording: the Types chapter's terms ("determined by", "corresponding instantiations", `types.tick:277-283`, `:384-390`) rendered in the specification's own ("static parameters", "static arguments", "explicitly extends", `traits.tex:172-173`); the model callout at `:314-324` for how a callout names the Types chapter ("The team's later Types chapter (Luchangco, 2012)").

## What the specification settles, and the passages that settle it

- The standard is `Specification/`. Where the later Types chapter covers a topic, it is cited beside it as the designers' later word (POSITIONS 2026-09-26, the lineage note), and the type group's later word weighs more (POSITIONS 2026-09-23).
- The Types chapter covers this topic. A `comprises` clause "specifies a set of types and generic types determined by the generic type of the declaration. An instantiation of the generic type defined by such a declaration is covered by the union of the types in this set and the corresponding instantiations of the generic type in this set" (`Documentation/Specification/Prose/Language/types.tick:384-390`). In the source, "generic type" in the last line is singular; the judgement's quotation has "generic types". G determines G' "if every parameter of G' is a parameter of G" (`:277-279`).
- Welterweight reads the clause the same way: "the comprises clause, if present, indicates that no value can belong to the trait unless it also belongs to one of the comprised types" (`Papers/Welterweight/grammar.tick:21-22`). Its rule D-Trait asks each listed type to be a subtype of the trait at its own parameters (`Papers/Welterweight/fig-wellformeddecls.tick:53`) and asks nothing of the traits that extend the trait (`:38-62`).
- The note replaced (`Specification/basic/traits.tex:235-246` at the base) is a `\note`, which a release build renders as nothing (`Specification/fortress/fortress.tex:35-36`); the committed PDF is a draft build and printed it. The rendered sentence it sat beside, "A trait reference listed in the comprises clause is a declared trait identifier" (`:163-165`), stays. Victor's question below that sentence, whether it includes "instantiations of parametric traits" (`:166-170`), is answered by the new text: yes, when the static arguments mention only `T`'s parameters. Whether a bare type variable may be listed is not addressed, as the decision leaves it (row 407 rests its home on `:163-170`).
- The rule the text states is Y's: `explorations/reviews/anyintegral-comprises-ways/shadow-thc.py:45-64` with its switch removed. Y's code is not in this tree; decision record section 6 lists eleven statements for the gather to check against it.

## The list

`probes/list.txt` was written and committed before any edit (`36012a2bb`). One citation in it was corrected afterwards: the judgement's lines, `:98-107` to `:100-109`. It comes from `probes/list/grep-comprises.txt`: 104 hits in the base's tracked `.tex` files outside `library/apis/`, each read with ten lines either side. It holds the brief's starting list and adds three finds (P3, P4 and the grammars, L6).
- **Revised (R1)**: `traits.tex:234-246`, the note.
- **Left, settled by the decision or by R1 (L1 to L8)**:
  - the rendered sentence and Victor's note (`traits.tex:156-170`);
  - the `Molecule` example (`:264-297`), kept by the decision; `ExclusiveMolecule` is still refused, having no static parameters;
  - the type of `self` in a closed trait (`Specification/basic/expressions/var-ref.tex:63-70`), which follows from R1's coverage sentence;
  - the ellipsis rule in APIs (`Specification/basic/components/source-code.tex:372-392`), row 354's, not this rung's;
  - the grammars (`Specification/basic/components/apis.tex:46-60`, `Specification/appendices/grammars/concrete-syntax.tex:469-493`), whose `Id` alternative is where a naked type variable parses, not this rung's;
  - the clauses the library chapters declare (`Exception`, `Maybe[\T\]` with `Nothing[\T\]` and `Just[\T\]`, `Comparison`, the `{ ... }` of the boolean and binary chapters), each consistent with R1;
  - the revival's own `Maybe` entry quoting the Working Draft.
- **Left and reported, not chosen (P1 to P4)**: the intersection example (`Specification/basic/types-vals-vars.tex:583-604`), the Meet Rule's example (`Specification/advanced/overloading.tex:275-307`), abstract function declarations (`Specification/basic/functions.tex:370-415`) and a team note (`Specification/basic/components/source-code.tex:428-434`). All four read a clause at the level of types. Under R1 a trait with static parameters may sit unlisted under two closed traits (`probes/between/BetweenTwoClosed.fss`), or between a closed trait and its listed types, where "every immediate subtype" and "every listed type" differ. Neither the decision nor Y's section settles their new text (the batch record's stop); decision record section 4 gives the candidates; row 491 (provisional 488).
- **Outside the criterion (N1 to N6)**: the grammar lines, the definition of "immediately extends" (no longer used by the note), `Any`'s immediate subtypes, the future-work item on the coverage check (`Specification/appendices/future.tex:269-285`), the calculus that omits clauses, and the English verb.

## The recorded failure and the recorded pass

No test can go red for a prose edit.
- **The failure** this rung records is the base's text. The base build (`probes/build/base-tex.txt:16398`, "Output written on fortress.pdf (626 pages, 2095561 bytes)") prints the note on page 98 (`probes/build/base-vs-edit-pdftotext-diff.txt:20`): "< If a trait declaration of T includes a comprises clause then the traits listed in its comprises clause are exactly". That is the sentence that refuses `AnyIntegral`'s clause once Y accepts it.
- **The pass** is the edited build (`probes/build/edit-tex.txt:11562`, "Output written on fortress.pdf (627 pages, 2102241 bytes)"). Its page 98 prints the new text and its callout (`base-vs-edit-pdftotext-diff.txt:2-18`), and its pages 600-601 print I.1.20 (`:59-106`).
- **Warnings**: both builds' last LaTeX pass has the same warnings, none an undefined reference. The base build's text equals the committed PDF's (`probes/build/committed-vs-base-pdftotext-diff.txt`, empty).
- **The diff**: `probes/build/diff-hunks.txt` gives each of the 13 hunks its cause: the passage and callout, the note's re-flowed second sentence, the entry, the renumbering of "Passages not yet revised" and "Route C" to I.1.21 and I.1.22 in eight cross-references and two headings, and one pdftotext reordering of a math index on page 600.
- **Machine**, for both builds: nproc 4, Intel Xeon Processor @ 2.10GHz, 2100.000 MHz, load at start 2.73 1.76 1.00 (base) and 2.46 2.26 1.58 (edit), OpenJDK 25.0.4, `FORTRESS_THREADS=1`; `genSource` 47 and 50 s, `tex` 41 and 41 s.
- The build script (`probes/build/specbuild.sh`) sets its environment itself and does not source `env.sh`, whose `rm -rf /tmp/fortress*rats` would reach the other worktree's Rats! directories.

## Differentials

All on the base's checker and interpreter (this tree has no Java or Scala edit), after the five-component library cache rebuild: AnyType 14 s, CompilerBuiltin 60 s, CompilerLibrary 25 s, CompilerAlgebra 2 s, CompilerSystem 2 s, on the same machine, load 1.32 2.15 2.32 at start.
- `probes/between/MeetExample.fss` is the Meet Rule's own example (`Specification/advanced/overloading.tex:283-307`), with an object below `V` and a call (`probes/between/MeetExample.txt`).
  - Walk refuses it at load: "first parameters t:[T] and s:[S] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present".
  - The compiled checker refuses it: "Invalid overloading of f in component MeetExample: S->ZZ32 ... and T->ZZ32".
  - Both paths agree, and both diverge from the specification, which calls the example valid: row 492 (provisional 489).
- `probes/between/BetweenTwoClosed.fss` is the same program with `trait G[\X\] extends {S, T}` and `object H extends {G[\ZZ32\], V}` (`probes/between/BetweenTwoClosed.txt`).
  - Walk refuses `f` as above.
  - The compiled checker refuses `G` twice: "S has a comprises clause but its immediate subtype G is not eligible to extend it", and the same for `T`.
  - After Y, by reading, `G` passes the hierarchy check; the gather can re-run the probe on the merged tree.
- `ProjectFortress/tests/XXXFlatStringSplitRungL.fss` under walk, the base's copy and this tree's, gives the same failure before the assertion: "RHS expression type Nothing[\Generator[\(ZZ32,String)\]\] is not assignable to LHS type Generator[\String\]" (`probes/reanchor/tests-walk.txt`). The expected failure holds.

## The re-anchoring

Every citation of a line of `traits.tex` or `changes.tex` in the messages and comments of `ProjectFortress/tests/`, `compiler_tests/` and `library_tests/` is in one of three files (`probes/reanchor/reanchor.txt`).
- `RangeZZ32RungJ.fss:95-96` cites `traits.tex:223-233`. It was written on the base's text, above the edit, and is unmoved.
- `XXXFlatStringSplitRungL.fss:11` cites `traits.tex:525-531`, and `XXXTupleVarFieldCompiledRungC.fss:21-22` cites `:446-448`. Both were written against the 2012 text (`763ba87bc`, 2026-09-23; `b628871a2`, 2026-09-26 06:00 UTC), before rung S's `3924e7ec3` (2026-09-26 16:14 UTC) inserted 32 lines above them, and neither was re-anchored then.
  - On the base they therefore point at the functional-method examples and the sentence on the `getter` modifier, not at the override rule and the setter's single argument that their messages and rows 356 and 397 describe.
  - The brief says to map from the base. That would move the wrong text along, to `:553-559` and `:474-476`, which is what this rung's `8e75787bc` did.
  - Instead they are mapped from the text they were written against, to `:585-591` and `:506-508`, and the text there equals the text they cited (`probes/reanchor/stale-citations.txt`). This is a decision (decision record, decision 11), listed for Pavol's review.
- `probes/reanchor/assertion-check.txt`: each changed line differs from the base's only in a citation number. Neither test's `.test` pins the message.

## Defects measured, and their homes

- **Both paths refuse the Meet Rule's own `comprises` example** (`MeetExample.txt`). The specification settles it: the example is valid (`overloading.tex:258-262`, `:275-307`). So its home is 2: an `XXX` walk test in `ProjectFortress/tests/` and an `XXX` compiler test in `ProjectFortress/compiler_tests/`.
  - The tests are owed and not written. This rung's files are the specification's passage, its entry and two tests' messages (the batch record, section 3, X, "Files it may touch"), and it edits no Java or Scala, which a deliberate local fix to show the first `XXX` red would need.
  - The row 492 (provisional 489) carries the probe both ways and names the owed tests and where the fix lies, as row 407 names its owed test. Written at the repair after the merged-diff review: `ProjectFortress/tests/XXXComprisesMeetWalk.fss` and `ProjectFortress/compiler_tests/XXXComprisesMeetCompiled.test` (`explorations/compile-ladder/climb-batch-7C/JUDGE-review.md` section 2).
- **The passages that read a clause at the level of types** (P1 to P4): home 3, the probe `BetweenTwoClosed.fss` with its capture and the row 491 (provisional 488). Neither the decision nor Y's section settles their new text; the record says so, and the rung does not choose (the stop).
- **Stale citations in test messages**: not a defect of the language or of either path. The two in files this rung owns are repaired by the re-anchoring; the other 7, in 5 files of chapters rung S edited, are reported for the gather.

## Stops

- **Met, reported, not chosen**: "A passage of the list whose new text neither the decision nor Y's section settles: the rung reports it and does not choose", for P1 to P4 (`Specification/basic/types-vals-vars.tex:602-604`, `Specification/advanced/overloading.tex:303-307`, `Specification/basic/functions.tex:413-415`, `Specification/basic/components/source-code.tex:429`). It is reversible, and POSITIONS 2026-09-27, the stops, lifts it for landing.
- **Lifted by the decision itself**: the standing stop on the specification's normative text. X replaces the draft note's first sentence with rendered normative text in the later Types chapter's reading (POSITIONS 2026-09-28, `AnyIntegral`'s `comprises` clause).
- **Not met**:
  - no edit under `Specification-1.0-frozen/`;
  - the normative text allows no type variable in a clause;
  - it states no rule about objects in other units; the checker's limit is in the entry's Effect, as the brief asks;
  - the ellipsis sentence and the `Molecule` example are left as they were;
  - no assertion changes;
  - no file Y edits.
- **Close to the line, and flagged**:
  - Decision 1 (every listed type "extends" T, the note's "explicitly" dropped) states a requirement the judgement's section 3 does not list. It is the note's own first sentence, relaxed to what the checker has enforced since 2009 (`TypeHierarchyChecker.scala:220-240`) and what Welterweight's D-Trait states (`fig-wellformeddecls.tick:53`).
  - Decision 2 (the third case for every trait with static parameters) follows the decision's "a generic child" and Y's code over the judgement's narrower words.

## For the gather

- Check the text against Y's landed code and tests: decision record section 6, eleven statements. Write Y's final row number into `Specification/appendices/changes.tex:1309` ("row~487").
- Re-run `probes/between/BetweenTwoClosed.fss` on the merged tree: `G` should pass the hierarchy check under Y's rule, and the overloading refusal of row 492 then follows.
- Rebuild the PDF on the merged tree; this rung's build was on its own tree (627 pages).
- The same defect elsewhere: 7 citations in 5 tests of chapters rung S edited are stale since `3924e7ec3` (`probes/reanchor/stale-scan.txt`). Not this rung's files:
  - `compiler_tests/XXXFortToStringRungS.fss:13`: `basic-lib/objects.tex:117-122`, `:121-126` on the base;
  - `compiler_tests/XXXUnionMethodRungS.fss:13-14`: `basic/types-vals-vars.tex:589`, `:623` on the base;
  - `library_tests/MaybeRungM.fss:13`: `basic/exceptions.tex:122`, a line S rewrote;
  - `tests/XXXTupleSeparatorRungS.fss:10`: `basic-lib/objects.tex:161-188`, `:197-224` on the base;
  - `tests/XXXTupleSevenRungS.fss:10`: `basic-lib/objects.tex:144-158`, `:175-189` on the base; rung S rewrote that passage inside (three lines differ: `Tuple`'s sentence on its operators and its declaration, twice), so the citation is to revised text, and a renumbering alone would cite text that no longer says what the message says.
- The record's ledger notes name every row whose `traits.tex` citation this rung moved or revised, with the numbering each was written in.

## For Pavol

- The revised page: `probes/build/base-vs-edit-pdftotext-diff.txt:1-26` (page 98).
- The Appendix I entry: `:59-106` of the same file (pages 600-601).
- The list, with what was left and why: `probes/list.txt`.

The points this rung does not settle (`probes/for-pavol.txt`):
1. P1 to P4, the passages that read a clause at the level of types, left and reported (row 491).
2. Decisions 1, 2 and 8 on the new text's wording, and decision 11 on the re-anchoring.
3. Row 492's owed `XXX` tests.

## What is not done

- The `XXX` tests of row 492 (outside this rung's files). Written at the repair after the merged-diff review (`explorations/compile-ladder/climb-batch-7C/REPAIR-review.md`).
- The 7 stale citations of other chapters (not this rung's files).
- Nothing of Y's is checked here: its code is not in this tree, so the text is checked against the shadow and Y's section, and the gather checks it against Y's landed code.
