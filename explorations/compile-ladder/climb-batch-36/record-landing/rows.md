<!-- The record-landing workflow's evidence of the gap ledger: each row that b5a758846..99035e231 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 499, 762
- rewritten: 528, 770, 780, 1094
- closed as FIXED: 543, 879, 935, 994, 1046, 1047, 1091, 1099, 1100, 1112, 1122, 1124, 1125, 1127
- opened: 1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 499, noted

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: design limit (checker).
- Claim: the compiled checker accepts generic overloads in the more-specific relation that do not agree position by position, and the dispatcher answers at the call's instantiation: through `viaT[\T\](x: T) = f(x)`, a `Box` runs `f[\T\](x: T)`, not `f[\U\](x: Box[\U\])`
- Reproducer: `ProjectFortress/compiler_tests/XXXGenericPositionalBox.test`
- Notes now: siblings: 538. The dispatcher reads an arm with as many static parameters as the template at the template's parameters by position, not checking the arm's kinds (`OverloadSet.java:1342-1353` at c124c6b65). F-75's positional rule compares kinds and return types; both pairs return `String`. `XXXGenericPositionalFixed` (`grab` on `Tag[\X\]` and on `Fixed[\Y\] extends Tag[\Blue\]`) answers `tag` for `fixed`; walk's answer since row 159's fix is not measured. The direct call `f(b)` answers `box`, the declaration more specific by its declared parameter types (`compiler_tests/GenericTiesDeclaredCompiled`); full text: history, row 499
- The notes gained: `box`, the declaration more specific by its declared parameter types (`compiler_tests/GenericTiesDeclaredCompiled`);; they lost: `box` or `any` by the compiling JVM, the checker keeping the sort's head on a tie (`scala_src/typechecker/impls/Functionals.scala:824-832` at c124c6b65);

## Row 528, rewritten (claim, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: on the compiled path the prelude's `RR32` declares no `=` and takes `Equality`'s, which calls `===`, whose `RR32` declaration calls `=`: `a = b` over two `RR32` values and `a = 1.5` compile clean and overflow the stack when they run, and `c = 0` is refused, 'Ambiguous coercion in call to operator ='
- Claim at the base: on the compiled path the prelude's `RR32` takes its `=` from `Equality`, which calls `===`, whose declaration at `RR32` calls `=`, so `a = b` over two `RR32` values, `a = 1.5` or `c = 0` compiles clean and overflows the stack when it runs
- Reproducer: `ProjectFortress/library_tests/XXXRR32EqualityRungV.test`
- Notes now: siblings: 529, 1059. At 647163a9c4 the prelude's `RR32` declares only its numeral coercions (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:955-958`), `Equality`'s `=` is `(self === other)` (`Library/CompilerAlgebra.fss:26`) and `opr ===(a:RR32, b:RR32)` is `a=b` (`Library/CompilerLibrary.fss:67`): 'java.lang.StackOverflowError'. At `c = 0` both `Equality[\RR32\]`'s `=`, its `self` read at the trait, and `RR64`'s need a coercion, and neither is more specific (`compiler_tests/XXXNumeralEqualsRR32Compiled`). Repair: the one library's `RR32` at the switch-over; P-37 adds no prelude declaration. Workaround: bind `r: RR64 = c` and compare `r`.
- The notes gained: 'java.lang.StackOverflowError'. At `c = 0` both `Equality[\RR32\]`'s `=`, its `self` read at the trait, and `RR64`'s need a coercion, and neither is more specific (`compiler_tests/XXXNumeralEqualsRR32Compiled`). Repair: the one library's `RR32` at the switch-over;; they lost: 'java.lang.StackOverflowError' in `XXXRR32EqualityRungV` and in `compiler_tests/XXXNumeralEqualsRR32Compiled`, a numeral zero. A program the checker accepts must not die in the JVM. Repair: the one library's `RR32` at the switch-over (`explorations/compile-ladder/rung-rr32-sibling/REPORT.md` section 11);

## Row 543, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: deliberate (checker).
- Claim: in a family the compiled checker accepts by coverage, a call whose argument's static type sits between two closed traits is typed by its first minimal …
- Claim at the base: in a family the compiled checker accepts by coverage, a call whose argument's static type sits between two closed traits is typed by its first minimal candidate, not by the intersection of its candidates' return types, when any declaration of the family has static parameters
- Reproducer: `ProjectFortress/compiler_tests/CoverageReturnGenericFamily.test`
- Notes now: fixed `da5f70777`; full text: history, row 543
- The notes gained: fixed `da5f70777`;; they lost: siblings: 540, 935. Row 540's family plus `object Box[\X\]` and `choose[\X\](b: Box[\X\]): BothResult`, which cannot apply to a value of `M`: `left: LeftResult = choose(m)` and `right: RightResult = choose(m)` cannot both hold ("... but declared type is RightResult" or the reverse, varying between runs). The intersection typing requires every declaration of the family to have no static paramete...

## Row 762, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object that extends a generic trait whose dotted method has a static parameter of its own bounded by the trait's stops, 'Missing type R': `pick[\K extends R\](x: K)` in `trait Picker[\R\]`, `object ShapePicker extends Picker[\Shape\]`
- Reproducer: `ProjectFortress/tests/XXXTraitBoundGenericMethod.fss`
- Notes now: siblings: 870, 567, 21. `Constructor.finishInitializing` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:216` at 3aea3da53) makes the method's symbolic instance by `SingleFcn.createSymbolicInstantiation` (`SingleFcn.java:215`), which evaluates the bound `R` without the trait's static parameters: at load for an object, at its first instance for a generic object. A bound that names no trait parameter, `N extends Number`, loads and runs. The dotted sibling of row 567, fixed for functional methods by 669b77d03. The compiled path runs the test: PASS. A redeclaration at the instance's bound stops alike, keyed apart by `Constructor.genericKey`.
- The notes gained: A redeclaration at the instance's bound stops alike, keyed apart by `Constructor.genericKey`.

## Row 770, rewritten (claim, notes)

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses an api whose trait and an object below it both declare a functional method of one name and parameter type, as `num(self): ZZ32` in `trait Q comprises { R }` and `object R extends Q`: its export check, 'Unmatched declarations ... due to different method num'; walk runs it
- Claim at the base: the compiled checker refuses an api whose object declares the abstract functional method of the trait comprising it: `num(self): ZZ32` in `trait Q comprises { R }` and in `object R extends Q`, 'There are multiple declarations of num with the same parameter type', where walk runs it
- Reproducer: `ProjectFortress/compiler_tests/XXXApiFunctionalMethodOfComprisedObject.test`
- Notes now: siblings: 739, 727, 815, 835. The overloading check reads `Q`'s `self` at `Q` in the signature and accepts the pair; the export check, which runs after it, matches no member of the component's `Q` with the api's `num`, 'Asbtract method num ... is not declared in the API' (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:791-800`, `:829-850` at b5a758846d); untraced further. The same at b5a758846d without a `comprises` clause, `trait Q` and `object R extends Q`. Workaround: the object's declaration out of the api. Without an api, compiled, `num(R)` on the object runs.
- The notes gained: 815, 835. The overloading check reads `Q`'s `self` at `Q` in the signature and accepts the pair; the export check, which runs after it, matches no member of the component's `Q` with the api's `num`, 'Asbtract method num ... is not declared in the API' (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:791-800`, `:829-850` at b5a758846d); untraced further. The same at b5a758846d without a `comprises` clause, `trait Q` and `object R extends Q`.; they lost: 815. An api's top-level set reads every functional method with no filter (`toFunctionArrows` returns at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:139` at c124c6b65 when not `onlyConcrete`), where a component's leaves out an abstract one that a subtype's declaration implements (`:140-162`; twin `AbstractFunctionalMethodImplementedByComprised`). `R` does...

## Row 780, rewritten (claim, notes)

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, two generic functional methods of a generic trait, one inside the other, stop at an extending object's first instance, 'at least one pair of parameters must have excluding types': `which[\T extends Shape\](self, x: T)` beside `which[\U extends Round\](self, x: U)` in `Holds[\S\]`
- Claim at the base: under walk, two generic functional methods of a trait with static parameters, one inside the other, load, and a call fails 'Cannot find definition for method': `which[\T extends Shape\](self, x: T)` beside `which[\U extends Round\](self, x: U)` in `trait Holds[\S\]`, on a `Circle`
- Reproducer: `ProjectFortress/tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss`
- Notes now: siblings: 779, 723, 724, 1125. The object's overloaded method `which` holds both symbolic instances since climb batch 36's rung G keys generic methods by their bounds (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:388` at 750e37dea6, `OverloadedMethod`); walk does not read the pair on its declared domains, and the parameter check refuses it. Before, the two shared one key, and the call on a `Circle` gave "shape". Two dotted generic methods so nested there run. Without static parameters the pair is 779. The compiled path stops at compile with row 724's 'ClassCastException'.
- The notes gained: 724, 1125. The object's overloaded method `which` holds both symbolic instances since climb batch 36's rung G keys generic methods by their bounds (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:388` at 750e37dea6, `OverloadedMethod`); walk does not read the pair on its declared domains, and the parameter check refuses it. Before, the two shared one key, and the call on a `Circle` gave "shape". Two dotted generic methods so nested there run. Without static parameters the pair is 779. The compiled path stops at compile with row 724's 'ClassCastException'.; they lost: 724. The message names the declaration over `T` and the receiver, `H[\ZZ32\]`, an object extending `Holds[\S\]`; the test expects "round". Either declaration alone runs: with the one over `U` removed, the call on a `Circle` gives "shape". The same pair in a trait or object without static parameters is 779, refused at load. Walk compares a functional method of a generic trait on the instance a c...

## Row 879, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: CONTESTED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker reads `self` as `C[\X\] & X` in the signatures of a trait whose `comprises` clause lists its own type parameter, so a subtrait's …
- Claim at the base: the compiled checker reads `self` as `C[\X\] & X` in the signatures of a trait whose `comprises` clause lists its own type parameter, so a subtrait's method that narrows the return type ties with its supertrait's: the Return Type Rule and calls refuse the library's `CMP` under `comprises T`
- Reproducer: `ProjectFortress/compiler_tests/ComprisesOwnParameterNarrowedReturn.test`
- Notes now: fixed `da5f70777`; settled by fork K1 of climb batch 36, a default: self at its plain trait type in each signature, comprises T included (review-queue item 621); full text: history, row 879
- The notes gained: fixed `da5f70777`; settled by fork K1 of climb batch 36, a default: self at its plain trait type in each signature, comprises T included (review-queue item 621); full text: history, row 879; they lost: siblings: 407. Signatures read the plain trait only for a self type from the F-bound (`compiler/index/FunctionalMethod.java`, `selfFromBound`, at 432749a69); `satisfiesReturnTypeRule` reads the intersection (`scala_src/overloading/OverloadingOracle.scala:77-90`), specificity the declaring trait (`lteq`, `:55-66`, `655e65d53`). Library distance 0 to 33; the 17-line `SelfCmpTieClause` of the prob...

## Row 935, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker's order of a call's candidate declarations, which a tie among the most specific follows, is not a property of the program: one …
- Claim at the base: the compiled checker's order of a call's candidate declarations, which a tie among the most specific follows, is not a property of the program: one file at one path gets two orders from two builds of one commit at two tree paths, and from one build by a direct compile and through the harness
- Reproducer: `ProjectFortress/compiler_tests/GenericTiesDeclaredCompiled.test`
- Notes now: fixed `da5f70777`; full text: history, row 935
- The notes gained: fixed `da5f70777`;; they lost: siblings: 543, 547, 929, 1100. At `157323e51`, at the rung's worktree path: of shuffles 100 to 115 of `PartialOrderCandidatesCompiled.fss`, three stop the base build, six of 100 to 125 the worktree's build, none both. Under the base build, of shuffles 1 to 12 of `TieAmongMostSpecificCompiled.fss`, 9 and 11 die by a direct compile and run, 7 through `old-fortress.sh junit`. The order is the hash...

## Row 994, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the dispatch method of a generic overloaded function of a default library's component names the component's class without the package `fortress`: its …
- Claim at the base: the dispatch method of a generic overloaded function of a default library's component names the component's class without the package `fortress`: its first call dies, 'NoClassDefFoundError: FortressLibrary'; seen in the one library at `seq`, `\|xs\|`, and `=` and `<` of strings or `=` of booleans
- Reproducer: `ProjectFortress/one_library_tests/OneLibraryRunStringEquality.test`
- Notes now: fixed `3a0bae976`; full text: history, row 994
- The notes gained: fixed `3a0bae976`; full text: history, row 994; they lost: siblings: 320, 1091. `OverloadSet` builds the owner of a generic function's instance table and its template class's name from the api's bare name at four places (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:904`, `:1361`, `:1724`, `:1728`, at 832f7d0d91); every other place asks `NamingCzar.javaPackageClassForApi`. At 1c62991e66, with the verifier on, the reproducer dies so at...

## Row 1046, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker crashes, 'V is not in the kind env', on a call of a generic declaration beside one on a generic object type with two static …
- Claim at the base: the compiled checker crashes, 'V is not in the kind env', on a call of a generic declaration beside one on a generic object type with two static parameters: `keep(Duo[\Square, Square\](Square, Square))` for `keep[\T\](x: T): T` beside `keep[\U, V\](x: Duo[\U, V\]): Duo[\U, V\]`
- Reproducer: `ProjectFortress/compiler_tests/OverloadGenericObjectTwoParams.test`
- Notes now: fixed `da5f70777`; full text: history, row 1046
- The notes gained: fixed `da5f70777`; full text: history, row 1046; they lost: siblings: 789, 1047, 499. The pair is valid. The probe compiled alone prints the crash, exit 255. The call's two candidates tie at `Duo[\Square, Square\]` and the checker keeps the sort's head (`scala_src/typechecker/impls/Functionals.scala:1104-1108` at 280835f438), so whether a compile reaches the test at `scala_src/useful/STypesUtil.scala:1195-1197` with `V` left follows the overloadings' or...

## Row 1047, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker's static type for a call of an invalid overload set depends on what the same JVM compiled before: `c: Circle = g(Circle)` for …
- Claim at the base: the compiled checker's static type for a call of an invalid overload set depends on what the same JVM compiled before: `c: Circle = g(Circle)` for `g[\T\](x: T): T` beside `g(x: Circle): String` is typed `Circle` alone and `String` after another component
- Reproducer: `ProjectFortress/compiler_tests/XXXGenericBesidePlainInvalidSetCallType.test`
- Notes now: fixed `da5f70777`; full text: history, row 1047
- The notes gained: fixed `da5f70777`; full text: history, row 1047; they lost: siblings: 499. At f145926e3b, `fortress junit` on the one program alone reports only the Return Type Rule's error, 'the return type of Circle->String'; in one JVM after a component that fails its type check, it reports 'Right-hand side has type String, but declared type is Circle.' and stops before the overloading check. Either way the program is refused. The mechanism is not traced; row 499's...

## Row 1091, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: against the one library a trait's class of default methods holds a method twice with one descriptor, its own and one inherited from a generic trait at …
- Claim at the base: against the one library a trait's class of default methods holds a method twice with one descriptor, its own and one inherited from a generic trait at its own type, so it fails to load with the verifier on: 'ClassFormatError: Duplicate method name', as `Vector`'s `-` and `ImmutableArray1`'s `copy`
- Reproducer: `ProjectFortress/one_library_tests/OneLibraryVarargsArguments.test`
- Notes now: fixed `3a0bae976`; also one_library_tests/OneLibraryArr.test and OneLibraryDot.test; its reproducer XXXOneLibraryRunVarargs.test stays an expected failure at row 1098; full text: history, row 1091
- The notes gained: fixed `3a0bae976`; also one_library_tests/OneLibraryArr.test and OneLibraryDot.test; its reproducer XXXOneLibraryRunVarargs.test stays an expected failure at row 1098; full text: history, row 1091; they lost: siblings: 990, 571, 994, 1099. `Vector`'s `opr -(self)` (`Library/FortressLibrary.fss:2799`) beside `AdditiveGroup`'s; `ImmutableArray1`'s `copy()` (`:2667`) beside `StandardImmutableArrayType`'s `copy():T` (`:2584`). Each varargs call's array is an `ImmutableArray1`, so no program that calls a varargs declaration runs (f3439cf7ce); with the verifier off the JVM does not check it, and the progr...

## Row 1094, rewritten (claim, notes)

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses an object's dotted method that redeclares, with a narrower return type at the same parameter types, a dotted method of a self-typed trait or of a trait that comprises the object: it reads the trait's receiver as the meet, equivalent to the object
- Claim at the base: the compiled checker refuses an object's dotted method that redeclares a self-typed trait's method at the same parameter types with a narrower return type: it reads the trait's receiver as `Tn[\On\] & {On}`, equivalent to the object, and checks the pair both ways
- Reproducer: XXXSelfTypedMethodNarrowedReturn
- Notes now: siblings: 879, 993, 1127. `toMethodArrows` takes a dotted method's receiver from the index's self type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:214`), the meet that the bodies read; `checkOverridingReturnType` runs `returnTypeCheck` both ways at equal parameter types (`:733-734`), at 0579b62a7f and 8f5f1912ab: 'For g, the return type of (Tn[\On\] & {On})->Number ... should be a subtype of the return type of On->ZZ32', and for `trait Q comprises { R }`, '(Q & {R})->Q ... R->R' (`XXXComprisesDottedMethodNarrowedReturn`). A getter reads the plain type (`getterArrow`, `:224`). Walk runs both. Workaround: the trait's return type.
- The notes gained: 993, 1127. `toMethodArrows` takes a dotted method's receiver from the index's self type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:214`), the meet that the bodies read; `checkOverridingReturnType` runs `returnTypeCheck` both ways at equal parameter types (`:733-734`), at 0579b62a7f and 8f5f1912ab: 'For g, the return type of (Tn[\On\] & {On})->Number ... should be a subtype of the return type of On->ZZ32', and for `trait Q comprises { R }`, '(Q & {R})->Q ... R->R' (`XXXComprisesDottedMethodNarrowedReturn`). A getter reads the plain type (`getterArrow`, `:224`). Walk runs both. Workaround:; they lost: 993. `toMethodArrows` takes a dotted method's receiver from the index's self type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:214`), for a self-typed trait the intersection P-146 gives its bodies; `checkOverridingReturnType` runs `returnTypeCheck` both ways at equal parameter types (`:733-734`), at 0579b62a7f and on the base: 'For g, the return type of...

## Row 1099, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: against the one library the class of `FullScalarRange`'s default methods holds `narrowToRange` twice at one descriptor, a bridge for each parent …
- Claim at the base: against the one library the class of `FullScalarRange`'s default methods holds `narrowToRange` twice at one descriptor, a bridge for each parent declaring it at a wider return type, so it fails to load with the verifier on: 'ClassFormatError: Duplicate method name "narrowToRange"'
- Reproducer: `ProjectFortress/one_library_tests/OneLibraryRangeReduction.test`
- Notes now: fixed `3a0bae976`; its reproducer XXXOneLibraryRunConditionalReduction.test stays an expected failure at row 1137; full text: history, row 1099
- The notes gained: fixed `3a0bae976`; its reproducer XXXOneLibraryRunConditionalReduction.test stays an expected failure at row 1137; full text: history, row 1099; they lost: siblings: 1091, 990, 790. `trait FullScalarRange` (`Library/RangeInternals.fss:1008-1010`) extends three `ScalarRangeWith…` traits and `FullRange[\ZZ32\]`; in `RangeInternals.jar` (javap of `RangeInternals$FullScalarRange$DefaultTraitMethods`, 1f8a67251d) the two methods `narrowToRange(Range⟦FZZ32⟧): BoundedRange⟦FZZ32⟧` are alike, each calling the interface's `narrowToRange` answering `FullRan...

## Row 1100, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: compiled, a call on `self` in a trait that comprises one object, of a functional method that both declare, takes the object's arrow where the …
- Claim at the base: compiled, a call on `self` in a trait that comprises one object, of a functional method that both declare, takes the object's arrow where the overloadings come in that order, and the trait's default methods fail verification, 'VerifyError: Bad type on operand stack', as the one library's `QQ` did
- Reproducer: `ProjectFortress/compiler_tests/ComprisesSelfListedTypeCompiled.test`
- Notes now: fixed `da5f70777`; its reproducer compiler_tests/ComprisesSelfAbstractFunctionalMethodCall.test stays and passes; full text: history, row 1100
- The notes gained: fixed `da5f70777`; its reproducer compiler_tests/ComprisesSelfAbstractFunctionalMethodCall.test stays and passes; full text: history, row 1100; they lost: siblings: 935, 815, 996. Self is the trait met with the listed type (`basic/expressions/var-ref.tex`, "Identifier References"), so the checker ties the two declarations; the tie kept the first in the overloadings' identity-hash order (`TopLevelEnv.java:465-466`), and the call's descriptor followed it with no cast. Climb batch 35's gate: `denominator` at `(Ratio)` in ant's onelibrary JVM, `(QQ)`...

## Row 1112, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: compiled, a call on `self` in a trait whose `comprises` clause lists types, where the trait's declaration and a listed type's tie, takes the trait's …
- Claim at the base: compiled, a call on `self` in a trait whose `comprises` clause lists types, where the trait's declaration and a listed type's tie, takes the trait's and its return type; the specification takes the listed type's, more specific, whose return type may be narrower
- Reproducer: `ProjectFortress/compiler_tests/ComprisesSelfListedTypeCompiled.test`
- Notes now: fixed `da5f70777`; full text: history, row 1112
- The notes gained: fixed `da5f70777`; full text: history, row 1112; they lost: siblings: 1100, 815, 935. In such a trait self is the trait met with the listed types (`var-ref.tex:63-69`), so a listed type's declaration applies at self and is more specific (`overloading.tex:355-358`). The checker reads the trait's own self parameter as the same meet and ties the two; since `b7b5b0c02b` the tie keeps the trait's (row 1100), so the call takes the trait's return type, wider w...

## Row 1122, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, two generic declarations one inside the other whose results are tuples holding each its own type parameter are refused at load, 'fails the …
- Claim at the base: under walk, two generic declarations one inside the other whose results are tuples holding each its own type parameter are refused at load, 'fails the Return Type Rule', a valid pair: `ident[\T extends Shape\](x: T): (T, ZZ32)` beside `ident[\T extends Round\](x: T): (T, ZZ32)`
- Reproducer: `ProjectFortress/tests/GenericPairTupleReturnWalk.fss`
- Notes now: fixed `df5948e7b`; full text: history, row 1122
- The notes gained: fixed `df5948e7b`; full text: history, row 1122; they lost: siblings: 1058, 537. `returnRuleAtEveryInstance` reads a returned type parameter only, `if (rOut != p) return false` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1305` at 84ca5ae101), where the reading at object arguments compares a tuple result element by element since 84ca5ae101 (`belowAtObjectArguments`). The same pair with results `T` loads and...

## Row 1124, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk a numeral type written as a return type, a variable's or a field's type loads, and is refused only where a numeral meets it: `never(x: …
- Claim at the base: under walk a numeral type written as a return type, a variable's or a field's type loads, and is refused only where a numeral meets it: `never(x: ZZ32): NaturalNumeral[\1, 10, 3\] = never(x)` loads and runs, where the text makes it a static error (P-174) and the checker refuses it
- Reproducer: `ProjectFortress/tests/NumeralTypeReturnTypeWalk.fss`
- Notes now: fixed `df5948e7b`; its variable's, field's and value parameter's forms: tests/NumeralTypeVariableTypeWalk.fss, NumeralTypeFieldTypeWalk.fss, NumeralTypeObjectParameterWalk.fss; a bound and a typecase arm: row 1135; full text: history, row 1124
- The notes gained: fixed `df5948e7b`; its variable's, field's and value parameter's forms: tests/NumeralTypeVariableTypeWalk.fss, NumeralTypeFieldTypeWalk.fss, NumeralTypeObjectParameterWalk.fss; a bound and a typecase arm: row 1135; full text: history, row 1124; they lost: siblings: 981, 974. Walk's load check (`interpreter/evaluator/BuildEnvironments.java`, `checkNumeralTypesWritten`) reads the types that a trait or an object extends, a trait's comprises clause and the static arguments; P-12 leaves the other forms to the checker once walk runs it. A variable of a numeral type is refused when its numeral binds, 'Type mismatch binding 3' (`tests/NumeralTypeNoValue...

## Row 1125, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, of two generic dotted methods of one name, number of parameters and kinds of static parameters that differ only in their bounds, one is …
- Claim at the base: under walk, of two generic dotted methods of one name, number of parameters and kinds of static parameters that differ only in their bounds, one is dropped: `Nested.tk(n)` for a `ZZ32` answers 2 with `tk[\U extends Number\](y: U)` beside the more specific `tk[\U extends ZZ32\](y: U)`
- Reproducer: `ProjectFortress/tests/GenericMethodBoundsDifferWalk.fss`
- Notes now: fixed `df5948e7b`; full text: history, row 1125
- The notes gained: fixed `df5948e7b`; full text: history, row 1125; they lost: siblings: 1057, 478, 735. The two share one symbolic instantiation made from one's static parameters (`Constructor.genericKey`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:902` at 529e8955ba), so their instances have one signature and the first met is kept; with `String` for `ZZ32`, a call over a `String` stops, 'Meet(String, Number) not a singleton'. Bef...

## Row 1127, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker refuses a functional method of an object that a trait's `comprises` clause lists, at a return type narrower than the trait's …
- Claim at the base: the compiled checker refuses a functional method of an object that a trait's `comprises` clause lists, at a return type narrower than the trait's abstract declaration's: `twin(self): R` in `object R extends Q` beside `abstract twin(self): Q` in `trait Q comprises { R }`, where walk runs it
- Reproducer: `ProjectFortress/compiler_tests/ComprisesFunctionalMethodNarrowedReturn.test`
- Notes now: fixed `da5f70777`; full text: history, row 1127
- The notes gained: fixed `da5f70777`; full text: history, row 1127; they lost: siblings: 1094, 1112, 879. 'the return type of (Q & {R})->Q ... should be a subtype of the return type of R->R': the checker reads the trait's self parameter as `Q & {R}`, equivalent to `R`, so the two declarations have one domain and the return types are checked both ways (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:533-534` at 5a59551554). By the decla...

## Row 1131, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on the compiled path a numeral at a type of another component, whose numeral coercion converts one of its four numbers into a bounded number type that the number does not fit, is not refused statically: class initialization raises `IntegerOverflow`, or at `RR64` binds an infinity
- Reproducer: XXXNumeralCoercionNumberRangeImported
- Notes: The checker's refusal (`NumeralConversion.numberRefusals`, `scala_src/typechecker/CoercionOracle.scala`, at 786aeae138) reads the lifted numeral coercions of the component it checks only; another component's checked body is in its analyzed cache only where that component was analyzed first and is on the source path, as `NumeralCoercionFold.components` reads it, so a refusal there would hang on the order of the compiles. The compiled method raises in `FZZ.numberAsZZ32`; `FZZ.numberAsRR64` rounds to `Infinity` with no error (`XXXNumeralCoercionNumberInfinityImported`). In the numeral's own component the checker refuses: `XXXNumeralCoercionNumberRangeCompiled`. Walk refuses on both.

## Row 1132, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: design limit (checker).
- Claim: on the compiled path a numeral coercion's number at a call runs the declaration that takes it as a `ZZ`, where a numeral goes to a more specific declaration that its own conversion reaches: for `tag(x: Number)` beside `tag(x: ZZ32)`, `tag(v)` in the body runs `tag(Number)`; walk runs `tag(ZZ32)`
- Reproducer: XXXNumeralCoercionNumberAtCallCompiled
- Notes: The checker checks a coercion's body once for every numeral, so whether a number's conversion reaches the narrower declaration, which its value decides, is not known there: `Functionals.typedApplication` (at 786aeae138) resolves a call with the numbers read as `ZZ` (`NumeralConversion.numbersAsZZ`) first, and converts them only where that resolution fails. Walk resolves at each run (`OverloadedFunction.belowByNumerals`): `tests/NumeralCoercionNumberAtCallWalk`. A check of the body at each numeral's instance would follow the rule.

## Row 1133, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, generic dotted methods of one name that differ only in their bounds, neither domain inside the other's, are refused at load where a third covers the overlap: `m[\A extends ZZ32, B extends Number\](x: A, y: B)` beside `m[\A extends Number, B extends ZZ32\]` and one bounded by `ZZ32` twice
- Reproducer: `ProjectFortress/tests/XXXGenericMethodBoundsMeetWalk.fss`
- Notes: siblings: 1125, 779. 'at least one pair of parameters must have excluding types': `methodPairValid` reads two symbolic instances only where one declared domain lies inside the other (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1126` at 750e37dea6), and the Meet Rule's readers `genericMeetCovered` and `domainsExcludeTogether` read `FGenericFunction` only (`:1457`, `:1203`). The same three top-level functions load and answer 1, 2 and 3; the compiled checker accepts the object. On the base the three shared one key, and a call stopped, 'Meet(ZZ64, ZZ32) not a singleton'.

## Row 1134, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object's generic dotted method bounded by its own component's type, beside an inherited one bounded by an api's type of the same simple name, is read as the inherited one's redeclaration: the trait's is dropped, and a call on the api's type stops, 'Meet(Foo, Foo) not a singleton'
- Reproducer: `ProjectFortress/tests/XXXGenericMethodBoundSameNameWalk.fss`
- Notes: siblings: 1125, 762. The key writes a bound's names without their apis (`Constructor.genericKey`, `BoundWriter`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:956` at 750e37dea6), so the two share one key; by reading, each key's symbolic instantiation is made in the object's environment (`:216`), where the trait's `Foo` names the object's type, so a key that wrote the api would not part them alone. Alike on the base, whose key read no bound. The compiled checker reads two declarations there, one bounded by each `Foo`.

## Row 1135, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a numeral type written as a static parameter's bound or as a `typecase` arm's type loads and runs: `bnd[\T extends NaturalNumeral[\1, 10, 3\]\](x: ZZ32): ZZ32 = x` loads, where the text makes it a static error (P-174) and the checker refuses it
- Reproducer: `ProjectFortress/tests/XXXNumeralTypeBoundWalk.fss`
- Notes: siblings: 1124, 974, 981. Walk's load check reads the extends, comprises and static-argument forms, a return type, a variable's and a field's type and an object's value parameters, and no other (`checkNumeralTypesWritten`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1212-1261` at 750e37dea6). The arm: `tests/XXXNumeralTypeTypecaseWalk.fss`. The checker refuses both, 'NaturalNumeral cannot be written in a program except as a parameter's type.' (`fortress typecheck`, `FORTRESS_LIBRARY=one`). An `excludes`, `throws` or `where` clause and an ascription are not measured; after the switch-over walk runs the checker (P-12).

## Row 1136, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: CONTESTED. Class: implementation gap (checker).
- Claim: the compiled checker keeps with no error the first by place of a tie that no rule decides among the unit's own declarations, a set its overloading check accepts, and refuses the same call of them from an api, 'Ambiguous call': two generic declarations at excluding bounds, at a type bounded by both
- Reproducer: `ProjectFortress/compiler_tests/GenericTieInUnitFirstByPlace.test`
- Notes: siblings: 935, 391. `head`'s branch `top.forall(ofThisUnit)` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1196-1198` at 8f5f1912ab) leaves such a tie to the overloading check, which accepts `f[\T extends A\](x: T)` beside `f[\T extends B\](x: T)` for `trait A excludes B`; through an api, `XXXGenericTieImportedAmbiguous`: 'Ambiguous call to function f: ... T->ZZ32; T->String.' Fork K3 of climb batch 36 makes a tie that the rules leave a static error; the section speaks of the dynamic call only. Open: the error in the unit too, or the first kept.

## Row 1137, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a function expression in an object's generic method that reads a getter of `self` fails the JVM's verification where the method is called through a value of a trait's type: the closure holds `self` at the trait's type, 'VerifyError: Bad type on operand stack'
- Reproducer: ProjectFortress/compiler_tests/XXXGenericMethodClosureSelfThroughTrait.test
- Notes: The closure's class takes `self`'s type as its last static parameter (`public final ☃ self` in the template of `fn@11`), and the instance made at `p.gen[\ZZ32\](…)` for `p: Gen[\ZZ32\]` gives it `Gen⟦ZZ32⟧`, while its body calls `Holder.g` by `invokevirtual` (7c7b040927); with `p: Holder` it runs. Against the one library `SimpleIndexValuePairs.generate` (`Library/FortressLibrary.fss:4056`) does the same, so `BIG AND` over `xs.zip[\ZZ32\](ys)` of two lists dies (`one_library_tests/XXXOneLibraryRunConditionalReduction.test`); that closure's bytecode is the base's (b5a758846d). Walk runs both. Workaround: call the method through the object's type.

## Row 1138, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a narrowing bridge in a generic trait's class forwards to the trait's own method at a descriptor where a parent's binding of a static parameter of the same name replaces the trait's own: a call at the parent's signature dies, 'NoSuchMethodError', as `copy` of a `Vector`
- Reproducer: ProjectFortress/compiler_tests/XXXNarrowingBridgeTargetParameterName.test
- Notes: siblings: 1091, 643. `Par[\T extends Par[\T,E\], E\]` gives `tab(f: ZZ32 -> E): T` a body; `Ar[\T\] extends Par[\Ar[\T\], T\]`; `Vc[\T\] extends Ar[\T\]` narrows `tab` to `Vc[\T\]`. Ar's `cp` calls `self.tab` on a `Vco[\ZZ32\]`, and Vc's class of default methods calls `Vc⟦ZZ32⟧.tab(Arrow⟦ZZ32,Ar⟦ZZ32⟧⟧)` answering `Vc⟦Ar⟦ZZ32⟧⟧`, on b5a758846d and after rung C; with Vc's parameter named `U` it runs. `Vector`'s bridge for `StandardMutableArrayType`'s `tabulate` (`Library/FortressLibrary.fss:2576`, `:2791`) does the same. Walk runs both. Workaround: name the trait's parameter apart from the parent's.
