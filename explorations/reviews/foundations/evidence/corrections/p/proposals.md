<!-- The clarity pass's corrections of P-37, P-26, P-43 and P-158 from the review's findings (findings.md in this folder), the pilot's second run of 2026-10-28, which states each corrected reading with a pointer and leaves the ground's dates, counts, commits and file names to the apply file's note line. -->

# Chunk p: P-37, P-26, P-43, P-158

This folder holds `findings.md`, so this pass changes only the sentences that a finding names. Where a finding's only ground is a reviewer's reasoning, or where it needs the curator's word, the text stays and a question follows. A corrected sentence states the corrected reading and points to the FACTS entry or the report section that holds its ground. The ground's dates, counts, commits and file names are in `proposals.apply`, on the entry's note line. Wording faults in sentences that no finding names are listed under "Queued, outside the findings", for a later pass.

## P-37

> - P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the rest of the interpreter's library along with it. Why: the switch-over exists to avoid the need to port the interpreter's library into the compiler's library; the revival is developing the type checker further, so that it will accept the fuller library that the interpreter uses. Whether the compiled path can also run this library is not yet shown (F-34: the code generator refuses library declarations that the checker passes). The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled). `CompilerSystem`, the compiled path's own `System`, is not part of the prelude. This decision names only the prelude's three files, and does not say whether `CompilerSystem` goes at the switch-over. The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library. The decision is not put to him again. How the checker comes to accept the library, its first step and the order of the work, was left to a plan for him, which he approved (P-33).

**Meaning.** Two additions, each from its finding's ground:

- Finding a, the reason. The curator's words of 2026-10-26 04:47:50 UTC, as `show.py` prints them: "The whole point of the switchover is to avoid the need to port walks library into the compilers library. Revival is continuing the development of type checker, so that it would accept the fuller Fortress library that the interpreter uses." He said yes to rewording P-37 at 07:42:15 UTC. "Is developing ... so that it will accept" keeps his "so that it would accept" as a goal, not a result.
- Finding c, the premise. The finding names "the compiled path reads the interpreter's library with it", so that sentence now says "the rest of the interpreter's library along with it", the reading that `PLAN.md` gives. The entry now says that the compiled path is not yet shown to run the library, and points to F-34. F-34 holds the measurement, its conditions and its figures. The sentence says "Whether ... can also run", not "can run ..., and not only check it", because the checker passes only part of the library today (F-289, F-290).

One statement of fact (finding d): `CompilerSystem` is outside the decision's letter. Read in the code: `WellKnownNames.useCompilerLibraries()` makes the compiled prelude `CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra` and `AnyType`, not `CompilerSystem`. `fortress-repo`'s `compiler.md` calls it the compiled path's `System`. The entry says only that the decision names the three files and does not say whether `CompilerSystem` goes. It does not say that the decision leaves the file out: the curator's words speak of the compiler's second library as a whole, and `CompilerSystem` is a file of it. Question 2 asks him. The count of the tests that import it is in the note line.

**Sources of the other sentences.** Unchanged from the record; the provenance audit traces them (`positions-audit/full/evidence/P-37.md`).

**Questions for the curator.**

1. Finding b. Should the entry give a rule for when a design of the compiler's prelude binds the one library? The foundations judgement (section 3) proposes one. A design binds if the team's later word on the language backs it. It also binds if the team's text is unclear and the team's checker enforced the design as a rule. A stub does not bind, and "later" is a date. The rule is the judge's reasoning, so the sentence "the one library may take a design of the prelude's" stays as it is.
2. Finding d. Is `CompilerSystem` deleted at the switch-over with the prelude's three files, and do the tests that import it move to the one library's `System`? The phase 3 zero audit assumes so (`reviews/phase3-exit/zero-audit.md`, A.2). Your words of 2026-09-20 14:39:06 UTC ("the compiler second library is just a bootstrap and we need to get rid of it") and 2026-09-29 12:17:07 UTC ("We need to make the fortress use a single library.") speak of the whole second library, but no entry names the file.

**Queued, outside the findings.** "The decision is not put to him again" reads two ways. Its source is his "I don't even think that is a question that's worth deliberating about alternatives" (2026-09-20 14:39:06 UTC). Write: "The curator is not asked to decide it again."

## P-26

> - P-26 **Where the type group's later positions conflict with the specification's early text, the later positions win.** The early text was a wish. The type group, the part of the team that built the type checker and the compiler, then worked to make the language run, with performance as the goal and specialization a must, and learned what is feasible. Specialization, in the type group's design, is a special version of a generic function for one instantiation, such as `tail(x: List[ZZ])` beside `tail[X](x: List[X])`, which dispatch chooses at run time. Where the two conflict, the specification is revised to follow their later word (P-95 records each change with its reason). Their later word includes the exclusion rule, specialization kept, the number types of the compiler's prelude made siblings in 2009 and 2010 (P-43: the library's numbers are flat in the same way), Karl Naden's 2012 write-up "The Return Type Rule and Generics" (`Papers/Types/journal/justificationOfRTR.tex`) and the type group's POPL 2019 paper (F-166). The implementers' later word also outweighs unfinished text. The revival does not second-guess them: it knows less than they did.

**Meaning: unchanged. Text: unchanged.** Every finding on P-26 needs the curator's word, so each sentence that a finding names stays.

**Sources.** "The early text was a wish ... learned what is feasible" and "it knows less than they did" are his words of 2026-09-23 07:26:28 UTC and 2026-09-29 12:17:07 UTC (`positions-audit/full/evidence/P-26.md`). The coordinator added "The implementers' later word also outweighs unfinished text" on 2026-09-30 (`bc8902f47`), with no message of his behind it.

**Questions for the curator.**

1. Finding a, the reason. The reason "worked to make the language run ... and learned what is feasible" is your own. The foundations judgement says that a limit the team met on the Java virtual machine tells how the team built Fortress, and is no reason to rank one language text above another. Its reason instead: the type group's texts of 2011, 2012 and 2019 are later than the Working Draft and agree with each other, and the Working Draft contradicts itself. Keep your reason, or replace it with the judgement's?
2. Finding a, the list. The list of the later word includes "the number types of the compiler's prelude made siblings in 2009 and 2010". That code is earlier than the Working Draft's last edit and the 2011 paper (the flattening commit `6896886fb` is dated 2009-08-31). Keep the item, or remove it, so that "later" is a date?
3. Finding b. Keep or strike "The implementers' later word also outweighs unfinished text"? No message of yours says it. The judgement's default is to strike it. Review-queue item 215 asks the same.
4. Finding c. The judgement (section 7) asks P-26 to carry these rules:
   - Before you weigh a ground, ask which layer it is in: the language, the team's build on the Java virtual machine, or the meeting of Fortress and Java. A ground decides only in its own layer.
   - Count team code as the team's word on the language only where the team wrote the rule on purpose. A stub never counts.
   - Date a commit against the texts before you call it "later".
   - Where two later sources conflict, stop ranking, decide by P-8's goal, and say so.
   - Rank the team's language texts by date and by consistency, with the POPL 2019 paper last.
   - Use one word for each of the two things called specialisation.

   You said yes to rewording P-26 on 2026-10-26 07:42:15 UTC. Add these rules?
5. The scope, with question 4. P-26's title names only the specification's early text. P-158 applies P-26 to the team's later work over its earlier library, by your words of 2026-10-26 04:28:41 UTC ("by the standing position that later team’s work supersedes earlier one, we take the completed path’s way over the walk library’s"). Should P-26 say that it also ranks the team's later work over its earlier work?

**Queued, outside the findings.** The example is not Fortress syntax, which writes static parameters as `[\X\]`. Write `tail(x: List[\ZZ\])` beside `tail[\X\](x: List[\X\])`. "The specification is revised" does not say who revises it. Write "the revival revises the specification to follow their later word (P-95 ...)", by P-95 and his words of 2026-10-12 23:15:30 UTC ("we updated it to match the current state of the implementation in the revival").

## P-43

> - P-43 **The exclusion rule stays, and the number tower is flat (route A).** The compiled checker keeps the multiple instantiation exclusion rule. So the library's numbers are flat, as the team (Chase, Ryu, Maessen and Allen) flattened the compiler prelude in 2009 and 2010. The fixed widths, `ZZ`, `QQ` and `RR64` are siblings under `Number`, each with its own algebra, and `Number` has no catch-all operators. Why: the type group's texts after the Working Draft agree on the exclusion rule, and the Working Draft's types chapter says that the number types "are mutually exclusive; no value has more than one of them" (`explorations/reviews/foundations/judgement.md`, tenet 5, lists the texts). The flattened prelude is the team's last record of the Fortress way, and its route leads to the POPL 2019 paper, which keeps the rule. The curator cares that specialised code runs fast, not how a specialisation is chosen. F-46 prices a return to route C.

**Meaning.** One addition (finding b): the language's grounds for the decision, from the team's texts, as `writer.md` step 3 allows. The entry names the texts as a group and points to the judgement's tenet 5, which lists each with its lines; the note line names them. The two old reasons (finding a) stay in the same words, after the new grounds. "He" became "The curator", whom it meant.

**Sources of the added sentence.**

- The texts: the foundations judgement, tenet 5, read at their sources: `Papers/Types/exclusion.tick:141-152` (2011), `Documentation/Specification/Prose/Language/types.tick:355-376` (2012), `Papers/Types/journal/justificationOfRTR.tex:496-497` (Naden, 2012), POPL 2019's rule [Anc-Same-Trait]. Two of them are drafts, so the entry says "texts", not "published".
- "Agree": tenet 2, "later and consistent on the exclusion rule".
- The quoted sentence: `Specification-1.0-frozen/basic/types-vals-vars.tex:502`, the Working Draft; `types.tick:978` keeps it.
- His correction of 2026-10-26 07:46:17 UTC, "I think we did a plenty of digging which decided why we took the flat numeric tower.", names no ground. The grounds are as tenet 5 lists them.

**Decision not taken.** The first run added tenet 5's argument that a nested tower is impossible under the rule, with its condition. It is the judge's reasoning, and the entry's "So the library's numbers are flat" already draws the conclusion. This run leaves it in tenet 5, which the pointer names. The other way is to keep one clause of it in the entry.

**Questions for the curator.**

1. Finding a, the first reason. "The flattened prelude is the team's last record of the Fortress way" is not your reason for route A. Your words "the team's last record" (2026-09-24 01:02:52 UTC) were about the patents' forest rule, and you chose route A at 14:41:40 UTC with no reason. The prelude's flattening is 2009 code, earlier than the texts above. Strike it? If yes, the judgement proposes in its place: the prelude's flat shape is the team's instance of the same answer on the compiled path. Review-queue item 219 asks the same.
2. Finding a, the second reason. "The curator cares that specialised code runs fast, not how a specialisation is chosen" condenses your words of 2026-09-24 01:02 UTC, which you said were no answer to the question asked. It also joins two meanings of "specialisation". Keep it, or strike it? Review-queue item 220 asks the same.

**Queued, outside the findings.** "The fixed widths, `ZZ`, `QQ` and `RR64` are siblings" reads two ways, and `RR64` is itself a fixed width. Write "The fixed-width types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32`, `RR64`), `ZZ` and `QQ` are siblings", the list in `fortress-repo`'s `SKILL.md`.

## P-158

> - P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** The component's trait or object declares each such member at the api's header, with a body or without one. The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it. Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's own export check refused a component trait or object that left out any member of its api's trait or object, abstract members included; by P-26, on the team's later word, that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification's export rule asks a declaration only for each field and each non-abstract method, so the decision rests on the team's later work alone. Without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (row 816).

**Meaning.** Two corrections, each opened at its source:

- Finding a. The old sentence said that the specification asks for no body, "not for no declaration", so the specification seemed to support the rule. It does not. The export rule, in the specification's "Export Statements" section, asks a satisfying declaration "for each field declaration and non-abstract method declaration in the exported declaration", and allows a concrete declaration of an abstract method. So the decision rests on the team's later work alone, as the finding says. The pointer to `apis.tex` left with the false claim. The file and lines are in the note line.
- Finding b. The check was not of 2012. Its date and commits, verified with `git log -S` in `checks.md`, section 5, are in the note line. The entry says "refused", in the past, because row 816's change made the tree's check skip api members written `abstract`. It says "a component trait or object that left out any member ..., abstract members included", since the team's check matched every api member of a trait or an object, not only a count. That is why it is a ground for a rule about abstract members.

**Sources of the other sentences.** Unchanged. His reason: 2026-10-26 04:28:41 UTC, "by the standing position that later team's work supersedes earlier one, we take the completed path's way over the walk library's" (the conversation note, section 3).

**Questions for the curator.**

1. Finding a. With the specification read correctly, P-158 rests on the team's checker code as the team's later word. Whether checker code counts as the language's later word is open (the judgement's tenet 2, item e; P-26's questions 4 and 5). Does P-158 stand on that ground? And with the export rule read correctly, P-158 asks for a declaration that the rule does not ask for. Does P-95 then ask the revival to revise the rule (`Specification/basic/components/source-code.tex`, "Export Statements")?
2. For the coordinator, not a finding. "The interpreter's library, written earlier for walk" is less sure now that the check is dated March 2009. Git cannot date the api's abstract members on the trunk: `Library/String.fsi` has one commit, the parentless snapshot `5a68404fd`. A copy from before the repository's conversion could settle it (`research/authorship.md`, `explorations/coordinator/lineage.md`).

**Queued, outside the findings.** "The compiled export check refuses a component that leaves one out" reads as the tree's state, which it is not. Write: "The compiled export check must refuse a component that leaves one out (today it accepts one: row 816, which holds this gap and its repair) ...". Three cold readers in a row took the sentence as the tree's state. This is the chunk's main failure of comprehension. If the coordinator files it as a finding, this pass can change it.
