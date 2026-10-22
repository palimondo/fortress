<!-- The FACTS clarity pass, chunk f9, 2026-10-22: F-250, F-251, F-254, F-255, F-256 and F-99 to F-104 rewritten from the chunk's assessment, plus F-203 to take F-101's env.sh rule, with each entry's changes of meaning, the source of each sentence, and the points for the coordinator. -->

# FACTS chunk f9: the rewrite

The base is `main` at `4caa90c81`, as in `assessment.md`. The assessment keeps F-97 and F-98, so this file holds the other eleven: eight "reword" and three "reorganize" (F-250, F-255, F-101). I read each corrected claim again in the code, the ledger or the cited report. Concepts that the entries use and that every worker needs are in `concepts.md`.

## Points for the coordinator

- **F-203 is in two chunks.** Chunk f10 rewrote F-203. F-101's reorganization moves the rule for `env.sh`'s deletion of parser folders into F-203. So this chunk's `proposals.apply` carries an F-203 line: f10's text, with the rule in place of "(F-101 holds the removal's rule)". Apply this one after f10's, or in its place.
- **Incoming pointers to F-250.** F-85 cites F-250 for "row 631 closed" (the typed `embiggen`), and F-242 cites it for the method condition. The new F-250 no longer holds the library edits; it names F-242 and F-85 for them. F-242's pointer still fits: the method condition rests on F-250's bound. F-85's pointer for row 631 should go to the report instead (`rung-library-distribute/REPORT.md` section 7), or be dropped.
- **Title quotes outside the record.** The `fortress-repo` skill's `sources.md` quotes three titles: "The gate's thread count is pinned in the build file" (lines 113 and 182), "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test" and "The `XXX` expected-failure mechanism in `compiler_tests/` and `li...`" (line 154). Their openings are kept. F-104's opening "A thrown `CompilerError` takes a third path through the test harness" is kept too. F-254's and F-255's titles change; only historical batch records quote them.
- **A test header that may be stale.** `compiler_tests/XXXOpenTypeBoundEvidenceChecker.fss:1` says that "the opened B has only its binding's bound, so the call is refused". Since gap-ledger row 771 was built, the opened type is also bounded by the clause's constraints (F-256). The entry no longer says why the test is refused; I did not check whether the comment is still true.

## F-250

> - F-250 **Inside a declaration, the compiled checker reads a `where` clause's trait constraint `X extends B` as a bound of `X`, and it folds a constraint on the declaration's own static parameter into its arrow, so a call is checked against it.** So a method's condition on its trait's or object's static parameter bounds that parameter in the method's body, and a call that breaks a function's own constraint is refused. One hole remains: a static argument written at a top-level call is not checked against a folded bound, so `g[\String\]("s")` is accepted where `g("s")` is refused (gap-ledger row 470). F-256 holds where the checker reads the constraints at a dotted call, at a type's use and at a `comprises` clause. The library edits that landed with this reading are F-242's (the generic `distribute` and the method conditions of `SUM`'s fusion pairs) and F-85's (the identities' `cast` and the typed `embiggen`). Tests: `compiler_tests/WhereBoundMethodChecker`, `XXXWhereBoundFunctionCall`. Detail: `compile-ladder/rung-library-distribute/REPORT.md` section 1.

Meaning: reorganized as the assessment proposes; no claim is changed. The entry keeps the in-declaration bound, the arrow fold and row 470's hole. These parts left it:
- the rung's distance and count (40 and 32), and the 9 sites by row: a measurement of one rung, in the report's section 7;
- "`FortressLibrary.fss:130` stayed": true only on the rung's tree; F-254 holds that `:130` is now out of both stages;
- the walk sentence at `2b1cd8e63` and `743eb5286`: repair chronology; F-253 holds walk's current behaviour;
- "One of its four holes remains" and the restatement of F-256: replaced by one pointer to F-256, which keeps F-256's own limits;
- the identities' `CastError` for an empty or filtered `SUM` over a user group: F-85's and row 436's subject.

Sources:
- Title and second sentence: `rung-library-distribute/REPORT.md` section 1 (`KindEnv.constraintBounds`, `STypesUtil.makeArrowFromFunctional`); the two tests exist in `compiler_tests/`.
- Row 470: its notes ("a dotted call now checks it; a top-level call does not").
- The library edits: F-242 and F-85, as they stand.

## F-251

> - F-251 **A type `where`-clause variable of a `comprises` clause is opened at a call, as a size is, and `AnyList`'s clause is live.** To open a variable is to give it a fresh type of its own for the call, as the compiled checker already does for a listed type's `nat` and `int` sizes (F-146). So the checker gives an argument whose trait lists `Box[\E\] where [\E\]` a fresh type for the call, bounded by the binding and by the clause's constraints on it (F-256). It refuses that type where another type is declared, and it gives two values two types. It also refuses the shape of Amin and Tate's 2016 unsoundness example, where such a value would prove a subtype relation that does not hold. It does not open such a trait where it reaches it as a parent (gap-ledger row 752). Walk binds the variable as a symbolic type at load. On the rung's own tree, `AnyList`'s `addLeft`, `addRight` and the comprehension's unwrap, respelled, took the distance from 49 to 45 (gap-ledger row 636's four sites); the count, and walk's element types, did not change. Tests: `OpenTypeChecker`, `XXXOpenTypeEscapeChecker`, `XXXOpenTypeTwoChecker`, `XXXOpenTypeBoundEvidenceChecker`, `OpenTypeWalk`, `AnyListElementTypeWalk`. Detail: `compile-ladder/rung-anylist-comprises/REPORT.md`.

Meaning: unchanged. "As a size is" now points to F-146, and says what opening is. "Amin and Tate's shape" is said in a few words, from the test's header.

Sources:
- Opening: the report, "What changed and why" (`whereSizes`, `openWhereSizes`, `opensTypes`); F-146.
- The bound from the clause's constraints: row 771, built later (F-256).
- Amin and Tate: `XXXOpenTypeBoundEvidenceChecker.fss:1`.
- Row 752; "Walk binds ...": the report.
- The distance: the report, "The distance" (`List.fss:88`, `:89`, `:90`, `:179` gone); row 636.

## F-254

> - F-254 **In the compiled checker, a function or method that leaves out its return type takes it from the exported api's declaration that has its own parameter types.** `ApiTypeExtractor` compares the parameter types as the export check does (`ExportChecker.equalTypes`), and a parameter that the function leaves untyped matches any type. It takes the return type only if exactly one api declaration of the name matches. With none or several, it takes none, and the declaration keeps its elisions. So the choice does not depend on the JVM's identity-hash order of the declarations, and no output of the count or distance stage is known to move with that order (F-232): `Library/FortressLibrary.fss:130` is out of both. Evidence: read in `scala_src/typechecker/ApiTypeExtractor.scala:77-126` and `:193-209`. Tests: `OmittedReturnTypeFromApi`, `OmittedMethodReturnTypeFromApi`. Detail: `compile-ladder/rung-checker-four-rows/REPORT.md`, sections 1 and 5.

Meaning: unchanged. The title names the compiled checker, which the body's evidence covers; walk runs no type checker phase. The clause on the JFR-instrumented runs is left to the report: section 5 says "Both profiled runs printed the plain runs' tables", but why that supports the hash-order claim (a profiler changes allocation, and so the identity hashes) needs more words than it earns in the entry. The sentence "So the choice does not depend on ... order" spells out why the stages no longer move with it; the report's section 1 says that the old code took the first declaration in identity-hash order.

Sources: `ApiTypeExtractor.scala:77-126`, `:193-209`; the report's sections 1 and 5; F-232; row 737.

## F-255

> - F-255 **The compiled checker reads conditional extension in its subtype relation: a trait or object that extends a type under a `where` clause of trait constraints only is a subtype of that type exactly where the constraints hold.** The `extends` entry itself, the value parameters and the members are checked with the constraints holding. The static parameters, the declaration's own `where` clause, its `excludes` and `comprises` clauses and its other `extends` entries are checked without them. The disambiguator drops every trait's and object's `throws` clause and contract, so these are not checked at all (gap-ledger row 781). A clause that binds a variable, or that holds a constraint that is not a trait constraint, is read as before. Limits: a member checked under the condition stays callable where the condition fails (row 773), and walk and the compiled run time read the extension at every instance (row 774). Other readers of the `extends` clause in the checker also read the parent at every instance, for example the inherited `excludes` clauses and the ancestors that the overloading checker sees; no ledger row holds them (report section 10). In the library, `List` extends `LexicographicOrder[\List[\E\],E\]` only where `E extends StandardTotalOrder[\E\]`. On the rung's own tree, against climb batch 17's gate, this cleared the site `FortressLibrary.fss:2063` and added none. Tests: `compiler_tests/CondExtendChecker`, `XXXCondExtendRefuseChecker`, `XXXCondExtendUnconditionalEntryChecker`, `XXXCondExtendExcludesChecker`, `XXXCondExtendComprisesChecker`, `XXXCondExtendParamBoundChecker`, `XXXCondExtendExcludesWhereChecker`, `CondExtendInheritedMember` (a type that inherits through a conditional parent compiles: the code generator's analyzer reads the parent at every instance), `tests/XXXConditionalExtensionTypeTestWalk`. Detail: `compile-ladder/rung-checker-conditional-extension/REPORT.md`, sections 1, 6 and 10.

Meaning: two corrections of scope, from the assessment.
- The title's "is that type exactly where the constraints hold" is now said of the subtype relation. Report section 10 lists the readers that see the parent at every instance; the entry now names two of them as a limit.
- `throws` and contract left the list of parts "checked without them": by row 781 they are not checked at all.

These parts left the entry, to the report's section 1: the walk through `parents`, `conditionalParents`, `KindEnv.withExtendsConditions`, `TypeWellFormedChecker`, `Decls` and `TypeDisambiguator` by line number; "rung A's reading of a parent that opens" (F-251's rule); the count's move, 31 to 30, which F-256 no longer carries either. The distance's move is said as one tree's measurement. `CondExtendInheritedMember`'s note loses "which binds no declaration's static parameters", the code-level reason.

Sources:
- Subtyping: report section 1 (`TypeAnalyzer.scala:290-315`, `:926-969`).
- Parts checked with and without: section 1 and `TypeWellFormedChecker.scala:192-212`, `:218-236`, as the history's text of 2026-10-18 04:56Z gives them.
- Row 781: its text ("neither path checks or evaluates them").
- Section 10: `excludesClause`, `ExclusionOracle.transitivelyExcludes`, `ancestors`, the overloading checker's `above`; "None of these moved a result on the library".
- `List`: `Library/List.fss:106-107`.
- The site: section 6 ("gone: `FortressLibrary.fss:2063` ... came: none"), against `climb-batch-17/gate/`.

## F-256

> - F-256 **The compiled checker checks a `where` clause's trait constraints where they apply.** At a dotted call, a candidate whose `where` clause constrains its trait's or object's static parameter is not applicable where the receiver's static argument breaks the constraint ('Method Holder[\String\].showIt is not applicable: its where clause requires String to extend Shows.'). If a function's or method's `where` clause has a trait constraint, the clause's `nat` and `int` variables become static parameters of the function's arrow, inferred at the call. So a constraint whose bound names such a variable is met where some value of it meets every constraint. When the type variables' solutions leave only size constraints, the solver tries once more to solve them. Both paths refuse a function's or method's type `where`-clause variable at name binding ('E is undefined.'), so this inference never reaches one. A trait's or object's own constraint is checked where its type is used, with the bound's message, also at a constructor call through the call's type. A type `where`-clause variable of a `comprises` clause is bounded by its binding and by the clause's constraints on it, where it is opened and in the check of an extender. In a bound that names the variable itself, as `E extends StandardTotalOrder[\E\]` does, the opened type stands for the variable. Not read: a constraint whose bound names the method's own static parameters or a `where`-clause variable, at a dotted call or at a type's use; a static argument written at a top-level call (gap-ledger row 470). Walk still runs a dotted call that breaks a method's condition (row 777), and reads a `comprises` clause's `where`-clause variable for the same name in another declaration's bound (row 778). These checks moved no site of the count or the distance (F-53 holds the current values). Tests: `XXXWhereBoundDottedCallChecker`, `WhereVariableBoundCallChecker`, `XXXWhereConstraintTypeUseChecker`, `XXXWhereConstraintExtendsChecker`, `XXXComprisesWhereBoundExtenderChecker`, `OpenTypeWhereConstraintChecker`, `XXXComprisesWhereConstraintExtenderChecker`, `OpenTypeWhereSelfBoundChecker`. Detail: `explorations/compile-ladder/rung-checker-where-checks/REPORT.md`, sections 1 and 6, and `SKEPTIC.md` beside it.

Meaning: one correction of scope, from the assessment. The old text said that a `where` clause's own type variables are inferred at the call. The skeptic found that both paths refuse a function's or method's type `where`-clause variable at name binding, so that branch is not reached; and the arrow binds the variables only when the clause has a trait constraint (the report's header). The entry now says both. The counts 31/35 and 30/34 were the rung trees' and the merged tree's values; the entry now says that the checks moved no site, and points to F-53 for the current values.

Sources:
- Dotted call: report section 1, row 748, with the quoted message.
- Arrow and solver: section 1, row 749; the header's deviations ("the arrow binds ... only when the clause has a trait constraint"; "the solver fixes, once, the sizes that the solved type variables' bounds leave"); `Formula.scala:649-656`.
- 'E is undefined.': `SKEPTIC.md`, F5.
- Type use and constructor: section 1, row 750.
- `comprises` variable: section 1, rows 753 and 771; the self-naming bound: `SKEPTIC.md`, F1 (substitute the opened variables into the bounds).
- Not read: the header's deviation; row 470.
- Walk: rows 777 and 778.
- No site moved: section 6 ("DISTANCE SAME 35"), and the count unchanged.

## F-99

> - F-99 **The gate's thread count is pinned in the build file for the two suites, not in the calling shell.** `build.xml`'s `fastTrack` macro, which runs `testFast`, and its `systemShard` macro, which runs `testSystem`, set `FORTRESS_THREADS=4` (P-125). Without the pin, the tests would take the caller's count: half the CPUs if it is unset, or 1 under `env.sh`. The gate's other runners, which `env.sh` sets up, run at one thread (F-203). `fastTrack` also pins `JAVA_FLAGS` to `-Xmx4g -Xss64m`, because a compiled test's run step takes its heap and stacks from it. With the JVM's default 1 MB stacks at four threads, `library_tests/TimingRungT` overflowed a thread's stack in 8 of 12 runs (gap-ledger row 640). Detail: `coordinator/process-engineering/build-efficiency.md` section 6.

Meaning: two corrections of scope, from the assessment. The pin is the suites', not the whole gate's; the title says so, keeping its quoted opening. `TimingRungT` overflowed in 8 of 12 runs, as row 640 measured, not at every run.

Sources: `build.xml:1186-1188` and `:1431`; `FortressExecutable.java:37-45`; `env.sh:6`; F-203; row 640; `build-efficiency.md` section 6.

## F-100

> - F-100 **`ant compileAll` deletes the caches folder, the linker's untracked `global.map` with it, when the implementation changed, and keeps it otherwise.** It compares the folder's `implementation.stamp` with the new build's. After a deletion, `fortress run` dies with `NoClassDefFoundError: fortress/CompilerLibrary$GeneratorZZ32` until the library order refills the five library jars, in about two minutes (the `fortress-repo` skill's `build-and-caches.md`). Two other things clear the caches: `ant cleanCache`, whatever the stamp, and `Shell.resetRepository`, which `CompilerJUTest` and `LibraryJUTest` call unless `fortress.junit.reset` is false, as `testFast` sets it. A `fortress compile` after a rebuild of the compiler does not clear them. The linker writes a missing `global.map` again, empty. Detail: `coordinator/process-engineering/build-efficiency.md` section 2.

Meaning: one correction, from the assessment. "Nothing else clears `bytecode_cache/`" was too broad; `ant cleanCache` and `Shell.resetRepository` also clear the caches. The source's narrower claim stays: a `fortress compile` after a rebuild of the compiler does not clear them. The error and the time now cite the skill's part, which holds them.

Sources: `build.xml:357-360` (`cleanCache`); `Shell.java:115-122`; `CompilerJUTest.java:32-33`, `LibraryJUTest.java:32-33`; `build.xml:1183` (`fortress.junit.reset` false in `fastTrack`); `build-efficiency.md` section 2 (line 54: "The only code that deletes cache files is `Shell.resetRepository`"); `build-and-caches.md`, "The library order" and "Symptoms of a skipped step". `NightlyCompilerJUTest` also calls `resetRepository`, with no switch. The entry names only the two callers that the source names; the clearing itself is `resetRepository`'s, whoever calls it.

## F-101

> - F-101 **`harness-one.sh` keeps its Fortress cache between calls.** The script is `compile-ladder/rung-inference-walk/harness-one.sh`, and its cache is the folder `<scratch-dir>.cache`. It reuses the cache while the built implementation and the Fortress sources on the source path are those that filled it. `COLD_CACHE=1` empties it first. Detail: `coordinator/process-engineering/build-efficiency.md` sections 1 and 4.

Meaning: unchanged. Reorganized as the assessment proposes: the rule for `env.sh`'s deletion of parser folders moved to F-203, which owns `env.sh`. The script's path comes back from the history's text of 2026-10-13 19:03Z.

Sources: `harness-one.sh:7-13`; `build-efficiency.md` sections 1 and 4.

## F-102

> - F-102 **An `XXX*.fss` in the interpreter corpus is a gated expected-failure test.** `SystemJUTest` marks a file of `ProjectFortress/tests/` whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Such a test needs a `.test` file only to name a refusal at load, as any program of `tests/` does (F-29: walk's load check and its `load_exception_contains` key). An `XXX` test that imports api pairs takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora's rule differs (F-103). Source: `FileTests.java:780-782` and `:394-412`; the `fortress-repo` skill's `tests-writing.md`, "How `XXX` works".

Meaning: unchanged. The sentence "Its apis come from `test_library/`, so it needs no `.test` file unless ..." is split into its two facts, as the history's text of 2026-10-13 19:03Z had them.

Sources: `FileTests.java:780-782`, `:394-412`; the history's text (`XXXImportImportCollision.fss` as the example of api pairs); F-29.

## F-103

> - F-103 **The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express, in one `.test` file, a program that compiles and then fails at run time.** The `XXX` prefix of a `.test` file's name makes every command that the file drives a must-fail. So such a defect needs two `.test` files over one component: a plain-named file that drives `link`, and an `XXX` file that drives `run` (the `fortress-repo` skill's `tests-writing.md`, "Writing an `XXX` test"). A compile-stage failure needs one `XXX` compile test. If that test's program compiles, the test is red: "Saw wrong failure", with a `compile_err_contains` key. Detail: `compile-ladder/rung-tryatomic/REPORT.md`, "The measured defect, and its home".

Meaning: unchanged. The limit is stated as one file's limit, as the assessment proposes; the old title's "compile-stage failure only" contradicted its own two-file form. The title keeps its quoted opening.

Sources: `tests-writing.md`, "How `XXX` works", second and fifth points; `FileTests.java:394-412`; the report's section named.

## F-104

> - F-104 **A thrown `CompilerError` takes a third path through the test harness, the exception stream, keyed on the component that `tests=` names, with check keys `compile_exception_*`.** The harness checks three streams of a command: its output, its error output and a thrown exception. `Shell` does not catch a `CompilerError` from the code generator, such as its `sayWhat` refusal of a construct that it cannot compile. So the harness reads it as an exception of the component that the `.test` file's `tests=` line names. If that component's name holds `XXX`, a link or compile exception is green whatever the `.test` file is called; only an unmet key of that command makes it red. A `compile_exception_contains` key pins the refusal's text, so the test turns red when the refusal goes away or changes. Detail: `compile-ladder/climb-batch-2/REPAIR-review.md` section 2.

Meaning: unchanged. "Third" is said as the third check stream. "Wall" is replaced by "refusal", with `sayWhat` named. The key condition stands beside "green", in the skill's words.

Sources: `REPAIR-review.md` section 2 (`Shell.compileWithErrorHandling` catches only `StaticError` and `ProgramError`; the stream `"exception"`, `FileTests.java:136`); `FileTests.java:342-366`; `tests-writing.md`, "How `XXX` works", fourth point.

## F-203 (from chunk f10, with F-101's rule)

> - F-203 **`explorations/experiment/env.sh` sets up a shell for the gate's runners, and takes `FORTRESS_HOME` from its own place in the tree.** It sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`, and unsets `JAVA_TOOL_OPTIONS`. It deletes a `/tmp/fortress*rats` parser folder only if nothing in it was written for an hour and every running `java` process started after its last write, so sourcing it does not break a live run. The ladder regression's scripts source it: `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh`. `experiment/setup.sh` sources it too. The count stage's and the distance stage's `run.sh` do not: their headers tell the caller to source it first. A worker sets up each call by the `fortress-repo` skill's lines instead (`build-and-caches.md`, "Setting up each call"). Evidence: read in the scripts; the deletion rule also in `coordinator/process-engineering/build-efficiency.md` section 4.

Meaning: as in chunk f10's proposal, plus F-101's rule, unchanged in meaning. Source of the rule: `env.sh:9-21` (its comment: "nothing in it written for an hour, and no java process now running started before its last write"); `build-efficiency.md` section 4.
