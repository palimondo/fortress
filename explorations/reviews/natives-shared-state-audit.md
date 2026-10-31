<!-- The audit of shared mutable state in the Java that the library's natives run, the helpers under `nativeHelpers/` and walk's glue classes and native machinery under `interpreter/glue/`, with how the two run times guard their own shared state, written 2026-10-31 by an Opus worker for the curator, to judge whether the `CHOOSE` helpers' shared scratch array (gap-ledger row 855) is one slip or a pattern. Tree: `main` at `6cc2bcd7b` when read (it moved to `97b497a9d` meanwhile, changing nothing outside `explorations/`), whose `ProjectFortress/src/`, `Library/` and `ProjectFortress/LibraryBuiltin/` are those of `1f5c49b4f` (`git diff --stat 1f5c49b4f HEAD` over them is empty). Method: reading, with `grep` for static fields and one `javap -p` over the base build's 688 compiled classes of the two directories, and one small program run three times at four threads in a worktree seeded from `/home/user/fortress-base23` (`1f5c49b4f`) with a private caches folder, removed after; nothing else was run, nothing in the original tree was edited, and the base build was only read. -->

# Shared mutable state in the natives

## 0. In short

- **The natives' own state.** In the 25 helper files and the 37 glue files, and the 14 files of walk's native machinery, the two `CHOOSE` scratch arrays are the only state that calls share and write with values that depend on the call (row 855, known). Every other static field is a constant, a value set while the program or an instantiation loads and cleared between programs, a value rewritten only with the same value, or guarded (a lock, a `volatile` field, a double-checked initialisation done right). Section 2 is the inventory, class by class.
- **Races found.** Three, one of them known:
  1. `simpleIntArith.tempIntChooseArray` and `simpleLongArith.tempLongChooseArray`: one scratch array for every call (row 855). Rung K of climb batch 24 fixes both and moves both bindings.
  2. **New:** the compiled `drandom` (`DeterministicRandom`) gives values that depend on the schedule: three runs at four threads, three different sums (section 3.2). It is no data race. A thread's current task is not restored after a task runs inline, so a draw can advance another task's pedigree.
  3. **New, by reading, not run:** the compiled task group's retry and wait totals are summed with an unguarded `+=` from every worker (section 3.3). Only an optional statistics line shows them.
- **Latent idioms, no race today:** `Reflect`'s double-checked initialisation, which is unsound but unreachable; `FileReadStream` and `FileWriteStream`, which write their static `_con` on every open, always with the same value; the readers' `whenUnconsumed`, which holds a lock that `consume` does not share; and `IndexedArrayWrapper`'s scratch list, which stays confined (section 3.4).
- **On microGPT's path:** no native holds state that its calls share (section 5).
- **The run times:** walk guards every mutable cell with its monitor, with DSTM2-style transactions above that. The compiled path has one global sequence lock, with read sets validated by value. The gate's atomic runs exercise the compiled transactions and the first load of classes, and no native that holds state (section 4).
- **For the curator:** one slip in the natives' state. Nothing checks natives under parallel load, and that gap is the pattern. My proposal is a static check in the gate plus parallel tests for the few stateful helpers (section 7).

## 1. Scope and method

The natives are the library functions whose body is Java (`references/interpreter.md`, "Natives"). I covered:

- every class in `ProjectFortress/src/com/sun/fortress/nativeHelpers/` (25 files), which both paths call;
- every class in `interpreter/glue/prim/` (37 files);
- the native machinery in `interpreter/glue/` (`NativeApp`, `StaticNativeApp`, `IndexedArrayWrapper`, `Glue`, the `NativeFn`/`NativeMeth` bases);
- one level of what these call into: walk's boxed values and native constructors, the compiled run time's `BaseTask`, `FortressTaskRunner`, `FortressExecutable` and `Utility`, `ProjectProperties`, `MainWrapper` and `Naming`.

The run times' tasks and transactions I read for how they guard their state, not to audit their correctness.

I found the fields in two ways:

- a `grep` of the sources for `static` lines that are not method headers;
- `javap -p` over the base build's compiled classes of the two directories (688 class files, nested classes included), keeping every non-final field and every `final` field of an object type, the instance fields of glue objects among them (section 6, "Commands").

A glue object or a `StaticNativeApp` is made once for each binding, and every call of that binding shares it (`interpreter/glue/NativeApp.java:190-207`). So an instance field of a glue class is shared state too.

Each field was then read where it is written and where it is read. "Reached by" names the bindings that call the class: walk's library (`Library/`, `ProjectFortress/LibraryBuiltin/` without the compiler's files) or the compiler's prelude (`CompilerBuiltin.fss`, `CompilerLibrary.fss`, `CompilerSystem.fss`).

## 2. The inventory, by class

Verdicts: **race**, where calls corrupt each other. **Benign race**, a data race whose every write stores the same value. **Safe**, with its reason: a constant; set at load; guarded; confined to one thread or one call; or per object, where the state belongs to one Fortress object that the program owns, under the specification's discipline for shared objects.

### 2.1 Helpers (`nativeHelpers/`)

| Class | State | Verdict | Reason | Reached by |
|---|---|---|---|---|
| `simpleIntArith` | `tempIntChooseArray` (`simpleIntArith.java:121`): filled at `:163`, divided in place at `:181-183`, read at `:194-196` | **race** (row 855) | one array for every call of `intSlowCautiousChoose`; `intOverflowingChoose` calls it for each `n` above the safe table (`:211-212`) | compiled: `ZZ32`'s `CHOOSE` (`CompilerBuiltin.fss:741`, through `:44`). Walk: none today; `FortressLibrary.fss:789` names `Int$Choose` |
| | `intChooseTable` (`:122`), `maxIntChooseSafeN` (`:126`) | safe: constant | filled in the static initialiser (`:136-142`), only read after | |
| `simpleLongArith` | `tempLongChooseArray` (`simpleLongArith.java:105`): `:137`, `:155-157`, `:168-170` | **race** (row 855) | the same, from `longOverflowingChoose` (`:185-186`) | compiled: `ZZ64`'s `CHOOSE` (`CompilerBuiltin.fss:652`) and `NN32`'s (`:806`), whose helper `simpleUnsignedIntArith.unsignedIntOverflowingChoose` calls `longOverflowingChoose` (`simpleUnsignedIntArith.java:80-81`), and so reaches the array for `n` above 3,037,000,500. Walk: none today (`FortressLibrary.fss:882` names `Long$Choose`; `FortressBuiltin.fss:449` names `NN32$Choose`) |
| | `longChooseTable` (`:106`), `maxLongChooseSafeN` (`:110`) | safe: constant | static initialiser `:121-127` | |
| `DeterministicRandom` | no field but a constant (`:20`); a draw advances the current task's pedigree, `ftr.task().makeNewRandom()` (`:52-56`) | safe from data races: confined; **depends on the schedule** (section 3.2) | the pedigree counters (`runtimeSystem/BaseTask.java:63-66`, `:101-111`) are written only by the thread that runs as that task | compiled: `drandom`, `drandomZZ32` (`CompilerBuiltin.fss:279-280`, `:1631-1632`). Walk: none |
| `LocalRandom` | `ThreadLocalRandom.current()` (`:21-27`) | safe: confined to the thread | | compiled: `random`, `randomZZ32` (`CompilerBuiltin.fss:277-278`, `:1629-1630`; `CompilerLibrary.fss:14-15`) |
| `runtime` | reads `FortressExecutable.loopChunk` and `numThreads` | safe: constants | `static final` (`runtimeSystem/FortressExecutable.java:25-28`) | compiled (`CompilerLibrary.fss:20`) |
| `systemOps` | reads `MainWrapper.cachedArgs` (`runtimeSystem/MainWrapper.java:21`) and `ProjectProperties` | safe: set at load | the arguments are set before the program runs; the properties are a composed map built in static initialisers and only read (`repository/ProjectProperties.java:123`, `:184-186`) | compiled (`CompilerSystem.fss:13-14`) |
| `simplePrintln`, `simplePrintArgs`, `simplePrintRR64`, `simplePrintResult` | `System.out`, `System.err` | safe: guarded | each `PrintStream` call is synchronised; lines from parallel tasks interleave whole | compiled `print` and `println` (`CompilerBuiltin.fss:13-16`) |
| `fileOps` | the reader or writer passed in (`compiler/runtimeValues/FortressBufferedReader`, `FortressBufferedWriter`) | safe: per object | a stream is shared only if the program shares it | compiled |
| `simpleIntVector`, `simpleStringVector` | the vector passed in | safe: per object | parallel writes to different elements are the memory model's discipline (`Specification/basic/memory-model.tex`, "Programming Discipline") | compiled |
| `stringOps` | none; calls `Naming` and `RTHelpers`, whose statics are constants (`runtimeSystem/Naming.java:36-54`, `:136-146`) | safe | | compiled |
| `simpleIntLiteralArith`, `simpleArbitraryPrecisionArith`, `simpleBoolean`, `simpleChar`, `simpleConcatenate`, `simpleDoubleArith`, `simpleUnsignedIntArith`, `simpleUnsignedLongArith`, `simpleOverload`, `equality` | none | safe: pure | each method computes from its arguments; `Utility.makeFortressException`, which several raise through, holds no state (`compiler/runtimeValues/Utility.java:24-60`) | walk's library binds 21 calls of `simpleIntArith`, `simpleLongArith` and `simpleUnsignedIntArith` today (`FortressLibrary.fss:741-810`, `FortressBuiltin.fss:371-373`), all of this kind |
| `systemHelper` | none in use (`registerArgs`'s body is commented out) | safe | | |

### 2.2 Walk's native machinery (`interpreter/glue/`)

| Class | State | Verdict | Reason |
|---|---|---|---|
| `NativeApp` | static `cache` (`NativeApp.java:234`), a `Hashtable` that `reset` replaces (`:229-232`) | safe: guarded | every lookup and insertion is under `synchronized (cache)` (`:191-222`). `reset` runs from `Init.initializeEverything` (`evaluator/Init.java:43`) at the start of `Driver.evalComponent` (`Driver.java:81`), before the program forks any task |
| `NativeApp` | instance `a` (`:40`) | safe: set at load | written once in `init` (`:58-74`), under the cache's lock, before the object is published through the cache |
| `StaticNativeApp` | final `m`, `ps`, `result`, `selfAt` (`StaticNativeApp.java:40-43`); `arity` (`:44`), set once (`:142`); `RAISE`, a `Pattern` (`:182`) | safe | fixed after `init`; `call` works on locals only (`:162-180`); a `Matcher` is made per call (`:188`) |
| `IndexedArrayWrapper` | scratch list `l` (`IndexedArrayWrapper.java:33`), cleared and refilled by every `put` and `get` | safe: confined | a wrapper is made for one use (`evaluator/LHSEvaluator.java:176`, `evaluator/values/IUOTuple.java:271`, `evaluator/values/NonPrimitive.java:243`) and `copyTo` is a sequential Java loop. The team's comment: 'Note reuse of temporary, "copyTo" cannot (yet) go in parallel.' (`:32`) |

### 2.3 Glue classes with state (`interpreter/glue/prim/`)

| Class | State | Verdict | Reason | Reached by |
|---|---|---|---|---|
| `Writer` | static `con` (`Writer.java:28`), set by the constructor (`:32`) | safe: set at load | a native object without static parameters gets its constructor while the component's environment is built (`evaluator/BuildNativeEnvironment.java:131`, `:150`), inside `evalComponent`, before the run forks; cleared between programs (`:201-203`, `evaluator/values/NativeConstructor.java:34-39`) | `Writer.fss`; `stdOut` (`Writer.fss:20`) under `println` (`FortressLibrary.fss:4544`) |
| `Reader`, `BufferedWriter` | static `_con` (`Reader.java:29`, `:33`; `BufferedWriter.java:26`, `:30`) | safe: set at load | as `Writer` | `Reader.fss`, `Writer.fss:52` |
| `FileReadStream`, `FileWriteStream` | static `_con` (`FileReadStream.java:30`; `FileWriteStream.java:29`), written on **every open** (`FileReadStream.java:37`; `FileWriteStream.java:37`) | **benign race** | not `volatile`, written from whatever task opens a file, but every write stores the program's one constructor | `File.fss` |
| `FileReadStream.PrimReader`, `Reader.PrimReader` | per stream: `eof`, `consumed` (`FileReadStream.java:51-52`; `Reader.java:51-52`) | safe: per object, with a mismatched lock (section 3.4) | the library reads one stream from one chain of tasks (`FileSupport.fss:157-178`) | `File.fss`, `FileSupport.fss` |
| `PrimitiveArray`, `PrimImmutableArray`, `PrimImmutableRR64Array` | instance `s0` (`PrimitiveArray.java:27`, `:39-41`; `PrimImmutableArray.java:31`, `:43`; `PrimImmutableRR64Array.java:24`, `:36`), one constructor object for each instantiation, shared by every array of it | safe: set at load of the instantiation, under a lock | `oneTimeInit` runs inside the instantiation's factory (`evaluator/values/NativeConstructor.java:66-92`; `GenericConstructor.java:101-104`), which `Memo1PCL` runs under `InstantiationLock.L` (`GenericConstructor.java:65-67`; `useful/Memo1PCL.java:57`) and publishes through the `volatile` `map` (`Memo1PCL.java:22`, `:67`). The memo's tree is applicative (`useful/BATreeNode.java:79-83`) | `NativeArray.fss`: every array |
| their arrays | `AtomicArray` of `ReferenceCell`s (`evaluator/transactions/AtomicArray.java`); `FValue[]` and `double[]` (`PrimImmutableArray.java`, `PrimImmutableRR64Array.java`) | safe: per object | `init`'s duplicate check is a check-then-set without a lock, but all three bindings discard its result (`NativeArray.fss:25-29`, `:36-40`, `:47-51`; row 466) | |
| `Reflect` | eight static `gcon*` (`Reflect.java:49-56`), set by a double-checked initialisation in the constructor (`:61-75`) | latent: unsound idiom, not reachable (section 3.4) | | `Reflect.fss` |
| `Reflect` | instance `it` (`:47`), set in `oneTimeInit` (`:86-90`) | safe | as `s0` | |
| `ReflectCollection.CollectionObject`, `ReflectMethod.MethodWrapper` | static `volatile` `con` (`ReflectCollection.java:48`, `:75-85`; `ReflectMethod.java:42`, `:72-82`), set on every `makeNativeObject` (`ReflectCollection.java:37`) | safe: guarded | `volatile`, and every write stores the same constructor | `Reflect.fss` |
| `StringPrim.GetProgramArgs` | static `volatile` `args`, `convertedArgs` (`StringPrim.java:114`, `:118`) | safe: guarded | a correct double-checked initialisation: both fields `volatile`, the lock on `args` (`:146-155`); the arguments are registered before the run (`Driver.java:564`, `:568`) | `getProgramArgsPrim` (`System.fss:30`) |
| `Thread` | `Thread_prim`'s fields are final; each `spawn` makes its own one-thread group (`Thread.java`, `Thread_prim`'s constructor) | safe | the result passes through `SpawnTask`'s `volatile` fields (`evaluator/tasks/SpawnTask.java:27-28`) | `spawn` |
| `Float$Random`, `RR32$Random` | `Math.random()` (`Float.java:418-422`; `RR32.java:366-370`) | safe: guarded | the JDK's one shared `Random` is thread-safe; parallel calls contend for it, and its values are not reproducible by design | walk's `random` (`FortressLibrary.fss:4537-4538`) |
| `Long$NanoTime` | `System.nanoTime()` (`Long.java:274-279`) | safe | | `nanoTime` |
| every other glue class (`Int`, `Long`, `NN32`, `UnsignedLong`, `BigNum`, `Float`, `RR32`, `Char`, `FlatString`, `IntLiteral`, `FloatLiteral`, `Boolean`, `AnyPrim`, `ObjectPrims` and the rest of `Reflect*`) | no field (the `javap` listing) | safe: stateless | one shared object for each binding, with nothing in it | |

### 2.4 What the glue calls into, under walk

- The boxed-value factories' small-value caches (`evaluator/values/FInt.java:68`, `FLong.java:69`, `FChar.java:25`, `FNN32.java:69`, `FNN64.java:68`): built by array initialisers and never written after (a `grep` for assignments into `cached` finds only the declarations). Safe: constant.
- The value classes' static `volatile` `con`, set by `setConstructor` at load (as `FInt.java:16`, `:135-141`). Safe.
- `NativeConstructor`'s registry, a `Vector` (`NativeConstructor.java:27`), added to under its own lock and walked by `unregisterAllConstructors` only at `reset`. Safe.
- `Driver.getFortressLibrary()` reads `libraryComponentWrapper` (`Driver.java:64`), set at load. Safe.

## 3. The races found

### 3.1 The `CHOOSE` scratch arrays (row 855, known)

The record already holds this one: row 855, and its probe, `explorations/compile-ladder/plan-24/probes/choose.md`, sections 4.3 and 7.3. The probe measured both helpers from a Java thread pool, and `ZZ32`'s on both paths at four threads.

The lines are those of section 2.1 above, and they are unchanged on `main`. Calls run in parallel overwrite and divide each other's entries in place (`simpleIntArith.java:163`, `:181-183`; `simpleLongArith.java:137`, `:155-157`). The result is a wrong value, a false `IntegerOverflow`, or the raw `UnknownError` at `simpleIntArith.java:189`.

Three points the row states only in passing:

- `NN32`'s compiled `CHOOSE` reaches the `ZZ64` array too, through `simpleUnsignedIntArith.java:80-81`. Every result there overflows `NN32`, so a corrupted call can turn an `IntegerOverflow` into an `UnknownError` or a wrong value.
- Walk's library binds neither helper today. The race is the compiled prelude's until climb batch 24's rung K moves `FortressLibrary.fss:789` and `:882` onto the helpers, with the per-call array in both (`coordinator/CLIMB-BATCH-24.md:330`, `:344`).
- The probe's parallel tests (`ChooseHelperWalk`, `ChooseHelperCompiled`) are in `choose.patch`, not yet in the tree.

### 3.2 `drandom` depends on the schedule (new)

**State.** `DeterministicRandom.deterministicRandomDouble` reads the worker's current task and advances that task's pedigree counter (`nativeHelpers/DeterministicRandom.java:52-56`, `runtimeSystem/BaseTask.java:108-111`). Each task has a depth, a unique `gamma` from its parent, and a `dotProduct` that every draw advances (`BaseTask.java:57-66`, `:83-94`, `:101-104`). The magic numbers are a fixed table (`useful/MagicNumbers.java:135`, `:394-396`), so on its own the scheme yields the same values in every run.

**Why it varies.**

- The current task is the worker's field `task` (`runtimeSystem/FortressTaskRunner.java:19`).
- Every generated `compute` sets it to its own task and never restores it (`compiler/codegen/CodeGen.java:4753-4757`; the primordial task's, `:664-665`).
- `joinOrRun` saves and restores it only round a forked task's join (`BaseTask.java:165-173`). A task that was not forked runs inline through `this.compute()` (`:148-149`). It leaves the finished child as the current task for the rest of the parent's code.
- A new task takes the current task as its parent (`CodeGen.java:4686-4688`), so its `gamma` also comes from the finished child's counter.
- Whether a task is forked depends on the pool's queue (`BaseTask.java:113-116`, `:136-144`).

So which counters a draw advances depends on the schedule. This is not a data race: a task object is written only by the thread that runs as it. At one thread nothing inside the pool forks (`numThreads > 1` fails, `:114`), so, by reading, the values are fixed there. I did not run it at one thread: the brief allows runs at four threads only.

**The program**, `DrandomSched.fss`, compiled and run in the seeded worktree with `FORTRESS_CACHES` set to a private copy of its caches:

    component DrandomSched
    export Executable

    (* drandom at every node of a binary tree of tasks; the tuple forks the subtrees *)
    draws(d: ZZ32): RR64 =
      if d = 0 then drandom(1.0)
      else do
        (a, b) = (draws(d - 1), draws(d - 1))
        a + b + drandom(1.0)
      end end

    run(): () = do
      s: RR64 = draws(12)
      println("sum " || s)
    end
    end

    $ bin/fortress compile DrandomSched.fss                        # rc=0
    $ for i in 1 2 3; do FORTRESS_THREADS=4 bin/fortress run DrandomSched; done
    run1 threads=4: sum 4111.755423548555 rc=0
    run2 threads=4: sum 4111.368862987949 rc=0
    run3 threads=4: sum 4110.961144549375 rc=0

The machine: `nproc` 4, Intel Xeon Processor @ 2.10GHz (2100 MHz), load 0.69 at the start, OpenJDK 25 (`/usr/lib/jvm/java-25-openjdk-amd64`), `FORTRESS_THREADS=4`, no other Fortress JVM running.

**What it reaches.** Only the compiler's prelude binds it (`CompilerBuiltin.fss:1631-1632`). Walk's library has no `drandom`: its `random` is `Math.random()`, not reproducible by design. The model program draws no random numbers. The specification says nothing about random numbers: a `grep -i random` of `Specification/` finds nothing. The promise of determinism is the helper's name, and the team's pedigree comment (`BaseTask.java:57-61`). The team's test, `other_compiler_tests/deterministicRandomTest.fss` with `TestDrandom.test`, asserts only `PASS`.

**The record.** No ledger row knows it: `ledger.py find` on `drandom`, `deterministic*`, `nondetermin*`, `random` and `thread*` finds none. A draft row, for whoever writes the ledger, passes `ledger.py check --rows` except for its `?`. It is `CONTESTED`, because the specification is silent:

    | ? | the compiled `drandom` and `drandomZZ32` (`DeterministicRandom`) give values that depend on the schedule above one thread: a binary tree of tasks that draws at every node sums to a different value in each of three runs at `FORTRESS_THREADS=4` | CONTESTED | implementation gap (runtime) | silent | none | natives shared-state audit | A draw advances the current task's pedigree (`ProjectFortress/src/com/sun/fortress/nativeHelpers/DeterministicRandom.java:52-56`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:108-111`); a compiled `compute` sets the current task and never restores it (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4753-4757`), `joinOrRun` restores it only round a forked join (`BaseTask.java:146-177`), at 1f5c49b4f. `draws(12)` (`explorations/reviews/natives-shared-state-audit.md`, 3.2) printed 4111.755423548555, 4111.368862987949, 4110.961144549375. Contested: the specification is silent; the name and the pedigree comment promise it (`BaseTask.java:57-61`). |

**Transactions, by reading.** The same unrestored field resolves the current transaction (`BaseTask.java:180-201`, `:232-254`). A child copies its parent's transaction when it is made (`:86`), so the transaction follows the field, and I found no way for an inline child to change which transaction a write reaches. Pedigrees are what differ between a parent and its finished child. So `drandom` is the one place I found where the unrestored field shows.

### 3.3 The compiled task group's totals (new, by reading, not run)

`FortressTaskRunnerGroup.allRetries` and `totalElapsedTime` are plain fields of the one pool (`runtimeSystem/FortressTaskRunnerGroup.java:28-29`). `addRetries` and `addElapsedTime` add to them with an unguarded `+=` (`:36-42`). Every worker calls both at every `endTransaction` (`FortressTaskRunner.java:52-60`, from `BaseTask.java:200`). So two commits on two threads can lose an update.

They are printed only at the end of a compiled run, when `FORTRESS_THREAD_STATISTICS` is set (`FortressTaskRunnerGroup.java:49-55`, called from the generated code at `CodeGen.java:674`). So the effect is an undercount in a diagnostic line.

I did not run it. Nothing counts the retries independently, so a program could not show the loss. No ledger row knows it (`ledger.py find` on `retries` and `statistics`).

### 3.4 Latent idioms, no race today

- **`Reflect`'s double-checked initialisation** (`Reflect.java:61-75`). It is unsound three ways:
  - the field it checks, `gconobject`, is not `volatile`;
  - it is the second of the eight fields written, so a reader that sees it set could still see `gcontrait` to `gconbottom` unset;
  - the lock is the instance (`synchronized (this)`), not the class.

  It is not reachable today. Every `Reflect` constructor is an instantiation of a generic native object, built under `InstantiationLock.L` (section 2.3). Every caller of `Reflect.make` (`:116-143`) works on a reflected value, as `self` or as an argument, that a completed constructor made: `Reflect.java:149`, `:328`, `:336`, `:354`, `:389`, `ReflectGeneric.java:65`, `ReflectTuple.java:62`, `ReflectRest.java:36`, `ReflectArrow.java:37`, `ReflectGenericArrow.java:108`. So no call of `make` can overlap the first constructor's initialisation. `unregister` clears the fields between programs (`:441-446`). The idiom would turn into a race if a caller of `make` ever came without a reflected value.
- **`FileReadStream._con` and `FileWriteStream._con`**, written on every open (section 2.3): a benign race, since every write stores the same constructor.
- **The readers' `whenUnconsumed`** is `synchronized` on the glue object (`FileReadStream.java:198`, `Reader.java:249`), which every stream's binding shares. `consume` locks the stream (`FileReadStream.java:208`, `Reader.java:260`). The two share no lock, so `consumed` (`:52`) has no common guard. The library never reads a stream from two tasks at once (`FileSupport.fss:157-178`), and it guards its own generator's `consumed` with `atomic` (`:152`).
- **`IndexedArrayWrapper`'s scratch list** (section 2.2) is the `CHOOSE` pattern, confined today by `copyTo` being sequential. The team marked it (`IndexedArrayWrapper.java:32`).

## 4. What is already guarded, and how

**Walk** (`interpreter/evaluator/tasks/`, `transactions/`, `env/`):

- Every mutable variable, field and array element is a `ReferenceCell`, whose `getValue` and `assignValue` are `synchronized` (`env/ReferenceCell.java:123`, `:163`). Each cell keeps a node per transaction.
- Transactions are of the DSTM2 kind. A transaction's status is an `AtomicReference` changed only by `compareAndSet`, in `commit`, `abort` and `orphan` (`transactions/Transaction.java:46`, `:229-231`, `:267-269`, `:283-301`). Its children list is changed under its own lock (`:189-192`, `:253-254`, `:270-274`). Conflicts go to one static `GreedyManager`, which holds no state (`tasks/FortressTaskRunner.java:26`; `transactions/manager/GreedyManager.java`). `doIt` retries an aborted transaction (`tasks/FortressTaskRunner.java:147-180`). The retry count is per thread (`:28`, `:35-47`).
- `PrimitiveArray`'s elements are `ReferenceCell`s (`AtomicArray.java`), so an `atomic` block covers them.
- Generic instantiations, the native arrays' constructors among them, are made under `InstantiationLock.L` (`evaluator/InstantiationLock.java:17`) and published through a `volatile` applicative map (section 2.3).
- What walk does not guard is the program's own race: `acc := acc + c` in a parallel `for` without `atomic` loses updates (row 59), as the specification says it may.

**The compiled path** (`runtimeSystem/`):

- A mutable variable is a cell, `MutableFValue`, whose field is `volatile` (`compiler/runtimeValues/MutableFValue.java`). Before each access the generated code asks `BaseTask.inATransaction()` (`references/compiler.md`, "The run time"; row 641).
- A transaction validates by value against one global sequence lock, an `AtomicInteger` that is odd while a commit holds it (`runtimeSystem/Transaction.java:25`, `:69-107`).
  - A read re-validates the read set whenever the lock has moved (`:152-170`, `:178-217`).
  - A commit takes the lock by CAS from its even snapshot, writes back and releases it (`:231-279`).
  - A nested transaction merges into its parent under the same lock (`:253-276`).
  - A read-only transaction commits without taking it (`:233-234`).

  This is the NOrec design. Because the cell is `volatile`, a read of a value and the read of the lock after it cannot trade places.
- The settings are `static final` (`FortressExecutable.java:25-35`). A worker's retry and wait counters are its own (`FortressTaskRunner.java:20-21`). The current task is a `volatile` field of the worker (`:19`), saved and restored round a forked join (`BaseTask.java:146-177`); after an inline child it is not (section 3.2). The back-off's static `Random` (`BaseTask.java:48`, `:219-221`) is thread-safe, and back-off is off by default (`FortressExecutable.java:32-33`, `:64-68`).
- `TransactionRecord` and `FValueHandle` are referenced only by each other (`grep` of `src/`), so they are dead.
- Known gaps the record holds: rows 319 (a mutable field of an object is outside the transaction), 322, 324 (an exception out of `atomic` leaves its writes visible) and 353. The first load of classes on two threads is rows 415 and 417, both fixed.

**The gate's atomic runs** (`references/gate.md`, "The atomic runs") compile fourteen programs and run each three times at four threads. In climb batch 23's gate all 42 runs passed (`explorations/compile-ladder/climb-batch-23/gate/summary.txt:76-117`). They are 27 to 56 lines each. They test `atomic` over top-level variables and object fields, loops, nested transactions, and the first load of instantiated classes (`FirstLoadThreadsRungG`). None calls a native with state: a `grep` of the fourteen for `CHOOSE`, `random` (which matches `drandom`), `FileReadStream` and `nanoTime` finds none; they print their verdict with `println`. So they guard the compiled transactions and the class loader, not the natives. The suites run each test once, at four threads (the `fortress-repo` skill, "Parallelism and mutable state"), and no test of a helper calls it from parallel tasks against a sequential answer. That is how row 855 stayed unseen until a probe looked.

## 5. On microGPT's path

Neither model program uses `CHOOSE`, random numbers or `atomic`. Their loops with a running value are `seq`: the training loop (`explorations/run-c4/src/MicroGptFlat.fss:91`; `explorations/apl/mg/MicroGptApl.fss:120`) and the loaders (`FlatData.fss:69-97`, `:120-122`; `FlatData2.fss:73-86`). Their parallel loops write disjoint elements of a fresh array (`FlatArrays.fss:185`; `FlatArrays2.fss:117-187`), the discipline that row 155 records. Those writes go through the native arrays' `put`, whose cells are synchronised (section 4).

The natives they reach under walk:

- `Float`'s and `Int`'s glue, for `exp`, `log`, `SQRT`, `^`, `MAX`, `MOD`, `DIV` and the arithmetic;
- the 21 pure helper calls of `ZZ32`'s operators;
- `Long$NanoTime`;
- the string and character glue, for `strToInt`, substrings and `codePoint`;
- `FileReadStream`, read in sequential loops;
- `Writer`, under `println`;
- the native arrays.

None of these holds state that its calls share, except the benign `FileReadStream._con` (section 2.3), and the native arrays' `s0`, set under the instantiation lock. On the compiled path the model programs are compiled by the ladder and never run (`references/gate.md`, "The ladder regression"). The race of section 3.1 reaches them only if they come to use `CHOOSE`.

## 6. For the report's reader

**Defects.**

- Row 855 (known): nothing new to add but section 3.1's three points.
- `drandom`'s dependence on the schedule (section 3.2): measured. No ledger row yet; the draft above.
- The compiled task group's unguarded totals (section 3.3): by reading, not reproduced. No ledger row; I drafted none, because nothing in the tree could reproduce it.

**Sentences of the specification made false.** None; nothing was changed.

**Decisions.**

- *Which race to show by the one program.* I chose `drandom`, the only new candidate that a program can show. The other candidates:
  - `NN32`'s path into the `ZZ64` scratch array, already in row 855's claim and fixed by rung K;
  - the task group's totals, which no program can check without an independent count.
- *Four threads only.* I ran the program only at four threads, as the brief allows, and argued its value at one thread by reading (section 3.2).
- *The draft row's status.* `CONTESTED`, not `NEGATIVE-VERIFIED`, because the specification is silent on random numbers (the row template, "status").
- *The ledger.* I wrote no ledger row: the brief asks for the note and its INDEX line only.
- *Scope.* The two directories, and what they call into one level down. I read the run times' tasks and transactions for their guards, not their correctness. No decision of the curator covers these choices.

**For FACTS.** One candidate, handed over:

- *The fact:* in `nativeHelpers/` and `interpreter/glue/`, the only state that a native's calls share and write with call-dependent values is the two `CHOOSE` scratch arrays. Every other static or shared field is a constant, set at load, or guarded.
- *What it means:* moving a binding onto an existing helper adds no parallel risk, except for the two `CHOOSE` helpers until rung K lands.
- *The number:* 2 fields, of the 688 compiled classes listed. Both are row 855.
- *What shows it:* no test. The `javap` command below, whose non-final fields are those of section 2.
- *Detail:* section 2 of this note.

**Commands** worked out here:

- The fields of the natives, from the built classes, in one JVM. A loop that starts one `javap` per class takes minutes.

      cd <base-build>/ProjectFortress/build/com/sun/fortress
      javap -p interpreter/glue/prim/*.class interpreter/glue/*.class nativeHelpers/*.class > all.txt
      awk '/(class|interface) [A-Za-z0-9_.$]+/{cls=$0} /^  [^(]*;$/ && !/ final / && !/static \{\}/{print cls " ::" $0}' all.txt

  Drop `!/ final /`, and keep the lines of object type, to see the `final` fields that hold a mutable object.
- A compiled run with a private caches folder in a seeded worktree: `cp -a default_repository/caches tmp/priv-caches`, then `FORTRESS_CACHES=$PWD/tmp/priv-caches` for both `bin/fortress compile P.fss` and `bin/fortress run P`. `bin/fortress_classpath` takes the jars from that folder (`explorations/coordinator/tools/old-fortress.sh`, its header).

**Questions for the curator** (decisions not taken):

1. *Must `drandom` be deterministic?* The ways:
   - (a) restore the current task after an inline child too, in `joinOrRun` round `this.compute()` (`BaseTask.java:148-149`), as the forked branch does;
   - (b) record it as a property of the compiler's prelude, and do nothing;
   - (c) decide when the one library gains a deterministic generator, since `drandom` leaves with the prelude at the switch-over.

   Evidence: section 3.2. The default, if not answered: (b), with the draft row filed.
2. *The systematic check* of section 7: adopt it, a part of it, or neither.

## 7. For the curator: one slip or a pattern

**One slip in the natives' own state.** Of the 25 helper files, the 37 glue files and walk's native machinery, the two `CHOOSE` helpers alone keep state that their calls share and write with values that depend on the call (row 855). Every other static field is a constant, a value set while the program or an instantiation loads, a value rewritten only with the same value, or guarded by a lock or a `volatile` field used correctly. The team marked the one other scratch buffer as unsafe for parallel use, and it stays confined to one call. Walk's library binds 21 helper calls today, all pure functions of their arguments. No native on microGPT's path holds state that its calls share.

**The pattern is in the checking, not the code.** No test calls a native from parallel tasks and compares the results with a sequential answer. The gate's atomic runs exercise the compiled transactions and the first load of classes, and the suites run each test once at four threads. That is why row 855 waited for a probe. It is also why two neighbours are new today, both in the compiled run time's task state rather than in a helper's fields. The first is `drandom`, whose values depend on the schedule (three runs at four threads, three different sums). The second is the task group's unguarded retry totals, which only a diagnostic line shows.

**A systematic check (my proposal, not built).** Two parts:

1. *A static check in the gate.* List every field of the classes under `nativeHelpers/` and `interpreter/glue/` that is static and either not final or of an array or collection type, and every instance field of a glue class. Fail on any not in an allow-list taken from section 2 of this note. One `javap -p` over the built classes does it (section 6, "Commands"). It is about forty lines of script and the allow-list, a small worker's task, and it ran well inside 100 seconds here (not timed). It catches a new scratch buffer or cache in any helper that phase 4 writes or moves. It does not see state reached through calls, such as `drandom`'s; section 2's one level of calls would need reading again only when a helper starts calling into the run time.
2. *A parallel test for each helper with state.* For a helper that the check lets through with state, or that calls into run-time state, write a compiled test that calls its binding from a parallel loop at four threads and asserts each value against a sequential answer, as the `CHOOSE` probe's tests do (`plan-24/probes/choose.patch`). Today that is the two `CHOOSE` helpers, which rung K already covers, and `drandom` if question 1 asks for its determinism. A pure helper needs none: the static check is its proof. So the bindings that phase 4 still moves add no parallel tests unless their helpers keep state.

The cost: one small worker session for part 1, then one `javap` run in each gate, under 100 seconds here; for part 2, nothing beyond rung K's tests today, one test for `drandom` if question 1 asks for it, and one test for each stateful helper that appears later.
