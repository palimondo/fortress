<!-- The record-landing workflow's evidence of the gap ledger: each row that 13f4fdea7..efb603dce opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- closed as FIXED: 1, 573, 650, 653, 960, 1026, 1038, 1039
- noted: 152, 996, 1041
- rewritten: 1100
- opened: 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 1, closed as FIXED

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: `x[i][j]` and `x[i]^2` are grammatical, but walk invokes a subscript followed by a subscript or a superscript without its first index: one index fails …
- Claim at the base: `x[i][j]` and `x[i]^2` are grammatical, but walk invokes a subscript followed by a subscript or a superscript without its first index: one index fails with `args = ()`, more silently give the wrong element
- Reproducer: `ProjectFortress/tests/SubscriptThenSuperscriptWalk.fss`
- Notes now: fixed `f8b05668e`; also g[1][2]^2, B.f()[5]^2 and x[5]k; full text: history, row 1
- The notes gained: fixed `f8b05668e`; also g[1][2]^2, B.f()[5]^2 and x[5]k;; they lost: siblings: 84. Such a primary parses as a `MathPrimary` (not `SubscriptExpr`); its subscript goes to `evalAndInvokeMethod` (`interpreter/evaluator/Evaluator.java:1181`), whose `evalInvocationArgs` (`:1064`, `:1380-1381`) takes `exprs.subList(1,…)`, right for a juxtaposition list, wrong for a subscript list. `m[3,7]^2` prints `11449`, `(m[7])^2`, not `1075369` (probe `explorations/gap-ledger-prob...

## Row 152, noted

- Section: 3. Traits, objects and components. Status: POSITIVE-VERIFIED. Class: —.
- Claim: top-level values are initialised at component load in declaration order, including a tuple binding whose right-hand side reads a file (`(corpusTokens, corpusLengths) = loadCorpus(corpusPath)`) and a matrix built by a function declared above it (`causalMask`); functions declared later use them
- Reproducer: `explorations/run-c/src/MicroGptFlat.fss`
- Notes now: Run from `explorations/run-c/src/`: `microgpt flat \| params 4192 \| corpus 2000 x 17 \| batch 1, 5 steps`, then `step 1 loss 3.3659669475848513` … `step 5 loss 3.2208830897506235`, the committed check's goldens. The corpus loads once, on import as on run: a top-level tuple binding's right side runs once (`tests/TopLevelTupleBindingOnceWalk`). A top-level tuple binding of literals, untyped (`(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`) or typed (`(a: ZZ32, b: RR64) = (3, 2.5)`), binds every name: `(1) 16 16 4 4 27 26`, `(3) 3 2.5` (probe `explorations/run-c/probes/q04d_toplevel.fss`, in the parent of `4ebf80aec`); full text: history, row 152
- The notes gained: goldens. The corpus loads once, on import as on run: a top-level tuple binding's right side runs once (`tests/TopLevelTupleBindingOnceWalk`). A top-level tuple binding of literals, untyped (`(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`) or typed (`(a: ZZ32, b: RR64) = (3, 2.5)`), binds every name: `(1) 16 16 4 4 27 26`, `(3) 3 2.5` (probe `explorations/run-c/probes/q04d_toplevel.fss`, in the parent of `4ebf80aec`);; they lost: goldens; the corpus loads once, on import as on run. A top-level tuple binding of literals, untyped (`(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`) or typed (`(a: ZZ32, b: RR64) = (3, 2.5)`), binds every name: `(1) 16 16 4 4 27 26`, `(3) 3 2.5` (probe `explorations/run-c/probes/q04d_toplevel.fss`, in the parent of `4ebf80aec`). under walk the right side of such...

## Row 573, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a compiled call of a functional method with self not first, overloaded in an object by its own declarations beside inherited ones, tests and casts the …
- Claim at the base: a compiled call of a functional method with self not first, overloaded in an object by its own declarations beside inherited ones, tests and casts the receiver in place of an argument in the object's dispatch method and dies with `ClassCastException`
- Reproducer: `ProjectFortress/compiler_tests/FunctionalMethodOverloadSelfLast.test`
- Notes now: fixed `1db0e878c`; also FunctionalMethodCoverSelfSecond.test and FunctionalMethodMeetNarrowedSelfNotFirst.test; full text: history, row 573
- The notes gained: fixed `1db0e878c`; also FunctionalMethodCoverSelfSecond.test and FunctionalMethodMeetNarrowedSelfNotFirst.test;; they lost: Self last: `C extends A` declares `pick(n: N1, s: S0, self)` and `pick(n: N1, s: S1, self)` beside `A`'s `pick(n: N0, s: S1, self)`; `pick(N1o, S0o, C)` dies '...$C cannot be cast to class ...$N1'. Self second: `compiler_tests/XXXFunctionalMethodCoverSelfSecond` (`Pq extends { P, Q }` covers `mark(x: Ka, self)` and `mark(x: Kb, self)` by two of its own) dies '...$Pq cannot be cast to class ...$...

## Row 650, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator refuses a method declaration with the modifier `override`, "Don't know how to compile this kind of FnDecl", so the team's …
- Claim at the base: the code generator refuses a method declaration with the modifier `override`, "Don't know how to compile this kind of FnDecl", so the team's `tests/disp0.fss`, which the compiled checker accepts, does not compile
- Reproducer: `ProjectFortress/compiler_tests/OverrideModifierCodeGeneration.test`
- Notes now: fixed `d56eb8a88`; also OverrideBridgesCompiled.test; full text: history, row 650
- The notes gained: fixed `d56eb8a88`; also OverrideBridgesCompiled.test; full text: history, row 650; they lost: siblings: 653, 694, 701. `CodeGen.fnDeclCompilableModifiers` holds the getter, setter, `io`, `private`, `abstract` and `test` modifiers only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2950-2952` at c124c6b65), and `forFnDecl` throws `sayWhat` on a declaration with any other (`:3019-3028`). The chapter's draft note (`traits.tex:15-16`) lists the modifier as not yet supp...

## Row 653, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker type checks a method declaration with the modifier `override` that overrides no inherited declaration, where the traits chapter …
- Claim at the base: the compiled checker type checks a method declaration with the modifier `override` that overrides no inherited declaration, where the traits chapter makes it a static error: `override f(x: String): String` in `object B extends A`, beside `A`'s `f(x: ZZ32): String`, passes `fortress typecheck`
- Reproducer: `ProjectFortress/compiler_tests/XXXOverrideNothingCompiled.test`
- Notes now: fixed `d56eb8a88`; full text: history, row 653
- The notes gained: fixed `d56eb8a88`;; they lost: siblings: 650, 693, 694. Rule: `traits.tex:680-683`. The checker reads `override` only to let a wider declaration hide an inherited one, its one reader of it (`scala_src/useful/STypesUtil.scala:1701` at c124c6b65). Walk refuses it at load (`values/Constructor.java:699`; `OverrideNothingWalk`), except in row 693. `fortress typecheck` exits 0; `compile` stops at row 650 first (`explorations/compi...

## Row 960, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (parser).
- Claim: a numeral with a radix point loses all but one of its leading zeros before its four numbers are read: `00.5`'s digit count `n` is 2, where the Working …
- Claim at the base: a numeral with a radix point loses all but one of its leading zeros before its four numbers are read: `00.5`'s digit count `n` is 2, where the Working Draft counts 3; an integer numeral keeps them, `007` has 3
- Reproducer: `ProjectFortress/tests/RadixPointLeadingZerosWalk.fss`
- Notes now: fixed `6f0e48f18`; the compiled twin is ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test; full text: history, row 960
- The notes gained: fixed `6f0e48f18`; the compiled twin is ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test; full text: history, row 960; they lost: `ExprFactory.makeFloatLiteralExpr` trims leading zeroes from the text it keeps (`nodes_util/ExprFactory.java:1640-1643`), and both paths count that text's digits (`nodes_util/NumeralNumbers.java`, `of`), so the checker's `n` and walk's both see 2; `makeIntLiteralExpr` trims none. Only a program's coercion that reads `n` sees it. The reproducer declares `Digits(count: ZZ32)` with a coercion over...

## Row 996, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the order in which the code generator writes a class's methods and a dispatch method's tests follows the JVM's identity hashes, so two compiles of one source can differ in bytes: 18 of `CompilerBuiltin`'s 312 classes differ under another hash mode
- Reproducer: none
- Notes now: siblings: 430, 990. On 832f7d0d91, compile `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` cold twice, the second time with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0`: 18 of 312 classes differ, among them `fortress/CompilerBuiltin$EqualTo` (its `CMP` dispatch tests `Unordered` before `TotalComparison` in one, after in the other); they hold the same methods in another order. Without the flag two compiles of the base's code are equal, 590 of 590 classes; a scratch tree with other code differed from compile to compile (`explorations/compile-ladder/plan-31/probes/probe-y.md`, section 6). No site traced. Climb batch 35's red gate was row 1100's tie in the checker, not this order.
- The notes gained: Climb batch 35's red gate was row 1100's tie in the checker, not this order.

## Row 1026, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk the right side of a top-level tuple binding is evaluated once for each name and once more: `(first, second) = pairOnce()` runs `pairOnce` …
- Claim at the base: under walk the right side of a top-level tuple binding is evaluated once for each name and once more: `(first, second) = pairOnce()` runs `pairOnce` three times, and the names hold elements of different runs
- Reproducer: `ProjectFortress/tests/TopLevelTupleBindingOnceWalk.fss`
- Notes now: fixed `f8b05668e`; also a field's tuple binding in an object or object expression, tests/FieldTupleBindingOnceWalk; typed numerals, tests/TupleBindingNumeralTypesWalk; full text: history, row 1026
- The notes gained: fixed `f8b05668e`; also a field's tuple binding in an object or object expression, tests/FieldTupleBindingOnceWalk; typed numerals, tests/TupleBindingNumeralTypesWalk; full text: history, row 1026; they lost: siblings: 152. `DesugarerVisitor.forVarDecl` binds a temporary to the right side, then initializes each name from a field reference on the right side itself, not on the temporary (`ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java:865-875`, at db352c1776). With a counter in `pairOnce`, `calls` is 3, `first` 2 and `second` 30; three names give four runs. A tuple of l...

## Row 1038, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a compiled call of an object's own functional method with self not first, beside an inherited one over a wider parameter type, runs the object's …
- Claim at the base: a compiled call of an object's own functional method with self not first, beside an inherited one over a wider parameter type, runs the object's declaration for every argument where the receiver itself has the own declaration's parameter type, with no error
- Reproducer: `ProjectFortress/compiler_tests/FunctionalMethodSelfSecondReceiverTested.test`
- Notes now: fixed `1db0e878c`; full text: history, row 1038
- The notes gained: fixed `1db0e878c`; full text: history, row 1038; they lost: siblings: 573, 571. `object Pq extends { K, P }` declares `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`: `mark(1, Pq)` and `mark("s", Pq)` answer 3 where walk answers 1; with self first both paths answer 1. It is row 573's site, the dispatch method's type test on `aload_0`, the receiver, which here passes. On c1ce2a35e1 the class did not load ('Duplicate method name "mark?1"', row 571);...

## Row 1039, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: an `exit` out of an `atomic` block to an enclosing `label` loses the block's writes on both paths: after `label done`, `atomic do`, `g := 7`, `exit …
- Claim at the base: an `exit` out of an `atomic` block to an enclosing `label` loses the block's writes on both paths: after `label done`, `atomic do`, `g := 7`, `exit done`, `end`, `end done`, the top-level `g` is still 0
- Reproducer: `ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled.test`
- Notes now: fixed `e8b20935d`; walk: tests/ExitOutOfAtomicWalk.fss; full text: history, row 1039
- The notes gained: fixed `e8b20935d`; walk: tests/ExitOutOfAtomicWalk.fss; full text: history, row 1039; they lost: siblings: 81. The specification retains the writes of a block that an exit leaves. Compiled, the block's handler takes every abrupt completion and `BaseTask.leaveTransaction` ends the transaction without a commit for whatever is not an abort (`runtimeSystem/BaseTask.java:285-314`); the exit is a `LabelExit` thrown through it. Walk prints 0 too (`tests/XXXExitOutOfAtomicWalk.fss`). Link test: `c...

## Row 1041, noted

- Section: 11. Parallelism, exceptions and control flow. Status: CONTESTED. Class: implementation gap (codegen).
- Claim: an `exit` that runs after its `label` block has completed, from a function made in the block and kept, ends a compiled program with an uncaught `LabelExit`; under walk a `try` around the call catches it as `LabelException`
- Reproducer: `ProjectFortress/compiler_tests/ExitAfterLabelCompletedCompiled.test`
- Notes now: siblings: 81, 1039. The specification scopes an exit's target statically, silent on a label block no longer evaluated. Compiled: 'com.sun.fortress.runtimeSystem.LabelExit: exit from a label block that has completed', status 1; no `catch` takes it. Walk: without a `try`, 'exit from nonexistent label block gone'; `catch e LabelException` takes it (`interpreter/evaluator/Evaluator.java:1453-1456`). Both libraries declare `LabelException` (`Library/CompilerLibrary.fss:191`); codegen never throws it. Since row 1039's fix such an exit commits the `atomic` blocks it leaves, on both paths (walk keeps a `w := 5` there). Unsettled: whether such an exit is a `LabelException` that a program may catch.
- The notes gained: 81, 1039. The specification scopes an exit's target statically, silent on a label block no longer evaluated. Compiled: 'com.sun.fortress.runtimeSystem.LabelExit: exit from a label block that has completed', status 1; no `catch` takes it. Walk: without a `try`, 'exit from nonexistent label block gone'; `catch e LabelException` takes it (`interpreter/evaluator/Evaluator.java:1453-1456`). Both libraries declare `LabelException` (`Library/CompilerLibrary.fss:191`); codegen never throws it. Since row 1039's fix such an exit commits the `atomic` blocks it leaves, on both paths (walk keeps a `w := 5` there).; they lost: 81. The specification scopes an exit's target statically and says nothing of a label block that is no longer being evaluated. Compiled: 'com.sun.fortress.runtimeSystem.LabelExit: exit from a label block that has completed', exit status 1; no `catch` clause takes it. Walk: without a `try`, 'exit from nonexistent label block gone'; with `catch e LabelException`, the clause runs (`interpreter/eval...

## Row 1100, rewritten (claim, status, class, reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED at the base, NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: compiled, a call on `self` in a trait that comprises one object, of a functional method that both declare, takes the object's arrow where the overloadings come in that order, and the trait's default methods fail verification, 'VerifyError: Bad type on operand stack', as the one library's `QQ` did
- Claim at the base: the dispatch method of the one library's `denominator(self)`, abstract in `QQ`, a body in `Ratio`, takes `Ratio` as its parameter type when `FortressLibrary` compiles after other programs in one JVM, and `QQ`'s default methods fail verification: 'VerifyError: Bad type on operand stack' in `isFinite`
- Reproducer: `ProjectFortress/compiler_tests/ComprisesSelfAbstractFunctionalMethodCall.test`
- Notes now: siblings: 935, 815, 996. Self is the trait met with the listed type (`basic/expressions/var-ref.tex`, "Identifier References"), so the checker ties the two declarations; the tie kept the first in the overloadings' identity-hash order (`TopLevelEnv.java:465-466`), and the call's descriptor followed it with no cast. Climb batch 35's gate: `denominator` at `(Ratio)` in ant's onelibrary JVM, `(QQ)` in one-JVM runs of the same build. Since its gate repair a tie that self's type makes keeps the trait's own (`Functionals.scala:1103-1134`).
- The notes gained: 935, 815, 996. Self is the trait met with the listed type (`basic/expressions/var-ref.tex`, "Identifier References"), so the checker ties the two declarations; the tie kept the first in the overloadings' identity-hash order (`TopLevelEnv.java:465-466`), and the call's descriptor followed it with no cast. Climb batch 35's gate: `denominator` at `(Ratio)` in ant's onelibrary JVM, `(QQ)` in one-JVM runs of the same build. Since its gate repair a tie that self's type makes keeps the trait's own (`Functionals.scala:1103-1134`).; they lost: 1047, 499. `Library/FortressLibrary.fss:643`, `:729`. `ant testFast`'s onelibrary track on 1f8a67251d, the components compiled after the track's program tests: every run test died, 'Type 'fortress/FortressLibrary$QQ' (current frame, stack[0]) is not assignable to 'fortress/FortressLibrary$Ratio'', isFinite's `invokestatic` of `denominator{…643…,…729…}` at `(Lfortress/FortressLibrary$Ratio;)`; c...

## Row 1104, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path an object's field declared by a tuple binding whose right side is not a tuple expression fails verification when the object's class loads: `(first, second): (ZZ32, ZZ32) = pairOnce()` in `object Pair()` stores the whole tuple in each field and runs the call once per field
- Reproducer: ProjectFortress/compiler_tests/XXXFieldTupleBindingCompiled.test
- Notes: siblings: 837, 1026. `compiler/codegen/CodeGen.java:5312-5318` (the team's, `a874948ac` `:4340-4346`) takes each field's element only where the right side is a tuple expression of as many elements; any other right side goes whole to each field: 'java.lang.VerifyError: Bad type on operand stack' in `Pair.<init>`, '\=Tuple?...FZZ32,...FZZ32?' not assignable to 'FZZ32'. Walk runs it once (`tests/FieldTupleBindingOnceWalk`). An untyped such field is refused first (row 837). Workaround: bind the call at the top level, then write the field from it.

## Row 1105, opened

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk an array literal inside a tuple bound at a tuple type that names an array type is not built: `t: (ZZ32[2], ZZ32) = ([1 2], 3)`, and `(arr, n): (ZZ32[2], ZZ32) = if flag then ([4 5], 6) else ([7 8], 9) end`, stop at load, 'Type mismatch binding ((1,2),3) ...'
- Reproducer: ProjectFortress/tests/XXXTypedTupleArrayLiteralWalk.fss
- Notes: siblings: 142. Walk builds an array literal only where it is the whole value at an array type (`interpreter/env/LazilyEvaluatedCell.java:71-74`); `Coercions.coerceTuple` (`interpreter/evaluator/values/Coercions.java:317-334`) converts a tuple element by coercion and finds none for an array literal. The tuple binding over an `if` reaches it since its temporary is declared at the names' types (`interpreter/rewrite/DesugarerVisitor.java:878-893`); a tuple binding whose right side is a tuple expression binds each name alone and builds the array. Workaround: bind the array to a name of its own.

## Row 1106, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator refuses two forms of the modifier `override` that walk runs: an override of or by a method with static parameters of its own, as `override f[\U\](x: U)` over `f(x: ZZ32)`, and one in a generic trait or object whose parameter types or the overridden one's name a static parameter
- Reproducer: `ProjectFortress/compiler_tests/XXXOverrideOverStaticParameterCompiled.test`
- Notes: siblings: 650. `checkOverrideCompilable` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1204-1213` at c5c2bd6d7a) stops: 'Can't compile an override of or by a method with static parameters of its own yet.', or 'Can't compile an override in a trait or object with static parameters, ...'. A generic method compiles to a closure finder that a bridge does not reach, and at an instance that makes the two parameter types equal, as `G[\Any\]` over `A[\T\]`'s `f(x: T)`, the class held the bridge and the override under one signature: 'ClassFormatError: Duplicate method name'. Second test: `XXXOverrideGenericMethodCompiled`. Walk runs both (`tests/disp1.fss`).

## Row 1107, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses an `override` in a generic trait that extends a trait under a `where` clause, over an inherited declaration that it overrides only by the clause's bound: with `trait G[\T\] extends A[\T\] where { T extends ZZ32 }`, `override f(x: ZZ32)` over `A`'s `f(x: T)`
- Reproducer: `ProjectFortress/compiler_tests/XXXOverrideConditionalExtensionChecker.test`
- Notes: siblings: 773, 774. The overloading check reads `A`'s `f` with `T` unbounded, the condition not held (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:410-411` at c5c2bd6d7a): on the base 'Invalid overloading of f in trait G', and since the override check reads the same table, also 'Invalid override of f in trait G: ... has the modifier override and does not override any inherited declaration.' Walk runs the program and prints `G` (`tests/OverrideConditionalExtensionWalk.fss`).

## Row 1108, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker does not check an `override` in an object expression, so one that overrides nothing type checks: `object extends A override f(y: String): String = "E" end`, beside `A`'s `f(x: ZZ32)`, passes `fortress typecheck`, where walk refuses it at load
- Reproducer: none
- Notes: siblings: 570, 693. The per-provider loop that holds the check visits only the unit's named traits and objects (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:377` at c5c2bd6d7a), as for row 570. `bin/fortress typecheck` of that object expression in `mk(): A`, with `run() = println(mk().f(3))`, exits 0; walk: 'Invalid override of f in *objectexpr_ObjectExpr ... has the modifier override and does not override any inherited declaration'. No compiled test is green while the checker accepts it.

## Row 1109, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object's `override` hides every declaration of its name that the object inherits, not only those it overrides: with trait `A`'s `f(self, other: ZZ32)` and `f(self, other: String)` and object `B`'s `override f(self, other: Number)`, `f(B, "s")` stops, 'Unification error'
- Reproducer: `ProjectFortress/tests/XXXOverrideKeepsOtherOverloadsWalk.fss`
- Notes: siblings: 614, 650. `Constructor` records each name that the object's own declarations override and gathers no declaration of that name from its traits (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:243-250`, `:274`, `:833`, `:844` at 13f4fdea75): 'Unification error: Closure/Constructor for f param 1 (other:Number) got arg "s" of type String'; the dotted `B.g("s")` likewise. An override declared in a trait keeps them, read per declaration (`notInherited`). The compiled path runs `A`'s declarations (`compiler_tests/OverrideBridgesCompiled`). Workaround: declare the override in a trait.

## Row 1110, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk an `exit` out of a `tryatomic` block that no `atomic` block encloses, to an enclosing `label`, never reaches the label: `Evaluator.forTryAtomicExpr` wraps the `LabelException` in a `RuntimeException`, and the run dies with 'exit from nonexistent label block done'
- Reproducer: `ProjectFortress/tests/XXXExitOutOfTryAtomicWalk.fss`
- Notes: siblings: 1039, 353, 952, 1111. By atomic.tex `tryatomic` acts exactly as `atomic` does, so the exit reaches its label and the block's writes are kept. `forTryAtomicExpr` catches every `Exception` and throws `new RuntimeException(e)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:229-231` at 13f4fdea75), where `forAtomicExpr` throws a `RuntimeException` on as it is (`:196-198`). Since row 1039's fix `doItOnce`, which both run, commits before an exit leaves, so by reading the fix is that rethrow alone. Inside `atomic` it runs as plain code (row 952) and the exit reaches its label. Compiled: row 353. Workaround: write `atomic`.

## Row 1111, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk an exception thrown out of a `tryatomic` block that no `atomic` block encloses never reaches a `catch` clause around it: `Evaluator.forTryAtomicExpr` wraps it in a `RuntimeException`, and the run dies with 'java.lang.RuntimeException: java.lang.RuntimeException: FortressException: Boom'
- Reproducer: `ProjectFortress/tests/XXXThrowOutOfTryAtomicWalk.fss`
- Notes: siblings: 1110, 353, 952. By atomic.tex `tryatomic` acts as `atomic` does, which completes abruptly as its body does, so the `catch` takes the exception and the block's writes are discarded. `forTryAtomicExpr` catches every `Exception` but `AbortedException` and throws `new RuntimeException(e)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:229-231` at 13f4fdea75); with `atomic` in its place the `catch` takes it and the write reverts. The same on the base and after row 1039's fix, at one thread and four. The rethrow that 1110 needs repairs this too. Compiled: row 353. Workaround: write `atomic`.
