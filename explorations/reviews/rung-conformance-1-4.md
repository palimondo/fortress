<!-- Conformance review of compile-ladder rungs 1 to 4 (commits 1bd8d3ad1, cee79d3f1, 4d419c9e8, b52a32ac2), asked for by Pavol on 2026-09-17: were the gaps filled in the spirit of the original team's vision, or were they point solutions that make tests pass. Written by a review worker with read access only; no source, ledger or configuration file was touched and nothing was built or run. Each rung is judged against three standards kept separate — the specification, the team's own built intent, and the design rationale outside the spec — and then given one verdict. -->

# Rung conformance review, rungs 1 to 4

## Method and what it rests on

Each rung was read as `git show <hash>` first, then its `REPORT.md`, then the landed code in the tree as it stands, then the specification sources under `Specification/`, then the interpreter's library and the compiler world's dormant drafts; `explorations/coordinator/map/design-intent-sources.md` and `map/spec-to-implementation.md` were read before any of it, and `map/dormant-code.md` was consulted per rung.

One structural fact governs all four verdicts and is established before them: the specification says nothing about the compiler world at all.

`Specification/library/apis/CompilerLibrary.tex`, `CompilerBuiltin.tex` and `CompilerAlgebra.tex` exist in the tree, but no `.tex` file inputs them — `Specification/library/default-libraries.tex:26,38` inputs `FortressLibrary.tex` and `FortressBuiltin.tex`, `Specification/library/optional-libraries.tex:20-56` inputs the ten optional apis, and a grep for `CompilerLibrary` across `Specification/**/*.tex` returns only the file itself.

So the compiler-world listings are generated artifacts the spec build never sees, and `Specification/library/structure.tex:12-31` states the split the spec does recognise — Core versus Standard — and adds that the library chapters are "largely automatically generated" and describe libraries "presently in a state of flux", with differences from the implementation expected.

This is the same finding `map/design-intent-sources.md:112` records as "**None found** for the split itself", and it means no rung that only adds to `Library/CompilerLibrary` can violate the specification by what it adds; it can violate the specification only by what the added code then *does*.

## Rung 1, `1bd8d3ad1`, Equality into the compiler prelude

### Standard 1: the specification

The spec specifies `Equality`, at `Specification/library/apis/FortressLibrary.tex:69-77`, as `trait Equality[\T extends Equality[\T\]\]` — self-bounded, with no `comprises` clause.

Neither implementation world uses that spelling: the interpreter has `trait Equality[\T extends Equality[\T\]\]` at `Library/FortressLibrary.fsi:73` (matching the spec), and the compiler world has `trait Equality[\T\] comprises T` with `opr =(self, other: T): Boolean = (self === other)` at `Library/CompilerAlgebra.fss:25-27` and `.fsi:25-27`.

The rung changed neither declaration; it only made `CompilerAlgebra` implicitly visible, so the divergence between the two spellings predates it and is the team's, not ours.

On implicit imports the spec is not silent but is not on point either: `Specification/library/default-libraries.tex:14-23` says two sets of libraries are imported into every program by default, `FortressLibrary` and the builtins, and names no third api. The compiler world's default set already had three (`WellKnownNames.java:118-126`); the rung made it four. The spec does not govern this list.

Verdict on standard 1: the spec is silent on the change, and nothing in it is contradicted.

### Standard 2: the team's own intent as built

The line the rung uncommented is the team's own: `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:124` read `//			   compilerAlgebra(),` inside `useCompilerLibraries()`, with the accessor at `:91` and the field at `:40` both live.

`Library/CompilerAlgebra.fss` (29 lines) and `.fsi` (28 lines) are finished, not stubs, and `Library/GeneratorLibrary.fsi`'s first line after the api header is `import CompilerAlgebra.{ ... }` — 783 lines of finished generator and reduction protocol written against an api the team had switched off, which `map/dormant-code.md:107-122` catalogues and calls "two dormancies … one".

`map/dormant-code.md:491` lists "Whether to uncomment `WellKnownNames.java:124` and put `CompilerAlgebra` back in the compiler prelude" under **Decisions not made**, which is where the map parked it; `PLAN.md`'s step 3 names the same line as one of the team's own drafts to grow the prelude from, so the decision was pre-authorised by the plan and taking it is not freelancing.

The second edit, the branch at `TopLevelEnv.java:967-980`, is not in any team draft, but it is forced: the implicit set is written down twice and `TopLevelEnv` is the copy a program actually sees, so the team's own commented line alone would have done nothing.

### Standard 3: the rationale beyond the spec

`map/design-intent-sources.md:104` records that the algebraic traits are load-bearing, not decoration — associativity and identity are what license a reducer to split and reorder — and `research/extracts/SteeleJuliaCon2016-extract.md:62-76` is the source.

`Equality` and `StandardTotalOrder` are the bottom two rows of exactly that hierarchy, and `Library/GeneratorLibrary` is the reduction protocol built on them; putting `CompilerAlgebra` into the compiler prelude is the first step of the path the team's own dormant code lays out.

### The test-file deletion, examined

`ProjectFortress/library_tests/MaybeTest9.fss` is **in the gate**: `ProjectFortress/library_tests/MaybeGetter.test:10` names it (`tests= Getter1 Getter2 MaybeTest9`) and the file's steps are `compile`, `link`, `run`, `run_out_WIcontains=PASS`.

The deleted declaration is scaffolding and has been since the file's first tracked version: `git show b3706df0a:ProjectFortress/library_tests/MaybeTest9.fss` (David Chase, 2011-11-29, "Reorganized to put newly passing tests into regular test stream") already carries `trait Equality[\Self\] comprises Self` with `opr =(self, other:Self): Boolean = self SEQV other` above the file's subject.

That subject is a `Maybe`-shaped value-trait triple — `TestMaybe[\T\]` with `TestNothingObject[\T\]` and `TestJust[\T\]`, ten live assertions over `getDefault`, `asString`, `size`, `|self|`, `get` and `IN`, and four `SQCAP` assertions commented out, which `map/dormant-code.md:315` already catalogues. `Equality` is a bound the triple needs, not the thing under test.

The rung's claim that `self SEQV other` and `self === other` are the same operator is exactly right, and checkable: `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:303` rewrites the token `SEQV` to `≣`, and `ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/Operators.java:2109` puts `≣` and `===` in one synonym group.

Both bodies therefore resolve to the same declaration in the compiler world, `opr ===(a:Any, b:Any): Boolean = jSEQUIV(a,b)` at `Library/CompilerLibrary.fss:63`, whose native is `return a == b` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/equality.java:15-18`). The file asserts what it asserted before.

This does not cross the line `PLAN.md` reserves. That stop condition is "deleting a test to get green"; no test was deleted, none was moved out of the gate, `MaybeGetter.test` still runs three programs with the same four steps, and the ten live assertions in `MaybeTest9.fss` are untouched. A scaffolding declaration inside a test is not the test.

### The checker narrowing, examined

`TypeWellFormedChecker` runs twice, at `StaticChecker.java:220` before typechecking and at `:268` after it, and the three fields the rung stopped walking — `interpOverloadings`, `newOverloadings`, `overloadingType` (`ProjectFortress/astgen/Fortress.ast:803-810`) — are empty on the first run and filled by overload resolution before the second.

What the narrowing removes is therefore not a rejection but a crash: the walk reached `TypeAnalyzer.staticParam` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:765-766`), whose miss is `bug(x, x + " is not in the kind env " + env)` — an internal compiler error, not a static error — via `wfStaticArgs` at `TypeWellFormedChecker.scala:106` and `pSubInner` at `TypeAnalyzer.scala:183`.

The set of newly accepted programs is therefore: programs whose reference to an overloaded name has, among the overloadings overload resolution attached, an arrow type mentioning a static parameter free. Before the edit those crashed the compiler if the free parameter carried a bound, and were reported "Unbound type" by the checker's own `SVarType` case at `TypeWellFormedChecker.scala:92-94` if it did not. Neither outcome is a program the spec intends to reject, so the newly accepted set is programs the spec already made legal.

The rung's claim that the removed walk was redundant holds for the substantive part of it. The bound check `wfStaticArgs` performs on static arguments still runs, because inferred static arguments are written back into the reference site's own `staticArgs` field before the second pass: `STypesUtil.scala:1149-1152` calls `SExprUtil.addStaticArgs` (`SExprUtil.scala:157-164`) with `unliftedSargs`, and `walk(args)` covers them.

One residual is real and unstated. `STypesUtil.scala:1131` partitions the inferred static arguments into `liftedSargs` and `unliftedSargs`, and only the unlifted ones are written back; a lifted (coercion) static argument therefore appears nowhere except inside `overloadingType`, whose walk the rung removed. Whether any bound is only checkable there was not established and cannot be without running the checker, so this is flagged, not asserted.

The neighbouring `MethodInvocation` case still walks its own `overloadingType` (`TypeWellFormedChecker.scala:145-150`) and can reach the same `bug`; the rung named this and left it, which is the right call for a rung but leaves a live crash site.

### Verdict, rung 1

**In the spirit.** The prelude half is the team's own switched-off line plus the one edit that makes it effective; the test-file half deletes scaffolding, not a test, and preserves the assertions exactly; the checker half removes a crash and a class of spurious errors and keeps the check that matters. One residual (lifted static arguments) and one live crash site (`MethodInvocation`) are named and unrepaired.

## Rung 2, `cee79d3f1`, `HasRank`

### Standard 1: the specification

The spec declares `HasRank` at `Specification/library/apis/FortressLibrary.tex:1475-1484`: `trait HasRank extends Equality[\HasRank\] excludes { Number, AnyMaybe }`, with `abstract rank(): ZZ32` and **`opr =(self, other: HasRank): Boolean`** as members, and a `FortressDoc` note recording the `comprises Array[\T,E,I\]` clause the team could not yet write.

The spec therefore lists `opr =` as a member of `HasRank`, and the landed trait does not declare it; it inherits one of the same signature from `Equality[\HasRank\]`, so the api is satisfied in type but the member is a different one.

Because the compiler-world listing is outside the spec build and `Specification/library/structure.tex:25-31` disclaims the library chapters as descriptive and in flux, neither departure is a spec violation. The spec is descriptive here, not mandatory.

### Standard 2: the team's own intent as built

The interpreter's text is `Library/FortressLibrary.fsi:1058-1062` and `Library/FortressLibrary.fss:1584-1589`, and the body the rung dropped is `opr =(self, other:HasRank): Boolean = false`.

That `false` is not a placeholder. It is the base case of the array-equality algorithm: `Library/FortressLibrary.fss:1861-1866` overrides it inside `ReadableArray[\E,I\]` with a `typecase` that compares element by element when the other operand is a `ReadableArray[\E,I\]` and falls through to `false` otherwise. `HasRank`'s `false` is what "these two ranked things are not comparable" means.

Replacing it with `CompilerAlgebra.Equality`'s default `(self === other)` (`Library/CompilerAlgebra.fss:26`) changes the base case from "never equal" to "equal iff the same object", so `x = x` on a `HasRank` that is not a `ReadableArray` is `false` in the interpreter and `true` in the compiler world.

The `AnyMaybe` half is different and holds. `AnyMaybe` is the non-parametric supertype the interpreter declares at `Library/FortressLibrary.fsi:813` precisely so an `excludes` clause can name it without static arguments, and the compiler world declares no such name; its nearest concept, `value trait Option[\E19\]` with `Some` and `NoneObject` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:649-659`), is generic and cannot be written in an `excludes` clause of a non-generic trait. The rung's report overstates when it says "The compiler world has no `Maybe` at all" — `Option` is live, and `Library/CompilerLibrary.fsi:217-225` holds the team's dormant `Maybe` draft — but the operative claim, that the exclusion has no spelling, is correct.

Dropping an `excludes` clause is also the safe direction: it removes knowledge from the type system, so it can only make overload declarations *harder* to accept, never make an illegal program legal.

### Standard 3: the rationale beyond the spec

`map/design-intent-sources.md:99` records the design intent the spec does not state: the whole `excludes`/`comprises` apparatus "is a tax paid to keep overloading safe", with `Papers/Types` and `research/extracts/SteeleJuliaCon2016-extract.md:160-171` as the sources.

Under that reading an exclusion dropped for want of a referent is a debt to be repaid when the referent arrives, not a simplification, and nothing in the rung's record schedules the repayment: neither ledger row 71 nor row 288 carries a note that restoring `Maybe` must restore `HasRank excludes AnyMaybe`.

### Verdict, rung 2

**Deviation, argued and defensible** — with one argument overstated and one debt unbooked.

The `AnyMaybe` departure is argued correctly in substance and is in the conservative direction. The `opr =` departure is honestly disclosed in the report ("a different default") and is unobservable today, because the compiler world has no array traits and the rung's own test deliberately does not exercise `=`; deferring it is a defensible rung boundary.

But the commit message's phrasing — that the compiler world "has no referent or need" for either — is wrong on the `opr =` half. The need is the one thing the interpreter's `false` does: it is the base case an array-equality override falls through to, and it must be restored in the same rung that brings `ReadableArray` in, or arrays will compare by identity.

## Rung 3, `4d419c9e8`, top-level mutable variables in the code generator

### Standard 1: the specification

`Specification/basic/declarations.tex:120-146` lists top-level variable declarations among the top-level declarations, so the construct is squarely in the language and the previous refusal was a gap.

The specification then mandates what a write to a variable must do inside an `atomic` expression, in two separate places.

`Specification/basic/expressions/atomic.tex:37-42`: "All reads and all writes which occur as part of this evaluation will appear to occur simultaneously in a single atomic step with respect to *any* action performed by any thread which is dynamically outside."

`Specification/basic/expressions/atomic.tex:60-70`: "If it completes abruptly by throwing an uncaught exception, all writes to objects allocated before the `atomic` expression began evaluation are discarded. … **Any variable reverts to the value it held before evaluation of the `atomic` expression began.**"

`Specification/basic/memory-model.tex:69-76` adds the programming discipline the model is written for: "Updates to shared mutable locations must always be performed using an `atomic` expression. A location is considered to be shared if and only if that location can be accessed by more than one thread at a time." A top-level variable of a component is reachable from every thread, so it is shared as soon as two threads touch it.

The landed code does none of this. `VarCodeGen.MutableStaticBinding.pushValue` is a bare `GETSTATIC` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:309`) and `assignValue` is a bare `PUTSTATIC` (`:314`), on a field emitted `ACC_PUBLIC+ACC_STATIC` with no `ACC_FINAL` and no `volatile` (`CodeGen.java:5862`).

`atomic do … end` does compile on this path: `CodeGen.forAtomicBlock` (`CodeGen.java:1729-1757`) wraps the block in `BaseTask.startTransaction`/`endTransaction` and installs a handler that catches `TransactionAbortException`, calls `cleanupTransaction`, `delayTransaction`, and **jumps back to `startOver`** (`:1745-1753`).

So a top-level mutable variable written inside an `atomic` block is not in the transaction's write set, is not rolled back when the transaction aborts, and is then written again by the retry — the write is applied more than once. That contradicts `atomic.tex:65-67` directly, and the invisibility to conflicting threads contradicts `:37-42`.

The missing `volatile` is a second, independent contradiction: `Specification/basic/memory-model.tex:34-42` requires that "All data structures must be properly initialized before they can be read by another thread, and a program must not read values that were never written", and a plain non-volatile static reference field written after `<clinit>` carries no happens-before edge to a reader on another thread.

### Standard 2: the team's own intent as built

The team wrote the same construct twice, both times transactionally.

`VarCodeGen.LocalMutableVar` (`VarCodeGen.java:371-473`) holds the value in a `MutableFValue` cell and emits, on **every** read and **every** write, `BaseTask.inATransaction()` (`:407`, `:445`), a branch, and either `Transaction.TXRead`/`TXWrite` or the plain `getValue`/`setValue`.

`VarCodeGen.MutableTaskVarCodeGen` (`VarCodeGen.java:529-655`) does the identical thing for a mutable variable captured by a task (`:567`, `:612`).

The cell itself is `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/MutableFValue.java:16-24`, whose single field is `volatile FValue value` — the visibility guarantee the new binding drops.

The interpreter, for the same declaration, stores a top-level mutable variable in a `ReferenceCell`: `BuildEnvironments.java:677-678` calls `putVariablePlaceholder` for a mutable `LValue`, and `BaseEnv.java:599-601` implements it as `putValue(str, new ReferenceCell())`. `ReferenceCell` is transactional by construction — its header comment at `ProjectFortress/src/com/sun/fortress/interpreter/env/ReferenceCell.java:24-26` says it is "What the interpreter stores mutable things (fields, variables) in", and `assignValue` (`:123-160`) and `getValue` (`:163-188`) consult the current transaction and maintain read and write sets.

There is one counter-precedent in the team's own code and it must be stated: `VarCodeGen.MutableFieldVar` (`VarCodeGen.java:197-230`) writes an object's mutable field with a bare `PUTFIELD` and no transaction check. So the compiled path already had a hole of exactly this shape for object fields, and rung 3 did not invent the pattern.

What rung 3 did was follow the one precedent that is wrong rather than the two that are right, and follow it silently: `explorations/compile-ladder/rung3/REPORT.md` and ledger row 312 do not contain the words transaction, atomic, `MutableFValue` or volatile anywhere.

### Standard 3: the rationale beyond the spec

`map/design-intent-sources.md:107` records that the memory model's ordering rules were an unfinished argument rather than a settled design, and that the transactional-memory policy was "a research menu, not a choice" — but it also records the goal above both, "do for processors what GC does for memory", sourced to `research/extracts/SteeleJuliaCon2016-extract.md:149-156`.

`ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:26-35`, which `map/design-intent-sources.md:85` singles out as one of the few long comments that explain a design choice, is the team stating how carefully the memory model had to be respected in this very file.

Nothing in the rationale sources supports a mutable variable outside the transaction machinery; the eleven contention managers under `interpreter/evaluator/transactions/manager/` are what the team built instead.

### Why the green gate is not evidence

Every compiled `atomic` and transaction test uses a **local** mutable variable only: `ProjectFortress/other_compiler_tests/atomic0.fss:16` is `var count : ZZ32 := 0` inside `run()`, and a grep for a top-level `var` or `:=` declaration across `other_compiler_tests/atomic0-6.fss` and `nestedTransactions0-3.fss` returns nothing.

`build.xml:1184` sets `FORTRESS_THREADS=1` for every `testSystem` shard, so no gated test sees concurrency at all (`FACTS.md`, gate entry).

The suite could not have caught this, and the rung's own subset is eight single-threaded programs with no `atomic` in them.

### Verdict, rung 3

**Violates the specification.**

The previous behaviour was a refusal, which is incomplete but not wrong. The landed behaviour accepts the construct and gives it semantics that `Specification/basic/expressions/atomic.tex:37-42` and `:65-67` forbid, and it is the only one of the compiled path's three mutable-variable code generators that does so.

The repair is small and is already written twice in the same file: hold the value in a `MutableFValue` in the singleton field and route `pushValue`/`assignValue` through the same `inATransaction`/`TXRead`/`TXWrite` branch `LocalMutableVar` uses at `VarCodeGen.java:400-467`. That also restores the `volatile`.

Whether the compiled path's *object fields* should be fixed at the same time (`MutableFieldVar`, `VarCodeGen.java:197-230`) is a fork, not an engineering answer — it is a second, larger defect with the same cause, it predates the revival, and it belongs to Pavol.

## Rung 4, `b52a32ac2`, the comparing forms of `assert` and `deny`

### Standard 1: the specification

`Specification/library/apis/FortressLibrary.tex:308-332` specifies four forms of `assert` and four of `deny`, of which the comparing one is generic and variadic — `assert(x:Any, y:Any, failMsg: Any…)` — with the prose "This version of `assert` checks the equality of its first two arguments; if unequal it includes the remaining arguments in its error indication."

`Specification/basic/tests.tex:12-38` is the tests chapter, and it is a `\note{}` field: "Tests and properties are not yet supported. Examples in this chapter are not tested nor run by the interpreter." The chapter specifies `test` declarations and `property` clauses, not `assert`, which the spec treats purely as a library function.

The eight monomorphic declarations therefore do not contradict a spec mandate; they implement a strict subset of the specified surface in a world the spec does not describe. A program the spec makes legal — `assert(a, b)` on two user objects — is a static error on this path, which is a conformance gap, not a violation.

There is, however, a spec rule the new declarations must satisfy and one pair appears not to.

`Specification/advanced/overloading.tex:247-262`, the Meet Rule for Functions: where neither domain is a subtype of the other and the two are not incompatible, the overloading is valid only if "either `Ps excludes Qs` or there is a declaration `f(Ps ∩ Qs)` in the scope".

The pre-existing `assert(flag: Boolean, failMsg: String)` (`Library/CompilerLibrary.fsi:36`) and the new `assert(x: String, y: String)` (`:47`) are such a pair: neither `(Boolean, String)` nor `(String, String)` is a subtype of the other, there is no declaration at their meet, and `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:25` (`trait String extends StandardTotalOrder[\String\]`) and `:454` (`trait Boolean extends { Equality[\Boolean\], Condition[\()\] }`) declare no exclusion between them.

Every other new pair is discharged: `Number excludes { String }` at `CompilerBuiltin.fsi:96` covers `ZZ32` against `String`, and `Character excludes { String, Number, Boolean }` at `:483` covers the three-argument `Character` form against the rest.

The implementation's `OverloadingChecker` did not complain, and its rule is the right one (`OverloadingChecker.scala:465-478` tries subtype, then `meetRule`, then `oa.excludes`, and `OverloadingOracle.scala:190-195` defines exclusion as the meet of the domains being a subtype of `BOTTOM`). So either the exclusion is derived somewhere I did not find, or the checker is incomplete for this pair. That was not settled here and it is the first thing to check.

### Standard 2: the team's own intent as built

The team's own generic forms sit commented out at exactly the spot the rung wrote into — `Library/CompilerLibrary.fss:89-95` and `:102-108` before the edit — and `map/dormant-code.md:34` already catalogues them, with the reason: "body needs varargs and the `BIG ||` reduction, neither of which the compiler world has".

That is the reason, and it is neither of the two the rung gave. The rung did not cite the map's row.

The rung's first stated reason is wrong as written. It is now a permanent comment in the sealed tree, at `Library/CompilerLibrary.fsi:38-44` and `.fss:90-95`: "the generic form … cannot be written here, because `opr ===` on `Any` is reference identity and an `Any` parameter suppresses the coercion from `IntLiteral`".

The compiler world carries six monomorphic `===` overloads beside the `Any` one — `Library/CompilerLibrary.fss:64-69`, at `ZZ64`, `ZZ32`, `RR64`, `RR32`, `String` and `Boolean`, each of them `a = b`, that is value equality. They exist to be reached by dispatch from a less specific site; `Specification/basic/overloading.tex:22-25` states the rule ("For an overloaded functional call, the most specific applicable declaration is chosen"), and the machinery that implements it on the compile path is the dynamically-applicable-overloading list rung 1 touched (`STypesUtil.scala:1139-1144`).

The team's own interpreter is the working counter-example: `Library/FortressLibrary.fss:295-299` is precisely the body typed over `Any`, its comparison is `x =/= y`, and `ProjectFortress/tests/fib.fss:21-22` calls `assert(fib(20),6765,"fib(20) wrong")` and passes in the green `testSystem`. A body typed `Any` does not compare boxes in a correct Fortress implementation.

The rung's second stated reason is sound and is the one that carries the decision. With both a generic `(Any, Any, String)` and a monomorphic `(ZZ32, ZZ32, String)` declared, a call site writing a literal prefers the declaration applicable without coercion, so the generic one would win and then have no value comparison to reach; and the operative blocker for writing the generic form at all is that the compiler world declares no `opr =(Any,Any)` and no `opr =/=(Any,Any)` (established by rung 1's report), its `SEQV` is commented out at `Library/CompilerLibrary.fss:294`, and `===` on `Any` is `jSEQUIV`, `return a == b` (`nativeHelpers/equality.java:15-18`).

So the conclusion is right and the shape is right for a rung; the reason written into the library is the wrong one, and `protocol.md` §2 is the standing rule it sits against — "No unactionable comments in the source tree; provenance commentary belongs in commit messages."

### Standard 3: the rationale beyond the spec

`map/design-intent-sources.md:110` records what the spec does not say about assertions: properties are meant to be the algebraic laws of the trait hierarchy, "checked by unit testing today and by a theorem prover later", and `research/extracts/SteeleJuliaCon2016-extract.md:58-77` is the source.

Under that reading `assert` is the mechanism a `property` clause is discharged through, and a comparing `assert` that only works at five fixed shapes cannot discharge a property over a user trait. That is the sense in which the monomorphic set is a stopgap.

The cost of undoing it is low and worth stating plainly: eight declarations in `Library/CompilerLibrary.fsi:45-58` and eight bodies in `.fss:97-142`, removable in one edit in two files, with no Java, no Scala and no callers to update, once the compiler world has `opr =(Any,Any)`/`=/=(Any,Any)` and varargs that tolerate coercion. It does not even close its own class: the four `objectCC_*mutVar*` programs stay blocked on the vararg shape, as the report says.

### Verdict, rung 4

**Deviation, argued and defensible**, with one of the two stated reasons wrong and one overload obligation left undischarged.

Eight monomorphic declarations are a defensible shape for this rung — they are removable in one edit, they gained eight passing programs, and the generic form genuinely cannot be written until a separate, larger name lands. It is a stopgap and the report says so.

The defects are that the reason recorded in the sealed library contradicts the team's own working implementation of the same function, and that the `(Boolean, String)` × `(String, String)` pair rests on an exclusion nobody has shown to hold.

## Genuine defects, ranked

**1. Rung 3: a top-level mutable variable is written and read outside the transaction machinery and outside any memory barrier.** `VarCodeGen.java:309,314` against `VarCodeGen.java:400-467` and `:560-645`; `CodeGen.java:5862` drops `ACC_FINAL` without adding the `volatile` cell. Under `atomic do … end`, which compiles (`CodeGen.java:1729-1757`), the write is invisible to the transaction, is not rolled back on abort, and is re-applied by the retry at `:1753`. This contradicts `Specification/basic/expressions/atomic.tex:37-42` and `:65-67`, and the missing `volatile` contradicts `Specification/basic/memory-model.tex:34-42`. The interpreter does it correctly (`BaseEnv.java:599-601` into `ReferenceCell.java:123-188`). The gate cannot see it: every compiled `atomic` test uses a local variable (`other_compiler_tests/atomic0.fss:16`) and every `testSystem` shard runs at `FORTRESS_THREADS=1` (`build.xml:1184`). Neither the report nor ledger row 312 mentions it.

**2. Rung 4: an overload pair whose Meet Rule obligation is undischarged, and the exclusion that would discharge it is sitting commented out in the team's own text.** `assert(flag: Boolean, failMsg: String)` (`Library/CompilerLibrary.fsi:36`) and `assert(x: String, y: String)` (`:47`) against `Specification/advanced/overloading.tex:247-262`. The clause that would make `Boolean` exclude `String` is `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:622` and `.fss:1281` — `(*)        excludes { String, ZZ, ZZ32, ZZ64, NN32, NN64, IntLiteral, RR32, RR64, ZZ32Vector, StringVector }` on `trait Condition[\E18\]`, which `Boolean` extends (`:454`). The rung noticed the missing exclusions and let it stand without finding that line; `map/dormant-code.md` does not catalogue it either, so this is new to the record.

**3. Rung 4: a wrong reason written permanently into the sealed library.** `Library/CompilerLibrary.fsi:41-43` and `.fss:91-93` state that a body typed `Any` would compare boxes. `Library/CompilerLibrary.fss:64-69` declares six value-equality `===` overloads that exist to be reached from exactly such a body, `Specification/basic/overloading.tex:22-25` is the rule that reaches them, and the interpreter's `Library/FortressLibrary.fss:295-299` is the same body working. If the claim is nevertheless true on the compiled path, it is a dispatch defect much larger than the missing `assert` and needs its own row; either way it is not settled, and ledger row 314 repeats it as established.

**4. Rung 2: `HasRank`'s equality silently changed from the array-equality base case to identity, with no reminder to restore it.** `Library/FortressLibrary.fss:1588` (`= false`) is the fallthrough of the `typecase` override at `:1861-1866`; the compiler world now inherits `(self === other)` from `Library/CompilerAlgebra.fss:26`. Unobservable today, because the compiler world has no array traits, and disclosed in the rung's report — but no ledger row, and the `excludes AnyMaybe` debt is likewise unbooked on rows 71 and 288.

**5. Rung 1: lifted static arguments lose their only bound check.** `STypesUtil.scala:1131` keeps `liftedSargs` out of the reference site's `staticArgs`, and the walk that would have reached them inside `overloadingType` is the one the rung removed (`TypeWellFormedChecker.scala:134-142`). Unproven in either direction; it needs a coercion-lifted call whose lifted argument violates its bound, which I could not construct without running the checker.

## Ledger rows proposed, not added

**Proposal A (highest).** *A top-level mutable variable compiled by the code generator is not transactional and not volatile.* Kind: implementation gap, NEGATIVE, unverified by execution. Spec: `Specification/basic/expressions/atomic.tex:37-42` and `:65-67`; `Specification/basic/memory-model.tex:34-42`, `:69-76`. Evidence: `VarCodeGen.MutableStaticBinding` at `VarCodeGen.java:302-325` against `LocalMutableVar` at `:371-473` and `MutableTaskVarCodeGen` at `:529-655`; `MutableFValue.java:18` (`volatile`); `CodeGen.forAtomicBlock` at `CodeGen.java:1729-1757`; interpreter comparison `BaseEnv.java:599-601`, `ReferenceCell.java:24-26,123-188`. Notes: row 312's neighbour and its consequence; the repair is to hold the singleton field's value in a `MutableFValue` and reuse `LocalMutableVar`'s branch; `MutableFieldVar` (`VarCodeGen.java:197-230`) has the same hole for object fields and predates the revival. The test that would pin it is a component with a top-level `var`, an `atomic do … end` that increments it, and a `throw` inside the block, asserting the variable's value afterwards — it needs no threads.

**Proposal B.** *`Condition[\E18\]`'s `excludes` clause is commented out, so `Boolean` excludes neither `String` nor the numeric types in the compiler world.* Kind: dormant code with a live consequence. Evidence: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:622`, `.fss:1281`; the Meet Rule at `Specification/advanced/overloading.tex:247-262`; the pair `Library/CompilerLibrary.fsi:36` and `:47` that now depends on it. Notes: restoring the clause would discharge the obligation rather than create one; whether the `OverloadingChecker` is incomplete for this pair is the open question, and answering it is one `fortress compile` of a two-declaration probe.

**Proposal C.** *`HasRank`'s `opr =` and its `AnyMaybe` exclusion must be restored when the compiler world gains array traits and `Maybe`.* Kind: deliberate omission carrying a debt. Evidence: `Library/CompilerLibrary.fss:555-557` against `Library/FortressLibrary.fss:1584-1589` and the override at `:1861-1866`; `Library/FortressLibrary.fsi:813` for `AnyMaybe`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:649-659` for the compiler world's `Option`. Notes: nothing observes it today; the array rung is where it comes due, and rows 71 and 288 are where the note belongs if no new row is wanted.

## Scope of the repair, and the one fork already reserved

The scope question Proposal A raises is not a new fork and is not sent up: `POSITIONS.md` (2026-09-17) records that an undecided point is a reason for a deeper pass, not a halt, and that only forks already reserved in `PLAN.md` reach Pavol.

The deeper pass here is one question answered once, for the compiled path's mutable state as a whole rather than for top-level variables alone: `VarCodeGen.MutableFieldVar` (`VarCodeGen.java:197-230`) writes an object's mutable field with a bare `PUTFIELD` and has the same hole, it predates the revival, and `Specification/basic/expressions/atomic.tex:37-42` does not distinguish a variable from a field. Repairing only top-level variables leaves the language observably half transactional, so the repair should be designed across `MutableStaticBinding` and `MutableFieldVar` together and landed in whatever order the tests allow.

The one fork here that `PLAN.md` does reserve is the library route — whether the compiler world's algebraic and generator layer is grown from `Library/CompilerAlgebra` and `Library/GeneratorLibrary`, which rung 1 has now made reachable, or kept monomorphic. `map/dormant-code.md:107-114` frames it, `PLAN.md`'s stop conditions name it, and rungs 2, 3 and 5 each refused it by name.

## Not verified

Nothing was built or run for this review, by instruction; every behavioural claim about the landed code is read off the bytecode the generators emit and the spec text, not off an execution.

Whether `Boolean` and `String` in fact exclude in the compiler world's `TypeAnalyzer` was not determined; the reading above says they do not, the `OverloadingChecker`'s silence says they might, and a two-declaration probe settles it.

Whether a body typed `Any` reaches the monomorphic `===` overloads on the compiled path was not determined; a component declaring `chk(a: Any, b: Any): Boolean = (a === b)` and calling it on two separately computed `RR64` values settles it in one compile and one run.

Whether any lifted (coercion) static argument's bound was only checkable through the walk rung 1 removed was not determined.

The ladder's own numbers (pass counts 59 → 67 → 75, the subset tables) were taken from the rungs' reports and were not re-measured.
