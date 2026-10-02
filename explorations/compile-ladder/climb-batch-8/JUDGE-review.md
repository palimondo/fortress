# Climb batch 8: the judge's ruling on the merged-diff review

Written 2026-10-02 on `main` at `b3c9e2dbf`. That commit holds the four composed commits (I `f3032eed8`, Q `9d2e4c856`, O `70d5486f9`, M `0ae526b31`) and the review's corrections. The review refused approval with one blocking finding, in the source hunks: rung Q's Appendix I Effect. This ruling reads:
- that finding;
- rung Q's `JUDGE.md` and `SKEPTIC.md`;
- the gather's point in `explorations/compile-ladder/climb-batch-8/RECORD.md:141`;
- the `PLAN.md` entry it went to (`explorations/coordinator/PLAN.md:449`);
- the specification's coercion chapter;
- the library declarations involved.

It builds nothing, runs no test and did not read `tmp/gate-batch-8/out/`. Every line number is at `b3c9e2dbf`.

**Decision: repair, text only.** The finding holds. The repair rewrites one sentence of `Specification/appendices/changes.tex` and adds one to it, and brings the two records that say the text stands up to date. Land is not open: the settlement changes a specification file, and the role gives land only to findings settled by tests and records. No code, library or test changes. No rung's approach is wrong, so there is nothing to drop. And this is no reserved fork: the specification settles what the checker does, and the one choice left, a library device, is already listed for Pavol.

## 1. The finding holds

**What the sentence says.** It is in the Effect of the entry "The type of an integer numeral" (`Specification/appendices/changes.tex:2535`, the sentence at `:2573-2579`): "A numeral beside a value of an integer type is converted to that type, whose own declaration of the operator is then the most specific (\secref{resolving-coercion})".

**What the section it cites says.** "For a given functional call, we first determine whether there exists a declaration that is applicable without coercion. If so, the most specific declaration is selected; if not, then coercions are explicitly added" (`Specification/basic/conversions-coercions.tex:475-479`, section "Coercion Resolution"). The rule for a tie that a numeral makes is in the inference chapter, and it too covers only "declarations that are applicable to the call only with coercion" (`Specification/basic/inference.tex:200-201`, section "A Numeral Whose Conversions Tie").

**What the merged library declares.**
- `IntLiteral` is an object under `Number` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:178`), listed in `Number`'s comprises clause (`Library/FortressLibrary.fsi:284-285`).
- Every integer type is under `Number` through `AnyIntegral` (`Library/FortressLibrary.fsi:438`).
- `Number` declares `opr =(self, other:Number)` (`Library/FortressLibrary.fsi:290`; body `Library/FortressLibrary.fss:366-375`).
- The library declares the top-level `opr =(a:Any, b:Any)` and `opr =/=(a:Any, b:Any)` (`Library/FortressLibrary.fsi:69`, `:71`; bodies `Library/FortressLibrary.fss:96`, `:98`).
- No integer type declares `=/=`. The only other `=/=` declarations are on `QQ` (`Library/FortressLibrary.fsi:411`) and `RR32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:71`).
- No top-level operator of the api other than these two takes `Any` or `Number` for both operands (`grep -n "^opr" Library/FortressLibrary.fsi`).

**What follows for `=`.** For `z = 0` with `z: ZZ32`, and for `0 = z`, `Number`'s `=` is applicable without coercion and is more specific than the top-level one. So the checker selects it and converts nothing, and `ZZ32`'s own `=(self, b:ZZ32)` (`Library/FortressLibrary.fsi:540`) is not considered. The same holds for every integer type, and for `ZZ`, which has no `=` of its own in the api.

**What follows for `=/=`.** For `z =/= 0` the top-level `=/=` is applicable without coercion, so nothing is converted there either. The review did not name this second case. It is the same defect.

**For the other operators the sentence holds.** No declaration of `<`, `<=`, `>`, `>=`, `CMP`, `MIN`, `MAX`, `MAXNUM`, `MINNUM` or the arithmetic operators applies to an integer value and a numeral without coercion. The power is different: each integer type's own `^(self, b: IntLiteral)` (for example `Library/FortressLibrary.fsi:574`) applies to the numeral as it is, without coercion. The rewritten sentence below covers that case too.

**What `=` then computes.** `Number`'s `=` reaches `exactValue(self) = exactValue(other)` (`Library/FortressLibrary.fss:373`). `exactValue` gained the numeral's arm in this batch (`Library/FortressLibrary.fss:386`), which converts the numeral with `QQ`'s `coerce(x: IntLiteral)`. The entry does not mention that arm anywhere, but it is the reason the arm exists (`explorations/reviews/numeral-switch-judgement.md`, section 4.4: "so that `Number`'s `=` never reaches `Ratio(0, 0)` for a numeral"). It is gated under walk by `ProjectFortress/tests/IntLiteralValue.fss:35`, `x = widen(0)`.

**The rule the sentence breaks.** "Every change to the specification is recorded with its reason": "so that there is no open discrepancy between the spec and our implementation that would be confusing to people" (`explorations/coordinator/POSITIONS.md:85`, with "The S1 form" at `:86`). An Effect states what the implementations do; climb batch 7C's judge ruled the same way on an Effect sentence (`explorations/compile-ladder/climb-batch-7C/JUDGE-review.md`, section 1, "Why the gather must fix it"). The normative text rung Q added does not share the overclaim:
- `Specification/basic/expressions/literals.tex:149-165` says only that a numeral has the type `IntLiteral` and that each type coerces from it.
- `Specification/basic/conversions-coercions.tex:84-88` says the same of `RR64`.
So the Appendix I sentence is the only site to correct.

## 2. Who was right

- **Rung Q's worker** was wrong in the Effect sentence (`Specification/appendices/changes.tex:2573-2574`). Its `REPORT.md:70` ("a numeral beside a `ZZ32` converts for every candidate") is true of the comparisons it is about, and stands.
- **Rung Q's first skeptic** was right. Its model `SkqResolve` showed the checker taking the declaration that applies without coercion (`explorations/compile-ladder/rung-numeral-library/SKEPTIC.md:242`, and `:326` under "For Pavol").
- **Rung Q's judge** was right that this follows the specification's order and is not a library defect (`explorations/compile-ladder/rung-numeral-library/JUDGE.md:111`, `:265`). Its repair instructions did not carry that consequence through to the Effect text the same rung wrote.
- **The gather** was right to see the conflict and wrong to leave the text as written (`explorations/compile-ladder/climb-batch-8/RECORD.md:141`). Its reason, that "no gated program can observe the checker over the one library before the switch-over", decides whether a test is owed. It does not decide whether an Effect may state what the checker does not do.
- **The review** was right on the defect, on the rule and on the smallest repair. It missed the `=/=` case. It was right that the other repair, each integer type's own `=(self, b: IntLiteral)`, is Pavol's choice; it stays in `PLAN.md:449`.

## 3. Homes

The defect is a false sentence in the specification's change record, not a behaviour. The behaviour it misstated, `Number`'s `=` chosen for an integer value beside a numeral, is the specification's own rule (section 1). So there is nothing to repair in code, and no assertion or expected failure is owed. The one behaviour the corrected sentence adds is `exactValue`'s numeral arm, and `ProjectFortress/tests/IntLiteralValue.fss:35` already gates it. No ledger row is owed.

## 4. The repair

The new text uses only macros the entry or its chapter already uses:
- `\EXP{=}`, as at `Specification/basic/variables.tex:86`;
- `\EXP{\neq}` for `=/=`, as at `Specification/basic-lib/Fortress.NegatedOperators.tex:46`;
- `\EXP{<}`, `\EXP{\leq}`, `\EXP{>}` and `\EXP{\geq}`;
- `\TYP`, `\VAR`, `\OPR`, `\secref` and `\library`.

The commit stage rebuilds the specification once on the landed tree (`explorations/coordinator/climb-batch-workflow.js:1870`), so the repair does not build it.

The comparisons are named explicitly because every integer type now states all four of `<`, `<=`, `>` and `>=`: `Library/FortressLibrary.fsi:489-492` (`NN64`), `:541-544` (`ZZ32`), `:598-601` (`ZZ64`) and `:647-650` (`ZZ`), and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:135-138` (`NN32`). Equality is `=`, which the new sentence covers separately.

**The text.** Lines `:2573-2579` of `Specification/appendices/changes.tex`, from "A numeral beside a value of an integer type is converted to that type, whose" through "\EXP{\mathbb{Q}} and \EXP{\mathbb{R}64}.", become:

```
A numeral beside a value of an integer type is converted to that type where no
declaration of the operator is applicable to the two without coercion, and that
type's own declaration of the operator is then the most specific
(\secref{resolving-coercion}); \library\ state on each integer type the
comparisons \EXP{<}, \EXP{\leq}, \EXP{>} and \EXP{\geq}, \OPR{CMP},
\OPR{MAXNUM}, \OPR{MINNUM} and a power with a numeral exponent, which the types
inherited before from a declaration that a converted numeral leaves tied with
those of \EXP{\mathbb{Z}64}, \EXP{\mathbb{Q}} and \EXP{\mathbb{R}64}.
Equality and inequality are not converted so: the declaration of \EXP{=} on
\TYP{Number} is applicable to an integer value and a numeral without coercion,
and so is the top-level declaration of \EXP{\neq}, whose parameters are of type
\TYP{Any}; the compiled type checker selects these and converts neither
operand, and \EXP{=} then compares the two as rationals, through the case for a
numeral that this change adds to \VAR{exactValue}, the function by which
\TYP{Number}'s \EXP{=} takes an exact value.
```

Nothing else in the entry changes. Its `Change` describes the passages revised in `literals.tex` and in the coercion chapter's box; neither passage makes the claim, so neither moves.

**The records.**
- `explorations/coordinator/PLAN.md:449`: the gather.1 sentence ends "the text stands as rung Q wrote it, and no gated program can observe the checker over the one library before the switch-over". After the repair that is no longer true. The repair replaces that clause with one that says the review's repair qualified the Effect.
- `explorations/compile-ladder/climb-batch-8/RECORD.md:141`: "The text stands as the rung wrote it" is stale in the same way. The repair appends one sentence to that paragraph and rewrites nothing in it.

## 5. Not ruled here

- The review's corrections commit `b3c9e2dbf` and the five stops it lists are not this ruling's to decide.
- This repair changes a path under `Specification/`. The workflow's `repairRerun` counts any such path as code (`explorations/coordinator/climb-batch-workflow.js:1772`, `:1950`), so the gate runs again after it, although no stage of the gate reads the specification's text. That is the script's rule, and it is listed for Pavol below, not changed here.

## 6. For Pavol

- The gate reruns after a repair that changes only specification text, although no stage of the gate reads that text: `codePathsOf` counts every path outside `explorations/` that is not a test file as code (`explorations/coordinator/climb-batch-workflow.js:1772`, `:1950`). This repair is one. The weighing in "A tests-only repair does not rerun the gate" (`explorations/coordinator/POSITIONS.md:101`) would exempt such a repair, leaving the specification's build to the commit stage as now (`climb-batch-workflow.js:1870`). That would be a script change, and it is his to take.

## 7. Instructions for the repair

1. In `/home/user/fortress`, check that `awk 'NR>=2573&&NR<=2579' Specification/appendices/changes.tex` prints the seven lines from "A numeral beside a value of an integer type is converted to that type, whose" to "\EXP{\mathbb{Q}} and \EXP{\mathbb{R}64}.", inside the Effect of the entry "The type of an integer numeral" (`\seclabel{revival-numeral-type}`, `:2535-2536`). If another commit has moved them, find the sentence by its text.
2. Replace exactly those seven lines with the fifteen lines of section 4's block, as written. Change nothing else in `changes.tex`. Run `git diff --check` and confirm that `\EXP{\neq}` and `\EXP{=}` appear elsewhere in `Specification/` (`Fortress.NegatedOperators.tex:46`, `variables.tex:86`). Do not build the specification; the commit stage runs `ant tex` once on the landed tree (`explorations/coordinator/climb-batch-workflow.js:1870`).
3. In `explorations/coordinator/PLAN.md:449`, in the entry that begins "`z = 0` for a `ZZ32` `z` resolves on the checker over the one library", replace the clause "the text stands as rung Q wrote it, and no gated program can observe the checker over the one library before the switch-over" with: "the review's repair qualified it (`compile-ladder/climb-batch-8/JUDGE-review.md`): a numeral beside an integer value converts where no declaration applies without coercion, and `=` and `=/=` are named as the operators where one does, `=` comparing through `exactValue`'s numeral case (`Library/FortressLibrary.fss:386`, gated by `ProjectFortress/tests/IntLiteralValue.fss:35`); no gated program observes the checker over the one library before the switch-over". Leave the rest of the entry as it is, the device sentence included.
4. In `explorations/compile-ladder/climb-batch-8/RECORD.md:141`, the gather.1 paragraph, append after its last sentence: "The review's judge upheld the review's finding on it, adding `=/=` beside `=`, and the review's repair rewrote the sentence (`JUDGE-review.md`, section 4)." Rewrite nothing else in `RECORD.md`.
5. Commit the three files in one local commit on `main`, titled "Appendix I's numeral entry names equality as the case where a numeral is not converted". In the body, give a `historical: Specification/appendices/changes.tex` line, then end with the two footer lines `Co-Authored-By: Claude <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB`. No test file changes, so no harness run is owed. Return `pathsChanged` as these three paths.
