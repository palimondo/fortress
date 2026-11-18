# Cold read: climb-batch-33 record landing, `clean.txt`

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these references for terms: `compiler.md`, `records.md`, `tests-writing.md`, `interpreter.md`, `library.md`, `exploring.md`. I did not read `revival-changes.md`, `sources.md`, the record, git or any report. The file holds 24 entries: 23 facts and one position (P-12).

## F-9

- **Established:** By default, `fortress typecheck` checks a program against the compiled path's own library, not the interpreter's library that walk runs. So its verdict on a walk program means little. Setting `FORTRESS_LIBRARY=one` makes it check against the one library instead. Walk cannot run the checker on its own programs today: walk switches type checking off, the Scala checker is not wired into it, the old Java checker is gone, and walk's evaluator has no case for the `CoercionInvocation` nodes that the checker inserts.
- **Conditions:** It holds for the default selection. The claim about `CoercionInvocation` rests on reading the code, not on a run.
- **Consequence:** Do not use `fortress typecheck`'s default verdict as a type check of a walk program. Before P-12 can be built, walk needs the checker switched on and a case for `CoercionInvocation`.
- **Evidence:** `Shell.java` calls `useCompilerLibraries()` for the command (F-381); row 69 (`f(i: Index)` passes); `compiler/StaticChecker.java:228-229`; row 833, by reading.
- **Could not resolve:**
  - "under it, `f(i: Index)` passes the check (row 69)": unclear wording. "it" can be the default compiler library or the `one` selection. The entry also does not say why passing matters: is the acceptance wrong, or does it show that the check is too weak?
  - "the compiler's library, `Library/CompilerLibrary.fsi`": unclear wording. The skill (`compiler.md`, "The compiler's prelude") makes the prelude three files, F-293 calls `CompilerSystem` "a fourth file of the compiler's library", and P-12 says "the compiler's prelude" for the same fact. Naming one file as "the compiler's library" conflicts with both.
  - "the Java checker is gone": I lack the background. The skill does not say that a Java checker existed, but the meaning (it no longer exists) is clear.

## F-34

- **Established:** On the code of `c3b16ef2d1`, with the interpreter's library, the code generator refused 17 declarations across the fourteen components that the distance stage checks, and emitted 742. All 17 pass the checker. They fall into five kinds: varargs 9, a type variable missing from the kind environment 4, a closure class written twice 2, an intersection as a receiver 1, and `WriteStream`'s varargs methods in `NamingCzar.jvmSignatureFor` 1. The kind-environment and intersection-receiver walls have since been fixed. On the code of `d3747846c1`, the count was not measured. By reading, 12 still stand and 0 to 2 more may, so 12 to 14 are expected. The count can be taken only on a patched scratch tree, because without the patch the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes.
- **Conditions:**
  - The measure uses the distance stage's setting (F-53).
  - A declaration counts at its first wall only.
  - The measure skips dispatch methods and runs no emitted class, so it misses classes that fail when they load. The JVM's verifier and load-time failures are outside it.
  - Each code was measured once.
  - No test checks the count, because the gate's distance stage does no code generation.
- **Consequence:** After the switch-over, the code generator is still an obstacle between the one library and bytecode, mainly varargs (9), the closure class written twice (2) and `WriteStream` (1). To take the count again, patch a scratch worktree as `compile-ladder/plan-31/PROBES.md` gives, then run `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`.
- **Evidence:** One measured run on `c3b16ef2d1` (`measure-c3b16ef2d1.txt`); one run each on `18d5b51578` (15 refused, 5 kinds) and `e0a5274db2` (16 refused, 4 kinds); reading for `d3747846c1`; rows 874, 624, 822, 812, 315, 540; `PROBES.md` section 3; `reviews/batch-33-review.md` section 3.
- **Could not resolve:**
  - "the checker's failures caught per declaration, and the bound `Any`": unclear wording. I cannot tell which bound is set to `Any`, or on what. One reading is that unbounded type parameters are read at `Any`. Another is that generic extensions are compiled with `Any` as the static argument (`compiler.md` says that a trait extending a generic trait compiles with `Any`). F-53 is not given.
  - Which declarations make up which kind: unclear wording. The entry names `ArrayList`, `APPCOV`, `__filter`, `app` and `__bigOperator2` as the five that the repairs reach, but does not assign them to the 4 and 1. So I cannot check why the kind-environment repair alone left 15 declarations in 5 kinds and not 4. That would mean a new kind appeared, which the entry does not name.
  - What `d3747846c1` is: unclear wording. The text implies that it carries both repairs ("the 12 that neither repair reaches stand") but does not say so.
  - "on its own code alone": readable as "each repair's commit, without the other repair". I took it that way.

## F-76

- **Established:**
  - The compiled checker accepts the specification's `comprises` example of the Meet Rule. It does this with a coverage check: several declarations below two overloads count as their meet if together they cover it, as the `comprises` clause lists. The coverage check is used only in overload checking, not in the subtype test.
  - Some calls tie: the argument's static type lies below closed traits but above the types that they list, and several most-specific declarations fit without coercion. The checker types such a call by the intersection of those declarations' return types.
- **Conditions:**
  - Coverage refuses a pair when a declaration that it compares has static parameters (row 546).
  - In an accepted family that has another generic declaration, such a call takes the first minimal candidate in build-dependent order, not the intersection (rows 935, 543).
  - The comprises check looks only at immediate subtypes, so a type in another component below a generic subtrait escapes it (row 487).
  - The verdict can depend on what the same JVM compiled before (row 547).
- **Consequence:**
  - Expect intersection-typed call results.
  - On the compiled path, a method call on such a value runs on the conjunct with the chosen declaration (F-386).
  - A generic declaration instantiated at an intersection dies at load (row 559), so do not instantiate one there.
  - Do not rely on a deterministic type when the family holds other generics.
- **Evidence:** It builds P-60; gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`; `compile-ladder/rung-return-type-rule/decision-record.md` sections 3 and 4.
- **Could not resolve:**
  - "That narrower scope than P-60's is a default": unclear wording. "That narrower scope" can be the restriction to ties without coercion, the exclusion of generic declarations from coverage, or the use of coverage in overload checking but not in subtyping. "a default" is not defined in the skill. I read it as a choice not yet decided by the curator, but whose choice it is, and whether a worker may change it, is not said.
  - "closed traits": a language term not defined in the skill. I read it as traits with a `comprises` clause.

## F-181

- **Established:**
  - The code generator compiles function, method, object and trait declarations whose own header has a `where` clause, and emits nothing for the clause. Only the checker enforces its constraints.
  - It refuses any function or method with a contract (`requires`, `ensures`, `invariant`). The disambiguator drops a trait's or object's contract before code generation, so neither path checks one.
  - Walk checks a function's `requires` and raises `CallerViolation`.
  - An array comprehension has no code-generator case either.
- **Conditions:**
  - A local function compiles as a closure, except in the four forms that F-320 names.
  - A trait whose `comprises` lists a type at a `where`-clause size (`NatParam`'s shape) compiles, but a certain call on its value fails verification (row 307).
  - Where a listed generic type gives a member's body, the member now compiles (row 812, fixed; F-384).
  - A function's or method's own `where`-clause variable compiles, but the compiled call dies with `NoClassDefFoundError` (row 867).
- **Consequence:** Write no contract on a compiled function or method. Expect `where` constraints to be enforced only statically on the compiled path. For a call that introduces a `where`-clause variable, copy the form of the `XXXWhereVariableCallCompiled` pair, and expect it to die at run time.
- **Evidence:** Rows 701, 781, 774, 307, 812, 867; tests `WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`, `XXXFunctionContractCodeGeneration`, `XXXNatOpenRun`, `XXXWhereVariableCallCompiled`; `rung-codegen-where/REPORT.md` sections 1, 2 and 5.
- **Could not resolve:**
  - "a call that opens its value to the size": unclear wording. `compiler.md` ("The checker's gaps") gives it as a call that passes a value of such a trait where a listed type is expected. I could not have read it from the entry alone.
  - "such a clause" in "a generic type that such a clause lists": unclear wording. The clause was just introduced at a size (`NatParam`), but a listed generic type needs a type variable (`AnyList`'s shape).
  - "the four forms that F-320 names": `compiler.md` ("What the compiled path cannot compile yet") lists three refused forms of local function (row 304). I cannot tell whether F-320 adds a fourth or counts differently.
  - `compiler.md` still says that the code generator crashes for row 812. The entry says that row 812 is fixed, so the skill is stale there.

## F-225

- **Established:**
  - Take a self-typed trait `C[\X\]` whose parameter `X extends C[\X\]`, with no `comprises` clause or only `comprises { ... }`. The compiled checker types `self` inside its method bodies as `C[\X\] & X`, read from the F-bound.
  - The method signatures keep `self` at plain `C[\X\]`, except in the overloading check's exclusion test (F-277).
  - The checker refuses an extender at another type: `object Bad extends Integral[\ZZ32\]` is refused, because `Bad` is not a `ZZ32`.
  - Where `comprises` lists types, `self` is the trait met with their union, and the exclusion test reads signatures plain.
  - The rule accepts every self-typed body of the library except `Integral`'s `numerator`, which each integer type declares itself.
  - Walk has no such rule and loads what the checker refuses.
  - Compiled default bodies that return `self` at the self-type parameter run (F-377), and so do those that call a method on a value of that parameter (F-385).
- **Conditions:**
  - The rule refuses `PureList`'s `List` (row 355), rightly.
  - A generic object that lists the trait first may still fail (F-385).
  - The prelude's `comprises T` spelling on `StandardTotalOrder` and `Equality` is not followed for the one library. Naden's text puts the self type in bounds only, and Steele's commit message gives the same meet that the F-bound gives.
- **Consequence:** Make each extender of a self-typed trait `C[\A\]` an `A`. In method bodies you may use `self` as an `X`. Callers see `self` at `C[\X\]`. Do not copy the prelude's `comprises T` spelling into the one library.
- **Evidence:** It builds P-146; rows 695, 1050, 1051, 1052, 355, 710; `Library/CompilerAlgebra.fsi:16`, `:24`; commits `655e65d53` and `59fdeff62`; `Papers/Types/journal/justificationOfRTR.tex:626-630`; gated by `compiler_tests/SelfType*` and `XXXSelfType*`; `rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `rung-self-type-exclusion/REPORT.md` section 1.
- **Could not resolve:**
  - "The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are": unclear wording. I read it as `trait D[\X extends C[\X\]\] extends C[\X\]`, which is also treated as self-typed. "takes" could also mean "accepts". `Containment` is not explained.
  - "a default of the coordinator's": the skill does not define "default", and it names the coordinator only as a session role. I read it as an undecided choice, but I cannot tell whether a worker may depart from it.
  - "that spelling does not bind the one library": unclear wording. "bind" is used elsewhere in the record for native bindings and name binding. I read it as "is not a requirement on".
  - "save in the overloading check's exclusion test (F-277)": the entry does not say what the exclusion test reads instead. I took it to be the met type.

## F-281

- **Established:**
  - The compiled checker checks overloading for every operator, symbolic ones included. Its three loops (the top-level set, a trait's provided methods, and their overriding return types) all admit operators through `isCheckedName`.
  - The export check also reads every operator, each under its declared name only.
  - With all of this on, both the distance stage's total and the count stage's total are 0, with no crash.
  - Imports:
    - An on-demand import adds an api's declarations once, and leaves out the names in its `except`.
    - The check still reads an on-demand api's declaration of a name that the component imports by name from another api (row 813).
    - An `except` that lists an operator leaves the operator imported, on both paths (row 814).
  - Outside its trait, a self type whose `comprises` lists types at a `where`-clause variable is read as the trait type, so `AnyList`'s `||` is checked.
- **Conditions:**
  - The import gaps of rows 813 and 814 stand.
  - The zero holds for the one library as the stages check it.
- **Consequence:**
  - The distance stage is now a full overloading check. A new operator overload in the one library that breaks the rules will show in the stages.
  - Avoid `import A.{...}` beside a by-name import of the same name from another api.
  - Do not rely on `except` to drop an operator.
- **Evidence:** `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:766-773`; `TypeAnalyzer.selfComprised`; tests `XXXSymbolicOperatorOverloadUnrelated`, `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `OperatorPrefixInfixImport`, `ImportExceptOverload`; the stages' '#total 0' and '#crash none'; `rung-symbolic-check/REPORT.md` sections 1, 3 and 5; `reviews/batch-28-review.md` section 1.
- **Could not resolve:**
  - "So the distance stage is the full check of F-245": unclear wording. The entry does not say what F-245's full check is, so the sentence gives no content on its own.
  - "each under its declared name only": unclear wording. I cannot tell what the alternative is: an alias, an imported renaming, or the operator's other fixity.
  - "on-demand import": not defined in the skill. `compiler.md` gives `import A.{...}`, and I read the term as that form.

## F-282

- **Established:**
  - The compiled export check matches api members to component members in these ways:
    - a member by name and header;
    - a field by name, type and its modifiers other than `var`;
    - an object's value parameter by type and its modifiers other than `var`, but not by name (row 839);
    - a top-level variable by type, mutability (`var` or `:=`) and its other modifiers.
  - An api member written `abstract` must be declared by the component at its header, with or without a body. An abstract getter may also be met by a field of that name and type that is neither `hidden` nor `private`.
  - `FortressLibrary.fsi` now states its component's members at the component's headers (66 `abstract` members, `String`'s nine among them). It leaves out subscripts that were never built.
  - Where the api's type is the agreed type, the component takes it: `RR64`'s `truncate` returns `ZZ64`.
  - `String`'s api marks as `abstract` the members that its trait leaves without a body or does not declare, and it shares the component's `excludes`.
  - The export check finds no difference, so the distance stage holds no export error, with every api member counted.
- **Conditions:** It covers the members that the export check reads. A value parameter's name is not compared (row 839), and `compiler.md` gives the `NoSuchMethodError` that follows.
- **Consequence:**
  - Give each value parameter the api's name, because nothing checks it.
  - When changing an api of the one library, keep members at the component's headers, and write `abstract` where the component gives no body.
  - Walk's values of the moved members are held by a walk test.
- **Evidence:** Rows 839, 1028; F-297, F-286, F-287; tests `XXXExportMemberName`, `XXXExportFieldName`, `ExportVarFieldMatchesField`, `ExportComprisesEllipsisAbstract`, `ExportAbstractMemberDefined`, `XXXExportAbstractMemberAbsent`, `XXXExportAbstractMemberOtherHeader`, `ExportAbstractMemberBodyless`, `ExportAbstractGetterField`, `ExportVarObjectParameter`, `TopLevelVarByAssignExport`, `ProjectFortress/tests/ExportAlignedMembersWalk.fss`; the distance stage's per-site list; five report sections.
- **Could not resolve:**
  - "Where the api's type is the contract": unclear wording. In F-181 and in `compiler.md`, "contract" means `requires`/`ensures`/`invariant`. Here it seems to mean "the type that both sides must agree on". The two readings clash.
  - "it compares the component's abstract members against the api's": unclear wording. The entry does not say what the comparison refuses, for example a member that is abstract in the component but not in the api.
  - "the other members that the Detail's first two reports list": the members are named only in the reports, so the entry does not say which ones moved.

## F-293

- **Established:** `Library/CompilerSystem.fsi` and `.fss` are the compiled path's own `System` api (`args`, `getProperty`). They form a fourth file of the compiler's library, outside the three-file prelude. No program imports `CompilerSystem` by default: the compiled path imports by default the prelude's three files and `AnyType`, or the one library's files when `FORTRESS_LIBRARY=one` is set. 27 programs of `compiler_tests/` and one of `other_compiler_tests/` import it by name. P-37 names only the prelude's three files.
- **Conditions:** It holds on `main` as read; the count of importers is today's.
- **Consequence:** A compiled test that needs `args` or `getProperty` imports `CompilerSystem` by name.
- **Evidence:** Read in the tree; `WellKnownNames.useCompilerLibraries`; `reviews/phase3-exit/zero-audit.md`, "A.2 Scope".
- **Could not resolve:**
  - "P-37 names only the prelude's three files": unclear wording. The consequence is not drawn. I cannot tell whether P-37's freeze ("do not add a declaration to the three prelude files", `compiler.md`) leaves `CompilerSystem` open to edits, or whether the switch-over deletes it along with the prelude. Either changes what a worker may do with it.
  - "`AnyType`": a name that I lack. The skill does not say whether it is an api, a component or a file.

## F-302

- **Established:** HotSpot's C2 inlines to a frame depth of at most 16 at JDK 25's default `MaxInlineLevel=15`. In the loops measured, the prelude's `+` reaches `Object.<init>` under its result's box at depth 12, so 4 frames are left. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, because the temporaries' constructor chains no longer inlined and their boxes were no longer removed. So an operator called from more than 4 further inlined frames keeps its temporary boxes. By reading, the one library's `ZZ32` springboard chain is two classes longer than the prelude's: six classes against four, because a springboard extends the springboard of its trait's first `extends` entry. If `FZZ32` takes the one library's chain after the switch-over, the margin would be 2 frames. That is not measured.
- **Conditions:** Observed once (F-301). The one-library margin is read from the code, not measured.
- **Consequence:**
  - Keep hot arithmetic within a few inlined frames of the loop, or the boxes come back.
  - After the switch-over, the margin shrinks to 2 unless the springboard chain is shortened. Measure it then.
- **Evidence:** One observation (F-301); `Library/FortressLibrary.fss:846`, `:742`, `:381`, `:357`; `LibraryBuiltin/CompilerBuiltin.fsi:210`; `compiler/codegen/CodeGen.java:5892-5899`; `perf-probes/helper-calls/REPORT.md` sections 3 and 4.
- **Could not resolve:**
  - "In those loops": unclear wording. The title points back to loops that the entry never names; it seems to lean on F-301. The entry does not stand on its own here.
  - "a temporary box whose constructor chain passes the limit": unclear wording. "the limit" can be the default 16, the lowered 8, or the depth 12.
  - "a top-level binding at 10": unclear wording. Is this the depth at which `+` reaches `Object.<init>` when its result is bound at top level? Or the depth of the binding itself?
  - "springboard": a compiled-path concept that I lack, and the skill does not define it. From F-385, I guess that it is the class of a trait's default methods at an object, which a class extends.
  - "nothing runs against the one library yet": this conflicts in wording with F-352, where three programs ran against it in a scratch tree. I read it as "nothing on `main`".

## F-352

- **Established:**
  - A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks, on the code of `832f7d0d91`. In that tree, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library. The library's fourteen components were compiled to bytecode by name, in about 200 s.
  - Three programs ran there and printed walk's output: a line print, an `Array1` build and read, and a dot product in the program's own loop.
  - The runs met sixteen walls of two kinds:
    - walls that a prelude-compiled test can also show (rows 624, 81, 315, 990, 991, 992, 732). Of these, 624 and 315 still stand;
    - walls that only a tree switched onto the one library shows (rows 874, 995, 866, 942, 994, 993).
  - The verifier was off, so the number of verifier refusals is unknown.
  - A program's check takes about 1 s under either library on warm caches, and 17 s against the one library on cold caches.
- **Conditions:** Each figure was measured once. Nothing of the scratch tree landed, and no test holds its runs. On `main`, compile reads the prelude unless `FORTRESS_LIBRARY=one` is set (F-381).
- **Consequence:**
  - The switch-over still faces the second-kind walls: which run-time class carries each built-in type, the trait table's search by api names, the dispatch method's package, and `NN32`'s getters.
  - It also faces varargs and the duplicate closure class.
  - Rerun with the verifier on before trusting the emitted code.
- **Evidence:** One run each; `compile-ladder/plan-31/probes/switch-rehearsal.md` sections 2, 4 and 6; `model-closure-check.md` section 4; F-58 for microGPT.
- **Could not resolve:**
  - "sixteen walls of two kinds": unclear wording. The entry names seven rows of the first kind and six of the second, 13 in all. I cannot tell how 16 is counted: some rows may hold several walls, or rows 874, 995 and 866 may be one wall.
  - "which run-time class carries each built-in type, a choice that reaches the code generator's naming": readable, but I cannot tell whether this is one wall or three.

## F-353

- **Established:**
  - In F-352's scratch tree, one build served the compiled path with either library. The prelude's thirteen run-time value classes stayed. A second set of classes with the same names, in a second class folder put first on the class path, served the one library. Nine of the tree's hacks sat behind a selector that one environment variable set, at compile time and at run time.
  - One JVM serves one library.
  - The one-line program ran against both libraries, and the `Array1` and dot-loop programs against the one library, by hand and through `fortress junit`.
  - In a sample of 137 of the 876 `compiler_tests` files, no test was disturbed. The whole compiled tracks and walk were not run.
  - The second set's sources equal the first's under a map of eight names.
  - Only the thirteen classes plus `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector` and `FStringVector` link to a prelude class by name. Every other mention of the prelude is a string.
  - Compile times: 204 s for the one library's fourteen components, 25 s for the prelude's five.
- **Conditions:** Only in the scratch tree; nothing landed, and no test holds it. Timings were taken once on an idle machine. On `main` there is one set of run-time classes and the compile command's own selector (F-381).
- **Consequence:** A dual-library build is feasible with a shadowing class folder. The classes that a switch-over must touch by name are the listed ones. The prelude's other mentions are strings, which a by-name search of the code misses.
- **Evidence:** Constant pools of `ProjectFortress/build`; `compile-ladder/plan-31/probes/probe-y.md` sections 1, 2 and 5.
- **Could not resolve:**
  - "105 raise strings among them": unclear wording. I read it as strings that name an exception class to raise, but the entry does not say so.
  - "the prelude's five": unclear wording. The prelude is three files (`compiler.md`). F-293 adds `CompilerSystem` and `AnyType`, which might make five components, but the entry does not say which five.
  - "the thirteen": the entry never lists the thirteen value classes. I can only assume `FZZ32`, `FRR64` and the like.

## F-361

- **Established:**
  - On the code of `832f7d0d91`, a scratch tree merged the five number traits (`ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`) with their objects into value objects. The change touched 12 files (library text and 78 lines of walk's Java), with no checker, code-generator or model change.
  - In that tree, the checker count and the distance stayed 0, and microGPT's quick checks passed.
  - Of `ant testSystem`'s 830 tests, all behaved as expected except one: `XXXGenericBesidePlainReturnParam` passed for a wrong reason, because walk's load check loses a refusal at an object type (rows 550, 998).
  - The merge widened three gaps to the five types (rows 998, 997, 542).
  - A `typecase` arm naming a removed object such as `Int` matched every value silently (row 959).
  - On `main`, the five are value objects in both the one library and walk (F-379). Rows 998, 997, 542, 550 and 959 are fixed, and such an arm is now refused (F-382).
- **Conditions:** Measured once, in a scratch tree that landed nothing. No test holds it. The compiled tests and `ant testFast` were not run there.
- **Consequence:** Mostly history. The merge is on `main` and its gaps are fixed. The entry shows that merging number traits into value objects needs no checker or code-generator work.
- **Evidence:** One run on `832f7d0d91`; row 542 by reading; `compile-ladder/plan-31/probes/number-object-merge.md`, "Measurements" and "Obstacles, in the order met".
- **Could not resolve:**
  - "widens three gaps ... to the five types": unclear wording. I read it as "gaps that applied to object types now also apply to the five number types, because they became objects".
  - "row 997, passed in the scratch tree by one line of walk": unclear wording. I read it as a one-line change to walk's Java that worked around it.
  - "a removed object, such as `Int`": the skill does not say what `Int` was, or which names the merge removed.

## F-363

- **Established:**
  - A superscript after a dotted access or a parenthesised call works on both paths. `p.wq^T`, `B.n^2`, `B.f()^T` and `B.data[5]^2` apply the operator to the whole dotted primary. `(f(x))^T`, `(f(x))!` and `(a^b)!` run under walk as they do compiled.
  - `f(x)^T` and `f(x)^2` stay static errors on both paths, and the entry quotes both messages.
  - The parser reads a dotted primary as the front of the math items that follow it, so a subscript, a parenthesised item or a tight identifier after a dotted method call also parses.
  - A selector after a superscript (`B.data^T.v`) is a syntax error.
  - A superscript after a subscript that is its own math item (`x[5]^2`, `B.f()[5]^2`) compiles (F-387) but fails under walk (row 1). In `B.data[5]^2`, the subscript belongs to the dotted primary.
- **Conditions:** Neither the checker nor the code generator changed. The parser builds the same node kind that the parenthesised spelling built. Walk evaluates a parenthesised operand as one expression.
- **Consequence:** A model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx`. For both paths, parenthesise a call or a separate subscript before `^`.
- **Evidence:** `parser/Expression.rats:386-400`; `interpreter/evaluator/Evaluator.java:965-970`; tests `tests/SuperscriptAfterDottedAccess.fss`, `SuperscriptAfterParenthesisedCall.fss`, `SuperscriptAfterCallRefused.fss` with its `.test`, and three compiled `.test` files; `compiler_tests/SubscriptThenSuperscriptCompiled`; `rung-superscript-after/REPORT.md`.
- **Could not resolve:**
  - When a subscript is "part of the dotted primary" and when it is "a math item of its own": unclear wording. The examples suggest that the subscript belongs to the primary after a field access (`B.data[5]`) but not after a method call (`B.f()[5]`). The entry gives no rule, so for an unlisted form I cannot tell which path will fail.
  - "math items", "tight identifier": grammar terms that I lack. The skill does not define them. I read them as juxtaposed items and an identifier juxtaposed with no space.
  - The skill's `tests-writing.md` still says that `x[5]^2` stops the compile, which contradicts this entry and F-387.

## F-369

- **Established:**
  - A top-level tuple binding compiles. Each name becomes a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.
  - The checker gives the rebuilt tuple its tuple type. Where only some names declare a type and the right side is not a tuple expression of matching size, the checker checks the right side again against each name's type.
  - The code generator keeps the value in a hidden class `<Component>$tuple$<first name>`, with one class per name. A wildcard binds nothing.
  - Compiled top-level variables are initialised at first read, so an all-wildcard binding never runs its right side (row 1011).
  - Under walk, the right side runs once per name plus once more (row 1026).
  - Local tuple bindings with mixed typed and untyped names are checked the same way (row 1029, fixed). A typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed).
- **Conditions:** The run-count difference between paths stands under walk.
- **Consequence:**
  - Model lines of this form compile as written.
  - Do not put side effects in such a right side if both paths must agree.
  - Now that a name bound this way is typed as a single binding's is, `MicroGptFlat.fss:72`, `beta1 m`, shows a new checker error against the one library (F-58).
- **Evidence:** `scala_src/typechecker/impls/Decls.scala:272-277`, `:324-336`; `compiler/codegen/CodeGen.java:6825`; tests `TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`, `LocalTupleBindingMixedTypes`, `XXXLocalTupleBindingMixedRefused`; `rung-tuple-binding/REPORT.md`.
- **Could not resolve:**
  - "the model's lines 17 to 19": unclear wording. The model is two programs (flat and APL, per the skill), and the entry does not say which.
  - "a new checker site against the one library": unclear wording. I read it as a new place where the checker reports an error, but the entry does not say what the error is.

## F-377

- **Established:**
  - `CodeGen.castToTypeBelow` casts a value of self's type to a declared trait type or type variable strictly below its trait. Self's type here is the checker's `TraitSelfType` with a non-empty list: a trait with listed `comprises`, or with a self-type parameter.
  - The cast is added in these places:
    - a one-argument call's argument;
    - a typed binding;
    - an assignment;
    - a method's returned value;
    - each arm of a conditional or a `case`;
    - the conditional's type;
    - a function expression's or local function's result, also where the value is a typecase whose arms all have self's type.
  - So `den(self)`, `twin(self): S = self` and `mx` in a self-typed trait verify and run (rows 991, 695, 1050, 1051), as `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN`, `MAX` and `MINMAX` need.
  - Only `self` gets this reading: a variable declared at the trait is refused where a listed type is expected.
  - No cast is added where the value's type is below the declared type by `extends`.
- **Conditions:**
  - A typecase that mixes `self` with another value gets no cast (row 1070).
  - A trait listing a type at a `where`-clause variable gets none (row 307).
  - An outside assignment to a `var` field of a strict-subtype value fails with `NoSuchMethodError`, also for `c.r := self` (row 1053).
  - Two casts that the verifier does not need are undecided by the curator: one at a declared trait type strictly below self's trait (a planner's default), and the `checkcast R` at a `self` arm when the conditional's type is a trait type (a worker's choice).
- **Consequence:**
  - Rely on the casts at the listed places.
  - Avoid mixing `self` with other values in typecase arms.
  - Bind a value at the field's type before assigning it to a `var` field from outside.
  - Do not treat the two extra casts as settled.
- **Evidence:** Tests `ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeReturnSelfRun`, `SelfTypeReturnSelfAtTraitRun`, `SelfTypeArmRun`, `SelfTypeFromClosureRun`; `rung-comprises-cast/REPORT.md` and `rung-self-arm-closure/REPORT.md`, "What changed and why".
- **Could not resolve:**
  - "a planner's default" and "a worker's choice beyond the plan": the roles are not defined in the skill. The meaning, choices made without the curator, is clear from "The curator has decided neither".
  - Whether a worker may remove the two extra casts: the entry does not say.

## F-380

- **Established:** On the compiled path, a numeral converts where it stands in these cases: a numeral that ends a block after a local declaration, and each numeral element of a tuple. Where the place has a declared type (a return type, a typed binding, a parameter, an `if`'s other branch), the checker converts the numeral by the type's own coercion, and the code generator folds it into a constant. A numeral outside the type's range is a static error. Where the place fixes no type, such a numeral takes a numeral's default type (row 1060, fixed).
- **Conditions:** A `try` that ends in numerals keeps the numeral's own type and is refused (row 1074). So is a `case` or `try` whose branches are numeral tuples at an untyped tuple binding (row 1075).
- **Consequence:** A block or tuple ending in numerals is now safe at a typed place and at an untyped one, except the `try` and `case` forms above. Bind those at a declared type.
- **Evidence:** Tests `NumeralEndsBlockAfterDeclarationCompiled`, `BlockEndsInTupleOfNumeralCompiled`, `TupleBindingIfBranchesCompiled`, `NumeralJoinBeyondRange.fss` with `XXXNumeralJoinBeyondRange.test`, `NumeralEndsUntypedBlockCompiled`; `rung-numeral-block-end/REPORT.md`, "What changed and why"; `SKEPTIC.md`, "Findings and fixes".
- **Could not resolve:**
  - "a numeral's default type": a language concept that I lack. It is defined in `revival-changes.md`, "Numbers", which a cold reader may not open. I guess `ZZ32` for an integer numeral and `RR64` for one with a radix point.
  - "an `if`'s other branch": unclear wording. I read it as the branch whose type is fixed by the other branch, but the entry does not say "other" than what.
  - "keeps the numeral's own type there": unclear wording. "there" can be "at a place that fixes no type" or any place.
  - The skill's `compiler.md` ("Traps of the compiled path") still gives row 1060 as a run-time `NoClassDefFoundError` and says to declare the variable's type. This entry says that row 1060 is fixed, so the skill is stale.

## F-381

- **Established:** The compile command reads the one library when `FORTRESS_LIBRARY=one` or `-Dfortress.library=one` is set, and then keeps its caches in `default_repository/caches-one`. The selection is read once per JVM (`ProjectProperties.compiledPathUsesOneLibrary`), and `Shell.useCompilerLibraries()` follows it. The two class path scripts follow only the environment variable. Unset, every command reads the prelude as before.
- **Conditions:** A program compiled under the selection does not run yet, because the one library has no jars (F-34; row 1062).
- **Consequence:**
  - Use the environment variable, not the property, when the class path scripts matter.
  - Do not expect a run under the selection.
  - Its tests run through `ant testOneLibrary` and the onelibrary track of `ant testFast`.
- **Evidence:** Tests `ProjectFortress/one_library_tests/OneLibraryHalf.test`, `OneLibraryPrintBig.test`, `XXXOneLibraryRunHalf.test`; `rung-library-selector/REPORT.md`, three sections.
- **Could not resolve:** "the two class path scripts": unclear wording. They are not named. I guess `bin/fortress` and `bin/run`, but cannot tell.

## F-382

- **Established:** On both paths, a `typecase` arm whose name names no type is a static error, 'X is undefined.' This covers a bare `Id =>` and a name in an arrow type or static argument inside the arm. The disambiguator, which both paths run, resolves arm types as it resolves any other type. An arm at a type parameter in scope tests against its static argument. Only an element of a tuple of names, as in `(x, y) =>`, still binds, so an undefined name there matches any value (row 1064).
- **Conditions:** The tuple-of-names exception stands as the team's binding form.
- **Consequence:** Write a catch-all binder as `x: Any =>`. Expect an undefined name inside a tuple pattern to bind, not to be refused.
- **Evidence:** `compiler/disambiguator/TypeDisambiguator.java`; tests `tests/TypecaseUndefinedArmWalk.fss`, `TypecaseUndefinedNameInArmTypeWalk.fss` and `TypecaseTypeParamArmWalk.fss`, each with a compiled twin in `compiler_tests/`; `rung-typecase-unbound-arm/REPORT.md` section 1.
- **Could not resolve:** Nothing in the entry. One related point: the skill's `compiler.md` ("Traps of the compiled path", row 964) says that an untyped binder in a tuple pattern stops the code generator, while F-384 says that tuple-pattern names are now bound. The entry does not say which forms still hit row 964.

## F-383

- **Established:** Walk's harness treats a static error raised by a phase before the run, such as a disambiguator error, as a refusal at load. So a walk `.test` whose `load_` keys expect a refusal at load passes on such an error. A compiled refusal test must still have an `XXX` name, because a plain-named compile test fails whenever the compile reports errors.
- **Conditions:** It holds for walk's harness only.
- **Consequence:**
  - Write a walk test of a static error with `load_` keys.
  - Name a compiled refusal test `XXX...`.
  - A walk load-refusal test does not show which phase refused.
- **Evidence:** `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`, `InterpreterTest.thrownAtLoad`; test `tests/TypecaseUndefinedArmWalk.test`; `rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".
- **Could not resolve:** Nothing.

## F-384

- **Established:**
  - The code generator's kind environment now holds the static parameters in scope where it reads a declaration's types:
    - a type's inherited methods are read with the type's static parameters and `where` clause;
    - a generic function's or method's body is compiled with its own.
  - `forTypecase` binds each name of a clause's tuple pattern to its element.
  - So these compile and run (rows 812, 822, 1066):
    - a generic trait's member under a `where`-clause `comprises`;
    - a call of such a member in a generic body;
    - a `typecase` of the one library's `app` form whose arms call no method on an intersection-typed name.
- **Conditions:**
  - A method call on an intersection-typed name compiles by F-386's cast, but no test does it on a tuple pattern's name, which is the form of `app`'s arms 2 and 3.
  - A clause name bound at a trait above the selector's object type fails verification at a method call on it (row 1067).
- **Consequence:** These forms are now usable in compiled code. `app`'s arms 2 and 3 are untested, and row 1067 still stands. F-34 gives the one-library measure after this repair.
- **Evidence:** `compiler/codegen/CodeGen.java`; tests `ComprisesWhereMemberCompiled.test`, `TypecaseGenericArmsCompiled.test`, `TypecaseTupleNamesCompiled.test`; `rung-kind-env-generic/REPORT.md`, two sections.
- **Could not resolve:**
  - "kind environment": a compiled-path term that the skill does not define. I read it as the code generator's map of type variables in scope, which matches the 'V is not in the kind env' crash in `compiler.md`.
  - "A clause's name bound at a trait above its selector's object type": unclear wording, but readable. I took it as a typecase arm that binds at a supertype trait when the selector's static type is an object.

## F-385

- **Established:**
  - Take an instantiated template that calls a method by `invokeinterface` on a type that becomes a plain class name. `MethodInstantiater.visitMethodInsn` reads `ACC_INTERFACE` from the class file that the loader would define for that name, without loading the owner, and uses `invokevirtual` when the owner is a class.
  - So an object that lists a self-typed trait first, whose JVM superclass is that trait's default methods at the object, runs a default body that calls a method on a value of the self-type parameter (row 1052, fixed).
- **Conditions:** These two limits are known by reading only; neither is measured or tested:
  - The read keeps no cache, so every such call site of every expansion reads a class file.
  - A class that the loader generates, such as a generic object's, has no class file. The loader loads it as before, so a generic object listing a self-typed trait first may still fail as row 1052 did.
- **Consequence:** Expect a possible load-time cost, and the generic-object gap. Test a generic object that lists a self-typed trait first before relying on it.
- **Evidence:** `runtimeSystem/MethodInstantiater.java`; test `compiler_tests/SelfTypeParameterReceiverRun`; `rung-self-arm-closure/REPORT.md` section 1, item 3; `reviews/batch-33-review.md` section 2.
- **Could not resolve:**
  - "The class loader chooses ...": `MethodInstantiater` is named as the actor, while `compiler.md` names the class loader `InstantiatingClassloader`. I read `MethodInstantiater` as the loader's helper.
  - "whose JVM superclass is that trait's default methods at the object": readable, but this seems to be what F-302 calls a springboard. Neither entry links the two, and the skill does not define the term.

## F-386

- **Established:**
  - A dotted call on a value whose static type is an intersection with no conjunct below the others compiles as a call on the conjunct that has the checker's chosen declaration. The receiver is cast to that conjunct, and the value's own method runs, as under walk.
  - Such types come from P-60's intersection-typed calls and from `typecase` binders whose arm type is neither below nor above the selector's.
  - For `List[\E\] ∩ List[\T\]`, the choice cannot change an answer: no type extends two instances of one generic trait (P-43), so `E` and `T` must be one type.
  - A getter goes to a conjunct whose method of that name takes no argument. Overloaded-across-conjuncts and generic methods compile too.
  - On the one library, this emits `__filter`.
- **Conditions:**
  - No test calls a method on a two-instance intersection; that point rests on reading.
  - The checker refuses a method of a type parameter's bound on such a value when a conjunct is that parameter (row 1072).
- **Consequence:** Method calls on intersection-typed values are usable in compiled code, except row 1072's form.
- **Evidence:** Tests `compiler_tests/CoverageReturnMethodCall.test`, `compiler_tests/TypecaseBinderMethodCall.test`; `rung-intersection-receiver/REPORT.md` sections 1 and 5.
- **Could not resolve:** "the most specific where several qualify, else the first in the intersection's order": unclear wording. "else" can mean "where no single most specific conjunct exists among several", or "where fewer than several qualify". Under the second reading, a single qualifying conjunct would not be chosen if it is not first.

## F-387

- **Established:**
  - The compiled path compiles a primary whose math items each apply in turn to its front: `x[5]^2` is `(x[5])^2`, and `g[1][2]` is `(g[1])[2]`.
  - It also compiles a subscript used as a math item before a tightly juxtaposed item: `x[5]k` is `(x[5]) k`.
  - The checker checks the one application left after this reassociation, at the expected type, and writes each subscript as a call of the subscript operator's method.
  - Walk still fails on these forms (row 1).
- **Conditions:** Only the compiled path has this.
- **Consequence:** For a program that both paths run, write `(x[5])^2`.
- **Evidence:** `scala_src/typechecker/impls/Operators.scala`; test `compiler_tests/SubscriptThenSuperscriptCompiled.test`; `rung-checker-small-gaps/REPORT.md`, "What changed and why", item 2.
- **Could not resolve:**
  - "math items": a grammar term that the skill does not define (as for F-363).
  - The skill's `tests-writing.md` says that `x[5]^2` "stops the compile", which this entry contradicts. The skill is stale.

## P-12

- **Decided:** Once the switch-over has happened, walk is to run the compiled type checker on the programs it runs, gaining their static types. It is then to use the static coercions that the checker inserts, in place of its present run-time choice of coercion. The aim is that the checker works on walk's programs.
- **Applies:** Only after the switch-over. Until then walk is not changed for this, and P-59 (walk's run-time choice of coercions) governs.
- **Requires:**
  - Do not change walk toward this before the switch-over.
  - After it, wire the checker into walk's run and make walk honour the `CoercionInvocation` nodes.
  - Until then, do not treat `fortress typecheck`'s default verdict as a check of a walk program (F-9).
- **Unfinished:** All of it. Walk runs with type checking and the Scala checker off, and has no case for `CoercionInvocation` (F-9). The library's gaps are given by F-290, which is not included here. `typecheck` checks against the prelude by default.
- **Could not resolve:**
  - What happens when the checker refuses a program that walk runs today: unclear wording. The skill says that a program that runs under walk can be ill-typed. P-12 does not say whether a type error stops walk, as it stops a compile, or is only reported.
  - "F-9 and F-290 say what walk and the library lack": F-290 is not given, so the library's part of what is unfinished is not stated in the entry.
  - "the compiler's prelude" here against "the compiler's library, `Library/CompilerLibrary.fsi`" in F-9, for the same fact: unclear wording. The two entries name the default library differently.
