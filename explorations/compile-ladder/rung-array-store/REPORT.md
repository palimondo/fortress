# Rung A of climb batch 28: the arrays' store

- problem: every array of the one library is a `PrimitiveArray` or `PrimImmutableArray` whose 7 bindings named glue classes, so a compiled program would raise at its first array (`explorations/reviews/natives-remainder-2026-11-07.md:34`, finding 1; `ProjectFortress/LibraryBuiltin/NativeArray.fss:12-50` at 157323e5)
- spec: `Specification/basic/memory-model.tex:68-75` ("Programming Discipline": updates of shared array elements inside `atomic`) and `:133-141` ("Providing the Appearance of a Single Object": a subscript preserves the atomicity of the underlying store)
- precedent: P-164's Java-backed trait with walk's native object below it and the walk-world table entry, `JavaBufferedWriter` (`Library/FortressLibrary.fss:1948-1956`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:798-799`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/JavaBufferedWriterObject.java:23-78`, `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:493`); P-167's loader device (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:47-53`); `__DefaultVector`'s store in a field (`Library/FortressLibrary.fss:2672`)
- deviation: walk's loader answers `arrayOps` by one rule onto one new glue class, `ArrayOps`, not onto the three old glue classes, which stay unused (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:181-188,220`); `PrimImmutableRR64Array` joins `NativeArray`'s api (`ProjectFortress/LibraryBuiltin/NativeArray.fsi:18`); `StringPrim`'s program arguments are filled through the array's own `init` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java:136-139`), a file beyond those named
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/NativeArray.fss`, `ProjectFortress/LibraryBuiltin/NativeArray.fsi`, `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java` (each carries the team's copyright header; the clone is shallow, so `a874948ac` is not in it)

The worktree was seeded by `seed-worktree.sh` from `/home/user/fortress-base28` (exit 0, 4 s). Commits on `wip/rung-array-store`: `6ea756e7` (the walk tests, first) and `fe19fdad` (the edit, its unit test and the refusal test). Every result below ran on the code of `fe19fdad`; no code changed after it.

## What changed and why

P-169 has the arrays' 7 bindings name compiled helpers that walk's loader answers with walk's own operations, and Q2's answer gives the compiled store shape (ii), an `Object[]` with a slot API in the compiled transaction.

- **The store traits** (`Library/FortressLibrary.fss:2391-2406`, api `Library/FortressLibrary.fsi:1610-1627`): `trait JavaArrayStore excludes { String, Number, Boolean, Char, JavaBufferedReader, JavaBufferedWriter }` with `get(i: ZZ32): Any`, `put(i: ZZ32, v: Any): ()` and `init(i: ZZ32, v: Any): Boolean`, bound to `arrayOps.get`, `put` and `init`; `trait JavaRR64ArrayStore`, which also excludes `JavaArrayStore`, with `get(i: ZZ32): RR64` and `init(i: ZZ32, v: RR64): Boolean`, bound to `arrayOps.getRR64` and `initRR64`; the factories `makeJavaArrayStore(n: ZZ32)` and `makeJavaRR64ArrayStore(n: ZZ32)`, bound to `arrayOps.make` and `makeRR64`. They sit right before `primitiveArray` and `__parr`.
- **`NativeArray`** (`ProjectFortress/LibraryBuiltin/NativeArray.fss:12-46`) is a plain component. `PrimitiveArray[\T, nat s0\]()` holds `mem: JavaArrayStore = makeJavaArrayStore(s0)`, `get(i) = cast[\T\](mem.get(i))`, `put(i, v) = mem.put(i, v)`, `init00(i, v) = mem.init(i, v)`; `PrimImmutableArray` the same without `put`; `PrimImmutableRR64Array[\nat s0\]()` holds a `JavaRR64ArrayStore` and reads `mem.get(i)`. Their `opr [ ]`, `init0` and the team's comment on a failed transaction stay. The api (`NativeArray.fsi`) before: `PrimitiveArray` and `PrimImmutableArray`, each `object ... end`; after: the same two and `object PrimImmutableRR64Array[\nat s0\]() extends ImmutableArray1[\RR64,0,s0\] end` (`:18`), so a program can make it through its own constructor; no factory chooses it (decision A).
- **Walk's native objects** (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:53-59`, right after `trait Object`'s end): `private object JavaArrayStoreObject extends JavaArrayStore end` and `private object JavaRR64ArrayStoreObject extends JavaRR64ArrayStore end`. Their native constructors (`interpreter/glue/prim/JavaArrayStoreObject.java`, `JavaRR64ArrayStoreObject.java`, new) register themselves as `JavaBufferedWriterObject` does; a store's walk value is an `AtomicArray` made with the constructor, as `PrimitiveArray.java:34-35` made one, and an RR64 store's a `double[]`, as `PrimImmutableRR64Array.java:39-46` held one.
- **Walk's loader** (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:181-188`, `:220`): after P-167's table, a string that starts `com.sun.fortress.nativeHelpers.arrayOps.` becomes `com.sun.fortress.interpreter.glue.prim.ArrayOps$` and the method's name, and loads as a glue class does; a name with no operation is refused at load as a missing glue class is. `interpreter/glue/prim/ArrayOps.java` (new) holds `make`, `get`, `put`, `init`, `makeRR64`, `getRR64` and `initRR64`: `get`, `put` and `init` are the bodies of `PrimitiveArray$get`, `$put` and `$init0`, and `getRR64` and `initRR64` those of `PrimImmutableRR64Array$get` and `$init0`, over the two new values. So walk's arrays keep `AtomicArray` and its transactions.
- **The compiled helpers** (`ProjectFortress/src/com/sun/fortress/nativeHelpers/arrayOps.java`, new): `FortressArrayStore make(int)`, `Object get(FortressArrayStore, int)`, `void put(FortressArrayStore, int, Object)`, `boolean init(FortressArrayStore, int, Object)`, `FortressRR64ArrayStore makeRR64(int)`, `double getRR64(FortressRR64ArrayStore, int)`, `boolean initRR64(FortressRR64ArrayStore, int, double)`. Every type maps in the walk-world table.
- **The compiled stores** (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java`, `FortressRR64ArrayStore.java`, new). `FortressArrayStore` holds an `Object[]`. Inside a compiled transaction (`BaseTask.getCurrentTransaction()` on a `FortressTaskRunner`), `get` is `TXReadSlot`, `put` is `TXWriteSlot`, and `init` reads the slot and writes it only where it holds nothing; outside one, `get` and `put` are a volatile read and write by a `VarHandle` and `init` a compare-and-set from null. A read of an element that holds nothing raises `IllegalStateException` with walk's message; an index is checked before a write is buffered (`:40-43`). `FortressRR64ArrayStore` holds a `double[]`, takes no part in a transaction, and its `init` writes and answers true, as walk's glue does.
- **The compiled transaction** (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java`): a location is a cell (`MutableFValue`) or a `Slot`, an array and an index with identity equality (`:25-62`); the read and write sets are keyed by `Object` (`:78-79`); `committedValue` and `commitValue` read and write either kind, a slot by `getVolatile` and `setVolatile` (`:64-74`); `TXRead` and the new `TXReadSlot` share `TXReadLocation` (`:203-231`), which does not record a location that holds nothing (Hashtable refuses null); `TXWriteSlot` (`:292-297`); both validations and both branches of `TXCommit` read and write through the two helpers. 99 changed lines by `git diff 157323e5 -- ...Transaction.java | grep -c '^[-+][^-+]'`; `BaseTask` unchanged.
- **The checker's walk-world table** (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:494-495`): `FortressArrayStore` to `JavaArrayStore`, `FortressRR64ArrayStore` to `JavaRR64ArrayStore`, with the comment above the table naming them.
- **The program's arguments** (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java:136-139`): `GetProgramArgs` cast the varargs factory's result to the old glue's `PrimImmutableArrayObject` (`StringPrim.java:135-141` at 157323e5), which no longer exists for a plain object, so `System` would have stopped as it loads; it now fills the array through `IndexedArrayWrapper`, the array's own `init`, as walk fills a varargs array (`interpreter/evaluator/values/NonPrimitive.java:243-247`).

The bindings, by the record's count (comments and `(*)` lines struck, strings kept): 341 helpers and 102 glue of 443 at 157323e5; 348 and 95 of 443 at `fe19fdad`.

## The tests, failing and passing

The walk tests: `ProjectFortress/tests/ArrayStoreWalk.fss` (a guard: arrays of each rank, a vector, a matrix, a tabulated `RR64` vector, immutable arrays, freeze and thaw, a list, varargs, the program's arguments, a second fill of a mutable array, parallel writes of distinct elements, atomic read-modify-writes of one element of a `ZZ32` vector and of an array of objects from a parallel `for`); `ArrayStoreRR64Walk.fss` (`PrimImmutableRR64Array` made through its constructor and read); `ArrayInitOnceWalk.fss` (a second initialisation keeps the first value, mutable and immutable); `ArrayOpsMisspeltWalk.fss` with `.test` (a misspelt `arrayOps` name refused at load). The compiled store's test: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ArrayStoreJUTest.java`.

Failing on the base's code, before the edit was first built (my tree held only the tests):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-array-store/h-base ProjectFortress/tests/ArrayStoreWalk.fss ProjectFortress/tests/ArrayStoreRR64Walk.fss ProjectFortress/tests/ArrayInitOnceWalk.fss   (02:46:00 UTC)
    tmp/rung-array-store/h-base/tests/ArrayStoreRR64Walk.fss:7:9-33:
        Function PrimImmutableRR64Array is not defined.
    FAIL: a ZZ32: 8 =/= a ZZ32: 6; an immutable array of ZZ32 filled twice
    Tests run: 3,  Failures: 3,  Errors: 0

(`ArrayStoreWalk` failed in that run on a spelling of mine, `i.asZZ64`, which walk's library lacks; respelt as an `RR64` tabulation, it passed on the base: `harness-one.sh ... ArrayStoreWalk.fss`, 02:46:58, `OK (1 test)`, and at one thread, `FORTRESS_THREADS=1 ../bin/fortress tests/ArrayStoreWalk.fss`, `PASS`, exit 0.)

    ant testOnly -DtestPattern=ArrayStoreJUTest   (02:48:33 UTC)
        [javac] .../compiler/runtimeValues/ArrayStoreJUTest.java:7: error: cannot find symbol
        [javac] import com.sun.fortress.nativeHelpers.arrayOps;
        [javac] 50 errors
    BUILD FAILED

The refusal test on the old code, through the base build's harness:

    FORTRESS_HOME=/home/user/fortress-base28 /home/user/fortress-base28/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-array-store/old-harness ProjectFortress/tests/ArrayOpsMisspeltWalk.fss ProjectFortress/tests/ArrayOpsMisspeltWalk.test
    junit.framework.AssertionFailedError: Refused at load, but did not satisfy load_exception_contains; expected
    ArrayOps$makeStore not found.
    Tests run: 1,  Failures: 1,  Errors: 0

(the base refuses the string too, 'Native helper class com.sun.fortress.nativeHelpers.arrayOps not found.').

Passing, on `fe19fdad`'s code:

    harness-one.sh $PWD/tmp/rung-array-store/h-new ArrayStoreWalk.fss ArrayStoreRR64Walk.fss ArrayInitOnceWalk.fss nativeArrayTest.fss nativeImmutableArrayTest.fss   (03:04:17, four threads)
    OK (5 tests)
    harness-one.sh $PWD/tmp/rung-array-store/h-new ArrayOpsMisspeltWalk.fss ArrayOpsMisspeltWalk.test
     OK Saw expected refusal at load
    FORTRESS_THREADS=1 ../bin/fortress tests/<each of the three>.fss   ->   PASS, rc=0 for each
    ant testOnly -DtestPattern=ArrayStoreJUTest
        [junit] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.117 sec

The unit test's six cases: outside a transaction on a thread of no pool and on the pool (a second `init` ignored, `put` then `get`, an empty element refused with `IllegalStateException`, an index past the end with `ArrayIndexOutOfBoundsException`); inside a transaction (a transaction reads its own write; a nested transaction reads its parent's write and the parent its child's); an aborted transaction's `put` and `init` are not seen and the retry's are; four tasks on a `FortressTaskRunnerGroup(4)` meet at a barrier, so they run at once on four threads (asserted: 4 thread names), and each adds 1 into one element 2,000 times inside the compiled atomic protocol, with a cell updated in the same transactions: the element's total is 8,000 and the cell's too; and the RR64 store. Against a scratch copy of `FortressArrayStore` whose `get` and `put` bypass the transaction, compiled ahead of the build on the class path, two cases fail: `java -cp tmp/rung-array-store/break/classes:$CP:junit.jar junit.textui.TestRunner ...ArrayStoreJUTest`:

    Caused by: junit.framework.AssertionFailedError: the aborted write is not seen expected:<1> but was:<99>
    2) testFourTasksAddIntoOneElementInsideAtomic(...)junit.framework.AssertionFailedError: the element's total expected:<8000> but was:<8804>
    Tests run: 6,  Failures: 2,  Errors: 0

The whole suites, once each on `fe19fdad`'s code (fork 2):

    nice -n 19 ant testSystem   ->  Tests run: 197, 195, 201, 189 (782), Failures: 0, Errors: 0 each; BUILD SUCCESSFUL; Total time: 5 minutes 11 seconds
    nice -n 19 ant testQuick    ->  Tests run: 86 (library), 263 (othercompiler), 1447 (compiler), Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 6 minutes 1 second
    ant testOnly -DtestPattern=NamingCzarJUTest  ->  Tests run: 3, Failures: 0, Errors: 0

The landed summary has 778 interpreter tests (`compile-ladder/climb-batch-27/gate/summary.txt`, `system-0` to `system-3`); 782 is those and my four files. testQuick's counts equal the landed ones. No test's verdict changed; the walk suite's array, vector, matrix and atomic tests are among the 782.

The four-thread atomic runs (`gate.md`, "The atomic runs"), after the library order on my tree (five compiles, rc=0 each, five jars):

    # atomic <each of the 14 programs> run1..run3 threads=4 PASS    ->  42 of 42 PASS

## The measure, the stages and the ladder

The quick pair once on my tree, after the last change of code (`explorations/coordinator/tools/mg-run.sh tmp/rung-array-store/mg rung-array-store`, 03:22:20 to 03:23:08 UTC; nproc 4, Intel Xeon @ 2.10 GHz, 2100 MHz, load 1.60 at the start, JDK 25.0.4.1, FORTRESS_THREADS=1):

    MicroGptAplQuick:  VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS   rc=0 secs=48
    MicroGptFlatQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS   rc=0 secs=42

Both under P-30's minute; the pair's wall time was 48 s. Climb batch 27's landing gave 42 s and 35 s. Walk was not timed old against new (fork A3).

The count stage, on `fe19fdad`, after the last edit was built (`checker-count/run.sh tmp/rung-array-store/checker-count-postedit.txt tmp/rung-array-store/cc-post`): `#total 0`, `#locations 0`, `#crash none`; `diff explorations/compile-ladder/climb-batch-27/gate/checker-count.txt tmp/rung-array-store/checker-count-postedit.txt` prints nothing.

The distance stage, on `fe19fdad` (`distance/run.sh tmp/rung-array-store/distance-postedit.txt tmp/rung-array-store/dist-post`, 145 s): `#total 0`, every kind 0, `#crash none`. `compare.sh` against climb batch 27's table:

    DISTANCE SAME   0
        crash gone   decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
        crash gone   stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1
        crash new    none

`dist-post/errors.tsv` holds only its header, as does `explorations/compile-ladder/gate/distance-sites.tsv`, so no site moved. The two crash rows, row 929's, are gone on this tree: `value object Char` moved down 8 lines with the two native objects, and the sort did not meet its refusal; I declare nothing. `NativeArray`, now a plain component, passes every stage of the distance stage, its export check included (`@@SC STAGE component NativeArray typecheck errors=0`, `overloading errors=0`, `export errors=0`), and so do `FortressBuiltin`'s with the two objects.

The ladder subset: none of the baseline's recorded first errors names a declaration that the change touched (the array errors there name the compiler's prelude's missing types, `ImmutableArray is undefined.`), so the subset is the eight programs of the baseline's `pass-list.txt` that use `atomic`, which run the changed transaction: `tests/atomic0`, `atomic2`, `atomic3`, `atomic4`, `atomicTest`, `nestedTransactions1`, `nestedTransactions2`, `nestedTransactions4`. Drivers copied under `tmp/rung-array-store/ladder/` as `gate.md` says, with the caches copied after the library order. Each is `pass`, as in `compile-ladder/climb-batch-27/gate/ladder/ladder.tsv`, and each output equals the baseline's `raw/` after the `Operation took` line is masked.

## Where the fix belongs, and the precedent

`explorations/coordinator/map/modules-and-phases.md`'s B.11 (the runtime) and B.12 (the natives) place the change: the one library's bindings, walk's loader (`interpreter/glue/NativeApp.java`), the helpers of `nativeHelpers/` and the compiled run time (`runtimeSystem/`). The library's own way for a type that both paths name and that holds a Java value is P-164's: a trait of `FortressLibrary`, a private native object below it in `FortressBuiltin`, and a walk-world table entry. Sites of that precedent today: one native object below a library trait in `FortressBuiltin.fss` (`JavaBufferedWriterObject`, `:798`), two class entries in the walk-world table (`NamingCzar.java:492-493`), and two names in P-167's table (`NativeApp.java:49-52`). A store in a field is the library's own: `__DefaultVector`'s `mem` (`Library/FortressLibrary.fss:2672`) and `Array2`'s and `Array3`'s. The read at `T` follows the library's `cast` (`Library/FortressLibrary.fss:33-36`), as `List`'s `ArrayList` already reads its store (`Library/List.fss:313`).

The ways the language and the library offer, and the choice: the store as a generic trait (the checker refuses a read at `T` against the helper's `Object`, `NamingCzar.java:487`; fork A2); one trait for both stores (a `double[]` class cannot implement it at `Any`); a checker rule for a binding at a type parameter instead of `cast` (fork A3, not taken); walk carrying the store as an `Object` (the review's way (c), which takes walk's writes out of walk's transactions); a cell per element (shape (i), Q2's way not taken).

## What the specification settles

The specification asks that updates of shared elements be made inside `atomic` and that a subscript keep the atomicity of the store (`Specification/basic/memory-model.tex:68-75`, `:133-141`); both stores keep it, walk's by `AtomicArray`, the compiled by the slot keys. The library chapter, typeset from the api, says a re-initialization signals an error (`Library/FortressLibrary.fsi:1510-1515`); neither store signals one (row 466). It asks `i IN bounds()` of a subscript (`Library/FortressLibrary.fsi:1395`) and says nothing of what a subscript out of bounds does.

## Programs run old against new

- `tmp/rung-array-store/probes/ProbeArr1.fss` under walk: base 'immutable ZZ32 fill twice: 4 4', 'immutable String fill twice: y y'; new '3 3', 'x x'. Mutable arrays '3 3' and 'x x' on both. A vector's subscript 5 raises `FailCalled` on both; a `PrimitiveArray`'s ends both runs with 'java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 2' (NEW-A-1).
- `ProbeSize.fss`, `array1[\ZZ32, 3000000000\](7)`, under walk: base 'java.lang.NegativeArraySizeException: -1294967296'; new 'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type Long' at `NativeArray.fss:16:25-45` (row 527).
- `nested/NestedReadOwnWrite.fss` compiled (`var x`, `var z`; `atomic do x := 2; y: ZZ32 = x; atomic do z := 1 end; w: ZZ32 = x; println(y + w) end`): `timeout 30 ... run` exits 124 on the old code and on mine, at one thread and at four; `NestedNoEarlyRead.fss`, without the read `y`, prints 4 and PASS on both (NEW-A-2).
- `ArrayOpsMisspeltWalk.fss`: refused at load on both, with different messages (above).
- The skeptic's programs (`SKEPTIC.md`): under walk, `immutableArray[\ZZ32\](3).fill(4)[7]` in a `try` ended on the base with walk's internal error 'Array index 7 out of bounds, length=3' at the subscript, from the immutable glue's own check (`interpreter/glue/prim/PrimImmutableArray.java:64-70` at 157323e5), and ends on this branch with 'Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException' and no Fortress location, as a `PrimitiveArray`'s did on both (NEW-A-1); a read of an element that holds nothing names the store, 'Access to uninitialized element 1 of array JavaArrayStoreObject', where the base named the array, '... of array PrimitiveArray[\ZZ32,3\]'. On the compiled path, an `atomic` block nested in another in one body loses updates at four threads on the base and on this branch alike (NEW-A-3).

## The demos

The team's 52 demos under walk, by the driver of `rung-team-demos/REPORT.md`, section 13, on `fe19fdad` (`bash tmp/run-demos.sh tmp/rung-array-store/demos`), 03:28:54 to 03:57:09 UTC: 'demos: 52 run, 52 reached their end'. The brief leaves the demos to the gather; this run is the rung's own, since the change edits walk and its library (`tests-running.md`, "Outside the gate").

## Sentences made false

- `Specification/appendices/changes.tex:4625`, "341 of the 443 bindings of \library\ name a helper", and `:4658`, "The other 102 still name a glue class": on this branch 348 and 95. `:4654-4657`, "Two of the helpers named ... the interpreter does not load: it answers each with an operation of its own": now nine, the seven of `arrayOps` beside `typeName` and `sEquiv`; the list of helpers at `:4625-4653` lacks the arrays' stores. The gather writes the merged count (fork 5).
- F-299, "341 of the one library's 443 live bindings name one" and "the other 102 name glue classes": 348 and 95 here; its sentence that walk runs its own operations for `stringOps.typeName` and `equality.sEquiv` only.
- F-32, "the Java classes that 102 of the one library's 443 live native bindings still name": 95; and its "The last two have no compiled analogue", of `NativeArray`, and "`NativeArray`'s 7 move onto a compiled store before array decision A (P-169)": they have their compiled store on this branch.
- F-11 and F-18 stay true: the compiled store holds boxed elements, an `Object[]` of `FRR64` for an `RR64` array, and the `double[]` class exists but no factory chooses it, so no array is unboxed (P-84, P-85).
- PLAN, `explorations/coordinator/PLAN.md:47`, "Since climb batch 27, 341 of the 443 live bindings name helpers and 102 still name glue classes"; `:56`, D2's line, "So they move onto a compiled store before the switch-over" and `:96`, "`NativeArray`'s bindings, D2's, move onto the compiled store before decision A, in climb batch 28's rung A": done on this branch; `:67`, "whose glue builds a `PrimImmutableArray` (`interpreter/glue/prim/StringPrim.java:113-140`)": it now fills one through the array's `init`.
- The `fortress-repo` skill: `references/compiler.md:76` ("The runtime"), the compiled code keeps each mutable variable in a cell and the transaction tracks the variables that the block touches: it also tracks the elements of the one library's array store, by array and index; `SKILL.md:123`, "Inside an `atomic` block, the compiled code tracks each mutable variable that the block reads or writes", likewise; `references/interpreter.md`, "Natives", names P-167's two answered helpers only through F-328 and not the `arrayOps` rule.

## Points to report

- The store traits, their factories and walk's native objects as declared (`Library/FortressLibrary.fss:2391-2406`; `Library/FortressLibrary.fsi:1610-1627`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:53-59`); the loader's rule (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:181-188`, `:220`) onto `interpreter/glue/prim/ArrayOps.java:25-73`.
- The compiled store classes, shape (ii), and `arrayOps`' helpers with their Java signatures (above; `nativeHelpers/arrayOps.java:15-41`, `compiler/runtimeValues/FortressArrayStore.java:35-67`, `FortressRR64ArrayStore.java:9-29`); the change to `runtimeSystem/Transaction.java` (`:25-79`, `:203-231`, `:247`, `:266`, `:292-297`, `:318`, and the nested commit's two loops), 99 changed lines.
- `PrimitiveArray`, `PrimImmutableArray` and `PrimImmutableRR64Array` as written (`ProjectFortress/LibraryBuiltin/NativeArray.fss:15-45`); `NativeArray.fsi` before: two objects; after: three (`:18`).
- The cast at a read: `get(i:ZZ32):T = cast[\T\](mem.get(i))` (`NativeArray.fss:18`, `:30`); the quick pair ALL PASS twice, 48 s and 42 s, under P-30's minute.
- The tests before and after through the harness, the compiled store's test at four threads, and the walk suite's atomic tests (all above).
- The count table and the distance table on `fe19fdad`: both 0, equal to the landed ones; the two crash rows gone; no site came.
- No test's verdict changed in `ant testSystem` or `ant testQuick`. Row 466 before: a mutable array's second fill ignored, an immutable array's overwriting; after: both ignored, and the compiled store's too (`ArrayInitOnceWalk`).
- Every sentence made false (above).
- A file edited beyond those named: `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java:26`, `:136-139`. No edit of the code generator, the class loader or the prelude. Not taken, a reserved point: a change of the compiled transaction beyond shape (ii)'s, to repair NEW-A-2.

## Decisions

1. **Shape (ii), one set for both kinds of location.** The read and write sets are keyed by `Object`, a cell or a `Slot`, as the planner's measured model shares them (PROBES.md, probe 1); not separate slot sets, which cost 250 to 550 ns a transaction in the model.
2. **Outside a transaction an element is read and written volatile**, the cell's memory semantics (`MutableFValue.java:18`); not plain, which probe 1 measured at 17.8 ns against 24.1 ns a read and write.
3. **`init` inside a transaction is a transactional read and write; outside one a compare-and-set from null.** So an aborted attempt's initialisation is not kept, as walk's `AtomicArray.init` goes through `ReferenceCell.assignValue` (`interpreter/env/ReferenceCell.java:206-209`); the test checks it. Not taken: a compare-and-set always, which keeps an aborted attempt's value.
4. **A read of an element that holds nothing raises `IllegalStateException` with walk's message**, and `TXReadLocation` records no location that holds nothing, for cells too, where `Hashtable.put` threw `NullPointerException` before and a compiled cell never holds null. Not taken: a sentinel in the read set; a Fortress exception, since no exception that both libraries declare fits.
5. **An index is checked before a write is buffered** (`FortressArrayStore.java:40-43`), since a write that failed at commit would leave the global lock held. Not taken: let the commit throw.
6. **The store finds its transaction only on a `FortressTaskRunner`** (`FortressArrayStore.java:35-38`), so a store used off the compiled pool, from a class initializer or a JUnit thread, reads and writes plainly. Not taken: `VarCodeGen`'s `BaseTask.inATransaction()` (`VarCodeGen.java:329-333`), which casts the thread and throws off the pool.
7. **Names**: `FortressArrayStore` and `FortressRR64ArrayStore`, as P-164 names `FortressBufferedWriter` for `JavaBufferedWriter`; `arrayOps`' seven names distinct, `make`, `get`, `put`, `init`, `makeRR64`, `getRR64`, `initRR64`, so that one rule maps each name to one operation and the checker's rewrite meets no overloaded helper. Not taken: `get` and `init` overloaded over the two store classes.
8. **Walk's rule maps onto one new glue class named for the helper class, `ArrayOps`** (fork A4's one rule). Not taken: the three old glue classes as targets, which needs a table, A4's way not taken; operations in the two native-object classes, which needs two rules.
9. **The three old glue classes stay in the tree, unchanged and unused**, as rung R's R3 and rung W left theirs; their operations are re-targeted by moving into `ArrayOps`. Not taken: delete them; edit them in place.
10. **A store's walk value is an `AtomicArray` made with the native constructor**, as `PrimitiveArray.java:34-35` made one, not a wrapper around one; an RR64 store's value is a nested `Value` over a `double[]`.
11. **`PrimImmutableArray` over the same `JavaArrayStore`** (forks A2, A5, A7): under walk its store becomes an `AtomicArray`, so its second initialisation is now ignored where it overwrote (`PrimImmutableArray.java:73-82` at 157323e5), and its reads inside `atomic` join walk's transaction. Not taken: keep the overwrite in Fortress text, `init` and then `put` on refusal; a third store trait for immutable arrays.
12. **`PrimImmutableRR64Array` joins `NativeArray`'s api**, since the brief's test makes it through its own constructor, which the base refuses ('Function PrimImmutableRR64Array is not defined.'). No factory chooses it.
13. **`JavaRR64ArrayStore` excludes `JavaArrayStore`** beside the I/O traits' list.
14. **The field `mem` is plain**, as `__DefaultVector`'s (`Library/FortressLibrary.fss:2672`). Not taken: `private` or `hidden`.
15. **The program's arguments are filled through `IndexedArrayWrapper`**, as `NonPrimitive.java:243-247` fills varargs. Not taken: read the object's `mem` and call the store.
16. **The walk tests split three ways**, a guard and two tests that fail on the base, and a refusal test; no gated test exercises a subscript out of bounds, since the library's `fail` prints `FAIL:` (`Library/FortressLibrary.fss:54-56`), which the harness reads as a failure, and a `PrimitiveArray`'s subscript ends the run (NEW-A-1).
17. **The unit test's four tasks meet at a barrier on a pool of four threads of their own**, so they run at once whatever `FORTRESS_THREADS` is, and the test asserts the four threads.
18. **The ladder subset is the pass-list's eight `atomic` programs**, since no recorded first error names a touched declaration.
19. **NEW-A-2 is recorded, not repaired**: its repair changes the compiled transaction beyond shape (ii), a reserved point. The unit test avoids it: no transaction reads its own write before a nested commit.
20. **Row 466's claim widens** to the immutable array and the compiled store, with `ArrayInitOnceWalk` as its reproducer, a test of today's behaviour (home 3: the fix, validate or revise the footnote, is open).

## Defects and their homes

- The store moves (the compiled store, walk's rule, the RR64 store exported): home 1, `ArrayStoreWalk`, `ArrayStoreRR64Walk`, `ArrayOpsMisspeltWalk`, `ArrayStoreJUTest`.
- Row 466, a second initialisation ignored, now also of an immutable array and of the compiled store: home 3, `ArrayInitOnceWalk` and the row's new line (the fix is open between validating and revising the footnote).
- Row 527, an array size from 2^31 to 2^32-1: home 3, the row's new line; no gated test can tell a stop from a refusal.
- NEW-A-1, a `PrimitiveArray`'s or `PrimImmutableArray`'s subscript out of bounds ends walk with a raw Java exception: home 3, a ledger row; the specification states only the precondition, and no gated test passes while the run dies.
- NEW-A-2, a compiled transaction that reads its own write and then commits a nested one never ends: home 3 by necessity, a ledger row with the command; the specification settles it (`basic/expressions/atomic.tex`, "Atomic Expressions"), but an `XXX` test would hang the suite, since the compiled run step waits with no timeout (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:585`).
- Row 324's line citations moved with the edit: the row's new line.
- NEW-A-3 (found by the skeptic's programs), an `atomic` block nested in another in one body on the compiled path hands its abort to the outer block's handler and loses updates at four threads, at 157323e5 and on this branch: home 3 by necessity, a ledger row with the commands and counts, as row 319 records a compiled race; the specification settles it (`basic/expressions/atomic.tex`, "Atomic Expressions"), but it shows only when an abort falls inside the inner block.
