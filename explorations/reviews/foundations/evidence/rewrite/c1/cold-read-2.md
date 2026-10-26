# Cold read 2: foundations rewrite, c1

Read: `explorations/reviews/foundations/rewrite/c1/clean.txt` (six positions: P-26, P-37, P-43, P-42, P-7, P-158).
Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and term look-ups in `references/compiler.md`, `library.md`, `interpreter.md`, `exploring.md`, `gate.md`, `tests-running.md`. Nothing else.

Cross-references to other entries (P-8, P-25, P-33, P-38, P-77, P-95, F-34, F-46, F-166, ledger rows) could not be followed. They are listed below only where the meaning depends on them.

---

## P-26: later word wins; grounds weighed by layer; "later" is a date

**Decided:** Where the team's later statements about the language disagree with the early text of the specification, the later statements win. "Later" means a date you can check, not how recent something feels. The team's sources fall into three layers, and each ground is weighed inside its own layer:
1. *The language*: the Working Draft of Feb 2011 (text last edited Dec 2010), the revival's revision of it in `Specification/`, the 2012 Types chapter, the type group's papers, and the interpreter's library, taken as the team's statement of the language's library. A text that argues from Java, like the 2011 paper, still belongs to this layer.
2. *The JVM implementation*: the compiled checker, code generator, class loader, run time, the compiler's prelude, and walk.
3. *Java interoperability*: how Fortress types and natives meet Java's.

Inside the language layer, later texts that agree with each other outrank earlier ones. The order by year is: Working Draft (2010 text), the type group's 2011 paper (`Papers/Types/`), the Types chapter and Naden's RTR write-up (2012, `Papers/Types/journal/justificationOfRTR.tex`), then the POPL 2019 paper, which comes last. Where the specification disagrees with these, the specification is revised to follow them. P-95 records each revision. The entry also separates two senses of "specialisation". A *specialised overload* (for example `tail(x: List[ZZ])` beside `tail[X](x: List[X])`, chosen by dispatch at run time) belongs to the language. *Stamping* (the class loader making one class per instantiation) belongs to the implementation.

**Applies:** Whenever team sources conflict about the language. Limits:
- A ground in one layer can confirm a question in another layer but cannot decide it alone.
- A JVM or checker limit never overrides the language texts.
- Where the texts are silent, the curator decides by the goal (P-8), and an implementation ground may weigh there (P-77).
- Where two later sources conflict, this rule gives no order. The curator decides by the goal, and the record says so.
- Implementation code counts as the team's word on the language only where the rule was written on purpose: in a text, a commit message, a code comment, or a checker rule enforced as the language's rule. It does not count if the team called it a stub ("bogus", "temporary hack"), or if it works around a JVM or checker gap.

**Requires:**
- Classify each ground by its layer before weighing it.
- Do not let an implementation limit decide a language question.
- Date a commit against the texts before calling it "later". For example, a 2009 prelude change is earlier than the 2011 paper.
- Do not count stubs or workarounds as the team's word.
- Revise `Specification/` to follow agreeing later texts, and record each change (P-95).
- Keep "specialised overload" (language) apart from "stamping" (implementation).

The rationale given: the early text was a wish, while the type group learned by building, and the revival does not second-guess them. That rationale is itself implementation evidence. The language-layer ground is that the Working Draft contradicts itself: its types chapter makes the number types mutually exclusive, while its library chapters make ℤ a subtype of ℚ. The later texts agree with each other on the exclusion rule, the overloading rules and the default bound.

**Unfinished:** None stated, apart from the ongoing revision of the specification (P-95).

**Could not resolve:**
- "later texts that agree with each other rank above earlier ones" (unclear wording). There are two readings. (a) Later texts outrank earlier ones only when several later texts agree. (b) The later texts, which happen to agree, outrank earlier ones. Under (a), the entry does not say what happens when a single later text contradicts an earlier one with no second text agreeing. The title ("the later word wins") suggests (b).
- Where the team's library sits in the date order (unclear wording). The library is placed in the language layer, but the ranked list by year does not mention it. P-37 then dates a prelude line against "the library's text on the same shape, by P-26's dating". So library lines seem to carry dates, but P-26 never says how library text ranks against the papers.
- Implementation code that "counts as their word on the language" (unclear wording). Once such code counts, it is not clear whether it joins the language layer and can decide a question there, or still only confirms because of the cross-layer limit. If it can decide, it is also unclear where it ranks among the dated texts.
- "the type group's papers" (plural, in the layer list) vs "the type group's paper (2011, `Papers/Types/`)" (singular, in the ranking) (unclear wording). It is not clear whether other type-group papers rank, and at what dates.
- "decides by the goal (P-8)" (missing context). P-7, in this same file, states the goal, so it is unclear what P-8 adds. Also, "a ground in the implementation may weigh there (P-77)" has no stated limits here.

---

## P-37: one library, the interpreter's, serves both paths

**Decided:** The interpreter's prelude (`FortressLibrary`, `FortressBuiltin`) and the rest of its library become the compiled path's library. The compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) was a bootstrap and will be removed. The curator's reason: the switch-over exists so that walk's library never has to be ported into the compiler's library, and the checker is developed further until it accepts the fuller library. The language ground: the specification names one set of default libraries (chiefly `FortressLibrary` and `FortressBuiltin`) and never names the compiler's.

**Applies:** To which library files survive. It does not settle the designs inside those files.

The compiler's prelude belongs to the implementation layer, so its designs are evidence, not authority. A prelude design that differs from the library's binds the one library in only two cases:
1. The team's later word on the language backs it. Example: the exclusion rule backs the flat number types (P-43).
2. The language text is silent or ambiguous, and the compiled checker enforces the design as a rule (P-158).

A prelude line counts as later word only if both hold:
- it is later, by P-26's dating, than the library's text on the same shape;
- no later language text contradicts it.

Stubs, and workarounds of JVM or checker gaps (such as fixed arities in place of varargs), never bind.

**Requires:**
- Add no declaration to the three compiler-prelude files.
- At the switch-over, delete those three files and keep their tests. P-38 says which tests are respelled.
- Do not treat a prelude design as binding outside the two cases above.
- Do not reopen the decision with the curator.
- Work on the code generator continues: it is compiler work under either library.
- Follow the curator-approved plan (P-33) for how the checker comes to accept the library.

**Unfinished:**
- The switch-over itself.
- Its preconditions: the natives (P-33; the skill says each `builtinPrimitive` needs a binding the compiled path runs), plus two zeros over fourteen components (the distance stage's twelve, plus `CovariantCollection` and `OneShotFlag`, which `List` imports). The two zeros are no checker errors and no declarations refused by the code generator.
- Measured so far: the code generator refuses 52 declarations (F-34).
- Not yet measured: any library component compiled and run. The premise that the compiled path can run the library is therefore unmeasured, not refuted.
- Clearing the library's other components, on the schedule set in P-33.

**Could not resolve:**
- "the distance stage" (project term, missing context). Neither `SKILL.md` nor the references define it. They define the *count stage* (FortressLibrary plus the apis it imports). So I cannot tell which twelve components are meant, or whether they are the count stage's set.
- "refuses 52 declarations of the twelve that the checker passes" (unclear wording). "Of the twelve" presumably means "in the twelve components". But "that the checker passes" could qualify the components (the checker finds no error in any of the twelve) or the 52 declarations. So I cannot tell whether the checker-zero condition is already met for the twelve. The entry also does not say whether it is met for `CovariantCollection` and `OneShotFlag`.
- "the team's later word on the language backs it" (case 1) (unclear wording). The next sentence lets a prelude line itself count as later word, which suggests the backing can come from the prelude line itself. But the example, and P-43, say the prelude is "not a ground". So it is unclear whether a purposeful, later prelude line can be the backing on its own, or whether a language text must supply it.
- "the library's text on the same shape" (unclear wording). I read "shape" as "the same construct or design point", but the term is not defined.

---

## P-43: the exclusion rule stays; the number tower is flat (route A)

**Decided:** The compiled checker keeps the multiple-instantiation exclusion rule: no type extends two different instantiations of one generic trait. So the library's numbers are flat. `ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32`, `RR64`, `ZZ` and `QQ` are siblings under `Number`, each with its own algebra, and `Number` has no catch-all operators. This choice is called route A.

**Applies:** To the number types and their algebra traits, and to any type design that would extend one generic trait at two instantiations. Limits:
- The grounds are all in the language layer: the 2011 paper (`Papers/Types/exclusion.tick`), the 2012 Types chapter, Naden's 2012 write-up, and POPL 2019.
- A nested tower with the algebra traits at each level is impossible under the rule. For example, `ZZ32 extends ZZ64` would make `ZZ32` `Integral` at two instantiations.
- The Working Draft's sentence that the numeric types "are mutually exclusive" (`Specification-1.0-frozen/basic/types-vals-vars.tex`) is backed by the later texts. Its library chapters' ℤ ⊂ ℚ is not.
- The compiler prelude's 2009–2010 flattening is an instance of the same answer, not a ground for it.

**Requires:**
- Do not build a nested number tower.
- Do not give one type two instantiations of a generic trait.
- Do not add catch-all operators on `Number`.
- Cite the language texts as the grounds, not the prelude.
- Any return to route C (a nested tower under the forest rule of the team's 2012 patent applications) must be weighed against F-46, which says what route C would need.

**Unfinished:** None stated. The present tense ("the library's numbers are flat") and `SKILL.md` ("Numbers are siblings") suggest the flat tower is already in place.

**Could not resolve:**
- "route A", "route C" (project labels). Route A is defined here only by its content. Route B is never mentioned. These labels are harmless, but they hint at a list of options that the reader does not see.
- "the forest rule of the team's 2012 patent applications" (language concept I lack). It is not in the skill. `exploring.md` only names a record file about it, which I may not read.
- "P-95, which keeps it open" (unclear wording). It reads two ways. (a) Route C is still a live option, and a worker may raise it. (b) Only the specification keeps a note that it was considered. The entry also does not say who may "return to it": the curator only, or a worker exploring.
- "catch-all operators" (unclear wording, mild). I read it as operators declared on `Number` over `Number` arguments, as a fallback for mixed types. The entry does not define it.

---

## P-42: an unbounded type parameter's implicit bound is `Any`, not `Object`

**Decided:** A type parameter declared without a bound is bounded by `Any`. `Any` holds tuples and `()`, which `Object` does not. The grounds are in the language layer:
- POPL 2019 states the `Any` default outright.
- The Working Draft instantiates type parameters with tuple and arrow types, which its own `Object` sentence would forbid, and that sentence is absent from the 2008 1.0 release.
- The library declares unbounded parameters and instantiates them at tuples: `zip`'s `(E,F)`, and arrays indexed by `(ZZ32,ZZ32)`.

The specification already states `Any`, with a callout that the Feb 2011 Working Draft said `Object`.

**Applies:**
- The rule applies to the language on both paths.
- The compiled path's `Object` bound comes from Steele's 2012 setting at `Shell.java:372` (in `useCompilerLibraries()`). It is implementation only and not the language's rule. Because of it, `fortress compile` refuses generics instantiated at a tuple (row 412), or sometimes compiles them wrong (row 691).
- The switch-over alone does not fix this. Changing that one line does.
- Two compiled-path failures do not depend on the bound, so the line change will not fix them: `()` as a static argument (row 339), and a generic dotted method with one tuple-typed parameter (no ledger row yet).
- Java interoperability gives no ground for `Object`: `java.lang.Object` maps to Fortress `Any` (`NamingCzar.java:447`).

**Requires:**
- Treat `Any` as the bound in the language, the specification and the library.
- Do not take the compiled path's `Object` behaviour as the rule, or as a reason to bound library parameters by `Object`.
- Do not expect the switch-over to fix rows 412 and 691, and do not expect the line change to fix row 339 or the dotted-method case.

**Unfinished:** Change the line at `Shell.java:372` to `false`, in climb batch 22c.

**Could not resolve:**
- "its `Object` sentence is not in the 1.0 release of 2008" (unclear wording). The entry does not say what this shows. I read it as "the sentence is a late addition, not the original design", but under P-26 a later sentence would weigh more, not less. So I cannot tell how this point weighs.
- The entry conflicts with the skill (unclear wording across sources). `references/compiler.md` line 69 says the compiled path rejects generics instantiated at a tuple type "until the switch-over (ledger row 412)". This entry says "The switch-over does not end this by itself; that one line does." A worker who reads both gets two answers. The entry is the more specific and is presumably right.
- "Steele's setting of 2012" (unclear wording, mild). From "the change of that line to `false`", I read it as a boolean flag set to true at that line, but the entry never names the flag.
- "(no ledger row yet)" (unclear wording, mild). The entry does not say whether a worker who meets this failure should add the row.

---

## P-7: the goal

**Decided:** The goal is to finish what the designers intended. Success is measured by microGPT, compiled to JVM bytecode and running fast. Designers' intent is judged by `Specification/`: the Feb 2011 Working Draft as the revival revises it, with the 2012 Types chapter cited beside it (P-25). The specification is revised only to reconcile contradictions: where the team's later word contradicts the original text, the text follows the later word. P-26 says what counts as later word. The language is not redesigned. A pure-Java microGPT is the baseline, the best result possible, which compiled microGPT aims at.

**Applies:** To every choice in the revival, as its tie-breaker and its yardstick. One limit: specification changes reconcile contradictions and must not redesign the language.

**Requires:**
- Judge intent by the specification, read with the later word.
- Change the specification only to reconcile contradictions, and state every change in it (P-95).
- Do not redesign the language.
- Measure compiled microGPT against the pure-Java baseline.

**Unfinished:** The whole goal: microGPT compiled and running fast, near the pure-Java baseline.

**Could not resolve:**
- "running fast" / "the optimal result, the one to aim at" (unclear wording, mild). No threshold is given. I read the pure-Java version as a ceiling to approach, not a bar that must be matched. The entry also does not say where the pure-Java microGPT lives.
- "the team's 2012 restart" (missing context). The skill does not say what was restarted in 2012. I infer the type system work, from P-26's "2012 Types chapter".

---

## P-158: api members written `abstract` are declared in the exporting component

**Decided:** If an api writes a member `abstract`, the component that exports the api declares that member in its trait or object at the api's header, with or without a body. The rule chosen is the compiled path's way, not the way of the interpreter's library. That library was written for walk and leaves some such members out.

The ground: the specification is ambiguous.
- "Component and API Identity" (`Specification/basic/components/apis.tex`) asks for no body and is silent on the declaration.
- "Export Statements" (`Specification/basic/components/source-code.tex`) reads either way.

Where the text is silent or ambiguous, the team's checker rule binds (P-37). The team's prelude restates each such member without a body, and the team's export check refused a component that left one out (in their tree by Dec 2011). The `NoSuchMethodError` that compiled clients hit without the declaration (row 816) is the cost of the other reading, not the ground for this one.

**Applies:** To every component that exports an api with `abstract` members, the library included. It is a source rule, so it holds whichever path runs the code. The compiled export check enforces it, and the checker then checks that each object defines the member.

**Requires:**
- Declare each such member in the exporting component's trait or object, at exactly the api's header.
- Do not leave it out, as parts of the interpreter's library now do.
- Do not justify the rule by the `NoSuchMethodError`. The ground is the ambiguous text plus the team's checker rule.

**Unfinished:**
- Repair row 816.
- Restore the export check's "count".
- Add 12 bodyless declarations in five component traits.

**Could not resolve:**
- "The compiled export check refuses a component that leaves one out" (unclear wording: two readings). In the present tense this reads as the check's current behaviour. But the entry later lists "the export check's count restored" as still to build. Also, `references/library.md` line 44 says the check "requires no component member for an api member written `abstract`", and `compiler.md` line 74 says "The export check passes the exporting component". So it is unclear whether the sentence states the required rule or what the tree does today. The skill says the tree does not do this yet.
- "the export check's count restored" (unclear wording). I cannot tell what "count" refers to: a number of members the check compares, a test count, or something the revival removed. What exactly must be restored is not stated.
- "asks for no body there" (unclear wording). "There" could mean in the api or in the component. I read it as "it does not require the component to give a body", but the sentence could also be about the api's own declaration.
- "by the team's later word (P-26)" (unclear wording, mild). The entry gives no dates showing that the export check (Dec 2011) or the prelude restatement is later than the interpreter library's text on this point, though P-26's dating is invoked. The ground actually used is the ambiguous-text route of P-37, so this does not block action.
