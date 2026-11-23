# Climb batch 35: the repair of the red gate

Written on `main` above `023297005a`, the judge's ruling (`explorations/compile-ladder/climb-batch-35/JUDGE-gate.md`, commits `d5a419b1b7` and `023297005a`). One launch of the repair worked this stage: no earlier `REPAIR-gate.md` was in the batch folder, and `git status --short` of the main tree printed nothing at the start. Every call was set up as `.claude/skills/fortress-repo/references/build-and-caches.md` says, every compile of the one library in a private caches folder under the tree's `tmp/repair-gate/`, the base's code only through `/home/user/fortress-base42/explorations/coordinator/tools/old-fortress.sh` with its own private folder. The base build's `HEAD` is `295c215c2c`, not the batch's base `13f4fdea75`; `git diff --stat 295c215c2c 13f4fdea7557b867c808d0c32af5dd2a03901f4b -- ProjectFortress Library build.xml bin` prints nothing, so its code is the base's.

The repair edits one file of the code, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala` (`:1103-1134`), adds one compiled test, `ProjectFortress/compiler_tests/ComprisesSelfAbstractFunctionalMethodCall.fss` and its `.test`, rewrites ledger row 1100, adds a note to row 996, and writes the judge's three items for the curator into `explorations/coordinator/PLAN.md`. No rung is dropped or reshaped.

## What was done, by the ruling's steps

| step | done |
|---|---|
| 1 | On the merged build (its `implementation.stamp` equal to the caches', no path under `ProjectFortress/`, `Library/`, `build.xml` or `bin/` changed after `e8b20935d5`), with `FORTRESS_LIBRARY=one` and an empty private caches folder, `../bin/fortress junit one_library_tests/OneLibraryComponents.test one_library_tests/OneLibraryRunHello.test` from `ProjectFortress/`, as `.claude/skills/fortress-repo/references/tests-running.md:119` gives (one JVM, the components first): 'OK (16 tests)', '. run one_library_tests/OneLibraryRunHello (1328ms) Hello, one library'. The `VerifyError` did not reproduce there. It reproduced in the gate's own track on the same build, `ant testOneLibrary`: 'Tests run: 40, Failures: 9, Errors: 0', every run test 'java.lang.VerifyError: Bad type on operand stack' at `QQ$DefaultTraitMethods.isFinite`. The two `javap -c -p` lines are below. |
| 2 | The same one-JVM compile with the base's code, its own private folder: 'OK (16 tests)', 'Hello, one library'; its line is the merged one-JVM line, at `QQ`. |
| 3 | Both compiles again with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` added to the skill's `JAVA_FLAGS` (`-Xmx4g -Xss64m`): the base at `QQ`, the merged code at `QQ`, both 'Hello, one library'. The merged code under the flag makes the base's call, the ruling's condition for step 4; and the one merged build gives `Ratio` in ant's onelibrary JVM and `QQ` in each one-JVM run. So no scratch worktree reverted rung O or S. |
| 4 | The site traced (below): the checker's tie between `QQ`'s and `Ratio`'s declarations, kept in the identity-hash order of the overloadings. The tie now keeps the candidates that take `self` at its trait's type (`Functionals.scala:1103-1134`). |
| 5 | Not taken: step 3 found no rung's logic. |
| 6 | `ProjectFortress/compiler_tests/ComprisesSelfAbstractFunctionalMethodCall`, which fails on the merged code under the hash flag and passes after the fix in both modes (below). It asserts that the trait's default methods load, not the value of the getter that calls the methods on `self` ("Deviations", item 4). |
| 7 | After the last change of code: `ant testOneLibrary`, 'Tests run: 40, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL'; the S and O tests through the tree's `junit.sh`, 'OK (22 tests)'; step 1's program under both hash modes, 'Hello, one library' twice, all 28 calls of `numerator` and `denominator` in `QQ$DefaultTraitMethods` at `QQ`. No other suite ran. |
| 8 | Row 1100 rewritten as traced, row 996 noted ("Deviations", item 5). One commit on `main`, not pushed. |

## Steps 1 to 3: the call at `isFinite`'s offset 1

Owner `fortress/FortressLibrary`, name `\=denominator{_|Library|FortressLibrary\,fss\!643\!5-52,_|Library|FortressLibrary\,fss\!729\!5-30}` (the overloading of `QQ`'s declaration, `Library/FortressLibrary.fss:643`, and `Ratio`'s, `:729`), in every compile. Descriptor, from `javap -c -p -cp <caches>/bytecode_cache/fortress.FortressLibrary.jar 'fortress.FortressLibrary$QQ$DefaultTraitMethods'`:

| compile | JVM | descriptor | 28 calls of `numerator` and `denominator` |
|---|---|---|---|
| merged, before the fix | ant's onelibrary track | `(Lfortress/FortressLibrary$Ratio;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;` | 14 `denominator` at `Ratio`, 14 `numerator` at `QQ` |
| merged, before the fix | one-JVM `fortress junit`, default and hash 0 | `(Lfortress/FortressLibrary$QQ;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;` | all at `QQ` |
| base | one-JVM, default and hash 0 | `(Lfortress/FortressLibrary$QQ;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;` | all at `QQ` |
| merged, after the fix | ant's onelibrary track, one-JVM default and hash 0 | `(Lfortress/FortressLibrary$QQ;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;` | all at `QQ` |

The merged line before the fix in ant's JVM:

    1: invokestatic  #100                // Method fortress/FortressLibrary."\\=denominator{_|Library|FortressLibrary\\,fss\\!643\\!5-52,_|Library|FortressLibrary\\,fss\\!729\\!5-30}":(Lfortress/FortressLibrary$Ratio;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;

The base's line:

    1: invokestatic  #100                // Method fortress/FortressLibrary."\\=denominator{_|Library|FortressLibrary\\,fss\\!643\\!5-52,_|Library|FortressLibrary\\,fss\\!729\\!5-30}":(Lfortress/FortressLibrary$QQ;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;

In every case the call is `aload_0` then `invokestatic`, with no cast of `self` between them.

## The site

- In a trait whose `comprises` clause lists types, the checker types `self` as the trait met with them, a `TraitSelfType` read as `QQ & Ratio` in a subtype test (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:185`, `:579-586`), as the specification gives (`Specification/basic/expressions/var-ref.tex:63-69`). It reads the `self` parameter of `QQ`'s own declaration the same way, so `QQ`'s `denominator(self)` and `Ratio`'s have equivalent domains and neither is more specific (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:77-78`).
- A tie among candidates that fit the call as it is kept the sort's head (`Functionals.scala:1103-1108` before the fix). The sort keeps the input order where neither precedes (`ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala:53`). The input is the call's overloadings (`Functionals.scala:1638`), in the order of the disambiguator's `toSet(env.unambiguousFunctionNames(...)).toList` (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:431`, `:482`), which iterates the index's set of `Function`s (`ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java:465-466`). No class under `ProjectFortress/src/com/sun/fortress/compiler/index/` overrides `hashCode`, so that order follows the JVM's identity hashes (F-232). Ledger row 935 records this order; row 1100 records this tie's failure.
- The function reference takes the head's arrow (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1249-1253`), and the code generator writes the call's descriptor from it (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1783`).

By run, with copies of `Functionals.scala` compiled into scratch folders and put first on the class path (`.claude/skills/fortress-repo/references/compiler.md`, "Testing an edit here"), never in the tree:

- an instrumented copy printed the tie at all 38 calls of `numerator` and `denominator` on `self` in `QQ`'s bodies, for example `Library/FortressLibrary.fss:641:47-49 top=(QQ & {Ratio})->ZZ | Ratio->ZZ atSelf=(QQ & {Ratio})->ZZ sortedHead=(QQ & {Ratio})->ZZ`, and no case where a candidate that takes `self` at its trait's type lost to a strictly more specific one;
- a copy that reverses `denominator`'s overloadings, putting `Ratio`'s first, reproduced the gate's failure in a one-JVM run: '. run one_library_tests/OneLibraryRunHello (598ms) Exception in thread "main" java.lang.VerifyError: Bad type on operand stack', the 14 `denominator` calls at `Ratio`;
- the same reversed copy with the fix gave the 14 calls at `QQ` and 'Hello, one library', 'OK (16 tests)'.

## The repair

A tie that `self`'s type makes keeps, of the tied candidates, those that take each argument with `self` read as its trait alone, where some but not all do; the sort's head among them is the call's head. Any other tie keeps the sort's head as before. `QQ`'s declaration takes `self` at `QQ`; `Ratio`'s does not, so `QQ`'s is the head whatever the order: the call compiles at `QQ`'s arrow, the value that the compiled call passes, and at run time dispatch reaches `Ratio`'s body, as `Specification/basic/overloading.tex`, "Overloading Resolution", gives.

Ways not taken:

- The order of `TopLevelEnv.unambiguousFunctionNames` sorted by the declarations' spans. It changes the head of every tie of every call in the compiled path, the generic ties of rows 499, 1046 and 1047 among them, whose gated tests were written against today's behaviour. The remaining orders are the judge's third item for the curator.
- The candidates restricted to those that take `self` at its trait's type wherever one does. It would also change calls where a listed type's declaration is strictly more specific, which the specification selects statically (`var-ref.tex:63-69`), and it changes the call's static type there. The instrumented copy found no such call in the one library.
- The specification's own static choice kept, `Ratio`'s declaration, made free of the order, with the code generator casting `self` at the call as F-377 describes. Two changes, one in `CodeGen.java`; and the call would still name the overload method that row 815 finds missing.

## Tests

- The nine `one_library_tests` run tests, unchanged. Before the fix, `ant testOneLibrary` from 13:31Z: '[junit] Tests run: 40, Failures: 9, Errors: 0, Skipped: 0, Time elapsed: 204.252 sec', 'BUILD FAILED'. After: '[junit] Tests run: 40, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 195.958 sec', 'BUILD SUCCESSFUL'.
- `ComprisesSelfAbstractFunctionalMethodCall`, a trait that comprises one object, with four abstract functional methods, a getter `total` that calls them on `self`, and a getter `kind` that the run calls, which loads the trait's default methods. On the merged code before the fix, under the hash flag, by `../bin/fortress junit compiler_tests/ComprisesSelfAbstractFunctionalMethodCall.test` with a private copy of the prelude's caches:

      Expected failure: on the merged code before the fix, under -XX:hashCode=0, ComprisesSelfAbstractFunctionalMethodCall's run dies as Solid's default methods load, 'VerifyError: Bad type on operand stack ... not assignable to ...Brick'
      . run compiler_tests/ComprisesSelfAbstractFunctionalMethodCall (229ms) java.lang.VerifyError
          ComprisesSelfAbstractFunctionalMethodCall$Solid$DefaultTraitMethods.total(LComprisesSelfAbstractFunctionalMethodCall$Solid;)Lcom/sun/fortress/compiler/runtimeValues/FZZ32; @1: invokestatic
          Type 'ComprisesSelfAbstractFunctionalMethodCall$Solid' (current frame, stack[0]) is not assignable to 'ComprisesSelfAbstractFunctionalMethodCall$Brick'

  In the default hash mode, through `ONE_JVM=1 .../climb-batch-N/merged-tests/junit.sh`, it passed before the fix, 'OK (3 tests)': that JVM's order put `Solid`'s declarations first. After the fix, through `junit.sh` and under the flag by hand: 'OK (3 tests)' both, '. run ... PASS'.
- The S and O tests that the ruling names, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh SO ProjectFortress/compiler_tests` with the four `FunctionalMethod*` pairs, the `OverrideModifierCodeGeneration` pair and the seven `XXXOverride*` files: 'OK (22 tests)'.
- `Functionals`' largest method after the change is 5250 bytes of bytecode (`checkExprFunctionals`), under `MethodSizeJUTest`'s 8,000.

## Deviations from the ruling

1. Step 1 expected the `VerifyError` from a one-JVM compile in the way `tests-running.md:119` gives. That run, and the same under the hash flag, compiled `QQ`'s calls at `QQ` and ran 'Hello, one library'; the failure reproduced only in ant's onelibrary JVM (the runs above). Row 1100 had recorded the same: `Ratio` "when `FortressLibrary` compiles after other programs in one JVM", `QQ` "compiled first in a fresh JVM".
2. Step 3's test did not flip either build by the flag. Its condition for step 4 held all the same, the merged code under the flag making the base's call, and the one build disagreed with itself between JVMs, which no rung's logic can do; so step 3's bisect did not run.
3. Step 4's premise, that `Ratio`'s declaration is not applicable at the arguments' static types, is wrong against the specification: in a trait with a `comprises` clause `self` has the type `T ∩ (U1 ∪ … ∪ Un)` (`Specification/basic/expressions/var-ref.tex:63-69`), so `Ratio`'s `denominator(self)` is applicable at `self`'s static type. With `QQ`'s declaration at `QQ` (`Specification/basic/traits.tex:609`), the specification's static choice is the more specific, `Ratio`'s (`Specification/basic/overloading.tex:355-358`). The checker reads `QQ`'s own `self` parameter as the same meet, so it ties the two, and no iteration picks between them by a rule. The repair makes the tie's choice free of the order as "The repair" says. The call's static type at such a tie is the head's return type, `QQ`'s; where a listed type's declaration returns a strictly narrower type, the specification gives the narrower. No such pair is in either library's tie sites (all 38 are `ZZ`).
4. Step 6 asked the test to assert the value of the getter that calls `f(self)`. Running that getter dies, after the fix, with row 815's missing overload method: the call names the overloading of the trait's and the object's declarations, `\=f{...}`, which the component's class does not hold. A scratch copy of the test that asserts `s.total`, `SelfGetterValueProbe`, compiled and run on the fixed tree with a private copy of the prelude's caches (`bin/fortress compile SelfGetterValueProbe.fss`, then `bin/fortress run SelfGetterValueProbe`): 'java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FZZ32 SelfGetterValueProbe.\=width{_|tmp|repair-gate|probe|SelfGetterValueProbe\,fss\!15\!5-25,_|tmp|repair-gate|probe|SelfGetterValueProbe\,fss\!8\!5-21}(SelfGetterValueProbe$Solid)''. The same died so on the merged code before the fix in the default hash mode, where every call took `Solid`'s arrow. So the test asserts what the repair fixes, that the default methods verify and load, through the second getter; the getter's value waits for row 815 (climb batch 35's run 2, fork M2). The one library's `QQ` methods that call `numerator` or `denominator` on `self` are in the same state as on the base: they load, and a call of one would meet row 815.
5. Step 8 asked to add to row 996 the site and the test, or to open a row if the site is not the code generator's. The site is the checker's, and row 1100, opened by climb batch 34b's rung C, already records this failure, so no row was opened: row 1100 was rewritten as traced (its claim said the dispatch method took `Ratio`; it is the call's arrow), with this test as its reproducer, and row 996 got a note naming row 1100. Row 1100 closes once the commit is on `main`: `python3 explorations/coordinator/tools/ledger.py close 1100 --commit <hash> --test ComprisesSelfAbstractFunctionalMethodCall`, a step after the commit, which the one-commit rule of this stage leaves to the next.

## Not done

- The specification was not built: no file under `Specification/` changed.
- No suite but `ant testOneLibrary`, and no gate stage, ran; the gate runs whole again after this repair.
