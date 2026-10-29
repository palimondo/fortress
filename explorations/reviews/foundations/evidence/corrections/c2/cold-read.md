# Cold read of c2/clean.txt

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and the references `compiler.md`, `interpreter.md`, `records.md`, `tests-writing.md`, `library.md`, `specification.md`, `exploring.md` and `gate.md` (looked up for terms). The file holds seven entries, all positions.

## P-33: "The work toward microGPT compiled follows the phases ..."

- **Decided:** The work toward a compiled microGPT runs in numbered phases of the work, not of the compiler. Phases 1 and 2 came before and are not named. The order is:
  - Phase 3: the compiled checker reports zero errors on the 12 apis and 12 components that the "distance to the switch-over" counts. F-53 defines that distance and holds its value.
  - Phase 4, the switch-over: first the natives (the `builtinPrimitive` bindings made to run on the compiled path), then the compiled path reads the interpreter's library and the compiler's prelude is deleted.
  - Phase 5: microGPT compiles. This covers its static types, the array design and the code generator's open gaps.
  - Phase 6: microGPT runs fast.

  Code-generator work may go on in parallel, against either library (P-37). Ledger row 320 (an api implemented by a component with a different name does not link) belongs to the design of the switch-over.
- **Applies:** To the order of all work toward compiled microGPT. Limits:
  - Phase 3 covers only the 24 counted units. The library's other components are outside it, and F-290 counts their errors.
  - Code-generator work is not bound by the order.
- **Requires:** Take the phases in order. Do not count the errors of the other library components against phase 3. Handle row 320 within the switch-over's design.
- **Unfinished:** Phases 4 to 6, and row 320. The entry does not say whether phase 3 is reached (see below).
- **Could not resolve:**
  1. "(the distance at zero; ...)" is unclear wording. It reads either as phase 3's end condition or as the present state. The skill says the compiled checker already finds no error in the interpreter's library (count-stage total 0). P-155 says the distance must reach zero with the symbolic operators checked. So I cannot tell whether phase 3 is done or reopened.
  2. "distance to the switch-over" is a record term not in the skill. The skill's count stage covers `FortressLibrary` and the apis it imports. The entry counts "twelve apis and twelve components". It does not say whether the two measures are the same. Only F-53, which I may not read, would settle it.
  3. "Code-generator work goes on beside that order" can be read two ways against phase 5's "the code generator's open gaps". I cannot tell which code-generator work is free of the order and which waits for phase 5.
  4. "Row 320 ... is part of the switch-over's design" can mean that the switch-over must fix row 320, or only that its design must decide how to treat it (for example, the linker's same-name rule against renaming).
  5. "in the order that the curator approved" does not say how strict the order is. A phase may or may not start before the previous one ends. P-85 and P-155 explicitly put some work before the switch-over, so some overlap exists.
  6. "after two earlier ones": phases 1 and 2 are not named, and the entry does not say they are done. This is minor.

## P-42: "A type parameter declared without a bound has the implicit bound `Any`, not `Object`."

- **Decided:** An unbounded type parameter is bounded by `Any`, which includes tuples and `()`, unlike `Object`. The specification states `Any`, with a callout noting that the Working Draft of February 2011 said `Object`. The reasons given:
  - the library instantiates generics at tuple types (`zip` gives `ZeroIndexed[\(E,F)\]`);
  - the POPL 2019 paper gives the default bound `Any`;
  - the Working Draft itself instantiates parameters at tuple and arrow types.
- **Applies:** To every type parameter declared without a bound. Limits:
  - The compiled path departs today. `fortress compile` sets `Object` through `Shell.useCompilerLibraries()` and refuses a generic instantiated at a tuple (row 412).
  - The switch-over alone does not end the departure; only changing that setting does.
  - Even with `Any`, the compiled path still fails on `()` (row 339) and on a generic dotted method with one tuple-typed parameter (row 832).
- **Requires:** Treat `Any` as the rule and the compiled path's `Object` as a departure. Do not expect the switch-over to clear row 412.
- **Unfinished:** The change of the compiled path's setting to `Any`, and the errors it brings (F-289). Rows 412, 339 and 832.
- **Could not resolve:**
  1. "F-289 measures the errors under it" is unclear wording. "It" can be the changed setting (the errors that the bound `Any` would show) or the current setting. I read it as the former.
  2. The entry does not say whether the setting change is ordered, or when (which phase). This is unclear wording, or a decision missing.
  3. The skill's `compiler.md` ("Traps of the compiled path") says the compiled path rejects tuple-instantiated generics "until the switch-over (ledger row 412)". That contradicts this entry's "The switch-over does not end this departure by itself". I follow the entry, but a reader who holds both gets two answers.
  4. "`fortress compile` sets the bound" may be narrower than the skill, which says every command except walk and `test` calls `useCompilerLibraries()`. This is minor.
  5. "a generic dotted method with one tuple-typed parameter" can be read two ways: a method whose only parameter is a tuple, or one tuple parameter among several. This is minor.

## P-58: "Every native binding is a `builtinPrimitive` call naming a static helper."

- **Decided:** A native binding stays a library body that is exactly `builtinPrimitive("…")`. Its string will name a static Java method in `nativeHelpers/` (for example `...simpleIntArith.intLT`) instead of one of walk's glue classes, which the compiled path cannot use (F-32).
  - Walk loads the named helper through a loader beside its glue classes.
  - The compiled path, at the parse and before the checker, rewrites each such body into a synthetic `import java` of the helper plus a call. It refuses a string that names no helper.
  - Bindings move one at a time. Each moved binding is checked from then on against the helper's Java signature, not all at once at the switch-over.
  - Rejected: `import java` declarations written in the library itself.
  - Reason: the language has no foreign-function interface, so the library's own practice decides the form (P-27).
- **Applies:** To every native binding of the interpreter's library. Today none has moved: every string still names a glue class, walk loads strings only as glue classes (row 796), and the compiled path has no `builtinPrimitive` (row 309).
- **Requires:**
  - Keep the `builtinPrimitive` form, and point each string at a `nativeHelpers` static method.
  - Do not write `import java` in the library.
  - Move bindings step by step.
  - Make the compiled path refuse non-helper strings.
- **Unfinished:** The helpers, walk's loader, the compiled path's rewrite, and the move of every binding (rows 796 and 309).
- **Could not resolve:**
  1. "a loader beside its glue classes" is unclear wording. It may mean a second loading route kept alongside glue-class loading during the move, or a loader placed next to `interpreter/glue/` in the code. The entry also does not say how walk, whose natives take the evaluator's boxed values (`interpreter.md`, "Natives"), calls helpers over plain Java values.
  2. "refuse a string that names no helper" can be read two ways during the move. The interpreter's library still holds glue-class strings, and the compiled checker already reads it (count stage). The refusal may apply as soon as the rewrite exists, which would refuse every unmoved binding and raise the count. Or it may apply only once the compiled path reads the library at the switch-over.
  3. "At the parse, before the checker" may mean inside the parse phase, or at some point between the parse and the checker (disambiguation, grammar). This is minor.
  4. The entry does not say whether new helper classes are to be written in `nativeHelpers/` for natives that have none. It is implied. This is minor.
  5. "the step that moves a binding" does not say what a step is (one binding per commit, or a batch). This is minor.

## P-59: "Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over."

- **Decided:** Walk has no static types, so it chooses a coercion by the value's run-time type. The specification and the compiled path choose it by static type. The curator accepts this as walk's limit, and walk is not changed for it before the switch-over. The limit is stated in a callout in `Specification/basic/conversions-coercions.tex`. Two expected-failure tests record it: `XXXCoercionStaticRungC` (the chapter's printed example) and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker, it uses the static coercions that the checker inserts.
- **Applies:** To walk's choice of coercion, from now until walk runs the checker after the switch-over.
- **Requires:** Do not change walk's coercion choice before the switch-over. Keep the two `XXX` tests as expected failures. Do not treat the difference as a new defect.
- **Unfinished:** Walk running the checker (after the switch-over, ordered by P-12), walk using the checker's coercions, and the promotion of the two `XXX` tests.
- **Could not resolve:**
  1. "P-12 orders the two steps" is unclear wording. I read the two steps as the switch-over and then walk running the checker. They could also be walk running the checker and then using its coercions.
  2. "the static coercions that the checker inserts" names an implementation detail I lack. The skill lists coercion as a desugaring that walk switches off (`interpreter.md`). I cannot tell whether the checker or the coercion desugarer inserts the coercions, or whether walk would then switch that desugaring on.

## P-84: "An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types."

- **Decided:** One design covers both storage and sizes:
  - `RR64` arrays are stored unboxed as `double[]`.
  - Array sizes stay in the array types as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them (F-67).
  - Rejected: a layered plan in which a first store carries the sizes only as run-time fields.
  - Both halves follow the library's patterns (P-27).
  - The compiled path's `double[]` store waits until after the switch-over, with the other array decisions. Among them is decision A: how an `RR64` array made through the generic array traits gets the store (P-85).
  - Today the class loader only renames the type parameter, so no instance gets a `double[]` field. A loader that would (way A4 of decision A) is unmeasured (F-18).
- **Applies:** To arrays on the compiled path. The storage applies to `RR64` elements; the sizes apply to arrays in general. The store is not built before the switch-over.
- **Requires:**
  - Do not build the `double[]` store before the switch-over.
  - Do not carry sizes only as run-time fields.
  - Keep `nat` size parameters in array types.
- **Unfinished:** The `double[]` store, decision A (including measuring way A4), and the class loader's support for it.
- **Could not resolve:**
  1. "The sizes do not wait while a first version of the store carries them only as run-time fields" is convoluted wording. The next clause, "that layered plan was rejected", settles it: there is no interim stage with run-time-only sizes.
  2. "arrays keep the team's `nat` sizes in their types" may mean every array, or only those whose types the team sized. P-85 keeps open whether a factory for a size known only at run time returns the unsized `Array[\E,I\]`.
  3. "way A4 of decision A" is a record term. Ways A1 to A3 are not stated anywhere I may read; only A4 is described.
  4. "the other array decisions" does not say which ones. P-85 names A, B and D; C is never mentioned.

## P-85: "The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D."

- **Decided:** Three questions of the compiled path's array design stay open, with no default answer. They come back after the switch-over, together with decisions A, B and D:
  1. Does the array factory choose a store for each element type?
  2. Does the store also keep the size as a field, beside the size in the type?
  3. Does a factory for a size known only at run time return the unsized `Array[\E,I\]`?

  The three questions are separate from decisions A (how an `RR64` array made through the generic traits gets `double[]`, P-84), B (where unboxed arithmetic happens) and D (the sizes in the model's own types, P-87). All preparation for the array work is done before the switch-over; only the work itself waits.
- **Applies:** To the compiled path's design for arrays.
- **Requires:** Assume no answer to any of the three questions. Do the preparation before the switch-over, and do the array work itself after it.
- **Unfinished:** The answers to the three questions and to A, B and D, the preparation, and the array work.
- **Could not resolve:**
  1. "The whole preparation for the array work" is unclear wording. Neither the entry nor the skill says what counts as preparation (measurements, probes, designs brought to the curator?) as against "the work itself". A worker cannot tell what to do now.
  2. "These questions are apart from decisions A, B and D": question 1 (the factory chooses a store per element type) looks like one possible answer to A (how a generic-trait `RR64` array gets `double[]`). The boundary between them can be read two ways.
  3. The decisions are named A, B and D with no C. Whether C exists, was decided or was dropped is not said. This is missing record context.
  4. "B is where unboxed arithmetic happens" does not say where: the code generator, the library or the helpers. This is unclear wording, though it labels only an open decision.
  5. "return after the switch-over" presumably means "come back to the curator for decision". This is minor.

## P-155: "The compiled checker checks the overloads of symbolic operators before the switch-over."

- **Decided:** Today the compiled checker's overloading check reads an operator only if its name is a word of capitals (`MAX`). So `+`, `^`, `||`, the subscripts and the other symbolic operators go unchecked. Before the switch-over, the check must read them by the rules it applies to any function, so that the distance to the switch-over reaches zero with them checked.
  - Reason: the skip is a known gap, not a rule. The specification's future-features appendix calls the library's two subscript operators "not really a valid overloading", and a zero with them unchecked would hide known errors.
  - Each design that the check needs goes to the curator before its rung, with the probe's measurement (`perf-probes/symbolic-operators-2/REPORT.md`).
  - Two designs are decided: P-156 (the subscripts' index bound) and P-157 (vectors stay additive groups through a change to the checker's exclusion test, which `compiler.md` describes).
  - Row 584 tracks the check and its rungs.
- **Applies:** To the compiled checker's overloading check. It is part of reaching phase 3's zero, before the switch-over.
- **Requires:**
  - Extend the check to symbolic operators.
  - Do not report the distance as zero while they are unchecked.
  - Bring each further design to the curator, with measurement, before building it.
  - Follow P-156 and P-157.
- **Unfinished:** The check (row 584), any further designs, and the errors that the check will surface.
- **Could not resolve:**
  1. "rung", in "before its rung" and "its rungs", is a record term that the skill does not define. It appears only in folder and test names (`rung-...`, `...RungC`) and in gate.md's "compile ladder". I read a rung as one step of the incremental work.
  2. "reaches zero with them checked" does not say whether the distance is zero today with them unchecked. This is the same open point as P-33 item 1.
  3. "the library's two subscript operators" are not named. The phrase is likely the read and the assigning subscript. This is minor.
  4. "the subscripts' index bound" is only a pointer to P-156. This is minor.
