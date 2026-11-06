# Judgement of chunk c39, run c-run4, base c124c6b65

12 rows: 12 applied (3 rewrites, 9 keeps), 0 held. No closes, duplicates, silent lines or pairs in this chunk; `final.dups`, `final.closes`, `final.silent` and `final.pairs` are empty.

- **Row 1: apply (rewrite).** The check passes it: `Evaluator.java:1181`, `:1064`, `:1380-1381` hold the mechanism at the base, the probe `g02.fss` is pinned to the parent of `e879b6a44`, `AplCore.fss:1859` reads `rk = rs[k]`. Line as written.
- **Row 8: apply (keep).** Check passes; probes pinned to the parent of `e879b6a44`, `Keyword.rats` unchanged.
- **Row 9: apply (keep).** Check passes; `c17_bar_continuation.fss` found by `git log --diff-filter=D` (`ed6dafb52`).
- **Row 12: apply (keep).** Check passes.
- **Row 15: apply (keep).** Check passes.
- **Row 84: apply (rewrite, corrected).** The check fails the claim's "postfix operator": `git show 22ea0cd90^:explorations/run-b2/probes/g4a_postfix2.fss` evaluates `B.data!` and its `.out` prints `101`, so a postfix `!` after a dotted access works. Corrections made: claim "a superscript or postfix operator may not follow" became "a superscript may not follow" (the check's "or an exponent operator" dropped, since `^2`, `^T` and `^*` are all superscripts); "; a postfix `!` there works (`B.data!`)" added after "at the `^`"; notes "five beside it (...)" became "six beside it (..., `g4a_postfix2`)". 1,166 characters.
- **Row 86: apply (keep).** Check passes.
- **Row 88: apply (keep).** Check passes.
- **Row 91: apply (keep).** Check passes.
- **Row 262: apply (keep).** Check passes; the "moved" signal is the word `rows`, a false lead; `Keyword.rats:48` and `:30` hold `wrapped` and `at`.
- **Row 62: apply (keep).** Check passes.
- **Row 66: apply (rewrite, corrected).** The check fails the sentence that mixed inputs and outputs. Correction made exactly as the check gives it, from `g28.tic`/`g28.tex` and `g13.tex` (parent of `e879b6a44`) and `g1f_render.tic` (parent of `22ea0cd90`): "Rendered as the spec says: `w17` → `w_{17}`, `x17` → `x_{17}`, `ab2` → `\VAR{ab}_2`, `Fred17` → `\TYP{Fred17}` by rule (b), `_Wq` → bold." 1,111 characters.

`ledger.py check --rows final.rewrite`: 3 rows, 0 fail the template.
