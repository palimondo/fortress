# Cold read 2: `p/clean.txt`

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the skill's `references/` (not `revival-changes.md` or `sources.md`). Entries read: P-37, P-26, P-43, P-158.

## P-37: "One library, the interpreter's, is the library that the compiler checks."

**Decided:** The compiled path stops using its own prelude. It uses the interpreter's prelude (`FortressLibrary`, `FortressBuiltin`) and the rest of the interpreter's library, so both paths share one library. The compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) is a temporary scaffold. Nothing new goes into it. At the switch-over its three files are deleted and their tests kept, some of them respelled (P-38 says which). The reason is to avoid porting the interpreter's library into the compiler's. Instead the type checker is improved until it accepts the interpreter's fuller library. The curator will not be asked about this again. A plan he approved (P-33) sets how the checker work goes and in what order.

**Applies:** It covers which library files survive the switch-over, and it applies now: no declaration goes into the compiler's prelude. Limits:
- It decides which files survive, not which designs. The one library may take over a design from the compiler's prelude, as it already took the flat number types.
- `CompilerSystem` (the compiled path's `System`, imported by 27 compiled tests) is outside the prelude and outside this decision. Whether it is deleted at the switch-over is undecided.
- It does not stop work on the code generator.

**Requires:**
- Do not add a declaration to `CompilerLibrary`, `CompilerBuiltin` or `CompilerAlgebra`.
- Do not port the interpreter's library into the compiler's library.
- At the switch-over, delete the three prelude files, keep their tests, and respell the tests that P-38 names.
- Do not reopen the decision with the curator.
- Follow P-33 for the order of the checker work.
- Do not delete `CompilerSystem` on the strength of this entry.

**Unfinished:**
- It has not been shown that the compiled path can run, not just check, the twelve components that the checker passes. In one measurement the code generator refused at least 52 of their declarations, and no class emitted from the library was run (F-34).
- The checker work under P-33's plan.
- The fate of `CompilerSystem`.
- The switch-over itself. The entry gives no condition for when it happens. The skill adds one: walk's natives must have compiled bindings first (SKILL.md, "The phases").

**Could not resolve:**
- "the twelve components that the checker passes": unclear wording. The entry does not say which twelve components these are, or whether they are the whole interpreter's library. The skill's count stage checks only the `FortressLibrary` component and the apis it imports (`compiler.md`, "count stage"), which is one component. I cannot tell how many library components remain unchecked.
- "at the switch-over's setting": unclear wording. This could mean a configuration (flags, library path, prelude choice) that the switch-over will use, or the point in time of the switch-over. Neither the entry nor the skill defines a "setting". So I cannot rerun or judge the "at least 52" measurement.
- "the revival develops the type checker further, so that it accepts the fuller library": has two readings. It could be a goal still in progress, or a description of work already done. The skill says the checker "already finds no error in the interpreter's library" (`#total 0`), and the entry speaks of components "that the checker passes". If the checker side is finished, it is unclear what the P-33 plan still covers.
- "a bootstrap to remove": has two readings. "Bootstrap" may be the general sense, a temporary scaffold. Or it may mean the skill's "bootstrap stubs": old class files of the compiler's library, built from `ProjectFortress/src/fortress/` (`build-and-caches.md`). I cannot tell whether removing the bootstrap also covers those stubs.
- "respelled" (tests): unclear wording. Probably the tests are rewritten to the one library's names, but the entry defers to P-38 and the word is not explained.

## P-26: "Where the type group's later positions conflict with the specification's early text, the later positions win."

**Decided:** The type group built the checker and compiler and learned what is feasible, with performance as the goal and specialization required. When their later positions conflict with the specification's early text, the later positions win. The specification is revised to match, and P-95 logs each change with its reason. The later word includes, without being limited to:
- the exclusion rule;
- keeping specialization;
- making the compiler prelude's number types siblings (2009 and 2010);
- Naden's 2012 Return Type Rule write-up;
- the POPL 2019 paper (F-166).

The implementers' later word also outweighs unfinished text. The revival does not second-guess them.

**Applies:** When a later position of the type group conflicts with early specification text, or when implementers' later work conflicts with unfinished text. The listed items are examples ("includes"), not a closed list.

**Requires:**
- In such a conflict, follow the later position, not the early text.
- Revise the specification to match, and record the change and its reason in P-95.
- Do not argue against the type group's later choices on the revival's own reasoning.

**Unfinished:** Revising the specification wherever a conflict is found. The entry names no specific open item.

**Could not resolve:**
- "Specialization": has two readings, and they conflict. The entry defines it as a separate, hand-written overload for one instantiation, such as `tail(x: List[ZZ])` beside the generic `tail[X](x: List[X])`, with dispatch choosing between them at run time. The skill describes something else: compiled code specialised to each instantiation of a generic, made by the class loader per instantiation (`exploring.md`, "Weighing the sources"; SKILL.md, "The compiled run time"). I cannot tell which one "specialization kept" protects, or whether it protects both.
- `List[ZZ]`, `List[X]`, `tail[X]`: unclear notation. The skill says static parameters and arguments are written `[\T\]` and that `[i]` indexes (SKILL.md, "Static parameters"). I cannot tell whether the example is meant as Fortress source or as informal notation.
- "the specification's early text" / "later positions": unclear wording, with no cutoff given. P-43 counts the 2012 Types chapter, which is in the specification, as a type group text. So "early" cannot simply mean "in the specification". My best guess is text from before the type group's work (2009, from `exploring.md`), but the entry does not say so.
- "The implementers' later word also outweighs unfinished text": has two readings. "Implementers" could mean only the type group, or any of the team's implementers, including walk's authors. "Unfinished text" could mean specification text marked as incomplete, or any early text.
- Scope: the title limits the rule to the specification's early text. P-158, however, uses P-26 to rank the compiler's prelude over the interpreter's library ("written earlier for walk"), which is code, not specification text. I cannot tell whether P-26 also ranks the team's later code above its earlier code.

## P-43: "The exclusion rule stays, and the number tower is flat (route A)."

**Decided:** The compiled checker keeps the exclusion rule: no type may extend two instantiations of one generic trait. So the library's number types are flat siblings under `Number`, as the team made the compiler prelude in 2009 and 2010. Each type has its own algebra, and `Number` has no catch-all operators. This choice is called "route A". The reasons given:
- Four type group texts state the rule (2011 paper, 2012 Types chapter, Naden 2012, POPL 2019).
- Under the rule a nested tower is impossible. If `ZZ32` extended `ZZ64`, it would be an instance of each self-typed algebra trait, such as `AdditiveGroup`, at two type arguments.
- The Working Draft says the number types are mutually exclusive, and the 2012 chapter keeps that sentence.
- The flattened prelude is the team's last word, and it leads to POPL 2019.

**Applies:**
- The compiled checker's handling of generic trait extension.
- The design of the library's number types.
- Limit: the curator cares that specialised code runs fast, not how a specialisation is chosen.
- F-46 records the cost of returning to "route C".

**Requires:**
- Do not make one number type extend another.
- Do not give `Number` catch-all operators.
- Give each number type its own algebra traits at its own type.
- Do not relax the exclusion rule in the checker.

**Unfinished:** None stated.

**Could not resolve:**
- "route A", "route C": an undefined label, not a language concept. Neither the entry nor the skill defines the routes. The skill only shows a folder name, `rung-spec-route-a`. I cannot tell what route C (or B) would be beyond "not flat", so I cannot use F-46's price.
- "The fixed widths, `ZZ`, `QQ` and `RR64` are siblings": unclear wording. As punctuated, "the fixed widths" can be read as a label for `ZZ`, `QQ` and `RR64`, but `ZZ` and `QQ` are not fixed-width. It can also be read as a separate item, meaning `ZZ32`, `ZZ64` and the rest, but then `RR64`, which is fixed-width, is listed twice. The skill's list is `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64` (SKILL.md, "Numbers are siblings"). The entry should list them the same way.
- "catch-all operators": unclear wording. My guess is operators declared on `Number` for any pair of numbers, such as `opr +(self, other: Number): Number`. The entry does not define the term, so I cannot be sure which declarations it forbids.
- "its route leads to the POPL 2019 paper": unclear wording. "Route" is also the label of this decision ("route A"), so the reader cannot tell whether this is a metaphor or a reference to the label.
- "The curator cares that specialised code runs fast, not how a specialisation is chosen": unclear wording. Its link to a flat tower and the exclusion rule is not stated, and I cannot tell what it allows or forbids a worker to do. It also brings back P-26's two readings of "specialisation".
- "The compiled checker keeps": a language concept I lack. The entry speaks only of the compiled checker. I could not find in the skill whether walk also enforces the rule (`interpreter.md`, "What walk checks", lists no such check).

## P-158: "A member that an api writes `abstract` is declared in the component that exports the api."

**Decided:** When an api marks a trait or object member `abstract`, the component that exports the api must declare that member too, in its own trait or object, at the api's header. It may give a body or not. The reasons given:
- The compiler's prelude, the team's later work, does this.
- Since March 2009 the team's export check refused a component trait that left out a member of its api's trait (`edb516dba`, Sukyoung Ryu).
- By P-26, that later practice beats the interpreter's library, which leaves some of these members out.
- Without the declaration, a compiled client's call of the member fails with `NoSuchMethodError` (row 816).

The entry notes that the specification's export rule does not require this. That rule asks only for each field and each non-abstract method, and it allows a concrete declaration of an abstract one.

**Applies:**
- Members of traits and objects that an api writes `abstract`.
- The component that exports that api.
- The compiled path's export check and the checker's check that each object defines the member.
- Header as defined in `library.md`, "Designing a change": name, static parameters and bounds, modifiers, `throws`, parameter modifiers and types, return type.
- Limit: top-level functions are not mentioned.

**Requires:**
- Declare every such member in the exporting component's trait or object, at exactly the api's header. A body is optional.
- Add the missing declarations wherever the interpreter's library leaves one out.

**Unfinished:**
- The interpreter's library still leaves some of these members out, by the entry's own words.
- Row 816 is still open.
- Whether the export check's refusal exists yet is unclear (below).

**Could not resolve:**
- "The compiled export check refuses a component that leaves one out": has two readings, and it contradicts the skill. As written, it describes present behaviour. The skill says the opposite. The export check "requires no component member for an api member written `abstract`" (`library.md`, "Designing a change"). "The export check passes the exporting component" (`compiler.md`, "Traps of the compiled path"). So either this is a target still to build, which the entry does not say, or the skill is out of date. It is also unclear how this fits with the team's 2009 check: was that check later loosened, or did the revival change it?
- "the checker then checks that each object defines it": unclear wording. "Each object" could mean only the exporting component's object that declares the member, or every object that extends the trait. "Defines" could mean a body in the object itself, or also an inherited body. I also cannot tell whether this check exists today.
- The specification: unclear wording. The entry says the specification's export rule does not require the declaration. It does not say whether the specification is revised to match, as P-26 would have it (with a P-95 record), or is left as it is.
- "by P-26": the scope question raised under P-26. P-26 ranks later positions over specification text. Here it is used to rank the compiler's prelude over the interpreter's library, which is code.
