<!-- Probe report on where ZeroIndexed stands, on Condition or on Maybe, and on Condition's result types, between the FortressLibrary api and its component: every way the library and the language offer, the declarations each changes in the api, the component and the specification, the decisions on record that bear on each, and each way that changes the library measured once by the stock distance stage and by walk on 48 interpreter tests. Written 2026-10-23 by an Opus worker for the coordinating session (brief: the probe of the export check's question 2, explorations/perf-probes/export-check-full/REPORT.md, section 10). It decides nothing. Base: main at 2357a9b95. Its Library/, ProjectFortress/, build.xml and bin/ equal the base build /home/user/fortress-base21b at 24919e97d, and equal the climb batch 21 gate's dd60211b3 (both `git diff --stat` are empty). Worktree /home/user/fortress-probe-condzi, seeded from the base build, detached, removed at the end. Readings of my own are marked "(my reading)". The Write tool refused this file at the brief's path, so it was returned as text. -->

# Where `ZeroIndexed` stands: `Condition` or `Maybe`, and `Condition`'s result types

## In short

- **The two texts parted when `Condition` was born.** `28ecf5f0d` (jmaessen, 2008-04-08) introduced `Condition`; its message says the new type "subsumed (after a bit of renaming) most of the methods that used to live in `Maybe[\T\]`".
  - In the component, that commit moved `ZeroIndexed` and the range subscript from `Maybe`, `Just` and `Nothing` up to `Condition`.
  - In the api, it left them where the 1.0 release had them (`Specification-1.0-frozen/fortress.1.0.pdf`, 2008-03-31: `Maybe` extends `{ MaybeType, SequentialGenerator, ZeroIndexed }`, and `Just` and `Nothing` each have `opr [r : Range[\ZZ32\]]`).
  - `2f26aeded` (jmaessen, 2008-10-08) widened `indices` to `Generator` across the component's `Indexed` family, `Condition` included, and not in the api's `Condition`.
  - (My reading:) the component holds the later intent, and the api lagged twice.
- **The library's own way** is to declare `ZeroIndexed` identically in api and component, on the most general trait whose values are zero-indexed (`List`, `Set`, `String`, `TupleType`). Its indexed types narrow `indexValuePairs`, `map` and `ivmap` to their own family. The revival already gave the api's `Condition.map` the component's `Condition[\G\]` (F-63).
- **The specification is silent on the placement.** `if.tex:53` and `while.tex:29` say only "A Condition is a generator that generates 0 or 1 element". Part IV renders the api.
- **Measured.** Every way that puts `ZeroIndexed` on one side clears Condition's and Maybe's export entries (43→41). The clean ones keep the distance at 5 and walk green:
  - A+, A' and A++: api-only, walk untouched;
  - B+: component edits with meets;
  - D+: `ZeroIndexed` on `UniqueItem`, with meets.
- **Variants that bring errors:**
  - A without the range-subscript line brings 1 error on `Boolean`;
  - C (`ZeroIndexed` on neither) brings 3 on `splitWithOffsets`;
  - D without meets brings 6 overloading errors;
  - B without meets keeps the distance at 5 but breaks walk's `QuickCheckTest`.
- **Decisions on record:** P-90 and P-156 decide nothing here, and P-155's two known `Maybe` meets bear on it (section 2.5). The batch-21 record files Maybe's entries under P-90, which the curator may want to re-route (my reading).

## 1. The texts

At 2357a9b95:

- **The api.**
  - `Library/FortressLibrary.fsi:915`: `trait Condition[\E\] extends SequentialGenerator[\E\]`.
  - `:922` `getter indices(): CompactFullRange[\ZZ32\]`, `:923` `getter indexValuePairs(): Generator[\(ZZ32,E)\]`, `:935` `ivmap[\G\](...): Generator[\G\]`. It has no range subscript.
  - `:977-978` `Maybe` extends `{ AnyMaybe, Condition[\T\], ZeroIndexed[\T\], UniqueItem[\T\] }`.
  - `:981-982`: Maybe's meets `opr |self|` and `opr [i:ZZ32]`, which the revival added (557cabb04).
  - `:996` Just's `opr[r:Range[\ZZ32\]]:Maybe[\T\]`; `:1021` Nothing's `opr[r:Range[\ZZ32\]]: Nothing[\T\]`.
  - `:1045` `UniqueItem` extends `{ AnyUniqueItem, Condition[\T\] }`.
- **The component.**
  - `Library/FortressLibrary.fss:1519`: `trait Condition[\E\] extends { ZeroIndexed[\E\], SequentialGenerator[\E\] }`.
  - `:1526` `indices(): Generator[\ZZ32\] = self.bounds`, `:1527` `indexValuePairs(): Condition[\(ZZ32,E)\]`, `:1530` `reverse(): Condition[\E\] = self`, `:1533` `opr [r:Range[\ZZ32\]]: Condition[\E\]`, `:1546` `ivmap: Condition[\G\]`.
  - `:1627-1628` `Maybe` extends `{ AnyMaybe, Condition[\T\], UniqueItem[\T\] }`.
  - The component's `Just` and `Nothing` have no range subscript; they inherit Condition's.
- **The extenders.** `Condition`'s extenders are `Maybe`, `UniqueItem` (fsi:1045, fss:1708), `PossibleReductionPair` (fss:3263), `RelationalPredicateCondition` (fss:4852) and `Boolean`. `Boolean` is the only one outside `FortressLibrary`, and so the only one that sees `Condition` through the api: `value object Boolean extends { Condition[\()\], StandardTotalOrder[\Boolean\] }` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:225-226`). So in the component today, `Boolean`, `NotUnique` and every `Condition` are `ZeroIndexed`; in the api, only `Maybe` is.
- **The export check's counts** (cited from `export-check-full/REPORT.md` §3.4): 3 differences, the extends clause and two result types, plus `indices` accepted by the name gap. Maybe's extends clause is among the 5 that §3.5 files under P-90. The landed gate list (`explorations/compile-ladder/gate/distance-sites.tsv`, recorded with `climb-batch-21/gate/` in c53063bbd) names Condition, Maybe, Just and Nothing among its 43 entries.

## 2. The evidence

### 2.1 History

Commands: `git log --all -- Library/FortressLibrary.fs?` (162 team commits), each version scanned for the headers; then `git show 28ecf5f0d`, `git show 2f26aeded`.

- **1.0, 2008-03-31.** `pdftotext Specification-1.0-frozen/fortress.1.0.pdf` shows, under "The Maybe type": "value trait Maybe[T] extends { MaybeType, SequentialGenerator[T], ZeroIndexed[T] }". `Just` and `Nothing` each have "opr [r : Range[Z32]]". There is no `Condition`.
- **`28ecf5f0d`, 2008-04-08, jmaessen: "Binding maybe values in if".** Its message: "There is a new type, `Condition[\E\]`, to describe `Generator`s that generate 0 or 1 `E`s. This subsumed (after a bit of renaming) most of the methods that used to live in `Maybe[\T\]`. Right now only `Maybe` and `Boolean` implement `Condition`."
  - In the api: `+trait Condition[\E\] extends SequentialGenerator[\E\]`, with results `Generator[...]`; `Maybe` became `extends { MaybeType, Condition[\T\], ZeroIndexed[\T\] }`.
  - In the component: `+trait Condition[\E\] extends { ZeroIndexed[\E\], SequentialGenerator[\E\] }` with results `Condition[...]` and `+opr [r:Range[\ZZ32\]]: Condition[\E\]`; `Maybe` became `extends { MaybeType, Condition[\T\] }`; `-opr[r:Range[\ZZ32\]]:Maybe[\T\]` was removed from `Just` and `-opr[r:Range[\ZZ32\]]: Nothing[\T\]` from `Nothing`.
  - All 130 later team versions keep these two forms; `UniqueItem` was added later on both sides alike.
- **`2f26aeded`, 2008-10-08, jmaessen.** In the component: `-getter indices(): CompactFullRange[\ZZ32\] = self.bounds` became `+getter indices(): Generator[\ZZ32\] = self.bounds`, together with `Indexed`'s family moving to `Generator[\I\]`. The api's `Condition` was not touched.
- **The team's compiler library.** `Library/CompilerLibrary.fsi:193-216` (`^5a68404fd`, David Chase, 2012-07-19) keeps a commented-out api-form copy of the component's `Condition`: `(*) trait Condition[\E extends Equality[\E\]\] (*) extends { ZeroIndexed[\E\], SequentialGenerator[\E\] }`, with `indexValuePairs(): Condition[\(ZZ32,E)\]`, `ivmap: Condition[\G\]`, `indices(): Generator[\ZZ32\]`. The compiler prelude has no `ZeroIndexed` (row 71), and its live `Condition` (`CompilerBuiltin.fsi:652`) is a `SequentialGenerator` only.
- **None of these is one of `exploring.md`'s late positions;** none speaks to this question. No later work after the repository was checked, since this is not a type rule.

### 2.2 The library's own ways on its other indexed types

- **Identical in api and component.** `List` (`List.fsi:67`, `List.fss:106`), `Set` (`Set.fsi:25`, `Set.fss:26`), `String` (fsi:2430, fss:4335), `CaseInsensitiveString`, `TupleType` (`Reflect.fsi:130`, `Reflect.fss:208`). The one api that differs, PureList's, is a ledger row (355).
- **On the most general trait whose values are all zero-indexed:** `List`, not its objects.
- **The result types narrow to the type's own family:**
  - `indexValuePairs`: `ZeroIndexed[\(ZZ32,E)\]` in `Set.fss:28` and `PrefixSet.fsi:39`;
  - `map` and `ivmap`: the arrays answer their own array types (fsi:1442-1851), and `Maybe` answers `Maybe` (fsi:983-984);
  - the revival's precedent: the api's `Condition.map` was given the component's `Condition[\G\]` (F-63; a7ced6764).
- **`indices`** answers `Generator[\I\]` in `Indexed` and most of its family (fsi:1302, 1349, 1411), and `CompactFullRange[\ZZ32\]` in `String`, in both texts (fsi:2433, fss:4339). So either type is the library's own; what the library always does is write the same type on both sides.
- **The meet device.** Where one type inherits two bodies, the revival declares the member on the meet, restating the body: Maybe's `map` and `ivmap` (0ae526b31), and Maybe's `|self|` and `[i]` (557cabb04). The symbolic-operators probe gives their cause: "Maybe: the api's Condition `:921` beside Indexed's `:1294`. In the api, Condition does not extend ZeroIndexed, though in the component it does" (`perf-probes/symbolic-operators/SORT.md:126-127`).

### 2.3 The specification

- `Specification/basic/expressions/if.tex:49-53` and `while.tex:25-29`: a binding's condition must be a subtype of `Condition[\E\]`; "A Condition is a generator that generates 0 or 1 element."
- `generators.tex:49-51`: a filter has type `Generator[\()\]`, "this includes the type Boolean".
- `basic-lib/convenience.tex:34-56`: `Maybe` comprises `Nothing[\T\]` and `Just[\T\]`, with no supertypes given.
- `basic/components/apis.tex:252-256`: "The header and type of d' must be the same as the header and type of d." So the extends clauses must agree.
- Part IV renders the api (`library/default-libraries.tex:27`).
- No prose sentence places `ZeroIndexed`, and none becomes false under any way. Appendix I has no entry on `Condition`.

### 2.4 The team's comments

- Both texts have the same doc comment on `Condition`: "A Condition is a Generator that generates 0 or 1 element. Conditions can be used as nullary comprehension generators or as predicates in an if expression" (fsi:912-914, fss:1516-1518).
- `Indexed`'s comment: "It is necessary to define one of %indices()% and %indexValuePairs()%" (fsi:1253-1257). This is why way B needs meets (section 4).
- 28ecf5f0d's message (section 2.1).

### 2.5 The decisions on record

- **P-90** (`Nothing[\T\]` parametric; a bare `Nothing` is future work). It does not speak to `ZeroIndexed` or to the range subscripts (my reading). The record nonetheless files Maybe's extends clause and Just's and Nothing's subscripts under it: `export-check-full/REPORT.md` §3.5, and `CLIMB-BATCH-21.md:395`, "P-90 holds Maybe's entries". Every way except R moves an entry that is filed there.
- **P-156** (`I extends Index`; `Range` excludes `Index`). The subscript pair `[i:ZZ32]` beside `[r:Range[\ZZ32\]]`, which A+ shows on the api's `Condition` and B+ writes on `Just` and `Nothing`, is valid by it. No way conflicts with it.
- **P-155** (the checker reads symbolic operators; this is the full check, not the stock distance).
  - Maybe's `|self|` and `[i]` meets exist only because the api's `Condition` is not `ZeroIndexed`. Under A, A+, A++ and A' they become restatements (my reading).
  - Under B, B+, D and D+, the full check would likely ask for more symbolic meets, such as Maybe's or UniqueItem's range subscript. Not measured.
- **P-27** (the library's own practice is the standard): section 2.2.
- **F-63:** the result-type precedent.
- **Batch 21's default 5** (`CLIMB-BATCH-21.md:141`): "no default taken; the three differences stay".

## 3. The ways

The declarations that each way changes. "Part IV" means the api lines, as rendered. No way makes a prose sentence false.

| Way | api (and Part IV) | component | Decisions that bear |
|---|---|---|---|
| **A**: the component's hierarchy in the api | `Condition` extends `{ ZeroIndexed[\E\], SequentialGenerator[\E\] }`; `indices: Generator[\ZZ32\]`; `indexValuePairs: Condition[\(ZZ32,E)\]`; `ivmap: Condition[\G\]`; `Maybe` drops `ZeroIndexed[\T\]` (5 lines) | none | Maybe's header is filed under P-90 (§2.5); F-63; P-27 |
| **A+**: A plus the component's concrete range subscript shown | A, plus `opr [r:Range[\ZZ32\]]: Condition[\E\]` after `[i]` | none | as A; P-156 (the pair) |
| **A++**: A+ plus the 1.0 leftovers out | A+, minus Just's `opr[r:Range[\ZZ32\]]:Maybe[\T\]` and Nothing's `opr[r:Range[\ZZ32\]]: Nothing[\T\]` (fsi:996, :1021) | none | as A; 2 of P-90's 5 move; two operators leave Part IV |
| **A'**: as A+, but `Maybe`'s header kept in the api | `Condition` as in A+; `Maybe` unchanged | `Maybe` adds the redundant `ZeroIndexed[\T\]` (fss:1628) | as A |
| **R**: the result types alone | `indices`, `indexValuePairs`, `ivmap` take the component's types (3 lines) | none | F-63; leaves both headers, and P-90's entry, alone |
| **B**: the api's hierarchy in the component | none | `Condition` extends `SequentialGenerator[\E\]`; `indices: CompactFullRange[\ZZ32\]`; `indexValuePairs: Generator[...]`; `ivmap: Generator[\G\]`; `Maybe` adds `ZeroIndexed[\T\]` | P-90's filing; Boolean, `NotUnique`, `PossibleReductionPair` and `RelationalPredicateCondition` stop being `ZeroIndexed` under walk |
| **B+**: B with what it needs | `Maybe` adds the meets `getter indices(): CompactFullRange[\ZZ32\]`, `getter indexValuePairs(): Maybe[\(ZZ32,T)\]`, `getter reverse(): Maybe[\T\]` | B, plus the same three meets with Condition's bodies restated; `Just` and `Nothing` take back the api's range subscripts, with Condition's body forms | as B; the revival's meet device (§2.2); P-156 |
| **C**: on neither | `Condition`'s results as in R; `Maybe` drops `ZeroIndexed` | `Condition` drops `ZeroIndexed` | contradicts both team texts and 1.0. `String.fss:323` and `:451` and `FlatString.fss:149` answer `Nothing` as a `ZeroIndexed`, so it also needs a `String` change (not measured) |
| **D**: on `UniqueItem` | results as in R; `Maybe` drops `ZeroIndexed`; `UniqueItem` adds it | `Condition` drops it; `UniqueItem` adds it | no team text; `NotUnique` stays `ZeroIndexed` |
| **D+**: D with what it needs | D, plus `UniqueItem`'s `map` and `ivmap` answering `UniqueItem[\G\]` | D, plus the same two meets with Condition's bodies | as D |
| **E**: no change | | | the default (batch 21's default 5); not measured |

**Not a way:** a change to the export check, such as comparing every supertype rather than the written extends clauses. It would leave the two texts different, which `apis.tex:256` forbids.

## 4. The measurements

**Commands**, run in the seeded worktree, one way at a time:
1. apply the way's exact text edits;
2. `explorations/coordinator/tools/distance/run.sh <out>/distance.txt <out>/dist`;
3. `python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv <out>/dist/errors.tsv`;
4. `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/ways/h-<way> <the 48 files, with ReductionSimpleJoinAtAnyWalk.test>`;
5. `git checkout -- Library`.

The machine: nproc=4, Intel Xeon @ 2.10GHz, openjdk 25.0.4.1; `FORTRESS_THREADS=1` for the distance stage, 4 for the harness. No timing was taken.

**The 48 tests** are the union of three `git grep -l -E` searches under `ProjectFortress/tests/*.fss`:
- `'\bCondition\b|\bMaybe\b|\bJust\b|\bNothing\b|indexValuePairs|ivmap'` (46);
- binding `if`, `elif` and `while`: `'^\s*(if|elif|while)\b[^=]*<-|\b(if|elif|while) +[(]?[A-Za-z_][A-Za-z0-9_]* *<-'` (11);
- `'<- *(Just|Nothing)'`.

They are: ArrayListQuick, CharacterTest, ExceptionScoping, ExclusionRemainderRungH, FileConversion, FlatTowerRungF, GeneratorDeclarations, GenericMethodBesideConditionedMethodWalk, HeapTest, IndexValuePairsDefault, IndicesGetterCalls, IntMapCombine, LibraryMeetDeclarations, LibraryOverloadFamilies, MapTest, NestedReductionFusion, NumberOrderListDeclarations, PrefixSetIndices, PureListQuick, QuickCheckTest, RangeDeclarations, RangePrototype, ReductionSimpleJoinAtAnyWalk, ReflectTest, ReflectiveNumberTypes, ReflectiveQuickCheckTest, Region, RelationalPredicateTargets, Reversals, SetTest, StringPieces, TabulateRungA, TransactionalArrayShakedown, UniformDistributionStridedRange, WordCountSmall, booleanGuard, formatTest, mapCombine, maybeTest, naturalsTest, oddJuxt, realArith, sequivTest, singleArgInference, subArray, testRR32, whileTest, zeno.

A plain `Boolean` filter, which is a `Condition[\()\]`, is in nearly every test and was not grepped. `GeneratorDeclarations.fss:30-37` and `:84-86` assert Boolean's `Condition` members, its `indexValuePairs`, `ivmap` and range subscripts among them.

**The before** is the gate on dd60211b3: testSystem 677 tests, 0 failures (`climb-batch-21/gate/summary.txt:57-60`, `:65`), and distance 5 (`climb-batch-21/gate/distance.txt`). The code is the same as the measured tree's.

| Way | `#total` | Export entries (43 before) | Entries gone | Entries or sites come | Walk |
|---|---|---|---|---|---|
| A | **6** | 41 | Condition, Maybe | `abstract-method` at `FortressBuiltin.fss`: 'The inherited abstract method _[_](r:Range[\I\]):Indexed[\E,I\] from the trait Indexed[\(),ZZ32\] has no concrete implementation in the object Boolean in component FortressBuiltin.' | OK (48 tests) |
| A+ | 5 | 41 | Condition, Maybe | none | OK (48 tests) |
| A++ | 5 | 40 | Condition, Maybe, Nothing, Just (as written) | Just again: 'due to different method SQCAP' | OK (48 tests) |
| A' | 5 | 41 | Condition, Maybe | none | OK (48 tests) |
| R | 5 | 43 | Condition (as written) | Condition again: 'due to different extends clauses' | OK (48 tests) |
| B | 5 | 41 | Condition, Maybe | none | **47/48**: 'Tests run: 48, Failures: 1'; QuickCheckTest: 'Stack overflow on MethodInvocation at Library/FortressLibrary.fss:3752.9' |
| B+ | 5 | 40 | Condition, Maybe, Nothing, Just (as written) | Just again: 'due to different method SQCAP' | OK (48 tests) |
| C | **8** | 41 | Condition, Maybe | 3 typecheck: `String.fss` 2 ('Function body has type Nothing[\(ZZ32, String)\], but declared return type is ZeroIndexed[\(ZZ32, String)\].' and 'OR(Nothing[...],List.List[...])'), `FlatString.fss` 1 (the same) | OK (48 tests) |
| D | **11** | 41 | Condition, Maybe | 6 overloading, api and component each: 'Invalid overloading of map in trait UniqueItem', '… ivmap in trait UniqueItem', '… ivmap in object NotUnique' (Condition's `Condition[\G\]` against Indexed's `Indexed[\R,ZZ32\]`) | OK (48 tests) |
| D+ | 5 | 41 | Condition, Maybe | none | OK (48 tests) |

In every row, the gate's other four sites stay: `BIG MIN` twice, the fused arm, `List.fss:146`. No crash; the shadow matched.

**How to read the rows:**
- **A against A+:** the one error is `Boolean`'s. Through the api it inherits `Indexed`'s abstract range subscript (fsi:1319), which no api line covers. Condition's concrete one (fss:1533) shown in the api clears it. This is the same pattern as the 4h follow-on (`export-check-full/REPORT.md` §4.3).
- **B against B+, my reading of B's stack overflow.** Under B a `Maybe` inherits bodies from both `Condition` and `Indexed`. Walk keeps one by its extends order (ledger row 735). Here it got Indexed's default pair: `indexValuePairs = SimpleIndexValuePairs(self)` (fss:1989-1990) and `indices = self.indexValuePairs.map(...)` (fss:2001-2002), whose `generate` reads `self.g.indices` (fss:3796). The stack alternates between fss:3752 and :3796. B+'s meets clear it: QuickCheckTest passes.
- **The stock check is silent on B and D's getter pairs.** Under B, the stock distance reports no error for Maybe's two inherited getters `indexValuePairs` and `indices` with unrelated results. Under D it reports `map` and `ivmap` but no getter, for `UniqueItem`. The api today has the same getter pair on `Maybe` (fsi:923 beside fsi:1291) unreported. I did not trace whether the overloading check reads getters (section 5).
- **Walk under A, A+, A++, A' and R** is untouched by reading: walk runs the component. Under C and D it stays green on these 48 tests, though Boolean and the other `Condition`s stop being `ZeroIndexed` at run time.

## 5. Defects

None recorded, and no ledger row written. Two observations, not reproduced in isolation:

1. **The stock distance flags no inherited getter pair with unrelated result types.** This holds for Maybe's `indexValuePairs` (fsi:923 against fsi:1291) today, and for `Maybe` under B and `UniqueItem` under D, while it flags `map` and `ivmap` there. `ledger-find:getter*` and `ledger-find:getters` show no such row. Not traced.
2. **B's walk stop** is ledger row 735's order rule meeting Indexed's mutually defined defaults. Row 735 holds the mechanism, so no new row.

## 6. Sentences of the specification made false

None. Part IV changes in the api lines of section 3 for every way except B and E. The changes are points for the curator's review, as rung E's Part IV changes were (`CLIMB-BATCH-21.md:231`):
- A's five lines, plus A+'s range subscript;
- A++ removes two operators;
- A' changes `Condition` only;
- R changes three result types;
- B+ adds three getters to `Maybe`;
- C changes three results and Maybe's header;
- D and D+ change `Maybe`'s and `UniqueItem`'s headers and add `UniqueItem`'s `map` and `ivmap`.

## 7. Decisions

- **The base.** I used main at 2357a9b95, seeded from `/home/user/fortress-base21b` (24919e97d) as the brief says. The code is equal (section 1), so the gate's verdicts are the before. No decision on record covers it.
- **The follow-ons A+, A++, A', B+ and D+** are measured as ways of their own, one distance run each, as the export probe's run B was. Without them, A, B and D read as broken where the break is a missing line.
  - A++ and B+ include Just's and Nothing's range subscripts, which the record files under P-90, because they share 28ecf5f0d's origin with `ZeroIndexed`'s place (my reading). Alternative: leave them to P-90, which is A+ and B.
- **The result types of C and D** were taken as the component's (R's lines), following F-63's precedent. Alternative: the api's `Generator`, which is valid only where `Condition` is not `ZeroIndexed`.
- **B+'s meets** are the members whose two inherited bodies answer differently: `indices`, `indexValuePairs`, `reverse`, and the range subscript, placed on `Just` and `Nothing` as the api has them. `isEmpty`, `nonEmpty`, `size` and `bounds` answer the same value either way and were left out. **D+'s meets** are only what the checker named.
- **The test set** is the grep of section 4.
- **The report** was returned as text after the Write tool's refusal, by the skill's rule on refusals.

## 8. For FACTS

1. **The api's and the component's `Condition` and `Maybe` have disagreed since `Condition` was introduced.**
   - The fact: 28ecf5f0d (2008-04-08) moved `ZeroIndexed` and the range subscript to `Condition` in the component only, and 2f26aeded (2008-10-08) widened Condition's `indices` in the component only. The api keeps the 1.0 release's places (Maybe's `ZeroIndexed`; Just's and Nothing's range subscripts).
   - What it means: the export entries of Condition, Maybe, Just's subscript and Nothing are one leftover of that commit, not P-90's design (my reading).
   - Shown by: `git show 28ecf5f0d -- Library/FortressLibrary.fsi Library/FortressLibrary.fss`, and the 1.0 PDF's "The Maybe type".
   - Detail: §2.1.
2. **The component's `Condition` written into the api, with its range subscript (A+), clears Condition's and Maybe's export entries (43→41) at distance 5, and walk is unchanged.**
   - Without the subscript line, `Boolean` in `FortressBuiltin` gets 1 `abstract-method` error (5→6).
   - Taking Just's and Nothing's api subscripts out as well (A++) gives 40 entries; Just's entry then names `SQCAP`.
   - Shown by: the stock distance stage and `harness-one.sh` on the 48 tests (§4).
3. **The api's hierarchy written into the component (B) needs Maybe's meets.** Without them, walk's `QuickCheckTest` overflows the stack (row 735's order picks Indexed's default `indices` and `indexValuePairs` pair). With them (B+), distance 5, 40 entries, 48/48. Shown by: §4.
4. **`ZeroIndexed` on neither (C) costs 3 typecheck errors** in `String` and `FlatString`'s `splitWithOffsets`. On `UniqueItem` without meets (D), it costs 6 overloading errors. Shown by: §4.

## 9. Commands

- **The history scan:** `git log --all --format='%h %ad' --date=short -- Library/FortressLibrary.fss Library/FortressLibrary.fsi`, then for each team commit `git show <c>:<file> | grep -A1 'trait Condition\[\|value trait Maybe\['`. A pickaxe `git log --all -S` over the whole repository ran for minutes at 1.7 GB; restricting it to the path is instant.
- **The 1.0 Part IV text:** `pdftotext Specification-1.0-frozen/fortress.1.0.pdf <out>`.
- **The per-way runner:** the five steps of §4 in one script, run under `nohup` with its log under the worktree's `tmp/`.

## 10. Questions for the curator

1. **Where does `ZeroIndexed` stand: on `Condition`, as the component and the team's later edits have it, or on `Maybe` alone, as the api and the 1.0 release have it?**
   - Sources:
     - the 1.0 Part IV (2008-03-31);
     - 28ecf5f0d and 2f26aeded (2008), the component's side;
     - the team's api, unchanged since 2008;
     - CompilerLibrary.fsi:193-216 (2012), a commented-out copy of the component's form;
     - the specification, silent.
   - None of these is one of the late positions.
   - The ways, with what each changes and measures, are sections 3 and 4:
     - A+, A' and A++ are api-only, distance 5, walk unchanged;
     - B+ changes the component, distance 5, and needs meets;
     - D+ needs meets;
     - C costs 3 errors;
     - R aligns only the results;
     - E, the default, keeps today's behaviour.
   - What keeps today's behaviour: E, and every A-way, which changes only the api that walk does not run.
2. **Do Just's and Nothing's range subscripts go with it, as A++ or B+, or wait for P-90 as the record files them?** P-90's text concerns only the bare `Nothing` (my reading).
