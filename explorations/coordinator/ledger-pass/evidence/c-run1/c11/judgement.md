# Judgement: chunk c11 (base c124c6b65)

- 69: apply, corrected. The check's fidelity fix made exactly: the `typecheck-old` sentence now cites `Shell.java:467-474` and the throw at `compiler/StaticChecker.java:229`.
- 71: keep, applied as kept (check passes; no line written).
- 74: apply, corrected. "the open part is the generator tower." replaced by the check's sentence (a `BIG` operator over `Generator[\T\]` at any `T`, and a reduction object a program declares at its own element type).
- 314: keep, applied as kept (check passes).
- 331: apply as written (check passes).
- 332: apply as written (check passes).
- 339: apply, corrected. `:1304-1305` became `:1305-1306`; "a dispatched generic arm too" became "also when dispatch picks a generic overload"; "Run right: ..." became "Workaround: a parameter not of type `T`, or walk."
- 470: keep, applied as kept (check passes).
- 514: apply as written (check passes).
- 604: apply, corrected. Notes replaced by the check's text: the passing calls tied to `VarargsNoTrailingArgument` and the one library's `assert` calls (`Library/String.fss:446-447`, `:486`); "red at the switch-over" explained; the `HeapSequence` sentence and "the body's typing and the export check" dropped (home: history, row 604).
- 832: apply, corrected. Claim drops ", under the bound `Object` and the bound `Any` alike"; notes replaced by the check's text (the `Object` case as `U extends Object`, `Any` as `fortress compile`'s bound).
- 833: apply, corrected. The reproducer sentence replaced by the check's (walk calls `f(B)` for `c: C = D`, not `f(A)`, P-59's limit); "its default" cut.
- Silent: 69 `choice` upheld (the check passes it; `Shell.java:455-457`).
- Duplicates, closes, pairs: none (the check finds none owed).
