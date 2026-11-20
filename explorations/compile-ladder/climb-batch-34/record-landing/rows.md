<!-- The record-landing workflow's evidence of the gap ledger: each row that 639eef180..f7c6c2cae opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 138, 141, 674, 815, 870, 1057, 1073, 1088
- rewritten: 818
- closed as FIXED: 993, 1076, 1078, 1090
- opened: 1092, 1093, 1094, 1095, 1096, 1097

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 138, noted

- Section: 10. Strings, maps and printing. Status: POSITIVE-VERIFIED. Class: —.
- Claim: `s.indexOf(c)` on a `String` returns a `Maybe[\ZZ32\]`, and the surrounding idioms (`.holds`, `.get`, `getDefault`, `if i <- …`, `IN`, `BIG MIN` over `.indices`) all work
- Reproducer: none
- Notes now: `indexOf('c') = Just(2)`, `.holds = true`, `.get = 2`, `if i <- uchars.indexOf(c)` binds `2`; the absent case prints `Nothing`, `.holds = false`, `getDefault(-1) = -1`. `indexOf(e:E): Maybe[\I\]` is declared on `Indexed[\E,I\]` (`Library/FortressLibrary.fsi:1356-1358`), and `Library/FlatString.fss:101` overrides it for `String`. Note the interaction with row 114: `SEQV` on the result is useless. Probe `explorations/run-b2/probes/g4i_indexof.fss`, in the parent of `22ea0cd90`.
- The notes gained: `Library/FlatString.fss:101`; they lost: `Library/FlatString.fss:103`

## Row 141, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: deliberate (library).
- Claim: `String.split()` is not a tokenizer: on a flat string it yields **no** pieces; it is the rope's structural subdivision
- Reproducer: none
- Notes now: The api documents it as "a subdivision of self into substrings", which may be the empty generator (`Library/FortressLibrary.fsi:2482-2493`), and `Library/FlatString.fss:150` returns `Nothing`. `(1) pieces of "a b c".split(): 0`, with `(2) \|s\| = 6 s[2] = 'b'` on the same string to show it is not empty. Workaround: scan characters (`parseRow` in `explorations/run-c/src/MicroGptFlat.fss`, `numbersOf` in its check). Probe `explorations/run-c/probes/g141_split.fss`, in the parent of `4ebf80aec`.
- The notes gained: `Library/FlatString.fss:150`; they lost: `Library/FlatString.fss:152`

## Row 674, noted

- Section: 8. Generators, reductions and ranges. Status: NEGATIVE-VERIFIED. Class: library bug (library).
- Claim: the api's advice for an `Indexed`'s range subscript, `(bounds())[r]` "to narrow and bounds check the range r", reads `r` as positions from 0: with bounds `5#3`, `(5#3)[5#2]` stops walk ("[5,6] right outside bounds [0,1,2]") and `(5#3)[0#2]` is `[5,6]`, where `narrowToRange` takes indices
- Reproducer: `ProjectFortress/tests/RangeSubscriptPositions.fss`
- Notes now: The advice is `Library/FortressLibrary.fsi:1336` (`.fss:2022`). The library's own range subscripts narrow with `narrowToRange` (`Library/FortressLibrary.fss:2398`, `:2456`, `:2691`, `:3117`, and `SimpleIndexValuePairs` at `:3799`); the advice's two uses subscript a string's bounds, which start at 0 (`Library/FlatString.fss:115`, `Library/String.fss:309`). A program's `Indexed` that follows the advice with bounds above 0 refuses a range of its own indices. Workaround: narrow with `self.bounds.narrowToRange(r)`. The test asserts today's behaviour.
- The notes gained: (`Library/FlatString.fss:115`,; they lost: (`Library/FlatString.fss:117`,

## Row 815, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: compiled, a functional method of a trait that comprises an object, called on a value whose static type is the object, dies at run time with `NoSuchMethodError`: `num(R)` for `abstract num(self): ZZ32` in `trait Q comprises { R }` and `num(self): ZZ32 = 1` in `object R extends Q`, where walk runs it
- Reproducer: `ProjectFortress/compiler_tests/XXXFunctionalMethodComprisedObject.test`
- Notes now: siblings: 770, 739. The missing method is the pair's overload method, `\=num{<Q's span>,<R's span>}(Q)` (once `(R)` on a first compile), which the component's class does not hold; it links clean. The same with `num(self)` not written `abstract`; it runs with no `comprises` clause, with a dotted `num()`, and through a `Q`-typed value (`AbstractFunctionalMethodImplementedByComprised`). Old code (`aa5c67d48`) the same. Program and outputs: `compile-ladder/rung-export-align/REPORT.md`, section 8. Workaround: call through a value typed as the trait. So did the one library's QQ and Ratio `denominator`: `(Ratio)` once FortressLibrary was compiled again alone, a VerifyError in `isFinite`.
- The notes gained: So did the one library's QQ and Ratio `denominator`: `(Ratio)` once FortressLibrary was compiled again alone, a VerifyError in `isFinite`.

## Row 818, rewritten (claim, reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator refuses a call with a type assumption at some of its dispatched arguments but not all where it calls a functional method or a dotted method, as `tag(Leaf asif Named, n)`: "Can't compile a dispatched call whose arguments are not all type assumptions"
- Claim at the base: the code generator refuses a dispatched call that has a type assumption at some of its dispatched arguments but not at all, as `pair(Leaf asif Named, Leaf)` beside overloads at `Named` and at `Leaf`: "Can't compile a dispatched call whose arguments are not all type assumptions"
- Reproducer: XXXAsIfPartialMethodCompiled
- Notes now: An overloaded function of the component compiles: the call dispatches on the others' run-time types among the declarations at or below the resolved one that take the assumed types (AsIfPartialDispatchCompiled). Same message: an assumed receiver (XXXAsIfPartialReceiverCompiled), a dotted call's argument (XXXAsIfPartialDottedArgCompiled), a dispatch holding a functional method (XXXAsIfPartialWithFunctionalMethodCompiled). Own messages: a generic declaration below the resolved one (XXXAsIfPartialGenericCompiled), another component's overloaded function, `self` not first, a generic method (XXXAsIfGenericMethodCompiled) or function (XXXAsIfGenericFunctionCompiled).
- The notes gained: An overloaded function of the component compiles: the call dispatches on the others' run-time types among the declarations at or below the resolved one that take the assumed types (AsIfPartialDispatchCompiled). Same message: an assumed receiver (XXXAsIfPartialReceiverCompiled), a dotted call's argument (XXXAsIfPartialDottedArgCompiled), a dispatch holding a functional method (XXXAsIfPartialWithFunctionalMethodCompiled). Own messages: a generic declaration below the resolved one (XXXAsIfPartialGenericCompiled), another component's overloaded function, `self` not first, a generic method (XXXAsIfGenericMethodCompiled) or function (XXXAsIfGenericFunctionCompiled).; they lost: The other forms compile (AsIfCallsCompiled): at a receiver, the static body that the assumed trait's `DefaultTraitMethods` class holds; at a call whose every dispatched argument is an assumption, the declaration the checker resolves; elsewhere the value (`CodeGen.java`, `assumedReceiverCall`, `assumedArgumentsCall`, `forAsIfExpr`). Also refused: a call of another component's overloaded function...

## Row 870, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object extending a generic trait whose generic dotted method has a `where` clause on the trait's static parameter stops, 'ClassCastException: … FTypeObject cannot be cast to … SymbolicInstantiatedType': `mixed[\U\](u: U): String where { T extends Named }` in `trait Pair[\T\]`
- Reproducer: `ProjectFortress/tests/XXXGenericMethodTraitWhereWalk.fss`
- Notes now: siblings: 762. It stops in `SingleFcn.createSymbolicInstantiation`, at the cast of `ge.getLeafType(we_name)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/SingleFcn.java:231` at c124c6b65), called by `Constructor.finishInitializing` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:216`), row 762's site. With the clause on the method's own parameter, `where { U extends Named }`, it runs, 'own dog'. The compiled path runs it, 'mixed cat'. No workaround keeps the constraint on `T`. Alike in a generic object's own generic method, `held[\U\](u: U): ZZ32 where { F extends Gen }` in `object Holder[\F\]`.
- The notes gained: Alike in a generic object's own generic method, `held[\U\](u: U): ZZ32 where { F extends Gen }` in `object Holder[\F\]`.

## Row 993, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library bug (library).
- Claim: the one library's `NN32` declares its getters `zero` and `one` at `Number`, wider than the inherited `zero(): I` and `one(): I` at `I = NN32`; the …
- Claim at the base: the one library's `NN32` declares its getters `zero` and `one` at `Number`, wider than the inherited `zero(): I` and `one(): I` at `I = NN32`; the compiled checker accepts them, and against the one library the code generator then stops the whole of `FortressBuiltin`
- Reproducer: `ProjectFortress/compiler_tests/XXXGetterReturnTypeNotSubtype.test`
- Notes now: fixed `51d6c49eb`; the checker half by the test; the library half, NN32's getters at NN32 (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265), by the distance stage: 2 return-type errors at those lines with the new checker before their edit, 0 after; full text: history, row 993
- The notes gained: fixed `51d6c49eb`; the checker half by the test; the library half, NN32's getters at NN32 (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265), by the distance stage: 2 return-type errors at those lines with the new checker before their edit, 0 after; full text: history, row 993; they lost: siblings: 874, 942. `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:429-430` beside `Library/FortressLibrary.fss:682-683`, at 832f7d0d91. In a scratch tree switched onto the one library (`explorations/compile-ladder/plan-31/probes/switch-rehearsal.md`, W4), the compile of `FortressBuiltin` stops: 'Likely bug in static analysis, apparently malformed overload set not rejected for FortressBuil...

## Row 1057, noted

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, two generic dotted methods of one name and one static parameter that differ in their number of parameters fail at a call, 'Cannot find definition for method tk given receiver Two': `tk[\U\](y: U, z: U)` beside `tk[\U\](y: U, z: U, w: U)` in `object Two`
- Reproducer: ProjectFortress/tests/XXXGenericMethodOverloadArity.fss
- Notes now: siblings: 744, 760. The message is written at `interpreter/evaluator/values/DottedMethodApplication.java:106` at 647163a9c4. Alike with the static argument written and inferred, and where one overload's one parameter is a pair, `tk[\U\](y: (U, U))`. The compiled path runs the pair without a tuple on the base and after rung T, 2 and 3, and the form with the pair after rung T's skeptic's fix (`compiler_tests/GenericMethodTupleParameterCompiled.test`). Workaround: two names. In a trait whose object redeclares one of the two, the other's call stops with an InterpreterBug, 'The number of parameters (2) does not match with the number of arguments (1)'; compiled, both run.
- The notes gained: In a trait whose object redeclares one of the two, the other's call stops with an InterpreterBug, 'The number of parameters (2) does not match with the number of arguments (1)'; compiled, both run.

## Row 1073, noted

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker accepts an object that inherits two getters of one name from sibling traits, `getter side(): String` in `Shape` and `getter side(): ZZ32` in `Marked`, where it refuses two dotted methods `m(): String` so inherited, 'Invalid overloading of m in object'
- Reproducer: none
- Notes now: siblings: 735, 540. `fortress compile` of `object BothShape extends { Shape, Marked } end` exits 0; the same program's `object PandQ extends { P, Q } end` over two `m(): String = ...` is refused, 'Invalid overloading of m in object PandQ'. Walk runs it too. In a `typecase` arm `s': Marked` over `s: Shape`, `"binder " \|\| s'.side` prints 'binder shape side' under walk (row 735's order of the extends clause) and 'binder 7' compiled, where the receiver's owner among the conjuncts is the first that has the getter. Cause: `toMethodArrows` drops getters (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:210`); `getterArrow` (`:224`) is for a redeclared getter.
- The notes gained: Cause: `toMethodArrows` drops getters (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:210`); `getterArrow` (`:224`) is for a redeclared getter.

## Row 1076, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator stops on a generic method called on a receiver typed by a type variable, 'ClassCastException: VarType to TraitType': the one …
- Claim at the base: the code generator stops on a generic method called on a receiver typed by a type variable, 'ClassCastException: VarType to TraitType': the one library's `__bigOperator2`, at `xs.generate[\L1\](…)` with `xs: F` and `F extends Generator[\E\]`
- Reproducer: `ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod.test`
- Notes now: fixed `8e4cc0c16`; full text: history, row 1076
- The notes gained: fixed `8e4cc0c16`; full text: history, row 1076; they lost: siblings: 540, 1072. The branch of `CodeGen.forMethodInvocation` for a call with static arguments casts the receiver's type to `TraitType` (`compiler/codegen/CodeGen.java:7326` at d3747846c1); the cast's value is read only in a branch that `if (false && …)` turns off (`:7329`), and what stands behind the cast is not known. `__bigOperator2` (`Library/FortressLibrary.fss:1656`) meets it at `:1675...

## Row 1078, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (codegen).
- Claim: compiled against the one library, `FortressLibrary`'s class fails the JVM's verification as it loads, 'VerifyError: Bad local variable type' in …
- Claim at the base: compiled against the one library, `FortressLibrary`'s class fails the JVM's verification as it loads, 'VerifyError: Bad local variable type' in `simplestRationalBetween`, a function with `label` and `exit`, so the array program `Arr` dies: seen in a scratch tree with probe Y's hacks
- Reproducer: `ProjectFortress/compiler_tests/BlockBindingScopeCompiled.test`
- Notes now: fixed `42c9f707d`; full text: history, row 1078
- The notes gained: fixed `42c9f707d`; full text: history, row 1078; they lost: siblings: 81, 322, 983. Seen once, in the page's scratch tree: the base build at c3b16ef2d1 with `compile-ladder/plan-31/probes/probe-y.patch`, its three library files redone, and `bin/fortress run Arr` with the verifier on (the reproducer, section 11, "This page's scratch tree"); the rehearsal, probe Y and the page's other runs had it off. Not reproducible on main, where no program runs agains...

## Row 1088, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator stops at a call at an assumption of a generic trait of a method whose parameter has the trait's type parameter, as `stamp(Q asif Tagged[\String\], s asif String)` for `stamp(self, x: T)` in `Tagged[\T\]`: 'Can't find the body that Tagged[\String\] gives stamp at ...'
- Reproducer: `ProjectFortress/compiler_tests/XXXAsIfGenericTraitParamCompiled.test`
- Notes now: siblings: 818, 940. So too a dotted call, `(Q asif Tagged[\String\]).seal(s asif String)`; a method whose parameters do not name `T` compiles. `emitBodyGivenBy` (`CodeGen.java:7209-7234`) finds the body, whose signature differs from the call's; not traced further. The base stops so at a local trait; at an imported api's generic trait it ran the object's override, and since rung R's `hasBodyInItsTrait` it stops so, also at the prelude's `Equality[\T\]`: '... CompilerAlgebra.Equality[\Pt\] gives = at (LSkAsIfPrelude$Pt;)'. Walk prints `Tagged stamp`.
- The notes gained: (`CodeGen.java:7209-7234`); they lost: (`CodeGen.java:7200-7225`)

## Row 1090, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (walk).
- Claim: walk's native strings work only after the object `FlatString`'s name is evaluated, so `FlatString.fss:29` names it as a value, `ignore(FlatString)`; …
- Claim at the base: walk's native strings work only after the object `FlatString`'s name is evaluated, so `FlatString.fss:29` names it as a value, `ignore(FlatString)`; once `FlatString` is written over a payload class, the compiled path refuses the line: 'Can't compile the number type FlatString as a value yet'
- Reproducer: `ProjectFortress/tests/NativeStringsReadyAtLoadWalk.fss`
- Notes now: fixed `3e19933c6`; walk applies a native singleton's constructor as BuildNativeEnvironment.forObjectDecl1 binds it (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java:161-163), and Library/FlatString.fss names FlatString as a value no more; with the line gone, nothing in the component names FlatString as a value, so once run 2 writes FlatString over a payload class the compiled path compiles the component without meeting row 1082's refusal there; a program's own ignore(FlatString) still gets it; full text: history, row 1090
- The notes gained: fixed `3e19933c6`; walk applies a native singleton's constructor as BuildNativeEnvironment.forObjectDecl1 binds it (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java:161-163), and Library/FlatString.fss names FlatString as a value no more; with the line gone, nothing in the component names FlatString as a value, so once run 2 writes FlatString over a payload class the compiled path compiles the component without meeting row 1082's refusal there; a program's own ignore(FlatString) still gets it; full text: history, row 1090; they lost: siblings: 1082, 874. Walk's native `FlatString` sets the strings' constructor only when the object is made from its name (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FlatString.java:32-35`); without the line walk's `Hello` dies, 'NullPointerException: ... FNativeObject.getConstructor() is null'. The team wrote it `FlatString;` (5a68404fdf); the revival respelled it (1e176516cf)....

## Row 1092, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-BOUNDED. Class: implementation gap (library).
- Claim: the one library's `RR32` declares no `exp`, `log` or trigonometric function, where `RR64` declares `sin` to `exp`, so by reading `exp(r)` for an `RR32` `r` converts the argument to `RR64` and answers an `RR64`, on both paths
- Reproducer: none
- Notes: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:41-81` (`RR32`, with `SQRT`) against `Library/FortressLibrary.fsi:366-374` (`RR64`'s `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`, `log`, `exp`), at `a62e1e30e6`; read, not run: the conversion is `RR64`'s `coerce(x: RR32)`. It blocks a `float` softmax and loss in the flat program (`MicroGptFlat.fss:23`, `:56`; `FlatArrays.fss:31-32`). P-27's plainest case: a form that the library has for one number type and lacks for another.

## Row 1093, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses a method call on a value of a type variable whose bound is another type variable bounded by the method's trait: `x.n()` with `x: F` in `chained[\H extends Gen, F extends H\]`, 'No such method F.n.'; walk runs the call
- Reproducer: `ProjectFortress/compiler_tests/XXXMethodThroughTypeVariableBound.test`
- Notes: siblings: 1076, 1072. The section lets a naked type variable stand in a type parameter's `extends` clause, excluding one only from a trait's or object's, so `F` lies below `Gen` through `H`. Under walk on 639eef1806 the program prints 7. A trait as the bound, written in the parameter's `extends` clause or in a `where` clause, is read. Once the checker accepts the form, the code generator's owner of a generic method's call (`CodeGen.typeVariableMethodOwner`) reads only bounds that are trait types, not a bound's own bounds. Workaround: bound `F` by the trait.

## Row 1094, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses an object's dotted method that redeclares a self-typed trait's method at the same parameter types with a narrower return type: it reads the trait's receiver as `Tn[\On\] & {On}`, equivalent to the object, and checks the pair both ways
- Reproducer: XXXSelfTypedMethodNarrowedReturn
- Notes: siblings: 879, 993. `toMethodArrows` takes a dotted method's receiver from the index's self type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:214`), for a self-typed trait the intersection P-146 gives its bodies; `checkOverridingReturnType` runs `returnTypeCheck` both ways at equal parameter types (`:733-734`), at 0579b62a7f and on the base: 'For g, the return type of (Tn[\On\] & {On})->Number ... should be a subtype of the return type of On->ZZ32'. A getter reads the plain type (`getterArrow`, `:224`) and compiles. Walk runs the program. Workaround: declare the method at the trait's return type.

## Row 1095, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: library bug (library).
- Claim: components of the one library that no stage checks hold getters whose return types are not subtypes of those of the getters they keep from being inherited: `Sparse`'s `indexValuePairs` at `Generator`, and `Random`'s proxies' `left`, `min`, `max`, `right` at `Maybe[\T\]` beside `Maybe[\U\]`
- Reproducer: none
- Notes: siblings: 993. `explorations/coordinator/tools/distance/run.sh` with its components the library's 40 others, at 721bd2b25b: 'For left, the return type of RandomGenWithDistribution[\T,U\]->Maybe[\T\] @ Random.fss:159:5-46 should be a subtype of the return type of Random.RandomGen[\U\]->Maybe[\U\] @ Random.fss:28:5-31:27'; `Library/Sparse.fss:26`, `:124`, `:168`; `Library/Random.fss:159-162`, `:175-178`. Random's objects extend `RandomGen[\U\]` with members at `T`, as their `random(): T`, refused on the base. `Library/PureList.fss:175-177` has the forms, unmeasured: its overloading stage crashes first.

## Row 1096, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED. Class: implementation gap (checker).
- Claim: the compiled checker's overloading stage crashes on three components of the one library that no stage checks: `Format` and `Generator2` with `OptionUnwrapException`, `PureList` with `NoSuchElementException: None.get` in `AbstractMethodChecker.domainApart`
- Reproducer: none
- Notes: `explorations/coordinator/tools/distance/run.sh` with its components the library's 40 others, at 721bd2b25b: '@@SC CRASH component Format overloading edu.rice.cs.plt.tuple.OptionUnwrapException'. Format's in `toFunctionArrows` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:129`), Generator2's in `toMethodArrows` (`:215`) from the per-provider check (`:416`), PureList's at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:189`. No frame is in code that 0579b62a7f changed; the run was not made on the base build. The crash hides the component's later checks.

## Row 1097, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker checks no return type of an object expression's getter or dotted method against the declaration of its name that it keeps from being inherited: `object extends T getter g(): Number = 3 end`, `T` declaring `getter g(): ZZ32`, passes `fortress typecheck`
- Reproducer: none
- Notes: siblings: 570, 375. `checkOverridingReturnType` runs in the per-provider loop over the unit's named traits and objects (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:377-378`, the call at `:422`), which row 570 names. At 355edea65c and on the base, `fortress typecheck` exits 0 on `mk(): T = object extends T getter g(): Number = 3 end` and on its dotted form, `g(): Number` beside `g(): ZZ32`, which both codes' checker refuses in an object declaration: 'For g, the return type of O->Number ... should be a subtype of the return type of T->ZZ32'. `fortress compile` then stops, 'Can't compile ObjectExpr' (row 375); walk runs the program.
