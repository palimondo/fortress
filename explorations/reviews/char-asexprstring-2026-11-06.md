<!-- The design for the curator's decision on which text `Char`'s `asExprString` writes for a character outside ASCII, walk's form or the compiled helper's or another (review-queue item 354; ledger row 861, `CONTESTED`), written 2026-11-06 by an Opus worker, reading only, with runs of walk and of the compiled path from the main tree's build and a sweep of the code points through the tree's own parser. -->

# `Char`'s `asExprString` outside ASCII: the design for the curator's decision

The tree is `main` at `cf76ed3fa`. Its code is that of `b88d26f52`: `git diff --stat b88d26f52 cf76ed3fa` over `ProjectFortress/`, `Library/`, `Specification/`, `Documentation/`, `bin/` and `build.xml` is empty. Every Fortress run below used the main tree's build, with a private caches folder (`FORTRESS_CACHES` and `-Dfortress.caches` set to a folder under the tree's `tmp/`), on JDK 25.0.4.1. The probe programs are scratch and are not committed; each section quotes the program, the command and the output. A Java path without a prefix is under `ProjectFortress/src/com/sun/fortress/`. Commits named by hash are in the team's trunk (`a874948ac` and its history) unless the text says "the revival".

## 1. The question, and a primer

**The question.** For a character outside ASCII, which text does `Char`'s `asExprString` write: walk's form `'\'0e9''`, the compiled helper's form `'é 00e9'`, or a third form that the specification gives?

**The words and the forms.**

1. *Walk* is Fortress's interpreter. The *compiled path* compiles a program to JVM bytecode and runs that. After the *switch-over*, both paths use one library, the interpreter's library, called *the one library* [1].
2. A *native binding* is a library declaration whose body is `builtinPrimitive("…")`. The string names the Java code that does the work. A *glue class* (under `interpreter/glue/prim/`) takes walk's own values, so only walk can run it. A *helper* (a public static method under `nativeHelpers/`) takes plain Java values, so both paths can run it. The natives' work moves each binding from a glue class to a helper. `Char`'s `asExprString` is the last binding over `NN32`, `NN64` and `Char` that still names a glue class [2].
3. Every Fortress object has three getters that write it as text [3]:
   - `asString`: the text for a reader;
   - `asDebugString`: the text for debugging, which may say more;
   - `asExprString`: the text of a Fortress expression that makes the value. The team's comment says: "when considered as Fortress expression, will equal self".

   The team's own test of these getters on a character, under walk [4]:

       f:Char = 'f'
       assert(f.asString, "f")
       assert(f.asExprString, "'f'")
       assert('\"'.asExprString, "'\\\"'")
       assert(f.asDebugString, "a Char: f")

   For other types, `asExprString` writes a numeral or a literal: `(-3).asExprString` is `-3`, `(1.5).asExprString` is `1.5`, `(1:3).asExprString` is `1:3`, and `"a\nb\"c".asExprString` is `"a\nb\"c"`, the string in double quotes with its escapes (run in section 3, points 12 and 13).

   The question of this review, as a program:

       c = char(233)            (* é, U+00E9 *)
       println c.asString       (* é *)
       println c.asExprString   (* walk: '\'0e9''   the compiled helper: 'é 00e9' *)
4. A `Char` holds one Unicode *code point*: the number that Unicode gives a character. It is written `U+` and hexadecimal digits. Two examples run through all of this review [5]:
   - `é`, LATIN SMALL LETTER E WITH ACUTE, is U+00E9, the number 233;
   - the emoji `😀`, GRINNING FACE, is U+1F600, the number 128,512.
5. *ASCII* is the first 128 code points, U+0000 to U+007F. *Printable ASCII* is the 95 of them from the space U+0020 to the tilde U+007E. The others are *control characters*, such as the line feed U+000A. "A character outside ASCII" means a code point of 128 or more.
6. Unicode has 1.11M code points, U+0000 to U+10FFFF, in 17 *planes* of 65.5K each, numbered 0 to 16. Plane 0, U+0000 to U+FFFF, is the *Basic Multilingual Plane* (BMP). `é` is in it. The emoji is past it, in plane 1. Plane 16, U+100000 to U+10FFFF, is for private use: Unicode gives its code points no meaning of their own (section 1, reference 10). The difference matters because a Java `char` holds 16 bits, so only a BMP code point. A Java string holds a code point past U+FFFF as two `char` units, a *surrogate pair*; each unit is a *surrogate*, a code point in U+D800 to U+DFFF that Unicode reserves for this use [6].
7. Walk keeps a `Char` as a whole code point. But its conversion to a Java string keeps only the low 16 bits. So walk writes U+1F600 as if it were U+F600 (ledger row 872) [7].

**How a character literal is written.** The specification's section "Character Literals" gives the rules [8]:

8. The marks are two apostrophes, `'a'`; a backquote and an apostrophe, `` `a' ``; or the curly marks U+2018 and U+2019, `‘a’`.
9. Between the marks stands one of these:
   - one character: `'a'`, `'$'`, `'α'`;
   - four or more hexadecimal digits, the code point: `'001C'`, `'FBAB'`, `'1D11E'`;
   - `TAB`, `NEWLINE` or `RETURN`;
   - the Unicode name of a character, with its spaces and hyphens, `'PLUS-MINUS SIGN'`, or with underscores in their place, `'GREEK_CAPITAL_LETTER_LAMBDA'`, or a short ASCII name that the program's ASCII conversion turns into one character;
   - an *escape*, a backslash and one character: `\b`, `\t`, `\n`, `\f`, `\r`, `\"`, `\\`, and `\“`, `\”` for the curly double quotes.
10. `'''` is the apostrophe itself: an apostrophe just after the opening mark does not close the literal.
11. These are static errors: one backslash alone, `'\'`; a double quote without its backslash, `'"'`; a line feed, form feed, carriage return, line separator (U+2028) or paragraph separator (U+2029) inside the marks; and any other contents: "It is a static error if the sequence of enclosed characters is not one of the kinds listed above."
12. The parser reads two more forms, which the specification's text does not list. Guy Steele added both in June 2011 (section 3) [9]:
    - the prefix `U+`: `'U+00E9'`;
    - the *redundant form*: the character, a space, and its code, `'é 00e9'`. The parser checks that the character and the code agree.

    The parser refuses hexadecimal digits that mix upper case and lower case, as `'1F60a'`.

**What the parser reads back today.** To *read back* a text is to parse it as a literal and get the same code point. One-line programs, each `c = <literal>` and `println(c.codePoint)`, run under walk (the parser is the same on both paths) [10]:

13. Read back as U+00E9: `'é'`, `'00e9'`, `'00E9'`, `'U+00E9'`, `'é 00e9'`. Read back as U+1F600: `'1f600'`, `'1F600'`, `'U+1F600'`. Read back: `'\\'` (92), `'\"'` (34), `'''` (39), `'0005'` (5), `'2028'` (8232), `'D800'` (55296).
14. Refused: the name with spaces, `'LATIN SMALL LETTER E WITH ACUTE'`, and with underscores, both "Syntax Error"; the emoji written as itself, `'😀'`, "Syntax Error", because the parser takes one 16-bit unit as the one character [11]; and two kinds of code that the specification allows: six digits, as `'10FFFF'`, and five lower-case digits whose first four are decimal digits, as `'1000a'` (U+1000A, LINEAR B SYLLABLE B057 JA). Both give "a numeral contains letters and does not have a radix specifier". The same five digits in upper case, `'1000A'`, read back as 65546. These two are gaps of the parser that no ledger row holds (section 2, point 12).

**References**

1. `.claude/skills/fortress-repo/SKILL.md`, the words *walk*, *compiled path* and *one library*, and "Each path has its own library today".
2. P-58 (`explorations/coordinator/POSITIONS.md:55`); F-32 (`FACTS.md:30`); F-308 (`FACTS.md:138`): "Of the 94 bindings over these types … only `Char`'s `asExprString` stays on a glue class (row 861)."
3. `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32-36`.
4. `Library/String.fss:336-346`, the `test` declaration `stringifyChars` (no suite runs it: no `.test` file names `String.fss` or `stringifyChars`).
5. `java -Dstdout.encoding=UTF-8 CharPeers.java`, a scratch class that prints `Character.getName(0xE9)` and `Character.getName(0x1F600)`: "LATIN SMALL LETTER E WITH ACUTE", "GRINNING FACE".
6. The same class: `Character.toString(0x1F600)` has length 2, and `(char) 0x1F600` is `f600`.
7. `interpreter/evaluator/values/FChar.java:97-102`, with the team's comment "right now val is an int type, but the String.valueOf only handles 16-bit chars"; ledger row 872.
8. `Specification/basic/lexical-structure.tex:797-922`.
9. `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:447-452` (the redundant form), `:456-458` (`U+`), `:460-480` (the digits, with the error for mixed case at `:476-480`); `nodes_util/ExprFactory.java:687-709`, which reads the redundant form's character.
10. 33 programs, one form each, as `component RbHexLower export Executable run():() = do c = '00e9' println("RbHexLower " || c.codePoint.asString) end end`, each run as `bin/fortress <name>.fss`. Outputs, among them: `RbHexLower 233`, `RbHelperEacute 233`, `RbHexUplus 233`, `RbRawEacute 233`, `RbHexEmojiLower 128512`, `RcUplusEmoji 128512`, `RbEscBackslash 92`, `RbApostrophe 39`, `RcSurrogate 55296`; and `RbNameSpaces.fss:5:9: Syntax Error`, `RbRawEmoji.fss:5:9: Syntax Error`, `RcTenFFFF.fss:5:8-13: Syntax Error: a numeral contains letters and does not have a radix specifier.`, `RbHexMixed.fss:5:8-12:` the same message; `RdLower5.fss:5:8-12:` (`'1000a'`) and `RdLowerCjk.fss:5:8-12:` (`'2000a'`), the same message; `RdUpper5 65546` (`'1000A'`). The names: `python3 -I -c` with `unicodedata.name` (Unicode 15.1.0): `0x1000a LINEAR B SYLLABLE B057 JA`, `0x2000a CJK UNIFIED IDEOGRAPH-2000A`, `0x1300a EGYPTIAN HIEROGLYPH A008`, `0x100000 (no name) Co` (private use).
11. `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:453`, `a1:(!InvalidCharLiteralContent _)`: one Java `char`.

## 2. Where it is built today, on each path

### 2.1 Walk

1. The binding: `getter asExprString(): String = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Char$ToExprString")`. The glue class returns `FChar.toString()`, which is `"'" + Unprinter.enQuote(getString()) + "'"` [1].
2. `getString()` keeps the low 16 bits (section 1, point 7) [2].
3. `Unprinter.enQuote` writes `\b`, `\t`, `\n`, `\f`, `\r`, `\"` and `\\` as escapes. It writes every other character below the space or above the tilde as a backslash, an apostrophe, the hexadecimal code, and an apostrophe. It puts a `0` in front when the code has fewer than two digits or starts with a letter. So `é` (code `e9`) becomes `\'0e9'`, and walk's whole text is `'\'0e9''` [3].
4. `Unprinter` is not part of the language's grammar. It reads a text form of the syntax tree, which its companion class `Printer` writes, as `ASTIO` does when it stores a tree. This review calls that text form the *syntax-tree dump*. `enQuote` is the dump's own escape, and `Unprinter.deQuote` reads it back inside the dump, where a `\'` code must start with a digit [4].

### 2.2 The compiled path

5. The compiler's prelude imports the helper `simpleChar.charToExprString` and binds `Character`'s `asExprString` to it [5].
6. The helper writes [6]:
   - a printable ASCII character as itself, `'a'` (line 24);
   - a control character (U+0000 to U+001F, and U+007F to U+009F) as an escape or as its code alone, four digits: `'\n'`, `'0005'` (lines 25-35);
   - any other BMP character as the redundant form: the character, a space, and four lower-case digits, `'é 00e9'` (line 37);
   - a code point past U+FFFF as its code alone: `'1f600'` (line 42).
7. Its switch has cases for `"` and `\` (lines 32-33). They are never reached: line 24 returns first for every printable ASCII character, and the switch is only for control characters. So the helper writes `'"'` and `'\'`, which section 1, point 11 makes static errors [6].

### 2.3 The two forms, run on the same characters

8. The same 13 characters, on each path [7]. Walk's form is first, then the helper's:
   - `a`: `'a'`, `'a'`
   - the apostrophe: `'''`, `'''`
   - the backslash: `'\\'`, `'\'`
   - the double quote: `'\"'`, `'"'`
   - the line feed: `'\n'`, `'\n'`
   - U+0005: `'\'05''`, `'0005'`
   - U+007F: `'\'7f''`, `'007f'`
   - `é`, U+00E9: `'\'0e9''`, `'é 00e9'`
   - `Σ`, U+03A3: `'\'3a3''`, `'Σ 03a3'`
   - U+2028: `'\'2028''`, the separator itself, a space and `2028`
   - `😀`, U+1F600: `'\'0f600''`, `'1f600'`
   - U+F600: `'\'0f600''`, U+F600 itself, a space and `f600`
   - U+10400: `'\'400''`, `'10400'`
9. 10 of the 13 differ. Row 861 says that "the ASCII ones agree". That holds for the printable ASCII characters other than `\` and `"`, and for the escapes. It does not hold for `\`, `"` and the other control characters. Over all 1.11M code points, the two forms are the same text at 98 only: the 93 printable ASCII characters other than `\` and `"`, and `\b`, `\t`, `\n`, `\f`, `\r` [8].
10. Walk writes U+1F600 and U+F600 as one text, `'\'0f600''`, and U+10400 as `'\'400''`, the text of U+0400. So past U+FFFF walk's form does not even name the right character [7].

### 2.4 Whether each form reads back

11. Outside printable ASCII and the five escapes, walk's form never reads back. The parser stops at its first backslash [9]:
    - `'\'0e9''`: "Invalid character literal: \" and "a hexadecimal character literal has fewer than four hexadecimal digits";
    - `'\'0f600''` and `'\'05''`: "Invalid character literal: \".

    The helper's form reads back for `é` and `Σ`, on both paths: walk read `'é 00e9'` as 233 and `'Σ 03a3'` as 931, and a compiled program read `'é 00e9'` as 233, `'00e9'` as 233 and `'1f600'` as 128512. Its `'\'`, `'"'` and its form for U+2028 are refused: "Invalid character literal: \", "Invalid character literal: \"", and "The character in a redundant character literal is invalid or does not match the given hexadecimal codepoint" [9].
12. A sweep wrote code points in each form and parsed `c = <form>` with the tree's parser, `compiler/Parser.parseString`, the parse that both paths run first. It counts the code points that read back as themselves. It took every code point of the BMP, of plane 1 (U+10000 to U+1FFFF, where the emoji is) and of plane 16 (U+100000 to U+10FFFF), and every 7th code point of planes 2 to 15 [10]:
    - walk's form: in the BMP, 100 of 65.5K, the printable ASCII characters and the five escapes. Past U+FFFF, none: 0 of plane 1's 65.5K and 0 of the 140K sampled up to U+10FFFF. Some read back as another character, the one of their low 16 bits, as U+10041 would as `A`: 100 in plane 1 and 214 in the sample.
    - the helper's form: in the BMP, all but 6 of 65.5K: `"`, `\`, U+201C, U+201D, U+2028 and U+2029. In plane 1, all but 6K of 65.5K; in the sample of planes 2 to 15, all but 6,857 of 131K; in plane 16, none of 65.5K.
    - the code alone in upper case, with printable ASCII and the escapes as in the helper (option (c) below): in the BMP, in plane 1 and in the sample of planes 2 to 15, every one; in plane 16, none.
    - the helper's form with its gaps closed (option (d) below): in the BMP, all 65.5K. Past U+FFFF it writes the helper's texts.

    The failures past U+FFFF come from two gaps of the parser, both in one rule, `UnicodeHexChar`. Its first choice takes four or five upper-case or decimal digits, its second the same in lower case, and its third and fourth `10` and four digits. The parser commits to the first choice that matches, and does not come back to try another when the closing mark then fails to follow. So for `'10FFFF'` the first choice takes `10FFF`, and for `'1000a'` it takes `1000`; in each case a digit stands where the closing mark must be [11]. Two kinds of code fail:
    - every code of six digits: plane 16, 65.5K code points, a private-use plane, in either case;
    - in lower case only, a code of five digits whose first four are decimal digits and whose last is a letter, as `1000a`: 6K in each of planes 1 to 9 (1,000 four-digit beginnings times six letters), 54K in all. They include assigned characters, as U+1000A, LINEAR B SYLLABLE B057 JA, U+1300A, EGYPTIAN HIEROGLYPH A008, and U+2000A, a CJK ideograph.

    Every failure that the sweep listed is of these two kinds, and the sample's 6,857 is the count that the rule gives for it. So the helper's form misses 119.5K of the 1.05M code points past U+FFFF, and the code in upper case misses 65.5K. No ledger row holds either gap (`facts-extract.sh 'ledger-find:hexadecimal'` finds none).
13. The sweep reads a Java string, not a file. A surrogate alone cannot be written in a UTF-8 file: Java writes the helper's form for U+D800 as the bytes `27 3f 20 64 38 30 30 27`, where `3f` is `?`. So the helper's redundant form for the 2K surrogates reads back in the sweep but not through a source file [12].

**References**

1. `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:614-615`; `interpreter/glue/prim/Char.java:177-181`; `interpreter/evaluator/values/FChar.java:104-106`.
2. `interpreter/evaluator/values/FChar.java:100-102`; row 872.
3. `nodes_util/Unprinter.java:454-479`, `:481-483` (`needsUnicoding`: below `' '` or above `'~'`).
4. `nodes_util/Unprinter.java:16-20` ("converting from a readable AST to an AST data structure. It assumes input generated by the companion class Printer"); `:403-421` (`deQuote`'s `\'` state: "Character.isDigit(escaped.charAt(0))"); `nodes_util/Printer.java:116`; `nodes_util/ASTIO.java:105-108`; the unit test `tests/unit_tests/ASTJUTest.java:403-416` (`"\\'555'"` for U+0555).
5. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:231-232`, `:1066`.
6. `nativeHelpers/simpleChar.java:21-51`.
7. Walk: a scratch component `CharExprWalk` whose `show(what: String, c: Char) = println(what || " " || c.codePoint.asString || " " || c.asExprString)` is called on `'a'`, `char(39)`, `char(92)`, `char(34)`, `char(10)`, `char(5)`, `char(127)`, `char(233)`, `char(931)`, `char(8232)`, `char(128512)`, `char(62976)`, `char(66560)`; `bin/fortress CharExprWalk.fss`, `rc=0`. Its lines include `e-acute 233 '\'0e9''`, `emoji 128512 '\'0f600''`, `U+F600 62976 '\'0f600''`, `U+10400 66560 '\'400''`. Compiled: a scratch component `CharExprCompiled` with the same calls on `makeCharacter(n).asExprString`; `bin/fortress compile CharExprCompiled.fss` (exit 0), then `bin/fortress run CharExprCompiled` with `-Dstdout.encoding=UTF-8` in `JAVA_FLAGS`, `run-rc=0`. Its lines include `backslash 92 '\'`, `quote 34 '"'`, `e-acute 233 'é 00e9'`, `emoji 128512 '1f600'`, `U+10400 66560 '10400'`. Without that flag, this JDK on this machine (no locale set) writes each non-ASCII character as `?`: `e-acute 233 '? 00e9'`.
8. A scratch class `Compare` that, for each of the 1,114,112 code points, compares walk's text (point 1's code, called directly) with `simpleChar.charToExprString`: "walk's form equals the helper's at 98 (outside printable ASCII: 0008 0009 000A 000C 000D )".
9. The programs of section 1, reference 10: `RbWalkEacute.fss:5:8: Invalid character literal: \`, `RbWalkEacute.fss:5:10-11: Syntax Error: a hexadecimal character literal has fewer than four hexadecimal digits.`; `RbHelperEacute 233`; `RbHelperSigma 931`; `RbHelperBackslash.fss:5:8: Invalid character literal: \`; `RbHelperQuote.fss:5:8: Invalid character literal: "`; `RbHelperLs.fss:5:8-12: Syntax Error: The character in a redundant character literal is invalid or does not match the given hexadecimal codepoint.` Compiled: a scratch component `CharReadCompiled`, `bin/fortress compile` then `run`: `redundant 233`, `hex4 233`, `hex5 128512`.
10. A scratch class `CharSweep` that, for each code point and form, parses `component Sw… export Executable c = <form> run():() = () end` with `Parser.parseString` (`compiler/Parser.java:341-347`) and compares the literal's `getCharVal()` with the code point. Each run had its own folder and caches folder, because the parser writes its logs under the caches folder by the file's name (`repository/ProjectProperties.java:299`, `:414-416`). Outputs: `walk 0..FFFF step 1: tried 65536, read back as the same code point 100, parse error 65436, another value 0`; `helper 0..FFFF step 1: tried 65536, read back as the same code point 65530, parse error 6` with `fails: 0022:error 005C:error 201C:error 201D:error 2028:error 2029:error`; `hex 0..FFFF step 1: tried 65536, read back as the same code point 65536`; `completed 0..FFFF step 1: tried 65536, read back as the same code point 65536`; `walk 10000..1FFFF step 1: … the same code point 0, parse error 65436, another value 100` (among them `10041:value 41`); `helper 10000..1FFFF step 1: … the same code point 59536, parse error 6000` (its listed failures `1000A`, `1000B`, … `1666D`); `hex 10000..1FFFF step 1: … the same code point 65536`; `helper 20000..FFFFF step 7: tried 131072, read back as the same code point 124215, parse error 6857`; `hex 20000..FFFFF step 7: tried 131072, read back as the same code point 131072`; `walk 20000..10FFFF step 7: tried 140435, read back as the same code point 0, parse error 140221, another value 214`; `helper 100000..10FFFF step 1: … the same code point 0, parse error 65536`; `hex 100000..10FFFF step 1: … the same code point 0, parse error 65536`. A count of the codes in the sample that match the rule's failing kind, by `python3`: 6,857; over all of planes 1 to 16 in lower case: 119,536.
11. `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:460-464`.
12. A scratch class that prints the UTF-8 bytes of `"'" + "\uD800" + " d800'"`: "UTF-8 bytes of the helper's form for U+D800: 27 3f 20 64 38 30 30 27".

## 3. The team's sources, and which way they point

### 3.1 The specification

1. **The grammar of a character literal** is section 1's points 8 to 11. Of its forms, only the code alone can write every character: every code point has hexadecimal digits, and the text asks for no other condition than that the digits name "a Unicode abstract character". The single character cannot write a control character, a separator, a lone backslash or a double quote; the escapes cover only nine characters; the names do not read back today (section 1, point 14) [1].
2. **Its authors and dates.** The section entered the git record on 2009-11-06, when Sukyoung Ryu added the specification's files (`0f49d8698`, "[spec] Added the entire spec files"). It is the same text today, and the same in the Working Draft of February 2011. Who wrote it before 2009 is not in the record. The 1.0 specification names its authors as Eric Allen, David Chase, Joe Hallett, Victor Luchangco, Jan-Willem Maessen, Sukyoung Ryu, Guy Steele and Sam Tobin-Hochstadt. One note in the section is signed by Victor Luchangco ("Victor: What about 'BACKQUOTE'?") [2].
3. **On `asExprString` the specification is silent.** Neither `Specification/` nor the Working Draft names it outside the revival's Appendix I entry on the natives. The nearest passage is the contract of `Object`'s `toString`: "a string that 'textually represents' this object … useful to a person reading it". That passage is about a reader's text, `asString`'s role, not about an expression [3].
4. **The team's later restart of the specification** (`Documentation/Specification/`, which they did not finish) has a new lexical chapter by Victor Luchangco, 2012-05-31 (`275b90773`). Its ASCII encoding says: "Within a character literal, replace any non-ASCII character with its Unicode name." So the designers' last word on how to write a non-ASCII character in ASCII is its name, as `'LATIN SMALL LETTER E WITH ACUTE'`. The restart has no section on character literals yet ("several sections not yet imported"), and the parser does not read names today (section 1, point 14) [4].

### 3.2 The library and walk

5. **The contract.** The getter `asExprString` and its comment were written by the account `black` (the authorship map reads it as Andrew P. Black, with medium confidence) on 2008-11-05 (`30bfebfd9`), as "will be = to self", and reworded to "will equal self" on 2008-11-12 (`1e1a59cb8`). So the library's own text asks for a text that, read as an expression, gives the same value [5].
6. **Walk's binding** is by the same author, 2008-11-12 (`c291c5a2e`, "more toString -> asString changes"). That commit added the glue class `Char$ToExprString`, pointed `Char`'s `asExprString` at it (before, it named `Char$ToString`, the reader's text), and added the test `stringifyChars` of section 1, point 3. The test pins only ASCII: `'f'` and `'\"'` [6].
7. **Walk's form is older than the getter.** The glue class returns `FChar.toString()`, which Jan-Willem Maessen wrote on 2008-04-11 (`f38024906`, "Re-nativized Char"). Sukyoung Ryu changed it to the bare character on 2008-07-21 (`2e187f271`), and Maessen put the quoted form back the next day (`0bbfb2967`, "Changed `Char.toString()` back to its old version (that quotes and escapes the characters)"). The quoting is `Unprinter.enQuote`, the syntax-tree dump's escape (section 2, point 4), already in the record's first commit, `72ae6881b` (2007-01-04). So walk's form is Java's `toString` of walk's value, which reuses the dump's escape. Nothing in the record shows that it was meant as Fortress source text, and the parser does not read that escape [7].
8. The revival has changed none of these files: `git diff a874948ac` over `nativeHelpers/simpleChar.java`, `interpreter/glue/prim/Char.java`, `interpreter/evaluator/values/FChar.java`, `nodes_util/Unprinter.java`, `parser/Literal.rats` and `nodes_util/ExprFactory.java` is empty [8].

### 3.3 The compiled path's helper

9. **The helper is the team's.** Guy Steele wrote `simpleChar.charToExprString` on 2011-06-24 (`c2c769094`, "Made all the changes necessary for the Fortress character type to be called 'Character'"). The commit is a parentless snapshot of the conversion, so its predecessor was found by comparison: Steele's own commit before it, `6aa202537` (2011-06-22), has neither the helper nor the redundant form, and the two commits differ in 17 files [9].
10. **In the same commit, Steele taught the parser to read the helper's form back.** He added the redundant form to `Literal.rats` and its reading to `ExprFactory.makeCharLiteralExpr`: "a character, a space, and a hex string (which have already been checked by the parser to see that they match)". Two days before, he had built the hexadecimal literals: "The forms 'xxxx' and 'xxxxx' and '10xxxx' are supported. For fun, an optional U+ may be included, for example 'U+03A3', though this is not yet in the spec." So the helper's form is the team's compiler-era choice, by a designer of the language, with the parser rule that reads it back. It is the team's later word on this question: the specification's text is from 2009 or before [10].
11. **The helper's two slips.** The cases for `"` and `\` (`simpleChar.java:32-33`) show that Steele meant `'\"'` and `'\\'`, walk's and the test's texts. They cannot run (section 2, point 7) [11].

### 3.4 The library's `asExprString` on other types

12. Numbers write a numeral that reads back as the same value. `Int`, `Long`, `NN32`, `UnsignedLong` and `BigNum` name their `toString` helpers, `Float` and `RR32` `doubleToString` and `floatToString`. `Boolean` writes `true` or `false`, and a range writes `1:3`. Under walk: `-3`, `3000000000`, `1.5`, `0.3333333333333333`, `true`, `1:3` [12].
13. Strings write the string in double quotes through the same `Unprinter.enQuote`. The team's `FlatString` bound `asExprString` to the glue class `FlatString$ToString`, whose `FString.toString` is `"\"" + Unprinter.enQuote(val) + "\""`. The revival's helper `stringOps.asExprString` (climb batch 26, `93884be8d`) keeps that form. So a string writes what it cannot write plainly in the dump's escape too: `"xéy"` gives `"x\'0e9'y"`. The parser does not read that back: a string literal has no `\'` escape in the parser, though the specification gives one (row 200) [13].
14. The compiler's prelude gives strings and numbers no `asExprString` of their own: a compiled `"xéy".asExprString` is `[no expression for  xéy ]`, and `(-3).asExprString` is `[no expression for  -3 ]` [14].

### 3.5 Which way they point

15. The library's contract (point 5) asks for a text that reads back as the same character. Walk's form reads back for 100 of 1.11M code points (section 2, point 12). So the contract points away from walk's form.
16. The library's binding as the team wrote it (point 6) points to walk's form. Its form is Java's `toString` of walk's value (point 7), and the library's strings share it (point 13).
17. The team's later word (points 9 and 10) points to the helper's form. Its designer wrote the parser rule that reads it back, and its two slips are cases that he wrote and that do not run (point 11).
18. The specification's grammar (point 1) names one form that writes every character: the code alone. It does not list the redundant form, and calls any unlisted contents a static error. So on the redundant form the specification's text and the team's later parser conflict. Where the team's texts conflict, the peers weigh (section 4).

**References**

1. `Specification/basic/lexical-structure.tex:860-922`, and `:896-901` for "the hexadecimal digits enclosed do not correspond to the code point of a Unicode abstract character".
2. `git log a874948ac --full-history -S'four or more hexadecimal digits'`: its oldest entries are `0f49d8698` (sukyoungryu, 2009-11-06) and `cec470a34` (2009-11-02, `appendices/future.tex` only); `git show 0f49d8698:Specification/basic/lexical-structure.tex`, its section "Character Literals" compared with today's and with `Specification-1.0-frozen/basic/lexical-structure.tex:797`: no difference; `research/authorship.md:92` (the 1.0 specification's credits); `Specification/basic/lexical-structure.tex:894`.
3. `grep -rn asExprString Specification/ Specification-1.0-frozen/`: only `Specification/appendices/changes.tex:4487`; `Specification/basic-lib/objects.tex:128-130`.
4. `Documentation/Specification/Prose/Language/lexical-structure.tick:536-543`; `git log a874948ac --full-history -S'Within a character literal, ' -- Documentation/`: `275b90773` (Victor Luchangco, 2012-05-31, "New lexical structure chapter - several sections not yet imported").
5. `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:36`; `git show 30bfebfd9 -- ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`; `git log a874948ac --full-history -S'will equal self'`: `1e1a59cb8` (black, 2008-11-12, "Changed comment"); `research/authorship.md:59` (the account `black`).
6. `git show c291c5a2e -- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Char.java`; `git log a874948ac --full-history -S'stringifyChars' -- Library/String.fss`: `c291c5a2e`.
7. `git log a874948ac --full-history -S'Unprinter.enQuote' -- …/FChar.java` and `git show` of `f38024906`, `2e187f271`, `0bbfb2967`; `git grep -n needsUnicoding 72ae6881b` (`interpreter/nodes/Unprinter.java:477` then).
8. The command quoted, with no output.
9. `git show -s --format='%P' c2c769094` (empty); `git log a874948ac --since=2011-06-20 --until=2011-06-25`; `grep -c` of "redundant" in `Literal.rats` and of `charToExprString` in `simpleChar.java` at `6aa202537`, `13503a671`, `c6b8a5454` (0, 0) and at `c2c769094` (1, 1); `git diff --stat 6aa202537 c2c769094` (17 files).
10. `git diff 6aa202537 c2c769094 -- ProjectFortress/src/com/sun/fortress/parser/Literal.rats ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java`; `git show -s 6aa202537`.
11. `nativeHelpers/simpleChar.java:24-37`.
12. `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:56-58` (`Float`), `:210-213` (`RR32`), `:371-374` (`Int`), `:380-383` (`Long`), `:392-395` (`NN32`), `:479-482` (`UnsignedLong`), `:567-570` (`BigNum`), `:579-580` (`Boolean`); `Library/RangeInternals.fss:1284`. A scratch component `OtherExprWalk`, run as `bin/fortress OtherExprWalk.fss`: `ZZ32 -3`, `ZZ64 3000000000`, `RR64 1.5`, `RR64 third 0.3333333333333333`, `Boolean true`, `range 1:3`. A scratch component `NumBack`, which compares each text, written back as a literal, with the value: `RR64 0.3333333333333333 reads back: true`, `ZZ64 3000000000 reads back: true`, `ZZ32 -3 reads back: true`.
13. `git show a874948ac:Library/FlatString.fss` lines 37-38; `interpreter/glue/prim/FlatString.java:159-164`; `interpreter/evaluator/values/FString.java:31-33`; `Library/FlatString.fss:37-38`; `nativeHelpers/stringOps.java:43-46`. `OtherExprWalk`: `string e-acute "x\'0e9'y"`, `string newline quote "a\nb\"c"`. A program `s = "\'0e9'"`: `RcStrWalkForm.fss:5:8: Invalid string literal content: \`; the same for `"\'00e9'"`; `"é"` reads as one character, 233. Row 200; `Specification/basic/lexical-structure.tex:985-998` (quoted-character escape sequences).
14. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:356`; `CharReadCompiled` (section 2, reference 9): `string [no expression for  xéy ]`, `ZZ32 [no expression for  -3 ]`.

## 4. The peers, as context

1. **Python** (3.13): `repr` writes a printable character as itself and escapes the rest: `'é'`, `'😀'`, `'\u2028'`, `'\x05'`, `'\\'`, `'"'`, `"'"`. `eval` reads each back as the same character. Its `ascii` writes only ASCII: `'\xe9'`, `'\U0001f600'` [1].
2. **Swift**: a `Character`'s `debugDescription` is that of the one-character `String`. It writes double quotes; the escapes `\\`, `\'`, `\"`, `\0`, `\n`, `\r`, `\t`; any other ASCII control as `\u{…}`; and every character outside ASCII as itself, unless it would join the closing quote into one character, where it writes `\u{…}`. So `"é"` and `"😀"`, which Swift reads back as `Character` literals. This was read in Swift's source, not run: the machine has no Swift [2].
3. **Java** prints a `char` as itself: `jshell` echoes `char e = '\u00e9'` as `'é'`. A Java `char` cannot hold U+1F600: `(char) 0x1F600` is U+F600, which `jshell` echoes as that character. The emoji exists only as a `String` of two units, `"😀"`. `Character.toString` writes the character alone, with no quotes, so it is a reader's text; `Character.getName` gives the Unicode name, and `Character.codePointOf` reads the name back [3].
4. **Haskell** (Hugs 98, after the Haskell 98 standard): `show` writes a decimal code for each character outside printable ASCII: `'\233'`, `'\128512'`, `'\8232'`, and `'\ENQ'` for U+0005. `read` reads each back as the same character [4].
5. So three of the four write a printable character as itself, and one writes a code. Each reads back what it writes, for every character that it can hold. None writes the character and its code together, as the helper does. None writes an escape that its own parser refuses, as walk does.

**References**

1. `python3 -I` on a list of the seven characters, printing `repr(c)`, `eval(repr(c)) == c` and `ascii(c)`: `0xe9 'é' reads back: True ascii(): '\xe9'`, `0x1f600 '😀' reads back: True ascii(): '\U0001f600'`, `0x2028 '\u2028' reads back: True`.
2. `swiftlang/swift`, branch `main`, fetched 2026-11-06: `stdlib/public/core/Character.swift:199-201` (`return _str.debugDescription`); `stdlib/public/core/String.swift:942-990` (`String`'s `debugDescription`, which calls `_escaped(asASCII: false)` and quotes a scalar that would combine with the quote); `stdlib/public/core/UnicodeScalar.swift:194-229` (`_escaped`: nil, that is unescaped, for a scalar of 128 or more when `forceASCII` is false).
3. `jshell` with `-J-Dstdout.encoding=UTF-8`, on `char e = '\u00e9'; char h = (char) 0x1F600; String s = Character.toString(0x1F600);`: `e ==> 'é'`, `h ==> ''` (U+F600), `s ==> "😀"`. `java -Dstdout.encoding=UTF-8 CharPeers.java`: "char e: é | Character.toString(e): é", "Character.getName(0x1F600): GRINNING FACE", "Character.codePointOf(name of 0x1F600) hex: 1f600".
4. `runhugs Peers.hs`, which prints `show c` and `(read (show c) :: Char) == c` for the seven characters: `233 '\233' reads back: True`, `128512 '\128512' reads back: True`, `8232 '\8232' reads back: True`, `5 '\ENQ' reads back: True`. Hugs was installed for this review (`apt-get install hugs`, 3.8 MB).

## 5. The model program's exposure

1. Neither of microGPT's programs calls `asExprString`, names `Char` or `char`, or holds a character literal. Each prints only strings and numbers [1].
2. Their loaders use characters only through `codePoint`: `c.codePoint - '0'.codePoint` to read a digit, and `names[d][j].codePoint - 'a'.codePoint` to number a letter. `codePoint` already names a helper (F-307) [2].
3. The library's `assert` writes a failed operand with `asDebugString`, not `asExprString` [3].
4. So no option changes a model line, and none changes the model's speed: the binding is on no path that the model runs. No run of the model is needed for this question.

**References**

1. `grep -n 'asExprString\|\bChar\b\|char(\|codePoint'` over `explorations/run-c4/src/MicroGptFlat.fss` (98 lines) and `explorations/apl/mg/MicroGptApl.fss` (127 lines): no line; their `println` lines are `MicroGptFlat.fss:86`, `:95` and `MicroGptApl.fss:115`, `:124`.
2. `explorations/run-c4/src/FlatData.fss:26`, `:122`; `explorations/apl/mg/FlatData2.fss:29`, `:125`; the same grep over the other components of both folders finds no other line. F-307 (`FACTS.md:137`).
3. `Library/FortressLibrary.fss:307-332`.

## 6. The options

Every option that moves the binding shares these parts:

- **Walk's binding.** `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:615` names `com.sun.fortress.nativeHelpers.simpleChar.charToExprString`. Walk carries the `Char` as `self` in a Java `int`, and the compiled path's rewrite passes it through the `Char` transfer, as for `Char`'s other 39 helpers (F-308). The glue class `Char$ToExprString` stays, unbound, as `Char$ToString` stayed when `asString` moved [1].
- **The guards.** The walk guard `ProjectFortress/tests/NativeHelperFamilyCharWalk.fss` asserts `asExprString` at printable ASCII, `'`, `\`, `"`, a control character, `é`, U+2028, U+1F600 and a surrogate. The compiled guard `ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss` binds `cToExprString(x:ZZ32):JavaString = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleChar.charToExprString")` and asserts the same. Row 861 names no test; no test of the tree pins the helper's form or walk's form outside ASCII [2].
- **The record.** Row 861 closes with `--settled`. F-308's last clause ("only `Char`'s `asExprString` stays on a glue class"), F-299's 306 and F-32's 143 change by one, and so does Appendix I's "forty of \TYP{Char}" [3].
- **The model.** No change (section 5).

The parser's two gaps (section 2, point 12) touch the options unequally. Codes in lower case, as the helper writes them today, miss 119.5K code points past U+FFFF: 54K in planes 1 to 9 and all 65.5K of plane 16. Codes in upper case miss plane 16 only. One fix closes both gaps: at `parser/Literal.rats:460-464`, try the longer choices first, six digits, then exactly five, then four. It is an edit of the parser, so it needs its own ledger row and test, and the build. It can go in the same rung or before it [4].

### (a) Walk's form, made the helper's

1. **The helper.** `nativeHelpers/simpleChar.java:21-51`: `charToExprString` becomes `"'" + com.sun.fortress.nodes_util.Unprinter.enQuote(String.valueOf((char) x)) + "'"`, walk's expression with walk's 16-bit conversion. `nativeHelpers/stringOps.java:45` already calls `enQuote` in this way [5].
2. **Values.** Walk's: none change. The compiled path's `Character.asExprString` (`CompilerBuiltin.fss:1066`) changes at every code point but the 98 of section 2, point 9: about 1.11M.
3. **Read back.** 100 of 1.11M code points, the same as today under walk. Past U+FFFF, no code point reads back as itself.
4. **Tests.** The guards pin walk's form, so they pin texts that the parser refuses. The library's contract ("will equal self") is then broken by design, and needs its own ledger row.
5. **Size.** One rung: one Java method, one string, two guards. A Java edit needs the build and then the library order, about 2 to 3 minutes before a compiled run.

### (b) The helper's form as it stands, with walk's binding moved onto it

1. **The helper.** No change.
2. **Values.** Walk's change at every code point but the 98: about 1.11M, among them `\` and `"`, which become `'\'` and `'"'`. The compiled path's: none.
3. **Read back.** In the BMP, all but 6 of 65.5K. Past U+FFFF, all but 119.5K of 1.05M, or all of them with the parser's fix. Through a source file, not the 2K surrogates either (section 2, point 13).
4. **Tests.** The guards would pin `'\'` and `'"'`, two texts that are static errors. So those two need an `XXX` test and a ledger row, or must stay out of the guards. The team's test `stringifyChars` expects `'\"'` and would fail; no suite runs it [6].
5. **The specification.** The library would write the redundant form, which the text calls a static error and the parser reads. Either the text's list is revised to name it, in the revision form (an Appendix I entry and a `\revision` box at `Specification/basic/lexical-structure.tex:860-891`), or the departure gets a ledger row [7].
6. **Size.** One rung, with no Java edit: one string and two guards. The smallest.

### (c) The specification's own form: the code alone

1. **The helper.** `nativeHelpers/simpleChar.java:21-51` is rewritten: printable ASCII other than `"` and `\` as itself; the escapes `\b`, `\t`, `\n`, `\f`, `\r`, `\"` and `\\`; every other code point as its code alone, four or more digits. Upper case follows the specification's examples (`'001C'`, `'FBAB'`, `'1D11E'`); lower case is what the helper writes today past U+FFFF. The parser reads both.
2. **Values.** Walk's change at about 1.11M, as in (b), but `\` and `"` keep their texts. The compiled path's change at 65.4K code points in lower case (the BMP characters that get the redundant form today, and `\` and `"`), or at 1.01M in upper case [8].
3. **Read back.** In the BMP, all 65.5K. Past U+FFFF, in upper case, all but the 65.5K of plane 16; in lower case, all but 119.5K; with the parser's fix, all of them. Through a file too, since the text is all ASCII.
4. **Tests.** The guards pin the new form. `stringifyChars` passes.
5. **The specification.** No change: the form is in its list.
6. **Size.** One rung: one Java method, one string, two guards; the build and the library order.

### (d) The helper's form, completed

1. **The helper.** `nativeHelpers/simpleChar.java:24-37`: test `"` and `\` before line 24, so that the switch's own cases at lines 32-33 give `'\"'` and `'\\'`; and give the code alone, as line 39 does, also for U+201C, U+201D, U+2028, U+2029 and the surrogates U+D800 to U+DFFF.
2. **Values.** Walk's change at about 1.11M, as in (c). The compiled path's change at 2,054 code points only: the six of section 2, point 12 and the 2,048 surrogates [8].
3. **Read back.** In the BMP, all 65.5K (the sweep of this form). Past U+FFFF it writes the helper's own texts, so all but 119.5K of 1.05M, or all of them with the parser's fix. Through a file too, since no surrogate is written alone.
4. **Tests.** The guards pin the completed form. `stringifyChars` passes.
5. **The specification.** As in (b): the redundant form is revised into the text's list, or the departure gets a row. The revision can name `U+` too, which Steele built "though this is not yet in the spec".
6. **Size.** One rung: about six lines of one Java method, one string, two guards, and the specification's revision; the build and the library order.

**References**

1. `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:612-617`; F-308 (`FACTS.md:138`); `interpreter/glue/prim/Char.java:171-175` (`ToString`, unbound since `asString` names `simpleChar.charToString` at `FortressBuiltin.fss:613`).
2. `ProjectFortress/tests/NativeHelperFamilyCharWalk.fss`; `ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss:5-40`, its bindings' form; `grep -rn asExprString` over `ProjectFortress/*tests*`: no test asserts a `Char`'s `asExprString`; `grep -rn charToExprString` finds only `CompilerBuiltin.fss:232` and `:1066`.
3. `explorations/coordinator/tools/ledger.py close` (`.claude/skills/fortress-repo/references/records.md`, "Writing to the record"); F-308, F-299 (`FACTS.md:134`), F-32 (`FACTS.md:30`); `Specification/appendices/changes.tex:4486`.
4. `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:460-464`; section 2, reference 10.
5. `interpreter/evaluator/values/FChar.java:100-106`; `nativeHelpers/stringOps.java:43-46`.
6. `Library/String.fss:343-344`.
7. `.claude/skills/fortress-repo/references/specification.md`, "Changing the text: the revision form".
8. The scratch class `Compare` (section 2, reference 8): "option (d) differs from the helper at 2054; option (c) uppercase at 1013976, lowercase at 65378".

## 7. How the options weigh against each other

1. **The library's contract**, "will equal self", is the library as the team wrote it. With the parser's fix, options (c) and (d) meet it at all 1.11M code points. Without the fix, (c) in upper case misses plane 16, a private-use plane, and (d) misses 119.5K code points past U+FFFF, among them assigned characters such as U+1000A. Option (b) misses what (d) misses, and also 6 BMP code points, two of them ASCII, and the 2K surrogates through a file. Option (a) misses it at all but 100 of 1.11M [1].
2. **The library's binding**, also as the team wrote it, is walk's form: option (a). But that form is Java's `toString` of walk's value, which reuses the syntax-tree dump's escape; nothing in the record shows that it was meant as Fortress text (section 3, point 7). The same author wrote the contract a week before he bound it. And past U+FFFF the form names the wrong character. So the binding reads as a slip against the contract, not as a design of the text [2].
3. **The team's later word** is Steele's helper and the parser rule that he wrote with it, in one commit: options (b) and (d). Option (d) is his form with his own two cases reached, and the code alone where his parser cannot read the character. Option (c) keeps his code-alone texts for controls and past U+FFFF, but drops his redundant form [3].
4. **The specification's grammar** lists the code alone, which is option (c), and calls the redundant form of (b) and (d) a static error. The parser has read that form since 2011. On this point the specification and the team's later parser conflict, so the peers weigh: three of the four write a printable character as itself, which a reader can see; one writes a code. The redundant form shows the character and also gives its code; the code alone hides the character. The peers lean to (d) over (c), weakly [4].
5. **What changes on the compiled path**, whose prelude binds the same helper: (b) nothing; (d) 2,054 code points; (c) 65.4K in lower case, or 1.01M in upper case; (a) about 1.11M [5].
6. **What changes under walk**: every option but (a) changes walk's text at about 1.11M code points, all those outside printable ASCII and the five escapes. No suite's test, no model line and no library code but the unrun test `stringifyChars` calls a `Char`'s `asExprString` (sections 5 and 6) [6].
7. **Cost**: (b) is the smallest, one string, but it leaves two ASCII texts that are static errors and a departure from the specification. (a), (c) and (d) each edit one Java method, so they need the build and the library order. (b) and (d) also need the specification's list revised, or the departure recorded. (b), (d) and (c) in lower case need the parser's fix to read back past U+FFFF; (c) in upper case needs it for plane 16 only. The fix is a reorder of one rule, worth making for any option, since a programmer's own literal `'1000a'` fails today too [7].
8. **Strings.** The library's strings write a character outside ASCII in the dump's escape too, `"x\'0e9'y"`, which the parser does not read (section 3, point 13). Option (a) keeps characters and strings alike, both unreadable. Options (b), (c) and (d) leave the strings as the one place that writes the dump's escape. That would be a new question for the review queue, not a part of this one.

**References**

1. Section 2, point 12; section 3, point 5; section 6, the paragraph on the parser's gaps.
2. Section 3, points 5 to 7; section 2, point 10.
3. Section 3, points 9 to 11.
4. Section 1, points 11 and 12; section 3, point 18; section 4, point 5.
5. Section 6, reference 8; section 2, point 9.
6. Section 2, point 9; section 5, point 4; section 6, reference 2; `grep -n '\.asExprString'` over `Library/*.fss` and `ProjectFortress/LibraryBuiltin/*.fss`: the callers are `Library/Reader.fss:26` and `Library/Writer.fss:29` (a file name, a string), `Library/String.fss:368` (a range) and the test at `Library/String.fss:341-344`.
7. Section 6; section 1, point 14.

## 8. Recommendation

Option (d): complete the helper's form so that every text reads back, move walk's binding onto it, reorder the parser's choices of hexadecimal digits, and revise the specification's list to name the redundant form.
