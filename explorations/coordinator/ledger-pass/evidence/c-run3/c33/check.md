# Check of c33 (c-run3, base c124c6b65)

`mech.md`: 6 lines, every check passes. closes.txt, dups.txt, silent.txt: empty. No keeps in this chunk (each row is a rewrite or a measure). Sources read at the base with `git show c124c6b65:PATH`; probes and outputs with `git show COMMIT^:PATH`. No build or test run.

## Row 29 (rewrite): pass
- Fidelity: `Evaluator.java:994` is `if (s <= 2 || ((Op) op).isEnclosing())`, then the pairwise loop at :996-1005, left to right: holds. Probe `p13_multifix2.fss` exists at `e879b6a44^`. The juxtaposition fact keeps its pin `a1a75716a`.
- Nothing lost: the list is empty; the batch/skeptic attribution is in the history's line.
- Present, reproducer (`none`, probe and output in the notes), status, form: pass.
- Cold read: Defect, Where, Reproduce and Status match. Its open items (the probe's `V`/`K`, "ours", the workaround's monoid) do not stop a worker fixing walk's evaluator.

## Row 11 (rewrite): pass
- Fidelity: `TraitObject.rats:198` logs `Varargs parameters of objects are not allowed.` in the `Varargs` error production: holds. `p12_multifix.fss` at `e879b6a44^` declares `opr +(args: V...)` (line 14), so "varargs functions work" has its evidence. `RvwVarargsObj.fss` exists at `e879b6a44^`.
- Nothing lost, present, reproducer, status (design limit, frozen spec `objects.tex:66`), form: pass. Cold read matches.

## Row 97 (rewrite): pass
- Fidelity: `OverloadedFunction.java:603` is the message line "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present": holds. `trait AnyVector end` (`FortressLibrary.fsi:1643`) and `trait AnyMatrix end` (`:1755`) are bare. `c10_anyvector_dispatch.out` at `ed6dafb52^` shows the refusal "first parameters m:[AnyMatrix] and x:[AnyVector] are unrelated". `g4e_meet.fss` exists at `22ea0cd90^`. `Rank1 ... excludes { Rank2, ... }` at `:1245`. The `Array` pair sentence agrees with F-155 and F-252 (two plain declarations that differ only in a type argument are refused by the parameter check, row 416). Rows 98 → 342 (98 is DUPLICATE of 342) and 214 hold.
- Nothing lost: `rung-exclusion-relax/REPORT.md` and `Tag[\ZZ32\]`/`Tag[\String\]`: home row 416 (its notes already state the compiled acceptance of `Tg[\3\]`/`Tg[\4\]`) and the history; pairs.txt carries it to the reconcile. `row 159` (FIXED): history. `row 98`: replaced by 342. The message tail: the cited line holds it.
- Present, reproducer (`none`, probes and messages in the notes; `r01_native.fss` named for the Array half), status, form: pass. Cold read matches.

## Row 735 (rewrite): fail (1)
- Fidelity: `Constructor.java:182-183` builds `signaturesToTraitsContainingMethods` keyed by `SingleFcn.signatureEquivalence`; `putIfAbsent` at :846, :854, :859: holds. `XXXDottedMethodMeetInheritedWalk.fss` is `trait T1 g(): ZZ32` (abstract), `trait T2 g(): ZZ32 = 3`, `object O extends { T2, T1 }`, with `load_exception_contains=Invalid overloading of g`: the row's "`{ B, A }` with `A` abstract", so the reproducer asserts the claim's case. `FortressLibrary.fss:2101` is `trait DelegatedIndexed[...]`, its `getter size()` at :2102: close enough to the declaration.
- Nothing lost: `8dd64e8fc`: history (the line before this one).
- Present, reproducer, status, form: pass.
- FAIL, cold read: "no library type is so" (the notes' last clause). The reader cannot tell whether the library is hit, and a worker sizing the fix would stumble on it too. Many library types extend `DelegatedIndexed` beside other traits (`FlatString.fss:34`, `List.fss:255`, `RangeInternals.fss:1128`, `:1194`, `String.fss:353`, `Reflect.fss:340`). Correction: replace "no library type is so" with "by reading, no library type extends `DelegatedIndexed` before another trait that gives `size` a body". The writer confirms this against the six sites above, or else names the type that does.

## Row 265 (rewrite): fail (1)
- Fidelity: `AplCore.fss:1158-1163` is `push`: `fstk[n] := fv`, `astk[n]`, `ostk[n]`, then `n := n + 1`, with no `atomic`: holds. `aplEachT2`/`aplEachT3` at :1827-1837 sequence their calls: holds. Crash outputs exist at `1ee3b0bc5^`.
- FAIL, fidelity: "and `aplCall` reads the top (`:1172-1177`)". `aplCall` (:1172-1177) pushes, calls `f()` and pops in a `finally`. It reads no frame. The reads are `topF`, `topA`, `topO` (:1165-1167), which the called body reaches. Correction: "and the called body reads the top (`topF`, `topA`, `topO`, `:1165-1167`) between `aplCall`'s push and its `finally` pop (`:1172-1177`)" (or a shorter form of the same that keeps within 700 characters).
- Nothing lost: `Index -1 out of bounds for length 1024`, `checks/model_run_threads4.out` and `threads4.txt` (the after-fix outputs): history ("full text: history, row 265"). `threads4_crash.txt`: still there, now with its full path.
- Present (the "Fixed half / Open" story is gone), reproducer (`none`, outputs and their paths in the notes), status, form: pass.

## Row 258 (rewrite, CONTESTED): fail (1)
- Fidelity: `AplCore.fss:1726-1731` is `aplTup(rs): Object` returning tuples of 2, 3 or 9 under a `requires`; :1743 is `elif aplAllMat(rs) then aplTup(rs)` in `aplEach[\nat s\]`: holds. `Rung5.fss:241` is check Y20, "a NESTED each result: out of scope". Probes exist at `1ee3b0bc5^`. `types-vals-vars.tex:263-264`: holds.
- Nothing lost: `aplAllMat`: the call at :1743, and history; `x04_gram.fss`: kept with its full path.
- Present, reproducer, form: pass. Status: CONTESTED kept, presentation only: pass.
- FAIL, cold read and status: the template defines `CONTESTED` as "unsettled; the notes say why". The notes give only the spec's side ("a tuple type is a subtype of `Any` and of nothing else"), so the reader (Could not resolve, item 1) cannot tell what is in question. A worker deciding whether to touch walk would stumble on this too. Correction: add one clause naming the open point, worded from the row's own facts. For example, after "the type is contested": "Unsettled: the specification refuses the `Object` result, while the APL base's `¨` over matrix cells relies on walk accepting it, and no POSITIONS entry chooses". To make room, cut "row 252's strand-as-tuple on a computed strand" to "row 252's strand-as-tuple".

## Row 30 (measure): fail (1)
- The question is narrow; the program is the row's probe; it runs from the main tree's build.
- FAIL: the fourth outcome, "a refusal at load naming `W` or `Number` ... rewrite the probe ... and ask again", maps to neither a line nor a close. Correction: "a refusal at load naming `W` or `Number`: the probe no longer reaches the claim. Rewrite the notes with the refusal's text and reproducer `none`, keep the status, and mark the claim unmeasured since the flat tower (P-43)". A new probe goes to a later pass.

## Row 145 (measure): pass
- `FortressLibrary.fsi:2649`/`:2651` are given; the command (from `rung-3/REPORT.md`) sets `FORTRESS_SOURCE_PATH` and runs `t03_and.fss` in the main tree; each of the three outcomes maps to a rewrite.

## Row 164 (measure): pass
- The program is `G158.fss` from `a0a0c7c99^`; the four outcomes map to a rewrite, a close or a POSITIVE-VERIFIED line.

## Row 240 (measure): pass
- The program is `a01_any_result.fss` from `e879b6a44^`. The outcomes map to a line or a close, and each carries row 258's dependent sentence.

## Row 297 (measure): pass
- The program needs no gone library: it is `v18_postfix_pair.fss` at `11bf69c39^` without its `FlatArrays2` import and its `transpose` call. `Matrix` declares `t()` (`FortressLibrary.fsi:1767`). The diagnosis note holds: `Matrix` extends `Array2[\T,0,s0,0,s1\]` (:1757-1758), which extends `StandardMutableArrayType[\...,T,(ZZ32,ZZ32)\]` (:1715-1717), which extends `Array[\E,I\]` (:1553-1554). The three outcomes map. pairs.txt 297/416: plausible.

## Row 444 (measure): pass
- The two programs come from `ab067d9b6^`, plain and size arm. The outcomes map to a rewrite, a narrowed rewrite or a close. Moving the XXX test to row 735 agrees with that test's shape (above).

## Pairs
- 97/416: they share a half (the plain `Array` pair is refused although instantiation exclusion makes it exclude): pass. 297/416: plausible: pass.
