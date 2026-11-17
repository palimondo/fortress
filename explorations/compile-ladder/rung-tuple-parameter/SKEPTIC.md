# Rung T: the skeptic's check

Head judged: 95d5547f7b, the worker's last commit on `wip/rung-tuple-parameter`. One launch of the skeptic worked the rung. The branch already carried the worker's REPORT.md and record.md; `journal-text.py` wrote the journal's two texts to scratch, and both are byte for byte the committed files (`cmp`), so no commit of them was needed.

Verdict: **approved**. The change is right, with one fix of mine that completes row 832, and four defects that my programs measured, none made by the change, recorded with expected-failure tests and rows. No fix is contested.

## What I checked

1. **The stages.** T's section runs neither stage, and REPORT.md says so. `git diff --name-only 647163a9c4...95d5547f7b` lists two paths outside the folders that a rung without a stage may touch: `compiler/codegen/CodeGen.java`, which the section gives the rung, and `runtimeSystem/Instantiater.java`, beyond the named files (a point to report, below). Neither is the checker, its Scala or generated code, so the count stage has nothing to measure; I ran it not. No table to compare.
2. **Test first**, in the worker's transcript. The failing run is call `8GMCid`, 07:03:03Z, on the base build seeded into the worktree before any edit of Java (first edit 07:08:23Z, `gUcELe`): `Error trying to close method scope`, `F. run …/TupleIndexMethodCompiled (292ms) java.lang.VerifyError`, `F. run …/GenericMethodTupleParameterCompiled (446ms) java.lang.ClassCastException`, `Tests run: 9,  Failures: 5`. The cases added later were run in their final form on the old code (`2LRF7U` 07:24:45Z, `tbN3A1` 07:26:28Z after the last test edit `tCd6vK` 07:26:15Z, `HaLNZ9` 07:40:22Z). The passing run is `x2rwV1`, 07:40:07Z, after the last edit of code (`4WcXJH`, Instantiater.java, 07:38:39Z) and its build with the library order (`build4.txt`: `BUILD SUCCESSFUL`, five `rc=0`): `OK (15 tests)`. `ant testFast` started 07:41:04Z on that code state: `Tests run: 1678, Failures: 0, Errors: 0`, `BUILD SUCCESSFUL`. The quotes of recordedFailure and recordedPass are those lines.
3. **The diff**, line by line, against the section, `method-invocation.tex` "Dotted Method Invocations" and P-156. It does what REPORT.md says and fork T1's default: a declared tuple parameter keeps its elements, a parameter of a type parameter's type stays one boxed value at a tuple instance (`paramTypeAtInstance`), and a bridge in the code generator joins the interface's boxed method to the body. One rule was narrower than row 832's claim: `genericMethodTakesOneParameter` gave up on a name whose generic declarations differ in their number of parameters (fix 1).
4. **Where the fix belongs.** The code generator, as the worker says; the class loader's twin (`Instantiater.java:119-165`) is the team's own join the other way. Where I differ from REPORT.md's precedent search: it calls the object factory, which counts a single tuple parameter's elements (`CodeGen.java:4824` at the base), "already right". The count is right, but an object whose one value parameter is a pair dies in its constructor on the base and after the change (row 1055), so the precedent holds for the factory's signature only.
5. **The tests.** Each exercises its row's defect and fails on the base. `TupleIndexMethodCompiled.fss` held four comment lines; the brief allows one, so three went (correction 3). Every specification citation names a file and a section.
6. **My programs**, under `tmp/rung-tuple-parameter/skeptic/p/`, compiled and run on the rung's build and on the base build through `old-fortress.sh`, and under walk on both (below).
7. **The homes** of every defect named: the worker's five rows have home 1; my four have home 2 (below).
8. **The ledger and the siblings**: `ledger-find` with `tuple overload`, `tuple dispatch`, `value parameter tuple`, `ClassCastException tuple`, `generic operator tuple`, `generic dotted methods`, `Cannot find definition for method` and others found no row for the four defects below.
9. **The report.** Its five provenance lines open at the lines they cite (`PROBES.md:21`, `method-invocation.tex:57-58`, `Instantiater.java:119-165`, `CodeGen.java:4824` and `:7385` at the base, `CodeGen.java:950-982`, `:7375-7407`, `:793`). Its notes on row 237 and its question on `m[i, j] := v` reproduce under walk: `println(pr:)` printed `([1,2,3,4,5... BY [2,3,4,5,6...)` and `println(pr#)` printed `34` for a program's own `:` and `#` over pairs (`bin/fortress V237.fss`); `Cells[5, 6] := 7` gave '** bug! The number of parameters (2) does not match with the number of arguments (3).', and `fortress compile VSub.fss` '(ZZ32, (ZZ32, ZZ32))->() is not applicable to an argument of type (NaturalNumeral[\1,10,7\], …)'. The Effect sentence that the worker rewrote is false after the change (correction 2). The worker's whole-suite run was not needed for a code-generator edit and was green.
10. **Competing declarations.** The tests' component names and the seven methods that the change adds to `CodeGen.java` occur nowhere else in the two test corpora or under `ProjectFortress/src/com/sun/fortress/`; nor do my four tests' names.
11. **The failure mode.** No loud failure became a quiet value: every program that newly runs prints walk's values. One loud failure moved: a generic operator over a type parameter applied to a pair stopped the base's compile ('NegativeArraySizeException: -1' in `ManglingMethodVisitor.visitMaxs`) and now compiles and dies at the call (`NoSuchMethodError`, row 1056).

## The programs, old against new

Commands, from `tmp/rung-tuple-parameter/skeptic/p/`: `run-diff.sh` runs `bin/fortress compile P.fss` and `bin/fortress run P` of the rung's build at `FORTRESS_THREADS=1` and `4`, the same through `old-fortress.sh /home/user/fortress-base36 …/tmp/old-caches`, and walk on both; `run-new.sh` the compiled path only, one thread.

| program | what it holds | old (base) | new (rung) | walk |
|---|---|---|---|---|
| S1 | a generic trait's body over `I` inherited at a pair; a plain trait's body of a pair parameter; a method of a `()` parameter | compile crash in `TraitDecl.accept` | 12 23 34 45 56 78 7 8 | the same |
| S3 | a generic object at a pair through its trait; a call on a receiver of a type variable bounded by the trait | VerifyError | 12 5 5 | the same |
| S4b | prefix `-` and postfix `!` over a pair, of a call's result, of a nested pair | 'Index -1 out of bounds' at the compile | -1 5 45 15 | the same |
| S5 | a generic trait's generic method of `(U, T)`, from its own body and through its type; a generic method at a tuple static argument; inferred | ClassCastException | 5 42 6 7 1 1 8 | the same |
| S7c, S7d | a `var` field of a triple assigned from outside; a `var` field of a pair under `atomic` in a parallel `for` of 100 | VerifyError | 5 y 6; 1078, at one and at four threads | the same |
| S8 | a pair of a trait and a number through the generic trait's type | VerifyError | 12 34 56 78 | the same |
| S9 | a wider body, `get(t: (Object, Object))` for `get(i: I)` at a pair | refused: 'has no concrete implementation' | the same | refused alike |
| ReservedSig | no tuple-typed parameter: a generic trait at `ZZ32`, plain, functional and generic methods, a postfix operator | 2 5 10 12 6 | 2 5 10 12 6; its jar's 21 classes byte for byte the base's (`cmp`), `javap -p -s` equal | — |
| S6, S6c | `tk[\U\](y: (U, U))` beside `tk[\U\](y: U, z: U, w: U)` | ClassCastException | ClassCastException (fix 1) | 'Cannot find definition for method tk given receiver Two' (row 1057) |
| S2, S2b | `get(t: (ZZ32, ZZ32))` beside `get(s: String)`, with and without a generic trait | 'VerifyError: Bad local variable type … get(Lfortress/AnyType$Any;)… @21: aload_2' | the same (row 1054) | 12 99 |
| S10a, S10b | `object H(pr: (ZZ32, ZZ32))`, and with `var pr` | ClassCastException in `H.<init>`; VerifyError | 'ClassCastException: class …FZZ32 cannot be cast to class AnyTuple⟦2⟧' at `S10a$H.<init>(…:4)`, both (row 1055) | — |
| S10c | `object H(n: ZZ32, var pr: (ZZ32, ZZ32))`, read and assigned | VerifyError | 12 34 | — |
| S4a, S11b | `opr (x: T)!![\T\] : T = x` on a pair, and on `5` | 'NegativeArraySizeException: -1' at the compile; 5 | 'NoSuchMethodError: … postfix !!⟦Tuple⟦FZZ32,FZZ32⟧⟧ … the_function(FZZ32, FZZ32)' (row 1056); 5 | 12 23 5 |

The diff writes no mutable state of its own; the `var` field programs (S7c, S7d) ran at one and at four threads, as above.

## Fix 1, a defect of the change: row 832 at an overloaded name

- Finding: `genericMethodTakesOneParameter` (`CodeGen.java:7359-7372` at 95d5547f7b) returned false as soon as one generic declaration of the name had other than one parameter, so `Two.tk[\ZZ32\]((8, 9))` beside a three-parameter `tk` still cast the closure to a three-place arrow: row 832's claim, which the rung closes.
- Test: three cases of `object Two` added to `compiler_tests/GenericMethodTupleParameterCompiled.fss`. Failing on the worker's head, before my edit (`ONE_JVM=1 …/junit.sh sk1head ProjectFortress/compiler_tests GenericMethodTupleParameterCompiled.test …`, 08:52:32Z):

      . run ProjectFortress/compiler_tests/GenericMethodTupleParameterCompiled (655ms) java.lang.ClassCastException
      Caused by: java.lang.ClassCastException: class GenericMethodTupleParameterCompiled?$\=Two?tk?…?$?Arrow?Tuple??,Tuple?U,U??,U? c…
      Tests run: 9,  Failures: 1,  Errors: 0

  Failing on the base's code (`old-fortress.sh … junit …/GenericMethodTupleParameterCompiled.test …`, 08:55:54Z): `. run …/GenericMethodTupleParameterCompiled (897ms) java.lang.ClassCastException`.
- Ways: by the number of parameters (taken: a declaration of one parameter takes the tuple whole, one of a parameter for each element takes them apart, another number cannot take the call); by matching each declaration's generic method name against the name that the call builds from its schema (not taken: it rests on the declaration's arrow type and the call's schema giving one string, which nothing in the tree checks); by the overloading schema's domain (not possible: one tuple parameter and several parameters have one domain).
- Passing, after the build with the library order (`build1.txt`: `BUILD SUCCESSFUL`, five `rc=0`), with all the rung's tests and mine in one JVM (`ONE_JVM=1 …/junit.sh sk2fix ProjectFortress/compiler_tests TupleIndexMethodCompiled.test GenericMethodTupleParameterCompiled.test …`, 08:55:32Z): `. run ProjectFortress/compiler_tests/GenericMethodTupleParameterCompiled (863ms) PASS`, `OK (21 tests)`.
- Settled by: the section's "Rows. Close 992, 832 and 819." and row 832's claim, 'a generic dotted method whose single parameter has a tuple type … dies at the call' (`explorations/fortress-gap-ledger.md:1006`), with `Specification/basic/expressions/method-invocation.tex:57-58`, the parameter bound to the value of the argument expression.
- Commit: f0c76ac804. A code-generator edit: no whole suite (`tests-running.md`); the distance stage's shadow patch still applies to the final `CodeGen.java`: `shadow sources written to tmp/rung-tuple-parameter/skeptic/shadow`, `shadow-EXIT=0`.

## Corrections

1. **Four defects that my programs measured**, none made by the change, each with a gated expected failure asserting the specification's answer (home 2) and a row in record.md, row 1054 to row 1057: an object's dotted method overloaded at a pair and at another type (`XXXOverloadedMethodTupleParameterCompiled`); an object whose one value parameter is a pair (`XXXObjectTupleValueParameterCompiled`); a generic operator over a type parameter applied to a pair (`XXXGenericOperatorTupleOperandCompiled`); under walk, two generic dotted methods of one name that differ in their number of parameters (`tests/XXXGenericMethodOverloadArity.fss`). On the rung's head with fix 1 built, the three compiled pairs report `Saw expected failure (Exit code != 0)` and `OK (21 tests)` (the run above); the walk test, `harness-one.sh … ProjectFortress/tests/XXXGenericMethodOverloadArity.fss`: ` OK Saw expected exception`, `OK (1 test)`. The first, run once with its string overload and its assertion taken out (`junit.sh sk1mut`), printed `PASS` and went red: `Failed to satisfy run_err_contains`, `Tests run: 2,  Failures: 1`; restored, `cmp` equal. On the base's code the first two are green as on the head, and the third is red, since the base's compile stops before the run prints `REACHED`. Commit 423a25d882.
2. **The Effect's sentence** (`Specification/appendices/changes.tex:3330-3333`). The worker's "On the compiled path one such instance compiles and then fails at run time" is false after the change: S4a, an instance at a tuple type of a generic operator over an unbounded type parameter, now compiles and dies at the call. After: "On the compiled path some such instances compile and then fail at run time: an instance at \TYP{()} where a parameter has the type parameter's type (row~339 of the revival's gap ledger), and an instance at a tuple type of a generic operator whose one parameter has the type parameter's type." Its row number is row 1056's, for the gather to add. The callout at `Specification/basic/trait-parameters.tex:62-64`, "some instances at \TYP{()} or at a tuple type still fail at run time", stays true. Commit 423a25d882, with REPORT.md's list of homes, its "Sentences of the specification made false" and "What the specification settles", and record.md's row 832 close, which now names f0c76ac804.
3. **One comment line** in `TupleIndexMethodCompiled.fss`; the test passed after (`junit.sh sk4`: `. run … (667ms) PASS`, `OK (3 tests)`). Commit 2dede3f612.
4. **record.md's Revival change**: its sentence that every program of the rung's tests prints under walk what its compiled run prints is true again with the exception of `object Two`'s cases (row 1057). Commit 42523d2d98.

## Points to report

The worker's seven stand, with these additions:

- The reserved point, a change of a compiled method's JVM parameters where no tuple-typed parameter stands: in the code generator, none on ReservedSig, whose jar is byte for byte the base's; in the class loader, the worker's two cases (a component named `Tuple…` loses a twin that misread a class as a tuple, row 840; a forwarder of a `()` parameter loads self alone).
- A test outside the section's files: `ProjectFortress/tests/XXXGenericMethodOverloadArity.fss`, walk's test folder, for row 1057.
- The specification's sentence changed by correction 2.
- The shadow patch applies to the final `CodeGen.java` (exit 0, above).

No step that cannot be undone and none against a decision on record.

## Contested

None.
