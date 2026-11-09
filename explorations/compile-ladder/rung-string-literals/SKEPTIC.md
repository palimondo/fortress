# Rung S, string literals (P-171): the skeptic's check

Head judged: `c8e4dc4469`, the worker's last commit on `wip/rung-string-literals`. The branch already carried `REPORT.md` and `record.md`; each is byte for byte the journal's text (`journal-text.py ... --out tmp/... reportText rung:S resume:S`, then `diff`, printed nothing), so no journal commit was made. Head after: this file's commit.

Verdict: **approved**, with two fixes, both settled.

## What I checked

1. **The stages.** The worker's tables, read: `diff explorations/compile-ladder/climb-batch-28/gate/checker-count.txt tmp/rung-string-literals/checker-count-postedit.txt` prints nothing (`#total 0`, `#locations 0`, `#crash none`); `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-28/gate/distance.txt tmp/rung-string-literals/distance-postedit.txt` prints `DISTANCE SAME   0`; `#seconds 180 FortressLibrary 112`; `errors.tsv` holds its header only. Both stages started after the last change of code: the code edits were at 04:10:53Z and 04:11:05Z (transcript calls `GfUwjq`, `2ENJae`), the one build at 04:11:14Z to 04:12:09Z, the count stage at 04:33:13Z (`2bmmvm`) and the distance stage at 04:35:13Z (`KhARJa`), on `9d69d02ee0`, whose code is `de7c4fdd00`'s. The diff changes no Scala of the checker and nothing the build generates for it, so no timing of the checker applies. The tables are those of the worker's head; my fixes change test files and the record only, and no stage ran after them.
2. **Test first.** Walk's test failed through the harness on the base at 04:07:28Z (`HD9FWc`: `FAIL: two literals of one text are one object`, `Tests run: 2,  Failures: 1,  Errors: 0`) and the compiled test at 04:07:52Z (`kjub9p`: `. run ProjectFortress/compiler_tests/StringLiteralIdentityCompiled (352ms) FAIL:  two literals of one text are one object`, `Tests run: 4,  Failures: 1,  Errors: 0`), both before the first code edit. The character-first assertions, added after the fix, failed on the old code at 05:12:32Z (`RoGwCg`, base build `8cde0b2c4f`: `FAIL: two literals of one text are one object`) and in `old-fortress.sh ... junit` (`L993ty`: `(String, Object)->String is not applicable to an argument of type (Character, String).`, `Tests run: 3,  Failures: 2`). The last passing runs, after the last change of code: 05:12:36Z `OK (2 tests)` (`RoGwCg`) and 05:12:49Z `OK (5 tests)` (`L993ty`). `git diff --stat de7c4fdd00 HEAD` at the worker's head lists only tests and the record.
3. **The diff.** Walk: `Evaluator.java:1018-1021` interns the literal's text and `FString.java:35-39` compares the carried Java strings by `==`, P-171's words. Compiled: `equalityRule.java:62-66` compares two `FJavaString`s' carried strings by `==` after the class test; `CodeGen.java:5268-5277` keeps `ldc`, P-171's way (i). The fold: `PreTypeCheckDesugaringVisitor.java:133-138`, `:207-245`, in `PRETYPECHECKDESUGAR`, which both phase orders run before the checker (`compiler/phases/PhaseOrder.java:108-147`), fork S1 (42). It folds a string literal with a string or a character literal, both orders, as fork S1 and `Specification/basic/expressions/constant.tex`, "Types of Static Expressions", name them, and chains, which walk applies pairwise left to right (row 29) and the checker reads left-associatively after its multifix try (`scala_src/typechecker/impls/Operators.scala:396-404`); with a string among the first two, every step of the chain is a concatenation that the libraries declare.
4. **Where the fix belongs.** One site each: `grep -rn forStringLiteralExpr` over `interpreter/` and `compiler/codegen/` finds `Evaluator.java:1018` and `CodeGen.java:5268` only. The compiled runtime's other string class, `compiler/runtimeValues/FString.java`, is not a literal's carrier. The fold follows `IntegerLiteralFoldingVisitor` in naming its operator by text.
5. **The tests.** Each exercises row 945 and the fold on its path; one comment line each; named by topic; no specification line cited.
6. **My programs** (below).
7. **Homes.** Row 945: home 1. NEW-S-1: home 3 with an `XXX` compile test, as row 76's prelude defect is recorded (`compiler_tests/XXXJuxtConcatRungS.test`); `FileTests.java:394-425` makes a plain test whose compile fails red. The defect I found (below) is repaired here.
8. **The ledger and siblings.** `ledger-find` on "string literal", "concatenation", "Character String", "intern*", "rope" and "SEQV string*": rows 915 (a character past U+FFFF keeps its low 16 bits), 29 (walk applies a chain pairwise), 76, 908 and 923 bear on the rung, and the rung changes none of their claims; the fold leaves a supplementary character to the run time, so row 915 shows alike on a literal and a value.
9. **The report.** Its five provenance lines open as cited (`constant.tex:81-85`, `literals.tex:25-26`, `IntegerLiteralFoldingVisitor.java:143-176`, `PrecedenceMap.java:79`, `:187`, `Unprinter.java:267`, `PhaseOrder.java:125-147`, `PreTypeCheckDesugaringVisitor.java:235-236`), and so do `AnyPrim.java:23-26`, `simpleConcatenate.java:20-22`, `FortressLibrary.fsi:2437`, `:2662`, `CompilerBuiltin.fsi:37`, `objects.tex:51-53`, `literals.tick:29`, and the record's `Evaluator.java:889-891` and `FString.java:35-38` at `a874948ac`. The suites' logs agree: `testSystem.txt` ends `BUILD FAILED` with the four rope tests' `AssertionFailedError`s in `TEST-RESULTS/system-*`; `testQuick.txt` ends `Tests run: 1477, Failures: 0`, `BUILD SUCCESSFUL`. No sentence of the specification is made false: Appendix I's P-168 entry and the `revival-object-kinds` box say two strings are strictly equivalent only when they are one object, which still holds. Three corrections, below.
10. **Competing declarations.** `grep -rlw` of the three component names, `foldLiteralConcatenation` and my two new variables `cText` and `sText` over both test corpora, `test_library`, the libraries and `ProjectFortress/src/com/sun/fortress/` finds only their own files.
11. **Failure mode.** One loud failure becomes a value: on the compiled path the old code refused `'a' || "bc"` statically ('(String, Object)->String is not applicable to an argument of type (Character, String).'), and the new code makes it the literal `"abc"`, the value `constant.tex`, "Types of Static Expressions", gives ("One may concatenate mixed string and character literals, producing a string literal"). Two character literals first stay refused on both paths (below).

## My programs, old code against new

Under `tmp/rung-string-literals/skeptic/`. Walk: `old-fortress.sh /home/user/fortress-base29 <tree>/tmp/old-caches SkWalk.fss` and `bin/fortress SkWalk.fss`. Compiled: the same tool's `compile SkComp.fss` and `run SkComp`, and `bin/fortress compile SkComp.fss`, `bin/fortress run SkComp`; the compiled program calls `equality.sEquiv` bound at `Any`.

| case | walk old | walk new | compiled old | compiled new |
|---|---|---|---|---|
| `"a" \|\| 'b' \|\| 'c'` against `"abc"`, text `abc` both | false | true | false | true |
| `'a' \|\| "b" \|\| 'c'` against `"abc"` | false | true | refused | true |
| `"" \|\| ""` against `""` | false | true | false | true |
| `"\\" \|\| "n"`, two characters, against `"\\n"` | false | true | false | true |
| `"a\"" \|\| "b"`, text `a"b`, against `"a\"b"` | false | true | false | true |
| `"x" \|\| 'é'` against `"xé"` | false | true | false | true |
| `"x" \|\| '\n'`, two characters, against `"x\n"` | false | true | false | true |
| `"x" \|\| '1F600'`, size 2 both, against `"x" \|\| char(128512)` | false | false | | |
| a top-level `topv: String = "p" \|\| "q"` against `"pq"` | false | true | | |
| `idt("a" \|\| "b")` through a generic identity | false | true | false | true |
| `"a" \|\| ("b" \|\| 'c')` against `"abc"` | false | true | false | true |
| `BIG AND[i <- 1#200] same(ab(), "ab")`, parallel | false | true | | |
| a closure's literal, called twice | false | true | false | true |
| an object field holding `"ab"` against `"ab"` | false | true | false | true |
| `("ab", 1) SEQV ("ab", 1)` | false | true | false | true |
| `(true).asString` against `"true"` | false | true | false | true |
| `"a" \|\| ab()` against `"aab"` | false | false | false | false |
| juxtaposition `"a" "b"` against `"ab"` | false | false | | |
| `'a' \|\| 'b' \|\| "c"`, and `('a' \|\| 'b') \|\| "c"` (walk) | refused | refused | refused | refused |

Walk's refusals read 'Failed to find any matching overload, args = ('a','b')' on both codes; the compiled ones '(String, Object)->String is not applicable to an argument of type (Character, Character).' on both. The walk program printed the same lines at `FORTRESS_THREADS=4` as at 1 (`diff` printed nothing), as did the compiled run. The diff adds no mutable state; `String.intern` is the JVM's thread-safe table.

`(true).asString SEQV "true"` turns `true` on both paths because both answer Java's literal `"true"`, which the JVM interns: P-171's case of "Java answers the same object", where it says both paths answer `true`.

## Findings and fixes

### 1. Three revival tests passed by the fold without checking what they name (`91762b1a68`)

The rung respelled the tests that the fold turned red (REPORT.md, section 8). A scan of every `.fss` and `.fsi` of the test corpora, the demos, the libraries and the model programs for `||` between two literals (`tmp/rung-string-literals/skeptic/scan.py`) finds three more revival tests whose lines meant a run-time `||` and now pass by the fold:

- `tests/NativeHelperFloatMixedWalk.fss:43`, `abc = ("ab" || "c")`, "FlatString =": the folded `"abc"` is the same interned Java string as `abc`, so the assertion no longer compares two strings built apart; `:46`, `rope = ... || "ABCDEFGHIJKLMNOPQRSTUVWXYZ"`, is flat, so `:48` and `:49`, "FlatString = at a rope flattened", see no rope.
- `tests/StringConcatenationFamiliesWalk.fss:16`, `:17`, `:25` and `:26`: "|| of two strings", "|| of two short flat strings is flat", "|| of a string and a character", "|| of a character and a string" no longer reach the string objects' `||` that the test and F-249 are about.
- `tests/NativeHelperCarriedSelfFlatStringWalk.fss:67`, "||": no longer reaches the native concatenation.

The other hits keep their meaning: `NativeHelperNonFlatStringWalk` is refused at load whatever its string (its `.test` holds `load_exception_contains`); `FileWriteStreamParallelWalk` builds each line it writes at run time; `StringAvFlat`, `infixBars`, `objectCC*`, `Compiled2PreTest` and `ArrowRTTI4` check texts that the fold keeps.

The test, first: `assert(rope.depth > 0, true, "the rope is not flat")` after `NativeHelperFloatMixedWalk.fss:46`, as `NativeHelperWriterWalk` and `NativeHelperReaderWalk` assert theirs. On the worker's head, `explorations/compile-ladder/rung-inference-walk/harness-one.sh $S/h-head ProjectFortress/tests/NativeHelperFloatMixedWalk.fss`:

    # harness-one 2026-11-09T06:34:57Z; tree c8e4dc4469; ...
    FAIL: a Boolean: false =/= a Boolean: true; the rope is not flat
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

On the old code, `FORTRESS_HOME=/home/user/fortress-base29 /home/user/fortress-base29/explorations/compile-ladder/rung-inference-walk/harness-one.sh $S/h-old $W/ProjectFortress/tests/NativeHelperFloatMixedWalk.fss`: `OK (1 test)`.

The fix: each line joins a literal with a variable bound to a literal, as the rung's own respellings do, and keeps every value it checks (`cText`, `upperText`, `cdText`, `sText`). Through the harness, the three files on the head (06:35:48Z, `OK (3 tests)`) and on the old code (06:36:00Z, tree `8cde0b2c4f`, `OK (3 tests)`). Settled by the worker's own rule, `record.md:7` ("Meaning: a test that needs a rope or a string built at run time joins a literal with a variable") and `REPORT.md:183` (decision 8), which these lines meet; the worker's report argues nothing for their form, which it did not list. The three files are paths beyond the section's "your tests", listed below.

### 2. The report's sentences made false, and two line numbers (`a8c2d0b2a7`)

- REPORT.md section 12 said the skill's "the Working Draft, `constant.tex:75-79`" was wrong; it is right: `sed -n 75,79p Specification-1.0-frozen/basic/expressions/constant.tex` prints "The only operation on literals that produces a new literal ... yields ``foobar''." The revised text has it at `Specification/basic/expressions/constant.tex:81-85`.
- Section 12 lacked `.claude/skills/fortress-repo/references/interpreter.md:126`, "`||` builds a `CatString` when the joined string is longer than `maxLeafSize`", which the fold makes false for a concatenation of literals, and F-249's example "`"s" || "t"` is a `FlatString` of depth 0", which the fold now folds before the top-level `||` it illustrates.
- Section 8's "Its lines 43, 48 and 51 assert `false` as before" named the base's lines; they are now 45, 52 and 55.
- `record.md`'s finding 3 now names the three tests of fix 1.

## Where I differ from the worker

- Decision 8 respelled only the tests that turned red; the same premise held in three that stayed green (fix 1).
- Nothing else. The worker's decisions 1 to 7 and 9 to 11 are P-171's, fork S1's and fork S2's ways, or choices the record leaves open and the report argues with evidence; the question on `'a' || 'b'` stands for the curator.

## Suites

None run by me: both fixes change test files and the record, no Java or Scala. The worker's `ant testSystem` and `ant testQuick` ran on `de7c4fdd00`, the code of the head; the gate runs every suite on the merged tree.
