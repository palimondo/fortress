# Check of chunk c12 (c-run4, base c124c6b65)

`mech.md`: 8 lines, 0 failing; the chunk applies on copies, `ledger.py check` exit 0 with and without `--base`. Citations below were opened at c124c6b65 (`git show c124c6b65:<path>`).

## 650: rewrite, fail (cold read)
Fidelity holds: `CodeGen.java:2950-2952` is `fnDeclCompilableModifiers` (GetterSetter, IO, Private, Abstract, Test); `:3019-3028` is `canCompile` through `throw sayWhat(x, "Don't know how to compile this kind of FnDecl.")`; `XXXOverrideModifierCodeGeneration.test` asserts `compile_exception_contains=Don't know how to compile this kind of FnDecl`; `ProjectFortress/tests/disp0.fss` exists. Dropped tokens: the two old line ranges are false now (moved +3); rows 610 and 823 are FIXED (home: the history; 823's fix is the `test` modifier the line names). Siblings 653, 694, 701 exist and fit. Present, status, form: pass.
Failures:
1. Passage "The chapter's draft note says the modifier is not yet supported." The cold reader could not tell whether the code generator or the specification defers `override`, which bears on the row's class. Source: `Specification/basic/traits.tex:15-16` (the chapter's `\note`: "Where clauses, the override modifier, ... are not yet supported") beside the section's rule `:673-683`. Correction: "The chapter's draft note (`traits.tex:15-16`) lists the modifier as not yet supported, though the section states its rule (`:673-683`)."
2. Passage "Whether the compiled dispatch then leaves out a declaration a type does not provide is not measured." The reader could not tell which declaration. Correction: "Whether the compiled dispatch, once the modifier compiles, leaves out the inherited declaration that the `override` overrides is not measured."

## 653: rewrite, fail (fidelity)
Holds: `STypesUtil.scala:1701` is `else if (o._1.mods.isOverride && tsa.subtypeED(pd, od)) Some(false)`, and a grep of `isOverride` in `scala_src/` at the base finds only it, so "its one reader of it" holds; `Constructor.java:699` is the refusal message; `tests/OverrideNothingWalk.fss` and `compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.test` exist. Dropped tokens: long paths shortened (kept); `row 665` dropped rightly (665's claim and notes now hold only the abstract-method check; history keeps it). Sibling 694 added fits.
Failure:
1. Passage "Rule: `traits.tex:670-671`." At the base those lines are the draft note "Partial overriding of an overloaded functional is allowed / but partial overriding of a functional declaration is not allowed." The rule the claim states ("It is a static error if a declaration with the modifier override does not override any inherited declaration") is `Specification/basic/traits.tex:680-683`. Correction: "Rule: `traits.tex:680-683`."
(The cold reader's "no reason for Reproducer none" is answered by the same `FileTests.java:394-410` rule as rows 391/392; the notes have no room for it at 642 of 700 and a worker fixing the checker writes a plain test: not a failure.)

## 694: measure, pass
Narrow; the program is whole; both commands run from the main tree; the three outcomes map to a rewrite, a close (with bisect range) or a claim rewrite. The writer's note that a `typecheck` compiler test needs no code generator holds (`XXXOverrideGenericReturnTypeNotSubtype.test` is one).

## 391: rewrite, fail (reproducer)
Holds: `8dc1a74d9` is in the base's history and its message names the refused tie "unless it is a numeral's"; `XXXInferAmbiguousCoercion` and `InferNumeralTie` exist in `compiler_tests/`; no `coerc` in `scala_src/overloading/` or `scala_src/typechecker/OverloadingChecker.scala`; `FileTests.java:394-410` is `SourceFileTest`'s `shouldFail` verdict, which `CommandTest` (compile, typecheck) inherits, so "Expected failure or exception, saw none" holds; `overloading.tex` has "Incompatibility Rule" (:210) and the Meet Rule (:173). Dropped tokens: `FileTests.java:384-404` false (corrected to :394-410); `XXX` token reworded (kept as "expected-failure"); test file names kept as names; "(climb batch N, rung I)" story, history. Present, status, form: pass.
Failure:
1. Passage "Probe `explorations/compile-ladder/rung-interp-coercion/probes/CompiledAmbiguous.fss`, no longer in the tree." With reproducer `none`, the notes must let a worker get the program; the line does not say where it is. Source: `git log --diff-filter=D` gives `ab067d9b6`; `git show ab067d9b6^:explorations/compile-ladder/rung-interp-coercion/probes/CompiledAmbiguous.fss` prints it (traits N, A, B, `f(x: A)`, `f(x: B)`). Correction: replace ", no longer in the tree" with ", removed by `ab067d9b6`" (notes 695 of 700).

## 392: rewrite, fail (reproducer, cold read)
Holds: `Misc.scala:684-686` is the `SAsExpr` case calling `checkExpr(sub, typ, ...)`; `STypeChecker.scala:479-481` is `getType(checkedExpr) match`, subtype, else `coercions.buildCoercion(checkedExpr, expected)` (:483-484); `FileTests.java:394-410` as in 391; the spec sections exist (`conversions-coercions.tex:56`, ascriptions excluded at :110; `type-annotation.tex:12`). Dropped tokens: `FileTests.java:384-404` false; `XXX` reworded. Present, status, form: pass.
Failure:
1. Passage "Probe `explorations/compile-ladder/rung-interp-coercion/probes/skeptic/SkAscribe.fss`, no longer in the tree." The cold reader could not tell what `Wide`, `Narrow`, `NarrowOf`, `WideOf` and `.big` are, and the probe that defines them has no pointer. Source: `git show ab067d9b6^:explorations/compile-ladder/rung-interp-coercion/probes/skeptic/SkAscribe.fss` (`Wide` with `coerce(x: Narrow) = WideOf(x.small)` and getter `big`). Correction: replace ", no longer in the tree" with ", removed by `ab067d9b6`".

## 100: measure, pass
The question is narrow; the program is g22 from `e879b6a44^` (renamed component), the command runs from the main tree; the three outcomes map to a rewrite, a rewrite with status kept, or a close. The declaration at `Library/FortressLibrary.fss:2055` holds `opr[r:Range[\ZZ32\]] : ZeroIndexed[\E\]`. NEGATIVE-VERIFIED beside `silent`: status kept (item 265).

## 221: measure, pass
The evidence's run stops at "Could not find an implementation for API AplCore" because `AplCore` and `AplSyntax` are in `explorations/apl/base/`; `FORTRESS_SOURCE_PATH` is the variable `ProjectProperties.java:301` reads; `Array2 ... StandardMutableArrayType` is at `Library/FortressLibrary.fss:2653-2655`. Outcomes map to a rewrite, a close or a rewrite with reproducer `none`.

## 665: keep, pass
`Constructor.java:263` (`declared = !(selfType instanceof GenericTypeInstance)`) and `:431` (`!declared` return) hold their words; `BuildEnvironments.java:895` is `checkGenericOverrides`; the two commits since that touch `Constructor.java` leave the cited lines unchanged (pin unchanged); the XXX walk test is green in the gate that holds for the base. The refused notes of batches 13 and 14 are folded in (override half out of the claim, rows 667/668 fixed). The reason covers what changed.

## 693: rewrite, fail (cold read)
Holds: `ExprFactory.java:1127` is the `Option.<WhereClause>none()` in the object expression's header; `BuildEnvironments.java:1085` is the `extends_` line after `createSymbolicInstantiation(..., h.getWhereClause(), ge)`; `Constructor.java:688` is `boundsUnread && symbolicDomain(m) && !sameParameterTypes(m, o)`. Both XXX tests exist and match the two shapes. Dropped tokens: `BuildEnvironments.java:1070` false (moved to :1085); `e8d377669` not in the base's history and "The base loads the same programs" a story (history). Sibling 653 added fits.
Failure:
1. Passage "Object shape: `XXXOverrideNothingConditionalExtensionWalk`." The cold reader took "object shape" for the object-expression shape, but the test is the generic object `H[\T\]` extending `A[\T\]` under `where { T extends ZZ32 }`, the where-clause shape. Correction: "The where-clause shape: `XXXOverrideNothingConditionalExtensionWalk`." (notes 685 of 700).

## 725: rewrite, fail (cold read)
Holds: `AbstractMethodChecker.scala:135-145` is `coveredByParts` with `elements` returning `None` for a `TupleType` with static parameters, for the domain and for each cover (`return false`); the XXX test holds the claim's bodies and asserts `compile_err_contains=has no concrete implementation in the object Joiner`; `AbstractMethodCoveredPairs` exists. Dropped tokens: `:136-145` corrected to :135-145; row 709 FIXED (history; its test is named). Sibling 728 added fits.
Failure:
1. Passage "A body with a static parameter of its own that the cover does not need refuses the object too." The reader could not tell whether that refusal is right or a second face of the defect. Source: `coveredByParts` returns false when any cover has static parameters (`cs` map, `case _ => return false`), so a valid object is refused. Correction: "The object is refused too, wrongly, where its bodies without static parameters cover and another body has a static parameter of its own."

## 728: rewrite, fail (cold read)
Holds: `Constructor.java:431-433` is the `checkForDef` return condition with `definedBelow` and the `error(... " does not define an abstract method declared in type " ...)`; `:480` is `definedBelow`; the XXX walk test holds the claim's object. Dropped tokens: `:433` widened to :431-433; row 666 FIXED (history). Present, status, form: pass.
Failure:
1. Passage "The compiled path compiles and runs it, and the two-parameter shape `g[\T extends Side\](self, x: T, y: Side)` under `g(self, x: Side, y: Side)`." The second half has no verb; the reader could not tell which path does what with the two-parameter shape. Correction: "The compiled path compiles and runs it, and also the two-parameter shape `g[\T extends Side\](self, x: T, y: Side)` under `g(self, x: Side, y: Side)`."

## 639: rewrite, pass
`FileTests.java:382-385` is `anyFails` with the `QuickCheckTest` exemption; `FortressLibrary.fss:55` is `errorPrintln("FAIL: " s)` in `fail`; `:1908` is `oops`, which calls `fail`; `assert` calls `fail` (:297-300); the report's line 148 is in section 7 ("Walk's behaviour that changed") and holds 'FAIL: (1,2) =/= (1,3); m'; `tests/Array2SubscriptInBounds.fss` exists. Dropped token `:1904` false (moved to :1908). NEGATIVE-VERIFIED beside `silent`: status kept (item 265), silent.txt says choice. Reproducer `none` with the probe's output.

## Pairs, duplicates, closes
None proposed; the writer's reasons (650/701 different constructs; 725/723 different paths) hold.

## Counts
Pass 5 (694, 100, 221, 665, 639); fail 7 (650, 653, 391, 392, 693, 725, 728).
