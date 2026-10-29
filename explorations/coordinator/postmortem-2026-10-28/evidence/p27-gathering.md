<!-- A librarian's gathering for P-27 (extending the library with what microGPT invented): his words of September, the re-reading of 10-09, P-27 now and in the corrections run, the trap-test case behind the run's finding, and his comments of 2026-10-29 06:39 and 06:42 UTC, weighed together; a proposal for the curator, nothing applied. -->

# P-27: the gathering

## Summary

- His words moved from "all the extensions" (09-19), to "a precedent in the library" (09-20), to "at most an obvious extension" (10-09). Today's test is wider than 10-09's and softer than 09-19's: a domain-independent form that a more mature library would hold goes into the library.
- Proposal: rewrite P-27 whole around that test (section 6). Cut the P-88 sentence and "No fix is designed ..." to the history. Keep the study of the library's pattern and the scope limit as subordinate sentences.
- The trap test's case: the old reader made the right decision on a wrong ground, scored 1 of 2. P-27 did not make it drop the rung.
- `library.md`'s first bullet needs a word.

## 1. His words of September

From `process-engineering/library-extension-rule-archaeology.md`, sections 2 and 3.

- 09-19 18:31: study the library "meticulously" and use its patterns. Also "all the extensions that it invented need to go directly to the standard library in the spirit of the standard library."
- 09-20 07:20: no "forms that are specific to our use case". An extension with "a precedent in the library itself" is fine, such as integer patterns given to floats. He wants to judge each one. "It must be the other way around": the library comes first, and the model shows its worth.
- 09-24 18:30: the diagonal stays in C4. A read-only matrix trait goes to the library.

## 2. The re-reading of 10-09

Its section 7 found that 07:20 qualifies 18:31. Its bullet (section 5) extends the library only where it has a form for one number type, rank or sibling trait and lacks it for another. It never landed. Review-queue items 216 and 237 hold P-27 for his answer.

## 3. P-27 now and the run's text

- POSITIONS still has the old title, "The library's own practice is the standard." `corrections/c1/final.apply` is not applied.
- The run gives the title "Whoever extends the library follows the library's own practice." and adds a scope limit: P-26 decides between two of the team's designs of the language. `check.md` flagged the unchanged "What microGPT invented goes into the standard library" as read too broadly.

## 4. The trap test's case

The test of 2026-10-26 was a record test, not a batch (`reviews/foundations/evidence/trap-test/`). Two readers acted as the coordinator on the same forks. Reader Y had the old entries, and reader X the rewritten ones. In scenario 2, a planner's draft for climb batch 22c had a rung that put `comprises T` on seven order traits of the library, as the compiler's prelude spells them. A reviewer said to drop it, on P-146, P-37 and P-27. The key's right decision: drop the rung, keep P-146, on the ground that Naden's text of 2012-08-31 is later than Steele's edits of June 2012 and asks for the bound-based form. Y did drop the rung and kept P-146. But it gave as grounds "P-146 itself and P-27: the interpreter's library never had a clause on these traits" (`answers-old.md:61`). The grader scored Y 1 of 2 for the decision, X 2 (`grades.md`, sections 1 and 2). The main cause was a missing fact: no entry Y had said when a prelude design binds the library. P-27's old title and P-146's "Why" invited the wrong ground (`grades.md`, section 4, "POSITIONS 27"). So "this sentence alone gave the agent its ground for dropping a rung" overstates. Dropping the rung was right. The ill effect was a right verdict on a ground that would mislead the next fork.

## 5. His comments of 10-29, weighed

- 06:39: the run's title is good, because few readers read POSITIONS whole. The P-88 sentence and "No fix is designed ..." are history, not action. His refinement: on reasonable judgment, a form that microGPT built and that has the shape of a more mature library's code is not a user's extension, and it goes into the library. The diagonal may or may not be one. Each of the two model programs, C4 and the APL microGPT, has a part that states the algorithm and a part that builds domain-independent machinery.
- 06:42: rewrite P-27 whole, with the emphasis on that refinement. The old text puts the library's practice as the standard too categorically. "What microGPT invented goes into the standard library" is too strong.
- Weighed: the refinement replaces "all" (09-19) and the precedent gate (10-09). 07:20's precedent stays as the plainest case, a sign, not a gate. 07:20's "not specific to our use case" agrees with "not a user's extension". The diagonal stays where P-88 puts it. A change that touches microGPT reaches him anyway, by the coordinator skill.

## 6. Proposal, not done

A whole new text, in place of the run's:

> - P-27 **What a program builds that a more mature library would hold goes into the library, in the library's own way.** A program written on this library has a part that states its algorithm, and it can have a part that builds domain-independent machinery that the library lacks, as both microGPT programs do. A form of that second part goes into the standard library when, on reasonable judgment, it is not an extension of the program's own domain; a form that the library has for one number type, rank or sibling trait and lacks for another is the plainest case. Whoever writes it there first studies how the library does the same kind of thing, and follows that pattern, such as its `excludes` clauses. This rule governs how the library is extended; it does not choose between two of the team's designs of the language (P-26).

- About 720 characters. If he prefers the run's title, it fits as the fourth sentence's subject.
- The cut "dated against the texts" removes the entry's dependency on chunk p's open question to him.
- To the history: the P-88 sentence and "No fix is designed ..." (`record.py set` copies the old line). `library.md`'s second bullet says the latter.

`fortress-repo/references/library.md`, "Designing a change", first bullet: replace "This includes an extension that only the model program needs." with:

> A form that a program builds belongs here when it is domain-independent machinery that a more mature library would hold, such as a form that the library has for one number type or rank and lacks for another. The part that states the program's algorithm stays in the program. Name each such move in your report.

The 10-09 bullet should not land: it is narrower than today's test.

## 7. Knock-ons, for the coordinator

1. Replace `final.apply`'s P-27 block before it is applied. Drop item 237's rewrite.
2. Today's words answer items 216, 237 and 50.
3. P-9's gloss "P-27: what microGPT invented goes into the library", P-84's old-title gloss and `fortress-repo/references/sources.md:224` change with the entry.
