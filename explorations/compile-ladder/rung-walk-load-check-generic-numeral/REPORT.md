<!-- Climb batch 35b, rung L (rung-walk-load-check-generic-numeral): three of walk's departures at generic and numeral declarations repaired in walk (rows 1057, 1058, 981): generic dotted methods of one name, a tuple result in the Return Type Rule's reading at object arguments, and a numeral type in a comprises clause; the change, its tests, the suite, the defects measured and the record it hands over. -->

# Rung L: walk's overloaded generic dotted methods, a tuple result, and a numeral type in a comprises clause

- problem: on the base walk stops on `Two.tk[\ZZ32\](1, 2)` with 'Cannot find definition for method tk given receiver Two' (row 1057), refuses at load `pt[\T extends Number\](a: T): (T, ZZ32)` beside `pt(a: Dot): (Dot, ZZ32)`, 'fails the Return Type Rule' (row 1058), and runs `trait T comprises { NaturalNumeral[\1, 10, 3\] } end` (row 981), the planner's runs on the base: `explorations/compile-ladder/plan-35/probes/fixes-35.md:21-27`
- spec: which dotted methods apply, `Specification/basic/overloading.tex:235-238` ("Applicability to Dotted Method Calls"); a numeral type only as a parameter's type, P-174; the Return Type Rule, read with tuple covariance (`Specification/basic/types-vals-vars.tex`, "Tuple Types"): `Specification/advanced/overloading.tex:554-559`
- precedent: the top-level overloaded generic function at written static arguments, `Factory.make` with `compatible`, and the method overloads built and blessed by `asMethodOverloads` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:130`); the per-parameter reading of `returnRuleAtObjectArguments` (`.../values/OverloadedFunction.java:884`); the two forms of `checkNumeralTypesWritten` (`.../evaluator/BuildEnvironments.java:1211`): `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:3006`
- deviation: the instances at a written static argument are blessed, as `asMethodOverloads` does, not checked as the top-level precedent checks them (`OverloadedFunction.java:3006`): `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:199`
- deviation: the generic methods of one name and one number of static parameters share one symbolic instantiation, where the team shared one per name (`Constructor.java:207` in `a874948ac`): `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:902`
- historical (each in `a874948ac`): `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `Specification/appendices/changes.tex`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1211`

Two launches: no. This launch seeded the worktree (the seeding script exited 0) and made every commit on the branch: 0c784a87ce (the three tests promoted), 84ca5ae101 (the change, its new tests and Appendix I), cb2f5960a7 (an expected failure for a numeral return type), and the commit of this report.

## What changed and why

### Row 1057: generic dotted methods of one name (fork L1)

The defect is wider than the row's claim. Any two generic dotted methods of one name that one trait or object declares together are lost, of one number of parameters as of two: `tk[\U\](y: U, z: ZZ32)` beside `tk[\U\](y: U, z: String)` in an object stops the same way on the base. The cause: walk binds the two in the declaration's members as one `OverloadedFunction`, which it never finishes, since finishing reads their parameter types without their static parameters (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildTraitEnvironment.java:126-151`, the team's comment "This blows up because the type is not instantiated"). An object's `Constructor` read only a finished set (`getOverloads()`, empty here) and only a lone `GenericMethod` as generic, so the name never reached the object's method environment, and every call failed in `DottedMethodApplication.make` (`:106`). A temporary print in `Constructor` (not kept) showed the member env's `tk` as an `OverloadedFunction` whose `getOverloads()` gave no overload.

- `values/Constructor.java`, `accumulateGenericMethods` (`:876-894`): it also takes each `GenericMethod` held in an `OverloadedFunction`, finished or not, and keys each by `genericKey` (`:896-904`), its name and its number of static parameters, so that one symbolic instantiation serves the methods of one key, an object's redeclaration of a trait's method among them.
- `values/Constructor.java`, `accumulateEnvMethods` (`:823-874`): it reads the overloads with those not yet finished (`getOverloadsAndPending`), and takes each `GenericMethod` among them as its instance at the key's symbolic static arguments, as it already did for a lone `GenericMethod`; the lone one now looks up its key the same way. The comment over `genericArgs` (`:203-207`) says so.
- `values/OverloadedFunction.java`, `getOverloadsAndPending` (`:2976-2987`), new, package-private: the overloads with those added and not yet checked.
- `values/DottedMethodApplication.java`, `typeApply` (`:150-171`) and `genericOverloadsAt` (`:173-201`), new: a call that writes static arguments to an `OverloadedMethod` all of whose overloads are a generic method's instance instantiates each generic method whose static parameters take them (`OverloadedFunction.compatible`) and chooses among the instances by the call's arguments, their number among them, through an `OverloadedMethod` of the instances; one instance stands alone. Where an overload is not a generic method's instance, a plain one beside a generic one, the call still stops as before (row 744).

The object's method environment then holds an `OverloadedMethod` of symbolic instances, which the load check (`new OverloadedMethod(...)`, `Constructor.java:388`) reads, and which a call writing no static argument dispatches by inference, as it did for a trait's generic method beside a plain one (`MethodStaticArgOverloadedReceiver`).

### Row 1058: a tuple result at object arguments (fork L2)

`values/OverloadedFunction.java`, `returnRuleAtObjectArguments` (`:884-900`): where the generic's return type mentions a type parameter that no argument fixes, it asked that the return type be that parameter itself (`if (rOut != p) return false`). It now calls `belowAtObjectArguments` (`:902-930`, new), which reads the parameter itself as before (an object type at a parameter of that type, below which the plain result lies), and reads a tuple result element by element, recursively, as tuple types are covariant; an element without the parameter is left to the existing comparison with the instance that holds the plain domain (`rIn.subtypeOf(holding.getRange())`), and a varargs element is not read.

### Row 981: a numeral type in a comprises clause (fork L3)

`evaluator/BuildEnvironments.java`, `checkNumeralTypesWritten` (`:1203-1237`): the visitor's new `forTraitDecl` (`:1228-1234`) refuses each type of a trait's `comprises` clause that names `NaturalNumeral` or `RadixPointNumeral`, by the same `refuseNumeralType` and so with the message of an `extends` clause, 'NaturalNumeral cannot be written in a program except as a parameter's type.' The three other forms (a variable's, a field's, a return type) stay as they are (fork L3; P-12).

### Appendix I

`Specification/appendices/changes.tex:5485-5486`: the clause on row 981 is taken out of the numeral entry's Effect, the list now opening at "the compiled path keeps a numeral's own type" ("Sentences of the specification").

### Tests

- Promoted, `git mv` and the `component` line renamed: `ProjectFortress/tests/GenericMethodOverloadArity.fss` (row 1057), `GenericBesidePlainTupleReturnWalk.fss` (row 1058), `NumeralTypeComprisedWalk.fss` with its `.test` (row 981, `load_exception_contains`).
- New, plain: `ProjectFortress/tests/GenericMethodOverloadSetWalk.fss`, the forms of row 1057's defect that the row does not name: one number of parameters in an object, a pair declared in a trait that an object extends, the trait's pair with one redeclared in the object, two numbers of static parameters, each with the static argument inferred and written, and two generic functional methods of two numbers of parameters.
- New, expected failures for defects measured here: `ProjectFortress/tests/XXXGenericPairTupleReturnWalk.fss` (NEW-L-1), `XXXGenericFunctionalMethodsExcludingWalk.fss` (NEW-L-2), `XXXNumeralTypeReturnTypeWalk.fss` with its `.test` (NEW-L-3).

## The failing runs and the passing runs

Each failing run went through the harness on the base's code, before the first build of an edit (the first build started after 17:51:56Z).

Rows 1057 and 981, at 2026-11-23T17:51:36Z on tree 5a59551554 (the base's code, only the renames in the tree):

    echo "Expected failure: GenericMethodOverloadArity red, its run stops with 'Cannot find definition for method tk given receiver Two'"
    echo "Expected failure: NumeralTypeComprisedWalk red, it prints 'REACHED: a numeral type is in a comprises clause', then the harness reports 'Missing expected refusal at load'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-check-generic-numeral/h1 ProjectFortress/tests/GenericMethodOverloadArity.fss ProjectFortress/tests/NumeralTypeComprisedWalk.fss ProjectFortress/tests/NumeralTypeComprisedWalk.test

    Cannot find definition for method tk given receiver Two
    REACHED: a numeral type is in a comprises clause
     Missing expected refusal at load
    FAILURES!!!
    Tests run: 2,  Failures: 2,  Errors: 0

Row 1058, at 17:51:49Z on the same code:

    echo "Expected failure: GenericBesidePlainTupleReturnWalk red, refused at load 'Overloading of pt(a:Dot):(Dot, FortressLibrary.ZZ32) ... and pt[\T extends FortressLibrary.Number\](a:T):(T, FortressLibrary.ZZ32) ...' fails the Return Type Rule"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-check-generic-numeral/h3 ProjectFortress/tests/GenericBesidePlainTupleReturnWalk.fss

    Overloading of pt(a:Dot):(Dot, FortressLibrary.ZZ32) Dot->(Dot,ZZ32) tmp/.../GenericBesidePlainTupleReturnWalk.fss:8:1-33 and pt[\T extends FortressLibrary.Number\](a:T):(T, FortressLibrary.ZZ32)tmp/.../GenericBesidePlainTupleReturnWalk.fss:7:1-48 fails the Return Type Rule: the first is more specific, and its re
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

The new plain test, written after the fix was built, failed through the base build's harness on the old code (0a83a70498, the base's code), at 18:15:52Z:

    echo "Expected failure: GenericMethodOverloadSetWalk red on the old code, its run stops with 'Cannot find definition for method tk given receiver Same'"
    FORTRESS_HOME=/home/user/fortress-base43 /home/user/fortress-base43/explorations/compile-ladder/rung-inference-walk/harness-one.sh $W/tmp/rung-walk-load-check-generic-numeral/old-h1 $W/ProjectFortress/tests/GenericMethodOverloadSetWalk.fss

    Cannot find definition for method tk given receiver Same
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

After each fix was built, its test passed and a program that loads the library ran with emptied caches (the build had emptied them): `GenericMethodOverloadArity` 'OK (1 test)' at 18:02:12Z, `GenericBesidePlainTupleReturnWalk` 'OK (1 test)' at 18:03:30Z, `NumeralTypeComprisedWalk` ' OK Saw expected refusal at load', 'OK (1 test)' at 18:05:55Z; each followed by `bin/fortress explorations/claude_demo.fss`, exit 0, 'SUM[i <- 1#100] i = 5050'.

The last run of the rung's tests, after the last change of code, on tree 84ca5ae101 at 18:16:02Z:

    echo "Expected failure: XXXGenericFunctionalMethodsExcludingWalk green as an expected failure, the call fm(O, 4, \"a\") stopping with 'Failed to find any matching overload'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-check-generic-numeral/hall ProjectFortress/tests/GenericMethodOverloadArity.fss ProjectFortress/tests/GenericBesidePlainTupleReturnWalk.fss ProjectFortress/tests/NumeralTypeComprisedWalk.fss ProjectFortress/tests/NumeralTypeComprisedWalk.test ProjectFortress/tests/GenericMethodOverloadSetWalk.fss ProjectFortress/tests/XXXGenericPairTupleReturnWalk.fss ProjectFortress/tests/XXXGenericFunctionalMethodsExcludingWalk.fss

     OK Saw expected exception
     OK Saw expected refusal at load
     OK Saw expected exception
    OK (6 tests)

and, at 18:17:40Z on cb2f5960a7's tree (the same code):

    echo "Expected failure: XXXNumeralTypeReturnTypeWalk green as an expected failure: it loads and runs, printing REACHED, not refused at load"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-check-generic-numeral/hn ProjectFortress/tests/XXXNumeralTypeReturnTypeWalk.fss ProjectFortress/tests/XXXNumeralTypeReturnTypeWalk.test

    REACHED: a numeral type is a return type
     Saw expected failure: loaded and ran, not refused at load
    OK (1 test)

The first expected failure that the rung adds, `XXXGenericPairTupleReturnWalk`, through the harness as it is, then with both results changed to `(Any, ZZ32)` for one run, then restored (`cmp` equal):

    echo "Expected failure: XXXGenericPairTupleReturnWalk green as an expected failure, walk refusing the pair at load, 'fails the Return Type Rule'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/$S/hx ProjectFortress/tests/XXXGenericPairTupleReturnWalk.fss
     OK Saw expected exception
    OK (1 test)
    echo "Expected failure: with both results (Any, ZZ32) for one run, the pair loads and the test runs clean, so the harness reports it red, 'Missing expected failure'"
     Missing expected failure
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

Its exception is the Return Type Rule's refusal: `cd ProjectFortress && ../bin/fortress tests/XXXGenericPairTupleReturnWalk.fss` prints 'fails the Return Type Rule: the first is more specific, and its return type is not found to be a subtype of the return type of every instance of the second that applies to its arguments'.

### The whole suite, once, on the code of 84ca5ae101

`ant testSystem`, started at 18:06:40Z on the working tree whose code 84ca5ae101 then committed unchanged:

    BUILD SUCCESSFUL
    Total time: 4 minutes 57 seconds
    [junit] Tests run: 222, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 278.839 sec
    [junit] Tests run: 228, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 280.925 sec
    [junit] Tests run: 212, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 283.998 sec
    [junit] Tests run: 226, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 290.353 sec

888 tests, none failed: the last gate's 886 (`explorations/compile-ladder/climb-batch-35/gate/summary.txt:62-65`, 221, 219, 228, 218) and the two new files then in the tree, `GenericMethodOverloadSetWalk` and `XXXGenericPairTupleReturnWalk`. After the suite, tests only changed: the functional case was added to `GenericMethodOverloadSetWalk`, and `XXXGenericFunctionalMethodsExcludingWalk` and `XXXNumeralTypeReturnTypeWalk` were added; their harness runs are above. No test failed after the change, no expected failure turned red, and no line of the library or of a team test is refused at load: every harness run above that reports 'cache empty' analysed the library.

## The stages

Neither stage can move, so neither ran: every path the rung adds or changes is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` or `explorations/` (`git diff --name-only 5a595515546edc5564515d4492ff4d44b5d07153`):

    ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java
    ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java
    ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java
    ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java
    ProjectFortress/tests/GenericBesidePlainTupleReturnWalk.fss
    ProjectFortress/tests/GenericMethodOverloadArity.fss
    ProjectFortress/tests/GenericMethodOverloadSetWalk.fss
    ProjectFortress/tests/NumeralTypeComprisedWalk.fss
    ProjectFortress/tests/NumeralTypeComprisedWalk.test
    ProjectFortress/tests/XXXGenericFunctionalMethodsExcludingWalk.fss
    ProjectFortress/tests/XXXGenericPairTupleReturnWalk.fss
    ProjectFortress/tests/XXXNumeralTypeReturnTypeWalk.fss
    ProjectFortress/tests/XXXNumeralTypeReturnTypeWalk.test
    Specification/appendices/changes.tex

and this folder. The three promoted tests' old paths are removed.

## The ladder subset

Empty. The change is in walk alone, which no compiled program runs, and no recorded first error of the ladder's baseline names what it touched: `grep -rliE "interpreter/evaluator|interpreter\.evaluator|Cannot find definition for method|fails the Return Type Rule|cannot be written in a program except|comprises|numeral|Return Type|overload|generic method" explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing over its 85 files. Nothing ran; the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-35/gate/ladder/ladder.tsv`) stands.

## Where the fix belongs, and the precedent

The maps put overload resolution under walk in `values/OverloadedFunction.java` (`explorations/coordinator/map/spec-to-implementation.md:214`, `:357`); the code below placed each repair.

- Row 1057. The call fails in `DottedMethodApplication.make` (`:106`), but nothing there is wrong: the name is absent from the object's method environment, which `Constructor` builds (`Constructor.java:169-411`). The ways: (a) finish the member's overloaded set of generic methods in `BuildTraitEnvironment.forFnDecl3` (`:126-151`), which the team's comment there says fails, and which would read their parameter types without their static parameters, row 760's mechanism (`GenericMethod.finishInitializing`, `.../values/GenericMethod.java:138-153`); (b) choose by arity in `DottedMethodApplication.make` (fork L1's words), which no overload reaches; (c) take each generic method in `Constructor` as its symbolic instance, as it took a lone one, taken. For the call that writes static arguments, the precedent is the top-level overloaded generic function (`OverloadedFunction.java:3006-3048`, `Factory.make`), which instantiates every generic overload that `compatible` admits and lets dispatch choose; followed, with the instances blessed as `asMethodOverloads` blesses an `OverloadedMethod` (`DottedMethodApplication.java:130-140`). Sites of the same kind in `Constructor.java`: two reads of `genericArgs` by name (`accumulateEnvMethods`, the lone generic and now the overloaded ones) and one write (`:208-218`), all three keyed by `genericKey` now.
- Row 1058. In `returnRuleAtObjectArguments`. The same restriction, a returned type parameter read only when it is the whole return type, `if (rOut != p) return false`, stands at one other site of the file: `returnRuleAtEveryInstance` (`OverloadedFunction.java:1305`), the reading of two generic declarations. Measured, it refuses the valid pair with tuple results (NEW-L-1); left, by fork L2's scope, with an expected failure.
- Row 981. In `checkNumeralTypesWritten`, beside its two forms (`forTraitTypeWhere`, `forTypeArg`), by the same `refuseNumeralType`.

No library or compiled code changed.

## What the specification settles

- A dotted method declaration with static parameters is applicable to a call if some instance of it is (`Specification/basic/overloading.tex:233-238`); two generic methods of one name are a valid overloading by the three rules (`Specification/advanced/overloading.tex:543-560`), so each call runs the declaration that fits it. The compiled path runs every case of `GenericMethodOverloadSetWalk` (below).
- The Return Type Rule (`Specification/advanced/overloading.tex:554-559`) holds for `pt(a: Dot): (Dot, ZZ32)` inside `pt[\T extends Number\](a: T): (T, ZZ32)`: an argument of type `Dot` selects instances at a `T` above `Dot`, and `(Dot, ZZ32)` lies below `(T, ZZ32)` there, tuple types being covariant (`Specification/basic/types-vals-vars.tex`, "Tuple Types").
- A numeral type is written only as a parameter's type (P-174), which the checker applies to every other form ('NaturalNumeral cannot be written in a program except as a parameter's type.').

## Programs run old against new

Old: `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base43 <worktree>/tmp/old-caches P.fss`, or the base's code in this tree before the first edit; new: `bin/fortress P.fss` on the final code.

| program (its declarations) | old | new |
|---|---|---|
| object with `tk[\U\](y: U, z: ZZ32): U` and `tk[\U\](y: U, z: String): U`; `Two.tk(4, 5)`, `Two.tk(6, "a")`, `Two.tk[\ZZ32\](7, "a")` | 'Cannot find definition for method tk given receiver Two' | 4, 6, 7 |
| trait `Tk` with `tk[\U\]` of two and of three parameters, `object Two extends Tk end`; both calls, and one with `[\ZZ32\]` | the same message | 5, 3, 3 |
| the same trait with `tk[\U\](y: U, z: ZZ32)` and `(y: U, z: String)` | the same message | 4, 6 |
| object with `tk[\U\](y: (U, U)): ZZ32 = 1` and `tk[\U\](y: U, z: U, w: U): ZZ32 = 3`; `Two.tk(p)` for a pair `p`, `Two.tk(1, 2, 3)`, both with `[\ZZ32\]` | the same message | 1, 3, 1, 3 |
| row 744's program, `Sm[\ZZ32\].distribute[\Lifted[\ZZ32\]\](Mx[\ZZ32\])` (`MethodStaticArgOverloadedReceiver` with that call) | 'Don't actually resolve overloading of generic methods yet' | the same |
| object with `fm[\T\](self, x: T): ZZ32 = 1` and `fm[\T\](self, x: T, y: T): ZZ32 = 2`; `fm(O, 4)`, `fm(O, 4, 5)` | 'Cannot find definition for method fm[\T\](self:O,x:T):FortressLibrary.ZZ32 given receiver O' | 1, 2 |
| object with `fm[\T\](self, x: T, z: ZZ32): ZZ32 = 1` and `fm[\T\](self, x: T, z: String): ZZ32 = 2`; `fm(O, 4, 5)`, `fm(O, 4, "a")` | 'Cannot find definition for method fm[...] given receiver O' | 1, then 'Failed to find any matching overload, args = (4: ZZ32,"a")' (NEW-L-2) |
| `pt[\T extends Number\](a: T): (T, ZZ32)` beside `pt(a: RR64): (RR64, ZZ32)` | 'fails the Return Type Rule' | 2, 1 |
| the same beside `pt(a: Dot): (Number, ZZ32)` | 'fails the Return Type Rule' | the same |
| the same beside `pt(a: Dot): (Dot, String)` | 'fails the Return Type Rule' | the same |
| `pt[\T extends Number\](a: T): List[\T\]` beside `pt(a: Dot): List[\Dot\]` | 'fails the Return Type Rule' | the same |
| `pt[\T extends Number\](a: T): ((T, ZZ32), T)` beside `pt(a: Dot): ((Dot, ZZ32), Dot)` | 'fails the Return Type Rule' | 2 |
| `ident[\T extends Shape\](x: T): (T, ZZ32)` beside `ident[\T extends Round\](x: T): (T, ZZ32)` | 'fails the Return Type Rule' | the same (NEW-L-1) |
| the same with results `T` | Circle, Square | (not run) |

New only: `GenericMethodOverloadSetWalk`'s further cases (an object's redeclaration, two numbers of static parameters) and a never-called `never(x: ZZ32): NaturalNumeral[\1, 10, 3\] = never(x)`, which loads and runs ('loaded'), where `FORTRESS_LIBRARY=one bin/fortress typecheck` refuses it: 'NaturalNumeral cannot be written in a program except as a parameter's type.'

The compiled path, on the base's code (it is unchanged): `GenericMethodOverloadSetWalk` with a `println("PASS")` after its assertions compiles and prints `PASS`, exit 0; the two-number functional pair prints 1, 2; the same-number functional pair stops at compile, 'ClassCastException: class com.sun.fortress.compiler.index.FunctionalMethod cannot be cast to class com.sun.fortress.compiler.index.Method' (row 724); `XXXGenericPairTupleReturnWalk` stops in the code generator, 'java.util.zip.ZipException: duplicate entry: XXXGenericPairTupleReturnWalk?$ident...' (row 537).

## Sentences of the specification

- Made false and edited, `Specification/appendices/changes.tex:5486-5487`, the entry "The numeral types, their conversion and their default". Before: "row of the revival's gap ledger: the interpreter loads and runs a program that writes a numeral type in a \KWD{comprises} clause (row~981); the compiled path keeps a numeral's own type,". After (`:5486`): "row of the revival's gap ledger: the compiled path keeps a numeral's own type,". The sentence's other clauses are whole.
- `grep -rn '~1057\|~1058\|~981' Specification --include=*.tex`: on the base one line, `Specification/appendices/changes.tex:5487` (above), made false and edited; after the edit none.
- Made false in part, for the gather, `Specification/appendices/changes.tex:2416-2422`: "and a dotted call that writes static arguments to a method its receiver overloads still stops (row~744)." It still stops only where a plain method shares the name with a generic one. Words that hold after the change: "and a dotted call that writes static arguments to a method name that its receiver overloads by a plain and a generic method still stops (row~744)".
- False on the base and still false, for the gather, `Specification/appendices/changes.tex:3115-3121`: "the interpreter reads two functions with static parameters, no pair of whose parameter types excludes each other as it compares them parameter by parameter, on the two declared domains, each over its own instances, by these rules, but ...": it refuses the valid pair whose results are tuples holding each its own type parameter (NEW-L-1). The Effect can name the row beside row 539.
- Made true, not false: `Specification/basic/inference.tex:332-334`, "It infers the static arguments of a generic dotted method that a call does not write as it infers a generic function's, whether the method is alone under its name or among the overloads of its receiver", which two generic methods of one name broke on the base.

## P-174's sentences on row 981

For the record-landing. P-174 (`explorations/coordinator/POSITIONS.md:106`) says: "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause. The tree departs too, with no row, where the numeral coercions of the one library and of many tests call a getter on the four numbers, as `v.asZZ32`, and where the checker and the literals chapter read each of the four as a `ZZ` value wherever it stands (F-342, F-345)." The first is false after the change, and with it the "too" of the second. Words that hold after it: "Row NEW-L-3 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it. The tree departs too, with no row, where ..." Without the new row: "The tree departs, with no row, where ...". The review queue's item 503 says row 981 holds those three forms (`explorations/coordinator/review-queue.md:900`), which the row's claim does not name; NEW-L-3 gives them a row of their own.

## Points to report

- Each fix as made, by file and member: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java`, `accumulateGenericMethods` (`:876-894`), `accumulateEnvMethods` (`:823-874`), `genericKey` (`:896-904`, new), the comment over `genericArgs` (`:203-207`); `.../values/DottedMethodApplication.java`, `typeApply` (`:150-171`), `genericOverloadsAt` (`:173-201`, new); `.../values/OverloadedFunction.java`, `returnRuleAtObjectArguments` (`:884-900`), `belowAtObjectArguments` (`:902-930`, new), `getOverloadsAndPending` (`:2976-2987`, new); `.../evaluator/BuildEnvironments.java`, `checkNumeralTypesWritten` (`:1203-1237`). Reversible.
- The three expected failures promoted, each failing on the base and passing after: above, "The failing runs and the passing runs".
- Walk's suite: no test failed after the change (888, 0 failures); no line of the library or of a team test that walk now refuses at load.
- Each sentence of the specification that the change makes false, before and after: `Specification/appendices/changes.tex:5486-5487`, edited; `:2416-2422`, for the gather.
- P-174's sentence on row 981 that the change makes false, quoted: above.
- The files edited, for `STAGE_BLIND`: the list under "The stages". Beyond the files named: none; `Constructor.java` is "where walk builds a generic dotted method's overloads"; in `OverloadedFunction.java` one member beyond `returnRuleAtObjectArguments`, `getOverloadsAndPending`, which `Constructor` reads; in the tests, four files beyond the three promoted (`GenericMethodOverloadSetWalk.fss`, `XXXGenericPairTupleReturnWalk.fss`, `XXXGenericFunctionalMethodsExcludingWalk.fss`, `XXXNumeralTypeReturnTypeWalk.fss` with its `.test`).
- Reserved points: a model line, none; a line of the library or a team test that walk now refuses at load, none.

## Decisions

1. Row 1057 repaired where the name is lost, in `Constructor`, each generic method of an unfinished overloaded set taken as its symbolic instance, and the call with static arguments in `DottedMethodApplication.typeApply`. Ways not taken: finishing the set in `BuildTraitEnvironment.forFnDecl3` (`:126-151`; the team's comment says it fails, and it reads row 760's way); choosing by arity in `DottedMethodApplication.make`, as fork L1 words it, which no overload reaches. Fork L1's choice by the call's number of arguments is the dispatch among the instances. Evidence: the temporary print, and the probes above.
2. One symbolic instantiation for each name and number of static parameters (`genericKey`). Ways not taken: one per name, as the team kept it, under which `g[\T\]` beside `g[\T, V\]` would bind two static arguments for one; one per method, under which an object's redeclaration of a trait's generic method would not have the trait's signature and would not hide it. Evidence: `GenericMethodOverloadSetWalk`'s `Statics` and `Redeclares`.
3. A call writing static arguments to a set with a plain method among the generic ones still stops (row 744 stays). Way not taken: instantiating the generic ones and leaving the plain one out, which would run `distribute[\K\]` where the compiled path runs the plain overload (row 744's notes). No decision of the curator covers which is right; the narrower change leaves the row as recorded.
4. The instances at written static arguments are blessed, not checked again, as `asMethodOverloads` (`DottedMethodApplication.java:130-140`) blesses its overloads; the load check reads the symbolic instances (`Constructor.java:388`). Way not taken: the top-level precedent's `finishInitializing` (`OverloadedFunction.java:3006-3048`), which checks the instances at each new static argument.
5. Row 1058 read recursively, element by element, a varargs element not read. Ways not taken: reading only a tuple at the top; repairing the other site with the same restriction, `returnRuleAtEveryInstance` (`OverloadedFunction.java:1305`), which fork L2 does not name; recorded instead (NEW-L-1, home 2).
6. Row 981 by a `forTraitDecl` over the `comprises` clause, with the `extends` clause's message (fork L3). Ways not taken: an `excludes` clause, and the variable's, field's and return type, which fork L3 keeps as they are (P-12); the last three recorded (NEW-L-3, home 2).
7. The forms of row 1057's defect that its claim does not name asserted in a new plain test, `GenericMethodOverloadSetWalk`. Way not taken: adding them to `GenericMethodOverloadArity`, whose failing run was recorded before them and whose name is the arity form.
8. The same-number functional pair recorded, not repaired (NEW-L-2): it fails in the functional method's dispatch (`FunctionalMethod.getApplicableClosure`, `FunctionalMethod.java:64`), outside the dotted call of fork L1.
9. Row 981 closed, with NEW-L-3 for the three other forms. Way not taken: rewriting row 981's claim to those forms, which would keep a row whose claim, the `comprises` form, no longer holds; the brief closes 981. The review queue's item 503 says row 981 holds them (`explorations/coordinator/review-queue.md:900`).

## Defects and their homes

- Row 1057, two generic dotted methods of one name: home 1, `GenericMethodOverloadArity`; and its wider forms (one number of parameters, declared in a trait, redeclared, two numbers of static parameters; the two-number functional pair): home 1, `GenericMethodOverloadSetWalk`. Fixed by this change.
- Row 1058, a tuple result at object arguments: home 1, `GenericBesidePlainTupleReturnWalk`. Fixed.
- Row 981, a numeral type in a `comprises` clause: home 1, `NumeralTypeComprisedWalk` with its `.test`. Fixed.
- NEW-L-1, two generic declarations with tuple results refused at load: home 2, `XXXGenericPairTupleReturnWalk`; the specification settles it (the Return Type Rule; tuple covariance).
- NEW-L-2, two generic functional methods of one name and one number of parameters, the second never chosen: home 2, `XXXGenericFunctionalMethodsExcludingWalk`; the overloading rules settle it. Before the change the same program failed with 'Cannot find definition'; the change made the first call run.
- NEW-L-3, a numeral type written as a return type, a variable's or a field's type loads under walk: home 2, `XXXNumeralTypeReturnTypeWalk` with its `.test`; P-174 settles it, and P-12 defers walk's repair to the checker.
- Row 744, narrowed: its claim now holds only where a plain method shares the name; its whole new line is in `record.md`.

## Commands worked out

- The temporary print (not kept) that found row 1057's cause: an `if (System.getenv("DBG_L") != null) System.err.println(...)` at the head of `Constructor.accumulateEnvMethods`'s loop, built, run with `DBG_L=1 bin/fortress P.fss`, then the file restored from a copy and built again.
