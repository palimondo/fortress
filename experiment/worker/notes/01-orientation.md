# 01 — Orientation notes (checkout survey, before any design)

Date: 2026-09-08. Branch of record: `claude/worker-brief-fable-vnnuv8`.

## Environment
- `bash experiment/setup.sh` initially FAILED at the render stage: `bin/fortick`
  shells out to Emacs (`Fortify/fortify.el`), which was not in the package list.
  Coordinator installed `emacs-nox`; re-run PASSED all five stages.
- Interpreter entry: `./bin/fortress FILE.fss` with `FORTRESS_THREADS=1` from
  `experiment/env.sh`. Probe runner: `experiment/worker/run.sh` (logs to
  `transcript.txt`).
- `ProjectFortress/hello.fss` does NOT run under the interpreter (imports the
  compiler-side `CompilerSystem`); not an environment failure.
- Accidental-exposure note: the root `README.md` links to
  `explorations/fortify/buffons-excerpt-*.svg` (prior work, absent from this
  checkout by construction). Only the link text was seen; no content.

## Reference (task 2)
- Article: https://karpathy.github.io/2026/02/12/microgpt/ (fetched 2026-09-08).
- Gist `8627fe009c40f57531cb18360106ce95` (microgpt.py), pinned revision
  `14fb038816c7aae0bb9342c2dbf1a51dd134a5ff`, 199 lines,
  sha256 `d47d88c2fd432c8ebdc1048beab7f7eb64ea7e0e664e11b812d72a6d95ebccee`.
  (Companion gist `561ac2de…` = build_microgpt.py, revision `7d9f00fa…`, not used.)
- Dataset: makemore `names.txt` at commit `988aa59` (the URL pinned in the gist),
  32032 lines, sha256 `0a30b555…8ea8cc4d`.
- Article vs gist: model, autograd, optimizer and inference code are identical.
  Differences: gist has `random.seed(42)` and pins the dataset commit; the
  article's dataset-loading lines differ cosmetically; gist prints with `end='\r'`.
  Selected variant: the gist (it is the executable artifact; the article says
  "This GitHub gist has the full source code").
- Harness `tools/derive_checks.py` executes the pinned source verbatim up to the
  optimizer section, then runs an arithmetic-identical instrumented copy of the
  training loop (2 steps) and inference (3 samples, uniform draws recorded).
  Its step losses 3.365967 / 3.424273 match the article's printed
  `step 1 … 3.3660`, `step 2 … 3.4243`.

## Language/library facts established by probes (evidence: probes/, transcript.txt)
- probe01: user object with `opr +`, `opr juxtaposition`, `opr -` (prefix),
  `opr ^`, functional methods `exp`, `log`; mutable field `var grad: RR64 := 0.0`;
  constructor param `var data`. Works. List literals of a user type need explicit
  static args: `<|[\Value\] a, b|>` (a bare `<|1.0, 1.0|>` is
  `ArrayList[\FloatLiteral\]`, not `List[\RR64\]`: generics are invariant).
  `list.zip` needs an explicit static arg `zip[\RR64\]`.
- probe03: `x^(-0.5)`, `x^0.5`, `SQRT x`, `exp`, `log`, `MAX`, `|x|` work on RR64.
  Printing is Java's shortest round-trip repr (17 significant digits max).
  Overflow gives `Infinity`. NO scientific-notation numerals (`1e-5` is a syntax
  error: "a numeral contains letters"): write `0.00001` or `10.0^(-5)`.
  Precedence: `"str" -2.5` is a precedence error (juxtaposition vs prefix minus);
  parenthesize. `SQRT x` inside a juxtaposition must be parenthesized
  (interpreter bug message "Expect all oprefs to be top level SQRT").
- probe02 family (the ∑ question): the library defines
  `opr SUM[\T extends Number\]()` (nofix; used by the `SUM[gs] body` desugaring)
  and `opr SUM[\T extends Number\](g: Generator[\T\])` (prefix). `Number`
  `comprises { RR64 }`, so a user type cannot be a Number. The interpreter names
  SUM internally `BIG +`.
  - probe02: user nofix `opr SUM(): BigReduction[\V,V\]` -> "Overloading … fails
    because their parameter lists have the same types" (correct per spec).
  - probe02b: prefix-only `opr SUM(g: Generator[\V\])` works for `SUM xs` and
    `SUM <|…|…|>`; but `SUM[v<-xs] v v` reaches the library nofix and fails with
    CastError (cast to Number).
  - probe02c: `opr SUM[\T extends V\](): BigReduction[\V,V\]` is ACCEPTED by the
    interpreter and `SUM[v<-xs] v v` = 17.25 works. Spec conformance: NO —
    Specification/basic/overloading.tex ("it is an error for their static
    parameters to differ … or for one declaration to have static parameters and
    another to not have them"). Interpreter leniency (it only checks at a prefix
    call site: probe04 with both forms declared failed at the `SUM x` use).
  - probe02d: `opr BIG SIGMA()` / `BIG SIGMA(g)` — a differently named big
    operator — fully works and is spec-conformant; Fortify renders SIGMA as Σ
    (Greek capital), not the n-ary ∑.
  - probe02e/f: `import FortressLibrary.{...} except { SUM }` (spec §source-code,
    the sanctioned hiding mechanism) — parser rejects an operator name here.
    (Grammar check pending.)
- probe05: unique ids via top-level `var counter` + `atomic`; `Set[\ZZ32\]` with
  `NOTIN`/`add`; mutable local `List` accumulation with `addRight`; nested
  function closures over mutable locals; `label … exit … with`; `seq(g)`; all work.
- probe04b/c, probe06: see below (pending).

## Later probes (same day)
- probe02g/h/i/j: the parser accepts `import FortressLibrary.{...} except { opr BIG + }`
  and `except { opr ∑ }` (SimpleName ::= Id | opr (BIG)? Op; `opr SUM` is NOT accepted,
  the accumulator is tokenized as `BIG +`). With the library ∑ hidden, a user nofix
  `opr SUM(): BigReduction[\V,V\]` plus prefix `opr SUM(g: Generator[\V\])` is a valid,
  spec-conformant overload set (results in transcript). This is the sanctioned route.
- probe06 (speed, JAVA_FLAGS=-Xmx6g): 20000 iterations of `acc + c(0.001) c(2.0)`
  (4 object allocations each) = 18.8 s (~1000 iter/s); the same loop on plain RR64 =
  60 ms; 50 dot products of length 64 via `SUM[i<-0#64] ws[i] xs[i]` = 583 ms
  (~11k graph nodes/s). Default heap (-Xmx256m in bin/fortress) OOMs on a 20k-node
  chain; run.sh now exports JAVA_FLAGS="-Xmx6g -Xss64m" (environment, not a system
  change). Estimate: ~8k nodes per token forward → ~1 s/token; bounded check run is
  minutes.
- probe07/07b: varargs in object constructors are rejected ("Varargs parameters of
  objects are not allowed"; spec objects.tex note says object varargs "are
  eliminated", so this agrees with the spec). A varargs FACTORY function works:
  `Value(data: RR64, deps: (Node, RR64)...): Node = Node(data, deps)`; the varargs
  value is an immutable array (spec: HeapSequence) and can be stored in a field typed
  `Generator[\(Node, RR64)\]`. A list literal of tuples with a float literal types as
  `List[\(Node,FloatLiteral)\]` and is not assignable to `List[\(Node,RR64)\]`.
- probe08/08b/08c (types): `V[n]` / `V[m,n]` with a `nat` PARAMETER fail to unify with
  the runtime array (PrimitiveArray/__DefaultArray2) — implementation gap; literal
  sizes `V[3]`, `V[2,2]` work; explicit `Array1[\V,0,n\]`, `Array2[\V,0,m,0,n\]` work
  (probe04d). `V^3` PARSES (grammar Type.rats: Exponentiation) but denotes
  `Matrix[\V\]^(3)`, i.e. the library's Number-only Vector/Matrix — the ℝⁿ-style
  notation exists in the language but the library ties it to Number. Array
  comprehensions `[ i |-> e | i <- g ]`: "Variable i is not defined" (spec note:
  not yet supported).
- probe09: top-level `opr +`, `opr juxtaposition` (scalar·vector, matrix·vector),
  `opr DOT` on `Array1/Array2` of a user type coexist with the library's Number
  versions. `w x + x[0:1]` evaluates correctly.
- probe10: mixed operands: `a + 1`, `2 a`, `a 2`, `a/4`, `(1/n) a`, `a/n` (ZZ32 arg
  accepted by an RR64 parameter), `1 + a` (top-level `opr +(c: RR64, v: Value)`),
  prefix `-a`, `a^3`, `(a + 0.00001)^(-0.5)`, `relu` via `MAX` and an `if` expression.
- Fortify observations (fig00, fig01): `SUM[j <- 0#n] w[i,j] x[j]` typesets as a real
  ∑ with limits and subscripts; `Value[n]` → Value_n, `Value^n` → Valueⁿ,
  `Value^(m TIMES n)` → Value^{m×n}; `W_q x`, `k_t`, `alpha`, `SQRT(d)` → W_q x, k_t,
  α, √d; `opr ^(self, n)` (no space) mis-renders as a superscript, `opr ^ (self, n)`
  is fine; list literals with static args are cluttered; the pairs form
  `Value(data + other.data, (self, 1), (other, 1))` is clean; `1/data` → a fraction.
