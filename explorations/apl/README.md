<!-- Side quest opened 2026-09-11: APL as a sublanguage of Fortress, climbed one tutorial chapter at a time, to learn where the language's syntax extension gives out. Feasibility probes: explorations/apl-probes/REPORT.md. -->

# APL in Fortress: the ladder

The question is not whether APL can be written in Fortress but how far the specification's syntax-extension mechanism and the library carry it before something gives, and what exactly gives. The method is the one the microGPT work settled on: each step is bounded, every probe is kept with its output, every negative claim is gated by an attempt to achieve the thing, and every new language fact goes into `gaps.md` here in the merged ledger's row format for a later merge.

The rungs follow the chapters of Stefan Kruger's "Learning APL" (https://xpqz.github.io/learnapl/), read in order; the reader climbs by reading the chapter, the exploration climbs by making that chapter's examples run inside `apl⦇ … ⦈` and agree with the book's printed results or with an oracle. One directory per rung.

| rung | chapter | what it needs from Fortress | state |
|---|---|---|---|
| 1 | It's arrays all the way down (`array.html`) | arrays, strands, scalar extension, `⍳ ⍴`, reductions, rank | done twice: 26 of 26 checks over 18 of 28 examples pass on the **native-array base**, 10 out of scope (nested arrays, `]box`, `⎕` names), plus 18 of 18 beyond the chapter; `rung-1/REPORT.md` prices that base against v1's and keeps the 21 probes `r01`-`r16` behind it. The first run, on v1's runtime-rank library, is `v1/rung-1/` |
| 2 | Indexing (`indexing.html`) | bracket indexing, `⌷`, index origin | done twice: 25 of 25 checks over 19 of the 40 examples pass on the native-array base (the goldens call only 5 "core"), same 19 and same 25 as v1, nothing regressed; 21 out of scope (16 nested `m`, `⎕`/`]`, tacit `⌷⍨∘⊃⍨⍤`, characters); 21 of 21 beyond the chapter. APL names are now **lambda parameters**, assignment is an **in-place put** on the library's own mutable arrays, and a row or column is a **view that is a `Vector`**; `rung-2/REPORT.md`. The workspace-table version is `v1/rung-2/`, the variables-only study `v1/rung-2b/` |
| 2b | Indexing again, variables only | APL names as **real Fortress variables** | done: the lambda route of the paper's design works — an `Id` gap as a lambda parameter binds, the name needs no `⍎(…)` escape, and host code in the block reads it; 52 of 52 checks, the chapter's variable examples run both by lambda binding and over host-declared cells, which also recovers rebinding and the cross-block session; costs a closed name set (1 grammar line per name) because a reference cannot be a gap. Also: what the shipped `Regex.fsi` teaches about delimiting, `#` and escaping, and a newline-terminated `apl 2 3 ⍴ ⍳ 6` form. `v1/rung-2b/REPORT.md`. Carried over to rung 2 on the new base, minus the cell — the library's arrays are mutable, so assignment needs no rebinding (`gaps.md` row 48) |
| 3 | Glyphiary (`manip.html`) | the bulk of the primitives, monadic and dyadic | |
| 4 | Direct functions and operators (`functions.html`) | `{⍵}` dfns as generated `fn`, user operators | |
| 5 | Iteration (`iteration.html`) | `¨`, power operator, recursion | |
| 6 | Products (`products.html`) | inner and outer products `+.×`, `∘.×` | |
| 7 | Trainspotting (`tacit.html`) | trains, tacit definition | |
| 8 | Finding things, partitions (`find.html`, `cookbook1.html`) | nested arrays, boxes | |

Later chapters (errors, real data, HTTP, workspaces, testing, workflow) are Dyalog's environment rather than the language and are out of scope.

Layout: `base/` holds the library and grammar the rungs share (`AplCore.fss` with its API, `AplSyntax.fsi` with the grammar), grown rung by rung; `rung-N/` holds that rung's examples as a Fortress component, its expected results, its probes with outputs, and a short `REPORT.md`; `goldens/` holds the book's examples with their printed results per chapter, and the oracle's results where an oracle exists; `gaps.md` is the running gap table.

The base was **replaced once**, on 2026-09-13. The first library (rungs 1, 2 and 2b) carried one `value object AplArr(shape, data)` with the rank as run-time data and dispatched every primitive on a string; it is archived unchanged under `v1/` with its own `v1/README.md`, and the rows 1-35 of `gaps.md` were earned there. The base now is the **native-array** design: an APL scalar is an `RR64`, a vector an `Array[\RR64,ZZ32\]`, a matrix an `Array[\RR64,(ZZ32,ZZ32)\]`, rank lives in the type, each glyph is a real Fortress operator in both arities where the host's operator table allows one, the templates expand to host code, and `SUM`/`PROD`/`BIG MAX` and `requires` contracts come from the library rather than from us. It was priced against v1 before being promoted (`rung-1/REPORT.md`).

Goldens are the book's own printed outputs (Dyalog, `⎕IO ← 0`, so every index and `⍳` counts from zero), extracted per chapter under `goldens/`. GNU APL 2.0 is built in the container as a secondary oracle (`goldens/ORACLE.md`); it is an APL2 dialect and disagrees with 100 of the 127 outputs of the first three chapters, mostly in display and in the glyphs it lacks, so it checks values, not the book's notation.
