<!-- The fidelity and comprehension check of chunk c2 of the foundations rewrite (P-33, P-12, P-59, P-17, P-84, P-85, P-58), 2026-10-26: each rewritten entry against the record's text, the foundations judgement's section 7 and their sources, and the cold reader's answers against the source meaning, with each failure classed and a proposed wording. -->

# Check: foundations rewrite, chunk c2

Read: the run's brief (`scratchpad/foundations/rewrite-brief.md`), the check brief, `writer.md`; `proposals.md`, `clean.txt`, `proposals.apply`, `concepts.md`, `cold-read.md` in this folder; `entries.py 33 12 59 17 84 85 58` and the scout reports `positions-audit/full/evidence/P-12.md`, `P-58.md`, `P-59.md` (parts); `reviews/foundations/judgement.md` whole; `conversations/02-phase3-exit-foundations.md` whole; `reviews/foundations/tenets-evidence.md`, tenets 6 to 9; `reviews/phase3-exit/zero-audit.md`, A.2 and A.3; `reviews/type-decisions-review/judgement.md`, V3; F-34, F-53, F-289, F-290; ledger rows 320, 782, 816; c1's `clean.txt` (P-26, P-37, P-42) for consistency. Checked at source: `Specification/basic/objects.tex:38-43`, `Specification/advanced-lib/binary.tex:78-82`, `Specification/appendices/future.tex:12`, `:700-708`; `StaticChecker.java:228-229`; `Shell.java:420-424`; grep for `CoercionInvocation` under `interpreter/` (none); `tools/distance/run.sh:85-87`; `coordinator/array-design.md:45`; `reviews/array-design-ways.md:137`; the `Library/` file list. Not opened: `reviews/foundations/evidence/`.

The changed text is a sentence diff of `clean.txt` against `HEAD:explorations/coordinator/POSITIONS.md`: every sentence not listed below as new or changed is the record's text, word for word.

## Summary

| Entry | Verdict | Failures |
|---|---|---|
| P-33 | fails | uncertain fidelity, settled (the 40 include two of the fourteen); wording (5); concept (the distance; the layers) |
| P-12 | fails | fidelity (the walk freeze broader than its source); uncertain fidelity, settled (the 40 and the fourteen); wording (2) |
| P-59 | pass | optional wording; concept (coordinator), minor |
| P-17 | fails | wording (the language's ground sits inside the "Why:") |
| P-84 | fails | wording (2); concept (stamping) |
| P-85 | pass | none for the new sentence |
| P-58 | pass | optional wording (name the window's end) |

## P-33

**Changed:** a layer sentence; phase 3 restated over the fourteen with three conditions; a sentence on phase 4's two zeros; the code generator's half unmeasured at approval and 52 now; the 40 other components; a state line.

### Fidelity

- The layer sentence, "The order is a work plan in the team's implementation on the JVM (P-26 defines the layers): the compiled checker is the first gate, code generation and the run time come after it, and the natives define the switch-over." Source: judgement tenet 6, "Sound reason, L2 (a work plan). The checker is the gate the compiled path runs first; code generation and the run time come after it; the natives are the switch-over's definition." Faithful, and marked for his yes. Section 7's behaviours for P-33 do not ask for it, but the run brief asks for each ground's layer.
- Phase 3 over the fourteen, under the compile command's setting, with operators and `abstract` read the team's way: judgement section 5, "Its exit gate", and the run brief's open answer 1 (fourteen, checked: `run.sh:85-87` lists twelve, `List` among them, and `CovariantCollection` and `OneShotFlag` are outside them). Behaviour 1 met in substance. One condition is dropped: the judgement's exit gate is "the distance stage reports 0 over the thirteen with `#crash none`" (section 5). The entry says only "reports no error". `CovariantCollection` has 2 crashes today (`zero-audit.md` A.2), and "the crash means the checker never typed that declaration, so more errors may sit behind it" (same place). So a count of 0 errors with crashes would pass the entry's text and not the judgement's gate. The run brief's statement of the exit also leaves the crashes out, so this is wording, not a fault of the writer's reading.
- Phase 4's two zeros (behaviour 2) and the 52, unmeasured at approval (behaviour 4): judgement tenet 6 and section 5; F-34. Faithful. F-34 counts the 52 over "the library's twelve components", but the sentence follows "two zeros over the fourteen", so a reader can take the 52 as a count over the fourteen.
- **The 40 other components (behaviour 3): uncertain fidelity, settled: the count is wrong once phase 3 is the fourteen.** "The library's 40 other components (F-290 counts their errors) do not block the switch-over". F-290 is "Outside the twelve": its census ran "over the 41 components outside the twelve, in one JVM, all but the compiler's three files and `GeneratorLibrary`", and `Avl` is left out, giving "the other 40" (`zero-audit.md` A.2). `Library/` holds 53 `.fss` files; without the eight of the twelve, the three `Compiler*` files, `GeneratorLibrary` and `Avl`, 40 remain, and `CovariantCollection` and `OneShotFlag` are two of them. So the 40 include two of the fourteen. The entry now puts those two in phase 3's exit and also among the 40 that "do not block the switch-over". Outside the fourteen there are 38. The judgement writes "the 40" in its twelve-frame (tenet 6) and its "thirteen" frame alike, and the run brief repeats it, so the writer followed the sources; the sources do not agree with each other once the two imports join the count. c1's P-37 says "P-33 places the library's other 40 components" and has the same fault.
- The state line, "Still to build: climb batch 22c, which closes phase 3." Default of open answer 1; his framing of 07:30:36 ("22C or D, however many we need"). Faithful under the default, and `proposals.md` lists the dependency.
- In `proposals.md`, change 2 (phase 3 restated) and change 6 (the state line) are not marked "from the judgement, for his yes", but the judgement classes them as his ("His (reads anew P-33's exit)", tenet 6; "Consequential; his", section 5). They are listed under open answer 1, so he sees them; the mark is missing only.

### Comprehension

The cold reader's account matches the source on the order, the two zeros, the 52 and the 40's place. Where it differs:

- It could not say whether 22c contains the three conditions ("the `Any` bound, the two export-check changes (unless 22c contains them)"). The source says 22c carries them all, with `List`'s two imports (judgement section 5, the four rungs). The entry never says so.
- "the compiled checker is the first gate": the skill defines **gate** as the full check before landing; two readings.
- "the compile command's own setting": it could not tell what is measured, by what, under which other setting. F-289 says it: the distance stage runs under the bound `Any`, which no command sets, and `run.sh … compile` runs it under the command's setting.
- "the export check reading the top-level symbolic operators": it could not tell what is wrong today. Row 782: the export check "skips every top-level symbolic operator".
- "Phase 4 needs two zeros": a precondition or an exit? The source (section 5): the checker's zero is "brought forward" to phase 3's exit; "the code generator's zero stays phase 4's".
- "the distance stage's twelve", "layer": concepts it lacked (below).
- Phases 1 and 2 unnamed, row 320's meaning: text that this run does not change.

### Failures and proposed wording

1. **Uncertain fidelity, settled (the 40).** Replace "The library's 40 other components (F-290 counts their errors) do not block the switch-over:" with "The library's 38 other components, outside the fourteen, do not block the switch-over (F-290 counts the errors of the 40 outside the twelve, `List`'s two imports among them):". The same correction applies to c1's P-37 ("P-33 places the library's other 40 components" becomes "… the library's other components").
2. **Wording (crashes).** "Phase 3: the compiled checker reports no error and no crash over the fourteen components, …" (judgement section 5, "`#crash none`").
3. **Wording (the setting and the operators).** "The zero counts only when the distance stage runs under the setting of `fortress compile` itself (F-289), once that command sets the bound `Any` (P-42), and with the export check comparing the top-level symbolic operators, which it skips today (row 782, P-155), and requiring each `abstract` member of an api in its component (P-158)."
4. **Wording (gate; layer).** "The order's ground is in the team's implementation on the JVM (P-26 defines the layers): the compiled path runs the checker first, and code generation and the run time after it, and the natives define the switch-over." This removes the clash with the skill's **gate** and says that the layer is the ground's, not only the plan's subject.
5. **Wording (the two zeros, the 52).** "The switch-over needs two zeros over the fourteen (P-37): the checker's, which phase 3 brings, and the code generator's, which phase 4 brings. The code generator's half was unmeasured when the curator approved the order; it now refuses 52 declarations of the twelve that the checker passes (F-34)."
6. **Wording (22c), optional if length matters.** "Still to build: climb batch 22c, which closes phase 3 with four rungs: the bound, the operators, the `abstract` members and `List`'s two imports." P-42 (c1) already names the bound's rung in 22c, so the coordinator meets the bound twice; the other three are named nowhere else as 22c's.
7. **Concepts.** *The distance and the distance stage* (the stage that counts the compiled checker's errors over the twelve components, and from 22c the fourteen): the coordinator skill or the short orientation, as c1's `concepts.md` asks; F-53 owns the count. *The three layers*: P-26 defines them (c1); the `fortress-repo` core, as c1 asks.

## P-12

**Changed:** the walk freeze widened; a language ground; walk's lack of static types placed in the implementation; the step's three pieces, unmeasured.

### Fidelity

- **The freeze is broader than its source.** New: "Walk is not changed for this, or for any other matter of static types, before the switch-over." Section 7's behaviour 2: "keep walk unchanged for static-type matters until then, as J1023 V3 applied it". V3 states the scope: "P-12 and P-59 leave walk unchanged, before it runs the checker after the switch-over, where the matter is one of static types that walk does not have" (`type-decisions-review/judgement.md:46`). So V3's rule covers matters that need the static types that walk lacks, those the checker infers. It does not cover the declared types and static parameters that walk reads from the tree. Read literally, "any other matter of static types" forbids work that the revival has landed and that the record keeps, for example `743eb5286` (2026-10-17, "Walk infers a generic dotted method's own static arguments … and chooses it on its declared domain"), `6d187d069` (2026-10-17, walk's load check reads generic declarations "on its declared domains by the checker's rules") and `5262a2412` (2026-10-18, walk reads a generic method's "bounds and coercion targets"). The cold reader saw the same edge ("Walk already instantiates reductions at a declared type … Does a similar change count?"). The window differs too: V3 says until walk "runs the checker after the switch-over", the entry says "before the switch-over". Under the new P-33, P-12's step can come well after the switch-over, since the other components are cleared first, so the gap now matters. `proposals.md` justifies the widening with "The curator's own words cover walk as a whole: 'at the moment we do not touch the walk system until we switch the library'". That reads too much into them: the scout places the message as his answer to item seven, the coercions ("item seven as recommended. So one now and two after the switch."), and the work above shows that walk as a whole was not frozen.
- The ground in the language, "Fortress is statically typed, and it chooses a coercion by the static type", and "Walk, in the team's implementation, has no static types": judgement tenet 9, "Sound reason". Faithful, marked, and kept apart from his wish.
- The three pieces and "its size is unmeasured" (behaviour 1): judgement tenet 9, checked at source: `StaticChecker.java:228-229` throws "The Java version of the type checker is gone now." when Scala is off; `Shell.java:422` sets Scala off for walk; no file under `interpreter/` names `CoercionInvocation`. Faithful.
- **Uncertain fidelity, settled: "(F-290 counts 624 in the library's 40 components outside the fourteen)".** F-290's 40 are outside the twelve, not the fourteen, and include `CovariantCollection` and `OneShotFlag` (see P-33). The claim is wrong as written.
- The fourth point, rows 470 and 731 (walk takes the checker's own departures), is left out and asked as a question. Section 7 does not list it, so this is no failure.

### Comprehension

The cold reader's account matches the direction, the three pieces and the unmeasured size. Where it differs:

- "the Java checker is gone (`StaticChecker.java`)": it read this as a contradiction with the skill, which cites `StaticChecker.java` as the live driver of the checker. The source means that with Scala off, `StaticChecker.java` stops with "The Java version of the type checker is gone now."
- "the fourteen" is undefined when P-12 is read alone; P-33 defines it.
- "the components that walk's programs import" against P-33's "each [of the 40] is cleared before the step at which walk runs the checker": all of them or only the imported ones? The judgement says both ("each reaches zero before that step", tenet 6; "the imported components cleared", section 7). The two entries should say the same thing.
- "any other matter of static types": the edge above.

### Failures and proposed wording

1. **Fidelity (the freeze).** "Walk is not changed for this, or for any other matter that needs the static types that the checker infers, until it runs the checker after the switch-over." (V3's scope and window.) In `proposals.md`, drop the claim that his words of 09-29 cover walk as a whole.
2. **Uncertain fidelity, settled, with wording (the third piece).** "Third, the components that walk's programs import are cleared of the checker's errors, each before this step or before the first program that needs it (P-33 places them; F-290 counts 624 errors in the 40 components outside the twelve)."
3. **Wording (the first piece).** "First, the Scala checker is turned on under walk: walk runs with Scala off, and with Scala off `StaticChecker.java` stops with 'The Java version of the type checker is gone now.'"

## P-59

**Changed:** one sentence added: "That sentence is the coordinator's premise, read and not measured; measure it when microGPT compiles."

- **Fidelity: pass.** Behaviour 3 met. Source: judgement tenet 9 ("the coordinator's premise, unmeasured (rq 221), measurable only when microGPT compiles"); the scout's report on P-59: "origin is judgement.md:263, :356 (its header, :1, says nothing was run)". It is marked for his yes and not given to him.
- **Comprehension:** matches. The reader asked who measures and how; the source does not say, so the entry should not either.
- **Optional wording:** the entry asserts the premise and then takes it back in the next sentence. One sentence reads more safely: "The coordinator's premise, read and not measured, is that microGPT's static types are concrete, each the type of the value itself and not a trait above it, so that on microGPT walk's choice and the static choice agree; measure it when microGPT compiles."
- **Concept, minor:** *the coordinator* (the coordinating session that reads POSITIONS) is not in the `fortress-repo` core, which a worker reads; a glossary line there.

## P-17

**Changed:** one sentence after the "Why:": "The language states that intent (P-26 defines the layers): an implementation may freely copy value objects, which include floating-point numbers and integers (`Specification/basic/objects.tex`), and a `LinearSequence` of a value type 'describes a sequence of "unboxed" values' (`Specification/advanced-lib/binary.tex`)."

### Fidelity

- The citations are right: `objects.tex:38` "Thus, an implementation may freely copy value objects."; `:39-43` names IEEE floating-point numbers and integers among "most objects with simple standard types"; `binary.tex:79-80`. Behaviour 1 met; F-11 stays beside it.
- **Placement.** The sentence comes straight after "Why: a language meant for high performance cannot box its numbers." with no break, so it reads as part of the "Why:". The run brief: "A 'Why:' holds the curator's reason or a reason he took", and a ground from the judgement is to be "written as the entry's ground". He was never shown these two texts (tenets-evidence tenet 7 (e), "L1 grounds not used or told"). As placed, the sentence can be read as a reason he took. `proposals.md` marks it correctly; the entry does not.
- "The language states that intent" is a little stronger than `objects.tex`, which permits copying and does not state an aim. It is the judgement's own reading, though ("the language's own unboxing intent", section 7), so it passes.

### Comprehension

Matches. The reader took the citations as support for the rule ("The language's intent supports it"), not as his reason. The questions it raised (other number types, walk, scalar doubles) are about text that this run does not change.

### Failure and proposed wording

- **Wording.** "Why: a language meant for high performance cannot box its numbers. The ground in the language, beside his reason (P-26 defines the layers): an implementation may freely copy value objects, …" P-12 and P-58 (c2) and P-37 (c1) already use this form.

## P-84

**Changed:** two sentences added at the end: stamping alone gives no `double[]` field; a way through the class loader needs a new mechanism, way A4, unbuilt and unmeasured, with P-85 holding his lean.

### Fidelity

- "Stamping alone gives no `double[]` field: the class loader's class for an instantiation only renames the type parameter, so its element stays a boxed object": `array-design.md:45` ("Stamping renames; it cannot change a representation … `[D` is not a class name"). Faithful, and narrower than the 09-19 statement ("no generic instance can hold a `double[]`"), as the judgement asks ("both can be true"). Behaviour 2 met.
- "A way through the class loader needs a new mechanism there, way A4 …, which nobody has built or measured": `array-design-ways.md:137`, "The largest change, in the loader and the code generator; nothing of it exists and no probe has been run". The entry puts the new mechanism in the class loader only, but the source names the loader and the code generator. A small narrowing.
- "P-85 holds the curator's lean toward it": behaviour 3, by pointer. His lean of 09-20 named "specializing in the class loader", before A4 had its name (09-29); A4 is "the loader way" (tenets-evidence tenet 7 (d)), so the pointer is fair.
- Behaviour 1 is met in P-17, not here, as `proposals.md` explains. But P-84 does not point to P-17, so a reader at a fork on the store meets only his "Why:" and the new implementation facts.

### Comprehension

Matches. The reader lacked **stamping**: the skill uses "stamp" only for the build's `implementation.stamp`, and the reader guessed the meaning from context. The other questions it raised are about text that this run does not change.

### Failures and proposed wording

1. **Wording (the pointer to the language's grounds).** "Why: a high-performance language cannot box its array elements (P-17 gives the language's grounds), and the sizes are central to the team's design."
2. **Wording (A4).** "A way through the class loader needs new work in the loader and the code generator, way A4 of `explorations/reviews/array-design-ways.md`, which nobody has built or measured; P-85 holds the curator's lean toward it."
3. **Concept: stamping.** P-26 defines it (c1). Write "Stamping (P-26) alone gives …" here, and add the word to the skill's "The compiled run time" section, which describes the mechanism without naming it, so that it does not collide with `implementation.stamp`.

## P-85

**Changed:** one sentence: "For decision A, the curator leans toward the class loader, the team's own direction, unless a clear reason appears; this is a lean to confirm, not a decision, and that way is unmeasured."

- **Fidelity: pass.** His words, 2026-09-20 14:33:50 (below); the coordinator's "Recorded as your leans, to confirm" of 14:34:56 (tenets-evidence tenet 7 (b)); judgement section 9 item 6; "unmeasured" from `array-design-ways.md:137`. It is recorded as a lean and not as a decision, as the run brief asks. The rest of the entry is unchanged.
- **Comprehension:** matches ("Do not treat the class-loader lean as decided"). The reader's other questions (the array factory, decision C, what preparation means) are about text that this run leaves as it is.

## P-58

**Changed:** four sentences before the state lines: the language has no foreign-function interface; so the form belongs to Java interoperability and the library's practice decides it; the specification's printing of `builtinPrimitive` is no ground; the window in which the choice is cheap to undo.

- **Fidelity: pass.** `future.tex:12` heads the appendix "Proposed Features", and `:708` lists "foreign function interface" under "Native stuff" (the judgement's `:675` is the Working Draft's line). Judgement tenet 8: "the binding form is outside the language, an L3 choice, and the library's own practice decides it (P-27)"; "true only through the included library api, whose comment describes walk's mechanism"; "after 449 bindings move the other form costs a library sweep". Behaviours 1 to 3 met; all three are marked for his yes. "That is no ground" is the judgement's "weak" turned into section 7's "not lean on"; that is acceptable. The informed yes owed before climb batch 23 is left out of the text and asked in `proposals.md`, as the run brief allows.
- **Comprehension:** matches, including the window ("cheap to undo only until bindings start moving"). The reader's other questions (at the parse; refusing a string during the move) are about text that this run does not change.
- **Optional wording:** name where the window ends, so that the coordinator meets it when it plans the batch: "The choice is cheap to undo only until the bindings start to move onto helpers, which climb batch 23 begins; …" (judgement tenet 8, "before climb batch 23"; `zero-audit.md`, Part C item 3).
- `proposals.md` says "Four sentences added" and lists three points; the second point covers two sentences. No effect on the entry.

## Across the chunk

- The layers are named in plain words, with no "L1", "L2" or "L3", and each entry that names one points to P-26. "Stamping" is used as c1's P-26 defines it, and "specialisation" does not appear. Measured and unmeasured grounds are marked as the run brief asks (P-12's size, P-59's premise, P-84's A4, P-33's 52 as a measurement).
- No two entries of c2 contradict each other once P-33's 40 and P-12's third piece say the same thing (P-33 failure 1, P-12 failure 2). With c1: P-37's "P-33 places the library's other 40 components" needs the same correction.

## His quotes

HIS 2026-10-26T04:47:50.485Z | Of course. The whole point of the switchover is to avoid the need to port walks library into the compilers library. Revival is continuing the development of type checker, so that it would accept the fuller Fortress library that the interpreter uses.
HIS 2026-10-26T05:25:27.242Z | The question of the bound seems like a linchpin … but I hope you are incorrectly mixing the aspects: what Fortress does with how is Fortress implemented on JVM and probably related is a topic of interoperability with Java.
HIS 2026-10-26T07:30:36.620Z | So I believe this would be 22C or D, however many we need to finish the exit from phase 3 cleanly.
HIS 2026-10-26T07:48:49.335Z | And we must resolve the potential contradictions in our positions with enough clarity from the additional context we encode into the positions, so that you know how to weigh the trade-offs.
HIS 2026-09-29T14:07:20.452Z | item seven as recommended. So one now and two after the switch.
HIS 2026-09-29T14:07:20.452Z | It's just a decision that at the moment we do not touch the walk system until we switch the library and then when the like we, we start running the type checker in the walk it will gain types and can switch.
HIS 2026-09-19T18:32:48.384Z | If this should have been high performance language, it cannot be boxed.
HIS 2026-09-20T14:33:50.777Z | So specializing in the class loader is the team's direction. So I don't know why that would be in question. I would try to pursue the team's direction unless we have a clear reason not to go there.
HIS 2026-10-10T05:27:34.812Z | Item 35, agreed with recommendation, option 1.
