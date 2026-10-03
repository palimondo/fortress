# Climb batch 9: the judge's ruling on the merged-diff review

Decision: **repair**, of specification text only. One sentence of Appendix I is replaced. No source, library, checker, interpreter or test file changes, so the gate does not run again. Specification/ is not a path the gate reads (`explorations/coordinator/climb-batch-workflow.js:1937-1938`, `repairRerun` at `:2120-2147`; POSITIONS, "A tests-only repair does not rerun the gate."). The first gate's tables stand. The review's routed finding (review-routed.1, D5's reach) goes to the next batch as the review routed it. I give it no ruling.

## The finding, upheld

`Specification/appendices/changes.tex:1321`, the last sentence of the Effect item (`:1312-1321`) of the entry "The traits that extend a closed trait" (`\seclabel{revival-comprises}`, `:1258`), says: "The interpreter does not check \KWD{comprises} clauses." The merged tree makes this false:

- `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:227` calls `BuildEnvironments.checkComprisesClauses(components, comp)` at load, after `initTypes` and before the functional methods are scanned.
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1052-1067` documents and enters the check. `:1150-1179` collects every top-level trait and object declaration of every loaded component. `:1181-1197` checks each explicit extension of a trait whose clause is declared in the main unit (`h.unit != main` skips the others, `:1186`) and refuses it with "Invalid comprises clause: ...". `:1205-1223` (`ineligible`) admits a subtype of a listed type, a trait with a clause of its own that is covered, and a trait with static parameters that something extends and whose every extender is below a listed type. These are the three forms of `Specification/basic/traits.tex`, section "Trait Declarations" (`:235-252`). `:1243-1252` (`listedBy`) skips a clause with an ellipsis.
- `ProjectFortress/tests/ComprisesUnlistedExtender.fss` passes only on that refusal: its `.test` reads `load_exception_contains=Invalid comprises clause: S has a comprises clause but its immediate subtype Z is not eligible to extend it`. Ledger row 551's status reads "the main component's clauses FIXED".

The specification settles the repair. A sentence that states what an implementation does must be true of it: "so that there is no open discrepancy between the spec and our implementation that would be confusing to people" (POSITIONS, "Every change to the specification is recorded with its reason."). The precedent for the form is `f052e82f5`. That was climb batch 7C's review repair of a sentence in this same Effect item, edited in place with no S1 record of the old wording. An Effect item states what the implementations do, not what the language is, and an implementation's progress changes it.

It is not **land**: the settlement edits `Specification/appendices/changes.tex`, and the land rule admits only tests and records.

## The rest of the specification, read against the merged code

This sentence is the only one the merged code makes false. I read these:

- `Specification/basic/traits.tex:235-272`. The comprises paragraph and its callout make no claim about either implementation.
- `Specification/advanced/overloading.tex:708-710`, `Specification/appendices/overloading-function.tex:28-32` and `changes.tex:2506-2510`. They speak of the compiled checker across components only, and they still hold.
- `Specification/advanced/overloading.tex:617-620` and `changes.tex:2064` speak of the interpreter refusing two declarations that both have static parameters. K's change to the overlap reading covers only a generic declaration beside a plain one (`OverloadedFunction.java:736-778`, `genericOverlapCovered`), so those sentences still hold.
- `Specification/basic/overloading.tex:340-344`, the dispatch callout. It still holds for one argument whose dynamic type bounds the parameter from below, as the gather read it (`climb-batch-9/RECORD.md:131`).
- `changes.tex:105` is about instantiation exclusion, which no rung touched.
- The names rungs R and S changed in the apis (`leftOrRight`, `narrowToRange`, `CatString`, `splitWithOffsets`, `SimpleMappedSeqIndexed`, Just's `SQCAP`) appear in no prose chapter. A grep of `Specification/` outside `library/apis/` hits only the operator table and the algebra's commented declarations. Part IV is rendered from the `.fsi` files when the commit stage rebuilds the specification.

## Who was right

- **The review is right on the finding**, on its evidence, and in saying the repair is specification text only. Its proposed sentence is inexact in two places, and the instructions below correct both:
  - "as the compiled type checker reads them" is not true as written. Walk resolves each name in its declaration's environment (`BuildEnvironments.java:1059-1061`, the doc comment). The compiled checker compares by simple name (`changes.tex:1320`, rows 489 and 490). The compiled checker also refuses a listed type that does not extend each instantiation, which walk does not check (row 598's compiled refusal). The phrase is dropped. The sentence names the requirement of `\secref{trait-decls}`, which is what the check implements.
  - Its row list (551, 595, 596, 597, 598) leaves out rows 22 and 487. Those are the rows whose walk-side expected failures hold the library's clauses: `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.test` (row 22, `Number`) and `XXXComprisesGenericChildAcrossComponents.test` (row 487, `AnyIntegral` through `Integral`). Rows 595 and 596 only say what reading the library's clauses would refuse today.
- **The gather** compared only rung W's two boxes and W's Appendix I entry against K's load-check code (`climb-batch-9/RECORD.md:131`). That is the gap the review names.
- **Rung K** could not edit the specification (`climb-batch-workflow.js:241`, `:249`). But its code made a sentence of the specification false, and that was owed to its report as an item for the gather. `rung-walk-load-check/REPORT.md` cites only `traits.tex` (`:6`, `:153`, `:291`), and so does `SKEPTIC.md` (`:46`, `:108`). Neither read Appendix I's Effect on the clause the rung was enforcing. This is a defect of the records, not of the code.
- The review's eight corrections in `ecd8fa04a`, and its stops (each lifted by POSITIONS, "Reversible stops do not hold a batch."), are not escalated to me, and I give them no ruling.

## What the specification settles, and what is decided

The specification settles the content. The requirement is in `traits.tex`, section "Trait Declarations". The rule that implementation-status text must be true is in POSITIONS, "Every change to the specification is recorded with its reason.". I took no decision under silence. The wording below is a choice of phrasing only. The repair worker may rephrase it, but only where a cited line contradicts it, and it records any rephrasing.

The repair changes no normative text. The Effect item describes the implementations, so none of the batch's reserved stops applies to it.

## Instructions for the repair worker

1. In `Specification/appendices/changes.tex`, replace line 1321, `The interpreter does not check \KWD{comprises} clauses.`, the last line of the Effect item that begins at `:1312`, with these lines, wrapped as the item's other lines are wrapped:

   ```
   The interpreter checks at load the traits and objects that explicitly extend a
   trait with a \KWD{comprises} clause declared in the component it executes, and
   refuses one that is neither a subtype of a listed type nor another of the
   extenders that \secref{trait-decls} allows.
   It does not yet check a clause declared in another component, of the program
   or of \library\ (rows~22, 487, 551, 595 and~596), an object expression that
   extends such a trait (row~597), or that each listed type extends \VAR{T}
   (row~598).
   ```

   `\library` expands to "the Fortress standard libraries" (`Specification/latex-common/macros/macros.tex:78`). Row 487 is already introduced earlier in the item as "of the revival's gap ledger" (`:1320`), so these citations use the short form, as `:1320` does.
2. Check each clause of the new text by reading, with no build and no run:
   - "explicitly extend", "declared in the component it executes" and "refuses": `BuildEnvironments.java:1181-1197` and `Driver.java:227`.
   - The eligible forms: `:1205-1223` against `traits.tex:241-248`.
   - "another component": `:1186`, and row 551's notes (`SkNonMain551`, `SkCrossUnlisted`).
   - The library's clauses: the `.test` keys of `XXXComprisesLibraryTraitUnlistedExtender` and `XXXComprisesGenericChildAcrossComponents`.
   - An object expression: row 597 and `XXXComprisesObjectExpressionUnlisted.test`; the collection at `:1156-1157` reads only `TraitDecl` and `ObjectDecl`.
   - The listed types: row 598 and `XXXComprisesListedTypeExtendsEachInstance.test`.

   If a clause is wrong against a line, correct the text to the line and record it in step 5.
3. Do not rebuild the specification and do not commit `Specification/fortress.pdf`. The commit stage rebuilds it once on the landed tree, as the batch intro says. Run no test and no suite: no code changes. Your result's `testRuns` is empty.
4. In `explorations/fortress-gap-ledger.md`, append one sentence to the notes of row 551 (line 562), before its closing `|`. Change no other field and no other row: "Since climb batch 9's review repair, the Effect of Appendix I's entry "The traits that extend a closed trait" (`Specification/appendices/changes.tex`, `\seclabel{revival-comprises}`) states this check's scope with rows 22, 487, 595, 596, 597 and 598; a rung that widens the scope revises that sentence in the commit of its edit." Use no `<short hash>` placeholder.
5. Write `explorations/compile-ladder/climb-batch-9/REPAIR-review.md`, a short record:
   - the sentence before and after, with `changes.tex` file:line;
   - the lines of step 2 each clause was checked against;
   - the paths changed;
   - that no test ran because no code changed, and that the gate's tables stand under `repairRerun` because `Specification/` and `explorations/` are paths the gate does not read;
   - any deviation from steps 1 to 4, with the line that settles it.
6. Commit locally on `main`, one commit, and do not push. Change these paths and no others: `Specification/appendices/changes.tex`, `explorations/fortress-gap-ledger.md`, `explorations/compile-ladder/climb-batch-9/REPAIR-review.md`. Message: "Climb batch 9: the review's repair, Appendix I's comprises entry says what walk's load check reads". Add one body paragraph saying what the sentence now states and why, citing `Driver.java:227`. Then the line `historical: Specification/appendices/changes.tex`. End with the two footer lines:

   ```
   Co-Authored-By: Claude <noreply@anthropic.com>
   Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB
   ```

   Another agent may be committing in this tree: on an `index.lock` error, wait a few seconds and retry once. List the three paths in `pathsChanged`.
