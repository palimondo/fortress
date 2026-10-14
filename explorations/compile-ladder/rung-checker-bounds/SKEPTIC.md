# Climb batch 15, rung C (rung-checker-bounds): the skeptic's verdict

Verdict: **approved**, with corrections and no contested fix. The worker's head was `e75bb538b`. My commits add tests and correct the record. They change no code, so the report's count and distance tables stay those of the worker's head. I ran no count or distance stage, and no suite. The gate's tables on the merged tree are the record.

The change is the checker probe's two patches in `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`, applied unchanged:

- `normConjunct` (`:708-735`): a closed trait is expanded only against a conjunct that names no variable.
- `pSubInner` (`:165-180`): two cases come before the union rule.

The change does what the report says: rows 686, 687, 689 and 690 and 711 are repaired. Row 680's line was held by the record's own rule, and `impls/Decls.scala` is back at the base's text.

My programs found four things that the record did not hold:

1. Row 686's claim has a face that stays refused (712). It is a ground second bound with a `Box[\T\]` argument, and in it the checker still builds a union that holds the type variable. So the sentence "the change keeps every union the checker builds free of variables" is false as a general statement.
2. An overloading verdict moves, from accepted to refused (713). Appendix I lists the question behind it as not settled.
3. Four faces that the change repairs had no test.
4. One older defect (714) now refuses where the base used to crash.

Each of them now has a test and, where it needs one, a row in record.md.

## 1. What I checked

**The tables (check 1).** I read the worker's files, and the report's tables match them.

- Count, final code:

      explorations/coordinator/tools/checker-count/run.sh ... (the worker's run 3, 11:31:55Z)
      #total	1
      #crash	none
      # seconds 378

  The table is the same as `explorations/compile-ladder/climb-batch-14/gate/checker-count.txt`: `diff` prints nothing.
- Count, the whole component, with `body(i: I)` for that run only and row 680's line in (the worker's run 2, 11:13:23Z, load 3.13 at the start):

      #total	43
      #locations	40
      #crash	none
      # seconds 809

  Its 43 error headers match the 44 typecheck and wellformed sites of FortressLibrary in `explorations/compile-ladder/gate/distance-sites.tsv`, less `:2493`, line for line. None of the 43 is in `Array3` (`:2886-2999`).
- Distance:

      explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-14/gate/distance.txt <the worker's distance table>
      DISTANCE DOWN   54 -> 53 (-1)
          kind typecheck               41 -> 40     (-1)
          class OT                     15 -> 14     (-1)  other body errors (one-off library slips and checker limits)

  The per-site `diff` against `distance-sites.tsv` differs only in the `squaredNorm` row at `FortressLibrary.fss:2493`.
- Row 680's line was held by the record's rule ("If it prints no total or takes more than 690 s, do not land row 680's line", `explorations/coordinator/CLIMB-BATCH-15.md:154`), since 809 s > 690 s.

**Test first (check 2).** I checked this in the worker's transcript.

- The failing run, through `junit.sh base`, started 10:56:40Z and ended at 10:56:57Z. The first build of the edit (`ant compileAll`) started at 10:58:02Z. The run printed the lines that `recordedFailure` quotes and `Tests run: 30,  Failures: 18,  Errors: 0`.
- The worker's last change of code was the revert of row 680's line, built from 11:28:14Z. The passing run, `junit.sh final` at 11:31:06Z, printed `OK (30 tests)`.
- `ant testQuick` ran from 11:38:23Z on the same code:
  - `Tests run: 1190, Failures: 0`, `86, 0` and `263, 0`;
  - `BUILD SUCCESSFUL`;
  - `Total time: 14 minutes 53 seconds`.
- The four unit classes ran again at 12:20:42Z on the final code, each with `Failures: 0, Errors: 0`.

**The diff (check 3).**

- The two patches are byte for byte those in `explorations/perf-probes/checker-bound-defects/patches/`.
- The inference-variable case (`:168`) takes a union whole only where the check is not negated.
- The type-variable case (`:171-180`) reads the bound through `pNorm` under the same history entry as the general type-variable case (`:200-236`). When the history holds that entry, it falls back to the old split.
- The `normConjunct` guard uses `getVarTypes` and `hasInferenceVars` (`useful/STypesUtil.scala:2025`, `:808`), which walk the whole type.
- The comments follow the revival's style in this file (the sized-trait case at `:289-293`).

**The precedent (check 4).** The worker's search holds:

- Four places read a `comprises` clause, and only `normConjunct` builds a type from it.
- The bound is read through `pNorm` as the type-variable case reads it.
- `Thunker.scala:63-77` and `:103-116` prime functionals over the extended checker, as the held line would.

**The tests (check 5).**

- Each test file has one comment line.
- Each specification citation names a file and a section that say what the message says, with one exception: `XXXLocalFunctionRecursiveUntypedReturn` cited `type-inference.tex`, section "Type Inference for Components", for a refusal of cycles. That section does not state that refusal: it asks for inference over every elided type. The test is keyed on today's crash. I corrected the comment (section 4, commit `30af07104`).

**Names (check 10).** No test name that the rung or I added is declared elsewhere:

- in `ProjectFortress/` (`.fss`, `.fsi`, `.test`, `.java` and `.scala` files);
- on rungs B, L and O's branches.

**The specification (check 9).** No sentence is made false by the code change. I grepped `Specification/` for rows 680 and 686 to 690 and for the three crash messages. The only hit is the rationale of `revival-paramtype` (`appendices/changes.tex:3324-3329`), which is history.

The sentence nearest my 713 is in "Passages not yet revised" (`appendices/changes.tex:3639-3644`). It lists the question as not settled. It describes the compiled checker's exclusion where a forced static argument fails a bound. It says nothing about an exclusion through a `comprises` expansion over a variable, so it stays true.

**Threads.** The diff touches no mutable variable, field, `atomic` block or library state. My programs ran directly at `FORTRESS_THREADS=1`, and the harness runs at 4.

## 2. My programs, old code against new

Each program was run in three ways:

- under walk on the old code: `old-fortress.sh /home/user/fortress-base15 /home/user/fortress-bounds/tmp/old-caches P.fss`;
- compiled and run on the old code: `... compile P.fss`, then `... run P`;
- compiled and run on the rung's build: `bin/fortress compile P.fss`, then `bin/fortress run P`, in `/home/user/fortress-bounds`.

Walk is not changed by the rung.

| program (shape) | walk (old) | compiled, old | compiled, new |
|---|---|---|---|
| ground bound `{K, Q}`, numeral converted (`f(A, 1)`) | PASS | `** bug! Applied a substitution to an And and got an Or` | PASS |
| ground bound, Return Type Rule beside `f(x: K)` | PASS | `the return type of [\T extends K Q\]T->String ... should be a subtype of the` | PASS |
| caller `T extends {K, Q}`, `Box[\T\]` argument, callee bound `K` alone | n/a | `[\T extends K\]Box[\T\]->T is not applicable to an argument of type Box[\T\].` | compiles |
| caller and callee `{K, Q}`, `Box[\T\]` argument (row 686's ground face) | PASS | `... is not applicable to an argument of type Box[\T\].` | **the same refusal** |
| `h(C)` with `C` outside the second bound, F-bounded and ground | Unification error (refused at run time) | `** bug! Applied a substitution to an And and got an Or` | `[\T extends K Q\]T->T is not applicable to an argument of type C.` |
| `f[\T extends {K, R[\T\]}\](x: T)` beside `f(x: Z)`, `Z excludes {A, B}`, `C extends {K, Z}` | refused at load: `at least one pair of parameters must have excluding types` | PASS | **`Invalid overloading of f`** |
| the same with the ground bound `{K, Q}` | PASS | PASS | PASS |
| `mk[\T extends {K, Q}\](x: K): Box[\T\]`, `T` fixed by nothing | PASS | `** bug! ...And and got an Or` | PASS |
| `mk[\T extends {K, R[\T\]}\](x: K): Box[\T\]`, `T` fixed by nothing | Unification error | `** bug! ...And and got an Or` | `... is not applicable to an argument of type A.` |
| `mk[\T extends R[\T\]\](x: K): Box[\T\]` (control) | PASS | `... is not applicable to an argument of type A.` | the same |
| `z: A = h(A)` and `h(B)` at top level, ground bound | PASS | PASS | PASS |

**The ground face of row 686 stays refused, and the checker builds a union holding the variable.** I traced it on the new build:

    JAVA_FLAGS="... -Dfortress.debug.analyzer.subtype=true" bin/fortress compile SkGroundBoxMin.fss
    psub > (T, OR(AND(T,A),AND(T,B)), false), env=[T -> KindBinding(T,T extends K Q)][][]
     psub > (AND(OR(A,B),Q), OR(AND(T,A),AND(T,B)), false), env=...
     psub < (AND(OR(A,B),Q), OR(AND(T,A),AND(T,B)), false) RETURNS False
    psub < (T, OR(AND(T,A),AND(T,B)), false) RETURNS False

- The ground meet `K ∩ Q` is still expanded to `OR(A,B)`.
- The callee's variable has the upper bounds `T` and `OR(A,B)`.
- `pNorm` distributes their meet into `OR(AND(T,A),AND(T,B))` (`TypeAnalyzer.scala:696-699`), a union that holds `T`.
- `T` is not found below that union.

So the change keeps every union free of variables only over a bound that names the parameter. Row 686's claim ("a bound excluding one of its listed types") covers this face, and the brief and the probe both say that this face is still open. With the callee's bound `K` alone, the call checks.

I did not repair it, for two reasons:

- The section keeps the team's expansion for ground meets.
- A repair has to choose a new normal form for a meet of a variable with a union: drop a union conjunct that another conjunct is below before distributing, or stop expanding ground meets. No decision of the curator covers the analyzer's normal form (the probe's section 10).

It is 712, home 2 (section 4). The question is in forCurator.

**An overloading verdict moves.** The base accepted the `Z` pair because it expanded `K` against `R[\T\]` into meets with `A` and `B`, which `Z` excludes. The head keeps the meet as `K ∩ R[\T\]`. The type group's exclusion rule for an intersection (`Papers/Types/fig-exclusion.tick`, the logical rule for `S ∩ T`) finds that meet excluded from `Z` only if:

- `K` excludes `Z`, which fails at `C`; or
- `R[\T\]` excludes `Z`, which fails; or
- the meet is empty, which fails.

So the head follows the paper that `advanced/overloading.tex`, section "Declarations with Static Parameters", names, and walk refuses the pair too. But Appendix I lists the question as not settled ("Whether two parameter types exclude each other when the only static arguments at which they could meet are ones that a bound rules out is not settled", `appendices/changes.tex:3639-3640`). This is the precision that the probe's section 2.4 gives up, and the report said "No test, track or site shows a case". It is 713, home 3: a test that pins today's refusal, and a contested row.

**A failure turned into a value (check 11).** Each crash the change removes now gives one of three results. None is a quiet wrong value.

- A program the specification makes valid compiles and runs with the right value: the ground faces, and `mk` at a ground bound, whose `T` is fixed by nothing and so takes its bound's union (P-48). That run answered `box`.
- A call outside the bounds gets a refusal that names the call.
- A call that the specification makes applicable gets a refusal: `mk` at `{ K, R[\T\] }`. That refusal is the older defect of a self-bounded type parameter that no argument fixes, which the control shows on the base as well. It is 714.

## 3. Where I differ from the worker's account

- **Decision 2** argues that unkeyed expected failures "would stay green across the repair and not show it". That holds for the recursive compile test, which still fails after the repair, though with a refusal. It does not hold for the two typecheck tests: an `XXX` typecheck test whose typecheck succeeds is red. The keys are harmless, so I changed nothing.
- **The recursive case is not home 2.** Its key asserts today's crash. The specification gives no answer for a cycle (`type-inference.tex` asks for inference over every elided type, and describes none). So the case is a test of today's behaviour under row 680, home 3 in form. Row 680's corrected claim spoke only of a sibling. In record.md it now covers a call of the function itself.
- **The report's §1 and record.md** said that the change keeps the unions it builds free of variables. That holds for a bound that names the parameter, and not for a ground bound met with the parameter. I corrected record.md.

## 4. Corrections, each with its finding and its runs

None of my commits changes code. The old-code runs used `old-fortress.sh /home/user/fortress-base15 /home/user/fortress-bounds/tmp/old-caches junit <worktree>/ProjectFortress/compiler_tests/X.test ...`. The head runs used `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests ...`.

1. **`c5570ada6`**: home-1 tests for four faces that the change repairs and that no test gated:
   - `CoerceTwoGroundBoundsClosedTrait` and `ReturnRuleTwoGroundBoundsClosedTrait` (the ground faces of rows 687 and 690);
   - `InferCallerTwoGroundBoundsToClosedTrait` (a callee bounded by the closed trait alone);
   - `XXXCallOutsideTwoBoundsClosedTrait` (a call outside the bounds, where the base crashes).

   Old code, 14:13:57Z:

       F. compile .../CoerceTwoGroundBoundsClosedTrait ** bug! Applied a substitution to an And and got an Or
       F. compile .../InferCallerTwoGroundBoundsToClosedTrait ... - [\T extends K\]Box[\T\]->T is not applicable to an argument of type Box[\T\].
       F. compile .../XXXCallOutsideTwoBoundsClosedTrait ** bug! Applied a substitution to an And and got an Or
        Saw failure, but did not satisfy compile_err_contains; expected
       Tests run: 11,  Failures: 10,  Errors: 0

   Head (`skhead`, 14:14:15Z): `OK (41 tests)`, run with the rung's nine test files and the three kept tests.
2. **`dd32cebd9`**: `XXXInferCallerTwoGroundBoundsClosedTrait`, home 2 for 712.
   - It reports `Saw expected failure` on the old code and on the head.
   - With `h[\T\](x)` written for one run and then restored, it is red (`skxxxred`, 14:14:52Z): `Saw failure, but did not satisfy compile_err_contains` and `Tests run: 1,  Failures: 1`.
3. **`cc64195ca`**: `XXXOverloadTwoBoundsClosedTraitExclusion`, which pins today's refusal for 713.
   - Old code: `Saw failure, but did not satisfy compile_err_contains; expected Invalid overloading of f` and `Tests run: 1,  Failures: 1`.
   - Head (`skhead2`, 14:17:47Z): `Saw expected failure`.
4. **`30af07104`**: the comment of `XXXLocalFunctionRecursiveUntypedReturn` now says what the test checks, and drops the citation that does not say it. The test still reports `Saw expected failure` (`skhead2`).
5. **`95a6ac9de`**: `XXXInferUnfixedSelfBoundedParam`, home 2 for 714. It reports `Saw expected failure` on the old code and on the head. Walk runs the program. `mk[\A\](A)` compiles and runs.
6. **`7841ea0c8`**: record.md and REPORT.md.
   - The FACTS hand-over's union sentence is narrowed. It names the face that stays refused and the exclusion verdict that moves.
   - Row 686 closes with its claim narrowed (297 characters).
   - Row 680's corrected claim covers the recursive case (285 characters).
   - Rows 712, 713 and 714 are added in the row template; each passes `ledger.py check --rows` but for its `?` number.
   - The handover and the revival change are corrected.
   - In REPORT.md: `fig-subtype.tick` has 133 lines, and section 10 gives the new homes.

All the files together on the head (`skfinal`, 14:22:17Z, tree `7841ea0c8`): `OK (43 tests)`.

Each correction is settled by the skill's "How a defect is recorded" (`tests-writing.md`), which gives every measured defect its home, and by its "Names, comments, citations".

## 5. Points to report

- **Both count tables and their times; whether row 680's line landed.**
  - On the final code: count 1 in 378 s.
  - Over the whole component: 43 errors in 809 s, of which about 263 s went to the apis.
  - Row 680's line did not land.
- **No patch changed from the probe's.** `InferUnionInstanceArg` is `PASS`.
- **Sites.** No site comes or goes beyond `:2493`. The crash row stays, since the line is held.
- **No checker file is edited beyond `TypeAnalyzer.scala`, and nothing in the library or walk.**
- **A verdict that moves in a reader of the normal form, beyond the rows' tests.**
  - The exclusion oracle: 713, accepted to refused.
  - The inference's solution: the callee-`K` face, refused to accepted; `mk` at a ground bound, crash to runs; a call outside the bounds, crash to refusal; `mk` at `{ K, R[\T\] }`, crash to refusal.

## 6. For the curator

- **713.** Should a meet over a type parameter be excluded through a closed trait's `comprises` clause?
  - The base did so; the head, walk and the 2011 rules do not.
  - Appendix I lists the question as not settled (`appendices/changes.tex:3639-3644`).
- **712.** May the analyzer's normal form change so that a variable met with a ground bound's expansion stops making a union that holds the variable? No decision covers the normal form. The two ways are:
  - drop a union conjunct that another conjunct is below, before distributing (`TypeAnalyzer.scala:696-699`);
  - stop expanding ground meets, which the probe measured as clearing five of its programs but never ran through the tracks.
- **The worker's two items stand.** Row 680's line is held on one measure under load, and F-53's rise waits on that line.
