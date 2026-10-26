# Cold read 2: c2/clean.txt

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the skill's `references/` (not `revival-changes.md`, not `sources.md`). Seven position entries: P-33, P-12, P-59, P-17, P-84, P-85, P-58.

## P-33: the phases toward microGPT compiled

**Decided:** The work toward a compiled microGPT goes through work phases 3 to 6 in a fixed order that the curator approved (these are stages of the project, not compiler phases; phases 1 and 2 came earlier and are done). Phase 3: the compiled checker reports zero errors and zero crashes over fourteen library components (the twelve that the distance stage covers, plus `CovariantCollection` and `OneShotFlag`, which `List` imports). Phase 4, the switch-over: first make the library's `builtinPrimitive` natives run on the compiled path, then move the compiled path onto the interpreter's library and delete the compiler's prelude. Phase 5: microGPT compiles (its static types, the array design, the code generator's open gaps). Phase 6: microGPT runs fast. The order rests on how the team's JVM implementation is built: checker first, then code generation and run time, and the natives gate the switch-over.

**Applies:** To planning and sequencing all work toward the compiled microGPT. Phase 3's zero counts only under three conditions: the distance stage runs under the same setting as `fortress compile` (F-289), after `fortress compile` bounds unbounded type parameters by `Any` rather than `Object` (P-42; `compiler.md` "Traps" says it uses `Object` today); the export check compares top-level symbolic operators (it skips them today, row 782, P-155); and the export check requires each api member written `abstract` to be declared in the component (P-158; `library.md` says it does not today). Limits: the 38 other library components do not block the switch-over; code-generator work may go on in parallel with the order, on either library (P-37).

**Requires:** A worker must not count phase 3 as done on a zero measured under another setting, or before the three conditions hold. The switch-over needs two zeros over the fourteen: the checker's (phase 3) and the code generator's (phase 4). Each of the 38 other components must be cleared of checker errors before the step at which walk runs the checker (P-12), or before the first program that needs it, whichever comes first. Row 320 (an api implemented by a component of another name does not link) must be dealt with inside the switch-over's design.

**Unfinished:** Climb batch 22c, which closes phase 3 with four rungs: the `Any` bound, the symbolic-operator export check, the `abstract`-member export check, and clearing `List`'s two imports. Then all of phases 4 to 6, including bringing the code generator's refusals over the fourteen to zero (it refuses 52 declarations today, F-34).

**Could not resolve:**
- "the distance stage", "the distance" (F-53): not defined in the skill. I take it to be a script that measures how far the tree is from the switch-over, but the skill does not name it, and the entry does not list the twelve components. Missing concept (record tool), not wording.
- "under the setting of `fortress compile` itself (F-289)": unclear wording. "Setting" could be the library choice and desugaring switches that `compiler.md` says each command sets, or only the type-parameter bound. The entry also does not say whether this change is one of the four rungs of batch 22c (the rungs list "the bound" but not the setting).
- "P-26 defines the layers": the layers are not in the skill. Missing concept; the sentence still reads without it.
- "the code generator's, which phase 4 brings": unclear wording. Phase 4 is listed as two steps (natives, then the library move), and the code generator's zero is not among them, yet the switch-over (phase 4) needs it. I cannot tell whether clearing the code generator is a third step of phase 4 that comes before the library move, or work that runs "beside that order" (P-37) and has to be finished by then.
- "it now refuses 52 declarations of the twelve that the checker passes": two readings. Either 52 declarations in the twelve components, counting only declarations the checker passes, or 52 declarations in "the twelve [components] that the checker passes". It also counts over twelve, while the zero is required over fourteen, so the count for the other two is not given.
- "Row 320 ... is part of the switch-over's design": unclear whether row 320 must be fixed during phase 4, or only taken into account when the switch-over is designed.
- "before the first program that needs it": "needs" probably means imports, but the entry does not say on which path (a compiled program, or walk once it runs the checker).
- "climb batch", "rung": record jargon. The skill uses `climb-batch-N` folder names and `rung-` folder names but defines neither. From context: a batch of agent work, and one unit of work in it. Missing concept, guessable.
- A tension with the skill: `SKILL.md` says "The compiled checker already finds no error in the interpreter's library", while this entry (and P-12, F-290) counts checker errors in library components. I reconcile them only through `compiler.md`'s note that the count stage covers just `FortressLibrary` and the apis it imports. The entry does not help a worker see this.

## P-12: walk runs the compiled checker after the switch-over

**Decided:** After the switch-over, walk will run the compiled (Scala) type checker on the programs it runs, gain their static types, and use the static coercions the checker inserts in place of choosing a coercion by run-time value. Reason: Fortress is statically typed and chooses coercions by static type; walk has no static types. The curator wants the checker usable on walk's programs. Today `fortress typecheck` checks only against the compiler's prelude, so it is no check of a walk program (F-9).

**Applies:** Only after the switch-over. Until walk runs the checker, walk is not changed for this, or for anything else that needs the static types the checker infers. The size of the step is unmeasured.

**Requires:** Do not change walk to use static types before this step. Do not treat `fortress typecheck` as a check of a walk program. The components that walk's programs import must be cleared of checker errors, each before this step or before the first program that needs it (P-33 places them).

**Unfinished:** All three pieces: (1) turn the Scala checker on under walk (walk runs with Scala off, and with Scala off `StaticChecker.java` stops with "The Java version of the type checker is gone now."); (2) teach walk to evaluate `CoercionInvocation` nodes, which it has no case for today; (3) clear checker errors from the components walk's programs import (624 errors in the 40 components outside the twelve, F-290).

**Could not resolve:**
- "After it, walk runs the checker": "it" means the switch-over, but the entry does not say whether this step comes straight after the switch-over or at some later point in phases 5 and 6. P-33 says only that components are cleared "before the step at which walk runs the checker". Unclear wording about timing.
- "with Scala off": the skill does not name this setting or its switch. Readable as "the Scala type checker is disabled", but a worker would not know where the switch lives. Missing detail, not ambiguity.
- "the twelve" is used without saying which twelve (see P-33, F-53).

## P-59: walk chooses a coercion by run-time value until it runs the checker

**Decided:** The curator accepts as a limit of the interpreter that walk chooses a coercion by the value's run-time type, where the specification and the compiled path choose it by static type. Walk is not changed for this before the switch-over.

**Applies:** To walk, until it runs the checker after the switch-over (P-12). After that, walk uses the checker's static coercions.

**Requires:** Do not change walk's coercion choice before then. The limit is already stated in a callout in `Specification/basic/conversions-coercions.tex` and recorded by two expected-failure tests, `XXXCoercionStaticRungC` (the chapter's own printed example) and `XXXCoercionStaticNarrowRungC`; keep them as they are. When microGPT compiles, measure the coordinator's premise.

**Unfinished:** The P-12 step. A measurement of the premise, which so far has been reasoned from reading and not measured: that microGPT's static types are concrete (each is the value's own type, not a trait above it), so walk's choice and the static choice agree on microGPT.

**Could not resolve:** Nothing blocking. "The coordinator" is not defined in the fortress-repo skill, but `CLAUDE.md` names the coordinating session, so I read it as that session. "Read and not measured" means reasoned from reading the code, not run.

## P-17: unboxed doubles and arrays of them are required

**Decided:** Unboxed doubles, and arrays of unboxed doubles, are required; without them the revival misses its point. The curator's reason is that a high-performance language cannot box its numbers. The language's grounds: an implementation may freely copy value objects, which include floating-point numbers and integers (`objects.tex`), and a `LinearSequence` of a value type "describes a sequence of 'unboxed' values" (`binary.tex`).

**Applies:** To the compiled path's code generator, which today boxes every number (`RR64` is the class `FRR64`). Limit: how arrays store doubles (`double[]`) is P-84's decision.

**Requires:** A worker must not accept a design that leaves `RR64` values or `RR64` arrays boxed on the compiled path as a final state.

**Unfinished:** Unboxing itself: the code generator emits no primitive `double` arithmetic today (`compiler.md`). Evidence of the cost: in Java models of microGPT's three array kernels (dot product, matrix product, row lift), boxing is the main cost (F-11).

**Could not resolve:**
- Scope: the entry requires unboxed *doubles*, but its language ground also names integers. I cannot tell whether unboxed `ZZ32`/`ZZ64` are required too, or only `RR64`. Unclear wording.
- Timing: the entry gives no phase for scalar unboxing. P-85 lists "where unboxed arithmetic happens" as open decision B, so I infer that scalar unboxing also waits until after the switch-over, but this entry does not say so.
- "P-26 defines the layers": the layers are not in the skill (as in P-33).

## P-84: `RR64` arrays as `double[]`, with `nat` sizes in the types

**Decided:** An `RR64` array is stored unboxed as a Java `double[]`. Arrays keep the team's `nat` sizes in their types as static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them (it already checks `nat` static parameters, F-67). Storage and sizes are one design. The layered plan, in which a first version of the store carries sizes only as run-time fields, was rejected. Both halves follow the library's own patterns (P-27).

**Applies:** To the compiled path's arrays. The `double[]` store waits, with the other array decisions, until after the switch-over. One of those is decision A (P-85): how an `RR64` array made through the library's generic array traits gets this store.

**Requires:** Do not build a store whose sizes live only in run-time fields. Do not expect stamping (the class loader's instantiation of a generic class) to give a `double[]` field: the class it makes only renames the type parameter, so the element stays a boxed object (probe in `explorations/coordinator/array-design.md`, section 2).

**Unfinished:** The `double[]` store; decision A. A route through the class loader needs new work in both the loader and the code generator: way A4 of `explorations/reviews/array-design-ways.md`. Nobody has built or measured it yet; the curator leans toward it (P-85).

**Could not resolve:**
- "The sizes do not wait while a first version of the store carries them only as run-time fields": two readings. (a) Sizes are not put off to a later version: they come in the types at the same time as the store (this fits "one design"). (b) Sizes in types go ahead now, before the switch-over, while the store waits. I take (a), but the wording allows (b).
- "Stamping (P-26)": not a term in the skill. The skill's only "stamp" is the build's `implementation.stamp` (`build-and-caches.md`), which does not fit. From the rest of the sentence, it means the class loader making an instantiation's class from a template (`SKILL.md`, "The compiled run time"). Missing concept, inferred.

## P-85: the array design's three questions are open

**Decided:** Three array-design questions are open, with no default, and come back after the switch-over together with array decisions A, B and D. The questions: (1) does the array factory choose a store for each element type; (2) does the store also keep the size as a field, beside the size in the type; (3) does a factory for a size known only at run time return the unsized `Array[\E,I\]`. These are separate from decisions A (how an `RR64` array made through the generic array traits gets `double[]`, P-84), B (where unboxed arithmetic happens) and D (sizes in the model program's own types, P-87). On A, the curator leans toward the class loader, the team's own direction, unless a clear reason appears. This is a lean to confirm, not a decision, and that way is unmeasured.

**Applies:** After the switch-over for the questions and the decisions. All preparation for the array work happens before the switch-over; only the work itself waits.

**Requires:** Do not assume an answer or a default for any of the three questions, or treat the class-loader lean as decided. Do the preparation before the switch-over.

**Unfinished:** The answers to the three questions; decisions A, B, D; a measurement of the class-loader way; the preparation.

**Could not resolve:**
- "The whole preparation for the array work": not defined. The questions themselves "return after the switch-over", so preparation is not answering them. It might mean studies, prototypes or measurements such as measuring way A4, but the entry does not say. Unclear wording, and it is the entry's only before-the-switch-over requirement.
- Decisions "A, B and D": no C is named. A reader cannot tell whether C was settled, dropped, or merged. Minor, unclear wording.
- "the array factory": not defined in the skill. I read it as the library function that makes an array of a given element type and size. Missing concept, guessable.
- "B is where unboxed arithmetic happens": "where" could mean which layer (code generator, library, natives) or which program sites. Unclear wording, but it names an open decision, so it does not block.

## P-58: every native binding is a `builtinPrimitive` call naming a static helper

**Decided:** Every native binding keeps the library's own form, a body that is exactly `builtinPrimitive("…")`. Its string is to name a static Java method in `nativeHelpers/` (for example `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`) and no longer a walk glue class, which the compiled path cannot use (F-32). Walk loads the named helper through a new loader beside its glue classes. On the compiled path, at the parse and before the checker, each such body is rewritten into a synthetic `import java` of the helper plus a call, and a string that names no helper is refused. The other form, `import java` declarations written in the library itself, is not taken. Ground: the language has no foreign-function interface (it appears only among proposed features in `future.tex`), so the binding's form belongs to Java interoperability (P-26), and the library's own practice decides it (P-27). The specification's printing of `builtinPrimitive` in the included library api is no ground.

**Applies:** To all native bindings in the library. Bindings move onto helpers step by step, not all at once at the switch-over. From the step that moves a binding, the compiled checker checks it against the helper's Java signature. The choice is cheap to undo only until bindings start to move, which climb batch 23 begins. After that, switching to the other form costs a sweep of the library.

**Requires:** Keep the `builtinPrimitive("…")` form. Do not write `import java` declarations in the library for natives. Point each moved binding at a static method in `nativeHelpers/`. Build the walk-side loader and the compiled-side rewrite, including the refusal of unknown strings.

**Unfinished:** Everything. Every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`. Climb batch 23 begins the move.

**Could not resolve:**
- "Walk is to load the named helper through a loader beside its glue classes": the entry does not say how walk passes its boxed evaluator values to a helper that takes plain Java values (`compiler.md`, "Natives"; `interpreter.md`, "Natives"), that is, whether the new loader also converts values. This is missing detail rather than two readings, but a worker building it would need the answer.
- "At the parse, before the checker": unclear whether the rewrite happens inside the parse phase or as a separate rewrite somewhere between parse and the type checker (the phase list has disambiguation and grammar expansion in between). Minor.
- "P-26 defines the layers": as above.
