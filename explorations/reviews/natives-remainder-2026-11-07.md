<!-- The review the curator asked for on 2026-11-07 of the native bindings that climb batch 27 leaves on walk's glue classes, and of every way to take them to zero: the count left by owner and group, each group's sources, ways, costs and default, the switch-over's own step N5, the forks sorted for the curator and the planner, and the order of rungs to zero; written 2026-11-07 by an Opus worker, reading only, with one walk run at `eef4072a9` in a private caches folder. -->

# The native bindings left on glue after climb batch 27, and the path to zero

**The tree.** `main` at `eef4072a9`. Climb batch 27's record is read at its commit, `git show 27fab1e65:explorations/coordinator/CLIMB-BATCH-27.md`, cited "B27:line". PLAN is cited "PLAN:line" at `eef4072a9`. One walk run (section 2.3) used the main tree's build with a private caches folder; its program was a scratch file and is not kept. A Java path without a prefix is under `ProjectFortress/src/com/sun/fortress/`. Nothing in the tree changed.

**Words.** *Walk* is the interpreter, the *compiled path* the checker, the code generator and the compiled run time. The *one library* is walk's library; the compiled path's own small library, the *prelude*, goes at the *switch-over*. A *native binding* is a library body `builtinPrimitive("…")`; its string names a *glue class*, which only walk runs, or a *helper* in `nativeHelpers/`, which both paths call (P-58). *The count* is the number of live bindings on glue classes (F-32). *P-167's device*: the binding names a compiled helper, and walk's loader answers that name with walk's own operation, as P-167 decides for `ilkName` and `SEQV`.

## 1. What is left after climb batch 27

1. **Today, 143.** The brief's `git grep -n 'builtinPrimitive("com.sun.fortress.interpreter' -- Library ProjectFortress/LibraryBuiltin` prints 108 lines. One is inside a comment, `throwError` under "time to get rid of this" (`Library/FortressLibrary.fss:4646-4648`). The 36 bindings of `Writer`, `File` and `Reader` put the string on the line after `builtinPrimitive(` (`Library/Writer.fss:23-24`), so the grep misses them. A scratch reading that strips `(* … *)` and the line comment `(*)` and joins the lines finds 449 live bindings, 306 on helpers and 143 on glue classes, as F-32 and F-299 state.
2. **Climb batch 27 takes 46:** rung I 16, F 10, C 1, W 16 (B27:274), and rung A 3, `Object`'s `asString` and `ilkName` and `SEQV` (P-167; the brief). Rung S moves none. **97 are left.**
3. **Climb batch 28 takes 23:** the reader rung 20 (B27:928; P-164) and the conversions rung 3 (B27:927; P-161, P-162). **74 are left.**

The 97, by group and owner, each with the line of the record that places it:

- **The reader side, 20** (batch 28): `FileReadStream` 10 (`Library/File.fss:24-60`); `Reader` 9 and `InReader` (`Library/Reader.fss:22-59`). B27:275, :928; PLAN:58.
- **The conversions, 3** (batch 28): `ZZ32`'s `big` (`Library/FortressLibrary.fss:812`); `ZZ`'s `narrow` and `widen` (`:1080`, `:1083`). B27:275, :927; P-161.
- **The literals, 32** (N5): `IntLiteral` 29 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:489-554`); `FloatLiteral` 3, `asString`, `asExprString`, `asFloat` (`:197-201`). B27:934; PLAN:59 names only the 29.
- **`NativeArray`, 7** (D2): `PrimitiveArray` 3, `get`, `put`, `init00`; `PrimImmutableArray` 2; `PrimImmutableRR64Array` 2 (`ProjectFortress/LibraryBuiltin/NativeArray.fss:20-48`). B27:935; PLAN:60.
- **`Thread`, 5** (D2): `val`, `wait`, `ready`, `stop` and the top-level `abort` (`FortressBuiltin.fss:725-736`). PLAN:60.
- **`printTaskTrace`, 1** (D2): `Library/FortressLibrary.fss:4523`. PLAN:60.
- **`System`'s `getProgramArgsPrim`, 1** (D2 in `perf-probes/prelude/natives-shape.md`, section 2): `Library/System.fss:31`. PLAN:70 asks when it moves, with no default.
- **`Reflect`, 28** (D2): `Type` 6, `ObjectOrTraitType` 5, `ReflectCollection` 3, `ReflectArrow` 2, eight owners 1 each, and 4 top-level functions (`Library/Reflect.fss:24-403`). PLAN:60.

D2's 42 are the last five lines: 7 + 5 + 1 + 1 + 28.

**Where each of the 74 must run.** The compiled path must emit the prelude's components, not only check them, before the compiled tests run against the one library (PLAN:62; F-34). `FortressLibrary` imports `NativeArray` (`Library/FortressLibrary.fss:13`), and the distance's fourteen components hold both (`explorations/coordinator/tools/distance/run.sh:87-90`). So:

- 45 are in components that the switch-over compiles: the literals 32 and `Thread` 5 in `FortressBuiltin`, `NativeArray` 7, `printTaskTrace` 1 in `FortressLibrary`.
- 1 is in `System`, which both model programs import (`explorations/run-c4/src/MicroGptFlat.fss:14`, `explorations/apl/mg/MicroGptApl.fss:19`) and which the compiler's tests need by the switch-over (P-33; F-293).
- 28 are in `Reflect`, which only `Library/ReflectiveQuickCheck.fss` and three tests import (`tests/ReflectTest.fss`, `ReflectiveNumberTypes.fss`, `ReflectiveQuickCheckTest.fss`; `git grep -l 'import Reflect'`).

**Finding 1. `NativeArray` cannot wait past the switch-over for decision A, and `Thread` and `printTaskTrace` need a decided compiled body by then.** PLAN:60 and `natives-shape.md`, section 3, say "Walk keeps their glue; the compiled path refuses them as today." But every array of the one library is a `PrimitiveArray` or a `PrimImmutableArray`: `array1`'s default arm, `__DefaultVector`'s store, the 2-D and 3-D stores and `immutableArray1` (`Library/FortressLibrary.fss:2560`, `:2607`, `:2613`, `:2777`, `:2949`, `:3179`), the varargs factory (`compiler/WellKnownNames.java:53-56`), `List`'s `ArrayList` (`Library/List.fss:488`) and `System`'s `args` (`Library/System.fss:34`). In the one library's world a glue string is not rewritten; the body stays a call of the library's own `builtinPrimitive` (row 849), and the code generator emits such bodies (row 874's note: with the strings on glue classes, `FortressLibrary` emits 482 declarations). That function's body is `fail ("Implementation should not invoke builtinPrimitive " javaClass)` (`FortressBuiltin.fss:34-35`, the team's text since 2007). So, by reading, a compiled program would raise `FailCalled` at its first array, and microGPT as `System` loads. Not run; the first compile against the one library would show it. For `Thread` and `printTaskTrace` this fallback is what the compiled path runs if nothing is decided; section 2.6 weighs it as way (e).

**Finding 2. Zero is a count of strings, not of glue classes.** Walk keeps native objects that no string names: P-164 adds two (`reviews/io-objects-carrier-2026-11-06.md`, section 6 (b), point 12).

## 2. Group by group

### 2.1 The reader side, 20: no decision

1. P-164 decides the design: the reader trait's 10 bindings on `fileOps`, 9 on existing helpers and one new one for standard input; `FileReadStream` and `Reader` become plain objects over a field; `File` stops being a native component.
2. Rung W's forks settle what the reader rung reuses: both traits and both table entries land in W (W1, B27:385), and a missing file raises the library's `FileNotFoundException` (W4, B27:388).
3. It is on microGPT's path: `FlatData` reads its files through `FileReadStream` (`explorations/run-c4/src/FlatData.fss:11`, `:69-86`; `explorations/apl/mg/FlatData2.fss:14`, `:72`). The rung's guards include microGPT's quick check (PLAN:58).
4. **Default:** climb batch 28, as recorded. No question.

### 2.2 `ZZ32`'s `big`, `ZZ`'s `narrow` and `widen`, 3: no decision

1. P-161 deletes `ZZ`'s `narrow` and `widen` and moves their callers onto `.asZZ32` and `.asZZ64`. P-162 puts `big` on `makeZZfromZZ32`, which exists (`nativeHelpers/simpleArbitraryPrecisionArith.java:130`).
2. Rung I's new calls of `ZZ`'s `narrow` join the callers (fork I2, B27:362).
3. **Default:** climb batch 28, as recorded. No question.

### 2.3 The literals, 32

**The team's sources.**

1. P-76: an integer numeral is an `IntLiteral` to the checker, but walk gives it the class `Int`, `Long` or `BigNum`, so no numeral reaches `IntLiteral`'s declarations under walk. Walk reaches them only at the object `IntLiteral` itself. Its natives answer through `FIntLiteral.make`, which normalises to an `Int`, so `x + x` answers a `ZZ32` (row 578; `tests/IntLiteralValue.fss`).
2. Walk's glue computes each operation over a `BigInteger` (`interpreter/glue/prim/IntLiteral.java:44`, `:121-246`). Where a value does not fit, `ToZZ32` throws a `ProgramError`, which no `catch` sees (`:262-269`).
3. The team's later word, the prelude of 2011 and 2012 (P-162, "Why"): `IntLiteral` is a trait whose getters the run-time class implements (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:883-894`; `compiler/runtimeValues/FIntLiteral.java:20`). Four operators call helpers over that run-time type, `simpleIntLiteralArith.add`, `sub`, `mul` and `neg` (`CompilerBuiltin.fss:341-344`; `nativeHelpers/simpleIntLiteralArith.java`). `asString` and the comparisons are Fortress over `asZZ32` and `asZZ64` (`CompilerBuiltin.fss:884`, `:912-917`). 21 operators throw `CompilerFailureDetectedAtRunTime` (`:896-928`): the compiled path folds numerals before the checker, so it treats arithmetic on an `IntLiteral` at run time as its own failure.
4. F-32: the literals' helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be.
5. **`FloatLiteral` is different under walk.** Walk makes every float numeral an `FFloatLiteral` (`interpreter/evaluator/Evaluator.java:1632`), whose `asString` is the numeral's written text. Run under walk, scratch program, private caches:

        println(1.50)              prints 1.50
        x = 1.50; x.asString       prints 1.50
        asFloat(x)                 prints 1.5
        y: RR64 = 2.50; println(y) prints 2.50

   So walk reaches `FloatLiteral`'s three at every float numeral that it prints. The one library declares `object FloatLiteral extends RR64` (`FortressBuiltin.fsi:44`); the prelude declares a trait that excludes `RR64`, with only `asRR32` and `asRR64` (`CompilerBuiltin.fss:996-999`).

**The peers.** Go's untyped constants, Swift's literal protocols and Haskell's `fromInteger` fix a numeral's type at compile time. None keeps a numeral type at run time.

**Why only at N5, or when walk's numeral is an `IntLiteral`.**

6. A helper over the compiled `IntLiteral` takes a run-time type that walk's values are not (point 4). So P-58's walk half, that walk loads the named helper, cannot hold for these bindings at any time. Q-walk (PLAN:82) makes walk's results `IntLiteral`s, which fixes what a walk test can assert (row 578). But walk's `IntLiteral` stays an `FValue`, so Q-walk gives walk no carrier either. Walk's half needs a way of its own, and no entry holds one.
7. The compiled carrier is not designed. The one library declares objects, `IntLiteral` (`FortressBuiltin.fsi:179`) and `FloatLiteral`; the prelude declares traits that run-time classes implement. The library's pattern for a type that both paths name and that holds a Java value is a trait, with walk's native object below it and the run-time class implementing it, "as `ZZ32`, `Int` and `FZZ32` stand" (P-164, "Why"). PLAN notes the same gap for `FlatString` (PLAN:59).

**The ways.**

- **(a) At N5, with walk's half by P-167's device.** `simpleIntLiteralArith` names the one library's `IntLiteral` and gains 25 helpers, each over a `BigInteger` inside, as `add` is. Walk's loader answers the 29 names with today's glue, so walk's values do not change. Touches: one helper class, P-167's table in `interpreter/glue/NativeApp.java`, 29 strings, and the carrier. Size: inside N5's rung, about 0.4M written, as batch 25's native rungs wrote 333K and 388K for 10 and 18 helpers (B27:319).
- **(b) Eight earlier, as Fortress text.** `asZZ32`, `asZZ64`, `asNN32` and `asNN64` over `asZZ` and P-161's checked getters; `asString` and `asExprString` over `asZZ`'s; `=` and `cmp` over `ZZ`'s. This is the prelude's way, made exact: over `ZZ`, where the prelude converts through `asZZ32` and `asZZ64`. Values do not change at the object `IntLiteral`. Where a value does not fit, P-161's catchable `IntegerOverflow` replaces walk's `ProgramError`. It leaves `asZZ`, `asFloat` and the 19 that answer an `IntLiteral`: Fortress text cannot make an `IntLiteral`. Library text only. It needs climb batch 28's P-161 rung first. About 0.3M with its skeptic.
- **(c) All 29 earlier, by P-167's device, over helpers that name the prelude's `IntLiteral` until N5.** The checker's foreign-type table maps `Lfortress/CompilerBuiltin$IntLiteral;` to the api that `WellKnownNames.fortressBuiltin()` names when `NamingCzar` loads (`compiler/NamingCzar.java:294-295`, `:343`). In walk's world that api is `FortressBuiltin`: row 895's message names `FortressBuiltin.StringVector`. The one library declares `FortressBuiltin.IntLiteral`. So, by reading, the count stage would check these strings against the one library's type. Not run: one count stage on a scratch copy with one string moved would show it. That table has no case for a `FloatLiteral` Java type (`NamingCzar.java:333-345`), so `FloatLiteral`'s three cannot move this way.
- **(d) A `BigInteger` carrier in walk's loader for `IntLiteral`.** Walk reads `getLit()` and boxes through `FIntLiteral.make`. The bindings name the existing `ZZ` helpers. On the compiled side, a transfer pair keyed by name, as the six transfer helpers are (`NamingCzar.java:373-384`, `:494-503`), and a converter between `FIntLiteral` and `BigInteger` in the wrapper generator. The six transfers can be identities because both sides hold an `int`; this pair cannot. It keeps P-58's walk half. Java on both paths, one rung, about 0.6M.
- **(e) `FloatLiteral`'s `asFloat` alone,** by a `self` carrier in `double` (`interpreter/glue/StaticNativeApp.java:103-111`). Its `asString` cannot go onto a helper over `double` unless walk then prints `1.5` for `1.50`.

**Default.** (b) in climb batch 29. The other 21 and `FloatLiteral`'s three move at N5 by (a), under question Q1. If the planner's probe of (c) passes, the 21 move by (c) in climb batch 29's device rung. A review designs the carrier before the names batch (section 3, point 4).

### 2.4 `NativeArray`, 7

**The team's sources.**

1. Jan-Willem Maessen, a co-author of the specification who owned the library and its parallelism (`research/authorship.md`), made the primitive array in 2007 (`9645d6c05`, 2007-08-31, "Created a primitive vector type", by `git log --follow`). Walk's store is `AtomicArray`, the store of walk's transactions (`interpreter/glue/prim/PrimitiveArray.java:35`; `interpreter/evaluator/transactions/AtomicArray.java:23`).
2. `PrimImmutableRR64Array` is Maessen's unboxed store, a `double[]` (`interpreter/glue/prim/PrimImmutableRR64Array.java:39-46`). He added it in `353818213`, 2008-07-28: "When you request an immutable array of RR64 these should be used in preference to the boxed version." No factory chose it then or chooses it now: `git grep` finds it only in `NativeArray.fss`.
3. The team's later word: the prelude has no generic array (row 305). Christine Flood, who built the transactional memory and the compilation to fork/join (`research/authorship.md`), wrote the 2011 vectors (`f4973a717`, 2011-08-16, "Simple Integer 1 dimensional arrays"). They hold a Java array inside a run-time class: `FZZ32Vector` over an `int[]`, `FStringVector` over a `String[]` (`compiler/runtimeValues/FStringVector.java:14-19`). Their helpers take the class (`nativeHelpers/simpleIntVector.java`, `simpleStringVector.java`). The table reads the class as the prelude's trait (`NamingCzar.java:337-340`), and the class implements that trait (`FStringVector.java:15`). This is P-164's device. It is also how the team met F-106's limit: the helper takes the wrapper, never the Java array.
4. Compiled code sends each read and write of a mutable cell through the transaction inside `atomic` (`fortress-repo` skill, `references/compiler.md`, "The runtime"; `compiler/runtimeValues/MutableFValue.java`). A compiled store must do the same for its elements. Walk's `AtomicArray` does this for walk.
5. A helper's Java signature has no type parameter. Its element is an `Object`, which the checker reads as `Any` (`NamingCzar.java:451`, `:487`). So a read at `T` goes through the library's `cast` (`Library/FortressLibrary.fss:33-37`), a `typecase`, by P-162's pair with a private bare half at `Any`. The other way is a checker rule for a binding at a type parameter.

**What the compiled path needs before any `double[]` store exists.** Five bindings: `PrimitiveArray`'s `get`, `put` and `init00`, and `PrimImmutableArray`'s `get` and `init00`. Every array, vector, matrix, varargs list and `ArrayList` reaches them (section 1, finding 1). `PrimImmutableRR64Array`'s two are reached by nothing.

**The peers.** JVM languages store a generic array of references in an `Object[]` and cast at the read (Java's `ArrayList`, Scala's `ArrayBuffer`). They keep a primitive array unboxed: Scala's `Array[Double]` is a `double[]`. That second half is decision A's ground (P-84, P-85).

**The ways.**

- **(a) Wait for decision A, after the switch-over** (PLAN:60). The compiled path then cannot run any array of the one library at the switch-over (finding 1). As an order, this does not work.
- **(b) A boxed store now, behind P-164's device and P-167's device.** The one library declares a trait for a Java store, with walk's native object below it, a table entry, and a run-time class that implements it. A helper class takes a Java class that holds an `Object[]`, as Flood's vectors do, and its writes go through the compiled transaction (point 4). `PrimitiveArray` and `PrimImmutableArray` become plain objects over a field of that trait. Walk's half is P-167's device, so walk keeps `AtomicArray` and its values. Decision A later gives `RR64` its `double[]` in the same frame. Touches: `NativeArray.fss` and `.fsi`, `FortressLibrary` (the trait), the walk-world table (`NamingCzar.java:464-504`), a helper class, a run-time class, P-167's table, and a native constructor in walk. One rung, as large as W, the batch's largest: 0.5M for its worker (B27:315), and more with the four-thread atomic runs (`references/compiler.md`, "Testing an edit here").
- **(c) (b) with walk calling the helper through an `Object` carrier.** This is the Any-carrier review's option (a): four lines in the loader and two in `compiler/nativeInterface/FortressMethodAdapter.java`, measured (`reviews/any-carrier-2026-11-06.md`, section 6 (a), points 2 and 3). It keeps P-58's walk half. But walk's arrays then leave `AtomicArray`, so walk's writes inside `atomic` lose their transaction, unless the helper store is also made transactional for walk's tasks.
- **(d) A code-generator intrinsic.** The class loader gives a `PrimitiveArray` instance its own array field. This is decision A's way A4, which F-18 calls unmeasured (P-84). The strings would stay glue, against P-58's form. It is decision A's work, not preparation for it.
- **`PrimImmutableRR64Array`'s two** fit (b): a compiled class over a `double[]`, as `FZZ32Vector` holds an `int[]`. No factory chooses it until decision A answers P-85's first question.

**Default.** (b) in climb batch 29, with the two of `PrimImmutableRR64Array`, under questions Q1 and Q2. The `cast` against a checker rule is the rung's to measure.

### 2.5 `System`'s `getProgramArgsPrim`, 1

1. Its glue builds a `PrimImmutableArray` (`interpreter/glue/prim/StringPrim.java:113-140`). `System` calls it as it loads (`Library/System.fss:29`, `:31`). It is not in the api: `System.fsi:28` declares only `args`.
2. The prelude's `CompilerSystem` reads `systemOps.getArgs`, a Java-backed `StringVector` over `MainWrapper.cachedArgs` (`Library/CompilerSystem.fss:13-18`; `nativeHelpers/systemOps.java:29-31`).

**The ways.**

- **(a) Two scalar helpers,** a count and the i-th argument, in a class other than `systemOps`. In walk's world `systemOps`' `getArgs` stops any component that binds the class (row 895). Both read one static that walk's driver (`StringPrim.GetProgramArgs.registerProgramArgs`) and `MainWrapper` both fill. `args` is then built in Fortress by the library's immutable-array factory. Part of a rung, about 0.15M, as rung S (B27:315). On the compiled path it needs only 2.4's store.
- **(b) With `NativeArray` after the switch-over** (`natives-shape.md`, section 3). Compiled, microGPT's `System` would then raise as it loads.
- **(c) A Java-backed vector, as the prelude has.** That adds a second store type beside 2.4's.

**Default.** (a) in climb batch 29. PLAN:70 already asks this, so it is question Q3.

### 2.6 `Thread` 5 and `printTaskTrace` 1

**The team's sources.**

1. The specification: a `spawn` expression's value is the spawned thread, of type `Thread[\T\]` (`Specification/basic/expressions/spawn.tex:21-27`). The Threads chapter gives `val`, `wait`, `ready` and `stop` (`Specification/basic-lib/thread.tex`). `abort()` abandons the innermost `atomic` and runs it again, and has no effect outside one (`Specification/advanced/parallelism-locality/transactions.tex:15-21`). No chapter names `printTaskTrace`; its api comment reads "dumps some internal error state" (`Library/FortressLibrary.fsi:2565-2566`).
2. Walk: Flood wrote the thread glue (`2d70035b8`, 2007-09-21, "Spawning of Fair threads"). Walk desugars `spawn` into `FortressBuiltin`'s `Thread` (`interpreter/rewrite/DesugarerVisitor.java:1004-1016`). The checker types it `Thread` (`compiler/Types.java:109-112`; `scala_src/typechecker/impls/Misc.scala:442-446`).
3. The compiled path: the prelude declares no `Thread` (row 82), and the code generator has no case for `spawn` (`references/compiler.md`, "What the compiled path cannot compile yet"). The compiled run time has its own tasks and transactions: `FortressTaskRunner.getTask()` and `transaction()` (`runtimeSystem/FortressTaskRunner.java:72`, `:77`), `TransactionAbortException` (`runtimeSystem/TransactionAbortException.java:14`), and a task's parent (`runtimeSystem/BaseTask.java:46`).
4. The library: `Lazy` calls `abort` inside `atomic` (`Library/Lazy.fss:59-63`), and nothing imports `Lazy`. `tests/taskTrace2.fss` and `taskTrace3.fss` call `printTaskTrace`.

**The peers.** A spawned task's handle belongs to the run time: Java's `Thread` and `Future`, Julia's `Task` with `fetch` and `wait`.

**The ways.**

- **(a) A helper that works on both paths.** For `Thread` this cannot be done with helpers alone: a helper takes plain Java values, and a `Thread` holds a function, `fcn:()->T`. For `abort` and `printTaskTrace`, helpers can work over the compiled run time, but walk's tasks and transactions are walk's own (`interpreter/evaluator/tasks/`), so walk cannot run those helpers.
- **(b) P-167's device.** Each of the 6 names a compiled helper, and walk's loader answers the name with today's glue. On the compiled path, `abort` throws the compiled abort inside a transaction and does nothing outside one, as the specification says; `printTaskTrace` prints the compiled task chain; `Thread`'s four raise `FailCalled`, "spawn is not compiled yet", until the code generator compiles `spawn`, which is row 82's home. One rung, about 0.4M for its worker.
- **(c) A helper that raises on both paths.** Walk would lose `spawn`, against the specification. Ruled out.
- **(d) Removal.** For `Thread` and `abort`, the specification and walk's desugaring rule it out. `printTaskTrace` alone could go, with two walk tests and one api line, where the specification is silent, but nothing is gained.
- **(e) Glue kept.** After the names batch the compiled body falls through to the library's `builtinPrimitive` and raises `FailCalled` (finding 1). For `Thread` on the compiled path that is the same as (b), at no cost. But the count stays at 6, and P-58's "refuse a string that names no helper" is read anew.

**Default.** (b), under question Q1. Compiled `spawn` is a code-generator rung after the names batch.

### 2.7 `Reflect`, 28

**The team's sources.**

1. The specification lists reflection as future work: "The reflection story for Fortress", and "reflection mechanism" under "Native stuff" (`Specification/appendices/future.tex:704-710`).
2. `Library/Reflect.fss` is "a prototype" (`7ed228d24`, 2010-07-27) by `senokay`, a summer-2010 contributor whom `research/authorship.md` leaves unresolved. It sits over Maessen's 2007 type reflection in walk (`f6c3a9eb0`, 2007-12-14; `interpreter/glue/prim/Reflect.java`, 447 lines). It breaks `Type`'s `comprises` clause, and that repair is the curator's (row 595).
3. The prelude has no reflection. The compiled run time's `RTTI` holds a class, its name and a subtype test (`compiler/runtimeValues/RTTI.java`, 71 lines), but no joins, meets, members or static parameters.
4. The library around it: `ReflectiveQuickCheck` and three tests. Rung N special-cases `Number` in its generator (fork N1, B27:347).

**The peers.** Reflection is a run-time service on the JVM and in Julia.

**The ways.**

- **(a) Compiled reflection over the run time's types.** A design review, then two rungs or more. Off microGPT's path.
- **(b) P-167's device with raising helpers.** That is 28 helpers, and 28 pairs over `Any` with casts, since no Java type carries `Reflect`'s traits. A rung for no working operation.
- **(c) Removal,** with `ReflectiveQuickCheck` and the three tests: one rung, and the count reaches zero. Team text is deleted, and only a revert of a large deletion undoes it.
- **(d) Glue kept, walk only, as an exception to P-58,** until (a) or until walk runs the checker (P-12). P-33 lets a component outside the core wait until a program needs it.

**Default.** (d), under question Q4. The count then stops at 28, all of them `Reflect`'s.

## 3. N5, the switch-over day's own step

1. **The foreign-type table.** There are already two tables: the compiler world's (`NamingCzar.java:437-452`) and the one library's (`:464-504`, with the six transfers at `:494-503`), which the count and distance stages read today. Rung W adds the two I/O entries (P-164). Left for the day: the four special cases (`:333-345`), the boxed-type table (`:589-590`; `runtimeSystem/Naming.java:297-298`), and the entries for the literals and `FlatString` once their carriers are designed. Most of this is prepared. On the day a compile reads the second table.
2. **The raise strings.** There are 82 today in 8 files, where `natives-shape.md` counted 55: 43 `IntegerOverflow` and 26 `DivisionByZero` in five helper classes, 2 `FileNotFoundException` in `fileOps`, and 11 `IOFailure` in `FortressBufferedReader` and `FortressBufferedWriter` (`git grep -c '"fortress\.CompilerBuiltin\$'` over `nativeHelpers/` and `compiler/runtimeValues/`). Walk ignores their api part (F-299). This can be prepared: a resolver in `compiler/runtimeValues/Utility.java:24-56` names the prelude's api in one place, so that the day changes one line. It changes no behaviour, it is Java only, and the raise tests on both paths guard it. About 0.2M.
3. **The source files that name the prelude.** There are 44 files and 235 lines today (`git grep -c -E 'CompilerBuiltin|CompilerLibrary|CompilerAlgebra|compilerBuiltin\(\)|useCompilerLibraries|-compiler-lib'` over `ProjectFortress/src`), where `natives-shape.md` counted 43 and 214. The helpers are 7 files and 81 lines, the run-time classes 21 files and 54 lines, `Shell.java` 33 lines, the bytecode optimizer 19 and the frozen stub 19. Each run-time class implements an interface that only the compiled prelude produces (`compiler/runtimeValues/FZZ32.java:15`), so those classes move on the day. Of this list, only the raise strings can be prepared.
4. **Also on the day:** rows 874 and 368, the wrapper converters for the one library's types; fork 21 (F-322; review-queue item 360); the world test of item 308; and the compiled carriers of the literals and of `FlatString` (section 2.3, point 7). A reading review can design the carriers before the day, and the trait split can land under walk before it.
5. **Size.** `natives-shape.md` put N5 at one rung inside the names batch. With the resolver and the review done before, it stays one rung, now carrying the literals' 24 strings.

## 4. The forks, sorted

**Questions for the curator.** Each is consequential by the coordinator skill's test, as a reader applies it.

- **Q1. Is P-167's device the rule for the run time's own operations: the arrays' store, threads and `abort`, the task trace, and the literals at N5?** For about 45 more names, the binding names the compiled helper, and walk's loader answers with walk's own operation. **Default: yes.** It bends P-58's walk half and reads P-167 anew, past its two names. Walk keeps `AtomicArray`, `spawn` and its numerals unchanged. The ways not taken: walk carriers (an `Object` pass-through for array elements, which drops walk's transactional store; a `BigInteger` carrier with a transfer pair for the literals), or the glue kept, with the compiled fallback raising `FailCalled`.
- **Q2. Does the compiled path get a boxed store for the library's arrays before decision A, so that its arrays run at the switch-over?** The store is a Java class over an `Object[]` whose writes go through the compiled transaction, behind a one-library trait (P-164's device). Climb batch 29 lands it; decision A then gives `RR64` its `double[]`. **Default: yes.** It reads P-85 anew ("The whole preparation for the array work is to be done before the switch-over; only the work itself waits"). It holds P-84's unboxed `RR64` back for the interval, and it touches microGPT's speed until decision A; microGPT compiles only in phase 5.
- **Q3. Does `getProgramArgsPrim` leave glue by the switch-over?** **Default: yes:** two scalar helpers outside `systemOps`, and `args` built in Fortress (section 2.5 (a)). It decides whether `System`, and so microGPT's import of it, loads compiled. PLAN:70 asks this with no default.
- **Q4. Do `Reflect`'s 28 stay on glue, walk only, as an exception to P-58?** **Default: yes, until a compiled reflection is designed or walk runs the checker.** The ways not taken: remove `Reflect`, `ReflectiveQuickCheck` and three tests (one rung, count to zero), or build compiled reflection (a review and two rungs or more). It decides whether zero includes a walk-only prototype that the specification leaves to future work.

**Defaults the planner takes, none consequential.**

- The reader rung and the conversions rung as climb batch 28's record has them (sections 2.1, 2.2).
- `IntLiteral`'s 8 as Fortress text over `asZZ` after P-161's rung, the prelude's way made exact (2.3 (b)). The planner probes way (c) on one string before climb batch 29's brief.
- `FloatLiteral`'s 3 stay until N5, since walk prints a float numeral's written text (2.3, point 5).
- `abort` and `printTaskTrace` get compiled helpers that work, and `Thread`'s four get helpers that raise until compiled `spawn` (2.6 (b)).
- `PrimImmutableRR64Array`'s 2 move with the store rung, over a compiled `double[]` class that no factory chooses until decision A (2.4).
- In the store rung, the `cast` at `T` against a checker rule is the rung's to measure (2.4, point 5).
- The raise-string resolver is a rung before the names batch, and the carrier review is a reading before it (section 3).
- Once no string outside `nativeHelpers/` is left in the components that the switch-over compiles, the names batch makes the rewrite refuse every such string, as P-58 is written. That closes the fallback of finding 1.

## 5. The order of work

**The rungs.**

1. **Climb batch 27** (its record, with rung A): I, F, C, W, S, A and N. The count goes from 143 to 97.
2. **Climb batch 28** (B27:254-259, :320): the reader rung (−20), the conversions rung (−3), `asif` and the 2-D and 3-D ranges. The count reaches 74. About 3.2M and 3 hours. Rung X1 below can join as a fifth rung if Q1 is answered before its brief. It shares no declaration with the four; it extends P-167's table, which rung A makes.
3. **Climb batch 29**, waiting on Q1 to Q3 and on batch 28's P-161 rung:
    - X1, `Thread` 5 and `printTaskTrace` 1 by P-167's device (Q1), if batch 28 did not take it: 68.
    - X2, `IntLiteral`'s 8 as Fortress text: 60.
    - X3, the arrays' boxed store and `PrimImmutableRR64Array` (Q1, Q2): 53.
    - X4, `System`'s arguments (Q3): 52. The compiled run needs X3, but the rung's files do not overlap X3's.
    - X5, the raise-string resolver (no count change).
    - With these, the carrier review, reading only.

   Four or five rungs, about 3.0M to 3.6M: climb batch 27's record puts a rung at about 0.73M with all roles, and climb batch 28's four at 3.2M (B27:319, :320); X2, X4 and X5 are small. X1 and X3 both add names to the same table in `NativeApp.java`. If they cannot sit at separate places in it, they go into one rung.
4. **The names batch:** N5's rung, with the literals' 24 strings by Q1's device and their carrier, the table, the 44 files, and the rewrite's refusal. The count reaches 28, or 0 by Q4's other way.
5. **`Reflect`,** by Q4: 28 stay, walk only, by default; or a removal rung in any batch, which gives 0; or compiled reflection after phase 6.

The natives are not the last gate before the names batch: F-34's 38 refused declarations and row 321's rung come first too (PLAN:62, :67).

**The asks, in the order that the work needs them.**

1. **Q1,** before climb batch 28's brief if X1 is to join it, otherwise before climb batch 29's. Default: yes. It decides whether walk keeps its own code under the compiled helpers' names for the run time's own operations.
2. **Q2,** before climb batch 29's brief. Default: yes. It decides whether the library's arrays run compiled at the switch-over, boxed, before decision A.
3. **Q3,** before climb batch 29's brief. Default: yes. It decides whether `System`'s `args` loads compiled at the switch-over.
4. **Q4,** before the names batch. Default: walk only. It decides whether the count stops at 28 or reaches zero.
