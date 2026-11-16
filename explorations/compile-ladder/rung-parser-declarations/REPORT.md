# Rung P: a postfix exponent operator declared in an api, and the signs for sum and product as accumulators (rows 133 and 5)

- problem: an api's `opr (x: ZZ32)^T: ZZ32` was a `Syntax Error` at column 1 of the next line, and `∑[\ZZ32\][i <- 1#3] i` a `Syntax Error` or `Operator prefix SUM is not defined.` (gap ledger rows 133 and 5; `explorations/compile-ladder/plan-32/PROBES.md:32-38`)
- spec: `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:737-738` (`AbsOpHeaderFront`: `opr AbsValParam (Op | ExponentOp | ^)`); `Specification/basic/expressions/reductions.tex:20` (`Accumulator ::= ∑ | ∏ | BIG (Encloser | Op)`)
- precedent: the component's rule, `ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:141-143`; for the signs, the exclusion of the words `SUM` and `PROD` from the operator names, `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1471`
- deviation: none for row 133. For row 5 one: the words are kept out of the operators in Java (`NodeUtil.validOp`), the signs in the grammar (`ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:177-181`), because a sign is a `singleOp`, which never passes through `validOp`.
- historical: `ProjectFortress/src/com/sun/fortress/parser/Parameter.rats`, `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats`, and the two parsers the build generates from them, `ProjectFortress/src/com/sun/fortress/parser/Fortress.java` and `ProjectFortress/src/com/sun/fortress/parser/templateparser/TemplateParser.java`

The rung is one code commit, `285255aa77`, on `wip/rung-parser-declarations`, cut from `db352c1776`.

## What changed and why

**Row 133.** `AbsOpHeaderFront`, the api's rule for an operator's header, read its postfix alternative as `(Op / ExponentOp caret …)`: an `ExponentOp` had to be followed by a caret, which `^T` never is. The component's rule has `(Op / ExponentOp / caret …)`. The edit adds the missing `/` (`parser/Parameter.rats:171`). `parser/MethodParam.rats:82-97` changes only the first alternative of the rule and inherits the others, so the same edit gives an api's trait its `opr (self)^T`.

**Row 5.** Three edits of `parser/Symbol.rats`:

- `SUM` matches the word `SUM` or U+2211, and `PROD` the word `PROD` or U+220F (`:255`, `:257`). Both still build `BIG +` and `BIG juxtaposition`. Every production that names `SUM`, `PROD` or `Accumulator` gets the signs with no edit of its own: `FlowExpr` (`parser/Expression.rats:700`), `SingleOp` (`parser/Parameter.rats:129-131`), and through it `OpHeaderFront` and `AbsOpHeaderFront` of functions and methods.
- `singleOp` no longer takes U+2211 or U+220F (`:177-181`). This is where the sign was taken as an operator first: `ExprFront` tries `OpExpr` before `FlowExpr` (`parser/Expression.rats:45-49`), `OpExpr` reaches `Op`, and `Op` took the sign as a `singleOp` because `PrecedenceMap.isOperator` knows it (`parser_util/precedence_resolver/Operators.java:2080-2082`). The word `SUM` never got that far, because `NodeUtil.validOp` answers false for it. The planner's trial (`PROBES.md`, section 3) added the alternative to `SUM` alone and met a `Syntax Error` at the `[` after the sign for this reason.
- The comment of `Accumulator` says what `SUM` and `PROD` now are (`:262-263`).

`parser/Expression.rats` and `parser/NoNewlineExpr.rats` are not edited: their productions name `Accumulator` and needed nothing. `parser/MethodParam.rats` is not edited either.

## The failing runs and the passing runs

Under walk, on the base's code, before the first build of the edit:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-parser-declarations/h1 ProjectFortress/tests/ApiPostfixExponentOp.fss ProjectFortress/tests/SumSignAccumulator.fss
    # harness-one 2026-11-16T00:47:33Z; tree db352c1776; nproc=4; load 4.95 7.73 7.79; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    com.sun.fortress.exceptions.ProgramError: nulltmp/rung-parser-declarations/h1/tests/SumSignAccumulator.fss:20:13:
        Syntax Error
    ProjectFortress/test_library/ApiPostfixExponentOpLib.fsi:7:1:
        Syntax Error
    Tests run: 2,  Failures: 2,  Errors: 0

Compiled, on the base's code, before the first build of the edit:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests ApiPostfixExponentOpCompiled.test SumSignAccumulatorCompiled.test
    # junit.sh base 2026-11-16T00:50:37Z; nproc 4; … tree db352c1776 …
    . compile ProjectFortress/compiler_tests/ApiPostfixExponentOpCompiled ProjectFortress/compiler_tests/ApiPostfixExponentOpCompiledApi.fsi:7:1:
        Syntax Error
    ProjectFortress/compiler_tests/SumSignAccumulatorCompiled.fss:28:12-14:
        Operator BIG juxtaposition is not defined.
    File SumSignAccumulatorCompiled.fss has 19 errors.
    Tests run: 6,  Failures: 6,  Errors: 0

After those runs and before the passing ones the tests changed in three ways, none of which changes why they failed: the superscript after `(Sized[\7\]())` became one after a name, since walk refuses a superscript after a parenthesised call (row 158, rung S's); `SumSignAccumulator` imports `List` for its `<| |>`; and the api gained a trait with `opr (self)^T`.

After the edit, the same two commands:

    # harness-one 2026-11-16T00:53:02Z; tree db352c1776; … cache filled
    . interpret tmp/rung-parser-declarations/h1/tests/ApiPostfixExponentOp
     OK (time = 3249ms)
    . interpret tmp/rung-parser-declarations/h1/tests/SumSignAccumulator
     OK (time = 1397ms)
    OK (2 tests)

    # junit.sh post 2026-11-16T00:54:03Z; … tree db352c1776 with the next rung applied, not yet committed
    . run ProjectFortress/compiler_tests/ApiPostfixExponentOpCompiled (604ms) PASS
    . run ProjectFortress/compiler_tests/SumSignAccumulatorCompiled (842ms) PASS
    OK (6 tests)

No code changed after these runs. The whole suites then ran the four tests again at `285255aa77` (below).

## What the tests assert

- `tests/ApiPostfixExponentOp.fss`, with `test_library/ApiPostfixExponentOpLib.fsi` and `.fss`: `^T` on a `ZZ32`; `^T` with static parameters after the operator, `opr (b: Sized[\n\])^T[\nat n\]`, the placement of the model's `opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]`; `^T` as a functional method of a trait of the api; `^MIRROR`, an exponent operator that is a name.
- `compiler_tests/ApiPostfixExponentOpCompiled.test`, with its api and component beside it: the same without the trait, under the prelude.
- `tests/SumSignAccumulator.fss`: the signs with a static argument and a generator clause list (the values of `tests/simpleSum.fss`: 45, 100, 145.0, 65, 0), with a clause list alone at a declared return type and a declared local, with neither (`∑ (0#10)`, a list), with a static argument alone, with the white brackets and `←`, in parentheses inside a larger expression, as the element of a list comprehension (the form of `tests/Generator2Test.fss:58`), and each equal to the same form written `SUM` or `PROD`; and a declaration `opr ∑(b: Bag)` and `opr ∏(b: Bag)`, applied both by the sign and by the word.
- `compiler_tests/SumSignAccumulatorCompiled.test`: the prelude's own sum, `opr BIG +(g: GeneratorZZ32)` (`Library/CompilerLibrary.fsi:179`), in the clause form without a static argument, on a generator, in parentheses; and the declarations with the signs, applied by sign and by word. The prelude declares no product, so the test has no `∏` reduction.

The helper api and component of the walk test are in `test_library/`, not beside the test as the rung's section words it: every `.fss` in `tests/` runs as a test, and a component that exports no `Executable` would fail there (the skill's tests-writing.md, "Where a test goes").

## Where the fix belongs, and the precedent search

The parser is phase 1 of both paths (`explorations/coordinator/map/modules-and-phases.md`, "B.2 Rats! parsing"), and both gaps are in the grammar of the real parser, `Fortress`. Three more grammars have their own copies of `SUM` and `Accumulator`: the pre-parser (`parser/preparser/PreSymbol.rats:222-232`), the import collector (`parser/import_collector/Symbol.rats:225-234`) and, by inheritance from `Symbol.rats`, the template parser. The pre-parser runs only to give readable syntax errors and the import collector reads only imports (the map, "B.2 Rats! parsing"); both accept the programs of the tests, so neither is edited. The template parser is generated from the same `Symbol.rats` and gets the edit.

Row 133's precedent is the component's rule, one site; the api's rule was its only other copy (`parser/Parameter.rats:141`, `:171`; `MethodParam.rats` inherits both). Row 5's precedent, the exclusion of a big operator's spelling from the operators, has one site, `NodeUtil.validOp` (`NodeUtil.java:1471`), with its mirror in `validId` (`:1455`).

## What the specification settles

Both. The api's header is `opr AbsValParam (Op | ExponentOp | ^) (StaticParams)?` (`Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:737-738`; the same lines in `Specification/appendices/grammars/concrete-syntax.tex:737-738`). The accumulator is `∑ | ∏ | BIG (Encloser | Op)` (`Specification/basic/expressions/reductions.tex:20`), and the operator's header takes `∑` and `∏` where the grammar here takes `SUM` and `PROD` (`concrete-syntax.tex:739-740`). The appendix of operators lists U+2211 and U+220F among "Other Operators" with the ASCII names `SUM` and `PROD` (`Specification/appendices/operators.tex:1016-1018`); that table gives each character's ASCII spelling and says nothing of its fixity, so the grammar decides.

## Programs run old against new

The old results are the record's: rows 133, 5 and 42, and `PROBES.md`, section 3. Nothing was run on the base again beside the tests' failing runs. On the edit, under walk:

- The planner's `P5.fss`, `P5b.fss`, `P5c.fss`, `P5d.fss` (`explorations/compile-ladder/plan-32/probes/`): each prints `6` on every line. Before: `Syntax Error` (`PROBES.md`, section 3).
- `opr ∑(x: ZZ32): ZZ32 = x + 1`, then `∑ y` and `SUM y` for `y: ZZ32 = 3`: both print `4`. A program's own prefix `∑` is now a declaration of `BIG +` at its parameter type, an overload of the library's `SUM`, and the word applies it too.
- `opr ∑(x: ZZ32, y: ZZ32)` applied as `y ∑ y`: `Syntax Error` at the sign, 4:39. The sign is no infix operator.
- `import FortressLibrary.{...} except { opr ∑ }` (row 42's probe `RvwExceptSigma.fss`): `Syntax Error` at 2:43. Before, it parsed (row 42). It now meets what `except { opr SUM }` meets.
- A sign in a string, a character literal and a comment: unchanged, printed as written.
- `2 + ∑[\ZZ32\][i <- 1#3] i`: `Syntax Error`, as `2 + SUM[\ZZ32\][i <- 1#3] i` is on the same code; with parentheses around the reduction, `8`. `∑[\ZZ32\][i <- 1#3] ∏[\ZZ32\][j <- 1#i] j` prints `9`.

## The whole suites

A grammar edit reaches every program on both paths, so both suites ran once, at `285255aa77`:

    ant testQuick
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 122.313 sec
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 184.994 sec
    [junit] Tests run: 1575, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 559.699 sec
    BUILD SUCCESSFUL

    ant testSystem
    [junit] Tests run: 216, Failures: 0, Errors: 0, …
    [junit] Tests run: 205, Failures: 0, Errors: 0, …
    [junit] Tests run: 204, Failures: 0, Errors: 0, …
    [junit] Tests run: 207, Failures: 1, Errors: 0, …
    BUILD FAILED

The one failure of the 832 is `tests/XXXAtomicNestedReadsKeptWalk`, row 985's expected failure, which this time did not fail: `PASS`, then `Missing expected failure`. The test counts lost updates of a race among `atomic` blocks, and the program's text holds nothing the grammar edit reaches. Run alone three times on the same code through `harness-one.sh`, it gave `Saw expected failure` each time. It is defect 3 below. The suite was not run again: one run for one code state.

## The count and the distance

Both ran once, on `285255aa77`, the final code; no code changed after either started.

    diff explorations/compile-ladder/climb-batch-30/gate/checker-count.txt tmp/rung-parser-declarations/checker-count-postedit.txt
    (no output)
    #total	0
    #locations	0
    #crash	none

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-30/gate/distance.txt tmp/rung-parser-declarations/distance-postedit.txt
    DISTANCE SAME   0
    #total	0
    #crash	none

No site moved: the stage's `errors.tsv` and `explorations/compile-ladder/gate/distance-sites.tsv` each hold their header line only. The edit changes no Scala of the checker, so the checker's timing is not asked for.

## The ladder subset

Empty, so nothing was run. No file of the baseline has a recorded first error that names what the edit touches: the 14 rows of `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` whose first error is a bare `Syntax Error` are in `not_working_library_tests/` and `tests/XXXExportsEE.fss`, and a grep of the tree for U+2211, U+220F and for `opr (…)^` in an `.fsi` finds only this rung's tests, the planner's probes and a string literal (`ProjectFortress/tests/NativeHelperWriterWalk.fss:19`).

## The team demos

The parser is edited, so the driver of the skill's tests-running.md, "Outside the gate", ran once under walk at `285255aa77`, after the last edit of code:

    bash tmp/run-demos.sh tmp/demos
    demos: 52 run, 52 reached their end

A first run of the driver was cut off at its 21st demo when the session's process stopped; the run quoted is a second, whole one, on the same code. The rung's work was taken up after that stop from the commit `285255aa77`, with no change of code.

## Existing lines that the change reaches

- No library line, no model line, no demo and no existing test writes U+2211 or U+220F outside a string: `git grep` over `Library/`, `ProjectFortress/`, `explorations/run-c4/src/` and `explorations/apl/mg/` finds only `ProjectFortress/tests/NativeHelperWriterWalk.fss:19`, a string, which runs as before.
- No existing `.fsi` declares a postfix operator with an exponent sign.
- No pinned message of an existing test changed, and no line of a team test changed.
- What `SUM` and `PROD` in ASCII parse to is unchanged: the alternatives are added beside the words.

## Sentences of the specification made false

None. A grep of `Specification/` (the frozen draft aside) for the signs, for `row~5`, `row~133` and `row~42`, and for a note on the ASCII spelling of a sum finds no Effect of Appendix I and no note that says what either path does with these forms.

## Points to report reached

1. Each form failing on the base and passing after, under walk and compiled: the runs above.
2. Row 5, the productions changed: `SUM`, `PROD` and `singleOp` (`parser/Symbol.rats:177-181`, `:255-260`). What a program of its own meets: a prefix `opr ∑` or `opr ∏` declares `BIG +` or `BIG juxtaposition`, and `SUM` or `PROD` applies it too; every other use of the sign as an operator (infix, postfix, in an import's or `except` list, wherever the grammar reads `Op`) is a `Syntax Error`. Lines reached: none in the tree.
3. `except { opr ∑ }` parsed before and is a `Syntax Error` now (row 42's whole new line is in record.md). Reversible: an alternative in `parser/Identifier.rats:95-104` would give it back, and with it `except { opr SUM }`, which is row 42's own repair and outside this rung's files.
4. No pinned message changed; no team test's line changed.
5. The count and distance tables on `285255aa77`: 0 and 0, `#crash none`.
6. Sentences made false: none.
7. Files edited beyond those named: none by hand. The build regenerated `parser/Fortress.java` and `parser/templateparser/TemplateParser.java`, which are tracked, and the commit holds them, as `fc860b6556` did for its grammar edit. The gather builds the parser's Java on the merged tree and does not merge it.

## Decisions

1. **The sign is kept out of `singleOp` in the grammar.** Ways not taken: (a) `FlowExpr` before `OpExpr` in `ExprFront`, which reorders every expression's parse and still leaves the sign an operator in a declaration's `SingleOp` (`Op` is tried before `SUM` there); (b) removing the two characters from `Operators.java`, which is generated from Unicode data by `ant operatorsGen` and feeds other tables; (c) a test in `PrecedenceMap.isOperator`, which other callers use. Evidence: `NodeUtil.java:1471` does the same for the words; the planner's trial without it failed.
2. **The signs are not added to the import's `SimpleName`.** Ways not taken: add `SUM / PROD` there, which changes what `opr SUM` in ASCII parses to in an import (a reserved point) and is row 42; add the signs alone, which would make `∑` work where `SUM` does not, against fork P1's "wherever SUM and PROD are".
3. **The pre-parser and the import collector are not edited.** Way not taken: the same three edits in each. Evidence: all four tests pass through both.
4. **The walk test's helpers are in `test_library/`.** Way not taken: beside the test, where they would run as tests.
5. **The generated parsers are committed.** Way not taken: leaving them to the gather, which leaves the branch with grammars newer than its parsers; the build decides by file dates, so a fresh checkout would run the base's parser.
6. **`testSystem` was not run again after its one red.** Way not taken: a second run. Evidence: the test alone, three times, on the same code.
7. **The demos' driver was run,** as the skill asks after a parser edit, though the gather runs it on the merged tree too.

## Defects and their homes

1. An api refuses a postfix exponent operator (row 133): home 1, `tests/ApiPostfixExponentOp.fss` and `compiler_tests/ApiPostfixExponentOpCompiled.test`.
2. The signs for sum and product are prefix operators (row 5): home 1, `tests/SumSignAccumulator.fss` and `compiler_tests/SumSignAccumulatorCompiled.test`.
3. Row 985's `XXX` test can pass in a loaded run of the suite and turn it red: home 3, the ledger row NEW-P-1 only, since no gated test can pass while it shows. The specification is silent on a test's stability.
4. `except { opr ∑ }` is now a syntax error as `except { opr SUM }` is: home 3, row 42's new line; no test, since the row's repair is outside the rung and a plain test of a `Syntax Error` would pin a gap.

## Commands worked out

None beyond the skill's and the brief's.
