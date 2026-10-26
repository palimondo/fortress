# Cold read of c1/clean.txt

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and, for terms, `references/compiler.md`, `library.md`, `specification.md`, `exploring.md`, `gate.md` and `tests-running.md`. Nothing else.

## P-26 Later word wins; each ground in its own layer; "later" is a date

**Decided:** When the team's later statements about the language disagree with the specification's early text, the later statements win. The team's word comes in three separate layers: (1) the language: `Specification/`, the 2012 Types chapter, the type group's papers, and the interpreter's library as the team's statement of the library; (2) the team's JVM implementation: the compiled checker, the code generator, the class loader, the run time, the compiler's prelude and walk; (3) Java interoperability. Evidence is weighed only inside its own layer. Within the language layer, later texts that agree with each other outrank earlier ones, ordered by year: Working Draft (2010), the 2011 type-group paper, the 2012 Types chapter and Naden's 2012 Return Type Rule write-up, then the POPL 2019 paper (last). Where the specification disagrees with them, the specification is revised to match. Team code counts as their word on the language only where they wrote the rule on purpose: in a text, a commit message, a code comment, or a checker rule enforced as the language's rule. Stubs they disowned ("bogus", "temporary hack") and workarounds of JVM or checker gaps do not count. The entry also separates two senses of "specialisation": a specialised overload (a language feature: an overload for one instantiation, chosen by run-time dispatch) and stamping (the class loader making one class per instantiation: implementation).

**Applies:** Every question about what the language says where the team's sources disagree. Limits: (a) a ground in one layer does not by itself decide a question in another; a JVM or checker limit never decides the language. (b) When two later sources conflict with each other, this rule gives no order; the question is decided by the goal (P-8). (c) The ranking is by date, so a commit must be dated against the texts before it is called later (a 2009 prelude change is earlier than the 2011 paper).

**Requires:** Classify each ground by layer before using it. Do not argue from a checker or JVM limitation to a language rule. Date any commit you cite as "later". Do not treat a disowned stub or a gap workaround as the team's word. When two later sources conflict, decide by the goal and say so explicitly. Keep "specialised overload" (language) and "stamping" (implementation) apart.

**Unfinished:** Nothing to build in this entry. Revisions of the specification to follow the later texts are recorded under P-95.

**Could not resolve:**
- "the Working Draft that the team last edited in 2010-12" and "the Working Draft (2010)" here, against "the team's Working Draft of February 2011" in P-7 and P-42 (and in `specification.md`). One document seems to carry two dates. Since this entry says "later is a date", it matters which date counts against the 2011 paper. The ranking lists the Working Draft first, so I would follow that order, but the wording is unclear.
- "the team's library, the interpreter's, as their statement of the language's library" sits in the language layer, but the library is also code, and "the team's code counts as their word on the language only where they wrote the rule on purpose". I could read it two ways: every library declaration is the team's word on the library, or only declarations written on purpose are. The year ranking also lists only texts, not the library, so I cannot tell where library code falls in the ranking. Unclear wording.
- "decide by the goal (P-8), and say so": P-8 is not in front of me (P-7 states the goal). "Decide" could mean the worker decides, or (per the skill, where a conflict is a reason to explore) the question goes to the curator. Unclear wording.
- "does not by itself decide": this may mean a ground from another layer can still add weight, or that it counts for nothing there. Unclear wording, minor.
- "What they learned is evidence about the implementation": I read this as saying the type group's building experience bears on the implementation layer, while the language ranking rests on the Working Draft's self-contradiction plus the later texts' agreement. That is my reading, not something the entry spells out.

## P-37 One library, the interpreter's, serves both paths

**Decided:** The interpreter's library becomes the only library. Its prelude (`FortressLibrary`, `FortressBuiltin`) replaces the compiler's prelude on the compiled path, which then checks, compiles and runs the interpreter's library. The compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) is a temporary bootstrap: nothing is added to it, and at the switch-over its three files are deleted while their tests are kept. The decision is final ("not put to the curator again").

**Applies:** To which library files survive, not to the designs inside them. The prelude's designs are implementation-layer evidence, not authority. A prelude design that differs from the library's binds the one library only in two cases: (1) the team's later word on the language backs it (example: the exclusion rule backing the flat numbers, P-43); or (2) the language's text is silent or ambiguous and the team's compiled checker enforces the design as a rule (example: P-158). In both cases the design must also be later, by P-26's dating, than the library's text on the same shape, and no later language text may contradict it. A stub, or a workaround of a checker gap (example: fixed arities instead of varargs), never binds. The decision does not stop code-generator work. The library's other 40 components are handled by P-33, which also holds the approved plan for how the checker comes to accept the library.

**Requires:** Add no declaration to the three compiler-prelude files. Do not copy a prelude design into the library unless one of the two cases holds and the dating and no-contradiction conditions are met. Keep the prelude's tests at the switch-over (P-38 says which are respelled). Do not reopen the decision with the curator.

**Unfinished:** The switch-over itself. Its condition is two zeros over fourteen components (the "distance stage's" twelve plus `CovariantCollection` and `OneShotFlag`, which `List` imports): no checker error, and no declaration refused by the code generator. Today the code generator refuses 52 declarations that the checker passes (F-34). Also unmeasured: whether the compiled path can run the library at all; no library component has yet been compiled and run. Still to do: delete the three prelude files and respell tests per P-38.

**Could not resolve:**
- "the distance stage's twelve": "distance stage" is not defined in the skill (it defines only the "count stage", which runs on `FortressLibrary` and the apis it imports). I cannot name the twelve components, or tell whether the count stage's total of 0 (SKILL.md) already meets the checker zero. This is a project term I lack, not a language concept.
- "needs two zeros": SKILL.md says the switch-over also waits for walk's natives (each `builtinPrimitive` binding needs a compiled binding). I cannot tell whether the two zeros are the whole condition or only part of it. Unclear wording, or the entry leaves out a condition.
- "the library's text on the same shape": "shape" is vague (the same declaration? the same design pattern?), and nothing says how library text is dated (by its commit?). Unclear wording.
- "P-33 places the library's other 40 components": "places" could mean "schedules", "assigns to a stage" or "decides the fate of". Unclear wording, minor.
- "respelled" (P-38): I take it to mean the tests are rewritten against the interpreter's library's names, but that is a guess. Unclear wording, minor.

## P-43 The exclusion rule stays; the number tower is flat (route A)

**Decided:** The compiled checker keeps the exclusion rule: no type may extend two different instantiations of one generic trait. So number types are flat siblings under `Number`, none a subtype of another, each with its own algebra. `Number` declares no catch-all operators. This is route A.

**Applies:** The language layer. The rule is stated in the 2011 paper, the 2012 Types chapter, Naden's 2012 write-up and the POPL 2019 paper. A nested tower breaks it (if `ZZ32 extends ZZ64`, `ZZ32` is `Integral` at two instantiations). The Working Draft's types chapter ("mutually exclusive; no value has more than one of them") agrees with the later texts, and its library chapters (ℤ a subtype of ℚ) lose. The compiler's prelude, flattened in 2009 and 2010, is an example of the same answer, not a ground for it. Limit: route C (a nested tower under the forest rule of the team's 2012 patent applications) is not closed; any return to it is weighed against F-46 (what it would need) and P-95 (which keeps it open).

**Requires:** Do not make one number type extend another, and do not relax the exclusion rule in the checker. Give each number type its own algebra instances. Add no catch-all operators to `Number`. Do not cite the compiler's prelude as the reason for flatness. Weigh any proposal for a nested tower against F-46 and P-95.

**Unfinished:** Nothing stated.

**Could not resolve:**
- "The fixed widths, `ZZ`, `QQ` and `RR64` are siblings": this reads two ways. Either "the fixed widths" (`ZZ32`, `ZZ64`, ...) plus `ZZ`, `QQ` and `RR64`, or "the fixed widths, namely `ZZ`, `QQ` and `RR64`". The second cannot be right, since `ZZ` and `QQ` are not fixed-width, but the sentence does not rule it out. SKILL.md lists eight siblings. Unclear wording.
- "the forest rule": a language concept I lack. The skill does not define it (it names only a file I may not read).
- "P-95, which keeps it open": elsewhere P-95 is the record of specification changes. I guess the route A change's record holds a "way back" to route C, but the entry does not say so. Who may reopen route C (a worker exploring, or only the curator) is also unstated. Unclear wording.
- Route B is never mentioned. That is not blocking, but "route A" suggests a set of routes the reader is not given.

## P-42 An unbounded type parameter is bounded by `Any`, not `Object`

**Decided:** A type parameter declared without a bound has the implicit bound `Any`, which includes tuples and `()`. `Object` does not include them.

**Applies:** Every unbounded type parameter, as a language rule. Grounds: the POPL 2019 paper says so; the Working Draft instantiates type parameters at tuple and arrow types, which its own `Object` sentence would forbid, and that sentence is absent from the 2008 1.0 release; the library instantiates unbounded parameters at tuples (arrays indexed by `(ZZ32,ZZ32)`). The revised specification already states `Any`, with a callout noting the February 2011 Working Draft's `Object`. Java interoperability gives no ground for `Object` (`java.lang.Object` maps to Fortress `Any`, `NamingCzar.java:447`). Limits: the compiled path still uses `Object`, through Steele's 2012 setting, which `fortress compile` sets at `Shell.java:372` in `useCompilerLibraries()`. That setting is an implementation fact, not the language's rule, and it makes the compiled path refuse a generic instantiated at a tuple (row 412). The switch-over alone will not end this; only changing that line will. Two compiled failures do not come from the bound and will survive the fix: `()` as a static argument (row 339), and a generic dotted method with one tuple-typed parameter (no ledger row yet).

**Requires:** Treat `Any` as the bound in the language, the specification and tests. Do not cite the compiled path's `Object` as the language's rule, or as a Java-interop requirement. Do not expect the switch-over to fix row 412. Do not attribute rows 339 or the dotted-method failure to the bound.

**Unfinished:** Changing the line at `Shell.java:372` to `false`, scheduled for climb batch 22c. Also a ledger row for the generic dotted method with one tuple-typed parameter.

**Could not resolve:**
- "in climb batch 22c": I take this as a scheduled batch of work (the skill names `climb-batch-*` folders). It reads two ways: as a schedule note only, or as a bar on making the change outside that batch. Unclear wording, minor.
- `compiler.md` says the `Object` bound lasts "until the switch-over (ledger row 412)", and this entry says the switch-over does not end it by itself. I take the entry as governing, but the two texts pull against each other.

## P-7 The goal: finish the designers' intent, measured by microGPT compiled and fast

**Decided:** The revival's goal is to finish what the designers intended, without redesigning the language. Success is measured by one program, microGPT, compiled to JVM bytecode and running fast. Intent is judged by the specification in `Specification/` (the February 2011 Working Draft, as the revival revises it), with the Types chapter of the team's unfinished 2012 restart cited beside it (P-25). The specification is revised only to reconcile contradictions: where the team's later word contradicts the original text, the text follows the later word (P-26 says what counts as later word; P-95 says how a change is recorded). The specification is a living document that states every revival change. The baseline is a pure-Java microGPT, treated as the optimal result to aim at.

**Applies:** Every piece of work, as the top-level goal. Limits: no redesign of the language. Specification changes are limited to reconciling contradictions, and each is recorded.

**Requires:** Judge intent by the revised specification and the 2012 Types chapter. Revise the text only to follow the team's later word, and record each change. Do not redesign. Measure compiled microGPT against the pure-Java baseline.

**Unfinished:** Compiled microGPT running fast and approaching the pure-Java baseline. The entry gives no current figure.

**Could not resolve:**
- "the team's 2012 restart": resolved from `specification.md` (`Documentation/Specification/`, unfinished; its Types chapter is `.../types.tick`).
- The specification is called "the team's Working Draft of February 2011" here, but "last edited in 2010-12" and "(2010)" in P-26. See P-26.
- "running fast": no threshold beyond "aim at" the pure-Java baseline. Where that baseline lives is not stated. Minor, not blocking.

## P-158 A member that an api writes `abstract` is declared in the exporting component

**Decided:** For every member that an api marks `abstract`, the component that exports the api must declare that member in its trait or object, at the api's header (same signature), with or without a body. The export check refuses a component that leaves one out, and the checker then checks that every object provides it.

**Applies:** Every api member written `abstract`, in the component that exports that api. Grounds: the specification says no body is needed in the api but is silent on whether the component declares the member (`Specification/basic/components/apis.tex`, "Component and API Identity"). Where the text is silent, P-37 makes a team checker rule binding, and the team's 2012 export check refuses a component that omits such a member. The compiler's prelude also restates each such member without a body. The curator chooses the compiled path's way over the interpreter's library, which was written for walk and omits some such members. The `NoSuchMethodError` that a compiled client hits when the member is missing (row 816) is the cost of the other reading, not the ground.

**Requires:** In each component, declare every `abstract` api member at the api's exact header (a body is optional in a trait). Make sure each object provides it. Fix the interpreter's library where it omits such members.

**Unfinished:** Not stated, though the interpreter's library still leaves some such members out.

**Could not resolve:**
- "The compiled export check refuses a component that leaves one out" and "the team's export check of 2012 refuses a component that leaves one out" contradict the skill. `library.md` says the export check "requires no component member for an api member written `abstract`", and `compiler.md` says "The export check passes the exporting component". The entry gives no "still to build". So I cannot tell whether the refusal is current behaviour, a change still to build, or the team's 2012 behaviour that the current tree has lost. This blocks knowing what a worker should expect from the check today.
- "the curator takes the compiled path's way over the interpreter's library ... by the team's later word": "over" reads two ways ("in preference to" or "across"). I take "in preference to". The sentence is long and nested. Unclear wording.
- P-37 also requires the binding design to be later than the library's text on the same shape. This entry does not say that this dating condition was checked for the 2012 export check. It may be met, but it is not shown.
