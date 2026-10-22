# Cold read: positions p2 (P-27, P-28, P-30, P-32, P-33, P-37, P-38, P-39, P-41)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the skill's `references/` (not `revival-changes.md` or `sources.md`) only.

## P-27 "The library's own practice is the standard."

- **Decided:** Before you extend the standard library, find how the library already does the same kind of thing, and do it that way. Do not design a fix from the specification's text alone. Do not work around a gap in the program that uses the library either, for example by renaming something in microGPT's code. Anything microGPT's code invented that extends the library belongs in the standard library, written in the library's style. The entry gives `excludes` clauses as one pattern the library uses everywhere.
- **Applies:** To anyone who extends the standard library, and to any fix of a library gap. The specification is still an input, just not the only one (`library.md`, "Designing a change", says the same).
- **Requires:** Study the library's existing practice first. Put extensions into the library, not into the program. No workaround in the user program.
- **Unfinished:** Not stated. I cannot tell whether microGPT's invented extensions, the diagonal matrix among them, have already moved into the library or are still to move.
- **Could not resolve:**
  - "One such pattern is all over the library: `excludes` clauses". The entry does not say what problem this pattern solves in an extension. From SKILL.md I guess it is how two overloads are made acceptable to the checker, but the entry does not say so. Unclear wording.
  - "the extensions of the library that microGPT's code invented": does this mean declarations that microGPT defines today and that should move into the library, or extensions still to be invented? Two readings.
  - "the shape of microGPT's diagonal matrix: a subtype of `Matrix` that overrides its product". It does not say whether `Matrix` is a library trait or microGPT's own, or which operator "its product" is (juxtaposition? `DOT`?). P-88 is not quoted, so the example stays opaque. Missing context, not a language concept.

## P-28 "Fleshing out the standard library is a very important task."

- **Decided:** The library's next layer is algebra. That means traits the library does not declare yet, such as `Ring` and `Field`, and what machine learning's matrices and tensors need, so that algebraic traits like `AdditiveGroup` and `MultiplicativeRing` also cover those matrices and tensors. The reason is mathematical rigour. The work goes into the standard library itself, not into a separate tree. It is parked: it is not on the path to microGPT compiled.
- **Applies:** To future library work on algebraic traits, matrices and tensors. For now it is parked.
- **Requires:** If the work is done, it goes into the standard library, in the library's way (P-27). Not in a separate revival tree. The entry implies the work does not start now, but never says "do not do it now".
- **Unfinished:** All of it: declaring `Ring`/`Field`, and bringing matrices and tensors under the algebraic traits.
- **Could not resolve:**
  - "very important" and "parked" pull against each other. A worker cannot tell whether they may take it up when a task touches matrices, or must leave it alone until the curator unparks it. Unclear wording.
  - "a separate tree of the revival's own": a separate source directory or library, or a separate git tree? Unclear wording. I read it as a separate library directory.
  - "two matrix ideas of his wait beside it": not named, and PLAN is outside what I may read. Missing context.
  - "what machine learning's matrices and tensors need": the entry does not say whether the library has matrix or tensor types today. Unclear.

## P-30 "The check of microGPT under walk after a batch must take less than a minute."

- **Decided:** The curator's goal is that the microGPT check under walk, run after a batch, takes under a minute. The check runs about two forward-and-backward passes and compares the results with reference values. That is enough to show the model's maths and the library changes (for example, to arrays) are intact. The check is `explorations/coordinator/tools/mg-run.sh`, which runs the quick versions of microGPT's two programs, outside the gate.
- **Applies:** After a batch. The check is not part of the gate. `interpreter.md` gives about 56 s for the pair, at 1 thread by default.
- **Requires:** Use the quick check (`mg-run.sh`), not a longer one. Do not build a slower check.
- **Unfinished:** Not stated. It reads as already met.
- **Could not resolve:**
  - "must take" vs "That is the curator's goal": a hard limit or a target? If a change pushes the check past a minute, the entry does not say whether the worker must fix that, or report it, or neither. Unclear wording.
  - "a batch": no definition in the skill. `session.md` says only "a run of other agents that build and test at the same time". I read it as a group of changes that land together. Missing term.
  - No conditions for the minute: which machine, how many threads, what load. Unclear limits.

## P-32 "The record's maps are kept current and read when the work needs them ..."

- **Decided:** `FACTS.md`, `INDEX.md` and the territory map (`explorations/coordinator/map/`) are the record's maps. They are kept up to date and read when the work needs them, so that nobody works out again what the record already holds. The territory map surveys the repository down to the places where the team wrote down each design's intent. Some of that intent is only in `Papers/`, so the map covers the papers too and says where to look.
- **Applies:** To all work. Read the maps before working something out.
- **Requires:** Read the maps when relevant. Keep them current.
- **Unfinished:** Not stated. The papers coverage reads as already done ("covers").
- **Could not resolve:**
  - "are kept current": by whom, and when? Every worker who changes something, or only the coordinator? `records.md` covers INDEX lines and FACTS entries, but nothing tells a worker when to update the territory map. Unclear wording (passive voice hides the actor).
  - Calling FACTS a "map" is odd: it is a list of facts, not a guide to where things are. Minor.

## P-33 "The work toward microGPT compiled follows the phases of PLAN.md, in the order that the curator approved."

- **Decided:** The work goes by PLAN's phases, in the approved order. Still to do:
  - Phase 3: the compiled checker reports no error on the whole interpreter library, so the distance to the switch-over is zero (F-53).
  - Phase 4: the switch-over. First the library's native bindings work on the compiled path. Then the compiled path reads the interpreter's library, and the compiler's prelude is deleted.
  - Phase 5: microGPT compiles. That covers its static types, the array design and the code generator's open gaps.
  - Phase 6: microGPT runs fast.

  An agent made one decision without approval: it left the open half of ledger row 320 (an api implemented by a component with a different name does not link) as a gated expected failure instead of fixing it. That decision waits for the curator, together with the switch-over's design.
- **Applies:** To all work toward microGPT compiled. PLAN's "Where we stand" says where the work is now.
- **Requires:** Follow the phase order. Leave row 320's open half as it is until the curator reviews it (review-queue item 36). I infer this; the entry does not say it.
- **Unfinished:** Phases 3 to 6.
- **Could not resolve:**
  - "in that order" vs P-37's "This decision does not stop work on the code generator". The code generator's open gaps are phase 5. Can that work run before phases 3 and 4 finish? Read against each other, the two entries can be read two ways. Unclear wording.
  - "the open half of gap-ledger row 320": the entry does not say what the other half is, or whether it is closed. Missing context.
  - "review-queue item 36": the review queue is not defined in the skill. Missing term.
  - "the library's native bindings on the compiled path": I read it as making the interpreter library's natives (walk's `interpreter/glue/prim/` classes) work compiled, but the entry does not say what that involves. Partly clear.
  - The entry does not say whether a worker who meets row 320 may fix it. Unclear.

## P-37 "One library, the interpreter's, is the library that the compiler checks."

- **Decided:** The interpreter's library, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's library. The compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) is a bootstrap to be removed. Add no declaration to it. At the switch-over its three files are deleted and their tests kept. The decision settles which files survive, not the design of each thing inside them. It does not block work on the code generator. The curator will not be asked again. How the checker comes to accept the library (first step, order of the work) is a separate plan that goes to him. That plan is PLAN's phases 3 and 4, already approved in that order (P-33).
- **Applies:** From now until the switch-over (no new prelude declarations), and at the switch-over (delete the files, keep the tests).
- **Requires:** Do not add to the prelude. Do not reopen the choice of library. Code-generator work may go on.
- **Unfinished:** PLAN phase 4.
- **Could not resolve:**
  - "settles which files survive, not each design inside them". Does this leave the designs inside the interpreter's library open to change, or allow designs from the deleted prelude files to be carried over? Two readings.
  - "is a plan that comes to him: PLAN's phases 3 and 4, which he approved": "comes" (future or habitual) next to "approved" (past) confused me. I read it as "such plans go to him, and this one has been approved". Unclear wording.
  - `compiler.md` names a fourth compiler file, `Library/CompilerSystem.fss` (the compiled path's `System`). The entry does not say what happens to it at the switch-over. Missing limit.
  - "their tests kept": kept unchanged, run against the interpreter's library? P-38 says some are respelled. Partly clear.
  - "FortressLibrary and FortressBuiltin": only these two files, or the whole interpreter library (`NativeArray` and the other components that `library.md` lists)? I read it as the whole library, but the wording names two files. Unclear wording.

## P-38 "The compiler prelude's defects are not repaired: they go with it at the switch-over."

- **Decided:** Five prelude items are left unedited:
  1. The `Maybe` block, whose `Nothing` takes no type parameter (row 331).
  2. The `if other = -1 then 0` guard in `REM`.
  3. The wrapping and saturating operators, spelled the reverse of the specification (row 348).
  4. The shift of a `ZZ32` by a `ZZ64` count, which gives a different result from walk (row 381).
  5. The missing specification `shift` (row 383).

  The `Maybe` block and the `REM` guard stay with their tests until the prelude is deleted. At the switch-over:
  - Compiled tests that use the reversed spellings are respelled.
  - Rows 381 and 383 close with no edit, because the compiled path then uses the interpreter's library and its shifts.
  - `XXXShiftDeclRungI` is promoted.
  - `shift` becomes a reserved name on the compiled path, so the switch-over batch counts the compiler tests that bind it as a variable.
- **Applies:** Until the switch-over (no edits) and at the switch-over (the listed follow-ups).
- **Requires:** Do not edit these five items in the prelude. At the switch-over, respell the tests, close rows 381 and 383, promote the `XXX` test, and count the tests that bind `shift`.
- **Unfinished:** PLAN phase 4, and these follow-ups with it.
- **Could not resolve:**
  - "its guard `if other = -1 then 0` in `REM`": the entry does not say why this is a defect, and it cites no ledger row, unlike the other four items. "stay as landed, with their tests" sounds as if the revival added the `Maybe` block and the guard, so they may be revival additions rather than team defects. Two readings.
  - "whose empty case `Nothing` takes no type parameter": the entry does not say whether the defect is that `Nothing` lacks a type parameter the specification gives it. Unclear wording.
  - "whose spellings are the reverse of the specification's": does the wrapping spelling mean saturating and the other way round, or are the characters of each spelling reversed? Two readings.
  - "`XXXShiftDeclRungI` then passes": by `tests-writing.md`, an `XXX` test whose defect is fixed turns red. "passes" probably means the program now gives the specification's answer, so the test must be promoted, but it could be misread as "stays green". Unclear wording.
  - "Rung" in the test name: not defined in the skill. Missing term. It does not block this entry.
  - "the switch-over batch counts the compiler tests that bind it as a variable": does it only count them (and report), or must it also rename them, since a reserved name makes the binding phase refuse those programs (`library.md`)? Two readings.
  - "close with no edit": no edit of code, or no edit of the row's claim? I read it as no code edit.

## P-39 "Every gate measures the checker count, and its total never turns the gate red."

- **Decided:** Every gate measures the checker count. A rise in the count's total is reported but never fails a batch by itself. The count's stage can still turn the gate red on the faults F-66 names, such as a checker crash that no rung declared. In phase 3's batches, the gates also measure the distance to the switch-over, in a stage that only reports. The reason: a batch should pay for the full measurement only when the distance is the number it is trying to move.
- **Applies:** The count applies to every gate. The distance applies only to gates of phase 3's batches. Both count the compiled checker's errors on the interpreter's library:
  - The count stops at the first crash, or at an error the checker cannot get past.
  - The distance counts every error, over all apis and components (F-53).
- **Requires:** Run the count stage in each gate. Do not fail a gate on a higher total. Do fail it on F-66's faults. In phase 3, also run the distance stage, as report-only.
- **Unfinished:** Not stated.
- **Could not resolve:**
  - "a crash of the checker that no rung declared": "rung" is not defined in the skill (it appears only in test and folder names), and I cannot tell how a rung "declares" a crash. Missing term. It blocks the one example of a red fault.
  - "an error that it cannot pass": "pass" means get past here, but it could be read as "pass a test". Minor wording.
  - `gate.md`'s steps (1 to 7) contain no count stage, so a worker running a gate from the skill does not know where or how to measure the count, or the distance. The entry assumes a stage the skill does not describe. Unclear limit.
  - "the full measurement": I read it as the distance, which is costlier than the count, but the entry does not say so. Partly clear.

## P-41 "On the compiled path, a size static argument travels at run time as a descriptor object, as a type argument does."

- **Decided:** On the compiled path, a size static argument is carried at run time as a descriptor object, just as a type argument is:
  - A generic type's descriptor has a field for each static parameter that is not an operator. The team's code generator already reserved that slot for sizes too, and the size's descriptor fills it.
  - Each size value (for example the 3 in `Vec[\3\]`) has exactly one descriptor. `RTTIsize.of` takes it from a table. No Java class is generated per size.
  - Operator static arguments stay compile-time names only (F-39). The curator sees no need to carry them at run time the way types and sizes are carried.
- **Applies:** On the compiled path, to static arguments of size kind. It does not apply to operator static parameters.
- **Requires:** Represent sizes as interned descriptors through `RTTIsize.of`, in the generic descriptor's static-parameter field. Generate no class per size value. Do not add run-time carriage for operator arguments.
- **Unfinished:** Not stated. SKILL.md ("The compiled run time") speaks of the size descriptor in the present tense, so I take it as built, but the entry does not say so.
- **Could not resolve:**
  - "The curator sees no need to carry operators as types and sizes are carried": this is a garden path. It first reads as "carry operators as types". The meaning is "carry operators the way types and sizes are carried". Unclear wording.
  - "reserved that slot for a size too": did the team's code generator leave the slot empty for sizes, or does it fill it for sizes already? I read it as "left the slot, now filled". Minor.
