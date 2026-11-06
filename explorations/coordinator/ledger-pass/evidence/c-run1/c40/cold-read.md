# Cold read: c40 (rows 14, 177, 251, 405)

Read with CLAUDE.md, `.claude/skills/fortress-repo/SKILL.md` and `references/records.md` only. `records.md` lists the seven status words but says the row template, in the ledger, defines them; I read `NEGATIVE-VERIFIED` as "the failure was confirmed, the row is open".

## Row 14

- **Defect:** A numeral cannot use exponent notation. `1e-5` is rejected with a `Syntax Error`, because any letter in a numeral without a radix specifier is an error. The specification says so itself, so this is the language's design, not a bug.
- **Where:** The parser, shared by both paths (the row does not name a path; the shared parser implies both). The check is `validNumericLiteral` in `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1158-1160` (at c124c6b65). Specification: `basic/lexical-structure.tex`, "Numerals".
- **Reproduce:** Write `1e-5` in any program and run it; the parser reports the spec's sentence "a numeral contains letters and does not have a radix specifier". The probe `explorations/gap-ledger-probes/g06.fss` exists in the parent of `e879b6a44` (I take this to mean the probe was deleted by that commit and must be checked out from its parent).
- **Status:** Leave it. A design limit, confirmed; use the workaround `0.00001`.
- **Could not resolve:** "Found by: blinded" (who or what "blinded" is: unclear wording, harmless). The spec path `basic/lexical-structure.tex` has no root folder, unlike rows 177 and 251 (`Specification-1.0-frozen/appendices/...`): unclear which specification tree it is under.

## Row 177

- **Defect:** A mutable local variable cannot be declared without a type. `p := loadParams(…)` with no earlier declaration fails with `Variable p is not defined.`, and `var p = loadParams(…)` fails with `The type of p is required.` Only the second is a gap: the grammar allows `var p = e` untyped (`VarMayTypes`), but the syntax checker refuses it. The first is correct by the grammar, since `:=` needs `VarWTypes`.
- **Where:** The parser's syntax checker, `forLocalVarDeclOnly` in `ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:179-181` (at c124c6b65), shared by both paths. Specification: `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:1125-1128` and `:1135-1137`.
- **Reproduce:** Write `var p = e` for any expression `e` in a function body and run under walk: `The type of p is required.` Probe `explorations/run-c4/probes/types/E2` (and `E` for the `:=` half), in the parent of `11bf69c39`.
- **Status:** Build a fix for the `var … =` half (the syntax checker should accept an untyped `var` local and infer its type); leave the `:=` half. Workaround: `var p: T = e`.
- **Could not resolve:** "with the `null` prefix of row 166": I cannot tell what the null prefix is (a null field in the AST node? a modifier list?) without row 166; the row does not stand alone here (unclear wording). "the only annotation of Run C4's model that walk required (rows 176, 178, 131)": background, not needed to act. "full text: history, row 177": I read it as the row's earlier text in `explorations/fortress-gap-ledger-history.md`. "Class: implementation gap (parser)" with the cited code in the syntax checker: fine. Whether the compiled path also shows it is not stated; the shared parser implies yes, but the row does not say.

## Row 251

- **Defect:** A parameter list cannot destructure a tuple: `f(g, (a, b, c): (Any, Any, Any))` is a `Syntax Error`. The specification's grammar has no destructuring parameter (`PlainParam ::= BindId [IsType]`), so this is a design limit. A named tuple parameter destructured in the body works.
- **Where:** The parser, both paths. Specification: `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:712`, "Parameters".
- **Reproduce:** `explorations/apl/rung-5/v01_tuple.fss` keeps the failing form in a comment; uncomment it to get `v01_tuple.fss:25:24: Syntax Error` at the pattern's opening parenthesis. Probe output `explorations/apl/rung-5/v01_tuple.out.0`, in the parent of `1ee3b0bc5`.
- **Status:** Leave it. Workaround: `aplEach(f, t: (Any,Any,Any)) = do (a, b, c) = t; … end`.
- **Could not resolve:** "Found by: apl rung 5" (a batch name; harmless). It is unclear whether `v01_tuple.fss` itself still exists at HEAD or also only in the parent of `1ee3b0bc5` (the sentence gives the parent only for the probe's `.out.0`): unclear wording.

## Row 405

- **Defect:** A value parameter with no type annotation fails. On the compiled path it is always refused (`Missing parameter type for x`), for a function, a method, or a local function. Under walk, a top-level function or a method that implements nothing runs, but a method that implements an abstract declaration fails at its first call with an `InterpreterBug`, "... has neither body nor def instanceof Method", generic or not. So the specification's own `Cons` example fails on both paths.
- **Where:** Compiled: the static checker, `scala_src/typechecker/staticenv/STypeEnv.scala:200` (at d4d454f9d), and `:72-75` for a local function. Walk: the interpreter's method dispatch (no file given). Example: `SpecData/examples/basic/Object.Decl.Cons.fss`, whose `cons(x)` and `append(xs)` are untyped.
- **Reproduce:** Run `SpecData/examples/basic/Object.Decl.Cons.fss` under walk (the `InterpreterBug`) and compile it (`Missing parameter type for x`). Or write a trait with an abstract method and an object that implements it with an untyped parameter, and call it.
- **Status:** Build a fix: two fixes, one per path (the skill says a fix on one path does not reach the other). Workaround: type the parameters; then both paths print the answer. The row says the specification is silent, but Appendix I covers the case, so it is unclear what the fix must do (infer the type? accept it as `Any`?).
- **Could not resolve:** "Specification: silent" against "Appendix I's entry on a left-out parameter type states it": contradictory or two-way (does Appendix I state the compiled error, or the rule? which document's Appendix I?), unclear wording. "Appendix I" itself: not in the skill. "siblings: 652": a related row, not given here. "climb batch 5 rung S, its skeptic": batch provenance, harmless. "probe and full text: history, row 405": the probe's path is only in the history file, so the row has no probe a worker can find without reading the history. Walk's failing file is not cited. `scala_src/...` path has no prefix; I read it under `ProjectFortress/src/com/sun/fortress/`, as the skill states for its own paths.
