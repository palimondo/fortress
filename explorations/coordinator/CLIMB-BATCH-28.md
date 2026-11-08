<!-- The record of climb batch 28, the sixth batch of the plan's phase 4, the switch-over, for the coordinating session, the curator and the batch's workers. Drafted 2026-11-07 and 2026-11-08 by an Opus planning worker against `main` at `2436f6f25`, whose code is climb batch 27's landed code (`git diff --stat 29e52a3dc 2436f6f25 -- Library ProjectFortress Specification build.xml bin` prints nothing), so climb batch 27's gate tables (`compile-ladder/climb-batch-27/gate/`) describe the base. A first planner, started about 16:45 UTC on 2026-11-07, was lost with the container at 23:09 UTC before it committed anything; this record starts fresh. Its candidates: the reader rung with `FileWriteStream` (P-164; review-queue item 373), the integer conversions (P-161), climb batch 27's rungs S and T, which never started (item 377), the runtime's own natives by P-169 (threads, the arrays' store under Q2, `IntLiteral`'s 8), `getProgramArgsPrim` under Q3, and row 929's sort under P-148. It proposes seven rungs, two of them waiting on his answers to Q2 and Q3 (section 2). -->
<!-- Sources: PLAN.md, "Where we stand" and phase 4 whole, and "Climb batch 27, listed for his review"; POSITIONS P-169 and its history, P-164, P-161, P-167, P-58, P-148, P-162, P-37, P-38, P-84, P-85, P-76, P-33, cited by number; FACTS F-32, F-34, F-53, F-54, F-298, F-299, F-321, F-328, F-330; the ledger rows 82, 318, 349, 466, 502, 578, 732, 733, 841, 858, 859, 895, 896, 900, 901, 902, 926, 928, 929; review-queue items 373, 377, 403, 406, 407, 319, 355, 380, 383, 384, 385; the reviews `reviews/natives-device-2026-11-07.md`, `reviews/natives-remainder-2026-11-07.md`, `reviews/integer-conversions-2026-11-06.md`, `reviews/io-objects-carrier-2026-11-06.md`; the post-batch review `reviews/batch-27-review.md`, sections 1 to 7 and Part 4; rung W's report `compile-ladder/rung-io-writer/REPORT.md`; `CLIMB-BATCH-27.md` as the form, its rungs S and T and its probes 3 and 21; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the `coordinator` skill's `references/batch.md`; the code at the sites; the specification's sections cited. -->
<!-- The planner's probes: `compile-ladder/plan-28/PROBES.md`, in two worktrees of the planner's own at `2436f6f25`, built in place, since no base build survived the container's loss, and removed after. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, loads 0.04 to 1.76. -->

# Climb batch 28

## 1. The manifest, rung by rung

The batch's generator writes the workflow's manifest from this section. Each rung's `section` is its section 4 heading, word for word. The rungs are in the manifest's order, V, R, A, Q, H, S, T. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-28.md#`, and PROBES for `doc:explorations/compile-ladder/plan-28/PROBES.md#`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read.

**Two rungs wait on his answers before the launch** (section 2, "The questions for the curator"): A, the arrays' store, on Q2; and the second half of S, `System`'s arguments, on Q3. Without Q2's answer, A is left out of the manifest. Without Q3's answer, S runs its first half only, as its section says.

| id | slug | title | expected minutes |
|---|---|---|---|
| V | `rung-integer-conversions` | The integer conversions: the checked getters, `bitsAs…`, the low-bits names on every type, `ZZ`'s `narrow` and `widen` deleted, `big` on its helper, and `IntLiteral`'s 8 over `asZZ` | 60 |
| R | `rung-io-reader` | N4's reader rung: `FileReadStream`, `Reader` and `FileWriteStream` over the Java-backed traits, and `File` and `Reader` plain components | 50 |
| A | `rung-array-store` | The arrays' store: `PrimitiveArray` and `PrimImmutableArray` over a compiled store in a field, walk's `AtomicArray` behind P-167's device, and `PrimImmutableRR64Array` over a `double[]` class | 60 |
| Q | `rung-checker-partial-order` | The checker's four sorts by a partial order made a linear extension, read once a pair | 50 |
| H | `rung-runtime-threads` | The run time's own threads, `abort` and the task trace on compiled helpers that walk's loader answers with its glue | 40 |
| S | `rung-system-natives` | `System`'s natives: `getEnvironment` and `getProperty` onto `stringOps`, and, with Q3's answer, `args` built in Fortress over two scalar helpers | 30 |
| T | `rung-codegen-trait-table` | The code generator's trait table: an object whose first supertrait is an imported api's trait | 35 |

Fields common to the seven rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-io-reader`; **branch:** `wip/<slug>`.
- **writes state:** no. **its test is the stage:** no. **joins the gate:** none. **expected moves:** none. **lands only with:** none: no rung builds on another (section 4, "The rule the rungs keep").
- **expected checker count:** none declared; the count stays 0. **expected checker crash:** none declared. Every rung but T runs both stages on its own tree (section 3, fork 3). On a rung's own tree, without rung Q, the distance shows climb batch 27's two crash rows in `value object Char`, or none, or a crash elsewhere: the crash depends on the hash order of the overloadings' names, which hold declaration lines, so a line moved in `FortressBuiltin.fss` before `Char` can move it (row 929's notes). A rung reports the rows it sees and declares none; a crash with the message 'Comparison method violates its general contract!' is row 929's, not the rung's. Rung Q's tree, and the merged tree, read `#crash none` (PROBES `Probe 2. Row 929: a sort that is correct on a partial order, and its time`).

### V
- **slug:** `rung-integer-conversions`
- **worktree:** `/home/user/fortress-integer-conversions`
- **section:** `V. The integer conversions: the checked getters, bitsAs…, the low-bits names on every type, ZZ's narrow and widen deleted, big on its helper, and IntLiteral's 8 over asZZ (P-161, P-169)`
- **blurb:** P-161, his option 6: on each of ZZ32, ZZ64, NN32, NN64 and ZZ the getters asZZ32, asZZ64, asNN32, asNN64 and asZZ, raising IntegerOverflow where the value does not fit; the four fixed widths' bitsAs… getters; narrow, widen, unsigned, signed and big kept as the low-bits forms and declared on every type where they apply (rows 858, 859); ZZ's narrow and widen deleted, their callers in Format, QuickCheck, the demo sudoku, XXXZZNarrowRungP and rung I's private count functions moved onto .asZZ32 or .asZZ64 with their values unchanged (rows 502, 349); ZZ32's big onto makeZZfromZZ32; with P-169, IntLiteral's 8 conversions and comparisons as Fortress text over its asZZ; basic-integers.tex's sentences with an Appendix I entry.
- **points to report:**
  - Each getter as declared, in the component and the api, and whether it is a Java helper or a Fortress body, with each new helper's Java signature.
  - The 25 getters' answers at their edges under walk, the 13 that can raise among them, and each compiled guard's answers.
  - Each low-bits name newly declared, by type, and each call that reached one through a coercion before.
  - Each caller of ZZ's narrow or widen, with its before and after, the team's lines of Format.fss, QuickCheck.fss and sudoku.fss among them, and rung I's private count functions.
  - IntLiteral's 8 as written, and their answers at the object IntLiteral before and after.
  - The revised sentences, their callouts and the Appendix I entry's Effect; the specification's build: both BUILD SUCCESSFUL lines and the warnings count.
  - The count table and the distance table on your final tree, and any site that comes; the crash rows you see.
  - Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false.
  - A file edited beyond those named, any edit of the prelude, of walk or of the checker, and any other line of a team test or demo changed.
- **briefing** (22 keys, 11 checks):
  - P-161 (check): the decision you build, option 6 of the review.
  - P-169 (check): IntLiteral's 8 as Fortress text over asZZ, before the names batch.
  - P-162: the pair pattern and ZZ32's big onto makeZZfromZZ32.
  - P-73: fixed-width arithmetic raises, which the getters follow.
  - P-72: narrow keeps the low 32 bits on the fixed widths, which stands.
  - P-37: no declaration is added to the prelude.
  - F-299: walk's loader of helpers, and the carriers your bindings over NN32 and NN64 meet.
  - ledger:858 (check): a low-bits name missing on a type, which closes.
  - ledger:859 (check): a call that reached a low-bits name through a coercion, which closes.
  - ledger:502 (check): ZZ's widen, which closes by the deletion.
  - ledger:349 (check): ZZ's narrow half, which closes.
  - ledger:578: IntLiteral's own arithmetic answers a ZZ32 under walk, which stays.
  - `doc:explorations/reviews/integer-conversions-2026-11-06.md#Option 6. Option 3, with option 5's deletion folded in` (check): the option, its callers and their new forms.
  - `doc:explorations/reviews/integer-conversions-2026-11-06.md#Option 3. Steele's pattern, made total` (check): the getters, their owners and the helpers' two ways.
  - `doc:explorations/reviews/integer-conversions-2026-11-06.md#6.0 What every option shares`: the transfer helpers and the tests over NN32 and NN64.
  - `doc:explorations/reviews/integer-conversions-2026-11-06.md#2.2 The one library, member by member`: today's members, type by type.
  - `doc:explorations/reviews/natives-device-2026-11-07.md#3.3 The numerals, 32 (Q1: yes, with a reading)` (check): IntLiteral's 8 over asZZ, not ZZ64 (row 328).
  - `code:Library/FortressLibrary.fss#private shiftCount32(b:AnyIntegral):ZZ32 =` (check): rung I's private count functions, whose calls of ZZ's narrow you move.
  - `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object IntLiteral extends Number` (check): the object whose 8 you write in Fortress.
  - `code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait IntLiteral`: the prelude's IntLiteral, whose conversions and comparisons are Fortress over its getters, the form of yours.
  - `doc:Specification/basic-lib/basic-integers.tex`: the sentences you revise.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### R
- **slug:** `rung-io-reader`
- **worktree:** `/home/user/fortress-io-reader`
- **section:** `R. N4's reader rung: FileReadStream, Reader and FileWriteStream over the Java-backed traits, and File and Reader plain components (P-164)`
- **blurb:** P-164's reader rung, with FileWriteStream (item 373): FortressLibrary's JavaBufferedReader gains the prelude's eight methods on existing fileOps helpers, its factory over a file name on jbrOpen and one for standard input on a new jbrStdIn; walk carries the trait by name as FortressBufferedReader through a private native object in FortressBuiltin; FileReadStream, Reader and FileWriteStream become plain Fortress objects over a field, and File and Reader plain components, so their 25 glue bindings go; FileWriteStream becomes a WriteStream with its flush (rows 900, 901, 841); a missing file and a read after consume raise the library's exceptions, which a catch sees (row 902); the -1 at the end of a file kept.
- **points to report:**
  - Each method changed in StaticNativeApp and each class added under interpreter/; the new helper and its Java signature.
  - Each binding moved with the helper it names; each method that became Fortress text.
  - File.fsi and Reader.fsi as changed, with each header before and after.
  - The answers at the end of a file, after consume, after close and at a missing file, under walk before and after; each printed text that changes.
  - Your tests before and after through the harness and junit.sh; FileReadWrite, WordCountSmall, FileConversion and LongStringTests; ConcurrentPrinting at four threads.
  - The count table and the distance table on your final tree, and any site that comes; the crash rows you see.
  - Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false, and each of rows 900, 901, 902, 926 and 841 closed or noted.
  - A file edited beyond those named, any edit of the prelude, of the run-time classes or of the writer side.
- **briefing** (19 keys, 10 checks):
  - P-164 (check): the decision whose reader rung you build.
  - P-58 (check): the binding's form.
  - F-330 (check): the writer rung as landed, the pattern you follow.
  - F-321: the checker reads the whole helper class, fileOps among them.
  - F-299 (check): walk's loader and its carriers, which your change extends.
  - ledger:926 (check): FileWriteStream left on glue while File is native, which closes.
  - ledger:900: a rope written to a FileWriteStream, which closes.
  - ledger:901: FileWriteStream's flush, which closes.
  - ledger:902: a missing file that no catch sees, which closes.
  - ledger:928: a program's object below the writer trait, whose sibling your reader trait has.
  - `doc:explorations/compile-ladder/rung-io-writer/REPORT.md#What changed and why` (check): the writer rung's files, classes and decisions, which yours mirror.
  - `doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk` (check): today's answers of the reader side, which your tests keep.
  - `doc:explorations/reviews/io-objects-carrier-2026-11-06.md#(b) A Java-backed type in each direction, held in a field: PLAN's line`: the option the decision took.
  - `code:Library/FortressLibrary.fss#trait JavaBufferedReader excludes` (check): the trait you complete.
  - `code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait JavaBufferedReader excludes`: the prelude's trait, whose names and methods yours take.
  - `doc:Library/Writer.fss` (check): the writer objects over a field, the form of yours.
  - `doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java`: the helpers you bind.
  - PROBES `Probe 5. The compiled reader against walk's, at the end of a file (rung R), by reading` (check): the 0 and the -1 at the end, and how eof tells them apart.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### A
- **slug:** `rung-array-store`
- **worktree:** `/home/user/fortress-array-store`
- **section:** `A. The arrays' store: PrimitiveArray and PrimImmutableArray over a compiled store in a field, walk's AtomicArray behind P-167's device, and PrimImmutableRR64Array over a double[] class (P-169; Q2)`
- **waits on:** his answer to Q2 (section 2). Its default is shape (i), a cell per element; with shape (ii), the section's "What you build" names the change.
- **blurb:** P-169's arrays: FortressLibrary declares a store trait whose bindings name helpers of a new nativeHelpers/arrayOps over a compiled store class, in the shape that Q2's answer gives; PrimitiveArray and PrimImmutableArray become plain objects over a field of that trait, each read a cast to T, and NativeArray a plain component; walk's private native object below the trait holds an AtomicArray, and walk's loader answers the arrayOps names with walk's glue by one rule for the class, so walk's arrays and their transactions do not change; PrimImmutableRR64Array's two move onto a compiled double[] class that no factory chooses; the checker's walk-world table gains the store classes; a test of the compiled store outside and inside the compiled transaction at four threads.
- **points to report:**
  - The store trait, its factories and walk's native object as declared; the loader's rule as written.
  - The compiled store class, its shape, and arrayOps' helpers with their Java signatures; the change to runtimeSystem/Transaction.java if Q2 gave shape (ii).
  - PrimitiveArray, PrimImmutableArray and PrimImmutableRR64Array as written, and NativeArray.fsi before and after.
  - The cast at a read: its form, and what a walk program's array read costs before and after, by one timed pair of the planner's choosing or yours.
  - Your tests before and after through the harness and your compiled store's test, at four threads; the atomic tests of the walk suite.
  - The count table and the distance table on your final tree, and any site that comes; the crash rows you see.
  - Each test whose verdict changes in ant testSystem or ant testQuick; row 466's behaviour before and after.
  - Every sentence made false.
  - A file edited beyond those named, any edit of the code generator, of the class loader or of the prelude.
- **briefing** (20 keys, 10 checks):
  - P-169 (check): the decision whose arrays' shape you build.
  - P-167 (check): the device, walk's loader answering a helper's name with walk's own operation.
  - P-164: the Java-backed trait, walk's native object below it and the table entry, the pattern of the store.
  - P-84: an RR64 array's double[] store, decision A's, which stays boxed until then.
  - P-85: the array design's three questions, which stay open.
  - F-299 (check): walk's loader, and the table of F-328 that the device extends.
  - F-328: the two names the device answers today.
  - ledger:466: a second initialisation of an element, which the store meets.
  - `doc:explorations/reviews/natives-device-2026-11-07.md#3.1 The arrays' store, 7 (Q1: yes)` (check): the way, its forced points and its forks.
  - `doc:explorations/reviews/natives-remainder-2026-11-07.md#2.4 NativeArray, 7` (check): the team's sources, the peers and the uses of the two objects.
  - PROBES `Probe 1. Q2: the compiled array store's two shapes` (check): the two shapes measured, and what each changes in the tree.
  - `doc:ProjectFortress/LibraryBuiltin/NativeArray.fss` (check): the component you rewrite.
  - `doc:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/PrimitiveArray.java` (check): walk's store, which your rule answers with.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod,` (check): where the loader reads a string, and where your rule goes.
  - `doc:ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java` (check): the compiled transaction, its read and write sets.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java#public static class MutableStaticBinding extends NeedsType {`: how compiled code reads and writes a cell in and out of a transaction.
  - `doc:ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32Vector.java`: the team's 2011 store over a Java array in a run-time class.
  - `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#private object JavaBufferedWriterObject extends JavaBufferedWriter`: walk's native object below a library trait, the precedent.
  - `code:Library/FortressLibrary.fss#(** Casting *)..else => throw CastError`: the cast at a read.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### Q
- **slug:** `rung-checker-partial-order`
- **worktree:** `/home/user/fortress-checker-partial-order`
- **section:** `Q. The checker's four sorts by a partial order made a linear extension, read once a pair (row 929; P-148)`
- **blurb:** row 929: the compiled checker sorts a call's candidates, a coercion's candidates and a trait's ancestors with sortWith over a partial order, which Java's TimSort refuses at 32 elements or more; a class over a list and a strict order gives the minimal elements and a linear extension, reading each pair at most once; the four sites use it, and the call's sort shares its answers with minimal; a compiled test of 64 candidates that stops the checker on the base; P-148's timing before and after, and its second pass.
- **points to report:**
  - The class as written, and each site's change.
  - Your compiled test before and after through junit.sh, with the base's stack.
  - The count stage's three runs, base, change and pass, with their seconds, the diff of their tables and the comparison of their run.txt files.
  - The distance table on your final tree, its #crash row, and Char's declaration's line in run.txt.
  - The profile's top frames, and what the second pass took or why it took nothing; the audit of any reuse.
  - Each test whose verdict changes in ant testQuick or the compiler track.
  - Every sentence made false.
  - A file edited beyond those named, any change of what the checker accepts or refuses.
- **briefing** (12 keys, 7 checks):
  - ledger:929 (check): the row you close.
  - P-148 (check): the checker's speed after its correctness, in the same rung.
  - F-54 (check): the distance's two crash rows, which go.
  - F-53: the count and the distance at the last gate.
  - F-66: an undeclared crash is red only from the count.
  - `doc:.claude/skills/fortress-repo/references/compiler.md#The checker's time` (check): the timing's steps, the audit and what you report.
  - PROBES `Probe 2. Row 929: a sort that is correct on a partial order, and its time` (check): the reproducer, the prototype, its tables and its times.
  - `code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#// The candidates no other candidate is more specific than.` (check): minimal and callType, two of your sites.
  - `code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#// Sort the arrows and instantiations to find the statically most` (check): the sort that stops.
  - `code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala#// Build app candidates and sort them to find the SMA.`: the coercion sort.
  - `code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala#// Heuristic extension to Dan Smith's algorithm:`: the ancestors' sort.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### H
- **slug:** `rung-runtime-threads`
- **worktree:** `/home/user/fortress-runtime-threads`
- **section:** `H. The run time's own threads, abort and the task trace on compiled helpers that walk's loader answers with its glue (P-169)`
- **blurb:** P-169's threads: Thread's val, wait, ready and stop, the top-level abort and printTaskTrace name helpers of nativeHelpers/runtime, over the compiled run time; walk's loader answers the six names with today's glue through P-167's table, so walk's spawn and transactions do not change; compiled, abort throws the compiled abort inside a transaction and does nothing outside one, printTaskTrace prints the compiled task chain, and Thread's four raise FailCalled until the code generator compiles spawn (row 82); val is a pair over a bare binding at Any; a walk test and a compiled guard.
- **points to report:**
  - The six helpers as written, with their Java signatures, and the loader table's six entries.
  - Thread's four and abort as declared, val's pair among them.
  - Your tests before and after through the harness and junit.sh: abort inside and outside atomic on each path, and spawn's four under walk; tests/taskTrace2.fss and taskTrace3.fss.
  - The count table and the distance table on your final tree, and any site that comes; the crash rows you see; runtime.java read whole.
  - Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false.
  - A file edited beyond those named, any edit of the code generator, of walk's tasks or of the compiled transaction.
- **briefing** (16 keys, 8 checks):
  - P-169 (check): the decision whose threads' shape you build.
  - P-167 (check): the device, walk's loader answering a helper's name with walk's own operation.
  - P-58: the binding's form.
  - P-162: the pair, for val's T.
  - F-328 (check): the loader's table, which you extend.
  - F-298 (check): the compiled rewrite checks a binding against the helper's Java signature.
  - ledger:82 (check): compiled spawn, which stays.
  - `doc:explorations/reviews/natives-device-2026-11-07.md#3.2 Threads, abort, the task trace, 6 (Q1: yes)` (check): the way and its ground.
  - `doc:explorations/reviews/natives-remainder-2026-11-07.md#2.6 Thread 5 and printTaskTrace 1`: the team's sources and the ways.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java#static final java.util.Map<String, String> OWN_OPERATIONS` (check): the table you extend.
  - `doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java` (check): the team's helper class over the compiled run time, which you extend.
  - `doc:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Thread.java`: walk's glue, which the table names.
  - `code:ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java#public static boolean inATransaction() {`: the compiled run time's test of a transaction.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x) {`: the compiled atomic, which retries on the compiled abort.
  - `doc:Specification/advanced/parallelism-locality/transactions.tex#Abortable Atomicity`: abort's meaning, inside and outside an atomic expression.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### S
- **slug:** `rung-system-natives`
- **worktree:** `/home/user/fortress-system-natives`
- **section:** `S. System's natives: getEnvironment and getProperty onto stringOps, and, with Q3's answer, args built in Fortress over two scalar helpers (item 355; row 895; Q3)`
- **waits on, for its second half:** his answer to Q3 (section 2). Without it, the rung builds its first half only.
- **blurb:** item 355, option 1, and row 895: System's getEnvironment and getProperty name two new helpers of stringOps that compute as systemOps' do, so that no binding of the one library names systemOps; systemOps keeps getProperty and getArgs for the compiler's prelude; the compiled guard retargeted. With Q3's default: args built in Fortress by immutableArray and tabulate over two scalar helpers of a new class, a count and the i-th argument, which walk's driver and the compiled main both fill, so that getProgramArgsPrim and getProgramArgs go and the checker reads System whole with no error; the checker run over System before and after.
- **points to report:**
  - The helpers and their Java signatures; what systemOps keeps and why.
  - The compiled guard before and after through junit.sh.
  - The checker over System, before and after, with its error lines.
  - With Q3: args as written, the two helpers, where each path fills their static, and args' answers under walk with arguments and without.
  - The count table and the distance table on your final tree, and any site that comes.
  - Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false, row 896's new line among them.
  - A file edited beyond those named, any edit of CompilerSystem or of systemOps.getArgs.
- **briefing** (15 keys, 8 checks):
  - `doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355` (check): the answer whose option 1 you build.
  - F-321 (check): the checker reads the whole helper class, and systemOps fails it.
  - ledger:895 (check): the row that closes with your rung.
  - ledger:896: getProperty at an empty name, which stays as it is.
  - P-58: the binding's form.
  - P-37: the compiler's prelude, which keeps its import of systemOps.
  - `doc:explorations/reviews/natives-remainder-2026-11-07.md#2.5 System's getProgramArgsPrim, 1` (check): Q3's ways and its default.
  - `doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java` (check): the helpers you move.
  - `doc:Library/System.fss` (check): the bindings you retarget.
  - `doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss` (check): the compiled guard you retarget.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java#public static final class GetProgramArgs extends NativeFn0 {`: walk's arguments today and their driver.
  - `doc:ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java`: the compiled main, which holds the arguments.
  - PROBES `Probe 3. The checker over System, with rung S and with Q3's default` (check): the base, control A and control B.
  - `map:README.md#7. Touch this, and that moves@nativeHelpers`: the territory map's row on helper classes and their wrappers.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### T
- **slug:** `rung-codegen-trait-table`
- **worktree:** `/home/user/fortress-codegen-trait-table`
- **section:** `T. The code generator's trait table: an object whose first supertrait is an imported api's trait (row 733)`
- **blurb:** row 733, one of F-34's kinds, the wall of the library's 2-D and 3-D ranges: dumpMethodChaining's comparison of an inherited method's trait with the body's trait reads an imported api's trait, so that an object whose first supertrait is an api's trait and whose later supertrait gives a method of the same name compiles and runs each body; a compiled test with its own api and its walk guard.
- **points to report:**
  - Where the fix is, the type that the comparison read, and why the table did not find it.
  - Your tests before and after through junit.sh and the harness.
  - Whether row 732, the sibling, is reached, and what you measured of it.
  - Every sentence made false.
  - A file edited beyond those named; any edit of the checker's Scala, with the count stage's times and its second pass (fork T1).
- **briefing** (11 keys, 5 checks):
  - ledger:733 (check): the row you close.
  - ledger:732: its sibling in the same method, which is not yours.
  - F-34 (check): the code generator's refusals in the library, by kind.
  - P-33: code-generator work beside the natives.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private void dumpMethodChaining(String [] superInterfaces, boolean includeCurrent)` (check): the method that stops.
  - `code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id): TypeConsIndex` (check): the table's look-up that throws.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java#private TypeAnalyzer newTypeAnalyzer(`: how the code generator's table is made, over the component and the api environment.
  - `doc:ProjectFortress/compiler_tests/RecursiveApiTest3.test`: a compiled test with its own apis, the form of yours.
  - `doc:explorations/perf-probes/codegen-distance/REPORT.md#3. The kinds of refusal`: the library's sites of each kind.
  - PROBES `Probe 4. Rung T's wall on today's tree` (check): the wall on this base, with its stack.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

