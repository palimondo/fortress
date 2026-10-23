# Rung S of climb batch 21: the symbolic operators' library fixes

- problem: the full check of symbolic operators on the base, 191 errors, 54 of them cleared by the known library fixes (F-245; `explorations/compile-ladder/plan-21/probes/full-check-base.tsv:169`, String's `||` in String's api, one of 40 family sites); rows 585 and 784: `explorations/fortress-gap-ledger.md:785`, `:805`
- spec: two functional methods whose `self` parameters stand at different positions must satisfy the Subtype Rule or the Incompatibility Rule, so no meet can make String's `(a:Any, self)` beside `(self, b:Any)` valid: `Specification/advanced/overloading.tex:518-523`
- precedent: juxtaposition's three top-level operators at `(Any, String)`, `(String, String)` and `(String, Any)`: `Library/FortressLibrary.fss:4491-4493` (base `:4476-4478`), api `Library/FortressLibrary.fsi:2525-2527`
- deviation: the `||` of two strings reaches the string objects' own `||` by a `typecase`, where juxtaposition's `(String, String)` calls `a || b`: `Library/FortressLibrary.fss:4461-4466`
- deviation: String's api states `Concatenable`'s and `EmptyString`'s three `||`, which the api did not state, so that the meet's `typecase` reaches them from `FortressLibrary`: `Library/String.fsi:17-19`, `:29-31`
- historical: Library/FortressLibrary.fsi, Library/FortressLibrary.fss, Library/String.fsi, Library/String.fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss

Branch `wip/rung-symbolic-library`, cut from `00f2e1bdc`, seeded from `/home/user/fortress-base21` (the seeding script exited 0; the base build is at `aa5ff2423`, whose code is `00f2e1bdc`'s: `git diff --stat aa5ff2423 00f2e1bdc -- ProjectFortress Library build.xml` lists only files under `explorations/perf-probes/self-type-exclusion/`), pushed. Commits: `c6d57500d` (the walk guard), `34747e082` (the library and the respelled expected failure). The harness refused the worker's write of this file ("Subagents should return findings as text"); its text is the rung's result.

## 1. What changed, and why

The library, by the symbolic-operator probe's generators on this tree, `python3 -I explorations/perf-probes/symbolic-operators-2/known-fixes.py <tree> empty str4 eq abshead maybeidx vecops floatpow` ('empty str4 eq abshead maybeidx vecops floatpow: 27 edits in 5 files'), taken as written but for the doc comments (decision 1):

- **String's four concatenation families (row 585).** `||`, `|||`, `//` and `///` leave String's trait, where each paired `(a:Any, self)` with `(self, b:Any)` (base `Library/FortressLibrary.fsi:2496-2522`, `.fss:4398-4443`), and become three top-level operators each, at `(a:Any, b:String)`, `(a:String, b:String)` and `(a:String, b:Any)`, with today's bodies (`Library/FortressLibrary.fsi:2501-2522`, `.fss:4458-4488`). String's abstract `opr ||(self, b:String)` goes too, since beside it the top-level family would mix a function with a functional method at one name, which row 545 refuses. The meet `opr ||(a:String, b:String)` dispatches by `typecase` to `FlatString`'s or `Concatenable`'s own `||`, else `concatAndBalanceIfNecessary` (`.fss:4461-4466`), and String's api now states `Concatenable`'s and `EmptyString`'s three `||` (`Library/String.fsi:17-19`, `:29-31`) so that `FortressLibrary`, which imports `String.{...}`, sees them (F-249). String keeps its other `||` members (`Number`, `Char`, `()`, the tuples; `fsi:2480-2486`) and the prefix `//` and `///`.
- **EmptyString's meet (row 611's library half):** `opr || (self, _:EmptyString): String = self` (`Library/String.fss:318`).
- **`=` (row 784):** `Integral`'s `opr =(self,b:I):Boolean`, bodiless as its other operators, in api and component (`Library/FortressLibrary.fsi:452`, `.fss:702`), the meet of `Number`'s `=` and `StandardPartialOrder`'s; `ZZ`'s api states the `opr =(self, b: ZZ)` its component declares (`fsi:655`).
- **`|_|` (row 784, review list item 1):** String's api header extends `DelegatedIndexed[\Char,ZZ32\]` as its component does (`fsi:2424` against `.fss:4329`); `Maybe`'s meet `opr |self| : ZZ32` in api and component (`fsi:981`, `.fss:1631`, restating `Condition`'s body at `.fss:1531`); `Float`'s `opr |self|` answers `RR64` where it wrote `Number` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:79`).
- **Maybe's subscript:** the meet `opr [i:ZZ32]:T throws NotFound` in api and component (`fsi:982`, `.fss:1632`, `Condition`'s body).
- **The api's six top-level `Vector` and `Matrix` `+` and `-` (row 784)** leave the api (base `fsi:1654-1661`, `:1764-1771`); the component never defined them.
- **`^` (review list item 3):** `Float`'s meet `opr ^(self, b:RR64):RR64`, the native `Float$Pow` (`FortressBuiltin.fss:158`).
- **Fork 5:** `ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss`'s traits `S` and `T` exclude `String` (`:6`, `:9`), so walk loads the program again and the test keeps its subject and its key (section 3).

The doc comments: the generator left the team's `|||` doc comment orphaned inside String's trait in both files, and wrote a rationale comment over the new block. The `||`, `|||`, `//` and `///` comments now stand over the top-level families (`fsi:2501-2522`, `.fss:4458-4488`); String's own `||` comment stays over its remaining `||` members, and the component's long `//` and `///` comments over the prefix forms.

## 2. The tests: the failing run and the passing runs

**The full-check stage is the rung's test** (the brief, section S, "Distance sites"; fork 3). Its before is the planner's table on this base, `explorations/compile-ladder/plan-21/probes/full-check-base.tsv`, not run again here (POSITIONS, "No re-measuring what the record holds."). Its lines for String's `||` in String's trait, api and component (`full-check-base.tsv:169`, `:176`):

    overloading	||	same-sparams	api FortressLibrary	overloading	FortressLibrary.fsi:2502,FortressLibrary.fsi:2503	Invalid overloading of || in trait String: (Any, String)->String @ FortressLibrary.fsi:2502:5-30 and (String, Any)->String @ FortressLibrary.fsi:2503:5-2507:82
    overloading	||	same-sparams	component FortressLibrary	overloading	FortressLibrary.fss:4411,FortressLibrary.fss:4412	Invalid overloading of || in trait String: (Any, String)->String @ FortressLibrary.fss:4411:5-50 and (String, Any)->String @ FortressLibrary.fss:4412:5-4416:82

with its total, by the planner's run (`explorations/coordinator/CLIMB-BATCH-21.md:122`): '#total 191', '#kind overloading 182', 'return-type 1', 'typecheck 4', 'export 1', 'other/overloading 3'.

The after, once, on the final tree (`34747e082`), started 14:51:31Z:

    explorations/perf-probes/symbolic-operators-2/run-shadow.sh tmp/rung-symbolic-library/full-check-postedit.tsv tmp/rung-symbolic-library/fc-post catch
    #total	137
    #kind	overloading	132
    #kind	typecheck	4
    #kind	export	1
    #crash	none
    #seconds	242	FortressLibrary 171

with the three `@@PROBE CRASH` lines of the `AnyList` crash caught, on `||` in `List`'s api and component and `String`'s component ('E is not in the kind env'), as on the base. Compared:

    python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/plan-21/probes/full-check-base.tsv tmp/rung-symbolic-library/fc-post/d/errors.tsv
    landed 191 now 137

with 53 `GONE` lines (one of them `x2`), so 54 sites gone, and no site come. Section 4 gives them by family.

**The walk guard**, `ProjectFortress/tests/StringConcatenationFamiliesWalk.fss`: each of the four families with a string on either side and on both, beside a number, a character, `()`, a pair and a triple; `EmptyString` on each side of `||`; that `"ab" || "cd"` is flat, depth 0 (F-249's concern: a meet with `Concatenable`'s body gave a `CatString`); the line separators read through the library's postfix `//` and `///`. It guards behaviour that works, so it has no failing run (`tests-writing.md`, "The order"). On the base's code, before the library edit (14:47:14Z):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-symbolic-library/h1 ProjectFortress/tests/StringConcatenationFamiliesWalk.fss
    # harness-one 2026-10-23T14:47:14Z; tree 00f2e1bdc; nproc=4; load 0.96 0.77 1.89; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled
     OK (time = 3855ms)
    OK (1 test)

It went red with one expected value changed for one run, in a copy under `tmp/` with `"(1,2,3)a"` for `"(1,2,3) a"`: 'Tests run: 1,  Failures: 1'. After the edit (14:50:15Z), in one call with the expected failure:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-symbolic-library/h1 ProjectFortress/tests/StringConcatenationFamiliesWalk.fss ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss ProjectFortress/tests/XXXFunctionalMethodMeetOperator.test
    . interpret tmp/rung-symbolic-library/h1/tests/StringConcatenationFamiliesWalk 
     OK (time = 10154ms)

and green again in `ant testSystem` (section 8).

## 3. XXXFunctionalMethodMeetOperator (fork 5)

On the base (14:47:43Z), `harness-one.sh ... XXXFunctionalMethodMeetOperator.fss XXXFunctionalMethodMeetOperator.test`: 'Vo || 3 = 1', 'Saw expected failure: loaded and ran, not refused at load', 'OK (1 test)'.

With the library edit and the test unchanged (14:50:15Z, the call above), red:

     Refused at load, but did not satisfy load_exception_contains; expected
    Invalid overloading of ||
    com.sun.fortress.exceptions.ProgramError: com.sun.fortress.exceptions.ProgramError: Library/FortressLibrary.fss:4467:1-4471:78: and
    tmp/rung-symbolic-library/h1/tests/XXXFunctionalMethodMeetOperator.fss:10:3-33:
    first parameters a:[String,Any] and self:[T,ZZ32] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present

The pair is the library's new `opr ||(a:String, b:Any)` (`.fss:4467`; the span runs on over the doc comment after it) beside the test's `opr ||(self, b: ZZ32)` in trait `T`. By the Meet Rule the refusal is right: `T` and `String` can meet, and no declaration covers `(String & T, ZZ32)`. With the default, `trait S excludes { String }` and `trait T excludes { String }` (14:50:39Z):

    harness-one.sh $PWD/tmp/rung-symbolic-library/h1 ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss ProjectFortress/tests/XXXFunctionalMethodMeetOperator.test
    Vo || 3 = 1
     Saw expected failure: loaded and ran, not refused at load
    OK (1 test)

The test keeps its subject (an object inheriting two symbolic operators with no meet, which walk's meet check skips: row 611) and its key, `load_exception_contains=Invalid overloading of ||`. The red run above shows that the harness reads the key. The rule this exposes: under walk, a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` now needs `excludes { String }` or a meet. A grep of the walk tests, `test_library/`, the specification's examples, the demos and both microGPT programs for a declaration of one of the four operators (`grep -rln 'opr *\(||\|||| *\|//\|///\) *(' ProjectFortress/tests ProjectFortress/test_library SpecData ProjectFortress/demos explorations/run-c4/src explorations/apl/mg`) prints only this test.

## 4. The stages

**The full check, site by site** (section 2's comparison). Gone, 54, none come:

| Family | Sites gone | Where |
|---|---|---|
| String's four (row 585) | 40 | each of `\|\|`, `\|\|\|`, `//`, `///`: String's trait in api and component, `CatString`, `EmptyString`, `FlatString`, `SubString`, `Balanceable`, `Concatenable`, the api's and the component's top-level sets |
| EmptyString's `\|\|` (row 611) | 1 | `String.fss`, `(Concatenable, EmptyString)` beside `(EmptyString, String)` |
| `=` (row 784) | 4 | `BigNum`, `Integral` (api and component), `ZZ` |
| `\|_\|` | 4 | `FlatString`, `SubString` (row 784, by the header), `Maybe` (row 784), and the return-type error of `Float`'s `\|self\| : Number` (row 784) |
| Maybe's subscript (row 784) | 1 | `_[_]`, `Condition` beside `Indexed` |
| The api's Vector and Matrix `+` and `-` (row 784) | 3 | 'Overload violation: the declaration of top-level function + ... is more specific than the declaration of the functional method +', and `-` twice |
| `^` | 1 | `Float`: `(RR64 & {Float, FloatLiteral}, RR64)` beside `(Float, Number)` |

Row 784's 11 are the vectors' 3, the `=`'s 4, `SubString`'s and `Float`'s `|_|`, and `Maybe`'s two meets. What stays, by the stage's errors list: 106 `_[_]` and 18 `_[_]:=` sites (rung B), 4 `+` and 4 `-` sites (the vectors' scalar block, rung X), and the gate's 5. String's export entry (in the stage's one export error) loses "different extends clauses": before '(TraitDecl String at FortressLibrary.fsi:2438.1, due to different extends clauses, missing members of the trait/object in the component, ...)', after '(TraitDecl String at FortressLibrary.fsi:2424.1, due to missing members of the trait/object in the component, due to missing members of the trait/object in the component, Asbtract method size @ FortressLibrary.fss:4331:5-24 is not declared in the API, different excludes clauses for traits)'; the export error keeps its 43 entries.

**The count stage**, once (14:51:33Z to 14:53:08Z by its files' times, 95 s, beside the full-check stage; nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz, load 0.32 at start, openjdk 25.0.4.1, `FORTRESS_THREADS=1`):

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-symbolic-library/checker-count-postedit.txt tmp/rung-symbolic-library/cc-post
    diff explorations/compile-ladder/climb-batch-20/gate/checker-count.txt tmp/rung-symbolic-library/checker-count-postedit.txt

The diff prints nothing: every api 0, '#total 3', '#locations 3', '#crash none'.

**The distance stage**, once (started 14:54:14Z, '#seconds 228 FortressLibrary 160', load at start 1.95):

    explorations/coordinator/tools/distance/run.sh tmp/rung-symbolic-library/distance-postedit.txt tmp/rung-symbolic-library/dist-post
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-20/gate/distance.txt tmp/rung-symbolic-library/distance-postedit.txt
    DISTANCE SAME   5

'#total 5', 'typecheck 4', 'export 1', '#crash none'. Site by site, `tmp/rung-symbolic-library/dist-post/errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv` row by row (row 577): the same five, by kind, location and message; `FortressLibrary.fss:4386` and `:4392` (`BIG MIN`) now `:4389` and `:4395`, +3 past `Integral`'s `=` at `:702` and `Maybe`'s two meets at `:1631-1632`; `:1465` now `:1466`, +1 past `:702`; `List.fss:146` unchanged; `compare-sites.py` 'landed 5 now 5', the export error's 43 entries kept, String's narrowed as in the full check. No site moved in either stock stage but by line.

No checker code changed, so no timing pair and no speed pass (the brief, section S).

## 5. Where the fix belongs, and the precedent search

The defect is in the interpreter's library: the declarations of `String` and the scalar block in `Library/FortressLibrary.fsi` and `.fss`, `String`'s objects in `Library/String.fsi` and `.fss`, `Float` in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` (`explorations/coordinator/map/spec-to-implementation.md:330`, the `String` row; `:276`, operator declarations are ordinary functional methods). Neither the checker nor walk changes: the full check reads the library as written.

The precedent search:

- **Juxtaposition's three top-level operators** (`Library/FortressLibrary.fss:4491-4493`), the library's device for the same shape: the team declared `opr juxtaposition(a:Any, self)` beside `opr juxtaposition(self, b:String)` in String (`git show a874948ac:Library/FortressLibrary.fss`, lines 4047-4049), and `0ae526b31` ("String's juxtaposition becomes three top-level operators") made them top-level. Followed.
- **The other sites of the same defect in the file**: `grep -n 'opr.*(a:Any, self)' Library/FortressLibrary.fsi` on the base prints four lines, `:2502`, `:2510`, `:2516`, `:2522`, the four families; a grep of every api for a functional method with `self` second (`grep -n 'opr[^(]*([a-z_]*:[^,]*, *self)' Library/*.fsi ProjectFortress/LibraryBuiltin/*.fsi`) finds besides them only `IN`, `NOTIN` and `MATCH` families, whose every member has `self` second. All four sites are repaired.
- **FlatString's pair** (`4190069c4`, F-259): the earlier repair of the same family dropped `opr ||(a:FlatString, self)`; its bodies over `Any` (`("" || a)`, `cast[\Object\](b).asString`) are kept here.
- **Meets in the library's style**: `Maybe`'s two restate `Condition`'s bodies (`.fss:1531-1532`), as the library's meets restate an inherited body (F-81); `Integral`'s `=` is bodiless like its other operators (`.fss:701-708`); the header follows `FlatString`'s api, which extends `DelegatedIndexed[\Char, ZZ32\]` as its component does (`Library/FlatString.fsi:16`).

The ways the language and the library offer are in decision 2.

## 6. What the specification settles

`Specification/advanced/overloading.tex:518-523`: "Two declarations which differ in the position of the self parameter must satisfy either the Subtype Rule or the Incompatibility Rule to be a valid overloading." So no meet repairs `(a:Any, self)` beside `(self, b:Any)`, and a top-level function beside a functional method is judged by the Meet Rule for functions (`:526-530`). The meets elsewhere follow the Meet Rule for Functional Methods (`:469-516`). The specification has no strings chapter (`ls Specification/basic-lib/`); `Specification/advanced-lib/algebraic-constraints.tex:1352-1356` says the empty string is the identity of `||`, which the guard asserts.

## 7. Programs run old against new

- `StringConcatenationFamiliesWalk.fss`: green on the base's code (section 2) and after the edit, every value the same (it asserts them).
- `XXXFunctionalMethodMeetOperator.fss`: 'Vo || 3 = 1' and 'Saw expected failure' on the base; refused at load with the edit and the test unchanged; 'Vo || 3 = 1' and 'Saw expected failure' with the edit and the respelled test.
- `ProjectFortress/tests/expTest.fss` on the compiled path (section 9): on the old code, `old-fortress.sh /home/user/fortress-base21 <tree>/tmp/rung-symbolic-library/old-caches compile tests/expTest.fss` prints 'expTest.fss:25:13-18: Variable asFloat is not defined.' and 'File expTest.fss has 2 errors.', the same as the ladder's run on the new code.

## 8. The suites

- `ant testSystem`, once, on `34747e082` (started 14:57:28Z): 'BUILD SUCCESSFUL', 'Total time: 4 minutes 53 seconds'; the four shards 'Tests run: 162, Failures: 0', '172, Failures: 0', '165, Failures: 0', '170, Failures: 0': 669 tests, 0 failures, the landed sum 668 (`explorations/compile-ladder/climb-batch-20/gate/summary.txt`) plus the guard. 'Caches /home/user/fortress-symlib/default_repository/caches kept'.
- `ant testSpecData`, once (started 15:02:38Z): 'Tests run: 130, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL'.
- The compiled tracks: no compiled test imports an edited api (`grep -l -E '^\s*import\s+(String|FortressLibrary|FlatString|List|PureList|Maybe)\b' ProjectFortress/compiler_tests/*.fss ProjectFortress/library_tests/*.fss ProjectFortress/other_compiler_tests/*.fss` prints nothing), and the compiled path's prelude is untouched; the gate runs them (`tests-running.md`, "When to run a whole suite").

## 9. The ladder subset

The drivers copied under `tmp/rung-symbolic-library/ladder/` as `gate.md`, "The ladder regression", step 1 gives, with copies of the tree's caches. The baseline's `raw/` holds only the 85 programs that pass, with no first error, so the subset is taken from the baseline's `ladder.tsv` (410 programs): each whose first error names an operator or a type the change touched (`Integral`, `String`, `Matrix`, `operator =`, `operator -`, `operator ^`), 15 files: `BitTwiddle`, `EqualityOverloadBug`, `GS3`, `OverloadConstructor2`, `OverloadConstructor3`, `TupleBinding`, `TupleBinding2`, `XXXAsExpr`, `XXXTypeError`, `XXXmutation1`, `XXXmutation2`, `buffons`, `expTest`, `ho`, `transposition`. None is among the gate's 85, so each is compared with the baseline's `ladder.tsv` row: 14 have the same phase and first error. `expTest.fss` moved from 'typecheck, Could not check call to operator ^' to 'disambiguate, Variable asFloat is not defined.', but the old code gives the same (section 7): `d846e3644` respelled the test to `asFloat`, which the compiler's prelude lacks (row 442's kind). It is not a move of this change.

The eighteen microGPT components, the same drivers' phase step: `diff <(mg_phases explorations/compile-ladder/climb-batch-20/gate/ladder/microgpt-phase.md) <(mg_phases tmp/rung-symbolic-library/ladder/microgpt-phase.md)` prints nothing; every component stops at disambiguate with the landed first error ('Array is undefined.', 'DelegatedIndexed is undefined.', 'Vector is undefined.' and the rest).

## 10. The sentences the change makes false

In `Specification/`: none. `grep -rn -i 'string' Specification --include=*.tex | grep -v library/apis | grep -i 'concat\|opr *||\|method'` finds the passages on `||` as an operator (`Specification/basic/expressions/constant.tex:82-88`, `Specification/advanced-lib/algebraic-constraints.tex:1352-1356`, `Specification/basic/operators/intro.tex:70`, `Specification/preliminaries/overview.tex:609-611`), none of which makes the families String's methods; Appendix I cites none of rows 585, 611 and 784 (`grep -rn 'row~\?585\|row~\?784\|row~\?611' Specification/` prints nothing). Part IV renders `FortressLibrary.fsi` (`Specification/library/default-libraries.tex:27`), so its listing changes with the api (section 11), with no edit.

In the record, for the gather:

- F-245: "54 clear by known library fixes" (`explorations/coordinator/FACTS.md:104`): they are cleared; the full check now gives 137.
- F-81: "`String`'s `||`, `|||`, `//` and `///` keep the shape that the specification refuses, `(a:Any, self)` beside `(self, b:Any)`, unseen while the checker skips them (row 585)" (`FACTS.md:75`).
- F-249's title, "Under walk, a program that imports only the prelude reaches the string objects' own `||` only through `String`'s abstract `opr ||(self, b:String)`" (`FACTS.md:174`): the abstract is gone; the route is the top-level meet's `typecase`.
- F-259: "`String`'s two `||` members over `Any`", "`opr ||(a:Any, self)` is `("" || a) || self` and `opr ||(self, b:Any)` is `self || cast[\Object\](b).asString`" (`FACTS.md:179`): they are now the top-level `opr ||(a:Any, b:String)` and `opr ||(a:String, b:Any)`, with those bodies.
- Rows 585 and 784's claims (`explorations/fortress-gap-ledger.md:785`, `:805`), and row 611's "the rule breaks at five library sites: `EmptyString`'s `||` ..." (`:787`).

## 11. Points to report

- **The generators' text: taken, with the doc comments moved** (decision 1); `Library/FortressLibrary.fsi:2501-2522`, `.fss:4458-4488`.
- **The full-check tables**: 191 to 137, 54 gone site by site (section 4), none come; the stock count 3 to 3 (the diff empty) and the distance 5 to 5 ('DISTANCE SAME 5', the same five sites), String's export entry without "different extends clauses".
- **The count stage's seconds**: 95 s, beside the full-check stage (section 4).
- **XXXFunctionalMethodMeetOperator**: walk refused it for `opr ||(a:String, b:Any)` beside its `T`'s `opr ||(self, b: ZZ32)`; its traits now exclude `String` (`ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss:6`, `:9`); green again with its key. The rule: under walk a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` needs the exclusion; no other test, example, demo or microGPT file declares one (section 3).
- **Walk values and tests**: no walk value moved (the guard on both codes; `ant testSystem` 669, 0 failures; `ant testSpecData` 130, 0). The one test whose verdict changed is `XXXFunctionalMethodMeetOperator`, before its respelling.
- **The api's declarations that leave, join or change, and so Part IV**: String's `||(self, b:String)`, `||(a:Any, self)`, `||(self, b:Any)`, its three `|||` and its binary `//` and `///` leave String's trait, and twelve top-level `||`, `|||`, `//`, `///` join (`fsi:2501-2522`); the six top-level `Vector` and `Matrix` `+` and `-` leave (base `fsi:1654-1661`, `:1764-1771`); `Integral` gains `opr =(self,b:I):Boolean` (`fsi:452`), `ZZ` `opr =(self, b: ZZ):Boolean` (`fsi:655`), `Maybe` `opr |self| : ZZ32` and `opr [i:ZZ32]:T throws NotFound` (`fsi:981-982`); String's header gains `DelegatedIndexed[\Char,ZZ32\]` (`fsi:2424`). In String's api, which Part IV does not render, `Concatenable` and `EmptyString` gain three `||` each (`Library/String.fsi:17-19`, `:29-31`).
- **Sentences made false**: section 10; none in the specification's text.
- **Ladder, compiled tests, examples, microGPT**: no ladder file of the subset, no microGPT component and no specification example changed its verdict, phase or first error by this change (sections 8, 9); `expTest`'s move against the 2026-09-19 baseline predates it.
- **Files beyond those named; the checker, walk's Java, the index parameters**: none. The files edited are the brief's: `Library/FortressLibrary.fsi` and `.fss`, `Library/String.fsi` and `.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, and in `ProjectFortress/tests/` the guard and `XXXFunctionalMethodMeetOperator.fss`.

None holds the push: each is reversible and acts against no decision.

## 12. Decisions

1. **The generators' text, with the doc comments moved.** Chosen: the seven generators' edits as written, but the team's doc comments for `||`, `|||`, `//` and `///` placed over the top-level families, the orphaned `|||` comment taken out of String's trait in both files, and the generator's rationale comment ("two functional methods with self at different positions have no meet") left out. Not taken: the generators' text as is, which leaves the `|||` comment over nothing in String's api, where Part IV renders it (`Specification/library/default-libraries.tex:27`), and puts the rationale in a source comment (`committing.md`: provenance and rationale go in commit messages and reports); no comments at all. Evidence: the full check and both stock stages measured on this text gave the probe's figures (section 4), so the comments move no site.
2. **Top-level operators for the four families** (fork 4; P-27; item 59). Not taken: (a) a meet: the Meet Rule for functional methods requires one `self` position (`overloading.tex:518-523`); (b) `self` on the left only, as the compiler's prelude declares them (row 316): `1 || "a"` would fail, which `ConcatAnyOnLeftWalk.fss` and the guard assert; (c) top-level operators beside String's abstract `opr ||(self, b:String)` as the `(String, String)` case: a function family mixed with a functional method, which both paths refuse (row 545; row 585's notes).
3. **The `(String, String)` meet by `typecase` to the objects' own `||`** (the generator's). Not taken: `Concatenable`'s body, way J, which made `"s" || "t"` a `CatString` of depth 1 (F-249); `a || b` as juxtaposition's `(String, String)` writes it, which for a string object that is neither a `FlatString` nor a `Concatenable` reaches the meet again, where the `typecase`'s `else` arm calls `concatAndBalanceIfNecessary`. Evidence: the guard's `("ab" || "cd").depth` is 0 on both codes.
4. **`|_|` by String's api header** (the review list's item 1, `abshead`). Not taken: `abs`, api lines for `SubString`'s and `FlatString`'s `|self|`. Evidence: the probe's equal 132 sites for both; here the header also takes "different extends clauses" out of String's export entry (section 4).
5. **Fork 5's default: the test's traits exclude `String`.** Not taken: promoting or deleting the test (walk's meet check still skips symbolic operators, so the defect stands); changing its key to the new message (it would then test walk's refusal of a pair the rules refuse, not row 611's gap); renaming its operator to a word (walk checks those, so the expected failure would go). Evidence: section 3.
6. **The ladder subset from the baseline's `ladder.tsv`**, since its `raw/` holds no first error: the 15 files whose first error names an operator or type the change touched, `String` read widely. Not taken: an empty subset. Evidence: section 9.
7. **The guard's details**: `EmptyString` imported by name (`import String.{EmptyString}`) to put the empty string object itself on each side of `||`; the line separators read through the library's postfix `//` and `///`, written `(""//)` and `(""///)` (the spaced `("" //)` gave 'Syntax Error'), not as `"\n"` literals, since `newline` is the platform's separator (`Library/String.fss:568-569`); the variable for `()` is `void`, since `unit = ()` gave 'Syntax Error'.
8. **microGPT's quick pair not run**: the rung's tests do not ask for it; the planner ran it on this text but the comments (`CLIMB-BATCH-21.md:131`), and the batch's commit stage runs it.
9. **Row 611: both a note and a rewrite line in record.md**: the section asks for a note; the row's claim of library sites no longer holds, which by the brief's role text calls for the row's whole new line. The gather chooses.
10. **Row 584's note gives 54, not the brief's 62**: with this rung alone the 8 vector sites outside the subscripts remain, for rung X (the stage's errors list: 4 `+` and 4 `-`).

## 13. Defects and their homes

- **Row 585**, String's four families: home 1, repaired; its tests the full-check stage (40 sites gone) and `StringConcatenationFamiliesWalk.fss` (walk's values kept).
- **Row 784**, the five slips: home 1, repaired; the full-check stage (11 sites gone).
- **Row 611's library half**, `EmptyString`'s `||`: home 1, repaired; the full-check stage (its site gone). Its walk half, walk's meet check skipping symbolic operators: home 2, its gated expected failure `XXXFunctionalMethodMeetOperator.fss`, kept.
- **`FlatString`'s `|_|`** (F-245's +1) and **`Float`'s `^`** (the one `^` site left after P-153): home 1, repaired; the full-check stage. Neither has a row.
- **The `AnyList` crash**, three caught crash lines in the full check: not this rung's; rung C's planned row (NEW-C-1).
- **`expTest.fss` on the compiled path**, 'Variable asFloat is not defined.': not this change's; home 3, a note to row 442 (the compiler's prelude lacks conversions), in record.md.

## For FACTS

See record.md, "For FACTS".

## Commands worked out

- The count stage writes no `#seconds` row: its time here is the difference between `stat -c %y` of `cc-post/javac.txt` (written at its start) and of `count-run.txt`.
