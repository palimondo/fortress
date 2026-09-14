<!-- Run B2 (explorations/run-b2/), 2026-09-09: final report of the gate-4 replication worker on two syntax claims: a superscript after a dotted field access (g4a) and object-expression field collisions (g4b), recovered verbatim; model as the transcript states it: opus.
     Recovered from /root/.claude/projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/subagents/agent-a34b9059ad70f9c62.jsonl (last assistant text block). -->

Both claims replicated, both mechanisms located in source, and both have a working spelling.

**CLAIM 1 — NEGATIVE-VERIFIED (implementation gap in the parser), with a working spelling found.**

`B.data^T` → `g4a_base.fss:12:13: Syntax Error` (error column is the `^`). Control `(B.data)^T` → `101` (`g4a_paren`).

Grammatical per spec: `concrete-syntax.tex:948-953` gives both `Primary ::= Primary . Id` and `Primary ::= Primary ExponentOp`, and `juxtameaning.tex:139-141` ("A tight juxtaposition is always left-associated if it contains any dot") assigns it exactly the meaning `(B.data)^T`. `precedence.tex:44-51` puts subscript/superscript above everything. So the spec admits it; the parser does not.

Mechanism, parser not evaluator: `Expression.rats:384` `PrimaryItem ::= LeftAssociatedPrimary / MathPrimary` (ordered). Anything containing a dot is taken by `LeftAssociatedPrimary` (`:392-433`), whose productions and whose `FieldSelectionSelector` (`:592-601`) admit only `Subscripting*` and `ParenthesisDelimited*` after the dot. `Exponentiation` exists only as a `MathItem` (`:612-614`, `:655-668`) on the `MathPrimary` path, which the dot never reaches. Hence `^` is left unconsumed.

Extent (all reproduced): `B.data^T`, `B.data^2` (`g4a_num:9:15`), `B.f()^T` (`g4a_call:13:12`), `self.data^T` (`g4a_selfdot:8:24`), `B .data^T` (`g4a_spacedot:12:9`), `B.data^*` (`g4a_expop2:12:14`) — all `Syntax Error`. A getter changes nothing (`g4a_getter:13:13`). Subscript after a field **does** work: `B.data[5]` → `15` (`g4a_sub`) — distinct from ledger rows 1-3, which are chains *after* a subscript. Postfix `!` after a field parses (`g4a_fact`: `Operator postfix ! is not defined.` — an evaluator message, not a parse one). Functional method hits the spec's own static error (ledger row 4): `dat(B)^T` → `Syntax Error: the argument should not be immediately followed by a non-expression element.` (`g4a_funcmeth:13:11`).

Smallest working spelling: declare a **plain postfix operator** instead of a superscripted one. Plain postfix is resolved at the `TightInfixPostfix`/OpExpr layer (`Expression.rats:315-321`), above `Primary`, so it applies to a dotted expression freely. `opr (A: Mat)† : Mat = …` then `B.data†` → `101` (`g4a_dagger`); same with `!` (`g4a_postfix2`). Note the space before `:` — `)!:` lexes as one operator token and yields `Invalid top-level declaration.` (`g4a_postfix`). Second working spelling: unqualified `data^T` inside the object's own method (`g4a_inmethod` → `101`).

**CLAIM 2 — NEGATIVE-VERIFIED (interpreter defect, contra spec), with a working substitute.**

Reproduced: `g4b_two_same.fss:13:5-7: Top-level variable data is already declared.`

Spec settles it: `basic/expressions/object.tex:68-73` — a field of an object expression *shadows* a same-named declaration in an enclosing block. Object-expression fields must not enter the enclosing scope at all. Proof of the leak: `g4b_pollute` declares one object expression with field `data` and then a genuine top-level `data: ZZ32 = 77`, which is rejected at `12:1-3` with the same message.

Mechanism: `ExprDisambiguator.scala:308` `case SVarDecl(…) if (!inTraitOrObject)` calls `checkForShadowingTopVariable` and does `topVars += name.getText`. `inTraitOrObject` is set only by `forTraitDecl` (`:106`) and `forObjectDecl` (`:190`); the `SObjectExpr` case (`:329-345`) never sets it, so object-expression fields register in the component's global `topVars`.

Answers: unique field names work (`g4b_unique` → `5 / 6`); one object expression with a field works (`g4b_one` → `5`); methods-only object expressions work.

Capture works and is the substitute: `g4b_capture2` (object expression as a function's RHS, `getter data(): ZZ32 = k` capturing the parameter) → `5 6 / 15 17`. Sanctioned by `object.tex:63-65`.

Second, independent defect found: inside a `do` block, `getter`/`setter` modifiers in an object expression are rejected — `g4b_capture.fss:12:5-27: getter cannot modify a local function, data`. Cause: `SyntaxChecker.java:170-173` `forObjectExpr` sets `inObject` but never clears `inBlock` (set at `:341`), so `:285` treats the methods as local function declarations. Workaround: a plain method instead of a getter — `g4b_methodonly` → `6 / 105`.

Files: `/home/user/fortress/explorations/run-b2/probes/g4a_*.{fss,out}`, `g4b_*.{fss,out}` (23 probes, every `.out` kept). Nothing else in the repo touched.
