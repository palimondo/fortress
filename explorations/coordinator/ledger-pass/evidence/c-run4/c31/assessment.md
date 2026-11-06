# Chunk c31 assessment (c-run4, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## Row 592: rewrite
- scope: pass. present meaning: pass (the `XXX` walk test is gated; gate a12ab5c60 holds for the base, so walk still gives `BoxU[\Apple\]`).
- evidence: FAIL. "`EvaluatorBase.java:246-261`" and "`:443-447`" no longer hold `fixedThroughBounds` or the recheck; at the base they are `:458-473`, and the recheck's unify is at `:699-703` and `:1024-1043` (read with `git show c124c6b65:.../EvaluatorBase.java`).
- comprehension: FAIL, "Kept by rung W's decision D3, against P-48" tells the decision by its rung; now "A deliberate departure from P-48 (F-141)".
- ownership: pass (the open question is the curator's, named).
- consistency: pass. The `record-says-fixed` signal is a false lead: F-141 states the same behaviour as a deliberate default, not a fix.
- Read beyond evidence: EvaluatorBase.java at the base; POSITIONS P-48; FACTS F-141; the test's source.
- Dropped: "`upward`'s arms do not rest on it: their `R` is fixed by `Empty[\R\]` (`:15-28`)" (cut for the notes limit). Home: the history keeps the old line whole; pairs.txt offers it to row 825 (chunk c27), whose CastError is at `upward`'s cast. "rung W's decision D3": home F-141 (which names D3) and the history.

## Row 675: rewrite
- scope, present meaning, ownership, consistency (FACTS lines 196, 202, 205 agree): pass. The row is unchanged since its last write in Naming.java (git diff 18b5c64b4..c124c6b65 on Naming.java is empty), so the mechanism stands.
- evidence: FAIL. The pin "at 9d323883f" is not in the base's history; "`Naming.java:1234-1253`" is now `:1238-1257` at the base; "`NamingCzar.java:1829-1833`" no longer holds the shared spelling, which is at `:1951` (`Naming.XL_INTNAT` for every size operation). EvalType's refusal is at `:252-260`.
- comprehension: FAIL. The refused note of batch 17 was squeezed in as "Inferred `i-1` at i=0: -1."; now stated as "Below 0 too: `getn(NBox[\i - 1\](0))` at i = 0 gives -1".
- Reproducer: a plain compiled test that asserts today's wrong value (`run_out_equals=4294967296`); the `repro-plain-settled` signal is right that this is not an `XXX` test, but the test does reproduce the claim and the row says it turns red on a fix; its conversion to an `XXX` test is a change of the tree, not this pass's. Kept.
- Read beyond evidence: Naming.java, NamingCzar.java, EvalType.java at the base; NatArithBeyondRun.test.
- Dropped: nothing; "Walk: `EvalType...`" folded into "Walk refuses each".

## Row 691: measure
- scope: pass. present meaning: FAIL (unknown). The numbers `1011`, `1023` were measured on a1a75716a, under the bound `Object`; 1bc0a9083 moved `fortress compile` to the bound `Any`, and the rewrite then re-measured only the tuple case (`compile-ladder/rung-bound-any/REPORT.md`, row `IdTuple`; SKEPTIC.md section on row 691). `g[\T\]` has an unbounded `T`, so its behaviour under `Any` is not on record.
- evidence: FAIL, reproducer `none`, no gated test.
- comprehension: "where `Object` ran `id(3)`" is a fixed half told as history (the bound-`Object` behaviour no longer applies without a written bound); to cut in the rewrite that follows the measurement.
- ownership, consistency: pass.
- Read beyond evidence: rung-bound-any REPORT.md and SKEPTIC.md. Question in questions.md.

## Row 712: rewrite
- scope, present meaning (gated `XXX` compile test asserts the refusal message; gate holds), ownership, consistency (FACTS:96 agrees): pass.
- evidence: FAIL. "`TypeAnalyzer.scala:708-735`" and "`:696-699`" moved +80: `normConjunct` is at `:788-800`, the intersection's distribution at `:776-779` (read at the base). The `normConjunct` comment there confirms the row's reading: a closed trait expands only against conjuncts naming no type variable, and `K`, `Q` are ground.
- comprehension: FAIL, "On ee1aa1a95 and after rung C" is batch history; now "traced at f237148ac".
- siblings 686, 711 are both FIXED: dropped. Home: those rows themselves and the history.

## Row 714: rewrite
- scope, present meaning (gated `XXX` test asserts 'is not applicable to an argument of type A'), ownership, consistency: pass.
- evidence: FAIL, cites 4356454a2, not in the base's history (its landed equivalent is f237148ac, same message).
- comprehension: FAIL, "The same on ee1aa1a95 and after rung C", "the base stopped instead, 'Applied a substitution to an And and got an Or', and since rung C ... gives this refusal" is a repair story of a fixed half.
- Dropped: the old crash message (fixed half): home, the history. Siblings 447 (FIXED) and 425 (DUPLICATE): dropped, home those rows and the history.

## Row 751: measure
- scope, comprehension, ownership: pass.
- present meaning: FAIL (unknown). Measured on 3aea3da53 and rung A's tree; 396e4ed8d (where-clause constraints checked in a comprises clause's opening), 372b9bf6a, 5b11849c6, 108ab82d6 and 1bc0a9083 have since changed TypeAnalyzer.scala, and nothing gated asserts the acceptance.
- evidence: FAIL, reproducer `none`; "Sizes on the base (3aea3da53), types since rung A" is batch phrasing, to cut in whatever line the measurement gives.
- consistency: PLAN.md:452 (A.worker.1) agrees.
- Read beyond evidence: PLAN.md:452, compiler_tests/NatOpenChecker.fss (for the probe's shape). Question in questions.md.

## Row 776: rewrite
- scope, present meaning (gated `XXX` test asserts the inner span and '1 error'), evidence (`TypeWellFormedChecker.scala:50-56` still holds the within-span suppression at the base), ownership, consistency (FACTS:102 agrees): pass.
- comprehension: FAIL, "at `:13:36-46`" reads as a line of the Scala file; it is the test program's line 13 (the inner `next[\T\](x)`); now "the test program's line 13, columns 36 to 46" (mech.py reads a `file:line:col` form as a line past the file's end).
- siblings 720 FIXED: dropped; home row 720 and the history.
- The refused-notes signal names commit messages (396e4ed8d, 632f73d60) that only record that the row was added; no fact for this row in them.
- Spec cell `silent`, status NEGATIVE-VERIFIED kept (review-queue item 265); silent.txt says `defect`.
