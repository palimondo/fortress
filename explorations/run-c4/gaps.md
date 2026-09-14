# Run C4: gap rows

Rows found while merging rounds two and three and answering Pavol's questions afterwards; reproducers under `probes/`. Numbered from 175 as candidates for the ledger; the ledger merge assigns the final numbers.

| # | finding | status | class | spec | reproducer | notes |
|---|---|---|---|---|---|---|
| 175 | top-level declarations may be written untyped and several to a line, separated by semicolons: `nEmbd = 16; blockSize = 16; nHead = 4` and `epsilon = 10.0^(-5); lr0 = 0.01` bind, each with its literal's type (`ZZ32`, `RR64`), and compose in arithmetic (`nEmbd blockSize` is 256, `SQRT (1.0 headDim)` is 2.0, `beta1^3` is a float) | POSITIVE-VERIFIED | — | `basic/declarations.tex` (variable declarations); `basic/expressions/block.tex` (the semicolon as separator) | `probes/semicolon/SemiTop.fss`, output `run.txt` | replaces C2's tuple bindings (row 152) and C3's fourteen typed lines: the hyperparameter block of `src/MicroGptFlat.fss` is two lines of six, as the Dyalog's L6 strands them |
