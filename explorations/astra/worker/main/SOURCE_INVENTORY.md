# Source inventory

Counts below are physical nonblank lines within each named source slice, including any comments in that slice. They measure this file, not language expressiveness. Source boundaries are textual definitions, so they are reproducible without counting renderer output.

| Region | Nonblank lines | Role |
|---|---:|---|
| Scalar AD support | 72 | `trait Parents` onward |
| SUM extension | 6 | `object VSumReduction` onward |
| Reverse entry and two retained stress helpers | 11 | `gradient(y:V` onward |
| Eager containers | 17 | `object Vec` onward |
| Mathematical algebra and model core | 48 | `opr juxtaposition(A:Mat` onward |
| Fixed parameter mapping | 6 | `matrixAt(p:Array` onward |
| Optimizer and sampler | 22 | `adam(p:Array` onward |
| Fixture output and driver | 66 | `emitMatrix(` onward |

The mathematical region still includes Block/Cache declarations and explicit head assembly; it is not advertised as pure equation count. Scalar AD, ordinary SUM, eager containers and pointwise overloads are required support. The optimizer and sampler are executable numerical algorithms, not test scaffolding. Only the final output/driver region specifies the tiny fixture and emits TSV records. Header/import/export and component terminator are outside these counts.

Total file: 262 physical lines; 256 nonblank lines. No Python-vs-Fortress line-count superiority is claimed: the reference and the fixed fixture have different orchestration scopes.

The two include fragments remain verbatim substrings of the assembled executable. The figure extractor slices that executable and the alternative, rather than rewriting equations for appearance.
