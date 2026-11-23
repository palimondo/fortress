# Skeptic's verdict on rung R of climb batch 35: a numeral with a radix point keeps its leading zeros in its digit count (row 960)

Judged head: `071ba738b7` on `wip/rung-radix-point-leading-zeros` (the worker's last commit). One launch of the skeptic's role worked this rung; one launch of the worker's. The branch already carried `REPORT.md` and `record.md` (`5f4f2de717`, `071ba738b7`), so the first step wrote nothing: the journal's texts differ from the committed ones only at `REPORT.md:17`, where the committed file spells the factory's `" "` as the source does (the worker's own `071ba738b7`), and in a final newline.

**Verdict: approved.** The change is right and the record honest. I made no fix and no trim.

## What I checked

### 1. The count and the distance

`ExprFactory.java` is outside the exempt folders, so both stages ran. Both nohup calls of the worker's transcript come after its last edit of code (the `ExprFactory.java` edit at 10:58:18, built by the `ant compileAll` that ended 10:59:14, 'BUILD SUCCESSFUL', 'Total time: 48 seconds'): the count started 11:16:18 and the distance 11:17:45, each on `535ad0a5c7`, which holds the code of `704d6fe747`. Read against the comparand, the last landed gate's tables (`explorations/compile-ladder/climb-batch-34b/gate/`, landed in `295c215c2c`, the newest gate summary by `git log -1 -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt'`):

    diff explorations/compile-ladder/climb-batch-34b/gate/checker-count.txt <the worker's checker-count-postedit.txt>
    (no output; rc 0; the worker's table: '#total 0', '#locations 0', '#crash none', '#shadow matches the tracked StaticChecker')

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-34b/gate/distance.txt <the worker's distance-postedit.txt>
    DISTANCE SAME   0

The report's tables are those of the worker's head. The diff changes no Scala of the checker and nothing the build generates for it (`compiler.md`, "The checker's time", names `scala_src/`, `Fortress.ast` and the generators), so I ran no count of my own.

### 2. Test first, in the worker's transcript

- 10:57:02 to 10:57:07: `git mv` of the `XXX` walk test and the compiled twin written (calls `bwTzjv`, `KQSW8n`); no harness run before.
- 10:57:15, call `MwHN6h`, the first run of the walk test, its command echoing first "Expected failure: harness-one.sh reports RadixPointLeadingZerosWalk red, 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section \"Literals\": 00.5 has three digits', then 'Tests run: 1,  Failures: 1'", then `harness-one.sh ... ProjectFortress/tests/RadixPointLeadingZerosWalk.fss`, on tree `13f4fdea75` with only the test files changed:

      FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section "Literals": 00.5 has three digits
      FAILURES!!!
      Tests run: 1,  Failures: 1,  Errors: 0

- 10:57:34, call `WnhYVi`, the first run of the compiled pair, its command echoing first "Expected failure: junit.sh reports RadixPointLeadingZerosCompiledLink.test OK and RadixPointLeadingZerosCompiled.test red, its run printing 'FAIL:  2 =/= 3; ...', then FAILURES!!! with 1 failure", then `ONE_JVM=1 .../junit.sh base ProjectFortress/compiler_tests RadixPointLeadingZerosCompiledLink.test RadixPointLeadingZerosCompiled.test`:

      . link ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled  OK (time = 3277ms)
      . run ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled (329ms) FAIL:  2 =/= 3; literals.tex, section "Literals": 00.5 has three digits
      FAILURES!!!
      Tests run: 3,  Failures: 1,  Errors: 0

- 10:58:18, call `StWgMH`: the one edit of code; 10:58:25, the build; then the library order, five compiles, each rc 0.
- 10:59:55 (`mzh41R`) and 11:00:07 (`RvniC7`), after the last change of code, the same two commands: 'OK (1 test)' and '. run ... (346ms) PASS', 'OK (3 tests)'.

Both failed on the base's code in the way the echoed line said, before the edit was built; both pass after the last change of code. `recordedFailure` and `recordedPass` quote these lines.

### 3. The diff, line by line

`git diff 13f4fdea7557b867c808d0c32af5dd2a03901f4b...HEAD` changes in the original tree: the four lines of the trim and a blank line deleted from `makeFloatLiteralExpr` (base `ExprFactory.java:1640-1643`); Appendix I's clause naming row 960 (base `changes.tex:5486-5488`); the walk test renamed by `git mv` with its `component` line; the compiled twin's three files. Fork R1 (`CLIMB-BATCH-35.md`, "Forks the batch takes", item 3) reads: "The node of a numeral with a radix point keeps its digits as written, apostrophes and narrow no-break spaces removed, its leading zeros among them; `NumeralNumbers.of` counts them; the value is unchanged." The edit does that and only that: apostrophes and U+202F are still removed (`ExprFactory.java:1637-1638`), `NumeralNumbers.of(FloatLiteralExpr)` counts the digit part of the text (`NumeralNumbers.java:78`, and `:90-94` where the written digits agree with the node's value), and the value comes from `new BigInteger(digits, base)` over the integer part, which reads leading zeros. A deletion of the trim is the smallest form; nothing to trim.

The Appendix I edit removes the one clause and keeps the sentence's other clauses whole (`changes.tex:5485-5487` now opens "row of the revival's gap ledger: the interpreter loads and runs a program that writes a numeral type in a \KWD{comprises} clause (row~981); ..."). `grep -rn '~960' Specification --include=*.tex` prints nothing on the head. No sentence of `literals.tex` changed. The other lines of the specification on leading zeros and the digit count stay true: `literals.tex:101` (the rule), `:151`, `constant.tex:147` (natural numerals only), `changes.tex:5179`, `:5510`.

### 4. Where the fix belongs, and the precedent

The parser's actions hand the whole text to the factory (`parser/Literal.rats:53-83`; the generated `Fortress.java`, `PreFortress.java` and `TemplateParser.java` call the same factory), so the factory is the one place both paths read. The precedent, `makeIntLiteralExpr(Span, String)` at `ExprFactory.java:609-632`, removes apostrophes and U+202F and trims nothing. The trim is the team's (`0e5ed9a75c`, 2007-09-14, "Fixed handling leading zeroes in float literals.", which narrowed `while (s.length() > 1 && s.charAt(0) == '0')` to the two-zero test; on the base, `git blame` stops at `5a68404fdf` of 2012, where the converted history is cut). No other site of the implementation trims a numeral's leading zeros: `grep -rn -i "leading zero\|charAt(0) == '0'\|startsWith(\"0\")\|stripLeading" --include=*.java --include=*.scala --include=*.rats` under `ProjectFortress/src/com/sun/fortress`, the generated parsers left out, prints nothing.

### 5. The tests

Each test file holds one comment line, says what it checks, and is named by its topic. The walk test is the promoted `XXX` file, its `component` line renamed; the twin is the planner's probe `P35RadixPointLeadingZerosCompiled.fss` with its prefix dropped, byte for byte otherwise, in the promoted run-pair form of `NatRtTask.test` and `NatRtTaskLink.test`. The messages cite `literals.tex, section "Literals"`, which is `Specification/basic/expressions/literals.tex:12`, `\section{Literals}`, and whose `:101` says "the number $n$ of its digits, leading zeros among them". Each test exercises the defect: on the base it fails with 2 for 3, as above.

### 6. My own programs, old code against new, on both paths

The commands, from the tree's root, with `OLD=/home/user/fortress-base42/explorations/coordinator/tools/old-fortress.sh` and the private folder `/home/user/fortress-radix-point-leading-zeros/tmp/old-caches`: walk `$OLD /home/user/fortress-base42 <old-caches> P.fss` and `bin/fortress P.fss`; compiled `$OLD ... compile P.fss && $OLD ... run P` and `bin/fortress compile P.fss && bin/fortress run P`. The diff holds no mutable variable, field, atomic block or write into a library's state, so each ran at `FORTRESS_THREADS=1` only.

**The four numbers.** A coercion `coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\]) = Four(n.asZZ32, m.asZZ32, r.asZZ32, v.asZZ32)` (compiled: each number through the `bigToZZ64` helper), with `opr -(self)` negating `v`, printed for eleven numerals. Walk and compiled print the same lines, old and new; old:

    00.5 n=2 m=1 r=10 v=5
    000.125 n=4 m=3 r=10 v=125
    00.50 n=3 m=2 r=10 v=50
    0'00.5 n=2 m=1 r=10 v=5
    -00.5 n=2 m=1 r=10 v=-5

new:

    00.5 n=3 m=1 r=10 v=5
    000.125 n=6 m=3 r=10 v=125
    0010.5 n=5 m=1 r=10 v=105
    00.50 n=4 m=2 r=10 v=50
    00.0 n=3 m=1 r=10 v=0
    00.1_2 n=3 m=1 r=2 v=1
    00.8_16 n=3 m=1 r=16 v=8
    0'00.5 n=4 m=1 r=10 v=5
    -00.5 n=3 m=1 r=10 v=-5

and `0.5` and `0.0` give n=2 both times. Every new `n` is the count of the digits written, digit-group separators not counted, as `literals.tex:101` gives it; `m`, `r` and `v` are unchanged. The values at the number types, `a: RR64 = 00.5`, `000.125`, `c: RR32 = 00.25`, `00.1_2`, `-00.5`, `00.5 + 00.25`, and under walk `q: QQ = 00.25`, print the same old and new on each path: walk 'values 0.5 0.125 0.25 0.5 -0.5 1/4 0.75', compiled 'values 0.5 0.125 0.25 0.5 -0.5 0.75'. A second walk run of the new code from its `interpreter_cache` entry, which holds the texts `"00.5"` and `"000.125"`, prints the same lines: the cache's round trip keeps the text.

**A where clause over `n`.** `coerce[...](x: RadixPointNumeral[\n, m, r, v\]) where { n < 3 } = Short(...)`, then `t: Short = 0.5` and `s: Short = 00.5`. Old, both paths: '0.5 bound, k=2' and '00.5 bound, k=2'. New, walk: '0.5 bound, k=2', then rc 1, 'RHS expression type RR64 is not assignable to LHS type Short' at the binding of `s`; new, compiled: rc 255, 'The numeral 00.5 does not meet the where clause of the coercion to Short.' Both paths now refuse a numeral that breaks the clause, as P-174 and `revival-changes.md`, "Numbers", say they refuse one; walk's message names no where clause, as before the rung for any numeral (the same message as the worker's where-clause probe).

**Folded constants.** `00.5 MIN 0.7`, `|00.5|`, `-(00.5 MAX 0.1)` and `000.25 MAX 0.1` at `RR64`: 'folded 0.5 0.5 -0.5 0.25' old and new, on both paths. `counted(000.25 MIN 0.7)` for a `Four` with only a numeral coercion: walk refuses, old and new, 'Unification error: Closure/Constructor for counted param 1 (f:Four) got arg 0.25:RR64 of type RR64'; compiled refuses, old '- Four->ZZ32 is not applicable to an argument of type RadixPointNumeral[\3,2,10,25\].', new '... RadixPointNumeral[\5,2,10,25\].'. This is the worker's question for the curator, seen in a second form: the folded constant reaches no coercion on either path (P-174), only the message shows its numbers.

No program measured a defect; walk and the compiled path agree on every program.

### 7. The three homes

Row 960: home 1, asserted by both tests, which pass. The folded constant's numeral type in a message: no source gives a folded constant numbers of its own, and no coercion reads them (the library's numeral coercions read only `v`, `r` and `m`: `Library/FortressLibrary.fss:389`, `:635`; `LibraryBuiltin/FortressBuiltin.fss:68`; `LibraryBuiltin/CompilerBuiltin.fss:895`, `:957`), so no row; the question stands for the curator. 'ZZ has no getter called asZZ32' is row 349's known limit. My programs measured nothing new.

### 8. The ledger and the sibling sites

`ledger-find` with "leading zero*", "digit count", "makeFloatLiteralExpr", "RadixPointNumeral" and "radix point" finds no open row the rung changes but 960; rows 360, 361, 454, 862, 944 and 967 are closed, 956 and 977 are other questions. `ledger.py find --cites ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java` names rows 693 (rung O's) and 960. The sibling type, the integer numeral, already keeps its zeros (`makeIntLiteralExpr`); the other path reads the same node; the callers of `makeFloatLiteralExpr` beside the parsers pass texts with at most one leading zero (`IntegerLiteralFoldingVisitor.java:209-211`, from `BigDecimal.toPlainString`, and `m + ".0"`) or unit-test texts (`NumeralFoldJUTest.java:29`, `ConstructorsJUTest.java:150-174`). No numeral with two or more leading zeros stands in the library, the test folders, the specification, `SpecData` or microGPT but the rung's two tests (the report's grep, and mine with digit-group separators allowed, `grep -rn -E "(^|[^0-9.A-Za-z_\"'])0[0']*0\.[0-9]"`, over `Library ProjectFortress Specification SpecData explorations/run-c4/src explorations/apl/mg`, prints only those).

### 9. The report

Its five provenance lines open as claimed: `fixes-35.md:16` and `:38` hold the planner's two failures; `literals.tex:101` and the Working Draft's `literals.tex:110-111` the rule; `ExprFactory.java:609-632` the precedent; base `ExprFactory.java:1640-1643` the trim; `changes.tex:5486-5488` the clause, which `git blame` on the base gives to `f36a651243` and `fcfd0aeb316`. Its cited readers open as described (`Misc.scala:474-477`, `CoercionOracle.scala:223`, `:229`, `:531-533`, `:621`, `IntegerLiteralFoldingVisitor.java:159`, `:251-253`, `:255-258`, `:402-403`, `CodeGen.java:2442`, `NumeralCoercionFold.java:400`, `ExprFactory.java:1907-1911`, `FortressAstToConcrete.java:1649-1650`, `CoercionDesugarer.scala:55`, `Functionals.scala:1240-1243`). The whole suites ran once on the fix's code, after the last edit: `ant testSystem` 'BUILD SUCCESSFUL', 'Total time: 4 minutes 55 seconds', shards 224, 220, 221 and 214, 0 failures, 879 as the gate's 223 + 221 + 218 + 217; `ant testQuick` 'BUILD SUCCESSFUL', 'Total time: 8 minutes 0 seconds', CompilerJUTest 1788, LibraryJUTest 86, OtherCompilerJUTest 263, 0 failures, the gate's 1785 and the twin's three cases. The suites ran on `704d6fe747`'s code, which the head still holds. The sentence of the specification made false is listed before and after. `record.md`'s FACTS entry, row close and Revival change section are true as written.

One statement of the batch record disagrees with the worker's account, and the worker is right: `CLIMB-BATCH-35.md:797` says "P-174, P-37 and P-180 stay true", but P-174's last sentence (`POSITIONS.md:106`), "Rows 960 and 981 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written in a `comprises` clause.", holds after this rung for row 981 only. `record.md` hands it to the record pass; it is left for the gather below.

### 10. Competing declarations

The rung adds the components `RadixPointLeadingZerosWalk` and `RadixPointLeadingZerosCompiled`, each with its own `Digits`, `counted` and (the twin) `bigToZZ64`. `git ls-files` and `git grep -w` find no other declaration of either component name in the test folders or in `ProjectFortress/src/com/sun/fortress/`; the other `counted` (`LocalFunctionCaptureWalk.fss:5`, `LocalFunctionCaptureCompiled.fss:5`) and `Digits` (`AsIfCallsWalk.fss:34`, `AsIfCallsCompiled.fss:34`) are declarations of other test components, each in its own component, and `ant testQuick` ran the compiled ones beside the twin in one JVM with 0 failures.

### 11. The failure mode

The rung turns no loud failure into a quiet value. It turns one quiet value into a refusal: a numeral with two or more leading zeros that a coercion's where clause on `n` admitted with the trimmed count is now refused on both paths (the where-clause program above), which is the specification's answer, since `n` counts the zeros.

## Points to report

- The fix as made, and every reader of the node's text that now sees the leading zeros: `ExprFactory.java:1637-1640`; the readers as the report lists them, the where-clause message now 'The numeral 00.5 ...', the folded `MIN`/`MAX` type now counting the operand's zeros.
- Row 960's test promoted and its compiled twin, each failing on the base and passing after: section 2.
- The sentence of the specification made false: `changes.tex:5486-5488` before, `:5485-5487` after.
- The two stages' tables on the final tree against the comparand: equal, section 1.

Not reached: a model line; a pinned message or a checked value that changes (the only pinned numeral type, `compiler_tests/XXX9h.test`'s `RadixPointNumeral[\\2,1,10,10\\]`, is `1.0` in `compiler_tests/Compiled9.h.fss:17`, with no leading zero); a file beyond those named.

## Left for the gather

- P-174's last sentence names row 960 as a departure (`POSITIONS.md:106`); after this rung it holds for row 981 only, against `CLIMB-BATCH-35.md:797`, "P-174, P-37 and P-180 stay true".
- The skill's `references/interpreter.md:26`, the bullet naming row 960, goes (`CLIMB-BATCH-35.md:813` already lists it).
- Row 960's close, after the landing (`record.md`).
