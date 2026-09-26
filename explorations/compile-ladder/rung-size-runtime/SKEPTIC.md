# Rung Z, `rung-size-runtime`: the skeptic's second judgement

Composed at the gather of climb batch 5 (2026-09-26) from the two skeptics' structured verdicts (run `wf_88172730-ebe`, `skeptic2:Z` on the repair head `5e030a07d`, and `skeptic:Z` on `57dac1278`, below under "First judgement: refused"). Neither skeptic could write this file: the subagent harness refused report `.md` files by name, and both carried their text in their results, as the batch rule provides. Their words are kept, with one change: the provisional row numbers they cite are replaced by the final ones the gather assigned (provisional 413 to 417 are rows 416 to 420; so "row 415", walk's 32-bit reading of a size, is row 418). Their probes and captures are under `probes/skeptic/`, committed on the branch as `2492fca0b` and `947b40041`.

**Verdict: approved**, with three required corrections, each closed at the gather (the batch record, rung Z).

## Summary

Second judgement of rung Z (sizes at run time), on the repair head 5e030a07d. I approve it, with three required corrections. I did not write SKEPTIC.md: the subagent harness tells agents not to write report .md files, as it told the first skeptic and the worker, so the gather composes SKEPTIC.md from this result. My probes and captures are committed and pushed as 947b40041 on wip/rung-size-runtime, and nothing else is in that commit.

I rebuilt from a clean state: ant compileAll, the caches wiped, and the library cache rebuilt in library order (log in tmp/sk2-rebuild.txt, which is gitignored). The machine was nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz at 2100.000 MHz, JDK 25, with the load average at each run's start in each capture's first line.

Both refusal grounds of the first judgement are repaired and gated (home 1):
- F1, a size is now a closure's free static parameter. NatRtClosure passes through the harness (junit-second.txt:3-13), passes 5 of 5 compiled runs at FORTRESS_THREADS=1 and 5 of 5 at 4, and passes under walk at both counts (tests-both-threads.txt:3-19).
- F2, value position now reads back a size at any magnitude. NatRtBigSize passes through the harness (junit-second.txt:14-31) and 5+5 compiled runs (tests-both-threads.txt:20-49).

Both failures were recorded before any source edit, on the unchanged build 3b2b399da, and committed as b3941cb06:
- junit-before-closure.txt:7, NoClassDefFoundError: CONST;
- junit-before-bigsize.txt:8, NumberFormatException "2147483648".

The test files are byte-identical from b3941cb06 to HEAD, and the source did not change after 3bca6b8bc.

The diff matches the report and nothing more:
- FreeVarTypes gains forIntRef, a VarRef case behind a check that the name is a nat or int parameter of an enclosing declaration, and the push and pop in forFnDecl, forObjectDecl and forTraitDecl.
- CodeGen emits one CONST.Nat call with descriptor ()LFIntLiteral;.
- MethodInstantiater applies forIntLiteralExpr's three bitLength branches (CodeGen.java:3875-3910) at load.
- Naming gains INT_LITERAL_CLASS, which equals NamingCzar.internalFortressIntLiteral (NamingCzar.java:188, :407-408).

The whole component is visited once (CodeGenerationPhase.java:187-188), so the parameter stack is populated when forFnExpr and the task path read the memoised sets. Every instantiating writer uses COMPUTE_MAXS|COMPUTE_FRAMES (InstantiatingClassloader.java:400), so the two-slot LDC long is safe.

Every other gated verdict is as the worker reports:
- the 19 first-round tests pass;
- XXXNatRtTask and XXXNatRtMethBoth, each run after its link half, say "Saw expected failure";
- the promoted NatArgRungS passes, and XXXTypeBoundDisp and XXXNatExtendsTwice still fail as expected;
- RTTIsizeJUTest is OK (6 tests), at junit-second.txt:427-431.

The count table probes/checker-count-repair.txt has #total 125 and #crash none, with a body identical to checker-count-after.txt. The worker's result declares 125 and the manifest predicts 125, so the table, the declaration and the prediction agree.

My 13 new differential programs ran under walk and compiled, each at 1 and 4 threads. They found no defect in the rung's code:
- returned closures, parallel sums, two instantiations inside one parallel for, typecase on Box[\k\] inside a closure, closure parameter types, and a closure in a trait's generic method all agree between walk and the compiled run;
- shadowing a size is refused statically by both paths, so the name check cannot misfire.

They did find that walk's F5 (row 418) also has a silent form. A size that is a multiple of 2^32 truncates to 0 under walk with exit 0: Box[\4294967296\] reads as 0 and takes a Box[\0\] typecase arm (ZtWalkZero, differential-6.txt). Walk also refuses g(Box[\0\]) beside g(Box[\4294967296\]) as a duplicate overloading (differential-5.txt). Row 418 as the worker wrote it describes only the loud failure.

On the failure-mode question, the rung turns two loud failures into values:
- a size of 2^31 or more in value position, which died at load, now gives the exact value; conversion to a type too small for it stays loud ('Not in range for ZZ32: 3000000000', 'Not in range for ZZ64: 9223372036854775808');
- a size read inside a closure, which died with NoClassDefFoundError, now gives the value walk gives.

Row 400's SkDeadVal stays loud (NumberFormatException "n" at MethodInstantiater.java:227).

The worker's corrections of the judge hold against primary sources:
- F4 is ledger row 76. Specification/basic/operators/intro.tex:66-70 says juxtaposition with a string on the left is concatenation, and the two library lines are CompilerBuiltin.fss:406 and FortressLibrary.fss:4062 in this tree.
- The regression drivers were junit-tests.sh, regress.sh and junit-bound.sh, as junit-final.txt:1 says.

Deferring the task path (row 419, home 2, shown red on a local fix) is a reasoned decision within the judge's scope. So is deferring the generic-method defect (row 420, home 2, not shown red because no fix is known). Nothing in the rung reaches a program without a nat or int parameter: I read the net diff of OverloadSet, RTTI, CodeGen, MethodInstantiater and TypeAnalyzer to check. I found no stop.

## Findings

- APPROVE. Both refusal grounds of the first judgement are repaired, and each has passing gated assertions that I ran myself: NatRtClosure at junit-second.txt:3-13 and NatRtBigSize at :14-31, plus 5 of 5 compiled runs at each of FORTRESS_THREADS=1 and 4 (tests-both-threads.txt).
- Recorded failures exist and come before the edit. b3941cb06 touches no source; its captures show CONST (junit-before-closure.txt:7) and NumberFormatException "2147483648" (junit-before-bigsize.txt:8) on build 3b2b399da. The two test files are identical from b3941cb06 to HEAD, and the source did not change after 3bca6b8bc.
- The diff was read line by line against the ruling. FreeVarTypes.java:106-166 is forIntRef, the twin of forVarType (base :98-100) and of OverloadSet.java:1221-1224, plus the VarRef case behind the enclosing nat/int parameter check (the kind test of OverloadSet.java:1460-1461). CodeGen.java:5998-6006 emits one CONST.Nat call typed ()LFIntLiteral;. MethodInstantiater.java:225-241 applies forIntLiteralExpr's three bitLength branches (CodeGen.java:3875-3910). Naming.java:156 adds INT_LITERAL_CLASS, equal to NamingCzar.java:188/:407-408; MethodInstantiater imports nothing from the compiler package. The edit is no larger than the tests need, and CodeGen.forFnExpr is unchanged, as the judge directed.
- The name check is sound in practice. The whole component is visited once (CodeGenerationPhase.java:187-188), so the stack is populated when the memoised sets are read. A local or parameter that shadows a size is a static error on both paths ('Variable k is already declared', ZtShadow), so the check cannot count a non-size.
- Provenance: REPORT.md does not exist, because the harness refused the write as it did in round one. I opened every file:line in the repair round's five-line amendments, and each says what it is claimed to say: differential-3.txt:2-181, differential-1.txt:2-34, literals.tex:83-86, trait-parameters.tex:19-24, FreeVarTypes.java:98-100 at 6030e4b36, OverloadSet.java:1221-1224, CodeGen.java:3875-3910, MethodInstantiater.java:225-241, FreeVarTypes.java:111-123 and Naming.java:156. The historical line lists all seven 2012-tree files the net diff edits.
- The precedent search follows the right precedent this time (all three forIntLiteralExpr branches) and counts FreeVarTypes as the eighth site of the 'static arguments are types only' family and the task path as the ninth. There is one small inconsistency: the text speaks of 'six throwing sites' but lists five (OverloadSet.java:1199, :1768, :1795 and CodeGen.java:5778, :5793 at 6030e4b36). It is not load-bearing.
- Competing declarations: none. git grep over ProjectFortress/src, tests, compiler_tests, Library and LibraryBuiltin finds NatRtClosure, NatRtBigSize, XXXNatRtTask, XXXNatRtMethBoth, INT_LITERAL_CLASS, sizeParams and pushSizeParams only in the rung's own files. forIntRef and forVarRef in FreeVarTypes override generated visitor defaults and nothing hand-written (NodeCollectingVisitor declares neither). This agrees with the worker's probes/name-grep-repair.txt.
- Each new test file carries exactly one comment line, pointing at explorations/compile-ladder/rung-size-runtime/REPORT.md, a file that does not exist on the branch; the gather must compose it (third required correction).
- The FACTS amendment overclaims one clause. It cites compiler_tests/NatRtClosure for a size in 'an object's or trait's method', but NatRtClosure has no trait. The trait default-method path (forTraitDecl's push) is shown only by probes: ZrTraitClosure (differential-repair-own.txt:84-106) and my ZtParamType (differential-7.txt), which agree with walk at both counts.
- Provisional row 418 understates the interpreter defect. Walk's 32-bit truncation is silent when the low 32 bits are nonnegative. v64(Box[\4294967296\]) is 0 and v64(Box[\4294967299\]) is 3 under walk, and Box[\4294967296\] takes a Box[\0\] typecase arm, all with exit 0 (differential-6.txt). Walk also refuses g(Box[\0\]) beside g(Box[\4294967296\]) as a duplicate overloading (differential-5.txt:3-34). The compiled run is right in all of them.
- The count table probes/checker-count-repair.txt gives #total 125 and #crash none; the worker declares 125; expectedCheckerCount predicts 125. All three agree. The repair round touches no checker code.
- The worker's correction of the judge on F4 is right. Row 76 exists, and Specification/basic/operators/intro.tex:66-70 says juxtaposition with a string on the left is string concatenation, while expressions/constant.tex:75-79 gives concatenation no separator. A note on row 76 is the right record, not a new home-3 row.
- Rows 417, 419 and 420 as the worker wrote them are true against their captures. The F3 row's two failure forms are both measured: NullPointerException in skeptic/threads-repeat.txt and LinkageError in skeptic/differential-1.txt:332. The citations CodeGen.java:1633-1634, :4769-4800 (delegate) and :3462-3475 were opened. XXXNatRtMethBoth fails on its size half first (j$RTTIc), so its type half runs only once the size half is repaired; row 420 names both, which is acceptable.
- Existing rows met in passing, none of them this rung's: 304 (Can't compile LetFn, ZtLocalFn), 326 (NN32 renders signed when compiled, ZtOutOfRange) and 400 (SkDeadVal still loud, now at MethodInstantiater.java:227).
- SKEPTIC.md was not written, because the subagent harness forbids report .md files. The gather composes it from this result, as for the first judgement. My probes and captures are committed as 947b40041 on wip/rung-size-runtime and pushed. The tracked-path check over every path this result cites printed nothing: no MISSING and no UNTRACKED path.

## Differentials run

- ZtRetClosure (probes/skeptic/differential-4.txt:3-25): adder[\nat k\] returns fn (x) => x + k, called outside at k=3 and k=4. Compiled 4, 5, 117 at FORTRESS_THREADS=1 and 4; walk 4, 5, 117 at 1 and 4. AGREE.
- ZtLocalFn (differential-4.txt:26-51): a local function reading k. Compiled refuses at code generation with 'Can't compile LetFn', at both counts; walk 13, 15 at 1 and 4. DISAGREE, rule 4 outcome 1 against the compiled run, which is existing ledger row 304 (blocks.tex:40-44). Not this rung's defect.
- ZtParSum (differential-4.txt:52-70): SUM[i <- 0#1000] k at k=3 and k=7. Compiled 3000, 7000 at 1 and 4; walk 3000, 7000 at 1 and 4. AGREE.
- ZtTwoInst (differential-4.txt:71-85): a parallel for over 8 iterations calls f(Box[\3\]) or f(Box[\4\]), and f reads k in a closure, into an atomic accumulator. Compiled 28 at 1 and 4; walk 28 at 1 and 4. AGREE, and no F3 race on this path.
- ZtOutOfRange (differential-4.txt:86-116): a size of 3000000000 read as NN32, then as ZZ32. Compiled prints -1294967296 for the NN32 (existing row 326: NN32 renders signed on the compile path), then the loud 'Not in range for ZZ32: 3000000000', exit 1, at 1 and 4. Walk: 'Negative nats are unNATural: -1294967296' at 1 and 4, which is row 418.
- ZtShadow (differential-4.txt:117-142): a closure parameter named like the enclosing size. Both paths refuse it statically with 'Variable k is already declared', at both counts. AGREE; the name check in FreeVarTypes cannot see a shadowing local.
- ZtTypecaseK (differential-4.txt:143-165): typecase against Box[\k\] inside a closure. Compiled same, diff, same at 1 and 4; walk the same at 1 and 4. AGREE. Its type twin ZtTypecaseKT (:166-188) also AGREES.
- ZtBig64Val (differential-4.txt:189-216): sizes of 2^32, 2^62, 2^64 and 2^128 read through a for body and through nested closures. Compiled prints 4294967296, 4611686018427387904, 18446744073709551616 and 340282366920938463463374607431768211456 at 1 and 4; walk prints 0, 0, 0, 0 with exit 0 at 1 and 4. DISAGREE, rule 4 outcome 2: literals.tex:83-86 gives the numeral its value v, so walk's silent 0 is wrong; this is row 418.
- ZtWalkWrap (differential-5.txt:3-34): g(Box[\4294967296\]) beside g(Box[\0\]). Compiled 4294967296, 4294967299, two-to-32, zero at 1 and 4; walk refuses the declarations as a duplicate overloading at 1 and 4. DISAGREE, outcome 2 against walk, row 418.
- ZtRange64 (differential-5.txt:35-69): sizes 2^63-1 and 2^63 read as ZZ64. Compiled 9223372036854775807, then the loud 'Not in range for ZZ64: 9223372036854775808', at 1 and 4; walk 'Negative nats are unNATural: -1' at 1 and 4, row 418. The compiled run is right and loud.
- ZtWalkZero (differential-6.txt): sizes 4294967296 and 4294967299 read as ZZ64, and typecase of Box[\4294967296\] against Box[\0\]. Compiled 4294967296, 4294967299, 'not zero' at 1 and 4; walk 0, 3, 'same as zero', exit 0, at 1 and 4. DISAGREE, outcome 2 against walk: a silent wrong answer, row 418.
- ZtParamType (differential-7.txt): a closure whose parameter type is Box[\k\], and a closure in a trait's generic method reading both the trait's k and the method's j. Compiled 41, 34 at 1 and 4; walk 41, 34 at 1 and 4. AGREE.
- The rung's NatRtClosure and NatRtBigSize outside the harness (tests-both-threads.txt): compiled 5 of 5 PASS at FORTRESS_THREADS=1 and 5 of 5 at 4 for each. Walk: NatRtClosure PASS at 1 and 4; NatRtBigSize 'Negative nats are unNATural: -1294967296' at 1 and 4, which is row 418.

## Thread counts

Every differential ran at FORTRESS_THREADS=1 and at FORTRESS_THREADS=4, set on the command line over env.sh's 1, for both the compiled run and walk. The reason is that the rung writes state any thread may reach: RTTIsize.of writes a shared table, and the first load of instantiated closure classes goes through the loader, the site of F3. The two new gated tests also ran compiled 5 times at each count. No answer differed between the two counts anywhere. ZtTwoInst and ZtParSum run their closures in parallel at 4 threads and are correct there; that path creates closures with `new`, not RTHelpers.loadClosureClass, so it does not reach F3's race. The harness run (junit-second.txt) is at FORTRESS_THREADS=1, as the gate runs.

## Loud to quiet

Yes, in two places, and both are right per the specification and the judge's ruling.

(1) F2. A size of 2^31 or more in value position used to die at load with NumberFormatException (MethodInstantiater's Integer.parseInt). It is now the exact IntLiteral of the instantiating numeral, through the int, long or String branch. Conversion to a type the value does not fit stays loud through FIntLiteral's range checks: z32(Box[\3000000000\]) raises 'Not in range for ZZ32: 3000000000', and v64(Box[\9223372036854775808\]) raises 'Not in range for ZZ64: 9223372036854775808' (differential-4.txt:86-116, differential-5.txt:35-69). An NN32 target gets the right value 3000000000, but the compiled run prints it as -1294967296; that is existing row 326 (FNN32.toString is signed), not this rung.

(2) F1. A size read, captured or used to instantiate inside a closure used to fail with NoClassDefFoundError CONST, NoClassDefFoundError k$RTTIc or NoSuchMethodError <init>. It now gives the value walk gives.

The remaining loud failures stay loud:
- a size name that reaches the loader uninstantiated (row 400's SkDeadVal) is still NumberFormatException 'For input string: "n"', now at MethodInstantiater.java:227 (row400-repair.txt);
- a size read in a parallel task is still NoClassDefFoundError CONST (XXXNatRtTask).

The quiet wrong value I found is on the interpreter side. Walk truncates a size to 32 bits, so Box[\4294967296\] reads as 0 with exit 0 (ZtWalkZero). That belongs in row 418.

## Defect homes

- F1 (a size is not a closure's free static parameter): home 1. Asserted in ProjectFortress/compiler_tests/NatRtClosure.fss:35-46, 10 assertions citing trait-parameters.tex:82-90. Recorded failing at probes/junit-before-closure.txt:7; passing in my harness run at probes/skeptic/junit-second.txt:6-11 and in tests-both-threads.txt at both thread counts. The trait default-method path, forTraitDecl, has no gated assertion: see the first required correction.
- F2 (a size of 2^31 or more in value position dies at load): home 1. Asserted in ProjectFortress/compiler_tests/NatRtBigSize.fss:13-41, from 2^31-1 to 2^64-1 plus a type-position guard. Recorded failing at probes/junit-before-bigsize.txt:8; passing at probes/skeptic/junit-second.txt:14-29 and in tests-both-threads.txt.
- F3 (race in the closure-class loader on first load): a ledger row, row 417, not a gated test, because the gate runs at one thread and the harness gives a test no environment of its own (env.sh:6; FileTests.java:493-495). Captures: probes/skeptic/threads-repeat.txt (NullPointerException 5 of 5 at 4 threads for ZsThreadsT, ZsThreadsS, ZsThreads) and differential-1.txt:323-341 (LinkageError, duplicate class definition). Both failure forms the row names are measured.
- F4 (compiled string juxtaposition inserts spaces): a note on existing row 76, which is already home 2 through compiler_tests/XXXJuxtConcatRungS; the specification settles it (operators/intro.tex:66-70). This is correct.
- F5 (walk reads a nat as signed 32-bit): row 418, against the interpreter. Home 2, an XXX walk test in ProjectFortress/tests/, is owed; rung D owns that directory in this batch.
- F5, the silent form found in this judgement (walk reads Box[\4294967296\] as Box[\0\], exit 0): the same defect and the same row 418, with the same home 2 owed. The row text must be amended (second required correction). Captures: probes/skeptic/differential-6.txt, differential-5.txt:3-34, differential-4.txt:189-216.
- F6 (walk fails a size-generic method overloaded in a singleton object with 'Missing type s'): a note on row 21.
- Row 419 (a parallel task ignores its free static parameters, for types as for sizes): home 2, compiler_tests/XXXNatRtTask.fss with XXXNatRtTask.test and NatRtTaskLink.test. Expected failure confirmed in my run at junit-second.txt:324-338; shown red on a local fix at probes/xxx-task-red-demo.txt:15.
- Row 420 (a generic method of a generic object that builds instances over both parameters fails compiled): home 2, compiler_tests/XXXNatRtMethBoth.fss with XXXNatRtMethBoth.test and NatRtMethBothLink.test. Expected failure confirmed at junit-second.txt:347-361 (j$RTTIc: the size half fails first). Not shown red, because no fix is known.

## Required corrections

- The FACTS entry amendment's clause 'an object's or trait's method ... (compiler_tests/NatRtClosure)' is not established by NatRtClosure, which has no trait. Do one of two things before landing. Either add to NatRtClosure.fss an assertion for a closure in a trait's default method reading k (ZrTraitClosure's viaFn gives 4 and sumK gives 6 for Arr[\4\], citing trait-parameters.tex:82-90) and re-run it. Or change the clause to 'an object's method (compiler_tests/NatRtClosure) and a trait's default method (compile-ladder/rung-size-runtime/probes/differential-repair-own.txt:84-106)'. Row 307's amendment already says only 'an object's method' and needs no change.
- Amend row 418, walk reading a nat static argument as a signed 32-bit integer, so that it states the silent form as well as the loud one. Proposed text: 'The truncation is silent when the low 32 bits are nonnegative: walk reads Box[\4294967296\]'s size as 0 and Box[\4294967299\]'s as 3, types Box[\4294967296\] as Box[\0\] in a typecase, and refuses g(Box[\0\]) beside g(Box[\4294967296\]) as a duplicate overloading, all with no run-time error; the compiled run gives 4294967296, 4294967299 and "not zero" (compile-ladder/rung-size-runtime/probes/skeptic/ZtWalkZero.fss, ZtWalkWrap.fss, ZtBig64Val.fss; captures probes/skeptic/differential-6.txt, differential-5.txt:3-34, differential-4.txt:189-216).' Add those three probes and captures to the row's probe cell.
- Compose explorations/compile-ladder/rung-size-runtime/REPORT.md and record.md from the two rounds' structured results, with the repair round's amendments applied. The one comment line of each of the rung's new test files (NatRtClosure.fss, NatRtBigSize.fss, XXXNatRtTask.fss and XXXNatRtMethBoth.fss among them) points at REPORT.md, which does not yet exist on the branch.

## Recommended rows

None.

# First judgement: refused

## The refusal

The two value-position defects this skeptic measured have no home, and the three-homes rule needs a home for each before approval. (1) A size symbol is not a free static parameter of a closure. CodeGen.forFnExpr makes a closure class generic only over FreeVarTypes (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3449, :3469-3475), which collects VarType nodes only (FreeVarTypes.java:98). So inside a for-loop body, a comprehension or a fn expression of a size-generic function, three things fail compiled while walk runs them: a size read as a value dies with NoClassDefFoundError: CONST (ZsVLa, ZsVLc, ZsVLe); a captured value of a sized type dies with NoSuchMethodError on the closure's <init>(Box⟦3⟧) (ZsVLf); and a sized type constructed there dies with NoClassDefFoundError: k$RTTIc (ZsVLg). The type twins of the last two run (ZsVLfT, ZsVLgT). (2) A size of 2^31 or more in value position dies at load with NumberFormatException: CodeGen.java:6004 emits CONST.Nat as ()I and then FIntLiteral.make(int), and MethodInstantiater.java:224-227 uses Integer.parseInt. The precedent the rung cites, forIntLiteralExpr, has int, long and String branches since row 317 (CodeGen.java:3875-3910). Specification/basic/trait-parameters.tex:82-90 settles both: a nat parameter may appear in any context an ℕ32 variable can, and may instantiate other nat parameters. The repair round gives each defect home 1 (repaired, with an assertion in a gated NatRt test, preferred) or home 2 (an XXX test asserting walk's answers, plus a ledger row), and narrows the FACTS entry and row 307's note to what then holds.

## Summary

Refused, first judgement. SKEPTIC.md was not written because the subagent harness tells subagents not to write report .md files. Following the brief's fallback, its text is carried in this result for the gather to compose. The probes and captures are committed as 2492fca0b on wip/rung-size-runtime and pushed; the tracked-path check over every path cited here printed nothing.

The rung's own claims hold wherever I checked them:
- The five-line provenance block: every file:line opened says what the block says.
- The recorded failures exist: probes/junit-before-pair.txt:14 is NoClassDefFoundError 3$RTTIc at 6030e4b36.
- Every gated verdict matches on my own harness run (probes/skeptic/junit-rung-tests.txt, including RTTIsizeJUTest, 6 tests OK).
- The checker count table reads 125, the rung declares 125, and the manifest predicted 125.
- 20 of my own programs agree between walk and the compiled run at both thread counts: nested and two-symbol dispatch, extends clauses with swapped and nested sizes, int kind, size 0, Box[\03\] as Box[\3\], value position outside closures, and no false value-position hit on IntLiteral-typed variables.

Two defects in the rung's own value-position piece have no home:
- **Closures:** a size symbol is not a free static parameter of a closure. Loop bodies, comprehensions and fn expressions in a size-generic function fail compiled where walk runs them and the type twins run.
- **Large sizes:** a size of 2^31 or more in value position dies at load. The rung copied one of forIntLiteralExpr's three branches.

Both are rule-2 misses, and the specification settles both (trait-parameters.tex:82-90).

I also measured a defect that predates the rung, in the team's class loader. The first load of a generic arm's closure class races on two threads: 5 of 5 runs fail at FORTRESS_THREADS=4 and none at 1, for types and sizes alike. It is a recommended row, not a refusal. No stop was met.

## Findings

- 0. SKEPTIC.md was not written: the subagent harness tells subagents not to write report .md files, and the brief's fallback is to carry the text in the structured result. The gather composes SKEPTIC.md from this result. Probes and captures are committed as 2492fca0b under explorations/compile-ladder/rung-size-runtime/probes/skeptic/ and pushed. The tracked-path check over every path cited here printed nothing.
- 1. Provenance block (the worker's summary carries it, since REPORT.md was refused). Every cited file:line was opened.
  - problem: probes/junit-before-pair.txt:14 is 'Caused by: java.lang.NoClassDefFoundError: 3$RTTIc'. OverloadSet.java:1199 at 6030e4b36 throws 'Only handling some static args of generic types'. CodeGen.java:5793 at 6030e4b36 throws 'Only emitting RTTI for types right now'. junit-before.txt:49 and :193 carry those two errors. Ledger row 402 is at explorations/fortress-gap-ledger.md:413.
  - spec: trait-parameters.tex:82-90, overloading.tex:170-175, :262-276 and :100-107, types-vals-vars.tex:184-189, POSITIONS.md:146, types.tick:355-360 and :361-368, objects.tex:198-206. All are prose or decisions, none an api rendering.
  - precedent: InstantiatingClassloader.java:2744-2752 (the DICTIONARY get/new/put comment), RttiTupleMap.java:114-117 (putIfNew), CodeGen.java:5691-5694 (the static-parameter field load), OverloadSet.java:1514-1540 (the second-invariant-occurrence check), MethodInstantiater.java:222-223 (the String op), TypeAnalyzer.scala:462 (the STypeArg case), Transaction.java:31 (the AtomicInteger counter), size-factory.patch:1.
  - historical: names all six 2012-tree files the diff edits (MethodInstantiater, Naming, CodeGen, OverloadSet, RTTI, TypeAnalyzer.scala).
  No defect in the block.
- 2. The recorded failure exists and predates each piece: junit-before-pair.txt:12-14, junit-before.txt (:7, :49, :100, :193, :380, :399), junit-before-ambig.txt:5, junit-before-methsym.txt:8, jutest-before-hash.txt:12 ('expected:<17> but was:<1>'), jutest-before-serial.txt and sn-race-before.txt:13 (7,638 shared).
- 3. My own harness run of every gated .test the rung adds or renames matches the rung's verdicts (probes/skeptic/junit-rung-tests.txt, at the gate's one thread, on the build of 57dac1278):
  - the 15 NatRt* tests and NatExcludeOverload: OK (3 tests) each;
  - XXXNatExcludeChecker and XXXNatAmbigChecker: 'Saw expected failure';
  - the promoted NatArgRungS: prints Vec[\3\] and PASS; NatDispArmChecker and NatOverrideChecker: OK;
  - XXXNatBoundDisp: 'OK Saw expected exception';
  - XXXTypeBoundDisp and XXXNatExtendsTwice: 'Saw expected failure', with TypeBoundDispLink and NatExtendsTwiceLink OK;
  - RTTIsizeJUTest: OK (6 tests).
  The red-on-fix demonstration for the first new XXX files is in probes/xxx-red-demo.txt: 'Saw failure, but did not satisfy compile_exception_contains' and 'Did not see expected failure'.
- 4. The diff, read line by line against the report: it does what the report says and is small.
  - cP's new case uses rung N's pEqv on sizes (TypeAnalyzer.scala:353-360) under the file's negate convention (:787-798), so two different literals exclude and anything else does not.
  - The narrowed form refuses the ambiguous pair (XXXNatAmbigChecker). It accepts nothing I could find that rung S's rule refuses: ZsDupSize, with Tg[\3\] and Tg[\03\], is refused; ZsExclAncBad, an object extending two traits over Tg[\3\] and Tg[\4\], is refused.
  - Box[\03\] and Box[\3\] are one descriptor on both paths, because NamingCzar.forIntBase renders the BigInteger (NamingCzar.java:1890-1891).
  - Negative sizes stay unreachable (the worker's SzIntNegLit is a syntax error on both paths).
  - isSizeInValuePosition produced no false hit on IntLiteral-typed top-level, destructured or plain locals (ZsFieldLit2).
  - SizeLiteralStructure ignores value_cast, which is reachable only for a top-level value and never for a size.
- 5. F1, the refusal. A size symbol is not a free static parameter of a closure. CodeGen.forFnExpr makes the closure class generic over fvt.freeVarTypes(x) only (CodeGen.java:3449, :3469-3475), and FreeVarTypes collects VarType nodes only (FreeVarTypes.java:98). So a for-loop body, a comprehension or a fn expression inside a size-generic function is compiled as a non-generic class:
  - a size read as a value there keeps its CONST.Nat⟦k⟧ call, which is never substituted, and dies with NoClassDefFoundError: CONST (ZsVLa, ZsVLc, ZsVLe);
  - a captured value of a sized type dies with NoSuchMethodError on <init>(Box⟦3⟧) (ZsVLf);
  - a sized type constructed there dies with NoClassDefFoundError: k$RTTIc (ZsVLg).
  Walk runs all five, and the type twins ZsVLfT and ZsVLgT run compiled. The specification settles it against the compiled run: trait-parameters.tex:82-90 lets a nat parameter appear anywhere an ℕ32 variable can and instantiate other nat parameters. This is outcome 1, repair. It is also the eighth site of the 'static arguments are types only' defect: the rung's precedent search counted seven (six throwing sites plus isSymbolic) and missed this one. The dispatcher piece already has the shape a repair can reuse, a size symbol made a VarType (OverloadSet.java:1221-1224). The message 'NoClassDefFoundError: CONST' names no size, so the next person to meet it will not know where to look. FreeVarTypes' other caller, the task path (CodeGen.java:1633), is already a team TODO for types ('if fvts non-empty, will need to make a generic task'); it is not counted against the rung.
- 6. F2. A size of 2^31 or more in value position dies at load: 'NumberFormatException: For input string: "3000000000"' (ZsBigNat, compiled, both thread counts). CodeGen.java:6004 emits CONST.Nat as ()I followed by FIntLiteral.make(int), and MethodInstantiater.java:224-227 uses Integer.parseInt. The precedent the rung cites is forIntLiteralExpr, but only its int branch (CodeGen.java:3886-3890). The whole method (CodeGen.java:3875-3910) has int, long and String branches, because row 317 was repaired there, and FIntLiteral.make(long) exists (FIntLiteral.java:44). This is the rule-2 miss the brief warns of: a precedent that repaired a defect, and the defect recurring at the new site. By trait-parameters.tex:84-85 a nat parameter appears where an ℕ32 variable can, so 3000000000 is a nat. The prose names ℕ32 without spelling its range; I read the range from the type's name, and I say so here. Type position is fine compiled (ZsBigNatType prints big, other). Walk fails both forms, 'Negative nats are unNATural: -1294967296' (EvalType.java:252-256), an interpreter row.
- 7. F3, not the rung's defect. The compiled run's first load of an instantiated closure class races between threads. InstantiatingClassloader.loadClass puts the name into history before defining the class (InstantiatingClassloader.java:204). A second thread that finds the name there returns findLoadedClass(name) (:182-186), which is null until the first thread has defined it, and nothing holds a lock. RTHelpers.loadClosureClass then calls newInstance on null (RTHelpers.java:133-138). A parallel loop dispatching a generic arm over eight instantiations fails 5 of 5 runs at FORTRESS_THREADS=4 and none of 5 at 1, for a type-generic arm (ZsThreadsT) exactly as for a size-generic arm (ZsThreadsS, ZsThreads). The same loop through literal leaves only, where RTTIsize.of is first reached on four threads, is right 5 of 5 (ZsThreadsLit), so the rung's table itself holds. The worker's SzTwoThreads, one do/also with two threads, did not show this race. Recommended row.
- 8. Divergences found, with their outcomes under rule 4:
  - ZsVL*: the specification settles against the compiled run; F1, repair.
  - ZsBigNat: settled against both paths; F2 plus an interpreter row.
  - ZsBigNatType: compiled right, walk wrong; interpreter row.
  - ZsMethDisp: compiled right by overloading.tex:170-175 and :262-276; walk's 'Missing type s' is row 21's family, a note.
  - ZsSymArg: compiled right; walk is row 157 (already on the ledger).
  - ZsExclAnc and ZsExclAncBad: rung S's rule favours the compiled run; walk's side is the worker's provisional interpreter row and row 371.
  - ZsCaseVal*: row 340's shape, not new.
  - ZsJuxt: a String-juxtaposition difference between the two libraries, no size involved; the prose is silent (Specification/basic/operators/juxtameaning.tex has no String case), so it is home 3.
- 9. Precedent search. The factory, extends, dispatcher, CONST and cP precedents are the right ones and correctly followed. Two gaps: the site count misses FreeVarTypes (item 5), and the value-position emitter copies one of forIntLiteralExpr's three branches (item 6). The same defect's other sites are otherwise counted, with numbers: six throwing sites at 6030e4b36, plus isSymbolic.
- 10. Competing declarations, re-run by me. Each new Java name (RTTIsize, sizeReference, isSizeLiteral, SizeLiteralStructure, SIZE_RTTI_CONTAINER_TYPE, SIZE_RTTI_FACTORY, natMethod, isSizeInValuePosition) is declared once in src/com/sun/fortress/ as a whole; the other hits are uses. Each new or renamed component name is declared exactly once across compiler_tests/, tests/, library_tests/, Library/ and LibraryBuiltin/.
- 11. The tests: each new .fss carries exactly one comment line, pointing at explorations/compile-ladder/rung-size-runtime/REPORT.md. That file does not exist until the gather writes it.
- 12. The record. The FACTS entries it amends exist under the titles given (FACTS.md:18, :20, :35, :36, :38, :46), and rows 214, 307, 340, 371, 400 and 402 exist; nothing is renumbered. Row 400's re-measure is right (probes/row400-after.txt). Three things overclaim or are missing, as the record stands:
  - the FACTS entry says 'a size read as a value is CONST.Nat substituted at load' and 'a sized program loads, dispatches and runs compiled';
  - row 307's note says 'value-position size compile and run'. Both hold only outside closures and below 2^31;
  - the entry's 'Open:' list lacks the loader race.
- 13. The count table. probes/checker-count-after.txt has #total 125, crash none, shadow matching. It is byte-identical in its table to climb-batch-4/gate/checker-count.txt. The rung declares 125 and the manifest's expectedCheckerCount predicts 125. No mismatch.
- 14. The homes of the worker's own defects:
  - D1: home 1, XXXNatAmbigChecker, passing in my run.
  - D2: home 1, NatRtMethSym, passing in my run.
  - D3: home 2, XXXNatBoundDisp and XXXTypeBoundDisp with TypeBoundDispLink; the XXX names and the .test files are checked, the files are expected to fail, and they go red on the fix.
  - D4: home 2, XXXNatExtendsTwice with NatExtendsTwiceLink; checked.
  - D5, D6 and D7: home 1, in RTTIsizeJUTest, passing in my run.
  - Row 400: home 3; the row cites its captures and gives the specification's silence on the uninstantiated size.
  - The walk overload row: home 2 is owed and not writable in this batch, because D owns tests/. The worker says so, and the gather must carry it.
- 15. No stop met. No stop file is touched. No gated verdict changes except the three promotions with their reasons. The ladder has 85 of 85 unmoved (probes/ladder-compare-after.txt). No library declaration is newly refused (probes/perdecl-fates.txt, before and after identical but for one crash-site line number). No checker rule was found that accepts a program rung S's rule refuses.

## Differentials run

- ZsLeadZero (Box[\03\] against a literal leaf Box[\3\], and inference). Walk T1/T4: three 3 three. Compiled T1/T4: three 3 three. Agree; one descriptor per number (NamingCzar.java:1890-1891 takes the BigInteger). differential-1.txt:226-248
- ZsBigNat (value position of sizes 2147483647 and 3000000000). Walk T1/T4: prints 2147483647, then ProgramError 'Negative nats are unNATural: -1294967296'. Compiled T1/T4: prints 2147483647, then NumberFormatException: For input string: "3000000000" at load. Both are wrong by trait-parameters.tex:84-85 (a nat parameter appears where an ℕ32 variable can). The compiled failure is this rung's defect F2; walk's is a recommended row. differential-1.txt:2-34
- ZsBigNatType (literal leaf 3000000000 in type position only). Walk T1/T4: the same unNATural error. Compiled T1/T4: big, other. Compiled right, walk wrong (recommended row). differential-1.txt:35-63
- ZsNested (literal leaves and a size symbol nested in a type argument, dispatched through Any). Walk T1/T4 and compiled T1/T4: v3in2 v4in2 other 3 4 -1. Agree. differential-1.txt:288-322
- ZsTwoSyms (two size symbols in two parameters, dispatched, including a Vec[\ZZ64,4\] miss). Walk and compiled, both columns: 34 43 33 -1. Agree. differential-1.txt:342-368
- ZsZero (literal leaves 0 and 10, value position). Walk and compiled, both columns: zero ten other 0 10. Agree. differential-1.txt:471-501
- ZsIntKind (an int-kind parameter, inferred and dispatched). Walk and compiled, both columns: 5 7 -100. Agree. differential-1.txt:203-225
- ZsMethDisp (method overloads in a singleton object: literal leaves, and a size-generic method beside an Any arm). Compiled T1/T4: m3 m4 mother 3 4 -1. Walk T1/T4: ProgramError 'Missing type s'. Compiled right by overloading.tex:170-175 and :262-276; walk is in row 21's family (walk cannot infer a generic method's static argument), a note. differential-1.txt:249-287
- ZsExtNested (a size symbol nested in an extends clause's type argument, Holder[\Vec[\ZZ32,s\]\], and a nested literal; typecase and dispatch). Walk and compiled, both columns: h3 h4 h3 g3 gother. Agree. differential-1.txt:99-129
- ZsExtSwap (extends Pair[\b, a\] with swapped size symbols, and trait-extends-trait with a size, dispatched). Walk and compiled, both columns: 2 1 p21 s3 s4 7. Agree. differential-2.txt:176-210
- ZsGenTraitMeth2 (a size read in a trait's default methods through extends, including a two-size object extending one sized trait; typecase). Walk and compiled, both columns: 5 60 2 7 three four other. Agree. differential-2.txt:41-79. Its first form ZsGenTraitMeth returned a typecase coerced from IntLiteral and hit row 340 (differential-1.txt:158-202).
- ZsValArith (value position: arithmetic, comparison, argument to a ZZ32 function, juxtaposed with a String). Compiled T1/T4: 10 / k is 3 / k is not 3 / k= 5 / 12. Walk T1/T4: the same, except k=5. The one difference is String juxtaposition spacing, which ZsJuxt shows without any size. differential-1.txt:369-399
- ZsValField (a size read in a field initializer). Walk and compiled, both columns: 4 10. Agree. differential-1.txt:426-444
- ZsFieldLit2 (checks isSizeInValuePosition for a false positive: a top-level IntLiteral variable, destructured locals, a plain local). Walk and compiled, both columns: 6 7 7 9. Agree, so no false hit. differential-2.txt:80-106. Its first form ZsFieldLit is refused by the checker for an untyped field, which is my probe's mistake (differential-1.txt:130-157).
- ZsSymArg (a size symbol as a generic function's static argument, a constructor with a symbol then dispatch, a trait's generic method). Compiled T1/T4: 6 three other 4. Walk T1/T4: prints 6, then row 157's InterpreterBug (Any as a nat-generic function's return type). Compiled right. differential-2.txt:211-247
- ZsVLa (a size read in a SUM comprehension's body in a size-generic function). Walk T1/T4: 10. Compiled T1/T4: NoClassDefFoundError: CONST. The specification settles it for walk (trait-parameters.tex:82-90); defect F1. differential-3.txt:2-26
- ZsVLb (a size in a for loop's range, outside the closure). Walk and compiled, both columns: 1000. Agree. differential-3.txt:27-41
- ZsVLc (a size read in a for-loop body). Walk T1/T4: 21. Compiled T1/T4: NoClassDefFoundError: CONST. F1. differential-3.txt:42-62
- ZsVLd (a size in a while loop, no closure). Walk and compiled, both columns: 9. Agree. differential-3.txt:63-77
- ZsVLe (a size read in a fn expression). Walk T1/T4: 3. Compiled T1/T4: NoClassDefFoundError: CONST. F1. differential-3.txt:78-102
- ZsVLf (a fn expression capturing a Box[\k\] value in a size-generic function). Walk T1/T4: 10. Compiled T1/T4: NoSuchMethodError 'ZsVLf$fn.<init>(ZsVLf$Box⟦3⟧)'. F1. Its type twin ZsVLfT prints 10 on both paths at both counts. differential-3.txt:103-134
- ZsVLg (Box[\k\] constructed in a for-loop body of a size-generic function). Walk T1/T4: three four. Compiled T1/T4: NoClassDefFoundError: k$RTTIc. F1. Its type twin ZsVLgT prints zz32 string on both paths at both counts. differential-3.txt:135-181
- ZsThreads and ZsThreadsS (a parallel for loop first-reaching eight sizes through a size-generic dispatched arm, sums kept atomically). Walk T1/T4: 3600 (and 100000). Compiled T1: 5 of 5 correct. Compiled T4: 5 of 5 fail with NullPointerException 'cl is null' at RTHelpers.loadClosureClass (RTHelpers.java:138), and once with LinkageError 'attempted duplicate class definition'. The type twin ZsThreadsT behaves identically: T1 5 of 5 give 3600, T4 5 of 5 give the NPE. So this is the team's loader race, not the rung's, and a recommended row. threads-repeat.txt; differential-1.txt:323-341
- ZsThreadsLit (the same parallel loop through literal leaves only, so RTTIsize.of is first reached on four threads, with no generic arm). Compiled T1: 5 of 5 give 100000; compiled T4: 5 of 5 give 100000. Walk was not run for this program; its answer is fixed by arithmetic. threads-repeat-lit.txt
- ZsExclAnc (overloads on traits A and B that extend Tg[\3\] and Tg[\4\]). Compiled T1/T4: A B. Walk T1/T4: refuses, 'first parameters x:[B] and x:[A] are unrelated'. Rung S's rule favours the compiled run; walk's side is the worker's provisional interpreter row (walk applies no instantiation exclusion). differential-2.txt:248-278
- ZsExclAncBad (object C extends { A, B }). Compiled: refused, 'Types A and B exclude each other'. Walk T1/T4: REACHED. S's rule favours the compiled run; walk's side is row 371. differential-2.txt:279-308
- ZsDupSize (g(b: Tg[\3\]) beside g(b: Tg[\03\])). Both paths refuse the pair as identical parameter types. Agree; the checker accepts nothing S refuses here. differential-2.txt:309-348
- ZsCaseVal and ZsCaseVal2 (a size read in a typecase clause of a size-generic function). Compiled: 'Error trying to close method scope', row 340's shape (a typecase value coerced from IntLiteral), including when bound to a local first. Walk: 3 -1, and size 3 / not size 4 / 3 / -1. This is row 340, not new. differential-1.txt:64-98; differential-2.txt:2-40
- ZsJuxt (a String juxtaposed with a literal and with a ZZ32 variable, no size needed). Compiled T1/T4: lit= 5, zz32= 5, k= 5. Walk T1/T4: lit=5, zz32=5, k=5. This is the two libraries' String juxtaposition, not sizes (CompilerBuiltin.fss:406 is self ||| b; FortressLibrary.fss:4062 is self || b); recommended row. differential-2.txt:107-129
- ZsValClosure and ZsValLoop (first forms). They stop at 'Can't compile LetFn' and 'Can't compile AtomicExpr', which are compiler gaps unrelated to sizes; they were rewritten as ZsVL*. differential-1.txt:400-425, :445-470

## Thread counts

Every differential ran at FORTRESS_THREADS=1 and =4 (a command-line prefix overriding env.sh), because the manifest sets writesState: RTTIsize.of writes a table any thread may reach. Each program was compiled once, then run compiled and under walk at both counts (probes/skeptic/sk-diff.sh; captures differential-1.txt, differential-2.txt, differential-3.txt). The parallel first-reach probes were also run five times at each count (probes/skeptic/sk-repeat.sh; threads-repeat.txt for ZsThreadsT, ZsThreadsS and ZsThreads; threads-repeat-lit.txt for ZsThreadsLit). A disagreement between the two columns is how the loader race showed itself. The harness run of the rung's own .test files was at the gate's one thread (env.sh). Machine, from the captures: nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 1.14 to 4.68 across the runs (each capture's machine line gives its own); JDK 25. No timing is claimed.

## Loud to quiet

Yes, by design, and the values are right wherever I probed them outside closures.

What became quiet:
- **The overloading refusal.** 'Invalid overloading of g' for g(Tg[\3\]) beside g(Tg[\4\]) became acceptance, and the compiled run prints 3 and 4 (NatExcludeOverload). That is rung S's rule.
- **The code-generation stops and load failures.** CompilerError 'Only handling some static args of generic types' and 'Only emitting RTTI for types right now', NoClassDefFoundError <n>$RTTIc, NoClassDefFoundError <C>$n and NumberFormatException "k" became computed values:
  - the size's RTTIsize descriptor, whose className is the literal's text and which is a supertype only of an equal size;
  - dispatch answers;
  - an FIntLiteral of the size.
  They match walk on ZsNested, ZsTwoSyms, ZsZero, ZsLeadZero, ZsExtSwap, ZsExtNested, ZsGenTraitMeth2, ZsValArith, ZsValField and ZsIntKind at both thread counts.
- **The dispatcher's bound check for nat and int parameters** is now skipped silently. At the base it was unreachable, because the build threw earlier. The specification gives a size no type bound (trait-parameters.tex:68-90).

What stays loud, with messages that mislead:
- a size read inside a closure: NoClassDefFoundError: CONST, which names no size;
- a size of 2^31 or more: NumberFormatException;
- row 400's uninstantiated arm: NumberFormatException "n".

No quiet wrong value was found. Box[\03\] is Box[\3\] on both paths.

## Defect homes

- F1, a size symbol is not a free static parameter of a closure (ZsVLa, ZsVLc, ZsVLe, ZsVLf, ZsVLg; differential-3.txt): no home yet, and this is the refusal. Owed as home 1 (the repair, with assertions in a gated NatRt test covering a for-loop body, a comprehension and a fn expression that read, capture and construct a size; preferred), or as home 2 (an XXX test per shape asserting walk's answers, citing trait-parameters.tex:82-90, plus a ledger row).
- F2, a size of 2^31 or more in value position dies at load with NumberFormatException (ZsBigNat; differential-1.txt:2-34): no home yet. Owed as home 1 (the long branch of forIntLiteralExpr, with an assertion that Box[\3000000000\]'s size reads 3000000000; preferred), or as home 2 (an XXX test plus a ledger row).
- F3, the first load of an instantiated closure class races on two threads (ZsThreadsT, ZsThreadsS, ZsThreads; threads-repeat.txt). It predates the rung and is not its defect: recommended row, probes committed. The specification settles it, but no XXX test can hold it, because the gate runs at one thread, where the program passes; a plain test in AtomicTopLevelVar's form would guard it only in a four-thread run.
- F4, String juxtaposition renders 'lit= 5' compiled and 'lit=5' under walk (ZsJuxt; differential-2.txt:107-129): home 3, because the prose is silent on String juxtaposition. The probe and its capture are committed; recommended row.
- F5, walk reads a nat static argument as a signed 32-bit integer (ZsBigNat, ZsBigNatType): an interpreter defect the specification settles. Recommended row; its home 2 would be an XXX walk test in ProjectFortress/tests/, which is D's directory in this batch.
- F6, walk fails a size-generic method overloaded in a singleton object with 'Missing type s' (ZsMethDisp; differential-1.txt:249-287): a note on row 21, same family, no new row.
- ZsSymArg under walk is row 157, already on the ledger. ZsCaseVal and ZsCaseVal2 compiled are row 340, already on the ledger.

## Required corrections

- Give F2 a home in the repair round. The preferred repair is value position emitting CONST.Nat as ()J with FIntLiteral.make(long), the l <= 63 branch of CodeGen.forIntLiteralExpr (CodeGen.java:3891-3899), with MethodInstantiater parsing a long, and an assertion that a Box[\3000000000\] size reads 3000000000 in a gated NatRt test. Otherwise, an XXX test and a ledger row.
- The FACTS entry and the row-307 note state only what holds after the repair round. If F1 or F2 is deferred, say 'outside closures' or 'below 2^31' in the entry and in the note, and name each deferred defect's row. In every case, add to the entry's 'Open:' list the loader race row (F3) and the walk big-nat row (F5), under whatever numbers the gather gives them.
- The precedent-search count names FreeVarTypes (CodeGen.java:3449, :3469-3475; FreeVarTypes.java:98) as the eighth 'static arguments are types only' site, and forIntLiteralExpr's three branches (CodeGen.java:3875-3910) as the precedent value position must follow.
- The gather composes REPORT.md and record.md from the worker's result and SKEPTIC.md from this one. Every new test's one comment line points at REPORT.md, which does not exist until then.
- The gather carries the worker's walk-exclusion row (416), whose home 2 test is owed and not written because D owns ProjectFortress/tests/ in this batch.

## Recommended rows

- **The compiled run's first load of an instantiated closure class is not safe on two threads.**
  - The fault: InstantiatingClassloader.loadClass adds the name to history before it defines the class (ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:204). A second thread that finds the name there returns findLoadedClass(name) (:182-186), which is null until the first thread has defined it, and no lock is held. RTHelpers.loadClosureClass then dies with NullPointerException 'cl is null' (ProjectFortress/src/com/sun/fortress/runtimeSystem/RTHelpers.java:133-138), or both threads define the class and one dies with LinkageError 'attempted duplicate class definition'.
  - The measurement: a parallel for loop dispatching a generic arm over eight instantiations fails 5 of 5 runs at FORTRESS_THREADS=4 and passes 5 of 5 at 1. A type-generic arm and a size-generic arm fail alike. Walk prints 3600 at both thread counts.
  - Status: NEGATIVE-VERIFIED. Class: run time, concurrency.
  - Specification: the answer of a correct program cannot depend on the thread count; dispatch is Specification/basic/overloading.tex:262-276.
  - Reproducers: explorations/compile-ladder/rung-size-runtime/probes/skeptic/ZsThreadsT.fss, ZsThreadsS.fss and ZsThreads.fss; captures threads-repeat.txt and differential-1.txt:323-341; the literal-leaf control ZsThreadsLit (threads-repeat-lit.txt) is right 5 of 5 at both counts.
  - Found by: climb batch 5 rung Z's skeptic.
  - Fix: take a lock around the first load (the loader's own lock, or a per-name lock with registerAsParallelCapable), and add the name to history only after defineClass.
  - No XXX test is possible, because the gate runs at one thread, where the program passes.
  Probe that establishes it: sk-repeat.sh ZsThreadsT 5.
- **Walk reads a nat static argument as a signed 32-bit integer.**
  - The fault: Box[\3000000000\] fails with 'Negative nats are unNATural: -1294967296' (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:252-256), in type position and in value position, where the compiled run dispatches on it (big, other).
  - Status: NEGATIVE-VERIFIED. Class: implementation gap (interpreter).
  - Specification: Specification/basic/trait-parameters.tex:84-85 (a nat parameter appears where an ℕ32 variable can).
  - Reproducers: explorations/compile-ladder/rung-size-runtime/probes/skeptic/ZsBigNat.fss and ZsBigNatType.fss; capture differential-1.txt:2-63.
  - Found by: climb batch 5 rung Z's skeptic.
  - Home 2 is an XXX walk test in ProjectFortress/tests/, owed once D no longer owns that directory.
  Probe that establishes it: sk-diff.sh ZsBigNatType.
- **The two libraries render a String juxtaposed with a non-String differently.**
  - The fault: the compiled run inserts a space, 'lit= 5' (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:406, self ||| b); walk does not, 'lit=5' (Library/FortressLibrary.fss:4062, self || b). It shows for literals, ZZ32 variables and sizes alike.
  - Status: NEGATIVE-VERIFIED. Class: library divergence.
  - Specification: silent in the prose; Specification/basic/operators/juxtameaning.tex has no String case, so home 3.
  - Reproducer: explorations/compile-ladder/rung-size-runtime/probes/skeptic/ZsJuxt.fss; capture differential-2.txt:107-129.
  - Found by: climb batch 5 rung Z's skeptic.
  - The switch-over to one library settles it. The gather first checks that no row already records it.
  Probe that establishes it: sk-diff.sh ZsJuxt.
- Note on row 21: 'Climb batch 5 rung Z's skeptic: walk also fails a size-generic method overloaded beside an Any method in a singleton object, at its declaration, with Missing type s (compile-ladder/rung-size-runtime/probes/skeptic/ZsMethDisp.fss, differential-1.txt:249-287), where the compiled run dispatches m3 m4 mother 3 4 -1.' Probe that establishes it: sk-diff.sh ZsMethDisp.
- If the repair round defers F1 or F2 rather than repairing it, open one row each.
  - **F1:** a size symbol is not a free static parameter of a closure (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3449, :3469-3475; FreeVarTypes.java:98), so a closure in a size-generic function fails compiled: NoClassDefFoundError: CONST, NoSuchMethodError <init>(Box⟦3⟧), NoClassDefFoundError: k$RTTIc. Probes ZsVLa, ZsVLc, ZsVLe, ZsVLf and ZsVLg, with the type twins ZsVLfT and ZsVLgT; capture differential-3.txt. Specification: trait-parameters.tex:82-90.
  - **F2:** a size of 2^31 or more in value position dies at load. Probe ZsBigNat; capture differential-1.txt:2-34.
  Probe that establishes them: sk-diff.sh 'ZsVLa ZsVLc ZsVLe ZsVLf ZsVLfT ZsVLg ZsVLgT ZsBigNat'.
