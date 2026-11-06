# Judgement, chunk c9 (rows 141, 607, 846, 857, 861, 872, 877, 897, 899, 902, 903, 904), base c124c6b65

Keeps the check passes need no line in `final.rewrite`; they stand as they are.

## Row 141: apply (keep)
The check passes it: `Library/FlatString.fss:152` still reads `split():Generator⟦String⟧ = Nothing⟦String⟧` at the base.

## Row 607: apply (rewrite, with the check's two corrections)
1. Claim: "a substring whose `a` lies past the string's first" to "a substring whose `a`s lie past the string's first `a`" (check, cold-read item 1).
2. Notes: "The answer: Generator's comment" to "Expected, `true`: Generator's comment" (the check's "The expected answer, `true`:" shortened to keep the notes within 700); "Fix and workaround: ..., the curator's" to "Fix: ..., the curator's choice", as the check gives.

## Row 846: apply (rewrite, with the check's two corrections)
1. "`NativeApp` hands a glue class walk's values as they come" now cites `interpreter/glue/NativeApp.java:149` (`applyToArgs(List<FValue> args)`, read at c124c6b65).
2. "Fix: flatten first, or bind over `FlatString`, at c124c6b65." to "Workaround: flatten first, or bind over `FlatString`."; "The library binds neither." dropped (home: FACTS.md:134), as the check gives.

## Row 857: apply (rewrite, with the check's correction)
"... from an integer to a `Char`." to "..., so which exception to raise is open."; ", as the glue class `Char$Chr` did" dropped (home: the history, row 857), as the check gives.

## Row 861: apply (rewrite, status stays CONTESTED, with the check's correction)
The escapes passage now names the five escapes `\b`, `\t`, `\n`, `\f`, `\r` and lists `\`, `"` and U+0005 as differences (read: `nativeHelpers/simpleChar.java:24-31` at c124c6b65; `\` and `"` take the printable branch). To fit 700: "The two agree" to "They agree", "names no form" to "names none".

## Row 872: apply (keep)
The check passes it; no commit since 93884be8d touches its cited files.

## Row 877: apply (rewrite, with the check's correction)
"Probe in `.../REPORT.md`, section 4: prints" to "`bin/fortress` on the program of `.../REPORT.md`, section 4, prints" (REPORT.md section 4 holds the programs and says they run with `bin/fortress`, read). To fit 700: "Workaround: give the program's type another name." to "Workaround: rename the program's type."

## Rows 897, 899, 902, 903, 904: apply (keep)
The check passes each; cited lines unchanged since c141e7f6a.

## Other files
No closes, duplicates or pairs (846 and 877 are siblings, not duplicates). `final.silent`: `silent.txt`'s nine lines, upheld. No question to measure; no `XXX` test believed to pass.
