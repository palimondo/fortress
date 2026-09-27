<!-- Written 2026-09-27 by a delegated triage worker, for the coordinator choosing with Pavol what to fix first on the way to the switch-over. It classifies by root cause every distinct error of answer 11's measurement (switch-over-distance-flat.md, 1,736 errors under walk's setting and 1,527 under the compile path's), maps each class to the batch that fixes it, and measures the largest unplanned classes and the promotion rule's reach on library copies. Tree: main at edc815f0c, whose Library/, ProjectFortress/LibraryBuiltin/ and ProjectFortress/src/ are byte for byte those of d65892d34, the sources the measurement ran on. Method: that measurement's one-JVM stage (DistanceMulti.java, the twelve prelude components, every stage and declaration, the overloading memo off) over private copies of the library, one private cache per run, in the worktree /home/user/fortress-triage; one checker shadow (numeral-shadow.py) behind a switch; nothing tracked outside distance-triage/ was changed and ant was not run. Every command is in distance-triage/run.sh and tables.sh. -->

# The distance to the switch-over, by root cause

Terms are those of `switch-over-distance.md` and `switch-over-distance-flat.md`. One more here:
- *Class*: a root cause. The same cause behind many sites is one class, as in the 2026-09-22 triage (`perf-probes/nat/triage.md`). An error that only repeats another at the same line (a generator's filter that fails because the comparison inside it failed) is counted with the class of what it repeats.

## The answers

1. **The classes by size, walk's setting / the compile path's** (the control run: 1,738 / 1,533). Each is a root cause or a family of them; § 2 has the full list.
   - The bound `Object`, 0 / 372: the compile path's own setting. Batch 7's Q1 decides it; that is a choice of setting, not a fix.
   - The natives' static parameter not inferred, 364 / 0. No batch.
   - `fill`, 302 / 58. Batch 7, rung A.
   - **Integers in generic code, 274 / 274. No batch.**
   - The Meet Rule, 100 / 100. Batch 8.
   - The array family, 97 / 93. Phase 5.
   - Api and component gaps, 94 / 109. No batch.
   - The overload families of answer 9, 85 / 78. Batch 7b, rung L.
   - `StandardMinMax`'s `(T,T)` slip (row 421), 50 / 50. Rung L.
   - Exclusion and `comprises`, 40 / 40. Rung H.
   - About twenty smaller classes, and a residue of 116 / 136 one-off library slips and checker limits.
2. **Measured on library copies, walk's setting, from the control's 1,738:**
   - the natives' bound written `Object` (one declaration, api and component): 1,400;
   - row 421's fix (two declarations, api and component): 1,686;
   - row 358's bounds and the range operators' dummy argument, respelled: 1,653;
   - with those, numerals accepted where an integer type parameter is expected: 1,506;
   - the four together: 1,122. Under the compile path's setting, without the natives' line, 1,533 → 1,268;
   - the numeral switch's library half: 1,773.
3. **RangeInternals' new body errors are numerals where a type parameter is expected** (`ex > 0`, `lo + 1` with `I extends Integral[\I\]`).
   - Answer 8's promotion rule, as worded, does not clear them, and neither do the numeral switch or row 388's fix.
   - A rule accepting a numeral wherever an integer type parameter is expected clears 126 of RangeInternals' 138 (measured with a checker shadow).
   - The library's own way is `x.zero` and `x.one`, as `Integral`'s `DIVIDES` writes it. That means respelling about 130 sites.
4. **The promotion rule is a small lever on this count.**
   - Without the numeral switch, no error today is a generic call over two different number types.
   - The library does the rule's job by hand, with the dummy `0 asif ZZ32` argument of `#` and `:`, and that device is what fails on the flat tower. It accounts for 18 errors, and respelling the device clears them.
   - With the switch, the library half adds 35 errors. 24 of them are the enabled `IntLiteral` natives, which are the natives' class again. 15 are ranges over numerals (`0#n`, `2:46`), which the rule's numeral case would clear (inferred). One is row 388's.
   - The rule's reach is programs' ranges and mixed-width calls, not the library's count.
5. **The most impactful fix no batch plans: the integers-in-generic-code family.**
   - It holds 274 errors under both settings. Its three parts take it to 44 (1,738 → 1,506 in all).
   - Row 358's bounds (138 bound rewrites and two declarations in four files) and the dummy device (18 calls) are a mechanical library respelling. Together they clear 85.
   - The numeral part clears 147 more, but it is a decision: a checker rule, or about 130 library sites.
   - Per unit of work, two fixes clear more. The natives' bound clears 340 errors with one declaration, but only under walk's setting, or if Q1 (a) takes the bound `Any` to the compiled path. The real defect there is the checker's: it does not infer a type parameter bounded by `Any` from its context. Row 421 clears 52 errors with two declarations, and batch 7b already plans it; its brief counts 2.
6. **Batch 6.5: nothing large belongs there.**
   - Two small overlaps already sit inside its rungs. Rung G's identity functions carry two numeral errors. Rung V's `RR32` natives carry three.
   - The numeral class shares its cause with the promotion rule. That supports Q1's option 1, moving the numeral switch to phase 3 with the rule, rather than a 6.5 rung.
7. **Measured and inferred.** Every count is measured from the captures beside this note, except where a sentence says "by reading" or "inferred". A cause marked "by reading" was read from the messages and the source, not traced in the checker.

## 1. How it was measured

- **Machine** (protocol, principle 2): `nproc` 4, `Intel(R) Xeon(R) Processor @ 2.10GHz`, `cpu MHz` 2100.000, OpenJDK 25.0.4, `FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`. Load at the runs' starts ranged from 0.7 (the controls) to 4.5, and reached 9 during the last runs. Two or three runs of this probe ran at once, and after 12:50 UTC also batch 6b's skeptic runs in `/home/user/fortress-overflow`. A full run took 785 to 1,129 s, VEC longer (§ 3.4); every run's times are in `distance-triage/runs.txt`. No timing here is a comparison.
- **Tree and driver.** The worktree `/home/user/fortress-triage`, branch `wip/distance-triage`, cut at `edc815f0c`, with `ProjectFortress/build` copied from the main tree (it differs from the main tree's build only in `scalac-compileAll.args`, which records paths). `run.sh`'s step `stage` is `switch-over-distance-flat/run-all.sh`'s step `stage`, with its targets read from a library copy, `libs/<variant>/`. The copy holds every `.fsi` and `.fss` of `Library/` and `ProjectFortress/LibraryBuiltin/` and so shadows the tree's through `Shell.sourcePath`, as `switch-over-distance/run-all.sh`'s step `flat` did. `variants.py` makes each copy, and each of its edits asserts how many places it changed.
- **Control.** The unchanged copy L0 gives 1,738 errors under walk's setting and 1,533 under the compile path's (`runs.txt`). The note's twelve-JVM runs gave 1,736 and 1,527, and its one-JVM runs 1,738 and 1,531. Error by error, with paths and cut messages normalised, 18 errors went and 20 appeared under walk's setting, and 19 and 25 under the compile path's. Every one is the known variation: which pair of `LEXICO`, `SQCAP` or `INVERSE` declarations is named, and which type a join infers for an array body.
- **The earlier worker's runs.** The worker stopped at about 12:05 left the two control runs running, unobserved, although the brief believed no JVM was left. They finished at 12:17, and their outputs are the controls above. Its `bound-any-shadow.py` is kept, inert, off every classpath but the unused setting `compile-any`.
- **Classification.** `fullerrs.py` lists every distinct error with its whole message; `errors.py`'s table cuts messages at 160 characters. `classify.py` assigns each error to a class by ordered rules on the message and, for four classes, on the site's line range; a filter error takes the class of the other error at its line. The unmatched remainder is the class OT, 116 / 136 (§ 2.2).
- **Comparing a variant with the control.** `compare.py --sites` matches errors by kind and location, the n-th error at a site with the n-th, not by message. A variant changes the candidate lists printed in many messages, so a message match would count an unchanged obligation as gone and new. For a patch that adds lines (A0), locations are carried back by a line map.
- **The numeral shadow** (`numeral-shadow.py`). It adds one case to `TypeAnalyzer.scala`, compiled with scalac against the build, 9 s, the same five class files as the build. Under `-Dprobe.numeralTyvar=true` it answers yes to "is `IntLiteral` below the type variable `X`?" when `X`'s bound names `Integral` or `AnyIntegral`. It is an instrument that measures the class's reach, not a proposed rule: a real rule would convert the numeral, not subtype it.

## 2. The classes

Counts are distinct errors of the control, walk's setting / the compile path's. "Fix" names the batch, rung or answer that fixes the class, or "none". Every list of errors with its class is in `classes-walk.txt` and `classes-compile.txt`.

### 2.1 The api layer and the checker's rules (678 / 803)

| code | class | walk / compile | examples | cause | fix |
|---|---|---|---|---|---|
| A1 | `fill`: function form against value form | 244 / 0 | `FortressLibrary.fsi:1360`, `:1379-1380` | an unbounded `E` can be an arrow; under `Object` it cannot (FACTS, the `fill` refusals) | batch 7, rung A |
| A2 | `fill`: the array diamond | 58 / 58 | `.fsi:1399`/`:1431`, `:1400`/`:1432` | inherited from two parents, nothing declared below both | batch 7, rung A |
| M1 | overloading: the Meet Rule | 100 / 100 | `.fsi:2072`/`:824` (`FORWARD_CMP`), `:2125`/`:860` | same static parameters, nothing on the meet | batch 8, after P2 |
| L1 | overloading: the static-parameter sentence's families | 85 / 78 | `.fsi:196`/`:2587` (array `MAX`), `RangeInternals` `CAP` | open traits, exclusion through a bound | batch 7b, rung L (answer 9) |
| H1 | exclusion: the comparisons, `Maybe`, `Condition` | 38 / 38 | `.fsi:143`, `:153`, `:879`, `:896` | two instantiations of one generic (route A) | batch 7, rung H |
| H2 | `comprises`: `AnyIntegral`'s clause | 2 / 2 | `.fsi:431`, `.fss:644` | `Integral[\I\]` extends a comprising trait | batch 7, rung H |
| O1 | same parameter type: `LEXICO`, `INVERSE`, `SQCAP` | 15 / 14 | `.fsi:127`/`:158`, `:898`/`:943` | the comparisons' and `Maybe`'s families, by reading | none named; rung H's families, by reading |
| R1 | return type: `StandardMinMax`'s `(T,T)` slip | 32 / 32 | `.fsi:209`/`:321`, `.fss:261`/`:280` | `MIN`/`MAX` declared `(T,T)`, bodies return `T` (row 421) | batch 7b, rung L; **measured**: clears 32 |
| R2 | return type: the comparisons' `CMP` | 19 / 19 | `.fsi:124`/`:135`, `:134`/`:135` | 17 pair `Comparison`'s `CMP(self, other:Unordered)` with every total order's; 2 are `LessThan`/`GreaterThan` declared `Comparison` | 2 in batch 8's one-liners; 17 none named, rung H's family by reading |
| R3 | return type: other slips | 40 / 34 | `.fsi:1551`/`:1552` (`array1`), `RangeInternals.fsi:257` (`every`) | `array1`-`3` 5 (rung A), `shift`/`atMost`/`every` 10 (batch 8), `seq` 4 (rung L), `SQCAP` 8, `split` 4, `distribute` 2 (row 433), 7 others | split as named |
| Q1 | the bound `Object` | 0 / 372 | `.fsi:714` (`Condition[\()\]`), `:743` (`Generator[\(E, G)\]`) | the compile path's own setting: a tuple 346, `Any` 26 | batch 7's Q1: (a) removes the setting (§ 3.3) |
| D2 | abstract method: `RangeInternals`' `CAP`, `IN`, `\|_\|` | 18 / 18 | `RangeInternals.fss:305`, `:563` | the objects implement the family at their own types, not the trait's instance; by reading | none; next to rung L's `CAP` |
| D1 | abstract method: a bodyless function under compiled desugaring | 0 / 12 | `FortressLibrary.fss:2306`, `:3189` | inferred in the flat note (`AbstractDesugarer.java:40-46`) | none |
| X1 | export: component against api | 12 / 11 | `FortressLibrary.fss:12`, `RangeInternals.fss:12` | declarations that differ between api and component | none; row 358's bounds clear 2 (**measured**) |
| Z1 | arithmetic in a size | 11 / 11 | `FortressLibrary.fss:2519`, `NativeArray.fsi:12` | `PrimitiveArray[\T,s0 s1\]`, refused by rung N | phase 5, the array design |
| F1 | fusion pairs' bound | 4 / 4 | `FortressLibrary.fss:3138`, `:3154` | row 433 | phase 3, later |

### 2.2 The component bodies' type errors (982 / 652), broken down

The control's 982 / 652 are the note's 981 / 645 within the variation (its one-JVM run under the compile path's setting gave 1,531). The well-formedness errors in the classes marked † (57 in I1, 21 in V1) have the same cause as the body errors beside them. They are counted here and not in § 2.1, so this table sums to 1,060 / 730.

| code | class | walk / compile | examples | cause | fix |
|---|---|---|---|---|---|
| N1 | natives: `builtinPrimitive`'s `T` not inferred | 340 / 0 | `FortressLibrary.fss:4290`, `FortressBuiltin.fss:411` | the checker does not solve a result-only type parameter from its context when the parameter's bound is `Any`, implicit or written; under `Object` it does (**measured**, § 3.1) | none |
| N2 | the same for `fail[\T\](s:String):T` | 24 / 0 | `FortressLibrary.fss:3862`, `RangeInternals.fss:152` | the same mechanism, by reading | none |
| I3 | integers: a numeral where a type parameter is expected | 149 / 149 | `RangeInternals.fss:381` (`ex > 0`), `:570` (`n : I := 1`), `:1423` (`lo+ex-1`) | the flat tower removed `Number`'s catch-alls, which took `(I, IntLiteral)`, and the checker converts no numeral to a type parameter | none (§ 3.2) |
| I1 † | integers: the bound `AnyIntegral` or none where `Integral[\I\]` is used | 81 / 81 | `FortressLibrary.fss:3888`, `RangeInternals.fss:1423` (`(I, I)`), `:681` | row 358: the component keeps `AnyIntegral` or no bound where the api says `Integral[\I\]`, and `AnyIntegral` declares no operator | none (row 358 is "the next library batch's") |
| I2 | integers: the dummy `0 asif ZZ32` of `#` and `:` | 18 / 18 | `FortressLibrary.fss:3910`, `:3923`, `:3959` | "we pass in bogus ZZ32's to ensure that the result type is at least ZZ32": on the flat tower the helpers infer `OR(ZZ32, I)` | none |
| I5 | integers: `Integral[\I\]` declares no `\|self\|` | 15 / 15 | `RangeInternals.fss:317`, `:380` | only the leaves declare it | none |
| I6 | integers: `[\ZZ32,ZZ32\]` written for `[\I,J\]` | 8 / 8 | `RangeInternals.fss:343`, `:626` | a library slip | none |
| I4 | integers: a fixed width where a type parameter is expected | 3 / 3 | `RangeInternals.fss:794` (`Just[\I\](self.size)`) | `size` is a `ZZ32` | none |
| V1 † | arrays: element bounded by `Number`, which declares no arithmetic | 44 / 41 | `FortressLibrary.fss:2295` (`e + v.get(i)`), `:2306` (`__DefaultVector[\T, …\]` unbounded), `:4574` | the flat `Number` is two marker traits and `=` | none; phase 5 (§ 3.4) |
| V2 | arrays: a sized array's body or factory | 42 / 41 | `FortressLibrary.fss:2185`, `:2295`, `:2024` (`NatParam`) | sizes lost in joins and in the factories' `NatParam` | none; phase 5 |
| S1 | self type: a generic trait's `self` is not its parameter | 28 / 28 | `FortressLibrary.fss:652` (`floor(self):I = self`), `:279`, `:332` | `self` has type `Integral[\I\]`, not `I`; the self-typed idiom (`comprises T`) overflows today's checker (FACTS, route C) | none |
| RG | ranges: a method's declared type narrower than what it builds | 29 / 29 | `RangeInternals.fss:180`, `:220`, `:1391` | `check()`, `recombine`, `combine2D`/`3D` answer supertypes | none |
| SF | `String`: an object's field read as an inherited method | 22 / 22 | `String.fss:80`, `:95`, `:156` | `left`/`right` in `CatString` resolve to `()->Maybe[\Char\]` | none |
| G1 | unbounded generics compared | 18 / 18 | `FortressLibrary.fss:4328`, `:4420`, `:1842` | `opr <[\A,B\]`, `CMP[\A,B,C\]` on tuples have no bound | none |
| R4 | `StandardMinMax`'s slip in bodies | 18 / 18 | `FortressLibrary.fss:260`, `:3233`, `String.fss:520`, `RangeInternals.fss:556` | row 421's `(T,T)` results used as one value | batch 7b, rung L; **measured**: clears 14 |
| CV | a call covered only by the union of its overloads | 10 / 10 | `String.fss:165`, `:513` | walk dispatches on the value; the checker wants one arm for `String` | none |
| MB | `Maybe`: `Just` and `Nothing` do not join | 7 / 7 | `FortressLibrary.fss:1311`, `:1327`, `:3006` | by reading, the same hierarchy rung H changes | none named |
| TS | ranges: a tuple shift adds a whole tuple | 9 / 9 | `RangeInternals.fss:663`, `:1355` | batch 6.5's "tuple shifts" item: no row, no probe | none |
| BR | big operators' bodies | 9 / 10 | `FortressLibrary.fss:3217`, `:3419` | not traced | none |
| GB | a function argument inferred at `BottomType` | 7 / 8 | `FortressLibrary.fss:3462`, `:3514` | the checker's inference through `COMPOSE` and `map`, by reading | none |
| NM | names the api does not declare | 54 / 70 | `String.fss:371` (`Range.lower`), `:367` (`nonEmpty`), `FortressLibrary.fss:4503` | component code reaches members the static type's api lacks | none |
| GF | a filter that failed for another reason | 9 / 9 | `FortressLibrary.fss:4447`, `String.fss:480` | cascade | with its cause |
| OT | the residue | 116 / 136 | `FortressLibrary.fss:3030` (row 422), `:913` (`big` of an `NN64`), `FortressBuiltin.fss:347` (rung V's), `List.fss:72` | one-off library slips and checker limits | none, one by one |

The families, summed: integers in generic code (I1-I6) 274 / 274; the natives (N1, N2) 364 / 0; the arrays (V1, V2, Z1) 97 / 93; `StandardMinMax` (R1, R4) 50 / 50; api and component gaps (NM, CV, X1, D2) 94 / 109.

### 2.3 RangeInternals' new body errors

`RangeInternals`' component has 259 body errors under walk's setting. 138 of them are I3, a numeral where a type parameter is expected, filters included. Then come RG 29, OT 21, I1 20, I5 15 and 36 in small classes. The note's new sites are these numerals. Carried back to 2026-09-26's list by the note's own line map (`new-sites.py`), 102 of today's errors sit at 61 `RangeInternals` body sites that list did not have, and 91 of the 102 are I3 (3 I1, 3 R4, 5 others). The note counted 114 sites with its own key. Which fix clears them:
- **Answer 8's promotion rule: no, as worded.** It chooses "the narrowest type both sides coerce into" for concrete types. For `ex > 0` with `ex: I`, both sides coerce only into `I`, and only if a coercion from a numeral into an arbitrary `I extends Integral[\I\]` is known. No declaration can state that today: a generic coercion is refused as a cyclic hierarchy (FACTS, the specification's refused examples). A rule extended to type parameters would clear them; that is the numeral rule below.
- **The numeral switch: no.** Its library half (A0) leaves all 138 and adds 16 numeral sites of its own (§ 3.2).
- **Row 388's fix: no.** Row 388 is a coercion into a declared non-generic parameter type of a generic function. These sites have a type parameter as the parameter type.
- **Something else: yes.**
  - The checker accepting a numeral at a type parameter bounded by `Integral` or `AnyIntegral` (the shadow) clears 126 of the 138 (**measured**). Of the 12 left, 10 are in `RightScalarRange` and `emptyScalarRange`, whose `I` is unbounded (row 358). `:795` passes `(0, self.size-1)`, a numeral beside a `ZZ32`. `:1129` calls `CompactFullRange3D` with four arguments where it takes six, a library slip.
  - The library's own device clears them site by site: `x.zero` or `x.one` for a value `x: I`, as `Integral`'s `DIVIDES` writes `self.zero` (`FortressLibrary.fss:674`). That is about 130 sites (inferred from the shadow's count).

## 3. The measurements

All runs are under walk's setting unless named; "±" counts are sites (`compare.py --sites`), against the control's 1,738.

| run | what changed | total | the classes it moved |
|---|---|---|---|
| L0 | nothing (control) | 1,738 | |
| BP | `builtinPrimitive[\T extends Object\]` in api and component (2 lines) | **1,400** | N1 340 → 0; BR +2 |
| BPANY | `builtinPrimitive[\T extends Any\]` | 1,738 | none: N1 stays 340 |
| R421 | row 421: `StandardMinMax`'s `MIN`, `MAX` declared `T` (4 lines) | **1,686** | R1 32 → 0, R4 18 → 4, OT −4, V2 −3; I2 +2, BR +1 |
| BOUNDS | row 358: the 138 bounds `X extends AnyIntegral` of `RangeInternals` and of the range operators, api and component, become `Integral[\X\]`; two unbounded declarations take it | 1,673 | I1 81 → 4; X1 −2; I3 +12 unmasked |
| BOUNDS+DEVICE | and the 18 dummy `0 asif ZZ32` arguments replaced by the operators' own first arguments | **1,653** | I1 → 4, I2 18 → 0; I3 +12 |
| L0, numeral shadow | the checker accepts a numeral at an integer type parameter | 1,627 | I3 149 → 22; I1 +17 unmasked |
| BOUNDS+DEVICE, numeral shadow | the three parts of the integer family together | **1,506** | I1 → 7, I2 → 0, I3 → 12, R4 −3, V2 −2 |
| A0 | the numeral switch's library half (`numeral-lib-A0.patch`) | 1,773 | N1 +24 (the enabled `IntLiteral` natives), I3 +16 sites, V2 −4, G1 −4 |
| VEC | the array family bounded `{ Number, MultiplicativeRing[\T\], StandardMinMax[\T\] }` | not finished | stopped by hand after 47 minutes (§ 3.4) |
| all, walk | BP + BOUNDS + DEVICE + R421, numeral shadow | **1,122** | N1 → 0, I1 → 7, I2 → 2, I3 → 11, R1 → 0, R4 → 4; the sum of the separate runs' changes is −622, together −616 |
| all, compile | BOUNDS + DEVICE + R421, numeral shadow, the compile path's setting | **1,268** (from 1,533) | the same integer and row-421 changes as under walk's setting; Q1 +8 (16 gone, 24 new) |

Every run's changes, site by site, are in `compare-<run>.txt`; every run's count by class is in `variants.txt`.

### 3.1 The natives' `T`

- `builtinPrimitive[\T\](javaClass:String):T` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:30`) is the body of 340 declarations whose return type is written, like `opr +(self,b:ZZ32):ZZ32 = builtinPrimitive("…Int$Add")`.
- Under the compile path's setting `T` gets `extends Object` and the checker solves it from the declared return type. Under walk's setting, and under the setting `any` that batch 7's Q1 (a) would take to the compiled path, `T` is bounded by `Any`. The checker then reports "Could not infer static argument T without context" at every one of them.
- Writing the bound `Object` clears all 340 and adds nothing (BP). Writing `Any` changes nothing (BPANY). So the defect is the checker's: it does not solve a type parameter bounded by `Any` from the context alone. By reading, the solver in `STypesUtil.inferStaticParamsHelper` (`scala_src/useful/STypesUtil.scala:965-1035`); not traced.
- N2's 24 are calls of `fail[\T\](s:String):T` (`FortressLibrary.fsi:37`), the same shape.
- Two ways:
  - The library's one line, which excludes a tuple or an arrow as a native's result: no native has one (BP added no error).
  - The checker's fix, which also serves every program's `f[\T\](): T` under Q1 (a).
- At the switch-over the compiled path must accept `builtinPrimitive` bodies or replace them (phase 4, row 309). This class sizes Q1 (a)'s cost: under (a) it appears where the 372 `Object` errors go.

### 3.2 Integers in generic code

- Row 358 (**measured**) is `RangeInternals`' component keeping the old bounds where rung L gave the api `Integral[\I\]`, together with the range operators that feed it. Bounding the static parameters by `Integral` (138 bounds in four files, 42 + 24 in `RangeInternals`, 36 + 36 in `FortressLibrary`, and two unbounded declarations) clears 77 of I1's 81. Two of X1's export errors go with them (BOUNDS). It unmasks 12 numeral errors behind them: the checker reports a failed expression at its outermost failing operator, so `lo+ex-1` fails at `+` first, then at `-`.
- The dummy device: after BOUNDS the helpers take `Integral[\I\]`, and the dummy `ZZ32` makes them infer `OR(ZZ32, I)`. Passing the operator's own arguments clears all 18 (DEVICE). The device was the library's hand-written promotion to "at least ZZ32" on the nested tower. On the flat tower answer 8's promotion rule does that job, at the call sites of `#` and `:` in programs.
- Numerals (I3): with the other two, the numeral shadow takes the family from 274 to 44: 1,738 → 1,506. On L0 alone it clears 127 of I3's 149 and unmasks 17 bound errors (1,627). What remains of the family:
  - 12 I3: `additiveIdentity`'s and `multiplicativeIdentity`'s `else => 0` (`FortressLibrary.fss:3108`, `:3121`), which rung G of batch 6.5 respells; `matrix(v)`'s `else 0` (`:2718`, row 437); a range over numerals typed `LeftRange[\IntLiteral\]` (`:1065`, `:4071`) and five like it in `List.fss`, `String.fss` and `RangeInternals.fss`; row 421's `MAX` pair beside a numeral (`String.fss:77`); `RR32`'s `^` (`FortressBuiltin.fss:327`), rung V's;
  - 7 I1: four at the still-unbounded `opr (x:I):[\I\]`, `openRange[\I\]()`, `opr (l:I)::[\I\]` and `opr ::[\I\](l:I,s:I)` (`FortressLibrary.fss:3921`, `:3946`, `:3957`, `:3966`), which call the now-bounded operators; three in the `extent` helpers' bodies (`RangeInternals.fss:1449-1470`), unmasked;
  - I5 14, I6 8 and I4 3, which none of the three parts touches.
- **The numeral switch, measured by its library half (A0):** +35. 24 of them are `FortressBuiltin`'s `IntLiteral` arithmetic block enabled with `builtinPrimitive` bodies (class N1). 16 are new numeral sites (`compare-A0-walk.txt`):
  - 15 are ranges over numerals in the library's own bodies: `0#n` eleven times in `FortressLibrary.fss` (`:1308`, `:1819`, `:2173`, …), `List.fss:146` and `:302`, `String.fss:272`, and `2:46` at `String.fss:25`. Each is "not applicable to an argument of type (IntLiteral, ZZ32)" or "(IntLiteral, IntLiteral)", because an `IntLiteral` no longer meets `AnyIntegral`;
  - 1 is a numeral at the `ZZ32` parameter of a generic constructor, `ArrayList(…,0,noShot,0,…)` (`List.fss:488`), which is row 388's shape.
  Everything else a numeral does in the library converts: non-generic parameters take the declared coercions. So, inferred:
  - the promotion rule's numeral case would clear the 15, and row 388's fix the one;
  - without the switch, the rule finds no call to clear in the library's count;
  - for `(IntLiteral, IntLiteral)` the "narrowest type both coerce into" is not unique under A0, since `ZZ32` and `NN32` both qualify. The rule needs a default; the compiler library's ranges choose `ZZ32`.

### 3.3 The setting, batch 7's Q1

- Under the compile path's setting, the 372 `Object` errors are the setting's (tuples 346, `Any` 26). Under Q1 (a) they go, and N1, N2 and A1 come instead: 340 + 24 + 244. The note's setting `any` measured this: 1,747.
- Rung A removes A1. A one-line bound or a checker fix removes N1 (§ 3.1).
- So under (a) the distance is walk's column, less these fixes. Under (b) it is the compile column, with 372 respellings of tuple-instantiated generics.

### 3.4 The array family's bound

- V1's 44 / 41 are generic code over `T extends Number`: `Vector`, `Matrix`, their factories and operators, and the scalar-extension block. The unbounded `__DefaultVector[\T, …\]` and `__DefaultMatrix` add 21 well-formedness errors, since `Vector` requires `Number`. The flat `Number` declares only `asFloat` and `=`, so `e + v.get(i)` finds no operator.
- The respelling tried, VEC, bounds the family by the algebra its bodies use: `T extends { Number, MultiplicativeRing[\T\], StandardMinMax[\T\] }` at 76 places, the two default objects included. It did not finish.
  - It checked `FortressLibrary`'s component through two stages: body errors 456 → 409, the second well-formedness stage 70 → 136, the first 34 → 56. The narrower bound moves the obligation to every generic caller that still says `Number`.
  - It then spent over 15 minutes in the component's overloading check without writing a line, inside the exclusion test of an intersection type (`TypeAnalyzer.normConjunct` → `dExc` → `pExcInner` → `comprisesClause`; `vec-thread-dump.txt`). The run was stopped 47 minutes in, at load 7 to 9.
- So V1 stays "by reading": its fix is the array design's element bound (phase 5, decision A). An intersection of the algebra traits is both costly to the checker and a respelling of every generic caller, which is a design question, not a triage measurement.

## 4. What each batch fixes, and what none does

- **Planned, batch 7 (rungs H and A):** H1, H2 and A1, A2: 342 / 98. By reading, rung H's families also hold O1, R2's 17 and MB: 39 / 38.
- **Planned, batch 7b (rung L, answer 9):** L1, R1, R4 and R3's `seq`: 139 / 131. Row 421 alone, measured: 52 of walk's errors from four lines.
- **Planned, batch 8:** M1, the promotion rule, row 388's fix, and the one-line slips (R3's `shift`, `atMost`, `every`, R2's two): 100 + 12 / 100 + 12.
- **A setting, not a fix: batch 7's Q1.** Q1 (0 / 372) against N1, N2 and A1 under (a).
- **Phase 4 (the natives):** N1, N2 by construction, if the compiled path replaces `builtinPrimitive` rather than checking it.
- **Phase 5 (the array design):** V1, V2, Z1: 97 / 93. The naive algebra bound for V1 did not finish (§ 3.4).
- **Planned nowhere:** the integer family (274 / 274; row 358 says "the next library batch's"); S1 28; RG 29; SF 22; G1 18; TS 9; CV 10; NM 54 / 70; X1 12 / 11; D1 0 / 12; D2 18; BR 9; GB 7; and the residue OT 116 / 136.

## 5. What this does not settle

- The numeral shadow says yes by subtyping, so its count is the class's reach, not the cost or the soundness of a rule. A rule would have to convert: the compiled path must emit the numeral at `I`'s width. The specification's numeral types are unfinished (`literals.tex:83-95`), and the `.zero`/`.one` respelling is the library's way that needs no decision.
- Causes marked "by reading" (O1, R2's 17, MB, D2, S1's overflow, GB, BR) were not traced in the checker.
- No shadow was run under walk itself: nothing here says what the interpreter does with a respelled library. The respellings keep the values: `x.one` is `x`'s type's own 1, and bounds are narrowed only where the bodies already need them. They were not run through the interpreter tests.
- The checker's run-to-run variation, 2 to 4 errors, is inside every total. Every class count, and every change of a class count that a variant made, is larger than it, except the changes of 1 or 2 in O1, BR and MB.

## Files

Under `distance-triage/`:

| file | what |
|---|---|
| `run.sh` | the runs: `build` (drivers, shadows), `lib <variant>` (a library copy), `stage <variant> <setting>` (DistanceMulti over the copy); `TAG`, `EXTRA_CP`, `EXTRA_FLAGS` add the numeral shadow |
| `variants.py` | the library copies: BP, BPANY, R421, BOUNDS, DEVICE, VEC (stopped), A0 (A1 and B written, not run) |
| `numeral-shadow.py`, `bound-any-shadow.py` | the checker shadow; the earlier worker's pre-desugaring shadow, not used |
| `fullerrs.py`, `classify.py`, `compare.py`, `new-sites.py`, `tables.sh` | the error lists with whole messages; the classes; a variant against the control; the sites new since 2026-09-26; the captures from a work directory |
| `runs.txt` | every run's machine and load lines, seconds per component, crashes and total |
| `classes.txt`, `classes-walk.txt`, `classes-compile.txt` | the control by class, and every error with its class |
| `variants.txt`, `compare-*.txt` | every walk run by class; each variant's changes by class and site |
| `new-sites.txt` | the sites new since 2026-09-26, by class |
| `vec-thread-dump.txt` | the stopped VEC run: its main thread and its stage counts against the control's |
