# Cold read 2 of positions/p8/clean.txt

Read with only `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, and these references for terms: `specification.md`, `exploring.md` (first section, for "type group", "late positions" and the patents pointer), `tests-writing.md`, `tests-running.md`, `gate.md` ("Comparing with an earlier run"), `compiler.md` ("The checker's time"), `library.md` (grep only). Nothing else.

Nine entries, all positions: P-95, P-96, P-97, P-98, P-102, P-103, P-124, P-125, P-150.

---

## P-95 Every change to the specification is recorded with its reason

**Decided:** When the revival changes the language, `Specification/` is updated to match, so that the text and the implementation always agree. The change does not erase the team's text: the original wording and the reasoning are kept, so that the project can still go back to "route C", the nested number tower (a number type a subtype of another) under the team's 2012 patent "forest rule", which P-43 set aside. Every such change uses the revision form of P-96. `Specification-1.0-frozen/` is never edited.

**Applies:** to every edit of `Specification/` that a language change makes. The title says "every change to the specification"; the body says "when the revival changes the language". Never to `Specification-1.0-frozen/`.

**Requires:** a worker who changes the language must also change `Specification/` in the same work, in the revision form, keeping the original text and the reasoning. Must not touch the frozen copy. Must not leave the text and the implementation in open disagreement.

**Unfinished:** nothing stated; it is a standing rule. F-46 holds what a return to route C would need.

**Could not resolve:**
- "the forest rule of the team's 2012 patent applications": a language concept I lack. The skill names the patents' reading (`explorations/reviews/mie-probes/patents-forest-rule.md`) but does not say what the rule is. I can tell only that it is what a nested tower would live under, presumably a relaxation of the exclusion rule. It does not block the worker's duty here (keep the original and the reasoning), but it blocks understanding what "route C stays open" protects.
- "nested number tower": readable against SKILL.md ("Numbers are siblings, not a tower") as the opposite design, where e.g. `ZZ32` is a subtype of `ZZ64`. Inferred, not stated.
- Scope, unclear wording: is a `Specification/` edit that is not a language change (a typo, a citation, P-97's example rewrites against an existing rule) "such a change"? The title says every change; the body ties it to language changes. `specification.md` says "Every change of the text", so I lean to every change, but the entry reads two ways.

## P-96 A change of the specification is shown in layers (the revision form)

**Decided:** The revival marks its own changes of the specification the way the team marked theirs in the 1.0 release (2008) and the 2009 working draft: layered, with the old visible beside the new. This is "the revision form" (P-80 and P-147 call it "the S1 form"). Its parts: a callout at each changed passage that prints in every build (not a `\note`, which a release build hides); an entry in Appendix I's revival section for each change, with its reason, its original text, what returning to route C would mean for it, and the curator's decision it follows; one paragraph in the front matter on the revision as a whole; and a repository document with the full reasoning. The frozen copy is cited as "the Working Draft of February 2011", because it is exactly that draft; only its `fortress.1.0.pdf` is the 1.0 release (F-163).

**Applies:** to every change of `Specification/` that P-95 covers. The citation rule applies whenever anyone cites `Specification-1.0-frozen/`.

**Requires:** use `\revision{<label>}{...}` callouts, not `\note`; write the Appendix I entry; keep the front-matter paragraph true; write the full reasoning document (per `specification.md`, `decision-record.md` in the work's folder under `explorations/`). Cite the frozen copy as the Working Draft of February 2011, not as "1.0", except its `fortress.1.0.pdf`. The full checklist is in `references/specification.md`.

**Unfinished:** nothing stated.

**Could not resolve:**
- "what a return to route C would mean for it": unclear wording for a change that has nothing to do with the number tower (e.g. P-97's example rewrites). `specification.md` asks more generally for "what a reversal to the alternative not taken would need". Two readings: every entry must speak to route C specifically (even if only "nothing"), or route C is the example and each entry states its own way back.
- "a document in the repository holds the full reasoning": vague in the entry (which document, where); resolved only by `specification.md` (`decision-record.md` under the work's `explorations/` folder).
- "the working draft of 2009": named as a model of the form but not located; I assume it is not in the tree. Not blocking.

## P-97 Specification examples that break the exclusion rule take the library's shapes; originals kept as "Not allowed"

**Decided:** The Working Draft presented as legal some examples that violate the exclusion rule (no type may extend two instantiations of one generic trait). Each such example is replaced by the form the library uses for the same purpose, with the original kept beside it under the specification's own "Not allowed" mark. The revised specification states the rule ("instantiation exclusion") once, taken from Luchangco's 2012 Types chapter (`types.tick`, P-25), split over two files: `basic/types-vals-vars.tex` (which instantiations exclude each other) and `basic/traits.tex` (a declaration may not extend two that do). The covariance example (a trait extending other instantiations of itself) gets the same treatment, and its callout adds one sentence saying that the type group's later design declares variance with a `covariant` modifier, which neither walk nor the compiled path implements (gap-ledger row 404). Appendix A's calculi are left as written, with a callout saying they predate the rule. Status: built.

**Applies:** to the examples of `Specification/` that break the exclusion rule, the covariance example, and the calculi of Appendix A.

**Requires:** nothing new; it is done. Implied for a worker who meets another such example: same treatment (library shape, original kept as "Not allowed", callout). A worker must not change the calculi's rules or soundness claims.

**Unfinished:** the `covariant` modifier is unimplemented on both paths (row 404). The entry records it as a gap; it does not say whether building it is decided.

**Could not resolve:**
- "states the rule ... once, in the two parts of Luchangco's Types chapter": unclear wording. "Once" next to "two parts", and the parts are then named as two files of `Specification/`, not of `types.tick`. I read it as: one statement of the rule, copied from Luchangco's chapter, whose two halves sit in the two files. A reader could also take it to mean the rule lives in `types.tick`.
- "the library's shapes": readable as "the way the library writes the same thing", but the skill does not show what that shape is (e.g. for the covariance example). Not blocking, since it is built.
- Whether building `covariant` is in or out of scope: unclear wording / unstated. SKILL.md says generics are invariant with no `+T`/`-T`, which suggests out, but the entry only records the gap.
- "Luchangco": a person not introduced; I take it as a member of the team's type group. Not blocking.

## P-98 `TotalComparison` extends `StandardMinMax[\TotalComparison\]`

**Decided:** In `Library/FortressLibrary.fsi` and `.fss`, the trait `TotalComparison` now extends `StandardMinMax[\TotalComparison\]`, so that `BIG MIN` and `BIG MAX` can reduce over values of type `TotalComparison`. It keeps its own hand-written declarations of `MIN`, `MAX`, `MINMAX`, `<=` and `>=`. Without the parent, walk finds no overload of `BIG MIN`/`BIG MAX` for these values (gap-ledger row 461). Reason: extending `StandardMinMax` is how the library's other ordered types get these operators. The curator accepted it on the coordinator's (the coordinating session's) recommendation. It stands and blocks nothing, but the curator wants a fuller explanation later; `PLAN.md`, section "Pavol's answers, in the order they are needed", lists it as owed. Status: built (F-77).

**Applies:** to `TotalComparison` in the interpreter's library.

**Requires:** keep the parent and the five restated members; do not undo or redo it. No worker action; the owed explanation is for the coordinator.

**Unfinished:** the explanation to the curator. Nothing to build.

**Could not resolve:**
- `TotalComparison`, `StandardMinMax`, "total comparisons": library concepts I lack. The skill's `library.md` does not mention them. I guess `TotalComparison` is the type of a comparison's result (less, equal, greater) and `StandardMinMax[\T\]` a self-typed trait that supplies min/max and the reductions, but that is a guess.
- "the five members that it restates by hand": readable as "keeps its own declarations of five members that the parent would also give it", but whether they override or merely duplicate the parent's, and why they are kept, is not said.
- "the library's own device": unclear wording; I read "device" as "pattern" (extending `StandardMinMax`).
- `PLAN.md`: path not given (presumably `explorations/coordinator/PLAN.md`). Not blocking for a worker.
- Is the compiled path's library affected? Only walk is named. Not blocking.

## P-102 Test first, the test kept

**Decided:** Every edit of source code in the original tree begins with a failing test: add it to a suite, see it fail, fix, see it pass, and leave the test in the suite permanently. Edits of the specification or documentation need no test. The gate's three runs (`ant testFast`, `ant testSystem`, `ant testSpecData`, P-124) must pass when the work lands, not after every edit. The test and the fix may be one commit. Reason: this replaces one-off validation scripts, which nothing reruns.

**Applies:** to source edits in the original tree (everything outside `explorations/`, `research/`, `CLAUDE.md`, `.claude/`). Not to `Specification/` or documentation edits.

**Requires:** test before fix; see it fail through the harness; keep it; no one-off validation scripts for an edit. Gate at landing.

**Unfinished:** nothing stated.

**Could not resolve:**
- Edits that no failing test can show: unclear/unstated. A refactor, a speed-up (P-148's speed work, P-150) or a build-file edit changes no observable result, so there is no test that fails first. The entry says "every edit", with no exception and no instruction for that case.
- "source code": does it include `build.xml`, `Fortress.ast`, the Rats! grammars, the library `.fss`/`.fsi`? I assume yes for all, but the entry does not draw the line.

## P-103 The suite's verdict is the check

**Decided:** A test passes or fails, and that is the result, as the team's suites were designed. Anything that matters is checked inside the test with the harness's existing checks (`assert` in an interpreter test; a `run_out_equals` key in a compiled test's `.test` file). Output beyond those checks counts for nothing. So no expected-output files are added, and neither they nor a comparison of a test's extra output with an earlier run's output are to be proposed to the curator again. Reason: where the suite designers let a test pass without further checking, its extra output need not be checked.

**Applies:** to every test and every proposal about checking tests.

**Requires:** put checks in the test; do not add expected-output files; do not propose them, or output comparisons with earlier runs, again.

**Unfinished:** nothing.

**Could not resolve:**
- Unclear wording, conflict with the skill: `gate.md`, "Comparing with an earlier run", does compare printed output with an earlier run (with masks), and `SKILL.md` names the gate's comparisons and brief-requested comparisons as exceptions. The entry names no exception, so it reads two ways: those existing comparisons are outside its scope (it bans only new proposals), or it overrides them.
- "an `assert` call in an interpreter test, a `run_out_equals` key in a compiled test": could be read as exclusive (compiled tests use only `run_out_equals`), while `tests-writing.md` says a compiled test may use `assert` too. Minor.

## P-124 The specification's examples are a gate step; all must pass

**Decided:** `ant testSpecData` runs the examples extracted from `Specification/` under walk (130 of them, per F-114) as a step of the gate, and the gate fails if any fails. A failing example is answered by fixing the implementation, never by respelling the example around a walk gap, and there is no allow-list of failing examples. Status: built.

**Applies:** to the 130 extracted examples, under walk only, at every gate.

**Requires:** when an example fails, fix walk (or the library); do not edit the example to dodge the gap; do not keep a list of tolerated failures.

**Unfinished:** nothing stated.

**Could not resolve:**
- A failure whose fix is large or deferred: unclear/unstated. The skill lets a deferred defect be an `XXX` gated expected failure; the entry forbids "a list of examples allowed to fail". Whether marking an extracted example `XXX` counts as such a list is not said, so a worker facing an example that walk cannot pass yet has no stated route except fixing it before landing.
- Boundary with P-97: an example that fails because it breaks the exclusion rule is rewritten under P-97, which is a respelling. I read P-124's "to get around a gap in walk" as the line, but the two entries do not cross-reference.
- Examples of features that are specified but not built (SKILL.md: dimensions and units, `property`, regions, complex numbers): whether they are among the 130 is left to F-114. Not blocking.

## P-125 The suites run at four threads, pinned in `build.xml`

**Decided:** `build.xml` sets `FORTRESS_THREADS=4` for `ant testFast` and `ant testSystem`, regardless of the calling shell. A test that fails because of parallelism, always or intermittently, is either badly written (e.g. a shared write that needs `atomic`) or shows a real defect; either way it is fixed, never hidden by running it at one thread. Reason: Fortress is parallel by default, so a one-thread suite would miss defects, and saving load on the four-CPU machine does not justify one. Status: built.

**Applies:** to the two suites (`testFast`, `testSystem`).

**Requires:** do not lower the suites' thread count; fix a parallel-only failure in the test or the implementation.

**Unfinished:** nothing.

**Could not resolve:**
- Whether `ant testSpecData`, the gate's third run, is pinned too: the entry says "the two suites". Minor, not blocking.
- An intermittent failure that a worker cannot reproduce or fix in the work at hand: unstated whether it may be recorded (ledger row, `XXX`) rather than fixed before landing. "Either is fixed" reads as "before landing" but does not say so.

## P-150 No resident compiler is built

**Decided:** No resident compiler (a JVM kept running in the background to serve each Fortress command, like Scala 2's `fsc`) will be built. Speed effort goes to making the checker itself fast (P-148: whoever adds checker code makes it fast). The idea is not reopened unless something significant changes. Reason: measuring the workers' transcripts showed that Fortress commands run one at a time in fresh JVMs take a small share of a worker's time, so the saving would be too small (F-234). The suites already run many tests per JVM; the possible saving inside suites and builds was not measured.

**Applies:** to any proposal of a resident or daemon compiler.

**Requires:** do not build one; do not propose it again without a significant change. Put speed work into the checker.

**Unfinished:** nothing to build. The saving inside suites and builds is unmeasured.

**Could not resolve:**
- The last sentence, unclear wording: it admits the decision's evidence did not cover suites and builds. Two readings: (a) the decision holds for suites and builds anyway, and this is only a note of the evidence's limit; (b) a measurement of that saving would be the "something significant" that may reopen it, so a worker may propose measuring it. The entry does not say which.
- "unless something significant changes": who judges, and what counts, is not said (presumably the curator). Not blocking.
