# Assessment, chunk c2 (rows 318, 453), base c124c6b65

## Row 318: rewrite

- scope: pass. One defect: `IntLiteral` operators stubbed on the compiled path.
- present meaning: fail. The claim reads "declares arithmetic operators whose bodies throw", while four of them (`-` unary, `+`, `-`, `juxtaposition`) have native bodies at `CompilerBuiltin.fss:897`, `:900`, `:903`, `:918`.
- evidence: fail. The reproducer `IntLiteralArithRung7.test` is a plain test that asserts the fixed half ("run_out_WIcontains=PASS" over `+`, `-`, unary `-`, juxtaposition); it does not reproduce the claim. REPORT.md 5.5 item 4.
- comprehension: fail. "Fixed for `opr -(self)`, `+`, `-` and `juxtaposition` by 2027f519b ... as the prelude has no way in" is a repair story; the reader must subtract the fixed half from the claim.
- ownership: pass (ladder rung 7).
- consistency: pass. No FACTS or POSITIONS line names it. Row 19, named as "walk's side", is FIXED.

Evidence read beyond the file: `CompilerBuiltin.fss:880-930` at the base (21 stub bodies, counted), `:341-344` (the `jIntLiteral*` imports), the test file, the diff of the prelude since 052a7c3fe (one unrelated line at :1170).

New line: the claim names the stubbed operators; reproducer `none` (no test runs a stub; the stub bodies are the evidence; the run that showed the mechanism was rung 7's before-run for the four now fixed); notes keep the stub list pinned at c124c6b65, the fixed half and its test, the native route, and add the workaround and `siblings: 328` (`IntLiteral` comparison at `ZZ64`, same trait).

Dropped facts and their homes: the method name `NamingCzar.fortressTypeForForeignJavaType` (the line `NamingCzar.java:343` stays): history, row 318. "by 2027f519b" (the fix commit) and the reason the route was needed ("the prelude has no way in"): history, row 318. "Row 19 is walk's side": row 19 is FIXED; history, row 318. The claim's "or `ZZ64`" was cut for length; the coercion mechanism is unchanged and the old line keeps it in the history. Status kept `NEGATIVE-VERIFIED` beside `silent` (review-queue item 265); `silent.txt` says defect.

## Row 453: rewrite

- scope: pass.
- present meaning: pass. The midpoint splits and `#` are unchanged at the base (`Library/CompilerLibrary.fss:361-444`); no commit since the row touches them (031c38bbc, 108ab82d6 touch other parts of the cited files).
- evidence: pass. `XXXSeqMidpointRungO` stays an `XXX` test; its source still loops `seq(1073741824:1073741826)`.
- comprehension: fail. Every line citation is pinned "At 052a7c3fe" and has moved by -2 at the base (`:363` is now `do`, `:446` is now `trait ReductionString`).
- ownership: fail. "climb batch 6b rung O's skeptic" names a role.
- consistency: fail (mild). "siblings: 450, 451": both are FIXED; FACTS.md:188 agrees with the row.

Evidence read beyond the file: `Library/CompilerLibrary.fss:355-446` at the base; the two `XXX` tests and their `.test` files; `floorAverage` declarations in `CompilerBuiltin.fsi` (not for `ZZ32`, which holds).

New line: citations re-pinned at c124c6b65 (`:361`, `:375`, `:385`, `:393`, `:402`, `:412`, `#` at `:444`; the raise cited at the split `:375` in `countedseqloop`); found-by without the role; the closed siblings dropped.

Dropped facts and their homes: "siblings: 450, 451" (walk's halves, both FIXED): rows 450 and 451 and history, row 453; walk's correct count stays in the notes.

## Pairs

None. Row 318's overlaps (328, 348, 360, 429, 529, 797, 895) are different defects; 328 is named as a sibling. Row 453's (381, 441, 523) share only the `CompilerBuiltin.fss:746` neighbourhood.
