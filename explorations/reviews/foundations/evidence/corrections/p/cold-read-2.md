# Cold read 2: P-37, P-26, P-43, P-158

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and these references only: `compiler.md`, `library.md`, `exploring.md`, `specification.md`, `build-and-caches.md`, `records.md` (searched, not read whole), `tests-writing.md` (one line). Nothing else.

## P-37 "One library, the interpreter's, is the library that the compiler checks."

**Decided:** The compiled path stops using its own prelude. At the switch-over, the interpreter's prelude (`FortressLibrary` and `FortressBuiltin`) becomes the compiled path's prelude, and the compiled path takes in the rest of the interpreter's library too. The reason: the revival extends the type checker until it accepts the interpreter's library, so nobody has to port that library into the compiler's library. The three files of the compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) are a temporary bootstrap that will be deleted. The curator will not be asked about this again.

**Applies:** Any work that touches the compiled path's library, the compiler's prelude files, or the checker's acceptance of the interpreter's library. Limits that the entry states:
- It names only the three prelude files. It does not decide whether `CompilerSystem` (the compiled path's `System`, not part of the prelude) is deleted at the switch-over.
- It decides which files survive, not which designs. The one library may take over a design from the compiler's prelude, as it already took the flat number types.
- It does not block code-generator work, which is needed whichever library is used.
- It is about checking. Whether the compiled path can also run the library is not yet shown: F-34 says the code generator refuses library declarations that the checker passes.

**Requires:**
- Do not add any declaration to the three prelude files.
- At the switch-over, delete the three files and keep their tests. P-38 says which tests are respelled. Respelling means changing a line and keeping the value it checks (`tests-writing.md`).
- Do not reopen the decision with the curator.
- Follow the approved plan in P-33 for how the checker comes to accept the library: its first step and the order of the work.
- A design taken from the prelude goes into the one library, not the prelude.

**Unfinished:**
- The checker accepting "the fuller library that the interpreter uses" (future tense in the entry).
- The code generator compiling the library declarations that the checker passes (F-34).
- The switch-over itself: moving the prelude and deleting the three files.
- A decision on `CompilerSystem`.

**Could not resolve:**
- "so that it will accept the fuller library": the entry speaks of this in the future tense. `SKILL.md` says the compiled checker "already finds no error in the interpreter's library", with a total of 0 for the `FortressLibrary` component. I cannot tell how much checker work is left, or what "fuller" covers beyond the `FortressLibrary` component and the apis it imports (the count stage's scope): the rest of `Library/`, or only what programs import. Unclear wording.
- "their tests kept": which tests count as the three files' tests is not said. It could be every compiled test that runs on the compiler's prelude, or only tests aimed at those files. P-38's content is not glossed. Unclear wording, and a cross-reference with no gloss.
- "bootstrap": here it means the three prelude files as temporary scaffolding. `build-and-caches.md` uses "bootstrap stubs" for something else: old class files of the compiler's library, built from `ProjectFortress/src/fortress/`. I cannot tell whether those stubs are also to be removed. Mildly two-way. Unclear wording.
- "a plan for him, which he approved (P-33)": the entry does not say what the plan's first step is. A worker must print P-33 to act on that sentence. Cross-reference with no gloss.
- "the compiled path reads the rest of the interpreter's library": "reads" could mean that the checker checks all of the library, or only the components a program imports. Minor. Unclear wording.

## P-26 "Where the type group's later positions conflict with the specification's early text, the later positions win."

**Decided:** Where the specification's early text and the type group's later positions disagree, the later positions are correct. The type group is the part of the team that built the type checker and the compiler. The early text was an aspiration. The type group later learned what can be built while trying to make the language run fast, with specialization required. The specification is revised to match them. The implementers' later word also outweighs unfinished specification text. The revival does not second-guess them, because it knows less than they did.

**Applies:** To conflicts between the specification's early text and the type group's later word. The entry names that later word as including:
- the exclusion rule;
- specialization kept;
- the compiler prelude's number types made siblings in 2009 and 2010 (the library's numbers are flat in the same way, P-43);
- Karl Naden's 2012 write-up "The Return Type Rule and Generics" (`Papers/Types/journal/justificationOfRTR.tex`);
- the POPL 2019 paper (F-166).

It also applies where specification text is unfinished.

**Requires:**
- Where they conflict, revise the specification to follow the later word, and do not side with the early text.
- Each such change is recorded with its reason in P-95.
- Do not override the type group's later choices on the revival's own judgement.

**Unfinished:** The specification revisions for each conflict. P-95 tracks them, but the entry does not say how many are done.

**Could not resolve:**
- "Specialization": the entry defines it as a separate version of a generic function for one instantiation, written beside the generic one (`tail(x: List[ZZ])` beside `tail[X](x: List[X])`), which dispatch chooses at run time. That is an overload that the programmer writes. `SKILL.md` ("The compiled run time") and `exploring.md` ("compiled code specialised to each instantiation of a generic") describe something else: the class loader makes a class for each instantiation from a template. So "specialization kept" reads two ways: keeping more specific overloads of generics, or keeping per-instantiation compiled code. Unclear wording, possibly two concepts under one word.
- `List[ZZ]`, `tail[X]`: `SKILL.md` says static parameters are written `[\T\]` and that `[i]` indexes. I cannot tell whether these examples use another notation (the paper's?) or are meant as Fortress. Notation I lack.
- "the specification's early text": nothing says how to tell early text from later text. The 2009–2010 flattening comes before the Working Draft of February 2011, so the dividing line is not the Working Draft's date. I cannot tell which passages of the current specification count as early. Unclear wording.
- "Their later word includes": an open list. `exploring.md` gives the same five items as a closed list ("These positions are"). I cannot tell whether other later works count, such as Steele's 2015 and 2016 talks or the 2012 patents. Unclear wording.
- "The implementers' later word also outweighs unfinished text": I cannot tell whether "implementers" means the type group or the whole team, including the interpreter's authors. "unfinished text" is not defined: text marked incomplete, or text that is silent on a point. Unclear wording.
- Scope: the entry ranks the later positions over the specification. P-158 cites P-26 to rank the team's later work over the interpreter's library. The entry does not state that wider scope. Unclear wording.
- "P-95 records each change": I cannot tell whether a worker who revises the specification adds to P-95 or only writes the `decision-record.md` that `specification.md` asks for. Unclear wording.

## P-43 "The exclusion rule stays, and the number tower is flat (route A)."

**Decided:** The compiled checker keeps the multiple-instantiation exclusion rule: no type may extend two instantiations of one generic trait. So the library's number types form no tower. They are siblings under `Number`, as Chase, Ryu, Maessen and Allen made the compiler prelude's numbers in 2009 and 2010. Each number type has its own algebra, and `Number` declares no operators that would apply to every number. The reasons:
- The type group's texts after the Working Draft agree on the exclusion rule.
- The Working Draft's types chapter says that the number types are mutually exclusive.
- The flattened prelude is the team's last record of how they did it, and it leads to the POPL 2019 paper, which keeps the rule.

The curator cares that specialised code is fast, not how a specialization is chosen. F-46 estimates the cost of going back to "route C".

**Applies:** To the compiled checker's type rules and to the one library's number types and their algebra. The decision is fixed.

**Requires:**
- Do not make one number type a subtype of another.
- Do not add catch-all operators on `Number`.
- Give each number type its own algebra.
- Keep the exclusion rule in the checker.

From `SKILL.md`: a wider type gets a `coerce` from each narrower one.

**Unfinished:** The entry names nothing. `SKILL.md` already describes the numbers as siblings, so this looks built.

**Could not resolve:**
- "route A", "route C": neither is defined. I cannot tell what route C is (keeping a tower, dropping the exclusion rule, something else), whether there is a route B, or what F-46's "price" is. "its route leads to the POPL 2019 paper" uses "route" again, either as a figure of speech or as "route A". Unclear wording: labels with no gloss.
- "The fixed widths, `ZZ`, `QQ` and `RR64` are siblings": `ZZ` (integers) and `QQ` (rationals) are not fixed-width, so this cannot be an apposition. Most likely it is a list: the fixed-width types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32`?), plus `ZZ`, `QQ` and `RR64`. But `RR64` is fixed-width, and the commas allow both readings. Unclear wording.
- "The curator cares that specialised code runs fast, not how a specialisation is chosen": I cannot tell what this asks of a worker, or which sense of specialization it means (P-26's dispatch-chosen overload, or the class loader's per-instantiation class). Unclear wording.
- "(`explorations/reviews/foundations/judgement.md`, tenet 5, lists the texts)": the entry does not name "the type group's texts after the Working Draft" itself. P-26 and `exploring.md` probably supply them, but that is an inference. Minor. Cross-reference.

## P-158 "A member that an api writes `abstract` is declared in the component that exports the api."

**Decided:** For each member that an api writes `abstract`, the trait or object in the exporting component must also declare that member, at the api's header (name, static parameters and bounds, modifiers, `throws`, parameter modifiers and types, return type, per `library.md`). It may do so with or without a body. The reasons:
- The compiler's prelude, which is the team's later work, restates such members without bodies.
- The team's own export check refused a component that left out any api member, abstract ones included.
- By P-26, this later practice beats the interpreter's library, which was written earlier for walk and leaves some out.

The specification's export rule asks only for fields and non-abstract methods, so this rests on the team's later work alone. The practical stake: without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (ledger row 816, as `compiler.md` names it).

**Applies:** To every api trait or object member written `abstract`, in the component that exports the api. The entry's wording covers members of traits and objects, not top-level functions.

**Requires:**
- In the exporting component, declare each such member at the api's exact header.
- The compiled export check must refuse a component that leaves one out.
- The checker must check that each object defines the member.
- Members that the interpreter's library leaves out must be added.

**Unfinished:**
- Adding the missing declarations to the interpreter's library; the entry does not say how many.
- Possibly making the export check refuse the omission (see below).

**Could not resolve:**
- "The compiled export check refuses a component that leaves one out": this is in the present tense, but `library.md` says the check "requires no component member for an api member written `abstract`", and `compiler.md` says "The export check passes the exporting component". I cannot tell whether the entry states the target (the check still to change) or the current state (the skill out of date). Unclear wording: tense.
- "the checker then checks that each object defines it": I cannot tell which objects: those in the exporting component that extend the trait, or every object anywhere that inherits the member. "then" suggests an order after the export check, but `compiler.md` puts the export check last among the checker's stages. Unclear wording.
- "with a body or without one": `library.md` says to write `abstract` in the api on each member that the component leaves without a body. If the component gives a body, I cannot tell whether the api should still write `abstract`. Unclear wording.
- "by P-26 ... that way wins over the interpreter's library": P-26, as written, ranks the type group's later positions over the specification's early text. It says nothing about the interpreter's library. This applies P-26 more widely than P-26 states. Unclear wording, across the two entries.
- "The specification's export rule asks a declaration only for each field and each non-abstract method": I cannot tell whether the specification's export rule is to be revised to require the abstract members (P-26's "the specification is revised"), or left as is because it does not forbid them. Unclear wording.
