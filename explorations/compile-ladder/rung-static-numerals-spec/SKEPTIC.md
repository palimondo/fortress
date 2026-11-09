# Skeptic of rung T, rung-static-numerals-spec (climb batch 29b)

Head judged: `a6249bb80b` (the worker's last commit). Head after my fixes: `b7a8a42492`, then this file.

Verdict: **approved**. The text states the static numerals (P-174, P-176) with P-173's conversion, default and fold, P-40's bound for sizes, P-165 and P-37's exception, in the revision form (P-96), as the section asks. Two sentences of the Effect said more than holds, and the hand-over missed five moved citations; I fixed both, each settled by a sentence on record. Nothing is contested.

## What I checked

1. **The worker's report and record on the branch.** Both were already committed (`af3b782b76`, `a6249bb80b`). `journal-text.py` wrote the journal's texts to scratch, 43321 and 12731 bytes, and `cmp` of each against the committed file printed nothing: the branch carries them byte for byte, so no commit of them was needed.
2. **The stages.** `git diff --name-only b5b0f82c13...HEAD` lists the nine `Specification/` files and `explorations/compile-ladder/rung-static-numerals-spec/`'s files only. No checker, Scala or generated code changes; neither stage can move (STAGE_BLIND), and none was run.
3. **Test first.** None: the rung edits prose only (`fortress-repo`, `SKILL.md`, "Rules for every task"; the section's "Tests"). The worker's last build, call `Kw797R` at 21:15:10 UTC, started after its last edits (`BCJv9m` 21:14:55, `H9wPHf` 21:15:00), which commit `d3782350df` (21:16:55) holds; so its quoted build ran on its final text.
4. **The diff, line by line**, against the section, P-174, P-176, P-173, P-40, P-165, P-37, P-96, F-345, the snapshot's sections 2, 3, 5 and 11, the probe's sections 1, 3, 10, 12, 13, 14 and 18, forks A1 to A8 and T1 to T3, and the probe's patch (`plan-30/probes/draft-numerals.patch`, its library hunks). The numeral types, the four numbers as static parameters of any size, `3.125`, `007`, `3000000000` and `deadc_16` (912092 = 0xDEADC), the hierarchy of five traits (the patch's `Library/FortressLibrary.fss` and `CompilerBuiltin.fsi` hunks), the eleven coercions (eight from `NaturalNumeral`, three from `RadixPointNumeral`) and the prelude's seven, no `=` pairs, no `asFloat`, the removed `^` over `NaturalNumeral`, the interval, the sign rule, the `where` clause, one value per place, the written-only rule with `extends`, the binary boxes (fork T2), the constant chapter (fork T3), the entry rewritten in place (fork T1), and the rows: each holds against its source, but for the two Effect sentences below. The team's two notes are kept byte for byte (`diff` of base `literals.tex:117-132` against head `:123-138` printed nothing). No closed row (969, 970, 961, 968, 318, 362, 972) is named; P-173's "is a numeral type" is written nowhere (`grep -rn 'is a numeral type\|numeral type itself' Specification` prints nothing).
5. **Where the fix belongs.** Prose only, in the section's files; the precedent, climb batch 29's rung T, is followed. 19 `revival-numerals` boxes before and after (`grep` over the base and the head, 19 and 19).
6. **The report's provenance lines.** Each cited line opened with `sed -n`: `literals.tex:109-113` at the base is the getters sentence; `CLIMB-BATCH-29b.md:212` is fork T1; `fortress.tex:87` defines `\revision`; `changes.tex:5210-5214` cites the report; the nine files exist at `a874948ac`. The team's commit `128f313b5b` (2009-11-17, "ZZ32 now coerces IntLiteral as described in the spec") and `FIntLiteral.java:21-23` at `b5b0f82c13` ("IntLiterals should always be transient objects with minimal lifetime") say what the entry quotes.
7. **The record's citations that the edit moves**, by my own scan of FACTS, POSITIONS, the ledger and the maps for the nine files with line numbers, each checked with `sed -n` against the base and the head (finding 2).
8. **The ledger.** `ledger.py find --cites` for `literals.tex` and `changes.tex`; rows 513, 956, 957, 958, 960, 962, 963, 966, 967 and 971 read with `ledger.py show`. Row 966 names `q =/= 0.5` too; the Effect now covers that case by its general rule (finding 1) and names the rows as A rewrites them.
9. **Competing declarations, failure modes**: none; the rung adds no name and no code.

## My programs

The rung changes no code: its tree runs the base's code, so the old code and the new must agree, and they do. Each program tests sentences the text keeps that rung A does not change, and shows the base's field-numeral answers that the Effect now replaces.

- `SkConstWalk.fss`, walk, old (`old-fortress.sh /home/user/fortress-base30 .../tmp/old-caches SkConstWalk.fss`) and new (`bin/fortress SkConstWalk.fss` in this worktree), `diff` printed nothing:

      2147483647 + 1: ZZ64 2147483648
      -2147483648: ZZ32 -2147483648
      x = 7/2: QQ
      u = 0: true, u =/= 0: true, w = 0: true
      q = 0.5: true, q =/= 0.5: true

  The constant chapter's examples hold. The last two lines are the base's `=` pairs and row 966; the Effect describes rung A's tree, where the pairs are gone.
- `SkConstCompiled.fss`, compiled, old (`old-fortress.sh ... compile` then `run`) and new (`bin/fortress compile` then `run`), `diff` printed nothing:

      m: ZZ32 = -2147483648:  -2147483648
      u = 0:  true , u =/= 0:  false
      t: ZZ64 = 2147483647 + 1:  2147483648

  The compiled `u = 0` `true` and `u =/= 0` `false` that the Effect states for the prelude.

No program writes a mutable variable, a field or an atomic block, so none ran at four threads.

## Findings and fixes

1. **Two Effect sentences said more than holds** (defect of the change, settled; commit `05b264bf5c`, `Specification/appendices/changes.tex`).
   - Before (`changes.tex:5278-5281` at `a6249bb80b`): "so a numeral compared by \EXP{=} with a number of a type other than its default meets the top-level \EXP{=} of \library". A `ZZ64`, `ZZ`, `QQ` or `RR64` declares `=` at `ZZ32`, each type converted to declaring `=` at the type converted from ("for each of the library's fourteen coercions between number types, the type converted to declares \EXP{=} at the type converted from", the same file's `revival-asfloat` Effect, `changes.tex:2794-2797`); a numeral at its default is applicable to that `=` without coercion and it is more specific than `=` over `Any` ("At a call, a numeral is applicable without coercion to a parameter of its default type ... the call invokes the first, which is the more specific", `Specification/basic/conversions-coercions.tex:112-118`). The probe's walk suite keeps `assert(l0 = 0, ...)` for a `ZZ64` (`ProjectFortress/tests/NumberMixedEqualityWalk.fss:82-83`, which the patch leaves) and reports "Walk suite: no test flips to failing" (`explorations/compile-ladder/plan-30/probes/draft-numerals.md:155`). After: "with a number of a type that declares no \EXP{=} with the numeral's default type"; the examples `NN32`, `NN64`, `RR32` and the rows stand.
   - Before (`changes.tex:5304-5307`): "where a \KWD{nat} or \KWD{int} parameter of $2^{31}$ or more is used as a value, the compiled path stops with an error ... (row~962)". The four numbers of a numeral type are read as `ZZ` (P-40: "a numeral type's four static parameters have none, and read as values are `ZZ` (P-174)"; the same Effect, "with the four numbers bound as values of type \EXP{\mathbb{Z}}"). After: "..., other than one of a numeral type's four numbers, is used as a value, ...".
   - Line counts kept, so no citation of the file moves. Test: none, prose. The build, my one run on `05b264bf5c`'s text, `( cd Specification/fortress && ./ant genSource && ./ant tex )`:

         209:BUILD SUCCESSFUL
         210:Total time: 44 seconds
         21059:BUILD SUCCESSFUL
         21060:Total time: 45 seconds
         21061:EXIT=0

     and the skill's warnings grep over `fortress.log` printed `0`; `pdftotext` shows both sentences typeset.
2. **Five moved citations missing from the hand-over** (correction; commit `b7a8a42492`, `record.md`, finding 4). The worker's scan (call `93omTS`) listed F-272's `conversions-coercions.tex:521-537` but not its move: the two boxes of `conversions-coercions.tex` gain six lines, so `:521-537` is now `:527-543` and `:601` is `:607`. Its scan read only `file.tex:N` forms, so it missed F-175's `:3604-3611` (now `:3612-3619`), F-173's `inference.tex` `:395-456` (now `:399-460`), and the dormant-code map's `binary.tex:3004-3085` (now `:3000-3081`) and `conversions-coercions.tex:269-275, 616-618, 846-853` (now `:275-281, 622-624, 852-859`). Each checked by `sed -n` at `b5b0f82c13` and at the head. The spec-to-implementation map's `types-vals-vars.tex:597`, `trait-parameters.tex:122`, `:156`, `:284` and `conversions-coercions.tex:761` were already off their sections at the base (`\section{Type Aliases}` at `types-vals-vars.tex:703`, `Automatic Widening` at `conversions-coercions.tex:856`), so they are not this rung's.

## Where I differ from the worker, without a change

- **The dates.** The text dates the four numbers as naturals of any size, read as `ZZ`, to 9 November 2026. P-174's history block of 2026-11-09 18:02Z gives that point as "his decision of 21:38 to 21:57 UTC on 2026-11-08, to which he pointed again at 17:57 on 2026-11-09", and the snapshot's section 5 shows the static-parameter form asked for on 11-08 (21:34, 21:55). The worker's decision 2 takes the confirmation of 16:02 on 11-09 (P-174's block of 17:40Z). Both readings are on record; I leave the worker's and list it for the curator.
- **Row 966's `q =/= 0.5`.** The old Effect named it; the new one names `u` only. With finding 1's rule, `q = 0.5` for `q: QQ = 1/2` falls under the general sentence (`QQ` declares no `=` with `RR64`); I add no unmeasured example.

## Points to report

The worker's points stand as it lists them. Beside them: the Effect of `revival-numerals` revised in two sentences by me (finding 1), before and after above, one of them the sentence of row 962. No file beyond the section's.
