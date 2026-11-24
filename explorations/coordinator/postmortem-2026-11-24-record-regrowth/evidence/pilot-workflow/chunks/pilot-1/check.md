<!-- The clarity workflow's check of chunk pilot-1 (FACTS): each rewritten entry against the record's text and its sources, and the cold reader's answers against the source meaning. -->

# Check, chunk pilot-1 (facts)

Sources read: `proposals.md`, `proposals.apply`, `clean.txt`, `cold-read.md`, `concepts.md`, `assessment.md` in this folder; each entry's current text by `facts-extract.sh`, and F-401, F-282, F-298, F-103; gap-ledger rows 112, 298, 299, 322, 607, 641, 808, 841, 842, 984, 1043; `runtimeSystem/Transaction.java` (`TXCommit`, `TXLeave`, `handOver`); `ExportChecker.scala` and its history (`git log`, `git show 031c38bbcf cc47b637d8 8979406af2`); `checker-count/run.sh`; `rung-typecase-unbound-arm/REPORT.md`; `Library/FortressLibrary.fsi` (String's 14 `abstract`, `ReadableArray`, `Array`); `FortressLibrary.fss:3210` (`TransposedMatrix`).

## F-374 — fail (wording 3, concept 1)

Fidelity.
- Broader claim. New: "is not equivalent to another built alike, since `SEQV` compares the cells". Record: "is not strictly equivalent to another built alike: `V(1) === V(1)` is `false`, since `SEQV` compares the cells by identity"; row 112: "`SEQV` compares cells by identity". "Not equivalent" lets a reader conclude that `=` fails too; the evidence is about `===` only. Wording: "is not strictly equivalent (`===`) to another built alike, since `SEQV` compares the cells by identity".
- Changed sense. New: "A loop body or function expression in a method captures the cell, as any new nested context must." Record: "a new kind of nested context must capture a var field's cell as it does a top-level `var`'s" — an obligation on whoever adds a new kind of nested context to the code generator, not a rule that every context obeys. The record's "So a change of the transaction's variable code reaches fields with no second edit" is dropped as "folded into 'by the code of a top-level `var`'"; the consequence for a worker (one edit place) is lost. Wording: "A loop body or function expression in a method captures the cell; a new kind of nested context must capture it too, as it does a top-level `var`'s. A change to the code of a top-level `var` reaches these fields with no second edit."
- Pass: the planner's default kept as not the curator's ("the curator has not decided it" → "not the curator"); row 319 and `AtomicExprCompiled` moved with their claims (apply note line 4); row 641's check scope agrees with the ledger.

Comprehension. The reader could not resolve "read and written by the code of a top-level `var`" (wording: "read and written by the same emitted code as a top-level `var`", which row 641 names `MutableStaticBinding` through `MutableFieldVar`), "as any new nested context must" (fixed above), "since `SEQV` compares the cells" (fixed above), and "a batch's planner" (concept: batch's planner — define in the `fortress-repo` core where it says who chooses what, as `concepts.md` proposes). The reader's added "Give a value object no `var` field" is its own inference; harmless.

## F-351 — fail (fidelity 3, wording 2, concept 1)

Fidelity.
- Dropped condition, broader claim. New: "The checker gives `e` no declared type, so a numeral as its value is refused or fails verification (row 1043)." Record: "a numeral as its value at a place of declared type is refused or fails verification, since the checker carries no declared type into it"; row 1043: "does not carry a declared type into the body of an atomic expression: `f(): ZZ32 = atomic if c then 1 else 0 end` is refused ... and `atomic 1` there compiles to a class that fails verification". The cold reader concluded "must not use a bare numeral as the value of `atomic e`" — anywhere. Wording: "The checker carries no declared type into `e`, so where the context declares a type, a numeral as `e`'s value is refused or fails verification (row 1043)."
- Dropped condition. New: "It commits on an exit and throws the exit on (F-401: exits out of atomic blocks)." Record: "commits the transaction on an exit, a `LabelExit`, and throws the exit on, or takes the abort path where that commit fails (F-401)"; F-401: "A commit that fails runs the block again, as at a normal end". As written the commit and rethrow are unconditional. Wording: "It commits on an exit and throws the exit on, or runs the block again where that commit fails (F-401)."
- Dropped state. New: "A nested block sees a plain write by another thread of its outer block (row 984)." Record: "Open: a nested block sees a plain write ...". The rewrite lost "Open:", so the sentence reads as a design property. Wording below.
- Uncertain, minor: "Gated by `compiler_tests/Atomic*Compiled`" now names `AtomicEndsArmCompiled` and others that gate other entries, and drops `NestedAtomicAbortCompiled` (the abort-naming claim's test) and `NestedTryInnerCatch`; the apply note keeps the full list. The apply note keeps the full list, but the entry's own gate list no longer names the abort test. Wording: "Gated by `compiler_tests/Atomic*Compiled` and `NestedAtomicAbortCompiled`."
- Pass: the handler's order "after a nested transaction hands its parent its reads" matches `Transaction.TXLeave` (`handOver(false)`, reads only); "A nested commit hands the parent its reads and writes, even if it wrote nothing" matches `TXCommit`'s comment; the exception-table sentence is handed to F-373 (hand-off 1); row 322's "a call's later argument" matches the row ("a call's argument after the first").

Comprehension.
- "the global lock moved", "a commit that missed the lock": concept the reader lacked — the run time's global lock as a version clock that each commit moves. Define in the area part on the compiler or the run time (`compiler.md`), with the transaction concepts that `concepts.md` already lists. Wording for "missed the lock" (`Transaction.handOver`: `getGlobalLock(snapshot)` fails, it validates, retries): "and at a commit that finds the lock moved since its snapshot".
- "a plain write by another thread of its outer block": two readings. Row 984: "a write that another thread of its outer block makes outside a nested block", the probe's second arm of the outer block. Wording: "Open: a nested block is not isolated from a write that another arm of its outer block makes outside any nested block (row 984)."
- The reader's question whether the nested writes are dropped on an exception: `TXLeave` says "Its writes are dropped with it"; F-401 says "an exception other than an exit still discards the writes". Not needed in this entry; F-401 holds it.

## F-279 — fail (wording 1, uncertain fidelity 1)

Fidelity.
- Ambiguous scope. Title: "a slice of an `Array2` or `Array3` based above zero reads the right elements, except a slice of a shifted `Array2`; a shift of a slice, a column, a row or a shifted `Array2` throws." Following "an `Array2` or `Array3`", "a shift of a slice" can be read as an `Array3`'s slice too; the cold reader could not tell. Record and row 808 cover `SubArray2` only: "`Array2.shift` makes such a view; `Array1.shift` of a `Col` or `Row` asks it for an output based above zero"; row 808 says of `Array3` only that it "has no such override" (an `Array3` has no shifted view). Wording: "...; a shift of an `Array2`'s slice, column or row, or of a shifted `Array2`, throws."
- Uncertain, settled: row 808 says "every subscript of a shifted `Array2` reads the wrong elements"; the record and the rewrite say "a slice". The rewrite keeps the record's narrower claim, so no fidelity failure; noted for the record's owner.

Comprehension. The reader could not link `SubArray2` to the four kinds. Wording for the body: "A slice, column or row of an `Array2`, and a shifted one, are `SubArray2` views; `SubArray2.subarray` subtracts the output's base instead of its own (row 808), so ..." (row 808: "`Array2.shift` makes such a view"). Check before adopting that a slice of an unshifted `Array2` is a `SubArray2` (the record says `Array2.subarray` hands it a 0-based view; the apply note line 8 holds the lines).

## F-157 — fail (fidelity 1, wording 2)

Fidelity.
- Stronger claim. New: "Under walk the library's own views cost more than hand-written code (row 298, the row slice; row 299, a diagonal view)." Record: "In two measurements under walk at `b176a4b79`, views through the library cost more." Two measured views become a general claim about all the library's views. Wording: "Two measurements under walk found library views slower than hand-written code: the row slice (row 298) and a diagonal as a `Matrix` view in a product (row 299)."
- Dropped mechanism. New: "through the library's juxtaposition and `DOT`". Record: "through the library's `Matrix` juxtaposition and `DOT`, which forward to `mul`" (row 299 agrees: "since `juxtaposition` and `DOT` forward to it"). Without "forward to `mul`" the reader cannot tell why an override is enough. Wording: "through the library's `Matrix` juxtaposition and `DOT`, which call `mul`".

Comprehension. "with no api line": wording, "without declaring the override in any api". "the array trait": the record named none either; `TransposedMatrix` implements `Matrix` (`FortressLibrary.fss:3210`), a subtrait of `Array` (`FortressLibrary.fsi:1612`, `get` and `put`). Wording: "an object that implements an array trait (`Array` or a subtrait such as `Matrix`) over other storage". "a view of a runtime shape": keep; the record's wording.

## F-286 — fail (uncertain fidelity 1, wording 1, concept 1)

Fidelity.
- Uncertain: "(F-282, which counts nine of these members; the counts disagree)". A new claim that another entry is wrong. Today the api writes 14 of `String`'s members `abstract` (`FortressLibrary.fsi:2583-2658`, recounted 14), against F-282's "66 members written `abstract`, `String`'s nine among them". F-282's nine dates from rung-string-members's record (`history:F-282`, 2026-10-24), before rung-abstract-declared (cc47b637d8, 2026-10-30) changed the export check and declared seven `String` members in the component (F-297's list). So F-282's count is most likely stale, not of another scope; not settled here (a recount at F-282's own scope settles it). Either way the fault and the repair are F-282's (hand-off 3), and F-286 should not carry a claim about it. Wording: drop the parenthesis's claim and keep the pointer: "So the export check finds no difference in `String` (F-282: the export check's member matching)." The disagreement belongs in hand-off 3 only.
- Imprecise: "`CatString.rangeContains` shares row 607's defect: it finds only a character's first occurrence." Row 607: `CatString`'s `rangeContains` fails "through its flat halves"; the record: "answers what its flat halves answer". For a `CatString`, the miss is the first occurrence within each half, not in the whole string. Wording: "`CatString.rangeContains` answers what its flat halves answer, so it shares row 607's defect: each finds only a character's first occurrence."
- Pass: `List.fsi:57` corrected; 14 counted.

Comprehension. "the distance stage's per-site list": concept, in the gate area part (`gate.md`), as `concepts.md` says. "So the export check finds no difference": the link from `excludes` to the export check is not explained; the export check compares the `excludes` clauses (F-282), which the pointer wording above names. "Under walk" for "define all 14": keep; it is the record's scope (the objects' definitions are observed under walk).

## F-297 — fail (fidelity 1, wording 1)

Fidelity.
- False claim. New: "The check is the original team's code." The abstract-member rule this entry states is the revival's: commit cc47b637d8 (rung-abstract-declared) added `equalAbstractMember` with the getter-by-field case and changed `equalListMembers` back to counting every api member, "the team's check compared every api member from 2009"; commit 031c38bbcf added the name match to `equalFnHeaders`. The record's "the team's 2009 comparison" named only the count of every member. Wording: "Counting every api member is the original team's rule; the match of an abstract member with or without a body, and the field for a getter, are the revival's." Or drop the sentence.
- Pass: rows 841 and 842 agree; `*ExportAbstract*` matches the five tests (writer's check); the 12 members and the prelude's 85 are in the apply note.

Comprehension. "at the api's header": wording, "at the header the api gives it (its name, parameters and return type)". "the distance stage's per-site list": concept as in F-286. Ownership left open: the assessment asked to point to F-282, which restates the rule nearly whole; not done, so the duplicate stays. Not a fidelity failure.

## F-240 — pass

Fidelity. The title is the record's last sentence, "So a time compares only with one taken under a like load", as the assessment's disposition asks. "Load can more than double a stage" matches "Load can lengthen a stage more than twofold"; 217 s at 3.3 and 574 s at 4.6 to 5.3 match the record and the apply note keeps their batch. "At a gate it can run beside `testFast`" weakens one gate's observation to a possibility, which is what the evidence allows. The batch log, F-235, F-281, the 27 halving, all in the apply note line 16.

Comprehension. Matches; no gap. The writer's question to the curator (keep the latest gate's times) stands.

## F-111 — fail (wording 2)

Fidelity.
- Narrowed evidence. New: "Read in the tools' code, not measured." Record: "Evidence: read in the code, not measured: `checker-count/WorldFlip.java` ...; `distance/DistanceMulti.java` ...; `compiler/phases/PhaseOrder.java:125-147`", and "Compiler code that names walk's classes, such as `SimpleClassLoader`, was read". Part was read in the compiler's code, not the tools'. Wording: "Read in the tools' code and the compiler's, not measured."
- Correction verified: `checker-count/run.sh:97` runs `WorldFlip -stop check`; its header (`:23`) dates the stop to 2026-10-24. The title and "up to the type check" hold.
- Pass: the native-helper exception keeps the record's scope.

Comprehension.
- "Compiler code that names walk's classes does not change the checker's report": the example that made it readable went to the note. Wording: "Compiler code that names walk's classes, such as `SimpleClassLoader`, does not change what the checker reports."
- "(F-298: such a helper compiles as its call)": unclear. F-298: "At the parse, in every run but walk's, the checker's count and distance stages among them, the rewrite makes such a body ... a call ... so the checker checks the declaration against the helper's Java signature". Wording: "a `nativeHelpers/` helper, which the stages check against its Java signature, since the parse rewrites the native's body as a call of it (F-298)".

## F-102 — pass, one wording

Fidelity. The pointer F-29 → F-383 is the assessment's fix; "walk's corpus" for "the interpreter corpus"; `SystemJUTest` and the example to the note. Meaning kept.

Comprehension. Matches. Wording: "Read in `tests/unit_tests/FileTests.java`" can be read as a path under `ProjectFortress/tests/`, the corpus the entry names; the file is `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`. Write it in full, as F-383's record did. The reader's question on `test_library/` (does the harness look there) is answered by "takes both from"; no change.

## F-383 — pass

Fidelity. "Observed in `tests/TypecaseUndefinedArmWalk.test`" is new; the rung's report holds the run (`REPORT.md` line 25: the harness read 'Failed after load' before the change; both suites ran on the change, line 84). Settled as observed. The reason moved to F-103 (hand-off 2), and F-103 already says "A compile-stage failure needs one `XXX` compile test".

Comprehension. Matches.

## Concepts for every worker, beyond `concepts.md`

- The run time's global lock (a version clock each commit moves) and a transaction's snapshot: F-351; the compiler or run-time area part (`compiler.md`), with "transaction, `atomic` block, abort".
- `concepts.md`'s other rows hold: batch's planner (core), per-site list (`gate.md`), gap ledger (core).
