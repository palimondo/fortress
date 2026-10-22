<!-- The clarity pass's check of FACTS chunk f9 (F-250, F-251, F-254, F-255, F-256, F-99 to F-104): each rewritten entry against the record's text and its sources, and the cold reader's answers against the source meaning, with each failure classed and a proposed fix. -->

# FACTS chunk f9: the check

Read on `main` at `772a5a2af`; the assessment read `4caa90c81`. Sources read: `facts-extract.sh` for each entry and its history; F-29, F-84, F-85, F-146, F-232, F-242; ledger rows 470, 636, 640, 748 to 756, 771, 773 to 778, 781; the reports each entry cites (`rung-library-distribute` sections 1 and 2, `rung-anylist-comprises` "What changed and why", "The checker's count" and "The distance", `rung-checker-four-rows` section 1, `rung-checker-conditional-extension` sections 1, 6 and 10, `rung-checker-where-checks` header, sections 1 and 6 and `SKEPTIC.md` F1 and F5, `build-efficiency.md` section 2, `climb-batch-2/REPAIR-review.md` section 2, `rung-tryatomic` "The measured defect"); and the code: `ApiTypeExtractor.scala`, `TypeAnalyzer.scala:927-951`, `KindEnv.scala:184-196`, `TypeWellFormedChecker.scala:187-278`, `Decls.scala:80-140`, `STypesUtil.scala:178-221`, `Functionals.scala:960-1029`, `FortressExecutable.java:37-45`, `Shell.java:115-122`, `CompilerJUTest.java:28-34`, `build.xml` (root) `:43-47`, `:357-368`, `:545-546`, `:1080-1190`, `:1380-1452`, `env.sh`, `harness-one.sh:1-30`, `FileTests.java:130-140`, `:340-368`, `:776-782`, the four open-type tests and the skill's `tests-writing.md`, `build-and-caches.md`, `gate.md` and `compiler.md`.

Summary: F-101, F-102, F-103 and F-104 pass. F-251, F-255 and F-99 each have one fidelity failure that the rewrite brought in. F-250, F-254, F-256 and F-100 keep their meaning, but the cold reader found readings that the sources rule out.

## F-250

**Fidelity.** The kept claims match `rung-library-distribute/REPORT.md` section 1 and row 470. The parts that left the entry are listed in the apply file's note. Two sentences are weaker or broader than the source:
- "it folds a constraint on the declaration's own static parameter into its arrow". The source says more: the constraint "is folded into that parameter's bound in the declaration's arrow" (section 1, `STypesUtil.makeArrowFromFunctional`). "Its arrow" can also be read as the parameter's arrow.
- "One hole remains: a static argument written at a top-level call ...". The old text was "One of its four holes remains", scoped to the rung's four holes (rows 748, 749, 750 and 470; history of 2026-10-17 19:33Z). Without that scope, the sentence reads as if row 470 were the only gap left in the checker's reading of `where` clauses. F-256's "Not read" list holds others. This is not wrong inside F-250's own subject, but it lets a reader conclude more than the evidence shows.

**Comprehension.** The cold reader got the bound, the fold and row 470 right. He could not resolve:
- "the method conditions of `SUM`'s fusion pairs" and "the identities' `cast`". These are batch handles. The assessment marked "the identities' cast" as a comprehension failure, and the rewrite keeps it.
- Which test holds which claim. The old text put each test beside its claim.
- "fold" (jargon) and "`where` clause" (the concept is missing from the skill).

**Class.**
- Wording: "and it adds a constraint on the declaration's own static parameter to that parameter's bound in the declaration's arrow (its function type), so a call is checked against it."
- Wording: "A hole remains: a static argument written at a top-level call is not checked against that bound ... (gap-ledger row 470)." No count.
- Wording, the pointer: "The library edits that landed with this reading are F-242's (the generic `distribute`, and the `where` conditions on `SumReduction`'s `distribute` overloads for `MAX` and `MIN`) and F-85's (`additiveIdentity`'s and `multiplicativeIdentity`'s fallbacks written `cast[\T\](0)` and `cast[\T\](1)`, and `embiggen` typed `BigReduction[\T,T\]`)." Sources: section 1, "The library".
- Wording, the tests: put them back beside their claims: "(`compiler_tests/WhereBoundMethodChecker`)" after the method condition, and "(`compiler_tests/XXXWhereBoundFunctionCall`, which refuses `g("s")`)" after the refused call.
- Concept: the `where` clause, the trait constraint and the arrow, as `concepts.md` already proposes (the `fortress-repo` core, and `references/compiler.md` for the arrow).

## F-251

**Fidelity.** One sentence claims a stronger cause than the source shows:
- Rewrite: "On the rung's own tree, `AnyList`'s `addLeft`, `addRight` and the comprehension's unwrap, respelled, took the distance from 49 to 45 (gap-ledger row 636's four sites)". This makes the respelling the cause of all four sites.
- Source: three of the sites went with the respelling: `List.fss:89` (`addL`), `:90` (`addR`) and `:179` (the unwrap). The fourth, `List.fss:88` (`app`, `AnyList`'s `||`), went because the opened type now accepts it: "`AnyList`'s `||` stays `app(self, f)`, now accepted through the opened type ... the distance shows `app`'s site gone" (`rung-anylist-comprises/REPORT.md`, "What changed and why" and "The distance").
- Row 636 says the same: "the clause made live (opened at a call by the checker ...), with ... respelled; the distance's `List.fss:88`, `:89`, `:90` and `:179` are gone".
- The old text, "With ... respelled, the distance goes from 49 to 45", gave no cause. The rewrite's "took" gives one.

The other sentences match the report, F-146, the test headers and rows 752 and 771. The Amin and Tate sentence matches `XXXOpenTypeBoundEvidenceChecker.fss:1`. That test is still a gated expected failure of the head, so "refuses" holds, whatever the state of its comment, which the writer flagged.

**Comprehension.** The cold reader's reading matches the source, except where the entry is open:
- He asked whether the drop of four comes from the respelling or the checker, and why three sites are named for four. This is the fidelity failure above.
- "bounded by the binding": two readings. The source means the bound written in the clause's binding, at the trait's static arguments ("bounded by its binding's bounds at the trait's static arguments").
- "`AnyList`'s clause is live": two readings. Both are true. The clause was a comment, "Not yet: comprises List[\E\] where [\E\]" (`List.fsi:56` at the base), and is now in the library and read by both paths.
- "the comprehension's unwrap": the report says the list comprehension's.
- "symbolic type": the skill does not define it.

**Class.**
- Wording, the fidelity failure: "On the rung's own tree the distance went from 49 to 45, row 636's four sites: `AnyList`'s `||` is now accepted through the opened type, and its `addLeft`, `addRight` and the list comprehension's unwrap were respelled. The count, and walk's element types, did not change."
- Wording: "bounded by the bound of the clause's binding, `[\E extends B\]`, and by the clause's constraints on it (F-256)".
- Wording, the title: "... and `AnyList`'s clause, `comprises { List[\E\] } where [\E\]`, once a comment, is in the library."
- Concept: the `where`-clause variable (the `fortress-repo` core) and opening (`references/compiler.md`), as `concepts.md` proposes. Also walk's symbolic type, which `concepts.md` lacks: define it in `references/interpreter.md`. It is the stand-in type, with bounds, by which walk binds a static parameter or a type `where`-clause variable that no static argument fixes (`BuildEnvironments.processWhereClauses`, `SingleFcn.createSymbolicInstantiation`, per the report). `revival-changes.md` already uses "symbolic instance" without defining it.

## F-254

**Fidelity.** It matches `ApiTypeExtractor.scala:77-126` and `:193-209`: `satisfied` keeps an api declaration only when exactly one of the name has the function's parameter types, and an untyped parameter matches any. It also matches report section 1 and F-232 ("since row 737's repair no choice of `ApiTypeExtractor` depends on their order (F-254)"). The added sentence "So the choice does not depend on the JVM's identity-hash order" follows from the code and agrees with F-232. The clause on the JFR runs left for the report: that is evidence, not a claim, and the apply note says where it went. No change of meaning.

**Comprehension.** The cold reader's reading matches the source. He found two open phrases:
- "`Library/FortressLibrary.fss:130` is out of both". Two readings. The source means the error at that line is gone from both stages' output: `BIG LEXICO(g)` now takes `TotalComparison` from `FortressLibrary.fsi:98` (section 1).
- "the declaration keeps its elisions". The code leaves the declaration as written (`case _ => f`). What the checker does next is not in the cited sources, so the entry should not say more.

**Class.**
- Wording: "the error at `Library/FortressLibrary.fss:130` (`BIG LEXICO`'s omitted return type), which came and went with that order, is gone from both stages."
- Wording: "With none or several, it takes none, and the declaration is left as written."

## F-255

**Fidelity.** Two failures, one brought in by the rewrite:
- **A reader's behaviour stated wrongly.** Rewrite: "Other readers of the `extends` clause in the checker also read the parent at every instance, for example the inherited `excludes` clauses and the ancestors that the overloading checker sees". Report section 10 splits these readers in two:
  - Readers that go through `parents`, which leaves the conditional parent out, see it at no instance. These are `TypeAnalyzer.ancestors`, instantiation exclusion's `checkP` and the overloading checker's `above`, which "does not see a trait that is above only conditionally".
  - Only the readers of the clause itself see it at every instance: `excludesClause`, `ExclusionOracle.transitivelyExcludes`, the `TypeHierarchyChecker` checks and `STypesUtil`'s inherited members.

  So the overloading example says the opposite of the source. The assessment had it right: "`ancestors` and the overloading checker's `above` see no conditional ancestor". The cold reader followed the rewrite, and concluded that overloading treats the extension as unconditional.
- **A library fact dropped without notice.** The proposal's "Meaning" does not list it. The old entry had `ZeroIndexed[\E\]` and an element-wise `=` written outside the condition (`Library/List.fss:106-107`, `:124-128`). Report section 1 says why: without `ZeroIndexed` outside the condition, 22 sites came. Without the `=`, a list of unordered elements has only the identity `=` on the checker. `LexicographicOrder`'s bound on `E`, also dropped, is held by F-84 ("`LexicographicOrder` bounds its element by `StandardTotalOrder`"), so that drop is safe. The other two are held by no other entry.

The rest matches:
- The parts checked with and without the condition match `TypeWellFormedChecker.scala:192-236` and `Decls.scala:87-89`, `:134-136`.
- Row 781 matches ("neither path checks or evaluates them").
- The site matches report section 6.

**Comprehension.** Besides the reader above:
- "the members": every member or only some? The code checks every member: `Decls`'s `checkerWSparams` for all `decls`, and `TypeWellFormedChecker`'s `walk(decls)` under `inDecl`.
- "read as before": settled by `TypeAnalyzer.scala:935-938`: "An entry under any other where clause is read as a parent, as before", that is, at every instance.
- "the value parameters": an object's. Minor.

**Class.**
- Wording, the readers: "Other readers of the `extends` clause in the checker ignore the condition. Those that go through the type's parents see a conditional parent at no instance: the ancestors (`TypeAnalyzer.ancestors`), which the overloading checker reads to let a concrete method implement an abstract one. Those that read the clause itself see it at every instance: the inherited `excludes` clauses (`TypeAnalyzer.excludesClause`). None moved a result on the library, and no ledger row holds them (report section 10)."
- Wording, the library: "In the library, `List` extends `LexicographicOrder[\List[\E\],E\]` only where `E extends StandardTotalOrder[\E\]`; its `ZeroIndexed[\E\]` entry and its own element-wise `opr =` stand outside the condition, so every list keeps them (`Library/List.fss:106-107`, `:124-128`)."
- Wording: "A clause that binds a variable, or that holds a constraint that is not a trait constraint, is read as before: as a parent at every instance." Also "every member" for "the members".
- Wording, optional: the title's condition can name the clause's other limit, "under a `where` clause that binds no variable and holds trait constraints only" (`KindEnv.extendsConditions`, `KindEnv.scala:184-188`). The body already says it.
- Concept: conditional extension and the `where` clause, as `concepts.md` proposes.

## F-256

**Fidelity.** It matches the sources:
- the report's section 1, its header's deviations and section 6;
- `SKEPTIC.md` F1 and F5;
- rows 470, 748 to 750, 753, 771, 777 and 778;
- the code: `STypesUtil.scala:195-221` (the arrow binds the variables only when the clause has a trait constraint), `Functionals.scala:973-978` and `TypeWellFormedChecker.scala:275-278`.

The scope correction is right. The arrow's type branch exists (`STypesUtil.scala:202-203`) but is not reached, because name binding refuses a function's or a method's type `where`-clause variable. "Moved no site" matches "DISTANCE SAME 35" and the equal count tables. No change of meaning.

**Comprehension.** The cold reader differs from the source in one place:
- He read the "Not read" sentence to mean that a method's `where`-clause size constraint is not checked at a dotted call, only at a call that goes through the arrow.
- In the code, a dotted call's candidates are built by `makeArrowFromFunctional` too (`Functionals.scala:961`), with the method's own `where` variables and folded bounds.
- What is not read at a dotted call is narrower: a constraint on the trait's or object's static parameter whose bound names the method's own static parameters or its `where`-clause variables. The code comment says so: "A constraint whose bound names the method's own static parameters or where-clause variables is not read here" (`Functionals.scala:977-978`). At a type's use, only the second kind applies (`TypeWellFormedChecker.scala:275-278`).
- So the entry's sentence, which merges the two places and names neither constraint's subject, misled him.

He also had two readings of "Both paths". The source, `SKEPTIC.md` F5, means walk and the compiled path: name binding is their shared phase. He found row 778's phrase awkward but read it right.

**Class.**
- Wording: "Not read: at a dotted call, a constraint on the trait's or object's static parameter whose bound names the method's own static parameters or `where`-clause variables; at a type's use, a constraint whose bound names a `where`-clause variable; and a static argument written at a top-level call (gap-ledger row 470)."
- Wording: "Walk and the compiled path both refuse a function's or method's type `where`-clause variable at name binding ('E is undefined.') ...".
- Wording: "... become static parameters of its arrow" (not "the function's" when the subject is a method).
- Wording: "and a `comprises` clause's `where`-clause variable captures a same-named static parameter in another declaration's bound (row 778)".
- Concept: the `where` clause, and its `nat` and `int` variables, as `concepts.md` proposes.

## F-99

**Fidelity.** One sentence was added that the sources do not support:
- Rewrite: "The gate's other runners, which `env.sh` sets up, run at one thread (F-203)." It is not in the old entry, and it is false of one of the gate's runners. The gate's atomic runs set four threads on each command: `FORTRESS_THREADS=4 timeout ... ../bin/fortress run $p` (`gate.md`, "The atomic runs").
- `env.sh:7` says so too: "the checks at 4 threads override FORTRESS_THREADS on the command line".
- The writer took the sentence from the assessment's list of runners, but made it a claim about all "the gate's other runners".

The other corrections are right:
- The pin is on the two macros (`build.xml:1186`, `:1431`).
- The fallback count: `FortressExecutable.java:37-45` uses half the CPUs, or the CPU count up to two.
- `TimingRungT` overflowed in 8 of 12 runs (row 640).

**Comprehension.** The cold reader caught the overbroad sentence himself. He also could not tell how the run step came to have 1 MB stacks, since `interpreter.md` gives `bin/fortress` `-Xss32m` when `JAVA_FLAGS` is unset. Row 640 settles it: the run step is `bin/run`, which with no `JAVA_FLAGS` sets only `-Xmx1536m`, so its threads get the JVM's default 1 MB stacks.

**Class.**
- Wording, the fidelity failure: drop the sentence, and keep the old text's clause: "Without the pin, the suites would take the caller's count: half the CPUs if it is unset, or 1 under `env.sh` (F-203)." If the other runners stay, say which: "the count and distance stages and the ladder regression run at one thread under `env.sh`; the atomic runs set four threads on each command (`gate.md`)."
- Wording: "With `JAVA_FLAGS` unset, a compiled test's run step (`bin/run`) gives its threads the JVM's default 1 MB stacks, and at four threads `library_tests/TimingRungT` overflowed in 8 of 12 runs (gap-ledger row 640)."
- Wording, minor: "the two suites" can name them, "`testFast` and `testSystem`", since the gate runs `testSpecData` too, unpinned (`build.xml:1380-1403`). The quoted opening stays.

## F-100

**Fidelity.** The correction is right:
- `ant cleanCache` deletes both caches folders whatever their stamp (`build.xml:357-368`).
- `Shell.resetRepository` deletes every file of `ProjectProperties.CACHES` (`Shell.java:115-122`), called by `CompilerJUTest` and `LibraryJUTest` when `fortress.junit.reset` is true (`CompilerJUTest.java:28-34`), and `fastTrack` sets it false (`build.xml:1183`).
- The error and the time are in `build-and-caches.md`, lines 73-75 and 131.

One sentence reads as complete where the source lists more. "Two other things clear the caches" leaves out the deleters of single entries that `build-efficiency.md` section 2 names: "the linker's jar replacement (`Linker.java:258-263`) and `ASTIO.deleteJavaAst`". Those delete one file each, not the caches, so "clear" can stand. It is not a change of meaning.

**Comprehension.** The cold reader read it right. He asked which folder "the caches folder" is, and which folder `resetRepository` clears:
- `compileAll` and `cleanCache` act on both `default_repository/caches` and `local_repository/caches` (`build.xml:43-47`, `:545-546`), and never on a private one.
- `resetRepository` empties the caches folder of the run that calls it (`ProjectProperties.CACHES`), a private one when the suite redirects it.

**Class.**
- Wording: "`ant compileAll` deletes the caches folders, `default_repository/caches` and `local_repository/caches`, ..."
- Wording: "and `Shell.resetRepository`, which empties the calling run's caches folder (`ProjectProperties.CACHES`), and which `CompilerJUTest` and `LibraryJUTest` call unless `fortress.junit.reset` is false, as `testFast` sets it."
- Concept: the caches folder and the library order are defined in the skill (the core and `build-and-caches.md`).

## F-101

**Fidelity.** Pass. It matches `harness-one.sh:7-13`: a stamp of the built implementation and of the `.fss` and `.fsi` sources on the source path, and `COLD_CACHE=1`. The path comes from the history's text of 2026-10-13 19:03Z. The moved `env.sh` rule appears in this chunk's F-203 line, and matches `env.sh:9-21`: the folder untouched for an hour, nothing in it newer than an hour, and its last write before the oldest running `java` started.

**Comprehension.** The cold reader read it right. Pass.

## F-102

**Fidelity.** Pass. It matches `FileTests.java:780-782` (`s.startsWith("XXX")`), the history's text of 2026-10-13 19:03Z (the api pairs and `test_library/`), and F-29's `load_exception_contains`.

**Comprehension.** The cold reader read it right. "api pairs" stays a little loose. The old text's example, `XXXImportImportCollision.fss`, would anchor it, but it is optional. Pass.

## F-103

**Fidelity.** Pass. It matches `tests-writing.md`, "How `XXX` works", its second and fifth points.

**Comprehension.** The cold reader read it right. Pass. One optional wording, since the key's condition trails the sentence: "An `XXX` compile test with a `compile_err_contains` key whose program compiles is red: 'Saw wrong failure'." This follows the skill's fifth point.

## F-104

**Fidelity.** Pass. It matches `REPAIR-review.md` section 2 and `FileTests.java:136` and `:340-368`: the `catch (Throwable ex)` keys on `f.contains("XXX")`, where `f` holds the `tests=` name.

**Comprehension.** The cold reader read it right. Pass. A note for `concepts.md`: `references/compiler.md:30` already defines the term, "Such a call or throw is a code-generator wall". So the entry's "refusal" could use the skill's word, and the concept needs no new definition.
