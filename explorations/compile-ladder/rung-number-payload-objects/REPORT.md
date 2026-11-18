# Rung N: the prelude's seven number types as value objects over payload classes

- problem: a program's object below the prelude's open trait `ZZ32` compiled and died when its class loaded, 'IncompatibleClassChangeError: ... can not implement ...FZZ32, because it is not an interface' (row 866), `explorations/fortress-gap-ledger.md:1027`
- spec: "an object trait type cannot be extended. Thus, an object trait type excludes any type that is not its supertype", `Specification/basic/types-vals-vars.tex:285-288`
- precedent: the one library's `value object ZZ32` (`Library/FortressLibrary.fss:846`), built as the planner's probe built form 2 in scratch, `explorations/compile-ladder/plan-33/probes/form2-prelude.patch:1`
- deviation: a payload object's RTTI keeps the object's class as its class and names its type by the payload class through a generated `className()`, where the probe made the payload class the RTTI's class, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6283-6292`
- deviation: the names table follows the selector with no entries for the one library (fork N4), where the probe named `fortress.FortressLibrary$ZZ32` under the selector, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/LibraryNames.java:30-32`
- deviation: a payload class finds its object's class lazily, in holder classes, so that loading or initialising the payload class never fails, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:51-62`
- deviation: the table of payload objects is keyed by the declaring api, a bare name read in the library that the compile reads, where the probe tested `WellKnownNames.fortressBuiltin()`, `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:605-673`
- deviation: the cast to the object's class is the one cast of rung I's `castReceiver`, in both branches of `forMethodInvocation`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7641-7649`
- deviation: the stub file's seven entries go, which the probe kept, `ProjectFortress/src/fortress/CompilerBuiltin.java:17-18`
- deviation: the run time's unit test of the array store boxes its own `ZZ32` payloads, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ArrayStoreJUTest.java:65-66`
- historical: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/F{ZZ32,ZZ64,ZZ,NN32,NN64,RR32,RR64}.java`, `ProjectFortress/src/fortress/CompilerBuiltin.java`, `ProjectFortress/compiler_tests/XXX6bx.test:13-19`

One launch of this role worked the rung. The worktree was seeded from `/home/user/fortress-base38` by `seed-worktree.sh` (exit 0, 4 s) and its branch pushed.

## What changed and why

P-178 makes each built-in number type one `value object` on both paths before the switch-over, the prelude by P-37's second exception; its detail, the carriers' review's way D, takes way C's machinery, and form 2 inside it: the code generator writes the object's class over a small hand-written payload class that extends nothing generated. The commits, on `wip/rung-number-payload-objects`: `d226bed17c` (tests first), `b9aa895753` (the change), `6465bd6678` (row 496's ZZ32 test promoted), `18f5a81d9b` (an expected failure measured on the way, NEW-N-1), `c29eae9933` (a test of today's refusal of an excluded `typecase` clause, NEW-N-2).

1. **The prelude's text.** `CompilerBuiltin.fsi:103`, `:147`, `:210`, `:273`, `:332`, `:401`, `:444` and `CompilerBuiltin.fss:516`, `:577`, `:662`, `:753`, `:818`, `:893`, `:955`: `trait ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] } excludes { ZZ64, RR32, RR64 }` becomes `value object ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] }`, and the same for `ZZ`, `ZZ64`, `NN32`, `NN64`, `RR64` and `RR32`. Each `excludes` clause goes, since an object excludes every type that is not its supertype (`types-vals-vars.tex:288`). No body changed: `git diff c799851472 -- ProjectFortress/LibraryBuiltin` shows 14 lines, the seven headers in each file.
2. **The payload classes.** `runtimeValues/FZZ32.java` and its six siblings become `public abstract class FZZ32 extends FValue`, with the value field, a protected constructor, `getValue()`, `toString()` and the rest as before (`asString`, `makeSize`, `plus`, `make(BigInteger)` where the base had them). `make(x)` calls the object's class's static `make` through a method handle (fork N2), held in a nested `Make` class; the nested `RTTIc.ONLY`, which the run time reads for a static argument named by the payload class (`runtimeSystem/MethodInstantiater.java:137-141`), is the object's class's static `RTTI`. Both are found by the name that the new `runtimeValues/LibraryNames.java` gives (`:30-32`): `fortress.CompilerBuiltin$ZZ32` where the compiled path reads the prelude, and none where `WellKnownNames.compiledPathUsesOneLibrary` selects the one library (fork N4), where a value made raises 'The number type ZZ32 of the library that the compiled path reads is not compiled over ...FZZ32'. The stub file `src/fortress/CompilerBuiltin.java` loses its seven interfaces (70 lines); the build's dependency pass removed their old class files from `ProjectFortress/build/fortress/`.
3. **The table of payload objects.** `NamingCzar.java:605-673`: one row per object (the declaring api, the name, the payload class, the payload's JVM type `I`, `J`, `Ljava/lang/String;`, `F`, `D`), and four lookups: `payloadFor` (`:644`), the payload class and JVM type of an object being compiled; `payloadObjectClass` (`:664`), the object's class for a type; `payloadObjectClassOfPayload` (`:653`), the object's class for a payload class; a bare name is read in the library that the compile reads (`inSelectedLibrary`, `:625`). The table of carried types (`:588-601`) is unchanged, so every descriptor still names a number type by its payload class (fork N1).
4. **The code generator.** `CodeGen.java`:
   - `forObjectDeclPrePass` (`:4930-4937`, `:4946-4950`, `:5054-5076`, `:5124`, `:5242`, `:5283`): a payload object's class extends its payload class, is no singleton, has no init method of its own, and gets the constructor `(I)V` that passes the value up and the factory `static make(I)LFZZ32;`; the field `payloadObjectSuper` (`:235`, copied in the private constructor at `:386`) holds the payload class while the class is written.
   - `dumpMethodChaining` (`:1052`, `:1062`): a payload object takes every trait's bodies by forwarders, the first trait's too, since its superclass is no springboard.
   - `methodCall` (`:645-649`): a call on a payload object's type names the object's class, which holds its methods; the opcode stays `INVOKEVIRTUAL` (`:639-644`), since the type is now an object.
   - `forMethodInvocation` (`:7407`, `:7433`) and `castReceiver` (`:7641-7649`): the receiver on the stack is cast to the object's class where the receiver's type, after rung I's choice of the conjunct (`:7327-7331`), is a payload object's; else to I's owner, if any. One cast where the two meet, in the generic-method branch too, whose finder call names the receiver's class through `methodCall` (`:7697`).
   - `RttiClassAndInterface` (`:6283-6292`): a payload object's RTTI class keeps the object's class as its `javaRep`, as every object's does, and overrides `className()` to answer the payload class's name, `com/sun/fortress/compiler/runtimeValues/FZZ32`, which is what compiled descriptors and stamped instances name (fork N3).
5. **The dispatch test.** `OverloadSet.java:1095-1097`, `emitInstanceOfNG`: the RTTI that a dispatch test reads for a static argument is the object's class's static field, since the payload class has none.

`javap` of the generated class: `public final class fortress.CompilerBuiltin$ZZ32 extends com.sun.fortress.compiler.runtimeValues.FZZ32 implements fortress.CompilerBuiltin$Number, ...Equality⟦FZZ32⟧, ...StandardTotalOrder⟦FZZ32⟧, ...ValueObjectMark` (the probe's reading, PROBES section 2), with `make(int)`, the constructor `(int)` and the object's methods; the jar's classes after the library order (`unzip -l default_repository/caches/bytecode_cache/fortress.CompilerBuiltin.jar`):

    19251  2026-11-18 02:26   fortress/CompilerBuiltin$ZZ32.class
      353  2026-11-18 02:26   fortress/CompilerBuiltin$ZZ32$RTTIi.class
     1599  2026-11-18 02:26   fortress/CompilerBuiltin$ZZ32$RTTIc.class

No `$DefaultTraitMethods` springboard is written for the seven, since they are objects.

## The design as built (a point to report)

- **The payload classes:** `FZZ32`, `FZZ64`, `FZZ`, `FNN32`, `FNN64`, `FRR32`, `FRR64` in `compiler/runtimeValues/`, each `abstract` over `FValue`, holding `int`, `long`, `BigInteger` (made from its digits), `int`, `long`, `float`, `double`.
- **The table of payload objects:** `NamingCzar.payloadObjects` (`NamingCzar.java:614-622`), seven rows of the prelude's api `CompilerBuiltin`.
- **What the code generator writes for such an object:** a final class `fortress/CompilerBuiltin$T` extending the payload class and implementing the traits of its `extends` clause and `ValueObjectMark`; a constructor `(payload)V`; `static make(payload)` answering the payload class's type; forwarders for every trait's bodies; its own methods as instance methods; `getRTTI()` and the static `RTTI` field; an RTTI class whose `javaRep` is the object's class and whose `className()` names the payload class.
- **How Java code makes a value:** `FZZ32.make(int)` (and its siblings), which the wrapper generator (`compiler/nativeInterface/FortressMethodAdapter.java:139-155`), the helpers and the class loader's sizes (`FZZ32.makeSize`) call, reaches `fortress.CompilerBuiltin$ZZ32.make` through the method handle that `LibraryNames.factory` finds, by name, with the payload class's loader, without initialising the class.
- **The one name of a payload object's type:** the payload class, `com/sun/fortress/compiler/runtimeValues/FZZ32`, in every descriptor, in every stamped instance (`Box⟦com|sun|fortress|compiler|runtimeValues|FZZ32⟧`) and in the RTTI's `className()`. Only the class that holds the methods and the static `RTTI` field is the object's.

## Each place that names a payload object's type (a point to report)

| place | file and member | name it gives |
|---|---|---|
| descriptors, casts, `instanceof`, a `typecase` arm | `NamingCzar.java:588-601`, the table of carried types, read by `jvmTypeDesc` | payload class `FZZ32` |
| a generic instance's name at the compile | `NamingCzar.instantiatedGenericDecoration`, `genericDecoration`, through `jvmTypeDesc` | payload class |
| a generic instance's name at the run, from an RTTI | `runtimeSystem/RTHelpers.java:35-41`, `:174-175`, `RTTI.className()` overridden in the object's RTTI class, `CodeGen.java:6283-6292` | payload class |
| the RTTI's class, for the run-time subtype test | `CodeGen.RttiClassAndInterface`, the `<clinit>` of the RTTI class, `CodeGen.java:6276` | object's class `fortress/CompilerBuiltin$ZZ32` |
| a static argument's RTTI in compiled code | `runtimeSystem/MethodInstantiater.java:137-141` and `FZZ32.RTTIc.ONLY` (`FZZ32.java:60-62`) | payload class's `RTTIc`, whose `ONLY` is the object's RTTI |
| a dispatch test's RTTI | `OverloadSet.emitInstanceOfNG`, `OverloadSet.java:1095-1097` | object's class's static `RTTI` |
| a dotted call's method and receiver | `CodeGen.methodCall`, `:645-649`; `CodeGen.castReceiver`, `:7641-7649` | object's class |
| a functional method's static wrapper | `CodeGen.functionalForwardingMethod`, `:3725-3769` (unchanged: it casts `self` to `traitOrObjectName`) | object's class |
| a forwarder that narrows, a trait-named class | `NamingCzar.jvmTypeDescAsTrait` (`:1479`), read at `CodeGen.java:826`, `:835`, `:1581` | object's class |
| Java code that makes a value | `FZZ32.make` (`FZZ32.java:40-48`), `LibraryNames.factory` (`LibraryNames.java:48-55`) | payload class, reaching the object's class |
| the run time's equality and printing | `nativeHelpers/equalityRule.java:38-50` (`instanceof FZZ32`); `nativeHelpers/stringOps.java:106` (a value's class name, `ZZ32`) | payload class; the object's class, printed `ZZ32` |
| the run's copy of the carried table | `runtimeSystem/Naming.java:298-302`, unchanged | payload class |

## The failing run and the passing run

The tests were written first and run through the harness on the base's code, before the edit was first built (the first build started at 02:25:18):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests XXXNumberTypeExtendRefusedCompiled.test OverloadZZ32BesideUserTraitCompiled.test NumberObjectsCompiled.test XXX6bx.test
    # junit.sh base 2026-11-18T02:18:34Z; ... tree c799851472 with the next rung applied, not yet
    . compile ProjectFortress/compiler_tests/NumberTypeExtendRefusedCompiled 
     Saw failure, but did not satisfy compile_err_contains; expected
    Invalid type in extends clause: ZZ32
        Invalid overloading of add in component OverloadZZ32BesideUserTraitCompiled:
    Tests run: 6,  Failures: 3,  Errors: 0

The promoted tests whose plain names came after the fix ran on the old code (`tools/old-fortress.sh`, the base build):

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 <tree>/tmp/.../old-caches-junit junit <tree>/ProjectFortress/compiler_tests/ComprisesMeetGenericTraitLink.test ComprisesMeetGenericTrait.test XXX6bx.test
    Caused by: java.lang.ClassCastException: class ComprisesMeetGenericTrait$Vo cannot be cast to class ComprisesMeetGenericTrait$\=V?fortress\|CompilerBuiltin\%ZZ32? ...
    1) ProjectFortress/compiler_tests/Compiled6.bx(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    2) ProjectFortress/compiler_tests/ComprisesMeetGenericTrait(...TestTest)junit.framework.AssertionFailedError: TestTest ...
    Tests run: 4,  Failures: 2,  Errors: 0

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 <tree>/tmp/.../old-caches-junit3 junit <tree>/ProjectFortress/compiler_tests/GenericBesidePlainZZ32Link.test GenericBesidePlainZZ32.test
    Caused by: java.lang.ClassCastException: class GenericBesidePlainZZ32$IntTag cannot be cast to class GenericBesidePlainZZ32$\=Tag?fortress\|CompilerBuiltin\%ZZ32? ...
    Tests run: 3,  Failures: 1,  Errors: 0

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 <tree>/tmp/.../old-caches-junit4 junit <tree>/ProjectFortress/compiler_tests/XXXTypecaseArmExcludedRefused.test
    1) ProjectFortress/compiler_tests/TypecaseArmExcludedRefused(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

`NumberObjectsCompiled` passes on the base's code and is a guard: on the old code, with its final text, `OK (2 tests)` (`old-fortress.sh ... junit .../NumberObjectsCompiled.test`). Its assertions that each type's function result lies below `Number` at run time fail under the probe's form of the RTTI (below, "Programs run old against new").

The last run, after the last change of code (`b9aa895753`'s code; the tree at `c29eae9933` less its last test), every test of the rung in one JVM:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests XXXNumberTypeExtendRefusedCompiled.test OverloadZZ32BesideUserTraitCompiled.test NumberObjectsCompiled.test XXX6bx.test ComprisesMeetGenericTraitLink.test ComprisesMeetGenericTrait.test GenericBesidePlainZZ32Link.test GenericBesidePlainZZ32.test XXXTupleArgumentAtAnyCompiled.test
    OK (13 tests)

and `XXXTypecaseArmExcludedRefused.test`, added after it, `OK (1 test)` (`junit.sh arm ...`), on the same code.

The first `XXX` test added, `XXXTupleArgumentAtAnyCompiled`, through the harness as it is (`junit.sh xxx1`): ' OK Saw expected exception', `OK (1 test)`; with the tuple bound first, `p: Any = (k, k)` and `f(p)`, for one run (`junit.sh xxx2`): ' Saw failure, but did not satisfy compile_exception_contains; expected', `Tests run: 1,  Failures: 1`; then restored.

## Row 566 under two hash modes (fork N5)

`ComprisesMeetGenericTrait.fss`'s program, compiled and run by hand with a fresh caches folder each time, with `JAVA_FLAGS` the default and with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` added, on this tree and on the base's code (`old-fortress.sh`):

    base, default:  Caused by: java.lang.ClassCastException: class XXXComprisesMeetGenericTrait$Vo cannot be cast to class XXXComprisesMeetGenericTrait$\=V?fortress\|CompilerBuiltin\%ZZ32?   run rc=1
    base, hash 0:   the same line                                                                                                               run rc=1
    tree, default:  tag(s) =  3 / PASS   run rc=0
    tree, hash 0:   tag(s) =  3 / PASS   run rc=0

The failing cast on the base holds `V⟦fortress|CompilerBuiltin%ZZ32⟧`, the instance named by the trait `ZZ32`'s own interface, from an RTTI; `Vo` implements `V⟦com|sun|fortress|compiler|runtimeValues|FZZ32⟧`, the name compiled code gives (the jar's classes, `unzip -l .../XXXComprisesMeetGenericTrait.jar`, `...$tag⟦⟧✉$\=✚Arrow⟦XXXComprisesMeetGenericTrait\%S⟦X⟧,com\|sun\|fortress\|compiler\|runtimeValues\|FZZ32⟧`). Both orders fail on the base and both pass on the tree, so the order of the output (row 996) is not the cause: the cause is fork N3's two names, and the one name repairs it. The test is promoted (`ComprisesMeetGenericTrait.fss`, `.test` with `link`, `run`, `run_out_contains=PASS`, and `ComprisesMeetGenericTraitLink.test`).

## The team's test `Compiled6.bx` (fork N6, a reserved point)

`ProjectFortress/compiler_tests/XXX6bx.test:13-19`: its program writes `object extends { ZZ32 }`, which is now refused beside the error it pinned. Before and after:

    compile_err_equals=\                                      compile_err_equals=\
    ${STATIC_TESTS_DIR}/Compiled6.bx.fss:17:11-19:19:\n\      ${STATIC_TESTS_DIR}/Compiled6.bx.fss:17:11-19:19:\n\
    \ No such method ZZ32.foo.\n\                             \ No such method ZZ32.foo.\n\
    File Compiled6.bx.fss has 1 error.\n                      ${STATIC_TESTS_DIR}/Compiled6.bx.fss:17:28-30:\n\
                                                              \ Objects can only extend traits.\n\
                                                              File Compiled6.bx.fss has 2 errors.\n

The value it checks, 'No such method ZZ32.foo.', is kept; the second message is P-178's answer.

## The whole suites

- `ant testFast` on `b9aa895753`, once: `BUILD FAILED`, `Total time: 10 minutes 31 seconds`. Tracks (`ProjectFortress/TEST-RESULTS/fast-*`): compiler 1,739 tests, 1 failure; library 86, 0; othercompiler 263, 0; misc all 0; onelibrary 3, 0. The one failure: `compiler_tests/XXXGenericBesidePlainZZ32`, ' run ... Did not see expected failure', row 496's `ZZ32` spelling, which the one name repairs (its cast on the base's code is quoted above). It is promoted to `GenericBesidePlainZZ32` (`6465bd6678`) and passes (`junit.sh final`, above). No other test failed.
- `ant testSystem` on `b9aa895753`'s code, once: `BUILD SUCCESSFUL`, `Total time: 5 minutes 4 seconds`; shards 222, 216, 222 and 216 tests, 0 failures.

## Where the fix belongs and the precedent search

The place is the compiled path only: the prelude's text, the code generator's object classes (`CodeGen.forObjectDeclPrePass`, the map's row "object declarations", `explorations/coordinator/map/spec-to-implementation.md:223`), its naming (`NamingCzar`), its dispatch (`OverloadSet`) and the run time's value classes. Walk reads the one library, whose seven are value objects already (climb batch 31b; `Library/FortressLibrary.fss:846`), and none of its code changes. The precedent is the one library's form for the text, and for the code the planner's probe (`plan-33/PROBES.md`, sections 2 to 4), whose patch applied but for its hunk at the dotted call's receiver, where rung I's `castReceiver` now stands (`git apply --check`: 'patch failed: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7312'). The library's own way: the prelude's three other value-object shapes are `Infinity`, `NegativeInfinity` and `IndefiniteNumber` (`CompilerBuiltin.fsi:99-101`), objects without bodies; the one library declares the seven as `value object` with their bodies inside (`FortressLibrary.fss:846-949`), which is the form taken.

The ways the language and the record offer, with the one taken: (1) the seven as value objects over payload classes written by hand, the code generator writing each object's class (way C, form 2: taken); (2) the hand-written classes extending the objects' generated springboards (form 1: it needs the stub file, which form 2 lets go); (3) the classes written whole by the code generator, the payload a hidden field reached through an interface (form 3: the run time's Java would lose `instanceof FZZ32`); (4) the prelude's traits kept and given `comprises` clauses or kept open (no: P-37 calls the prelude a bootstrap to remove, and the brief allows no stopgap that compiles them as traits).

## What the specification settles

`Specification/basic/types-vals-vars.tex:285-288`: an object trait type cannot be extended and excludes every type that is not its supertype. So `object MyNum extends ZZ32` is refused (the checker's 'Invalid type in extends clause: ZZ32'), an overloading at `ZZ32` beside one at a program's trait is valid (`advanced/overloading.tex`, "Incompatibility Rule"), and a value of an object type is a value of each trait it extends at run time, also inside a function type's result (the `toNumber` assertions). The specification is silent on whether a `typecase` clause that the selector's type excludes is a static error (`basic/expressions/typecase.tex`, "Typecase Expressions", whose note declines a static error for a clause after a more specific one); that is NEW-N-2.

## Programs run old against new

Each in `tmp/rung-number-payload-objects/explore/`, compiled and run with a fresh caches folder on the tree and through `old-fortress.sh` on the base:

- `SubRtti.fss` (a tuple `typecase` at `(Number, Number)` and `(Object, ZZ32)`, an arrow `typecase` at `(ZZ32 -> Number)` over a `ZZ32 -> ZZ32` closure): base 'pair of numbers', 'pair of numbers', 'pair of objects', 'arrow to Number'; the tree with the probe's RTTI (the payload class as the RTTI's class) printed 'other arrow' for the last, since `Number`'s RTTI class is not assignable from `FZZ32`, which extends only `FValue` (`compiler/runtimeValues/RTTI.java`, `runtimeSupertypeOf`); the final tree prints the base's four lines.
- `ArmBesideNumber.fss` (`typecase x of Shape => ...` for `x: ZZ32`, `Shape` a program's trait): base 'integer'; tree refused, 'The typecase clause, Shape, is unreachable.' (a reserved point, below); walk 'integer'.
- `TupleAtAny.fss` (`f((k, k))` for `f(x: Any)`): base and tree alike, 'Error trying to close method scope.'; walk 'ok' (NEW-N-1).
- Row 566's and row 496's programs, row 866's and `NumberObjectsCompiled`: above.

## Reserved points

- **A model line:** none. The change edits no line of microGPT or of its helper files.
- **A team test changed:** `ProjectFortress/compiler_tests/XXX6bx.test:13-19`, before and after above.
- **A program that ran and is now refused, beyond row 866's form:** a `typecase` clause at a type that a payload object excludes, over a selector of that payload object's type, is now unreachable to the checker: `ArmBesideNumber.fss` compiled and printed 'integer' on the base, and is refused on the tree; gated by `XXXTypecaseArmExcludedRefused.test` (today's behaviour) and recorded as NEW-N-2, since the specification does not decide it. Every other program of the gated suites that ran still runs (the tracks above). A trait or object of a program below one of the seven is row 866's form.

## The one library's seven (fork N4, a point to report)

Not in this rung. Where their entries would go:

- `NamingCzar.payloadObjects` (`NamingCzar.java:614-622`): seven rows, `{ "FortressLibrary", "ZZ32", ...FZZ32, "I" }` and the like for `ZZ64`, `ZZ`, `NN64`, `RR64`, and `{ "FortressBuiltin", "NN32", ... }`, `{ "FortressBuiltin", "RR32", ... }`. The lookups read the selected library already (`inSelectedLibrary`, `:625-627`).
- `LibraryNames.numberObjectClass` (`LibraryNames.java:30-32`): the names `fortress.FortressLibrary$ZZ32` (and `ZZ64`, `ZZ`, `NN64`, `RR64`) and `fortress.FortressBuiltin$NN32`, `fortress.FortressBuiltin$RR32` where `ONE_LIBRARY` holds, in place of none.
- The table of carried types (`NamingCzar.java:588-601`), keyed by `fortLib`, which is `FortressBuiltin` under the selector: the one library's five in `FortressLibrary` would need their own entries for their descriptors to name the payload classes; and the run's copy, `runtimeSystem/Naming.java:298-302`, keyed by `COMPILER_BUILTIN`.
- `CodeGen.forObjectDeclPrePass` needs nothing: it reads `payloadFor(name, thisApi())`. Walk needs nothing.

So under the selector nothing of form 2 is written for the one library, and a value made by Java code in a one-library run raises the names table's error; no program runs on the one library yet (row 1062).

## The two stages

Both on `6465bd6678`, whose code is `b9aa895753`'s, the final code; the commits after it add tests only.

- Count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-number-payload-objects/checker-count-postedit.txt tmp/rung-number-payload-objects/cc-post`, started 02:51:52, `EXIT=0`: `#total 0`, `#locations 0`, `#crash none`. `diff explorations/compile-ladder/climb-batch-33/gate/checker-count.txt tmp/rung-number-payload-objects/checker-count-postedit.txt` prints nothing.
- Distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-number-payload-objects/distance-postedit.txt tmp/rung-number-payload-objects/dist-post`, started 02:53:24, `EXIT=0`: `#total 0`, every `#kind` 0, `#crash none`, `#seconds 122 FortressLibrary 78`, `#shadow every shadow edit matched the tracked sources`. `explorations/coordinator/tools/distance/compare.sh` with the gate's `distance.txt` prints `DISTANCE SAME   0`. Its `errors.tsv` holds its header only, as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site moved.
- The shadow patch alone, `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress tmp/rung-number-payload-objects/shadow` (the arguments of `distance/run.sh:102`): 'shadow sources written to ...', exit 0, five shadows.

The edit changes no Scala of the checker and nothing the build generates for it, so the checker's time is not taken.

## The ladder subset

The baseline files whose first error names something the change touched, the reachability of a `typecase` clause at a number type (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`): `tests/typecaseTest.fss`, `typecaseBlockTest.fss`, `typecaseVarTest.fss`, `newlineTest.fss`. The drivers copied under `tmp/rung-number-payload-objects/ladder/` (`run-subset.sh`, `classify.py`), run after the edit: `phase counts: tests (4 files) typecheck 4`; each first error the baseline's, 'The typecase clause, ZZ32, is unreachable.' (three) and 'The typecase clause, (ZZ32, RR64), is unreachable.'. The gate's 85 do not include them; no file moved.

## Sentences of the specification made false

None. `grep -rn '866\|1003\b\|698'` over `Specification/` finds only line numbers of quoted originals (`appendices/changes.tex:1842`, `:5051`); `grep -rn "compiled path's own library\|compiler's own library"` finds 21 sentences of Appendix I (`changes.tex:393` to `:5722`), none of which says that the prelude's number types are traits or can be extended; `grep -rn -i 'IncompatibleClassChange\|open trait\|carrier\|FZZ32\|FRR64\|runtimeValues'` finds `changes.tex:4209` (a review's file name) and `:5294` (`FIntLiteral.java`), neither about this. The library chapters' callouts (`grep -n '\\revision{' basic-lib/*.tex`, 22) name the number types siblings under `Number`, which still holds. The text calls `\mathbb{Z}` "the trait" (`basic-lib/basic-integers.tex:105`); it says what the language declares, not what walk or the compiled path does, and P-178 already made it an object in the one library before this change.

Sentences of the skill that the change makes false, for the gather: `references/revival-changes.md`, "Numbers": "The compiler's prelude declares no `QQ`, and still declares the other seven as traits that a type can extend (row 1003). So the checker accepts such an object, and the object dies when its class loads (row 866)."; and `references/compiler.md`, the code generator's list, says nothing of payload objects.

## Decisions

1. **Form 2, as P-178's detail gives it**, over forms 1 and 3 and over a stopgap that compiles the seven as traits (above, "Where the fix belongs"); the evidence is the decision itself and the probe's two runs of the tracks (PROBES, section 3).
2. **A payload object's RTTI keeps the object's class as its `javaRep` and names its type by the payload class through a generated `className()`** (`CodeGen.java:6283-6292`). Ways not taken: the probe's RTTI over the payload class, which names the type rightly but puts it below none of its traits at run time ('other arrow' for `SubRtti.fss`, the base printing 'arrow to Number'); a change of `RTTI.runtimeSupertypeOf` that maps a payload class to its object's class (`RTTI` is loaded by the system loader, the payload and object classes by the class loader of the run, `runtimeSystem/InstantiatingClassloader.java:2973-2988`, so the map would go by names, in a file the rung does not name); payload classes that implement the traits (they would name generated interfaces again, and need the stub file).
3. **The names table follows the selector and holds no name for the one library** (fork N4): `numberObjectClass` answers none under the selector and a value made raises the table's error. Ways not taken: the probe's `fortress.FortressLibrary$` names, entries that no test can fail (`climb-batch-33-review.md`, B1); no reading of the selector at all, which would name the prelude's class in a one-library run.
4. **The selector is read as `WellKnownNames.compiledPathUsesOneLibrary`** (`LibraryNames.java:19`), as the brief names it. Way not taken: the probe's own read of the property and the variable, a second copy of S's rule.
5. **The object's class is found lazily**, in the nested `Make` and `RTTIc` classes, by `LibraryNames.factory` and `rtti`. Way not taken: the probe's static initialiser of the payload class, which fails the payload class's own initialisation wherever the object's class is missing, as in the misc track's JVM, whose class path holds no library jar (`build.xml:178-193`, `:1219`).
6. **The table of payload objects is keyed by the declaring api, a bare name read in the library that the compile reads.** Way not taken: the probe's test `api == WellKnownNames.fortressBuiltin()`, which under the selector is `FortressBuiltin` and would have written the one library's `NN32` and `RR32` over payload classes (against fork N4).
7. **One cast at the receiver**, `castReceiver`'s, to the object's class where the receiver's type is a payload object's, else to rung I's owner, in both branches of `forMethodInvocation`. Ways not taken: the probe's second `CHECKCAST` after the receiver, beside I's cast (two casts where they meet); a cast in the plain branch only, while the generic-method branch's finder call names the object's class too (`methodCall` from `emitFindGenericMethodClosure`, `CodeGen.java:7697`).
8. **The stub file's seven entries go**, as the brief asks; the probe kept them. Nothing else names them (`grep -rn 'CompilerBuiltin\.\(ZZ32\|ZZ64\|ZZ\|NN32\|NN64\|RR32\|RR64\)\b'` over `ProjectFortress/src` finds only the payload classes, which no longer name them).
9. **`ArrayStoreJUTest` boxes its own payloads**, `new FZZ32(i) {}` (`ArrayStoreJUTest.java:65-66`). Ways not taken: a fallback class inside `FZZ32.make` for a JVM without the library's jar (a second class for the type, two names again); the library's jars on the misc track's class path (`build.xml`, a file outside the rung).
10. **Row 566's test is promoted** (fork N5): it passes under both hash modes on the tree and fails under both on the base, with the two names in the failing cast. Way not taken: an expected failure kept with a note, which the fork gives only if one mode failed.
11. **Row 496's `ZZ32` test is promoted, and the row narrowed** to the `grab` form at a program's object, whose test `XXXGenericBesidePlainStatic` still fails as expected in the track. Way not taken: closing the row, which holds a second form.
12. **The refusal tests' form**: a plain component, an `XXX`-named `.test` with `compile` and `compile_err_contains`, as `NumeralTypeExtendedRefused` and the team's `XXX6bx` pin a refusal; the name `NumberTypeExtendRefusedCompiled` beside walk's `tests/NumberTypeExtendRefusedWalk.fss`. Way not taken: the old run-time pair with `REACHED`, whose link now fails.
13. **NEW-N-2 takes home 3**, a test of today's refusal and a `CONTESTED` row, since the specification does not decide whether an excluded clause is a static error. Ways not taken: home 2, an `XXX` test asserting that it compiles (the specification does not say so); no record (the brief's reserved point names it).
14. **The ladder subset is the four `typecase` files** whose baseline first error names a number type's clause reachability; the other files that name a number type in a type mismatch do not reach what changed.

## Defects and their homes

- Row 866, a program's object below `ZZ32` compiles and dies: home 1, `XXXNumberTypeExtendRefusedCompiled.test` (the refusal), at `CompilerBuiltin.fsi:210`.
- Row 1003, the prelude's open number traits: home 1, `NumberObjectsCompiled.test` and `XXXNumberTypeExtendRefusedCompiled.test`.
- Row 698, an overloading at `ZZ32` beside a program's trait refused: home 1, `OverloadZZ32BesideUserTraitCompiled.test`.
- Row 566, the dispatch's cast to `V⟦fortress|CompilerBuiltin%ZZ32⟧`: home 1, `ComprisesMeetGenericTrait.test`.
- Row 496's `ZZ32` spelling, the cast to `Tag⟦fortress|CompilerBuiltin%ZZ32⟧`: home 1, `GenericBesidePlainZZ32.test`; the row's other form stays home 2, `XXXGenericBesidePlainStatic.test`.
- Row 995 for the seven number types: home 1 through the two tests above; for the other carried types it stays open, reproducer none.
- The probe's RTTI, below none of a payload object's traits at run time (never landed): home 1, the `toNumber` assertions of `NumberObjectsCompiled.fss`.
- NEW-N-1, a tuple expression at a parameter of type `Any` stops the code generator: home 2, `XXXTupleArgumentAtAnyCompiled.test`.
- NEW-N-2, an excluded `typecase` clause refused as unreachable: home 3, `XXXTypecaseArmExcludedRefused.test` and the row.

## Points to report reached

- The design as built and each place that names a payload object's type: the two sections above.
- Rows 866's and 698's tests promoted, `XXX6bx` with its second message, row 566's test under two hash modes and promoted, row 496's `ZZ32` test promoted; each new test seen failing on the base where it can, `NumberObjectsCompiled` a guard.
- The whole tracks and walk's suite: one test failed after the change, `XXXGenericBesidePlainZZ32`, repaired by it.
- The one library's seven left out, with each place where their entries would go.
- The two stages' tables equal to the comparand's.
- No sentence of the specification or of Appendix I's Effects made false.
- No model line.
- Files edited beyond those named: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ArrayStoreJUTest.java:65-66`; the tests of rows 496 and NEW-N-1 and NEW-N-2 (`GenericBesidePlainZZ32*`, `XXXTupleArgumentAtAnyCompiled*`, `TypecaseArmExcludedRefused.fss`, `XXXTypecaseArmExcludedRefused.test`).
- A program that ran and is now refused beyond row 866's form: `ArmBesideNumber.fss`, NEW-N-2.

## For FACTS

See `record.md`, "For FACTS".

## Commands worked out

- Row 566's program under a second hash mode, compile and run by hand, since `junit.sh` sets its own `JAVA_FLAGS` (`junit.sh:20`): `JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp -XX:+UnlockExperimentalVMOptions -XX:hashCode=0" FORTRESS_CACHES=<fresh copy> bin/fortress compile F.fss`, then `bin/fortress run C`; the base's the same through `old-fortress.sh <base> <fresh folder> compile|run`.
- The shadow patch alone takes the source root `ProjectFortress/src/com/sun/fortress`, as `distance/run.sh:102` passes it; with `ProjectFortress/src` it stops on a missing file.
