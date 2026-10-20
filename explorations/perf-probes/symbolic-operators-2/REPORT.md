<!-- Probe of 2026-10-20 for P-155, the compiled checker's overloading check of symbolic operators, on main at d97001d19: the check turned on finds 186 errors (185 and three crashes on `||` in List as the stage runs), 54 cleared by SORT.md's known fixes as they stand today and 132 by the two designs, the subscripts' index bound (the team's wish, with a tuple rule in both paths) and the vectors' leaving AdditiveGroup, which together with the fixes bring the full check to the gate's own 5. -->

The probe worker returned this text when the harness refused it a report file. The generators and patches beside it are in `0a6ba39e6`.

## Where and how

- **Branch and worktrees.** Branch `wip/probe-symops`, worktree `/home/user/fortress-probe-symops`, cut from main at `d97001d19` and seeded from `/home/user/fortress-base20` (`97ccd5f1f`). The base no longer matched, because batch 20 changed walk's Java, so the tree was built once (`ant compileAll`, 71 s). A second worktree, `/home/user/fortress-probe-symops-b` (detached at `d97001d19`, seeded and built the same way), ran walk's suites and the demos.
- **The commit measured.** Every number is on `d97001d19`. Its code (`ProjectFortress`, `Library`, `build.xml`) is that of `510fac459`, where batch 20's gate distance is 5 (`compile-ladder/climb-batch-20/gate/distance.txt`), and that of main's head.
- **The instrument.** The gate's `coordinator/tools/distance/run.sh`, unchanged, run through `run-shadow.sh`. That script puts a scalac-compiled shadow of `OverloadingChecker.scala` first on the stage's class path; `checker-shadow.py` makes the shadow from the tracked source at each run.
- **Library variants.** `known-fixes.py` and `designs.py` applied each variant to the worktree; it was then measured and reset with `git checkout`.
- **The machine.** 4 CPUs (Xeon, 2.1 GHz), JDK 25.0.4.1, `FORTRESS_THREADS=1`, every run under `nice -n 19`. Each distance run took 224 to 375 s, beside another probe's suites (load up to 20). No timing here is one to compare.
- **What is committed.** Generators: `checker-shadow.py`, `run-shadow.sh`, `known-fixes.py`, `designs.py`, `walk-shadow.py`. Patches: `checker-full-check.patch`, `checker-tupleindex.patch`, `walk-tupleindex.patch`, `known-fixes.patch`, `subscripts-index-bound.patch`, `vector-not-additive-group.patch`, `vector-scalar-ops-dropped.patch`. Each patch has a header line and applies to `d97001d19`.

## 0. In short

| | Errors | Run |
|---|---|---|
| Full check on main | 186 new beside the gate's 5. As the stage runs: 185 and 3 crash rows (`#total 190`). Crashes caught per name: 186 (`#total 191`) | full-main, full-catch |
| SORT.md's known fixes, today's form | clear 54, bring 0 (`#total 137`) | known7 |
| Subscripts: index bound with the tuple rule | clears 124, brings 0 (`#total 67`) | subS1m |
| Subscripts: index bound without it | clears 124, brings 73 bound errors at tuple indices (`#total 140`) | subS1b |
| Vectors A2: Vector and Matrix leave AdditiveGroup | clears 8, brings 0 (`#total 183`) | vecA2 |
| Vectors A3: scalar `+` and `-` dropped | clears 8, brings 0 in the checker (`#total 183`) | vecA3 |
| Fixes + bound with tuple rule + A2 | `#total 5`: the gate's 5 sites, lines moved, and the 3 crash rows; caught per name, `#crash none` | all, allc |

## 1. The full check today (step 1)

### 1.1 The shadow

- **Where the skip is.** `isDeclaredName` (`OverloadingChecker.scala:742-746`) admits an `SOp` only if `NU.validOp` holds. Three loops read it: the top-level set (`:255`), the provided methods (`:402`) and the overridden returns (`:411`).
- **The shadow.** The three loops call `isCheckedName` instead, which admits every `SOp`. `isDeclaredName` itself, which the export check reads (`ExportChecker.scala:275`, row 782), is unchanged. This is the earlier probes' shadow, now made by exact text edits.
- **The `catch` word.** It wraps the five calls that check one name (`:287`, `:320`, `:406`, `:408`, `:412`). A `CompilerBug` there prints `@@PROBE CRASH` with the unit and the name, and the check goes on with the next name.

### 1.2 The families

- **full-main:** `#total 190`. That is `overloading 181`, `return-type 1`, `other/overloading 3`, the base's `typecheck 4` and `export 1`, and 3 `#crash` rows.
- **full-catch:** `#total 191`. The one extra error is EmptyString's `||` in String's component.

Site by site against SORT.md's list (`/home/user/fortress-probe-opsort/tmp/new205.tsv`). Numbers and type-variable suffixes are masked, and "trait X" is read the same as "object X", since `091ec54df` names objects as objects.

| Family | b16 | now | What moved, and why |
|---|---|---|---|
| Subscripts `_[_]` and `_[_]:=` over generic Indexed | 124 | 124 | nothing; every site is in a generic type |
| Maybe's subscript | 1 | 1 | |
| String's four | 40 | 40 | same pairs; `(self, b:Any)` now carries `cast[\Object\]` (`fss:4412`, batch 19 rung S, `4190069c4`) |
| EmptyString's `\|\|` | 1 | 1 | hidden by the String-component crash as the stage runs |
| FlatString's pair (row 726) | 2 | 0 | rung S dropped `opr \|\|(a:FlatString, self)` (F-259) |
| `=` | 4 | 4 | |
| `\|_\|` | 3 | 4 | +1, FlatString: its api now extends DelegatedIndexed (`FlatString.fsi:16`), the same pair as SubString's (`fsi:1366` beside `:2452`) |
| Scalar `+` and `-` | 6 | 8 | +2: the component's bodiless `opr +(self, other:T)` (`fss:361`) is now in the top-level set (batch 17 rung C, `091ec54df`) |
| Fancy rule | 3 | 3 | which Vector or Matrix pair is named varies from run to run |
| `^` | 21 | 1 | −20: P-153 (batch 20 rung I, `5ad4a9957`) |
| **Total** | **205** | **186** | |

### 1.3 The crash

- **The rows.** `#crash stage api List overloading CompilerBug List.fsi:56:27: E is not in the kind env`, and the same for component List (`List.fss:106:13`) and component String.
- **What it is.** `List.fsi:56` is AnyList's `comprises { List[\E\] } where [\E\]` (batch 17 rung A, `24db899fa`). AnyList's one functional method is `opr ||` (`:57`). With `catch`, every crash is on the name `||`, in the top-level set.
- **The stack.** `TypeAnalyzer.pExcInner` (`:543`), then `pEqv`, `pSub` and `staticParam` (`:1039`).
- **It needs no operator.** On the plain checker, `bin/fortress typecheck` of the program below stops with `ComprisesWhereFn.fss:6:27: E is not in the kind env`. With a dotted `cat(f: AnyC)` it is accepted. Walk loads and runs it.

```
trait AnyC comprises { C[\E\] } where [\E extends Object\]
  cat(self, f: AnyC): AnyC
end
trait C[\E\] extends AnyC
  cat(self, f: AnyC): AnyC = self
end
```

- **Under the fixes.** The crash stays under every variant. With everything applied, it hides only those three units' `||` checks.

## 2. The known fixes (step 2)

| Fix | then, now | State |
|---|---|---|
| FlatString's api pair | 2, 0 | gone (`4190069c4`) |
| EmptyString's meet `opr \|\|(self, _:EmptyString): String = self` after `String.fss:317`; also in String's api when str4 is applied | 1, 1 | as written |
| String's four (row 585): three top-level operators per family, and String's api states Concatenable's and EmptyString's own `\|\|` | 40, 40 | changed: the bodies over `Any` are today's conversion, way JC; SORT's patch fails at `fss:4394` |
| `=`: Integral's `opr =(self,b:I)` in api and component; ZZ's api `opr =(self, b:ZZ)` | 4, 4 | as written |
| `\|_\|`: Maybe's meet, SubString's api `\|self\|`, Float's `\|self\| : RR64` | 3, 4 | changed: also needs FlatString's api `opr \|self\| : ZZ32` |
| Maybe's subscript meet | 1, 1 | as written |
| The api's six top-level Vector and Matrix `+`/`-` | 3, 3 | changed text: Vector's lost an unused `nat m` (`e487cec2d`); now at `fsi:1654-1661`, `:1771-1778` |
| `^` | 21, 1 | P-153 built the integer part; left: Float's meet `opr ^(self, b:RR64):RR64` after `FortressBuiltin.fss:156` |

- **The seven together (known7):** 186 → 132, exactly the 54 gone, none new. `known-fixes.patch` touches 6 files, +60/−47.
- **The header variant (`abshead`, known7h).** In place of the SubString and FlatString lines, one line: String's api header extends `DelegatedIndexed[\Char,ZZ32\]`, as its component does (`fsi:2438` against `fss:4326`). It gives the same 132 sites, and String's export entry loses "different extends clauses".
- **Walk, for both variants:**
  - `ant testSystem`: 668 tests, 1 failure, `XXXFunctionalMethodMeetOperator`: "Refused at load, but did not satisfy load_exception_contains" (walk refuses it for the new top-level `||`, as SORT found).
  - `testSpecData`: 130, 0 failures.
  - microGPT's quick pair: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0`, both programs.

## 3. The designs (step 3)

The probes ran under `bin/fortress typecheck` on the plain checker, with a word operator or a dotted method in place of the symbolic one, since the plain checker skips symbolic names. The probe sources are in worktree b's `tmp/probe/`.

### 3.1 Subscripts over an unbounded index type (row 783)

**The team's text** (`Specification/appendices/future.tex:186-207`):

> The above overloaded declarations are not really a valid overloading. We want to say that the type variable I extends a type, say, Index which either excludes Range[I] or is a supertype of Range[I]. However, we cannot say that because when we invoke that subscripting method, we write a[1, 2, 3] where the arguments are passed as a tuple, (1, 2, 3). If we want to use Index, we need a magic to convert that tuple argument expression to something of type Index.

- **Where the 124 are.** All are in generic types. The fixed instances already pass: ZZ32-indexed ones because Range excludes Number (`fsi:2183`), tuple-indexed ones because a tuple excludes every trait type (`TypeAnalyzer.scala:560`).
- **The text's "supertype" branch.** It would make the range overload more specific, and its result `Indexed[\E,I\]` is no `E`, so the return-type rule refuses it.

**Probes** (dotted `pick`, over a trait `Rg[\I\]` that excludes `Index`):

| Program | Shape | Result |
|---|---|---|
| SubBound0 | `I` unbounded: `pick(i:I)` beside `pick(r:Rg[\I\])` | refused |
| SubBound1 | the same with `I extends Index` | accepted |
| SubBound5 | `I` unbounded: `pick(r:Rg[\I\])` beside `pick(t:Triv)`, `object Triv extends Rg[\Object\]` | refused |
| SubBound4 | all three with `I extends Index` | accepted |
| SubBound3 | `extends Ix[\ZZ32,(Ixi,Ixi)\]` | "(Ixi, Ixi) does not satisfy the corresponding bound Index"; accepted with the tuple rule |
| SubBound2, under walk | the same | loads and runs: walk does not check a trait instance's bound |

**S1** (`designs.py subS1`, `subscripts-index-bound.patch`, 40 edits in `FortressLibrary.fsi` and `.fss`):
- `trait Index end`.
- ZZ32 extends `Index`; Range's `excludes { Number, String, Index }`.
- `I extends Index` on: Indexed, DelegatedIndexed, MutableIndexed, ReadableArray, ImmutableArray, Array, both Standard…ArrayType traits, FullRange, CompactFullRange, StridedFullRange, `opr :` over a FullRange, SimpleMappedSeqIndexed, the eight scalar operators over `Array[\T,I\]`, and the component's SimpleMappedIndexed, SimpleIndexValuePairs, ReversedIndexed and SimpleReversedIndexed.
- BoundedRange's narrowing `atMost(n:I): FullRange[\I\]` goes (`fsi:2251`, `fss:4099`). BoundedRange cannot take the bound: Range's `truncL` and `truncR` return it (`fsi:2194-2195`), and Range must stay unbounded for `TrivialOpenRange`, which is a range of `Any` (`fsi:2226`). Without this edit there are 2 more bound errors.

**The tuple rule (the team's "magic", read as subtyping):**
- Checker (`checker-tupleindex.patch`): in `TypeAnalyzer.pSubInner`, a tuple of Index types is an `Index`. Subtyping only; the exclusion side (`:560`) still says a tuple excludes `Index`.
- Walk (`walk-tupleindex.patch`): `FTypeTuple`'s `subtypeOf`, its `meet` with `Index`, and `excludesOther`.

| Run | `#total` | Against full-catch's 186, site by site |
|---|---|---|
| subS1b: no tuple rule | 140 | 124 gone; 73 new bound errors, all at `(ZZ32, ZZ32[, ZZ32])`: api FortressLibrary 18, api RangeInternals 14, component FortressLibrary 13, component RangeInternals 28 |
| subS1m: with the checker's rule | 67 | 124 gone, 0 new; the 8 scalar errors only show the bound in their text; the base 5 unchanged |

| Walk | testSystem (668) | SpecData (130) | microGPT quick |
|---|---|---|---|
| S1 without walk's rule | 2 failures, `ArrayScalarExtension` and `ArrayOperatorsBesideLibrary`: "Failed to find any matching overload, args = (__DefaultMatrix[\RR64,2,2\],1.0)" | 0 | both stop, rc=1, at `MicroGptFlat.fss:60` `mr = 0.0 MAX m0` |
| S1 with walk's rule | **0 failures** | 0 | **7 of 7, rc=0, both** |

- **Why walk refuses without its rule.** Walk does check the bound at a generic call: it bounds the parameter by meeting its interval with the declared bound (`EvaluatorBase`, `BoundingIntervals`), and `FTypeTuple.meet` has no case for a trait.
- **Who wrote the two tests.** Both are the revival's (`02d09a39f`, 2026-09-19).
- **Team demos.** The 30 that use arrays, ranges or vectors, under walk with a 120 s cut, keep all 30 exit codes. Their outputs differ only in timings (the ZZ64 nanoTime lines, row 791), random draws (`DemoGenerator22D`, `conjGrad`, `posFeedback`) and `Generator2Demo`'s cut-off point.
- **MicroGPT's lines:** unchanged.
- **Costs.**
  - The library: 40 edits, plus the bound on every future index-typed generic.
  - The language: one rule in the specification's types chapter, Appendix I, the checker (subtyping and exclusion) and walk.
  - Programs: one with its own index type must declare that type an `Index`. No program in the suites does.

**The other ways (by reading and probes, not measured on the library):**

| Way | Clears | Costs |
|---|---|---|
| S2: the checker checks only the types that fix `I` | 124 | departs from the text; a user's `Indexed[\E,Any\]` is refused at its declaration |
| S3: the checker fixes the receiver's `I` | 40 (range beside the trivial range; SubBound5) | a checker change; 84 stay |
| S4: another bracket pair for slices, or a method (`subscripting.tex:20-24`) | 124 | every program that slices changes; microGPT slices strings (`run-c4/src/FlatData.fss:34,54`, `apl/mg/FlatData2.fss:37,57`) |
| S5: `where { I excludes Range[\I\] }` (`future.tex:212`) | 124 | new language; P-151 does not build it |
| W3: range subscripts only at fixed-index types, as Array1-3, String, Just, Nothing and DefaultZip already have | 124 | the generic mapped, reversed and index-value generators lose slicing; generic bodies need fixed-index copies |

### 3.2 A vector plus a number beside a vector plus a vector

- **The pairs.** AdditiveGroup's `+` and `-` (`fsi:267-268`, `fss:361-362`) beside the scalar extension (`fsi:2702-2708`, `fss:4906-4912`). The scalar is on the right in 2 and on the left in 2, in the api and in the component: 8 errors.
- **History.** Vector and Matrix were AdditiveGroups in the team's library (`a874948ac:FortressLibrary.fsi:1461`, `:1579`). The team's scalar block was `opr +(x: Array[\ZZ32,ZZ32\], y: ZZ32)` (`:2537`); `02d09a39f` generalised it.

**Probes** (word operator `PLUS` over `AddG[\T extends AddG[\T\]\]`, `Numb`, `HasRk excludes {Numb}`, `object Rr extends {Numb, AddG[\Rr\]}`, `trait Arry[\E\] extends HasRk`, `object Vv extends {Arry[\Rr\], AddG[\Vv\]}`):

| Program | Shape | Result | Meaning |
|---|---|---|---|
| VecPairs | `PLUS[\T extends {Numb,AddG[\T\]}\](x:Arry[\T\], y:T)` | refused | |
| VecPairsC | the same at `Rr` | refused | valid only by the self-type conformance (`traits.tex:286-302`, P-146); the overload check reads the plain trait type (P-146) |
| VecPairsLeft | `(y:T, x:Arry[\T\])` | refused | |
| VecPairsLeftC | the same at `Rr` | accepted | the generic form needs the exclusion check to read `T extends Numb`: row 786, "its emptyED reads no bounds" |
| VecPairsA2 | `Vv` no AddG, `HasRk excludes {Numb, AnyAddG}` | accepted | |

| Way | Clears | Checker | Library | Walk and microGPT |
|---|---|---|---|---|
| A1: the checker reads it right | 8 by the probes (4 right by (i), 4 left by (ii)) | (i) read `C[\X\]` as `C[\X\] & X` in overload checks, widening P-146 against the POPL 2019 assumption it cites; (ii) row 786's bound reading. A one-line try at (ii) (`emptybounds`) cleared neither VecPairsLeft nor row 786's tint pair | none | unchanged |
| A2 (`vecA2`): Vector, Matrix leave AdditiveGroup; HasRank excludes AnyAdditiveGroup, as Array3 does (`fsi:1816-1822`) | 8, 0 new (`#total 183`) | none | 6 lines in 2 files; gives up `SUM` and `zero` over vectors and matrices, and departs from the team's library | testSystem 668/0, SpecData 130/0, microGPT 7 of 7 twice; 30 demos keep their exit codes (BiCGSTAB, cut at 120 s under load, re-run with a 500 s cut: same `BiCGSTAB.fss:177` failure as main) |
| A3 (`vecA3`): drop the 4 scalar `+`/`-`; MIN and MAX stay | 8, 0 new (`#total 183`) | none | 8 lines go | 4 failures, all revival tests: `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary` (`02d09a39f`), `InferCoercionRungK` (`041682188`), `ArrayElementAlgebra` (`7207e2719`), "Failed to find any matching overload" on vector or matrix with a number; SpecData 130/0; microGPT stops in both at `sm`'s `z - (BIG MAX z)` (`MicroGptFlat.fss:28`, `MicroGptApl.fss:42`), so its lines change; demos keep their exit codes |
| A4: scalar ops as functional methods of the array traits | — | — | not written: Array's `E` is unbounded, so `e + y` cannot check; a `where` on the trait's parameter is not a form P-151 builds | — |
| A5: declare the meets | — | — | not writable: the meets' domains are intersections | — |

### 3.3 Everything together

- **all:** the seven fixes, S1 with the checker's tuple rule, and A2 give `#total 5`. These are the gate's 5 sites (`compile-ladder/gate/distance-sites.tsv`) with line numbers moved, plus the 3 crash rows.
- **allc** (crashes caught): `#total 5`, `#crash none`. The only hidden checks are `||` in List's api and component and String's component.

## 4. `^` (step 4)

One error remains:

```
Invalid overloading of ^ in object Float: ((RR64 & {Float, FloatLiteral}), RR64)->RR64 @ FortressLibrary.fsi:365:5-28
 and (Float, Number)->RR64 @ FortressBuiltin.fss:158:5-159:50
```

The meet `(Float, RR64)` has no declaration, because Float's `^(self, b:Float)` does not cover FloatLiteral. Float's meet `opr ^(self, b:RR64):RR64 = builtinPrimitive("...Float$Pow")` (2 lines; SORT's p445 line) clears it, as measured in known7. The other 20 (15 overloading, 5 return-type) went with `5ad4a9957`.

## 5. Decisions, defects, hand-overs, questions

**Decisions** (no POSITIONS entry covers them):
1. **The shadow** admits symbolic names in the three loops only; the export check is left alone, so row 782 stays latent.
2. **Two ways of running the stage.** It was measured as the gate runs it and with crashes caught per name.
3. **S1 drops BoundedRange's `atMost` narrowing** instead of bounding BoundedRange.
4. **The team's "magic" is read as subtyping in both paths,** not a coercion to an index object, which would change every index value and every `for (i,j) <- a.indices`. Walk also needed meet and exclusion; the checker needed subtyping only.
5. **String's four use today's bodies** (JC).
6. **Both `|_|` variants were measured.**
7. **The suites ran as `ant testSystem` and `ant testSpecData`** in worktree b, with microGPT by `mg-run.sh`. The baselines are batch 20's gate on the same code: 668/0, 130/0, microGPT 7 of 7 twice.
8. **The demos are the 30 team demos that mention arrays, ranges or vectors,** each under walk with a 120 s cut, on main and on each design.

**Defect, a new row (section 12):**

`| ? | the compiled checker crashes on a functional method of a trait whose comprises clause lists a type at a type where-clause variable, overridden in that type: AnyC comprises { C[\E\] } where [\E extends Object\] with cat(self, f: AnyC) in AnyC and C stops, 'E is not in the kind env' | NEGATIVE-VERIFIED | implementation gap (checker) | basic/trait-parameters.tex, "Where Clauses" | none | the symbolic-operators probe | siblings: 775, 584. TypeAnalyzer.pExcInner (scala_src/types/TypeAnalyzer.scala:543 at d97001d19) through pEqv, pSub and staticParam (:1039), from the top-level set's overloading check; a dotted method is accepted; walk loads and runs it. In the library: AnyList's opr ||(self, f:AnyList) under comprises { List[\E\] } where [\E\] (List.fsi:55-57, 24db899fa), hidden by row 584's skip; the full check stops on || in List's api and component and String's component. Probe: perf-probes/symbolic-operators-2/REPORT.md section 1.3. |`

**Notes for rows:**
- **584:** 186 on `d97001d19`, 185 and 3 crash rows as the stage runs. The known fixes clear 54; S1 with the tuple rule clears 124; A2 clears 8.
- **783:** the Index bound clears all 124 once a tuple of indices is an Index in the checker and walk. Without that rule it brings 73 bound errors and walk stops microGPT.
- **786:** the library's four scalar-on-the-left pairs have its shape (VecPairsLeft against VecPairsLeftC).
- **784:** `|_|` now also involves FlatString (`4190069c4`). String's api header clears SubString and FlatString together.

**For FACTS:**
- **The count.**
  - The fact: the full check adds 186 errors on `d97001d19`: subscripts 125, String's four 40, scalar `+`/`-` 8, `|_|` 4, `=` 4, fancy rule 3, EmptyString 1, `^` 1; 185 and 3 crash rows as the stage runs.
  - What it means: P-155's batch starts from 186; 54 have library fixes, and 132 wait on the subscripts' design (124) and the vectors' (8).
  - The command: `run-shadow.sh … catch` gives `#total 191` (`#total 190` without `catch`).
  - The detail: section 1.2.
- **The index bound.**
  - The fact: bounding every index parameter by an `Index` that the ranges exclude clears the 124 subscript errors and brings none, if a tuple of Index types is an Index. Without that rule it brings 73 bound errors, and walk stops every scalar operation on a matrix.
  - What it means: the team's wish is buildable at the price of one subtyping rule in both paths.
  - The commands: `designs.py subS1` with `run-shadow.sh … catch tupleindex` gives `#total 67`; with `walk-shadow.py`, `ant testSystem` gives 0 failures.
  - The detail: section 3.1.
- **The crash.**
  - The fact: the new row above.
  - What it means: the full check's zero needs it fixed.
  - The detail: section 1.3.

**Commands worked out:**
- `run-shadow.sh <out> <scratch> [export] [catch] [emptybounds] [tupleindex]`: the distance stage with checker shadows compiled ahead of the build.
- `known-fixes.py <tree> <family>...` and `designs.py <tree> <design>...`: apply library variants (each edit must match exactly); reset with `git checkout -- Library ProjectFortress/LibraryBuiltin`.
- `walk-shadow.py <tree>`: walk's tuple rule, for a scratch worktree only.
- The site comparison: a short script over two `errors.tsv` files, keyed on kind, family and message, with digits, `$N` suffixes and trait/object masked.

**Questions for the curator (decisions not taken):**
1. **Subscripts.** S1, the team's Index bound plus a "tuple of indices is an index" rule in the specification, the checker (subtyping and exclusion) and walk; or S2, S4 or W3. Default: S1. It clears 124, brings nothing, and moves no walk value, team demo or microGPT check.
2. **Vectors.** A2, A1 or A3. Default: A2. It is 6 library lines and moves nothing in walk, the 30 demos or microGPT. It gives up `SUM` and `zero` over vectors and matrices, which nothing measured uses, and it departs from the team's Vector extending AdditiveGroup. A1 keeps the team's library but widens P-146 against the paper's assumption it cites and depends on row 786's contested limit. A3 moves 4 revival tests and microGPT's `sm`.
3. **`|_|`.** String's api header extending `DelegatedIndexed[\Char,ZZ32\]`, or one api line per object. Default: the header. It is one line, and it also removes "different extends clauses" from String's export entry.
4. **The AnyList crash** (proposed row). Default: repair it in P-155's batch, before the check is turned on.
5. **Float's meet `^(self, b:RR64)`.** Default: take it with the known fixes; it is SORT.md's own line.
