# c25 judgement, base c124c6b65

Applied: 9 (rewrites 7, 133, 144, 158, 193, 257, 286; keeps 4, 85). Held: 3 (77, 78, 83). Duplicates, closes, pairs: none. `mech.py --final`: `MECH: 7 lines, 0 failing, every check passes.` No prober ran for this chunk (no `runs.md`), so the three measure rows have no run.

## Row 83 (CONTESTED, measure): hold
The check passes the question, but no prober ran it, and only its run can settle the row. Keeps its line; queue.md carries the question with the row's present line as default. The path fix ("in the parent of `4ebf80aec`") waits with it, since the brief applies only the check's lines and this row had none.

## Row 77 (measure): hold
As 83: question passed by the check (program byte for byte `c69cb2064^:explorations/compiler-probes/p20.fss`), never run. Keeps its line; queue.md.

## Row 78 (measure): hold
As 77, program `c69cb2064^:explorations/compiler-probes/p10.fss`. Keeps its line; queue.md.

## Row 4 (keep): apply (unchanged)
Check passes. Its note, not a failure: walk's text (`Evaluator.java:1132-1135`, `stepTwo`) is near the spec's sentence, not verbatim ("should not be" for "is"); left for a later pass, since the check did not vet a rewrite.

## Row 85 (keep): apply (unchanged)
Check passes.

## Row 7 (rewrite): apply, corrected
Correction (check 1): claim restored to the spec's rule, "an all-uppercase word with at least two different letters (`BOS`, `GPT`, `BLK`) is an **operator word** by the specification, not an identifier", so the row stays the design limit and row 193 keeps the parser's looser test; notes as written (they already say the parser's test is looser). Dropping "apl gaps row 78" upheld.

## Row 133 (rewrite): apply, corrected
Corrections (check 1): the API rule now "`(Op / ExponentOp caret …)`, no `/` before `caret`"; `^T^` now "`opr (m: …)^T^` (an `ExponentOp` then a caret) parses and is refused later". To fit 700 characters of notes: "The component rule has" to "The component rule:", the column-1 sentence moved beside the syntax error it locates, and the clause on the comments at `Parameter.rats:115`, `:159` dropped (home: the history and the spec cell, which cites the alternation).

## Row 144 (rewrite): apply, corrected
Corrections (check 1, verified at the base: `Evaluator.java:1132-1135` in `stepTwo` from `:1111` holds "the argument should not be ..."; `:1324-1326` holds "a function argument ..."): message restored to `Syntax Error: the argument should not be immediately followed by a non-expression element.`; mechanism now "walk's reassociation of the call and the superscript refuses it (`…/Evaluator.java:1132-1135`, `stepTwo`), as for row 4".

## Row 158 (rewrite): apply, corrected
Corrections: (1) claim "is refused like row 144's call-then-postfix"; notes open with its own message, `Syntax Error: a function argument should not be immediately followed by a non-expression element.`, its span on the call; (2) `Evaluator.java:969-971` to `:970-971` (verified: `:970` is the Juxt branch); (3) "case (3)", "case (5)". Bind-first named as "probe `lift_g4b`" (a bare `lift_g4b.fss` fails `mech.py` as an unresolved citation, and the full path did not fit 1,200); the second probe given its full path for the same reason. To fit: "tests only for" to "tests for", "not the parentheses" dropped (the span on the call stays), "walk refuses" folded into "is refused".

## Row 193 (rewrite): apply
Check passes. Its optional addition (`p12a_oprword.out`) not made: the notes have 10 characters left.

## Row 257 (rewrite): apply, corrected
Corrections: (1) class `design limit (parser)`, with silent.txt's `choice` upheld (`Syntax.rats:395-398` lists `_` among SpecialChars with a backtick escape; the order is PEG ordered choice); status `NEGATIVE-VERIFIED` kept, item 265; (2) "closed-set name" defined in the claim, "(spelled one character class per letter, ended by `NOT [A:Za:z0:9]`, `AplSyntax.fsi:610-617`)", and "the `NOT` terminator" to "the `NOT` predicate".

## Row 286 (rewrite): apply, corrected
Corrections: (1) the run command added, "and run `explorations/apl/mg/MicroGptApl.fss`" (walk, the default command of `bin/fortress`), and the checks told apart: "`explorations/apl/mg/checks/model_run.out.1` (the caret), `explorations/apl/mg/checks/model_run.out` (through `pow`)" (full path: a bare `model_run.out` fails `mech.py`); (2) "the exponent and postfix-operator character". To fit: "Workaround, exact: call" to "Workaround: a glue function", the glue function's signature to "`pow` (`explorations/apl/mg/AplMg.fss:37`, `b^e`)", "came out" to "was", "which moved" to "moving", and "Rule for a sub-language: no host caret in a template." dropped (it restates the workaround; home: history).

## Silent, duplicates, pairs
final.silent: silent.txt as written (257 `choice`, now consistent with its class; 286 `defect`). No duplicates or closes. No pairs: 4/144/158, 7/193 and 193/257 are siblings, as the check agrees.
