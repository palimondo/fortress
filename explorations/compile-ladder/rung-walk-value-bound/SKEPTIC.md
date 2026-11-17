# Rung V, rung-walk-value-bound: the skeptic's check

Head judged: a51547fd6e (code fcdf7bc2da). Head after the fixes: 6b4c26456f, before this file. One launch of the skeptic. The branch carried REPORT.md and record.md, so nothing was written from the run's journal. Verdict: **approved**, with two corrections committed and none contested.

## What was checked

1. **The stages.** The report says neither stage ran. `git diff --name-only c1ce2a35e1...a51547fd6e` lists two files under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, twelve under `ProjectFortress/tests/`, `Specification/basic/inference.tex` and two under `explorations/`: no path outside the folders that leave both stages unmoved.
2. **Test first**, in the worker's transcript. The harness run on the base's code is call JQzqVM, 00:09:08 to 00:09:17 UTC, 'tree c1ce2a35e1 ... cache empty', 'non-value subtype of value type RR32', 'Missing expected refusal at load', 'Tests run: 5,  Failures: 2,  Errors: 0'. The first edit of code is call gov6pL at 00:10:46 and the first build KmuQcG at 00:10:56. The last change of code is NanhLg at 00:12:38, built in the same call ('BUILD SUCCESSFUL'); the passing run is 51jrvU at 00:13:31, 'OK (10 tests)'; `ant testSystem` starts at 00:13:54 (twnidM) and ends 'BUILD SUCCESSFUL', 'Total time: 4 minutes 53 seconds' (Gv3xDx), four shards of 217, 211, 220 and 213 tests with 0 failures. No Java file changes after 00:12:38. The first `XXX` test was shown red on a deliberate fix (RhKLxG, 'Refused at load as its keys name', 'Tests run: 1,  Failures: 1'). The run between the two edits (PgcGBJ) shows the first form refusing the guard without a return type, as the report says.
3. **The diff against the section, the specification and the decisions.** `enforceValueness` passes a `SymbolicType` and nothing else (fork V1). The shortcut gives way only for an own generic beside a declaration without static parameters that some instance of the generic holds; anything but a named rule leaves the pair accepted; the choice at a call and `bestMatchForNumerals` are untouched. `returnRuleAtObjectArguments` is the last two clauses of `returnRuleAtEveryInstance` (OverloadedFunction.java:1262) for a plain inner declaration. Its first clause, a type parameter fixed by a static argument, reaches a plain declaration over a trait type, which the section's sentence 'That reading is the rule only where the plain declaration's parameter type is an object type' does not name; it is sound by instantiation exclusion (Specification/advanced/overloading.tex, "Declarations with Static Parameters": two instances of one parameterized trait meet only where their static arguments are the same), the compiled checker accepts the same pair, and it had no test. I kept it and gave it one (fix 1).
4. **Soundness of the new valid reading**, by programs below: I found no invalid pair that the new reading loads and the old refused.
5. **The tests.** Each file has one comment line; each citation names a file and a section that exists (inference.tex "The Static Arguments of a Call", traits.tex "Value Traits", var-ref.tex "Identifier References", overloading.tex "Declarations with Static Parameters"). The guard without a return type asserts a pair that the rule accepts (the body is a `ZZ32`).
6. **The names the rung adds**: `plainInsideGeneric`, `returnRuleAtObjectArguments`, `writesReturnType`, `differAtObjects` and the six test names each occur in one file only.
7. **The report's cited lines**, each opened with `sed -n`. One was wrong (fix 2). The others say what the report claims.
8. **The ledger.** Row 788 already holds the cause of one pair my programs met (below). Rows 697 and 785 are as the report reads them.

## My programs

All under `tmp/rung-walk-value-bound/skeptic/`, each run under walk on the rung's build (`bin/fortress P.fss`) and on the base's code (`/home/user/fortress-base35/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base35 <worktree>/tmp/old-caches P.fss`), `FORTRESS_THREADS=1`. The diff holds no mutable variable, field, atomic block or write into a library's state, so no program was run at four threads beyond the harness's own.

| program | base | rung |
|---|---|---|
| SkA: `idv[\T extends RR32\]`, `idn[\T extends Vo\]` for a program's `value object Vo`, `Cell[\T extends NN32\]`, and `held[\T extends S\](x: T)` at `Holder[\Vo\]` and `Holder[\NN32\]` | `1.5`, `3`, `7`, then 'T@...: non-value subtype of value type Vo' | `1.5`, `3`, `7`, `4`, `7` |
| SkX: `dup[\T extends NN32\](a: T)` beside `dup(a: String)` (SkW: the generic alone runs on both) | 'non-value subtype of value type NN32' | `1`, `2` |
| SkB: a trait without `value` below a value trait | 'Mid: non-value subtype of value type Stamp' | the same |
| SkC, SkQ, SkR: a generic object or trait without `value` below a value trait, instantiated, and read only at a type parameter | 'G[\ZZ32\]: non-value subtype ...', 'G[\T@...\]: ...', 'H[\T@...\]: ...' | the same three |
| SkK: `pick[\T extends Number\](a: T, b: T): T` beside plain ones at `NN32` and `RR32`, `lab[\T\](a: T): String` beside plain ones at an object and `NN32`; ten calls, numerals among them | ten lines | the same ten lines |
| SkD: valid pairs at a program's objects, `sel(a: Ob, b: Ob): Ob`, `two(a: Ob, b: Other): Ob`, and `mix(a: Lo, b: Tr): Lo` beside `mix[\T\](a: T, b: T): T` | refused at `mix`, 'fails the Return Type Rule' | `Ob`, `ZZ32`, `Ob`, `ZZ32`, `Lo`, `ZZ32` |
| SkE: `bad(a: Tr, b: Lo): Lo` beside `bad[\T\](a: T, b: T): T` | refused, 'fails the Return Type Rule' | `loaded` |
| SkT: `unb(a: Tr[\ZZ32\]): ZZ32` beside `unb[\T\](a: Tr[\T\]): T`, `Tr` a trait | refused, 'fails the Return Type Rule' | `0`, `d` |
| SkU: the same with result `String` | refused | refused |
| SkM: `keep(a: Ob): Any` beside `keep[\T\](a: T): T` | `loaded` | refused, 'fails the Return Type Rule' |
| SkI, SkN: `opt(a: Ob): Maybe[\Ob\]` beside `opt[\T\](a: T): Maybe[\T\]`, and the same at a program's `Bx` | `loaded`, `PASS` | refused, 'fails the Return Type Rule' |
| SkF, SkV: valid pairs over an instance of a generic object, and over an object below `Tr[\ZZ32\]` | `0`, `s`, `9`; `0`, `1` | the same |
| SkG: `unb(a: Bx[\ZZ32\]): String` beside `unb[\T\](a: Bx[\T\]): T`, `Bx` an object | `bad` | `bad` |
| SkH, SkJ: a functional method without a return type, and one of a generic object, beside a generic function | `method`, `3` | the same |
| SkP: `lab(a: Ob) = 7` beside `lab[\T\](a: T): String` | `PASS` | `PASS` |

SkE and SkD's `mix` are valid: the second argument is a `Lo` itself, so every instance that applies has `T` at or above `Lo`. SkM, SkI and SkN are invalid by the rule's letter (the instance at `Any` applies to an `Ob` and returns `Any`'s instance; `Bx[\Ob\]` is not below `Bx[\Any\]`), and the compiled checker refuses each. SkG is an invalid pair that still loads: its cause is row 788's, an object type over a static parameter read as excluding, before the shortcut is reached; the rung does not change it and the row stands. SkP is NEW-V-1's kind.

**The compiled path.** The diff touches no file of the compiled path, so the base build's result stands for both. `old-fortress.sh ... compile`: SkM, SkN and SkP are refused ('the return type of Ob->Any ... should be a subtype of the'), SkO (`sel(a: Ob, b: Ob): Ob`) is refused, which is row 542 and rung X's; SkT and SkV compile. SkS, the value-bound program at a program's own value object, compiles and runs on the base build: `3`, `4`, `PASS`, as the rung's walk prints. On the rung's build `fortress run SkS` stops with `NoSuchMethodError` on `fortress.CompilerBuiltin.coerce_ZZ32`: the worker's build emptied the worktree's caches and no library order was run after it, which a walk rung does not need; I ran none, as the brief asks.

## The reserved points, each by a program

- **A model line**: none in the diff.
- **A pair of the one library or of an existing test refused at load after and loaded before.** Fifty programs, one for each api of `Library/` but the compiler's own, `Executable` and `FortressLibrary`, and for `NatReflect` and `NativeArray`, each `import X.{...}` with a `run` that prints (`tmp/rung-walk-value-bound/skeptic/lib/scan.sh`). On the rung's build 48 print `loaded X`. The two others stop the same way on the base's code: `PrefixMap`, 'Overloading of BIG CUP ... fails because their parameter lists have the same types' on both, and `GeneratorLibrary`, 'Type name may refer to: CompilerAlgebra.StandardTotalOrder, FortressLibrary.StandardTotalOrder' on both. So no pair of the library changes; the existing tests are the worker's `ant testSystem`. The 52 demos and microGPT stay for the gather and the commit stage.
- **A change of which declaration a call runs.** SkK, SkF, SkV, SkH and SkJ load on both codes and print the same lines.

## Fixes

Both are corrections; no code changed, so nothing was built and no suite was run.

1. **5b29532ee5, two tests of readings the rung built without one.** (a) The clause of `returnRuleAtObjectArguments` for a type parameter fixed by a static argument (OverloadedFunction.java:892-894) and the reading at a mix of an object and a trait type (the worker's decision 5) had only scratch programs. `ProjectFortress/tests/GenericBesidePlainEveryInstanceWalk.fss` asserts both pairs and the declaration each call runs. (b) The value check also stopped an overloaded generic function whose own type parameter is bounded by a value object, at load; record.md said so of 'a function's own type parameter', which runs alone on the base. `ProjectFortress/tests/OverloadedGenericValueBoundWalk.fss` asserts it. Failing on the base's code: `FORTRESS_HOME=/home/user/fortress-base35 /home/user/fortress-base35/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-value-bound/skeptic/old-harness <the two files>`:

       T@.../OverloadedGenericValueBoundWalk.fss:6:1-40: non-value subtype of value type NN32
       Overloading of take(a:Source[\FortressLibrary.ZZ32\]):FortressLibrary.ZZ32 ... and take[\T\](a:Source[\T\]):T... fails the Return
       Tests run: 2,  Failures: 2,  Errors: 0

   Passing on the head: `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-value-bound/skeptic/h1 ProjectFortress/tests/GenericBesidePlainEveryInstanceWalk.fss ProjectFortress/tests/OverloadedGenericValueBoundWalk.fss`: `PASS`, `PASS`, 'OK (2 tests)'. record.md's finding 1 is narrowed to an overloaded function, finding 3 counts four kinds of pair, and the FACTS entry states the static-argument clause and names the two tests. Settled by: the Return Type Rule (Specification/advanced/overloading.tex:555-559) and that section's paragraph on instantiation exclusion.
2. **6b4c26456f, the Effect and a citation.** `Specification/appendices/changes.tex:2718-2720`: the Effect of `revival-expected-contexts`, to which the edited box points, named row 1019 alone for the places where walk keeps a generic function; it now names the declared return type and the field of an object, row 1036, in the box's words. The worker listed it for the curator and did not edit it because the section names the box alone; it argues nothing for the old sentence. Settled by the section's step 3 ('name the declared return type and the field of an object beside the immutable top-level variable') and row 1036. The path is outside the section's files and is a point to report. REPORT.md's problem line cited `number-object-merge.md:110`, obstacle 4; obstacles 5 and 6 are lines 111 and 112.

## Where I differ from the worker's account

- REPORT.md, points 4, and record.md as the worker left it count three kinds of a program's own pair whose verdict changes. There are four: the fourth is SkT's, now loading.
- REPORT.md's table row for `dup[\T extends NN32\]` reads as if a function's own bound stopped the base; it does so only beside another declaration of the name (SkW against SkX).
- The report's tables of stages: none, and none run by me.

## The three homes

Rows 997 and 998: home 1, the worker's two tests, with the two of fix 1. Rows 550 and 1036 and NEW-V-1: home 2, their `XXX` tests, each seen green as an expected failure in the worker's runs. NEW-V-2: home 3, a row; the refusal is held by `NonValueBelowValueTypeWalk`. SkG's pair: row 788, with its test.

## The failure-mode question

Three loud failures become quiet. A type parameter below a value type no longer stops: the call runs with the parameter at its bound, which the specification's value-trait rule does not forbid, since it speaks of declared subtraits and objects (Specification/basic/traits.tex, "Value Traits"), and the compiled path runs the same program. Two kinds of pair no longer stop at load (SkE's and SkT's): each is a valid overloading by the Return Type Rule, and the call runs the more specific declaration. No refusal that the rule makes was lost in my programs.

## For the curator

The worker's two questions stand: whether walk should refuse at an object type a more specific declaration that writes no return type (NEW-V-1), and what becomes of the team's `XXXNonValueOfValue.fss` (NEW-V-2). Its third, the Effect at changes.tex, is answered by fix 2.
