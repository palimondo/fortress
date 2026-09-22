<!-- Triage of the errors zero.md found behind StaticChecker's early return; measured 2026-09-22 by a delegated worker on Pavol's "road to zero".
Nothing tracked modified; shadow.patch unchanged, the switches are layers (triage/shadow-add.patch, overloading-checker.patch, p-only.patch = rung P
on the TRACKED checker).  Library edits on copies (zero/make-lib.py, triage/make-fixes.py).  Commands: triage/run-all.sh.  Captures: triage/. -->

# Triage

**The short answer.** zero.md's 173 was taken with `checkP` relaxed *broadly* — its switch sits inside `pExcInner`, which the overloading
checker's exclusion certificate also reaches — and it is a lower bound: a memo in the overloading checker hides 27 to 35 errors depending
on the build. Checked in every context there are **203**. None of them goes away with a weaker exclusion relation. Batch 3's *narrow* placement
makes things worse: **487**. By class: 35 are refused by the specification's static-parameter sentence, 56 by the Meet Rule, 29 are library
defects, 79 are `fill`'s shape (a type variable against an arrow parameter), 4 are a checker capture defect. Eleven api lines take the 203 to
179, eleven more to 81, two more and a rename to 72. **Batch 3 should declare 41, or 40 with the closure's accommodation, not 2.**

## 1. The two copies, reproduced, and why the count moves

* **Everything applied** (ZALL3, `-Dprobe.zero.dropP -Dprobe.zero.eligibleNarrow`, zero's classes): **173**, twice, identical lists
  (`triage/counts.txt`, r01, r06). **Batch 3 as written** (ZL, `dropP` only): **45**, zero's ZLP 44 plus the `:411` closure error (r02).
* **zero's switch is the broad placement.** It returns `pFalse()` from `checkP` inside `pExcInner` (`shadow.patch`, the `checkP` hunk; tree
  `types/TypeAnalyzer.scala:443-456`), and the overloading certificate lands there: `OverloadingOracle.excludes` is "the meet of the two domains
  is Bottom" (`overloading/OverloadingOracle.scala:190-194`), and the meet is Bottom when `normConjunct` finds two excluding conjuncts
  (`TypeAnalyzer.scala:632-640`). The narrow placement had never been run against the overloading rule.
* **The count depends on the build, not only on the library.** The same copy and switches give 173 (zero's classes), 170 (the same
  sources plus this probe's switch, all off), 176 (plus the triage `OverloadingChecker`), 175 and 168 (with the diagnostics on); each build
  repeats its own number exactly (r01/r06, r03/r16). Only `fill`, `generate`, `map` and `copy` move. The cause is `validOverloadingMemo`
  (`typechecker/OverloadingChecker.scala:441-462`): it caches a `true` per *pair of declarations* (key `:452`), but a pair inherited by several
  traits is checked once per trait, each in its own instantiation (`:282-320`), in hash-set order. A pair valid in one trait's context is
  then taken as valid in the next. With the tree's own switch `-Dfortress.analyzer.overload.cache=false` (`:77`) every build gives **203**
  (r20, r21, r25 byte-identical), a superset of every memo-on list; the classification is of the 203. Hence `shadow.patch` stays as it is:
  any edit to the shadow reshuffles the memo-on count (r26), and zero's captures reproduce only from it alone.

## 2. (a) The exclusion relation, under each placement

Memo off, ZALL3 (`triage/counts.txt`): **broad** (zero's `dropP`) **203**; **the overloading checker fed the relaxed exclusion**
(`-Dprobe.triage.dropPHier` + `-Dprobe.triage.dropPOver`, the whole overloading check run with the relaxation raised, every analyzer memo
twinned meanwhile, `triage/shadow-add.patch`) **203**, the same list, so `CoercionOracle` and `Formula` contribute nothing here; **narrow**
(batch 3's rung P, the two `TypeHierarchyChecker` questions only) **487**. Memo on: 173 / 176 / 464.

**So no error is (a) in the brief's sense.** Relaxing `checkP` takes a disjunct *out* of the exclusion relation, so it can never make a pair
exclude. The diagnostic run asks `excludes` again for every invalid pair, once with the strong clause and once relaxed (`triage/strong-vs-relaxed.txt`).
The strong clause certifies 8 pairs (CMP 3, MINMAX 2, SQCAP 1, isLeftZero 1, RangeInternals' IN 1), and every one of those 8 also has a class below. As
the overloading checker's input, though, the strong clause adds a net 284 errors (`triage/narrow-placement.txt`). NN64's and ZZ32's `BITAND`
are reported as "multiple declarations … with the same parameter type", ZZ32's `DIV` must return a subtype of NN64's, and
`combine2D(ExtentScalarRange, ExtentScalarRange)` is refused against `combine2D(ScalarRange, ScalarRange)`, where the Subtype Rule plainly
holds. This is family A's contradiction again: in the nested tower the strong clause makes a subtype exclude its own supertype, and a meet
of the two is Bottom. **Rung P must cover the overloading check too, or be broad.**

## 3. The classification (the 203, one line each in `triage/classified-203.txt`)

Every overloading error is `validOverloadingInner` finding no Subtype Rule, Meet Rule or exclusion (`OverloadingChecker.scala:475-478`); every
return-type error a pair that passed it and failed the Subtype Rule's return clause (`advanced/overloading.tex:158-166`). The *why*:

* **(b) the static-parameter sentence, 35.** `basic/overloading.tex:100-105` makes it an error for two declarations' static parameters to
  differ, and the adjudication reads the sentence as refusing them outright (`run-c4/cold-cache/operators/B/adjudication.md`).
  CAP 12 (RangeInternals `[\I,J,K\]` against `[\I,J\]` against `[\I\]`), MIN 4 and MAX 4 (the scalar block `FortressLibrary.fsi:2544-2550` against
  `:185`, `:196`, `:209-210`: C4's own shape), seq 4, openRangeHelper 3 (`RangeInternals.fsi:612-616`, empty domains that differ only
  in their static parameters), CMP 3, juxtaposition 3, MINMAX 2. The checker does not implement the sentence (it compares domains only,
  `OverloadingChecker.scala:357-431`), and neither does the interpreter (the adjudication). It refuses these only for want of an exclusion or a meet.
  The sentence also reaches 8 errors classed below, among them `StandardMinMax.MIN` against the `StandardMin.MIN` it overrides (`:209`, `:185`).
  On the reading that a functional method carries its trait's parameters, the sentence would refuse every override of that kind.
* **(c) the Meet Rule, 56.** FORWARD_CMP 19 (the five range kinds' functional methods, `.fsi:2087-2148`; no `excludes` or `comprises` anywhere
  in `:2079-2143`), IN 8, `fill` across the Array/StandardImmutableArrayType diamond 18 plus `copy` 1 (a trait that inherits both
  `:1336-1337` and `:1368-1369` without its own), map 4, ivmap 3 (Maybe inherits both Condition's and Indexed's, `:833-834`), seq 1, SQCAP 1
  (no `(Just, Maybe)` declaration, `:835`/`:855`), and juxtaposition 1. The last one's meet `(String, String)` *is* declared (`.fsi:2358`),
  but its two self parameters sit in different positions, which `advanced/overloading.tex:436-441` refuses outright (`meetRule`'s `fsp == gsp`,
  `OverloadingChecker.scala:509`).
* **(d) real library defects, 29.** 24 are one-liners. RET MIN/MAX 6 (`StandardMinMax` declares `MIN`/`MAX` returning `(T,T)`, `.fsi:209-210` and
  `.fss:260-261`, though each body returns `r`), CMP 4 (`LessThan`/`GreaterThan` say `Comparison`, `.fsi:134`, `:145`, while the `.fss` says
  `TotalComparison`, `:178`, `:190`), empty 2 (`MinMaxReductionN.empty(): Number`, `.fsi:1858`, `.fss:3092`, whose body is a pair), shift 2
  (`Array3.shift` returns a 2-tuple-indexed array, `.fsi:1680`), every/atMost 3 (`RangeInternals.fsi:257`, `:259`, `:319` against
  `BoundedRange`, `.fsi:2112-2113`), lift 6 (`AssociativeReduction.lift(r:Any)`, `.fsi:1762`, against `lift(r:R)`, `:1723`), and isLeftZero 1
  (`Comparison` at `:93` against `TotalComparison`, `:1781`). 5 come from the tower's design: `narrow` 4 (NN64 is an RR64 here, so its
  `narrow` must return a subtype of `RR32`, `.fsi:365`, `:460`, `:532`, `:539`) and `truncate` 1 (`:335`/`:403`; ledger row 330's ℤ removes it).
* **(e1) a type-variable parameter against an arrow parameter, 79**: `fill`'s 77 crossed pairs, RET array1/array2 2. `fill(f:I->E)` and `fill(v:E)`
  (`.fsi:1297-1298`, `:1316-1317`, `:1336-1337`, `:1368-1369`) never exclude, as `E` may itself be an arrow (by the letter, ambiguous for arrays of
  functions); as top-level schemas (`array1`, `.fsi:1488-1489`) the function-taking one is "more specific" by `T := ZZ32->T'` and fails the return clause.
* **(e2) a capture, 4**, a checker defect: inherited by `PossibleReductionPair[\R\]` (`:1736`), `Generator.generate[\R\]` (`.fsi:623`) captures the trait's
  `R`, as the message shows: `[\R\](Generator[\SomeReductionPair[\R\]\], Reduction[\R\], …)`. Renaming the library's `R` removes all 4 (T3).

**`fill`'s shape** (71 with the memo, 95 without): each array trait pairs every `fill` it inherits (ReadableArray, ImmutableArray, Array,
StandardImmutableArrayType): 77 function-taking against value-taking (e1), 18 the same kind from the two sides of the diamond (c). **No single
fix covers both**: renaming one kind covers the 77 and the 2 factories; redeclaring on the diamond's meets (`.fsi:1374`, `:1411`) the 18.

## 4. The fixes, measured on copies (memo off; `triage/make-fixes.py`, `triage/counts.txt`, `triage/remaining-72.txt`)

* **T1, the (d) one-liners**: 11 api lines (8 in FortressLibrary.fsi, 3 in RangeInternals.fsi). **203 → 179**, exactly the 24; the other 5 are the tower's.
* **T2, `fill`**: `fillWith` for the four function-taking declarations and `array1With`/`array2With` (6 lines), plus the two fills and `copy` on
  `StandardMutableArrayType` and the two fills on `ImmutableArray1` (5 lines). **179 → 81**: all 79 of (e1), the 18 diamond pairs and `copy`.
* **T3, one-line disambiguators**: `map` and `ivmap` on Maybe (2 lines) −5, and the reduction-pair family's `R` renamed `Q` −4. The pairwise `excludes`
  clauses among the five range kinds (4 lines) remove **nothing**, because the checker gives the two declarations' `[\I\]` separate
  variables (the diagnostic meet reads `[\I$3380, I$3381\](AND(OpenRange[\I$3380\],RightRange[\I$3381\]), …)`, r15), and an `excludes`
  clause only relates equal instantiations. **81 → 72.**
* **What remains, 72**: (b) 35, a decision: drop the sentence as both implementations have, and give these pairs exclusions or meets;
  or restructure the library. (c) 32: FORWARD_CMP 19 and IN 8 need the checker to treat α-equivalent
  static parameters as one (the premise of `basic/overloading.tex:100-105`) *and* the four `excludes` clauses, which is unmeasured; `map` on the two
  RangeInternals objects 2 needs a return type that is both a SequentialGenerator and an Indexed; seq 1 and SQCAP 1 need a declaration on
  the meet; juxtaposition 1 cannot be fixed with a declaration. (d) 5: the tower's `narrow` 4 and `truncate` 1.

## 5. What batch 3 should declare (the current tree; `triage/batch3-current.txt`)

The tracked checker, rung P as placed (`triage/p-only.patch`), rung L as `make-lib.py`'s ZL, nothing else (a comment cannot move a count).

* P alone: **33** (the manifest's 33, `CLIMB-BATCH-3.md` rung table; r13). L alone: **102**, not the manifest's 63, because L's RangeInternals
  bounds clear that api's early errors, so its overloading check runs and adds 39 (r27).
* **P + L: 41.** Rows: `FortressLibrary 4`, `RangeInternals 78` (each api's errors print twice in these rows: 2 and 39 distinct), all others 0;
  crash `NativeArray: Not yet implemented`. The same with the memo off (r22) and on a rerun (r19). The 2 are `:2526` and `:411`, and the 39
  are CAP 17, combine2D/3D 14, openRangeHelper 3, map 2, RET atMost/every 3. **With the closure's narrow accommodation: 40**
  (`FortressLibrary 2`, the `:411` error gone; r12).
* 19 of RangeInternals' 39 (CAP 5, combine 14) are artefacts of the narrow placement (§ 2). With rung P also covering the overloading
  check, the batch lands at **23**, or **22** with the accommodation (r17, r18).

## 6. What this does not settle

* **(b) is Pavol's decision about the specification**, not a patch: the 35, and the sentence's reach over overrides.
* **The suite was not run**, nor the interpreter on any fix copy (only the apis were edited; `.fss` bodies and callers of the renamed
  functions are untouched). H+O equals broad on this library; what the placements do to coercion and inference elsewhere is unmeasured.
* **The memo defect is switched off here, not fixed** (its key needs the trait context); the gate's count depends on it once
  FortressLibrary's own overloading check runs.
* **(e2) is only routed around** (the checker's capture-avoiding instantiation, `OverloadingChecker.scala:131-157`, is not written), and the 8
  strong-clause pairs were not traced against the interpreter's `FType` derivation.
