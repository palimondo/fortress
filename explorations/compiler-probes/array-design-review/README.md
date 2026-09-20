# Probes behind `explorations/reviews/array-design-review.md` (2026-09-20)

Two kinds, all under a private cache and a private class directory; nothing under `default_repository/` or `ProjectFortress/build` was touched.

`run-java.sh` compiles `java/KDotStore.java` and `java/KMatStore.java` beside the four models of `perf-probes/kernels/java` (`KDotPrim`, `KDotBoxed`, `KMatPrim`, `KMatBoxed`) and runs each three times with the kernels' harness (mult 20); `java-timings.out` is the raw capture, `java-medians.tsv` the medians by the kernels' own awk. The two new models are unboxed `double[]` storage read and written through a boxing accessor (`Box get(i)`, `put(i, Box)`) with the arithmetic boxed as the runtime boxes it: the shape `array-design.md` §2 describes for `ZZ32Vector` today and the shape every trait-level `get`/`put` has under its question-3 default.

`run-fortress.sh` compiles the compiler world's five library components in order into `$SCRATCH/adr/caches` (`library-order.out`), then each `p*.fss` (`<p>.compile.out`, with the exit code on the last line; `<p>.run.out` when it compiled), then runs `p3_static_dispatch.fss` on the interpreter under a second private cache (`p3_static_dispatch.interp.out`). Each probe's header comment says which claim of the design it tests.

| probe | question | result |
|---|---|---|
| `p1_monostore` | does the checker accept a monomorphic store where a generic factory's result `Arr[\T\]` is expected (design §4c, "the factory selects the store") | refused: `Function body has type DStore, but declared return type is Arr[\T\]` |
| `p1b_typecase` | the same through the library's own selection idiom (`typecase` in `array1`, `FortressLibrary.fss:2240-2244`) with a monomorphic arm | refused: `Function body has type OR(DStore,BStore[\T\]), but declared return type is Arr[\T\]` |
| `p2_nongeneric` | a non-generic trait under an instantiated generic supertype, an object implementing it, reached through the generic `get` (design §4c, "unprobed") | compiles, runs, prints `p2 5.0` |
| `p3_static_dispatch` | a function declared on the sized subtype applied to a value whose static type is the unsized supertype (how `MicroGptFlat.fss` is written) | compile path refused: `(Vec[\RR64\], Vec[\RR64\])->RR64 is not applicable to an argument of type (Arr[\RR64\], Arr[\RR64\])`; interpreter prints `p3 9.0` |
| `p3b_static_dispatch_opr` | the same as an operator | refused the same way; the error also lists the prelude's scalar `DOT` overloads |
| `KDotStore`, `KMatStore` | unboxed storage behind a boxing accessor against boxed storage and primitive | kdot 0.007559 s (8.9× primitive) against boxed 0.005495 s (6.4×) and primitive 0.000852 s; kmat 0.005552 s (6.6×) against boxed 0.005255 s (6.2×) and primitive 0.000844 s |
