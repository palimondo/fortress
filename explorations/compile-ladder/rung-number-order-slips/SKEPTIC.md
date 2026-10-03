# Second judgement

*The row numbers are the final ones the gather of climb batch 10 assigned; the rung wrote provisional 610 to 616: 610 is row 627, the defect rung G found too, and 611 to 616 are rows 634 to 639.*

Rung N (rung-number-order-slips). Judged head: d3c34c40de75b23f4bf5ecbc16b1d80ae42239d6. Verdict: **approved**. The repair answers the refusal and each step of the judge's ruling, and it changes nothing the first judgement approved.

The harness's rule for subagents forbids writing report .md files, so this text was not written to this file or committed. It is carried in the structured result, for the gather to place above the first judgement.

## The refusal, answered

- **The code.** `Library/FortressLibrary.fss:336-345` binds the try's value, `false` after `expr()` and `true` in the `Ex` clause, then runs `if NOT raised then throw ForbiddenException(TestFailure) end` after the try. No catch clause of shouldRaise can take that throw. This is the judge's step 6 line for line, the shape the first judgement measured as SkShouldShape.fss, and the logic of `ensureApplicationFails` (Specification/basic/tests.tex, section "Other Test Constructs"). The api, `Library/FortressLibrary.fsi:251`, is unchanged.
- **The assertions.** `ProjectFortress/tests/ShouldRaiseNoExceptionWalk.fss:14-34` asserts that shouldRaise at Exception, UncheckedException and ForbiddenException of `fn () => ()` throws ForbiddenException.
- **Failing first.**
  - My own programs showed all three at 7f2495cc2: SkShouldExc.fss printed 'shouldRaise[Exception] of an expression raising nothing returned normally', and SkShould.fss printed 'passed silently' at Exception, UncheckedException and ForbiddenException.
  - The repair round's harness-one run on the library of 7f2495cc2, at 09:00:44, printed 'FAIL: J14/0:nothing thrown =/= J9/0:forbidden; shouldRaise at Exception ...' and 'Tests run: 1,  Failures: 1,  Errors: 0'.
  - The test edits were committed alone, af05bdf69 at 09:01:07. The library edit came at 09:01:20 and was committed as d3c34c40d at 09:02:28, with no edit between: `git diff af05bdf69 d3c34c40d --stat` shows one file, 13 lines.
- **Passing.** The round's run at 09:01:57, on af05bdf69 with that edit uncommitted (the same bytes d3c34c40d holds), printed 'OK (4 tests)'. It covered the new test, NumberOrderListDeclarations.fss, StringPieces.fss and StringTests.fss. Those are every caller of shouldRaise in the tree (`grep -rln shouldRaise --include=*.fss`).
- **My programs again at d3c34c40d**, walk, from tmp/rung-number-order-slips/skeptic/. SkShouldExc.fss now stops:

      Library/FortressLibrary.fss:344:24-63:
      ForbiddenException

  SkShould.fss:

      shouldRaise[DivisionByZero] of nothing => ForbiddenException, chain Test failure
      shouldRaise[Exception] of nothing => ForbiddenException, chain Test failure
      shouldRaise[UncheckedException] of nothing => ForbiddenException, chain Test failure
      shouldRaise[ForbiddenException] of nothing => ForbiddenException, chain Test failure
      shouldRaise[TestFailure] of nothing => ForbiddenException, chain Test failure
      shouldRaise[Exception] of a DivisionByZero => passed silently
      shouldRaise[DivisionByZero] of a CastError => ForbiddenException, chain Cast error

  The sixth line is the probe's label for a normal return, which is right there.
- **New differential, old against new.** SkShould2.fss runs seven cases: ForbiddenException of a ForbiddenException(DivisionByZero); DivisionByZero of a ForbiddenException(CastError); ForbiddenException of a DivisionByZero; a nested shouldRaise whose inner call is satisfied; a parallel tuple of two satisfied calls; CastError of a failing cast; and a nested shouldRaise whose inner call sees nothing.
  - On the base copy, walk prints 'returned', 'chain Forbidden exception' and 'chain Division by zero', then 'Exception in thread "main" java.lang.ClassCastException' at the fourth case.
  - At d3c34c40d, walk prints the same three lines, then 'chain Test failure', 'returned', 'returned' and 'returned'.
  - So the repaired code agrees with the base wherever the base gave a value.
- **Compiled path.** CompilerLibrary declares no shouldRaise. The round's typecheck probe of the identical body (tmp/rung-number-order-slips/repair/ShouldRaiseShape.fss) exits 0. Its negative control is refused: 'Could not check call to operator NOT - Boolean->Boolean is not applicable to an argument of type OR(Boolean,String).', 2 errors. By the judge's decision (ruling, 5(ii)) this stands in for a stage rerun.

## The required corrections, checked

The round's REPORT.md and record.md are again not on the branch, for the same harness rule, so I checked them in the texts its structured result carries.

1. **Test citations.** NumberOrderListDeclarations.fss:8 and :32 cite nothing now. :36 cites 'opr-overview.tex, subsection "Comparisons Operators"', whose text (Specification/basic/operators/opr-overview.tex:294-295) says what the message says. The new messages cite 'try.tex, section "Try Expressions"' (try.tex:12), whose text says that an exception thrown in the try block is matched against the catch subclauses.
2. **The problem line** cites distance-sites.tsv:253 for Writer.fss:34 only, and the 60 sites from CLIMB-BATCH-10.md:215, rung N, 'The problem.'
3. **The bare throw** is counted as seven sites in Library/, two repaired and five left. The three test witnesses and ReflectTest.fss:143 are named in section 3 and in row 638.
4. **The stops.** Sections 7 and 9 and stopsMet list shouldRaise, assert and deny on values that are not objects, and partition at ZZ64, each with before and after. Section 7 says `catch e CheckedException` no longer catches a typecase's MatchFailure. 'No other value changes' is gone.
5. **Row 627** names rows 561 and 563 and the method-invocation site, and says rung C's row-563 edit does not repair it.
6. **Section 9's chain decision** is rewritten as the ruling has it.

The judge's additions are there too: row 639; the four Ex on the FACTS entry's gated tests; section 6's no-rerun paragraph with the probe and its control; section 8's new line; sections 11 and 12.

## What I approved stands

The diff since 7f2495cc2 touches three files:
- shouldRaise's body;
- three message strings in NumberOrderListDeclarations.fss, whose assertions are unchanged;
- 21 lines added to ShouldRaiseNoExceptionWalk.fss, whose one comment line is unchanged.

Every later Library/FortressLibrary.fss line is one further down; partition, for example, moves from :2197 to :2198. None of my other first-judgement programs calls shouldRaise, so the diff cannot change their answers, and I did not rerun them.

## Stops met, all reversible (POSITIONS.md:100, "Reversible stops do not hold a batch")

- **A site whose only repair is a checker change**: rows 627, 636, 637 and 604, as the first judgement listed them.
- **A repair that changes a value walk prints other than rows 590's and 602's**, met three times:
  - shouldRaise with nothing raised: a ClassCastException becomes ForbiddenException(TestFailure) (:336-345);
  - assert and deny on values that are not objects: 'Non-object receiver' becomes 'FAIL: (1,2) =/= (1,3); m' (:304-335);
  - partition at ZZ64: (8,2) becomes a Unification error (:2198).

## Thread counts

Walk ran at its default; the round's harness runs used FORTRESS_THREADS=1. The repaired body binds an immutable value and touches no mutable state, so one count suffices. SkShould2.fss's parallel tuple returned normally.

No required corrections, no new rows, and no new points for Pavol: the judge's three points are carried in the repair round's forPavol.

## First round

# Skeptic: rung N (rung-number-order-slips), first judgement

Judged head: 7f2495cc2bdaf1d55ca0988a89018e34cac3340e. Verdict: **refused**, for one thing: the shouldRaise repair passes vacuously.

The harness's standing rule for subagents forbids writing report .md files, the same rule that refused the worker's REPORT.md. This text is carried in the structured result for the gather to write as explorations/compile-ladder/rung-number-order-slips/SKEPTIC.md.

## The refusal

`shouldRaise` as repaired (`Library/FortressLibrary.fss:336-344`):

    try
        expr()
        throw ForbiddenException(TestFailure)
    catch x
        Ex => assert(true)
    forbid Exception
    end

The "nothing raised" signal is thrown inside the try whose catch clause takes `Ex`. For `Ex` = `Exception`, `UncheckedException` or `ForbiddenException`, the catch takes that signal, and shouldRaise returns normally when its expression raises nothing.

From tmp/rung-number-order-slips/skeptic/, `FORTRESS_HOME=/home/user/fortress-numslips /home/user/fortress-numslips/bin/fortress SkShouldExc.fss` prints:

    shouldRaise[Exception] of an expression raising nothing returned normally

The same program on the base, `FORTRESS_HOME=/home/user/fortress-numslips-base /home/user/fortress-numslips-base/bin/fortress SkShouldExc.fss` (in skeptic/base/), prints:

    Exception in thread "main" java.lang.ClassCastException

SkShould.fss at the head:

    shouldRaise[DivisionByZero] of nothing => ForbiddenException, chain Forbidden exception
    shouldRaise[Exception] of nothing => passed silently
    shouldRaise[UncheckedException] of nothing => passed silently
    shouldRaise[ForbiddenException] of nothing => passed silently

REPORT section 9 rejected `throw TestFailure` because the forbid clause "would wrap once (and pass vacuously when Ex is TestFailure)". The chosen spelling has the same flaw, and it reaches the most general type argument.

The specification has a precedent the rung missed: the helper `ensureApplicationFails` (Specification/basic/tests.tex, section "Other Test Constructs") sets a flag inside the try and calls `fail` after it, where no catch clause can take the failure. That shape works under walk (SkShouldShape.fss, head):

    Exception of nothing => ForbiddenException, chain Test failure
    ForbiddenException of nothing => ForbiddenException, chain Test failure
    DivisionByZero of a DivisionByZero => passed
    DivisionByZero of a CastError => ForbiddenException, chain Cast error

What must change: shouldRaise raises its "nothing raised" signal where none of its catch clauses can catch it. ShouldRaiseNoExceptionWalk.fss gains an assertion that `shouldRaise[\Exception\](fn () => ())` raises, shown failing through harness-one.sh at 7f2495cc2 and passing after the repair.

## What holds

- **Item 20's drop.** `fail`, `builtinPrimitive` and List's nullary `BIG <|` are byte for byte the text before de22fd928 (`git show de22fd928` prints `-fail[\T\](s:String):T` and the same for the other two). "Function body has type Object, but declared return type is ()" counts 18 in explorations/compile-ladder/gate/distance-sites.tsv and 0 in the worker's dist-post/errors.tsv.
- **Test first.** h-promoted-base ran at 05:28:47 on 9c9e823d5 plus the renames: 'FortressException: MatchFailure', '** bug! MethodClosure shiftLeft ... has neither body nor def instanceof Method', 'Tests run: 2, Failures: 2'. The renames were committed alone at 05:29 (4ddd54070, 75810957d). h-shouldraise-base ran at 05:47:07, tree 75810957d: 'java.lang.ClassCastException', 'Tests run: 1, Failures: 1'. It was committed alone at 05:47:38 (dfb8a6405). The library edits come at 05:49 and later.
- **After tables on the head's code.** The checker count ran chained to the 7f2495cc2 commit (cc-post/javac.txt 06:21:42, run.txt 06:25:18). It printed 'count tables identical' against climb-batch-9/gate/checker-count.txt: '#total 1', '#crash none'. The distance ran from 06:25:23 to 06:49 on 7f2495cc2. `compare.sh climb-batch-9/gate/distance.txt tmp/rung-number-order-slips/distance-postedit.txt` prints 'DISTANCE DOWN 340 -> 300 (-40)', OT 145 -> 118, NM 24 -> 17, BR 8 -> 11, X1 8 -> 5, Writer 9 -> 0, and the four crash rows moved 16 lines, as REPORT section 6 says. The BR +3 messages are on file in climb-batch-N, -7C, -6.5 and -6.5b. From the site diff: 18 dropped + 25 repaired + 35 left = the rung's 60 + 18.
- **The 46-file run.** It ran on 7f2495cc2: '# harness-one 2026-10-03T06:25:30Z; tree 7f2495cc2', 'OK (46 tests)'.
- **Walk differentials agree with the base wherever no change was meant.** SkNum.fss covers even and odd of ZZ32, ZZ64, ZZ, NN32 and NN64 including negatives; 'signed(b) = -8589934591 ZZ64? true'; NN64 into ZZ; zero and one; partition at ZZ32; and 'srb: 3/7 -3/7 0 1/2 1/2 0/0'. SkAssertObj.fss gives 'FAIL: a Int: 3 =/= a Int: 4; m and more' on both trees. SkList.fss, at 1 and 4 threads, shows '<|1|> || a' still taking branch 2 (a.leftSpace 41 then 0) and the comprehensions at functions and at ().
- **Rows 590 and 602.** A typecase that matches nothing is caught as UncheckedException under walk ('typecase: unchecked', 'case: unchecked'). The compiled path agrees (comp/SkComp.fss: 'typecase no match: unchecked'), as typecase.tex, section "Typecase Expressions", says. `(((0,1,2):(6,7,8)):(2,3,1)).shiftLeft((1,2,3))` is 'StridedFullRange3D(-1,-1,-1, 5,5,5, 2,3,1)' with 84 elements, as before the shift.
- **Compiled path.** even, odd and signed agree with walk (signed of NN64 2^64-1 is -1). The worker's row 627 reproduces: comp/SkCapture.fss refuses tagG with 'Could not check method invocation Box[\G\].mp - [\(ZZ32, G)\](ZZ32, G)->(ZZ32, G)->Box[\(ZZ32, G)\] is not applicable to an argument of type G->(ZZ32, G).' and accepts tagH.

## Required corrections, for the repair round

1. NumberOrderListDeclarations.fss: the simplestRationalBetween message cites numbers.tex, section "Rational Numbers", which does not mention it. The "pairs compare lexicographically" message cites opr-overview.tex "Comparisons Operators", which speaks of characters, strings and lists, not tuples. Drop both citations, and write "subsection" on the lists message.
2. Provenance problem line: distance-sites.tsv:253 is the Writer.fss:34 row, not the 60 sites.
3. The bare `throw ForbiddenException` is written seven times in Library/, not in the tree. Three more live sites are in tests: QuickCheckTest.fss:39, InferUnfixedBoundWalk.fss:8, XXXInferSeveralBoundsWalk.fss:10.
4. The stop "a repair that changes a value walk prints other than rows 590's and 602's" is met, and reversible (POSITIONS.md:100), by shouldRaise, by assert and deny on non-objects, and by partition at ZZ64 (SkPart64.fss: base '(8,2)', head 'Unification error ... (x:ZZ32) got arg 10: ZZ64'). List them in stopsMet. Section 7 should also say that `catch e CheckedException` no longer catches a typecase's MatchFailure.
5. Row 627: name rows 561 and 563 as the same capture at other sites.
6. Section 9's chain decision: rewrite it with the repair.

## Recommended rows

- Row 627, with rows 561 and 563 cited.
- Row 638, with the test sites listed.
- A test-machinery row: no interpreter test can hold a failing assert's message, because FileTests.java:381-384 fails any output holding "fail" or "FAIL" except a file named QuickCheckTest.