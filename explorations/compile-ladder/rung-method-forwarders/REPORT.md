# Rung M: the methods that a class inherits

- problem: on the compiled path a generic trait that gives a body to a method which it also inherits with a body gets the method twice in its class, a `ClassFormatError` at load, and a body inherited through an imported api's trait that is not first has no forwarder, an `AbstractMethodError` at the call (ledger rows 990 and 732; the rehearsal's W6 and W16): explorations/compile-ladder/plan-31/PROBES.md:11
- spec: "A trait declaration inherits method declarations from the declarations of its immediate supertraits except those ... whose parameter type (not including the type of the self parameter) is equal to the parameter type of a method declaration that occurs in the trait declaration": Specification/basic/traits.tex:584
- precedent: the comparison of two declarations' parameter types at the instance that the extends clauses give, `STypesUtil.providedAndOverridden` (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1684), and the checker's reading of a body-less method of an api's trait, `isAbstractFnDecl`: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:274
- deviation: the code generator's rule is not the path-wise `providedMethods` of the checker: a declaration is replaced by one of any type strictly below its own among the supertypes, so that a diamond resolves to the lower trait's declaration as it did on the base and does under walk: ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1748
- historical: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java and ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:929

One launch worked this rung. The worktree was seeded by the brief's command (exit 0, 4 s); nothing was built by hand before the edit. The code is commit d6553284ed on wip/rung-method-forwarders, cut from c1ce2a35e1.

## What changed and why

Three edits of the code generator, in the members that the rung's section names.

1. **One method once (row 990; fork M1).** `CodeGen.dumpMethodChaining` gathered its candidates with `STypesUtil.allMethodsNotIdenticallyCovered`, which drops a declaration that a declaration of a strict subtype covers with an equivalent domain. It compared the two domains as schemas over each declaring trait's own static parameters, bounds included (`fullyReplacedMethodDomain`, STypesUtil.scala:1599). For `mx(self, other: T): T` in `Mmx[\T extends Mmx[\T\]\]` and in `Tord[\T extends Tord[\T\]\]` the two schemas differ in the bound, so neither covered the other, both stayed, and each got a forwarder under one name and descriptor. The gathering now calls the new `STypesUtil.allMethodsNotReplaced` (STypesUtil.scala:1748; CodeGen.java:980): a declaration is left out when another of the same name and kind, with self at the same position, is declared by a type strictly below its own and has the same parameter types without self, compared at the instance that the extends clauses give (`paramsWithoutSelfApart`, STypesUtil.scala:1780, the comparison of `providedAndOverridden`). The rule is a property of pairs of declarations, so the result does not depend on the order in which the methods are gathered.
2. **A body in an api's trait (row 732; fork M2).** The loop skipped every declaration without a body. A declaration read from an imported api never has one. `hasBodyInItsTrait` (CodeGen.java:1051) now keeps a body-less declaration whose declaring trait is named with an api and which has no `abstract` modifier, the reading of the checker's `isAbstractFnDecl`; a field's getter or setter stays skipped. The forwarder that `generateForwardingFor` then writes calls the static body, or for a generic method the closure finder, in the api trait's class of default methods, which the exporting component's jar holds.
3. **Self not first (row 571).** `generateForwardingFor` looks a forwarder up among the names and signatures of the object's dispatch methods, so as not to write it beside one. It built the signature to look up by removing parameter `selfIndex` from the static body's signature, whose self is always first; with self second it removed the first argument instead and found nothing, and the forwarder was written beside the dispatch method of the same name and descriptor. Where it is not narrowing it now removes parameter 0 (CodeGen.java:870-873). The narrowing call is unchanged.

## The failing runs and the passing run

Before any build of the edit, 2026-11-17T00:08:11Z to 00:08:18Z, on the seeded base build's classes:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests TraitOwnMethodBesideInheritedCompiled.test ApiTraitMethodNotFirstCompiled.test
    . run ProjectFortress/compiler_tests/TraitOwnMethodBesideInheritedCompiled (286ms) java.lang.ClassFormatError: Duplicate method name "cmpx?0" with signature "(LTraitOwnMethodBesideInheritedCompiled$Late;)Lcom.sun.fortress.compiler.runtimeVa...
    F. run ProjectFortress/compiler_tests/ApiTraitMethodNotFirstCompiled (312ms) java.lang.AbstractMethodError
    Caused by: java.lang.AbstractMethodError: Receiver class ApiTraitMethodNotFirstCompiled$Rng does not define or inherit an implementation of the resolved method 'abstract com.sun.fortress.compiler.runtimeValues.FZZ32 twice()' of interface Ap...
    Tests run: 6,  Failures: 2,  Errors: 0

The first test's program was reshaped after the first build of the edit (see "The self-return at an object type" below), and row 571's test was promoted after the edit reached it. So the tests as committed were seen failing on the base's code through the harness, 2026-11-17T00:20:45Z to 00:20:53Z, as worktrees.md, "Running the old code", gives:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base35 /home/user/fortress-method-forwarders/tmp/rung-method-forwarders/old-caches junit <compiler_tests>/TraitOwnMethodBesideInheritedCompiled.test <compiler_tests>/ApiTraitMethodNotFirstCompiled.test <compiler_tests>/FunctionalMethodMeetNarrowedSelfNotFirstLink.test <compiler_tests>/FunctionalMethodMeetNarrowedSelfNotFirst.test
    . run .../TraitOwnMethodBesideInheritedCompiled (450ms) java.lang.ClassFormatError: Duplicate method name "mx?0" with signature "(LTraitOwnMethodBesideInheritedCompiled$Z;)LTraitOwnMethodBesideInheritedCompiled$Z;" in class file TraitOwnMethodBesideInheritedCompiled$\=Tord?TraitOwnMethodBesideInheritedCompiled\%Z?$DefaultTraitMethods
    F. run .../ApiTraitMethodNotFirstCompiled (517ms) java.lang.AbstractMethodError
    F. run .../FunctionalMethodMeetNarrowedSelfNotFirst (394ms) java.lang.ClassFormatError: Duplicate method name "pick?1" with signature "(LFunctionalMethodMeetNarrowedSelfNotFirst$N1;LFunctionalMethodMeetNarrowedSelfNotFirst$S0;)Lfortress.CompilerBuiltin$String;" in class file FunctionalMethodMeetNarrowedSelfNotFirst$C
    Tests run: 9,  Failures: 3,  Errors: 0

The conv case of the first test was added after this run; it passes on the base too (probe `PApart`, below) and guards the renaming apart.

The generic method of row 732 fails on the base behind the plain one in my test, which stops at its first assertion. Its own failing run is the planner's, PROBES.md:22: 'AbstractMethodError: Receiver class PGenUse4$Rng does not define or inherit an implementation of the resolved method abstract java.lang.Object map⟦…⟧(long, java.lang.String) of interface GenApi$Ix⟦FZZ32⟧'.

The passing run, the last after the last change of code, on d6553284ed:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests TraitOwnMethodBesideInheritedCompiled.test ApiTraitMethodNotFirstCompiled.test TraitMethodDiamondRedeclaredCompiled.test FunctionalMethodMeetNarrowedSelfNotFirstLink.test FunctionalMethodMeetNarrowedSelfNotFirst.test FunctionalMethodCoverSelfSecondLink.test XXXFunctionalMethodCoverSelfSecond.test FunctionalMethodValueGenericTraitCompiledLink.test XXXFunctionalMethodValueGenericTraitCompiled.test
    OK (15 tests)

The whole compiled suite, once, on d6553284ed (`ant testFast`, 2026-11-17, 8 minutes 9 seconds):

    [junit] Tests run: 1630, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 484.534 sec     (fast-compiler)
    BUILD SUCCESSFUL

fast-library 86, fast-othercompiler 263, each with 0 failures and 0 errors. No existing test failed after the change. The compiler track's count in the last landed gate's summary is 1616; my files add 11 cases. The two hash-mode runs below ran beside the suite, in private caches.

## Where the fix belongs, and the precedent search

The forwarders of a class are gathered in one place, `CodeGen.dumpMethodChaining` (CodeGen.java:929), which the object's and the trait's code both call (CodeGen.java:4913 and :5663 on the base). The comparison belongs in `STypesUtil` beside the other helpers that list a type's methods.

What the team's and the revival's code already did here:

- `removeIdenticallyCoveredMethods` (STypesUtil.scala:1574), the team's rule, with the schema comparison that fails on self-typed generic traits. It has three callers: `dumpMethodChaining`, the two calls of `properlyInheritedMethodsNotIdenticallyCovered` (CodeGen.java:499 and :1147 on the base) and `methodsNamed` (CodeGen.java:6789 on the base). I changed the first only: one site of four.
- `providedAndOverridden` (STypesUtil.scala:1684), from commit 2d22d3a35d, by which the compiled checker reads what a type provides. It compares parameter types at the instance, through a `paramsOf` that each of its two callers passes (`OverloadingChecker.paramsWithoutSelf`, scala_src/typechecker/OverloadingChecker.scala:196; `AbstractMethodChecker.domainApart`, AbstractMethodChecker.scala:188), each with its own private copy of the renaming apart. I followed its comparison; `paramsWithoutSelfApart` is a third copy of the renaming, public in `STypesUtil`, since the two others are private to classes outside this rung's files.
- `isAbstractFnDecl` (AbstractMethodChecker.scala:274): `mods.isAbstract || ((!body.isDefined) && tt.getName.getApiName.isNone)`, with the team's note on PROJECTFORTRESS-3. `hasBodyInItsTrait` is its reading on the code generator's side.
- `firstSupertraitMethods` (CodeGen.java:1067), row 733's repair, which names an api's trait as the extends clause names it. It is unchanged, and row 733's test passes in the suite.

## What the specification settles

traits.tex, section "Method Declarations" (:584-590): a trait does not inherit a declaration whose parameter type, self apart, is that of a declaration that occurs in it. So in `Tord` only `Tord`'s `mx` is provided, and a type below `Tord` that declares `mx` again provides its own. That is fork M1 and what walk runs. The text speaks of immediate supertraits path by path; of an object that reaches one declaration along two paths, one of them through a trait that declares it again, it says only that the object inherits from each immediate supertrait, which gives it both declarations. That case is the decision "the lower type's declaration" below and the question for the curator.

The specification does not speak of apis' traits and bodies here; the api's declaration without `abstract` is a method with a body in the component (the checker's reading, above).

## Each program run old against new

| program | base (c1ce2a35e1) | rung (d6553284ed) | walk |
|---|---|---|---|
| `PDupMethod3` (planner) | PROBES.md:18: `ClassFormatError: Duplicate method name "mx?0"` | 2, -1, true, false | PROBES.md:18: 2, -1, true, false |
| `PGenUse4` with `GenApi` (planner) | PROBES.md:22: `AbstractMethodError ... map⟦…⟧` | 8 | PROBES.md:22: 8 |
| the same with `Rng.twice()` | PROBES.md:23: `AbstractMethodError … twice()` | 7 | not run |
| `TraitOwnMethodBesideInheritedCompiled` | `ClassFormatError`, above | 2, -1, true, false, PASS | 2, -1, true, false, PASS |
| `ApiTraitMethodNotFirstCompiled` | `AbstractMethodError`, above | PASS | PASS |
| `FunctionalMethodMeetNarrowedSelfNotFirst` | `ClassFormatError ... "pick?1"`, above | PASS | row 571: `C`, `A` |
| `PDiamond` (plain diamond, three orders of the extends clause) | B six times | B six times | B six times |
| `PDiamondG` (the same with self-typed generic traits) | refused: 'There are multiple declarations of m with the same parameter type: (O)' | the same refusal | B six times |
| `PApart` (a generic method declared again where the trait's argument has the method's parameter name) | H, G, H, H | H, G, H, H | H, G, H, H |
| `PNarrowDyn` (row 571's program called at wider static types, with a call whose one applicable declaration is `B`'s) | not run: the class does not load | C, C, C, then `ClassCastException` | C, C, C, B, PASS |
| `XXXFunctionalMethodCoverSelfSecond` | not run: row 571's note gives `ClassFormatError ... "mark?1"` for this shape | REACHED, then `ClassCastException: ...$Pq cannot be cast to class ...$Ka` | REACHED, PASS |
| `PInst` (a redeclaration whose parameter types differ at the instance) | refused: 'Invalid overloading of m in trait B' | the same refusal | not run |

The probes are scratch under tmp/rung-method-forwarders/probe/; the old code ran through old-fortress.sh with private caches.

## The two hash modes

Step 1's and step 2's programs, compiled from a scratch copy of their sources into private caches, once with the default `JAVA_FLAGS` and once with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` added to the compile's `JAVA_FLAGS`, the api's component compiled so too; each then run with the default flags. On d6553284ed:

    compile TraitOwnMethodBesideInheritedCompiled [plain: JAVA_FLAGS=-Xmx4g -Xss64m -Djava.io.tmpdir=...] rc=0
    2 / -1 / true / false / PASS      run TraitOwnMethodBesideInheritedCompiled [plain] rc=0
    PASS                              run ApiTraitMethodNotFirstCompiled [plain] rc=0
    compile TraitOwnMethodBesideInheritedCompiled [hash0: JAVA_FLAGS=-Xmx4g -Xss64m -Djava.io.tmpdir=... -XX:+UnlockExperimentalVMOptions -XX:hashCode=0] rc=0
    2 / -1 / true / false / PASS      run TraitOwnMethodBesideInheritedCompiled [hash0] rc=0
    PASS                              run ApiTraitMethodNotFirstCompiled [hash0] rc=0

Both modes give the same output. The members of every class of the three jars, listed by `javap -p` and sorted, are the same in the two modes once the scratch path that a table's name holds is masked (811 lines, `diff` prints nothing). The jars' bytes differ in all three, as fork S expects: the order of the output is not this rung's.

## The self-return at an object type

My first shape of step 1's test had `object Late(x: ZZ32) extends { Named, Tord[\Late\] }`. With the duplicate gone, the run died while `Tord⟦Late⟧`'s class loaded:

    Caused by: java.lang.VerifyError: Bad return type
      Location: ...$\=Tord?...\%Late?$DefaultTraitMethods.mx?0(...)
      Reason: Type 'java/lang/Object' (current frame, stack[0]) is not assignable to 'TraitOwnMethodBesideInheritedCompiled$Late' (from method signature)

`Tord`'s `mx(self, other: T): T = if lt(other, self) then self else other` returns `self` as `T`: row 695, which rung K repairs. At a trait instance (`Z`, `Y`) the JVM's verifier passes it, since it does not check assignment to an interface. So I made `Late` a trait with an object below it, and took the object case, an object whose second trait declares a method again, into two traits whose bodies do not return `self` (`Shown`, `Marked`, `Leaf`). The library's own `MAX` in `StandardTotalOrder` has `Tord`'s body, so after this rung an object that extends such a trait directly still waits for rung K.

## The stages, and the files for STAGE_BLIND

None, as the rung's section says. The files edited: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` and `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`; no file beyond those named. `STypesUtil.scala` gains two functions that only `CodeGen` calls; no function that the checker calls is changed, so the checker's timed runs of compiler.md, "The checker's time", were not made.

    python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress tmp/rung-method-forwarders/shadow
    shadow sources written to tmp/rung-method-forwarders/shadow        exit 0

on d6553284ed: the distance stage's shadow patch still applies to this `CodeGen.java`.

## The ladder subset

Empty by the rule of gate.md: no file of the baseline has a recorded first error that names what the change touched.

    grep -rliE "ClassFormatError|AbstractMethodError" explorations/compile-ladder/baseline-2026-09-19/raw      (prints nothing)
    grep -iE "Duplicate method|AbstractMethod|ClassFormat" explorations/compile-ladder/baseline-2026-09-19/ladder.tsv      (prints nothing)

So no driver was copied or run. The change reaches every compiled trait and object; `ant testFast` above is its check.

## Competing names

`grep -rl` over `ProjectFortress` and `Library` (`.fss`, `.fsi`, `.test`, `.java`, `.scala`) for `TraitOwnMethodBesideInherited`, `ApiTraitMethodNotFirst`, `TraitMethodDiamondRedeclared`, `FunctionalMethodCoverSelfSecond`, `allMethodsNotReplaced`, `paramsWithoutSelfApart` and `hasBodyInItsTrait` finds only this rung's files.

## The sentences that the change makes false

None. `grep -rn "ClassFormatError\|AbstractMethodError\|Duplicate method" Specification/ --include=*.tex` prints nothing, and no Effect of Appendix I and no note names rows 990, 732 or 571.

## Points to report

- **The override test as built.** A class's method runs the declaration of the lowest type that declares it at those parameter types: `allMethodsNotReplaced` (STypesUtil.scala:1748) leaves out each declaration for which another of the same name and kind, with self at the same position, declared by a type strictly below, has the same parameter types without self at the instance that the extends clauses give. It decides by a relation between two declarations, never by which the loop meets first; the test asserts `Z`, `Tord` and `Marked` for a method declared at three and at two levels (compiler_tests/TraitOwnMethodBesideInheritedCompiled.fss:86-101), and the two hash modes give one member list.
- **Row 990's reproducer and row 732's two cases.** Each fails on the base and passes after; both hash modes pass with the same output: the sections above.
- **Row 571's test.** Promoted to `FunctionalMethodMeetNarrowedSelfNotFirst` (with its `Link` file); it fails on the base and passes after. What remains is row 573's defect, which the repair uncovers at self second: an object's dispatch method tests and casts the receiver in place of the argument. It is recorded by the new expected failure `XXXFunctionalMethodCoverSelfSecond` and a rewrite of row 573; its site is the dispatch method written through `OverloadSet.TraitOrObjectFactory`, in `compiler/OverloadSet.java`, which is not this rung's.
- **Row 1013's test.** Unchanged, by a run on d6553284ed: `XXXFunctionalMethodValueGenericTraitCompiled` prints REACHED and dies with `NoSuchMethodError`, 'Saw expected failure'. Nothing built for it; no note.
- **Rows 495 and 733.** Not touched. `XXXDispatchMethodArmRungG` is still an expected failure and `TraitTableApiTraitCompiled` passes, in the suite.
- **Every existing test that failed after the change.** None: `ant testFast`, BUILD SUCCESSFUL.
- **The shadow patch.** It applies: exit 0.
- **The files edited.** `compiler/codegen/CodeGen.java` (:47, :870-873, :971-980, :990, :1045-1056) and `scala_src/useful/STypesUtil.scala` (:1735-1809); none beyond those named.
- **Reserved point, a model line.** None.
- **Reserved point, a change of which declaration a dispatch method reaches.** None reached. The third edit changes whether a forwarder is written beside a dispatch method, where before the class did not load; no dispatch method's body is changed, and `OverloadSet.java` is not edited. For the skeptic's one program: `TraitMethodDiamondRedeclaredCompiled` prints PASS on the base's code and on the rung's.
- **Reserved point, a change to the one library's text.** None.

## Decisions

1. **The lower type's declaration replaces, not the path-wise `providedMethods`.** Ways: (a) the checker's `providedMethods`, the specification's inheritance path by path; (b) the team's rule, a declaration of a strict subtype replaces, with the comparison repaired; (c) keep `allMethodsNotIdenticallyCovered` and drop a second method of one name and descriptor as it is written. I built (a) first: it passed the two tests and then wrote `m` twice into `object O extends { X, A, B }` of the plain diamond (`ClassFormatError: Duplicate method name "m" ... in class file PDiamond$O`), a program that prints B on the base and under walk. (b) keeps that program and repairs row 990. (c) is the rehearsal's hack, whose choice depended on the order. Chosen: (b).
2. **A new function, not a repair of `removeIdenticallyCoveredMethods`.** Ways: repair the shared helper, which also feeds the dispatch methods' gathering (CodeGen.java:499, :1147 on the base) and `methodsNamed`; or a new function for the forwarders only. Chosen: the new function. The shared helper's other callers decide which declarations a dispatch method holds, a reserved point, and no test of this rung fails through them.
3. **The api's body by the checker's reading.** Ways: forward to every body-less declaration of an api's trait; forward to those without the modifier `abstract`; read the exporting component's index for a body. Chosen: the second, the checker's `isAbstractFnDecl`, with a field's getter and setter left out, since a trait's field never has a body. The third is exact but needs the component's index, which a compile against an api does not hold.
4. **The looked-up signature removes parameter 0 only where not narrowing.** Ways: remove parameter 0 in every case; or leave the narrowing call as it is. Chosen: the second. The narrowing call's signature has no leading self and its own TODO ('Buggy if narrowing self and not-self', CodeGen.java:861); no test of mine fails through it.
5. **Step 1's test shaped round row 695,** as the section above says. Way not taken: keep the object below `Tord` and wait for rung K, which would leave the test red in this rung.
6. **Row 573's kin as an expected failure with a rewrite of row 573, not a new row.** The defect is row 573's by its message and its site; the new program is its self-second case, which row 571's note named.
7. **The diamond as a plain test and a new row (home 3).** The plain diamond's answer is the base's and walk's; the test guards the rule of decision 1. The checker's refusal of the generic form stays in the row's notes, not in a test: one file cannot hold a refusal and a run, and the refusal is the half that may be wrong.
8. **No stage and no ladder driver run,** by the rung's section and the empty subset.

## Defects and their homes

| defect | home | where |
|---|---|---|
| one method written twice where a generic trait declares what it inherits (row 990) | 1 | `compiler_tests/TraitOwnMethodBesideInheritedCompiled` |
| no forwarder for a body in an api's trait that is not first, plain, generic and functional (row 732) | 1 | `compiler_tests/ApiTraitMethodNotFirstCompiled` |
| a functional method with self not first written beside its dispatch method (row 571) | 1 | `compiler_tests/FunctionalMethodMeetNarrowedSelfNotFirst` |
| an object's dispatch method tests the receiver in place of the argument, self second (row 573) | 2 | `compiler_tests/XXXFunctionalMethodCoverSelfSecond` with `FunctionalMethodCoverSelfSecondLink`; shown green as it is and red with self moved first (junit.sh runs xxx1 and xxx2: 'Saw expected failure', then 'Did not see expected failure') |
| the checker refuses the generic diamond and accepts the plain one; walk runs both (row 1037) | 3 | `compiler_tests/TraitMethodDiamondRedeclaredCompiled` asserts today's answer for the plain form; the row's notes hold the refusal |
| a body of a self-typed trait that returns `self`, at an object instance (row 695) | none of mine: rung K's row | the section above |

One observation that is no defect of the tree's code as far as I measured: with a component's jar deleted from a caches folder whose analysed entry is current, `fortress compile` of that component exits 0 and writes no jar, and the run then stops with 'Unable to read serialized data for ApiTraitMethodNotFirstApi$Ix??' (my first hash-mode script deleted the jar). build-and-caches.md's "all five compiles exit 0 and a jar is missing. The cause is not known." may be this.

## Not done

- The dispatch defect of row 573, in `OverloadSet.java`.
- Row 1013: nothing built.
- No stage, no demos, no microGPT check, by the brief.
