# Cold read 2: pilot-1/clean.txt

Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and lookups in `references/compiler.md` (count stage, distance stage, `SEQV`, rows 112, 322, 1043) and `references/tests-writing.md` (`XXX`, `load_exception_contains`). All eleven entries are facts.

## F-374: a `var` field on the compiled path is a `MutableFValue` cell

- **Established:** In compiled code, each `var` field of an object, and each `var` value parameter, is stored as a `MutableFValue` cell that the object holds. The code that reads and writes the cell is the same code that reads and writes a top-level `var`. So `atomic` tracks these fields, and a change to that shared code reaches the fields too, with no second edit.
- **Conditions:** Compiled path only. Each access checks whether a transaction is running, also outside `atomic`. That check costs time (row 641). An immutable field has no cell and no check. A batch's planner chose the cell design as a default. The curator did not decide it.
- **Consequence:** A loop body or a function expression inside a method captures the cell. If someone adds a new kind of nested context, it must capture the cell as well, as it does for a top-level `var`. A `value` object with a `var` field is not `===` to another one built the same way, because `SEQV` compares the cells by identity. The library's `Lazy` is such an object. The specification forbids a `var` field in a value object, but nothing refuses one (row 112).
- **Evidence:** `compiler_tests/AtomicFieldCompiled` and `VarFieldCapturedCompiled`. Detail in `compile-ladder/rung-atomic-expr-field/REPORT.md`.
- **Could not resolve:**
  - "row 641" and "row 112": I took these to be gap-ledger rows. The entry does not say so. Row 112 is confirmed in `compiler.md`. Row 641's content (how large the cost is) is not stated. This is unclear wording.
  - "as it does a top-level `var`'s": I read it as "the same way existing contexts capture a top-level `var`'s cell". It could also mean that the new context must also capture top-level vars. The wording has two readings.
  - "`SEQV` compares the cells": the skill says only that `SEQV` reads the value mark. I inferred that `===` is `SEQV`, and that a value object's `SEQV` compares field by field, so the field cells are compared by reference. This is a language concept I lack. It is partly found in the skill.
  - "A batch's planner chose the cell as a default, not the curator": I understood it to mean that this is not a curator decision and could be revisited. The entry does not say what a worker may do about it. This is unclear wording.

## F-351: compiled `atomic` transactions, validation and abort

- **Established:** A compiled transaction records each read together with what it saw: a value written by an ancestor transaction, the committed value, or a mark for an empty array element. It never records a read of its own write. It validates itself and all its ancestors when a read finds that the global lock has moved, and at commit when the lock has moved since its snapshot. An abort names the transaction whose read failed, or names none if it came from `abort()`.
  - The block's handler restarts the block when the abort names its own transaction or none. The outermost block restarts on any abort.
  - On an exit, the block commits and rethrows the exit. If that commit fails, it reruns the block (F-401).
  - On any other exception, the block rethrows it. A nested transaction first hands its reads to its parent.
  - A nested commit hands its reads and writes to the parent, even when it wrote nothing.
  - `atomic e` compiles as an atomic block around `e`.
- **Conditions:** Compiled path only.
  - Still open: a nested block is not isolated from a write that another arm of the outer block makes outside any nested block (row 984).
  - `atomic e` shares the block's limits. As a call's later argument, it fails verification (row 322).
  - Where the context declares a type, a numeral as `e`'s value is refused or fails verification, because the checker carries no declared type into `e` (row 1043).
- **Consequence:** A worker can rely on restart, validation and nested-commit behaviour as described. A worker must avoid `atomic e` as a later call argument and numeral-valued `atomic e` at a typed place. Row 984 is unfinished work.
- **Evidence:** `compiler_tests/Atomic*Compiled` and `NestedAtomicAbortCompiled`. Detail in `compile-ladder/rung-compiled-transaction/REPORT.md`.
- **Could not resolve:**
  - "the global lock moved": no definition of a global lock or what "moved" means. I guessed a version counter that changes on each commit. This is a runtime concept I lack, and the skill does not have it.
  - "a mark for an empty array element": I could not tell what is empty (an uninitialised element?) or why it needs a mark. This is a concept I lack.
  - "another arm of its outer block": "arm" is undefined. I guessed a parallel branch, such as a tuple element or a `also do` part, running inside the outer atomic block. This is unclear wording, or a concept I lack.
  - "It throws any other exception on, after a nested transaction hands its parent its reads": I could not tell whether only a nested transaction hands over its reads on the exception path, or whether this is a general ordering. The wording has two readings.
  - "throws the exit on" / "throws ... on": an idiom for rethrow. It is understandable but awkward.
  - "validates itself and every ancestor" (headline) vs "validates when a read finds...": the trigger is clear, but the scope (all ancestors at each validation?) relies on the headline alone. The entry is mostly clear.

## F-279: `Array2`/`Array3` slices and shifts at a nonzero base, under walk

- **Established:** Under walk, a slice of an `Array2` or `Array3` whose base is above zero reads the correct elements, with two failures:
  - A slice of a shifted `Array2` reads the wrong elements.
  - Shifting an `Array2`'s slice, column or row, or shifting a shifted `Array2`, throws `ArrayIndexOutOfBoundsException`.

  The cause: a slice or shift of an `Array2` is a `SubArray2` view. `SubArray2.subarray`, which re-slices such a view, subtracts the wrong base (row 808).
- **Conditions:** Walk only. The compiled path is not stated. `Array3` shifts are not stated, nor whether a slice of a shifted `Array3` works.
- **Consequence:** Do not rely on slicing a shifted `Array2`, or on shifting `Array2` sub-views, under walk. Fixing `SubArray2.subarray` should fix both failures, and would turn `XXXArray2ShiftedSlice` red, which then needs promotion.
- **Evidence:** `tests/Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase` and `XXXArray2ShiftedSlice`. Detail in `compile-ladder/rung-slices-list-equality/REPORT.md`.
- **Could not resolve:**
  - "subtracts the output's base instead of its own": "its own" could be the view's base or the underlying array's base. I could not work out the exact arithmetic error. This is unclear wording.
  - "those shifts end in `ArrayIndexOutOfBoundsException`": "So ... those shifts" ties the shift failures to the same `subarray` bug. It is unclear whether a shift goes through `subarray`. This is unclear wording.
  - The headline packs two exceptions into one sentence ("except ...; a shift ... throws"). It needs a second read.
  - It is not stated whether `XXXArray2ShiftedSlice` covers the wrong read, the throw, or both. This is unclear wording.

## F-157: the idiom for a view is an object implementing an array trait

- **Established:** In Fortress, the idiomatic way to present storage in another shape is an object that implements `Array` or a subtrait such as `Matrix`, with its own `get` and `put` over the other storage, as the library's `TransposedMatrix` does. Under walk, a `Matrix` subtype that overrides `mul` has its own product used by the library's juxtaposition and `DOT`, which call `mul`. No api needs to declare the override, because walk dispatches on the run-time type.
- **Conditions:** The override result holds under walk. The compiled path was not measured. Under walk, two measured library views were slower than hand-written code: the row slice (row 298) and a diagonal used as a `Matrix` view in a product (row 299).
- **Consequence:** To build a view, follow `TransposedMatrix`'s pattern. Expect library views to be slower under walk. Do not assume the `mul` override works compiled.
- **Evidence:** `reviews/c4-flatarrays-review.md` section 1, and `run-c4/probes/vocabulary/diag-override.md`. No gating test is named.
- **Could not resolve:**
  - "a view of a runtime shape": I took it to mean a shape known only at run time, as opposed to a static size. It could also mean "a view that reshapes at run time". This is unclear wording.
  - "the row slice (row 298)": "row" is used twice with two meanings, an array row and a ledger row. I read it as "slicing a matrix row, ledger row 298". This is unclear wording.
  - The entry does not say whether this idiom is a curator decision or only an observation from the library. I read it as a fact.

## F-286: the api's `String` marks unbodied members `abstract`, and every string object defines them

- **Established:** In `Library/FortressLibrary.fsi`, the `String` trait writes `abstract` on the 14 members that the component's `String` trait leaves without a body. Under walk, `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14. The `excludes` clause of `String` matches between api and component, and `AnyList` excludes `String` (`Library/List.fsi:57`). So the export check finds no difference for `String` (F-282).
- **Conditions:** The headline says "every string object", but the body lists only those four, "under walk". `CatString.rangeContains` delegates to its flat halves, so it inherits row 607's defect: each half finds only the first occurrence of a character.
- **Consequence:** A worker need not fix `String` for the export check. `CatString.rangeContains` is wrong where row 607 applies.
- **Evidence:** `tests/StringMembersPromisedWalk.fss`, and the distance stage's per-site list. Detail in `compile-ladder/rung-string-members/REPORT.md`.
- **Could not resolve:**
  - "every string object" vs "Under walk ... define all 14": I could not tell whether these objects define the members on the compiled path too, or whether "under walk" only names how it was tested. This is unclear wording.
  - "the distance stage's per-site list": I could not find what a per-site list is. The skill defines the stage's table of errors, but not this list. This is a concept I lack.
  - "rangeContains" and "row 607's defect": the behaviour is described ("finds only a character's first occurrence"), but the operation's intended meaning is not. I lack the library concept.
  - Why `AnyList` excluding `String` matters to the export check is not explained. I accepted it as given.

## F-297: the compiled export check asks the component to declare each `abstract` api member

- **Established:** The compiled export check requires the component to declare every api member that the api marks `abstract`, with the same header (name, parameters, return type). A body is optional. The `FortressLibrary` component meets this for all such members. The check reads every api member, as the original check did. Matching abstract members and letting a field satisfy a getter are additions by the revival. A component field with the abstract getter's name and type, neither `hidden` nor `private`, satisfies the getter (`Specification/basic/traits.tex`).
- **Conditions:** Compiled path only. The reverse case is still refused: an api field met by a component getter (row 842). Walk does not compare components with their apis at all (row 841).
- **Consequence:** When a worker adds an `abstract` member to an api, they must declare it in the component with the same header. To satisfy an abstract getter, they can use a public field of matching name and type. They must not use a getter to satisfy an api field. Walk will not catch a mismatch.
- **Evidence:** `compiler_tests/*ExportAbstract*`, and the distance stage's per-site list. Detail in `compile-ladder/rung-abstract-declared/REPORT.md`.
- **Could not resolve:**
  - "the match of an abstract member and the field for a getter are the revival's": I read it as "the revival added the matching of abstract members, and the rule that a field can satisfy a getter". The sentence is hard to parse. This is unclear wording.
  - "the distance stage's per-site list": as in F-286, a concept I lack.

## F-240: compare stage times only under like machine load

- **Established:** The wall time of the checker's count stage or distance stage is comparable only with a time taken under similar machine load. Load can more than double a stage. On nearly the same code, the distance stage took 217 s at load 3.3 and 574 s at load 4.6 to 5.3.
- **Conditions:** Applies to both stages' timings. The count stage's time is read from the file times of the gate's log. The distance stage's `distance.txt` records its seconds and the load at its start. At a gate, the distance stage may run alongside `testFast`, which raises the load.
- **Consequence:** Before claiming a speed-up or slow-down of a stage, compare load averages. Treat a gate-time distance figure as possibly inflated.
- **Evidence:** `reviews/batch-16-review.md`, section 2. No test is named.
- **Could not resolve:** Nothing material. "Like machine load" has no threshold, so how close counts as "like" is left to judgement.

## F-111: edits outside the compiler's phases cannot move the count and distance stages

- **Established:** The count and distance stages run only the compiler's phases, up to the type check, on the interpreter's library, using the compiled checker. So edits to these places cannot change their counts:
  - `Specification/` and `Documentation/`;
  - the test corpora;
  - walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`);
  - `explorations/`, other than the stages' tools.

  The stages' tools are `explorations/coordinator/tools/checker-count/` and `distance/`. Compiler code that names walk classes, such as `SimpleClassLoader`, does not change what the checker reports.
- **Conditions:** A native that the library names in a string is either a glue class, which only walk resolves, or a `nativeHelpers/` helper. The stages check a helper against its Java signature, because the parse rewrites the native's body as a call of it (F-298). So editing a `nativeHelpers/` helper's signature can move the counts, and is not on the safe list. The claim comes from reading the code, not from a measurement.
- **Consequence:** After an edit only in the listed places, a worker need not rerun the count or distance stage. After an edit to the compiler, the checker, the library or a `nativeHelpers/` signature, they must rerun it.
- **Evidence:** Read in the tools' code and the compiler's. Not measured.
- **Could not resolve:**
  - The two sentences about natives state that helpers are checked, but they do not say plainly that this is an exception to the headline. I inferred it. This is unclear wording.
  - "Compiler code that names walk's classes ... does not change what the checker reports": I could not tell whether this is a further safe edit, or only a reassurance that a reference to walk classes does not pull walk in. This is unclear wording.

## F-102: an `XXX*.fss` in walk's corpus is a gated expected-failure test

- **Established:** In `ProjectFortress/tests/` (walk's corpus), a file named `XXX*.fss` is an expected-failure test that the suite gates: the suite goes red if the test passes. It needs a `.test` file only when it names a refusal at load (F-383). An `XXX` test that imports an api with its component takes both from `ProjectFortress/test_library/`, so no new api folder is needed.
- **Conditions:** Walk's corpus only. The compiled corpora have different `XXX` rules (F-103).
- **Consequence:** To record a walk defect, add `tests/XXXName.fss` with no `.test` file, unless it is a refusal at load. Put any helper api and component in `test_library/`.
- **Evidence:** Read in `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`. The skill's `tests-writing.md` agrees, and I confirmed this at its lines 45 and 74.
- **Could not resolve:**
  - "takes both from `ProjectFortress/test_library/`, so it needs no new api folder": I could not tell whether the worker must place them there, or whether the harness already looks there. This is unclear wording.

## F-383: walk's harness counts an early phase's static error as a refusal at load

- **Established:** A static error that a phase raises before the run, such as one from the disambiguator, counts as a refusal at load in walk's harness. So a walk `.test` whose `load_` keys (for example `load_exception_contains`) expect a refusal at load passes when such an error matches its keys.
- **Conditions:** Walk's harness only. A compiled refusal test still needs an `XXX` name (F-103).
- **Consequence:** A worker can write a plain walk `.test` with `load_` keys to assert a static error from a phase. No `XXX` name is needed under walk.
- **Evidence:** Read in `FileTests.java` (`InterpreterTest.thrownAtLoad`). Observed in `tests/TypecaseUndefinedArmWalk.test`. Detail in `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".
- **Could not resolve:** Nothing. "`load_` keys" is explained by `tests-writing.md` line 45.
