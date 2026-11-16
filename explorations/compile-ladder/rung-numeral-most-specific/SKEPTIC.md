# Rung N, `rung-numeral-most-specific`: the skeptic's check

Verdict: **approved**, with two commits of mine, neither contested. The head judged is `5e436b5b19`; the head after my commits and this file's is the branch's head.

The report's count and distance tables are those of the worker's head. I ran no count or distance stage after my fix; the gate's tables on the merged tree are the record.

## 1. What I checked

- **The report and record on the branch.** Both files were on the branch (`5e436b5b19`, `53588ec9b7`), so the journal tool wrote nothing.
- **The stages.** The worker's count and distance runs started at 01:11 and 01:13 UTC, after its last change of code (`8c1088c06c`, 01:05:35). Its tables read `#total 0`, `#locations 0`, `#crash none`, and `#total 0`, `#crash none`, `#seconds 181`, as the report says.
- **The count stage, my own run**, base build then the worker's head, one after the other, `explorations/coordinator/tools/checker-count/run.sh <out> <scratch>` with each tree's setup: base 83 s, head 87 s (the worker's: 116 s under load, 77 s). Both tables: `#total 0`, `#locations 0`, `#crash none`; `diff` of the two tables prints nothing; `diff` of the two `run.txt` files with each tree's path replaced by `TREE` prints nothing; my head table equals the worker's table before its second pass. The base build stands at `84f1c37190`; `git diff --stat 84f1c37190 db352c1776 -- ProjectFortress Library Specification` prints nothing, so its code is the base's.
- **Test first**, in the worker's first transcript. The compiled tests failed through the harness on the base's code at 00:17:21 (call `7Xt7ZT`: 'Ambiguous coercion in call to function mul', 'NoSuchMethodError ... \=k{...}(fortress.AnyType$Any)', three failures); the walk tests at 00:18:47 (call `bvQ43M`). The first edit of `Functionals.scala` is at 00:22:22, the first build at 00:23:55, the library edit at 00:25:44. The last passing run is the second launch's at 01:29 (calls `ei9K1r`, `FLAbsc`): 'OK (4 tests)' under walk; compiled, 'Tests run: 7, Failures: 1', the one failure the expected-failure test named without its link test, then 'Saw expected failure (Exit code != 0)', 'OK (2 tests)' with it. The assertions added after the failing runs (`width(1.5)`, a `ZZ32` typed `Any`) are guards that pass on the base; the report says so.
- **The diff**, line by line, against the section, P-46, P-49, P-173 and the coercion chapter. The checker's edit is inside `typedApplicationOfChecked` and `numeralTie`; nothing in `checkApplicableWithInference`, no signature changed, nothing from `Factory` on in `OverloadedFunction.java`. `git diff --name-only db352c1776...5e436b5b19` lists no file beyond the section's.
- **Names added**: `ownCoercionFrom`, `belowByNumerals`, `numeralAttempt`, `atDefaultType`, and the test names have no competing declaration in `ProjectFortress/src/com/sun/fortress/` or in the test folders.
- **The report's provenance lines**: each cited line opened; they say what the report claims (`Functionals.scala:824`, `OverloadedFunction.java:2329-2336`, `CoercionOracle.scala:85-88`, `Library/FortressLibrary.fss:100`, `:231`, `:1009`, `Specification/basic/conversions-coercions.tex:524`).

## 2. My programs, old code against new

Run with the rung's build and with the base build through `old-fortress.sh`, under walk and compiled on the prelude, at one thread; the two programs that reach walk's cache also at four threads, with the same output.

| the call | walk, base | walk, head | compiled, base | compiled, head |
|---|---|---|---|---|
| `k3(5)`, `k3` over `Any`, `NN32`, `ZZ64` | `any` | `nn32` | `NoSuchMethodError` | `zz64` |
| `kc(5)`, `kc` over `NN32`, `ZZ64` | `nn32` | `nn32` | `zz64` | `zz64` |
| `kz(5)`, over `Any`, `ZZ32`, `NN32` | `zz32` | `zz32` | | `zz32` |
| `kn(5)`, over `Number`, `RR64` | `number` | `rr64` | | `rr64` |
| `kr(5000000000)`, over `Any`, `NN32` | `any` | `any` | | `any` |
| `kr(-5)` as the first call | `any` | `any` | | `any` |
| `g(5)`, `g[\T\](x: T)` beside `g(x: NN32)` | `generic` | `generic` | | `generic` |
| `s2(1, 2)`, over `(Any, Any)`, `(ZZ64, ZZ64)` | `any` | `zz64` | | `zz64` |
| `s2(z, 0)`, `z: ZZ32` | `any` | `any` | `NoSuchMethodError` | `NoSuchMethodError` |
| `v(1.5)`, `v(5)`, over `Any`, `RR32` | `any` | `rr32` | | `rr32` |
| `O.m(5)`, dotted, over `Any`, `NN32` | `any` | `nn32` | | `nn32` |
| `u = 0`, `0 = u`, `case u of 0` | `false`, `false`, `other` | `true`, `true`, `zero` | | `true`, `true`, `zero` |

Under walk only (the prelude has no `QQ`): `kq(1.5)`, `kq(3)` over `Any` and `QQ` went from `any` to `qq`; `kq2(0.5)` over `Any`, `RR32` and `QQ` stays `any` (the report's decision 3); `kb(7)`, `kb(300)`, `kb(7)`, `kb(-7)` for a program's `Byte` answer `byte`, `any`, `byte`, `any`; `w = 0`, `w =/= 0` for an `NN64`, `h = 0.5`, `h =/= 0.5`, `y =/= 7`, `case y of 7` follow the rule; `l LSHIFT 3` is 8 and `x^2 = x x` on both codes. `SUM[\ZZ32\][i <- 0#400]` over a body that calls `y = 7`, `y = 300`, `u = 0`, `u =/= 0` and `k(5)` gives 400 at one and at four threads.

What the table shows beside the rule:

- `k3(5)` differs between the paths, and so does `kc(5)` on the base's code: the prelude's `ZZ64` declares no coercion from `NN32` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:578-579`), the one library's does (`Library/FortressLibrary.fss:882`), so on the prelude the two declarations tie and the default's reading takes `ZZ64`. It is the prelude's limit and ends at the switch-over; no defect of the rung.
- `s2(z, 0)` compiled is row 390's value case, which stays (fork N4).
- `x: ZZ32 = id2(5)` for `id2(x: Any): ZZ32` beside `id2(x: NN32): NN32` ran under walk on the base and now stops, 'RHS expression type NN32 is not assignable to LHS type ZZ32'; the checker refuses the pair of declarations on both codes ('the return type of NN32->NN32 ... should be a subtype'), so the program is not valid.
- `(u, 0) = (0, u)` is `false` under walk on both codes: a numeral inside a tuple is not an argument of the call (rows 395 and 511).

## 3. Findings and fixes

### 3.1 A defect of the change, fixed: walk's dispatch cache gave a negative constant a numeral's key

The section asks that "the dispatch cache's keys tell apart what the rule tells apart" (`explorations/coordinator/CLIMB-BATCH-32.md:620`). The rule tells a negative constant, which no unsigned type takes, from a numeral; the key did not (`Numerals.rangeKey`). On the worker's head, under walk:

    kr(5) nn32 5
    kr(-5) nn32 4294967291          (kr over Any and NN32; as the first call kr(-5) is any)
    (u = 3) false
    (u = -3) true                   (u: NN32 = 4294967293)
    ks(u, -1) any
    ks(u, 1) any                    (ks over (Any, Any) and (NN32, NN32); alone ks(u, 1) is nn32)

On the base's code the same key already gave `(z < 1) true`, `(z < -1) true` and `z + (-1)` 4294967295 after `z + 1`, for a zero `z: NN32`, at declarations that a numeral reaches only by coercion; the rung's rule carried it to every declaration beside one over `Any`, `=` among them, where the base answered `false`.

- The test: five assertions added to `ProjectFortress/tests/NumeralMostSpecificWalk.fss`. On the worker's head, through the harness, at 2026-11-16T03:36:28Z: `explorations/compile-ladder/rung-inference-walk/harness-one.sh <dir> ProjectFortress/tests/NumeralMostSpecificWalk.fss` printed 'FAIL: J4/0:nn32 =/= J3/0:any; a negative constant is no NN32: after k(5) it still runs the declaration over Any', 'Tests run: 1,  Failures: 1,  Errors: 0'.
- The fix: `rangeKey` gives a negative integer constant the pair of its range key (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java`). Ways listed: a fifth element in the key, which changes the key's shape for every numeral; leaving such a call out of the cache, as the rung does for a program's own coercion, which slows every call with a negative constant; a key of its own for the sign, taken. Built with `ant compileAll` ('BUILD SUCCESSFUL'; the tree's caches started again, empty, so its compiled library is not built now).
- After: the same harness on the rung's four walk tests, 'OK (4 tests)'. `ant testSystem`, once, on the fix: 'Tests run: 209', '211', '206', '207', each 'Failures: 0, Errors: 0', 'BUILD SUCCESSFUL', 'Total time: 4 minutes 20 seconds'. microGPT's quick checks, `explorations/coordinator/tools/mg-run.sh <dir> skeptic`: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' for both programs. A program of my own after the fix: `O.m(5) nn32; O.m(-5) any; O.m(5) nn32`, `kr(5) nn32 5; kr(-5) any; kr(7) nn32 7`, `kl(5000000000) nn64 5000000000; kl(-5000000000) any`, `z < -1 false`.
- Commit `0af1421748`. Settled by the section's sentence quoted above. Home 1: the assertions.

### 3.2 A defect of the change, deferred with its test and row: a numeral beside a bare type parameter

`g(5)` for `g[\T\](x: T)` beside `g(x: NN32)` runs the generic declaration on both paths, on the base and on the head. The coercion chapter as the rung revised it gives the `NN32` declaration: a type parameter without a bound fixes no type, the numeral is applicable to `g(x: NN32)` by its coercion, and that declaration is the more specific "on the parameter types they declare" (`Specification/basic/conversions-coercions.tex`, section "Principles of Coercion"). Both paths look for a declaration below the fitting one only where the fitting one has the numeral at a parameter that is not of its default type, and read the instance's parameter type, `ZZ32` (`Functionals.scala:827-831`; `OverloadedFunction.java:2378-2385`). Under walk a varargs parameter does the same: `va(5)` for `va(xs: Any...)` beside `va(x: NN32)` prints `anys`.

I did not repair it: the repair reads declared parameter types in the checker's test for every call with a numeral at a generic declaration, a change of the checker's hot path that owes the count and distance stages and P-148's timing, which a skeptic's fix does not run. It changes no call of the rung's section, no library overload set (the report's list finds a bare type parameter only beside `ZZ32`), and no model line.

- Home 2: `ProjectFortress/tests/XXXNumeralBesideTypeParameterWalk.fss`, which asserts `nn32`. Through the harness as it is: 'OK (1 test)'; with its expected answer set to `generic` for one run: 'Expected failure or exception, saw none', 'Tests run: 1,  Failures: 1'; then restored.
- The row NEW-N-2 in `record.md`, and one sentence in the Effect of `revival-numerals` (`Specification/appendices/changes.tex:5312-5320`) beside the worker's sentence on NEW-N-1. I did not build the specification after that sentence; it uses the macros of the sentences around it, and the gather builds it once.
- `record.md`'s FACTS entry gains the sentence on the cache key.
- Commit `c40328220c`.

### 3.3 Where I differ from the report, without a change

- Section 2 of the report gives the second launch's compiled run as "6 tests with no failure". The call printed 'Tests run: 7,  Failures: 1', the failure being the expected-failure test run without its link test; the next call shows it green. The worker's returned account says this; the report's sentence leaves the first line out.
- Section 9 calls the dotted method's answers "not defects". With my fix they hold for a negative constant too (above).
- The sentences of section 8, which the change makes false, stand unchanged in the specification. The new text of "Principles of Coercion" points to "Coercion Resolution" for the numeral's exception, and that section's opening and its callout `revival-overloading` still say that no coercion changes the choice (`Specification/basic/conversions-coercions.tex:526-529`, `:544-547`). The gather owes them.

## 4. The failure-mode question

- Compiled `k(5)`: a `NoSuchMethodError` at run time became the value `nn32`, the rule's answer.
- Compiled `mul(1.0, f)`: the static error 'Ambiguous coercion' became `rr64`, fork N2's answer. `numeralTie` now runs for every tie of a call with a numeral; it still gives none where the default's reading fits two tied declarations alike, so a tie that a value's coercions make stays an error unless the numeral's default tells the declarations apart.
- Walk `u = 0`, `u =/= 0`, `case u of 0`, `y = 7`: a quiet wrong value became the right one. `y = 300` for a `Byte` is a quiet `false`, the report's decision 6; the checker on the prelude refuses `300` at `Byte` where the place fixes the type, and what it answers for `y = 300` against the one library is not measured.

## 5. The homes

- Rows 973, 966, 975, 976, 989 and row 390's numeral case: home 1, the worker's tests.
- Walk on a value typed `Any` or `Number`: home 2, `tests/XXXNumeralBesideAnyWalk.fss`, row NEW-N-1 (`m = 0` for `m: Number` answers `true` in my run, the same defect).
- The cache key: home 1, my assertions.
- The bare type parameter: home 2, my expected failure, row NEW-N-2.

## 6. Verdict

Approved. The rule is built as P-46 states it for the cases the section names, on both paths; with the cache key repaired, walk's answer no longer depends on the calls that ran before. One narrower corner is recorded and deferred (3.2).
