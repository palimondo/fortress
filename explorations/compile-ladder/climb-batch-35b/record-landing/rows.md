<!-- The record-landing workflow's evidence of the gap ledger: each row that 5a5955155..9d5d21bf5 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- closed as FIXED: 184, 390, 815, 981, 1053, 1057, 1058
- rewritten: 744
- noted: 770, 1112
- opened: 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 184, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library gap vs spec (library).
- Claim: walk stops on `≡` (`EQV`) with an **InterpreterBug**, '** bug! Expect all oprefs to be top level EQV', not a type error, and refuses `≢` (`NEQV`) …
- Claim at the base: applying a host-known operator (`≡`, i.e. `EQV`) to a user object with no definition of it raises an **InterpreterBug**, not a type error
- Reproducer: `ProjectFortress/tests/BooleanEquivalenceWalk.fss`
- Notes now: fixed `e5cf04d47`; the compiled path under the one library: one_library_tests/OneLibraryBooleanEquivalence.test; full text: history, row 184
- The notes gained: fixed `e5cf04d47`; the compiled path under the one library: one_library_tests/OneLibraryBooleanEquivalence.test;; they lost: `** bug! Expect all oprefs to be top level EQV`, exit 1, for a plain `a ≡ b` in `run()`, with `object Pt(x: ZZ32) end`, `a = Pt(1)`, `b = Pt(1)`, at c124c6b65, no DSL. `getOp` raises it when the operator reference is not at top level (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:896` at c124c6b65); the library declares `≡` for no type of the call. With `opr ≡(a: Ap...

## Row 390, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: on the compiled path, an overloaded call that one declaration takes without coercion and another only by a value's coercion dies with …
- Claim at the base: on the compiled path, an overloaded call that one declaration takes without coercion and another only by a value's coercion dies with `NoSuchMethodError`: with `p(x: Wide)`, `p(x: Any)` and a `coerce` in `Wide`, `p(NarrowOf(1))` names a dispatcher, `=p{...}(Any)`, that is never emitted
- Reproducer: `ProjectFortress/compiler_tests/CoercionAnyOverloadRungC.test`
- Notes now: fixed `08860c527`; full text: history, row 390
- The notes gained: fixed `08860c527`;; they lost: The test prints REACHED, then 'NoSuchMethodError: ... \=p{...}(fortress.AnyType$Any)'. By reading: a declaration without static parameters is checked once with its coercions, so the attempt by subtyping keeps `p(x: Wide)` among the candidates behind `p(x: Any)` (`scala_src/typechecker/impls/Functionals.scala:744-747`, `:941` at 5466455249), and the call names a dispatcher over both at `Any`. Wi...

## Row 744, rewritten (claim, notes)

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a dotted call writing static arguments to a name its receiver overloads by a plain and a generic method stops, 'Don't actually resolve overloading of generic methods yet.' at `Sm[\ZZ32\].distribute[\Lifted[\ZZ32\]\](Mx[\ZZ32\])`, an inherited `distribute[\K\]` beside a plain `distribute`
- Claim at the base: under walk, a dotted call with explicit static arguments to a method name its receiver overloads stops, 'Don't actually resolve overloading of generic methods yet.': `Sm[\ZZ32\].distribute[\Lifted[\ZZ32\]\](Mx[\ZZ32\])`, an inherited `distribute[\K\]` beside a plain `distribute(r: Mx[\T\])`
- Reproducer: none
- Notes now: siblings: 21, 723, 1057. `DottedMethodApplication.typeApply` refuses an `OverloadedMethod` with an overload that is no generic method's instance (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:157` at 84ca5ae101); the team met it in 2009 (`Library/Generator2.fss:75-76`). The call that writes no static argument runs (`MethodStaticArgOverloadedReceiver`). Compiled, the explicit call runs the plain overload. Program and output: `explorations/perf-probes/generic-distribute/REPORT.md` sections 3, 5, 7. With the library's generic `distribute` (`2b1cd8e63`), `SumReduction[\ZZ32\].distribute[\Maybe[\ZZ32\]\](MaxReduction[\ZZ32\])` stops so.
- The notes gained: 723, 1057. `DottedMethodApplication.typeApply` refuses an `OverloadedMethod` with an overload that is no generic method's instance (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:157` at 84ca5ae101); the team met it in 2009 (`Library/Generator2.fss:75-76`). The call that writes no static argument runs; they lost: 723. `DottedMethodApplication.typeApply` refuses any `OverloadedMethod` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:130` at c124c6b65); the team met it in 2009 (`Library/Generator2.fss:75-76`). One declaration of the name runs, and so does the call that writes no static argument

## Row 770, noted

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses an api whose object declares the abstract functional method of the trait comprising it: `num(self): ZZ32` in `trait Q comprises { R }` and in `object R extends Q`, 'There are multiple declarations of num with the same parameter type', where walk runs it
- Reproducer: `ProjectFortress/compiler_tests/XXXApiFunctionalMethodOfComprisedObject.test`
- Notes now: siblings: 739, 727, 815. An api's top-level set reads every functional method with no filter (`toFunctionArrows` returns at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:139` at c124c6b65 when not `onlyConcrete`), where a component's leaves out an abstract one that a subtype's declaration implements (`:140-162`; twin `AbstractFunctionalMethodImplementedByComprised`). `R` does not inherit `Q`'s `num`, whose parameter type equals its own (`basic/traits.tex`). The one library's `QQ` and `Ratio` are not in its api. Workaround: the object's declaration out of the api. Without an api, compiled, `num(R)` on the object runs.
- The notes gained: runs.; they lost: dies at run time (row 815).

## Row 815, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: compiled, a functional method of a trait that comprises an object, called on a value whose static type is the object, dies at run time with …
- Claim at the base: compiled, a functional method of a trait that comprises an object, called on a value whose static type is the object, dies at run time with `NoSuchMethodError`: `num(R)` for `abstract num(self): ZZ32` in `trait Q comprises { R }` and `num(self): ZZ32 = 1` in `object R extends Q`, where walk runs it
- Reproducer: `ProjectFortress/compiler_tests/FunctionalMethodComprisedObject.test`
- Notes now: fixed `08860c527`; the call on self: compiler_tests/ComprisesSelfAbstractFunctionalMethodCall.test; full text: history, row 815
- The notes gained: fixed `08860c527`; the call on self: compiler_tests/ComprisesSelfAbstractFunctionalMethodCall.test;; they lost: siblings: 770, 739, 1100. The missing method is the pair's overload method, `\=num{<Q's span>,<R's span>}(Q)`, which the component's class does not hold; it links clean. The same with `num(self)` not written `abstract`; it runs with no `comprises` clause, with a dotted `num()`, and through a `Q`-typed value (`AbstractFunctionalMethodImplementedByComprised`). Program and outputs: `compile-ladder...

## Row 981, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk a numeral type written in a `comprises` clause loads and runs: `trait T comprises { NaturalNumeral[\1, 10, 3\] } end` runs, where the text …
- Claim at the base: under walk a numeral type written in a `comprises` clause loads and runs: `trait T comprises { NaturalNumeral[\1, 10, 3\] } end` runs, where the text makes it a static error (P-174) and walk refuses the same type in an `extends` clause or as a static argument at load
- Reproducer: `ProjectFortress/tests/NumeralTypeComprisedWalk.fss`
- Notes now: fixed `5c31f2b68`; the three other written forms: row 1124; full text: history, row 981
- The notes gained: fixed `5c31f2b68`; the three other written forms: row 1124; full text: history, row 981; they lost: siblings: 974, 551. Walk's load check reads the types that a trait or an object extends and the static arguments (`interpreter/evaluator/BuildEnvironments.java`, `checkNumeralTypesWritten`), fork N3's two forms. The compiled checker refuses it, 'NaturalNumeral cannot be written in a program except as a parameter's type.' A numeral type as a variable's, a field's or a return type is refused unde...

## Row 1053, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path an assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, …
- Claim at the base: on the compiled path an assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, dies at run time, `NoSuchMethodError`: `c.t := High` for `object Cell(var t: T)` and `object High extends T`; the checker accepts it and walk runs it
- Reproducer: `ProjectFortress/compiler_tests/VarFieldAssignedSubtypeRun.test`
- Notes now: fixed `08860c527`; full text: history, row 1053
- The notes gained: fixed `08860c527`; full text: history, row 1053; they lost: siblings: 397, 991. 'NoSuchMethodError: FVoid …$Cell.t(…$High)': the setter's call names the value's static type, not the field's. On the base and after rung K. The same for `c.r := self` in `trait Q comprises { R }` and `object Cell(var r: R)`: '…$Cell.r(…$Q)'; once the call names the field's type, that value needs the cast of `CodeGen.castToTypeBelow`. A value of the field's own type runs. Th...

## Row 1057, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, two generic dotted methods of one name and one static parameter that differ in their number of parameters fail at a call, 'Cannot find …
- Claim at the base: under walk, two generic dotted methods of one name and one static parameter that differ in their number of parameters fail at a call, 'Cannot find definition for method tk given receiver Two': `tk[\U\](y: U, z: U)` beside `tk[\U\](y: U, z: U, w: U)` in `object Two`
- Reproducer: `ProjectFortress/tests/GenericMethodOverloadArity.fss`
- Notes now: fixed `5c31f2b68`; its wider forms: tests/GenericMethodOverloadSetWalk.fss; full text: history, row 1057
- The notes gained: fixed `5c31f2b68`; its wider forms: tests/GenericMethodOverloadSetWalk.fss; full text: history, row 1057; they lost: siblings: 744, 760. The message is written at `interpreter/evaluator/values/DottedMethodApplication.java:106` at 647163a9c4. Alike with the static argument written and inferred, and where one overload's one parameter is a pair, `tk[\U\](y: (U, U))`. The compiled path runs the pair without a tuple on the base and after rung T, 2 and 3, and the form with the pair after rung T's skeptic's fix (`co...

## Row 1058, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: walk refuses at load a plain declaration at an object type inside a generic one whose result is a tuple holding its type parameter, 'fails the Return …
- Claim at the base: walk refuses at load a plain declaration at an object type inside a generic one whose result is a tuple holding its type parameter, 'fails the Return Type Rule', a valid pair: `pt[\T extends Number\](a: T): (T, ZZ32)` beside `pt(a: Dot): (Dot, ZZ32)`, `object Dot extends Number`
- Reproducer: `ProjectFortress/tests/GenericBesidePlainTupleReturnWalk.fss`
- Notes now: fixed `5c31f2b68`; full text: history, row 1058
- The notes gained: fixed `5c31f2b68`; full text: history, row 1058; they lost: siblings: 550, 1048. The reading at object arguments takes a returned type parameter only (`returnRuleAtObjectArguments`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:895`, at 2d11d508d3); tuple types are covariant (`basic/types-vals-vars.tex`, "Tuple Types"), so `(Dot, ZZ32)` lies below `(T, ZZ32)` at every instance whose `T` holds a `Dot`. The com...

## Row 1112, noted

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: compiled, a call on `self` in a trait whose `comprises` clause lists types, where the trait's declaration and a listed type's tie, takes the trait's and its return type; the specification takes the listed type's, more specific, whose return type may be narrower
- Reproducer: none
- Notes now: siblings: 1100, 815, 935. In such a trait self is the trait met with the listed types (`var-ref.tex:63-69`), so a listed type's declaration applies at self and is more specific (`overloading.tex:355-358`). The checker reads the trait's own self parameter as the same meet and ties the two; since `b7b5b0c02b` the tie keeps the trait's (row 1100), so the call takes the trait's return type, wider where the listed type's is narrower. In both libraries the tied declarations return one type. Compiled, the call runs (`ComprisesSelfAbstractFunctionalMethodCall`). Source: `climb-batch-35/REPAIR-gate.md`, "The site" and "Deviations from the ruling", 3.
- The notes gained: Compiled, the call runs (`ComprisesSelfAbstractFunctionalMethodCall`).; they lost: A call at the listed type's arrow names the overload method that row 815 finds missing.

## Row 1118, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk loads a program that applies, as a link of a chain, an operator that no declaration defines, as `x APPROX y`, and a call stops in `getOp` with an **InterpreterBug**, '** bug! Expect all oprefs to be top level APPROX'; the compiled path refuses it statically, 'Operator APPROX is not defined.'
- Reproducer: ProjectFortress/tests/XXXUndeclaredChainOperatorWalk.fss
- Notes: siblings: 184. Walk turns the chain desugaring off (`ProjectFortress/src/com/sun/fortress/Shell.java:286-288,491-492`); the disambiguator checks the operator of an `OpExpr` (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:498-503`), not a chain's links; `forChainExpr` (`.../interpreter/evaluator/Evaluator.java:437-469`) calls `getOp` (`:893-909`), at 5a59551554. Probe: `println(a APPROX b)` for two `Pt(1)` objects, exit 1. The compiled path desugars the chain first (`compiler/PreDisambiguationDesugarer.java:96-97`) and refuses it against either library. Workaround: declare the operator.

## Row 1119, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: on the compiled path under the compiler's prelude, `≢` (`NEQV`) takes two values of any type and answers their strict non-equivalence: `Pt(1) ≢ Pt(2)` for a program's `object Pt(x: ZZ32)`, which declares no `≡`, compiles and prints `true`
- Reproducer: none
- Notes: siblings: 184, 908. The prelude declares `opr NEQV(a:Any, b:Any):Boolean = NOT (a === b)` (`Library/CompilerLibrary.fss:71`, `Library/CompilerLibrary.fsi:31` at 5a59551554); the specification gives `≢` as `¬` of `≡` at a `T extends BinaryPredicate[\T, ≡\]`, and strict non-equivalence the name `NSEQV`. Against the one library the checker refuses the call, 'Could not check call to operator NEQV', and walk stops at it, 'Unification error: Closure/Constructor for NEQV param 1 (a:Boolean) got arg Pt of type Pt'. Probe, not kept: `bin/fortress compile` then `run` of that program, `REACHED` and `true`. Until the switch-over (P-38).

## Row 1120, opened

- Section: 1. Syntax: lexing, expressions and declarations. Status: CONTESTED. Class: implementation gap (parser).
- Claim: the parser reads `NOTEQUIV`, `NOTSUBSET` and `NOTSUBSETEQ`, which the specification's overview gives as ASCII shorthands for `≢`, `⊄` and `⊈`, as operators of their own that nothing declares: both paths refuse `t NOTEQUIV f` for two booleans, 'Operator NOTEQUIV is not defined.'
- Reproducer: ProjectFortress/tests/NotEquivShorthandWalk.fss
- Notes: siblings: 184. The overview's table of ASCII shorthands lists the three; the operators appendix, whose lines give "any ASCII shorthand or short names" of each character, gives `NEQV`, `NSUBSET` and `NSUBSETEQ` only. The parser's alias table follows the appendix (`ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/Operators.java:1584-1585`, `:2108` at 5a59551554) and reads the overview's three only in a character literal (`ProjectFortress/src/com/sun/fortress/parser/Literal.rats:441-443`). Unsettled: whether the overview's names are spellings. Workaround: write `NEQV` or `≢`.

## Row 1121, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (library).
- Claim: the one library declares none of `⊕` (`OPLUS`), `⊼` (`NAND`) and `⊽` (`NOR`), which the specification gives `Boolean` and the compiler's prelude declares, nor `majority`: walk and the compiled path under the one library refuse `t OPLUS f`, 'Operator OPLUS is not defined.'
- Reproducer: ProjectFortress/tests/XXXBooleanOplusNandNorMajorityWalk.fss
- Notes: siblings: 184. The prelude declares the three in `Boolean` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:464`, `:469-470` at 5a59551554), and compiled under it they print the specification's values, so the compiled path loses them at the switch-over; no library declares `majority`, 'Variable majority is not defined.' on both paths. The typeset sentence of `NOR` (`:293-294`) describes `OR`, against its name and the trait's property `(a NOR b) = NOT (a OR b)` (`:76`); the test follows the property. Workaround: `a XOR b`, `NOT (a AND b)`, `NOT (a OR b)`.

## Row 1122, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, two generic declarations one inside the other whose results are tuples holding each its own type parameter are refused at load, 'fails the Return Type Rule', a valid pair: `ident[\T extends Shape\](x: T): (T, ZZ32)` beside `ident[\T extends Round\](x: T): (T, ZZ32)`
- Reproducer: `ProjectFortress/tests/XXXGenericPairTupleReturnWalk.fss`
- Notes: siblings: 1058, 537. `returnRuleAtEveryInstance` reads a returned type parameter only, `if (rOut != p) return false` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1305` at 84ca5ae101), where the reading at object arguments compares a tuple result element by element since 84ca5ae101 (`belowAtObjectArguments`). The same pair with results `T` loads and runs. Compiled, the checker accepts the pair and the code generator stops, 'duplicate entry' (row 537).

## Row 1123, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, of two generic functional methods of one name and arity in an object, excluding at a plain parameter, the second is never chosen: `fm(O, 4, "a")` stops, 'Failed to find any matching overload', for `fm[\T\](self, x: T, z: ZZ32)` beside `fm[\T\](self, x: T, z: String)`
- Reproducer: `ProjectFortress/tests/XXXGenericFunctionalMethodsExcludingWalk.fss`
- Notes: siblings: 1057, 779, 780, 724. Before 84ca5ae101 both calls stopped, 'Cannot find definition for method fm[...] given receiver O', as row 1057's dotted pair did; since, `fm(O, 4, 5)` runs, and the call over a String fails in `OverloadedMethod.getApplicableMethod`, from `FunctionalMethod.getApplicableClosure` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionalMethod.java:64` at 84ca5ae101), also when it comes first; not traced further. Two such methods of two numbers of parameters run (`GenericMethodOverloadSetWalk`). Compiled, the compile stops with row 724's ClassCastException.

## Row 1124, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a numeral type written as a return type, a variable's or a field's type loads, and is refused only where a numeral meets it: `never(x: ZZ32): NaturalNumeral[\1, 10, 3\] = never(x)` loads and runs, where the text makes it a static error (P-174) and the checker refuses it
- Reproducer: `ProjectFortress/tests/XXXNumeralTypeReturnTypeWalk.fss`
- Notes: siblings: 981, 974. Walk's load check (`interpreter/evaluator/BuildEnvironments.java`, `checkNumeralTypesWritten`) reads the types that a trait or an object extends, a trait's comprises clause and the static arguments; P-12 leaves the other forms to the checker once walk runs it. A variable of a numeral type is refused when its numeral binds, 'Type mismatch binding 3' (`tests/NumeralTypeNoValueWalk.fss`). The checker refuses the return type, 'NaturalNumeral cannot be written in a program except as a parameter's type.'

## Row 1125, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, of two generic dotted methods of one name, number of parameters and kinds of static parameters that differ only in their bounds, one is dropped: `Nested.tk(n)` for a `ZZ32` answers 2 with `tk[\U extends Number\](y: U)` beside the more specific `tk[\U extends ZZ32\](y: U)`
- Reproducer: `ProjectFortress/tests/XXXGenericMethodBoundsDifferWalk.fss`
- Notes: siblings: 1057, 478, 735. The two share one symbolic instantiation made from one's static parameters (`Constructor.genericKey`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:902` at 529e8955ba), so their instances have one signature and the first met is kept; with `String` for `ZZ32`, a call over a `String` stops, 'Meet(String, Number) not a singleton'. Before rung L the pair stopped, 'Cannot find definition'; in two traits, or a trait's method redeclared in an object at another bound, it stops or drops one on the base. The same top-level pair answers 3 and 2. Compiled, the code generator stops, 'duplicate entry' (row 537).

## Row 1126, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a call on a receiver assumed at a trait of a method name that the trait overloads by two generic dotted methods stops, 'Missing type U': `(Inherits asif Tk).tk(1, 2)` with `tk[\U\](y: U, z: U)` beside `tk[\U\](y: U, z: U, w: U)` in `trait Tk`
- Reproducer: `ProjectFortress/tests/XXXAsIfGenericMethodOverloadsWalk.fss`
- Notes: siblings: 1057, 922, 760. `DottedMethodApplication.asMethodOverloads` finishes the trait's members' overloaded function (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:131` at 529e8955ba), which reads the generic methods' parameter types without their static parameters, row 760's mechanism; alike on the base. The same calls on the object itself run since rung L (`GenericMethodOverloadSetWalk`). Compiled, a type assumption at a generic method's receiver is refused (row 922).

## Row 1127, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses a functional method of an object that a trait's `comprises` clause lists, at a return type narrower than the trait's abstract declaration's: `twin(self): R` in `object R extends Q` beside `abstract twin(self): Q` in `trait Q comprises { R }`, where walk runs it
- Reproducer: `ProjectFortress/compiler_tests/XXXComprisesFunctionalMethodNarrowedReturn.test`
- Notes: siblings: 1094, 1112, 879. 'the return type of (Q & {R})->Q ... should be a subtype of the return type of R->R': the checker reads the trait's self parameter as `Q & {R}`, equivalent to `R`, so the two declarations have one domain and the return types are checked both ways (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:533-534` at 5a59551554). By the declared types `R` is strictly below `Q`, so the rule asks only that `R` be below `Q`. Workaround: declare the object's method at the trait's return type.
