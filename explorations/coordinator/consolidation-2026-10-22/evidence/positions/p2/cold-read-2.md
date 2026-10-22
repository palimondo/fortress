# Cold read 2: positions p2 (P-27 to P-41)

Read: `clean.txt` (9 entries), with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its `references/` (`library.md`, `compiler.md`, `interpreter.md`, `tests-writing.md`, `gate.md`, grepped for terms). Nothing else.

---

## P-27 The library's own practice is the standard

**Decided:** Anyone who extends the standard library must first find how the library already handles the same kind of problem, and copy that pattern. The example given: the library uses `excludes` clauses everywhere to declare that two types share no value, which lets the checker accept overloads on both types. A fix must not come from reading the specification alone, and must not be a workaround in the program that uses the library (for example, renaming something in microGPT). What microGPT's code invented as library extensions belongs in the standard library, written in the library's style. The cost of skipping the study: the curator had to work out the diagonal matrix's design himself (a subtype of `Matrix` that overrides `mul`, which the library's matrix product calls; P-88).

**Applies:** To every extension or fix of the standard library, whoever makes it. It does not say what to do when the library has no practice for the case. (`library.md`, "Designing a change", gives a fallback for methods only: the team's proposal in `Library/incomplete/Collection.fss`.)

**Requires:** Study the library's existing way first, and follow it. Put the fix in the library, not in the program that uses it. Do not base a design on the specification alone. This matches `library.md`, which says to take the design "from the library's practice as well as from the specification's text".

**Unfinished:** Not stated. "The extensions ... that microGPT's code invented go into the standard library" can be read as a standing rule or as work that is still to do (moving those extensions in). The entry does not say which, or which extensions they are.

**Could not resolve:**
- "go into the standard library": rule or pending work? (unclear wording, see above)
- "such as a rename in microGPT's own code": a rename of what, and to dodge what problem? I guess a variable renamed to avoid a reserved functional-method name, or an overload clash. (unclear wording; it is only an example)
- `Matrix`, `mul`, "the library's matrix product": not in the skill. I don't know which operator the matrix product is, or whether `mul` is dotted or functional. The entry gives enough to follow the rule. (language/library concept I lack)
- "standard library" here, but "the library" in the skill. I take them to be the same: the interpreter's library, without the compiler's prelude files. (mild unclear wording)

---

## P-28 Fleshing out the standard library is a very important task

**Decided:** Extending the standard library matters a lot to the curator. The next part to add is algebra: traits such as `Ring` and `Field` (not declared yet), plus what machine-learning matrices and tensors need, so that the existing algebraic traits (`AdditiveGroup`, `MultiplicativeRing`) cover matrices and tensors too. The reason: he wants mathematical rigour for those types. The work edits `Library/` itself, not a separate tree outside it (P-27). It is parked off the path to compiled microGPT: PLAN lists it under "Off the path, parked", where the default is to leave an item until it becomes relevant and then take it to the curator. Two of his matrix ideas are parked beside it: n-by-n matrices of one size as a multiplicative ring, and diagonal matrices of one size as a commutative ring.

**Applies:** To future library work on algebra, matrices and tensors. It is not on the current path.

**Requires:** Don't start it on your own. When it becomes relevant, bring it to the curator. When it is done, it goes in `Library/` in the library's own style. Do not build the two matrix ideas as if they were decided: they are listed as ideas.

**Unfinished:** All of it: `Ring`, `Field`, the matrix and tensor types, and the two matrix ideas.

**Could not resolve:**
- "very important" together with "parked": I read it as important in the long run but not to be started now. The entry would be clearer if it said that in so many words. (unclear wording)
- "and what machine learning's matrices and tensors need": the sentence has two readings. Either the matrix and tensor types themselves are part of the next layer, or only the traits they need are. (unclear wording)
- "reach them too": I take it to mean that matrices and tensors extend or implement those traits. (figurative wording)
- "until it becomes relevant": who judges that? A worker who runs into it, or the coordinator? (unclear wording)
- How the parked diagonal-matrix ring relates to P-27's diagonal matrix (a `Matrix` subtype that overrides `mul`): P-27's version seems to exist already, and the ring is the further idea. The entry does not tie the two together. (unclear wording)

---

## P-30 The check of microGPT under walk after a batch must take less than a minute

**Decided:** The curator wants the post-batch microGPT check under walk to finish in under a minute. It runs about two forward and backward passes and compares the results with reference values. That is enough to show that the model's maths still works and that library changes (for example, to arrays) did not break it. A slower check is a waste of time to him.

**Applies:** To the check run after each batch. It is not part of the gate. The full checks (`full` in `interpreter.md`) are a separate thing, run only when a brief asks.

**Requires:** Keep the check under one minute. The entry implies, without saying, that a worker must not make it slower than that. Run it as `explorations/coordinator/tools/mg-run.sh`, which runs the quick versions of the two programs at once. From `interpreter.md`, those are `MicroGptFlatQuick.fss` and `MicroGptAplQuick.fss`, about 56 s together.

**Unfinished:** Nothing. It says "Built".

**Could not resolve:**
- "batch", "commit stage": process terms that the skill does not define. I take a batch to be a group of changes that land together. (concept I lack)
- "That is the curator's goal" plus "must take": is it a hard limit that a change must not break, or a target? With 56 s measured, the margin is small, and the entry does not say what to do if a change pushes it over. (unclear wording)
- "about two forward-and-backward passes": `interpreter.md` says exactly two for each program. "about" leaves it open. (unclear wording)
- "each batch's commit stage runs the check", while `interpreter.md` says microGPT runs "by hand, never in the gate". These agree on "outside the gate", but not on whether it runs automatically or by hand. (unclear wording)

---

## P-32 The record's maps are kept current and used

**Decided:** The record's maps are `FACTS.md`, `INDEX.md` and the territory map (`explorations/coordinator/map/`). They are kept up to date and used, so that nothing already in the record gets worked out again. The territory map surveys the repository down to the place where the team wrote down each design's intent. It covers `Papers/` too, because some intent exists only in the papers. How the maps are read belongs to the `coordinator` skill: FACTS and INDEX in full at the coordinator's boot, and the territory map as part of each rung's mission briefing. The territory map's surveys date from 2026-09-16, so a status or a line number in them may be stale.

**Applies:** To everyone who works from the record. The reading duties named are the coordinator's. A worker gets the territory map through the briefing.

**Requires:** Consult the maps before working something out. Treat a status or line number in the territory map as possibly stale.

**Unfinished:** Not stated, though the stale surveys suggest a refresh is due.

**Could not resolve:**
- "are kept current", but then "can be stale": is keeping them current a duty someone has now, or a goal that the territory map does not meet yet? Who updates the maps, and when? (unclear wording)
- "a status or a line number in them can be stale": what should a worker do about it, check against the tree before relying on it? Not said. (unclear wording)
- "rung", "mission briefing": process terms that the skill does not define. (concept I lack)
- "`references/batch.md`": the fortress-repo skill has no such file. I take it to be in the coordinator skill's `references/`, but the path does not say so. (unclear wording)
- "down to where the team wrote the intent of each design": I read it as pointing to the file or section where the intent is written. (slightly unclear wording)

---

## P-33 The work toward microGPT compiled follows the phases of PLAN.md, in the order that the curator approved

**Decided:** The work goes through PLAN's phases in the approved order. Still to do:
- Phase 3: the compiled checker reports no errors on the interpreter's whole library (distance to the switch-over at zero; F-53).
- Phase 4, the switch-over: first the natives (the library's `builtinPrimitive` bindings made to work on the compiled path), then the compiled path reads the interpreter's library and the compiler's prelude is deleted.
- Phase 5: microGPT compiles (its static types, the array design, the code generator's open gaps).
- Phase 6: microGPT runs fast.

Some work has gone in beside that order. Phase 2b, the repair batch from the reviews of landed batches, went in before phase 3, because the curator allowed it on 2026-09-27. Code-generator work continues under either library (P-37). PLAN schedules phase 4's natives alongside phase 3. Progress is in PLAN's "Where we stand".

One decision is still waiting for the curator. Ledger row 320 has two halves. An agent fixed one (mutability across the api) and, without his approval, gated the other as an expected failure (`ProjectFortress/compiler_tests/XXXExportVarRungXLinked`: an api that is implemented by a component of a different name does not link). Review-queue item 36 holds the decision.

**Applies:** To the ordering of all work toward compiled microGPT. The named exceptions are 2b, code-generator work and phase 4's natives.

**Requires:** Take work in phase order unless an exception covers it. Check "Where we stand" for the current position.

**Unfinished:** Phases 3 to 6, and the curator's decision on row 320's deferred half.

**Could not resolve:**
- The rule for work out of order. The entry lists past exceptions but does not say whether a new exception needs the curator's approval. (unclear wording)
- "waits for him with the switch-over's design": two readings. Either it is reviewed together with the switch-over's design, or it is part of that design. (unclear wording)
- What a worker must do about row 320 meanwhile: leave the `XXX` test alone, or not fix that half until item 36 is decided? Not said. (unclear wording)
- "mutability across the api": I guess a `var` top-level variable exported through an api, judging by the test's name. The skill does not explain it. (concept I lack)
- "the array design": a pointer only. `compiler.md` points to the POSITIONS entries "Storage is" and "array design". (pointer, acceptable)

---

## P-37 One library, the interpreter's, is the library that the compiler checks

**Decided:** The interpreter's prelude (`FortressLibrary`, `FortressBuiltin`) replaces the compiler's prelude on the compiled path, and the compiled path reads the interpreter's library with it. The compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) is a bootstrap to be removed. So nothing new is declared in it, and at the switch-over its three files are deleted and their tests kept (P-38 covers respelling). The decision settles which files survive, not which designs: the one library may adopt a design from the prelude, as it already adopted the flat number types. Work on the code generator goes on regardless of library. The decision is not to be raised with him again. How the checker comes to accept the library is PLAN's phases 3 and 4, which he approved in that order (P-33).

**Applies:** To every edit that touches either prelude, and to the switch-over.

**Requires:** Add no declaration to the three compiler prelude files. Do not delete their tests at the switch-over. Do not reopen the choice of library with the curator.

**Unfinished:** PLAN phase 4.

**Could not resolve:**
- `CompilerSystem`: `compiler.md` says `Library/CompilerSystem.fss` is the compiled path's `System`. The entry deletes three files, and `CompilerSystem` is not among them. Its fate is not stated. (unclear, possible gap)
- "The decision is not put to him again": does this override the skill's rule that new evidence against a decision may be raised ("When to explore")? Two readings. (unclear wording)
- "Still to build: PLAN phase 4" only, although the entry says the checker's acceptance is phases 3 and 4, and P-33 lists phase 3 as unbuilt. Is phase 3 left out because it belongs to P-33? (unclear wording)
- The title says "is the library that the compiler checks", in the present tense. Today the compiled path still uses its own prelude, and only the count stage checks the interpreter's library. The title states the target as if it were the present. (unclear wording)

---

## P-38 The compiler prelude's defects are not repaired: they go with it at the switch-over

**Decided:** The compiler's prelude is not edited to fix five known defects:
1. Its `Maybe` block writes the empty case as `Nothing` with no type parameter, where the specification and the one library write `Nothing[\T\]` (row 331).
2. Its guard `if other = -1 then 0` in `REM` of `ZZ64` and `ZZ32` answers a divisor of -1 before `DIV` can overflow. It sits in the prelude instead of in the six native methods that overflow on -1.
3. Its wrapping and saturating operators have swapped spellings: its `BOXPLUS` family wraps and its `DOTPLUS` family saturates (row 348). This agrees with `library.md`, where `DOTPLUS` wraps.
4. Shifting a `ZZ32` by a `ZZ64` count gives a different result from walk (row 381).
5. It lacks the specification's `shift` (row 383).

The `Maybe` block and the `REM` guard stay as they are until the prelude is deleted, and their tests outlive it. At the switch-over, the compiled tests that use the swapped spellings are respelled. Rows 381 and 383 then close with no edit and no rung of their own, because the compiled path reads the interpreter's library and its shifts. `XXXShiftDeclRungI` then turns red (`shift` is defined) and is promoted. After that, a compiled program that names a local or a parameter `shift` is refused, so the switch-over batch counts the gated compiler tests that do.

**Applies:** To the compiler's prelude until it is deleted, and to the switch-over batch.

**Requires:** Do not edit the prelude for these five defects. At the switch-over: respell the tests that use swapped spellings, promote `XXXShiftDeclRungI`, close rows 381 and 383, and count the gated compiler tests that name a local or a parameter `shift`.

**Unfinished:** PLAN phase 4.

**Could not resolve:**
- "counts the gated compiler tests that do": counts them, and then what? Renames their variables? Reports the number? The purpose of the count is not stated. (unclear wording)
- "the six native methods that overflow on it": which six is not said, and neither is whether the -1 divisor case gets fixed in them, or in the one library, at the switch-over. (unclear wording)
- "their tests stay after it": do the `Maybe` test and the `REM` test stay unchanged? A test that relies on a bare `Nothing` might not pass against the one library. Not said. (unclear wording)
- "no rung of their own": "rung" is not defined in the skill. I take it to mean a dedicated work item. (concept I lack)
- "respelled": I take it to mean swapped to the specification's spelling, so that each test still tests the same behaviour. (slightly unclear wording)

---

## P-39 Every batch's gate measures the checker count, and its total never turns the gate red

**Decided:** The checker count and the distance to the switch-over both count the compiled checker's errors on the interpreter's library. The count stops at a crash, or at an error the checker cannot get past. The distance counts every error, over all apis and components (F-53). Every batch's gate measures the count. A rise in its total is reported and never fails a batch by itself. The count's stage (step 8 of the batch's gate, `explorations/coordinator/climb-batch-workflow.md`) can still turn the gate red on the faults that F-66 names. One of them is a checker crash that no rung of the batch declared in advance in its manifest's `expectedCheckerCrash` field. Phase 3 batches also measure the distance, in a stage that only reports. The reason: the full distance measurement takes far longer than the count, so a batch pays for it only when the distance is the number it is trying to move.

**Applies:** To every batch's gate, and the distance stage to phase 3 batches only.

**Requires:** Don't treat a rise in the count as a failure, but do report it. An unexpected checker crash makes the gate red, so a rung that expects a crash must list it in `expectedCheckerCrash` in advance.

**Unfinished:** Not stated.

**Could not resolve:**
- "the faults that F-66 names": only one is listed here. I would need F-66 for the rest. (pointer)
- "rung", "manifest": not defined in the skill. (concept I lack)
- "step 8 of the batch's gate": the skill's `gate.md` numbers its own steps differently, and has no count stage that I could find. Is the batch's gate in `climb-batch-workflow.md` a different gate from the skill's? (unclear wording)
- "is reported": reported where, and to whom? (unclear wording)

---

## P-41 On the compiled path, a size static argument travels at run time as a descriptor object, as a type argument does

**Decided:** On the compiled path, a size static argument (the 3 of `Vec[\3\]`) is carried at run time as a descriptor object, as a type argument is. A generic type's descriptor has one field per non-operator static parameter. The team's code generator already emitted that field for sizes but left it empty, and the size descriptor now fills it. Each size value has a single descriptor, which `RTTIsize.of` takes from a table. No Java class is generated for it. This is the team's way of instantiating types, applied to numbers. Operator static arguments stay compile-time names only (F-39). The curator sees no need to carry them at run time.

**Applies:** To the compiled path's handling of size and operator static arguments.

**Requires:** Carry sizes through `RTTIsize.of` descriptors, with no Java class per size. Do not build run-time carrying of operator arguments.

**Unfinished:** The open rows that F-129 holds. It is otherwise built.

**Could not resolve:**
- `bool` static parameters: the skill lists `bool` as a kind of static parameter. "each of its static parameters that is not an operator" implies that a `bool` gets a field too, but the entry does not say how it is filled. (gap or unclear wording)
- "A generic type's descriptor": the skill mentions descriptors only for sizes. I take a type descriptor to be the run-time type-information object, but the skill does not describe it. (concept I lack)
- "The curator sees no need": does it forbid carrying operators at run time, or only judge it unnecessary for now? (unclear wording)
