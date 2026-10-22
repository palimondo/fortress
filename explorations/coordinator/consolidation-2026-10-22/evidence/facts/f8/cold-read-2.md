# Cold read 2 of f8/clean.txt

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and these references: `compiler.md` ("The checker's time", walls), `tests-writing.md` (the `XXX` test), `gate.md`, `interpreter.md` (checks at load), `library.md`, `records.md` (ledger rows). Nothing else.

Eight entries, all facts: F-231, F-232, F-237, F-240, F-242, F-243, F-244, F-245.

---

## F-231

**Established:** The checker's syntax-tree walker, `Walker.walk` in the generated `FortressAst.scala` (written by `ScalaAstGenerator`), used to be one method of 31,704 bytes of bytecode. HotSpot does not compile a method over 8,000 bytes, so it ran interpreted, and since every substitution and normalization of the checker goes through it, it took most of the checker's time. It is now split into eight methods, each under the limit, so HotSpot compiles them. The split keeps the walker's cases in order and the checker's output identical. Measured on an idle machine, it took the count stage from 911 s to about 340 s and the distance stage from 2,375 s to 931 s. After the split, about 95 % of the remaining time in the library's type check was the solver reducing the same formulas again; the solver's memos now answer those (F-235). These times are historical; F-240 gives the current ones.

**Conditions:** The measurement was on climb batch 15's code plus the repair that lets the checker check a block's local functions (ledger row 680, F-233); the repair and the split are the two changes that climb batch 15b landed. Both the before and after runs had the repair, so the drop is the split's alone. "Eight" is today's count; the number follows from how many cases go in each method.

**Consequence:** A worker who changes `Fortress.ast` or the generators must keep every method of `Walker` under 8,000 bytes; the gating test fails otherwise (`compiler.md` says to lower `WALKER_CASES_PER_METHOD` in `ScalaAstGenerator.java`). Do not take F-231's seconds as the stages' current times; use F-240.

**Evidence:** `WalkerJUTest`, which fails if a `Walker` method passes 8,000 bytes and checks that the split walker gives the same answers. Detail: `perf-probes/checker-speed-2/REPORT.md` sections 2 and 6.

**Could not resolve:**
- "The split, in order and with identical output, was measured on climb batch 15's code with the repair ..., the two changes that climb batch 15b then landed" — unclear wording. "in order" can mean the walker's cases kept in their order, or the two changes applied in order (repair, then split). The appositive "the two changes that climb batch 15b then landed" most likely names the repair and the split, but it can also be read as a third ingredient of the measured code. I took the first reading of each.
- "the library component's type check" — unclear wording: one component (which?) or the type check of the library's components as a whole. I read it as the latter.
- "the solver" and its "formulas" — a checker concept the skill does not define (presumably the constraint solver of inference). Not blocking.
- The gating test is `WalkerJUTest` here, but `compiler.md` names `MethodSizeJUTest` as the test that fails when a `Walker` method passes the limit. Both may exist; the entry does not say how they relate.

---

## F-232

**Established:** The hash of a syntax-tree node does not depend on JVM identity hashes, with three exceptions. Every generated node class starts its hash from the hash of its class name; both the post-processing that makeAST applies to ASTGen's output and the repository's own generators (`build.xml:679-697`) write that start. A field whose type contains an `Option` is hashed by `NodeHash.of`, because the PLT library's `Option` classes hash by identity. Therefore hash maps and sets of nodes iterate in the same order regardless of which identity hashes were requested earlier in the run, and `StaticChecker.checkApis` takes the apis in the same order each run. The exceptions: (1) an inference variable's id is a bare `Object`, which hashes by identity, though no output of the count stage depends on that hash; (2) walk's `_WrappedFValue` hashes its value with walk's own hash, which can be an identity hash (row 430); (3) any node that holds one of those two. Separately, `DeclaredFunction` objects (entries of the checker's index, not nodes) still hash by identity, but since the repair of row 737 no choice made by `ApiTypeExtractor` depends on their order (F-254).

**Conditions:** Holds for nodes that hold neither an inference variable nor a wrapped walk value. The guarantee is about iteration order of node-keyed collections and the order of api checks, not about collections keyed by `DeclaredFunction` or other non-node objects.

**Consequence:** A worker can rely on a stable order of node-keyed maps and sets, and of the apis' checks, between runs (this is what lets `compiler.md`'s count-stage comparison treat any order change as a real difference). A worker must not make a node field hash by identity (for example, by adding a field of a type holding a PLT `Option` without `NodeHash.of`), and must not make checker output depend on the order of `DeclaredFunction`s or on inference-variable hashes.

**Evidence:** `NodeHashJUTest`; row 737's repair by `OmittedReturnTypeFromApi`. Source lines: `build.xml:679-697`, `nodes_util/NodeHash.java`, `nodes_util/NodeFactory.java:1166-1184`, `interpreter/evaluator/_WrappedFValue.java:170-177`. Detail: `compile-ladder/rung-ast-hashes/REPORT.md` sections 4.2 to 4.4.

**Could not resolve:**
- "makeAST", "ASTGen" and "the PLT `Option` classes" — tool and library names the skill does not define. From context: the code generators of the AST classes, and the external utility library whose `Option` the nodes use. Not blocking.
- "the nodes that hold them" — whether "hold" means directly as a field or anywhere below in the tree. I read it as anywhere below, since a parent's hash folds in its children's.

---

## F-237

**Established:** In the checker's well-formedness pass (`TypeWellFormedChecker`), a call's type keeps the source spans of the callee's declared type, so an ill-formed type made by a call would point at the declaration. Instead, when the pass meets an ill-formed type whose span lies outside the expression it is currently checking, it reports the error at that expression, the innermost one where it met the type. So a call whose static argument breaks a bound in the callee's result type is reported at the call. It is reported once for each call that made the type: expressions that receive the call's value share its type node and add no error, and a second, separate call with the same printed static argument gets its own error. A type that is ill-formed as written in the declaration is still reported once, at the declaration. A local variable's right-hand side is checked before the lines that use the variable, so the error lands on the call, not on a later use of the variable. On the library, by reading the code, this changes no error count compared with reporting at the declaration, and the distance has no well-formedness error (F-53).

**Conditions:** One open gap, row 776: two nested calls of the same callee whose static arguments print alike, such as `next[\T\](next[\T\](x))`, get only one error, at the inner call. The program is still refused, so only the location count is wrong.

**Consequence:** A worker can expect a static-argument bound error at the call site, one per offending call, not at the callee's declaration or at uses of the value. The nested case reports one error; a fix of row 776 would change `XXXStaticArgBoundNestedCall`. A diagnostic test that pins a `file:line:column` for such an error should pin the call.

**Evidence:** `TypeWellFormedChecker.scala`, its `check`, `error`, `outside` and `within`, and its `SLocalVarDecl` case. Tests: `compiler_tests/XXXStaticArgBoundAtCall`, `XXXStaticArgBoundAtCallOnce`, `XXXStaticArgBoundAtEachCall`, `XXXStaticArgBoundAtCallNotAtUse`, `XXXIllFormedTypeAtDeclarationOnce`, and `XXXStaticArgBoundNestedCall` for row 776's single error. Detail: `compile-ladder/rung-checker-abstract-callsite/REPORT.md` sections 1 and 6, its `SKEPTIC.md` 5.1 and 5.2, its `JUDGE.md`.

**Could not resolve:**
- "the well-formedness walk" — the skill defines "walk" as the interpreter. Here it means the checker's traversal. Context resolves it, but on first read it looks like the interpreter. Unclear wording.
- The gating tests are all `XXX` tests, but the behaviour they gate is built. The skill defines an `XXX` test as an expected failure that "fails today" and goes red when the defect is fixed. `tests-writing.md` also says that in a compiled folder the `XXX` prefix means every command must fail, which fits a test asserting a refusal at compile time. I take them as refusal tests, but the entry does not say so, and the two meanings of `XXX` collide.
- "`XXXStaticArgBoundNestedCall`, which pins row 776's single error" — whether it asserts exactly one error (so it goes red when row 776 is fixed) or only that the program is refused. The entry does not say what a fixer of row 776 does with it.
- "by reading" — I take it as "established by reading the code and the library, not by a run". Plausible but not stated.

---

## F-240

**Established:** At the last landed gate (climb batch 20's), the checker's count stage took about 63 s and its distance stage 161 s. At climb batch 15b's gate they took 325 s and 1,075 s. Most of the drop comes from the solver's memos (F-235), not from a difference in machine load. At batch 20's gate the count stage ran alone after the ladder regression, and the distance stage ran at the same time as `testFast`; on an idle machine, the same library and checker gave 139 s for the distance stage. Load can more than double a stage's time: batch 16's merged code took 217 s for the distance stage at load average 3.3, and nearly the same code took 574 s at load average 4.6 to 5.3.

**Conditions:** These are the times of one gate on this 4-CPU machine; the numbers are for climb batch 20's code. A time is comparable only with one taken under similar load.

**Consequence:** A worker comparing a stage's time must take both runs under similar load (ideally idle, nothing else running, as `records.md` says) and must not read a slowdown into a run made beside a suite. A count stage of about a minute is normal today.

**Evidence:** The gate's result and `compile-ladder/climb-batch-20/gate/distance.txt`. Detail: `reviews/batch-20-review.md` section 2; `reviews/batch-17-review.md` section 1; `reviews/batch-16-review.md` section 2.

**Could not resolve:** Nothing blocking. "the ladder" means the gate's ladder regression (`gate.md`). F-231's after-split figures (about 340 s and 931 s, idle) and F-240's batch-15b gate figures (325 s and 1,075 s) differ; I take them as different runs under different load, which the entry's own last sentence allows.

---

## F-242

**Established:** The library's fusion of `SUM` with `MAX` and `MIN` (the objects `MaxSumReductionPair` and `MinSumReductionPair`, and the two `distribute` overloads of `SumReduction` through which the team's `Generator2` computes the maximum or minimum of sums in one pass) no longer contributes any error to the distance. Two changes cleared its six errors. A `where` condition on each of the two `distribute` overloads clears their four unmet-bound errors. `ActualReduction`'s generic `distribute`, which `SumReduction` inherits, now returns `PossibleReductionPair[\K\]` over its own static parameter `K`; this clears the two return-type errors that the two overloads (which return a pair over `Maybe[\T\]`) had against the inherited one, because the pair now satisfies the return-type rule (F-75). The team's own commented-out version, which returns `PossibleReductionPair[\R\]`, would only move the two errors onto the generic method.

**Conditions:** Applies to these two overloads and the inherited generic. The fusion is kept, by P-151, not dropped. Row 433 is closed as fixed.

**Consequence:** A worker must not drop the fusion pairs to clear errors (P-151 keeps them), and must not restore the team's commented `[\R\]` return type. The landing commit and its test are in F-250.

**Evidence:** Row 433 (fixed); F-250 for the landing and test. Detail: `perf-probes/where-clauses/REPORT.md` A.1 and A.2.1; `perf-probes/generic-distribute/REPORT.md` sections 3 and 4.

**Could not resolve:**
- What `distribute` does in a reduction, and what a "fusion pair" is beyond the one-pass max/min of sums — a library concept the skill does not cover. The entry is usable without it.
- "site of the distance" — I read "site" as a place with errors, as `compiler.md` counts places with errors. Not defined in the skill.
- "answer" for "return" ("which answer a pair over `Maybe[\T\]`") — unusual but readable.

---

## F-243

**Established:** At the gates of climb batches 15b and 16, 13 of the distance's 49 errors were filed as waiting on `where` clauses. All 13 are now cleared: the fusion pairs' 6 by the method condition and the generic `distribute` (F-242); `AnyList`'s 4 by making live the team's commented clause `comprises { List[\E\] } where [\E\]`, with the method bodies rewritten inside `AnyList` and none moved into `List` (F-251); 2 by a `cast` in the fallback branches `else => 0` and `else => 1` of `additiveIdentity` and `multiplicativeIdentity` (row 436); and the 13th, the list comparisons' site, by conditional extension (an `extends` entry with a `where` clause), with `ZeroIndexed[\E\]` and an element-wise `=` left outside the condition (F-255). This is the list half of row 634; the tuple half was built earlier. The probe found that 12 of the 13 (all but the list comparisons) could also have been cleared by library edits with no new language: dropping the fusion pairs, moving `AnyList`'s bodies into `List`, and the fallback `cast`.

**Conditions:** The count 49 is the distance at those two gates, not today's. Only the list comparisons' error needed new language.

**Consequence:** These 13 are done; a worker should not look for `where`-clause work in them. The decision to use `where` forms rather than the 12 plain library edits is the curator's (P-151, by F-242 and F-244), so a worker must not undo them in favour of the plain edits.

**Evidence:** The where-clauses probe traced each error (A.1). Detail: `perf-probes/where-clauses/REPORT.md` A.0, A.1, A.4, B.0 and B.3; `reviews/batch-17-review.md` section 2.

**Could not resolve:**
- "with `ZeroIndexed[\E\]` and an element-wise `=` kept outside the condition" — I can tell they are unconditional, but not what the extension looks like (which type extends what, under which condition). Unclear wording or a missing example; the detail is in F-255.
- The `where [\E\]` form after `comprises` (an existential binding of `E`) is not in the skill; F-244 calls it "opening". Language concept I lack, not blocking.

---

## F-244

**Established:** The checker builds three `where` forms: conditional extension, a function's or method's condition, and `AnyList`'s `comprises` clause with a `where`. In the tests of the where-clauses probe, they behave soundly, with one exception that remains. A type variable opened from a `comprises` clause passes the probe's three tests: it cannot escape where another type is declared, two values get two distinct types, and the unsound shape from Amin and Tate is refused (F-251). Of the probe's two holes, one is closed: a method's constraint on its trait's type parameter now bounds that parameter inside the method and is checked at a dotted call (row 748, F-256). The other stands: a member that the checker checks under a conditional extension's condition can still be called where the condition does not hold (row 773, F-255). Swift, Rust and Haskell make such a member available only where the condition holds; P-151 says that is still to build. The opening of a `comprises` clause also has three open checker rows, 751, 752 and 775. F-250 (row 470) and F-256 list the constraints the checker does not read yet.

**Conditions:** "Holds" covers only what the probe tested. Row 773 is open. The method-constraint check is stated for a dotted call only.

**Consequence:** A worker may rely on the three forms in the tested shapes, but must not rely on the checker to refuse a call of a conditionally added member where the condition fails, and must check rows 751, 752, 775, 470 and F-256 before relying on a `comprises` opening or a constraint. Scoping members to the condition is owed work under P-151.

**Evidence:** Detail: `perf-probes/where-clauses/REPORT.md` B.1 to B.3 and B.6; rows 748, 773, 751, 752, 775, 470; F-250, F-251, F-255, F-256.

**Could not resolve:**
- "Amin–Tate tests" and "Amin and Tate's unsound shape" — a research result the skill does not cover (I recognise it as Amin and Tate's unsoundness example for Java and Scala, but the entry does not say what the shape is). Language/research concept I lack in the skill.
- "opened" (a type variable opened from a `comprises` clause) — existential opening; not in the skill. Readable from context.
- "is checked at a dotted call" — whether a functional-method call (`f(x)`) of the same method is also checked. Unclear wording: it may be a limit or just the example.
- "three other open rows" — "other" than which rows? Row 773 concerns conditional extension, not `comprises` opening. Unclear wording.

---

## F-245

**Established:** The compiled checker skips symbolic operators (such as `+`, `||`, subscripts) when it checks overloading (row 584: three loops in the checker exclude them). In a probe copy of the checker whose three loops admit every operator, at `d97001d19` (climb batch 20's gate code), with crashes caught per operator name, the check adds 186 errors to the distance. Of these, 54 would clear by known library fixes, and 132 wait on two designs that the curator decides (PLAN, "Pavol's answers", item 59): a bound on the subscripts' index type (124 errors), and a `Vector` plus a number overload beside a `Vector` plus a `Vector` overload (8). The probe's candidates clear them without anything new: S1 (an index bound with a rule for tuple indices) and A2 (`Vector` and `Matrix` leave `AdditiveGroup`); A3 (drop the scalar `+` and `-`) also clears the 8. The largest families are the subscripts over a generic `Indexed` (124) and `String`'s four concatenation operators `||`, `|||`, `//`, `///` (40). Run the way the stage runs, the result is 185 errors and three crashes on `||` (in `List`'s api and component and `String`'s component), "E is not in the kind env", a checker crash that neither the library fixes nor the designs clear. An earlier count, at `d212b2c1f`, was 205; later batches cleared `FlatString`'s pair (2, F-259) and 20 of the 21 `^` errors (F-263), and added 3 (`|_|` 1, the scalar `+` and `-` 2). Walk's load-time meet check also skips symbolic operators; widened in the same way in the first probe, it refused only `EmptyString`'s `||`, and it does not judge `String`'s pairs, the subscripts, `^` or `=` at all.

**Conditions:** Only in a modified checker; the checker as built adds none of these. Measured at `d97001d19`.

**Consequence:** Turning on symbolic-operator overloading checks would add about 186 to the distance. A worker must not pick S1, A2 or A3 on their own: the curator decides the two designs. The `||` crash needs a checker repair of its own. The 54 can be cleared by library fixes, which the report names.

**Evidence:** Detail: `perf-probes/symbolic-operators-2/REPORT.md` sections 0 to 2 (the crash in 1.3); `perf-probes/symbolic-operators/REPORT.md` section 1.5; rows 584; F-259, F-263; PLAN "Pavol's answers" item 59.

**Could not resolve:**
- "As the stage runs, the 186 are 185 errors and three crashes" — 185 plus 3 is 188, not 186. I read it as two ways of counting (per-name crash catching gives 186; the stage as it runs gives 185 errors and stops at 3 crashes), but the entry does not say how the two counts relate, or where the crashes sit in the 54/132 split. Unclear wording.
- "a checker crash that no fix or design clears" — reads two ways: no fix at all could clear it, or none of the 54 library fixes or the two designs clear it (so it needs a checker repair). I took the second.
- "clear them with nothing new" — reads two ways: introducing no new errors, or needing no new language (F-243's phrase). Unclear wording.
- Which of the 186 the 54 "known library fixes" cover (the 40 `String` errors? others?) is not stated. Not blocking; the report holds it.
