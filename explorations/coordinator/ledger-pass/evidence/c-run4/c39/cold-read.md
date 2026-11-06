# Cold read, c39

Read with CLAUDE.md, `.claude/skills/fortress-repo/SKILL.md` and `references/records.md` only.

## Row 1

- **Defect:** Under walk, a primary with a subscript followed by a second subscript or by a superscript (`x[i][j]`, `x[i]^2`) is evaluated as a method/juxtaposition invocation that drops the first index of the subscript list. With one index, the call gets no arguments and fails with `args = ()`; with several, it silently uses the remaining indices, giving a wrong element (e.g. `m[3,7]^2` gives `(m[7])^2` = 11449, not 1075369). The grammar accepts these forms; the specification forbids only `x^2[i]`.
- **Where:** walk only (class says walk; the compiled path is not mentioned either way). The form parses as `MathPrimary`, not `SubscriptExpr`; `interpreter/evaluator/Evaluator.java:1181` (`evalAndInvokeMethod`) and `evalInvocationArgs` at `:1064`, `:1380-1381`, which takes `exprs.subList(1,…)`.
- **Reproduce:** No reproducer cell; the probe `explorations/gap-ledger-probes/g02.fss` must be restored from the parent of commit `e879b6a44` (`git show e879b6a44^:explorations/gap-ledger-probes/g02.fss`), or write `m[3,7]^2` on a 2-D array and run it under walk. Workarounds: `(x[i])[j]`, `(x[i])^2`, or bind first.
- **Status:** NEGATIVE-VERIFIED: an open, confirmed gap; build a fix in walk's evaluator, test first.
- **Could not resolve:**
  - "siblings: 84": I read it as "see the related row 84" (same family of grammar/primary bugs), but the skill does not define "siblings"; unclear wording (term of the ledger, not of Fortress). Also collides with the skill's "Numbers are siblings" use.
  - "Found by: astra, blinded, review": names of batches or agents that the skill does not define; I could not tell whether "blinded" is a finder or a manner of review. Unclear wording, harmless to a fixer.
  - "probe and full text: history, row 1": I take it to mean the row's earlier text in `explorations/fortress-gap-ledger-history.md` (records.md); resolvable.
  - The claim does not say whether the compiled path has the same defect; the skill asks rows to say which paths show it. Unclear: walk-only by test, or untested on compiled?

## Row 84

- **Defect:** The parser rejects a superscript or postfix operator after a dotted access, field, getter or method call: `x.v^T`, `B.data^T`, `B.n^2`, `B.data^*` give a bare `Syntax Error` at `^`. A subscript after a dot works (`B.data[5]`).
- **Where:** the parser, so both paths (shared parser). `ProjectFortress/src/com/sun/fortress/parser/Expression.rats`: `PrimaryItem` tries `LeftAssociatedPrimary` before `MathPrimary` (`:384-386`); `LeftAssociatedPrimary` (`:388-434`) has no `MathItem`; exponentiation is a `MathItem` (`:651-656`) attached only to `MathPrimary` (`:463-465`).
- **Reproduce:** No reproducer cell; restore the six probes `explorations/run-b2/probes/g4a_*.fss` from the parent of `22ea0cd90`, or compile any one-liner `x.v^T`. Workaround `(x.v)^T`.
- **Status:** NEGATIVE-VERIFIED: confirmed open; build a fix in the Rats! grammar (then test both paths, since the parser is shared).
- **Could not resolve:**
  - "siblings: 1": as in row 1, read as "related row 1"; undefined term.
  - "Found by: run-b, run-b2": batch names, undefined; harmless.
  - The claim says "superscript or postfix operator" but every example is a `^` superscript; whether a true postfix operator (e.g. `!`) also fails is not shown. Unclear wording.
  - Whether the specification admits these forms is implied (class is "implementation gap") but not stated; the cited lines `concrete-syntax.tex:947-952` presumably do. Minor.

## Row 66

- **Defect:** Fortify, the LaTeX typesetter for Fortress source, renders a two-character name with a capital initial and a digit (`M1`, `W1`) in roman as `\TYP{M1}`, while the specification's rendering table gives `M_{1}` (subscripted). Its roman rule (b) applies from length 2, where the specification applies it only to names longer than two characters, so the subscript rule (c) is never reached for such names. Longer names and lower-case names render as specified.
- **Where:** neither walk nor compiled: the tool `Fortify/fortify.el`, function `fortress-render-identifier-no-underscores-or-primes`, guard `(>= (length basename) 2)` at `:881-884`; case (c) at `:885-894`.
- **Reproduce:** No reproducer cell; restore `explorations/gap-ledger-probes/g13.fss` and `g28.tic` with outputs from the parent of `e879b6a44`, and `explorations/run-b2/figures/g1f_render.tic` from the parent of `22ea0cd90`, and run them through Fortify. Workaround: write `_W1` for bold.
- **Status:** NEGATIVE-VERIFIED: confirmed open; the fix looks like changing `>= 2` to `> 2` in fortify.el. Its priority for microGPT is nil; I would leave it unless a task covers the typesetter.
- **Could not resolve:**
  - Fortify, `.tic` files, `\TYP`, `\VAR`, rules (a)/(b)/(c) of the rendering appendix: none are in the skill. Language/tool concepts I lack; I inferred them from the row and the spec citation. How to run Fortify on a probe is not given anywhere I may read.
  - "Rendered as the spec says: `w17` → `w_{17}`, `x_{17}`, `\VAR{ab}_2`": the arrow applies to `w17` only; the other two items have no input shown. Two readings: inputs `x_17` and `ab_2`, or outputs of unnamed inputs. Unclear wording.
  - "`_Wq` bold": whether this is an input rendered bold, or the workaround form; unclear.
  - "ours (page-template ledger)": "ours" and "page-template ledger" are undefined; unclear wording.
  - "full text: history, row 66": the history file; resolvable.
