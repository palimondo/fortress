# Judgement, chunk c16 (run c-run4, base c124c6b65)

- **367 keep: applied as is.** Check passes; `Common.scala:106-108` still holds the `SUnionType` `NI.nyi`. No line written; the ledger keeps its line.
- **695 keep: applied as is.** Check passes; the notes-refused signal is answered by the line. No line written.
- **882 keep: applied as is.** Check passes. silent: defect, in final.silent.
- **884 keep: applied as is.** Check passes.
- **365 rewrite: applied.** Check passes; rows.rewrite's line unchanged.
- **732 rewrite: applied with the check's correction.** "and an api's declarations have none in its index." replaced by the check's text (`CodeGen.java:934-940`), reworded to fit 700: "an imported api's trait's methods come from the api, whose declarations have no body; the first extended trait's need none, as they come through the class hierarchy (`:934-940`)". To fit, also "forwards only declarations" to "forwards only a declaration", "as walk does in both orders" to "as walk does either way".
- **849 rewrite: applied with both corrections.** "as P-58 does. Contested: ..." replaced by the check's text (P-58 does not name a varargs declaration; for the curator); class `deliberate (checker)` to `deliberate (parser)`. CONTESTED kept.
- **865 rewrite: applied with the check's second correction.** No program or output for the object-expression case is in any evidence file, so its first way (give the program) cannot be made exactly; took the second: cut "or an object expression's method" from the claim and "An object expression's method so bound gets the same message." from the notes; "No library binding is in either." to "in one.". The object-expression case is filed in queue.md as a question to measure (FACTS.md:133 still names it).
- **885 keep: applied as the check's line.** Class `design limit (parser)` to `implementation gap (parser)`, matching its silent: defect verdict; rest of the present line unchanged.
- **886 rewrite: applied with the check's correction, shortened.** The check's replacement made the row 1311 characters (limit 1200), notes 874 (limit 700). Kept: "A refusal is right, as no Java type carries the program's type; the gap is its message, which names the library's transfer." Dropped, home history row 886: the fix hint (match by full name) and the sentence on a program's own `NN32` compiled and own `Char` under walk, which the cold reader could not place. Also shortened the second message quote to 'NN64->ZZ64 ...'.
- **288 rewrite: applied with the check's correction.** "reaches the interpreter's prelude," to "reaches the interpreter's library, `FortressLibrary`,".
- **290 rewrite: applied with both corrections.** "row 288's shims" to "row 289's shims"; "The template translator loses `isParenthesized`;" to "Where the expansion loses `isParenthesized` is not located;". To fit 700: "does not see it" to "misses it".
- **Pairs:** 288/71 upheld by the check; in final.pairs.
- **Silent:** all five lines of silent.txt upheld (885's class now agrees); in final.silent.
- **Closes, duplicates:** none.
