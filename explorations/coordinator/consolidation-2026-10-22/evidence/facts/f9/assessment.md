<!-- Chunk f9 of the FACTS clarity assessment: F-250, F-251, F-254, F-255, F-256 and F-97 to F-104, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `4caa90c81`. -->

# FACTS chunk f9: assessment

The base is `main` at `4caa90c81`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the ledger rows, the tests, the build file, the scripts and the code. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-250 | pass | **fail** | pass | **fail** | **fail** | **fail** | **reorganize** |
| F-251 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-254 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-255 | **fail** | **fail** | pass | **fail** | **fail** | pass | **reorganize** |
| F-256 | **fail** | **fail** | pass | **fail** | pass | pass | **reword** |
| F-97 | pass | pass | pass | pass | pass | pass | keep |
| F-98 | pass | pass | pass | pass | pass | pass | keep |
| F-99 | **fail** | pass | pass | pass | pass | **fail** | **reword** |
| F-100 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-101 | pass | pass | pass | pass | **fail** | pass | **reorganize** |
| F-102 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-103 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-104 | pass | pass | pass | **fail** | pass | pass | **reword** |

Counts, over 13 entries: keep 2, reword 8, reorganize 3, investigate 0. Unresolved marks: none. Each fail below has a known resolution, so no entry needs a question settled before new wording.

Fails by criterion:

- scope 6 (F-254, F-255, F-256, F-99, F-100, F-103);
- present meaning 3 (F-250, F-255, F-256);
- evidence 0;
- comprehension 8 (F-250, F-251, F-254, F-255, F-256, F-102, F-103, F-104);
- ownership 3 (F-250, F-255, F-101);
- consistency 2 (F-250, F-99).

## F-250, the checker's reading of a `where` constraint as a bound

- **Scope: pass.** The title says what rung L built in the checker: a trait constraint `X extends B` bounds `X` inside the declaration (`KindEnv.constraintBounds`, `KindEnv.scala:116`), and a constraint on the declaration's own parameter folds into its arrow (`STypesUtil.makeArrowFromFunctional`). The body keeps row 470's exception (a written static argument at a top-level call) beside it. The library numbers are scoped "on the rung's own tree".
- **Present meaning: fail.** The reader must rebuild the batches to tell what holds now:
  - "Under walk, the change alone, the tree at `2b1cd8e63`, stops every dotted call of the generic `distribute` that writes no static argument, `LibraryOverloadFamilies.fss:37` the one in the suites; from `743eb5286` on, walk infers that call (F-253)." This is repair chronology: on main, walk infers the call (F-253).
  - "`FortressLibrary.fss:130` stayed." It held on rung L's tree only. On main, `:130` is out of both stages (F-254, row 737).
- **Evidence: pass.** `rung-library-distribute/REPORT.md` section 1 gives the code; section 7 gives the distance (49 to 40), the count (39 to 32) and the 9 sites by row (433's 6, 436's 2, 631's 1), with `:130` kept; section 8 gives the walk failure at `LibraryOverloadFamilies.fss:37`; section 5 (`:128`, `:141`) gives the `CastError` for an empty and a filtered `SUM` over a user group. `WhereBoundMethodChecker` and `XXXWhereBoundFunctionCall` exist in `compiler_tests/`. Row 470's notes agree: "a dotted call now checks it; a top-level call does not."
- **Comprehension: fail.**
  - "One of its four holes remains". The four holes are not named in the entry, and "its" has no clear referent. The reader must reconstruct them from the history (rows 748, 749, 750 and 470).
  - "the identities' cast and a typed `embiggen`" and "the change alone" are batch handles. The reader is not told that the first is `cast[\T\](0)` at `additiveIdentity`'s fallback, or that the second is `embiggen`'s new result type.
- **Ownership: fail.** The entry holds four subjects that change apart:
  1. the checker's in-declaration bound and arrow fold;
  2. the library edits and their distance sites, already owned by F-242 (the fusion pairs and `distribute`), F-85 (the identities' cast and `embiggen`) and F-243 (the tally of the `where` sites);
  3. walk's history at two commits, owned by F-253;
  4. the run-time `CastError` of the identities' fallback, which is F-85's and row 436's subject.

  It also restates F-256's subject: "A method's condition on its trait's parameter is checked at a dotted call, a trait's or object's own constraint where its type is used, ... (rows 748, 750 and 749 closed; F-256)".
- **Consistency: fail.** "`FortressLibrary.fss:130` stayed" does not say that it is scoped to rung L's tree, and F-254 says "`Library/FortressLibrary.fss:130` is out of both". The restatement of F-256 also leaves out F-256's limit: "Not read: a constraint whose bound names the method's own static parameters or a `where`-clause variable, at a dotted call or at a type's use". Both fixes are known: scope the sentence or drop it, and point to F-256 without restating it.
- **Disposition: reorganize.** Keep F-250 as the owner of the in-declaration bound and the arrow fold. Keep row 470's hole beside it, and point to F-256 for the checks at a call. Move the walk chronology, the "four holes" and the rung's distance and count to the history and the report. The library edits and the `CastError` sentence belong to F-242 and F-85 (and row 436), which already hold them. Then repoint the incoming pointers: F-85 cites F-250 for "row 631 closed" (`embiggen`), and F-242 cites it for the method condition.

## F-251, a `comprises` clause's type `where`-clause variable opened at a call

- **Scope: pass.** The checker's opening is stated for "an argument whose trait lists `Box[\E\] where [\E\]`", and its limit as a parent (row 752) is kept. Walk's part is stated narrowly, "binds the variable as a symbolic type at load". The distance move is scoped "on the rung's own tree". Note: rows 754 (walk's load check ignores the binding's bound) and 756 (contested: a crash on a member call outside the trait) are open siblings. The entry claims neither behaviour, so they do not make it fail.
- **Present meaning: pass.** It states the current behaviour and gives the distance as one rung's measurement.
- **Evidence: pass.** `rung-anylist-comprises/REPORT.md`, "What changed and why" (`whereSizes`, `openWhereSizes`, `opensTypes`, the parent rule, `processWhereClauses`) and "The distance" (49 to 45, `List.fss:88`, `:89`, `:90`, `:179` gone). The six tests exist. Row 636 agrees. The "bounded by ... the clause's constraints" part is row 771, closed by rung K (F-256).
- **Comprehension: fail.**
  - "refuses Amin and Tate's shape". The referent is a 2016 unsoundness paper. The test's header (`XXXOpenTypeBoundEvidenceChecker.fss:1`) explains it: a value whose trait lists a type under a constraint would be evidence of a subtype relation that does not hold. The entry gives no hint of this.
  - "as a size is". This needs F-146 (the checker opens a listed type's `nat` and `int` sizes), which the entry does not point to.
- **Ownership: pass.** One subject: the opened type and the library clause that it makes live. The bound from the clause's constraints is stated with a pointer to F-256, not restated in full.
- **Consistency: pass.** F-121, F-243, F-244, F-256 and rows 636 and 752 agree.
- **Disposition: reword.** Say what the Amin–Tate test refuses in a few words, and point "as a size is" to F-146.

## F-254, an omitted return type taken from the api

- **Scope: fail.** The title names no path: "A function or method that leaves out its return type takes it from the exported api's declaration of its own parameter types." The body's support is `ApiTypeExtractor` in `scala_src/typechecker/`, which is the compiled checker. Under walk, the type checker phase is off.
- **Present meaning: pass.** It states the current rule, and the hash-order claim is stated as "known".
- **Evidence: pass.** `ApiTypeExtractor.scala:77-126` (`satisfied`, applied to dotted and functional methods and to functions) and `:193-209` (`sameParamTypes`, an untyped parameter matches any, types compared by `ExportChecker.equalTypes`) support it. `rung-checker-four-rows/REPORT.md` section 5 shows `:130` gone from both stages, and says that both profiled runs printed the plain runs' tables. Both tests exist. Row 737 agrees.
- **Comprehension: fail.** "and the JFR-instrumented runs of both stages print the plain runs' tables". The reader is not told why a profiled run's equal table supports the hash-order claim. The reason is that profiling changes allocation, and so the identity hashes, and the tables did not move.
- **Ownership: pass.** One subject. The hash-order consequence is shared with F-232 by pointer.
- **Consistency: pass.** F-232 ("since row 737's repair no choice of `ApiTypeExtractor` depends on their order (F-254)") and F-53's current site list agree.
- **Disposition: reword.** Put "the compiled checker" in the title, and either say what the profiled runs show or leave them to the report.

## F-255, conditional extension in the compiled checker

- **Scope: fail.** Two parts of the title claim more than the evidence shows:
  - "a trait or object that extends a type under a `where` clause of trait constraints only is that type exactly where the constraints hold". This holds for the subtype relation (`withConditionalParents`, `TypeAnalyzer.scala:288-316`, `:959-970`). The report's section 10 lists other readers of the `extends` clause that treat the parent as held at every instance. For example, `excludesClause` (`TypeAnalyzer.scala:1019-1033`, read at `4caa90c81`) inherits a conditional parent's `excludes` at every instance, and `ancestors` and the overloading checker's `above` see no conditional ancestor. Rows 773 and 774 are kept in the body, but these readers are not, and no ledger row holds them.
  - "the rest of the declaration (its static parameters, own `where` clause, `throws` clause, contract, ...) without them". By row 781, the disambiguator drops every trait's and object's `throws` clause and contract, so they are not checked at all. The body says this for the contract only, and in code terms.
- **Present meaning: fail.** "the site `FortressLibrary.fss:2063` goes: distance 35 to 34, count 31 to 30, no site comes". This is rung X's measurement against climb batch 17's gate, but the entry does not say so. The current values are F-53's (5 and 3).
- **Evidence: pass.** The cited code matches at `4caa90c81`: `TypeAnalyzer.scala:290-315` and `:926-969`; `KindEnv.scala:179-203`; `TypeWellFormedChecker.scala:192-212` and `:218-236`; `Decls.scala:139-142`; `TypeDisambiguator.java:112-113` and `:137-138`. `Library/List.fss:106-107` and `:124-128` match. `rung-checker-conditional-extension/REPORT.md` section 6 gives the count (31 to 30) and the distance (35 to 34, `:2063` gone). All ten tests exist. Rows 634, 773, 774 and 781 agree. No commit since `5b11849c6` touches `TypeAnalyzer.scala`, `ExclusionOracle.scala`, `STypesUtil.scala` or `TypeDisambiguator.java`.
- **Comprehension: fail.**
  - "beside rung A's reading of a parent that opens". This is a batch handle. It means F-251's rule that a parent which lists a type at a type `where`-clause variable is not opened on the way up.
  - "which the subtype case of a trait type reads as a formula" and "`KindEnv.withExtendsConditions` adds the conditions to the declaration's own `where` clause in Decls' and TypeWellFormedChecker's trait and object cases". These are code paths, not a finding that the reader can restate.
- **Ownership: fail.** Most of the entry's 2,771 characters walk through code by line number: `parents`, `conditionalParents`, `KindEnv`, `TypeWellFormedChecker`, `Decls` and `TypeDisambiguator`. That detail belongs in the report's section 1. Row 781's subject (the disambiguator drops contracts) is told in code terms inside the entry. The count transition duplicates numbers that F-256 also carries.
- **Consistency: pass.** F-84, F-243, F-244 and F-256 agree with it.
- **Disposition: reorganize.** Keep these:
  - the reading, stated for subtyping;
  - what is checked with the conditions and what without them, with `throws` and contract named as dropped (row 781);
  - the limits: rows 773 and 774, and the readers that ignore the condition (report section 10);
  - `List` under the condition, and the cleared site, as rung X's measurement;
  - the tests.

  Move the line-number walkthrough to the report, and replace "rung A's reading" with a pointer to F-251.

## F-256, the `where` checks at a call and at a type's use

- **Scope: fail.** "A where clause's own type, `nat` and `int` variables are static parameters of the function's arrow, inferred at the call". The rung's skeptic found that both paths refuse a function's or method's type `where`-clause variable at name binding, 'E is undefined.', so the type branch is not reached (`rung-checker-where-checks/SKEPTIC.md`, F5). Row 749's notes add that the arrow binds the variables only when the clause has a trait constraint. The tested form is a `nat` (`WhereVariableBoundCallChecker.fss`).
- **Present meaning: fail.** "These checks move neither the count nor the distance: 31 and 35 on their own, 30 and 34 with conditional extension (F-255)." The numbers come from climb batch 18's rung trees and merged tree, but the entry does not say so. The current values are F-53's.
- **Evidence: pass.** `REPORT.md` section 1 gives rows 748 (with the quoted message), 749 (`Formula.slv`'s one retry), 750 (the constructor refused through the call's type), 753 and 771. Its section 6 gives "DISTANCE SAME 35". `SKEPTIC.md` F1 gives the self-naming bound (`OpenTypeWhereSelfBoundChecker`). The report's header gives the deviations, "Not read: ...". Rows 777 and 778 give walk's behaviour. All eight tests exist.
- **Comprehension: fail.**
  - "a bound that names the variable, as `E extends StandardTotalOrder[\E\]` does, names it opened". The meaning, that the opened type is put in for the variable inside its own bound, has to be rebuilt from SKEPTIC F1.
  - "the solver fixes, once, a size that only the type variables' bounds name". The subject and the consequence are unclear without row 749's notes: a call whose size is fixed only through the type variables' bounds is now solved.
- **Ownership: pass.** One subject: where the checker reads a `where` clause's trait constraints, with its limits and walk's siblings. The `comprises`-variable bound overlaps F-251, but F-251 points here for it. The count sentence goes with the present-meaning fix.
- **Consistency: pass.** F-244, F-250 (by pointer), F-251, F-255 and rows 470, 748 to 750, 777 and 778 agree. F-250's restatement leaves out this entry's limit, and that fail is F-250's.
- **Disposition: reword.** Limit the arrow sentence to `nat` and `int` variables, and say that a function's type `where`-clause variable is refused at binding. Say the two hard phrases plainly. Scope the counts to climb batch 18, or replace them with "moved no site" and a pointer to F-53.

## F-97, the ladder-regression baseline

- **Scope: pass.** It names the baseline folder, what is run (the pass list, compiled and run) and what is only compiled (the eighteen microGPT files).
- **Present meaning: pass.** The gate's step 7 uses this baseline today (`climb-batch-workflow.js:1099-1101`, `ladder_compare explorations/compile-ladder/baseline-2026-09-19`).
- **Evidence: pass.** `baseline-2026-09-19/` holds `pass-list.txt` (85 rows under a header) and `microgpt-phase.md`, with eighteen files at `disambiguate` ("All eighteen files stop in the same phase"). `gate.md`, "The ladder regression", agrees.
- **Comprehension: pass.** "which its `microgpt-phase.md` holds at the phase disambiguate" reads as "records at", which is the meaning. The verb is loose but not misleading.
- **Ownership: pass.** One subject, with the procedure left to the skill.
- **Consistency: pass.** No entry disagrees.
- **Disposition: keep.**

## F-98, the `_WIcontains` key

- **Scope: pass.** The title covers `run_out_WIcontains`. The body adds two facts about the same function, `generalTestFailed`.
- **Present meaning: pass.**
- **Evidence: pass.** `FileTests.java:155-163` collapses whitespace in both strings, and `:181-188` in the output only. Keys are looked up by fixed names, so an unknown key sets no check. `:276-282` holds the default `pass`/`PASS` check.
- **Comprehension: pass.**
- **Ownership: pass.** One subject: how the harness reads an output key.
- **Consistency: pass.** `tests-writing.md:61` agrees.
- **Disposition: keep.**

## F-99, the suites' thread count

- **Scope: fail.** "The gate's thread count is pinned in the build file, not in the calling shell." The body supports only the suites: the pins are in `build.xml`'s `fastTrack` (`:1186-1188`) and `systemShard` (`:1431`). The gate's other runners (the checker count, the distance, the ladder subset, `microgpt-phase.sh`) source `env.sh` and run at one thread (F-203). A smaller point: "with 1 MB stacks, `library_tests/TimingRungT` overflows at four threads" reads as always, but row 640 measured 8 overflows in 12 runs.
- **Present meaning: pass.**
- **Evidence: pass.** The `build.xml` lines above; `FortressExecutable.java:37-45` and `interpreter/Driver.java:524-535` (half the CPUs above two, when unset); `env.sh:6`; row 640; `build-efficiency.md` section 6.1.
- **Comprehension: pass.**
- **Ownership: pass.** One subject. P-125 owns the ruling.
- **Consistency: fail.** The title disagrees with F-203: "`explorations/experiment/env.sh` sets up a shell for the gate's runners ... It sets ... `FORTRESS_THREADS=1`". P-125 itself is titled "The suites run Fortress in parallel, pinned at four threads".
- **Disposition: reword.** Say "the suites'" in the title, and "can overflow" or "overflowed in 8 of 12 runs" for `TimingRungT`.

## F-100, `ant compileAll` and the caches

- **Scope: fail.** "Nothing else clears `bytecode_cache/`." `ant cleanCache` deletes the caches whatever their stamp (`build.xml:357-360`; `build-and-caches.md:112`). `Shell.resetRepository` (`Shell.java:115-122`) deletes every file of the caches folder. `CompilerJUTest` and `LibraryJUTest` call it unless `fortress.junit.reset` is false (it is true by default; `fastTrack` sets it false, `build.xml:1183`). The source note says the narrower thing: no `fortress compile` after a rebuild of the compiler clears it (`build-efficiency.md` section 2).
- **Present meaning: pass.**
- **Evidence: pass.** `build-efficiency.md` section 2 (the two stamps, the early deletion, `global.map` rewritten empty). The `NoClassDefFoundError` example and the library order's time are in `build-and-caches.md:75`, `:131`, not in the cited section. The claim is supported, but the route to it is incomplete.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** No other entry covers the caches. The skill agrees with everything except the sentence above.
- **Disposition: reword.** Replace "Nothing else" with what does and does not clear the jars, and cite the skill's part for the error and the time.

## F-101, `harness-one.sh`'s cache and `env.sh`'s parser folders

- **Scope: pass.** Each half states its condition: the cache is reused while the built implementation and the sources are those that filled it, and a folder is deleted only if it is idle for an hour and older than every running `java`.
- **Present meaning: pass.**
- **Evidence: pass.** `harness-one.sh:7-13`, `:15-25`; `env.sh:9-21`; `build-efficiency.md` sections 1 and 4.
- **Comprehension: pass.**
- **Ownership: fail.** "`harness-one.sh` keeps its Fortress cache between calls, and sourcing `env.sh` does not delete a live run's parser folder." These are two claims about two scripts. They answer different questions (will my run start warm? can sourcing `env.sh` break another agent's run?), and they change apart. F-203 owns `env.sh` and already points here for its deletion rule.
- **Consistency: pass.** F-203 agrees.
- **Disposition: reorganize.** Move the `env.sh` rule into F-203, and keep F-101 for `harness-one.sh`'s cache. Then repoint F-203's "(F-101)".

## F-102, an `XXX` file under walk

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: pass.** `FileTests.java:780-782` (`shouldFail` from `s.startsWith("XXX")`) and `:394-412` ("Expected failure or exception, saw none" fails the suite). `tests-writing.md`, "How `XXX` works", agrees.
- **Comprehension: fail.** "Its apis come from `ProjectFortress/test_library/`, so it needs no `.test` file unless it names a refusal at load (F-29)." The "so" joins two independent facts: where an `XXX` test's imported api pairs come from (so no new api folder is needed), and that a `tests/` program needs a `.test` file only to name a refusal at load. "Its apis" also implies that every such test has apis.
- **Ownership: pass.**
- **Consistency: pass.** F-29 and F-103 agree.
- **Disposition: reword.** Split the sentence into its two facts.

## F-103, `XXX` in the compiled corpora

- **Scope: fail.** "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only". The body then says how it expresses a run-time defect: an `XXX` `.test` file that drives `run` alone. The finding is narrower: one `.test` file cannot express "compiles, then fails at run time", because its prefix makes every command it drives a must-fail.
- **Present meaning: pass.**
- **Evidence: pass.** `tests-writing.md`, "How `XXX` works" (the second and fifth points), and `FileTests.java:394-412` ("Saw wrong failure" when a key is unmet).
- **Comprehension: fail.** The title's "only" and its "a run-time defect needs two `.test` files" contradict each other unless the reader already knows the mechanism.
- **Ownership: pass.**
- **Consistency: pass.** F-102, F-104 and the skill agree.
- **Disposition: reword.** State the limit as one file's limit.

## F-104, a thrown `CompilerError` in the harness

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: pass.** `climb-batch-2/REPAIR-review.md` section 2: `Shell.compileWithErrorHandling` catches only `StaticError` and `ProgramError`; the `catch (Throwable ex)` keys on `f.contains("XXX")`, where `f` holds the `tests=` name; the stream is `"exception"`, so the key is `compile_exception_contains`. `FileTests.java:342-366` matches at `4caa90c81`. `XXXTryAtomicCodegenRungB.test` is row 353's gated home.
- **Comprehension: fail.**
  - "takes a third path through the test harness". "Third" is not explained. In the review, it is the third check stream, beside the output and the error streams.
  - "pins the wall, so the test turns red when the wall falls or moves". "Wall" is the project's word for the code generator's refusal of a construct (`sayWhat`). The entry does not define it.
  - "is green whatever the `.test` file is called" can read as unconditional. The skill's wording is "Only an unmet key of that command makes it red".
- **Ownership: pass.**
- **Consistency: pass.** F-103 and `tests-writing.md` agree.
- **Disposition: reword.** Name the exception stream, say "refusal" for "wall", and keep the key condition beside "green".
