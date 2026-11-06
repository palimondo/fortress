# Cold read: c-run4/c31

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and `references/records.md`, `tests-writing.md`, `interpreter.md`, `compiler.md` (term lookups only). Common to all five rows: the skill names the seven status words but defines them only in the ledger's row template, which a cold reader may not open. I read `NEGATIVE-VERIFIED` as "the gap is reproduced and still present"; nothing I could read says so. Likewise the class kinds (`deliberate`, `implementation gap`) are not defined in the skill.

## Row 592

- **Defect:** For `ap[\T, A extends T\](a: A): BoxU[\T\]`, `T` appears in no parameter type, only in `A`'s bound; the argument fixes `A`. Walk then sets `T` to the argument's type (`ap(Apple)` gives `BoxU[\Apple\]`), the compiled path sets it to `T`'s own bound (`BoxU[Any]`; with `T extends Fruit`, `BoxU[Fruit]`). The paths disagree, and walk's answer is the departure.
- **Where:** walk, generic function call inference: `EvaluatorBase.java` (`fixedThroughBounds` counts `T` as fixed, and a recheck unifies `A`'s instance with `T`). Library reason: `APPCOV[\T, A extends T, B extends T\]` in `Library/CovariantCollection.fss:30` needs `T` at the argument's type; at `Any`, `booleanGuard` and `RangePrototype` fail.
- **Reproduce:** run `ProjectFortress/tests/XXXInferThroughBoundWalk.fss` under walk; the notes' `apF` call shows the bounded case.
- **Status:** leave it. The departure is deliberate (it keeps the library working while walk has no expected type) and the row is open for the curator: whether walk changes once it has an expected type. No fix to build now.
- **Could not resolve:**
  - "a type parameter that only the bound of a type parameter the arguments fix mentions": unclear wording; I parsed it only after reading the example.
  - "takes the arguments' type": the type of the argument value, or `A`'s instance? Probably the same here, but two readings.
  - P-48 and F-141: record entries I may not read. The row implies P-48 says to take the bound (the compiled answer), but does not say it.
  - An `XXX` test for a deliberate departure: what does it assert, and is it green today because walk differs? Not stated; the skill says a walk `XXX` test is green when it fails.
  - "the recheck": a walk mechanism not named in the skill.
  - "`booleanGuard` and `RangePrototype` then fail": tests, library functions or both? Not said.
  - `BoxU`, `Apple`: test-program types, not declared in the row (I assume `Apple extends Fruit`).
  - "full text: history, row 592": I read it as "the earlier text is in the ledger history file"; terse.

## Row 675

- **Defect:** On the compiled path, a static `nat` size computed from static parameters at instantiation is not checked against the `nat` range: `next[\4294967295\]()` with `sz64[\k + 1\]` gives 4294967296, and `i - 1` at `i = 0` gives -1. A power it cannot compute (`2^k` at k = 5000, `2^e` at e = -1) stops the run with a Java exception. Walk refuses each when it binds the parameter.
- **Where:** compiled path, run time: `runtimeSystem/Naming.java` `Naming.foldSize`, which folds exactly and cannot tell a `nat` from an `int` because both share the mangled spelling `Naming.XL_INTNAT` (`compiler/NamingCzar.java`). The checker checks sizes folded from numerals but not from static parameters. Walk's check: `interpreter/evaluator/EvalType.java:252-260`.
- **Reproduce:** run `ProjectFortress/compiler_tests/NatArithBeyondRun.test`; it asserts today's wrong value (4294967296), so it goes red when the fix lands and must then be changed.
- **Status:** build a fix (implementation gap, run time) when assigned; update `NatArithBeyondRun.test` with it.
- **Could not resolve:**
  - "beyond its kind": I read "kind" as the `nat` kind of static parameter and its range 0..4294967295, but the row gives that range only as walk's behaviour, not as the specification's word.
  - What the fix should do: refuse at instantiation (as walk does), refuse in the checker, or wrap? The row names the specification section but not its answer, nor the message.
  - `sz64`, `getn`, `NBox`, `IBox`, `Box`: test helpers not declared in the row; whether `i` in `NBox[\i - 1\]` is a `nat` or an `int` matters to whether -1 is wrong, and is not said.
  - `XXXNatArithRangeChecker`, `NatPowerNegativeExponentWalk`: test names without folder or extension.
  - "a nat and an int share one spelling": a code-generator concept (the mangled name); clear only by inference.

## Row 712

- **Defect:** The compiled checker refuses `h(x)` inside `g[\T extends { K, Q }\](x: Box[\T\]): T`, where `h` has the same two bounds on its type parameter, `K` is a closed trait (`comprises { A, B }`) and `Q` is ground and excludes one of `K`'s listed types: 'is not applicable to an argument of type Box[\T\]'. The call should check; walk runs it.
- **Where:** compiled checker, `scala_src/types/TypeAnalyzer.scala`: `normConjunct` expands `K` to `OR(A,B)` and `pNorm` distributes the meet with `T` into `OR(AND(T,A),AND(T,B))`; the subtype test then does not find `T` below that union.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXInferCallerTwoGroundBoundsClosedTrait.test`; trace with `-Dfortress.debug.analyzer.subtype=true`. With `h` bounded by `K` alone the call checks. Workaround `h[\T\](x)`.
- **Status:** build a fix in the checker's normalisation when assigned; the cause is traced.
- **Could not resolve:**
  - `h`'s declaration is not given; "bounded as the callee's" I read as "with the same bounds as `h`'s type parameter".
  - "a ground bound excluding a listed type": which listed type, and does `Q` exclude it or does it exclude `Q`? I read "`Q` has no type variables and excludes `A` or `B`"; the role of the exclusion in the failure is not explained (only that `K` alone works).
  - "ground", "closed trait": standard terms, not defined in the skill; I took closed trait as one with a `comprises` clause.
  - "traced at f237148ac, lines at c124c6b65": clear enough, two commits for trace and line numbers.

## Row 714

- **Defect:** The compiled checker refuses `mk(A)` for `mk[\T extends R[\T\]\](x: K): Box[\T\]`: `T` is fixed by no argument and its bound names `T` itself. Message 'is not applicable to an argument of type A'. Walk runs it.
- **Where:** compiled checker, generic call inference; the code location is not traced.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXInferUnfixedSelfBoundedParam.test`; the bound `{ K, R[\T\] }` gives the same refusal. Workaround `mk[\A\](A)`.
- **Status:** implementation gap, so a fix is expected, but not traced; a worker would first trace it. What instance the fix should give `T` is only partly settled (below), which may need a question.
- **Could not resolve:**
  - "The section's choice rule ... its instantiation rule": terms of the specification section, not in the skill; I cannot tell which rule decides applicability and which picks `T`.
  - "applicable, at the instance `A`": `A` is the argument object; is `A` also the instance chosen for `T`? The workaround suggests `T = A`, but the next sentence says the instantiation rule (the bound's intersection) does not describe a self-naming bound. So the specification is silent on `T`'s instance, yet the Specification cell is not "silent": unclear what answer the `XXX` test asserts.
  - `R`, `K`, `A`: not declared (I assume `A` extends `K` and `R[\A\]`).

## Row 776

- **Defect:** In `next[\T\](next[\T\](x))`, with `next[\T extends K\](x: Any): V[\T\]` and `trait V[\T extends K\]`, both calls have an ill-formed result type, but the compiled checker reports only the inner call ('File XXXStaticArgBoundNestedCall.fss has 1 error.', line 13, columns 36 to 46). The program is still refused; only the second report is lost.
- **Where:** compiled checker, `scala_src/typechecker/TypeWellFormedChecker.scala:50-56`: errors are keyed by message and place; both calls' types are the same `V[\T\]` built from `next`'s declared type, so they share a key, and the outer call, whose span contains the inner's, is dropped.
- **Reproduce:** compile `ProjectFortress/compiler_tests/XXXStaticArgBoundNestedCall.test` and count the errors.
- **Status:** a diagnostic gap with no specification word. The fix the row names (give a call's type the call's own span) changes the span of every message, so a worker should not build it without that being decided; I read it as leave it unless assigned.
- **Could not resolve:**
  - "one place" versus "the inner call's span lies within the outer's": if both types have one place, why do the spans of the calls matter? Two mechanisms (shared key, span containment) are named and I cannot tell which one drops the outer report.
  - "at static arguments that print alike": I read it as both calls' static argument being `T`, printed the same; wording unclear.
  - The caller's `T` and why `V[\T\]` is ill-formed (presumably the caller's `T` is not bounded by `K`) are not given.
  - Whether the `XXX` test asserts two errors (the fix) is not said.
