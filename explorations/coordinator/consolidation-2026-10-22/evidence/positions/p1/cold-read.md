# Cold read: positions p1 (P-7, P-8, P-9, P-10, P-11, P-17, P-19, P-25, P-26)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these parts of `references/` for terms: `records.md` ("The repository's history"), `interpreter.md` ("The model program"), `exploring.md` ("Weighing the sources"), `specification.md`, `compiler.md` (prelude, code generator), `build-and-caches.md` (one line on APL). Nothing else of the record was read, so every cited P-n or F-n other than these nine is unseen.

## P-7

- **Decided:** The project's aim is to complete the language the Sun Labs team designed, not to redesign it. Success is measured by one program, microGPT, running fast on the compiled path. What the designers meant is judged by `Specification/`, which is the February 2011 Working Draft as the revival revises it, read alongside the Types chapter of the team's unfinished 2012 restart. The specification stays current and records every change the revival makes. A pure-Java version of microGPT is the reference that compiled microGPT is compared with, and it is also the target.
- **Applies:** To all work, since this is the goal everything else is measured by. Its limit is "not redesigned": revisions are allowed, a new design is not.
- **Requires:** Judge a language question against `Specification/` (with the restart's Types chapter), not against a design of your own. Record each change to the specification the way P-95 says (unseen; `references/specification.md` points to Appendix I, `Specification/appendices/changes.tex`).
- **Unfinished:** The pure-Java microGPT (PLAN, "Phase 6. microGPT fast").
- **Could not resolve:**
  - "the baseline ... the result to aim at": unclear wording. A baseline is something you compare against, and a target is something you have to reach. The entry gives no measure of "fast": does compiled microGPT have to equal pure Java, or come within some factor of it?
  - "The language is not redesigned" next to "as the revival revises it": unclear wording. The entry does not say where a revision stops and a redesign starts. P-26 (later positions win) gives part of the answer.
  - "PLAN": the entry gives no path. The skill does not name this file, though it is presumably `explorations/coordinator/PLAN.md`.

## P-8

- **Decided:** When the designers left no answer, the curator decides by what helps a fast compiled microGPT, not by type-theoretic purity, and stays faithful to the spirit of Fortress. He leaves the language's unfinished corners as they are so that the work does not get stuck in theory. He has not read the specification, the type papers or the library, and he trusts that the designers knew more than he does.
- **Applies:** To questions that the designers' sources do not settle, which are the decisions that go to the curator.
- **Requires:** The entry says nothing directly about what a worker does. The implications I draw: argue a question to the curator in terms of the goal, not purity; do not expect him to know what the specification or papers say, so quote or explain it; do not propose finishing a corner just for completeness.
- **Unfinished:** None stated.
- **Could not resolve:**
  - "the designers' record": unclear wording, two readings. The skill defines "record" as the project's own memory under `explorations/`. Here it seems to mean the team's sources (specification, papers, code), but it could be read as the project's record.
  - "the spirit of Fortress": an undefined concept. The entry does not say what it rules in or out.
  - "accepts the language's unfinished corners as they are": unclear wording. It appears to conflict with P-7's "finish what the designers intended". Which corners are left alone, and which are finished? My guess is that a corner is left alone when finishing it would need new theory, but the entry does not say this.

## P-9

- **Decided:** The aim for the microGPT source is the most readable way to write the algorithm. C4 is the flat program `explorations/run-c4/src/MicroGptFlat.fss`, with data laid out in Aaron Hsu's flat APL style. C4 is improved by changing its vocabulary, meaning the operations its model lines call, and not the model lines themselves (P-87). C4 is also the form the APL program `explorations/apl/mg/MicroGptApl.fss` expands into: the APL version generates the same lines that C4 has written by hand. Hyperparameters are written as one tuple binding, `(nEmbd, ...) = (16, ...)`, because that is what the APL sub-language turns a strand assignment into. Separate declarations on one line joined by semicolons are not used.
- **Applies:** To writing and polishing the microGPT source in C4, and to how C4 relates to the APL program.
- **Requires:** Make readability changes in the vocabulary, around the model's text. Keep the hyperparameters as a tuple binding. Do not use the semicolon one-line form. Keep C4 in the form the APL expansion produces.
- **Unfinished:** None stated.
- **Could not resolve:**
  - "Aaron Hsu's flat style of APL": a style I lack from the skill (it is not in `references/`). From general knowledge it means flat arrays in place of nested structures, but the entry does not say what that requires of C4's data layout.
  - "The search": unclear wording. Whose search is it, and how does it rank against P-7's goal of speed if readability and speed conflict?
  - "the vocabulary": unclear wording. Is it a separate component, or the helper functions inside `MicroGptFlat.fss`?
  - "C4 is the target form ... that program expands into the lines that C4 writes by hand": two readings. It could mean the expansion matches C4 line for line today, or that this is the aim.
  - "The one-line form": unclear wording. I read it as the hyperparameters declared one by one on a single line, separated by `;`, but the entry does not show it. "has no use for it" only makes sense as "the expansion never produces it".

## P-10

- **Decided:** The APL side project is finished. Its unbuilt parts (tacit functions, characters, nested arrays) will not be built. What it produced is an APL sub-language: a DSL grammar in `explorations/apl/` that expands APL text into Fortress code over Fortress's native arrays, not an APL interpreter. Its microGPT program stays in the microGPT check under walk that runs after a batch (P-30).
- **Applies:** To the APL sub-language and its microGPT program.
- **Requires:** Do not build tacit functions, characters or nested arrays. Keep `MicroGptApl.fss` in the after-batch walk check. The check is run by `mg-run.sh`, according to `references/interpreter.md`, "The model program".
- **Unfinished:** None. The unbuilt parts are dropped on purpose.
- **Could not resolve:**
  - "closed": unclear wording. Is a defect in the sub-language that breaks the microGPT check still fixed, or is every change to `explorations/apl/` off the table?
  - "tacit functions, characters and nested arrays": APL concepts, not in the skill. I know them from general APL (point-free trains, character data, APL2 nested arrays), so they did not block me.
  - File name: `references/interpreter.md` says the check runs `MicroGptAplQuick.fss` and `MicroGptAplCheck.fss`, not `MicroGptApl.fss`. Presumably these wrap the program, but neither text says so.
  - "runs after a batch": the skill says the check runs "when your brief asks for it" and never in the gate. The two texts agree only if "after a batch" is something a brief asks for. A mild mismatch.

## P-11

- **Decided:** The 2D notation, Fortify's LaTeX rendering of Fortress source as mathematics (used for the specification and papers), is a gimmick and gets no work unless the curator asks. As programming syntax it would lock in one view of a computation, and APL expresses computations better. It is presentation only, off the project's path, and not a point in Fortress's favour. The verdict covers the typesetting only: Unicode operators such as `∑` and `×` remain part of the language's syntax.
- **Applies:** To `Fortify/`, `bin/fortify` and `bin/fortick`, and to the rendered notation. It does not apply to Unicode operator syntax.
- **Requires:** Do not work on Fortify or the 2D rendering without a request from the curator. Do not treat Unicode operators as part of this verdict.
- **Unfinished:** None.
- **Could not resolve:**
  - "no work on it": unclear wording. If building the specification needs Fortify (the entry says Fortify serves the specification), is repairing a broken Fortify that blocks a specification build "work on it"?

## P-17

- **Decided:** The compiled path must have unboxed doubles and arrays of unboxed doubles, or the project misses its point. A language meant for high performance cannot box its numbers. Today the code generator boxes every number (`RR64` becomes an `FRR64` object), and Java models of microGPT's three array kernels show boxing as the main cost (F-11). The array storage, `double[]`, is decided in P-84.
- **Applies:** To the compiled path's code generator and run time. It matches `references/compiler.md`: "It emits no primitive `double` arithmetic", and `double[]` "is not built yet".
- **Requires:** Build unboxed double arithmetic. Store arrays of doubles as P-84 says.
- **Unfinished:** Unboxed arithmetic, in PLAN phase 6, microGPT fast (phases listed in P-33).
- **Could not resolve:**
  - "unboxed doubles" against "cannot box its numbers": unclear scope. Does the requirement cover only `RR64`, or also `ZZ32`, `ZZ64` and the other number types? The reason given covers all numbers, but the decision names only doubles.
  - "microGPT's three array kernels": not named. I could not tell which operations they are.
  - "Still to build" names only unboxed arithmetic. Unboxed arrays, which the skill also lists as unbuilt, are not mentioned, so it is unclear whether they belong to P-84's plan or are missing from this entry.

## P-19

- **Decided:** No text may describe the tree as the third-party Java 9 port's migration grafted onto the team's history. That port was copied onto the team's last commit by `8fe1daa8f`, and `main` descends from it. However, most of the port's files have been removed or redone, and only one running piece of it remains (F-165). The reason is that the record must not suggest the tree is built on the port. Old files that still describe it that way stay as they are until the lineage cleanup, a task parked in PLAN; `explorations/coordinator/lineage.md`, "Files that still repeat it", lists them.
- **Applies:** To any text describing the tree's origin. Its limit: the existing files with that description are left for the parked cleanup.
- **Requires:** Do not describe the tree as built on the port. Together with `references/records.md`: give the port's lines no credit and name no author of it. Do not, I think, rewrite the listed files now.
- **Unfinished:** The lineage cleanup (parked).
- **Could not resolve:**
  - The headline is phrased as a description ("is not described as") rather than a rule ("do not describe"). It reads easily enough as a rule.
  - The entry gives no correct description. `main` really does descend from the port's commit, so a worker writing about the history does not know what wording to use instead.
  - "one running piece of it stays (F-165)": not named. A worker cannot tell which piece of the running tree comes from the port without opening F-165.
  - "wait for the lineage cleanup": two readings. Either a worker must not touch those files, or a worker need not fix them.

## P-25

- **Decided:** `Specification/` remains the standard. The Types chapter of the team's unfinished 2012 restart (`Documentation/Specification/Prose/Language/types.tick`) is cited beside it wherever that chapter covers a topic, as the designers' later word. On the rules the revival revises, the chapter is the designers' latest intent, and finishing that intent is the goal. Three passages of the restart matter here (their use is decided in P-97, which I have not seen):
  - It states the exclusion rule as "instantiation exclusion", in two parts: which instantiations of a generic exclude each other, and the rule on trait declarations.
  - It adds a `covariant` modifier for a trait's static parameters, which neither path implements.
  - It says `Bottom` cannot be written in a program.
- **Applies:** Wherever the restart's Types chapter covers a topic; most strongly on the rules being revised. It agrees with `references/specification.md`.
- **Requires:** Cite the restart's Types chapter next to `Specification/` when it covers the topic.
- **Unfinished:** Not stated. The entry says `covariant` is unimplemented, but not whether it is to be built.
- **Could not resolve:**
  - "the chapter on types says ..., and the chapter on traits states ...": two readings. The entry cites only the restart's Types chapter, yet places part of the rule in "the chapter on traits". It does not say whose chapter that is (the restart's or `Specification/`'s), or where it is.
  - The standard against the latest intent: unclear wording. If `Specification/` and the Types chapter disagree, the entry does not say which a worker follows. "Stays the standard" and "the designers' latest intent, which the goal is to finish" pull in opposite directions, and P-97 (unseen) may settle it.
  - `covariant`: the skill says "Generics are invariant: there is no `+T` or `-T`". The entry does not say whether the revival adopts the modifier, rejects it, or leaves it alone.
  - "the rules that the revival revises": not listed, so I cannot tell where the chapter counts as latest intent and where it is only cited.

## P-26

- **Decided:** When the type group's later positions conflict with the specification's early text, the later positions win, and the specification is revised to match them (each change recorded per P-95). The type group built the checker and compiler and got the language running, with performance as the goal and specialization as a must. The early text was a wish. Their later word includes:
  - the exclusion rule;
  - keeping specialization;
  - the number types of the compiler's prelude made siblings in 2009 and 2010 (P-43);
  - Karl Naden's 2012 write-up, `Papers/Types/journal/justificationOfRTR.tex`;
  - the POPL 2019 paper (F-166).

  The implementers' later word also outweighs unfinished text. The revival does not second-guess them.
- **Applies:** To conflicts between the specification's text and those later positions, and between unfinished text and the implementers' word. It matches `references/exploring.md`, "Weighing the sources".
- **Requires:** Follow the later positions in such a conflict. Revise the specification to match and record the change. Do not argue against the implementers' choices.
- **Unfinished:** Not stated.
- **Could not resolve:**
  - "specialization ... a special version of a generic function for one instantiation, which dispatch chooses at run time": two readings. In the skill, a generic is compiled once as a template and the class loader makes each instantiation's class (`SKILL.md`, "The compiled run time"). `exploring.md` says "compiled code specialised to each instantiation". "Which dispatch chooses" instead suggests a separately declared overload for one instantiation that dispatch selects. I could not tell which mechanism is meant.
  - "the specification's early text": unclear wording. `Specification/` is the February 2011 draft, which is later than the 2009–2010 decisions. So "early" must mean passages written before those decisions, and a worker has no way to tell which passages those are.
  - "unfinished text": unclear wording. It could mean the restart, the specification's `\note{}` boxes for unbuilt features, or draft passages.
  - Against P-25: if the restart's Types chapter (P-25's "latest intent") conflicts with a type group position, for example `covariant` against invariant generics as implemented, neither entry says which wins.
  - "the number types of the compiler's prelude": unclear scope. It names only the compiler's prelude, while the skill says all number types are siblings. Does it bind the interpreter's library too? P-43 (unseen) may say.
  - "RTR": only part of the file name. `exploring.md` expands it as the Return Type Rule; the entry does not.
