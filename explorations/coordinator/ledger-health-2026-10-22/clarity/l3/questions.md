# Chunk l3: questions only a run can settle

## Row 533: does the compiled checker still refuse a float base's numeral power, and over which tie?

**The question.** Against the one library at `d4d454f9d`, does the compiled checker refuse `10.0^(-5)` (`explorations/run-c4/src/MicroGptFlat.fss:18`) and `-(10.0^10)` (`:29`) as an ambiguous coercion? If it does, which two declarations of `^` tie? The candidates:

- `RR64`'s `opr ^(self, b:RR64):RR64` and `opr ^(self, b:AnyIntegral):RR64` (`Library/FortressLibrary.fsi:365-366`);
- `MultiplicativeRing`'s `abstract opr ^(self, other:AnyIntegral): T` (`:283`).

The row's claim names `MultiplicativeRing`'s `opr ^(self, other:ZZ64)`, which no longer exists. F-58 says the tie is not measured. F-73's numeral default predicts no refusal: where tied declarations differ only at a position where the call passes a numeral, the checker reads the numeral as `ZZ32`. That reading would choose `^(self, b:AnyIntegral)`.

**Why only a run.** The checker reaches these sites only through the distance stage's driver, against the one library. The gate's distance stage checks the library's twelve components and no program. Its batch-20 table (`compile-ladder/climb-batch-20/gate/distance.txt`) has no ambiguous coercion. No component of the library writes a float base with a numeral exponent. The nearest is `Library/Timing.fss:30` (`10.0^9`), which is not among the twelve.

**The command that settles it.** After `ant compileAll`, with `explorations/experiment/env.sh` sourced:

1. Copy `explorations/coordinator/tools/distance/run.sh` to a scratch folder.
2. Write a probe `PowTie.fss` there, with these lines:
   - `component PowTie`
   - `export Executable`
   - `a: RR64 = 10.0^(-5)`
   - `b: RR64 = -(10.0^10)`
   - `t: ZZ32 = 3`
   - `c: RR64 = 0.85^t`
   - `run() = println(a)`
   - `end`
3. Append the probe's path to the copy's `COMPONENTS` (`run.sh:84-86`).
4. Run `<copy> <scratch>/out.table <scratch>/work` from `$FORTRESS_HOME`.

Read the `#unit component PowTie` line and its errors. One JVM, about 3 to 15 minutes by the table's `#seconds` rows.

**What each answer does to the row.**

- No error at `PowTie`: the claim is false at `d4d454f9d`. The row closes, with the commit that gave the ring and `RR64` their `AnyIntegral` powers (`5ad4a9957`) and, as its test, a compiled test of the three powers. Or it is rewritten as retired if no test can be added before the switch-over.
- "Ambiguous coercion" naming two declarations: the claim is rewritten to name them. The notes keep the model lines (`MicroGptFlat.fss:18`, `:29`, `MicroGptFlatCheck.fss:16-18`) and row 391's call-site check.
