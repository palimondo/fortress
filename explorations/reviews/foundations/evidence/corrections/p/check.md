<!-- The clarity pass's fidelity and comprehension check of chunk p (P-37, P-26, P-43, P-158, corrected from the foundations review's findings): each rewritten sentence against the entry as the record holds it, the finding's ground and the code, and the cold reader's answers against the source meaning, each failure classed. -->

# Check of chunk p: P-37, P-26, P-43, P-158

Sources read: `entries.py 37 26 43 158` (the entries at `HEAD`, unchanged since `5da8144e4`, and the provenance audit's evidence for P-37, P-26 and P-43; P-158 has none); `findings.md` and each ground it names, opened at its source; `show.py` for each message of his that a sentence rests on; the foundations judgement (`reviews/foundations/judgement.md`, tenets 2, 3 and 5, section 3); the dialogue note (`conversations/02-phase3-exit-foundations.md`, sections 3, 4 and 7); F-34, F-289, F-290; `reviews/phase3-exit/zero-audit.md`, A.2; `prelude-lens.md`, section 0; row 816; the code and the commits named below.

The writer changed only sentences that a finding names, as `findings.md` requires. P-26 is unchanged. The sentences that no finding names are unchanged in all four entries; where the cold reader stumbled on one of them, I mark it **outside the findings**: no change in this pass, a question or a queue item instead, since a change there would itself be a fidelity failure.

## P-37

### Fidelity

1. **"Why: the switch-over exists so that the interpreter's library is never ported into the compiler's library; the revival continues the type checker until it accepts that fuller library."** Source: his words of 2026-10-26 04:47:50, "The whole point of the switchover is to avoid the need to port walks library into the compilers library. Revival is continuing the development of type checker, so that it would accept the fuller Fortress library that the interpreter uses." Finding a names it. Two small departures:
   - "is never ported" states an outcome, close to a ban; his words say the switch-over removes the need to port. The cold reader made it a rule: "Do not port the interpreter's library into the compiler's library." The entry's own "no declaration is added to the compiler's prelude" already gives the ban for the prelude, so no action changes, but the reason should say what he said.
   - "continues the type checker" drops "the development of"; it reads oddly.
   - **Class: wording.** Proposed: "Why: the switch-over exists to avoid the need to port the interpreter's library into the compiler's library; the revival develops the type checker further, so that it accepts the fuller library that the interpreter uses."
2. **"That the compiled path can run this library, and not only check it, is not yet shown: the code generator refuses 52 declarations of the library's twelve components that the checker passes, and no emitted class has been run (F-34)."** Finding c names it, and its claim, unmeasured and not refuted, is right (judgement, tenet 3: "So the premise is unmeasured, not refuted"). But the sentence drops F-34's conditions and lets a reader conclude more than F-34 shows:
   - "and not only check it" says that "this library", the interpreter's library, checks. Only the twelve components check, and only at the switch-over's setting with the bound `Any`: under the compile command's setting the twelve give 685 errors (F-289), and the library's other 40 components give 624 errors and 25 crashes (F-290). The "Why" sentence just before it says that the checker is still being developed until it accepts the fuller library. So the entry calls the same library checked and not yet accepted. The cold reader found this conflict and could not resolve it.
   - "refuses 52" drops "at least" and "measured once". F-34: "Measured once on climb batch 22's code", "A declaration counts at its first wall, and no emitted class was run, so after the switch-over the code generator stands between the library and bytecode at 52 declarations at least." The coordinator's record rule: "A count from one measurement says so."
   - "the library's twelve components" reads as if the library has twelve components (the cold reader's first ambiguity).
   - "no emitted class has been run" is about the library's classes; F-291 ran compiled generics of test programs.
   - **Class: wording** (the dropped conditions), with one concept (below). Proposed: "That the compiled path can run the twelve components that the checker passes, and not only check them, is not yet shown: in one measurement at the switch-over's setting, the code generator refused at least 52 of their declarations, and no class emitted from the library was run (F-34)."
3. **"A fourth compiler-only file, `CompilerSystem`, is not part of the prelude: 27 compiled tests import it, and this decision does not name it."** Finding d names it. I checked each claim. `WellKnownNames.useCompilerLibraries()` (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:117-130`) makes the default libraries `CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra` and `AnyType`, not `CompilerSystem`. `grep -rl 'import CompilerSystem' ProjectFortress/compiler_tests/ | wc -l` gives 27. No POSITIONS entry names `CompilerSystem`. The prelude-lens sweep's section 0 counts it among "the four wired files", so "prelude" means two things across the record. The entry's meaning, the code's, is the right one for a worker, and `fortress-repo`'s `compiler.md:27` agrees: "`Library/CompilerSystem.fss` is the compiled path's `System`." **Pass.**
4. The other sentences are unchanged. **Pass.**

### Comprehension

The reader's answers match the source on the decision, its reason, the ban on new prelude declarations, the deletion with tests kept, the code generator's work, and P-33's plan. Where they differ:

- **Whether the checker already accepts the library.** The reader could not tell whether acceptance is finished, finished for `FortressLibrary` only, or still open. The cause is fidelity point 2, and a concept the reader lacked:
  - **concept: the twelve components**, the components that the gate's distance stage and the count stage check (`explorations/coordinator/tools/distance/run.sh:85-87`: `FortressLibrary`, `RangeInternals`, `FortressBuiltin`, `NativeArray`, `List`, `String`, `FlatString`, `Stream`, `NatReflect`, `TypeProxy`, `Writer`, `AnyType`). Define it in the compiled area part, `references/compiler.md`, beside "count stage". The writer's `concepts.md` does not list it. The skill core makes the confusion worse: `SKILL.md:79` says "The compiled checker already finds no error in the interpreter's library". That holds for the twelve at the bound `Any` only (F-289, F-290). The core's sentence should name that scope where the concept is defined.
- **`CompilerSystem`'s fate.** The reader read "this decision does not name it" correctly, but could not tell whether its fate is decided elsewhere or open, or what its 27 tests do at the switch-over. The source: no decision says it. The zero audit (A.2) assumes `System` takes its place. The writer's question 2 asks him. **Class: wording.** Proposed: "A fourth compiler-only file, `CompilerSystem`, the compiled path's `System`, is outside the prelude and outside this decision: 27 compiled tests import it, and no decision says whether it goes at the switch-over."
- **"bootstrap"**: the reader read it as temporary scaffolding, which is his meaning ("the compiler second library is just a bootstrap and we need to get rid of it", 2026-09-20 14:39:06). Pass.

### The proposals file

- The quote of his words of 04:47:50 in `proposals.md` is cleaned ("switch-over", "walk's library", "The revival is continuing the development of the type checker"), but it is set in quotation marks as "His words". The history keeps the dictated words, so give them as `show.py` prints them: "The whole point of the switchover is to avoid the need to port walks library into the compilers library. Revival is continuing the development of type checker, so that it would accept the fuller Fortress library that the interpreter uses." The dialogue note's section 4 carries the same cleaned form.
- The context of that message: it opens by quoting the coordinator ("The plan never meant to include them, so the word "whole" is wrong") and answers "Of course." Then it says "Before final decision, we need to discuss this and solidify our goal alignment." The goal statement is his, and he said yes to rewording P-37 at 07:42:15. So the reason may enter the entry. The "fuller" library is the whole of it: the dialogue note, section 4, records that the other 40 components are outside phase 3 but inside the goal. Proposed point 1 keeps "fuller", which carries this.

## P-26

### Fidelity

Text unchanged. **Pass.** Each finding needs his word, and the writer turned each into a question, as `writer.md` requires. I checked the questions against the sources:

- Question 1 (the reason): the reason is his, 2026-09-23 07:26:28 ("The spec was written in a vacuum early on." and "And when that wish met reality, then the spec must change."). The layer objection is the judge's reasoning, on his frame of 2026-10-26 05:25:27. Correct.
- Question 2 (the 2009 prelude code in the list): `6896886fb` is dated 2009-08-31 (`git show -s`). The Working Draft's text was last edited 2010-12 (judgement, tenet 2). Correct.
- Question 3 ("unfinished text"): the provenance audit (`judgement-c1.md`, P-26) finds no source of his and traces the sentence to `bc8902f47`. Correct.
- Question 4 (the further rules): his yes at 07:42:15 is to "rewording of or refinements of P37 and P26"; `rewrite-results.md`, "Still owed", says the texts enter POSITIONS only after he sees them and says yes. Correct.

### Comprehension

The reader's answers match the decision as written. Its blocks:

- **concept: specialisation, two meanings.** P-26 defines it as a version of a generic function for one instantiation that dispatch chooses at run time. The skill core (the class loader making one class per instantiation, "C# specialises generics in this way") and `exploring.md:20` use the word for the compiled template's instances. The judgement (tenet 2, item c) names the same split. Define two words in the `fortress-repo` core: a specialised overload (the language) and stamping, the class loader's class per instantiation (the implementation). The writer's `concepts.md` lists it. Agreed.
- **The example `tail(x: List[ZZ])` beside `tail[X](x: List[X])`** is not Fortress syntax (`[\X\]` for static parameters). **Wording, outside the findings:** queue it as `tail(x: List[\ZZ\])` beside `tail[\X\](x: List[\X\])`.
- **Where "early" ends, and what "the implementers" and "unfinished text" mean.** These are findings a and b, and the writer's questions 2 and 3. They need his word.
- **Whether P-26 ranks the team's later code over its earlier code.** P-26's title speaks only of the specification's early text, but P-158 uses P-26 to rank the compiler's way over the interpreter's library. P-158's use follows his own words of 2026-10-26 04:28:41: "And by the standing position that later team’s work supersedes earlier one, we take the completed path’s way over the walk library’s." His words of 2026-09-29 12:17:07 are as wide: "we are valuing their latest positions on record above whatever they said earlier, because programming is a learning exercise." So P-26's scope as he uses it is wider than its title. **Uncertain fidelity, of the record as it stands:** his two messages settle how he applies it, but a wider title is a change that no finding names. Add a question to `proposals.md`: P-26 names only the specification's early text; P-158, by your words of 2026-10-26 04:28:41, applies it to the team's later work over its earlier library; should P-26 say that? It belongs with question 4: the judgement's rule for when team code counts.

## P-43

### Fidelity

1. **"The compiled checker keeps the multiple instantiation exclusion rule: no type extends two instantiations of one generic trait."** No finding asks for a definition. But the added reason ("if `ZZ32` extended `ZZ64` ...") cannot be read without one, so the corrections need it. It is correct: `Papers/Types/exclusion.tick:141-146` ("a type (other than \Bottom) is a subtype of distinct applications of a type constructor"); `SKILL.md`, "Traits and objects". **Pass.**
2. **"Under the rule a nested tower is impossible: if `ZZ32` extended `ZZ64`, it would be an instance of each self-typed algebra trait at two type arguments."** The source's claim has a condition: "Under the rule a nested tower whose every level carries the self-typed algebra traits at its own type is impossible" (judgement, tenet 5). The rule does not exclude every nesting: `ZZ32 extends ZZ64` with the algebra traits only at `ZZ64`'s level breaks no rule. The entry drops the condition, so its claim is broader than the source. **Class: wording.** Proposed: "Under the rule a nested tower whose every level carries the self-typed algebra traits at its own type is impossible: if `ZZ32` extended `ZZ64`, `ZZ32` would be an instance of each such trait at two type arguments."
3. **"Why: the exclusion rule is the type group's published position in four texts: ..."** The four texts and their lines are right. I read `exclusion.tick:141-152`, `types.tick:355-376` and `justificationOfRTR.tex:496-497` ("Ultimately, Fortress implements blanket multiple instantiation exclusion for the semantic benefits and the simplicity of the restriction."). But "published" is stronger than what is shown for two of the four. The 2012 Types chapter is the team's unreleased draft in `Documentation/Specification/Prose/` (its only trunk commit is the snapshot `5a68404fd`, 2012-07-19). Naden's write-up is a draft under `Papers/Types/journal/`. The word is the judge's ("published position four times over"), not a fact the record shows. **Class: wording.** Proposed: "Why: the type group states the exclusion rule in four texts: ...".
4. **"The specification's types chapter also says that the number types "are mutually exclusive; no value has more than one of them" (`Specification/basic/types-vals-vars.tex`)."** The sentence is at `Specification/basic/types-vals-vars.tex:580`, at `Specification-1.0-frozen/basic/types-vals-vars.tex:502` and at `types.tick:978`. "These types" are the "simple standard numeric types" (:579). Accurate. But `Specification/` is the revival's revision, and the revival revises it to follow its decisions (P-95). The ground is that the team wrote the sentence, and finding b's ground cites the Working Draft's line 502. **Class: wording.** Proposed: cite `Specification-1.0-frozen/basic/types-vals-vars.tex`, the Working Draft, which the 2012 Types chapter keeps word for word.
5. **The two old reasons kept** ("The flattened prelude is the team's last record of the Fortress way ...", "He cares that specialised code runs fast ..."). Finding a's ground is his words: the phrase "the teams last record" (2026-09-24 01:02:52) answered whether he weighs the patents' forest rule above the flattening, and "Agreed. Route A it is." (14:41:40) gives no reason. The specialisation sentence condenses words that he said were no answer ("Which clearly isn’t an answer to the question…"). To strike them needs his word (review-queue items 219, 220), and the writer kept them with questions, as `writer.md` requires. **Pass.** Both questions state the sources correctly.
6. The other sentences are unchanged. **Pass.**

### Comprehension

The reader's answers match the decision, its scope (the compiled checker, the library's numbers) and its requirements. Where they differ:

- **concept: route A, route C.** Neither is defined in the entry or in the core and area parts. These are record-wide names, used by P-43, F-46, P-95 and P-96 and today by the revival part ("The record calls this choice route A. Route C is the way not chosen: a checker rule under which the number types could nest again."). Define them in the short orientation that replaces the revival part, beside the flat number types. F-46 gives route C's content: "the patents' forest rule with a return-type rule over every level of a chain". The writer proposes the entry or the type-checker part. The names are not this entry's alone, so the short orientation is the right home.
- **"He" has no antecedent** in the specialisation sentence. The reader guessed the curator, which is right. **Wording**, if he keeps the sentence: "The curator cares ...". It belongs with the writer's question 2.
- **"The fixed widths, `ZZ`, `QQ` and `RR64` are siblings"** reads two ways, and `RR64` is itself a fixed width. **Wording, outside the findings:** queue it as "The fixed-width types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32`, `RR64`), `ZZ` and `QQ` are siblings", the list in `SKILL.md`, "Numbers are siblings".
- "`Number` has no catch-all operators" and "its route leads to": minor; the second is inside question 1's sentence.

### The proposals file

"His acceptance of these grounds: 2026-10-26 07:46:17 UTC" overstates. He said "I think we did a plenty of digging which decided why we took the flat numeric tower." and named no ground. The dialogue note's section 7 lists the grounds; it is the coordinator's account. Say "his correction that the record's digging decided the flat tower; the grounds as the dialogue note, section 7, lists them". The entry itself claims no acceptance by him, so it passes.

## P-158

### Fidelity

1. **"Why: ... since 2009-05-08 the team's export check refuses a component trait with fewer members than its api's trait (`ac0d41de0`, Sukyoung Ryu); ..."** Finding b names it. Its ground, `ac0d41de0`, opened with `git show`, does not hold the date:
   - The commit's message is "[export checker] Improved error messages.  Added a test." Its parent already has the count: `ac0d41de0^:.../scala_src/typechecker/ExportChecker.scala:592-594`, `inAPI.length <= inComp.length && inAPI.forall(l => inComp.exists(r => equalMember(l, r)))`.
   - `git log -S 'equalListMembers' ac0d41de0 -- .../ExportChecker.scala` gives one commit: `edb516dba`, Sukyoung Ryu, 2009-03-10, "[export checker] Added checks for traits and object trait types". It wrote `left.length == right.length && List.forall2(left, right)(...)` over every member.
   - `git log -S 'inAPI.length <= inComp.length'` gives `77a8dd706`, Sukyoung Ryu, 2009-04-13, which made it "no fewer members, and each api member matched". `ac0d41de0` (2009-05-08) kept that test inside new error messages.
   - So the check refused a component trait that left out an api trait's member from 2009-03-10. Both commits are on the trunk before `ac0d41de0` (`git merge-base --is-ancestor`).

   The sentence has two more faults:
   - "refuses", in the present, is false of the tree. `031c38bbc` (2026-10-23) made the check skip api members written `abstract` (`ExportChecker.scala:791`, `:796`, `isAbstractMember`; row 816, NEGATIVE-VERIFIED). The reader set this against `library.md` and `compiler.md` and could not resolve it.
   - "with fewer members" understates the check. Since 2009-03 it has asked that each api member be matched in the component, not only a count.

   **Class: uncertain fidelity, settled by `git show` and `git log -S`.** Proposed: "... and from March 2009 the team's export check refused a component trait that left out a member of its api's trait (`edb516dba`, Sukyoung Ryu); ...". Put `77a8dd706` and `ac0d41de0` in the apply note.
2. **"The specification's export rule does not ask for this declaration: it asks the component to declare each field and each non-abstract method of the api, and allows a concrete declaration of an abstract one (`Specification/basic/components/source-code.tex`, "Export Statements")."** Finding a names it. The source, `source-code.tex:372-385`: a trait or object declaration is satisfied by a declaration that "contains, for each field declaration and non-abstract method declaration in the exported declaration, a satisfying declaration", and "When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration." The team's checker quoted the rule in `80d8c678a` (2009-02-03), as I checked. Accurate. One small point: the rule speaks of the members of the api's trait or object, not "of the api". **Pass**, with that wording: "each field and each non-abstract method of the api's trait or object".
3. **The `apis.tex` pointer removed:** it went with the false claim (finding a). **Pass.**
4. The other sentences are unchanged. **Pass.**

### Comprehension

- **"The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it."** The reader read this as the tree's state today. `library.md` and `compiler.md` contradict that reading, and row 816 confirms them: the tree's check accepts such a component. The entry states what the decision requires and names the gap only as the cost ("(row 816)", a bare pointer). The record's rule (`coordinator` skill, `references/record.md`, "What an entry is"): "If the tree does not yet do what a decision or the team's design asks, the missing part is a row of the gap ledger. The entry may name it as "row N", with a few words on what the row holds." **Wording, outside the findings:** queue it as "The compiled export check must refuse a component that leaves one out (today it accepts one: row 816, which holds this gap and its repair) ...". Fidelity point 1 removes the second cause of the same confusion.
- **"each object defines it"** (which objects) and **whether the specification allows a bodyless restatement**: outside the findings. The export rule asks a satisfying declaration only for fields and non-abstract methods and does not forbid further declarations, so a bodyless restatement does not break it. Whether the specification is revised to follow P-158 (P-95) is not in the findings. Leave it.
- **P-26 applied to code over code:** see P-26, comprehension. The writer's question 1 asks whether checker code counts as the later word. Correct, and open (judgement, tenet 2, item e).
- **The writer's question 2** (whether "the interpreter's library, written earlier for walk" still holds): not settled. `git log a874948ac -- Library/String.fsi` gives one commit, the parentless snapshot `5a68404fd` (2012-07-19), so git cannot date the api's abstract members on the trunk. The source that would settle it is an earlier copy across the conversion's cut (`research/authorship.md`, `explorations/coordinator/lineage.md`). The check is now dated 2009-03, so "earlier" is less sure than the writer thought. Keep the question.

### Side finding for the coordinator

The record dates the member count at `ac0d41de0`, 2009-05-08, "three months after" the checker that quoted the rule. Its places: row 816's notes; `CLIMB-BATCH-22c.md:30`, `:87` and `:141`; `reviews/foundations/rewrite-results.md`, "What was rewritten" and "Still owed"; `evidence/rewrite/combined.apply`, P-158; `evidence/salvage-findings.md`, P-158 (b); and the commit message of `60aaeb6bb`. The count was written on 2009-03-10 (`edb516dba`), five weeks after `80d8c678a` (2009-02-03), and took its last form on 2009-04-13 (`77a8dd706`). The conversation note's section 3 also carries the 2009-05-08 date. Not an entry of this chunk; for a ledger `rewrite` of row 816 and a correction of the batch record before rung A cites it.

## His quotes

HIS 2026-10-26T04:47:50.485Z | Of course. The whole point of the switchover is to avoid the need to port walks library into the compilers library. Revival is continuing the development of type checker, so that it would accept the fuller Fortress library that the interpreter uses.
HIS 2026-10-26T04:47:50.485Z | Before final decision, we need to discuss this and solidify our goal alignment.
HIS 2026-09-20T14:39:06.836Z | Like, I fully believe that the compiler second library is just a bootstrap and we need to get rid of it.
HIS 2026-09-20T15:18:35.809Z | it tells you nothing of how much work is to get the interpreter running with the compiler because there is the whole work with the type checker.
HIS 2026-10-26T07:42:15.929Z | Yes, to both rewording of or refinements of P37 and P26.
HIS 2026-09-23T07:26:28.248Z | The spec was written in a vacuum early on.
HIS 2026-09-23T07:26:28.248Z | And when that wish met reality, then the spec must change.
HIS 2026-10-26T05:25:27.242Z | what Fortress does with how is Fortress implemented on JVM
HIS 2026-09-29T12:17:07.180Z | we are valuing their latest positions on record above whatever they said earlier, because programming is a learning exercise.
HIS 2026-10-26T04:28:41.037Z | And by the standing position that later team’s work supersedes earlier one, we take the completed path’s way over the walk library’s.
HIS 2026-09-24T01:02:52.634Z | Yes, because that was the teams last record on how to do the “Fortress” way.
HIS 2026-09-24T01:02:52.634Z | But how a specialization is chosen “ist mir egal”, as long as it runs fast. Which clearly isn’t an answer to the question…
HIS 2026-09-24T14:41:40.798Z | Agreed. Route A it is.
HIS 2026-10-26T07:46:17.466Z | I think we did a plenty of digging which decided why we took the flat numeric tower.
