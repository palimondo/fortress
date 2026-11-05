<!-- The design for the curator's decision on whether the one library's `Number` stays closed by its `comprises` clause, so that no program may declare a type below it (ledger rows 596, 551 and 804; PLAN.md:328), written 2026-11-05 by an Opus worker, with measurements in worktrees seeded at 65e8553f6: the checker count and the distance without the clause (0 and 0, as with it), walk's refusal of every program without it (603 of 741 suite tests), the three library declarations that lean on it, the model program's exposure through its softmax, four options and the recommendation (open `Number` after walk's half of row 804). -->

# Number's closure: the design for the curator's decision

The base is `65e8553f6`. Every measurement below ran in worktrees seeded from a base build at that commit. The main tree's library is the same at the time of writing (`git diff --stat 65e8553f6 HEAD -- Library ProjectFortress/LibraryBuiltin ProjectFortress/src ProjectFortress/tests` prints nothing). Three trees were used:

- the base: the library as landed;
- the change tree: the base, with the one line of `Number`'s clause removed from `Library/FortressLibrary.fss` and from `Library/FortressLibrary.fsi`;
- the iteration tree: the change tree, with some of the library's array operators commented out, to find what else leans on the clause.

## 1. The question, and a primer

**The question.** Does the one library's `Number` keep its `comprises` clause, so that no program may declare a type below `Number`?

1. **Words.** The one library is the interpreter's library, which both ways of running a program will use. Walk is the interpreter. The compiled path is `fortress compile` and `fortress run`, which write and run JVM bytecode. The checker is the compiled path's static type checker. Today the compiled path uses its own small library, the compiler's prelude. The switch-over is the day the compiled path moves onto the one library and the prelude is deleted. After it, the checker checks every program against the one library.
2. **Below.** A type is below `Number` when it extends `Number`, directly or through other traits. In Fortress a trait is like an interface that can carry code, and an object is a leaf type with no subtypes.
3. **The `comprises` clause.** A `comprises` clause on a trait lists types. It says that every value of the trait is a value of one of the listed types. A trait with such a clause is a closed trait. A trait or object that extends a closed trait must be below one of its listed types. Scala's `sealed` is near this.
4. **The clause in question.** The one library declares `trait Number extends { AnyAdditiveGroup, AnyMultiplicativeRing } comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }`. So `Number` is a closed trait.
5. **No listed type is open to a program.** `RR64` is closed to the library's two float objects. `RR32` and `IntLiteral` are objects. `AnyIntegral` lists the five integer types, and each of those is closed to one native object. `QQ` has `comprises { ... }` in the api. By the specification's note, only a component that exports the library's api may extend such a trait. So by the text's rule, no program can put a type below `Number` at all. (The checker does not yet enforce the note: section 2, point 9.)
6. **The exclusion rule.** No type may extend two instantiations of one generic trait, such as `AdditiveGroup[\RR64\]` and `AdditiveGroup[\QQ\]`. The checker keeps this rule, and so the number types are flat siblings under `Number`, each an additive group and a ring of itself.
7. **A program that the clause refuses.** The team's own test does this:

        object Infinity extends Number
          getter asString(): String = "Infinity"
          asFloat(self): RR64 = 1.0 / 0.0
        end

   A complex number is the same case:

        object Cx(re: RR64, im: RR64) extends { Number, MultiplicativeRing[\Cx\] }
          getter one(): Cx = Cx(1.0, 0.0)
          asFloat(self): RR64 = re
          opr +(self, other: Cx): Cx = Cx(re + other.re, im + other.im)
          opr -(self): Cx = Cx(-re, -im)
          opr TIMES(self, other: Cx): Cx = Cx((re other.re) - (im other.im), (im other.re) + (re other.im))
          opr ^(self, other: AnyIntegral): Cx = self
        end

8. **What the clause refuses, measured.** The checker over the one library refuses both programs. For `Infinity` it says that `Number` has a `comprises` clause and that `Infinity` is not eligible to extend it. For `Cx` it says the same, and that `Number` and `MultiplicativeRing[\Cx\]` exclude each other. Without the clause, it accepts both (section 2, point 8). Walk refuses neither today, because walk checks only the clauses of the program's own component.

**References**

1. The brief; F-61, "... three steps to making the interpreter's library the compiler's"; `.claude/skills/fortress-repo/references/compiler.md`, "The compiler's prelude, until the switch-over".
2. `Specification/basic/traits.tex:257-264`, the extension rule; `Specification/basic/types-vals-vars.tex:287`, "an object trait type cannot be extended".
3. `Specification/basic/traits.tex:246-264`.
4. `Library/FortressLibrary.fsi:288-289`; `Library/FortressLibrary.fss:380-381`.
5. `Library/FortressLibrary.fsi:298-301` (`RR64 ... comprises { Float, FloatLiteral }`), `:397-400` (`QQ ... comprises { ... }`), `:444` (`AnyIntegral`), `:489-491`, `:536-538`, `:593-595`, `:651-653` (`NN64`, `ZZ32`, `ZZ64`, `ZZ`, each closed to one object); `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:41`, `:44`, `:47`, `:131`, `:179` (`Float`, `FloatLiteral`, `RR32`, `NN32`, `IntLiteral`, all objects); `Specification/basic/traits.tex:288-294`, the note on `...`.
6. P-43; F-44; F-131.
7. `ProjectFortress/tests/extendNumber.fss:15-20`; the complex probe is this review's, in the shape of `explorations/complex_ring.fss:8-16`.
8. Section 2, point 8, for the outputs; ledger row 551.

## 2. What the clause does for the checker and the library today

1. **The checker reads a `comprises` clause in eight places.** I read the Scala under `ProjectFortress/src/com/sun/fortress/scala_src/`:
   - The closure check. Each type that extends a closed trait must be below a listed type, or be a closed trait whose listed types all are, or be a generic trait whose known extenders all are. Otherwise: "Invalid comprises clause: ... is not eligible to extend it".
   - Exclusion. Two types exclude each other when no value has both. The checker proves it four ways: an `excludes` clause; a `comprises` clause, where a closed trait excludes a type that excludes every listed type; an object, which excludes every type that it is not below; and the exclusion rule. With `Number` closed, `Number` excludes any type that excludes all five listed types. A program's own object is such a type. So is `MultiplicativeRing[\Cx\]` for a program's `Cx`, by the exclusion rule against each listed type's own ring.
   - Subtyping into a union. A closed trait is below a union when each listed type is.
   - Meeting types. In an intersection, a closed trait is replaced by those of its listed types that the other parts do not exclude. So under the clause, `Number & AdditiveGroup[\Cx\]` is empty.
   - The Meet Rule. Where the parameter types of two overloads overlap and neither is below the other, a declaration must cover the overlap. Several declarations can cover it together, the closed trait read as the union of its listed types.
   - Abstract methods. An object can define an inherited abstract method by several narrower bodies that together cover it, through the clauses.
   - The type of `self`. In a trait with a clause, `self` has the type of the trait met with the union of its listed types.
   - The export check. The api's clause and the component's clause must match.
2. **Dispatch does not read the clause.** The code generator says that the clauses "should not affect code generation once type checking is complete". The compiled dispatch has no reference to exclusion or to `comprises`. A second "closed type" rule, in `ExclusionOracle.scala`, is not in use: no code makes an `ExclusionOracle`, and the class is named only by two imports.
3. **Walk reads clauses too.** Walk's exclusion test reads the clauses transitively, down to objects. Its overlap reading cuts a type by its clause in two places. The library's reflective QuickCheck reads a type's clause at run time to choose a type to generate.
4. **The checker count without the clause is 0, as with it.** The count stage runs the checker over the one library's `FortressLibrary` component and the apis that it imports. It gives 0 on the base and 0 on the change tree. The two tables are equal, and the checker's whole outputs are equal after the tree path is replaced. No error is new.
5. **The distance without the clause is 0, as with it.** The distance stage runs every stage of the checker over fourteen components of the one library. On the change tree it gives 0 in every kind. The last landed gate gave 0, and no commit since has touched the library or the checker.
6. **Walk refuses every program without the clause.** When walk loads a program, it checks the overload sets of the library and of the program: its load check. The load check refuses the library's scalar `+`, an array plus a number, beside `AdditiveGroup`'s own `+`. It asks for one pair of parameter types that exclude each other, and finds none. In the interpreter suite, 603 of 741 tests fail, all at this one refusal. Row 804 says why the library loads today: walk proves that `Number` and `AdditiveGroup[\T\]` exclude each other by reading `Number`'s clause down to objects. With the clause gone, it cannot.
7. **Three parts of the library lean on the clause, and nothing else that I measured does.** I measured this in the iteration tree:
   - The four scalar `+` and `-` operators. With each one restored alone, walk refuses it at load. The four scalar `MIN` and `MAX` operators load without the clause.
   - The reflective QuickCheck. With the eight scalar operators out, 7 suite tests fail. Six use the scalar operators. The seventh, `ReflectiveQuickCheckTest`, generates `Number` values. Without the clause, the generator finds no listed type, finds no generator for `Number` itself, and calls itself again until the stack overflows.
   - `Number`'s own `=`. It is checked the same with or without the clause. But its exact branch turns a value of any unlisted type into 0/0, and `0/0 = 0/0` answers `true` today (row 440). So any two values of a program's type below `Number` compare equal. This runs today under walk, which does not check the library's clause. Under the clause, the checker makes it unreachable at the switch-over.
   - Not leaning: the `MAX` and `MIN` families (walk loads them, the checker has no error), the array family's bound (count and distance 0), and the specification's 130 examples (all pass with the clause and the four scalar `+` and `-` out).
8. **The team's test and a complex number, on both trees.**
   - Walk, `tests/extendNumber.fss`: base rc 0; change tree rc 1, the library refused at load.
   - `fortress compile`, `tests/extendNumber.fss`: refused on both trees, because the prelude declares its own `Infinity` below `Number`. So the team's compiler does not take this test today, for a name clash, not for the clause.
   - Row 22's program, `object Value extends Number`: `fortress compile` and `fortress run` work on both trees and print `Value`.
   - The checker over the one library, run as the count stage runs it but on a program: `extendNumber`, base 2 errors, change tree 0; `Value`, base 2 errors, change tree 0; `Cx`, base 5 errors, change tree 0. A copy of `Cx` with one wrong binding gives exactly that one error, so the program's body is checked.
   - So at the switch-over, under the clause, row 22's program, which the compiled path takes today, is refused. `extendNumber` is refused today and after, for two different reasons.
9. **The closure has a hole through `QQ`.** On the base, the checker over the one library accepts a program's `trait MyRational extends QQ end`. That type is below `Number`. The checker refuses the `...` form only in an api, and row 354's second fix, which would refuse it outside the library's component, is not built.

**References**

1. `typechecker/TypeHierarchyChecker.scala:273-345` (the closure check; the message at `:335-337`; the exclusion messages at `:297-309`), `:386-398` (eligibility); `types/TypeAnalyzer.scala:523-556` (`checkEC`, `checkCC`, `checkO`, `checkP`), `:160-165` (union), `:788-800` (`normConjunct`); `overloading/OverloadingOracle.scala:177-188` (`coversOverlap`), `typechecker/OverloadingChecker.scala:671-676` (`coverageRule`); `typechecker/AbstractMethodChecker.scala:127-135` (`coveredByParts`; P-147); `disambiguator/SelfParamDisambiguator.scala:63-79` and `types/TypeAnalyzer.scala:579-582` (`self`); `typechecker/ExportChecker.scala:363-370`.
2. `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5073-5074`; `grep -n 'xclude\|comprise' ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java` prints nothing; `scala_src/typechecker/ExclusionOracle.scala:251-275`, and `grep -rn 'ExclusionOracle' --include=*.java --include=*.scala` outside its own file prints only two imports, `compiler/StaticChecker.java:43` and `scala_src/overloading/OverloadingJUTest.scala:20`.
3. `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:280-297`; `explorations/compile-ladder/rung-walk-load-check/REPORT.md` section 5, "Three sites trust the closure"; `Library/ReflectiveQuickCheck.fss:20-46`.
4. In each tree, `explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`. Change tree: `#total 0`, `#locations 0`, `#crash none`. Base: the same. `diff base.txt change.txt` prints nothing; the two `run.txt` files, with each tree's path replaced by `TREE`, differ in no line (33 lines each, `@@PROBE checkComponent FortressLibrary`, `### rc=0`).
5. In the change tree, `explorations/coordinator/tools/distance/run.sh <out> <scratch>`: `#total 0`; `#kind exclusion 0`, `#kind comprises 0`, `#kind overloading 0`, every other kind 0; `#crash none`. The last landed gate: F-53; `explorations/compile-ladder/climb-batch-25/gate/distance.txt`, `#total 0`; `git log --oneline 11d2d8764..HEAD -- Library ProjectFortress/LibraryBuiltin ProjectFortress/src/com/sun/fortress/scala_src` prints nothing.
6. Change tree, `bin/fortress extendNumber.fss`, rc 1: "`FortressLibrary.fss:4941:1-139: and FortressLibrary.fss:361:5-28:` / `+[\T extends FortressLibrary.Number AdditiveGroup[\T\],I extends FortressLibrary.Index\](x:Array[\T,I\],y:T):Array[\T,I\]` ... `and AdditiveGroup[...].+(self:(AdditiveGroup[\T\] & {T}),other:T):T` ... `have parameters with generic type, at least one pair of parameters must have excluding types`". Line 4941 of the change tree is line 4942 of the base (`Library/FortressLibrary.fss:4942`; `AdditiveGroup`'s `+` at `:361`). Change tree, `ant testSystem`: "Tests run: 184, Failures: 151", "183, Failures: 150", "188, Failures: 154", "186, Failures: 148"; the first refusal of every failure names `FortressLibrary.fss:4941` and `:361`. Row 804's notes.
7. The scalar operators: `Library/FortressLibrary.fss:4942-4952`, `.fsi:2718-2728`. Iteration tree, each of the eight restored alone, `bin/fortress ProjectFortress/tests/BooleanOps.fss`: the two `+` and the two `-` give rc 1 with "at least one pair of parameters must have excluding types"; the two `MIN` and the two `MAX` give rc 0. Iteration tree, `ant testSystem`: "Tests run: 186, Failures: 3", "184, Failures: 1", "183, Failures: 1", "188, Failures: 2"; the failing tests are `ArrayElementAlgebra`, `ArrayOperatorsBesideLibrary`, `ArrayScalarExtension`, `InferCoercionRungK`, `LibraryOverloadFamilies`, `TupleIndexBoundWalk` (each "Failed to find any matching overload, args = (__DefaultVector[...], ...)" or a matrix) and `ReflectiveQuickCheckTest`: "Stack overflow on MethodInvocation at .../Library/ReflectiveQuickCheck.fss:86.13", after 113 s. The generator: `Library/ReflectiveQuickCheck.fss:25-46` (`genType`), `:80-88` (`genAnyOf'`, which calls `genType` again); the test: `ProjectFortress/tests/ReflectiveQuickCheckTest.fss:21-26`. `Number`'s `=` and `exactValue`: `Library/FortressLibrary.fss:386-408`, the unlisted case at `:407`. Base, walk, the complex probe with one more line: "`Cx(1,2) = Cx(3,4): true`"; a probe with `object V extends Number`: "`0/0 = 0/0: true`", "`V = V: true`". Row 440. Iteration tree, with the clause and the four scalar `+` and `-` out, `ant testSpecData`: "Tests run: 130, Failures: 0".
8. Base, walk, `extendNumber.fss`: rc 0, no output. Both trees, `bin/fortress compile extendNumber.fss`: "`extendNumber.fss:17:8-14: Type name may refer to: Infinity, CompilerBuiltin.Infinity`", rc 255; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:513`. Both trees, `Value` (a copy of `tests/XXXComprisesLibraryTraitUnlistedExtender.fss` renamed): compile rc 0, run rc 0, "`Value`". The checker over the one library: the count stage's driver line (`explorations/coordinator/tools/checker-count/run.sh:95-97`) with the program as target, `java -Xmx4g -Xss64m -Dfortress.caches=<a copy of the count run's caches> -Dfortress.analyzer.overload.cache=false -cp <the count run's classes>:$(bin/fortress_classpath | tail -1) WorldFlip -stop check <program>`. Base, `extendNumber`: "`Invalid comprises clause: FortressLibrary.Number has a comprises clause / but its immediate subtype Infinity is not eligible to extend it.`", "`Type Infinity excludes FortressLibrary.Number but it extends FortressLibrary.Number.`", "`File extendNumber.fss has 2 errors.`" Base, `Value`: the same two messages for `Value`, 2 errors. Base, `Cx`: the same two, "`Types Number and MultiplicativeRing[\Cx\] exclude each other.  Cx must not extend them.`" twice, and "`Could not check call to operator +`" at `v + z`, "`File CxNumber.fss has 5 errors.`" Change tree, all three: "`@@PROBE checkComponent ...`", "`### rc=0`". Change tree, the copy with `bad: ZZ32 = z`: "`Right-hand side has type Cx, but declared type is ZZ32.`", "`File CxNumberBad.fss has 1 error.`" My first driver runs on the complex probe ran two at a time, and the change tree's run reported no error for a copy of the program with two declaration-order errors, which every later run reports; the cause is not known. I discarded the runs made two at a time and ran each case above alone, from a fresh copy of the caches.
9. Base, the driver on `trait MyRational extends QQ end`: "`@@PROBE checkComponent BelowQQ`", "`### rc=0`". `TypeHierarchyChecker.scala:332-341`; row 354, its fix (b).

## 3. The team's sources and which way they point

1. **Walk's library, closed, since April 2008.** Before 15 April 2008, walk's library had `trait Number extends { Any } excludes { String, Boolean }`, an open trait. On 15 April 2008 Maessen wrote `trait Number comprises { RR64 }`, with each level of a nested tower closed below it. His commit gives the reason: walk's exclusion test now reads `comprises` clauses, and the old number hierarchy "told some white lies to the exclusion checker". So the closure was made for walk's exclusion test. The team's 2012 library keeps the nested closures: `Number comprises { RR64 }`, `RR64 comprises { Float, FloatLiteral, RR32, QQ }`, `QQ comprises { Ratio, AnyIntegral }`, `ZZ32 comprises { Int, IntLiteral }`.
2. **The team's test, open, from 2007.** The test's comment is "We ought to be able to extend the builtin type Number". It is in a commit of 4 January 2007, the first day of the history, under Maessen's name. Ryu moved it to the passing tests in June 2008. Steele added a getter in July 2008. Maessen added `asFloat` to it in September 2008, five months after he closed `Number`. So the closure's own author kept a program's type below the closed `Number` running. Walk never checked the library's clause, then or now.
3. **The compiler's prelude, open, from 2009 to the team's last commit.** The prelude's `Number` had no clause. On 22 June 2009 Chase made it `trait Number excludes { String }`, in a commit that "Made overloading codegen a little cleverer about types". So the type group, the part of the team that built the checker and the compiler, needed `Number` to exclude `String`, and wrote an `excludes` clause, not a closure. By January 2012 the prelude declares three objects below `Number` that are not number types, `Infinity`, `NegativeInfinity` and `IndefiniteNumber`. The compiler's literal folding turns an integer `n DIV 0` into one of them. The commit that brings them joins work across a cut in the conversion, so its author is not recovered. At the team's last commit, both libraries stand as described. The prelude's number types exclude each other by their own `excludes` clauses.
4. **P-43 calls the flattened prelude the team's last record of the Fortress way.** The one library took its flat tower from the prelude. The prelude's `Number` is open.
5. **The specification gives `Number` no clause.** The number chapter says only that the number types are siblings under `Number`. The team's chapter on types says "The numeric types share the common supertype `Number`", and lists among them complex numbers, intervals, polar forms and fixed widths from 8 to 128 bits that the library does not have. The chapter on coercions shows `trait Number ... end` and `trait ZZ extends Number end`, with no clause. The frozen Working Draft's number chapters do not declare `Number`. The specification's example programs declare `trait RR extends Number end` to set up an example.
6. **The papers do not decide it.** Naden's 2012 text writes the rings as `trait Ring[\X <: Number\] comprises X`, rings over types below `Number`. The POPL 2019 paper has no `comprises` clauses.
7. **The revival kept the closure without a decision.** The flat tower's commit of 27 September 2026 carried the clause from the nested tower to the siblings. Its report lists the clause in its edit and gives ten decisions, none of them on the closure. A commit of 2 October 2026 added `IntLiteral` to the list. PLAN.md records this question with "default the library's clause kept".
8. **Which is the team's later word.** P-26 dates "later" by the team's work on the point at issue. The point is whether a type that is not one of the library's number types may be below `Number`. Walk's library settled it in April 2008, for walk's exclusion test. The prelude settled it from June 2009 to January 2012, with its open `Number`, its `excludes` clause and its three objects below `Number`. So the prelude is the later word, and it is open.
9. **The sources conflict.** The two libraries disagree. The closed one is walk's 2008 library, whose nested tower P-43 set aside. The open one is the type group's prelude, the later work. The test's comment and the specification's text are on the open side.

**References**

1. `git show f38024906:Library/FortressLibrary.fss` line 48; `git show 900bff59b:Library/FortressLibrary.fss` lines 267-276, and its message, item 3 ("We now account for comprises clauses when performing exclusion tests. Our old numeric hierarchy was deliberately kludged and told some white lies to the exclusion checker ..."); `git show 5a68404fd:Library/FortressLibrary.fss` lines 349-352, 422, 521, 642.
2. `git show 72ae6881b:ProjectFortress/not_passing_yet/extendNumber.fss`; `d406beed5` (Ryu, 2008-06-21), `dc41d5000` (Steele, 2008-07-21), `e109c9812` (Maessen, 2008-09-30), each `-- ProjectFortress/tests/extendNumber.fss`; `research/authorship.md:43-50` for the names; row 551.
3. `git show 0670a315c` (dr2chase, 2009-06-22), "`-trait Number` / `+trait Number excludes { String }`"; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:510-515`, `.fsi:96-101`; `git diff 26718e298 712a2969a -- ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` (the three objects come in `712a2969a`, a commit of 68K inserted lines); `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:69-74`; `git show a874948ac:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` lines 487-492; `CompilerBuiltin.fsi:103`, `:147`, `:210`, `:273`, `:332`, `:390`, `:433`, `:475`.
4. P-43.
5. `Specification/basic-lib/numbers.tex:32-33`; `Specification/basic/types-vals-vars.tex:583-602`, unchanged since the team (`git diff a874948ac -- Specification/basic/types-vals-vars.tex` holds no `Number` line); `Specification/basic/conversions-coercions.tex:695-699`; `grep -n Number Specification-1.0-frozen/basic-lib/numbers.tex` finds only the chapter and section titles; `SpecData/examples/preliminaries/Overview.Fast.fss:19`.
6. `Papers/Types/journal/justificationOfRTR.tex:576-577`; `explorations/reviews/walk-leaning-decisions.md`, "The POPL 2019 points".
7. `d846e3644`; `explorations/compile-ladder/rung-flat-tower/REPORT.md` sections 5 and 6; `9d2e4c856`; `explorations/coordinator/PLAN.md:328`.
8. P-26.
9. Points 1 to 5 above.

## 4. What a user gains or loses

1. **With the clause, a user's number type sits beside `Number`, not below it.** It gets the algebra by extending `AdditiveGroup` and `MultiplicativeRing` of itself. The revival's `complex_ring.fss` does so, and writes only `one`, `+`, unary `-`, `TIMES` and `^`. From the traits' defaults it gets binary `-`, `zero` and juxtaposition. It runs today under walk.
2. **What extending `Number` adds beyond that, measured on the complex probe.**
   - Vectors and matrices. `Vector`, `Matrix`, their factories, their products and the norm bound their element type by `T extends { Number, MultiplicativeRing[\T\] }`. Below `Number`, a user's `Cx` gets `vector[\Cx,2\](z)` and `v DOT v`. Under the clause, it cannot be an element type of either.
   - The scalar extension: `v + z`, `z - v`, and `MIN` and `MAX` between an array and one number.
   - Generic code bounded by `Number`: the library's sparse matrices and random generators, the unary `+`, `RR64`'s `^` and `atan2` with a `Number` argument, and `String`'s `||` with a `Number`. The model program's own generics are bounded so too.
   - Exclusion for free. Fifteen of the library's traits exclude `Number` by their own clauses: generators, arrays, ranges, strings, `Maybe`, lists and others. A type below `Number` excludes all of them without writing a clause.
   - `asFloat`. It is abstract on `Number`, so it is an obligation as much as a gain. It is the one explicit conversion into `RR64`.
3. **What extending `Number` brings that is wrong today.** `Number`'s `=` makes any two values of a user's type equal (section 2, point 7). `random(a: Number)` is a native that reads its argument as a float. Both are small repairs, and option (b) lists them.
4. **What the clause gives a user.** It makes `Number` exactly the library's number types. So a user's function on `Number`, defined by cases at the five listed types, is a complete cover for the checker. Without the clause, such a function needs a case for every other number too.
5. **What the exclusion rule and the flat tower need from the clause: nothing, by measurement.** The siblings exclude each other by their own `excludes` clauses: `RR64` excludes `QQ`, `AnyIntegral` and `RR32`; `QQ` excludes `RR64` and `AnyIntegral`; the integer types exclude each other in pairs. They also exclude each other by the exclusion rule, since each is an additive group of itself. `RR32` and `IntLiteral` are objects. The count and the distance stay 0 without the clause.
6. **One part of a record entry no longer holds.** F-151 says that `Number` stays in the array bound because its clause makes the element type exclude `String`. `String` now excludes `Number` and every ring by its own clause, and the checker needs no closure for it. The bound's `Number` still matters for walk's scalar `+` and `-` (section 2, point 7).

**References**

1. `explorations/complex_ring.fss:8-16`; `Library/FortressLibrary.fsi:265-286`; `explorations/reviews/mie-probes/flat-world-for-users.md` section 4.
2. `Library/FortressLibrary.fsi:1645`, `:1678-1706`, `:1757-1815` (the array family; F-151); base, walk, the complex probe: "`v[1] = 1.0+2.0i`", "`(v + z)[0] = 2.0+4.0i`", "`v DOT v = -6.0+8.0i`", rc 0; the change tree's checker on it, rc 0 (section 2, point 8). `.fsi:2718-2728` (the scalar extension); `Library/Sparse.fsi:24-34`; `Library/Random.fsi:24`; `.fsi:2657`, `:367`, `:375`, `:2505`; `explorations/run-c4/src/FlatArrays.fss:169`, `explorations/apl/mg/FlatArrays2.fss:23-39`. `.fsi:759-760`, `:981`, `:1055`, `:1231`, `:1245-1251`, `:1624`, `:1718`, `:1828`, `:2190`, `:2448`; `Library/List.fsi:57`, `:71`; `Library/PureList.fsi:42`. `.fsi:290-291`; `Specification/basic-lib/numbers.tex:46-49`.
3. `Library/FortressLibrary.fss:386-408`; row 440; `.fss:4537`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:418-421`.
4. Section 2, point 1, the Meet Rule's cover and the abstract-method cover.
5. `Library/FortressLibrary.fsi:298-300`, `:397-399`, `:489-490`, `:536-537`, `:593-594`, `:651-652`; `scala_src/types/TypeAnalyzer.scala:534-555`; section 2, points 4 and 5.
6. F-151; `Library/FortressLibrary.fsi:2448`; `c8e013faf`; section 2, points 4 and 5.

## 5. The model program's exposure

1. **Neither microGPT program declares a type below `Number`.** `grep` finds `Number` in their sources only as a bound, `T extends Number`, which `RR64` meets with or without the clause.
2. **Both programs call the library's scalar `-`.** The softmax of each is `exp(z - (BIG MAX z))`, an array minus one number.
3. **Under walk, that operator loads only with the clause.** With the clause removed, both quick checks fail at load. With the clause removed and the four scalar `+` and `-` taken out, both fail at the softmax line.
4. **The compiled path is not exposed.** The model does not compile yet. When it does, the checker's view of the library is the same with or without the clause: count 0 and distance 0.
5. **So:** option (a) leaves the model as it is. Options (b) and (c) change no model line, but the clause can go only after walk reads the scalar pairs as the checker does (row 804). Before that, removing the clause stops both programs.

**References**

1. `grep -n 'Number' explorations/run-c4/src/*.fs? explorations/apl/mg/*.fs?`: bounds only, at `run-c4/src/FlatArrays.fss:169`, `FlatArrays.fsi:51`, `apl/mg/AplMg.fss:12`, `FlatArrays2.fss:23-39`, `:173`.
2. `explorations/run-c4/src/MicroGptFlat.fss:28`; `explorations/apl/mg/MicroGptApl.fss:42`.
3. Change tree, `explorations/coordinator/tools/mg-run.sh tmp/mg/change change`: `MicroGptFlatQuick` "rc=1 secs=19" and `MicroGptAplQuick` "rc=1 secs=28", each at "`FortressLibrary.fss:4941:1-139` ... at least one pair of parameters must have excluding types". Iteration tree with only the four scalar `+` and `-` out: `MicroGptFlatQuick`, "`MicroGptFlat.fss:28:60: Failed to find any matching overload, args = (Row3View[\4,16,16\],-0.09473599988278869:RR64)`", "rc=1 secs=36"; `MicroGptAplQuick`, "`MicroGptApl.fss:42:60: Failed to find any matching overload, args = (RowView[\16,16\],-0.09473599988278869:RR64)`", "rc=1 secs=49".
4. `.claude/skills/fortress-repo/references/interpreter.md`, "The model program" (walk only); section 2, points 4 and 5.
5. Row 804; PLAN.md:525.

## 6. The options

A rung is one step of the revival's work: one change with its tests, reviewed and landed through the gate.

**(a) Keep the clause, as landed, and repair the team's test.**

1. Files: `ProjectFortress/tests/extendNumber.fss`, a team test, so the edit is the curator's (row 596). Of row 596's six programs, it is the only one below `Number`; the other five, three tests and two demos, are below `Exception`. Row 596 proposes that it extend a listed number type. That cannot be done within the text's rule: every listed type is an object, closed to the library's objects, or `QQ`, whose `...` the specification keeps for the library's component (section 1, point 5). So the repair drops `extends Number` and the test's point, or turns the test into a second expected failure of row 551, beside row 22's test. The five tests and demos below `Exception` are row 596's other half and do not depend on this choice.
2. The specification: its text gives `Number` no clause, and lists future number types under it. By P-95 a change is stated in the text, so (a) adds a sentence to the number chapter that `Number` comprises the listed types and that no program may extend it, with a revision box and an Appendix I entry.
3. To make the closure true for programs, row 354's second fix closes the hole through `QQ` (section 2, point 9). Without it, a program can still put a type below `Number`.
4. Checker count 0 and distance 0, measured on the base.
5. Tests that change: `extendNumber.fss`.
6. Size: less than one rung: a test edit and a text revision, and row 354's fix if wanted.
7. The model: no effect.
8. At the switch-over: a program such as row 22's `Value`, which the compiled path takes today, is refused with 2 errors.

**(b) Open `Number`: drop its clause, keep `AnyIntegral`'s (P-44), and adjust what leans on the clause.**

1. Files, in two steps.
   - Step 1, walk: walk's half of row 804. Walk's overloading check reads exclusion over the whole tuple of parameter types, at the equalities that the static parameters' bounds force, as P-152 and P-157 say and as the checker does. Row 804's expected failure, `tests/XXXExclusionVectorScalarWalk.fss`, declares an open `trait Numb end` beside the vector pair, the shape that (b) makes of `Number`. It becomes a passing test. The site is `interpreter/evaluator/values/OverloadedFunction.java`, near `:553-554`.
   - Step 2, the library: remove the clause from `Library/FortressLibrary.fss` and `.fsi` (two lines); give the reflective generator a way to generate a `Number` without a clause, for example a fixed choice among the library's number types, as `genAnyType` does for `Any` (`Library/ReflectiveQuickCheck.fss:49-58`); give `Number`'s `=` an answer for a type outside the library's number types, in place of 0/0; retarget row 22's test, `tests/XXXComprisesLibraryTraitUnlistedExtender.fss` and `.test`, to another closed library trait, such as `AnyIntegral`; correct the comment of `tests/ReflectiveNumberTypes.fss:7`; add a test of a user's number in a vector, the complex probe's shape. `tests/extendNumber.fss` stays as the team wrote it.
2. The specification: no change is forced, since its text gives no clause. One sentence in the number chapter may say that a program may extend `Number`. The record: row 596's `Number` half closes; F-131 and F-151 lose their sentences on the clause.
3. Checker count 0 and distance 0, measured on the clause's removal. After step 2's edit of `Number`'s `=`, estimated 0, to be measured.
4. Tests that change: measured without step 1, 603 of 741 suite tests fail. With step 1, estimated: only `ReflectiveQuickCheckTest` fails, until step 2's generator repair. Measured in the iteration tree: `extendNumber` passes, `ReflectiveNumberTypes` passes, and row 22's test still passes as an expected failure, but it then asserts a refusal that is no longer the rule, so step 2 retargets it. The specification's 130 examples pass. The team demos were not run.
5. Size: two rungs: step 1 in walk, then step 2 in the library.
6. The model: no model line changes. Step 2 must not land before step 1, or both quick checks fail (section 5).
7. At the switch-over: nothing that the compiled path takes today is refused for being below `Number`.

**(c) Open `Number`, and keep the siblings' mutual exclusion by `excludes` clauses where the checker needs it.**

1. Measured: the checker needs none. The siblings already exclude each other by their own `excludes` clauses and by the exclusion rule (section 4, point 5). So (c)'s text for the siblings is (b)'s.
2. What (c) can add: an `excludes` clause on `Number` against the library's other types, as the prelude wrote `trait Number excludes { String }`. Measured need: none, since those types already exclude `Number` by their own clauses.
3. What (c) cannot give: walk's proof that `Number` excludes `AdditiveGroup[\T\]`. For an open `Number` it is false, since a user's `Cx` is both. So (c) needs (b)'s step 1 too.
4. Files: (b)'s, and at most one `excludes` clause on `Number`. Count and distance: estimated 0. Tests: as (b). Size: as (b), two rungs. The model: as (b).

**(d) Keep a clause, but list an open trait for programs' numbers.**

1. For example `Number comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral, OtherNumber }`, with an open `trait OtherNumber extends Number`. Programs extend `OtherNumber`.
2. Not measured. Row 804's note says that walk's proof fails once a listed type can be extended. So (d) needs (b)'s step 1, and adds a public name that the team never used.
3. Files: (b)'s and the new trait. Count and distance: estimated 0. Size: as (b), two rungs. The model: as (b).

**References**

- (a) 1: row 596; `ProjectFortress/tests/extendException.fss:17`, `atomicList.fss:24`, `typeTests.fss:15`, `ProjectFortress/demos/tictactoe.fss:29`, `newtictactoe.fss:26`, each `extends Exception`; section 1, point 5. (a) 2: P-95; `Specification/basic/types-vals-vars.tex:583-602`; `Specification/basic-lib/numbers.tex:32-33`. (a) 3: row 354; section 2, point 9. (a) 4: section 2, points 4 and 5. (a) 8: section 2, point 8.
- (b) 1: row 804; P-152; P-157; `ProjectFortress/tests/XXXExclusionVectorScalarWalk.fss:1-12`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:548-557`; `Library/ReflectiveQuickCheck.fss:49-58`; `Library/FortressLibrary.fss:386-408`; `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.test`. (b) 2: row 596; F-131; F-151. (b) 3 and 4: section 2, points 4 to 7; iteration tree, `ant testSystem`: "`tests/extendNumber  OK`", "`tests/ReflectiveNumberTypes  OK`", "`tests/XXXComprisesLibraryTraitUnlistedExtender  Saw expected failure: loaded and ran, not refused at load`". (b) 6: section 5.
- (c) 1 to 3: section 4, point 5; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:510`; section 2, point 7.
- (d) 2: row 804's notes ("were `AnyIntegral` to list the extensible `Integral[\I\]`, it would refuse them").

## 7. How the options weigh

1. **The team's word points to an open `Number`.** The later word, the type group's prelude of 2009 to 2012, is open, and P-43 names that prelude as the Fortress way. The test's comment and the specification's text are open too. The only closed source is walk's 2008 library, closed for walk's exclusion test. The revival kept that closure without deciding it.
2. **The user gains with (b).** A user's number can be an element of the library's vectors and matrices, use the scalar extension, and pass every `Number` bound. The specification's own planned numeric types, complex numbers and intervals, are of that kind. Under (a), a user's number stays outside the array family, and the user writes his own vectors.
3. **The checker does not care.** The count and the distance are 0 with the clause and without it.
4. **Walk cares, and (a) is free while (b) costs a rung.** (b) and (c) need walk's half of row 804 first. That fix is wanted anyway: P-157 already reads these pairs as valid for the checker, and row 804 is open for programs' own vector pairs. PLAN.md lists it for review.
5. **The model does not care, if the order is right.** (a) changes nothing. (b) changes nothing once step 1 lands before step 2.
6. **The risks are small on both sides.** (b) makes three library members reachable at a user's type (`=`, the reflective generator, `random`), and each needs a small repair. (a) keeps a closure that programs can get around through `QQ` until row 354's second fix, and adds a sentence to the specification that the team never wrote.
7. **(c) and (d) give nothing more than (b).** (c)'s extra `excludes` clause is not needed. (d) adds a name and keeps walk's cost.
8. **Both (a) and (b) are easy to undo.** Each is a few lines of library text, and walk's step 1 stands on its own.

**References**

1. Section 3, points 3 to 9; P-26; P-43. 2. Section 4, point 2; `Specification/basic/types-vals-vars.tex:583-602`. 3. Section 2, points 4 and 5. 4. Row 804; P-157; PLAN.md:525. 5. Section 5. 6. Section 2, points 7 and 9; section 4, point 3; row 354. 7. Section 6, (c) and (d). 8. Section 6.

## 8. Recommendation

Open `Number` (option b): first walk's half of row 804, then remove the clause with the generator, `=` and test repairs, and keep the clause until the first step lands.
