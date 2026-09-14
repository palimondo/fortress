# Which type annotations MicroGptFlat actually needs

Eight variants of `explorations/run-c4/src`, each a full copy of the four `.fss` and three `.fsi` files in its own directory under `explorations/run-c4/probes/types/`, each differing from the source in exactly one category of annotation removed, plus `S/`, an unmodified control.

The only edit shared by all nine is the path fix demanded by the extra directory level: `corpusPath` and `weightsDir` become `../../../../apl/reference/dzaima/docs.txt` and `../../../../apl/reference/dzaima/w`.

Each was run alone, never two at a time, as `../../../../../bin/fortress MicroGptFlat.fss` after `source experiment/env.sh` (JDK 25, `FORTRESS_THREADS=1`, `-Xmx4g`); the full output of each is the `run.txt` beside its sources.

The standard of success is the control's five losses: 3.3659669475848513, 3.424272783871772, 3.177802125458053, 3.066355684224198, 3.2208830897506235.

| variant | what was removed | compiles | runs | losses identical | step ms (five steps) | error |
| --- | --- | --- | --- | --- | --- | --- |
| S (control) | nothing (paths only) | yes | yes | — (defines them) | 8622 8266 8022 8494 8132 | — |
| A | return types on the non-exported functions `rmsn`, `sm`, `rmsn_b`, `sm_b`, `view` and the locals `h`, `u` (parameter types kept) | yes | yes | yes | 8593 8350 8037 8448 8560 | — |
| B | parameter *and* return types on `rmsn`, `sm`, `rmsn_b`, `sm_b` — the four functions handed to `rows` | yes | yes | yes | 8530 8564 8194 8185 7996 | — |
| C | parameter and return types on the locals `h` and `u` in `step` | yes | yes | yes | 8914 8470 8162 8296 8017 | — |
| D | the lambda annotations in `mask` (`fn (i, j) =>`) and in `run()` (`fn (i) =>`), and the type annotations on the `mask` and `corpus` top-level bindings | yes | yes | yes | 8433 7950 8130 8062 8275 | — |
| E | the declared types of the mutable locals in `run()`: `p := loadParams(…)`, `m := zeros(…)`, `v := zeros(…)` | **no** | no | — | — | `MicroGptFlat.fss:88:5-7: Variable p is not defined.` (then the same for `m`, `v`, and every later use) |
| E2 | the same three, written `var p = loadParams(…)` | **no** | no | — | — | `MicroGptFlat.fss:88:9: The type of p is required.` (then the same for `m`, `v`) |
| F | the parameter types of the api-declared functions, in the component only: `matName(i)`, `matShape(i)`, `matCount(i)`, `matOffset(i)`, `step(p, b)`, `adam(p, m, v, g, t, lr)`, `learningRate(s)` (return types kept) | yes | yes | yes | 8225 8169 8199 7981 8145 | — |
| G | A + B + C + D + F combined, and `view(p, i)` untyped too; E excluded because it fails alone | yes | yes | yes | 8351 10079 8686 8390 8272; second run 9171 8430 8667 9040 8941 | — |

The G attempt that also included E failed exactly as E did; its output is kept as `G/run-with-E.txt`, and `G/run.txt` and `G/run2.txt` are the two runs of G as tabulated.

No variant is meaningfully slower: the control itself spans 7572–8827 ms per step across its two runs (`S/run.txt`, `S/run2.txt`), A–F all sit inside that spread, and G's two runs average about 6 % above the control's two — a difference smaller than the gap between the control's own runs, so the interpreter is doing no extra work for the missing annotations.

The step times carry more noise than usual because an unrelated C4 re-check (`checks/threads1.txt`) was running on the same machine throughout these runs; that is the likely source of G's single 10079 ms step and of the general drift, and it is why the timing claim above is stated as a range rather than a measurement.

## What the evidence shows

Of the annotations in `MicroGptFlat.fss`, exactly one kind is necessary: the declared type of a mutable local.

`p: Array[\RR64,ZZ32\] := loadParams(…)` cannot lose its type in either spelling — dropped from the `:=` form the line stops being a declaration at all and becomes an assignment to an unbound name (`Variable p is not defined`), and in the `var p = …` form the interpreter says plainly `The type of p is required`, so a mutable local in this interpreter is the one binding that carries no inference.

Everything else in the file is redundant to the interpreter and is kept for the reader alone.

Return types on functions are redundant (A, and F keeps them only to isolate its own category), which is ledger row 21's `return types on functions/operators/methods can be omitted`, now confirmed on a whole program rather than a probe.

Lambda parameter and return annotations are redundant (D), which is ledger row 131.

The two top-level immutable bindings `mask` and `corpus` need no declared type (D), even though the api declares `corpus: Corpus` — the component's own binding is inferred and still matches the api.

The component need not repeat the api's parameter types (F): `matName(i)`, `step(p, b)`, `adam(p, m, v, g, t, lr)` and `learningRate(s)` all run untyped against the very same api, so an api declaration supplies the types its component omits.

The open question about named functions with untyped parameters is answered twice over, and positively: B shows a top-level `rmsn(x) = …` accepted, and C shows a local `h(m) = …` accepted, neither with any annotation at all.

The sharper half of that question — an untyped named function handed to a parameter of function type — is answered by B in the affirmative: `rows(rmsn, x)`, `rows(sm, …)`, `rows(rmsn_b, dX3, x2)` and `rows(sm_b, a, dh vh^T)` resolve to the right ones of FlatArrays' four `rows` overloads, which differ only in the arrow type of their function parameter, with all four functions declared untyped, and the losses come out bit-identical.

That extends ledger row 171, which recorded that a *typed* lambda or a named function resolves such overloads, to a named function whose own parameters carry no types; the contrast with row 164, where an untyped *lambda* silently takes the first declared overload, therefore does not turn on the argument's lack of annotations but on its being a lambda — a named function is looked up as a declaration and carries an arrow type at dispatch even when its parameter types were inferred.

G closes the account: every annotation in the model except the three mutable locals' can be deleted at once and the program still prints the five reference losses.

## Coordinator's correction

The paragraph on B overstates what the run shows. C4's four `rows` overloads (`src/FlatArrays.fss`) differ in the number of array arguments and in their rank (a matrix or a rank-3 array), and the function parameter's arrow type never decides between them; so B does not extend ledger row 171, and says nothing about row 164. What B and C do show, and what the ledger lacked, is that a named function declared with untyped parameters, top-level or local, is accepted where a parameter of function type `Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\]` is declared, and runs to the same digits. The ledger rows below are written to that. The timing figures are noise: the coordinator's own check re-run overlapped every variant.
