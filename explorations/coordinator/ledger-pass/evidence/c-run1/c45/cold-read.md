# Cold read: c45 (rows 268, 291, 123, 532, 757)

Read with `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, and greps of `references/` (records.md, tests-writing.md, tests-running.md, build-and-caches.md, compiler.md, gate.md, worktrees.md, toolchain.md). The meaning of each status word is in the ledger's row template, which a cold reader may not read; `records.md` only lists the seven words and says the last three close a row. So for all five rows, `NEGATIVE-VERIFIED` reads to me as "a confirmed, open defect" by its name alone.

## Row 268

- **Defect:** The nine `Syntax…Use.fss` programs in `ProjectFortress/syntax_abstraction_tests/transformer/` are written in an old syntax-abstraction spelling (`Expr |Expr:=` with a bare `do … end` transformer). The current grammar no longer accepts it, so each fails with `Syntax Error` while parsing its api (`SyntaxHelloWorld.fsi:18:11`, `SyntaxTest.fsi:20:13`). The grammar now wants `Expr |:=`, `SyntaxDef ::= SyntaxSymbols => PreTransformerDecl`, and a transformer as `<[ … ]>` or `case … of` (`parser/Syntax.rats:85-92`, `:148-153`, `:186-199`). Nothing in the routine build runs them: the JUnit lister takes only the top-directory Use files, and `testsyntax` hangs only off `testNightly`.
- **Where:** parser (both paths, since they share it); the test files under `syntax_abstraction_tests/transformer/` and their `.fsi` apis; `SyntaxAbstractionJUTestAll.java:36,39`; root `build.xml` targets `testsyntax` (`:1507` at c124c6b65) and `testNightly` (`:1564`).
- **Reproduce:** run `ProjectFortress/syntax_abstraction_tests/transformer/SyntaxHelloWorldUse.fss` under walk (it imports a DSL grammar, so set the `tmp/` parser folder as `build-and-caches.md` says); expect `Syntax Error` at `SyntaxHelloWorld.fsi:18:11`. A saved output is `explorations/apl-probes/existing-tests/b_SyntaxHelloWorldUse.out` "in the parent of 7c3218956", which I read as: deleted in 7c3218956, so `git show 7c3218956^:<path>`.
- **Status:** an open, confirmed gap of packaging. The fix would be to respell the nine tests (and their apis) in the current grammar, and/or wire them into a gated suite; nothing says the work waits on a question. The class "packaging (tests)" suggests the tests, not the parser, are what is wrong.
- **Could not resolve:**
  - "`SXX` expected failures": the skill defines `XXX` tests only; `SXX` is not found. Language/harness concept I lack. Also unclear whether the two `SXX` files are among the nine or beside them ("beside" reads both ways).
  - "transformer", `PreTransformerDecl`, "bare `do … end` transformer": syntax-abstraction concepts that the skill does not cover (it defines only "DSL grammar"). Concept lacked.
  - "a green suite says nothing of syntax abstraction": the skill (`tests-running.md`) says the gated suite does run `syntax_abstraction_tests/ForUse.fss`, so "nothing" overstates or means "nothing of the transformer form". Unclear wording.
  - "Found by: apl feasibility": a batch name with no meaning to me; harmless.
  - "full text: history, row 268": I take it to mean `explorations/fortress-gap-ledger-history.md`, row 268. Clear enough from `records.md`.

## Row 291

- **Defect:** The static type checker has no case for template syntax (`<[ … ]>` bodies of syntax abstraction, the `TemplateGap` and `_SyntaxTransformation` nodes). On the compiled path, (a) a template that names a function of the component that uses the grammar crashes with `ClassCastException: scala.runtime.BoxedUnit cannot be cast to AbstractNode` in the assertion run after type checking, because the template body still holds `OutAfterTypeChecking` nodes; (b) a typed lambda inside a template gives `Unbound type: ZZ32`, because the disambiguator never entered the template's types. Walk runs both programs.
- **Where:** compiled path only, `fortress compile`: `STypesUtil.scala:2150` (c124c6b65) called from `compiler/StaticChecker.java:264` ← `:126` ← `TypeCheckPhase.java:43`; `TypeWellFormedChecker.scala:252`; `scala_src/typechecker/` as a whole (missing cases).
- **Reproduce:** no reproducer in the tree. The probes are `explorations/perf-probes/grammar-compile/shim/G_*.fsi`, recoverable with `git show fc89ee7a5^:<path>` (my reading of "in the parent of"). `fortress compile` a component importing such a grammar; expect the `ClassCastException` or `Unbound type: ZZ32`. The row does not say which `G_*` probe shows which failure, nor give the using `.fss`.
- **Status:** open, confirmed checker gap; a worker on the compiled path could build the checker rules (or a pass that strips templates before the checker). No pending question is named. Probably low priority, since `build-and-caches.md` says the library and microGPT import no DSL grammar.
- **Could not resolve:**
  - "template ASTs", "template", `TemplateGap`, `_SyntaxTransformation`, `OutAfterTypeChecking`: syntax-abstraction AST concepts not in the skill. Note "template" collides with the skill's other meaning (a generic declaration compiled "as a template class"); the row means the `<[ … ]>` form, but a cold reader could read it two ways. Concept lacked / ambiguous word.
  - "the post-typecheck assertion": which check this is is not named beyond the stack; unclear wording.
  - "No import fixes it.": which imports were tried, and why an import would be expected to help, is not said. Unclear wording.
  - "rows 270, 282 and 285 hold under walk only": reads two ways, "those rows' defects are shown only under walk (not tested compiled)" or "those rows' working capabilities work only on walk". Unclear wording; I could not read the rows.
  - "Reproducer: none" beside named probes: the probes are scratch and deleted, I assume; fine.

## Row 123

- **Defect:** The library has no `TestSuite` object, though the specification (`basic/tests.tex`, "Test Suites") says the convenience object `TestSuite` is defined in the library. A program naming it fails with `Variable TestSuite is not defined.` The only declaration is in the team's unused draft `Library/incomplete/basic/Fortress.Standard.fss:52` (`test object TestSuite(testFunctions = {})`, api `.fsi:92`), which no build reads.
- **Where:** the library (`Library/FortressLibrary.fss`); the error shown is walk's (it says nothing of the compiled path); spec `Specification/basic/tests.tex`.
- **Reproduce:** a program that refers to `TestSuite`, run under walk; expect `Variable TestSuite is not defined.` The probe is `explorations/run-b2/probes/g1c_testsuite.fss`, from `git show 22ea0cd90^:<path>`.
- **Status:** open, confirmed library gap against the specification; a worker can build it, likely by porting the draft object into `FortressLibrary.fss`. Meanwhile use the `test` modifier (row 120). No waiting question named.
- **Could not resolve:**
  - The row does not say whether the compiled path was tried; `SKILL.md` asks rows to name the paths. Gap in the row, not in my vocabulary.
  - "`test` modifier (row 120), which is the harness the interpreter has": the `test` modifier is not described in the skill (it describes the suites' harness, `.test` files). Concept lacked; "harness" here collides with the skill's defined "harness" (the suites' runner). Reads two ways.
  - "test object": a modifier on an object declaration, I assume; not in the skill.

## Row 532

- **Defect:** Under walk, `ProjectFortress/tests/ReflectiveQuickCheckTest.fss` takes 146 s to 581 s depending on machine load. `count-run.sh` kills each test at 600 s (`timeout -k 10 600`, line 57 at c124c6b65), so a comparison run of the interpreter tests can show this test as `rc=124` (timed out) though nothing about it changed. The test itself is correct: run to the end it exits 0 with identical output. `QuickCheckTest` behaves the same.
- **Where:** walk; the test `ProjectFortress/tests/ReflectiveQuickCheckTest.fss` (and `QuickCheckTest`); the tool `explorations/coordinator/tools/count-run/count-run.sh` (used per `gate.md`, "Comparing with an earlier run").
- **Reproduce:** run `count-run.sh` on a loaded machine (one-minute load near 24) and look for `rc=124` on this test; or time the test alone under walk. Evidence: `explorations/compile-ladder/rung-rr32-sibling/REPORT.md` section 7, "changed output 6"; `explorations/compile-ladder/rung-size-range/REPORT.md` section 11; captures from `git show ab067d9b6^:...`.
- **Status:** open, a tool/packaging issue. Fix in the tool: a longer limit for these tests, or add both to the list of load-sensitive tests. Until then a worker comparing runs should treat an `rc=124` here as noise, not a regression.
- **Could not resolve:**
  - "list both with the load-sensitive tests": I found no such list in the skill (`gate.md` mentions masks in `compare-normalised.py`, "the last three masks above", which may be it). Where the list lives is not said. Unclear wording.
  - "Found by: climb batch 6.5b rung V's skeptic": batch jargon; harmless.
  - "changed output 6": a numbered item inside that report section, I assume. Minor.
  - "Runs at 600 s per test: 581 s and 173 s on one tree; cut at 600 s ... then 261 s": the clause sequence is dense; I read it as several separate runs, but which tree and which commit each is is not said. Unclear wording, does not block.

## Row 757

- **Defect:** If you run `fortress typecheck P.fss` and then `fortress compile P.fss` on the same unchanged file, the compile writes no jar yet exits 0. A later `fortress run P` fails with `Could not load P` and `Resource not found : P.class`. Cause, by reading: `repository/GraphRepository.java:283` treats a component as done when its `analyzed_cache` entry is no older than its source, and `isStale` (`:614`) compares only those dates, never whether the jar exists. `typecheck` writes the analyzed entry, so the compile thinks there is nothing to do.
- **Where:** compiled path, the `fortress` commands and the caches (`analyzed_cache/`, `bytecode_cache/`); `ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java:283`, `:614` (at c124c6b65).
- **Reproduce:** with a private caches folder, on base 3aea3da53: `explorations/coordinator/tools/old-fortress.sh <base> <caches> typecheck P.fss`, then `... compile P.fss` (exit 0, no `P.jar` in `<caches>/bytecode_cache`), then `... run P`. Any small component serves; the probe `SkTcThenCompile.fss` was never committed. Control: compile a fresh copy under another name, and its jar is written.
- **Status:** open, confirmed tool gap; a worker can build a fix (make `isStale` or the done-check also require the jar). Until then, compile before any typecheck of the file. No question pending.
- **Could not resolve:**
  - The row has no "full text: history" pointer, unlike the others; possibly it has no earlier text. Not a blocker.
  - "On the base 3aea3da53" versus "By reading, at c124c6b65": the behaviour was run on one commit and the code read on another; whether it still reproduces at c124c6b65 is not said. Unclear wording.
  - "Found by: climb batch 17 rung A's skeptic": batch jargon; harmless.
  - `old-fortress.sh` argument order (`<base> <caches> typecheck`) differs in form from `worktrees.md`'s description (it sets `FORTRESS_HOME` and `FORTRESS_CACHES`); I take `<base>` as the base build. Clear enough.
