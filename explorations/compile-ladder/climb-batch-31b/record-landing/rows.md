<!-- The record-landing workflow's evidence of the gap ledger: each row that 647163a9c..257cae950 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 112, 237, 330, 340, 350, 525, 551, 697, 863, 866, 887, 928, 959, 996, 1044
- closed as FIXED: 397, 550, 819, 832, 840, 992, 1014, 1030, 1031
- rewritten: 528, 698, 880, 886, 1000, 1003
- opened: 1054, 1055, 1056, 1057, 1058, 1059, 1060

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 112, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: a `value` object may declare a `var` field: walk accepts it, mutates it in place, and the object then aliases like a reference object
- Reproducer: none
- Notes now: `value object Counter(var n: ZZ32)` with `n := n + 1` prints `built Counter(1)` / `after bump Counter(2)`, with no diagnostic. After `d = c` and `c.bump()`, `c = VCounter(2) d = VCounter(2)`, so the licence to copy value objects is not taken either. Nothing enforces the valueness of objects; the trait rule is enforced (row 115). Probes `explorations/run-b2/probes/g1a_varfield.fss`, `g1a_copy.fss`, in the parent of `22ea0cd90`. Compiled, `value object V(var n: ZZ32)` runs with its field in a cell, and `V(1) === V(1)` is `false`: `SEQV` compares cells by identity (`nativeHelpers/equalityRule.java:83`). The one library declares one, `Lazy` (`Library/Lazy.fss:18`). full text: history, row 112
- The notes gained: diagnostic. After `d = c` and `c.bump()`, `c = VCounter(2) d = VCounter(2)`, so the licence to copy value objects is not taken either. Nothing enforces the valueness of objects; the trait rule is enforced (row 115). Probes `explorations/run-b2/probes/g1a_varfield.fss`, `g1a_copy.fss`, in the parent of `22ea0cd90`. Compiled, `value object V(var n: ZZ32)` runs with its field in a cell, and `V(1) === V(1)` is `false`: `SEQV` compares cells by identity (`nativeHelpers/equalityRule.java:83`). The one library declares one, `Lazy` (`Library/Lazy.fss:18`).; they lost: diagnostic at any phase. After `d = c` and `c.bump()`, `c = VCounter(2) d = VCounter(2)`, so the licence to copy value objects is not taken either. Nothing enforces the valueness of objects; the trait rule is enforced (row 115). Probes `explorations/run-b2/probes/g1a_varfield.fss`, `g1a_copy.fss`, in the parent of `22ea0cd90`; The compiled path compiles it too: `value object V(var n: ZZ32)` run...

## Row 237, noted

- Section: 4. Operators and overloading under walk. Status: POSITIVE-VERIFIED. Class: —.
- Claim: a **component-level `opr` with exactly a library operator's parameter types but another result type is accepted, and wins**: `opr <(a: RR64, b: RR64): RR64` makes `2.0 < 3.0` evaluate to `99.0`, with no ambiguity error
- Reproducer: `explorations/apl/rung-3/t03_and.fss`
- Notes now: Case (b) of `t03_and.fss`. Sharpens row 218, where only the *more specific* overload won. APL's 0/1 scalar comparisons are thus reachable, at the price of changing every host use of `<` in the same component, the library's own included; rung 3 therefore declares the array shapes only, and `2<3` stays the host's `true`. A postfix `:` departs under walk: beside the one library's `opr (x:(ZZ32,ZZ32)):`, a component's `opr (x: (ZZ32, ZZ32)): : ZZ32 = 12` is not reached, `pr:` for `pr = (1, 2)` printing the library's range `([1,2,3,4,5... BY [2,3,4,5,6...)`; its `#` at the same type wins, `pr#` printing 12. full text: history, row 237
- The notes gained: A postfix `:` departs under walk: beside the one library's `opr (x:(ZZ32,ZZ32)):`, a component's `opr (x: (ZZ32, ZZ32)): : ZZ32 = 12` is not reached, `pr:` for `pr = (1, 2)` printing the library's range `([1,2,3,4,5... BY [2,3,4,5,6...)`; its `#` at the same type wins, `pr#` printing 12.

## Row 330, noted

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (library).
- Claim: the float types' `floor` and `ceiling` return a float where the specification returns an integer, and the brackets `⌊x⌋` and `⌈x⌉` are a `ZZ64` under walk and an `RR64` compiled
- Reproducer: `ProjectFortress/library_tests/RR64FunctionsRungF.fss:75-82`
- Notes now: Interpreter: `floor` and `ceiling` at `RR64`, the brackets and `truncate` at `ZZ64`, in the api (`Library/FortressLibrary.fsi:375-379`) and the component's `value object RR64` (`Library/FortressLibrary.fss:538-547`), at 046c410c43; `round` `ZZ64` there (`:548`, row 1000). Compiler world: `floor`, `ceiling` and the brackets at `RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:457-458`, `:468-469`). P-68's rung makes the brackets, `round` and `truncate` `ZZ`. On both paths `round` and `truncate` are `0` at NaN and saturate at ±∞ and past `2^63`. Decision: P-68. full text: history, row 330
- The notes gained: (`Library/FortressLibrary.fsi:375-379`) and the component's `value object RR64` (`Library/FortressLibrary.fss:538-547`), at 046c410c43; `round` `ZZ64` there (`:548`, row 1000).; they lost: (`Library/FortressLibrary.fsi:378-382`), `Float` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:182-191`) and the component's `trait RR64` (`Library/FortressLibrary.fss:497-501`); `round` `ZZ` there (`:502`), `ZZ64` in `Float`.

## Row 340, noted

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a `typecase` that is a function's or method's body, its integer-literal clause values coerced to the declared `ZZ32`, crashes the code generator: 'Error trying to close method scope'
- Reproducer: `ProjectFortress/compiler_tests/XXXTypecaseBodyCoerceRungG.test`
- Notes now: siblings: 498, 526. Two paths reach the coercion at unlike stacks; ASM's `Frame.merge` fails. Workaround: `do … end` around it. Same crash (walk runs all but the last): an `if` argument coerced to an overloaded method's parameter; a size read in a clause; a named tuple clause spread into a call (`XXXTupleClauseSpreadRungG`); `r = try … end` then `r = -1` (`XXXTryCompareCoerceRungE`); a numeral-valued `try` operand (row 526); a `ZZ32` function's `try` body with a numeral `catch` value; a `label` block whose value joins a numeral with a `ZZ32` (`XXXLabelNumeralValueCompiled`; P-50 gives the numeral the label's type; kin: rows 1014, 1030, 1043; bind it first). full text: history, row 340
- The notes gained: stacks; ASM's `Frame.merge` fails. Workaround: `do … end` around it. Same crash (walk runs all but the last): an `if` argument coerced to an overloaded method's parameter; a size read in a clause; a named tuple clause spread into a call (`XXXTupleClauseSpreadRungG`); `r = try … end` then `r = -1` (`XXXTryCompareCoerceRungE`); a numeral-valued `try` operand (row 526); a `ZZ32` function's `try` body with a numeral `catch` value; a `label` block whose value joins a numeral with a `ZZ32` (`XXXLabelNumeralValueCompiled`; P-50 gives the numeral the label's type; kin: rows 1014, 1030, 1043; bind it first).; they lost: stacks, and ASM's `Frame.merge` fails. Workaround: `do … end` around it. Same crash (walk runs all but the last): an `if` argument coerced to an overloaded method's parameter; a size read in a clause; a named tuple clause spread into a call (`XXXTupleClauseSpreadRungG`); `r = try … end` then `r = -1` (`XXXTryCompareCoerceRungE`); a numeral-valued `try` operand (row 526); a `ZZ32` function's `tr...

## Row 350, noted

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: on both paths `IntegerOverflow` carries no value, so a program that catches an overflow cannot say which number overflowed
- Reproducer: none
- Notes now: Compiled, each `IntegerOverflow` throw of `nativeHelpers/simpleIntArith.java`, `simpleLongArith.java` and the unsigned twins (`simpleIntArith.java:97` at de6d905f5) uses `Utility.makeFortressException(name)` (`compiler/runtimeValues/Utility.java:45`), the no-argument constructor; `:28` passes a message, a fix's hook (`Specification/basic/exceptions.tex:68`; `basic/operators/opr-overview.tex:155` asks only for the throw). Walk's `ZZ32.overflow()` (`interpreter/glue/prim/ZZ32.java:41`) has none. Probe `explorations/compile-ladder/rung-int-conversions/probes/skeptic/SK4Bounds.fss`, in the parent of ab067d9b6: compiled, it prints only "IntegerOverflow caught". full text: history, row 350
- The notes gained: `ZZ32.overflow()` (`interpreter/glue/prim/ZZ32.java:41`) has none.; they lost: `Int.overflow()` (`interpreter/glue/prim/Int.java:258`) has none either.

## Row 397, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path, an object's `var` field declared with a tuple type fails verification in its setter: `h.pair := (WideOf(10), 11)` for `var pair: …
- Claim at the base: on the compiled path, an object's `var` field declared with a tuple type fails verification in its setter: `h.pair := (WideOf(10), 11)` for `var pair: (Wide, ZZ32)` compiles, then `fortress run` dies with `VerifyError: Bad type on operand stack` in `Holder.pair(Wide, FZZ32)`
- Reproducer: `ProjectFortress/compiler_tests/TupleVarFieldCompiled.test`
- Notes now: fixed `06cd09470`; full text: history, row 397
- The notes gained: fixed `06cd09470`;; they lost: siblings: 395. The setter's tuple parameter is spread into two JVM parameters, and the forwarding method `pair` loads `this` and one argument before `invokevirtual pair?(Wide, FZZ32)`: `CodeGen.generateForwardingFor` takes `arity` from the Fortress parameter count (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:791` at c124c6b65) while `from_sig` spreads the tuple (`:834`)....

## Row 525, noted

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: the compiled `NN64` `^` adds: `3^2` is 5 and `2^63` is 65, where walk answers 9 and 9223372036854775808
- Reproducer: `ProjectFortress/compiler_tests/XXXPowNN64CompiledRungE.test`
- Notes now: siblings: 523, 524. `simpleUnsignedLongArith.unsignedLongExp`, marked "NIY", is `return a + b;` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:240-243`, at de6d905f5), bound at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:878` (imported at `:156`). Closes at the switch-over (P-38), when walk's `NN64` `^` (`Library/FortressLibrary.fss:1154`, at 046c410c43) gets a helper the compiled path runs, unsigned and checked as walk's `NN64.powExact` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN64.java:101`). full text: history, row 525
- The notes gained: `NN64` `^` (`Library/FortressLibrary.fss:1154`, at 046c410c43) gets a helper the compiled path runs, unsigned and checked as walk's `NN64.powExact` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN64.java:101`).; they lost: `UnsignedLong$Pow` (`Library/FortressLibrary.fss:979`) gets a helper the compiled path runs, unsigned and checked as its `UnsignedLong.powExact` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java:327`).

## Row 528, rewritten (claim, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: on the compiled path the prelude's `RR32` takes its `=` from `Equality`, which calls `===`, whose declaration at `RR32` calls `=`, so `a = b` over two `RR32` values, `a = 1.5` or `c = 0` compiles clean and overflows the stack when it runs
- Claim at the base: on the compiled path the prelude's `RR32` declares `Equality[\RR32\]` without an `=`, so `a = b` over two `RR32` values, or `a = 1.5`, compiles clean and dies with `java.lang.AbstractMethodError`
- Reproducer: `ProjectFortress/library_tests/XXXRR32EqualityRungV.test`
- Notes now: siblings: 529, 1059. At 647163a9c4 the prelude's `RR32` declares only its numeral coercions (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:955-958`), `Equality`'s `=` is `(self === other)` (`Library/CompilerAlgebra.fss:26`) and `opr ===(a:RR32, b:RR32)` is `a=b` (`Library/CompilerLibrary.fss:67`): 'java.lang.StackOverflowError' in `XXXRR32EqualityRungV` and in `compiler_tests/XXXNumeralEqualsRR32Compiled`, a numeral zero. A program the checker accepts must not die in the JVM. Repair: the one library's `RR32` at the switch-over (`explorations/compile-ladder/rung-rr32-sibling/REPORT.md` section 11); P-37 adds no prelude declaration. Workaround: bind `r: RR64 = c` and compare `r`.
- The notes gained: 529, 1059. At 647163a9c4 the prelude's `RR32` declares only its numeral coercions (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:955-958`), `Equality`'s `=` is `(self === other)` (`Library/CompilerAlgebra.fss:26`) and `opr ===(a:RR32, b:RR32)` is `a=b` (`Library/CompilerLibrary.fss:67`): 'java.lang.StackOverflowError' in `XXXRR32EqualityRungV` and in `compiler_tests/XXXNumeralEqualsRR32Compiled`, a numeral zero. A program the checker accepts must not die in the JVM. Repair: the one library's `RR32` at the switch-over (`explorations/compile-ladder/rung-rr32-sibling/REPORT.md` section 11); P-37 adds no prelude declaration. Workaround: bind `r: RR64 = c` and compare `r`.; they lost: 529. At 052a7c3fe the prelude's `RR32` declares only `coerce(x: FloatLiteral)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:992-994`), and `CompilerAlgebra`'s `Equality` declares `=` abstract; the error says `FRR32` does not implement `=?0`. A program the checker accepts must not die in the JVM (`explorations/compile-ladder/climb-batch-N/JUDGE-review.md`). Repair: a one-line prelude `op...

## Row 550, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: walk refuses at load a plain declaration over a trait type inside a generic one that returns its type parameter, 'fails the Return Type Rule', where …
- Claim at the base: walk refuses at load a plain declaration over a trait type inside a generic one that returns its type parameter, 'fails the Return Type Rule', where the trait comprises one object and so the rule holds: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64`
- Reproducer: `ProjectFortress/tests/GenericBesidePlainReturnParam.fss`
- Notes now: fixed `f6e24650e`; full text: history, row 550
- The notes gained: fixed `f6e24650e`;; they lost: siblings: 539, 779. Over an object type the load check reads such a pair by the rule: the plain result must lie below an object type that stands at a parameter of the returned type parameter (`returnRuleAtObjectArguments`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:882`, at fcdf7bc2da), so the pair at `NN32` loads (`ProjectFortress/tests/GenericBe...

## Row 551, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, the load check does not check a `comprises` clause declared outside the main component, so a type below none of its listed types loads and can dispatch to whichever of two incomparable declarations was written first
- Reproducer: `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss`
- Notes now: siblings: 487, 595, 596, 597, 598. Main component's half fixed `7ed2a8387`; `checkComprisesClauses` skips another unit's clause (`interpreter/evaluator/BuildEnvironments.java:1239`, at 046c410c43); a two-trait case in history. The reproducer's `object Value extends AnyIntegral`, below none of `AnyIntegral`'s listed types, loads and prints `Value`. A program's object below `ZZ32`, `ZZ64`, `ZZ`, `NN64` or `RR64` is refused at load, 'Attempt to extend object type ZZ32', each being an object (`ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss`). A fix revises Appendix I's "The traits that extend a closed trait". full text: history, row 551
- The notes gained: `7ed2a8387`; `checkComprisesClauses` skips another unit's clause (`interpreter/evaluator/BuildEnvironments.java:1239`, at 046c410c43); a two-trait case in history. The reproducer's `object Value extends AnyIntegral`, below none of `AnyIntegral`'s listed types, loads and prints `Value`. A program's object below `ZZ32`, `ZZ64`, `ZZ`, `NN64` or `RR64` is refused at load, 'Attempt to extend object type ZZ32', each being an object (`ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss`).; they lost: `7ed2a8387` (climb batch 9, rung K); `checkComprisesClauses` skips another unit's clause (`BuildEnvironments.java:1191`). `S comprises { U, V }`, `T comprises { V, W }`, `U excludes W`, `V extends { S, T }`, `object Z extends { S, T }`, `f(S)`, `f(T)`, `f(V)` in a component of their own: `f(Z)` prints `f(S)` (`SkNonMain551`, `explorations/compile-ladder/rung-walk-load-check/SKEPTIC.md` section...

## Row 697, noted

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk's load check counts two parameter lists as excluding when every parameter at which one differs is an object type, even an object below the other's type: `f(x: B): C` beside `f(x: C): B`, with `object C extends B`, loads and runs
- Reproducer: `ProjectFortress/tests/XXXReturnRuleObjectParamWalk.fss`
- Notes now: siblings: 99, 785, 788. The team's `distinct \|= unequal && (allObjInstance1 \|\| allObjInstance2)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:511` at c124c6b65; not for instances of one generic object that may coincide, `:439-444`) calls the pair excluding though `C` extends `B`, so return types go unchecked. The checker refuses it. The talk's slide 4 (`explorations/reviews/popl2019-examples.md`); with `trait C`, walk refuses. So `f(x: Number): ZZ32` beside `f(x: ZZ64): String` loads, `ZZ64` being an object. Removing the shortcut alone makes walk refuse the library's pairs whose more specific declaration writes no return type (row 785).
- The notes gained: The talk's slide 4 (`explorations/reviews/popl2019-examples.md`); with `trait C`, walk refuses. So `f(x: Number): ZZ32` beside `f(x: ZZ64): String` loads, `ZZ64` being an object.; they lost: Reproducer: the talk's slide 4, `m1(x: C, y: C): B` beside `m1(x: C, y: B): C` (`explorations/reviews/popl2019-examples.md`); with `trait C` and an object below, walk refuses.

## Row 698, rewritten (claim, notes)

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: the compiler prelude's `trait ZZ32` lists no `comprises` clause, so `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)` over a user trait `List` is refused by the compiled Meet Rule, where walk, on the one library whose `ZZ32` is an object, runs the pair
- Claim at the base: the compiler prelude's `trait ZZ32` lists no `comprises` clause, so `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)` over a user trait `List` is refused by the compiled Meet Rule, where walk, on the one library whose `ZZ32` comprises `Int`, runs the pair
- Reproducer: `ProjectFortress/compiler_tests/XXXOverloadZZ32BesideUserTrait.test`
- Notes now: siblings: 866. 'Invalid overloading of add in component ...: (List, List)->List ... and (ZZ32, ZZ32)->ZZ32', the talk's slide 2 set (`explorations/reviews/popl2019-examples.md`). The prelude declares `trait ZZ32 ... excludes { ZZ64, RR32, RR64 }` with no `comprises` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`, at c124c6b65); the one library declares `value object ZZ32` (`Library/FortressLibrary.fsi:572`, at 046c410c43), which excludes every type that it does not extend. Walk runs the set: `ProjectFortress/tests/OverloadZZ32BesideUserTraitWalk.fss`. Ends at the switch-over; the prelude takes no new declaration.
- The notes gained: `value object ZZ32` (`Library/FortressLibrary.fsi:572`, at 046c410c43), which excludes every type that it does not extend.; they lost: `trait ZZ32 ... comprises { Int }` (`Library/FortressLibrary.fsi:536-538`) and `value object Int extends ZZ32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`).

## Row 819, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a postfix operator applied to a tuple operand stops the code generator, 'Error trying to close method scope', since the call passes the tuple as one …
- Claim at the base: a postfix operator applied to a tuple operand stops the code generator, 'Error trying to close method scope', since the call passes the tuple as one value where the method takes its elements; the one library's four range operators over pairs and triples are refused
- Reproducer: `ProjectFortress/compiler_tests/PostfixOperatorTupleOperandCompiled.test`
- Notes now: fixed `06cd09470`; full text: history, row 819
- The notes gained: fixed `06cd09470`; full text: history, row 819; they lost: siblings: 340, 377 (its message). Probe TupleParamOpr.fss, uncommitted, under the compiler's prelude: `opr (x:(ZZ32,ZZ32))! : ZZ32 = 3` beside `opr (x:(ZZ32,ZZ32)): : ZZ32 = x!`: 'TupleParamOpr.fss:5:31: Error trying to close method scope' (`CodeGen.java:2874` at c124c6b65), from ASM's `Frame.merge`, 'Index -1 out of bounds for length 0' (`explorations/perf-probes/codegen-distance/REPORT.md`)....

## Row 832, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path, a generic dotted method whose single parameter has a tuple type, written or from a tuple static argument, dies at the call with …
- Claim at the base: on the compiled path, a generic dotted method whose single parameter has a tuple type, written or from a tuple static argument, dies at the call with `ClassCastException` in `castTo`: `Box[\ZZ32\](1).first[\ZZ32\]((2, 3))`; walk runs it
- Reproducer: `ProjectFortress/compiler_tests/GenericMethodTupleParameterCompiled.test`
- Notes now: fixed `06cd09470`; full text: history, row 832
- The notes gained: fixed `06cd09470`; full text: history, row 832; they lost: siblings: 339. Compiled and run (`explorations/perf-probes/bound-any-compiled/REPORT.md`): `object Box[\T\](x: T) first[\U\](y: (U, U)): U = do (a, c) = y; a end end`. It dies alike under `U extends Object`; under `Any`, `fortress compile`'s bound for an unbounded `U`, a tuple static argument reaches it: `b.wrap[\(ZZ32,ZZ32)\]((2, 3))` for `wrap[\U\](y: U)` dies alike. `receiverPrependedDomainT...

## Row 840, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path, a component whose name begins with `Tuple` fails verification at the call of a generic function whose one parameter has a …
- Claim at the base: on the compiled path, a component whose name begins with `Tuple` fails verification at the call of a generic function whose one parameter has a generic type of the component: `count[\T\](b: Box[\T\]): ZZ32 = 1` called as `count(Box[\ZZ32\](7))`
- Reproducer: `ProjectFortress/compiler_tests/TupleNamedComponentGenericParam.test`
- Notes now: fixed `06cd09470`; full text: history, row 840
- The notes gained: fixed `06cd09470`; full text: history, row 840; they lost: 'java.lang.VerifyError: Bad type on operand stack' in the closure `count⟦FZZ32⟧`: a `Tuple⟦FZZ32⟧` on the stack where the component's `Box⟦FZZ32⟧` is expected; at a pair alike. The same program runs as `component PairBoxCount`, and so do the function with a second parameter and `id[\T\](x: T)` in a component named `Tuple...`, as the team's two-parameter `other_compiler_tests/TupleCastGeneric` d...

## Row 863, noted

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED. Class: library gap vs spec (specification).
- Claim: the specification says a floating-point division by zero "produces a NaN value according to the rules of IEEE 754", whose rule gives an infinity for a nonzero dividend; both paths give `1.0/0.0` as `Infinity` and `1.0/-0.0` as `-Infinity`, and the team's `Constants` defines `infinity` as `1.0 / 0.0`
- Reproducer: `ProjectFortress/tests/realArith.fss`
- Notes now: The sentence is `Specification/basic/operators/opr-overview.tex:167-168`, as in the Working Draft; the overflow sentence above it gives an infinity "according to the rules of IEEE 754" (`:157-158`). Both paths divide by Java's `/`: `simpleDoubleArith.doubleDiv` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:36-38`), which walk's `RR64` and the compiled `RR64` (`CompilerBuiltin.fss:947`) bind. `Library/Constants.fss:17` and `realArith.fss:78` rely on the infinity, as at a874948ac. 0/0 is NaN on either reading. Which clause governs is open.
- The notes gained: `RR64`; they lost: `Float`

## Row 866, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: on the compiled path, a program's object that extends `ZZ32` compiles, and its run dies when the object's class loads: `MyNum + 1`, for `object MyNum extends ZZ32`, ends 'IncompatibleClassChangeError: class ...$MyNum can not implement ...FZZ32, because it is not an interface'
- Reproducer: `ProjectFortress/compiler_tests/XXXObjectExtendsZZ32Compiled.test`
- Notes now: siblings: 551, 698. The prelude's `trait ZZ32` lists no `comprises` clause (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`), so the checker takes the extender; `FZZ32` is a class (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14`, at c124c6b65). The one library's `ZZ32` is a `value object` (`Library/FortressLibrary.fsi:572`), so walk refuses such an object at load (`ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss`). The same naming of a parent by its carrier (`compiler/NamingCzar.java:799-824`) is the rehearsal's W14. full text: history, row 866 Ends when the prelude's `ZZ32` takes P-178's form, or at the switch-over.
- The notes gained: `ZZ32` is a `value object` (`Library/FortressLibrary.fsi:572`), so walk refuses such an object at load (`ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss`). The same naming of a parent by its carrier (`compiler/NamingCzar.java:799-824`) is the rehearsal's W14. full text: history, row 866 Ends when the prelude's `ZZ32` takes P-178's form, or at the switch-over.; they lost: `ZZ32 comprises { Int }` (`Library/FortressLibrary.fsi:536-538`). The same naming of a parent by its carrier (`compiler/NamingCzar.java:799-824`) is the rehearsal's W14. full text: history, row 866 Under walk it loads (row 551), and `MyNum + 1` ends 'getInt not implemented for FOrdinaryObject'. Ends at the switch-over, when the checker reads the one library's `comprises`.

## Row 880, rewritten (claim, notes)

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED. Class: library bug (library).
- Claim: `nextUp` of `-0.0` is `0.0` and `nextDown` of `0.0` is `-0.0`, each equal to its argument, on `RR64` and `RR32`, where the apis' "next higher IEEE float" and IEEE 754-2008's nextUp give the smallest signed subnormal (`4.9E-324`, `1.4E-45`); under walk, by glue classes and helpers alike
- Claim at the base: `nextUp` of `-0.0` is `0.0` and `nextDown` of `0.0` is `-0.0`, each equal to its argument, on `Float` (`RR64`) and `RR32`, where the apis' "next higher IEEE float" and IEEE 754-2008's nextUp give the smallest signed subnormal (`4.9E-324`, `1.4E-45`); under walk, by glue classes and helpers alike
- Reproducer: `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss`
- Notes now: `DirectedRounding.nextUp` answers `0.0` for the bits of `-0.0` and `nextDown(x)` is `-nextUp(-x)` (`ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127`, the `float` twin `:25-41`); the helpers `doubleNextUp`, `doubleNextDown`, `floatNextUp` and `floatNextDown` call it, and a compiled program's own binding of them prints the same. Java's `Math.nextUp(-0.0)` is `4.9E-324`. The apis' comments: `Library/FortressLibrary.fsi:316-319`, `LibraryBuiltin/FortressBuiltin.fsi:61-64`; the specification names no `nextUp`. `0.0` follows `-0.0` in IEEE 754-2008's totalOrder, which the team may have meant. No directed rounding reaches the case. Which reading governs is open.
- The notes gained: `Library/FortressLibrary.fsi:316-319`, `LibraryBuiltin/FortressBuiltin.fsi:61-64`;; they lost: `Library/FortressLibrary.fsi:323-326`, `LibraryBuiltin/FortressBuiltin.fsi:65`;

## Row 886, rewritten (claim, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: on the compiled path, the natives' rewrite reads a declared type by its simple name, so a program's own trait `Char` takes the library's character transfer, and the checker refuses the binding by the transfer
- Claim at the base: on the compiled path, the natives' rewrite reads a declared type by its simple name, so a program's own trait `Char` takes the library's character transfer and its own trait `UnsignedLong` the `NN64` argument transfer, and the checker refuses the binding by the transfer
- Reproducer: `ProjectFortress/compiler_tests/XXXNativeHelperOwnCharCompiled.test`
- Notes now: siblings: 885. `BuiltinPrimitiveRewriter.simpleName` reads a trait type's name only (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:169-173`, at 046c410c43); `transfer` matches `Char` or `Character` (`:186-188`). `code(c: Char): ZZ32` at `simpleIntArith.intNeg`: 'Character->ZZ32 is not applicable to an argument of type Char.' A refusal is right, as no Java type carries the program's type; the gap is its message, which names the library's transfer. A program's own `UnsignedLong` takes no transfer: 'ZZ64->ZZ64 is not applicable to an argument of type UnsignedLong.' (`ProjectFortress/compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.test`).
- The notes gained: 046c410c43); `transfer` matches `Char` or `Character` (`:186-188`). `code(c: Char): ZZ32` at `simpleIntArith.intNeg`: 'Character->ZZ32 is not applicable to an argument of type Char.' A refusal is right, as no Java type carries the program's type; the gap is its message, which names the library's transfer. A program's own `UnsignedLong` takes no transfer: 'ZZ64->ZZ64 is not applicable to an argument of type UnsignedLong.' (`ProjectFortress/compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.test`).; they lost: c124c6b65); `transfer` matches `Char` or `Character` (`:186-188`) and, at an argument, `UnsignedLong` (`:189-190`). `code(c: Char): ZZ32` at `simpleIntArith.intNeg`: 'Character->ZZ32 is not applicable to an argument of type Char.'; `code(u: UnsignedLong): ZZ64` at `simpleLongArith.longNeg`: 'NN64->ZZ64 ...' (`XXXNativeHelperOwnUnsignedLongCompiled.test`). A refusal is right, as no Java type car...

## Row 887, noted

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: `ZZ`'s `CHOOSE` answers `1` where the specification's zero rule gives `0`, at `k < 0` or `k > n` for a natural `n`: `3 CHOOSE 5`, `0 CHOOSE 1` and `5 CHOOSE -1` are `1` under walk and through its helper compiled, where the fixed widths give `0`
- Reproducer: `ProjectFortress/tests/XXXChooseZZOutOfRangeWalk.fss`
- Notes now: siblings: 337. `simpleArbitraryPrecisionArith.choose` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleArbitraryPrecisionArith.java:164-177`), copied from walk's `BigNum.choose` (`interpreter/glue/prim/BigNum.java:326-345`, at 647163a9c4), swaps `k` with `n - k` where `n - k < k`, so a negative `k` gives its loop no step and the result stays `1`; a negative `n` gives `1` too. The fixed widths' helpers return `0` first (`simpleIntArith.java:218`). Repair: `0` where `k < 0` or `k > n` at a natural `n`; a negative `n` is review-queue item 333's. Compiled, a program's own binding of the helper prints `1` at `3 CHOOSE 5`.
- The notes gained: walk's `BigNum.choose` (`interpreter/glue/prim/BigNum.java:326-345`, at 647163a9c4),; they lost: `BigNum.choose` (`interpreter/glue/prim/BigNum.java:326-345`),

## Row 928, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: design limit (library).
- Claim: under walk, a program's object that extends `JavaBufferedWriter` or `JavaBufferedReader` loads, and its first call of an inherited native method stops, since those are natives over a Java writer or reader and neither trait has a `comprises` clause to name its private native object
- Reproducer: none
- Notes now: siblings: 551. Neither trait (`Library/FortressLibrary.fss:2072-2092`, at 046c410c43) has a `comprises` clause, since their native objects are private to `FortressBuiltin` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:535`, `:540`); the loader's `unbox` refuses any other value (`interpreter/glue/StaticNativeApp.java:296-303`). `object Fake extends JavaBufferedWriter end` with `Fake.write("x")`: 'No Java FortressBufferedWriter carries Fake'; over `JavaBufferedReader`, `Fake.readLine()`: 'No Java FortressBufferedReader carries Fake'; rc=1 each. Workaround: a program's own stream extends `WriteStream` or `ReadStream`.
- The notes gained: (`Library/FortressLibrary.fss:2072-2092`, at 046c410c43) has a `comprises` clause, since their native objects are private to `FortressBuiltin` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:535`, `:540`);; they lost: (`Library/FortressLibrary.fss:1983-2003`) has a `comprises` clause, unlike `ZZ32`'s `comprises { Int }`, since their native objects are private to `FortressBuiltin` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:807`, `:812`);

## Row 959, noted

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value: neither library declares `IntLiteral`, and `typecase v of IntLiteral => ... ZZ32 => ... end` takes the first arm for a `ZZ32`
- Reproducer: `ProjectFortress/tests/XXXTypecaseUndefinedArmWalk.fss`
- Notes now: The parser makes the arm `Id =>` a `VarType` (`parser/DelimitedExpr.rats:241-248`), and no phase of either path reports the undefined name: on climb batch 29b's merged tree a program of that `typecase` compiles and runs, 'the IntLiteral arm', 'PASS', and walk prints the same. Met when `IntLiteral` left the one library: `tests/IntegerConversionsWalk.fss`'s `shown` printed '-2147483648 : IntLiteral' for the `ZZ32` -2^31, until the arms were removed. A type name elsewhere, as `theType[\IntLiteral\]()`, is refused: 'IntLiteral is undefined.' The one library's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` name no type, so under walk an arm `Int` takes `1.5` and `"s"`.
- The notes gained: The one library's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` name no type, so under walk an arm `Int` takes `1.5` and `"s"`.

## Row 992, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path an object that implements, at a tuple type, a method that its generic trait declares over a type parameter fails the JVM's …
- Claim at the base: on the compiled path an object that implements, at a tuple type, a method that its generic trait declares over a type parameter fails the JVM's verification when its class loads: `get(t: (ZZ32, ZZ32))` in `object A2 extends Arr[\ZZ32, (ZZ32, ZZ32)\]` for `get(i: I)`; walk prints 7
- Reproducer: `ProjectFortress/compiler_tests/TupleIndexMethodCompiled.test`
- Notes now: fixed `06cd09470`; full text: history, row 992
- The notes gained: fixed `06cd09470`; full text: history, row 992; they lost: siblings: 832, 819. Under the compiler's prelude at 84f1c37190: 'VerifyError: Bad type on operand stack … PTupleIndex$A2.get(FZZ32, FZZ32) … Type PTupleIndex$A2 (current frame, stack[0]) is not assignable to FZZ32'. The object's method takes the tuple's elements as two JVM parameters, its forwarder to `get?` loads one, and nothing implements the trait's `get(Tuple⟦FZZ32,FZZ32⟧)`. With the verif...

## Row 996, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the order in which the code generator writes a class's methods and a dispatch method's tests follows the JVM's identity hashes, so two compiles of one source can differ in bytes: 18 of `CompilerBuiltin`'s 312 classes differ under another hash mode
- Reproducer: none
- Notes now: siblings: 430, 990. On 832f7d0d91, compile `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` cold twice, the second time with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0`: 18 of 312 classes differ, among them `fortress/CompilerBuiltin$EqualTo` (its `CMP` dispatch tests `Unordered` before `TotalComparison` in one, after in the other); they hold the same methods in another order. Without the flag two compiles of the base's code are equal, 590 of 590 classes; a scratch tree with other code differed from compile to compile (`explorations/compile-ladder/plan-31/probes/probe-y.md`, section 6). No site traced.
- The notes gained: nothing; they lost: Row 990's choice between two copies of a method follows this order.

## Row 1000, rewritten (claim, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-BOUNDED. Class: library bug (library).
- Claim: the one library's `RR64` declares `round(self): ZZ64` once, in its component and not in its api, over a helper that answers `long`; P-68 asks `ZZ` for a float's `round`, which is row 330's
- Claim at the base: the one library's `trait RR64` declares `round(self): ZZ` and its one object `Float` declares `round(self): ZZ64`; `Float`'s runs, so `round` of an `RR64` is a `ZZ64` under walk, and the compiled checker reports nothing for the pair; the api declares no `round` for `RR64`
- Reproducer: `ProjectFortress/tests/RoundHalfEvenRungR.fss`
- Notes now: siblings: 330, 439. `Library/FortressLibrary.fss:548`, at 046c410c43, binds `simpleDoubleArith.doubleRound`; the api's `RR64` (`Library/FortressLibrary.fsi:292-387`) declares no `round`, where `RR32`'s api does (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:114`). Under walk `round(2.5).ilkName` prints `ZZ64`. The reproducer asserts the values, not the type. Not investigated: whether the checker should refuse an object's functional method whose return type is not below the trait's (row 993 holds a getter of that kind).
- The notes gained: `Library/FortressLibrary.fss:548`, at 046c410c43, binds `simpleDoubleArith.doubleRound`; the api's `RR64` (`Library/FortressLibrary.fsi:292-387`) declares no `round`, where `RR32`'s api does (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:114`). Under walk `round(2.5).ilkName` prints `ZZ64`. The reproducer asserts the values, not the type. Not investigated: whether the checker should refuse an object's functional method whose return type is not below the trait's (row 993 holds a getter of that kind).; they lost: By reading `Library/FortressLibrary.fss:479` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:204`, at 832f7d0d91, over a helper that answers `long`; `round(1.5)` printed as a `ZZ64` under walk (`explorations/compile-ladder/plan-31/probes/number-object-merge.md`, obstacle 10). The reproducer asserts the values, not the type. Not investigated: whether the checker should refuse an object's...

## Row 1003, rewritten (claim, class, reproducer, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: design limit (prelude).
- Claim: the compiler's prelude declares each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` as an open trait, not as the one `value object` of P-178 that the one library and walk declare
- Claim at the base: the tree declares each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` twice over, not as the one `value object` of P-178: the one library as a trait that comprises one native object (`Int`, `Long`, `BigNum`, `UnsignedLong`, `Float`), the compiler's prelude as an open trait
- Reproducer: `ProjectFortress/compiler_tests/XXXObjectExtendsZZ32Compiled.test`
- Notes now: siblings: 866, 698, 1000, 542, 959. The prelude's traits: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103`, `:147`, `:210`, `:332`, `:401`, at 046c410c43; a program's object below `ZZ32` compiles against them (row 866). The one library's objects: `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`, walk's values made by the classes of their names (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:459-470`); test `ProjectFortress/tests/NumberTypesAreObjectsWalk.fss`. The prelude's half waits for a probe of the code generator's way (`explorations/coordinator/CLIMB-BATCH-31.md`, fork H2).
- The notes gained: 1000, 542, 959. The prelude's traits: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103`, `:147`, `:210`, `:332`, `:401`, at 046c410c43; a program's object below `ZZ32` compiles against them (row 866). The one library's objects: `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`, walk's values made by the classes of their names (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:459-470`); test `ProjectFortress/tests/NumberTypesAreObjectsWalk.fss`. The prelude's half waits for a probe of the code generator's way (`explorations/coordinator/CLIMB-BATCH-31.md`, fork H2).; they lost: 551, 997, 998, 1000, 542, 959. `Library/FortressLibrary.fss:383-386`, `:775-777`, `:877-879`, `:986-988`, `:1088-1090`; the objects, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:61`, `:379`, `:388`, `:533`, `:544`; the prelude, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103`, `:147`, `:210`, `:332`, `:401`. The probe merged the five in a scratch tree at 832f7d0d91: 12 files, 258...

## Row 1014, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: compiled, a numeral that ends a block after a local declaration, in a function declared to return `ZZ32`, links and dies at run time with …
- Claim at the base: compiled, a numeral that ends a block after a local declaration, in a function declared to return `ZZ32`, links and dies at run time with `NoClassDefFoundError: fortress/CompilerBuiltin$v`: `four(): ZZ32 = do`, `k: ZZ32 = 3`, `4`, `end` on four lines
- Reproducer: `ProjectFortress/compiler_tests/NumeralEndsBlockAfterDeclarationCompiled.test`
- Notes now: fixed `d3095ca77`; full text: history, row 1014
- The notes gained: fixed `d3095ca77`; full text: history, row 1014; they lost: siblings: 957. The same on db352c1776 and at e5c519a425. A block that ends in the variable, `k`, runs, and so does `do`, `println("h")`, `4`, `end`, a statement before the numeral. So the failure is the numeral's coercion at the block's expected type after a declaration; the class named is the coercion's `nat v` parameter. The code generator was not read. Workaround: end the block with a variable.

## Row 1030, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path a function whose body is a block that ends in a tuple with a numeral element, at a declared tuple return type, fails at run time: …
- Claim at the base: on the compiled path a function whose body is a block that ends in a tuple with a numeral element, at a declared tuple return type, fails at run time: `pair(k: ZZ32): (ZZ32, ZZ32) = do (1, k) end`, 'NoClassDefFoundError: fortress/CompilerBuiltin$v' in `coerce_ZZ32`; walk gives the pair
- Reproducer: `ProjectFortress/compiler_tests/BlockEndsInTupleOfNumeralCompiled.test`
- Notes now: fixed `d3095ca77`; full text: history, row 1030
- The notes gained: fixed `d3095ca77`; full text: history, row 1030; they lost: It fails so at db352c1776. The same tuple as the whole body, `flat(k: ZZ32): (ZZ32, ZZ32) = (1, k)`, runs, and so does a tuple of numerals alone in a block. The stack names the numeral's coercion called as a function value, `coerce_ZZ32[\1,10,1\]` as an arrow from `NaturalNumeral[\n,r,v\]`, so the block's tuple seems to convert by the tuple coercion with the numeral's coercion uninstantiated; n...

## Row 1031, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a tuple binding with declared types whose right side is an `if` with tuple branches stops the code generator: `(m, n): (ZZ32, ZZ32) = if flag then (1, …
- Claim at the base: a tuple binding with declared types whose right side is an `if` with tuple branches stops the code generator: `(m, n): (ZZ32, ZZ32) = if flag then (1, 2) else (3, 4) end`, 'Error trying to close method scope' in a block, an `ArrayIndexOutOfBoundsException` of ASM's `Frame.merge` at the top level
- Reproducer: `ProjectFortress/compiler_tests/TupleBindingIfBranchesCompiled.test`
- Notes now: fixed `d3095ca77`; full text: history, row 1031
- The notes gained: fixed `d3095ca77`; full text: history, row 1031; they lost: siblings: 340, 819. The local form fails so at db352c1776. Without declared types the same binding compiles and prints 3, local and top-level, and so does `(m, n): (ZZ64, ZZ32) = if flag then two() else two() end`; a single `x: ZZ64 = if flag then 1 else 3 end` compiles. So the fault needs the declared tuple type pushed into branches that are tuple expressions; the mechanism was not traced. Wal...

## Row 1044, noted

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk loads a plain declaration on an object type that writes no return type beside a generic one whose result its body's type is not below: `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = "two"` loads and prints `two`
- Reproducer: `ProjectFortress/tests/XXXGenericBesidePlainObjectNoReturnTypeWalk.fss`
- Notes now: siblings: 785, 697, 587. Walk has no type for a body, and reads an unwritten return type as `Any` (`interpreter/evaluator/values/Simple_fcn.java:38`, at fcdf7bc2da), so the load check does not judge such a declaration by the Return Type Rule where its domain is an object type inside the generic's (`writesReturnType`, `values/OverloadedFunction.java:862`); over a trait type it refuses every such pair, the valid ones too (row 785). The checker refuses the pair: 'the return type of NN32->String ... should be a subtype of the return type of [\T extends Number\]T->ZZ32'. Walk only. Workaround: write the return type. So too at `ZZ64` and the other number objects: `pick(a: ZZ64) = 2` loads.
- The notes gained: So too at `ZZ64` and the other number objects: `pick(a: ZZ64) = 2` loads.

## Row 1054, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path an object's dotted method overloaded at a pair parameter and at another type fails the JVM's verification in its dispatch method: `get(t: (ZZ32, ZZ32))` beside `get(s: String)` in `object Pairs`; walk prints 12 and 99
- Reproducer: ProjectFortress/compiler_tests/XXXOverloadedMethodTupleParameterCompiled.test
- Notes: siblings: 992, 397. 'VerifyError: Bad local variable type … Pairs.get(Lfortress/AnyType$Any;)…FZZ32; @21: aload_2': the dispatch method that `generateTopLevelOverloads` writes for the object (`compiler/codegen/CodeGen.java:5129-5133` at f0c76ac804) takes one value, and its arm for the pair loads two locals, one for each element. Alike on the base 647163a9c4 and after rung T, and with a generic trait over the pair above the object. Workaround: two names, or the pair's elements as two parameters.

## Row 1055, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path an object whose one value parameter has a tuple type dies when it is constructed, `ClassCastException` in its constructor: `Holder((1, 2)).pr` for `object Holder(pr: (ZZ32, ZZ32))`; walk gives the pair
- Reproducer: ProjectFortress/compiler_tests/XXXObjectTupleValueParameterCompiled.test
- Notes: siblings: 397, 992. 'ClassCastException: class …FZZ32 cannot be cast to class AnyTuple⟦2⟧ … at Holder.<init>(…:4)': the factory passes the pair's elements as two JVM parameters (`compiler/codegen/CodeGen.java:4824` at 647163a9c4, 'if only a single parameter which is a tuple, signature will give them individually'), and the constructor casts the first to the tuple. Alike on the base and after rung T, with `var pr` too. Workaround: a second value parameter, as `object Holder(n: ZZ32, var pr: (ZZ32, ZZ32))`, which runs.

## Row 1056, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a generic operator whose one parameter has its type parameter's type, applied to a tuple, compiles and dies at the call, `NoSuchMethodError`: `pr!!` for `opr (x: T)!![\T\] : T = x`, `pr = (1, 2)`; walk gives the pair
- Reproducer: ProjectFortress/compiler_tests/XXXGenericOperatorTupleOperandCompiled.test
- Notes: siblings: 819, 832, 339. The call passes the pair's elements (`CodeGen.forOpExpr`, rung T) to `the_function(FZZ32, FZZ32)` of the instance class `postfix !!⟦Tuple⟦FZZ32,FZZ32⟧⟧`, which has no such method; the class loader makes the twin of the elements only for a method that is not static (`runtimeSystem/Instantiater.java:131`). On the base 647163a9c4 the compile stopped instead, 'NegativeArraySizeException: -1' in `ManglingMethodVisitor.visitMaxs`. At a number, `5!!` runs on both.

## Row 1057, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, two generic dotted methods of one name and one static parameter that differ in their number of parameters fail at a call, 'Cannot find definition for method tk given receiver Two': `tk[\U\](y: U, z: U)` beside `tk[\U\](y: U, z: U, w: U)` in `object Two`
- Reproducer: ProjectFortress/tests/XXXGenericMethodOverloadArity.fss
- Notes: siblings: 744, 760. The message is written at `interpreter/evaluator/values/DottedMethodApplication.java:106` at 647163a9c4. Alike with the static argument written and inferred, and where one overload's one parameter is a pair, `tk[\U\](y: (U, U))`. The compiled path runs the pair without a tuple on the base and after rung T, 2 and 3, and the form with the pair after rung T's skeptic's fix (`compiler_tests/GenericMethodTupleParameterCompiled.test`). Workaround: two names.

## Row 1058, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk refuses at load a plain declaration at an object type inside a generic one whose result is a tuple holding its type parameter, 'fails the Return Type Rule', a valid pair: `pt[\T extends Number\](a: T): (T, ZZ32)` beside `pt(a: Dot): (Dot, ZZ32)`, `object Dot extends Number`
- Reproducer: `ProjectFortress/tests/XXXGenericBesidePlainTupleReturnWalk.fss`
- Notes: siblings: 550, 1048. The reading at object arguments takes a returned type parameter only (`returnRuleAtObjectArguments`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:895`, at 2d11d508d3); tuple types are covariant (`basic/types-vals-vars.tex`, "Tuple Types"), so `(Dot, ZZ32)` lies below `(T, ZZ32)` at every instance whose `T` holds a `Dot`. The compiled path compiles and runs the pair, printing `PASS`. So too at the one library's `RR64`, an object after climb batch 31b's rung O: `pt(a: RR64): (RR64, ZZ32)` is refused, as it was at the trait. A list result, `List[\T\]`, is invariant, and its refusal is right.

## Row 1059, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: on the compiled path, until the switch-over, the prelude's `RR32` and `RR64` declare no `=/=`, so the checker refuses `c =/= 0` for `c: RR32 = 0`, and for an `RR64` zero, 'Could not check call to operator NE', where walk answers `false`
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralNotEqualsFloatCompiled.test`
- Notes: siblings: 528. At 647163a9c4 the prelude's `RR32` declares only its two numeral coercions (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:955-958`), its `RR64` no `=/=` (`:893-953`), and `Equality` only `=` (`Library/CompilerAlgebra.fss:25-27`), where each integer type declares its own `=/=` (`CompilerBuiltin.fss:784`, `:850`). Walk answers `false` at `RR32` (`ProjectFortress/tests/NotEqualNumeral.fss`). P-37 adds no prelude declaration: it ends at the switch-over, which turns the test red. Workaround: at `RR64`, `NOT (r = 0)`; at `RR32`, bind `r: RR64 = c` first, since `c = 0` meets row 528.

## Row 1060, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: compiled, a numeral that ends a block after a local declaration, at a binding without a declared type, keeps its numeral type, so a later conversion of the variable dies: `x = do`, `k: ZZ32 = 3`, `4`, `end`, then `y: ZZ32 = x`, 'NoClassDefFoundError: fortress/CompilerBuiltin$v'
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralEndsUntypedBlockCompiled.test`
- Notes: siblings: 1014. The checker's default at a place that fixes no type (`defaultNumeral`, `joinNumerals` and `tupleJoin`, `scala_src/typechecker/impls/Functionals.scala:1259-1331` at 7fb38bbe30) has no case for a `LocalVarDecl` or a `LetFn`, so `x` is a `NaturalNumeral[\1,10,4\]`: `println(x)` prints 4, and `y: ZZ32 = x` calls the coercion as a function value. The same block ending in `(1, k)`, bound and taken apart, dies with a `ClassCastException` of an `FZZ32` to a numeral type. Walk prints 4 for both. At a declared type the numeral converts where it stands (`NumeralEndsBlockAfterDeclarationCompiled`). Workaround: declare the binding's type.
