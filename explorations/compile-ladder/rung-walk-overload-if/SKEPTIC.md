# Climb batch 16, rung W (`rung-walk-overload-if`): the skeptic's verdict

Verdict: **approved**, with one fix of the change and record corrections, none contested.

Head judged: `e9fbbff7f` (the worker's last commit; `59fbeeca7` adds only the worker's `REPORT.md` and `record.md` from the run's journal). The report's suite runs, and its statement that neither the count nor the distance stage ran, are those of the worker's head. The skeptic's fix makes a new code state, whose walk suites are in section 4.

## 1. What I checked

1. **Tables.** The report runs neither stage. `git diff --name-only 528438ac5...HEAD` lists only paths under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` (the worker's three files and the skeptic's `types/SymbolicNat.java`), `ProjectFortress/tests/`, `ProjectFortress/compiler_tests/` and `explorations/`; a `grep -vE` of the allowed prefixes printed nothing. No checker, generated or Scala path, so no stage of mine either.
2. **Test first, in the worker's transcript.** The failing run is call `Jgt78V`, 10:17:40 to 10:17:52 UTC, on the base's code (`git status --short ProjectFortress/src` empty, harness line `tree 528438ac5`), before the first edit of code (`ndHrnR`, 10:22:01) and the first build (`3uyUfC`, 10:25:39): "Missing expected refusal at load" six times, "UNEXPECTED exception / FortressException: CastError", "Tests run: 8,  Failures: 7,  Errors: 0", `GenericPairExcludingWalk` green, as `recordedFailure` quotes. The last edit of code is `jiDuuf` (10:52:15, the meet's rewrite), built by `GeFb13` (10:53:25, `BUILD SUCCESSFUL`); the passing run `YxDSDs` (10:54:21) printed "OK (22 tests)", and `ant testSystem` (done 11:00:03, shards 158, 157, 153, 158, 0 failures) and `ant testSpecData` (11:02:16, 130, 0 failures) ran on that code state. `GenericFBoundsMeetWalk` was written after the last edit (10:54:06); it is a guard green on the base, which needs no failing run.
3. **The diff against the section.** Row 373: the exclusion read at the shared instantiation is withdrawn where the instances of each do not exclude, and the pair is judged on its declared domains by the three rules (`OverloadedFunction.java:424-535`, `:760-1187`), which `Specification/advanced/overloading.tex:546-559` and `:582-592` state; the object shortcut's lines (`:445-446`) change only for two own generics' instances of one generic object that may coincide, so row 697's shortcut stays for every other pair. Row 673: `forIf` takes a `Boolean` by value, a `Just` or `Nothing` (by name, extending a trait named `Maybe`) as true or false, and refuses the rest (`Evaluator.java:595`, `:611-621`), the coordinator's call 6. Row 718: `resultArgOf` reads the declared result's `BigOperator` supertype with its static arguments substituted (`EvaluatorBase.java:281-336`). One defect (section 2).
4. **Precedent.** Followed: `validOnDeclaredDomains` of `8f7e183d4` for declared domains, `createSymbolicInstantiation` (`SingleFcn.java:163-226`) for the overlap's bounds, `forWhile` (`Evaluator.java:1600-1617`) for refusing a clause, `Glue.extendsGenericTrait` (`Evaluator.java:416`). `EvaluatorBase.java:14` is the first import of `compiler/typechecker/` under `interpreter/` (`grep -rln 'import com.sun.fortress.compiler.typechecker' interpreter` prints only it); the worker lists it as a deviation. `Glue.extendsGenericTrait` compares names only (`interpreter/glue/Glue.java:70-83`), so "the library's `Maybe`" in the worker's decision 7 is any trait named `Maybe` beside an object named `Just` or `Nothing`.
5. **The tests.** Each exercises its defect, carries one comment line, cites its section by name, and is named by topic. `GenericPairExcludingWalk` cites "Overloading Resolution", a section of `basic/overloading.tex`, beside "Declarations with Static Parameters" of `advanced/overloading.tex`, both as `overloading.tex`, as the suite's other overloading tests do.
6. **My own programs** (section 3), under walk on the old code and the new, and on the compiled path, at one thread and, for four of them, at four.
7. **Homes.** The worker's three rows are home 1. The skeptic's fix's defect is home 1 (`GenericSizePairNestedWalk`). Two defects my programs measured are deferred: row 740 (walk, a design limit beside row 159) and row 741 (the checker), each with a gated expected failure and a row in `record.md`.
8. **Ledger and siblings.** `ledger-find` on generic method overloads, existential reduction, instantiation exclusion, `Invalid overloading`: rows 21, 159, 416, 495, 539, 546, 723 bear on the rung; none holds the defect of row 740 or of row 741. Sibling sites: generic functional methods take the repair (`GenericFunctionalMethod.Own` is an own generic; probe below); generic dotted methods and local generic functions cannot be called or loaded overloaded on the base either ("Cannot find definition for method m given receiver O", "Missing type T", rows 21 and 723); size parameters were the sibling the repair missed (section 2); `bool` parameters fail at dispatch on the base already ("Failed to find any matching overload ... Flag[\true\]") and now at load, no program that ran stops.
9. **The report.** The provenance lines opened with `sed -n`: two citations corrected (`overloading.tex:579-588` is `:582-592`; `defining-generators.tex:117` is the subsection heading, the sentence is `:200-225`). The four clauses and the fifth sentence are those that state walk's behaviour; the fifth's proposed text said "read at one instantiation of both", which holds only for row 373's own pair, not for `dup`'s, `sort`'s or `GenericBoundsMeetWalk`'s, whose static parameter lists differ: corrected in `REPORT.md` section 7. `FACTS.md:145`, `:150`, `:179` and the skill's `revival-changes.md:146-149` and `interpreter.md:38` say what the report quotes.
10. **Names.** The skeptic's test components and their declarations (`Vec`, `Arr`, `len`, `ln`, `dup` over sizes, `copyOf` in a compiled test) compete with no library or test file name: `grep -nwE '(len|ln|dup)\s*(\[\\|\()' Library/*.fsi ProjectFortress/LibraryBuiltin/*.fsi` printed nothing; the override adds no Java name.
11. **Failure modes.** No loud failure becomes a wrong quiet value: row 373 turns a silent wrong dispatch into a refusal, row 673 a silent `else` into "If clause did not return boolean", row 718 a `CastError` into the reduction's value; the skeptic's fix turns a refusal of a valid set into its load.

## 2. The defect of the change, and the fix

**Finding.** Two own generic declarations over sizes, one inside the other, were refused at load: `len[\nat n\](x: Vec[\n\], y: Vec[\n\])` beside `len[\nat n, nat m\](x: Vec[\n\], y: Vec[\m\])`, `Vec` an object. The base walk and the compiled path load and run it. Row 373's repair withdraws the exclusion the base read between `Vec[\n\]` and `Vec[\m\]` (sizes may coincide, `mayBeEqual`, `OverloadedFunction.java:1133-1148`) and then asks walk's inference for the instance of one that holds the other's domain (`instanceHolding`, `OverloadedFunction.java:2094-2109`); a symbolic size had no `unifyStaticArg` (`interpreter/evaluator/types/SymbolicNat.java` at `e9fbbff7f`, the default refusing at `types/FType.java:590-600`), so that inference fails for every size parameter, and `genericPairValid` refuses a pair the report's own rule accepts ("one inside the other is valid where its return type is below the other's at the instance that holds it", `REPORT.md` section 1).

    old-fortress.sh /home/user/fortress-base16 .../tmp/old-caches SkNatPair.fss      # walk, old code
    vec
    mat
    same
    any
    FORTRESS_HOME=/home/user/fortress-walkovl bin/fortress SkNatPair.fss              # walk, worker's head
    len[\nat n,nat m\](x:Vec[\n\],y:Vec[\m\]):FortressLibrary.String... and
    len[\nat n\](x:Vec[\n\],y:Vec[\n\]):FortressLibrary.String... have parameters
    with generic type, at least one pair of parameters must have excluding types
    old-fortress.sh ... compile SkNatPair.fss && old-fortress.sh ... run SkNatPair  # compiled path
    rc=0
    vec / mat / same / any

The same held for `ln[\T, nat n\]` beside `ln[\T, nat n, nat m\]` over `Arr[\T, nat n\]`, and not for the type twin `len[\T\](x: Box[\T\], y: Box[\T\])` beside `len[\T, U\]`, which loads on both codes.

**Ways.** (1) `SymbolicNat.unifyStaticArg` binds a size parameter of the signature to the symbolic size, as `IntNat.unifyStaticArg` (`types/IntNat.java:127-147`) binds it to a literal size; (2) a structural matcher in `genericPairValid` apart from walk's inference, which repeats inference and needs its own bound checks; (3) keep the exclusion where only size arguments may coincide, which accepts `dup[\nat n\](x: Vec[\n\])` beside `dup[\nat m\](x: Vec[\m\])`, a duplicate the base ran; (4) record it deferred, which lands a regression of a program the base ran. Chosen: (1), where the gap is, in the library's way.

**Test first.** `ProjectFortress/tests/GenericSizePairNestedWalk.fss` (load and dispatch) and `NoDuplicatesRuleSizeWalk.fss`/`.test` (the size duplicate refused):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/.../h-head $T/GenericSizePairNestedWalk.fss $T/NoDuplicatesRuleSizeWalk.fss $T/NoDuplicatesRuleSizeWalk.test
    # harness-one 2026-10-16T14:21:50Z; tree 59fbeeca7; nproc=4; load 2.51 3.11 4.16; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    with generic type, at least one pair of parameters must have excluding types
     OK Saw expected refusal at load
    Tests run: 2,  Failures: 1,  Errors: 0

on the worker's head's build, before the edit; and through the base build's harness (`FORTRESS_HOME=/home/user/fortress-base16 .../harness-one.sh`): `GenericSizePairNestedWalk` "PASS", `NoDuplicatesRuleSizeWalk` "Missing expected refusal at load", "Tests run: 2,  Failures: 1". After the edit and `ant compileAll` ("BUILD SUCCESSFUL", "Total time: 1 minute 28 seconds"), the two with the worker's 22 and `XXXNatSizeExclusionWalk`:

    # harness-one 2026-10-16T14:25:00Z; tree 59fbeeca7; nproc=4; load 6.24 4.42 4.46; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    OK (25 tests)

Commit `aa4b46d6e`, "Skeptic's fix: walk unifies a symbolic size with a size parameter, so two generic declarations over sizes, one inside the other, load". **Settled**: the pair is valid by `Specification/advanced/overloading.tex:546-559` (the Meet Rule's "one of them is more specific than the other", and the Return Type Rule, both return types `String`), the section reads each domain "as the checker reads them" and the checker accepts it, and the report's own rule says so. The path `interpreter/evaluator/types/SymbolicNat.java` is outside the section's three files: a point to report, not a contest.

## 3. My programs, old code beside new

Walk lines are old code, then new code (the fixed build), at `FORTRESS_THREADS=1`; those marked T=4 ran at four as well, the same. The compiled path is the base build's: the rung changes no checker code.

| program | old walk | new walk | compiled |
|---|---|---|---|
| row 373's pair (`GenericOverloadInstancesApartWalk`) | — (worker's run: `oP`, `oP`) | refused | 'Invalid overloading of o' |
| the pair as generic functional methods of an object | 'Ambiguous coercion' at the call | refused at load | — |
| the pair with a second parameter `y: ZZ32` | `oP` | refused | — |
| the pair with names `T` and `U` | refused | refused | — |
| the pair with `where { T extends Any }` | `wP` | refused | — |
| `sw[\A,B\](Pair[\A,B\])` beside `sw[\A,B\](Pair[\B,A\])` | `ab` | refused (duplicates) | — |
| `len` over `Vec[\n\]`, `Vec[\n\]` beside `Vec[\n\]`, `Vec[\m\]` (T=4) | same/any | refused; after the fix same/any | runs, same/any |
| `dup` over `Vec[\n\]` beside `Vec[\m\]` | `n` | refused | — |
| `o` over (`P[\T\]`, `Box[\T\]`) beside (`Q[\T\]`, `Box[\T\]`) | `oP`, `oQ` | refused (row 740) | 'Invalid overloading of o' |
| `GenericPairExcludingWalk`'s set | loads | loads | 'Invalid overloading of tint', '... of copyOf' (row 741) |
| ground `c(a: Thawed[\ZZ32\])` beside `c(a: Frozen[\ZZ32\])`; generic over `Box`, `Crate` | — | — | compiles |
| `ident[\T extends Shape\]` beside `ident[\T extends Round\]` (T=4) | refused | refused | — |
| `if Just[\Boolean\](false)`, `Just(3)`, `Nothing`, an `elif` chain (T=4) | then, then, else, 3 | the same | 'Filter expressions in generator clauses must have type Boolean, but m had type Maybe[\ZZ32\]' |
| `f(x: Any) = if x then ...` on `'a'` | else | 'If clause did not return boolean, but 'a'' | — |
| `if JustIt` (a user object), `if (1#0)` | else, else | refused, refused | `if O`, `if 1`: refused |
| `if x <- Just(5)`, `if x <- Nothing` | bound 5, none | the same | — |
| user big operator through a two-level trait, swapped static arguments (T=4), an object result | `CastError` ×3 | `<\|0, 1, 2\|>` ×3 | the walk library does not compile |

Commands: `old-fortress.sh /home/user/fortress-base16 /home/user/fortress-walkovl/tmp/old-caches P.fss` and `FORTRESS_HOME=/home/user/fortress-walkovl FORTRESS_CACHES=<private> bin/fortress P.fss`; compiled, `old-fortress.sh ... compile P.fss` then `run P`. The program text of rows 740 and 741 and of the fix is in the committed tests.

## 4. Suites on the fixed code state

    ant testSystem          # the tree of aa4b46d6e plus XXXGenericPairExcludesTogetherWalk
    BUILD SUCCESSFUL
    Total time: 7 minutes 41 seconds
    Tests run: 160, ... 155, ... 159, ... 155, each Failures: 0, Errors: 0     (629 = 626 + the skeptic's three walk tests)
    ant testSpecData
    [junit] Tests run: 130, Failures: 0, Errors: 0
    BUILD SUCCESSFUL

The compiled expected failure ran through `fortress junit` on the base build (the head's checker is the base's): "Saw expected failure", "OK (1 test)"; with the second `copyOf` removed for one run, "Saw wrong failure. compile", "Tests run: 1,  Failures: 1". The walk expected failure: "OK Saw expected exception", "OK (1 test)" on the head; "Missing expected failure", "Tests run: 1,  Failures: 1" through the base build's harness. No count or distance stage was run after the fix. The fix's build started the worktree's `default_repository/caches` again, empty: a compiled run in this worktree needs the library order first.

## 5. Corrections (commit `354c002fa`)

- `record.md`: rows 740 and 741 in the row template; the row-373 FACTS entry's size unification and gates; the closes name `aa4b46d6e`; the departures of both revival changes (the checker refuses a `Maybe` clause walk keeps; rows 740 and 741); the handover; a question for the curator.
- `REPORT.md`: the two citations of section 1, item 9 above, and the corrected text proposed for `changes.tex:2612-2614`.
- `ProjectFortress/tests/XXXGenericPairExcludesTogetherWalk.fss` and `ProjectFortress/compiler_tests/XXXGenericPairSharedSupertypeExclusion.fss`/`.test`, the rows' expected failures.

## 6. Points to report the rung reaches, beyond the worker's

- A walk edit beyond the three files named: `interpreter/evaluator/types/SymbolicNat.java` (the skeptic's fix, `aa4b46d6e`). The worker's "none" is of its head.
- A walk test whose verdict changes beyond the four promotions and the new tests: none on the suites; a user program the base ran is now refused at load, row 740's pair (`XXXGenericPairExcludesTogetherWalk`).
- What a reading of microGPT's components finds: as the worker reads it. The size-generic pairs there (`rows`, `transpose`, `opr ×`, `opr /` in `explorations/run-c4/src/FlatArrays.fss:25-27`, `:50-51`, `:142-160` and `explorations/apl/mg/FlatArrays2.fss:23-35`) have different lists of static parameters over different generic types, or different arities, so neither the withdrawal nor the skeptic's unification changes their reading at load; dispatch between two own generics now also reads declared domains over sizes (`moreSpecificDeclaration` through `declaredBelow`), which the commit stage's microGPT check covers.

## 7. Where I differ from the worker's account

- Decision 7: `maybeType` takes an object named `Just` or `Nothing` that extends a trait named `Maybe`, by name (`Glue.java:70-83`), not the library's `Maybe` by identity.
- Section 7, item 5: corrected as above.
- Decision 1's reach leaves row 740 refused under row 159's per-pair rule; I add it to the worker's question on row 159.

## 8. For the curator

- The worker's question on row 159 stands.
- Row 740: should walk, and the checker (row 741), read an exclusion over the whole parameter type, a static argument fixed by an instance of one generic type in any position counting, as the specification's existential reduction reads it (`Specification/advanced/overloading.tex:582-592`) and as `oneInstance` (`OverloadedFunction.java:1077-1092`) already reads one position's supertypes?
