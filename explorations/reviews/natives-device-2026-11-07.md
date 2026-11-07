<!-- Review for the record, 2026-11-07, of how the runtime's own 45 native bindings are bound so that both paths run them after the switch-over; its decision was made by an independent Fable judgement at the curator's request and taken by him as it stands; the judgement's scratch path: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/natives-device/judgement.md`. -->

# The runtime's own 45 native bindings on both paths

## Summary

- **Arrays, 7:** a compiled class in a field behind a one-library trait holds the elements; walk answers with its glue over `AtomicArray`; `PrimImmutableRR64Array` moves onto a `double[]` class in the rung.
- **Threads, `abort`, task trace, 6:** helpers over the compiled run time; `Thread`'s four raise until `spawn` compiles; walk answers with its glue.
- **Numerals, 32:** `IntLiteral`'s 8 become Fortress text before N5; the other 24 name computing helpers at N5, which walk answers by one rule per class.
- **Q1 of *the proposal*, the natives-remainder review: yes for all 45,** in three compiled shapes.
- **Bends:** P-58's walk half ("walk is to load the named helper") for all 45, as P-167 does for 2; P-167's two-name table becomes a rule per class, and its "one test runs on both paths" fails for `IntLiteral`'s 29. P-26 and P-76 overrule row 318's team stubs, as on record. P-84, P-85 stand.
- **Q2, reframed:** the switch-over needs the store, which stays for all element types but `RR64`; the question is its shape: (i) a `MutableFValue` cell per element on the compiled transaction as it is, or (ii) a slot API added to it. **Default: (i).**
- **Rungs:** arrays about 0.5M tokens plus the four-thread atomic runs; threads about 0.4M, in the arrays' rung or apart in the loader's table; `IntLiteral`'s 8 about 0.3M after P-161's rung; the other 24 about 0.4M of N5's rung; a reading-only carrier review before N5.

## Terms and checks

Checked at `main` `bd7efb95b`. Bare Java paths are under `ProjectFortress/src/com/sun/fortress/`; bare `NativeArray.fss`, `FortressBuiltin.fss`, `CompilerBuiltin.fss` under `ProjectFortress/LibraryBuiltin/`.

- *Walk*: the interpreter; *compiled path*: the checker, code generator and compiled run time; *one library*: walk's; *prelude*: the compiled path's library, gone at the *switch-over*, whose step *N5* is the *names batch*.
- *Native binding*: a body `builtinPrimitive("…")`, whose string names *glue*, a Java class over walk's values that only walk runs, or a *helper*, a static method in `nativeHelpers/` for both paths (P-58).
- *Carrier*: the Java type that holds a Fortress value when walk calls a helper (`int` for `ZZ32`).
- *The compiled transaction*: `runtimeSystem/Transaction.java`, which a compiled `atomic` starts and ends through `runtimeSystem/BaseTask.java`. *Raise*: throw `FailCalled`. *Rung*: one worker's change in a climb batch.
- **Check:** where a citation fails, what the source says. Probe outputs match the judgement's logs.

## 0. The 45 bindings

- Arrays, 7: `PrimitiveArray`'s `get`, `put`, `init00`; `PrimImmutableArray`'s 2; `PrimImmutableRR64Array`'s 2 (`NativeArray.fss:21,24,26,35,37,46,48`).
- Threads, 6: `Thread[\T\]`'s `val`, `wait`, `ready`, `stop`, the top-level `abort` (`FortressBuiltin.fss:777-786`), `printTaskTrace` (`Library/FortressLibrary.fss:4625`).
- Numerals, 32: `IntLiteral`'s 29 (`FortressBuiltin.fss:533-605`); `FloatLiteral`'s `asString`, `asExprString`, `asFloat` (`:202-206`).

By `grep -rn builtinPrimitive Library/ ProjectFortress/LibraryBuiltin/ | grep -v nativeHelpers`, filtered to these owners; all name glue (F-32).

1. **The four owners are native objects.** `NativeArray` and `FortressBuiltin` are `native component`s (`NativeArray.fss:12`, `FortressBuiltin.fss:12`): walk builds each object through a glue constructor of its name (`interpreter/env/CUWrapper.java:122`; `interpreter/evaluator/BuildNativeEnvironment.java:42-60`, `:122-150`). `PrimitiveArray`'s returns an `AtomicArray` (`interpreter/glue/prim/PrimitiveArray.java:26-36`); `Thread`'s starts a `SpawnTask` on a one-thread `FortressTaskRunnerGroup` (`Thread.java:33-56`; **Check:** `:37-58`); the literals' only register and answer `ZERO` (`IntLiteral.java:30-33`, `FloatLiteral.java:25-28`; **Check:** `:35-37`, `:28-30`). No binding names a constructor, so an object that stops being native leaves the native component, as `Writer` did (P-164).
2. **Walk reaches the groups unequally.** Every walk array passes through `PrimitiveArray` or `PrimImmutableArray` (`Library/FortressLibrary.fss:2391-2398`, `:2655`, `:2702`, `:2708`; `Library/List.fss:488`; `Library/System.fss:34`; **Check:** and the 2-D, matrix and 3-D stores, `:2879`, `:3051`, `:3281`); every `spawn e` becomes `FortressBuiltin.Thread[\Any\](fn () => e)` (`interpreter/rewrite/DesugarerVisitor.java:1004-1030`); every float numeral is an `FFloatLiteral` (`interpreter/evaluator/Evaluator.java:1631-1633`), so `FloatLiteral`'s 3 run at every printed float. An integer numeral is an `FInt`, `FLong` or `FBigNum` (`Evaluator.java:1635-1637`; `interpreter/evaluator/values/FIntLiteral.java`, `make`), so `IntLiteral`'s 29 run only through the object `IntLiteral`, and answer a `ZZ32` (row 578; P-76; probe 3).

## 1. Step 1: the ways

Found before reading the proposal (`reviews/natives-remainder-2026-11-07.md`). With no foreign-function interface yet (P-58, "Why"), the ways are the library's and the implementations'.

1. **A helper over carried types (W1),** P-58 as written: over `int`, `long`, `double`, `String`, `BigInteger`, `boolean`, called by the compiled rewrite (`compiler/BuiltinPrimitiveRewriter.java`; F-298) and, by reflection, walk's loader (`interpreter/glue/StaticNativeApp.java:59-67`, `:113-115`; F-299). Fits none: no carrier holds an element, `Thread` or literal; walk refuses at load, "no Java type carries …" (`StaticNativeApp.java:188`, `:194`, `:200`).
2. **Walk's intrinsic table (W2),** P-167's *device* (a mechanism the record decided for one case): the loader answers a compiled helper's name with walk's glue, before any helper lookup (`interpreter/glue/NativeApp.java:45-54`, `OWN_OPERATIONS`; `:195-200`; **Check:** on `main`, `:42-53` and `:208-215`; `:195-200` are the base build's). Built for `stringOps.typeName`, `equality.sEquiv` (F-328). Fits all 45, given compiled helpers. Thread helpers reach the compiled run time, as the team's own `nativeHelpers/runtime.java` does (`loopChunk`, `numThreads` over `runtimeSystem.FortressExecutable`; David Chase, 2009-2010; **Check:** git names no author; the file first shows in the root `9ac5af540`, 2011-12-05, under "Copyright 2009,2010"). `IntLiteral` has four, over the generated interface `fortress.CompilerBuiltin.IntLiteral`, as the call site's descriptor needs (`nativeHelpers/simpleIntLiteralArith.java`, header; the revival's `2027f519b`).
3. **Fortress text (W3),** as P-162's *pairs* (a Fortress declaration around a bare binding) and P-167's `asString = self.ilkName`: 8 of `IntLiteral`'s over `asZZ` (`asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asString`, `asExprString`, `=`, `cmp`), as the prelude writes them over `asZZ32` and `asZZ64` (`CompilerBuiltin.fss:884`, `:912-917`). Text makes no `IntLiteral`, store or task, so nothing else.
4. **A Java-backed field (W4),** P-164's device: a trait of the main component, walk's native object below it, a compiled class that implements it, helpers over that class. It is the library's pattern for `ZZ32`, `Int`, `FZZ32` (P-164, "Why"; `Library/FortressLibrary.fss:763`, `FortressBuiltin.fss:374`, `compiler/runtimeValues/FZZ32.java:14-15`), and the team's later word on a store, Christine H. Flood's 2011 vectors: an `int[]` or `String[]` in a class implementing the prelude's trait, with helpers (`compiler/runtimeValues/FZZ32Vector.java:14-20`; `nativeHelpers/simpleIntVector.java:17-39`; `CompilerBuiltin.fss:1115-1150`) and the checker's table mapping class to trait (`compiler/NamingCzar.java:337-340`). Fits the compiled store, and `Thread` once `spawn` compiles. For the literals, the carrier question: the one library's `value object IntLiteral extends Number` and `value object FloatLiteral extends RR64` (`FortressBuiltin.fss:529`, `:200`) against the prelude's traits (`CompilerBuiltin.fss:883`, `:996`), which `FIntLiteral` and `FFloatLiteral` implement (`FIntLiteral.java:14-15`, **Check:** `compiler/runtimeValues/FIntLiteral.java:19-20`; `FFloatLiteral.java:16`).
5. **A code-generator intrinsic (W5):** types by name, as the boxed-type table (`NamingCzar.java:586-603`) and numerals by `FIntLiteral.make`, `FFloatLiteral.make` (`:188-189`, `:411-413`; `compiler/codegen/CodeGen.java:4170-4200`, `:1998-2007`); or a store field that the class loader stamps into a `PrimitiveArray`, way A4 of *decision A* (an `RR64` array's `double[]`), unmeasured (F-18; P-84). Strings stay on glue, against P-58; for arrays, decision A's work.
6. **Glue kept (W6).** A glue string is not rewritten (F-298: "every other body stays a call of `builtinPrimitive`"), and the one library's `builtinPrimitive` is a `fail` (`FortressBuiltin.fss:34-35`): compiled code that reaches it raises. A fallback for `Thread`'s four while `spawn` stops at the code generator (no `Spawn` case in `compiler/codegen/`; `references/compiler.md`). It keeps up *the count* of bindings on glue (F-32) and blocks the names batch's refusal of strings outside `nativeHelpers/`.
7. **New walk carriers (W7):** an `Object` pass-through for elements (option (a) of `reviews/any-carrier-2026-11-06.md`, measured), a `BigInteger` for `IntLiteral` with a transfer pair like the six (`NamingCzar.java:373-384`, `:494-503`), a `double` for `FloatLiteral`'s `self`. Elements leave `AtomicArray`, whose `ReferenceCell`s are walk's transactional cells (`interpreter/evaluator/transactions/AtomicArray.java`, `ReferenceCell[] array`), so writes in `atomic` lose their transaction; the `IntLiteral` transfer is not the identity; only `asFloat` fits, as `asString` prints the written text (`1.50`).
8. **A second component for the same api (W8)** does not link (row 320); the switch-over designs it (P-33).
9. **Removal (W9).** `printTaskTrace` could go (walk tests `tests/taskTrace2.fss`, `taskTrace3.fss`; one api line); `Thread` and `abort` cannot, as the specification and walk's desugaring define `spawn` through them and `Lazy` calls `abort` (`Library/Lazy.fss:63`, `:89`).
10. **A loader rule that refuses at the call (W10),** not in the record: a stub for a helper over compiled classes. It fits only `IntLiteral`'s 29 and loses the load refusal that F-299's tests guard, which walk's intrinsic table keeps: not taken.

## 2. Step 2: against the proposal

Read after step 1: sections 1, 2.3, 2.4, 2.6, 4. The proposal saw first: finding 1, that glue kept raises at the first compiled array (row 874's note); the varargs factory (`compiler/WellKnownNames.java:53-56`); Jan-Willem Maessen's unused 2008 store; Flood's authorship of the vectors and thread glue; the measured carrier; N5's inventory (two foreign-type tables, 82 raise strings, 44 files, `FZZ32.java:15`); the rung sizes, 0.4M to 0.6M. The judgement saw first: the native constructors; the array slot that 2.4 (b) assumes; the pair that 2.6 (b) lacks (its 0.4M stands); `runtime.java` as the precedent for 2.6 (a); the dead `IntLiteral` glue (probe 3) that Q1 lumps with the live ones. And:

- **The team's later word on `IntLiteral` arithmetic,** unweighed in 2.3 (a), is a failure at run time: at the import commit every operator is `throw CompilerFailureDetectedAtRunTime` (`git show 5a68404fd:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, lines 802-822); the team's folding phase folds `+`, `-`, `juxtaposition`, `DOT`, `BY`, prefix `-` (`compiler/desugarer/IntegerLiteralFoldingVisitor.java`, `5a68404fd`, `:58-107`, `:143-173`); the four working helpers are the revival's (`2027f519b`). P-26 (on stubs) and P-76 make computing helpers right; the ground belongs in row 318.
- **2.3 (c)**'s reading of `fortLib` in walk's world (`NamingCzar.java:294-295` against `compiler/WellKnownNames.java:119`) is unrun by both: the planner's probe.

## 3. Step 3: the decision

Principles (P-26): the team's later word, the library as the team wrote it, then the peers; a team text weighs by author and role ("Why"): Flood built the transactional memory, the compiled tasks and the 2011 vectors; Maessen owned the library and its parallelism and wrote the 2007 store and the 2008 `double[]` store; the 2011-2012 prelude is the type group's later word. **Check:** `AtomicArray` is Flood's (`62a3641d4`, 2007-08-28, "Atomic arrays"); Maessen's `9645d6c05` (2007-08-31) made the primitive array type over it.

### 3.1 The arrays' store, 7 (Q1: yes)

- **Way.** A Java-backed field for the compiled half, walk's intrinsic table for walk's: a store trait in `FortressLibrary`, with public bindings in P-58's form on helpers of a new `nativeHelpers/arrayOps` over a compiled class that holds the elements, and an entry in the checker's one-library foreign table (`NamingCzar.java:471-493`). `PrimitiveArray[\T, nat s0\]` and `PrimImmutableArray` leave the native component and hold the store in a field: `get(i): T = cast[\T\](mem.get(i))`. Walk's native object below the trait holds an `AtomicArray`, and walk answers the `arrayOps` names with today's glue, re-targeted. `PrimImmutableRR64Array`'s 2 move in the rung onto a `double[]` class that no factory chooses yet: decision A's seed, preparation that P-85 asks for before the switch-over.
- **Forced points.** (i) The compiled `atomic` is `BaseTask.startTransaction` and `endTransaction`, retried on `TransactionAbortException` (`CodeGen.java:1721-1770`), and the compiled transaction reads and writes only `MutableFValue` cells (`runtimeSystem/Transaction.java:152`, `:226`; **Check:** holds: `TXRead(MutableFValue)`, `TXWrite(MutableFValue, Any)`). So a transactional store needs a `MutableFValue` per element, like walk's `ReferenceCell[]`, or a slot API. (ii) A helper's element is `Object`, read as `Any` (`NamingCzar.java:487`), so a read at `T` is a `cast`, a `typecase`, until decision A.
- **Ground.** Flood's vectors; `AtomicArray` for walk's transactional writes; the peers' `Object[]`, cast at the read. Glue kept fails: `System` makes an array at load (`Library/System.fss:31-34`; **Check:** at `:29`), so a compiled program raises at once (the proposal's finding 1). The others fail as in section 1.
- **Gives up.** A `typecase` per compiled read until decision A; a store boxed twice, or a slot API's new run-time code; shared code: one test on both paths holds the arrays together.
- **Cost.** One rung of climb batch 27's largest size, about 0.5M, plus the four-thread atomic runs (the proposal's 2.4 (b); climb batch 27's record, line 315). Forks for the brief or the rung: cells or a slot API; `cast` or a checker rule for a binding at a type parameter; row 466's duplicate initialisation, which the store defines anew.
- **Bends.** P-58's walk half for 7, as P-167 for 2; the decision text makes P-167's device the rule for the runtime's own operations. P-85 (its questions stay open) and P-84 (`RR64` arrays stay boxed until decision A, F-11) stand.

### 3.2 Threads, `abort`, the task trace, 6 (Q1: yes)

- **Way.** Walk's intrinsic table, over a helper class in `runtime.java`'s shape. `abort` throws the compiled `TransactionAbortException` when `BaseTask.inATransaction()` (`runtimeSystem/BaseTask.java:246`), else does nothing, the specification's rule (`Specification/advanced/parallelism-locality/transactions.tex`, "abort"); the compiled `atomic` cleans up, delays and retries (`CodeGen.java:1737-1770`). `printTaskTrace` walks the compiled parent chain (`runtimeSystem/BaseTask.java:46`, `:83-92`), as walk's does (`interpreter/evaluator/tasks/BaseTask.java:171-177`). `Thread`'s four raise ("spawn is not compiled yet") until the code generator compiles `spawn` (row 82), then hold a task in a Java-backed field. The rewrite checks the Java signature (F-298), so `val(): T` cannot name a helper that answers `Object`: each raising helper takes a pair, with its bare half at `Any`. Walk answers the six with today's glue; its `Thread` constructor stays glue.
- **Ground.** The specification's `spawn` (a `Thread[\T\]` with these methods) and `abort` (rerun the innermost `atomic`) (`Specification/basic/expressions/spawn.tex`; `transactions.tex`), typed so in both worlds (`compiler/Types.java:109-112`; `scala_src/typechecker/impls/Misc.scala:442-446`); Flood's tasks and transactions, bridged as in `runtime.java`; the peers' run-time handles (`Thread`, `Future`, `Task`). The others fail as in section 1.
- **Gives up.** Nothing a compiled program has today (probes 1, 2). **Cost:** one small rung, about 0.4M (the proposal's 2.6 (b)), in the arrays' rung or apart in the table; compiled `spawn` is a later rung.
- **Bends.** P-58's walk half for 6, nothing else: the prelude never declared `abort` or `Thread` (grep of `CompilerBuiltin.fss`, `CompilerLibrary.fss`).

### 3.3 The numerals, 32 (Q1: yes, with a reading)

- **Way.** Fortress text for the 8 before N5, over `asZZ` not `ZZ64`, so a numeral outside `ZZ64` compares (row 328). At N5, walk's intrinsic table for the other 24: computing helpers over the generated interfaces (`simpleIntLiteralArith` extended; a new `simpleFloatLiteralArith`), closing row 318's 21 on the compiled path. The one-library table, today with no compiled class but the two I/O ones, gains both types with the first moved binding. Walk's loader takes one rule per class (`simpleIntLiteralArith` to glue `IntLiteral`, method name capitalised), not 29 lines, and keeps the misspelt-string refusal, tested as `NativeHelperMisspeltWalk` is. Before N5, a reading review designs the carrier (the two `value object`s kept, or each split into a trait over walk's value object, as `ZZ32`, `Int`, `FZZ32`); it decides the owner, not the device.
- **Ground.** The prelude's: a trait the run-time class implements, helpers over its interface (`simpleIntLiteralArith.java`'s comment), conversions and comparisons in Fortress. Walk's `BigInteger` glue stays; the peers keep no numeral type at run time; the other ways cost a transfer pair for dead bindings, or the load refusal.
- **Gives up.** A test on both paths of `IntLiteral`'s bindings: walk's half only keeps the load check while walk's numeral is an `Int` (P-76; probe 3), and the glue for when it is an `IntLiteral` (PLAN's Q-walk; the proposal's 2.3 point 6). The decision text says so, lest P-167's "one test on both paths" look broken for 29. `FloatLiteral` has one (`println(1.50)`).
- **Cost.** The 8: about 0.3M after P-161's rung (the proposal's 2.3 (b)); the 24: about 0.4M of N5's rung, plus the carrier review.
- **Bends.** P-58's walk half for 32; P-167's two-name table becomes a rule per class; P-76 is followed; P-26 on stubs and P-76 overrule row 318's team text.

### 3.4 One way or three?

One device for every walk half; three compiled shapes, which the decision text names, as "the binding names a compiled helper" leaves the store and the carrier undesigned.

### 3.5 Q2

Its framing changes, not its default. Finding 1 makes the store a precondition, permanent for every element type but `RR64`; its shape matters for the model's speed until decision A and for the run time. (i) An `Object[]` of `MutableFValue` cells on the compiled transaction as it is: two boxes per `RR64` element. (ii) An `Object[]` with a slot API in `Transaction` and `BaseTask`: one box, and new transactional code to test at four threads. **Default: (i),** walk's own shape and the smaller change; measure (ii) only if the model's phase-6 numbers ask before decision A replaces the `RR64` store. Q2 drops "reads P-85 anew" and "holds P-84 back": decision A concerns only `RR64`'s `double[]` (P-84; P-85), and no unboxed array exists (F-11, F-18).

## 4. Risks

1. The store's transactional access, which the proposal leaves open, sets the rung's size.
2. A `typecase` per read in microGPT's inner loops until decision A: the rung measures it.
3. The carrier may move the 32 bindings to other owners: review it before N5's brief.
4. The rule per class must still refuse a misspelt or missing helper; a test like `NativeHelperMisspeltWalk` guards it.
5. Two rungs edit `NativeApp.java`'s table: merge them or place them apart.
6. Finding 1's fallback hides strings left on glue until the names batch refuses them; compiling the one library on the day shows them.
7. Compiled `spawn` stays a wall; `Thread`'s placeholders raise by design (row 82).

## 5. Probes

`$OLD` is `explorations/coordinator/tools/old-fortress.sh`, `$B` the base build `/home/user/fortress-base27` (`551b02858`), `$S` the judgement's scratch folder, with private caches; `FORTRESS_THREADS=1`.

**1.** Compiled, `t = spawn do 41 + 1 end; println(t.val())` reproduces row 82: the checker types the spawn `Thread[\IntLiteral\]`, a type the prelude lacks.

    $OLD $B $S/old-caches compile $S/probes/SpawnProbe.fss
    exit 255
    SpawnProbe.fss:5:11-16: No such method Thread[\IntLiteral\].val.
    File SpawnProbe.fss has 1 error.

**2.** `t = spawn do println("in thread") end; println("after spawn")`, compiled with `-debug stacktrace`, stops in the checker; after the switch-over the wall is the code generator's.

    exit 255
    Unbound type: CompilerBuiltin.Thread
    SpawnProbe2.fss:4:7-38: Unknown type: CompilerBuiltin.Thread
    File SpawnProbe2.fss has 2 errors.

**3.** Walk prints the `ilkName` of `3`, `3000000000`, `123456789012345678901234567890`, its negation and `2.5`, then of `IntLiteral + 1`, and its value.

    $OLD $B $S/old-caches $S/probes/NumeralProbe.fss
    exit 0
    Int Long BigNum BigNum FloatLiteral
    Int 1

No integer numeral is an `IntLiteral` (the ilk reads `Int` here, `ZZ32` on `main` after P-167's rung, F-328); a float numeral is a `FloatLiteral`; `IntLiteral`'s `+` answers an `Int` (row 578). No other probe ran.
