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

So a selector alone lets a test compile a program against the one library on `main`, under the gate. Its run needs the library's jars, which the code generator cannot write today: F-34 (three components stopped whole at the wrappers, row 874, on code without the measure's patch), and the rehearsal's W8 and W10 on the way to `println` (rows 624 and 315).

## 7. Review-queue item 521: a map of names, or files of its own

- **The number types need no second set.** Under form 2 the seven payload classes extend `FValue` and name no library. One set serves the prelude and the one library alike, with one names table that follows the selector (sections 2 and 5). Probe Y's question assumed carriers that extend generated classes; for the numbers there are none after rung N.
- **The other carried types need classes of their own for the one library, not a map.** `Boolean`, `Char`, `FlatString` are objects in the one library, and `JavaBufferedReader`, `JavaBufferedWriter` and the two stores are traits with a private native object there (P-164, P-169). The prelude has traits for all of them, carried by classes that extend the prelude's springboards. A map of names turns `FBoolean extends CompilerBuiltin.Boolean.DefaultTraitMethods` into a class that extends `FortressBuiltin.Boolean.DefaultTraitMethods`, which does not exist, since `Boolean` is an object there; the rehearsal could use the map only because its hack made those objects traits, which broke walk. So the second set, for these types only, is payload classes written by hand for the one library: files of their own, chosen by the class path (F-353), or classes under names of their own that the selected table names.
- No decision of the curator's is needed. P-33 names the mechanism, "a second set of the run time's value classes (F-353)", and the evidence settles the form: none for the numbers, files of their own for the rest. The record's default for the rest belongs to the batch after, with row 874.

## 8. The order of the code generator's output (row 996)

The selector's tests compile and run single programs and assert their output; they compare no bytes, so they need no stable order. Section 3 shows why rung N needs its tests under two hash modes: one expected failure (row 566) changed its answer under an edit that does not touch its dispatch. Its rung belongs with the next rung that edits `OverloadSet`'s order, not with the selector.

## 9. The disk

`df -P /home/user`: 14,839,328 KB available before the probes' builds, 14,313,008 KB with both probe trees built (each about 0.3 to 0.5 GB). The older base build `/home/user/fortress-base36` (322 MB) is no longer any run's.

## 10. The briefing keys

The 82 keys of the record's section 1 that name no part of the record itself were checked with `facts-extract.sh --check` on `main` at `1c7e7415aa`: exit 0, each matching one place. The keys into `CLIMB-BATCH-33.md` and into this note were checked after their commit.

## Not probed

- The one library's half of form 2 on a running program: no program runs compiled against the one library on this code (section 6).
- Rung Q's, R's, D's, V's and C's reproducers were not run by this planner: each row's own test fails on the base by the ledger and the gate's expected failures (rows 1050 to 1052, 940, 942, 959, 1005, 1028, 1029, 1060), and rows 812 and 822 by their notes and the measure (section 5).
- A timing.

## Commands

- The prelude's form 2: `git apply probes/form2-prelude.patch` on a tree seeded from a build of `c3b16ef2d1` (the patch holds the new file `LibraryNames.java`), then `ant compileAll`, the five compiles of the library order, and `ant testCompiler`.
- The measure with form 2: `git apply compile-ladder/plan-31/probes/planner/measure-hacks.patch`, then the prelude's patch with `patch -p1 --fuzz=3`, then the two lookups of `NamingCzar` extended to `FortressLibrary`'s and `FortressBuiltin`'s seven, as section 5 says; then the script's own steps after its `git apply`.
- The selector: `FORTRESS_LIBRARY=one FORTRESS_CACHES=<private> JAVA_FLAGS="... -Dfortress.caches=<private>" bin/fortress compile Arr.fss`.
