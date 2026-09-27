# Judge, rung R (`rung-unknown-size-arm`): the skeptic's refusal

*Row numbers, noted at the merged-diff review of climb batch 6 and restated when rung R landed as a follow-up (`d65892d34`): the rows 431, 432 and 433 this file cites are rung R's provisional numbers, which the ledger numbers 446, 447 and 448; the ledger's rows 431-433 are rung F's (`explorations/compile-ladder/climb-batch-6/RECORD.md`, rung R, "Landed as a follow-up").*

**Decision: repair.** The edit stands as it is; no source file changes in the repair round. The skeptic is right on each of its four required corrections. The record's account of what the refusal leaves alone is mis-measured on row 431 and mis-attributed on row 432. D3's and D6's stated grounds, the new FACTS entry's sentence on rows 431 and 432, and the report sections that repeat them have to be rewritten from the measurements already on the branch. The test the skeptic asks for on the function-value form is owed. One part of the skeptic's framing needs a measurement before the record may repeat it: whether the edit *repairs* that form's compiler crash or only *pre-empts* it for the shape it refuses. Both of the skeptic's recommended rows get a home in this round, as notes on existing rows, for the reasons in section 4.

What I read: the net diff `git diff e5414f5bf...HEAD`, the eight milestones `60b451f65` to `62b89de19`, `record.md`, `SKEPTIC.md`, the worker's report text as the brief quotes it (`REPORT.md` is not on the branch because the harness refused its write), the probes named below, and each specification passage at the lines cited. I ran no build and no test.

## 1. What holds (the worker is right, and the skeptic agrees)

- **The edit and where it sits (D1).** `checkApplication` evaluates every arm (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:449`). It keeps the failed arms' errors and reports them only when no arm is left (`:454-456`). This is the one place where a failed arm disappears. `isDynamicallyApplicable` is reached only over the survivors (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1156-1160`). The refusal belongs at `Functionals.scala:466-473`, where the worker put it. SKEPTIC.md section 3 confirms it.
- **D2** (the defaulted field in `exceptions/ApplicationError.scala`), **D4** (the guard test `NatKnownSizeArm`) and **D5** ("more specific than every candidate") are all sound. D5 is the specification's own wording: "no other applicable declaration is more specific than them" (`Specification/basic/overloading.tex:274-276`). The skeptic's `SkNotMeet` (`probes/skeptic/diff.txt:36-55`) shows that an arm that is not the most specific still compiles.
- **The recorded failure.** It is `probes/pre-edit-tests.txt`, in `60b451f65`, which comes before the edit `65a2bcb19`. The recorded pass, the 44 nearest compiler tests (re-run by the skeptic, `probes/skeptic/near-rerun.txt`), the ladder subset and the checker count of 125 with byte-identical output all stand. So do the two walk `XXX` files: row 416 and row 418, home 2.
- **D6 as a decision.** The dynamic call `ee(a)`, for `a: Any`, is not refused. For that call's static type the rules pick `ee(x: Any)`, the only arm applicable to `Any` (`overloading.tex:170-175`). Answer 12 speaks of "the arm the rules would pick" (`explorations/coordinator/POSITIONS.md:162`). Refusing every call whose static type lies above a sized arm's domain would reach calls whose values never select that arm. The decision stands and goes to Pavol with row 431. Only its stated ground changes (section 2).

## 2. What is wrong in the record (the skeptic is right)

- **Row 431 is mis-measured.** `probes/diff/UkDynAny.fss:8` and `UkDynAnyVal.fss:8` initialise `a: Any = 5`. That is a numeral, which the compile path carries as `IntLiteral` (row 79's mechanism). With a genuine `ZZ32` in the variable (`probes/skeptic/SkDynZZ32.fss:8-10`), the compiled run prints **1**, dispatching to the sized arm just as walk does (`probes/skeptic/diff.txt:238-254`). When that arm reads its size (`SkDynZZ32Val`), the compiled run dies with `NumberFormatException: For input string: "n"`, before and after the edit alike, and walk dies with `undefined variable [n]` (`diff.txt:255-280`). The row's defect statement ("never dispatches to that arm"), its class ("divergence ... dispatch") and its second candidate ("keep the compiled dispatcher's skip") are all false: there is no skip. The worker's 2 is the numeral split, a different matter (section 4).
- **Row 432 is mis-attributed.** `SkTypeRangeSingle` is the generic arm alone, with no overload. It compiles and dies with the same `NoClassDefFoundError: java/lang/Object$RTTIc` (`diff.txt:305-326`). The code gives the reason. The solver binds every type inference variable it leaves open to `BOTTOM` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:524`, through `STypesUtil.killIvars`, `STypesUtil.scala:1937-1940`). So `checkApplicableWithInference` returns a candidate for such an arm, and never a no-context error. The per-arm evaluation at `Functionals.scala:449` does not depend on the other arms, so the arm is a candidate inside the overload set too. `SkTypeRangeWhich` shows `BottomType` reaching the checker in the overloaded case (`diff.txt:327-339`). No drop is involved, and the row is not "the type analog of row 400". FACTS.md already says so in the entry the worker cites for D3: "a dead type parameter becomes `BOTTOM` and the call compiles" (`explorations/coordinator/FACTS.md:62`).
- **D3's sentence "an arm whose unknown parameters are all types keeps today's drop" is false for every measured shape.** What is true: the candidate is built only when a size is among the unknown static arguments (`Functionals.scala:251`), because answer 12 is about sizes. For type parameters the solver binds `BottomType`. Whether any type-only arm ever reaches the no-context error has not been measured.
- **The new FACTS entry's sentence on rows 431 and 432** (`record.md:9`), **row 400's appended note** ("the type analog row 432", `record.md:19`), **the handover line** (`record.md:35`), and the report's summary, divergences list, sections 8, 9 (D3 and D6), 10 and 13 all repeat the two readings above. They must be corrected.

A point for Pavol that follows from row 432: the overloading judgement gives this as its reason for treating a dead type differently from a dead size: "A dead type parameter becomes bottom and can never be observed" (`explorations/reviews/overloading-judgement.md:213`). `SkTypeRangeSingle` observes it. The compiled run builds `BoxT[\BottomType\]` and dies. Walk builds it and prints `other`.

## 3. The function-value form (the skeptic is right that a test is owed; its "repaired" is not yet shown)

`SkFnValue` (`f = ee; f(z)`) crashed the compiler on the untouched checker with `IndexOutOfBoundsException: Index 0 out of bounds for length 0`. After the edit it is refused with "Could not check function application / - Could not infer static argument nat n without context." (`probes/skeptic/diff.txt:167-179`).

The specification settles what that call means. A variable may be bound to an overloaded function (`Specification/basic/functions.tex:38-40`). A call through it "is dispatched to the declaration associated with the most specific type of T applicable to A" (`:209-216`). That is the sized arm, whose size the call cannot fix, so answer 12's refusal applies at the function-application site (`Functionals.scala:695`; the message kind is `ApplicationError.scala:44-45`). The refusal there is this rung's behaviour, so it gets a gated test. That is home 1, as the skeptic says.

The skeptic's further claim, that the edit *repaired* the crash, rests on the refused shape alone. Before the edit, the flow of `f = ee; f(z)` was: the sized arm fails with the no-context error, and the `Any` arm is the one candidate. After the edit, a function value whose sized arm is *not* the rules' pick follows exactly that flow (`dd[\nat n\](x: Any)` beside `dd(x: ZZ32)`; `f = dd; f(z)`). If the crash sat downstream of `checkApplication`, that shape still meets it, and the edit only pre-empts the crash where it refuses. The skeptic's `norm` filter drops stack frames (`probes/skeptic/diff.sh:8`), so the throwing site is unknown. The repair round measures this (instruction 3) before the record says "repaired".

## 4. The two recommended rows: their homes (decisions taken here)

- **The numeral split** (`SkLiteralArg`: `ee(5)` gives walk 1, compiled 2; the worker's `UkDynAny` and `UkDynAnyVal`). The specification's reading favours the compiled run:
  - Numerals are not converted to a number type and "have their own types" (`Specification/basic/expressions/literals.tex:132-141`).
  - A declaration applicable without coercion is selected first (`Specification/basic/conversions-coercions.tex:455-458`).
  - The run-time answer then turns on the run-time type of a numeral held where `Any` is expected. That is the very mechanism the ledger scores the other way for `typecase` (row 79: compiled `other` for the literal is "different, wrong"). Row 79's specification column is empty.

  **Decision:** a note appended to row 79 carrying the probe, the capture and the two passages, and stating the conflict. There is no gated test in this rung.

  Alternatives rejected:
  - an `XXX` walk test asserting 2. It would write one side of a standing ledger conflict into the gate before anyone reconciles it, and it would be a third `ProjectFortress/tests/` file the record does not list.
  - a new row. The mechanism is row 79's.

  This does not fit the three homes rule. The reason is a conflict between the specification's reading and a standing ledger verdict, not a silent specification. It goes to Pavol.
- **No declared-type context for a static argument** (`SkCtxFix`, `SkCtxSingle`, `SkCtxArg`, `SkCtxType`). Both paths refuse, and the inference chapter is a placeholder (`Specification/basic/inference.tex:15`). This is home 3.

  **Decision:** a note appended to row 21, the ledger's row for the inference chapter's silence, rather than the new low row the skeptic suggests. The alternative, a new row, adds a row with no fix location of its own.

## 5. Instructions for the repair round

Numbered and in order; they are also the structured result's `instructions`.

1. **Set up and check the build.**
   - Work in `/home/user/fortress-arm` with the prefix's shell setup.
   - Confirm that `git log --oneline e5414f5bf..HEAD` ends at this judgement's commit.
   - Confirm that `tmp/sk-base/classes/com` exists. It is the skeptic's untouched-checker shadow: `Functionals.scala` and `ApplicationError.scala` of `e5414f5bf`, compiled by scalac and put first on the classpath by `probes/skeptic/diff.sh:4-6,17-18`. If it is missing, rebuild it that way from `git show e5414f5bf:<path>`.
   - Run `../bin/fortress junit compiler_tests/XXXNatUnknownSizeArm.test` from `ProjectFortress/` as a smoke test that the rung's checker is the built one. No source edit is made in this round, so `ant compileAll` is needed only if that smoke test fails.
2. **Write the probes and the new test program.**
   - `probes/diff/UkFnDead.fss`: `dd[\nat n\](x: Any): ZZ32 = 1` beside `dd(x: ZZ32): ZZ32 = 2`, then `f = dd` and `println(f(z))` for `z: ZZ32 = 5`. The specification's answer is 2 (`functions.tex:209-216`).
   - `probes/diff/UkFnPlain.fss`: `hh(x: ZZ32): ZZ32 = 1` beside `hh(x: Any): ZZ32 = 2`, `f = hh`, then `println(f(z))` and `println(f("s"))`. The answers are 1, 2. It has no size and is the control.
   - `ProjectFortress/compiler_tests/XXXNatUnknownSizeFnValue.fss`: `SkFnValue`'s shape (`probes/skeptic/SkFnValue.fss`), with the one comment line pointing at `REPORT.md`, as in `XXXNatUnknownSizeArm.fss:1`.
   - `XXXNatUnknownSizeFnValue.test`, reading `tests=XXXNatUnknownSizeFnValue`, `compile`, `compile_err_WIcontains=Could not check function application - Could not infer static argument nat n without context.` The key is whitespace-insensitive containment (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:155-163`). It pins the site as well as answer 12's message.
   - A new file, not an extra line in `XXXNatUnknownSizeArm.fss`, because that file's recorded failure is on its committed content.
   - Grep the new names over `ProjectFortress/` and `Library/` as report section 11 did.
3. **Measure.** Use the prefix's `run_bg`/`wait_for` to run `bash explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.sh` over:
   - `probes/skeptic/SkDynZZ32.fss`, `SkDynZZ32Val.fss` and `SkTypeRangeSingle.fss`;
   - `ProjectFortress/compiler_tests/XXXNatUnknownSizeFnValue.fss`;
   - `probes/diff/UkFnDead.fss` and `UkFnPlain.fss`.

   Capture to `probes/repair-diff.txt`, with the machine line of protocol section 6 at its head. Then capture one unfiltered stack trace, without the `grep -v '^\s*at '`, for each Java-level failure: the `IndexOutOfBoundsException` of the shadow's compile of `XXXNatUnknownSizeFnValue.fss`, any crash of the two `UkFn*` probes, the `NumberFormatException` of `SkDynZZ32Val`'s run and the `NoClassDefFoundError` of `SkTypeRangeSingle`'s run. Put them in `probes/repair-stacks.txt`, and name the first frame outside the JDK in each.
4. **Run the new test through the harness.**
   - `../bin/fortress junit compiler_tests/XXXNatUnknownSizeFnValue.test`, with its caches removed first as `probes/rung-tests.sh:6` does, captured to `probes/repair-tests.txt`. It must print " Saw expected failure" and `OK (1 test)`.
   - Its recorded failure is the shadow's compile output in `probes/repair-diff.txt`: the `IndexOutOfBoundsException`, which does not contain the pinned text. Say so in the report.
   - This is the home-1 assertion, and it must pass before the second skeptic runs.
5. **Settle the function-value crash from step 3.**
   - If `UkFnDead` and `UkFnPlain` compile and run with the specification's answers (2; 1, 2) on the rung's checker, the edit repaired the crash. The report may say so and name the frame from step 4 of the untouched run.
   - If either still crashes on the rung's checker, the edit only pre-empts the crash where it refuses. Then:
     - The report and FACTS entry say that, and not "repaired".
     - The surviving crash is a defect the specification settles (`functions.tex:38-40`, `:209-216`). It gets home 2: `ProjectFortress/compiler_tests/XXX<Name>.fss` with a `.test` in the form of `compiler_tests/XXXNatBoundDisp.test` (`compile`, `compile_exception_contains=IndexOutOfBoundsException`, or the harness's actual text for it). Show it "Saw expected failure" through `bin/fortress junit`, and say it is not shown red because no fix is known, as row 420 did.
     - The crash gets a new provisional row in `record.md` (next free provisional number after 432), naming the frame from step 3 as the fix location.
   - Either way, add the outcome to the differential table of report section 8.
6. **Rewrite provisional row 431 in `record.md`** from `SkDynZZ32` and `SkDynZZ32Val`, keeping the number.
   - Defect: a call whose argument's static type lies above the domain of a sized arm with a size nothing at the call fixes compiles. At run time both paths dispatch a `ZZ32` value to that arm. Where the arm reads its size, the compiled run dies with `NumberFormatException: For input string: "n"`, a Java-level message naming no Fortress construct, and walk dies with `undefined variable [n]`. Where it does not read the size, both print 1.
   - Class: a loud run-time failure with an undiagnosable message on the compiled path, the dynamic form of row 400; not a dispatch divergence.
   - Spec column:
     - run-time dispatch picks the sized arm (`Specification/basic/overloading.tex:262-276`);
     - the chapter assumes every static variable instantiated or inferred and is silent on one that is not (`:137-138`);
     - answer 12 rules on the static pick (`explorations/coordinator/POSITIONS.md:162`);
     - home 3.
   - Evidence: `probes/skeptic/SkDynZZ32.fss`, `SkDynZZ32Val.fss`, `probes/repair-diff.txt`, `probes/repair-stacks.txt` and `probes/skeptic/diff.txt:238-280`.
   - Candidates:
     - (a) extend the call-site refusal to arms not statically applicable whose domain the static type does not exclude, which reaches calls whose values never select the arm;
     - (b) refuse at the declaration an arm whose size occurs in no parameter type, the dead-size route E3 (`explorations/reviews/overloading-judgement.md:49`, `:215`);
     - (c) a Fortress run-time error at the arm in place of the Java exception, at the frame step 3 names.
   - Drop the dispatcher-skip candidate and the claim that the compiled run never reaches the arm.
   - Move `UkDynAny` and `UkDynAnyVal` out of this row into instruction 8's note.
7. **Rewrite provisional row 432 in `record.md`** from `SkTypeRangeSingle`, keeping the number.
   - Defect: a type parameter that occurs only in the return type, with nothing at the call to fix it, is bound to `BottomType` by the checker (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:524`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1937-1940`, the mechanism row 425 records for big operators). The call compiles, and the compiled run dies with `NoClassDefFoundError: java/lang/Object$RTTIc` when the body builds `BoxT[\BottomType\]`. No overload is needed. Walk prints `other`. The overloaded `UkTypeRange` dies the same way, and `SkTypeRangeWhich` hits the checker's `subtypeCompareTo(BottomType, BottomType) is not implemented` (`probes/skeptic/diff.txt:305-339`).
   - Class: implementation gap (checker binding and run-time descriptor).
   - Spec column: `BottomType` is uninhabited and "programmers must not write" it (`Specification/basic/types-vals-vars.tex:508-515`); whether inference may produce it for a static parameter is the placeholder chapter's open question (`Specification/basic/inference.tex:24-25`); home 3.
   - Candidates:
     - refuse such a call as answer 12 does for sizes, i.e. answer `inference.tex:24-25` "forbid", by extending `Functionals.scala:251`'s condition and the no-context rule to types;
     - give an instance over `BottomType` a run-time descriptor, which is walk's behaviour;
     - leave it.
   - Note in the row that it contradicts the judgement's premise that a dead type parameter "can never be observed" (`explorations/reviews/overloading-judgement.md:213`).
   - Remove "the type analog of row 400" here, in row 400's appended note and in the handover line.
8. **Append two notes in `record.md`, in the ledger section.**
   - To row 79:
     - `ee[\nat n\](x: ZZ32)` beside `ee(x: Any)`: `ee(5)` gives walk 1, compiled 2 (`probes/skeptic/SkLiteralArg.fss`, `probes/skeptic/diff.txt:180-195`). So do `ee(a)` for `a: Any = 5` and its `= n` twin (`probes/diff/UkDynAny.fss`, `UkDynAnyVal.fss`, `probes/diff-after.txt`), and `ee(l)` for `l: Any = 5` (`SkDynZZ32`'s second line).
     - The specification's reading favours the compiled run (`Specification/basic/expressions/literals.tex:132-141`, `Specification/basic/conversions-coercions.tex:455-458`). It therefore conflicts with this row's own scoring of the same mechanism for `typecase`, and that scoring cites no specification passage.
     - No gated test was written, pending the reconciliation.
   - To row 21: the declared-type-context shapes, both paths refusing (`probes/skeptic/SkCtxFix.fss`, `SkCtxSingle.fss`, `SkCtxArg.fss`, `SkCtxType.fss`; `probes/skeptic/diff.txt:56-78`, `:96-119`, `:196-218`, `:281-304`), home 3, the inference chapter silent (`Specification/basic/inference.tex:15`).
9. **Correct the FACTS lines in `record.md`.**
   - Replace the new entry's sentence "An arm whose unknown parameters are all types keeps the drop (row 432), and a call whose argument's static type lies above the sized arm's domain still compiles, the compiled dispatch never selecting the arm while walk does (row 431)" with: "A call whose argument's static type lies above the sized arm's domain is not refused. At run time both paths dispatch a `ZZ32` value to the sized arm, and where the arm reads its size the compiled run dies with `NumberFormatException: For input string: "n"` (row 431). For a type parameter the solver binds `BottomType` rather than leaving it unknown, so no type-only arm was seen refused or dropped (row 432 for what an instance over `BottomType` then does)."
   - Add the function-value site to the list of forms refused ("a function call, a function application through a value, a method invocation and an operator alike"), with `compiler_tests/XXXNatUnknownSizeFnValue`, and the outcome of instruction 5.
   - Keep the amendment to the existing entry at `FACTS.md:62` unchanged.
10. **Rewrite the report.**
    - Write `explorations/compile-ladder/rung-unknown-size-arm/REPORT.md` as the worker's full report text, corrected. Specifically:
      - the summary and divergences list;
      - section 6: the new test, its recorded failure and pass;
      - section 8: the `UkDynAny`, `UkDynAnyVal` and `UkTypeRange` rows re-read as above, with the step-3 programs added;
      - section 9, D3: "the candidate is built for sizes only; for a type parameter the solver binds `BottomType`, so no type-only arm was seen dropped; whether one ever reaches the no-context error is unmeasured";
      - section 9, D6: "not refused because answer 12 was reasoned on the static pick and a refusal here reaches calls whose values never select the arm; the compiled run does reach the arm for a `ZZ32` value";
      - D4: the compiler track rises by four, or five with instruction 5's home-2 test;
      - sections 10, 11, 13 and 14.
    - Add a section "Repair round" that names this `JUDGE.md` and lists what changed.
    - If the harness refuses the write of `REPORT.md`, say so and carry the full text in the structured result, as the worker did.
11. **Check and commit.**
    - Run the prefix's tracked-path check over `REPORT.md` (or the scratch copy of its text) and `record.md`, and fix every line it prints.
    - Commit the probes, captures, test files and `record.md` (and `REPORT.md` if written) on `wip/rung-unknown-size-arm` with the prefix's two footer lines, and push. Do not run `ant testFast` or `ant testSystem`.

## 6. For Pavol, out of the loop

- **Row 431, rewritten.** The dynamic form `ee(a)` for `a: Any` holding a `ZZ32` is not refused, which is D6 kept as a decision. Both paths then run the sized arm, and the compiled run dies with a Java `NumberFormatException` where the arm reads its size. The choice is his: extend the refusal, refuse the dead size at the declaration (E3), or put a Fortress error at the arm.
- **Row 432, rewritten.** A type parameter that occurs only in a return type is bound to `BottomType`, and the compiled run crashes building the instance. This contradicts the overloading judgement's reason for treating a dead type differently from a dead size (`overloading-judgement.md:213`, "can never be observed"). Answer 12 does not cover types.
- **The numeral split, a decision taken here.** The specification's reading favours the compiled run for `ee(5)`, and that conflicts with row 79's scoring of the same mechanism. It is recorded as a note on row 79 with no gated test, pending his reconciliation of how a numeral's run-time type should be read.
- **The function-value form.** Answer 12's refusal now also applies at a call through a function value, and it is gated. Whether the compiler crash it replaced is gone or only pre-empted is instruction 5's measurement.
