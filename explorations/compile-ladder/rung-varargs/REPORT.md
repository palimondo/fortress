# Rung G, climb batch 33b: a varargs parameter on the compiled path

- problem: the code generator refused every declaration with a varargs parameter and every call of one, ten of the thirteen declarations that the measure found refused in the one library, `explorations/compile-ladder/plan-33/probes/measure-d3747846c1.txt:16-25` (F-34; row 624)
- spec: `Specification/basic/functions.tex:210` ("Function Applications": the parameter holds the arguments that no plain binding takes, in order), `:183-200` (the revival callout: the type `ImmutableArray[\T, ZZ32\]`), `Specification/basic/overloading.tex:246` ("Applicability for Functionals with Varargs and Keyword Parameters": the expansion rule)
- precedent: walk's `NonPrimitive.buildEnvFromParams`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/NonPrimitive.java:224-251` (the factory `__immutableFactory1` at the count of the further arguments, `init` of each in order); the code generator's call of a generic function through its closure, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4267-4289` and `generateHigherOrderCall`, `:7989`; the planner's stand-in for the JVM form, `explorations/compile-ladder/plan-33/probes/varargs-standin.patch:69-80`
- deviation: each element's index is made as `FZZ32.make(j)`, the code generator's one conversion of a JVM int to a `ZZ32` (`CodeGen.java:4636-4642`), where the one library's descriptors still name `fortress/FortressLibrary$ZZ32` until its numbers take the payload form (fork N4), `CodeGen.java:7823-7825`
- deviation: walk puts each argument through the array's wrapper (`IndexedArrayWrapper.put`); the compiled call names `init` on the parameter's type, `ImmutableArray[\T, ZZ32\]`, whose interface inherits it from `ReadableArray`, `CodeGen.java:7817-7828`
- deviation: the factory's template class is named from its declared header written in the code generator, `__immutableFactory1[\T, nat b0, nat s0\]():ImmutableArray1[\T,b0,s0\]` (`Library/FortressLibrary.fsi:1798`), with the parameter names `T`, `b0`, `s0`, `CodeGen.java:7801-7803`
- deviation: the specification's `HeapSequence` is `ImmutableArray[\T, ZZ32\]`, as the callout already says, `Specification/basic/functions.tex:183`
- historical: `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `Specification/basic/functions.tex`, `Specification/appendices/changes.tex`

## What changed and why

The code generator refused varargs at four tuple descriptors of `NamingCzar` and in `forLetFn`, and stopped on a method's varargs parameter where `jvmSignatureFor` unwrapped its type (row 624). The value is fixed by the specification, its callout, F-86 and walk: an immutable one-dimensional array of the arguments that no plain parameter takes, typed `ImmutableArray[\T, ZZ32\]` of the library in use. The rung builds forks G1 to G5 of `explorations/coordinator/CLIMB-BATCH-33.md`, section 3.

1. **The declaration (G1).** The varargs part of a domain is one JVM parameter of `Types.makeVarargsParamType(T)`, the type at which the checker binds the parameter in the body (`NamingCzar.varargsParamType`, `NamingCzar.java:945-951`; `varargsDomainAsArray`, `:954-962`; `paramType`, `:965-968`). The four refusals now read the domain so (`:1344`, `:1354-1358`, `:1497`, `:1608`), as do the signatures over parameters (`:971-982`, `:993-1006`), the spliced signature of a trait's default method (`:1030-1031`) and the arrow descriptors from parameters (`:1259`). In the body the parameter is a local of the array type (`CodeGen.addParam`, `CodeGen.java:712`); two checks of a single tuple-typed parameter no longer unwrap a varargs parameter's absent declared type (`:3166-3167`, `:3296`). A local function's varargs refusal is gone (`forLetFn`, `:3998`), its arrow type takes the varargs part (`localFunctionArrowType`, `:4050-4051`), and its closure reads its parameters through the same `NamingCzar` members.
2. **The call (G2).** `evalArg` and `evaluateSubExprsAppropriately` (an operator's operands) send a domain with a varargs part to `evalVarargsArgs` (`CodeGen.java:7837-7840`, `:5725-5728`, `:7695-7750`). It evaluates the n arguments as the expansion rule reads the declaration at n, the plain types then the varargs type for each further argument, in parallel where the call's arguments fork. A single argument whose value is a tuple passes its elements, as the checker reads a tuple argument against a varargs domain (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:328-329`) and walk passes them (the skeptic's fix; `CodeGen.java:7701-7707`). Then, unless the call goes to a dispatch method, it stores the further arguments in compiler locals and `emitVarargsArray` (`:7795-7831`) makes the array: the factory `__immutableFactory1[\T, 0, k\]()` through its closure, then `init(j, a_j)` for j from 0, and the array is the call's last argument at the declaration's own signature.
3. **The dispatch method (G2).** `CodeGen.partitionByArgCount` (`CodeGen.java:8514-8541`) makes a varargs declaration without static parameters a member at each number of arguments from its plain count to the most that another declaration of the name takes, read there as an expanded declaration (`OverloadSet.VarargsExpansion`, `OverloadSet.java:187-244`). Its branch in the dispatch method loads the plain parameters, makes the array from the rest and calls the declaration (`armCallsVarargsDeclaration`, `:2024-2033`, from the arm path `:1869-1882` and the leaf `:1994-2013`). A call of n arguments whose name has a dispatch method at n passes the n arguments to it (`varargsCallDispatches`, `CodeGen.java:7759-7781`; the dispatch domain at the call, `forFunctionalRef`, `:4435-4443`).
4. **The prelude (G4).** `varargsParamType` refuses against the compiler's library, which declares no `ImmutableArray`: 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, the type of a varargs parameter'.
5. **A spread argument (G3)** is not built; the parser takes it, and both paths drop it before the code generator (NEW-G-1). The code generator refuses one if it ever reaches it (`CodeGen.java:7696-7697`).

## The convention as built

- **The JVM parameters of a varargs declaration**: its plain parameters, then one parameter of the descriptor of `ImmutableArray[\T, ZZ32\]` of the library in use. From `javap -c -p` on `one_library_tests/OneLibraryVarargsCount`'s jar:

      public static fortress.FortressLibrary$ZZ32 count(fortress.FortressLibrary$\=ImmutableArray?fortress\|FortressLibrary\%ZZ32,fortress\|FortressLibrary\%ZZ32?);

  A trait's method has the same parameter in its interface, its default body and its forwarders (`OneLibraryVarargsMethod$Tagger`, `$Tagger$DefaultTraitMethods`):

      public abstract fortress.FortressLibrary$ZZ32 tag(fortress.FortressLibrary$String, fortress.FortressLibrary$\=ImmutableArray?fortress\|FortressLibrary\%ZZ32,fortress\|FortressLibrary\%ZZ32?);
      public static fortress.FortressLibrary$ZZ32 tag(OneLibraryVarargsMethod$Tagger, fortress.FortressLibrary$String, fortress.FortressLibrary$\=ImmutableArray?...);

- **Where the array is made**: at the call, where the name has no other declaration of the call's number of arguments; in the dispatch method's branch for the varargs declaration, where it has one.
- **How a call of each arity reaches the varargs declaration** (`one_library_tests/OneLibraryVarargsOverloaded`, `check(Boolean)`, `check(Boolean, String)`, `check(Any, Any, Any...)`, and the library's `assert` of the same three shapes): `check(z, z)` calls the dispatch method `check(Any;Any)`, which tests `FBoolean` and `String` and otherwise makes an empty array and calls `check(Any;Any;ImmutableArray)`; `check(z, z, "a")` and `check(z, z, "a", z)` make arrays of one and two and call `check(Any;Any;ImmutableArray)`; `check(b, "m")` calls `check(FBoolean;String)`. The library's `assert(z, z)` calls `FortressLibrary.assert(Any;Any)`, the dispatch method that `FortressLibrary` writes at two arguments; `assert(z, z, "a")` makes its array at the call. From the same `javap`:

      static check(fortress.AnyType$Any, fortress.AnyType$Any): instanceof FBoolean ... invokestatic check:(LFBoolean;Lfortress/FortressLibrary$String;) ... invokeinterface "\=Arrow??,...ImmutableArray1?fortress\|AnyType\%Any,0,0??".apply ... invokestatic check:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;Lfortress/FortressLibrary$\=ImmutableArray?...;)
      251: invokestatic  #201  // Method fortress/FortressLibrary.assert:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;)Lcom/sun/fortress/compiler/runtimeValues/FVoid;
      296: invokestatic  #229  // Method fortress/FortressLibrary.assert:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;Lfortress/FortressLibrary$\=ImmutableArray?fortress\|AnyType\%Any,fortress\|FortressLibrary\%ZZ32?;)...

- **The bytecode of one call, with the array made and filled**, `count(4, 5, 6)` in `OneLibraryVarargsCount$task0.compute` (`javap -c -p`, the three numerals stored in reverse, the array made at three, each put at its index in order):

      37: astore_1
      38: astore_2
      39: astore_3
      40: getstatic     #47  // Field "fortress/FortressLibrary?$\\=__immutableFactory1?fortress\\|FortressLibrary\\%ZZ32,0,3??$\\=?Arrow??,fortress\\|FortressLibrary\\%ImmutableArray1?T,b0,s0??"."?"
      43: invokeinterface #53, 1  // InterfaceMethod "\\=Arrow??,fortress\\|FortressLibrary\\%ImmutableArray1?fortress\\|FortressLibrary\\%ZZ32,0,3??".apply:()...
      48: dup
      49: ldc           #54  // int 0
      51: invokestatic  #60  // Method com/sun/fortress/compiler/runtimeValues/FZZ32.make:(I)...
      54: aload_3
      55: checkcast     #62  // class fortress/FortressLibrary$ZZ32
      58: invokeinterface #68, 3  // InterfaceMethod "fortress/FortressLibrary$\\=ImmutableArray?fortress\\|FortressLibrary\\%ZZ32,fortress\\|FortressLibrary\\%ZZ32?".init:(Lfortress/FortressLibrary$ZZ32;Lfortress/FortressLibrary$ZZ32;)...
      63: pop
      ... (index 1 with aload_2, index 2 with aload_1)
      96: invokestatic  #77  // Method OneLibraryVarargsCount.count:(Lfortress/FortressLibrary$\=ImmutableArray?...;)Lfortress/FortressLibrary$ZZ32;

  The index is an `FZZ32` where `init`'s descriptor names `fortress/FortressLibrary$ZZ32`: no program runs on the one library yet (row 1062), and the one library's numbers have no carrier class until fork N4's rung; the code generator's numerals at the one library's `ZZ32` have the same mismatch today (a numeral site passes `FZZ.make` values to `coerce_ZZ32?natural`, whose descriptor names `fortress/FortressLibrary$ZZ`).

## The test, its failure and its pass

The tests, in rung S's track `ProjectFortress/one_library_tests/`: `OneLibraryVarargsCount` (the planner's `VarargsCount.fss`, with calls of none, one and three arguments, of forking arguments and of a tuple's elements), `OneLibraryVarargsOverloaded`, `OneLibraryVarargsMethod`, `OneLibraryVarargsOperator` (the list constructor `<|z, 5, 6|>`), `OneLibraryVarargsLocalFunction`, each `compile`; and `XXXOneLibraryRunVarargs.test`, the run of `OneLibraryVarargsCount`, an expected failure until the one library compiles whole (G5), in the form of `XXXOneLibraryRunHalf.test`.

The failing run, through the harness, on the base's code under the selection, 02:19:09Z to 02:19:31Z; the edit was first built from 02:32:44Z (the first `ant compileAll` after the edit):

    cd ProjectFortress && FORTRESS_LIBRARY=one <tree>/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 <tree>/tmp/rung-varargs/old-caches junit <tree>/ProjectFortress/one_library_tests/{OneLibraryVarargsCount,OneLibraryVarargsOverloaded,OneLibraryVarargsMethod,OneLibraryVarargsOperator,XXXOneLibraryRunVarargs}.test
    /home/user/fortress-varargs/ProjectFortress/one_library_tests/OneLibraryVarargsCount.fss:5:7:
        Can't compile VarArgs yet
    F. compile .../one_library_tests/OneLibraryVarargsMethod   UNEXPECTED exception   edu.rice.cs.plt.tuple.OptionUnwrapException
    F. compile .../one_library_tests/OneLibraryVarargsOperator   UNEXPECTED exception   java.lang.IndexOutOfBoundsException: Index 0 out of bounds for length 0
    Tests run: 5,  Failures: 4,  Errors: 0

`OneLibraryVarargsOverloaded` failed with 'Can't compile VarArgs yet' at its varargs `check`, and `XXXOneLibraryRunVarargs` was an expected failure ('Resource not found : OneLibraryVarargsCount.class'). The local function's test, added after the first build, failed on the old code through the same command at 02:41:31Z: '.../OneLibraryVarargsLocalFunction.fss:6:5-7:4: Can't compile VarArgs yet', `FAILURES!!!`. The count test gained its last three calls after its failing run; with its final text, on the old code through the same command at 03:07:36Z, it fails at its declaration: '.../OneLibraryVarargsCount.fss:5:7: Can't compile VarArgs yet', `Tests run: 1,  Failures: 1`.

The passing run, the last after the last change of code (its build ended before 02:58:39Z), 02:58:39Z:

    cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES=<tree>/tmp/rung-varargs/one-caches ../bin/fortress junit one_library_tests/{OneLibraryVarargsCount,OneLibraryVarargsOverloaded,OneLibraryVarargsMethod,OneLibraryVarargsOperator,OneLibraryVarargsLocalFunction,XXXOneLibraryRunVarargs}.test
    OK (6 tests)

The run test's expected failure there: 'NoClassDefFoundError: fortress/FortressLibrary$String', 'Saw expected failure (Exit code != 0)'. Shown red on a deliberate change, its key set to `run_out_contains=REACHED` for one run and restored: 'Failed to satisfy run_out_contains', `Tests run: 2,  Failures: 1`.

## The prelude's two expected failures (G4)

`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh prelude ProjectFortress/compiler_tests <the thirteen Varargs .test files>`, after the library order, on the final code: `OK (13 tests)`. Both stay expected failures, with one message:

    .../compiler_tests/XXXVarargsCodeGeneration.fss:5:25-26:
        Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, the type of a varargs parameter
    .../compiler_tests/XXXVarargsMethodCodeGeneration.fss:6:26-28:
        Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, the type of a varargs parameter

`XXXVarargsCodeGeneration.test` is unchanged (its key 'Can't compile VarArgs yet' still matches). `XXXVarargsMethodCodeGeneration.test` took the new message: `compile_exception_contains=OptionUnwrapException` became `compile_exception_contains=declares no ImmutableArray, the type of a varargs parameter`. The checker's four expected failures of row 604 are unchanged.

## The measure (on a scratch copy of the rung's code)

`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh /home/user/fortress-varargs-measure <tree>/tmp/rung-varargs/measure`, the scratch worktree seeded at `888c20dd93` and removed after; 208 s:

    refused declarations 3 | emitted (OK lines) 751 | component failures 0
    kinds 2
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  ClassCastException: com.sun.fortress.nodes.VarType to com.sun.fortress.nodes.TraitType  [FortressLibrary 1]

against 13 refused and 745 emitted on `d3747846c1` (F-34). The ten of varargs are all emitted: `assert`, `deny`, `Generator2`, `<|_|>`, `CatString`, `EmptyString`, `SubString`, `stringifyChars`, `FlatString` and `WriteStream` (the measure's `@@CG OK` lines). Nothing stops `Generator2` or `CatString` behind varargs: the stand-in's 'Error trying to close method scope' in `Generator2` and 'Index 0 out of bounds for length 0' in `CatString` were the varargs parameter in the body and an operator's application of a varargs declaration, which the rung builds (the second is `OneLibraryVarargsOperator`'s failure on the base). What remains is the closure class twice (row 315, rung W) and `__bigOperator2` (row 1076). The measure skips the dispatch methods. The later commit `4526151e00` changes only a generic varargs declaration in an overload set, which none of the fourteen components declares (their varargs declarations are `assert` and `deny`, without static parameters, and `<|`, `print`, `println`, each alone).

## Whole suite, stages, shadow patch, ladder

- `ant testFast`, once, on the final code (`4526151e00`), 02:59:02Z to 03:07:16Z:

      BUILD SUCCESSFUL
      Total time: 8 minutes 13 seconds

  Tracks: `CompilerJUTest` 1736 tests, `LibraryJUTest` 86, `OtherCompilerJUTest` 263, `OneLibraryJUTest` 9, the misc track's classes, each with 0 failures and 0 errors; against the last landed gate's summary (`explorations/compile-ladder/climb-batch-33/gate/summary.txt`), the same counts but `fast-onelibrary`, 3 there and 9 here, the rung's six files.
- The stages: none, as the section says. The files edited (STAGE_BLIND): `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/one_library_tests/OneLibraryVarargs{Count,Overloaded,Method,Operator,LocalFunction}.{fss,test}`, `ProjectFortress/one_library_tests/XXXOneLibraryRunVarargs.test`, `ProjectFortress/compiler_tests/XXXVarargsMethodCodeGeneration.test`, `ProjectFortress/tests/XXXVarargsSpreadArgument.fss`, `Specification/basic/functions.tex`, `Specification/appendices/changes.tex`, and this folder's `REPORT.md` and `record.md`. No file beyond those the section names: `FnNameInfo.java` needed no edit, since `typeAndParamsToArrow` already makes a varargs domain (`FnNameInfo.java:147-149`).
- The distance stage's shadow patch on the rung's `CodeGen.java`: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>/shadow-src && python3 explorations/coordinator/tools/distance/add-patch.py <scratch>/shadow-src` exits 0; the measure's own run of it on the scratch copy too.
- The rung's ladder subset, the drivers copied into the rung's scratch as `gate.md` says, on the code of `888c20dd93`: the five files whose recorded first error names the varargs refusal or `OptionUnwrapException` (the baseline's `ladder.tsv`), `MapExprTest.fss`, `Mutable.fss`, `XXXimmutable1.fss`, `XXXimmutable2.fss`, `immutable.fss`. None moves: each stays at `codegen`; `MapExprTest.fss`'s first error is now 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, the type of a varargs parameter', the four others' `OptionUnwrapException` as recorded. None is in the newest landed `ladder.tsv` (`climb-batch-33/gate/ladder/`), which holds the 85 programs of the pass list.

## Where the fix belongs, and the precedent search

The feature map's row for varargs (`explorations/coordinator/map/spec-to-implementation.md:212`) names no code-generator site and the state 'code generation refuses varargs'; the checker passes these programs (F-86), so the fix is the code generator's alone: `NamingCzar` (descriptors), `CodeGen` (declarations and calls) and `OverloadSet` (dispatch methods), the files of the section. The gather may give the row its codegen cell (`NamingCzar.varargsParamType`, `CodeGen.evalVarargsArgs`, `OverloadSet.VarargsExpansion`). Walk's `buildEnvFromParams` is the precedent for the value. The ways the language and the library offer to carry the arguments: (a) one array parameter of the declared type, made by the caller; (b) one JVM method for each arity, writing the body again (fork G2's way not taken); (c) a JVM array of `Object`; (d) the array made by the callee from a `java.lang.Object[]`; (e) a library list (`<|...|>`). Only (a) gives the body the type at which the checker binds the parameter, so (a), as G1 says. For the array itself: the factory, as walk; `tabulate` would need a closure over the arguments; a native helper cannot make a library object. For the dispatch: the expansion rule's reading at each arity where another member meets it (G2), rather than one dispatch method with the packed signature that would branch on the array's length. The planner's stand-in (`probes/varargs-standin.patch`) rewrote every varargs parameter before code generation into a plain one; the rung reads the parameter's type at each place instead (`NamingCzar.paramType`), since the component index that the dispatch methods read keeps the declared parameters. Other sites that read a parameter's declared type in these files: an object's constructor (`CodeGen.java:4979-4983`, `:5092`), which the checker refuses for varargs ('Varargs parameters of objects are not allowed.', row 11), and the methods' overload sets (`partitionByMethodArgCount`), not reached by the library (no overloaded varargs method).

## What the specification settles

The value and its order (`functions.tex`, "Function Applications"); the type, by the revival callout and F-86; the applicability at each number of arguments (`overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters"), which a dispatch method follows; a spread argument's elements after the others (`functions.tex`, "Function Applications", the examples `f(1, [2 3]...)`). It does not settle the JVM form (G1), so the form follows the stand-in.

## Programs run on the old code and on the new

- The five compile tests and the run test above: each compile fails on the old code, passes on the new.
- A scratch program, `count(xs: ZZ32...): ZZ32 = |xs|`, `twice(ys: ZZ32...): ZZ32 = count(1, ys...)`, `run(): () = println(twice(4, 5))`: walk prints 1, for 3 (walk's code is not changed by the rung); compiled under the selection on the new code it compiles, and its bytecode calls `count` with an array of one, the spread dropped (NEW-G-1).
- A scratch program, `println(count(t))` for `t: (ZZ32, ZZ32) = (1, 2)`: walk prints 2; the new code passes both elements (`e1`, `e2` into an array of two), now part of `OneLibraryVarargsCount`.

## Sentences of the specification made false

- `Specification/basic/functions.tex:192-195` at `c799851472` (the callout): "and the code generator does not yet compile a function with a varargs parameter." Changed; before and after below.
- `Specification/appendices/changes.tex:4046-4047` at `c799851472` (the entry's effect): "The code generator does not yet compile a function with a varargs parameter, so no program with one runs on the compiled path." Changed; below.
- `Specification/fortress/preamble.tex:84`, "varargs parameters in compiled code" among the features not yet supported: still true, since no program with one runs on the compiled path (row 1062); left for the gather.

Before, `functions.tex:192-195` at `c799851472`:

    The compiled path's own library declares no such type, so there the compiled
    type checker refuses every use of a varargs parameter, in a body, a contract
    or a function expression, naming the type; and the code
    generator does not yet compile a function with a varargs parameter.}

After, `functions.tex:192-200`:

    The compiled path's own library declares no such type, so there the compiled
    type checker refuses every use of a varargs parameter, in a body, a contract
    or a function expression, naming the type, and the code generator refuses a
    function with a varargs parameter, naming it too.
    Against \library, the code generator passes the arguments that no plain
    binding takes as one such array, which the library's factory makes and the
    caller fills in order: at the call, or, where another declaration of the name
    takes as many arguments, in the dispatch method's branch for the varargs
    declaration.}

The entry's effect, `changes.tex:4046-4062`, now says the same, that a program compiled against the one library does not run yet, that neither implementation passes a spread argument's elements (NEW-G-1), and that the code generator does not yet compile the overloaded forms of NEW-G-2 (the last, the skeptic's). The specification was not built here; the gather builds it once.

## Points to report

- The convention as built: above, "The convention as built". Evidence: `CodeGen.java:7695-7831`, `OverloadSet.java:2024-2033`, `NamingCzar.java:945-968`.
- Row 624's test under the selector, failing on the base and passing after; the run test an expected failure; the bytecode of one call: above. Evidence: `ProjectFortress/one_library_tests/OneLibraryVarargsCount.test:1`, `XXXOneLibraryRunVarargs.test:1`.
- The prelude's two expected-failure tests: one unchanged, one with the message that names the missing array type. Evidence: `ProjectFortress/compiler_tests/XXXVarargsMethodCodeGeneration.test:3`.
- The measure: 3 refused remain, none behind varargs; nothing stops `Generator2` and `CatString`. Evidence: the command above, its first line.
- The shadow patch applies to the rung's `CodeGen.java`: exit 0.
- The files edited, for STAGE_BLIND: above; no file beyond those named. In `CodeGen.java`, members edited beyond the four the section names: `addParam` (`:712`), `generateFunctionalBody` (`:3166`), `addParams` (`:3296`), `localFunctionArrowType` (`:4050`), `forFunctionalRef` (`:4435-4443`), `partitionByArgCount` (`:8514-8541`), and the new `evalVarargsArgs`, `varargsCallDispatches`, `emitVarargsArray` and the field `varargsDispatchDomain` (`:7675-7831`). None is N's, I's or R's: `methodCall`, `dumpMethodChaining`, `forObjectDeclPrePass`, the RTTI's class, `forMethodInvocation` and `methodsNamed` are unchanged; a varargs method's dotted call needed no edit of `forMethodInvocation`, whose `evalArg` and `methodCall` read the varargs domain. A trial merge onto rung N's pushed branch (`git merge-tree --write-tree origin/wip/rung-number-payload-objects HEAD`) is clean.
- Reserved, a model line: none changed. Reserved, a change of which declaration a call reaches: not reached. Without a varargs declaration `partitionByArgCount` makes the same sets as before; against the prelude a varargs declaration is refused as before; under the selection no program with one compiled before.

## Decisions

1. **The array's JVM form: one parameter of the declared type, made by the caller (G1).** Ways not taken: one JVM method for each arity (G2's way not taken); `java.lang.Object[]` filled by the caller and read into the library's array by the callee, which gives the body no value of the parameter's type until a native helper makes a library object, which none can. Evidence: the checker's binding, `Types.makeVarargsParamType` (`Types.java:143-146`) at `STypeEnv.scala:191-193`.
2. **The array made by the factory and `init`, as walk.** Ways not taken: `tabulate` over a closure that indexes the arguments, which reads a `ZZ32` index as a JVM int, the representation question in reverse; a list. Evidence: `NonPrimitive.java:228-251`, `WellKnownNames.varargsFactoryName` and `arrayPutter` (`WellKnownNames.java:53`, `:56`).
3. **The index made as `FZZ32.make`.** Ways not taken: a numeral site of the one library's coercion, whose arguments are `FZZ` values under descriptors that name `fortress/FortressLibrary$ZZ` today; a cast of the `FZZ32` to `fortress/FortressLibrary$ZZ32`, which would verify and fail when run. Evidence: `CodeGen.forIntLiteralExpr` (`CodeGen.java:4636-4642`) and `MethodInstantiater` (`runtimeSystem/MethodInstantiater.java:228-232`) make every `ZZ32` from a JVM int so, and N's fork N1 names a payload object's type by its payload class.
4. **The factory's template named from its declared header, the parameter names written in the code generator.** Ways not taken: the header looked up in the global environment, which the dispatch methods' static code (`OverloadSet`) does not reach. Evidence: the generic function class name that the code generator gives a written call `a = __immutableFactory1[\ZZ32, 0, 3\]()` in a scratch program under the selection (`javap`: `fortress/FortressLibrary?$\=__immutableFactory1?fortress\|FortressLibrary\%ZZ32,0,3??$\=?Arrow??,fortress\|FortressLibrary\%ImmutableArray1?T,b0,s0??`), which the emitted one equals.
5. **The dispatch method's members by the expansion rule, at each arity from the plain count to the most another member takes (G2).** Ways not taken: one dispatch method at the packed signature that branches on the array's length; arities beyond, where the varargs declaration is alone and a call needs no dispatch. Evidence: `overloading.tex`, section "Applicability for Functionals with Varargs and Keyword Parameters"; the library's `assert` and `deny` meet another member at two arguments only.
6. **The call site decides by the same partition** over the declarations of the call's name, its component's or its api's (`varargsCallDispatches`). Ways not taken: a mark on the call from the overload rewriter, a shared phase. Evidence: in the prelude, a call already reaches a dispatch method by the name and signature of the principal member (a scratch program of `check(flag: Boolean, msg: String)` and `check(x: Any, y: Any)`: `check(a, s)` for `a, s: Any` calls `check:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;)`, the dispatch method, and the principal's body is `check?`).
7. **A generic varargs declaration is not expanded, and its calls make the array.** Ways not taken: expanding it, which writes dispatch arms through generic closures that no call reaches. No library name has an overloaded generic varargs declaration.
8. **The prelude's refusal names the missing type and keeps 'Can't compile VarArgs yet' at its start (G4).** Ways not taken: a new message, which changes both prelude tests. Evidence: `XXXVarargsCodeGeneration.test` unchanged.
9. **A single tuple-valued argument passes its elements where the parameter does not take the tuple whole.** Ways not taken: refusing it; passing the tuple as one element, which the checker's typing (applicable at two for `count(t)`) contradicts. Evidence: walk prints 2 for the scratch program's `count(t)` above.
10. **A local function's varargs refusal lifted** (it is in the section's files). Ways not taken: keeping it, with row 304's sibling note. Evidence: `OneLibraryVarargsLocalFunction` passes.
11. **A spread argument not built (G3)**: a guard refuses it in the code generator if it ever arrives (`CodeGen.java:7696-7697`); the defect is in walk's evaluator and the checker's argument list, shared and outside the section's files.
12. **No decision record**: the section asks for the callout's before and after, given above; the entry `revival-varargs` and its callout already stand.

## Defects, each with its home

- Row 624, the code generator's refusal of varargs: home 1 under the selector, `one_library_tests/OneLibraryVarargs*.test`; against the prelude the refusal stays by P-37, the two prelude tests its expected failures.
- NEW-G-1, a spread argument dropped on both paths: home 2, `ProjectFortress/tests/XXXVarargsSpreadArgument.fss` ('FAIL: a ZZ32: 1 =/= a ZZ32: 3', `harness-one.sh`: 'OK Saw expected exception'), and a new row; the specification settles the answer.
- The one library's `ZZ32` made from a JVM int as `FZZ32` under descriptors that name `fortress/FortressLibrary$ZZ32`, also at the varargs array's indices: home 3, a note on row 1062 (no gated test can run a program on the one library).
- A single argument of tuple type at a varargs declaration whose types also take the tuple whole, as `tally(t)` for `tally(x: Any, y: Any, rest: Any...)` and a pair `t`, was passed as one element: the code generator stopped with `NegativeArraySizeException: -1` where the plain parameters needed the tuple's elements, and `countAny(t)` for `countAny(xs: Any...)` made an array of one where the checker and walk read two. Home 1, the skeptic's fix: `one_library_tests/OneLibraryVarargsCount.test` (`tally(t)`).
- NEW-G-2, a varargs declaration beside another of its name with as many parameters, where it is a trait's or object's method or has static parameters: the code generator stops with `OptionUnwrapException`, as on the base. Home 2: `one_library_tests/XXXOneLibraryVarargsMethodOverloaded.test`, `XXXOneLibraryVarargsGenericOverloaded.test`, and a new row in `record.md`.
- Row 304's note that `forLetFn` refuses varargs, and row 1062's that row 624 stands on `println`'s path, no longer hold: their rewrites in `record.md`.

## Not done

- An overloaded method with a varargs parameter in one trait or object (`partitionByMethodArgCount`): not expanded; where another method of its name takes as many parameters, the code generator stops with `OptionUnwrapException` (NEW-G-2); no library trait has one.
- A varargs declaration with static parameters beside another declaration of its name with as many parameters: not expanded, and the same stop (NEW-G-2); no library name has one.
- Two varargs declarations of one name: the dispatch method holds both up to the most another member takes; beyond, a call goes to the statically chosen one.
- The one library's dispatch methods are not checked by the measure, which skips them; the program's own `check` dispatch is in `OneLibraryVarargsOverloaded`.
- The specification is not built here (the gather builds it once).
