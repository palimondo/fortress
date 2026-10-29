# Cold read 2: corrections c2

File read: `explorations/reviews/foundations/evidence/corrections/c2/clean.txt` (seven positions: P-33, P-42, P-58, P-59, P-84, P-85, P-155).
Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and term look-ups in `references/compiler.md`, `interpreter.md`, `library.md`, `records.md`, `tests-writing.md`, `specification.md`, `gate.md`. Nothing else.

---

## P-33 — the phases toward compiled microGPT

**Decided:** The work toward a compiled microGPT runs as numbered work phases, 3 to 6, in the order the curator approved. These are stages of the project, not the compiler's phases (parse, disambiguate and so on). Phase 3 is finished when the compiled checker reports zero errors on the library apis and components that the "distance to the switch-over" counts. F-53 defines that scope and holds its value. The library's other components are outside phase 3, and F-290 counts their errors. Phase 4 is the switch-over itself: first every `builtinPrimitive` native gets a binding that runs on the compiled path, then the compiled path moves onto the interpreter's library and the compiler's prelude is deleted. Phase 5 makes microGPT compile: its static types, the array design and the code generator's open gaps. Phase 6 makes it run fast. Code-generator work can go on in parallel with this order, under either library (P-37). Ledger row 320 (an api implemented by a component with a different name fails to link) belongs to the design of the switch-over.

**Applies:** To all work aimed at compiled microGPT. Limits: phase 3 covers only what the distance counts. Code-generator work is the one exception to the order.

**Requires:** Do not do a later phase's work ahead of an earlier one, except code-generator work. Do not count the other components' errors toward phase 3. Inside phase 4, do the natives before the library switch. Handle row 320 as part of the switch-over, not as an unrelated fix.

**Unfinished:** Whatever is left of phases 3 to 6. The entry does not say which phase is current.

**Could not resolve:**
- *Whether phase 3 is done.* The skill says the count stage already gives a total of 0 for `FortressLibrary`, which looks like phase 3's end condition. But P-155 says the distance must reach zero *with symbolic operators checked*, and P-42 points to F-289 for errors "the distance shows". So the distance seems not to be zero yet. Unclear wording or state, across entries.
- *"the distance to the switch-over"*: defined only in F-53. The entry does not say whether it is the same number as the skill's "checker count" (the count stage's total). Unclear wording.
- *"Row 320 ... is part of the switch-over's design"*: this reads two ways. Either (a) the switch-over must fix row 320, or (b) row 320 is a design question for the curator to settle while phase 4 is planned. Unclear wording.
- *"Code-generator work goes on beside that order"* against phase 5's "the code generator's open gaps": I take it that gap work may happen at any time, and phase 5 is whatever remains for microGPT. A reader could instead think gap work belongs to phase 5. Mild; unclear wording.

---

## P-42 — unbounded type parameters are bounded by `Any`

**Decided:** A type parameter declared without a bound is bounded by `Any`, not `Object`, so it can be instantiated at tuples and `()`. The library relies on this: for example, `zip` returns a `ZeroIndexed[\(E,F)\]`. The specification states `Any`, with a callout noting that the February 2011 Working Draft said `Object`. The grounds are the POPL 2019 paper (Park, Hong, Steele, Ryu), which gives every type parameter the default upper bound `Any`, and the Working Draft's own statement that type parameters are instantiated with tuple and arrow types.

**Applies:** To every type parameter declared without a bound; this is the language rule. Limit: the compiled path breaks the rule today. `Shell.useCompilerLibraries()`, which every command other than walk and `test` calls (`fortress compile` among them), sets the bound to `Object`, so those commands refuse a generic instantiated at a tuple (row 412). The switch-over alone does not end this; only changing that setting does. F-289 counts the errors the distance shows under the current setting. Two failures do not depend on the bound: anything involving `()` (row 339), and a generic dotted method whose only parameter has a tuple type (row 832).

**Requires:** Treat `Any` as correct. Do not write a test or a specification passage that asserts `Object`. Do not expect the switch-over to clear row 412. Treat rows 339 and 832 as separate from the bound.

**Unfinished:** Changing the compiled path's setting to `Any`, and the errors F-289 counts. Rows 339 and 832.

**Could not resolve:**
- *Conflict with the skill.* `references/compiler.md`, "Traps of the compiled path", says the compiled path rejects tuple-instantiated generics "until the switch-over (ledger row 412)". This entry says the switch-over does not end that by itself. The two give different answers to when it ends. Unclear wording, between the entry and the skill.
- *Who changes the setting, and when.* No phase and no requirement schedules it, so a worker cannot tell whether they may change it now. Unclear wording.
- *"fails on `()`"*: this reads two ways. Either (a) it fails when a generic is instantiated at `()`, or (b) it fails on the value or type `()` in general. Unclear wording.
- *"F-289 counts the errors that the distance shows under today's setting"*: this reads two ways. Either (a) these are the distance errors that the `Object` bound causes, which a change of the setting would remove, or (b) F-289 is the whole distance as measured with today's setting. It also sits badly with the skill's "total of 0". Unclear wording.

---

## P-58 — native bindings: `builtinPrimitive` naming a static helper

**Decided:** A native binding keeps the library's own form: a body that is exactly `builtinPrimitive("…")`. The string is to change from naming one of walk's glue classes, which the compiled path cannot use (F-32), to naming a static Java method in `nativeHelpers/`, for example `com.sun.fortress.nativeHelpers.simpleIntArith.intLT`. Walk is to load the named helper through a loader alongside its glue-class loading. The compiled path is to rewrite each such body, at parse time and before the checker, into a synthetic `import java` of the helper plus a call to it, and to refuse a string that names no helper. Bindings move one step at a time. From the step that moves a binding, the compiled checker checks it against the helper's Java signature; this is not done all at once at the switch-over. The alternative, writing `import java` declarations directly in the library, is rejected. The ground: Fortress defines no foreign-function interface (the Working Draft proposes one only in its appendix of proposed features), so the library's own practice decides (P-27).

**Applies:** To every native binding in the library. Today every binding still names a glue class. Walk loads a binding's string only as a glue class (row 796), and the compiled path has no counterpart of `builtinPrimitive` (row 309).

**Requires:** Keep the `builtinPrimitive("…")` form. Do not add `import java` declarations to the library. A moved or new binding names a static method in `nativeHelpers/`. Per `references/compiler.md`, every method of a helper class, private ones too, needs a signature that maps to Fortress.

**Unfinished:** All of it: walk's helper loader, the compiled path's rewrite and refusal, a helper for each binding, and moving each binding.

**Could not resolve:**
- *Title against body.* The title "Every native binding is a `builtinPrimitive` call naming a static helper" reads as the present state, but the body says "Every binding still names a glue class". The title states the target. The body resolves it, but the title alone misleads. Unclear wording.
- *"a loader beside its glue classes"*: this reads two ways. Either (a) a second loading route next to walk's glue-class loading, or (b) a loader class placed in `interpreter/glue/`. Unclear wording.
- *During the migration*: the compiled path is to "refuse a string that names no helper". While unmoved bindings still name glue classes, does the compiled path refuse them, so the interpreter's library fails to compile? Or does the refusal start only when every binding has moved? This bears on the step-by-step move. Unclear wording.
- *How walk calls a helper.* Walk's natives take the evaluator's boxed values (`references/interpreter.md`, "Natives"), but the helpers take plain Java values. The entry does not say how walk bridges the two. This is a missing design detail, not a language concept.
- *"At the parse"*: inside the parse phase, or as a step just after it? Minor.

---

## P-59 — walk chooses a coercion by the run-time value

**Decided:** Walk has no static types, so it picks a coercion by the value's run-time type. The specification and the compiled path pick it by the static type. The curator accepts this as a limit of the interpreter, and walk is not changed for it before the switch-over. A callout in `Specification/basic/conversions-coercions.tex` states the limit. Two expected-failure tests record it: `XXXCoercionStaticRungC` (the chapter's own printed example) and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker on its programs, walk uses the static coercions that the checker inserts. P-12 orders those two steps.

**Applies:** To walk only. The difference lasts until walk runs the checker.

**Requires:** Do not change walk's choice of coercion before the switch-over. Keep the two `XXX` tests as expected failures. Do not record the difference as a new gap.

**Unfinished:** Walk running the checker, and walk using the coercions the checker inserts. After that, presumably, the two `XXX` tests are promoted.

**Could not resolve:**
- *Between the switch-over and walk running the checker*: the body says walk is not changed "before the switch-over", but the title says the behaviour lasts "until it runs the checker". So it is unclear whether walk may be changed for coercions in the window after the switch-over and before the checker runs. Unclear wording.
- *Where "walk runs the checker" sits in the plan*: it is not among P-33's phases 3 to 6, and the entry only refers to P-12. Mild; unclear wording.

---

## P-84 — `RR64` arrays as unboxed `double[]`, with `nat` sizes in the types

**Decided:** This is one design with two halves:
- An `RR64` array is stored as an unboxed Java `double[]`.
- Array types keep the team's sizes as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks those sizes.

The sizes do not wait for the store. A staged plan in which a first store carries the sizes only as run-time fields was rejected. The grounds: a high-performance language cannot box array elements, the sizes are central to the team's design, and both halves follow the library's own patterns (P-27). The compiled checker already checks `nat` static parameters (F-67). The compiled path's `double[]` store waits, with the other array decisions, until after the switch-over. Among those is decision A: how an `RR64` array built through the library's generic array traits gets the `double[]` store (P-85). Today the class loader only renames the type parameter when it makes a generic instance's class, so no instance gets a `double[]` field. A loader that would give one, "way A4" of decision A, has not been measured (F-18).

**Applies:** To arrays on the compiled path. The `double[]` store applies to `RR64` elements.

**Requires:** Do not build a store that carries sizes only at run time. Keep the `nat` sizes in the array types. Do not build the `double[]` store before the switch-over. Do not assume way A4 works.

**Unfinished:** The `double[]` store, decision A and the other array decisions, and a measurement of way A4.

**Could not resolve:**
- *"The sizes do not wait"*: what remains to do on sizes, and may it be done before the switch-over? F-67 says the checker already checks `nat` parameters. P-85 says "only the work itself waits" for the array work. So it reads two ways: (a) size work goes ahead now, or (b) nothing is left on sizes and the sentence only rules out the staged plan. Unclear wording.
- *"way A4 of decision A"*: this names a list of ways (A1 to A4?) that the entry does not give; only A4 is described. Unclear reference.
- *"the library's generic array traits"*: the entry does not say which traits. The skill does not cover them. A library concept I lack.

---

## P-85 — three open questions of the array design

**Decided:** Three questions of the compiled path's array design are open, with no default answer. They come back after the switch-over, together with decisions A, B and D:
1. Does the array factory choose a store for each element type?
2. Does the store also keep the size as a run-time field, in addition to the size in the type?
3. Does a factory for a size known only at run time return the unsized `Array[\E,I\]`, whose type holds no size?

These are separate from A (how an `RR64` array made through the generic array traits gets the `double[]` store, P-84), B (where unboxed arithmetic happens) and D (the sizes in microGPT's own types, P-87). All the preparation for the array work is to be done before the switch-over; only the work itself waits.

**Applies:** To the compiled path's array design.

**Requires:** Do not assume an answer to any of the three questions. Do not build the array work before the switch-over. Do finish the preparation before it.

**Unfinished:** Answers to the three questions and to A, B and D, the array work itself, and the preparation.

**Could not resolve:**
- *"The whole preparation for the array work"*: the entry does not say what counts as preparation (probes, measurements, write-ups for the curator?) as opposed to the work itself. So a worker cannot tell what to do now. Unclear wording.
- *"decisions A, B and D"*: there is no C, and the entry does not say whether C was decided or dropped, or whether it is one of the three questions. Unclear reference. The same gap is in P-84.
- *"with no default"*: this reads two ways. Either (a) no worker may proceed on an assumed answer, or (b) the curator has no leaning. Both lead to the same action. Mild.
- *Question 2 against P-84*: P-84 rejects a store that keeps sizes *only* at run time, while question 2 asks about keeping them *also*. The two are consistent, but only on a careful reading. Not blocking.

---

## P-155 — the checker checks overloads of symbolic operators before the switch-over

**Decided:** Today the compiled checker's overloading check reads an operator only if its name is a word of capital letters, such as `MAX`. So `+`, `^`, `||`, the subscripts and the other symbolic operators pass unchecked. Before the switch-over, the check must read them by the same rules it applies to any function, so that the distance to the switch-over reaches zero with them checked. The grounds: the skip is a gap the team knew about, not a rule. The specification's appendix of proposed features (`Specification/appendices/future.tex:186-207`) calls the library's two subscript operators "not really a valid overloading". A zero reached with them unchecked would hide known errors. Each design the check needs goes to the curator before its rung, with the measurement from the probe (`perf-probes/symbolic-operators-2/REPORT.md`). The two designs that probe found are decided: P-156 (the subscripts' index bound) and P-157 (vectors stay additive groups, by a change to the checker's exclusion test). Ledger row 584 tracks the check and its rungs.

**Applies:** To the compiled checker's overloading check, before the switch-over.

**Requires:** Extend the check to symbolic operators under the ordinary rules. Do not treat the distance as zero while they are unchecked. Bring any further design to the curator, with its measurement, before the rung that needs it. Apply P-156 and P-157.

**Unfinished:** The check itself and its rungs, and any further designs.

**Could not resolve:**
- *"rung"*: a project term the skill does not define. It appears only in folder names (`rung-...`) and near "compile ladder". I read it as one step of staged work. Unclear term; this is project vocabulary, not a language concept.
- *"before the switch-over" against P-33*: is this work part of phase 3, which would mean phase 3 has not ended despite the skill's count-stage "total of 0"? Or is it a separate step before phase 4's natives? Unclear, across entries.
- *"the subscripts' index bound"*: the entry does not explain which bound this is (a bound on the subscript operator's index type parameter?). It is clear only through P-156. Unclear wording.
- *"the library's two subscript operators"*: the entry does not say which two (reading and assigning?). The skill has nothing on how subscript operators are declared. A language concept I lack.
