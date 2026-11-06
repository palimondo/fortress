# Queue items from chunk c40, run c-run1

- **Row 200, held: whether a string literal refuses the specification's quoted-character escape (`"\'03B2'"`, `"\'beta'"`) and restricted-word escape (`"x\ALPHA y"`).** The row says a string literal has no `\u` escape and files a design limit, but `Specification/basic/lexical-structure.tex`, "String Literals" (966-1000), specifies both escapes, and `:863-865` a hex code-point character literal; `Literal.rats:175-176` refuses any backslash that `EscapeSequence` (`:182-195`) does not take, which suggests both are refused, but no run shows it. No prober ran it in this pass. The programs, command and each outcome's line are in `tmp/ledger-pass/c-run1/c40/questions.md`, "Row 200".
   - Landed: the row's present line (`tmp/ledger-pass/c-run1/c40/evidence/200.md`, sha d3c10412b237d88a). Default: the row's present line.
   - The other way: run the two programs under walk, then rewrite to `implementation gap (parser)` (refused), retire the row (both print), or name the refused kind only (one prints).
   - Its cost: two walk runs of 5-line programs, under a minute of the prober's time.
   - Home: `tmp/ledger-pass/c-run1/c40/questions.md`, `assessment.md` and `check.md`, row 200; row 200.
   - Needed by: the ledger's repair; the next prober run of the pass.
