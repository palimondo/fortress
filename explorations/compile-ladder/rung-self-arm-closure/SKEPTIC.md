# Climb batch 33, rung Q: the skeptic's verdict

The head judged is `0afb9ce991`, the worker's last commit on `wip/rung-self-arm-closure`. One launch of this role worked the rung. Both `REPORT.md` and `record.md` were on the branch, so the journal step wrote nothing: `journal-text.py` gave, for `reportText` and `recordText` of `rung:Q resume:Q`, 28655 and 16468 bytes, and `diff -q` against the committed files printed nothing. My commits: `753c13926b`, `8b2822012d`, `efc34c9bcc`, then this file.

**Verdict: approved.** The change does what the section and forks Q1 and Q2 ask, test first, and the record is honest but for one claim about bytecode, which I corrected. None of my fixes is contested.

## What I checked

1. **The stages.** None ran, as the section says ("The stages. None."). `git diff --name-only 1609258002b016489c96bd6e438389e89773b9eb...HEAD` lists two paths outside the stage-blind list: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` and `ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java`. The count stage reads neither, since the checker is unchanged. The distance stage does compile the library with the code generator: `explorations/coordinator/tools/distance/shadow-patch.py`'s header says "CodeGen: wrap the per-declaration loop of forComponent in try/catch". So the gate's distance table on the merged tree is the first measure of this rung's `CodeGen.java`. By reading, the new calls reach `castToTypeBelow`'s type tests only at an arm or a closure's result that has self's type. In the one library, such an arm is in `StandardTotalOrder`'s `MIN` and `MAX` (`Library/FortressLibrary.fss:291-292`) and in the bodies near `:174-175` and `:666-716`. These are the same tests and descriptors that rung K's cast at a returned value already runs. I re-ran the shadow patch on the head: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` exited 0.
2. **Test first**, from the worker's transcript (times UTC, call ids):
   - The owed test failed through the harness on the base's code at 18:36:20 (`…VTmLcC`): '. run ProjectFortress/compiler_tests/XXXSelfTypeArmRun (435ms) REACHED', 'Caused by: java.lang.VerifyError: Bad return type'. With the defect worked around for one run it was red at 18:36:30 (`…hpdXQ5`): 'Did not see expected failure'.
   - The promoted tests and `SelfTypeFromClosureRun` failed at 18:39:20 (`…GrfyPJ`), 'Tests run: 14,  Failures: 5,  Errors: 0'. `SelfTypeFromClosureRun` was rewritten and failed again at 18:39:44 (`…6t7CiM`): '…apply()LSelfTypeFromClosureRun$Pt; @4: areturn'. In both calls `git diff --stat <base> -- ProjectFortress/src` printed nothing, and the tree ran the seeded base build.
   - The code was edited from 18:41:09 to 18:41:53 and first built at 18:41:57 (`…mVLhQt`).
   - The `case` clause was seen failing on the old code at 19:10:35 (`…3qutEK`). The last passing run, at 19:11:39 (`…VCTrDV`), came after the last change of code: 'OK (16 tests)'. The rule of `tests-writing.md`, "The order", is met.
3. **The diff**, line by line. `forIf` (`CodeGen.java:4535`, `:4558`, `:4568`) casts each arm at the `If` node's type. `forFnExpr` (`:3968`) and `localFunctionClosure` (`:4127`) cast the body at the header's return type. Every cast goes through rung K's unchanged `castToTypeBelow` (`:7764-7786`), which emits nothing unless the value has the type `TraitSelfType` with a non-empty list and the target lies strictly below self's trait.
   - The checker gives the `If` the first of else-type-then-clause-types to which every arm is substitutable (`scala_src/typechecker/impls/Misc.scala:537-546`).
   - So with `self` in the `else` arm the conditional has self's type, its arms get no cast, and rung K's cast at the context casts after the join. With the other value in the `else` arm, the `self` arm is cast at that value's type.
   - Both shapes verify and run (`SkArms`, `SkArms2` below). I read this as Q1's rule with "the declared type" taken as the conditional's type and "not already a subtype" as `castToTypeBelow`'s test. That is the worker's decision 1, and it is neither narrower nor broader than Q1, but for the cast measured in item 6.
   - `MethodInstantiater.visitMethodInsn` (`:268-271`) and `interfaceByClassFile` (`:304-317`) read `ACC_INTERFACE` from the resource that the loader's own `getClass` defines for a plain name (`InstantiatingClassloader.java:150`, `readResource`, and `:162-172`). Where none is found they load as before (`:272`). The opcode is therefore the one the old load chose wherever that load succeeded.
4. **Precedent.** Rung K's `castToTypeBelow` is followed. For the load, the team's code beside it already chooses the opcode of a generic owner from a resource without loading the class: `icl.xlationForGeneric(new_owner)` (`MethodInstantiater.java:251-252`) reads the template's `.xlation` resource (`InstantiatingClassloader.java:2586-2587`). The class-file read follows that way. That lookup caches its answers in `stemToXlation` (`:2581-2583`), and the new read caches none. It reads and parses the owner's class file once for each such call site of each expansion. That cost was not measured, and the commit stage's microGPT quick checks run the compiled path. The other joins are as the worker counted: `forTypecase` (`:2524`, row 1070, rung V's member), and `forLabel`/`forExit` and `forTry`, which ran on the base.
5. **The tests.** Each `.fss` has one comment line and is named by its topic. The citations name a file and a section.
   - The expected failure of a `typecase` arm printed `REACHED` after `q: Q = R(1, 2)`, the construction whose class load fails, and checked `run_out_does_not_contain=REACHED`. `tests-writing.md:111` asks "The program prints `REACHED` in `run()` before the part that fails". Fixed in `753c13926b`.
6. **My programs.** Each was run four ways: compiled on the rung's build with a private copy of its caches (`FORTRESS_CACHES=<copy> bin/fortress compile P.fss`, then `run P`), compiled on the old code (`old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches compile P.fss && … run P`), and under walk with each. The rung edits the class loader, so the compiled runs were made at `FORTRESS_THREADS=1` and `=4`, with the same answers.
   - `SkArms`, in `trait Ord2[\T extends Ord2[\T\]\]` with an object and a trait as `T`:
     - its shapes: an `elif` arm, a typed binding of the conditional, a dotted call on the conditional, `self` in the `else` arm, a conditional inside a function expression, and a local function with no return type;
     - in `trait Q comprises { R }`: `self` in the `else` arm, the conditional as a call's one argument, and a `case` over strings.
     - Compiled new: 'PASS', 19 assertions. Old: 'Exception in thread "main" java.lang.ClassCircularityError: SkArms$Num'. Walk, new and old: 'PASS'.
   - `SkArms2`: `self` in both arms of an inner conditional, a function expression with no return type, a pair `(other, self)` at `(T, T)`, and a generic listed type, `trait Gq[\T\] comprises { Gr[\T\] }`.
     - Compiled new: 'PASS', 15 assertions. Old: 'Caused by: java.lang.VerifyError: Bad return type', '…$DefaultTraitMethods.viaBinding(…)LSkArms2$Num; @24: areturn'. Walk: 'PASS' on both.
   - `SkRecv`: `(if c then self else R(0, 7) end).d`, the conditional as a field read's receiver.
     - Compiled new: 'PASS'. Old: 'VerifyError: Bad type on operand stack', '…selfFirst(…) @23: invokevirtual', "Type 'java/lang/Object' (current frame, stack[0]) is not assignable to 'SkRecv$R'". Walk: 'PASS'.
     - With `self` in the `else` arm instead, the checker refuses the read on both codes: '(Q & {R}) has no getter called d'. That is item 7's defect.
   - `SkLoader`, a template's call on a value of a type parameter at an object's class and at a trait's interface: `Box[\T extends Named\]`, the generic function `nameOf[\T\]`, and the self-typed trait listed first and second.
     - Compiled new: 'PASS'. Old: 'ClassCircularityError: SkLoader$First', at 'MethodInstantiater.visitMethodInsn(MethodInstantiater.java:269)', 'InstantiatingClassloader.readAndExpandGenericThing(InstantiatingClassloader.java:485)', 'java.lang.ClassLoader.defineClass(ClassLoader.java:962)'. This is the cause that the report gives for row 1052.
   - `SkReach`, the reserved point "A change of which declaration a call reaches". It prints the getter and method that a template's call reaches: on an object that overrides the trait's body, on one that inherits it, through a trait's and a sub-trait's interface, through a generic function, and on the self-typed trait listed second.
     - Old and new, compiled at 1 and 4 threads and under walk, print the same eleven lines, 'Over / Over label', 'trait / trait descr', 'leaf / SubNamed label', … 's2', 'END'. The point is not reached.
   - `SkNoCast`, the point "The bytecode of a conditional that needs no cast": conditionals and closures with no arm of self's type, `self` in both arms, `fn (): Q => self`, and `atQ(c: Boolean): Q = if c then self else R(0, 0) end`.
     - Both codes print 'PASS'. Every class's `javap -c -p`, old against new, differs only in `atQ`: old '7: aload_0', '8: goto 22'; new '7: aload_0', '8: checkcast #21 // class SkNoCast$R', '11: goto 25'.
     - The checker gives that conditional the type `R`, so the `self` arm is cast though its context `Q` is an interface and the base verified the class. The cast cannot fail (P-60).
     - The report said that a conditional that needs no cast compiles to the same bytecode as before. Corrected in `8b2822012d`.
   - `SkSelfGetter`: `den(): ZZ32 = self.d` in `trait Q comprises { R }`. Compiled, new and old: '(Q & {R}) has no getter called d'. Walk, new and old: 'PASS'.
7. **Homes.**
   - Rows 1051, 1050 and 1052: home 1. The `case` clause: home 1. Row 1070: home 2. Row 1069: home 3. Each is as the report says.
   - The getter on `self` measured by `SkSelfGetter` is a defect of the checker that the record does not hold. Climb batch 31's rung K met it (`explorations/compile-ladder/rung-comprises-cast/REPORT.md:91`, program C) and added no row. The specification settles it: `self` has the type `Q ∩ R` (`var-ref.tex`, "Identifier References"), and that intersection equals the named type `R` (`types-vals-vars.tex`, "Intersection and Union Types").
   - So it gets home 2 (`efc34c9bcc`): `compiler_tests/XXXComprisesSelfGetterCompiled.test`, and row 1071 in `record.md`. The row was linted with `ledger.py check --rows`, which failed only the number rule.
8. **The ledger and sibling sites.**
   - `ledger-find` found no other row for 'ClassCircularityError', 'self conditional', 'self closure' or 'MethodInstantiater' that the change bears on.
   - Row 365 (an `if` of two object types at a union return) has no `self` and is untouched.
   - Rows 366 and 408 concern `rttiReference`, another member.
   - The worker's `ant testFast` printed 'Tests run: 1702, Failures: 0, Errors: 0' for the compiler track, 'Tests run: 86, Failures: 0, Errors: 0' for the library track and 'Tests run: 263, Failures: 0, Errors: 0' for the othercompiler track (REPORT.md, section 3), so no other `XXX` test turned red.
9. **The report.**
   - The five provenance lines and every cited line were opened with `sed -n`, and each says what it is cited for:
     - `CodeGen.java:1922`, `:1967`, `:2100`, `:2377`, `:2526`, `:3272`, `:4069`, `:4091`, `:5679`, `:7745`, `:7764`;
     - `var-ref.tex:64-80`;
     - `InstantiatingClassloader.java:83-88`, `:485`;
     - `ArrayStoreJUTest.java:197`, `:204`, `:218-219`;
     - `changes.tex:4445-4449`;
     - the `traits.tex` callouts;
     - `key.md:454-466`, `PLAN.md:856`;
     - the team's `a874948ac` lines.
   - The one sentence of the specification made false is `Specification/appendices/changes.tex:4445-4449`, which the report lists. No `traits.tex` or `var-ref.tex` callout names the shapes.
   - `testFast` ran once on code `3f3984e82f`: 'BUILD FAILED', the one error `ArrayStoreJUTest.testFourTasksAddIntoOneElementInsideAtomic` ('Tests run: 8, Failures: 0, Errors: 1, Skipped: 0, Time elapsed: 60.316 sec'), passing alone. That class touches no code generator and no loader (its imports: `arrayOps`, `BaseTask`, `FortressTaskRunnerGroup`), so row 1069 stands as written.
   - The atomic runs: 72 lines 'PASS'.
10. **Competing declarations.** No other file in the tree's test folders or library declares the six test names. `interfaceByClassFile` is declared once in `ProjectFortress/src/com/sun/fortress/`. Of the other branches of the batch, V and I edit `CodeGen.java` in hunks that do not meet Q's.
11. **The failure-mode question.** The rung turns class-load failures (`VerifyError`, `ClassCircularityError`) into runs that give the specified values, the answers walk gives. No value is made up:
    - a cast that could fail throws `ClassCastException`;
    - a class file that cannot be read falls back to the old load;
    - the loader's answer comes from the same bytes that it defines.

## The fixes

| commit | finding | kind | test, failing and passing | settled by |
|---|---|---|---|---|
| `753c13926b` | `compiler_tests/XXXComprisesValueAtTypecaseArmRun.fss:15-16` (at `0afb9ce991`) printed `REACHED` after the failing construction, and its `.test` checked the run did not print it | correction (test) | `ONE_JVM=1 …/junit.sh skhead ProjectFortress/compiler_tests ComprisesValueAtTypecaseArmRunLink.test XXXComprisesValueAtTypecaseArmRun.test`: '. run … (335ms) REACHED', 'Saw expected failure (Exit code != 0)', 'OK (2 tests)'; the same on the old code (`old-fortress.sh … junit`); with the arm `do r: R = self; r end` for one run: 'PASS', 'Did not see expected failure', 'Tests run: 2,  Failures: 1' | `.claude/skills/fortress-repo/references/tests-writing.md:111` |
| `8b2822012d` | `REPORT.md:47`, `:170` and `record.md`'s finding 1 and F-377 text said that a conditional that needs no cast compiles as before | correction (report, record) | `SkNoCast`'s `javap` above | the measurement; the section's point "The bytecode of a conditional that needs no cast, before and after" |
| `efc34c9bcc` | the checker refuses `self.d` at a listed type, a defect with no home | correction (home-2 test, row) | `ONE_JVM=1 …/junit.sh skgetter ProjectFortress/compiler_tests XXXComprisesSelfGetterCompiled.test`: '(Q & {R}) has no getter called d', 'Saw expected failure', 'OK (1 test)'; the same on the old code; with `do r: R = self; r.d end` for one run: 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1' | `var-ref.tex`, "Identifier References"; `types-vals-vars.tex`, "Intersection and Union Types" (`:637-639`) |

No fix changes Java or Scala, so no suite was run after them. The report's tables are the worker's head's: no stage ran, as its section says.

## Where I differ from the report

- Section 1 and point 4 said that a conditional that needs no cast compiles to the same bytecode as before. That holds where no arm has self's type, and not for `atQ` (item 6). The sentences are corrected. The decision behind it, decision 1, is the worker's and stays.
- Decision 2 says no new member was needed above `castToTypeBelow`. I agree.
- The report does not say that the class-file read keeps no cache where the team's adjacent lookup keeps one (item 4). This is an efficiency note, not measured.

## Points to report

1. The cast as built at each place:
   - `CodeGen.java:4558` and `:4568`, after each arm, at the conditional's type (`:4535`);
   - `:3927` and `:4086`, before a closure's `areturn`, at the return type.

   `castToTypeBelow` (`:7638-7660`) decides. A cast is also emitted where the conditional's own type is the listed type and its context, a trait type, needs none (`atQ`).
2. Rows 1051, 1050 and 1052: each expected failure was promoted and was seen failing on the base and passing after (item 2). The owed test is `SelfTypeArmRun`.
3. Row 1052's cause: the load of the object's class `…$Pt` (`Class.forName`, `MethodInstantiater.java:269` on the base) while its superclass, the trait's default methods at the object, is expanded. The repair reads the class file's flags and loads nothing (`:268-271`, `:304-317`). Confirmed by `SkLoader`'s stack on the old code.
4. The bytecode of a conditional that needs no cast: the same where no arm has self's type, and one `checkcast` more in `atQ` (item 6).
5. The shadow patch still applies: exit 0 on the head.
6. The files edited, for the stage-blind list:
   - by the worker, `compiler/codegen/CodeGen.java` and `runtimeSystem/MethodInstantiater.java`, both outside it;
   - the tests under `ProjectFortress/compiler_tests/`, the rung's record files, and mine, `XXXComprisesValueAtTypecaseArmRun.*` and `XXXComprisesSelfGetterCompiled.*`.

   No file was edited beyond those named. Two reserved points were checked: no model line changed, since `git diff --name-only` over `explorations/run-c4/src` and `explorations/apl/mg` lists nothing, and no call reaches another declaration (`SkReach`).
