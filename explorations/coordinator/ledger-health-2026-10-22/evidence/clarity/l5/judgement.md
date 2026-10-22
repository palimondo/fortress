<!-- Ledger clarity pass, chunk l5: the judge's verdict on each of the ten rewritten rows (665, 670, 682, 695, 697, 701, 713, 723, 726, 759) and on the chunk's closes, with the corrections made from the check's sources. -->

# Chunk l5: judgement

Tree: `HEAD` `8a210ee22`. `git diff --stat cdb84fba5 HEAD -- ProjectFortress Library Specification explorations/fortress-gap-ledger.md` is empty, so the check's reading holds, and each of the ten rows reads in the ledger as the assessment quoted it. `ledger.py check --rows final.rewrite`: "10 rows, 0 fail the template".

Result: 10 applied (7 as the check passed them, 3 with the check's corrections), 0 held. No close: `closes.txt` proposes none, so `final.closes` is empty.

| Row | Verdict | Reason |
|---|---|---|
| 665 | apply, corrected | The check's one failure: "no check reads the generic declaration" contradicts the next sentence, since `checkGenericOverrides` (`BuildEnvironments.java:895`) and `checkGenericFunctionalMethodMeets` read it (confirmed at `env/ComponentWrapper.java:186-187`). The check's wording, "no abstract-method check reads the generic declaration", ran the notes to 709 characters; written instead "the check reads no generic declaration", where "the check" is the sentence's own subject, the abstract-method check. Spot-checked: `Constructor.java:263`. Notes 693, line 1,134. |
| 670 | apply | The check passes it. |
| 682 | apply | The check passes it. |
| 695 | apply | The check passes it. Spot-checked: `compiler_tests/XXXSelfTypeReturnSelfRun.test` exists. |
| 697 | apply | The check passes it. Spot-checked: `OverloadedFunction.java:509` reads `distinct \|= unequal && (allObjInstance1 \|\| allObjInstance2);`; `tests/XXXReturnRuleObjectParamWalk.fss` exists. |
| 701 | apply, corrected | The check's two failures. (1) A trait's `where` is the header's clause, not the `comprises` clause's: "A `comprises` clause's `where` counts" became "A header `where` that only binds a size counts" (the check's "the size its `comprises` clause lists", shortened; the reproducer's trait that follows shows the `comprises`). (2) The object's `where` face and the function's contract face are by reading, not run: added "An object's `where` and a function's contract stop here by reading (`:4107`, `:2971`), not run." Confirmed: `CodeGen.java:4107` is `forObjectDeclPrePass`'s `getWhereClause().isNone()`, `:2971` is `forFnDecl`'s `getContract().isNone()`. To fit the 1,200-character row, five cuts that change no claim: the path `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` written `CodeGen.java` (the ledger's common short form), "(refusal `:2976`)" written "(`:2976`)" like the other two refusals, "a trait's and an object's" written "a trait's or object's", "`where` clause compiles" written "`where` compiles", and "so those guards are never reached" written "so those guards never fire". Line 1,199, notes 669. |
| 713 | apply, corrected | The check's one failure: "Walk refuses it at load, 'fails the Meet Rule'" states as present a message last measured at `5262a2412` (`compile-ladder/rung-walk-trait-method-bounds/SKEPTIC.md:76`, `SkM1`), before `14e91723f` changed walk's verdict for a generic declaration beside a plain one (`OverloadedFunction.java:794`, `domainsExcludeTogether` at `:936`). Both commits are in `HEAD`. Written: "Walk refused it at load at `5262a2412`, 'fails the Meet Rule'; not measured since `14e91723f`." The check's fuller wording, naming the skeptic's file and `domainsExcludeTogether`, ran the notes to 769 characters; the commit pins both, and the skeptic's file is in this judgement. To fit, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:762-774` written `TypeAnalyzer.scala:762-774` (one file of that name in `ProjectFortress/src`). Notes 685, line 1,166. |
| 723 | apply | The check passes it. Spot-checked: `GenericMethod.java:149` evaluates the parameters with `EvalType.paramsToParameters(env, params)`. |
| 726 | apply | The check passes it. Spot-checked: `Library/FlatString.fsi:16-21` declares each `\|\|` with `self` first. |
| 759 | apply | The check passes it. |

## Closes

None proposed, none applied. Row 665's `override` half is fixed (`efd6bb2f2`), but its abstract half stands (`Constructor.java:263`, `:431`), so the row is rewritten, not closed.

## The chunk's questions

`questions.md` has no investigate question. Its two side questions (row 723's trait face under walk since `5262a2412`; row 697's shortcut against the library's `distribute` since row 433's fix) concern notes that the new lines pin to the commit where each was measured. The check's offered run for row 713 (walk on its pair at `HEAD`) is the same kind: the new line says the message is not measured since `14e91723f`. None is queued.
