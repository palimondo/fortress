# Evidence A: the distance triage's classes, one by one

For the coordinator's plan on the numerics on the path to compilation. Evidence only; no recommendation. Gathered 2026-09-27 on `main` at `cbb684be8`.

## How to read this

- Sources, abbreviated throughout:
  - [T] `explorations/perf-probes/prelude/distance-triage.md`; [F] `explorations/perf-probes/prelude/switch-over-distance-flat.md`.
  - [CW] and [CC] are `distance-triage/classes-walk.txt` and `classes-compile.txt`: one line per distinct error (class, kind, location, message). [CL] is `distance-triage/classes.txt`, [V] `distance-triage/variants.txt`, [cmp-X] `distance-triage/compare-X.txt`, [clf] `distance-triage/classify.py`. `distance-triage/` means `explorations/perf-probes/prelude/distance-triage/`.
  - [B65] `explorations/coordinator/CLIMB-BATCH-6.5.md`; [N65] `explorations/compile-ladder/plan-6.5/NOTES.md`; [B7] `explorations/coordinator/CLIMB-BATCH-7.md`.
  - "FACTS, distance" and "FACTS, flat" are the FACTS.md entries "The true distance to the switch-over" (line 54) and "The one library's number tower is flat" (line 104). "row N" is a row of `explorations/fortress-gap-ledger.md`.
- **The captures cut every line at 220 characters** (`distance-triage/tables.sh`, the `cut -c1-220` on the classes and compare files). The whole messages, the `full-*.tsv` files, lived only in the triage's work directory `/home/user/fortress-triage`, which no longer exists (checked: `ls /home/user/`). So every quote below is the capture's text, cut where it ends ("…"). [clf] classified on the whole messages, so a class can rest on text past the cut. Where that matters, it says so.
- **Line numbers are current.** `git diff --quiet d65892d34 HEAD -- Library ProjectFortress/LibraryBuiltin` is clean, so every `file:line` below is today's tree and the tree the captures ran on ([T] header: sources of `d65892d34`).
- **My own counts** come from small scripts over [CW] and [CC] in `scratchpad/coordinator-plan/` (not committed):
  - `byfile.py`: errors by file.
  - `encl.py`, `split.py` and `split2.py`: the enclosing declarations of an error's line, found by indentation, and whether one of them has a static parameter bounded by `Integral`/`AnyIntegral`, `Number` or `AdditiveGroup`/`MultiplicativeRing`.
  - `n1b.py`: the enclosing object or trait.
  - `i3shapes.py`: I3 by code shape.
  - `otcat.py`: OT by content.
  - `samples.py`, `show.py`: listings.
  - The enclosure test is a heuristic over indentation, checked by hand on the sites quoted here.
- "By site" means what `compare.py --sites` counts: an error's kind and location, the n-th error at a line matched with the n-th ([T] § 1).
- The categories you asked for, used below: (a) a static argument not inferred, or inferred wrongly; (b) a value that needs a coercion into a type; (c) an overloading, exclusion or comprises rule; (d) a missing or mismatched declaration; (e) something else, named.
- The controls: 1,738 distinct errors under walk's setting and 1,533 under the compile path's ([CL] last line; [T] § 1, "Control"). FACTS, distance records 1,736 and 1,527, from the note's twelve-JVM runs; [T] reproduced them within the run-to-run variation of 2 to 4 errors ([T] § 1; [F] § 5).

## Part 1. The 37 classes and the residue

Order and codes are [T] § 2. Counts are walk / compile, from [CL].

### A1, `fill`: function form against value form: 244 / 0

- Message ([CW], `FortressLibrary.fsi:1360,:1361`): "Invalid overloading of fill in trait ImmutableArray: (ReadableArray[\E,I\], E)->ReadableArray[\E,I\] @ FortressLibrary.fsi:1361:5-44 and (ReadableArray[\E,…"
- Sites:
  - `FortressLibrary.fsi:1360` `abstract fill(f:I->E):ReadableArray[\E,I\]` against `:1361` `abstract fill(v:E):ReadableArray[\E,I\]`
  - `FortressLibrary.fsi:1379` `abstract fill(f:I->E):ImmutableArray[\E,I\]` against `:1380`
  - `FortressLibrary.fss:1954` `fill(f:I->E):ReadableArray[\E,I\]` against `:1955` `fill(v:E):ReadableArray[\E,I\]`
- What the checker determined: (c), an overloading rule. With `E` unbounded, which walk's setting reads as `Any`, a value can be an arrow, so the two forms do not exclude each other; under `Object` they do, which is why the compile column is 0 ([T] § 2.1, citing FACTS "The `fill` refusals"). By file: 77 pairs in the api's lines, 167 in the component's ([CW], `byfile.py`). The `NativeArray` unit's `fill` errors, 18 of this kind and 6 of A2's, are among them. They are printed at `FortressLibrary.fsi` lines ([F] `errors-walk.tsv`: the rows whose unit names `NativeArray` are 18 "fill-crossed", 6 "fill-same" and 7 others; 22 of them have the unit "api NativeArray+component NativeArray", at `FortressLibrary.fsi:1360-1432`).
- Numbers: no. The index types in the messages are incidental.
- Rung: batch 7, rung A, by reading ([T] § 4). Answer 10's measurement, 125 → 103 on the count stage, is the only one on file ([B7] § 2, answer 10). A1 has no measurement on the distance.

### A2, `fill`: the array diamond: 58 / 58

- Message ([CW], `FortressLibrary.fsi:1400,:1432`): "Invalid overloading of fill in trait Array3: (Array[\T,(ZZ32, ZZ32, ZZ32)\], T)->Array[\T,(ZZ32, ZZ32, ZZ32)\] @ FortressLibrary.fsi:1400:5-35 and (Standar…"
- Sites: `FortressLibrary.fsi:1400` `abstract fill(v:E):Array[\E,I\]` against `:1432` `fill(v:E):T`; `FortressLibrary.fsi:1399` `abstract fill(f:I->E):Array[\E,I\]` against `:1431` `fill(f:I->E):T`; and the same pairs at the component's lines (38 of the 58, `byfile.py`).
- What the checker determined: (c). The pair is inherited from two parents, with nothing declared below both ([T] § 2.1).
- Numbers: no.
- Rung: batch 7, rung A, by reading ([T] § 4; [B7] § 3 A, "18 are the diamond").

### M1, overloading: the Meet Rule: 100 / 100

- Message ([CW], `FortressLibrary.fsi:2125,:2142`): "Invalid overloading of IN in API FortressLibrary: [\I\](I, ExtentRange[\I\])->Boolean @ FortressLibrary.fsi:2142:5-31 and [\I\](I, OpenRange[\I\])->Boolean…". Another: "Invalid overloading of FORWARD_CMP in API FortressLibrary: [\I\](ExtentRange[\I\], Range[\I\])->Comparison @ FortressLibrary.fsi:2143:5-2144:1 and [\I\](Op…" (`FortressLibrary.fsi:2124,:2143`).
- Sites: `FortressLibrary.fsi:2125` `opr IN(n: I, self): Boolean` against `:2142` (the same line in another range trait); `FortressLibrary.fsi:2124` and `:2143`, `opr FORWARD_CMP(self, other:Range[\I\]): Comparison`; `FortressLibrary.fsi:2072` `seq(self): SequentialGenerator[\E\]` against `:824`.
- Families: FORWARD_CMP 38, map 15, IN 15, generate 7, lift 6, ivmap 6, seq 4, juxtaposition 3, cross 3, copy 2, nest 1. Both settings are the same ([CW], [CC], counted by the message's "Invalid overloading of X"; the same list is [F] § 2.4).
- What the checker determined: (c). The two declarations have the same static parameters and nothing is declared on their meet ([T] § 2.1).
- Numbers: ranges only. 55 of the 100 messages name a range type (`grep -c Range` over the class). FORWARD_CMP and IN are the range traits' own members, over an unbounded `I` in `FortressLibrary.fsi`'s range traits.
- Rung: none in 6.5, 7 or 7b. The class goes to batch 8, after probe P2 ([T] § 4; [B7] § 1, "The Meet Rule class waits for batch 8").

### L1, overloading: the static-parameter sentence's families: 85 / 78

- Messages ([CW]): "Invalid overloading of CAP in API RangeInternals: [\I extends Integral[\I\], J extends Integral[\J\]\](RangeInternals.Range2D[\I,J\], RangeInternals.Range2D[\I,J…" (`RangeInternals.fsi:46,:64`). And "Invalid overloading of MAX in API FortressLibrary: [\T extends Number, I\](Array[\T,I\], T)->Array[\T,I\] @ FortressLibrary.fsi:2587:1-67 and [\T extends St…" (`FortressLibrary.fsi:196,:2587`).
- Sites:
  - `RangeInternals.fsi:46` `opr CAP(self, other: Range[\I\]): Range[\I\]` against `:64` `opr CAP(self, other: Range2D[\I, J\]): Range[\(I, J)\]`
  - `FortressLibrary.fsi:196` `opr MAX(self, other:T): T` against `:2587` `opr MAX[\T extends Number, I\](x: Array[\T,I\], y: T): Array[\T,I\]`
  - `RangeInternals.fsi:612` `openRangeHelper[\I extends Integral[\I\]\](_: ()->I): OpenScalarRange[\I\]`
- Families (walk; compile): CAP 36; 36. IN 14; 6. seq 10; 11. openRangeHelper 6; 6. MIN 6; 6. MAX 6; 6. CMP 4; 4. juxtaposition 3; 3 ([CW], [CC]; the same list is [F] § 2.4).
- What the checker determined: (c). Two domains that exclude only through a bound, or through open traits the checker cannot close ([T] § 2.1; [B7] § 3 L, "The problem").
- Numbers: 68 of the 85 are in declarations generic over a number bound: CAP, IN and openRangeHelper over `Integral[\I\]` (56), and the array `MIN`/`MAX` over `T extends Number` (12) (`split.py`). seq 10, CMP 4 and juxtaposition 3 are not numeric.
- Rung: batch 7b, rung L ([T] § 4 maps all 85 there). [B7], though, narrows it:
  - Rung L's problem list is CAP, the array `MIN`/`MAX`, `StandardMinMax`'s slip, `String`'s juxtaposition, openRangeHelper and seq ([B7] § 3 L, "The problem"). By reading, that is 67 walk / 68 compile of L1.
  - L1's IN, 14 / 6, pairs `RangeInternals.fsi:65`, `:100`, `:429` and `:505` with `FortressLibrary.fss:1156`, `:1340`, `:3749` and `:3780` ([CW]). [B7] § 4 says of `RangeInternals`: "Its every, atMost, map and IN errors are batch 8's."
  - L1's CMP, 4, pairs `LessThan`'s and `GreaterThan`'s `CMP` (`FortressLibrary.fsi:134`, `:145`; `.fss:178`, `:190`) with `StandardPartialOrder`'s generic `CMP` (`.fsi:169`, `.fss:215`). Those are rung H's declarations ([B7] § 4, H's list).
  - Row 421's variant moved 8 L1 sites and added 8, net 0 ([cmp-R421-walk]: "L1 85 85 8 8").

### H1, exclusion: the comparisons, `Maybe`, `Condition`: 38 / 38

- Messages ([CW]): "Type EqualTo excludes FortressLibrary.TotalComparison but it extends FortressLibrary.TotalComparison." (`FortressLibrary.fsi:153`). "Types Equality[\AnyMaybe\] and AnyUniqueItem exclude each other. AnyMaybe must not extend them." (`:879`).
- Sites: `FortressLibrary.fsi:121` `extends { Comparison, StandardTotalOrder[\TotalComparison\] }`; `:879` `value trait AnyMaybe extends { Equality[\AnyMaybe\], AnyUniqueItem } excludes Number`; `:2558` `trait RelationalPredicateCondition[\E\] extends { Condition[\()\] } excludes Condition[\()\]`. 18 are in the api, 20 in the component (`byfile.py`).
- What the checker determined: (c), the exclusion rule: a type below two instantiations of one generic ([T] § 2.1, route A).
- Numbers: no.
- Rung: batch 7, rung H ([B7] § 3 H, "The 18 exclusion errors go"). This is by the brief; nothing is measured on the distance.

### H2, `comprises`: `AnyIntegral`'s clause: 2 / 2

- Message ([CW], `FortressLibrary.fsi:431` and `.fss:644`): "Invalid comprises clause: FortressLibrary.AnyIntegral has a comprises clause but its immediate subtype Integral is not eligible to extend it."
- Sites: `FortressLibrary.fsi:428` `trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end`, with `:429` "(** not yet: ``%comprises Integral[\I\] where [\I\]%'' *)"; `FortressLibrary.fsi:431` and `.fss:644` `trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }`.
- What the checker determined: (c), the comprises rule.
- Numbers: yes, the integer marker trait.
- Rung: batch 7, rung H. The keep-the-rule sketch drops `AnyIntegral` from `Integral[\I\]`'s extends clause, which "left the api with one error on its copy" ([B7] § 1, "H rides here, first").
  - By reading: `AnyIntegral` is the bound of the range operators and helpers in I1 and I2 (`FortressLibrary.fss:3888-3966`, `RangeInternals.fss:1422-1495`; some of them are unbounded). So H's header edit touches the bound the integer family uses. Its effect on the component bodies is not measured anywhere I found.

### O1, overloading: same parameter type (`LEXICO`, `INVERSE`, `SQCAP`): 15 / 14

- Message ([CW], `FortressLibrary.fsi:127,:158`): "There are multiple declarations of LEXICO with the same parameter type: (EqualTo, TotalComparison)".
- Sites: `FortressLibrary.fsi:127` and `:158`, both `opr LEXICO(self, other:TotalComparison): TotalComparison`; `.fsi:898` `opr SQCAP(self, o: Maybe[\T\]): Maybe[\T\]` against `:943` `opr SQCAP(self, o: Maybe[\T\]): Nothing[\T\]`; `.fsi:129` `abstract opr INVERSE(self): TotalComparison` against `:161`.
- Families: LEXICO 9, SQCAP 5, INVERSE 1 (walk, [CW]). Which pair a run names varies ([F] § 5).
- What the checker determined: (c).
- Numbers: no.
- Rung: none named. [T] § 4 assigns it to rung H's families "by reading".

### R1, return type: `StandardMinMax`'s `(T,T)` slip (row 421): 32 / 32

- Message ([CW], `FortressLibrary.fsi:196,:210`): "For MAX, the return type of [\T extends StandardMinMax[\T\]\](StandardMinMax[\T\], T)->(T, T) @ FortressLibrary.fsi:210:5-211:1 should be a subtype of the re…". Another: "For MAX, the return type of ((RR64 & {Float, FloatLiteral, RR32}), RR64)->RR64 @ FortressLibrary.fsi:322:5-30 should be a subtype of the return type of [\T e…" (`.fsi:210,:322`).
- Sites: `FortressLibrary.fsi:210` `opr MAX(self, other:T): (T,T)`, paired with `.fsi:322` `opr MAX(self, b:RR64):RR64`, `.fsi:408` `opr MAX(self, other:QQ):QQ` and `.fsi:196` `opr MAX(self, other:T): T`; in the component `FortressLibrary.fss:261` `opr MAX(self, other:T): (T,T) = do (_,r) = self MINMAX other; r end`.
- What the checker determined: (c), the return-type rule. The cause is (d): a mis-declared library signature, row 421 ("declares its default `MIN` and `MAX` as returning `(T,T)` where their bodies return one `T`").
- Numbers: partly. The other declaration of each pair is `RR64`'s or `QQ`'s own, or `StandardTotalOrder`'s instance for the integers. 20 of the 32 messages name a number type in their first 220 characters.
- Rung: batch 7b, rung L. Measured by the variant R421: 32 → 0 ([cmp-R421-walk]).

### R2, return type: the comparisons' `CMP`: 19 / 19

- Messages ([CW]): "For CMP, the return type of ((TotalComparison & {LessThan, EqualTo, GreaterThan}), Unordered)->Comparison @ FortressLibrary.fsi:124:5-46 should be a subtype …" (`.fsi:124,:135`). And "For CMP, the return type of (LessThan, LessThan)->Comparison @ FortressLibrary.fsi:134:5-45 should be a subtype of the return type of (LessThan, TotalCompari…" (`.fsi:134,:135`).
- Sites: `FortressLibrary.fsi:124` `opr CMP(self, other:Unordered): Comparison` against `:135` `opr CMP(self, other:TotalComparison): TotalComparison`; `.fss:166` `opr CMP(self, other:Unordered): Comparison = Unordered` against `.fss:929` `opr CMP(self, other:ZZ): TotalComparison = self.cmp(other) CMP 0`; `.fsi:134` `opr CMP(self, other:LessThan): Comparison`.
- What the checker determined: (c), the return-type rule. The cause is the comparisons' declarations.
- Numbers: on one side only. Of the 17 `Unordered` pairs, 3 have a number type's own `CMP` as the other declaration (`ZZ64` at `.fsi:565` and `.fss:781`, `ZZ` at `.fss:929`), and 3 have `StandardTotalOrder`'s generic one. The rest are `LessThan`, `GreaterThan`, `EqualTo`, `LexicographicOrder` and `String` (my listing of the enclosing types).
- Rung: 2 (`LessThan`/`GreaterThan` declared `Comparison`) are in batch 8's one-liners. The other 17 are rung H's family "by reading" ([T] § 2.1, § 4).

### R3, return type: other slips: 40 / 34

- Messages ([CW]): "For unsigned, the return type of (ZZ32 & {Int, IntLiteral})->NN32 @ FortressLibrary.fsi:542:5-23 should be a subtype of the return type of [\I extends Integr…" (`.fsi:458,:542`). And "For every, the return type of (RangeInternals.LeftScalarRange[\I\], I)->RangeInternals.ScalarRange[\I\] @ RangeInternals.fsi:257:5-258:4 should be a subtype…" (`FortressLibrary.fsi:2148,RangeInternals.fsi:257`).
- Sites: `FortressLibrary.fsi:458` `unsigned(self):NN64` (in `Integral`) against `:542` `unsigned(self):NN32` (in `ZZ32`); `FortressLibrary.fsi:1551` `array1[\T, nat s0\](v:T):Array1[\T,0,s0\]` against `:1552` `array1[\T, nat s0\](f:ZZ32->T):Array1[\T,0,s0\]`; `RangeInternals.fsi:257` `every(s: I): ScalarRange[\I\]`.
- Families (walk; compile): SQCAP 8; 8. shift 4; 4. seq 4; 3. atMost 4; 4. subarray, splitWithOffsets, split, every and distribute 2 each. array1 2; 0. array2 2; 0. array3 1; 0. unsigned, target, relation, map and filter 1 each ([CW], [CC]).
- What the checker determined: (c), the return-type rule, over (d) library slips.
- Numbers: 7 of the 40. `unsigned` is an integer function whose `Integral` form answers `NN64` and whose `ZZ32` form answers `NN32`. `atMost` 4 and `every` 2 are on `RangeInternals`' ranges. `subarray` is about sizes.
- Rung: array1-3 5 (walk only) go to rung A. seq 4 / 3 goes to rung L. shift, atMost and every go to batch 8. distribute is row 433. The rest are not named ([T] § 2.1, "split as named").

### Q1, the bound `Object`: 0 / 372

- Message ([CC], `FortressLibrary.fsi:714`): "Ill-formed type: Condition[\()\] The static argument () does not satisfy the corresponding bound Object." Another: "Ill-formed type: Generator[\(E, G)\] The static argument (E, G) does not satisfy the corresponding bound Object." (`.fsi:743`).
- Sites: `FortressLibrary.fsi:714` `filter(f: E -> Condition[\()\]): Generator[\E\]`; `.fsi:743` `cross[\G\](g: Generator[\G\]): Generator[\(E,G)\]`; `.fsi:841` `getter indexValuePairs(): Generator[\(ZZ32,E)\]`.
- What the checker determined: (e), the compile path's own desugaring setting. It adds `extends Object` to every unbounded parameter (row 412), and a tuple or `Any` then fails the bound. It is not inference and not coercion.
  - The split is 346 tuples and 26 `Any` ([T] § 2.1), or "340 a tuple as a static argument, 26 `Any`, 6 other" ([F] § 2.2).
  - By file: `FortressLibrary.fss` 104, `.fsi` 88, `RangeInternals.fss` 78, `RangeInternals.fsi` 72, the rest 30 (`byfile.py`).
- Numbers: no. 170 of the 372 sit inside `Integral`-bounded range declarations (`split.py`), but the failing argument is a tuple such as `Just[\(I, J)\]`.
- Rung: batch 7's Q1. Default (a), the bound `Any`, removes the setting. N1, N2 and A1 then appear in its place: the setting `any` measured 1,747 ([F] § 5; [T] § 3.3).

### D1, abstract method under compiled desugaring: 0 / 12

- Message ([CC], `FortressLibrary.fss:3189`): "The inherited abstract method simpleJoin(a:Any,b:Any):Any from the trait AssociativeReduction[\T\] has no concrete implementation in the object MaxReduction in component Fortre…"
- Sites:
  - `FortressLibrary.fss:3189` `object MaxReduction[\T extends StandardMax[\T\]\] extends CommutativeReduction[\T\]`. Its `simpleJoin(a, b) = a MAX b` is at `:3191`, and the trait's `simpleJoin(a:Any, b:Any): Any` is at `:3015`.
  - `FortressLibrary.fss:2306` `object __DefaultVector[\T, nat s0\]() extends Vector[\T,s0\]`, for `AdditiveGroup`'s `+`.
  - `FortressLibrary.fss:2985` `object NoReductionPair[\R\] extends PossibleReductionPair[\R\]`, for `generate`.
- Split: simpleJoin 8, `+` of `AdditiveGroup` 3, generate 1 ([CC]).
- What the checker determined: (d). A bodyless trait method becomes abstract under the compiled desugaring, and the objects implement it at other parameter types or not at all ([T] § 2.1, "inferred in the flat note", `AbstractDesugarer.java:40-46`).
- Numbers: 3, `AdditiveGroup`'s `+` in `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix`.
- Rung: none.

### D2, abstract method: `RangeInternals`' `CAP`, `IN`, `|_|`: 18 / 18

- Message ([CW], `RangeInternals.fss:563`): "The inherited abstract method IN(n:I,self:Range[\I\]):Boolean from the trait Range[\I\] has no concrete implementation in the object LeftScalarRange in component RangeInternals."
- Sites: `RangeInternals.fss:563` `object LeftScalarRange[\I extends Integral[\I\]\](l:I, str:I)`; `:353` `object OpenRange3D[\I extends Integral[\I\], J extends Integral[\J\], K extends Integral[\K\]\](str_i:I, str_j:J, str_k:K)`; `:1183` `object StridedFullParScalarRange[\I extends Integral[\I\]\](l:I, r:I, str:I) extends StridedFullScalarRange[\I\]`.
- Split: CAP 6, IN from `Range` 5, IN from `Contains` 5, `|_|` 2 ([CW]).
- What the checker determined: (d). The objects implement the family at their own types, not the trait's instance ([T], by reading).
- Numbers: yes. All 18 are range objects over `Integral`-bounded parameters.
- Rung: none. [T] places it "next to rung L's CAP".

### X1, export: component against api: 12 / 11

- Message ([CW], `RangeInternals.fss:12`): "Component RangeInternals exports API RangeInternals but does not define all declarations in RangeInternals. Missing declarations: {emptyScalarRange[\I extends Integral[\I\]\]():RangeIntern…"
- Sites (all at a component's header line): `RangeInternals.fss:12` `component RangeInternals`; `FortressLibrary.fss:12` `component FortressLibrary` (missing `immutableArray[\E\](x:ZZ32,y:ZZ32)`; unmatched "TraitDecl Comparison…"); `FortressBuiltin.fss:12` `native component FortressBuiltin` (unmatched "ObjectDecl BigNum at FortressBuiltin.fsi:149…").
- What the checker determined: (d), the api and the component declaring different things. Each error bundles several declarations, and the cut messages do not allow a finer split.
- Numbers: 2 are `RangeInternals`' integer bounds (row 358), and 1 names `BigNum`, a number type. The rest are not numeric.
- Rung: none. Row 358's bounds clear the 2 `RangeInternals` errors (measured, [cmp-BOUNDS-walk]: "X1 12 10 2 0").

### Z1, arithmetic in a size: 11 / 11

- Message ([CW], `FortressLibrary.fss:2519`): "Ill-formed type: NativeArray.PrimitiveArray[\T,s0 s1\] Arithmetic on nat static arguments is not supported by the type checker; use a nat parameter or a literal."
- Sites: `FortressLibrary.fss:2519` `mem:PrimitiveArray[\T, (s0 s1) \] = PrimitiveArray[\T, (s0 s1) \]()`; `:2890` `mem:PrimitiveArray[\T,(s0 (s1 s2))\] = PrimitiveArray[\T,(s0 (s1 s2))\]()`; `NativeArray.fsi:12` `api NativeArray`.
- What the checker determined: (e). The checker refuses arithmetic in a size, which is a static argument.
- Numbers: sizes (`nat`), not number types.
- Rung: phase 5, the array design ([T] § 2.1).

### F1, the fusion pairs' bound (row 433): 4 / 4

- Message ([CW], `FortressLibrary.fss:3154`): "Ill-formed type: MaxReduction[\T\] The static argument T does not satisfy the corresponding bound StandardMax[\T\]."
- Sites: `FortressLibrary.fss:3154` `distribute(r: MaxReduction[\T\]): PossibleReductionPair[\AnyMaybe\] =`; `:3156` (the `MinReduction` twin); `:3138` `object MaxSumReductionPair[\T extends { AdditiveGroup[\T\], StandardMax[\T\] }\]`.
- What the checker determined: (d). The enclosing `T extends AdditiveGroup[\T\]` does not meet `StandardMax[\T\]`. Row 433's remedy is a `where` clause, which neither path supports.
- Numbers: yes, a number-algebra bound (`AdditiveGroup`).
- Rung: none. Phase 3, later ([T] § 2.1).

### N1, natives: `builtinPrimitive`'s `T` not inferred: 340 / 0

- Message ([CW], every one): "Could not check call to function builtinPrimitive - Could not infer static argument T without context."
- Sites: `FortressBuiltin.fss:411` `builtinPrimitive("com.sun.fortress.interpreter.glue.prim.NN32$WrappingAdd")`; `FortressLibrary.fss:4290` `printThreadInfo(a:Number):() = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.StringPrim$PrintThreadInfo")`; `FortressLibrary.fss:993`, inside `trait ZZ`, `builtinPrimitive("com.sun.fortress.interpreter.glue.prim.BigNum$ToZZ64")`.
- What the checker determined: (a), all 340. It cannot solve the result-only `T` of `builtinPrimitive[\T\](javaClass:String):T` (`FortressBuiltin.fsi:30`) from the declared return type when `T`'s bound is `Any`. Writing `T extends Object` clears all 340 (BP); writing `T extends Any` changes nothing (BPANY) ([T] § 3.1; [cmp-BP-walk], [cmp-BPANY-walk]). The solver named "by reading, not traced" is `STypesUtil.inferStaticParamsHelper`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:965-1035` ([T] § 3.1).
- Numbers: in location, not in cause. By enclosing object ([CW] with `n1b.py`): 164 in `FortressBuiltin`'s number objects (`Float` 61, `RR32` 52, `NN32` 31, `IntLiteral` 5, and `Int`, `Long`, `FloatLiteral`, `BigNum`, `UnsignedLong` 3 each), and 114 in `FortressLibrary`'s integer traits (`ZZ32` 29, `ZZ64` 29, `NN64` 28, `ZZ` 28). That is 278 of 340 inside the number types' own declarations. The other 62 are `Char` 12, `FlatString` 13, `Writer` and `BufferedWriter` 9, `Thread` 4, `Object` 2, arrays 7, and top-level functions 15.
- Rung: none. Phase 4 by construction, if the compiled path replaces `builtinPrimitive` rather than checking it ([T] § 4; row 309).

### N2, a result-only static parameter not inferred (`fail`, …): 24 / 0

- Message ([CW], `FortressLibrary.fss:3862`): "Could not check call to function fail - Could not infer static argument T without context."
- Sites: `FortressLibrary.fss:3862` `else => fail("Library error: FullRange INTERSECTION didn't yield FullRange")`; `RangeInternals.fss:152` `fail("ScalarRange INTERSECTION Range!  Shouldn't happen.")`; `List.fss:150`, whose message is "Could not check call to operator BIG <|_BIG |> - Could not infer static argument T without context. - [\T\]Generator[\T\]->List.List[\T\] is not applicable to an argument of type ()."
- What the checker determined: (a), the same mechanism as N1, by reading ([T] § 2.2).
  - 21 of the 24 are calls of `fail` (grep over [CW]).
  - 3 show another call in their first 220 characters: `FortressLibrary.fss:169` (`<` on a `Comparison`), `RangeInternals.fss:157` (`Maybe[\I\].loop`) and `List.fss:150` above. [clf] put them here on text past the cut.
  - The same site `List.fss:150` is class GB under the compile path's setting, "BottomType->CovariantCollection.AnyCovColl is not applicable…" ([CC]). The one site is "not inferred" in one setting and "inferred as `BottomType`" in the other.
- Numbers: no. 7 sites are in range code, but `fail` is not numeric.
- Rung: none.

### I3, integers: a numeral where a type parameter is expected: 149 / 149

- Messages ([CW]): "Could not check call to operator > - ((RR64 & {Float, FloatLiteral, RR32}), RR64)->Boolean is not applicable to an argument of type (I, IntLiteral). - ((ZZ64 & {Long}), ZZ64)->Boolean" (`RangeInternals.fss:381`). And "Right-hand side has type IntLiteral, but declared type is I." (`RangeInternals.fss:570`).
- Sites: `RangeInternals.fss:381` `getter fromLeft(): Boolean = ex > 0`; `RangeInternals.fss:570` `n : I := 1`; `RangeInternals.fss:1475` `right1Range[\I extends AnyIntegral\](_:I,x:I):RightRange[\I\] = RightScalarRange[\I\](x,1)`.
- By file: `RangeInternals.fss` 138, `FortressLibrary.fss` 6, `String.fss` 3, `FortressBuiltin.fss` 1, `List.fss` 1 ([CW], `byfile.py`).
- Background: on today's library the numeral's type `IntLiteral` is declared `object IntLiteral extends { ZZ32 }` (`FortressBuiltin.fsi:117`). A numeral is therefore a subtype of `ZZ32` and not of a type variable `I`.
- What the checker determined, split by message and source line (`i3shapes.py`; part 4 lists the shapes):
  - (b), a numeral that must become an `I`: 142. Of these, 41 are the generator-filter duplicates [clf] folds in: "Filter expressions in generator clauses must have type Boolean, but OpExpr at RangeInternals.fss:1310.12 was not well typed." Each accompanies an `if` or `while` test that failed.
  - (a), a static argument inferred at the numeral's own type: 2. `FortressLibrary.fss:4071` `allButFirst(): String = self[1:]` and `:1065` `getter asString(): String = (BIG ||[i <- self] "," i)[1:]`. The message is "Could not check method invocation String._[_] - Range[\ZZ32\]->Indexed[\Char,ZZ32\] is not applicable to an argument of type LeftRange[\IntLiteral\]. …"
  - Cause not visible in the capture: 2. `String.fss:79` `getter bounds():Range[\ZZ32\] = 0#size` and `List.fss:276` `getter indices(): ZeroIndexed[\ZZ32\] = 0 # |self|`. See part 5, item 2.
  - (d), row 421: 1. `String.fss:77` `depthField:ZZ32 = 1 + (left.depth MAX right.depth)`, "argument of type (IntLiteral, (ZZ32, ZZ32))". R421 clears it ([cmp-R421-walk]).
  - (e): 2.
    - `String.fss:156`, a numeral in a list literal beside SF's `left`: "argument of type ((IntLiteral, ()->Maybe[\Char\]), …".
    - `FortressBuiltin.fss:327` `opr ^(self, b:Number):RR64 = self^asFloat(b)`, in `RR32`. The capture shows the argument as "(RR32, AND(Float->Float,RR32->Float,FloatLiteral->Float,(Num…". That is an overloaded function value, not a numeral: by reading, `self^asFloat(b)` is read as `(self^asFloat)(b)`.
- Numbers: yes, all of them.
- Rungs:
  - 6.5 G: 2 (`FortressLibrary.fss:3108`, `:3121`, the identities' `else => 0` and `else => 1`), by reading ([T] § 6). Whether G's respelling removes the `else` numeral is not in G's brief. G "passes values of the right type through `cast`" and may touch only the two functions ([B65] § 3 G).
  - 6.5 V: 1 (`FortressBuiltin.fss:327`), by reading ([T] § 6: "Rung V's `RR32` natives carry three").
  - 7b L: 1 (`String.fss:77`), measured by R421.
  - No other rung. The numeral shadow, an instrument and not a rule, is measured in part 2.

### I1, integers: the bound `AnyIntegral` or none where `Integral[\I\]` is used: 81 / 81

- Messages ([CW]): "Ill-formed type: RangeInternals.CompactFullParScalarRange[\I\] The static argument I does not satisfy the corresponding bound Integral[\I\]." (`FortressLibrary.fss:3888`). And "Could not check call to operator + - ((NN64 & {UnsignedLong}), NN64)->NN64 is not applicable to an argument of type (I, I). - ((RR64 & {Float, FloatLiteral, RR32}), RR64)->RR64 is not…" (`RangeInternals.fss:1423`).
- Sites: `FortressLibrary.fss:3888` `opr #[\I extends AnyIntegral\](lo:I, ex:I): CompactFullParScalarRange[\I\] = sized1Range(0 asif ZZ32,lo,ex)`; `RangeInternals.fss:1423` `CompactFullParScalarRange[\I\](lo,lo+ex-1)`, inside `sized1Range[\I extends AnyIntegral\]` at `:1422`; `RangeInternals.fss:681` `object RightScalarRange[\I\](r:I, str:I)`, which is unbounded.
- Split: 57 well-formedness errors (45 in `RangeInternals.fss`, 12 in `FortressLibrary.fss`) and 24 body errors ([CW], `awk` by kind). Of I1's 65 errors in `RangeInternals.fss`, 26 sit in unbounded declarations, `RightScalarRange` (25) and `emptyScalarRange` (1). The rest sit in `AnyIntegral`-bounded declarations (`split.py`).
- What the checker determined: (d), a bound mismatch. The api says `Integral[\I\]`; the component and the range operators say `AnyIntegral` or nothing; and `AnyIntegral` declares no operator (row 358; [T] § 2.2). The body errors are its consequence: `+` on two `I`s bounded by `AnyIntegral`.
- Numbers: yes.
- Rung: none; row 358 says "the next library batch's". Measured, the variant BOUNDS takes I1 from 81 to 4, with 69 sites gone ([cmp-BOUNDS-walk]: "I1 81 4 69 0"). The other 8 sites keep an error at the same line with a new message. 6 are now classed I3, the unmasking [T] § 3.2 describes (`lo+ex-1` fails at `-` once `+` checks), and 2 RG ([cmp-BOUNDS-walk]: "I3 149 161 4 10", "RG 29 31 0 0").

### I2, integers: the dummy `0 asif ZZ32` of `#` and `:`: 18 / 18

- Messages ([CW]): "Function body has type LeftRange[\OR(ZZ32,I)\], but declared return type is LeftRange[\I\]." (`FortressLibrary.fss:3910`). And "Could not check call to function sized1Range - [\I extends Integral[\I\]\](I, I, I)->RangeInternals.CompactFullParScalarRange[\I\] is not applicable to an argument of type (ZZ32, I, …" (`:3888`).
- Sites: `FortressLibrary.fss:3910` `opr (x:I)#[\I extends AnyIntegral\] : LeftRange[\I\] = left1Range(0 asif ZZ32, x)`; `:3959` `opr ::[\I extends AnyIntegral\](s:I) : OpenRange[\I\] = open1Range(0 asif ZZ32, s)`; `:3888` (quoted under I1).
- Split: 12 body errors whose message shows the inferred union `OR(ZZ32,I)`, and 6 calls of `sized1-3Range`/`bounded1-3Range` "not applicable" to `(ZZ32, I, …)` ([CW]). All 18 are in `FortressLibrary.fss:3888-3964`, one per operator. The operators hold 36 `0 asif ZZ32` occurrences (`grep -o "[0-9]\+ asif [A-Z][A-Z0-9]*" Library/*.fss`: 36 in `FortressLibrary.fss`).
- What the checker determined: (a), a static argument inferred as a union. The helpers `sized1Range[\I extends AnyIntegral\](_:I,lo:I,ex:I)` (`RangeInternals.fss:1422`) receive a `ZZ32` and an `I` for their first two parameters, and the checker infers `I` as `OR(ZZ32, I)`. The comment above them states the intent: "Helpers for # to get the type instantiation "right". We pass in bogus ZZ32's to ensure that the result type is at least ZZ32." (`RangeInternals.fss:1420-1421`).
- Numbers: yes.
- Rung: none. Measured: DEVICE after BOUNDS clears all 18 ([cmp-BOUNDS+DEVICE-walk]: "I2 18 0 18 0").

### I5, integers: `Integral[\I\]` declares no `|self|`: 15 / 15

- Message ([CW], `RangeInternals.fss:710`): "Could not check call to operator |_| - (NN64 & {UnsignedLong})->NN64 is not applicable to an argument of type I. - (RR64 & {Float, FloatLiteral, RR32})->RR64 is not applicable to an ar…"
- Sites: `RangeInternals.fss:710` `fullScalarRange[\I\](r - ( |n| - 1 ) str, r, str)`; `:317` `forward(): OpenScalarRange[\I\] = OpenScalarRange[\I\](|str|)`; `:380` `getter extent(): Just[\I\] = Just[\I\]( |ex| )`.
- What the checker determined: (d), a missing declaration. `Integral[\I\]`'s api (`FortressLibrary.fsi:431-470`) declares no `|self|`; only the leaves do (`.fsi:475`, `:515`, `:558`, …).
- Numbers: yes.
- Rung: none. The numeral shadow moves 1 ([cmp-L0-walk-num]).

### I6, integers: `[\ZZ32,ZZ32\]` written for `[\I,J\]`: 8 / 8

- Message ([CW], `RangeInternals.fss:746`): "Could not check call to function LeftRange2D - [\ZZ32, ZZ32\](ZZ32, ZZ32, ZZ32, ZZ32)->RangeInternals.LeftRange2D[\ZZ32,ZZ32\] is not applicable to an argument of type (I, J, I, J)."
- Sites: `RangeInternals.fss:746` `flip(): LeftRange2D[\I,J\] = LeftRange2D[\ZZ32,ZZ32\](r_i,r_j,-str_i,-str_j)`; `:626` `flip(): RightRange2D[\I,J\] = RightRange2D[\ZZ32,ZZ32\](l_i,l_j,-str_i,-str_j)`; `:500` `flip(): ExtentRange3D[\I,J,K\] = ExtentRange3D[\ZZ32,ZZ32\](-ex_i,-ex_j,-ex_k,-str_i,-str_j,-str_k)`.
- What the checker determined: (d), a library slip: the wrong static arguments written by hand.
- Numbers: yes.
- Rung: none.

### I4, integers: a fixed width where a type parameter is expected: 3 / 3

- Message ([CW], `RangeInternals.fss:794`): "Could not check call to function Just - [\I\]I->Just[\I\] is not applicable to an argument of type ZZ32."
- Sites: `RangeInternals.fss:794` `getter extent(): Just[\I\] = Just[\I\](self.size)`; `:899` `getter extent(): Just[\(I,J)\] = Just[\(I,J)\]( |self.range1|, |self.range2| )`; `:941` `Just[\(I,J,K)\]( |self.range1|, |self.range2| , |self.range3| )`.
- What the checker determined: (b). A `ZZ32` (`size`, `|…|`) must become an `I`.
- Numbers: yes.
- Rung: none. None of the three measured parts touches it ([T] § 3.2).

### V1, arrays: element bounded by `Number`, which declares no arithmetic: 44 / 41

- Messages ([CW]): "Could not check call to operator MAX - ((QQ & {Ratio}), QQ)->QQ is not applicable to an argument of type (T, T). - ((RR64 & {Float, FloatLiteral, RR32}), RR64)->RR64 is not applicabl…" (`FortressLibrary.fss:4584`). And "Ill-formed type: Vector[\T,s0\] The static argument T does not satisfy the corresponding bound Number." (`:2306`).
- Sites: `FortressLibrary.fss:2295` `ivmap[\T\](fn (i:ZZ32, e: T):T => e + v.get(i))`, inside `trait Vector[\T extends Number, nat s0\]` at `:2291`; `:4583` `opr MAX[\T extends Number, I\](x: Array[\T,I\], y: T): Array[\T,I\] = x.map[\T\](fn (e: T): T => e MAX y)`; `:2306` `object __DefaultVector[\T, nat s0\]() extends Vector[\T,s0\]`.
- Split: 21 well-formedness errors (unbounded `__DefaultVector`/`__DefaultMatrix` against `Number`) and 23 body errors (walk; [CW], by kind).
- What the checker determined: (d), a bound that declares no operator. The flat `Number` declares only `asFloat` and `=` (FACTS, flat; [T] § 3.4).
- Numbers: yes. 31 sit in `Number`-bounded declarations; the other 13 are the unbounded default objects (`split.py`).
- Rung: none. Phase 5, the array design. The algebra-bound variant VEC did not finish ([T] § 3.4).

### V2, arrays: a sized array's body or factory: 42 / 41

- Messages ([CW]): "Function body has type Array[\T,(ZZ32, ZZ32)\], but declared return type is Array2[\T,0,s0,0,s1\]." (`FortressLibrary.fss:2708`). And "Function body has type OR(__DefaultArray2[\T,b0,s0,b1,s1\],Array2[\T,0,s0,0,s1\]), but declared return type is Array2[\T,b0,s0,b1,s1\]." (`:2694`).
- Sites: `FortressLibrary.fss:2708` `array2[\T,s0,s1\]().fill(v)`; `:2185` `__builtinFactory1[\T,b0,s0\]().fill(fn (i:ZZ32):T => get(i-b0))`; `:2927` `array3[\T,s0,s1,s2\]().fill(f)`, which is "not applicable to an argument of type (ZZ32, ZZ32)->T" and is row 247.
- What the checker determined: (e), mostly. The static type of a body loses its sizes in a join or a factory's result ([T] § 2.2: "sizes lost in joins and in the factories' `NatParam`"). This is the checker computing a type, not inferring a static argument. There are also 2 `NatReflect` typecase-unreachable errors and 2 "No such method Matrix[\T,s1,s0\].negate." ((d)). The capture allows no finer split.
- Numbers: sizes. 13 sit in `Number`-bounded `Vector`/`Matrix` declarations.
- Rung: phase 5. R421 moved 5 of them and added 2 ([cmp-R421-walk]). Rung A's `array3(f)` (row 247, [B7] § 3 A) touches `:2927`, by reading.

### S1, self type: a generic trait's `self` is not its parameter: 28 / 28

- Messages ([CW]): "Function body has type Integral[\I\], but declared return type is I." (`FortressLibrary.fss:652`). And "Could not check call to operator MOD - ((NN64 & {UnsignedLong}), NN64)->NN64 is not applicable to an argument of type (I, Integral[\I\]). - ((ZZ & {BigNum}…" (`:674`).
- Sites: `FortressLibrary.fss:652` `floor(self):I = self`; `:674` `opr DIVIDES(self,b:I):Boolean = self =/= self.zero AND: (b MOD self) = self.zero`; `:279` `opr MIN(self, other:T): T = if other < self then other else self end`.
- Split by enclosing trait: `Integral` 8, `AdditiveGroup` 2, `StandardTotalOrder` 10, `StandardPartialOrder` 4, the two array traits 4 (`n1b.py`).
- What the checker determined: (e). `self` has the trait's type, not `I`; the self-typed idiom overflows today's checker ([T] § 2.2, citing FACTS route C).
- Numbers: 10 in number traits (`Integral`, `AdditiveGroup`), and 14 in the order traits the numbers implement.
- Rung: none.

### RG, ranges: a method's declared type narrower than what it builds: 29 / 29

- Message ([CW], `RangeInternals.fss:1404`): "Function body has type RangeInternals.Range2D[\I,J\], but declared return type is RangeInternals.FullRange2D[\I,J\]."
- Sites: `RangeInternals.fss:1391` `StridedFullRange3D[\I,J,K\] = combine3D[\I,J,K\](i, j, k)`; `:180` `combine2D(self.range1.truncL(l_i),self.range2.truncL(l_j))`; `:220` `self.recombine(self.range1.every(s_i), self.range2.every(s_j))`.
- What the checker determined: (d), a declared type that is narrower than the value built.
- Numbers: ranges (all in `Integral`-bounded declarations).
- Rung: none.

### SF, `String`: an object's field read as an inherited method: 22 / 22

- Message ([CW], `String.fss:124`): "()->Maybe[\Char\] has no getter called depth".
- Sites: `String.fss:124` `assert(self.depth, (left.depth MAX right.depth) + 1, self)`; `:80` `getter generator():Generator⟦Char⟧ = ConcatGenerator(left.generator, right.generator)`; `:95` `if |left| ≥ |other|`.
- What the checker determined: (e), name resolution. `left`/`right` resolve to `()->Maybe[\Char\]` ([T] § 2.2).
- Numbers: no.
- Rung: none.

### G1, unbounded generics compared: 18 / 18

- Message ([CW], `FortressLibrary.fss:4420`): "Could not check call to operator CMP - ((RR64 & {Float, FloatLiteral, RR32}), RR64)->Comparison is not applicable to an argument of type (C, C). - ((TotalComparison & {LessThan, Equa…"
- Sites: `FortressLibrary.fss:4420` `(a1 CMP a2) LEXICO: (b1 CMP b2) LEXICO: (c1 CMP c2)`; `:4328` `typecase a1 CMP a2 of`; `:1842` `fn(a:E,b:E): TotalComparison => a CMP b) LEXICO`.
- What the checker determined: (d), a missing bound (`opr <[\A,B\]` and `CMP[\A,B,C\]` on tuples have none; [T] § 2.2).
- Numbers: no.
- Rung: none.

### R4, `StandardMinMax`'s slip in bodies: 18 / 18

- Messages ([CW]): "Function body has type T, but declared return type is (T, T)." (`FortressLibrary.fss:260`). "Could not assign an expression of type (ZZ32, ZZ32) to variable minFlat of type ZZ32." (`String.fss:520`).
- Sites: `FortressLibrary.fss:260` `opr MIN(self, other:T): (T,T) = do (r,_) = self MINMAX other; r end`; `:3293` `simpleJoin(a:(T,U),b:(T,U)): (T,U) = do`; `String.fss:520`.
- What the checker determined: (d), the consequences of row 421's `(T,T)`.
- Numbers: partly (`ZZ32` in `String`, 5 in range code).
- Rung: batch 7b, rung L. Measured: R421 clears 14 of 18 ([cmp-R421-walk]).

### CV, a call covered only by the union of its overloads: 10 / 10

- Message ([CW], `String.fss:244`): "Could not check method invocation BalancingForest.add - FlatString.FlatString->() is not applicable to an argument of type String. - String.CatString->() is not applicable to an argument of ty…"
- Sites: `String.fss:165` `forest.add(self.left)`; `String.fss:513` `self.collectStatsFor(s.left)`; `FlatString.fss:135` `flatConcat(self, b.asFlatString)`.
- What the checker determined: (c), static overload resolution. Walk dispatches on the value; the checker wants one arm for `String` ([T] § 2.2).
- Numbers: no.
- Rung: none.

### MB, `Maybe`: `Just` and `Nothing` do not join: 7 / 7

- Message ([CW], `FortressLibrary.fss:1329`): "Could not check call to function cond - [\G\](E->G, ()->G)->G is not applicable to an argument of type (E->Just[\G\], ()->Nothing[\G\])."
- Sites: `FortressLibrary.fss:1311` `cond[\E\](fn (e:E) => Just[\(ZZ32,E)\](0,e), fn () => Nothing[\(ZZ32,E)\])`; `:1327` `cond[\G\](fn (e:E) => Just[\G\](f(e)), fn () => Nothing[\G\])`; `:3006` `if av <- a then`.
- What the checker determined: two things.
  - 4 are (a): `__cond`'s static arguments are not found for an `AnyMaybe` value, "Could not check call to function __cond - [\E, R\](Condition[\E\], E->R, ()->R)->R is not applicable to any type of the form (AnyMaybe, _->_, ()->BottomType). …" (`FortressLibrary.fss:3043`).
  - 3 are calls `cond[\G\]`/`cond[\E\]` whose written static argument is the element type while the arms return `Just[\…\]` and `Nothing[\…\]`. By reading these are (d), a written static argument that is not the arms' type.
  - [T] § 2.2 reads the class as the hierarchy rung H changes.
- Numbers: no.
- Rung: rung H's hierarchy, by reading only ([T] § 4).

### TS, ranges: a tuple shift adds a whole tuple: 9 / 9

- Message ([CW], `RangeInternals.fss:1359`): "Could not check call to operator + - ((NN64 & {UnsignedLong}), NN64)->NN64 is not applicable to an argument of type (J, (I, J)). - ((RR64 & {Float, FloatLiteral, RR32}), RR64)->RR64 i…"
- Sites: `RangeInternals.fss:1359` `StridedFullRange2D[\I, J\](l_i+shift_i, l_j+shift_j, r_i+amount, r_j+amount, str_i, str_j)`; `:663` `LeftRange3D[\I,J,K\](l_i-shift_i, l_j-shift_j, l_k-amount, str_i, str_j, str_k)`; `List.fss:320` `fstUsed = sz - sz0` (part 5, item 1).
- What the checker determined: (d), a library slip: `r_i+amount` where `amount` is the whole tuple.
- Numbers: ranges, 8 of 9.
- Rung: none. Batch 6.5 lists "The tuple shifts … no row and no probe yet" among what it leaves out ([B65] § 1).

### BR, big operators' bodies: 9 / 10

- Message ([CW], `FortressLibrary.fss:3224`): "Function body has type RR64, but declared return type is BigReduction[\RR64,RR64\]."
- Sites: `FortressLibrary.fss:3217` `__bigOperatorSugar[\RR64,RR64,RR64,RR64\](BIG MINNUM(), g)`; `:3419` `__bigOperatorSugar[\Any,String,String,AnyMaybe\](BIG //(), g.map[\Any\](identity[\Any\]))`; `:3448` `Comprehension[\T,T,Any,Any\](fn (x) => x, MIMapReduceReduction[\T\](j,z), fn (x) => x)`.
- What the checker determined: (e), not traced ([T] § 2.2). The sites differ by setting: walk has `:3217` and `:3419`; compile has `:130`, `:1543` and `:3187` instead (diff of [CW] and [CC]).
- Numbers: 2 (`RR64`'s `BIG MAXNUM`/`MINNUM`).
- Rung: none.

### GB, a function argument inferred at `BottomType`: 7 / 8

- Message ([CW], `FortressLibrary.fss:4089`): "Could not check function application - BottomType->AnyMaybe is not applicable to an argument of type ZZ32. FortressLibrary.fss:4089:21-45: Possibly because i: ZZ32 after argument inf…"
- Sites: `FortressLibrary.fss:4089` `n = BIG MIN[i <- self.indices, self[i]=c] i`; `:3462` `self.g.generate[\R\](r, m COMPOSE self.f)`; `:3514` `SimpleFilterGenerator[\E\](self.g, self.p ANDCOND p')`.
- What the checker determined: (a), a function argument inferred at `BottomType` ([T] § 2.2, "by reading").
- Numbers: no.
- Rung: none.

### NM, names the api does not declare: 54 / 70

- Messages ([CW]): "Range[\ZZ32\] has no getter called lower" (`String.fss:474`). "Generator[\E\] has no getter called size" (`FortressLibrary.fss:4525`).
- Sites: `String.fss:474` `else baseString.uncheckedSubstring(r0≫range.lower)`; `FortressLibrary.fss:2162` `l = reflect(r'.lower)`; `String.fss:371` `other.uncheckedSubstring((baseSubrange≪range.lower) ∩ other.indices)`.
- What the checker determined: (d). Component code reaches members that the static type's api lacks.
- Numbers: ranges, 19 of 54.
- Setting difference: under the compile path's setting NM gains entries such as "No such method Generator[\G\].map." (`FortressLibrary.fss:1333`, `:1427`, `:3399`; `RangeInternals.fss:1098-1375`). These are `map` instantiated at a tuple, which is the `Object` bound's doing, by reading (diff of [CW] and [CC]).
- Rung: none.

### GF, a filter that failed for another reason: 9 / 9

- Message ([CW], `String.fss:480`): "Filter expressions in generator clauses must have type Boolean, but pieces.nonEmpty was not well typed."
- Sites: `String.fss:480` `if pieces.nonEmpty  then`; `FortressLibrary.fss:4472` `while dispatchingEnabled() AND i < |ths| do`; `String.fss:399` `if otherPieces.nonEmpty then`.
- What the checker determined: (e), a cascade. The error at the same line fell into the residue ([clf], `with_cascades`).
- Numbers: no.
- Rung: none.

### OT, the residue: 116 / 136

- Messages ([CW]): "Function body has type Just[\R\], but declared return type is Nothing[\R\]." (`FortressLibrary.fss:3030`, row 422). "Could not check call to function big - (ZZ32 & {Int, IntLiteral})->ZZ is not applicable to an argument of type NN64. …" (`:913`).
- Sites: `FortressLibrary.fss:3030` `empty(): Nothing[\R\] = Just(org.empty())`; `:913` `coerce(x: NN32) = big(signed(widen(x)))`; `FortressBuiltin.fss:347` `opr MINNUM(self, b:RR32):RR32 = do`; `List.fss:72` `private scale(x : ZZ32): ZZ32 = minSize MAX (2 x)`.
- Content, walk, by my reading of each of the 116 (`otcat.py`; compile in brackets where different):
  - Numbers directly, 28 [30]:
    - row 421's cascades, 4: `List.fss:72`, `:75`, `:332`, `RangeInternals.fss:449`. R421 clears all 4 ([cmp-R421-walk]).
    - `QQ`'s bodies, 8: `FortressLibrary.fss:615`, `:620` (`ceiling(self):ZZ = if denominator(self) = 0 then self else`); `:608-609` (`-other` on `other:AnyIntegral`); `:503` (`typecase a CMP b of`) and its two unreachable clauses.
    - the number leaves' own getters and natives at another width, 7:
      - `FortressBuiltin.fss:471-472` `getter zero(): IntLiteral = big(0)`
      - `:460-461` `getter zero(): UnsignedLong = widen(unsigned(0))`
      - `RR32`'s `MINNUM`/`MAXNUM` at `:347`, `:357`, and `String.fss:508` `getter avFlat(): RR32 = asFloat(ssize) / asFloat(numFlat)`
    - conversion functions declared on leaves only, 3: `FortressLibrary.fss:764`, `:913`, `:915`.
    - `typecase` narrowing a type parameter to `ZZ32`, which gives "AND(ZZ32,I)", 3 [5]: `:3877-3879`.
    - ranges over numerals inferred at `IntLiteral`, 2: `:1317`, `:1320` (`(0#1).narrowToRange(r)`, "RangeInternals.CompactFullParScalarRange[\IntLiteral\].narrowToRange …").
    - a leaf-only integer function called on an `I`, 1: `:2107` `m = partitionL(x)`.
  - Ranges, 34 [29]:
    - range bodies' slips, 17 [16]. Wrong arity (`RangeInternals.fss:917`, `:964`, `:1290`), a declared type narrower (`FortressLibrary.fss:3699`, `:3746`, `:3857`), `self.stride.get` on a tuple (`RangeInternals.fss:906`, `:952`), and `(self.lower + amount) : (self.upper + amount)` (`RangeInternals.fss:1008`, `:1010`).
    - `PCMP`/`SCMP` on tuples in `FortressLibrary`'s unbounded range traits, 6.
    - range operators applied at `Any` (`truncL(x:Any): RangeWithLeft[\Any\] = (x#)`, `:3759-3765`), 5.
    - `map` with a tuple-pattern lambda, "not applicable to any type of the form _->_", 4 [0] (`RangeInternals.fss:1100`, `:1133`, `:1341`, `:1378`). Under the compile path's setting these lines show in NM as "No such method Generator[\(I, J)\].map.".
    - `seq` of a `Range`, 2.
  - Not numeric, 54 [77]: generators, `List`'s generics, `throw` of an exception constructor, varargs `assert`/`deny`, `if` without `else`, and others.
- The compile path's extra 20 (net): 33 of [CC]'s 136 OT messages print an `extends Object` bound in their first 220 characters, against 0 of [CW]'s 116. Among them are four refusals the bound itself causes: "Could not check call to function Just - [\T extends Object\]T->Just[\T\] is not applicable to an argument of type Any." (`FortressLibrary.fss:1398`, `:3016`, `:3041`), and `List.fss:490` (`singleton`).
- What the checker determined: mixed. (a) 2, (d) the leaf-only and slip items, (e) the rest.
- Rungs:
  - 6.5 V: `FortressBuiltin.fss:347`, `:357`, by reading ([T] § 6).
  - 7b L: R421's 4, measured.
  - The rest: none, "one by one" ([T] § 2.2).

## Part 2. What each measured fix clears, as the triage states it and as the captures show

- **Row 421's two declarations** (R421: `StandardMinMax`'s `MIN`/`MAX` declared `T`, "4 lines", api and component): 1,738 → 1,686, −52 ([T] § 3; [V] column 10).
  - By class: R1 −32, R4 −14, OT −4, I3 −1 (`String.fss:77`), TS −1 (`List.fss:320`).
  - The same run shows V2 −5/+2, BR −2/+3, L1 −8/+8 (renamed sites), and I2 +2 ([cmp-R421-walk]). The I2 +2 is a misclassification (part 5, item 4).
- **`extends Object`** (BP: `builtinPrimitive[\T extends Object\]`, api and component, 2 lines): 1,738 → 1,400. N1 340 → 0; BR 9 → 11 ([cmp-BP-walk]). Writing `extends Any` (BPANY) gives 1,738, with N1 unchanged ([cmp-BPANY-walk]). Walk's setting only: under the compile path's setting N1 is already 0.
- **The mechanical integers fix**: row 358's bounds (BOUNDS) and the dummy device respelled (DEVICE).
  - BOUNDS: "the 138 bounds `X extends AnyIntegral` of `RangeInternals` and of the range operators, api and component, become `Integral[\X\]`; two unbounded declarations take it", which is 42 + 24 in `RangeInternals` and 36 + 36 in `FortressLibrary` ([T] § 3, § 3.2).
  - DEVICE: the 18 operators pass their own first arguments instead of `0 asif ZZ32`.
  - Together, 1,738 → 1,653, −85 ([V] column 4). I1 81 → 4, I2 18 → 0, X1 −2, I3 +12 (unmasked), D2 +2, RG +2, BR −1, OT −2, O1 −1 ([cmp-BOUNDS+DEVICE-walk]; [V]). [T]'s table does not list the D2 and RG changes.
  - BOUNDS alone: 1,673 ([V] column 5).
- **The numeral shadow** (an instrument: `IntLiteral` is answered a subtype of a type variable bounded by `Integral` or `AnyIntegral`, `distance-triage/numeral-shadow.py`; "not a proposed rule: a real rule would convert the numeral", [T] § 1).
  - On L0: 1,738 → 1,627 ([V] column 9).
  - After BOUNDS+DEVICE: 1,653 → 1,506, −147 ([V] columns 3 and 4). By class: I3 161 → 12, OT +7, I1 +3, R4 −3, V2 −2, and O1, I5 and NM −1 each. The −147 is this net total, not a count of numerals. Part 5, item 5 gives it by site.
- **The combined 1,122 / 1,268.**
  - 1,122 is one run under walk's setting of a library copy carrying BP, BOUNDS, DEVICE and R421, with the numeral shadow on ([T] § 3, "all, walk"; [cmp-BP+BOUNDS+DEVICE+R421-walk-num]: total 1,738 → 1,122, 641 gone and 25 new).
  - 1,268 is one run under the compile path's setting of BOUNDS, DEVICE and R421, with the shadow and without BP, since the setting already bounds `T` by `Object` ([cmp-BOUNDS+DEVICE+R421-compile-num]: 1,533 → 1,268, 313 gone and 48 new; Q1 372 → 380).
  - So both figures are four (or three) library respellings plus a checker instrument that is not a rule. No buildable tree gives them. The separate changes sum to −622 and the combined run gives −616 ([T] § 3).
- **The numeral switch** (its library half, A0, `numeral-lib-A0.patch`): 1,738 → 1,773, +35 ([V] column 2; [T] § 3.2).
  - N1 +24 (the enabled `IntLiteral` natives), I3 +16 new sites, V2 −4, G1 −4 ([cmp-A0-walk]).
  - The 16: 15 ranges over numerals (part 4, shape 13, lists them) and 1 of row 388's shape.
- **The promotion rule** (answer 8; not built, not measured). [T] § 4: "Without the numeral switch, no error today is a generic call over two different number types"; the rule's numeral case "would clear the 15" of A0 (inferred); "the rule finds no call to clear in the library's count". Part 5, item 6 qualifies this.
- **Row 388's fix** (not built): "no" for `RangeInternals`' numerals, "Row 388 is a coercion into a declared non-generic parameter type of a generic function" ([T] § 2.3). It would clear one A0 site, `List.fss:488` `ArrayList(primitiveImmutableArray[\E\](n),0,noShot,0,oneShot())` ([T] § 3.2; [cmp-A0-walk]).

### The planned rungs, collected

- 6.5 E: none. "Unchanged by reading: the one library's own sizes are the literals 0 to 3" ([B65] § 3 E, "The checker count").
- 6.5 P: none. It changes comments and the specification only ([B65] § 3 P, "The checker count. Unchanged").
- 6.5 G: I3 2 (`FortressLibrary.fss:3108`, `:3121`), by reading. It depends on how G respells the `else` branch; G may edit only `additiveIdentity` and `multiplicativeIdentity` ([B65] § 3 G, "Files it may touch").
- 6.5 V: 3 by reading: I3 1 (`FortressBuiltin.fss:327`) and OT 2 (`:347`, `:357`) ([T] § 6). V also adds 46 api lines for `RR32` in its second shape ([N65] § 6), which the distance has not seen.
- 7 H: H1 38 and H2 2 by its brief. By reading ([T] § 4), also O1 15/14, R2's 17, MB 7 and L1's CMP 4. Not measured on the distance.
- 7 A: A1 244/0, A2 58/58 and R3's array1-3 5/0, by reading ([T] § 4).
- 7b S: none ([B7] § 3 S, "Unchanged by this rung").
- 7b C: clears none. It "may move" the count, since its new rules can refuse library declarations. Probe P1 is to measure that ([B7] § 3 C, "The checker count"; § 4, "C may move it").
- 7b W: none ([B7] § 3 W).
- 7b L: L1's named families, 67 / 68, by reading. Plus, measured through R421: R1 32, R4 14, OT 4, I3 1, TS 1, which is row 421's −52. Plus R3's seq 4 / 3, by reading. L1's IN (14 / 6) goes to batch 8 ([B7] § 4). L1's CMP 4 sits on H's declarations.

## Part 3. Section 1 of your questions: the per-file split

By the file of the error's location, walk / compile (`byfile.py`, `split2.py` over [CW] and [CC]). "Integral-bound" means the error's line sits inside a declaration with a static parameter bounded by `Integral[\…\]` or `AnyIntegral`; "Number-bound" and "algebra-bound" (`AdditiveGroup`, `MultiplicativeRing`) likewise; "number type" means inside a number type's own object or trait (`ZZ32`, `RR32`, `Float`, …).

- **`RangeInternals`, 389 / 531 with the cross-file pairs below; 369 / 519 in its two files alone.**
  - Component (`RangeInternals.fss` only): 340 / 418. Integral-bound: 299 / 377. The other 41: `RightScalarRange[\I\]`, unbounded (35: I1 25, I3 9, I5 1); `emptyScalarRange[\I\]` (2); `checkSelection` (2, OT); and X1 (2). By the flat note's units: component `RangeInternals` 343 / 430 ([F] § 2.1).
  - Api (`RangeInternals.fsi` only): 29 / 101, all Integral-bound. Walk: L1 27, M1 2. Compile: adds Q1 72.
  - Pairs across the two files: `FortressLibrary.fss` + `RangeInternals.fsi` 14 / 6 (L1's IN), `FortressLibrary.fsi` + `RangeInternals.fsi` 3 / 3, `FortressLibrary.fsi` + `RangeInternals.fss` 3 / 3 (R3's atMost/every). All Integral-bound except 1.
  - So on walk's setting 336 of the 340 component errors sit in declarations generic over an integer type parameter, 299 of them bounded.
- **`FortressLibrary`, 1,003 / 834.**
  - Component (`.fss`): 799 / 619. Integral-bound 41 / 49; Number-bound 51 / 48; algebra-bound 10 / 10; number type 133 / 19, of which N1's 114 are walk only; other 564 / 493 (A1 167, A2 38, M1 51, N2, OT and more).
  - Api (`.fsi`): 204 / 215. Integral-bound 2 / 14; Number-bound 8 / 8; algebra-bound 3 / 3; number type 5 / 5; other 186 / 185.
  - The range code in `FortressLibrary.fss:3690-3970`, whose range traits (`trait Range[\I\]`, `:3690`, and the rest) and several operators are unbounded: walk M1 20, OT 18, I2 18, I1 16, L1 8, N2 1 (`awk` over [CW]).
  - By unit ([F] § 2.1): component 828 / 643, api 180 / 195.
- **`NativeArray`, 9 / 2 by location.**
  - Api: Z1 2 at `NativeArray.fsi:12`, 2 / 2.
  - Component: N1 7 at `NativeArray.fss`, walk only.
  - By unit, the `NativeArray` api and component also print 22 `fill` pairs whose locations are `FortressLibrary.fsi:1360-1432` ([F] `errors-walk.tsv`, unit "api NativeArray+component NativeArray"). Those are counted under `FortressLibrary` above.
  - None is number-bound. 2 of the N1 are in `PrimImmutableRR64Array`.
- **`FortressBuiltin`, 193 / 12.** Component 193 / 11: number type 171 / 7 (N1 164, and OT, I3). Api 0 / 1.
- **The other apis and components, 144 / 154.**
  - `String` 70 / 73, `List` 26 / 42, `FlatString` 20 / 8, `Writer` 12 / 1, `NatReflect` 5 / 3, `Stream` 3 / 7: 136 / 134.
  - Mixed pairs with `FortressLibrary.fsi` or `NatReflect.fsi` 6 / 6, and no location 2 / 14.
  - None sits in a number-bound declaration.

## Part 4. Section 2 of your questions: the integers-in-generic-code family

The family is I1 81 + I2 18 + I3 149 + I4 3 + I5 15 + I6 8 = 274, both settings ([T] § 2.2).

- **Your "147 numerals at a type parameter"** is the net change of the numeral shadow on top of BOUNDS+DEVICE: 1,653 → 1,506 ([V]). By class, that step takes I3 161 → 12; by site it is item 5 of part 5.
- **The "18 dummy arguments"** are 18 operators holding 36 `0 asif ZZ32` occurrences, together with row 358's 138 bounds (part 2).
- **The "15 ranges over numerals"** are not in today's count. They are what A0 adds (part 2). Today's count has 4 ranges whose static argument is inferred at `IntLiteral`: I3's `FortressLibrary.fss:1065` and `:4071`, and OT's `:1317` and `:1320`.

The distinct code shapes. For each: its count, one line, and what the library already does elsewhere to write it without a numeral.

1. **A sign or zero test of an `I` value against a numeral.** 45, plus 41 filter duplicates (I3, all in `RangeInternals.fss`; `i3shapes.py`).
   - Line: `RangeInternals.fss:381` `getter fromLeft(): Boolean = ex > 0`.
   - Precedent: `FortressLibrary.fss:674` `opr DIVIDES(self,b:I):Boolean = self =/= self.zero AND: (b MOD self) = self.zero`, a comparison with the type's own zero. `Integral` declares `getter zero(): I` (`FortressLibrary.fsi:432`, `.fss:645`).
   - This precedent line is itself an S1 error: `b MOD self` fails because `self` is an `Integral[\I\]` ([CW] `:674`). A test on a field such as `ex: I` would not meet that.
2. **Arithmetic by one on an `I`.** 20 (I3).
   - Lines: `RangeInternals.fss:575` `n += 1`; `:421` `if ex > 0 then ex+s-1 else ex-s+1 end`; `:39` `start + roundToStride(bound-start+stride-1, stride)`.
   - Precedent: `Integral` declares `getter one(): I` (`FortressLibrary.fsi:433`, `.fss:646`). But no call site in `Library/` or `LibraryBuiltin/` reads `.one` on a value (`grep "\.one\b"`: none; outside a comment the only hits of `\.zero\b` are `FortressLibrary.fss:335`, `:674` and `:920`; `:2933` is inside the commented-out `Monoid` trait). The nearest precedent is `AdditiveGroup`'s `opr -(self) : T = self.zero - self` (`FortressLibrary.fss:335`, also an S1 error site).
3. **`DOTPLUS 1` feeding `partitionL`.** 6 (I3).
   - Line: `RangeInternals.fss:1200` `split = partitionL((lo BITXOR hi) DOTPLUS 1)`, and the same at `:1030`, `:1045`, `:1220`, `:1241`, `:1265`.
   - Precedent for the numeral: as in shape 2.
   - Behind it: `partitionL` is declared only on leaves (`FortressLibrary.fsi:541` on `ZZ32`; component `.fss:750` `ZZ32`, `:832` `ZZ64`, `:899` `NN64`), not on `Integral` (`.fsi:431-470`). So these lines keep an error after the numeral is fixed (part 5, item 5). The same leaf-only call is OT's `FortressLibrary.fss:2107` `m = partitionL(x)`.
4. **`narrow` of an `I` expression containing `+ 1`.** 2 (I3).
   - Lines: `RangeInternals.fss:989` `res = narrow(r-l+1)`; `:1158` `res = narrow((self.right.get-self.left.get) DIV self.stride + 1)`.
   - `narrow` is declared only on the leaves (`FortressLibrary.fsi:374`, `:501`, `:543`, `:589`, `:603`). As in shape 3, the line keeps an error after the numeral is fixed.
5. **A numeral argument to a range constructor with an `I` value in hand.** 9 (I3).
   - Line: `RangeInternals.fss:1475` `right1Range[\I extends AnyIntegral\](_:I,x:I):RightRange[\I\] = RightScalarRange[\I\](x,1)`.
   - The same at `:1441`, `:1443`, `:1446`, `:1453`, `:1462`, `:1472`, `:1477`, `:1480`.
   - Precedent: `x.one`, as in shape 2.
6. **A numeral argument with no `I` value in hand.** 5 (I3).
   - Lines: `RangeInternals.fss:368` `open[\I extends Integral[\I\]\](): OpenScalarRange[\I\] = OpenScalarRange[\I\](1)`; `:1483-1487` (`openRangeHelper[\I extends AnyIntegral\](_ : ()->I): OpenScalarRange[\I\] = OpenScalarRange[\I\](1)`); `:1418` `emptyScalarRange[\I\]() : FullScalarRange[\I\] = CompactFullParScalarRange[\I\](0,-1)`.
   - Precedents:
     - An identity from the static argument alone through the `() -> T` witness: `additiveIdentity[\T extends AdditiveGroup[\T\]\](): T` and `multiplicativeIdentity[\T extends MultiplicativeRing[\T\]\](): T` (`FortressLibrary.fss:3107-3131`). `Integral[\I\]` extends `MultiplicativeRing[\I\]` (`.fsi:431`). Both functions are rung G's to respell.
     - Pinning a static argument with a witness: `openRange[\I\](): OpenRange[\I\] = openRangeHelper( __thrower[\I\] )` (`FortressLibrary.fss:3946`).
   - `:1485` also writes one static argument for two parameters, `OpenRange2D[\I\](1,1)`.
7. **Zero corners of a 2-D or 3-D range.** 4 (I3).
   - Line: `RangeInternals.fss:1096` `CompactFullRange2D[\I,J\](0,0,r_i-l_i,r_j-l_j)`; also `:1129`, `:1337`, `:1372`.
   - Precedent: `l_i.zero`, as in shape 1.
   - `:1129` also passes four arguments where the constructor takes six ([T] § 2.3).
8. **A numeral returned at a type parameter.** 3 (I3).
   - Line: `RangeInternals.fss:985` `getter stride(): I = 1`; also `:1101` `(1,1)` and `:1134` `(1,1,1)`.
   - Precedent: numerals are returned only at concrete types, e.g. `getter one(): ZZ32 = 1` (`FortressLibrary.fss:692`) and `getter zero(): ZZ64 = widen(0)` (`:765`). No generic instance exists; a field's `.one` is the form shape 2 names.
9. **A numeral bound to a local of type `I`.** 3 (I3).
   - Line: `RangeInternals.fss:570` `n : I := 1`; also `:688`, `:803`.
   - Precedent: as in shape 2.
10. **A numeral chosen by a test, then passed as an `I`.** 1 error at `:149`, plus the test's own error at `:148` counted in shape 1.
    - Line: `RangeInternals.fss:148` `dir = if self.stride > 0 then 1 else -1 end`, then `:149` `self INTERSECTION leftScalarRange[\I\](l,dir)`.
11. **A numeral beside a `ZZ32` size.** 1 (I3).
    - Line: `RangeInternals.fss:795` `getter bounds(): CompactFullScalarRange[\I\] = CompactFullParScalarRange[\I\](0,self.size-1)`.
    - This needs shape 7's zero and I4's size in `I`.
12. **A numeral in a generic's `else` at `T`.** 3 (I3).
    - Lines: `FortressLibrary.fss:3117` `else => 0` (error at `:3108`) and `:3130` `else => 1` (error at `:3121`), both rung G's; `:2718` `array2[\T,s0,s1\]().fill(fn (x:ZZ32,y:ZZ32):T => if x=y then v else 0 end)` (row 437).
    - Precedent: `additiveIdentity` itself, for `AdditiveGroup` bounds. `matrix`'s `T extends Number` does not have that bound; row 437 places the repair "with `tabulate` and the array design".
13. **A range over numerals whose static argument is inferred at `IntLiteral`.** 2 in I3, 2 in OT.
    - Line: `FortressLibrary.fss:4071` `allButFirst(): String = self[1:]`; also `:1065`, and OT's `:1317`/`:1320` `(0#1).narrowToRange(r)`.
    - Precedents:
      - The library writes the static argument to pin a numeral range's type: `zeroIndices(): CompactFullRange[\ZZ32\] = sized1Range[\ZZ32\](0,0,s0)` (`FortressLibrary.fss:2145`) and `sized2Range[\ZZ32,ZZ32\](0,0,0,0,s0,s1)` (`:2489`).
      - The compiler library declares its ranges on `ZZ32` only: `opr :(lo:ZZ32, hi:ZZ32): Range` and `opr #(lo:ZZ32, sz:ZZ32): Range` (`Library/CompilerLibrary.fsi:173-174`).
      - Answer 8's interim rule is "until then such a call writes its static argument" (`POSITIONS.md:107`).
    - A0's 15 are this shape once a numeral stops being a `ZZ32`: `FortressLibrary.fss:1308` `getter bounds(): CompactFullRange[\ZZ32\] = 0 # |self|` and ten more in that file (`:1819`, `:2173`, `:2223`, `:2268`, `:2283`, `:2409`, `:2569`, `:2800`, `:4070`, `:4557`); `List.fss:146` `r = (0 # |self|).narrowToRange(n)` and `:302`; `String.fss:272` `getter bounds():Range[\ZZ32\] = 0#0`; `String.fss:25` `a[n] := a[n-2] + a[n-1], n ← seq(2:maxFib)` ([cmp-A0-walk]).
14. **`MOD 2` on `self`.** 1 (I3).
    - Line: `FortressLibrary.fss:658` `even(self): Boolean = (self MOD 2) = 0`.
    - It also carries S1's `self` problem. Its sibling `odd(self): Boolean = NOT (even self)` (`:657`) avoids its own numeral by calling `even`.
15. **The range operators' dummy argument.** I2, 18.
    - Line: `FortressLibrary.fss:3910` `opr (x:I)#[\I extends AnyIntegral\] : LeftRange[\I\] = left1Range(0 asif ZZ32, x)`.
    - Precedent: the witness at `:3946`, as in shape 6. DEVICE's respelling passes the operator's own first argument ([T] § 3.2).
    - The specification refuses `0 asif ZZ32` once a numeral is not a `ZZ32` ([N65] § 1, variant B, citing `Specification/basic/expressions/type-annotation.tex:40-52`).
16. **A bound too weak for the body.** I1, 81.
    - Line: `RangeInternals.fss:1423` `CompactFullParScalarRange[\I\](lo,lo+ex-1)` under `sized1Range[\I extends AnyIntegral\]`.
    - Precedent: the api's own bound. Row 358 gives `object RightScalarRange` at `RangeInternals.fsi:309` as bounded `Integral[\I\]` in the api and unbounded in the component. No numeral is involved.
17. **A fixed width into `I`.** I4, 3.
    - Line: `RangeInternals.fss:794` `getter extent(): Just[\I\] = Just[\I\](self.size)`.
    - Precedent: none that converts a `ZZ32` into an arbitrary `I`. The library converts only the other way, by `narrow` of an `I` expression on leaves (shape 4). [T] § 2.3 records that "a generic coercion is refused as a cyclic hierarchy (FACTS, the specification's refused examples)".
18. **A leaf-only operator on `I`.** I5, 15, plus shapes 3 and 4's hidden calls and OT's `:2107`.
    - Line: `RangeInternals.fss:710` `fullScalarRange[\I\](r - ( |n| - 1 ) str, r, str)`.
    - Precedent: the leaves declare `opr |self|` (`FortressLibrary.fsi:475`, `:515`, `:558`); `Integral` declares none.
19. **Wrong static arguments written.** I6, 8.
    - Line: `RangeInternals.fss:746` `flip(): LeftRange2D[\I,J\] = LeftRange2D[\ZZ32,ZZ32\](r_i,r_j,-str_i,-str_j)`.
    - Precedent: the 1-D neighbour writes it right, `flip(): LeftScalarRange[\I\] = leftScalarRange[\I\](r, -str)` (`RangeInternals.fss:698`).

What remains of the 274 after the three measured parts, by class: I1 7, I2 0, I3 12, I4 3, I5 14, I6 8, 44 in all ([T] § 3.2). By site it is 53 (part 5, item 5).

## Part 5. Section 3 of your questions: what in the captures contradicts the triage's classification

1. **TS holds a row-421 error.** `List.fss:320` `fstUsed = sz - sz0` ("argument of type ((ZZ32, ZZ32), ZZ32)") follows from `:319` `sz = (sz0 + i) MAX scale(sz0)`. There `MAX` answers `(T,T)` (row 421), so it is not a tuple shift. R421 clears it ([cmp-R421-walk] line 101). TS's tuple shifts are 8, not 9.
2. **I3 holds five errors that are not a numeral at a type parameter.**
   - `String.fss:77`, row 421: the triage says so itself in § 3.2.
   - `String.fss:156`, a cascade of SF.
   - `FortressBuiltin.fss:327`, an overloaded function value: the capture shows "AND(Float->Float,RR32->Float,…" as the argument type.
   - `String.fss:79` `0#size` and `List.fss:276` `0 # |self|`. Neither is cleared by the shadow in any run (they are absent from every compare file's "gone" lines). The same expressions `0#0` (`String.fss:272`) and `0 # |self|` (`FortressLibrary.fss:1308`) raise no error on L0. So the numeral alone is not the cause.
   - [clf] matched these five on text past the 220-character cut. `String.fss:79` sits in `CatString`, whose fields SF shows being read as inherited methods; that it is SF's shape is by reading only.
3. **N2 is not all `fail`.** 21 of 24 are. `FortressLibrary.fss:169`, `RangeInternals.fss:157` and `List.fss:150` show other calls in the capture. [T] § 3.1 says "N2's 24 are calls of `fail[\T\](s:String):T`".
4. **The "I2 → 2" of the combined runs is not the dummy device.** The two are `List.fss:322` and `:333`: "Could not check call to function fill - [\T\](ZZ32, ImmutableArray[\T,ZZ32\])->() is not applicable to an argument of type (ZZ32, ImmutableArray[\E,ZZ32\])." R421 unmasks them. [clf]'s I2 rule `argument of type \(ZZ32, (ZZ32, )*I` matches the "I" of "ImmutableArray" ([cmp-BP+BOUNDS+DEVICE+R421-walk-num], [cmp-BOUNDS+DEVICE+R421-compile-num], [cmp-R421-walk]). The device goes 18 → 0 in every run that respells it.
5. **The numeral shadow's reach is by class, not by site.**
   - On L0, 119 I3 sites go (118 in `RangeInternals`, 1 in `FortressLibrary`), not 127. The other 8 stay as errors at the same site with a new message that [clf] then puts in OT. [cmp-L0-walk-num] shows "I3 149 22 119 0" and "OT 116 123 1 0": 123 = 116 − 1 + 8.
   - After BOUNDS+DEVICE, 128 go and 21 I3 sites persist: 12 still I3, 8 now OT, 1 now RG.
   - The 9 moved sites are the six `partitionL((lo BITXOR hi) DOTPLUS 1)` lines, the two `narrow(… + 1)` lines and one filter (`RangeInternals.fss:702`). The numeral error masked a second one: `partitionL` and `narrow` are not declared on `Integral[\I\]` (part 4, shapes 3 and 4).
   - So [T] § 2.3's "clears 126 of RangeInternals' 138" is 118 lines cleared, plus 8 whose error changed. And § 3.2's "takes the family from 274 to 44" is 53 by site. The totals 1,627, 1,506 and 1,122 are unaffected: they count every error.
6. **"No error today is a generic call over two different number types" stands, but four ranges are the rule's numeral question.** The four ranges whose static argument is inferred at `IntLiteral`, and whose context wants `ZZ32` (part 4, shape 13), are single-numeral ranges, not mixed ones. [T] assigns them no fix; it lists `:1065` and `:4071` among what remains. Whether the promotion rule's numeral default ([T] § 3.2: "The rule needs a default; the compiler library's ranges choose ZZ32") covers them is not stated anywhere I found.
7. **Rung L does not get all of L1.** [T] § 4 puts all 85 / 78 L1 in rung L, and R4's 18 as well. [B7] names rung L's families without IN, and puts `RangeInternals`' IN in batch 8 (§ 4). L1's CMP 4 are `LessThan`'s and `GreaterThan`'s `CMP`, H's declarations. R421 measured 14 of R4, not 18.
8. **The compile path's setting costs more than Q1's 372.** Under that setting NM rises 54 → 70 and OT 116 → 136. Among the additions are refusals that name the bound: "[\T extends Object\]T->Just[\T\] is not applicable to an argument of type Any." (`FortressLibrary.fss:1398`, `:3016`, `:3041`), and "No such method Generator[\G\].map." at tuple-instantiated `map` calls (diff of [CW] and [CC]). [T] § 3.3 counts the setting's cost as the 372.
9. **The site of an inference failure depends on the setting.** `List.fss:150` is N2 under walk's setting ("Could not infer static argument T without context") and GB under the compile path's ("BottomType->CovariantCollection.AnyCovColl is not applicable…"). This does not contradict the classification. It shows the (a) classes moving between N2 and GB with the bound.

## The (a)–(e) tally, for the "unknown types and coercion" question

Counts from part 1's assignments, walk / compile. Classes that mix categories are split as above.

- (a) A static argument not inferred or inferred wrongly: 395 / 32.
  - Walk: N1 340, N2 24, I2 18, GB 7, MB's 4, and I3's 2 `IntLiteral` ranges. OT's 2 `IntLiteral` ranges are counted in OT.
  - Compile: I2 18, GB 8, MB's 4, I3's 2.
  - The messages: "Could not infer static argument T without context", "LeftRange[\OR(ZZ32,I)\]", "LeftRange[\IntLiteral\]", "BottomType->…".
- (b) A value needing a coercion into a type: 145 / 145. I3's 142, of which 8 hide a second error (part 5, item 5), and I4 3. Every one is a numeral or a `ZZ32` meeting a type parameter `I`. None is between two concrete number types.
- (c) Overloading, exclusion, comprises or return-type rules: 643 / 385. A1, A2, M1, L1, H1, H2, O1, R1, R2, R3 and CV. R1's cause is (d), row 421.
- (d) A missing or mismatched declaration: 313 / 337. I1, I5, I6, X1, D1 (compile only), D2, V1, NM, G1, F1, RG, TS, R4 and MB's 3.
- (e) Other: 121 / 493. Q1 (the `Object` setting, 372, compile only), Z1, S1, SF, V2, BR and GF. Plus I3's 2 (e) errors and 1 (d) error, I3's 2 undetermined, and the OT residue, 116 / 136.
- On today's library, then:
  - The "coercion" errors are all about type parameters: a numeral or a `ZZ32` into `I`.
  - The largest "unknown type" errors, N1, have no coercion in them: BP clears all 340 with one bound, and BPANY clears none.
  - The two meet in the integer range code. The dummy device's inferred union `OR(ZZ32,I)` (I2) and the ranges inferred at `IntLiteral` are inference over number types, the ground of answer 8's promotion rule and of a numeral default ([T] § 3.2, § 4). No measurement on file says whether either would clear them.
