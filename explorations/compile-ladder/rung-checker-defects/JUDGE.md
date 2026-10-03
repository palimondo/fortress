# Rung C, judgement on the first skeptic's refusal

*The row numbers are the final ones the gather of climb batch 10 assigned; the rung wrote provisional 610 to 616, which are rows 620 to 626.*

Judged head: `730a8ccf1` (code state `4d19d17a1`), base `9c9e823d5`. Decision: **repair**.

The skeptic's refusal ground holds, by reading alone. The varargs binding (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala:185-187`) gives the parameter `ImmutableArray[\T, ZZ32\]` of the library in use. The guard that keeps that undeclared type from the trait table looks only at a declared function's body (`impls/Decls.scala:210-219`, `mentions(body, ...)`). Two places bind the parameter outside that guard. The contract is checked after it, with the binding (`impls/Decls.scala:220-221`, `newChecker.check(c)`). A function expression binds its parameters with no guard at all (`impls/Functionals.scala:1128-1160`, `this.extend(params)` at `:1148` and `:1153`). The batch record says "A crash is never the checker's answer: a construct the text allows is checked, and one it refuses is an error with a message" (`explorations/coordinator/CLIMB-BATCH-10.md:144`). The rung's own decision 4 says the guard put a refusal in place of the crash. Both sentences of the text that state it say "a body" (`Specification/basic/functions.tex:192-194`; `Specification/appendices/changes.tex:2759-2760`). The base answered `SkVaFnExpr4` and `SkVaContract2` with an error, and the head throws `Not in the trait table: CompilerLibrary.ImmutableArray`. The rung's approach is right everywhere else, so this is a repair, not a drop.

## 1. The worker's claims

Right:

- Rows 563, 593, 605 and 574, row 597's checker half, and crash 4 are repaired as claimed. The skeptic's own programs, run head against base, agree (`SKEPTIC.md` section 4: `SkMapperCapture`, `SkDepBound`, `SkFieldGetter`, `SkDupSelfThird`, `SkObjExprGenericOk`/`Bad`, `SkVarianceVa`/`Vb`), and nothing is over-accepted (`SkVaWrong2`, `SkAbsWrong`).
- The calls of row 604 are repaired as claimed: none, one and many trailing arguments, numerals, dotted calls, and the export check. The parameter's type is the team's `ImmutableArray[\T, ZZ32\]`. The record's decisions settle that (`CLIMB-BATCH-10.md:144`; POSITIONS, "The type group's late positions outweigh the early text"), with `Types.java:104-107` and walk's value (`NonPrimitive.java:224-251`) as precedent.
- Row 593's solver change keeps a self-mentioning bound out (`Formula.scala:561-583`), so rung W's F-bounded case is untouched. The `toBounds` path is not the overloading oracle's: the skeptic's reading of `types/TypeSchemaAnalyzer.scala:141` and `:194` stands.
- Editing files beyond the section's list is not a stop. The stops are a library or walk edit, the overloading rules, and another rung's file (`CLIMB-BATCH-10.md:158`, `:166`), and none of the extra files is any of these.
- Decision 9's outcome stands: crashes 1-3 stay expected failures with rows. The record prescribes tracing and testing them, not repairing them (`CLIMB-BATCH-10.md:153`, `:172`).

Wrong:

- Decision 4, that the guard put a refusal in place of the crash. It does so only in a declared body (above).
- The home table's entry that `XXXVarargsParamNotItsElement` holds "the body typed the parameter as its element". That test asserts the guard's message, and the guard builds the message from `Types.makeVarargsParamType` (`impls/Decls.scala:214`), not from the binding. With `STypeEnv.scala:185-187` reverted, the guard still fires and the test still passes.
- The text, `functions.tex:192-194` and `changes.tex:2759-2760`, which is false for a contract and for a function expression.
- Decision 9's ground. "Refuses a program the text allows" leaves out row 405 (`explorations/fortress-gap-ledger.md:416`): the compiled path already refuses an untyped parameter at top level and in a method, "Missing parameter type for x", and that row classes the text as silent. The ground that holds is the record's stop "A crash repaired by catching it without the error the text gives" (`CLIMB-BATCH-10.md:166`). The text gives no error for the program, so the team's refusal in place of the crash would be that stop.
- The `problem:` line of the report cites `XXXInferDependentBound.fss:19`. At `9c9e823d5` that line is the passing `idS` assertion; the failing `depS` assertion is at `:20`.
- The report is silent that `XXXVarargsBodyIterates` came with the edit (`eb9161c30`), keyed on a message the edit created, and never ran on the base's code.

## 2. The skeptic's claims

Right: the refusal ground (above); the body-type test (above); row 563's sibling; the code-generation crash of a trait method with a varargs parameter; the third crash form; the provenance line; the silence on `XXXVarargsBodyIterates`; row 405 missing from rows 620-622; and the text made false. I confirmed four of the cited sites by reading:

- `domainApart` keeps a non-clashing parameter whose bound mentions a renamed one, `case None => p` (`AbstractMethodChecker.scala:141`). Rung O's helper does the same (`OverloadingChecker.scala:200`).
- `NamingCzar.jvmSignatureFor` unwraps `p.getIdType()` for every parameter (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:899`), and a varargs parameter has none. `CodeGen.java:6826` calls it for trait methods.
- The tracks and the two stages each ran on `eb9161c30` and again on `4d19d17a1`. The prefix asks for one run after the last edit. That is a process note, with nothing to repair.
- `SkVaWalkType`'s typecase crash is pre-existing, and the skeptic measured it, so it is owed a home (prefix, "What a measured defect is worth").

Wrong or overstated:

- **For Pavol, microGPT.** "Row 176 records that microGPT's source declares untyped parameters at top level and locally" overstates the row. Row 176 (`explorations/fortress-gap-ledger.md:148`) records probe variants B and C (`run-c4/probes/types/`) whose losses equal "the typed source's". A search of `explorations/microgpt.fss` and `explorations/microgpt2.fss` for a definition with an untyped parameter finds none. So the open question of local untyped parameters stands for Pavol without the claim that it blocks the measuring stick.
- **The offer to repair `domainApart` alone in this round.** I do not take it (decision J2 below).

## 3. Decisions taken here

**J1. The guard moves to the use of the variable.** The text does not say what the checker does where the library lacks the type it names. The record decides that a crash is never the answer, and that the type is the team's.

Candidates:
1. Extend the declaration's guard to its contract and copy it into the function-expression rule. This counts the binding sites by hand. It misses any site not counted, such as an object's `transient` varargs parameter or a keyword default after a varargs binding, and it leaves two copies of one rule. It still does not make the binding observable.
2. Refuse at the binding, in `STypeEnv.extractNodeBindings`, as the team refuses an untyped parameter (`STypeEnv.scala:191-192`). That refuses every varargs declaration under the compiled library, even one whose body never uses the parameter, so the rung's call tests (`VarargsArgumentCounts` and the others) would go red. It also needs the trait table, which the object does not have.
3. Keep the element type where the library lacks the type. This is the silent over-acceptance the worker rejected: `k(rest: String...): String = rest` type checks.
4. **Taken:** refuse in the `VarRef` rule (`impls/Misc.scala:625-643`), the one place a variable's type is read (`getTypeFromName` at `:627`; the other callers, `Misc.scala:165` and `Functionals.scala:899`, read names, not this binding). It fires when the variable's type is the varargs type of a library whose trait table lacks it.

Option 4 covers every binding site by construction, and the team's own form of refusal in a rule is used: `signal` then `return expr`, as the function-expression rule does at `Functionals.scala:1141-1142`. Inside a `TryChecker` the signal becomes a failed try, not a crash (`STypeChecker.scala:566-575`, `:579-591`, `:598-607`). Because the refusal's condition is the type the binding gives, `XXXVarargsParamNotItsElement` and `XXXVarargsBodyIterates` then depend on the binding. With `STypeEnv.scala:185-187` reverted, `rest` would be a `String` or a `ZZ32`, the guard would not fire, and their keys, which name `ImmutableArray[\...,ZZ32\]`, would be unmet. That settles the skeptic's body-type finding without a unit test. Under the one library the condition is false: `ImmutableArray` is declared there, and the rung's `distance2` output holds no guard message. So neither the count nor the distance moves, and neither is run again.

**J2. Row 563's sibling is recorded, not repaired, in this rung.** Its program is refused by both the abstract-method checker and the overloading checker (`SKEPTIC.md` section 5). The overloading half sits in `ownStaticParamsApart` (`OverloadingChecker.scala:184-202`), and the record lets this rung edit that file for row 574's message only (`CLIMB-BATCH-10.md:158`). Repairing `domainApart` alone changes no program's verdict, and it would need its own stage run and a compound key. Both helpers are best repaired together by a checker rung that may edit the overloading checker. The defect's home is 2: the program is valid by `traits.tex`, section "Method Declarations".

## 4. Instructions for the repair round

1. Work in `/home/user/fortress-checkdefects` on `wip/rung-checker-defects` and set up the shell as the prefix says. The build in the worktree is `4d19d17a1`'s code (`730a8ccf1` and this commit change no code), and the base copy `/home/user/fortress-checkdefects-base` exists. Build nothing before step 4. Read `SKEPTIC.md` sections 2, 5 and 6. The skeptic's probes and runner are in `tmp/rung-checker-defects/skeptic/` (`run.sh head|base walk|tc|comp P`).

2. Write the tests first, in `ProjectFortress/compiler_tests/`, each with one comment line citing its section by name:
   - **`XXXVarargsFunctionExpressionUse.fss` and `.test`.** The program is `SkVaFnExpr4`'s: a non-overloaded `total(g: Generator[\ZZ32\]): ZZ32` that iterates its argument, `f = fn (rest: ZZ32...): ZZ32 => total(rest)`, `println(f(z, z, z))`. The comment cites `functions.tex`, section "Function Declarations". The key is `compile_err_contains=The varargs parameter rest is used, whose type ImmutableArray[\\ZZ32,ZZ32\\] the libraries do not declare`.
   - **`XXXVarargsContractUse.fss` and `.test`.** A valid declaration whose `requires` clause passes its varargs parameter to a non-overloaded `nonempty(g: Generator[\ZZ32\]): Boolean = true`, and whose body does not use the parameter: `first(x: ZZ32, rest: ZZ32...): ZZ32 requires { nonempty(rest) } = x`. Same key.
   - **Rekey** `XXXVarargsBodyIterates.test` and `XXXVarargsParamNotItsElement.test` to the same wording: `...rest is used, whose type ImmutableArray[\\ZZ32,ZZ32\\]...` and `...[\\String,ZZ32\\]...`.

   Check under walk, in the base copy, that the two new programs run. Then run `ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh judge-before ProjectFortress/compiler_tests` with these four `.test` files on the current build. All four must fail: the new two with the exception or with an unmet key, the rekeyed two with "Saw failure, but did not satisfy". Quote their lines. Commit these four tests alone and push.

3. Make the edit.
   - In `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala`, in the `VarRef` rule (`:625-643`), right after `:627`: when `ty` is a trait type named as `Types.immutableHeapSeqName()` names it, and `toOption(traits.typeCons(Types.immutableHeapSeqName())).isEmpty`, do `signal(v, errorMsg("The varargs parameter ", checkedId, " is used, whose type ", ty, " the libraries do not declare."))` and `return expr`. Compare the name by its text and its API's text, not by AST equality.
   - Remove the declaration's guard (`impls/Decls.scala:210-219`) and its only helper, `mentions` (`impls/Decls.scala:51-63`). Leave `STypeEnv.scala:185-187` as it is.

4. Build the edit: `ant compileAll` through `run_bg`, then `git checkout -- default_repository/caches/global.map`, then the library order. Run `junit.sh` once on the four tests of step 2 and the rung's 19 earlier `.test` files; all must pass. Then run the skeptic's probes with `run.sh head tc`: `SkVaFnExpr2`, `SkVaFnExpr3`, `SkVaFnExpr4`, `SkVaContract`, `SkVaContract2`, `SkVaCounts`, `SkVaLocal`, `SkVaMethodBody`, `SkVaObject`. Each must print an error and no exception; quote one line each. Run one more probe of your own: a varargs function with no declared return type whose body iterates its parameter, called inside a `for` loop's body, under `fortress typecheck` on the head and in the base copy. If the head throws where the base copy gives an error, repair the guard before going on. If both throw the same way, that is row 621's mechanism, a thunk's swallowed error, and its two lines go in row 621's text. Commit the edit and push.

5. Give each of the skeptic's other measured defects a home-2 test: a compile test named by topic, one comment line, shown through `junit.sh` as an expected failure with its verdict line quoted.
   - **`XXXInheritedAbstractMethodBoundSameName`.** `SkBoundCapture2`'s program, `compile_err_contains=has no concrete implementation`, citing `traits.tex`, section "Method Declarations". Do not edit `domainApart` or `ownStaticParamsApart` (J2). Open a new row, provisionally 615 (row 625), as a checker defect. It quotes the two messages of `SKEPTIC.md` section 5, notes that walk prints `made` and that the control with the object's parameter named `Z` compiles. It names `AbstractMethodChecker.scala:141` and `OverloadingChecker.scala:200`, and the fix: rename the bounds of every own parameter by `subst`, in both helpers, in a checker rung that may edit the overloading checker.
   - **`XXXVarargsMethodCodeGeneration`.** `SkVaDotted`'s program, keyed on the most specific text the failing compile prints (`compile_exception_contains=OptionUnwrapException` unless the run prints something more specific), citing `functions.tex`, section "Function Applications". Row 624's text gains the method case: `NamingCzar.java:899` from `CodeGen.java:6826`, walk prints `abc`.
   - **`XXXLocalFunctionUntypedParamAndReturn`.** `SkLocalUntyped`'s program, keyed on "Result of typechecking still contains intermediate nodes" in the stream that carries it. Row 620's text gains it, with walk's `49`.
   - **`XXXTypecaseUndeclaredType`.** A `typecase` of a plain `Any` value with an arm naming `ImmutableArray[\ZZ32, ZZ32\]`, with no varargs parameter in the program so the guard of step 3 does not answer first, keyed on "Not in the trait table". It cites `declarations.tex`, section "Reach and Scope of Declarations" ("it is a static error for a reference to a name to occur where it is not in scope"). Also run an arm naming a type no library declares, and quote its output in a new row, provisionally 616 (row 626), a checker defect (crash), on base and head alike.

   Commit these tests and push.

6. Run the compiler and library tracks once, on the committed code of steps 3 to 5: `bash tmp/rung-checker-defects/tracks/run.sh`. This is the one whole-suite run the prefix allows the repair round. Quote the `OK` lines, the command and the commit. Do not run the checker count, the distance stage or the ladder subset again. Say in REPORT section 8 why: the guard's condition is false under the one library, the rung's `distance2` holds no guard message, and no ladder file has a varargs parameter.

7. Correct the text in the S1 form, changing nothing else. In `Specification/basic/functions.tex:192-194` and `Specification/appendices/changes.tex:2759-2760`, "refuses a body that uses a varargs parameter" becomes "refuses every use of a varargs parameter, in a body, a contract or a function expression, naming the type".

8. Write `REPORT.md` and `record.md` in `explorations/compile-ladder/rung-checker-defects/`, from the worker's `reportText` and `recordText`, with these corrections:
   1. The `problem:` line cites `XXXInferDependentBound.fss:20`.
   2. Section 3 says that `XXXVarargsBodyIterates` came with `eb9161c30`, keyed on a message the edit created, and never ran on the base's code; it also gives this round's test-first commit and run.
   3. Sections 2 and 4, decision 4 and the home table: the guard is at the use, with J1's candidates. The home table names the two new tests as home 1 for the crash. `XXXVarargsParamNotItsElement` holds the binding through the guard's condition, by reading (J1).
   4. Decision 9 is restated on the stop "A crash repaired by catching it without the error the text gives", with row 405 weighed. Rows 620-622 cite row 405, and the third crash form is quoted.
   5. The new rows 625 and 626 and row 624's method case go into record.md.
   6. A process note: the tracks and both stages ran on `eb9161c30` and `4d19d17a1`.
   7. "For Pavol" carries this judgement's items.
   8. The FACTS entry and row 604's note say "every use of a varargs parameter", with this round's sites.

   If the harness refuses either write, say so and carry the full text in the structured result. Commit and push with the prefix's footer.
