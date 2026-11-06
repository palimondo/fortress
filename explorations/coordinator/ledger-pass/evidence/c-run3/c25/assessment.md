# c25 assessment

Base c124c6b65. Marks: scope / present meaning / evidence / comprehension / ownership / consistency. No row of the chunk has a reproducer run in its evidence (all `none` or a non-program), and no FACTS or POSITIONS line names any of them.

## Row 83 (CONTESTED): measure
- scope pass; present meaning pass (the claim is untested, as stated); evidence fail: "Run C's `explorations/run-c/probes/api/` pair" is not in the tree and the row does not say where to read it (deleted in 4ebf80aec); comprehension pass; ownership pass; consistency pass.
- Only a run can settle it, and the row itself names the run it needs. Question in questions.md. Status stays CONTESTED.

## Row 77: measure
- scope, comprehension, ownership, consistency pass. present meaning unknown: the compiled checker's reading of self types, where clauses and comprises clauses changed after the row (1c32ccffd, 64fa505c4, 396e4ed8d, 24db899fa), and the probe was never re-run. evidence fail: "Probe `explorations/compiler-probes/p20.fss` ... no longer in the tree" gives no commit (it is in the parent of c69cb2064).
- Beyond the evidence: read p20.fss from history; `git log --grep=comprises` since the row.

## Row 78: measure
- As row 77; probe p10.fss, in the parent of c69cb2064. "only a run can tell".

## Row 4: keep
- All six pass. The spec's sentence at juxtameaning.tex:156-162 is unchanged; the probe is located by commit; siblings 144 named. The mechanism is the specification's rule, cited.

## Row 7: rewrite
- present meaning fail: the claim "an all-uppercase word with ≥2 distinct letters" states the spec's rule, while the notes and row 193 say the parser's rule is looser (`AAA` is an operator; NodeUtil.java:1466-1485 read at the base). comprehension fail: "apl gaps row 78, merged here" reads as ledger row 78 (the overlap script took it so), a merge story. evidence fail: "`explorations/apl/rung-5/v06_caps.fss`, its `.out.0`": the file holds only the working half; the `.out.0` was deleted in 1ee3b0bc5.
- New claim states the parser's rule (from row 193's recorded eleven-name run and validOp at the base); the `.out.0` located by commit. Dropped: "apl gaps row 78, merged here" (history keeps it; the old APL ledger row is a story, not a fact a worker needs).

## Row 85: keep
- All six pass: design limit by the cited reassociation rule, workaround with its output, probes located by commit (ed6dafb52; the (3a) workaround probe is in the same folder).

## Row 133: rewrite
- evidence fail: `Parameter.rats:141-142`, `:171-172`, `Symbol.rats:104-106` are bare and resolve to the specification's copies (69 lines); the parser's files at the base hold them exactly (`ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:141` `(Op / ExponentOp /`, `:171` `(Op / ExponentOp` with no slash; `Symbol.rats:104-106` `exponentOp`). `UseTr5.fss`, `UseTr4.fss`, `Tr1.fsi` bare and gone: they are under explorations/run-c3/probes/g156_api_postfix/, deleted in a0a0c7c99.
- Others pass. Dropped: the probe file names (`UseTr5.fss`, `UseTr4.fss`, `Tr1.fsi:3:1`): home is the history and the probe folder, now named with its commit; "the specification have (Op | ExponentOp | ^)" shortened to "the spec's alternation" (the spec cell cites it).

## Row 144: rewrite
- evidence fail: no mechanism with a pinned line; the quoted message "the argument should not be ..." differs from the text at the base, `Evaluator.java:1325-1326` "a function argument should not be immediately followed by a non-expression element." (unchanged since 5a68404fd, 2012, so the code prints it). Others pass.
- New notes pin Evaluator.java:969-971 (postfix branch) and :1322-1326 (the error). Nothing dropped.

## Row 158: rewrite
- evidence fail: seven bare probe names (`q04f_callsuper.fss`, `lift_g4b.fss`, ...) and no pinned mechanism; "the parentheses are not seen" unanchored. Read at the base: forOpExpr's postfix branch tests `arg instanceof Juxt && isTight()` with no parenthesis test (Evaluator.java:969-971), then forTightJuxt refuses it (:1322-1326).
- Dropped: the three error spans (`q04f_callsuper.fss:18:48-59`, `q04a_varargs.fss:35:45-56`, `lift_g4.fss:11:11-22`) and the full message (it is row 144's, which the new 144 quotes); home: history, row 158, and row 144. Also dropped: the bind-first spelling `oh = onehot(…)` then `(oh^T) dX` (row 144 holds it; 158 now points to `lift_g4b` beside its probe) and `lift_g4b.fss` as a separate path.

## Row 193: rewrite
- evidence fail: `Symbol.rats:108-116` is bare (resolves to the spec's copy) and at the parser's file those lines are the comment; `OpName` is at `parser/Symbol.rats:117-118`; `NodeUtil.java:1460-1477` begins in another method; validOp is at :1466-1485. `p12_g.fsi:20:7` and `p12_name.out.0` lack a location; deleted in 1ee3b0bc5. Spec cell carries a paraphrase in parentheses; it moved into the claim, which already holds it.
- Dropped: `p12_g.fsi:20:7` (history).

## Row 257: rewrite
- evidence fail: `x01_names.out.0` bare; `X01Syn.fsi` gone without commit (1ee3b0bc5); `AplSyntax.fsi` cited without the line (now :610-617). comprehension: "The names hold:" opens the notes with the positive half before the mechanism; reordered. Status beside `silent` kept (item 265); silent.txt: choice.

## Row 286: rewrite
- evidence fail: the reproducer `explorations/apl/mg/AplMgSyntax.fsi:234` holds the workaround (`pow(1.0 (l), (r))`), not the failing template, so it does not reproduce the claim; now `none`, with how to make it fail in the notes. `model_run.out`, `.out.1` gone (1ee3b0bc5). No pinned site for the translator is known; the gap stays unpinned (not found by this reading). Status beside `silent` kept; silent.txt: defect.

## Duplicates and pairs
- 4/144/158 share the spec sentence but differ (subscript, superscript, parenthesised): siblings, named. 7/193 and 193/257: siblings. 257/250 (c43): siblings, already named. No pairs for the reconcile run.

## mech.py
Last line: `MECH: 7 lines, 0 failing, every check passes.` Its token list for row 7 names `row 78` (the old APL ledger's row, dropped on purpose); for 133 the probe file names and bare `Symbol.rats`/`Parameter.rats` spellings, replaced by full paths and the probe folder.
