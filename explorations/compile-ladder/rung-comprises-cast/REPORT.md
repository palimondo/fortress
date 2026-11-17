# Rung K, rung-comprises-cast: the compiled code casts `self` where it stands at a type below its trait

- problem: row 991 of the gap ledger, `den(self)` in `trait Q comprises { R }` refused by the JVM's verifier, and row 695, `twin(self): S = self`; the library's site is `Library/FortressLibrary.fss:570`
- spec: the type of `self` in a trait with a `comprises` clause or a self-type parameter, `Specification/basic/expressions/var-ref.tex:64-76`; "every value of type T is a value of one of the listed types", `Specification/basic/traits.tex:248`
- precedent: `conditionallyCastParameter`, which casts an argument where its static type and the declared type differ, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7329`
- deviation: the new cast is emitted only for a value that has self's type and only at a strict subtype of the trait, where the precedent casts at every difference of the two types; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7308-7319`
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `Specification/appendices/changes.tex`; none other

One launch worked this rung. The worktree was seeded by the brief's command (exit 0). The base build `/home/user/fortress-base35` stands at `c72e195fd7`, three commits before the base `c1ce2a35e1`; `git diff --name-only c72e195fd7 c1ce2a35e1` lists seven files, all under `explorations/`, so its code is the base's.

## What changed and why

The checker reads `self` as more than its trait in two kinds of trait: one whose `comprises` clause lists types (P-60; `var-ref.tex:64-69`), and one with a self-type parameter (P-146; `var-ref.tex:70-76`). It carries the reading as the type of `self`, a `TraitSelfType` with the listed types or the self-type parameter beside the trait. So `den(self)` checks for `den(r: R)` in `trait Q comprises { R }`, and `twin(self): S = self` checks in `trait Shape[\S extends Shape[\S\]\]`. On the JVM the value is typed by the trait's interface, and the verifier refuses a class that passes or returns it at the object's class.

The new member `castToTypeBelow(Expr, Type)` (`CodeGen.java:7308-7319`, directly above `conditionallyCastParameter`) emits a cast when all of these hold:

1. the declared type is a trait type or a type variable;
2. the expression's static type is self's type, a `TraitSelfType` whose list is not empty;
3. the trait does not list a type at a `where`-clause variable (`TypeAnalyzer.opensSizes`);
4. the trait is not a subtype of the declared type, and the declared type is a subtype of the trait (`TypeAnalyzer.lteq`, the general subtype test, which reads only `extends` clauses once the self type is replaced by its trait).

It is called at three kinds of place:

| place | where | what reached it before |
|---|---|---|
| a single argument of a function, a method or a constructor | `evalArg`, `CodeGen.java:7289` | nothing: the branch evaluated the argument and cast nothing |
| a typed binding and an assignment | `forExprsSerial`, `CodeGen.java:5397` | `conditionallyCastParameter` with the variable's own type as the value's, which never differs |
| a method's returned value | `generateActualMethodCode`, `CodeGen.java:3011`, through the new field `declaredResult` (`:7296`) set by `generateTraitDefaultMethod` (`:2864`), `generateFunctionalBody` (`:2951`) and the generic method's body maker (`:2496`) | nothing |

Two or more arguments, an operator's operands and the forked forms already pass through `conditionallyCastParameter`, which casts wherever the two types differ, so `sum(self, self)` ran on the base.

Three findings shaped the test in condition 2 and 4:

- Only `self`, and a value that has its type, gets the reading. A variable `q: Q` at `den(r: R)` is refused by the checker: 'R->ZZ32 is not applicable to an argument of type Q.' (probe D below). So the mission's "a value typed by trait Q" is, in the checker as built, `self`.
- A first form of the member asked the subtype question for every single argument. `NodeComparator.compare` on two `Flag[\true\]` types stopped the link of `compiler_tests/BoolStaticArgRunLink` with 'subtypeCompareTo(class com.sun.fortress.nodes.BoolArg class com.sun.fortress.nodes.BoolArg) is not implemented!' in the first whole-suite run (2 failures of 1627 in the compiler track). The final form asks nothing of the analyzer unless the value has self's type, and the second whole-suite run is green.
- A first form without condition 3 cast at the checker's own type of a `where`-clause size, and `XXXNatOpenRun` then died with 'NumberFormatException: For input string: "n#3"' in place of its `VerifyError`. With condition 3 the test fails as on the base.

## The failing runs on the base's code, and the passing runs

Both failing runs ended before `CodeGen.java` was first edited; the worktree's build was the seeded copy of the base's.

`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests ComprisesValueAtListedTypeCompiled.test` (header `2026-11-17T01:13:41Z ... tree c1ce2a35e1`):

    . run ProjectFortress/compiler_tests/ComprisesValueAtListedTypeCompiled (262ms) java.lang.VerifyError
    Caused by: java.lang.VerifyError: Bad type on operand stack
        ComprisesValueAtListedTypeCompiled$Q$DefaultTraitMethods.bound(LComprisesValueAtListedTypeCompiled$Q;)Lcom/sun/fortress/compiler/runtimeValues/FZZ32; @3: invokevirtual
        Type 'ComprisesValueAtListedTypeCompiled$Q' (current frame, stack[0]) is not assignable to 'ComprisesValueAtListedTypeCompiled$R'
    Tests run: 3,  Failures: 1,  Errors: 0

The test then gained three more places (an assignment, a value parameter, a generic method's returned value) after the fix; its failing run is of the form with the function's argument, the method's argument, two arguments, the returned value, the typed binding and the typecase.

`ONE_JVM=1 .../junit.sh base ProjectFortress/compiler_tests SelfTypeReturnSelfRunLink.test SelfTypeReturnSelfRun.test` (header `2026-11-17T01:13:57Z`, the promoted test, code unchanged):

    . run ProjectFortress/compiler_tests/SelfTypeReturnSelfRun (261ms) java.lang.VerifyError
    Caused by: java.lang.VerifyError: Bad return type
        SelfTypeReturnSelfRun$\=Shape?SelfTypeReturnSelfRun\%Pt?$DefaultTraitMethods.twin?0(...)LSelfTypeReturnSelfRun$Pt; @1: areturn
    Tests run: 3,  Failures: 1,  Errors: 0

After the last change of code, `ONE_JVM=1 .../junit.sh edit4 ProjectFortress/compiler_tests ComprisesValueAtListedTypeCompiled.test SelfTypeReturnSelfRunLink.test SelfTypeReturnSelfRun.test SelfTypeReturnSelfAtTraitRun.test NatOpenRunLink.test XXXNatOpenRun.test FunctionalMethodComprisedObjectLink.test XXXFunctionalMethodComprisedObject.test ComprisesValueFromClosureRunLink.test XXXComprisesValueFromClosureRun.test ComprisesValueAtConditionalArmRunLink.test XXXComprisesValueAtConditionalArmRun.test BoolStaticArgRunLink.test XXXBoolStaticArgRun.test`:

    . run ProjectFortress/compiler_tests/ComprisesValueAtListedTypeCompiled (463ms) PASS
    . run ProjectFortress/compiler_tests/SelfTypeReturnSelfRun (454ms) PASS
    OK (19 tests)

The whole compiled suite, `ant testFast`, once on the final code (commit `34fb6364d6`; the later commit `3139c8db39` changes only `Specification/appendices/changes.tex`):

    [junit] Tests run: 1627, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 462.888 sec
    BUILD SUCCESSFUL
    Total time: 7 minutes 49 seconds

An earlier `ant testFast`, on the first form of the member, was red (2 failures, both `XXXBoolStaticArgRun`'s link and run, above); that code is not the branch's.

## Where the fix belongs, and the precedent search

The feature map's row for `comprises` gives the code generator no site: "`CodeGen.java:4977-4979` notes these clauses do not affect codegen after checking" (`explorations/coordinator/map/spec-to-implementation.md:194`). The clause does reach the code generator, through the type that the checker gives `self`.

The precedent is `conditionallyCastParameter`. It has 12 live call sites in `CodeGen.java` and one in a comment: `genParallelExprs` (2), `constructWithFreeVars`, `forExprsSerial` (2), `evaluateSubExprsAppropriately`, `forAsIfExpr`, `evalArg` (5). The single-argument branch of `evalArg` and a method's returned value had no call.

## What the specification settles

`var-ref.tex:64-76` gives `self` the type `T ∩ (U1 ∪ ... ∪ Un)` under a `comprises` clause and `T ∩ X` under a self-type parameter. `traits.tex:248` says that every value of `T` is a value of a listed type. So each program of the tests is valid, and its compiled failure is a defect of the code generator.

## Each program run old against new

The old code ran through `/home/user/fortress-base35/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base35 <worktree>/tmp/rung-comprises-cast/old-caches`, the new through the worktree's `bin/fortress compile` and `run`. The programs are scratch; each is given here whole enough to write again.

| program | what it holds | old | new |
|---|---|---|---|
| A | in `trait Q comprises { R }`: `var r: R = self; r := self`; `Holder(self).r.d` for `object Holder(r: R)`; `if c then self else self end` returned as `R`; `getter me(): R = self`; `conv[\T extends Object\](x: T): R = self` | `VerifyError: Bad return type ... Q$DefaultTraitMethods.pick` | `2 2 2 2 2 PASS` |
| B | `f: () -> R = fn (): R => self` | `VerifyError: Bad return type ... \=fn@5\!22-7\!8.apply()LKProbeB$R` | the same |
| C | `dd(): ZZ32 = self.d`, `d` a field of `R` only | not run old | static error: '(Q & {R}) has no getter called d' |
| D | `q: Q = R(1, 2)`, then `den(q)` in `run` | not run old | static error: 'R->ZZ32 is not applicable to an argument of type Q.' |
| E | `object Pt extends { Named, Shape[\Pt\] }`, `twin(): S = self` dotted, `nameOf[\S\](self)`, `self.twin().tag` | `VerifyError: Bad return type ... DefaultTraitMethods.twin` | `b b b PASS` |
| F | `sum(den(self), den(self))`, `den(self) + den(self)`, `(a, b): (R, R) = (self, self)` | `VerifyError: Bad type on operand stack ... DefaultTraitMethods.par` | `4 4 3 PASS` |
| G | a local function `me(): R = self` | `VerifyError: Bad return type ... \=fn@5\!9-22.apply()LKProbeG$R` | the same |
| H | `fn (): S => self` in `trait Shape[\S extends Shape[\S\]\]` | not run old | `VerifyError: Bad return type ... apply()LKProbeH$Pt` |
| W | the two workarounds: `r: R = self` first, then `fn (): R => r`, and `if c then r else R(0, 0) end` | not run old | `2 2 0 PASS` |
| NoCast | calls, bindings and returns where the value's type is a subtype of the declared type by `extends`: `takeT(O)`, `t: T = O`, `widen(o: O): T = o`, `up(): T = self`, `takeT(self)` in `trait T` | `1 2 1 1 1 t PASS` | `1 2 1 1 1 t PASS` |

E's object lists the self-typed trait second in its `extends` clause, so its `twin` reaches the object through a forwarder: no cast is needed there. No program was found that needs the cast at a field: a value parameter takes it as a constructor's argument (A's `Holder(self)`), and a field's initializer in an object's body sees `self` at the object's own type.

## The bytecode of a call that needs no cast, before and after

`javap -c -p` of every class of `KNoCast.jar`, sorted by class, old against new: `diff` prints nothing over 336 lines. The call `takeT(self)` in the trait's default method is `aload_0; invokestatic KNoCast.takeT:(LKNoCast$T;)...` on both.

The compiler's library, compiled by the base build and by the final code, counted over `javap -c -p` of every class of each jar (lines that hold `checkcast` or `castTo`, and instruction lines):

    fortress.CompilerBuiltin  classes=248 casts=2149 instructions=15996   (old and new)
    fortress.CompilerLibrary  classes=213 casts=466  instructions=4620    (old and new)
    fortress.CompilerAlgebra  classes=19  casts=1    instructions=160     (old and new)

So the new cast is emitted nowhere in the compiler's library.

## The kin, by a run each

- Row 307, `compiler_tests/XXXNatOpenRun`: unchanged. In the run `edit4` above: `. run ProjectFortress/compiler_tests/XXXNatOpenRun (262ms) REACHED`, `java.lang.VerifyError`, `Caused by: java.lang.VerifyError: Bad type on operand stack`, `Saw expected failure (Exit code != 0)`. The value is `mk(): NatParamT`, not `self`, and its trait lists a type at a `where`-clause size; the checker's type of the parameter is `Nt[\n#3\]`, which no class has. A cast there needs the value's own size at run time.
- Row 815, `compiler_tests/XXXFunctionalMethodComprisedObject`: unchanged. `. run ... REACHED`, `java.lang.NoSuchMethodError`, `Saw expected failure (Exit code != 0)`. Its defect is a missing overload method, not a cast.

## The stages, the ladder, the shadow patch

No stage was run: the section gives none (STAGE_BLIND). The files: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`; `Specification/appendices/changes.tex`; under `ProjectFortress/compiler_tests/`: `ComprisesValueAtListedTypeCompiled.fss`, `.test`; `SelfTypeReturnSelfRun.fss`, `.test` (renamed from `XXXSelfTypeReturnSelfRun`), `SelfTypeReturnSelfRunLink.test`; `XXXComprisesValueFromClosureRun.fss`, `.test`, `ComprisesValueFromClosureRunLink.test`; `XXXComprisesValueAtConditionalArmRun.fss`, `.test`, `ComprisesValueAtConditionalArmRunLink.test`. No file beyond `CodeGen.java`, the tests and the specification's sentence was edited.

The change's own ladder subset is empty: `grep -rlE 'Verify|not assignable|Bad return type|Bad type on operand' explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing, and neither the baseline's `ladder.tsv` nor `explorations/compile-ladder/climb-batch-32/gate/ladder/ladder.tsv` holds the word in a first error. Nothing was run.

`python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress tmp/rung-comprises-cast/shadow` on the final tree: 'shadow sources written to ...', exit 0.

## Names added, and competing declarations

`castToTypeBelow`: no other declaration under `ProjectFortress/src`. `declaredResult`, a field of `CodeGen`: `interpreter/glue/StaticNativeApp.java:97` has a static method of that name in walk's glue, another class; no clash. The four component names occur only in their own test files (`git grep -l`).

## The specification

One sentence changed, in the Effect of the self-type entry of Appendix I, `Specification/appendices/changes.tex:4431-4437`.

Before: "The code generator compiles a default body that returns `self` as the self parameter with no conversion to the type of the instance, so a program that runs such a body, which the compiled type checker now accepts, with the parameter at an object type fails the JVM's verification when the body's class is loaded (row 695 of the revival's gap ledger)."

After: "The code generator converts `self` to the type of the instance where a default body returns it as the self parameter, passes it as a single argument, binds it or assigns it at that type, so a compiled program that runs such a body with the parameter at an object type runs. A function expression or a local function that returns `self` as the self parameter still fails the JVM's verification when its class is loaded (row NEW-K-1 of the revival's gap ledger)."

The specification was not built here; the gather builds it once.

Sentences the change makes false: that one, now corrected. `changes.tex:1734` and `Specification/basic/inference.tex:509` name row 307 and stay true. No sentence of the specification names row 991. The skill's `references/revival-changes.md`, "Traits and objects", still says that a compiled body of a self-typed trait that returns `self` fails verification (row 695); it is not this rung's to edit.

## Points to report reached

1. Each place where the cast is now emitted, and the test that decides: the table under "What changed and why"; the deciding test is conditions 1 to 4 (`CodeGen.java:7308-7319`).
2. Row 991's reproducer and row 695's test, failing on the base and passing after: the runs above.
3. Row 307's `XXXNatOpenRun` and row 815's case: unchanged, by the run `edit4`.
4. The bytecode of a call that needs no cast, before and after: identical (`KNoCast`, 336 lines of `javap`); the library's jars hold the same count of casts.
5. The shadow patch still applies: exit 0.
6. The specification's sentence, before and after: above.
7. Files for STAGE_BLIND: above. No file beyond those named. Within `CodeGen.java`, members beyond the three that the section names were edited by one line each: `generateActualMethodCode` (`:3011`), `generateTraitDefaultMethod` (`:2864`), `GenericMethodBodyMakerFnDecl` (`:2496`), `forExprsSerial` (`:5397`) and `evalArg`'s last branch (`:7289`). A trait's default body, which holds both rows' cases, is not compiled through `generateFunctionalBody`; the line there (`:2951`) is reached by no program found, since `self` in an object has the object's type.
8. The reserved point, a cast at a place that verifies today: none found. The cast needs a value of self's type at a strict subtype of its trait, and each such place tried failed verification on the base. A model line: none.

## Decisions

1. **The cast is emitted only for a value that has self's type, at a strict subtype of the trait.** Ways not taken: (a) K1 as written, a cast wherever the value's static type is not a subtype of the declared type by `extends`, which also casts a numeral's own type at a number type and any other place where the checker's types differ, and asks the analyzer a question at every single argument, one of which stopped a link that passes today (`BoolStaticArgRunLink`); (b) the precedent's test, a cast at every difference of the two types, which changes the bytecode of calls that verify today. Evidence: the first whole-suite run's 2 failures; probe D, which shows that the checker gives the reading to `self` only; the library's jars with the same count of casts. The choice is inside K1: every cast it emits is one that K1 emits.
2. **No cast where the trait lists a type at a `where`-clause variable.** Way not taken: the cast at the checker's type, which moved `XXXNatOpenRun` from `VerifyError` to 'NumberFormatException: For input string: "n#3"'. Evidence: that run. Row 307 keeps its text.
3. **The returned value is cast in `generateActualMethodCode`, through a field that its three callers set.** Ways not taken: a new parameter of `generateActualMethodCode`, which changes four existing lines that other rungs' hunks could meet; the cast in `generateFunctionalBody` alone, as the section's file list reads, which reaches neither row's case, since a trait's default body goes through `generateTraitDefaultMethod`. Evidence: `CodeGen.java:3215-3221` (`generateTraitDefaultMethod` for a trait, `generateFunctionalBody` otherwise).
4. **A closure's returned value is recorded, not built.** `forFnExpr` and `forLetFn` are outside the members the batch record gives this rung, and rung L compiles an `exit` from inside a function expression, so a line there could meet its hunk. Way not taken: one line in each. Evidence: probes B, G and H; the batch record's "The rule the rungs keep".
5. **A conditional with `self` in one arm and a listed value in the other is recorded, not built.** The repair is a cast of each arm to the conditional's type, in `forIf`, a member outside this rung's. Evidence: `XXXComprisesValueAtConditionalArmRun`.
6. **The typecase case of the test uses a binder,** `c: Disc => discArea(c)`. Without one, `typecase self of Disc => discArea(self)` is a static error, 'Disc->ZZ32 is not applicable to an argument of type (Shape & {Disc, Square})': the checker does not narrow `self` in an arm. With the binder the arm's cast was already emitted on the base. The test asserts both listed types so.
7. **The promoted test keeps the run-time pair's three files** (`SelfTypeReturnSelfRun.fss`, `.test` with `link`, `run`, `run_out_contains=PASS`, and `SelfTypeReturnSelfRunLink.test`), as the skill's tests-writing.md gives for `NatRtTask`; `println("REACHED")` left the program.

## Defects, each with its home

| defect | home | where |
|---|---|---|
| `self` passed, bound, assigned or returned at a listed type fails verification (row 991) | 1, repaired | `compiler_tests/ComprisesValueAtListedTypeCompiled` |
| a default body that returns `self` as the self-type parameter fails verification (row 695) | 1, repaired | `compiler_tests/SelfTypeReturnSelfRun` |
| a function expression or a local function that returns `self` so fails verification | 2, deferred, the specification settles it | `compiler_tests/XXXComprisesValueFromClosureRun` with `ComprisesValueFromClosureRunLink`; row NEW-K-1 |
| a conditional with `self` in one arm and a listed value in the other fails verification | 2, deferred, the specification settles it | `compiler_tests/XXXComprisesValueAtConditionalArmRun` with `ComprisesValueAtConditionalArmRunLink`; row NEW-K-2 |

The first XXX test added, `XXXComprisesValueFromClosureRun`, was shown red on a changed program: with `fn (): R => R(1, 2)` and `me(): R = R(1, 2)` for one run, `junit.sh xxxred ... ComprisesValueFromClosureRunLink.test XXXComprisesValueFromClosureRun.test` printed `REACHED`, `PASS`, `Did not see expected failure`, `Tests run: 2,  Failures: 1,  Errors: 0`; restored, `Saw expected failure (Exit code != 0)` and `OK (4 tests)` with the second pair.

## Not done

- The specification was not built.
- No count of the methods of the one library that the verifier refuses: it needs a program compiled against the one library, which no test under the compiler's prelude can show.

## For the curator

None.
