<!-- The check of run 2 of climb batch 31 (climb batch 31b: rungs T, O and E) before its launch, on 2026-11-17, by a fresh reader, on `main` at `d7ae0da17c`, whose code is that of run 1's landing `7858d0e97b` and of the base build `/home/user/fortress-base36` (`a3e35bbdb0`). It stands above the check of run 1 of the night before, which is kept whole below. The reproducers ran once each in a worktree of the reader's own, `/home/user/fortress-rev31b`, seeded from the base build and removed after; `FORTRESS_THREADS=1`. No suite, no stage of the gate and no measure was run. -->

# Run 2, before its launch

## For the curator

**What this is.** Run 1 landed. You wrote that run 2 starts with the defaults of the planner, and that you review them after. I read the record of run 2 as a stranger, in place of your reading before the launch. I changed no design.

**What I checked.**

- The sections of rungs T, O and E, against the code that run 1 landed.
- Each line of code, of the specification and of the ledger that those sections cite.
- Each program that the record says fails today. I ran each one once.
- Each rung against your decisions, with their histories.
- Whether the three rungs can merge.
- The estimate of the cost and of the time.
- The part of the record that is written for you.
- The script of the batch, so that the run can start.

**What I found.**

- **No rung must be held out.** No default reverses or bends a decision of yours. No rung changes a line of microGPT or of its helper files.
- **Every program of rungs T and O fails as the record says,** with the message that the record gives.
- **Rung E: the main program fails as the record says. Two smaller points were not correct.**
  - The record said that `u = 0` gives `true` for a zero `u` of type `RR32` on the compiled path. It does not. The program compiles. When it runs, it ends 'StackOverflowError'. The small library of the compiled path has no `=` for `RR32`, and two general declarations call each other. Under walk the answer is `true`.
  - The record gave one form as a case of the rung's defect: a block that ends in `if c then 1 else 2 end`. It fails in another way. The compile stops: 'Error trying to close method scope'. That is an older defect, row 340.
- **Rung O: one of its two new tests cannot fail first.** It checks that the five number types still behave as before. All of that is true today. It is a guard. The test that an object cannot extend `ZZ32` fails first, as the record says.
- **The three rungs can merge.** No pair changes one behaviour in two ways. No rung needs the result of another.
- **The estimate is higher than the record's.** About 3.0 million tokens written if no judge rules, and about 3.8 million with a reserve. About 3 hours, or 3 hours and three quarters with the reserve. Run 1 had no reserve, and it needed one.

**What I changed in the record.**

- The line numbers that run 1 moved.
- The figures that the gate of run 2 compares with.
- Two more points that rung O reports. Both are things that a program sees differently after the merge.
- Three more tests that rung E runs once. Rungs A and L of run 1 left them.
- The two points of rung E above, and the guard of rung O.
- The part for you on run 2. It now gives, for each rung, the change, the program, the message and each fork with its default and the other way.
- The estimate.

**For your review after the run.** Three things are close to a decision of yours. None bends one.

- **Fork E2 is wider than the record said.** At `RR32`, `u = 0` crashes on the compiled path, and `u =/= 0` is refused. The default does not change the small library of the compiled path (your decision P-37). So the two paths differ at `RR32` until the switch-over. The other way adds `=` and `=/=` for `RR32` there.
- **Fork O4.** After the merge, an arm `typecase x of Int => ...` takes every value, with no message. That is true of every unknown name today (row 959).
- **Fork O3.** `round` of an `RR64` stays a `ZZ64`. Your decision P-68 makes it a `ZZ` in a later rung.

**What I did not check.** I ran no suite and no stage of the gate. I did not take the measure. I did not run the programs of the tests that rung E only runs once.

## The findings, by what each needs

### A. Changes of the record that I made

Each is in `CLIMB-BATCH-31.md`, `lists31.py` or `climb-batch-workflow.js` as committed with this review. Each has one reason.

1. **Section 4, its first paragraph.** It now says that run 2's sections cite lines of `7858d0e97b`. Reason: the paragraph gave `c0c35b4f9e` for every section.
2. **Rung T, moved lines** (`reviews/batch-31-review.md`, Part 5). `changes.tex:3323` is `:3333`. `forVarDeclPrePass` is `CodeGen.java:6614`. The members of its "Files" have their lines: `generateForwardingFor` `:793`, `forMethodInvocation` `:7071`, `receiverPrependedDomainType` `:7211`. Reason: run 1 moved them.
3. **Rung T, "the operator application's call" is named:** `forOpExpr` (`CodeGen.java:5531`). Reason: the phrase named no member.
4. **Rung T, "The decisions this rung builds":** what rung M and rung K left in its code (`allMethodsNotReplaced` `:980`, `hasBodyInItsTrait` `:1051`, M's line `:873`, K's `castToTypeBelow` `:7436-7459`). Its briefing gains `castToTypeBelow` as a key. Its "Files" gain the specification's sentence, which its own paragraph "Specification" asks it to edit. Reason: Part 5 names them as new to the section.
5. **Rung T, steps 2 and 3: the message seen on the base.** Row 832's call: 'ClassCastException'. Row 819's operator: 'Error trying to close method scope'. Reason: the two steps said "test first" and gave no message.
6. **Rung O, moved lines.** `changes.tex:4812-4815` is `:4826-4829`, and `:4847` is `:4861`. Reason: run 1 moved them.
7. **Rung O, a new paragraph "What the merge meets for the first time", two points to report, one reserved point and two briefing keys (rows 785 and 1044).** Part 5's two points: rung V's reading of a generic declaration beside a plain one acts at the five types for the first time; and a plain declaration with no written return type is refused over a trait type and loads unjudged over an object type. Reason: Part 5, "To add, 1" and "To add, 2". I ran the second: `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: ZZ64) = 2` is refused on the base, 'fails the Return Type Rule'.
8. **Rung O, step 1: the first test is a guard.** Finding B1 below. Reason: the section says "The test first", and that test passes on the base.
9. **Rung E, moved lines.** `changes.tex:5421-5427` is `:5435-5441`. The members that write a reference to a function as a value are named: `forFnRef` `:4101` and `forFunctionalRef` `:4182`. K's cast at a returned value (`:3126`, `:7424`) stays. Reason: run 1 moved them, and Part 5 names the members.
10. **Rung E, step 3: three more kin by a run,** `XXXAtomicExprNumeralArms`, `XXXAtomicExprNumeralBody` (row 1043) and `XXXLabelNumeralValueCompiled` (row 340's label case); its points to report, its rows and its briefing (P-50 as a check, rows 1043 and 340). Reason: Part 5.
11. **Rung E, step 1: the `if` form.** Finding B2 below. Reason: the step gave one message for four forms, and one form fails with another.
12. **Rung E, step 4, fork E2 in sections 2 and 3, and section 5's line on the routed step: `c = 0` at `RR32`.** Finding B3 below. Reason: the record said that the case passes, and it does not.
13. **Section 2, "Run 2, rung by rung", written again.** It has your words of 17 November, the three rungs with the messages of today's runs, rows 832 and 819 under T, the four things that a program sees differently after O, the guard, the kin of E, and each fork with its default and the other way. Fork O7 has its other way. Reason: the part gave T, O and E in fewer words than run 1's rungs, said "I ran it today" for runs of 16 November, and gave no other way for E1 and O7.
14. **Section 2, "The go", "The two runs", "Cost and time" and "Your review list".** Run 1 landed; run 2 has your word; the agents' models; run 1 as it ran; run 2's estimate with its reserve; the disk today. Reason: stale text.
15. **Section 6.** The gate's comparands for run 2, with their figures. The sentence for a second launch in run 2's first reading names every role (process finding 8). "Before the launch" for run 2 says what is done. "The generator" says that run 2's block is spliced. Reason: Part 5's frame and "The steps due before run 2", step 7.
16. **The head comment:** your word for run 2, and one sentence on this check. Reason: the record's history names its checks.
17. **`lists31.py`:** the four changes of briefing above, and its header. Reason: the manifest follows the record.
18. **`climb-batch-workflow.js`:** run 2's block spliced; and `atomic_runs` reads only its own lines of the gate's summary. Before, it returned 1 whenever the summary held 'BUILD FAILED' (process finding 10, first fault). Reason: "The steps due before run 2", step 7.

### B. Findings of the reproducers

Each on the base build's code, once.

**B1. Rung O's first test cannot fail first.** `NumberTypesAreObjectsWalk` asserts four things. I wrote them as one program and ran it under walk on the base:

- a `typecase` with arms at `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` printed `ZZ32 ZZ64 ZZ NN64 RR64 other` for one value of each and an `NN32`;
- `ilkName` printed the five type names;
- `(x asif T) = x` printed `true` five times;
- `(3.0 asif RR64) + 17` printed `20.0`.

So every assertion holds before the merge. The rung has two tests that do fail first: the refusal of `object Mine extends ZZ32`, and row 550's test, which is refused on the base ('fails the Return Type Rule') and is promoted. The record now calls the first test a guard. No design changed.

**B2. Rung E, step 1: one of the three added forms fails for another reason than the rung's gap.** A function whose block ends in `if c then 1 else 2 end` after a local declaration: the compile stops, 'Error trying to close method scope', at the function. That is row 340's message, and the row's notes name "an `if` argument coerced" among its forms. The float numeral and the negative numeral fail as row 1014 does: 'NoClassDefFoundError: fortress/CompilerBuiltin$v'. The record now gives the two messages. If E's repair does not reach the `if` form, E writes it as an expected-failure test of its own with a note on row 340, and builds nothing more. That keeps fork E1.

**B3. Rung E, step 4: `c = 0` for `c: RR32` does not answer `true` on the compiled path.** The record of 16 November said "Five cases pass. One fails". The planner's program stopped at the compile on `c =/= 0`, so the other five cases never ran (`PROBES.md`, section 9). I ran the five without that line:

- `a = 0`, `a =/= 0` at `NN32` and `b = 0`, `b =/= 0` at `NN64`: `true`, `false`, `true`, `false`.
- `c = 0` at `RR32`: 'StackOverflowError'. The frames repeat: `Equality[\RR32\]`'s `=` (`Library/CompilerAlgebra.fss:26`, `self === other`), then `===` at `(RR32, RR32)` (`Library/CompilerLibrary.fss:67`, `a=b`). `trait RR32` of the prelude declares only its two coercions (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:955-958`).

No ledger row holds this defect. Row 908 names the prelude's `===` and not the recursion. The record now gives rung E the row as `NEW-E-2`, and the case as an expected-failure test. The Effect's sentence at `changes.tex:5435-5441` says that both implementations answer at `RR32`; E narrows it, as fork E2 already asked for `=/=`.

**The verdicts, rung by rung.**

- **T, `PTupleIndex.fss` (row 992):** compiles; the run dies, 'VerifyError: Bad type on operand stack', at `PTupleIndex$A2.get(FZZ32, FZZ32)`, "Type 'PTupleIndex$A2' ... is not assignable to ... FZZ32". As the record says.
- **T, row 832's program:** compiles; the run dies, 'ClassCastException'. The record gave no message; it has one now.
- **T, row 819's two operators:** the compile stops, 'Error trying to close method scope'. As row 819 says.
- **O, `P551.fss` with its own `asFloat` (walk):** loads and prints `Mine`. As the record says.
- **O, `PInt.fss` (walk):** `Int other`. As the record says.
- **O, row 550's test (walk):** refused, 'fails the Return Type Rule'. As fork V4 left it.
- **O, the guard:** finding B1.
- **E, `P1014.fss` (row 1014):** compiles; the run dies, 'NoClassDefFoundError: fortress/CompilerBuiltin$v'. As the record says.
- **E, row 1030's test program:** compiles; the run prints `REACHED` and dies with the same error. As the record says.
- **E, `PEqNum.fss`:** the compile stops at `c =/= 0`, 'Could not check call to operator NE'. As the record says. The other cases: finding B3.
- **E, the three added forms:** finding B2.

Not run: the programs of E's four kin tests. Each is an expected-failure test of the gated suite, which run 1's second gate passed.

### C. Points for the coordinator before the launch

1. **The base and the base build.** `git diff --stat a3e35bbdb0 main -- ProjectFortress Library build.xml bin Specification .claude` prints nothing, before my commits and after them: they change only files under `explorations/`. So `/home/user/fortress-base36` holds the code of `main`'s head. The launch's `base` is `main`'s head after my commits; `baseBuild` is `/home/user/fortress-base36`. Run 1 was launched the same way (`c1ce2a35e1` on `/home/user/fortress-base35` at `c72e195fd7`).
2. **`compiler_tests/OverloadReturnObjectDomain.fss:26` is not traced** ("The steps due before run 2", step 5; judge-gate.3). No commit touches the file since rung X's. Its line binds `b: Box[\Square\] = keep(Box[\Square\](Square))`, a call that two generic declarations fit. Run 2's gate reads the test, and rung E may edit the checker. If its answer hangs on the suite's order, the gate can turn red on it as run 1's first gate did on its sibling. The reserve of the estimate covers one such ruling. I did not trace it: the time went to the reproducers.
3. **The script's fixes of step 7.** Made: process finding 10's first fault (A18 above), and finding 8 for run 2's first reading (A15). Not made, because neither is small:
   - Finding 2, the second gate's reach. `gateRole` takes no list of stages, and `repairRerun` answers only whether the whole gate runs again. A second gate costs about 20 minutes and 0.11M; the reserve holds one.
   - Finding 10's second fault, 'Saw failure' printed with no exit code. It is in the test harness, not in the script.
4. **The measure on the landed tree** (step 2) is not in the record yet. `PLAN.md` and F-34 still give 24. A worktree `/home/user/fortress-measure36` exists, so another worker has it.
5. **The third atomic program.** Rung A's handover offers `VarFieldCapturedCompiled`. Fork B2 names two programs, and the script's list holds those two. I did not add a third: it changes what the gate runs.
6. **The skill that run 2's workers read.** Step 3 asks that they read the skill as the record-landing workflow updates it. That workflow is running. A worker reads the skill of its own worktree, which is cut from the base. If the skill's update lands after the launch's base, the workers read the skill of before run 1. For T, O and E its sentences on rows 551, 1014 and 1030 are still true on the base. Its sentences that `label`, `exit` and an `atomic` expression do not compile are false, and no rung of run 2 rests on them.
7. **The disk.** `df` gives 13.9 G free with the base build in place and my worktree removed. Run 2's floor is 8.5 G. The base builds 32 to 35 hold 1.2 G that no run reads.
8. **A defect that no row holds:** the stack overflow of finding B3. Rung E files it. If rung E does not land, the row is the coordinator's to file.
9. **A sentence of the probe notes that misleads:** `PROBES.md`, section 9, "it reports no other line", is true of the checker and was read as "the other five cases pass". I did not edit the probe notes: the record now holds the result.
10. **The launch** from a turn that no message of his started, with check-ins for about 3 hours and three quarters.

### D. Points that would change a decision of the curator's

**No rung must be held out.** His message of 17 November gives every fork of run 2 its default. I read each default against the entry that it stands near, and against the entry's history.

- **T1, a bridge method.** No decision on record speaks of it. P-156's sentence "`m[i, j]` passes its tuple `(i, j)` as before" is about the value, and T changes no value.
- **O1, O2, O5, O6, O7.** Within P-178 and P-167. P-178's history ends with his own words for "both paths ... before the switch-over" (the note of 2026-11-16 01:57Z). Rung O builds the one library's half. The prelude's half is fork H2, which builds nothing and is on his review list.
- **O3, `round` stays `ZZ64`.** P-68: "one library rung after the switch-over, which first counts the interpreter tests whose output changes, then makes the brackets, `round` and `truncate` return `ZZ`". The default keeps what runs and leaves the change to that rung. It deletes the one declaration with P-68's type, which never ran (`Library/FortressLibrary.fss:480`). It does not bend the sentence. P-68's clause "but `ZZ` in the `FortressLibrary` component's `trait RR64`" becomes false with rung O; the record lists it for the record-landing workflow.
- **O4, the merge does not wait for row 959.** P-167: "walk's native objects stop being types that a program sees or prints; its five native number objects go altogether (P-178)". The default does what the sentence says. What a program that still writes `Int` in an arm sees is in no entry. The default leaves a wrong answer with no message for the time of one batch. That is his to weigh after the run, and it bends nothing.
- **E1.** No decision speaks of it.
- **E2, with finding B3.** P-37: "So no declaration is added to the compiler's prelude", with two exceptions, "each so that both paths do the same before the switch-over". The default adds no declaration, so it follows the first sentence. The exception for the numerals names the design of P-174 and P-176, the numeral types and their coercions, and not the operators of a number type. So the default reads the exception as it is written. After rung E the two paths still differ at `RR32`: walk answers `c = 0` and `c =/= 0`, and the compiled path crashes on the first and refuses the second. That difference is wider than the record told him on 16 November. It is the first point for his review, and it holds no rung: the default changes no behaviour, and it can be undone by two declarations.
- **A new point under rung O, no fork:** after the merge a plain declaration with no written return type beside a generic one loads unjudged at the five types (row 1044), where walk refuses it today (row 785's refusal, which no rule of the team's gives). P-45 says that the Return Type Rule holds at every instance; walk does not judge such a body at any object type today. The merge widens that gap to the five types and bends no sentence.

**The premises stated as the curator's.** Each one that a section of T, O or E names is in its entry: P-156 (T); P-178, P-160, P-167, P-68, P-87, P-37 (O); P-173, P-176, P-174, P-37, P-148, P-50 (E). "Your decision P-178 asks for the merge on both paths before the switch-over" (section 2, "The merge") is in the entry and in its history. I found no premise without an entry.

### E. The citations of run 2

Read on `main`, whose code is `7858d0e97b`'s. After the changes of section A, every one holds:

- `CodeGen.java`: `generateForwardingFor` `:793`, M's line `:873`, `allMethodsNotReplaced` `:980`, `hasBodyInItsTrait` `:1051`, the returned value's cast `:3126`, `forFnRef` `:4101`, `forFunctionalRef` `:4182`, `forOpExpr` `:5531`, `forVarDeclPrePass` `:6614`, `forMethodInvocation` `:7071`, `receiverPrependedDomainType` `:7211`, `castToTypeBelow` `:7417` and `:7436`, `declaredResult` `:7424`.
- Walk: `LanguageTypes.java:33-37` (the five entries of `OBJECTS`) and `:53` (`numberTraitName`); `ObjectPrims.java:55`; `StaticNativeApp.java:64` and `:117-120`; the `UnsignedLong` clause of `BuiltinPrimitiveRewriter.java` (`:189-192`); `BuildEnvironments.forObjectDecl1` (`:454`); the five constructor classes of `interpreter/glue/prim/`, 2,041 lines together; `OverloadedFunction.java:513-527`; `FTraitOrObject.java:102-103`; 'Attempt to extend object type' (`interpreter/rewrite/DesugarerVisitor.java:1436`).
- The library: the five traits with `comprises { Int }` and the others (`Library/FortressLibrary.fss:384-387`, `:776-778`, `:878-880`, `:987-989`, `:1089-1091`, and the api); the five objects (`FortressBuiltin.fss:61`, `:379`, `:388`, `:533`, `:544`); `round(self): ZZ` (`FortressLibrary.fss:480`); the 54 lines that name the five objects in the library's four files.
- Tests: `tests/NativeHelperFloatCarriedWalk.fss:5-6`; `tests/NumberPrintTest.fss:31` and `:35`; `tests/asifTest.fss:102`; `tests/XXXGenericBesidePlainReturnParam.fss`; the six expected-failure tests that rung E promotes or runs; `compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.fss`.
- The specification: `changes.tex:3333` (row 832), `:4826-4829` and `:4861` (the interpreter's objects), `:5435-5441` (the Effect on `u = 0`).
- Ledger rows 992, 832, 819, 1003, 1000, 551, 550, 959, 330, 785, 1044, 1014, 1030, 1031, 1043 and 340; F-361; the probe's note, "The bodies of `trait RR64`" (56 bodies); the gate's files of run 1 (`compile-ladder/climb-batch-31/gate/`: the count 0, the distance 0, `#crash none`).
- Every briefing key of T, O and E matches one place: `python3 -B explorations/compile-ladder/plan-31/manifest/lists31.py` prints `bad lists 0`.

One figure is loose and I left it: fork O6's "about 2,000 lines that nothing calls". The five classes are 2,041 lines together, and their constructors stay.

### F. The merge of run 2

**The gather can merge the three rungs.**

- O shares no code file and no test file with T or E. Of the tests that name one of the five objects, none is a test that T or E writes, promotes or runs.
- T and E can meet in `CodeGen.java`: T at `:793`, `:5531`, `:7071` and `:7211`, E only at `:4101` or `:4182`. The nearest pair is 1,349 lines apart. If E's cause lies in a member of T's, E does not edit there (fork E1).
- All three edit `Specification/appendices/changes.tex`: T at `:3333`, O at `:4826-4861`, E at `:5435-5441`. Apart. The record's sentence "O shares no file with T or E" is true of code and tests; rung O's section now names the shared file.
- T edits `compiler/NamingCzar.java`; the measure's patch has a hunk there, and the record says what to do.

**No pair changes one behaviour two ways, and none needs another's result.** The manifest's `landsOnlyWith` is empty for each, and that is correct: T's and E's tests run under the prelude, which O does not touch; O's tests run under walk, which T and E do not touch. Two things that only the merged tree shows: the count and the distance stages with E's checker edit on O's library, which the gate runs; and the measure after run 2.

### G. The estimate

- **Run 1 as it ran:** 5.08M written in 4 h 23 min, against 4.3M and 5 h 30 (`reviews/batch-31-review.md`, section 5). Workers 1.75M (0.29M each), skeptics 1.41M for six and 0.24M lost to the restart, fixed roles 0.90M, two rulings with two repairs and a second gate 0.77M.
- **Run 2, tokens written:**
  - Workers 1.1M: O 0.45M, the largest section and the only rung with walk's suite and the two stages; T 0.35M, as M; E 0.30M.
  - Skeptics 0.8M: 0.24M each by run 1's figure, and more for O, whose section has five reserved points.
  - Fixed roles 0.9M: the gather and the commit stage do not shrink much with three rungs.
  - Sum 2.8M to 3.0M with no ruling; the three-rung climb batch 30 wrote 2.92M.
  - Reserve 0.8M: one ruling on the review with its repair (0.29M in run 1), and one ruling on the gate with its repair and a second gate (0.49M).
  - **About 3.0M, and 3.8M with the reserve; between 2.5M and 4.3M.** The record had 3.0M between 2.4M and 3.8M, with no reserve.
- **The models.** The workers and the fixed roles run on Opus, and Fable only for a judge's second ruling (`tools/tier-mode.sh status` prints `regular`). Run 1's figures are of Fable. I know no figure for how the two differ in tokens written for one rung, so the range is wide on both sides.
- **The time: about 3 hours, and 3 hours and three quarters with the reserve.** Run 1's workers took 22 to 43 minutes, its skeptics 12 to 21, its gather 44, each gate about 21, the review, the judges and the commit stage about 25 together. Three workers on four CPUs, with O's `ant testSystem` and two rungs' `ant testFast` beside each other, take about an hour. The record had 4 hours and a half.
- **The disk:** the floor is 8.5 G; 13.9 G are free.

### H. The section for the curator

After change A13 it lets him judge each rung after the fact. For T, O and E it gives the change, a program with today's message, and each fork with the default taken and the other way; O1 to O7 are in "The merge". It has lists and no table. Its terms are defined at the head of section 2 or where they are used ("bridge method", "forwarder", "guard"). What stays, which I did not change: "The merge" gives forks O1 to O7 apart from rung O's part, so he reads two places for one rung; and the passive sentences that the check of run 1 named.

### I. Ready to launch

- `python3 -B explorations/compile-ladder/plan-31/manifest/lists31.py`: `bad lists 0`, for both runs.
- `gen31.py --run 2` wrote the block: T, O and E, batch `31b`, 267 lines.
- `node check31.js --run 2`: `problems: 0`; then with `--write`: spliced into `explorations/coordinator/climb-batch-workflow.js`. A second run after the last edit of the record: "the tracked script's block equals the generated one", `problems: 0`.
- `node explorations/coordinator/tools/workflow-scenarios.js`: `problems: 0`, after the fix of `atomic_runs` and again after the splice.


<!-- The check of climb batch 31's record, `CLIMB-BATCH-31.md` (`c72e195fd7` on `main`), with its probe notes `compile-ladder/plan-31/PROBES.md`, before the launch of run 1 on the curator's go of 2026-11-16 23:04 UTC, by a fresh reader on Fable that night: run 1's citations at their sources, its reproducers run once on the base build's code, each repair against the team's sources, each rung against the decisions on record, the 26 forks sorted by the `coordinator` skill's rule, the merge of run 1's six rungs, the measure and the estimate, and the section for the curator; with the changes made to the record in place. It replaces the check of 2026-11-13, which git keeps (`98dbf519ed` and after). -->
<!-- Run in a worktree of the reader's own, `/home/user/fortress-check31b`, seeded from `/home/user/fortress-base34` (`c0c35b4f9e`) and removed after; `FORTRESS_THREADS=1` unless a line says four; another worker built a base build beside it. No suite, no stage of the gate and no measure was run. Of run 2 only the decisions, the forks and the merge were checked. -->

# The check of climb batch 31's record, before the launch of run 1

## 1. For the curator

**What this is.** You gave the go for climb batch 31 and went to sleep. The planner wrote the record that night. I read the record as a stranger, in place of your reading before the launch. I changed no design.

**What I checked.**

- Each line of code, of the specification and of the ledger that run 1 cites. I read each at its source.
- Each program that run 1 says fails today. I ran each one once, on the code of the base build.
- Each repair of run 1 against the specification, the paper of the team or the library.
- Each rung of both runs against your decisions, with their histories.
- Each of the 26 forks: does its default reverse or bend a decision of yours, or change a line of microGPT?
- Whether the six rungs of run 1 can merge.
- The measure, the estimate and the section that the record writes for you.

**What I found.**

- **No rung must be held out.** No default reverses or bends a decision of yours. No rung changes a line of microGPT or of its helper files.
- **Every program fails as the record says,** with the message that the record gives. The planner did not run the program of rung X. I ran it, and it fails as the record says.
- **One point in rung V needs care.** V makes walk accept one pair of declarations at `ZZ64`. Before the merge, `ZZ64` is a trait with one object below it. The pair is valid there only because the trait lists that one object. The record gave V a reading of the rule that is correct only for an object type. A worker who follows that reading alone makes walk accept a pair that the specification refuses. The suite has a test that catches this. I wrote the rule into V's section as the specification states it. Finding B1 holds the choice that is left.
- **One fork is consequential by your rule: H2,** the way in which the prelude takes the form of your decision P-178. The record said so in one place and said the opposite in two places. I made the three places agree. H2 builds nothing, so it holds no rung.
- **Four forks stand near a decision of yours.** None bends one. They are A1 (a `var` field costs one more object), O3 (`round` stays a `ZZ64` for now), O4 (an arm at a removed name takes every value until row 959 is repaired) and E2 (`=/=` at `RR32` stays refused under the prelude). O3, O4 and E2 are in run 2, which starts hours from now. Section C says what each one touches.
- **The six rungs of run 1 can merge.** No pair changes one behaviour in two ways.
- **The estimate fits:** 4.3 million tokens for six rungs, against 5.0 million for the seven rungs of climb batch 32.

**What I changed in the record.** Twelve changes, each for one reason (section A). Most are in your section: they define a term, state the cost of a fork, or correct a sentence. I changed no rung's design, no heading and no key of the manifest.

**What I did not check.** I ran no suite and no stage of the gate. I did not take the measure again. I did not read run 2's citations or run its programs: the record is read again before run 2.

## 2. The findings, by what each needs

### A. Changes of the record that I made

Each is in `CLIMB-BATCH-31.md` as committed with this review.

1. **Section 3, "Forks the batch takes", its first sentence; and section 2, "Your review list", its first bullet.** They said that none of the 26 forks is consequential. Section 3's own paragraph "The consequential fork" names H2 as one that chooses among ways that the record does not settle. Now both say: only H2, whose default builds nothing. Reason: the record contradicted itself.
2. **Section 4, rung V, step 2: four sentences added after the sentence on `validOnDeclaredDomains`.** The section told the worker to compare "at the instances that hold the plain one's domain". The specification's rule compares at every argument type to which the more specific declaration applies, and at every instance of the other that applies to it (`Specification/advanced/overloading.tex:555-559`). The two agree only at an object type. The added sentences state the rule, name the guard test `tests/XXXGenericBesidePlainReturnRule.fss`, and say that row 550's pair at `ZZ64` is valid on run 1's tree only through `trait ZZ64 comprises { Long }` (P-60). Reason: a sentence that said less than its source. Evidence: finding B1.
3. **Section 4, rung X, the mission.** "the refusal reaches `ZZ32`, `ZZ64` and `RR64` in every program" became "reaches every such pair over `ZZ32`, `ZZ64` or `RR64`". Reason: row 542 refuses one kind of pair, not every program.
4. **Section 2, "The go".** Two passive sentences made active. Reason: the register.
5. **Section 2, the head of "Run 1, rung by rung": one paragraph added.** It says that each program is shortened, who ran it, and where the whole program is. Reason: M's, K's and A's programs are extracts that do not compile as shown, and the planner ran neither X's program nor the `for` form of L's that the section shows (the probe `PLabel.fss` has a `while`).
6. **Section 2, rung L, "Today".** "Every string and every array of the one library has such a line" became a sentence on the trait `Indexed`, which they extend. Reason: the line is in `Indexed` (`Library/FortressLibrary.fss:2189-2195`), not in each string and array.
7. **Section 2, fork L2.** The curator's section gave L2 as the `exit` out of an `atomic` block. Section 3's L2 is first "The closure class written twice (row 315) is left out". Now the curator's section gives both parts. Reason: one name for one thing.
8. **Section 2, fork A1.** The word "cell" is defined, the cost is stated (one more object for each `var` field, one more step at each read), and "keys the transaction by" is in plain words. The helper files are named with the two programs: I searched `FlatArrays.fss` and `FlatArrays2.fss` too, and none of the four files has the word `var`. Reason: a reader new to compilers cannot follow the sentence, and the fork's cost is what he judges.
9. **Section 2, rung V, the second program.** The Return Type Rule is defined and its place in the specification named; the sentence that this refusal is the one change of run 1 that stops a program that runs today; the two sentences on `ZZ64`. Reason: a term used and not defined, and finding B1.
10. **Section 2, "The measure".** "Two of the four have a second wall" became a sentence that names the four and gives what 19 and 21 mean. Reason: the sentence did not say four of what.
11. **The head comment's history.** One sentence on this check. Reason: the record's history names its checks.
12. **`INDEX.md`, the record's line.** It named five rungs, no go, and "planned 2026-11-13 with no go". It is now the first sentences of the record's head comment. Reason: the line contradicted the record.

**The manifest.** No list of the manifest needs a change for these: I changed no heading and no key, and `python3 -B explorations/compile-ladder/plan-31/manifest/lists31.py` prints `bad lists 0` on the edited record (run twice; one run before them printed `bad lists 2` and other byte counts, and did not repeat: I do not know why). If the coordinator takes B1's first way, V's briefing gains P-60 as a check, in the record's section 1 and in `lists31.py`.

### B. Points for the coordinator to decide before the launch

**B1. Rung V, step 2: the valid pair at `ZZ64` in run 1.** The step promotes `tests/XXXGenericBesidePlainReturnParam.fss`: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64`. On run 1's tree `ZZ64` is `trait ZZ64 ... comprises { Long }`, and every `ZZ64` value is the object `Long`. By the specification's rule, two `Long` arguments select the generic declaration's instance at `Long`, which returns a `Long`; the plain declaration returns a `ZZ64`; so the pair is valid only if `ZZ64` is below `Long`, which holds by the `comprises` clause read at values (P-60) and by nothing else. Row 550's note, "Every instance whose domain holds two `ZZ64` has `T` at or above `ZZ64`", leaves that instance out. Evidence:

- Walk's own code knows the case: `returnRuleAtEveryInstance` accepts only where the inner declaration "has at one of them an object type below which its return type lies" (`OverloadedFunction.java:1150-1163`, `:1200`, `t instanceof FTypeObject`), and its comment gives the counter-example, an argument below the domain that selects a lower instance.
- The reading that the record gave, at a trait, accepts the specification's own refused pair, `ident[\T extends Shape\](x: T): T` beside `ident(x: Round): Round` (`overloading.tex:608-621`). Walk refuses it today: I ran it, 'fails the Return Type Rule'. `tests/XXXGenericBesidePlainReturnRule.fss` holds that refusal, so `ant testSystem` in V's step 4 would catch a loose repair, late.
- After rung O, `ZZ64` is an object and the pair is valid with no clause read (F-361 saw the test pass in the merged scratch tree).

The ways: (1) V reads a `comprises` clause that lists one object as that object, in this check, and promotes the test in run 1: P-60 is the ground, and V's briefing gains P-60; (2) V leaves the test at `ZZ64` an expected failure, its valid pair at `NN32` is the positive test, and rung O promotes the `ZZ64` test in run 2. I recommend (2) if the coordinator wants no new reading in walk tonight: it costs one sentence in V's step 2 and one in O's step 1. The record as corrected leaves (1) open and names the guard; it does not choose.

*Decided by the coordinator after this check, on 2026-11-17: way (2). It is fork V4 of the record's section 3, its 27th fork: V's check reads no `comprises` clause, the test at `ZZ64` stays an expected failure in run 1, and rung O promotes it and closes row 550.*

**B2. Rung V, step 2: a plain declaration that writes no return type.** Row 785: walk's check refuses a pair whose more specific declaration writes no return type, at a trait, and at an object the shortcut of `:511` hides it. V takes that shortcut away for a generic declaration beside a plain one. I ran `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = 2` under walk: it loads today and prints 2. After V it may be refused for no rule of the team's. V's reserved point covers such a pair only where the library or an existing test holds one. A sentence for V's step 2 would close it: "A plain declaration that writes no return type beside a generic one still loads: test one." Not added: it extends the rung.

*Decided by the coordinator after this check: the sentence is added to V's step 2, as a guard that passes on the base.*

**B3. Run 2's forks O3 and O4 need no night's default.** Review-queue items 518 and 519 had no default on record. Run 2 launches after run 1 has landed, about five hours and a half from now. If the curator is back by then, put the two to him before run 2's launch; if not, the defaults stand, and neither bends a decision (section C).

**B4. The rule of the night, as the record words it.** Section 3 says that a rung is held out where a default would reverse or bend a decision. `references/batch.md`, "The go" (`:39`), says: "If that default would reverse a decision of the curator, hold that batch, and launch the repair batch". Tonight the two give the same answer, since no default reverses a decision. The record's wording is the coordinator's for this night; I left it.

**B5. Before the launch, nothing else.** The base build, the script's atomic list and the splice are the record's own steps ("Before the launch"). The disk: `df` gave 16 G free with my worktree in place and the new base build being made; run 1's floor is 13 G.

### C. Points that would change a decision of the curator's

**No rung must be held out.** The forks, one line each, by the rule of the `coordinator` skill ("The curator's role and decisions"):

1. B1, two runs: not consequential. A choice of order.
2. B2, A's two tests in the atomic runs: not consequential.
3. B3, which offered rows wait: not consequential. A choice of order.
4. H1, varargs left out: not consequential. No test can fail first under the prelude.
5. **H2, the prelude's half of the merge waits: consequential.** It chooses among ways that the record does not settle. Its default builds nothing and is in no rung. It does not bend P-178, whose sentence is "both paths take this form before the switch-over", as long as the switch-over waits for it. What the wait costs is below.
6. S, the stable order is not a rung: not consequential.
7. M1, a trait's own declaration replaces an inherited body: not consequential. It is the specification's rule (`Specification/basic/traits.tex:584-590`).
8. M2, an api's method without `abstract` has a body: not consequential.
9. K1, the cast only where needed: not consequential.
10. L1, an `exit` out of a parallel loop joins the arms first: not consequential. It builds P-175, and `Specification/basic/evaluation/parallelism.tex:95-100` allows it.
11. L2, row 315 left out and the `exit` out of `atomic` as a test: not consequential. The specification's sentence is plain (`atomic.tex:60-63`), and the test records what the code does.
12. A1, a `var` field in a cell: not consequential, and the nearest to it in run 1. It gives each `var` field a second object. P-169 keyed the array store by array and index so that an array keeps "one box an element, not two"; A1 takes the other device for fields, the code's own for a top-level `var`. No model or helper file has a `var`. It can be undone. Row 641 holds the cost.
13. V1, the symbolic type passes the check of value types: not consequential.
14. V2, both directions of the load check: not consequential. The pair refused after and loaded before, `P998.fss`, is refused by the specification's Return Type Rule (`overloading.tex:555-559`): the instance at `NN32` returns an `NN32`, and `String` is not below it. Finding B1 is on its other direction.
15. V3, row 1036 as a test and a sentence: not consequential.
16. X1, only the instances whose domain meets the plain one's: not consequential. It is the paper's rule (`Papers/Types/overloading-check.tick:167-184`, "with U not equivalent to Bottom" at `:180`) and the specification's ("for every argument type other than BottomType").
17. T1, a bridge method: not consequential.
18. O1, the five stay in `FortressLibrary`: not consequential. It can be done the other way later.
19. O2, walk's repairs first: not consequential.
20. O3, `round` stays a `ZZ64`: not consequential, and near P-68. P-68 gives `ZZ` and gives the change to one rung after the switch-over, which first counts the tests. The default keeps what runs and deletes the one declaration that has P-68's type, `round(self): ZZ` of `trait RR64` (`Library/FortressLibrary.fss:480`), which never ran. The other way does part of P-68's rung without its count. P-68's own clause on the two declarations becomes false, and the record lists it for the record-landing workflow.
21. O4, the merge does not wait for row 959: not consequential, and the one default that leaves a silent wrong answer: after the merge an arm at `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` takes every value. No model or helper file names one of the five. One test of the tree does, and O changes it. P-167 and P-178 say that the names go; neither says what a program that still writes one sees.
22. O5, row 542 as rung X: not consequential.
23. O6, the constructor classes renamed, dead natives deleted: not consequential.
24. O7, the bodies of `trait RR64` go: not consequential. The reserved point holds a team's test whose value changes.
25. E1, the repair goes where the cause is: not consequential.
26. E2, `c =/= 0` at `RR32` recorded and not repaired: not consequential, and near P-37. P-37's exception for the numerals exists "so that both paths do the same before the switch-over". Walk answers `false`; the compiled path refuses the line. The default reads the exception narrowly: it adds no `=/=` to the prelude. It answers nothing wrongly, and it can be undone.

**What H2's wait costs, for his review.** Until the prelude takes the form, the two paths differ at the five number types in more programs than today:

- After run 1: walk loads the pair at `ZZ64` (rung V), and the compiled checker under the prelude refuses the same program. I ran it: 'the return type of (ZZ64, ZZ64)->ZZ64 ... should be a subtype of the return type of [\T extends Number\](T, T)->T'. That refusal is correct under the prelude, where `ZZ64` is an open trait. Today both paths refuse the program. P-45's sentence "Walk and the checker must accept the same pairs" is about the rules on one library, and V brings walk to the rule; the difference is the two libraries'.
- After run 2: walk refuses `object Mine extends ZZ32`, and the compiled path compiles it and dies when it runs (row 866), as today.

Both end with the prelude's half. The record puts that half first in the list for the batch after.

**The premises stated as the curator's.** Each one that a rung's section or the curator's section names is in its entry or its history: P-178 (the entry, and its history's last block for "both paths", with his words of 2026-11-08 and 2026-11-09); P-37 and its two exceptions; P-160; P-164; P-167; P-45; P-46; P-152; P-87 and P-9, with no model line in any rung's files and "A model line: none" in each rung's reserved points; P-47, P-149, P-147 (M); P-60, P-146 (K); P-175 (L); P-169, whose slots are `TXReadSlot` and `TXWriteSlot` (A); P-148 (X, E); P-156 (T); P-68 (O); P-12 (V). P-173, P-176 and P-174 (E) I read in the skill's `revival-changes.md`, not in the entries. I found no premise without an entry.

### D. The reproducers, rung by rung

Each on `c0c35b4f9e`'s build, once.

- **M, `PDupMethod3.fss`:** compiles; the run dies, 'ClassFormatError: Duplicate method name "mx?0" with signature "(LPDupMethod3$Z;)LPDupMethod3$Z;"'. As the record says.
- **M, `GenApi` and `PGenUse4.fss`:** compile; the run dies, 'AbstractMethodError: Receiver class PGenUse4$Rng does not define or inherit an implementation of the resolved method ... map ...'. As the record says.
- **K, `PComprisesCast.fss`:** compiles; the run dies, 'VerifyError: Bad type on operand stack', at `PComprisesCast$Q$DefaultTraitMethods.fin`, "Type 'PComprisesCast$Q' ... is not assignable to 'PComprisesCast$R'". As the record says.
- **L, `PLabel.fss`:** the compile stops, 'Can't compile Label at ...PLabel.fss:3.23'. The `for` form that the curator's section shows, which the planner did not run: the same message.
- **A, `PAtomicExpr.fss`:** the compile stops, 'Can't compile AtomicExpr at ...PAtomicExpr.fss:5.9'. **`PFieldAtomic.fss`** at four threads: 31,268 of 40,000. As the record says.
- **V, `P997.fss`:** 'T@...P997.fss:7:1-57: non-value subtype of value type RR32'. **`P998.fss`:** loads and prints `plain`. **Row 550's test at `ZZ64`:** refused, 'fails the Return Type Rule'. **`PArrowRet.fss`:** 'ran at size 2'. As the record says.
- **X, the test's program and the three lines of the curator's section:** the compile stops, 'the return type of Circle->Circle @ ... should be a subtype of the return type of [\T\]T->T'. The row's second pair, with `object Box[\U\]`: refused in the same words. As the record says; the planner had not run it.

Tests that cannot fail first, each a guard and none a finding against its rung: X's refusal test (`g[\T\](x: T): T` beside `g(x: Circle): String` is refused today, in the same words); V's valid pair at `NN32` (I ran it: it loads today and prints 5, through the shortcut that V removes); V's step 3, an expected failure by design. V's section says "each test ... seen failing through the harness first": for the pair at `NN32` that cannot be.

### E. The citations of run 1

Read at `c0c35b4f9e` for code and on `main` for the specification, the library and the tests. Every one holds:

- `CodeGen.java`: `dumpTraitDecls` `:769`, `dumpMethodChaining` `:926`, `genParallelExprs` `:1692` with its calls at `:1756` and `:1768`, `defaultCase` `:1776`, `forAtomicBlock` `:1835-1868`, `generateFunctionalBody` `:2880`, `FieldVar` at `:4822` and `MutableFieldVar` at `:4860` inside `forObjectDeclPrePass` (`:4598`), `conditionallyCastParameter` `:7289` and `:7297`. `VarCodeGen.java`: the two classes at `:174` and `:202`.
- `OverloadedFunction.java` `:511`, `:772`, `:1165`; `FTraitOrObject.java:97-104`; `OverloadingOracle.scala:77-83`; `BaseTask.java:285-314`.
- `atomic.tex:60-63`; `overloading.tex`, "Declarations with Static Parameters" (`:531`); `traits.tex`, "Method Declarations"; `changes.tex:4434` (row 695), `:3101` (row 542), `:1734` and `inference.tex:509` (row 307), `inference.tex:264-268` (the box with row 1019).
- `Library/FortressLibrary.fss:2189-2195`, `Library/String.fss:148-158`, `Library/OneShotFlag.fss:18`.
- Ledger rows 990, 732, 991, 81, 875, 319, 997, 998, 550, 542, 697, 785, 1036; F-34, F-53, F-75, F-361; the rehearsal's W6 (27 classes, 244 methods), W7 (23 lines), W9, W16.
- The tests that the sections promote or run exist under the names given.
- `git diff --stat c0c35b4f9e main` over the code, the library and the build prints nothing.

### F. Each repair against the team's sources

- **M.** `traits.tex:584-590`: a trait inherits a method except one "whose parameter type ... is equal to the parameter type of a method declaration that occurs in the trait declaration". It asks for M1. An api's method without `abstract` is a declaration with a body in its component: M2.
- **K.** P-60 and P-146, which the specification states; the checker accepts the programs today, and the JVM refuses them. It asks for the cast.
- **L.** `label.tex:51-65` and `:73` (a `finally` clause between); `parallelism.tex:95-100`; `atomic.tex:60-63`. It asks for the construct, and for the retained writes that L tests.
- **A.** `atomic.tex`, "Atomic Expressions"; row 319's lost updates. It asks for both.
- **V, step 2.** `overloading.tex:555-559`, the Return Type Rule, refuses `P998.fss`'s pair. It asks for the refusal. For the valid direction, finding B1.
- **X.** The paper's theorem and proof (`overloading-check.tick:167-184`) and the specification's rule accept `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`: below an object type is only the object, and each instance that takes a `Circle` returns a type at or above `Circle`. It asks for the repair. The specification's refused pair at `trait Round` stays refused by X1's rule, since the instance at `Circle` meets `Round`.

### G. The merge of run 1

**The gather can merge the six rungs.** V and X share no file with the others or with each other. M, K, L and A meet in `CodeGen.java` by declaration:

- M: `:769-1690`. K: `:7289-7321`, the returned value in `generateFunctionalBody` (`:2880`), and callers, two of them at `:1756` and `:1768`. L: new members above `:1776`. A: a new member below `:1868`, and `:4813-4862`.
- The closest pair is K's caller at `:1768` and L's new members above `:1776`: seven unchanged lines lie between (`:1769-1775`), so the hunks do not touch.
- M's range names more than M needs: `:1499-1690` holds `sayWhat`, `doStatements` and `joinForkedArms`, which no forwarder uses. L's section does not give L `joinForkedArms`; if L's `exit` out of a parallel loop needs an edit there, it is in M's range by the record's words, and M will not be there. No conflict follows.
- In the specification: K at `changes.tex:4434`, X at `:3101`, V at `inference.tex:264-268`. Apart.

**No pair changes one behaviour two ways, and none needs another's result.** V and X bring the two paths to one rule, each on its own path and with its own tests. K reports a cast that a forwarder or a field needs, and builds none there. Two things that only the merged tree shows, for the gather or the post-batch review: an `exit` out of an `atomic` expression, which is A's construct and L's, and which neither rung tests; and the distance stage's shadow patch on a `CodeGen.java` with four rungs' edits.

Run 2: T builds on M's forwarders, O needs V's repairs, and E may meet K at a returned value; the record puts the three after run 1 for these reasons, and no decision on record is against it.

### H. The measure and the estimate

- **The measure, 24.** The planner took it with `probes/planner/codegen-measure.sh` in a scratch worktree: the script applies `measure-hacks.patch` (the rehearsal's naming tables, the trait table's search and `NN32`'s two getters, F-34), builds, and runs `plan-25/probes/codegen.sh`. So it is the count of a patched tree, as F-34 says, and it counts a declaration at its first wall. It does not see the walls of M, K and T, whose classes are emitted and fail at load. The record says so. 24 − 4 (`label`) − 1 (the `atomic` expression) is 19, and 21 if two of the four meet a second wall; the figures agree. I did not run it again.
- **The estimate, 4.3 million for run 1.** Climb batch 32 wrote 5.00M for seven rungs: the workers 2.35M, the skeptics 1.63M, the fixed roles 1.02M, with no judge and no repair round (`reviews/batch-32-review.md:152-164`). Six rungs at those rates: 2.0M, 1.4M and 1.0M, 4.4M. A line through climb batch 30 (three rungs, 2.9M) and climb batch 32 gives 4.5M. So 4.3M is a little low and well inside the record's range of 3.6M to 5.4M. The range holds no judge or repair round beyond its top. Five of the six rungs run a whole suite on four shared CPUs, so the time, five hours and a half, is the figure more likely to be passed.

### I. The section for the curator

It lets him judge each rung after the fact: what changes, a program with its message, each fork with its default and the other way, what is left out and why, the cost. It has lists and no table, no contraction outside a quoted message, and its terms are defined at its head. What I changed is in section A, items 4 to 10. What stays, which I did not change for lack of time: a number of passive sentences ("No rung was held out", "is repaired first", "is refused"); "wall" and "rung" are the record's own words, defined once and used so; fork B2 stands under rung A with a B name.
