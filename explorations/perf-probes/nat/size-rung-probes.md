<!-- The two probes that reviews/size-runtime-design-brief.md § 12 asks for before the run-time size rung is briefed (how a number's descriptor is made under design B: holder classes from the loader, or a factory with none; DOT's shared size on the compiled path), for the coordinator and Pavol, written 2026-09-25 between 22:46 and 23:14 UTC by a delegated worker. Stack: size-cost/run.sh's (size-probes/run.sh's build and worlds steps over the four committed patches of runtime/run-all.sh, B's holder classes stamped for 0 to 16), rebuilt into a scratch directory outside the repository from the tree at b177a9418 (the two commits that landed meanwhile, up to c89f0ee95, touch only notes), with this directory's three flag-gated patches on top; JDK 25.0.4, FORTRESS_THREADS=1. Nothing tracked was modified; every program was compiled into its own fresh copy of the world cVB. Commands: size-rung-probes/run.sh; programs, patches and captures r0-r6 under size-rung-probes/. -->

# Two probes before the run-time size rung

## The answers

- **Probe 1, measured: the loader's emitter of holder classes (variant a) and a factory with no holder class (variant b) give the same answers on all nine programs, the same descriptor, and a class footprint within one kilobyte of each other.**
  - Variant (a) is 29 code lines in one file, `InstantiatingClassloader.java` (`size-emit.patch`). It changes nothing the compiler emits: every compiled jar is byte-identical to the stamped-ahead baseline, and `SizedMany` loads the same 2,403 classes and 8,700,461 bytes (`r2-summary.txt`, `r3-classes.txt:1-6`). It replaces the tool `java/StampSizeRTTI.java`.
  - Variant (b) is 26 code lines added and 4 removed in four files, `RTTIsize.java`, `MethodInstantiater.java`, `CodeGen.java` and `OverloadSet.java` (`size-factory.patch`). About 20 would remain without the probe's flag and the holder branch it keeps for comparison, by reading. `SizedMany` loads 2,405 classes and 1,003 bytes more: no holder classes (8 fewer, 2,400 bytes), each stamped class that names a literal about 125 bytes larger (24 classes, 3,000 bytes), and the lambda class of `computeIfAbsent` with nine JDK classes it pulls in (`r3-classes.txt:3, 7-32`).
  - The four probe programs of the size probes, the four size-cost programs and a control for the extends-clause site print the same answers under the stamped-ahead baseline, (a) and (b) (`r2-summary.txt`).
  - The descriptor behaves the same under all three: `className()` is the number's text, two fetches of one number are one object, `equals` is that identity, and `runtimeSupertypeOf` answers true only for an equal number (`r1-descriptor.txt:1-20`).
  - Neither variant fixes the hash defect in passing. Every size descriptor still hashes alike, and so does every one-size key of a generic's factory dictionary. `size-hash.patch`, a `hashCode` on the text, fixes it under all three (`r1-descriptor.txt:7, 14, 20` against `:28, 35, 41`).
  - A size that is a symbol in a template changes under neither. The template names `Box⟦k⟧$RTTIc`, and `k` is replaced by the number at stamping, before either variant sees it (`r4-javap.txt:60-77`).
- **Probe 2, measured: B's dispatcher, as built in `dispatch-b.patch`, tests that the two sizes are equal before it chooses the shared-size arm.** It reads the size off each argument's descriptor and compares the two with `runtimeSupertypeOf` in both directions. A mismatch goes to the catch-all (`r5b-dot-javap.txt:62-75`). No fix is needed.
  - `pDot` prints (i) 3, (ii) -1, (iii) 3, (iv) -1 -1 (`r5-dot.txt:5-13`). The interpreter prints the same (`r6-walk.txt:1-10`).
  - The rung brief's stop condition, "an arm whose size occurs in two parameters needs more than the second occurrence compared by equality" (`reviews/size-runtime-design-brief.md` § 9), is not met. The dispatcher does exactly that comparison.
- **The worker's reading, not a decision:** name variant (b), the factory, in the rung's brief. The reasons are in § 2.6.

## 1. How it was measured

- **The stack.** `run.sh` step `stack` calls `size-cost/run.sh <work-dir> stack`. That step calls `size-probes/run.sh`'s build and worlds steps and then stamps B's holder classes for 0 to 16 with the committed tool. It took 9 min 12 s on this container. Step `rung` copies the stack's Java sources, applies this directory's three patches and compiles them to `rung-classes`, which then stand in front of the class path in every run. Each patch is off unless its flag is set:
  - `size-emit.patch`, `-Dprobe.nat.sizeEmit=true`: variant (a).
  - `size-factory.patch`, `-Dprobe.nat.sizeFactory=true`: variant (b).
  - `size-hash.patch`, `-Dprobe.nat.sizeHash=true`: the hash on the text.
- **Design B throughout** is `size-cost/run.sh`'s B: world `cVB` and its flags, with the value-position, extends-clause, dispatch and checker pieces all on. A number's descriptor is made three ways:
  - **H**, the baseline: the tool's holder classes in front of the class path, as the size probes and the size cost ran B.
  - **E**, variant (a): the loader makes each holder class on first request. Nothing is stamped ahead.
  - **F**, variant (b): `RTTIsize.of(text)`, and nothing stamped.
- **Fresh caches.** Every program is compiled and run in its own copy of `cVB` under each of H, E and F (`run.sh`, `fresh`).
- **The programs.** The four probe programs `size-probes/pNatDisp.fss`, `pNatDispTrait.fss`, `pNatDispSize.fss` and `pNatDispLit.fss`. The four size-cost programs `size-cost/SizedSum.fss`, `SizedDisp.fss`, `SizedDispLit.fss` and `SizedMany.fss`. Two new ones here:
  - `pExtLit.fss`, a control. A literal size in an `extends` clause is the third place that makes a number's descriptor, and none of the eight programs reaches it. The library has the shape (`trait Rank1 extends { Rank[\1\] }`, `Library/FortressLibrary.fsi:1077`).
  - `pDot.fss`, probe 2.
- **The first two workers' leftovers.** The first worker's partial files, in the scratchpad's `size-rung-probes-partial/`, were read and reused as follows:
  - `size-emit-a.patch` and `size-factory-b.patch` became `size-emit.patch` and `size-factory.patch`. The regular-expression test of a size's name was rewritten as a test of its first character, because the emitter's test runs for every class the loader loads, and the emitter's test no longer calls into the factory patch, so each patch applies on its own.
  - `size-hash.patch` was kept as it was, re-cut against the factory patch's result.
  - `SizeCheck.java` was kept, with one comparison added (3 against 4) and the patch names updated.
  - `pDot.fss` and `pExtLit.fss` were kept, with their headers rewritten. The walk outputs they claimed had not been run; they are now measured (`r6-walk.txt`).
  - `pDotMat.fss`, the matrix product's shape, was not used. It is beyond this brief, which asks for the vector shape.
  - A 75 MB stack left by the first worker in the scratchpad (`rung/`, 2026-09-24 16:24) was removed unused. Nothing from the second worker was found under `/tmp` or the scratchpad.
- **Not run:** the gate. The test class path cannot see a shadow (`runtime.md` § 4).
- **Timings.** Three of the programs print loop times, which are in the raw capture `r2-programs.txt` beside its machine line. They were not taken for comparison: H, E and F ran one after another per program, not interleaved, and no loop here goes through a site where the variants differ at run time (§ 2.6).

## 2. Probe 1: holder classes from the loader, or a factory with none

### 2.1 What each variant is

- **Today's B** reads a number's descriptor from the static field `ONLY` of a holder class named `3$RTTIc`, in three places:
  - `MethodInstantiater.rttiReference`, when the loader stamps a class whose code names a sized descriptor (`MethodInstantiater.java:94-139` in the tree; the size reaches the `else` branch at `:132-138`);
  - CodeGen's extends-clause push (`size-probes/extends-b.patch`);
  - the dispatcher's literal leaf (`size-probes/dispatch-b.patch`, `SizeLiteralStructure`).
  - Nothing made the holder classes except the tool. Without them the run fails: `ClassNotFoundException … Resource not found : 3$RTTIc.class` (`r1-descriptor.txt:43-45`).
- **Variant (a), the emitter** (`size-emit.patch`, 29 code lines added and 1 removed, `r0-patch-lines.txt`).
  - The loader recognises a requested name that starts with a digit or a minus sign and ends in `$RTTIc`; a Fortress name cannot start with either.
  - It writes the class itself with ASM: a `public static final RTTI ONLY` set in the class initialiser to `new RTTIsize(text)`. It is modelled on the tool, and the loader already writes other descriptor classes the same way (`instantiateTupleRTTI`, `instantiateArrowRTTI`).
  - The emitted class has the tool's code instruction for instruction (`r4-javap.txt:34-58`).
  - The three reading sites are untouched, so the compiler's output does not change.
  - Without the probe's flag it is 28 lines. It replaces `java/StampSizeRTTI.java` and the stamped directory on the class path.
- **Variant (b), the factory** (`size-factory.patch`, 26 code lines added and 4 removed).
  - `RTTIsize.of(String)` keeps one descriptor per number in a `ConcurrentHashMap`, 5 lines.
  - `MethodInstantiater.sizeReference` emits `ldc "3"; invokestatic RTTIsize.of`, 10 lines with the flag test and the holder branch kept for comparison.
  - `isSizeLiteral` is the same first-character test, 4 lines.
  - `rttiReference` sends a size to `sizeReference`, 2 lines.
  - The extends-clause push and the dispatcher's literal leaf call `sizeReference` in place of their two-line `getstatic`, one line and one import each.
  - Without the flag and the holder branch, about 20 lines, by reading. The design brief's estimate was 10 to 15 (§ 10).
- **Where each variant shows in the bytecode** (`r4-javap.txt`):
  - At the first site, a stamped class's initialiser reads `getstatic "8$RTTIc".ONLY` under H and E (`:6, 16`). Under F it reads `ldc "8"; invokestatic RTTIsize.of` (`:26-27`). Then all three pass the result to `SizedMany$Box$RTTIc.factory`.
  - At the second site, `pExtLit$Rnk1$RTTIc.lazyInit` reads `"1$RTTIc".ONLY` under H (`:87`) and calls `RTTIsize.of("1")` under F (`:100-101`).
  - At the third site, the dispatcher of `h[\T\](v: Vec[\T,3\])` in `pNatDispLit` reads `"3$RTTIc".ONLY` under H (`:125`) and calls `RTTIsize.of("3")` under F (`:170-171`).
  - The compiled jars show where the variants differ at compile time (`r2-summary.txt`). E's are byte-identical to H's for all nine programs. F's differ in exactly the classes that hold the second and third sites: `pNatDispLit.class`, and `pExtLit$Rnk1$RTTIc.class` with `pExtLit$Rnk2$RTTIc.class`. The first site is at load time.

### 2.2 The programs' answers

All nine print the same under H, E and F, with the loop times left out (`r2-summary.txt`). Each answer is also the one its header gives as right:

- `pNatDisp` and `pNatDispTrait`: scalar vector matrix scalar vector matrix other.
- `pNatDispSize`: 0 3 2 4, then dispatched 0 3 4 2 4 -1.
- `pNatDispLit`: three four other T-three other.
- `SizedSum`: every total 80000000.
- `SizedDisp` and `SizedDispLit`: 30000000 for one size, 35000000 for two, in both rounds.
- `SizedMany`: 36.
- `pExtLit`: 1 2 1 2 -1, the interpreter's answer too (`r6-walk.txt:12-17`).

### 2.3 Classes loaded, SizedMany

Counted as `size-cost/run.sh` counts them, one run each under `-Xlog:class+load=debug` (`r3-classes.txt`).

- **H:** 2,403 classes, 8,700,461 bytes; 132 of them made by the Fortress loader, 28 descriptor classes.
- **E:** the same numbers. No class is loaded under one and not the other, and no class has a different length (`:4-6`). The eight holder classes `1$RTTIc` to `8$RTTIc` are 300 bytes each under both, and under both they are made by the Fortress loader: its count is 132 under H and E and 124 under F (`:1-3`).
- **F:** 2,405 classes, 8,701,464 bytes, which is 1,003 bytes more (`:3, 7-32`).
  - Missing: the eight holder classes, 2,400 bytes.
  - Added: the lambda class that `computeIfAbsent(size, RTTIsize::new)` makes (403 bytes), and nine JDK classes that its creation loads from the JDK's shared archive (counted as 0 bytes). A lookup written without a lambda would avoid both, by reading.
  - Longer: every stamped class whose initialiser names a literal, because `RTTIsize.of`'s name and signature are longer constants than a holder's field reference. Each `Box⟦n⟧` is 117 bytes longer, and each of the two function classes over it 129 bytes, 3,000 bytes over 24 classes (`:26, 32`).
- **Per size, then:** H and E pay one 300-byte class per distinct number, shared by every generic. F pays nothing per number, but about 120 bytes in each stamped class that names the number, 375 bytes per size in this program. Against 8.7 MB loaded per run, the difference either way is a few hundred bytes per size. The size cost found the same between A and B (`size-cost.md` § 2).

### 2.4 The descriptor: className, equality, hash

`SizeCheck.java` asks for the descriptors of 3, 3 again, 4, and 0 to 16, under each variant, first with the hash as the stack has it and then with `size-hash.patch` on (`r1-descriptor.txt`).

- The descriptor is an `RTTIsize` under all three. Under H and E its holder class `3$RTTIc` is defined by the Fortress loader.
- `className()` is `3` and `4` under all three.
- Two fetches of 3 are one object under all three. `equals` is `RTTI`'s inherited identity, so 3 equals 3 and not 4. This identity is what the generic factories' dictionaries compare (`runtimeSystem/RttiTupleMap.java:94-101`), and the closure loader keys on the descriptor's serial number (`RTHelpers.java:160-164`). Both therefore need one object per number, and all three variants give one.
  - H and E give one per defining class loader. F gives one per JVM, because `RTTIsize` is always loaded by the system loader (`InstantiatingClassloader.java:2905`), by reading.
- `runtimeSupertypeOf`: 3 against 3 true, 3 against 4 false, 4 against 3 false, under all three.
- **Hash.** Under all three, sizes 0 to 16 give one distinct `hashCode()` and one distinct one-argument dictionary key (`:7, 14, 20`).
  - The cause: `RTTI.hashCode` is the hash of the Java class behind the descriptor (`RTTI.java:51`), and every `RTTIsize` has the placeholder `Object`.
  - Variant (b)'s intern table is keyed by the number's text and does not use this hash. The factories' dictionaries still do, so every size of a generic lands in one bucket under (b) as under (a).
  - With `size-hash.patch` (4 code lines as built, one method in a finished form) there are 17 and 17 under all three (`:28, 35, 41`). The fix is the same whichever variant is taken. The rule in § 9 of the design brief already asks for it ("its `hashCode` is its text's").

### 2.5 A size that is a symbol in a template

- The template of a sized object, as compiled, names its descriptor with the symbol: `SizedMany$Box⟦⟧`'s initialiser reads `"SizedMany$Box⟦k⟧$RTTIc".ONLY`, the same under H and F (`r4-javap.txt:60-77`), and `SizedMany.jar` is byte-identical under H, E and F (`r2-summary.txt`).
- At stamping the loader replaces `k` in that name by the instance's number (`MethodInstantiater.visitFieldInsn`, which translates the owner's name before it calls `rttiReference`, `:64-70`). Only the number then reaches the variant's code, and the stamped class reads `8$RTTIc` or `RTTIsize.of("8")` (§ 2.1).
- In the other two sites a symbol takes a path neither variant touches:
  - The extends clause pushes the parameter's own field for a symbol (`extends-b.patch`, the `GETFIELD` branch). `pNatDispTrait.jar`, whose `Arr1[\T, nat s\] extends Vctr[\T,s\]` takes it, is identical under H and F.
  - The dispatcher reads a symbol through the getter as a type variable (`dispatch-b.patch`). `pNatDisp.jar` is identical under H and F.
- So nothing changes for a symbol under either variant, as expected.

### 2.6 Where the two differ, and the worker's reading

Read from the code, not measured:

- **A size made at run time.** `array[E](n)` and `reflect` on the compiled path wait on the array review's decision D (design brief § 12).
  - Under (b) such a size's descriptor is `RTTIsize.of(String.valueOf(n))`.
  - Under (a) it needs its holder class by name, `Class.forName(n + "$RTTIc", …)` and a reflective read of `ONLY`. That is one more class for every distinct number, besides the stamped class that every new size of a generic needs under either variant.
- **Who can make the descriptor.** Under (a) only the Fortress loader can make a holder class. A class defined by any other loader that names `<n>$RTTIc` would fail to link, as the control does (`r1-descriptor.txt:43-45`). None of the nine programs has such a class: E ran them all. Under (b) there is no class to find.
- **The names in the loader.** Under (a) a new kind of class name, starting with a digit, enters the loader's name tests. Under (b) none does.
- **Per call.** At the dispatcher's literal leaf, (a) reads a static final field on every dispatched call through the arm, and (b) calls `RTTIsize.of` and looks the text up in a hash table. Only an arm that is generic and also names a literal size inside its parameter type has this leaf, such as `h[\T\](v: Vec[\T,3\])`. Arms with only literal sizes are tested by `instanceof` on the stamped class under both (`size-cost.md` § 4). No program here loops over such an arm, so the difference was not measured. If it shows, the dispatcher's class could fetch the literal's descriptor once into a static field.
- **Code.** (a) is one file and leaves the compiler alone. (b) is four files and changes what the compiler emits at two sites.

The worker's reading, not a decision: name (b) in the rung's brief.

1. A size made at run time, which the array rung will need, goes through `RTTIsize.of` directly. Under (a) it needs a class per number and a lookup by name.
2. It keeps digit-named classes out of the loader, and the one-object-per-number property does not depend on which loader defined a class.
3. On everything measured here the two are equal: same answers, same descriptor, same hash defect with the same one-method fix, and a footprint within about a kilobyte.

Against (b): four files instead of one; about 120 bytes more in each stamped class that names a literal; a table lookup per dispatched call through a literal leaf, unmeasured.

In the rule's bracket in § 9 of the design brief, the words for (b) are "by a factory on `RTTIsize` from the literal, with `MethodInstantiater.rttiReference`, the extends-clause push and the dispatcher's literal leaf calling it instead of reading `<n>$RTTIc.ONLY`". The second stop condition there, "a number's descriptor needs anything but the literal's text", is not met by either variant: both make it from the text alone.

## 3. Probe 2: DOT's shared size

- **The shape.** The library declares the inner product with one size shared by both operands, `opr DOT[\ T extends Number, nat n, nat m, nat p \](me : Vector[\T,n\], other : Vector[\T,n\]):T` (`Library/FortressLibrary.fsi:1513-1514`; `m` and `p` are unused there). The matrix product shares the inner size (`:1619-1620`).
- **The program**, `pDot.fss`, puts that shape over a user object `object Vec[\T, nat s\](x: T)`, as `size-probes/pNatDisp.fss` models the library's vectors, with the element type fixed at `RR64`. It has two arms:
  - `dot[\nat n\](a: Vec[\RR64,n\], b: Vec[\RR64,n\])`, which prints `n`, a size read as a value;
  - a catch-all `dot(a: Any, b: Any)`, which prints -1.
- **It makes four calls:**
  - (i) two size-3 vectors typed as such;
  - (ii) a size-3 and a size-4 vector typed as such;
  - (iii) the two size-3 vectors typed `Any`, so the overload set's dispatcher chooses the arm at run time;
  - (iv) a size-3 and a size-4 vector typed `Any`, in both orders.
- **The stack:** H of § 1, that is B as built, with the first rung's checker (`shadow.patch` with `keep-size-params.patch`).
- **What the checker says.** Nothing: the compile exits 0 with no message (`r5-dot.txt:2-3`). Which arm it chose shows in the compiled `run` (`r5b-dot-javap.txt:1-21`):
  - (i): the generic arm, instantiated at 3. It fetches the closure `pDot⚙$dot⟦3⟧…` and applies it (`:10-11`).
  - (ii): not the generic arm. The call goes to the set's entry `dot(Any, Any)` (`:14`), the catch-all's signature, the same call that (iii) and (iv) make (`:17, 20, 21`). The first rung's checker refuses the mismatch statically, as `size-cost.md` § 5 read.
  - In the compiled code the set's entry `dot` is the dispatcher, and the catch-all's body is a separate method `dot♙`. So (ii) also reaches the dispatcher at run time, which is Fortress's rule: the most specific applicable arm is chosen by the arguments' run-time types.
- **What the dispatcher emits** (`r5b-dot-javap.txt:23-91`, `javap -c` of `dot(Any, Any)`):
  - For each argument: `instanceof pDot$Vec$RTTIi`, the getter `Vec__1` tested against `FRR64`'s descriptor, and the getter `Vec__2`, the size's descriptor, stored in local 4 for the first argument and local 7 for the second (`:26-61`).
  - Then `aload 7; aload 4; runtimeSupertypeOf; ifeq 141` and `aload 4; aload 7; runtimeSupertypeOf; ifeq 141` (`:62-69`). Offset 141 is the catch-all, `dot♙` (`:82-86`).
  - Only then `RTHelpers.loadClosureClass` with the size's descriptor (`:75`).
  - `RTTIsize.runtimeSupertypeOf` is equality on the number's text (`java/java-shadow.patch`), so this is an equality test in both directions.
- **Why the dispatcher does this**, read from the tree:
  - `dispatch-b.patch` makes a size symbol a leaf as a type variable is.
  - Every static argument of a generic type gets variance 0, invariant (`compiler/OverloadSet.java:1190`, `INVARIANT = 0` at `:981`).
  - For a variable with more than one invariant occurrence, the dispatcher's inference uses the first occurrence and requires every other to be the same, "which we test by checking that each subtypes the other" (`OverloadSet.java:1481-1505`).
  - So the shared size needs nothing of its own. The check the team wrote for a type variable shared by two parameters is the check a shared size needs.
- **What runs and prints** (`r5-dot.txt:5-13`): (i) 3, (ii) -1, (iii) 3, (iv) -1 and -1. The interpreter prints the same (`r6-walk.txt:1-10`).
- **The answer:** B's dispatcher tests that the two sizes are equal before it chooses the shared-size arm. It does not bind the size from the first argument and let a mismatch through. No fix is needed, and none was built.
- **By reading, not run:** the matrix product's shared inner size, `Matrix[\T,n,m\]` against `Matrix[\T,m,p\]`, puts `m` in two invariant positions and goes through the same loop. A size in a covariant position cannot arise from a generic type's arguments. If it did, the dispatcher's join (`joinStackNoUnion`, `OverloadSet.java:1809-1830`) would also reject unequal sizes, since neither is a supertype of the other.

## 4. What this does not settle

- **The gate** was not run on any of the three patches.
- **The dispatcher's literal leaf under (b)** costs a table lookup per call, by reading; no loop was timed through it.
- **The lambda in `RTTIsize.of`** costs 403 bytes and nine archive classes once per run, measured. A plain get-then-put would avoid it; not built.
- **Sizes made at run time**, and which route they take on the compiled path, still wait on the array review's decision D. § 2.6's first reason is a reading of what each variant would need.
- **`keep-size-params.patch` on the library and the five nat compiler tests** is the first rung's own run (design brief § 12), not taken here.
- **Ledger rows.** The two defects the size cost found are still to be appended at the size rung's gather (POSITIONS 2026-09-24). This note adds none.

## Files

Under `explorations/perf-probes/nat/size-rung-probes/`:

- `run.sh`: every command, by step.
- The patches:
  - `size-emit.patch`, variant (a);
  - `size-factory.patch`, variant (b);
  - `size-hash.patch`, the hash on the text.
- The programs:
  - `SizeCheck.java`, the descriptor check;
  - `pDot.fss`, probe 2;
  - `pExtLit.fss`, the extends-clause control.
- The captures:
  - `r0-patch-lines.txt`, code lines per patch;
  - `r1-descriptor.txt`, the descriptor under H, E and F, hash off and on;
  - `r2-programs.txt` (raw, with the machine line) and `r2-summary.txt`, the nine programs;
  - `r3-classes.txt`, `SizedMany`'s classes;
  - `r4-javap.txt`, the three sites and the template;
  - `r5-dot.txt` and `r5b-dot-javap.txt`, probe 2;
  - `r6-walk.txt`, the interpreter's answers for `pDot` and `pExtLit`.
