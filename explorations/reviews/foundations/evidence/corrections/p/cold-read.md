# Cold read: corrections/p/clean.txt

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and in its `references/` only `compiler.md` (prelude, traps, export check), `library.md` (the library, "Designing a change"), `exploring.md` ("Weighing the sources") and a grep of the others for the entries' terms. Not read: the record, git, reports, `revival-changes.md`, `sources.md`. The cross-references (P-33, P-38, P-95, F-34, F-46, F-166, ledger row 816) cannot be followed from here; they are cited as support, so they do not block reading unless noted.

Four entries, all positions.

---

## P-37 One library, the interpreter's, is the library that the compiler checks

**Decided:** The compiled path stops using its own prelude. The interpreter's prelude (`FortressLibrary`, `FortressBuiltin`) becomes the compiled path's prelude, and the compiled path compiles against the rest of the interpreter's library too. The reason: the point of the switch-over is that the interpreter's library is never copied into the compiler's library; instead the type checker is worked on until it accepts the interpreter's (larger) library. The compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) is temporary scaffolding to be removed.

**Applies:** To the library files that the compiled path uses, from now through the switch-over. Limits stated by the entry: it decides which files survive, not which designs; a design found in the compiler's prelude may still be adopted into the one library (precedent: the flat number types). It does not decide the fate of `CompilerSystem` (not part of the prelude; 27 compiled tests import it). It does not restrict code-generator work. It does not settle how or in what order the checker comes to accept the library: that is the approved plan of P-33.

**Requires:** Add no declaration to the three compiler prelude files. Do not port the interpreter's library into the compiler's library. At the switch-over, delete the three files and keep their tests (respelled as P-38 says). Do not raise this decision with the curator again. Follow P-33 for the checker's path to accepting the library.

**Unfinished:** The switch-over itself (deleting the three files, respelling tests per P-38). Showing that the compiled path can run the library, not only check it: the code generator refuses 52 declarations that the checker passes, and no class emitted from the library has been run (F-34). A decision on `CompilerSystem`. The checker's acceptance of the whole library, per P-33.

**Could not resolve:**
- "the code generator refuses 52 declarations of the library's twelve components that the checker passes": unclear wording. Two readings: the library has exactly twelve components and 52 of their declarations are refused; or the 52 refused declarations lie in twelve (a subset) of the library's components. Which twelve (the whole library, or `FortressLibrary` and the apis it imports, as the count stage checks) is not said.
- Status of the checker: "the revival continues the type checker until it accepts that fuller library" and the last sentence ("How the checker comes to accept the library...") read as work still ahead, while "52 declarations ... that the checker passes" and the skill's core ("The compiled checker already finds no error in the interpreter's library ... a total of 0") say the checker accepts it now. A reader cannot tell whether checker acceptance is finished, finished only for the `FortressLibrary` component, or still open. Unclear wording (tense and scope).
- "this decision does not name it" (`CompilerSystem`): clear that this decision leaves it out; unclear whether its fate is decided elsewhere or simply open, and what the 27 tests importing it do at the switch-over. Unclear wording / open point.
- "bootstrap": read here as temporary scaffolding. `build-and-caches.md` uses "bootstrap stubs" for old class files of the compiler's library under `ProjectFortress/src/fortress/`; the entry does not say whether those stubs are part of what is removed. Minor, unclear wording.

---

## P-26 Where the type group's later positions conflict with the specification's early text, the later positions win

**Decided:** When the late positions of the type group (the team members who built the checker and compiler, 2009-2012) contradict earlier specification text, the late positions are taken as correct and the specification is changed to match them. The earlier text is treated as aspiration; the type group learned what was feasible while pursuing performance, with specialization as a requirement. The implementers' later word also beats text the team left unfinished. The revival does not override them, since they knew more.

**Applies:** Wherever a late position of the type group and early specification text conflict, and where implementers' later word meets unfinished text. Named late positions (the list says "includes", so it is not closed): the exclusion rule; keeping specialization; the compiler prelude's number types made siblings in 2009-2010 (and so the library's, P-43); Naden's 2012 Return Type Rule write-up; the POPL 2019 paper (F-166). Specialization is defined as a separate version of a generic function for one instantiation, e.g. `tail(x: List[ZZ])` beside `tail[X](x: List[X])`, chosen by run-time dispatch.

**Requires:** In a conflict, follow the late position, not the early text; revise the specification to match, with the change and its reason recorded in P-95. Do not second-guess the team's late positions.

**Unfinished:** The specification revisions themselves, as far as P-95 does not already hold them (not visible here).

**Could not resolve:**
- "Specialization": two senses. The entry defines it as a separate version of a generic function for one instantiation, picked by dispatch at run time (an extra overload). The skill's core and `exploring.md` describe "compiled code specialised to each instantiation of a generic, which they kept" (the class loader making one class per instantiation from a template, as C# does). "specialization kept" in the list of late positions can be read either way, and the entry does not say whether the version for one instantiation is written by the programmer or made by the compiler. Unclear wording, possibly a language concept I lack.
- The example `tail(x: List[ZZ])`, `tail[X](x: List[X])` uses `[...]` for static parameters; the skill says Fortress writes them `[\T\]` and `[i]` indexes. Unclear whether the example is Fortress source or paper notation. Unclear wording.
- "the specification's early text": no boundary is given for "early" (before 2009? before the type group's work?). Unclear wording.
- "The implementers' later word also outweighs unfinished text": "implementers" can mean the type group only or every implementer (the interpreter's authors too); "unfinished text" can mean unfinished specification text only or any unfinished text of the team. Unclear wording.
- Scope beyond the specification: the heading and body speak only of the specification, but P-158 invokes P-26 to rank the compiler's prelude over the interpreter's library. Whether P-26 also ranks the team's later code over its earlier code is not stated in P-26. Unclear wording.

---

## P-43 The exclusion rule stays, and the number tower is flat (route A)

**Decided:** The compiled checker keeps the multiple instantiation exclusion rule: no type may extend two instantiations of the same generic trait. As a consequence the library's number types are flat, as the team (Chase, Ryu, Maessen, Allen) made the compiler's prelude in 2009-2010: the number types are siblings under `Number`, none extends another, each has its own algebra instances, and `Number` itself carries no operators that work across all numbers. The reason: the exclusion rule is the type group's published position in four texts (2011 paper, 2012 Types chapter, Naden's 2012 write-up, POPL 2019); under the rule a nested tower cannot exist (if `ZZ32` extended `ZZ64` it would extend each self-typed algebra trait at both `ZZ32` and `ZZ64`); the specification already calls the number types mutually exclusive; the flattened prelude is the team's last record and its line of work leads to POPL 2019, which keeps the rule.

**Applies:** To the compiled checker and to the library's number types (the one library). The entry adds that the curator cares about specialised code running fast, not about the mechanism that selects a specialisation. A return to "route C" has a cost estimate in F-46.

**Requires:** Do not make any number type a subtype of another. Give each number type its own algebra. Add no catch-all operators to `Number`. Do not relax the exclusion rule in the compiled checker.

**Unfinished:** Nothing stated as still to build.

**Could not resolve:**
- "route A", "route C": labels not defined in the entry or the skill (the skill shows only a folder name `rung-spec-route-a`). Route A is presumably this decision; what route C is, and why it would be a "return", is not readable. No route B is mentioned. Unclear wording.
- "The fixed widths, `ZZ`, `QQ` and `RR64` are siblings": can be read as an appositive (the fixed widths are `ZZ`, `QQ`, `RR64`, which is wrong: `ZZ` and `QQ` are not fixed width) or as a list (the fixed-width types, plus `ZZ`, `QQ` and `RR64`), where `RR64` is itself a fixed width and `RR32` goes unmentioned. The skill lists `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64`. Unclear wording.
- "He cares that specialised code runs fast, not how a specialisation is chosen": "He" has no antecedent in this entry; the nearest man named is Naden (or the four team members). Presumably the curator. Also unclear what a worker should do with this: whether it means the mechanism of specialisation (overloads chosen by dispatch, or per-instantiation compiled classes) is open, or answers an argument for route C. Unclear wording.
- "`Number` has no catch-all operators": read as no operators declared on `Number` that accept any number; could be read as `Number` declaring no operators at all. Minor, unclear wording.
- "its route leads to the POPL 2019 paper": metaphor; read as the team's line of work continuing to that paper. Minor.

---

## P-158 A member that an api writes `abstract` is declared in the component that exports the api

**Decided:** For every member that an api marks `abstract`, the exporting component's trait or object must declare that member too, at exactly the api's header, either with a body or without one. The compiled export check refuses a component that omits one, and the checker then verifies that each object defines the member. Reason: the compiler's prelude (the team's later work) restates each such member in the component without a body, and the team's export check since 2009-05-08 (`ac0d41de0`, Sukyoung Ryu) refuses a component trait with fewer members than its api trait; by P-26 that later practice beats the interpreter's library, written earlier for walk, which omits some. The specification does not require the restatement (it asks for each field and each non-abstract method, and allows a concrete declaration of an abstract one). Without the restatement a compiled client's call of the member fails at run time with `NoSuchMethodError` (ledger row 816).

**Applies:** To every component that exports an api with `abstract` members of traits or objects; it matters for the compiled path. Top-level functions are not mentioned.

**Requires:** Declare each api-`abstract` member in the exporting component at the api's header (body optional). Where the interpreter's library leaves one out, add it.

**Unfinished:** Adding the missing declarations to the interpreter's library. Possibly making the export check refuse an omission (see below).

**Could not resolve:**
- "The compiled export check refuses a component that leaves one out": present tense, but `library.md` says the export check "requires no component member for an api member written `abstract`" and `compiler.md` says "The export check passes the exporting component" (row 816). Two readings: a description of the check as it is now (contradicting the skill), or the behaviour the decision requires and someone must build. The same applies to "the checker then checks that each object defines it". Unclear wording; it decides whether there is checker work to do.
- "since 2009-05-08 the team's export check refuses a component trait with fewer members than its api's trait": read against the skill, this seems to contradict "requires no component member for an api member written `abstract`", unless abstract members are not counted or that check was later lost. Not resolvable from the entry. Unclear wording.
- "each object defines it": which objects (those in the exporting component, or every object anywhere that extends the trait) is not said. Unclear wording.
- The specification: the decision requires more than the export rule asks, and "allows a concrete declaration of an abstract one" covers a declaration with a body; it does not say whether the specification allows restating it without a body, which the decision permits. Nor does the entry say whether, under P-26 and P-95, the export rule is to be revised. Unclear wording.
- "by P-26, on the team's later word, that way wins over the interpreter's library": P-26 as written ranks later positions over early specification text; this applies it to earlier library code. Readable, but rests on a reading of P-26 that P-26 does not state. Unclear wording (cross-entry).
