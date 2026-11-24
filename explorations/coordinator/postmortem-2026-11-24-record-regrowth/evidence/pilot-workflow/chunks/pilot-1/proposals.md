<!-- The FACTS clarity pass, chunk pilot-1 (2026-11-24), after its fix round from cold-read.md and check.md: ten entries, each with its meaning check, the source of each sentence and its questions for the curator. -->

# Proposals, chunk pilot-1

Base: the entries as `facts-extract.sh` printed them on 2026-11-24. Sources: `assessment.md`, `scout.md`, `cold-read.md` and `check.md` in this folder; the gap ledger's rows 112, 298, 299, 322, 607, 641, 808, 841, 842, 984 and 1043; the checks of the tree named under each entry.

Size: the ten entries come to about 8,150 characters, against 13,440 before and a check of 6,000. Three causes. F-351 took in F-374's atomic-expression claims, which have no other owner. F-111's title carries the exact list of folders that its claim covers. The fix round put back conditions that the first round had dropped, as `check.md` asked.

## Hand-offs to entries outside the chunk

These entries are not mine to rewrite. Each item is text that left one of my entries and needs an owner, or a fault found in another entry.

1. F-373 (label and exit on the compiled path) receives, from F-351: "The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first." The sorting map gives it this owner.
2. F-103 (the `XXX` rule of the compiled corpora) receives, from F-383, the reason: "A plain-named compile test is red whenever the compile reports errors." F-103 already says "A compile-stage failure needs one `XXX` compile test."
3. F-282 says "`String`'s nine among" its 66 `abstract` members. The api writes 14 of `String`'s members `abstract` (`FortressLibrary.fsi:2583-2658`, counted again on 2026-11-24). The check found F-282's nine most likely stale: it dates from rung-string-members's record (2026-10-24), before rung-abstract-declared (cc47b637d8, 2026-10-30) declared seven more `String` members in the component. A recount at F-282's own scope settles it. F-286 no longer carries a claim about it.
4. F-289 (the distance stage's setting): the sorting map merges it into F-111. F-289 is outside the chunk, so the merge is not done here.
5. Row 808 says "every subscript of a shifted `Array2` reads the wrong elements"; F-279 keeps the record's narrower "a slice". For the ledger's owner.

## The fix round

`check.md` failed F-374, F-351, F-279, F-157, F-286, F-297 and F-111, and passed F-240, F-102 and F-383. Every point it marked was fixed with its proposed wording, or with a wording checked against the source named below. F-240 and F-383 are unchanged. F-102 has one wording fix.

## F-374

> - F-374 **On the compiled path, an object's `var` field is a `MutableFValue` cell that the object holds, read and written by the same emitted code as a top-level `var`.** A `var` value parameter is one too. So an `atomic` block tracks the field, and a change to that code reaches these fields with no second edit. Each access checks for a transaction, outside `atomic` too (row 641: the check's cost). A field without `var` has no check. A loop body or function expression in a method captures the cell; a new kind of nested context must capture it too, as it does a top-level `var`'s. A batch's planner chose the cell as a default, not the curator. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is not strictly equivalent (`===`) to another built alike, since `SEQV` compares the cells by identity; the library's `Lazy` is one. Gated by `compiler_tests/AtomicFieldCompiled` and `VarFieldCapturedCompiled`. Detail: `compile-ladder/rung-atomic-expr-field/REPORT.md`.

Meaning: unchanged for the cell. The atomic-expression claims (rows 875, 322, 1043) moved to F-351, by the sorting map and the assessment.

Fix round: "strictly equivalent (`===`)" and "by identity" restored (row 112); the obligation on a new kind of nested context restored as an obligation; "a change to that code reaches these fields with no second edit" restored; "the same emitted code" for the reader's ambiguity.

Sources:
- Title and the first two sentences: the old claims 1 and 2, and the old "So a change of the transaction's variable code reaches fields with no second edit".
- "So an `atomic` block tracks the field": old claim 4. Its "(row 319, fixed)" went to the note as history.
- Row 641's sentence and "A field without `var` has no check": old claims 5 and 6.
- The capture sentence: old claims 2 and 9.
- The planner's choice: old claim 3, with "not the curator" for "the curator has not decided it".
- The `value` object: old claims 10 and 11. The example `V(1) === V(1)` and `Lazy.fss:18` went to the note.

## F-351

> - F-351 **A compiled `atomic` block's transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A transaction records each read with what it read: an ancestor's write, the committed value, or a mark for an empty array element; never a read of its own write. It validates when a read finds the global lock moved, and at a commit that finds the lock moved since its snapshot. An abort names the transaction whose read failed, or none from `abort()`. The block's handler restarts the block on an abort that names its transaction or none, and on any abort at the outermost block. It commits on an exit and throws the exit on, or runs the block again where that commit fails (F-401: exits out of atomic blocks). It throws any other exception on, after a nested transaction hands its parent its reads. A nested commit hands the parent its reads and writes, even if it wrote nothing. Open: a nested block is not isolated from a write that another arm of its outer block makes outside any nested block (row 984). `atomic e` compiles as an atomic block around `e`, with that block's limits (row 322: it fails verification as a call's later argument). The checker carries no declared type into `e`, so where the context declares a type, a numeral as `e`'s value is refused or fails verification (row 1043). Gated by `compiler_tests/Atomic*Compiled` and `NestedAtomicAbortCompiled`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`.

Meaning: unchanged. The old handler sentence carried five branches; it is now four sentences, each branch with its condition.

Fix round: the failed commit on an exit restored ("or runs the block again where that commit fails", F-401's words); "Open:" restored on row 984, with the row's own reading ("another arm of its outer block ... outside any nested block"); row 1043's condition "where the context declares a type" restored; "a commit that finds the lock moved since its snapshot" for "missed the lock" (`Transaction.handOver`, per `check.md`); `NestedAtomicAbortCompiled` named again in the gate.

Sources: the old text, claim by claim (the scout's C1 to C5 and C7); rows 322, 984 and 1043 by the ledger's own words. The order "after a nested transaction hands its parent its reads" is read in `BaseTask.leaveTransaction`, which calls `TXLeave` before it throws the exception on (`runtimeSystem/BaseTask.java:310-322`, checked 2026-11-24). `ArrayStoreJUTest` is at `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ArrayStoreJUTest.java`, checked 2026-11-24.

## F-279

> - F-279 **Under walk, a slice of an `Array2` or `Array3` based above zero reads the right elements, except a slice of a shifted `Array2`; a shift of an `Array2`'s slice, column or row, or of a shifted `Array2`, throws.** A shifted array is a view that `shift` made at another base. A slice or a shift of an `Array2` is a `SubArray2` view. `SubArray2`'s own `subarray`, which slices such a view again, subtracts the output's base instead of its own (row 808). So a slice of a shifted `Array2` reads the wrong elements, and those shifts end in `ArrayIndexOutOfBoundsException`. Gated by `tests/Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase` and `XXXArray2ShiftedSlice`. Detail: `compile-ladder/rung-slices-list-equality/REPORT.md`.

Meaning: unchanged. The title names both limits, as the assessment asked.

Fix round: the shifts bound to an `Array2`'s slice, column or row (row 808 covers `SubArray2` only). The link from the four kinds to `SubArray2` stated. `check.md` asked to check that a slice of an unshifted `Array2` is a `SubArray2`: `Array2.subarray` returns a `SubArray2` (`Library/FortressLibrary.fss:2996-2999`), and `Array2.shift` makes one through `__subarray` (`:2982-2988`), checked 2026-11-24. The entry does not say that a column or a row is a `SubArray2`: `Col` and `Row` are their own objects (`:3088`, `:3099`); the record's "so" for their shifts is kept as it was.

Sources: old claims 1 to 5. The definition of a shifted array is from row 808's example, `s = a.shift((1,1))` of a 0-based array.

## F-157

> - F-157 **The language's idiom for a view of a runtime shape is an object that implements an array trait (`Array` or a subtrait such as `Matrix`), with its `get` and `put`, over other storage, as the library's `TransposedMatrix` does.** Under walk, a subtype of `Matrix` that overrides `mul` gets its own product through the library's `Matrix` juxtaposition and `DOT`, which call `mul`. It needs no declaration of the override in any api, since walk dispatches on the run-time type; the compiled path was not measured. Two measurements under walk found library views slower than hand-written code: the row slice (row 298) and a diagonal as a `Matrix` view in a product (row 299). Detail: `reviews/c4-flatarrays-review.md` section 1; `run-c4/probes/vocabulary/diag-override.md`.

Meaning: unchanged. "The override was measured under walk only" is now "the compiled path was not measured", the same limit.

Fix round: the cost bound to its two measurements; "which call `mul`" restored; "no declaration of the override in any api" for "no api line"; the array trait named (`TransposedMatrix` implements `Matrix`, `FortressLibrary.fss:3210`; `Array` declares `get` and `put`, `FortressLibrary.fsi:1612`, per `check.md`).

Sources: old claims 1 to 5. The timings stay in rows 298 and 299; the probe's 58 to 63 times against row 299's 54 went to the note.

## F-286

> - F-286 **The api's `String` writes `abstract` on every member that its component's trait leaves without a body, and every string object defines them.** `Library/FortressLibrary.fsi` writes 14 such members. Under walk `FlatString`, `CatString`, `EmptyString` and `SubString` define all 14. `String`'s `excludes` clause is the same in api and component, and `AnyList` excludes `String` itself (`Library/List.fsi:57`). So the export check finds no difference in `String` (F-282: what the export check compares). `CatString.rangeContains` answers what its flat halves answer, so it shares row 607's defect: each half finds only a character's first occurrence. Gated by `tests/StringMembersPromisedWalk.fss` and the distance stage's per-site list. Detail: `compile-ladder/rung-string-members/REPORT.md`.

Meaning: unchanged.

Fix round: the claim about F-282's count removed from the entry and left in hand-off 3; the pointer to F-282 now says what F-282 holds; "answers what its flat halves answer" restored, so the miss is per half (row 607).

Sources: old claims 1 to 7. The cite `List.fsi:55` was a comment; the declaration `trait AnyList excludes { Number, HasRank, String }` is at `:57`, checked 2026-11-24. The count of 14 was checked again on 2026-11-24.

## F-297

> - F-297 **The compiled export check asks the component to declare each api member written `abstract`, at the header that the api gives it (its name, parameters and return type), with a body or without one; the `FortressLibrary` component declares them all.** The check reads every api member, as the original team's check did; the match of an abstract member and the field for a getter are the revival's. A component field of an abstract getter's name and type, neither `hidden` nor `private`, also meets the getter (`Specification/basic/traits.tex`). An api field met by a component getter is still refused (row 842). Walk compares no component with its apis (row 841). Gated by `compiler_tests/*ExportAbstract*` and the distance stage's per-site list. Detail: `compile-ladder/rung-abstract-declared/REPORT.md`.

Meaning: unchanged from the record. The first round's "The check is the original team's code" was false; the record's "the team's 2009 comparison" named only the count of every member.

Fix round: the false sentence replaced from the commits that `check.md` read: cc47b637d8 added `equalAbstractMember` with the getter-by-field case and set `equalListMembers` back to counting every api member, as the team's check did from 2009. "At the api's header" explained.

Sources: old claims 1, 2, 4, 5, 7 and 8. The pattern `*ExportAbstract*` matches exactly the five tests of the old list, checked 2026-11-24.

Decision not taken: `check.md` notes that F-282 restates this rule nearly whole. Pointing F-297 to F-282, or cutting F-282's copy, is F-282's owner's call; not done here.

## F-240

> - F-240 **A time of the checker's count or distance stage compares only with one taken under a like machine load.** Load can more than double a stage: on nearly the same code, the distance stage took 217 s at a load average of 3.3 and 574 s at 4.6 to 5.3. The count stage's time is read from the file times of the gate's log. The distance stage's `distance.txt` gives its seconds and its load at the start; at a gate it can run beside `testFast`. Detail: `reviews/batch-16-review.md`, section 2.

Meaning: changed in its subject, by the assessment's disposition. The old title was the times at climb batch 36's gate, a value that changes at each gate. The new title is the old entry's lasting rule, its last sentence. The old times by gate went to the note. The check passed it.

Sources: old claims 6 and 7. The 217 s and 574 s are in `reviews/batch-16-review.md`, line 41. The seconds and the start load are rows `#seconds` and `#machine` of `climb-batch-36/gate/distance.txt`, checked 2026-11-24.

Question for the curator: should one gate's stage times stay in the entry, as one bounded measurement? The assessment allows it. The proposal leaves them in the note, since each gate's `distance.txt` holds the distance stage's seconds.

## F-111

> - F-111 **The checker-count and distance stages run only the compiler's phases, so an edit under `Specification/`, `Documentation/`, the test corpora, walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`), or `explorations/` outside the stages' tools cannot move their counts.** The tools are `explorations/coordinator/tools/checker-count/` and `distance/`. Both run the compiled checker on the interpreter's library, through the compiler's phases up to the type check, none of them walk's. Compiler code that names walk's classes, such as `SimpleClassLoader`, does not change what the checker reports. A native that the library names in a string is a glue class, which only walk resolves, or a `nativeHelpers/` helper. The stages check a helper against its Java signature, since the parse rewrites the native's body as a call of it (F-298). Read in the tools' code and the compiler's, not measured.

Meaning: one correction, false today in the old text. The count stage no longer runs the whole `PhaseOrder.compilerPhaseOrder`. It runs `WorldFlip -stop check` (`checker-count/run.sh:97`), which `WorldFlip.throughChecker` cuts to that order up to and including the type check, as `DistanceMulti -order check` does. Checked 2026-11-24, and again by `check.md`.

Fix round: the evidence restored to the tools' code and the compiler's; `SimpleClassLoader` restored as the example; the F-298 pointer now says what the parse does (F-298's own words).

Sources: old claims C1, C2, C4 and C5; C3 corrected; C6 to the note.

## F-102

> - F-102 **An `XXX*.fss` file in `ProjectFortress/tests/`, walk's corpus, is a gated expected-failure test: the suite goes red if it passes.** It needs a `.test` file only to name a refusal at load, as any program there does (F-383: walk's `load_` keys). An `XXX` test that imports an api with its component takes both from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora differ (F-103: `XXX` in `compiler_tests/`). Read in `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`; the `fortress-repo` skill's `tests-writing.md` agrees.

Meaning: unchanged. The pointer now goes to F-383, which holds the `load_` keys, instead of F-29, which does not.

Fix round: `FileTests.java` given its full path, so that it does not read as a file of the corpus.

## F-383

> - F-383 **Walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load, so a walk `.test` whose `load_` keys expect a refusal at load passes on such an error that its keys match.** Read in `FileTests.java`, `InterpreterTest.thrownAtLoad`; observed in `tests/TypecaseUndefinedArmWalk.test`. A compiled refusal test still needs an `XXX` name (F-103: the compiled corpora's `XXX` rule). Detail: `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".

Meaning: unchanged. The reason for the `XXX` name went to F-103 (hand-off 2), and a pointer stays. The check passed it and settled "observed" from the rung's report (lines 25 and 84).
