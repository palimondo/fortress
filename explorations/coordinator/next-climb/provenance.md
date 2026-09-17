<!-- Where the eight rungs of the 2026-09-17 compile-ladder climb got their design intent, and what the next climb's rung brief should require on that point.  Written 2026-09-17 by a survey worker at Pavol's request, after his question about method: were the workers looking up the original team's intent, or inventing point solutions to make a test pass.  Evidence: the eight rung reports, the eight rung commits, and the 36 agent transcripts of workflow wf_73833dfb-d25.  No source file was edited and nothing was committed. -->

# Where the rungs got their design intent

## Method, and what it can and cannot see

Three bodies of evidence: `explorations/compile-ladder/rung<N>/REPORT.md` for the eight rungs, the eight rung commits (`1bd8d3ad1`, `cee79d3f1`, `4d419c9e8`, `b52a32ac2`, `9373985b4`, `54861b62a`, `2027f519b`, `40216550c`) with their messages and diffs, and the 36 agent transcripts under `/root/.claude/projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/subagents/workflows/wf_73833dfb-d25/`.

The transcript counts below come from a scan of every `tool_use` input in the 36 `agent-*.jsonl` files: 1,638 tool calls in all, 1,618 `Bash` and 20 `Read` and no `Grep`, so what a worker looked at is visible as a shell command and nothing else is measurable this way.

The limit of the method: a file an agent had in its context from its brief, or reasoned about without opening, does not appear; and a `grep -r` over a directory counts as one call whatever it reads. Where a count would be misleading I say what the command actually was.

The map part that is the yardstick for this survey, `map/design-intent-sources.md`, was opened by **zero** of the 36 agents, and so were `map/spec-to-implementation.md`, `map/test-coverage.md` and `map/modules-and-phases.md`; the two that were opened are `map/dormant-code.md`, by seven of the eight rung planners (all but rung 4), and `map/README.md`, by four agents (`rung1:plan`, `rung2:plan`, `rung8:plan`, `final:rerun`). `map/spec-to-implementation.md` is named in the rung planner's brief by name and was still never opened.

## 1. How each rung's problem was defined

| rung | what made this the rung | citation |
|---|---|---|
| 1 | The ladder's top first-error name, `Equality`, 23 files; and a rung `PLAN.md` had previously refused, re-attempted under a widened edit boundary | `rung1/REPORT.md` heading and its "The checker defect, diagnosed against the hypothesis on record"; `compile-ladder/summary.txt` baseline ranking |
| 2 | The worker re-derived the ranking from rung 1's own raw output, found the new head (`ImmutableArray`, about 26 files) behind the array-representation fork `PLAN.md` reserves, and took the largest clean name, 21 files | `rung2/REPORT.md` §"Why this name and not the baseline's head" |
| 3 | Worker's choice, against the ranking: every missing name above 7 files was behind a reserved fork, so the rung is not a missing name at all but the widest codegen refusal, 8 files counted from `ladder.tsv` | `rung3/REPORT.md` §"Why this name, with the ranking re-derived" |
| 4 | The block the previous rung costed and explicitly left behind: `assert`, 24 files, the single largest first-error class at typecheck | `rung4/REPORT.md` §"Why this name"; `rung3/REPORT.md` §"Why this name" costs it and passes on it |
| 5 | Re-derived ranking with the four spent names removed; everything above `//` checked one by one and found behind a fork or a substantial feature; `//` is 4 files | `rung5/REPORT.md` §"Why this name" |
| 6 | A cluster that appears in no ranking, because no name is missing: 7 files that compile, link and die in the same throwing stub, found by the worker in the raw run outputs and argued as "the files closest to passing anywhere on the ladder" | `rung6/REPORT.md` §"Why this name" |
| 7 | Rung 6's own named leftover: the three files it could not clear, and the arithmetic family it said it could not write | `rung7/REPORT.md` §"Why this name"; `rung6/REPORT.md` §"What is deliberately not in the rung" |
| 8 | Gap-ledger row 74 (G4, no `SUM`), plus a full re-run of the ladder at head to re-derive the ranking rather than trust a seven-rung-stale table | `rung8/REPORT.md` §"Why this name" and §"The defect"; `rung8/probes/ladder-at-head.tsv` |

Two patterns in that column. Six of the eight problems were defined by a measurement the worker made or re-made itself, not by a list handed to it; only rung 8 was defined by an existing ledger row, and only rungs 1 and 4 by something the previous stage had written down. And three rungs in a row (3, 6, 7) left the missing-name ranking entirely, because everything at the head of it is behind the two forks reserved for Pavol — the ranking stopped being a work queue after rung 2.

## 2. Where each rung's solution came from

Classification as Pavol set it: (a) the specification in `Specification/`; (b) the interpreter's own library; (c) the team's unfinished compiler-side drafts; (d) an existing shape in the same file, by analogy; (e) invention with no cited precedent.

| rung | class | the source, cited |
|---|---|---|
| 1 | **c** + **d**, and **e** for the checker edit | (c) the team's own commented-out entry `// compilerAlgebra(),` in the default library list, uncommented (`WellKnownNames.java:124`, diff in `1bd8d3ad1`); (d) the new branch in `TopLevelEnv.java:967-976` copies the `FortressLibrary` branch beside it; (e) the `SFunctionalRef` case of `TypeWellFormedChecker.scala:134-141` narrowed to `walk(args)`, three walks deleted, argued from a shadow trace and the principle "each declaration is checked where it is declared", with no precedent cited |
| 2 | **b** | `Library/FortressLibrary.fsi:1058` and `.fss:1584`, `trait HasRank extends Equality[\HasRank\] excludes { Number, AnyMaybe }`, copied minus `AnyMaybe` and minus `opr =(self, other:HasRank): Boolean = false` |
| 3 | **d** | the immutable path in the same method (`CodeGen.generateVarDeclInnerClass`) and the local mutable path in the same file (`CodeGen.forLocalVarDecl:3910-3930`, `VarCodeGen.LocalMutableVar`); the new `MutableStaticBinding` is `StaticBinding` with `PUTSTATIC` where it threw; the rest is JVM rules on final fields |
| 4 | **b** and **a**, deviating from both | (b) `Library/FortressLibrary.fsi:234,236` and `.fss:296,306`; (a) `Specification/library/apis/FortressLibrary.tex:310-332`, read at the line, which spells the comparing form `assert(x:Any, y:Any, failMsg:Any...)` and states its semantics in prose; the rung wrote eight monomorphic overloads instead, with the deviation measured (`rung4/probes/VarArgCoerce.fss`, `.out`) and argued in the committed source comment at `Library/CompilerLibrary.fss:90-95` |
| 5 | **b** + **a** | (b) `Library/FortressLibrary.fsi:2358-2362`, bodies `.fss:4057-4060`; (a) `Specification/library/apis/FortressLibrary.tex:3302-3310`, read at the line, for the sentence "opr // concatenates with a single newline separator"; one declaration written against the interpreter's four |
| 6 | **b** for where the line falls, **d**/**e** for the bodies | (b) `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:472-481` live comparisons against `:483-525` commented out under "Do not enable these until coercion is implemented"; the bodies are not the interpreter's (`cmp`, a `builtinPrimitive`) but `asZZ64` comparisons, argued because the compiler world has no `cmp`; `MIN`/`MAX` over this trait's own `<=`, argued because the interpreter inherits them from `ZZ32` and the compiler world cannot |
| 7 | **d** + **a** | (d) the foreign-Java route `ZZ32Vector` and `Character` already use (`NamingCzar.java:328-350`, and `charMakeCharacterWithSpecialCompilerHackForCharacterResultType` named as the precedent), the helper's spelling from `simpleArbitraryPrecisionArith.java`; (a) `Specification/library/apis/CompilerBuiltin.tex:374-390`, read at the line, for juxtaposition being multiplication; the interpreter's counterpart is dormant, so (b) was unavailable by construction |
| 8 | **d** | the `opr BIG MAX` pair two lines below, `Library/CompilerLibrary.fss:480-481` and `.fsi:181-182`, copied exactly onto `ZZ32Addition`, which was already declared at `.fss:463` and used by nothing |

## 3. Pavol's five specifics, checked rather than trusted

**Rung 2 took `HasRank` from `Library/FortressLibrary.fsi:1058` minus two things** — confirmed. The interpreter's line is `trait HasRank extends Equality[\HasRank\] excludes { Number, AnyMaybe }`; the compiler world's is the same minus `AnyMaybe` (`Library/CompilerLibrary.fsi:260`, `.fss:555`), and the interpreter's `opr =(self, other:HasRank): Boolean = false` (`.fss:1588`) is not redeclared. Both subtractions are argued twice: in `rung2/REPORT.md` §"Two deliberate departures from the interpreter's text", and in a four-line comment in both committed library files (`CompilerLibrary.fsi:255-258`, `.fss:549-553`).

**Rung 5 wrote one declaration rather than the interpreter's four** — confirmed, with a nuance worth keeping. The interpreter's four at `FortressLibrary.fsi:2359-2362` are the prefix `//(self)`, the infix `(self, a:String)`, the infix `(self, a:Any)` and the reversed `(a:Any, self)`; the rung collapsed the two infix forms into one `(self, b:Object)`, on the argument that `CompilerBuiltin`'s `String` already collapses that pair for `||`, `|||` and `juxtaposition`, and omitted the prefix and reversed forms as unreached by any blocked program. So it is "two collapsed with an argument, two omitted with a reason", not four reduced to one.

**Rung 6 said it was drawing the interpreter's own line at `FortressBuiltin.fss:472-481`** — confirmed to the line. `:472` is `opr |self|`, `:473-481` are `opr =`, the four comparisons, `CMP` and `cmp`, and `:483` opens the comment block whose first words are "Do not enable these until coercion is implemented".

**Rung 8 copied the shape of the `opr BIG MAX` pair already in the file** — confirmed; the new pair sits immediately above it at `CompilerLibrary.fss:477-478` and `.fsi:178-179` and differs only in the reduction object.

**The rung 6 repair cited `Specification/basic-lib/basic-integers.tex:114-117` on overflow** — **not confirmed, and the attribution is wrong.** The string `basic-integers` appears in no transcript of this workflow. What the rung 6 repair opened is `Specification/basic/expressions/literals.tex` and `basic/lexical-structure.tex`, and what it cited is `basic/expressions/literals.tex:83-85` in gap-ledger row 317. The `basic-lib/basic-integers.tex:114-117` citation is real but belongs to a later, non-climb piece of work: `explorations/performance-roadmap.md:92`, committed as `679d62af3`, whose message says it was "found while reading how the compiler world spells `+`, after the rung 6 skeptic's finding", and copied from there into `FACTS.md:28` by `6dc8f3e6e`. The rung-6 line of work produced the finding; the spec citation on overflow was made by someone else afterwards.

## 4. How often the specification was consulted, against the interpreter's library

Of the 1,638 tool calls, **32 touched anything under `Specification/`**, which is 2.0 per cent, and they break down three ways.

Eighteen opened `Specification/library/apis/*.tex`. That file set is the generated typeset listing of the library source — it is the library in LaTeX, not an independent authority — and it is what rungs 4, 5, 6 and 7 mean when their reports say "the spec agrees" (`rung5/REPORT.md:55`, `rung7/REPORT.md:50`, the only two spec citations in the eight reports).

Seven opened the content of a prose chapter, and all seven are one line of work: `rung6:repair` (six calls on `basic/expressions/literals.tex` and `basic/lexical-structure.tex`) and `rung6:verify2` (one, on `literals.tex:78-90`). That work was a repair after review, about a defect the rung recorded and did not fix.

Six were repo-wide greps under `Specification/` that established an absence or looked for a name (`rung2:verify` grepping `HasRank`, `rung4:implement` grepping `assert`/`deny` over `Specification/*.tex` and `*/*.tex`, `rung5:plan` grepping `trait Char`, `rung7:verify` grepping `IntLiteral` twice), plus one `ls Specification/basic/`.

Three further mentions of `Specification` are text inside commit-message heredocs, not file access, and are excluded from all the counts above.

Against that, **77 tool calls touched the interpreter's own library** (`FortressLibrary.fss`/`.fsi`, `FortressBuiltin.fss`/`.fsi`, `Library/List.fsi`, `GeneratorLibrary`, `CovariantCollection`, `String.fss`), two of them commit-message text.

By rung: rungs 2, 4, 5, 6 and 7 opened a `Specification/` file somewhere among their four or five agents; **rungs 1, 3 and 8 opened none at all**.

Zero tool calls in 36 agents touched `Papers/`, `research/`, `Specification/appendices/FAQ.tex`, `Specification/appendices/future.tex` or any `\note{}` passage — that is, none of the five places `map/design-intent-sources.md` says the rationale actually lives.

The honest summary: the interpreter's library was the source of truth about ten times as often as the specification's prose, the specification entered the climb mainly as a generated listing of that same library, and its prose entered once, in a repair, after review, about something the rung did not change.

There is one countervailing fact, and it matters for the proposal below. The gap ledger has a **spec citation column** (`fortress-gap-ledger.md:57`), and the rows the climb wrote carry it: row 312 and 313 (rung 3), 314 and 315 (rung 4), 316 (rung 5), 317 (rung 6), 318 (rung 7) and the update to 74 (rung 8) all name a spec location; only row 311 (rung 1) has `—`. So a citation was demanded at commit time in seven of eight rungs. Two of those citations were written without the file being opened, and both are wrong in a way that matters; see §6.

## 5. Where a worker deviated, did it argue the deviation

Every deviation I found was argued in the rung's report. Five are substantive.

Rung 2 dropped `AnyMaybe` from the `excludes` clause and did not redeclare `opr =`; argued in the report and in a comment in both committed library files.

Rung 4 replaced the spec's and the interpreter's single generic vararg `assert(x:Any, y:Any, failMsg:Any...)` with eight monomorphic overloads; argued from two measurements (`===` on `Any` is Java reference identity through `jSEQUIV`; a vararg parameter does not typecheck against a call needing a coercion, probed in `rung4/probes/VarArgCoerce.fss`), and the argument is in the committed source at `Library/CompilerLibrary.fss:90-95`. This is the clearest case of a rung deviating from the **specification's own spelling**, with the spec line open in front of it, and saying why.

Rung 5 wrote the separator as `makeCharacter(10).asString` where the interpreter's `//` uses `newline`, which is `lineSeparator`, a system property (`Library/String.fss:557`, used at `FortressLibrary.fss:4057-4060`). The report argues it deliberately. The consequence is that on any platform whose line separator is not U+000A the two worlds now disagree about what `//` produces, and nothing in the tree says so — the argument is in `explorations/`, not beside the code.

Rung 6 wrote the comparisons over `asZZ64` where the interpreter uses `cmp`; argued, because `cmp` in the interpreter is a `builtinPrimitive` and the compiled path has no counterpart (ledger row 309). One half of that argument was wrong when first written — the report claimed `asZZ64` was the widest available getter, and `asZZ` (`CompilerBuiltin.fsi:374`) is wider — and the report was corrected after review to say so and to leave the choice open. That correction is the system working, and it happened in review, not in the rung.

Rung 1 narrowed the checker; see the next section.

No deviation I found was made silently. Four of the six rungs that deviated left no trace of the argument in the tree itself: rungs 2 and 4 put a comment beside the edit, rungs 5, 6, 7 and 8 did not, so a later reader of `CompilerBuiltin.fss` sees `asZZ64` bodies interleaved with throwing stubs and no note about where the line falls or why.

## 6. Invention, and two mis-citations

**One case is an invention the team would not recognise, and it is rung 1's checker edit.** It deletes three of the four walks in the `SFunctionalRef` case of `TypeWellFormedChecker.scala` — well-formedness checking the team wrote — on a principle the worker stated itself. Two things make it worth naming rather than filing as a small edit. First, the neighbouring `SMethodInvocation` case still walks its own `getOverloadingType` and `SOverloading` still walks its type (`TypeWellFormedChecker.scala:142-149`, verified in the tree today), so the checker now treats a functional reference and a method invocation differently, a state nobody designed and no test covers; the rung's own report flags it and leaves it. Second, the rationale for exactly this — what makes an overloaded reference well formed, and where a generic declaration's static parameters are checked — is one of the best-documented design areas in the repository, with `Papers/Types`, `Papers/Dispatch`, `Specification/basic/overloading.tex` and the proof in `Specification/appendices/overloading-function.tex` listed against it in `map/design-intent-sources.md:100`, and none of those was opened by any of the 36 agents. The edit may well be right. It was not checked against the one body of argument that exists.

Rung 5's hardcoded U+000A is the weaker second candidate: argued, semantically divergent from the team's own `//`, and invisible in the tree.

**Two ledger citations were written without opening the file, and both are wrong.**

Row 312 (rung 3) cites `appendices/grammars/concrete-syntax.tex:1125-1128` for "both spellings" of a mutable variable declaration. Line 1125 is the **`LocalVarDecl`** production; the top-level `VarDecl` production is at `concrete-syntax.tex:346`. The local form is exactly the one that already worked and whose absence at top level was the whole rung, so the citation points at the wrong side of the distinction the rung was about. Its companion, "`basic/declarations.tex` (top-level declarations and their initialization order)" in row 313, is loose in the same way: the four occurrences of "initializ" in that 635-line file (`:26`, `:285`, `:288`, `:574`) are about local variables. Rung 3's four agents made zero `Specification/` accesses.

Row 317's citation was first written as `basic/literals.tex`, a path that does not exist in the tree, and was corrected to `basic/expressions/literals.tex:83-85` in the same session only after the repair agent grepped for it (`rung6:repair`, two successive `python3` rewrites of the row with a `grep -n "value of the numeral"` between them). Rung 4 did the same thing in miniature: it wrote row 315 citing `basic/operators.tex` and then `sed -i`'d it to `basic/conversions-coercions.tex`.

Three mis-citations written, two corrected within the session, one still in the ledger. All three would have been caught by the same one-line rule: open every line you cite.

## 7. Why the workers behaved this way, which is the actionable part

The rung planner's brief, generated by the workflow script, is the whole explanation, and it is quoted here from `rung3:plan`'s first message.

It hands the worker a ranking of missing names in which every entry's `where` field is **the interpreter's declaration site**: `{"name":"HasRank","files":21,"where":"Library/FortressLibrary.fsi:1058 (impl Library/FortressLibrary.fss:1584)"}`. The problem was therefore defined, by the script, as "a name the compiler prelude lacks and the interpreter has, at this line".

It then says, in one sentence: "Read the interpreter's declaration of the name (grep `Library/` and `LibraryBuiltin/`), the team's drafts (`explorations/coordinator/map/dormant-code.md` §1), the map's feature table (`explorations/coordinator/map/spec-to-implementation.md`) for where the mechanism lives, and the ledger rows for it."

The specification appears in that brief exactly once, as a stop condition — "changing the language's semantics against `Specification/`" is listed among the forks reserved for Pavol — and never as something to read.

The workers did what the brief said, and the measurements match it item for item: the interpreter's library, named first, was opened 77 times; `dormant-code.md` §1, named second, was opened by seven of eight planners; `spec-to-implementation.md`, named third but as a pointer rather than an instruction, was opened zero times; the specification, named only as a prohibition, was opened 32 times and mostly in its generated form.

So the answer to Pavol's question is not that the workers were lazy or inventive. They were obedient, and the brief encoded the interpreter's library as the source of truth. The lever for the next climb is the brief, not the worker.

## 8. What the next climb's rung brief should require

One step, four lines, written before the edit and checked by the skeptic. It fits the batched design as it stands (`batched-climb-plan.md` §3, where the rung worker writes `record.md` and `REPORT.md` and the skeptic reads that worktree).

**The provenance block.** In `compile-ladder/<name>/REPORT.md`, immediately under the title, four lines, each ending in a `file:line` or the literal word `none`:

`problem:` the measurement that made this a rung — a line count from `ladder.tsv`, a ledger row number, or the section of the previous rung's report that left it behind.

`spec:` the governing location in `Specification/`, found from the feature's row in `map/spec-to-implementation.md`, which gives the chapter, the checker class and the prelude location per feature. A citation under `Specification/library/apis/` is labelled `(api listing)` and does not on its own satisfy this line, because that file set is the library source typeset, not an independent statement; when it is the only hit, the prose chapter is named too, or `none`. When the specification says nothing, `spec: none` plus the grep that established it and its hit count — an established absence is evidence and costs one command.

`precedent:` the interpreter's declaration at `file:line`, or the team's dormant draft at `file:line`, or the in-file shape copied by analogy, or `none` with a sentence on why none exists (rung 7's case).

`deviation:` one line per way the edit differs from the precedent and from the spec's spelling, each saying what and why; `none` if identical. Where a deviation is semantic rather than a matter of spelling, its sentence is also copied into the source file as a comment beside the edit, the way rungs 2 and 4 did and rungs 5, 6, 7 and 8 did not.

**The skeptic's check, which is what makes it a step rather than a sentiment.** The skeptic opens every `file:line` the block cites — four `sed -n` calls — and refuses the rung if a line is missing, if a cited file does not exist, or if the cited line does not contain what the block says it contains. The same four lines are what goes into the gap ledger's existing spec-citation column, so the ledger stops carrying citations nobody opened.

**One addition on the planner's side.** The batch planner already writes one brief per rung (`batched-climb-plan.md` §3). It should paste into each brief the `map/spec-to-implementation.md` row for the feature the rung touches — that file is a table, one row per feature, so this is a lookup and not a reading assignment — and the `map/design-intent-sources.md` §6 row for the design area when the rung changes a behaviour rather than adding a declaration. A brief that hands a worker the governing chapter costs the worker nothing; a brief that names a file the worker must go and find is what produced zero opens across 36 agents.

Cost of the whole step, measured against what the climb did: four lines the report already implies, and four `sed -n` calls per rung in the skeptic. It would have caught all three mis-citations, and it would have made rung 1 state, before landing, that no precedent was cited for deleting a checker walk — which is the decision Pavol would have wanted to see.

## 9. Is the interpreter's library the right default

Yes for shape and spelling, no for semantics, and the evidence says why in three parts.

For shape it is the right default and should stay the default: it is the team's own working code for the same concept, it compiles, and it is pinned by the 382 interpreter tests, so copying it keeps the two worlds one language. Rungs 2, 5 and 6 are the pattern working — each opened the interpreter's declaration, copied it, and said what it changed.

For semantics it cannot stand alone, for reasons the climb itself produced. The interpreter's library is not internally complete: its `IntLiteral` arithmetic is commented out under a note explaining that enabling it would break coercion, which is why rung 7 had no interpreter precedent to copy and had to invent one. Where the two do differ, the specification sometimes sides against the interpreter's convenience: `assert` is specified as one vararg generic form and the compiler world now has eight monomorphic ones, which rung 4 argued well and which is still a divergence from the specified api that only the ledger records. And the compiler world's own constraints — no `cmp`, no `builtinPrimitive`, no `Maybe`, reference-identity `===` — force a deviation in most rungs anyway, so the thing worth demanding is not fidelity but a named, checked deviation.

So: keep the interpreter's library as the default precedent, add the spec as one cheap, fixed, checkable lookup per rung rather than as a prohibition, and make the deviation list mandatory. That is the whole of the proposal in §8.

## Not verified

Whether the rung 1 checker narrowing is actually correct as a matter of type theory. What is established here is that the three bodies of argument bearing on it (`Papers/Types`, `Papers/Dispatch`, `Specification/basic/overloading.tex` with `appendices/overloading-function.tex`) were not opened by any agent of the climb, and that the checker is now asymmetric between `SFunctionalRef` and `SMethodInvocation`.

Whether any agent read a file it did not open with a tool call — a brief's quoted excerpt, or context carried from an earlier turn. The scan sees tool inputs only.

The content of the rung 6 skeptic's overflow finding as it was originally made: it is reported through `679d62af3` and `FACTS.md:28`, and `rung6:verify` and `verify2` were read only for their tool calls, not their prose.

Whether `Specification/basic/declarations.tex` or another chapter does state an initialization order for top-level declarations somewhere I did not grep; what is checked is that the four "initializ" occurrences in that file concern local variables.

## Forks this survey does not take

Whether the ledger's spec-citation column should be retrofitted for the rows the climb wrote with unopened citations (312, 313) — correcting row 312's `concrete-syntax.tex:1125-1128` to `:346` is a one-line edit, but the ledger's rule is that rows are never re-kinded and this is Pavol's file.

Whether the asymmetry rung 1 left in `TypeWellFormedChecker.scala` — `SFunctionalRef` narrowed, `SMethodInvocation` and `SOverloading` unchanged — should be closed in either direction, which is a checker decision and not a rung.

Whether the compiler world's `//` should keep its hardcoded U+000A or acquire a `lineSeparator` of its own, which is a question about `CompilerSystem` and about whether the two worlds are allowed to differ on a platform-dependent value.
