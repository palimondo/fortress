<!-- A probe of way D of the review `explorations/reviews/carriers-ways-2026-11-13.md`, run 2026-11-13 by a Fable worker: in a scratch worktree, `/home/user/fortress-merge`, seeded from the base build `/home/user/fortress-base32` (`832f7d0d91`), each of the five number traits `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` of the interpreter's library is merged with its one native object (`Int`, `Long`, `BigNum`, `UnsignedLong`, `Float`), and this note gives what ran under walk, the compiled checker's count and the distance after the merge, what had to change by file, every obstacle in the order met, what a Fortress programmer sees differently, and an estimate in rungs; nothing here lands, and the scratch tree's whole diff is `number-object-merge.patch` beside this report. -->

# The five number traits merged with their objects: a probe of way D

FIRST VERSION, the work goes on. What stands so far:

- Before the merge, with each of the 56 bodies of `trait RR64` that go through `asFloat(self)` made to fail, walk's suite (`ant testSystem`, 830 tests) fails in one test, `tests/asifTest.fss:102`, `(3.0 asif RR64) + 17`. So the review's "can never run" is false in one construct: `asif RR64` sends the call to the trait's body. A program of my own over every operator of `RR64`, with `RR64`, `ZZ32`, `RR32` and numeral operands, reached none of them.
- The merge is made in the scratch tree for all five types. The five objects stay in `FortressLibrary`, where the traits were, and walk learns that these five objects of `FortressLibrary` have native values (the review's second alternative): moving them into `FortressBuiltin` would also move the private helpers that their bodies call.
- Walk loads the merged library and runs: my own programs print what the old code prints, and microGPT's quick check passes for both programs (7 of 7 each).
- Still to measure: walk's suite on the merged tree, the checker count and the distance, the tests and the specification.
