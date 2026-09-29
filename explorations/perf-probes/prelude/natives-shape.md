<!-- The natives half of the switch-over (phase 4), measured for the coordinator: the shape probe of coordinator/library-route-judgement.md § 2, step 2(c), the count of the one library's native bindings against the compiler's, and a plan in rungs. Approved by Pavol on 2026-09-29 as item 5 of the review of his decisions (reviews/decisions-review/judgement.md section 3, omission 1, and section 6, item 5; PLAN.md R5). Written 2026-09-29 by a delegated worker in its own worktree on wip/natives-probe, tree f55fd68e2. Shadow copies and private caches only: no file outside natives-shape/ and this note changed; ant was not run. Every command is in natives-shape/run-all.sh; the captures are beside it. -->

# The natives half of the switch-over

Terms. **Walk**: the interpreter, `fortress <file>.fss`. **The compiled path**: `fortress compile` and `fortress run`. **The one library**: `FortressLibrary`, `FortressBuiltin` and the components they import; the compiler prelude (`CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`) is deleted at the switch-over. **Binding**: a declaration whose body is native Java code. **Glue class**: walk's native, a Java class over walk's boxed values, named by `builtinPrimitive("…")` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:164-215`). **Helper**: a static Java method over plain Java values in `nativeHelpers/`, which the compiled path calls through `import java`. **Shadow**: changed copies of tree classes put first on the classpath (`natives-shape/make-shadow.sh`, `run-shadow.sh`). **Rung**: one edit and its failing test under the full gate, median 54 minutes; a gated batch is up to four rungs.

## The answers

1. **Shape.** One binding text serves both paths. A two-declaration `import java` component, written as `CompilerBuiltin.fss` writes its natives, runs on walk after six small Java patches, 0.1K lines (+120 −20), and prints what the compiled path prints; the interpreter suite stays green. The record's "no" (`perf-probes/prelude/import-java-interpreter.md`) priced this at a worker session and one to two gated batches.
2. **Count.** The one library has 425 live bindings (445 written, 20 inside comments). 147 have a compiled counterpart already, 61 have a helper that nothing binds yet, 139 need a new static helper, and 78 need something else (36 methods of native I/O objects, 42 with no compiled analogue).
3. **Plan.** Nine rungs before the switch-over day, beside phase 3, move walk onto the helpers one family at a time, each gated by the interpreter suite; the switch-over day then only re-points names. One fork is Pavol's: which of the library's two native constructs is the one text.

## 1. The shape probe

### What was on record, and what is new

The 2026-09-20 probe ran five one-declaration programs and found four gaps, all in walk's half (`import-java-interpreter.md:88-228`). It did not change Java, so it could not see past the first gap each program met. New here: one component with two declarations bound through `import java`, in `CompilerBuiltin.fss`'s shape, one `import java` line per helper class, from one package (`natives-shape/NativesShape.fss`); a variant with both helpers in one line (`NativesShapeOne.fss`); and each gap patched in a shadow, one at a time, in the order a program meets them.

The helpers are `simpleIntArith.intLT(int,int):boolean` and `simpleDoubleArith.doubleAdd(double,double):double`. The compiled path runs both programs today and prints `true`, `false`, `5.5` (`natives-shape/03-compile-control.out`).

### What each gap does to it

1. **The type table.** On the unchanged tree both programs stop in name resolution: `FortressBuiltin.JavaString`, `RR64`, `ZZ32`, `ZZ64` are undefined (`01-NativesShape-walk.out`). `ForeignJava` synthesizes an api for every method of each helper class, and `NamingCzar`'s table places every Java type in the builtin api (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:294-295`, `:436-450`). The one library places the number traits and `String` in `FortressLibrary` (`Library/FortressLibrary.fsi:291`, `:513`, `:558`, `:2342`). Patch: in walk's world the table names the one library's types (`patches/gap1-namingczar-table.patch`, +14 −11). Then the two-line program meets gap 2 and the one-line program meets gap 3 (`04-*-g1.out`).
2. **The second import from one package.** `ClassCastException` at `Driver.java:466` (`04-NativesShape-g1.out`). The two callers that reach a foreign api do not read the value (`Driver.java:405`, `:410`). Patch: return `null` for a foreign wrapper (`gap2-driver-cast.patch`, +2 −2). Then gap 3 (`05-NativesShape-g12.out`).
3. **The foreign name.** "Non-top-level reference to imported …intLT" (`05-NativesShape-g12.out`), raised at `interpreter/evaluator/BaseEnv.java:535-537`. Walk's desugarer gives a reference its depth only when a rewrite matches its name (`interpreter/rewrite/DesugarerVisitor.java:668-681`); a foreign name has none, so it keeps the unset depth. The same visitor already sets an api-qualified type name to the top level (`:694-697`). Patch: the same for an api-qualified reference (`gap3-desugarer-qualified-ref.patch`, +3). The 2026-09-20 reading, that `ForeignComponentWrapper`'s empty rewrite map had to be filled (`import-java-interpreter.md:164-176`), was not needed. Then gap 4: a `NullPointerException` in `NativeApp.stringName` (`06-NativesShape-g123.out`).
4. **The closure.** `ClosureMaker` emits a class that calls the compiler's wrapper in `nativewrapper_cache`, which walk's classpath lacks, over an all-`FValue` descriptor (`import-java-interpreter.md:178-223`). Patch: a closure that calls the helper itself by reflection, unboxing each argument and boxing the result by its Java type (`gap4-reflective-closure.patch`, +71 −6: the new `interpreter/glue/ForeignNativeApp.java`, and the body of `ClosureMaker.closureForTopLevelFunction`, `ClosureMaker.java:119-141`, replaced). Then the closure has no parameter types (`NonPrimitive.java:309`, `07-NativesShape-g1234.out`), because `FunctionClosure.finishInitializing` (`FunctionClosure.java:232`) never runs on a foreign closure. Patch: the wrapper keeps its closures and finishes them after the libraries' types exist, from a pass after `initTypes` (`Driver.java:223-225`; `gap4b-foreign-closure-params.patch`, +17 −1). Both programs then print `true`, `false`, `5.5` on walk (`08-*-g1234b.out`).
5. **New: a helper that raises.** A helper raises a Fortress exception by naming a class of the compiled prelude, for example `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")` (`compiler/runtimeValues/Utility.java:45-58`); the helpers do so at 55 sites (IntegerOverflow 37, DivisionByZero 16, FileNotFoundException 2). Walk has no such class, so an overflow ends the run with `FortressImplementationError` (`13-NativesShapeRaise.out`). Patch: translate it into walk's own raise of the library object of that name, as `Int.overflow()` raises it (`interpreter/glue/prim/Int.java:258-261`; `gap5-helper-raise.patch`, +13). Then walk prints `IntegerOverflow caught`, as the compiled path does (`13-NativesShapeRaise.out`).

The same five patches run methods too: a trait's functional method and an object's dotted method whose bodies call the imported functions print `true`, `false`, `1.5` on walk and compiled (`NativesShapeMethod.fss`, `11-NativesShapeMethod.out`).

### What it costs and what it does not show

- **Size.** Six patches, +120 −20 lines of Java in six files, one of them new (`natives-shape/patches/`). Gap 1's patch is a probe device: at the switch-over the table names the one library's types for both paths, and the world test goes.
- **No regression.** The interpreter suite, what `ant testSystem` runs, in two shards: 441 tests green under the full shadow (`09-system-g12345.out`), as without it (`09-system-control.out`; the first control run was cut by the 14:35 UTC restart and re-run whole). The compiled path with the shadow first on the classpath compiles and runs `NativesShape` as before (`10-compile-under-shadow.out`). `testFast` was not run under the shadow.
- **Limits, by reading.** `ForeignNativeApp` converts `int`, `long`, `double`, `float`, `boolean`, `String` and `BigInteger`. Helpers over compiled-world types cannot take walk's values: 6 parameters or results over `fortress.AnyType$Any`, 13 over `fortress.CompilerBuiltin$IntLiteral`, 17 over `FortressBufferedReader`/`Writer`, 14 over `FZZ32Vector`/`FStringVector` (`natives-shape/helpers-javap.txt`). A shared text needs its helpers over Java values. `Char` carried as `int` and the unsigned types were not run. A reflective call is slower than a glue subclass; walk's speed was not measured.
- **The record's shape is not needed.** The 2026-09-20 note chose one api with a builtin component per path (`import-java-interpreter.md:43-47`). That shape needs the linker step of ledger row 320 (`linker/Linker.java:72-76`), and it does not reach the 125 bindings inside `FortressLibrary.fss` itself, nor those of `FlatString`, `Writer` and `NativeArray`.

### The library's own construct, walk's half

The one library binds every native with `builtinPrimitive("…")`. That construct can serve as the one text too, if its string names a static helper instead of a glue class. Walk's half measured: a 72-line loader (`patches/opt1-builtinprimitive-static.patch`, a fallback in `NativeApp.java:196` and the new `StaticNativeApp.java`, over `ForeignNativeApp`'s conversions) runs `builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intLT")` and prints `true`, `false`, `5.5` (`NativesShapeBP.fss`, `12-NativesShapeBP.out`); the unchanged tree refuses it ("Native class … not found"). The suite stays green under it (`09-system-opt1.out`). The compiled half is not measured. `builtinPrimitive` is declared only in the builtin api, with a `fail` body (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:34-35`), and the compiled path calls that body; the string is inert data (`perf-probes/prelude/REPORT.md` § 3). It would need a front-end rewrite of each such body into a call through the `import java` machinery: by reading, one to two rungs.

## 2. The count

### The mechanisms

- `builtinPrimitive` bodies: 425 live bindings in nine files. 20 more sit inside comments (`FortressBuiltin.fss:501-537`, 19; `FortressLibrary.fss:4338`, 1); the record's 231 and 126 per file count them.
- Objects of a `native component`, whose Java class walk loads by name (`interpreter/evaluator/BuildNativeEnvironment.java:42-47`): 32.
- Names walk binds at start-up: `true`, `false`, `Any` (`interpreter/evaluator/Primitives.java:38-52`).

Matched against the compiler prelude's 366 declarations whose bodies call an `import java` alias (`CompilerBuiltin.fss` 364, `CompilerLibrary.fss` 1, `CompilerSystem.fss` 1), over 369 public static helpers in 25 classes (`natives-shape/helpers-javap.txt`). Matching is by owner, name and signature, the owner mapped between the two spellings (`Int` and `ZZ32` to `ZZ32`, `Float` to `RR64`, `Char` to `Character`, `FlatString` to `JavaString`), and then by operation: each glue class to the helper that computes the same thing. Scripts: `natives-shape/count/extract.py`, `match.py`, `classify.py`; every binding's class is in `count/classified.tsv`.

### The classes

- **A, bound, 147.** The compiler prelude binds the same operation at the same owner and signature. Only the binding text changes.
- **B, helper exists, 61.** A helper computes it; nothing binds it under this name and signature yet.
- **C, new helper, 139.** A static helper over Java values must be written; the glue class's body is its source.
- **D1, native I/O object, 36.** A method of `Writer`, `BufferedWriter`, `FileReadStream`, `FileWriteStream` or `Reader`. It needs a Java-backed type in the one library, as the compiler prelude's `JavaBufferedReader`/`Writer` (`NamingCzar.java:449-450`), then helpers; `fileOps` already has 17 over them.
- **D2, no compiled analogue, 42.** Reflection, `Thread`, the native arrays, the task trace.

### By file

- `FortressBuiltin.fss`, 212: A 88, B 23, C 96, D2 5 (`Thread`).
- `FortressLibrary.fss`, 125: A 56, B 31, C 37, D2 1 (`printTaskTrace`).
- `Reflect.fss`, 28: D2 28.
- `File.fss`, 15: D1 15.
- `FlatString.fss`, 14: A 2, B 7, C 5.
- `Writer.fss`, 11: D1 11.
- `Reader.fss`, 10: D1 10.
- `NativeArray.fss`, 7: D2 7.
- `System.fss`, 3: A 1 (`getProperty`), C 1 (`getEnvironment`), D2 1 (`getProgramArgsPrim`).

The prelude and what it imports (`FortressBuiltin`, `FortressLibrary`, `FlatString`, `Writer`, `NativeArray`) hold 369 of the 425: A 146, B 61, C 138, D1 11, D2 13. The other 56 load only when a program imports `Reflect`, `File`, `Reader` or `System`.

### What the classes hide

- **Same name, other meaning.** 25 of B carry a name the compiler prelude binds to another helper. 12 are the wrapping operators: the one library binds `DOTPLUS` to wrapping addition (`FortressLibrary.fss:718`), the compiler prelude to saturating addition (`CompilerBuiltin.fss:676`), ledger row 348. Copying the compiler prelude's binding would be wrong for them.
- **Parameters that are not Java values.** 37 bindings take `AnyIntegral` (17), `Type` (11), `Any` (5), `Number` (3), `T` (3) or a function (4): B 10, C 11, D2 16. The body converts before the call, or the helper takes a Fortress type.
- **The size of C.** 132 distinct glue classes, 0.7K lines of glue Java, median 5 lines each. `RR32` 50 (no float helper exists but `floatToDouble`), `Float` 28 (directed rounding, raw bits, NaN tests), the integer families' `REM`, `MOD`, `GCD`, `LCM`, `partitionL`, `^`, `CHOOSE`, shifts and conversions 42 (the compiler prelude writes the first four in Fortress, `CompilerBuiltin.fss:686-705`), the literals 8, strings and `StringPrim` 10, `nanoTime` 1 (the compiled one returns `RR64`).
- **Every program's output is D1.** `println` writes through `stdOut` (`FortressLibrary.fss:4246-4249`), a native `Writer` object (`Library/Writer.fss:20-24`). The first compiled program on the one library needs `Writer`'s natives.
- **microGPT's path.** It calls `nanoTime` (C) and imports `System` (`explorations/apl/microgpt/MicroGptApl.fss:16`), whose top-level `args` calls `getProgramArgsPrim` (D2) when the component loads (`Library/System.fss:28`). Its arrays reach `NativeArray` (D2).
- **Native objects.** Of the 32, the compiled path has a run-time value class for 12 (`compiler/runtimeValues/`: `FRR64`, `FRR32`, `FFloatLiteral`, `FZZ32`, `FZZ64`, `FNN32`, `FNN64`, `FIntLiteral`, `FZZ`, `FBoolean`, `FCharacter`, `FJavaString`), an analogue for the 5 I/O objects (`FortressBufferedReader`/`Writer`), and nothing for 15 (`Thread`, the 3 arrays, the 11 `Reflect` objects).

### The names

- **The four well-known types.** `Types.STRING`, `JAVASTRING`, `EXCEPTION`, `CHECKED_EXCEPTION` (`compiler/Types.java:66-69`), switched between the apis at `:77-88`. Used outside `Types.java` 5 times: `STRING` at `scala_src/typechecker/impls/Operators.scala:160` and `Misc.scala:461`, `EXCEPTION` at `Misc.scala:741`, `:752`, `:771`; the other two never. The one library declares `String`, `Exception` and `CheckedException` (`FortressLibrary.fsi:2342`, `:1037`, `:1102`) and no `JavaString`. Beside them, `CHARACTER` (`Types.java:65`, used at `Misc.scala:464`) names `Character` where the one library has `Char`: ledger row 477.
- **The foreign-type table.** 15 distinct type names in the builtin api (`NamingCzar.java:337-344`, `:437-450`, `:460-465`). On the one library 5 move to `FortressLibrary` (`ZZ32`, `ZZ64`, `RR64`, `ZZ`, `NN64`), 1 is renamed (`Character` to `Char`), 4 stay (`Boolean`, `RR32`, `NN32`, `IntLiteral`), and 5 have no type (`JavaString`, `JavaBufferedReader`, `JavaBufferedWriter`, `ZZ32Vector`, `StringVector`).
- **Sources that name the prelude.** 43 Java and Scala files, 42 of them in code, 214 lines (`CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `compilerBuiltin()`, `useCompilerLibraries`, `-compiler-lib`):
  - the world switch, 7 files, 48 lines: `Shell.java` 33, `WellKnownNames.java` 9, `Types.java` 2, `NamingCzar.java`, `disambiguator/TopLevelEnv.java`, `linker/Linker.java`, `runtimeSystem/Naming.java` 1 each;
  - the optimizer, the front end and the checker, 6 files, 29 lines: `asmbytecodeoptimizer/Inlining.java` 13, `RemoveLiteralCoercions.java` 6, `codegen/ParallelismAnalyzer.java` 3, `desugarer/IntegerLiteralFoldingVisitor.java` 3, `typechecker/TraitTable.scala` 3, `nodes_util/ExprFactory.java` 1;
  - the run-time value classes, 21 files, 54 lines, `compiler/runtimeValues/` (for example `FZZ32.java:14-15` implements `fortress.CompilerBuiltin.ZZ32`);
  - the helpers, 7 files, 64 lines: the 55 raise strings and the `IntLiteral` helpers;
  - the frozen stub `ProjectFortress/src/fortress/CompilerBuiltin.java`, 19 lines.

## 3. The plan in rungs

The order moves walk onto the helpers first. Walk then runs the same Java as compiled code, so the interpreter suite checks every rebinding the day it lands, long before the compiled path reads the library. The switch-over day is left with the names. The rungs are the same under either answer to the fork below; only the binding form and N0 differ.

Before the switch-over, beside phase 3 (they touch walk and the library's binding bodies, not the checker):

1. **N0, the mechanism, 1 rung, Java.** Under `import java`: the six patches, gap 1's table conditional on the world until the switch-over. Under `builtinPrimitive`: the 72-line loader, the conversions and gap 5; the compiled half's rewrite is its own rung, and can wait for N5. Test first: the probe programs as interpreter tests, seen failing. Gate: the full gate; the suite, the ladder and the checker count unchanged.
2. **N1, the bound natives, 2 rungs, library text only.** The 147 of class A: the integer families and their value objects first, then `RR64`, `Char`, `FlatString`, `Object` and the top level. Gate: the full gate, where the interpreter suite measures the change. A test that moves is a difference between a glue class and its helper, a finding for the record, not a failure to hide.
3. **N2, the unbound helpers, 1 rung.** The 61 of class B, the 12 wrapping operators bound to the wrapping helpers, the 10 with a non-Java parameter converted in the body.
4. **N3, the new helpers, 3 rungs, Java and library.** 132 helpers written from the glue bodies, 0.7K lines, and the 139 bindings of class C: `RR32` and `Float`'s bit and rounding operations (78); the integer families' remainders, divisors, powers, partitions and conversions (42); the literals, strings, `StringPrim` and `nanoTime` (19). Each helper's test is walk's existing behaviour.
5. **N4, the I/O objects, 2 rungs.** A Java-backed writer type and `stdOut`/`stdErr` first, the 11 `Writer` bindings on `println`'s path; then `File` 15 and `Reader` 10.

That is nine rungs, about three gated batches. Afterwards walk's glue serves only class D2: 42 of 386 glue classes, of the 7K lines in `interpreter/glue/prim/`.

On the switch-over day, in the names batch:

6. **N5, the names, 1 rung inside that batch.** The foreign-type table names the one library's types (15 names). The 55 raise strings name the one library's exceptions. The `IntLiteral` helpers follow the one library's `IntLiteral`. `Types`' four and `CHARACTER`, and the 42 source files, go with the batch's other names. Gate: the full gate and the ladder regression.

After it, class D2: `NativeArray` with the array design (phase 5, decision A), and `System`'s `args` with it; `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path. Walk keeps their glue; the compiled path refuses them as today.

## 4. For Pavol

**Which construct is the one binding text, the library's `builtinPrimitive` or the compiler prelude's `import java`?**

1. `builtinPrimitive("…")` stays every binding's body; its string names a static helper instead of an interpreter glue class. Walk: measured, a 72-line loader. Compiled: a front-end rewrite of those bodies, not measured, one to two rungs by reading. The library's text changes in 347 strings and gains no imports.
2. `import java` blocks and ordinary calls, as `CompilerBuiltin.fss` writes its natives (17 blocks there). Measured on both paths: walk with the six patches, compiled as it runs today. The library's text changes in 347 bodies, and each native file gains import blocks.

Both need the same helpers (C), the same I/O object type (D1) and the same names batch, and both leave D2. Declining both leaves the record's shape, a builtin component per path, with row 320's linker step.

## What this changes in the record

For the coordinator to edit; this note edits nothing else.

- FACTS:157 says one binding file cannot serve both worlds. It can: six patches, 0.1K lines, measured. Gap 3's cure is the reference's depth, not the rewrite map, and a fifth gap exists, the helpers' raise strings.
- FACTS:32 and PLAN's phase 4 count 108 and 231 bindings, 29 without a helper. Today: 425 live, 147 bound, 61 with a helper, 139 new, 78 other.
- The judgement's omission 1 (`reviews/decisions-review/judgement.md:259`) says the shape probe was never run. The 2026-09-20 probe ran it in pieces; this one ran it whole.

## Captures

In `natives-shape/`: `00-setup.out` (tree, JDK, machine); `01`, the unchanged tree on walk; `02`-`03`, the compiled control; `04`-`08`, walk after each patch; `09-system-*.out`, the interpreter suite (`control`, `shadow`, `opt1`, `g12345`); `10`, the compiled path under the shadow; `11`, the methods probe; `12`, the `builtinPrimitive` loader; `13`, the raising helper. Programs: `NativesShape*.fss`. Patches: `patches/`. Count: `count/` (`bindings.tsv`, `objects.tsv`, `cprelude.tsv`, `matched.tsv`, `classified.tsv`) and `helpers-javap.txt`. Machine: 4 cores, Intel Xeon at 2.10 GHz, JDK 25.0.4, `FORTRESS_THREADS=1`, load 1.7 to 6.3 at the runs' starts; no timing here is a comparison.
