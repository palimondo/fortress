# Rung C, climb batch 27: Char's asExprString on the completed helper, the parser's hexadecimal codes, the list of character-literal forms

- problem: row 861, walk's glue and the compiled helper write a `Char`'s `asExprString` differently, and walk's text outside printable ASCII never reads back (`explorations/reviews/char-asexprstring-2026-11-06.md:116-149`, section 2.4); row 898, the parser refuses six-digit codes and lower-case five-digit codes whose first four are decimal digits (`ProjectFortress/src/com/sun/fortress/parser/Literal.rats:460-464` at the base)
- spec: `Specification/basic/lexical-structure.tex:797-931`, section "Character Literals", its list of forms at `:861-881`
- precedent: the compiled prelude's binding of the same helper, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:232`; the other 39 `Char` bindings on `simpleChar` helpers, as `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:612-613`; the Appendix I entry form of `Specification/appendices/changes.tex:4563-4635`
- deviation: none from the precedent; the specification's list gains one form (the revision callout at `Specification/basic/lexical-structure.tex:882`)
- historical: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/src/com/sun/fortress/parser/Literal.rats`, the generated `parser/Fortress.java`, `parser/preparser/PreFortress.java`, `parser/templateparser/TemplateParser.java`, `Specification/basic/lexical-structure.tex`, `Specification/appendices/changes.tex`, `ProjectFortress/tests/NativeHelperFamilyCharWalk.fss`, `ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss` (the last two are revival tests in the original tree's folders)

Commits on `wip/rung-char-expr-string`, from base `ed8652dc0`: `0b6c1a500` (tests), `beeda9a3f` (the fix, the expected failure, the specification), `85c982f03` (the generated parsers), and this report's commit.

## Not done: the disk allowance is spent

After `ant testSystem` passed, `ant testQuick` ran out of disk: "java.io.FileNotFoundException: .../ProjectFortress/test-caches/fast-compiler/bytecode_cache/Compiled15c.jar (No space left on device)", 887 of 1,432 compiler-track cases failing and the library and othercompiler tracks crashed (`ant testQuick`, `BUILD FAILED`, 3 min 21 s). Its verdict says nothing about the code. `df -h /` then printed `/dev/vda 252G 39G 443M 99% /` and stayed there for four minutes; this tree held 270 MB, the other rungs' worktrees and `/root` the rest, none mine to delete (the `cloud-container` skill, `references/machine.md`, "The disk allowance"). So these did not run, each needing more than the 443 MB left: `ant testQuick` again, the specification's build (its log alone can reach 400 MB), the count stage and the distance stage. The gate runs all four on the merged tree. What did run after the disk filled: `ant testOnly -DtestPattern=ParserJUTest` (small).

## What changed and why

1. `nativeHelpers/simpleChar.java:21-47`, `charToExprString`, as P-163 gives it. The quotation mark and the reverse solidus now enter the branch of the switch with the controls (`:24`), so they reach the switch's own cases (`:31-32`), `'\"'` and `'\\'`, which no character reached before; the printable-ASCII line moves after it (`:36`); and U+201C, U+201D, U+2028, U+2029 and U+D800 to U+DFFF get the code alone (`:37-39`), as the invalid code points do (`:42`). Every other character keeps its text: the printable characters outside ASCII as themselves with their code, `'é 00e9'`, and past U+FFFF the code alone, `'1f600'`.
2. `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:615`: walk's binding of `Char`'s `asExprString` names `com.sun.fortress.nativeHelpers.simpleChar.charToExprString`. Walk carries the `Char` in an `int` (F-308), so no transfer is needed. The glue class `Char$ToExprString` (`interpreter/glue/prim/Char.java:177`) stays, unbound. This was the last `Char` binding on glue.
3. `parser/Literal.rats:460-466`, `UnicodeHexChar`: `"10"` and four digits first, then exactly five digits, then exactly four, each in upper case and then in lower case; the error productions after them unchanged. Before, the first choice took four digits and an optional fifth, and the parser committed to it, so `'10FFFF'` took `10FFF` and `'1000a'` took `1000` and then met a digit where the closing mark must be. The template parser's `Literal.rats` modifies this module and has no copy of the rule (`parser/templateparser/Literal.rats:21`), so no second edit. `ant compileAll` regenerated the three committed parsers (`85c982f03`).
4. `Specification/basic/lexical-structure.tex:867-870`: the list of forms names "a single character as above, followed by a space and a sequence of four or more hexadecimal digits identifying the code point of that same character (e.g., `α 03B1`, `⊕ 2295`)"; the callout at `:882-887`.
5. `Specification/appendices/changes.tex:4637-4710`: the entry "A character literal that writes a character with its code" (`revival-char-redundant-literal`), before "Passages not yet revised", in the form of the NaN entry: affected section, change, rationale (the decision of 6 November 2026, P-163), effect, original text (`Specification-1.0-frozen/basic/lexical-structure.tex`, lines 861-866), route C.

## The test order

Tests first, committed in `0b6c1a500` before any code edit:
- `ProjectFortress/tests/NativeHelperFamilyCharWalk.fss`: 14 asserts of `asExprString`, at `a`, `'`, `\`, `"`, the line feed, U+0005, U+007F, `é`, `Σ`, U+201C, U+2028, U+1F600, U+10400 and U+D800, each at the completed helper's text.
- `ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss`: `cToExprString(x:ZZ32):JavaString = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleChar.charToExprString")` and the same 14 asserts.
- `ProjectFortress/tests/CharExprStringReadBack.fss` (new): 15 literals in the forms that the helper writes, `'é 00e9'`, `'Σ 03a3'`, `'\"'`, `'\\'`, `'0005'`, `'2028'`, `'1f600'`, `'10400'`, `'1000a'`, `'1000A'`, `'10FFFF'`, `'10ffff'`, `'100000'`, each read as its code point.

Failing on the base's code, through the harness, before the first build of the edit (08:14:26Z and 08:15:10Z; the build started after 08:15:15Z):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-char-expr-string/h1 ProjectFortress/tests/NativeHelperFamilyCharWalk.fss ProjectFortress/tests/CharExprStringReadBack.fss
    # harness-one 2026-11-07T08:14:26Z; tree ed8652dc0; ... cache empty
    FAIL: J7/0:'\'05'' =/= J6/0:'0005'; asExprString of a control character
    tmp/rung-char-expr-string/h1/tests/CharExprStringReadBack.fss:14:11-15:
        Syntax Error: a numeral contains letters and does not have a radix specifier.
    Tests run: 2,  Failures: 2,  Errors: 0

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh charbase ProjectFortress/compiler_tests NativeHelperFamilyCharCompiled.test
    . run ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled (242ms) FAIL:  ToExprString of the backslash
    Tests run: 2,  Failures: 1,  Errors: 0

(walk's first failing assert is U+0005, since walk already wrote `'\\'` and `'\"'`; the read-back test fails to parse at lines 14, 16, 17 and 20, `'1000a'`, `'10FFFF'`, `'10ffff'` and the second `'10FFFF'`, and `'100000'` at line 18 gives 'Syntax Error' in a run of its own.)

Passing after the edit, built (`ant compileAll`, `BUILD SUCCESSFUL`, 25 s, which started the caches again) and the library order run; no change of code followed:

    harness-one.sh ... NativeHelperFamilyCharWalk.fss CharExprStringReadBack.fss CharAsStringSupplementaryWalk.fss   # 08:17:11Z, tree 0b6c1a500 with the edit
    OK (3 tests)
    ONE_JVM=1 .../junit.sh charpost ProjectFortress/compiler_tests NativeHelperFamilyCharCompiled.test
    . run ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled (239ms) PASS
    OK (2 tests)

The expected failure `ProjectFortress/tests/XXXCharLiteralSupplementary.fss` (NEW-C-1), through the harness: as written, " OK Saw expected exception", "OK (1 test)"; with both literals changed for one run to `'1f600'`, " Missing expected failure", "Tests run: 1,  Failures: 1"; then restored, byte for byte.

## Suites

- `ant testSystem`, once, on the final code (commit `beeda9a3f`, the generated parsers as `85c982f03` commits them): `BUILD SUCCESSFUL`, `Total time: 3 minutes 16 seconds`; shards 189, 190, 190, 189, `Failures: 0, Errors: 0` each, 758 in all, the landed 756 (`explorations/compile-ladder/climb-batch-26/gate/summary.txt:57-60`) and the two new tests. `CharAsStringSupplementaryWalk` and walk's other `Char` tests among them keep their verdicts.
- `ant testQuick`: failed for lack of disk (above); not rerun.
- `ant testOnly -DtestPattern=ParserJUTest`: "Tests run: 188, Failures: 0, Errors: 0", `BUILD SUCCESSFUL`, as the landed misc track's 188 (`summary.txt:37`).
- `ant testSpecData`: not run by the rung; the gate runs it.

## Old against new: every code point in six forms

A scratch class (`tmp/rung-char-expr-string/sweep/CharSweepC.java`) parses `component Sw export Executable` / `c = <form>` with `compiler/Parser.parseString`, the parse both paths run first, and compares each literal's `getCharVal()` with the code point. It ran on this tree's build and on the base build's classes (`/home/user/fortress-base27/ProjectFortress/build`, read only, with caches under this tree's `tmp/`), for every code point of the BMP, of plane 1 and of plane 16, and every 7th of planes 2 to 15 (917,504 code points per form), in six forms: the helper's text, the code in lower case, in upper case, `U+` and the code, and the character with its code in lower and in upper case. Its lines on this tree include:

    helper 0..FFFF step 1: tried 65536, not read back 0 []
    helper 10000..1FFFF step 1: tried 65536, not read back 0 []
    helper 20000..FFFFF step 7: tried 131072, not read back 0 []
    helper 100000..10FFFF step 1: tried 65536, not read back 0 []
    redL 0..FFFF step 1: tried 65536, not read back 71 [0:error, 1:error, ...]

and on the base, `helper 0..FFFF ... not read back 6`, `helper 10000..1FFFF ... 6000`, `helper 20000..FFFFF step 7 ... 6857`, `helper 100000..10FFFF ... 65536`, the review's counts (section 2.4, point 12). Compared code point by code point (a `python3 -I` over the two folders of failures): in no form and range does a code point fail on this tree that the base read, and no literal reads as another character on either. So every literal that parses today parses to the same character (the reserved point is not reached). The 71 of the BMP that the redundant form refuses are the 65 controls, `"`, `\`, U+201C, U+201D, U+2028 and U+2029, exactly those the helper writes otherwise. The redundant form fails at every code point past U+FFFF on both trees (NEW-C-1). One run of the base's sweep, `redU` over planes 2 to 15, printed no line and wrote an empty file the first time; run again alone it printed `redU 20000..FFFFF step 7: tried 131072, not read back 131072`.

## Where the fix belongs, and the precedent

`explorations/coordinator/map/spec-to-implementation.md:159-168`, "Chapter 4, Lexical Structure": character literals are `Literal.rats:125` `CharLiteralExpr`, read by both paths' parser. P-163 names the three places. The precedent for the binding is the prelude's own binding of the helper (`CompilerBuiltin.fss:232`) and the 39 other `Char` bindings on `simpleChar` (F-308); the precedent for the escapes is the helper's own switch, whose two cases the edit reaches. Ways the language and library offer for the text: the helper's form completed (taken, P-163); the code alone everywhere (the review's option (c)); walk's glue form (it never reads back); a Fortress body in `Char` building the text from `codePoint` and `asString` (no precedent in the library for a `Char` getter in Fortress, and the compiled path would keep its own helper). For the parser: reorder the choices (taken, P-163); a semantic predicate on the closing mark (no precedent in `Literal.rats`).

## What the specification settles

The section names no `asExprString`; P-163 decides the text. The list gave four or more digits (`lexical-structure.tex:864-866`), so the six-digit and lower-case five-digit codes were gaps of the parser (row 898), and the list did not name the redundant form, now revised (P-96, P-95). The section's "a character literal evaluates to a value of type Char, which represents an abstract Unicode character" (`:815-817`) settles that a character past U+FFFF written as itself is a literal, so NEW-C-1 is a deferred defect of home 2.

## The stages

Not run, for the disk (above). The paths the rung changes: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java`, `ProjectFortress/src/com/sun/fortress/parser/` (Literal.rats and the three generated parsers) and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, outside the brief's list of paths that cannot move them. Expected by the batch record (fork 3): 0 and 0. The change can move neither by its kind: the binding names a helper of the same Java signature as the prelude's (`String charToExprString(int)`), as the other 39 `Char` bindings do, and the parser's edit changes only literals that failed to parse. The gate's tables on the merged tree are the record.

## The ladder subset

Empty: no file of the baseline's `raw/` names a character literal, a hexadecimal code, `asExprString` of a `Char` or `charToExprString` in its recorded first error (`grep -rl -i "character literal\|hexadecimal\|asExprString\|charToExprString\|redundant\|Char\$" explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing), and none of the 85 programs nor the microGPT sources holds a hexadecimal character literal (the only `asExprString` hits are `Comparison`'s, `not_working_library_tests/Comparison1.fss:28-31`). So nothing ran.

## Competing declarations

`cToExprString` appears only in the compiled guard; `CharExprStringReadBack` and `XXXCharLiteralSupplementary` only in their files (`grep -rn` over `ProjectFortress/src`, `tests`, `compiler_tests`, `LibraryBuiltin`, `Library`).

## Sentences made false

- `Specification/appendices/changes.tex:4486`, entry "A native binding that names a static helper": "forty of \TYP{Char}" now undercounts by one, and `:4495` "The other 143 still name a glue class" by one; the gather corrects the entry (fork 7).
- `explorations/coordinator/FACTS.md:138`, F-308: "only `Char`'s `asExprString` stays on a glue class (row 861)" and "`Char`'s 39 bindings", and with them its two counts "each of the 93" and "the 93 keep the glue classes' values", which become 94; F-299 (`FACTS.md:134`), 306 becomes 307; F-32 (`FACTS.md:30`), 143 becomes 142.
- Row 861's claim, closed by the gather; row 898's claim, closed by the gather.
- The `fortress-repo` skill: no text on the two forms (`grep -rn "asExprString\|redundant" .claude/skills/fortress-repo/references/` outside `sources.md` prints nothing).
- No note on walk or the compiled path in the specification names the text.

## Points to report reached

- The helper's change as written, and the binding's string: `simpleChar.java:24-39`; `FortressBuiltin.fss:615`.
- The parser's rule before and after: `Literal.rats:460-466`; its gap was already row 898 (see decisions), now closed by `CharExprStringReadBack`; the new row is NEW-C-1 with `XXXCharLiteralSupplementary`.
- The tests before and after through the harness and `junit.sh`: above.
- The revised list and callout, and the entry's Effect: `lexical-structure.tex:867-870`, `:882-887`; `changes.tex:4668-4693`.
- The specification's build: not run (disk).
- The count and distance tables: not run (disk).
- Verdicts changed in `ant testSystem`: none, 758 pass; `ParserJUTest` 188 pass; `ant testQuick` not measured.
- Files edited beyond those named: the three generated parsers (`85c982f03`), which `ant compileAll` writes from `Literal.rats`; and `ProjectFortress/tests/XXXCharLiteralSupplementary.fss`, the expected failure of NEW-C-1.

## Decisions

1. Row 898 instead of a new row for the parser's two gaps. The brief asks for NEW-C-1 for them; the ledger already holds them as row 898 (`fortress-gap-ledger.md:89`, added at `ad25f570a` on 2026-11-06 from the same review). Taken: `CharExprStringReadBack` as row 898's reproducer, its whole line given for the gather's rewrite and close. Not taken: a duplicate row. NEW-C-1 goes to the defect that the sweep measured and no row held.
2. The helper's quotation mark and reverse solidus routed into the switch's branch rather than two early returns, so the switch's own two cases are what answer, as the brief says. Not taken: two `if` returns before the printable line, the same values.
3. U+201C, U+201D, U+2028, U+2029 tested by value and the surrogates by `Character.isSurrogate`. Not taken: a test through the parser's `InvalidCharLiteralContent`, which the helper cannot call.
4. The parser's rule as six choices, exact counts, upper case before lower case at each length. Not taken: keeping `[0-9A-F]?` for the fifth digit, which commits to four where five lower-case digits follow.
5. The list's new item placed after the hexadecimal item and written "a single character as above", so that it inherits the single-character form's restrictions, which the parser's `!InvalidCharLiteralContent` applies to both (`Literal.rats:447`, `:453`). Not taken: naming `U+` (fork C2).
6. NEW-C-1 recorded as an expected failure (home 2): the section settles it. Not taken: a ledger row only (home 3).
7. The read-back test also asserts `'Σ 03a3'`, `'0005'`, `'1000A'` and `'100000'`, so that it holds each of the helper's kinds and both cases of the rule; the brief's nine are among its 15.
8. The suites, the specification's build and the stages that the disk refused are left to the gate rather than run on a full disk.

## Defects and their homes

- Row 861, the two paths' texts: home 1, `NativeHelperFamilyCharWalk` and `NativeHelperFamilyCharCompiled`.
- Row 898, the parser's six-digit and lower-case five-digit codes: home 1, `CharExprStringReadBack`.
- NEW-C-1, a character past U+FFFF written as itself, alone or with its code, refused by the parser: home 2, `XXXCharLiteralSupplementary`, red on the deliberate fix.
- The full disk: not a defect of the tree; the allowance of this session is spent.
