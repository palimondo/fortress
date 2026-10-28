<!-- The clarity pass's fidelity and comprehension check of chunk p in the pilot's second run (P-37, P-26, P-43, P-158, corrected from the foundations review's findings, with each ground's dates, counts, commits and file names moved to the apply file's note line): each changed sentence against the entry as the record holds it and its finding's ground, and the cold reader's answers against the source meaning, each failure classed. -->

# Check of chunk p, second run: P-37, P-26, P-43, P-158

Sources read: `entries.py 37 26 43 158` and the provenance audit's evidence that it names (P-37, P-26, P-43; P-158 has none); `findings.md` and each ground it names, opened at its source; `show.py` for each message of his that a changed sentence or a question rests on; the foundations judgement (`reviews/foundations/judgement.md`: tenets 2, 3 and 5, sections 3 and 7); the dialogue note (`conversations/02-phase3-exit-foundations.md`, sections 3, 4 and 7); F-34, F-289, F-290; `reviews/phase3-exit/zero-audit.md`, A.2; `prelude-lens.md`, section 0; ledger row 816; `WellKnownNames.useCompilerLibraries()`; `Specification/basic/components/source-code.tex:372-385`; `Specification-1.0-frozen/basic/types-vals-vars.tex:500-505`; the export check's commits; the skill passages that the cold reader cites.

**Scope.** A sentence diff of `clean.txt` against `POSITIONS.md` shows that only sentences that a finding names changed. P-37 gains three sentences (findings a, c, d). P-26 is the record's text byte for byte. P-43 gains one sentence (finding b), and "He" becomes "The curator" in finding a's sentence. P-158 changes the two sentences of findings b and a. `proposals.apply` holds the same text as `clean.txt` for the three changed entries. No new sentence carries a date, a count, a commit or a file path, except P-43's pointer to a report section. Lengths: P-37 1056 to 1544 characters, P-43 662 to 937, P-158 867 to 930. Each addition is a finding's correction.

## P-37

### Fidelity

1. **"Why: the switch-over exists to avoid the need to port the interpreter's library into the compiler's library; the revival develops the type checker further, so that it accepts the fuller library that the interpreter uses."** Finding a. Source: his words of 2026-10-26 04:47:50 (below). The content is his. One loss: his "so that it would accept" states a goal, and "so that it accepts" can read as a result. The cold reader could not tell which (comprehension, below). The same message's "Before final decision, we need to discuss this" is about ask 2, whether phase 3 is done (dialogue note, section 4), not about P-37, and his yes of 07:42:15 covers the rewording.
   - **Class: wording.** Proposed: "the revival is developing the type checker further, so that it will accept the fuller library that the interpreter uses."
2. **"Whether the compiled path can also run this library is not yet shown (F-34: the code generator refuses library declarations that the checker passes)."** Finding c. Tenet 3's ground holds it: "the premise is unmeasured, not refuted". The gloss is F-34's own title, in its own tense. F-34's conditions (one measurement, the switch-over's setting, at least 52 declarations, no emitted class run) are one pointer away and on the note line. **Pass.**
3. **"`CompilerSystem`, the compiled path's own `System`, is not part of the prelude, and this decision does not cover it."** Finding d. The first half holds: `WellKnownNames.java:117-129` makes the compiled prelude `CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra` and `AnyType`, and `compiler.md:27` calls `CompilerSystem` the compiled path's `System`. The second half claims more than the sources show.
   - The letter of the decision names three files. That letter is the coordinator's reading of 2026-09-21 02:36:16, which he confirmed at 02:40:19. No entry names `CompilerSystem` (`fortress-repo`'s `references/sources.md:207`).
   - His own words speak of the compiler's second library as a whole: "the compiler second library is just a bootstrap and we need to get rid of it" (2026-09-20 14:39:06), "maintaining compiler library and interpreter library is wrong. We need to make the fortress use a single library." (2026-09-29 12:17:07). `CompilerSystem` is a file of that library: `Library/CompilerSystem.fss`; `library.md:5` lists it with the compiler's files, outside the interpreter's library; `SKILL.md:79` calls the prelude "three files of its library". The zero audit, A.2, which is finding d's ground, has the one library's `System` take `CompilerSystem`'s place in 27 compiled tests.
   - So the fact is "does not name it". "Does not cover it" settles, as a limit of his decision, the question that the writer's question 2 puts to him. The finding's fault was that the letter leaves `CompilerSystem` outside, so that the trap test's reader proposed a `CompilerSystem` bridge (scenario 4). The new sentence states that gap as a rule. This cold reader listed it among the decision's limits and asked whether the file is kept or may gain declarations, so the bridge reading stays open. The writer's own account in `proposals.md` ("outside the decision's letter") is right. The entry's wording goes further.
   - **Class: uncertain fidelity**, settled as far as the sources go: the letter does not name the file, and whether his decision covers it is his to say (question 2). Proposed: "This decision names only the prelude's three files; it does not say whether `CompilerSystem`, the compiled path's own `System`, which is not part of the prelude, goes at the switch-over."
4. The other sentences are unchanged. **Pass.**

### Comprehension

The reader's answers match the source on the decision, its reason (no port of the library), the ban on new prelude declarations, the deletion with the tests kept, the code generator's work, the plan that he approved (P-33), the switch-over (from the skill) and "bootstrap" as scaffolding to remove. Where they differ:

- **Whether the checker already accepts the library.** The reader: "SKILL.md says the checker already finds 0 errors in `FortressLibrary`, so maybe it is" done. Source: the zero holds for the twelve components only, at the distance stage's setting, the bound `Any` (F-289). Under `fortress compile`'s setting the twelve give 685 errors (F-289). The library's other 40 components give 624 errors and 25 crashes (F-290). Two causes:
  - wording: fidelity point 1, the tense;
  - **a concept the reader lacked: the scope of the checker's zero**, that is, the twelve components and the distance stage's setting. The core states the zero without its scope (`SKILL.md:79`: "The compiled checker already finds no error in the interpreter's library"), and that sentence misled the reader. Define "the twelve components" in the compiled area part, `references/compiler.md`, beside "count stage", and make the core's sentence name the twelve and the setting. `concepts.md` dropped the term because the entries no longer use it. Restore it: the reader needs it to read P-37's "Why" against the core.
- **What becomes of `CompilerSystem`**: fidelity point 3.
- **"the compiled path reads the interpreter's library with it"**: the reader took "together with the prelude", which is the source meaning (`PLAN.md:68`: "the compiled path reads the interpreter's library"). Finding c names this sentence, so a fix would fit this pass, but the reader resolved it. Optional wording: "and the compiled path reads the rest of the interpreter's library along with it."
- **"The decision is not put to him again"**: two readings. Source meaning: he is not asked to decide it again. The audit traces the sentence to "not a question to ask again" (`55f1a1352`), and his words were "I don't even think that is a question that's worth deliberating about alternatives" (2026-09-20 14:39:06). Nothing in its history sets aside the skill's rule on new evidence, and the foundations review re-examined P-37 at his request on 10-26. **Wording, outside the findings**: queue "The curator is not asked to decide it again."
- **"respelled"**: the pointer says what P-38 holds, and the reader was not allowed to open P-38. **Pass.**

## P-26

### Fidelity

The text is unchanged. **Pass.** Every finding on P-26 needs his word, and the writer made each into a question, as `writer.md` requires. The questions, checked against their sources:

- Question 1: the reason is his (2026-09-23 07:26:28, "The spec was written in a vacuum early on." and "And when that wish met reality, then the spec must change."; the audit, `judgement-c1.md`: "his decision, in his own words, condensed fairly"). The judgement's alternative is tenet 2's. Correct.
- Question 2: `6896886fb` is dr2chase's, 2009-08-31 (`git show -s`); tenet 2, item b. Correct.
- Question 3: the audit calls the sentence "a default that an agent landed", added with no source, and finds that neither of his nearest messages "speaks of unfinished text". Correct.
- Question 4: section 7 asks six things of P-26. The question lists four (section 7's items 1, 3, 4 and 5) as "these rules". It leaves out item 2 (rank the team's language texts by date and by consistency, with the 2019 paper last), item 6 (one word for each of the two things called specialisation) and item 5's "saying so". Finding c's plain text notes that section 7 lists six. A yes would leave two of them unasked. **Class: wording, of the proposals file.** Add the two, or say "four of the six; the other two are ...".
- Question 5: `show.py` prints his 04:28:41 words with curly apostrophes ("team’s", "path’s", "library’s"); the question has straight ones. Copy them as printed.

### Comprehension

The reader's answers match the decision as written. Its blocks:

- **"the specification's early text" has no date.** The concept is the Working Draft (`concepts.md`: the `fortress-repo` core); agreed. Where "early" ends is findings a and c's date rule, which waits on his word (questions 2 and 4).
- **concept: specialisation, two meanings.** This is also why the reader could not tell which thing was "kept" as "a must" (tenet 2, item c). `concepts.md` lists it for the core; agreed.
- **The example's notation**: queued, outside the findings. Agreed.
- **The open list ("includes") against `exploring.md`'s closed one.** `exploring.md:16` copies P-26's list as "These positions are:", a closed list, and words its second item in the implementation's sense ("compiled code specialised to each instantiation of a generic"). The record's list is open. **Concept: the later word**, which `concepts.md` puts in the short orientation with P-26's number. Add there that `exploring.md`'s copy should point to P-26 and not close the list.
- **"implementers" and "unfinished text"**: finding b, question 3.
- **"the specification is revised"**: the passive does not say who revises it. Source: P-95 ("When the revival changes the language, it updates `Specification/`") and his words of 2026-10-12 23:15:30 ("we updated it to match the current state of the implementation in the revival"). **Wording, outside the findings**: queue "the revival revises the specification to follow their later word (P-95 ...)".

## P-43

### Fidelity

1. **"Why: the type group's texts after the Working Draft agree on the exclusion rule, and the Working Draft's types chapter says that the number types "are mutually exclusive; no value has more than one of them" (`reviews/foundations/judgement.md`, tenet 5, lists the texts)."** Finding b.
   - The texts: tenet 5 lists the four. I read `exclusion.tick:141-146`, `justificationOfRTR.tex:496-497` and `types.tick:978`. "Texts", not "published", is right, since two of the four are drafts. "Agree" is tenet 2's "later and consistent on the exclusion rule".
   - The quoted sentence: `Specification-1.0-frozen/basic/types-vals-vars.tex:501-502`, "there are several simple standard numeric types. These types are mutually exclusive; no value has more than one of them." The entry's "the number types" are the sentence's "simple standard numeric types". The claim is scoped to the types chapter. The Working Draft's library chapters say otherwise (tenet 2), and the entry claims nothing about them.
   - As a reason, `writer.md` step 3 allows it: finding b gives it, with its ground in the team's texts. His words of 07:46:17 point to the record's digging, not to these texts, and `proposals.md` says so.
   - The pointer: POSITIONS writes such paths both as `reviews/...` (P-56) and as `explorations/reviews/...` (P-51, P-60), and the reader could not tell the base. **Class: wording**, minor: `explorations/reviews/foundations/judgement.md`.
2. **"The curator cares that specialised code runs fast ..."**: "He" meant the curator, and the sentence is finding a's. **Pass.**
3. The other sentences are unchanged, finding a's two kept for his word (review-queue items 219, 220). **Pass.**

On the decision not taken: agreed. The nested tower's argument and its condition stay in tenet 5, and the entry draws no conclusion beyond the record's own "So the library's numbers are flat".

### Comprehension

The reader's answers match the decision, its scope (the compiled checker, the library's numbers), its requirements and its reasons. Where they differ:

- **concept: route A, route C**: the short orientation, as `concepts.md` says; agreed. P-95 already glosses route C ("a nested number tower, under the forest rule of the team's 2012 patent applications"), and the definition can take its words.
- **"The fixed widths, `ZZ`, `QQ` and `RR64`"**: queued, outside the findings. Agreed.
- **The relative path**: fidelity point 1.
- **"specialised code"**: the concept of P-26.
- "catch-all operators", and whether walk enforces the rule: the reader's readings match the source, which speaks of the compiled checker. **Pass.**

## P-158

### Fidelity

1. **"... and the team's export check refused a component trait that left out a member of its api's trait; ..."** Finding b. The ground holds it. `checks.md`, section 5, verified the commits: `edb516dba` (sukyoungryu, 2009-03-10, "[export checker] Added checks for traits and object trait types"), `77a8dd706` and `ac0d41de0`. The team's last copy (`5a68404fd:.../typechecker/ExportChecker.scala`, `equalListMembers`) refuses "missing members of the trait/object in the component" and matches every api member (`inAPI.forall(handleOne)`). The past tense is right: `031c38bbc` (row 816) made the tree's check skip api members written `abstract`. The date and the commits are on the note line, as the rule asks. Two losses of wording:
   - "a member". The team's check matched every api member, abstract ones included, and that is what makes it a ground for a rule about abstract members. The reader could not tell "any member" from "only abstract ones", so it could not see that today's check departs from the team's.
   - "a component trait ... its api's trait". The team's check covered objects too ("trait/object"), and the decision covers "the component's trait or object".
   - **Class: wording.** Proposed: "and the team's own export check refused a component trait or object that left out any member of its api's, abstract members included".
2. **"The specification's export rule asks a declaration only for each field and each non-abstract method, so the decision rests on the team's later work alone."** Finding a. `source-code.tex:372-385`: a trait or object declaration is satisfied by one that "contains, for each field declaration and non-abstract method declaration in the exported declaration, a satisfying declaration", and "a satisfying trait declaration is allowed to provide a concrete declaration". Accurate. "Alone" agrees with the judge's view that the run-time death is "the cost of the other reading, not the ground" (section 3), and with finding a's "rests on the team's later export check". The finding's open part, whether checker code counts as the later word, is question 1, as `writer.md` requires. **Pass.**
3. The `apis.tex` pointer went with the false claim. **Pass.**
4. The other sentences are unchanged. **Pass.**

### Comprehension

- **"The compiled export check refuses a component that leaves one out"**: the reader read it as the tree's state, and the skill (`library.md:44`, `compiler.md:74`) says otherwise. Row 816, NEGATIVE-VERIFIED, confirms that the tree's check accepts such a component. **Wording, outside the findings**, queued as "must refuse ... (today it accepts one: row 816 ...)". Agreed. This is the third cold reader in a row to read it so, and it is the chunk's main comprehension failure. The later pass should take it first, or the coordinator should file it as a finding so that this pass may change it.
- **"a member"**: fidelity point 1.
- **"by P-26"**: P-26's title speaks only of the specification's text. P-158 applies it to the team's later work over its earlier library, by his words of 2026-10-26 04:28:41. **Uncertain fidelity, of P-26's scope**: P-26's question 5 asks it. Correct; nothing changes here.
- **"with a body or without one" against `library.md:43`**: no conflict. `library.md` says which api members to write `abstract`, those that the component leaves without a body. P-158, like the export rule ("allowed to provide a concrete declaration"), allows a body. **Pass.**
- **Whether the specification is revised.** P-95: "When the revival changes the language, it updates `Specification/`". Read as finding a reads it, the export rule accepts a component that P-158 refuses. No entry says whether this is a change of the language that P-95 records. The judge's section 3 had read the text as ambiguous and the team's checker as the team's own reading of it, and finding a sets that reading aside. **Class: uncertain fidelity**; his word would settle it. Add to question 1: "With the export rule read correctly, P-158 asks a declaration that the rule does not ask. Does P-95 then ask a revision of the rule (`Specification/basic/components/source-code.tex`, "Export Statements")?"
- The reader's "Requires", to fix the interpreter's library where it leaves such members out, matches row 816's repair (12 bodyless lines in five component traits). "row 816" was resolved from the skill. **Pass.**

### The proposals file

Question 1 points to "P-26's question 5" for whether checker code counts as the later word. That rule is in P-26's question 4 (its second item); question 5 is the scope. Write "P-26's questions 4 and 5".

## For the coordinator

- `concepts.md`: restore "the twelve components", with the scope of the checker's zero, for `compiler.md` and the core's `SKILL.md:79`. Under "later word", add that `exploring.md`'s copy closes P-26's open list.
- The queue outside the findings now holds five items: the three of `proposals.md` (P-26's notation, P-43's sibling list, P-158's "must refuse") and two from this check (P-37's "not asked to decide it again", P-26's "the revival revises").

## His quotes

HIS 2026-10-26T04:47:50.485Z | The whole point of the switchover is to avoid the need to port walks library into the compilers library. Revival is continuing the development of type checker, so that it would accept the fuller Fortress library that the interpreter uses.
HIS 2026-10-26T04:47:50.485Z | Before final decision, we need to discuss this and solidify our goal alignment.
HIS 2026-10-26T07:42:15.929Z | Yes, to both rewording of or refinements of P37 and P26.
HIS 2026-09-20T14:39:06.836Z | Like, I fully believe that the compiler second library is just a bootstrap and we need to get rid of it. Like, I don't even think that is a question that's worth deliberating about alternatives.
HIS 2026-09-29T12:17:07.180Z | I decided that uh, maintaining compiler library and interpreter library is wrong. We need to make the fortress use a single library.
HIS 2026-09-29T12:17:07.180Z | Given like what I said, that we are valuing their latest positions on record above whatever they said earlier, because programming is a learning exercise.
HIS 2026-09-23T07:26:28.248Z | The spec was written in a vacuum early on.
HIS 2026-09-23T07:26:28.248Z | And when that wish met reality, then the spec must change.
HIS 2026-10-12T23:15:30.246Z | when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival.
HIS 2026-09-24T01:02:52.634Z | Yes, because that was the teams last record on how to do the “Fortress” way.
HIS 2026-09-24T01:02:52.634Z | Only which file survives.
HIS 2026-09-24T01:02:52.634Z | But how a specialization is chosen “ist mir egal”, as long as it runs fast. Which clearly isn’t an answer to the question…
HIS 2026-09-24T14:41:40.798Z | Agreed. Route A it is.
HIS 2026-10-26T07:46:17.466Z | I think we did a plenty of digging which decided why we took the flat numeric tower.
HIS 2026-10-26T04:28:41.037Z | And by the standing position that later team’s work supersedes earlier one, we take the completed path’s way over the walk library’s.
