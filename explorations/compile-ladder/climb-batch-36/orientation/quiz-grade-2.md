# Quiz grading, round 2 (cases 3, 18 and 32)

The answers: `quiz-answers-2.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 3, 18 and 32, as climb batch 36's update reads them (the working tree on `main` at `4c790a4d7b`, whose last two commits change only the boot note, with the update not yet committed). The orientation graded: `orientation.md` in this folder, after the writer's fix round, which deleted the row 780 example from the rule on walk's load check (`writer-2.log`). Each case is graded on its decision and scope, by the key's **Expected**, **Scope**, **Wrong** and **Partial** lists.

## Counts

- Right: 3 (cases 3, 18 and 32).
- Right without its path or scope qualification: 0.
- Wrong: 0.
- Wrong and counted against the orientation: 0.

No side claim checked is false. The checks:
- the checker's sort breaking a tie only between two generic candidates (`compiler.md:178`, rows 499, 1046, 1047);
- walk's gap for a plain declaration with no return type written (`interpreter.md:78`, row 1044);
- compiled programs before the switch-over using the compiler's prelude, and a generic compiled as a template (`SKILL.md:80`, `:90`);
- the count stage checking the `FortressLibrary` component and the apis it imports (`compiler.md:4`, `:128`);
- `RangeInternals` being one of the fourteen components (`ProjectFortress/one_library_tests/OneLibraryComponents.test:2`), so the reader's step 2 leads to the distance stage and `ant testOneLibrary`;
- a walk `XXX` test being green while walk refuses its program at load (`tests-writing.md:74`, and item 2 of "How a defect is recorded");
- walk's dispatch cache skipping a choice that asked a program's own type for its numeral coercion (`interpreter.md:49`);
- the compiled coercion run once per place in the component class's static initializer (`compiler.md:96`);
- a failure while the top-level variables are initialised counting as a refusal at load (`tests-writing.md:45`).

## Case 3: right

- The decision is the key's: keep the pair. The reader sets the memory of the Working Draft against P-45, calls it a rule of the tree and not a conflict, and does not explore. This avoids both traps.
- Validity is argued on declared domains:
  - `Box[\Circle\]` lies strictly inside the generic's domain, since generics are invariant.
  - No Duplicates and the Meet Rule hold, because the domains nest.
  - The Return Type Rule holds at every instance: both return `String`.
- Which runs: for a `Box[\Circle\]` argument, the plain `describe(b: Box[\Circle\])`, on both paths. Walk takes the more specific declared domain. The compiled dispatch method tests from the most specific declaration down.
- The order of writing does not matter on either path. The reader adds, rightly, that the checker's sort breaks only a tie between two generic candidates, which this pair is not.
- Scope matches the key's **Scope**:
  - Walk loads and runs the pair. It checks a generic beside a plain declaration on declared domains, and no listed departure covers this shape.
  - The compiled checker accepts it (P-45), checked through the count or distance stage.
  - The reader adds that compiled programs before the switch-over use the compiler's prelude and cannot call it, and that it compiles with `FORTRESS_LIBRARY=one` and after the switch-over. Both are true and narrow nothing the key needs.
- None of the key's **Wrong** answers appears: no refusal, renaming or merging, no conflict, no reordering, and the generic does not run for `Box[\Circle\]`.
- Not graded: the steps of the library change. They are sound:
  - the ledger's `find --cites` before the edit;
  - a test first that fails on the base;
  - a `COLD_CACHE=1` rerun, because a new overload can stop every program at load (row 342);
  - the count stage, or the distance stage and `ant testOneLibrary`;
  - the demo driver after the last library edit;
  - nothing added to the compiler's prelude;
  - both return types written, which avoids row 1044's gap.

## Case 18: right

- Step 1 of the key: the reader finds the departure before changing code, as `ledger:416` after `ledger-find:instantiations` and `ledger.py find --cites Library/RangeInternals.fss`, and names `interpreter.md`, "What walk checks". The reader reads row 416 rightly: walk does not read two instantiations of one generic type as excluding, so it refuses the overload with "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present". The reader names both declarations as plain, so walk applies the team's check, as the key's evidence says (`OverloadedFunction.java:420`).
- Step 2: the pair is valid by the exclusion rule (P-43, P-97), and walk is wrong. A library edit that stops every program at load cannot land as written.
- Step 3: the reader takes the key's second repair.
  - First, follow how `RangeInternals.fss` already declares its helpers for the other ranks. That is the key's "distinct names by rank", `checkSelection`, `checkSelection2D` and `checkSelection3D`.
  - Failing that, a name of its own, `checkFits1`.
  - The walk fix, row 416, goes to the curator or a later brief as a decision not taken, since it is outside a library brief.
  - The reader notes row 416 with `ledger.py note` if the brief allows ledger edits, else in the report.
  - The key's **Open** accepts either repair.
- Scope matches the key's **Scope**:
  - Both positions are instances of one generic type.
  - Walk refuses the pair at load, with the key's message (row 416).
  - The compiled checker accepts it.
- None of the key's **Wrong** answers appears:
  - No reordering, no pair called invalid, no new ledger row, no edit of the compiler's prelude.
  - The stop is not matched to row 780. The reader quotes the orientation's rule on the exclusion rule, with its `Tg[\3\]` and `Tg[\4\]` example and row 416.
- Not graded:
  - The reader doubts the count stage's silence, because `RangeInternals` is a component of its own. That is true: the count stage checks the `FortressLibrary` component and the apis it imports. `RangeInternals` is one of the fourteen components, so the reader's own step leads to the distance stage and `ant testOneLibrary`.
  - The reader plans a gated walk `XXX` test of the pair, only if no existing test covers a pair over two type arguments. It would be added to an existing `XXX` test of its kind where there is one. That follows item 2 of `tests-writing.md`, "How a defect is recorded". The key names `XXXNatSizeExclusionWalk.fss` as the gated test of this departure, which the reader's check would find. The plan is not among the key's **Wrong** answers, and it states nothing false.

## Case 32: right

- The declaration is the key's:

      value object Byte(b: ZZ32) extends Number
          coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)
      end

  - The body is `Byte(v)`, and `v` converts where it stands, at `Byte`'s `ZZ32` parameter. The reader says that `x: Byte = 255` binds the byte 255 on both paths.
  - The reader names no departure, and writes no getter, no helper and no `XXX` test of the rule. So the reader avoids the key's new **Wrong** item and the old `Byte(v.asZZ32)`.
  - `NaturalNumeral` is written only as the coercion's parameter type.
  - `extends Number` is the key's declaration plus P-160's placement. The orientation says that such a type runs on both paths, and the reader says that the coercion, not `Number`, makes numerals bind. It changes no answer.
- `300`, where and when:
  - Compiled, today under the prelude (P-37) and after the switch-over: refused statically, with the key's message, 'The numeral 300 does not meet the where clause of the coercion to Byte.' Nothing runs.
  - Walk: no static check, so the program loads, and it is refused when the binding runs. At the top level, while the top-level variables are initialised, which a walk `.test` counts as a refusal at load; inside `run()`, when that line runs. This is the key's split.
  - The reader does not quote walk's messages and would read them from a run. The key does not require them.
- `z: Byte = 2 + 3`: does not bind, on either path. The reader gives the key's reason: the expression folds before the checker into the constant 5 at its default `ZZ32`, and coercions do not chain, so `Byte`'s numeral coercion does not take it. It is refused statically on the compiled path and when the binding runs under walk.
- The fixes are the key's: `z: Byte = 5`, or `Byte(2 + 3)`, which the reader says skips the 0 to 255 check. The reader declines `coerce(x: ZZ32)` because it converts every `ZZ32` implicitly with no static bound, so that `2 + 298` would bind. The key credits that coercion only when it is bounded and the answer says so; the reader does not offer it.
- Scope matches the key's **Scope**:
  - The declaration, and the binding of 255, hold on both paths, with the prelude carrying the same rules before the switch-over (P-37).
  - On the compiled path the value is made once, in the component class's static initializer, before `run()`.
  - Walk computes it at the place's first run and reuses it (P-176).
- Not graded:
  - The reader would grep the tests for an existing numeral coercion before fixing the exact syntax. This is sound.
  - The reader says that walk's dispatch cache does not reuse a choice across numerals here. That is true (`interpreter.md:49`).

## Failed cases

None.
