<!-- Climb batch 14, rung A (rung-argument-context): the skeptic's review of the worker's head a1e405289, its findings, its fixes on wip/rung-argument-context and its verdict. Written by the rung's skeptic (Opus) in /home/user/fortress-argctx. -->

# Rung A: the skeptic's review

Verdict: **approved**, with one fix of the change and four corrections, none contested.

The head judged is `a1e405289`, the worker's last commit. My commits, in order:

- `a0cbc430f`: the worker's report and record, from the run's journal.
- `273f8e5b3`: the fix (finding 1).
- `641ccf235`: the tests' corrections (findings 4 and 5).
- `07f8b31bc`: the specification's corrections (findings 2 and 3, and the sentences REPORT.md's section 7 lists).
- `1ef4ad330`: the record's corrections (finding 6).
- This file.

## 1. What I checked

1. **The count and the distance.** I read the worker's tables against 13b's landed ones. The count table equals `climb-batch-13b/gate/checker-count.txt` line for line (`diff`, no output). `distance/compare.sh climb-batch-13b/gate/distance.txt <worker's table>` prints `DISTANCE SAME   85`. Per site, the worker's `errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`, counted by (location, message), gives 85 and 85, with 0 new and 0 cleared. Both tables are of the worker's head code. `778ab8db1` is the only commit that changes code, and both stages ran after it: the count's table is dated 03:04Z and the distance's 03:32Z. Following the brief, I ran no stage after my fix.
2. **Test first, in the worker's transcript.**
   - Tests written: 02:52-02:53Z.
   - The base run (call `8fHSiq`, `junit.sh base`) ran from 02:53:18 to 02:53:28Z, on the seeded base build. It printed the three lines that `recordedFailure` quotes and `Tests run: 19,  Failures: 15`.
   - The patch was applied at 02:54:39 (`i6HfnY`), and its build started at 02:55:57 (`Y6oJNj`), so the failure was seen before the edit was built.
   - The pass, `junit.sh edit1`, ran at 02:58:18 and printed `OK (19 tests)`. No code changed after it.
   - `ant testQuick` printed the lines that `recordedPass` quotes, with `Caches ... kept`.
   - `InferBigOperatorExpectedType` was written after the build. The old code refused it through the harness (`old-fortress.sh ... junit`): `Right-hand side has type Number, but declared type is ZZ32.` and `Tests run: 3,  Failures: 3`.
   - The controls' `XXX` test was shown red on a deliberate fix (`gSTbar`, `DQsghX`). The walk `XXX` test printed `OK Saw expected exception`.

   The order holds.
3. **The diff.** The Scala diff's changed lines equal the probe's wide patch line for line: I extracted the patch from `argument-context-probe.md` with the report's `awk` line and compared the `+`/`-` lines with `git diff 5bf8a7c84...a1e405289 -- ProjectFortress/src/`, which gave no difference. I read every line against P-51, P-49, the brief's fork list (`explorations/coordinator/CLIMB-BATCH-14.md:92-94`) and the chapter text that the rung wrote. Findings 1 to 3 come from this check.
4. **Precedent.** A `TryChecker` retry under an expected type is the checker's own device: `inferFnExprParams` (`Functionals.scala:510-537`) and the three multifix sites (`Operators.scala:181-184`, `:369-372`, `:399-402`). Every call form reaches `typedApplication` (callers `:597`, `:638`, `:1038`, `:1224`), so subscripts, methods, operators and constructors share the retry. I measured three of these forms myself (section 3, `SkShapes`). No helper in the checker tells a written static argument from an inferred one: the checked form carries static arguments either way (`Functionals.scala:1042`, `:1073`). For that reason my fix reads the unchecked argument.
5. **The tests.**
   - Each test is named by its topic and has one comment line.
   - The two assertion messages cite file and section, and the sections exist (`inference.tex:47`, "The Static Arguments of a Call"; `reductions.tex:12`, "Summations and Other Reduction Expressions").
   - Each test exercises its shape.
   - Finding 4: `InferCallArgumentKeepsFit` pinned a value that only row 412 gives.
6. **My own programs.** Section 3 gives them, under walk and on the compiled path, with old against new.
   - The diff has no mutable variable, field, `atomic` block or write to a library's state. So I ran my programs at `FORTRESS_THREADS=1` only, and the harness runs ran at 4.
   - Walk's code is not touched, and walk gave the same output on the old code and the new for every program.
7. **Homes.** Section 4.
8. **The ledger and the sibling sites.**
   - I searched the ledger for "expected type argument", "only its result", "retry", "TryChecker", "static argument bound" and "expected type walk", and read rows 425, 455, 510, 535 and 642.
   - Row 510, walk's typed binding, is NEW-A-1's sibling. Row 412, the `Object` bound, bears on finding 4. Row 425 is half repaired.
   - The other path, walk, is NEW-A-1.
9. **The report.**
   - I opened each line that the five provenance lines cite. Each says what is claimed: `var-ref.tex:38-40`, `inference.tex:129-154`, `Functionals.scala:510-537`, `:892-895`, `:903-908`, and `argument-context-probe.md:38-161`.
   - The date of 9 October 2026 for the decision holds (`4dc35f685`: "his \"Q48(b) wide, go ahead\" (about 21:57 UTC)").
   - The record's FACTS hand-over missed two entries (finding 6).
   - The three sentences that REPORT.md section 7 lists are corrected (finding 3). The worker left them for the gather.
10. **Competing declarations.** None. I searched both test corpora and `ProjectFortress/src/com/sun/fortress/` for each new test name, and for the new `typedApplicationOfChecked`, `retypedApplication`, `retypable` and `writesStaticArgs`. The other rungs' branches add no test of the same names (`git diff --name-only 5bf8a7c84...origin/wip/<rung>`).
11. **The failure mode.** The rung turns refusals into accepted programs, and every such run that I measured gives the value that the chapter gives. One accepted program changes its value quietly: finding 5, a multifix application. This is a point to report. I did not find a program where the retry turns a clean refusal into a crash. The distance's two `#crash` rows are the same before and after.

## 2. Findings, and what I did with each

### Finding 1 (a defect of the change): a call that writes its static arguments stopped fixing a generic enclosing call

`retypedApplication` instantiates a generic declaration of the enclosing call from the arguments that it does not check again. It counted among those it checks again every call whose checked form carries static arguments, written or inferred (`retypable`, `Functionals.scala:903-908`). So `pair(mk(), BoxT[\ZZ64\](2))` and `pair(mk[\ZZ64\](), mk())` stayed refused, though `pair(mk(), b64)` compiles. This contradicts three sources:

- P-51: "an argument that is a call with inferred static arguments is checked again".
- The brief's fork 5 (`CLIMB-BATCH-14.md:94`): "arguments that write their static arguments are retried too, to no effect".
- The chapter text that the rung wrote: instantiated "by the arguments that are not so typed" (`inference.tex:152-153`).

The probe's patch reads its fork 2 (`:92`) over its fork 5 on exactly this case. P-51's definition of the retried argument settles which reading holds.

The ways I listed:

1. Count an unchecked argument that writes its static arguments among the instantiating arguments, and keep retrying it, as fork 5 is built. (Taken.)
2. Stop retrying such arguments. That is fork 5's way not taken, and it departs from the brief's "retried too".
3. Rewrite the text so that such an argument does not instantiate. That is against P-51's definition and fork 5's "to no effect".
4. Instantiate from all arguments first, and fall back. I rejected it: `BoxT[\Object\]` and `BoxT[\ZZ64\]` give no instance.

The fix is `273f8e5b3`. `writesStaticArgs` (`Functionals.scala:910-924`) reads the head of the unchecked argument: the front of a tight juxtaposition or math primary, a `_RewriteFnApp`'s function, a functional reference, an operator application or a method invocation. It is used at `:867`. An argument it does not recognise keeps the patch's behaviour.

Its test is `ProjectFortress/compiler_tests/InferCallArgumentWrittenStaticArgs`.

- It failed on the worker's head, before my edit:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests InferCallArgumentWrittenStaticArgs.test
      # junit.sh skhead 2026-10-14T04:15:30Z; ... tree a0cbc430f
          - [\U extends Object\](BoxT[\U\], BoxT[\U\])->String is not applicable to an argument of type (BoxT[\Object\], BoxT[\ZZ64\]).
          - [\U extends Object\](BoxT[\U\], BoxT[\U\])->String is not applicable to an argument of type (BoxT[\ZZ64\], BoxT[\Object\]).
      Tests run: 3,  Failures: 3,  Errors: 0

- After the edit was built (`ant compileAll`, then the library order), it passed beside every test of the rung:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfix ProjectFortress/compiler_tests InferCallArgumentWrittenStaticArgs.test InferCallArgumentMultifix.test InferCallArgumentKeepsFit.test InferCallArgumentContext.test InferLoneUnionClosedTrait.test InferCallArgumentOverloaded.test InferCallArgumentGeneric.test InferCallArgumentForms.test XXXInferCallArgumentControls.test InferBigOperatorExpectedType.test InferBigOperatorUnwritten.test
       Saw expected failure
      OK (31 tests)

This fix is settled, by P-51 (`POSITIONS.md:50`), `CLIMB-BATCH-14.md:94` and `inference.tex:152-153`. It is also a departure from the probe's patch, listed as a point to report.

### Finding 2 (a correction): two sentences the rung wrote were false

1. The paragraph's guarantee. The paragraph said: "So a declaration that is applicable to a call with its arguments typed without an expected type is never passed over for one that only an argument typed again makes applicable". The same clause stands in the entry's Change and Rationale. It is false where that declaration's return type does not fit the expected type. My program `SkPassedOver` (section 3) shows it: `f(x: Any): Any` is applicable to `f(mk())`, and the head compiles `s: String = f(mk())` to `f(b: BoxT[\ZZ64\]): String`. The base refused that program. The guarantee is now said of the declaration that the section accepts (`inference.tex:203-208`, `changes.tex:2073-2075`, `:2148-2151`), as P-49 keeps an attempt "when its result converts to the expected type".
2. The scope of the context. The text said "a call that does not write its static arguments". That also reads on a call of a declaration with no static parameters, such as `p(mk())` for `p` overloaded on `BoxT[\ZZ64\]` and `BoxT[\ZZ32\]`. The checker does not type such a call again, and P-51 does not ask it to (`SkPlainInner`, section 3). The text now says "a call with inferred static arguments", P-51's words, in the list, its two boxes, the paragraph and the entry's Change (`inference.tex:150`, `:170-171`, `:193`, `:335`; `changes.tex:2066`).

These corrections are in `07f8b31bc`. They are settled by P-49 (`POSITIONS.md:48`) and P-51 (`POSITIONS.md:50`).

### Finding 3 (a correction): sentences the change makes false, which the worker listed and left

1. The entry's Effect said "Until 9 October 2026 it gave none there (row 455)". The checker changed with `778ab8db1`, on 14 October 2026; 9 October is the decision's date. The entry's earlier Effects date the checker's change by its commit (rows 644 and 660, `054c4bcfd` and `7207e2719`, 9 October). The Effect now says 14 October (`changes.tex:2182`).
2. The Effect now says three more things:
   - an argument that writes its static arguments fixes a generic enclosing declaration (finding 1);
   - walk can run another declaration, not only fail (`SkPassedOver`, `SkMultifix`; `changes.tex:2222-2224`);
   - the condition is a call "with static arguments".
3. The three row-425 boxes of REPORT.md's section 7 now say that the reduction's expected type reaches the big operator where the type at its bound does not fit it:
   - `inference.tex:345-352`, the revival-inference box;
   - `reductions.tex:38-44`, the revival-reductions box, outside the rung's files;
   - `changes.tex:1056-1060`, the Rationale of "Reductions whose element type nothing fixes", outside the rung's entry.

   No other rung edits these lines. Rungs S, P and W have their `changes.tex` hunks at `:2303` and below.

These corrections are also in `07f8b31bc`. The specification builds: `./ant genSource` and `./ant tex` both end `BUILD SUCCESSFUL`, and the skill's grep of `fortress.log` matches the 41 lines of the macro's own definition, as on the worker's build. Settled by the brief ("List every other sentence your change makes false"), my role's "a sentence of the specification the change makes false. Make it", and `specification.md`, "the text claims no more than holds".

### Finding 4 (a correction): `InferCallArgumentKeepsFit` pinned row 412's bound

The test printed `over3(Any) BoxT[Object]`. `BoxT[Object]` is `mk()`'s instance at the compiled path's `Object` bound, which is row 412's departure from the bound `Any` that `\secref{type-param}` gives. The test is about the declaration kept (P-49). It now prints `another instance` for every instance but `BoxT[ZZ64]`, which holds under either bound (`641ccf235`). It is a guard, and it passes on the old code (`old-fortress.sh ... junit .../InferCallArgumentKeepsFit.test`: `over3(mk()) -> over3(Any) another instance`, not among the failures) and on the head (`junit.sh skfix`, above).

### Finding 5 (a correction): a chosen declaration changed, and no test showed it

Under the multifix rule, a program accepted before now runs another declaration. `chained-multifix.tex` says: "the compiler first checks to see whether there is a definition for that operator that will accept n arguments. If so, that definition is used". With the argument context, a multifix declaration accepts operands that it accepts only when they are typed again. The new test is `InferCallArgumentMultifix` (`641ccf235`). On the old code, through the harness:

    old-fortress.sh /home/user/fortress-base14 .../tmp/old-caches junit .../InferCallArgumentMultifix.test .../InferCallArgumentWrittenStaticArgs.test .../InferCallArgumentKeepsFit.test
    . run .../InferCallArgumentMultifix (526ms) mk() OPLUS mk() OPLUS mk() -> binary
    Tests run: 9,  Failures: 4,  Errors: 0

On the head it passes (`junit.sh skfix`, above). This is a point to report.

### Finding 6 (a correction): the record

- `record.md`'s FACTS hand-over named F-87 only. F-55 and F-56 also say that the checker keeps the expected type "not at another call's argument (row 455)" (`FACTS.md:48`, `:49`).
- The fact now names the written argument and the multifix choice.
- NEW-A-1's notes now give walk's other face, running another declaration. The notes are 696 characters and the row 1,125.
- The handover and the Revival change section are brought up to date.

These corrections are in `1ef4ad330`.

## 3. My programs: old against new

Each program ran on the compiled path, both on the head's build (`FORTRESS_CACHES=<a private copy of the tree's caches> bin/fortress compile P.fss`, then `bin/fortress run P`) and on the old code (`old-fortress.sh /home/user/fortress-base14 /home/user/fortress-argctx/tmp/old-caches compile P.fss`, then `run P`). Walk ran on both codes (`bin/fortress P.fss`, `old-fortress.sh ... P.fss`). All five programs declare `object BoxT[\T\](v: ZZ32) end`, `mk[\T\](): BoxT[\T\] = BoxT[\T\](1)`, and an `instanceName` like the rung's tests.

- `SkPairWritten`: `pair[\U\](b: BoxT[\U\], c: BoxT[\U\])` with `pair(mk(), b64)`, `pair(mk(), BoxT[\ZZ64\](2))` and `pair(mk(), mk[\ZZ64\]())`.
  - The old code refuses all three (`File SkPairWritten.fss has 3 errors.`).
  - The worker's head accepts the first and refuses the other two (`:17:27-52` and `:18:27-49`, "... is not applicable to an argument of type (BoxT[\Object\], BoxT[\ZZ64\]).", `has 2 errors.`): finding 1.
  - After my fix it runs all three: `byConstructor BoxT[ZZ64] and BoxT[ZZ64]` and `byWrittenCall BoxT[ZZ64] and BoxT[ZZ64]`.
  - Walk, old and new, stops: "Unification error: Closure/Constructor for pair param 2 (c:BoxT[\Any\]) got arg BoxT[\ZZ64\]".
- `SkPassedOver`: `f(x: Any): Any = "f(Any)"`, `f(b: BoxT[\ZZ64\]): String = "f(BoxT[ZZ64])"`, `s: String = f(mk())`.
  - The old code says "Right-hand side has type Any, but declared type is String."
  - The head prints `f(BoxT[ZZ64])`, which is right by the paragraph's rule. It makes the paragraph's guarantee false: finding 2.
  - Walk, old and new, prints `f(Any)`: NEW-A-1's other face.
- `SkShapes`: `takesBox64(wrapT(z32))` with `z32: ZZ32`, the constructor `Holder(mk())` of `object Holder(b: BoxT[\ZZ64\])`, and the generic method `takesBox64(Maker.mkm())`.
  - The old code refuses all three.
  - The head prints `coerced BoxT[ZZ64]`, `constructed BoxT[ZZ64]` and `method BoxT[ZZ64]`.
  - Walk, old and new, says "got arg BoxT[\Int\]".
- `SkPlainInner`: `p(b: BoxT[\ZZ64\])` and `p(b: BoxT[\ZZ32\])`, with `takesBox64(p(mk()))` and `bound(): BoxT[\ZZ64\] = p(mk())`.
  - The old code refuses both.
  - The head, and the head after my fix, refuse the first (`:15:35-39`, "Could not check call to function p", both arms "not applicable to an argument of type BoxT[\Object\]") and accept the second. The inner `p(mk())` has no expected type when it is typed first, and P-51 does not type a call without static arguments again: finding 2's scope.
  - Walk, old and new, says "Failed to find any matching overload, args = (BoxT[\Any\])".
- `SkMultifix`: `opr OPLUS(a, b, c: BoxT[\ZZ64\])` and `opr OPLUS(a: Any, b: Any)`, with `mk() OPLUS mk() OPLUS mk()`.
  - The old code prints `binary`, and the head prints `multifix`: finding 5.
  - Walk, old and new, prints `binary`.
- `SkNest2` to `SkNest8`: `takesBox64(idB(...idB(mk())...))`, nested 2 to 8 deep, with `idB` overloaded on `BoxT` and `CellT`. Each compiles on the head in 2.4 to 3.0 s. The retry's re-checks do not blow up with depth here. I kept no timing.

## 4. Defects and their homes

| Defect | Home | Where |
|---|---|---|
| Row 455's faces | 1, repaired | `InferCallArgumentContext`, and the shape tests |
| Row 535's pinned refusal | 1, repaired | `InferLoneUnionClosedTrait` |
| Row 425, the plain-bounded half | 1, repaired | `InferBigOperatorExpectedType`; the F-bounded half stands (`InferBigOperatorUnwritten` and the row) |
| Finding 1, the written argument | 1, repaired by my fix | `InferCallArgumentWrittenStaticArgs` |
| Walk gives an argument no expected type, so it fails or runs another declaration | 2 | `ProjectFortress/tests/XXXInferCallArgumentWalk.fss` and NEW-A-1 (`record.md`); `SkPassedOver` and `SkMultifix` are its other face, noted in the row |

The multifix choice (finding 5) is the compiled path doing what `chained-multifix.tex` says, not a defect. It is gated by `InferCallArgumentMultifix`.

## 5. The suite

My fix changes the checker's Scala, so the tracks that it reaches ran once, after my last change of code (`273f8e5b3`). The tests were those of `641ccf235`, all present in the tree when the suite read its lists.

    ant testQuick
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 296.952 sec
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 308.603 sec
    [junit] Tests run: 1144, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 504.529 sec
    BUILD SUCCESSFUL
    Total time: 8 minutes 31 seconds

The compiler track has 1,144 tests, the worker's 1,135 plus 9: `InferBigOperatorExpectedType`, which the worker's run did not read, and my two new tests, three cases each. The tables in REPORT.md are those of the worker's head. I ran no count or distance stage after my fix.

## 6. Where I differ from the worker's account

- REPORT.md section 8 says that fork 5 is retried "to the same type, and passed over". On the worker's head, such an argument also stopped fixing a generic enclosing call (finding 1). "No departure from the probe's patch" no longer holds after my fix.
- REPORT.md section 8, "Not reached", says that no call's chosen declaration changes beyond the reduction. `SkMultifix` and `InferCallArgumentMultifix` show one (finding 5).
- Decision 7 left the three row-425 boxes for the gather. My role makes such corrections on the branch, so they are made (finding 3).
- The worker's commits carry the skill's footer. My first commit's footer names the model by its tier, "Claude Opus 5.5", where the skill gives "Claude". It is pushed and stays; my later commits use the skill's footer.

## 7. For the gather

`changes.tex:2224` cites "row~NEW-A-1". The row gets its number when the gather adds it, and the gather puts the number in that line. The ledger's notes and closes in `record.md` are the gather's too: row 455's close by `778ab8db1` with `InferCallArgumentContext`; rows 535, 425, 642, 577 and 510.
