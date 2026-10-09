<!-- Climb batch 12, rung W (rung-walk-load-checks): the judge's ruling on the skeptic's one contested fix, c17cff594. -->

# The judge's ruling on rung W of climb batch 12

Decision: **stands**. The one contested fix, c17cff594, is **upheld**. Nothing is reverted, so the rung lands as the branch holds it at 278a07a44 plus this file. No build and no test was run for this ruling; every result below is the skeptic's or the worker's, cited where they quote it.

## 1. The fix ruled on

c17cff594, "walk binds every component's object expressions before any component's top-level variables":
- `CUWrapper.initObjectExprs` binds a component's object-expression constructors once (`ProjectFortress/src/com/sun/fortress/interpreter/env/CUWrapper.java:272-284`). `initVars` calls it in place of the worker's direct call (`:298`).
- `Driver.evalComponent` calls it for every component in a loop of its own, after `reset` and before the loop of `initVars` (`ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:243-245`).
- Its test is `ProjectFortress/tests/ObjectExpressionImportedVariableWalk.fss`, with the helper `ProjectFortress/test_library/ObjectExpressionVariableLib.fsi` and `.fss`.

It is contested under clause (c) only: it touches `Driver.java`, which the rung's file list does not name (`explorations/coordinator/CLIMB-BATCH-12.md:187-192`).

## 2. The ruling: uphold

1. **The defect is row 648's own claim, still true on the worker's head.** The row reads "a top-level variable initialized with an object expression stops the program at load" (`explorations/fortress-gap-ledger.md:242`). The helper's `libChooser: Chooser = object extends Chooser end` (`ProjectFortress/test_library/ObjectExpressionVariableLib.fss:8`) is such a variable. On the worker's head, the skeptic's run of the test stopped at that very line (`SKEPTIC.md:94-98`):

       explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-checks/skeptic/h-xc ProjectFortress/tests/ObjectExpressionImportedVariableWalk.fss
       Missing value: *objectexpr_ObjectExpr at ProjectFortress/test_library/ObjectExpressionVariableLib.fss:8.23 in environment:
       Tests run: 1,  Failures: 1,  Errors: 0

   Closing row 648 on 8803d2f45 alone would record as fixed a claim that a gated program still shows.

2. **The specification draws no component boundary here.**
   - "Object expressions denote object values" (`Specification/basic/expressions/object.tex:31`).
   - "Executing a Fortress program consists of evaluating the body expression of the run function and the initial-value expressions of all top-level variables and singleton object fields in parallel. All initializations must complete normally before any reference to the objects or variables being initialized" (`Specification/basic/evaluation/intro.tex:19-24`). That covers all top-level variables of the program, not those of one component.
   - For a component with imports, the declarations of the transitive closure of the imported apis are prepended to the component definition, and then all top-level variables and singleton fields are initialized (`Specification/basic/components/initialization.tex:22-30`).
   - So an imported component's object expression must be an object value whenever any top-level initializer of the program evaluates it. The worker's repair binds constructors one component at a time, after the components before it have run their pass 4 (`Driver.java:247-249`, `CUWrapper.java:286-304`). That leaves the cross-component case as it was.

3. **The mechanism is what the skeptic says, by reading.**
   - Pass 4 forces a top-level immutable variable's value (`bindInto.getLeafValue(sname)`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:782`) and a singleton (`:622`). So the importer's pass 4 evaluates the library's `object extends Chooser end` before the library's own `initVars` has bound its constructor.
   - Pass 4 does nothing else. `fourthPass` only sets the pass number (`BuildEnvironments.java:100-103`). `forFnDecl4` and `forTraitDecl4` are empty (`:287-288`, `:885-886`). `forObjectDecl4` only forces a singleton (`:610-631`). `forVarDecl4` only binds a variable (`:731-800`).
   - `registerObjectExprs` reads types, functional methods and trait members that passes 2 and 3 built (`ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:156-191`). The driver finishes those passes for every component before the new loop (`Driver.java:224-241`). The worker's own repair already moved the call before its component's pass-4 visit, so the call has no need of that component's pass 4. The skeptic's loop extends this to every other component's pass 4.

4. **It follows the driver's own way.** `Driver.evalComponent` runs each stage of loading as one loop over every component before the next stage begins: types, the comprises check, functional methods, functions, `reset`, variables (`Driver.java:224-249`). The revival already put one whole-program load step there (`checkComprisesClauses`, `:227`, commit 7ed2a8387; FACTS, "Walk checks at load the `comprises` clauses of the program's main component, and its harness names an expected refusal at load"). The new loop is one more stage of the same shape. The skeptic weighed two other ways (`SKEPTIC.md:89-92`): binding on demand at the first lookup, which changes name lookup, and binding in pass 3, before the other components' functional methods are finished (`Driver.java:235-237`). Both reach further than this one does.

5. **It is within the rung in every sense the batch's rules give.**
   - The file is walk's own code, under `interpreter/`, the rung's area (`CLIMB-BATCH-12.md:187`). The list says what the rung does not touch: "Not: the library, the checker, the test harness" (`:192`). `Driver.java` is none of these.
   - The batch's rule is that no two rungs change one declaration (`CLIMB-BATCH-12.md:347`), and "No other rung edits walk" (`:205`). The gather therefore meets no conflict in this file.
   - The rung's points to report (`CLIMB-BATCH-12.md:401-408`) include none that the fix reaches, as SKEPTIC.md:150 shows. No verdict changes. No demo has an object expression. It does not change which declaration walk runs. It is no library, checker or harness edit.
   - The helper sits where the skill puts a helper component (`.claude/skills/fortress-repo/references/tests-writing.md:42`), beside the team's own import helpers in `ProjectFortress/test_library/` (`TestImports1.fss` to `TestImports4.fss`, `RecA.fss`, `RecB.fss`).
   - It is reversible: one loop and one guarded method.

6. **It was tested first and the suite holds.**
   - The test was red on the worker's head (point 1). It was green after the fix's build, at 12:48:48Z, through the same harness on 26 files: "PASS", " OK (time = 232ms)", "OK (26 tests)" (`SKEPTIC.md:100`).
   - `ant testSystem` on c17cff594 printed "BUILD SUCCESSFUL" and ran shards of 131, 137, 138 and 134 tests, 540 in all, with no failure (`SKEPTIC.md:133-140`).
   - `ant testSpecData` is the gate's.

7. **Reverting would cost more and leave a known defect open.** The test would go with the revert. The residue would need a gated expected failure and a new row, and row 648 would close while its claim holds (`SKEPTIC.md:154`). The goal is one tree with everything running (POSITIONS, "The specification stays the standard, the Types chapter beside it."). Nothing on record asks walk to keep this stop.

## 3. What each side had right

- **The worker** was right that `Driver.java` is not in the section's file list (`CLIMB-BATCH-12.md:187-192`). It was right that it had not measured the cross-component case (`REPORT.md:209`). Its repair is correct for one component. But a file missing from the list is not a file the section rules out: the list's exclusions are the library, the checker and the harness (`:192`). An unmeasured case is a reason to measure it, which the skeptic did. It is not a reason to leave the row's claim true.
- **The skeptic** was right on each point it argued. The case is measured, on the base and on the worker's head (`SKEPTIC.md:76-77`). Row 648's claim still holds for the imported component's own variable (point 1). Pass 4 only binds variables and forces singletons (point 3). The suite passes at 540 (point 6). A revert needs a row and an expected failure (point 7). One correction to its citation: the pass-4 sites it gives, `BuildEnvironments.java:310`, `:448`, `:657`, `:819`, are the `case 4` dispatches. The bodies that show what pass 4 does are at `:287-288`, `:610-631`, `:731-800` and `:885-886`.

## 4. For the gather

The rung lands as the branch holds it. Three things follow from upholding the fix. All of them are already in the branch's record or are the gather's own steps, and none needs a repair round.
- The commit's `historical:` line names `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java` beside the files that REPORT.md's provenance block lists (`REPORT.md:10`). The file is the team's (its last change before the revival's is 5a68404fd, 2012).
- REPORT.md's decision 6 (`REPORT.md:209`) gives the cross-component binding as a way not taken. This ruling supersedes that: the binding is taken, in c17cff594. SKEPTIC.md section 7 (`:154`) already records the difference.
- Row 648 closes as `record.md:24` writes it. Its note names c17cff594 and `tests/ObjectExpressionImportedVariableWalk.fss` for the importing component's variable. The FACTS entry already states the driver's loop (`record.md:11`).
