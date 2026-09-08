# Resumed investigation

- Recovered existing Vec/Mat, scalar tape, custom SUM and Python fixture work. Sources alone are not counted as successful probes. No excluded material read.
- Investigating eager vectors with disjoint parallel construction and immutable scalar graphs; cached token positions have real temporal dependencies. Saved tape allocates nodes by a mutable counter, so its suitability for parallel comprehensions is unresolved.
- Candidate core expresses matrix-vector multiplication using juxtaposition, dot products using ordinary SUM, stable softmax and RMS normalization as vector formulas. Attention contracts a cached time-by-feature matrix and concatenates head outputs explicitly. This is a candidate pending execution and actual Fortify visual comparison.
- Shipped Vector/Matrix require Number (FortressLibrary.fsi:1459, matrix section); Number comprises RR64 (line 277), and operations return RR64. Investigating custom scalar/algebra rather than assuming AD can inherit Number.

## Continuation: concrete forward gate
- Initial ForwardProbe failed at `rows[i][j]` with empty index arguments. Introduced local row selection; snapshot retained. Bounded rerun `20260907T203154.764676Z-forward-index-fix` exits 0 in 3.236 s.
- All nine logits and mean loss compared directly with reference fixture: maximum absolute difference 5.551115123125783e-17, loss exactly 1.147958783149666 at printed precision. This verifies forward only, not AD/training/generation.
- Candidate B extracted actual successful source and re-rendered through Fortify to render-b/. Awaiting final by-eye assessment while AD and SUM alternatives are tested.

## 2026-09-08 completed recovery, alternatives and article draft
- Run04: fixed split `+ =` to `+=`; reverse passed and emitted all228 gradients,
  then Adam failed on indexed-base exponent. Run05 changed exponent to2.0 and
  still failed; run06 parenthesized `(g[i])^2.0` and completed full model.
- Strict complete conversion and reference validation PASS for run06, all
  initial/gradient/update cells plus attention/loss/generation. Per-field maxima
  are in validation-summary.json; selected gradient max2.22e-16, update3.47e-16.
- Alternative run01 replaced RMS quotient with inverse-power scalar scaling,
  and direct weighted contraction with explicit transpose+matrix product.
  Full fixture PASS. This combined alternative does not isolate each change's
  timing/numerical effects. No timing superiority claimed.
- Rendered actual RMS/attention comparisons before selecting forms; quotient
  directly shows radical denominator, direct attention sum exposes time axis.
  Alternative needs extra scalar-vector multiplication/transpose constructors;
  transpose renders as a function name. Both retained as substantive evidence.
- First figure-extraction script had a Python parenthesis typo, causing two
  recorded missing-input render failures; fixed helper and recorded successful
  renders. First RMS comparison caption too wide; split formula onto two lines
  and rerendered. Final twelve PNGs each inspected. All source inputs, SVGs and
  hashes retained under figures/. No hand-rewritten Fortress illustrations.
- ARTICLE.md saved complete with adjacent math/Python/actual Fortress, support
  construction, evidence, alternatives and qualified scope. Reproduction guide
  and source inventory saved; all article local links and includes consistent.
- Ready for parent review. No commits/pushes; boundaries preserved. Resume note
  now holds only current status, with old material in RECOVERY_HISTORY.md.
