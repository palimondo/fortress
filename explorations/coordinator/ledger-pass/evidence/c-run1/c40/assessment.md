# c40 assessment (run c-run1, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. The original tree has no change between the base and HEAD (`git diff --stat c124c6b65 HEAD -- ProjectFortress Library Specification` is empty), so lines read in the tree are the base's.

## 14 - rewrite
- scope pass; present meaning pass; evidence pass (probe's old path in the notes; the error text is the spec's sentence); comprehension pass; ownership pass; consistency pass.
- Fails the ledger check "the notes hold the mechanism with a pinned line": the notes give only the error text, "Error text is the spec's own sentence: ...".
- Read beyond the evidence: `grep` of the message, `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1152-1162` (`validNumericLiteral`).
- Change: the claim names the `Syntax Error`; the notes pin `NodeUtil.java:1158-1160` and add a workaround (a plain decimal numeral). Nothing dropped.

## 63 - keep
- All six pass. The probe's old path is in the notes; the workaround (spaced `opr ^ (`) and the sibling row 64 are there. Fortify is a tool, not a code path the base changed (no commit touched the cited lines).

## 89 - keep
- All six pass. The mechanism is pinned (`Resolver.java:598-601`, unchanged since the row's commit), workarounds for both pairs (`-`/`AND` and `MOD`/`+`), probe's old path. The cited spec lines 162-169 state the non-transitive precedence.

## 90 - keep
- All six pass for a `NEGATIVE-BOUNDED` row: it names the two spellings tried. "Same family as row 63" is a loose link (63 is Fortify, this is the lexer's `!:` token), not wrong: both are whitespace traps beside an operator in an `opr` declaration. Left as is.

## 143 - keep
- All six pass. The grammar lines (frozen 916-919) still read `AssignLeft ::= SubscriptExpr | FieldSelection | QualifiedName`; the probes' old paths are in history at the parent of `4ebf80aec`.

## 166 - keep
- All six pass. The grammar lines hold (`NamedFnHeaderFront` at frozen 402-403; `OpHeaderFront` at 721-731). The overlap with row 133 (outside this run) is a different defect (an exponent postfix operator in an API), so no pair.

## 177 - rewrite
- scope pass; present meaning pass; evidence pass; comprehension partial; ownership pass; consistency pass.
- Fails "mechanism with a pinned line": the notes cite only the model's error positions (`null…/MicroGptFlat.fss:88:9`, `MicroGptFlat.fss:88:5-7`); `MicroGptFlat.fss` is ambiguous among three run folders. The notes run at 1,178 characters, at the limit.
- Read beyond the evidence: `ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:176-189` (`forLocalVarDeclOnly`: `if (that.getRhs().isNone() || lvb.isMutable())` then `if (lvb.getIdType().isNone())` logs `The type of ... is required.`).
- Change: pin `SyntaxChecker.java:179-181`; add the workaround `var p: T = e`; cut the error positions and the probe `G` citation.
- Dropped, with home: the exact error lines `MicroGptFlat.fss:88:9` / `:88:5-7` and the variables `m`, `v` (history, row 177, which keeps the old line whole); the probe `explorations/run-c4/probes/types/G` showing every other annotation removable (history, row 177); the mention of row 21 (FIXED; its link stays in history).

## 200 - measure
- scope pass; present meaning fail; evidence partial; comprehension pass; ownership pass; consistency fail.
- The claim "a string literal has **no `\u` escape** ... so a glyph has to stand in the source" and the class `design limit` say the specification gives no code-point escape. `Specification/basic/lexical-structure.tex`, "String Literals" (966-1000), specifies restricted-word escapes and quoted-character escapes, `"\'beta'"` being β, and a character literal may be hex digits (`'001C'`, lines 863-865); so `"\'03B2'"` is the specification's code-point escape. `Literal.rats:175-176` refuses any backslash `EscapeSequence` does not take, which suggests both kinds are refused, but no run shows it. The claim also carries a working half ("which works, the sources being read as UTF-8"), and the note "The probe ran on the retired first library" is provenance, not mechanism.
- A changed claim would rest on what the parser does, so it goes to the prober: `questions.md`, row 200, gives the program and the line each outcome yields.

## 217 - keep
- All six pass. The evidence's run of the reproducer under walk at the base prints `Unmatched delimiter "component"` and `Unbalanced comment: '*)' is expected.`, the claim's messages; workaround in the notes.

## 251 - rewrite
- scope pass; present meaning pass; evidence pass; comprehension pass; ownership pass; consistency fail.
- The class `implementation gap (parser)` contradicts the row's own spec cell: "the specification has no destructuring parameter". The frozen grammar (`Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:712`, under "Parameters", line 688) has `PlainParam ::= BindId [IsType]`, so the refusal is the specification's: `design limit (parser)`, as rows 143 and 166 are filed. The spec cell cited a chapter heading, "Names and Declarations", where the grammar line settles it.
- Read beyond the evidence: frozen `concrete-syntax.tex:688-719`; `explorations/apl/rung-5/v01_tuple.fss:15-40`.
- Change: class; spec citation to the grammar line; notes say the in-tree file keeps the form in a comment. Dropped: `v01_tuple.out` holds the working spelling's output (the file is gone; history, row 251, keeps it).

## 405 - rewrite
- scope pass; present meaning pass; evidence pass (compiled lines `STypeEnv.scala:200` and `:72-75` unchanged since the pin d4d454f9d); comprehension pass; ownership pass; consistency partial.
- Row 652 names 405 in `siblings:` and both refusals are at `STypeEnv.scala:200` (`Missing parameter type for ...`), but 405 does not name 652. Change: `siblings: 652.` first in the notes; nothing else.
- FACTS.md:114 agrees with the row (compiled refused everywhere; walk only when the method implements an abstract declaration).
- Refused notes: batch 11's (local function refused where bound) is already in the line (`:72-75`); batch 12's (`MinReduction`/`MaxReduction` `simpleJoin(a, b)`, harmless while the abstract took `Any`) is a library instance, not the mechanism; it stays in `explorations/compile-ladder/climb-batch-12/RECORD.md:156`.
- `NEGATIVE-VERIFIED` beside `silent`: status kept; `silent.txt` says defect.

## 652 - keep
- All six pass. The reproducer is an `XXX` compiled test, `XXXKeywordParamOmitted.test`, asserting the claim's message; the cited `STypeEnv.scala:199-200` is unchanged, and the one commit since the row that touched `functions.tex` (efd6bb2f2) changed lines 439-445 only, not the cited 171-172. Walk's half has no test in the tree; its message is in the notes. FACTS has no entry naming it.

## Files
- rows.rewrite: 14, 177, 251, 405 (`ledger.py check --rows`: 0 fail).
- questions.md: 200.
- silent.txt: 405.
- closes.txt, dups.txt, pairs.txt: empty.
