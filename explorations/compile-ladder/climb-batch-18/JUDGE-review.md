<!-- Climb batch 18, the judge of the merged-diff review: its one blocking finding (rung X's TypeWellFormedChecker checks a declaration's header with every conditional extends entry's conditions holding) is upheld. Decision repair: the header (static parameters, own where clause, throws clause, contract, excludes and comprises clauses) is checked with the declaration's own where clause only, in TypeWellFormedChecker and, for an object's contract, in Decls; five expected failures; the specification and the record say the same. -->

# Climb batch 18: the judge's ruling on the merged-diff review

Written 2026-10-18 by the batch's judge, on `main` at `7d6c65881`. Nothing was built or run for this ruling, and the gate's folders were not read. Each point below is a reading of the tree at that commit, marked "by reading" where no run backs it, or a result that the review quotes with its command.

## 1. Ruling

**Decision: repair.** The review's one blocking finding is upheld, and its repair is taken with one addition.

- The finding concerns rung X. `TypeWellFormedChecker`'s trait and object declaration cases check five parts of the declaration with every conditional `extends` entry's conditions holding: the static parameters, the declaration's own `where` clause, its `throws` clause and contract (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:194-195`, `:211-212`), and its `excludes` and `comprises` clauses (`:202`). The base checks them with the declaration's own `where` clause only. These parts hold at every instance of the declared type, so they are checked without the conditions.
- The addition: `Decls` type-checks an object's contract with the same conditions holding (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:134-142`). It is the same defect in the other checker that X edited, and the specification sentence the repair writes would be false of it.
- The value parameters, the members and `self` keep the conditions (P-151). The line between the two kinds of part is section 3's. Where it falls for the value parameters is listed for the curator (section 6).

The decision cannot be land: the repair edits two Scala files of the checker and the specification. The edit is under `ProjectFortress/src/`, a path the gate reads, so the gate runs again after the repair (`explorations/coordinator/climb-batch-workflow.js:1273`, `:1352-1353`).

## 2. What the tree does

The trait case (`TypeWellFormedChecker.scala:187-203`) and the object case (`:204-220`):

- `:194` and `:211` set the analyzer to `analyzer.extend(sparams, KindEnv.withExtendsConditions(where, extendsC))`, whose `where` clause holds the conditions of every conditional entry (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:179-203`).
- With that analyzer, `:195` and `:212` walk `sparams`, `where`, `throwsC` and `contract`, and `:202` walks `params`, `decls`, `self`, `excludes` and `comprises`.
- Only the `extends` entries are walked another way (`:197-201`, `:214-218`, the skeptic's upheld `bd18b6a47`). Where another entry is conditional, each entry is walked with the declaration's `where` clause and its own conditions.
- Rung K's check of a type's own `where` constraints at its use (`:259-289`) reads the same `analyzer` (`:281`). So it is lifted with the static-argument bounds (`:248-258`) wherever the header is walked.

The review ran three programs with `bin/fortress typecheck` on the merged tree (`/home/user/fortress-gather18`) and on the base build through `old-fortress.sh` (its blockingCode entry, quoted here):

- (1) `trait Shows end` `trait W[\T extends Shows\] end` `trait D[\E\] extends { Shows where { E extends Shows } } excludes { W[\E\] } end`: main exit=0; base 'ExclBound.fss:6:69-72: Ill-formed type: W[\E\] The static argument E does not satisfy the corresponding bound Shows.' exit=255.
- (2) the same `D` with `comprises { V[\E\] }` and `object V[\T extends Shows\]() extends D[\T\] end`: main exit=0; base 'CompBound.fss:5:70-73: Ill-formed type: V[\E\]' exit=255.
- (3) `trait D[\E, F extends W[\E\]\] extends { Shows where { E extends Shows } } end`: main exit=0; base 'ParamBound.fss:6:23-26: Ill-formed type: W[\E\]' exit=255.
- K's face: an `excludes` entry `W[\E\]` for `trait W[\T\] where { T extends Shows }` is accepted beside the conditional entry (main exit=0) and refused without it (main 'ExclPlain.fss:6:25-28: Ill-formed type: W[\E\]').

The same holds of the object's contract in `Decls`, by reading. `checkerWSparams` holds every condition (`Decls.scala:135-136`). The contract is checked with `method_checker` (`:139-142`), which at that point is `checkerWSparams` (`:137`). The base checked it with `this.extend(sparams, params, where)`, as `git show db8fecd22:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala` shows at the same place. No run backs this; the repair's first test run measures it (section 5, step 3).

## 3. What the text and the record say

**The decision.** P-151 (POSITIONS.md, **Only the `where` forms the team wrote down are built.**) puts two things under a conditional entry's condition. The trait "is that type only where the condition holds, and its members are checked under the condition". The curator's accepted reading names the same two: "the condition holds inside the declaration while its members and overrides are checked, as Swift, Rust and Haskell check it" (`explorations/coordinator/BOOT.md:30`). Neither names the static parameters, the declaration's own `where` clause, its contract, or its `excludes` and `comprises` clauses. In each of those three languages, a conformance's condition holds only in that conformance's own items. The type's parameters and their bounds are checked without it, as rung X's judge said of the other entries (`explorations/compile-ladder/rung-checker-conditional-extension/JUDGE.md:13-19`).

**The rung's own sentence.** The declared type "extends the entry's type exactly where the constraints hold: an instance whose static arguments satisfy them is of that type, and an instance whose static arguments do not satisfy them is not" (`Specification/basic/trait-parameters.tex:371-374`). So `D[\Fn\]` is a well-formed instance, which is not a `Shows`. Each part of the header states something about every instance:

- **The static parameters.** `F extends W[\E\]` bounds `F` at every `E`, and `W[\Fn\]` is ill formed.
- **The `excludes` clause.** "neither can extend the other, and no trait can extend them both" (`Specification/basic/traits.tex:223-227`), for `D[\E\]` and `W[\E\]` at every `E`.
- **The `comprises` clause.** "every type listed in its \KWD{comprises} clause extends \VAR{T}, and every value of type \VAR{T} is a value of one of the listed types" (`traits.tex:235-237`). For `D[\Fn\]` the listed `V[\Fn\]` is not a type.
- **An object's contract.** It "is evaluated when the object is created" (`Specification/basic/objects.tex:189-190`), and the constructor `V[\Fn\](x)` is a call at an instance where the condition fails.

Checking any of these parts as if the condition held assumes it at instances where, by `:371-374`, it does not hold. This is the argument by which rung X's judge upheld `bd18b6a47` for the other entries (`JUDGE.md:21-26`).

**The counter-reading.** `trait-parameters.tex:375` opens "Within the declaration the constraints hold:". The header is syntactically within the declaration. The upheld `bd18b6a47` already reads the sentence more narrowly than the syntax: the other `extends` entries are within the declaration too, and they are checked without the conditions (`:377-378`). The sentence's own colon names what it covers, "the entry itself and the declaration's members". The repair rewrites the sentence to name what holds under the condition and what does not, so the counter-reading has no text left to rest on.

**What keeps the conditions.** `Decls` checks the members, the fields and the methods, with the conditions holding (`Decls.scala:88-89`, `:111-120`; `:135-136`, `:165-174`), and that is P-151's rule. An object's non-transient value parameters are its fields: "Each field is either a non-transient value parameter of a constructor declaration, or it is explicitly defined by a field declaration within the body" (`objects.tex:271-272`). So the value parameters stay with the members, as the review's repair has them. `self` is the declaration's self type, which the members are checked against, so it stays with them too. A member checked under the condition stays callable where the condition fails (row 773, in the Effect at `Specification/appendices/changes.tex:221-224`), and the value parameters share that hole. Section 6 lists this line for the curator.

**The library.** No library declaration has a header that needs a condition, by reading. The only conditional entries are `List`'s and `PureList`'s (`Library/List.fsi:67-68`, `Library/List.fss:106-107`, `Library/PureList.fss:41-42`). The grep `where *{ *[A-Za-z]* extends` over `Library` and `ProjectFortress/LibraryBuiltin` finds no other in an `extends` clause. The `List` declarations take one unbounded parameter, have no `where` clause of their own, and their `excludes { Number, HasRank, String }` names no static parameter (`List.fsi:69`, `List.fss:108`, `PureList.fss:43`). So the count stays 30 and the distance 34 after the repair. That is by reading; the repair's count runs and the gate measure it. In the corpora, the conditional entries are those of X's four compiled tests and one walk test: `grep -ln "extends *{[^}]*where *{"` over `compiler_tests`, `library_tests`, `other_compiler_tests` and `tests`. None has a static-parameter bound, an own `where` clause, a contract, or an `excludes` or `comprises` clause.

## 4. Which claims of each side were right

The review:

- **The mechanism.** Right: `TypeWellFormedChecker.scala:194-195`, `:202`, `:211-212`, and the cross-rung face through `:259-289`.
- **The measurements.** Right, as quoted in section 2. Its runs are the evidence the repair's tests make permanent.
- **The suggested analyzer.** Right: `oldAnalyzer.extend(sparams, where)` for the header is the base's analyzer. Each conditional entry keeps its own conditions, and the value parameters, members and `self` keep every condition.
- **"No library declaration has the shape ... the count and distance do not move".** Right by reading (section 3).
- **What it missed.** `Decls`' check of an object's contract (`Decls.scala:139-142`). The review's repair moves `TypeWellFormedChecker`'s walk of the contract, so without this the two checkers would read one contract two ways.
- **The counter-reading.** The review was right to name it. It does not hold (section 3).
- **The fixed list and fixesChecked.** Not contested. RECORD.md's correction paragraph (`explorations/compile-ladder/climb-batch-18/RECORD.md:250`) is right of the tree before the repair, and step 9 updates it.

Rung X:

- **The worker.** Right that the conditional entry and the members need the conditions. Wrong to put the whole declaration under them: the header followed `:194` with no reason given. Rung X's judge said the same of the other entries (`JUDGE.md:35-38`).
- **The skeptic.** Right about the other entries. His fix stopped at the `extends` clause and left "the members, the parameters and the rest ... walked with all conditions, as the worker had them" (`explorations/compile-ladder/rung-checker-conditional-extension/SKEPTIC.md:63`). The rest is this finding.
- **X's judge.** Right to note the `excludes`/`comprises` half (`JUDGE.md:54`), by reading and unruled. It did not see the static parameters, the own `where` clause or the contract. Its citation `:201` is corrected to `:202` in PLAN (the review's fix).

Rung K: its check of a type's own constraint is right as written. It reads the analyzer it is given, and the repair gives it the header's. K's code does not change.

## 5. The repair

The instructions are those of the structured decision, repeated here. Work in the main tree, `/home/user/fortress`, after the gate there has finished, with the skill's setup for each call (`.claude/skills/fortress-repo/references/build-and-caches.md`). Edit no file of `ProjectFortress/src/` but `TypeWellFormedChecker.scala` and `Decls.scala`, and no file of `Library/`.

1. **Time the base.** Before any edit, run the count stage once on `main`'s build (the gate's), named `base`, with the command of `.claude/skills/fortress-repo/references/compiler.md`, "The checker's time", step 2: `export W=/home/user/fortress N=base ; mkdir -p $W/tmp/count ; time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`. Run it in the background with a log (`session.md`).

2. **Write five expected failures** in `ProjectFortress/compiler_tests/`. Each `.fss` is a component of its file's name, of the form of `XXXCondExtendUnconditionalEntryChecker.fss`: a first-line comment, `component <Name>`, `export Executable`, the declarations, then `run(): () = println("unreachable")` and `end`. The declarations of each:
   - `XXXCondExtendExcludesChecker`: `trait Shows end`, `trait W[\T extends Shows\] end`, then `trait D[\E\] extends { Shows where { E extends Shows } }` with `    excludes { W[\E\] }` on the next line and `end` after it.
   - `XXXCondExtendComprisesChecker`: `trait Shows end`, then `trait D[\E\] extends { Shows where { E extends Shows } }` with `    comprises { V[\E\] }` on the next line and `end` after it, then `object V[\T extends Shows\]() extends D[\T\] end`.
   - `XXXCondExtendParamBoundChecker`: `trait Shows end`, `trait W[\T extends Shows\] end`, `trait D[\E, F extends W[\E\]\] extends { Shows where { E extends Shows } } end`.
   - `XXXCondExtendExcludesWhereChecker`: `trait Shows end`, `trait W[\T\] where { T extends Shows } end`, then the `D` of the first test, its `excludes` line on its own line.
   - `XXXCondExtendContractChecker`: `trait Shows` with `  shown(): Boolean` and `end`, then `object V[\E\](x: E) extends { Shows where { E extends Shows } }`, `    requires { x.shown() }`, `  shown(): Boolean = true` and `end`.

   Each first-line comment gives the text's answer. For example: "(* An excludes clause holds at every instance, so it is checked without a conditional extends entry's condition: W[\E\] needs an E that extends Shows, which only that entry assumes; trait-parameters.tex, section "Where Clauses", and traits.tex, section "Trait Declarations". *)". Name `objects.tex` for the contract.

   Beside each `.fss` goes `<Name>.test`: `tests=<Name>`, `typecheck`, `typecheck_err_contains=File <Name>.fss has 1 error.`, and `typecheck_err_WIcontains=<Name>.fss:<line>:<cols>: <message>`. The form is `XXXWhereConstraintTypeUseChecker.test:1-4`. A `typecheck` keeps the code generator's walls out of the test: a trait with a `where` clause, and a contract (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4107-4109`, `:5027-5029`).

   The `<line>:<cols>: <message>` of each is the text's answer, read before any edit:
   - For the first three tests and the contract test, take it from the base build's run of the same file: `/home/user/fortress-base18/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base18 /home/user/fortress/tmp/old-caches-repair18 typecheck <file>`. The base reads no condition, so it refuses each for the reason the text gives. For the first three that is 'Ill-formed type: ... The static argument E does not satisfy the corresponding bound Shows.' (section 2).
   - For `XXXCondExtendExcludesWhereChecker`, take it from `main`'s run of a scratch copy under `tmp/` with `extends { Shows where { E extends Shows } }` replaced by `extends { Shows }`. The `excludes` line does not move, so neither does its place. The base lacks K's check, so it cannot answer this one.

   Keep two to five lines of each output with its command.

3. **See each red on `main` before any edit**, with `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests <Name>.test` (`tests-running.md`).
   - Each must fail: the typecheck prints no error, as the review measured for the first four.
   - If `XXXCondExtendContractChecker` is already refused with its key on `main`, `Decls` does not reach the contract with the conditions. Then do not edit `Decls.scala` (step 5), keep the test, and record the deviation in `REPAIR-review.md`.

4. **Edit `TypeWellFormedChecker.scala`.** In the trait case, replace `:192-203` (from `val oldAnalyzer = analyzer` to `analyzer = oldAnalyzer`) with the lines below:

       val oldAnalyzer = analyzer
       // The header holds at every instance, so it is checked without a conditional
       // extension's conditions,
       val header = oldAnalyzer.extend(sparams, where)
       analyzer = header
       walk(sparams); walk(where); walk(throwsC); walk(contract)
       // which hold while the value parameters and the members are checked,
       val inDecl =
         if (extendsC.exists(e => !staticenv.KindEnv.extendsConditions(e).isEmpty))
           oldAnalyzer.extend(sparams, staticenv.KindEnv.withExtendsConditions(where, extendsC))
         else header
       analyzer = inDecl
       // and an extends entry is checked with its own conditions only.
       for (tw <- extendsC) {
         if (extendsC.exists(e => !(e eq tw) && !staticenv.KindEnv.extendsConditions(e).isEmpty))
           analyzer = oldAnalyzer.extend(sparams, staticenv.KindEnv.withExtendsConditions(where, List(tw)))
         walk(tw); analyzer = inDecl }
       walk(params); walk(decls); walk(self)
       analyzer = header
       walk(excludes); walk(comprises)
       analyzer = oldAnalyzer

   In the object case, replace `:209-220` with the same lines, without `analyzer = header` and `walk(excludes); walk(comprises)`. The walks keep their order.

   A declaration with no conditional entry gets the one analyzer the base gives it, `oldAnalyzer.extend(sparams, where)`. So nothing changes for any other declaration.

   Build as `build-and-caches.md` says for a Scala edit. Then run the five tests: the first four must report 'Saw expected failure', and `XXXCondExtendContractChecker` must still be red.

5. **Edit `Decls.scala`'s object case.** Replace `:139-142` (from `val newContract = contract match {` to its closing `}`) with:

       // but not while the contract is, which is evaluated when the object is made,
       // at every instance.
       val contractChecker: STypeChecker =
         if (extendsC.exists(e => !staticenv.KindEnv.extendsConditions(e).isEmpty))
           this.extend(sparams, params, where)
         else checkerWSparams
       val newContract = contract match {
         case Some(e) => Some(contractChecker.check(e).asInstanceOf[Contract])
         case _ => contract
       }

   Change `:134`'s comment to "A conditional extension's conditions hold while the members are checked,". Build, and run the five tests: all must report 'Saw expected failure'.

6. **Run the tests the change reaches**, each through `junit.sh` as in step 3, and keep each run's last lines:
   - rung X's four, `CondExtendChecker`, `CondExtendInheritedMember`, `XXXCondExtendRefuseChecker` and `XXXCondExtendUnconditionalEntryChecker`;
   - rung K's eight, the tests of F-256 (`explorations/coordinator/FACTS.md:110`).

   Then run the count stage once, named `change`, with step 1's command.
   - The `base` and `change` tables must be equal (`diff` prints nothing).
   - Their `run.txt` files must be equal after each tree path is replaced by `TREE` (`compiler.md`, "The checker's time").
   - Then take P-148's second pass (`compiler.md`, steps 3 to 6). It starts with a profile. Where the profile shows no gain, say so with its top frames; no code changes then, so no `pass` run follows. No answer is reused, so no audit.
   - Run `ant testQuick` once after the last code change (`tests-running.md`, "When to run a whole suite").

7. **The specification.**
   - In `Specification/basic/trait-parameters.tex`, replace `:375-378` (from "Within the declaration" to "checked without them.") with:

         The constraints hold while the entry itself, the declaration's value
         parameters and its members are checked, as if they were in the
         declaration's own \KWD{where} clause.
         The rest of the declaration holds at every instance and is checked
         without them: its static parameters, its own \KWD{where} clause, its
         \KWD{throws} clause and contract, its \KWD{excludes} and \KWD{comprises}
         clauses, and the other entries of its \KWD{extends} clause.

   - In `Specification/appendices/changes.tex`, "Conditional extension", replace the Change's text from "the declared trait or object extends" (`:164`) through "clause are;" (`:167`) with the lines below. The words "the example is" that follow on `:167` stay, on the next line:

         the declared trait or object extends the entry's type exactly where the
         constraints hold, and the constraints hold while the entry itself, the
         declaration's value parameters and its members are checked, and not
         while the rest of the declaration is, which holds at every instance: its
         static parameters, its own \KWD{where} clause, its \KWD{throws} clause
         and contract, its \KWD{excludes} and \KWD{comprises} clauses and the
         other entries of its \KWD{extends} clause;

   - Replace the Effect's `:205-207` (from "refused where that type is expected, and the entry" to "its other entries without them.") with:

         refused where that type is expected, and the entry, the declaration's
         value parameters and its members are checked with the constraints
         holding, the rest of the declaration without them.

   - Edit `changes.tex` from the bottom up, or find each passage by its text.
   - Build the specification as `.claude/skills/fortress-repo/references/specification.md`, "Building it", says. Both commands must end in `BUILD SUCCESSFUL`, and no line that the log's grep prints may name a line of the edited passages.
   - Then run `git clean -fXq -- Specification`. Do not update `Specification/fortress.pdf`.

8. **F-255.** It is `explorations/coordinator/FACTS.md:109`. Write its line to a scratch file and make three changes:
   - In the bold title, replace "and its members and the entry itself are checked with them holding, its other `extends` entries without them" with "and the entry itself, its value parameters and its members are checked with them holding, the rest of the declaration (its static parameters, own `where` clause, `throws` clause, contract, `excludes` and `comprises` clauses and other `extends` entries) without them".
   - After the sentence that cites `KindEnv.scala:179-203`, add the cases' lines on `main` after the edit, and `Decls.scala`'s contract lines.
   - Add the five tests to "Tests:".

   Then run `explorations/coordinator/tools/record.py set F-255 FILE --from 'compile-ladder/climb-batch-18/JUDGE-review.md#3. What the text and the record say' --note 'the header checked without the conditions, after the merged-diff review'`, and `record.py check`. The check must show no failure beyond the length warnings it printed before (`RECORD.md:236`).

9. **The batch record.** In `explorations/compile-ladder/climb-batch-18/RECORD.md:250`, replace the last sentence, from "The static parameters, the declaration's own" to "the review's blocking finding.", with a sentence that gives the repaired reading. After the review's judge (`JUDGE-review.md`) and its repair (`REPAIR-review.md`), the rest of the declaration is checked without the conditions, `Decls`' object contract included. Cite the cases' and `Decls`' lines on `main` after the edit, and the five tests.

10. **PLAN.** At the end of X.judge.2's entry (`explorations/coordinator/PLAN.md:494`), add: "Ruled by the review's judge (`compile-ladder/climb-batch-18/JUDGE-review.md`) and repaired on `main`: the header is checked with the declaration's own `where` clause only, an object's contract in `Decls` too; tests `XXXCondExtendExcludesChecker`, `XXXCondExtendComprisesChecker`, `XXXCondExtendParamBoundChecker`, `XXXCondExtendExcludesWhereChecker`, `XXXCondExtendContractChecker`." Add the judge's item for the curator as the repair brief says.

11. **Write `explorations/compile-ladder/climb-batch-18/REPAIR-review.md`.** Give each step's result, the runs' lines with their commands, each count run's seconds, and any deviation with the file:line that settles it.

12. **Commit once, locally, on `main`.** The paths:
    - the two Scala files and the ten test files;
    - the two `.tex` files;
    - `FACTS.md` with its history file, `RECORD.md`, `PLAN.md` and `REPAIR-review.md`.

    The message carries the line `historical: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala, Specification/basic/trait-parameters.tex, Specification/appendices/changes.tex`, and ends with the skill's footer (`committing.md`). Do not push.

Line numbers in steps 4 to 10 are `main`'s at `7d6c65881`.

## 6. Left for the curator

**Where the value parameters fall.** Nothing on record settles it.

- **Taken:** an object's value parameters are checked with the conditions, with the members. They declare its fields (`objects.tex:271-272`), and P-151 puts the members under the condition. So a parameter typed only under the condition is accepted, and the object can be made where the condition fails. That is row 773's hole, which a member already has.
- **Not taken:** check them with the header, since the constructor's arrow type holds at every instance (`objects.tex:204-206`). Its cost is small: `walk(params)` moves to the header's analyzer in `TypeWellFormedChecker`'s object case, and `Decls`' object case binds the parameters without the conditions, with a field then typed only under the condition refused. By reading, no library declaration or test has such a parameter, so the count does not move either way.
- It belongs with row 773, the scoping of members to the condition. A reversal is the two-line edit above, with one expected failure promoted.

`Decls`' contract and `TypeWellFormedChecker`'s `throws` clause and contract are ruled with the header. P-151 names members only, and a contract is evaluated when the object is made (`objects.tex:189-190`).
