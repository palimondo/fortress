<!-- The FACTS clarity pass, chunk f9, 2026-10-22, after its fix round: F-250, F-251, F-254, F-255, F-256 and F-99 to F-104 rewritten from the chunk's assessment, plus F-203 to take F-101's env.sh rule, then fixed from the cold read and the check, with each entry's changes of meaning, the source of each sentence, and the points for the coordinator. -->

# FACTS chunk f9: the rewrite

The base is `main` at `4caa90c81`, as in `assessment.md`; the check read at `772a5a2af`. The assessment keeps F-97 and F-98, so this file holds the other eleven: eight "reword" and three "reorganize" (F-250, F-255, F-101), and an F-203 line. I read each corrected claim again in the code, the ledger or the cited report. Concepts that the entries use and that every worker needs are in `concepts.md`. The detail paths now start at `explorations/`, as the cold reader asked.

The fix round followed `check.md` and `cold-read.md`:
- F-250: the fold said as the source says it (into the parameter's bound in the declaration's arrow); "one hole" without the count that made it read as the only gap; each test beside its claim; the library edits named, not by batch handles.
- F-251: the cause of the four sites corrected (one by the opened type, three by the respelling); "bounded by the binding" and "live" said plainly; test folders given.
- F-254: the title's match said plainly; "keeps its elisions" said as "left as written"; `:130` said as an error gone from both stages.
- F-255: the readers that ignore the condition split as the report splits them (the overloading checker's ancestors see the parent at no instance, not at every instance); `ZeroIndexed[\E\]` and the element-wise `=` outside the condition restored; "every member"; "read as before" said.
- F-256: the "Not read" list split by place and subject; "both paths" named; the arrow is the function's or method's; row 778 said as a capture.
- F-99: the added sentence on "the gate's other runners" removed (the atomic runs set four threads); how the run step had 1 MB stacks said (`bin/run`).
- F-100: the two caches folders named; `resetRepository`'s folder said.
- F-102, F-103, F-104: optional wordings taken; F-104 uses the skill's word "wall".
- F-203: rebuilt from chunk f10's fixed line, with F-101's rule in place of its pointer.

## Points for the coordinator

- **F-203 is in two chunks.** This chunk's F-203 line is chunk f10's fixed line, with F-101's rule for deleting parser folders in place of "(F-101 holds the removal's rule)". Apply this one in place of f10's, or after it.
- **Incoming pointers to F-250.** F-85 cites F-250 for "row 631 closed" (the typed `embiggen`), and F-242 cites it for the method condition. The new F-250 no longer holds the library edits; it names F-242 and F-85 for them. F-242's pointer still fits: the method condition rests on F-250's bound. F-85's pointer for row 631 should go to the report instead (`rung-library-distribute/REPORT.md` section 7), or be dropped.
- **Title quotes outside the record.** The `fortress-repo` skill's `sources.md` quotes "The gate's thread count is pinned in the build file" (lines 113 and 182), "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test" and "The `XXX` expected-failure mechanism in `compiler_tests/` and `li...`" (line 154). Their openings are kept, and so is F-104's. F-254's and F-255's titles change; only historical batch records quote them.
- **A test header that may be stale.** `compiler_tests/XXXOpenTypeBoundEvidenceChecker.fss:1` says that "the opened B has only its binding's bound, so the call is refused". Since row 771, the opened type is also bounded by the clause's constraints (F-256). The test is still a gated expected failure, so the entry's "refuses" holds; the comment's reason may not.

## F-250

> - F-250 **Inside a declaration, the compiled checker reads a `where` clause's trait constraint `X extends B` as a bound of `X`, and it adds a constraint on the declaration's own static parameter to that parameter's bound in the declaration's arrow (its function type), so a call is checked against it.** So a method's condition on its trait's or object's static parameter bounds that parameter in the method's body (`compiler_tests/WhereBoundMethodChecker`), and a call that breaks a function's own constraint is refused (`compiler_tests/XXXWhereBoundFunctionCall`, which refuses `g("s")`). A hole remains: a static argument written at a top-level call is not checked against that bound, so `g[\String\]("s")` is accepted (gap-ledger row 470). F-256 holds where the checker reads the constraints at a dotted call, at a type's use and at a `comprises` clause, with its other limits. The library edits that landed with this reading are F-242's (the generic `distribute`, and the `where` conditions on `SumReduction`'s `distribute` overloads for `MAX` and `MIN`) and F-85's (`additiveIdentity`'s and `multiplicativeIdentity`'s fallbacks written `cast[\T\](0)` and `cast[\T\](1)`, and `embiggen` typed `BigReduction[\T,T\]`). Detail: `explorations/compile-ladder/rung-library-distribute/REPORT.md` section 1.

Meaning: reorganized as the assessment proposes; no claim is changed. The entry keeps the in-declaration bound, the arrow fold and row 470's hole. These parts left it:
- the rung's distance and count (40 and 32), and the 9 sites by row: a measurement of one rung, in the report's section 7;
- "`FortressLibrary.fss:130` stayed": true only on the rung's tree; F-254 holds that `:130` is now gone from both stages;
- the walk sentence at `2b1cd8e63` and `743eb5286`: repair chronology; F-253 holds walk's current behaviour;
- "One of its four holes remains" and the restatement of F-256: replaced by one pointer to F-256, which keeps F-256's own limits;
- the identities' `CastError` for an empty or filtered `SUM` over a user group: F-85's and row 436's subject.

Sources:
- Title and second sentence: `rung-library-distribute/REPORT.md` section 1 (`KindEnv.constraintBounds`; `STypesUtil.makeArrowFromFunctional`: "folded into that parameter's bound in the declaration's arrow"); the two tests, in `compiler_tests/`.
- Row 470: its notes ("a dotted call now checks it; a top-level call does not").
- The library edits: section 1, "The library" (`SumReduction`'s overloads, the identities' `cast`, `embiggen`); F-242 and F-85.

## F-251

> - F-251 **A type `where`-clause variable of a `comprises` clause is opened at a call, as a size is, and `AnyList`'s clause, `comprises { List[\E\] } where [\E\]`, once a comment, is in the library.** To open a variable is to give it a fresh type of its own for the call, as the compiled checker already does for a listed type's `nat` and `int` sizes (F-146). So the checker gives an argument whose trait lists `Box[\E\] where [\E\]` a fresh type for the call, bounded by the bound of the clause's binding, `[\E extends B\]`, and by the clause's constraints on it (F-256). It refuses that type in a place whose declared type is another type, and it gives two values two types. It also refuses the shape of Amin and Tate's 2016 unsoundness example, where such a value would prove a subtype relation that does not hold. It does not open such a trait where it reaches it as a parent (gap-ledger row 752). Walk binds the variable as a symbolic type at load. On the rung's own tree the distance went from 49 to 45, row 636's four sites: `AnyList`'s `||` is now accepted through the opened type, and its `addLeft`, `addRight` and the list comprehension's unwrap were respelled. The count, and walk's element types, did not change. Tests: `compiler_tests/OpenTypeChecker`, `XXXOpenTypeEscapeChecker`, `XXXOpenTypeTwoChecker` and `XXXOpenTypeBoundEvidenceChecker`; `tests/OpenTypeWalk` and `AnyListElementTypeWalk`. Detail: `explorations/compile-ladder/rung-anylist-comprises/REPORT.md`.

Meaning: unchanged. The first round's "took the distance" gave the respelling as the cause of all four sites; the fix round gives each site its cause, from the report: `List.fss:88` (`AnyList`'s `||`, `app`) went through the opened type, and `:89`, `:90` and `:179` with the respelling. The title says what "live" meant: the clause was a comment, "Not yet: comprises List[\E\] where [\E\]" (`List.fsi:56` at the base), and is now in the library.

Sources:
- Opening: the report, "What changed and why" (`whereSizes`, `openWhereSizes`, `opensTypes`; "bounded by its binding's bounds at the trait's static arguments"); F-146.
- The bound from the clause's constraints: row 771 (F-256).
- Amin and Tate: `XXXOpenTypeBoundEvidenceChecker.fss:1`.
- Row 752; "Walk binds ...": the report (`BuildEnvironments.processWhereClauses`).
- The distance: the report, "What changed and why" and "The distance"; row 636.
- Test folders: `git ls-files`.

## F-254

> - F-254 **In the compiled checker, a function or method that leaves out its return type takes it from the one declaration of the exported api whose parameter types are the function's own.** `ApiTypeExtractor` compares the parameter types as the export check does (`ExportChecker.equalTypes`), and a parameter that the function leaves untyped matches any type. It takes the return type only if exactly one api declaration of the name matches. With none or several, it takes none, and the declaration is left as written. So the choice does not depend on the JVM's identity-hash order of the declarations, and no output of the count or distance stage is known to move with that order (F-232): the error at `Library/FortressLibrary.fss:130` (`BIG LEXICO`'s omitted return type), which came and went with that order, is gone from both stages. Evidence: read in `scala_src/typechecker/ApiTypeExtractor.scala:77-126` and `:193-209`. Tests: `compiler_tests/OmittedReturnTypeFromApi`, `OmittedMethodReturnTypeFromApi`. Detail: `explorations/compile-ladder/rung-checker-four-rows/REPORT.md`, sections 1 and 5.

Meaning: unchanged. The title names the compiled checker, which the body's evidence covers. The clause on the JFR-instrumented runs is left to the report: section 5 says "Both profiled runs printed the plain runs' tables". The fix round said `:130` as the source means it (section 1: `BIG LEXICO(g)` now takes `TotalComparison` from `FortressLibrary.fsi:98`), and "left as written" for the code's `case _ => f`; what the checker does next is not in the sources.

Sources: `ApiTypeExtractor.scala:77-126`, `:193-209`; the report's sections 1 and 5; F-232; row 737.

## F-255

> - F-255 **The compiled checker reads conditional extension in its subtype relation: a trait or object that extends a type under a `where` clause that binds no variable and holds trait constraints only is a subtype of that type exactly where the constraints hold.** The `extends` entry itself, an object's value parameters and every member are checked with the constraints holding. The static parameters, the declaration's own `where` clause, its `excludes` and `comprises` clauses and its other `extends` entries are checked without them. The disambiguator drops every trait's and object's `throws` clause and contract, so these are not checked at all (gap-ledger row 781). A clause that binds a variable, or that holds a constraint that is not a trait constraint, is read as before: as a parent at every instance. Limits: a member checked under the condition stays callable where the condition fails (row 773), and walk and the compiled run time read the extension at every instance (row 774). Other readers of the `extends` clause in the checker ignore the condition. Those that go through the type's parents see a conditional parent at no instance: the ancestors (`TypeAnalyzer.ancestors`), which the overloading checker reads to let a concrete method implement an abstract one. Those that read the clause itself see it at every instance: the inherited `excludes` clauses (`TypeAnalyzer.excludesClause`). None of these readers moved a result on the library, and no ledger row holds them (report section 10). In the library, `List` extends `LexicographicOrder[\List[\E\],E\]` only where `E extends StandardTotalOrder[\E\]`; its `ZeroIndexed[\E\]` entry and its own element-wise `opr =` stand outside the condition, so every list keeps them (`Library/List.fss:106-107`, `:124-128`). On the rung's own tree, against climb batch 17's gate, this cleared the site `FortressLibrary.fss:2063` and added none. Tests: `compiler_tests/CondExtendChecker`, `XXXCondExtendRefuseChecker`, `XXXCondExtendUnconditionalEntryChecker`, `XXXCondExtendExcludesChecker`, `XXXCondExtendComprisesChecker`, `XXXCondExtendParamBoundChecker`, `XXXCondExtendExcludesWhereChecker`, `CondExtendInheritedMember` (a type that inherits through a conditional parent compiles: the code generator's analyzer reads the parent at every instance), `tests/XXXConditionalExtensionTypeTestWalk`. Detail: `explorations/compile-ladder/rung-checker-conditional-extension/REPORT.md`, sections 1, 6 and 10.

Meaning: two corrections of scope, from the assessment, and one from the check.
- The title's "is that type exactly where the constraints hold" is now said of the subtype relation, and the other readers of the `extends` clause are a limit.
- `throws` and contract left the list of parts "checked without them": by row 781 they are not checked at all.
- The fix round corrected the first round's readers: report section 10 splits them. Readers through `parents` (`ancestors`, instantiation exclusion's `checkP`, the overloading checker's `above`) see a conditional parent at no instance; readers of the clause itself (`excludesClause`, `ExclusionOracle.transitivelyExcludes`, the hierarchy checks, the inherited members) see it at every instance. The first round had the overloading example backwards.

The fix round also restored a library fact that the first round dropped without notice: `ZeroIndexed[\E\]` and the element-wise `=` stand outside the condition (without `ZeroIndexed` outside, 22 sites came; without the `=`, a list of unordered elements would have only the identity `=`; report section 1). `LexicographicOrder`'s bound on `E` stays out: F-84 holds it.

These parts left the entry, to the report's section 1: the walk through `parents`, `conditionalParents`, `KindEnv.withExtendsConditions`, `TypeWellFormedChecker`, `Decls` and `TypeDisambiguator` by line number; "rung A's reading of a parent that opens" (F-251's rule); the count's move, 31 to 30. `CondExtendInheritedMember`'s note loses "which binds no declaration's static parameters", the code-level reason.

Sources:
- Subtyping and the clause's form: report section 1; `TypeAnalyzer.scala:927-951` (":935-938: An entry under any other where clause is read as a parent, as before"); `KindEnv.scala:184-188`.
- Parts checked with and without: `TypeWellFormedChecker.scala:192-236`; `Decls.scala:87-89`, `:134-136` (every member).
- Row 781: its text ("neither path checks or evaluates them").
- Section 10: the two kinds of reader; "None of these moved a result on the library".
- `List`: `Library/List.fss:106-107`, `:124-128`; report section 1.
- The site: section 6, against `climb-batch-17/gate/`.

## F-256

> - F-256 **The compiled checker checks a `where` clause's trait constraints where they apply.** At a dotted call, a candidate whose `where` clause constrains its trait's or object's static parameter is not applicable where the receiver's static argument breaks the constraint ('Method Holder[\String\].showIt is not applicable: its where clause requires String to extend Shows.'). If a function's or method's `where` clause has a trait constraint, the clause's `nat` and `int` variables become static parameters of its arrow, inferred at the call. So a constraint whose bound names such a variable is met where some value of it meets every constraint. When the type variables' solutions leave only size constraints, the solver tries once more to solve them. Walk and the compiled path both refuse a function's or method's type `where`-clause variable at name binding ('E is undefined.'), so this inference never reaches one. A trait's or object's own constraint is checked where its type is used, with the bound's message, also at a constructor call through the call's type. A type `where`-clause variable of a `comprises` clause is bounded by its binding and by the clause's constraints on it, where it is opened and in the check of an extender. In a bound that names the variable itself, as `E extends StandardTotalOrder[\E\]` does, the opened type stands for the variable. Not read: at a dotted call, a constraint on the trait's or object's static parameter whose bound names the method's own static parameters or `where`-clause variables; at a type's use, a constraint whose bound names a `where`-clause variable; and a static argument written at a top-level call (gap-ledger row 470). Walk still runs a dotted call that breaks a method's condition (row 777), and a `comprises` clause's `where`-clause variable captures a same-named static parameter in another declaration's bound (row 778). These checks moved no site of the count or the distance (F-53 holds the current values). Tests: `compiler_tests/XXXWhereBoundDottedCallChecker`, `WhereVariableBoundCallChecker`, `XXXWhereConstraintTypeUseChecker`, `XXXWhereConstraintExtendsChecker`, `XXXComprisesWhereBoundExtenderChecker`, `OpenTypeWhereConstraintChecker`, `XXXComprisesWhereConstraintExtenderChecker`, `OpenTypeWhereSelfBoundChecker`. Detail: `explorations/compile-ladder/rung-checker-where-checks/REPORT.md`, sections 1 and 6, and `SKEPTIC.md` beside it.

Meaning: one correction of scope, from the assessment: a function's or method's type `where`-clause variable is refused at name binding, so the arrow's type branch is not reached; the arrow binds the variables only when the clause has a trait constraint. The counts of climb batch 18's trees became "moved no site", with F-53. The fix round split the "Not read" sentence by place, from the code: at a dotted call, the candidates are built by the same arrow, and only a constraint on the trait's or object's parameter whose bound names the method's own static parameters or `where`-clause variables is not read (`Functionals.scala:977-978`); at a type's use, a constraint whose bound names a `where`-clause variable (`TypeWellFormedChecker.scala:275-278`).

Sources:
- Dotted call: report section 1, row 748, with the quoted message.
- Arrow and solver: section 1, row 749; the header's deviations; `STypesUtil.scala:195-221`; `Formula.scala:649-656`.
- 'E is undefined.': `SKEPTIC.md`, F5 (walk and the compiled path share name binding).
- Type use and constructor: section 1, row 750.
- `comprises` variable: section 1, rows 753 and 771; `SKEPTIC.md`, F1.
- Not read: the header's deviation; `Functionals.scala:973-978`; `TypeWellFormedChecker.scala:275-278`; row 470.
- Walk: rows 777 and 778.
- No site moved: section 6 ("DISTANCE SAME 35"), and the count unchanged.

## F-99

> - F-99 **The gate's thread count is pinned in the build file for the two suites, not in the calling shell.** `build.xml`'s `fastTrack` macro, which runs `testFast`, and its `systemShard` macro, which runs `testSystem`, set `FORTRESS_THREADS=4` (P-125). Without the pin, the suites would take the caller's count: half the CPUs if it is unset, or 1 under `env.sh` (F-203). `fastTrack` also pins `JAVA_FLAGS` to `-Xmx4g -Xss64m`, because a compiled test's run step takes its heap and stacks from it. With `JAVA_FLAGS` unset, a compiled test's run step (`bin/run`) gives its threads the JVM's default 1 MB stacks, and at four threads `library_tests/TimingRungT` overflowed in 8 of 12 runs (gap-ledger row 640). Detail: `explorations/coordinator/process-engineering/build-efficiency.md` section 6.

Meaning: two corrections of scope, from the assessment. The pin is the two suites', not the whole gate's; the title says so, keeping its quoted opening. `TimingRungT` overflowed in 8 of 12 runs, as row 640 measured. The fix round removed a sentence that the first round added, "The gate's other runners, which `env.sh` sets up, run at one thread": the gate's atomic runs set four threads on each command (`gate.md`, "The atomic runs"; `env.sh:7`). It said how the run step had 1 MB stacks, from row 640 ("`bin/run`'s `-Xmx1536m`").

Sources: `build.xml:1186-1188` and `:1431`; `FortressExecutable.java:37-45`; `env.sh:6-7`; F-203; `bin/run:33-34`; row 640; `build-efficiency.md` section 6.

## F-100

> - F-100 **`ant compileAll` deletes the caches folders, `default_repository/caches` and `local_repository/caches`, the linker's untracked `global.map` with them, when the implementation changed, and keeps them otherwise.** It compares a folder's `implementation.stamp` with the new build's. After a deletion, `fortress run` dies with `NoClassDefFoundError: fortress/CompilerLibrary$GeneratorZZ32` until the library order refills the five library jars, in about two minutes (the `fortress-repo` skill's `build-and-caches.md`). Two other things clear the caches: `ant cleanCache`, which deletes both folders whatever the stamp, and `Shell.resetRepository`, which empties the calling run's caches folder (`ProjectProperties.CACHES`), and which `CompilerJUTest` and `LibraryJUTest` call unless `fortress.junit.reset` is false, as `testFast` sets it. A `fortress compile` after a rebuild of the compiler does not clear them. The linker writes a missing `global.map` again, empty. Detail: `explorations/coordinator/process-engineering/build-efficiency.md` section 2.

Meaning: one correction, from the assessment. "Nothing else clears `bytecode_cache/`" was too broad; `ant cleanCache` and `Shell.resetRepository` also clear the caches. The source's narrower claim stays. The fix round named the two folders (`build.xml:43-47`, `:545-546`, `:357-368`) and `resetRepository`'s folder (`Shell.java:115-122`). The title's opening changes from "the caches folder" to "the caches folders"; the batch tools quote "ant compileAll deletes the caches folder" only in a comment (`batch-measures.py:45`).

Sources: `build.xml:43-47`, `:357-368`, `:545-546`, `:1183`; `Shell.java:115-122`; `CompilerJUTest.java:28-34`, `LibraryJUTest.java:32-33`; `build-efficiency.md` section 2; `build-and-caches.md`, "The library order" and "Symptoms of a skipped step".

## F-101

> - F-101 **`harness-one.sh` keeps its Fortress cache between calls.** The script is `explorations/compile-ladder/rung-inference-walk/harness-one.sh`, and its cache is the folder `<scratch-dir>.cache`. It reuses the cache while the built implementation and the Fortress sources on the source path are those that filled it. `COLD_CACHE=1` empties it first. Detail: `explorations/coordinator/process-engineering/build-efficiency.md` sections 1 and 4.

Meaning: unchanged. Reorganized as the assessment proposes: the rule for `env.sh`'s deletion of parser folders moved to F-203, which owns `env.sh`. The script's path comes back from the history's text of 2026-10-13 19:03Z.

Sources: `harness-one.sh:7-13`; `build-efficiency.md` sections 1 and 4.

## F-102

> - F-102 **An `XXX*.fss` in the interpreter corpus is a gated expected-failure test.** `SystemJUTest` marks a file of `ProjectFortress/tests/` whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Such a test needs a `.test` file only to name a refusal at load, as any program of `tests/` does (F-29: walk's load check and its `load_exception_contains` key). An `XXX` test that imports an api with its component, as `XXXImportImportCollision.fss` does, takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora's rule differs (F-103). Source: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:780-782` and `:394-412`; the `fortress-repo` skill's `tests-writing.md`, "How `XXX` works".

Meaning: unchanged. The sentence "Its apis come from `test_library/`, so it needs no `.test` file unless ..." is split into its two facts, as the history's text of 2026-10-13 19:03Z had them, with its example.

Sources: `FileTests.java:780-782`, `:394-412`; the history's text; F-29.

## F-103

> - F-103 **The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express, in one `.test` file, a program that compiles and then fails at run time.** The `XXX` prefix of a `.test` file's name makes every command that the file drives a must-fail. So such a defect needs two `.test` files over one component: a plain-named file that drives `link`, and an `XXX` file that drives `run` (the `fortress-repo` skill's `tests-writing.md`, "Writing an `XXX` test"). A compile-stage failure needs one `XXX` compile test. An `XXX` compile test with a `compile_err_contains` key whose program compiles is red: "Saw wrong failure". Detail: `explorations/compile-ladder/rung-tryatomic/REPORT.md`, "The measured defect, and its home".

Meaning: unchanged. The limit is stated as one file's limit; the title keeps its quoted opening. The last sentence follows the skill's fifth point.

Sources: `tests-writing.md`, "How `XXX` works", second and fifth points; `FileTests.java:394-412`; the report's section named.

## F-104

> - F-104 **A thrown `CompilerError` takes a third path through the test harness, the exception stream, keyed on the component that `tests=` names, with check keys `compile_exception_*`.** The harness checks three streams of a command: its output, its error output and a thrown exception. `Shell` does not catch a `CompilerError` from the code generator, such as a code-generator wall (a `sayWhat` call; the `fortress-repo` skill's `references/compiler.md`). So the harness reads it as an exception of the component that the `.test` file's `tests=` line names. If that component's name holds `XXX`, a link or compile exception is green whatever the `.test` file is called; only an unmet key of that command makes it red. A `compile_exception_contains` key pins the wall's text, so the test turns red when the wall goes away or changes. Detail: `explorations/compile-ladder/climb-batch-2/REPAIR-review.md` section 2.

Meaning: unchanged. "Third" is said as the third check stream. The fix round uses the skill's own term, "code-generator wall" (`compiler.md`, "What the compiled path cannot compile yet"), in place of the first round's "refusal". The key condition stands beside "green", in the skill's words.

Sources: `REPAIR-review.md` section 2; `FileTests.java:136`, `:340-368`; `tests-writing.md`, "How `XXX` works", fourth point; `compiler.md:30`.

## F-203 (chunk f10's fixed line, with F-101's rule)

> - F-203 **`explorations/experiment/env.sh` sets up a shell for the gate's runners, and sets `FORTRESS_HOME` from its own place in the tree.** It sets `FORTRESS_HOME` two folders above itself, replacing any value that the shell had (`env.sh:4`), so sourcing another tree's `env.sh` runs that tree's code. It also sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`, and unsets `JAVA_TOOL_OPTIONS`. It deletes a `/tmp/fortress*rats` parser folder only if nothing in it was written for an hour and every running `java` process started after its last write, so sourcing it does not break a live run. The compile ladder's drivers source it: `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, and the two that the gate's ladder regression runs, `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh`. Each of these sets its own `JAVA_FLAGS` after it. `experiment/setup.sh` sources it too. `microgpt-phase.sh` names the main tree's `env.sh` by its absolute path; the gate rewrites that path in its copy (the `fortress-repo` skill's `gate.md`, "The ladder regression"). The count stage's and the distance stage's `run.sh` do not source it: their headers tell the caller to source it first. A worker does not source it. It starts each Bash call with the `fortress-repo` skill's setup lines, which give the same settings (`build-and-caches.md`, "Setting up each call"). Evidence: read in the scripts; the deletion rule also in `explorations/coordinator/process-engineering/build-efficiency.md` section 4.

Meaning: as in chunk f10's fixed proposal (see there), plus F-101's rule, unchanged in meaning. Source of the rule: `env.sh:9-21` (its comment: "nothing in it written for an hour, and no java process now running started before its last write"); `build-efficiency.md` section 4.
