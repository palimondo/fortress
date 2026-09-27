<!-- The probes behind explorations/reviews/numerics-plan-synthesis.md, run 2026-09-27 on main at c9492fc8d by the Fable planner; private caches under tmp/fable/ (gitignored), no ant, no tracked file changed. Machine on the capture's first line: nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz, OpenJDK 25.0.4, FORTRESS_THREADS=1. -->

# Probes for the synthesis

## `probes/block-stop/`

`BlockStop.fss`, compiled in the compiler's world by `numerics-plan-fable/probes/run-comp-cases.sh`: three calls that each fail on their own (a `String` where a `ZZ32` is declared) in one `do` block, then the same three each in its own block. The checker reports the first statement of the shared block (`:10`) and nothing after it, and all three of the separate blocks (`:15`, `:16`, `:17`): a block stops being checked at its first failing statement. So a count of a program's checker errors is a lower bound: every block hides what follows its first failure. This is why the Fable plan's microGPT counts (24 and 35 own errors) do not show the row-401 shape that evidence B names (`heads(m, blockSize, nHead, headDim)`, `MicroGptFlat.fss:54`): those calls sit in `step`, whose block stops at `:57` (`gather`), and in the APL twin's `step` likewise.
