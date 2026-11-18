<!-- The record-landing workflow's evidence of the gap ledger: each row that 160925800..a6e73b8d6 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 69, 288, 868, 964, 1020, 1061
- closed as FIXED: 540, 812, 822, 959, 1005, 1028, 1029, 1050, 1051, 1052, 1060
- rewritten: 559
- opened: 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 69, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: packaging (tools).
- Claim: `fortress typecheck` is not an oracle for interpreter programs: it checks against `Library/CompilerLibrary.fsi`
- Reproducer: none
- Notes now: siblings: 833. `ProjectFortress/src/com/sun/fortress/Shell.java:455-457` (at c124c6b65) calls `useCompilerLibraries()` for `typecheck`, so a program that runs under walk gets `Vector is undefined.`. `typecheck-old` (`:467-474`) uses the interpreter library with the Scala checker off and type checking on, so, by reading, a component that reaches the checker stops at 'The Java version of the type checker is gone now.' (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:229`). Probe `explorations/libvector-probes/p30_capstone.fss`, no longer in the tree. Under `FORTRESS_LIBRARY=one`, `typecheck` reads the one library: `f(i: Index)` passes it.
- The notes gained: Under `FORTRESS_LIBRARY=one`, `typecheck` reads the one library: `f(i: Index)` passes it.

## Row 288, noted

- Section: 13. Syntax extension: grammars, templates and sub-languages. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: a program that imports a user grammar cannot be `fortress compile`d: every grammar api must `import FortressSyntax`, whose api graph reaches the interpreter's library, `FortressLibrary`, so the unit dies at DISAMBIGUATE with 1342 errors before GRAMMAR runs
- Reproducer: none
- Notes now: siblings: 71, 290, 884. `Library/FortressSyntax.fsi:14` imports `FortressAst`, and `Library/FortressAst.fsi:6` imports `FortressLibrary`, not the compiler's prelude (`WellKnownNames.java:116-129`, at c124c6b65). The mechanism exists: `GraphRepository.java:815-823` macro-parses on both paths, and `PhaseOrder.java:137-147` has GRAMMAR. `import FortressSyntax.{Expression}` alone gives the same 1342. No workaround. A fix needs a compiler-world `FortressAst`/`FortressSyntax`, and the names of `Library/List.fsi` that the compiler's prelude lacks (row 71). Probes `explorations/perf-probes/grammar-compile/`, in the parent of fc89ee7a5. See row 1063 for the selector. full text: history, row 288
- The notes gained: See row 1063 for the selector.

## Row 540, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a method call on the result of a call typed by the intersection of its candidates' return types crashes `fortress compile` with a …
- Claim at the base: a method call on the result of a call typed by the intersection of its candidates' return types crashes `fortress compile` with a `ClassCastException`, `IntersectionType` to `NamedType`: `choose(m).left()`, where the checker types `choose(m)` by `LeftResult ∩ RightResult`
- Reproducer: `ProjectFortress/compiler_tests/CoverageReturnMethodCall.test`
- Notes now: fixed `e501de7a1`; the receiver is cast to the conjunct that has the checker's chosen declaration, the most specific where several do (`CodeGen.intersectionMethodOwner`); a generic method on such a value, and a method on a typecase binder typed by an intersection, the shape of the library's `__filter` (`compiler_tests/TypecaseBinderMethodCall.test`), compile and run too; full text: history, row 540
- The notes gained: fixed `e501de7a1`; the receiver is cast to the conjunct that has the checker's chosen declaration, the most specific where several do (`CodeGen.intersectionMethodOwner`); a generic method on such a value, and a method on a typecase binder typed by an intersection, the shape of the library's `__filter` (`compiler_tests/TypecaseBinderMethodCall.test`), compile and run too;; they lost: siblings: 559. The family: `choose(s: S): LeftResult`, `choose(t: T): RightResult`, `choose(v: V): BothResult` over `S comprises { U, V }`, `T comprises { V, W }`, `U excludes W`, `m: M` with `M` below `S` and `T`. `CodeGen.forMethodInvocation` casts the receiver's static type to `NamedType` (`CodeGen.java:6515` at c124c6b65); it needs the method's owner found among the conjuncts. `choose(m).ri...

## Row 559, rewritten (claim, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: on the compiled path, a generic declaration instantiated at an intersection type dies loading its instance, 'Unable to read serialized data for Intersection??', and the checker gives such an instance by four routes
- Claim at the base: on the compiled path, a generic declaration instantiated at an intersection type dies loading its instance, 'Unable to read serialized data for Intersection??', and the checker gives such an instance by three routes
- Reproducer: `ProjectFortress/compiler_tests/XXXCoverageReturnInferred.test`
- Notes now: siblings: 448, 616. No run-time class for an intersection type; each ends at `InstantiatingClassloader.java:2519` at c124c6b65 (`xlationForGeneric`). Route 1, an intersection argument fixes a bare type parameter: `pass[\X\](x: X): X` on `choose(m)` (`CoverageReturnInferred.test` gates the link). Route 2, an unfixed parameter takes the meet of its bound and an unrelated expected trait: `mk[\T extends A\](): T`, `g(): B = mk()` (`XXXInferBoundMeetsExpectedTrait.test`). Route 3, an overloaded function passed to `idy[\X\]`. Route 4, a function expression so typed, `fn () => choose(m)`, as its closure is made (`XXXIntersectionClosureResult.test`). Walk runs all four. full text: history, row 559
- The notes gained: No run-time class for an intersection type; each ends at `InstantiatingClassloader.java:2519` at c124c6b65 (`xlationForGeneric`). Route 1, an intersection argument fixes a bare type parameter: `pass[\X\](x: X): X` on `choose(m)` (`CoverageReturnInferred.test` gates the link). Route 2, an unfixed parameter takes the meet of its bound and an unrelated expected trait: `mk[\T extends A\](): T`, `g(): B = mk()` (`XXXInferBoundMeetsExpectedTrait.test`). Route 3, an overloaded function passed to `idy[\X\]`. Route 4, a function expression so typed, `fn () => choose(m)`, as its closure is made (`XXXIntersectionClosureResult.test`). Walk runs all four.; they lost: The run time has no class for an intersection type; each ends at `InstantiatingClassloader.java:2519` at c124c6b65, via `xlationForGeneric`. Route 1, an intersection argument fixes a bare type parameter at the whole intersection: `pass[\X\](x: X): X` on `choose(m)` (row 540; `CoverageReturnInferred.test` gates the link). Route 2, a parameter nothing fixes whose bound and expected type are trait...

## Row 812, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator crashes on a generic trait that defines a member of a trait whose `comprises` clause lists a type at a `where`-clause type …
- Claim at the base: the code generator crashes on a generic trait that defines a member of a trait whose `comprises` clause lists a type at a `where`-clause type variable: `ComprisesWhereFunctionalMethodChecker`, compiled, stops 'E is not in the kind env [][]'
- Reproducer: `ProjectFortress/compiler_tests/ComprisesWhereMemberCompiled.test`
- Notes now: fixed `5073eb2aa`; full text: history, row 812
- The notes gained: fixed `5073eb2aa`; full text: history, row 812; they lost: siblings: 822. Run: `fortress compile -debug stacktrace` of `ProjectFortress/compiler_tests/ComprisesWhereFunctionalMethodChecker.fss`: 'E is not in the kind env [][]' at the object's `extends C[\E\]`, from `TypeAnalyzer.lteq` in `STypesUtil.removeIdenticallyCoveredMethods` (`scala_src/useful/STypesUtil.scala:1587`), called by `CodeGen.<init>` (`compiler/codegen/CodeGen.java:488`), at c124c6b65...

## Row 822, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator stops, 'T is not in the kind env', normalizing a type inside a generic function's `typecase`: the one library's `app[\T,E extends …
- Claim at the base: the code generator stops, 'T is not in the kind env', normalizing a type inside a generic function's `typecase`: the one library's `app[\T,E extends T,F extends T\]` (`Library/List.fss:93`), which the checker passes, is refused
- Reproducer: `ProjectFortress/compiler_tests/TypecaseGenericArmsCompiled.test`
- Notes now: fixed `5073eb2aa`; the crash came through a typecase tuple pattern's unbound names, bound since (row 1066); full text: history, row 822
- The notes gained: fixed `5073eb2aa`; the crash came through a typecase tuple pattern's unbound names, bound since (row 1066); full text: history, row 822; they lost: siblings: 812, 789. The stack: `CodeGen.forVarRef`, `TypeAnalyzer.normalize`, `pExc`. Measured on the library only, by the probe's code generation per declaration with the checker's failures caught (`explorations/perf-probes/codegen-distance/REPORT.md`, section 3, note (c)); not reproduced apart from it; that the analyzer lacks the function's static parameters is untraced. The probe's other kin...

## Row 868, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object's method whose own `where` clause introduces a `where`-clause variable stops at the clause, 'Missing type n': `m[\U\](u: U): String where [\nat n\]{U extends {X[\n\]}}` in `object Q`, with `Q.m(O)` for `O extends X[\1\]`
- Reproducer: `ProjectFortress/tests/XXXWhereVariableMethodWalk.fss`
- Notes now: siblings: 755, 760, 867. The same clause on a top-level function runs, 'OP' for `g(O, P)`; with `where { U extends T }` the method runs. The compiled checker accepts the method; compiled, its call dies (row 867). Walk is the same on the base, b0f6cd6b7. A top-level function's own where-clause variable loads and stops at its first use in the body, 'Missing type n': y: X[\n\] = u, or a typecase arm X[\n\] =>, in g[\U\](u: U): String where [\nat n\]{U extends {X[\n\]}} (climb batch 33 rung D's skeptic, on 1609258002's code and after).
- The notes gained: A top-level function's own where-clause variable loads and stops at its first use in the body, 'Missing type n': y: X[\n\] = u, or a typecase arm X[\n\] =>, in g[\U\](u: U): String where [\nat n\]{U extends {X[\n\]}} (climb batch 33 rung D's skeptic, on 1609258002's code and after).

## Row 959, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value: neither library declares …
- Claim at the base: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value: neither library declares `IntLiteral`, and `typecase v of IntLiteral => ... ZZ32 => ... end` takes the first arm for a `ZZ32`
- Reproducer: `ProjectFortress/tests/TypecaseUndefinedArmWalk.fss`
- Notes now: fixed `18240c9d8`; compiled sibling compiler_tests/XXXTypecaseUndefinedArmCompiled.test; an element of a tuple of names still binds (row 1064); full text: history, row 959
- The notes gained: fixed `18240c9d8`; compiled sibling compiler_tests/XXXTypecaseUndefinedArmCompiled.test; an element of a tuple of names still binds (row 1064); full text: history, row 959; they lost: The parser makes the arm `Id =>` a `VarType` (`parser/DelimitedExpr.rats:241-248`), and no phase of either path reports the undefined name: on climb batch 29b's merged tree a program of that `typecase` compiles and runs, 'the IntLiteral arm', 'PASS', and walk prints the same. Met when `IntLiteral` left the one library: `tests/IntegerConversionsWalk.fss`'s `shown` printed '-2147483648 : IntLiter...

## Row 964, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator stops with a Java `RuntimeException`, 'typcase match failure!', on a `typecase` clause whose tuple pattern binds an element without a type: `typecase p of (x, y: ZZ32) => ...` for `p: (ZZ32, ZZ32)`
- Reproducer: `ProjectFortress/compiler_tests/XXXTypecasePatternUntypedBinder.test`
- Notes now: siblings: 498. `CodeGen.getType(TypeOrPattern)` takes a `PlainPattern` only with a type and a `TypePattern`, and throws on any other binding (`compiler/codegen/CodeGen.java:2166-2186` at b212f67a0e); the checker accepts the clause. The base stops the same way. Workaround: give each binder a type, `(x: ZZ32, y: ZZ32)`. Walk stops on the same clause when it runs, 'typecase match failure!', and runs the workaround (probes on 1609258002's code). Both paths stop so on a nested tuple of names beside a type too, ((a, b), ZZ32) => over p: ((ZZ32, String), ZZ32) (climb batch 33 rung D's skeptic, on 1609258002's code and after).
- The notes gained: Walk stops on the same clause when it runs, 'typecase match failure!', and runs the workaround (probes on 1609258002's code). Both paths stop so on a nested tuple of names beside a type too, ((a, b), ZZ32) => over p: ((ZZ32, String), ZZ32) (climb batch 33 rung D's skeptic, on 1609258002's code and after).

## Row 1005, closed as FIXED

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: on the compiled path a subscript followed by a superscript, `x[5]^2`, `(B.f())[5]^2` or `B.f()[5]^2`, stops the compile: '** bug! Result of …
- Claim at the base: on the compiled path a subscript followed by a superscript, `x[5]^2`, `(B.f())[5]^2` or `B.f()[5]^2`, stops the compile: '** bug! Result of typechecking still contains intermediate nodes.'
- Reproducer: `ProjectFortress/compiler_tests/SubscriptThenSuperscriptCompiled.test`
- Notes now: fixed `8979406af`; full text: history, row 1005
- The notes gained: fixed `8979406af`; full text: history, row 1005; they lost: siblings: 1, 84. The parser builds a `MathPrimary` of two math items, a subscripting and an exponentiation (`ProjectFortress/src/com/sun/fortress/parser/Expression.rats:478-488`, at `21045c6c65`), and the checker leaves it in the tree; a single item, `x[5]` or `x^2`, is simplified by the parser and compiles. Walk fails on the same forms as row 1 says. A subscript inside a dotted primary is not...

## Row 1020, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a function declared in a block with static parameters of its own stops where it is declared, 'Missing type T': `loc[\T\](x: T): T = x` in the body of `run`, whether it is then called or passed
- Reproducer: `ProjectFortress/tests/XXXLocalGenericFunctionWalk.fss`
- Notes now: siblings: 156, 304. The error names the position of the declared return type, before any call: 'XXXLocalGenericFunctionWalk.fss:8:21: Missing type T'. The same on the base `db352c1776`. Row 304's note "Walk runs local functions" holds for a local function without static parameters only. Workaround: declare the function at the top level. With T only in the body, as kind[\T\](v: Any): String = typecase v of T => ... end, the declaration loads and the call stops: 'Unexpected _RewriteFnRef value' (climb batch 33 rung D's skeptic, on 1609258002's code and after).
- The notes gained: With T only in the body, as kind[\T\](v: Any): String = typecase v of T => ... end, the declaration loads and the call stops: 'Unexpected _RewriteFnRef value' (climb batch 33 rung D's skeptic, on 1609258002's code and after).

## Row 1028, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled export check does not match a top-level variable that a component declares mutable by `:=` against the api's `var` declaration: `tally: …
- Claim at the base: the compiled export check does not match a top-level variable that a component declares mutable by `:=` against the api's `var` declaration: `tally: ZZ32 := 0` under `var tally: ZZ32`, 'Unmatched declarations … due to different modifiers'
- Reproducer: `ProjectFortress/compiler_tests/TopLevelVarByAssignExport.test`
- Notes now: fixed `8979406af`; full text: history, row 1028
- The notes gained: fixed `8979406af`; full text: history, row 1028; they lost: siblings: 844. The specification: the modifier `var` is optional when `:=` is used. The export check compares the declarations' modifiers, and `:=` sets the variable mutable without the modifier. The same for a tuple binding, `(a, b): (ZZ32, ZZ32) := (0, 9)`. Walk runs a program that imports such a variable. At db352c1776. Workaround: write `var` in the component.

## Row 1029, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker does not check a declared type of a local tuple binding's name against its element where other names declare none and the right …
- Claim at the base: the compiled checker does not check a declared type of a local tuple binding's name against its element where other names declare none and the right side is no tuple expression: `(total: ZZ64, part) = two()`, `two(): (ZZ32, ZZ32)`, compiles and stops at run time with a `ClassCastException`
- Reproducer: `ProjectFortress/compiler_tests/LocalTupleBindingMixedTypes.test`
- Notes now: fixed `8979406af`; full text: history, row 1029
- The notes gained: fixed `8979406af`; full text: history, row 1029; they lost: siblings: 474. Where only some names declare a type, the case types the names without one from the right side and keeps the others unchecked (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:425-430`; the same at db352c1776); `(e: String, f) = two()` compiles and prints 7. Walk converts or refuses, 'RHS expression type ZZ32 is not assignable to LHS type String'. The...

## Row 1050, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a compiled function expression or local function that returns `self` at a type that its trait's `comprises` clause lists, or as the trait's self-type …
- Claim at the base: a compiled function expression or local function that returns `self` at a type that its trait's `comprises` clause lists, or as the trait's self-type parameter, fails the JVM's verification when the closure's class loads: `fn (): R => self` in `trait Q comprises { R }`
- Reproducer: `ProjectFortress/compiler_tests/ComprisesValueFromClosureRun.test`
- Notes now: fixed `1f6c166b0`; also SelfTypeFromClosureRun, the self-type parameter's form; full text: history, row 1050
- The notes gained: fixed `1f6c166b0`; also SelfTypeFromClosureRun, the self-type parameter's form; full text: history, row 1050; they lost: siblings: 991, 695. 'VerifyError: Bad return type … $\=fn@….apply()L…$R; … Type …$Q (current frame, stack[0]) is not assignable to …$R'. `CodeGen.forFnExpr` and `forLetFn` return the body's value with no cast; a method's returned value gets one (`castToTypeBelow`, `compiler/codegen/CodeGen.java`). The checker accepts it and the link is clean (`ComprisesValueFromClosureRunLink`). The same for `f...

## Row 1051, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a compiled conditional with `self` in one arm and a value of the listed type in the other, at a type that the `comprises` clause of self's trait …
- Claim at the base: a compiled conditional with `self` in one arm and a value of the listed type in the other, at a type that the `comprises` clause of self's trait lists, fails the JVM's verification at class load: `chosen(c: Boolean): R = if c then self else R(0, 0) end` in `trait Q comprises { R }`
- Reproducer: `ProjectFortress/compiler_tests/ComprisesValueAtConditionalArmRun.test`
- Notes now: fixed `1f6c166b0`; also SelfTypeArmRun, the self-type parameter's form owed by the record (the conditional of StandardTotalOrder's MIN and MAX), and a case expression's clause; full text: history, row 1051
- The notes gained: fixed `1f6c166b0`; also SelfTypeArmRun, the self-type parameter's form owed by the record (the conditional of StandardTotalOrder's MIN and MAX), and a case expression's clause; full text: history, row 1051; they lost: siblings: 991. 'VerifyError: Bad return type … Q$DefaultTraitMethods.chosen … Type java/lang/Object (current frame, stack[0]) is not assignable to …$R'. The arms leave the trait's interface and the object's class on the stack, which the verifier merges to `Object`; the cast of a returned value (`CodeGen.castToTypeBelow`) reads the conditional's static type, which is not self's, and emits nothin...

## Row 1052, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (runtime).
- Claim: a compiled default body of a trait with a self-type parameter that calls a method on a value of that parameter dies at load, `ClassCircularityError`, …
- Claim at the base: a compiled default body of a trait with a self-type parameter that calls a method on a value of that parameter dies at load, `ClassCircularityError`, where the object lists the trait first: `tagOf(other: S) = other.tag` in `trait Shape[\S extends Shape[\S\]\]`, for `object Pt extends Shape[\Pt\]`
- Reproducer: `ProjectFortress/compiler_tests/SelfTypeParameterReceiverRun.test`
- Notes now: fixed `1f6c166b0`; full text: history, row 1052
- The notes gained: fixed `1f6c166b0`; full text: history, row 1052; they lost: siblings: 695. 'ClassCircularityError: …$Pt', under `Class.forName` in `runtimeSystem/MethodInstantiater.java:269`, which loads the static argument's class to choose the call's opcode while that class's parent, the trait's instance, is expanded. Row 695's notes held it (`pick(self, other: S): S`); it stands on the base and after rung K. A body that does not call on the value runs; so does the t...

## Row 1060, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: compiled, a numeral that ends a block after a local declaration, at a binding without a declared type, keeps its numeral type, so a later conversion …
- Claim at the base: compiled, a numeral that ends a block after a local declaration, at a binding without a declared type, keeps its numeral type, so a later conversion of the variable dies: `x = do`, `k: ZZ32 = 3`, `4`, `end`, then `y: ZZ32 = x`, 'NoClassDefFoundError: fortress/CompilerBuiltin$v'
- Reproducer: `ProjectFortress/compiler_tests/NumeralEndsUntypedBlockCompiled.test`
- Notes now: fixed `8979406af`; full text: history, row 1060
- The notes gained: fixed `8979406af`; full text: history, row 1060; they lost: siblings: 1014. The checker's default at a place that fixes no type (`defaultNumeral`, `joinNumerals` and `tupleJoin`, `scala_src/typechecker/impls/Functionals.scala:1259-1331` at 7fb38bbe30) has no case for a `LocalVarDecl` or a `LetFn`, so `x` is a `NaturalNumeral[\1,10,4\]`: `println(x)` prints 4, and `y: ZZ32 = x` calls the coercion as a function value. The same block ending in `(1, k)`, bo...

## Row 1061, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: with the compile command switched onto the one library, a program that names one of its generic traits stops the code generator, 'Not in the trait table: Array1', for `a = array1[\ZZ32, 8\]()`: a method entry names the trait without its api
- Reproducer: none
- Notes now: siblings: 940, 942. Stack: `TypeAnalyzer.typeCons` ← `normalize` ← `lteq` ← `STypesUtil.removeIdenticallyCoveredMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1584-1588`, at c3b16ef2d1). Seen with probe Y's two lines of the selector alone and a private caches folder, where a program of one `println`, and one that binds a `QQ`, compile. With the trait table's search extended to `FortressLibrary` and `FortressBuiltin` (`compile-ladder/plan-31/probes/planner/measure-hacks.patch`) it compiles: row 940's root. Detail: `compile-ladder/plan-33/PROBES.md`, section 6. On `main`, `FORTRESS_LIBRARY=one bin/fortress compile` of that `Arr.fss` stops so.
- The notes gained: On `main`, `FORTRESS_LIBRARY=one bin/fortress compile` of that `Arr.fss` stops so.

## Row 1062, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a program compiled against the one library under `FORTRESS_LIBRARY=one` does not run: the one library has no jars, and the run dies at its first library class, 'NoClassDefFoundError: fortress/FortressLibrary$String', before `run()` prints
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryRunHalf.test
- Notes: siblings: 874, 624, 315, 1061. The compile writes only the program's jar, `default_repository/caches-one/bytecode_cache/OneLibraryHalf.jar`; no compile writes the one library's (F-34): row 874 stops `FortressLibrary` and `FortressBuiltin` at the wrappers, and rows 624 and 315 stand on `println`'s path. F-352's second kind of walls (rows 995, 866, 942, 994, 993) follow. `bin/run_classpath` takes the caches folder of the selection, so a run without it finds no jar: 'Could not load OneLibraryHalf'.

## Row 1063, opened

- Section: 13. Syntax extension: grammars, templates and sub-languages. Status: NEGATIVE-BOUNDED. Class: implementation gap (checker).
- Claim: under `FORTRESS_LIBRARY=one`, a program that imports a grammar api whose template binds an `Id` gap as a function's parameter, as `fn i => b` for `i:Id`, crashes the compiled checker on the api: 'IllegalArgumentException: Parameter 'apiName' to the IdOrOpOrAnonymousName constructor was null'
- Reproducer: none
- Notes: siblings: 288. The api imports `FortressAst.{...}` and `FortressSyntax.{...}` and declares `grammar Over extends {Expression, Identifier}` with `Expr \|:= over i:Id <- e:Expr do b:Expr end => <[ ((e).loop(fn i => b)) ]>`; the program `run(): () = println("PASS")` imports it. `FORTRESS_LIBRARY=one bin/fortress compile` of it: that message, rc=1, from `SId$.apply` under `TypeWellFormedChecker.check` (`TypeWellFormedChecker.scala:75`) and `StaticChecker.checkApis` (`StaticChecker.java:126`), at 21e155ea9e. Walk prints PASS. A grammar of `<[ e + e ]>` compiles under the selection; `syntax_abstraction_tests/ForUse.fss` crashes so. Without the selection, row 288's errors (1799).

## Row 1064, opened

- Section: 4. Operators and overloading under walk. Status: CONTESTED. Class: implementation gap (checker).
- Claim: a `typecase` arm that is a tuple of names binds each element whose name no declaration defines, so that element takes a value of every type: under walk `(NoSuchTypeHere, ZZ32) =>` takes `("s", 3)` and `(2.5, 3)`, where the chapter's grammar reads each element as a type
- Reproducer: `ProjectFortress/tests/TypecaseTupleArmUndefinedNameBindsWalk.fss`
- Notes: siblings: 959, 964, 498. The disambiguator spares only an element of a tuple arm from 'X is undefined.' and rewrites the arm into a pattern whose undefined names bind over `Any` (`compiler/disambiguator/TypeDisambiguator.java`, `forTypecaseClause`, `typeToPatternBinding`): the team's binding form, which `compiler_tests/Compiled7.PatternMatching.a.fss` uses (`AfterTypeChecking.test`). Unsettled: the grammar makes `(TypeList)` types, the note defers patterns to a proposal (`typecase.tex:15`), and no decision covers the form. Compiled, with an `Any` selector, the checker refuses the arm: 'The typecase clause, Pattern at ..., is unreachable.' Workaround: test `(String, ZZ32)`, then bind.

## Row 1065, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-BOUNDED. Class: implementation gap (walk).
- Claim: under walk a `typecase` arm that is a tuple of a name and a type binds the name to the whole selector, not to its element: `(first, ZZ32) => first` gives `("s", 3)` for `("s", 3)`, where `(first, second)` binds each element
- Reproducer: `ProjectFortress/tests/TypecaseTupleArmMixedBinderWalk.fss`
- Notes: siblings: 498, 1064. Compiled, the name is unbound, as in row 498: `NoClassDefFoundError: PArmTupleMixedC$first` on 1609258002's code, for `typecase p of (first, ZZ32) => typecase first of String => ... end` with `p: (String, ZZ32)`. The disambiguator rewrites the arm into a pattern of a binder over `Any` beside a type pattern (`compiler/disambiguator/TypeDisambiguator.java`, `typeToPatternBinding`); where walk's `Evaluator.forTypecase` binds it is not traced. Workaround: test `(String, ZZ32)` and bind the elements after, `(a, b) = p`.

## Row 1066, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: FIXED. Class: implementation gap (codegen).
- Claim: the code generator leaves unbound the names of a `typecase` clause's tuple pattern, as `(s: String, n: ZZ32) => s \|\| n.asString`: a read of one …
- Reproducer: `ProjectFortress/compiler_tests/TypecaseTupleNamesCompiled.test`
- Notes: fixed `5073eb2aa`; full text: history, row 1066

## Row 1067, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a compiled `typecase` clause's name bound at a trait above its selector's object type fails the JVM's verification at a method call on it: `typecase a of x: Shape => x.nm()` for `a: Sq`, `object Sq extends Shape`, alone and in a tuple pattern
- Reproducer: `ProjectFortress/compiler_tests/XXXTypecaseClauseNameAboveSelector.test`
- Notes: siblings: 351, 964. The checker types the name as the meet of the selector's type and the guard, `Sq`, and the call is emitted on `Sq`'s class, but `bindAndGenerateClauseBody` and `bindElementsAndGenerateClauseBody` store the name at the guarding type (`compiler/codegen/CodeGen.java:2568-2576`, `:2588-2610` at 173fc4a21f): 'Type 'Shape' (current frame, stack[0]) is not assignable to 'Sq''. Walk runs it. The base fails so for the single name. Workaround: read the selector itself, whose type already fits.

## Row 1068, opened

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, the names of a `typecase` clause's tuple pattern that holds an element given by its type alone are not bound to their elements: `(s: String, ZZ32) => tag(s)` passes the whole tuple to `tag(x: String)`, 'got arg (m,1)'
- Reproducer: `ProjectFortress/tests/XXXTypecaseTypeOnlyElementWalk.fss`
- Notes: siblings: 498, 964. `Evaluator.forTypecase` collects only the pattern's names, binds a single name to the whole value, and pairs several names with the elements from the first, skipping no type-only element (`interpreter/evaluator/Evaluator.java:1530-1551` at 173fc4a21f). The checker types `s` as `String`; the compiled path binds it to its element and prints `string m`. Workaround: name every element, as `(s: String, _: ZZ32)`.

## Row 1069, opened

- Section: 14. Contracts, tests and tools. Status: NEGATIVE-BOUNDED. Class: implementation gap (tests).
- Claim: `ArrayStoreJUTest.testFourTasksAddIntoOneElementInsideAtomic` can fail in `ant testFast` on a loaded machine: its four tasks wait 60 s at a barrier on a pool of four threads, and the case ends in `AssertionError`; alone it passes in 0.08 s
- Reproducer: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ArrayStoreJUTest.java`
- Notes: Seen once, in testFast at `3f3984e82f` (load average 9 to 12 on 4 CPUs): 'testFourTasksAddIntoOneElementInsideAtomic took 60.01 sec … java.lang.AssertionError', at `onPool` (`ArrayStoreJUTest.java:197`); the barrier is `:204`, the forks and in-order joins `:218-219`. `ant testOnly -DtestPattern=ArrayStoreJUTest` right after: 8 run, 0 failures. The class reaches no code generator or class loader. Not tried: a pool whose primordial task joins a stolen task while a fourth stays queued, leaving three tasks at the barrier.

## Row 1070, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a compiled `typecase` with `self` in one arm and a value of the listed type in the other, at a type that the `comprises` clause of self's trait lists, fails the JVM's verification at class load: `typecase x of s: String => self else => R(0, 0) end` at `R` in `trait Q comprises { R }`
- Reproducer: `ProjectFortress/compiler_tests/XXXComprisesValueAtTypecaseArmRun.test`
- Notes: siblings: 1051. 'VerifyError: Bad return type … Q$DefaultTraitMethods.chosen … @37: areturn'. The arms leave the trait's interface and R's class, which the verifier merges to `Object`. The typecase's type is the union of its arms' types, and `CodeGen.castToTypeBelow` (`compiler/codegen/CodeGen.java`) casts a union only where each element is self's type; `forTypecase` casts no arm, where `forIf` casts each. Fails on the base too. The link is clean (`ComprisesValueAtTypecaseArmRunLink`). Workaround: bind `self` at the listed type in the arm, `do r: R = self; r end`.

## Row 1071, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses a getter of the listed type read on `self` in a trait with a `comprises` clause: `den(): ZZ32 = self.d` in `trait Q comprises { R }`, `d` a field of `R`, is refused, '(Q & {R}) has no getter called d'; walk runs it
- Reproducer: `ProjectFortress/compiler_tests/XXXComprisesSelfGetterCompiled.test`
- Notes: siblings: 540, 1051. `self` there has the type `Q ∩ R` (`basic/expressions/var-ref.tex`, "Identifier References"), which equals the named type `R`, and the checker types it as `Q & {R}`, on which `SFieldRef` finds no getter `d` (`scala_src/typechecker/impls/Misc.scala:346-354`, at `1609258002`). Climb batch 31's rung K met it (its REPORT.md, program C) and recorded no row. The same for a conditional of self's type, `(if c then R(0, 7) else self end).d`. Walk prints 2. Workaround: bind `self` at the listed type first, `r: R = self`, and read `r.d`.

## Row 1072, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses a method of a type parameter's bound called on a value typed by that parameter met with a trait: `x'.name()` in a `typecase` arm `x': Marked` over `x: X`, `X extends Shape`, 'No such method AND(Marked,X).name.'
- Reproducer: `ProjectFortress/compiler_tests/XXXTypecaseBinderParameterBound.test`
- Notes: siblings: 822, 540. `traitTypesCallable` keeps an intersection's conjuncts that are trait types before its own case for a type parameter's bounds, so a `VarType` conjunct is dropped (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Common.scala:96-97` at 1609258002). Walk prints 'marked square'. The code generator's owner search (`CodeGen.intersectionMethodOwner`, `traitConjuncts`) keeps to the same conjuncts, so a repair here reaches it too. Workaround: call the method on the selector, `x.name()`, which compiles and runs.

## Row 1073, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker accepts an object that inherits two getters of one name from sibling traits, `getter side(): String` in `Shape` and `getter side(): ZZ32` in `Marked`, where it refuses two dotted methods `m(): String` so inherited, 'Invalid overloading of m in object'
- Reproducer: none
- Notes: siblings: 735, 540. `fortress compile` of `object BothShape extends { Shape, Marked } end` exits 0; the same program's `object PandQ extends { P, Q } end` over two `m(): String = ...` is refused, 'Invalid overloading of m in object PandQ'. Walk runs it too. In a `typecase` arm `s': Marked` over `s: Shape`, `"binder " \|\| s'.side` prints 'binder shape side' under walk (row 735's order of the extends clause) and 'binder 7' compiled, where the receiver's owner among the conjuncts is the first that has the getter.

## Row 1074, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: compiled, a `try` whose block and catch clause end in numerals, at a binding without a declared type, keeps a numeral type and the compile refuses it: `x = try 4 catch e Exception => 5 end`, 'NaturalNumeral cannot be written in a program except as a parameter's type.'
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralEndsUntypedTryCompiled.test`
- Notes: siblings: 1060, 1075. The default at a place that fixes no type (`defaultNumeral`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1259`, at 89819a591d) finds a join's numerals through `joinNumerals` (`:1323-1338`), which has no case for a `try`, though `numeralResult` (`:1315`) and `joinInto` (`:1363`) have one. At a declared type the numerals convert. Walk runs the program and prints PASS. After a local declaration, `x = do k: ZZ32 = 3; try 4 catch e Exception => 5 end end`, the code generator stops instead: 'Error trying to close method scope.', on the base too. Workaround: declare the binding's type, as `x: ZZ32 = try ...`.

## Row 1075, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: compiled, a tuple binding without declared types whose right side is a `case` or a `try` whose branches are numeral tuples is refused: `(a, b) = case k of 1 => (1, 2) else => (3, 4) end`, 'Right-hand side has type OR((NaturalNumeral[\1,10,3\], …), …), but left-hand side is a tuple of 2 variables.'
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralTupleBranchesUntypedCompiled.test`
- Notes: siblings: 1074, 1060. The default of a join whose results are tuples (`tupleJoin`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1277-1303`, at 03b3698ca7) has cases for a block, a `do`, a local declaration, a local function and an `if`, none for a `case` or a `try`, so the branches keep their numeral types and their join is no tuple type; the same at 1609258002. An `if` with such branches converts. Walk prints 3 for the `case` form. Workaround: declare the names' types, as `(a, b): (ZZ32, ZZ32) = case ...`.
