<!-- Run B, 2026-09-09: final report of the delegated worker "Independent replication of language claims"; model as the transcript states it: `opus` in the Agent tool's `input.model`, `claude-opus-5` in the worker transcript's `message.model`.
     Recovered verbatim (final assistant text block, 2026-09-09T02:18:11Z) from the worker transcript `scratchpad/transcripts/run-b-subagents/agent-a3425313e0fb75a35.jsonl`; the detailed report the worker wrote to disk is committed separately as `probes/worker/REPORT.md`. -->

Done. `REPORT.md` and all probes are in `/home/user/fortress/explorations/run-b/probes/worker/`.

## What I did

Wrote and ran ~45 probe components (`w01`…`w18`, plus revision attempts kept as `*.attemptK.out`) against the walk interpreter, checked every item against the TeX spec under `Specification/` and the library under `Library/`, and wrote `/home/user/fortress/explorations/run-b/probes/worker/REPORT.md` (one section per goal: goal, verdict, probe files, decisive output line, spec citation with line numbers, one-sentence interpretation).

## Verdicts

**Achieved (12):** G1, G6, G7, G8, G9, G10, G12, G13, G14, G15, G16, G18.
**Not achieved (6):** G2, G3, G4, G5, G11, G17.

## Key findings

- **G1** — postfix `^T` works for both shapes, but only when the two overloads are separated by an *exclusion*: `Vector[\RR64,n\]` / `Matrix[\RR64,n,p\]` (`Rank1 excludes Rank2`). The direct pair on `Array[\RR64,ZZ32\]` / `Array[\RR64,(ZZ32,ZZ32)\]` is refused by the Incompatibility Rule ("unrelated (neither subtype, excludes, nor equal)"). Static parameters of a postfix operator follow the operator name.
- **G11 / G2** — `w: Array[\RR64,ZZ32\] = [ 1.0 2.0 ]` **silently binds nothing** (`undefined variable [w]` at the later use). Root cause is the `if`-chain in `LHSEvaluator.java:113-200` falling off its end. The same literal works under `Array1[\RR64,0,2\]`, `RR64[2]`, `Vector[\RR64,2\]`. Matrix pasting `[ A B ]` and `[ A ; B ]` fails outright ("Element at [0] has extent 2 along axis 1 but an earlier element has length 0") for both static and runtime sizes — `IUOTuple.java:111-113` never seeds `extentSums` with `-1`.
- **G3** — `x.v^T` is a syntax error even though `concrete-syntax.tex:934-951` is left-recursive on `Primary` for both `.Id` and `ExponentOp`; `(x.v)^T` runs.
- **G4** — prefix `BIG MAX g` is unreachable for *any* `Generator[\RR64\]`, library arrays included, because the library bound is `T extends StandardMax[\T\]` and only `Number` satisfies it; the identical carrier over `Number` prints `9.5`.
- **G5** — a map comprehension whose values are matrices of differing shapes dies in `CovariantCollection.APPCOV` ("have no common supertype!"); with uniform shapes *and* explicit static arguments it works, and `Map.dom` is separately broken.
- **G8** (new, refines gap-ledger row 9) — only the *parenthesized* splits parse: `(a ||`⏎`b)` and `(a`⏎`|| b)`. Bare line-final `a ||` is a syntax error even though `enclosingops.tex:31` classifies it as **infix**; bare leading `|| b` also fails; `a||` at line end is diagnosed as a right encloser.
- **G9** — `===` on user `value object`s compares only the dynamic type: `P(1.0) === P(2.0)` is `true` while `1.0 === 2.0` is `false`. A silent violation of `objects.tex:432-437`.
- **G10** — `requires` throws exactly the spec's `CallerViolation`; a top-level `property` aborts the program with `** bug! Not yet implemented: PropertyDecl`.
- **G17** — importing `Set.{...}` and `Map.{...}` together makes `BIG UNION` an invalid overloading ("parameter lists have the same types"); `import Set.{...} except { opr BIG CUP }` or `import Set.{Set}` both fix it.
- **G18** — a prefix operator inside a juxtaposition must be parenthesized: `"text " SQRT(d)` and `a SQRT(b) c` are syntax errors; `(SQRT d)` / `(SQRT(d))` work, as does `SQRT(d)` outside a juxtaposition.