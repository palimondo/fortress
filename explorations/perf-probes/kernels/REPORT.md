# microGPT-shaped kernels: what the compiled path actually spends its time on

The boxing probe (`explorations/perf-probes/boxing/REPORT.md`) measured a loop
that microGPT-shaped code never writes: `acc := acc 0.9999999 + 0.0000001`,
with both float literals *inside* the hot loop and a `:=` accumulator whose
every read and write passes a transaction check. Pavol's objection is exact,
and this probe answers it in two parts: **bench1 rewritten fairly** — the
literals bound once before the loop, the accumulator made immutable — and
**three kernels shaped like the program**, sized as `MicroGptFlat` and written
in the program's own array vocabulary.

Three findings, up front.

1. **Rewriting bench1 fairly removes 95% of the compiled path's gap.**
   Hoisting the two literals takes the compiled loop from 9.3441 s to
   6.0732 s; making the accumulator immutable takes it to **0.4207 s**. That is
   **9.7× primitive Java**, not the 156× the boxing probe reported — on the same
   arithmetic, the same 20 M iterations, the same host and JDK.
2. **A Flight Recorder profile of the real compiled run attributes 88.9% of
   the remaining time in the `:=` form to `BaseTask.inATransaction()` and the
   debug string it builds eagerly** — `StringUTF16.newBytesFor`,
   `StringBuilder.append`, `Thread.toString`, `Arrays.copyOf` are the top four
   leaf frames. This is a measurement of the generated code, not a Java model
   of it.
3. **None of the three microGPT-shaped kernels compiles.** All three fail
   identically, before codegen, with 77 errors of which the distinct messages
   are `Array is undefined.`, `Vector is undefined.`, `Array3 is undefined.`
   The compiled prelude has no `RR64` array type of any kind. That is the
   walking skeleton's first obstacle, and it is one obstacle, not three.

---

## 0. How it was run

Host: Linux 6.18.44-fc-v33 x86_64, 4 cores, 15 GB. JDK 25.0.3 for everything
(`fortress`, `javac`, `java`, `javap`, `jfr`), via
`source /home/user/fortress/experiment/env.sh` — `FORTRESS_THREADS=1`,
`JAVA_FLAGS=-Xmx4g -Xss64m`; the Java forms were run with the same
`-Xmx4g -Xss64m`. Date 2026-09-15. Tree at HEAD; nothing outside
`explorations/perf-probes/kernels/` was modified. (One exception, recorded
here so it is not a surprise: the failed `fortress compile bench1rLocal.fss`
left a **0-byte `bench1rLocal.jar`** in `default_repository/caches/bytecode_cache/`,
which this probe deleted again — a smaller cousin of the empty-bytecode-cache
trap the boxing report recorded.)

The bytecode cache was **already populated** from the boxing probe, so the
117 s library-order rebuild (`explorations/repo-internals.md`) was not needed
and was not repeated. Per-program compiles ran clean and in one pass;
the empty-cache-after-exit-0 failure the boxing report warned about did not
recur. `compile-bench1.out`, `compile-kernels.out`, `compile-probes.out`,
`compile-bench1rLocal.out` keep every compile.

Timing: the loop only, with `nanoTime()` immediately around it inside each
Fortress program and `System.nanoTime` around it inside each Java program.
Three runs of every form, each in its own fresh JVM, median reported;
`run-all.sh` made every run sequentially with the machine otherwise idle,
`timings.out` keeps them all, and `medians.sh` derives `medians.tsv` from that
file rather than from anything typed by hand.

**The Java forms do one untimed warm-up pass and then MULT timed passes of
exactly the work one Fortress run of the loop does, and print the mean.**
Without it the kernels finish inside JIT warm-up: `KDotPrim` measured 2.5 ms
cold against 0.78 ms warm, and the boxed and generic forms inverted their
order. This is why this probe's `Bench1HPrim` median (0.0434 s) is below the
boxing probe's `Bench1Prim` (0.0598 s) on the same loop — the boxing probe
timed the first pass. All ratios below are against this probe's own numbers.

Numerics: every form of bench1 prints `0.8646647302294265`; kdot prints
`231145.26854219884`, kmat `154.0 208.0`, krows
`-1.444628562098535 0.5298121992304703` — interpreter and both Java forms
agree to the last digit on all four.

---

## 1. bench1, rewritten fairly

`bench1h.fss` is `bench1t.fss` with one variable changed: `a: RR64 = 0.9999999`
and `b: RR64 = 0.0000001` bound once before the loop, body `acc := acc a + b`.

`bench1r.fss` additionally removes the `:=`. **The immutable spelling here is a
tail-recursive function, not a reduction, and the reason is worth stating**:
the compiled prelude has no `SUM`, no generic `BIG` operator and no user
reduction at all (gap-ledger row 74 — `Operator BIG + is not defined`), so a
reduction cannot be written on this path; and the recurrence `acc ← acc·a + b`
is sequential, so even with `SUM` available it would not be a reduction. The
JVM does not eliminate tail calls, so 20 M frames fit on no stack: the loop is
20000 chunks of 1000, and the `:=` survives on the chunk boundary only — 40000
transaction checks instead of 40 M, 0.1% of bench1t's. A second constraint the
code generator imposed: `chunk`, `a` and `b` are **component-level, not local**,
because a local function is `Can't compile LetFn`
(`CodeGen.sayWhat`, `CodeGen.java:1552`). `bench1rLocal.fss` is the same program
written the natural way and is kept as that reproducer: it runs on the
interpreter (48.4 s) and does not compile.

20 M iterations. `bench1t` rows are the boxing probe's, quoted for comparison.

| form | loop, s (median of 3) | ns / iteration | × Java primitive |
|---|---|---|---|
| interpreter, `bench1t` (literals in loop, `:=`) | 52.4383 | 2622 | 1209× |
| interpreter, `bench1h` (literals hoisted, `:=`) | 53.4225 | 2671 | 1232× |
| interpreter, `bench1r` (hoisted, immutable) | 44.5910 | 2230 | 1028× |
| **compiled, `bench1t`** | **9.3441** | 467 | **215×** |
| **compiled, `bench1h`** | **6.0732** | 304 | **140×** |
| **compiled, `bench1r`** | **0.4207** | 21.0 | **9.70×** |
| Java, boxed, escape analysis defeated | 0.1868 | 9.3 | 4.31× |
| Java, boxed as the runtime boxes | 0.0720 | 3.6 | 1.66× |
| **Java, primitive `double`** | **0.0434** | 2.2 | **1.00** |

Interpreter / compiled: **8.8×** on `bench1h`, **106×** on `bench1r`.

### What each rewrite bought, against the boxing report's numbers

| step | compiled, s | delta | share of `bench1t`'s 9.3441 s | the boxing report's estimate |
|---|---|---|---|---|
| `bench1t` → `bench1h`: hoist the two literals | 9.3441 → 6.0732 | **−3.2709** | **35.0%** | ~30%, 2.96 s (Java model) |
| `bench1h` → `bench1r`: drop the `:=` (and with it the generator) | 6.0732 → 0.4207 | **−5.6525** | **60.5%** | ~34% transaction + ~7% generator = 41% (Java model) |
| what is left | 0.4207 | — | 4.5% | ~30% "genuinely representational" |

The boxing report's Java model got the literal round-trip right to within 10%
and **under-counted the `:=` by half**. The reason is visible in the
bytecode: removing the cell does not only remove two `inATransaction()` calls,
it removes the `volatile` write through `MutableFValue` that was pinning every
`FRR64`, and it replaces the generator's recursive subdivision plus interface
call with a direct static recursive call. HotSpot can then inline the whole
body and scalar-replace the boxes. The three costs the boxing report listed
separately are not additive: the cell was holding the other two in place.

### The bytecode, for the two claims above

`javap/extract.sh` → `javap/bench1h.javap.txt`, `javap/bench1r.javap.txt`.
`bench1h`'s loop body (`bench1h$\=fn@14\!7-28.apply`) now reads the hoisted
values from closure fields — `getfield a`, `getfield b` — with **no
`FFloatLiteral.make` and no `coerce_RR64` anywhere inside the loop**, which is
what the 3.27 s bought; and it still carries both transaction guards:

```
     0: invokestatic  #31   // BaseTask.inATransaction:()Z
     3: ifeq          19
     6: invokestatic  #35   // BaseTask.getCurrentTransaction
    13: invokevirtual #41   // Transaction.TXRead:(MutableFValue;)FValue;
    19: getfield      #21   // Field acc:…/MutableFValue;
    23: invokevirtual #47   // MutableFValue.getValue
    26: checkcast     #49   // FRR64
    33: getfield      #19   // Field a:…/FRR64;          <- the hoisted literal
    36: invokestatic  #55   // CompilerBuiltin.juxtaposition
    43: getfield      #23   // Field b:…/FRR64;          <- the hoisted literal
    46: invokestatic  #58   // CompilerBuiltin."+"
    49: invokestatic  #31   // BaseTask.inATransaction:()Z   <- and again for the write
```

`bench1r.chunk` has neither guard and no `FFloatLiteral`; it reads `a` and `b`
from `getstatic bench1r$a.ONLY` / `bench1r$b.ONLY` and tail-calls itself. It
does still allocate two `FIntLiteral`s per iteration for the integer literals
`0` and `1`, and those are cheap — `FIntLiteral` keeps a `long` field, whereas
`FFloatLiteral` keeps its value **as a `String`** and its `(double)`
constructor is `this(new Double(val).toString())`. The literal round-trip is a
float-literal problem, not a literal problem.

---

## 2. The three microGPT-shaped kernels

Sized as the program: `MicroGptFlat.fss:17-18` gives `nEmbd = blockSize = 16`,
so a batch-1 step's activations are 16 rows of 16, and the nine weight
matrices laid end to end are `nParams() = 4192` elements
(432 + 256 + 432 + 4·256 + 1024 + 1024). The interpreter form of each kernel
imports **C4's own `FlatArrays`** (copied unchanged from
`explorations/run-c4/src`), so the code under test is the program's code, and
`krows` uses C4's own `rmsn` from `MicroGptFlat.fss:27`. Rep counts were picked
from a 20-rep sizing run (`calibration.out`) so each kernel runs for seconds.

The Java forms come in three: `*Prim` over `double[]`; `*Boxed` over `Box[]`,
where `Box` is modelled on `runtimeValues/FRR64` (final class, final `double`
field, private constructor, static `make`, no cache) with the arithmetic in the
shape of the generated native wrapper — `getValue(); getValue(); <op>;
make(...)`; and `*Gen`, which adds the **generic array object**: `Object[]`
storage behind an interface, with the `checkcast` on every element read, which
is the representation `array[\RR64\](n)` actually has, plus a row-view object
per row where `FlatArrays.RowView` has one.

### (a) `kdot` — the flat parameter vector, 200 dot products of 4192 `RR64`

| form | loop, s (median of 3) | × Java primitive |
|---|---|---|
| Fortress interpreter (walk) | 4.2741 | 5452× |
| **Fortress, bytecode compiler** | **does not compile** | — |
| Java, boxed + generic array object | 0.005364 | 6.84× |
| Java, boxed as the runtime boxes | 0.004910 | 6.26× |
| **Java, primitive `double[]`** | **0.000784** | **1.00** |

### (b) `kmat` — 16×16 by 16×16, 200 products (rung 6's `w04_cost.fss` shape)

The product is written as juxtaposition, which is the shipped library's
`opr juxtaposition` on `Matrix` and the same entry point as `opr DOT`
(`FortressLibrary.fss:2621-2629`) — the spelling `MicroGptFlat` uses (`x1 wq^T`).

| form | loop, s (median of 3) | × Java primitive |
|---|---|---|
| Fortress interpreter (walk) | 10.3078 | 14376× |
| **Fortress, bytecode compiler** | **does not compile** | — |
| Java, boxed + generic array object | 0.004759 | 6.64× |
| Java, boxed as the runtime boxes | 0.004685 | 6.53× |
| **Java, primitive `double[]`** | **0.000717** | **1.00** |

### (c) `krows` — the row lift, 400 × `rows(rmsn, m)` over a 16×16 matrix

`rmsn(x) = x / SQRT (epsilon + (x DOT x) / |x|)`, C4's own, over each of the 16
rows; the allocations mirror `FlatArrays.rows` (one result matrix per call, one
temporary vector per row).

| form | loop, s (median of 3) | × Java primitive |
|---|---|---|
| Fortress interpreter (walk) | 2.8018 | 2533× |
| **Fortress, bytecode compiler** | **does not compile** | — |
| Java, boxed + generic array object | 0.003001 | 2.71× |
| Java, boxed as the runtime boxes | 0.002864 | 2.59× |
| **Java, primitive `double[]`** | **0.001106** | **1.00** |

### Why none of them compiles — the exact error

All three fail in the front end, before codegen, with **77 errors each**, every
one of them raised inside `FlatArrays.fsi`, and three distinct messages:

```
########## fortress compile kdot.fss          (identical for kmat, krows, FlatArrays)
FlatArrays.fsi:9:32-35:   Array is undefined.
FlatArrays.fsi:15:15-18:  Array is undefined.
…
FlatArrays.fsi:29:25-29:  Vector is undefined.
FlatArrays.fsi:37:37-41:  Array3 is undefined.
File kdot.fss has 77 errors.
```

Three minimal probes pin it down (`compile-probes.out`):

| probe | compiled path | interpreter |
|---|---|---|
| `pArray.fss` — `f(x: Array[\RR64,ZZ32\])`, `array[\RR64\](4)` | `Array is undefined.` | runs |
| `pVector.fss` — `vector[\RR64,4\](…)`, `v DOT v` | `Vector is undefined.` | runs |
| `pSqrt.fss` — `SQRT`, `^`, juxtaposition on `RR64` | **compiles and runs**, `pSqrt 1.0000049999875` | runs |

So the gap is deeper than gap-ledger row 72 recorded. Row 72 says
`Function array is not defined` — the *constructor* is missing. In fact the
**types are missing too**: `Library/CompilerLibrary.fsi` ships exactly two
aggregate types, `ZZ32Vector` and `StringVector`
(`CompilerBuiltin.fsi:531,550`), and there is no `Array`, `Array1`, `Array2`,
`Array3`, `Vector` or `Matrix` on the compiler path at all. The scalar
vocabulary the kernels need besides the arrays — `SQRT`, `^`, juxtaposition on
`RR64` — is all present, and `DOT` on scalars is present; what is absent is
anything to put numbers in.

**Which of the three kernels the compiled prelude cannot run today: all three,
and for one reason.** `kdot`, `kmat` and `krows` are blocked by a single
missing thing — an `RR64` array type — not by three different gaps. `DOT` and
`SQRT` are not the obstacle (`SQRT` is there; `DOT` on vectors is a
`FortressLibrary` declaration over `Vector`, which arrives with the type).
`SUM` (row 74) and `exp`/`log` (row 73) are not on the critical path for these
three kernels either, though `MicroGptFlat`'s `sm` needs both. This is gap G2
and it is the walking skeleton's first obstacle.

---

## 3. Flight Recorder on the real compiled runs

`bin/fortress` and `bin/run` both pass `$JAVA_FLAGS` straight to the `java`
command line (`bin/fortress:27-32`, `bin/run:27-40`), so the recording is
started by adding `-XX:StartFlightRecording` to `JAVA_FLAGS` — no wrapper and
no edit to either script. Sampling period forced to 1 ms, since `bench1r`'s loop
is only 0.44 s. `jfr/run-jfr.sh` made the recordings; `jfr/top-frames.py`
summarises `jdk.ExecutionSample` into leaf frames, frames-anywhere and stack
shapes, restricted to the thread that ran the loop **and** to the last
*loop_ns* seconds before the final sample, so JVM startup does not dilute the
counts; `jfr/group-frames.py` buckets every leaf frame (not just the top 25).
Full outputs in `jfr/top-frames-*.txt` and `jfr/grouped-frames.txt`.

Since no kernel compiles, the third recording is the **interpreter** running
`krows` — the only Fortress run of a microGPT-shaped kernel that exists. It is
labelled as such throughout; it attributes the walk interpreter's time, not the
compiled path's.

### compiled `bench1h` — 5458 samples over the 7.27 s loop

| top leaf frames | share |
|---|---|
| `java.lang.StringUTF16.newBytesFor(int)` | 33.7% |
| `java.lang.StringBuilder.append(String)` | 26.4% |
| `java.util.Arrays.copyOf(byte[], int)` | 10.4% |
| `com.sun.fortress.runtimeSystem.BaseTask.inATransaction()` | 10.0% |
| `fortress.CompilerLibrary.countedseqloop(…)` | 6.3% |
| `java.lang.Integer.formatUnsignedInt(…)` | 3.5% |
| `FZZ32.make(int)` | 1.4% |
| `java.lang.Thread.toString()` | 1.1% |

Frames appearing anywhere in a stack, one count per sample:
`BaseTask.inATransaction()` **88.9%**, `String.valueOf(Object)` 78.5%,
`StringBuilder.append(String)` 70.4%, `Thread.toString()` 42.8%,
`countedseqloop` 98.7% (it is the enclosing loop), the program's own loop body
89.1%. Bucketed over all samples:

| bucket | share |
|---|---|
| **transaction check, including its eagerly built debug string** | **88.9%** |
| generator (`countedseqloop` subdivision) | 6.3% |
| integer index boxing | 2.3% |
| classload / JIT / GC / other | 1.6% |
| closure and trait dispatch | 0.8% |
| the program's own compiled code | 0.1% |
| `RR64` boxing and arithmetic | 0.0% |

This is the boxing report's inferred cost, now measured on the generated code:
`BaseTask.java:248` is
`debug("inATransaction: ftr = " + ftr + " task = " + ftr.getTask())`, with
`debug` a `private static Boolean` that is `false`; the message is built on
every call, and `ftr` is a `Thread`, so `Thread.toString()` and the
`StringBuilder`/`StringUTF16` machinery under it are 70% of the loop by
themselves. **Guarding that one message with its own flag is a one-line
change** and, by this profile, it is worth most of `bench1h`'s 6.07 s.

### compiled `bench1r` — 213 samples over the 0.44 s loop

| bucket | share |
|---|---|
| the program's own compiled code, arithmetic inlined into it | 65.3% |
| classload / JIT / regex / other (the loop is short; process noise bleeds in) | 26.8% |
| transaction check (the 40000 chunk-boundary `:=`) | 3.8% |
| `RR64` boxing and arithmetic (`FRR64.make`) | 2.3% |
| closure/trait dispatch, integer boxing | 1.8% |

Once the cell and the literals are gone, the profile is the loop body: 65.3% in
`bench1r.chunk` itself with the arithmetic inlined into it, and `FRR64.make`
visible at 2.3%.

### interpreter `krows` — 2628 samples over the 3.40 s loop (the extra)

| bucket | share |
|---|---|
| AST walk: `Evaluator.eval`, closures, environment construction | 43.5% |
| environment lookup: `BATreeNode`, `StringHashComparer`, `String.compareTo` | 32.3% |
| other | 16.7% |
| run-time type dispatch (`FType.subtypeOf`, `excludesOtherInner`) | 5.2% |
| fork-join runtime | 2.2% |

Top leaf frames: `StringHashComparer.compare` 12.4%,
`Evaluator.evalExprList` 6.0%, `BATreeNode.rightWeightIncreased` 5.3%,
`BATreeNode.getObject` 4.4%, `Evaluator.evalExprListParallel` 3.8%,
`BATreeNode.add` 3.6%, `TupleTask.compute` 3.3%, `FTraitOrObject.subtypeOf`
2.6%. **Number representation does not appear at all.** On the only path that
runs microGPT-shaped code today, roughly three quarters of the time is
looking names up in balanced-tree environments and walking the AST.

---

## 4. What the shares are, for microGPT-shaped code

Stated plainly, and with the one caveat that governs all of it: **on the
compiled path, microGPT-shaped code does not run at all**, so every share below
that concerns the compiled path is measured on the code the compiler *can*
run — the fairly-written scalar loop — and on Java models of the array kernels,
and is labelled as such. **Boxing is a small share of the compiled path's cost
on the scalar loop and a large share of the representational cost in the array
kernels**: in the compiled Fortress ladder, everything that is left after the
literals and the `:=` are removed is 0.4207 s of `bench1t`'s 9.3441 s, so
boxing cannot exceed 4.5% of the original gap, and the Java bracket puts it
lower still — 0.072 s boxed against 0.043 s primitive is 0.3% of the gap, and
0.187 s with escape analysis defeated is 1.5%; but in the array kernels the
same boxes cannot be scalar-replaced, because every element result is stored
into an array and escapes, and there boxing costs **6.3× on the dot product,
6.5× on the matrix product and 2.6× on the row lift** over primitive `double[]`
in Java. **The transaction check is the largest single share of the compiled
path's cost today**, and two independent measurements agree on it: the
`bench1h` → `bench1r` ablation charges 5.65 s, 60.5% of `bench1t`, to removing
the `:=` (a bound that also contains the generator), and the Flight Recorder
profile of `bench1h` puts 88.9% of that run's 6.07 s — 5.40 s, 57.8% of
`bench1t` — under `BaseTask.inATransaction()`, most of it inside the debug
message the method builds before it looks at the flag that would discard it.
**The float-literal round-trip is 35.0%**, 3.2709 s, measured by hoisting the
two literals and changing nothing else, which agrees with the boxing report's
30% Java-model estimate; `javap` confirms the loop body no longer calls
`FFloatLiteral.make` or `coerce_RR64`, and the asymmetry is specific —
`FFloatLiteral` stores its value as a `String` and re-parses it, `FIntLiteral`
keeps a `long`. **Dispatch and the generic array objects are the smallest named
shares**: in the `bench1h` profile, closure and trait dispatch is 0.8% and
integer index boxing 2.3%, with the generator a further 6.3%; and in the Java
kernel models the generic array representation — `Object[]` behind an interface
with a `checkcast` on every read, plus a row-view object per row — costs only
**9% on `kdot`, 1.6% on `kmat` and 4.8% on `krows`** on top of boxing, so the
indirection is nearly free next to the allocation it holds. On the interpreter,
which is the only path that runs these kernels, the shares are different again
and none of them is representational: 43.5% AST walk, 32.3% environment
lookup, 5.2% run-time type dispatch, and number representation not in the
profile at all.

**Where `performance-roadmap.md`'s "every `RR64` is a heap object" stands.**
It is true, and this probe sharpens rather than retires it — but it moves in
the ordering. For the scalar loop it was never the ceiling and now it is not
even the floor: a fairly written compiled loop is 9.7× primitive Java, and
boxing is at most 1.5 percentage points of the 215× it was. For array-shaped
code — which is what microGPT is — it is the dominant *representational* cost,
6.3–6.5× on the dot product and the matrix product, because array element
results escape and no JIT can scalar-replace them; that is the strongest
support the roadmap's A1/A2 (unbox by static type, `double[]`-backed arrays)
has had. But it is still not what makes today's numbers what they are. Today
the compiled path cannot express a microGPT kernel at all, and the interpreter,
which can, spends none of its time on representation. The order that follows
from this probe: first give the compiler library an `RR64` array type (G2) so
the kernels exist on that path at all; then the two one-line defects — the
`inATransaction` debug string and the `FFloatLiteral` round-trip — which
together are ~95% of what the compiled path currently wastes; then unboxing and
`double[]`, which is where the remaining 6× on array code lives, and which the
first step must be designed for rather than retrofitted to.

---

## 5. Candidate gap-ledger rows

The numbers below are the ledger's final numbers, assigned at the merge of 2026-09-16 (`explorations/gap-ledger-probes/probes-merge/MERGE.md`): the candidates drafted here as 289-292 were entered as **303-306**, because 288-291 went to `explorations/perf-probes/grammar-compile/REPORT.md`, whose numbers two review documents already cite, and the boxing probe's row became 302. `explorations/coordinator/FACTS.md` cites candidates 290 and 291 by their draft numbers.

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 303 | bench1 rewritten as microGPT-shaped code would write it — the two float literals bound once before the loop, the accumulator immutable — runs **0.4207 s compiled against 9.3441 s for the boxing probe's spelling, 9.7× primitive Java rather than 156×** (loop-only medians of 3, JDK 25, 20 M iterations). Hoisting the literals alone is 35.0% of the gap (9.3441 → 6.0732 s); dropping the `:=` is a further 60.5%. A Flight Recorder profile of the real compiled `bench1h` run attributes **88.9% of its samples to `BaseTask.inATransaction()` and the debug message it builds eagerly** (`BaseTask.java:248`; top leaf frames `StringUTF16.newBytesFor` 33.7%, `StringBuilder.append` 26.4%, `Arrays.copyOf` 10.4%), 6.3% to `countedseqloop`, 0.8% to closure/trait dispatch and 0.0% to `RR64` boxing | POSITIVE-VERIFIED | implementation gap | — | `perf-probes/kernels/` (`bench1h.fss`, `bench1r.fss`; `timings.out`, `medians.tsv`; `jfr/`, `javap/`) | ours | Refines row 302: the boxing report's Java model under-counted the `:=` by half, because the volatile `MutableFValue` cell was also pinning the boxes and forcing the generator's closure call — the three costs are not additive. Cheap fixes unchanged and now measured on the generated code: guard the `inATransaction` message with its flag; constant-fold the float-literal coercion (`FFloatLiteral` stores its value as a `String`; `FIntLiteral` keeps a `long`, which is why integer literals are cheap). |
| 304 | the code generator cannot compile a **local function**: `Can't compile LetFn` (`CodeGen.sayWhat`, `CodeGen.java:1552`). The same program with the function at component level compiles and runs | NEGATIVE-VERIFIED | implementation gap | `basic/expressions/blocks.tex:43` ("local variable declarations, or local function declarations") | `perf-probes/kernels/bench1rLocal.fss` vs `bench1r.fss`; `compile-bench1rLocal.out` | ours | Interpreter runs `bench1rLocal` (48.4 s). Workaround: lift the function to component level. |
| 305 | G2 is wider than row 72 recorded: the compiler path has no `RR64` **array type**, not merely no `array[\T\]` constructor — `Array`, `Array1/2/3`, `Vector` and `Matrix` are all undefined, and `CompilerLibrary`/`CompilerBuiltin` ship only `ZZ32Vector` and `StringVector`. All three microGPT-shaped kernels (4192-element dot product, 16×16 matrix product, `rows(rmsn, m)`) fail identically with 77 errors, every one raised inside the API of C4's `FlatArrays`, before codegen. The scalar vocabulary they need beside the arrays (`SQRT`, `^`, juxtaposition on `RR64`) is present and compiles | NEGATIVE-VERIFIED | library gap vs spec | `library/apis/FortressLibrary.tex:1479,1736` (`Array[\T,E,I\]`); the compiler path's own API is `library/apis/CompilerLibrary.tex` | `perf-probes/kernels/` (`kdot.fss`, `kmat.fss`, `krows.fss`, `pArray.fss`, `pVector.fss`, `pSqrt.fss`; `compile-kernels.out`, `compile-probes.out`) | ours | One obstacle, not three: `DOT` and `SQRT` are not the blockers. This is the walking skeleton's first obstacle. |
| 306 | in Java over the runtime's own box shape, boxing costs **6.3× (4192-element dot product), 6.5× (16×16 matrix product) and 2.6× (the `rmsn` row lift)** against primitive `double[]`, and the **generic array object** — `Object[]` behind an interface with a `checkcast` per read, as `array[\RR64\](n)` is — adds only 9%, 1.6% and 4.8% on top. The same boxes cost 1.7× in the scalar loop, because there they can be scalar-replaced and in an array they escape. The walk interpreter runs the same three kernels 5452×, 14376× and 2533× slower than primitive Java, and its profile is 43.5% AST walk, 32.3% environment lookup, 5.2% run-time type dispatch, 0% number representation | POSITIVE-VERIFIED | implementation gap | — | `perf-probes/kernels/java/`, `jfr/top-frames-interp-krows.txt`, `jfr/grouped-frames.txt` | ours | Supports `performance-roadmap.md` A1/A2 for array-shaped code specifically, and withdraws the same argument for scalar code. |

---

## 6. Files

* `bench1h.fss`, `bench1r.fss` — the fair bench1; `bench1rLocal.fss` — the
  `LetFn` reproducer.
* `kdot.fss`, `kmat.fss`, `krows.fss` — the three kernels;
  `FlatArrays.fss`/`.fsi` — C4's vocabulary, copied unchanged from
  `explorations/run-c4/src`.
* `pArray.fss`, `pVector.fss`, `pSqrt.fss` — the compiled-prelude probes.
* `java/Box.java`, `java/Gen.java` — the runtime's box and its generic array
  object; `java/Bench1H{Prim,Boxed,BoxedSink}.java`,
  `java/K{Dot,Mat,Rows}{Prim,Boxed,Gen}.java`, compiled into `java/classes/`.
* `run-all.sh` — the timing harness; `medians.sh` → `medians.tsv`;
  `timings.out` — every run; `calibration.out` — the sizing runs.
* `compile-bench1.out`, `compile-bench1rLocal.out`, `compile-kernels.out`,
  `compile-probes.out` — every compile.
* `jfr/run-jfr.sh`, `jfr/top-frames.py`, `jfr/group-frames.py`,
  `jfr/*.jfr`, `jfr/top-frames-*.txt`, `jfr/grouped-frames.txt`,
  `jfr/jfr-runs.out`.
* `javap/extract.sh`, `javap/bench1{h,r}.javap.txt`, `javap/bench1{h,r}.classes.txt`.
