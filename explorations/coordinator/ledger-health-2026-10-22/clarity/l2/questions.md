<!-- Ledger clarity pass, chunk l2: investigate questions (none) and the statements in the chunk's new lines that rest on a reading or an older run, with the command that would settle each. -->

# Chunk l2: questions

No row of the chunk is Investigate. Each new line in `rows.rewrite` states only what a gated test, a batch record's measurement or a reading of the tree supports.

A later probe can check these statements. Each one is marked in its row as a reading or as a measurement at a commit:

1. Row 340: does a `ZZ32` function whose body is a `try` with a numeral `catch` value still crash the code generator at `d4d454f9d`? It was measured at `83b1cae78`. `CodeGen.java` has not changed since, but the checker's expected-type work has (`27cb9e93b` and later). To settle it, run `bin/fortress compile` on `tried(): ZZ32 = try f() catch e InvalidRange => -1 end`, with `f` throwing `InvalidRange`, and look for 'Error trying to close method scope'.
2. Row 364: the new mechanism, "the inference unifies each argument's run-time type with its parameter (`EvaluatorBase.java:601-602`)", is a reading, and the row marks it so. `XXXInferredStaticArgRungS` gates the claim itself. Only a debugger at that line would confirm the mechanism. No question is owed.
3. Row 436: does an empty `SUM` over `Vector[\RR64,3\]` end in `CastError` too? It was measured before `2b1cd8e63`, which changed the fallback; the new line leaves the case out. To settle it, run `bin/fortress` on `SUM[\Vector[\RR64,3\]\][i <- 0#0] v`.
4. Rows 405 and 407: both stay `NEGATIVE-VERIFIED` beside spec `silent`. The curator holds that template question: REPORT section 7, question 1.
