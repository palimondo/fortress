# Rung S: a string literal one object for each text on both paths, and a concatenation of literals folded (P-171)

- problem: row 945, each evaluation of a string literal a new string object on both paths, so `"ab" SEQV "ab"` is `false` (`explorations/fortress-gap-ledger.md:807`); measured again by this rung's two tests failing on the base (section 3)
- spec: `Specification/basic/expressions/constant.tex:81-85` ("The only operation on literals that produces a new literal ... is concatenation by using the operator ||. One may concatenate mixed string and character literals, producing a string literal."), and `Specification/basic/expressions/literals.tex:25-26` ("Literals are values; they do not require evaluation.")
- precedent: `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:143-176`, a fold of literals before the checker that names its operator by its text; `ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/PrecedenceMap.java:187` and `ProjectFortress/src/com/sun/fortress/nodes_util/Unprinter.java:267`, `String.intern()` of a tree's text
- deviation: the fold runs in `PRETYPECHECKDESUGAR`, which both paths run, not in the integer fold's phase, which only the compiled path runs (`ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java:125-147`): `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:207-245`
- deviation: the fold leaves a character literal outside the Basic Multilingual Plane to the run time, where the specification names no exception: `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:235-236`
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FString.java`, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java`

Branch `wip/rung-string-literals`, cut from `b430f9f428`. Commits: `6c4c78aacb` (the tests), `de7c4fdd00` (the fix and the two guards respelled), `9d69d02ee0` (four rope tests respelled), `4463d37e81` (the character-first assertions and the XXX test of the prelude's refusal), and this report's commit. The worktree was seeded from the batch's base build, `/home/user/fortress-base29`, whose commit `8cde0b2c4f` is an ancestor of `b430f9f428` that differs from it only under `explorations/` (`git diff --name-only b430f9f428 8cde0b2c4f | grep -v '^explorations/'` prints nothing); the old code ran from it.

## 1. What changed and why

P-171: two string literals of one text are one object on both paths, and a concatenation of two string literals is folded into one literal; P-168's rule stands, strings are reference objects and their text equality is their `=`.

- Walk, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1018-1021`: `forStringLiteralExpr` makes its `FString` from `x.getText().intern()`, so every evaluation of every literal of one text carries one Java string.
- Walk, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FString.java:35-39`: `seqv` answers `v instanceof FString && val == ((FString) v).val`, the carried Java strings' identity. `AnyPrim.sequiv` still answers `true` first for one `FString` object (`interpreter/glue/prim/AnyPrim.java:23-26`).
- Compiled, `ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java:11`, `:62-66`: after the class test, two `FJavaString`s compare the Java strings they carry by `==`. The code generator is unchanged: it loads a literal with `ldc`, which yields the JVM's interned string, and wraps it in a new `FJavaString` (`compiler/codegen/CodeGen.java:5268-5277`).
- Both paths, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:133-138`, `:207-245`: the pre-typecheck desugaring, phase `PRETYPECHECKDESUGAR`, folds a concatenation by infix `||` (or `‖`) of string and character literals into one string literal, with the expression's span, parenthesised flag and type. It folds a two-operand `OpExpr` (`forOpExpr`, after its operands are folded) and the chain of three or more operands that the parser makes an `AmbiguousMultifixOpExpr` (`forAmbiguousMultifixOpExpr`); nested concatenations fold from the inside out. It folds when every operand is a string literal or a character literal in the Basic Multilingual Plane and a string literal is among the first two operands, joined left to right. It leaves every other `||`: a variable or call among the operands, two character literals first, an enclosing `||x||`, `BIG ||`, juxtaposition `"a" "b"`, natural numerals (rung F's). The phase runs in both phase orders before the checker (`compiler/phases/PhaseOrder.java:108-147`; `compiler/PreTypeCheckDesugarer.java`, `desugarComponent`, which runs the visitor unconditionally), so walk, the checker, the code generator and both stages read the folded literal.

## 2. The tests

- `ProjectFortress/tests/StringLiteralIdentityWalk.fss`: `"ab" SEQV "ab"`, the same at `Any`, `ab() SEQV ab()`, two variables bound to `ab()`, `("foo" || "bar") SEQV "foobar"`, `("a" || 'b') SEQV "ab"`, `('a' || "bc") SEQV "abc"`, `("a" || "b" || "c") SEQV "abc"` all `true`; a string built at run time, `"a" || b` for `b: String = "b"`, `=` the literal `"ab"` and not `SEQV` it.
- `ProjectFortress/compiler_tests/StringLiteralIdentityCompiled.fss` and `.test` (`link`, `run`, `run_out_contains=PASS`): the same assertions through `equality.sEquiv` bound at `Any`, as `StrictEquivalenceRuleCompiled` binds it.
- Guards, passing on both code states: `tests/StrictEquivalenceRuleWalk.fss` and `compiler_tests/StrictEquivalenceRuleCompiled.fss`, respelled (section 8).
- `ProjectFortress/compiler_tests/XXXCharacterBeforeStringConcatenationCompiled.fss` and `.test` (`compile`, `compile_err_contains=is not applicable to an argument of type (Character, String)`): the prelude's refusal of a `Character` value joined by `||` with a string, row 965 (section 13).

## 3. The failing runs and the passing runs

The failing runs ended before the edit was first built (the first build of the edit ended at 04:12:09Z, after 53 s).

Walk, on the base's code, 2026-11-09T04:07:28Z, tree `b430f9f428`:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-literals/h-base ProjectFortress/tests/StringLiteralIdentityWalk.fss ProjectFortress/tests/StrictEquivalenceRuleWalk.fss

    . interpret tmp/rung-string-literals/h-base/tests/StringLiteralIdentityWalk
    FAIL: two literals of one text are one object
    FortressException: FailCalled
    FAILURES!!!
    Tests run: 2,  Failures: 1,  Errors: 0

Compiled, on the base's code, 2026-11-09T04:07:52Z to 04:07:57Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests StringLiteralIdentityCompiled.test StrictEquivalenceRuleCompiled.test

    . link ProjectFortress/compiler_tests/StringLiteralIdentityCompiled  OK (time = 3730ms)
    . run ProjectFortress/compiler_tests/StringLiteralIdentityCompiled (352ms) FAIL:  two literals of one text are one object
    FAILURES!!!
    Tests run: 4,  Failures: 1,  Errors: 0

The character-first assertions, added after the fix, were run through the harness on the old code (`worktrees.md`, "Running the old code"), 2026-11-09T05:12:32Z, base build `8cde0b2c4f`:

    FORTRESS_HOME=/home/user/fortress-base29 /home/user/fortress-base29/explorations/compile-ladder/rung-inference-walk/harness-one.sh $W/tmp/rung-string-literals/old-harness $W/ProjectFortress/tests/StringLiteralIdentityWalk.fss
    FAIL: two literals of one text are one object
    Tests run: 1,  Failures: 1,  Errors: 0

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base29 $W/tmp/rung-string-literals/old-caches junit $W/ProjectFortress/compiler_tests/StringLiteralIdentityCompiled.test $W/ProjectFortress/compiler_tests/XXXCharacterBeforeStringConcatenationCompiled.test
        Could not check call to operator ||
        - (String, Object)->String is not applicable to an argument of type (Character, String).
    File StringLiteralIdentityCompiled.fss has 1 error.
    Tests run: 3,  Failures: 2,  Errors: 0

The passing runs, the last after the last change of code (`de7c4fdd00`; nothing but tests changed after it), 2026-11-09T05:12:36Z and 05:12:41Z to 05:12:56Z, tree `9d69d02ee0` with the tests of `4463d37e81`:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $W/tmp/rung-string-literals/h-new ProjectFortress/tests/StringLiteralIdentityWalk.fss ProjectFortress/tests/StrictEquivalenceRuleWalk.fss
    OK (2 tests)

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new3 ProjectFortress/compiler_tests StringLiteralIdentityCompiled.test StrictEquivalenceRuleCompiled.test XXXCharacterBeforeStringConcatenationCompiled.test
     Saw expected failure
    OK (5 tests)

The XXX test shown red on a deliberate fix, through the harness: with its `println(c || s)` changed to `println(s || c)` for one run, which the prelude compiles,

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxxred ProjectFortress/compiler_tests XXXCharacterBeforeStringConcatenationCompiled.test
     Saw failure, but did not satisfy compile_err_contains; expected
    1) ...XXXCharacterBeforeStringConcatenationCompiled(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

and restored, the same command: ` Saw expected failure`, `OK (1 test)`.

## 4. The answers on both paths, before and after

Probe programs, each a new program run by `old-fortress.sh` on the old code and by `bin/fortress` on the new; the compiled probe calls `equality.sEquiv` bound at `Any`.

| case | walk before | walk after | compiled before | compiled after |
|---|---|---|---|---|
| `"ab" SEQV "ab"` | false | true | false | true |
| `ab() SEQV ab()` | false | true | false | true |
| two variables bound to `ab()` | false | true | false | true |
| `("foo" \|\| "bar") SEQV "foobar"` | false | true | false | true |
| `("a" \|\| 'b') SEQV "ab"` | false | true | false | true |
| `('a' \|\| "bc") SEQV "abc"` | false | true | refused | true |
| `("a" \|\| "b" \|\| "c") SEQV "abc"` | false | true | false | true |
| `"x" ‖ "y"` against `"xy"` | false | true | false | true |
| `("a" \|\| "b") \|\| ("c" \|\| 'd')` against `"abcd"` | false | true | false | true |
| escapes, `"a\tb" \|\| "c\n"` against `"a\tbc\n"` | false | true | false | true |
| a 52-character fold against its literal | false | true | false | true |
| `"" SEQV ""` | false | true | false | true |
| built at run time, `"a" \|\| b`, `=` the literal | true | true | true | true |
| built at run time, `SEQV` the literal | false | false | false | false |
| `"p" \|\| v \|\| "r"` with a variable, against `"pqr"` | false | false | false | false |
| juxtaposition `"a" "b"` against `"ab"` (walk) | false | false | | |
| an empty slice of a flat string, `"abc"[0#0] SEQV ""` (walk) | false | true | | |
| a whole slice, `"abc"[0#3] SEQV "abc"` (walk) | false | true | | |
| `'a' \|\| 'b'` (walk) | refused | refused | | |
| `("ab", 1, 2, 3) = ("ab", 1, 2, 3)` (walk) | false (the review's S13) | true | | |

The printed texts of the folded concatenations are the run time's, both paths (`ab||cd text: abcd`, `a||'b' text: ab`, the escapes, the 52 characters). Walk's two refusals of `'a' || 'b'` read 'Failed to find any matching overload, args = ('a','b')'. The compiled refusal of `'a' || "bc"` on the old code reads '(String, Object)->String is not applicable to an argument of type (Character, String).' The empty and the whole slice turn `true` because the library's own literal `""` is interned too (fork 43, the review's S5) and Java's `substring(0, length)` answers the string itself, as P-171 states.

`compiler_regressions/seqv.fss:22`, `"cat"==="cat"`, on the prelude: `PASS 'cat'==='cat'` before and after, by the prelude's own `===`, which compares strings by `=` (row 908); its other three lines also print `PASS` before and after (`old-fortress.sh ... compile seqv.fss` and `run seqv`, then `bin/fortress compile seqv.fss` and `run seqv`, a copy of the program).

## 5. Where the fix belongs, and the precedent search

- `explorations/coordinator/map/modules-and-phases.md`, B.5: `PRETYPECHECKDESUGAR` makes code that must itself be type-checked and runs on both paths; `PreTypeCheckDesugarer.desugarComponent` runs `PreTypeCheckDesugaringVisitor` with no `Shell` switch, so the fold reaches walk too. The batch record's fork S1 (42) puts the fold there, not in rung F's fold.
- `explorations/coordinator/map/spec-to-implementation.md`, the row "numerals, radix, character and string literals": walk's `forStringLiteralExpr` and the code generator's `forStringLiteralExpr` are the two literal sites.
- Walk's identity: `FString.seqv` is the one place walk answers `SEQV` for a flat string (`AnyPrim.sequiv` calls it after its identity test). No precedent repaired this defect: the tree interns no string value of a program; it interns tree text in two places (`PrecedenceMap.java:79`, `:187`; `Unprinter.java:124`, `:138`, `:267`, `:638`, `:676`, `:727`, so the `.tfs` entries that walk loads already carry interned text).
- The fold: the one fold of literals in the tree is `IntegerLiteralFoldingVisitor`, which names each operator by `op_result.toString()` text and builds the folded literal from the node's `ExprInfo` (`:58-108`, `:143-176`); it is not the same defect. This fold names `||` by the `OpRef`'s original name and fixity, and keeps the expression's `ExprInfo` fields through `ExprFactory.makeStringLiteralExpr`.
- The ways the language and the library offer are listed under the decisions (section 11).

## 6. What the specification settles

`constant.tex:81-85` settles the fold: `||` is the one operation on literals that makes a literal, on mixed string and character literals, with `"foo" || "bar"` yielding `"foobar"`; it names no fold of juxtaposition. `literals.tex:25-26`, "Literals are values; they do not require evaluation", is P-171's ground for one object per text, with the 2012 restart's "All literals represent value objects" (`Documentation/Specification/Prose/Language/Expressions/literals.tick:29`). `objects.tex:51-53` ("A new object reference is created whenever a reference object is constructed") stays true: a literal is not constructed at each evaluation. The specification's text is rung T's.

## 7. Programs run old against new

Each is a new program in the rung's scratch folder, not committed.

- `StrIdProbeWalk.fss` and `StrIdProbeCompiled.fss`: the rows of section 4's table from `"ab" SEQV "ab"` to "built at run time".
- `FoldEdgeWalk.fss` and `FoldEdgeCompiled.fss` (and `FoldEdgeCompiledB.fss`, the same without the character-first line, which the old code refuses): the escapes, `‖`, nested parentheses, the character first, juxtaposition, slices, a variable among literals, the 52 characters.
- `seqv.fss`, a copy of `compiler_regressions/seqv.fss` (section 4).
- On the new code only: the base's `StrictEquivalenceRuleCompiled.fss` under another component name, which fails at its line 38, `FAIL:  two strings built apart` (section 8); `TupleLiteralsWalk.fss`, row 923's four-tuples (`T1 four-tuple of literals =: true`, `T2 four-tuple of a built string and a literal =: false`).

## 8. Suites, and each test whose verdict changes

The edit changes walk's Java, a phase that both paths share and a helper class under `nativeHelpers/` that a binding names, so both suites ran once, on the final code state (`de7c4fdd00`).

    ant testSystem          (2026-11-09T04:18Z, tree de7c4fdd00)
    BUILD FAILED
    Total time: 4 minutes 54 seconds

Four shards, 201, 199, 196 and 196 tests, 792 in all (climb batch 28's gate: 791, and this rung adds one), four failures: `NativeGlueNonFlatStringWalk`, `NativeHelperStringRopeWalk`, `NativeHelperWriterWalk` and `NativeHelperReaderWalk`. Each made a rope by `||` of string literals, which the fold now makes one flat literal, and each asserts that the result is a rope (`depth` 1, or `rope.depth > 0`): 'FAIL: a ZZ32: 0 =/= a ZZ32: 1; the concatenation is a rope' and 'FAIL: a Boolean: false =/= a Boolean: true; the rope is not flat', two of each in the log. `StrictEquivalenceRuleWalk` had been respelled before this run; on the edit, before its respelling, it failed at its line 43 ('FAIL: a Boolean: true =/= a Boolean: false; two flat strings built apart are not equivalent', harness-one at 04:13:08Z). Each of the five builds its strings at run time now, joining a literal with a variable bound to a literal, so it checks what it checked; each passes on the old and the new code through the harness (`OK (4 tests)` on both for the four, 04:24:01Z new and 04:24:14Z old; `OK (1 test)` old and `OK (2 tests)` new for the guard). Their lines, before and after:

- `tests/StrictEquivalenceRuleWalk.fss:40-41` `s1: String = "ab" || "cd"`, `s2: String = "abc" || "d"` became `:40-43` `cdText: String = "cd"`, `dText: String = "d"`, `s1: String = "ab" || cdText`, `s2: String = "abc" || dText`; `:45-46` `rope1: String = "abcdefghij" || "klmnopqrstuvwxyzABCDEFGHIJKLMN"`, `rope2: String = "abcdefghijklmnopqrstuvwxyzABCD" || "EFGHIJKLMN"` became `:47-50` with `ropeTail1: String = "klmnopqrstuvwxyzABCDEFGHIJKLMN"`, `ropeTail2: String = "EFGHIJKLMN"` and `rope1 ... || ropeTail1`, `rope2 ... || ropeTail2`. Its base lines 43, 48 and 51, now 45, 52 and 55, assert `false` as before.
- `compiler_tests/StrictEquivalenceRuleCompiled.fss:36-37` the same `s1` and `s2`, became `:36-39` with `cdText` and `dText`. Unrespelled, it fails on the new code at its line 38, `FAIL:  two strings built apart` (the base's file compiled and run under another name).
- `tests/NativeGlueNonFlatStringWalk.fss:8` `s: String = "abcdefghijklmnopqrstuvwxyz" || "ABCDEFGHIJKLMNOPQRSTUVWXYZ"` became `:8-9` `upperText: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"`, `s: String = "abcdefghijklmnopqrstuvwxyz" || upperText`.
- `tests/NativeHelperStringRopeWalk.fss:13` `long: String = ... || "ABCDEFGHIJKLMNOPQRSTUVWXYZ"` became `:13-14` with `upperText`.
- `tests/NativeHelperWriterWalk.fss:23` `rope = "4 a rope: abcdefghijklmnopqrstuvwxyz" || "ABCDEFGHIJKLMNOPQRSTUVWXYZ" || "\n"` became `:23-24` with `upperText`; `:41` `w.write("a rope in a file: abcdefghijklmnopqrstuvwxyz" || "0123456789" || "\n")` became `:42-43` with `digitText: String = "0123456789"`.
- `tests/NativeHelperReaderWalk.fss:44` `rope = "a rope in a file: abcdefghijklmnopqrstuvwxyz" || "0123456789" || "\n"` became `:44-45` with `digitText`.

All six are the revival's tests (the first two of climb batch 27, the four of 2026-11-05, `93884be8d3`), not the team's.

    ant testQuick           (2026-11-09T04:24Z, tree de7c4fdd00, the compiled guard respelled)
    BUILD SUCCESSFUL
    Total time: 8 minutes 7 seconds

compiler 1477 tests, library 86, othercompiler 263, no failures (climb batch 28's gate: 1475, 86, 263; this rung's compiled test adds a link and a run). The XXX test was added after this run, so the gate's compiler track counts one more. No compiled test's verdict changed.

## 9. The stages

The fold runs before the checker, so both stages read the folded library (fork 3). Each ran once, on `9d69d02ee0`, whose code is `de7c4fdd00`'s (only tests changed after it), under `nice -n 19`; no change of code followed either start.

- The count stage, 2026-11-09T04:33Z to 04:35Z: its table equals climb batch 28's gate table, `diff explorations/compile-ladder/climb-batch-28/gate/checker-count.txt <post-edit table>` prints nothing: `#total 0`, `#locations 0`, `#crash none`.
- The distance stage, 2026-11-09T04:35Z to 04:38Z, `#seconds 180 FortressLibrary 112`: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-28/gate/distance.txt <post-edit table>` prints `DISTANCE SAME   0`. Its `errors.tsv` holds its header only, as does `explorations/compile-ladder/gate/distance-sites.tsv`: no site moved.
- The edit changes no Scala of the checker and no code the build generates for it, so `compiler.md`, "The checker's time", does not apply.

No library concatenation of literals is folded. A grep of `Library/*.fss`, `*.fsi` and `ProjectFortress/LibraryBuiltin/*` for a string or character literal, a `||` or `‖`, and another literal, with or without parentheses and across a line break, finds five lines (`Library/List.fss:118`, `Map.fss:279`, `PrefixSet.fss:48`, `PureList.fss:53`, `Set.fss:212`) and three in the prelude (`Library/CompilerLibrary.fss:154`, `:157`, `:160`); each joins a literal with a call, which the fold leaves. Walk's cached trees after the phases count the same string literal nodes on the old and the new code for the thirteen library components that the probes loaded (`FortressLibrary` 370, `FortressBuiltin` 236, `RangeInternals` 189, `String` 46, `FlatString` 21, and eight more), while each probe's own count fell by its folds (`StrIdProbeWalk` 32 to 28, `FoldEdgeWalk` 45 to 38).

## 10. The ladder subset and the demos

The subset, after the edit only, with the drivers copied under the rung's scratch: the eleven files of `ProjectFortress/tests/` whose recorded first error in the baseline names an operator `||` or a `String` (`Brackets.fss`, `EqualityOverloadBug.fss`, `TupleBinding.fss`, `TupleBinding2.fss`, `XXXAsExpr.fss`, `XXXTypeError.fss`, `XXXmutation1.fss`, `XXXmutation2.fss`, `sequivTest.fss`, `vectorOps.fss`, and `XXXcaseTest.fss`, a run-time match failure), and `infixBars.fss`, the one file of the pass list that writes `"b"||"c"`. Each file's phase and first error equal the baseline's `ladder.tsv` row (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`); `infixBars.fss` passes, as in the newest landed `explorations/compile-ladder/climb-batch-28/gate/ladder/ladder.tsv`. No file of the baseline's `raw/` has a first error that names `||` between literals, a `Character` operand or `===`.

The team demos, `bash tmp/run-demos.sh tmp/rung-string-literals/demos`, 2026-11-09T04:39Z to 05:12Z, after the last edit of code: `demos: 52 run, 52 reached their end`. `tennisRanking` wrote `ProjectFortress/demos/tennis051707`, which was moved into the scratch folder.

## 11. Decisions

1. Walk's identity: the literal's text interned with `String.intern()` and `FString.seqv` by the carried Java string's `==`, P-171's own words. Ways not taken: the review's `protoS`, a `ConcurrentHashMap` from text to one `FString` in `forStringLiteralExpr`, with `seqv` left at wrapper identity (`reviews/literals-2026-11-08.md`, 6.1); one `FString` kept on the tree node. Evidence: P-171.
2. The compiled identity: the review's way (i), `equalityRule` comparing two `FJavaString`s' carried Java strings by `==` (P-171). Way not taken: (ii), an intern table at each literal site in `CodeGen.java:5268-5277`.
3. Where the fold runs: inside `PreTypeCheckDesugaringVisitor`, at the end of `forOpExpr` and in `forAmbiguousMultifixOpExpr`'s plain branch, the phase that fork S1 (42) names. Ways not taken: rung F's `IntegerLiteralFoldingVisitor` and `PhaseOrder.java`, which the brief gives to F; a visitor class of its own called from `PreTypeCheckDesugarer.desugarComponent`, a second walk of every tree.
4. What the fold folds: infix `||` and its chain, every operand a string or character literal, a string literal among the first two, joined left to right. Ways not taken: two character literals first, `'a' || 'b'`, which walk refuses at run time on the old and the new code ('Failed to find any matching overload, args = ('a','b')'), so a fold would turn a refusal into a value; juxtaposition, which `constant.tex:81-85` does not name; folding only a string first, which would leave `'a' || "bc"`, a mix of string and character literals that `constant.tex:83-84` names.
5. A character literal outside the Basic Multilingual Plane is left to the run time. Ways not taken: append its code point, which would give another text than the unfolded `||` gives, since the run time's `String || Char` casts the code point to a Java `char` (`nativeHelpers/simpleConcatenate.java:20-22`, by reading; no case was measured); cast it as the run time does, building that cast into the fold.
6. The fold names `||` by the `OpRef`'s original name and its infix or multifix fixity, as the integer fold names its operators by text, and reads `||` between literals as the specification's concatenation whatever declarations the program adds. Way not taken: fold only where every declaration that the `OpRef` lists is a library's.
7. The folded literal keeps the expression's span, parenthesised flag and type. So a concatenation of literals longer than `maxLeafSize` is one flat string, not a rope, as a long literal is (section 4, the 52 characters).
8. The five revival tests whose premise was a string built by `||` of literals (section 8) build it at run time with a variable operand, and keep every value they check. Ways not taken: change their expected values, which would make them tests of the fold and drop their checks of strings built apart; `CatString(...)` written out, which needs `import String.{CatString}` and checks no `||`. The brief named the two guards "as they stand"; row 945's notes had predicted the flip of `StrictEquivalenceRuleWalk.fss:43`, `:48`, `:51` and `StrictEquivalenceRuleCompiled.fss:38`.
9. The character-first assertions joined the plain tests after the fix, and were seen failing on the old code through the harness (section 3), rather than in a test of their own.
10. row 965 is recorded by home 3, an XXX compile test that asserts today's refusal and a row: the specification's library chapters declare no `||` for strings (`grep -rn 'opr ||' Specification/basic-lib Specification/library` finds only the integer norms), and in this corpus a compile refusal is asserted only by an `XXX`-named test, since a plain test whose compile fails is red (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:394-425`). Way not taken: leave the prelude's refusal unrecorded because the switch-over ends it.
11. The variable names of the respelled tests (`cdText`, `dText`, `ropeTail1`, `ropeTail2`, `upperText`, `digitText`) avoid the library's getter `upper` (`Library/FortressLibrary.fsi:2437`) and rung N's getter `digits`; a grep of both test corpora, the libraries and `ProjectFortress/src/com/sun/fortress/` finds no competing declaration of any name this rung adds (`foldLiteralConcatenation`, the three components, the six variables).

## 12. Sentences made false

The specification: none (section 6). The `fortress-repo` skill, for the skill writer:

- `.claude/skills/fortress-repo/references/interpreter.md:22`: "Each evaluation of a string literal makes a new string object, so `"ab" SEQV "ab"` is `false` (ledger row 945)."
- `.claude/skills/fortress-repo/references/compiler.md:106`: "Each evaluation of a string literal makes a new string object, so `"ab" SEQV "ab"` is `false` (ledger row 945). A test of it asserts `true`, as an `XXX` test."
- `.claude/skills/fortress-repo/references/revival-changes.md:62`: "Walk departs from both answers (rows 943, 945), and the compiled path from the string answer (row 945); `interpreter.md` and `compiler.md` give the departures." Row 945 goes; row 943 stays rung N's. The same paragraph cites the fold as "the Working Draft, `constant.tex:75-79`", which is right: the passage is at `Specification-1.0-frozen/basic/expressions/constant.tex:75-79` in the Working Draft, and at `Specification/basic/expressions/constant.tex:81-85` in the revised text.
- `.claude/skills/fortress-repo/references/interpreter.md:126`: "`||` builds a `CatString` when the joined string is longer than `maxLeafSize`, 32 characters by default." A concatenation of literals is now one flat literal at any length, so the sentence holds only where an operand is built at run time.
- FACTS: no entry names row 945 or a new string at each evaluation; F-326's "reference objects and strings only with themselves" stays true. F-249's example, "So `"s" || "t"` is a `FlatString` of depth 0", is now folded before walk reaches the top-level `||`, so it no longer shows the dispatch the entry states; its gate, `tests/StringConcatenationFamiliesWalk.fss`, joins a literal with a variable at those lines since the skeptic's fix (SKEPTIC.md).

Facts the skill may want: a concatenation of literals is now one flat literal, not a rope, so a test that needs a rope or a string built apart joins a literal with a variable (section 8); a compiled `'a' || "bc"` compiles, `c || s` does not (row 965).

## 13. Defects, and their homes

- Row 945, each evaluation of a string literal a new object on both paths: home 1, repaired; `tests/StringLiteralIdentityWalk.fss` and `compiler_tests/StringLiteralIdentityCompiled.test` close it.
- row 965, the prelude declares `String`'s `||` with the string first only, so a `Character` value before `||` and a string is refused on the compiled path ('... is not applicable to an argument of type (Character, String)', `LibraryBuiltin/CompilerBuiltin.fsi:37`): home 3, `compiler_tests/XXXCharacterBeforeStringConcatenationCompiled.test` and a new row; the specification is silent (decision 10). Its literal half, `'a' || "bc"`, is home 1, repaired by the fold and asserted by both plain tests.

## 14. Points to report

- Walk's code as changed: `Evaluator.java:1018-1021`, `FString.java:35-39`. The compiled code as changed: `equalityRule.java:11`, `:62-66`; the code generator unchanged at `CodeGen.java:5268-5277`.
- The fold as written: `PreTypeCheckDesugaringVisitor.java:133-138`, `:207-245`, phase `PRETYPECHECKDESUGAR`; it folds and leaves what section 1 lists.
- The tests' answers on both paths before and after: section 4; `compiler_regressions/seqv.fss:22`, `PASS 'cat'==='cat'` on the prelude before and after.
- Each library concatenation of literals that the fold folds: none (section 9).
- The count and distance tables on the final tree: 0 and 0, equal to climb batch 28's (section 9).
- Each test whose verdict changes in `ant testSystem` or `ant testQuick`: the five walk tests and the compiled guard of section 8, each respelled; none else.
- Every sentence made false: section 12.
- Files edited beyond those named: `tests/StrictEquivalenceRuleWalk.fss`, `compiler_tests/StrictEquivalenceRuleCompiled.fss`, `tests/NativeGlueNonFlatStringWalk.fss`, `tests/NativeHelperStringRopeWalk.fss`, `tests/NativeHelperWriterWalk.fss`, `tests/NativeHelperReaderWalk.fss`, and the new `compiler_tests/XXXCharacterBeforeStringConcatenationCompiled.fss` and `.test`.

Each is reversible; none holds the push.

## 15. For FACTS

**Two string literals of one text are one object on both paths, and a concatenation by `||` of string and character literals is one string literal before the checker.** Walk interns a literal's text and compares two flat strings by the Java strings they carry; the compiled path loads a literal with `ldc` and `equality.sEquiv` compares two `FJavaString`s' carried strings by `==`; the pre-typecheck desugaring that both paths run folds infix `||` of string literals, or of string and character literals with a string among the first two. So `"ab" SEQV "ab"`, `f() SEQV f()` for `f(): String = "ab"` and `("foo" || "bar") SEQV "foobar"` are `true`, and a string built at run time is a new object, except where Java answers the same string, as a whole slice does. A concatenation of literals is a flat literal, not a rope: a test that needs a rope or a string built apart joins a literal with a variable. Tests: `tests/StringLiteralIdentityWalk.fss`, `compiler_tests/StringLiteralIdentityCompiled.test`. Detail: `compile-ladder/rung-string-literals/REPORT.md`, sections 1, 4 and 8.

## 16. Commands worked out

- The XXX test's red run: change its program for one run, run `junit.sh` on its `.test`, and copy the saved program back (section 3).
- Counting a fold in walk's cached trees: `grep -c '(StringLiteralExpr'` over each `interpreter_cache/*.tfs` of the old run's private caches and of the new run's caches (section 9).

## 17. Questions for the curator

- Does `constant.tex:83-84`'s "One may concatenate mixed string and character literals, producing a string literal" include two character literals, `'a' || 'b'`? Today neither library declares `||` on two characters and walk refuses it at run time, so the fold leaves it (decision 4). A fold would need a declaration, or the specification's word, that it is a string.
