# Gaps and departures (classified), with reproducers

Legend: **I** = implementation/library gap of this historical interpreter or library,
**L** = language-design limit (per the specification), **D** = justified design choice.

| # | Departure from the ideal notation | Class | Reproducer / evidence | Effect on the deliverable |
|---|---|---|---|---|
| 1 | `∑` over a user type: the library's `opr SUM[\T extends Number\]()` is nullary and `Number comprises {RR64}`; a second nullary `SUM()` is an invalid overload (spec: static params must agree; interpreter also rejects at prefix use) | L (protocol) + I (library hack "permit any Number to work non-parametrically") | probes 02, 02b, 02c, 04 | `import … except { opr BIG + }` + user reduction (spec §imports) — one extra line |
| 2 | Interpreter accepts `opr SUM[\T extends V\]()` next to the library's (different static params) until a prefix use appears | I (lenient check) | probe02c vs probe04 | not relied upon |
| 3 | Subscript immediately followed by `^` or by another subscript evaluates the subscript with an empty argument list | I | probe17; v3 `Q[t][cols]` | write `(x_i)^2` or iterate elements `∑_{x_i←x} x_i^2`; `(Q[t])[cols]` |
| 4 | `T[n]`, `T[m,n]` array types with `nat` parameters do not unify with runtime arrays; literal sizes work | I | probe08, probe04b | explicit `Array1[\T,0,n\]` (v1) or a `Vec` type (v2/v3) |
| 5 | `T^n` parses but denotes the Number-only `Matrix`/`Vector` | I (library) | probe08b | ℝⁿ-style type spelling unavailable for `Value` |
| 6 | Array comprehensions `[ i ↦ e \| i ← g ]` unsupported | I (spec note) | probe08c | list comprehensions / factories |
| 7 | Generic invariance: `<|1.0, 2.0|>` is `List[\FloatLiteral\]`, nested comprehensions yield `ArrayList[\ArrayList[..]\]`; explicit `[\T\]` static args needed | L (no variance) + I (literal typing) | probe01, probe07b, MicroGPT plumbing | annotations in data/plumbing code only |
| 8 | Varargs not allowed in object constructors | L (spec: eliminated) | probe07 | factory `node(data, deps...)` |
| 9 | nat-generic functions mis-unify on a second instantiation when called through an exported API | I | src/MicroGPT.fsi attempt (transcript 17:29) | build composes one component instead of an API |
| 10 | No exponent notation in numerals (`1e-5`) | L | probe03 | `0.00001` |
| 11 | All-uppercase identifiers are operators (`GPT`, `BOS`); `value`, `at` are keywords | L | MicroGPT.fss iterations; alt probes | naming |
| 12 | `f()[i]` (call then subscript) is a syntax error; `x.f()` on a function-valued field must be `(x.f)()` | L (grammar) | check driver; alt_autograd_closure | parentheses |
| 13 | Fortify renders `x_h[t]` as a LaTeX double subscript (error), `opr ^(…)` as a superscript unless spaced | I (typesetter) | figures v1_layer, v2_model latex.err | names `Qh`, `E`, `P`; `opr ^ (…)` |
| 14 | `||` at line end is a syntax error (also an encloser); `do…end` not allowed as a comprehension body | L (grammar) | MicroGPT.fss iterations | one-line concatenation; local function |
| 15 | Default JVM heap (-Xmx256m) too small for ~40k-node graphs | I (packaging) | probe06 | JAVA_FLAGS in run.sh |

Summation order: Fortress `∑` reduces in generator order (tree), Python `sum` is a left
fold; differences ≤ 3e-16 in every check (D: parallel semantics kept).
