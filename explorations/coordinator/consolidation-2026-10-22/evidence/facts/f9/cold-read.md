# Cold read of f9: F-250, F-251, F-254, F-255, F-256, F-99, F-100, F-101, F-102, F-103, F-104, F-203

What I read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; the references `compiler.md`, `build-and-caches.md`, `tests-writing.md`, `tests-running.md`, `gate.md`, `records.md`, `library.md` and `interpreter.md`; and a grep of the other allowed references for the entries' terms. Nothing else.

## A gap that affects five entries

The skill never explains Fortress `where` clauses. It does not give their syntax, the kinds of constraint they hold (the entries contrast a "trait constraint" `X extends B` with other kinds that they never name), a clause that binds variables (`where [\E\]`, `nat` and `int` where-clause variables), or what a `where` clause on an `extends` entry means. The skill only mentions them in passing: `compiler.md` says the code generator refuses a declaration with a `where` clause of its own and compiles an `extends` entry that has one, and `interpreter.md` mentions them in walk's `override` check. F-250, F-251, F-255 and F-256 rest on this concept. I followed them through the examples they give (`Box[\E\] where [\E\]`, `E extends StandardTotalOrder[\E\]`, the `List` declaration) and through my general knowledge of Fortress. A worker who has only the skill would have to guess the syntax and the constraint kinds. This is a language concept that is missing from the skill.

---

## F-250, "Inside a declaration, the compiled checker reads a `where` clause's trait constraint ..."

**Established:** When the compiled checker checks a declaration that has a `where` clause, it treats each constraint `X extends B` in the clause as a bound on `X`. If `X` is a static parameter of the enclosing trait or object, a method that states this condition can use `X` as a `B` inside its body. If `X` is the function's own static parameter, the constraint becomes part of the function's arrow type. Each call is then checked against it, and a call whose inferred static argument breaks it is refused.

**Conditions:** This covers trait constraints only. The checker does not check an explicitly written static argument at a top-level call against the bound: `g[\String\]("s")` is accepted and `g("s")` is refused (gap-ledger row 470). Dotted calls, uses of a type and `comprises` clauses are covered by F-256, not here. The entry is about the compiled checker only and says nothing about walk.

**Consequence:** A worker can rely on the checker to refuse an inferred call that breaks a function's own constraint, and to accept a method body that relies on its condition. An accepted call with written static arguments does not prove that the constraint holds (row 470).

**Evidence:** The tests `compiler_tests/WhereBoundMethodChecker` and `XXXWhereBoundFunctionCall`, and `compile-ladder/rung-library-distribute/REPORT.md` section 1. The library edits that came with the change are listed under F-242 and F-85.

**Could not resolve:**
- "`where` clause", "trait constraint": a language concept that the skill lacks (see above).
- "folds a constraint ... into its arrow": jargon. I read it as "makes the constraint part of the function's arrow type", but the skill never uses "fold" in this sense. The wording is unclear, though readable.
- "the generic `distribute`", "the method conditions of `SUM`'s fusion pairs", "the identities' `cast`", "the typed `embiggen`": I could not resolve these library names without F-242 and F-85. The skill defines neither "fusion pairs" nor "identities" (of what?). From this sentence I can only tell that related library edits exist somewhere. The wording depends on the record.
- Which test checks what: the entry does not say whether `XXXWhereBoundFunctionCall` records the hole of row 470 or asserts the refusal of `g("s")`. By `tests-writing.md`, an `XXX` compile test is green only when the compile fails with its message, so it must hold the refusal that happens today. The hole, which compiles, can then only be held by row 470. I had to work this out. The entry also gives no folder for the second test. Unclear wording.
- The detail path starts at `compile-ladder/`, without `explorations/`, while F-256 gives a full path. This is minor and resolvable.

---

## F-251, "A type `where`-clause variable of a `comprises` clause is opened at a call ..."

**Established:** Take a trait whose `comprises` clause lists a type with a where-bound type variable, such as `Box[\E\] where [\E\]`. When an argument of that trait is passed at a call, the compiled checker opens the variable: it treats the value as a `Box` of a new type made for that call. It already does this for the `nat` and `int` sizes of a listed type (F-146). The new type is bounded by the variable's binding and by the clause's constraints on it (F-256). It stays distinct from everything else:
- it is refused where a different type is declared;
- two values get two different new types;
- the program shape of Amin and Tate's 2016 unsoundness example is refused, so such a value cannot prove a false subtype relation.

`AnyList`'s clause of this kind is now in effect.

**Conditions:** The opening happens only at a call, and only where the checker meets the trait itself. It does not happen where the checker reaches the trait as a parent of the argument's type (row 752). Walk instead binds the variable as a "symbolic type" at load. The measurement was taken on the rung's own tree, so it is a past value, not the current one. There, rewriting `AnyList`'s `addLeft`, `addRight` and "the comprehension's unwrap" lowered the distance from 49 to 45 (row 636's four sites). The checker count and walk's element types did not change.

**Consequence:** Library code can take apart an `AnyList`-like value at a call, and the checker keeps its element type abstract and separate per value. A worker must not expect this where the value's type is only a subtype of the comprising trait (row 752).

**Evidence:** The tests `OpenTypeChecker`, `XXXOpenTypeEscapeChecker`, `XXXOpenTypeTwoChecker`, `XXXOpenTypeBoundEvidenceChecker`, `OpenTypeWalk` and `AnyListElementTypeWalk`, and `compile-ladder/rung-anylist-comprises/REPORT.md`.

**Could not resolve:**
- "type `where`-clause variable", the binding form `where [\E\]`: a language concept that the skill lacks. From the example, I read it as a hidden (existential) type variable.
- "opened at a call": the entry does not say which calls. It could mean every call that takes such a value as an argument, or only a call whose parameter type mentions `Box`. It also does not say whether the receiver of a dotted call counts as an argument. Unclear wording.
- "bounded by the binding": I take it to mean the bound written where the variable is bound. It could also be read as the static argument bound to the variable. Unclear wording.
- "It refuses that type where another type is declared": I read it as "it refuses the new type in a place whose declared type is a different type". Unclear wording.
- "`AnyList`'s clause is live" (the title): this could mean the checker now reads the clause, or that the clause is now present (not commented out) in the library. Two readings.
- "respelled": the entry does not say whether the three library sites were rewritten as part of the landed change. It also does not say whether the drop of 4 comes from the rewriting or from the checker change. Two readings. "the comprehension's unwrap": I cannot tell which comprehension or which function is meant.
- Three sites are named, but they are "row 636's four sites" and the distance falls by four. The entry does not say where the fourth comes from. Unclear wording.
- "binds the variable as a symbolic type at load": the skill does not define "symbolic type" (`interpreter.md` uses it once without a definition), and the entry does not say what this means for walk's behaviour. An implementation concept that I lack.
- "the shape of Amin and Tate's 2016 unsoundness example": the entry names the shape but does not describe it, and the skill does not cite the paper. I know the paper from training ("Java and Scala's Type Systems are Unsound"). A worker without it must read `XXXOpenTypeBoundEvidenceChecker`.
- The entry gives no test folders. I take `OpenTypeWalk` and `AnyListElementTypeWalk` to be in `tests/` and the rest in `compiler_tests/`. Minor.

---

## F-254, "In the compiled checker, a function or method that leaves out its return type takes it from the exported api's declaration ..."

**Established:** When a function or method in a component leaves out its return type, the compiled checker (`ApiTypeExtractor`) looks in the api that the component exports. It looks for a declaration of the same name whose parameter types equal the function's. The comparison is `ExportChecker.equalTypes`, and a parameter that the function leaves untyped matches any type. The checker takes that declaration's return type only if exactly one declaration matches. If none or several match, it takes nothing, and the return type stays left out. So the result no longer depends on the JVM's identity-hash order of the declarations.

**Conditions:** The compiled checker only, and only declarations of the exported api. Exactly one declaration must match.

**Consequence:** A worker can leave out a return type when the exported api declares the function with parameter types that pick out one declaration. With an overloaded name that matches several declarations, the type stays left out. The output of the count and distance stages is not known to depend on the hash order (F-232). `Library/FortressLibrary.fss:130` is "out of both".

**Evidence:** `scala_src/typechecker/ApiTypeExtractor.scala:77-126` and `:193-209`, read in the code; the tests `OmittedReturnTypeFromApi` and `OmittedMethodReturnTypeFromApi`; and `compile-ladder/rung-checker-four-rows/REPORT.md` sections 1 and 5.

**Could not resolve:**
- "the exported api's declaration that has its own parameter types": this can be read as the declaration that has the function's own parameter types (a match), or as a declaration that has parameter types of its own (is typed). The next sentence settles it as the first. The wording is unclear, but it can be resolved.
- "the declaration keeps its elisions": the entry does not say what follows. The checker might infer the type from the body, or it might report an error. Unclear wording.
- "`Library/FortressLibrary.fss:130` is out of both": this could mean the site has left both stages' output (it has no error now), or that it has left the set of sites that depend on the order. Two readings. Without F-232, I also cannot tell what that line held or that it once moved with the order (the entry only implies it).

---

## F-255, "The compiled checker reads conditional extension in its subtype relation ..."

**Established:** A trait or object may extend a type under a `where` clause that holds only trait constraints. The compiled checker treats it as a subtype of that type only for the instances where the constraints hold. The declaration's parts are checked in two ways:
- with the constraints assumed: the conditional `extends` entry, the value parameters and the members;
- without them: the static parameters, the declaration's own `where` clause, its `excludes` and `comprises` clauses and its other `extends` entries.

The disambiguator drops every trait's and object's `throws` clause and contract, so neither is ever checked (row 781). An `extends` clause that binds a variable, or that holds a constraint of another kind, is read "as before". Library example: `List` extends `LexicographicOrder[\List[\E\],E\]` only where `E extends StandardTotalOrder[\E\]`.

**Conditions:**
- A member that was checked under the condition can still be called where the condition fails (row 773).
- Walk and the compiled run time treat the extension as unconditional (row 774).
- Other readers of `extends` in the checker also treat it as unconditional: the inherited `excludes` clauses and the ancestors that the overloading checker sees. No ledger row holds these (report section 10).

The site measurement was taken on the rung's own tree, against climb batch 17's gate: one site, `FortressLibrary.fss:2063`, was cleared, and none was added.

**Consequence:** A worker can declare a conditional parent in the library and expect the checker to refuse a use of the subtype relation where the condition fails. A worker must not rely on that for members (row 773), for walk or the run time (row 774), for `excludes` or for overloading. A type that inherits through a conditional parent compiles (`CondExtendInheritedMember`).

**Evidence:** The tests `compiler_tests/CondExtendChecker`, `XXXCondExtendRefuseChecker`, `XXXCondExtendUnconditionalEntryChecker`, `XXXCondExtendExcludesChecker`, `XXXCondExtendComprisesChecker`, `XXXCondExtendParamBoundChecker`, `XXXCondExtendExcludesWhereChecker`, `CondExtendInheritedMember` and `tests/XXXConditionalExtensionTypeTestWalk`, and `compile-ladder/rung-checker-conditional-extension/REPORT.md` sections 1, 6 and 10.

**Could not resolve:**
- "`where` clause of trait constraints only", "a clause that binds a variable", "a constraint that is not a trait constraint": a language concept that the skill lacks. The `List` example gives the shape of a trait constraint but does not show the other kinds.
- "the members are checked with the constraints holding": this could mean every member of the declaration, or only the members that the conditional parent requires or provides. Two readings. It matters: under the first, any member body may rely on the condition, and row 773 then applies to every member.
- "read as before": the entry does not say what the reading before the change was (treated as unconditional, ignored, or refused). Unclear wording. A worker cannot tell how such a clause behaves now.
- "no ledger row holds them": the entry does not say whether a worker who meets these readers should add a row. Not unclear wording, but the consequence is unstated.
- "the value parameters": I take these to be an object's constructor parameters, since a trait has none. Minor.
- The entry does not say which row `tests/XXXConditionalExtensionTypeTestWalk` records (presumably 774). Minor.

---

## F-256, "The compiled checker checks a `where` clause's trait constraints where they apply."

**Established:** The compiled checker checks these constraints in five places.
- **At a dotted call:** a method whose `where` clause constrains its trait's or object's static parameter is not applicable when the receiver's static argument breaks the constraint. The message is quoted in the entry.
- **In a function's or method's own `where` clause** that has a trait constraint:
  - The clause's `nat` and `int` variables become static parameters of the arrow, inferred at the call. A constraint whose bound names such a variable holds if some value of the variable meets every constraint.
  - When solving the type variables leaves only size constraints, the solver tries those once more.
  - Both paths refuse a type variable bound in such a clause at name binding ('E is undefined.'), so the inference never sees one.
- **At a use of a type:** a trait's or object's own constraint is checked wherever the type is used, with the same message as a broken bound. A constructor call is checked through its type.
- **At a `comprises` where-clause variable:** the variable is bounded by its binding and by the clause's constraints, both where it is opened and when an extender is checked. In a self-referential bound such as `E extends StandardTotalOrder[\E\]`, the opened type takes the variable's place.

Not checked:
- a constraint whose bound names the method's own static parameters or a where-clause variable, at a dotted call or at a use of a type;
- a static argument written at a top-level call (row 470).

Walk runs a dotted call that breaks a method's condition (row 777). Walk also mixes up a `comprises` where-clause variable with the same name in another declaration's bound (row 778). No site of the count or the distance moved (F-53 holds the current values).

**Conditions:** As listed above. Only trait constraints are covered.

**Consequence:** A worker can rely on these refusals in the compiled checker, but not on walk (rows 777 and 778). A worker cannot use a type variable bound in a function's or method's `where` clause at all (both paths refuse it). A worker must not take an accepted call as proof in the unchecked cases.

**Evidence:** The tests `XXXWhereBoundDottedCallChecker`, `WhereVariableBoundCallChecker`, `XXXWhereConstraintTypeUseChecker`, `XXXWhereConstraintExtendsChecker`, `XXXComprisesWhereBoundExtenderChecker`, `OpenTypeWhereConstraintChecker`, `XXXComprisesWhereConstraintExtenderChecker` and `OpenTypeWhereSelfBoundChecker`, and `explorations/compile-ladder/rung-checker-where-checks/REPORT.md` sections 1 and 6, with `SKEPTIC.md` beside it.

**Could not resolve:**
- "Both paths refuse ...": this could mean walk and the compiled path (the skill's sense of "both paths"), or the two solver attempts or call routes of the sentences just before. Two readings. I take the first, because name binding is a phase both paths share.
- Possible conflict: the entry says a method's `where`-clause size variables become arrow parameters inferred "at the call", but then says that a constraint whose bound names a where-clause variable is not read at a dotted call. So is a method's where-variable constraint checked when the method is called with a dot? I read it as checked only at a call that goes through the arrow (top-level or functional), not at a dotted call. The entry does not say which calls of a method go through the arrow. Unclear wording.
- "the clause's `nat` and `int` variables" (that is, `where [\nat n\]`): a language concept that the skill lacks.
- "with the bound's message": the entry does not quote the text. Minor.
- "reads a `comprises` clause's `where`-clause variable for the same name in another declaration's bound": I read it as walk resolving a same-named variable in another declaration's bound to the `comprises` variable, a leak of scope. The wording is awkward and unclear.
- "where they apply" (the title) is vague, but the body lists the places.

---

## F-99, "The gate's thread count is pinned in the build file for the two suites ..."

**Established:** In `build.xml`, the `fastTrack` macro (`testFast`) and the `systemShard` macro (`testSystem`) set `FORTRESS_THREADS=4`, so these suites run at four threads whatever the shell exports (P-125). Without the pin, the suites would take the caller's value: half the CPUs if it is unset, or 1 under `env.sh`. The gate's other runners, which `env.sh` sets up, run at one thread (F-203). `fastTrack` also pins `JAVA_FLAGS` to `-Xmx4g -Xss64m`, because a compiled test's run step takes its heap and stack sizes from `JAVA_FLAGS`.

**Conditions:** The pin covers these two macros only. The `JAVA_FLAGS` pin is in `fastTrack` only.

**Consequence:** A worker need not export a thread count for the suites, and should expect the suites (four threads) and the `env.sh` runners (one thread) to differ. The `-Xss` pin must stay: without it, `library_tests/TimingRungT` overflows a stack (row 640).

**Evidence:** P-125; row 640 (8 overflows in 12 runs with 1 MB stacks at four threads); `coordinator/process-engineering/build-efficiency.md` section 6.

**Could not resolve:**
- "The gate's other runners, which `env.sh` sets up, run at one thread": `gate.md`'s atomic runs set `FORTRESS_THREADS=4` on each command, and `testSpecData` is not mentioned. The sentence must therefore mean only the scripts that source `env.sh` (the ladder regression), but it reads as if it covered every other runner. Overbroad, unclear wording.
- "With the JVM's default 1 MB stacks": the entry does not say when a run step got the default stack size (`JAVA_FLAGS` unset in the ant fork, or set without `-Xss`). `interpreter.md` says that `bin/fortress` uses `-Xss32m` when `JAVA_FLAGS` is unset, so I cannot tell how 1 MB arose. Unclear wording.

---

## F-100, "`ant compileAll` deletes the caches folder ... when the implementation changed ..."

**Established:** `ant compileAll` compares the caches folder's `implementation.stamp` with the new build's. If they differ, it deletes the folder, the untracked `global.map` included. If they match, it keeps it. After a deletion, `fortress run` fails with `NoClassDefFoundError: fortress/CompilerLibrary$GeneratorZZ32` until the library order refills the five library jars, which takes about two minutes. Two other things clear the caches:
- `ant cleanCache`, whatever the stamp;
- `Shell.resetRepository`, which `CompilerJUTest` and `LibraryJUTest` call unless `fortress.junit.reset` is false. `testFast` sets it to false.

A `fortress compile` after the compiler is rebuilt does not clear the caches. The linker writes a missing `global.map` again, empty.

**Conditions:** The stamp rule applies to the folder that the build checks.

**Consequence:** After a Java or Scala edit, run the library order before a compiled run. Do not expect `fortress compile` to notice a changed compiler. A missing `global.map` is harmless.

**Evidence:** `coordinator/process-engineering/build-efficiency.md` section 2; the skill's `build-and-caches.md`.

**Could not resolve:**
- "the caches folder": the entry does not name it. From `build-and-caches.md` it is `default_repository/caches`, since a private folder is not touched. Minor.
- "`Shell.resetRepository` ... clear[s] the caches": the entry does not say which folder: `default_repository/caches`, or whatever caches folder the run uses (a private one under the suites, the default one under `fortress junit` or `junit.sh`). Unclear wording.

---

## F-101, "`harness-one.sh` keeps its Fortress cache between calls."

**Established:** `compile-ladder/rung-inference-walk/harness-one.sh` keeps its cache in `<scratch-dir>.cache`, beside the scratch folder that it deletes. It reuses the cache while the built implementation and the Fortress sources on the source path are the ones that filled it. `COLD_CACHE=1` empties the cache first.

**Conditions:** Reuse is valid only while the build and the sources are unchanged.

**Consequence:** Repeated calls with the same scratch path are fast. Use `COLD_CACHE=1` to start cold.

**Evidence:** `coordinator/process-engineering/build-efficiency.md` sections 1 and 4.

**Could not resolve:** Nothing. The path starts at `compile-ladder/`, without `explorations/`, which is minor.

---

## F-102, "An `XXX*.fss` in the interpreter corpus is a gated expected-failure test."

**Established:** `SystemJUTest` treats a file in `ProjectFortress/tests/` whose name starts with `XXX` as one that must fail. The suite goes red when such a file passes. The test needs a `.test` file only to name a refusal at load, as any program in `tests/` does (F-29). An `XXX` test that imports an api and its component takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora follow a different rule (F-103).

**Conditions:** Interpreter corpus only.

**Consequence:** To record a deferred walk defect, add `tests/XXXName.fss`, with no `.test` file unless a refusal at load is involved, and put its imported apis in `test_library/`.

**Evidence:** `FileTests.java:780-782` and `:394-412`; `tests-writing.md`, "How `XXX` works".

**Could not resolve:** "api pairs": I read this as an api with its implementing component. The entry does not give the folder of `FileTests.java`. Both are minor.

---

## F-103, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express, in one `.test` file, a program that compiles and then fails at run time."

**Established:** In these folders, the `XXX` prefix of a `.test` file's name makes every command that the file drives a must-fail. A program that compiles and links but fails at run time therefore needs two `.test` files over one component: a plain-named one that drives `link`, and an `XXX` one that drives `run`. A failure at compile time needs a single `XXX` compile test. If that test has a `compile_err_contains` key and its program compiles, the test is red ("Saw wrong failure").

**Conditions:** `compiler_tests/` and `library_tests/`.

**Consequence:** Write the pair as `tests-writing.md` "Writing an `XXX` test" says, and never one `XXX` file with both `link` and `run`.

**Evidence:** `compile-ladder/rung-tryatomic/REPORT.md`, "The measured defect, and its home"; `tests-writing.md`.

**Could not resolve:** The entry does not say whether `other_compiler_tests/` follows the same rule, or what happens to such a test without a `compile_err_contains` key. Both are minor.

---

## F-104, "A thrown `CompilerError` takes a third path through the test harness ..."

**Established:** The harness checks three streams of each command: output, error output and a thrown exception. `Shell` does not catch a `CompilerError` from the code generator (for example a `sayWhat` refusal), so the harness sees it as an exception of the component named on the `tests=` line, checked with `compile_exception_*` keys. If that component's name contains `XXX`, a link or compile exception is green whatever the `.test` file is called. Only an unmet key of that command makes it red. A `compile_exception_contains` key pins the refusal's text, so the test turns red if the refusal disappears or changes.

**Conditions:** Code-generator exceptions in compiled tests.

**Consequence:** Pin a code-generator wall with `compile_exception_contains`. A plain-named `.test` file over an `XXX` component is green on any link or compile exception, so pin the text.

**Evidence:** `compile-ladder/climb-batch-2/REPAIR-review.md` section 2.

**Could not resolve:** Nothing that blocks. "keyed on the component that `tests=` names" is jargon, but the next sentences explain it.

---

## F-203, "`explorations/experiment/env.sh` sets up a shell for the gate's runners ..."

**Established:** `env.sh` does the following:
- sets `FORTRESS_HOME` to the tree that contains it;
- sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`;
- unsets `JAVA_TOOL_OPTIONS`;
- deletes a `/tmp/fortress*rats` parser folder only when nothing in it was written for an hour and every running `java` process started after its last write, so sourcing it does not break a live run.

These scripts source it: `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, `repair-r1-atomic-static/run-subset.sh`, `baseline-2026-09-19/microgpt-phase.sh` and `experiment/setup.sh`. The count stage's and the distance stage's `run.sh` do not source it, and their headers tell the caller to do so.

**Conditions:** `FORTRESS_HOME` follows the location of the copy of `env.sh` that is sourced.

**Consequence:** A worker does not source `env.sh` and sets up each call with the skill's lines (`build-and-caches.md`, "Setting up each call"), including before the count and distance stages.

**Evidence:** Read in the scripts; the deletion rule also in `coordinator/process-engineering/build-efficiency.md` section 4.

**Could not resolve:** "instead": I read it as "instead of sourcing `env.sh`, as those headers ask". It can be resolved. The script paths are relative to `explorations/`. Minor.
