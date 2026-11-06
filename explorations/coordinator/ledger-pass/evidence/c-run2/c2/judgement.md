# Judgement, chunk c2 (rows 318, 453), base c124c6b65

## Row 318: apply (rewrite, with the check's three corrections)

The check holds the stub list, the fixed half, `NamingCzar.java:343` and the test; its three failures are exact corrections from its sources, made:
1. Reproducer `none` given its command and output: "`even`, `odd`; `grep -c 'throw Compiler'` there prints 21; no test runs one." (re-run: `git show c124c6b65:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss | sed -n 896,928p | grep -c 'throw Compiler'` prints 21).
2. "`BOXMINUS`, `DOTMINUS` (unary and binary)" to "`BOXMINUS` and `DOTMINUS` (each unary and binary)" (`:898-899`, `:904-905` at the base, read), so the list reaches 21.
3. "Fix: the switch-over (P-38)." before the workaround (POSITIONS P-37, P-38, read).
`silent.txt`'s line (defect) upheld into `final.silent`.

## Row 453: apply (rewrite, with the check's one correction)

The check holds the re-pinned citations, the `XXX` tests and the dropped closed siblings; its failure is an exact correction from P-38, made: the fix sentence becomes "Fix: the switch-over; the prelude's text is not repaired (P-38). Its overflow-free `floorAverage` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:746-747`) shows a split without `lo+hi`." The `#` repair keeps its home in the history, row 453.

No closes, duplicates or pairs. No question to measure; no `XXX` test believed to pass.
