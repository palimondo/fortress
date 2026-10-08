# Climb batch 9: the repair after the merged-diff review

Written 2026-10-03 on `main` above `08865d40a`, the judge's ruling (`explorations/compile-ladder/climb-batch-9/JUDGE-review.md`). The repair carries out the ruling's six steps in order. It changes specification text and records only. It measured no new defect: the finding is one sentence of Appendix I that rung K's load check made false.

## 1. The sentence, before and after

`Specification/appendices/changes.tex:1321`, the last line of the Effect item (`:1312`) of the entry "The traits that extend a closed trait" (`\seclabel{revival-comprises}`, `:1258`), read before the repair:

> The interpreter does not check \KWD{comprises} clauses.

It is replaced by `changes.tex:1321-1328`, in the ruling's words and wrapped as the item's other lines are:

> The interpreter checks at load the traits and objects that explicitly extend a
> trait with a \KWD{comprises} clause declared in the component it executes, and
> refuses one that is neither a subtype of a listed type nor another of the
> extenders that \secref{trait-decls} allows.
> It does not yet check a clause declared in another component, of the program
> or of \library\ (rows~22, 487, 551, 595 and~596), an object expression that
> extends such a trait (row~597), or that each listed type extends \VAR{T}
> (row~598).

`\library` expands to "the Fortress standard libraries" (`Specification/latex-common/macros/macros.tex:78`), as at `changes.tex:1299` and `:1313`. `\secref{trait-decls}` resolves to `Specification/basic/traits.tex:32`, the section the entry's "Affected sections" already names (`changes.tex:1261`). The rows are cited in the short form that `:1320` uses for rows 489 and 490, since `:1320` introduces row 487 as "of the revival's gap ledger".

## 2. Each clause, checked by reading

No build and no run. Each clause against the lines it rests on:

- "checks at load": `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:227` calls `BuildEnvironments.checkComprisesClauses(components, comp)` after `initTypes` (`:224-226`) and before the functional methods are scanned and the functions initialised (`:228-233`).
- "the component it executes": `comp` is the command-line component (`Driver.java:107`); `checkComprisesClauses` takes its index among the units as the main unit (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1064-1066`), and `check` skips every extension whose closed trait is not declared in it, `if (h == null || h.unit != main) continue;` (`:1186`).
- "the traits and objects": the collection reads the top-level declarations of every loaded component and keeps only `TraitDecl` and `ObjectDecl` (`:1152-1165`, the filter at `:1157`).
- "explicitly extend": `supertypesOf` reads the declaration's own `extends` clause (`:1278-1286`), and `check` walks exactly those entries (`:1184`).
- "refuses": `:1189-1195`, `error(x.decl, ...)` with "Invalid comprises clause: ... has a comprises clause but its immediate subtype ... is not eligible to extend it". `ProjectFortress/tests/ComprisesUnlistedExtender.test` names that refusal as its `load_exception_contains` key.
- "neither a subtype of a listed type nor another of the extenders that \secref{trait-decls} allows": `ineligible` (`:1205-1223`) admits a subtype of a listed type (`:1207`), a trait with a clause of its own each of whose listed types is covered in turn (`:1208`, `closedAndCovered` at `:1229-1240`), and a trait with static parameters that some trait or object extends, each extender below a listed type at its arguments (`:1209-1220`), and refuses all else (`:1222`). These are the three forms of `Specification/basic/traits.tex:241-248`. A clause written with an ellipsis is skipped (`listedBy`, `:1247`); a component cannot write one (`ProjectFortress/src/com/sun/fortress/parser/TraitObject.rats:90-94`, "Comprises clauses can include "..." only in APIs."), and the check reads no api's declarations (`:1155`), so no ellipsis clause of the main component exists for the sentence to misstate.
- "a clause declared in another component, of the program": `:1186`, and row 551's notes (`explorations/fortress-gap-ledger.md` row 551): `SkNonMain551`, the row's set in a component `SkLib551` of the program, prints 'f(S)' under walk; `SkCrossUnlisted`, the clause in the program's component `SkClosedLib` and `object Z extends S` in main, prints 'f(S)'.
- "or of \library\ (rows~22, 487, ..., 595 and~596)": the `.test` keys of `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.test` (row 22, the library's `Number`: 'Invalid comprises clause: Number has a comprises clause but its immediate subtype Value is not eligible to extend it') and `ProjectFortress/tests/XXXComprisesGenericChildAcrossComponents.test` (row 487, `AnyIntegral` through `Integral`: '... AnyIntegral has a comprises clause but its immediate subtype Integral is not eligible to extend it; MyIntegral extends it ...'), both expected failures today; rows 595 (`fortress-gap-ledger.md`, `Reflect`'s `Type`) and 596 (the team tests and demos that extend `Number` or `Exception`) record what reading the library's clauses would refuse.
- "an object expression that extends such a trait (row~597)": the collection at `:1156-1157` reads only top-level `TraitDecl` and `ObjectDecl`, never an object expression; row 597 (`fortress-gap-ledger.md`) and `ProjectFortress/tests/XXXComprisesObjectExpressionUnlisted.test` (`load_exception_contains=Invalid comprises clause`), an expected failure today.
- "or that each listed type extends \VAR{T} (row~598)": no line of the interpreter compares a listed type with the trait that lists it. A grep of the interpreter's sources for `comprises` finds the clause in five places only: recorded at `BuildEnvironments.java:897-900`, read for exclusion at `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:280-296`, read for overload coverage at `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:956-1001`, answered to a program by the reflection primitive at `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Reflect.java:262-268`, and the check above, which reads extenders only. Row 598 (`fortress-gap-ledger.md`) and `ProjectFortress/tests/XXXComprisesListedTypeExtendsEachInstance.test` (`load_exception_contains=Invalid comprises clause`, an expected failure today) gate the instantiation form; the sentence's wider wording holds as well, since nothing checks the plain form either.

Every clause holds against its lines, so the ruling's text went in unchanged.

## 3. The ledger

`explorations/fortress-gap-ledger.md`, row 551: one sentence appended to the notes, before the closing `|`, in the ruling's words: "Since climb batch 9's review repair, the Effect of Appendix I's entry "The traits that extend a closed trait" (`Specification/appendices/changes.tex`, `\seclabel{revival-comprises}`) states this check's scope with rows 22, 487, 595, 596, 597 and 598; a rung that widens the scope revises that sentence in the commit of its edit." No other field and no other row changed: `git diff --stat` counts one line changed in the file.

## 4. Tests, the specification's build and the gate

- No test ran and no suite ran, because no code and no test file changed. The repair's `testRuns` is empty.
- The specification was not rebuilt and `Specification/fortress.pdf` is not committed: the commit stage rebuilds it once on the landed tree (ruling, step 3).
- The gate's tables stand under `repairRerun` (`explorations/coordinator/climb-batch-workflow.js:2120-2147`). A path reruns the gate only if it is under `ProjectFortress/` or `Library/`, or is `build.xml`, and is not a test file (`:1935`, `:1937-1939`). `Specification/appendices/changes.tex` is none of these, and `explorations/` paths are dropped before the test (`:1935`).

## 5. Paths changed

- `Specification/appendices/changes.tex` (`:1321-1328`)
- `explorations/fortress-gap-ledger.md` (`:562`)
- `explorations/compile-ladder/climb-batch-9/REPAIR-review.md` (this file)

## 6. Deviations

None from steps 1 to 4. One addition to the checks of step 2, not a change of the text: the ellipsis skip at `BuildEnvironments.java:1247` was read against the parser's restriction (`TraitObject.rats:90-94`), so that the sentence's "refuses one that is neither ..." is not contradicted by a clause the check passes over; it is not, since a component cannot write that clause.
