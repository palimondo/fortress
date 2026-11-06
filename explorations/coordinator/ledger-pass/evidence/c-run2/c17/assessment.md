# Assessment, chunk c17 (run c-run2, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read, at the base: `CodeGen.java:1000-1015` and `:2040-2100`; `FortressLibrary.fsi` (grep for `TrivialOpenRange`, `ReadableArray`, `Array1`, `Array2`; `:1565-1580`, `:1621-1623`, `:1714-1720`); `FortressLibrary.fss` (grep for `mul`, `TransposedMatrix`; `:2448-2455`, `:2513-2516`, `:2727-2736`, `:2826-2829`); `CovariantCollection.fss` (grep for `CVReduction`, `APPCOV`, `Append`, `cata`); `RangeInternals.fss:1355-1368`; the prelude `CompilerBuiltin.fsi` (grep for an array trait: none); POSITIONS P-88 (line 98); the ledger for row 732; `git log -S` for the api's `Array2` subscripts (031c38bbc); that the seven named tests exist at the base.

## 305: rewrite
- scope pass; present meaning pass (the prelude still holds no array trait; FACTS.md:9 agrees); evidence pass, though the walk run of the reproducer fails with "Missing value: run": the file is a compile probe, not a program, and the row's command is `fortress compile`; comprehension fail: "`fortress compile` of `FlatArrays.fss`" is ambiguous among three run folders; ownership pass; consistency pass.
- Change: the probe's full path in the notes. Dropped: "The prelude is deleted at the switch-over." (home: the fortress-repo skill and POSITIONS P-37, and the history).

## 733: rewrite
- scope, present meaning pass; evidence: the pin `CodeGen.java:1006` at 423958063 has moved (+3): `typeAnalyzer.equiv` is now `:1009`; the probe's run date was not stated; comprehension fail: "siblings: the row of the api body not forwarded" names no number (it is row 732); ownership pass; consistency pass (FACTS.md:31).
- Change: siblings: 732; pin :1009 at c124c6b65; "run at 2798e75d5"; "No workaround is recorded." Nothing dropped. Commits since that touch CodeGen (d96242f0a, 8833d89c5, c324b841c) do not touch `dumpMethodChaining`; the crash is not re-run here (a later probe can).

## 837: rewrite
- scope pass; present meaning pass; evidence pass (XXX test exists; Thunker.scala:91 holds the message); comprehension fail: "Met at `Library/CovariantCollection.fss:125` at c3c22817c by the zero audit (row 828)" is a story, and line 125 is now `dirtyIAF`; ownership pass; consistency fail: "siblings: 828", which is FIXED.
- Change: siblings dropped (828 FIXED); the error's span `:6:5-14` in the test replaced by "at the field" (home: history, and the test itself); the meet site restated as the place the tolerant-run crash was met, without the pin. Dropped: the pin `:125` at c3c22817c and "the zero audit" (home: the history, and row 828's history line).

## 840: rewrite
- all pass but comprehension: "The old code fails the same, so the bound is not its cause" refers to a repair (1bc0a9083) a reader cannot see.
- Change: restated as "The bound at `Any` of an unbounded parameter is not its cause: it fails the same without it." Nothing dropped.

## 845: rewrite
- scope, present meaning, evidence pass (BaseEnv.java:535-537 holds the `bug` call; the command and rc are in the notes); comprehension fail: "At `3cd653815` the same program stopped at gap 1 ...; rung C's foreign-type reading ... passes it" is a repair story; the placeholder `P.fss` reads as a path; ownership pass; consistency pass (FACTS.md:133, :267). Silent: see silent.txt (defect).
- Change: the story restated as the mechanism (the foreign-type reading passes gap 1); `P.fss` replaced by "a program holding"; workaround added (a `builtinPrimitive` body, as P-58 takes). Dropped: the commit 3cd653815 (home: the history).

## 890: rewrite
- scope, present meaning pass (`CodeGen.java:2078-2089` at the base: `throwForbiddenException` at :2078, `ATHROW` at :2082, `finally` at :2085-2089); evidence pass (XXX test, walk test and link test exist); comprehension fail: "after climb batch 25's rung C", "On the old code", "The `forbid` half is climb batch 25's rung C's path" are batch story; consistency fail: no `siblings: 891` though 891 names it.
- Change: siblings: 891; pin at c124c6b65; story cut; "No workaround is recorded." Nothing dropped but the batch names (home: history).
- Not a duplicate of 891: 890 is the order of `finally` after a rethrow; 891 is the missing rethrow when there is no `catch` or `forbid`, a verify error. One function, two defects.

## 891: rewrite
- scope, present meaning pass; evidence: pin `:2077-2085` "after climb batch 25's rung C, the same at 97a416b18" is now `:2081-2089`; comprehension fail: "after climb batch 25's rung C", "On the old code and after the rung"; consistency pass.
- Change: pin at c124c6b65; story cut; workaround added (a `catch` clause makes it verify, then row 890 applies). Dropped: 97a416b18 (home: history).

## 465: measure
- present meaning fail: the claim's example, "on an `Array2`, `m[:, j]` and `m[i, :]` run, though the api's `Array2` declares neither subscript", is false at the base: `Library/FortressLibrary.fsi:1729-1730` declares both, since 031c38bbc. The refused note (climb batch 20) shows the earlier example, `array3(v)`, went the same way. Evidence: the probe is gone and no library case remains, so whether walk still lets a program call a component-only overload is for a run. Comprehension and consistency fail by the same false sentence.
- The question and both outcome lines are in questions.md.

## 719: rewrite
- scope pass; present meaning fail: the claim "on the base and after climb batch 15 rung B" names a batch; evidence: commit ef52b7b11 is not in the base's history; the `CovariantCollection.fss:138-143` lines hold `cata` and `dirtyIAF`, but `CVReduction` and `APPCOV` are at :146-149; the placeholder `P.fss`; comprehension fail by the batch phrase; ownership, consistency pass.
- Change: claim ends at the failure; the run at ee1aa1a95 only; `APPCOV` pinned at :146-149. Dropped: ef52b7b11 and the batch phrase (home: history). The run predates 96fcd051f, which touched CovariantCollection; the recursion it reads is unchanged.

## 294: rewrite
- scope pass; present meaning pass by reading (`mul` still begins `res = matrix[\T,s0,s2\]()`, `t()` still builds a `TransposedMatrix`); evidence fail: every line pin moved (+165 to +181): now `:2874-2875`, `:2933-2942`, `:2943`, `:2955-2971`; the probe is gone, found in the parent of 11bf69c39 as the row says; comprehension pass; ownership pass; consistency pass. Silent: choice (silent.txt).
- Change: pins re-pointed; workaround named (row 161's wrapper). Nothing dropped.

## 798: rewrite
- scope, present meaning pass (`grep ReadableArray2` on the api still finds nothing); evidence fail: pins `:1591-1593` and `:1695-1697` at d4d454f9d now point at other text; now `Array1` at `:1621-1623`, `ReadableArray1` at `:1575`, `Array2` at `:1715-1717`; comprehension pass; ownership pass; consistency pass (POSITIONS.md:98, P-88). Silent: defect.
- Change: pins at c124c6b65. Nothing dropped.

## 808: rewrite
- scope, present meaning pass: `XXXArray2ShiftedSlice` ran green as an expected failure under the newest gate a12ab5c60, which holds for the base; `SubArray2.subarray` still subtracts `bo0`/`bo1` (`:2828`); evidence: every pin moved by +3 (`:2828`, `:2515`, `:2727-2734`, `:2448-2453`); consistency fail: "siblings: 793, 794", both FIXED. FACTS.md:239 agrees.
- Change: pins; siblings dropped (793 and 794 are FIXED: home, their own FIXED lines and the history). Nothing else dropped.

## Pairs and siblings
- 890/891, both in this chunk: siblings both ways, not duplicates.
- 733/732: 732 is in another chunk; pairs.txt asks the reconcile run for the back-reference.
- The other overlaps (305/294, 465/294/798/808, 837/719, 719/20, 465/109/293) share a file or rare names but state different defects: unrelated.
