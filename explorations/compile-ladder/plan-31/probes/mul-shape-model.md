<!-- A probe for the plan review of 2026-11-10: a Java model of the shape of the one library's matrix product, timed against a plain loop, to bound what that shape costs on the JVM once every number is unboxed; no Fortress code was run, and nothing in the tree was edited. -->

# What the shape of the library's matrix product costs on the JVM: a Java model

**Why.** PLAN's phase 6 lists what compiled microGPT pays: boxed numbers, the transaction checks, the casts, the instance rule. Each is a cost of the compiled code. This probe asks about a cost of the library's own text, which no item of the phase names: the one library's `Matrix.mul` (`Library/FortressLibrary.fss:3044-3102`) halves its block of rows, inner indices and columns until one element product is left, forks at each row and column split, and reads and writes each element through `get` and `put`. The model's matrix products, such as `x1 wq^T` (`explorations/run-c4/src/MicroGptFlat.fss:58`), all run it.

**What it is, and is not.** `mul-shape/MulShape.java` is plain Java. It is no measurement of Fortress: no compiled Fortress program can run `mul` yet. It models `mul`'s control flow line for line (`mm`, `mma`, `partition`), with these variants, each a pair with the plain loop in one JVM:

1. a triple loop over `double[]`, the baseline;
2. the library's recursion, the elements unboxed, the operands plain row-major matrices behind an interface with `get` and `put`;
3. as 2, the right operand a transposed view of a matrix at an offset of a flat vector, as C4's `wq^T` is;
4. as 3, a task object made at each row and column split and run in place, as the compiled path makes one for each `also` block even when it does not fork (`explorations/reviews/parallelism-foundations-2026-11-08.md`, section 6);
5. as 3, each element a boxed object and each index a tuple object, as the compiled path holds them today;
6. as 3, the recursion stopped at blocks of at most 16 in each direction, each block run as loops through `get` and `put`.

Not modelled: the code generator's own costs around this shape (a closure class for each local function, boxed `ZZ32` indices, dispatch through springboards, the transaction check on a mutable local). So variants 2 to 5 are floors for what a compiled `mul` would pay.

**Run.** `javac MulShape.java; java -Xmx1g MulShape <n> <m> <p> <reps>` multiplies an n by m matrix by an m by p one. Each variant is warmed up, then timed seven times, and the best time is kept. Machine: 4 CPUs, Intel Xeon 2.30 GHz, OpenJDK 25.0.4.1, load 1.7 at the start and 2.8 at the end; another worker ran beside it. Only the ratios within one run are measurements. Every variant gives the same product as the baseline, bit for bit.

| shapes | 1, ns | 2 to 1 | 3 to 1 | 4 to 1 | 5 to 1 | 6 to 1 |
|---|---|---|---|---|---|---|
| 16×16 by 16×16 (attention) | 2,661 | 9.4 | 12.9 | 10.3 | 20.7 | 0.8 |
| 16×16 by 16×64 (feed-forward, in) | 10,703 | 9.3 | 9.6 | 10.1 | 21.0 | 0.8 |
| 16×64 by 64×16 (feed-forward, out) | 9,561 | 10.4 | 10.7 | 11.4 | 23.6 | 0.8 |

An earlier run of the first two shapes, without variant 6, gave 7.7 to 9.2 for variant 2 and 17.1 to 19.6 for variant 5.

**What it shows.**

- With every number unboxed, the recursion down to one element still costs about 8 to 13 times the plain loop. So array decisions A and B, done in full, would leave the model's matrix products about ten times from Java by this shape alone.
- Boxed elements and tuple indices double that, to about 17 to 24 times. The kernels probe measured 6.5 times for boxing on a plain loop (F-11); the recursion multiplies it.
- A leaf of 16 removes the cost: variant 6 is as fast as the plain loop. This is the rule that P-175 gives the parallel range, "the right forking constants", which `mul` does not have: `explorations/reviews/arrays-reminder-2026-11-10.md`, section 4, lists `mul` as still splitting to single elements.
- The views and the task objects are small beside the recursion: 0 to 4 points of the ratio.

## Decisions

None taken. The model is a model: a compiled kernel on the one library, timed against Java, replaces it as soon as one runs.

## For FACTS

- In a Java model of `Matrix.mul`'s control flow at microGPT's three shapes, the recursion to single element products costs 8 to 13 times a plain loop over `double[]` with unboxed elements and 17 to 24 times with boxed elements and tuple indices, and stopped at blocks of 16 it costs nothing. It means that phase 6's list lacks the library's own split in `mul`, and that unboxing alone does not bring a compiled matrix product near Java. No test checks it; the command above shows it. Detail: this note's table.
