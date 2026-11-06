# c30 judgement (base c124c6b65)

No prober ran for this chunk (no prober folder in c-run2 holds rows 23 or 393), so the two measures are held.

- Row 23: hold. Disposition measure; the check passes the question, but no run answers it. Present line kept; question in queue.md.
- Row 27: apply rewrite. Check passes (`OtherDecl.rats:75-83` holds the claim and mechanism).
- Row 153: apply duplicate of 387, no text. Check passes: one site, `Simple_fcn.java:45`, reached through `FunctionClosure` < `NonPrimitive` < `Simple_fcn`; 387's new line carries the `fill` case and workaround.
- Row 387: apply rewrite. Check passes.
- Row 393: hold. Disposition measure; no run. Present line kept; question in queue.md.
- Row 408: keep, check passes. No line to apply; the row keeps its present line.
- Row 486: apply rewrite. Check passes.
- Row 509: apply rewrite with the check's correction. Correction made: "takes the plain arm and walk the generic one" replaced by "takes the plain `op(a: Any, b: Any)` and walk the generic `op[\T extends Number\]`", from `git show 84aef6a4f^:explorations/reviews/option-2-soundness/O2Wide.fss` lines 5-6 (checked).
- Row 527: apply rewrite. Check passes.
- Row 575: apply rewrite with the check's correction, status CONTESTED kept. Correction made: "the choice is the curator's (P-75)" replaced by "P-75 leaves the way to the curator", from POSITIONS.md:83 ("the choice of a way is not a worker's"; checked).
- Row 683: apply rewrite, status CONTESTED kept (no POSITIONS entry settles it). Check passes.
- Row 767: apply rewrite. Check passes.

Silent (item 265): 509 `choice`, 527 `defect`, as silent.txt; the check upholds both statuses beside `silent`.
Pairs: none. Closes: none.
XXX tests believed to pass: none (questions.md, last section).
