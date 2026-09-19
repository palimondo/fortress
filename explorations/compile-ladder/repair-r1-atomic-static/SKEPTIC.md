<!-- Skeptic's judgement of R1 of the repair batch of 2026-09-18, written 2026-09-19.
     First judgement of this rung.  One line per paragraph. -->

# R1 skeptic: refused, with one thing that must change

## Verdict

**Refused.** The one thing that must change: the rung turns a working program into a `java.lang.StackOverflowError`. A mutable variable declared at the top level of a component whose declared type is a user-defined object or trait type, assigned or read inside `atomic do … end`, ran correctly on the batch base and dies on the landed tree; the minimal case is twelve lines, one thread, no concurrency, and no trait (`probes/skeptic/SK25ObjNoAtomicVsAtomic.fss`).

This is the same kind of finding, in the same rung, as the arrow-type regression the worker found and repaired by widening the cell's payload, and it is the reason that repair was right. The worker's own object-type probe (`probes/P11Obj.fss`) does not use `atomic`, so it never crossed a user object through the transaction; my probe does, and the object-typed case is the common one in the language.

The cause is not in the rung's new bytecode. It is the eager string concatenation in `runtimeSystem/Transaction.java`'s disabled `debug` calls, which the rung's change of representation now routes every top-level mutable variable's read and write through. That defect has a fix, an idiom and a ledger row already in this tree, from rung 0 of this same climb (below). The repair is a few characters in a file this rung already edits, so the rung is close, not wrong in its design.

Everything else in the rung holds up, and much of it is better than the report claims. The recorded failure is real and I reproduced it independently on the base tree. The precedent search is accurate. The specification citations are accurate. The test exercises the defect. Nine further corrections are listed at the end, and they must be closed in the same repair round.

## What I did

I read `git diff 49ee5e91...HEAD` line by line and checked every file:line citation in `REPORT.md` and `record.md` against the tree. Forbidden files: the net diff touches only `ProjectFortress/src/`, `ProjectFortress/compiler_tests/` and `explorations/compile-ladder/repair-r1-atomic-static/` — no `FACTS.md`, ledger, `PLAN.md`, `POSITIONS.md`, `INDEX.md`, handover, `CLAUDE.md`, `protocol.md` or `.claude/`. The branch is pushed to `origin/wip/repair-r1-atomic-static` at `2682c2fa`, five commits off the base.

I wrote twenty-one probe programs of my own (`probes/skeptic/SK*.fss`) and ran each under the interpreter and under `fortress compile` + `fortress run`, at one thread and at four.

I then did an independent full reproduction on the batch base: reverted the four edited `.java` files to `49ee5e91`, `ant compileAll`, wiped `default_repository/caches`, rebuilt it in library order, ran the whole probe set plus the rung's two new tests, then restored the landed sources and repeated the whole cycle. Twice, for two probe sets. Captures: `probes/skeptic/skeptic-basetree.txt` (nineteen programs) and `probes/skeptic/skeptic-basetree2.txt` (the three that settle the refusal). The worktree is left as the worker left it — landed sources, landed build, landed caches, `git diff HEAD -- ProjectFortress/src` empty.

I did not run `ant testFast` or `ant testSystem`; the gate is the coordinator's, once, after the merge.

## 1. The recorded failure exists, and I reproduced it

`probes/failure-before-edit.txt` is the capture, taken on `49ee5e91` with no source modification, after `ant compileAll` and a wipe and library-order cache rebuild, with the two tests in the form the rung lands them in. It is committed at `f3a5eab1`, and an earlier capture for the earlier form of the tests is at `029b7454`.

My own reproduction agrees with it on every row (`probes/skeptic/skeptic-basetree.txt`):

    BASE   run MutableTopLevelVarInLoop THREADS=1 :: FAIL: inLoop = 0 (expected 10), inArmA = 7, inArmB = 0 (expected 9)
    BASE   run MutableTopLevelVarInLoop THREADS=4 :: FAIL: same
    BASE   run AtomicTopLevelVar        THREADS=1 :: PASS
    BASE   run AtomicTopLevelVar        THREADS=4 :: FAIL: counter = 34104 expected 40000
    LANDED run MutableTopLevelVarInLoop THREADS=1 :: PASS
    LANDED run MutableTopLevelVarInLoop THREADS=4 :: PASS
    LANDED run AtomicTopLevelVar        THREADS=1 :: PASS
    LANDED run AtomicTopLevelVar        THREADS=4 :: PASS

So the discipline is satisfied and the claim is true: both tests fail on the base tree and pass on the landed one, and `MutableTopLevelVarInLoop` fails deterministically at one thread, which is what carries the gate (see finding 3).

## 2. The diff against the specification

`Specification/basic/expressions/atomic.tex:38-42` — "All reads and all writes which occur as part of this evaluation will appear to occur simultaneously in a single atomic step with respect to *any* action performed by any thread which is dynamically outside" — verified in the tree at those lines. `:65-67` ("Any variable reverts to the value it held before evaluation of the \KWD{atomic} expression began") verified. `:96-107`, the chapter's worked example of a loop body accumulating into a shared counter inside `atomic`, verified. `basic/memory-model.tex:34-42` and `:69-75` verified. `basic/expressions/bindings.tex:57-59` and `basic/expressions/var-ref.tex:26-30` verified. `basic/components/source-code.tex:332-343` verified, including "the modifiers including the mutability of a variable must be the same in the exported and satisfying declarations", which is the right citation for the api row.

`basic/components/initialization.tex` is the one citation that deserves a note rather than a tick. The section is seven sentences long and ends at `:30`; it says top-level variables and singleton object fields are initialized "before their use" and prescribes no textual order. So it does not *license* a forward reference between initializers so much as decline to forbid one, and the tree's own `tests/InitOrderWithMutable.fss` is the evidence that the team intended it to work. The worker's derivation is defensible; the report should say the specification is permissive here rather than that it "has" the behaviour.

The edit does what the report says. `generateVarDeclInnerClass` (`CodeGen.java:5872-5905`) gives a mutable declaration's singleton field the cell's descriptor, wraps the initializer with `MutableFValue.make` in `<clinit>`, and restores `ACC_FINAL`; `VarCodeGen.MutableStaticBinding` (`:310-399`) reads and writes through `BaseTask.inATransaction()` then `Transaction.TXRead`/`TXWrite` or the cell's own accessors; `pushHandle` hands out the cell so a nested context captures the location. I traced the emitted operand-stack sequences of `pushValue` and `assignValue` by hand and they balance on both branches and merge consistently at the join labels, and the `SWAP`s are correct for the single-word reference values involved.

The edit is as small as the test needs, with one qualification: the twelve descriptor strings that changed from `FValue` to `Any` in `LocalMutableVar` and `MutableTaskVarCodeGen` are consequences of the payload decision, not of the top-level case, and they are the reason the arrow and String repairs came free. They are in scope.

`assignHandle` throwing a `CompilerError` (`VarCodeGen.java:392-395`) replaces a `PUTSTATIC` with a compiler abort. I probed the two paths that could reach it — `generateFnExprInit` via a closure that assigns the variable (`SK2Closure`) and `generateTaskInit` via task and nested-task capture (`SK7TaskNest`, and the rung's own `MutableTopLevelVarInLoop`) — and neither reaches it, so the unreachability claim holds for the shapes I could construct.

## 3. The precedent search is accurate

`LocalMutableVar` at `VarCodeGen.java:451`, `MutableTaskVarCodeGen` at `:609`, `MutableFieldVar` at `:202` with the author's own "URG, another case of meeting assumptions" at `:214`: all three verified at those lines, and the two right ones do route through `BaseTask.inATransaction()` and `Transaction.TXRead`/`TXWrite` over the `volatile` cell. The interpreter's `ReferenceCell` and `BaseEnv.putVariable` verified. `Transaction.java:27-28` does key the read and write sets by `MutableFValue` identity and `:231-250` does commit with `key.setValue(val)`, so the claim that a cell is the only representation of a location the transaction can hold is true. The rung followed the two right precedents.

The search missed one precedent, and it is the one that matters — see finding 1.

## 4. The test exercises the defect

`MutableTopLevelVarInLoop` is deterministic and fails on the base tree at one thread and at four, in my reproduction as well as the worker's. `AtomicTopLevelVar` fails on the base tree above one thread and passes at one thread, which the test's own comment records. Neither is a single-threaded test that would pass either way; the deterministic one fails for a different reason (the write went to a captured copy) than the concurrent one (the write was outside the transaction), and the two halves of the repair are separately covered. `SK8Swap`, my own, adds what neither checks — a two-location invariant inside one transaction — and discriminates sharply: base at four threads `x = 9692 y = -8877 sum = 815` against an invariant sum of 1000, landed PASS at one and four.

## 5. The competing-declaration grep

The worker's grep covered `ProjectFortress/tests/` only, twenty files, driven by `subset.txt`. I extended it to every corpus with a column-anchored expression. `compiler_tests` has three more: rung 3's `MutableTopLevelVar.fss`, `Compiled5.p.fss:15` (`var x: ZZ32 = 3`) and `Compiled9.b.fss:34` (`var A: String = "A string"`). The last two are named only by `compiler_tests/AfterTypeChecking.test` and `compiler_tests/AfterDisambiguate.test`, which stop at `typecheck` and `disambiguate`, so no codegen change can reach them. `other_compiler_tests` and `library_tests` have none; `not_passing_yet` has two and is ungated.

So the narrower grep was complete in effect. The report should say which corpora it covered, because "every program in `ProjectFortress/tests/`" is not the same claim as "every program in the gated corpora" and a later reader will read it as the second.

I also re-derived the ladder baseline claim: `git diff 266e437a 49ee5e91 -- ProjectFortress/src ProjectFortress/LibraryBuiltin Library build.xml` is empty, so `compile-ladder/after/results.tsv` is a legitimate "before" for the subset. `results.tsv` matches it on all twenty files.

## 6. My own differentials

Twenty-one programs, each under `walk` and under `compile` + `run`, at one thread and four, on the landed tree (`probes/skeptic/skeptic-differential-landed.txt`, `skeptic-controls-landed.txt`) and nineteen of them also on the base tree (`skeptic-basetree.txt`, `skeptic-basetree2.txt`). The ones that decided something:

| probe | what it is | walk | compiled, base | compiled, landed |
|---|---|---|---|---|
| `SK25ObjNoAtomicVsAtomic` | top-level `var` of a plain object type, one plain write then one write inside `atomic` | both writes | both writes | plain write, then **StackOverflowError** |
| `SK18Trait` | top-level `var` of a trait type written inside `atomic` | `sh = Ci` | `sh = Ci` | **StackOverflowError** |
| `SK24TraitAsString` | the same with an `asString` getter on the trait | `sh = Ci` | `sh = Ci` | `sh = Ci` |
| `SK21TraitNoAtomic` | the same without `atomic` | `sh = Ci` | `sh = Ci` | `sh = Ci` |
| `SK20LocalTrait` | **local** `var` of a trait type written inside `atomic` | `sh = Ci` | StackOverflowError | StackOverflowError |
| `SK12ArmAtomic` | top-level `var`, `atomic` in each arm of `do … also do … end` | `g = 3` | VerifyError | VerifyError |
| `SK13LocalArmAtomic` | the same with a **local** `var` | `g = 3` | VerifyError | VerifyError |
| `SK7TaskNest` | top-level `var`, `atomic` in a nested `do … also` | `g = 43` | VerifyError | VerifyError |
| `SK8Swap` | two top-level `var`s moved inside one `atomic` by two threads | PASS | PASS at 1, `sum = 815` at 4 | PASS at 1 and 4 |
| `SK2Closure` | top-level `var` assigned from inside an `fn` expression | `g = 7` | `g = 0` | `g = 7` |
| `SK16LocalString` | **local** `var` of type `String` assigned inside `atomic` | `st = ab` | `VerifyError: Bad type on operand stack` | `st = a b` |
| `SK5InitFwd` | forward references among top-level initializers, plus an object field initializer reading a later variable | **ProgramError** | correct | correct |
| `SK3Throw` / `SK19ThrowLocal` | a Fortress exception thrown out of an `atomic` body | reverts to 100, then 55 | StackOverflowError | StackOverflowError |
| `SK1Tuple` | top-level `var` of tuple type, destructured and rebuilt inside `atomic` in a `for` | `p = (8,54)` | static type error on `println` | static type error on `println` |
| `SK4Nested`, `SK9While`, `SK15String`, `SK17ZZ64`, `SK6Types` | nested `atomic`; `while`; `String`; `ZZ64`; five types at once | correct | correct except `SK6Types` | correct except `SK6Types` |

`SK2Closure` and `SK16LocalString` are repairs the rung makes and does not claim: a top-level mutable variable assigned from inside a closure was silently lost before (`g = 0`), and a *local* mutable variable of type `String` assigned inside `atomic` failed the verifier on the base tree and works now. The payload widening did more than the report says.

`SK5InitFwd` is a walk-versus-compiled divergence in the interpreter's disfavour that the rung created the occasion for and did not record: `walk` rejects an object field initializer that reads a top-level variable declared later in the component with `ProgramError: Attempt to find type of uninitialized variable: thunk (IntLiteralExpr …)`, while the compiled path — base and landed alike — prints the right answers. Under rule 4 this is the second outcome: the specification (`initialization.tex:15-16,29-30`, all top-level variables and singleton object fields initialized before their use, no order prescribed) settles it against the interpreter, so a verified ledger row is owed against `walk`, not a repair here.

## Finding 1 — the refusal: a working program becomes a StackOverflowError

`probes/skeptic/SK25ObjNoAtomicVsAtomic.fss`, in full:

    component SK25ObjNoAtomicVsAtomic
    export Executable
    object Box(n: ZZ32) end
    b: Box := Box(1)
    run(): () = do
        b := Box(2)
        println("plain write ok, b.n = " b.n)
        atomic do b := Box(3) end
        println("atomic write ok, b.n = " b.n)
      end
    end

On `49ee5e91`, at one thread and at four: `plain write ok, b.n = 2` then `atomic write ok, b.n = 3`. On the landed tree, at one thread and at four: `plain write ok, b.n = 2` then `java.lang.StackOverflowError`. Both rows are in `probes/skeptic/skeptic-basetree2.txt`, from the same build-and-cache-rebuild cycle, and `SK18Trait` gives the same before-and-after in `skeptic-basetree.txt`.

The entry point is exact (`probes/skeptic/sk25-recursion-entry.txt`, taken with `-XX:MaxJavaStackTraceDepth=0`, 4,391 frames):

    at fortress.CompilerBuiltin$Object$DefaultTraitMethods.asString(…/LibraryBuiltin/CompilerBuiltin.fss:338)
    at com.sun.fortress.compiler.runtimeValues.FValue.toString(FValue.java:26)
    at java.base/java.lang.String.valueOf(String.java:4530)
    at com.sun.fortress.compiler.runtimeValues.MutableFValue.toString(MutableFValue.java:39)
    at java.base/java.lang.String.valueOf(String.java:4530)
    at com.sun.fortress.runtimeSystem.Transaction.TXWrite(Transaction.java:227)
    at SK25ObjNoAtomicVsAtomic.run(…/SK25ObjNoAtomicVsAtomic.fss:11)

Three facts make the cycle, all pre-existing: `CompilerBuiltin.fss:338` defines `trait Object`'s `asString` as `jAsString(self)`; `CompilerBuiltin.fss:270` binds `jAsString` to `stringOps.asString`, which `nativeHelpers/stringOps.java:38-40` implements as `a.toString()`, under the author's own "this can't be right! DRC"; and `FValue.java:25-27` defines `toString()` as `this.asString().toString()`. Any Fortress value that does not override `asString` — which is every user-defined object and trait unless it defines one, as `SK24TraitAsString` confirms by working — recurses forever the moment anything stringifies it.

What the rung contributes is the stringification. `Transaction.java:227` builds its message by concatenation, unconditionally, because Java evaluates the argument before the call; `debug` is `private static boolean debug = false` at `:30` and the method at `:56-59` tests that flag and throws the string away. Thirteen other `debug(` call sites in the same file do the same, nine of them stringifying a Fortress value or a whole read/write hash table: `:162`, `:166`, `:185`, `:203`, `:227`, `:232`, `:249`, `:265`, `:274`. Before this rung a top-level mutable variable's write was a `PUTSTATIC` and never reached any of them; after it, every read and write inside a transaction does.

The precedent for the fix is in this tree, from rung 0 of this same climb, three rungs before R1. `FACTS.md:14`: "guarding `BaseTask.inATransaction()`'s debug message with the `debug` flag it already had (`BaseTask.java:248`, ledger row 302)". The code is `if (debug) debug("inATransaction: …")` at `BaseTask.java:248` today. Ledger row 302 measures that the same eager string was about 34 % of a 156× slowdown. And `map/modules-and-phases.md:433` — a line the report cites the surrounding paragraph of — says in so many words: "`inATransaction` builds its debug string eagerly on every call (`:246-249`), the one-line defect already on record in FACTS." The map named it, the rung read the paragraph, and the sibling file with fourteen more of them is the file the rung edits.

So this is rule 2 of the batch, precedent search, failing on the one precedent that would have caught a regression: the team has solved this here already, once, in the file next door, in this climb, and it is on the ledger.

What must change, in one sentence: a top-level mutable variable of a user-defined object or trait type read or written inside `atomic` must not crash. The narrowest repair consistent with rung 0 is to guard `Transaction.java`'s `debug` call sites with the flag they already have, at least the nine that stringify a value; the case must then be probed on both trees and added to the rung's evidence, and `MutableFValue.toString`'s dereference of the payload (`MutableFValue.java:38-40`) reconsidered, since it is a second way into the same cycle. The underlying `asString`/`toString` recursion is a separate, older defect and belongs in a ledger row, not in this rung.

I considered approving this as a correction rather than refusing, and rejected that. It needs a source edit, a rebuild, a cache rebuild and a fresh differential, which is a repair round and not something the commit stage can close from a checklist. And the rung already applied exactly this standard once: it did not file the arrow-type regression as a ledger row, it fixed it, on the argument that widening "is the only one of the three that gives `atomic.tex:38-42` for every type of variable". The object-typed case is the type of variable for which it now gives a crash.

## Finding 2 — `atomic` in an arm of `do … also do … end` does not verify at all

`SK12ArmAtomic`, `SK13LocalArmAtomic` and `SK7TaskNest` all die with `java.lang.VerifyError: Inconsistent stackmap frames at branch target 5` (`probes/skeptic/sk13-verifyerror.txt`), on the base tree and on the landed tree, with a top-level variable and with a local one. Pre-existing, untouched by this rung, and settled as pre-existing by the local-variable control on both trees.

The mechanism is two code sites that do not compose. `CodeGen.generateTaskCompute` (`CodeGen.java:4719-4742`) emits `ALOAD this; DUP; INVOKESTATIC BaseTask.setTask` at `:4733-4738`, leaving `this` on the operand stack for the `PUTFIELD` of the task's result at `:4741`, after the body is generated at `:4740`. `CodeGen.forAtomicBlock` (`:1729-1756`) makes `startOver` the first label of the block and jumps back to it from the handler, and the handler's stack has been cleared to the exception and then popped — so the retry branch arrives at a label whose frame expects `this`, with nothing. The disassembly in the capture shows it: `goto -90` at bci 95 to a `same_locals_1_stack_item_frame(@5, Object[#7])`.

This bounds the rung's own claim and is not in the report. `atomic` on a top-level mutable variable works when the `atomic` block is a function body (`AtomicTopLevelVar` puts it in `bump()`) or a `for` body (`MutableTopLevelVarInLoop`), and does not compile to a verifiable class when it is the trailing expression of a generated task body — which is exactly the shape `atomic.tex:77-81` describes when it says implicit threads created within an `atomic` expression "may synchronize with one another using nested `atomic` expressions". This is the brief's legitimate fourth case: land, and open a verified ledger row naming the defect, the two locations, the probes both ways and the fix.

## Finding 3 — the gate's thread count comes from the ambient environment, and this repo pins it to 1

The `record.md` FACTS line states that "`compiler_tests` runs its programs with more than one worker, so a concurrency defect on the compiled path can be gated". The chain it cites is correct as far as it goes — `fastTrack` sets `FORTRESS_CACHES` and no thread count (`build.xml:927-953`), the harness's subprocess inherits the environment (`FileTests.java:480-486`), and `FortressExecutable.getNumThreads` falls back to `availableProcessors/2` (`FortressExecutable.java:37-44`) — but the fallback only applies when `FORTRESS_THREADS` is unset, and Ant's forked JUnit JVM inherits the shell's environment.

`experiment/env.sh:6` exports `FORTRESS_THREADS=1`, and the batch brief instructs every agent to source it in every shell. The project's own record says what follows: `explorations/coordinator/iteration-cost.md:126`, "`experiment/env.sh` pins it to 1 and `systemShard` sets it to 1 explicitly in the JVM environment, so no run in the climb used anything else." The worker had to `unset FORTRESS_THREADS` in its own script to obtain the "THREADS=default" rows (`tmp/final-capture.sh:40`).

Measured consequence, from my base-tree run: `BASE run AtomicTopLevelVar THREADS=1 :: PASS`. So a gate launched from a shell that sourced `env.sh` — the normal way in this project — would not have caught the defect through the concurrent test. It would have caught it through `MutableTopLevelVarInLoop`, which fails at one thread, so the rung is not left without a gated failing test and the discipline is intact. But the FACTS line as written will mislead the next person into believing the compiled corpus sees concurrency by default, and the residual limitation the report records ("one worker where `availableProcessors` is 1 or 3") is much smaller than the real one.

## Findings 4 to 9 — record corrections

**4.** `REPORT.md`: "eleven programs, gated through `atomicTest.test`". `other_compiler_tests/atomicTest.test` names ten — `atomic0` through `atomic6` and `nestedTransactions0`, `1`, `2`. `nestedTransactions3.fss` exists and is in no `.test` file. The differential's "22 of 22 runs" is therefore 20 gated runs plus 2 ungated.

**5.** `REPORT.md`: "Eighteen `.test` files carried the inert `run_out_WIcontains` on the base tree and sixteen still do". `git grep -l run_out_WIcontains 49ee5e91 -- 'ProjectFortress/**/*.test'` gives 16, and 16 is also the count at `HEAD`. 18 was the count at this branch's inherited commit `029b7454`, which carried the two new tests in their `WIcontains` form. The `record.md` FACTS line ("The sixteen `.test` files that still use it") is right; the REPORT sentence is not.

**6.** The `record.md` FACTS line says `FileTests.generalTestFailed` "handles `_contains`, `_does_not_contain`, `_matches`, `_WImatches` and `_WCIequals` only (`FileTests.java:141-180`)". It also handles `_equals`, at `FileTests.java:190`, just past the end of the cited range. The load-bearing part — that `_WIcontains` is implemented nowhere and that the assertion that held was the default at `:267-272` — is correct and I verified it. Fix the list or drop "only".

**7.** The report's cost statement, "A read or write of a top-level mutable variable now costs an `inATransaction()` call and a cell indirection where it cost a `GETSTATIC`", is materially incomplete and, given finding 1, is the sentence that should have led to the defect. Inside a transaction each read and each write also renders the value into a discarded string (`Transaction.java:162,166,227`), and each commit renders both hash tables (`:232`) and every entry in them (`:249`). `AtomicTopLevelVar` performs 40,000 such transactions. This is the cost ledger row 302 measured at about 34 % of a 156× gap in its sibling file.

**8.** The `record.md` FACTS line for the rung should carry the bound that finding 2 establishes, so that "a top-level mutable variable is in the transaction on the compiled path" is not read as "`atomic` on a top-level mutable variable works", which is false for an `atomic` block in a `do … also` arm.

**9.** The report should say which corpora the competing-declaration grep covered (`ProjectFortress/tests/`), and may cite finding 5 above for the other three.

## The failure-mode question

The rung replaces two quiet wrong answers with correct values, which is the right direction and costs no diagnosability: a lost update inside `atomic` above one thread, and a write to a captured copy at any thread. Neither was a throwing stub or a loud failure, so nothing loud became quiet. `assignHandle` moves the other way, replacing a `PUTSTATIC` with a `CompilerError`, which is louder and is unreachable on the paths I could construct.

The one direction that must be recorded is the reverse of the question, and it is finding 1: for a top-level mutable variable of a user-defined object or trait type inside `atomic`, a **correct value became a loud failure** — `StackOverflowError` with 4,391 frames of a three-frame cycle, from which the next person to meet it learns nothing about `Transaction.java:227`. That is not a diagnosability trade, it is a regression, and it is why this rung is refused rather than corrected.

## What the repair round must close

1. The regression of finding 1, with probes on both trees in the rung's evidence.
2. A verified ledger row for finding 2, with both code sites and the disassembly.
3. A verified ledger row against the interpreter for `SK5InitFwd`, or a sentence saying why not.
4. The FACTS line of finding 3, qualified with `experiment/env.sh:6` and `iteration-cost.md:126`.
5. Corrections 4, 5, 6, 7, 8 and 9 above.
6. The `initialization.tex` note in section 2: permissive, not prescriptive.

My probe programs and captures are in `explorations/compile-ladder/repair-r1-atomic-static/probes/skeptic/`; the worker is free to reuse them, and `SK25ObjNoAtomicVsAtomic.fss` is the shortest test of the thing that must change.

## Reproducing this

`probes/skeptic/run-differential.sh`, `run-controls.sh` and `run-basetree.sh` are the three drivers, as run. They copy the `SK*.fss` sources into `ProjectFortress/skprobes/` (left in place, untracked, like the worker's `r1probes/`) and write their captures back into this directory. `run-basetree.sh` reverts the four edited `.java` files to `49ee5e91`, rebuilds, wipes and rebuilds the cache in library order, runs its program list, then restores the landed sources and repeats; it does not source `experiment/env.sh`, because that file's `rm -rf /tmp/fortress*rats` would hit the parallel R2 worktree, and it sets the same variables by hand instead — which also means it does not inherit `FORTRESS_THREADS=1`, and each run sets the count explicitly.
