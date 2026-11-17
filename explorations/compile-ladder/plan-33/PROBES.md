<!-- The probes of climb batch 33's planner, 2026-11-17, for the record `coordinator/CLIMB-BATCH-33.md`: way C's form 2 of the carriers' review (the code generator writes a built-in number object's class over a hand-written payload class) built in scratch for the compiler's prelude, with its seven number types made value objects, and run through both compiled test tracks; the same form measured on the one library's seven number objects; probe Y's selector reproduced; review-queue item 521 answered; in two worktrees seeded from the base build `/home/user/fortress-base37` (`c3b16ef2d1`) and removed after; nothing here lands, and the prelude probe's whole diff is `probes/form2-prelude.patch`. -->

# Climb batch 33: the planner's probes

## 1. The trees

- The base build is `/home/user/fortress-base37` at `c3b16ef2d1`, built and clean. `git diff --stat c3b16ef2d1 HEAD -- . ':!explorations' ':!docs' ':!.claude'` printed nothing on `main` at `1c7e7415aa`, so its code is `main`'s.
- `/home/user/fortress-p33`: form 2 for the prelude (sections 2 to 4). `/home/user/fortress-p33m`: the one library's measure with form 2, and the selector (sections 5 and 6). Each was seeded with `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base37 <tree> - c3b16ef2d1` and removed after. The base build was not touched.
- Machine: nproc 4, OpenJDK 25, `FORTRESS_THREADS=1` for the runs by hand; the two ant tracks at their own settings. No other agent built during the probes; the load reached 4.

## 2. Form 2 for the prelude: what was built

The carriers' review, way C, "Where the class comes from: three forms", form 2: the code generator writes the value object's class over a small payload class written by hand, which extends nothing generated (`reviews/carriers-ways-2026-11-13.md`). P-178's detail (way D) gives each number type that form. The probe made it for the prelude's seven number types, in scratch. Every edit is marked `PROBE 33` in `probes/form2-prelude.patch`.

1. **The prelude's text.** `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` and `.fss`: `trait ZZ32 ... excludes { ... }` became `value object ZZ32 extends { ... }`, and the same for `ZZ`, `ZZ64`, `NN32`, `NN64`, `RR64` and `RR32`. Each `excludes` clause went: an object excludes every type that it does not extend. No body changed.
2. **The payload classes.** `compiler/runtimeValues/FZZ32.java` and its six siblings became `public abstract class FZZ32 extends FValue { final int val; protected FZZ32(int x) ... }`, with `getValue()` as before. Each no longer extends a springboard and names no library, so the stub file `src/fortress/CompilerBuiltin.java` is no longer needed for them. Each keeps `make(int)`, which Java code and the wrapper generator call: it reaches the generated class's `make` through a method handle, found by the class's name. A new class `runtimeValues/LibraryNames.java` gives that name: `fortress.CompilerBuiltin$ZZ32`, or `fortress.FortressLibrary$ZZ32` where a selector names the one library. Each keeps a nested `RTTIc` whose `ONLY` is the generated class's RTTI, since the run time reads a static argument's RTTI as `<carrier>$RTTIc.ONLY`.
3. **The table of payload objects.** `compiler/NamingCzar.java`: a table of the seven (the type's name, its payload class, the payload's JVM type: `I`, `J`, `Ljava/lang/String;` for `ZZ`, `F`, `D`), and two lookups. The table of carried types (`bl(fortLib, "ZZ32", "FZZ32")`) is unchanged: every descriptor still names a number type by its payload class.
4. **The code generator.** `compiler/codegen/CodeGen.java`:
   - `forObjectDeclPrePass`: a payload object's class extends its payload class; it is not a singleton; it gets a constructor `(I)V` that passes the payload up and a static factory `make(I)` that returns the payload class's type.
   - `dumpMethodChaining`: a payload object takes every trait's bodies by forwarders, the first trait's too, since its superclass is no springboard.
   - `methodCall` and `forMethodInvocation`: a dotted call on a value of a payload object's type casts the receiver to the object's class and calls the method there, since the descriptor names the payload class.
   - `RttiClassAndInterface`: a payload object's RTTI names its type by the payload class.
5. **The dispatch method.** `compiler/OverloadSet.java`, `emitInstanceOfNG`: the RTTI that a dispatch test reads is the object's class's static field, not the payload class's.

The constructor chain of a box is `CompilerBuiltin$ZZ32`, `FZZ32`, `FValue`: three classes, as the review counts. `javap` of the generated `fortress/CompilerBuiltin$ZZ32`: `public final class fortress.CompilerBuiltin$ZZ32 extends com.sun.fortress.compiler.runtimeValues.FZZ32 implements fortress.CompilerBuiltin$Number, ...Equality⟦FZZ32⟧, ...StandardTotalOrder⟦FZZ32⟧, ...ValueObjectMark`, with `make(int)`, the constructor `(int)`, and each method of the object as an instance method, as `+?0(FZZ32)`.

## 3. What ran

- **The build and the prelude's library order.** `ant compileAll` (27 to 41 s), then the five compiles: each exit 0, five jars.
- **Three programs** (`probes/programs/PZ1.fss`, `PZ2.fss`, `PZ3.fss`), compiled and run:
  - `PZ1`: `k: ZZ32 = 3`, `k + 4`, `.asString`, `<`, `MAX`, `asZZ`, a `typecase` arm at `ZZ32`, and a `var` sum over `seq(0#10)`: `7`, `7`, `true`, `9`, `3`, `ZZ32 arm`, `45`.
  - `PZ2`: `Box[\ZZ32\](5)` through a generic function, a `typecase` arm at `Box[\ZZ32\]`, an overloaded function at `ZZ32` and `String`, `=`, `GCD`, `CMP`: `6`, `Box of ZZ32`, `ZZ32`, `true`, `12`, `12`, `6`, `GreaterThan`.
  - `PZ3`: `ZZ64`, `NN32`, `RR64`, `RR32`, `ZZ` and `NN64` arithmetic, and `asRR64`: `6000000000`, `14`, `2.5`, `true`, `5.0`, `246913578024691357802469135780`, `10`, `4.5`.
  - Row 866's program, `compiler_tests/XXXObjectExtendsZZ32Compiled.fss` (`object MyNum extends ZZ32 end`): the compile stops, 'Invalid type in extends clause: ZZ32'. On the base it compiles and dies when its class loads.
- **The two compiled tracks, `ant testCompiler`, twice.**
  - First run, with sections 2's items 1 to 4 less the RTTI's name and item 5: `CompilerJUTest` 1,694 tests, 11 failures; `OtherCompilerJUTest` 263 tests, 1 failure. By kind: row 866's expected failure, now refused (one test, two steps); a dispatch test that reads `FRR64.RTTI`, a field that the payload class lacks, 'NoSuchFieldError' (five tests, `NatDispArmChecker` and the four `NatRt*`); a static argument named `fortress|CompilerBuiltin%ZZ32` in a generic instance that compiled code names by `FZZ32`, 'ClassCastException' (`LotsOfStaticParams` and two cases of `Compiled12.inherit2`): the rehearsal's W12, met under form 2 on the prelude.
  - The two naming walls repaired (section 4), the failing tests run again in one JVM each: `OK (26 tests)` and `OK (3 tests)`.
  - Second run: `CompilerJUTest` 1,694 tests, 6 failures in four tests; `OtherCompilerJUTest` 263, 0 failures. The four are tests whose answer the decision changes, or a test of an older row:
    - `XXXObjectExtendsZZ32Compiled` (row 866): refused at the compile, the decision's answer; its two steps fail as an expected failure that no longer fails as it pinned.
    - `XXXOverloadZZ32BesideUserTrait` (row 698): `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)` over a program's trait now compiles and prints `PASS`, since an object excludes the program's trait; it pinned the refusal.
    - `Compiled6.bx`, a team test: its program's object below `ZZ32` gives a second error, 'Objects can only extend traits.', beside the one it pins.
    - `XXXComprisesMeetGenericTrait` (row 566): prints `PASS`. Nothing in the probe touches that dispatch, and the probe's edits move the identity-hash order of the code generator's output (row 996), so whether form 2 repairs row 566 or the order hides it is not known.

So form 2 holds for the prelude: the seven types are value objects, the whole compiled tracks pass but for the decision's own answers and one test to be read again, and the probe found no wall that it could not pass.

## 4. What form 2 met, in the order met

1. **`FZZ32$RTTIc` named by the run time.** A generic arrow's class names a static argument's RTTI as `<carrier>$RTTIc`, and its `ONLY` (`runtimeSystem/Naming.java`, `stemClassToRTTIclass`). Passed by a nested `RTTIc` in each payload class whose `ONLY` is the object's RTTI.
2. **A dispatch test reads `<payload class>.RTTI`** (`OverloadSet.emitInstanceOfNG`). A static field `RTTI` in the payload class, set from the object's, was tried first: a class-initialisation cycle left it `null` in one test ('NullPointerException ... because FRR64.RTTI is null'). The dispatch now reads the object's class.
3. **Two names for one type.** The generated RTTI named the object's class, `fortress|CompilerBuiltin%ZZ32`, where the descriptors name `FZZ32`: a closure's arrow made from RTTIs at run time was not the class compiled code made. The RTTI now names the payload class. This is row 995's kind under form 2. Its rule is the review's: "the stamped class is named by the carrier".
4. **Not met:** a stub, a class-loader order fault (the method handle loads the object's class without initialising it), a second set of classes.

What the rung needs beyond the probe: the canonical name kept in every place that names a payload object's type (the three above are the places that the tracks reached; a reading of the other sites that name an object's class is the rung's); the names table following the selector; the tests; and the run under two hash modes.

## 5. The one library: the measure with form 2

In `/home/user/fortress-p33m`: `compile-ladder/plan-31/probes/planner/measure-hacks.patch` applied, then the prelude probe's patch, with the table of payload objects extended to the one library's seven: `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` of `FortressLibrary`, `NN32` and `RR32` of `FortressBuiltin`; `NN32`'s two getters as the measure's script sets them; then `ant compileAll` and `compile-ladder/plan-25/probes/codegen.sh` (174 s):

    refused declarations 18 | emitted (OK lines) 742 | component failures 0
    kinds 5
      9  Can't compile VarArgs yet  [String 4, FortressLibrary 3, List 1, FlatString 1]
      5  <X> is not in the kind env  [List 3, FortressLibrary 1, CovariantCollection 1]
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  ClassCastException: ...IntersectionType to ...NamedType  [FortressLibrary 1]
      1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]

The same figures as F-34 on the same code without form 2: 18 printed, 17 refused (the counter counts `List`'s `ArrayList` twice), 742 emitted, five kinds. The seven objects are emitted (`@@CG OK ObjectDecl ZZ32 .../Library/FortressLibrary.fss:846:1-949:2`, and `RR64`, `ZZ`, `NN32` alike). So form 2 adds no refusal on the one library. The measure writes no class that runs, so the emitted classes were not loaded, and their superclass was not read.

## 6. The selector

Probe Y's two hunks (`Shell.useCompilerLibraries()` and `WellKnownNames.compiledPathUsesOneLibrary`, `probe-y.patch`) applied in `/home/user/fortress-p33m`, over the measure's patch and form 2, with a private caches folder:

- `FORTRESS_LIBRARY=one bin/fortress compile Arr.fss` (`probes/programs/Arr.fss`: `array1[\ZZ32, 8\]()`, a `seq` loop, a read): exit 0, 19.6 s from cold caches. `Half.fss` (`q: QQ = 1/2`): exit 0.
- `FORTRESS_LIBRARY=one bin/fortress run Arr`: 'Unable to read serialized data for fortress/FortressLibrary$Generator⟦⟧ ... Resource not found': no jar of the one library exists.
- On the base's code (`tools/old-fortress.sh /home/user/fortress-base37 ...`), the same compile with the variable set: 'Function array1 is not defined.' The base has no selector.

**The selector alone.** The same two hunks in `/home/user/fortress-p33`, over the prelude's form 2 and without the measure's patch, with a private caches folder and `FORTRESS_LIBRARY=one`:

- `HelloOne.fss` (`run(): () = println("Hello, one library")`): exit 0. `Half.fss`: exit 0.
- `Arr.fss`: the code generator stops, 'RuntimeException: Not in the trait table: Array1', from `STypesUtil.removeIdenticallyCoveredMethods` through `TypeAnalyzer.lteq`, `normalize` and `typeCons` (`TypeAnalyzer.scala:893`). With the measure's patch, whose `TraitTable` search covers `FortressLibrary` and `FortressBuiltin`, it compiles (above). Filed as row 1061, row 940's root met at a program's compile.

So a selector alone lets a test compile a program against the one library on `main`, under the gate: a program that binds a `QQ`, which the prelude does not declare, at once, and one with an array once rows 940 and 1061 are repaired. Its run needs the library's jars, which the code generator cannot write today: F-34 (three components stopped whole at the wrappers, row 874, on code without the measure's patch), its 17 refused declarations, any one of which stops its component's jar, and the rehearsal's W8 and W10 on the way to `println` (rows 624 and 315).

## 7. Review-queue item 521: a map of names, or files of its own

- **The number types need no second set.** Under form 2 the seven payload classes extend `FValue` and extend no generated class. They still name the prelude through `asString`: each returns `FJavaString`, the prelude's string carrier, and `FValue.asString()` is declared at `fortress.CompilerBuiltin.String` (`compiler/runtimeValues/FValue.java:21`; the patch keeps both). That is the condition that review-queue item 521 names, and it stands until the string's carrier has its rung. One set serves the prelude and the one library alike, with one names table that follows the selector (sections 2 and 5). Probe Y's question assumed carriers that extend generated classes; for the numbers there are none after rung N.
- **The other carried types need classes of their own for the one library, not a map.** `Boolean`, `Char`, `FlatString` are objects in the one library, and `JavaBufferedReader`, `JavaBufferedWriter` and the two stores are traits with a private native object there (P-164, P-169). The prelude has traits for all of them, carried by classes that extend the prelude's springboards. A map of names turns `FBoolean extends CompilerBuiltin.Boolean.DefaultTraitMethods` into a class that extends `FortressBuiltin.Boolean.DefaultTraitMethods`, which does not exist, since `Boolean` is an object there; the rehearsal could use the map only because its hack made those objects traits, which broke walk. So the second set, for these types only, is payload classes written by hand for the one library: files of their own, chosen by the class path (F-353), or classes under names of their own that the selected table names.
- No decision of the curator's is needed. P-33 names the mechanism, "a second set of the run time's value classes (F-353)", and the evidence settles the form: none for the numbers, files of their own for the rest. The record's default for the rest belongs to the batch after, with row 874.

## 8. The order of the code generator's output (row 996)

The selector's tests compile and run single programs and assert their output; they compare no bytes, so they need no stable order. Section 3 shows why rung N needs its tests under two hash modes: one expected failure (row 566) changed its answer under an edit that does not touch its dispatch. Its rung belongs with the next rung that edits `OverloadSet`'s order, not with the selector.

## 9. The disk

`df -P /home/user`: 14,839,328 KB available before the probes' builds, 14,313,008 KB with both probe trees built (each about 0.3 to 0.5 GB). The older base build `/home/user/fortress-base36` (322 MB) is no longer any run's.

## 10. The briefing keys

The 93 keys of the record's section 1 were checked with `facts-extract.sh --check` on `main`: exit 0, each matching one place; those into the record and into this note on the files as committed with the record.

## 11. Varargs (row 624), the closure class written twice (row 315) and the intersection receiver (row 540), probed for the coordinator on 2026-11-17

In `/home/user/fortress-p33v`, seeded from the base build and removed after: the measure's patch, probe Y's two lines of the selector, and a stand-in for varargs (`probes/varargs-standin.patch`, each edit marked `VARARGS PROBE`), with two switches for the probe: `-Dprobe.varargs=false` restores the refusal, `-Dprobe.search=false` turns off the measure's search of the trait table over the one library. The programs are in `probes/programs/`. Each compile below ran with `FORTRESS_LIBRARY=one` and a caches folder made empty for it: a compile whose analysis is cached and whose jar is missing writes nothing and exits 0 (probe Y's third defect), which hid the first try.

**What the parameter's value is.** The specification binds a varargs parameter to a sequence of the arguments that no plain binding took, in order (`Specification/basic/functions.tex`, "Function Applications"), and its revival callout gives the type: "Both implementations give a varargs parameter the array type of the library that the compiled type checker's authors named for it, `ImmutableArray[\T, ZZ32\]`: the interpreter binds the parameter to an immutable one-dimensional array of the arguments" (`functions.tex`, the `revival-varargs` callout). F-86: the checker types the parameter so, and applies a varargs declaration by the specification's expansion rule, one declaration for each number of arguments. Walk builds the value in `NonPrimitive.buildEnvFromParams` (`interpreter/evaluator/values/NonPrimitive.java:222-251`): it instantiates the library's factory `__immutableFactory1[\T, b0, s0\]` (`WellKnownNames.varargsFactoryName`; `Library/FortressLibrary.fsi:1798`) at the count of the remaining arguments, puts each argument in order, and binds the array. The team's code generator left only the refusal: `NamingCzar` throws 'Can't compile VarArgs yet' for a tuple type with a varargs part at four places (`:1307`, `:1317`, `:1457`, `:1568`), `jvmSignatureFor` unwraps each parameter's declared type (`:962`, `:968`), `CodeGen.forLetFn` refuses a local function's (`:3957`), `FnNameInfo.typeAndParamsToArrow` marks "TODO varargs" (`:155`, `:161`), and `OverloadSet.getSignature` notes "some fiddliness with varargs that has to be sorted out" (`:615`). So the value and its type are settled by the specification, its callout, F-86 and walk; what is left to the rung is how the JVM carries it, and the record holds no decision on that.

**The stand-in.** A varargs part of a domain is one JVM parameter of the type `ImmutableArray[\T, ZZ32\]` of `FortressLibrary`; a varargs parameter becomes, before code generation, a plain parameter of that type; at a call, the plain arguments are pushed, each extra argument is compiled and dropped, and a `null` of the array's type stands in the varargs place. It makes no value: it shows only what the code generator meets once varargs passes.

- **The test that fails first.** `VarargsCount.fss` (`count(xs: ZZ32...): ZZ32 = |xs|`, `println(count(4, 5, 6))`), compiled under the selector: with the stand-in off, 'Can't compile VarArgs yet' at `VarargsCount.fss:3:7`, exit 1; with it on, exit 0; also with the search of the trait table off, so the program does not need row 1061's repair.
- **The measure** (`codegen.sh`, with the measure's patch and the stand-in): `refused declarations 10 | emitted (OK lines) 747`, against 18 printed and 742 before; 9 real, since the counter counts `ArrayList` twice. The ten of varargs are gone at their first wall. Two of them stop at another: `Generator2` (`Library/FortressLibrary.fss:5062`), 'Error trying to close method scope' in `CodeGen.generateActualMethodCode`, not traced; and `CatString` (`Library/String.fss:75`), 'Index 0 out of bounds for length 0' in `CodeGen.evaluateSubExprsAppropriately` under `forOpExpr`, an operator's application, which the stand-in did not reach. So varargs removes 8 of the 17 for certain, and 9 if `CatString`'s stop is the operator path of varargs itself. What remains: the kind environment 4 (rung V), the closure class 2 (row 315), the intersection 1 (row 540), and those two.

**Row 315.** `LexSame.fss`, `(|xs| = |ys|) AND: (BIG AND [(a, b) <- xs.zip[\ZZ32\](ys)] a = b)` over two `List[\ZZ32\]`, the one library's form (`Library/List.fss:127-128`, `Library/FortressLibrary.fss` `LexicographicOrder`'s `=`), compiled under the selector, with or without the search: 'java.util.zip.ZipException: duplicate entry: LexSame$\=fn@5\!23-66.class', exit 1. The span `5:23-66` is the parenthesized reduction, the right operand of `AND:`. `LexSame2.fss`, the same reduction alone: exit 0. `LexSame4.fss`, the reduction in parentheses alone: exit 0. `LexSame3.fss`, the operand of `AND:` a block that binds the reduction and ends with the name: exit 0. So the two function expressions that share the span are the one that `AND:` makes of its right operand and one that the reduction's desugaring makes at the reduction's span; the class name comes from the span alone (`NamingCzar.gensymArrowClassName`, `:892`, called from `CodeGen.forFnExpr`, `:3892`, and `forLetFn`, `:4053`). Which closure of the desugared reduction takes the span was not traced. The prelude cannot write the form, since it has no `AND:` over a `BIG AND`, so its test waits for the selector.

**Row 540.** No new run: its test, `compiler_tests/XXXCoverageReturnMethodCall.test`, fails under the prelude ('IntersectionType cannot be cast'), and its repair is in `CodeGen.forMethodInvocation` (`:7186`), where the receiver's static type passes through `sanitizePossibleStupidIntersectionType` (`:7420`) and is cast to `NamedType` at the call (`:7323`). The one library's `__filter` (`Library/FortressLibrary.fss:1404`) is the 17's one of this kind.

## Not probed

- The one library's half of form 2 on a running program: no program runs compiled against the one library on this code (section 6).
- Rung Q's, R's, D's, V's and C's reproducers were not run by this planner, but for R's kin at a program's compile (section 6): each row's own test fails on the base by the ledger and the gate's expected failures (rows 1050 to 1052, 940, 942, 959, 1005, 1028, 1029, 1060), and rows 812 and 822 by their notes and the measure (section 5).
- A timing.

## Commands

- The prelude's form 2: `git apply probes/form2-prelude.patch` on a tree seeded from a build of `c3b16ef2d1` (the patch holds the new file `LibraryNames.java`), then `ant compileAll`, the five compiles of the library order, and `ant testCompiler`.
- The measure with form 2: `git apply compile-ladder/plan-31/probes/planner/measure-hacks.patch`, then the prelude's patch with `patch -p1 --fuzz=3`, then the two lookups of `NamingCzar` extended to `FortressLibrary`'s and `FortressBuiltin`'s seven, as section 5 says; then the script's own steps after its `git apply`.
- The selector: `FORTRESS_LIBRARY=one FORTRESS_CACHES=<private> JAVA_FLAGS="... -Dfortress.caches=<private>" bin/fortress compile Arr.fss`.
