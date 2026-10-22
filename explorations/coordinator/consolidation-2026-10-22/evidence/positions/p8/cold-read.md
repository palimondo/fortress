# Cold read of positions/p8/clean.txt

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed parts of its `references/` (looked up: `specification.md`, `exploring.md`, `tests-writing.md`, `tests-running.md`, `gate.md`, `compiler.md`, `library.md`, `build-and-caches.md`, `interpreter.md`). Nine entries, all positions.

## P-95 Every change to the specification is recorded with its reason

- **Decided:** When the revival changes how the language works, it also edits `Specification/` so the text matches the implementation. Each such edit keeps the original wording and the reasons for the change, so that the project could still go back to "route C" later. Route C is a nested number tower under the "forest rule" of the team's 2012 patent applications, which P-43 rejected. Each edit uses the revision form (P-96). `Specification-1.0-frozen/` is never edited.
- **Applies:** To every change of the language, and from the title to every edit of `Specification/`. It does not apply to the frozen copy, which stays untouched.
- **Requires:** A worker who changes the language must update `Specification/` in the same work, using all the parts of the revision form, and keep the original text and the reasoning. They must not edit `Specification-1.0-frozen/`.
- **Unfinished:** Nothing is marked to build. It is a standing rule, and the skill says the `\revision` macro, Appendix I's revival section and the front-matter paragraph already exist.
- **Could not resolve:**
  - "forest rule": a language concept I lack. The skill only points to `explorations/reviews/mie-probes/patents-forest-rule.md` (`exploring.md`), which I may not read. So I cannot tell what route C would allow that the current rule forbids.
  - "Route C": the letter suggests routes A and B exist (the skill names a `rung-spec-route-a` folder), but neither is defined here. The entry gives only C's content, and that is enough to act on.
  - "Every change takes the revision form": unclear wording. I cannot tell whether a typo or wording fix that changes no meaning also needs an Appendix I entry and a callout. The title ("every change to the specification") says yes. The body ("when the revival changes the language") limits it to changes of meaning.
  - F-46 and P-43 are only cited, so what a return to route C would need is not in this entry.

## P-96 A change of the specification is shown in layers (the revision form)

- **Decided:** The revival's edits to the specification follow the layered style the team used for its own changes in the 1.0 release (2008) and the 2009 working draft. This style is called the revision form, or S1 form. It has four parts: (1) at every changed passage, a callout that prints in every build (a `\note` is not allowed, since release builds hide it); (2) an entry in Appendix I's revival section giving the reason, the original text, what returning to route C would mean for this change, and the curator decision it carries out; (3) one paragraph on the revision in the front matter; (4) a document in the repository with the full reasoning. Citations name the frozen copy "the Working Draft of February 2011".
- **Applies:** To every specification change covered by P-95. The citation name applies wherever the frozen copy is cited.
- **Requires:** Write all four parts, follow `references/specification.md` for their form (`\revision{label}{...}`, `\subsection` plus `\seclabel` in `Specification/appendices/changes.tex`, `Specification/fortress/preamble.tex`, `decision-record.md` in the work folder), never use `\note` as the marker, and cite the frozen copy by the 2011 name.
- **Unfinished:** Nothing stated.
- **Could not resolve:**
  - "what a return to route C would mean for it": the entry ties the reversal note to route C, but `specification.md` asks for "what a reversal to the alternative not taken would need". For a change unrelated to numbers (P-97's examples, say), I cannot tell whether the note must still talk about route C or about that change's own alternative. Unclear wording, or a disagreement with the skill.
  - "S1 form": the name is never explained. It does no harm, but I cannot say what "S1" refers to.
  - The folder name `Specification-1.0-frozen/` against the citation "Working Draft of February 2011" reads as a contradiction. The skill settles it: only `fortress.1.0.pdf` in that folder is the 1.0 release. The entry itself only points to F-163.
  - The entry says Appendix I's entry has four contents. `specification.md` asks for more: the affected sections, the change and its effect, including each departure with its ledger row. The entry reads as a summary, and the skill is the full list. That is not a real conflict, but the entry alone would lead a worker to leave out the "effect" and departures.

## P-97 Examples that break the exclusion rule take the library's shapes; originals stay, marked "Not allowed"

- **Decided:** The Working Draft gave as legal some examples that break instantiation exclusion (P-25). Each one is rewritten to the shape the library uses for the same purpose, and the original stays next to it under the specification's own "Not allowed" mark. The rule is stated in two parts, following Luchangco's 2012 Types chapter: which instantiations exclude each other, and that a declaration may not extend two instantiations that exclude each other. The covariance example (a trait extending other instantiations of itself) gets a callout explaining that the type group's later design declares variance with a `covariant` modifier, which neither walk nor the compiled path implements (ledger row 404). The calculi of Appendix A keep their rules unchanged, under a callout saying they predate the rule.
- **Applies:** To the specification's examples that break the exclusion rule, to the specification's statement of the rule, and to the Appendix A calculi.
- **Requires:** For each such example, write the library-style version, keep the original marked "Not allowed", and use the revision form (P-95/P-96). Do not change the Appendix A calculi's rules; add a callout instead. Study how the library writes the same thing before choosing the shape (SKILL.md rule on library design).
- **Unfinished:** Unclear. Unlike P-98, P-124 and P-125, the entry is not marked "Built", so I cannot tell whether the examples have already been rewritten.
- **Could not resolve:**
  - "The rule is stated once": two readings. Either the revised `Specification/` must state the rule in exactly one place, in the two-part form; or Luchangco's chapter is the one place that states it, and the specification should cite it. Unclear wording.
  - "Luchangco's 2012 Types chapter": not named in the skill. I guess it is `Documentation/Specification/Prose/Language/types.tick` (the team's later restart, `specification.md`), but the entry does not say so.
  - "which instantiations exclude each other": a language concept I lack. The skill's short form ("No type may extend two instantiations of one generic trait") implies that every pair of distinct instantiations excludes each other. This entry's two-part form implies only some pairs do. Neither tells me which.
  - The covariance example: it is unclear whether it is also rewritten and marked "Not allowed" like the others, or kept as it stands with only the callout.
  - "the type group's later design": unclear wording. Who the type group is, and which document holds the `covariant` design, is not stated.
  - Overlap with P-124: if extracted examples feed `ant testSpecData`, I cannot tell how an original marked "Not allowed" is handled there: left out, or expected to be refused.

## P-98 `TotalComparison` extends `StandardMinMax[\TotalComparison\]`

- **Decided:** In `Library/FortressLibrary.fsi` and `.fss`, `TotalComparison` gets the parent `StandardMinMax[\TotalComparison\]`, so the library's `BIG MIN` and `BIG MAX` work on total comparisons. It keeps the five members it already declares by hand (`MIN`, `MAX`, `MINMAX`, `<=`, `>=`). The reason is that this is how the library's other ordered types do it. The curator accepted the coordinator's recommendation. The decision stands and blocks nothing, but the curator is still owed a fuller explanation, listed in PLAN under "Pavol's answers, in the order they are needed".
- **Applies:** To the library's `TotalComparison` declaration, in both api and component.
- **Requires:** Keep the parent and the five hand-written members, and do not undo it. A worker has nothing else to do; the owed explanation is the coordinator's job.
- **Unfinished:** Nothing to build: it is marked Built (F-77). Only the explanation to the curator is still owed.
- **Could not resolve:**
  - "so that it has `MIN` and `MAX`": two readings. Either the parent supplies these operators (but the entry says the type already declares `MIN` and `MAX` itself), or the parent makes the type count as a `StandardMinMax`, which is what `BIG MIN` and `BIG MAX` need. The second reading fits the rest of the entry. The title reads like the first.
  - `TotalComparison`, `StandardMinMax`, `MINMAX`: library concepts I lack. They are not in `library.md`, so I cannot say what a total comparison is or what `MINMAX` returns.
  - "the coordinator", "Pavol", "PLAN": not defined in the skill. From CLAUDE.md I take the coordinator to be the coordinating session, and from "he" I take Pavol to be the curator. PLAN's path is not given.

## P-102 Test first, the test kept

- **Decided:** Every edit of source code in the original tree starts with a test that fails. The worker adds it to the test suite, watches it fail, makes the fix, and watches it pass. The test stays in the suite for good. Edits to the specification or documentation need no test. The full suite has to pass when the work lands, not after every edit. Test and fix may share one commit. The reason: this replaces one-off validation scripts, which no later build runs.
- **Applies:** To source-code edits in the original tree (everything outside `explorations/`, `research/`, `CLAUDE.md`, `.claude/`). It does not apply to edits of the specification or documentation.
- **Requires:** Write the test first, add it to the suite, see it fail through the harness, then fix it and see it pass. Keep the test. Do not use a throwaway script as the check. Make sure the full suite passes before landing. `references/tests-writing.md` covers how to write the test.
- **Unfinished:** Nothing; it is a standing rule.
- **Could not resolve:**
  - "source code": I cannot tell whether build files (`build.xml`), shell scripts in the tree, or `Fortress.ast` count. The `.fss`/`.fsi` library files, Java and Scala clearly do.
  - "The full suite must pass": unclear which one. "Suite" is singular, but there are three gate steps: `testFast`, `testSystem` and `testSpecData`. The gate needs all three; the entry does not say whether that is what it means.
  - Limits: the entry does not cover an edit that no test can observe (a pure refactor, or a speed change). `tests-writing.md` covers the "ledger row only" case for deferred defects, not for fixes.

## P-103 The suite's verdict is the check

- **Decided:** A test either passes or fails, as the team designed the suites. Any value that matters is checked inside the test with the harness's own checks (`assert` in interpreter tests, a `run_out_equals` key in a compiled test's `.test` file). Anything a test prints beyond those checks is ignored. So no expected-output files are added, and neither those files nor comparing a test's printed output is to be proposed to the curator again. The reason: where the suite's designers let a test pass without a further check, its output does not need checking.
- **Applies:** To every test and to every proposal about how tests are checked.
- **Requires:** Put each check inside the test using the harness. Do not add expected-output files. Do not propose them, or output comparisons, to the curator again. Take the suite's pass or fail as the result.
- **Unfinished:** Nothing.
- **Could not resolve:**
  - "a comparison of a test's printed output": two readings. A `run_out_equals` key is itself a comparison of a test's printed output, and the entry allows it. I read the ban as covering comparisons made outside the harness, such as a whole run's output against a saved copy (SKILL.md's wording). The entry's own phrase could cover `run_out_equals` too.
  - The skill allows exceptions (the gate's comparisons, and a comparison a brief asks for: `gate.md`, "Comparing with an earlier run"). This entry gives none, so taken alone it reads as stricter than the skill.
  - "its output needs no control": unclear wording. I read "control" as "checking"; the sentence can be understood but is awkward.

## P-124 The specification's examples are a step of the gate, and every one must pass

- **Decided:** `ant testSpecData` runs the examples extracted from `Specification/` under walk (F-114 lists which 130 it runs). It is part of the gate, and any failure fails the gate. If an example fails, the implementation gets fixed: the example is not rewritten to suit walk, and there is no list of examples allowed to fail. Built.
- **Applies:** To the gate, and to the 130 extracted examples, under walk only.
- **Requires:** Run `testSpecData` as a gate step after the two suites (`gate.md`), with zero failures. Fix a failing example in walk or the library. Do not rewrite it to suit walk, and do not add an allow-to-fail list.
- **Unfinished:** Nothing; it is marked Built.
- **Could not resolve:**
  - "not respelled to suit walk": two readings when combined with P-97, which does rewrite examples, but for a language decision under the revision form. I read the ban as covering only rewrites made to get around a walk defect, but the entry does not draw that line.
  - Limits: it does not say whether an example added to `Specification/` later is extracted into the 130 automatically, or how a "Not allowed" original (P-97) is handled.
  - The compiled path is not covered. I read that as intended (examples run "under walk").

## P-125 The suites run Fortress in parallel, pinned at four threads in `build.xml`

- **Decided:** `build.xml` sets `FORTRESS_THREADS=4` for `ant testFast` and `ant testSystem`, whatever the calling shell sets. A test that fails because of parallelism, always or sometimes, is either written wrong (for example a write that needs `atomic`) or exposes a real defect. Either way it gets fixed, never hidden by running at one thread. The reason: Fortress is parallel by default, so a one-thread suite has a blind spot, and sparing the four-CPU machine is not a reason to use one thread. Built.
- **Applies:** To the two suites. Per `tests-running.md` it also holds for `harness-one.sh` and `junit.sh`.
- **Requires:** Do not lower the suites' thread count. Fix a parallel-only failure: add `atomic` to a racy write, or fix the defect. Do not run the test at one thread to avoid it.
- **Unfinished:** Nothing; it is marked Built.
- **Could not resolve:**
  - Limits: `ant testSpecData`'s thread count is not stated, here or in the skill.
  - Otherwise clear.

## P-150 No resident compiler is built

- **Decided:** The project will not build a resident compiler, meaning a JVM kept running in the background to serve each `fortress` command, as Scala 2's `fsc` did. Speed work goes into making the checker itself faster instead (P-148: each rung that extends the checker also makes its new code fast). The idea stays closed unless something significant changes. The reason: measuring the workers' transcripts showed it would save too little of their time (F-234: the suites already run in one JVM each, and the commands workers run one at a time are a small share of their time).
- **Applies:** To any proposal for a persistent or background compiler or JVM server.
- **Requires:** Do not build or propose one. Spend speed work on the checker's own speed, inside the rung that adds the code.
- **Unfinished:** Nothing for this entry. The speed work belongs to P-148.
- **Could not resolve:**
  - "rung": a project term I lack. The skill only uses it in paths (`explorations/compile-ladder/rung-*`) and mentions a "ladder regression" in `gate.md`. I take a rung to be one step of work that extends the checker, but this is not defined.
  - "the suites already run in one JVM each": this clashes with `tests-running.md`, where `testFast` runs four tracks and `testSystem` four shards, each its own JVM. I read it as "each track or shard runs its many tests in one JVM, not one JVM per test", but as written it says one JVM per suite. Unclear wording.
  - "unless something significant changes": vague. The entry gives no test for what would count, for example a measured change in how workers spend their time.
