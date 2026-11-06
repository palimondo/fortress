# Chunk c12, assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## 650: rewrite
- scope: pass. present meaning: fail, "`CodeGen.java:2947-2949` after climb batch 25's rung C" and ":3016-3025" point at the wrong lines now (the set is at :2950-2952, the guard and its `sayWhat` at :3019-3028); "after climb batch 25's rung C" is a batch story. evidence: pass (XXX compile test exists, asserts the message). comprehension: pass. ownership: fail, "siblings: 610, 823" are both FIXED. consistency: pass (FACTS:85, :145 agree).
- Read beyond evidence: CodeGen.java:2950-3028 at base.
- Dropped: siblings 610 and 823 (home: the history keeps the old line; 823's fix is why `test` is in the set, which the new line states). Added siblings 653, 694, 701 (701: the same guard refuses contracts, open, outside this run).

## 653: rewrite
- scope, evidence, comprehension: pass. present meaning: fail, "except in rows 665 and 693": 665's override half is fixed (its notes now name only the abstract-method check; `tests/OverrideNothingGeneric*Walk` are plain tests). ownership: fail, sibling 665 no longer shares the override defect. consistency: pass (FACTS:128).
- Read beyond: grep of `isOverride` in `scala_src/`: STypesUtil.scala:1701 is its only reader at the base, so the checker still refuses no override that overrides nothing.
- Dropped: sibling 665 (home: row 665 itself and the history). Added 694 (the same reader of `override`). Paths shortened to `Constructor.java:699`, `OverrideNothingWalk`.

## 694: measure
- scope, comprehension: pass. present meaning: unknown, measured at a1a75716a; 21 commits touched the compiled checker since. evidence: fail, "Row 650 stops the compile, so no compiled test can show it": a `typecheck` compiler test needs no code generator (`compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.test` is one). ownership: sibling 610 is FIXED. consistency: pass.
- Question in questions.md; the outcome gives the rewrite (typecheck test as reproducer, siblings without 610) or a close.

## 391: rewrite
- scope: pass. present meaning: pass by reading (neither `OverloadingChecker.scala` mentions a coercion). evidence: fail, the backticked "`XXX` compile test" reads as a test named XXX; `FileTests.java:384-404` names the anyFails lines, while the verdict for an expected failure is :394-410. comprehension: fail, "(climb batch N, rung I)" is a batch story. ownership: pass. consistency: pass.
- Read beyond: FileTests.java:370-410; grep of coercion in both OverloadingChecker files.
- Dropped: "(climb batch N, rung I)" (history). Added sibling 392.

## 392: rewrite
- scope: pass. present meaning: pass. evidence: fail, the `XXX` token and the FileTests range as in 391. comprehension: fail, "The checker's rule for `typed` tries a coercion" has no pinned line. ownership, consistency: pass.
- Read beyond: Misc.scala:684-686 (SAsExpr checks the subexpression against the ascribed type) and STypeChecker.scala:475-481 (that check builds a coercion).
- Dropped nothing.

## 100: measure
- scope: pass. present meaning: unknown. The declaration still stands abstract (`Library/FortressLibrary.fss:2055`, was :1912 at 052a7c3fe), but walk now refuses at load an object that inherits an abstract method without a body (row 649, fixed), so the run-b stop may now be a refusal at load. evidence: fail, the probes are gone and their run predates those load checks. comprehension, ownership: pass. consistency: n/a.
- NEGATIVE-VERIFIED beside `silent`: status kept; silent.txt says defect.
- Read beyond: the old probe g22.fss from history (in questions.md, whole).

## 221: measure
- scope, comprehension, ownership, consistency: pass. evidence: fail, the reproducer as run stops: "Could not find an implementation for API AplCore on path" (exit 255), since `AplCore` is in `explorations/apl/base/`. present meaning: probably holds by reading (`Array2` still extends `StandardMutableArrayType`, now `Library/FortressLibrary.fss:2653-2655`), but the row's numbers rest on the run; question gives the command with `FORTRESS_SOURCE_PATH` (apl gaps.md row 12).

## 665: keep
- All six pass. The claim names no fixed half (the override half, fixed, is out of claim and notes); `Constructor.java:263` and `:431` hold their text at the pin; the `XXX` test ran green in the newest gate, which holds for the base; FACTS:200-201 and POSITIONS:60 agree. Siblings 647 and 649 are FIXED but are the same check's closed shapes; the refused notes of batches 13 and 14 are already folded in.

## 693: rewrite
- scope, evidence, consistency: pass (XXX walk test green in a holding gate; FACTS:203). present meaning: fail, `BuildEnvironments.java:1070` moved to :1085 (same `extends_` line). comprehension: fail, "skeptic's contested e8d377669" names a commit not in the base's history, and "The base loads the same programs" is a story. ownership: pass; added 653 (the compiled half of override-nothing).
- Read beyond: BuildEnvironments.java:1058-1092 at base and at 3ba2d005f; Constructor.java:674-750.
- Dropped: e8d377669 and "The base loads the same programs" (history).

## 725: rewrite
- scope, present meaning, consistency: pass (POSITIONS:60, FACTS:201). evidence: fail, pinned "at 317fc0ef5", a commit not in the base's history; the lines are unchanged and still hold `!hasStaticParams(tt)` at :137. comprehension: fail, "The same on the base." is a story. ownership: sibling 709 FIXED, 728 missing.
- Dropped: sibling 709 (home: the new line names its test `AbstractMethodCoveredPairs`, and the history); "The same on the base."

## 728: rewrite
- scope, present meaning, consistency: pass (FACTS:201, POSITIONS:60). evidence: fail, pinned "at f537abed8", not in the base's history; the refusal is :431-433 (condition and `error`). comprehension: fail, "The same on the base." ownership: sibling 666 FIXED.
- Dropped: sibling 666 (history), "The same on the base."

## 639: rewrite
- scope, evidence, comprehension, ownership, consistency: pass. present meaning: fail, `oops` moved from `:1904` to `:1908`. Pin moved to c124c6b65 (FileTests.java:382-385 unchanged).
- Read beyond: FileTests.java:111-175 (walk's InterpreterTest has no output keys: `testFailed` returns null), :460-480 (refusal keys apply at load only), so no interpreter test can still hold the message.
- NEGATIVE-VERIFIED beside `silent`: status kept; silent.txt says choice.

## Pairs, duplicates, closes
None: 650 and 701 (outside the run) share the code generator's guard but refuse different constructs, siblings, not one defect; 725 and 723 are different paths.
