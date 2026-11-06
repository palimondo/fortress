# c40: questions for the prober

## Row 200: are the specification's quoted-character and restricted-word escapes refused in a string literal?

The row says a string literal has no `\u` escape and files it as a design limit. But `Specification/basic/lexical-structure.tex`, "String Literals" (lines 966-1000), specifies three kinds of escape in a string: the character-literal escapes, restricted-word escapes (`\` then a restricted word not starting with a lowercase letter, read as a character literal) and quoted-character escapes (`\'...'`, e.g. `"\'beta'"` is the string β; a character literal may be four or more hex digits, `'03B2'`). So the specification does give a code-point escape, `"\'03B2'"`. `Literal.rats:175-176` logs `Invalid string literal content: \` for any backslash that `EscapeSequence` (`:182-195`) does not take, which suggests both are refused; no run shows it.

Narrow question: under walk, does each of the two programs below fail at parse with `Invalid string literal content: \`, or print the character?

`tmp/ledger-pass/q200a.fss` (quoted-character escape, hex and name):

    component q200a
    export Executable
    run() = do
      println("\'03B2'")
      println("\'beta'")
    end
    end

`tmp/ledger-pass/q200b.fss` (restricted-word escape):

    component q200b
    export Executable
    run() = println("x\ALPHA y")
    end

Path: walk. Commands from the main tree: `bin/fortress tmp/ledger-pass/q200a.fss` and `bin/fortress tmp/ledger-pass/q200b.fss`. If one file's two lines differ, split it and run each line alone.

Outcomes:
- Both refused at parse: the gap is the specification's escapes not built. Row 200 becomes
  `| 200 | a string literal takes only the escapes `\b \t \n \f \r \" \\` and the curly quotes: the specification's quoted-character escape (`"\'03B2'"`, `"\'beta'"`) and restricted-word escape are `Invalid string literal content: \` | NEGATIVE-VERIFIED | implementation gap (parser) | `basic/lexical-structure.tex`, "String Literals" | none | apl rung 2 |` with notes: the mechanism `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:175-176` (the refusal) and `:182-195` (`EscapeSequence`); the backslash also breaks the quote pairing (`Unmatched delimiters "\"" and "]"`); workaround: the glyph itself, the sources being UTF-8 (`v[3] ← ¯1` prints back as `9 2 6 ¯1 5 8 7 4 0 1`, `explorations/apl/base/AplCore.fss`, `aplFmt`); the prober's program as the reproducer's old path; the old probe `explorations/apl/v1-probes/p18_uesc.fss`, in the parent of `1ee3b0bc5`; `full text: history, row 200`.
- Both print the character (β, Α): the specification's code-point escape works and only Java's `\u` spelling is refused, which the specification never wrote. Row 200's claim is then not a gap: rewrite it `RETIRED` with class `—`, claim "a string literal has no `\u` escape; the specification's quoted-character escape `"\'03B2'"` gives the code point", and the run's output in the notes.
- One prints and one is refused: rewrite the claim to name the refused kind only, `implementation gap (parser)`, as in the first outcome.

## XXX tests believed to pass now

None. Row 652's `ProjectFortress/compiler_tests/XXXKeywordParamOmitted.test` was not run; nothing in the evidence suggests it now passes (its cited lines `STypeEnv.scala:199-200` are unchanged).
