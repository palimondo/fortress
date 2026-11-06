# Cold read: c-run2/c2

Read with CLAUDE.md, `.claude/skills/fortress-repo/SKILL.md` and its references (not `revival-changes.md` or `sources.md`). Two rows.

## Row 318

- **Defect:** On the compiled path, about twenty operators declared on `IntLiteral` (the type of an integer literal whose type no declaration fixes) are stubs in the compiler's prelude that throw `CompilerFailureDetectedAtRunTime` when called. Because the `IntLiteral` overload exists and fits, the call never coerces the literals to `ZZ32`, so an expression such as `3 DIV 2` on two bare literals compiles cleanly and then throws at run time. `+`, `-` and juxtaposition on `IntLiteral` already work (the "fixed half").
- **Where:** Compiled path only (walk not mentioned). Stubs in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:896-928` (at c124c6b65). The working operators go through `nativeHelpers/simpleIntLiteralArith.java`, reached via `NamingCzar.java:343`; their test is `IntLiteralArithRung7.test`.
- **Reproduce:** No reproducer and no test runs a stub. A worker would write a compiled test that applies one listed operator to two undeclared literals (e.g. `println(7 DIV 2)`) and see the exception at run time; the workaround (`x: ZZ32 = 7`, or `.asZZ32`) shows the expected result.
- **Status:** `NEGATIVE-VERIFIED` reads as "the gap is confirmed and open", so: build a fix, starting with an `XXX` reproducer. The row does not say how to fix: the model is the fixed half (a `nativeHelpers` method bound through `NamingCzar`), but `compiler.md` forbids adding declarations to or editing the prelude's text, and the prelude is deleted at the switch-over; whether this is worth fixing before the switch-over, or should wait for it, is not said.
- **Could not resolve:**
  - "21 operators": the list in the notes names 19 operators, and "(unary and binary)" may cover only `DOTMINUS`, only `BOXMINUS`/`DOTMINUS`, or all four boxed/dotted plus and minus forms; only one reading gives 21. Unclear wording.
  - "the overload blocks coercion to `ZZ32`": which overload is meant (the `IntLiteral` stub, I infer) is left to the reader. Unclear wording, inferable.
  - "one on two undeclared integer literals": "one" = one of these operators; "undeclared" = with no declared type. Terse wording, inferable.
  - `CompilerFailureDetectedAtRunTime`: not in the skill; read as the exception a stub throws. Concept lacking, inferable.
  - `NEGATIVE-VERIFIED`: the skill lists the word but defines it only in the row template, which a cold reader may not open. Concept lacking.
  - "siblings: 328": a related row, content unknown without the ledger. Fine as a pointer.
  - "ladder rung 7": provenance only; the skill names the ladder regression but not rungs. Harmless.

## Row 453

- **Defect:** On the compiled path the compiler prelude's range generators find the split point by first computing `lo+hi`, which overflows `ZZ32` when the bounds are large (or both very negative), so the loop raises `IntegerOverflow` before it yields anything; walk iterates correctly. Separately, the `#` range constructor (`lo # size`) computes `lo+sz-1`, which overflows for `MAX # 1`, and builds the empty range with `lo-1`, which overflows for `MIN # 0`.
- **Where:** Compiled path. `Library/CompilerLibrary.fss:361`, `:375`, `:385`, `:393`, `:402`, `:412` (the splits, marked "Danger of overflow here") and `:444` (`#`), at c124c6b65. Sequential (`seq`, via `countedseqloop`) and parallel forms both. Specification: `Specification/basic/expressions/ranges.tex`, "Ranges".
- **Reproduce:** `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss`, e.g. `seq(1073741824:1073741826)` raises under the compiled path, while walk counts 3 elements. The `#` cases are pinned by `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss`. Both are `XXX` tests, so green now means the defect is still present.
- **Status:** `NEGATIVE-VERIFIED`: confirmed and open, with two remedies named: rewrite the splits with the overflow-free `floorAverage` and `#` as `lo : (lo+(sz-1))` without `lo-1` for the empty range, or let the switch-over remove the prelude. Which to take is not said, and the first edits the prelude's text, which `compiler.md` ("The compiler's prelude, until the switch-over") tells a worker not to do. So a worker cannot tell whether to build the fix or leave the row for the switch-over.
- **Could not resolve:**
  - "split at the midpoint `z = lo+hi`": reads as if the midpoint were the sum; I infer `z` is the sum computed before halving. Unclear wording, inferable.
  - "`MAX # 1` and `MIN # 0`": `MAX`/`MIN` presumably the largest and smallest `ZZ32`; not stated. Unclear wording, inferable.
  - "`floorAverage` ... not exported for `ZZ32`": either it is not exported at all, or it is exported only for other types; and if not exported, whether the fix must export it (a prelude edit) is unclear. Unclear wording.
  - "so do ranges near the minimum and the parallel form": which generators of the six lines are the parallel form is not said. Minor.
  - "gated by": read as "pinned by an `XXX` test". Inferable.
  - `NEGATIVE-VERIFIED`: as for row 318, defined only in the row template. Concept lacking.
  - "climb batch 6b rung O": provenance only. Harmless.
