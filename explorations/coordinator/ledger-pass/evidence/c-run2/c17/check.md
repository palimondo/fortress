# Check of c17 (run c-run2, base c124c6b65)

`mech.md`: 11 lines, 0 failing; the chunk applies on copies and `ledger.py check` (with and without `--base`) exits 0. No closes, no duplicates, no keeps. One question (465), one pair (733/732), three silent classes (845, 294, 798). Cited lines opened at the base with `git show c124c6b65:<path>`.

## 305: pass
- Fidelity: `CompilerBuiltin.fsi:563`, `:582` hold `ZZ32Vector` and `StringVector`; the reproducer's full path exists (the walk run's "Missing value: run" is expected: the row's command is `fortress compile`).
- Nothing lost: `FlatArrays.fss` is kept as its full path. The dropped sentence "The prelude is deleted at the switch-over." has homes: POSITIONS P-37 (the compiler's prelude a bootstrap to remove), the fortress-repo skill, the history.
- Present, reproducer, status, form: pass. Cold read matches.

## 733: fail (1)
- Failure, fidelity. Passage: "Probe, run at 2798e75d5:". Source: `explorations/perf-probes/abstract-sibling-body/REPORT.md:1` and `:5` ("measured with shadows and reproducers at 423958063"; "**Base.** `main` at 423958063"); 2798e75d5 is the commit that recorded the report, not the tree the probe ran on. The cold read also could not tell what prints `cd`; the report's section 2 (`:262`) holds it. Correction: replace "Probe, run at 2798e75d5:" with "Probe, run at 423958063 (`explorations/perf-probes/abstract-sibling-body/REPORT.md`, section 2):" (notes about 688 of 700).
- Otherwise pass: `CodeGen.java:1009` holds `typeAnalyzer.equiv(alreadyType,tupTrait)` inside `dumpMethodChaining` (`:915`); the old token `CodeGen.java:1006` is the same line moved +3 (false at the base, kept in history). Row 732 is the api-body-not-forwarded row, so `siblings: 732` is right; the pair is plausible.

## 837: fail (1)
- Fidelity pass: `Thunker.scala:91` throws 'Must provide type for initializer'; `CovariantCollection.fss:135` is `sz: ZZ32 = |a| + |b|` inside `private object Append` (`:133-145`). Dropped tokens: `:6:5-14` (the test's span; home: the test and history), `CovariantCollection.fss:125` (now `Singleton.dirtyIAF`, false at the base; home: history). Siblings 828 dropped: 828 is FIXED. Pass.
- Failure, cold read. Passage (claim): "the distance driver's tolerant run then leaves the object unchecked". Source: cold-read.md, row 837, "not a term in the skill"; the skill's `compiler.md` says the distance stage runs each step whatever the earlier ones report, and no reference defines "driver" or "tolerant". A worker meets the same term. Correction: in the claim replace "the distance driver's tolerant run then leaves" with "the distance stage, which goes on past the error, then leaves"; in the notes replace "The tolerant run's 'Cannot handle (LValue ...'" with "The distance stage's 'Cannot handle (LValue ...'".

## 840: pass
- `Naming.java:1196` holds `TUPLE_OX = TUPLE_TAG + "⟦"`; the test `compiler_tests/TupleNamedComponentGenericParam.fss` holds `count[\T\](b: Box[\T\])` and `count(Box[\ZZ32\](7))`. The restated bound sentence keeps the old meaning without the repair story. Nothing dropped. The cold read's two doubts ("at a pair alike", "without it") are side remarks that a worker fixing the defect does not need; the test carries the defect.

## 845: pass
- `BaseEnv.java:535-537` holds `bug("Non-top-level reference to imported " + name)` under `opt_api.isSome()` and `l != TOP_LEVEL`; `ClosureMaker.java:99` prints `md`; `NamingCzar.java:369-372` is the foreign-type branch. Dropped: `3cd653815` (story; home: history), `P.fss`/`bin/fortress P.fss` (placeholder, restated as "a program holding"). The workaround holds: a program's own `builtinPrimitive` naming a `nativeHelpers` method runs under walk (`ProjectFortress/tests/NativeHelperFloatCarriedWalk.fss:5-6`); P-58 states the library's form. F-180's gap numbers are in FACTS.md:267, which a worker can read. Silent class `defect`: right.

## 890: pass
- `CodeGen.java:2078-2089` at the base: `throwForbiddenException(x)` at :2078, the rethrow `ATHROW` at :2082 under `catchClauses.isSome() || !forbid.isEmpty()`, `done` at :2083, `lfinally` and the `finally` block at :2085-2089. The `forbid` half is stated by F-315 (FACTS.md:145: "the `finally` clause does not run (row 890)"). Old pin `:2075-2085` dropped as moved (home: history). The walk test, the link test and the XXX test exist. `siblings: 891` added both ways; not a duplicate of 891 (order of `finally` after a rethrow, against a missing rethrow). Pass.

## 891: pass
- `:2081-2089` holds the guard that emits no rethrow without `catch` or `forbid`, so the handler falls into `finally`; the workaround follows from the same guard (a `catch` emits the `ATHROW`), and it rightly sends the reader to row 890. Dropped `97a416b18` and the old pin: history.

## 719: pass
- `RangeInternals.fss:1357-1367` is the sequential `generate` joining left to right; `CovariantCollection.fss:146-149` is `CVReduction`, whose `join` is `a APPCOV b`; `:138-143` holds `Append.cata` and `dirtyIAF`. Dropped: `ef52b7b11` (not in the base's history; home: history), the batch phrase, `P.fss` (placeholder), the command's `P.fss` (restated as "on a program with"); `Library/CovariantCollection.fss:138-143` is kept as `:138-143` after the same file. `UnwrittenSequentialReductionWalk` is `ProjectFortress/tests/UnwrittenSequentialReductionWalk.fss` at the base (a judge may write the path; not a failure).

## 294: pass
- `FortressLibrary.fss:2874-2875` (`mul`, `res = matrix[\T,s0,s2\]()`), `:2933-2942` (`rmul`, `lmul`), `:2943` (`t()` builds `TransposedMatrix`), `:2955-2971` (`TransposedMatrix`) hold. The old pins were the same text before it moved (history). The workaround "that wrapper" is row 161's "a wrapper type works too, at the price of re-exporting every library method by hand". Silent class `choice`: right.

## 798: fail (1)
- Fidelity pass: `FortressLibrary.fsi:1621-1623` (`Array1` extends `ReadableArray1`), `:1575` (`ReadableArray1`), `:1715-1717` (`Array2` extends `Indexed1`, `Indexed2`, `Rank2`, `StandardMutableArrayType` only); `grep -c ReadableArray2` on the api at the base gives 0; `FlatArrays.fss:36` is `Diag`. Old pins at d4d454f9d: history.
- Failure, cold read. Passage: "Decided: P-88." Source: cold-read.md, row 798 ("the decision's content is not in the row; a worker must print P-88 to know whether to build or leave"); POSITIONS.md:98, P-88: "a read-only matrix trait, `ReadableArray2`, which `Array2` would extend as `Array1` extends `ReadableArray1`, is also wanted (row 798): it is a library change, not a definition in the vocabulary." Correction: replace "Decided: P-88." with "Decided: P-88 wants `ReadableArray2` as a library change, not in the vocabulary." (notes about 570 of 700).

## 808: pass
- `:2828` subtracts `bo0`/`bo1`; `:2515` subtracts `b0`; `:2727-2734` is `Array2.shift`; `:2448-2453` is `Array1.shift`. Old pins +3 (history). Siblings 793 and 794 dropped: both FIXED. `row 793`, `row 794` have homes in their own FIXED lines. The reproducer exists and asserts slices of a shifted array. The cold read's doubt on "every subscript" is resolved by the test, which a worker runs.

## 465 (question to measure): fail (2)
- Fair: the claim's example is false at the base: `FortressLibrary.fsi:1729-1730` declares `opr[_:TrivialOpenRange, i1:ZZ32]` and `opr[i0:ZZ32, _:TrivialOpenRange]`, added by `031c38bbc`. The question is narrow and outcome 1's line is given whole.
- Failure 1, outcome mapping. Passage: outcome 2, "Close it with `031c38bbc` (the api now declares the library's component-only overloads)". Source: the row's evidence was the implicitly imported prelude (`VectorMatrixCastsWalk` against `FortressLibrary`); the probe tests an explicit `import Q465.{...}`, another path; `031c38bbc` changed the api and the export check, not walk's resolution. So outcome 2 shows only that explicit imports resolve through the api, and a FIXED close by `031c38bbc` would credit a fix that commit did not make. Correction: outcome 2 maps to `RETIRED` for the curator ("the claim does not reproduce for an explicit import; the library's cases are gone with `031c38bbc`, which declared them in the api"), not to a FIXED close.
- Failure 2, outcome mapping. Passage: outcome 3, "keep the row's status, rewriting only to drop the false `Array2` example". Source: the brief asks that each outcome map to a line or a close; no line is given. Correction: outcome 3 maps to outcome 1's line with the probe sentence "with api `Q465` ... `f("a")` runs" replaced by "the library's example is gone (`Library/FortressLibrary.fsi:1729-1730`); a program's own probe failed on load: <message>", status kept NEGATIVE-VERIFIED.

## Pair 733/732: pass
- Row 732 (no forwarder for a body inherited from an imported api's trait not first in the extends clause) and 733 share the api-trait-in-extends half on the code generator; asking 732 to name 733 back is right.
