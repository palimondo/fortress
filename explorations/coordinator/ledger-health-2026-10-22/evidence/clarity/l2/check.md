<!-- Ledger clarity pass, chunk l2: the checker's verdict on each rewritten row of rows.rewrite and on closes.txt, read against the tree at HEAD cdb84fba5 (the library, the Java and the Scala are as at d4d454f9d). -->

# Chunk l2: check

Tree: `HEAD` `cdb84fba5`. `git diff --stat d4d454f9d HEAD` touches only four record files under `consolidation-2026-10-22/evidence/positions-followup/`, so every citation "at d4d454f9d" reads the same at `HEAD`. Nothing was built or run. `ledger.py check --rows rows.rewrite`: "12 rows, 0 fail the template".

Result: 8 pass, 4 fail (340, 355, 364, 436). Each correction below was put into a scratch copy of the row, which `ledger.py check --rows` passes ("0 fail the template"). The lengths are given for each.

## Closes

`closes.txt` proposes none, so there is nothing to check. The reproducers it names are still in their folders: `XXXTypecaseBodyCoerceRungG`, `XXXInferredStaticArgRungS`, `XXXTupleSeparatorRungS`, `XXXFnRenderRungS`, `XXXNatSizeExclusionWalk`, `XXXInheritedOverload` and `XXXEmptyGroupSumRungF`.

## Row 336: pass

- `Int.java:126` `return x / y;`, `:132` `return x % y;`, `Long.java:140`, `:146` alike; `Int.java:389` `long ri = xi % yi;`; `Int$Mod` (`:160`) and `Long$Mod` (`Long.java:172`) call `Int.mod`; `BigNum.java:160` `return x.divide(y);`. `Int.divisionByZero()` is at `Int.java:263-266`, and `:291` is `if (base == 0) throw divisionByZero();`.
- `ZZ`'s `DIV`: measured at `climb-batch-12/RECORD.md:154` on 7fa767d48. Since then `BigNum.java` has changed only in the powers (`5ad4a9957`).
- Compiled `DivisionByZero`: `nativeHelpers/simpleIntArith.java:43`, `simpleLongArith.java:43` and `simpleArbitraryPrecisionArith.java:43` test for zero. `REM` on `ZZ32` and `ZZ64` is `self - other (self DIV other)` (`CompilerBuiltin.fss:601`, `:686`).
- "a Java `ArithmeticException`" and "a `ProgramError` (F-24)" agree: `FunctionClosure.java:191-192` wraps it, and the record's captures print the run's end as the raw `ArithmeticException` (`rung-int-semantics-walk/REPORT.md:41`).
- One thing cut that the assessment's "Cut" does not list: the old line's second fix, "or translating `ArithmeticException` in the native call". History keeps it, so this is no failure.

## Row 340: fail

- Fidelity. Passage: "Same crash, walk running each: … a `ZZ32` function's `try` body with a numeral `catch` value (83b1cae78)". The list's walk clause now covers the new shape, but nothing records a walk run of it. `climb-batch-11/RECORD.md:135` and `rung-checker-expected-type/REPORT.md:158` and `:195` record only the compile ('Error trying to close method scope', probe `TryNumeral.fss`). For the other five shapes the history records walk's answers (history line 2041: "walk prints 500500", "walk prints 3", "walk prints PASS", "walk prints 42").
- Correction (notes 699 of 700, line 1,155): change "Same crash, walk running each: " to "Same crash (walk runs all but the last): ". To make room, change "; by the dump, two paths reach the coercion after it with different stacks." to "; by the dump, two paths reach the coercion with different stacks."
- The rest holds. `CodeGen.java` is unchanged since 052a7c3fe (`git log 052a7c3fe..HEAD` is empty). `:3425-3427` is `methodReturnAndFinish`'s `visitInsn`, `visitMaxs` and `visitEnd`, and `:2820-2821` is the `catch (Throwable t)` that throws the `Error`. The reproducer `.test` holds `compile_exception_contains=Error trying to close method scope`. `XXXTupleClauseSpreadRungG` and `XXXTryCompareCoerceRungE` exist. Row 526's numeral `try` operand is this crash ("Index 2 out of bounds", history line 2041). Row 498 names the desugarer's pattern binding.

## Row 355: fail

- Fidelity. Passage: "No gated test reaches `PureList`." This is false under walk. `ProjectFortress/tests/PureListQuick.fss:13` and `ProjectFortress/tests/ListNullPointer.fss:13` are `import PureList.{...}`. `SystemJUTest` runs every `.fss` in `tests/` (`FileTests.java:934-946`; only `*Syntax.fss`, `*DynamicSemantics.fss`, `*Satisfiability.fss` and `GenomeUtil` are skipped). Neither file is `XXX`, so both pass under walk, where the header is not checked. A worker who repairs `:41` and deletes `:75` needs those two tests. The old line had the same sentence.
- Correction (line 1,180, notes 682). Replace the sentence with "Walk's gated `tests/PureListQuick.fss` and `ListNullPointer.fss` import it; no compiled test does." To make room, drop " The self-type message is `TypeHierarchyChecker.scala:123` (F-225)." and move the F-225 link into the claim: "and by the self-type rule (F-225) \"PureList.List[\E\] is not a subtype of E\"". The capture sentence stays. Another way to make room, also tested: keep the `TypeHierarchyChecker` sentence and cut the capture sentence (line 1,123, notes 633). History keeps the capture.
- The rest holds. `PureList.fsi:41` and `:75` read as quoted. `PureList.fss:41-42` extends `ZeroIndexed[\E\]` and `LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }`. `List.fsi:67-68` has the same, after `AnyList`. Neither file has a `zip`. `TypeHierarchyChecker.scala:122-123` builds the "is not a subtype of" message. The self-type refusal is measured at `climb-batch-14/RECORD.md:158`.

## Row 364: fail

- Fidelity. Passage: "By reading: the inference unifies each argument's run-time type with its parameter (`interpreter/evaluator/EvaluatorBase.java:601-602` at d4d454f9d)." Lines 601-602 only read the run-time type (`for (FValue a : args) {`, `FType at = a.type();`); nothing is unified there. For the row's own two cases, `Cell[\T\](v: T)` and `wrap[\T\](x: T)`, the parameter's type is the lone `T`. The first pass sets that argument aside (`:625-632`). In the second pass, `T` takes the narrowest candidate among the arguments' run-time types, their coercion targets and its bounds: `FType chosen = narrowest(...)` (`:645`), with the method's doc comment at `:521-523` ("a type parameter that is the whole declared type of some argument and that nothing else fixes takes the narrowest of its arguments' types"). The unification at `:637` is for a parameter whose type only mentions `T`. `inferWithCoercion` is the path tried first (`:91-93`).
- Correction (line 1,197, notes 642): "By reading: the inference takes each argument's run-time type, `a.type()` (`interpreter/evaluator/EvaluatorBase.java:602` at d4d454f9d), a lone `T` the narrowest (`:645`)."
- The rest holds. `XXXInferredStaticArgRungS.fss:10` asserts `Cell[\\String\\]`. `XXXInferredIntBindingRungT.fss:13` is the `BoxT(z)` binding. The dotted-method case is measured at `climb-batch-17/RECORD.md:192`. F-74 says a `Box[\Int\]` "dispatches past" `Box[\ZZ32\]`. The cut "`Box[\Number\]`" is not in F-74, but history keeps it.

## Row 369: pass

`FortressLibrary.fss:4402-4410` holds the five tuple overloads, each writing `","`. `:4412` is `opr ||(self, b:Any):String = self || cast[\Object\](b).asString`, and `:4513` is `println(a:Any):() = println("" a)`. `FTupleLike.java:60` appends `','`. The `CastError` is measured at `climb-batch-19/RECORD.md:134`. `XXXTupleSeparatorRungS.fss:10` asserts `"(1, a)"`. `XXXTupleSevenRungS.fss` exists. Row 76 is open.

## Row 371: pass

`StaticChecker.java:166-190` runs `TypeHierarchyChecker` under `Shell.getTypeChecking()`. `TypeHierarchyChecker.scala:298-300` is "Types … exclude each other", and `:307-308` is "Type … excludes … but it extends …". `FTraitOrObject.java:236-251` is `visitTrait`, which walks `getExtends()`. The `Tx` form and the checker's refusal of it are measured at `climb-batch-19/RECORD.md:132`. Row 414 holds the size form that passes the checker. Row 551 is open.

## Row 374: pass

`:4513`, `:4412` and `cast[\Object\]` are as for row 369. `FortressBuiltin.fss:37-41` is `trait Object` with `asString`, and `CompilerBuiltin.fss:460` is `println(x:Object)`. The `CastError` is measured at `climb-batch-19/RECORD.md:134`. `XXXFnRenderRungS.fss:10-11` prints both values.

## Row 405: pass

`STypeEnv.scala:200` and `:72-75` throw "Missing parameter type for", and the second is from `2d22d3a35`, an ancestor of `HEAD`. `changes.tex:3750-3762` is the entry. `MethodClosure.java:88` holds "has neither body nor def instanceof Method". `Object.Decl.Cons.fss:24-25` holds `cons(x)` and `append(xs)`. Rows 620 and 621 are `FIXED`, 622 is `DUPLICATE`, and 21 is `FIXED`, so cutting them is right. The spec cell `silent` beside Appendix I is the curator's held template question (`questions.md` item 4). Appendix I itself says the inference "is not yet described".

## Row 407: pass

`FType.java:209` is `return excludesOtherInner(other);`, `SymbolicType.java:80` is `if (t1.excludesOther(other))`, and `FType.java:288-294` is the loop over comprised types. `CompilerAlgebra.fsi:16` and `:24` hold `comprises T`. F-171 says "The text does not say whether a bare type variable may be listed; walk overflows its stack on one (row 407)". P-146 and `climb-batch-14/RECORD.md:156` support the compiled-path sentence. Row 372 is open.

## Row 416: pass

`OverloadedFunction.java:587-602` raises "… are unrelated (neither subtype, excludes, nor equal) …". `FType.excludesOther` (`:197-209`) and the helpers it calls, `excludesOtherSimply` (`:212`) and `excludesOtherInner` (`:229`), have no case for two instances of one generic, and `GenericTypeInstance.java` does not override them. F-155 gives "fails the Meet Rule" for the generic form. `RangeInternals.fss:125`, `:140` and `:157` are the three ranked checks, and F-91 names row 416. `XXXNatSizeExclusionWalk.fss:13-14` asserts 3 and 4.

## Row 430: pass

`Constructor.java:182-183` builds the `GHashMap`, and `:348-349` iterates its entry set. `SingleFcn.java:87-95` hashes by name and domain. `FType.java:96-101` takes the serial from the global counter. `FunctionClosure.java:130-131` adds `System.identityHashCode(getEnv())`. F-108 gives the three flags, "fixed for a given library", and F-232 names walk's wrapped values among the identity hashes. `XXXCoercionTupleOverloadRungC.fss` exists.

## Row 436: fail

- Fidelity. Passages: "whose `else => cast[\T\](0)` (`:3393`)" and "`multiplicativeIdentity`'s `else => cast[\T\](1)` (`:3410`)". Both lines are one off: `grep -n` finds `Library/FortressLibrary.fss:3394` `else => cast[\T\](0)` and `:3411` `else => cast[\T\](1)`, the same at `d4d454f9d` (`git show d4d454f9d:Library/FortressLibrary.fss`). `:3393` is `cast[\T\](v)` of the `RR64` clause.
- Correction (same length, line 1,191, notes 619): change "(`:3393`)" to "(`:3394`)" and "(`:3410`)" to "(`:3411`)".
- The rest holds. `:3433` is `empty(): T = additiveIdentity[\T\]()`, and `2b1cd8e63` is an ancestor of `HEAD`. `rung-library-distribute/REPORT.md` section 5 measures both `CastError`s: `XXXEmptyGroupSumRungF` gives `FortressException: CastError`, and the filtered `SUM[\M5\][i <- 1#4, i > 2] M5(i)` ends in `CastError`. F-243 keeps the I3 sentence that was cut.
