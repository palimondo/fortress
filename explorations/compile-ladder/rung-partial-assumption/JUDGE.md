# Rung P of climb batch 34: the judge's ruling (row 818)

One launch of the judge ruled the rung. It ran no build and no test. It read the briefing extract, the contested commit `d2dad41bfb`, `REPORT.md`, `SKEPTIC.md`, `record.md`, and the passages and code cited below. Head ruled on: `2d91b7b6e1`, the skeptic's verdict.

## Decision

**Stands.** The one contested fix, `d2dad41bfb`, is upheld. Nothing is reverted. The rung lands as the branch holds it.

## The contested fix: `d2dad41bfb`, upheld

**The form.** `pick(n, b asif Named)` with `b = Leaf(1)` and `n: Named = Leaf(2)`. The overloads are a top-level `pick(x: Named, y: Named)` and `object Leaf`'s functional methods `pick(self, y: Named)` and `pick(self, y: Leaf)` (`ProjectFortress/compiler_tests/XXXAsIfPartialWithFunctionalMethodCompiled.fss:5-15`).

**What the standard says.** P-25 makes the specification the standard: "`Specification/` stays the standard ...". An assumption makes "both the static and the dynamic type" of the assumed value the assumed type "for the purposes of the immediately enclosing function, method, or operator invocation" (`Specification/basic/expressions/type-annotation.tex:45-48`). The call then runs the most specific declaration that is applicable at run time (`Specification/basic/overloading.tex:302-311`).

So at `y` the dynamic type is `Named`, and `pick(self, y: Leaf)` is not applicable. The applicable declarations are `pick(Named, Named)` and `Leaf`'s `pick(self, y: Named)`. The second is more specific, so the answer is `Leaf picks Named`. Fork P1 says the same thing in other words: the call dispatches among "the set of declarations that take the assumed types at the assumed places" (`explorations/coordinator/CLIMB-BATCH-34.md:397`). Walk agrees, since it wraps only the assumed value (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:109-116`). The test's program passes under walk on the base ('PASS', exit 0; `SKEPTIC.md`, "Finding 1").

**What the worker's head did.** On `b6e00326be` the call compiled, and it answered `Leaf picks Leaf` (`SKEPTIC.md`, "The programs", `SkFm`). The reason is in the code:

- The dispatch's arm for the functional method calls the component's static method by name and signature (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2523`, `invokeParticularMethod`).
- That static method is the springboard. It calls the receiver's own method, and that method dispatches again on `y`'s run-time type, which is `Leaf`, with the assumption gone. The skeptic's `javap` lines in `SKEPTIC.md`, "Finding 1", show this:

      5: invokevirtual #68   // Method SkFm$Leaf."pick?0":(LSkFm$Named;)Lfortress/CompilerBuiltin$String;
       1: instanceof    #3                  // class SkFm$Leaf
      12: invokevirtual #16                 // Method "pick?0":(LSkFm$Leaf;)Lfortress/CompilerBuiltin$String;

- So `generateDispatchAmong`'s own doc, "each arm calling its member's own body" (`OverloadSet.java:2337`), is true for a top-level member and false for a functional method.

The run of the test on the worker's head shows that the call compiled (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh sk34head ProjectFortress/compiler_tests XXXAsIfPartialWithFunctionalMethodCompiled.test`, quoted in `SKEPTIC.md`):

     Saw failure, but did not satisfy compile_exception_contains; expected
    1) ProjectFortress/compiler_tests/XXXAsIfPartialWithFunctionalMethodCompiled(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

A call that the base refused thus compiled to a value that the specification, fork P1 and walk all reject. This is the section's reserved point, "A change of which declaration a call reaches", and the wrong value gives no error or message.

**Why refusing is the right repair.**

1. *The record gives forms not built a refusal.* For row 818's forms that the batch does not build, fork P2's default is "a program that writes one gets the code generator's refusal, as today" (`CLIMB-BATCH-34.md:398`). P2 does not list this form, because nobody had met it. Its rule still covers it: a form that the rung does not build correctly gets the base's refusal and an expected failure.
2. *The worker refused the same mechanism elsewhere.* The worker's Decision 1 (`REPORT.md`, "Decisions") leaves the partial form at a functional method refused (`CodeGen.java:7265`, kept from the base's `:7264`). Its reason is that the bodies "are a trait's static springboard methods that `OverloadSet` emits no arm for". The fix applies that reason to the one emission path that Decision 1 overlooked, where a functional method is a member of the overload set of a top-level function.
3. *The code generator already refuses in this case.* `forMethodInvocation` refuses a partial assumption at a dotted call for this same cause: `throw sayWhat(x, ASSUMPTION_PARTIAL_CALL); // the receiver dispatches too` (`CodeGen.java:7522`, from the base's `:7447`). The fix (`CodeGen.java:7342-7343`) is that refusal, with that message, in the third branch of `partiallyAssumedCall`.
4. *The mission does not need the form.* `String`'s two calls (`Library/String.fss:67`, `:69`) assume `String` at `s1`. Of the two declarations (`:53`, `:61`), only `(s1: String, s2: String)` takes `String` at `s1`. So the call reaches one declaration and takes the first branch (`CodeGen.java:7337-7338`), and the fix's loop never runs. The skeptic compiled `String` under the selector on `6a56a39123`, the head after the fix: 'compile exit=0' and `String.jar` of 84,833 bytes, the same as on the worker's head (`SKEPTIC.md`, "Finding 1").
5. *Building the form is a different change.* An arm would have to call a functional method's body directly, past both the receiver's virtual dispatch and its overload dispatch. That changes `OverloadSet`'s arms (`invokeParticularMethod`, `OverloadSet.java:2499-2524`) for every object and trait, with or without overloads of the name. The section names `OverloadSet.java` only "if the dispatch over several is written there". It does not ask the rung to change how every arm reaches a method.
6. *Reverting is worse than either way.* A revert would not restore a refusal. It would restore the wrong value. Neither the worker nor the skeptic argues for that.

**Which claims were right.**

- **The skeptic** is right on each point: the wrong value and its cause (`OverloadSet.java:2337`, `:2523`), the specification's answer (`type-annotation.tex:45-48`), fork P1 (`CLIMB-BATCH-34.md:397`), and P2's default (`:398`).
- The skeptic's own limit is also right: the refusal is wider than it needs to be. Where an object declares the method only once, its springboard reaches the body directly (`SKEPTIC.md`, "What was checked", item 11). That breadth fails with an error, not a wrong value. Row 818's new line in `record.md` records it ("a dispatch holding a functional method").
- **The worker's argument** is right that its stated scope covers only "the partial call of an overloaded function or operator of the component" (`REPORT.md`, "Decisions", 1). It is wrong that the scope therefore lets this form compile:
  - The form is in the scope. The call is a call of a top-level overloaded function, `pick`, whose resolved declaration is the top-level `pick(Named, Named)`.
  - What the scope did not consider is the emission for a functional method among the reached members. For that, the worker's own reason in Decision 1 gives a refusal.
  - The worker's corrected report (`ea9f17ab75`) already presents the fix as part of the rung (`REPORT.md`, "What changed and why", item 3, and "Points to report", 1, 3 and 6).

## What lands

The branch as it stands: `e9b92aad8d`, `a95eb01926`, `b6e00326be`, `d2dad41bfb`, `6a56a39123`, `ea9f17ab75`, `2d91b7b6e1`, and this file. The gather applies row 818's rewrite from `record.md`. That rewrite names `XXXAsIfPartialWithFunctionalMethodCompiled` among the forms that stay refused. The gate's compiler track counts one test more than the worker's run, 1774 (`SKEPTIC.md`, "What was checked", 9).

## For the curator

One decision is taken where nothing on record settles it. The specification does not leave the answer open. What is open is whether this rung builds the form or refuses it.

- **Taken:** a partial-assumption call whose dispatch among some declarations would include a functional method is refused, with the base's message (`CodeGen.java:7342-7343`), and has the expected-failure test `XXXAsIfPartialWithFunctionalMethodCompiled`. It falls under fork P2's default by analogy (`CLIMB-BATCH-34.md:398`) and follows the code generator's own refusal at `CodeGen.java:7522`. Cost: a program that writes the form gets a refusal. The library has no such call (`SKEPTIC.md`, "What was checked", 8). The refusal is also wider than needed for an object that declares the method once.
- **Not taken:** building it, with an arm that calls a functional method's body directly, past its receiver's virtual and overload dispatch, in `OverloadSet`'s arms (`invokeParticularMethod`, `OverloadSet.java:2499-2524`). Cost: a change to how every dispatch arm reaches an object's or a trait's method. That is later work for row 818, which holds the form.
