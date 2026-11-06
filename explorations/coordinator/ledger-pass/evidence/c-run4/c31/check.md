# Check of chunk c31 (c-run4, base c124c6b65)

`mech.py` rerun: 5 lines, 0 failing; the chunk applies on copies and `ledger.py check` (with and without `--base`) exits 0. No closes, no duplicates, no keeps. Two questions (691, 751), one pair (592-825), one silent entry (776).

## Row 592: FAIL (rewrite)

Fidelity holds at the base: `fixedThroughBounds` is at `EvaluatorBase.java:458-473`; the recheck at `:699-703` and `:1024-1043` calls `t.unify(..., tr)` with `t` = `A`'s instance and `tr` = its bound `T`; `CovariantCollection.fss:30` holds `APPCOV`. "A deliberate departure from P-48 (F-141)" holds: P-48 says an unfixed parameter takes its bound, "never the value's type alone"; F-141 records D3 (row 592) as a default. The test `tests/XXXInferThroughBoundWalk.fss` asserts `BoxU[Any]` and `BoxU[Fruit]`, so it reproduces. Status kept, right.

Dropped tokens: `EvaluatorBase.java:246-261`, `:443-447` false at the base (moved); `EvaluatorBase.java` kept in the full path; `upward`, `Empty[\R\]`, `:15-28` true (`CovariantCollection.fss:15-30`), home the history (the old line is there whole).

Failures:
1. Cold read, "a type parameter that only the bound of a type parameter the arguments fix mentions ... takes the arguments' type": the reader parsed it only from the example and found two readings of "the arguments' type". A worker would stumble. Source: F-141 words it "a parameter that only another fixed parameter's bound mentions takes that parameter's instance, not its own bound". Correction, claim's opening: replace "under walk, a type parameter that only the bound of a type parameter the arguments fix mentions takes the arguments' type, not its bound:" with "under walk, a type parameter that only another fixed parameter's bound mentions takes that parameter's instance, not its own bound:".
2. Cold read, "`booleanGuard` and `RangePrototype` then fail": the reader could not tell tests from library functions. Source: they are `ProjectFortress/tests/booleanGuard.fss` and `ProjectFortress/tests/RangePrototype.fss`. Correction, notes: replace "and `booleanGuard` and `RangePrototype` then fail" with "and the tests `tests/booleanGuard.fss` and `tests/RangePrototype.fss` then fail".
3. pairs.txt, 592-825: the writer's own entry says "Not one defect", and the rows share no half (592: walk instantiates `T` through a bound; 825: a `CastError` at `upward`'s cast for a self-bounded parameter nothing fixed). It fails the pair rule; the dropped `upward` sentence already has its home in the history, and row 825 already cites `upward`'s cast (`CovariantCollection.fss:17`). Correction: drop the pair line.

## Row 675: PASS (rewrite)

At the base: `Naming.foldSize` at `runtimeSystem/Naming.java:1238-1257`; `NamingCzar.java:1951` returns `p(Naming.XL_INTNAT, Naming.foldSize(...))` for every integer operation; `EvalType.java:252-260` refuses a negative `nat` ('Negative nats are unNATural') and one above 4294967295. "Below 0 too: `getn(NBox[\i - 1\](0))` at i = 0 gives -1" is the batch-17 note (`compile-ladder/climb-batch-17/RECORD.md:196`: `predn[\0\]()` prints -1 compiled, walk stops 'Negative nats are unNATural: -1'), so "Walk refuses each" holds for it too. Dropped tokens: the long `Naming.java` path and `:1234-1253` (moved, now `runtimeSystem/Naming.java:1238-1257`), `NamingCzar.java:1829-1833` and `EvalType.java:256-273` (false at the base, replaced), `i-1` (restated as `i - 1`). Reproducer: a plain compiled test asserting today's value, which the line says; the pin is the base. Present, no history. Form passes. Cold-read items (what the fix should do, helper names) are answered by the cited section and test; none blocks a worker.

## Row 691: FAIL (question to measure)

The question is right to measure (numbers from a1a75716a under the bound `Object`, reproducer `none`, 1bc0a9083 since). Failures:
1. The probe covers only the generic-call half; the row's claim also states the juxtaposition half (`a(b)(c)(d)` runs a generic ternary `opr juxtaposition`, `1023`), and outcomes 1 and 3 leave it unmeasured while keeping or rewriting the line. Correction: add to the same program the row's juxtaposition shape (a generic ternary `opr juxtaposition` over `K`, printing `(a(b)(c)(d)).i`) and give each outcome for both prints: `1023` keeps that half, a refusal or `1234` drops it.
2. Outcome 1 says "keep its line", but the assessment marks "where `Object` ran `id(3)`" and "Measured on a1a75716a" as history to cut. Correction: outcome 1 becomes "rewrite: the same claim, the notes stating the measured values at the base, without 'where `Object` ran `id(3)`' and the a1a75716a pin".

## Row 712: FAIL (rewrite)

At the base: `normConjunct` at `TypeAnalyzer.scala:788-800`, whose comment says a closed trait is replaced by its listed types that no other conjunct excludes, only where that conjunct names no variable; the intersection's distribution at `:776-779`. f237148ac is in the base's history. The test asserts the refusal. Dropped tokens: `:696-699`, `:708-735` false (moved); `row 686`, `row 711` both FIXED, home those rows and the history.

Failure:
1. Cold read, "a ground bound excluding a listed type": the reader could not tell which type is excluded or what the exclusion does. Source: the test declares `trait K comprises { A, B, C }`, `trait Q excludes { C }`, and `normConjunct` drops the listed types a ground conjunct excludes. Correction, notes: replace "`K` and `Q` are ground, so `normConjunct` expands `K` to `OR(A,B)`" with "With `K comprises { A, B, C }` and `Q excludes { C }`, both ground, `normConjunct` expands `K` to the listed types `Q` does not exclude, `OR(A,B)`".

## Row 714: FAIL (rewrite)

At the base: the test asserts 'is not applicable to an argument of type A'; f237148ac is in the base's history and is the landed form of 4356454a2 (same title). Dropped tokens: `4356454a2` (not in the base's history; replaced by f237148ac), `row 425` (DUPLICATE), `row 447` (FIXED): homes those rows and the history. The old crash message is a fixed half, home the history.

Failure:
1. Cold read, "The section's choice rule makes the call applicable, at the instance `A`": the reader could not tell which rule, nor that `A` is the instance of `T` and not only the argument. Source: `Specification/basic/inference.tex:52-56`, "Choice": applicable "if some instance of it whose static arguments satisfy their bounds is applicable"; the test has `object A extends { K, R[\A\] }`. Correction, notes: replace "The section's choice rule makes the call applicable, at the instance `A`; its instantiation rule gives" with "The section's Choice paragraph makes the call applicable, since `T = A` satisfies `R[\A\]` (`A extends { K, R[\A\] }`); its rule for a parameter no argument fixes gives".

## Row 751: FAIL (question to measure)

The question is right to measure (accepted on 3aea3da53, reproducer `none`, 396e4ed8d and others since). The probe's shape matches `compiler_tests/NatOpenChecker.fss`. Failures:
1. The probe omits the row's second case, "the same program over `trait AnyBox comprises { Box[\E\] } where [\E\]` is accepted", which outcome 1 then keeps unmeasured. Correction: add a second probe, `ApplyTwoOpenType.fss`, the same program over `trait AnyBox comprises { Box[\E\] } where [\E\]` with `value object Box[\E\] extends AnyBox`, run with the same `typecheck` command, and give each outcome for both.
2. Outcome 1 says "keep its line", but the assessment marks "Sizes on the base (3aea3da53), types since rung A" as batch phrasing to cut. Correction: outcome 1 becomes "rewrite: the same claim, the notes stating 'accepted at c124c6b65' for each case measured, without that phrase". Outcome 2's "first commit between 24db899fa and the base at which the refusal appears" is a bisection, not one command; correction: name the commit only if `git log` of `TypeAnalyzer.scala` shows one plainly, else close with the base as where it was measured.

## Row 776: FAIL (rewrite)

At the base: `TypeWellFormedChecker.scala:50-56` adds an error at an expression only where no other expression with the same key lies within its span (`within(o, sp) && !within(sp, o)`); the test asserts `:13:36-` and '1 error'; line 13 of the test program, columns 36 to 46, is `next[\T\](x`, the inner call. Status `NEGATIVE-VERIFIED` beside `silent` kept (review-queue item 265); silent.txt `defect` fits. Dropped tokens: `:13:36-46` restated in words; `row 720` FIXED, home that row and the history.

Failure:
1. Cold read, "one message and one place ... the inner call's span lies within the outer's": the reader could not tell which mechanism drops the outer call. Source: `TypeWellFormedChecker.scala:37-56`: the key is the message and the type node's place; among the expressions sharing a key, an error is placed at each whose span holds no other. Correction, notes: replace "with one message and one place, so they share one key; the inner call's span lies within the outer's, so the outer call is not reported" with "with one message and the place of `next`'s declared type, so they share one key; of the calls sharing a key, only those whose span holds no other are reported, and the outer call's span holds the inner's".
