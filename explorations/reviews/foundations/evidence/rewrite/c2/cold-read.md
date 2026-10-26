# Cold read: foundations rewrite, c2

File read: `explorations/reviews/foundations/rewrite/c2/clean.txt` (seven positions: P-33, P-12, P-59, P-17, P-84, P-85, P-58).
Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and term look-ups in `references/compiler.md`, `interpreter.md`, `library.md`, `records.md`, `gate.md`, `build-and-caches.md`. Nothing else.

---

## P-33 "The work toward microGPT compiled follows the phases"

**Decided:** The road to a compiled microGPT is a fixed sequence of work phases, numbered 3 to 6 (two earlier phases came before; they are steps of the project, not compiler phases). Phase 3: the compiled checker reports zero errors over fourteen library components (the twelve of the "distance stage" plus `CovariantCollection` and `OneShotFlag`, which `List` imports). Phase 4 is the switch-over: first every `builtinPrimitive` native is made to run on the compiled path, then the compiled path moves onto the interpreter's library and the compiler's prelude is deleted. Phase 5: microGPT compiles (its static types, the array design, the code generator's open gaps). Phase 6: microGPT runs fast. Code-generator work may proceed in parallel with this order, on either library.

**Applies:** To planning and ordering all work toward the compiled path. Limits: Phase 3's zero is valid only when measured under `fortress compile`'s own settings, after that command bounds unbounded type parameters by `Any` (P-42; today it bounds by `Object`, compiler.md, row 412), and with the export check (a) reading top-level symbolic operators (row 782, P-155) and (b) requiring every `abstract` api member to be declared in the component (P-158; today it does not, library.md). Phase 4 needs two zeros over the fourteen: no checker error and no code-generator refusal (P-37). The code generator currently refuses 52 declarations the checker passes (F-34); this was not known when the order was approved. The other 40 library components (errors counted in F-290) do not block the switch-over; each must be cleared before walk starts running the checker (P-12), or before the first program that needs it.

**Requires:** A worker must not reorder the phases (e.g. must not start the switch-over before the phase-3 zero, or count a zero measured under another setting). A worker may do code-generator work at any time. Row 320 (an api implemented by a component of a different name does not link) is to be handled as part of the switch-over's design, not separately.

**Unfinished:** Climb batch 22c, which closes phase 3. Implicitly also all of phases 4 to 6, the `Any` bound, the two export-check changes (unless 22c contains them), the 52 code-generator refusals, and row 320.

**Could not resolve:**
- "the distance stage's twelve" (and the distance itself, F-53): not defined in the skill; I cannot name the twelve components or say what is measured. Missing concept (record term), not in the skill.
- "phases ... numbered 3 to 6, after two earlier ones": phases 1 and 2 are not named; I assume done. Unclear wording, minor.
- "a work plan in the team's implementation on the JVM (P-26 defines the layers)": "layer" and "the team's implementation" as a layer name are not defined in the skill. Readable two ways: the plan concerns the team's JVM implementation, or the decision is classed in an "implementation" layer of P-26. Missing concept.
- "the compiled checker is the first gate": the skill defines "gate" as the full pre-landing check of a tree. Here it seems to mean a milestone. Two readings; unclear wording.
- "the compile command's own setting": implies the count stage (or another measurement) runs under a different setting, but does not say which. Is the zero to be measured by `fortress compile` itself, or by the count stage configured like it? Unclear wording.
- "the export check reading the top-level symbolic operators": "reading" probably means "matching them between api and component", which it does not do today, but the entry does not say what is wrong now. Unclear wording, minor.
- "Phase 4 needs two zeros": as a precondition to start phase 4, or as the condition to finish it? Since phase 3 closes with the checker zero, I read that the code-generator zero must come before the switch-over completes. Unclear wording.
- "before the step at which walk runs the checker (P-12), or before the first program that needs it": I read "whichever comes first"; "needs it" probably means a compiled program importing it. Unclear wording, minor.
- "Row 320 ... is part of the switch-over's design": does this mean it must be fixed at the switch-over, or only that its design is decided there? Unclear wording.
- "Still to build: climb batch 22c": `gate.md` shows `climb-batch-` is a batch of work, but the entry does not say what 22c contains. Also, the list names only 22c, though phases 4 to 6 are clearly unbuilt. Unclear wording.

---

## P-12 "After the switch-over, walk runs the compiled type checker on its programs"

**Decided:** Once the switch-over is done, walk will run the compiled (Scala) checker on the programs it runs, and will then apply the static coercions the checker inserts instead of choosing coercions by run-time value. Reason: Fortress is statically typed and picks coercions by static type, but walk has no static types. `fortress typecheck` today checks only against the compiler's prelude, so it does not check walk's programs (F-9).

**Applies:** After the switch-over only. Before it, walk is not changed for this or for any other static-type matter.

**Requires:** Before the switch-over, a worker must not add static typing, checker runs or static-coercion handling to walk. After it, the step has three pieces: (1) turn the Scala checker on under walk (walk runs it switched off today; the Java checker no longer exists); (2) teach walk to evaluate the `CoercionInvocation` nodes the checker inserts (walk has no case for them); (3) clear the checker's errors in the components walk's programs import (F-290: 624 errors in the 40 library components outside the fourteen).

**Unfinished:** All three pieces. The size of the step is unmeasured.

**Could not resolve:**
- "the Java checker is gone (`StaticChecker.java`)": `compiler.md` cites `compiler/StaticChecker.java`, `checkCompilationUnit`, as the code that orders the checker's stages today, so the file exists. Is `StaticChecker.java` the deleted Java checker, a file that once held it, or the driver that now calls the Scala checker? Unclear wording; it reads as a contradiction with the skill.
- "the fourteen": defined in P-33, which this entry does not cite. Unclear wording when read alone.
- "the components that walk's programs import" against P-33's "each [of the 40] is cleared before the step at which walk runs the checker": is the third piece all 40 components or only the imported ones? Unclear wording.
- "any other matter of static types": the edge is unclear. Walk already instantiates reductions at a declared type (SKILL.md, "Static parameters"). Does a similar change count? Unclear wording, minor.

---

## P-59 "Walk chooses a coercion by the run-time value until it runs the checker"

**Decided:** The curator accepts as a limit of the interpreter that walk, having no static types, chooses a coercion by the value's run-time type, whereas the specification and the compiled path choose by static type. Walk stays this way until after the switch-over, when it runs the checker and uses the checker's coercions (P-12).

**Applies:** To walk only, until the switch-over plus the P-12 step. The limit is documented in a callout in `Specification/basic/conversions-coercions.tex` and in two expected-failure tests: `XXXCoercionStaticRungC` (the chapter's own example) and `XXXCoercionStaticNarrowRungC`.

**Requires:** Do not change walk's coercion choice before the switch-over. Keep the callout and the two `XXX` tests. When microGPT compiles, measure whether walk's choice and the static choice agree on microGPT.

**Unfinished:** The P-12 step. Also the measurement of the premise that microGPT's static types are concrete (each the type of the value, not a trait above it), so the two choices agree there. This premise is the coordinator's reading, not a measurement.

**Could not resolve:**
- "the coordinator's premise": "coordinator" is not defined in the skill, though CLAUDE.md mentions "the coordinating session". Readable. Minor missing term.
- "measure it when microGPT compiles": who measures it, and how? (e.g. compare walk's and the compiled run's results, or inspect the inserted coercions.) Unclear wording, minor.

---

## P-17 "Unboxed doubles and arrays of unboxed doubles are required"

**Decided:** The compiled path must represent doubles unboxed, and arrays of doubles as unboxed storage. Without this the revival fails its purpose. The language's intent supports it: value objects (numbers among them) may be copied freely (`Specification/basic/objects.tex`), and a `LinearSequence` of a value type describes unboxed values (`Specification/advanced-lib/binary.tex`). Today the code generator boxes every number (`RR64` is the class `FRR64`). In Java models of microGPT's three array kernels (dot product, matrix product, row lift), boxing is the main cost (F-11).

**Applies:** To the compiled path's representation of `RR64` values and `RR64` arrays. The array storage layout (`double[]`) is decided in P-84, not here. No timing is given here; P-84 and P-85 put the array store after the switch-over.

**Requires:** Treat unboxing as a requirement, not an optimisation to drop. Do not design or accept a final representation that boxes doubles.

**Unfinished:** All of it: the code generator emits no primitive `double` arithmetic (compiler.md); neither unboxed scalars nor `double[]` arrays exist.

**Could not resolve:**
- Scope: the title says "doubles", but the reason says "cannot box its numbers". Does the requirement cover other number types (`ZZ32`, `ZZ64`, `RR32`), or only `RR64`? Unclear wording.
- Whether walk is in scope: the entry speaks of the code generator only. I read it as compiled path only. Unclear wording, minor.
- Unboxed scalar doubles (outside arrays) have no deciding entry or timing named here, while arrays point to P-84. Unclear wording, minor.

---

## P-84 "An `RR64` array is stored as a Java `double[]`, unboxed"

**Decided:** On the compiled path, an `RR64` array is stored as a Java `double[]`. Arrays keep their sizes in their types as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them (it already checks `nat` static parameters, F-67). Storage and static sizes are one design. A layered plan, in which a first version of the store carried sizes only as run-time fields, was rejected. Both halves follow the library's own patterns (P-27).

**Applies:** To the compiled path's array design. The `double[]` store itself waits, with the other array decisions, until after the switch-over. That includes decision A (P-85): how an `RR64` array created through the library's generic array traits gets this store. Known limit: stamping alone gives no `double[]` field, because the class loader's class for an instantiation only renames the type parameter, so the element stays boxed (probe in `explorations/coordinator/array-design.md`, section 2). Going through the class loader would need a new mechanism (way A4 in `explorations/reviews/array-design-ways.md`), which is unbuilt and unmeasured. P-85 records the curator's lean toward it.

**Requires:** Do not build an interim array store with run-time-only sizes. Do not drop `nat` sizes from array types. Do not expect the class loader's existing instantiation to yield `double[]`. Do not start the `double[]` store before the switch-over.

**Unfinished:** The `double[]` store, decision A and its mechanism (A4 or another), and the code generator's support.

**Could not resolve:**
- "Stamping": not defined in the skill. The skill uses "stamp" only for the build's `implementation.stamp`, which is a different thing. From context I read it as the class loader making an instantiation's class from the template. Missing concept, with a misleading clash with the skill's term.
- "The sizes do not wait while a first version of the store carries them only as run-time fields": two readings. (a) Static sizes come together with the store, never after an interim version. (b) Static sizes are done now, ahead of the store. I take (a) from "that layered plan was rejected". Unclear wording.
- "Both halves follow the library's own patterns": for sizes the pattern is named (`Vector`, `Matrix`). For the `double[]` store, no library pattern is named. Unclear wording, minor.

---

## P-85 "The array design's three questions are open, with no default"

**Decided:** Three questions of the compiled path's array design are open, with no default answer. They return for decision after the switch-over, together with array decisions A, B and D. The questions: (1) does the array factory choose a store for each element type; (2) does the store also keep the size as a run-time field, besides the size in the type; (3) does a factory for a size known only at run time return the unsized `Array[\E,I\]`. Separately: A is how an `RR64` array made through the generic array traits gets `double[]` (P-84), B is where unboxed arithmetic happens, D is the sizes in microGPT's own types (P-87). For A, the curator leans toward the class loader, the team's own direction, unless a clear reason against it appears. This is a lean to confirm, not a decision, and that way is unmeasured.

**Applies:** To the array design. The decisions wait until after the switch-over. The preparation for the array work must be done before the switch-over; only the work itself waits.

**Requires:** Do not assume an answer to any of the three questions or to A, B or D. Do not treat the class-loader lean as decided. Do the preparation before the switch-over.

**Unfinished:** The answers to the three questions and to A, B and D; measurement of the class-loader way; the preparation.

**Could not resolve:**
- "the array factory": not defined in the skill (a library function that makes arrays? a code-generator routine?). Missing concept.
- "decisions A, B and D": no decision C is mentioned. Was it decided, merged or dropped? Unclear wording.
- "The whole preparation for the array work": what counts as preparation (probes, measurements, design write-ups, answering the three questions?) and what counts as "the work itself" is not said. This seems to pull against the title's "return after the switch-over". Must the questions be prepared, though not decided, before it? Unclear wording.
- "B is where unboxed arithmetic happens": "where" could mean which layer (code generator, library, natives) or where in the program. It is open, so this matters little. Unclear wording, minor.

---

## P-58 "Every native binding is a `builtinPrimitive` call naming a static helper"

**Decided:** Native bindings keep the library's own form: a body that is exactly `builtinPrimitive("…")`. The string will name a static Java method in `nativeHelpers/` (e.g. `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`) instead of a walk glue class, which the compiled path cannot use (F-32). Walk will load the named helper through a new loader beside its glue-class loading. The compiled path will rewrite each such body, at the parse and before the checker, into a synthetic `import java` of the helper plus a call, and refuse a string that names no helper. The alternative, writing `import java` declarations in the library by hand, is rejected. Ground: the language has no foreign-function interface (only proposed, `Specification/appendices/future.tex`). So this is a Java-interoperability matter, decided by the library's own practice (P-27), and every binding today is a `builtinPrimitive` call. The specification's printing of `builtinPrimitive` in the included library api is not a ground.

**Applies:** To every native binding of the interpreter's library. Bindings move onto helpers one step at a time, not all at once at the switch-over. From the step that moves a binding, the compiled checker checks that binding against the helper's Java signature. The choice is cheap to undo only until bindings start moving; after that, switching to the other form costs a sweep of the library.

**Requires:** Write native bindings only as `builtinPrimitive("<nativeHelpers static method>")`. Do not add `import java` declarations to the library for natives. Build the walk-side helper loader and the compiled-side parse rewrite with its refusal. Make the checker check each moved binding against its helper's signature.

**Unfinished:** Everything: every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`. Still to build: the helper loader in walk, the rewrite and the refusal on the compiled path, the signature check, and the move of each binding.

**Could not resolve:**
- "At the parse, before the checker": inside the parse phase itself, or at any point between parse and the checker (e.g. in a desugaring before TYPECHECK)? Unclear wording, minor.
- "refuse a string that names no helper": during the step-by-step move, unmoved bindings still name glue classes. Does the compiled path refuse those at once (so it cannot compile the library until all have moved), or only once the rewrite applies to them? I read the former, consistent with the switch-over waiting for the natives. Unclear wording, minor.
- How walk passes its boxed evaluator values to a helper that takes plain Java values (interpreter.md, "Natives") is not said. This is a design gap, not a wording fault.
