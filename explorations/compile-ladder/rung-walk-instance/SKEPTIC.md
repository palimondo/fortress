# Second judgement

Judged head: `5ff5ebf73` (branch `wip/rung-walk-instance`). The repair round's commits are `211610c19` (tests alone), `5b5c00071` (the boxes, Appendix I, the decision record) and `5ff5ebf73` (REPORT.md, record.md). None changes code: the last commit that does is still `0244b0ce4`, whose build the worktree holds and whose interpreter-suite run (486 tests, REPORT.md section 6.2) stands.

**Verdict: approved.** The repair answers each part of the refusal as the judge ruled, and it changes nothing I approved.

## 1. The refusal, part by part

**F1, several declared bounds (home 2, row 591).** `ProjectFortress/tests/XXXInferSeveralBoundsWalk.fss` asserts the intersection for `witnessRed`, `witnessRound` and `pick2(Apple, Cherry)`. Through `harness-one.sh` on the worktree's build it fails at its first assertion, 'FAIL: J4/0:ZZ32 =/= J3/0:Red; ...' / ' OK Saw expected exception' (REPORT.md section 5.7; run at 01:32:55Z). The copy with the static arguments written prints 'PASS' / ' Missing expected failure' (REPORT.md section 5.7), so the key goes red on a fix. The copy also puts `Apple` and `Cherry` under a trait `Both`, as the ruling ordered, so that `pick2[\Both\]` exists. My `SkTwoBoundW` and `SkTwoBoundLone`, run again at `5ff5ebf73`, print what they printed at `8f5ac2199`: 'two bounds: ZZ32 clause (T is BottomType)' / 'one bound: Red clause', and 'Cannot unify Red ... with Round ... abm=T=(Red,Red)'.

**F2, decision D3 (home 2, row 592).** `XXXInferThroughBoundWalk.fss` binds `ap(Apple)` and `apF(Apple)` without declared types and asserts `BoxU[Any]` and `BoxU[Fruit]`. It fails with 'FAIL: J11/0:BoxU[Apple] =/= J9/0:BoxU[Any]' and ' OK Saw expected exception', and its stand-in `ap[\Any, Apple\]`, `apF[\Fruit, Apple\]` passes. My `SkThroughBound` at the head still prints 'ap BoxU[Apple]' / 'apF BoxU[Apple]'. D3 now has its Departure line in `decision-record.md`, and the second box names it.

**F3, row 587 (home 2).** The pin was moved by `git mv` to `XXXInferUntypedLambdaResultWalk.fss`. The typed assertion stays first, and the untyped one asserts a supertype of `Apple` through `holdsApple`, whose four clauses are every supertype `Apple` has here. That is the judge's J1. It fails with 'FAIL: J2/0:no =/= J3/0:yes' and ' OK Saw expected exception', and its stand-in `thunk[\Apple\]` passes. My `SkLambda` at the head still prints 'untyped other' / 'untypedF other'.

**J2, the two compiled pairs (rows 593, 594).** These are `XXXInferDependentBound` and `XXXGenericFunctionalMethodSelfSecond`, each with a link test and an XXX run test keyed on `REACHED`, never `PASS`. Run through `junit.sh` in the base copy, the links pass. The run tests print 'REACHED' and then 'FAIL:  BoxU[Number] =/= BoxU[ZZ32]' (the control `idS` passes first) or 'NoSuchMethodError', each followed by 'Saw expected failure' (REPORT.md section 5.7). Their stand-ins print 'PASS' / 'Did not see expected failure' (REPORT.md section 5.7).

**Order.** The harness runs (01:32:55 to 01:34:30) came before the tests-only commit `211610c19` (01:34:59), and that commit came before any text edit (the first `inference.tex` edit is at 01:37:01, transcript `agent-a9a28e9d6896a7f91`). The round built nothing. Its own probes ran walk on this build and in the base copy (`RpInside`, `RpInside2`, `RpInside3`, `RpFJoin`).

**Citations.** Every new message names a file and a section, never a line. The named sections say what the messages say:
- inference.tex, "The Static Arguments of a Call": the intersection of the upper bounds, never `BottomType`, a parameter that neither an argument nor the expected type fixes, and the narrowest candidate the bounds permit;
- types-vals-vars.tex, "Special Types": no value has `BottomType`;
- traits.tex, "Method Declarations": `self` "at an arbitrary position in its parameter list".

**The corrections of my first judgement.**
1. The first box now states D5's exception.
2. The Rationale no longer says "two kinds".
3. D2's Cost says the case is unmeasured and why.
4. REPORT.md section 1 gives the qualification of the test-first order.
5. Both boxes and the Effect name the several-bounds case and D3.

Two departures from the ruling's wording are the round's own, and the code bears them out:
- Walk's meet fails for any two bounds neither of which is a subtype of the other (`types/FType.java:338-348`).
- A parameter with several bounds is bound to the arguments' narrowest named common supertype where one exists. My `SkTwoBoundNarrow` gives `pk(Apple, Cherry)` the instance `BoxU[Both]`, and `BoxU[Apple]` and `BoxU[Plum]` for two equal arguments, the same on the base. Over `Apple` and `Plum` the call fails ('Cannot unify Red ... with Round'; on the base, the join bug). Unfixed, `mk()` is still `BottomType` ('other').

## 2. What I approved stands

The diff changes no code. It touches:
- three walk test files (one of them the rename) and two compiled pairs;
- the two interpreter boxes of `inference.tex` and Appendix I's entry, with no normative sentence changed;
- the decision record, REPORT.md and record.md.

No team test line and no demo is touched. The five repaired rows keep their home-1 tests, and those tests passed through the harness on the same code (REPORT.md section 5.5).

## 3. Differentials (one thread, `FORTRESS_THREADS=1`; the repair touches no shared state)

- `SkTwoBoundW`, `SkTwoBoundLone`, `SkThroughBound`, `SkLambda` at `5ff5ebf73`: identical to the outputs recorded at `8f5ac2199`.
- `SkTwoBoundNarrow` (new): the head and the base both give `pk[\T extends { Red, Round }\]` `BoxU[Both]`, `BoxU[Apple]` and `BoxU[Plum]`, and `mk()` `other`. `pk(Apple, Plum)` fails on both: a unification error on the head, the join bug on the base. Verdict: the first box's "as before ... where there is one, and where there is none ... fails" is true.
- `SkDepLone` / `SkDepLone2` (new): `loneS`/`loneT[\S, T extends S\](a: T, b: T, s: S)`.
  - Over `Apple, Cherry, Apple` the head gives `S` and `T` both `BoxU[Any]`, where the base stops at the join.
  - Over `Apple, Pear, Pear` the head and the base both give `Fruit` for both.
  - Over three `Apple`s both give `Apple`.
  - Verdict: this is D5's reach as `decision-record.md` D5 and the round's decision R1 state it. The box is silent on the case with no narrowest supertype, by R1.

## 4. Findings, none a refusal ground

- The Rationale of Appendix I's entry names three kinds of departure by decision and three as defects. It leaves out D5, which the first box names: a lone parameter whose bound mentions a static parameter keeps the arguments' narrowest named common supertype, not its bound. The same holds for `decision-record.md` section 1.3. Required correction.
- record.md's FACTS entry lists what stays at `BottomType` without row 588, which the first box names. Required correction.
- Moving the typed control `thunk(fn (): Apple => Apple)` into an XXX file leaves it ungated: an XXX file fails as expected whichever assertion fails. It was a control, not a repaired defect, and the ruling ordered it kept first, so this is not a correction.
- `RpFJoin`: a lone F-bounded parameter over arguments with several minimal supertypes fails on the base and on the head, but the failure changed from the join's `InterpreterBug` to a unification error. D5's text says keeping the supertypes "keeps that case unchanged without P1". The verdict is unchanged; the failure is not. The round records it as a note on row 555 (home 3, decision R2). I list it as a stop below, so that Pavol sees it.

---

# Skeptic, rung W (`rung-walk-instance`), first judgement

Judged head: `8f5ac2199` (branch `wip/rung-walk-instance`). The last commit that changes code is `0244b0ce4`. The two commits after it, `e03f8694c` and `8f5ac2199`, change only `Specification/` and `explorations/`.

**Verdict: refused.**

**The one thing that must change.** Walk still departs from the instance rule in three cases, and none of them has a home or a sentence in the interpreter's boxes:
- (a) A type parameter with several declared bounds whose meet walk cannot form. Unfixed, it is still `BottomType`. As a lone parameter over two arguments with several minimal supertypes, the call still fails.
- (b) Decision D3. A type parameter that only another parameter's bound mentions takes the arguments' type. The chapter and the compiled path give it its bound.
- (c) Row 587. It is pinned as home 3, but the chapter settles it.

Each needs a home 2 expected-failure test, shown through `harness-one.sh`, a provisional ledger row, and the corrected sentences in both boxes and in Appendix I (section 5). The repair needs no code change and no build.

## 1. Test first (check 3), read in the two transcripts

The transcripts are `agent-a3fb060873aa0ac91.jsonl` (the first worker) and `agent-a8a6f35450d98cca0.jsonl` (the resume).
- **Call `s6bscn`, 23:15:43Z.** The six tests ran through `harness-one.sh` in the worktree on tree `fa14a190c`. The `git status` just before (`3kKNaZ`) shows only test files changed. Result: `Tests run: 6,  Failures: 6,  Errors: 0`, with the lines `recordedFailure` quotes. This was before the first source edit (`zxXwpk`, 23:17:41) and the first build (`Q4B1j4`, 23:19:56).
- **Commit `4f4fc1ead`** (`pTYMiD`, 23:16:11) holds the tests alone.
- **Finding.** The fix commit `2b734f9cb` also adds assertions: the inferred `pick` and `gen` calls, `thunks`, `thunksF`, `several`, `none`, `openRange[\ZZ64\]`, and the pin file `InferUntypedLambdaResultWalk.fss` (call `xBM9cB`, 23:31:09).
  - They were written after the edit was built (23:24-23:25).
  - Each case was shown failing on the base copy only by the worker's probes (`R28ire` 23:29:52 and `r1W2XG` 23:30:17, `probes/base-walk2.txt`). None was shown through the harness, and none was committed before the fix.
  - Each file did fail on the base through the harness at 23:15:43, so I do not refuse for it. REPORT.md should say it.
- **Commit `e0a2b35d1`**, meant to hold tests alone, also carries the revert of `TypeLatticeOps.java`. REPORT.md section 1 states this.
- **Commit `b2b96fd9d`** (`mkB`) is the test alone. It was seen failing on the build of `b037c7426` (`h5.txt`, `Tests run: 1,  Failures: 1`).
- **The last code edit and the runs after it.**
  - The last code edit was `zwyXZ2` at 00:07:49.
  - The build followed (`Ph7PVz`, 00:08; `EvaluatorBase.class` stamped 00:08:50), and then `h7.txt`: `OK (19 tests)`.
  - The commit `0244b0ce4` (`RtCiLk`, 00:10:18) captures that code.
  - The interpreter suite ran on `0244b0ce4` with `dirty: 0`: `OK (121 tests)` / `OK (121 tests)` / `OK (123 tests)` / `OK (121 tests)`, 486 tests (`Gpsxcy`).
  - The recorded pass and the suite are therefore of the head's code. I did not run the suite again.

## 2. The provenance block (check 2)

I opened every `file:line` the five lines cite, at `fa14a190c` for the problem line and at the head for the rest. Each says what the block says. Specifically:
- `XXXInferLoneUnboundedWalk.fss:19` and `EvaluatorBase.java:206`/`:507` at the base are the instance loops;
- `inference.tex:89-107` and `:54-61`, `typecase.tex:99-100` and `traits.tex:536-556` say what is cited;
- `Evaluator.java:426-428`, `MakeInferenceSpecific.java:81-88`, `Formula.scala:496` and `GenericMethod.java:103` are as described;
- `EvaluatorBase.java:73`, `:103-127`, `:140`, `:162` and `:194` are the deviations named.

The historical line names all four 2012 Java files the diff edits.

## 3. The diff (check 4)

What the change does:
- `EvaluatorBase.java` gives an unfixed type parameter its bound only on the instantiation path (`inferAndInstantiateGenericFunction`, `:61-65`). Choice through `inferByUnification(…, false)` keeps the base's map and the base's instance loop (`:530`, `:570`; `instanceOf` returns early without `bounded`, `:175`).
- `BoundingIntervals` (`:103-127`) gives the bound where a join has several minimal supertypes.
- The lone parameter loses the supertype candidates unless its bound mentions a static parameter (`:369-373`, `:463-466`).
- `Evaluator.java:1441-1442` copies the case expression's throw.
- `GenericFunctionalMethod.java` and `FTraitOrObjectOrGeneric.java:120-122` make a functional method's own static parameters generic, and dispatch through the receiver's method (`OwnClosure`).

The edit does what the report says. It is larger than its tests need by the trace switch (D8, `:68-93`, and the second `narrowest` call at `:374-381`). The switch is inert, and the worker lists it for Pavol. Its eager `typesOf(args)` at `:170` and `:183` allocates a list on every bound taken, even when the switch is off.

## 4. Differentials

All are my own programs, under `tmp/rung-walk-instance/skeptic/`, run at one thread (no mutable state, field or atomic block is touched). The helper is `run3.sh P`. It runs walk with this build (`FORTRESS_HOME=/home/user/fortress-walkinst`), walk in the base copy (`/home/user/fortress-walkinst-base`), and the compiled path in the base copy. The rung changes no compiler source, and the worktree's caches were wiped by its `ant compileAll`, so the compiled path is run there.

| program | walk, head | walk, base | compiled | verdict |
|---|---|---|---|---|
| `SkUnfixed`: `mkS[\T extends String\]()`, `mkF[\T extends Fruit\]()`, `half("s")` (T unfixed beside a fixed S), `ovl(3)` (generic beside a plain overload), `Cell()` (a generic object's constructor) | String, Fruit, Number, Number, `Cell[Number]` | all `other` (BOTTOM) | String, Fruit, Number, Number, `Cell[Number]` | head = compiled = chapter |
| `SkDep`: `dep[\S extends Number, U extends BoxU[\S\]\](z)` | `BoxU[\BoxU[\Int\]\]` | `BoxU[\BOTTOM\]` | `BoxU[BoxU[Number]]` (`SkDep3`) | head follows the chapter (walk's run-time `Int` for S). The compiled checker instantiates S at its bound Number: `idS(z)` is `BoxU[ZZ32]` but `depS(z)` is `BoxU[Number]` (`SkDep4.compiled.out`). That is a compiled defect against the chapter's narrowest rule: recommended row 3 |
| `SkLone`: `pickU(Apple, Banana)`, `pickF(…)`, `pickU(Apple, Apple)`, `pickU(z, w)`, `pickU("s", z)`, `pick3(Apple, Banana, Apple)` | Any, Fruit, Apple, ZZ64, Any, Any | Fruit, Fruit, Apple, ZZ64, other, Fruit | Any, Fruit, Apple, ZZ64, Any, Any | head = compiled = chapter on all six |
| `SkJoin`: `tup((Apple, Cherry))`, `tupR` (bound Red), `res` (two arrow results) | Any, Red, Any | the join InterpreterBug | Any, Red, `other` (not Apple, Cherry, Red, Round or Any) | tuple: head = compiled. Arrow results: the chapter does not say which supertype; the rung's box states walk's choice |
| `SkJoinSib`: `<|Apple, Cherry|>`, `twoB(Apple)` | `<|Apple, Cherry|>`, ran | the join InterpreterBug | not run | the list literal is repaired too (its `opr <|[\E\] xs: E... |>` joins the varargs) |
| `SkTwoBoundW`: `witness[\T extends { Red, Round }\]()` against `witnessOne[\T extends Red\]()` | `ZZ32 clause (T is BottomType)`, `Red clause` | BottomType, BottomType | refused (the compiled `ForbiddenException` takes an argument); `SkTwoBoundC` dies loading `Intersection??` (row 559), so the compiled path instantiates at the intersection | **finding F1** |
| `SkTwoBoundLone`: `pick2[\T extends { Red, Round }\](Apple, Cherry)` | `Unification error … Cannot unify Red … with Round … abm=T=(Red,Red)` | the join InterpreterBug | dies at `Intersection??` (row 559) | **finding F1**: still fails under walk; the chapter gives Red ∩ Round |
| `SkThroughBound`: `ap[\T, A extends T\](Apple)`, `apF[\T extends Fruit, A extends T\](Apple)` | Apple, Apple | Apple, Apple | Any, Fruit | **finding F2** (D3): head departs from the chapter and the compiled path, unstated |
| `SkLambda`: `thunk(fn () => Apple)`, `thunkF[\T extends Fruit\](fn () => Apple)` | `other`, `other` (BOTTOM) | same | `BoxU[Apple]`, `BoxU[Apple]` | **finding F3**: the chapter's "never BottomType" settles it |
| `SkMatch`: tuple typecase with no match, caught as `MatchFailure`; inside `try … finally`; caught as `CheckedException` | caught; caught + finally; caught as CheckedException | the ProgramError `typecase match failure given (Int,FlatString)` | caught; caught + finally; dies, `CompilerLibrary$MatchFailure` | head = compiled for MatchFailure. The `CheckedException` difference is row 590, gated |
| `SkMatchUncaught` | `…SkMatchUncaught.fss:4:24-6:4: MatchFailure`, exit 1 | `typecase match failure given Int`, exit 1 | `FortressException: class fortress.CompilerLibrary$MatchFailure …` | still loud; the matched type is no longer named |
| `SkFnMethPlain`: an override in an object, an inherited default, written R, self in the second position (`tag(x: R, self)`), an own parameter nothing fixes (`mk[\R extends Number\](self)`) | 14, 11, 24, `t`, `BoxU[Number]` | `Missing type R` | 14, 11, 24, then `NoSuchMethodError … \=tag?1??…` | head right on all five. Compiled `tag`: recommended row 4 |
| `SkFnMeth`: the above plus a generic trait's abstract generic functional method overridden in an object of `Holder[\String\]` | all six run, `conv h!` | `Missing type R` | `ZipException: duplicate entry … $conv…` | compiled: row 565's defect also for an override in an object: recommended row 5 |
| `SkFnMeth2`: two traits each declaring `pick[\R\](self, …)`; `both[\R\](self, x: E, y: R)` of `Gen[\ZZ32\]` and `Gen[\String\]` | `Aa's pick`, `Bb's pick`, `3 r`, `s 4` | `Missing type R` | picks run; `both` `NoSuchFieldError` (row 564) | head right |
| `SkDotted`: `Maker.mk[\Number\]()`, `Maker.id[\ZZ32\](3)` written; `Maker.id(3)` inferred | written run; inferred `** bug! Symbolic type T … is being matched to value 3` | same | runs | unchanged by the rung (row 21), as the box says |
| `SkEmpty`, `SkEmpty2`, `SkE_*`: `<| |>`, `<| |>.addRight(3)`, `(<| |>) || <|1, 2|>`, `{}`, `{}.add("a", 1)`, `{} UNION {"b" |-> 2}`, `SUM[i <- <| |>] i` | `<||>`, `<|3|>`, `<|1, 2|>`, `{a|->1}`; UNION fails (`EmptyMap[\Any,Any\]`); `CastError` | the same, except `{}.add` fails (`k:BOTTOM`) and UNION fails on `EmptyMap[\BOTTOM,BOTTOM\]` | not run | no regression; one idiom repaired |

## 5. Findings

**F1: several declared bounds (refusal, part a).**
- Under walk, a type parameter declared `[\T extends { Red, Round }\]`, with two unrelated bounds, is not covered:
  - `abm.meetPut` throws on the second bound (`TypeLatticeOps.java:39-43`, `FType.meet` answers the empty set);
  - the parameter is then filed with the self-typed ones (`EvaluatorBase.java:309-313`, `:586-595`);
  - `boundAtInstances` throws again at `:233` and answers null at `:237-238`.
- So the parameter keeps `BottomType` where nothing fixes it. `FORTRESS_HOME=/home/user/fortress-walkinst bin/fortress SkTwoBoundW.fss` prints:

      two bounds: ZZ32 clause (T is BottomType)
      one bound: Red clause

- As a lone parameter over an `Apple` and a `Cherry`, the call still fails, now with `Unification error: … Cannot unify Red(class …FTypeTrait) with Round(class …VarType) abm=T=(Red,Red)` (`SkTwoBoundLone.out`).
- What the specification gives: the intersection of the upper bounds, "never BottomType" (`inference.tex`, section "The Static Arguments of a Call"). The compiled path instantiates at the intersection and dies loading it (row 559).
- The bound mentions no type parameter, so this is the rung's half of row 424 and a residue of row 555. Walk has no intersection type to give, so it is home 2.
- Text overclaims:
  - The box's "The interpreter instantiates a type parameter of a function that nothing at a call fixes at its bound" (`inference.tex:260-262`) is false for this case.
  - Appendix I's Effect "a call whose arguments have several minimal common supertypes runs where it stopped the interpreter" (`changes.tex:1788-1789`) is false for this case.

**F2: decision D3 departs from the chapter and the compiled path, and nothing gates it (refusal, part b).**
- `ap[\T extends Any, A extends T\](a: A): BoxU[\T\]` called `ap(Apple)` is `BoxU[Apple]` under walk, base and head. It is `BoxU[Any]` on the compiled path, and `apF` with `T extends Fruit` is `BoxU[Fruit]` there (`SkThroughBound.out`).
- The chapter gives `T` its bound, since no parameter type mentions `T` ("A type parameter that neither an argument nor the expected type fixes as above … takes the intersection of its upper bounds"). The decision's words are "never the value's type alone" (POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom`").
- The worker concedes "Read literally, the chapter would give it Any" (decision record D3). D3 keeps walk's answer because the library's `APPCOV` (`Library/CovariantCollection.fss:27`) depends on it. That is a reversible stop, and it is listed.
- What is missing:
  - no test gates it;
  - no row names it;
  - neither box mentions it. The box at `inference.tex:260-262` says such a parameter takes its bound, without this exception.
- The specification settles it, so it is home 2. Whether walk should move is Pavol's call (forPavol).

**F3: row 587's home is 2, not 3 (refusal, part c).**
- `InferUntypedLambdaResultWalk.fss:21` pins that `thunk(fn () => Apple)` instantiates at `BottomType` under walk.
- The worker gives home 3 because the specification leaves an elided return type to whole-program inference. But the chapter states without condition that "Inference never instantiates a static parameter at BottomType" (`inference.tex`, section "The Static Arguments of a Call"), and the decision says "never Bottom".
- The compiled path gives `BoxU[Apple]` for both `thunk` and `thunkF[\T extends Fruit\]` (`SkLambda.out`).
- So the specification settles the one fact the pin asserts (that the instance is `BottomType`) against walk. The pin should be an expected failure that asserts an instance other than `BottomType`, for example by the `() -> T` witness.

## 6. The revised notes and entry against walk as built (required corrections, beyond the refusal's)

1. **The box at `inference.tex:178-183`** says that, with no narrowest candidate, walk "gives a type parameter that is the whole type of parameters its declared bound". By D5 (`EvaluatorBase.java:369-373`), a lone parameter whose bound mentions a static parameter still takes the arguments' narrowest named common supertype, as the deleted sentence said. Keep that exception in the box.
2. **Appendix I's Rationale** (`changes.tex:1694`) says "The type parameters it still erases are of two kinds". The box and the Change paragraph name three, and F1 and F2 add two more departures. Align them.
3. **Decision record D2's Cost** says "No program in the corpora or the library calls one so (the suite's trace on `0244b0ce4` records none)". The trace cannot see big operators: `instanceOf` traces only inside `bounds`, which is false for every big operator (`EvaluatorBase.java:162-170`). Drop the claim or measure it another way.
4. **REPORT.md section 1** should say that the assertions listed in section 1 above came with the fix commit, and were seen failing on the base copy only by probes (`probes/base-walk2.txt`).
5. **Appendix I's Effect sentence** (`changes.tex:1788-1789`) and **the box sentence** (`inference.tex:260-262`), as F1 and F2 say.

## 7. The decisions on record (check 12)

- **A type parameter the arguments do not fix takes its bound, never `Bottom`.** Built for the plain bound (`SkUnfixed`, `SkLone`, `SkJoin`, all equal to the compiled path).
  - Not built: big operators (D2), F2 (D3), F1, and row 587. D2 and D3 are reversible stops, and the worker lists them.
  - F1 and F3 are cases the decision names ("never Bottom") that the landed text states wrongly or not at all. They are folded into the refusal.
  - The F-bounded half is not this rung's (P1 = not answered, `CLIMB-BATCH-9.md`, rung W's answers line). `XXXUnwrittenSumRungF.fss` keeps its expected failure (`h7.txt`).
- **The implicit bound of an unbounded type parameter is `Any`.** Followed (`pickU`, `mkU`, `tup`).
- **Walk chooses coercions on the value, for now.** Unchanged in the probes.
- **Conversions never change which declaration runs.** Choice without coercion is the base's (D1). The coercion pass now finds a generic applicable at its bound (`either`, a reversible stop). Row 589, the base's wrong choice, is gated.

## 8. Precedent, competing declarations, count, ledger (checks 5, 7, 10, 11)

- **Precedent (check 5).** `Evaluator.java` has three match-failure sites (`grep -n -i 'match failure\|MatchFailure'`): `:426` (the case expression, already right), `:1441` (this rung) and `:1375` (`getType`'s unsupported pattern). The count is right. `MakeInferenceSpecific.forVarType` is the dual map's clamp, as cited.
- **Competing declarations (check 7).** I grepped every new Java name, the property and the ten test names across `src/com/sun/fortress/`, `compiler_tests/`, `library_tests/`, `tests/` and `Library/`. Each is found only in its own file. The exceptions are unrelated: `bigOperator` (the string constant in `DesugarerUtil.java` and `WellKnownNames.java`) and `instanceOf` (a Fortress function in three tests).
- **Count (check 10).** The rung declares no count and names no table. `git diff --name-only fa14a190c...HEAD` lists no path outside `explorations/`, `Specification/`, `ProjectFortress/tests/` and `interpreter/evaluator/`.
- **Ledger (check 11).** I searched for `not a singleton`, `Meet(`, `BOTTOM`, `functional method` and `EvaluatorBase`.
  - Row 471 (walk's `Meet … not a singleton` for a tuple argument at an `Object` bound) is F1's sibling. It is not repaired, and it keeps its home 3.
  - Row 511 is not moved by the rung.
  - No existing row covers F1, F2 or recommended rows 3 to 5.
- **A possible overlap with rung K.** `FTraitOrObjectOrGeneric.java` is outside section 4's list for W, which names "the file of walk's generic-method instantiation". If K names it as its load-time file, the stop "any rung editing … a file section 4 of the record names as another rung's" is met. The worker flags it; the gather decides it at the merge.

## 9. The failure-mode question

Loud failures that became quiet values:
- The join's `InterpreterBug` becomes the bound: `Any`, or the declared bound.
- `Missing type R` becomes the method's value.
- `Failed to find any matching overload` for `either(Apple, Cherry)` becomes the generic's value.
- Wherever nothing fixes a plain-bounded parameter, `BottomType` (which used to fail later with a unification error naming `BOTTOM`) becomes the bound: `{}.add("a", 1)` now answers `{a|->1}`.

Each value is the chapter's.

The typecase's `ProgramError` became a `MatchFailure` exception. It stays loud when uncaught (exit 1), but the message no longer names the matched type: `typecase match failure given Int` became `MatchFailure`.

## 10. Stops met

- **"A parameter nothing fixes bound to anything but its declared bound".**
  - Big operators: `EvaluatorBase.java:162`.
  - D3: `:194`, with `SkThroughBound` `BoxU[Apple]`.
  - Several bounds: `:309-313` with `:233-238`, and `SkTwoBoundW` `BottomType`.
  - Lifted by `POSITIONS.md:100`.
- **"A change to which declaration walk chooses".** `OverloadedFunction.java:1111` through `EvaluatorBase.java:61-65`: `either(Apple, Cherry)` runs the generic. Lifted by `POSITIONS.md:100`.
