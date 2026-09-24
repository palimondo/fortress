<!-- A decision brief for Pavol on how the compiled path carries a `nat` size at run time: design A (a size takes the path an `opr` argument already takes) against design B (a small descriptor object per size, from one holder class per distinct number), and how the value-position piece and the fourth gap are taken. Written 2026-09-24 by a delegated worker, reading only, from the notes under `explorations/perf-probes/nat/` and the files they cite. Revised 2026-09-24 by a delegated worker after the three size probes (`perf-probes/nat/size-probes.md`) and a run-time cost measurement made for this revision (`perf-probes/nat/size-cost.md`, programs and captures under `perf-probes/nat/size-cost/`). The revision rewrote every statement the probes superseded, each marked "revised 2026-09-24 after the size probes". Design A's default fell to the brief's own stop condition, and the default and recommendation now give the data's reading, design B. A new section, "Run-time cost, measured", answers Pavol's questions of 2026-09-24 about what B's classes cost and when a shape is checked. The refresher (§ 1) now explains the compiled run time's generics machinery on its own, rewriting the parts of `coordinator/map/compile-path-walkthrough.md` §§ 5, 6 and 8, `perf-probes/nat/java.md` § 2 and `perf-probes/nat/runtime.md` that the designs rest on, with their citations kept beside each statement. The rule text (§ 9) is now design B's; design A's is kept in § 10. Pavol has decided nothing on this yet. Designs A and B here are not the nat plan's options A/B for the inference variable, the array review's decisions A-F, or the exclusion brief's routes A-C. -->

# Carrying a size at run time: a decision brief

## The decision in plain words

- A `nat` parameter puts a number into a type: `Vector[\RR64, 16\]` is a vector of sixteen `RR64`s. The compiled path lacks two halves.
  - Its checker cannot compare sizes. That is the size wall's first rung, already in batch 4's manifest (`microgpt-run-c-handover.md:9, 13`).
  - Its run time has nowhere to keep a size. So a compiled sized object dies when its class loads, with `NoClassDefFoundError: 3$RTTIc`. A gated expected-failure test shows exactly this today (`ProjectFortress/compiler_tests/XXXNatArgRungS.fss`; `compile-ladder/rung-default-rendering/probes/xxx-skeptic-defects.txt:74-80`).
- Every compiled generic already gets its own class per instantiation, made when the program first needs it, and the size is already in that class's name: `Box⟦3⟧`. Every type also has a run-time descriptor, an object that answers "is this a `Vec[\ZZ32,3\]`?" and hands out the type's arguments. A generic's descriptor already has a slot for the size, but nothing exists to put in it. § 1 explains this machinery from the start.
- Design A: a size goes where an operator argument already goes. It is written into the descriptor class's name, `Box❮3❯$RTTIc`, and has no object of its own. 28 code lines, built and measured (`perf-probes/nat/runtime.md` § 1). Revised 2026-09-24 after the size probes: A also needs 7 lines for the fourth gap (built), and about 70-90 more, not built, for an overload arm generic in a size, which A otherwise gets wrong (`size-probes.md` § 2.4).
- Design B: a size fills the slot that already exists, with a descriptor object for the number, from one small holder class per distinct number (`3$RTTIc`). Revised 2026-09-24 after the size probes, what is built: the 17-line descriptor class, 14 lines for a size in an `extends` clause and 29 lines in the overload dispatcher. Not built: the loader code that would make the holder classes, about 30 lines. A variant with no holder classes is described in § 10 (`size-probes.md`, the table under "The answers").
- Measured, revised 2026-09-24 after the size probes:
  - The designs run the same programs when sizes are literals.
  - Both tell `Vec[\ZZ32,3\]` from `Vec[\ZZ32,4\]` in dispatch and in a `typecase`.
  - For an overload arm generic in a size (`f[\nat s\](v: Vec[\RR64,s\])`, the shape of the library's `DOT` family), A silently runs the catch-all arm and B runs the right arm.
  - A size read inside a method of a sized object fails under A until 7 more lines are added. Under B it works.
  - What each costs at run time is the same within the machine's noise: start-up, a hot loop over a sized object, and a dispatched call ("Run-time cost, measured"; `perf-probes/nat/size-cost.md`).
- What A gives up, revised 2026-09-24 after the size probes: its descriptor has no object for a size, so code that must read a size off a value has to read it out of a class name. The one such reader found is the overload dispatcher, and it cannot do that without new code (§ 8, "Dispatch").
- Two further pieces. A size used as a number in a body (value position) is built, 25 lines, and works under both designs. A size read inside a method of a sized object (the fourth gap) is, revised 2026-09-24 after the size probes, design A's own problem: 7 lines fix it under A, and B does not have it. The library's `getter size():ZZ32 = s0` (`Library/FortressLibrary.fss:2022`) has its shape.

## The default, and what it changes

- The brief's first default was design A, with a stop condition: "back to him only if the dispatch arm needs more under A than reading a size out of the value's descriptor class name" (§ 9 and § 11 as first written).
- Revised 2026-09-24 after the size probes: that default fell to its own stop condition. The dispatched arm needs more under A than reading a class name (`size-probes.md` § 2.4):
  - A sized descriptor's interface carries the size in its name (`Vec❮3❯$RTTIi`), so the dispatcher cannot name it in a type test.
  - Its getters for the type arguments are named per size too.
  - The dispatcher's matching loop and the loader that stamps the chosen arm both take descriptor objects, not strings.
  - By reading, the fix is about 70-90 lines in two files, with two design questions of its own: how a size travels through the dispatcher and the closure loader, and how the dispatcher reaches a sized interface whose name holds the size.
  - By the brief's own rule, the choice goes back to Pavol.
- The default now proposed, as the data's reading (§ 11) and not a decision: design B, with the value-position piece, B's `extends`-clause piece and B's dispatch piece in the same rung. Two open items go to Pavol before that rung is briefed:
  - how the descriptor for a number is made: the loader emitting holder classes, or a factory with none (§ 10, § 12);
  - `DOT`'s shared size, one probe (§ 12).
- What it changes:
  - A new run-time class `RTTIsize`, the descriptor of a number.
  - A descriptor object per distinct number the program uses as a size.
  - The code generator pushes a size's descriptor in an `extends` clause.
  - The overload dispatcher reads a size off a value's descriptor and compares literal sizes.
  - Sized descriptor classes keep today's names (`Box$RTTIc`), but generated code changes for sized generics, so every cache is rebuilt, the prelude's included.
  - `XXXNatArgRungS` should leave the expected failures. Its printed name is checked in the rung.
  - Ledger row 366 (an object with an operator parameter) is fixed by three lines that are not specific to either design (`size-probes.md` § 5), and can ride along.

## Does the first rung wait on it?

- No. The first rung is seven Scala files, about 225 code lines, and nine lines in `FnNameInfo.java` (FACTS, "The checker and the one library", the 2026-09-21 and 2026-09-22 entries). It touches no file either design touches.
  - A touches `Naming`, `MethodInstantiater`, `CodeGen` and `OverloadSet` (`runtime/design-a.patch`), and for the fourth gap `MethodInstantiater` and `InstantiatingClassloader` (`size-probes/fourth-gap-a.patch`).
  - B touches a new `RTTIsize`, the loader, `CodeGen` and `OverloadSet` (`java.md` § 2; `size-probes/extends-b.patch`, `dispatch-b.patch`).
  - The checker behaved identically under both designs (`runtime/r1-probes-A.out` against `r2-probes-B.out`). The one thing the halves share, a sized method's generated name, is fixed by the first rung and used unchanged by both (`java.md` § 1).
- Revised 2026-09-24 after the size probes: the first rung needs 4 more lines, `size-probes/keep-size-params.patch` in `scala_src/types/TypeSchemaAnalyzer.scala`, a file already in its seven. Without them, the checker refuses an overload arm generic in a size whenever the set has a less specific arm, because `normalizeUA` drops every `nat` parameter from a generic arrow (`TypeSchemaAnalyzer.scala:449, 485`; `size-probes.md` § 2.1). Those lines were not run on the library or on the five nat compiler tests.
- One condition goes into the first rung's brief: its run tests stop at compile and link, or are written as expected failures that fail at load with `3$RTTIc`, as `XXXNatArgRungS` does today. A sized program that the first rung makes compile cannot run until the run-time rung lands, under either design.
- So he can decide while the first rung runs. The decision is needed before the run-time rung is briefed.

## Run-time cost, measured

Added 2026-09-24 to answer Pavol's questions of that day. The measurements are in `perf-probes/nat/size-cost.md`, on the size probes' own shadow stack. Each design ran with every piece it needs, and every program was compiled into its own fresh cache. The container's timings vary between sessions (FACTS, "Execution model", the benchmark entry), so only pairs taken in one run are compared, with A and B runs interleaved.

Two terms from § 1, defined here as well:
- **Stamping** is the Fortress class loader making one ordinary JVM class per instantiation of a generic, by copying the compiled template and writing the arguments into it, the first time the program needs that instantiation.
- **A descriptor** is the run-time object that describes a type, answers type tests and hands out the type's arguments.

**"I still don't understand the runtime cost of those classes."**

- **What B's classes are.**
  - One holder class per distinct number used as a size, `3$RTTIc`, of 300 bytes.
  - One class `RTTIsize` per program, of 1,204 bytes.
  - For each sized generic, a descriptor class and interface of about 2 KB, which today's loader happens to load twice (`size-cost/k2-classes.txt:2-16`; `size-cost.md` § 2).
  - Each stamped class that names a size is about 120 bytes larger under B. Its static initialiser reads the number's descriptor and passes it to the factory, once, when the class loads (`size-cost/k3b-javap.txt:148-165`).
- **What A loads instead.** A has no holder classes. It loads a descriptor class and interface for each size of each generic, about 1.1 KB per size (`Box❮3❯$RTTIc`, 884 bytes, and `$RTTIi`, 205 bytes).
- **Measured totals for the same program.**
  - One size (`pNat1`): 2,339 classes under A, 2,343 under B. B loads 4.7 KB more.
  - Eight sizes of one generic (`SizedMany`): 2,406 classes under A, 2,403 under B. B loads 1.5 KB more (`k2-classes.txt:35-70`).
  - By these figures A loads fewer bytes up to about eleven sizes of one generic, and B loads fewer classes from six sizes.
  - Every run loads about 8.6 MB of classes, so the difference is a few kilobytes either way.
- **When they cost.** Each class is loaded once. The descriptor for each stamped type is made once, when that type's class is first loaded, and kept in a static field (`compiler/codegen/CodeGen.java:4393-4398, 4431-4460`). After that, nothing reads a size's descriptor except the overload dispatcher choosing an arm that is generic in a size (below).
- **Start-up**, three runs each, interleaved, shows no difference beyond noise. `pNat1`: A 618, 583, 577 ms; B 598, 665, 571 ms (`k2-classes.txt:86-98`).

**"I was initially leaning towards A because I thought having less overhead is beneficial."**

- The overhead that differs is paid at load time and is a few kilobytes either way. A loads fewer bytes, by 1.5 to 5 KB in these programs (`size-cost.md` § 2).
- While the program runs, the two designs execute the same bytecode everywhere except two places: a dispatched call on an arm generic in a size, and each stamped class's static initialiser, which runs once when the class loads. The stamped method of the hot loop is identical line for line under A and B (`size-cost/k3b-javap.txt:145-146`). Ten million calls of it take the same time within 7 %, and the lead flips between rounds (`size-cost/k3-hotloop.out`).
- So overhead does not separate the designs. What separates them is that A answers a size-generic dispatch wrongly and needs about 70-90 more lines to answer it (§ 8, "Dispatch").

**"I understood that carrying sizes in the form of A was similar to something we already have (operators?), so that is a mechanism that already exists and sounds lighter weight than having classes."**

- Yes, A is the operator mechanism. An operator argument gets no descriptor. Its symbol is written into the descriptor class's name, `Op❮+❯$RTTIc`, and read back from there (`runtimeSystem/Naming.java:95-109, 1053-1066`; `runtimeSystem/RTHelpers.java:18-45`).
- It is not lighter in classes. A also makes classes: a descriptor class and interface for every size of every generic, where B makes one small class per number, shared by all generics (measured above).
- The mechanism is also unfinished where a size matters most. The overload dispatcher never learned to choose an arm generic in an operator or a size. Under A the probes found it picking the catch-all silently (`size-probes.md` § 2.2). The operator path was also incomplete for objects: ledger row 366, whose three-line fix the probes found (`size-probes.md` § 5).

**"What is the purpose of this: when we will be multiplying vectors and matrices, do we check the shapes are compatible?"**

- Yes, and the check is made when the program is compiled, by the checker, not at run time.
- The library declares the matrix product with a shared inner size: `opr DOT[\T extends Number, nat n, nat m, nat p\](me: Matrix[\T,n,m\], other: Matrix[\T,m,p\]): Matrix[\T,n,p\]` (`Library/FortressLibrary.fsi:1619-1620`). So a 3×4 matrix times a 5×2 matrix is a type error.
- The first rung's checker refuses the simplest such mismatch, `unbox[\4\](Box[\3\](7))` (`perf-probes/nat/REPORT.md` § 3). The tree's checker today says yes to any two sizes (`scala_src/types/TypeAnalyzer.scala:332`). `DOT`'s shared size itself has not been probed on the compiled path (§ 12).
- At run time the size is needed for four things only: naming the stamped classes, choosing an overload arm when the call is dispatched, type tests, and reading the size as a number.

**"How often do we check it at runtime?"** From the code, and the same under A and B except where noted (`size-cost.md` § 5):
- **A call the checker resolved:** never. The call goes straight to the arm stamped for that size (`size-cost/k4b-javap.txt:136-143`).
- **Each element inside a stamped method:** never for the size. Each element read ends in a Java array access, where the JVM checks the index against the array's length on every access (`compiler/runtimeValues/FZZ32Vector.java:64`). That check has nothing to do with the size.
- **A dispatched call:** on every call, once per arm tried. For literal arms both designs emit the same `instanceof` on the stamped class (`k4b-javap.txt:84-135`). For an arm generic in a size, only B checks, by reading the size's descriptor. Measured cost of dispatching, either design: about 4 to 20 ns per call against a loop that costs 30 to 50 ns per call (`size-cost.md` § 4).
- **A type test:** one `instanceof` per test (`size-probes/s3b-javap.txt:6, 14, 30`).
- **Loading:** no Fortress code compares sizes. By reading, the JVM's verifier checks each stamped class once, and since the size is in class names, a mismatch in stamped code would fail there. That is a safety net, not a designed check.

**"Is this something used once during the dynamic class loading and then we stamp the size into the generated code so that the JVM's compiler sees it, can inline it and can eliminate the bounds checks because we can pre-verify that nothing goes out of bounds?"**

- **The first half is how it works, under both designs.** Stamping happens once per size per class, at load. The size is in the stamped class's name, and where the code reads it as a number it is a constant. In `SizedSum$Vec⟦8⟧.sumS`, the loop bound is `ldc 8` in the bytecode (`k3b-javap.txt:41`), put there by the loader in place of the template's `CONST.Nat⟦s⟧()` (`:167-182`). The JIT, the JVM's run-time compiler, sees that constant.
- **The second half does not happen today.** Nothing ties the size to the storage's length. The storage is a Java array inside a library object, reached through method calls on boxed integers, so the size gives the JIT nothing to drop a bounds check with.
- Measured: the same loop bounded by the constant size and by the storage's length read at run time runs at the same speed. The time goes to boxing and to a transaction check on every local variable, about 31 ns per element (`size-cost.md` § 3). No JIT log was taken.
- What would make the second half possible is storage whose length is that same constant: the unboxed `double[]` Pavol decided on 2026-09-19 (`coordinator/POSITIONS.md:41`). Both designs carry the constant the same way, so that work does not depend on A or B.

**"Am I even thinking in the right space here?"**

- Yes, for what sizes are for: shape checking when the program is compiled, and specialised code per size. Both designs give these equally.
- The A-against-B choice is not in that space. It is about the one place the run time must read a size off a value: the overload dispatcher choosing an arm when the size is known only at run time. That covers the library's size-generic families such as `DOT`, and later sizes computed while the program runs (`array[E](n)`).
- There, B's descriptor is the thing the dispatcher and the closure loader already take. A needs new code there.

---

## 1. The refresher

### What a size is

- A **static parameter** is what stands between Fortress's white brackets in a declaration, `[\T, nat s0\]`. A **static argument** is what fills it at a use, `[\RR64, 16\]`. A **`nat` parameter** takes a natural number instead of a type (`Specification/basic/trait-parameters.tex:68-81`). In Rust it is `const N: usize`, in Swift 6.2 `let N: Int`, in C++ `size_t N`. In Scala the nearest thing is a literal type such as `3` used as a type argument.
- "Carried at run time" asks what, in the running program, still says "this vector has 3 elements". Languages give four answers:
  - nothing, because the size was erased (Java, Kotlin);
  - a constant inside a copy of the code made per size (C++, Rust);
  - an entry in a run-time type descriptor that unspecialised code reads (Swift's type metadata, Haskell's `KnownNat` dictionary, Scala's `ValueOf` argument);
  - a field in each object (X10's properties, Fortran's `LEN` parameters).
  - Sources are in § 6.

### How the compiled run time handles generics

This part is written out in full so that it can be read without the compile-path walkthrough. The citations beside each statement are its sources.

- **One template per generic.** The code generator compiles each generic trait, object or function once, into a *template* class whose names still hold the parameters (`coordinator/map/compile-path-walkthrough.md` § 5, "Generic declarations are emitted once"). Every Fortress type becomes a JVM reference type; `RR64` becomes the Java class `FRR64` (walkthrough § 5, "How types are lowered").
- **Stamping, once per instantiation.** When the running program first asks for a class whose name carries arguments in oxford brackets, such as `pNat1$Box⟦3⟧`, the Fortress class loader does not read a file. It reads the template and rewrites it: the class's own name, its superclass, its interfaces and every name inside its methods, with each parameter replaced by its argument (`runtimeSystem/InstantiatingClassloader.java:178`, the name tests at `:227-296`; `runtimeSystem/Instantiater.java:29-38`; method bodies in `runtimeSystem/MethodInstantiater.java`).
  - The result is an ordinary JVM class named with its arguments: `pNat1$Box⟦3⟧` (`perf-probes/nat/size-probes/s2b-loaded-classes.txt:37-45`), `SizedDispLit$Vec⟦FRR64,3⟧` (`perf-probes/nat/size-cost/k4b-javap.txt:95-99`).
  - Stamping renames and does not change layout. Every `Vec⟦FRR64,n⟧` has the same fields. The hook that would let one instantiation differ is an empty stub, `if (false) { // Here will go all the magic expando-stuff. }` (`InstantiatingClassloader.java:168-171`; walkthrough § 6, "What it does not do").
- **A descriptor for every type.** Beside the classes, the run time keeps one descriptor object per type, called RTTI (run-time type information) in the code (`compiler/runtimeValues/RTTI.java`).
  - A descriptor answers subtype questions, `runtimeSupertypeOf`, which compares the Java classes behind two descriptors (`RTTI.java:24-28`).
  - It also hands out the type's static arguments.
  - Its class is named after the type with `$RTTIc`, and it implements an interface named with `$RTTIi`, which is how the run time finds it: by class name (`CodeGen.java:5178-5214`, the design written as a comment in the code; the descriptor work is David Chase's, § 7).
  - A type with no static parameters has exactly one descriptor, kept in the static field `ONLY` of its `$RTTIc` class (`CodeGen.java:5367-5385`).
  - A generic type's `$RTTIc` class instead has a **factory**, a static method that takes the arguments' descriptors. The factory looks them up in a table, and on first use builds the descriptor and loads the stamped class it describes, whose name it assembles from each argument descriptor's `className()` (`InstantiatingClassloader.java:2742-2826`; `RTHelpers.getRTTIclass`, `runtimeSystem/RTHelpers.java:18-54`).
  - Every value can hand over its type's descriptor. `getRTTI()` returns a static field of the value's class (`CodeGen.java:4393-4398`). That field is set once, when the stamped class is loaded: the template's reference to `Box⟦k⟧$RTTIc.ONLY` becomes, after stamping, a call to the factory with the arguments' descriptors (`CodeGen.java:4431-4460`; `MethodInstantiater.rttiReference`, `MethodInstantiater.java:94-139`).
- **One slot per static parameter, all descriptors.** A generic type's descriptor holds one field per static parameter, with a getter (`Box__1`, `Vec__2`) and a factory argument for it (`CodeGen.java:5260-5276` for the interface's getters, `:5316-5328` for the fields, `:5332-5360` for the constructor). Every one of those fields is typed as a descriptor reference (`InstantiatingClassloader.java:2591-2592`), with the note "not yet this; sp.getKind();" left in the code where the kind would be consulted (`CodeGen.java:5351`). Function types use the same pattern (`InstantiatingClassloader.java:1597-1616`).
  - The only parameters left out are operator parameters (`CodeGen.java:5265, 5321, 5349, 5560`).
  - So a `nat` parameter already has its slot, its getter and its factory argument in today's generated code. Nothing can fill the slot yet (below).
- **Who reads a descriptor, and when.**
  - *The overload dispatcher*, when the arm of an overloaded call must be chosen at run time because the argument's static type does not decide it. It asks the value for its descriptor, tests it, and reads type arguments through the getters (`compiler/OverloadSet.java:1011-1100, 1411-1696`; the bytecode in `perf-probes/nat/size-cost/k4b-javap.txt:1-32`).
  - *The closure loader*, when the chosen arm is itself generic. It names the arm's stamped class from the descriptors' `className()`, stamps it on first use, and keeps it in a table keyed by the descriptors (`RTHelpers.loadClosureClass`, `RTHelpers.java:160-181`).
  - *Generic code instantiating something with its own parameters*: inside a stamped class, a reference to another generic instantiated with the class's own parameters becomes, at stamping, a factory call with those parameters' descriptors (`MethodInstantiater.java:94-139`).
  - *A descriptor's own supertypes*, built on first need from its parameters, for the types in the `extends` clause (`CodeGen.java:5784-5793`, `generateTypeReference`).
  - *Type tests*. A `typecase` clause on a sized object type compiles to an `instanceof` on the stamped class, even inside a generic function, where the loader fills in the size (`perf-probes/nat/size-probes/s3b-javap.txt:6, 14, 30`). So a type test reads the class name, not the descriptor. The dispatcher's tests against a generic type go through the descriptor, as above.
- **Operators, the run time's one exception.** An `opr` parameter (an operator symbol as a static argument, `trait-parameters.tex:156-176`) gets no descriptor, no slot, no getter and no factory argument.
  - Its symbol is written into the descriptor class's name between heavy angles, `Op❮+❯$RTTIc` (`runtimeSystem/Naming.java:207-210, 1053-1066`).
  - The factory is passed `null` in its place (`InstantiatingClassloader.java:2684-2691`), and `RTHelpers.getRTTIclass` reads the symbol back off the name (`RTHelpers.java:18-45`).
  - The run time's only kind question is "is this an operator?" (`Naming.isOprKind`, `Naming.java:95-109`).
- **A size inside a stamped method is a constant, under both designs.** With the value-position piece, a size read as a number compiles to a call `CONST.Nat⟦s⟧()` in the template. The loader replaces it with the integer constant when it stamps the class (`runtime/value-position.patch`; `runtime.md` § 3). In `SizedSum$Vec⟦8⟧` it is `ldc 8` (`perf-probes/nat/size-cost/k3b-javap.txt:41`), and the method's bytecode is the same under A and B (`:145-146`).

### What happens to a size today

From the walkthrough's §§ 6 and 8 and `java.md` § 2, rewritten.

- **Names.** The compiler writes a literal size's digits, or a symbol's own name, into generic names (`compiler/NamingCzar.java:1889-1897`). A stamped class reads `pNatMeth$Box⟦3⟧` (`java.md` § 1).
- **Nothing reads it back.** The kind tag for a size, `intnat` (`Naming.java:213`), is recorded in the side file that goes with each template (`Naming.java:87-93`) and read by nothing.
- **The empty slot.** When the loader meets `Box⟦3⟧$RTTIc.ONLY` in a stamped method, it treats every non-operator argument as a type. It asks for that argument's own descriptor class, so the literal `3` asks for a class named `3$RTTIc`, which nothing makes (`MethodInstantiater.java:124-138`). A symbol needs nothing, because the template names `Box⟦k⟧$RTTIc` and stamping fills in the number (`java.md` § 2). That is the `NoClassDefFoundError: 3$RTTIc` of the gated expected failure.
- **An `extends` clause.** A size in one falls through an empty branch into `CompilerError("Only emitting RTTI for types right now")` (`CodeGen.java:5784, 5793`; walkthrough § 6).
- **A size read as a number** compiles to a read of a static field of a class that does not exist, `pNatVec$s0` (`CodeGen.java:5969-5996`; `java.md` § 3).

### The two designs against that picture

- **Design A** makes a size a second exception like an operator. It gets no slot. It is written into the descriptor class's name, `Box❮3❯$RTTIc`, and where that descriptor still has a factory, `null` is passed in the size's place (`runtime/design-a.patch`; `runtime.md` § 1).
- **Design B** fills the slot that already exists with a descriptor for the number. That descriptor is an `RTTIsize` object whose `className()` answers the number (`java/java-shadow.patch`). It is kept in the `ONLY` field of a holder class per distinct number, `3$RTTIc`, because the run time finds a descriptor by class name. A class whose name begins with a digit cannot be written in Java source, so the loader, or in the probes a 36-line tool, must emit it as bytecode (`java.md` § 2; `java/StampSizeRTTI.java`).

### Pavol's three questions about B's classes

- **"Class per number, do we then generate for each used integer in those size classes?"**
  - Yes, one holder class per distinct number that the running program uses as a size, not per integer in the program. It is made the first time that number is needed and shared by every generic: `Vec[\RR64,3\]` and `Matrix[\RR64,3,3\]` use the same `3$RTTIc`.
  - Each is 300 bytes (`size-cost/k2-classes.txt:25-58`, eight of them for eight sizes). Which class is asked for depends only on the number, not on the generic (`MethodInstantiater.java:133-138`).
  - In the probes the tool made them in advance for 0 to 16. In a finished B the loader would make them on demand (about 30 lines, not written).
  - A variant needs no holder class at all: the factory would make the number's descriptor from the literal (§ 10).
- **"Is a literal within the class a pointer to a specific class object?"**
  - Inside the stamped class's code, no. A number the code reads is the constant itself, `ldc 8`, under both designs (`k3b-javap.txt:41`).
  - In the class's name the number is text: `Vec⟦FRR64,3⟧`.
  - In B's descriptor for `Vec[\RR64,3\]`, the size's slot holds a pointer to one shared object, the `RTTIsize` for 3, found in `3$RTTIc.ONLY`. Every descriptor with a 3 in it points at that same object.
  - The stamped class uses that pointer once, in its static initialiser: under B, `SizedSum$Vec⟦8⟧` reads `8$RTTIc.ONLY` and passes it to `SizedSum$Vec$RTTIc.factory`. Under A the same initialiser reads the sized descriptor class `SizedSum$Vec❮8❯$RTTIc.ONLY` (`size-cost/k3b-javap.txt:148-165`).
- **"Or is there an existing runtime object which just gains a new field?"**
  - The existing object is the sized type's descriptor (`Vec$RTTIc`), and it already has the field, the getter and the factory argument for the size. The code generator emits them today (`CodeGen.java:5316-5360`). B does not add a field; it gives that field something to point at.
  - The values themselves, each vector object, gain nothing under either design. The size lives in the class and its descriptor, once per instantiation, not in each object.

## 2. What each path does today, measured

- The interpreter: a size is a type, one interned object per value (`interpreter/evaluator/types/IntNat.java:38-51`). At each call a literal must be equal, a symbol is bound, and anything else fails (`IntNat.java:125-146`). A mismatch reads "Failed to find any matching overload" and cannot be caught (FACTS:20). A size is usable as a read-only number (`reviews/nat-checking-plan.md` § a, "Summary of intent", item 1).
- The compiled checker cannot infer a size (`NI.nyi()`, `scala_src/useful/STypesUtil.scala:546-559`) and takes any two sizes as equal (`scala_src/types/TypeAnalyzer.scala:331-332`) (FACTS:30). The first rung's shadow fixes both and refuses a mismatch (`perf-probes/nat/REPORT.md` § 3).
- The compiled names, the loader, the code generator: § 1, "What happens to a size today".
- In the gate: `XXXNatArgRungS.fss` (`object Vec[\nat n\]() end`, then `Vec[\3\]()`) compiles, links, and fails at run with `NoClassDefFoundError: 3$RTTIc`, recorded as its expected failure (`xxx-skeptic-defects.txt:74-80`).
- With the shadows stacked (the checker's, the Java site's, then A or B), from `runtime.md` §§ 1-2 and `runtime/r1`-`r8`:
  - `pNat1`, `pNat2`, `pNat3`, `pNatMeth` and `pNatGenMeth` print 7 under both designs, B given its holder classes by a 36-line probe tool (`r1:1-14, 94-103`; `r2`).
  - `pNatOver`, `g(v: Vec[\ZZ32,3\])` beside `g(v: Vec[\ZZ32,4\])`, prints 3 then 4 under both (`r1:105-109`; `r2`). Its arms have literal sizes; no arm is generic in a size.
  - `NatExtends2`, a size in an `extends` clause, prints 7 under A. Under B the compile dies at `CodeGen.java:5800` of the shadow (`r8:13-16, 40-51`). Revised 2026-09-24 after the size probes: with B's own 14-line piece (`extends-b.patch`), `NatExtends1`, which has the same clause and a method besides, prints 3 under B (`size-probes/s2-fourth-gap.out:118-121`).
  - `pNatVec`, a size used as a value, prints 5 with the value-position piece, under A (`r3`) and under B (`r4`).
- Revised 2026-09-24 after the size probes (`perf-probes/nat/size-probes.md`, on the same stack rebuilt from the committed patches, `runtime/r1` and `r2` reproduced byte for byte first):
  - **An overload arm generic in a size, the call dispatched at run time** (`pNatDisp`, `pNatDispTrait`, `pNatDispSize`: ledger row 214's three arms beside a catch-all on `Any`; and `pNatDispLit`, arms with literal sizes).
    - The first rung's checker refuses the set until `keep-size-params.patch` is applied.
    - Then A links, runs and picks the catch-all for every size-generic arm; its literal arms answer right (`s1-dispatch.out:59-102`).
    - B as `java.md` left it does not compile any sized arm, literal arms included (`OverloadSet.java:1199`). With `dispatch-b.patch` (29 lines), B picks the right arm on all four programs, and the arms read their sizes 3, 4 and 2 4 (`s1-dispatch.out:219-263`).
  - **The fourth gap** (`NatExtends1`, `len(): ZZ32 = s.asZZ32` inside `object Buf[\nat s\]`; `NatGetter`, the library's `getter size(): ZZ32 = s0` on a sized trait).
    - Under A both fail at load with `NumberFormatException` on the symbol, because A's descriptor names its object class with the template's symbols (`CodeGen.java:5380`; `InstantiatingClassloader.java:2797`) and the loader passes that constant through. `fourth-gap-a.patch` (7 lines) fixes it, and both print 3.
    - Under B, with `extends-b.patch`, both print 3 and there is no fourth gap (`s2-fourth-gap.out`).
  - **A type test on a size.** `pNatCase2` and `pNatCaseGen`, `typecase` clauses that need no coercion, tell `Vec[\ZZ32,3\]` from `Vec[\ZZ32,4\]` under both designs, also when the size is a parameter of the enclosing function. The test is an `instanceof` on the stamped class (`s3-typecase.out`; `s3b-javap.txt`). The old `pNatCase`/`pTypeCase` failure was ledger row 340's shape, as this brief first read it.
  - **Row 366's program** prints `Op[\+\]` on the stack, under either design's flags. The three `ONLY` lines of `design-a.patch` that are not behind its flag are the fix (`s4-row366.out`).
- Revised 2026-09-24 after the size probes, the cost measurement (`perf-probes/nat/size-cost.md`):
  - bytes loaded per size of a generic: A about 1.1 KB; B about 660 bytes, plus about 5 KB once per sized generic, so A loads fewer bytes up to about eleven sizes;
  - start-up equal within noise;
  - a hot loop's stamped method identical under both designs, the size a constant in it, times equal within noise;
  - a dispatched call about 4 to 20 ns more than a resolved one under either design.
  - Details in "Run-time cost, measured".
- The five nat compiler tests are byte-identical stock against shadow (`r5`). No gate ran: the test class path cannot see a shadow (`runtime.md` § 4).

## 3. What the specification says

- "These parameters are instantiated at runtime with numeric values" (`trait-parameters.tex:82`; the same sentence for `bool`, `:111`).
- A nat "may be used to instantiate other nat parameters, or to appear in any context that a variable of type ℕ32 can appear, except that it cannot be assigned to" (`:83-86`).
- The chapter opens "Non-type static parameters and static expressions are not yet supported" (`:15-17`).
- Its one example, `makeVector[\T extends Number, nat s0\]():Vector[\T,s0\] = vector[\T,s0\]` (`SpecData/examples/basic/StatParam.Nat.fss`, quoted at `:94-97`), never reads `s0` as a value (`runtime.md` § 3).
- The same idea appears three more times under other spellings.
  - Static expressions: "Conceptually, a static expression is not evaluated while a program is running … Given instantiations of all static parameters … the value of the static expression can be determined statically", and a nat parameter "denotes a value that has type NaturalStatic" (`Specification/basic/expressions/constant.tex:17-25, 95-97`). Read with `:82`: the value is fixed per instantiation, and the instantiation happens at run time, which is what a stamping loader does under either design.
  - Operator parameters: "Unlike other static parameters, operator parameters may be used in both type context and value context" (`trait-parameters.tex:172-175`), a sentence the nat section contradicts (`:83-86`). The run time carries an operator by name, design A's model.
  - The factories: `array[E](size)` for a "runtime-determined size" beside `array1[E,n]()` for a "statically determined size" (`Specification/advanced/parallelism-locality/arrays-distributed.tex:42-48`).
- The team's JVM paper: a template's names use the static parameters' upper bounds, and the side file records "whether they are types, oprs, or nats" (`Papers/Implementation/MethodMapping.tex:134, 142`). It names sizes as a kind; it does not say what their descriptor is.
- The internal meeting record allows `T[\1\]` beside `T[\0\]` "now that nat parameters are all instantiated" and asks about "don't instantiate" under a hypothesis (`Specification-1.0-frozen/appendices/internal-document.tex:183-208`; `reviews/array-design-review.md`, Minor 10). Neither sentence picks A or B.
- `LibraryBuiltin/NatReflect.fss:38-40`, on turning a run-time number into a size: "Really this just proves that it can be done without extending the language. Having proven that, we ought to build it in". A size made at run time is the spec's own case.

## 4. Where a size sits beside the other kinds

- Six kinds: type; `nat` and `int`; `bool`; `dim` and `unit`; `opr` (`trait-parameters.tex:36-176`).
- The checker has inference variables for types and, since 2011, operators (`STypesUtil.scala:546-559`). The first rung adds sizes as a third track modelled on the operator track: equality only, solved by unification, no subtyping, no variance (`REPORT.md` § 2; `nat-checking-plan.md` § c, "the op track's `oEquivalent` … with an int flavour"). To the checker, a size behaves like an operator.
- The run time has one kind predicate, "is this an operator?" (`Naming.java:95-109`). A type argument gets a descriptor object, a field, a getter and a factory argument (`CodeGen.java:5261-5272, 5317-5328`). An operator gets none of these (§ 1).
- A size has a tag, `intnat` (`Naming.java:213`), recorded in the side file (`Naming.java:87-93`) and read by nothing. The code generator counts a size among the descriptor-bearing parameters (`CodeGen.java:5317-5328`), which is B's premise, and no descriptor class exists for it. `bool`, `dim` and `unit` are in the same state (empty branches, `CodeGen.java:5780-5791`) and outside both designs.
- So A makes the run time agree with the checker's model of a size, a value compared by equality like an operator. B makes it agree with the code generator's count and with the interpreter, where a size is a type object.
- Revised 2026-09-24 after the size probes: B also agrees with the run time's dispatch machinery. The dispatcher keeps each static argument of a generic arm as a descriptor and compares repeated ones with `runtimeSupertypeOf`, and the closure loader takes descriptor objects (`OverloadSet.java:1410-1636`; `RTHelpers.java:160-181`; `size-probes.md` § 2.4). Under B a size goes through both unchanged. Under A it would need a second, string channel through both.

## 5. What the library already does with sizes

- The sized traits: `Array1[\T, nat b0, nat s0\]`, `Vector[\T extends Number, nat s0\]`, `Array2`, `Matrix[\T extends Number, nat s0, nat s1\]`, `Array3` (`Library/FortressLibrary.fsi:1440, 1465, 1542, 1583, 1657`).
- Shared sizes in the products: `opr DOT[\T extends Number, nat n, nat m, nat p\](me: Matrix[\T,n,m\], other: Matrix[\T,m,p\]): Matrix[\T,n,p\]` (`.fsi:1619-1620`) and the vector forms (`.fsi:1513-1530`). Every `DOT` arm is generic in its sizes, so the family is an overload set of size-generic arms.
  - Revised 2026-09-24 after the size probes: that shape was measured on row 214's three arms. A answers with the catch-all and B answers right (§ 2).
  - `DOT`'s shared `m`, the same size in two arguments, is not probed under either design (§ 12).
- Literals: 4 distinct size literals (0, 1, 2, 3) written as static arguments in 85 places, 78 of them `0`; 244 nat parameters declared (`runtime/r7-lib-literals.txt`). Under B that is four holder classes for the library's own literals. Under A it is one descriptor class and interface per sized type used.
- Dead sizes: 25 api declarations carry a size that occurs in no domain, range or body (`REPORT.md` § 2). The checker lets them pass by decision E2 (POSITIONS:47). Neither design meets them unless a dead size reaches a name (`REPORT.md` § 11).
- Sizes read as numbers inside sized traits: `getter size():ZZ32 = s0` and `opr |self| : ZZ32 = s0` in `ReadableArray1` (`FortressLibrary.fss:2022, 2036`); `s0 s1` in `Array2` (`:2299, 2320`); `s0 s1 s2` in `Array3` (`:2680, 2712`); `o::m#s` and `o-b0` in `subarray` (`:2127-2128`). Revised 2026-09-24 after the size probes: the trait-getter shape was measured as `NatGetter`. It needs A's 7-line fourth-gap piece and prints 3 under both designs (`size-probes.md` § 3).
- Sizes in `extends` clauses: `trait Rank1 extends { Rank[\1\]}` and its two siblings (`.fss:1605-1611`). These are three of the five library declarations the checker passes clean and the code generator refuses (`perf-probes/prelude/desugar-codegen.md`, "The five"). Design A's one `continue` is the branch they reach (measured on `NatExtends2`, which writes a symbol; the literal case is by reading). Revised 2026-09-24 after the size probes: under B, `extends-b.patch` (14 lines) pushes a symbol's field or a literal's holder, measured with a symbol on `NatExtends1`, `NatGetter` and `pNatDispTrait`.
- Arithmetic in sizes: the storing objects' `PrimitiveArray[\T, (s0 s1)\]` (`.fss:2423, 2571, 2794`) and `reflect`'s `__refl'[\r+b, b+b\]` (`NatReflect.fss:42-48`). The first rung refuses arithmetic (`array-design-review.md`, Serious 5); neither design evaluates it.
- Where the team departed: the compiler world's one numeric array, `ZZ32Vector`, has no size parameter and keeps its shape as four integers in the Java object (`LibraryBuiltin/CompilerBuiltin.fsi:563`; `compiler/runtimeValues/FZZ32Vector.java:18-19`; `coordinator/array-design.md` § 2), the X10 and Fortran way. The compiler prelude's only sized declaration is an empty `trait Matrix[\T, nat s0, nat s1\]` (`Library/CompilerLibrary.fss:638`), deleted at the switch-over (POSITIONS:46). The interpreter's library makes sizes as types at run time (`reflect`), B's shape at the interpreter.

## 6. The peers, by family

- JVM. Java: a type parameter is an identifier with an optional bound, erased (JLS § 8.1.2, https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.2). Microsoft's C++ guide: "Unlike generic types in other languages such as C# and Java, C++ templates support non-type parameters" (https://learn.microsoft.com/en-us/cpp/cpp/templates-cpp). Nothing is carried, so nothing costs; a size is a field.
- JVM. Kotlin: `typeParameter: [typeParameterModifiers] simpleIdentifier [':' type]`, no value parameter (https://kotlinlang.org/spec/syntax-and-grammar.html). As Java.
- JVM. Scala: literal types, `val one: 1 = 1`, and `ValueOf[T]` with `valueOf[T]`, "yielding the unique value of types with a single inhabitant" (SIP-23, https://docs.scala-lang.org/sips/42.type.html). On the erasing JVM the value reaches generic code as an implicit argument: a descriptor passed per call.
- Close to the metal. C++: a non-type argument "is passed in as a template argument at compile time and must be const or a constexpr expression", and each instantiation is its own class (Microsoft Learn, above). Nothing at run time; the size is a constant in the class's code.
- Close to the metal. Rust: `const N: usize` may be used "as a value in any runtime expression" and in types. An argument is a literal, a single-segment path or a braced const expression, and `N + 1` in a type is refused (https://doc.rust-lang.org/reference/items/generics.html). The compiler "stamps out a different copy of the code of a generic function for each concrete type", paid in compile time and binary size (https://rustc-dev-guide.rust-lang.org/backend/monomorph.html). Nothing at run time.
- Close to the metal. Swift: SE-0452, "Implemented (Swift 6.2)": a reference to an integer generic parameter "evaluates the parameter as a value of type `Int`", and the runtime must "encode and interpret them as part of type metadata" (https://github.com/swiftlang/swift-evolution/blob/main/proposals/0452-integer-generic-parameters.md). Specialised code sees a constant; unspecialised code reads the metadata. That is B's shape, and Swift needs it because unspecialised generic code exists.
- Scientific. Chapel: a `param` field or argument makes a generic, "A copy of the function is instantiated for each unique parameter", and `IntegerTuple(3)` and `IntegerTuple(2)` are distinct types (https://chapel-lang.org/docs/language/spec/generics.html). Arrays keep the rank as a param and the bounds in a run-time domain: "A domain expression may contain bounds which are evaluated at runtime" (https://chapel-lang.org/docs/language/spec/domains.html).
- Scientific. Fortran 2003: a derived type's `KIND` parameters are constants; its `LEN` parameters may be given at run time and live with the object (IBM XL Fortran, https://www.ibm.com/docs/en/xl-fortran-aix/16.1.0?topic=types-derived-type-parameters-fortran-2003). Extents are `LEN`-like: a field.
- Scientific. X10: classes take properties, "final instance fields", and a dependent type such as a rank-2 array is a constraint over them, checked by a constraint solver (Nystrom, Saraswat, Palsberg, Grothoff, OOPSLA 2008, https://dl.acm.org/doi/10.1145/1449764.1449800). One field per object at run time.
- Scientific. Julia: values may be type parameters, `Array{T,N}`, `Val{N}`. "By passing `N` as a type-parameter, you make its 'value' known to the compiler", which specialises per value while the program runs. With a size computed at run time, `Val(n)` recreates "the same problem all over again", dynamic dispatch (https://docs.julialang.org/en/v1/manual/performance-tips/). It is the nearest peer to this loader: code per value, made at run time.
- Typed functional. Haskell: `KnownNat` has "instances of the class for every concrete literal", `natVal` returns the number at run time, and `someNatVal` "converts an integer into an unknown type-level natural" (https://hackage-content.haskell.org/package/base-4.22.0.0/docs/GHC-TypeLits.html). Types are erased; a size travels as a dictionary; `someNatVal` is `NatReflect.reflect`.
- Typed functional. Idris 2: quantity 0 means a variable "is erased at run time". A `Vect`'s length is kept only when used, where Idris 1 needed `n` "available at run time" (https://idris2.readthedocs.io/en/latest/tutorial/multiplicities.html).
- In short: the peers that care about speed make a size a constant in specialised code (C++, Rust, Chapel, Julia), and keep a descriptor only where unspecialised code must read it (Swift, Haskell, Scala). This loader stamps every instantiation it runs (FACTS:18), so its sized code is always specialised. As first written, this said that A is the specialised-only answer and B adds the descriptor.
- Revised 2026-09-24 after the size probes: this run time has one piece of unspecialised code, the overload dispatcher. It runs before an arm is chosen and must read a size off a value (`size-probes.md` § 2). That is Swift's case for keeping metadata, and B's descriptor is what serves it.

## 7. The history in the commits

- Method: `git log --full-history -S` from the trunk tip `a874948ac`, skipping the parentless snapshot roots the conversion left. `git blame` on the cited lines stops at the 2012-07-19 import root `5a68404fd` (`MethodInstantiater.java:113-131`, `CodeGen.java:5316-5328`), so each date below is the earliest commit with a parent that adds the text.
- 2007-01-04, Jan-Willem Maessen: the interpreter's `IntNat.java`, a size as an interned type, is in the repository's first commit (`72ae6881b`).
- By the 1.0 text (`Specification-1.0-frozen/basic/trait-parameters.tex:82`), and into `Specification/` on 2009-11-06 (`0f49d8698`, Sukyoung Ryu): "instantiated at runtime with numeric values" and the "not yet supported" note.
- 2009-06-06, Justin Hilburn (`dc75ba359`): `makeInferenceArg`, with `NI.nyi()` for every kind but types, operators included.
- 2009-11-11, Ryu (`93f5018fd`): the internal record's three nat questions.
- 2009-11-16, David Chase (`0e13934e9`): the mangler writes a literal size's digits into generic names.
- 2010-07-29, Chase (`92e44d65c`, "Got generic methods of generic traits working"): the substitute-at-load channel, the magic class `CONST`.
- 2011-01-25, Chase (`88b5bf907`): descriptors for `extends` clauses; every non-type kind, operators included, an empty branch into "Only emitting RTTI for types right now".
- 2011-03-09, Chase (`3b0b1c38b`, "Further working towards generic overloading"): dispatch type structures, with "Non-type args will be somewhat problematic at first" and "need to figure out how to normalize array length if non-type args" (`compiler/OverloadSet.java:1187-1189`).
- 2011-04-01, Chase (`571a57388`): a field and a getter per static parameter in descriptor classes.
- 2011-07-15, Hilburn (`f02ae62ae`, "Changed OpArgs again."): operators get an inference variable and the checker's second track. The same commit leaves `(IntArg, IntArg) => pTrue()` under "Not handling all static args properly yet".
- 2011-12-08 to 2012-01-29, Chase: operators at run time.
  - Heavy angles, the annotated descriptor name and the `extends`-clause `continue` (`a5a06c65c`, "Some steps towards opr parameters").
  - The kind tags, `intnat` among them (`3b7bda65e`, 2012-01-13, "More SMOPing towards opr parameters").
  - The non-operator count (`0595eb834`, 2012-01-14).
  - `isOprKind` (`bcf08dae8`, 2012-01-18, "still busted somehow in instantiation").
  - Nulls pushed in the factory, first seen in `8af8941d9` (2012-01-29, a snapshot root, "Closer to opr parameters").
- 2012-05-21, Chase (`4a839480f`): `MethodMapping.tex` records nats as a kind.
- 2012-08-31: the trunk ends. Operators went through both halves and are still incomplete for objects (ledger row 366). Sizes got a tag and no run-time kind.
- Read together, the team built the operator path twice, in the checker (2011-07) and in the run time (2011-12 to 2012-01), and left sizes one step behind both times; the tag `intnat` was born inside the operator work. As first written, this said that design A finishes that work by the same route and design B finishes what the code generator's count assumes.
- Revised 2026-09-24 after the size probes: the operator path never reached the dispatcher's type structures either. Chase's "Non-type args will be somewhat problematic at first" (`OverloadSet.java:1187-1189`) marks where both designs stopped. B's 29 lines finish that site on the type-argument path; A's fix there is not built.

## 8. The derivation from his principles, case by case

- **Finish the designers' intent** (POSITIONS:24). Both designs are the team's. A is their operator path; B is what `CodeGen.java:5317-5328` counts and what the interpreter does. "Instantiated at runtime" holds under both (§ 3). Intent does not choose.
- **JVM defaults where they make sense** (POSITIONS:72). The JVM has no value generics. Its tools for a constant per instantiation are a class name and an `LDC`, the instruction that pushes a constant, and A uses those and nothing else. B adds a class per number whose name begins with a digit, which Java source cannot write, so the loader must emit it (`java.md` § 2). B also gives the descriptor a placeholder Java class, `Object`, where the descriptor's contract expects a real one (`java.md` § 3). As first written this leaned A.
  - Revised 2026-09-24 after the size probes: the holder classes cost 300 bytes each, loaded once, and the variant in § 10 would remove them.
  - The placeholder has one effect, found by reading and not measured: every size descriptor hashes alike, which costs a longer table search once per stamped class. A one-line `hashCode` fixes it (`size-cost.md` § 6).
  - Now neutral, with a slight lean to A for adding no new kind of class.
- **Close to the metal, Swift and Rust** (POSITIONS:72). What matters for speed is that a size becomes a constant in each sized class's code. Stamping makes one class per size under both designs, and the value-position piece turns `s0` into an `LDC` of the literal under both (`runtime.md` § 3).
  - Revised 2026-09-24 after the size probes: measured. The stamped method is identical under both designs, with `ldc 8` in it, and ten million calls take the same time within noise (`size-cost.md` § 3).
  - Swift keeps metadata because unspecialised code exists; here the unspecialised code is the dispatcher (§ 6). Neutral on speed.
- **Start-up and class count.** Revised 2026-09-24 after the size probes, measured (`size-cost.md` § 2):
  - A costs about 1.1 KB per size of each generic (two classes).
  - B costs 300 bytes per distinct number (one class), about 120 bytes more in each stamped class that names the size, and about 5 KB once per sized generic: `RTTIsize`, and a 2 KB descriptor pair that the tree loads twice.
  - A loads fewer bytes up to about eleven sizes of one generic; B loads fewer classes from six.
  - The difference is a few kilobytes against about 8.6 MB loaded by every run, and start-up is equal within noise.
  - microGPT's sizes are six literals and a computed 4192 (`array-design.md` § 3). Minor either way.
- **Dispatch.** Revised 2026-09-24 after the size probes, measured (`size-probes.md` § 2; `size-cost.md` § 4):
  - For arms with literal sizes, both designs emit the same dispatcher, an `instanceof` on the stamped class.
  - For an arm generic in a size, A tests a class named with the arm's own symbol, `Vec⟦FRR64,s⟧`, which no value has, and silently runs the catch-all.
  - B, with 29 lines, reads the size off the value's descriptor through its getter and hands it to the closure loader as it does a type argument. It answers right on all four programs.
  - A's fix is about 70-90 lines by reading, with two design questions. The first asks whether a size travels as a string beside the descriptors or as a descriptor object made at dispatch; that second answer is B's object inside A. The second asks how the dispatcher reaches a sized interface whose name holds the size.
  - B's dispatch costs per call are in the same range as the literal arms both designs share, a few to about 20 ns (`size-cost.md` § 4).
  - Leans B clearly. This was the one point the first version said could change the default, and it did.
- **Value position.** Design-independent, measured. The constant is read out of the name both designs carry, through the substitute-at-load channel (`MethodInstantiater.java:195-207`; in use since 2010 at `CodeGen.java:2574-2581`). 3 files, 25 lines.
- **The fourth gap.** Revised 2026-09-24 after the size probes, measured (`size-probes.md` § 3):
  - It is design A's own. A's descriptor names its object class with the template's symbols: the `LDC` at `CodeGen.java:5380`, and the factory's plain `LDC` of the stem at `InstantiatingClassloader.java:2797`, whose substituting branch the tree switched off with the comment "NOT symbolic (and a problem if we pretend that it is)".
  - Seven lines fix it, and they change every template's class constants and every annotated factory. Only the gate can say what else that touches.
  - B has no fourth gap. Leans B.
- **The substitute-at-load channel.** Under A the name is the one place a size lives at run time: descriptor name, class name and value constant are the same text, substituted at load. Under B there are two places, the name and the descriptor object, and they must spell a size the same way (`RTTIsize.className`, `java.md` § 2). They did in every probe. Slight lean A.
- **Unboxed `double[]` storage** (POSITIONS:41). Neutral. Under both designs the stamped store's class name carries element type and size, `PrimitiveArray⟦FRR64,16⟧`, which is what a loader-level choice of representation would key on (the expando stub, `InstantiatingClassloader.java:168-172`; `array-design-review.md`, decision A2). The bounds-check question Pavol raised belongs here, and it is the same under both (`size-cost.md` § 3).
- **Sizes made at run time** (`array[E](size)`, `reflect`).
  - Under A, a native that makes a size from a number builds names (`N⟦4192⟧`, `N❮4192❯`), which the loader already expands as it does an operator generic.
  - Under B, the descriptor for any number must be makeable while the program runs: the emitter serves every number, not only the literals in the source, or the § 10 variant makes it with no class.
  - Both unprobed. The model's typing waits on the array review's decision D.
- **The library's own practice** (POSITIONS:40). Revised 2026-09-24 after the size probes:
  - Its size getters work under both, A with 7 more lines.
  - Its `Rank[\1\]` clauses pass A's measured branch and need 14 lines under B.
  - Its `DOT` family is size-generic arms, which only B dispatches right.
  - Leans B.
- **Forks probed first** (POSITIONS:71). Done 2026-09-24: the dispatch arm, the fourth gap and a type test were probed before the run-time rung is briefed (`size-probes.md`), and the run-time cost measured (`size-cost.md`).

## 9. The decision, as it would be written

Revised 2026-09-24 after the size probes: this section first carried design A's rule. It now carries design B's, as the data's reading, for Pavol to take or refuse. A's rule is kept in § 10.

- What we do: carry a size at run time as a descriptor object, in the slot the code generator already gives it (design B). Land the value-position piece, B's `extends`-clause piece and B's dispatch piece in the same rung. Settle two things before that rung is briefed: how a number's descriptor is made (holder classes from the loader, or a factory with none), and `DOT`'s shared size, one probe.
- What it changes:
  - a new run-time class `RTTIsize`, and a descriptor per distinct number used as a size;
  - the code generator pushes a size's descriptor in an `extends` clause;
  - the dispatcher reads sizes off descriptors and compares literal sizes;
  - every cache rebuilt, because generated code changes for sized generics;
  - `XXXNatArgRungS` promoted out of the expected failures;
  - row 366's three `ONLY` lines taken with it and `XXXOprParamRungS` promoted if it passes.
- The default, accepted without reading the argument: design B as above. Back to him if `DOT`'s shared size needs more than comparing the second occurrence by equality, or if a number's descriptor needs anything but the literal's text.
- Ledger rows it touches:
  - Row 366 (`Op❮+❯$RTTIc.factory()`): the three `ONLY` lines, not specific to either design, measured on its reproducer (`size-probes/s4-row366.out`). The gated `XXXOprParamRungS` has not been run.
  - Row 214 (rank overloading with a size inferred from a run-time array, measured on the interpreter): its compiled twin, `pNatDisp`, answers right under B (`size-probes.md` § 2.3).
  - Row 340 (a `typecase` body needing a coercion): `pNatCase` and `pTypeCase` have its shape; add them to its evidence. `pNatCase2` shows the type test itself works.
  - Row 307 (the checker's gap): closed by the first rung, with `keep-size-params.patch`, not by this decision.
  - Not touched: 23, 25, 57 (the interpreter's run-time-built arrays and `reflect`; their compiled twin waits on the array review's decision D), 83 (contested, no reproducer), 292 and 295 (the library's algebra and element bound).
  - To append, none of which has a row today:
    - the run-time kind (`3$RTTIc`);
    - the `extends`-clause refusal (`CodeGen.java:5793`);
    - value position (`pNatVec$s0`);
    - the size-generic dispatch arm (under A the catch-all, under B as `java.md` left it no sized arm compiles);
    - the first rung's return-type rule refusing a size-generic arm beside a less specific one;
    - the compile path's `extends Object` bound on a size parameter (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:77-86, 135-148`), which B's dispatcher skips;
    - a `ZZ32Vector` passed to a generic object's constructor failing at load (`perf-probes/nat/size-cost/VecCtorControl.fss`), a gap with no size in it.
    - The fourth gap as A's descriptor naming is appended only if A is chosen.
- The rule, as it would go into the rung's brief:

> A `nat` or `int` static argument is carried at run time as a descriptor, in the field, getter and factory argument the code generator already emits for it (`CodeGen.java:5316-5360`). A size's descriptor is an `RTTIsize` whose `className()` is the size's text as `NamingCzar.spkTagger` writes it and whose `runtimeSupertypeOf` answers true only for an equal size; its `hashCode` is its text's. One descriptor exists per distinct number, made on first use [by the loader as the class `<n>$RTTIc` holding it in `ONLY` | by a factory on `RTTIsize` from the literal, with `MethodInstantiater.rttiReference`, the `extends`-clause push and the dispatcher's literal leaf calling it instead of reading `<n>$RTTIc.ONLY`; Pavol's choice, § 12]. In an `extends` clause a size symbol pushes the parameter's field and a literal the number's descriptor (`size-probes/extends-b.patch`). In the overload dispatcher a size symbol in an arm's parameter type is read off the value's descriptor through its getter and handed to the closure loader as a type variable is, a literal compares descriptors, and a size parameter's `extends Object` bound is not checked (`size-probes/dispatch-b.patch`). A size read as a value compiles to `CONST.Nat⟦name⟧()`, which the loader replaces with an integer `LDC` of the instantiated text, followed by `IntLiteral.make(int)` (`runtime/value-position.patch`). `MethodInstantiater.rttiReference` takes the descriptor's `ONLY` when no descriptor-bearing argument is left (row 366). Arithmetic in a size, and `bool`, `dim` and `unit`, are out of scope. Tests, each seen failing first: `pNat1`, `pNatOver`, `NatExtends1`, `NatExtends2`, `NatGetter`, `pNatVec`, `pNatDisp`, `pNatDispTrait`, `pNatDispLit`, `pNatDispSize`, `pNatCase2` and `pNatCaseGen` as compiler tests with `run_out_equals`; `XXXNatArgRungS` promoted; `XXXOprParamRungS` promoted if it passes. Stop and return to Pavol if an arm whose size occurs in two parameters (`DOT`'s `m`) needs more than the second occurrence compared by equality, or if a number's descriptor needs anything but the literal's text.

## 10. The options, what each forecloses, what is unsettled

- **Design A, the operator path.**
  - Size, revised 2026-09-24 after the size probes: 28 code lines built (`design-a.patch`, 4 files); 7 built for the fourth gap (`fourth-gap-a.patch`, 2 files); about 70-90 not built for the size-generic dispatch arm (`size-probes.md` § 2.4). With value position (25) and the checker's 4, about 135-155 lines, of which about 80 unbuilt.
  - Runs `pNat1`-`pNatGenMeth`, `pNatOver`, `NatExtends2`, `pNatVec`, and with the fourth-gap piece `NatExtends1` and `NatGetter` (§ 2). Picks the catch-all for any dispatched size-generic arm.
  - Forecloses reading a size through the descriptor, so every reader of a size at run time reads a class name. It also puts numbers into the heavy-angle channel, so every reader of `❮❯` must accept them (`java.md` § 2).
  - Unsettled: the dispatch fix and its two design questions; the gate on `fourth-gap-a.patch`, which takes a branch the tree's comment calls a problem.
  - A's rule, as this brief first wrote it:

> A `nat` or `int` static argument is carried at run time as an `opr` argument is. `Naming.XlationData.isOpr` answers true for the kind `intnat`, so a size gets no descriptor object, no field, no getter and no factory argument; null is pushed in its place. Its text, as `NamingCzar.spkTagger` writes it, is appended to the descriptor's stem between heavy angles on the declaring side (`CodeGen.oprsFromStaticArgs`, `oprsFromKindParamList`, and the four `KindOp` tests at `CodeGen.java:5265, 5321, 5349, 5560`) and on the dispatch side (`OverloadSet.makeTypeStructure`). An `IntArg` in an `extends` clause is skipped as an `OpArg` is (`CodeGen.java:5784`). `MethodInstantiater.rttiReference` takes the descriptor's `ONLY` when no descriptor-bearing argument is left. A size read as a value compiles to `CONST.Nat⟦name⟧()`, which the loader replaces with an integer `LDC` of the instantiated text, followed by `IntLiteral.make(int)`; it is emitted only inside a template whose instantiation map binds the name. Arithmetic in a size, and `bool`, `dim` and `unit`, are out of scope. Tests, each seen failing first: `pNat1`, `pNatOver`, `NatExtends2`, `pNatVec` and `NatExtends1` as compiler tests with `run_out_equals`; `XXXNatArgRungS` promoted; `XXXOprParamRungS` promoted if it passes. Stop and return to Pavol if a dispatched arm generic in a size needs more than reading the size out of the value's descriptor class name, or if the fourth gap needs a change to what an instantiation map binds beyond the method's own template.

  - Revised 2026-09-24 after the size probes, that rule would now also need `fourth-gap-a.patch` (a class constant in a template instantiated like any type name, and the factory's annotated stem loaded through the substituting channel), and the dispatch fix, whose first stop condition the probes met.
- **Design B, a descriptor per size.**
  - Size, revised 2026-09-24 after the size probes: 17 lines built (`RTTIsize.java`); about 30 not built (the loader's emitter of holder classes); 14 built for the `extends` clause (`extends-b.patch`; first estimated at about 10); 29 built in the dispatcher (`dispatch-b.patch`). With value position (25) and the checker's 4, about 120 lines, of which about 30 unbuilt.
  - Runs every probe program right, given its holder classes: literal and size-generic dispatch, the `extends` clause, value position, the library-shaped getter (§ 2).
  - Forecloses nothing named. A size keeps its field, getter and object in the type argument's channel, so a later rule relating sizes other than by equality stays open (`runtime.md` § 2).
  - Unsettled:
    - the emitter is unwritten;
    - the descriptor's Java class is a placeholder (`java.md` § 3), which also makes every size hash alike (`size-cost.md` § 6);
    - sizes made at run time need the emitter for every number;
    - `DOT`'s shared size is unprobed;
    - row 366's three lines must be taken separately (they sit in `design-a.patch`, outside its flag).
- **A variant of B that nobody built**, derived from `MethodInstantiater.java:132-138`: `rttiReference` could build the size's descriptor with a factory call from the literal, interned in `RTTIsize`, instead of reading a holder class. The same change would go to the two other places that read `<n>$RTTIc.ONLY`, the `extends`-clause push and the dispatcher's literal leaf. That drops the emitter and the digit-named classes, and serves sizes made at run time directly. Revised 2026-09-24 after the size probes: now that the data's reading is B, this is worth one probe before the rung (§ 12). It is not built; by reading it is about 10-15 lines, against the emitter's 30.
- **Value position**: take it with the run-time kind (default: design-independent, measured) or as its own rung (one more gated rung for 25 lines).
- **The fourth gap**, revised 2026-09-24 after the size probes: probed. It is A's alone, 7 lines under A, nothing under B.

## 11. Recommendation

- As first written: design A with the value-position piece in one rung, after one shadow session had probed the fourth gap and a size-generic dispatch arm; B only if that arm needed more under A than reading a size out of a class name.
- Revised 2026-09-24 after the size probes, the data's reading:
  - The arm needs more under A: A answers wrongly as built, and its fix is about 70-90 lines with two design questions.
  - B answers right with 29 lines built.
  - The fourth gap costs A 7 lines that change every template's class constants, and costs B nothing.
  - A type test works under both.
  - At run time the two are equal within the machine's noise, in start-up, in a hot loop over a sized object, and in a dispatched call. Their class footprints differ by a few kilobytes. A loads fewer bytes up to about eleven sizes of one generic, and B loads fewer classes from six (`size-cost.md` § 2).
  - A keeps two advantages: a size in an `extends` clause for free (B needs 14 lines), and no new kind of class.
  - On this data, design B, with the value-position, `extends`-clause and dispatch pieces in one rung. Before that rung is briefed: the holder-class emitter against the factory variant, and `DOT`'s shared size, each one probe in the existing stack.
- The coordinator recommends design B.
- The worker's own reading, not a decision: B, for four reasons.
  1. The one run-time reader of a size off a value, the dispatcher, already works in descriptors, and B gives it one. A would need a second channel for strings through the dispatcher and the closure loader, or would end up building B's object inside A.
  2. B fills a slot the 2011 code already emits, and so has no fourth gap. A's fourth-gap fix switches on a branch the tree's own comment calls a problem, and no gate has run on it.
  3. The run-time cost Pavol worried about is not there. The same bytecode runs under both designs everywhere except the dispatcher and each stamped class's one-time initialiser, and at the dispatcher B costs what dispatch by class name costs.
  4. Sizes made at run time (`array[E](n)`) need a descriptor for an arbitrary number. B's factory variant, unbuilt, would make one directly; A would build new names for it.
  - Against B: the digit-named classes, unless the variant replaces them; 14 lines for `extends` clauses that A gets for free; and a few kilobytes more loaded, up to about eleven sizes of a generic.

## 12. Open questions, each with its cost

- Answered 2026-09-24 by the size probes (`size-probes.md`):
  - Does a dispatched overload arm generic in a size work under A by reading the class name, and under B through the getter? Under A no, it runs the catch-all, and the fix is not a class-name read. Under B yes, with 29 lines.
  - Which template must bind the size for the fourth gap? None was missing a binding. A's descriptor named its object class with the template's symbols; 7 lines under A, and B has no fourth gap.
  - Does a type test see the size? Yes, under both, as an `instanceof` on the stamped class.
  - What do B's classes cost at run time? Measured in `size-cost.md` ("Run-time cost, measured").
- Still open:
  - How is a number's descriptor made under B: the loader's emitter of holder classes (about 30 lines, `java.md` § 2) or a factory with none (§ 10's variant, about 10-15 lines by reading)? Cost: one probe on the existing stack, `size-probes/run.sh`, with the probe programs rerun. It decides the rule's bracket in § 9.
  - Does `DOT`'s shared size, one size in two parameters, dispatch right under B? The second occurrence goes through `runtimeSupertypeOf`, which `RTTIsize` answers by equality. Cost: one probe program with a `DOT`-shaped arm in the same stack.
  - Does `keep-size-params.patch` hold on the library and the five nat compiler tests? Cost: the first rung's own runs.
  - Which route makes a size from a run-time number on the compiled path (`array[E](size)`, `reflect`), and does it cost A or B more? Cost: waits on the array review's decision D; one probe once its compile-path `reflect` is chosen.
  - Does `XXXNatArgRungS` print `Vec[\3\]` under the chosen design, and how does the harness report an expected failure that starts to pass? Cost: none beyond the run-time rung's own test run.
  - Does the JIT remove any bounds check in a sized loop? Cost: a JIT log on `size-cost/SizedSum.fss`. It matters for the array rung, not for A against B, since both stamp the same bytecode.
  - Can B's descriptor sit on top of A later for the sizes that need one? Moot if B is chosen. If A is chosen, it is the dispatch fix's first design question.

## Citations that have moved

- FACTS:18 said whether sizes are baked into stamped classes was unprobed. It now carries a note, dated 2026-09-24, that they are (`pNatMeth$Box⟦3⟧`).
- The first version noted that FACTS cited `FortressLibrary.fsi:1460, 1578, 1652` for `Vector`, `Matrix`, `Array3` (now `:1465, 1583, 1657`), and that the walkthrough § 8 and ledger row 307 cited `CompilerLibrary.fss:512` for the empty `Matrix` (now `:638`). Revised 2026-09-24 after the size probes: FACTS ("The library's arrays and algebra") and the walkthrough now carry the current lines, and ledger row 307 no longer cites a line of that file.
- FACTS:35 and `runtime.md` § 1 read `pTypeCase` as "`typecase` is broken for every generic". FACTS:35 now carries the 2026-09-24 re-reading: the program has row 340's shape, which involves no generic, and `size-probes.md` § 4 measured the type test working.
- The walkthrough's § 6 cites `InstantiatingClassloader.java:1600-1622` for "the generic RTTI class holds one field per static parameter, all typed as type RTTI". Those lines are the loader's descriptor for function types. User generics get theirs from `CodeGen.java:5316-5360`, whose fields are declared at `InstantiatingClassloader.java:2591-2592`. The statement holds for both (§ 1).
