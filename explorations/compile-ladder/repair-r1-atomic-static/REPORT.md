<!-- R1 of the repair batch of 2026-09-18. One line per paragraph. -->

# R1: a top-level mutable variable is outside the transaction

## What the rung repairs

`atomic do ... end` compiles on the bytecode path with a real transaction and a real retry loop (`CodeGen.forAtomicBlock`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1729-1757`, `startOver` at `:1753`), but a mutable variable declared at the top level of a component was read with a bare `GETSTATIC` and written with a bare `PUTSTATIC` on a non-final, non-volatile static field, so its reads and writes were not in the transaction at all.

That is one of two defects in the same code, and the second is not about concurrency: a write to such a variable from inside a nested code-generation context -- the body of a `for` loop, an arm of a parallel `do ... also do ... end` -- went to a *copy* of the value captured in the generated task's field, so the write was lost outright, at one thread as well as at four.

Both were landed by rung 3 (`4d419c9e8`) with `VarCodeGen.MutableStaticBinding`; before that rung, assignment to a top-level variable did not compile at all.

## What I inherited, and what I re-verified

The first launch of this batch died with its container 25 minutes in (`coordinator/REPAIR-BATCH.md`, "How it is run"), and this branch already carried two commits: `029b7454` (two failing tests and a capture of their failure) and `c40d7f87` (the edit, with a capture of the pass).

I re-verified rather than trusted: I reverted the three edited source files to the batch base `49ee5e91`, ran `ant compileAll`, wiped `default_repository/caches` and rebuilt it in library order, and re-ran the tests -- reproducing the failure (`probes/probe-runs-preedit.txt`, `probes/differential-preedit.txt`, and the pre-edit half of `probes/failure-before-edit.txt`); then restored the edit and repeated the whole cycle.

Two things did not survive that review, and both are in this rung's diff.

**The inherited concurrent test's own comment was wrong about the gate, in the direction that mattered.** It stated that at the thread count "every gate target uses" the program passes whether or not the implementation is correct, citing the review's `FORTRESS_THREADS=1`. That pin is in the `testSystem` shards only (`build.xml:1184`), which run `SystemJUTest` -- the interpreter corpus -- and not `compiler_tests`. The target that runs `compiler_tests` is `CompilerJUTest` under the `fastTrack` macro (`build.xml:927-953`), which sets `FORTRESS_CACHES` and no thread count; the harness runs each program in a subprocess inheriting that environment (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:480-486`); and with `FORTRESS_THREADS` unset the count falls back to `availableProcessors/2` (`ProjectFortress/src/com/sun/fortress/runtimeSystem/FortressExecutable.java:37-44`). Measured: with the environment unset on this 4-processor container the unrepaired tree fails the test on every run (`probes/capture-preedit` rows `THREADS=default`). So the concurrent test is genuinely gateable, and I corrected the comment instead of weakening the test.

**The inherited deterministic test was racy and would have flaked in the gate.** Its loop body was a bare `inLoop := inLoop + 1` inside a *parallel* `for`, which is a data race by construction; once the repair let those writes reach the shared location, one run in nine gave 9 instead of 10 (`probes/capture-postedit`, `THREADS=default run=1`). The increment is now inside `atomic do ... end`, which is what `Specification/basic/memory-model.tex:69-75` requires of a program that wants a defined answer ("Updates to shared mutable locations must always be performed using an `atomic` expression"), and the expected values are then exact at any thread count.

I also found and repaired a regression in the inherited edit, and a pre-existing defect next to it; that is the payload-type decision below.

## Where the fix belongs

`map/spec-to-implementation.md:176` places `atomic` for the compiled path at `CodeGen.forAtomicBlock:1729` via `forBlock`, with the runtime in `runtimeSystem/BaseTask.java`, and records that the block form compiles while `atomic <expr>` has no visitor and reaches `defaultCase`; both new tests use the block form, so the rung's construct is the one that compiles.

`map/modules-and-phases.md:421-437` places the transaction machinery in `runtimeSystem/` and states that tasks and transactions are implemented twice and independently -- `interpreter/evaluator/tasks/` and `transactions/` are a separate implementation -- so this repair is confined to the compiled world's copy and cannot be shared with the interpreter's.

The storage decision for a variable is made in `CodeGen.forVarDecl`'s pre-pass (`CodeGen.java:5896-5923`), which emits a one-field singleton class per top-level declaration and registers either `StaticBinding` (immutable) or `MutableStaticBinding` (mutable); the read and write instruction sequences are `VarCodeGen`'s. That is where the fix belongs, and where it is.

`map/test-coverage.md:185-186` says the fork-join runtime and the transactions are "barely" and "effectively no[t]" covered, and names the two reasons: every `testSystem` shard pins one thread, and `TransactionJUTest`'s multi-threaded half is commented out (`TestTask.java:43-44`). It does not say anything about `compiler_tests`, and the measurement above is the missing line: that corpus does run its programs with more than one worker.

## Precedent search: the team solved this three times, two of them right

`VarCodeGen.LocalMutableVar` (`VarCodeGen.java:451-548`) stores a *local* mutable variable in a `MutableFValue` cell and routes every read and write through the current transaction: `BaseTask.inATransaction()`, then `Transaction.TXRead`/`TXWrite` on the cell, otherwise the cell's own getter and setter.

`VarCodeGen.MutableTaskVarCodeGen` (`VarCodeGen.java:609-731`) does the same for such a variable once it has been captured by a generated task, holding the same cell in the task's field so that the location's identity survives the capture.

`VarCodeGen.MutableFieldVar` (`VarCodeGen.java:202-231`) is the third and is the wrong one: a bare `GETFIELD`/`PUTFIELD` on a non-volatile field, with the author's own "URG, another case of meeting assumptions" comment. Rung 3 followed this one.

The interpreter stores the same construct in a transactional cell: `BaseEnv.putVariable` wraps every variable in a `ReferenceCell` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BaseEnv.java:595-609`), whose class comment is "What the interpreter stores mutable things (fields, variables) in" (`interpreter/env/ReferenceCell.java:26-28`) and which consults `FortressTaskRunner.getTransaction()`.

The cell is not one implementation choice among several: the compiled world's STM keys its read and write sets by `MutableFValue` *identity* (`runtimeSystem/Transaction.java:27-28`) and commits by `key.setValue(val)` (`:246-252`), so a `MutableFValue` cell is the only representation of a memory location the transaction can hold. A variable that is not in a cell cannot be in a transaction, whatever the field's modifiers.

## What the specification requires

`Specification/basic/expressions/atomic.tex:38-42`: evaluating an `atomic` expression is evaluating its body, and "All reads and all writes which occur as part of this evaluation will appear to occur simultaneously in a single atomic step with respect to *any* action performed by any thread which is dynamically outside".

`atomic.tex:65-67`: when the body completes abruptly by throwing, "Any variable reverts to the value it held before evaluation of the `atomic` expression began" -- which a deferred-write transaction gives for free for a variable in a cell, and cannot give for a variable written by a bare `PUTSTATIC`.

`atomic.tex:96-107` is the chapter's own worked example and is the shape of the new test: a loop body that reads and writes a shared counter inside `atomic`, which "will appear to occur atomically with respect to all other threads -- including both other iterations of the loop body".

`Specification/basic/memory-model.tex:69-75` defines the discipline the implementation must honour -- updates to shared mutable locations are performed with `atomic`, and "A location is considered to be shared if and only if that location can be accessed by more than one thread at a time" -- which a top-level variable of a component plainly can be.

`Specification/basic/memory-model.tex:34-42` is the principle the missing `volatile` offended: violations "must still respect the underlying data abstractions", data must be initialized before another thread reads it, and "a program must not read values that were never written". The repair satisfies it without a modifier on the static field: the field is written once in `<clinit>` and is final again, and the *value* lives behind the cell's `volatile` (`runtimeValues/MutableFValue.java:18`).

Both citations were read in full in the tree, not taken from the brief.

## The edit

A mutable top-level variable's singleton field now holds a `MutableFValue` cell and the value lives in the cell (`CodeGen.generateVarDeclInnerClass`, `CodeGen.java:5861-5895`): the field's descriptor is the cell's, `<clinit>` evaluates the initializer and wraps it with `MutableFValue.make`, and the field is `ACC_FINAL` again because nothing but `<clinit>` writes it.

`VarCodeGen.MutableStaticBinding` (`VarCodeGen.java:310-399`) reads and writes through that cell exactly as `LocalMutableVar` does: `pushCell` is the `GETSTATIC` (`:322-324`), `pushValue` (`:326-353`) branches on `BaseTask.inATransaction()` to `Transaction.TXRead` or the cell's getter and then casts, `assignValue` (`:355-386`) branches the same way to `TXWrite` or the setter, and `pushHandle` (`:388-390`) hands out the cell so a nested context captures the location rather than the value.

The cast after the read goes through `InstantiatingClassloader.generalizedCastTo` (`:352`) rather than a bare `CHECKCAST`, because the declared type may be a tuple or an arrow type, for which that helper emits a `castTo` call instead (`InstantiatingClassloader.java:2361-2394`); it is the same helper the surrounding `<clinit>` already uses for the same type name (`CodeGen.java:5880-5883`).

`assignHandle` throws a `CompilerError` (`:392-395`): the field is final, so rebinding the cell would be a compiler defect rather than a program error. It is unreachable on the paths that exist -- `generateTaskInit` and `generateFnExprInit` look the variable up again in the *child* context (`CodeGen.java:4662-4665`, `:4693-4696`), where it is a `MutableTaskVarCodeGen` -- and it is there so that a future path that reaches it says so instead of emitting a `PUTSTATIC` to a final field.

A top-level mutable variable that a nested context captures now becomes a `MutableTaskVarCodeGen` over the same cell (`CodeGen.createTaskLexEnvVariables:4636-4639`, constructor at `VarCodeGen.java:624-633`), and the three places that describe a captured mutable variable's type agree with it (`CodeGen.java:4745-4746`, `:4801-4802`).

`MutableFValue.make` (`runtimeValues/MutableFValue.java:20-24`) is new: `<clinit>` has the value on the stack before the cell exists, and a static factory keeps that sequence one instruction long. A static `make` is this package's convention (`FZZ32.make`, `FJavaString.make`, and `NamingCzar.make` is the name the generator uses everywhere).

`MutableFValue`'s payload and the transaction's read and write sets are typed `fortress.AnyType.Any`, the compiled world's top type, rather than `runtimeValues.FValue` (`MutableFValue.java:18-32`, `runtimeSystem/Transaction.java:28-29,145,153,227`), and the twelve emitted descriptors in `VarCodeGen` and the one in `CodeGen` name it through `NamingCzar.descFortressAny`. Why, below.

## The decisions

### 1. The cell's payload type is the language's top type, not `FValue`

The inherited edit stored the value in the cell as a `runtimeValues.FValue`, which is an abstract *class* (`runtimeValues/FValue.java:13`), and that regressed a program that works on the base tree: a top-level mutable variable of arrow type. A compiled closure's class is not a subclass of `FValue`, so the verifier rejected the store -- `VerifyError: Bad type on operand stack ... 'P12Arrow$\=fn@8...' is not assignable to 'com/sun/fortress/compiler/runtimeValues/FValue'` (`probes/probe-types-postedit.txt`, against `probes/probe-types-preedit.txt` where the same program prints `f(1) = 3`).

The same store already existed for *local* mutable variables, so I probed that as the control: `probes/P15LocalArrow.fss` and `P16LocalArrowTask.fss` fail with the same `VerifyError` on the base tree (`probes/failure-before-edit.txt`). The cell's payload type was too narrow to hold a Fortress value, and the top-level case was not special.

The alternatives were: (a) widen the payload to the language's top type; (b) keep `FValue` and fall back to the old bare-`PUTSTATIC` representation for the types that do not fit, keeping two representations and leaving `atomic` silently non-transactional for a variable of arrow type; (c) leave the regression and record it. I took (a). It is the only one of the three that gives `atomic.tex:38-42` for every type of variable, it removes rather than adds a special case, and as a side effect it fixes the pre-existing defect for local mutable variables of arrow type. Its cost is that it changes two runtime signatures, so every compiled class that mentions them must be rebuilt -- which the cache wipe in the recipe already does -- and that the verifier no longer type-checks the payload, since assignability to an interface is not checked at verification time; the probes do that instead.

`fortress.AnyType.Any` rather than `java.lang.Object`: it is the type the language gives every value, `FValue` implements it (`FValue.java:13`), a generated arrow interface extends it (`InstantiatingClassloader.java:979-987`), and it says in the signature what the cell holds.

### 2. `MutableFieldVar` is not repaired in this rung

`atomic.tex:38-42` does not distinguish a variable from a field, the interpreter puts both in the same transactional `ReferenceCell` (`ReferenceCell.java:26-28`), and the defect is real and I verified it: a mutable field of an object, incremented inside `atomic` by two threads, loses updates on the base tree and still loses them after this rung (`probes/P10Field.fss`; 34481 of 40000 at four threads on the base tree and 37831 after, exact at one thread in both -- `probes/failure-before-edit.txt`, `probes/pass-after-edit.txt`).

I decided against repairing it here, and this is a decision rather than an omission.

The reason is not the size of the instruction sequence but what the field representation is attached to. `MutableFieldVar` is constructed for *every* `VarDecl` field of an object, mutable or not, because codegen cannot yet tell them apart -- the team's own comment is "TODO need to spot for 'final' fields. Right now we assume mutable, not final" (`CodeGen.java:4313`) -- and the field's descriptor is also written into the class's own `visitField` (`:4335-4338`), into the constructor's instance-field initialization, and into the getters. So the same edit would change the representation of every field of every compiled object, and would allocate one cell per field per object, for as long as that TODO stands.

The alternative was to repair it in the same rung and accept that blast radius on the strength of a probe that no gated test covers. Against it: this rung's test needs the variable case; the field case needs its own test, and it needs the `final`-field distinction first, or it pays a cell for every immutable field in the language. It is a verified ledger row with a named fix, which is what rungs 6 and 7 did with row 317.

### 3. The captured cell, not a re-resolved global

A nested context could instead have re-resolved a top-level variable to its `GETSTATIC` and not captured it at all -- the singleton field is public and static, so a generated task can reach it directly -- which would have left `getFreeVars` (`CodeGen.java:4591-4610`) to exclude static bindings.

I kept the capture and made it capture the cell, because that is what the file's two right precedents do for the same construct and because excluding static bindings from the free-variable set would change the generated shape for *immutable* top-level variables too, which are captured by value today and are correct that way. The narrower change is the one that leaves immutable variables alone.

### 4. The gated test is the concurrent one, and no structural test was added

The brief allows a weaker structural check -- that the field carries `ACC_VOLATILE`, or that the read and write go through the transaction helpers -- if a genuinely concurrent test cannot be gated, and requires the limitation to be recorded either way.

A concurrent test can be gated here, and the measurement is above: `fastTrack` sets no thread count, the harness's subprocess inherits that, the fallback is `availableProcessors/2`, and the unrepaired tree fails the test on every run in that environment. So I did not add a structural test: it would have asserted the shape of the fix rather than the behaviour the specification names, and the concurrent test does the latter.

The residual limitation, recorded here and in the test's own comment: the fallback yields one worker where `availableProcessors` is 1 or 3 (`FortressExecutable.java:39-43`: the count is the processor count when it is at most 2, and `floor(n/2)` otherwise), and on such a machine `AtomicTopLevelVar` passes whether or not the implementation is correct. `MutableTopLevelVarInLoop` does not depend on the thread count and fails on the base tree at one thread, so the rung is not left without a gated failing test anywhere.

### 5. The two `.test` files use a property the harness implements

Both inherited `.test` files asserted `run_out_WIcontains=PASS`. The harness implements `_contains`, `_does_not_contain`, `_matches`, `_WImatches` and `_WCIequals` (`FileTests.java:141-180`) and does not implement `_WIcontains` at all, so that line is inert; the assertion that actually held was the default "stdout must contain PASS" that applies when no check matched (`FileTests.java:267-272`). The files now say `run_out_contains=PASS` and `run_out_does_not_contain=FAIL`, the form fifteen `.test` files already used on the base tree.

Eighteen `.test` files carried the inert `run_out_WIcontains` on the base tree and sixteen still do; where it is the only check they still assert PASS through that default, so nothing is silently unchecked. I did not touch the sixteen: it is a record defect in the corpus, not this rung's subject, and it is offered as a record line in `record.md`.

Worth one sentence for the next brief: eight of those sixteen are the last climb's own new tests (`compiler_tests/MutableTopLevelVar.test` and `library_tests/EqualityRung1`, `HasRankRung2`, `AssertRung4`, `LineConcatRung5`, `IntLiteralRung6`, `IntLiteralArithRung7`, `BigSumRung8`), because the brief names `library_tests/Boolean.test` as the format to copy and that file carries the inert line. The brief is propagating it.

## The recorded failure

`probes/failure-before-edit.txt`, taken on the batch base `49ee5e91` with no source modification (`git diff 49ee5e91 -- ProjectFortress/src` empty), after `ant compileAll` and a wipe and library-order rebuild of `default_repository/caches`, with the two tests in the form this rung lands them in.

The key lines, at the thread count the gate actually uses (`FORTRESS_THREADS` unset, 4 processors):

    THREADS=default run=1 MutableTopLevelVarInLoop :: FAIL: inLoop = 0 (expected 10), inArmA = 7 (expected 7), inArmB = 0 (expected 9)
    THREADS=default run=1 AtomicTopLevelVar :: FAIL: counter = 37826 expected 40000

`MutableTopLevelVarInLoop` fails on all nine runs, at one thread, at the default and at four; `AtomicTopLevelVar` fails on all three runs at the default and all three at four, and passes at one thread, which is the vacuity the test's comment records.

The same capture holds the pre-edit state of the three probes that bound the repair: `P12Arrow` prints `f(1) = 3` (a top-level mutable variable of arrow type *works* on the base tree, which is what made the inherited edit a regression), `P15LocalArrow` and `P16LocalArrowTask` fail with `VerifyError` (the same defect already present for local mutable variables), and `P10Field` gives 34481 of 40000 at four threads (the object-field defect this rung does not repair).

An earlier capture of the same failure for the earlier form of the tests is in commit `029b7454`; it was overwritten deliberately when the tests changed, because a recorded failure must be the failure of the test that lands.

## The recorded pass

`probes/pass-after-edit.txt`, same recipe on the landed tree: `ant compileAll` green (`tmp/build-pass-after-edit.log`), caches wiped and rebuilt in library order, 27 runs -- three programs, three thread settings, three runs each -- all PASS, including rung 3's own `MutableTopLevelVar`.

`P12Arrow`, `P15LocalArrow` and `P16LocalArrowTask` all print `f(1) = 3`: the regression is gone and the pre-existing defect for local mutable variables of arrow type is gone with it. `P10Field` still gives 37831 of 40000 at four threads, unchanged, as the `MutableFieldVar` decision says it should.

## The differentials

**Every gated program that uses `atomic` on the compiled path**, before and after: `other_compiler_tests/atomic0` through `atomic6` and `nestedTransactions0` through `nestedTransactions3` -- eleven programs, gated through `atomicTest.test` by `OtherCompilerJUTest` -- each run at one and at four threads. All twenty-two runs PASS on the base tree and all twenty-two PASS after (`probes/differential-preedit.txt`, `probes/differential-any.txt`). These programs exercise `LocalMutableVar` and `MutableTaskVarCodeGen`, whose emitted descriptors this rung changed, so they are the check on the payload-type edit.

**The interpreter, as evidence rather than oracle** (`probes/walk-differential.txt`): under `walk`, at one thread and at four, `MutableTopLevelVarInLoop` and `AtomicTopLevelVar` both print PASS. So the unrepaired compiled path diverged from the interpreter on both tests, the specification settles that divergence against the compiled run (`atomic.tex:38-42`, `bindings.tex:57-59`), and the repair removes it.

`P10Field` under `walk` gives the exact 40000 at one thread and at four, while the compiled path gives 38910 at four. That is a live walk-vs-compiled divergence which the specification also settles against the compiled run, and whose repair is outside this rung: it is the ledger row owed below, and it is the case the brief calls legitimate -- land, and open a verified row naming the defect, the clause, the probes both ways, the location and the fix.

**The type probes** (`probes/probe-types-*.txt`): a top-level mutable variable of an object type, of arrow type and of type `String`, and a local mutable variable of an object type, before and after. The arrow cases are the interesting ones and are discussed above; the rest are unchanged.

**A top-level variable exported through an api** does not link on the compiled path, before or after, mutable (`probes/P8*`) or immutable (`probes/P9*`): `NoClassDefFoundError: P8Api$shared`, from `Resource not found : P8Api$shared.class` (`probes/probe-runs2-preedit.txt`, `-final.txt`). The importing component resolves such a name to a singleton class in the *api's* namespace (`CodeGen.forVarRef:5926-5944` builds a `StaticBinding` from `jvmClassForToplevelDecl` on the *importing* component's package name, `:5940-5943`), which no component emits. This matters to the rung because the repair changes that singleton field's descriptor: had the import path worked, the reading side would have had to learn the new descriptor. It does not work, and did not before -- the two failures are the same class name in both states, with the programs compiled in each state first, at the end of `probes/probe-runs2-final.txt` -- so nothing regressed; the immutable probe is the control that shows mutability is not the cause. It is offered as a ledger row.

**The bisection probes** `P1`-`P6` (`probes/probe-runs-preedit.txt`) are what separate the two defects: `P1Atomic` (three `atomic` blocks in sequence) gives the right answer even unrepaired, because nothing else reads the variable; `P2For` and `P3ForAtomic` give 0 at one thread and at four, which is the capture-by-value defect and is independent of `atomic`; `P4LocalForAtomic`, the same program with a *local* variable, gives 10, which is the two right precedents working; `P5CallShape` and `P6Race` lose updates only above one thread, which is the transaction-membership defect.

## The ladder subset, and the second regression it caught

The driver is `run-subset.sh`, a copy of `explorations/compile-ladder/run-ladder.sh` restricted by `subset.txt` and given a ladder root and output directory inside this worktree, so its cache pruning cannot touch a parallel run. The inherited copy could not run at all -- it sourced `env.sh` one directory level too high -- which is why the first launch's last log is two lines of `unbound variable`; the path is fixed and matches rung 3's copy of the same driver (`rung3/run-subset.sh:11`).

The subset is every program in `ProjectFortress/tests/` that declares a variable at the top level of a component: I re-derived it with a column-anchored grep and it is exactly the inherited twenty -- nineteen matched by `^var` or `^name: T :=`, plus `XXXmutableTopVarWithoutType.fss`, whose `var (x, y) = (1, 2)` my expression missed and which `forVarDeclPrePass` rejects as a tupled left-hand side either way.

The "before" is the ladder re-run of the whole climb, `explorations/compile-ladder/after/results.tsv` (commit `266e437a`), which is a legitimate baseline for this rung: `git diff 266e437a 49ee5e91 -- ProjectFortress/src ProjectFortress/LibraryBuiltin Library build.xml` is empty, so no source changed between that run and the batch base.

The first run of the subset on the repaired tree differed from that baseline in exactly one file, and it was a regression: `tests/InitOrderWithMutable.fss` compiled but its run exited 1 with

    NoSuchFieldError: Class InitOrderWithMutable$cvar does not have member field 'fortress.CompilerBuiltin$String ONLY'
      at InitOrderWithMutable$bvar.<clinit>

That program is `bvar = cvar` where `var cvar: String = avar` -- an immutable top-level variable whose initializer reads a *mutable* top-level variable declared later in the component. `forVarDeclPrePass` registered each variable's binding only as the loop reached it (`CodeGen.java:1858-1867` before the fix), so while `bvar`'s initializer was being generated `cvar` was not in the lexical environment and the read fell into `forVarRef`'s fresh-import path (`CodeGen.java:5952-5970`), which builds a plain `StaticBinding` and reads the singleton field with the *value's* descriptor. That is precisely the shape this repair changed.

The fix is in `forComponent` (`CodeGen.java:1857-1867`): every top-level variable's binding is registered for the whole component, by the new `addTopLevelVarBinding` (`CodeGen.java:5933-5951`), before any initializer is generated; `forVarDeclPrePass` (`:5908-5931`) now only generates the class. The alternative was to teach the fresh-import path to look the declaration's mutability up in the component index and build the matching binding there; I rejected it because it puts the mutability decision in two places, and because registering first also covers an object declaration's field initializer that refers to a variable declared after it, which the same mismatch would have hit. It costs nothing at run time and is the smaller statement of the same fact: the lexical environment is complete before any code that reads it is generated.

This is legitimate under the specification rather than a convenience: `Specification/basic/components/initialization.tex:12-16,29-30` has all top-level variables and singleton object fields initialized before their use, so an initializer that refers to a variable declared later in the component is a program the language admits -- and the tree has a test for exactly that, which is how this was caught.

The second run of the subset, after that fix, matches the baseline on all twenty files.

## What this rung does not repair

A mutable *field* of an object is still outside the transaction (`VarCodeGen.MutableFieldVar:202-231`): decision 2 above, verified both ways by `probes/P10Field.fss` and under `walk`, and written out as a ledger row in `record.md`.

A top-level variable exported through an api still does not link, mutable or immutable (`probes/P8*`, `P9*`): pre-existing, unchanged by this rung, and written out as the second ledger row in `record.md`.

`atomic` used as an expression -- `atomic x := 1` rather than `atomic do x := 1 end` -- still has no visitor in `CodeGen` and reaches `defaultCase` (`map/spec-to-implementation.md:176`). Both new tests use the block form for that reason. `compiler_tests/Compiled170.fss`, which the inherited test comment cited as its model, is one of the programs that cannot compile for this reason and is in no `.test` file; the citation is gone.

Abrupt completion of an `atomic` block by anything other than a `TransactionAbortException` is not handled at all: `forAtomicBlock` catches only that class (`CodeGen.java:1737,1745`), so a Fortress exception thrown out of an `atomic` body leaves the task's transaction set and never committed or cleaned up. A deferred-write transaction discards the writes, which is what `atomic.tex:65-67` asks for, but the orphaned transaction stays current for the rest of the thread's work, and `atomic.tex:59-62`'s "writes within the block are retained" for an `exit` to an enclosing `label` is the opposite of what the same structure gives. I did not probe it and I am not claiming a defect here, only that the rung's repair does not reach it and that a reader who wants `atomic.tex:59-67` should start at `forAtomicBlock`.

## Files changed

    ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:85-90,310-399,624-633
    ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1857-1867,4647-4650,4756-4757,4812-4813,5872-5906,5908-5951
    ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/MutableFValue.java:18-32,42
    ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:19-20,28-29,113-114,122-123,145,153-155,183,200,227,247,256,271
    ProjectFortress/compiler_tests/AtomicTopLevelVar.fss          (new, 69 lines)
    ProjectFortress/compiler_tests/AtomicTopLevelVar.test         (new)
    ProjectFortress/compiler_tests/MutableTopLevelVarInLoop.fss   (new, 66 lines)
    ProjectFortress/compiler_tests/MutableTopLevelVarInLoop.test  (new)

Line ranges in the two `.java` files under `codegen/` are of the landed state. `VarCodeGen.java` also carries the twelve emitted descriptors that moved from `FValue` to `Any`, at `:342,350,375,384,500,508,536,545,673,685,717,728` in the base numbering.

## The probe files, and what each state is

    probes/failure-before-edit.txt   the recorded failure: the batch base 49ee5e91, tests as landed
    probes/pass-after-edit.txt       the recorded pass: the landed tree, same recipe
    probes/probe-runs-preedit.txt    bisection probes P1-P6, P8, P9 on the base tree
    probes/probe-runs2-*.txt         P10Field and the api-export probes; -preedit, -postedit, -any, -final
    probes/probe-types-*.txt         the type probes; -preedit (base), -postedit (inherited edit, FValue cell), -any and -final (landed)
    probes/differential-*.txt        the eleven gated atomic programs; -preedit (base), -any and -final (landed)
    probes/walk-differential.txt     the two tests and P10Field under the interpreter
    results.tsv, raw/               the ladder subset on the landed tree, against explorations/compile-ladder/after/results.tsv

`-postedit` and `-any` are two intermediate states, kept because they are the evidence for two of the decisions: `-postedit` is the inherited edit with an `FValue` cell, which is where the arrow-type regression shows, and `-any` is after the payload widening but before the pre-pass fix, which is where the ladder subset caught `InitOrderWithMutable`.

## What I did not run, and what is left

I did not run `ant testFast` or `ant testSystem`: the batch is gated once, by the coordinator, after the merge with R2, and both halves are required for this batch because both rungs are `.java` (`REPAIR-BATCH.md`, "The gate is the full pair"). Everything above is differential evidence, not the gate.

I did not run the shadow-first performance recipe (`perf-probes/template-check/run-all.sh`). Its subject in `REPAIR-BATCH.md` is the batch's machinery rather than a rung's edit, and the one measurement of the edit's cost that I do have is incidental: the library-order cache rebuild takes the same time before and after -- `AnyType` 19-21 s, `CompilerBuiltin` 103-104 s, `CompilerLibrary` 17-18 s, the other two 1-2 s -- in every one of the four rebuilds this rung did. A read or write of a top-level mutable variable now costs an `inATransaction()` call and a cell indirection where it cost a `GETSTATIC`; nothing in the compiler-world library declares such a variable, so no library code pays it.

Two named consequences for whoever merges this: the four `.java` files mean the bytecode cache must be wiped and rebuilt in library order, because every compiled class that mentions `MutableFValue.getValue`, `setValue`, `Transaction.TXRead` or `TXWrite` carries the old descriptor; and `CodeGen.java` is touched by both rungs of this batch, this one at `:1857-1867`, `:4647`, `:4756`, `:4812`, `:5872-5951`, R2 at `:3864,3874`.
