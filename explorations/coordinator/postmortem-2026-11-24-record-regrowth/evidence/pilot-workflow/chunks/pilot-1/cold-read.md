# Cold read: pilot-1/clean.txt

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`; terms looked up in `references/compiler.md` (count stage, distance stage, `SEQV`), `references/tests-writing.md` (`XXX`, `load_exception_contains`, refusal at load), `references/records.md` (ledger rows). "row N" is read throughout as gap-ledger row N (SKILL.md, records.md).

All eleven entries are facts.

## F-374

- **Established:** On the compiled path, a `var` field of an object is stored as a `MutableFValue` cell that the object holds. The field is read and written by the same kind of code that the compiled path uses for a top-level `var`. A `var` value parameter is stored the same way. So an `atomic` block tracks the field, and every access to it checks whether a transaction is running, even outside `atomic`. A field without `var` gets no check. A loop body or function expression inside a method captures the cell (not a copy of the value). A `value` object with a `var` field does not compare equal under `SEQV` to another built with the same arguments, because `SEQV` compares the cells. The library's `Lazy` is such an object.
- **Conditions:** Compiled path only. The check runs on every access, inside or outside `atomic`. The cell design was a default chosen by a batch's planner, not a curator decision, so it is open to change. The `value`+`var` case is one the specification forbids but nothing refuses.
- **Consequence:** A worker can rely on `atomic` tracking `var` fields on the compiled path; must expect a per-access cost on `var` fields (row 641); must not expect two like-built `value` objects with `var` fields (e.g. `Lazy`) to be `SEQV`-equal; must not treat the cell design as a curator decision (exploring rules apply if it is challenged). Give a value object no `var` field (SKILL.md agrees).
- **Evidence:** Tests `compiler_tests/AtomicFieldCompiled`, `VarFieldCapturedCompiled`; rows 641, 112; report `compile-ladder/rung-atomic-expr-field/REPORT.md`.
- **Could not resolve:**
  - "read and written by the code of a top-level `var`": unclear wording. Read as "by the same code the compiler emits for a top-level `var`", but could be read as "by code belonging to a top-level `var`", which makes no sense.
  - "as any new nested context must": unclear wording; read as "every new nested context must capture the cell, and these do", but whether this states a rule or a defect avoided is not said.
  - "A batch's planner": unclear wording; "batch" and "planner" are not defined in the skill. The intent (not a curator decision) is clear.
  - "since `SEQV` compares the cells": compares them by identity, presumably; not stated.

## F-351

- **Established:** On the compiled path, the transaction of an `atomic` block validates its own reads and those of every enclosing (ancestor) transaction. Each read is logged together with its source: an ancestor's write, the committed value, or a marker for an empty array element; a read of the transaction's own write is not logged. Validation happens when a read sees that the global lock has moved, and at a commit that missed the lock. An abort names the transaction whose read failed, or names none when it comes from `abort()`. A block's handler restarts the block if the abort names that block's transaction or none; the outermost block restarts on any abort. On an `exit` out of the block, it commits and rethrows the exit (F-401). On any other exception, it rethrows, and a nested transaction first passes its reads to its parent. A nested commit passes its reads and writes to the parent, even with no writes. Known defect: a nested block sees a plain (non-transactional) write by another thread to its outer block's data (row 984). `atomic e` compiles as an atomic block around `e`, with that block's limits: as a later (not first) argument of a call it fails JVM verification (row 322). The checker gives `e` no declared type, so a numeral as `e`'s value is refused or fails verification (row 1043).
- **Conditions:** Compiled path only. Limits: rows 984, 322, 1043 are open defects.
- **Consequence:** A worker can rely on nested-transaction validation and restart semantics as described; must not put `atomic e` as a non-first call argument; must not use a bare numeral as the value of `atomic e`; must not assume isolation from plain writes in other threads inside nested blocks.
- **Evidence:** Tests `compiler_tests/Atomic*Compiled`; rows 984, 322, 1043; F-401; report `compile-ladder/rung-compiled-transaction/REPORT.md`.
- **Could not resolve:**
  - "the global lock moved", "a commit that missed the lock": language/runtime concept I lack and could not find in the skill. Read as a global version clock that changes on each commit, but what "missed the lock" means (failed to acquire it? found it changed?) is unclear.
  - "throws the exit on", "throws any other exception on": read as "rethrows"; idiomatic but clear enough.
  - "after a nested transaction hands its parent its reads" (on an exception): unclear whether the nested transaction's writes are discarded, and what an outermost transaction does with its state on such an exception (commits? discards?).
  - "a plain write by another thread of its outer block": unclear wording, two readings: (a) a write by another thread to a location the outer block uses; (b) a write by another thread (task) spawned within the outer block. Whether this is a defect or intended is only implied by the row citation.
  - "it fails verification as a call's later argument": read as "when it is a call's second or later argument"; plausible but terse.

## F-279

- **Established:** Under walk, slicing an `Array2` or `Array3` whose base (lower index bound) is above zero reads the right elements, with one exception: slicing a shifted `Array2` reads wrong elements. Shifting a slice, a column, a row, or an already-shifted `Array2` throws `ArrayIndexOutOfBoundsException`. A shifted array is a view made by `shift` at another base. The cause: `SubArray2.subarray` subtracts the output's base instead of its own base (row 808).
- **Conditions:** Walk only; compiled path not stated. `Array3` slices at nonzero base are fine; the shifted-slice defect is stated for `Array2` only.
- **Consequence:** Avoid slicing shifted `Array2`s and shifting slices, columns, rows or shifted `Array2`s under walk; a fix in `SubArray2.subarray` would promote `XXXArray2ShiftedSlice`.
- **Evidence:** Tests `tests/Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice` (expected failure); row 808; report `compile-ladder/rung-slices-list-equality/REPORT.md`.
- **Could not resolve:**
  - Unclear wording: which of the listed things are `SubArray2`s (a shifted `Array2`? a slice? a column or row?) — the cause names `SubArray2` but the headline names four kinds; the link is implied, not stated.
  - Whether "a shift of a slice ... of an `Array3`" also throws is not said.

## F-157

- **Established:** The language's way to make a view over a shape known only at run time is an object that implements the array trait (its `get` and `put`) over other storage, as the library's `TransposedMatrix` does. Under walk, a subtype of `Matrix` that overrides `mul` has its own product used by juxtaposition and `DOT` without any api declaration, because walk dispatches on run-time type. Under walk, the library's own views are slower than hand-written code (row 298 for the row slice, row 299 for a diagonal view).
- **Conditions:** The dispatch claim is walk-only; the compiled path was not measured. Cost claim is walk-only.
- **Consequence:** To build a view, follow `TransposedMatrix`'s pattern. On walk, overriding `mul` in a `Matrix` subtype suffices; on the compiled path, it must be checked first. Expect library views to cost more than hand code under walk.
- **Evidence:** Rows 298, 299; `reviews/c4-flatarrays-review.md` section 1; `run-c4/probes/vocabulary/diag-override.md`. No test named.
- **Could not resolve:**
  - "a view of a runtime shape": unclear wording; read as "a view whose shape is fixed at run time", but could mean "a view over a run-time data layout".
  - "with no api line": unclear wording; read as "without declaring the override in any `.fsi` file", but could mean "without a line in the program's api".
  - "the array trait": which trait (e.g. `Array`, `Array2`, `Matrix`) is not named.

## F-286

- **Established:** In `Library/FortressLibrary.fsi`, the api's `String` marks `abstract` each of the 14 members that the component's `String` trait gives no body. Under walk, `FlatString`, `CatString`, `EmptyString` and `SubString` define all 14. The `excludes` clause of `String` matches between api and component, and `AnyList` excludes `String` (`Library/List.fsi:57`). Therefore the export check finds no mismatch in `String`. `CatString.rangeContains` has the same defect as row 607: it finds only a character's first occurrence.
- **Conditions:** The "define all 14" claim is stated under walk. F-282 counts nine such members, not 14; the conflict is unresolved.
- **Consequence:** A worker can take `String` as passing the export check; must not trust `CatString.rangeContains` for repeated characters; must treat the 9-vs-14 count as open (do not cite either number as settled).
- **Evidence:** `tests/StringMembersPromisedWalk.fss`; the distance stage's per-site list; row 607; F-282; report `compile-ladder/rung-string-members/REPORT.md`.
- **Could not resolve:**
  - "the distance stage's per-site list": unclear; the skill defines the distance stage and its table, but not a "per-site list".
  - "So the export check finds no difference": the reasoning link is loose; why the `excludes` and `AnyList` facts bear on the export check is not explained.
  - "the counts disagree": which count is right, and what F-282 counts, is not said.
  - "Under walk" applied to "define all 14": unclear whether this matters for the compiled export check, which is compiled-path code.

## F-297

- **Established:** The compiled export check (original team code) requires the component to declare every api member marked `abstract`, with the api's header (signature), whether the component gives it a body or not. The `FortressLibrary` component declares all of them. A component field with the same name and type as an abstract getter, and not `hidden` or `private`, also satisfies the getter (per `Specification/basic/traits.tex`). The reverse — an api field matched by a component getter — is still refused (row 842, a defect). Walk does not compare components with their apis at all (row 841).
- **Conditions:** Compiled path; walk has no such check.
- **Consequence:** When adding an `abstract` api member, declare it in the component with the same header; a public field may stand in for an abstract getter; do not match an api field with a getter in the component. Walk will not catch a missing declaration.
- **Evidence:** `compiler_tests/*ExportAbstract*`; the distance stage's per-site list; `Specification/basic/traits.tex`; rows 841, 842; report `compile-ladder/rung-abstract-declared/REPORT.md`.
- **Could not resolve:**
  - "at the api's header": unclear wording, two readings: "with the same header (signature) as the api", or "at the place of the api's header". Read as the first.
  - "the distance stage's per-site list": as in F-286.

## F-240

- **Established:** Timings of the count stage or the distance stage are comparable only between runs under similar machine load. Load can more than double a stage's time: the distance stage took 217 s at load average 3.3 and 574 s at 4.6-5.3 on nearly the same code. The count stage's time is read from the timestamps of the gate's log files. The distance stage's `distance.txt` records its seconds and the load at its start; at a gate it may run concurrently with `testFast`.
- **Conditions:** All timings of these two stages.
- **Consequence:** Do not compare a stage time with another taken under different load; record and compare the load; be aware gate runs may overlap with `testFast`.
- **Evidence:** The two measured times; `reviews/batch-16-review.md`, section 2.
- **Could not resolve:** none.

## F-111

- **Established:** The count and distance stages (tools in `explorations/coordinator/tools/checker-count/` and `distance/`) run only the compiler's phases, up to the type check, on the interpreter's library, none of walk's code. So editing `Specification/`, `Documentation/`, the test corpora, walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`), or `explorations/` other than those tools cannot change their counts. Compiler code that refers to walk's classes does not change the checker's report. A native that the library names in a string is either a glue class (resolved only by walk) or a `nativeHelpers/` helper, which the stages check against its Java signature (F-298).
- **Conditions:** Derived from reading the tools' code, not measured. `nativeHelpers/` is not in the excluded list: editing a helper's Java signature can move the counts.
- **Consequence:** After an edit only in the listed places, a worker need not re-run the count or distance stage; after an edit to a `nativeHelpers/` helper or the compiler, it must.
- **Evidence:** Reading of the tools' code; F-298.
- **Could not resolve:**
  - "Compiler code that names walk's classes does not change the checker's report": unclear wording; read as "edits to walk classes that compiler code references do not change the report", but could mean the compiler code itself, or the act of naming.
  - "(F-298: such a helper compiles as its call)": unclear what "compiles as its call" means; the role of the parenthesis in this entry is unclear.

## F-102

- **Established:** In `ProjectFortress/tests/` (walk's corpus), a file `XXX*.fss` is an expected-failure test included in the gate: the suite fails if the test passes. It needs a `.test` file only when it names a refusal at load (F-383, `load_` keys), like any program there. An `XXX` test that imports an api with its component gets both from `ProjectFortress/test_library/`, so no new api folder is needed. The compiled corpora follow a different rule (F-103).
- **Conditions:** Walk's corpus only.
- **Consequence:** To record a deferred walk defect, add `tests/XXXName.fss`; add a `.test` only for refusal-at-load keys; put a helper api and component in `test_library/`. For compiled corpora, consult F-103.
- **Evidence:** `tests/unit_tests/FileTests.java`; the skill's `tests-writing.md`.
- **Could not resolve:**
  - "takes both from `ProjectFortress/test_library/`": slightly unclear whether the harness looks there automatically or the worker must put them there; read as both.

## F-383

- **Established:** Walk's harness treats a static error raised by a phase before the run (e.g. the disambiguator's) as a refusal at load. So a walk `.test` whose `load_` keys expect a refusal at load passes when such an error matches its keys. A compiled refusal test still needs an `XXX` name (F-103).
- **Conditions:** Walk's harness. Compiled tests follow F-103.
- **Consequence:** A walk test for a program the disambiguator rejects can use `load_exception_contains`; a compiled refusal test must be named `XXX...`.
- **Evidence:** `FileTests.java`, `InterpreterTest.thrownAtLoad` (read); `tests/TypecaseUndefinedArmWalk.test` (observed); report `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions". The skill's `tests-writing.md` agrees.
- **Could not resolve:** none.
