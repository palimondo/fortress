<!-- Rung W of climb batch 18: walk reads the bounds and coercion targets of a generic method that a trait declares in the trait's method environment (way A of the row 766 probe, rows 766 and 765), and walk's load check names the overloading rule that refuses a pair it reads on its declared domains. Base db8fecd22; branch wip/rung-walk-trait-method-bounds; code commit 5c5dee93d. -->

# Rung W of climb batch 18: a trait's generic method's bounds, and the rule that refuses a generic pair

- problem: the batch 17 landing review's finding 1, row 766 against P-46, P-48 and P-74, and its finding 3, the refusal that names the rule P-45 removed (`explorations/reviews/batch-17-review.md:13-31`, `:39-44`).
- spec: `Specification/basic/inference.tex:47-180` ("The Static Arguments of a Call": the narrowest type into which every argument converts, the bound where nothing fixes a type parameter, never `BottomType`, `:81-106`); the three rules by name, `Specification/advanced/overloading.tex:531-564` ("Declarations with Static Parameters").
- precedent: a trait's method's instances evaluate their types in the trait's method environment, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:69` and `TraitMethod.java:29-31`, and batch 17's call path passes that environment (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:179`); walk's own refusal form, "Overloading of X and Y fails ...", `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:607-654` at 5c5dee93d (`describeOverloadingFailure`).
- deviation: `TraitGenericMethodInference` asserts two values beyond the patch's text, the `ZZ32`-with-`RR64` call (`ProjectFortress/tests/TraitGenericMethodInference.fss:63-64`).
- deviation: the Return Type and Meet messages say "not found", since walk's reading of the two rules is narrower than the rules in known places (rows 539, 550, 416, 779) (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:822-834`).
- deviation: the No Duplicates Rule keeps walk's message without the rule's name, as the brief asks (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:820-821`).
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `Specification/basic/inference.tex`, `Specification/appendices/changes.tex` (each in `a874948ac`; no line the team wrote is changed: `git blame db8fecd22` gives revival commits for every changed line).

## 1. What changed and why

**Rows 766 and 765 (way A, taken as it is).** A trait's generic method is a `GenericMethod` whose own environment is the trait's member environment, which has no parent, and whose `evaluationEnv` is the trait's method environment, where its instances bind and evaluate their types (the probe, section 2). The inference with coercion read the method's bounds and its arguments' coercion targets in the member environment, where the coercion lookup throws. It then fell back to unification (the join, with no argument converted), and a bound that failed to evaluate left its type parameter at `BottomType`. The probe's `way-a.patch` was applied with `git apply --include='ProjectFortress/src/*'` and not changed:

- `GenericMethod.getTypeEnv()` (`GenericMethod.java:106`): `evaluationEnv` for a trait's method, `getWithin()` otherwise.
- `EvaluatorBase.declarationEnv(g)` (`EvaluatorBase.java:512`): `getTypeEnv()` for a `GenericMethod`, `getWithin()` for any other generic.
- Read there: the bound at the instances (`boundAtInstances`, `:491`), the bounds of the inference with coercion (`:567`) and the coercion targets in `narrowest`'s two calls (`:646`, `:651`).
- `inferByUnification` (`:886`, the base's `:875`) still reads `getWithin()` (the record's call 1).

The same reading repairs row 765: on a `Square`, the inherited generic functional method `describe[\T extends Shape\](self, x: T)` is chosen beside the object's plain `describe(self, x: Circle)`, as the probe measured.

**The message.** `validOnDeclaredDomains` and `genericPairValid` return a `DomainReading` in place of a boolean (`OverloadedFunction.java:766`, `:808-814`, `:891`). The reading is one of: valid; refused by the No Duplicates Rule, by the Return Type Rule with the first or the second of the pair the more specific, or by the Meet Rule; or not read on the declared domains. `completeOverloadingCheck` (`:530-541`) raises the rule's message for a refused reading, after the second chance that `overlapCovered` gives as before. `ruleFailure` (`:817-839`) writes the message:

- No Duplicates: "Overloading of X and Y fails because their parameter lists have the same types", walk's message for it, also at the branch for a pair the check orders (`:540`).
- Return Type: "Overloading of X and Y fails the Return Type Rule: the first is more specific, and its return type is not found to be a subtype of the return type of every instance of the second that applies to its arguments" (or with second and first swapped).
- Meet: "Overloading of X and Y fails the Meet Rule: neither is found to be more specific than the other or to exclude it, and no declaration is found that is more specific than both and applies to every call to which both apply".

A pair not read on its declared domains keeps `describeOverloadingFailure`'s message; that is the team's code, unchanged (`:569-657`). Which pairs load is unchanged. When `overloadOk` is false, every branch of `describeOverloadingFailure` raises, so the pairs that reach the new raise are exactly the pairs refused before.

## 2. The tests: failing, passing, and the expected failure shown red

All through `explorations/compile-ladder/rung-inference-walk/harness-one.sh`, from the tree's root, after the setup lines.

Failing: the ten tests of commit a4ecc0e13, on the base code, before the edit was first built (the harness header: `# harness-one 2026-10-18T01:47:50Z; tree db8fecd22; ... cache empty`):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-trait-method-bounds/h-base <TraitGenericMethodInference, InheritedGenericFunctionalMethodBesidePlain, the six rekeyed tests and the two new ones, each .fss with its .test>

    FAIL: J5/0:other =/= J9/0:Box[ZZ64]; a ZZ32 and a ZZ64 fix T = ZZ64, the narrowest type into which both convert; inference.tex, section "The Static Arguments of a Call"
    Failed to find any matching overload, args = (Square), overload = {
     Refused at load, but did not satisfy load_exception_contains; expected
    fails the Return Type Rule
    with generic type, at least one pair of parameters must have excluding types
    Tests run: 10,  Failures: 10,  Errors: 0

Each of the eight refusal tests printed the old message where its key expected the new one. For example, `NoDuplicatesRuleWalk`: `dup[\U\](x:Box[\U\])... and dup[\T\](x:Box[\T\])... have parameters / with generic type, at least one pair of parameters must have excluding types`.

Passing: the same ten and the new expected failure, on the final code (the harness header: `# harness-one 2026-10-18T02:12:33Z; tree 5c5dee93d`):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-trait-method-bounds/h-final <the same files and XXXGenericFunctionalMethodsNestedWalk.fss>
    OK (11 tests)

The new expected failure was shown red on a deliberate fix through the harness (02:00:11Z). For that one run, the declaration over `U extends Round` was removed and the first expected value set to `"shape"`; then the file was restored (`cmp` against the saved copy is clean):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-trait-method-bounds/h-red ProjectFortress/tests/XXXGenericFunctionalMethodsNestedWalk.fss
    PASS
     Missing expected failure
    Tests run: 1,  Failures: 1,  Errors: 0

The tests:

- `ProjectFortress/tests/TraitGenericMethodInference.fss`, promoted from `XXXTraitGenericMethodInference` with `git mv` (`:57-64`). It keeps its three assertions and adds the probe's three: `Maker.pair()` gives `Empty[Box[Number]]`, `Over.same(z, w)` gives `3:ZZ64,4:ZZ64`, and `Holder[\ZZ64\]().held()` gives `Empty[ZZ64]`. Two more assert that `Maker.wrap(z, r)` on a `ZZ32` and an `RR64` gives `Box[RR64]`, with the `ZZ32` converted.
- `ProjectFortress/tests/InheritedGenericFunctionalMethodBesidePlain.fss`, promoted from `XXXInheritedGenericFunctionalMethodBesidePlain`; only its name changed.
- The six tests keyed on the old message, rekeyed (section 3).
- `ProjectFortress/tests/GenericBesidePlainReturnRuleWalk.fss` and `.test`: `f[\T extends Shape\](x: T): Box[\T\]` beside `f(x: Round): Box[\Round\]`, keyed "fails the Return Type Rule". It covers the generic-beside-plain branch of `validOnDeclaredDomains`, which no key covered.
- `ProjectFortress/tests/GenericBesidePlainNoMeetWalk.fss` and `.test`: `g[\T extends A\](x: T)` beside `g(x: B)`, with `C extends { A, B }`, keyed "fails the Meet Rule".
- `ProjectFortress/tests/XXXGenericFunctionalMethodsNestedWalk.fss`, a new expected failure for row 779 (section 11).

## 3. The tests keyed on the old message, and the pairs that keep it

Each is rekeyed to its rule, red on the base (section 2) and green on the edit:

| Test | Its pair | Rule broken | New key |
|---|---|---|---|
| `GenericReturnRuleInvariantWalk` | `f[\T extends Shape\](x: T): Box[\T\]`, `f[\U extends Round\](x: U): Box[\U\]` | Return Type (the second inside the first) | `fails the Return Type Rule` |
| `GenericReturnRuleOuterParamWalk` | `f[\T extends Shape\](x: T, y: T): T`, `f[\U extends Round\](x: U, y: Round): Round` | Return Type | `fails the Return Type Rule` |
| `NoDuplicatesRuleWalk` | `dup[\T\](x: Box[\T\])`, `dup[\U\](x: Box[\U\])` | No Duplicates | `fails because their parameter lists have the same types` |
| `NoDuplicatesRuleSizeWalk` | `dup[\nat n\](x: Vec[\n\])`, `dup[\nat m\](x: Vec[\m\])` | No Duplicates | `fails because their parameter lists have the same types` |
| `GenericOverloadInstancesApartWalk` | `o[\T\](x: P[\T\])`, `o[\T\](x: Q[\T\])`, overlapping at `Mixed` | Meet (an overlap nothing covers) | `fails the Meet Rule` |
| `GenericBoundsNoMeetWalk` | `sort[\P extends A\](x: ListI[\P\])`, `sort[\P extends B\](x: ListI[\P\])` | Meet | `fails the Meet Rule` |

I also ran directly, on the old code and the new, every expected-failure test that a pair refuses at load, to read its message (`tmp/rung-walk-trait-method-bounds/pairs.sh`, a loop of `old-fortress.sh ... tests/X.fss` and `bin/fortress tests/X.fss`, each with a `grep -m1` of the refusal). The same thirteen tests are refused this way on both codes; four changed their message and nine kept it.

    == XXXOverloadExistentialMeetWalk
    old: with generic type, at least one pair of parameters must have excluding types
    new: Overloading of m[\Q extends Num\](y:Seq[\Q\]):... and m[\P\](x:ArraySeq[\P\]):... fails the Meet Rule: neither is found to be more specific than the other or to exclude it, ...

- Changed: `XXXGenericBesidePlainReturnParam` (row 550) and `XXXGenericBesidePlainReturnRule` now name the Return Type Rule; `XXXGenericPairExcludesTogetherWalk` (row 740) and `XXXOverloadExistentialMeetWalk` (row 539) now name the Meet Rule.
- Kept:
  - `XXXComprisesCoverReturnWrong` and `XXXsubtypeRuleResultFail`: "the first result is not a subtype of the second".
  - `XXXComprisesMeetUncoveredWalk` and `XXXNatSizeExclusionWalk`: "are unrelated".
  - `XXXGenericOverload3` and `XXXtupleTypeParam3`: "their parameter lists have the same types".
  - `XXXInheritedOverload`, `XXXoverloadTest5` and `XXXGenericOverload2`: "... more specific ... but ... less specific".
  - None of these pairs is read on its declared domains: they are plain declarations, and in `XXXGenericOverload2` they are the two instances that the explicit instantiation `f[\A, B\]` makes (`XXXGenericOverload2.fss:21-24`).

After the change, no gated walk test gives the old message "with generic type, at least one pair of parameters must have excluding types". It stays for a pair that the check refuses because a type parameter is neither excluding nor ordered, when the pair is not read on its declared domains. Such a pair has a varargs parameter, or parameter lists of different lengths, or is neither two own generics nor one own generic beside a plain declaration (as a generic functional method of a generic trait or object beside another), or raises an error while its instances are read. Measured on a varargs pair, `v[\T extends Shape\](x: T...)` beside `v(x: Round...)`, the same on old and new code:

    old-fortress.sh /home/user/fortress-base18 ... RestPair.fss   and   bin/fortress RestPair.fss
    v[\T extends Shape\](x:T...):FortressLibrary.StringRestPair.fss:8:1-49 has a parameter
    with generic type, at least one pair of parameters must have excluding types

Two pairs outside the tests changed too. F-155's pair `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` gave the old message and now gives "fails the Meet Rule". So does row 219's probe `explorations/apl/rung-1/r07_edge.fss` (`tally[\nat s\](v: Array1[\Char,0,s\])` beside `tally[\nat s\](v: Vector[\RR64,s\])`).

## 4. Values old against new

I wrote a program with every row of the probe's table (section 5 of the probe) and ran it on the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base18 <tree>/tmp/old-caches TraitBoundsProbe.fss`) and on the new (`bin/fortress TraitBoundsProbe.fss`). Part of the `diff` of the two outputs:

    < trait wrap(z,w): Box[\AnyIntegral\] 3:ZZ32
    < trait make(): Empty[\BOTTOM\]
    > trait wrap(z,w): Box[\ZZ64\] 3:ZZ64
    > trait wrap(z,r): Box[\RR64\] 3.0:RR64
    > trait make(): Empty[\Number\]

Every value of the probe's walk-after column comes out as the probe gives it:

- `Maker.wrap(z, w)`: `Box[\ZZ64\] 3:ZZ64`.
- `Maker.wrap(z, r)`: `Box[\RR64\] 3.0:RR64`.
- `Maker.make()`: `Empty[\Number\]`.
- `Maker.same(z, w)` alone and `Over.same(z, w)`: `3:ZZ64,4:ZZ64`.
- `Over.same("a", "b")`: `strings`.
- `GMaker[\Number\]().gwrap(z, w)`: `Box[\ZZ64\] 3:ZZ64`.
- `GMaker[\ZZ64\]().gmake()`: `Empty[\ZZ64\]`; `GMaker[\Number\]().gmake()`: `Empty[\Number\]`.
- `Maker.pairM()`: `Empty[\Box[\Number\]\]`.
- `Picker.pick(Circle)`: `picked`.
- The same methods declared in an object and as functions: unchanged.
- The written `Maker.wrap[\ZZ64\](z, w)`: `Box[\ZZ64\] 3:ZZ64`.

`Picker.pick(5)` stops the same way on both, `Unification error ... abm=K=(Int,Any)`, as the probe left it: `inferByUnification` still reads the bound late.

The new refusal messages, each from a direct run (`cd ProjectFortress && ../bin/fortress tests/X.fss`):

    Overloading of f[\U extends Round\](x:U):Box[\U\]GenericReturnRuleInvariantWalk.fss:12:1-51 and f[\T extends Shape\](x:T):Box[\T\]GenericReturnRuleInvariantWalk.fss:11:1-50 fails the Return Type Rule: the first is more specific, and its return type is not found to be a subtype of the return type of every instance of the second that applies to its arguments

## 5. Where the fix belongs, and the precedent

`explorations/coordinator/map/spec-to-implementation.md:193` and `:214` put walk's inference in `EvaluatorBase.java` and its overloading in `OverloadedFunction.java`. The edit is under `interpreter/`, so it changes walk only (the skill's `interpreter.md`).

The team already evaluates a trait method's types in its method environment: the instances' factory does (`GenericMethod.java:69`, `evaluationEnv.extendAt(location)`), and so does `TraitMethod.getEvalEnv` (`TraitMethod.java:29-31`). Batch 17 passes that environment as the inference environment (`DottedMethodApplication.java:179`), the only inference site of that file. In `EvaluatorBase.java`, ten sites read a generic's environment with `getWithin()` on the base, and the patch changes four of them (`:491`, `:557`, `:634-635`, `:639-640`). The other six are:

- `selfType.getWithin()`, the receiver's environment for a generic functional method (`:553`, `:864`);
- `inferByUnification` (`:875`), left by call 1;
- a big operator's instantiation (`:239`, a `GenericFunctionOrConstructor`, never a `GenericMethod`) and its declared result (`:284`, `:332`).

`OverloadedFunction.instanceHolding` reads `getWithin()` too (`OverloadedFunction.java:2337`), but for own generics only.

The ways the language and the tree offer are the probe's A to H (its section 3):

- A: read the bounds where the trait declares them (built).
- A2: read them in the environment each caller passes.
- B: read them in the call's lexical environment.
- C: refuse loudly.
- D: give the trait's method the method environment as its own. This reaches the overload comparisons, which the team kept apart (`GenericMethod.java:92`).
- E: mend only the coercion lookup, which leaves `BottomType`.
- F: re-make inherited methods in the object.
- G: the program writes the static argument, or declares the method in the object.
- H: carry the checker's static arguments into walk's tree (after the switch-over).

For the message: the checker's messages name the condition, not the rule ("There are multiple declarations of ... with the same parameter type", "Invalid overloading of ...", "the return type of ... should be a subtype of ...", `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:465-470`, `:517-519`, `:724-725`). Walk's own form is "Overloading of X and Y fails ..." (`OverloadedFunction.java:607-654`), and the new messages follow it.

## 6. What the specification settles

The chapter already infers a method's static arguments with coercion and at its bound (`Specification/basic/inference.tex:47-180`), and it names the three rules (`Specification/advanced/overloading.tex:531-564`), so no normative sentence changes. The specification quotes neither message (`grep -rn "excluding types" Specification` prints nothing).

## 7. Suites, stages and the ladder

- `ant testSystem`, once, on the final code (02:00:49Z, after the last edit): shards of 159, 167, 166 and 160 tests, 0 failures, `BUILD SUCCESSFUL`, `Total time: 3 minutes 54 seconds`. The 652 tests are climb batch 17's gate's 649 (`explorations/compile-ladder/climb-batch-17/gate/summary.txt`, `system-0` to `system-3`: 156, 171, 157, 165) plus the three new files; the promotions are renames.
- `ant testSpecData`, once (02:11:09Z): `Tests run: 130, Failures: 0, Errors: 0`, `BUILD SUCCESSFUL`, `Total time: 58 seconds`.
- The expected-failure tests: all 126 that the base holds ran through the harness on the old code (`FORTRESS_HOME=/home/user/fortress-base18 .../harness-one.sh`) and on the new, and gave `OK (126 tests)` on both. Each test's first line of output is the same in both runs; only the order in which four threads interleave lines differs.
- No walk test's verdict changed beyond the two promotions, the six rekeyed tests and the three new ones.
- The checker count and the distance were not run. Every path the rung changes (`git diff --name-only db8fecd22`) is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` or `explorations/`, which neither stage reads.
- The change's own ladder subset is empty, and no driver was run. No recorded first error in the baseline's raw output names the code the rung touched (`grep -rl 'interpreter\.evaluator\|interpreter/evaluator\|OverloadedFunction\|EvaluatorBase\|GenericMethod\|excluding types' explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing), and the ladder runs only the compiled path.
- The specification builds: `./ant genSource` and `./ant tex` both end in `BUILD SUCCESSFUL`, and `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence" fortress.log` prints 0. The skill's own pattern counts 42 lines, but each is the text of LaTeX's warning macro, as climb batch 17 rung W found. The front matter's paragraph is not made false.
- Not run: `testQuick` (no checker edit) and microGPT (no line of the model changed, and the brief does not ask).

## 8. Sentences made false

Edited, in the revision form. Walk's box is itself a `\revision` callout, and Appendix I's entry "The inference of a call's static arguments" is its entry:

- `Specification/basic/inference.tex:291-293` at db8fecd22, row 765: "Where an object declares a plain functional method beside a generic one of the same name that it inherits from a trait, a call that only the generic one fits finds no overload". Removed.
- `Specification/basic/inference.tex:299-304` at db8fecd22, row 766: "A generic dotted method that a trait declares it instantiates without reading the bounds where they are declared: ...". Now (`:296-298`): "It reads the bounds of a generic method that a trait declares, and the types into which the arguments convert, where the trait declares the method, as it reads those of a method that an object declares."
- `Specification/basic/inference.tex:422-424` at db8fecd22: "except a bounded one of a method that a trait declares, which it instantiates at \TYP{BottomType} (row~766)". Now "a method that a trait declares among them" (`:417`).
- `Specification/appendices/changes.tex:2162-2164` and `:2172-2177` at db8fecd22. Now in the entry's dated form (`:2162-2164`, `:2172-2182`): "was not chosen ... (row~765), until 18~October 2026" and "Until 18~October 2026 it instantiated ... (row~766). Since then it reads the bounds ...".

Made false and not edited, for the gather (record.md, "For FACTS" and "Revival change"):

- FACTS F-253, its sentence "A method that a trait declares is the exception: ... takes `BottomType` (row 766, `XXXTraitGenericMethodInference`)".
- FACTS F-252, "otherwise the pair is refused, 'at least one pair of parameters must have excluding types'": the refusal now says "fails the Return Type Rule".
- FACTS F-238, "otherwise refused, 'with generic type, at least one pair of parameters must have excluding types' (F-155)": now "fails the Meet Rule".
- FACTS F-155, "The message is 'at least one pair of parameters must have excluding types' (row 416), as for `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])`": now "fails the Meet Rule".
- The skill's `references/revival-changes.md:148`, its last sentence: "A generic method that a trait declares is still instantiated without coercion and without its bound (ledger row 766)."
- The notes of ledger rows 219, 539, 550, 713 and 740 quote the old message, and so does row 539's claim; each pair now gives the rule's message (section 3; row 713's pair measured by the skeptic, SKEPTIC.md section 4); their notes have no room left (section 11). Row 297's notes quote it too; it has no reproducer, so it was not measured.

Not made false: the rest of walk's box, and the skill's `interpreter.md:38` ("It loads them only if the No Duplicates Rule, the Meet Rule and the return-type rule hold there"). Walk's box does not name row 779, a departure that holds before and after this change (section 11).

## 9. Points to report

- way-a.patch's code was taken as it is: its two Java files by `git apply --include='ProjectFortress/src/*'`, byte for byte (the changed lines of `git diff db8fecd22` over `EvaluatorBase.java` and `GenericMethod.java` equal the patch's). Its test text was taken with two more assertions (`TraitGenericMethodInference.fss:63-64`).
- Values of the probe's table that this build gives otherwise: none (section 4).
- A walk test whose verdict changes beyond the promotions and the rekeyed tests: none (section 7). The new tests are listed in section 2.
- Each test keyed on the old message, with its new key and its rule: section 3's table. Pairs still refused with the old message: none among the gated tests; section 3 lists the cases where it stays.
- Team lines changed in walk's inference and its load check's messages: none. `git blame db8fecd22` gives commits of 2026 for every changed line (`EvaluatorBase.java:481-504`, `:557`, `:634-640`; `OverloadedFunction.java:530-545`, `:763-793`, `:844-865`). The team's message strings are kept: "fails because their parameter lists have the same types" is reused (`OverloadedFunction.java:629`, the team's, at 5c5dee93d), and "with generic type, ..." is left where it is (`:583`).
- Sentences made false, and the ones edited: section 8.
- A walk edit beyond the three files, or a library or checker edit: none.

## 10. Decisions

1. **Way A as the patch has it**, not A2 to H (section 5). It is the brief's default and the record's call 1; the probe measured it, and this build gives its every value (section 4).
2. **The patch's new accessor `getTypeEnv`**, not an override of the team's `getEvalEnv` on `GenericMethod`. `getEvalEnv` is read by `FunctionClosure.finishInitializing` (`FunctionClosure.java:243`) and by `TraitMethod.envForApplication` (`TraitMethod.java:56`), so an override would reach the environment a method applies in, as way D does.
3. **`inferByUnification` left as it is** (`EvaluatorBase.java:886`). This is call 1 of the record: the probe measured that reading the bound there moves no value and turns `Picker.pick(5)`'s refusal into an internal error.
4. **The rule carried out by an enum that the two methods return** (`DomainReading`), with both methods keeping their names, which F-252 and ledger notes cite. Not taken: a field set beside a boolean (the helpers are static, so a shared field is unsafe), new methods under new names, or a second reading after a refusal.
5. **Every pair that `validOnDeclaredDomains` reads and refuses names its rule, a generic beside a plain declaration too**, not only the pairs whose check printed "with generic type". Such a pair whose check found one parameter more specific and another less specific got "(first) ... is more specific ... but ... less specific", though the declared-domain reading refused it by the Return Type or the Meet Rule. A pair that is not read keeps today's message.
6. **The rule's message raised after `overlapCovered`'s second chance**, as the old refusal was, not before it, so that which pairs load does not change.
7. **"Not found" in the Return Type and Meet messages**, not a flat claim that the rule fails. Walk refuses valid pairs in rows 539, 550, 416 and 779, where a flat message would be false.
8. **Two more assertions in `TraitGenericMethodInference`** (the `ZZ32`-with-`RR64` call), not the patch's text alone. `RR64`'s coercion from `ZZ32` is a coercion target of its own (P-74), and the call is in the probe's table.
9. **Two new refusal tests for the generic-beside-plain branch**, not none: no key covered that branch of `validOnDeclaredDomains`, and its messages change.
10. **Row 779 recorded as an expected failure (home 2)**, not repaired. The repair belongs in the declared-domain reading of functional methods, beyond the brief's three changes, and the brief keeps `inferByUnification`, which `instanceHolding` calls, as it is.
11. **Walk's box: the row 765 sentence removed, and the row 766 sentence replaced by what walk now does**; Appendix I rewritten in the entry's dated form. Row 779 is not added to the box: the brief names the lines this rung edits, and the gather corrects the rest.

## 11. Defects and their homes

- **Row 766**, a trait's generic dotted method instantiated without its bounds and coercions: home 1, `TraitGenericMethodInference` (promoted).
- **Row 765**, an inherited generic functional method beside an object's plain one: home 1, `InheritedGenericFunctionalMethodBesidePlain` (promoted).
- **The refusal of a generic pair with the message of the rule P-45 removed** (the review's finding 3, no row): home 1, the six rekeyed tests and `GenericBesidePlainReturnRuleWalk` and `GenericBesidePlainNoMeetWalk`.
- **Row 779, new.** Walk refuses at load two generic functional methods of a trait, `which[\T extends Shape\](self, x: T)` beside `which[\U extends Round\](self, x: U)`. The pair is a valid overloading by the Return Type Rule, and the same two top-level functions load, with a call taking the more specific.
  - Measured on old and new code: `TopIdentPair.fss` prints `round` and `shape`; `FunctionalIdentPair.fss` is refused, on the old code with "with generic type, ..." and on the new with "fails the Meet Rule".
  - The same pair declared in an object, or with `T` unbounded, is refused the same way.
  - The compiled path stops at compile with row 724's `ClassCastException: class com.sun.fortress.compiler.index.FunctionalMethod cannot be cast to class com.sun.fortress.compiler.index.Method` (measured on the old code; the rung does not change the compiled path).
  - Home 2, since the specification settles it (`Specification/advanced/overloading.tex:531-564` and its allowed `ident` pair at `:608-615`): `ProjectFortress/tests/XXXGenericFunctionalMethodsNestedWalk.fss`, and a new row.
- **Row 772**, the compiled path's `Box[Object]` at a `ZZ32` and an `RR64`: not changed. Walk's side now gives `Box[\RR64\]` with the `ZZ32` converted (`TraitGenericMethodInference.fss:63-64`).

The ledger rows whose notes the change reaches, and their room (row length, then notes length, at db8fecd22):

- Rows 21 (853, 533) and 772 (957, 424) take a note.
- Rows 364 (1189), 416 (1179), 219 (1167), 539 (1186, notes 701), 550 (1144), 713 (1171) and 740 (1161) have no room left, so record.md gives their text for a rewrite and adds nothing.

## 12. Commands

- `git apply --include='ProjectFortress/src/*' explorations/perf-probes/trait-generic-method-inference/way-a.patch`: applies the patch's Java alone; its tests were taken by hand.
- `FORTRESS_HOME=/home/user/fortress-base18 nohup nice -n 19 bash -c "( /home/user/fortress-base18/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/<dir> <files> ) > <log> 2>&1; ..."`: runs the expected-failure tests on the old code (the skill's form, `worktrees.md`).