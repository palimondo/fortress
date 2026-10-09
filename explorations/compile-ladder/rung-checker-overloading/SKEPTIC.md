# Skeptic of rung C of climb batch 11 (rung-checker-overloading)

Judged: the worker's head `307c1ab69` on `wip/rung-checker-overloading`, from the base `83b1cae78`. My commits: `ff153e41b` (the worker's REPORT.md from the run's journal; record.md was already on the branch), `79cf821d9` (fix, settled), `15a4be724` (fix, contested), `9a5469a6c` (corrections), and this file.

Verdict: **contested**. The rung is right with my fixes; one of them (`15a4be724`) is contested, because it reaches a point to report.

The count and distance tables in REPORT.md section 7 are those of the worker's head. No count or distance stage ran after my fixes. The gate's tables on the merged tree are the record.

## 1. What I checked, and what held

- **The tables.** I read the worker's files. `diff explorations/compile-ladder/climb-batch-10/gate/checker-count.txt <worker's checker-count-postedit>` prints nothing, so the count stays 1. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-10/gate/distance.txt <worker's distance-postedit>` prints `DISTANCE SAME   253`, with `class X1 4 -> 3 (-1)`, `class BR 3 -> 4 (+1)` and the three `crash new ... TypeError ... Missing parameter type for i` lines REPORT section 7 quotes. The tables are as the report declares them.
- **Test first**, read in the worker's transcript:
  - The failing run is call `KUQquk` at 23:47:26 (`junit.sh base`, `Tests run: 17,  Failures: 15`, with the lines recordedFailure quotes). The first code edit is call `yz7Lsa` at 23:51:41, and the first build started at 23:55:14 (`TV6yFX`).
  - The tests changed later were seen failing on the old code through the harness: `wmwJs6` at 00:00, `Tests run: 7,  Failures: 7`; `rKmKKc` at 00:05, `Tests run: 2,  Failures: 2`; `9nz9jD` at 00:24:55, `Saw wrong failure`.
  - The last code edits are `nwxEJU` and `H8F6dx` (00:21:56 to 00:22:04). The build `Ze12D5` started at 00:22:27, and the passing run `EmV2K3` at 00:24:34 printed `OK (24 tests)`. `ant testQuick` printed `Tests run: 1055, Failures: 0` and `BUILD SUCCESSFUL`, and `ant testSystem` passed 516 tests, both on that code state.
  - The order holds.
- **The diff, line by line**, against traits.tex "Method Declarations", overloading.tex "Meet Rule" and "Principles of Overloading", type-inference.tex and the ledger rows the slice printed.
  - `providedAndOverridden` reads the chapter's inheritance (`Specification/basic/traits.tex:521-529`, `:585-595`), walking the extends clauses.
  - The row 617, 619, 625, 637 and Q4 edits are as small as their tests need.
  - The row 626 edit is right but incomplete (finding 2).
  - The widening-override return check has a hole (finding 1).
- **Precedents.** Walk's `providedBy`, the team's `alphaRenameTypeSchema` and the top-level refusal are the right precedents. One citation was wrong (finding 5).
  - The library's way to check a return type over generic declarations is the Return Type Rule over every instance: `OverloadingOracle.satisfiesReturnTypeRule` and `TypeSchemaAnalyzer.subtypeUA` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:92-146`).
  - The worker's check used only the compiled positional restriction (`OverloadingOracle.scala:161-175`). That restriction answers true when the two declarations do not declare equally many static parameters of their own.
- **The tests.**
  - Each test exercises its defect, carries one comment line and names its file and section, never a line. I checked every cited section heading by grep: traits.tex:361, source-code.tex:288, declarations.tex:408, if.tex:12, while.tex:12, method-invocation.tex:12, trait-parameters.tex:36, functions.tex:42 and :205.
  - Refusals kept under `XXX` names: a plain compiled test whose compile fails is red whatever its keys (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:416-425`), so the worker's deviation is forced.
- **Competing declarations.** `providedMethods`, `providedAndOverridden`, `paramsWithoutSelf` and `checkOverridingReturnType` occur only at their declarations and calls under `ProjectFortress/src/com/sun/fortress/`. No new test name has a competing declaration in the test corpora, `Library/` or `LibraryBuiltin/`.
- **The provenance lines.** I opened each cited line with `sed -n`. All say what they claim, except the precedent's `OverloadingChecker.scala:614-627 at 83b1cae78`. At the base, lines 614-627 are `coverageRule` and the head of `returnTypeCheck`. meetRule's `withoutSelf` is at `:587-589` and `:598-605` (finding 5).
- **The whole-suite run** the skill asks of a checker edit and a shared phase: the worker's `ant testQuick` and `ant testSystem` on `68694006c`, whose code the later commits do not change.
- **Threads.** No Fortress program of the diff runs mutable state on either path that the diff changes. The two tests with `:=` (`XXXWhileGeneratorClause`, `XXXLocalFunctionUntypedParamInLoop`) are compiled refusals, and the loop is `seq`. My probes ran at `FORTRESS_THREADS=1`, and the harness and suites at 4.

## 2. Findings, each with the output it rests on

Commands: walk is `old-fortress.sh <tree> <private caches> P.fss`, and the compiled path is `... compile P.fss` then `... run P`. The tree is `/home/user/fortress-base11` for old and `/home/user/fortress-checkover` for new. The programs are written out below because they are not kept.

1. **A widening override with static parameters of its own on one side only had its return type checked by nothing** (fixed, `79cf821d9`).
   - `trait A f[\T\](x: T): T = x end`, `object B extends A override f(x: Any): ZZ32 = 1 end`:
     - old compile: `Invalid overloading of f in trait B: (B, Any)->ZZ32 ... and [\T extends Object\](A, T)->T`
     - new compile: `Don't know how to compile this kind of FnDecl. node = f(x:Any):ZZ32`. The checker accepted it.
   - The mirror case, `f(x: ZZ32): ZZ32 = 1` overridden by `override f[\T\](x: T): String = "B"`:
     - old compile: `Invalid overloading of f in trait B`
     - new compile: the same code-generator stop.
   - `a: A = B; a.f[\String\]("s")` is typed `String` and would run `B`'s `f`, which returns `1`. traits.tex:590-591 refuses both programs. The rung turned two refusals into acceptances of ill-typed programs. This was the failure-mode question's one quiet value.
2. **The body of a typecase clause was disambiguated as if it were the clause's type** (fixed, `15a4be724`, contested). `TypeDisambiguator.forTypecaseClause` cleared `forTypecaseClause` only after recursing into the body. So an undeclared bare type name there was let through as a candidate binding (`TypeDisambiguator.java:247-249` on the worker's head). It is the same mechanism as row 626, at the sibling site in the file the rung edits.
   - With `kind(x: Any): ZZ32 = typecase x of ZZ32 => do y: Nonesuch = x; 1 end else => 0 end`:
     - old and worker's compile: `CompilerBuiltin.fsi:210:7-9: Nonesuch is not in the kind env [][][]`, a wrong span and a checker-internal message
     - old and worker's walk: `ProgramError ... Missing type Nonesuch`, at run time
   - Outside a typecase, the name is refused with `Nonesuch is undefined.`
   - The rung's own edit already repaired the applied form in a body. `Nonesuch[\ZZ32\]` gave `Not in the trait table: Nonesuch` on the old compile and now gives `Nonesuch is undefined.` on both paths.
3. **A changed verdict the report does not list**: an object below a trait that re-declares abstract an inherited method's parameter types is now refused. I pinned it in `9a5469a6c`.
   - `trait A f(x: ZZ32): ZZ32 = 1 end; trait B extends A f(x: ZZ32): ZZ32 end; object O extends B end`:
     - old compile and run: `1`
     - new compile: `The inherited abstract method f(x:ZZ32):ZZ32 from the trait B has no concrete implementation in the object O`. The same holds for the functional twin.
     - walk, old and new: `InterpreterBug ... MethodClosure f(x:FortressLibrary.ZZ32) ... has neither body nor def instanceof Method`
   - By traits.tex:521-529 and :571-572, `B` does not inherit `A`'s `f` and `O` inherits an abstract method it must define. The new refusal is the text's answer, and decision 4 of REPORT.md produces it. Walk's stop is row 572's mechanism (row 100), now noted on row 572.
4. **An `override` that overrides nothing is accepted on both paths.** It is older than the rung, and I recorded it as row NEW-C-4 in record.md.
   - `trait A f(x: ZZ32): String = "A" end; object B extends A override f(x: String): String = "B" end`:
     - walk, old and new: `B`
     - `typecheck`, new: exit 0
     - compile, old and new: the code-generator stop (NEW-C-1)
   - traits.tex:594-595 makes it a static error.
   - Home: no compiled expected failure can be green while it shows, since NEW-C-1 stops it first. Its walk expected failure, a refusal at load, belongs in `ProjectFortress/tests/`, which is not this rung's folder. So it is a row with `none` as its reproducer.
5. **REPORT.md cited meetRule's `withoutSelf` at the wrong lines**, `:614-627 at 83b1cae78`, in the precedent line and in section 3. I corrected both to `:587-589` and `:598-605` in `9a5469a6c`.
6. **Row 615's open question is now answered alike on both paths.**
   - REPORT decision 2 says `XXXOverrideInheritedThroughOtherSupertype` "pins the chapter's answer". The record holds that reading open: row 615 says "Open: whether the section's 'overridden', with no owner named, excludes a declaration inherited by another path; for the curator" (`explorations/fortress-gap-ledger.md:350`).
   - With row 615's `Dio` program:
     - old compile: `Invalid overloading of tag in trait Dio` and `... in trait W`, `has 2 errors`
     - new compile: `Invalid overloading of tag in trait Dio`, `has 1 error`
     - walk: `Invalid overloading of tag in Dio`
   - The rung makes the compiled path agree with walk's reading. That is reversible, and no decision on record opposes it. I noted it on row 615 and list it for the curator. I do not edit the worker's decision.
7. **Row 617's repair reaches row 571.** The covering program of `FunctionalMethodMeetCoverWithoutSelf` with self second (`mark(x: A, self)` and so on):
   - old compile: `Invalid overloading of mark in trait Pq`
   - new compile: accepted; the run stops with `ClassFormatError: Duplicate method name "mark?1" with signature "(LSkCoverSelf2$B;)..."`
   - walk: `PASS`
   - Row 571 is that defect, with its expected failure `XXXFunctionalMethodMeetNarrowedSelfNotFirst`. I noted the new route to it on row 571.
   - The negative twin still holds. A provider that covers only `X1` is still refused on the new code, `Invalid overloading of mark in trait Pq`, and walk refuses it at load.
8. **Checked and found right.**
   - A getter and a dotted method overridden with a narrower return type at equal parameter types run as before on both paths, printing `PASS` twice.
   - An equal-parameter override with a wrong return type is refused as before, with `the return type of (B, ZZ32)->String ... should be a subtype of`, for a dotted and a functional method alike.
   - Valid generic widening overrides type check on the worker's code and on mine:
     - `f(x: ZZ32): Any` overridden by `f[\T\](x: T): T`
     - `g[\T extends Number\](x: T): T` overridden by `g[\U\](x: U): U`
     - a functional `h` likewise
   - A declared generic arm `Box[\ZZ32\]` still runs under walk (`PASS`). Compiled, it stops at row 340, as on the base.
   - An untyped local function never called was already refused on the base (`Missing parameter type for n`).
   - A local function in an object expression's method:
     - old: `Result of typechecking still contains intermediate nodes`
     - new: `Missing parameter type for n`
   - An untyped function expression with no expected type: `Could not determine all parameter types of function expression.`, old and new.

## 3. Fixes

### `79cf821d9`: an override's return type at every instance (defect, settled)

- **Fix.** `checkOverridingReturnType` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:656-691`) now checks, when either declaration has static parameters of its own, that the overriding arrow is below the overridden one at every instance: `oracle.sa.subtypeUA` over the two arrows without self. It keeps the worker's positional restriction beside it. Declarations without static parameters are checked as the worker checked them.
- **Settled by** `Specification/basic/traits.tex:590-591`: "The return type of the overriding declaration must be subtype of that of the overridden declaration to preserve type safety." The revision box at `Specification/advanced/overloading.tex:613-614` reads the compiled Return Type Rule "over every instance of the less specific declaration". The worker's own REPORT.md:29 says the widening override's return type is checked against the overridden one's.
- **Test**: `XXXOverrideGenericReturnTypeNotSubtype` (`typecheck`, both directions, `has 2 errors`).
  - Red on the worker's head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests XXXOverrideGenericReturnTypeNotSubtype.test ...` (02:06:58Z, tree `ff153e41b`, whose code is the worker's):
    ```
     Saw failure, but did not satisfy typecheck_err_matches; expected
    1) .../XXXOverrideGenericReturnTypeNotSubtype(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. typecheck
    ```
  - Red on the base, `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base11 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.test ...` (02:07:17Z): `Invalid overloading of f in trait B`, `Saw wrong failure. typecheck`.
  - Green after the build, `junit.sh skfix` (02:11:34Z): `File XXXOverrideGenericReturnTypeNotSubtype.fss has 2 errors.`, `Saw expected failure`, `OK (28 tests)`.

### `15a4be724`: a typecase clause's body disambiguated as other code (defect, contested)

- **Fix.** `TypeDisambiguator.forTypecaseClause` (`ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:247-250`) clears `forTypecaseClause` and `rewriteTypecaseClause` before it recurses into the clause's body, not after. The binding form is read only in the clause's type, which is processed first.
- **Test**: `XXXTypecaseBodyUndeclaredType` (`compile`, `compile_err_contains=Nonesuch is undefined.`).
  - Red on the worker's head (`junit.sh skhead`):
    ```
    ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210:7-9:
    Nonesuch is not in the kind env [][][]
     Saw failure, but did not satisfy compile_err_contains; expected
    ```
  - Red on the base the same way.
  - Green after the build (`junit.sh skfix`): `XXXTypecaseBodyUndeclaredType.fss:7:12-18: Nonesuch is undefined.`, `Saw expected failure`.
- **Walk**: refused at load, `SkTypecaseBody.fss:4:19-25: Nonesuch is undefined.`, where it failed at run time.

### `9a5469a6c`: corrections

- The test `XXXReabstractedMethodNotImplemented` (finding 3), `compile_err_matches` on the refusal and `has 2 errors`.
  - Red on the base (`old-fortress.sh ... junit`, 02:07:17Z): `Saw failure, but did not satisfy compile_err_matches`, `Saw wrong failure. compile`.
  - Green on the worker's head (`junit.sh skhead`, `Saw expected failure`) and after my build.
- record.md:
  - the FACTS entry extended by the three behaviours above
  - ledger notes on rows 615, 572, 571 and 626 (626's in `15a4be724`)
  - row NEW-C-4
- REPORT.md's two citations (finding 5).

### The whole suites, after my last code edit

One build: `ant compileAll` and the library order, `BUILD SUCCESSFUL`, five jars. The code state is that of `79cf821d9` plus `15a4be724`, and the head `9a5469a6c` changes no code. Both suites ran on it:

```
ant testQuick      (02:11-02:19, BUILD SUCCESSFUL, Total time: 7 minutes 48 seconds)
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 1058, Failures: 0, Errors: 0, Skipped: 0
ant testSystem     (02:19-02:22, BUILD SUCCESSFUL, Total time: 2 minutes 26 seconds)
    [junit] Tests run: 131 / 128 / 131 / 126, Failures: 0, Errors: 0
```

The compiler track grew by my three tests, from 1055 to 1058.

## 4. The contested fix, both arguments

`15a4be724`, the typecase clause's body.

- **The worker's argument.** REPORT.md, decision 8: "refuse every undeclared name in a typecase clause, which would end the bare-name binding form (`TypeDisambiguator.java:233-237`); refuse an applied name only (taken)". Section 1 says the error is now suppressed "only for a bare name". The worker scoped the repair to the clause's type and did not consider the body.
- **Mine.**
  - The binding form exists only in the clause's type (`TypeDisambiguator.java:234-246`: the bare-name rewrite and the tuple-of-patterns rewrite both read `matchType_result`). The flag stayed set through the body only because it was cleared after `recur(that.getBody())`. A bare undeclared type name in the body is taken by no binding rewrite, so it is "an undeclared name in a typecase arm that the binding rewrite does not take", which is row 626's stated fix (`explorations/fortress-gap-ledger.md:605`). declarations.tex:416-418 makes it a static error.
  - The fix keeps every binding form: `ant testQuick` and `ant testSystem` pass, and a typecase with a tuple pattern binding and one with a bare-name binding still run under walk (`PASS`, old and new).
  - It is contested only because it reaches the rung's point "A library or walk edit" in the same way the worker's own row 626 edit did. Through the shared disambiguator, walk now refuses such a program at load where it failed at run time.

## 5. Points to report

As the rung stands with my fixes:

- **A compiled test whose verdict changes other than by the rung's intent.**
  - `XXXNatRetSizeChecker` and `XXXOverloadPermutedStaticParams` were red on the worker's first code state and were repaired before landing (REPORT.md section 6).
  - No other compiled verdict changes: `ant testQuick`, 1058 tests, 0 failures.
- **A program the text refuses that the checker now refuses, which the base accepted**, outside rows 610 to 637's statements:
  - the re-declared abstract method (finding 3, `XXXReabstractedMethodNotImplemented`)
  - the worker's widening-override return check and `OverrideAbstractMethodWiden` (REPORT.md section 10)
  - Before `79cf821d9`, the rung also accepted two ill-typed generic overrides that the base refused (finding 1). That fix removes the acceptance.
- **Each error the three refusals of Q4 uncover.** `Library/FortressLibrary.fss:130`, `BIG LEXICO(g)`, class BR, rows 399 and 488 (REPORT.md section 7).
- **A library or walk edit (a shared phase whose effect reaches walk).**
  - `TypeDisambiguator.java`: walk refuses at load an undeclared applied type name in a typecase arm (the worker's edit), and with `15a4be724` an undeclared type name in an arm's body.
  - `ant testSystem`: 516 tests, 0 failures.
- **A crash repaired by catching it without the error the text gives.** Q4's refusal, which the box at `Specification/basic/components/type-inference.tex:47-53` and Appendix I now state. Listed for completeness.

None of these holds the push. No step taken cannot be undone, and none acts against a decision on record.

## 6. For the curator, and for the gather

- Row 615's open question (finding 6). Both paths now refuse an object that inherits an overridden declaration through another supertype, at that object only. `XXXOverrideInheritedThroughOtherSupertype` pins this on the compiled path.
- NEW-C-1 (the worker's): whether the code generator takes the modifier `override`. Row NEW-C-4 waits on it for a compiled test too.
- For the gather: `Specification/appendices/changes.tex:2850` cites "row~NEW-C-3". The gather's final placeholder grep does not search `Specification/`, so that placeholder must be replaced there with the row's number.
