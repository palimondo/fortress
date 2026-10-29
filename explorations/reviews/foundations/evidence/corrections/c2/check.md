<!-- The clarity workflow's check of chunk c2's corrections (P-33, P-42, P-58, P-59, P-84, P-85, P-155): each changed sentence against POSITIONS at 5da8144e4, the grounds in findings.md and the curator's messages, and the cold reader's answers against the source meaning. -->

# Check of chunk c2

Read: `proposals.md`, `clean.txt`, `proposals.apply`, `concepts.md`, `cold-read.md` and `findings.md` in this folder; POSITIONS at HEAD (last change `5da8144e4`); `entries.py` for the seven entries and the audit's evidence (scout reports P-33, P-42, P-58, P-59, P-85; `judgement-c3` and `-c4`). From the foundations review: the judgement (tenets 4 and 6 to 9, sections 4, 5 and 7), `tenets-evidence.md` (tenet 7), the coordinator's `salvage-sort.md`, and the dialogue `conversations/02-phase3-exit-foundations.md`, sections 4, 6 and 9. F-18, F-32, F-53, F-67, F-287 to F-291. Ledger rows 320, 339, 412, 584, 782, 796, 832. In the tree: `Shell.java:371-455`, `Library/FortressLibrary.fsi:759`, `:1290`, `:1361-1364`, `Specification/basic/trait-parameters.tex:52-69` and its frozen copy `:49-54`, `types-vals-vars.tex:152` (frozen `:135`), `types.tick:232-237`, `Specification/appendices/future.tex:12-16`, `:700-710` (frozen `:673-675`), `research/extracts/ParkPOPL2019.txt:1-6`, `:418-419`, `perf-probes/prelude/natives-binding-probe.md:82-125`, `reviews/array-design-ways.md` section 3, and `108ab82d6` (`git show -s`). The coordinator skill's `references/record.md`, "What an entry is". His messages, through `show.py`.

I diffed each clean entry against POSITIONS word by word. Only the sentences listed below change. P-85 and P-155 are identical to the record. Each line of `proposals.apply` equals its line in `clean.txt`.

One point on scope first. The coordinator's sort (`salvage-sort.md`) puts P-42 (c), P-58 and P-84 under "Word for word". The writer corrected them anyway, as the writer brief asks for every sentence that a finding names. The curator rejected the sort: "No. None of this. I cannot decipher what you are proposing here." (2026-10-28T05:56:38.947Z). So the sort does not bind this pass, and the writer's choice stands.

## P-33

**Changes:** phase 3's sentence narrowed; one sentence added.

**Fidelity.**
1. "Phase 3: the compiled checker reports no error on the twelve apis and twelve components of the interpreter's library that the distance to the switch-over counts". The scope is right. F-53: "its twelve apis and their twelve components". His "Of course" (2026-10-26T04:47:50.485Z) answers "The plan never meant to include them, so the word "whole" is wrong". But the new sentence carries a count, and the record disputes that count: the dialogue, section 9, says "the right count is fourteen: the distance stage's twelve and `List`'s two imports" (F-288), and the writer's own first question asks the same. When that question is answered, the entry would have to change. F-53 owns the count. Class: wording. Proposed: "Phase 3 ends when the compiled checker reports no error on the apis and components of the interpreter's library that the distance to the switch-over counts (the distance at zero; F-53 defines it, says what it counts and holds its value)." This wording also answers comprehension point 1 below.
2. "The library's other components are not part of phase 3; F-290 counts their errors." Pass: his "Of course", and F-290's scope ("Outside the twelve").
3. The finding's plain text also names 22c as the batch that closes phase 3, the two zeros carried into phase 4, and the place of the other 38 components. These are the judgement's defaults for tenet 6, marked "His (reads anew P-33's exit)". The writer left the first two out and asked about the third. This is right: the entry grows only by what the scope correction needs. One point for the coordinator, outside this finding: the distance runs with the extends-`Object` setting off, and under the compile command's own setting the twelve give 685 errors (F-289). The judgement's default restates phase 3's exit "under the compile command's own setting" (tenet 6). The entry does not say which setting the zero is measured under. That needs his word, so it is a question for him, not entry text.

**Comprehension.**
- "(the distance at zero; ...)": the reader could not tell an exit condition from a present state. The source makes it the exit condition: the plan he approved made phase 3 "the checker at a true zero" (scout report P-33, section 5), F-53 gives zero at climb batch 22's gate, and phase 3 is still open until 22c lands (dialogue, section 6). Class: wording; the proposal in point 1 answers it ("Phase 3 ends when"). Knock-on: the `fortress-repo` core says "The compiled checker already finds no error in the interpreter's library" (`SKILL.md:79`). That is the same broad claim that the finding faults. It should name the apis and components that the distance counts.
- "distance to the switch-over": class: a concept the reader lacked. Chunk c1's `concepts.md` puts it in the `fortress-repo` core, beside the switch-over. I agree. The core must also tell it from the checker count, which checks only `FortressLibrary` (F-53). The reader mixed the two up.
- "Code-generator work goes on beside that order" against phase 5's "the code generator's open gaps": an unchanged sentence. P-37 settles it: the decision "does not stop work on the code generator, which is compiler work under either library". So work on the code generator may go on in any phase, and phase 5 needs its gaps closed. Class: wording, minor; outside this pass.
- Row 320, how strict the order is, phases 1 and 2: unchanged sentences, minor.

## P-42

**Changes:** findings (a) to (d): "functions" out; the example of arrays changed; a "Why" added; the departure sentence rewritten and one sentence added.

**Fidelity.**
- (a) "`Any` holds tuples and `()`, which `Object` does not." Pass. The two texts disagree on arrows: the Working Draft lists "tuple types, arrow types, (), and Object" as the immediate subtypes of `Any` (frozen `types-vals-vars.tex:135`; `Specification/basic/types-vals-vars.tex:152`), and the 2012 chapter makes `Object` "a supertype of every trait type, arrow type and function type" (`types.tick:232-235`). Both agree that `Object` "excludes Void and every tuple type" (`:236`). His yes rested on the library being written under `Any` ("So yes, we go with any, because that's the status quo.", 2026-09-29T13:57:39.332Z), not on functions.
- (d) "`zip`, for one, gives a `ZeroIndexed[\(E,F)\]`." Pass. Every index parameter is now `I extends Index` (`FortressLibrary.fsi:1290`), so the old example of arrays indexed by pairs no longer rests on the implicit bound. `zip` (`:1364`) is a method of `ZeroIndexed[\E\]` (`:1361`), whose `E` has no bound. One slip, in the source notes only: `proposals.md` places `zip` "in `Generator[\E\]`". The entry is not affected.
- (c) The "Why". Content: pass. POPL 2019: "By default, each type parameter has an upper bound Any" (`ParkPOPL2019.txt:418`); its authors are Park, Hong, Steele and Ryu (`:3-6`). The Working Draft: "Type parameters are instantiated with types such as trait types, tuple types, and arrow types" (frozen `trait-parameters.tex:53`, today `:68`). The writer brief lets a finding give the "Why" from its ground in the team's texts. Two points of wording:
  - "the Working Draft itself instantiates type parameters with tuple and arrow types": the draft does not instantiate. It says that parameters are instantiated so. Proposed: "and the Working Draft itself says that type parameters are instantiated with tuple and arrow types."
  - "the type group's paper of 2019 (..., POPL 2019)": the year names the paper, as the specification's callout does ("The type group's paper of 2019", `trait-parameters.tex:60`). It tells nothing of how the decision came about, so I do not count it as a dated sentence. "of 2019" may go, since "POPL 2019" says it.
- (b) "`fortress compile` sets the bound `Object` (`Shell.useCompilerLibraries()`) ... The switch-over does not end this departure by itself; only a change of that setting does". Pass. At HEAD, `Shell.java:371-372` still sets `setExtendsObjectPreDesugaring(true)`, and `Shell.java` is unchanged since `e0f550094`. The old "until the switch-over" was the state the coordinator told him on 09-29, not his decision (`judgement-c3`, P-42), so nothing of his is lost. The added last sentence matches F-291 and rows 339 and 832.

**Comprehension.**
- "F-289 measures the errors under it": the reader took "it" to be the changed setting, the bound `Any`. It is today's setting: under the compile command's `Object`, "the twelve give 685 errors" (F-289). Class: wording, in a new sentence. Proposed: "The switch-over does not end this departure by itself; only a change of that setting does (F-289 counts the errors that the distance shows under today's setting)."
- "a generic dotted method with one tuple-typed parameter": two readings. Row 832 settles it: "a generic dotted method whose single parameter has a tuple type". Class: wording, in a new sentence. Proposed: "... and on a generic dotted method whose only parameter has a tuple type (row 832)." F-291's title uses the same words as the entry, so the coordinator should change it too.
- "`fortress compile` sets the bound": narrower than the tree. Row 412: "`Shell.useCompilerLibraries()`, which `compile`, `link`, `build` and `typecheck` call, sets it". Class: wording, minor. Proposed: "the compiled path's commands, `fortress compile` among them, set the bound `Object` (`Shell.useCompilerLibraries()`)".
- The skill's `compiler.md:69` still says the compiled path rejects tuple generics "until the switch-over (ledger row 412)". The entry is now right and the skill is wrong. Class: a concept the reader lacked, the extends-`Object` setting. Define it in the `fortress-repo` part on the compiler, and fix line 69 there, as `concepts.md` says. The specification's callout (`trait-parameters.tex:62-65`) makes the same claim. The writer flagged both files.
- When the setting changes: the entry does not schedule it, and should not. The flip in 22c is the judgement's default and the coordinator's to schedule (section 4, "Defaults"). Row 412 tracks it. Pass.

## P-58

**Changes:** one "Why" sentence added, from finding (a). Finding (b) is a question.

**Fidelity.**
1. "Why: the language defines no foreign-function interface, which the Working Draft lists among its future features (`Specification/appendices/future.tex`, "Native stuff"), so ...". The ground holds: the appendix lists "Native stuff" with "foreign function interface" under "Others" (`future.tex:706-708`; frozen `:673-675`, the finding's `:675`). Two faults:
   - The new sentence carries a file path that is not a pointer to an entry or a report section. Class: wording; the path goes in the note line.
   - "future features" is not the appendix's word. Its title is "Proposed Features", "technical issues that are proposed but not yet fully discussed" (`future.tex:12-16`), and P-155 calls it "the specification's appendix of proposed features". Class: wording.

   Proposed: "Why: the language defines no foreign-function interface; the Working Draft names one only in its appendix of proposed features. So the form of a binding is outside the language, and the library's own practice decides it (P-27)."
2. The pointer "(P-27)" holds under chunk c1's pending P-27 ("This rule governs how the library is extended"; limited to designs of the language). It also reads fairly under today's title. Pass.
3. Finding (b): the question quotes his words exactly (2026-10-09T23:12:54.624Z, 2026-10-10T05:27:34.812Z, 2026-10-22T22:02:17.752Z). Keeping the text until he answers follows the writer brief, and `record.md` puts no "waits for his review" words in an entry. Pass.

**Comprehension.**
- "a loader beside its glue classes": the source settles reading (a). The write-up's `StaticNativeApp` was a second loading route, beside `NativeApp`'s loading of glue classes (scout report P-58, section 2; row 796). Class: wording, in an unchanged sentence. Proposed: "Walk is to load a string that names a helper through a second loader, beside the one that loads its glue classes (row 796)." Outside this pass.
- "to refuse a string that names no helper": the reader asked whether every unmoved binding would be refused. The source is narrower than the entry. The probe's rule is: "A string under `com.sun.fortress.nativeHelpers.` that names no static method is a static error. The glue strings that stay walk-only ... are still left alone." (`perf-probes/prelude/natives-binding-probe.md:85`). Class: uncertain fidelity, settled by the probe: the unchanged sentence is broader than its source. Proposed for a later pass: "... and to refuse a string under `nativeHelpers` that names no static method there, leaving walk's glue strings alone." No finding names it, so it is outside this pass.
- The reason, the move step by step and the rejected form: read right.
- Concepts: I agree with `concepts.md` on native binding (core), glue class (interpreter part) and static helper (the part on the code generator).

## P-59

**Changes:** the last sentence struck.

**Fidelity: pass.** The struck sentence was the coordinator's premise, from the review page and his 14:08:16 text, and not in his words: "item seven as recommended. So one now and two after the switch." (2026-09-29T14:07:20.452Z; `judgement-c4`, P-59). Nothing measured it. The judgement wants it kept as "a premise to measure when microGPT compiles" (section 7). Review-queue item 221 holds it, so the strike loses nothing from the record. The apply note names the item. Every other sentence is unchanged.

**Comprehension.**
- "P-12 orders the two steps": an unchanged sentence. P-12's title settles it: after the switch-over, walk runs the checker, and then uses its coercions. The reader's reading fits. Class: wording, minor. Proposed: "(P-12: after the switch-over, walk first runs the checker, then uses its coercions)".
- "the static coercions that the checker inserts": class: a concept the reader lacked. These are the `CoercionInvocation` nodes that the checker inserts, and walk has no case for them (judgement, tenet 9; F-9). Define this in the `fortress-repo` part on the interpreter, beside its line on coercion (`interpreter.md:16`). The c1 check said the same for P-12.

## P-84

**Changes:** one sentence added.

**Fidelity.**
- "The class loader, ... only renames the type parameter, so it gives no instance a `double[]` field; a loader that would, way A4 of decision A, is unmeasured (F-18)." Pass. F-18 holds both halves: "the rewriting only renames, so it gives no instance a `double[]` field", and the A4 loader "does not exist and is unmeasured". `array-design-ways.md`, section 3, way A4: "nothing of it exists and no probe has been run". This is the one place where the record joins the curator's two messages, of 09-19 and 09-24 (judgement, tenet 7). Wording, optional: the clause "which makes each generic instance's class from its template" repeats the `fortress-repo` core's "The compiled run time" and may go.
- "the unboxing words of P-17": the writer took these to be the language's grounds for unboxing (`objects.tex:38`, `binary.tex:80`), which chunk c1 puts into P-17. The judgement names them for P-17 and P-84 together (tenet 7, "Default"; section 7, "P-17 and P-84", item 1), and P-17 already points to P-84. So not repeating them is right. Class: uncertain fidelity, settled: pass.
- Knock-on: the gloss "(P-27, the library's own practice is the standard)" quotes P-27's old title. The writer and c1's judgement both flag it.

**Comprehension.**
- "The sizes do not wait while ...; that layered plan was rejected": the reader resolved it. The sentence is unchanged; minor.
- "arrays keep the team's `nat` sizes in their types": every array, or only sized ones? P-85's third question (an unsized array for a size known only at run time) is open. So the title is broader than what is decided. Class: uncertain fidelity. His decision of 09-19 would settle it, and it is outside this pass.
- "way A4": P-84 glosses it enough. I agree with `concepts.md`. Pass.
- "the other array decisions", and no C: the letters are those of `reviews/array-design-review.md`, section 3, where decision C ("Which library the array layer and the model's operations go into", `:155`) is a separate fork. Class: wording, minor. "the open array decisions A, B and D (P-85)" would say which. Outside this pass.

## P-85

**Changes:** none.

**Fidelity: pass.** The finding asks for his lean of 2026-09-20 "as a lean to confirm". A lean cannot enter a position. `record.md`, "What an entry is": "POSITIONS holds only the curator's decisions", and an entry holds "no words that it waits for the curator's review". The judgement also sends it to him "as 'to confirm'" (tenet 7). So a question is the right form. The question quotes him correctly, with a cut. One point of wording in the question: his message opened "Okay, I'm not sure I can unblock this, but I will just quickly react. And you either hold it or you decide to take some action with this." (2026-09-20T14:33:50.777Z). The question should quote that opening too, since it makes the lean weaker as a decision. The sentence that the question offers follows his words "unless we have a clear reason not to go there".

**Comprehension.** These points are in unchanged sentences and outside this pass.
- "The whole preparation for the array work": his words are "I think we should do the whole prep for the arrays" (2026-09-22T05:21:45.608Z). The coordinator's commit `2f425cb36` recorded this as "plain explainers prepared beforehand" (scout report P-85, section 1). His words leave open what "prep" covers. Class: uncertain fidelity: it needs his word.
- The questions against decision A: the first question (a store for each element type) overlaps ways A1 and A2 of decision A (`array-design-ways.md`, section 3). Class: wording: "apart from" needs a word on where the two meet.
- No C, and B's place: as under P-84; minor.

## P-155

**Changes:** none.

**Fidelity: pass.** "P-155 to cover the export check" is among his open asks (dialogue, section 6), and only his word can settle it. The question describes row 782 rightly.

**Comprehension.**
- "rung": class: a concept the reader lacked. A rung is one step of a climb batch: one change with its tests, gated with the batch. No part of `fortress-repo` defines it; the word appears only in `sources.md` and in test and folder names. Define it in the `fortress-repo` core, beside "gate".
- "reaches zero with them checked": is the zero today with them unchecked? The source answers, and it shows that an unchanged sentence is stale. Row 584 is FIXED: `108ab82d6` (2026-10-23), "The compiled checker checks the overloading of every symbolic operator". So "Today its overloading check reads an operator only if its name is a word of capitals" is no longer true. Today it is the export check that skips the symbolic operators (row 782, F-287). F-53's zero is therefore reached with the overloading check reading them, but not the export check. Class: uncertain fidelity, settled by row 584. An entry states the present (`record.md`), so this needs a later pass. No finding of this chunk names it. It also sharpens the question to him: the overloading half is built, and the live question is the export check. Proposed for that pass: "The compiled checker's overloading check reads the symbolic operators, such as `+`, `^`, `||` and the subscripts, by the rules that it applies to any function, so that the distance to the switch-over reaches zero with them checked (row 584)."
- The two subscript operators, the index bound: minor.

## Across the chunk

- New sentences with a count or a path: P-33 ("twelve"), P-58 (`Specification/appendices/future.tex`). The proposals above remove both.
- Knock-ons for the coordinator: the `fortress-repo` core's "already finds no error in the interpreter's library" (P-33); `compiler.md:69` and the specification's callout (P-42); F-291's title, "one tuple-typed parameter" (P-42); P-84's gloss of P-27 (with c1).
- Outside this pass, from the cold read: P-58's refusal is broader than the probe's rule; P-155's "Today" sentence is stale since row 584 was fixed. Both need a later pass.
- `concepts.md`: I agree. Add "rung" (core, beside "gate"), the `CoercionInvocation` nodes (interpreter part), and, in the core, the difference between the distance and the checker count.

## His quotes

HIS 2026-10-28T05:56:38.947Z | No. None of this. I cannot decipher what you are proposing here.
HIS 2026-10-26T04:47:50.485Z | Of course. The whole point of the switchover is to avoid the need to port walks library into the compilers library.
HIS 2026-10-26T07:30:36.620Z | So I believe this would be 22C or D, however many we need to finish the exit from phase 3 cleanly.
HIS 2026-09-29T13:57:39.332Z | So yes, we go with any, because that's the status quo.
HIS 2026-09-29T14:02:25.736Z | Okay, that seems like an absolute no-brainer. Option one, right, Annie?
HIS 2026-10-09T23:12:54.624Z | Item 35: I have no intuition for deciding between the two forms.
HIS 2026-10-10T05:27:34.812Z | Item 35, agreed with recommendation, option 1.
HIS 2026-10-22T22:02:17.752Z | OK… but I don’t recall my decision asking for static methods so I am unable to make fully informed decision from this fragment.
HIS 2026-09-29T14:07:20.452Z | item seven as recommended. So one now and two after the switch.
HIS 2026-09-20T14:33:50.777Z | Okay, I'm not sure I can unblock this, but I will just quickly react. And you either hold it or you decide to take some action with this. So specializing in the class loader is the team's direction. So I don't know why that would be in question. I would try to pursue the team's direction unless we have a clear reason not to go there.
HIS 2026-09-22T05:21:45.608Z | I am fine with delaying the array work after the switchover to the library. But at the same time, like I think we should do the whole prep for the arrays.
