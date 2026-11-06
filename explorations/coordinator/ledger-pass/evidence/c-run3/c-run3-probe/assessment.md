# Assessment, prober of c-run3

Each block: the question, the output's lines that matter (whole in `runs.md`), the disposition. Lines in `rows.rewrite`, closes in `closes.txt`. Runs at the main tree's head 371a268b8, whose library, implementation and `bin/` equal the base c124c6b65's.

## Row 135 (c10): does `BIG UNION` over a generator of maps still need its static arguments under walk?
- Output: `typed = {a|->1, b|->2, c|->30}`, `untyped = {a|->1, b|->2, c|->30}`, exit 0.
- Disposition: **close**, the first outcome, against `20474c144` (in the base; it instantiates an unwritten big operator by its value's declared type, else by its elements' join, which both bindings exercise; by reading, not bisected), test `none`: no gated test asserts this shape. A test is owed: `queue.md`.

## Row 747 (c10): the checker on `fail(` in the `else` of an `if` with a generator clause
- Not run: it needs a library edit in a seeded worktree and a background count stage. **queue**; the judge's line in `c10/final.rewrite` stands.

## Row 307 (c14, optional): does `NatReflectTest` still stop in the class loader compiled?
- Output: compile exit 0; run exit 1, 'Unable to read serialized data for NatReflect$N??', `Resource not found : NatReflect$N??.xlation`.
- Disposition: **rewrite** of the judge's line (`c14/final.rewrite`), its one sentence re-pinned from `a1a75716a` to c124c6b65 with the exit code; the rest is the judge's.

## Row 499 (c21, optional): walk's answer for `XXXGenericPositionalFixed`
- Output: walk `REACHED`, `PASS` (its asserts want `fixed` for the `Fixed` value).
- Disposition: **rewrite** of the judge's line (`c21/final.rewrite`): "walk's answer since row 159's fix is not measured" becomes "walk answers `fixed` (at c124c6b65)"; the defect is the compiled path's alone.

## Row 77 (c25): does the checker still refuse `t.tsum()` on a closed trait?
- Output: compile exit 255, `No such method Tree.tsum.` at `8:18-24`, `8:29-35`, `12:18-24`; walk `p20 3.0`.
- Disposition: **rewrite**, the first outcome: the probe "in the parent of `c69cb2064`" in place of "no longer in the tree", the walk run added, a workaround (an abstract `tsum()` in `Tree`, by the language's rule; not run). Nothing dropped.

## Row 78 (c25): does the checker still refuse `tsum(t)` with overloads only on the listed types?
- Output: compile exit 255, 'Could not check call to function tsum', `Leaf->RR64 is not applicable to an argument of type Tree.`, and `Node`'s, at three calls; walk `p10 3.0`.
- Disposition: **rewrite**, the first outcome: the probe's path from history, the walk run. Nothing dropped.

## Row 83 (c25, CONTESTED): a `nat` generic in an api's own signature
- Output: walk `first 3.0`, `second 10.0`, `first again 3.0`, exit 0; compiled `Array1 is undefined.` (the prelude).
- Disposition: **rewrite**, presentation only, status kept `CONTESTED`: the run states the last untested case; the old Run C path is given "in the parent of `4ebf80aec`". The `RETIRED` change is the curator's: `queue.md`. Dropped: "an API + component pair built here did not isolate it" (the history keeps it; the new case supersedes it).

## Row 184 (c29): `≡` on a user object
- Output: `before`, then `** bug! Expect all oprefs to be top level EQV`, exit 1, for a plain call, no DSL.
- Disposition: **rewrite**, the first outcome: "Verified on the retired first library only" dropped, `Evaluator.java:896` pinned (`getOp`, read at c124c6b65), reproducer `none` with the program in the notes; an `XXX` test is owed (`queue.md`). Dropped: the `0ff5eae27~1` worktree and `explorations/apl/v1/base` (history). `silent.txt`: defect.

## Row 30 (c33): `SUM` over a user `Number` with a top-level `+`
- Output: `user top-level +: W(3.0)`; then 'Failed to find any matching overload, args = (W,W)' at `FortressLibrary.fss:3448:27` (`SumReduction.join`), candidates the library's `+` only; exit 1.
- Disposition: **rewrite**, the third outcome: "silently falls back" and "the silent fallback is a library bug" dropped; the claim is now a dispatch failure inside the reduction. Added: walk takes `SUM` at `W` though `W` is not an `AdditiveGroup[\W\]` (`SumReduction`'s bound, read at `:3445`); not its own row here, a lead. Dropped: `6.0`, `W(6.0)` (the old output; history).

## Row 145 (c33): `false AND bump()` under walk
- Output: `bump ran 1 time(s)` for the bare form, `0 time(s)` for the thunk, `true OR bump()` 1, exit 0, with the APL path.
- Disposition: **rewrite**, the first outcome: pins `Library/FortressLibrary.fsi:2649`, `:2651` (and `OR`'s `:2648`, `:2650`) at c124c6b65, the `FORTRESS_SOURCE_PATH` named through `REPORT.md`'s "How to run". Dropped for length: the `⍋` guard's text and its `Index of dimension 1 out of bounds` message (history).

## Row 164 (c33): the untyped lambda between two arrow-typed overloads
- Output: the question's program stops at `fill` (a probe bug: `fill` takes a value since `f3b62bc83`). One change, `fill` made `tabulate`: `(3) untyped scalar lambda -> vector-result overload: 3.0`, (1) and (2) right.
- Disposition: **rewrite**, the first outcome: the site pinned by reading, `FunctionClosure.java:257` (an unwritten return type is `BottomType`, so the lambda's arrow fits both); the probe's path keeps, with the `tabulate` change named. Dropped: `G158.fss:7` (the line number of the old probe; history).

## Row 240 (c33): an `Any`-result overloaded family
- Output (with `tabulate`): `objres(f, v) = 1.5   objres(f, m) = 2.5`, `anyres(f, v) = 1.5`, exit 0.
- Disposition: **close**, the second outcome, against `8f7e183d4` (in the base; it adds `forAnyType` to `MakeInferenceSpecific`, row 157's fix, the row's named neighbour), test `ProjectFortress/tests/GenericReturningAny.fss`. By reading, not bisected: `queue.md`. Row 258's dependent sentence rewritten (below).

## Row 258 (c33, dependent on 240)
- Disposition: **rewrite** of the judge's line (`c33/final.rewrite`): "An `Any` result kills the family's dispatch (row 240), so `Object` is the one type left." becomes "An `Any` result now dispatches (row 240, closed), so `Object` is not forced." Status `CONTESTED` kept.

## Row 297 (c33): the `^T` pair over `Matrix` and the rank-3 `Array`
- Output (with `tabulate`): loads and prints both, exit 0, warm and cold. Control: the plain rank-2 `Array` member beside the rank-3 one is refused, 'are unrelated ... no excluding pair is present'.
- Disposition: **none written; queue**. The claim is false at the base, so a close is owed, but its commit needs a bisect (candidates `6d187d069`, `14e91723f`, `c41c3d2b0`), which this brief forbids. The row's line and its sibling marks stay until the close.

## Row 444 (c33): dotted-method overloading across inheritance under walk
- Output: both programs print `1`, `2`, exit 0, cold.
- Disposition: **rewrite**, the first outcome: the Diamond sentence dropped (`XXXDottedMethodMeetInheritedWalk` is row 735's reproducer, in its judged line), 735 added to `siblings:`; `OverloadedFunction.java:1761-1773` dropped (the evidence: the words moved, `OverloadedMethod` now at `:2502`, no pin re-read that holds the comparison), `Constructor.java:383-388` given with its folder (re-read: `new OverloadedMethod(ent.getKey(), s, getWithin())`). The `XXX` test is owed: `queue.md`.

## Row 229 (c43, optional)
- Output: `s07_chain.fss:8:51-59: Variable apl is not defined.`, exit 255.
- Disposition: **keep** the judge's line (`c43/final.rewrite`): it holds as written. No new line.

## Row 235 (c43, optional)
- Output: `t02_gram.fss` stops at load: AplCore's `opr ×(a: RR64, b: RR64)` (`:1209`) and the library's `RR64` `TIMES` (`:462`) 'have the same types'; no `TA gaps` line.
- Disposition: **rewrite** of the judge's line: reproducer `none`, the stop stated, the old output kept as past. Dropped for length: "Run as `explorations/apl/rung-3/REPORT.md`, 'How to run', says" (in the judge's line and the history). `silent.txt`: choice, as the judge wrote. The APL base's pair: `queue.md`.

## mech.py
- `MECH: 14 lines, 0 failing, every check passes.`
