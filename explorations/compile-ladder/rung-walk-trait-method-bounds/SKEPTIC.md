<!-- The skeptic's verdict on rung W of climb batch 18 (walk reads a trait's generic method's bounds where the trait declares them, rows 766 and 765, and names the rule that refuses a generic pair): approved, with corrections of the record and one new expected failure (row 780), none contested. -->

# Rung W of climb batch 18: the skeptic's verdict

- Head judged: `5c5dee93dc6f6c5558ce5cee348c4d2765480bc2` (the worker's code commit; its tests commit is `a4ecc0e13`), base `db8fecd22`.
- My commits: `b03b77e8b` (the worker's REPORT.md and record.md from the run's journal, byte for byte), `eb5a6a73d` and `f3c031c47` (corrections), and this file.
- Verdict: **approved**. The code change is right and as small as its tests need; the corrections are of the record and add one expected failure; none is contested.

## 1. What I checked

1. **Stages.** The report says neither the count nor the distance stage ran. `git diff --name-only db8fecd22...HEAD` lists only paths under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` and `explorations/` (a filter of the list by the brief's allowed prefixes prints nothing, exit 1). So no stage reads the change, and none was owed. The report's tables are none; the gate's tables on the merged tree are the record.
2. **Test first, in the worker's transcript** (`agent-aa84f5c4fea3021e5.jsonl`, times UTC, call ids):
   - `mp3TGa` 01:47:50, `harness-one.sh .../h-base` over the ten tests on the seeded base build, ended 01:48:05 (`gm8hcZ`): `Tests run: 10,  Failures: 10,  Errors: 0`, with the lines recordedFailure quotes (`FAIL: J5/0:other =/= J9/0:Box[ZZ64]; ...`, `Failed to find any matching overload, args = (Square)`, `Refused at load, but did not satisfy load_exception_contains; expected` / `fails the Return Type Rule` / `with generic type, at least one pair of parameters must have excluding types`). The harness header reads `tree db8fecd22 ... cache empty`.
   - `gfKog4` 01:49:25, `git apply --include='ProjectFortress/src/*' .../way-a.patch`: after that run. `BhrU3R` 01:51:08, the first `ant compileAll`: after it.
   - Last code edit `WFrSdG` 02:00:40 (the Meet Rule message's wording); `tFVmhj` 02:00:49 `ant testSystem`, which builds first; `ZUWCSs` 02:12:33 `harness-one.sh .../h-final` over the same ten and the new expected failure: `OK (11 tests)`.
   - The expected failure `XXXGenericFunctionalMethodsNestedWalk` was shown red on a deliberate fix (`K6bP4H` 02:00:10: `PASS` / ` Missing expected failure` / `Tests run: 1,  Failures: 1`), and restored.
   - The order holds (the skill's `tests-writing.md`, "The order").
3. **The diff, line by line** (section 2).
4. **Where the fix belongs, and the precedent** (section 2).
5. **The tests.** Each exercises its defect. Each has one comment line, cites the specification by file and section, and is named by its topic. `TraitGenericMethodInference.fss` keeps a `println("REACHED")` from its `XXX` form, which is harmless.
6. **My own programs**, under walk and on the compiled path, the new code against the old (section 3).
7. **The homes** of every defect named or measured (section 4).
8. **The ledger and the sibling sites** (sections 2 and 4).
9. **The report**: its provenance lines opened (one citation wrong, corrected), the sentences made false (two missing, added), the suites (section 5).
10. **Competing declarations.** `DomainReading`, `ruleFailure`, `declarationEnv` and `getTypeEnv` are declared once each in `ProjectFortress/src/com/sun/fortress/`. `declarationEnv` is otherwise only `GenericMethod`'s constructor parameter, and `returnTypeRule` otherwise only a method of the checker's `OverloadingChecker.scala`. The new test components (`TraitGenericMethodInference`, `GenericBesidePlainReturnRuleWalk`, `GenericBesidePlainNoMeetWalk`, `XXXGenericFunctionalMethodsNestedWalk`, `InheritedGenericFunctionalMethodBesidePlain`, and my `XXXGenericTraitFunctionalMethodsNestedWalk`) appear once each across `tests/`, `compiler_tests/`, `library_tests/`, `other_compiler_tests/` and `test_library/`. No file outside `OverloadedFunction.java` holds the old message (`grep -rln 'excluding types' ProjectFortress/ Library/`), so nothing else was keyed on it.
11. **Failure mode** (section 6).

## 2. The diff

**Rows 766 and 765.** The two Java files are the probe's `way-a.patch`, applied unchanged. `GenericMethod.getTypeEnv` (`GenericMethod.java:106`) returns `evaluationEnv` for a trait's method and `getWithin()` otherwise; for an object's method the two are one environment (the probe, section 2, `BuildObjectEnvironment.java:39-40`). `EvaluatorBase.declarationEnv` (`:512`) is read at the four sites the brief names (`:491`, `:567`, `:646`, `:651`), and `inferByUnification` (`:886`) is unchanged, as the record's call 1 has it. The new accessor, not an override of `getEvalEnv`, keeps the environment a method applies in (decision 2), which is the brief's "Way D ... is not yours".

**The message.** `validOnDeclaredDomains` and `genericPairValid` return a `DomainReading`. Each refusal maps to its rule as `Specification/advanced/overloading.tex`, "Declarations with Static Parameters", states it: each domain inside the other is the No Duplicates Rule; one inside the other with its return type not found below is the Return Type Rule, with "first" or "second" naming the inner one (`plain == o1`, `gen == o1`, and in `genericPairValid` `gHolding` means the first lies inside the second); neither inside the other and no cover is the Meet Rule. The new refusal is raised only where the old code went on to `describeOverloadingFailure`, after `overlapCovered`'s second chance. With `distinct` false and `overloadOk()` false, every branch that `overloadOk` tests has its own raise in `describeOverloadingFailure` (`OverloadedFunction.java:548-567` against `:576-655` at 5c5dee93d), so the same pairs are refused as before and only the message changes. The No Duplicates text is the team's, at `:629`.

The brief limits the rename to pairs that the parameter check finds "neither excluding nor ordered". The worker renames every refusal of the declared-domain reading (decision 5), so a generic-beside-plain pair that the check read as "more ... but ... less specific" now gets "fails the Meet Rule" (my `SkM2`, section 3). The brief lets the worker carry the rule "as you see fit", and the pair is refused by that reading, so I take this as within the brief. It is a point to report, listed.

**Precedent and siblings.** The team evaluates a trait method's instance types in `evaluationEnv` (`GenericMethod.java:69`, `TraitMethod.java:29-31`), and climb batch 17 passes it to the inference (`DottedMethodApplication.java:179`). Of `EvaluatorBase.java`'s other `getWithin()` reads, only `inferByUnification` (`:886`) reads a `GenericMethod`'s bounds, and the record keeps it. Two sibling sites remain in the files the rung touches. Neither is owed by this rung:
- `GenericMethod.finishInitializing` (`GenericMethod.java:148`) evaluates a method's declared types in `getEnv()`. For a trait's method that is the member environment. When the name is overloaded in a trait, this stops with "This should have been an environment with a Top Level": my `SkNested2`, a generic trait's `two[\T extends Shape\](self, x: T)` beside `two(self, x: Circle)`. That is row 723's known face, and row 760's in a trait. Their repair also needs the method's own static parameters ('Missing type T'). `getTypeEnv` now gives the environment the trait case lacks.
- `OverloadedFunction.inferenceEnv` (`:2198-2200`) returns `getWithin()` for a `GenericFunctionOrMethod`. A trait's `GenericMethod` reaches the inference through its symbolic instance, which takes the other branch (`evaluationEnv`), and the bounds are now read by `declarationEnv` whatever environment is passed.

**The specification.** No normative sentence changes. Walk's box (`Specification/basic/inference.tex:296-298`, `:417`) and Appendix I's entry (`changes.tex:2162-2164`, `:2172-2182`) describe what my programs measure for every well-typed call (section 3). The box's "as it reads those of a method that an object declares" does not hold for one kind of call. A call outside a bound that the inference with coercion does not instantiate still fails with unification's error, which reads no bound. The object's method fails with another error. Both refuse the call, so only the error's text differs. I left the box as it is and put the fact into record.md's F-253 text (section 4).

## 3. My programs: the old code against the new

All are under `tmp/rung-walk-trait-method-bounds/skeptic/`. They were run from there after the setup lines, at `FORTRESS_THREADS=1`: the old code by `/home/user/fortress-base18/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base18 /home/user/fortress-traitbounds/tmp/old-caches P.fss`, the new by `/home/user/fortress-traitbounds/bin/fortress P.fss`. The diff writes no mutable state, field or atomic block, so no four-thread run is owed. My expected failure ran at four threads through the harness.

**`SkTraitObj.fss`**: the same generic methods in a trait two levels up from the object, and in an object.

    old: trait  wrapN(z,w)  Box[?] ZZ32          new: trait  wrapN(z,w)  Box[ZZ64] ZZ64
    old: trait  wrapN(z,n)  Box[?] ZZ32          new: trait  wrapN(z,n)  Box[ZZ64] ZZ64       (ZZ32 and NN32)
    old: trait  mkS()  Empty[?]                  new: trait  mkS()  Empty[Shape]
    old: trait  inner  Box[?] ZZ32               new: trait  inner  Box[ZZ64] ZZ64           (an unqualified call inside the trait)
    old: (stops) Unification error ... Cannot unify AnyIntegral ... with S ... abm=T=(AnyIntegral,Any)
                                                 new: trait  Gh[ZZ64].gw(z,w)  Box[ZZ64] ZZ64  (gw[\T extends S\] in Gh[\S extends Number\])

On the new code, every trait line equals its object line: `wrapN(w,r)` gives `Box[Number] ZZ64`, `wrapS(C,S)` `Box[Shape] Circle`, `wrapU(z,s)` `Box[Any] ZZ32`, `mkU()` `Empty[Any]` and `viaBox(z,Box64)` `Box[ZZ64] ZZ64`.

**`SkSelfBound.fss`**: `mx[\T extends StandardTotalOrder[\T\]\](a: T, b: T)` stopped on the old code (`Cannot unify AnyIntegral ... with StandardTotalOrder[\T\]`). On the new code it gives `trait  mx(z,w) Box[ZZ64] ZZ64`, equal to the object's. **`SkMidTrait.fss`**: the generic method in one trait beside a plain one in a subtrait, or in a sibling trait, gives `ZZ32,ZZ64` on the old code and `ZZ64,ZZ64` on the new, `strings` on both. **`SkVarargs.fss`**: varargs and tuple parameters give `AnyIntegral` for trait and object, old and new (row 511, unchanged).

**`SkFail*.fss`**: calls outside the bound fail on both codes. The trait's method fails with `Unification error ... Cannot unify Int ... with Shape ... abm=K=(Int,Any)`; the object's fails with `** bug! Meet(Int, Shape) not a singleton: []`; a `String` argument gives `abm=T=(Object,Any)` against `Actual type FlatString out of bounds for variable T`. The errors are the same on old and new.

**`SkFunctional*.fss`, `SkBody*.fss`**: a generic functional method's instance (trait or object) and a generic function at one argument class bind `T` to the run-time class: `tl(z) ?` and `tl2(z,w) ZZ64`. That is row 364's face ("rung K's inference keeps it for arguments of one class"), the same on old and new, and not new.

**The compiled path** (`comp/SkCompTrait.fss`, old code: `old-fortress.sh ... compile`, then `... run SkCompTrait`):

    trait  first(z,w) ZZ64
    trait  firstN(z,w) ZZ64
    trait  firstS(C,S) Circle
    PASS

Each trait line equals its object line, and walk now agrees. The rung changes no compiled code, so the old code's compiled run is the new code's too. The rung tree's own caches were emptied by its `testSystem` build, and I ran no library order there.

**Messages** (`SkM*.fss`, `SkF155.fss`, `SkNestedObj.fss`): the first line of the refusal, old against new.

| Program | Pair | Old | New |
|---|---|---|---|
| `SkM1` | row 713's `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)` | with generic type, at least one pair ... | fails the Meet Rule |
| `SkM2` | `f[\T extends Round\](x: T, y: Any)` beside `f(x: Shape, y: ZZ32)` | (first) y is more specific ... but ... | fails the Meet Rule |
| `SkM3` | `f[\T\](x: T)` beside `f[\T, U\](x: T)` | with generic type, ... | fails because their parameter lists have the same types |
| `SkM5` | `f[\T extends Shape\](x: T): T` beside `f(x: Round): Shape` | with generic type, ... | fails the Return Type Rule: the first is more specific ... |
| `SkM6` | `opr OPLUS[\T extends Number\](a: T, b: T): T` beside the `ZZ32` one | with generic type, ... | fails the Return Type Rule (row 550's kind) |
| `SkF155` | F-155's `h[\I\]`/`h[\J\]` pair | with generic type, ... | fails the Meet Rule |
| `SkNestedObj` | Row 779's pair in an object | with generic type, ... | fails the Meet Rule |
| `SkM4`, `SkM7`, `SkM8` | functional pair in a generic trait; two-parameter nested generics; `Box[\T\]` beside `Box[\Round\]` | loaded | loaded |

Each new message names the rule that the pair breaks by the specification's section, and the first and second read correctly against the order of the two declarations it names. Which pairs load is the same on both codes.

## 4. Defects and their homes, and my corrections

- Rows 766 and 765: home 1, the promoted tests. Right.
- The old message for a generic pair: home 1, the eight keyed tests. Right.
- Row 779, the worker's: home 2, `XXXGenericFunctionalMethodsNestedWalk`. Right, but its claim said "of a trait or object". In a trait with static parameters the same pair loads (`SkNested`), so I corrected the claim to "of a trait or object without static parameters" and added row 780 to its siblings (`eb5a6a73d`). The row passes the template on a copy of the ledger (`ledger.py add ... --ledger <copy>`), at 1,167 characters.
- **Row 780, measured by me.** Under walk, two generic functional methods of a trait with a static parameter, one inside the other, load, and a call fails:

      cd ProjectFortress && ../bin/fortress tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss
      Cannot find definition for method which[\T extends Shape\](self:Holds[\S\],x:T):FortressLibrary.String given receiver H[\ZZ32\]

  The same happens on the base (`SkNested`, old and new: `Cannot find definition for method which[...] given receiver Go[\ZZ32\]`). With the declaration over `U` removed, the call gives `shape` (`SkNested2`: `single bounded: Circle shape`). The compiled path stops at compile with row 724's `ClassCastException: ... FunctionalMethod cannot be cast to ... Method` (`comp/SkCompNestedG.fss`, old code). The specification settles it (`overloading.tex`, "Declarations with Static Parameters": the Return Type Rule holds, both return `String`), so it is home 2: `ProjectFortress/tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss` and the row 780 in record.md (1,093 characters, checked on a copy of the ledger). Through the harness:

      FORTRESS_HOME=/home/user/fortress-base18 /home/user/fortress-base18/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/.../h-old <tree>/ProjectFortress/tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss
       OK Saw expected exception
      OK (1 test)
      explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/.../h-head ProjectFortress/tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss     (tree b03b77e8b)
       OK Saw expected exception
      OK (1 test)
      the same, with the declaration over U removed and the first expectation set to "shape", then restored (cmp clean):
      PASS
       Missing expected failure
      Tests run: 1,  Failures: 1,  Errors: 0

- Row 713 (CONTESTED): its notes quote the old message, and its pair now gets "fails the Meet Rule" (`SkM1`). The worker's list of rows made false missed it. Row 539's claim, not only its notes, quotes the old message. Both are now in record.md and REPORT.md sections 8 and 11 (`eb5a6a73d`, `f3c031c47`). Neither row has room for a note (713 is at 1,171 characters), and no command edits an open row's claim.
- F-253's corrected text in record.md now says that a call outside a trait method's bound still fails with unification's error, unlike the object's (`eb5a6a73d`; section 3, `SkFail*`).
- REPORT.md's problem line cited `batch-17-review.md:42-59` and `:68-72`. Findings 1 and 3 are at `:13-31` and `:39-44`. Corrected (`f3c031c47`).

## 5. Suites

The worker's `ant testSystem` ran once on the final code (`tFVmhj`, 02:00:49, after the last edit): shards of 160, 166, 167 and 159 tests, 0 failures, `BUILD SUCCESSFUL`, `Total time: 3 minutes 54 seconds`, 652 tests. Its `ant testSpecData` gave `Tests run: 130, Failures: 0, Errors: 0`, `BUILD SUCCESSFUL`. My corrections change no Java or Scala, so no suite was owed after them. My one new walk file makes the gate's interpreter count 653.

## 6. The failure-mode question

The rung turns three loud failures into values, and each value is the specification's:
- a generic trait's method bounded by the trait's parameter (`Gh[ZZ64].gw(z,w)`) stopped with a unification error and now gives `Box[ZZ64]` with the `ZZ32` converted;
- a self-bounded trait method (`mx`) stopped the same way and now gives `Box[ZZ64]`;
- row 765's call stopped with "Failed to find any matching overload" and now runs the inherited generic declaration.

Each value equals the one the same method gives when declared in an object, and the compiled path's. The base's quiet wrong values (`Box[\AnyIntegral\]` with the `ZZ32` unconverted, `Empty[\BOTTOM\]`) are gone. No refusal at load became a load.

## 7. Where I differ from the worker

- Decision 10 records row 779 "of a trait or object". The pair loads in a generic trait, and its call fails there (row 780). The claim is narrowed in record.md; the decision itself stands.
- Section 8 of the report left out row 713 and row 539's claim; added.
- My first commit, `b03b77e8b`, carries the session's own footer, with the tier name, in place of the skill's `Co-Authored-By: Claude <noreply@anthropic.com>`. It is pushed, so I did not rewrite it. My later commits carry the skill's footer.

## 8. Left for the gather

- Appendix I's entry "Overloading with static parameters" (`Specification/appendices/changes.tex:2697-2703`) says that the interpreter reads two functions with static parameters on their declared domains by the three rules. Its departures should name row 779 and row 780, which are functional methods. That entry is not this rung's to edit.
- The skill's `references/revival-changes.md:46` ("Walk's check of two generic declarations", Resolution) may gain the three messages, as record.md says. It may also gain row 779 and row 780 as departures. Its `:148` should lose its last sentence (record.md).
- The rows with no room: 219, 364, 416, 539 (its claim too), 550, 713 and 740 (record.md).

## 9. Verdict

Approved. The change is the probe's way A as the record decides it, plus a message by rule that changes no pair's verdict, with its tests seen failing on the base's code before the edit and passing after it. My corrections are of the record. They add one expected failure, for a defect that my programs measured on the base and that the rung does not touch. None is contested.
