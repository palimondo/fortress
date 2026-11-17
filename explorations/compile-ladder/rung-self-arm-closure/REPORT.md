# Climb batch 33, rung Q: `self` at a self type or a listed type on the compiled path

- problem: rows 1051, 1050 and 1052 (review-queue item 572), measured on the base through the harness ("The failing and the passing runs" below); `explorations/fortress-gap-ledger.md:1055-1057`; the one library's site `Library/FortressLibrary.fss:291-294`
- spec: `Specification/basic/expressions/var-ref.tex:64-80` (the type of `self` is `T ∩ (U1 ∪ … ∪ Un)` under a `comprises` clause, and `T ∩ X` in the bodies of a trait with a self-type parameter `X`); `Specification/basic/traits.tex`, "Trait Declarations"
- precedent: climb batch 31's rung K, `CodeGen.castToTypeBelow`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7638` (commit `6df780a7d0`), and its call at a method's returned value, `CodeGen.java:3231`
- deviation: a conditional's arms are cast at the conditional's own static type, which the checker gives the `If` node, not at a declared type (`CodeGen.java:4535`); a local function's result is cast in `localFunctionClosure`, the member that compiles its body for `forLetFn` (`CodeGen.java:4127`), a member the batch record does not name; no new member above `castToTypeBelow`; the class loader reads an owner's class file where the team's code loaded the class (`ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java:268-271`, `:304`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java`

One launch of this role worked the rung. Commits on `wip/rung-self-arm-closure`: `0e6e0402b9` (the owed expected-failure test), `3f3984e82f` (the fix, the promotions, the self-type closure test), `f2e20db364` (a `case` clause in the arm test; the expected failure of a `typecase` arm), and the commit that adds this report.

## 1. What changed and why

The checker reads `self` in a trait whose `comprises` clause lists types as also a value of the listed type (P-60), and in a trait with a self-type parameter `X` as `T ∩ X` (P-146). Rung K made the code generator cast such a `self` at a call's single argument, a typed binding, an assignment and a method's returned value. Three shapes were left, and each failed when its class loaded:

1. **A conditional's arms (row 1051).** `forIf` emitted each arm and joined them with no cast. One arm left the trait's interface on the stack and the other the listed type's or the parameter's class; the verifier merges them to `Object`, and the `areturn` at the declared type fails: 'VerifyError: Bad return type'. `castToTypeBelow` at the method's return read the conditional's type, which the checker gives as the winning arm's type (`scala_src/typechecker/impls/Misc.scala:529-583`), `R` or `T`, not self's, and emitted nothing. Now `forIf` takes the conditional's type (`CodeGen.java:4535`) and calls `castToTypeBelow` on each arm after its code (`:4558` for each `if` and `elif` clause, `:4568` for the `else`). A `case` expression is desugared into a conditional, so its clauses are cast too (a base failure, now passing; section 5).
2. **A closure's result (row 1050).** `forFnExpr` and the closure of a local function returned the body's value with no cast. Now each calls `castToTypeBelow(body, rt)` on the declared return type after the body (`CodeGen.java:3968` in `forFnExpr`, `:4127` in `localFunctionClosure`).
3. **The circular load (row 1052).** An object that lists a trait with a self-type parameter first extends, as its JVM superclass, that trait's default-method class at itself: `public final class …$Pt extends …$\=Shape?…%Pt?$DefaultTraitMethods implements …$\=Shape?…%Pt?` (javap of the test's jar). Defining `Pt` makes the JVM load that superclass, which the loader expands from its template (`InstantiatingClassloader.readAndExpandGenericThing`). In `tagOf(other: S) = other.tag` the template calls `tag` by `invokeinterface` on `S`; with `S` at `Pt`, `MethodInstantiater.visitMethodInsn` called `Class.forName("…$Pt", true, icl)` to learn whether `Pt` is an interface and so choose the opcode, while `Pt` was being defined: 'ClassCircularityError'. Now it reads that answer from the access flags of the class file that the loader would define for the name, through the loader's own resource lookup and ASM's `ClassReader.getAccess()`, and loads no class (`MethodInstantiater.java:268-271`, the new member `interfaceByClassFile` at `:304`). Where no class file is found, as for a class the loader generates, it loads as before. The expanded body then calls `invokevirtual …$Pt.tag`, the opcode that the old code chose wherever its load succeeded.

The cast as built at each place:

| place | where it is emitted | the value cast | the type |
|---|---|---|---|
| a conditional's arm | `CodeGen.java:4558`, `:4568`, after the arm's code and before the jump to the join | the arm's value | the conditional's static type |
| a function expression's result | `CodeGen.java:3968`, before the `areturn` of `apply` | the body's value | the declared return type |
| a local function's result | `CodeGen.java:4127`, before the `areturn` of `apply` | the body's value | the declared return type |

The test that decides whether a cast is emitted is rung K's, unchanged (`CodeGen.java:7764-7786`): the value's static type is the checker's `TraitSelfType` with a non-empty list (or a union each of whose elements is that one type), the target is a trait type or a type variable, the trait opens no sizes, and the target lies strictly below self's trait. So an arm that is not `self`, and an arm whose conditional has self's own type, get none; where the conditional has self's own type, the method's return cast after the join does the work, as before (the `MN` probe, section 5).

The bytecode, from the jars of the tests (javap):

    ComprisesValueAtConditionalArmRun$Q$DefaultTraitMethods.chosen, after:
         4: ifeq          14
         7: aload_0
         8: checkcast     #21                 // class ComprisesValueAtConditionalArmRun$R
        11: goto          25
    SelfTypeArmRun's Tord template, mx?0, after:
        17: aload_0
        18: checkcast     #15                 // class T
        21: goto          25
        24: aload_1
        25: areturn
    SelfTypeFromClosureRun's closure, apply, after:
         1: getfield      #16                 // Field self:LSelfTypeFromClosureRun$Shape?S?;
         4: checkcast     #20                 // class S
         7: areturn

A conditional with no arm of self's type compiles to the same bytecode as before. A program with `both(c): R = if c then self else self end` and `other(c, r: R): R = if c then r else R(0, 0) end` in `trait Q comprises { R }`, and a top-level `pick(c, a: ZZ32, b: ZZ32): ZZ32 = if c then a else b end`, compiled on the base and on the edit: `diff` of the `javap -c -p` of `NoCastIf$Q$DefaultTraitMethods` and of `NoCastIf` prints nothing. `both` reads, before and after:

         4: ifeq          11
         7: aload_0
         8: goto          12
        11: aload_0
        12: checkcast     #21                 // class NoCastIf$R
        15: areturn

(the one `checkcast` is the return cast after the join, rung K's), and `pick` has no `checkcast`.

A conditional with `self` in one arm whose own type is the listed type gains a cast also where it stands at the trait's type, which the verifier does not check: `atQ(c: Boolean): Q = if c then self else R(0, 0) end` in `trait Q comprises { R }` verifies on the base (its class loads in a run that prints `PASS`), and on the edit its `self` arm reads `7: aload_0`, `8: checkcast #21 // class SkNoCast$R`, where the base's reads `7: aload_0`, `8: goto 22` (the skeptic's `SkNoCast`, `diff` of `javap -c -p` of `SkNoCast$Q$DefaultTraitMethods`, base against edit; `SKEPTIC.md`). The checker gives the conditional the type `R` (`Misc.scala:529-583`), and the cast cannot fail, since every `Q` is an `R` (P-60).

## 2. The failing and the passing runs

The owed test first, `compiler_tests/XXXSelfTypeArmRun.test` with `SelfTypeArmRunLink.test` (`0e6e0402b9`), on the base's code, 2026-11-17T18:36:20Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh owed ProjectFortress/compiler_tests SelfTypeArmRunLink.test XXXSelfTypeArmRun.test
    . run ProjectFortress/compiler_tests/XXXSelfTypeArmRun (435ms) REACHED
    Caused by: java.lang.VerifyError: Bad return type
        XXXSelfTypeArmRun$\=Tord?XXXSelfTypeArmRun\%Num?$DefaultTraitMethods.mx?0(…)LXXXSelfTypeArmRun$Num; @22: areturn
    Saw expected failure (Exit code != 0)
    OK (2 tests)

Shown red on a deliberate fix, `mx`'s body changed for one run to `do s: T = self; if lt(other, s) then s else other end end`, then restored (`cmp` with the saved copy: same):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh owedred ProjectFortress/compiler_tests SelfTypeArmRunLink.test XXXSelfTypeArmRun.test
    . run ProjectFortress/compiler_tests/XXXSelfTypeArmRun (730ms) REACHED
    PASS
    Did not see expected failure
    Tests run: 2,  Failures: 1,  Errors: 0

Then the four expected-failure tests promoted to plain names (`SelfTypeArmRun`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeParameterReceiverRun`, each with its `Link.test` and a `.test` holding `link`, `run` and `run_out_contains=PASS`), and the new `SelfTypeFromClosureRun`, seen failing through the harness on the base's code, 2026-11-17T18:39:20Z, before the first build of the edit (started 18:41:58):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests SelfTypeArmRunLink.test SelfTypeArmRun.test ComprisesValueAtConditionalArmRunLink.test ComprisesValueAtConditionalArmRun.test ComprisesValueFromClosureRunLink.test ComprisesValueFromClosureRun.test SelfTypeParameterReceiverRunLink.test SelfTypeParameterReceiverRun.test SelfTypeFromClosureRun.test
    . run ProjectFortress/compiler_tests/SelfTypeArmRun (408ms) java.lang.VerifyError
    F. run ProjectFortress/compiler_tests/ComprisesValueAtConditionalArmRun (352ms) java.lang.VerifyError
    F. run ProjectFortress/compiler_tests/ComprisesValueFromClosureRun (417ms) java.lang.VerifyError
    F. run ProjectFortress/compiler_tests/SelfTypeParameterReceiverRun (324ms) Exception in thread "main" java.lang.ClassCircularityError: SelfTypeParameterReceiverRun$Pt
    Tests run: 14,  Failures: 5,  Errors: 0

In that run `SelfTypeFromClosureRun` called `.tag` on the closure's result inside the default body and so met row 1052 first ('ClassCircularityError: SelfTypeFromClosureRun$Pt'). It was rewritten to return the closure's result from the method and read `.tag` in `run()`, which isolates row 1050, and run again on the base's code, 2026-11-17T18:39:44Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base2 ProjectFortress/compiler_tests SelfTypeFromClosureRun.test
    . run ProjectFortress/compiler_tests/SelfTypeFromClosureRun (361ms) java.lang.VerifyError
        SelfTypeFromClosureRun$\=fn@8\!22-10\!8?SelfTypeFromClosureRun\%Pt?.apply()LSelfTypeFromClosureRun$Pt; @4: areturn
    Tests run: 2,  Failures: 1,  Errors: 0

The `case` clause added to `ComprisesValueAtConditionalArmRun` after the build was seen failing through the harness on the old code (`old-fortress.sh … junit`, 2026-11-17T19:10:36Z), with the base's other failure in the same class first:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 <tree>/tmp/… junit <tree>/ProjectFortress/compiler_tests/ComprisesValueAtConditionalArmRunLink.test … ComprisesValueAtConditionalArmRun.test …
    . run /home/user/fortress-self-arm-closure/ProjectFortress/compiler_tests/ComprisesValueAtConditionalArmRun (556ms) java.lang.VerifyError
    Failed to satisfy run_out_contains; expected
    Tests run: 5,  Failures: 2,  Errors: 0

and a program with the `case` clause alone failed on the old code at `viaCase` ('VerifyError: Bad return type … CaseJoin$Q$DefaultTraitMethods.viaCase(…) @34: areturn'), and passes on the edit (section 5).

The passing run, the last after the last change of code (the code is `3f3984e82f`; `f2e20db364` changed tests only), 2026-11-17T19:11:39Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh last ProjectFortress/compiler_tests SelfTypeArmRunLink.test ComprisesValueAtConditionalArmRunLink.test ComprisesValueFromClosureRunLink.test SelfTypeParameterReceiverRunLink.test ComprisesValueAtTypecaseArmRunLink.test SelfTypeArmRun.test ComprisesValueAtConditionalArmRun.test ComprisesValueFromClosureRun.test SelfTypeParameterReceiverRun.test SelfTypeFromClosureRun.test XXXComprisesValueAtTypecaseArmRun.test
    OK (16 tests)

## 3. Whole suites and other runs

- `ant testFast`, once, on `3f3984e82f` (the rung's section, step 5), under `nice -n 19`, 2026-11-17T18:48 to 19:03, load average 9 to 12 on 4 CPUs (other agents of the batch): 'BUILD FAILED', 'Total time: 14 minutes 33 seconds'. The tracks: compiler `Tests run: 1702, Failures: 0, Errors: 0`; library `86, 0, 0`; othercompiler `263, 0, 0`; misc 55 classes, 471 tests, 0 failures, 1 error: `ArrayStoreJUTest.testFourTasksAddIntoOneElementInsideAtomic`, 'took 60.01 sec … Caused an ERROR … java.lang.AssertionError' at `onPool` (`ArrayStoreJUTest.java:197`). The class tests the array store and transactions in Java and reaches neither the code generator nor the class loader. Run alone right after, `ant testOnly -DtestPattern=ArrayStoreJUTest`: 'Tests run: 8, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.244 sec', the case 'took 0.083 sec'. Recorded as a new row (row 1069, section 10).
- The four-thread atomic runs of `gate.md` (the change is in the class loader's expansion, `compiler.md`, "Testing an edit here"): 24 programs, 72 of 72 lines `PASS`.
- The ladder regression's own subset (`gate.md`, end of "The ladder regression"), the drivers copied into the rung's scratch folder: no program of the baseline's `ladder.tsv` has a first error that names a `VerifyError` or a `ClassCircularityError`; the subset is the four programs whose baseline first error is a class-load failure at link, since the change alters a class load: `tests/ImportNonparamObject.fss`, `tests/TreapTest.fss`, `tests/genericTest1.fss`, `tests/genericTest2.fss`. None is in the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-31b/gate/ladder/ladder.tsv`, the 85), so the comparison is with `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`:

  | file | baseline | the edit |
  |---|---|---|
  | `ImportNonparamObject.fss` | link, `java.lang.NoClassDefFoundError` | link, `java.lang.NoClassDefFoundError` |
  | `TreapTest.fss` | link, `Treap$Treap` | codegen, 'Not in the trait table: Treap' |
  | `genericTest1.fss` | link, `java.lang.NoClassDefFoundError` | pass |
  | `genericTest2.fss` | link, `java.lang.NoClassDefFoundError` | pass |

  The moves are the base's, not the edit's: on the old code `TreapTest.fss` stops the same way ('Exception in thread "main" java.lang.RuntimeException: Not in the trait table: Treap', in `CodeGen.methodsNamed` from `forMethodInvocation`, no member this rung touched), and `genericTest1.fss` compiles and prints `pass`.
- The stages: none, by the rung's section ("The stages. None."). The distance stage's shadow patch, run once on the edited `CodeGen.java`: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress tmp/rung-self-arm-closure/shadow-src` exit 0, and `add-patch.py` on its output exit 0. It still applies.
- The files edited, for `STAGE_BLIND`: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` and `ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java`, both outside `STAGE_BLIND`; the tests under `ProjectFortress/compiler_tests/`; this folder. No file beyond those the section names. One member beyond those it names: `localFunctionClosure` (`CodeGen.java:4069`), which compiles a local function's body for `forLetFn`; one line, at `:4127`. No other rung of the batch names it (rung G of run 2 names `forLetFn`'s refusal).

## 4. Where the fix belongs, and the precedent

The place: the code generator for the casts (`explorations/coordinator/map/spec-to-implementation.md`, the closure rows: "`codegen/` closure classes", "`CodeGen.forLetFn` compiles a local function as a closure"), and the runtime's class loader for the load (`map/modules-and-phases.md`, "B.11 The runtime": the loader generates an instantiation "by reading the template's bytes and rewriting them with ASM"). The checker's typing is right and stays (P-146, P-60).

The precedent: rung K's `castToTypeBelow`, three call sites before this rung (`CodeGen.java:3272`, the returned value; `:5679`, `forExprsSerial`; `:7745`, `evalArg`), seven after. The other members of the file where branches join a value: `forTypecase` (`:2526`), `forLabel` and `forExit` (`:1922`, `:1967`), and `forTry` (`:2377`); `forCaseExpr` is commented out (`:2100`) and a `case` expression reaches `forIf`. Measured, each in `trait Q comprises { R }` at `R`: an `exit … with self` beside the block's `R(0, 0)`, and a `try` whose block ends in `self` beside a `catch` arm `R(0, 0)`, run on the base and on the edit; a `typecase` with `self` in one arm and `R(0, 0)` in the other fails verification on the base and on the edit ('VerifyError: Bad return type … chosen(…) @37: areturn'), which is row 1070. `forTypecase` is rung V's member, so this rung records it and does not repair it.

The ways the language and the code offer, for the arms and the closures:
- a cast of each arm at the conditional's type, where the arm has self's type (taken; fork Q1's default);
- a cast once after the join (fork Q1's way not taken: it needs the join's type at the JVM, and where the conditional's type is self's own the return cast already does it);
- a cast of every arm whatever its type (not taken: it adds a `checkcast` to every conditional, where today's test adds one only where the verifier needs it);
- in the program, binding `self` at the target type first, `s: T = self` (the workaround of the rows; a change of the library's text that P-146 rules out: "The library's text gains no self type").

For the load: reading the class file's flags (taken; fork Q2's default); catching `ClassCircularityError` and falling back (not taken: it still loads the class being expanded, which Q2 excludes); a table in `InstantiatingClassloader` of the classes being defined and their flags (not taken: a file the section does not name); telling a trait's interface from an object's class by its name (not possible: a non-generic trait and object share one naming form).

## 5. Programs run on the old code and the new

Each compiled from the rung's scratch folder; the old code through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 <tree>/tmp/rung-self-arm-closure/old-caches`.

| program | the old code | the edit |
|---|---|---|
| `OrdProbe`: `StandardTotalOrder`'s three shapes in a program's own `trait Ord[\T extends Ord[\T\]\]`: `MN` (`other` first arm), `MX` (`self` first arm), `MNMX` (pairs `(other, self)` and `(self, other)`) | 'VerifyError: Bad return type … MX?0(…) @22: areturn' | `PASS` (all six assertions) |
| `MoreShapes`: in `trait Shape[\S extends Shape[\S\]\]`, a closure's result read by `.tag` in the default body, an `elif` arm `self`, a conditional inside a closure; an object listing another trait first; in `trait Q comprises { R }`, a conditional nested in an arm | 'ClassCircularityError: MoreShapes$Pt' | `PASS` (ten assertions) |
| `NoCastIf` (section 1) | the bytecode above | the same bytecode |
| `CaseJoin`: `case k of 1 => self else => R(0, 0) end` at `R` | 'VerifyError … viaCase(…) @34: areturn' | `PASS` |
| `TypecaseJoin`: `typecase x of s: String => self else => R(0, 0) end` at `R` | 'VerifyError … viaTypecase(…) @37: areturn' | the same (row 1070) |
| `LabelJoin`: `exit out with self` beside `R(0, 0)`; a `try` ending in `self` beside a `catch` arm | `PASS` | `PASS` |
| `tests/TreapTest.fss`, `tests/genericTest1.fss` (the ladder subset) | as the edit | section 3 |

Neither reserved point was reached. No model line changed. No call reaches another declaration: the casts change no dispatch, and the opcode chosen for an owner is the one the old code chose wherever its load succeeded, `invokevirtual` for a class and `invokeinterface` for an interface, read from the same class file.

## 6. What the specification settles

`Specification/basic/expressions/var-ref.tex:64-80` gives `self` the type `T ∩ (U1 ∪ … ∪ Un)` in a trait with a `comprises` clause and `T ∩ X` in the bodies of a trait with a self-type parameter `X`. So `if c then self else R(0, 0) end` at `R`, `fn (): R => self`, `mx(self, other: T): T = if lt(other, self) then self else other end` and `other.tag` on a value of `S` are well typed, as the checker finds, and a run must give the value. The class load is the implementation's, and no passage speaks of it. `traits.tex` has no callout on these shapes (`grep -n 'revision{' Specification/basic/traits.tex`: the callouts at `:181`, `:207`, `:270`, `:328`, `:405`, `:610`, `:646` speak of the reading of the clauses and of the self type, not of a compiled run).

## 7. Sentences of the specification made false

- `Specification/appendices/changes.tex:4445-4449`, the effect of the entry on the self-type parameter: "A function expression or a local function that returns \KWD{self} as the self parameter still fails the JVM's verification when its class is loaded (row~1050 of the revival's gap ledger), and so does a default body that returns a conditional expression with \KWD{self} in one arm and another value of the self parameter in the other (row~1051)." Both now run (`SelfTypeFromClosureRun`, `SelfTypeArmRun`). The section does not have this rung edit it; the gather corrects it.
- No `\revision` or `\note` of `traits.tex` or `var-ref.tex` names these shapes.

Outside the specification, these say what the tree no longer does, for the gather and the skill writer: `.claude/skills/fortress-repo/references/revival-changes.md:43-47` (the three shapes and their workarounds); F-377 ("A closure's returned value and a conditional's arms get no cast (rows 1050 and 1051)") and F-225 (the shapes "that still fail verification", row 1051, and the `ClassCircularityError`, row 1052); the orientation key's case 35, (b) and (c) (`explorations/coordinator/tools/orientation/regression/key.md:454-466`); and `PLAN.md:856`, the owed test, now written and promoted.

## 8. Points to report

1. **The cast as built at each place.** Section 1's table: `CodeGen.java:4558`, `:4568` (a conditional's arms, at the conditional's type, `:4535`), `:3968` (a function expression's result) and `:4127` (a local function's result), each by `castToTypeBelow` (`:7764`), whose test decides. Reversible.
2. **Rows 1051, 1050 and 1052.** Each expected-failure test promoted, failing on the base and passing after (section 2): `SelfTypeArmRun` (the owed test, `0e6e0402b9`, then promoted), `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeParameterReceiverRun`; the self-type parameter's form of a closure, `SelfTypeFromClosureRun`. Reversible.
3. **Row 1052's cause.** The loader loaded the object's class `…$Pt` (`Class.forName(…, true, icl)`, `MethodInstantiater.java:272` now, `:269` on the base) to choose a call's opcode while expanding `Shape⟦Pt⟧$DefaultTraitMethods`, which is `Pt`'s JVM superclass because `Pt` lists `Shape[\Pt\]` first; `Pt` was being defined, so the load was circular. In its place the loader reads the access flags of `…$Pt.class`, the class file it would define, through `getResourceAsStream`, and loads nothing (`:268-271`, `:304`). The base's stack: `ClassCircularityError: XXXSelfTypeParameterReceiverRun$Pt` / `at …MethodInstantiater.visitMethodInsn(MethodInstantiater.java:269)` / `at …InstantiatingClassloader.readAndExpandGenericThing(InstantiatingClassloader.java:485)` / `at java.lang.ClassLoader.defineClass(ClassLoader.java:962)` (`bin/fortress run XXXSelfTypeParameterReceiverRun` on the base's code). Reversible.
4. **The bytecode of a conditional that needs no cast, before and after.** The same where no arm has self's type (section 1, `NoCastIf`). Where an arm is `self` and the conditional's own type is the listed type, the arm gains a `checkcast` also where the conditional stands at the trait's type and the verifier needs none (section 1, `atQ`). Reversible.
5. **The distance stage's shadow patch.** It still applies: `shadow-patch.py` exit 0, `add-patch.py` exit 0 (section 3).
6. **The files edited, for `STAGE_BLIND`.** `compiler/codegen/CodeGen.java`, `runtimeSystem/MethodInstantiater.java`, the tests; no file beyond those named; the member `localFunctionClosure` beyond the members named (section 3).

No step was taken that cannot be undone or that acts against a decision on record.

## 9. Decisions

1. **The arms are cast at the conditional's own static type**, by `castToTypeBelow` after each arm (fork Q1's default). Ways not taken: a cast after the join (Q1's way not taken); a cast of every arm (adds casts the verifier does not need; the no-cast bytecode is unchanged, section 1); the enclosing declaration's type (not known inside `forIf`, and the arms join at the conditional's type). Evidence: the checker gives the `If` the winning arm's type (`scala_src/typechecker/impls/Misc.scala:529-583`).
2. **No new member above `castToTypeBelow`.** Each site needs one call of it as it stands. Way not taken: a member that casts a conditional's arms, which would wrap two calls. The section allowed one; it did not ask for one.
3. **A local function's result is cast in `localFunctionClosure`** (`CodeGen.java:4127`), where its body is compiled. Way not taken: a field set in `forLetFn` and read by the closure's generator, which is a new `CodeGen` (`:4091`).
4. **Row 1052: the class file's access flags, read through the loader's resource lookup, with the old load where no file is found** (fork Q2's default). Ways not taken: catching the `ClassCircularityError` (still loads the class being expanded); a table of the classes being defined in `InstantiatingClassloader.java` (a file the section does not name); a cache of the answers (no measured need: one read per call site of an expansion, where the old code made one `loadClass` through the loader's lock and its `history` list).
5. **The self-type closure test returns the closure's result from the method** and reads `.tag` in `run()`, so that it fails on the base by row 1050 alone; its first form met row 1052 first (section 2).
6. **The `case` clause is a case of `ComprisesValueAtConditionalArmRun`**, the test of its kind (`tests-writing.md`, "Assert each case in one test only"), not a test of its own. Its failure on the base was seen through the harness on the old code, since the fix was already built (`tests-writing.md`, "The order", step 2).
7. **The `typecase` arm is recorded, not repaired**: an expected-failure pair and row 1070 (home 2). `forTypecase` is rung V's member (the section's "Files": "Not: forTypecase").
8. **Comment lines.** Each new or promoted `.fss` holds one comment line saying what it checks; the `.test` files hold none, as no `.test` file of the revival does (for example `SelfTypeReturnSelfRun.test`, `ComprisesValueAtListedTypeCompiled.test`).
9. **The step-1 note on row 1051 goes into the row's close** (the close's `--note` names `SelfTypeArmRun`), since the brief lets no rung run `ledger.py` and the row closes in the same rung.
10. **The ladder subset** is the four programs whose baseline first error is a class-load failure, since none names the two errors this rung repairs (section 3).
11. **The four-thread atomic runs were run**, the change being in the class loader's expansion (`compiler.md`, "Testing an edit here").
12. **The `ArrayStoreJUTest` failure is recorded (home 3), not repaired**: it is outside the rung's files, it passes alone, and no source settles how a test of four tasks at once should wait.

## 10. Defects and their homes

- Rows 1051, 1050 and 1052: home 1, repaired, with the plain tests of section 2. Close lines in `record.md`.
- A `case` expression with `self` in one clause (row 1051's mechanism, met through the desugaring): home 1, a case of `ComprisesValueAtConditionalArmRun`.
- Row 1070, a `typecase` arm with `self` at a listed type: home 2, `compiler_tests/XXXComprisesValueAtTypecaseArmRun.test` with `ComprisesValueAtTypecaseArmRunLink.test` (harness on the edit: 'Saw expected failure (Exit code != 0)', 'OK (16 tests)'), and the new row. The specification settles it (section 6).
- Row 1069, `ArrayStoreJUTest.testFourTasksAddIntoOneElementInsideAtomic` failing once under load: home 3, a ledger row only; the existing test is its reproducer, and no gated test can pass while it shows.

## 11. For FACTS

The fact, the rewrites of F-377 and F-225, and the rows are in `record.md`.

## 12. Commands worked out

- To see the classes the loader expands at run time: `JAVA_FLAGS="… -Dfortress.bytecodes.expanded.directory=<dir>" bin/fortress run P` writes `<dir>/expanded.jar` (`InstantiatingClassloader.java:83-88`).
- `javap` cannot open a class file whose name holds `⟦⟧` in this locale ('class not found: …??????…'); copy it to a plain name first and pass that path.
