<!-- The clarity pass's corrections to chunk c2 (P-33, P-42, P-58, P-59, P-84, P-85, P-155), second round after the cold read and the check: each sentence that findings.md names, corrected from its ground, with every other sentence kept as POSITIONS holds it at 5da8144e4. -->

# Chunk c2: corrections from the findings

Only the sentences that a finding names change. Every other sentence is the text of POSITIONS at `5da8144e4`, word for word. Three findings need the curator's word and have no ground in the team's sources: P-58 (b), P-85 and P-155. Those entries keep their text, and each has a question. The cold read and the check found more faults in unchanged sentences. No finding names them, so they stay, and each entry lists them under "Left for a later pass".

## P-33

- P-33 **The work toward microGPT compiled follows the phases, in the order that the curator approved.** These phases are steps of the work, not the compiler's phases, and they are numbered 3 to 6, after two earlier ones. Phase 3 ends when the compiled checker reports no error on the apis and components of the interpreter's library that the distance to the switch-over counts (F-53 defines the distance, says what it counts and holds its value). The library's other components are not part of phase 3; F-290 counts their errors. Phase 4, the switch-over: first the natives, the library's `builtinPrimitive` bindings made to run on the compiled path, then the compiled path reads the interpreter's library and the compiler's prelude is deleted; phase 5, microGPT compiles: its static types, the array design and the code generator's open gaps; phase 6, microGPT runs fast. Code-generator work goes on beside that order, under either library (P-37). Row 320, an api implemented by a component of another name does not link, is part of the switch-over's design.

Meaning: one change, from the finding. The old text said that phase 3's checker "reports no error on the interpreter's whole library". The distance counts only some apis and components of that library (F-53). The new text limits phase 3 to them, and a new sentence says that the other components are outside phase 3. The sentence states phase 3's end condition; whether phase 3 has ended is not the entry's to say.

Sources:
- The scope of the zero: F-53 ("its twelve apis and their twelve components"). The entry gives no count, since the record disputes it (first question below) and F-53 owns it.
- The end condition: the plan that he approved made phase 3 "the checker at a true zero" (scout report P-33, section 5).
- The other components: F-290 measures them outside the twelve. The curator agreed that the plan never meant them for phase 3: his "Of course" of 2026-10-26T04:47:50Z, to the coordinator's "the word 'whole' is wrong" (`conversations/02-phase3-exit-foundations.md`, section 4). In the same message his goal is "the fuller Fortress library that the interpreter uses"; P-37 holds that goal, so this entry does not repeat it.
- "Phase 4, the switch-over:" now opens a sentence, because a new sentence stands before it. Its words are unchanged.
- The other sentences: the text at `5da8144e4`.

Questions for the curator:
- `List` imports `CovariantCollection` and `OneShotFlag`. The distance checks them only as apis, and the compiled checker refuses them as components (F-288). Do these two components belong to phase 3's zero? The coordinator's note of 2026-10-26 counts fourteen components for phase 3. F-53 still counts twelve.
- Under which setting must phase 3's zero hold? The distance runs with the extends-`Object` setting off, as walk does. Under the compile command's own setting, the same components give 685 errors (F-289). The foundations judgement restates phase 3's exit under the compile command's setting (tenet 6).
- When must the other components reach zero? The coordinator's view, which you have not confirmed, is that they do not block the switch-over, but block P-12's step, in which walk runs the checker.

Left for a later pass: "Code-generator work goes on beside that order" reads against phase 5's "the code generator's open gaps"; P-37 says that work on the code generator may go on in any phase. The reader could not tell whether row 320 is to be fixed in phase 4 or only taken into account, nor how strict the order is. Phases 1 and 2 are not named.

## P-42

- P-42 **A type parameter declared without a bound has the implicit bound `Any`, not `Object`.** `Any` holds tuples and `()`, which `Object` does not. The library instantiates its generic containers at tuple types: `zip`, for one, gives a `ZeroIndexed[\(E,F)\]`. The specification states the bound `Any`, with a callout that records that the Working Draft of February 2011 said `Object`. Why: the type group's paper (Park, Hong, Steele and Ryu, POPL 2019) gives every type parameter the default upper bound `Any`, and the Working Draft itself says that type parameters are instantiated with tuple and arrow types. The compiled path departs from the rule: its commands, `fortress compile` among them, set the bound `Object` (`Shell.useCompilerLibraries()`), and so refuse a generic instantiated at a tuple (row 412). The switch-over does not end this departure by itself; only a change of that setting does (F-289 counts the errors that the distance shows under today's setting). Under either bound, the compiled path still fails on `()` (row 339) and on a generic dotted method whose only parameter has a tuple type (row 832).

Meaning: four changes, from findings (a) to (d).
- (a) "functions" is out of the second sentence. The team's texts disagree on functions. The Working Draft lists "tuple types, arrow types, (), and Object" as the immediate subtypes of `Any` (`Specification/basic/types-vals-vars.tex:152`). The Types chapter of 2012 makes `Object` "a supertype of every trait type, arrow type and function type" (`Documentation/Specification/Prose/Language/types.tick:232-235`). Both texts agree that `Object` excludes `()` and every tuple type (`:236`). His yes rested on the library written under `Any` ("So yes, we go with any, because that's the status quo.", 2026-09-29T13:57:39Z).
- (b) The old text said "The compiled path departs from it until the switch-over, which ends the departure: while it uses the compiler's prelude, it bounds such a parameter by `Object`". That is false. `Shell.useCompilerLibraries()` sets the bound (`ProjectFortress/src/com/sun/fortress/Shell.java:372`, `setExtendsObjectPreDesugaring(true)`); `compile`, `link`, `build` and `typecheck` call it (row 412). The switch-over does not change it by itself (F-289). The last sentence comes from the same finding: `()` and the dotted method of row 832 fail under both bounds (F-291).
- (c) The "Why" is new. It gives the two grounds in the team's texts that the finding names: the POPL 2019 paper, "By default, each type parameter has an upper bound Any" (`research/extracts/ParkPOPL2019.txt:418`), and the Working Draft's sentence "Type parameters are instantiated with types such as trait types, tuple types, and arrow types" (`Specification/basic/trait-parameters.tex:68`; frozen copy `:53`). The library's practice is already the entry's third sentence.
- (d) The example "its arrays indexed by pairs, such as `(ZZ32,ZZ32)`" is out. Since P-156, every index parameter is `I extends Index` (`Library/FortressLibrary.fsi:1290`), so that example no longer rests on the implicit bound. Element types still do: `zip[\F\](g:ZeroIndexed[\F\]):ZeroIndexed[\(E,F)\]` (`:1364`) is a method of `ZeroIndexed[\E\]` (`:1361`), whose `E` has no bound.

Sources of the other sentences: the text at `5da8144e4`.

Question for the curator: none. Each change rests on a line of the team's texts or of the code. When the setting changes is not this entry's to say; row 412 tracks it.

Knock-ons, for the coordinator:
- The specification's callout says the divergence "lasts until the compiled path is switched over to the interpreter's library" (`Specification/basic/trait-parameters.tex`, the `revival-bound` revision). The `fortress-repo` skill's `compiler.md:69` says the compiled path rejects such generics "until the switch-over". Both are now wrong against this entry. Neither file is a record entry, so this pass does not change them.
- F-291's title says "a generic dotted method with one tuple-typed parameter"; row 832's words, "whose single parameter has a tuple type", are not ambiguous.

## P-58

- P-58 **Every native binding is a `builtinPrimitive` call naming a static helper.** A native binding is a library body that is exactly `builtinPrimitive("…")`, the library's own form, and it keeps that form. Why: the language defines no foreign-function interface; the Working Draft names one only in its appendix of proposed features. So the form of a binding is outside the language, and the library's own practice decides it (P-27). Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of a glue class of walk, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper. The bindings move onto helpers step by step, and from the step that moves a binding, the compiled checker checks it against the helper's Java signature, not all at once at the switch-over. The other form, `import java` declarations written in the library itself, is not taken. Every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`.

Meaning: one change, from finding (a). The entry had no reason. The first text of 2026-10-10 gave one, that the specification prints `builtinPrimitive`'s declaration; the review found that ground weak, since it holds only through the library api that the specification includes. The new "Why" gives the ground that the finding names: the Working Draft has no foreign-function interface, so the choice is outside the language, and the library's practice decides.

Sources:
- The "Why": finding (a), from the Working Draft's appendix "Proposed Features", "technical issues that are proposed but not yet fully discussed" (`Specification/appendices/future.tex:12-16`), which lists "foreign function interface" under "Native stuff" (`:706-708`; frozen copy `:673-675`); and F-32. P-155 names the same appendix "the specification's appendix of proposed features". The file path is in the note line, not in the entry.
- The pointer to P-27 holds under today's P-27 and under chunk c1's pending text, which limits P-27 to how the library is extended and keeps it out of designs of the language; a native binding's form is not one.
- The other sentences: the text at `5da8144e4`.

Question for the curator, from finding (b): your yes to this form (2026-10-10T05:27:34Z, "Item 35, agreed with recommendation, option 1") came after you wrote "I have no intuition for deciding between the two forms" (2026-10-09T23:12:54Z). On 2026-10-22T22:02:17Z you wrote: "I don't recall my decision asking for static methods so I am unable to make fully informed decision from this fragment". Climb batch 23 moves the bindings; after it, the other form costs a sweep of the library's 449 bindings. Do you confirm `builtinPrimitive` naming a static helper, with this reason, before that batch? The entry keeps its text until you answer.

Left for a later pass:
- "a loader beside its glue classes" means a second loading route, beside the one that loads the glue classes (scout report P-58, section 2; row 796). A proposed wording: "Walk is to load a string that names a helper through a second loader, beside the one that loads its glue classes."
- "to refuse a string that names no helper" is broader than its source. The probe refuses only a string under `com.sun.fortress.nativeHelpers.` that names no static method, and leaves walk's glue strings alone (`perf-probes/prelude/natives-binding-probe.md:85`).

## P-59

- P-59 **Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over.** Walk has no static types. So where a coercion is needed, walk chooses it by the value's run-time type. The specification and the compiled path choose it by the static type. The curator accepts this as the interpreter's limit, and walk is not changed for it before the switch-over. A callout in the coercion chapter (`Specification/basic/conversions-coercions.tex`) states the limit. Two expected-failure tests record it: `XXXCoercionStaticRungC`, the chapter's own printed example, and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker on its programs (P-12 orders the two steps), it uses the static coercions that the checker inserts.

Meaning: one change, from the finding. The last sentence is out: "MicroGPT's static types are concrete, each the type of the value itself and not a trait above it, so on microGPT walk's choice and the static choice agree." It was the coordinator's premise on the page that the curator answered on 2026-09-29 ("item seven as recommended. So one now and two after the switch.", 14:07:20Z), not the option he took. Nothing measured it, and nothing can until microGPT compiles. Review-queue item 221 holds it as a premise to measure.

Sources: the other sentences, the text at `5da8144e4`, word for word.

Question for the curator: none.

Left for a later pass: "P-12 orders the two steps" has two readings. P-12's title settles it: after the switch-over, walk first runs the checker, then uses its coercions. A proposed wording: "(P-12: after the switch-over, walk first runs the checker, then uses its coercions)".

## P-84

- P-84 **An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types.** Why: a high-performance language cannot box its array elements, and the sizes are central to the team's design. So the storage and the sizes are one design: the sizes stay in the array types as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them. The sizes do not wait while a first version of the store carries them only as run-time fields; that layered plan was rejected. Both halves follow the library's own patterns (P-27, the library's own practice is the standard). The compiled checker checks `nat` static parameters (F-67). The compiled path's `double[]` store waits with the other array decisions until after the switch-over; among them is decision A, how an `RR64` array made through the library's generic array traits gets that store (P-85). The class loader, as it makes a generic instance's class, only renames the type parameter, so it gives no instance a `double[]` field; a loader that would, way A4 of decision A, is unmeasured (F-18).

Meaning: one change, from the finding. A new last sentence says that the class loader's stamping alone gives no `double[]` field and that way A4 is unmeasured. F-18 holds both facts and its evidence, so the sentence points to it.

Sources:
- The new sentence: F-18 ("the rewriting only renames, so it gives no instance a `double[]` field"; the A4 loader "does not exist and is unmeasured"); `coordinator/array-design.md`, section 2, probe 1; `reviews/array-design-ways.md`, section 3, way A4. The curator was told both on 2026-09-19 ("stamping only renames") and on 2026-09-24 ("unboxing will build on it"). Both hold, since A4 is unmeasured; F-18 states them in one place.
- The other sentences: the text at `5da8144e4`.

Not done: the finding also names "the unboxing words of P-17". The judgement's default for that tenet adds the language's own grounds for unboxing, `objects.tex:38` and `binary.tex:80`. Chunk c1 puts them into P-17, which already points to P-84, so P-84 does not repeat them.

Knock-on, for the coordinator: the gloss "(P-27, the library's own practice is the standard)" quotes P-27's old title. Chunk c1 retitles P-27 "Whoever extends the library follows the library's own practice." No finding of this chunk names the gloss, so it stays. Change it when c1's P-27 lands.

Question for the curator: none.

Left for a later pass:
- The title's "arrays keep the team's `nat` sizes in their types" may read as every array; P-85's third question, an unsized array for a size known only at run time, is open. His decision of 2026-09-19 would settle the scope.
- "the other array decisions" does not say which. They are decisions A, B and D (P-85); decision C, the library that the array layer goes into, is a separate fork (`reviews/array-design-review.md`, section 3).

## P-85

- P-85 **The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D.** The array design is the compiled path's design for arrays. The three questions: whether the array factory chooses a store for each element type; whether the store also keeps the size as a field, beside the size in the type; and whether a factory for a size known only at run time returns the unsized `Array[\E,I\]`, whose type holds no size. These questions are apart from decisions A, B and D: decision A is how an `RR64` array made through the library's generic array traits gets the `double[]` store (P-84), B is where unboxed arithmetic happens, and D is the sizes in the model's own types (P-87). The whole preparation for the array work is to be done before the switch-over; only the work itself waits.

Meaning: unchanged. The text is unchanged.

Sources: the text at `5da8144e4`. The finding names a missing lean of the curator's. A lean is not a decision, so it needs his word before it can enter a position.

Question for the curator: on 2026-09-20T14:33:50Z you wrote: "Okay, I'm not sure I can unblock this, but I will just quickly react. And you either hold it or you decide to take some action with this. So specializing in the class loader is the team's direction. So I don't know why that would be in question. I would try to pursue the team's direction unless we have a clear reason not to go there." The coordinator answered "Recorded as your leans, to confirm" (14:34:56Z), but no entry holds the lean. Is it your decision for decision A, the class loader's way (way A4, unmeasured, F-18)? Or does it stay a lean, held with the array decisions in the review queue? If it is a decision, P-85 gains one sentence: "For decision A, the curator takes the team's direction, the class loader's way, unless a clear reason against it appears."

Left for a later pass:
- "The whole preparation for the array work": his words are "I think we should do the whole prep for the arrays" (2026-09-22T05:21:45Z). They leave open what the preparation covers; that needs his word.
- "These questions are apart from decisions A, B and D": the first question, a store for each element type, overlaps ways A1 and A2 of decision A (`reviews/array-design-ways.md`, section 3).
- Decision C is not named; B does not say where the arithmetic would happen.

## P-155

- P-155 **The compiled checker checks the overloads of symbolic operators before the switch-over.** Today its overloading check reads an operator only if its name is a word of capitals, such as `MAX`, so `+`, `^`, `||`, the subscripts and the other symbolic operators pass unchecked. The check must read them by the rules that it applies to any function, so that the distance to the switch-over reaches zero with them checked. Why: the skip is a gap that the team knew, not a rule: the specification's appendix of proposed features calls the library's two subscript operators "not really a valid overloading" (`Specification/appendices/future.tex:186-207`, its item on array indexing). A zero with them unchecked would hide known errors. Each design that the check needs is brought to the curator before its rung, with the probe's measurement (`perf-probes/symbolic-operators-2/REPORT.md`); the two it found are decided: P-156, the subscripts' index bound, and P-157, vectors that stay additive groups by a change to the checker's exclusion test. Row 584: the check and its rungs.

Meaning: unchanged. The text is unchanged.

Sources: the text at `5da8144e4`. The finding is that climb batch 22c reads this entry as covering a second check, and that only the curator can say whether it does.

Question for the curator: this entry speaks of the overloading check, and that half is built: row 584 is fixed, and the overloading check now reads every symbolic operator (`108ab82d6`, 2026-10-23). The export check is a different check: it compares a component's top-level declarations with its api's. It still skips every top-level symbolic operator, which hides 9 real differences between api and component (row 782). Climb batch 22c reads P-155 as covering the export check too. Does P-155 require the export check to read the symbolic operators as well? If yes, the title and the rule name both checks.

Left for a later pass: the second sentence, "Today its overloading check reads an operator only if its name is a word of capitals", is stale since row 584 was fixed. An entry states the present. A proposed wording: "The compiled checker's overloading check reads the symbolic operators, such as `+`, `^`, `||` and the subscripts, by the rules that it applies to any function, so that the distance to the switch-over reaches zero with them checked (row 584)." The answer to the question above decides whether the export check joins that sentence.
