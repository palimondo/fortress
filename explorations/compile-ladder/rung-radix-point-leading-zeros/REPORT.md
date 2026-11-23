# Rung R of climb batch 35: a numeral with a radix point keeps its leading zeros in its digit count, on both paths (row 960)

- problem: row 960, measured on the base under walk ('FAIL: a ZZ32: 2 =/= a ZZ32: 3') and compiled ('FAIL:  2 =/= 3') by the planner's probes, `explorations/compile-ladder/plan-35/probes/fixes-35.md:16`, `:38`
- spec: "the number $n$ of its digits, leading zeros among them", `Specification/basic/expressions/literals.tex:101`; the Working Draft's "let $n$ be the total number of digits", `Specification-1.0-frozen/basic/expressions/literals.tex:110`
- precedent: `ExprFactory.makeIntLiteralExpr(Span, String)`, which deletes apostrophes and U+202F and keeps every leading zero, `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:609-632`
- deviation: none
- historical: `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1640-1643` (the team's lines, from their commit `0e5ed9a75c` of 2007-09-14, "Fixed handling leading zeroes in float literals."); `Specification/appendices/changes.tex:5486-5488` (a file of the 2012 tree; the clause removed is the revival's own text, `f36a651243`, `fcfd0aeb316`)

One launch worked this rung. Commits on `wip/rung-radix-point-leading-zeros`: `704d6fe747` (the tests and the fix), `535ad0a5c7` (Appendix I), and the commit of this report.

## What changed and why

`ExprFactory.makeFloatLiteralExpr(Span, String)` deleted every leading zero but one from the text that it keeps in the `FloatLiteralExpr` node (base `ExprFactory.java:1640-1643`), and `NumeralNumbers.of(FloatLiteralExpr)` counts the digit count `n` from that text on both paths (`nodes_util/NumeralNumbers.java:71-100`): the checker types the node from it (`scala_src/typechecker/impls/Misc.scala:474-477`; `CoercionOracle.scala:531-533` for a negated one), and walk binds a coercion's `n` from it (`interpreter/evaluator/values/Numerals.java:208-231`). So `00.5` was `RadixPointNumeral[\2, 1, 10, 5\]`, where P-174 and `literals.tex:101` make `n` 3. The edit deletes the four lines of the trim (fork R1): the node keeps the digits as written, apostrophes and narrow no-break spaces removed, its leading zeros among them, as an integer numeral's node already does. The values are unchanged: `intPart` is read by `new BigInteger(digits, base)`, which takes leading zeros, and `m` and `v` come from the digits after the point. Now at `ExprFactory.java:1637-1640`:

```java
        // Delete every apostrophe and U+202F NARROW NO-BREAK SPACE
        s = s.replace("'", "").replace("\u202F", "");

        int dotLoc = s.indexOf('.');
```

Tests: `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss` promoted by `git mv` to `RadixPointLeadingZerosWalk.fss` (component renamed), and its compiled twin `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.fss` with `RadixPointLeadingZerosCompiledLink.test` (`link`) and `RadixPointLeadingZerosCompiled.test` (`link`, `run`, `run_out_contains=PASS`), from `explorations/compile-ladder/plan-35/probes/programs/compiler_tests/P35RadixPointLeadingZerosCompiled.fss` with its prefix dropped: a `value object Digits` whose coercion answers `bigToZZ64(n).asZZ32`, the helper bound as `FloatLiteralValuePrint.fss:17` binds it. It asserts 3 for `00.5` and 2 for `0.5`.

## The failing runs, on the base's code, before the edit was built

The worktree was seeded from the base build at `13f4fdea75` and held only the test files; the fix was edited and built after both runs.

    echo "Expected failure: harness-one.sh reports RadixPointLeadingZerosWalk red, 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section \"Literals\": 00.5 has three digits', then 'Tests run: 1,  Failures: 1'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-radix-point-leading-zeros/h1 ProjectFortress/tests/RadixPointLeadingZerosWalk.fss

at 2026-11-23T10:57:15Z:

    # harness-one 2026-11-23T10:57:15Z; tree 13f4fdea75; nproc=4; load 1.68 1.21 2.57; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section "Literals": 00.5 has three digits
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

    echo "Expected failure: junit.sh reports RadixPointLeadingZerosCompiledLink.test OK and RadixPointLeadingZerosCompiled.test red, its run printing 'FAIL:  2 =/= 3; literals.tex, section \"Literals\": 00.5 has three digits', then FAILURES!!! with 1 failure"
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests RadixPointLeadingZerosCompiledLink.test RadixPointLeadingZerosCompiled.test

at 2026-11-23T10:57:34Z:

    . link ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled  OK (time = 3277ms)
    . run ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled (329ms) FAIL:  2 =/= 3; literals.tex, section "Literals": 00.5 has three digits
    FAILURES!!!
    Tests run: 3,  Failures: 1,  Errors: 0

Both failed as expected, with no failure of another kind.

## The passing runs, on the final code

After `ant compileAll` ('BUILD SUCCESSFUL', 'Total time: 48 seconds', which started `default_repository/caches` again, empty) and the library order (five compiles, each rc=0, five jars), the same two commands:

    # harness-one 2026-11-23T10:59:55Z; tree 13f4fdea75; ... cache empty
    PASS
     OK (time = 7624ms)
    OK (1 test)

    . link ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled  OK (time = 3165ms)
    . run ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled (346ms) PASS
    OK (3 tests)

No code changed after these runs: `704d6fe747` holds this code, and `535ad0a5c7` changes only the specification. The whole suites below ran both tests again on this code.

## The whole suites, once, on `704d6fe747`'s code

The node is made by the parser, which both paths run, so both suites (tests-running.md, "When to run a whole suite"):

- `ant testSystem`: 'BUILD SUCCESSFUL', 'Total time: 4 minutes 55 seconds'; shards 224, 220, 221 and 214 tests, 0 failures, 0 errors: 879, the last landed gate's sum (223 + 221 + 218 + 217 in `explorations/compile-ladder/climb-batch-34b/gate/summary.txt`); the XXX test became a plain one. 'interpret .../tests/RadixPointLeadingZerosWalk  OK'.
- `ant testQuick`: 'BUILD SUCCESSFUL', 'Total time: 8 minutes 0 seconds'; CompilerJUTest 'Tests run: 1788, Failures: 0, Errors: 0' (the gate's 1785 and the twin's three cases), LibraryJUTest 'Tests run: 86, Failures: 0', OtherCompilerJUTest 'Tests run: 263, Failures: 0'.
- Beyond the brief's two suites, the two unit tests that build float numerals through `makeFloatLiteralExpr` directly, of the misc track: `ant testOnly -DtestPattern=NumeralFoldJUTest`, 'Tests run: 9, Failures: 0, Errors: 0'; `ant testOnly -DtestPattern=ConstructorsJUTest`, 'Tests run: 8, Failures: 0, Errors: 0'.

No rung of this batch runs the team demos or the microGPT checks (the brief): the gather runs the 52 demos on the merged tree. No demo and no line of microGPT holds a numeral with a radix point and two or more leading zeros (the grep below).

## Every reader of the node's text, and what it now sees

`git grep -n 'getText'` near `FloatLiteralExpr` in the Java and Scala, and every file that names `FloatLiteralExpr`:

- `nodes_util/NumeralNumbers.java:71-100`, `of(FloatLiteralExpr)`: counts `n` from the text; now 3 for `00.5`, 4 for `00.50`. `m` and `v` are as before (its check at `:90` compares the written digits' value with the node's).
- The checker's typing of a numeral, `scala_src/typechecker/impls/Misc.scala:474-477`, and of a negated one, `CoercionOracle.scala:531-533`: through `of`, `RadixPointNumeral[\3, 1, 10, 5\]` for `00.5`.
- Walk's `interpreter/evaluator/values/Numerals.java:208-231`, `radixPoint`: through `of`; its value is computed from `v`, `r` and `m` (`:223`), unchanged; a coercion's `n` is now 3.
- The code generator: `compiler/codegen/CodeGen.java:2361` and `NumeralCoercionFold.java:400` read only `NumeralNumbers.kindOf(text)`, the text's first character (`(` or `-`), unchanged; the coercion fold reads the four numbers from the node's type, so now `n` = 3.
- `scala_src/typechecker/CoercionOracle.scala:223`, `:229` and `:621`: the messages "The numeral %s does not meet the where clause of the coercion to %s.", "The numeral %s at %s needs a prefix minus on %s, ..." and "The numeral %s rounds to infinity in %s." quote the text, now as written (fork R1 says so). Old against new, `bin/fortress compile` of a probe with `s: Small = 00.5` for a coercion `where { v < 3 }`: old 'The numeral 0.5 does not meet the where clause of the coercion to Small.', new 'The numeral 00.5 does not meet the where clause of the coercion to Small.' No test pins such a message with two leading zeros (the grep below).
- `compiler/desugarer/IntegerLiteralFoldingVisitor.java`: `:159`, `:402` read `kindOf` only; `:403` prefixes `-` to the written text, now `-00.5`, read by `of` as before; `:209-211` builds text from `BigDecimal.toPlainString`, never with two leading zeros; `:255-258`, `result`, keeps a written operand's text in parentheses where a fold of `MIN`, `MAX`, `|x|` or a prefix minus answers that operand, so `00.5 MAX 0.1` is now the node `(00.5)`, whose type counts 3 digits. Old against new, `bin/fortress compile` of `counted(00.5 MAX 0.1)` for the walk test's `Digits`: old '... not applicable to an argument of type RadixPointNumeral[\2,1,10,5\].', new '... RadixPointNumeral[\3,1,10,5\].'; walk refuses the call both times with the same 'Unification error: Closure/Constructor for counted param 1 (d:Digits) got arg 0.5:RR64 of type RR64'. A folded constant reaches no program's numeral coercion (P-174), and no library coercion reads `n` (`Library/FortressLibrary.fss:389`, `:635`; `LibraryBuiltin/FortressBuiltin.fss:68`; `CompilerBuiltin.fss:895`, `:957`), so only the message shows it. `00.5 + 0.0` folds through `written` to `(0.5)` and stays `[\2,1,10,5\]`, old and new. An integer operand kept so is rewritten to its value's digits (`:251-253`). A question for the curator, below.
- `compiler/desugarer/NumeralFoldJUTest.java:108`, `:116-117`: asserts fold texts, none with two leading zeros; passes (above).
- `nodes_util/ExprFactory.java:1907-1911`, in `makeInParentheses` (`:1774`): copies the text.
- `tools/FortressAstToConcrete.java:1649-1650`: `unparse` prints the text, now as written. Not run: `fortress unparse` reads a serialized tree, not a source (`Shell.java:803-818`), and no suite checks it (tests-running.md).
- `compiler/desugarer/CoercionDesugarer.scala:55`, `scala_src/typechecker/impls/Functionals.scala:1240-1243`: the node's class only.

The values, old against new, of `x: RR64 = 00.5; println(x)`: walk '0.5' and '0.5'; compiled '0.5' and '0.5'.

The planner's grep, run again on the final tree, finds no numeral with a radix point and two or more leading zeros but the two tests' own: `grep -rn -E '(^|[^0-9.A-Za-z_"])00+\.[0-9]' --include='*.fss' --include='*.fsi' --include='*.test' Library ProjectFortress explorations/run-c4/src explorations/apl/mg` prints only `compiler_tests/RadixPointLeadingZerosCompiled.fss:1`, `:12` and `tests/RadixPointLeadingZerosWalk.fss:1`, `:12`; the same over `SpecData`, `Specification/basic` and `Specification/basic-lib`, and `grep -rn -E '"00+\.[0-9]' --include='*.java' --include='*.scala' ProjectFortress/src`, print nothing.

## Where the fix belongs, and the precedent

The node is made once, by the parser's actions in `parser/Literal.rats:53-83` (`NumericLiteralExpr` and `NumericLiteralWithRadix`), which hands the numeral's whole text to `ExprFactory.makeFloatLiteralExpr` (`modules-and-phases.md` B.2; `compile-path-walkthrough.md`, section 1: the tree is the only form of the program, from the parser to the bytecode). The grammar already passes the digits as written; the factory dropped them. So the fix is in the factory, where both paths read it, and no phase after it can recover the zeros without the source.

The precedent is `makeIntLiteralExpr(Span, String)` in the same file (`ExprFactory.java:609-632`), which deletes apostrophes and U+202F and trims nothing. The file has no other site that trims a numeral's digits: `grep -n -i 'leading zero\|trim' nodes_util/ExprFactory.java` on the base printed only `:1640` and seven `Useful.immutableTrimmedList` calls, which trim lists of expressions. The trim came from the team's commit `0e5ed9a75c` (2007-09-14), which narrowed an earlier trim of every leading zero to all but one; nothing in the tree reads a text with one leading zero only.

## What the specification settles

`Specification/basic/expressions/literals.tex:100-101`: "The static arguments of a numeral type are the numeral's four numbers: the number $n$ of its digits, leading zeros among them;" and P-174 ("the digit count `n`"; its source `Specification-1.0-frozen/basic/expressions/literals.tex:110-111`, "let $n$ be the total number of digits"). The text is unchanged: review-queue item 473, on `Literal`, is another question (the brief).

## Old against new

Each program above ran on the old code through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base42 <tree>/tmp/rung-radix-point-leading-zeros/old-caches ...` and on the new through `bin/fortress`, from the tree's root: the where-clause message (compiled: changed as quoted; walk: 'RHS expression type RR64 is not assignable to LHS type Small' both times, no text quoted), the folded `MAX` (compiled message changed as quoted; walk the same), the folded `+` (the same both times, `[\2,1,10,5\]`), and the `RR64` value (unchanged on both paths). The two tests' failing runs are the base's code, above.

## Sentences of the specification made false

- `Specification/appendices/changes.tex:5486-5488`, in the effect of Appendix I's entry "The numeral types, their conversion and their default" (`\subsection` at `:5161`, `\item[Effect]` at `:5374`). Before: "The implementations depart from the text in these further ways, each with its row of the revival's gap ledger: a numeral with a radix point keeps only one of its leading zeros in its digit count, as the parser gives the numeral to both implementations (row~960); the interpreter loads and runs a program that writes a numeral type in a \KWD{comprises} clause (row~981); ...". After (`:5485-5487`): "The implementations depart from the text in these further ways, each with its row of the revival's gap ledger: the interpreter loads and runs a program that writes a numeral type in a \KWD{comprises} clause (row~981); ...", the sentence's other clauses whole. Edited in `535ad0a5c7`.
- `grep -rn '~960' Specification --include=*.tex` on the base printed one line, `Specification/appendices/changes.tex:5488`, the clause above, which the change made false and which is removed; on the final tree it prints nothing.
- `grep -rn -i 'leading zero' Specification --include=*.tex` prints four other lines, each true now: `basic/expressions/literals.tex:101` (the rule), `:151` (the Working Draft's `Literal`, in a `\revision`), `basic/expressions/constant.tex:147` (a concatenation of natural numerals counts its leading zeros), and `appendices/changes.tex:5510` (original text quoted). No `\note` or `\revision` box names the parser's trim.
- Outside the specification, for the gather: the skill's `.claude/skills/fortress-repo/references/interpreter.md:26`, "A numeral with a radix point keeps only one of its leading zeros, so a coercion over `RadixPointNumeral[\n, m, r, v\]` gets `n` = 2 for `00.5`, not 3 (ledger row 960).", is false now; and P-174's last sentence, "Rows 960 and 981 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written in a `comprises` clause." (`explorations/coordinator/POSITIONS.md:106`), holds for row 981 only.

## The two stages, on the final tree

Every path the rung changes outside the exempt folders is `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java`, so both stages ran, once each, on `535ad0a5c7` (the code of `704d6fe747`), after the last edit was built; no code changed after them. The comparands are the last landed gate's tables, `explorations/compile-ladder/climb-batch-34b/gate/checker-count.txt` and `distance.txt` (landed in `295c215c2c`), and `explorations/compile-ladder/gate/distance-sites.tsv`.

- The count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-radix-point-leading-zeros/checker-count-postedit.txt tmp/rung-radix-point-leading-zeros/cc-post`: '#total 0', '#locations 0', '#crash none', '#shadow matches the tracked StaticChecker'; `diff explorations/compile-ladder/climb-batch-34b/gate/checker-count.txt tmp/rung-radix-point-leading-zeros/checker-count-postedit.txt` prints nothing (rc=0): the tables are the same, every api 0.
- The distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-radix-point-leading-zeros/distance-postedit.txt tmp/rung-radix-point-leading-zeros/dist-post`: '#total 0', every kind 0, '#crash none', '#seconds 117 FortressLibrary 74'. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-34b/gate/distance.txt tmp/rung-radix-point-leading-zeros/distance-postedit.txt` prints 'DISTANCE SAME   0'. `dist-post/errors.tsv` holds only its header, as does the per-site list: no site moved.

The edit changes no Scala of the checker and nothing the build generates for it, so compiler.md's "The checker's time" does not apply.

## The ladder subset

No file's recorded first error in the baseline (`explorations/compile-ladder/baseline-2026-09-19/raw/`, and its `ladder.tsv` for the files outside the pass list) names what the change touched: `grep -rl -i 'FloatLiteral\|makeFloatLiteralExpr\|ExprFactory\|leading zero\|RadixPointNumeral\|digit'` over `raw/` prints nothing. So the subset by the rule is empty. The two ladder files whose rows name a numeral or a float literal type ran instead, after the edit only, with the drivers copied to `tmp/rung-radix-point-leading-zeros/ladder/` as gate.md, "The ladder regression", says (`run-subset.sh`, then `classify.py`): 'sanity ok: library_tests/Integer1 compiles and prints PASS'; `tests/NumeralTest.fss` 'disambiguate', first error 'ImmutableArray is undefined.', as in the baseline's `ladder.tsv`; `tests/XXXextendFloatLiteral.fss` 'typecheck', as in the baseline, its first error now 'Type requires static arguments: CompilerBuiltin.RadixPointNumeral' where the baseline has the deleted trait `FloatLiteral`'s, since `3de571bac7` respelled the file's `extends`. Neither is in the gate's 85, so the newest landed `ladder.tsv` (`climb-batch-34b/gate/ladder/ladder.tsv`) holds neither. No move.

## Points to report

- The fix as made, and every reader of the node's text that now sees the leading zeros: `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1637-1640`; the readers above ("Every reader of the node's text"), of which `NumeralNumbers.java:78`, `CoercionOracle.scala:223`, `:229`, `:621`, `IntegerLiteralFoldingVisitor.java:257`, `:403` and `FortressAstToConcrete.java:1650` now see the zeros.
- Row 960's test promoted and its compiled twin, each failing on the base and passing after: `ProjectFortress/tests/RadixPointLeadingZerosWalk.fss:12`, `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.fss:12`; the runs above.
- Each sentence of the specification that the change makes false, before and after: `Specification/appendices/changes.tex:5485-5487`, quoted above.
- The two stages' tables on the final tree against the comparand: the count's diff empty, the distance 'DISTANCE SAME   0', above.

Not reached: a file edited beyond those named (none: `git diff --name-only 13f4fdea75` lists `ExprFactory.java`, `changes.tex`, the four test files and this folder's two files); a pinned message or a test's checked value that changes (no test pins a message or checks a value with two leading zeros, by the greps above; the changed messages are unpinned); a model line (none changes). No step taken cannot be undone or acts against a decision on record.

## Decisions

1. **The node keeps the digits as written: the four lines of the trim deleted** (fork R1, the batch's default). Ways not taken: a separate count kept beside a trimmed text (R1's way not taken; it adds a field to `FloatLiteralExpr` in `ProjectFortress/astgen/Fortress.ast` and regenerates the nodes, the checker's Scala face among them); `NumeralNumbers` counting from the source span (it would read the file again, and a generated or folded node has no span of its own digits); parsing the value from a trimmed copy and keeping the untrimmed text (two strings for one result: `new BigInteger` reads leading zeros, so the values are the same, as the `RR64` probe shows); an edit of `Literal.rats` (outside the rung's files, and its actions already pass the whole text, `Literal.rats:53-83`). Evidence: the precedent `ExprFactory.java:609-632`; P-174; `literals.tex:101`.
2. **The compiled twin in the promoted run-pair form**: `Name.fss`, `NameLink.test` with `link`, `Name.test` with `link`, `run` and `run_out_contains=PASS`, as `compiler_tests/NatRtTask.test` and `NatRtTaskLink.test` (tests-writing.md, "Promoting an `XXX` test"); the probe's second assertion, 2 digits for `0.5`, kept as the probe has it, so that the test also fails if `n` stops counting at all. Ways not taken: the probe's single `.test` with `link` and `run`; the twin asserting `00.5` only, as the walk test does. Evidence: the brief, "with its link test".
3. **Appendix I: the clause removed, the sentence's other clauses whole**, as the brief says. Way not taken: rewording the sentence's opening. Evidence: `changes.tex:5485-5487`.
4. **The ladder subset: the two near files run, though the rule's subset is empty.** Ways not taken: running nothing (the rule's literal answer), running the gate's 85 (the gate's work). Evidence: the greps of "The ladder subset".
5. **The two unit-test classes that call the factory run by `ant testOnly`** beside the brief's two suites, since the misc track is in neither. Way not taken: leaving them to the gate. Evidence: `NumeralFoldJUTest.java:29`, `ConstructorsJUTest.java:150-174`.
6. **The fold's `result` left as it is**: a folded `MIN`, `MAX` or `|x|` that answers a written radix-point operand keeps that operand's text, now with its zeros, while an integer operand is rewritten to its value's digits (`IntegerLiteralFoldingVisitor.java:251-258`). Ways not taken: rewriting the kept text to the value's digits (`written`'s form) in this rung, a file beyond those named. Evidence: only a checker message shows it (the `MAX` probe), and no coercion reads a folded constant's numbers (P-174); put to the curator below.

## Questions for the curator

- Should a folded constant that keeps a written radix-point operand, as `00.5 MAX 0.1`, show the operand's digits in its numeral type (now `RadixPointNumeral[\3,1,10,5\]` in the checker's message), or its value's, as an integer operand kept so does (`IntegerLiteralFoldingVisitor.java:251-253`) and as `00.5 + 0.0` does (`[\2,1,10,5\]`)? Default: as it is; no program reads it (P-174), only the message shows it.

## Defects and their homes

- Row 960, the digit count of a numeral with a radix point: home 1, repaired, asserted by `ProjectFortress/tests/RadixPointLeadingZerosWalk.fss` (walk) and `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test` (compiled). The row closes.
- No other defect was measured. The folded `MAX`'s type in a message is no defect by any source: the specification gives a folded constant no numeral type of its own numbers, only its default and its conversion at the number types (`literals.tex`, the paragraph on static expressions), so it is the question above, without a row. The compiled probe's second error, 'ZZ has no getter called asZZ32', is the prelude's known limit until the switch-over (revival-changes.md, "Numbers", the low-bits paragraph; row 349); the twin uses the helper for it.

## For FACTS

See `record.md`.

## Commands worked out

- The planner's grep for numerals with two or more leading zeros, with the folders named, as quoted above.
- `fortress unparse` takes a serialized tree, not a source: a source fails in `ASTIO.readJavaAst` with 'Error reading node type ...' (`Shell.java:803-818`).
