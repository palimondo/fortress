# Reviewer probe log — Run B2 Phase 1

Environment in every shell:

    export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
    export PATH=$JAVA_HOME/bin:$PATH
    export FORTRESS_HOME=/home/user/fortress
    unset JAVA_TOOL_OPTIONS
    export FORTRESS_THREADS=1        # 4 where stated

| file | command (from the stated directory) | wall time | result |
|---|---|---|---|
| `check_t1.out` | `explorations/run-b2/src` — `time $FORTRESS_HOME/bin/fortress MicroGPTCheck.fss`, `FORTRESS_THREADS=1` | 47.8 s | `ALL CHECKS PASSED`; identical to `explorations/run-b2/checks/check_run.txt` except the timing lines |
| `check_t4.out` | same, `FORTRESS_THREADS=4` | 32.6 s | `ALL CHECKS PASSED`; every PASS line and every max-abs-diff value byte-identical to `check_t1.out`; step time 11.1 s → 5.5 s, forward+backward 8.5 s → 3.9 s |
| `demo_t1.out` | `explorations/run-b2/src` — `time $FORTRESS_HOME/bin/fortress MicroGPTDemo.fss`, 1 thread | 2 m 35.8 s | all twelve losses reproduce `checks/demo_run.txt` to the last digit; samples differ (library `random(1.0)`) |
| `regen/def_attention.*` | `bash explorations/run-b2/figures/render.sh regen/def_attention.tic` | 12.6 s | PNG bit-identical to the shipped `figures/def_attention.png` (max pixel diff 0); SVG identical as a multiset of lines (one glyph `<path>` emitted in a different order) |
| `RvwBroadcast.fss/.out` | this directory, 1 thread | 15 s | `diag(1/r) X` agrees with the entry-by-entry form to 0.0; the shipped `Matrix` has no `matrix + row vector` overload |
| `apiT/UseCoreT.out` | `apiT`, 1 thread | 14 s | `opr (A: Mat)^T: Mat` at top level in an API: `CoreT.fsi:8:1: Syntax Error` (a second failing spelling for `gaps.md` row 120) |
| `apiT/UseCoreT_control.out` | `apiT`, 1 thread | 14 s | the same API with `transpose(A: Mat): Mat` instead parses and runs (`B[2,1] = 5.0`) |
| `RvwSumTypes_noexcept.out` | this directory, 1 thread | 15 s | a client component importing `MicroGPT.{...}`: `SUM` over `Params` gives `CastError` (the library's numeric Σ resolves) |
| `RvwSumTypes.out` | this directory, 1 thread | 14 s | the same client with `import FortressLibrary.{...} except { opr BIG + }`: `Operator BIG + is not defined.` — the core's Σ does not cross the component boundary (ledger row 30) |
| `RvwEmptySum.out`, `RvwEmptySum2.out` | this directory, 1 thread | 15 s each | kept failures: `SUM[h <- xs.indices] xs[h]` without parentheses parses as a subscript of the reduction |
| `regen/rvw_adamfrac.*`, `pairs/rvw_adamfrac.png` | `render.sh` | 12 s | the tight `/` sets Adam's fractions stacked; the loose `/` the program uses sets them inline |
| `tightadam/` | `tightadam` — `time $FORTRESS_HOME/bin/fortress MicroGPTCheck.fss`, 1 thread | 48.5 s | `MicroGPT.fss` with the three Adam fractions respelled tight: output identical to `check_t1.out`, `ALL CHECKS PASSED`; render in `pairs/rvw_def_adam_tight.png` |
| `regen/rvw_names.*`, `rvw_names3.*` | `render.sh` | 12 s each | `_W_q` sets **W**_q, `_Wq` sets **Wq**; `_W_o` sets **W**_o, `_W_lm` sets **W**_lm; `_W1` already sets **W**₁ |
| `regen/rvw_names2` | `render.sh` | fails | `_W_q[h]`: `! Double subscript.` three times — the indexed weights cannot take the closer spelling |

`pairs/` holds every shipped `def_*.svg` and `formulas/f_*.svg` rasterised at 3× by `rsvg-convert`; `combos/` stacks each formula over its Fortress definition for the by-eye judgement in section 3 of the review.
`MicroGPT.fss`, `MicroGPT.fsi` in this directory and under `tightadam/` are copies of the run's files, used as probe inputs; nothing under `explorations/run-b2/` was modified.
