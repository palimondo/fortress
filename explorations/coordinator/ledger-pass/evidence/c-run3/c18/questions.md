# Questions, chunk c18

No row to measure.

XXX tests believed to pass now: none. `XXXNestedTryInnerCatch.test` (row 888) still fails as it asserts: `CodeGen.forTry` still calls `visitTryCatchBlock` before `body.accept` (`CodeGen.java:2033-2035` at c124c6b65), and the one commit since the row (d96242f0a, local functions as closures) does not touch `forTry`.
