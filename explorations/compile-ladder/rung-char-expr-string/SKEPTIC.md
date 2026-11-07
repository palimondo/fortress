# Rung C, climb batch 27: the skeptic's verdict

Head judged: `f06b95ad3` (the worker's last commit). The branch already carried REPORT.md and record.md, so the journal step wrote nothing. Verdict: **approved**. One correction commit (`bcaf61e27`); no fix of the change; nothing contested.

## What was checked

1. **The stages.** Neither ran (REPORT.md, "The stages", says so). The diff reaches paths outside the list that cannot move them: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java` and `ProjectFortress/src/com/sun/fortress/parser/` (`git diff --name-only ed8652dc0...HEAD`). So the count stage and the distance stage are owed on this code, and so are `ant testQuick` and the specification's build. The disk allowance is still spent: `df -h /` printed `/dev/vda 252G 39G 66M 100% /` at the start of this check and `41M` later. The gate runs all four on the merged tree. The diff does not touch the checker's Scala, so no count stage was run here.
2. **Test first.** The worker's transcript shows the edit order. The tests were written at 08:13:48-08:14:17. The harness ran on the base's code at 08:14:25 (call `9PDezN`: `# harness-one ... tree ed8652dc0`, `FAIL: J7/0:'\'05'' =/= J6/0:'0005'`, `Tests run: 2,  Failures: 2`). `junit.sh` ran at 08:15:09 (`heSrY8`: `FAIL:  ToExprString of the backslash`, `Tests run: 2,  Failures: 1`). The helper was edited at 08:15:36 (`R8ZvWf`), the binding and `Literal.rats` at 08:15:47 (`MYtcvf`), and `ant compileAll` started at 08:15:55. The pass came at 08:17:11 (`EZ422E`: `OK (3 tests)`, `OK (2 tests)`). No change of code followed it.
3. **The diff.**
   - **Helper.** `simpleChar.java:24` routes `"` and `\` into the switch, so its own cases (`:31-32`) answer. U+201C, U+201D, U+2028, U+2029 and the surrogates get the code alone (`:37-39`). This is P-163's rule, neither narrower nor broader. Its code-alone set is exactly the parser's `InvalidCharLiteralContent` (`Literal.rats:484-492`): `\`, `"`, U+201C, U+201D, U+2028, U+2029, and the controls that `isISOControl` covers.
   - **Binding.** `FortressBuiltin.fss:615` names the helper.
   - **Parser.** `Literal.rats:460-466` reorders the choices only. The error productions are unchanged.
   - **Specification.** The list item and the callout are at `lexical-structure.tex:867-870` and `:882-887`. The entry at `changes.tex:4637-4710` follows the NaN entry's items. Its original text matches `Specification-1.0-frozen/basic/lexical-structure.tex:861-866`.
   - The callout's `\revision{label}{text}` matches the macro (`Specification/fortress/fortress.tex:87`) and the other callouts (`conversions-coercions.tex:74`).
4. **Precedent.** The prelude binds the same helper (`CompilerBuiltin.fss:232`). No other site binds `Char$ToExprString` or `charToExprString` (`grep -rn` over `LibraryBuiltin`, `Library` and `src`).
5. **The tests.** They hold every value the section lists. They carry one comment line each and no specification citation in a message.
6. **Programs of my own** (`tmp/rung-char-expr-string/skeptic/`).
   - **Parser, old and new.** `SkForms.java` parses `c = <form>` with `compiler/Parser.parseString`, compiled against each tree's classes (`run.sh /home/user/fortress-base27 old`, `run.sh /home/user/fortress-char-expr-string new`). It covers 45 forms: the three opening marks, `U+`, mixed case, three, five, six and seven digits, the redundant form in both cases, and names that begin with hexadecimal letters.
     - Every form that the base reads is read as the same character on the head, as in `same 'DEAD' | old: value dead | new: value dead` and `same '10FFF' | old: value 10fff | new: value 10fff`.
     - The only differences are forms the base refused, as in `DIFF '1000a' | old: error Syntax Error: a numeral contains letters ... | new: value 1000a`, `DIFF ‘10ffff’ | old: error ... | new: value 10ffff` and `DIFF 'U+1000a' | old: error ... | new: value 1000a`.
     - Errors stay errors with the same message: `same '1100000' | old: error Invalid character literal:  | new: error Invalid character literal: ` and `same 'AbCdE' | ... contains both uppercase and lowercase letter`.
     - So the reserved point, a literal that parses today and reads as another character after, is not reached.
   - **Walk on the head.** `SkCharText.fss` was run with `bin/fortress SkCharText.fss` and exited `rc=0`. It covers characters the worker's tests do not hold: `160 '  00a0'` (no-break space), `65279 '﻿ feff'`, `65535 '￿ ffff'`, `57344 ' e000'`, `128 '0080'`, `8221 '201d'`, `8233 '2029'`, `57343 'dfff'`, `1114111 '10ffff'`, `32 ' '`. Those texts read back from a UTF-8 source file: `readback true true true true true`.
   - **Not run.** The old walk and the compiled run of `SkCharText` were not run. The old code's private caches copy needs 36 MB, and the disk had 41 MB to 66 MB left, shared with running agents. The helper is the same Java on both paths, `NativeHelperFamilyCharCompiled` pins its texts, and the old walk texts are row 861's. The diff has no mutable state, so no thread variation applies.
7. **Homes.**
   - Row 861: home 1, in both guards.
   - Row 898: home 1, `CharExprStringReadBack`. The worker rightly used the row that already exists (`fortress-gap-ledger.md:89`, from `ad25f570a`, an ancestor of the base) rather than a duplicate NEW-C-1.
   - NEW-C-1: home 2, `XXXCharLiteralSupplementary`. The parser's single-`char` choices at `Literal.rats:447`, `:453` refuse a supplementary character. The section's "represents an abstract Unicode character" settles it.
   - NEW-C-2: a new defect that my programs measured. It is in the parser, not caused by the rung, and the rung does not repair it. See the finding below.
8. **Ledger.** `ledger.py find "character literal"` gives 200, 898 and 477, and `find BETA` gives none of its own.
9. **The report.** I opened its cited lines. Four citations were off by a line or a path, corrected in `bcaf61e27`. One sentence made false was missing from its list, F-308's count of 93, added there.
10. **Competing declarations.** `cToExprString`, `CharExprStringReadBack` and `XXXCharLiteralSupplementary` each occur only in their own file.
11. **Failure mode.** The parser now reads as a character some literals that were a static error: six-digit codes and lower-case five-digit codes. The specification's "four or more hexadecimal digits" names those forms. No throw becomes a quiet value. The helper throws nowhere, before or after.

## Finding: NEW-C-2, short names that begin with two hexadecimal digits

`SkForms` on the head printed these lines:

    'BETA'	error Syntax Error: a hexadecimal character literal has fewer than four hexadecimal digits.
    'DELTA'	error Syntax Error: a hexadecimal character literal has fewer than four hexadecimal digits.
    'beta'	error Syntax Error: a hexadecimal character literal has fewer than four hexadecimal digits.
    'ALPHA'	value 391

The base gives the same: `same 'BETA' | old: error Syntax Error: a hexadecimal character literal has fewer than four hexadecimal digits. | new: ...`.

Eleven of the parser's own names fail this way: BETA, DELTA, beta, delta, CAP, CAPCAP, CENTS, DEGREES, DEL, CBRT and DASHV (`names-new.txt`). `UnicodeHexChar`'s `ErrorProduction2` (`Literal.rats:473-477`) matches their first two letters as digits, logs, and commits. `CharLiteralContent` (`:198-200`) never reaches the names' own choices.

The specification settles it. `appendices/ascii-to-unicode.tex`, section "Converting Names of Unicode Characters and ASCII Shorthand", converts `BETA` and `DELTA`. `basic/lexical-structure.tex`, "Character Literals", admits such a sequence as a literal. So it is a home-2 defect. It is outside the rung, whose section reserves the parser's other rules.

Its row, NEW-C-2, is in record.md, linted, with only its number rule failing. Its `XXX` test is owed: with the disk spent, it could not be seen through the harness here. It is left for the gather.

## The correction

`bcaf61e27` makes these changes:

- REPORT.md: the section range (`:797-931`), the Effect's lines (`changes.tex:4668-4693`), the map's path (`explorations/coordinator/map/spec-to-implementation.md:159-168`) and the helper's range (`simpleChar.java:21-47`).
- record.md: the helper's range.
- REPORT.md's sentences made false: F-308's "each of the 93" and "the 93 keep", which become 94.
- record.md: row NEW-C-2.

No code changed, so no build and no suite ran.

## Left for the gather and the gate

- The count stage and the distance stage on this code.
- `ant testQuick`, which failed for the full disk.
- The specification's build: both `BUILD SUCCESSFUL` lines and the warnings grep.
- `changes.tex`'s Effect cites "row~NEW-C-1". It prints that placeholder until the gather numbers the row and replaces it.
- The `XXX` test of NEW-C-2.
- The other sentences that the change makes false: `changes.tex:4486`, `:4495`; F-308, F-299 and F-32.

## Verdict

Approved. The change does what P-163 and the section give: the helper's form completed, walk's binding on it, and the parser's choices longest first. No literal changes its character. The tests failed on the base's code before the build and pass after. The report is honest about what the disk did not let it run.
