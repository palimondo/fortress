<!-- Chunk c2 of the foundations rewrite, 2026-10-26, after the fix round: the clean texts of P-33, P-12, P-59, P-17, P-84, P-85 and P-58, each with its changes of meaning, the source of each sentence, the sentences that depend on an open answer of the curator, and questions for him. -->

# Chunk c2: P-33, P-12, P-59, P-17, P-84, P-85, P-58

Sources named below:

- "the judgement": `explorations/reviews/foundations/judgement.md`, with its section and item.
- "the evidence": `explorations/reviews/foundations/tenets-evidence.md`, with its tenet.
- "the scout": the provenance audit's evidence that `entries.py N` prints for the entry.
- "the check": `check.md` in this folder; "the cold read": `cold-read.md`.
- "old text": the entry as the record holds it now.

A sentence marked **from the judgement, for his yes** states a ground or a rule that the judgement gives and that the curator has not yet seen as entry text. It is written as the entry's ground, never as his reason. Each entry points to P-26 for the three layers, which chunk c1 defines there.

## P-33

- P-33 **The work toward microGPT compiled follows the phases, in the order that the curator approved.** These phases are steps of the work, not the compiler's phases, and they are numbered 3 to 6, after two earlier ones. The order's ground is in the team's implementation on the JVM (P-26 defines the layers): the compiled path runs the checker first, and code generation and the run time after it, and the natives define the switch-over. Phase 3: the compiled checker reports no error and no crash over the fourteen components, which are the distance stage's twelve and the two that `List` imports, `CovariantCollection` and `OneShotFlag` (F-53 defines the distance and holds its value). The zero counts only when the distance stage runs under the setting of `fortress compile` itself (F-289), once that command sets the bound `Any` (P-42), and with the export check comparing the top-level symbolic operators, which it skips today (row 782, P-155), and requiring each `abstract` member of an api in its component (P-158). Phase 4, the switch-over: first the natives, the library's `builtinPrimitive` bindings made to run on the compiled path; then the compiled path reads the interpreter's library, and the compiler's prelude is deleted. The switch-over needs two zeros over the fourteen (P-37): the checker's, which phase 3 brings, and the code generator's, which phase 4 brings. The code generator's half was unmeasured when the curator approved the order; it now refuses 52 declarations of the twelve that the checker passes (F-34). The library's 38 other components, outside the fourteen, do not block the switch-over (F-290 counts the errors of the 40 outside the twelve, `List`'s two imports among them): each is cleared before the step at which walk runs the checker (P-12), or before the first program that needs it. Phase 5, microGPT compiles: its static types, the array design and the code generator's open gaps; phase 6, microGPT runs fast. Code-generator work goes on beside that order, under either library (P-37). Row 320, an api implemented by a component of another name does not link, is part of the switch-over's design. Still to build: climb batch 22c, which closes phase 3 with four rungs: the bound, the operators, the `abstract` members and `List`'s two imports.

**Meaning: changed, as the judgement asks (section 2, tenet 6; section 5; section 7, P-33).**

1. New: the layer of the order's ground, and its three steps (judgement tenet 6, "Sound reason, L2 (a work plan)"). Worded so that "gate" does not clash with the skill's **gate** (the check, wording 4). **From the judgement, for his yes.**
2. Phase 3: "the compiled checker reports no error on the interpreter's whole library" becomes "no error and no crash over the fourteen components", counted when the distance stage runs under the compile command's own setting (F-289), with the bound `Any`, the export check comparing operators that it skips today, and `abstract` members required (behaviour 1; judgement section 5, "Its exit gate", "`#crash none`", and the four rungs; the curator's framing of 2026-10-26 07:30 UTC). "Whole" was wrong: the curator, 2026-10-26 04:47 UTC, "Of course", to "The plan never meant to include them, so the word 'whole' is wrong." "Fourteen", not the judgement's "thirteen": the rewrite brief corrects the count (`tools/distance/run.sh:85-87` lists twelve, checked). **From the judgement, for his yes**; the judgement marks it his ("reads anew P-33's exit", tenet 6).
3. New: the two zeros over the fourteen, the checker's brought by phase 3 and the code generator's by phase 4 (behaviour 2; judgement section 5, the checker's zero "brought forward", "the code generator's zero stays phase 4's"). **From the judgement, for his yes.**
4. New: the code generator's half unmeasured at approval, 52 refusals over the twelve now (behaviour 4; judgement tenet 6; F-34, which counts over the twelve). **From the judgement, for his yes.**
5. New: the 38 other components outside the fourteen placed before P-12's step or the first program that needs each (behaviour 3; judgement tenet 6; the dialogue section 4, "My view, his to confirm"). The judgement and the rewrite brief write "the 40", but F-290's 40 are outside the twelve and include `CovariantCollection` and `OneShotFlag`, which phase 3 now counts; outside the fourteen there are 38 (the check, P-33, "Uncertain fidelity, settled"). **From the judgement, for his yes**, and open answer 2.
6. New state line: climb batch 22c closes phase 3 with its four rungs (judgement section 5; open answer 1). **From the judgement, for his yes**; the judgement marks it his ("Consequential; his", section 5).

**Sources of each sentence.** First two sentences, phases 5 and 6, the code-generator sentence and row 320: old text. The layer sentence: judgement tenet 6. Phase 3: judgement section 5; the rewrite brief for the fourteen; F-289 for the setting; P-42, P-155, P-158 and ledger row 782 ("skips every top-level symbolic operator") for the three conditions. Phase 4's first sentence: old text. The zeros and the 52: judgement section 5, F-34. The 38: judgement tenet 6, F-290, `zero-audit.md` A.2 as the check reads it. The four rungs: judgement section 5.

**Depends on an open answer.**

- Answer 1: if phase 3 does not close with 22c and the fourteen, phase 3 reads as the old text with "whole" replaced by "the twelve components of the distance stage", the three conditions stay as the exit's terms, the 38 become the 40, and the state line is dropped.
- Answer 2: if the other components block the switch-over, the sentence on them becomes "The library's 38 other components, outside the fourteen, must also reach both zeros before the switch-over (F-290 counts the errors of the 40 outside the twelve)."

**Question for the curator.** None beyond the open answers. For the coordinator: c1's P-37 says "P-33 places the library's other 40 components"; under this entry that should read "the library's other components".

## P-12

- P-12 **After the switch-over, walk runs the compiled type checker on its programs, and then uses the static coercions that the checker inserts.** The curator wants the checker usable on the programs that walk runs. Today `fortress typecheck` checks a program only against the compiler's prelude, so it is no check of walk's programs (F-9 holds this fact). Walk is not changed for this, or for any other matter that needs the static types that the checker infers, until it runs the checker after the switch-over. After it, walk runs the checker on its programs and so gains their static types. Walk then uses the static coercions that the checker inserts, in place of its choice on the run-time value (P-59, walk's choice of coercions until the switch-over). The ground is in the language (P-26 defines the layers): Fortress is statically typed, and it chooses a coercion by the static type. Walk, in the team's implementation, has no static types. The step has three pieces, and its size is unmeasured. First, the Scala checker is turned on under walk: walk runs with Scala off, and with Scala off `StaticChecker.java` stops with "The Java version of the type checker is gone now." Second, walk learns to evaluate the `CoercionInvocation` nodes that the checker inserts; it has no case for them today. Third, the components that walk's programs import are cleared of the checker's errors, each before this step or before the first program that needs it (P-33 places them; F-290 counts 624 errors in the 40 components outside the twelve).

**Meaning: changed, as the judgement asks (section 2, tenet 9; section 7, P-12 and P-59).**

1. "Walk is not changed for this before the switch-over" becomes "for this, or for any other matter that needs the static types that the checker infers, until it runs the checker after the switch-over" (behaviour 2). The scope and the window are J1023 V3's: "P-12 and P-59 leave walk unchanged, before it runs the checker after the switch-over, where the matter is one of static types that walk does not have" (`reviews/type-decisions-review/judgement.md:46`). Walk's reading of declared types and static parameters is outside it; the revival has landed such work (`743eb5286`, `6d187d069`, `5262a2412`, as the check lists). **From the judgement, for his yes.**
2. New ground in the language, and the implementation's fact (judgement tenet 9, "Sound reason"). **From the judgement, for his yes.**
3. New: the three pieces and "its size is unmeasured" (behaviour 1; judgement tenet 9, "Where the entry misstates"). Checked: `Shell.java:422` sets Scala off for walk; `StaticChecker.java:228-229` throws "The Java version of the type checker is gone now." when Scala is off; no file under `interpreter/` names `CoercionInvocation`. The third piece now says when each component is cleared, as P-33 does, and counts F-290's 40 as outside the twelve (the check, P-12). **From the judgement, for his yes.** The curator once called the checker under walk "one of the lower hanging fruit" (2026-09-15 10:42 UTC); the old text no longer said so, and the new text says the size is unmeasured. The judgement's fourth point, that walk would take the checker's own departures (rows 470, 731), is left out to keep the entry short.

**Sources of each sentence.** First two sentences, the fourth and the fifth: old text. The third: old text, with point 1. The ground: judgement tenet 9 (`philosophy.tex:14`, `conversions-coercions.tex`). The three pieces: judgement tenet 9; `StaticChecker.java`; F-290 for the 624.

**Depends on an open answer.** Answer 2: if the other components are cleared before the switch-over, the third piece reads "Third, the components that walk's programs import are already cleared, since the switch-over needs them."

**Question for the curator.** Should the entry also name the checker's own departures that walk would take (rows 470 and 731)?

## P-59

- P-59 **Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over.** Walk has no static types. So where a coercion is needed, walk chooses it by the value's run-time type. The specification and the compiled path choose it by the static type. The curator accepts this as the interpreter's limit, and walk is not changed for it before the switch-over. A callout in the coercion chapter (`Specification/basic/conversions-coercions.tex`) states the limit. Two expected-failure tests record it: `XXXCoercionStaticRungC`, the chapter's own printed example, and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker on its programs (P-12 orders the two steps), it uses the static coercions that the checker inserts. The coordinator's premise, read and not measured, is that microGPT's static types are concrete, each the type of the value itself and not a trait above it, so that on microGPT walk's choice and the static choice agree; measure it when microGPT compiles.

**Meaning: changed in one sentence, as the judgement asks (section 2, tenet 9; section 7, P-12 and P-59, behaviour 3).** The old last sentence, "MicroGPT's static types are concrete, ... so on microGPT walk's choice and the static choice agree.", becomes a premise of the coordinator's, read and not measured, to be measured when microGPT compiles; one sentence now, so that the claim is never read alone (the check's optional wording). Its origin is `reviews/decisions-review/judgement.md:263`, `:356`, a reading with nothing run (P-59's scout, section 2); the judgement calls it "the coordinator's premise, unmeasured (rq 221)". **From the judgement, for his yes.** The rest is the old text, unchanged.

**Sources of each sentence.** All but the last: old text. The last: old text's claim, and judgement tenet 9 for its status.

**Depends on an open answer.** None.

**Question for the curator.** None.

## P-17

- P-17 **Unboxed doubles and arrays of unboxed doubles are required: without them the revival misses its point.** Why: a language meant for high performance cannot box its numbers. The ground in the language, beside the curator's reason (P-26 defines the layers): an implementation may freely copy value objects, which include floating-point numbers and integers (`Specification/basic/objects.tex`), and a `LinearSequence` of a value type "describes a sequence of 'unboxed' values" (`Specification/advanced-lib/binary.tex`). Today the code generator boxes every number: an `RR64` value is an object of the class `FRR64`. In Java models of microGPT's three array kernels, the dot product, the matrix product and the row lift, boxing is the main cost (F-11 holds the measurement). How arrays store doubles, as `double[]`, is P-84's decision.

**Meaning: changed, as the judgement asks (section 2, tenet 7; section 7, P-17 and P-84, behaviour 1).** New sentence after the "Why": the language's own statement of the unboxing intent, `objects.tex:38` (value objects may be freely copied; `:39-43` names floating-point numbers and integers among them) and `binary.tex:76-82` (checked in the frozen copy; both files exist in `Specification/`). It opens "The ground in the language, beside the curator's reason", so that it is not read as a reason he took: he was never shown these texts (the evidence, tenet 7 (e); the check, P-17). **From the judgement, for his yes.** The curator's reason stays his: "If this should have been high performance language, it cannot be boxed." (2026-09-19 18:32 UTC).

**Sources of each sentence.** All but the new one: old text. The new one: judgement tenet 7; the evidence, tenet 7 (c).

**Depends on an open answer.** None.

**Question for the curator.** None.

## P-84

- P-84 **An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types.** Why: a high-performance language cannot box its array elements (P-17 gives the language's grounds), and the sizes are central to the team's design. So the storage and the sizes are one design: the sizes stay in the array types as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them. The sizes do not wait while a first version of the store carries them only as run-time fields; that layered plan was rejected. Both halves follow the library's own patterns (P-27, the library's own practice is the standard). The compiled checker checks `nat` static parameters (F-67). The compiled path's `double[]` store waits with the other array decisions until after the switch-over; among them is decision A, how an `RR64` array made through the library's generic array traits gets that store (P-85). Stamping (P-26) alone gives no `double[]` field: the class loader's class for an instantiation only renames the type parameter, so its element stays a boxed object (a probe of `explorations/coordinator/array-design.md`, section 2). A way through the class loader needs new work in the loader and the code generator, way A4 of `explorations/reviews/array-design-ways.md`, which nobody has built or measured; P-85 holds the curator's lean toward it.

**Meaning: changed, as the judgement asks (section 2, tenet 7; section 7, P-17 and P-84, behaviours 2 and 3).**

1. Stamping alone gives no `double[]` field (`array-design.md:45`: "Stamping renames; it cannot change a representation ... `[D` is not a class name"). This is the statement of 2026-09-19. The statement of 2026-09-24, that "unboxing will build on" stamping, is consistent with it only through new work, which is how the next sentence states it (judgement tenet 7, "both can be true"). "Stamping" points to P-26, which defines it. **From the judgement, for his yes.**
2. Way A4 needs new work in the loader and the code generator and is unbuilt and unmeasured (`reviews/array-design-ways.md:137`: "The largest change, in the loader and the code generator; nothing of it exists and no probe has been run"), and P-85 holds his lean (open answer 4). **From the judgement, for his yes.**
3. A pointer in the "Why": "(P-17 gives the language's grounds)". The judgement's behaviour 1 for P-84 (the two citations of the language) is met in P-17, which this now names; repeating them here would state a fact twice.

**Sources of each sentence.** All but the pointer and the last two sentences: old text. The last two: judgement tenet 7; the evidence, tenet 7; the two notes above.

**Depends on an open answer.** Answer 4: if the lean is not recorded, the last clause "; P-85 holds the curator's lean toward it" is dropped.

**Question for the curator.** None.

## P-85

- P-85 **The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D.** The array design is the compiled path's design for arrays. The three questions: whether the array factory chooses a store for each element type; whether the store also keeps the size as a field, beside the size in the type; and whether a factory for a size known only at run time returns the unsized `Array[\E,I\]`, whose type holds no size. These questions are apart from decisions A, B and D: decision A is how an `RR64` array made through the library's generic array traits gets the `double[]` store (P-84), B is where unboxed arithmetic happens, and D is the sizes in the model's own types (P-87). For decision A, the curator leans toward the class loader, the team's own direction, unless a clear reason appears; this is a lean to confirm, not a decision, and that way is unmeasured. The whole preparation for the array work is to be done before the switch-over; only the work itself waits.

**Meaning: one sentence added, as the rewrite brief asks; the rest unchanged.** New sentence: "For decision A, the curator leans toward the class loader, the team's own direction, unless a clear reason appears; this is a lean to confirm, not a decision, and that way is unmeasured." Sources: the curator, 2026-09-20 14:33 UTC: "So specializing in the class loader is the team's direction. So I don't know why that would be in question. I would try to pursue the team's direction unless we have a clear reason not to go there."; the coordinator's reply, 14:34:56 UTC, "Recorded as your leans, to confirm: for the unboxed store, the team's own direction, the class loader, unless a clear reason appears" (the evidence, tenet 7 (b)); judgement section 9, item 6. "That way is unmeasured": `array-design-ways.md:137`. The cold reader's other questions on P-85 (the array factory, decision C, what counts as preparation) concern text that this run leaves as it is.

**Depends on an open answer.** Answer 4: if not recorded, the sentence is dropped and P-85 stays as it is.

**Question for the curator.** The lean, to confirm (judgement section 9, item 6).

## P-58

- P-58 **Every native binding is a `builtinPrimitive` call naming a static helper.** A native binding is a library body that is exactly `builtinPrimitive("…")`, the library's own form, and it keeps that form. Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of a glue class of walk, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper. The bindings move onto helpers step by step, and from the step that moves a binding, the compiled checker checks it against the helper's Java signature, not all at once at the switch-over. The other form, `import java` declarations written in the library itself, is not taken. The ground: the language has no foreign-function interface, which the Working Draft lists only among proposed features (`Specification/appendices/future.tex`). So the form of a binding belongs to Java interoperability (P-26 defines the layers), and the library's own practice decides it (P-27): every binding in the library is a `builtinPrimitive` call. The specification prints `builtinPrimitive` only inside the included library api, whose comment describes walk's mechanism; that is no ground. The choice is cheap to undo only until the bindings start to move onto helpers, which climb batch 23 begins; after that, the other form costs a sweep of the library. Every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`.

**Meaning: changed, as the judgement asks (section 2, tenet 8; section 7, P-58).** Four sentences added before the state sentences.

1. The ground, in two sentences: the language has no foreign-function interface, and the Working Draft lists one among proposed features (`Specification/appendices/future.tex:708`, under "Native stuff", in the appendix headed "Proposed Features" at `:12`; checked); so the binding form is a matter of Java interoperability, decided by the library's practice, P-27 (behaviour 1). **From the judgement, for his yes.** The old text already called `builtinPrimitive("…")` "the library's own form"; the new text makes that the ground.
2. The specification prints `builtinPrimitive` only through the included library api, whose comment describes walk's mechanism; no ground (behaviour 2; the evidence, tenet 8 (c): `FortressBuiltin.fsi:14-29`). The first text of the entry (2026-10-10) gave that ground; the current text does not, so this sentence guards against its return. **From the judgement, for his yes.**
3. The window: cheap to undo only until the bindings start to move, which climb batch 23 begins (behaviour 3; judgement tenet 8, "after 449 bindings move the other form costs a library sweep", and "before climb batch 23"). **From the judgement, for his yes.**

The rewrite brief notes that the curator's informed yes to P-58 is owed before climb batch 23. The entry states no status, so that is not in the text.

**Sources of each sentence.** All but the four new ones: old text. The new ones: judgement tenet 8; the evidence, tenet 8 (c); `zero-audit.md`, Part C item 3, for batch 23.

**Depends on an open answer.** None.

**Question for the curator.** His informed yes before climb batch 23 (judgement section 9, item 5).
