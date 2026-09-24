<!-- What design B's classes cost at run time against design A, measured 2026-09-24 by a delegated worker for reviews/size-runtime-design-brief.md ("Run-time cost, measured"). Nothing tracked was modified: the stack is size-probes/run.sh's, rebuilt into a scratch directory outside the repository by that script's own build and worlds steps, and every program is compiled into its own fresh copy of a world's cache. Each design runs with every piece it needs as measured in size-probes.md. Commands: size-cost/run.sh; programs and captures k1-k4 under size-cost/. Timings are wall clock on a shared container whose speed varies between sessions (FACTS, "Execution model", the benchmark entry), so only pairs taken in one run of the script are compared, with A and B runs interleaved. -->

# What a size costs at run time, design A against design B

## The answers

- **Classes loaded (a), measured.** For the same program, the two designs load the same classes except the size's descriptors.
  - Per size of a generic, A loads two small descriptor classes, about 1.1 KB together.
  - B loads one holder class per distinct number, 300 bytes. Each stamped class that names the size is also about 120 bytes larger under B, because its initialiser passes the number's descriptor to a factory. That comes to about 660 bytes per size in these programs.
  - B has two fixed costs: the class `RTTIsize` once per program (1,204 bytes), and one descriptor pair per sized generic, about 2 KB, which is loaded twice, as the tree loads every descriptor class that is not stamped.
  - With one size, B loads 4 more classes and 4.7 KB more (pNat1: 2,343 classes against 2,339). With eight sizes of one generic, B loads 3 fewer classes and 1.5 KB more (SizedMany: 2,403 against 2,406). By these figures A loads fewer bytes up to about eleven sizes of one generic.
  - Either way the difference is a few kilobytes of the 8.6 MB of classes every run loads.
- **Start-up (a), measured.** Three runs each, interleaved: no difference beyond the machine's noise (pNat1: A 618, 583, 577 ms; B 598, 665, 571 ms).
- **The hot loop (b), measured.** A sized object's method, looping over its eight elements, called ten million times. The stamped method's bytecode is the same under both designs, line for line, and the size appears in it as the constant `ldc 8`. The times agree within 7 %, and which design is ahead flips between the two rounds of the same run. A loop bounded by the constant size is not measurably faster than the same loop bounded by the storage's length read at run time: the loop's cost is elsewhere, about 31 ns per element.
- **A call dispatched by size (c), measured.** For arms with literal sizes (`g(v: Vec[\RR64,3\])` beside `g(v: Vec[\RR64,4\])`), both designs compile the same dispatcher: one `instanceof` per arm on the stamped class, whose name holds the size. For an arm generic in a size (`f[\nat s\](v: Vec[\RR64,s\])`), only B picks the right arm; A picks the catch-all every time. B's dispatcher then reads the size's descriptor and looks the arm up in a table on every call. Against the same call resolved by the checker, a dispatched call costs about 4 to 20 ns more under either design, for literal arms and for B's size-generic arm alike. The loop itself costs 30 to 50 ns per call, and the same loop varies by up to 30 ns per call between runs.
- **Where a shape is checked (d), read from the code.**
  - At compile time, the first rung's checker refuses a size mismatch once per call site. The tree's checker does not.
  - At load time, nothing compares sizes. The loader only writes the arguments into names.
  - At a dispatched call, the size is tested on every call, once per arm tried.
  - At a type test, one `instanceof` per test.
  - At a call the checker resolved, nothing.
  - Per element inside a stamped method, nothing about the size. Each element read is the JVM's own array bounds check, whatever the size is.
  - Nothing today builds an optimisation on a size.
  - All of this is the same under A and B, except which dispatched arms work.

## 1. How it was measured

- **The stack.** `size-cost/run.sh` step `stack` calls `size-probes/run.sh <work-dir> build worlds`, which rebuilds the shadow stack from the committed patches into the work directory and compiles the compiler's prelude into four private caches. It then stamps B's per-number descriptor classes for 0 to 16 with the committed tool `java/StampSizeRTTI.java`. For the captures, those two commands were run by hand, as written in the step, before the step existed. On this container the stack and worlds took 9 min 2 s.
- **The two designs, each with all its measured pieces** (`run.sh:16-21, 48-49`):
  - A: `runtime/design-a.patch`, `runtime/value-position.patch`, `size-probes/fourth-gap-a.patch`, `size-probes/keep-size-params.patch`; world `cV`.
  - B: `RTTIsize` and the stamped `<n>$RTTIc` classes in front of the class path, `value-position.patch`, `size-probes/extends-b.patch`, `size-probes/dispatch-b.patch`, `keep-size-params.patch`; world `cVB`.
- **Fresh caches.** Every program is compiled into its own copy of its design's world (`run.sh`, step `compile`). All seven programs compile under both designs, and all but the control give the right output (`k1-compile.out`).
- **The programs**, all in `size-cost/`:
  - `SizedMany.fss`: `prelude/pNat1.fss`'s `Box` and `unbox` at eight sizes.
  - `SizedSum.fss`: the hot loop.
  - `SizedDisp.fss`: an arm generic in a size.
  - `SizedDispLit.fss`: arms with literal sizes.
  - `VecCtorControl.fss`: a control with no size (§ 3).
  - `prelude/pNat1.fss` and `java/pNatGenMeth.fss` are rerun for comparison with `runtime/r6-startup.out`.
- **Timing.** Wall clock of the whole run for start-up (`run.sh`, `timed`). For the loops, each program reads `nanoTime()` around each loop and prints the milliseconds. Each loop runs twice in turn. The first round includes the JIT's warm-up, so the comparisons below use the second round. Three runs per design, A and B interleaved (A B A B A B), all in one run of the script with nothing else running.
- **Noise.** The container's timings vary between sessions (FACTS, "Execution model", the benchmark entry). Inside one run the same loop varied by up to 300 ms over ten million calls (`k4-dispatch.out`, B's one-size static loop: 378, 492, 684 ms). No difference smaller than that spread is read as a design's cost.
- **What was read and not measured** is marked "by reading" below.

## 2. Classes loaded and start-up (a)

- **How counted** (`run.sh`, `classes`). One run of each program under `-Xlog:class+load=debug`, which prints every class the JVM loads and, for each class it parses from a file or from bytes, the class file's length. Classes from the JDK's shared archive report no length and count as 0. The JVM's own hidden classes have an address in their names, so they are compared with the address removed. Then the classes loaded under one design and not the other are listed (`k2-classes.txt`).
- **pNat1, one size** (`k2-classes.txt:2-16`):
  - A: 2,339 classes, 8,612,010 bytes.
  - B: 2,343 classes, 8,616,739 bytes.
  - Only under A: `pNat1$Box❮3❯$RTTIc` (884 bytes) and `$RTTIi` (205).
  - Only under B: `3$RTTIc` (300), `RTTIsize` (1,204), and `pNat1$Box$RTTIc` (1,703) and `$RTTIi` (275), each of the last two loaded twice.
  - Loaded under both but larger under B: 3 classes, 358 bytes, `Box⟦3⟧` and two function classes over it (`:13-16`).
- **pNatGenMeth, two sizes of one generic** (`:17-34`): only under A, 4 classes and 2,254 bytes; only under B, 7 loads and 5,860 bytes; loaded under both but larger under B, 7 classes, 784 bytes.
- **SizedMany, eight sizes of one generic** (`:35-70`):
  - A: 2,406 classes. Only under A: 16 classes, 9,000 bytes, a descriptor class of 906 bytes and an interface of 219 bytes for each size (`Box❮1❯` to `Box❮8❯`).
  - B: 2,403 classes. Only under B: 13 loads, 7,648 bytes. These are the eight classes `1$RTTIc` to `8$RTTIc` of 300 bytes each, `RTTIsize`, and the `Box$RTTIc`/`$RTTIi` pair loaded twice.
  - Loaded under both but larger under B: 24 classes, 2,864 bytes. Each `Box⟦n⟧` is 126 bytes larger, and each function class over it 116.
- **SizedSum, the hot loop's program, one size** (`:71-84`): only under A, 2 classes and 1,119 bytes; only under B, 6 loads and 5,532 bytes; loaded under both but larger under B, 2 classes, 242 bytes.
- **Why B's generic descriptor is loaded twice.** Under B, `Box$RTTIc` is an ordinary class in the component's jar. It is loaded once by the JVM's application loader, from the jar, and once by the Fortress loader, which defines it itself. The raw log, left in the work directory and not kept, gives the two sources as the jar and `__JVM_DefineClass__`. The tree does the same to every descriptor class that is not stamped, whatever the design: `fortress.CompilerBuiltin$Object$RTTIi` appears twice in `runtime/r6-startup.out:2, 6`. Under A the sized descriptor is stamped, and only the Fortress loader makes stamped classes, so it is loaded once.
- **Why a stamped class is larger under B.** Its static initialiser fetches its own descriptor, once, when the class loads.
  - Under A that is one read of the sized descriptor class's `ONLY`, `SizedSum$Vec❮8❯$RTTIc.ONLY` (`k3b-javap.txt:148-155`).
  - Under B it reads the number's descriptor, `8$RTTIc.ONLY`, and passes it to the generic descriptor's factory, `SizedSum$Vec$RTTIc.factory` (`k3b-javap.txt:157-165`).
  - The extra references are the extra bytes. The work happens once per class load, not per call.
- **What the numbers say.**
  - Per size of a generic, A pays about 1.1 KB (two classes). B pays 300 bytes (one class) plus about 120 bytes in each stamped class that names the size, about 660 bytes in these programs.
  - B also pays about 5 KB of fixed cost the first time a sized generic is used, 2 KB of it the double load that the tree does to any descriptor class that is not stamped.
  - By these figures, A loads fewer bytes up to about eleven sizes of one generic. B loads fewer classes from six sizes.
  - Every run loads about 8.6 MB of classes, so either way the difference is a few kilobytes.
- **Start-up, three runs each, interleaved** (`k2-classes.txt:86-98`):
  - pNat1: A 618, 583, 577 ms; B 598, 665, 571 ms.
  - SizedMany: A 671, 706, 715 ms; B 688, 688, 694 ms.
  - There is no difference beyond the noise. `runtime/r6-startup.out` found the same (A 562, 611, 613 ms; B 600, 616, 707 ms), but counted only descriptor classes and ran A without the fourth-gap fix, under which A also loaded bogus classes (`size-probes/s2b-loaded-classes.txt:1-15`).

## 3. The hot loop (b)

- **The program** (`size-cost/SizedSum.fss`). It has an `object Vec[\nat s\]()` that makes its own storage, `data: ZZ32Vector = makeZZ32Vector(s.asZZ32).fill(1)`, and two methods that sum the elements with a `while` loop. `sumS` takes its bound from the size, `n: ZZ32 = s.asZZ32`. `sumN`, the control, takes it from the storage's length read at run time, `|data|`. Each is called ten million times on one `Vec[\8\]`, from a plain loop in a function whose parameter is typed `Vec[\8\]`, so the checker resolves every call and no dispatcher runs.
- **Why the object makes its own storage.** A `ZZ32Vector` passed to a generic object's constructor fails at load with `NoClassDefFoundError: FZZ32Vector$RTTIc`. The constructor's function class asks for a descriptor that the native vector does not have. The control `VecCtorControl.fss`, an object generic in a type with no size anywhere, fails the same way under both designs (`k1-compile.out:97-120`). It is a gap of the compiled path, not of sizes, and has no ledger row yet.
- **The bytecode.** `-Dfortress.bytecodes.expanded.directory` makes the Fortress loader write every class it stamps into a jar (`runtimeSystem/InstantiatingClassloader.java:83-100, 319-321`).
  - The stamped `SizedSum$Vec⟦8⟧.sumS♙` loads the size as the constant `ldc 8`, then `FIntLiteral.make` and `asZZ32` (`k3b-javap.txt:41-43`).
  - Under B the same method is identical to A's, line for line (`k3b-javap.txt:145-146`, `diff exit=0`).
  - In the template, as the compiler wrote it, the same place holds `invokestatic CONST.Nat⟦s⟧()` under both designs (`k3b-javap.txt:167-182`). The loader turns it into the constant when it stamps the class for `s = 8` (the `MethodInstantiater` hunk of `runtime/value-position.patch`).
  - So under both designs the size reaches the JIT, the JVM's run-time compiler, as a constant in the stamped method, and neither design's descriptor is read there.
- **The times**, milliseconds for ten million calls, three runs per design, second round (`k3-hotloop.out`):
  - `sumS`: A 2,521, 2,606, 2,609; B 2,453, 2,434, 2,504.
  - `sumN`: A 2,646, 2,366, 2,510; B 2,406, 2,359, 2,553.
  - First round `sumS`: A 2,941, 2,742, 2,770; B 2,887, 2,933, 2,958.
  - B is slightly ahead in the second round and A in the first. The bytecode is the same, so the difference is the machine's, not the design's.
- **The constant bound buys nothing measurable here.** `sumS` and `sumN` are within the noise of each other under both designs. Each element costs about 31 ns (2.5 s for 80 million elements), and the bytecode shows where it goes (`k3b-javap.txt:1-143`):
  - every local variable is a mutable cell, and each read and write first asks whether a transaction is running (`BaseTask.inATransaction`, six times per iteration);
  - every integer is a boxed `FZZ32`, and `<` and `+` are static calls that return new boxes;
  - each element read is a method call on `FZZ32Vector`, which ends in `val[i-lower_x]` on a Java `int[]` (`compiler/runtimeValues/FZZ32Vector.java:64`), where the JVM checks the index against the array's length.
- **Not examined:** whether the JIT removed that bounds check in either loop. No JIT log was taken. The constant bound and the array's length are not tied together anywhere, so nothing from the size could let the JIT drop it.

## 4. A call dispatched by size (c)

- **The programs.**
  - `SizedDisp.fss` is `size-probes/pNatDisp.fss`'s overload set: a scalar arm, `f[\nat s\](v: Vec[\RR64,s\])`, a matrix arm and a catch-all on `Any`. The vector arm returns its own size and the catch-all returns -1, so the total shows which arm ran.
  - `SizedDispLit.fss` has two arms with literal sizes and a catch-all. Both designs can answer it.
  - "Dispatched" loops pass values typed `Any`, so the overload set's dispatcher picks the arm at run time. "Static" loops pass the same values typed by their sizes, so the checker picks the arm.
  - "One size" is ten million calls on one value. "Two sizes" is five million rounds of a call on a size-3 and a call on a size-4 value.
- **Under A the size-generic arm is never taken.** Every dispatched loop totals -10,000,000, the catch-all's (`k4-dispatch.out:6`). The dispatcher tests `instanceof Vec⟦FRR64,s⟧`, a class named with the arm's own symbol that no value has (`size-probes/s1b-javap.txt:1-14`). A's times for that program are the catch-all's, so they are not compared with B's.
- **What B's dispatcher does on every call to the size-generic arm** (`k4b-javap.txt:1-32`; the code that emits it is `dispatch-b.patch` in `compiler/OverloadSet.java`, the tree's `:1011-1100` and `:1411-1696`):
  1. It asks the value for its descriptor, `getRTTI()`: an interface call that returns a static field set once when the value's class was loaded (`compiler/codegen/CodeGen.java:4393-4398`).
  2. It tests `instanceof Vec$RTTIi` on the descriptor, then casts it.
  3. It calls the getter `Vec__1` for the element type and tests it against `FRR64` with `runtimeSupertypeOf`, a `Class.isAssignableFrom` (`compiler/runtimeValues/RTTI.java:24-28`).
  4. It calls the getter `Vec__2` for the size's descriptor, an `RTTIsize`.
  5. It calls `RTHelpers.loadClosureClass(table, name, size)`, which puts the descriptor into a new one-element array, hashes the descriptors' serial numbers, and looks the arm's function object up in a balanced tree keyed by that hash (`runtimeSystem/RTHelpers.java:160-170`; `runtimeSystem/BAlongTree.java:48-54`). Only the first call for a size misses. It builds the class name `f⟦3⟧` from the descriptor's `className()`, which for a size is its number, and the loader stamps that arm (`RTHelpers.java:172-180`).
  6. It makes an interface call `apply` into the arm, and two casts.
  - Arms are tried in order, and an arm that does not match costs its `instanceof` and whatever getters it read.
- **Literal arms: one dispatcher for both designs.** A and B emit the same code for `g(Any)`: `instanceof SizedDispLit$Vec⟦FRR64,4⟧`, then `instanceof ...⟦FRR64,3⟧`, then the catch-all (`k4b-javap.txt:84-135`). The size is in the stamped class's name, and neither design's descriptor is read.
- **A call the checker resolved.** Under both designs the static loop reads the stamped arm's function object from a static field of the class `f⟦3⟧` and calls `apply` (`k4b-javap.txt:136-143`). The size is fixed in the names, and nothing about it is checked at run time.
- **The times**, second round, median of three runs, ten million calls per loop (so 10 ms is 1 ns per call; `k4-dispatch.out`):
  - B, the size-generic arm, one size: dispatched 533 ms, static 492 ms, about 4 ns more per call.
  - B, the size-generic arm, two sizes: dispatched 518, static 328, about 19 ns more per call.
  - Literal arms under A, one size: dispatched 426, static 389, about 4 ns more. Two sizes: 497 (runs 497, 658, 360), static 299, about 20 ns more.
  - Literal arms under B, one size: dispatched 448, static 400, about 5 ns more. Two sizes: 385, static 302, about 8 ns more.
- **What the times say.** Dispatching costs a few nanoseconds to about twenty per call, on top of a loop that costs 30 to 50 ns per call. B's size-generic arm, with its getters and table lookup, is in the same range as the literal arms both designs share. The spread between runs is as large as the differences, so the design's own share cannot be read more finely than "the same order".
- **Not measured:** many values of many sizes through one call site. Each loop here passes the same one or two values, which is the JIT's best case.

## 5. Where a shape is checked today, and how often (d), by reading the code

- **At compile time, in the checker.**
  - The tree compares two sizes in one place and says yes to all of them: `case (_: IntArg, _: IntArg) => pTrue()` (`scala_src/types/TypeAnalyzer.scala:332`).
  - The tree crashes before that on any inferred size (`NI.nyi()`, `scala_src/useful/STypesUtil.scala:550-557`). So the tree checks nothing.
  - The first rung's shadow compares sizes by equality (`perf-probes/nat/REPORT.md` § 2). It refuses `unbox[\4\](Box[\3\](7))` with "`[\4\]Box[\4\]->ZZ32` is not applicable to an argument of type `Box[\3\]`" (`REPORT.md` § 3; `01-probes-shadow.out`).
  - This happens once per call site, when the program is compiled. The checker is not part of either design.
  - This is where a program that multiplies a 3×4 matrix by a 5×2 one would be refused. The library declares `DOT` with a shared size `m` for exactly that (`Library/FortressLibrary.fsi:1619-1620`). That shared size has not been probed on the compiled path.
- **At load time, in the loader.**
  - Stamping substitutes names and compares nothing (`runtimeSystem/Instantiater.java:26-38, 47-58`; `runtimeSystem/MethodInstantiater.java:94-139`).
  - Once per stamped class, its static initialiser builds its descriptor through the factory. The factory does a dictionary lookup and loads the descriptor's class by name, again without comparing (`InstantiatingClassloader.java:2742-2826`; `RTHelpers.java:18-54`). This happens under both designs; under A the factory takes no argument for the size.
  - By reading, not measured: the JVM's own verifier checks each class once when the loader defines it. The size is part of the class names, so stamped code that passed a `Vec⟦3⟧` where a `Vec⟦4⟧` is declared would fail there. That is a safety net under a checker that already refused such code, not a check anyone designed.
- **At a dispatched call.** On every call, once per arm tried until one matches (§ 4).
  - Literal arms: an `instanceof` on the stamped class, the same under both designs.
  - Arms generic in a size: a read of the size's descriptor under B; under A, the wrong arm.
- **At a type test.** A `typecase` clause is one `instanceof` on the stamped class per test, under both designs (`size-probes/s3b-javap.txt:6, 14, 30`).
- **At a call the checker resolved.** Nothing. The call goes to the arm stamped for the size (`k4b-javap.txt:136-143`).
- **Per element inside a stamped method.** Nothing about the size. Every element read is the JVM's own bounds check on the storage array (`FZZ32Vector.java:64`), on every access, under both designs, and nothing relates the index to the size.
- **Optimisations built on a size: none.**
  - In the tree, the code generator and the run time use a size in two places: the mangler writes it into names (`compiler/NamingCzar.java:1889-1897`), and a size in an `extends` clause reaches the empty branch at `CodeGen.java:5784`. The kind tag `intnat` (`runtimeSystem/Naming.java:213`) is read by nothing.
  - With the value-position piece, a size also becomes a constant in stamped code (§ 3), and nothing uses that constant for anything else.
  - FACTS says the same ("Execution model": "no optimization is built on them anywhere").

## 6. What this does not settle

- **The JIT.** No JIT log was taken, so whether the JIT removed any bounds check or unboxed anything is not known. The measured statement is narrower: in this code shape, the constant bound is not measurably faster than the bound read at run time.
- **Many sizes at one call site.** Every dispatched loop here passes the same one or two values.
- **B's per-number classes** were stamped ahead of the run by the tool. The loader code that would make them on demand is not written (about 30 lines, `java.md` § 2). The brief's variant, a factory that makes the size's descriptor from the number with no class per number, would remove the 300 bytes per size and the classes whose names begin with a digit. It is unbuilt.
- **The dictionary's hash, by reading, not measured.** `RTTI.hashCode` is the hash of the descriptor's Java class (`RTTI.java:51`). `RTTIsize` gives every size the same placeholder class, `Object` (`java/java-shadow.patch`), so every size descriptor has the same hash. The factories' dictionary hashes argument lists by their elements' hashes (`runtimeSystem/RttiTupleMap.java:84-86`; `useful/MagicNumbers.java:442-457`), so all sizes of one generic fall into one bucket. This costs a longer search once per stamped class, not per call. A `hashCode` on the size's own text removes it.
- **The gate** was not run; the test class path cannot see a shadow (`runtime.md` § 4).
- **The control's gap** (`VecCtorControl.fss`: a `ZZ32Vector` through a generic object's constructor) has no ledger row.
