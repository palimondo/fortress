# Judge (refusal), rung W (`rung-walk-instance`), climb batch 9

Judged head: `bfb9eaa59` (the skeptic's commit on `8f5ac2199`). The last commit that changes code is `0244b0ce4`; the later commits change only `Specification/` and `explorations/`.

**Decision: repair.** The skeptic is right on all three parts of its refusal and on the five corrections. The repair adds expected-failure tests and corrects text. It changes no code and needs no build, and the interpreter-suite run on `0244b0ce4` stands, since no code state changes. It also gives homes to the two compiled-path defects the skeptic measured, which the skeptic left as recommendations; that is my decision, in section 3.

## 1. The ruling, point by point

### 1.1 Part (a), F1: a type parameter with several declared bounds. The skeptic is right.

- The code. `inferWithCoercionOrFail` installs each declared bound with `abm.meetPut` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:303-310`, `meetPut` at `:309`). For `[\T extends { Red, Round }\]` the second bound's meet is empty, and `TypeLatticeOps.meet` calls `bug` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/TypeLatticeOps.java:38-44`). The catch at `EvaluatorBase.java:312-313` then files the parameter among the `rechecks`, the parameters whose bounds mention a static parameter.
  - So `instanceOf` skips it (`:167-168`, `!rechecks.contains(tp)`).
  - `boundAtInstances` meets the bounds again, throws again at `:233`, and answers null (`:237-238`).
  - The parameter keeps `BottomType`. The skeptic's `SkTwoBoundW` on the head prints `two bounds: ZZ32 clause (T is BottomType)`.
- As a lone parameter, it falls under `selfBounded` (`:369`). The bounded join puts the first bound, `Red`, as the instance (`:112-122`), and the recheck of `Round` fails. `SkTwoBoundLone` on the head prints `Cannot unify Red(...) with Round(...) abm=T=(Red,Red)`.
- What the specification settles. Both cases are fixed by the chapter's rule. The first is a type parameter that nothing fixes; the second is a lone parameter with no narrowest candidate, since neither `Red` nor `Round` satisfies both bounds. Either way the parameter "takes the intersection of its upper bounds", and "Inference never instantiates a static parameter at BottomType" (`Specification/basic/inference.tex`, section "The Static Arguments of a Call", `:89-107`). `extends { Red, Round }` declares two bounds (`Specification/basic/trait-parameters.tex`, the type parameter's `extends` clause). The program is valid.
- The bound mentions no type parameter, so this falls inside the rung's half of row 424, as record section 3, rung W's answers line, draws it. It is also a residue of row 555.
- Walk has no intersection type to instantiate at (`FType.meet` answers a set of named types). Building one is beyond `FType.join` and `TypeLatticeOps`, the files the record gives W. So the home is 2: an expected failure and a new row.
- What the text overclaims:
  - the box sentence at `inference.tex:260-262` ("instantiates a type parameter of a function that nothing at a call fixes at its bound");
  - the box sentences at `inference.tex:178-186`;
  - Appendix I's Effect at `Specification/appendices/changes.tex:1785-1789` ("a call whose arguments have several minimal common supertypes runs where it stopped the interpreter").
- The worker did not list this case among its stops met. It is one: "A parameter nothing fixes bound to anything but its declared bound (`Bottom` ...)" (`explorations/coordinator/CLIMB-BATCH-9.md`, rung W's Stops). It is reversible.

### 1.2 Part (b), F2: decision D3 departs from the chapter. The skeptic is right. D3 stands as a reversible stop with a gate.

- The code. `fixedThroughBounds` counts `T` as fixed when the bound `A extends T` of a fixed `A` mentions it (`EvaluatorBase.java:194-210`, used at `:163`), so `T` keeps the lower bound the recheck joins into it. `SkThroughBound` on the head prints `ap BoxU[Apple]` and `apF BoxU[Apple]`.
- What the specification and the other path say.
  - The chapter's items list how a parameter is fixed: a parameter type that mentions it inside another type, the expected type through the return type, or being the whole type of a parameter. "A type parameter that neither an argument nor the expected type fixes as above ... likewise takes the intersection of its upper bounds" (`inference.tex:99-107`). No parameter type mentions `T`, so `T` takes `Any`, or `Fruit` for `apF`.
  - The decision words it as "never the value's type alone" (POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom` (the paper's instance rule)").
  - The compiled path prints `ap BoxU[Any]` and `apF BoxU[Fruit]` (`SkThroughBound.out`).
  - The worker concedes the literal reading (`decision-record.md`, D3).
- Why D3 is kept. The worker's reason is real: with the bound, `CovariantCollection.APPCOV` (`Library/CovariantCollection.fss:27`) builds its result at `Any`, and `booleanGuard` and `RangePrototype` failed (worker REPORT section 6.1). Walk has no expected type to supply what the compiled path takes from the static types. That is the same limit POSITIONS accepts for coercions ("Walk chooses coercions on the value, for now").
  - Row 157's fix does not cover this case. That fix is `MakeInferenceSpecific.forAnyType`, for `Any` in a generic's return type (ledger row 157's last note).
  - So D3 is a departure taken by decision, and the specification settles the answer. The home is 2, as the worker itself gave row 589, its D1 departure: an expected failure asserting the chapter's answer, a new row, and a sentence in the box.
- It is also a stop met ("... bound to anything but its declared bound"), reversible. It is listed for Pavol, who decides whether walk moves when it gains an expected type.

### 1.3 Part (c), F3: row 587's home is 2, not 3. The skeptic is right.

- The worker's reason for home 3 is that an elided return type is inferred over the whole program, which the chapter does not yet describe (`Specification/basic/inference.tex`, the list after "A Numeral Whose Conversions Tie"; `Specification/basic/components/type-inference.tex`).
- That leaves the elided type undescribed, but it does not leave open the one fact the pin asserts, the instance `BottomType`:
  - "No value in Fortress has BottomType" (`Specification/basic/types-vals-vars.tex`, section "Special Types", `:507-512`). So `fn () => Apple`, which returns an `Apple`, has a return type that holds an `Apple`.
  - The type of a function expression is the arrow to its return type (`Specification/basic/expressions/function.tex`, section "Function Expressions", `:39-42`), and arrow types are covariant in the return type (`types-vals-vars.tex:412`). So the `T` that `g: () -> T` fixes is a supertype of `Apple`.
  - The chapter also says without condition that "Inference never instantiates a static parameter at BottomType" (`inference.tex:104-105`).
  - The worker applies that same sentence to row 588 (its divergences list) but not to row 587.
- The compiled path gives `BoxU[Apple]` for `thunk` and `thunkF` (`SkLambda.out`).
- So `ProjectFortress/tests/InferUntypedLambdaResultWalk.fss:21` pins what the specification forbids. It becomes an expected failure.
- The specification settles only "a supertype of `Apple`", not exactly `Apple`, which would need the undescribed inference of the elided type. So the assertion asserts exactly that (section 3, decision J1).

### 1.4 The five corrections. The skeptic is right on each.

1. The box at `inference.tex:178-183` gives every lone parameter with no narrowest candidate its bound. That is not what the code does:
   - `narrowest` is called with the supertypes for a parameter in `rechecks` (`EvaluatorBase.java:369-371`);
   - the bound is taken only when `!selfBounded` (`:373`).
   So a lone parameter whose bound mentions a static parameter, itself or another, still takes the narrowest named common supertype of the arguments' run-time types (D5). A parameter of F1's kind fails instead. The box must say both.
2. The Rationale says "The type parameters it still erases are of two kinds" (`changes.tex:1694`). The Change paragraph names three (`changes.tex:1643-1651`), the box names three plus row 21 (`inference.tex:263-271`), and F1 and D3 add two more departures.
3. Decision record D2's Cost cites "the suite's trace on `0244b0ce4` records none". The trace cannot see a big operator: `bounds` is false for one (`EvaluatorBase.java:162`), and both trace calls lie under it (`:167-171`, `:175-185`). The claim has no evidence.
4. The worker's REPORT section 1 omits that `2b734f9cb` adds assertions together with the code. `git show --stat 2b734f9cb` lists `InferTwoCommonParentsWalk.fss` (+6), `InferUnfixedBoundWalk.fss` (+2), `TypecaseNoMatchWalk.fss` (+7), the two functional-method tests (+1 each), and the new `InferUntypedLambdaResultWalk.fss`. They were seen failing on the base only by probes (`probes/base-walk2.txt`). Each file had failed through the harness on the base before the first edit (`h-base.txt`, 23:15:43Z). So the test-first order holds per file, as the skeptic says, and the skeptic does not refuse for it.
5. `inference.tex:260-262` and `changes.tex:1788-1789` overclaim, as 1.1 and 1.2 say.

### 1.5 What the worker had right

The skeptic's differentials confirm each of these, and I do not disturb them:
- the five repaired rows (424's plain half, 516's walk half, 555, 558 and 567), each matching the compiled path and the chapter (`SkUnfixed`, `SkLone`, `SkJoin`, `SkMatch`, `SkFnMeth*`);
- D1, the bound at instantiation only, with row 589 gated;
- D2, big operators, a reversible stop listed;
- D4, D6 and D7;
- the test-first order, as 1.4 item 4 qualifies it;
- the suite run on `0244b0ce4` (486 tests, no failure).

### 1.6 Points the skeptic raised that need no change in this repair

- **The trace switch.** It includes an eager `typesOf(args)` at `EvaluatorBase.java:170` and `:183`, evaluated only when a bound is taken. It is code beyond the tests, but inert. Removing it now would make a new code state, which costs a build and a second suite run.
  - It stays. It is listed for Pavol with D8, and one edit removes it.
- **`FTraitOrObjectOrGeneric.java:120-122`.** The record lets the rung name "the file of walk's generic-method instantiation" for row 567 (record section 3, rung W, Files). The registration line is part of that instantiation.
  - Whether rung K names the same file as its load-time file is for the gather, which sees both branches. I do not read K's worktree.
  - The worker already lists it for Pavol.
- **The uncaught `MatchFailure`'s message.** It no longer names the matched type. The specification asks only that `MatchFailure` be thrown (`Specification/basic/expressions/typecase.tex`, section "Typecase Expressions", `:99-100`), and the compiled path's message does not name it either.
  - This is a sentence in REPORT.md, not a defect.

## 2. What the specification settles

- **F1.** Settled: the intersection of the upper bounds, never `BottomType` (`inference.tex`, "The Static Arguments of a Call"). Home 2.
- **F2.** Settled for a call with no expected type: the bound (`inference.tex:99-107`). Walk departs by decision D3, kept as a reversible stop. Home 2.
- **F3.** Settled that the instance is a supertype of `Apple`, so never `BottomType` (`types-vals-vars.tex`, "Special Types"; `function.tex`, "Function Expressions"; `inference.tex:104-105`). Silent on which supertype, since the elided return type's inference is not yet described. Home 2, asserting only the settled part.
- **The compiled `depS`.** `depS[\S extends Number, U extends BoxU[\S\]\](s: S)` called on a `ZZ32` gives `S = Number` (`SkDep4.compiled.out`). The chapter gives a lone parameter the narrowest candidate its bounds permit, `ZZ32`, as `idS` gets. Nothing in the chapter changes that because another parameter's bound mentions `S`. Settled, home 2.
- **The compiled `tag`.** `tag[\R\](x: R, self)` compiles and dies with `NoSuchMethodError`. A functional method's `self` may be at "an arbitrary position" (`Specification/basic/traits.tex`, section "Method Declarations", `:543-545`). A linkage failure of an accepted program is settled under every reading. Home 2.
- **Row 565's object-override form.** The same duplicate wrapper as row 565, whose test already gates it. A note, not a new home.

## 3. Decisions I took

- **J1. The F3 assertion asserts a supertype of `Apple`, not `Apple`.**
  - Alternatives: assert `BoxU[Apple]`, the compiled path's answer; or assert only "not `BottomType`".
  - "Exactly `Apple`" depends on the inference of an elided return type, which the chapter does not yet describe.
  - "Not `BottomType`" cannot be written as a type in a typecase.
  - "A supertype of `Apple`" is what covariance and "no value has `BottomType`" settle, and a typecase over `Apple`, `Fruit`, `Object` and `Any` writes it.
- **J2. The two compiled-path defects get their tests in this repair, in `ProjectFortress/compiler_tests/`.**
  - Alternatives: rows only, with the tests left to the gather; or no rows.
  - Two rules settle it. The test is owed in the batch that measures the defect (the shared prefix, "What a measured defect is worth", home 2). And a compiled run-time defect is two `.test` files over one component (FACTS, "The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only, and a run-time defect needs two .test files").
  - The rung's repair round holds the probes. No rung of this batch edits `compiler_tests/` (record section 4), so the files collide with nothing.
  - The compiler is unchanged by the rung, so they are shown in the rung's base copy (`/home/user/fortress-walkinst-base`), which the shared prefix provides for the old code.
  - This places files outside the list section 4 gives W. It is listed for Pavol.
- **No decision on D3 itself.** It stays the worker's decision and a reversible stop, now gated.

## 4. The repair, step by step

The steps are in `instructions` of the structured result, which the repair worker executes in order. They are repeated here so that the second skeptic can check the repair against them.

1. Set up the shell as the shared prefix says, in `/home/user/fortress-walkinst`. Then extract the worker's report and record texts from its transcript into scratch. They are the base of `REPORT.md` and `record.md`, which the harness refused to let the worker write:

       python3 -c "import json,sys; f='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_f747fd3e-9e4/agent-a8a6f35450d98cca0.jsonl'; [ (open('tmp/rung-walk-instance/worker-REPORT.md','w').write(b['input']['reportText']), open('tmp/rung-walk-instance/worker-record.md','w').write(b['input']['recordText'])) for l in open(f) for d in [json.loads(l)] if isinstance(d.get('message'),dict) and isinstance(d['message'].get('content'),list) for b in d['message']['content'] if isinstance(b,dict) and b.get('type')=='tool_use' and b.get('name')=='StructuredOutput' ]"

2. **F1.** Write `ProjectFortress/tests/XXXInferSeveralBoundsWalk.fss`.
   - Declarations: `trait Red end`, `trait Round end`, `object Apple extends { Red, Round } end`, `object Cherry extends { Red, Round } end`, and `thr[\T\](): T = throw ForbiddenException`, as in `InferUnfixedBoundWalk.fss:8`.
   - Two witnesses, `witnessRed[\T extends { Red, Round }\]()` and `witnessRound[\T extends { Red, Round }\]()`. Each is a typecase over `thr[\T\]` whose first clause is `() -> ZZ32 => "ZZ32"`, then `() -> Red => "Red"` (or `() -> Round => "Round"`), then `else => "other"`.
   - `pick2[\T extends { Red, Round }\](a: T, b: T): String = "pick2"`.
   - `run()` asserts `witnessRed()` is `"Red"`, `witnessRound()` is `"Round"` and `pick2(Apple, Cherry)` is `"pick2"`, then prints `PASS`.
   - Each message says, in plain words, that a parameter with two declared bounds takes their intersection and never `BottomType`, citing `inference.tex, section \"The Static Arguments of a Call\"`.
   - One comment line before `component`, saying what the program checks.
3. **F2.** Write `ProjectFortress/tests/XXXInferThroughBoundWalk.fss`.
   - Declarations: `trait Fruit end`, `object Apple extends Fruit end`, `object BoxU[\T\]() end`, `ap[\T, A extends T\](a: A): BoxU[\T\] = BoxU[\T\]()` and `apF[\T extends Fruit, A extends T\](a: A): BoxU[\T\] = BoxU[\T\]()`.
   - A `kindU` typecase with clauses for `BoxU[\Apple\]`, `BoxU[\Fruit\]` and `BoxU[\Any\]`, then `else`.
   - `run()` binds `b = ap(Apple)` and `bF = apF(Apple)`, variables without a declared type, so that no expected type applies (`inference.tex`, "The expected type" paragraph). It asserts `kindU(b)` is `"BoxU[Any]"` and `kindU(bF)` is `"BoxU[Fruit]"`, then prints `PASS`.
   - The messages say that a type parameter that only another parameter's bound mentions takes its own bound, not the argument's type, citing the same section. One comment line.
4. **F3.** Run `git mv ProjectFortress/tests/InferUntypedLambdaResultWalk.fss ProjectFortress/tests/XXXInferUntypedLambdaResultWalk.fss`, then edit the moved file.
   - Rename the component.
   - Replace the comment line (`:4`) with one line saying that a function expression without a declared return type, whose body is an `Apple`, fixes the type parameter at a supertype of `Apple`, never `BottomType`, under walk.
   - Keep the typed assertion (`:20`) first.
   - Replace the assertion at `:21` with one through a new typecase `holdsApple(x: Any): String` whose clauses `BoxU[\Apple\]`, `BoxU[\Fruit\]`, `BoxU[\Object\]` and `BoxU[\Any\]` answer `"yes"`, `else` `"no"`: `assert(holdsApple(thunk(fn () => Apple)), "yes", "...")`.
   - The message says the function returns an `Apple`, so its return type holds one and the parameter is a supertype of `Apple`, never `BottomType`. It cites `inference.tex, section \"The Static Arguments of a Call\"` and `types-vals-vars.tex, section \"Special Types\"`.
5. **The compiled `depS`.** In `ProjectFortress/compiler_tests/`, write `XXXInferDependentBound.fss` from the skeptic's `tmp/rung-walk-instance/skeptic/SkDep4.fss`.
   - Component renamed; `run(): ()` prints `REACHED` first.
   - It asserts `kindS(idS(z))` is `"BoxU[ZZ32]"` (a control that passes), then `kindS(depS(z))` is `"BoxU[ZZ32]"`, the message citing `inference.tex, section \"The Static Arguments of a Call\"`. Then it prints `PASS`.
   - Two `.test` files beside it, as `DispatchMethodArmRungGLink.test` and `XXXDispatchMethodArmRungG.test` are:
     - `InferDependentBoundLink.test` (`tests=XXXInferDependentBound`, `link`);
     - `XXXInferDependentBound.test` (`tests=XXXInferDependentBound`, `run`, `run_out_contains=REACHED`).
   - Never `run_out_contains=PASS`.
6. **The compiled `tag`.** Likewise, write `XXXGenericFunctionalMethodSelfSecond.fss`:
   - a plain `trait Shape` declaring `tag[\R extends Any\](x: R, self): R = x`, and `object Ci extends Shape end`;
   - `run()` prints `REACHED`, asserts `tag("t", Ci)` is `"t"` citing `traits.tex, section \"Method Declarations\"` (self at an arbitrary position), and prints `PASS`;
   - `GenericFunctionalMethodSelfSecondLink.test` (link) and `XXXGenericFunctionalMethodSelfSecond.test` (run, `run_out_contains=REACHED`).
7. **Show the three walk files through the harness on the head's build.** From the worktree:

       bash explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-walk-instance/h8 ProjectFortress/tests/XXXInferSeveralBoundsWalk.fss ProjectFortress/tests/XXXInferThroughBoundWalk.fss ProjectFortress/tests/XXXInferUntypedLambdaResultWalk.fss > tmp/rung-walk-instance/h8.txt 2>&1

   Each must print ` OK Saw expected exception`, and its FAIL line must be the assertion step 2, 3 or 4 names: `"ZZ32" =/= "Red"`, `BoxU[Apple] =/= BoxU[Any]`, `"no" =/= "yes"` or their like. A file that fails for any other reason (parse, name, a different call) is wrong; fix it and run again.
   - Then make stand-ins under `tmp/rung-walk-instance/standin9/`, same file and component names, with the static arguments written:
     - `witnessRed[\Apple\]()`, `witnessRound[\Apple\]()`, and `pick2[\Both\](Apple, Cherry)` with a `trait Both extends { Red, Round } end` that `Apple` and `Cherry` extend;
     - `ap[\Any, Apple\](Apple)` and `apF[\Fruit, Apple\](Apple)`;
     - `thunk[\Apple\](fn () => Apple)`.
   - Run the harness on them into `tmp/rung-walk-instance/h8-standin.txt`. Each must print ` Missing expected failure`.
8. **Show the two compiled pairs in the base copy**, which runs the compiler the rung does not change, link test before run test:

       bash /home/user/fortress-walkinst-base/explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx9 /home/user/fortress-walkinst/ProjectFortress/compiler_tests InferDependentBoundLink.test XXXInferDependentBound.test GenericFunctionalMethodSelfSecondLink.test XXXGenericFunctionalMethodSelfSecond.test > tmp/rung-walk-instance/j8.txt 2>&1

   - The link tests pass and the run tests count as expected failures. The `XXXInferDependentBound` run must fail at the `depS` assertion, and `XXXGenericFunctionalMethodSelfSecond` with `NoSuchMethodError`.
   - Then run stand-ins in `tmp/rung-walk-instance/standin9c/`, same names, into `j8-standin.txt`. The stand-ins are `depS[\ZZ32, BoxU[\ZZ32\]\](z)`, and a `tag2[\R extends Any\](self, x: R)` called `tag2(Ci, "t")` in place of `tag`. The harness must fail each XXX run test as one that succeeds.
   - Nothing else is compiled or run.
9. **Commit the five new test programs, their four `.test` files and the rename alone**, and push. The message names rows 591 to 594 as provisional and quotes no tmp path.
10. **Edit the first interpreter box** (`Specification/basic/inference.tex:178-186`) in the S1 form. Keep the sentence that walk gives a lone type parameter with no narrowest candidate its declared bound, and qualify both it and the following "It does the same ..." sentence with two exceptions:
    - one whose bound mentions a static parameter, itself or another, which walk binds, as before, to the narrowest named common supertype of the arguments' run-time types that the bounds permit;
    - one declared with several bounds that no named type below them all meets, for which the call fails (row~591 of the revival's gap ledger).
11. **Edit the second interpreter box** (`inference.tex:260-271`). After "at that bound with their instances", add two exceptions:
    - walk instantiates a type parameter that only the bound of a type parameter the arguments fix mentions, as \EXP{A \KWD{extends} T} mentions T, at the arguments' type rather than its bound, having no expected type to fix it (row~592);
    - it erases to BottomType a type parameter declared with several bounds that no named type below them all meets (row~591).

    Keep the rest, row 587's sentence included.
12. **Edit Appendix I's entry** "The inference of a call's static arguments" (`Specification/appendices/changes.tex`):
    - **Change** (`:1632-1651`): describe each box as steps 10 and 11 leave it.
    - **Rationale** (`:1691-1703`): replace "The type parameters it still erases are of two kinds" and what follows to `:1703` with an account of each departure the boxes name, each with its reason:
      - by decision, a type parameter whose bound mentions itself (not yet decided, the paper's calculus admitting none, p. 11:11);
      - by decision, a big operator's (the element type of a reduction, not yet described);
      - by decision, a type parameter that only another parameter's bound mentions (no expected type under the interpreter, the library's `APPCOV` building its result from it);
      - as defects gated by expected failures, a type parameter with several bounds that no named type meets (no intersection type in the interpreter);
      - as a defect gated by an expected failure, one that only an untyped function expression's result fixes (that result typed `BottomType`).

      Keep the pointer to the decision record.
    - **Effect** (`:1785-1789`): qualify the sentence to the type parameters the boxes say it holds for.

    No normative sentence changes.
13. **Edit `explorations/compile-ladder/rung-walk-instance/decision-record.md`:**
    - **Sections 1.1 to 1.3:** the "Now" texts match steps 10 to 12.
    - **D2 Cost:** replace "No program in the corpora or the library calls one so (the suite's trace on `0244b0ce4` records none)" with "Unmeasured: the trace does not see a big operator (`EvaluatorBase.java:162`, `:167-171`)".
    - **D3:** add a Departure line. The chapter, the decision's words and the compiled path give `T` its bound (`BoxU[Any]`; `BoxU[Fruit]` for `apF`). Gated by `XXXInferThroughBoundWalk.fss`, row 592.
    - **D5:** say that it covers a lone parameter whose bound mentions any static parameter, not only itself, and that a parameter with several bounds without a named meet falls among the same `rechecks` (`EvaluatorBase.java:312-313`).

    Commit steps 10 to 13 together and push.
14. **Write `REPORT.md`** in `explorations/compile-ladder/rung-walk-instance/`, from `tmp/rung-walk-instance/worker-REPORT.md` with these changes:
    - **Section 1:** step 4 of this file's section 1.4.
    - **Section 2:** the exceptions of steps 10 and 11.
    - **Section 5:** a new 5.7 with steps 7 and 8, quoting each run's verdict lines and the command.
    - **Section 5.6's table:**
      - row 587 at home 2 (`XXXInferUntypedLambdaResultWalk.fss`);
      - rows 591 (F1), 592 (D3) and 593 (compiled `depS`), each at home 2;
      - row 594 (compiled `tag`) at home 2;
      - a note on row 565.
    - **Section 8:** add the stops D3 and F1 meet.
    - **Section 9:** add the forPavol entries of this ruling.
    - **The typecase message:** one sentence on the uncaught `MatchFailure`'s message.
    - **A closing section, "The repair round":** what `JUDGE.md` ruled and what was done.
15. **Write `record.md`** from `tmp/rung-walk-instance/worker-record.md`:
    - **The FACTS entry:** names the two exceptions (rows 591 and 592) and row 587 as an expected failure.
    - **Row 424's note:** a parameter with several declared bounds stays at `BottomType` (row 591).
    - **Row 555's note:** the several-bounds case is row 591.
    - **Row 587:** NEGATIVE-VERIFIED, home 2. Spec citation `inference.tex` "The Static Arguments of a Call", `types-vals-vars.tex` "Special Types" and `function.tex` "Function Expressions"; test `ProjectFortress/tests/XXXInferUntypedLambdaResultWalk.fss`.
    - **New rows 591 to 594,** in the table's columns, each with its probe's two to five lines and its command:
      - 591, F1;
      - 592, D3's departure, class "interpreter departure kept by decision D3";
      - 593, compiled `depS`;
      - 594, compiled `tag`.
    - **A note for row 565,** the object-override form: `SkFnMeth`, `ZipException: duplicate entry ... $conv`.
    - **The handover line** names rows 587 to 594.
    - **The citations:** say that the specification cites the provisional rows 587, 588, 589, 591 and 592.
16. **Commit `REPORT.md` and `record.md`** and push. If the harness refuses either write, say so and carry the full text in the structured result.
17. **Run no build, no suite, no stage and no demo.** The code is that of `0244b0ce4`, whose suite run stands.

## 5. For Pavol

- **D3**, now gated (row 592, `XXXInferThroughBoundWalk.fss`). Walk keeps the arguments' type for a type parameter that only another parameter's bound mentions, because the library's `APPCOV` builds its result from it and walk has no expected type. The chapter, the decision and the compiled path give the bound. Should walk move once it has an expected type? Evidence: `Library/CovariantCollection.fss:27`, `EvaluatorBase.java:194`.
- **F1** (row 591, `XXXInferSeveralBoundsWalk.fss`). Walk has no intersection type, so a parameter with several declared bounds and no named meet stays at `BottomType` where nothing fixes it, and the call fails where it is a lone parameter. Should walk's lattice gain intersections, or does the expected failure suffice until the switch-over? Evidence: `TypeLatticeOps.java:38-44`, `EvaluatorBase.java:312-313`, `:233-238`.
- **J2.** Two compiled-path tests are placed in `ProjectFortress/compiler_tests/`, outside the file list section 4 gives W. No rung of the batch edits that directory.
- **D5's reach.** It covers a lone parameter whose bound mentions another static parameter, not only an F-bounded one, keeping the narrowest named common supertype there. Unmeasured by a program.
- **The trace switch** `fortress.inference.trace` (D8) stays in a 2012 file. It is inert, apart from an eager list built when a bound is taken (`EvaluatorBase.java:170`, `:183`). Removing it is one edit and a suite run.
- **Row 587's home** moves from 3 to 2. The specification settles that the instance is a supertype of `Apple` (J1).
