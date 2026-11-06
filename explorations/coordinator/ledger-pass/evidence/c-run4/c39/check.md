# Check of chunk c39, run c-run4, base c124c6b65

mech.py: `MECH: 3 lines, 0 failing, every check passes.` Counts: 10 pass, 2 fail (rows 84, 66).

## Row 1: rewrite, pass
- Fidelity: at the base `Evaluator.java:1181` is `return evalAndInvokeMethod(front, opString, sub.getExprs(), loc);` in the `SubscriptingMI` branch of `mathItemApplication`; `:1064` calls `evalInvocationArgs(args)`; `:1380-1381` is `evalInvocationArgs` with `exprs.subList(1, exprs.size())`. Probe `git show e879b6a44^:explorations/gap-ledger-probes/g02.fss` holds `m[3,7]^2` beside `(m[7])^2`. `AplCore.fss:1859` reads `rk = rs[k]`.
- Nothing lost: `Evaluator.java`, `Evaluator.java:1052`, `:1251-1252` are re-pinned (false at the base: :1052 is a unification error); `rs[k][j]`, `Array[\Array[\RR64,ZZ32\],ZZ32\]` are the site's old form, home the history (and `AplCore.fss:1859` now cited).
- Present, reproducer (`none`, probe pinned), status, form: pass.
- Cold read: matches. Its "compiled path not stated" is not a failure: the class says `(walk)` and the mechanism is walk's evaluator; no evidence of the compiled path exists to state. (Advisory: a later question could run g02 compiled.)

## Row 8: keep, pass
Probes pinned to the parent of `e879b6a44`; no commit touches the row; `Keyword.rats` at the base lists `value`, `at`, `type`, `unit`, `of`, `most`, `label`.

## Row 9: keep, pass
No commit touches it; all probes explained by the history (`c17_bar_continuation.fss` went in `ed6dafb52`, found by `git log --diff-filter=D`, as the assessment says).

## Row 12: keep, pass
## Row 15: keep, pass
## Row 86: keep, pass
## Row 88: keep, pass
## Row 91: keep, pass
## Row 262: keep, pass
`Keyword.rats:48` at the base holds `"wrapped"`, `:30` `"at"`; the "moved" signal is the word `rows`, a false lead.
## Row 62: keep, pass

## Row 84: rewrite, FAIL (fidelity; cold read)
- Passage (claim): "a superscript or postfix operator may not follow a dotted access".
- Source: `git show 22ea0cd90^:explorations/run-b2/probes/g4a_postfix2.fss` declares `opr (A: Mat)! : Mat` and evaluates `x = B.data!`; its `g4a_postfix2.out` prints `101`. A postfix `!` after a dotted access works; only `^`-forms fail (`g4a_expop2`: `B.data^*` → `Syntax Error` at 12:14; `g4a_num`: `B.n^2` → `Syntax Error`). The cold reader flagged the same ("whether a true postfix operator also fails is not shown").
- Correction (exact):
  - claim: replace "a superscript or postfix operator may not follow" with "a superscript or an exponent operator may not follow", and replace "give a bare `Syntax Error` at the `^`" with "give a bare `Syntax Error` at the `^`; a postfix `!` there works (`B.data!`)".
  - notes: replace "and five beside it (`g4a_base`, `g4a_getter`, `g4a_call`, `g4a_num`, `g4a_expop2`)" with "and six beside it (`g4a_base`, `g4a_getter`, `g4a_call`, `g4a_num`, `g4a_expop2`, `g4a_postfix2`)".
  - Lengths after: row 1190 of 1,200, claim 234 of 300, notes 693 of 700.
- Otherwise pass: `ProjectFortress/src/com/sun/fortress/parser/Expression.rats` at the base holds `PrimaryItem = (LeftAssociatedPrimary / MathPrimary)` at :384-386, `LeftAssociatedPrimary` from :388 with no `MathItem`, `MathPrimary = PrimaryFront MathItem*` at :463-465, `Exponentiation` at :651-656; spec lines unchanged. Dropped tokens (`Expression.rats`, `:384-386`, the probe `.fss` names) are kept with the full path and the names.

## Row 66: rewrite, FAIL (cold read)
- Passage (notes): "Rendered as the spec says: `w17` → `w_{17}`, `x_{17}`, `\VAR{ab}_2`; `\TYP{Fred17}` by rule (b); `_Wq` bold."
- Source: `git show e879b6a44^:explorations/gap-ledger-probes/g28.tic` renders `x17` and `ab2`, and `g28.tex` holds `x_{17}`, `\VAR{ab}_2`, `\TYP{Fred17}`; `g13.tex` holds `w_{17}`. The cold reader could not tell inputs from outputs for `x_{17}`, `\VAR{ab}_2` and `_Wq`.
- Correction (exact): replace that sentence with "Rendered as the spec says: `w17` → `w_{17}`, `x17` → `x_{17}`, `ab2` → `\VAR{ab}_2`, `Fred17` → `\TYP{Fred17}` by rule (b), `_Wq` → bold." (about +25 characters; row stays under 1,110).
- Otherwise pass: `Fortify/fortify.el:881-884` at the base holds `(>= (length basename) 2)` with `;; Case (b)`, `:885-894` case (c); `rendering.tex:43-47` says "more than two characters", `:58-66` renders `M1` as `M_{1}`. Dropped `:885-894` now has its file; "the ML literature's register" goes to the history.

## Closes, duplicates, questions, pairs
None in this chunk (closes.txt, dups.txt, pairs.txt empty; questions.md: no measurement).
