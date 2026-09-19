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

State of the worktree when I finished: landed sources (`git diff HEAD -- ProjectFortress/src` empty), `ant compileAll` green, and `default_repository/caches` rebuilt in library order by the last base-tree cycle. That cycle wiped the cache, so it no longer holds the worker's `P*` probe jars; the rung's three `compiler_tests` programs I recompiled and re-ran, and they pass at one thread and at four on the freshly rebuilt cache. Anything else must be recompiled before it is run.

---

<!-- Second judgement of this rung, written 2026-09-19 after the repair round at 03cb9a48.
     Appended rather than written over the first judgement above, because JUDGE.md and
     REPORT.md both cite that text; the decision is noted in "How this file is arranged"
     below.  One line per paragraph. -->

# R1 skeptic, second judgement: approved, with three required corrections

## Verdict

**Approved.** The ground of the first refusal is closed: a mutable variable whose declared type is a user-defined object or trait type, read or written inside `atomic do … end`, no longer crashes, and I established that by my own probes on the repaired tree as well as by re-reading the worker's. The repair is the precedent the first judgement named, in the form that precedent used, at every remaining eager call site in the two transaction runtime files, and nothing else. The record is honest, including where it retracts its own earlier sentences and where it corrects the ruling's arithmetic against the tree — which I checked, and the worker is right: the two files hold twenty-three `debug(` call sites, twenty-two of which were eager.

Three corrections must be closed at the commit stage. They are text, not rebuilds, and they are listed at the end with the reason each is required rather than preferred.

## How this file is arranged

Everything above this rule is the first judgement, refused, at `81644c3e`. I did not overwrite it: `JUDGE.md` and `REPORT.md` both cite it by section, and the judge's own instruction to the worker was to write the round's captures to new names so the earlier evidence would stand. This section is the second judgement of the same rung and reaches the opposite verdict for the stated reason.

## What I did

Read `git diff 8b15d4af..HEAD` line by line — the repair round — and `git diff 49ee5e91...HEAD` for the rung's net change; checked every file:line citation in the round's new text (`REPORT.md`'s new sections, all five FACTS lines, the three ledger appends and the six proposed rows) against this worktree; and read the specification passages at the lines cited, in `Specification/basic/`.

Confirmed the build the evidence rests on is the build in the worktree, rather than taking the capture's word: `ProjectFortress/build/.../Transaction.class` and `BaseTask.class` are newer than their sources, and `javap -c -p com.sun.fortress.runtimeSystem.Transaction` shows `TXWrite` beginning `getstatic debug:Z; ifeq 45` with every `String.valueOf` inside the branch. So the guard is in the class file, not only in the source.

Wrote seven probe programs of my own (`probes/skeptic/SQ1`–`SQ7`), none of them a program the worker wrote, and ran each under `bin/fortress FILE.fss` and under `compile` + `run` at one thread and at four. Captures: `probes/skeptic/skeptic2-round2.txt` (five programs, two runs per thread count) and `probes/skeptic/skeptic2-sq6-sq7.txt` (the two I ran by hand). Driver: `probes/skeptic/run-skeptic2.sh`, which sets the environment by hand rather than sourcing `experiment/env.sh`, because that file's `rm -rf /tmp/fortress*rats` would hit the parallel R2 worktree; it also `unset`s `JAVA_TOOL_OPTIONS`, whose absence cost my first run (`tmp/skeptic2.log`).

I did not run `ant testFast` or `ant testSystem`, did not rebuild the base tree — the round's claims about `49ee5e91` are either the first judgement's own independent reproduction or are flagged below — and did not edit the worker's source changes.

Forbidden files: the net diff touches only `ProjectFortress/src/`, `ProjectFortress/compiler_tests/` and `explorations/compile-ladder/repair-r1-atomic-static/`. No `FACTS.md`, ledger, `PLAN.md`, `POSITIONS.md`, `INDEX.md`, handover, `CLAUDE.md`, `protocol.md` or `.claude/`.

## 1. The recorded failure exists, for this round and for the rung

`probes/failure-object-type-before-guard.txt` is the capture the discipline requires for the new test: `compiler_tests/AtomicTopLevelObjectVar` compiled and run on the sources of `8b15d4af` — the tree the rung had landed, before either guard existed — at `FORTRESS_THREADS=1` and `=4`, both `exit=1`, `java.lang.StackOverflowError`, `PASS lines: 0`, innermost named frame `CompilerBuiltin$Object$DefaultTraitMethods.asString(CompilerBuiltin.fss:338)`. Its header names the commit, the recipe and the build state. The timestamp (01:40:21) precedes the guards' commit (`95647b4d`) and the build that carries them (the class files are 01:41), so the order of work is the order the discipline demands.

The rung's original recorded failure on the batch base is `probes/failure-before-edit.txt`, which the first judgement reproduced independently after its own revert, rebuild, cache wipe and library-order rebuild (`probes/skeptic/skeptic-basetree.txt`). Both tests fail there; `MutableTopLevelVarInLoop` fails at one thread.

## 2. The diff, line by line

`runtimeSystem/Transaction.java`: fourteen lines, each a single-line replacement prefixing `if (debug) ` to an existing `debug(` call — `:128, 140, 162, 166, 180, 185, 198, 203, 227, 232, 240, 249, 265, 274`. `runtimeSystem/BaseTask.java`: eight the same — `:183, 186, 193, 195, 207, 234, 242, 258`. Nothing else in either file, no line moved, no comment added, which is what the report claims and what the register asks for.

The edit is semantics-preserving, which is the property that matters for a guard placed in front of a method that already tests the same flag. In `Transaction.java` the flag is `private static boolean debug = false` (`:30`) and `debug(String)` (`:56-58`) prints only when it is set; in `BaseTask.java` it is `private static Boolean debug = false` (`:50`) with the same shape at `:52-53`. Neither is `final`, so neither guard is folded away; neither `debug(String)` has a side effect other than the print, and `Transaction.ancestrialString()` (`:34-53`), which the instance method calls, builds a local `Stack` and returns a string. `if (debug) result.debug("TXBegin:")` at `:140` is a static method calling a private instance method on another instance of its own class, which is legal and which compiled.

Is it as small as the test needs? No: nine of `Transaction.java`'s fourteen sites are the ones that can reach the cycle, and `BaseTask.java`'s eight cannot reach it at all. Both extensions are the judge's explicit instruction and the worker's recorded decisions, each with its alternative named, and I agree with both on the merits: one rule per file is checkable with one `grep`, and `BaseTask.getCurrentTransaction` at `:234` builds a `Thread` string on every transactional read and write this rung newly routes through it, which is the mechanism ledger row 302 measured.

I checked the sweep for completeness rather than trusting the two line lists: `grep -rn 'debug(' ProjectFortress/src/com/sun/fortress/runtimeSystem/*.java` leaves no unguarded call site anywhere in that package, only the two method declarations. Nothing on the transactional path still builds a message eagerly.

I also considered the shape the worker did not take and the judge did not raise: a `debug(String, Object…)` or a supplier-based overload, which would make the guard unnecessary rather than repeated. Against it: it changes a signature in a file whose signatures this rung already changed once, it is not the idiom the team used when it met this defect in the sibling file, and batch rule 2 makes the existing precedent the standard. The guard is right.

## 3. The precedent

`BaseTask.java:248`, `if (debug) debug("inATransaction: ftr = " + ftr + " task = " + ftr.getTask());` — rung 0's own fix, verified in the tree at that line and in that form, with `rung0/REPORT.md:11` and its diff hunk at `:22-23`, `coordinator/FACTS.md:14` and ledger row 302 at `explorations/fortress-gap-ledger.md:397` all saying what the report says they say. `map/modules-and-phases.md:435` is the sentence naming the defect, and the worker's correction of my `:433` to `:435` is right: `:433` is the paragraph's `Tasks:` line.

The round followed that precedent character for character. The storage precedents of the first pass stand as I verified them the first time: `LocalMutableVar` (`VarCodeGen.java:451`) and `MutableTaskVarCodeGen` (`:609`) right, `MutableFieldVar` (`:202`, with the author's "URG, another case of meeting assumptions" at `:214`) wrong, and the rung follows the two right ones.

## 4. The test

`compiler_tests/AtomicTopLevelObjectVar` is gated: `CompilerJUTest.suite()` runs "all `.test` files in `ProjectFortress/compiler_tests`" by discovery (`tests/unit_tests/CompilerJUTest.java:36-43`), so no registration step is needed, and the `.test` file asserts `run_out_contains=PASS` with `run_out_does_not_contain=FAIL`, both of which the harness implements (`FileTests.java:147,155`).

It exercises the defect and is not vacuous: it fails at one thread on the tree it guards, deterministically, with no `PASS` line at all, and the type it uses declares no `asString` of its own — which is the whole point, since `SK24TraitAsString` shows the same program with an `asString` never entered the cycle. The first judgement's warning about a single-threaded test that would pass either way does not apply to this one, nor to `MutableTopLevelVarInLoop`; it applies to `AtomicTopLevelVar`, and the round's own FACTS line and the test's rewritten comment now say so.

One claim about this test is an inference stated as a fact, and it is required correction 2 below: that its local half "fails on `49ee5e91` too, which `SK20LocalTrait` shows". `SK20LocalTrait` is a *trait*-typed local variable; the test's `var c: Box` is object-typed, and that program has never been run on the base tree. The inference is sound — `LocalMutableVar` has always routed through `TXWrite`, and `Box` has no `asString` — but it is an inference.

## 5. The competing-declaration grep

I ran it myself over all five corpora, column-anchored, for the names this round adds. `object Box` occurs nowhere else in `tests`, `compiler_tests`, `other_compiler_tests`, `library_tests` or `not_passing_yet`; `AtomicTopLevelObjectVar` occurs only in its own two files. Top-level `b` and `c` occur in several programs (`tests/TestCompiledEnvironments.fss:78-79`, `tests/immutableTopLevel.fss:25-26`, `compiler_tests/Compiled15.c.fss:16`, others), each inside its own component and none in an `.fsi`, so none can collide.

The one that could have mattered is `Box` in a library, and it does not: `grep -rn '\bBox\b'` over `ProjectFortress/LibraryBuiltin/*.fss`, `*.fsi` and `Library/Compiler*.fss`, `*.fsi` — the compiled path's prelude — finds nothing. `Library/FortressLibrary.fss:4348` declares a generic `object Box[\T\](var val: T)`, which is the interpreter's library, and the measured answer is that the two coexist: `walk AtomicTopLevelObjectVar :: PASS` in `probes/pass-after-guard.txt`, and my own `SQ1`, `SQ2`, `SQ3`, `SQ5` and `SQ7` all declare a monomorphic `Box` and run correctly under `walk`.

## 6. The record fragment

Every citation in the five FACTS lines and the six rows that I could check, I checked, and they hold at the lines given: `Specification/basic/expressions/atomic.tex:38-42`, `:59-62`, `:65-67`, `:96-107`, `:77-81`; `also.tex:17-20` (the sentence is at `:19-20`); `variables.tex:122-123` verbatim; `components/initialization.tex:15-17,29-30`; `objects.tex:202-203`; `memory-model.tex:34-42`, `:69-75`; `CodeGen.java:1735,1738,1747,1753` (the sole handler is `TransactionAbortException`), `:4326` (the team's `final`-field TODO), `:5923`, `:5952-5970` with `:5957`, `:5966`, `:5967`; `VarCodeGen.java:202,214,218-220,310,451,609`; `FValue.java:25-27`; `FException.java:22-23`; `stringOps.java:38-40` with the commented alternative at `:39`; `MutableFValue.java:18`; `CompilerBuiltin.fss:270,338`; `FileTests.java:147,155,163,171,180,190` and the default at `:266-272`; `FortressExecutable.java:37-45`, whose first statement is the `FORTRESS_THREADS` read; `build.xml:927-953` (no thread count, no `newenvironment`) and `:1184`; `experiment/env.sh:6`; `iteration-cost.md:126`; `tests/GS2.fss:16`; `library_tests/AssertRung4.fss:48`. `git grep -l run_out_WIcontains` gives 16 at `49ee5e91` and 16 at `HEAD`, as the corrected line says.

The ledger note does not renumber or move anything. The three appends are to rows 59 (`:261`), 70 (`:301`) and 302 (`:397`), all of which exist and say what the appends assume they say; the ledger's last row is 318 (`:329`), so the six proposed rows 319–324 are the next free numbers, and the fragment says in its own words that the coordinator may renumber if R2 proposes rows.

Six months from now a reader can check all of it, with two exceptions that are the reason for corrections 1 and 3 below: one citation block in `REPORT.md` is off by one throughout, and row 324 states a mechanism in a column whose notes say the row was measured.

The claim that R2 cannot conflict I verified from this worktree, read-only: `git diff --stat 49ee5e91 origin/wip/repair-r2-literal-wrap -- ProjectFortress/src ProjectFortress/LibraryBuiltin Library` is `Library/CompilerLibrary.fss` 4 lines, `compiler/codegen/CodeGen.java` 7 lines, `compiler/runtimeValues/FIntLiteral.java` 19 lines. Neither runtime file. Nothing under `/home/user/fortress-r2` was opened.

## 7. My own differentials

Seven programs, mine, on the repaired tree. The first five ran twice at each thread count through `run-skeptic2.sh`; `SQ6` and `SQ7` I ran by hand.

| probe | what it is, and why the rung's own tests do not cover it | walk | compiled, 1 and 4 threads |
|---|---|---|---|
| `SQ1ReadObj` | an object-typed top-level variable **read** inside `atomic` — `TXRead` (`:162,166`) and `pushValue`, where the gated test only writes | `PASS m = 5` | `PASS m = 5` |
| `SQ2NestedObj` | **nested** `atomic` over two object-typed top-level variables — `TXValidateHelperNestedTransaction` (`:198,203`) and the inner commit into the parent's read and write sets (`:265,274`) with object values | `PASS` (102, 12) | `PASS` |
| `SQ3ObjContend` | 2,000 transactional read-modify-writes of an object-typed top-level variable from a parallel `for` — the abort, retry and commit path (`:128,185,240,249`) under real contention, and the rung's invariant at a type other than `ZZ32` | `PASS` | `PASS`, both runs at four threads |
| `SQ4NoisyAsString` | the object's own `asString` prints a marker, so **every** call to it is visible: the direct test that the guards removed the stringification and not merely the crash | one marker, the explicit one | one marker, the explicit one |
| `SQ5ImmutableObj` | an **immutable** top-level object binding read inside `atomic` beside a mutable one — the control that the non-cell case still reads correctly from inside a transaction | `PASS` | `PASS` |
| `SQ6OrphanTx` | an attempt to falsify row 324's mechanism with a read from a second implicit thread | 100 in both threads | **7** in both |
| `SQ7ObjThrow` | the abrupt-`atomic` case at an **object** type, which row 324 measured only at `ZZ32` | 100 | **7** |

`SQ4` is the one I would keep if I could keep one. It is the positive statement of the repair rather than the absence of a crash: a value whose type *has* an `asString` never entered the cycle, so before the guards this program did not crash — it simply called `asString` on the transactional path, once per read, per write and per commit. After them the only call is the one the program asks for, at one thread and at four, under `walk` and compiled alike. Nothing on the transactional path stringifies a Fortress value any more, and that is measured, not inferred from a `grep`.

`SQ6` and `SQ7` are the same divergence, and it is one the record already carries. Under rule 4 this is the **fourth outcome**: the specification settles it, against the compiled path — `Specification/basic/expressions/atomic.tex:63-67`, "If it completes abruptly by throwing an uncaught exception … Any variable reverts to the value it held before evaluation of the `atomic` expression began", and in `SQ7` the exception is uncaught *within* the `atomic` expression, which is the condition the clause states — and the repair is outside this rung, in `forAtomicBlock`'s single handler, which R1 does not touch. That is ledger row 324, already written. My two probes add two facts to it: it holds for an object type as well as for `ZZ32` (`SQ7`), and the stale value reaches an inherited implicit thread too, because a child task takes its parent's transaction (`BaseTask.java:83-86`, `this.transaction = parent.transaction`) — which is also why `SQ6` cannot discriminate an orphaned transaction from a committed write, and why correction 3 matters.

No other divergence appeared in my seven. The five that are the rung's own subject agree between the interpreter and the compiled run, at both thread counts, which is the answer to the question the first refusal asked.

## 8. The failure-mode question

The round replaces a loud failure with computed values: `StackOverflowError` becomes `3` and `4` in the gated test, and `SK25`, `SK18`, `SK20LocalTrait` and `SK6Types` become their values. Those values are the ones the specification requires — `atomic.tex:38-42` does not condition on the type of the value — so the direction is loud to *correct*, and the loud failure was a defect of the intermediate tree rather than a signal of anything real.

The guards cost no diagnosability, and this is worth stating plainly because it is the usual price of a guard and it is not paid here. With `debug` false nothing was printed before and nothing is printed now; with `debug` true the argument is still built and still printed. The only behaviour the guard removes is work whose result was discarded.

Where a loud failure did become a quiet answer, it is against the intermediate tree and not against the batch base, and the quiet answer is wrong. `SQ7` is the case: an object-typed top-level variable written inside an `atomic` block that then throws printed a `StackOverflowError` on the tree R1 landed and prints `7` now, where `walk` and the specification say `100`. Against `49ee5e91` there is no such transition — on that tree the write was a `PUTSTATIC` straight into the static field, so `7` is what it printed, quietly, without ever touching the cycle. That is a derivation from the representation rung 3 emitted, not a measurement, and it is the one place in this judgement where I did not rebuild to check. The fact the rung must carry either way is recorded: ledger row 324, and my `SQ7` extends it to object types.

Two loud failures the guards did **not** quieten, both measured on the repaired tree: `println(Box(1).asString)` from user code still overflows (`sk27-default-asstring.txt`), and every Fortress `throw` of an object with no `asString` still overflows through `FException`'s constructor (`sk3-recursion-entry.txt`, innermost frames `FException.<init>(FException.java:23)` → `CompilerBuiltin.fss:338` → `stringOps.java:40`). So the cycle of row 321 is exactly as reachable from user code as it was, and the guards closed only the entry R1 had opened. That is the right shape for a rung that declined to choose a rendering under a silent specification.

## 9. Required corrections

**1. `REPORT.md`'s "Files changed" citation for the payload-type edit in `Transaction.java` is off by one throughout.** It reads `:19-20,28-29,113-114,122-123,145,153-155,183,200,227,247,256,271`; at `HEAD` the `Any` occurrences are `:20`, `:27-28`, `:112-113`, `:121-122`, `:144`, `:152`, `:154`, `:182`, `:199`, `:226`, `:246`, `:255`, `:270`. Checked one by one: `:28-29` spans `writes` and `topLevelTransaction`, `:145` is inside `AncestrialWrite`'s body rather than its signature, and `:183, 200, 227, 247, 256, 271` land on a `MutableFValue key` line or on the guard line — `:227` is now the guard, which is the entry most likely to mislead. `record.md`'s FACTS line has it right already (`Transaction.java:20,27-28,144,152,226`); make the report agree with the tree. Required because every other claim in this rung is checkable by file:line and this one sends the reader to the wrong lines.

**2. The claim that `AtomicTopLevelObjectVar`'s local half "fails on `49ee5e91` too" is an inference, not a measurement, and is stated as fact** in `REPORT.md` ("its local half fails on `49ee5e91` too, which `SK20LocalTrait` shows") and carried by the judge's ruling. `SK20LocalTrait` is a trait-typed local variable; the new test's `var c: Box` is object-typed and the program has never been run on the base tree. Say it is an inference from `SK20LocalTrait` and from `LocalMutableVar`'s always having routed through `TXWrite`, or drop it: the test's recorded failure is the pre-guard landed tree and does not need the claim.

**3. Ledger row 324 states its mechanism in the claim column while its notes column says the row was "measured on the repaired tree only".** The mechanism — the orphaned transaction stays current on the task and the later read finds its uncommitted write — is a derivation from two code sites, and both are right: `forAtomicBlock` registers one handler and its type is `TransactionAbortException` (`CodeGen.java:1735,1738`), and `TXRead` returns an ancestral write when one exists (`Transaction.java:144-149,159-168`). Mark it as derived from those two sites rather than measured, so the next reader knows which half a probe would confirm. Worth adding while the row is open, though not required: `SQ7ObjThrow` extends the measurement to an object type, and a child task inherits its parent's transaction (`BaseTask.java:83-86`), which is why a second implicit thread sees the stale value too (`SQ6OrphanTx`).

Nothing else in this rung must change. I considered and rejected two further items as preferences rather than corrections: that the guard is wider than the crash requires (a recorded decision, with the alternative named, and right on the merits), and that `ProjectFortress/skprobes/` is untracked but not in `.gitignore` (a note for whoever composes the landed commit from named paths, not a defect in the rung).

## Reproducing this

`probes/skeptic/run-skeptic2.sh round2 SQ1ReadObj SQ2NestedObj SQ3ObjContend SQ4NoisyAsString SQ5ImmutableObj` writes `probes/skeptic/skeptic2-round2.txt`. It copies `SQ*.fss` into `ProjectFortress/skprobes/` (left untracked, like the first judgement's `SK*` and the worker's `P*`), sets `JAVA_HOME`, `PATH`, `FORTRESS_HOME`, `TMPDIR` and `JAVA_FLAGS` by hand and `unset`s `JAVA_TOOL_OPTIONS`, and does not source `experiment/env.sh`. `SQ6OrphanTx` and `SQ7ObjThrow` were run by hand with the same environment and are captured in `probes/skeptic/skeptic2-sq6-sq7.txt`.

State of the worktree when I finished: as the worker left it. The guards are in the source and in the build, `default_repository/caches` holds the library-order rebuild of 01:44 plus the jars of every program either of us has compiled since, and `git status --short` shows only `ProjectFortress/skprobes/` and `tmp/` untracked. I changed no source file and ran no gate target.
