# Rung E (climb batch 11): the expected type the text gives (item 36), and a method's own static parameter at a method call (row 627)

*Row numbers: the rung's placeholders NEW-E-1 and NEW-E-2, and the skeptic's NEW-E-3, are rows 642, 643 and 644, numbered by `ledger.py add` at the gather and put in here and in the specification.*

problem: the distance stage's per-site list at the base, 'An 'if' clause without corresponding 'else' has type Any instead of type ().' at `Library/FortressLibrary.fss:295` (`explorations/compile-ladder/gate/distance-sites.tsv:18`) and the 12 other sites of row 560's second part, and 'Could not check method invocation Generator[\G\].map - [\((), G)\]((), G)->((), G)->Generator[\((), G)\] is not applicable to an argument of type G->((), G).' at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:587` (`distance-sites.tsv:122`) and the 5 other sites of row 627; the batch record's rung E (`explorations/coordinator/CLIMB-BATCH-11.md:242`)
spec: an `if` without `else`, "every clause must have type ()" (`Specification/basic/expressions/if.tex:68`); a block's value and type are its last expression's (`Specification/basic/expressions/blocks.tex:55-56`); static arguments "statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:39`); a `typecase`'s type is the union of its clauses' (`Specification/basic/expressions/typecase.tex:110-111`); static parameters are "in scope of the entire body of the declaration" (`Specification/basic/trait-parameters.tex:21-24`); the inference chapter's two lists (`Specification/basic/inference.tex:129-139` and `:254-258` at the base)
precedent: rung I's `expected` passed on at a tight juxtaposition and its rewrites (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala:85`, `:90`, `:197`, `:345` at `8dc1a74d9`); the `if` with `else`, which hands its expected type to every clause (`impls/Misc.scala:526-530`); row 561's `ownStaticParamsApart` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:184-202`) and row 563's `domainApart` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:125-143`); Appendix I's entry "The type of a varargs parameter" for the entry's form (`Specification/appendices/changes.tex:2839`)
deviation: row 627's renaming renames an own static parameter whose name the receiver's static arguments mention (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1745-1759`), where the precedents rename one whose name the static environment holds (`OverloadingChecker.scala:188`), since the instantiation of inherited methods has no environment
deviation: the renaming is made by a `StaticTypeReplacer` that also renames the parameters' declarations, before the method is instantiated (`STypesUtil.scala:1770-1782`), where the precedents rename an arrow type already made (`OverloadingChecker.scala:195-201`)
deviation: the block after local declarations is repaired in `checkLetBody` (`impls/Decls.scala:51-58`), not in the block case the record names (`impls/Misc.scala:420-440`), which already passed its expected type to its last expression (`:435`)
historical: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala, ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala, Specification/basic/inference.tex, Specification/appendices/changes.tex

## 1. What changed, and why

Under the curator's answer to Q2 (way 1; POSITIONS, "The order of the work after batch 10.", Q1 to Q4 at their recommendations; `CLIMB-BATCH-11.md:80-99`), the compiled checker now gives a call the type that the text already requires of it in the four contexts of item 36:

- an `if` without `else`: each clause is checked against `()`, the type every such clause must have (`impls/Misc.scala:583-584`);
- a block's last expression after local declarations: `checkLetBody`, which checks the body of every local variable and local function declaration, passes the declaration's expected type into the body (`impls/Decls.scala:51-58`, with its four callers at `:321`, `:351`, `:404`, `:417`). The block case already passed the type to its last expression (`impls/Misc.scala:435`), but a local declaration makes the rest of the block its body;
- a `typecase` clause and its `else` clause: each is given the `typecase`'s expected type (`impls/Misc.scala:326`, `:340`, `:662-667`); the `typecase`'s type stays the union of its clauses' types;
- a loose juxtaposition: the application it makes, which is the juxtaposition's value, is given its expected type. This holds both for the multifix juxtaposition and for its left-associated infix fallback (`impls/Operators.scala:173-192`). (Skeptic's correction: since `2579d7e5b` whether the multifix juxtaposition applies is decided without the expected type, which is then given to it where it fits (`impls/Operators.scala:170-197`); see `SKEPTIC.md`.)

Row 627: `commonInheritedMethods` instantiates each inherited method at its declaring trait's static arguments (`STypesUtil.scala:1726-1735` at the base). It does so with a `StaticTypeReplacer` over the method's whole declaration (`ProjectFortress/src/com/sun/fortress/compiler/index/DeclaredMethod.java:63-74`), which does not avoid capture. With `g: Gen[\G\]`, the receiver's argument `G` replaced `E` in `mp[\G\](f: E->G)`, which became `mp[\G\](f: G->G)`. The new `instantiateMethodApart` (`STypesUtil.scala:1737-1783`) first renames each of the method's own static parameters whose name the arguments mention (`G` to `G$1`) in its declarations and in its types. Only then does it substitute, as the overloading checker does for row 561. The same substitution serves the method environment of a trait's body, so a call by name inside a trait that inherits the method is repaired too (section 7, point 2).

The specification: the inference chapter's list of contexts gains the four (`Specification/basic/inference.tex:133-145`), with a box (`:146-151`). Its "not yet described" item loses them (`:266-268`), with a box (`:274-278`). A new Appendix I entry, "The contexts that give a call an expected type" (`Specification/appendices/changes.tex:1926-2019`), records the change, its reason, the two passages' earlier text and row 560. For row 627 nothing is edited: no passage names the capture.

## 2. The test first: the failing run, and the passing run

The tests, by topic:
- `InferResultOnlyIfWithoutElse`, promoted from `XXXInferResultOnlyNoContext` by `git mv`, now compiled, linked and run;
- `InferResultOnlyAfterLocalDecl`;
- `InferLooseJuxtContext`, the loose juxtaposition split out of `XXXInferContextDrops`, with the library's `fail s` shape added;
- `InferResultOnlyTypecaseBranch`;
- `MethodStaticArgReceiverSameName`, promoted from `XXXMethodStaticArgReceiverSameName` by `git mv`, with the inferred form added.

`XXXInferContextDrops` keeps its two argument faces; its key is now "has 2 errors".

The failing run, on the base's code, before the edit was first built. `git diff --quiet 83b1cae784df32aac95d9b2c518466583423b092 -- ProjectFortress/src` printed "src unchanged from base", and the build started after this run ended:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests InferResultOnlyIfWithoutElse.test InferResultOnlyAfterLocalDecl.test InferLooseJuxtContext.test InferResultOnlyTypecaseBranch.test MethodStaticArgReceiverSameName.test XXXInferContextDrops.test

    # junit.sh base 2026-10-09T00:32:08Z; nproc 4; ... tree 83b1cae78 with the next rung applied, not yet committed
    ProjectFortress/compiler_tests/InferResultOnlyIfWithoutElse.fss:6:25-48:
        An 'if' clause without corresponding 'else' has type Any instead of type ().
        - [\P[\T,G\]\]P[\T,G\]->P[\T,G\]->Gen[\P[\T,G\]\] is not applicable to an argument of type G->P[\T,G\].
    Tests run: 16,  Failures: 15,  Errors: 0

Three of the tests were then respelled to keep clear of the code generator's crash of row 340 (a `try` whose `catch` value is a numeral coerced to a declared `ZZ32`; section 9, defect 7). The final files were therefore run once more through the harness on the old code:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base11 <worktree>/tmp/old-caches junit <the same six .test files>

        Function body has type Any, but declared return type is ZZ32.
    File InferResultOnlyAfterLocalDecl.fss has 2 errors.
        Function body has type OR(Any,String), but declared return type is String.
    Tests run: 16,  Failures: 15,  Errors: 0

The passing run, after the last change of code (the second build, with `STypesUtil.scala`'s own walker):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new3 ProjectFortress/compiler_tests <the same six .test files>
    OK (16 tests)

`InheritedMethodByNameStaticParamSameName` is a `typecheck` test, like row 561's `InheritedFunctionalMethodStaticParamSameName`. On the old code, through `old-fortress.sh ... junit`, it prints 'Could not check call to function mp - [\String\]String->String->Gen[\String\] is not applicable to an argument of type G->String.' and 'Tests run: 3,  Failures: 1'. On the new code, `junit.sh new5 ProjectFortress/compiler_tests InheritedMethodByNameStaticParamSameName.test InheritedGenericMethodCalledByNameLink.test XXXInheritedGenericMethodCalledByName.test` prints 'OK (3 tests)'.

The first `XXX` test this rung adds, `XXXInferResultOnlyLabelBody`, ran through the harness twice:
- As it is, `junit.sh xxx-asis ProjectFortress/compiler_tests XXXInferResultOnlyLabelBody.test` prints 'Saw expected failure' and 'OK (1 test)'.
- With the `label` replaced by a `do` block for one run, `junit.sh xxx-red ...` prints 'Saw wrong failure. compile' and 'Tests run: 1,  Failures: 1'.

The file was then restored; a `diff` against the kept copy printed nothing.

The suites ran once, on the code state of `587ce436d`, as `tests-running.md`, "When to run a whole suite", asks for an edit of the checker's Scala:

    ant testQuick
    BUILD SUCCESSFUL
    Total time: 11 minutes 39 seconds

Every track had 'Failures: 0, Errors: 0' (`ProjectFortress/TEST-RESULTS/fast-*/TEST-*.txt`): `CompilerJUTest` 1056 tests, `LibraryJUTest` 86, `OtherCompilerJUTest` 263. Batch 10's gate had 1043, 86 and 263. The 13 more are three cases for each of the three new tests and two more for each of the two promoted tests. The inference tests of batches N, 8 and 10 keep their verdicts, `InferDependentBound` and `InferBigOperatorUnwritten` among them. `XXXInferResultOnlyLabelBody`, `InheritedMethodByNameStaticParamSameName` and the `XXXInheritedGenericMethodCalledByName` pair were written after the suite started. They are test files only, run through the harness above.

## 3. Where the fix belongs, and the precedent

- **The four contexts.** They belong to the checker (`explorations/coordinator/map/modules-and-phases.md`, B.6). Walk has no static types and runs all 13 sites (row 560).
  - The `if`, `typecase` and block cases are in `impls/Misc.scala`, and the juxtaposition is in `impls/Operators.scala`, as the record says.
  - The trace found the block after a local declaration in `impls/Decls.scala`'s `checkLetBody` (`:51-71`), because the parser makes the rest of the block a local declaration's body.
  - The block case at `Misc.scala:420-440` already passes `expected` to its last expression.
- **Passing the type on.** Rung I passed `expected` at the tight juxtaposition and its rewrites (`8dc1a74d9`), and the `if` with `else` passes it to each clause and to the `else` (`Misc.scala:526-530`). The same file has two more places that drop it, which this rung leaves:
  - the `label` body (`Misc.scala:706`; section 9, 642);
  - the `for` body (`Misc.scala:613-623`), which the chapter's item keeps.
- **Row 627's substitution site**, which the record had not located. The chain of calls:
  - `Functionals.getCandidatesForMethod` (`impls/Functionals.scala:837`) asks `Common.findMethodsInTraitHierarchy` (`impls/Common.scala:46-53`);
  - that calls `STypesUtil.commonInheritedMethods`;
  - that instantiates each inherited method by `instantiateTraitStaticParameters` (`STypesUtil.scala:1733` at the base).

  `commonInheritedMethods` has five callers, each reading a trait's inherited methods at its static arguments: `Common.scala:52`, `Decls.scala:99` and `:145`, `Thunker.scala:64` and `:99`, and `Misc.scala:377`.
- **Precedents for the renaming.** There are two:
  - row 561's `ownStaticParamsApart` (`OverloadingChecker.scala:184-202`);
  - row 563's `domainApart` (`AbstractMethodChecker.scala:125-143`).

  Both rename an own parameter whose name the static environment holds to `name$i`, and rename its bounds with it. This rung follows their naming and their bounds. The deviation lines above give where it departs.

## 4. What the specification settles

- **The four contexts** are settled by the text, as batch 8's review read it (`explorations/reviews/batch-8-review.md:48-52`) and the answer to Q2 confirmed:
  - `if.tex:68` for an `if` without `else`;
  - `blocks.tex:55-56` for a block;
  - `var-ref.tex:37-39` for a loose juxtaposition;
  - for the `typecase`, the union rule (`typecase.tex:110-111`).
- **Row 627.** A method's static parameters are its own, "in scope of the entire body of the declaration" (`trait-parameters.tex:21-24`). So a caller's parameter of the same name is another parameter.
- **The `label` body** has the same union rule (`Specification/basic/expressions/label.tex:66-70`). But the curator's answer covered four contexts, and the chapter lists the label body among what it does not yet describe. It is a question for the curator (section 8).

## 5. The checker count, the distance, and the ladder

Every changed path of code is under `ProjectFortress/src/com/sun/fortress/scala_src/`, so both stages can move. Each ran once, on the final code (`587ce436d`, built), into the rung's scratch.

**The count.** `explorations/coordinator/tools/checker-count/run.sh tmp/rung-checker-expected-type/checker-count-postedit.txt tmp/rung-checker-expected-type/cc-post` gives a table identical to batch 10's gate table: `diff explorations/compile-ladder/climb-batch-10/gate/checker-count.txt tmp/rung-checker-expected-type/checker-count-postedit.txt` prints nothing. The table reads '#total 1', 'FortressLibrary 2', '#crash none'.

**The distance.** `explorations/coordinator/tools/distance/run.sh tmp/rung-checker-expected-type/distance-postedit.txt tmp/rung-checker-expected-type/dist-post` took 1,099 s, with load 1.01 at its start. Then `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-10/gate/distance.txt tmp/rung-checker-expected-type/distance-postedit.txt` prints:

    DISTANCE DOWN   253 -> 235 (-18)
        kind typecheck              201 -> 183    (-18)
        class OT                    100 -> 82     (-18)  other body errors (one-off library slips and checker limits)
        unit component FortressBuiltin      2 -> 0      (-2)
        unit component FortressLibrary    215 -> 205    (-10)
        unit component List          10 -> 6      (-4)
        unit component RangeInternals     20 -> 18     (-2)

No crash row went or came. Read by row, by location and message against the per-site list (`explorations/compile-ladder/gate/distance-sites.tsv`), and not by class (row 577): 18 rows are gone and none is new.
- Item 36, an `if` without `else` (7): `FortressLibrary.fss:295`, `:300`, `:305`, `:323`, `:4403`, `RangeInternals.fss:157`, `:158`.
- Item 36, a block's last expression after a local declaration (2): `FortressLibrary.fss:2083`, `List.fss:458`.
- Item 36, a loose juxtaposition (1): `FortressBuiltin.fss:35`.
- Item 36, a `typecase` clause (2): `FortressLibrary.fss:1094`, `:3974`.
- Row 627 (6): `FortressBuiltin.fss:587`, `List.fss:94`, `:103`, `:106`, `FortressLibrary.fss:1417`, `:1516`.
- Stays: `String.fss:431`, with the same message, 'Function body has type Any, but declared return type is ().'. Its `typecase` ends the body of `label methodVerify` (`Library/String.fss:431-447`), and a `label` body is given no expected type (`Misc.scala:706`). A probe showed it: run through `bin/fortress typecheck` on the new code, a `typecase` ending a `label` body is refused ('Function body has type Any, but declared return type is String.'), and the same `typecase` in a `do` block is accepted. Section 9, 642.

**The ladder** (`gate.md`, "The ladder regression", the rung's own subset). The subset is the 21 ladder files whose first error in the baseline names a function body's type, a juxtaposition, a `typecase` clause or a method invocation: `Exception`, `ImplicitBlocks`, `InferTest`, `genericTest3`, `rangeOperators`, `LabelTest`, `atomic1`, `XXXtypecaseTest`, `newlineTest`, `typecaseBlockTest`, `typecaseTest`, `typecaseVarTest`, `EqualityOverloadBug`, `UnnamedParam`, `XXXbroken`, `exitType`, `litCoercion`, `XXXTypeError`, `objectTest8`, `simpleExp` and `ho`. The drivers were copied under `tmp/rung-checker-expected-type/ladder/`, and `run-subset.sh` then `classify.py` ran on them. None of the 21 is in batch 10's landed `ladder.tsv`, which holds the 85 passing files, so each was compared with the baseline's `ladder.tsv`.
- 20 keep their phase and their first error.
- `simpleExp.fss` keeps its phase, typecheck. Its first error moved from 'Right-hand side has type ZZ32, but declared type is RR64.' to 'Ambiguous coercion in call to operator ^: ...'. The old code prints the same: `old-fortress.sh ... typecheck simpleExp.fss` and `bin/fortress typecheck simpleExp.fss` on the new code print the same six errors, and a `diff` of the two outputs prints nothing. The move is rung I's (`8dc1a74d9`), not this rung's.

## 6. Decisions

1. **All four contexts, the `typecase` by the union rule** (way 1 of Q2), by the curator's answer. Not taken: ways 2 to 4 (`CLIMB-BATCH-11.md:92-96`).
2. **An `if` without `else` gives its clauses `()`, not the `if`'s own expected type.** The text requires `()` of every clause (`if.tex:68`). Not taken: passing the enclosing expected type, which, where it is not `()`, the clause check refuses anyway (`Misc.scala:588-594`).
3. **The block after local declarations is repaired in `checkLetBody`** (`Decls.scala:51-58`). It is the one helper that checks the body of every local variable and local function declaration. The block case (`Misc.scala:420-440`), which the record named (`CLIMB-BATCH-11.md:257`), already passes the type. `Decls.scala` is on no other rung's list (rung C's files, `CLIMB-BATCH-11.md:226`). Not taken: passing the type by hand in each of the four `SLocalVarDecl` and `SLetFn` cases.
4. **A `typecase` keeps the union as its type**, and each clause and the `else` are given the expected type. Not taken: coercing every clause to a winning clause type, as the `if` with `else` does (`Misc.scala:536-576`). The text gives a `typecase` the union, and no test needs more.
5. **A loose juxtaposition gives its expected type to the application it makes**, both to the multifix attempt and to the infix fallback (`Operators.scala:173-192`). Either is the juxtaposition's value. Not taken: giving it only to a juxtaposition of one chunk, a function application such as `fail s`. A multifix or infix juxtaposition is an operator application, which the chapter already gives the expected type. `testQuick` shows that no verdict changed.
6. **Row 627's renaming is made where inherited methods are instantiated**, in `commonInheritedMethods` (`STypesUtil.scala:1726-1783`). The one site serves every caller (section 3). Not taken:
   - making `StaticTypeReplacer` avoid capture (`ProjectFortress/src/com/sun/fortress/compiler/typechecker/StaticTypeReplacer.java`), which every substitution of the checker and of the code generator uses;
   - renaming in `DeclaredMethod`'s copy (`compiler/index/DeclaredMethod.java:63-74`), Java that the code generator shares;
   - renaming at the arrow in `getCandidatesForMethod` (`Functionals.scala:828-859`), where the arrow is made from a method already captured and the receiver's substitution is no longer at hand.
7. **The clash is a name that the arguments mention**, not a name that the environment holds. `commonInheritedMethods` has no environment, and a mentioned name is exactly the condition of capture.
   - Fresh names are `name$i`, as in the precedents (`OverloadingChecker.scala:192`). A fresh name is never one of the method's own names or one that the arguments mention.
   - The names are collected by a walker of the rung's own (`STypesUtil.scala:1745-1757`). `SNodeUtil.nameInBody` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/SNodeUtil.scala:273-290`) crashed on a match below the top: the first build's run of `MethodStaticArgReceiverSameName` printed 'ClassCastException: class scala.runtime.BoxedUnit cannot be cast to class com.sun.fortress.nodes.Id', because its walker returns `()` for a node it matches. That helper is left unchanged.
8. **The `label` body is left with no expected type.** It is a question for the curator (section 8), and its refusal is pinned (home 3, section 9). Not taken: passing the type into it, which would clear `String.fss:431` but is a fifth context that the answer to Q2 does not cover.
9. **The text.**
   - The list of contexts names the four in its own phrasing, "as a clause of", the word `if.tex` uses.
   - The loose juxtaposition goes into the sentence after the list, which names the forms of a call, beside `f(x)`.
   - The item of what is not described now names an argument of another call, a `for` body and a `label` body. The last is added because the rung measured it.

   Not taken: a context "a call written by loose juxtaposition" in the list itself, since that is a form of call, not a context.
10. **The Appendix I entry is new, placed after "The inference of a call's static arguments"**, which rung W amends (`CLIMB-BATCH-11.md:200`). It follows the form of "The type of a varargs parameter". Its original text is the revival's own of 29 September 2026, quoted with its path and line before the revision, as the inference entry quotes its own (`changes.tex:1884-1893`).
11. **The tests keep clear of row 340's crash.** `try ... catch e InvalidRange => -1 end` as the body of a function returning `ZZ32` stops the code generator with 'Error trying to close method scope', on the base too: the probe `TryNumeral.fss`, run through `old-fortress.sh ... compile`, shows it. The tests' `try` expressions return `String` values instead.
12. **`XXXInferContextDrops`'s comment** is rewritten to say what the test checks; it pointed to a report (`tests-writing.md`, "Names, comments, citations").
13. **The tests of the call by name.** The checker's half is a `typecheck` test (`InheritedMethodByNameStaticParamSameName`), as row 561's sibling `InheritedFunctionalMethodStaticParamSameName` is, because its compiled run dies of a code-generator defect that the same shape meets with no shared name. That defect has an expected-failure pair of its own, written with distinct names, so that it does not depend on the capture.

## 7. Points to report reached

1. **Normative text changed beyond the inference chapter's two lists and the rung's own Appendix I entry**, by a small margin. The sentence after the list of contexts gains "or by loose juxtaposition, as `f x`" (`Specification/basic/inference.tex:143-145`): the record's third context, written where the paragraph names the forms of a call. The item adds "the body of a `label` expression" (`:266-268`). Reversible.
2. **A program the text allows that the checker now accepts, outside item 36's four contexts and row 627's method invocation.** A generic method is called by name inside a trait that inherits it under its own parameter's name: `trait Twice[\G\] extends Gen[\G\]` calls `mp[\String\](...)` (`ProjectFortress/compiler_tests/InheritedMethodByNameStaticParamSameName.fss:8-10`).
   - On the base it is refused ('[\String\]String->String->Gen[\String\] is not applicable to an argument of type G->String', `old-fortress.sh ... junit`); now it is accepted.
   - It is the same capture at the same substitution, through the second caller of `commonInheritedMethods`.
   - Its compiled run dies of 643, as the same shape without the clash does on the base.

   Reversible.
3. **The argument face of `XXXInferContextDrops` (row 455)** is neither cleared nor changed in behaviour.
   - The test file is changed as the record asks: its juxtaposition line moved out, and its key changed from "has 3 errors" to "has 2 errors".
   - Its two errors are the same on the old code and on the new ('Could not check call to function takesBox64 - BoxT[\ZZ64\]->ZZ32 is not applicable to an argument of type BoxT[\IntLiteral\].' and the same with BoxT[\Object\]), with 'Saw expected failure' on both (`junit.sh base`, `junit.sh new3`).

   Listed for the reviewer.

No compiled test's verdict changed other than by intent: `testQuick` is green. No library or walk file is edited.

## 8. Questions for the curator

- **Does a `label` expression's body take the enclosing expected type?** `label.tex:66-70` gives the `label` the union of the type of its body's last expression and the types of its exits' values, the same form as the `typecase` rule that Q2 answered. The checker checks the body with none (`Misc.scala:706`).
  - Yes: the chapter's list gains the label body, the checker passes the type, and `String.fss:431`, the thirteenth site of item 36, clears (distance 235 to 234, by reading).
  - No: the item keeps it, 642 stays, and `XXXInferResultOnlyLabelBody` pins it.

  Today's behaviour is the second.

## 9. Every defect measured, and its home

1. **Row 560's second part, the four contexts.** Home 1: `InferResultOnlyIfWithoutElse`, `InferResultOnlyAfterLocalDecl`, `InferResultOnlyTypecaseBranch` and `InferLooseJuxtContext`. 12 of its 13 sites clear, and the row closes.
2. **Row 627, the capture at a method invocation.** Home 1: `MethodStaticArgReceiverSameName`, in its written and its inferred form. Its 6 sites clear, and the row closes.
3. **The same capture at a call by name inside a trait** (section 7, point 2). Home 1: `InheritedMethodByNameStaticParamSameName`. A note on row 627.
4. **Row 455's loose-juxtaposition face.** Home 1: `InferLooseJuxtContext`. The argument faces stay home 2 under `XXXInferContextDrops`. A note on row 455.
5. **A `label` body gets no expected type** (`String.fss:431`). Home 3: the chapter lists the label body as not yet described, and the reading is the curator's (section 8). `XXXInferResultOnlyLabelBody` pins today's refusal; row 642.
6. **A generic method inherited from a generic trait, called by name inside a trait, dies compiled** with 'NoSuchMethodError: ... $\=Twice?...FZZ32?.\=mp??Arrow?Arrow?H,...', on the base too; walk prints `PASS`. Home 2: the specification allows the call (`Specification/basic/traits.tex`, "Method Declarations"), so `XXXInheritedGenericMethodCalledByName` with `InheritedGenericMethodCalledByNameLink` asserts the run; row 643.
7. **A `try` as a function's body whose `catch` value is a numeral coerced to the declared `ZZ32` stops the code generator**, 'Error trying to close method scope', on the base (`TryNumeral.fss`). Home 2, already: row 340, whose notes name the `try` forms and whose expected failures gate it. A note on row 340 adds this shape.

Walk: item 36 is the checker's alone, and walk runs all 13 sites (row 560). Walk runs row 627's programs (row 627) and the by-name shape: `bin/fortress` on `SelfCallSameName.fss` and on `XXXInheritedGenericMethodCalledByName.fss` prints 'PASS'.

## 10. Sentences of the specification the change makes false

None is false. One sentence is now incomplete. It is in the entry that rung W amends and this rung does not edit: "A call written by tight juxtaposition, as a method invocation or as an operator application, has an expected type in the contexts the chapter lists" (`Specification/appendices/changes.tex:1597-1599`). A call written by loose juxtaposition now joins those forms. The box after the list (`Specification/basic/inference.tex:279-290`) still holds: a reduction's big operator is an argument of the call that its desugaring makes, and this rung does not reach it.

## 11. Programs run old against new

- The six tests of section 2, on the old code and on the new (section 2).
- `InheritedMethodByNameStaticParamSameName` and the `XXXInheritedGenericMethodCalledByName` pair, on both (section 2; section 7, point 2).
- `simpleExp.fss` through `bin/fortress typecheck`, on both: the same six errors (section 5).
- The by-name shape with `G` (`SelfCallSameName.fss`) through `typecheck`: refused on the old code, accepted on the new. Its distinct-name form (`SelfCallOtherName.fss`) through `compile` and `run` on the old code: it compiles, then dies with `NoSuchMethodError`.
- `TryNumeral.fss`, on the old code only: the code generator's crash (section 9, defect 7).

## 12. Revival change

None (`record.md`).
