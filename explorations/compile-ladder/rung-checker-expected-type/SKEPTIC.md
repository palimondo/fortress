# Skeptic's verdict on rung E of climb batch 11 (rung-checker-expected-type)

Verdict: **approved**. The rung is right with one fix of the change, settled by the specification, and a set of corrections; no fix is contested.

- Head judged: `b63fcf847` (the worker's last commit); `3f7234538` wrote the worker's REPORT.md and record.md from the run's journal. The journal tool exited 1 on its first call because the folder `explorations/compile-ladder/rung-checker-expected-type/` did not exist on the branch; it wrote both files once the folder was made.
- My commits: `2579d7e5b` (the fix, with its test), `efae72793` (corrections), and this file.
- The report's count and distance tables are those of the worker's head (`587ce436d` code). No count or distance stage ran after the fix; the gate's tables on the merged tree are the record.

## What I checked

1. **The tables.** The count file under the worker's scratch is identical to batch 10's (`diff explorations/compile-ladder/climb-batch-10/gate/checker-count.txt` against it prints nothing; '#total 1', '#crash none'). `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-10/gate/distance.txt <the worker's distance-postedit.txt>` prints 'DISTANCE DOWN 253 -> 235 (-18)' and 'class OT 100 -> 82 (-18)'. Its per-site list against `explorations/compile-ladder/gate/distance-sites.tsv`, by location and message: 18 sites gone, exactly the 18 the report names; none new. The ladder subset of 21 files against `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`: only `simpleExp.fss` moves its first error, as the report says.
2. **Test first**, in the worker's transcript:
   - 00:32:07, call `…BLfyWq`: `git diff --quiet 83b1cae78 -- ProjectFortress/src` printed 'src unchanged from base', then `junit.sh base … InferResultOnlyIfWithoutElse.test … XXXInferContextDrops.test` printed 'An 'if' clause without corresponding 'else' has type Any instead of type ().' and 'Tests run: 16, Failures: 15, Errors: 0', ending 00:32:17. The first Scala edit is at 00:32:41 (`…u5qqAv`) and the first build at 00:34:01 (`…n6v4jn`).
   - Three tests were respelled at 00:38:22 (`…1LQrpv`) after the edit was built; the final six files ran on the old code through the harness at 00:42:53 (`…KrTCu6`): 'Function body has type OR(Any,String), but declared return type is String.' and 'Tests run: 16, Failures: 15, Errors: 0'.
   - The last code change is the build of 00:39:20 (`…Rabh8n`); `junit.sh new3` at 00:42:33 (`…3JDbjX`) printed 'OK (16 tests)'.
   - `InheritedMethodByNameStaticParamSameName`: old code 01:01:31 (`…23DJEw`) 'Tests run: 3, Failures: 1'; new code 01:01:19 (`…9RZgGH`, `junit.sh new5`) 'OK (3 tests)'.
   - The rule of tests-writing.md, "The order", holds.
3. **The diff**, line by line, against the section, `inference.tex` "The Static Arguments of a Call", `typecase.tex`, `if.tex:68`, `blocks.tex:55-56` and the POSITIONS entries printed. The four contexts and the renaming do what the report says. One departure, the loose juxtaposition's multifix choice (finding 1, fixed).
4. **Precedents.** Rung I's `expected` at the tight juxtaposition (`8dc1a74d9`) and the `if` with `else` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:526-530`) for the contexts; row 561's `ownStaticParamsApart` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:184-202`) for the renaming. The rung follows them. Its clash criterion (names the arguments mention) is the exact condition of capture where no environment is at hand; I agree with it. The same file holds one more site of the shape the rung changed for the loose juxtaposition, `SAmbiguousMultifixOpExpr` (`impls/Operators.scala:382-387`), which gives no expected type at all (finding 3).
5. **The tests** exercise the defects (each fails on the base for its context). Each cites its section by file and section, never a line, and the sections say what the messages say (`if.tex` "If Expressions", `blocks.tex` "Do Expressions", `typecase.tex` "Typecase Expressions", `var-ref.tex` "Identifier References", `traits.tex` "Method Declarations", `inference.tex` "The Static Arguments of a Call"). Each file has one comment line and is named by its topic.
6. **Differentials**, below.
7. **Homes**, below, for the worker's defects and mine.
8. **Ledger and sibling sites.** `ledger.py find` on "expected type", "typecase", "label", "else", "same name", "capture": rows 21, 29, 76, 81, 340, 412, 455, 560, 627 bear on the rung; nothing else. The siblings in the files the rung edits: the `label` body (`Misc.scala:706`, 642), the `for` body (`Misc.scala:613-623`, the chapter's item), and `SAmbiguousMultifixOpExpr` (finding 3). Other callers of the instantiation: `uberInheritedMethods`' substitution of a trait's arguments into its extends clauses has no binders; the code generator's own instantiation (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1402`) is not the rung's path and is not traced (643's death is on that side). Walk: the rung edits no walk code; walk runs every program of the four contexts and row 627's.
9. **The report.** Its five provenance lines: each cited line opened with `sed -n`. One citation was wrong: `trait-parameters.tex:22-23` holds the start of the sentence; "in scope of the entire body of the declaration" is at `:24` (corrected to `:21-24`, in REPORT.md twice and record.md once). The suite run `ant testQuick` (BUILD SUCCESSFUL, 1056/86/263) was on the code state of `587ce436d`; the later commits added test files only, run through the harness. record.md's FACTS entry, notes and rows checked against the tree; 642, 643 and my 644 pass `ledger.py check --rows` but for the placeholder number ('3 rows, 3 fail the template; rows (or places) failing each rule: number 3').
10. **Competing declarations.** `instantiateMethodApart`, every new component name and `\seclabel{revival-expected-contexts}` each occur once in `ProjectFortress/src/com/sun/fortress/`, the test folders and `Specification/`; none of the batch's other branches adds a clashing label or test name.
11. **Failure modes.** The rung turns refusals into accepted programs whose values are the text's (a `fail`-like call still throws at run time). Before the fix it turned one refusal into a quiet value: the binary reading of a multifix juxtaposition (finding 1). It turns one quiet acceptance into a loud failure: a checker bug report where the base accepted (finding 2).

## Findings

### 1. A loose juxtaposition's multifix choice depended on the expected type (defect, fixed in `2579d7e5b`, settled)

The rung passed the expected type into the try of the multifix application (`impls/Operators.scala:175-182` at `b63fcf847`). Where the expected type leaves a generic multifix juxtaposition with no instance, the try fails and the checker falls back to binary juxtapositions, a reading the text does not choose. My program, with `opr juxtaposition[\T\](a: ZZ32, b: ZZ32, c: T): T = c`, `opr juxtaposition(a: ZZ32, b: Boolean): ZZ32 = a`, `f(x: ZZ32): ZZ32 = x + 1`, `h(x: ZZ32): Boolean = x > 0`, `b: Boolean = f 1 f 2 h 3` and `n: ZZ32 = f 1 f 2 h 3`:

    bin/fortress compile SkJuxtMultifixGen.fss && bin/fortress run SkJuxtMultifixGen      # worker's head
    exit=0
    true
    6
    old-fortress.sh /home/user/fortress-base11 <worktree>/tmp/old-caches compile SkJuxtMultifixGen.fss
    SkJuxtMultifixGen.fss:12:13-23:
        Right-hand side has type Boolean, but declared type is ZZ32.
    File SkJuxtMultifixGen.fss has 1 error.

Walk does not apply a multifix juxtaposition at all (row 29): `old-fortress.sh … SkJuxtMultifixGen.fss` prints 'RHS expression type Int is not assignable to LHS type Boolean' at line 10. The specification answers: "the compiler first checks to see whether there is a definition for that operator that will accept $n$ arguments. If so, that definition is used" (`Specification/basic/operators/chained-multifix.tex:45-47`), which `Specification/basic/operators/juxtameaning.tex:108-110` applies to a juxtaposition; the result then must fit, "the call is accepted only if the return type of the instance then found is a subtype of the expected type or can be coerced to it" (`Specification/basic/inference.tex:154-156`). Boolean is neither, so the text refuses the program.

The ways: (a) decide whether the multifix application applies without the expected type, as the base did, then check it again with the expected type and keep the plain result where that fails; (b) try with the expected type, then without it on failure, which costs a second failed try at every loose juxtaposition that no multifix declaration accepts, the common case; (c) give the multifix try no expected type, which loses it where a generic multifix's result-only parameter needs it. Taken: (a), `impls/Operators.scala:176-184`. With the fix a generic multifix still takes the expected type: `s: String = f 1 f 2 f 3` with `opr juxtaposition[\T extends Any\](a: ZZ32, b: ZZ32, c: ZZ32): T = throw InvalidRange` compiles and its run prints 'thrown', where the old code prints 'Right-hand side has type Any, but declared type is String.'.

The test, `ProjectFortress/compiler_tests/XXXLooseJuxtMultifixExpectedType` (a refusal, so XXX-named, as rung C's `XXXLocalFunctionUntypedParam`):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests XXXLooseJuxtMultifixExpectedType.test …   # worker's head, 02:40:27Z
     Saw failure, but did not satisfy compile_err_contains; expected
    Right-hand side has type Boolean, but declared type is ZZ32.
    1) ProjectFortress/compiler_tests/XXXLooseJuxtMultifixExpectedType(…)AssertionFailedError: Saw wrong failure. compile
    ONE_JVM=1 … junit.sh skfix ProjectFortress/compiler_tests XXXLooseJuxtMultifixExpectedType.test <the rung's 10 test files> …                            # after the fix, 02:44:03Z
    . compile ProjectFortress/compiler_tests/XXXLooseJuxtMultifixExpectedType …XXXLooseJuxtMultifixExpectedType.fss:12:15-25:
     Saw expected failure
    OK (23 tests)

On the old code the test is green ('Saw expected failure'): the base refused the program, and the rung had made it accepted.

Where I differ from the worker: decision 5 gives the expected type to the multifix attempt. I keep that where the multifix applies; what the fix changes is only that the expected type no longer decides whether it applies. The worker argued for the form, not for that choice, so the fix is settled, not contested.

### 2. A written static argument whose bound names a renamed parameter: the base's acceptance turns into rung C's NEW-C-2 crash (correction, home 2)

`chain[\G, K extends Gen[\G\]\](f: E->G, k: K): ZZ32` invoked as `g.chain[\G, Gen[\G\]\](fn (e: G): G => e, h)` inside `object Use[\G\](g: Gen[\G\])`:

    old-fortress.sh … compile SkCaptureBound.fss && old-fortress.sh … run SkCaptureBound
    exit=0
    11
    bin/fortress compile SkCaptureBound.fss                           # worker's head
    SkCaptureBound.fss:13:42:
    G$1 is not in the kind env [][][G -> KindBinding(G,G extends Object)][][]
    File SkCaptureBound.fss has 1 error.

Walk prints 11. With the caller's parameter named `H` both codes print 'G is not in the kind env [][][H -> KindBinding(H,H extends Object)][][]'; with the static arguments inferred both compile and print 11. The stack (`-debug stacktrace`) runs `Functionals.getCandidatesForMethod` → `STypesUtil.staticInstantiationForApp` → `staticArgsMatchStaticParamsForApp` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:771-795`) → `TypeAnalyzer.scala:797`: a written argument is checked against its parameter's bound with the other written arguments not put in. That is rung C's row NEW-C-2 (`XXXMethodStaticArgsBoundNamesOther` on `wip/rung-checker-overloading`, 'R is not in the kind env'). The base accepted the same-name shape only through row 627's capture: the bound's `G` was the caller's. The renaming is right; it exposes the deferred defect at one more shape.

Not fixed here. The repair belongs in `staticArgsMatchStaticParamsForApp` (put the written arguments into the bounds, as `StaticTypeReplacer` does elsewhere), but it would turn rung C's `XXXMethodStaticArgsBoundNamesOther` red at the gate, and it repairs a defect another rung of this batch recorded and deferred. Recorded instead: `ProjectFortress/compiler_tests/XXXMethodStaticArgsBoundNamesOtherSameName` (home 2), with notes on NEW-C-2 and row 627 in record.md:

    old-fortress.sh … junit …/XXXMethodStaticArgsBoundNamesOtherSameName.test …        # base, 02:40:37Z
     Saw failure, but did not satisfy compile_err_contains; expected
    is not in the kind env
    junit.sh skhead … XXXMethodStaticArgsBoundNamesOtherSameName.test …              # worker's head, 02:40:27Z
    G$1 is not in the kind env [][][G -> KindBinding(G,G extends Object)][][]
     Saw expected failure

The base run is also the run in which the defect does not show, and it is red. The library has no such site: the distance's per-site list gains none.

### 3. An operator repeated between three operands gets no expected type (correction, home 2, row 644)

With `opr OPLUS[\T\](a: Any, b: ZZ32): BoxV[\T\] = throw InvalidRange`, `x: BoxV[\ZZ64\] = 1 OPLUS 2` checks, but `y: BoxV[\ZZ64\] = 1 OPLUS 2 OPLUS 3` is refused on both codes:

    bin/fortress compile SkChainOpr.fss          # and the same through old-fortress.sh
    SkChainOpr.fss:13:31-23:
        Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].

Walk prints 'thrown' twice. `SAmbiguousMultifixOpExpr` (`impls/Operators.scala:382-387`) tries the multifix and the binary applications with no expected type, though the chapter's sentence after the list, which the rung revised, gives an operator application the expected type. Not the rung's to fix: its section gives it the four contexts and row 627, and this is rung I's form. Recorded: `ProjectFortress/compiler_tests/XXXInferRepeatedOperatorContext`, row 644 in record.md, and the departure named in the Effect of the rung's Appendix I entry (`Specification/appendices/changes.tex:1989-1993`). The test is green on both codes ('Saw expected failure'); changed for one run to `1 OPLUS 2`, it is red ('Saw wrong failure. compile', `junit.sh skxxxred`), then restored. The workaround `(1 OPLUS 2) OPLUS 3` checks and runs ('thrown') on the old code.

### 4. The list of contexts claimed too much of a typecase (correction)

"…the expected type of the \KWD{typecase} expression, of which the union of the types of its clauses … is then a subtype" (`Specification/basic/inference.tex:140-142`) is false where a clause is not a call: `typecase a of String => 3 else => z end` with `z: ZZ64` under the declared return type `ZZ64` has the type `OR(IntLiteral, ZZ64)`, which the checker accepts by coercion on both codes. Corrected to "is then a subtype where the type of each clause is", the condition the entry's rationale already states (`changes.tex:1961`). Its compiled run meets row 340's code-generator crash on both codes ('Error trying to close method scope'), as does a typecase of numerals alone; walk prints the values.

### Not new

- Walk ignores a multifix juxtaposition: row 29. Walk does not fix a static argument by the expected type ('RHS expression type BoxV[\Int\] is not assignable to LHS type BoxV[\ZZ64\]' for `wrapV 3`): the inference chapter's callout says so ("It does not yet fix a type parameter by the expected type", `Specification/basic/inference.tex`, section "The Static Arguments of a Call"). Walk's unification error on an inferred generic method call with a function argument: row 21. The compiled `"a" "b"` prints `a b`, walk `ab`: row 76.

## Differentials (my programs; walk on the old code, the rung edits no walk code)

| program | what it varies | worker's head | old code | walk |
|---|---|---|---|---|
| SkJuxtMultifixGen | generic multifix vs binary under ZZ32 | accepted, prints `true`, `6` | refused, 'Right-hand side has type Boolean' | binary reading (row 29) |
| same, after `2579d7e5b` | | refused as the old code | | |
| SkJuxtMultifix | non-generic multifix returning String | refused, 'type String, but declared type is ZZ32' | the same | binary reading |
| SkJuxtMultifixStop (after the fix) | multifix whose result-only `T` the expected String fixes | `thrown` | refused, 'type Any' | binary reading |
| SkJuxtNumbers | `n: ZZ64 = x y` on ZZ32s, `x DOT y`, `"a" "b"`, `wrapV 3` | `value 1000000`, `overflow`, `overflow`, `a b`, `3` | refuses `wrapV 3` only | same values, `ab`, refuses `wrapV 3` |
| SkIfNoElseOk, `FORTRESS_THREADS=1` and `4` | `if` without `else` with a local declaration and `stop` in a clause, an `elif`, inside a `for` | `ok 0`, `ok 1`, `thrown 2`, `5` at both | refused, 'type Any instead of type ()' | the same values |
| SkIfNoElseErr | clauses `id(5)`, `mk()` of non-() type | the old code's three errors, same text | | |
| SkLocalDecls | `var`, a tuple declaration, typed declarations, nested `do` before the last call | `3`, `3`, `11`, `thrown` | four refusals | the same values |
| SkLetFn (typecheck) | a local function before the last call | checks | 'Function body has type BoxV[\ZZ32\]' | `3` |
| SkTcBoxed | typecase clauses `wrapV(3)`, a nested `if` and `do` in clauses | `3`, `s`, `6`, `7` | two refusals | the same values |
| SkTcNum | typecase of numerals under ZZ64 | code-generator crash (row 340) | the same | `3` |
| SkOverloadCtx | `h(3)` with `h(ZZ32): String`, `h(ZZ64): ZZ64` after a declaration and in a typecase | the old code's two errors: the expected type does not choose the overload | | `z32` twice |
| SkCapture2 | two own parameters, both clashing; written and inferred; `mp[\K\]` | `1`, `1`, `1` | three refusals | `1`, then row 21 |
| SkCaptureBound | bound naming a renamed parameter, written | 'G$1 is not in the kind env' | compiles, `11` | `11` |
| SkCaptureBoundH | the same, caller's parameter `H` | 'G is not in the kind env' | the same | `11` |
| SkCapBoundInfG, SkCapBoundInfH | the same, arguments inferred | `11` | `11` | row 21 |
| SkChainOpr | `1 OPLUS 2` and `1 OPLUS 2 OPLUS 3` | refuses the second | the same | `thrown`, `thrown` |

Commands: the worker's head, `FORTRESS_HOME=/home/user/fortress-expected FORTRESS_CACHES=<private copy of its caches> bin/fortress compile P.fss` then `run P`; the old code, the brief's `old-fortress.sh` lines. No program of the rung writes a mutable variable, field or library state; the one program with a top-level `var` ran at one and four threads.

## Homes

| defect | home |
|---|---|
| row 560's four contexts | 1: the rung's four tests |
| row 627 at a method invocation and by name in a trait | 1: `MethodStaticArgReceiverSameName`, `InheritedMethodByNameStaticParamSameName` |
| row 455's juxtaposition face; its argument faces | 1: `InferLooseJuxtContext`; 2: `XXXInferContextDrops` |
| the `label` body (642) | 3: `XXXInferResultOnlyLabelBody` pins today's refusal, row 642 |
| the by-name run's `NoSuchMethodError` (643) | 2: the `XXXInheritedGenericMethodCalledByName` pair |
| a numeral `try` body (row 340) | 2, already |
| finding 1, the multifix choice | 1: `XXXLooseJuxtMultifixExpectedType` |
| finding 2, the bound naming a renamed parameter | 2: `XXXMethodStaticArgsBoundNamesOtherSameName`, under rung C's NEW-C-2 |
| finding 3, the repeated operator | 2: `XXXInferRepeatedOperatorContext`, row 644 |

## The suite my fix needed

    ant testQuick        # on 2579d7e5b, after the build and the library order, with efae72793's two test files in the tree
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 1063, Failures: 0, Errors: 0, Skipped: 0
    BUILD SUCCESSFUL
    Total time: 9 minutes 57 seconds

1063 is the worker's 1056, the four cases of its two later commits, and my three. The specification builds after the corrections: `./ant genSource && ./ant tex` ends 'BUILD SUCCESSFUL' twice and 'Output written on fortress.pdf (665 pages, 2264706 bytes).'; the log holds no 'LaTeX Warning: Reference' line. The skill's grep counts 40 lines in that log, all the text of a package's warning macro in the traced log, not warnings.

## Points to report

The worker's three stand (`REPORT.md` section 7). Added:

- A compiled test whose verdict changes other than by the rung's intent: none; testQuick is green on the fix.
- A program the text allows that the checker now refuses: a written static argument whose bound names a parameter the renaming renamed (finding 2), accepted on the base through the capture, now rung C's NEW-C-2 crash (`ProjectFortress/compiler_tests/XXXMethodStaticArgsBoundNamesOtherSameName.fss:14`). Reversible.
- A program the text refuses that the checker accepted at the worker's head (finding 1, `ProjectFortress/compiler_tests/XXXLooseJuxtMultifixExpectedType.fss:12`): repaired by `2579d7e5b`, so it does not land.
- Normative text: the rung's own list sentence made conditional (`Specification/basic/inference.tex:140-142`) and its own entry's Effect extended (`Specification/appendices/changes.tex:1989-1993`); both inside the inference chapter's list and the rung's own entry.
