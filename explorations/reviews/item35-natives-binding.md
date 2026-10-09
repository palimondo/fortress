<!-- PLAN item 35 written up as one question for the curator, in the nine-step form of `coordinator/CLIMB-BATCH-12.md` section 2 (Q48 to Q50). Written 2026-10-09 by an Opus writer for the coordinating session, reading only, against `main` at `510e80b8f`. Sources: `perf-probes/prelude/natives-shape.md` and its files at `4a46fb83a` (they left the tree in `fc89ee7a5`); FACTS, the first entry under "The checker and the one library" and the `import java` entry under "The territory map"; PLAN item 35 (`:289`) and phase 4's natives line (`:128`); POSITIONS, the entries named in the text; `perf-probes/prelude/REPORT.md` section 3; the specification, searched for `import java`, `native` and `builtinPrimitive`; the code at the cited lines; `git log` for the commits. Nothing was built, run or measured. Committed by the coordinator after climb batch 13 landed; put to the curator in chat at about 22:55 UTC. -->

# Item 35: one text for the natives

## For Pavol

**The question.** After the switch-over (the day the compiled path starts reading the interpreter's library and the compiler's own small library is deleted), both paths must read one text for each native binding. A native binding is a library declaration whose body is Java code. About 350 need a new text. Which form?

1. **The library's own form, `builtinPrimitive("…")`.** Its string names an interpreter class today; it would name a static Java helper, the kind the compiled path calls. Walk needs a 72-line loader, measured. The compiled path needs a rewrite of these bodies into calls: not measured, one to two rungs by reading. Only strings change.
2. **The compiler library's form, `import java` blocks and ordinary calls.** Measured on both paths; walk needs six small Java patches. Every body changes, and each native file gains import blocks.

Both need the same new helpers, the same writer type for `println` and the same renaming on the switch-over day.

**Why 1.**
- The library binds all 424 natives this way.
- The specification prints `builtinPrimitive`'s declaration and has no `import java`.
- Under 1 the type checker reads today's text until the switch-over, so the distance cannot move from this work. Under 2 it reads the new calls from the second rung on, unmeasured.

**Default: 1.** A yes starts rung N0: walk's loader for helper strings, and the helpers' overflow errors turned into walk's, test first. Beside it, a worker tries the compiled rewrite on a throwaway copy. If that fails, the question comes back to you before any string changes; only the loader is lost. The other eight rungs follow in about two batches, beside phase 3.

**A no** (way 2) puts the six patches in N0 instead.

## The question in full

### Q35. Item 35: which construct is the one binding text of the natives, `builtinPrimitive("…")` naming a static helper, or `import java`?

- **Blocks:**
  - Rung N0, the first of phase 4's nine natives rungs: its Java differs by the answer.
  - The form of every binding edit in N1 to N4, about 350 bindings.
  - No site of the distance: the natives are not checker errors. It does not hold phase 3; it holds the start of the natives work beside it.

- **On file:**
  - PLAN item 35 (`coordinator/PLAN.md:289`) and phase 4's natives line (`:128`).
  - The probe, `perf-probes/prelude/natives-shape.md` (approved as R5, run 2026-09-29 at `f55fd68e2`): section 1, both forms run on walk in shadows; section 2, the count; section 3, the nine rungs; section 4, this fork. Its programs, patches and captures left the tree in `fc89ee7a5`; they are read at `4a46fb83a`, under `explorations/perf-probes/prelude/natives-shape/`.
  - FACTS, "The checker and the one library", first entry (the count); "The territory map", the `import java` entry (the five gaps and the loader).
  - `perf-probes/prelude/REPORT.md` section 3: the compiled path does not know `builtinPrimitive`.
  - No top-tier judgement, and the probe recommends neither. The question touches the library, both paths and an api comment the specification prints, so the coordinator may run a Fable judgement without asking (POSITIONS, "The Fable rule."). This write-up can be its list of ways.
  - No probe of way 1's compiled half.
  - The counts are the note's recount on `main` at `e455ccd98`: 424 live; A 147, B 61, C 138, D 78. So 346 bindings change text under either way. The note's 347 and 139 are its first count, before rung V removed one `RR32` binding; FACTS and PLAN print 139 beside 424, one too many. Since then `9d2e4c856` added five `IntLiteral` conversion bindings to `FortressBuiltin.fss`. Not recounted here; "about 350" below.

- **Terms.**
  - **Walk**: the interpreter. **The compiled path**: `fortress compile` and `run`, bytecode on the JVM.
  - **The one library**: the interpreter's library (`FortressLibrary`, `FortressBuiltin` and what they import). The compiled path reads it after the switch-over.
  - **The compiler prelude**: the compiler's own small library (`CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`), deleted at the switch-over.
  - **Native binding**: a declaration whose body is Java code.
  - **Glue class**: walk's kind of Java code, a class over walk's boxed values. 386 of them, 7K lines.
  - **Helper**: a static Java method over plain Java values (`int`, `double`, `String`) in `nativeHelpers/`. The compiled path's kind. 369 in 25 classes.
  - **`builtinPrimitive("…")`**: a body that is exactly a call of `builtinPrimitive` on a string. Walk spots that shape and runs the Java the string names.
  - **`import java pkg.{Class.method => alias}`**: imports a static Java method as a Fortress function called `alias`. A body then calls it like any function.
  - **The classes of the count**: A, the compiler prelude already binds the same operation (147); B, a helper exists but nothing binds it (61); C, a helper must be written (138); D, other: 36 methods of I/O objects and 42 with no compiled counterpart.
  - **Shadow**: changed copies of tree classes put first on the classpath, never committed. **Rung**: one edit and its failing test under the full gate, median 54 minutes. **The distance**: the compiled checker's error count over the one library, phase 3's measure, reported at every gate and never red.

- **Design.**
  - A native binding joins three things: the Fortress declaration (name and types), the Java code, and the conversion of values at the border. One text for both paths must fix the first two. Each path does its own conversion.
  - In way 1 the Java name is data inside the body. The declaration is the only type the checker sees. The team's comment says so: "all the necessary type information, argument names, etc. must be declared here in Fortress-land" (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`). Whether the Java method fits is found when a path loads it: walk when it loads the declaration, the compiled path when the rewrite compiles it.
  - In way 2 the Java name is imported as a function. Its Fortress type is made from the Java signature through a table of type names (`compiler/NamingCzar.java:436-465`). The body is an ordinary call, which the checker checks: a gain. The table must name the one library's types; that happens on the switch-over day (N5), with a stand-in before it.
  - By reading, both end in the same compiled call: way 1's rewrite goes through way 2's machinery. So microGPT's compiled speed does not depend on the answer. Walk calls the helper by reflection under both, and walk's speed counts for nothing (POSITIONS, "Interpreter performance is irrelevant.").

- **Today.**
  - Walk reads only `builtinPrimitive`. When it builds a function it checks whether the body is exactly `builtinPrimitive` of a string, and loads that class (`interpreter/evaluator/values/FunctionClosure.java:47`, `:52`; `interpreter/glue/NativeApp.java:164-215`).
  - The compiled path reads only `import java`. The prelude's 366 native bodies call aliases from 17 import blocks (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:13-345`), as `opr <(self, other:ZZ32): Boolean = jIntLT(self,other)` (`:709`). It does not know `builtinPrimitive`; given a body, it runs that body and the string is inert (`REPORT.md` section 3).
  - `import java` on walk is wired and unfinished ("TODO temp hack till we knit in natives properly", `interpreter/Driver.java:471`). No test uses it; five gaps stop it (FACTS).
  - The checker reads the one library's `builtinPrimitive` bodies as calls of a generic function, and accepts them, the last thirteen since batch 11 (row 560). The gate's distance stage runs it in walk's world (`tools/distance/DistanceMulti.java:44`) over twelve components, five of them native files: `FortressLibrary`, `FortressBuiltin`, `NativeArray`, `FlatString`, `Writer` (`tools/distance/run.sh:83-85`).
  - In the probe's shadows, way 2 printed what the compiled path prints for top-level functions, a trait's functional method, an object's method and an overflow raise. Way 1 printed the same for two top-level functions; methods, where most bindings sit, were not run under it. The interpreter suite stayed green under each.

- **The specification.**
  - A `native` component is the specification's one place for code outside the language: "Within an unsafe component, the syntax and semantics are implementation dependent. However, an unsafe component can export an API, which can be imported by safe components and APIs as usual." (`Specification/basic/components/source-code.tex:125-127`, `:499-504`). `FortressBuiltin`, `FlatString`, `Writer`, `File`, `Reader`, `Reflect` and `NativeArray` are native components. `FortressLibrary` and `System` are not (`Library/FortressLibrary.fss:12`, `Library/System.fss:12`).
  - Its import grammar has no foreign language (`source-code.tex:64-67`, section "Import Statements" at `:139`). `import java` is the parser's own (`parser/Compilation.rats:203-235`). A foreign function interface is listed as future work (`appendices/future.tex:693-697`). The team's unfinished restart planned an appendix on a "Foreign function interface (esp. with respect to Java)" and never wrote it (`Documentation/Specification/Prose/Appendices/appendices.tick:20`).
  - The library part prints `FortressBuiltin`'s api: `builtinPrimitive[\T\](javaClass: String): T` and its comment that the string names an interpreter class (`library/default-libraries.tex:29-39`, typeset from `FortressBuiltin.fsi` by `fortress/build.xml:129-139`; section 29.2.1, page 338 of `fortress.pdf`). Every component sees that api (`default-libraries.tex:32-35`).
  - Appendix I names `builtinPrimitive` once, for its result-only type parameter (`appendices/changes.tex:2086`).

- **The library's own way.**
  - All 424 bindings of the one library are `builtinPrimitive("…")`, in native and ordinary components alike.
  - Its native components also name their Java package for their native objects (`private language="java"`, `private package=…`, `FortressBuiltin.fss:15-16`; walk reads it at `interpreter/evaluator/BuildNativeEnvironment.java:46`). Neither way changes that.
  - The team tested `builtinPrimitive` on walk, its errors included (`ProjectFortress/tests/nativeTestFn.fss`, `testPrim.fss`, `XXXnoclassNativeFn.fss`, `XXXarityTestFn.fss`).
  - `import java` is the compiler prelude's way (`CompilerBuiltin.fss`, `Library/CompilerLibrary.fss`, `Library/CompilerSystem.fss`) and the compiled tests' (3 files in `compiler_tests/`, 25 in `other_compiler_tests/`, 3 in `library_tests/`).

- **The peers.** No survey is on file. By reading:
  - Julia's Base writes C calls inside method bodies, `ccall((:name, lib), …)`, and its arithmetic as compiler intrinsics called in bodies: the foreign name as data in the body, as way 1.
  - Java's `native` methods keep the type in the declaration and the code elsewhere, found by name when the class loads, as way 1.
  - GHC's `base` declares each C function once, `foreign import ccall "name" f :: …`, and calls it like any function, as way 2.
  - Scala on the JVM imports Java classes and calls their static methods as ordinary functions, checked against the Java signature, as way 2.
  - Both shapes are common.

- **The commits.**
  - The team. Walk's recognizer is in `NativeApp.java` from the oldest commit of its history here (`72ae6881b`, 2007-01-04). `import java`: the syntax tree's field (`ce07a4456`, 2008-11-24, David Chase), the parser (`8cda3b92d`, `6c3d51ecb`, Nov to Dec 2008, Sukyoung Ryu), the foreign api generation (`a960aa92e` to `26d448ec9`, Dec 2008 to Jan 2009, Chase). The compiler prelude began at `c8d301411` (2008-12-19, jmaessen, "stripped-down minimalist fortress library for first crack at compilation"). Walk's half was begun and left in Feb 2009 (`9882023e4`, `0ae300abd`, Chase, "interpreter-native glue (not working yet)"). Helpers were still added in 2011 (`36e6a744a`, Guy Steele).
  - So the team built `import java` for the compiler and began reading it on walk. They never moved the library's bindings off `builtinPrimitive`. Nothing says which they meant to keep.
  - The revival. The probe: `a9398b288`, `4a46fb83a`, merged at `55a75a9bf` (2026-09-29). Walk's integer natives raise `IntegerOverflow` since rung O (`917bb7b32`); N0's raise translation must keep that. The checker accepts `builtinPrimitive`'s result-only calls since batch 11's rung E (`27cb9e93b`, row 560). Five bindings added by `9d2e4c856`.

- **The derivation.**
  - The library route makes the interpreter's library the one library. The compiler prelude is a bootstrap that goes at the switch-over (POSITIONS, "The library route."; "The compiler prelude's leftovers go at the switch-over.").
  - "The library's own practice is the standard" names way 1 first: every binding of the one library is `builtinPrimitive`; `import java` blocks are the prelude's spelling. The `import java` machinery stays as the compiled path's foreign interface under either way.
  - "The specification stays the standard": it prints `builtinPrimitive`'s declaration among the builtins every component sees, and it has no `import java`. Way 1 revises one printed comment. Way 2 puts a form the grammar lacks into two ordinary components. For way 2: the designers did plan to specify a Java interface, and `import java` is the one general interface they built.
  - "Interpreter performance is irrelevant": walk's reflective call weighs nothing, and the compiled call is the same under both, by reading.
  - "Forks are probed before a batch is briefed": way 1's compiled half is the one unmeasured cost. A probe on a shadow can settle it before N1 lands any string.
  - It touches the library, both paths and a printed comment, so it reaches you (POSITIONS, "Which decisions taken inside the work reach Pavol, and how.").
  - What is left to weigh: the library's practice and the specification, against measurement on both paths and a binding the checker checks.

- **The ways.**
  1. **`builtinPrimitive("…")` stays every binding's body; its string names a static helper.**
     - The library: about 350 strings change, as `"com.sun.fortress.interpreter.glue.prim.Int$Less"` to `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`. No imports.
     - Walk, N0: the loader (a fallback in `NativeApp.java:196` and a new `interpreter/glue/StaticNativeApp.java`, 72 lines), the value conversions from gap 4's patch (`interpreter/glue/ForeignNativeApp.java`), and gap 5's raise translation (+13). No stand-in table to remove later. Measured on two top-level functions; methods and the raise under the loader by reading.
     - The compiled path: a front-end rewrite of each such body into a call through the `import java` machinery, `self` first for a method. Not measured; one to two rungs by reading. It must land by N5. Until it lands, the checker reads the strings as data, so the natives rungs leave the distance alone. Where it sits in the compiler decides whether the gate's checker stages see it; the probe settles that too.
     - The specification: `builtinPrimitive`'s comment (`FortressBuiltin.fsi:14-29`, printed in section 29.2.1) is revised in the S1 form to say the string may name a static helper both paths call, with an Appendix I entry.
     - Limits: the body must be exactly the call. So the 21 bindings whose parameters are not Java values (such as `AnyIntegral`, `Type`, `Any` or a function; B 10, C 11) each need a second, private declaration that converts first; under way 2 the body converts inline. The checker never sees the string; a wrong one stops walk when it loads the declaration, which every suite test does, and the compiled path at compile time. A string names a method by class and name and the loader picks by arity, so the six overloaded names in `simplePrintln` and two in `simpleIntVector` need a rule: distinct names for new helpers, or parameter types in the string. N0 decides.
     - Cost: N0 one rung, the rewrite one to two more (10 to 11 rungs in all), and the probe, one worker session with no gate.
  2. **`import java` blocks and ordinary calls, as `CompilerBuiltin.fss` writes its natives.**
     - The library: about 350 bodies become calls of aliases, as `opr <(self, other: ZZ32): Boolean = jIntLT(self, other)`. Each native file gains import blocks (the prelude has 17 for 366 bodies), `FortressLibrary.fss` and `System.fss` among them, which are ordinary components (about 126 bindings). A body can convert inline before the call.
     - Walk, N0: six patches, +120 −20 lines in six files: the type table names the one library's types (a stand-in until N5, `NamingCzar.java`); a second import from one package (`Driver.java`); the imported name's scope (`interpreter/rewrite/DesugarerVisitor.java`); the call by reflection (`interpreter/env/ClosureMaker.java`, new `ForeignNativeApp.java`) and its parameter types (`ForeignComponentWrapper.java`, `Driver.java`); the helpers' raise. All measured.
     - The compiled path: nothing new; it reads `import java` today.
     - The checker: every binding is checked against the helper's Java signature. From N1 on, the distance stage reads these calls in five of its twelve components, through the stand-in table. Whether it accepts them is not measured: the probe ran walk, which runs no checker, and the compiled path in the compiler's own world. The distance is never red, so this would not block, but phase 3 would read noise from the natives work.
     - The specification: no printed text changes. The library's text gains a form the grammar does not have, in ordinary components: a gap the specification would have to record (POSITIONS, "Every change to the specification is recorded with its reason.").
     - Cost: nine rungs; N0 one rung.
  3. **Neither: the record's earlier shape, one api with a builtin component per path.** It needs row 320's linker step (`linker/Linker.java:72-76`), and it does not reach the 125 bindings inside `FortressLibrary.fss` nor those of `FlatString`, `Writer` and `NativeArray`. Not recommended.

- **Recommendation:** way 1, with a probe of its compiled half on a shadow, run beside N0 and finished before N1 lands any string. Reasons: the library's own form; the specification's text; and the distance left alone until the switch-over, which is what lets the natives run cleanly beside phase 3. Its costs: one to two rungs more, 21 two-part bindings, and no checker check on the string.

- **Default:** way 1, as recommended. None was on record before this write-up.
  - **What a yes starts.** N0: walk's loader, the conversions and the raise translation, with the probe programs as interpreter tests seen failing first. It touches walk's `interpreter/glue/` and new tests only. N0 goes alone or as one rung of a phase-3 batch, since every later natives rung needs its loader and a rung cannot build on another rung of its own batch (PLAN, "The principle for the batches"). Beside it, the probe of the compiled rewrite: a worker on a shadow, nothing landed. Then N1 to N4 in about two batches, each gated by the interpreter suite, with the compiled `^` and `CHOOSE` repairs (rows 521, 523 to 525) riding along as PLAN's phase 4 line says. The rewrite lands by N5.
  - **What the yes commits you to.** About 350 library strings that only this loader and the rewrite read, and one revised comment in the printed api.
  - **If the probe fails,** or finds the rewrite costs more than two rungs, item 35 comes back to you before N1, with way 2 already measured. Only N0's loader is lost. Each string names exactly what one import line would name, so strings already landed would convert mechanically.
  - **What a no costs.** Under way 2, N0 builds the six patches instead, and the distance stage meets the new calls from N1 on.
