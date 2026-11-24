# Quiz grading, round 1 (cases 3, 18 and 32)

The answers: `quiz-answers-1.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 3, 18 and 32, as climb batch 36's update reads them (the working tree on `main` at `906bbb4607`, with the update not yet committed). The orientation graded: `orientation.md` in this folder. Each case is graded on its decision and scope, by the key's **Expected**, **Scope**, **Wrong** and **Partial** lists.

## Counts

- Right: 3 (cases 3, 18 and 32).
- Right without its path or scope qualification: 0.
- Wrong: 0.
- Wrong and counted against the orientation: 0.

No side claim checked is false. The checks: the count stage's command (`compiler.md:4`), the fourteen components and `ant testOneLibrary` (`library.md:51-55`), walk's dispatch cache and the numeral coercion (`interpreter.md:49`), `Number` declaring nothing and a program's number type below it running on both paths (`orientation.md:89`, `:112`), and the reader's one-line readings of rows 786 and 788 (`facts-extract.sh 'ledger:786' 'ledger:788'`).

## Case 3: right

- The decision is the key's: keep the pair. The reader sets the memory of the Working Draft against P-45, says that the old text survives in Appendix I, and does not explore it. This avoids both traps: the old ban, and the old text treated as a conflict.
- The validity argument is on declared domains: `Box[\Circle\]` lies strictly inside the generic's domain, so no meet is needed; both return `String`, at every instance; the domains are not equal, so No Duplicates holds.
- Which runs: for a `Box[\Circle\]` argument, the plain `describe(b: Box[\Circle\])`. The order of writing does not matter, because walk chooses by declared parameter types. The reader adds the compiled dispatch method's test from the most specific declaration to the least specific.
- Scope matches the key's **Scope**:
  - Walk loads the pair: a generic beside a plain declaration, checked on declared domains.
  - The compiled checker accepts it (P-45), checked today through the count or distance stage.
  - The reader adds that compiled programs do not link the interpreter's library before the switch-over, except with `FORTRESS_LIBRARY=one`. This is true and narrows nothing the key needs.
- None of the key's **Wrong** answers appears: no refusal, renaming or merging, no conflict, no reordering, and the generic does not run for `Box[\Circle\]`.
- Not graded: the steps of the library change. They are sound: a test first that fails today, the `.fsi` at the same header, a cold-cache rerun because a new overload can stop every program at load, the count stage for `FortressLibrary`, and nothing added to the compiler's prelude.

## Case 18: right

- Step 1 of the key: the reader finds the departure before changing code, as `ledger:416` and `ledger-find:instantiations`, and names `interpreter.md`, "What walk checks". The reader reads row 416 rightly: walk applies no instantiation exclusion, so it refuses an overload on two instantiations of one generic type.
- Step 2: the pair is valid by the exclusion rule (P-43, P-97), which the compiled checker applies, and walk is wrong. The reader also says that a library that stops every program under walk cannot land.
- Step 3: the reader takes the key's second repair. The task is a library task, the walk fix is in another area, so the reader follows the library's own way in `RangeInternals.fss`, a name of its own for the new declaration. This is the key's "distinct names by rank". The reader puts the walk fix, starting from row 416's reproducer, to the curator as a decision not taken, and notes row 416 in the ledger if the brief allows, else in the report. The key's **Open** accepts either repair.
- Scope matches the key's **Scope**: both declarations plain, both positions instances of one generic type, and walk refusing with "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present". The compiled checker accepts the pair; compiled programs before the switch-over do not link `RangeInternals`.
- None of the key's **Wrong** answers appears:
  - No reordering, no pair called invalid, no new ledger row, no edit of the compiler's prelude.
  - The stop is not matched to row 780, the example that the orientation's rule on walk's load check now gives. The reader quotes the orientation's rule on the exclusion rule, with its `Tg[\3\]` and `Tg[\4\]` example and row 416, not row 780's generic functional methods.

## Case 32: right

- The declaration is the key's:

      value object Byte(b: ZZ32) extends Number
          coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)
      end

  - The body is `Byte(v)`, and `v` converts where it stands, at `Byte`'s `ZZ32` parameter. The reader says that `x: Byte = 255` binds `Byte(255)` on both paths. The reader names no departure, and writes no getter, helper or `XXX` test of the rule. So the reader avoids the key's new **Wrong** item and the old `Byte(v.asZZ32)`.
  - `extends Number` is the key's declaration plus P-160's placement. The orientation says that such a type runs on both paths (`orientation.md:89`), and `Number` declares nothing (P-165), so it changes no answer.
- `300`, where and when:
  - Compiled, before and after the switch-over: refused statically, with the key's message, 'The numeral 300 does not meet the where clause of the coercion to Byte.' The program never runs.
  - Walk: refused when the binding runs. At the top level, while the top-level variables are initialised, which the harness counts as a refusal at load; inside `run()`, when execution reaches the binding. This is the key's split. The reader does not quote walk's messages and would take them from a run; the key does not require them.
- `z: Byte = 2 + 3`: does not bind. The reader gives the key's reason: the expression folds before the checker into the constant 5 at its default `ZZ32`, a program's own type takes it only through a coercion from that type, and coercions do not chain. It is refused statically compiled and at the binding's run under walk.
- The fixes are the key's: `z: Byte = 5`, or `Byte(2 + 3)`, which the reader says leaves the bound unchecked. The reader declines `coerce(x: ZZ32)` because it converts every `ZZ32` implicitly and checks no bound. The key credits that coercion only when bounded and said so; the reader does not offer it.
- Scope matches the key's **Scope**: the declarations and the binding of 255 on both paths, with the prelude carrying the same rules before the switch-over (P-37); the compiled value made once in the component class's static initializer, before `run()` (P-176).
- Not graded: the reader's compiled refusal test gives `compile` and `compile_err_contains=` but no file name. A compiled folder names a refusal test with `XXX` (`tests-writing.md`, "Writing an `XXX` test"). The question asks for no tests, and the reader states nothing false.

## Failed cases

None.
