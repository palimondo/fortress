<!-- Rung 0 of coordinator/PLAN.md: the two one-line runtime defects, measured before and after and gated on the full suite. Written 2026-09-17 by the worker that made the edits. Not committed here; the coordinator reviews and commits. -->

# Rung 0: the two one-line runtime defects

Not verified.

## What changed

Two files, both inside the rung's boundary, 17 changed lines together.

`ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:248` (ledger row 302) built the debug message for `inATransaction()` on every call and then threw it away, because `debug(String)` reads the flag only after the argument has been evaluated. The call now reads the flag first. The line number did not move, so the second candidate at line 234 (`getCurrentTransaction`) stays out of scope; it is the same defect and is hit far less often on this path.

`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java` (ledger row 303) kept the literal as a `String` and parsed it back in `asRR64()`, and its `double` constructor built that string with `new Double(val).toString()`. The class now carries the `double` as well: the string constructor parses once, the double constructor keeps the number and leaves the string null, `asRR64()` returns `FRR64.make(dval)`, and `toString()` falls back to `Double.toString(dval)`. Code generation emits `FFloatLiteral.make(D)`, so the hot path is the double constructor, which no longer touches a string at all.

```diff
--- a/ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java
+++ b/ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java
@@ -245,7 +245,7 @@ public abstract class BaseTask extends FortressExecutable {
 
     public static boolean inATransaction() {
         FortressTaskRunner ftr = (FortressTaskRunner) Thread.currentThread();
-        debug("inATransaction: ftr = " + ftr + " task = " + ftr.getTask());
+        if (debug) debug("inATransaction: ftr = " + ftr + " task = " + ftr.getTask());
 
         if (ftr.getTask() != null) 
             if (ftr.getTask().transaction() != null)
--- a/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java
+++ b/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java
@@ -16,14 +16,21 @@ public final class FFloatLiteral extends fortress.CompilerBuiltin.FloatLiteral.D
 
-    private String val;
+    /* The literal as written, when this value came from source text; null when
+       it was built from a double.  dval is the same number as a primitive and
+       is what asRR64 hands out, so the decimal round trip happens at most once
+       per literal instead of once per use. */
+    private final String val;
+    private final double dval;
 
     private FFloatLiteral(String val) {
         this.val = val;
+        this.dval = Double.valueOf(val);
     }
 
     private FFloatLiteral(double val) {
-        this(new Double(val).toString());
+        this.val = null;
+        this.dval = val;
     }
@@ -39,7 +46,7 @@
     public String toString() {
-        return val;
+        return val != null ? val : Double.toString(dval);
     }
@@ -51,12 +58,14 @@
     public FRR64 asRR64() {
-        return FRR64.make(Double.valueOf(val));
+        return FRR64.make(dval);
     }
 
     public FRR32 asRR32() {
-        return FRR32.make(Float.valueOf(val));
+        /* The written text, where there is one, rounds to the nearest float in
+           one step; the double-built path narrows the double it already holds. */
+        return val != null ? FRR32.make(Float.valueOf(val)) : FRR32.make((float) dval);
     }
```

## The four timings

`bench1t` (`perf-probes/boxing/`) writes both float literals inside the loop; `bench1h` (`perf-probes/kernels/`) hoists them into variables bound once, so the transaction check is the only one of the two defects its loop still meets. Both are 20 M iterations of `acc := acc a + b` over `RR64`, timed inside the program with `nanoTime`, three runs each in a fresh JVM, JDK 25, `FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`. Medians of three, loop only.

| benchmark | before | after | factor |
| --- | --- | --- | --- |
| `bench1t` | **13.0566 s** | **0.7384 s** | 17.7× |
| `bench1h` | **8.8159 s** | **0.7287 s** | 12.1× |

Runs behind the medians: before `bench1t` 12.6236 / 13.0821 / 13.0566, before `bench1h` 8.9238 / 8.8159 / 8.3855; after `bench1t` 0.7384 / 0.7261 / 0.7423, after `bench1h` 0.7287 / 0.7128 / 0.7343. Both programs print the same accumulator, `0.8646647302294265`, before and after. Raw outputs: `before.out`, `after.out`; the harness is `time-both.sh` beside them.

The difference between the two benchmarks is the literals' own cost, and it is what the `FFloatLiteral` edit removes: `bench1t` minus `bench1h` was 4.2407 s before and is 0.0097 s after. The transaction check is what `bench1h`'s own 8.0872 s drop measures.

Two cautions on the numbers. First, this host is slower today than the one that produced the baselines on record (`bench1t` 9.3441 s, `bench1h` 6.0732 s on 2026-09-15): an untouched tree measured 12.9446 s and 8.8345 s here before anything was edited, so only a before/after pair taken in one session compares. Second, the before figures above are not that first pair but a control run: `ant compileAll` forces the next `fortress compile` to clear the bytecode cache, so the library jars had to be rebuilt between the two measurements, and the rebuild was a confound. The control removes it — the two source files were put back to their committed text, `ant compileAll` and the library-order recompile were run again, and the benchmarks were re-timed on exactly the library jars the after-run then used. The control reproduced the slow numbers (13.0566 / 8.8159), the fixed sources were restored, and the after-run was taken again (0.7384 / 0.7287, reproducing an earlier 0.7515 / 0.7125). The drop is the edit, not the rebuild.

## The gate

`ant compileAll` succeeds. `ant testFast`: 47 suites, 1,377 tests, 0 failures, 0 errors. `ant testSystem`: 4 suites, 382 tests, 0 failures, 0 errors. Both were run after the final rebuild of the fixed sources, as separate invocations, and every `Tests run:` line was grepped for a non-zero failure or error count; none matched.

## Two notes for the record

`compiler/asmbytecodeoptimizer/RemoveLiteralCoercions.java:55-95` already folds the pair `FFloatLiteral.make(D)` plus `CompilerBuiltin.coerce_RR64` into `FRR64.make(D)`, in two spellings, one per code-generation idiom. It would have removed this cost at the bytecode level. It is reached only from `ByteCodeOptimizer.optimize`, whose one entry point is that class's own `main`: nothing in the compiler driver, the runtime or `build.xml` calls it. The optimizer is dormant and was not touched.

`asRR32()` now has two paths. Where the literal was written in source the string is still parsed to a float in one step, as before. Where the value came from a double there is no string, and the double is narrowed with a cast. The two are not always the same bit pattern: parsing the shortest decimal that round-trips the double can round differently from rounding the double itself, in the rare double-rounding cases. Narrowing the double is the more defensible of the two, but it is a change in a path the suite may not cover, and it is the one open question in this rung.

## Boundary

Files changed by this rung: the two runtime sources above, `explorations/fortress-gap-ledger.md` (rows 302 and 303 marked fixed, nothing else), `explorations/coordinator/FACTS.md` (four lines under the execution-model section), `explorations/microgpt-run-c-handover.md` (one sentence), and this directory. Nothing was committed or pushed.
