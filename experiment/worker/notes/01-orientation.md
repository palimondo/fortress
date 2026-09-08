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
