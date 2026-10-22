# Cold read 2: positions p1 (P-7, P-8, P-9, P-10, P-11, P-17, P-19, P-25, P-26)

Read with only `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, and term look-ups in its `references/` (`exploring.md`, `build-and-caches.md`, `compiler.md`, `library.md`, `interpreter.md`). Nothing else read.

## P-7

**Decided:** The project's aim is to complete the Fortress design as its designers meant it, not to invent a new language. Success is measured by one program, microGPT, compiled to JVM bytecode and running fast. The designers' intent is read from `Specification/` (the team's February 2011 Working Draft), which the revival edits only to settle contradictions: where the team's later work (the compiler, the type papers) contradicts the draft, the draft is changed to match the later work. The 2012 restart's Types chapter is cited beside it. Every change is stated in the specification itself. The yardstick for "fast" is a pure-Java microGPT, treated as the best achievable result.

**Applies:** Always; this is the governing goal. Limit: the specification is revised only to reconcile contradictions, never to redesign.

**Requires:** Judge design questions by `Specification/` as revised; do not redesign the language; when a revision is made, record it in the specification (how: P-95). Measure compiled microGPT against the pure-Java version.

**Unfinished:** The pure-Java microGPT (PLAN, "Phase 6. microGPT fast").

**Could not resolve:**
- "running fast": no threshold is given. The pure-Java program is "the optimal result, the one to aim at", but the entry does not say how close counts as done. Unclear wording.
- "baseline": normally a floor to beat, here used for the ceiling to approach. The sentence explains it, but the word reads two ways at first. Unclear wording.
- "the team's later work, in the compiler or in the papers on types": does this include the interpreter and the library, or only the compiler and the papers? P-26 speaks of "the type group"; whether the two sets are the same is not said. Unclear wording.

## P-8

**Decided:** When none of the team's sources (specification, papers, library, implementations) answers a question, the curator decides it by what gets microGPT compiled and fast, not by type-theoretic purity, while keeping to the spirit of Fortress. He accepts the language's unfinished parts as they stand rather than stalling the work on theory. He has not read the specification, the type papers or the library, and defers to the designers.

**Applies:** Only to questions the sources leave open. Where the sources answer, they rule (P-7, P-26).

**Requires:** Not stated directly. As I read it with the skill: a worker brings an open question to the curator (skill, "When to explore") and frames the options by their effect on the goal, not by purity; the worker should not expect the curator to know the sources, so must quote them.

**Unfinished:** Nothing named.

**Could not resolve:**
- "the spirit of Fortress": not defined anywhere I may read. Unclear wording.
- "accepts the language's unfinished corners as they are": two readings. (a) Leave unfinished features unfinished unless microGPT needs them; (b) where a rule is incomplete, take a working answer without completing the theory. (a) seems to sit uneasily with P-7's "finish what the designers intended". Unclear wording.
- "He has not read the specification ...": the entry does not say what a worker should conclude from this (for example, that a question to him must carry the source text). Unclear wording.
- "give no answer": does a conflict between sources count as "no answer"? P-26 covers only later type-group positions against early text; other conflicts are not addressed here. Unclear wording.

## P-9

**Decided:** The revival seeks the most readable way to write the microGPT algorithm. C4 (`explorations/run-c4/src/MicroGptFlat.fss`) is the flat microGPT program, its data laid out in Aaron Hsu's flat APL style. Readability work in C4 goes into the vocabulary, meaning the array operations the model lines call (`FlatArrays.fss`, plus what has moved into the standard library), not into the model lines themselves. A change to a model line goes to the curator as a diff first (P-87). C4 is also the target of the APL program: each APL line expands into the line C4 writes by hand. Hyperparameters in C4 are one tuple binding, which is what the APL sub-language makes of a strand assignment. Semicolon-separated declarations on one line are not used.

**Applies:** To C4 and to the APL program's relation to it. Limit: no speed edits to C4 until microGPT runs compiled (P-29).

**Requires:** Improve readability through `FlatArrays.fss` and the library; show any change to a model line to the curator as a diff before making it; write hyperparameters as a tuple binding, not `a = 1; b = 2; ...`; keep APL lines expanding to C4's lines.

**Unfinished:** Not stated. "searches" suggests ongoing work but names no task.

**Could not resolve:**
- "Aaron Hsu's flat style of APL": not in the skill. A concept I lack (a style, not a Fortress term). I read it as flat arrays with no nesting, but that is a guess.
- "the model's lines": I take this to mean the lines of `MicroGptFlat.fss` as opposed to `FlatArrays.fss`. Whether it also covers the APL program's lines is not said. Unclear wording.
- "each of its lines expands into the line that C4 writes by hand": is this strictly one APL line to one C4 line? And when C4's vocabulary changes, must the APL program (closed per P-10) follow? Unclear wording.
- The ban on the one-line semicolon form: does it apply only to C4's hyperparameters, or to all of C4? Unclear wording.

## P-10

**Decided:** The APL side quest is over. Its sub-language, a DSL grammar in `explorations/apl/` that expands APL text into Fortress code over Fortress's own arrays (not an APL interpreter), covers only what the APL microGPT program needs. Tacit functions, characters and nested arrays will not be built. The APL microGPT program (`explorations/apl/mg/MicroGptApl.fss`) stays in the microGPT check under walk.

**Applies:** To the APL sub-language and its program. Limit: the check's one-minute limit (P-30).

**Requires:** Do not extend the sub-language toward the unbuilt parts of APL. Keep the APL program passing in the microGPT check under walk.

**Unfinished:** Nothing; the quest is closed.

**Could not resolve:**
- "tacit functions": an APL term (point-free function trains) that the skill does not define. A concept I know only from outside the skill.
- "closed": may the sub-language still be fixed or extended if the APL program needs a new form (for example after C4 changes, P-9)? "covers only what the APL microGPT program needs" can read as "may grow with that need" or as "frozen". Unclear wording.
- "Fortress's native arrays": I take this to mean the library's array types, but the entry does not say which. Unclear wording.
- "the check's limit of one minute": `interpreter.md` gives about 56 s for the quick pair together. Is the minute per program or for both? Unclear wording (it may be clearer in P-30).
- "under walk": whether the APL program is also expected to compile is not said. Unclear wording.

## P-11

**Decided:** Fortify's two-dimensional rendering of Fortress source as typeset mathematics (`Fortify/`, `bin/fortify`, `bin/fortick`, used for the specification and the papers) is a gimmick. No one works on it unless the curator asks. It is presentation only, off the revival's path, and not a selling point for Fortress. The verdict covers that typesetting only: Unicode operators such as `∑` and `×` remain real language syntax.

**Applies:** To the 2D rendering and to Fortify. Limit: not to the Unicode operators.

**Requires:** Do not work on Fortify or the 2D notation unasked; do not cite it as an argument for Fortress. Unicode operators may be used as syntax.

**Unfinished:** Nothing.

**Could not resolve:**
- "fixes one view of a computation, though the same mathematics can be written in many ways": the reasoning is hard to follow; I am not sure what "one view" means here. It does not block the decision. Unclear wording.
- "no work on it": does that cover keeping Fortify working when a revised specification is built with it, or when a parser change breaks it? Unclear limit.
- "the language's own syntax": does this make Unicode operators preferred over their ASCII forms (`SUM`, `BIG MAX` in the skill), or only allowed? Unclear wording.
- `bin/fortick`: not explained, though not needed for the decision.

## P-17

**Decided:** The compiled path must keep doubles, and arrays of doubles, unboxed. Without this the revival fails at its purpose. Reason: a high-performance language cannot box its numbers. Today the code generator boxes every number (`RR64` is an `FRR64` object), and in Java models of microGPT's three array kernels (dot product, matrix product, row lift), boxing is the main cost (F-11). Arrays storing doubles as `double[]` is P-84's decision.

**Applies:** To the code generator and the compiled run time.

**Requires:** Plan the compiled path toward unboxed `RR64` values and `double[]` array storage; do not treat boxing as acceptable in the end state.

**Unfinished:** `double[]` storage for arrays (PLAN phase 5, microGPT compiles); unboxed arithmetic chosen by static type (PLAN phase 6, microGPT fast).

**Could not resolve:**
- "row lift": the name of a kernel that is not defined in the entry or the skill. A concept I lack.
- Scope of "unboxed doubles": the reason speaks of "every number", but the decision names only doubles. Are `ZZ32`, `ZZ64` and `RR32` covered? Unclear wording.
- "unboxed arithmetic chosen by static type": does it reach generic code instantiated at `RR64` (the template classes the class loader makes, skill "The compiled run time"), or only code whose static type is `RR64` at the source? Unclear wording.
- "How arrays store doubles, as `double[]`, is P-84's decision": reads as "P-84 decided they are stored as `double[]`" or as "P-84 decides how the `double[]` storage works". Unclear wording, minor.

## P-19

**Decided:** No one may describe the tree as a third-party port's migration grafted onto the team's history. The port (to Java 9) was copied onto the team's last commit by commit `8fe1daa8f`, and `main` descends from that commit by history. By content, though, most of the port's files have been removed or redone. Only one piece of its code still runs, the `FTypeArrayList` fix for the JDK 8 `TreeSet` crash (F-165). Reason: the tree is not built on the port, and the record must not suggest it is. Files that still say so wait for the lineage cleanup, a task parked in PLAN; `coordinator/lineage.md`, "Files that still repeat it", lists them.

**Applies:** To any description of the tree's lineage. Its limit is not stated (see below).

**Requires:** Do not write the forbidden description. Leave the files that still say it to the parked cleanup (as I read "wait for").

**Unfinished:** The lineage cleanup of the listed files (parked).

**Could not resolve:**
- "migration grafted onto": what "migration" names is unclear (the port's Java 9 changes?), and whether "grafted" is a git term or a figure of speech. The forbidden phrasing is clear enough to avoid, but the entry does not say what the correct description is. Unclear wording.
- Scope: does it cover only the record and reports, or any committed file (README, commit messages)? Unclear wording.
- "wait for the lineage cleanup": a worker who meets one of those files may read this as "do not touch it" or as "fixing it is welcome but not required". Unclear wording.
- `coordinator/lineage.md`: I take this to mean `explorations/coordinator/lineage.md`. Minor.

## P-25

**Decided:** `Specification/` remains the standard. The Types chapter of the team's unfinished 2012 restart (`Documentation/Specification/Prose/Language/types.tick`, F-166) is cited beside it wherever it covers a topic, as the designers' later word. On rules the revival revises, such as the exclusion rule, the chapter is the latest intent and `Specification/` is revised to follow it (P-26). Three of its passages bear on the revision (how they are used: P-97). The chapter names the exclusion rule "instantiation exclusion" and splits it in two: which instantiations of a generic exclude each other (`types.tick:355-360`), and, in its note, a rule on trait declarations (`:361-376`). The revised `Specification/` puts the first part in its types chapter and the second in its traits chapter. The chapter adds a `covariant` modifier for a trait's static parameters, which neither path builds and which is future work off the microGPT path (P-62). It also says `Bottom` cannot be written in a program.

**Applies:** When a topic is covered by the 2012 Types chapter, and especially on the rules being revised.

**Requires:** Cite `types.tick` beside `Specification/` where it covers the topic. Write the revised exclusion rule in two parts, split across the types and traits chapters. Do not build `covariant`.

**Unfinished:** The revision of `Specification/` on these points (implied, not stated); `covariant` (future work, off path).

**Could not resolve:**
- "Three of the chapter's passages": which three? I count exclusion (in two parts), `covariant` and `Bottom` as three, but the two-part exclusion could be counted as two, making four. Unclear wording.
- "a rule on trait declarations": its content is not given. The skill's "No type may extend two instantiations of one generic trait" could be either part. A pointer to read, but I cannot tell which part the skill's rule is. Unclear wording.
- `covariant`: is it written into the revised `Specification/` (as latest intent, marked unbuilt) or left out? "future work" does not say. Unclear wording.
- "`Bottom` cannot be written in a program": does the revised specification adopt this, and must existing library or test source that writes `Bottom` change? The consequence is not stated. Unclear wording.
- "the rules that the revival revises": where is this set defined (P-95's records?). On a topic outside that set where the chapter and `Specification/` disagree, which wins? "stays the standard" suggests `Specification/`, but "designers' later word" suggests the chapter. Unclear wording.
- "cites it beside": in what, reports, specification revisions, code? Unclear wording, minor.
- "neither path": I take this to mean walk and the compiled path. Clear from the skill.

## P-26

**Decided:** Where the type group's later positions conflict with the specification's early text, the later positions win and the specification is revised to follow them (each change recorded with its reason, P-95). The type group (the team members who built the type checker and the compiler) worked to make the language run, with performance as the aim and specialization required, and learned what was feasible; the early text was a wish. Their later word includes the exclusion rule, keeping specialization, the sibling number types of the compiler's prelude (2009–2010; the library is flat the same way, P-43), Karl Naden's 2012 "The Return Type Rule and Generics" (`Papers/Types/journal/justificationOfRTR.tex`), and the POPL 2019 paper (F-166). The implementers' later word also outweighs unfinished text. The revival does not second-guess them.

**Applies:** To conflicts between the type group's later work and the specification's early text, and between the implementers' later word and unfinished text.

**Requires:** In such a conflict, follow the later word and revise the specification to it; do not argue against the type group's choices.

**Unfinished:** The specification revisions themselves (implied, not stated).

**Could not resolve:**
- "Specialization": the entry defines it as a specific version of a generic function written beside the generic one, chosen by run-time dispatch (`tail(x: List[ZZ])` beside `tail[X](x: List[X])`), which is a source-level overload. The skill (`exploring.md`) describes it as "compiled code specialised to each instantiation of a generic", and `SKILL.md` describes template classes instantiated by the class loader, which the compiler produces. The two read as different mechanisms. Which one is "kept"? A language concept I cannot settle from the skill, plus unclear wording.
- "the specification's early text": `Specification/` is a 2011 draft, later than the 2009–2010 number change. A worker cannot tell which passages count as "early". Unclear wording.
- "The implementers' later word also outweighs unfinished text": are "implementers" the type group, or also the interpreter's authors? And "unfinished text" could include the unfinished 2012 restart, which would clash with P-25's treatment of its Types chapter as the latest intent. Unclear wording.
- "specialization kept": kept against what alternative? Unclear wording, minor.
