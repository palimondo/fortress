<!-- Side quest opened 2026-09-11: APL as a sublanguage of Fortress, climbed one tutorial chapter at a time, to learn where the language's syntax extension gives out. Feasibility probes: explorations/apl-probes/REPORT.md. -->

# APL in Fortress: the ladder

The question is not whether APL can be written in Fortress but how far the specification's syntax-extension mechanism and the library carry it before something gives, and what exactly gives. The method is the one the microGPT work settled on: each step is bounded, every probe is kept with its output, every negative claim is gated by an attempt to achieve the thing, and every new language fact goes into `gaps.md` here in the merged ledger's row format for a later merge.

The rungs follow the chapters of Stefan Kruger's "Learning APL" (https://xpqz.github.io/learnapl/), read in order; the reader climbs by reading the chapter, the exploration climbs by making that chapter's examples run inside `apl⦇ … ⦈` and agree with the book's printed results or with an oracle. One directory per rung.

| rung | chapter | what it needs from Fortress | state |
|---|---|---|---|
| 1 | It's arrays all the way down (`array.html`) | arrays, strands, scalar extension, `⍳ ⍴`, reductions, rank | in progress |
| 2 | Indexing (`indexing.html`) | bracket indexing, `⌷`, index origin | |
| 3 | Glyphiary (`manip.html`) | the bulk of the primitives, monadic and dyadic | |
| 4 | Direct functions and operators (`functions.html`) | `{⍵}` dfns as generated `fn`, user operators | |
| 5 | Iteration (`iteration.html`) | `¨`, power operator, recursion | |
| 6 | Products (`products.html`) | inner and outer products `+.×`, `∘.×` | |
| 7 | Trainspotting (`tacit.html`) | trains, tacit definition | |
| 8 | Finding things, partitions (`find.html`, `cookbook1.html`) | nested arrays, boxes | |

Later chapters (errors, real data, HTTP, workspaces, testing, workflow) are Dyalog's environment rather than the language and are out of scope.

Layout: `base/` holds the library and grammar the rungs share (`AplCore.fss` with its API, `AplSyntax.fsi` with the grammar), grown rung by rung; `rung-N/` holds that rung's examples as a Fortress component, its expected results, its probes with outputs, and a short `REPORT.md`; `goldens/` holds the book's examples with their printed results per chapter, and the oracle's results where an oracle exists; `gaps.md` is the running gap table.

Oracle: GNU APL (free software) if it builds in the container; otherwise the book's printed outputs, which are Dyalog's. Index origin is 1 in both, as in the book.
