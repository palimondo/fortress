<!-- Probe of review-queue item 340, 2026-11-02, an Opus worker in a worktree seeded from climb batch 25's base build (dc571c1f3, climb batch 24's code): whether walk's native loader can tell the library's own FlatString from a program's object of the same name by its declaration rather than its name; its returned text word for word (the harness refused the worker's own write of this file); its patch shadow.patch beside it, commit 462460e68 on wip/probe-item-340. -->

# Probe of review-queue item 340: walk's loader told the library's `FlatString` by its declaration

- **Question.** Can walk's native loader tell the library's own `FlatString` (`Library/FlatString.fss:34`) from a program's object of the same name by the declaration itself? The aim is that a helper bound in a method of the library's `FlatString` loads with `self` carried as a Java `String`, while a program's own `object FlatString` with such a binding is still refused at load. Sources: review-queue item 340, `explorations/coordinator/review-queue.md:252-258`; PLAN item 63.
- **Answer.** Yes. The type's own environment records the component that declares it, and the linker gives one component to a name. So the loader can ask "is this the object `FlatString` of the component `FlatString`?" without reading the source path and without depending on the order of loading. The shadow adds 44 lines in one file and changes one line in a second. With `FlatString`'s `size` moved onto a helper, every gating test passes, `ant testSystem` passes with 724 tests, and a program's own `object FlatString` is still refused with the same message.
- **Base.** `dc571c1f3`, whose Fortress code is climb batch 24's.
- **Branch and worktree.** Branch `wip/probe-item-340`. Worktree `/home/user/fortress-probe340`, seeded by `seed-worktree.sh` from `/home/user/fortress-base25` ("seeded from /home/user/fortress-base25 (dc571c1f3) in 21 s").
- **The patch.** `explorations/perf-probes/loader-declaring-type/shadow.patch` (commit `462460e68`). `git -C /home/user/fortress-base25 apply --check` exits 0, so it applies on the base. It holds three things:
  - the loader change, in `interpreter/glue/StaticNativeApp.java` and `interpreter/glue/NativeApp.java`;
  - the moved binding, `Library/FlatString.fss:35-36`;
  - one new test, `ProjectFortress/tests/NativeHelperCarriedSelfFlatStringWalk.fss`.

  The commit edits nothing of the original tree.

## 1. Terms

- **The loader** is walk's code that reads a `builtinPrimitive("…")` body and finds the Java method it names. It is `NativeApp.checkAndLoadNative` (`interpreter/glue/NativeApp.java:168-229`) and, for a helper, `StaticNativeApp.find` (`interpreter/glue/StaticNativeApp.java:112-160`).
  - Paths without a prefix are under `ProjectFortress/src/com/sun/fortress/`.
  - Line numbers are the base's unless a line says "in the shadow".
- **A helper** is a public static method of a class under `nativeHelpers/`, such as `simpleConcatenate.nativeStrlen(String): int`.
- **A glue class** is a class under `interpreter/glue/prim/` that takes walk's boxed values, such as `FlatString$Size`.
- **The carrier of `self`** is the Java type in which the loader passes a method's `self` to a helper.
  - On the base, `javaForSelf` (`StaticNativeApp.java:87-95`) gives it from the declaring type's name. It covers fifteen names that no program can give its own types, and gives none for `FlatString` and `JavaString` (`:88`).
  - A binding in a type with no carrier is refused at load with "Native helper …: no Java type carries T, the type of self." (`:137-141`).
- **The declaring type** is the trait or object whose body holds the method.
  - The closures hand it to the loader as an `FType`, walk's run-time type object: `MethodClosure` passes its `definer`, and `FunctionalMethod` passes its self type.
  - On the base, `NativeApp.java:201` passes only the type's name to `find`.
- **A code state** is the code as one edit leaves it. The probe measured four:
  - **S0**, the base;
  - **S1**, `FlatString`'s `getter size()` moved from the glue class `FlatString$Size` to `com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen`, on the base's loader;
  - **S2**, the shadow's loader with the base's library;
  - **S3**, the shadow's loader with S1's library. This is the patch.

## 2. The ways the interpreter's code offers

Each way identifies the declaring type through something that the loader can reach from the `FType` the closures already pass.
- Way 1 was built.
- Ways 2, 4 and 5 were measured by a temporary diagnostic (section 5.5).
- Ways 3, 6, 7 and 8 were read in the code, not run.

### Way 1: the declaring component, read from the top level of the type's environment (built)

**What it reads.**
- `FTraitOrObjectOrGeneric.getWithin()` (`interpreter/evaluator/types/FTraitOrObjectOrGeneric.java:60-62`), the environment in which the type was built.
- That environment's top level is the component's own environment. `CUWrapper` makes it as `new BetterEnvLevelZero(comp)`, with the component node as its location (`interpreter/env/CUWrapper.java:120-121`).
- `BaseEnv.getAt()` answers that location (`interpreter/evaluator/BaseEnv.java:686-688`).
- `BetterEnvWithTopLevel.getTopLevel()` answers the top level of an inner environment (`interpreter/env/BetterEnvWithTopLevel.java:62-64`).

**Why it identifies the declaration.** The linker gives one component to a name:
- `commandLineComponent` puts the program's component under its own name and under each api it exports (`interpreter/Driver.java:495`, `:500`).
- `ensureApiImplemented` loads a component for an api's name only where no component holds that name yet (`:436-465`).

So in a run, a component's name and a type's name within it identify one declaration. The specification states the same rule: "Every component has a unique name, used for the purposes of component linking", and "A fortress does not allow the installation of distinct components with the same name." (`Specification/basic/components/apis.tex:191-192`, `:210-211`, "Component and API Identity").

**What it touches.**
- `StaticNativeApp.java`: two new methods, `javaForSelf(FType)` and `declaringComponent(FType)`, and `find` takes the `FType`.
- One line of `NativeApp.java:201`.
- No phase, no syntax tree and no other file.

**What it costs.**
- Lines: 44 added and 4 changed in `StaticNativeApp.java`, and 1 changed in `NativeApp.java` (`git diff --numstat`).
- Work at load: one comparison of the type's name for each helper binding in a method. For a type named `FlatString`, also a walk to the top-level environment and one more comparison. No timing was taken, because the skill forbids walk timings.
- Dependences: it does not read the source path. The environment is set when the type is built, before any of its methods' closures, so it does not depend on the order of loading.

**A trap, measured.** The environment that a type holds changes during loading. `finishObjectTrait` replaces an object's environment with one extended at its declaration (`interpreter/evaluator/BuildEnvironments.java:1037`, `:1042`).
- When the program's object's closure was made, its environment was still the component's top level: `env=BetterEnvLevelZero top=true … topLevel.at=Component:OwnFlatStringSize`.
- When the library `FlatString`'s closure was made, its environment was already the extended one: `env=BetterEnvWithTopLevel top=false at=ObjectDecl:…/Library/FlatString.fss:34:1-156:13 topLevel.at=Component:FlatString`.
- The first form of the shadow read the location of the environment itself, so for the library's `FlatString` it found no component (`way1.component=null`).
- The built form reads the location of the environment's top level, which is the component in both cases.

### Way 2: the declaration's source file

**What it reads.** `NodeUtil.getSpan(getDecl()).getFileName()` (`FTraitOrObjectOrGeneric.java:64-66`; `nodes_util/Span.java:90-91`), compared with the library's file.

**Measured.**
- From the tree's root it gave `/home/user/fortress-probe340/Library/FlatString.fss`.
- From a directory holding a copy of `FlatString.fss`, which the source path searches first, it gave `.../tmp/probe/shadowdir/FlatString.fss`.

**What it costs.** It is as cheap as way 1, but it depends on the path: on where the tree is and on a shadowing copy. The cached trees also hold the absolute path, which is why `seed-worktree.sh` rewrites them. Compared by base name only, it says no more than way 1, since a component's file is named for the component.

### Way 3: the declaration node against the library component's tree

**What it reads.** `Driver.components` (`Driver.java:69`, filled at `:177`). The loader would find the wrapper named `FlatString`, take its `ObjectDecl` `FlatString`, and compare it by reference with `getDecl()`.

**What it costs.**
- A scan of the components at each such load.
- A new accessor, because the field is `protected` and in another package.
- A dependence on the wrapper keeping the very node after walk's rewrite of the tree.
- It trusts the same thing as way 1, the component's name.

Read, not built.

### Way 4: the type against the api's binding, as `FortressLibrary` imports it

**What it reads.** `Driver.getFortressLibrary()` (`Driver.java:66-67`), then `.getApiNull("FlatString")`, which exists because `FortressLibrary` imports the api (`Library/FortressLibrary.fss:15`). Then `.getTypeNull("FlatString")`, compared with the declaring type by identity.

**Measured.**
- For the library's `FlatString` the lookup returned the declaring type itself (`way4.apiViaLibrary=same`), also from a shadowing directory.
- It is not reachable from the library component's own environment (`way4.apiViaOwnEnv=noapi`).
- A program's object is never that type.

**What it costs.** Two lookups, plus three dependences that way 1 does not have:
- the static library pointer, set at `Driver.java:153`;
- `FortressLibrary`'s import of the api;
- the moment of loading: the api environments are filled when the components are populated (`Driver.java:216-222`), before the types' methods are made (`:224-232`). It held for the closures measured here.

It is the strongest identity, a reference comparison of `FType`s.

### Way 5: `FortressLibrary`'s own binding of the name

**What it reads.** `Driver.getFortressLibrary().getTypeNull("FlatString")`.

**Measured.** It found no type at that moment (`way5.FortressLibraryBinds=null`), for both the library's `FlatString` and the program's. So this way would refuse the library's own binding, and rung W's concern about the order of loading holds for it.

### Way 6: the declaring component's `native` flag

**What it reads.** `Component.is_native()` of the node that way 1 reaches. The library's component is `native component FlatString` (`Library/FlatString.fss:12`).

**What it costs.** Nothing beyond way 1, but on its own it identifies nothing:
- The grammar allows `native` before any component (`parser/Compilation.rats:98`, `:121`).
- A native component with `package="com.sun.fortress.interpreter.glue.prim"` gets that package's glue classes by its objects' names (`interpreter/evaluator/BuildNativeEnvironment.java:42-56`).

It could be added to way 1 as a second condition. Not built.

### Way 7: reserve the name `FlatString`, as `FortressLibrary`'s type names are reserved

This is not a way by declaration. The disambiguator would refuse a program's own type named `FlatString`, as it refuses `Index` ("Type name may refer to: …"). It changes a phase that both paths run, and every program that names a type `FlatString`. Not built.

### Way 8: a mark on the library's components

The driver has no notion of which components are the library's. The library's components and the program's are found by the same search path and held in one list (`Driver.java:172-184`). A mark would need a rule about which files belong to the library, which is way 2 again. Not built.

## 3. The way built, and why

I built way 1. It is the only way that is at once local to the loader, independent of the source path and independent of the order of loading. It rests on the specification's own rule for components: each has a unique name. The other ways fall short:
- Way 4 is the strongest identity, but it leans on three facts outside the loader.
- Way 2 depends on the path.
- Way 3 costs a scan and a new accessor for the same trust as way 1.
- Way 5 does not work at load.
- Ways 6 to 8 do not identify the declaration.

The shadow's code (`StaticNativeApp.java:102-136` in the shadow):

    static Class<?> javaForSelf(FType t) {
        String n = t.getName();
        if (n != null && n.equals("FlatString"))
            return FLAT_STRING_COMPONENT.equals(declaringComponent(t)) ? String.class : null;
        return javaForSelf(n);
    }
    static String declaringComponent(FType t) {
        if (!(t instanceof FTraitOrObjectOrGeneric)) return null;
        Environment e = ((FTraitOrObjectOrGeneric) t).getWithin();
        if (e == null) return null;
        try {
            HasAt at = (e.isTopLevel() ? e : e.getTopLevel()).getAt();
            return at instanceof Component ? NodeUtil.nameString(((Component) at).getName()) : null;
        } catch (RuntimeException x) { return null; }   // an environment with no top level
    }

- `javaForSelf(String)`, the table by name, is unchanged. So `JavaString` still carries no `self`: walk's library declares no `JavaString` (only `CompilerBuiltin.fsi:52` does).
- The refusal message is unchanged and still names the type (`StaticNativeApp.java:181` in the shadow).

**The moved binding** is `size`, because every program reaches it: `||` reads `self.size` (`Library/FlatString.fss:123`, `:134`), and so does `javaSubstr(lo)` (`:91`). Its helper `nativeStrlen` answers `s.length()`, as `FlatString$Size` does (`interpreter/glue/prim/FlatString.java:124-129`). No helper had to be added.

## 4. The programs

**The gating tests: 25 programs, one harness call per code state.**
- the 21 `ProjectFortress/tests/NativeHelper*Walk.fss`, with their 9 `.test` files;
- `StringPieces.fss`, `StringConcatenationFamiliesWalk.fss` and `StringMembersPromisedWalk.fss`;
- the new test.

The command for each code state:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h-<state> ProjectFortress/tests/NativeHelper*Walk.* \
      ProjectFortress/tests/StringPieces.fss ProjectFortress/tests/StringConcatenationFamiliesWalk.fss ProjectFortress/tests/StringMembersPromisedWalk.fss

**The new test,** `NativeHelperCarriedSelfFlatStringWalk.fss`, written before the shadow was built. It asserts these sizes:
- `""`, and `"hello"` both by `.size` and by `|self|`;
- the flat form of a forty-character concatenation;
- `javaSubstr(1)` of `"hello"`;
- a flat concatenation;
- `"été"`.

It prints `FlatString sizes: 0 5 5 40`.

**My own programs,** run with `bin/fortress` from the tree's root. They are scratch, not committed.
- **OwnFlatStringSize:**

      component OwnFlatStringSize
      export Executable
      object FlatString
        getter size(): ZZ32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen")
        opr |self| : ZZ32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen")
      end
      run():() = do println("before"); println(FlatString.size); println(|FlatString|) end
      end

- **OwnFlatStringParam and OwnJavaStringParam:** `object FlatString end` (or `JavaString`) and `slen(x: FlatString): ZZ32 = builtinPrimitive("…simpleConcatenate.nativeStrlen")`, run as `println("before"); println(slen(FlatString))`.
- **The name clash:** `component FlatString export Executable` in `tmp/probe/hole/FlatString.fss`, with `object FlatString` and `len(): ZZ32` bound to `nativeStrlen`. This is the only way left for a program to pass way 1's check without replacing the library.
- **The api claim:** `component OwnExportsFlatString export { FlatString, Executable }`, with `lineSeparator`, `object FlatString` and `len()` bound to `nativeStrlen`.

## 5. The measurements, before and after

All runs: `nproc` 4, OpenJDK 25.0.4.1. The harness runs at four threads; direct runs at one. Each harness run started with an empty cache.

### 5.1 The 25 gating tests

| Code state | Verdict |
|---|---|
| S0 | `OK (25 tests)` (09:20:09 UTC) |
| S1 | `Tests run: 25,  Failures: 20,  Errors: 0` (09:21:53 UTC) |
| S2 | `OK (25 tests)` (09:29:07 UTC) |
| S3 | `OK (25 tests)` (09:27:49 UTC) |

On S1 every program stops at load on the library's own binding, which is what item 340 predicts:

    com.sun.fortress.exceptions.InterpreterBug: Library/FlatString.fss:35:5-36:89:
    Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries FlatString, the type of self.

- **The five tests that pass on S1** are refusal tests whose key the library's refusal also satisfies, or whose own refusal comes first: `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelfFunctionalWalk` and `NativeHelperUncarriedSelfFlatStringWalk`.
- **The other four refusal tests fail on S1** with "Refused at load, but did not satisfy load_exception_contains".

On S3:

    . interpret tmp/h-s3/tests/NativeHelperCarriedSelfFlatStringWalk
    FlatString sizes: 0 5 5 40
     OK (time = 561ms)
    . interpret tmp/h-s3/tests/NativeHelperUncarriedSelfFlatStringWalk
     OK Saw expected refusal at load

### 5.2 My own programs

| Program | S0 | S1 | S2 | S3 |
|---|---|---|---|---|
| OwnFlatStringSize | refused at load: "… no Java type carries FlatString, the type of self.", rc=1 | refused by the library's binding, rc=1 | refused by its own binding, rc=1 | refused by its own binding (`OwnFlatStringSize.fss:6:3-103`), rc=1 |
| OwnFlatStringParam | `before`, `10`, rc=0 | refused by the library's binding | `before`, `10`, rc=0 | `before`, `10`, rc=0 |
| OwnJavaStringParam | `before`, `10`, rc=0 (via `old-fortress.sh`) | not run | `before`, `10`, rc=0 | `before`, `10`, rc=0 |
| name clash | `NullPointerException`, rc=1 | same | same | same |
| api claim | "Failed to find overload member \|\| for _RewriteFnOverloadDecl at …/Library/String.fss:579.35", rc=1 | same | same | same |

The two ways for a program to pass way 1's check both stop the run before any closure loads:
- **A component named `FlatString`** takes the library component's name in the linker. The library's `String` then finds no api `FlatString` to import. The message is "Cannot invoke "com.sun.fortress.interpreter.env.APIWrapper.getTopLevelRewriteNames()" because "api_cw" is null", at `Driver.java:315`.
- **A program that claims api `FlatString`** replaces the library's component. The library's `String` then fails on the program's object, which has no `||`.

A program that replaced the component completely, natives and all, would be a copy of the library's file. Any run can already put such a copy in its current directory.

### 5.3 A shadowing copy of the library's file

On S3, the new test run from `tmp/probe/shadowdir/`, which holds a copy of `Library/FlatString.fss`, printed `FlatString sizes: 0 5 5 40` with rc=0. Way 1 holds wherever the file is read from. Way 2 would have refused this run.

### 5.4 The wider runs

The skill asks for both of these after an edit of walk's Java and of the library (`references/tests-running.md`). Both ran on S3.

    ant testSystem
    [junit] Tests run: 179, Failures: 0, Errors: 0   (system-0)
    [junit] Tests run: 180, Failures: 0, Errors: 0   (system-1)
    [junit] Tests run: 183, Failures: 0, Errors: 0   (system-2)
    [junit] Tests run: 182, Failures: 0, Errors: 0   (system-3)
    BUILD SUCCESSFUL / Total time: 4 minutes 10 seconds

That is 724 tests: climb batch 24's gate's 723 (`explorations/compile-ladder/climb-batch-24/gate/summary.txt`) plus the new test.

    bash tmp/run-demos.sh tmp/demos      (the driver of rung-team-demos/REPORT.md, "Commands worked out")
    demos: 52 run, 52 reached their end

**Not run:**
- The compiled tracks, which the shadow does not reach.
- The distance stage, the only stage that checks a binding of the component `FlatString` against its helper. By reading, the F-298 rewrite makes the moved binding `nativeStrlen(self)` with `self` a `FlatString`, which extends `String`, so it should type. This is not measured.

### 5.5 The diagnostic

The diagnostic was a temporary print in `javaForSelf(FType)`, active under `-Dfortress.probe340=true`, in a build of its own. It was removed before S2, S3 and the wider runs.

    probe340 declarer=FlatString way1.component=OwnFlatStringSize way2.file=…/tmp/probe/OwnFlatStringSize.fss way5.FortressLibraryBinds=null way4.apiViaLibrary=noapi way4.apiViaOwnEnv=noapi env=BetterEnvLevelZero top=true … topLevel.at=Component:OwnFlatStringSize sameTop=true
    probe340 declarer=FlatString way1.component=null way2.file=…/Library/FlatString.fss way5.FortressLibraryBinds=null way4.apiViaLibrary=same way4.apiViaOwnEnv=noapi env=BetterEnvWithTopLevel top=false at=ObjectDecl:…/Library/FlatString.fss:34:1-156:13 topLevel.at=Component:FlatString sameTop=false

- `way1.component` is the first form of way 1, which read the environment's own location.
- `topLevel.at` is what the built form reads.

## 6. The defects met

1. **A parameter declared at a program's own `FlatString` or `JavaString` is carried by its name.**
   - Mechanism: `javaFor` carries a parameter's declared type by its name (`StaticNativeApp.java:54`). `unbox` takes `v.getString()` (`:231`), which `FObject.getString` answers with the type's name (`FObject.java:33-35`).
   - Effect: `slen(x: FlatString)` answers 10 on S0, S2 and S3. It is row 847's symptom on a parameter instead of `self`.
   - Not repaired by the shadow. Way 1 could repair it by resolving the parameter's declared type in the declaration's environment; that cost is not measured.
   - Home: 3, or 2 if the curator reads the printed `builtinPrimitive` comment ("the one whose Java parameter and result types carry the declared types", `FortressBuiltin.fsi:19`) as settling it.
   - Row (passes `ledger.py check --rows` except for its `?` number):

       | ? | under walk, a `builtinPrimitive` helper binding with a parameter declared at a program's own type named `FlatString` or `JavaString` loads, and its call passes the type's name: `slen(x: FlatString): ZZ32` bound to `simpleConcatenate.nativeStrlen`, beside `object FlatString end`, answers 10 | NEGATIVE-VERIFIED | implementation gap (walk) | `Specification/library/default-libraries.tex`, "FortressBuiltin" | none | probe of review-queue item 340 | siblings: 847, 846. `StaticNativeApp.javaFor` carries a parameter's declared type by its name, `FlatString` and `JavaString` in `String` (`interpreter/glue/StaticNativeApp.java:54`, at dc571c1f3); `unbox` takes `v.getString()` (`:231`), which `FObject.getString` answers with the type's name (`interpreter/evaluator/values/FObject.java:33-35`). Probe in `explorations/perf-probes/loader-declaring-type/REPORT.md`, section 4: prints 'before', '10', rc=0, on the base and on the shadow; the same with `object JavaString`. Fix: read the parameter's type by its declaration, as the probe's way 1 reads `self`'s. |

2. **A program whose component has a library component's name stops with a `NullPointerException`.**
   - The specification forbids two components with one name. Walk gives no refusal that names the clash; it crashes at `Driver.java:315`.
   - This is the clash that keeps way 1 sound, but its message names nothing.
   - Home: 2 or 3.
   - Row (passes the check except for its `?` number):

       | ? | under walk, a program whose component has the name of a library component, as `component FlatString export Executable`, stops with a `NullPointerException` in the linker, not with a refusal that names the clash | NEGATIVE-VERIFIED | implementation gap (walk) | `Specification/basic/components/apis.tex`, "Component and API Identity" | none | probe of review-queue item 340 | "Every component has a unique name, used for the purposes of component linking" and "A fortress does not allow the installation of distinct components with the same name." `commandLineComponent` gives the program's wrapper the name (`interpreter/Driver.java:495`, at dc571c1f3), so `ensureApiImplemented` returns it for the library's import of api `FlatString` (`:436-437`), and `injectTraitMembersForDesugaring` finds no exported api of that name (`:315`): 'Cannot invoke "com.sun.fortress.interpreter.env.APIWrapper.getTopLevelRewriteNames()" because "api_cw" is null', rc=1. Probe: the report `explorations/perf-probes/loader-declaring-type/REPORT.md`, section 4. Workaround: another name. |

3. **`NativeHelperUncarriedSelfFlatStringWalk`'s key is the exact text of the library's own refusal.**
   - So on S1 the test passed although the refusal was the library's.
   - It is sound on S0 and S3, where the library's binding loads.
   - It is a weakness of the test, so no row. A batch that moves the binding could name, in that test, a helper that no library binding uses, such as `nativeConcatenate`.

4. **Way 5 does not see the library's type at load.** This is not a defect of the tree, since the tree does not use that lookup.

The shadow itself showed no defect.

## 7. Decisions

1. **Way 1 built** (section 3). The closest alternative is way 4. It could be added to way 1 as a second condition, at the cost of its three dependences.
2. **`JavaString` stays refused by its name.** Walk's library has no declaration of that name.
3. **The binding moved is `size`, onto `nativeStrlen`.** The alternatives, and what each would need:
   - `|self|` onto the same helper;
   - `cmp` onto `stringOps.compareTo`;
   - `flatConcat` onto `simpleConcatenate.nativeConcatenate`;
   - `javaSubstr` onto `stringOps.substring`. Its `Useful.substring` clamps bounds where the glue class's `String.substring` throws (`useful/Useful.java:974-982`; `glue/prim/FlatString.java:152-157`), so that move changes the value of an out-of-range call.
4. **The top level of the environment, not the environment itself, gives the component** (the trap in section 2).
5. **One new gated test in the patch.** The existing refusal test is unchanged.
6. **The `native` flag is not checked.** The component's name suffices by the linker's rule.
7. **The distance stage is not run.**

## 8. Sentences the shadow would make false if it landed

- `.claude/skills/fortress-repo/references/interpreter.md:99` and `:102`: "except `FlatString`, `JavaString` and `()`", and "So a binding in a method of the library's `FlatString` cannot name a helper yet: every program would stop at load."
- `explorations/coordinator/FACTS.md:134`, F-299: "`FlatString` and `JavaString` carry no `self` … a helper binding of a `FlatString` method would stop every program at load."
- `Specification/appendices/changes.tex:4503-4507`: "…which it reads by the type's name, for the types of \library\ whose names no program can give its own types." This would stay true but become incomplete.
- `StaticNativeApp.java:81-86`, the comment of `javaForSelf`, which the shadow rewrites.

## 9. For FACTS

1. **Walk can identify a type's declaring component from the top level of the type's environment.**
   - The fact: the top level's location is the component node (`CUWrapper.java:120-121`, `BaseEnv.java:686-688`), and the linker gives one component to a name (`Driver.java:436-465`, `:495`, `:500`).
   - What it means: `FlatString`'s five bindings can move onto helpers with a 45-line loader change, while a program's own `object FlatString` is still refused.
   - Evidence: sections 5.1 and 5.2, S3.
2. **A parameter declared at a program's own `FlatString` or `JavaString` reaches a helper as its type's name.**
   - What it means: the parameter carry has the weakness that rung W removed from `self`.
   - Evidence: section 5.2, `10`.
3. **At load, the library's types are reachable through `FortressLibrary`'s api environment, not under their plain names at its top level.**
   - Evidence: section 5.5.

## 10. Commands

- **A library file read from elsewhere:** copy it with the program into a scratch directory, and run `../../../bin/fortress Program.fss` from there.
- **The crash site of a load failure:** `bin/fortress -debug stacktrace P.fss 2>&1 | sed -n '/Caused by/,+3p'`.

## 11. For the curator: a decision not taken

**Question (item 340).** Before `FlatString`'s five bindings (`size`, `|self|`, `cmp`, `javaSubstr`, `flatConcat`) move onto helpers: should walk's loader identify the declaring type of a method by its declaration rather than by its name?

**Sources.**
- The revival's printed `builtinPrimitive` comment of 2026 (`FortressBuiltin.fsi:14-29`, typeset at `Specification/library/default-libraries.tex:37-39`): the interpreter takes "the one whose Java parameter and result types carry the declared types, %self% first".
- The Working Draft's "Component and API Identity" (`Specification/basic/components/apis.tex:181-215`): component names are unique and component equivalence is nominal.
- Neither is a late position of the type group, and no later work speaks to walk's loader.
- Rung W's decision 3 (`rung-natives-self/REPORT.md`, "Decisions").

**The solutions.**
1. **Keep the reading by name.** The five stay on glue classes, which the compiled path cannot run after the switch-over (F-32). This keeps the current behaviour.
2. **Way 1, as built here.** 45 lines in `interpreter/glue/`. The five can move. Measured on `size` with 25 gating tests, 724 system tests and the 52 demos.
3. **Way 1 plus way 4 as a second condition.** A stronger identity, but it depends on the moment of loading and on `FortressLibrary`'s import of the api.
4. **Way 1 extended to parameters.** This also repairs defect 1; its cost is not measured.

**Default: solution 2.**
- It is the smallest change that lets the five move.
- It is reversible, it stays in one area (walk's natives), and it changes no decision of the curator.
- It rests on the specification's own rule for components.

Defect 1 then goes to its own row, to be repaired by solution 4 or left at home 3.
