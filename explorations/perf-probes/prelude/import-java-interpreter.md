<!-- Whether the interpreter can bind a native through `import java`, the compiler world's
mechanism, so that one binding file could serve both worlds. Written 2026-09-20 by a delegated
worker on the question parked as step 2(c) of `coordinator/library-route-judgement.md`. Every
claim is a file:line read in the tree or a captured run; the captures and the five probe
programs are in `import-java-interpreter/`, and `run-all.sh` there is every command in order.
Nothing tracked was modified: the runs used a private `FORTRESS_CACHES` outside
`default_repository/`, `FORTRESS_THREADS=1`, and no `ant`. -->

# `import java` on the interpreter path

## The question

`coordinator/library-route-judgement.md` §2 parks one half-session probe: *"a two-declaration
component bound with `import java`, run by the interpreter; decides the builtins' shape for
step 5."* Its ground is `coordinator/two-libraries.md` §2: `ForeignJava`, which reads a Java
class with ASM and synthesizes an api for it, lives in the shared `repository/` package and is
wired into the interpreter as well as the compiler — `interpreter/Driver.java:441`,
`interpreter/env/ForeignComponentWrapper.java:59`, `interpreter/env/ClosureMaker.java:64` — and
no file under `ProjectFortress/tests/` contains an `import java` line. `FACTS.md:73` records
this as *"`import java` also works on the interpreter path through `ForeignComponentWrapper` +
`ClosureMaker`; no test uses it (B.12)"*. The map is more careful: *"The interpreter's `import
java` route (`ClosureMaker`) was read but not exercised; no interpreter test uses it, so whether
it still works on this toolchain is unknown"* (`map/modules-and-phases.md:498`).

Exercised here for the first time. No earlier probe exists: `coordinator/INDEX.md` has no entry
for `import java`, `ForeignJava` or `ClosureMaker`, and the only `import java` program under
`explorations/` is rung 7's `compile-ladder/rung7/probes/p38.fss`, which was run on the compiled
path only (its walk comparisons were the precedence probes, `rung7/REPORT.md:88`).

## The answer

**No. One binding file cannot serve both worlds, and `import java` is not the direction that
could make it so.** Five programs, four gaps, each independent of the next and each in the
interpreter's half of the mechanism. The same five programs compile and run correctly on the
compiled path, which is the control.

The other direction was already closed: `builtinPrimitive` is declared only at
`FortressBuiltin.fsi:30`, nothing under `compiler/` or `codegen/` refers to it, and a component
that gives it a body compiles and then calls that body, the class-name string being inert data
(`perf-probes/prelude/REPORT.md` §3, `07-builtinprimitive-probe.out`). So neither mechanism
crosses. The builtins layer is per-world text whichever way it is written.

For step 2(c) that settles the shape: **one api with a builtin component per world**, not one
text with `import java` on both paths. And it makes live the question the judgement's step 5
already flagged for that shape — how a component is found for an api it does not share a name
with, `Linker.whoIsImplementingMyAPI` falling back to the api's own name at
`linker/Linker.java:72-76`, ledger row 320.

## Method

Host: JDK 25.0.4, tree at `1d148572a`, `source experiment/env.sh` (`FORTRESS_THREADS=1`,
`JAVA_FLAGS=-Xmx4g -Xss64m`). `FORTRESS_CACHES` pointed at a directory outside the repository,
which `bin/fortress_classpath`, `bin/run_classpath` and `ProjectProperties` all honour
(`fortress.caches` ← `FORTRESS_CACHES`, `ProjectProperties.java:261-283`); `default_repository/`
was not touched and `ant` was not run. `run-all.sh` in the capture directory is every command in
order, and re-running it reproduces every `.out` file named below.

Two helpers, as the brief asked: one over Java primitives and one over a Fortress value.
`nativeHelpers/simpleDoubleArith.java` has `public static double doubleAdd(double, double)`;
`nativeHelpers/equality.java` has `public static boolean sEquiv(fortress.AnyType.Any,
fortress.AnyType.Any)`. Six methods in the 25 `nativeHelpers/` classes are declared over a
Fortress type rather than a Java one: `equality.sEquiv`, `stringOps.asString` (`:38`), and the
four `simpleIntLiteralArith` arithmetic methods (`:35, :40, :45, :50`), which rung 7 wrote over
the generated interface `fortress.CompilerBuiltin.IntLiteral` (FACTS, 2026-09-17). Only
`sEquiv` names types that exist in both worlds — `AnyType` is the api the two preludes share,
and its result is a `boolean`; `asString` returns a `java.lang.String` and `IntLiteral` is
compiler-world only, so both would meet gap 1 below before anything else. Three more
programs isolate the gaps: `simplePrintln.nativePrintln(String)` for the `java.lang.String`
case, the same `sEquiv` call moved to the component's top level, and two `import java` lines
from one package.

## Results

| probe | binds | `fortress <f>.fss` (walk) | `compile` + `run` (control) |
|---|---|---|---|
| `ijPrintln.fss` | `simplePrintln.nativePrintln`, over `java.lang.String` | 2 errors, DISAMBIGUATE (`01`) | rc 0, prints `hello from a Java native` (`07`) |
| `ijDouble.fss` | `simpleDoubleArith.doubleAdd`, over `double` | 3 errors, DISAMBIGUATE (`02`) | rc 0, prints `5.0` (`07`) |
| `ijEquiv.fss` | `equality.sEquiv`, over `AnyType.Any` | `InterpreterBug` in the evaluator (`03`) | rc 0, prints `false` (`07`) |
| `ijEquivTop.fss` | the same, called at the component's top level | the same `InterpreterBug` (`04`) | rc 0, prints `false` (`07`) |
| `ijTwo.fss` | two `import java` lines from one package | `ClassCastException` in `Driver` (`10`) | rc 0, prints `false` (`07`) |

Nothing on the walk path printed a value. Every program parses, and in every run `ForeignJava`
read the named helper class with ASM and synthesized an api for it — the two DISAMBIGUATE
failures are errors *about* that synthesized api, not a refusal to read the class. Two of the
programs reached `ForeignComponentWrapper` and `ClosureMaker`, and `ClosureMaker` generated its
closure class and wrote it into the private cache (`05`). The failures are all past that.

## The four gaps, in the order a program meets them

### 1. The synthesized api names its types in the wrong world's api (DISAMBIGUATE)

`ForeignJava` types each synthesized declaration through
`NamingCzar.fortressTypeForForeignJavaType` (`NamingCzar.java:368-385`), whose table
(`:413`, filled at `:436-452`) qualifies every primitive type with `NamingCzar.fortLib` — a static field
initialized once, at class load, from `WellKnownNames.fortressBuiltin()`
(`NamingCzar.java:294-295`). In the compiler's world that is `CompilerBuiltin`, which declares
`ZZ32` (`CompilerBuiltin.fsi:210`), `RR64` (`:433`) and `JavaString` (`:52`). In the
interpreter's world it is `FortressBuiltin`, which declares none of them: they live in
`Library/FortressLibrary.fsi` (`RR64` at `:338`, `ZZ32` at `:464`, `ZZ64` at `:498`). So:

```
$ ./bin/fortress explorations/.../ijDouble.fss
Internally generated library name, in source code NamingCzar.:0:0:
    FortressBuiltin.JavaString is undefined.
    FortressBuiltin.RR64 is undefined.
    FortressBuiltin.ZZ64 is undefined.          (02-ijDouble-walk.out, rc 255)
```

`Boolean` is the accident that lets `ijEquiv` through: it happens to be declared in the builtin
api in both worlds (`FortressBuiltin.fsi:147`). `JavaString` is the hardest case — **it does not
exist anywhere in the interpreter's world**; `grep` over `Library/*.fsi`,
`LibraryBuiltin/FortressBuiltin.fsi` and `AnyType.fsi` finds no declaration. A helper over
`java.lang.String` therefore has no interpreter-world type to be given.

This is the same phenomenon as the four well-known types `Types.useCompilerLibraries()`
re-points between the two apis (`compiler/Types.java:72-83`), seen from the native side, and it
is the one gap that one library would close by itself.

### 2. A second `import java` from the same package crashes the linker (Driver)

`Driver.ensureApiImplemented` (`Driver.java:425-466`) builds a `ForeignComponentWrapper` for a
foreign api, puts it in the linker map and returns `null` (`:441-449`). On the **second** call
for the same api the map hit is non-null, the `if` is skipped, and the method falls through to
its last line — `return (ComponentWrapper) newwrapper;`, under the comment `// TODO temp hack
till we knit in natives properly.` (`:464-466`). `ForeignComponentWrapper` extends
`NonApiWrapper`, not `ComponentWrapper`:

```
Caused by: java.lang.ClassCastException: class ...ForeignComponentWrapper cannot be cast to
class ...ComponentWrapper
	at com.sun.fortress.interpreter.Driver.ensureApiImplemented(Driver.java:466)
	at com.sun.fortress.interpreter.Driver.ensureImportsImplemented(Driver.java:410)
	                                            (10-ijTwo-walk.out, rc 1)
```

This matters out of proportion to its size: `LibraryBuiltin/CompilerBuiltin.fss` writes
seventeen `import java` lines, all from `com.sun.fortress.nativeHelpers` (`:13, :17, :20, :25,
:75, :118, :155, :197, :227, :273, :275, :277, :283, :300, :307, :311, :336`). Any binding file
in that style is unloadable by the interpreter after its first import line.

It is also why `fortress -compiler-lib <file>.fss` — the switch that runs the interpreter's
phases over the compiler's prelude names (`Shell.java:1107-1110`, applied after `subMain`'s
`useInterpreterLibraries()` at `:478-483`), and the one configuration switch that could have
closed gap 1 — does not help. With the compiler prelude in scope, linking `CompilerBuiltin`
registers that foreign api first, so the user component's own single import line finds it in the
map and meets the cast: `ijEquiv.fss`, which reaches gap 3 in the interpreter's own world, dies
here instead (`09-compiler-lib-walk.out`, both programs, rc 1).

### 3. The imported foreign name is never rewritten, and the evaluator refuses it (evaluator)

`ijEquiv` gets past disambiguation and past `ForeignComponentWrapper.populateOne`
(`:48-85`), which for each synthesized `FnDecl` asks `ClosureMaker` for a closure and puts it in
the foreign environment (`:61-68`). The run then dies when the body evaluates the call:

```
equality?sEquiv(Lfortress/AnyType$Any;Lfortress/AnyType$Any;)Z
com.sun.fortress.exceptions.InterpreterBug: toplevel:
** bug! Non-top-level reference to imported com.sun.fortress.nativeHelpers.equality.sEquiv
                                            (03-ijEquiv-walk.out, rc 1)
```

(The first line is `ClosureMaker.java:99`'s own `System.err.println(md)`, left in the tree.)
The message is raised at `interpreter/evaluator/BaseEnv.java:531-533`: a name that still carries
an api qualifier is legal only at `TOP_LEVEL`. For an ordinary import, `Driver.java:291` injects
a rewrite taken from the exporting wrapper's rewrite map, so the reference in the body becomes
an unqualified local name; for a foreign import, `ForeignComponentWrapper.getRewrites()` returns
a map that is created empty at `:31` and never written to, under the constructor comment *"For
each name in the API, need to add something to getRewrites"* (`:38`) and the empty block *"Insert
code here to populate the environment from foreign code."* (`:54-56`). Moving the call to the
component's top level does not help — `ijEquivTop.fss` fails identically
(`04-ijEquivTop-walk.out`), so the depth check is not satisfied by a top-level variable
initializer either. The wrapper's other branch is empty too: a synthesized `TraitDecl` is bound
to a local and dropped (`:72-75`), so no Java class or interface can be imported at all.

Read, not proven: that populating the rewrite map is what would move this failure on. It cannot
be tested without editing Java, which this probe did not do.

### 4. The closure `ClosureMaker` writes calls a class that does not exist (codegen)

The closure was generated and written to the private cache. What it contains:

```
public class native.com.sun.fortress.nativeHelpers.equality$$closure
        extends com.sun.fortress.interpreter.glue.NativeFn2 {
  protected FValue applyToArgs(FValue, FValue);
      0: aload_1
      1: aload_2
      2: invokestatic  native/com/sun/fortress/nativeHelpers/equality.sEquiv:
                       (Lcom/.../FValue;Lcom/.../FValue;)Lcom/.../FValue;
      5: areturn
}                                               (05-closure-disasm.out)
```

Three things are wrong with that one instruction, and the third is the expensive one.

The class it calls is in the `native.` package, not the real one: `ClosureMaker.java:81-86`
builds the owner from `NamingCzar.apiNameToPackageName`, which prefixes
`Naming.NATIVE_PREFIX_DOT` (`= "native."`, `Naming.java:238`) for any api `ForeignJava` defines
(`NamingCzar.java:590-596`). That class is written only by the compiler's CODEGEN phase, into
`nativewrapper_cache` (`CodeGenerationPhase.java:79,94` → `nativeInterface/FortressTransformer.java:33,37`).

That cache is not on the interpreter's classpath. `bin/fortress_classpath` adds
`$CACHES/bytecode_cache` and nothing else; `bin/run_classpath`, which only the compiled-program
launcher uses, is where `nativewrapper_cache` is added.

And the descriptor does not match. `ClosureMaker.java:88-97` builds an all-`FValue` signature.
What the compiler's wrapper for the same method actually has is the compiled world's boxed
values:

```
public class native.com.sun.fortress.nativeHelpers.equality {
  public static FBoolean sEquiv(fortress.AnyType$Any, fortress.AnyType$Any);
      ... invokestatic com/sun/fortress/nativeHelpers/equality.sEquiv:(L..Any;L..Any;)Z
      ... invokestatic com/.../runtimeValues/FBoolean.make:(Z)L.../FBoolean;
}                                               (08-wrapper-disasm.out)
```

So the interpreter's foreign route has no boxing layer at all. The compiler's is 737 lines in
four files — `FortressMethodAdapter` 336, `SignatureParser` 233, `FortressTransformer` 84,
`FortressForeignAdapter` 84 — and it unwraps each argument by its Fortress type
(`FRR64.getValue()`, `FJavaString.getValue()`) and rewraps the result. `ClosureMaker` is 147
lines and does none of it; what it emits would be correct only against a wrapper that took and
returned `FValue`s, and nothing has ever generated one.

`ClosureMaker` also has only `closureForTopLevelFunction`: there is no path for a method. That
is not a fifth gap for the library, because the compiler world writes its methods in Fortress
and has them call an imported function (`CompilerBuiltin.fss:455`,
`println(x:Object) = jPrintln(x.asString.asJavaString)`); a shared text would do the same.

## The control

The same five programs, each `fortress compile`d and then `fortress run`, after the five
compiler-prelude files were compiled into the same fresh private cache
(`AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`, all rc 0,
`06-library-chain.out`). All five compile rc 0 and run rc 0, printing `hello from a Java
native`, `5.0`, `false`, `false`, `false` (`07-compile-control.out`). The mechanism is in good
health on the path it was built for; what this probe measures is only the interpreter's half.

One note on the control's text. `ijPrintln.fss` has to write `s.asJavaString` to feed a helper
declared over `java.lang.String`, exactly as `CompilerBuiltin.fss:455` does. `asJavaString` is a
compiler-world getter (`CompilerBuiltin.fsi:26`) over a compiler-world type, so that one program
is not world-neutral text — which is gap 1 again, showing up in the source rather than in the
synthesized api.

## What it would cost to close

In the project's units — a rung is one edit plus its failing test under the full gate, median 54
minutes; a gated batch is up to four rungs; a worker session is one delegated report with its
probe.

| gap | shape of the fix | size |
|---|---|---|
| 1, the type table | make `NamingCzar`'s table world-sensitive, and declare `JavaString` in the interpreter's world (or stop needing it) | ~1 rung; moot under one library |
| 2, `Driver.java:466` | the return type and the cast on a method whose own comment calls itself a temp hack; it has never had a test | ~1 rung |
| 3, the rewrite map | write what `ForeignComponentWrapper.java:38` says is missing; the unfinished half of a 2009 prototype, with no test to say what right looks like | unknown until prototyped; 1 shadow session |
| 4, the boxing layer | the interpreter-side twin of `nativeInterface/`, 737 lines of Java against `ClosureMaker`'s 147, one clause per Fortress type | 1 worker session to prototype, then 1–2 gated batches |

Together: about one worker session and one to two gated batches, which is the same order as the
natives batch the judgement's step 5 already plans — and it would buy a *second* way to bind
interpreter natives beside `builtinPrimitive`, which already works and already carries 427
bindings. That is the reason the answer is "no" rather than "not yet": the work is not small,
and what it produces is a duplicate of something that is not broken.

## What the probe changes in the record

`FACTS.md:73` says `import java` *works* on the interpreter path. It does not; it is wired and
unfinished. The map's more cautious wording (`map/modules-and-phases.md:498`, "read but not
exercised") is the one that held up. `two-libraries.md` §2's *"whether an `import java` binding
runs under the interpreter is one small probe that nobody has run"* is now answered, and §4
route (c)'s *"not obviously blocked, and this is new here"* should read as blocked, at four
places. This file does not edit those documents; the coordinator does.

## What remains unsettled

- Whether populating `ForeignComponentWrapper`'s rewrite map alone moves the failure from gap 3
  to gap 4, or into something else. Not testable without a Java edit.
- Whether an `FValue` boxing layer is sufficient, or whether the evaluator's dispatch needs the
  declared Fortress types as well as the values. Gap 4 was never reached at run time.
- For the shape the probe selects — one api, a builtin component per world — how the interpreter
  and the linker find a component for an api it does not share a name with
  (`Linker.whoIsImplementingMyAPI`, `linker/Linker.java:72-76`; ledger row 320, reclassified by
  rung X of climb batch 2 as the repository's missing discovery step). This probe does not touch
  it.
- The overlap of `FortressBuiltin.fss`'s 231 `builtinPrimitive` bindings with the compiler's
  helpers, unchanged from the judgement's step 5.
