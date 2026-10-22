<!-- Cold read 2 of the f9 batch of FACTS entries (F-250, F-251, F-254, F-255, F-256, F-99 to F-104, F-203), with only CLAUDE.md and the fortress-repo skill as context. -->

# Cold read 2: facts f9

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and from its `references/`: `compiler.md`, `interpreter.md` ("What walk checks"), `tests-writing.md`, `tests-running.md`, `build-and-caches.md`, `gate.md`, `records.md`, `library.md`. Nothing else.

One point holds for every entry below that lists `XXX` compiled tests (F-250, F-251, F-255, F-256). The skill defines an `XXX` test as a deferred defect: it "asserts the answer that the specification gives, and fails today", and goes red "when the defect is fixed" (`tests-writing.md`). These entries use `XXX` compile tests to pin a refusal that is correct now. For example, `XXXWhereBoundFunctionCall` "refuses `g("s")`", and that is the behaviour that F-250 establishes. From the compiled `XXX` rule ("each command must fail", with `compile_err_contains` pinning the message), I read these tests as pins of a correct refusal, not as defects. But no entry says this, and for some names I cannot tell which kind a test is (noted per entry).

---

## F-250, "Inside a declaration, the compiled checker reads a `where` clause's trait constraint ..."

**Established:** The compiled checker treats a `where`-clause trait constraint `X extends B` as a bound on `X` inside the declaration that carries the clause. When the constraint is on the declaration's own static parameter, the checker also puts it into that parameter's bound in the declaration's function type (its arrow). So every call is checked against the constraint, as it is against an ordinary bound.

**Conditions:**
- A method's `where` constraint on the static parameter of the trait or object around it bounds that parameter inside the method's body.
- A call to a function whose own constraint is broken by an inferred argument is refused (`g("s")`).
- The limit: a static argument written explicitly at a top-level call is not checked against the bound, so `g[\String\]("s")` is accepted (gap-ledger row 470).
- Dotted calls, uses of a type, and `comprises` clauses are covered by F-256, not here.

**Consequence:** A worker can rely on `where` constraints inside a body and at calls whose static arguments are inferred. A worker must not rely on them at a top-level call with explicit static arguments (row 470). The library edits named here (F-242's generic `distribute` and the `where` conditions on `SumReduction`'s `distribute` overloads for `MAX` and `MIN`; F-85's `cast[\T\](0)` and `cast[\T\](1)` fallbacks, and `embiggen` typed `BigReduction[\T,T\]`) came with this reading.

**Evidence:** The tests `compiler_tests/WhereBoundMethodChecker` (bound in a method body) and `compiler_tests/XXXWhereBoundFunctionCall` (refuses `g("s")`), plus ledger row 470 for the hole. Detail: `explorations/compile-ladder/rung-library-distribute/REPORT.md` section 1.

**Could not resolve:**
- "The library edits that landed with this reading": I can read this two ways. Either those edits depend on this reading (so removing it would break them), or they only landed in the same change. Unclear wording.
- "F-256 holds where the checker reads the constraints at a dotted call ...": I take it to mean "F-256 records where ...". Read literally, "holds where" could also mean "F-256 is true only at those places". Unclear wording, minor.
- "a method's condition": I take "condition" to mean the method's `where`-clause constraint. The word is never defined, but F-255 and F-256 use it the same way. Minor.
- `XXXWhereBoundFunctionCall`: as noted at the top, the name says expected failure (defect), but the entry presents the refusal as correct behaviour. Clash between the skill's definition and this use.
- `cast[\T\](...)`, `embiggen`, `BigReduction`: library names that the skill does not define. I do not need them to understand the fact.

---

## F-251, "A type `where`-clause variable of a `comprises` clause is opened at a call, as a size is ..."

**Established:** A type variable that a `comprises` clause binds in its `where` clause (as in `comprises { List[\E\] } where [\E\]`) is "opened" at a call. Opening means the checker gives it a fresh type that belongs to that call only. The checker already does this for a listed type's `nat` and `int` sizes (F-146). `AnyList` now has this clause in the library. It used to be a comment.

**Conditions:**
- The fresh type is bounded in two ways: by the bound in the clause's binding (`[\E extends B\]`), and by the clause's own constraints on the variable (F-256).
- The checker refuses the fresh type where the declared type is a different type, so the fresh type cannot escape.
- Two values get two different fresh types.
- The checker refuses the shape of Amin and Tate's 2016 unsoundness example.
- Limit: the checker does not open such a trait when it reaches the trait as a parent of the argument's type (row 752).
- Under walk, the variable is bound as a "symbolic type" at load.
- On the rung's own tree, the distance fell from 49 to 45. These were the four sites of row 636: `AnyList`'s `||` is now accepted, and `addLeft`, `addRight` and the comprehension's unwrap were respelled. The count and "walk's element types" did not change. These numbers are the rung's measurement, not current values.

**Consequence:** A worker can write a `comprises ... where [\E\]` clause and expect calls on such a value to typecheck through a fresh type for each call. The worker must expect refusals where that type would leak or be mixed with another value's type. Opening does not happen through a parent (row 752).

**Evidence:** The tests `compiler_tests/OpenTypeChecker`, `XXXOpenTypeEscapeChecker`, `XXXOpenTypeTwoChecker` and `XXXOpenTypeBoundEvidenceChecker`, and `tests/OpenTypeWalk` and `AnyListElementTypeWalk`. Detail: `explorations/compile-ladder/rung-anylist-comprises/REPORT.md`.

**Could not resolve:**
- "Walk binds the variable as a symbolic type at load": "symbolic type" is a concept I lack. `interpreter.md` mentions "a symbolic type" but does not define it. "At load" also reads two ways: one type for the whole run, or one type per value or call. Concept I lack.
- "It does not open such a trait where it reaches it as a parent": the entry does not say what the checker does there instead. It might accept the value unopened (unsound), or it might refuse it. Unclear wording, or an omission.
- "walk's element types did not change": I cannot tell what these are. Perhaps the run-time element type that walk gives a list built through `AnyList`, given the test `AnyListElementTypeWalk`. Unclear wording.
- "the list comprehension's unwrap were respelled": the skill does not give me the unwrap of a list comprehension. Concept I lack. It is minor to the fact.
- "is opened at a call": the entry does not say whether a call is the only place where opening happens. Other places would be a `typecase`, a local binding, or a field read. Limit not stated.
- The three `XXXOpenType*` tests: I read them as pins of correct refusals (escape, two values, the Amin and Tate shape), but see the note at the top.

---

## F-254, "In the compiled checker, a function or method that leaves out its return type takes it from ..."

**Established:** In the compiled checker, a function or method declared in a component without a return type gets one from the exported api. The checker looks for the one api declaration with the same name whose parameter types equal the function's own. It compares types with `ExportChecker.equalTypes`, and a parameter left untyped in the component matches any type.

**Conditions:**
- This works only if exactly one api declaration of that name matches. If none match, or several do, nothing is taken and the declaration stays as written.
- The choice no longer depends on the JVM's identity-hash order of declarations. No output of the count or distance stage is now known to depend on that order (F-232).
- The error at `Library/FortressLibrary.fss:130` (`BIG LEXICO`'s omitted return type) used to come and go with that order. It is now gone from both stages.

**Consequence:** A worker may omit a return type in a component when the api declares it with matching parameter types. A worker should expect no return type to be taken when the match is ambiguous or missing, and should not expect the count or distance to change from run to run because of hash order.

**Evidence:** Read in `scala_src/typechecker/ApiTypeExtractor.scala:77-126` and `:193-209`. Tests: `compiler_tests/OmittedReturnTypeFromApi` and `OmittedMethodReturnTypeFromApi`. Detail: `explorations/compile-ladder/rung-checker-four-rows/REPORT.md` sections 1 and 5.

**Could not resolve:**
- "the declaration is left as written": the entry does not say what follows for a declaration with no return type. The checker might infer the type from the body, or it might report an error. Unclear consequence.
- "the exported api": a component can export several apis. The entry does not say whether all of them are searched. Unclear wording, minor.

---

## F-255, "The compiled checker reads conditional extension in its subtype relation ..."

**Established:** Consider a trait or object whose `extends` entry has a `where` clause that binds no variable and holds only trait constraints (`X extends B`). The compiled checker makes it a subtype of the extended type exactly at the instances where those constraints hold.

**Conditions:**
- These are checked with the constraints assumed: the `extends` entry itself, an object's value parameters, and every member.
- These are checked without the constraints: the static parameters, the declaration's own `where` clause, its `excludes` and `comprises` clauses, and its other `extends` entries.
- `throws` clauses and contracts of traits and objects are dropped by the disambiguator, so they are not checked at all (row 781).
- A `where` clause that binds a variable, or that holds a constraint that is not a trait constraint, still gives an unconditional parent, at every instance.
- Limits:
  - A member checked under the condition can still be called where the condition fails (row 773).
  - Walk and the compiled run time treat the extension as holding at every instance (row 774).
  - Other readers in the checker differ. Readers that go through the parents (`TypeAnalyzer.ancestors`, which the overloading checker uses to let a concrete method implement an abstract one) see the conditional parent at no instance. Readers of the clause itself (`TypeAnalyzer.excludesClause`, the inherited `excludes`) see it at every instance. None of these changed a result on the library, and no ledger row tracks them.
- In the library, `List` extends `LexicographicOrder[\List[\E\],E\]` only where `E extends StandardTotalOrder[\E\]`. `ZeroIndexed[\E\]` and the element-wise `opr =` are outside the condition, so every list has them (`Library/List.fss:106-107`, `:124-128`).
- On the rung's tree, against climb batch 17's gate, the site `FortressLibrary.fss:2063` was cleared and no site was added.
- The code generator compiles a type that inherits through a conditional parent, because its analyzer reads that parent at every instance.

**Consequence:** A worker can use conditional extension in the library and get the conditional subtype in the checker. The worker must not count on it at run time (walk or compiled), where the parent holds always. The worker must not count on the checker stopping calls to a conditionally checked member where the condition fails. The worker must also know that the `ancestors` and `excludes` readers in the checker give inconsistent answers, and that no ledger row tracks this.

**Evidence:** The tests `compiler_tests/CondExtendChecker`, `XXXCondExtendRefuseChecker`, `XXXCondExtendUnconditionalEntryChecker`, `XXXCondExtendExcludesChecker`, `XXXCondExtendComprisesChecker`, `XXXCondExtendParamBoundChecker`, `XXXCondExtendExcludesWhereChecker` and `CondExtendInheritedMember`, and `tests/XXXConditionalExtensionTypeTestWalk`. Also `Library/List.fss` lines. Detail: `explorations/compile-ladder/rung-checker-conditional-extension/REPORT.md` sections 1, 6 and 10.

**Could not resolve:**
- "every member are checked with the constraints holding": this reads two ways. (a) Every member of the declaring trait or object is checked assuming the condition, including members that have nothing to do with the conditional parent. This is what the text says, and it fits row 773's hole. (b) Only the members that implement or inherit from the conditionally extended type. Under reading (a), it is also unclear what happens when two `extends` entries carry different conditions. Unclear wording, and it matters for what a worker may write in a member.
- "a constraint that is not a trait constraint": the skill names no other kind of `where` constraint, so I do not know what is excluded. Language concept I lack.
- "Other readers of the `extends` clause in the checker ignore the condition": the next two sentences say that one group sees the parent at no instance. That is not "ignoring" the condition but dropping the parent. Unclear wording, minor.
- "this cleared the site `FortressLibrary.fss:2063`": the entry does not say whether this is a site of the count stage, the distance stage, or both. Unclear wording.
- The seven `XXXCondExtend*Checker` tests: I cannot tell from the entry which ones pin a correct refusal and which ones record a deferred defect. `XXXCondExtendExcludesChecker` might pin the `excludes` inconsistency, for example. The walk test `tests/XXXConditionalExtensionTypeTestWalk` reads as a deferred defect (row 774).

---

## F-256, "The compiled checker checks a `where` clause's trait constraints where they apply."

**Established:**
- **Dotted call:** a candidate method whose `where` clause constrains its trait's or object's static parameter is not applicable when the receiver's static argument breaks the constraint. The message is "Method Holder[\String\].showIt is not applicable: its where clause requires String to extend Shows."
- **Size variables:** if a function's or method's `where` clause has a trait constraint, its `nat` and `int` variables become static parameters of the arrow and are inferred at the call. A constraint whose bound names such a variable is met if some value of the variable meets every constraint. When the type variables' solutions leave only size constraints, the solver tries a second time.
- **Use of a type:** a trait's or object's own constraint is checked wherever the type is used, with the bound's message, and also at a constructor call through the call's type.
- **`comprises`:** a type `where`-clause variable of a `comprises` clause is bounded by its binding and by the clause's constraints. This holds where the variable is opened (F-251) and when an extender is checked. In a self-referring bound such as `E extends StandardTotalOrder[\E\]`, the opened type stands for `E`.

**Conditions:**
- A function's or method's own type `where`-clause variable is refused at name binding ("E is undefined.") by both walk and the compiled path. So only `nat` and `int` variables reach the inference.
- Not checked:
  - at a dotted call, a constraint whose bound names the method's own static parameters or `where`-clause variables;
  - at a type's use, a constraint whose bound names a `where`-clause variable;
  - a static argument written at a top-level call (row 470).
- Walk still runs a dotted call that breaks a method's condition (row 777).
- A `comprises` clause's `where`-clause variable captures a static parameter of the same name in another declaration's bound (row 778).
- These checks moved no site of the count or the distance. F-53 holds the current values.

**Consequence:** A worker can expect the checker to refuse these: dotted calls that break a method's condition, uses of a type that break its own constraint, and extenders that break a `comprises` clause's constraints. A worker cannot give a function or method a type variable in its `where` clause, and should use only `nat` and `int` there. A worker must avoid reusing a `comprises` `where`-variable's name as a static parameter elsewhere (row 778). A worker must not assume walk enforces method conditions.

**Evidence:** The tests `compiler_tests/XXXWhereBoundDottedCallChecker`, `WhereVariableBoundCallChecker`, `XXXWhereConstraintTypeUseChecker`, `XXXWhereConstraintExtendsChecker`, `XXXComprisesWhereBoundExtenderChecker`, `OpenTypeWhereConstraintChecker`, `XXXComprisesWhereConstraintExtenderChecker` and `OpenTypeWhereSelfBoundChecker`. Detail: `explorations/compile-ladder/rung-checker-where-checks/REPORT.md` sections 1 and 6, and `SKEPTIC.md` beside it.

**Could not resolve:**
- "a `comprises` clause's `where`-clause variable captures a same-named static parameter in another declaration's bound (row 778)": this sentence follows "Walk still runs ...", so I cannot tell whether the capture is walk's defect, the checker's, or both. "Another declaration's bound" is also vague: it could be any declaration in the component, or a declaration that the clause lists. Unclear wording, and it decides whom the hazard affects.
- "the solver tries once more to solve them": I cannot tell what this second try changes, for example whether sizes are then defaulted or searched. It is minor for a worker. Unclear wording.
- "with the bound's message": I take it to mean the same message that a broken ordinary bound gives. Minor.
- The `XXX*` tests: I read them as pins of correct refusals, as noted at the top.

---

## F-99, "The gate's thread count is pinned in the build file for the two suites, not in the calling shell."

**Established:** `build.xml` pins `FORTRESS_THREADS=4` for `testFast`, through its `fastTrack` macro, and for `testSystem`, through its `systemShard` macro (P-125). `fastTrack` also pins `JAVA_FLAGS` to `-Xmx4g -Xss64m`, because a compiled test's run step (`bin/run`) takes its heap and stack sizes from `JAVA_FLAGS`.

**Conditions:**
- Without the pin, the suites would inherit the caller's thread count: half the CPUs if `FORTRESS_THREADS` is unset, or 1 under `env.sh` (F-203).
- With `JAVA_FLAGS` unset, `bin/run` gives threads the JVM's default 1 MB stack. At four threads, `library_tests/TimingRungT` then overflowed in 8 of 12 runs (row 640).

**Consequence:** What the shell exports does not change the suites' thread count or the compiled run steps' memory flags. A worker need not set them for the suites, and should not remove the pins.

**Evidence:** `build.xml`'s macros, as described. No test is named. Detail: `explorations/coordinator/process-engineering/build-efficiency.md` section 6. The overflow measurement is under row 640.

**Could not resolve:** Nothing that blocks. The title says "the gate's thread count", but the body covers only the two suites. The gate's atomic runs set four threads themselves (`gate.md`). Minor.

---

## F-100, "`ant compileAll` deletes the caches folders ... when the implementation changed, and keeps them otherwise."

**Established:** `ant compileAll` compares each caches folder's `implementation.stamp` with the new build's stamp. If they differ, it deletes `default_repository/caches` and `local_repository/caches`, and with them the linker's untracked `global.map`. If they match, it keeps them.

**Conditions:**
- After a deletion, `fortress run` dies with `NoClassDefFoundError: fortress/CompilerLibrary$GeneratorZZ32` until the library order has refilled the five library jars, which takes about two minutes.
- `ant cleanCache` deletes both folders whatever the stamp.
- `Shell.resetRepository` empties the calling run's caches folder (`ProjectProperties.CACHES`). `CompilerJUTest` and `LibraryJUTest` call it unless `fortress.junit.reset` is false. I read "as `testFast` sets it" as: testFast sets it to false.
- A `fortress compile` after rebuilding the compiler does not clear the caches.
- The linker writes a missing `global.map` again, empty.

**Consequence:** After a build that changed the implementation, a worker runs the library order before any compiled run. A worker does not expect `fortress compile` to notice a stale cache.

**Evidence:** The stamp comparison in the build, described. No test is named. Detail: `explorations/coordinator/process-engineering/build-efficiency.md` section 2. The skill's `build-and-caches.md` agrees, for `default_repository/caches`.

**Could not resolve:**
- `local_repository/caches`: the skill never mentions `local_repository`, so I do not know what uses this folder. Term I lack (repository layout, not language).
- "unless `fortress.junit.reset` is false, as `testFast` sets it": this could mean testFast sets it to false, which `tests-running.md` supports, or it could mean only that testFast sets the property. Unclear wording, minor.

---

## F-101, "`harness-one.sh` keeps its Fortress cache between calls."

**Established:** `explorations/compile-ladder/rung-inference-walk/harness-one.sh` keeps its cache in `<scratch-dir>.cache` between calls. It reuses the cache as long as the built implementation and the Fortress sources on the source path are the ones that filled it. `COLD_CACHE=1` empties the cache first.

**Conditions:** The cache is reused only while both the build and the sources are unchanged.

**Consequence:** Repeat calls are fast (the skill says about 4 s, against 15 to 25 s cold). A worker forces a cold start with `COLD_CACHE=1`.

**Evidence:** The script. Detail: `explorations/coordinator/process-engineering/build-efficiency.md` sections 1 and 4.

**Could not resolve:** Nothing.

---

## F-102, "An `XXX*.fss` in the interpreter corpus is a gated expected-failure test."

**Established:** In `ProjectFortress/tests/`, `SystemJUTest` treats a file whose name starts with `XXX` as a test that must fail. The suite goes red if such a test passes.

**Conditions:**
- An `XXX` test needs a `.test` file only to name a refusal at load (the `load_exception_contains` key), the same as any other program in `tests/` (F-29).
- An `XXX` test that imports an api together with its component, as `XXXImportImportCollision.fss` does, takes both from `ProjectFortress/test_library/`.
- The compiled corpora follow a different rule (F-103).

**Consequence:** To record a deferred walk defect, a worker writes `tests/XXXName.fss`, and adds a `.test` only for a refusal at load. Its helper api and component go in `test_library/`.

**Evidence:** `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:780-782` and `:394-412`. The skill's `tests-writing.md`, "How `XXX` works".

**Could not resolve:**
- "so it needs no new api folder": I do not know what an "api folder" is, or when a test would otherwise need one. Unclear wording, minor.

---

## F-103, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express, in one `.test` file, a program that compiles and then fails at run time."

**Established:** In the compiled test folders, the `XXX` prefix on a `.test` file's name makes every command that the file drives a must-fail. So one `.test` file cannot say "compiles, then fails at run time".

**Conditions:**
- Such a defect needs two `.test` files over one component: a plain-named one that drives `link`, and an `XXX` one that drives `run`.
- A failure at compile time needs one `XXX` compile test.
- An `XXX` compile test with `compile_err_contains`, whose program compiles, is red ("Saw wrong failure").

**Consequence:** For a run-time defect, a worker writes the pair. For a compile-time refusal, the worker writes one `XXX` compile test.

**Evidence:** The skill's `tests-writing.md`, "Writing an `XXX` test". Detail: `explorations/compile-ladder/rung-tryatomic/REPORT.md`, "The measured defect, and its home".

**Could not resolve:** Nothing that blocks. `other_compiler_tests/` is not named. It probably follows the same rule, but the skill says to put no new test there.

---

## F-104, "A thrown `CompilerError` takes a third path through the test harness ..."

**Established:** The harness checks three streams of a command: output, error output, and thrown exception. `Shell` does not catch a `CompilerError` from the code generator, for example a code-generator wall (`sayWhat`). So the error reaches the harness as an exception, and the harness attributes it to the component that the `.test` file's `tests=` line names. It is checked with `compile_exception_*` keys.

**Conditions:**
- If that component's name contains `XXX`, a link or compile exception is green whatever the `.test` file's own name. Only an unmet key for that command makes it red.
- A `compile_exception_contains` key pins the wall's text. The test then turns red when the wall goes away or its text changes.

**Consequence:** A worker who records a code-generator wall should name the component `XXX...` and pin the text with `compile_exception_contains`. The worker must know that the `.test` file's name does not decide this case. The component's name does.

**Evidence:** Detail: `explorations/compile-ladder/climb-batch-2/REPAIR-review.md` section 2. The skill's `compiler.md` (walls) and `tests-writing.md` agree.

**Could not resolve:** Nothing that blocks. The title names only `compile_exception_*` keys, while the body covers link exceptions too. I assume `link_exception_*` exists by the key grammar in `tests-writing.md`.

---

## F-203, "`explorations/experiment/env.sh` sets up a shell for the gate's runners ..."

**Established:** `explorations/experiment/env.sh` does the following:
- It sets `FORTRESS_HOME` to two folders above its own location, and overwrites any value already set (`env.sh:4`). So sourcing another tree's `env.sh` runs that tree's code.
- It sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`, and unsets `JAVA_TOOL_OPTIONS`.
- It deletes a `/tmp/fortress*rats` parser folder only if nothing in that folder was written for an hour and every running `java` process started after the folder's last write.

**Conditions:**
- Scripts that source it:
  - `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`;
  - `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh` (the gate's ladder regression), each of which then sets its own `JAVA_FLAGS`;
  - `experiment/setup.sh`.
- `microgpt-phase.sh` names the main tree's `env.sh` by absolute path. The gate rewrites that path in its copy.
- The count stage's and distance stage's `run.sh` do not source it. Their headers tell the caller to source it first.

**Consequence:** A worker does not source `env.sh`. The worker starts each Bash call with the skill's setup lines, which give the same settings. A worker must never source another tree's `env.sh`, since that silently runs the other tree. Sourcing it does not break a live run's parser folder.

**Evidence:** Read in the scripts. The deletion rule is also in `explorations/coordinator/process-engineering/build-efficiency.md` section 4.

**Could not resolve:**
- "sets up a shell for the gate's runners": "the gate's runners" could mean the scripts the gate runs (the ladder drivers) or the agents who run the gate. Unclear wording, minor.
- "which give the same settings": `build-and-caches.md` lists two differences (the tmp directory, and no parser-folder deletion). The entry's "same" is loose, but the skill settles it. Minor.
