# Cold read: corrections/p/clean.txt

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed parts of its `references/` (`compiler.md`, `library.md`, `exploring.md`, `records.md`, `interpreter.md`, `specification.md`, `tests-writing.md`). Four entries, all positions. I did not read any entry they cite (P-33, P-38, P-95, F-34, F-46, F-166).

## P-37 "One library, the interpreter's, is the library that the compiler checks."

**Decided:** The compiled path gives up its own prelude and uses the interpreter's prelude (`FortressLibrary`, `FortressBuiltin`) and the rest of the interpreter's library. The compiler's three prelude files (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) are scaffolding that will be removed. The reason is to avoid porting the interpreter's library into the compiler's: the checker is extended until it accepts the larger library, and the library is not cut down to fit the checker.

**Applies:** Applies now (nothing is added to the compiler's prelude) and at the switch-over, when the three files are deleted. Its limits:
- It decides which files survive, not which designs. The one library may adopt a design from the compiler's prelude, as it already adopted the flat number types.
- It does not cover `CompilerSystem`, the compiled path's `System`.
- It does not block code-generator work, which is needed whichever library is used.
- It is final, and the curator is not asked about it again.

**Requires:**
- Add no declaration to the three compiler-prelude files.
- At the switch-over, delete the three files and keep their tests. Some tests are "respelled", and P-38 says which.
- Do not reopen the decision with the curator.
- Code-generator work may go ahead now.

**Unfinished:**
- No one has shown that the compiled path can run the one library. The code generator refuses library declarations that the checker passes (F-34).
- How the checker comes to accept the library was left to a plan, which the curator approved (P-33). The entry does not say whether that work is done. SKILL.md says the checker already finds 0 errors in `FortressLibrary`, so maybe it is.
- The switch-over itself has not happened.

**Could not resolve:**
- "the compiled path reads the interpreter's library with it": "with it" can mean "together with the prelude" (the other library components too) or "by means of the prelude". Unclear wording. I took the first reading.
- "the revival develops the type checker further, so that it accepts the fuller library": I cannot tell whether this describes a goal or a result already reached. Combined with "How the checker comes to accept the library ... was left to a plan", I cannot tell whether checker acceptance is still unfinished. Unclear wording, since tense and status are not stated.
- "respelled" (P-38): I cannot tell what is done to these tests (renamed? rewritten against the one library's names?). Unclear wording, and I could not read P-38.
- `CompilerSystem`: the entry says the decision "does not cover it", but not what happens to it at the switch-over (kept? may it gain declarations?). This is an open limit, not wording.
- "The decision is not put to him again": it could mean only "do not ask the curator again". It could also mean "new evidence against it is not to be raised". SKILL.md's "When to explore" says new evidence against a decision triggers exploring. Two readings, so the wording is unclear.
- "the switch-over": not defined in the entry. SKILL.md defines it (the compiled path moves onto the interpreter's library, and it waits for walk's natives), so this is resolved from the skill.

## P-26 "Where the type group's later positions conflict with the specification's early text, the later positions win."

**Decided:** When the type group's later positions conflict with the specification's early text, the later positions win. The type group is the team that built the checker and the compiler. It aimed for performance, required specialization, and learned what is feasible. The specification is then revised to match, and each revision is recorded with its reason in P-95. The revival defers to the team's later judgement because the team knew more.

**Applies:** It applies where the specification's early text and the type group's later word conflict. The later word named includes:
- the exclusion rule;
- keeping specialization;
- the flat number types of the compiler's prelude (2009–2010; P-43);
- Naden's 2012 Return Type Rule write-up (`Papers/Types/journal/justificationOfRTR.tex`);
- the POPL 2019 paper (F-166).

The list is open ("includes"). Separately, the implementers' later word also beats "unfinished text".

**Requires:**
- In such a conflict, follow the later word, and do not argue against it.
- The specification is changed to follow the later word, and each change is recorded in P-95.

**Unfinished:** The specification revisions that each conflict calls for. The entry does not say which revisions are already made.

**Could not resolve:**
- "the specification's early text": no date or version marks which text counts as early (all of it, the Working Draft of February 2011, or only text written before the type group's 2009–2012 work). Unclear wording.
- "specialization": the entry defines it as a hand-written overload for one instantiation (`tail(x: List[ZZ])` beside `tail[X](x: List[X])`) that dispatch picks at run time. SKILL.md ("The compiled run time") and `exploring.md` ("compiled code specialised to each instantiation of a generic") describe something else: the class loader making a class per instantiation. These are two different things, and I cannot tell which one the type group "kept" as "a must". Unclear wording, and also a language concept I could not reconcile from the skill.
- The example's notation `List[ZZ]`, `tail[X]`: SKILL.md says static parameters are written `[\T\]` and that `[i]` indexes. So the example is not Fortress source as written. I read it as shorthand. This is a language-notation point.
- "Their later word includes": the list is open, so I cannot tell how to decide whether something not listed counts as later word. `exploring.md` gives a closed list of five. Unclear wording.
- "The implementers' later word also outweighs unfinished text": "implementers" could mean only the type group or the whole team, including the interpreter's authors. "Unfinished text" could mean unfinished parts of the specification or any unfinished source. Both readings are possible. Unclear wording.
- "the specification is revised": the passive voice does not say who revises it (any worker who meets the conflict, or only on the curator's order). Unclear wording.

## P-43 "The exclusion rule stays, and the number tower is flat (route A)."

**Decided:** The compiled checker keeps the rule that no type may extend two instantiations of one generic trait. So the one library's number types form no tower. They are siblings under `Number`, as the team arranged the compiler's prelude in 2009–2010. Each has its own algebra, and `Number` declares no operators that work across all numbers. The reasons:
- The type group's post-Working-Draft texts agree on the rule.
- The Working Draft calls the number types mutually exclusive.
- The flat prelude is the team's last design, and it leads to the POPL 2019 paper, which keeps the rule.

The curator's concern is that specialised code runs fast, not the mechanism that picks a specialisation.

**Applies:** It applies to the compiled checker and to the one library's number types (`ZZ`, `QQ`, `RR64` and the others named). The entry does not say whether walk must also enforce the rule. SKILL.md says walk checks only part of the overloading rules at load.

**Requires:**
- Do not make one number type a subtype of another.
- Do not give `Number` catch-all operators.
- Give each number type its own algebra.
- Do not drop the exclusion rule from the checker.
- Going back to "route C" has a cost, which F-46 estimates. So route C is not the path.

**Unfinished:** Nothing is stated as unfinished. P-37 implies the one library already has the flat shape.

**Could not resolve:**
- "route A", "route C" (and the implied route B): these labels are not defined in the entry or in the skill. I can only guess that route C is a number tower with subtyping and without the exclusion rule. Unclear wording: an undefined label.
- "The fixed widths, `ZZ`, `QQ` and `RR64` are siblings": this reads two ways. It could be a list (the fixed-width types, plus `ZZ`, `QQ` and `RR64`). It could be an apposition naming `ZZ`, `QQ` and `RR64` as the fixed widths, but `ZZ` and `QQ` are not fixed-width. I took the list reading, which matches SKILL.md's list (`ZZ32` ... `RR64`). Unclear wording.
- "each with its own algebra": I read it as each type implementing the self-typed algebra traits (such as `AdditiveGroup[\ZZ32\]`) at its own type, per SKILL.md. Partly resolved from the skill.
- "catch-all operators": an informal term. I read it as operators declared on `Number` itself that apply to any two numbers. It is probably right, but not defined.
- "its route leads to the POPL 2019 paper": figurative, and tied to the undefined "route". Unclear wording.
- `reviews/foundations/judgement.md`: the base of this relative path is not given (probably `explorations/`). A minor point of wording.
- "specialised code" / "a specialisation is chosen": the same two-way reading as in P-26 (hand-written overload chosen by dispatch, or compiled per-instantiation code).

## P-158 "A member that an api writes `abstract` is declared in the component that exports the api."

**Decided:** For each member an api marks `abstract`, the exporting component's matching trait or object must declare the member at the api's header, with or without a body. The compiled export check refuses a component that omits one. The checker then checks that every object defines the member. The reasons:
- The compiler's prelude, the team's later work, restates such members without bodies.
- The team's export check refused a component trait that omitted a member of its api's trait.
- By P-26, that later practice wins over the interpreter's library, which was written earlier for walk and omits some.
- The specification asks for declarations only of fields and non-abstract methods, so the decision rests on the team's later work alone.
- If the declaration is missing, a compiled client's call dies with `NoSuchMethodError` (ledger row 816).

**Applies:** Every component that exports an api with `abstract` members, in the one library and elsewhere. It concerns the compiled path: the export check, the checker, and the run-time failure.

**Requires:**
- Declare each api-`abstract` member in the exporting component's trait or object, at the api's header (`library.md` defines the header).
- Fix the interpreter's library where it leaves such members out.

**Unfinished:**
- The entry states the export check's refusal in the present tense. But `library.md` ("It requires no component member for an api member written `abstract`") and `compiler.md` ("The export check passes the exporting component") say the current check does not refuse. So the refusal seems still to be built. The interpreter's library's omissions also seem still to be filled in. The entry says neither.

**Could not resolve:**
- "The compiled export check refuses a component that leaves one out": this could describe current behaviour or the behaviour the decision requires. The skill says the current check does not refuse, so the two readings conflict. Unclear wording, because the status is not given.
- "the team's export check refused a component trait that left out a member of its api's trait": I cannot tell whether "a member" means any member or only `abstract` ones. If the team's check refused even abstract ones, the present check (which requires none) is a departure, and the entry does not say who changed it. Unclear wording.
- "by P-26 ... that way wins over the interpreter's library": P-26 is about later positions against the specification's early text, or "unfinished text". The entry applies it to a conflict between two of the team's libraries, and I cannot tell which clause of P-26 covers that. Unclear wording.
- "with a body or without one": `library.md` says to write `abstract` in the api on each member that the component leaves without a body. That suggests a member with a body should not be `abstract` in the api. The entry allows a body. A slight tension, from unclear wording or a gap between the record and the skill.
- "The specification's export rule asks a declaration only for ... so the decision rests on the team's later work alone": I cannot tell whether the specification is then to be revised to require these declarations (P-26's "the specification is revised"), or left as it is. Unclear wording.
- "row 816": it is not called a ledger row, but the skill's `compiler.md` cites ledger row 816 for the same trap. Resolved from the skill.
