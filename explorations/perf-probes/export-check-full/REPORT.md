<!-- The export check of the FortressLibrary component run to its end: every difference between the FortressLibrary api and its component, sorted by what would clear each (the ways note's 4h and 4i), with the 4h edits written as one library patch and measured by the stock distance stage, for climb batch 21's preparation (brief: compile-ladder/plan-21/evidence/briefs/probe-export-check.md). Written 2026-10-23 by an Opus worker. Decides nothing. Base: main at 4463902e9, whose Library/, ProjectFortress/, Specification/, build.xml and bin/ equal the brief's 0c7e7be18, climb batch 20's landed code (`git diff --stat 0c7e7be18 4463902e9 -- Library ProjectFortress Specification build.xml bin` is empty; the two commits between them are record files). Run in /home/user/fortress-probe-export-check, seeded from the main tree's gate build (built after the last implementation commit 5ad4a9957), implementation unchanged. Seven distance runs, each alone on the machine's JVMs, with the other probes' agents beside (load at start 0.5 to 5.1), plus microGPT's quick pair and nine walk tests on the patch. The Write tool refused this file at explorations/perf-probes/export-check-full/REPORT.md, so the worker wrote it to the session's scratchpad, and the coordinator brought it here unchanged but for this sentence; the two patches it gives came from wip/probe-export-check (8c92d0c60): export-check-shadow.patch (the shadow, which never lands) and library-4h.patch (the 4h edits). Readings of my own are marked "(my reading)". -->

# The export check of FortressLibrary, run to its end

## In short

- **The 43 entries hide 115 differences, and 4 more.** The stock check names, of each trait, only the first member that differs, and stops at a trait whose api lists more members than its component. A shadow that compares every member, by name as well as by header, finds 115 differences that the stock rules report one trait at a time, in the 43 traits and objects. It also finds 4 more that the stock check accepts only because it matches a trait's members without their names. Section 2 lists them all.
- **Sorted (section 3):**

  | What clears it | Differences |
  |---|---|
  | 4h: `abstract` written in the api where the component's member has no body | 56 |
  | 4h: the api declares a bodyless member of the component that it lacks | 3 |
  | 4h: plain slips | 7 |
  | 4i: the check brought to `apis.tex` | 8 |
  | Neither, and no decision by my reading | 17 |
  | A decision | 6 |
  | Waits elsewhere: `Maybe`, `Just` and `Nothing` (P-90), `String` (P-155) | 5 + 13 |
  | **Total** | **115** |

  Two of 4h's 56, `QQ`'s `numerator` and `denominator`, also need a fix of the check: it compares their `self` types with the api's and the component's sides swapped (section 6, defect 3). The 4 differences that the stock check accepts by the name gap go 1 to neither, 2 to decisions and 1 to String.
- **The 4h patch: the distance goes from 5 to 28** (section 4). The export error stays, its entries 43 → 20. The two `BIG MIN` sites and the two OT sites stay. 23 new errors come, all `abstract-method`: 17 in `FortressBuiltin` (`BigNum` 15, `Int` 1, `Long` 1) and 6 in `RangeInternals` (the three open ranges, 2 each). Each one comes from an `abstract` line in `Integral` or `Range`, where the api of the trait that implements the member does not show the component's concrete member. With 19 more api lines that show those members, the 23 go and nothing else comes: the distance is 5 again, with 20 entries.
- **4i after 4h** clears 10 more differences (8, and String's 2): 51 → 41, entries 20 → 15. What then remains is the 25 differences of neither and of a decision, and the 16 of `Maybe` and `String` that are left after 4h and 4i.
- **Walk:** microGPT's quick pair passes on the patch, 7 of 7 each, and so do nine walk tests of the patched traits (section 4.4).
- **Found on the way** (section 6): the check matches members without their names. Its field comparison ignores names and modifiers, through a Scala newline. Its component-to-api half swaps its arguments into a one-sided self-type comparison. And the distance stage prints `#total 0` for a library that does not parse.

## 1. How it was measured

### The shadow

`export-check-shadow.patch` edits `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`, in a copy compiled into a scratch folder that comes ahead of the build on the class path. The stock check, which is the team's (`^5a68404fd`, the history's boundary), stops at two places:

- `equalListMembers` returns "missing members" when the api's trait lists more members than the component's (`ExportChecker.scala:768-769`), and else ends in `inAPI.forall(handleOne)` (`:787`).
- `allAbstractsMadePublic` ends in `inComp.forall` (`:749`).

The shadow makes both of them map over every member, and it keeps the stock verdict. Beside the verdict, it prints one `#XDIFF` line for each difference: the trait, the kind, the member, the api's and the component's spans, and the two headers. For every member it also looks up the members of the same name on the other side, which the stock check never does (section 6, defect 1).

Its kinds:

- **Header clauses:** `header-extends`, `header-excludes` and the rest.
- **The api's members:** `api-member-missing` (no member of the name in the component), `abstract-component-only`, `abstract-api-only`, `api-member-differs` (with the differing parts: static parameters, modifiers, parameter types, return type), and `api-matched-by-other-name` (the stock check accepts the member through a member of another name).
- **The component's abstract members:** `comp-abstract-absent`, `pair:abstract-component-only` (the other half of an api-side pair), `comp-abstract-differs` and `comp-abstract-matched-by-other-name`.

With `PROBE_EXPORT_4I` set in the environment, the shadow applies 4i (section 3.2).

A difference is counted once:

- one for each api member with no satisfying component member by the stock rules, where a pair that both halves of the check report counts once;
- one for each component abstract member that the api does not declare;
- one for each header clause.

The stock "missing members" verdict is no difference of its own, since the shadow lists its members one by one. A member that the stock check accepts by another member's name is counted apart, as "accepted by the name gap", unless the other half of the check already counts the pair.

The commands, from the tree's root after the skill's setup lines:

    F=ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala ; S=$PWD/tmp/shadow
    mkdir -p $S/src $S/classes && cp $F $S/src/ExportChecker.scala
    patch $S/src/ExportChecker.scala < explorations/perf-probes/export-check-full/export-check-shadow.patch
    CP=$(bin/fortress_classpath | tail -1)
    java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d $S/classes -encoding UTF-8 $S/src/ExportChecker.scala
    sed 's#-cp "$SCRATCH/shadow-classes:#-cp "${XCP:+$XCP:}$SCRATCH/shadow-classes:#' \
        explorations/coordinator/tools/distance/run.sh > tmp/run-shadow.sh && chmod +x tmp/run-shadow.sh
    XCP=$S/classes tmp/run-shadow.sh tmp/d/distance.txt tmp/d          # PROBE_EXPORT_4I=1 before it for 4i
    grep '^#XDIFF' tmp/d/run.txt | cut -f4 | sort | uniq -c            # the lines by kind

On the landed library this prints 190 lines. 33 are `abstract-component-only`, 58 `pair:abstract-component-only`, 32 `api-matched-by-other-name`, 24 `api-member-differs`, 16 `api-member-missing`, 10 `member-count`, 7 `header-extends`, and 3 each `abstract-api-only`, `comp-abstract-absent` and `comp-abstract-matched-by-other-name`; 1 is `header-excludes`. They make the 115 differences, and the 4 accepted by the name gap.

### The runs

Each run is one distance stage, about 140 s. The machine: nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. The load at start was 0.5 to 5.1, with other agents beside.

| Run | Library | Checker | `#total` | Export entries | Shadow's differences |
|---|---|---|---|---|---|
| Gate, climb batch 20 (`compile-ladder/climb-batch-20/gate/distance.txt`) | landed | stock | 5 | 43 | |
| S1 | landed | shadow | 5 | 43 | 115, and 4 accepted by the name gap |
| A | `library-4h.patch` | stock | **28** | 20 | |
| S2 | `library-4h.patch` | shadow | 28 | 20 | 51 (after 4h: 49, and `QQ`'s 2, section 6, defect 3) |
| S3 | `library-4h.patch` | shadow with 4i | 28 | 15 | 41 |
| B | `library-4h.patch` and the 19 follow-on lines (section 4.3) | stock | **5** | 20 | |

The shadow keeps the stock verdict, so S1's table equals the gate's: `#total 5`, `X1 1`, `BR 2`, `OT 2`. S1 ran twice, with the shadow before and after its 4i switch was added, and its `#XDIFF` lines were the same both times (`cmp` of the two extracts). Every table ends `#crash none` and `#shadow every shadow edit matched the tracked sources`. The stock tables compare with the gate's per-site list by `explorations/perf-probes/array-sites/compare-sites.py`.

## 2. Every difference

The stock check's message on the landed tree names these 43 traits and objects (`compile-ladder/gate/distance-sites.tsv`, row 1):

- Equality, Comparison, EqualTo, StandardMin, StandardMax, Number, RR64, QQ, Integral;
- Condition, AnyMaybe, Maybe, Just, Nothing, AnyUniqueItem;
- Indexed1, Indexed2, Indexed3, Indexed, ZeroIndexed, DelegatedIndexed;
- ReadableArray, ReadableArray1, ImmutableArray1, Array1, Array2, Array3;
- Reduction, ActualReduction, ReductionPair, BigReduction, Comprehension;
- FilterGenerator, Range, OpenRange, RangeWithExtent, BoundedRange, RangeWithLeft, RangeWithRight, FullRange;
- String, Generator2, RelationalPredicateCondition.

Every difference in them, in the api's order. Lines are `Library/FortressLibrary.fsi` (fsi) and `Library/FortressLibrary.fss` (fss) at the base. "No body" means that the component's member is abstract.

| Trait or object | What differs | n | Members |
|---|---|---|---|
| Equality | `abstract` in the api, a body in the component | 1 | `=` (fsi:74, fss:101) |
| Comparison | a bodyless member of the component that the api lacks | 1 | `getter asString(): String` (fss:135) |
| EqualTo | the api's `<(self, other:LessThan)`, the component's `<(self, other:GreaterThan)` | 1 | `<` (fsi:163, fss:210) |
| StandardMin, StandardMax | no body in the component, no `abstract` in the api | 2 | `MIN` (fsi:194), `MAX` (fsi:206) |
| Number | the same | 1 | `asFloat` (fsi:289) |
| RR64 | result: api `ZZ64`, component `ZZ`; `truncate`: api `ZZ64`, component `RR64` | 3 | `\|\self/\|` (fsi:377), `\|/self\\\|` (fsi:379), `truncate` (fsi:380) |
| QQ | no body in the component, no `abstract` in the api | 4 | `isNaN` (fsi:407), `isInfinite` (fsi:408), `numerator` (fsi:411), `denominator` (fsi:412) |
| Integral | the same | 27 | `zero`, `one`, prefix `-`, prefix `DOTMINUS`, `+`, `DOTPLUS`, `-`, `DOTMINUS`, `DOT`, `TIMES`, `juxtaposition`, `DOTTIMES`, `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `BITAND`, `BITOR`, `BITXOR`, `LSHIFT`, `RSHIFT`, `BITNOT`, `^`, `/`, `numerator` (fsi:448-475, all but `DIVIDES`, :465) |
| Condition | extends: api `{SequentialGenerator[\E\]}`, component `{ZeroIndexed[\E\], SequentialGenerator[\E\]}` | 1 | header (fsi:913, fss:1518) |
| Condition | result: api `Generator[\…\]`, component `Condition[\…\]` | 2 | `indexValuePairs` (fsi:921), `ivmap` (fsi:933) |
| AnyMaybe | `abstract` in the api, none of the name in the component | 1 | `holds` (fsi:961) |
| Maybe | extends: the api adds `ZeroIndexed[\T\]` | 1 | header (fsi:975, fss:1626) |
| Just | api `opr[r:Range[\ZZ32\]]: Maybe[\T\]`, component `opr[i:ZZ32]: T`; `SQCAP` and `SQCUP`: the api's `o:UniqueItem[\T\]`, the component's narrower overloads | 3 | `opr[]` (fsi:992), `SQCAP` (fsi:1001), `SQCUP` (fsi:1002) |
| Nothing | api `opr[r:Range[\ZZ32\]]: Nothing[\T\]`, component `opr[_:ZZ32]: T` | 1 | `opr[]` (fsi:1017) |
| AnyUniqueItem | no body in the component, no `abstract` in the api | 1 | `holds` (fsi:1032) |
| Indexed1, Indexed2, Indexed3 | extends: api none, component `HasRank` | 3 | headers (fsi:1235-1239, fss:1937-1941) |
| Indexed | `abstract` in the api, a body in the component | 2 | `size` (fsi:1266), `\|self\|` (fsi:1295) |
| ZeroIndexed | the api's method `bounds()`, the component's getter | 1 | `bounds` (fsi:1332, fss:2042) |
| ZeroIndexed | a bodyless member of the component that the api lacks | 1 | `opr[r:Range[\ZZ32\]] : ZeroIndexed[\E\]` (fss:2045) |
| DelegatedIndexed | result: api `Generator[\E\]`, component `Indexed[\E,I\]` | 1 | `generator` (fsi:1364, fss:2092) |
| DelegatedIndexed | in the api only; the component's trait inherits `Indexed`'s body | 1 | `size` (fsi:1365) |
| ReadableArray | `abstract opr[_:TrivialOpenRange]` in the api only | 1 | `opr[]` (fsi:1431) |
| ReadableArray1 | no body in the component, no `abstract` in the api | 1 | `subarray` (fsi:1552) |
| ImmutableArray1, Array1, Array2, Array3 | `opr[_:OpenRange[\ZZ32\]]` in the api only; the component defines only `TrivialOpenRange`'s form, as at `a874948ac` | 4 | fsi:1568, :1601, :1708, :1841 |
| Array2, Array3 | result: api `CompactFullRange[\(ZZ32,ZZ32)\]` (and of three), component `CompactFullRange2D` (`3D`), a `RangeInternals` type | 4 | `bounds`, `zeroIndices` (fsi:1701, :1720, :1826, :1854) |
| Array2 | no body in the component, no `abstract` in the api | 2 | `put` (fsi:1724), `get` (fsi:1725) |
| Reduction | the same | 2 | `empty` (fsi:1877), `join` (fsi:1878) |
| ActualReduction | `abstract` in the api, none of the name in the component's trait | 2 | `empty` (fsi:1886), `join` (fsi:1887) |
| ActualReduction | api `(r: Reduction[\R\]): Maybe[\(Reduction[\R\],Reduction[\R\])\]`, component `[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\]` | 3 | `leftDistribute`, `rightDistribute`, `distribute` (fsi:1892-1899, fss:3242-3251) |
| ReductionPair | extends: api `SomeReductionPair[\R\]`, component `SomeReductionPair[\L\]` | 1 | header (fsi:1917, fss:3270) |
| BigReduction, Comprehension | api getters for the object's value parameters, which the api names `r`, `u` and `singleton`, and the component names `reduction`, `unwrap` and `body` | 4 | `reduction` (fsi:1958), `reduction`, `body`, `unwrap` (fsi:1965-1967) |
| FilterGenerator | no body in the component, no `abstract` in the api | 2 | `g` (fsi:2164), `p` (fsi:2165) |
| Range | `abstract` in the api, none of the name in the component | 1 | `isEmpty` (fsi:2188) |
| Range | in the api only, misspelt: nothing in the library declares it | 1 | `asDebugStriing` (fsi:2205) |
| Range | no body in the component, no `abstract` in the api | 3 | `check`, `shiftLeft`, `shiftRight` (fsi:2206-2208) |
| OpenRange | a bodyless member of the component that the api lacks | 1 | `forward(): OpenRange[\I\]` (fss:4050) |
| RangeWithExtent, BoundedRange, RangeWithLeft, RangeWithRight, FullRange | no body in the component, no `abstract` in the api | 8 | `extent` (fsi:2236), `leftOrRight`, `every`, `atMost`, `INTERSECTION` (fsi:2248-2252), `left` (fsi:2258), `right` (fsi:2270), `extent` (fsi:2282) |
| String | excludes: api `{AnyMultiplicativeRing}`, component `{Number, Char, AnyMultiplicativeRing, List.AnyList}`; extends: the component adds `DelegatedIndexed[\Char,ZZ32\]` | 2 | header (fsi:2438, fss:4326) |
| String | no body in the component, no `abstract` in the api | 5 | `size` (fsi:2440), `asFlatString` (fsi:2445), `uncheckedSubstring` (fsi:2467), `\|\|(b:String)` (fsi:2496), `\|\|(c:Char)` (fsi:2498) |
| String | in the api only (the last two written `abstract`) | 6 | `depth` (fsi:2444), `isBalanced` (:2446), `verify` (:2450), `rangeContains` (:2471), `splitWithOffsets` (:2483), `split` (:2484) |
| Generator2 | no body in the component, no `abstract` in the api | 1 | `seed` (fsi:2666) |
| RelationalPredicateCondition | the same | 2 | `relation`, `target` (fsi:2683-2684) |

**Accepted by the name gap, 4.** The stock check accepts these only through a member of another name:

- `TotalComparison`'s `=(self, other:Comparison)` (fsi:124), accepted through `>=`. The component's trait declares `=` at `TotalComparison` and at `Unordered`, and inherits `Comparison`'s.
- `RR64`'s `^(self, b:RR64)` (fsi:365), accepted through `MIN`, `MAX` and others. The component has `^(self, b:Number)` (fss:484).
- `Condition`'s `getter indices(): CompactFullRange[\ZZ32\]` (fsi:920), accepted through `bounds`. The component answers `Generator[\ZZ32\]` (fss:1525).
- `String`'s `balanced(): String` (fsi:2487), accepted through `allButLast`. No member of the name is in the component.

The 32 other members that the stock check accepts by name are 4h pairs that the component's half of the check reports anyway (27 of `Integral`, 4 of `QQ`, 1 of `String`). So does the component's half of the 3 `comp-abstract-matched-by-other-name` lines (`Range`'s `check`, `shiftLeft`, `shiftRight`).

## 3. Sorted by what would clear each

### 3.1 4h, 66: the api aligned with the component (`library-4h.patch`)

- **`abstract` written, 56 lines:** every row above that reads "no body in the component", except `String`'s 5.
- **The api declares the component's bodyless member, 3 lines:** `Comparison`'s `abstract getter asString(): String`, `ZeroIndexed`'s `abstract opr[r:Range[\ZZ32\]] : ZeroIndexed[\E\]` and `OpenRange`'s `abstract forward(): OpenRange[\I\]`. This is the same edit as writing `abstract` on a member that the api already declares (my reading).
- **The plain slips, 7 lines.** Each is plain by a test that needs no intent (my reading):
  - `EqualTo`'s `<` at `LessThan` (fsi:163) is `LessThan`'s own line copied. `LessThan` has `<(self, other:LessThan) = false`, and `EqualTo`'s component has `<(self, other:GreaterThan) = true` (fss:188, :210). The api takes `GreaterThan`.
  - `Indexed1` to `Indexed3` take the component's `extends HasRank`. Each of their extenders already extends `Rank1`, `Rank2` or `Rank3`, which extend `HasRank` (fsi:1545, :1696, :1813), so no type gains a supertype.
  - `ZeroIndexed`'s `bounds()` takes `getter`, as `Indexed` declares it (`abstract getter bounds()`, fsi:1269) and as the component writes it.
  - `ReductionPair` extends `SomeReductionPair[\L\]`. Its `outer` and `inner` answer `ActualReduction[\R,L\]`, which extends `Reduction[\L\]` (fsi:1885), so with `[\R\]` they could not override `SomeReductionPair`'s `Reduction[\R\]` members.
  - `Range`'s misspelt `asDebugStriing(): String` goes. No trait of the library declares it, under either spelling as a method. The getter `asDebugString` is `Object`'s.
- **Clears:** 64 of the 66 alone. `QQ`'s `numerator` and `denominator` stay until the check's component-to-api half compares with the api's member first (section 6, defect 3).

### 3.2 4i, 8 (and String's 2)

These are `Equality`'s `=`, `Indexed`'s `size` and `|self|`, `ActualReduction`'s `empty` and `join`, `AnyMaybe`'s `holds`, `Range`'s `isEmpty` and `ReadableArray`'s `opr[_:TrivialOpenRange]`, with `String`'s `splitWithOffsets` and `split`. Each is an api member written `abstract`, whose component member has a body, or a different header, or does not exist.

How the shadow applies 4i (`PROBE_EXPORT_4I`):

- An api member written `abstract` needs no satisfying declaration (`Specification/basic/components/apis.tex:252-257`: "other than the methods or fields declared abstract in d"). In the api-to-component direction this also covers 4i's first rule, a concrete member satisfying an abstract one.
- The "missing members" count counts the api's non-abstract members only. Without this, the second rule cannot clear the entries of `ActualReduction`, `AnyMaybe`, `Range` and `ReadableArray`, whose api lists more members than the component (`ExportChecker.scala:768`).

The component-to-api half is unchanged. Run S3 on the 4h tree: 51 → 41 differences, entries 20 → 15. `Equality`, `Indexed`, `ReadableArray`, `Range` and `AnyMaybe` leave the message.

### 3.3 Neither 4h nor 4i, and no decision by my reading: 17

- **An object field's getter, 4** (`BigReduction`'s `reduction`; `Comprehension`'s `reduction`, `body`, `unwrap`). These are the team's lines on both sides (`^5a68404fd`).
  - The component's value parameters are fields, and a field is local to its object (`Specification/basic/objects.tex:269-272`), but it carries a getter. The api writes the getters and names the parameters otherwise. The check reads neither the getters of the component's fields nor the parameters' names (`equalParams` compares types and modifiers only).
  - Two ways. (a) A check rule beyond 4i: a component object's value parameter satisfies an api getter of its name and type. (b) The api names the parameters as the component does, and drops the getters that restate them.
- **An api form that the component never defined, 4** (`opr[_:OpenRange[\ZZ32\]]` of `ImmutableArray1`, `Array1`, `Array2` and `Array3`). The team's api had them and its component did not, at `a874948ac`. Fork 5's way, the api lines out as climb batch 20 did for `immutableArray`'s ranks, applies. It removes four operators from Part IV, so it is a point to report, as fork 5 was (`coordinator/CLIMB-BATCH-20.md`, fork 5).
- **A result type that the api cannot name, 4** (`Array2`'s and `Array3`'s `bounds` and `zeroIndices`). The component answers `RangeInternals.CompactFullRange2D` (`3D`). The team's component did too, with static arguments (`a874948ac`; `3be1fecd7` dropped them). The api imports nothing from `RangeInternals`. `CompactFullRange2D` extends `CompactFullRange[\(ZZ32, ZZ32)\]` (`Library/RangeInternals.fsi:520-521`). So the component can declare the api's type, if none of its bodies needs the narrower one. Not measured.
- **The api's older signature, 3** (`ActualReduction`'s `leftDistribute`, `rightDistribute`, `distribute`). Only the component's form, `[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\]`, is built and used: by the reductions (fss:3435-3451) and by `Library/Generator2.fss:73-79`. The api declares `PossibleReductionPair` itself (fsi:1901-1903). The way is the api taking the component's three headers. It changes Part IV (a point to report).
- **`DelegatedIndexed`, 2.**
  - Its api restates `getter size(): ZZ32`, which the component's trait inherits from `Indexed`'s body (fss:1967). The way is the line out of the api, or a check rule that counts inherited bodies. The line out makes `size` abstract again for `DelegatedIndexed`'s extenders in other components (`FlatString`, `Library/FlatString.fss:34-35`, defines it), so it needs a run.
  - Its `generator` answers `Indexed[\E,I\]` in the component and `Generator[\E\]` in the api. `FlatString` overrides it at `Generator[\Char\]` (`FlatString.fss:45`) against the api's type, so the api's is the one that other components rely on. The way is the component widened to the api's type: its bodies call only `Generator` methods on it (fss:2092-2105).
- And of the 4 accepted by the name gap: `TotalComparison`'s `=`, by the api writing the component's two forms.

### 3.4 A decision, 6

- **`RR64`'s rounding, 3:** `|\self/|` and `|/self\|` answer `ZZ64` in the api and `ZZ` in the component, and `truncate` answers `ZZ64` in the api and `RR64` in the component (fsi:377-380, fss:498-501, both the team's). This is a contract of the number types that no decision on record names (my reading). Beside it, accepted by the name gap: `^(self, b:RR64)` in the api and `^(self, b:Number)` in the component, next to P-153's build and climb batch 20's fork 7.
- **`Condition`, 3:**
  - Its `extends` clause. The component's `Condition` extends `ZeroIndexed`, and the api puts `ZeroIndexed` on `Maybe` instead (fsi:913, :975; fss:1518).
  - Two result types, narrower in the component: `indexValuePairs` and `ivmap` answer `Condition[\…\]` where the api has `Generator[\…\]`.
  - And, accepted by the name gap: `indices`, wider in the component.

  Which of `Condition` and `Maybe` is `ZeroIndexed` in Part IV is a choice of the type hierarchy, beside `Maybe`'s own entries.

### 3.5 Waiting elsewhere, 18, listed and not fixed (the brief's item 4)

- **`Maybe`, `Just` and `Nothing`, 5 (P-90):** `Maybe`'s extends clause; `Just`'s and `Nothing`'s subscripts at a `Range` against the component's at a `ZZ32`; `Just`'s `SQCAP` and `SQCUP`.
  - `AnyMaybe`'s `holds` is 4i's and `AnyUniqueItem`'s `holds` is 4h's. Neither waits.
  - Run S3: after 4h and 4i, all 5 remain.
- **`String`, 13 (P-155):**
  - By kind: 5 are 4h's (`size`, `asFlatString`, `uncheckedSubstring`, two `||`), 2 are 4i's (`splitWithOffsets`, `split`), 2 are header clauses (its excludes and extends) and 4 are api members that the component lacks (`depth`, `isBalanced`, `verify`, `rangeContains`). One more, `balanced`, is accepted by the name gap.
  - Run S3: after 4h and 4i, 11 remain, since the patch leaves `String` alone.

## 4. The 4h patch, measured

### 4.1 What it is

`library-4h.patch`: `Library/FortressLibrary.fsi` alone, 65 insertions and 63 deletions. It holds 56 lines that take `abstract`, 3 added declarations, 6 changed lines and 1 removed line (section 3.1).

The first draft put `OpenRange`'s `abstract forward()` before its getters. The parser refuses that: 'Field/getter/setter declarations should come before method declarations.' (fsi:2218-2221 of the draft). In the patch it follows them. That draft's run is section 6, defect 4.

### 4.2 The sites, before and after

Command: `explorations/coordinator/tools/distance/run.sh tmp/dist-4h/distance.txt tmp/dist-4h`, then `python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/dist-4h/errors.tsv`. It prints:

    landed 5 now 28
    export 'are not matched by the declarations': landed 43 entries, now 20
      entry COME   (TraitDecl Array2 at FortressLibrary.fsi:L, due to different method bounds @ FortressLibrary.fsi:L)
      entry COME   (TraitDecl QQ at FortressLibrary.fsi:L, due to Asbtract method numerator @ FortressLibrary.fss:L is not declared in the API)

Site by site:

| Site | Class | Before (gate) | After 4h (run A) | After 4h and the follow-on (run B) |
|---|---|---|---|---|
| `FortressLibrary.fss:12`, export | X1 | 1 error, 43 entries | 1 error, 20 entries | 1 error, 20 entries |
| `FortressLibrary.fss:4386`, `BIG MIN` | BR | 1 | 1 | 1 |
| `FortressLibrary.fss:4392`, `BIG MIN` | BR | 1 | 1 | 1 |
| `FortressLibrary.fss:1465`, the fused arm | OT | 1 | 1 | 1 |
| `List.fss:146` | OT | 1 | 1 | 1 |
| `FortressBuiltin.fss:563`, `BigNum` | D2 (BITNOT's in OT) | | 15 | |
| `FortressBuiltin.fss:367`, `Int` | D2 | | 1 | |
| `FortressBuiltin.fss:376`, `Long` | D2 | | 1 | |
| `RangeInternals.fss:349`, `OpenScalarRange` | D2 | | 2 | |
| `RangeInternals.fss:380`, `OpenRange2D` | D2 | | 2 | |
| `RangeInternals.fss:398`, `OpenRange3D` | D2 | | 2 | |
| **`#total`** | | **5** | **28** | **5** |

The two entries that come after 4h are the same traits that the message named before, narrowed: `Array2` now differs only in `bounds`, and `QQ` names `numerator` where it named `isNaN`. The 20 entries after 4h are:

- Nothing, Indexed, DelegatedIndexed, ReadableArray, ImmutableArray1, Array1, Array2, Array3;
- ActualReduction, BigReduction, Comprehension, Range, String, RR64, QQ;
- Equality, Condition, AnyMaybe, Maybe, Just.

The stage's own reading of run A: '#kind abstract-method 22', '#kind other/overloading 1', '#class D2 22', '#class OT 3'. `errors.py`'s pattern does not take the name `prefix BITNOT`, so one abstract-method error is counted as other (section 6, defect 5).

### 4.3 Each new error, the line that brings it, and the line that clears it

- **`BigNum`, 15** (`FortressBuiltin.fss:563`, `value object BigNum extends ZZ`): 'The inherited abstract method BITAND(self:(Integral[\I\] & {I}),b:I):I from the trait Integral[\ZZ\] has no concrete implementation in the object BigNum in component FortressBuiltin.' The others are the same for `BITOR`, `BITXOR`, `CHOOSE`, `DIV`, `GCD`, `LCM`, `LSHIFT`, `MOD`, `REM`, `RSHIFT`, `^`, `getter one`, `getter zero` and `prefix BITNOT`.
  - Each comes from the matching `abstract` line in `Integral` (fsi:448-473).
  - `ZZ`'s component defines all 15 (fss:990 on), and `ZZ`'s api shows none of them (fsi:646-679). `FortressBuiltin` sees `ZZ` through the api.
- **`Int` and `Long`, 1 each** (`FortressBuiltin.fss:367`, `:376`): `^(self, b:AnyIntegral)` from `Integral[\ZZ32\]` and `Integral[\ZZ64\]`. It comes from `Integral`'s `abstract opr ^(self, b:AnyIntegral):I` (fsi:473). `ZZ32`'s and `ZZ64`'s components define it, and their apis show only the `IntLiteral` form. `NN64`'s api shows both (fsi:525-526).
- **The open ranges, 6** (`RangeInternals.fss:349`, `:380`, `:398`): 'The inherited abstract method shiftLeft(amount:I):Range[\I\] from the trait Range[\ZZ32\] has no concrete implementation in the object OpenScalarRange in component RangeInternals.' The others are the same for `shiftRight`, and for `OpenRange2D` and `OpenRange3D`. They come from `Range`'s `abstract shiftLeft` and `abstract shiftRight` (fsi:2207-2208). `OpenRange`'s component defines both (`= self`, fss:4051-4052), and its api does not show them.

The follow-on, 19 api lines, each the component's own header of a member that it defines. Applied after the patch:

    trait ZZ32 ...          +    opr ^(self, b:AnyIntegral):ZZ32           (before its IntLiteral form)
    trait ZZ64 ...          +    opr ^(self, b:AnyIntegral):ZZ64           (the same)
    trait ZZ ...            +    getter zero(): ZZ                          (after the coercions)
                            +    getter one(): ZZ
                            +    opr DIV(self, b: ZZ): ZZ                   (after opr /)
                            +    opr REM(self, b: ZZ): ZZ
                            +    opr MOD(self, b: ZZ): ZZ
                            +    opr GCD(self, b: ZZ): ZZ
                            +    opr LCM(self, b: ZZ): ZZ
                            +    opr CHOOSE(self, b: ZZ): ZZ
                            +    opr BITAND(self, b: ZZ): ZZ
                            +    opr BITOR(self, b: ZZ): ZZ
                            +    opr BITXOR(self, b: ZZ): ZZ
                            +    opr LSHIFT(self, b:AnyIntegral): ZZ
                            +    opr RSHIFT(self, b:AnyIntegral): ZZ
                            +    opr BITNOT(self): ZZ
                            +    opr ^(self, b:AnyIntegral):ZZ              (before its IntLiteral form)
    trait OpenRange[\I\]    +    shiftLeft(amount: I): OpenRange[\I\]       (after opr IN)
                            +    shiftRight(amount: I): OpenRange[\I\]

Run B, the stock stage with the patch and these 19 lines: '#total 5', '#kind abstract-method 0', '#kind export 1', '#class X1 1', '#class BR 2', '#class OT 2', '#crash none'. `compare-sites.py` prints 'landed 5 now 5', and the export error's 20 entries are run A's. So each of the 23 errors is cleared by the line that shows the member, and no line brings another error.

The follow-on is not in `library-4h.patch`, which holds the brief's 4h edits alone.

### 4.4 Walk

Walk runs the component, so the api's `abstract` lines and slips change no value by reading. Measured on the patch:

- `explorations/coordinator/tools/mg-run.sh tmp/mg-4h 4h 1` prints 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' for both `MicroGptFlatQuick` (rc=0, 56 s) and `MicroGptAplQuick` (rc=0, 66 s).
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/h1` on `IntSemanticsRungI`, `PowChooseLcmRungE`, `RangePrototype`, `RangeTest`, `RangeDeclarations`, `Brackets`, `ComparisonLazyLexico`, `ExclusionRemainderRungH` and `UnsignedTest` (`ProjectFortress/tests/`) prints 'OK (9 tests)'.

No suite was run. The walk run of the follow-on lines was not made: they only declare in the api members that the component defines.

## 5. What the patch's lines change in the specification

None of this lands. If `library-4h.patch` lands, Part IV, the api rendered (`Specification/library/default-libraries.tex:27`), changes in the same places:

- 56 declarations become `abstract`;
- three are added;
- `EqualTo`'s `<`, `Indexed1` to `Indexed3`'s headers, `ZeroIndexed`'s `bounds` and `ReductionPair`'s header change;
- `Range`'s `asDebugStriing` goes.

No sentence of `Specification/` was searched for them.

## 6. Defects found on the way

1. **The export check matches a trait's members without their names.**
   - `equalFnHeaders` binds the header's name to `_` (`ExportChecker.scala:600`, `SFnHeader(sparamsL, modsL, _, …)`), and `equalMember` compares nothing else.
   - So an api member is satisfied by any component member with its header, and a component abstract member is "declared in the API" by any api member with its header.
   - On this library that hides 4 differences (section 2) and lets 32 pairs pass on the api's half. `String`'s `||(self, b:String)` passes through `|||` (fsi:2496, fss:4417), and `Integral`'s `+` through `MINNUM`.
   - The text asks for "a definition d' with the same name as d" (`Specification/basic/components/apis.tex:252-253`). No ledger row holds it (`ledger-find:ExportChecker`, `ledger-find:export check`: rows 637, 737, 768, 769, 782, 584, 603, 604, 784 are other gaps).
   - Shown by the shadow's `api-matched-by-other-name` lines; no test.
2. **Its field comparison ignores names and modifiers.** `equalLValue` (`ExportChecker.scala:812-821`) writes `equalIds(nameL, nameR) && modsL.equals(modsR)` on one line and the type `match` on the next. Scala reads a newline before `(` as the end of a statement, so the first line is discarded and only the types are compared.
   - A ten-line Scala program of the same shape, compiled with the tree's scalac 2.13.18, prints 'names compared' and 'different names, same type: true'.
   - No difference of this library trips it (no field line among the shadow's), so it hides nothing here.
   - No ledger row.
3. **Its component-to-api half compares with the arguments swapped, against a one-sided self-type rule.**
   - `allAbstractsMadePublic` calls `equalMember(d, r)` with the component's member `d` where `equalMember` takes the api's (`:752`, `:791`).
   - `equalTypes` accepts two self types when the left one's list is empty (`:485-488`, under the team's note that `comprises {...}` and a plain self type share that encoding).
   - `QQ`'s api writes `comprises { ... }` and its component `comprises { Ratio }` (fsi:398, and the component's `trait QQ`). So the component's `abstract numerator(self:(QQ & {Ratio}))` never matches the api's `abstract numerator(self:QQ)`, while the api's half, which calls it the other way round, matches it (run S2's `comp-abstract-differs` lines, with no differing part).
   - After 4h this keeps `QQ` in the message: 'due to Asbtract method numerator @ FortressLibrary.fss:L is not declared in the API'. The fix is the argument order at `:752` (my reading).
   - No ledger row.
4. **The distance stage reads a library that does not parse as no distance.**
   - The patch's first draft made every target stop at parse: 'File FortressLibrary.fss has 4 errors.', '### done Library/FortressLibrary.fss rc=-1 seconds=1'.
   - The table printed '#total 0', '#kind export 0', '#crash none', '#seconds 5' and '#shadow every shadow edit matched the tracked sources'. `explorations/coordinator/tools/distance/table.py` counts only the `@@SC`, `@@TC` and `### target-crash` lines (its lines 45-87), and reads neither a `### done … rc=-1` line nor 'File … has N errors'.
   - A gate's distance would read 0 on such a tree; its suites would still fail.
   - No ledger row.
5. **`errors.py` gives an abstract-method error of a prefix operator the kind `other/<stage>`.** Its pattern `inherited abstract method (?:abstract getter )?(\S+?)[(:\[]` (`explorations/coordinator/tools/distance/errors.py:115`) stops at the space in `prefix BITNOT`. Run A counted `BigNum`'s `BITNOT` error under '#kind other/overloading' and '#class OT'.

None of these is written to the ledger: the brief gives this probe its two patches and its report alone.

## 7. Decisions

- **The base.** I seeded from the main tree's build at `main`'s `4463902e9`, not at `0c7e7be18`. The two have the same code (the `git diff --stat` of the header comment), and the main tree passes the seeding script's checks. Alternative: a new base build at `0c7e7be18`, about 200 s and 200 MB on a disk with under 1 GB left. No decision on record covers it.
- **What a difference is, and the name gap.** The shadow compares by name as well as by header, but counts as a difference only what the stock rules report: the 115. The name gap's 4 are listed apart, so that the 115 stay comparable with the stock message. Alternative: one count, 119.
- **4h's edges.**
  - The three bodyless component members that the api lacks are counted as 4h, since they are the same edit as the 56.
  - The 7 plain slips are those whose wrong side shows without intent (section 3.1). The contract items (sections 3.3 and 3.4) are left out, though some have a side that the code settles: `ActualReduction`'s signatures and `DelegatedIndexed`'s `generator`.
  - Alternative: those counted as slips too, which would put 4 more lines in the patch.
- **What the patch leaves.** `String` and `Maybe` stay out by the brief. The 4i items stay out, since they are a check edit, and so do the neither and decision items.
- **The follow-on** was measured as a variant, run B, and is given in section 4.3, not in the patch file, which holds 4h's edits as the brief names them. Alternative: one patch with both, which a rung would land together.
- **4i in the shadow** includes the count rule of section 3.2, which the ways note does not name. Without it, 4i's second rule cannot clear an entry whose api has more members.
- **Walk checks** (section 4.4): the brief did not ask for them. I ran the quick pair and nine tests as a smoke test of the ways note's "Walk: none by my reading".
- **The report's place.** The Write tool refused `explorations/perf-probes/export-check-full/REPORT.md`, and this file is where the brief says to put it then. The two patches are committed. The report is not, and I did not move it into the tree by another route.

## 8. For FACTS

- **The FortressLibrary export error hides 115 differences.**
  - The fact: its 43 entries hold 115 differences by the stock check's rules, and 4 more that the check accepts only through its name-blind matching. They sort as section 3's table gives: 4h 66 (56 `abstract`, 3 added, 7 slips), 4i 8, neither 17, a decision 6, `Maybe` 5 (P-90) and `String` 13 (P-155).
  - What it means: 4h and 4i together leave the export error with 15 entries and 41 differences, 16 of them `Maybe`'s and `String`'s. The other 25 need the ways of sections 3.3 and 3.4.
  - The numbers: 115, counted as section 1 says, over 43 traits and objects.
  - Shown by: the shadow (`export-check-shadow.patch`) on the landed library: 190 `#XDIFF` lines, by kind as section 1 lists them.
  - Detail: sections 1 to 3.
- **4h's `abstract` lines reach the components that implement the traits.**
  - The fact: `library-4h.patch` takes the distance from 5 to 28: the export entries 43 → 20, and 23 abstract-method errors come in `FortressBuiltin` (17) and `RangeInternals` (6). With 19 api lines that show the implementing traits' concrete members (`ZZ`, `ZZ32`, `ZZ64`, `OpenRange`), the distance is 5 again, with 20 entries, and nothing else comes.
  - What it means: a rung of 4h carries the 19 lines with it. Its sites move from the export entries only, since the error stays while `Maybe`'s and `String`'s entries do.
  - Shown by: the stock distance stage on the patch, with and without the follow-on (section 4.2).
  - Detail: section 4.
- **The export check matches members without their names, compares fields by type alone, and swaps its arguments in its component-to-api half.**
  - What it means: a fix of the first surfaces 4 hidden differences, and one of the third clears `QQ`'s last 2 after 4h.
  - Shown by: the shadow's `api-matched-by-other-name` and `comp-abstract-differs` lines, and the Scala check of defect 2. No test.
  - Detail: section 6, items 1 to 3.
- **The distance stage prints `#total 0` for a library that does not parse.** Shown by: section 6, item 4.

## 9. Commands

- The shadow's build and run (section 1). The `sed` line makes a copy of `run.sh` that puts `$XCP` ahead of the class path, and the Scala compile of one file follows `compiler.md`, "Testing an edit here".
- `grep '^#XDIFF' <scratch>/run.txt` prints the shadow's lines. The fields are: unit, trait, kind, member, api span, component span, detail.
- `python3 -I explorations/perf-probes/array-sites/compare-sites.py <before.tsv> <scratch>/errors.tsv` compares a run's sites with the gate's list.

## 10. Questions for the curator

1. **`RR64`'s rounding contract.**
   - The question: should `|\x/|` and `|/x\|` of an `RR64` answer `ZZ64`, as the api says, or `ZZ`, as the component does? And `truncate`: `ZZ64` (api) or `RR64` (component)? Beside them, `^(self, b:RR64)` (api) against `^(self, b:Number)` (component).
   - Alternatives: the api's types; the component's; or each member on its own.
   - Evidence: section 3.4. Both texts are the team's (`^5a68404fd`). Walk runs the component's.
   - What turns on it: 3 of the 6 that need a decision, and 1 of the name gap's.
   - Default if unanswered: none taken. The entry stays in the export error.
2. **Which of `Condition` and `Maybe` extends `ZeroIndexed` in Part IV.**
   - The question: the component puts `ZeroIndexed` on `Condition` (fss:1518), and the api on `Maybe` (fsi:975). Condition's result types follow the choice: `indexValuePairs` and `ivmap` answer `Condition` in the component, and `indices` answers `Generator` there.
   - Alternatives: the component's hierarchy written into the api; the api's into the component; or neither until P-90's `Maybe` work.
   - Evidence: section 3.4.
   - What turns on it: 3 differences and 1 of the name gap's, beside `Maybe`'s 5 that wait on P-90.
   - Default if unanswered: none taken.
