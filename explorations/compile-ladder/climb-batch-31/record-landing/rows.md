<!-- The record-landing workflow's evidence of the gap ledger: each row that c1ce2a35e..abb18ec0a opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- closed as FIXED: 81, 319, 542, 571, 695, 732, 875, 990, 991, 997, 998
- noted: 112, 340, 890
- rewritten: 115, 322, 550, 573, 641, 1036
- opened: 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 81, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: `label` / `exit` is unimplemented in the code generator
- Reproducer: `ProjectFortress/compiler_tests/LabelExitCompiled.test`
- Notes now: fixed `3f7fd7281`; full text: history, row 81
- The notes gained: fixed `3f7fd7281`;; they lost: `Can't compile Label` (`CodeGen.sayWhat`). `CodeGen` declares no `forLabel` or `forExit`, so the node reaches `defaultCase`, which throws `sayWhat` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1674-1676`, `:1558-1561`). Workaround: write the loop without `exit`, as a `while` over a mutable flag. Probe `explorations/compiler-probes/p31.fss` (a `label L` round a `seq` loop...

## Row 112, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: a `value` object may declare a `var` field: walk accepts it, mutates it in place, and the object then aliases like a reference object
- Reproducer: none
- Notes now: `value object Counter(var n: ZZ32)` with `n := n + 1` prints `built Counter(1)` / `after bump Counter(2)`, with no diagnostic at any phase. After `d = c` and `c.bump()`, `c = VCounter(2) d = VCounter(2)`, so the licence to copy value objects is not taken either. Nothing enforces the valueness of objects; the trait rule is enforced (row 115). Probes `explorations/run-b2/probes/g1a_varfield.fss`, `g1a_copy.fss`, in the parent of `22ea0cd90`; The compiled path compiles it too: `value object V(var n: ZZ32)` runs; with a `var` field kept in a cell, `V(1) === V(1)` is `false` (`true` before): `SEQV` compares cells by identity (`nativeHelpers/equalityRule.java:83`). full text: history, row 112
- The notes gained: The compiled path compiles it too: `value object V(var n: ZZ32)` runs; with a `var` field kept in a cell, `V(1) === V(1)` is `false` (`true` before): `SEQV` compares cells by identity (`nativeHelpers/equalityRule.java:83`).

## Row 115, rewritten (reproducer, notes)

- Section: 3. Traits, objects and components. Status: POSITIVE-VERIFIED. Class: —.
- Claim: value traits work, and a reference object extending a value trait is rejected: the trait rule is the one valueness rule that is enforced
- Reproducer: `ProjectFortress/tests/NonValueBelowValueTypeWalk.fss`
- Notes now: The good case runs (`a.area + b.area = 18.0`, `Sq(3.0) SEQV Sq(3.0) = true`), though both instances print as `Shape(area=9.0)`, the inherited getter's rendering; `object Bad(s: RR64) extends Shape` gives `Bad: non-value subtype of value type Shape`. The check passes only the symbolic type of a type parameter (`FTraitOrObject.enforceValueness`, at fcdf7bc2da). The note at the head of `basic/traits.tex` ("Traits") that value traits are not yet supported is stale for this tree. Object valueness is not enforced (row 112). full text: history, row 115
- The notes gained: check passes only the symbolic type of a type parameter (`FTraitOrObject.enforceValueness`, at fcdf7bc2da). The note at the head of `basic/traits.tex` ("Traits") that value traits are not yet supported is stale for this tree. Object valueness is not enforced (row 112).; they lost: note at the head of `basic/traits.tex` ("Traits") that value traits are not yet supported is stale for this tree. Object valueness is not enforced (row 112). Probes `explorations/run-b2/probes/g1a_valtrait.fss`, `g1a_valtrait_bad.fss`, in the parent of `22ea0cd90`;

## Row 319, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a mutable field of an object is outside the transaction on the compiled path: `atomic do n := n + 1 end` on a field loses updates above one thread, …
- Claim at the base: a mutable field of an object is outside the transaction on the compiled path: `atomic do n := n + 1 end` on a field loses updates above one thread, while walk is exact
- Reproducer: `ProjectFortress/compiler_tests/AtomicFieldCompiled.test`
- Notes now: fixed `5a076e9bc`; full text: history, row 319
- The notes gained: fixed `5a076e9bc`;; they lost: `VarCodeGen.MutableFieldVar` reads with a bare `GETFIELD` and writes with a bare `PUTFIELD` on a non-volatile field (`ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:202-231`); walk's `ReferenceCell` holds fields and variables alike (`interpreter/env/ReferenceCell.java:25-29`). Compiled at `FORTRESS_THREADS=4`: 34481 to 38910 of 40000 in five runs; exact at one thread, and...

## Row 322, rewritten (claim, notes)

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: an `atomic do … end` block, a `try … catch` or a `label` block as a call's argument after the first, where the arguments run in order, produces a class that fails verification on the compiled path: `VerifyError`, the stack's size at a branch target
- Claim at the base: an `atomic do … end` block or a `try … catch` as a call's argument after the first, where the arguments run in order, produces a class that fails verification on the compiled path: `VerifyError: Inconsistent stackmap frames at branch target 1`
- Reproducer: `ProjectFortress/compiler_tests/XXXAtomicBlockLaterArgument.test`
- Notes now: siblings: 526. `CodeGen.forAtomicBlock`, `forTry` and `forLabel` branch from a handler, which clears the operand stack, to a label reached with the earlier arguments on it, so each is right only on an empty stack. `two(k, atomic do … end)`, `two(k, try boomVal(k) catch e Boom => e.code end)` and `two(k, label out … end out)` fail when the class loads; the test's `bump`, `caught` and `left`. Not met in an arm of a `do … also`, nor in an argument that forks, which runs in a task on an empty stack (`compiler_tests/AtomicEndsArmCompiled`, `TryInArmRungG`). Walk is right. Workaround: bind the block's value in a statement of its own. full text: history, row 322
- The notes gained: `CodeGen.forAtomicBlock`, `forTry` and `forLabel` branch from a handler, which clears the operand stack, to a label reached with the earlier arguments on it, so each is right only on an empty stack. `two(k, atomic do … end)`, `two(k, try boomVal(k) catch e Boom => e.code end)` and `two(k, label out … end out)` fail when the class loads; the test's `bump`, `caught` and `left`.; they lost: `CodeGen.forAtomicBlock` and `forTry` branch from a handler, which clears the operand stack, to a label reached with the earlier arguments on it (`compiler/codegen/CodeGen.java:1837-1865`, `:2154-2222`, at 728c0fde79), so each is right only on an empty stack. `two(k, atomic do … end)` and `two(k, try boomVal(k) catch e Boom => e.code end)` fail when the class loads.

## Row 340, noted

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a `typecase` that is a function's or method's body, its integer-literal clause values coerced to the declared `ZZ32`, crashes the code generator: 'Error trying to close method scope'
- Reproducer: `ProjectFortress/compiler_tests/XXXTypecaseBodyCoerceRungG.test`
- Notes now: siblings: 498, 526. Two paths reach the coercion at unlike stacks, and ASM's `Frame.merge` fails. Workaround: `do … end` around it. Same crash (walk runs all but the last): an `if` argument coerced to an overloaded method's parameter; a size read in a clause; a named tuple clause spread into a call (`XXXTupleClauseSpreadRungG`); `r = try … end` then `r = -1` (`XXXTryCompareCoerceRungE`); a numeral-valued `try` operand (row 526); a `ZZ32` function's `try` body with a numeral `catch` value; a `label` block whose value joins a numeral with a `ZZ32` (`XXXLabelNumeralValueCompiled`; bind the numeral first). The coercion desugarer's `typecase` binds a pattern name. full text: history, row 340
- The notes gained: Two paths reach the coercion at unlike stacks, and ASM's `Frame.merge` fails. Workaround: `do … end` around it. Same crash (walk runs all but the last): an `if` argument coerced to an overloaded method's parameter; a size read in a clause; a named tuple clause spread into a call (`XXXTupleClauseSpreadRungG`); `r = try … end` then `r = -1` (`XXXTryCompareCoerceRungE`); a numeral-valued `try` operand (row 526); a `ZZ32` function's `try` body with a numeral `catch` value; a `label` block whose value joins a numeral with a `ZZ32` (`XXXLabelNumeralValueCompiled`; bind the numeral first).; they lost: ASM's `Frame.merge` fails under `CodeGen.methodReturnAndFinish` (`CodeGen.java:3477-3481`, c124c6b65), an `Error` at `:2874`; by the dump, two paths reach the coercion at unlike stacks. Workaround: `do … end` around it. Same crash (walk runs all but the last): an `if` argument coerced to an overloaded method's parameter; a size read in a clause; a named tuple clause spread into a call (`XXXTupl...

## Row 542, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker's Return Type Rule refuses a generic declaration beside a plain one whose domain is an object type, a pair the paper's rule …
- Claim at the base: the compiled checker's Return Type Rule refuses a generic declaration beside a plain one whose domain is an object type, a pair the paper's rule accepts: `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, `Circle` an object
- Reproducer: `ProjectFortress/compiler_tests/OverloadReturnObjectDomain.test`
- Notes now: fixed `1ce04203c`; full text: history, row 542
- The notes gained: fixed `1ce04203c`;; they lost: siblings: 853. Refused: 'the return type of Circle->Circle ...'. `satisfiesReturnTypeRule` (`scala_src/overloading/OverloadingOracle.scala:83` at c124c6b65) keeps `T` quantified and checks instances whose domain meet, `Circle ∩ T`, is `Bottom`; the paper quantifies over the instances whose domain is not `Bottom` (`Papers/Types/overloading-check.tick:180`), and below an object type is only the o...

## Row 550, rewritten (claim, spec, notes)

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk refuses at load a plain declaration over a trait type inside a generic one that returns its type parameter, 'fails the Return Type Rule', where the trait comprises one object and so the rule holds: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64`
- Claim at the base: walk refuses at load a plain declaration inside a generic one that returns its type parameter, 'fails the Return Type Rule', where the rule holds over every instance: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64`
- Reproducer: `ProjectFortress/tests/XXXGenericBesidePlainReturnParam.fss`
- Notes now: siblings: 539, 779. Over an object type the load check reads such a pair by the rule: the plain result must lie below an object type that stands at a parameter of the returned type parameter (`returnRuleAtObjectArguments`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:882`, at fcdf7bc2da), so the pair at `NN32` loads (`ProjectFortress/tests/GenericBesidePlainObjectValidWalk.fss`). `ZZ64` is a trait that comprises the one object `Long`; the check reads no `comprises` clause, and below a trait a lower argument selects a lower instance. The pair is valid once `ZZ64` is an object. full text: history, row 550
- The notes gained: Over an object type the load check reads such a pair by the rule: the plain result must lie below an object type that stands at a parameter of the returned type parameter (`returnRuleAtObjectArguments`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:882`, at fcdf7bc2da), so the pair at `NN32` loads (`ProjectFortress/tests/GenericBesidePlainObjectValidWalk.fss`). `ZZ64` is a trait that comprises the one object `Long`; the check reads no `comprises` clause, and below a trait a lower argument selects a lower instance. The pair is valid once `ZZ64` is an object.; they lost: Every instance whose domain holds two `ZZ64` has `T` at or above `ZZ64`. Walk compares the plain one's range with the generic's, its type parameters standing for themselves (`validOnDeclaredDomains`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:772`, at c124c6b65), and `ZZ64` is not below `T`. That reading is sound (it refuses `ProjectFortress/tests...

## Row 571, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the compiled path writes one method twice into an object's class, a `ClassFormatError` at class load, when the object declares the meet of two …
- Claim at the base: the compiled path writes one method twice into an object's class, a `ClassFormatError` at class load, when the object declares the meet of two inherited functional methods whose self parameter is not first, narrower than each in a different parameter
- Reproducer: `ProjectFortress/compiler_tests/FunctionalMethodMeetNarrowedSelfNotFirst.test`
- Notes now: fixed `74f53ec88`; full text: history, row 571
- The notes gained: fixed `74f53ec88`;; they lost: siblings: 564, 565, 566. The checker accepts the program and it links (`FunctionalMethodMeetNarrowedSelfNotFirstLink`). With self second of three the run stops before any output, 'ClassFormatError: Duplicate method name "pick?1" ... in class file SkSelfMid$C'; with self last, "pick?2"; self first, one narrowed parameter, or equal types run; walk prints `C`, `A` (`explorations/compile-ladder/run...

## Row 573, rewritten (claim, notes)

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a compiled call of a functional method with self not first, overloaded in an object by its own declarations beside inherited ones, tests and casts the receiver in place of an argument in the object's dispatch method and dies with `ClassCastException`
- Claim at the base: a compiled call of a functional method with self last, overloaded in an object by its own declarations beside an inherited one, casts an argument to the wrong parameter type and dies with `ClassCastException`
- Reproducer: `ProjectFortress/compiler_tests/XXXFunctionalMethodOverloadSelfLast.test`
- Notes now: Self last: `C extends A` declares `pick(n: N1, s: S0, self)` and `pick(n: N1, s: S1, self)` beside `A`'s `pick(n: N0, s: S1, self)`; `pick(N1o, S0o, C)` dies '...$C cannot be cast to class ...$N1'. Self second: `compiler_tests/XXXFunctionalMethodCoverSelfSecond` (`Pq extends { P, Q }` covers `mark(x: Ka, self)` and `mark(x: Kb, self)` by two of its own) dies '...$Pq cannot be cast to class ...$Ka'. Walk runs both; self first passes. Site: the dispatch method `mark?1(Any)` of the object's class loads `aload_0`, the receiver, for its type test and cast, where the argument is `aload_1` (`OverloadSet.TraitOrObjectFactory`). full text: history, row 573
- The notes gained: Self last: `C extends A` declares `pick(n: N1, s: S0, self)` and `pick(n: N1, s: S1, self)` beside `A`'s `pick(n: N0, s: S1, self)`; `pick(N1o, S0o, C)` dies '...$C cannot be cast to class ...$N1'. Self second: `compiler_tests/XXXFunctionalMethodCoverSelfSecond` (`Pq extends { P, Q }` covers `mark(x: Ka, self)` and `mark(x: Kb, self)` by two of its own) dies '...$Pq cannot be cast to class ...$Ka'. Walk runs both; self first passes. Site: the dispatch method `mark?1(Any)` of the object's class loads `aload_0`, the receiver, for its type test and cast, where the argument is `aload_1` (`OverloadSet.TraitOrObjectFactory`).; they lost: It links (`FunctionalMethodOverloadSelfLastLink`). Object `C extends A` declares `pick(n: N1, s: S0, self)` (`C0`) and `pick(n: N1, s: S1, self)` (`C1`) beside `A`'s `pick(n: N0, s: S1, self)`. The run prints `REACHED`, then dies on `pick(N1o, S0o, C)`, whose one applicable declaration is `C0`: 'ClassCastException: class ...$C cannot be cast to class ...$N1'; walk runs `C1`, `C0`. With self fir...

## Row 641, rewritten (claim, notes)

- Section: 15. Performance and program shape. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: compiled code calls `BaseTask.inATransaction()` before every read and write of a mutable local, top-level variable or `var` field, outside `atomic` too: about 1 to 2 ns a check, 64 % of a loop over an array with mutable locals (7 checks an element), 9 to 15 % of a scalar accumulator loop
- Claim at the base: compiled code calls `BaseTask.inATransaction()` before every read and write of a mutable local or top-level variable, outside `atomic` too: about 1 to 2 ns a check, 64 % of a loop over an array with mutable locals (7 checks an element), 9 to 15 % of a scalar accumulator loop
- Reproducer: `explorations/perf-probes/transactions/run.sh`
- Notes now: Emitted by `compiler/codegen/VarCodeGen.java`: `LocalMutableVar` (a local), `MutableTaskVarCodeGen` (a variable captured by a task) and `MutableStaticBinding` (a top-level `var`; through `MutableFieldVar` an object's `var` field, whose cell the object holds), not by `MutableFValue`; an immutable field has no check. Measured on `8f0bc7389` at one thread by a shadow of `inATransaction()` returning `false`: TxArray 23.17 against 8.39 ns an element, TxScalar 20.42 against 18.67 ns. Not measured: four threads, code inside `atomic`, microGPT, a `var` field. Compiled path only: under walk `TxArray.fss` stops at load, `ZZ32Vector is undefined.` `explorations/perf-probes/transactions/REPORT.md`.
- The notes gained: `compiler/codegen/VarCodeGen.java`: `LocalMutableVar` (a local), `MutableTaskVarCodeGen` (a variable captured by a task) and `MutableStaticBinding` (a top-level `var`; through `MutableFieldVar` an object's `var` field, whose cell the object holds), not by `MutableFValue`; an immutable field has no check. Measured on `8f0bc7389` at one thread by a shadow of `inATransaction()` returning `false`: TxArray 23.17 against 8.39 ns an element, TxScalar 20.42 against 18.67 ns. Not measured: four threads, code inside `atomic`, microGPT, a `var` field.; they lost: `compiler/codegen/VarCodeGen.java:483-546` (a local), `:620-726` (a local captured by a task) and `:326-362` (a top-level `var`), not by `MutableFValue`; a mutable field (`MutableFieldVar`, `:202-236`) has no check. Measured on `8f0bc7389` at one thread by a shadow of `inATransaction()` returning `false`: TxArray 23.17 against 8.39 ns an element, TxScalar 20.42 against 18.67 ns. Not measured: f...

## Row 695, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a compiled default body that returns `self` as its trait's self-type parameter dies at class load, `VerifyError: Bad return type`, where that …
- Claim at the base: a compiled default body that returns `self` as its trait's self-type parameter dies at class load, `VerifyError: Bad return type`, where that parameter is an object type: `twin(self): S = self` in `trait Shape[\S extends Shape[\S\]\]`, for `object Pt extends Shape[\Pt\]`
- Reproducer: `ProjectFortress/compiler_tests/SelfTypeReturnSelfRun.test`
- Notes now: fixed `6df780a7d`; full text: history, row 695
- The notes gained: fixed `6df780a7d`; full text: history, row 695; they lost: siblings: 365. The body returns the trait-typed `self` with no cast. The checker accepts it (P-146, F-225), so a compiled program that runs it fails: `XXXSelfTypeReturnSelfRun` prints `REACHED`, then dies in `Shape[\Pt\]`'s `$DefaultTraitMethods.twin`; `SelfTypeReturnSelfRunLink` links it. At a trait type it runs, the verifier not checking a return of an interface type: `SelfTypeReturnSelfAtTra...

## Row 732, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator gives an object no forwarder for a method body that it inherits from an imported api's trait that is not first in its extends …
- Claim at the base: the code generator gives an object no forwarder for a method body that it inherits from an imported api's trait that is not first in its extends clause, so a call of that method on the object dies with `AbstractMethodError`
- Reproducer: `ProjectFortress/compiler_tests/ApiTraitMethodNotFirstCompiled.test`
- Notes now: fixed `74f53ec88`; full text: history, row 732
- The notes gained: fixed `74f53ec88`; full text: history, row 732; they lost: siblings: 733. `dumpMethodChaining` forwards only a declaration with a body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:968`, at c124c6b65), and an imported api trait's methods come from the api, which gives no body; the first extended trait's come through the class hierarchy (`:934-940`). Probe: api `Q1ApiB` with `trait B pick(self): String end`, its component giving t...

## Row 875, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator refuses Library/OneShotFlag.fss's object OneShot, 'Can't compile AtomicExpr', at its method tryOnce, an atomic expression over its …
- Claim at the base: the code generator refuses Library/OneShotFlag.fss's object OneShot, 'Can't compile AtomicExpr', at its method tryOnce, an atomic expression over its var field (Library/OneShotFlag.fss:18)
- Reproducer: `ProjectFortress/compiler_tests/AtomicExprCompiled.test`
- Notes now: fixed `5a076e9bc`; full text: history, row 875
- The notes gained: fixed `5a076e9bc`; full text: history, row 875; they lost: Measured on the library only, by the code generator per declaration with the checker's failures caught (codegen.sh); OneShotFlag is one of the two components that List imports, outside F-34's twelve. Not reproduced apart from the library. By reading: CodeGen compiles a do-block marked atomic (compiler/codegen/CodeGen.java:1733-1767 at 25238e60c) and has no case for the AtomicExpr node, which de...

## Row 890, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a `try`'s `finally` clause does not run when an exception leaves the `try` block: one that no `catch` clause takes is passed on, and one the `forbid` clause lists is thrown on as a `ForbiddenException`, both before the `finally` clause runs
- Reproducer: `ProjectFortress/compiler_tests/XXXFinallyOnEscape.test`
- Notes now: siblings: 891. `CodeGen.forTry` emits the `finally` block only after the label that the body's normal completion and a taken `catch` clause reach; the rethrow (`ATHROW`) and `throwForbiddenException` throw before it (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2078-2089` at c124c6b65). A `catch` that misses and a `finally` that appends to a log leave the log empty; a listed `forbid` type takes the same order. Walk prints `finally` (`tests/FinallyOnEscapeWalk.fss`). Link test: `compiler_tests/FinallyOnEscapeLink.test`. No workaround is recorded. An `exit` that leaves the `try` for an enclosing `label` passes the `finally` clause too (the test's `exits`); walk runs it.
- The notes gained: An `exit` that leaves the `try` for an enclosing `label` passes the `finally` clause too (the test's `exits`); walk runs it.

## Row 990, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path a generic trait that gives a body to a method which it also inherits with a body from an extended generic trait that is not its …
- Claim at the base: on the compiled path a generic trait that gives a body to a method which it also inherits with a body from an extended generic trait that is not its first gets the method twice in its class, a `ClassFormatError` at class load: 'Duplicate method name "mx?0"' in `Tord[\Z\]`'s class
- Reproducer: `ProjectFortress/compiler_tests/TraitOwnMethodBesideInheritedCompiled.test`
- Notes now: fixed `74f53ec88`; full text: history, row 990
- The notes gained: fixed `74f53ec88`; full text: history, row 990; they lost: siblings: 571, 565, 732. Under the compiler's prelude at 84f1c37190: `trait Tord[\T\] extends { Pord[\T\], Mmx[\T\] }` declares `mx(self, other: T): T` with a body, as `Mmx[\T\]` does; the compile exits 0 and the run dies before any output, '… in class file PDupMethod3$Tord⟦Z⟧$DefaultTraitMethods'; walk prints 2, -1, true, false. Without `Tord`'s own `mx` it runs. It is the rehearsal's W6: 27 c...

## Row 991, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path a value typed by a trait with a `comprises` clause, passed where the one listed object type is expected, fails the JVM's …
- Claim at the base: on the compiled path a value typed by a trait with a `comprises` clause, passed where the one listed object type is expected, fails the JVM's verification when the class loads: `den(self)` in `trait Q comprises { R }` for `den(r: R)`; the checker accepts it and walk prints `true`
- Reproducer: `ProjectFortress/compiler_tests/ComprisesValueAtListedTypeCompiled.test`
- Notes now: fixed `6df780a7d`; full text: history, row 991
- The notes gained: fixed `6df780a7d`; full text: history, row 991; they lost: siblings: 307, 695, 815. Under the compiler's prelude at 84f1c37190: 'VerifyError: Bad type on operand stack … PComprisesCast$Q$DefaultTraitMethods.fin … Type PComprisesCast$Q (current frame, stack[0]) is not assignable to PComprisesCast$R'. The code generator emits no cast where the checker lets the trait's value stand for the listed type (P-60); `CodeGen.conditionallyCastParameter` (`compiler...

## Row 997, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk a generic method of a trait, whose type parameter's bound is the trait's static parameter, stops at an instance at a value object: …
- Claim at the base: under walk a generic method of a trait, whose type parameter's bound is the trait's static parameter, stops at an instance at a value object: `Holder[\RR32\]().held()`, for `held[\T extends S\]()` in `Holds[\S\]`, ends 'T@...: non-value subtype of value type RR32'
- Reproducer: `ProjectFortress/tests/TraitGenericMethodValueBoundWalk.fss`
- Notes now: fixed `b6fb208e2`; full text: history, row 997
- The notes gained: fixed `b6fb208e2`; full text: history, row 997; they lost: siblings: 115, 762. `FTraitOrObject.enforceValueness` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:97-104`, at 832f7d0d91) reads the symbolic type that walk makes for `T`, which extends its bound, as a type that is not a value type below a value type. It runs at `ZZ64`, a trait (`ProjectFortress/tests/TraitGenericMethodInference.fss:62`); a function's o...

## Row 998, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: walk's load check loads a generic declaration beside a plain one over an object type whose return type breaks the Return Type Rule: `pickFirst[\T …
- Claim at the base: walk's load check loads a generic declaration beside a plain one over an object type whose return type breaks the Return Type Rule: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: NN32, b: NN32): String` loads and prints `plain`; at `ZZ64`, a trait, walk refuses it
- Reproducer: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`
- Notes now: fixed `b6fb208e2`; full text: history, row 998
- The notes gained: fixed `b6fb208e2`; full text: history, row 998; they lost: siblings: 697, 788, 550. Row 697's cause for a generic beside a plain declaration: the parameter-by-parameter check calls the two lists excluding where they differ at an object type (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:511`, at 832f7d0d91), and the reading on declared domains runs only for a pair that this check refuses (`validOnDeclaredDom...

## Row 1036, rewritten (reproducer, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a generic function returned at a declared arrow return type, or bound to an object's field declared with an arrow type, stays generic and is not its instance at that type: for `pick(): Vector[\RR64,3\] -> Vector[\RR64,3\] = half`, `pick()(w)` runs for a `w: Vector[\RR64,2\]`
- Reproducer: `ProjectFortress/tests/XXXGenericFunctionArrowReturnWalk.fss`
- Notes now: siblings: 1019, 387. The test holds the return form; the field form, `g: Vector[\RR64,3\] -> Vector[\RR64,3\] = half` in an object's body, is `explorations/compile-ladder/plan-31/probes/planner/PArrowField.fss`, and both print 'ran at size 2' at fcdf7bc2da. Walk receives the instance only at a parameter, a typed local variable and an assignment (the calls of `Fcn.received`: `interpreter/evaluator/BaseEnv.java:333`, `:614`; `values/NonPrimitive.java:273`), and applies no declared return type (row 387). Compiled, the checker refuses the call (`PArrowRetC.fss` there).
- The notes gained: The test holds the return form; the field form, `g: Vector[\RR64,3\] -> Vector[\RR64,3\] = half` in an object's body, is `explorations/compile-ladder/plan-31/probes/planner/PArrowField.fss`, and both print 'ran at size 2' at fcdf7bc2da. Walk receives the instance only at a parameter, a typed local variable and an assignment (the calls of `Fcn.received`: `interpreter/evaluator/BaseEnv.java:333`, `:614`; `values/NonPrimitive.java:273`), and applies no declared return type (row 387). Compiled, the checker refuses the call (`PArrowRetC.fss` there).; they lost: Both forms print 'ran at size 2' at c0c35b4f9e: `PArrowRet.fss`, and `PArrowField.fss` beside it, a field `g: Vector[\RR64,3\] -> Vector[\RR64,3\] = half` in an object's body. Walk receives the instance only at a parameter, a typed local variable and an assignment (the calls of `Fcn.received`: `interpreter/evaluator/BaseEnv.java:333`, `:614`; `values/NonPrimitive.java:273`), and applies no decl...

## Row 1037, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses an object that reaches a generic trait's method along two paths, one of them through a trait that declares the method again at the same parameter types, and accepts the same object where the traits have no static parameters; walk runs the lower trait's declaration
- Reproducer: `ProjectFortress/compiler_tests/TraitMethodDiamondRedeclaredCompiled.test`
- Notes: siblings: 990. Plain: `trait Top m(): String = "Top" end`, `trait Plain extends Top end`, `trait Again extends Top m(): String = "Again" end`, `object O extends { Plain, Again } end` compiles and prints `Again`, on c1ce2a35e1 and after rung M, in each order of the extends clause; the test asserts it. Generic: `P[\T extends P[\T\]\]` with `m(o: T)`, `A[\T\]` and `B[\T\]` below it, `B` declaring `m(o: T)` again, `object O extends { A[\O\], B[\O\] }`: 'There are multiple declarations of m with the same parameter type: (O)'; walk prints `B`. Which answer the traits chapter gives is not decided: by its text `O` inherits both declarations.

## Row 1038, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a compiled call of an object's own functional method with self not first, beside an inherited one over a wider parameter type, runs the object's declaration for every argument where the receiver itself has the own declaration's parameter type, with no error
- Reproducer: `ProjectFortress/compiler_tests/XXXFunctionalMethodSelfSecondReceiverTested.test`
- Notes: siblings: 573, 571. `object Pq extends { K, P }` declares `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`: `mark(1, Pq)` and `mark("s", Pq)` answer 3 where walk answers 1; with self first both paths answer 1. It is row 573's site, the dispatch method's type test on `aload_0`, the receiver, which here passes. On c1ce2a35e1 the class did not load ('Duplicate method name "mark?1"', row 571); since rung M it loads and answers wrongly.

## Row 1039, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: an `exit` out of an `atomic` block to an enclosing `label` loses the block's writes on both paths: after `label done`, `atomic do`, `g := 7`, `exit done`, `end`, `end done`, the top-level `g` is still 0
- Reproducer: `ProjectFortress/compiler_tests/XXXExitOutOfAtomicCompiled.test`
- Notes: siblings: 81. The specification retains the writes of a block that an exit leaves. Compiled, the block's handler takes every abrupt completion and `BaseTask.leaveTransaction` ends the transaction without a commit for whatever is not an abort (`runtimeSystem/BaseTask.java:285-314`); the exit is a `LabelExit` thrown through it. Walk prints 0 too (`tests/XXXExitOutOfAtomicWalk.fss`). Link test: `compiler_tests/ExitOutOfAtomicCompiledLink.test`. A label and its exit inside one block are right (`compiler_tests/LabelExitCompiled`). Workaround: set a flag in the block and exit after it.

## Row 1040, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a `catch` clause of `Exception`, in a `try` between an `exit` and its `label`, takes the exit: the clause's body runs and the label block goes on after the `try`; compiled, the exit passes the clause
- Reproducer: `ProjectFortress/tests/XXXExitThroughCatchWalk.fss`
- Notes: siblings: 81. `leave(1)` of the test gives 101 for 1 and counts one catch. Walk's `try` offers an exit that passes it to the `catch` clauses as the library's object `LabelException`, an `UncheckedException` (`interpreter/evaluator/Evaluator.java:1453-1456`; `Library/FortressLibrary.fsi:1234`). The specification names no `LabelException`: an exit completes abruptly until its label takes it, and only `finally` clauses run on the way. Compiled, the exit is no `FException`, the only class a `try` catches (`compiler_tests/LabelExitCompiled`, `throughTry`). Workaround: keep the exit out of a `try` that catches `Exception`.

## Row 1041, opened

- Section: 11. Parallelism, exceptions and control flow. Status: CONTESTED. Class: implementation gap (codegen).
- Claim: an `exit` that runs after its `label` block has completed, from a function made in the block and kept, ends a compiled program with an uncaught `LabelExit`; under walk a `try` around the call catches it as `LabelException`
- Reproducer: `ProjectFortress/compiler_tests/ExitAfterLabelCompletedCompiled.test`
- Notes: siblings: 81. The specification scopes an exit's target statically and says nothing of a label block that is no longer being evaluated. Compiled: 'com.sun.fortress.runtimeSystem.LabelExit: exit from a label block that has completed', exit status 1; no `catch` clause takes it. Walk: without a `try`, 'exit from nonexistent label block gone'; with `catch e LabelException`, the clause runs (`interpreter/evaluator/Evaluator.java:1453-1456`). Both libraries declare `LabelException` (`Library/CompilerLibrary.fss:191`), and the code generator never throws it. Unsettled: whether such an exit is a `LabelException` that a program may catch.

## Row 1042, opened

- Section: 11. Parallelism, exceptions and control flow. Status: CONTESTED. Class: implementation gap (walk).
- Claim: the paths differ on which evaluation of a `label` block an `exit` leaves where the block is evaluated again inside itself: compiled, the evaluation in which the exit's function was made; under walk, the innermost one running, matched by the label's name
- Reproducer: `ProjectFortress/compiler_tests/LabelEvaluationIdentityCompiled.test`
- Notes: siblings: 81. A recursive `descend` whose body is `label here`: the function `fn () => exit here with 100`, made at depth 2 and called at depth 0, gives 102 compiled and 104 under walk. Walk's `forLabel` takes any exit of its name (`interpreter/evaluator/Evaluator.java:628-645`); `CodeGen.forLabel` gives each evaluation an identity. The specification scopes the target statically, and says that a label completes normally where its body completes abruptly with an exit whose target is its name, which the innermost evaluation's body does. Unsettled: which reading stands; the test asserts the compiled answer.

## Row 1043, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker does not carry a declared type into the body of an atomic expression: `f(): ZZ32 = atomic if c then 1 else 0 end` is refused, 'NaturalNumeral cannot be written in a program except as a parameter's type.', and `atomic 1` there compiles to a class that fails verification
- Reproducer: `ProjectFortress/compiler_tests/XXXAtomicExprNumeralArms.test`
- Notes: siblings: 322. The checker's join of numerals in result positions has cases for a block, `do`, `if`, `case` and `try` and none for `AtomicExpr` (`scala_src/typechecker/impls/Functionals.scala:1304-1356`, `impls/Misc.scala:451-454`, at c1ce2a35e1), so numeral arms keep their numeral types, and a lone numeral is converted outside the expression: the coercion's function is on the stack when the transaction starts, row 322's cause (`compiler_tests/XXXAtomicExprNumeralBody.test`, `VerifyError: Inconsistent stackmap frames at branch target 3`). `atomic do … end` over the same bodies compiles and runs; walk runs all four. Workaround: write the `do` block.

## Row 1044, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk loads a plain declaration on an object type that writes no return type beside a generic one whose result its body's type is not below: `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = "two"` loads and prints `two`
- Reproducer: `ProjectFortress/tests/XXXGenericBesidePlainObjectNoReturnTypeWalk.fss`
- Notes: siblings: 785, 697, 587. Walk has no type for a body, and reads an unwritten return type as `Any` (`interpreter/evaluator/values/Simple_fcn.java:38`, at fcdf7bc2da), so the load check does not judge such a declaration by the Return Type Rule where its domain is an object type inside the generic's (`writesReturnType`, `values/OverloadedFunction.java:862`); over a trait type it refuses every such pair, the valid ones too (row 785). The checker refuses the pair: 'the return type of NN32->String ... should be a subtype of the return type of [\T extends Number\]T->ZZ32'. Walk only. Workaround: write the return type.

## Row 1045, opened

- Section: 14. Contracts, tests and tools. Status: NEGATIVE-VERIFIED. Class: implementation gap (tests).
- Claim: `ProjectFortress/tests/XXXNonValueOfValue.fss`, the team's expected-failure test of an object that is no value object below a value trait, fails before that check, 'Variable f is not defined.', so it would stay green if the check were lost
- Reproducer: `ProjectFortress/tests/XXXNonValueOfValue.fss`
- Notes: siblings: 115. Its trait's method calls the getter `f` as `f()` (`ProjectFortress/tests/XXXNonValueOfValue.fss:18`), which the disambiguator refuses under walk before any type is built: `cd ProjectFortress && ../bin/fortress tests/XXXNonValueOfValue.fss` prints 'XXXNonValueOfValue.fss:18:41: Variable f is not defined.' at fcdf7bc2da. The refusal itself is held by `ProjectFortress/tests/NonValueBelowValueTypeWalk.fss`, 'non-value subtype of value type Stamp'. Repair: write `self.f` in the team's test and give it a `load_exception_contains` key, or delete it for the new test. Walk only: the test is an interpreter test.

## Row 1046, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker crashes, 'V is not in the kind env', on a call of a generic declaration beside one on a generic object type with two static parameters: `keep(Duo[\Square, Square\](Square, Square))` for `keep[\T\](x: T): T` beside `keep[\U, V\](x: Duo[\U, V\]): Duo[\U, V\]`
- Reproducer: `explorations/compile-ladder/rung-return-rule-object/probes/XXXOverloadGenericObjectTwoParams.fss`
- Notes: siblings: 789, 1047, 499. The pair is valid. The probe compiled alone prints the crash, exit 255. The call's two candidates tie at `Duo[\Square, Square\]` and the checker keeps the sort's head (`scala_src/typechecker/impls/Functionals.scala:1104-1108` at 280835f438), so whether a compile reaches the test at `scala_src/useful/STypesUtil.scala:1195-1197` with `V` left follows the overloadings' order, which varies with the JVM's earlier compiles (row 499). As a gated `XXX` test the compile printed nothing in batch 31's gate, so no gated test holds the row until the tie is decided. `keep(Square)` alone compiles and runs. Not tried under walk.

## Row 1047, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-BOUNDED. Class: implementation gap (checker).
- Claim: the compiled checker's static type for a call of an invalid overload set depends on what the same JVM compiled before: `c: Circle = g(Circle)` for `g[\T\](x: T): T` beside `g(x: Circle): String` is typed `Circle` alone and `String` after another component
- Reproducer: none
- Notes: siblings: 499. At f145926e3b, `fortress junit` on the one program alone reports only the Return Type Rule's error, 'the return type of Circle->String'; in one JVM after a component that fails its type check, it reports 'Right-hand side has type String, but declared type is Circle.' and stops before the overloading check. Either way the program is refused. The mechanism is not traced; row 499's notes name a choice that depends on the compiling JVM (`scala_src/typechecker/impls/Functionals.scala:824-832` at c124c6b65). The two programs and the two commands: `explorations/compile-ladder/rung-return-rule-object/REPORT.md`, "Defects".

## Row 1048, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker's Return Type Rule refuses a generic declaration beside a plain one whose domain is a tuple of object types, a pair the rule accepts: `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)`, `Circle` an object
- Reproducer: `ProjectFortress/compiler_tests/XXXOverloadReturnTupleDomain.test`
- Notes: siblings: 542, 853. Refused: 'the return type of (Circle, Circle)->(Circle, Circle) ...'. Every instance that takes a `(Circle, Circle)` has `T` at or above it. `meetingInstances` (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:140` at f145926e3b) reads `T` as its union with an object type only where both domains have as many positions. Walk loads and runs the pair. An arrow type is not such a case (row 1049).

## Row 1049, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk's load check loads a generic declaration beside a plain one over an arrow type whose return type breaks the Return Type Rule: `ident[\T\](x: T): T` beside `ident(x: Circle -> Circle): (Circle -> Circle)` loads and prints `ident arrow`
- Reproducer: none
- Notes: siblings: 998, 550. `Any -> Circle` is a subtype of `Circle -> Circle`; the generic's instance there returns that type, the plain one only a `Circle -> Circle`. The checker refuses the pair. Under walk, `bin/fortress P.fss` with `f: Circle -> Circle = ident(same)`, `same(c: Circle): Circle = c`, prints `ident arrow` and exits 0. With rung V's load check of climb batch 31 beside it the pair loads still, by the same run on the merged tree. No gated test yet.

## Row 1050, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a compiled function expression or local function that returns `self` at a type that its trait's `comprises` clause lists, or as the trait's self-type parameter, fails the JVM's verification when the closure's class loads: `fn (): R => self` in `trait Q comprises { R }`
- Reproducer: `ProjectFortress/compiler_tests/XXXComprisesValueFromClosureRun.test`
- Notes: siblings: 991, 695. 'VerifyError: Bad return type … $\=fn@….apply()L…$R; … Type …$Q (current frame, stack[0]) is not assignable to …$R'. `CodeGen.forFnExpr` and `forLetFn` return the body's value with no cast; a method's returned value gets one (`castToTypeBelow`, `compiler/codegen/CodeGen.java`). The checker accepts it and the link is clean (`ComprisesValueFromClosureRunLink`). The same for `fn (): S => self` in `trait Shape[\S extends Shape[\S\]\]`. Workaround: bind `self` at the listed type first, `r: R = self`, and return `r`.

## Row 1051, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a compiled conditional with `self` in one arm and a value of the listed type in the other, at a type that the `comprises` clause of self's trait lists, fails the JVM's verification at class load: `chosen(c: Boolean): R = if c then self else R(0, 0) end` in `trait Q comprises { R }`
- Reproducer: `ProjectFortress/compiler_tests/XXXComprisesValueAtConditionalArmRun.test`
- Notes: siblings: 991. 'VerifyError: Bad return type … Q$DefaultTraitMethods.chosen … Type java/lang/Object (current frame, stack[0]) is not assignable to …$R'. The arms leave the trait's interface and the object's class on the stack, which the verifier merges to `Object`; the cast of a returned value (`CodeGen.castToTypeBelow`) reads the conditional's static type, which is not self's, and emits nothing. With `self` in both arms it runs. The link is clean (`ComprisesValueAtConditionalArmRunLink`). Workaround: bind `self` at the listed type first, `r: R = self`, and write `r` in the arm. The same at a self-type parameter, the shape of `StandardTotalOrder`'s `MIN` and `MAX`.

## Row 1052, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED. Class: implementation gap (runtime).
- Claim: a compiled default body of a trait with a self-type parameter that calls a method on a value of that parameter dies at load, `ClassCircularityError`, where the object lists the trait first: `tagOf(other: S) = other.tag` in `trait Shape[\S extends Shape[\S\]\]`, for `object Pt extends Shape[\Pt\]`
- Reproducer: `ProjectFortress/compiler_tests/XXXSelfTypeParameterReceiverRun.test`
- Notes: siblings: 695. 'ClassCircularityError: …$Pt', under `Class.forName` in `runtimeSystem/MethodInstantiater.java:269`, which loads the static argument's class to choose the call's opcode while that class's parent, the trait's instance, is expanded. Row 695's notes held it (`pick(self, other: S): S`); it stands on the base and after rung K. A body that does not call on the value runs; so does the trait bounded by another trait and listed second. The link is clean (`SelfTypeParameterReceiverRunLink`). Walk runs it. Workaround: declare the method in the object.

## Row 1053, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path an assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, dies at run time, `NoSuchMethodError`: `c.t := High` for `object Cell(var t: T)` and `object High extends T`; the checker accepts it and walk runs it
- Reproducer: `ProjectFortress/compiler_tests/XXXVarFieldAssignedSubtypeRun.test`
- Notes: siblings: 397, 991. 'NoSuchMethodError: FVoid …$Cell.t(…$High)': the setter's call names the value's static type, not the field's. On the base and after rung K. The same for `c.r := self` in `trait Q comprises { R }` and `object Cell(var r: R)`: '…$Cell.r(…$Q)'; once the call names the field's type, that value needs the cast of `CodeGen.castToTypeBelow`. A value of the field's own type runs. The link is clean (`VarFieldAssignedSubtypeRunLink`). Workaround: bind the value at the field's type first, `h: T = High`, or assign in a method of the object.
