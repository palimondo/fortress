<!-- The probes of climb batch 28's planner, 2026-11-07 and 2026-11-08: Q2's two shapes of the compiled array store measured in a Java model on the compiled run time's own classes; row 929's sort made correct on a partial order, with the distance stage and the count stage before and after; the checker over `System` with rung S and with Q3's default; rung T's wall on today's tree; the compiled reader against walk's at the end of a file; the count of bindings. Written by the planner of climb batch 28 against `main` at `2436f6f25`, whose code is climb batch 27's landed code (`git diff --stat 29e52a3dc 2436f6f25 -- Library ProjectFortress Specification build.xml bin` prints nothing). -->

# Climb batch 28: the planner's probes

**The trees.** Two worktrees of my own, both at `2436f6f25`, built in place by `ant compileAll`, the library order and one walk run (the `fortress-repo` skill's `worktrees.md`, "Finding or building a base build"), and removed after: `/home/user/fortress-p28`, which held the prototype of probe 2, and `/home/user/fortress-p28b`, the base, which never held an edit but the scratch edits of probe 3, each restored. No base build of climb batch 27 survived the container's loss at 23:09 UTC, so neither tree was seeded. Nothing ran in `/home/user/fortress`.

**The machine.** nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz; openjdk 25.0.4.1; `FORTRESS_THREADS=1`; loads at each start in its row below. No other agent built or ran on the machine while these ran, as far as `uptime` shows.

**The programs** were scratch, under each tree's `tmp/`, and are not kept; each probe gives what reproduces it.

## Probe 1. Q2: the compiled array store's two shapes

**The question** (review-queue item 407; `reviews/natives-device-2026-11-07.md`, section 3.5): the compiled store of P-169 holds its elements (i) as one `MutableFValue` cell per element, which the compiled transaction tracks as it is, or (ii) as a plain `Object[]`, with the transaction's read and write extended to an array and an index. What does each cost a compiled program before decision A?

**The model.** A Java program on the compiled run time's own classes from the tree's build (`ProjectFortress/build`): `BaseTask`, the task pool `FortressExecutable.group`, `Transaction`, `MutableFValue`, and `FRR64`, the compiled boxed `RR64`. Each loop runs inside a `BaseTask` on the pool, so `BaseTask.inATransaction()` and `getCurrentTransaction()` work as in compiled code; a transaction is `BaseTask.startTransaction()` ... `endTransaction()`, retried on `TransactionAbortException`, as the code generator's `forAtomicBlock` emits it (`compiler/codegen/CodeGen.java:1737-1770`).

- **Shape (i), a cell per element:** a `MutableFValue[]`, each cell holding an `FRR64`. A read is `inATransaction() ? getCurrentTransaction().TXRead(c[i]) : c[i].getValue()`, a write `TXWrite(c[i], v)` or `c[i].setValue(v)`: the code the code generator emits for a mutable variable (`compiler/codegen/VarCodeGen.java:310-371`, `MutableStaticBinding.pushValue` and `assignValue`). The tree's `Transaction` is used unchanged.
- **Shape (ii), a slot API:** an `Object[]` of `FRR64`. Outside a transaction a read is `a[i]` (plain), or a volatile read by a `VarHandle` (`slotVolatile`), the memory semantics of the cell's `volatile` field (`compiler/runtimeValues/MutableFValue.java:18`). Inside one, `TXReadSlot(a, i)` and `TXWriteSlot(a, i, v)` on a copy of `runtimeSystem/Transaction.java`, put ahead of the build on the class path, whose read and write sets are keyed by a location: a cell, as today, or a `Slot` of the array and the index (`hashCode` the array's identity hash times 31 plus the index). Validation and commit, top-level and nested, read and write each kind; the copy differs from the tree's file by 73 lines of `diff`. A first copy with separate slot sets, made at each transaction, cost a transaction per element 250 to 550 ns; the copy measured shares the sets, and its cell path costs what the tree's does (below).
- **`unboxed`:** a `double[]`, decision A's shape (P-84), for scale; no transaction.
- **The loops,** per shape, each in a JVM of its own (`-Xmx4g`), five rounds of the four shapes and a control of shape (i) on the tree's own `Transaction`, alternating: a read of 1,000,000 elements summed, outside a transaction; a read and a write of each of them, `s.put(i, s.get(i) + 1.0)`, outside a transaction; the same over 100,000 elements inside one transaction; the same over 100,000 elements, a transaction for each element. Each figure is the median of 15 timed runs after 10 untimed (9 after 5 for the two in transactions), per element. Memory: the heap in use after four `System.gc()` calls, before and after making 1,000,000 elements, per element, twice.

**The results,** the median over the five rounds, with the range over them (`tmp/q2/run2.txt`, 23:30:40 to 23:31:39 UTC, load 0.87 at the start, 1.29 at the end):

| shape | read, outside | read and write, outside | read and write, in one transaction | a transaction per element | bytes per element |
|---|---|---|---|---|---|
| (i) cell, the tree's `Transaction` | 2.16 ns | 24.6 ns (23.8 to 25.5) | 208 ns (198 to 215) | 175 ns (174 to 180) | 44.4 |
| (i) cell, the model's `Transaction` | 2.25 ns | 24.2 ns (23.6 to 27.0) | 209 ns (205 to 220) | 182 ns (174 to 192) | 44.5 |
| (ii) slot, plain outside | 1.66 ns | 17.8 ns (17.6 to 18.2) | 118 ns (115 to 151) | 182 ns (172 to 203) | 28.4 |
| (ii) slot, volatile outside | 1.81 ns | 24.1 ns (22.9 to 27.3) | 118 ns (113 to 122) | 178 ns (168 to 202) | 28.4 |
| `double[]` | 0.61 ns | 0.29 ns | none | none | 8.4 |

**What the numbers say.**

1. **Memory.** A cell per element costs 44 bytes for an `RR64` element against the slot API's 28: the reference (4 bytes, compressed), the `MutableFValue` (16) and the `FRR64` box (24), against the reference and the box. Decision A's `double[]` costs 8. A model whose parameters were all `RR64` arrays would hold 5.3 times its floats' bytes in shape (ii) and 8.3 times in shape (i).
2. **Outside a transaction,** where microGPT's lines run (no `atomic` in `explorations/run-c4/src/*.fss` or `explorations/apl/mg/*.fss`, by `grep -n atomic`), a read costs 2.2 ns in shape (i) against 1.7 to 1.8 ns in shape (ii), and 0.6 ns unboxed; a read and a write cost 24 ns in shape (i) against 18 ns plain or 24 ns volatile in shape (ii). Both are dominated by the box: each write makes an `FRR64`, which `double[]` does not. Between the two shapes the difference is at most a third of the cost of a write, and none where shape (ii) reads and writes with the cell's memory semantics.
3. **Inside a transaction** that reads and writes many elements, shape (ii) costs 118 ns an element against 209: about 45 % less, from the slot keys' cheaper hashing in the read and write sets. With a transaction for each element the two are equal, about 180 ns, since the transaction's own start, validation and commit cost more than the element.
4. **The cell path does not change with the slot API** when the sets are shared: the model's cell figures equal the tree's within the ranges.

**What each shape changes in the tree.** Both shapes share the library's text (the store trait, `PrimitiveArray` and `PrimImmutableArray` over a field, the `cast` at a read), walk's half (`AtomicArray`, P-167's device), the helper class `nativeHelpers/arrayOps` and its signatures, and the checker's table entry. They differ only inside the compiled run time:

- **(i)** a compiled store class over a `MutableFValue[]`, its cells made with the store; `arrayOps`' `get` and `put` test `BaseTask.inATransaction()` and call `TXRead` and `TXWrite` on the element's cell, as `VarCodeGen` does for a variable. `runtimeSystem/Transaction.java` and `BaseTask.java` are unchanged, and so is every compiled `atomic`. It is walk's own shape: walk's `AtomicArray` holds a `ReferenceCell` per element (`interpreter/evaluator/transactions/AtomicArray.java`).
- **(ii)** a compiled store class over an `Object[]`; `runtimeSystem/Transaction.java` gains a location key, `TXReadSlot` and `TXWriteSlot`, and slot cases in its two validations, its commit and its nested commit (73 lines in the model); element reads and writes inside the protocol go through a `VarHandle`, volatile, so that validation sees a commit. It is new code in the transaction that every compiled `atomic` runs, which the gate's 42 atomic runs at four threads (`fortress-repo`, `compiler.md`, "Testing an edit here") and the rung's own tests at four threads must hold.
- **Either can follow the other** by a change of the store class and, for (ii), of `Transaction.java`: the library, walk, the helpers' signatures and the table entry stay. So the choice can be undone, at the cost of one rung of run-time work.

Not measured: several threads, contention and aborts; the cost of the library's `cast[\T\]` at a compiled read, which both shapes pay; the model's own programs, which do not compile before the switch-over (F-97).

**To reproduce.** The model is 200 lines of Java; its loops are the four above, for example `for (int i = 0; i < s.size(); i++) s.put(i, s.get(i) + 1.0);`. Compile it against `ProjectFortress/build`, the model's `Transaction.java` into a folder of its own, and run each shape as `java -Xmx4g -cp <model>:<transaction copy>:ProjectFortress/build Q2Model <shape>` with `FORTRESS_THREADS=1`; the control leaves the copy off the class path.

## Probe 2. Row 929: a sort that is correct on a partial order, and its time

**The defect, reproduced on `2436f6f25`.** The distance stage on the base tree (`explorations/coordinator/tools/distance/run.sh tmp/dist-base.txt tmp/dist-base`, 23:33:16, load 0.29):

    #total	0
    #crash	decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
    #crash	stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1
    #seconds	140	FortressLibrary 87

the gate's two rows of climb batch 27 (`compile-ladder/climb-batch-27/gate/distance.txt`).

**A compiled reproducer.** A program of two chains of traits, `T0` to `T7` and `U0` to `U7`, each extending the one before, objects `A extends T7` and `B extends U7`, and the 64 declarations `f(x: Ti, y: Uj): ZZ32 = 100 i + j` in a shuffled order with blank lines between them, so that every pair nests or has its meet declared; `run` asserts `f(A, B)` is 707. Twelve shuffles were compiled on the base; one, the shuffle of Python's `random.Random(103)`, stops the compile:

    $ bin/fortress compile SortCandidates103.fss
    Exception in thread "main" java.lang.IllegalArgumentException: Comparison method violates its general contract!
        at java.base/java.util.TimSort.mergeLo(TimSort.java:781)
        ...
        at com.sun.fortress.scala_src.typechecker.impls.Functionals.typedApplicationOfChecked(Functionals.scala:761)

and the other eleven compile. Six shuffles of the 36 declarations of six-trait chains all compiled. So the crash needs 32 candidates or more and an order that TimSort's merge catches, as the row says; the program's text sets the order.

**The prototype.** A class `scala_src/useful/PartialOrder.scala` (60 lines): over a list and a strict order `lt`, read at most once a pair through a memo of n² bytes, `minimal` keeps in the list's order the elements that no other element is `lt`, and `linear` is a linear extension, each element after every element `lt` it and otherwise in the list's order, taken by picking, round by round, the first element of the list with no predecessor among those left; on a cycle it takes the first left. The four sites:

- `Functionals.scala:717`, `minimal`: `new PartialOrder[Ranked](cs, moreSpecific).minimal`.
- `Functionals.scala:728`, `callType`: the head of `minimal(cs)`, or `cs.head` where it is empty, in place of `cs.sortWith(moreSpecific).head`; it sorts nothing.
- `Functionals.scala:761` and `:776`: one `PartialOrder` over the candidates; `sorted` is its `linear` and `top` its `minimal`, so they share the memo.
- `CoercionOracle.scala:255` and `Formula.scala:609`: `PartialOrder.linearize(list)(lt)` with the predicate that each `sortWith` took.

One difference from the old `minimal`, which the rung keeps out: the old code skips a candidate only against itself by reference (`d eq c`), the prototype by position, so a list that held one object twice would read the two as each other's predecessors.

**The results** on `/home/user/fortress-p28` with the prototype built (`ant compileAll`, 21 s):

- The distance stage (23:36:46, load 1.76): `#total 0`, `#crash none`, `#seconds 145 FortressLibrary 90`. `diff` of the two tables prints only the crash rows. The two `run.txt` files, each tree's path replaced by `TREE`, differ only in the crash's lines, where the prototype's reads `@@TC DECL-OK ObjectDecl TREE/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:661:1-773:2 errors=0`, and in seconds. So `value object Char`'s body, with its 41 helper bindings, now checks, with no error.
- The count stage, base and prototype, each run alone (23:45 and 23:42, loads 1.42 and 1.76): 88.9 s and 88.9 s; the two tables are equal to each other and to climb batch 27's gate table (`diff` prints nothing), and the two `run.txt` files are equal after the path is replaced.
- The reproducer: `bin/fortress compile SortCandidates103.fss` exits 0 and `bin/fortress run SortCandidates103` prints `PASS`, rc 0.

So the linear extension is correct on a partial order and costs no measurable time: 145 s against 140 s for the distance and equal counts, inside the noise of one run each (P-148's smoke test), where the brief records a rank sort at 299 s against 137 s. The prototype makes fewer comparisons than the code it replaces where it can: `callType` stops sorting, and the sort shares `minimal`'s answers.

Not run: `ant testSystem`, `ant testQuick` and the compiler track on the prototype; the audit of the memo that `compiler.md`, "The checker's time", step 5, asks of a reuse; a profile.

## Probe 3. The checker over `System`, with rung S and with Q3's default

The driver of climb batch 27's probe 3 (`CLIMB-BATCH-27.md`, section 5): `WorldFlip -stop check Library/System.fss` against the one library, compiled from `explorations/coordinator/tools/checker-count/`, a fresh caches folder for each run, in `/home/user/fortress-p28b`.

- **The base:**

      Internally generated library name, in source code NamingCzar.:0:0:
          FortressBuiltin.StringVector is undefined.
      File System.fss has 1 error.

- **Control A, rung S's strings off `systemOps`** (both on `simpleConcatenate.nativeConcatenate`, whose Java signature is theirs): the component is reached, with the two errors of climb batch 27's control, at `args` and `getProgramArgs`:

      Library/System.fss:29:40-73: Could not check call to function getProgramArgs
      Library/System.fss:35:5-68: Function body has type ImmutableArray1[\String,0,n\], but declared return type is NativeArray.PrimImmutableArray[\String,n\].
      File System.fss has 2 errors.

- **Control B, control A and Q3's default:** `args` built in Fortress, `immutableArray[\String\](programArgCount()).tabulate(fn (i:ZZ32): String => programArg(i))`, over two private scalar bindings standing in for the two helpers, `programArgCount(): ZZ32` on `runtime.numThreads` and `programArg(i: ZZ32): String` on `simpleIntArith.intToString`, with `getProgramArgsPrim` and `getProgramArgs` deleted:

      @@PROBE checkApi System -> errors=0
      @@PROBE checkComponent System
      ### rc=0

  The checker reads `System` whole with no error. Under walk, the same text with a program that prints `|args|` and `args[0]` printed `|args| = 1; args[0] = 0`, the stand-ins' answers, rc 0.

`Library/System.fss` was restored after each run (`git status --porcelain Library/` prints nothing).

## Probe 4. Rung T's wall on today's tree

Row 733's form, the api `Q1ApiC` with `trait C abstract tag(self, n: ZZ32): String end` and its component compiled, then `TraitTableP.fss` with `trait D tag(self, s: String): String = s end` and `object O extends { C, D } tag(self, n: ZZ32): String = "c" end`, compiled with `-debug stacktrace`, in `/home/user/fortress-p28b`:

    Exception in thread "main" java.lang.RuntimeException: Not in the trait table: C
        at com.sun.fortress.scala_src.types.TypeAnalyzer.typeCons(TypeAnalyzer.scala:884)
        at com.sun.fortress.compiler.codegen.CodeGen.dumpMethodChaining(CodeGen.java:1010)
        at com.sun.fortress.compiler.codegen.CodeGen.forObjectDeclPrePass(CodeGen.java:4691)

Walk runs it and prints `cd`. Climb batch 27's rung G moved the code generator's lines by 1 and 11 since that batch's probe 21 (`:1009`, `:4680`).

## Probe 5. The compiled reader against walk's, at the end of a file (rung R), by reading

- Walk's `FileReadStream$readChar` answers the Java `read()`, -1 at the end, and sets `eof` (`interpreter/glue/prim/FileReadStream.java:141-149`). The library depends on the -1: `ReadStream`'s `eofCheckedReadChar` maps it to `char(0)`, and its `characters` generator ends at it (`Library/FileSupport.fss:64-67`, `:113-118`).
- The compiled run time's `FortressBufferedReader.read()`, which `fileOps.jbrRead` answers, returns 0 at the end and sets `eof` (`compiler/runtimeValues/FortressBufferedReader.java:55-70`), for the prelude's `read(): Character = jMakeCharacter(jJavaBufferedReaderRead(self))` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1163`).
- So a `FileReadStream` whose `uncheckedReadChar` named `jbrRead` alone would answer 0 at the end, and `characters` would not end. Read after it, `eof` tells the end from a character 0 on both paths: walk calls the same helper through the carrier.
- The other reader operations agree: `readLine` and `readk` answer `""` at the end on both; `ready` and `close` are the Java calls on both; a read after `consume` raises in both, walk's glue a walk error that no `catch` sees ('Performed operation on consumed FileReadStream …', `reviews/io-objects-carrier-2026-11-06.md`, section 2.2, point 8), the helper `IOFailure` ('Performed operation on consumed reader for …', `FortressBufferedReader.java:118-123`).
- microGPT's lines use `FileReadStream(path)`, `readLine()` until it answers `""`, and `close()` (`explorations/run-c4/src/FlatData.fss:69-86`).

## Probe 6. The bindings at `2436f6f25`

A scratch count over `Library/*.fss` and `ProjectFortress/LibraryBuiltin/*.fss` without the compiler's files, with `(* … *)` and `(*)` comments stripped: 443 live bindings, 341 on helpers and 102 on glue classes, as F-299 and F-32 state. The 102 by file: `FortressBuiltin.fss` 37 (`IntLiteral` 29, `FloatLiteral` 3, `Thread` 4 and `abort`), `Reflect.fss` 28, `File.fss` 15, `Reader.fss` 10, `NativeArray.fss` 7, `FortressLibrary.fss` 4 (`ZZ32`'s `big`, `ZZ`'s `narrow` and `widen`, `printTaskTrace`), `System.fss` 1.
