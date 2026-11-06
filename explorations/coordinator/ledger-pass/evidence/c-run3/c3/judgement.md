# Judgement, chunk c3 (base c124c6b65)

Rows 94, 95, 863. All three are keeps; the writer's `rows.rewrite`, `closes.txt`, `dups.txt`, `pairs.txt` and `silent.txt` are empty, and `questions.md` asks no measurement and cites no `XXX` test.

## Row 94 (NEGATIVE-VERIFIED): apply (keep, unchanged)
The check passes it: `Library/Constants.fss:15` still reads `pi : FloatLiteral = 3.141592653589793` (re-read in the tree), no commit since ae4f8e38a touches `Constants.fss`/`.fsi`, the spec cell `literals.tex` "Pi" resolves (:231, `RationalValueTimesPi` at :238), and the gone probe paths are given "in the parent of ed6dafb52" as the template allows. No correction made; the row keeps its line, so `final.rewrite` holds nothing for it.

## Row 95 (NEGATIVE-VERIFIED): apply (keep, unchanged)
The check passes it: `Constants.fss:17` reads `infinity : RR64 = 1.0 / 0.0` (re-read), unchanged since ae4f8e38a; spec cell "Infinity and Zero" at `literals.tex:243`; no `∞`, `INFINITY` or `INF` declared in the libraries; gone probes explained "in the parent of 22ea0cd90". No correction made.

## Row 863 (CONTESTED): apply (keep, unchanged)
The check passes it: `opr-overview.tex:157-158` (overflow gives an infinity) and :167-168 (division by zero produces a NaN) read as quoted (re-read); 3eabf8435 changed other sentences of the file (row 672); `simpleDoubleArith.doubleDiv` at :36-38 is still `return a / b;`, bound by walk's Float (`FortressBuiltin.fss:115`) and the compiled `RR64` (`CompilerBuiltin.fss:947` via `jDoubleDiv`, :206). No POSITIONS entry settles which clause governs, so it stays CONTESTED and is not closed. No correction made.
