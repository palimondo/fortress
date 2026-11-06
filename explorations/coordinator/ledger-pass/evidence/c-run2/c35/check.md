# Check of c35 (run c-run2), at base c124c6b65

mech.md: 4 lines, 0 failing. No closes, duplicates, pairs. questions.md: no row to measure, agreed (all four are static readings or rest on a captured run). silent.txt: 58 `choice`, status kept per review-queue item 265: pass.

## Row 35: FAIL (1)
Fidelity holds: `Library/FortressLibrary.fsi:1757-1770` (trait `Matrix`: `+`, `-`, unary `-`, `scale`, `mul`, `rmul`, `lmul`, `t()`, `fill`, `tabulate`; no `^`, no norm); `:1706` is the vector's norm; the workaround `M M` holds (`opr juxtaposition` on `Matrix`×`Matrix`, `.fsi:1789-1790`). Probes exist at `e879b6a44^` (p25, p26), both on `RR64[2,2]`. Spec lines 56-57, 75-81, 87-91 of the frozen `opr-overview.tex` hold the three promises. Dropped tokens: `.t()` kept as `t()`/`M.t()`; `p26_matrix_norm.fss` kept under its full path.
- Failure (cold read, Where (1)): the row does not name the path of the three errors. `Cannot unify` is walk's (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:576,595`) and the probes ran under walk (`explorations/libvector-probes/transcript.txt` at `e879b6a44^`).
  Correction: replace `The errors, in that order:` with `The errors under walk, in that order:`.
- Not a failure: cold read (2), which matrix norm; the specification does not say (`opr-overview.tex:56-57`).

## Row 50: FAIL (1)
Fidelity holds: `Evaluator.java:1014-1015` is `NI("forArrayComprehension")`; `ExprDisambiguator.scala` (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/`) has no `Comprehension` case at all, and `Variable ... is not defined.` is its message (`:450`); `git grep 'BIG \[' Library/` is empty; `preamble.tex:69-83` lists "array comprehensions"; `array[\ZZ32\](3).tabulate(fn (i: ZZ32): ZZ32 => i - 1)` is in `ProjectFortress/tests/ArrayElementAlgebra.fss:40`. Both probes exist at `e879b6a44^`. Dropped tokens: `Evaluator.java`, `Evaluator.java:885-887` false (stale, +129), re-pointed under the full path.
- Failure (cold read, Where/Could not resolve (2)): the first refusal comes from the disambiguator, a phase that both paths run, while the class says `(walk)` and the row does not say the compiled path was not tried; a worker fixing the disambiguator would not know it touches both paths.
  Correction: after `so it binds no generator variable` insert ` (a phase both paths run; the compiled path was not tried)`. Notes 657 of 700.

## Row 58: FAIL (1)
Fidelity holds: `Library/FortressLibrary.fss:2632-2641` and `.fsi:1693-1702` type the four scaling overloads `(me: Vector[\T,n\], other: T)` and `(other: T, me: Vector[\T,n\])`. Probe exists at `e879b6a44^`. Dropped tokens: the two signature forms kept in named form; `FortressLibrary.fss:2470-2480` false (now `replica`/`copy`). Status kept beside `silent`: pass.
- Failure (cold read, Could not resolve (1)): neither the path nor the error is given, so a worker cannot tell which refusal confirms the limit. The probe's run, under walk (`explorations/libvector-probes/transcript.txt:625-626` at `e879b6a44^`): `Failed to find any matching overload, args = (2.0,__DefaultVector[\Value,3\])`.
  Correction: after `so the scalar must have the element type.` insert ` Under walk, `2.0 u` fails: `Failed to find any matching overload, args = (2.0,__DefaultVector[\Value,3\])`.` Notes 510 of 700.

## Row 466: FAIL (2)
Fidelity holds: `NativeArray.fss:25-29` (comment `:27-28`), `:22` (`opr [i] := v` calls `put`); the probe `SkTwiceInit.fss` and its capture `old-spelling.txt:56-63` exist at `ab067d9b6^`, both trees print `a after a second fill: 3 3`; spec `arrays-distributed.tex:12` "Distributed Arrays", `:71` sentence and footnote. Dropped tokens: `old-spelling.txt` and its `:56-63` have a home (beside the probe in `ab067d9b6^`; its output is the claim's `3 3`); `fill` is in the claim. The dropped "It predates rung A" is a batch story; its home is the history.
- Failure 1 (Form, template "found by: ... no date and no role"; Present): `climb batch 7 rung A's skeptic` names a role.
  Correction: found-by cell `climb batch 7 rung A`.
- Failure 2 (cold read, Status and Could not resolve (1), (3); Fidelity): the notes give no fix, so class `implementation gap` and the reading of the specification point opposite ways; "the programmer must assure" at most one initialization misquotes `:71`, where the programmer must assure only that the one initialization completes before any access ("Each array element may be initialized at most once"); "validating fails after a failed transaction" is looser than the comment at `:27-28`. The old line's `Fix: validate outside a transaction, or revise the footnote` was dropped with no home in the row.
  Correction: replace the notes' text from `PrimitiveArray.init0` up to `not a duty.` with:
  `PrimitiveArray.init0` discards the `Boolean` that `init00` returns (`ProjectFortress/LibraryBuiltin/NativeArray.fss:25-29` at c124c6b65): the team's comment says validating it fails for an element initialized in a failed transaction. The specification allows at most one initialization; its footnote says the present implementation signals a fatal error on a duplicate, which walk does not. Fix: validate outside a transaction, or revise the footnote.
  and the workaround sentence with `Workaround: `a[i] := v`, which calls `put` (`NativeArray.fss:22`).` Notes about 675 of 700.
- Not a failure: class area `(prelude)` is a template area and 34 other rows use it for `LibraryBuiltin/` files.
