# Rung C (climb batch 12): the expected type at a repeated operator and at a label body, and a written static argument's bound (rows 644, 642, 651)

problem: rung E's skeptic's measurements of row 644 and of row 651's second shape (`explorations/compile-ladder/rung-checker-expected-type/SKEPTIC.md:87-95`, `:62-85`), with the expected failures `XXXInferRepeatedOperatorContext`, `XXXMethodStaticArgsBoundNamesOther` and `XXXMethodStaticArgsBoundNamesOtherSameName` at the base, and the distance stage's per-site list, 'Function body has type Any, but declared return type is ().' at `Library/String.fss:431` (row 642), in the batch record's rung C (`explorations/compile-ladder/gate/distance-sites.tsv:117`; `explorations/coordinator/CLIMB-BATCH-12.md:208`)
spec: an operator application has the expected type (`Specification/basic/inference.tex:149-151`, `:143-145` at the base); a repeated operator is the multifix application where a declaration accepts the operands, else left-associated binary applications (`Specification/basic/operators/chained-multifix.tex:42-48`); a `label`'s type is the union of its body's last expression's type and its exits' `with` values' types (`Specification/basic/expressions/label.tex:66-70`); a dotted method invocation may write its static arguments (`Specification/basic/expressions/method-invocation.tex:40`, `:49`)
precedent: the loose juxtaposition since rung E (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala:170-197`); the `typecase` clause since rung E (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:340`, `:664-667`); a trait type's static arguments checked against their bounds with the arguments put in by a `StaticTypeReplacer` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:157-162`); Appendix I's entry as rung E wrote it, amended in its own form (`Specification/appendices/changes.tex:1984-2124`)
deviation: an exit is checked wherever it stands in the body, so the label's expected type reaches each exit's `with` value through the label's entry in the checker's shared map of exit types, a set that now keeps it, where the `typecase` hands its expected type to its clauses directly (`impls/Misc.scala:704`, `:733-739`, `:996` against `:664-667`)
deviation: none in the label's type: it stays the join of its body's and its exits' types, as the team's code had it, and the checker's join is their union, normalized (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:81`, at `impls/Misc.scala:717`), the union that `label.tex:66-70` gives; the `typecase` builds the same union unnormalized (`:674`)
historical: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala, ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala, Specification/basic/inference.tex, Specification/appendices/changes.tex

## 1. What changed, and why

Under the curator's answer to Q48's part (a) (POSITIONS, "A `label` body takes the expected type of the whole `label` (item 48, row 642)."), and for rows 644 and 651 whatever that answer, the compiled checker now:

- **Row 644.** Gives an operator repeated between three or more operands the expected type of its value (`impls/Operators.scala:379-393`). Whether the multifix application applies is still decided without the expected type. Where it applies, it is checked again with the expected type, and that check is kept if it succeeds. Otherwise the left-associated binary applications are checked with the expected type, so the outer application has it. This is the loose juxtaposition's form since rung E (`:170-197`). The chapter's sentence after the list already gave an operator application the expected type (`Specification/basic/inference.tex:149-151`). The multifix rule is `chained-multifix.tex:42-48`.
- **Row 642 (under Q48).** Checks the body of a `label` with the label's expected type (`impls/Misc.scala:707-710`), and the `with` value of each `exit` to it with the same type (`:733-739`). `labelExitTypes` is the map that the checkers of one compilation unit share. The label's entry in it is now a `LabelExitTypes` (`:991-996`), a set of exit types that also keeps the label's expected type, and the exit reads the type from there. The label's type stays the join of the body's and the exits' types (`:717`), so it is a subtype of the expected type wherever each of them is. This is the union rule that the curator read for a `typecase` clause (batch 11's Q2) and for the label (Q48).
- **Row 651.** Checks a written static argument of a dotted method against its parameter's bounds with the written arguments put in (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:771-800`). A `StaticTypeReplacer` of the method's own parameters by the written arguments replaces in each `extends` and `dominates` bound before the subtype check. Before, `Q`'s bound `Box[\R\]` was checked with `R` unbound, and the type analyzer stopped with 'R is not in the kind env'. Since rung E's renaming (row 627), the same-name shape stopped there too, with 'G$1 is not in the kind env'. An argument that does not meet its substituted bound is now refused as any inapplicable method is: 'No such method O.gen.' (section 6).

The specification (section 5): the inference chapter's list of contexts gains the label body and the `with` values of its exits, and the "not yet described" item loses the label body; both boxes are amended. Appendix I's entry "The contexts that give a call an expected type" is amended for row 642 and for row 644's sentence.

## 2. The tests first: the failing run and the passing run

Four expected failures were promoted by `git mv` to names by topic, before the edit (commit `9e528f9d0`):
- `InferRepeatedOperatorContext` (was `XXXInferRepeatedOperatorContext`): compile, link and run. It asserts the value of `y: BoxV[\ZZ64\] = 1 OPLUS 2 OPLUS 3`, which no multifix declaration accepts: the outer application, instantiated at `ZZ64`, runs and throws. It gains the multifix shape: `1 OTIMES 2 OTIMES 3` with only a ternary `opr OTIMES[\T\](a: ZZ32, b: ZZ32, c: ZZ32): BoxV[\T\]`, which the base refused in the same way (section 9, defect 2).
- `MethodStaticArgsBoundNamesOther`: compile, link and run. It asserts `O.gen[\String, Box[\String\]\](Box[\String\]()) = 1`.
- `MethodStaticArgsBoundNamesOtherSameName`: compile, link and run. It asserts `11`.
- `InferResultOnlyLabelBody`: `typecheck`. It keeps the base's label body ending in `stop(s)` and adds `leaveEarly`, whose exit's `with` value is the result-only call `stop(s)`. It is a typecheck test because the code generator has no case for `label`. Compiled, the program passes the checker and stops at 'Can't compile Label' (section 6).

The failing run was on the base's code. The tree held the base's seeded build and only the renamed tests, and the run ended before the edit was first built:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh basefail ProjectFortress/compiler_tests InferRepeatedOperatorContext.test MethodStaticArgsBoundNamesOther.test MethodStaticArgsBoundNamesOtherSameName.test InferResultOnlyLabelBody.test
    # junit.sh basefail 2026-10-09T11:26:46Z; ... tree 7fa767d48 with the next rung applied, not yet committed
    . compile ProjectFortress/compiler_tests/InferRepeatedOperatorContext ProjectFortress/compiler_tests/InferRepeatedOperatorContext.fss:9:31-23:
        Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].
    F. compile ProjectFortress/compiler_tests/MethodStaticArgsBoundNamesOther ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:25:7-11:
    R is not in the kind env [][][]
    F. compile ProjectFortress/compiler_tests/MethodStaticArgsBoundNamesOtherSameName ProjectFortress/compiler_tests/MethodStaticArgsBoundNamesOtherSameName.fss:14:42:
    G$1 is not in the kind env [][][G -> KindBinding(G,G extends Object)][][]
    F. typecheck ProjectFortress/compiler_tests/InferResultOnlyLabelBody ProjectFortress/compiler_tests/InferResultOnlyLabelBody.fss:6:27-8:9:
        Function body has type Any, but declared return type is ZZ32.
    Tests run: 10,  Failures: 10,  Errors: 0

The run ended at 11:26:52Z. The repeated-operator test's second error, at `:15:32-23`, is the multifix shape. The label test's second error, at `:9:47-12:8`, is `leaveEarly`'s exit. The edit's build started at 11:29:12Z: `ant compileAll` exited 0 and printed 'Caches ... started again, empty', and the library order then exited 0.

The passing runs came after the last change of code (`d4697808b`):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fix1 ProjectFortress/compiler_tests InferRepeatedOperatorContext.test MethodStaticArgsBoundNamesOther.test MethodStaticArgsBoundNamesOtherSameName.test InferResultOnlyLabelBody.test
    # junit.sh fix1 2026-10-09T11:32:32Z
    OK (10 tests)

The same ten cases passed again inside `ant testQuick` (section 3).

## 3. Whole suites

The edit changes the checker's Scala, so `ant testQuick` ran once on the final code. No code changed after it; the commit after it is prose.

    ant testQuick        # 11:35:00Z
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0      (fast-library)
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0     (fast-othercompiler)
    [junit] Tests run: 1084, Failures: 0, Errors: 0, Skipped: 0    (fast-compiler)
    BUILD SUCCESSFUL
    Total time: 8 minutes 58 seconds

The compiler track counts 1084 tests against 1078 at batch 11's gate (`explorations/compile-ladder/climb-batch-11/gate/summary.txt`). Each of the three promoted run tests went from one compile case to a compile, a link and a run case (+6). The label test stays one case.

The verdicts that the section keeps all hold in that run:
- `XXXInferContextDrops`: 'Saw expected failure'. Row 455's argument faces are unchanged.
- `XXXLooseJuxtMultifixExpectedType`: 'Saw expected failure'.
- `InferLooseJuxtContext`, `InferResultOnlyIfWithoutElse`, `InferResultOnlyAfterLocalDecl`, `InferResultOnlyTypecaseBranch`, `MethodStaticArgReceiverSameName`, `InferDependentBound` and `InferBigOperatorUnwritten`: compiled, linked and ran ('Passed').

No other verdict changed: a changed verdict of a plain or an `XXX` test would show as a failure, and there is none. The library order on the new checker compiled the compiler's five library components with exit 0, so the compiler's prelude still checks.

## 4. Where the fix belongs, and the precedent search

All three repairs are in the checker (`explorations/coordinator/map/modules-and-phases.md`, B.6). The feature rows of `spec-to-implementation.md` put `label` and `exit` in `Misc.scala` and multifix dispatch in `Operators.scala`. Nothing of the library, walk, the overloading checker or the disambiguator is edited.

- **Row 644.** The precedent is rung E's loose juxtaposition (`impls/Operators.scala:170-197`; FACTS, "The compiled checker gives a call its expected type ..."). It tries the multifix application without the expected type and, if that applies, tries it again with the type, keeping the second check where it succeeds. Otherwise it checks the left-associated applications with the type.
  - Other sites in `Operators.scala` that read a sequence as a multifix application and then as left-associated binary ones without the expected type: 1, the tight juxtaposition of non-function items in `SMathPrimary` (`impls/Operators.scala:362-374`). Not measured; the brief's row is the repeated operator's.
- **Row 642.** The precedent is rung E's `typecase` clause (`impls/Misc.scala:340`, `:664-667`).
  - Other constructs in `Misc.scala` whose value is a subexpression's and whose subexpression gets no expected type: 3, with 4 sites. A `try` block (`:782`) and its `catch` clauses (`:801`): their union is the `try`'s type (`Specification/basic/expressions/try.tex:103-105`). The bodies of `atomic` and `tryatomic` (`:451-458`): an `atomic`'s value and type are its body's (`Specification/basic/expressions/atomic.tex:42-43`). Not measured; a question for the curator (section 10).
  - The `for` and `while` bodies, checked against `()` after the fact (`:600-625`), are the chapter's "body of a `for` loop".
- **Row 651.** The precedent is `TypeWellFormedChecker.scala:157-162`, which checks a trait type's static arguments against their bounds through a `StaticTypeReplacer` of the trait's parameters by the arguments: the same repair.
  - Other sites in `STypesUtil.scala` that check a written argument against a bound: 0. `staticArgsMatchStaticParams` (`:750-769`) checks kinds only.

## 5. What the specification settles, and the text changed

- An operator application has the expected type (`inference.tex:149-151`), and a repeated operator is either the multifix application or the left-associated binary ones (`chained-multifix.tex:42-48`). So each reading has the expected type, and row 644 needs no change of the chapter.
- Q48(a): a label's type is the union of its body's type and its exits' values' types (`label.tex:66-70`). So the body and the values take the expected type of the whole, as a `typecase`'s clauses do (`typecase.tex:110-111`; batch 11's Q2).
- Row 651: the text gives a written static argument its parameter's bound (`method-invocation.tex:40`, `:49`; `trait-parameters.tex:44-50`). No passage names the crash, so no passage changes.

The text changes are in the S1 form (POSITIONS, "Every change to the specification is recorded with its reason."; "The S1 form"):
- `Specification/basic/inference.tex:138-148`: the list of contexts gains "as the body of a `label` expression that has an expected type, or as the `with` clause expression of an `exit` expression whose target is that `label` expression, the expected type of the `label` expression, of which the union of the type of its body and the types of those `with` clause values, the type of the `label` expression (\secref{label-expr}), is then a subtype where each of those types is". Its box (`:152-162`) adds the text of 8 October and the decision of 9 October.
- `inference.tex:277-278`: the item now names "an argument of another call or the body of a `for` loop". Its box (`:284-289`) names the label body among what the item named before.
- `Specification/appendices/changes.tex`, the entry "The contexts that give a call an expected type" (`:1984-2124`):
  - Change (`:1998-2005`): the second revision and its third context.
  - Rationale (`:2037-2056`): the decision of 9 October 2026, `label.tex`'s sentence quoted, row 642, and the reversal.
  - Effect (`:2062-2075`): the label body and its exits; the thirteen calls; row 455, still; the repeated operator, given the type now (row 644).
  - Original text (`:2109-2122`): the end of the 8 October list and its item, with their lines before this revision.
- The front matter's paragraph (`Specification/fortress/preamble.tex:54-64`) still holds. `label.tex` is unchanged.

The build ran `cd Specification/fortress && ./ant genSource && ./ant tex`, and both ended 'BUILD SUCCESSFUL'.
- `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0.
- The skill's grep pattern prints 40. All 40 are lines of the log's macro tracing of `\@setref` (`#1<-\r@sec:...`), and none is a warning.
- `\secref{label-expr}` resolves to 13.12 (`\newlabel{sec:label-expr}{{13.12}{132}...`).
- The build's ignored files were removed (`git clean -fXq -- Specification`).

## 6. Programs run old against new

The old code ran through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base12 <tree>/tmp/old-caches compile P.fss`, and the new through `bin/fortress compile P.fss`. Each probe is a scratch program outside the tree's tracked files.

- **The four tests** (section 2).
- **A mismatched multifix application.** `n: ZZ32 = 1 OTIMES 2 OTIMES 3`, where a ternary `OTIMES[\T\](...): BoxV[\T\]` and a binary `OTIMES(a: ZZ32, b: ZZ32): ZZ32` are both declared. Both codes refuse it: 'Right-hand side has type BoxV[\Object\], but declared type is ZZ32.' The multifix application is used whatever the expected type, as `XXXLooseJuxtMultifixExpectedType` pins for a juxtaposition.
- **Which declaration runs.** With `opr OPLUS(a: ZZ32, b: ZZ32): ZZ32 = a + b` and `opr OPLUS(a: ZZ64, b: ZZ32): ZZ64 = a + b + 100`, both `n: ZZ64 = 1 OPLUS 2 OPLUS 3` and `m: ZZ64 = (1 OPLUS 2) OPLUS 3` print `6` on the old code, the new code and walk. The expected type reaching the repeated operator does not change the declaration chosen there.
- **Binary chains with plain overloads.** `1 OPLUS 2 OPLUS 3` at `ZZ64`, `"a" || "b" || "c"` and `1 + 2 + 3 + 4`: the old and new codes both print `900` and `abc`.
- **Label shapes.** The probe has three labels: one that returns `Any` from two kinds of value, a `()` label whose exit's value is `stop("x")`, and a label inside `ignore(...)` with no expected type. The old code refuses the `()` label: 'Function body has type Any, but declared return type is ().' The new code passes the checker and stops at the code generator: 'Can't compile Label'.
- **A label whose exit gives a `String` where `ZZ32` is declared.** Both codes refuse it: 'Function body has type OR(String,IntLiteral), but declared return type is ZZ32.'
- **An unmet written bound**, `O.gen[\String, Box[\ZZ32\]\](Box[\ZZ32\]())`. The old code stops with 'R is not in the kind env [][][]'. The new code refuses it with 'No such method O.gen.'
- **The ladder subset** (section 8).

## 7. The checker count and the distance

Both stages ran once, on the final code, after its build. The edit's paths include `ProjectFortress/src/com/sun/fortress/scala_src/`, so neither stage could be skipped.

**The count.** The command was `explorations/coordinator/tools/checker-count/run.sh tmp/rung-checker-contexts/checker-count-postedit.txt tmp/rung-checker-contexts/cc-post`. Its table is identical to batch 11's gate table: `diff explorations/compile-ladder/climb-batch-11/gate/checker-count.txt` against it prints nothing (`#total 1`, `FortressLibrary 2`, `#crash none`).

**The distance.** It ran in the background with `explorations/coordinator/tools/distance/run.sh tmp/rung-checker-contexts/distance-postedit.txt tmp/rung-checker-contexts/dist-post` and ended with EXIT=0 after 1211 s.

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-11/gate/distance.txt tmp/rung-checker-contexts/distance-postedit.txt
    DISTANCE DOWN   207 -> 206 (-1)
        kind typecheck              156 -> 155    (-1)
        class I1                      1 -> 0      (-1)  integers in generic code: the bound AnyIntegral or none where Integral[\I\] is used
        class S1                     28 -> 29     (+1)  self type: a generic trait's self is not its type parameter
        class R4                      2 -> 1      (-1)  StandardMinMax's (T,T) slip in bodies (row 421)
        class V1                     27 -> 44     (+17)  arrays: element type bounded by Number, which declares no arithmetic
        class OT                     67 -> 32     (-35)  other body errors (one-off library slips and checker limits)
        unit component String         1 -> 0      (-1)
        class G1                      0 -> 18     (+18)  generic code with no bound compares its values (tuples' <, CMP; LexicographicOrder)

**By site, not by class (row 577).** The run's `errors.tsv` was compared with `explorations/compile-ladder/gate/distance-sites.tsv` by location and message. Exactly one site moved: `String.fss:431`, 'Function body has type Any, but declared return type is ().' (`distance-sites.tsv:117`, row 642), cleared. The other 206 sites keep their location, message, kind and family.

The class moves come from the classifier, not from this change. `explorations/coordinator/tools/distance/classify.py` changed after batch 11's gate (`9d24290fb`, "Distance classes: classify.py finds its library places by declaration (row 577)"), and its moves re-sort sites none of which moved. Rows 644 and 651 have no site on the one library, as the section said.

## 8. The ladder subset

The subset is the 37 files of the baseline (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`) whose first error names something this change touched: a `label` or `exit`, 'Could not check call to operator', 'Right-hand side has type', 'Function body has type', a kind environment, or the code generator's `Label`. None of them is among the gate's 85, so none is in the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-11/gate/ladder/ladder.tsv`). Each was compared with its baseline row.

The drivers were copied under the tree's scratch folder with the caches of the final code. `run-subset.sh` then `classify.py` ended with EXIT=0. The phases are 35 typecheck, 1 disambiguate and 1 codegen.

Against the baseline, 32 files hold their phase and first error. `objectCC_label.fss` differs only in its path. Five moved:
- `expTest.fss`: typecheck to disambiguate, 'Variable asFloat is not defined.'
- `restTest.fss`, `restTest2.fss` and `restTest2a.fss`: 'The varargs parameter x is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.'
- `simpleExp.fss`: 'Ambiguous coercion in call to operator ^: ...'

Each moved file gives the same first error on the old code (`old-fortress.sh ... compile ProjectFortress/tests/<f>.fss`). So none moved by this change; they moved in earlier batches.

## 9. Defects, each with its home

1. **Row 644**, a repeated operator that no multifix declaration accepts gets no expected type. Home 1: `InferRepeatedOperatorContext` (`binary()`).
2. **The same site, where a multifix declaration accepts the operands.** The multifix application was checked with no expected type, so a result-only type parameter took its bound and `y: BoxV[\ZZ64\] = 1 OTIMES 2 OTIMES 3` was refused (section 2's failing run, `:15:32-23`). This goes beyond row 644's claim, which names the shape that no multifix declaration accepts, but it has the same cause and the same repair. Home 1: `InferRepeatedOperatorContext` (`multifix()`), with a note on row 644 (record.md).
3. **Row 651**, both shapes. Home 1: `MethodStaticArgsBoundNamesOther` and `MethodStaticArgsBoundNamesOtherSameName`.
4. **Row 642**, the label body and, by the same rule, its exits' `with` values. Home 1: `InferResultOnlyLabelBody`. Its compiled run waits on the code generator's `label` (rows 8 and 81 in the feature map).

The sites of section 4 (the tight juxtaposition's multifix reading; `try`, `catch`, `atomic`, `tryatomic`) were counted, not measured, so they are not recorded as defects.

## 10. Decisions, and the question left

Decisions:
- **The label's expected type reaches its exits through the label's entry in `labelExitTypes`**, a `HashSet` subclass that keeps it (`impls/Misc.scala:704`, `:733-739`, `:996`).
  - Evidence: `labelExitTypes` is the one structure that the checkers of a unit share for a label. It is made at the label (`:704`) and removed after it (`:721`).
  - Not taken: a new field of the checker. It would be threaded through every constructor and `extend` (`STypeChecker.scala:60-240`, about fifteen sites) and the `TryChecker` and `AtomicChecker` subclasses, for one value that the label map already scopes.
  - Not taken: binding the label's name to a type that carries the expected type. `LabelType` cannot hold one, and the exit checks `isInstanceOf[LabelType]` (`:730`).
  - Not taken: a global map, which nested and retried checks would share wrongly.
- **An exit's `with` value takes the label's expected type, not the exit's own.** The exit's own expected type is that of its position, such as `()` in an `if` without `else`, and its type is `BottomType` (`label.tex`, section "Label and Exit").
  - Not taken: the body only, as row 642's claim names. The curator's answer names the exits' values too (POSITIONS, "A `label` body takes the expected type of the whole `label`").
- **Whether the multifix application applies is decided without the expected type** (`impls/Operators.scala:385-392`). This follows the loose juxtaposition since rung E's skeptic (`impls/Operators.scala:170-184`; `XXXLooseJuxtMultifixExpectedType`).
  - Not taken: try the multifix application with the expected type first, and fall back to the binary ones when it fails. A declared type alone would then turn a multifix application into binary ones, against `chained-multifix.tex:45-46` ("If so, that definition is used").
- **Row 651's bound is substituted with a `StaticTypeReplacer`**, as `TypeWellFormedChecker.scala:157-162` does.
  - Not taken: the local `staticReplacer` walker of `staticInstantiationForApp` (`STypesUtil.scala:712-742`). It is built only after the check, from the same pairs, so its `paramMap` would have to move before the check.
  - Not taken: checking the bounds after the instantiation, whose result no longer names the parameters.
- **The label test is a `typecheck` test**, not compile, link and run, because the code generator has no case for `label` (section 6, 'Can't compile Label').
  - Not taken: an `XXX` run pair, which would pin the code generator's wall, not this repair.
- **The promoted repeated-operator test asserts the multifix shape too** (section 9, defect 2). The repair covers both readings of `chained-multifix.tex:42-48`.
  - Not taken: a test of the binary shape alone, which would leave the multifix try unpinned.
- **The Appendix I entry is amended in place**, with its second revision named as such. The brief names the entry, and its label `revival-expected-contexts` already heads both boxes.
  - Not taken: a new entry.
  - The full reasoning is this report, as rung E's entry points to its own. The section asks for no separate decision record.
- **Revival change: none.** This follows rung E's record for the same entry's first revision (`explorations/compile-ladder/climb-batch-11/RECORD.md:88`, "E gives none").

The question for the curator (section 4's count):
- **Do a `try` block and its `catch` clauses, and the body of an `atomic` or `tryatomic` expression, take the expected type of the whole, by the reading of Q2 and Q48?**
  - `try.tex:103-105` gives a `try` the union of its block's and its `catch` clauses' types, the label's form. `atomic.tex:42-43` gives an `atomic` its body's value and type, a block's form.
  - The checker gives them no expected type (`impls/Misc.scala:782`, `:801`, `:451-458`). It also joins the `finally` block's type into the `try`'s type (`:816-820`), which `try.tex:103-105` does not. None of this is measured.
  - Yes: a checker rung measures and repairs them, and the chapter's list gains them.
  - No: the "not yet described" item names them.
  - Today's behaviour is the second's.

## 11. Points to report

None was reached:
- No compiled test's verdict changed other than by the rung's intent (section 3).
- No program that the text allows is now refused, and no program that the text refuses is now accepted, outside rows 642, 644 and 651 (section 6). The multifix shape, which the text allows and the checker refused, is now accepted (section 9, defect 2).
- `XXXInferContextDrops` still reports 'Saw expected failure', and its faces are unchanged (section 3).
- The declaration that an operator application chooses did not change in the probe of section 6.
- The normative text changed is the inference chapter's two lists with their two boxes, and the amended Appendix I entry (section 5).
- There is no library or walk edit.

## 12. Sentences of the specification that this change makes false

Three sentences of `Specification/appendices/changes.tex` at the base, all amended here:
- `:2042`: "Twelve of the thirteen calls ... now check".
- `:2043-2046`: "It still gives no expected type to ... the body of a \KWD{label} expression (row~642), as the item of the list says; the thirteenth call ends ...".
- `:2047-2051`: "Nor does it give one to an operator repeated between three or more operands that no multifix declaration accepts, ... (row~644)".

No other sentence of `Specification/` names rows 642, 644 or 651: `grep -rn 'row~642\|row~644\|row~651' Specification/` at the base finds only `changes.tex:2044` and `:2051`. No box of `label.tex`, `chained-multifix.tex` or `method-invocation.tex` speaks of the checker.

## 13. Commands worked out

- The distance by site: `diff <(tail -n +2 explorations/compile-ladder/gate/distance-sites.tsv | cut -f6,7 | sort) <(tail -n +2 tmp/rung-checker-contexts/dist-post/errors.tsv | cut -f6,7 | sort)` lists the sites gone or new by location and message.
- The ladder subset's list: `awk -F'\t' 'NR>1 && ($11 ~ /kind env|[Ll]abel|[Ee]xit |Could not check call to operator|Right-hand side has type|Function body has type|multifix/ || $7 ~ /Label|Exit/) {print $1 "\t" $2}' explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` picks the baseline files whose first error names what the change touched.
- The subset's comparison: `join` of the baseline's and the run's `ladder.tsv` on corpus/file, printing each file whose phase or first error differs.

## 14. Revival change

None (`record.md`).
