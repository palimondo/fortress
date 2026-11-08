<!-- The record of climb batch 28, the sixth batch of the plan's phase 4, the switch-over, for the coordinating session, the curator and the batch's workers. Drafted 2026-11-07 and 2026-11-08 by an Opus planning worker against `main` at `2436f6f25`, whose code is climb batch 27's landed code (`git diff --stat 29e52a3dc 2436f6f25 -- Library ProjectFortress Specification build.xml bin` prints nothing), so climb batch 27's gate tables (`compile-ladder/climb-batch-27/gate/`) describe the base. A first planner, started about 16:45 UTC on 2026-11-07, was lost with the container at 23:09 UTC before it committed anything; this record starts fresh. Its candidates: the reader rung with `FileWriteStream` (P-164; review-queue item 373), the integer conversions (P-161), climb batch 27's rungs S and T, which never started (item 377), the runtime's own natives by P-169 (threads, the arrays' store under Q2, `IntLiteral`'s 8), `getProgramArgsPrim` under Q3, and row 929's sort under P-148. It proposes seven rungs, two of them waiting on his answers to Q2 and Q3 (section 2). Reviewed before the launch by `climb-batch-28-review.md` (2026-11-08), whose changes are in place and which recommends Q2 (1) and Q3 (1). -->
<!-- Sources: PLAN.md, "Where we stand" and phase 4 whole, and "Climb batch 27, listed for his review"; POSITIONS P-169 and its history, P-164, P-161, P-167, P-58, P-148, P-162, P-37, P-38, P-84, P-85, P-76, P-33, cited by number; FACTS F-32, F-34, F-53, F-54, F-298, F-299, F-321, F-328, F-330; the ledger rows 82, 318, 349, 466, 502, 578, 732, 733, 841, 858, 859, 895, 896, 900, 901, 902, 926, 928, 929; review-queue items 373, 377, 403, 406, 407, 319, 355, 380, 383, 384, 385; the reviews `reviews/natives-device-2026-11-07.md`, `reviews/natives-remainder-2026-11-07.md`, `reviews/integer-conversions-2026-11-06.md`, `reviews/io-objects-carrier-2026-11-06.md`; the post-batch review `reviews/batch-27-review.md`, sections 1 to 7 and Part 4; rung W's report `compile-ladder/rung-io-writer/REPORT.md`; `CLIMB-BATCH-27.md` as the form, its rungs S and T and its probes 3 and 21; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the `coordinator` skill's `references/batch.md`; the code at the sites; the specification's sections cited. -->
<!-- The planner's probes: `compile-ladder/plan-28/PROBES.md`, in two worktrees of the planner's own at `2436f6f25`, `/home/user/fortress-p28` and `/home/user/fortress-p28b`, built in place, since no base build survived the container's loss, and removed at 00:14 UTC on 2026-11-08. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, loads 0.04 to 1.76. -->

# Climb batch 28

## 1. The manifest, rung by rung

The batch's generator writes the workflow's manifest from this section. Each rung's `section` is its section 4 heading, word for word. The rungs are in the manifest's order, V, R, A, K, H, S, T. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-28.md#`, and PROBES for `doc:explorations/compile-ladder/plan-28/PROBES.md#`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read.

**His answers to the two questions** (section 2, "The questions for the curator"), at 02:1x and 02:2x UTC on 2026-11-08: Q2, shape (ii), the slot API, so A builds the compiled store over an `Object[]` and the compiled transaction's slot calls; Q3, option 1, so S builds both halves. His Q2 answer rests on P-84 as widened at 02:1x: every number type's array is to be stored unboxed on the compiled path, so the slot mechanism is the one every unboxed array will need, and the ground of the record's and the Fable review's recommendation of shape (i), that only `RR64` leaves the boxed store, no longer holds.

| id | slug | title | expected minutes |
|---|---|---|---|
| V | `rung-integer-conversions` | The integer conversions: the checked getters, `bitsAs…`, the low-bits names on every type, `ZZ`'s `narrow` and `widen` deleted, `big` on its helper, and `IntLiteral`'s 8 over `asZZ` | 60 |
| R | `rung-io-reader` | N4's reader rung: `FileReadStream`, `Reader` and `FileWriteStream` over the Java-backed traits, and `File` and `Reader` plain components | 50 |
| A | `rung-array-store` | The arrays' store: `PrimitiveArray` and `PrimImmutableArray` over a compiled store in a field, walk's `AtomicArray` behind P-167's device, and `PrimImmutableRR64Array` over a `double[]` class | 60 |
| K | `rung-checker-partial-order` | The checker's four sorts by a partial order made a linear extension, read once a pair | 50 |
| H | `rung-runtime-threads` | The run time's own threads, `abort` and the task trace on compiled helpers that walk's loader answers with its glue | 40 |
| S | `rung-system-natives` | `System`'s natives: `getEnvironment` and `getProperty` onto `stringOps`, and, with Q3's answer, `args` built in Fortress over two scalar helpers | 30 |
| T | `rung-codegen-trait-table` | The code generator's trait table: an object whose first supertrait is an imported api's trait | 35 |

Fields common to the seven rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-io-reader`; **branch:** `wip/<slug>`.
- **writes state:** no. **its test is the stage:** no. **joins the gate:** none. **expected moves:** none. **lands only with:** none: no rung builds on another (section 4, "The rule the rungs keep").
- **expected checker count:** none declared; the count stays 0. **expected checker crash:** none declared. Every rung but T runs both stages on its own tree (section 3, fork 3). On a rung's own tree, without rung K, the distance shows climb batch 27's two crash rows in `value object Char`, or none, or a crash elsewhere: the crash depends on the hash order of the overloadings' names, which hold declaration lines, so a line moved in `FortressBuiltin.fss` before `Char` can move it (row 929's notes). A rung reports the rows it sees and declares none; a crash with the message 'Comparison method violates its general contract!' is row 929's, not the rung's. Rung K's tree, and the merged tree, read `#crash none` (PROBES `Probe 2. Row 929: a sort that is correct on a partial order, and its time`).

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
- **briefing** (23 keys, 12 checks):
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
  - `doc:Specification/appendices/changes.tex#Shifts and narrowing on the integer types` (check): the Appendix I entry whose sentences on narrow of a ZZ your deletion makes false, with its callout revival-shifts.
  - `code:Specification/basic-lib/basic-integers.tex#Like every number type, each of them is a subtype..TYP{IntegerOverflow} is thrown.`: the sentences you revise, narrow's among them.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### R
- **slug:** `rung-io-reader`
- **worktree:** `/home/user/fortress-io-reader`
- **section:** `R. N4's reader rung: FileReadStream, Reader and FileWriteStream over the Java-backed traits, and File and Reader plain components (P-164)`
- **blurb:** P-164's reader rung, with FileWriteStream (item 373): FortressLibrary's JavaBufferedReader gains the prelude's eight methods on existing fileOps helpers, its factory over a file name on jbrOpen and one for standard input on a new jbrStdIn; walk carries the trait by name as FortressBufferedReader through a private native object in FortressBuiltin; FileReadStream, Reader and FileWriteStream become plain Fortress objects over a field, and File and Reader plain components, so their 25 glue bindings go; FileWriteStream becomes a WriteStream with its flush (rows 900, 901); a missing file and a read after consume raise the library's exceptions, which a catch sees (row 902); the -1 at the end of a file kept.
- **points to report:**
  - Each method changed in StaticNativeApp and each class added under interpreter/; the new helper and its Java signature.
  - Each binding moved with the helper it names; each method that became Fortress text.
  - File.fsi and Reader.fsi as changed, with each header before and after.
  - The answers at the end of a file, after consume, after close and at a missing file, under walk before and after; each printed text that changes.
  - Your tests before and after through the harness and junit.sh; FileReadWrite, WordCountSmall, FileConversion and LongStringTests; ConcurrentPrinting at four threads.
  - The count table and the distance table on your final tree, and any site that comes; the crash rows you see.
  - Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false, and each of rows 900, 901, 902 and 926 closed, and row 928 rewritten.
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
- **takes:** Q2's answer, shape (ii), the slot API (section 2).
- **blurb:** P-169's arrays: FortressLibrary declares a store trait whose bindings name helpers of a new nativeHelpers/arrayOps over a compiled store class, in the shape that Q2's answer gives; PrimitiveArray and PrimImmutableArray become plain objects over a field of that trait, each read a cast to T, and NativeArray a plain component; walk's private native object below the trait holds an AtomicArray, and walk's loader answers the arrayOps names with walk's glue by one rule for the class, so walk's arrays and their transactions do not change; PrimImmutableRR64Array's two move onto a compiled double[] class that no factory chooses; the checker's walk-world table gains the store classes; a test of the compiled store outside and inside the compiled transaction at four threads.
- **points to report:**
  - The store trait, its factories and walk's native object as declared; the loader's rule as written.
  - The compiled store class, its shape, and arrayOps' helpers with their Java signatures; the change to runtimeSystem/Transaction.java if Q2 gave shape (ii).
  - PrimitiveArray, PrimImmutableArray and PrimImmutableRR64Array as written, and NativeArray.fsi before and after.
  - The cast at a read: its form; the quick pair's verdicts and seconds on your tree, against P-30's minute.
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

### K
- **slug:** `rung-checker-partial-order`
- **worktree:** `/home/user/fortress-checker-partial-order`
- **section:** `K. The checker's four sorts by a partial order made a linear extension, read once a pair (row 929; P-148)`
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
- **briefing** (11 keys, 6 checks):
  - ledger:929 (check): the row you close.
  - P-148 (check): the checker's speed after its correctness, in the same rung.
  - F-54 (check): the distance's two crash rows, which go.
  - F-53: the count and the distance at the last gate.
  - F-66: an undeclared crash is red only from the count.
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
- **takes, for its second half:** Q3's answer, option 1 (section 2).
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

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode with the **code generator**, and runs it on the compiled **run time**. Until the **switch-over**, the compiled path uses its own small library, the **prelude**. After it, the compiled path uses the interpreter's library, the **one library**.
- A **native binding** is a library declaration whose body is `builtinPrimitive("…")`. Its string names a **glue class**, which only walk can call, or a **helper**, a static Java method in `nativeHelpers/`, which both paths call (P-58). A **carrier** is the Java type in which walk passes a declared type to a helper. **P-167's device**: the binding names a compiled helper, and walk's loader answers that name with walk's own glue, as for `ilkName` and `SEQV`; P-169 makes it the rule for the run time's own operations.
- A **Java-backed trait** is a trait of the one library whose values a Java class holds, as `JavaBufferedWriter` holds a Java writer: walk's private native object below it, and the compiled run-time class that implements it (P-164).
- **The count** and **the distance** are the checker's errors on the one library: the count on its main component, the distance on its fourteen core components. Both are 0 at the last gate, and the distance has two **crash rows**, where the checker stopped inside `value object Char` (F-53, F-54; row 929).
- The compiled **transaction** is the compiled run time's software transactional memory, which a compiled `atomic` block starts and ends; it tracks each mutable **cell** that the block reads or writes. **Decision A** is the array decision that gives an `RR64` array an unboxed `double[]` store (P-84).
- A **rung** is one change, built by one worker and checked by a second agent, the skeptic. A **batch** is a few rungs landed together after the **gate**. The **gather** composes the rungs on `main`. A **guard** is a test that passes before the change and after it.
- **Appendix I** is the specification's appendix of changes. A revised passage carries a **callout** that names its entry there.
- **microGPT** is the model program, by which the revival is measured. A **model line** is a source line of either of its programs; no rung of this batch changes one.

### The scope: seven rungs, two of them waiting on his answers

The record proposes seven rungs for climb batch 28:

- **V**, P-161, his option 6: the integer conversions, with `ZZ32`'s `big` on its helper and `ZZ`'s `narrow` and `widen` deleted; and, by P-169, `IntLiteral`'s 8 conversions and comparisons as Fortress text over its `asZZ`.
- **R**, P-164's reader rung, with `FileWriteStream` (item 373): the reader objects over `JavaBufferedReader`, and `File` and `Reader` plain components.
- **A**, P-169's arrays' store, **waiting on Q2**, the store's shape.
- **K**, row 929: the checker's four sorts by a partial order, which crash at 32 elements or more, made a linear extension, as fast as today (P-148).
- **H**, P-169's threads: `Thread`'s four, `abort` and `printTaskTrace` on compiled helpers that walk's loader answers with its glue.
- **S**, item 355's option 1, which never started in climb batch 27 (item 377): `System`'s two natives onto `stringOps`; and, **waiting on Q3**, `args` built in Fortress over two scalar helpers.
- **T**, row 733, which never started in climb batch 27 (item 377): the code generator's trait table.

The reasons, one by one:

1. **The natives come first** (P-33). V, R, H, A and S take bindings off glue classes: 50 of the 102, or 42 without A and Q3's half (below, "Where the natives stand").
2. **The reader rung can run now.** Climb batch 27's rung W declared both Java-backed traits and both table entries (F-330), so the reader rung builds on the base, not on another rung. It takes `FileWriteStream` too: an object of a native component cannot hold a field under walk (row 926), so `File` stops being native only when all its objects leave their glue together (item 373; PLAN item 69).
3. **The conversions no longer meet a rung of their batch.** Climb batch 27's rung I, which edited the same five integer traits, landed. Four of `IntLiteral`'s 8 (`asZZ32`, `asZZ64`, `asNN32`, `asNN64`) are written over `ZZ`'s checked getters, which V adds, and a rung cannot build on another rung of its own batch (PLAN, "The principle for the batches"); so the 8 sit in V, with their siblings (section 3, fork V2).
4. **S and T are climb batch 27's,** rebased: their files did not change in the lines they edit, and their walls reproduce on this base (section 5, probes 3 and 4).
5. **K makes the distance whole again.** Since climb batch 27 the distance does not check `value object Char`'s body, its 41 helper bindings among them (F-54). The prototype of K's linear extension removes both crash rows, checks `Char` with no error, keeps every other result, and takes 145 s against the base's 140 s for the distance and 88.9 s against 88.9 s for the count (probe 2). The brief records a rank sort at 299 s against 137 s.
6. **H and A both use P-167's device, at two places of walk's loader.** H adds six names to the table that rung A of climb batch 27 made (`interpreter/glue/NativeApp.java:47-53`); A answers every name of its new helper class by one rule, where the loader reads the string (`:209`), about 150 lines apart (fork A4). So they merge.
7. **A and S's second half wait,** each on a question that is consequential by the `coordinator` skill's test (below). Without Q2's answer, A goes to climb batch 29; without Q3's, S builds its first half only.
8. **Seven rungs, each at its own declarations, keep the gather and the gate in bounds.** Section 4, "The rule the rungs keep", gives each rung's place in each shared file: four share `FortressBuiltin.fss`, four `FortressLibrary.fss` and three its api, each at other declarations. Climb batch 27 applied eight patches over the same two files with no conflict (`reviews/batch-27-review.md`, section 4).

### Where the natives stand, and where the batch leaves them

- **Today: 443 live bindings, 341 on helpers and 102 on glue classes** (F-299, F-32; section 5, probe 6). The 102: the literals 32 (`IntLiteral` 29, `FloatLiteral` 3), `Reflect` 28, the reader side 20 and `FileWriteStream` 5, `NativeArray` 7, `Thread` 5 and `printTaskTrace` 1, the conversions 3, `getProgramArgsPrim` 1.
- **After the batch, by reading:**
  - R takes 25 off glue and adds 10 helper bindings: the reader trait's 8 methods and its two factories.
  - V takes 11 off glue: `big` onto its helper, `ZZ`'s two deleted, and `IntLiteral`'s 8 written in Fortress; it adds 1 helper binding, and one more for each checked getter that it binds to a helper rather than writes in Fortress: three by fork V1's default.
  - H moves 6 from glue onto helpers.
  - A moves 7 from glue onto helpers: the store trait's methods and factories.
  - S moves none in its first half; with Q3, `getProgramArgsPrim` goes and two helper bindings come.
  - K and T move none.
- **So the glue count falls from 102 to 52 with all seven rungs, to 59 without A, and to 60 without A and Q3's half.** The live bindings and the helpers come to 422 and 370 with all seven, 421 and 361 without A and Q3, with fork V1's three. The gather counts the merged tree.
- **What stays on glue:** `Reflect`'s 28, which wait for his answer to Q4 of the natives review; the literals' 24, `IntLiteral`'s 21 and `FloatLiteral`'s 3, at N5 in the names batch (P-169); and, without their answers, `NativeArray`'s 7 and `getProgramArgsPrim`.

### The questions for the curator, before the launch

Two, each consequential by the `coordinator` skill's test. Without his answer, the go rule of the `coordinator` skill's `references/batch.md` applies: while he is away overnight, its default lands and goes on the review list, since neither default reverses a decision of his.

**Q2. Should the compiled array store hold each element in a cell of its own, or a plain array with the transaction extended to an array and an index?** (Review-queue item 407.)

- **What it is.** P-169 moves the one library's arrays onto a compiled store before the switch-over: every array, vector, varargs list and `args` of the one library is built on `PrimitiveArray` or `PrimImmutableArray`, and a body left on glue raises at the first compiled array (`reviews/natives-remainder-2026-11-07.md`, section 1, finding 1). P-169 leaves the store's shape inside the compiled transaction open. A Fortress `atomic` block must see a consistent array: `atomic do a[i] := a[i] + 1 end` from many tasks must not lose an update. Walk's store does this with one transactional cell per element (`AtomicArray`, Christine Flood's, 2007). The compiled transaction tracks only cells (`runtimeSystem/Transaction.java`, `TXRead` and `TXWrite`, over a `MutableFValue`).
- **The two shapes.** (i) One `MutableFValue` cell per element, which the compiled transaction tracks as it is: walk's own shape, no change to the transaction. (ii) A plain `Object[]`, and the transaction's read and write sets keyed by an array and an index as well as by a cell: one box fewer per element, and new code inside the transaction that every compiled `atomic` runs.
- **The measurement** (section 5, probe 1; a Java model on the compiled run time's own `BaseTask`, task pool and `Transaction`, an `RR64` element boxed as the compiled `FRR64`, one JVM per shape, five rounds, medians):
  - memory: (i) 44 bytes per element, (ii) 28; a `double[]`, decision A's shape, 8;
  - a read outside a transaction: (i) 2.2 ns, (ii) 1.7 ns plain, 1.8 ns volatile; `double[]` 0.6 ns;
  - a read and a write outside a transaction: (i) 24 ns, (ii) 18 ns plain, 24 ns volatile; `double[]` 0.3 ns: the box that each write makes dominates both shapes;
  - inside one transaction over 100,000 elements, a read and a write: (i) 209 ns, (ii) 118 ns;
  - with a transaction for each element: (i) 182 ns, (ii) 182 ns, since the transaction's own work dominates.
- **What touches microGPT.** Its lines use no `atomic` (`grep -n atomic` over its sources prints nothing), so its arrays run outside a transaction: per read 2.2 against 1.7 ns, and 44 against 28 bytes per element, until decision A gives `RR64` its `double[]`. microGPT does not compile before phase 5 (F-97).
- **What each changes in the tree.** Both share the library's text, walk's half, the helper class `nativeHelpers/arrayOps` and the checker's table entry. (i) adds a compiled store class over a `MutableFValue[]`, whose helpers call `TXRead` and `TXWrite` on the element's cell, as compiled code does for a variable; `runtimeSystem/Transaction.java` and `BaseTask.java` do not change. (ii) adds a store class over an `Object[]` and about 70 lines to `Transaction.java`: a location key, `TXReadSlot` and `TXWriteSlot`, and slot cases in its two validations and its two commits, tested at four threads. Either can follow the other later by a change of the store class, and of `Transaction.java` for (ii); the library and walk stay.
- **The team's sources.** Flood's 2011 vectors hold a Java array inside a run-time class (`compiler/runtimeValues/FZZ32Vector.java`), with no transaction; her 2007 `AtomicArray` holds a cell per element. The peers store a generic array in an `Object[]` (Java's `ArrayList`, Scala's `ArrayBuffer`) and keep transactions out of the array itself: Haskell's STM arrays (`TArray`) hold a `TVar` per element, shape (i).
- **The options.**
  1. **Shape (i), a cell per element.** The judgement's default (`reviews/natives-device-2026-11-07.md`, section 3.5). Rung A as section 4 gives it. The smaller change; 44 bytes an element.
  2. **Shape (ii), a slot API.** Rung A with the change to `Transaction.java` that its section names, and the four-thread runs of the new transactional code. 28 bytes an element, and 45 % less inside a long transaction; about 0.1M more for the rung.
  3. **Neither now:** rung A goes to climb batch 29, and `NativeArray`'s 7 stay on glue one batch longer.
- **The record recommends 1:** walk's own shape and the team's, no change to the compiled transaction, and the difference outside a transaction is a third of a write at most; (ii) can follow if phase 6's numbers ask before decision A replaces the `RR64` store. It is consequential because it touches microGPT's speed until decision A. **The Fable review recommends 1 too** (`climb-batch-28-review.md`, section 1): the team's word that speaks is walk's 2007 store, the later word is silent on a transactional element, and shape (ii) would key the transaction by an array and an index, the design decision A's `double[]` will need, ahead of P-85's questions.
- **His answer, 02:1x UTC on 2026-11-08: 2, shape (ii).** P-84, as he widened it at 02:1x, stores every number type's array unboxed on the compiled path, so an `atomic` write into any of them needs the transaction to track an array and an index, shape (ii)'s mechanism, and arrays of objects keep one box fewer than in shape (i). The recommendation of 1 rested on only `RR64` leaving the boxed store.

**Q3. Does `getProgramArgsPrim` leave glue now, with `args` built in Fortress over two scalar helpers?** (PLAN, phase 4, its line on `CompilerSystem`; the natives review's Q3; review-queue item 319 holds the deletion of `CompilerSystem`, which this question does not decide.)

- **What it is.** `System`'s `args` is the program's command-line arguments. The one library builds it from `getProgramArgsPrim`, a glue binding that walk answers with a `PrimImmutableArray` (`Library/System.fss:29-35`; `interpreter/glue/prim/StringPrim.java:113-140`); `System` evaluates it as it loads, and both microGPT programs import `System`. The prelude's `CompilerSystem` reads `systemOps.getArgs`, a Java-backed vector that the one library does not declare.
- **The probe** (section 5, probe 3). With rung S's strings off `systemOps`, the checker reaches `System`'s component and finds 2 errors, at `args` and `getProgramArgs`. With Q3's default as well, `args = immutableArray[\String\](programArgCount()).tabulate(fn (i:ZZ32): String => programArg(i))` over two scalar bindings, the checker reads `System` whole with no error, and walk runs it.
- **The options.**
  1. **Yes, now, in rung S** (the natives review's default, section 2.5 (a)): two helpers of a new class, a count and the i-th argument, over one static that walk's driver and the compiled main both fill; `args` built in Fortress by the library's immutable-array factory; `getProgramArgsPrim` and `getProgramArgs` deleted, neither in the api. On the compiled path, `args` then needs the arrays' store (rung A).
  2. **With `NativeArray`, after the switch-over** (`perf-probes/prelude/natives-shape.md`, section 3): a compiled `System`, and so microGPT, raises as it loads.
  3. **A Java-backed vector, as the prelude has:** a second store type beside rung A's.
- **The record recommends 1.** It is consequential because it decides whether `System`, and so microGPT's import of it, loads compiled at the switch-over. **The Fable review recommends 1 too** (`climb-batch-28-review.md`, section 1): `args` keeps the team's declared type over the library's own factory, and option 2 would make a compiled microGPT raise as `System` loads.
- **His answer, 02:2x UTC on 2026-11-08: 1.**

**No other fork of the record is consequential** (section 3).

**A point for his sight, not a question.** Rungs V, H and A build P-169, which he took from the independent Fable judgement as it landed, with his detailed review to come (review-queue item 406, default "as decided"). Each of the three can be undone by its rung's commit; none touches a model line.

### What the batch leaves out (section 5, "Left out, each with its home")

- `IntLiteral`'s other 21 and `FloatLiteral`'s 3, at N5 (P-169); `Reflect`'s 28, on Q4.
- The raise-string resolver (the natives review, section 3, point 2): it edits every helper class that raises, V's five integer classes among them, so it would put the merge at risk; climb batch 29.
- F-34's other kinds of the code generator's refusals (rows 624, 819, 822, 875, 888 to 892, 832) and row 862: each needs a planner's probe of its fix, which this planner did not take; a later batch's record.
- Row 732, the trait table's sibling (fork T2); rows 896, 928, 466 and 578, each beside its rung, unchanged.
- Item 403, whether an undeclared crash in the distance turns a gate red: his; K removes the crash it was asked for.

### Before the batch runs

- **His answers to Q2 and Q3,** or their defaults by the go rule, and his go for the launch.
- **The Fable review of this record,** with a go in advance (`references/batch.md`, "The go"): `climb-batch-28-review.md`, 2026-11-08, which recommends Q2 (1) and Q3 (1) and made the changes its section 2 names, in place.
- **The manifest's generator,** `compile-ladder/plan-28/manifest/`, made by the coordinator from `plan-27/manifest/` with this record's values (section 6, "The generator"); A's block left out without Q2's answer.
- **The base build,** at `main`'s head after the generator, by the manual's "Before the launch", step 2.
- **The disk.** The script stops under 1.5G a rung plus 4G (`climb-batch-workflow.js`, `DISK_FLOOR_G`): 14.5G for seven rungs, 13G for six. Free at 00:14 UTC on 2026-11-08 (01:14 his time), after the planner's two worktrees were removed: 23.1G by `df -P` (24,176,504 KB), above the floor for seven rungs by 8.6G. Climb batch 27 used about 0.65G a rung, 1.1G where `ant testQuick` ran, and about 1G for the gather and the gate (`reviews/batch-27-review.md`, section 7, point 2), so about 9G for seven.
- The gather runs the 52 team demos on the merged tree (P-79; F-283): R changes every program that reads a file or standard input, V the library's integer conversions, H walk's loader, A every array.

### Cost

- **About 4.6M tokens written for the seven rungs; about 4.0M without A.** From 4.1M if the workers write as climb batch 27's did, to 5.5M with a judge and a repair round on one rung. About 5 hours 15 minutes at two agents at a time, 4 hours 30 minutes without A.
- **Workers, about 2.25M:** V 0.45M, R 0.35M, A 0.45M, K 0.3M, H 0.3M, S 0.2M, T 0.2M.
- **Skeptics, about 1.3M:** 0.18M each; K's 0.22M, since it runs the count stage itself (P-148).
- **The fixed roles, about 1.05M:** the gather 0.45M with seven rungs, the demos, one Appendix I entry and one build of the specification; the merged-diff review 0.28M; the gate 0.2M; the commit stage 0.12M.
- **The evidence.** Climb batch 27's run wrote 5.17M over its own 30 transcripts for eight landed rungs of ten, 0.65M a landed rung, and its span 5.97M with the coordinator's agents beside it (`reviews/batch-27-review.md`, section 3): its eight landed workers 2.21M, 221K to 338K each (W 294K, I 338K, G 286K); its seven skeptics 1.27M, 157K to 225K; the gather 390K, the review 271K, the gate 213K, the commit 118K; 0.60M of rulings and repairs, which no estimate held.
- **The figures.** V is the largest: 25 getters, the low-bits names, the callers, `IntLiteral`'s 8, a specification revision with the build; above rung I (338K). R mirrors rung W (294K) on three objects and two components. A is walk Java, a run-time class, a helper class, the library's arrays and a four-thread test: W's size and more. K is a 60-line Scala class at four sites with P-148's three count runs and a profile, about rung G (286K). H is six helpers, six table entries, a pair and two tests. S is two helpers, two strings and a guard, with Q3 two more helpers and `args`. T is one method and two tests with an api.
- **Minutes, for the scatter:** V 60, R 50, A 60, K 50, H 40, S 30, T 35, against climb batch 27's workers' 24 to 49.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of his; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The questions for the curator

Q2, the store's shape, and Q3, `System`'s arguments, are in section 2. Their defaults: Q2 (1), a cell per element; Q3 (1), now, in rung S. Both are consequential: Q2 touches microGPT's speed until decision A, and Q3 decides whether `System`, which microGPT imports, loads compiled at the switch-over.

### Forks the batch takes, none consequential

Each default can be undone, none reverses a decision of his, and none touches a model line or the model's speed. Where the record leaves a choice open, the default follows the team's own source or the library's way, which the fork names.

**For the whole batch**

1. **Seven rungs, V, R, A, K, H, S, T, in the manifest's order; none lands only with another; no two change one declaration.** Default: so. A leaves the manifest without Q2's answer, and S builds its first half without Q3's. The files that two rungs share, and each rung's place in each, are in section 4, "The rule the rungs keep, and how they meet". The gather orders the rungs that share a file by its own rule.
2. **The suites each rung runs, once, after its last change of code** (the `fortress-repo` skill's `tests-running.md`, "When to run a whole suite"). Default: V, R, A, H and S edit the library and a helper class that a binding names, and R, A and H walk too, so each runs `ant testSystem` and `ant testQuick` once, and its compiled guards through `junit.sh`; A also runs its compiled store's test at four threads. K edits the checker, so it runs `ant testQuick` once after its second pass (`compiler.md`, "The checker's time", step 4), and its compiled test through `junit.sh`. T edits the code generator only, so it runs its own tests through `junit.sh` and the harness and leaves the tracks to the gate, as climb batch 27's rung G did.
3. **Every rung but T runs the count stage and the distance stage once each, on its final tree, after its edit and rebuild.** Default: so; the before is climb batch 27's gate tables, the count 0 and the distance 0 with two crash rows (`compile-ladder/climb-batch-27/gate/checker-count.txt` and `distance.txt`): run neither stage on the base. K runs the count stage three times by P-148 (base, change, pass) and the distance once on its final tree. On a rung's own tree the crash rows may stay, go or move (section 1, the common fields); the rung reports them and declares none. T changes only the code generator, which neither stage runs, so it lists its files (`STAGE_BLIND`), unless its fix changes the checker (fork T1).
4. **No new helper holds shared state but S's arguments, written once before the program runs** (review-queue item 335). Default: item 335's default, neither a static check nor a parallel test, stands; S's static is set by walk's driver and by the compiled main before the program's first task.
5. **Appendix I's natives effect** (`Specification/appendices/changes.tex:4625-4658`, "341 of the 443 bindings") is made false by every natives rung. Default: no rung edits it; the gather writes the merged tree's count there, as climb batch 27's gather did (item 380).
6. **Item 403 stays his.** K removes the crash; whether a later undeclared crash in the distance turns a gate red is not decided here.

**Rung V**

7. **V1. The checked getters: a Fortress body where no helper exists, the existing helper where one does.** Default: a getter that can raise is a Fortress body, a range test and `throw IntegerOverflow` around the low-bits form, as `QQ`'s `truncate` throws `DivisionByZero`; the three pairs that have a helper bind it, `ZZ64` to `ZZ32` on `simpleIntArith.longOverflowingToInt` and `NN64` and `ZZ64` to `NN32` on `simpleUnsignedIntArith.longOverflowingToUnsignedInt`, as Steele's prelude binds `asZZ32`. The ways not taken: every getter a Java helper, about four new helpers by the review's reading, up to ten (`reviews/integer-conversions-2026-11-06.md`, option 3, "Helpers"); every getter in Fortress. The review leaves it to the rung; this default adds no Java beyond the review's three pairs.
8. **V2. `IntLiteral`'s 8 in rung V.** Default: so: four of them, `asZZ32`, `asZZ64`, `asNN32` and `asNN64`, are `self.asZZ` followed by `ZZ`'s checked getters, which V adds, so they cannot sit in another rung of this batch; the other four, `asString`, `asExprString`, `=` at `IntLiteral` and `cmp`, are written beside them. The ways not taken: the four that need no getter in a small rung of their own, two rungs on adjacent lines of one object; all 8 in climb batch 29. P-169 asks for them "before the names batch".
9. **V3. `IntLiteral`'s 8 over `asZZ`, not over `ZZ64`** (the judgement's 3.3, row 328): `asString` and `asExprString` both `self.asZZ.asString`, as walk's glue answers both by `IntLiteral$ToString`; `=` as `self.asZZ = b.asZZ`; `cmp` -1, 0 or 1 by `ZZ`'s order, as the glue's `compareTo`. Default: so. `asZZ`, `asFloat` and the 19 that answer an `IntLiteral` stay on glue until N5.
10. **V4. The callers of `ZZ`'s `narrow` and `widen`, moved as the review gives them** (option 6, "Callers moved"): `Library/Format.fss:70`, `:117`, `:122`; `Library/QuickCheck.fss:320`, `:322`, `:323`; the demo `ProjectFortress/demos/sudoku.fss:42-43`, two lines of the team's demo, which become `(truncate(i/3)).asZZ32`; the test `compiler_tests/XXXZZNarrowRungP.fss`, rewritten for `.asZZ32`; and rung I's private count functions in `Library/FortressLibrary.fss`, `shiftCount32`'s and `powerCount32`'s calls of a `ZZ`'s `narrow` (`:723`, `:754`), each under a guard that keeps the value in range, which become `.asZZ32`. Default: so, each value unchanged. Each line is a point for his sight.
11. **V5. The low-bits names declared on every type where they apply,** by the review's option 1 list of nine identities and owners, `ZZ` excepted for `narrow` and `widen` (option 6). Default: so; rows 858 and 859 close.
12. **V6. The specification:** the getters' sentences beside `Specification/basic-lib/basic-integers.tex:39-45`, `ZZ` dropped from `narrow`'s sentence, an Appendix I entry in the revision form (P-96). Default: so, as P-161 asks.

**Rung R**

13. **R1. The reader trait's `read(): Char` on `jbrRead`, the prelude's method, and the -1 at the end in Fortress.** Default: `JavaBufferedReader.read(): Char` is a bare binding on `fileOps.jbrRead`, which answers 0 at the end and sets `eof` (`compiler/runtimeValues/FortressBufferedReader.java:55-70`); walk carries `Char` in an `int`, and the compiled rewrite passes the result through its transfer helper. `FileReadStream`'s and `Reader`'s `uncheckedReadChar(): ZZ32` answer -1 where `under.eof` is set after the read, else the character's `codePoint`, so the library's `characters` generator still ends (section 5, probe 5). The ways not taken: a fourth new helper that answers -1, beside P-164's three; `read(): ZZ32`, which leaves the prelude's method.
14. **R2. `FileWriteStream` a `WriteStream`, with its `flush`** (fork W5's last step; rows 900, 901). Default: so: `object FileWriteStream(fileName: String, under: JavaBufferedWriter) extends { FileStream, WriteStream }`, its `write`s, `flush` and `close` over `under`, as `Writer`'s are. The library's way: `Writer` is a `WriteStream` over the same trait. The way not taken: `FileStream` alone, as the team declared it, with rows 900 and 901 left open.
15. **R3. The glue classes of the three objects stay in the tree, unused,** as rung W left `interpreter/glue/prim/Writer.java` and `BufferedWriter.java`. Default: so; their removal belongs to the names batch's clean-up. The way not taken: delete them in this rung.
16. **R4. The factories `makeJavaBufferedReader(name: FlatString)` on `jbrOpen`, the prelude's name, and `makeJavaBufferedStdIn()` on a new `jbrStdIn`, in UTF-8,** as rung W named the writer's (its decision 3). Default: so; `stdIn` is `Reader("<stdin>", makeJavaBufferedStdIn())`.
17. **R5. The printed texts kept:** `FileReadStream`'s `asString` `<Read handle to "…">`, `FileWriteStream`'s `<Write handle to "…">`, `Reader`'s `Reader on "…"`, each in Fortress over `fileName`. Default: so.
18. **R6. A missing file raises `FileNotFoundException`, and a read after `consume` or a write after `close` raises `IOFailure`, each of the library, which a `catch` sees** (rows 902 and 903's form; fork W4). Default: so, as the helpers raise them; a program that stopped with walk's uncatchable error now stops with the exception's text, or catches it. A point for his sight. Item 384, whether the exceptions carry the helper's message, stays his, at its default: they carry none.
19. **R7. The objects' api headers:** `object FileReadStream(fileName: String, under: JavaBufferedReader)`, `object Reader(fileName: String, under: JavaBufferedReader)` and `FileWriteStream`'s, with the one-argument factories kept, `FileReadStream(filename: String)` as the team named its parameter. Default: so; `Reader`'s `isReady` keeps its name.

**Rung A, if Q2 is answered**

20. **A1. The store's shape: Q2's answer, by default a cell per element.**
21. **A2. The store trait, `JavaArrayStore`, with `get(i: ZZ32): Any`, `put(i: ZZ32, v: Any): ()`, `init(i: ZZ32, v: Any): Boolean` and the factory `makeJavaArrayStore(n: ZZ32)`; and `JavaRR64ArrayStore` with `get(i: ZZ32): RR64`, `init(i: ZZ32, v: RR64): Boolean` and its factory, for `PrimImmutableRR64Array`.** Default: so, in the family of the I/O traits' names, a trait whose values a Java class holds. The ways not taken: a generic trait, whose read at `T` the checker refuses against the helper's `Object` (`compiler/NamingCzar.java:487`); one trait for both stores, which a `double[]` class cannot implement at `Any`.
22. **A3. A read is `cast[\T\](mem.get(i))`, by P-162's pair.** Default: so (P-169, "Gives up"), the library's own form: nine `Vector` and `Matrix` operators and three branches of the array factories already read their declared type through `cast` (F-264). Every walk read now passes a Fortress method and a `typecase`; walk is not timed old against new (his ruling of 2026-10-23, `PLAN-history.md`, "The timed pairs of the walk check dropped"; P-29), so the rung runs the quick pair once on its tree and reports its seconds against P-30's minute, the one walk time the record keeps. The way not taken: a checker rule for a binding at a type parameter.
23. **A4. Walk's loader answers every name of `nativeHelpers.arrayOps` by one rule, the method's name to walk's store glue, where the loader reads the string** (`interpreter/glue/NativeApp.java:209`), apart from H's table entries (`:47-53`). Default: so, as P-169 has walk's loader answer the numerals' names by a rule per class; a misspelt name is still refused at load. The way not taken: table entries beside H's, which would put the merge at risk.
24. **A5. `NativeArray` a plain component; walk's two native objects in `FortressBuiltin`, right after `trait Object`'s end.** Default: so, apart from R's native object at the component's end.
25. **A6. The compiled store's test is a Java unit test** (a `*JUTest` under `ProjectFortress/src/`) of `arrayOps` and the store class, outside and inside compiled transactions on the compiled task pool at four threads. Default: so: the wrapper generator wraps every method of a helper class and fails the import on a type that the prelude does not declare (`fortress-repo`, `compiler.md`, "Natives"), and no declaration may be added to the prelude (P-37), so no compiled Fortress program can bind `arrayOps` before the switch-over. A walk test holds walk's half; the two halves meet at N5.
26. **A7. Row 466 stays:** the store keeps today's rule that a second initialisation of an element is ignored. Default: so.

**Rung K**

27. **K1. One class, `scala_src/useful/PartialOrder.scala`, used at the four sites,** over a list and a strict order, reading each pair at most once: `minimal` and a linear extension `linear`. Default: so, the prototype of section 5, probe 2. The ways not taken: a rank sort, correct and twice as slow by the brief's measurement; Java's legacy merge sort, which raises nothing and is still wrong on a partial order.
28. **K2. A tie keeps the first minimal candidate in the list's order,** where the old code kept the head of TimSort's order. Default: so; on the one library the probe's tables and `run.txt` files are equal outside the crash. The way not taken: TimSort's head wherever TimSort succeeds, which no sort that is correct on a partial order reproduces.
29. **K3. `callType` takes the head of `minimal`, and sorts nothing.** Default: so.
30. **K4. The compiled test: 64 candidates of two chains of traits, in an order that stops the base's checker,** found by the planner's generator at the test's own name and path (section 4, rung K). Default: so; the shuffle that stopped the base in probe 2 may not stop it under another name, since the order follows the names.
31. **K5. The memo is audited on one full run,** by `compiler.md`, "The checker's time", step 5, in an instrumented copy. Default: so.

**Rung H**

32. **H1. The six helpers in `nativeHelpers/runtime.java`,** the team's class over the compiled run time (`loopChunk`, `numThreads`). Default: so; the checker reads the class whole, and every method maps. The way not taken: a new class.
33. **H2. `Thread`'s four raise `FailCalled` on the compiled path, "spawn is not compiled yet", by the prelude's name `fortress.CompilerLibrary$FailCalled`, as the raise strings name the prelude's types until N5; `val` is a pair, `val(): T = cast[\T\](valAny())` over a bare binding at `Any`.** Default: so (P-169). Walk answers all four with today's glue, so walk's `spawn` does not change.
34. **H3. Compiled `abort` throws the compiled `TransactionAbortException` when `BaseTask.inATransaction()`, and does nothing outside a transaction; `printTaskTrace` prints the compiled task chain, one line a task, as walk's does.** Default: so (`Specification/advanced/parallelism-locality/transactions.tex`, "Abortable Atomicity").
35. **H4. The six names in walk's table** (`NativeApp.java:47-53`), each to its glue class. Default: so.

**Rung S**

36. **S1. `systemOps` keeps `getProperty`, which the prelude imports, and `getArgs`; `getEnvironment` leaves it.** Default: so, climb batch 27's fork S1.
37. **S2. Row 895 closes with `--test none` and a note that names the rung's two runs of the checker over `System`.** Default: so, climb batch 27's fork S2.
38. **S3 (with Q3). The two helpers in a new class `nativeHelpers/programArgs`, `count()` and `at(int)`, over one static `String[]` that walk's driver (`StringPrim.GetProgramArgs.registerProgramArgs`) and the compiled main (`runtimeSystem/MainWrapper.java`, `cachedArgs`) both set.** Default: so; not `stringOps`, beside S's first half, and not `systemOps`, which the checker cannot read (row 895).
39. **S4 (with Q3). `args` by `immutableArray[\String\](count).tabulate(…)`; `getProgramArgsPrim` and `getProgramArgs` deleted, neither in `System.fsi`.** Default: so, probe 3's control B.

**Rung T**

40. **T1. The fix is in the comparison that stops, in `dumpMethodChaining`.** Default: so; if it must change the checker's trait table, that is a change of checking code, and T takes P-148's measure.
41. **T2. Row 732, the sibling in the same method, is not T's.** Default: so.

### Points the batch lists for him, not questions

- **The team's lines changed:** `sudoku.fss:42-43` (V4); the library's `Format.fss` and `QuickCheck.fss` callers (V4); `File.fsi`'s and `Reader.fsi`'s headers (R7); `NativeArray.fss` whole (A).
- **What walk does differently:** a missing file and a read after `consume` raise the library's exceptions, which a `catch` sees (R6); `FileWriteStream` takes a rope and has `flush` (R2); walk's array reads pass a Fortress method and a cast (A3).
- **What the compiled path does differently, once it reads the one library:** `abort` works and `Thread`'s four raise (H2, H3); arrays run on the compiled store (A); `System` loads (S with Q3).
- **What the checker does differently:** a call with 32 candidates or more is checked; `Char`'s body is checked again (K).
- **The specification:** the integers' sentences and their Appendix I entry (V6).

## 4. The rungs

Each rung's section is its worker's brief. The `fortress-repo` skill's part on how revived Fortress differs gives the rules of revived Fortress; the briefing keys of section 1 give the decisions, rows and code the rung rests on. A line citation is the base's, `2436f6f25`.

### V. The integer conversions: the checked getters, `bitsAs…`, the low-bits names on every type, `ZZ`'s `narrow` and `widen` deleted, `big` on its helper, and `IntLiteral`'s 8 over `asZZ` (P-161, P-169)

**The mission.** The one library's integer types convert by names that keep the low bits, and a call of one on a type that lacks it falls through a coercion to another type's (rows 858, 859). `ZZ`'s `narrow` and `widen` are wrong code: its `widen` can narrow, and turns 2^63 negative (row 502). P-161 gives every integer type the checked getters, which raise `IntegerOverflow` where the value does not fit, and keeps the low-bits names as what they are. `ZZ32`'s `big` and `ZZ`'s two are 3 of the 102 bindings left on glue. P-169 adds `IntLiteral`'s 8 conversions and comparisons, written in Fortress over its `asZZ`, before the names batch; four of them read the checked getters that this rung adds.

**The decisions this rung builds.** P-161, his option 6 of `reviews/integer-conversions-2026-11-06.md`, whole: on each of `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, the getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ`, 25 in all, of which 5 are identities, 7 equal the coercions and 13 can raise; the four fixed widths' `bitsAs…` getters, which equal `signed` and `unsigned`; `narrow`, `widen`, `unsigned`, `signed` and `big` kept as the low-bits forms, declared on every type where they apply, `ZZ` excepted for `narrow` and `widen`; `ZZ`'s `narrow` and `widen` deleted, their callers moved onto `.asZZ32` or `.asZZ64`; `ZZ32`'s `big` onto `nativeHelpers/simpleArbitraryPrecisionArith.makeZZfromZZ32` (`:130`; P-162); the specification's sentences and an Appendix I entry. P-72 (`narrow` keeps the low 32 bits on the fixed widths), P-73 (fixed-width arithmetic raises) and P-74 (an exact conversion is implicit) stand. P-169: `IntLiteral`'s 8 become Fortress text over its `asZZ`. P-37: no declaration is added to the prelude. This record's section 3, forks 1 to 5 and V1 to V6 (7 to 12), give the defaults you build.

**What you build.**
- The tests first (below).
- `Library/FortressLibrary.fss` and `.fsi`, in the traits `ZZ32` (`:763`), `ZZ64` (`:860`), `NN64` (`:962`) and `ZZ` (`:1050`); `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi`, in `value object NN32` (`:422`): the 25 getters, each in the api; the four `bitsAs…`; the low-bits names where a type lacks one (fork V5). A getter that can raise is a Fortress body with a range test and `throw IntegerOverflow`, except the three pairs that bind an existing helper (fork V1). A new binding over `NN32` or `NN64` is tested on both paths at values where a signed and an unsigned reading differ, 2^31 and up for `NN32`, 2^63 and up for `NN64` (the review's 6.0).
- `ZZ`'s `narrow` and `widen` (`Library/FortressLibrary.fss:1150-1154`, `.fsi`) deleted; `ZZ32`'s `big` (`:854-855`) onto `makeZZfromZZ32`.
- The callers moved, each value unchanged (fork V4): `Library/Format.fss:70`, `:117`, `:122`; `Library/QuickCheck.fss:320`, `:322`, `:323`; `ProjectFortress/demos/sudoku.fss:42-43`; `ProjectFortress/compiler_tests/XXXZZNarrowRungP.fss`; `Library/FortressLibrary.fss:723` and `:754`, in rung I's private count functions. Find every other call of a `ZZ`'s `narrow` or `widen` with `git grep` and by the walk suite; name each in your report.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `value object IntLiteral` (`:529`): `asZZ32`, `asZZ64`, `asNN32`, `asNN64` as `self.asZZ` followed by `ZZ`'s getter; `asString` and `asExprString` as `self.asZZ.asString`; `=` at `IntLiteral` as `self.asZZ = b.asZZ`; `cmp` as -1, 0 or 1 by `ZZ`'s order (forks V2, V3). Their api lines (`FortressBuiltin.fsi:190-240`, `value object IntLiteral`) stay.
- `Specification/basic-lib/basic-integers.tex:39-45`: the getters' sentences beside `narrow`'s, `ZZ` dropped from it, with a callout and an Appendix I entry in `Specification/appendices/changes.tex`, in the revision form (P-96; fork V6). The entry "Shifts and narrowing on the integer types" (`changes.tex:1725`, label `revival-shifts`) and its callout (`basic-integers.tex:63-66`) state `narrow` on `ZZ`: amend the clauses that your deletion makes false, as climb batch 27's rung N amended one clause of another entry, and name each in your report.
- Not yours: the prelude; `IntLiteral`'s other 21 and `FloatLiteral`'s 3 (N5); the saturating operators (row 797); Appendix I's natives effect, which the gather revises (fork 5).

**Tests, first.**
- `ProjectFortress/tests/IntegerConversionsWalk.fss`: each of the 25 getters at its edges, in range and one past each end, the 13 that can raise caught as `IntegerOverflow`; the four `bitsAs…`; each low-bits name on each type that now declares it; a `ZZ` that once took `narrow` or `widen`, now `asZZ32` or `asZZ64`, in range and out. Seen failing on the base through the harness: the getters do not exist.
- `ProjectFortress/tests/IntLiteralTextWalk.fss`: the 8 at the object `IntLiteral` (its value 0; P-76: no walk numeral is an `IntLiteral`), and `ZZ32`'s `big` of 2^31-1 and -2^31. A guard: the same answers on the base and after, since walk answers them today by glue.
- A compiled test of each new helper binding, if fork V1 adds one, bound in its own declarations as `compiler_tests/NativeHelperBindingCompiled.fss` binds a helper (`compiler.md`, "Natives").
- `XXXZZNarrowRungP` rewritten (fork V4): its run before and after through `junit.sh`.
- Keep their verdicts: walk's integer tests, `FlatTowerRungF`, `NativeHelperFamilyZZ32Walk` and the other families' tests; the demo driver at the gather.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled tests through `junit.sh` (fork 2).

**The stages.** Both, once each on your final tree (fork 3), from the tree's root after `ant compileAll`:

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-integer-conversions/checker-count-postedit.txt tmp/rung-integer-conversions/cc-post
    explorations/coordinator/tools/distance/run.sh tmp/rung-integer-conversions/distance-postedit.txt tmp/rung-integer-conversions/dist-post

Compare each with climb batch 27's gate table by `diff`, and the distance with `explorations/coordinator/tools/distance/compare.sh`; tie every new row to an edit. The crash rows: section 1's common fields.

**Rows.** Rows 858, 859 and 502 close with your commit, each with its test; row 349's half on `narrow` of a `ZZ` closes, so your `record.md` gives its whole new line after you read it with `ledger.py show 349`. Row 578 stays.

**Specification.** Yours: fork V6. List every sentence made false: F-172 and every FACTS entry on `ZZ`'s `narrow` or `widen` (`facts-extract.sh 'narrow'`), the `fortress-repo` skill's parts on the library and on how revived Fortress differs, where they name the conversions, PLAN's line on P-161.

**Files.**
- `Library/FortressLibrary.fss` and `.fsi`: the four integer traits, rung I's two count functions, only.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi`: `value object NN32`, `value object IntLiteral`, only.
- `Library/Format.fss`, `Library/QuickCheck.fss`, `ProjectFortress/demos/sudoku.fss`: the callers, only.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/`: a helper only where fork V1 needs one.
- `Specification/basic-lib/basic-integers.tex`, `Specification/appendices/changes.tex`: your entry, only.
- `ProjectFortress/tests/`, `ProjectFortress/compiler_tests/`: your tests and `XXXZZNarrowRungP`.
- Not: the prelude, walk, the checker, the tools, the natives effect of Appendix I.

**Reserved points.** A step that would edit the prelude. A model line: none reaches a conversion (the review, section 5).

**Overlaps by file.** `FortressLibrary.fss` with R (the reader trait, `:1959-1967`), A (its store trait, before `__parr`, `:2392`) and H (`printTaskTrace`, `:4625`): other declarations. `FortressBuiltin.fss` with R and A (native objects at other places) and H (`Thread`, `:775-786`). `FortressLibrary.fsi` with R and A. `changes.tex`: yours is the batch's only Appendix I entry.

### R. N4's reader rung: `FileReadStream`, `Reader` and `FileWriteStream` over the Java-backed traits, and `File` and `Reader` plain components (P-164)

**The mission.** Every file a program reads, microGPT's data among them (`explorations/run-c4/src/FlatData.fss:69-86`), goes through `FileReadStream`, an object of the native component `File` whose 10 methods name glue classes that only walk can call; `Reader` and `stdIn` are the same in `Reader`'s component, 10 more; `FileWriteStream`'s 5 stayed on glue in climb batch 27, since an object of a native component cannot hold a field under walk (row 926). This rung makes the three objects plain Fortress objects over a Java-backed value in a field, as rung W made `Writer`, and ends both components' nativeness, so their 25 glue bindings go.

**The decisions this rung builds.** P-164: the two traits take the prelude's names and methods; each method is a public native binding in P-58's form on a helper of `nativeHelpers/fileOps`; walk's loader carries `JavaBufferedReader` by name as the Java class `FortressBufferedReader`, through a private native object below the trait; `FileReadStream` and `Reader` leave their native components and each holds its Java-backed value in a field, as the team's `BirdyLib` `FileReadStream` does; the reader side's helpers are 9 existing and one new one for standard input. Item 373: `FileWriteStream` moves with this rung. F-330 gives the writer side as landed: both traits, both table entries (`compiler/NamingCzar.java:453-454`, `:490-491`), `FileNotFoundException`. No model line changes. This record's section 3, forks 1 to 5 and R1 to R7 (13 to 19), give the defaults you build.

**What you build.**
- The tests first (below).
- `Library/FortressLibrary.fss:1959-1960` and `.fsi:1265-1266`: `trait JavaBufferedReader` gains the prelude's eight methods (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:592-601`), each a public binding on its `fileOps` helper: `read(): Char` on `jbrRead` (fork R1), `readLine(): String` on `jbrReadLine`, `readk(k: ZZ32): String` on `jbrReadk`, `eof(): Boolean`, `ready(): Boolean`, `close()`, `whenUnconsumed()` and `consume()` on theirs. After `makeJavaBufferedStdErr` (`:1966-1967`, `.fsi:1271`): `makeJavaBufferedReader(name: FlatString)` on `jbrOpen`, and `makeJavaBufferedStdIn()` on a new `jbrStdIn` (fork R4).
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java`: `jbrStdIn()`, a `FortressBufferedReader` over `System.in` in UTF-8, named `<stdin>`, beside `jbwStdErr` (`:91-94`), as `jbwStdOut` is made.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, right after `JavaBufferedWriterObject` (`:788-791`): `private object JavaBufferedReaderObject extends JavaBufferedReader end`, its native constructor a new `interpreter/glue/prim/JavaBufferedReaderObject.java` with its nested `Value` holding a `FortressBufferedReader`, as `JavaBufferedWriterObject.java` is.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`: `javaFor` carries `JavaBufferedReader` by name in `FortressBufferedReader` (beside `:67`), `carried` admits it (`:100`), `unbox` takes the reader out of a `JavaBufferedReaderObject.Value` (beside `:292-295`), `box` makes one (beside `:318`).
- `Library/File.fss` and `.fsi`: `component File`, no longer native; `object FileReadStream(fileName: String, under: JavaBufferedReader) extends { ReadStream, FileStream }`, its methods in Fortress over `under`, `uncheckedReadChar` answering -1 at the end by `under.eof` (fork R1), `asString` as today's text (fork R5); its factory `FileReadStream(filename: String)` flattens the name and calls `makeJavaBufferedReader`, as `Writer(fileName)` does (`Library/Writer.fss:21-24`); `object FileWriteStream(fileName: String, under: JavaBufferedWriter) extends { FileStream, WriteStream }`, its `write`s, `flush` and `close` over `under` (fork R2), with its factory.
- `Library/Reader.fss` and `.fsi`: `component Reader`, no longer native; `stdIn` is `Reader("<stdin>", makeJavaBufferedStdIn())`; `object Reader(fileName: String, under: JavaBufferedReader)`, its methods over `under`; its one-argument factory.
- Not yours: the writer side's text; the prelude; `FortressBufferedReader` and the other run-time classes; the glue classes, which stay unused (fork R3); N5's run-time class and raise strings.

**Tests, first.**
- `ProjectFortress/tests/NativeHelperReaderWalk.fss`: a file that the test writes through `FileWriteStream` (a flat string, two characters, a rope past 32 characters, `flush`), read back through `FileReadStream`: `readLine`, `readChar`, `read(k)`, `eof` and `ready`, `uncheckedReadChar` -1 at the end, `lines()` and `characters()` counted, a read after `consume` caught as `IOFailure`, a missing file caught as `FileNotFoundException`; the same through a `Reader` on the file, `isReady` among them; `stdIn.fileName` and its `asString`; each object's `asString`. Seen failing on the base through the harness: the rope stops (row 900), `flush` is missing (row 901), and no `catch` sees the missing file (row 902).
- `ProjectFortress/compiler_tests/NativeHelperFamilyReaderCompiled.fss` and its `.test`: `jbrStdIn` and the reader helpers bound in its own declarations over the prelude's `JavaBufferedReader`, on a file it writes: the 0 at the end with `eof` set, `readk`, the refusal after `consume`. Seen failing on the base through `junit.sh`: `fileOps` has no `jbrStdIn`.
- Keep their verdicts: `FileReadWrite`, `WordCountSmall`, `FileConversion`, `LongStringTests`, `NativeHelperWriterWalk`, `NativeHelperFamilyWriterCompiled`; `tests/printing/ConcurrentPrinting.fss` at four threads, on the old code and the new.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled guard through `junit.sh` (fork 2).

**The stages.** Both, once each on your final tree, as rung V's section gives the commands with your slug (fork 3). They read `FortressLibrary`'s trait and `FortressBuiltin`'s native object; neither reads `File` or `Reader`.

**Rows.** Rows 926, 900, 901 and 902 close with your commit, each with your walk test. Row 841, walk's want of an export check, stays as it is. Row 928 holds the writer trait's limit, and the reader trait has the same; its notes have 23 characters left of 700, so your `record.md` gives its whole new line, its claim naming both traits, after you read it with `ledger.py show 928`.

**Specification.** None: the specification names none of the I/O objects (rung W's report, "What the specification settles"). List every sentence made false: F-330's and F-32's counts, P-164's "The writer side … moves before the reader side" as a statement of what is to come, PLAN's N4 reader line, the `fortress-repo` skill's part on the interpreter, its list of carriers.

**Files.**
- `Library/FortressLibrary.fss` and `.fsi`: `JavaBufferedReader` and the two factories, only.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: the native object after `JavaBufferedWriterObject`, only.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`: the four methods, only; `interpreter/glue/prim/JavaBufferedReaderObject.java`, new.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java`: `jbrStdIn`, only.
- `Library/File.fss`, `File.fsi`, `Reader.fss`, `Reader.fsi`.
- Your tests.
- Not: `Library/Writer.fss`, the prelude, `compiler/runtimeValues/`, `NamingCzar.java`, the glue classes of the three objects, the checker.

**Reserved points.** A printed line of microGPT's quick check that changes. An edit of a run-time class.

**Overlaps by file.** `FortressLibrary.fss` and `.fsi` with V (the integer traits), A (its store trait, near the arrays' factories) and H (`printTaskTrace`): other declarations. `FortressBuiltin.fss` with A, whose native objects go right after `trait Object`'s end (fork A5), and with V and H: other declarations. No other rung edits `StaticNativeApp.java`, `fileOps.java`, `File` or `Reader`.

### A. The arrays' store: `PrimitiveArray` and `PrimImmutableArray` over a compiled store in a field, walk's `AtomicArray` behind P-167's device, and `PrimImmutableRR64Array` over a `double[]` class (P-169; Q2)

**This rung builds shape (ii), the slot API: Q2's answer** (section 2). The shape (i) line of "What you build" does not apply. The store holds an `Object[]`, and `runtimeSystem/Transaction.java` gains the slot calls that "What you build" names; your four-task test inside `atomic` is the first run of that code at four threads.

**The mission.** Every array, vector, matrix, varargs list and `args` of the one library is built on `PrimitiveArray` or `PrimImmutableArray` (`Library/FortressLibrary.fss:2392-2398`, `:2655`, `:2702`, `:2708`, `:2879`, `:3051`, `:3281`; `Library/List.fss:488`; `Library/System.fss:34`; `compiler/WellKnownNames.java:53-56`), objects of the native component `NativeArray` whose 7 methods name glue classes. A body left on glue compiles to the one library's own `builtinPrimitive`, which fails, so by reading a compiled program would raise at its first array (`reviews/natives-remainder-2026-11-07.md`, section 1, finding 1). This rung puts the elements in a compiled store behind a Java-backed trait, and keeps walk's store as it is.

**The decisions this rung builds.** P-169, its arrays: a store trait in `FortressLibrary` whose bindings name helpers of a new `nativeHelpers/arrayOps` over a compiled class that holds the elements; `PrimitiveArray` and `PrimImmutableArray` leave the native component and hold the store in a field; walk's native object below the trait holds an `AtomicArray`, and walk answers the `arrayOps` names with its glue, re-targeted, P-167's device; `PrimImmutableRR64Array`'s two move onto a compiled `double[]` class that no factory chooses until decision A (P-84, P-85). Q2's answer gives the compiled store's shape. P-164 gives the pattern of a Java-backed trait, its native object and its table entry. This record's section 3, forks 1 to 5 and A1 to A7 (20 to 26), give the defaults you build.

**What you build.**
- The tests first (below).
- `Library/FortressLibrary.fss` and `.fsi`, right before `__parr` (`:2392`) and in the api beside the array factories (`.fsi:1594-1604`): `trait JavaArrayStore excludes { String, Number, Boolean, Char, JavaBufferedReader, JavaBufferedWriter }` with `get(i: ZZ32): Any`, `put(i: ZZ32, v: Any): ()` and `init(i: ZZ32, v: Any): Boolean`, each a binding on `arrayOps`, and `makeJavaArrayStore(n: ZZ32): JavaArrayStore`; `trait JavaRR64ArrayStore` with `get(i: ZZ32): RR64`, `init(i: ZZ32, v: RR64): Boolean` and `makeJavaRR64ArrayStore(n: ZZ32)` (fork A2).
- `ProjectFortress/LibraryBuiltin/NativeArray.fss` and `.fsi`: `component NativeArray`, no longer native (fork A5); `PrimitiveArray[\T, nat s0\]()` with the field `mem: JavaArrayStore = makeJavaArrayStore(s0)`, `get(i) = cast[\T\](mem.get(i))` (fork A3), `put` and `init00` over `mem`; `PrimImmutableArray` likewise without `put`; `PrimImmutableRR64Array` over a `JavaRR64ArrayStore`. Their `opr [ ]`, `init0` and the comment on a failed transaction stay.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, right after `trait Object`'s end (`:52`): `private object JavaArrayStoreObject extends JavaArrayStore end` and `private object JavaRR64ArrayStoreObject extends JavaRR64ArrayStore end`, each with a native constructor under `interpreter/glue/prim/` whose value holds walk's store: an `AtomicArray` for the first, as `PrimitiveArray.java:26-36` makes one, and walk's `double[]` for the second, as `PrimImmutableRR64Array.java:39-46` does.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`, where the loader reads the string (`:209`): every name of `com.sun.fortress.nativeHelpers.arrayOps` answered by walk's store glue by one rule, the method's name to the glue class's operation; a name that the rule does not hold is refused at load, as today (fork A4). The glue operations are today's `get`, `put` and `init0` of `PrimitiveArray.java`, `PrimImmutableArray.java` and `PrimImmutableRR64Array.java`, re-targeted to the new native objects' values.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/arrayOps.java`, new: `make(int)`, `get(store, int)`, `put(store, int, Any)`, `init(store, int, Any)`, and the `RR64` store's three over `double`. Every method's types map to the one library (`compiler.md`, "Natives"), since the checker reads the class whole (F-321).
- `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/`, new: the store class and the `RR64` store class over a `double[]`. **Shape (i):** the store holds a `MutableFValue[]`, its cells made with it; `get` and `put` test `BaseTask.inATransaction()` and call `TXRead` and `TXWrite` on the element's cell, else `getValue` and `setValue`, as `compiler/codegen/VarCodeGen.java:310-371` emits for a variable. **Shape (ii):** the store holds an `Object[]`; `runtimeSystem/Transaction.java` gains a location key, `TXReadSlot(Object[], int)` and `TXWriteSlot(Object[], int, Any)`, and slot cases in `TXValidateHelperTopLevelTransaction`, `TXValidateHelperNestedTransaction` and both branches of `TXCommit`, its element accesses by a volatile `VarHandle` (the planner's model, section 5, probe 1); `BaseTask` unchanged.
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, the walk-world table, after `:491`: the two store classes to `JavaArrayStore` and `JavaRR64ArrayStore`.
- Not yours: decision A (no factory chooses the `RR64` store); the code generator and the class loader; the prelude; `Thread` and H's table entries.

**Tests, first.**
- `ProjectFortress/tests/ArrayStoreWalk.fss`: arrays of each rank, vectors and an immutable array made, written, read, filled twice (row 466's answer, unchanged), subscripted out of bounds; writes to distinct elements from a parallel `for`, and `atomic` read-modify-writes of one element from a parallel `for`, whose sum is exact; `PrimImmutableRR64Array` made through its own constructor and read. A guard on the base, and passing after; run it at four threads too.
- `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ArrayStoreJUTest.java` (fork A6): `arrayOps` over the store class outside a transaction, inside one, and from four tasks on the compiled task pool each adding into one element inside `atomic`, whose total is exact; the `RR64` store. Seen failing on the base: the classes do not exist. Run it with `ant testOnly -DtestPattern=ArrayStoreJUTest`.
- Keep their verdicts: the walk suite's array, vector, matrix and `atomic` tests; the demos at the gather.
- After the change: `ant testSystem` and `ant testQuick` once each (fork 2).

**The measure.** P-30's: the quick pair once on your tree, `explorations/coordinator/tools/mg-run.sh tmp/rung-array-store/mg rung-array-store` from your tree's root, in the background with its log, after your last change of code is built; report both `VERDICT` lines and both `secs=` lines (climb batch 27's landing: `ALL PASS`, 42 s and 35 s, `compile-ladder/climb-batch-27/gate/summary.txt`). Walk is not timed old against new (fork A3), so do not run the pair on the old code.

**The stages.** Both, once each on your final tree, as rung V's section gives the commands with your slug (fork 3). They read `NativeArray`, `FortressLibrary`, `FortressBuiltin` and `arrayOps` whole.

**Rows.** Row 466's claim stays; its notes cite the glue's `init0`, which your change moves, and have 31 characters left of 700, so your `record.md` gives its whole new line, its notes citing the store's `init`, after you read it with `ledger.py show 466`.

**Specification.** None. List every sentence made false: F-32 and F-299's counts, F-11 and F-18 where they say what holds an array's elements, PLAN's D2 line, the `fortress-repo` skill's parts on the compiled path and on the library, where they name the arrays' store.

**Files.**
- `Library/FortressLibrary.fss` and `.fsi`: the two traits and their factories, only.
- `ProjectFortress/LibraryBuiltin/NativeArray.fss` and `.fsi`.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: the two native objects after `trait Object`, only.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`: the rule, only; new classes under `interpreter/glue/prim/`; the three store glue classes, re-targeted.
- `nativeHelpers/arrayOps.java` and the two store classes, new; `NamingCzar.java`'s two entries; `runtimeSystem/Transaction.java` with shape (ii) only.
- Your tests.
- Not: the code generator, the class loader, the prelude, `StaticNativeApp.java`, `NativeApp.java`'s table.

**Reserved points.** A change of the compiled transaction beyond shape (ii)'s; a model line; the quick pair past P-30's minute on your tree, or a check of it that fails.

**Overlaps by file.** `NativeApp.java` with H, whose six names go into the table (`:47-53`): your rule is at `:209`. `FortressLibrary.fss` and `.fsi` with V, R and H: other declarations. `FortressBuiltin.fss` with V, R and H: your objects after `trait Object`, R's at the component's end. `NamingCzar.java`: yours alone.

### K. The checker's four sorts by a partial order made a linear extension, read once a pair (row 929; P-148)

**The mission.** The compiled checker sorts with Scala's `sortWith` by an order that is partial: a call's candidates by `moreSpecific`, the coercions' candidates by `moreSpecificCandidate`, and a trait's ancestors by subtyping. `sortWith` reads two elements that neither precedes as equal, which is not transitive, and Java's TimSort, which checks the order's contract when it merges 32 elements or more, raises 'Comparison method violates its general contract!'. Since climb batch 27 the distance stage stops so inside `value object Char`, at `x = -1` in `digit`, which meets 33 candidates of `=`, and does not check the rest of `Char`'s body, its 41 helper bindings among it (row 929; F-54). This rung makes the four sorts correct on a partial order, and by P-148 as fast as today.

**The answers this rung follows.** Row 929: the four sites, `Functionals.scala:761` (the call's sort) and `:728` (`callType`), `CoercionOracle.scala:255`, `Formula.scala:609`. P-148: the rung times the checker before and after, makes the change correct first, then fast, in the same rung, without changing which programs the checker accepts or refuses. The brief records a rank sort that fixed the crash at 299 s of the distance stage against 137 s. The planner's prototype (section 5, probe 2) removed both crash rows, kept every other result of both stages, and took 145 s against 140 s for the distance and 88.9 s against 88.9 s for the count. This record's section 3, forks 1 to 3, 6 and K1 to K5 (27 to 31), give the defaults you build.

**What you build.**
- The test first (below).
- `ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala`, new (fork K1): `class PartialOrder[T](xs: List[T], lt: (T, T) => Boolean)` that reads `lt` at most once a pair through a memo, with `minimal`, the elements that no other element is `lt`, in `xs`'s order, and `linear`, a linear extension, each element after every element `lt` it and otherwise in `xs`'s order; on a cycle, the rest in `xs`'s order. An element is compared with each other element, not with itself; where `xs` holds one object twice, the two are not each other's predecessors, as the old `minimal`'s `!(d eq c)` reads them.
- `scala_src/typechecker/impls/Functionals.scala`: `minimal` (`:717`) over the class; `callType` (`:727-728`) the head of `minimal`, or `cs.head` where it is empty (fork K3); the call's sort (`:761`) and `top` (`:776`) from one `PartialOrder` over the candidates, so they share its memo; the tie at `:824-833` keeps `sorted.headOption`, now the first minimal candidate (fork K2).
- `scala_src/typechecker/CoercionOracle.scala:255` and `Formula.scala:609`: the class's linear extension with each site's own predicate.
- The second pass: a profile of the count stage's checker with JFR (`compiler.md`, "The checker's time"); take any gain that it shows, and audit the memo on one full run in an instrumented copy (fork K5).
- Not yours: which candidate the rules make most specific; `moreSpecificCandidate` itself; item 403.

**Test, first.** `ProjectFortress/compiler_tests/PartialOrderCandidatesCompiled.fss` and its `.test` (`compile`, `link`, `run`, `run_out_contains=PASS`): two chains of traits `T0` to `T7` and `U0` to `U7`, each extending the one before, `object A extends T7`, `object B extends U7`, and the 64 declarations `f(x: Ti, y: Uj): ZZ32 = 100 i + j` in an order that stops the base's checker, with `run` asserting `f(A, B)` is 707 and printing `PASS` (fork K4). The order follows the overloadings' names, so find it at the test's own name and path: generate shuffles with the planner's generator below, each written to `compiler_tests/PartialOrderCandidatesCompiled.fss`, and compile each on the base through `old-fortress.sh` until one stops with 'Comparison method violates its general contract!' at `Functionals.scala:761`; in probe 2, one of twelve did. Seen failing on the base through `junit.sh`; passing after.

    import random, sys      # gen.py SEED: the 64 declarations in a shuffled order, blank lines between
    seed, n, name = int(sys.argv[1]), 8, "PartialOrderCandidatesCompiled"
    rnd = random.Random(seed)
    out = ["component " + name, "export Executable", ""]
    for c in "TU":
        out += ["trait %s%d%s end" % (c, i, "" if i == 0 else " extends %s%d" % (c, i - 1)) for i in range(n)]
    out += ["object A extends T%d end" % (n - 1), "object B extends U%d end" % (n - 1), ""]
    decls = ["f(x: T%d, y: U%d): ZZ32 = %d" % (i, j, 100 * i + j) for i in range(n) for j in range(n)]
    rnd.shuffle(decls)
    for d in decls: out += [d] + [""] * rnd.randint(0, 2)
    out += ["run():() = do", "  assert(f(A, B), 707, \"the most specific of 64\")", "  println(\"PASS\")", "end", "", "end"]
    open(name + ".fss", "w").write("\n".join(out) + "\n")

Keep their verdicts: the compiler track and the library track, `ant testQuick` once after the second pass (`compiler.md`, "The checker's time", step 4).

**The measure.** P-148's, as `compiler.md`, "The checker's time", gives it: the count stage on the base build and on your change, `base` and `change`, then `pass` after the second pass; each run's seconds, the diff of the `base` and `change` tables, the comparison of their `run.txt` files with each tree's path replaced, and that `pass` has `change`'s results. Then the distance stage once on your final tree, as rung V's section gives the command with your slug: `#crash none`, and `@@TC DECL-OK` on `FortressBuiltin.fss:661:1-773:2` in its `run.txt`; compare with climb batch 27's gate table by `compare.sh`, which prints the two crash rows as gone.

**Rows.** Row 929 closes with your commit, its test `PartialOrderCandidatesCompiled`.

**Specification.** None. List every sentence made false: F-54's two crash rows; F-53's "its check of `value object Char` did not finish, so the 0 holds no completed check of that declaration's body"; PLAN's line on row 929 and its "Where we stand".

**Files.**
- `scala_src/useful/PartialOrder.scala`, new; `scala_src/typechecker/impls/Functionals.scala`, `CoercionOracle.scala`, `Formula.scala`: the four sites, only.
- `ProjectFortress/compiler_tests/`: your test.
- Not: the rest of the checker, the code generator, walk, the library, the tools.

**Reserved points.** A change of any error, its text or its place, on the one library, or of a compiled test's verdict: the change is then not only a sort.

**Overlaps by file.** None: no other rung edits the checker.

### H. The run time's own threads, `abort` and the task trace on compiled helpers that walk's loader answers with its glue (P-169)

**The mission.** `Thread`'s `val`, `wait`, `ready` and `stop` and the top-level `abort` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:775-786`), and `printTaskTrace` (`Library/FortressLibrary.fss:4625`), name glue classes. After the names batch a compiled body left on glue falls through to the library's `builtinPrimitive`, which fails. Walk desugars every `spawn` into `Thread` (`interpreter/rewrite/DesugarerVisitor.java:1004-1030`), and `abort` reruns the innermost `atomic` (`Specification/advanced/parallelism-locality/transactions.tex`, "Abortable Atomicity"). This rung names compiled helpers for all six and keeps walk's answers.

**The decisions this rung builds.** P-169, its threads: helpers in a `nativeHelpers` class over the compiled run time, as the team's `nativeHelpers/runtime.java` is; `Thread`'s four raise until the code generator compiles `spawn` (row 82); walk's loader answers the names with today's glue, P-167's device. P-58: the binding's form. F-298: the compiled rewrite checks a binding against the helper's Java signature, so `val(): T` cannot name a helper that answers `Object`: a pair (P-162). This record's section 3, forks 1 to 5 and H1 to H4 (32 to 35), give the defaults you build.

**What you build.**
- The tests first (below).
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java` (fork H1): `abort()`, which throws `runtimeSystem.TransactionAbortException` when `BaseTask.inATransaction()` and else returns; `printTaskTrace()`, the compiled task chain from `BaseTask.getCurrentTask()` through its `parent` (`runtimeSystem/BaseTask.java:46`), one line a task, as walk's `BaseTask.printTaskTrace` prints (`interpreter/evaluator/tasks/BaseTask.java:171-177`); `threadVal`, `threadWait`, `threadReady` and `threadStop`, each over `fortress.AnyType.Any` and raising `FailCalled` "spawn is not compiled yet" by `Utility.makeFortressException("fortress.CompilerLibrary$FailCalled", …)` (fork H2).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:775-786`: `Thread`'s `val(): T = cast[\T\](valAny())` over a bare binding `valAny(): Any` on `runtime.threadVal`; `wait`, `ready` and `stop` bare on theirs; `abort` on `runtime.abort`. `Library/FortressLibrary.fss:4625`: `printTaskTrace` on `runtime.printTaskTrace`. The apis do not change, but for `valAny` if the api must declare it.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:47-53`: six entries in `OWN_OPERATIONS`, each helper's name to today's glue: `Thread$val`, `Thread$wait`, `Thread$ready`, `Thread$stop`, `Thread$abort`, `StringPrim$PrintTaskTrace` (fork H4). Walk's `Thread` constructor stays glue.
- Not yours: compiled `spawn` (row 82); walk's tasks and transactions; the compiled transaction; A's rule at `NativeApp.java:209`.

**Tests, first.**
- `ProjectFortress/tests/RuntimeOwnOperationsWalk.fss`: `spawn` with `val`, `wait`, `ready` and `stop`; `abort()` outside `atomic`, which does nothing; `abort()` inside `atomic` on the first try of a block that counts its tries in a variable outside it, whose second try commits; `printTaskTrace()` from a spawned task. A guard on the base and after: walk answers each as today.
- `ProjectFortress/compiler_tests/RuntimeOwnOperationsCompiled.fss` and its `.test`: `runtime.abort` bound in its own declarations, called outside `atomic` and inside one on its first try; `runtime.printTaskTrace` from a compiled `for`'s task, `run_out_contains` its first line; `runtime.threadVal` caught as `FailCalled`. Seen failing on the base through `junit.sh`: `runtime` has no such helper.
- Keep their verdicts: `tests/taskTrace2.fss`, `taskTrace3.fss`; the walk suite's `spawn` and `atomic` tests; `Library/Lazy.fss`'s `abort` by any test that reaches it.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled test through `junit.sh` (fork 2).

**The stages.** Both, once each on your final tree, as rung V's section gives the commands with your slug (fork 3): `runtime.java` is read whole for the first time.

**Rows.** Row 82 stays; your `record.md` gives a note that `Thread`'s helpers raise until `spawn` compiles, after `ledger.py note 82 TEXT --check`.

**Specification.** None. List every sentence made false: F-32 and F-299's counts, F-328's table of two names, PLAN's D2 line.

**Files.**
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java`.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` (and `.fsi` for `valAny` only if needed): `Thread` and `abort`, only.
- `Library/FortressLibrary.fss`: `printTaskTrace`, only.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`: `OWN_OPERATIONS`' static block, only.
- Your tests.
- Not: the code generator, walk's tasks, `runtimeSystem/`, `NativeApp.java` beyond the table.

**Reserved points.** A change of walk's `spawn` or `atomic`; a compiled run that the helpers change beyond the six names.

**Overlaps by file.** `NativeApp.java` with A, whose rule is at `:209`. `FortressBuiltin.fss` with V (`NN32`, `IntLiteral`), R (its object at the end) and A (its objects after `trait Object`). `FortressLibrary.fss` with V, R and A: other declarations.

### S. `System`'s natives: `getEnvironment` and `getProperty` onto `stringOps`, and, with Q3's answer, `args` built in Fortress over two scalar helpers (item 355; row 895; Q3)

**Its second half runs: Q3's answer is option 1** (section 2). Build both halves.

**The mission.** The territory map's table of what moves with what gives the rule behind this rung: the compiled path's wrapper generator wraps every method of a helper class that it is given, and fails the import on a type that it cannot map (`map/README.md`, section 7, its row on `nativeHelpers/`). Against the one library, the checker reads a helper class in the same way (F-321). `System`'s two bindings name `systemOps`, whose `getArgs` answers a type that the one library does not declare, so the checker cannot read `System`, which both microGPT programs import. With the first half the checker reaches `System`'s component and finds two errors, at `args` and `getProgramArgs`; with the second half it reads `System` whole with no error (section 5, probe 3).

**The decisions this rung builds.** Review-queue item 355, answered with option 1: the two helpers moved from `systemOps` into `stringOps`, the class of the other string helpers, with the two binding strings and a compiled guard; row 895 closes when this lands. F-321: a binding passes the checker only where every method of its helper class maps to the one library's types. P-37: the compiler's prelude is not changed before it is deleted. Row 896 stays. With Q3's answer: its option 1, two scalar helpers outside `systemOps`, a count and the i-th argument, and `args` built in Fortress by the library's immutable-array factory (`reviews/natives-remainder-2026-11-07.md`, section 2.5 (a)). This record's section 3, forks 1 to 5 and S1 to S4 (36 to 39), give the defaults you build.

**What you build, the first half.**
- The tests first (below).
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java`: `getProperty(String, String)` and `getEnvironment(String, String)`, each computing as `systemOps`' does (`nativeHelpers/systemOps.java:20-27`), right after `lineSeparator` (`stringOps.java:76-78`).
- `Library/System.fss:41` and `:51`: their strings name `stringOps`.
- `nativeHelpers/systemOps.java`: `getEnvironment` removed; `getProperty` and `getArgs` stay (fork S1).
- `ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss:16-17`: the two bindings name `stringOps`.

**What you build, the second half (Q3).**
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/programArgs.java`, new (fork S3): a static `String[]`, `count()` and `at(int)`. `interpreter/glue/prim/StringPrim.java`'s `GetProgramArgs.registerProgramArgs` (`:121-123`) and `runtimeSystem/MainWrapper.java` (`cachedArgs`, `:21`, `:67`) each set it from the arguments that they already hold.
- `Library/System.fss:29-35` (fork S4): `args : ImmutableArray[\String,ZZ32\] = immutableArray[\String\](programArgCount()).tabulate(fn (i:ZZ32): String => programArg(i))`, over two private bindings `programArgCount(): ZZ32` and `programArg(i: ZZ32): String` on the two helpers; `getProgramArgsPrim` and `getProgramArgs` deleted. `System.fsi` declares only `args` (`:28`), and does not change.
- Not yours: `Library/CompilerSystem.fss` and its deletion (item 319); `systemOps.getArgs`; row 896; the arrays' store, which a compiled `args` needs (rung A).

**Tests, first.**
- The compiled guard, `NativeHelperFamilyStringCompiled`, retargeted: seen failing on the base through `junit.sh`, where `stringOps` has no `getProperty`, and passing after.
- With Q3: `ProjectFortress/tests/SystemArgsWalk.fss`, which asserts `|args|` is 0, as the harness passes no argument, and prints each element; a guard on the base and after. Run it once by hand with two arguments on the old code and the new (`bin/fortress ProjectFortress/tests/SystemArgsWalk.fss a b`), and report both outputs: no harness key passes arguments (`grep` of the `.test` files finds none). A compiled test binding `programArgs.count` and `at` in its own declarations, asserting the count 0; seen failing on the base through `junit.sh`.
- Keep their verdicts: walk's `NativeHelperStringRopeWalk`, which calls `getEnvironment` and `getProperty` at ropes and flat strings; every test that reads `args`; the compiler track's tests that import `CompilerSystem`.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled tests through `junit.sh` (fork 2).

**The measure.** The checker over `System` against the one library, once on your final tree, by the planner's command (section 5, probe 3, and `CLIMB-BATCH-27.md`, section 5, probe 3):

    SCR=$PWD/tmp/sys-check; mkdir -p $SCR/classes $SCR/caches
    CP=$(bin/fortress_classpath | tail -1)
    javac -nowarn -cp "$CP" -d $SCR/classes explorations/coordinator/tools/checker-count/WorldFlip.java \
        explorations/coordinator/tools/checker-count/shadow-src/com/sun/fortress/compiler/StaticChecker.java
    java -Xmx4g -Xss64m -Dfortress.caches=$SCR/caches -Dfortress.analyzer.overload.cache=false \
        -cp $SCR/classes:$CP WorldFlip -stop check Library/System.fss

Its before: 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.'. After the first half: the two errors at `System.fss:29` and `:35`, as probe 3's control A. After the second half: `### rc=0`, as control B. Report the run's error lines.

**The stages.** Both, once each on your final tree, as rung V's section gives the commands with your slug (fork 3): both read `stringOps` whole. Neither reads `System` or `programArgs`.

**Rows.** Row 895: the gather closes it with your commit, `--test none` with a note that names your runs of the checker over `System` (fork S2). Row 896: your `record.md` gives its whole new line, its notes' helper path `stringOps`, after you read it with `ledger.py show 896`; its claim stays.

**Specification.** None. List every sentence made false: F-321's "`System`'s `getEnvironment` and `getProperty` name `systemOps`, and neither stage reads `System`"; row 895's claim; PLAN's lines on `System`'s rung and on `getProgramArgsPrim`.

**Files.**
- `nativeHelpers/stringOps.java`: the two helpers after `lineSeparator`, only; `nativeHelpers/systemOps.java`: `getEnvironment` removed, only.
- `Library/System.fss`: the two strings, and with Q3 `args` and its two bindings.
- With Q3: `nativeHelpers/programArgs.java`, new; `interpreter/glue/prim/StringPrim.java`'s `registerProgramArgs` and `runtimeSystem/MainWrapper.java`, each one line that sets the static.
- `compiler_tests/NativeHelperFamilyStringCompiled.fss`: its two bindings; your tests.
- Not: `Library/CompilerSystem.fss`, `System.fsi`, the checker, the tools.

**Reserved points.** A step that would edit the prelude.

**Overlaps by file.** None: no other rung edits `stringOps`, `systemOps`, `System`, `StringPrim.java` or `MainWrapper.java`.

### T. The code generator's trait table: an object whose first supertrait is an imported api's trait (row 733)

**The mission.** Another of F-34's kinds, and the wall of the library's 2-D and 3-D ranges: `OpenRange2D` (`Library/RangeInternals.fss:380`) extends `{ OpenRange[\(ZZ32,ZZ32)\], ActualRange2D[…] }`, and the code generator stops, 'Not in the trait table: OpenRange', at 8 declarations of `RangeInternals` (`perf-probes/codegen-distance/REPORT.md`, section 3). This rung lets such an object compile.

**The answers this rung follows.** Row 733: the code generator crashes on an object whose first supertrait is an imported api's trait and whose later supertrait defines a method of a name that the api's trait declares, also where the two overload validly; `dumpMethodChaining` compares the trait of each same-named method of the first supertrait with the body's trait (`typeAnalyzer.equiv`, `compiler/codegen/CodeGen.java:1010`), and the table does not find the api's trait. On this base the stack runs `TypeAnalyzer.typeCons` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:884`) ← … ← `dumpMethodChaining` (`CodeGen.java:1010`) ← `forObjectDeclPrePass` (`:4691`) (section 5, probe 4). The code generator's table is made over the component and the api environment (`compiler/phases/CodeGenerationPhase.java:179`, `:206-210`), so the trait is in the environment and the type that the comparison reads names it in a way that the table does not find. Walk runs row 733's form and prints `cd`. The two `tag` methods overload validly: their parameter types exclude each other. Row 732, the sibling in the same method, is not yours (fork T2). This record's section 3, forks 1, 2, T1 and T2 (40, 41), give the defaults you build.

**What you build.**
- The tests first (below).
- The comparison in `dumpMethodChaining` (`CodeGen.java:916-1022`) reads an imported api's trait (fork T1): the fix where the compared type is made or read, with the reason, in your report. If the fix must change the checker's trait table, it is a change of checking code: take P-148's measure as `compiler.md`, "The checker's time", gives it, run the count stage and the distance stage, and list it as a point to report.
- Not yours: row 732 (fork T2); `RangeInternals` itself; the checker unless fork T1 sends you there.

**Tests, first.**
- `ProjectFortress/compiler_tests/TraitTableApiTraitCompiled.fss` with an api `ProjectFortress/compiler_tests/TraitTableApiTraitApi.fsi` and its component, and its `.test` (`tests=`, `compile`, `link`, `run`, `run_out_contains=PASS`), as `compiler_tests/RecursiveApiTest3.test` drives a program with its own apis: row 733's form, the api's `trait C abstract tag(self, n: ZZ32): String end`, the program's `trait D tag(self, s: String): String = s end` and `object O extends { C, D } tag(self, n: ZZ32): String = "c" end`, with `tag(O, 1)` asserted `"c"` and `tag(O, "d")` asserted `"d"`; and a second object whose first supertrait is a generic api trait at a tuple static argument, as `OpenRange2D`'s is. Seen failing on the base through `junit.sh`: 'Not in the trait table: C' (probe 4). Passing after.
- `ProjectFortress/tests/TraitTableApiTraitWalk.fss`, with its api in `ProjectFortress/test_library/`: the same program under walk, a guard passing on the base and after.
- Keep their verdicts: the compiler track.
- After the change: your tests through `junit.sh`, in one JVM, and the walk guard through the harness; the tracks to the gate (fork 2).

**Rows.** Row 733: the gather closes it with your commit, its test `TraitTableApiTraitCompiled`. Row 732: no change, unless your fix reaches it; then your `record.md` gives its whole new line.

**The stages.** Neither, unless your fix changes the checker (fork T1): list your files (`STAGE_BLIND`; fork 3).

**Specification.** None. List every sentence made false: F-34's kinds, row 733's claim, and any sentence of the `fortress-repo` skill's `compiler.md` that lists what the code generator refuses.

**Files.**
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: `dumpMethodChaining`, only, and anything the comparison needs, named in your report; the checker's trait table only by fork T1.
- `ProjectFortress/compiler_tests/`, `ProjectFortress/tests/` and `ProjectFortress/test_library/`: your tests and their apis.
- Not: `forObjectDeclPrePass` and the call visitors; `interpreter/`; `Library/`; `ProjectFortress/LibraryBuiltin/`; `nativeHelpers/`; `Specification/`; the tools.

**Reserved points.** A change of the checker's code (fork T1). Report it, with its evidence and the count stage's times.

**Overlaps by file.** None: no other rung edits the code generator. K edits the checker's Scala, which a T fix by fork T1 would also reach: other files, `TypeAnalyzer.scala` against K's four.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another (PLAN, "The principle for the batches"). Each rung's tests pass on its own tree. None lands only with another. A's compiled `args`, which S's second half builds, runs only on the merged tree, where both stand; S's tests run under walk and over its own helper bindings, so they pass without A.
- The declarations each rung changes:
  - V: the getters, the `bitsAs…` and the low-bits names in `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32`, with their api lines; `ZZ`'s `narrow` and `widen` struck; `ZZ32`'s `big`; rung I's two private count functions; `IntLiteral`'s 8; the callers in `Format`, `QuickCheck`, `sudoku` and `XXXZZNarrowRungP`; any new helper; `basic-integers.tex` and an Appendix I entry; two tests.
  - R: `JavaBufferedReader`'s eight methods and two factories; a native object; four methods of `StaticNativeApp`; a new glue class; `jbrStdIn`; `File` and `Reader` whole; two tests.
  - A: two store traits and their factories; `NativeArray` whole; two native objects; a rule in walk's loader; three glue classes re-targeted and two new; `arrayOps` and two store classes, new; two table entries; with shape (ii), `Transaction.java`; two tests.
  - K: a new Scala class and four sites of the checker; one test.
  - H: six helpers in `runtime.java`; `Thread`'s four, `abort` and `printTaskTrace`; six table entries; two tests.
  - S: two helpers, `getEnvironment` out of `systemOps`, two strings and one guard; with Q3, `args`, `getProgramArgsPrim` and `getProgramArgs` struck, a new helper class, two one-line setters, two tests.
  - T: the code generator's `dumpMethodChaining`, and two tests with an api.
- The files that two rungs share, and each rung's place:
  - `Library/FortressLibrary.fss`: V `:714-756`, `:763-1155`; R `:1959-1967`; A before `:2392`; H `:4625`.
  - `Library/FortressLibrary.fsi`: V the integer traits, `:450-748`; R `:1265-1271`; A beside `:1594-1604`.
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: A after `:52`; V `:422-517` and `:529-614`; H `:775-786`; R after `:791`. H's hunk and R's insertion are five unchanged lines apart (`:787-791`), so the two patches share context lines, which the gather's `--3way` merges, as it merged climb batch 27's rungs A and N in `FlatTowerRungF.fss` (`climb-batch-27-review-2.md`, change 7).
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`: V `NN32`'s lines; H only for `valAny`, `:306-313`.
  - `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`: H `:47-53`; A `:209`.
- They meet on the merged tree. Walk's suite runs every rung's walk tests. The compiler track runs V's, R's, K's, H's, S's and T's compiled tests, and `ant testQuick` A's unit test. The stages read the library as V, R, A and H leave it, the helper classes as R, A, H and S leave them, and the checker as K leaves it: so the merged distance reads `#crash none`, and every site there is to be traced to one rung's edit, against 0. The specification's build reads V's entry. The gather's 52 demos and the commit stage's quick check of the model see every array, every file read, every conversion and every `spawn` at once. No rung's test asserts the crash rows, a glue string that another rung moves, or walk's uncatchable message at a missing file (section 6, "What every agent reads first").

## 5. The candidates, the probes, and what waits

### What the record owes

The brief's candidates, each with its ground and its home here:

- **The reader rung, 20, with `FileWriteStream`'s 5** (P-164; review-queue item 373; PLAN item 69, its default that they move with the reader rung): rung R. Climb batch 27's record placed it in this batch (`CLIMB-BATCH-27.md`, section 5, "Left out, each with its home").
- **The conversions, 3** (P-161; P-162 for `big`): rung V.
- **Climb batch 27's rungs S and T**, which never started for want of disk (item 377; `reviews/batch-27-review.md`, section 7, point 2): rungs S and T, rebased on this tree: `System.fss:41` and `:51` and `systemOps.java:20-27` stand; `stringOps.java`'s `lineSeparator` is now at `:76-78`; `CodeGen.java`'s comparison at `:1010` and its caller at `:4691` (probes 3 and 4).
- **The runtime's own natives by P-169** (`reviews/natives-device-2026-11-07.md`): `Thread`'s four, `abort` and `printTaskTrace`, rung H; the arrays' store with `PrimImmutableRR64Array`'s 2, rung A, waiting on Q2 (item 407), with its default as fork A1 and Q2's measurement (probe 1); `IntLiteral`'s 8, in rung V, since four of them read V's getters (fork V2). P-169's history gives his words of 10:5x UTC on 2026-11-07: he takes the independent Fable judgement as it lands, and reviews it in detail after it lands (`facts-extract.sh 'history:P-169'`; review-queue item 406, default "as decided"); rungs V, H and A build it as decided.
- **`getProgramArgsPrim`** (PLAN's line on `CompilerSystem`; the natives review's Q3): S's second half, waiting on Q3.
- **Row 929** and P-148: rung K, with the planner's prototype measured (probe 2).
- **What else the natives review's order of work and PLAN's phase 4 put before the switch-over:** the raise-string resolver (the review's section 3, point 2), left out, since it edits every raising helper class, V's among them; `Reflect`'s 28, on Q4; F-34's other kinds and row 862, not probed here.
- **Climb batch 27's review list** (PLAN, "Climb batch 27, listed for his review"; `reviews/batch-27-review.md`, Part 4): item 373 and row 926, rung R; item 377, rungs S and T; item 380, the natives effect, which the gather revises again (fork 5); item 384, the exceptions' message, stays his at its default (fork R6); item 385 and row 928, a note from R; item 403, his (fork 6). Items 374 to 376, 379, 381 to 383 and 386 to 402 meet no rung of this batch.

### The planner's probes

`compile-ladder/plan-28/PROBES.md` holds each with its commands and output. In short:

1. **Q2's two store shapes,** in a Java model on the compiled run time's own classes: 44 bytes an `RR64` element with a cell per element against 28 with a slot API; outside a transaction a read 2.2 ns against 1.7 to 1.8 ns and a read and a write 24 ns against 18 to 24 ns; inside a long transaction 209 ns against 118 ns; with a transaction per element both about 180 ns. The model's cell path costs what the tree's does.
2. **Row 929:** the distance's two crash rows reproduce on the base; a compiled program of 64 candidates over two chains of traits stops the base's checker at `Functionals.scala:761` in one shuffle of twelve; the prototype of fork K1 removes both crash rows, checks `Char` with no error, keeps the count's tables and `run.txt`, and compiles and runs the reproducer; 145 s against 140 s for the distance, 88.9 s against 88.9 s for the count.
3. **The checker over `System`:** on the base, 'FortressBuiltin.StringVector is undefined.'; with S's strings off `systemOps`, 2 errors at `args` and `getProgramArgs`; with Q3's default too, no error, and walk runs the text.
4. **Rung T's wall** on this base: 'Not in the trait table: C' at `CodeGen.java:1010`; walk prints `cd`.
5. **The reader at the end of a file,** by reading: walk's glue answers -1, the compiled `FortressBufferedReader.read()` 0 with `eof` set, and the library's `characters` ends only at -1; `eof` after the read tells the two apart on both paths (fork R1).
6. **The bindings:** 443, 341 on helpers and 102 on glue, by file.

**Not run:** the suites, the stages and the gate's other steps on the base, which climb batch 27's gate measured on this code; the demos; a prototype of any rung but K's; the four-thread runs of a store.

### Rows filed by plan

None. Probe 5's difference at the end of a file is not a defect of either path: each answers its own library's contract, and fork R1 meets it.

### Left out, each with its home

- **The arrays' store without Q2's answer:** climb batch 29, as rung A stands here.
- **`IntLiteral`'s other 21 and `FloatLiteral`'s 3:** N5, in the names batch, after a reading review designs their carrier (P-169).
- **`Reflect`'s 28:** his Q4 of the natives review, before the names batch; the count stops at 28 by its default.
- **The raise-string resolver:** climb batch 29, after V's helpers land; it changes no behaviour and edits the same five helper classes.
- **F-34's other kinds** (rows 624, 819, 822, 875, 888 to 892, with 832 beside them) and row 862: a later batch's record, with a planner's probe of each fix.
- **Beside rung R:** item 383, `BufferedWriter`'s buffer; item 384, the exceptions' message; N5's run-time classes and raise strings (P-164).
- **Beside rung K:** item 403.
- **Beside rung S:** row 896; item 319, `CompilerSystem`'s deletion.
- **Beside rung T:** row 732.
- **Beside rung V:** the saturating operators (row 797); rows 441, 442 and 523 to 525, the prelude's own, which retire with it (P-38).

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 27: `coordinator/climb-batch-workflow.js` and its manual `coordinator/climb-batch-workflow.md`. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest, which the batch's generator reads.

### The generator

`compile-ladder/plan-28/manifest/` (`gen28.py`, `lists28.py`, `check28.js`) is the coordinator's, made from `plan-27/manifest/`. It changes from climb batch 27's in these ways:

- the batch's values: `BATCH` `28`, its folder `compile-ladder/climb-batch-28/`, the output `manifest28.js`;
- the rungs from `lists28.IDS` in the manifest's order V, R, A, K, H, S, T, with `--without A` where Q2 has no answer;
- the briefings and checks of section 1, with their reasons; no key holds a backslash, a backtick or a double quote, and each matched one place by `facts-extract.sh --check` on `main` at `2436f6f25`, the keys into this record against it as written;
- no rung landing only with another, none declaring a count, a crash or a move;
- every section but T's naming the count stage and the distance stage as stages its rung runs once on its final tree, K's also naming P-148's three count runs; T's naming neither (fork 3);
- the forks key: section 3's blocks are bold paragraphs, so a per-rung forks key, as climb batch 27's second Fable review proposed, needs `####` headings or the `@WORDS` filter on the fork labels; the coordinator's call.

### What every agent reads first

This run is climb batch 28, the sixth batch of the plan's phase 4, the switch-over. It takes up to 50 of the 102 bindings that still name a glue class off them (section 2, "Where the natives stand"), makes the checker's sorts correct on a partial order, and takes one wall of the code generator. Its rungs:

- V, P-161 and P-169: the checked integer getters, `bitsAs…`, the low-bits names on every type, `ZZ`'s `narrow` and `widen` deleted with their callers moved, `ZZ32`'s `big` on its helper, `IntLiteral`'s 8 in Fortress over `asZZ`, and the specification's sentences;
- R, P-164's reader rung: `FileReadStream`, `Reader`, `stdIn` and `FileWriteStream` as plain objects over the Java-backed `JavaBufferedReader` and `JavaBufferedWriter`, and `File` and `Reader` plain components;
- A, P-169's arrays, in Q2's answer, shape (ii), the slot API: `PrimitiveArray` and `PrimImmutableArray` over a compiled store in a field, walk's `AtomicArray` behind P-167's device, `PrimImmutableRR64Array` over a `double[]` class;
- K, row 929: the checker's four sorts by a partial order made a linear extension, read once a pair, as fast as today (P-148);
- H, P-169's threads: `Thread`'s four, `abort` and `printTaskTrace` on compiled helpers that walk's loader answers with its glue;
- S, item 355's option 1 and Q3's option 1: `System`'s two natives onto `stringOps`, and `args` built in Fortress over two scalar helpers;
- T, row 733: the code generator compiles an object whose first supertrait is an imported api's trait.

Each rung has tests that fail on the base and pass after, and guards that pass on both. Only K changes the checker's checking code, and it makes P-148's speed pass. Every rung but T changes text that the stages read, so each runs the count stage and the distance stage once on its final tree, against climb batch 27's landed 0 and 0 (F-53); the distance's two crash rows in `value object Char` are row 929's, and on a rung's own tree they may stay, go or move: report them, declare none. Three rules hold for every rung's tests, since other rungs change what tests can meet: assert no crash row; assert no glue string, since V, R, A, H and S move them; and assert no walk message that no `catch` sees at a missing file or a consumed reader, which R makes the library's exceptions. No rung builds on another, none lands only with another, and no two change one declaration. The gather composes them, revises Appendix I's natives effect to the merged count, builds the specification once for V's entry, and runs the 52 team demos on the merged tree. `ant testSpecData` runs in the gate because the landed summary has it.

### Before the launch

The coordinator:

1. **The curator's go,** with Q2's and Q3's answers or their defaults by the go rule (the `coordinator` skill's `references/batch.md`, "The go"). The Fable review of this record first.
2. **No row is filed by plan** (section 5).
3. **The generator,** made as "The generator" above gives it, and committed; its checks run on this record as reviewed: `python3 -B explorations/compile-ladder/plan-28/manifest/lists28.py`, every key matching one place on the base; `gen28.py`; `check28.js` on a scratch splice; `check28.js --write`; `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script; the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`.
4. **The base build:** no base build of climb batch 27 survived the container's loss, so one is built at the base, `/home/user/fortress-base28`, by the manual's "Before the launch", step 2; its trial seed and the old code's run, step 3.
5. **The disk:** `df -P /home/user`, its Available column at or above the script's floor, 14.5G for seven rungs or 13G for six (section 2, "Before the batch runs"); before the launch, the main tree's old `tmp/gate-batch-*` and `tmp/gather/` scratch, the pip and uv caches and loose git objects cleared, as climb batch 27's review asks (section 7, point 2). `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`, and the gather the demo driver.
6. **Check-ins** armed for the run's length, about 5 hours 15 minutes, 45 minutes apart.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base28'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch28/launch-args.json`, since a resume needs them.

### The gate, and what it should show

The comparands are climb batch 27's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, over the fourteen, setting compile, with two crash rows), in `compile-ladder/climb-batch-27/gate/`.

- `testSystem`: 778, the comparand's, plus the planner's named walk tests: V 2, R 1, A 1, H 1, S 1 with Q3, T 1, so about 785, and any more that the rungs add.
- `testFast`: the compiler track 1,447 plus V's compiled tests if fork V1 binds a new helper, R's guard (a link and a run, 2), K's test (a compile, a link and a run, 3), H's (2), S's retargeted guard in place and Q3's test (2), T's run test (3), so about 1,459; A's unit test in the misc track, beside `TransactionJUTest`; the library track 86, the other-compiler track 263 and the misc track as landed.
- `testSpecData`: 130 green; V's entry adds no example.
- The four-thread atomic runs, 42 lines: unchanged; with Q2's shape (ii), they are the first runs of the new transactional code on the merged tree.
- The ladder: no rung declares a move.
- The checker count: 0, reported, not declared. Every rung but T changes what it reads, so a site is to be traced to one rung's edit.
- The distance, reported and never red (P-39): 0 over the fourteen, and `#crash none` by rung K; `compare.sh` prints 'DISTANCE SAME   0' and the two crash rows as gone. `Char`'s body is checked for the first time since climb batch 27's gate.
- The 52 team demos at the gather, each reaching its end (F-283): R changes every file read, V every integer conversion, A every array.
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30). Rung R's reader reads the model's data files, and rung A, if it runs, holds every array the model makes.

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`.

- **Filed by plan:** none.
- **Closed:** 858, 859 and 502 (V), their test `IntegerConversionsWalk`; 926, 900, 901 and 902 (R), their test `NativeHelperReaderWalk`; 929 (K), its test `PartialOrderCandidatesCompiled`; 895 (S), `--test none` with its note (fork S2); 733 (T), its test `TraitTableApiTraitCompiled`.
- **Rewritten,** each row's whole new line in its rung's `record.md`, since none has room for a note (`ledger.py note N TEXT --check` on the base: 4, 23, 31 and 3 characters left of 700): 349 (V), its half on `narrow` of a `ZZ` closed; 928 (R), its claim naming both traits; 466 (A), its notes on the store's `init`; 896 (S), its notes' helper path.
- **Noted:** 82 (H), 293 characters left, after `ledger.py note 82 TEXT --check`.

### After the landing

The landing report; the routing of every item for the curator into PLAN, this record's questions and forks among them; FACTS: F-32 and F-299 (the counts, by the gather's count of the merged tree), F-330 (the reader side), F-328 (the loader's table and A's rule), F-54 and F-53 (the crash rows gone), F-321 (`System` read), F-172 (the conversions), F-34 (T's kind), and the facts the rungs hand over; the skill writer's task with the batch's sentences made false, `interpreter.md`'s carriers and `revival-changes.md`'s numbers among them; the post-batch review. Then climb batch 29: the raise-string resolver, rung A if it waited, and what the natives review's order of work leaves before the names batch.

## 7. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [CLIMB-BATCH-27.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-27.md), [climb batch 27's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-27-review.md), [climb batch 27's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-27/gate/summary.txt), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-28/PROBES.md).
- Reviews: [the runtime's own 45 natives](https://github.com/palimondo/fortress/blob/main/explorations/reviews/natives-device-2026-11-07.md), [the natives left after climb batch 27](https://github.com/palimondo/fortress/blob/main/explorations/reviews/natives-remainder-2026-11-07.md), [the integer conversions](https://github.com/palimondo/fortress/blob/main/explorations/reviews/integer-conversions-2026-11-06.md), [the I/O objects](https://github.com/palimondo/fortress/blob/main/explorations/reviews/io-objects-carrier-2026-11-06.md), [rung W's report](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/rung-io-writer/REPORT.md).
- Code: [Functionals.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala), [Transaction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java), [NativeApp.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java), [NativeArray.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/NativeArray.fss), [File.fss](https://github.com/palimondo/fortress/blob/main/Library/File.fss), [Reader.fss](https://github.com/palimondo/fortress/blob/main/Library/Reader.fss), [System.fss](https://github.com/palimondo/fortress/blob/main/Library/System.fss), [fileOps.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java), [runtime.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java), [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java).
