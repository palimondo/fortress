# Second judgement

*The row numbers are the final ones the gather of climb batch 10 assigned; the rung wrote provisional 610 to 616, which are rows 620 to 626.*

Judged head: `f300bf7e1fb20c1657bc2789c9170f98042b4b16` (wip/rung-checker-defects). The refused head was `4d19d17a1`, the judge's ruling is `8b1daf2f9` (`JUDGE.md`), and the repair round's commits are `76dda233a`, `d9434644f`, `08cd4b4d0` and `f300bf7e1`.

**Approved.** The repair answers the refusal. Every use of a varargs parameter under the compiled library is now refused in the `VarRef` rule with a message naming the type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:628-639`). That covers a declared body, a contract and a function expression alike, and none of them crashes now. The declaration's guard and its helper are gone from `impls/Decls.scala`. The two cases I measured are gated by `XXXVarargsFunctionExpressionUse` and `XXXVarargsContractUse`. Both were seen failing on the refused head's build with the trait-table exception, and both pass at the repaired code. Nothing I approved has moved: every program of my first judgement gives the same answer at this head, apart from the wording of the refusal's message.

## 1. The repair against the refusal

- **Test first.** The transcript is `agent-ac9591c66fcbf12d5.jsonl` (repair:C). The four tests were written at 09:12:14. At 09:12:37 they were run on the build of `4d19d17a1`'s code with `ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh repair-before ProjectFortress/compiler_tests XXXVarargsFunctionExpressionUse.test XXXVarargsContractUse.test XXXVarargsBodyIterates.test XXXVarargsParamNotItsElement.test`. The two new tests failed with `java.lang.RuntimeException: Not in the trait table: CompilerLibrary.ImmutableArray`, and the two rekeyed ones with ` Saw failure, but did not satisfy compile_err_contains`, giving `Tests run: 4,  Failures: 4,  Errors: 0`. They were committed alone at 09:13:03 (`76dda233a`). The source edit came at 09:13:39, and `ant compileAll` started at 09:13:44; `Misc.class` is dated 09:14:08. No source changed after that, so the build is the code of `d9434644f` and of this head.
- **The assertions pass.** `junit.sh repair-edit` ran on the 22 `.test` files of the rung (the first pass's 20 and the two new ones) and gave `OK (28 tests)`, with ` Saw expected failure` for each of `XXXVarargsFunctionExpressionUse`, `XXXVarargsContractUse`, `XXXVarargsBodyIterates` and `XXXVarargsParamNotItsElement` (`tmp/rung-checker-defects/junit/repair-edit.log`). At the refused head my own `SkVaFnExpr4` and `SkVaContract2` measured the crash (first judgement, section 2). At this head they give `The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.` The test of the contract case uses the valid form, `nonempty(g: Generator[\ZZ32\])`, as the judge ordered; my `SkVaContract2` was the invalid one, and both now get the message.
- **The body-type finding.** This was settled by the judge's J1, and I checked it by reading. The refusal's condition is the type that the binding gives (`STypeEnv.scala:184-186`). If the binding is reverted to the element type, `k(rest: String...): String = rest` type checks, so `XXXVarargsParamNotItsElement` would fail its key. The same reasoning holds for `XXXVarargsBodyIterates`.
- **The specification sentences.** `Specification/basic/functions.tex` (the revision box in "Function Declarations") and Appendix I's entry "The type of a varargs parameter" now say "refuses every use of a varargs parameter, in a body, a contract or a function expression, naming the type". My probes bear that out (section 2). The function-expression grammar takes a `ValParam` (`Specification/basic/expressions/function.tex`, section "Function Expressions"), which may carry a varargs binding, so the two new tests' programs are valid.
- **Home-2 tests for my other measured defects.** Each one was run through `junit.sh repair-home2` on `d9434644f`'s code, with `OK (4 tests)`, and in the base copy, also `OK (4 tests)`:
  - `XXXInheritedAbstractMethodBoundSameName`: row 625, ` Saw expected failure`.
  - `XXXVarargsMethodCodeGeneration`: row 624's method case, ` OK Saw expected exception`, `OptionUnwrapException`.
  - `XXXLocalFunctionUntypedParamAndReturn`: row 620, ` Saw expected failure`, `** bug! Result of typechecking still contains intermediate nodes.`
  - `XXXTypecaseUndeclaredType`: row 626, ` OK Saw expected exception`, `Not in the trait table: ImmutableArray`.

  Each file has one comment line, and each section it names says what the comment claims:
  - traits.tex, "Method Declarations".
  - functions.tex, "Function Applications", "Function Declarations" (a plain binding may omit its type) and "Local Function Declarations".
  - declarations.tex, "Reach and Scope of Declarations" ("it is a static error for a reference to a name to occur where it is not in scope").
- **Report and record corrections.** These are in the round's REPORT text (its refused write, which I read from the transcript) and in `record.md`:
  - The `problem:` line reads `XXXInferDependentBound.fss:20`.
  - Section 3 says that `XXXVarargsBodyIterates` came with `eb9161c30` and never ran on the base's code.
  - Decision 4 and the home table put the refusal at the use, with J1's candidates.
  - Decision 9 rests on the stop "A crash repaired by catching it without the error the text gives", and weighs row 405.
  - Rows 620-622 cite row 405, and row 620 quotes the third crash form.
  - Rows 625 and 626 and row 624's method case are written out.
  - A process note covers the doubled tracks and stages.
  - "For Pavol" carries the judge's items.
- **The one whole-suite run.** `bash tmp/rung-checker-defects/tracks3/run.sh` ran on `08cd4b4d0` (the code of `d9434644f`, 0 uncommitted), with `OK (1037 tests)` and `OK (86 tests)`. That is 1031 plus the six new tests. Not rerunning the stages is sound by reading. The condition needs the library's trait table to lack `ImmutableArray`, and the one library declares it (`Library/FortressLibrary.fsi:1548-1550`). `grep -c "do not declare"` finds no line in any file of `tmp/rung-checker-defects/distance2/`.

## 2. Differentials at the repaired head

I used one thread at bin/fortress's default, with `tmp/rung-checker-defects/skeptic/run.sh`. I reran every program of my first judgement at this head (`fortress typecheck`, and also `compile` and `run` for seven of them). New programs were run on head and base.

| program | walk | head (`f300bf7e1`) | base | verdict |
|---|---|---|---|---|
| `SkVaFnExpr4`, `SkVaFnExpr2`, `SkVaFnExpr3`, `SkVaContract`, `SkVaContract2`, `SkVaCounts`, `SkVaLocal`, `SkVaMethodBody` | (as first judgement) | each: "The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare." (`xs` in `SkVaMethodBody`), no exception | errors, as first judgement | refusal ground closed |
| `Sk2LoopBody`: `rest` used inside a `for` loop's body | `12` | the varargs message, no `TryChecker` crash | "not applicable to an argument of type ZZ32" | no crash |
| `Sk2Overloaded`: `h(rest)` with `h` overloaded on `ZZ32` and `Generator[\ZZ32\]` | `7` | the varargs message | "not applicable" | no crash |
| `Sk2Closure`: `rest` captured by a function expression in a declared body | `6` | the varargs message | "not applicable" | no crash |
| `Sk2ObjExpr`, `Sk2Spawn`: `rest` in an object expression's method, in `spawn` | `0`, `0` | the varargs message | "not applicable" | no crash |
| `Sk2Forms`: `\|rest\|`, `rest[0]`, `rest` returned, `g: Generator[\ZZ32\] = rest`, `typecase rest of`, `if`, a tuple, `while`, `also do` | — | 11 errors, each a varargs message or a consequent filter error | 9 errors | no crash |
| `Sk2Assign`: `rest := x` | — | the varargs message | "Cannot assign to immutable variable: rest" | refused either way; the use's refusal comes first |
| `SkVaUnused`, `SkVaFnExpr` (`rest` unused) | `3` | type checks | refused zero trailing / — | unchanged from approval |
| `SkVaUnused3` (fresh name, compiled) | — | "Can't compile VarArgs yet" | "not applicable" | row 624, as before |
| `SkVaWrong2`, `SkVaOverload2`, `SkVarianceVa`/`Vb` | — | 7 errors; same "multiple declarations"; both covariance errors | as first judgement | unchanged |
| `SkDepBound` (compiled) | — | `BoxU[ZZ32]`, `BoxU[ZZ32]`, `BoxU[String]`, `BoxU[ZZ32]` | as first judgement | unchanged |
| `SkFieldGetter`, `SkMapperCapture`, `SkBoundCaptureCtl2` (compiled) | — | `4` `4` `field   field` `101`; `n 20`; `made` | as first judgement | unchanged |
| `SkDupSelfThird`, `SkObjExprGenericOk`/`Bad`, `SkAbsWrong` | — | `(N1, N2)` / `(N1, N2, B)`; type checks / two clause errors; three errors | as first judgement | unchanged |
| `SkBoundCapture2`, `SkVaDotted`, `SkLocalUntyped`, `SkTopUntyped`, `SkVaWalkType` | — | as first judgement | as first judgement | now home 2 (rows 625, 624, 620, 405, 626) |

## 3. Corrections

1. In the REPORT text, section 9, `compiler/disambiguator/TypeDisambiguator.java:375-378` should read `:376-380`, the lines that suppress "is undefined" inside a typecase clause. `record.md` row 626 already says `:376-380`.
2. The varargs binding is at `staticenv/STypeEnv.scala:184-186`, the case line, the comment and the binding. The REPORT text, `record.md` row 604's note and the repair's `filesChanged` cite `:185-187` or `:185-186`. The judge and my first judgement cited it the same way.

No stop of the batch record's intro is met. The refusal of valid varargs programs under the compiled library falls within row 604, which is the rung's own row, and the judge has carried it to Pavol.

---

# Rung C, first judgement: refused

Judged head: `4d19d17a1f4227128a9e2287a006e2ce2f4d19f6` (wip/rung-checker-defects), base `9c9e823d5`.

**Refused for one thing.** The change makes the compiled checker crash on valid and invalid programs that the base answered with an error. It binds a varargs parameter to `ImmutableArray[\T, ZZ32\]` of the library in use (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala:185-187`). The compiled library declares no such type, and the guard that refuses a use of the parameter instead covers only a declared function's body (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:210-219`). So a function expression whose body uses its varargs parameter, or a contract that names one, reaches the trait table with the undeclared type, and the checker throws `RuntimeException: Not in the trait table: CompilerLibrary.ImmutableArray`, the first build's crash that decision 4 says the guard removes. The batch record's decisions for this rung say "A crash is never the checker's answer: a construct the text allows is checked, and one it refuses is an error with a message" (`explorations/coordinator/CLIMB-BATCH-10.md:144`). The repair must give every place where a varargs parameter is bound (a declared function's body, a function expression's body, a contract) the refusal with its message, or no binding to an undeclared type. Each of the two missed cases needs a gated assertion (home 1).

## 1. Test first, read in the transcript

The transcript is `agent-a17102eab231ad505.jsonl`, label rung:C.

- The 16 first tests were run on the base build at 05:43:56 (call `8nuUJJ`, `ONE_JVM=1 bash .../merged-tests/junit.sh base ProjectFortress/compiler_tests <16 files>`). The run ended at 05:44:12 with `Tests run: 20,  Failures: 15,  Errors: 0` (`tmp/rung-checker-defects/junit/base.log:151`). They were committed alone at 05:44:20 as `4d8cc0c7a` (call `ygmycg`; only `compiler_tests/` files changed), and the first source edit came at 05:44:49 (`AfVqWX`). This holds.
- `VarargsNumeralArguments` (`3d8d76292`, alone) was seen failing on the build without the coercion edit before that edit. `VarargsExportMethod` (`a60dde51f`, alone) was seen failing in the base copy (`export-base.log`) and before the export edit. This holds.
- `InheritedAbstractOperatorTraitParamSameName` was found by a probe after the edit (`eb9161c30`). It was seen failing in the base copy at 06:15:37 (`lifted-base.log`: `Tests run: 3,  Failures: 3`) and committed after the fix, together with the specification text (`553a58f05`). The order is inverted because of how the test was found; the failure on the base's code was recorded.
- **`XXXVarargsBodyIterates` was added in the edit commit `eb9161c30` and never run on the base's code.** Its key names a message that exists only after the edit, so it is an expected failure of a state the edit created. REPORT.md section 3 does not say this. (Finding, not the ground of the refusal.)
- The last passing run is `edit3` at 06:47:47 (call `vyXGTh`), on the build of `compileAll-4`, which holds the export edit, and before the commit of that same code (`4d19d17a1`, 06:48:20): `OK (26 tests)`. The tracks ran on `4d19d17a1` with 0 uncommitted files: `OK (1031 tests)` and `OK (86 tests)` (`tmp/rung-checker-defects/tracks2/tracks.log`). The recorded runs are of the head.

## 2. The ground: the varargs binding crashes the checker outside a declared body

These probes are in `tmp/rung-checker-defects/skeptic/`. `run.sh head|base walk|tc|comp P` runs a probe with the rung's build, or with the base copy `/home/user/fortress-checkdefects-base`.

`SkVaFnExpr4` is valid: `total(g: Generator[\ZZ32\])` iterates its argument, and `f = fn (rest: ZZ32...): ZZ32 => total(rest)` calls it, `f(z, z, z)`.

    walk (head and base):  6
    head  fortress typecheck:  Exception in thread "main" java.lang.RuntimeException: Not in the trait table: CompilerLibrary.ImmutableArray
    base  fortress typecheck:  - Generator[\ZZ32\]->ZZ32 is not applicable to an argument of type ZZ32.

`SkVaContract2` passes the parameter to a function of `ZZ32` in a contract: `first(x: ZZ32, rest: ZZ32...): ZZ32 requires { ok(rest) } = x`, with `ok(x: ZZ32): Boolean`.

    head  fortress typecheck:  Exception in thread "main" java.lang.RuntimeException: Not in the trait table: CompilerLibrary.ImmutableArray
    base  fortress typecheck:  - (ZZ32, (ZZ32...))->ZZ32 is not applicable to an argument of type (ZZ32, ZZ32, ZZ32).

`SkVaFnExpr2` is invalid: it returns `ok(rest)` from a varargs function expression. Walk refuses it at run time, "got arg PrimImmutableArray[\ZZ32,2\]". The base checker accepted it silently, and the head crashes the same way. Where a use does not reach a subtype test against a declared trait, no crash occurs but the message is not the guard's. `SkVaFnExpr3` gets `No such method ImmutableArray[\ZZ32,ZZ32\].loop.`, and `SkVaContract` gets `ImmutableArray[\ZZ32,ZZ32\] has no getter called size`. A declared function's body, a local function and a method all get the guard's message (`SkVaCounts`, `SkVaLocal`, `SkVaMethodBody`).

The guard tests `mentions(body, p.getName)` in the `SFnDecl` case with a body only (`impls/Decls.scala:210-219`). The contract is checked by `newChecker` after the guard, and a function expression's parameters are bound by the `FnExpr` rule, which has no guard. The base gave each of these programs an error and no crash. The rung turns an error into a crash, the reverse of a loud-to-quiet change, and it does so in the very path decision 4 says it closed.

## 3. The tests against what they claim

- **The body's type has no assertion that tests it.** `XXXVarargsParamNotItsElement` is listed as home 1 for "the body typed the parameter as its element". After the rekey it asserts the guard's message, and the guard builds that message from `Types.makeVarargsParamType` (`impls/Decls.scala:214`), not from the binding. The test passes with `STypeEnv.scala:185-187` reverted. Under the compiled library the binding is visible only in the unguarded paths of section 2, and under the one library only in the distance's sites. The repair round should either give the binding an assertion that fails without it, or correct the home table to say that the binding is shown by the distance's sites (`Library/Stream.fss:70-71`, `Library/List.fss:176`, `Library/FortressLibrary.fss:306`, `:316`) and by no compiled test while the compiled library lacks the type.
- The others exercise what they name. My own programs bear them out (section 4). Each file has one comment line, and every section named in a message or comment exists and says what is claimed: traits.tex "Method Declarations" (:361) and "Trait Declarations" (:31), objects.tex "Field Declarations" (:238), inference.tex "The Static Arguments of a Call", overloading.tex "Applicability for Functionals with Varargs and Keyword Parameters" (:246).

## 4. Differentials of my own

One thread, at bin/fortress's default. No probe or change touches mutable state shared across threads.

| program | walk | head | base | verdict |
|---|---|---|---|---|
| `SkVaCounts`: `tally(x, rest: ZZ32...)` iterates `rest`; calls with 0, 1, 6 trailing | `1` `2` `7` | refused, "The body uses the varargs parameter rest, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare." | "No such method ZZ32.loop." | specification for walk (functions.tex, "Function Declarations"); compiled library lacks the type, home 2 (`XXXVarargsBodyIterates`) |
| `SkVaUnused`: same calls, body ignores `rest` | `3` | type checks | "Could not check call to function pick" (0 trailing) | repaired |
| `SkVaWrong2`: seven ill-typed varargs calls, one per function | — | 7 errors | 7 errors, same lines | no over-acceptance |
| `SkVaWalkType`: `typecase` on `rest` for 0, 1, 6 arguments | `ImmutableArray[ZZ32,ZZ32]` three times | (checker crash, pre-existing: `typecase` on a type the compiled library does not declare) | same | the box's claim about walk holds |
| `SkVaDotted`: `T.tag("a")`, `T.tag("b", z)`, `T.tag("c", z×6)` for `tag(x: String, rest: ZZ32...)` in a trait | `abc` | type checks; **code generation crashes**, `OptionUnwrapException` at `NamingCzar.jvmSignatureFor(NamingCzar.java:899)` from `CodeGen.dumpTraitMethodSigs(CodeGen.java:6826)` | checker crash (`OptionUnwrapException`, the dotted-call crash) | specification for walk; row 624's wall for methods is a crash, not "Can't compile VarArgs yet" (section 6) |
| `SkVaSingleCg`: lone varargs, 0/1/6 args | `6` | "Can't compile VarArgs yet" | same | row 624 |
| `SkVaOverload2`: `f(x: ZZ32)` beside `f(rest: ZZ32...)` | refused at load ("ambiguity in overlapping rest (...) parameters") | "multiple declarations of f with the same parameter type: ZZ32" | same | overloading verdict unchanged |
| `SkVarianceVa`/`Vb`: covariant `T` in `take(xs: T...)` / `take(x: T)` | — | both refused, "covariant but appears in a contravariant position" | `OptionUnwrapException` / refused | crash 4 repaired, varargs read as a plain parameter |
| `SkDepBound`: `depU(z)`, `twoS("a","b")` (S unbounded, `U extends BoxU[\S\]`), `lastS(z)` (dependent parameter first) | `other` ×3 (walk's run-time `Int`, row 593's note) | `BoxU[ZZ32]`, `BoxU[String]`, `BoxU[ZZ32]` | `twoS` refused, "not applicable to an argument of type (String, String)" | inference.tex for head; row 593 repaired, and with it an unbounded sibling |
| `SkFieldGetter`: field `size` beside inherited getter, `self.size`, a field `tag` beside getter `tag`, a `var` field | `4` `4` `field field` `101` | `4` `4` `field   field` `101` | refused (`+` on `()->ZZ32`) | objects.tex for both; the spacing is row 76 |
| `SkDupSelfThird`: self third, self first, plain | — | `(N1, N2)` / `(N1, N2, B)`, `(B, N1)` / `(N1)`, `(N1)` | `(N2, B)` for the self-third trait message | row 574 repaired |
| `SkObjExprGenericOk`: `object extends L[\Y\]` in a generic trait's method, in a generic function, at top level | `LL` | type checks | type checks | correct |
| `SkObjExprGenericBad`: `object extends K[\Y\]` / `K[\String\]` below `K[\X\] comprises { L[\X\] }` | `unreached` | two "Invalid comprises clause" errors | accepted | traits.tex "Trait Declarations" for head; walk's half is row 597's home 2 |
| `SkMapperCapture`: `object Box[\R\]` implements `map[\R\]` as `map[\S\]` | `n20` | `n 20` | refused, "has no concrete implementation" | row 563 repaired; spacing is row 76 |
| `SkAbsWrong`: wrong parameter types for `+` and `gen` | `unreached` | both refused | both refused | no over-acceptance |
| `SkBoundCapture2`: `gen[\R, Q extends Box[\R\]\]` implemented by `object P[\R\]` as `gen[\G, H extends Box[\G\]\]` | `made` | refused twice (below) | refused twice, same | **row 563's sibling, unrepaired** (section 5) |
| `SkBoundCaptureCtl2`: same with the object's parameter named `Z` | `made` | `made` | `made` | control |
| `SkLocalUntyped`: local `sq(n) = n n` | `49` | `** bug! Result of typechecking still contains intermediate nodes.` | same | a third crash form of crashes 1-3's cause (section 6) |
| `SkTopUntyped`: top-level `sq(n) = n n` | `49` | "Missing parameter type for n" | same | row 405 |

## 5. Row 563's renaming leaves a bound captured

`domainApart` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:125-143`) renames a clashing parameter, but it alpha-renames only that parameter's own bounds (`:138-140`). A non-clashing parameter whose bound mentions the renamed one keeps the old name (`case None => p`, `:141`), so the bound now names the object's parameter. It copies rung O's `ownStaticParamsApart` (`OverloadingChecker.scala:196-200`), which has the same omission. `fortress compile SkBoundCapture2.fss` gives the same output on head and base:

    Invalid overloading of gen in trait P:
     [\G extends Object, H extends Box[\G\]\](P[\R\], P[\R\]->G, H)->G @ ...SkBoundCapture2.fss:9:5-67
     and [\R$1 extends Object, Q extends Box[\R\]\](Gen[\P[\R\]\], P[\R\]->R$1, Q)->R$1 @ ...SkBoundCapture2.fss:6:5-7:1
    The inherited abstract method gen[\R extends Object,Q extends Box[\R\]\](f:E->R,q:Q):R from the trait Gen[\P[\R\]\]
        has no concrete implementation in the object P in component SkBoundCapture2.

The head's abstract-method trace prints `This domain: (P[\R\]->R$1, Q)`, with `Q` still bounded by `Box[\R\]`. The control `SkBoundCaptureCtl2` passes on both. Repairing `domainApart` alone does not make the program pass, because the overloading checker's half sits in a file this rung may edit only for row 574's message. So the program is owed a home-2 test with a row naming both sites. Renaming every own parameter's bounds in `domainApart` is a one-line repair the repair round may make while it is in that code.

## 6. Other findings

1. The provenance block's `problem:` cites `XXXInferDependentBound.fss:19` at `9c9e823d5`. That line is the `idS` assertion, which passed on the base. The failing `depS` assertion is `:20`.
2. A method with a varargs parameter now reaches code generation and crashes there (`SkVaDotted`): `OptionUnwrapException` at `NamingCzar.java:899`, which unwraps `p.getIdType()` for each parameter, from `CodeGen.dumpTraitMethodSigs` (`CodeGen.java:6826`). On the base the checker's dotted-call crash came first. Row 624's text and its test (`XXXVarargsCodeGeneration`, a top-level function) name only "Can't compile VarArgs yet". The method case is owed a home-2 test or at least a quoted line in row 624.
3. Crashes 1-3 and row 405. Row 405 (`explorations/fortress-gap-ledger.md:416`) records that the compiled path already refuses an untyped value parameter of a top-level function or a method with "Missing parameter type for x" (`SkTopUntyped`), and it classes the specification as silent on the inference. Decision 9 says that giving a local function that refusal would "refuse a program the text allows", but the compiled path already does so for every other untyped parameter. The report does not cite row 405. Rows 620-622 should cite it, and decision 9 should weigh it. A third crash form of the same cause, "Result of typechecking still contains intermediate nodes" (`SkLocalUntyped`), belongs in the row's text. Row 176 (`fortress-gap-ledger.md:148`) records that microGPT's own source declares untyped parameters at top level and locally, so this cause stands on the compiled path's way to the measuring stick.
4. The stages and the tracks each ran twice: the count on `eb9161c30` and `4d19d17a1` (`count/`, `count2/`), the distance likewise (`distance/`, `distance2/`), and the tracks likewise (`tracks/`, `tracks2/`). Each pair ran on two code states, so no code was run twice, but the shared prefix asks for the after once and the tracks once after the last edit. This is a process note only.
5. The count table (`tmp/rung-checker-defects/count2/checker-count.txt`) gives `#total 1`, and the distance table (`distance2/distance.txt`) gives `#total 326`. Both match REPORT.md and the structured result.
6. The precedent search counted row 604's arrow-builder sites (two wrong, one right) and row 605's two sites. It did not see that rung O's helper, the precedent for row 563, carries the bound omission of section 5.
7. Competing declarations: none. `immutableHeapSeqName`, `domainApart`, `checkObjectExprComprises` and `mentions` are defined once in `src/com/sun/fortress/`, and no test name repeats across `tests/`, `compiler_tests/` and `library_tests/`.
8. Decisions on record. Row 593's solver change takes a bound-only parameter's bound at the other parameters' solutions and never `BottomType`, which is POSITIONS "A type parameter the arguments do not fix takes its bound, never `Bottom`". The solver path (`toBounds`) is not the overloading checker's: `TypeSchemaAnalyzer` calls `inferStaticParamsHelper` with `toBounds` false (`types/TypeSchemaAnalyzer.scala:141`, `:194`). Row 597's check through an unlisted generic trait (decision 8) follows traits.tex's own clause, "every trait or object that extends it is a subtype of a listed type" (`Specification/basic/traits.tex:245-248`), and the 2012 reading of POSITIONS "`AnyIntegral`'s closure ...". The varargs box keeps `HeapSequence` with the team's type beside it, as POSITIONS "The type group's late positions outweigh the early text" (23 September 2026, as the entry dates it) allows. The overloading checker builds its arrows from `paramsToType` (`OverloadingChecker.scala:123`, `:146`, `:175`), and its verdict on a varargs family is unchanged (`SkVaOverload2`). `makeArrowFromFunctional`'s new shape reaches `OverloadingOracle.lteq(f, g)` only through the export checker's `coverOverloading` (`OverloadingChecker.scala:715-739`) and the coercion oracle (`CoercionOracle.scala:84`).
9. Text that the repair must keep true. The functions.tex box says "there the compiled type checker refuses a body that uses a varargs parameter" (`Specification/basic/functions.tex:192-193`), and the new Appendix I entry's Effect says the same (`Specification/appendices/changes.tex:2758-2759`). Both are false at this head for a function expression and a contract (section 2).

## 7. What the repair round must close

1. The refusal's ground (section 2), with home-1 assertions for a function expression and a contract that use a varargs parameter.
2. The body-type home entry (section 3): either an assertion that fails without the binding, or an honest home table.
3. Row 563's bound sibling (section 5): a home-2 test and a row naming `AbstractMethodChecker.scala:141` and `OverloadingChecker.scala:200`, with `domainApart` repaired if the round chooses to.
4. The corrections of section 6, items 1-3. REPORT.md section 3 should also say that `XXXVarargsBodyIterates` was added with the edit (section 1).
