# Chunk c1 of run c-run1, base c124c6b65

Marks: P pass, F fail, U unresolved.

## Row 188: rewrite (to RETIRED)

- Scope P. Present meaning F: "`RR64.truncate()` is declared in the library's api but has no implementation at run time", against its own last note "Not reproduced at 64386618b: `truncate(7.0)` under walk is the `ZZ64` 7". Evidence F: the probe's source (`git show 1ee3b0bc5^:explorations/apl/v1-probes/p01_numfmt.fss`) calls `v.truncate()` and `v.truncate().narrow()`, dotted calls of functional methods; `truncate(self)` is a functional method, which `Specification/basic/traits.tex`, "Method Declarations", makes a top-level function, called as a naked invocation (`basic/expressions/function-calls.tex:21-34`). 'Cannot find definition for method truncate given receiver 7.0' is walk's dotted-method lookup failing, as it should. Comprehension P. Ownership F: the note "Not reproduced at 64386618b ... (climb batch 22, rung E)" is a batch story. Consistency F: `FortressLibrary.fsi:332` now holds `opr CMP`; `truncate(self):ZZ64` is at `:382`.
- Why not a close: no commit fixed anything. At `0ff5eae27~1`, the probe's base, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:188` already defined `truncate(self):ZZ64` for `Float`; the defect was the probe's spelling. PLAN.md:546 asks "Should the two be closed, and against which commit, or retired?"; the dotted calls answer it: retired. Its default ("each stays open as it stands") was set until the ledger repair (`reviews/batch-22-review.md:806`), which is this pass. If the curator wants PLAN:546 answered by him first, this line waits on it; the status is the only point at stake.
- The silent rule: the row is `NEGATIVE-VERIFIED` beside `silent`, but the new line is not another open status, it retires the claim, and the specification is not silent on the mechanism (`basic/traits.tex`, "Method Declarations"), so the spec cell changes. `silent.txt` gives "choice".
- Read beyond the evidence: the probe from history; `0ff5eae27~1`'s and `d846e3644`'s library lines for `truncate`; `compile-ladder/rung-export-last/REPORT.md` sections 6 and 10 and `SKEPTIC.md:81`; PLAN.md:546; `reviews/batch-22-review.md:806`; the spec lines above; `tests/NativeHelperFamilyFloatWalk.fss:240-245` and `ExportAlignedMembersWalk.fss:43-47`, which assert `truncate` under walk.
- Facts dropped and their homes: the `narrow` half ('... given receiver 7: ZZ64', `p01c_numfmt.fss`) is row 283's, its sibling; `0ff5eae27~1` and `explorations/apl/v1/base` (where it was measured), the old `:332`: the history, which keeps the old line whole.

## Row 283: rewrite (to RETIRED)

- Scope P. Present meaning F: "there is no working `RR64 → ZZ32` conversion", against its last note "Not reproduced at 64386618b: under walk `narrow` of the floor bracket of 7.5 is the `ZZ32` 7". Evidence F: the probe (`git show 7c3218956^:explorations/apl-probes/d21_narrow.fss`) writes `f.narrow()` on `f: ZZ = |\ v /|`, a dotted call of `ZZ64`'s functional method `narrow`; same mechanism as row 188. Comprehension P. Ownership F: "(climb batch 22, rung E, ...)". Consistency F: `FortressLibrary.fsi:529` now holds `opr ^`, `FortressLibrary.fss:762` `opr +`, `:415` a `coerce`; `ZZ64`'s `narrow(self):ZZ32` is at `fsi:645`, the floor bracket at `fsi:379`.
- Disposition, PLAN:546 and the silent rule: as row 188.
- Read beyond the evidence: the probe from history; the rung E report and skeptic as for 188; `tests/NativeHelperFamilyIntegersWalk.fss:71-75`.
- Facts dropped and their homes: the workaround "count up with a `while`" used by row 281's library, no longer needed since `narrow` works: the history; `explorations/coordinator/tools/old-fortress.sh` (the tool of the measurement): the rung E report, section 6, which the new line cites; the stale line numbers `fsi:529`, `fss:762`, `:415`: the history.

## Row 442: keep

- Scope P (one site, the prelude's number traits). Present meaning P: I read `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` at the base: `RR64` coerces from `FloatLiteral` and `RR32` only (`:433-435`), `ZZ64` from `IntLiteral` and `ZZ32` (`:147-149`); `ZZ32` has no `/` and `ZZ64` no `^` (`:147-272`); only `ZZ32`, `NN32` and `IntLiteral`/`FloatLiteral` declare `asRR64`; `NN32`/`NN64` declare no shift. `5ad4a9957`, which touched the cited files' family, changed the one library's powers, not the prelude. Evidence P: `XXXInferPromoteNN32` and the four named `XXX` tests exist. Comprehension P. Ownership P. Consistency P: FACTS.md:194 and :254 and POSITIONS.md:77-78 agree.
- The refused note of climb batch 21 (`compile-ladder/climb-batch-21/RECORD.md:176`, `expTest.fss` stops at 'Variable asFloat is not defined.') is already held by the claim's "`ZZ`, `ZZ64`, `NN64` lack `asRR64` and `asFloat`", as that record says; its instance stays in that batch's `REPORT.md`, section 9. No new line.
- Overlap: "`narrow` on `ZZ`" is row 349's defect (outside this run); in `pairs.txt`.

## Row 866: rewrite

- Scope P. Present meaning P. Evidence P: `XXXObjectExtendsZZ32Compiled.test` exists. Comprehension P. Ownership P. Consistency F: "(`...FZZ32.java:14`, at d1228e1f0)": `d1228e1f0` is not in the base's history. `FZZ32.java` is unchanged since 2012 (`5a68404fd`), and `:14` reads `public final class FZZ32 ...` at the base, so the pin becomes `c124c6b65`. Nothing else changes.
- Dropped: nothing.

## Row 698: rewrite

- Scope P. Present meaning P. Evidence F: reproducer `none`, while its notes say "Gated by `compiler_tests/XXXOverloadZZ32BesideUserTrait.test`"; that test exists and asserts the refusal ('compile_err_contains=Invalid overloading of add'), so it becomes the reproducer. Comprehension F: "... `explorations/reviews/popl2019-examples.md` Gated by ..." runs two sentences together. Ownership P. Consistency F: `Library/FortressLibrary.fsi:531-533` now holds `numerator`, `narrow`, `signed`; `trait ZZ32 ... comprises { Int }` is at `:536-538`. Sibling row 866 names 698, and 698 did not name 866.
- Dropped: none; the walk test keeps its full path in the notes.

## Row 772: measure

- Scope P. Present meaning U: the claim's value `Box[\Object\]` was measured at `5dd54b64b`; `1bc0a9083` (2026-10-30) since bounds a type parameter without a bound by `Any` under `fortress compile`, and `wrap[\T\]` has none, so the compiled value may have moved. Evidence F: the reproducer cell names `explorations/perf-probes/trait-generic-method-inference/REPORT.md`, a report, not a program; the probe `CompRowProbe.fss` was never committed. Comprehension P. Ownership F: "Climb batch 18 rung W: walk gives a trait's method `Box[\RR64\]` here ..." is a batch story, and the claim already states walk's value. Consistency P (P-74).
- The question, its program and each outcome's line are in `questions.md`. Any new line drops the rung W sentence (its fact, walk's value, is in the claim, and `tests/TraitGenericMethodInference.fss:63-64` asserts it) and takes reproducer `none` with the command and output.
- Overlap with row 442 (the same missing `coerce(x: ZZ32)` on the prelude's `RR64`, another symptom): siblings, not a duplicate; 442 has 1 character left, so the `siblings:` entry waits for that row's next rewrite.
- Read beyond the evidence: the probe report sections 1 and 7; `git show 1bc0a9083 --stat`; `git show ada547c0b`.

## mech.py

Its last line: "MECH: 4 lines, 0 failing, every check passes."
