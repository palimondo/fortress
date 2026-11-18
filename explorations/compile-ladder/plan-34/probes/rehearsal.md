<!-- The first probe of climb batch 34's planner, 2026-11-18: a fresh rehearsal of the first compiled program against the one library on climb batch 33b's landed code, `ba3c7c876d`, in a scratch worktree of the planner's own, `/home/user/fortress-p34`, seeded from the base build `/home/user/fortress-base39` and removed after: marked hacks for the walls that the batch's rungs will fix, the one library's fourteen components compiled to jars under `FORTRESS_LIBRARY=one`, and `Hello`, `Arr` and `Dot` run with the JVM's verifier on and off; each wall in the order met, with its message, its ledger row and the rung or batch that takes it. The scratch tree's whole diff is `rehearsal-34.patch` beside this note; nothing of it lands. -->

# The first compiled program against the one library, rehearsed on `ba3c7c876d`

**The answer.** With hacks for exactly the walls that climb batch 34 is to fix, the one library's fourteen components compile to jars, and `Hello` prints `Hello, one library` with the JVM's verifier on and with it off. `Arr` and `Dot` run with the verifier off (`a[5] = 25`, `dot = 499500.0`) after one more hack, row 994's; with the verifier on, both die at a new wall, a method written twice into the template class of `Vector`.

Machine: 4 CPUs, OpenJDK 25, `FORTRESS_THREADS=1`, every build and run under `nice -n 19`, the load near 0 (a record-landing workflow ran beside the probe, mostly writing text).

## 1. How it was run

- The tree: `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base39 /home/user/fortress-p34 - ba3c7c876d`, then the hacks, then `ant compileAll` (32 to 34 s each time).
- The library: `lib14.sh <tree>` beside this note, the fourteen compiles by name under `FORTRESS_LIBRARY=one`, in the rehearsal's order, into the tree's `default_repository/caches-one`. On the final tree: AnyType 16 s, FortressBuiltin 9, FortressLibrary 87, RangeInternals 38, the other ten 47; 197 s in all. The jars hold 63 MB of caches.
- The programs: `runprog.sh <tree> Hello Arr Dot`, each compiled under the selection and run twice, with the verifier on and with `-XX:+UnlockDiagnosticVMOptions -XX:-BytecodeVerificationRemote`, the rehearsal's flags. The programs are in `programs/`.
- A static count: `verify/VerifyJars.java`, ASM's data-flow verifier over every method of every class in the caches' jars, lenient where a class cannot be loaded; a template class of a generic is skipped, since the class loader fills it at the run.

## 2. The hacks, each marked `PROBE 34 HACK` in the patch

Put in before the first run, for the walls named in the batch's pieces:

1. The measure's patch (`plan-31/probes/planner/measure-hacks.patch`), whole: the carried types' table rows for the one library (`NamingCzar`, and `Naming` for the run), the wrapper generator's converters for a helper's `String`, `Object` and the two stores (`FortressMethodAdapter`), a carried parent named by its interface (`extendsClauseToInterfaces`), `FlatString`'s classes in `fortress/FlatStringC`, and the trait table's search over the one library's two prelude apis; and `NN32`'s two getters at `NN32` (row 993).
2. Row 1076's stand-in, in the library's text: `__bigOperator2`'s inner generator bound to a local of type `Generator[\E\]` before the call (`Library/FortressLibrary.fss:1673-1675`).

Put in as the walls below were met:

3. Row 818's stand-in: `concatAndBalanceIfNecessary(s1 asif String, s2 asif String)` at `Library/String.fss:67` and `:69`, an assumption at both arguments, which the code generator compiles.
4. Fork N4 and the other value objects (row 874): the payload table's rows for the one library's seven, `FortressBuiltin`'s `Boolean` and `Char`, and `FlatString`'s `FlatString` (`NamingCzar.payloadObjects`; `FlatString` read as a library api under the selection); `LibraryNames.numberObjectClass` gives the one library's class names; `FBoolean`, `FCharacter` and `FJavaString` rewritten as abstract payload classes over `FValue`, as rung N wrote `FZZ32`. In the scratch tree they replace the prelude's classes, so the prelude no longer runs there: in the batch they are the second set of item 521's default.
5. The Java-backed traits (row 874; P-164, P-169): `FJavaBufferedReader` and `FJavaBufferedWriter` re-parented onto the one library's traits; probe Y's `FJavaArrayStore` and `FJavaRR64ArrayStore`; a Java stub `fortress/FortressLibrary.java` of the five traits that these classes and `Utility` name.
6. The run time's prelude names: `FValue.asString()` and `MutableFValue.asString()` typed `FValue`; `Utility.makeFortressException` looks up a constructor over the one library's `String`. The 105 raise strings were not touched; no program here raises.
7. `FlatString`'s `ignore(FlatString)` left out of `Library/FlatString.fss:29` (the new row of section 3, wall 4).
8. Row 1078's stand-in: `simplestRationalBetween`'s `label` body commented out and the function answering `a` (`Library/FortressLibrary.fss:578-623` on `ba3c7c876d`).
9. Row 994's repair, the rehearsal's: the four places in `OverloadSet` (`:962`, `:1421`, `:1784`, `:1788`) call `NamingCzar.javaPackageClassForApi`.

Taken out again at the end, with every program still running: the trait table's search (item 1; rung R's repair of rows 940 and 942 suffices) and `FlatString`'s package `fortress/FlatStringC` (item 1; with `FlatString` over a payload class, no Java stub names its class, and the payload class reaches `FlatString$FlatString` by name). The final patch has neither.

## 3. The walls, in the order met

1. **Row 818, at the library's compile.** `String` stops: 'Can't compile a dispatched call whose arguments are not all type assumptions node = concatAndBalanceIfNecessary' (`Library/String.fss:67:41-66`). The whole component writes no usable jar. F-34's measure counts `String` as 0 refused: the measure's driver does not reach this form, so the measure's 1 is not the real compile's count, which is 2 (rows 1076 and 818). Row 818's test `XXXAsIfPartialCallCompiled` holds the form against the prelude. **Belongs in the batch:** it stands between the fourteen jars and `Hello`.
2. **Row 1078, at `Hello`'s run with the verifier on.** 'VerifyError: Bad local variable type ... fortress/FortressLibrary.simplestRationalBetween(...) @1297: aload ... Type top (current frame, locals[8]) is not assignable to reference type', as `FortressLibrary`'s class loads, so every program dies. ASM's verifier finds the same method, a local unset on one path (instruction 778). Two copies of the function's shape against the prelude, with `ZZ32` for `QQ` (`programs/LabelLocals3.fss`, `LabelLocals4.fss`), compile, verify and run; so its test needs the one library. **Belongs in the batch:** the gate's runs have the verifier on.
3. **Fork N4, at `Hello`'s run with the verifier off.** 'java.lang.Error: The number type ZZ of the library that the compiled path reads is not compiled over com.sun.fortress.compiler.runtimeValues.FZZ' (`LibraryNames.java:39`, from a numeral's initialiser, `FortressLibrary.fss:722`), as F-388 and rung N's report say. **The carriers' rung.**
4. **A new row, at `FlatString`'s compile once `FlatString` is a payload object.** 'Can't compile the number type FlatString as a value yet node = FlatString.FlatString' (`Library/FlatString.fss:29:12-20`, `ignore(FlatString)`; row 1082's message). The line is walk's: without it, walk's `Hello` dies, 'NullPointerException: ... the return value of "...FNativeObject.getConstructor()" is null', since walk's native `FlatString` sets the strings' constructor only when the object's name is evaluated (`interpreter/glue/prim/FlatString.java:32-35`). The team wrote it as `FlatString;` (Chase, `5a68404fdf`, 2012); the revival respelled it `ignore(FlatString)` (`1e176516cf`). **The carriers' rung**, which must free walk of the line or compile the name: section 3 of the record's fork C4.
5. Past these, **`Hello` runs**, with the verifier off, then, past row 1078's stand-in, with it on: `Hello, one library`.
6. **Row 994, at `Arr`'s and `Dot`'s run with the verifier off.** 'NoClassDefFoundError: FortressLibrary' at `fortress.FortressLibrary⚙$seq⟦FZZ32⟧...the_function`, the first `for` over `seq`. With the rehearsal's repair both run: `a[5] = 25`, `dot = 499500.0`. **Only `Arr` and `Dot` meet it**, and its four lines are in `OverloadSet.java`, which no rung of the batch edits: the batch after.
7. **A new row, at `Arr`'s and `Dot`'s run with the verifier on.** 'ClassFormatError: Duplicate method name "-☞0" with signature "(Vector⟦FZZ32,8⟧)Vector⟦FZZ32,8⟧" in class file fortress/FortressLibrary$Vector⟦FZZ32,8⟧$DefaultTraitMethods'. The template class `FortressLibrary$Vector⟦⟧$DefaultTraitMethods` itself holds two methods `-☞0` with the descriptor `(Vector⟦T,s0⟧)Vector⟦T,s0⟧`: `Vector`'s own `opr -(self)` (`Library/FortressLibrary.fss:2799`; `trait Vector` at `:2784`) beside the one it inherits from `AdditiveGroup[\Vector[\T,s0\]\]`. Row 990's kind, which climb batch 31 fixed for another shape; two small programs of that shape against the prelude run (not kept). `array1` at a number type gives a `Vector`, so every such array meets it. With the verifier off, the JVM does not check it. **Only `Arr` and `Dot` meet it:** the batch after.

## 4. The verifier's count over the emitted library

`VerifyJars` on the final tree's caches: 1,096 classes and 9,484 methods checked, 1,092 template classes skipped. Before row 1078's stand-in it refused three methods: `simplestRationalBetween` (row 1078) and the dispatch methods of `opr[...]` in `RangeInternals`' `FullRange2D` and `FullRange3D`, whose arm for a pair loads a second local that the one-argument method does not have (row 1054's form). After it, the two of row 1054. The JVM agrees on the first; the other two are in classes that no program here loads. The count sees no template class and no format error, such as wall 7's.

## 5. How the gate can build the jars

- A program's compile writes only its own jar, against either library: `Hello` compiled in an empty private caches folder wrote `Hello.jar` alone, in 15 s with the selection and 5 s without.
- The compiler track gets the prelude's jars from its own `.test` files, such as `compiler_tests/CompilerBuiltinComponent.test` (`tests=../LibraryBuiltin/CompilerBuiltin`, `compile`), in its private caches. The one library's fourteen can take the same form in `one_library_tests/`, so the onelibrary track compiles them once per gate, about 200 s on an idle machine, and its run tests find them.
- Row 757 bites a rerun: a component whose jar was deleted while its analysis stayed cached compiles with exit 0 and writes no jar. The probe met it once, after its own script deleted a jar; a track that starts cold does not.

## 6. For the ledger

- Row 1078: reproduced on `ba3c7c876d`'s code with the measure's patch and two stand-ins; not reproduced against the prelude in two `ZZ32` copies of its shape.
- Row 818: the one library's `String.fss:67`, `:69` stop `String`'s compile under the selection; F-34's measure does not count it.
- Row 1076: reproduced against the prelude, `programs/VarRecv.fss`, so its test needs no selection.
- Row 993: its checker half reproduced against the prelude, `programs/WidenGetter.fss`: the checker passes an object's getter `zero(): Number` beside the inherited `zero(): I` at `I = Oz`, and the code generator stops, 'Likely bug in static analysis, apparently malformed overload set not rejected'.
- Row 340: another form, a numeral as an `exit`'s value, `exit done with 0` in a `label` body at a declared `ZZ32` (`programs/ExitNumeral.fss`): 'Error trying to close method scope'; walk prints 0.
- Row 994: met at `Arr`'s `seq`; the rehearsal's repair holds on this code.
- Row 1054: the one library's `FullRange2D` and `FullRange3D` have its form.
- New: `FlatString`'s `ignore(FlatString)` and walk (wall 4).
- New: `Vector`'s `-` written twice into its template class (wall 7).

## 7. Commands

- The setup lines of the `fortress-repo` skill's `build-and-caches.md`, then `ant compileAll`, `lib14.sh /home/user/fortress-p34`, `runprog.sh /home/user/fortress-p34 Hello Arr Dot`.
- The static count: `javac -d tmp/vj -cp <asm, asm-tree, asm-analysis jars> verify/VerifyJars.java`, then `java -cp tmp/vj:<the same jars> VerifyJars default_repository/caches-one ProjectFortress/build`.
- A prelude program on the base's code: `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base39 <tree>/tmp/old-caches compile P.fss`, then `run P`.
