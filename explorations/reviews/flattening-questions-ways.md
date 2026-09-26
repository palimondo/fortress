<!--
2026-09-26. Written by a clean worker: one that had not read the revival's earlier
notes, and opened nothing under explorations/ but protocol.md, experiment/env.sh, the
checker-count tool, and the sources of the two microGPT programs and their checks
(run-c4/src/*.fss|fsi, apl/mg/*.fss|fsi).
Sources: Specification/ (basic-lib/numbers.tex, basic-lib/basic-integers.tex,
advanced-lib/numbers-advanced.tex, advanced-lib/algebraic-constraints.tex,
basic/conversions-coercions.tex, basic/types-vals-vars.tex, basic/inference.tex,
basic/expressions/reductions.tex, basic/evaluation/reduction.tex,
advanced/parallelism-locality/defining-generators.tex, appendices/future.tex);
Documentation/Specification/Prose/Language/types.tick (the later Types chapter);
Library/ (FortressLibrary, CompilerLibrary, GeneratorLibrary, incomplete/);
ProjectFortress/LibraryBuiltin/ (FortressBuiltin, CompilerBuiltin); the team's tests,
demos and BirdyLib under ProjectFortress/; SpecData/examples; Papers/Types; the
interpreter's and the compiler's source; git history (git log --all --full-history,
because a walk from HEAD stops at the conversion's cut parent links); and the probes
and captures in flattening-questions-ways/ beside this note.
-->

# The flattening rung's three questions, and every way to answer them

Route A is fixed ground: the interpreter's library becomes the one library the compiled
checker accepts; the checker keeps the rule that no type is two different instantiations
of one generic ("multiple instantiation exclusion", Papers/Types/introduction.tick:417-426;
types.tick:353-372); so the fixed-width integers, ZZ, QQ and RR64 become siblings under
Number, Number loses its catch-all operators, and each wider type gets a `coerce` from the
narrower one. This note does not decide. It lists, for each of the three questions the rung
meets, the ways the language, the specification, the library and the two implementations
offer, the library's own way first, each taken through the nine steps of protocol § 6.
Readings marked as mine close each part.

**Terms.** *Walk*: the interpreter, `bin/fortress X.fss`, with FortressLibrary.
*Compiled path*: `bin/fortress compile` and run, which today uses the compiler's own
prelude (CompilerBuiltin, CompilerLibrary; Shell.java:403-407 switches to it). *The
checker over the library*: the compiled phase order with FortressLibrary in scope, the
checker-count tool's driver (explorations/coordinator/tools/checker-count/WorldFlip.java).
*Catch-all*: an operator or function declared on `Number` that takes any number and
answers by converting both sides to a float (FortressLibrary.fss:374-422, every body is
`asFloat(self) op asFloat(b)`). *Coercion*: an implicit conversion declared in the target
type (`coerce(x: T)`), applied where a declared type is expected
(conversions-coercions.tex:85-110). *Widening*: the specification's "widest-need"
re-choice of an operator so that a narrow computation is done in the wide type its context
needs (conversions-coercions.tex:762-906). *Identity*: the value `z` with `z + x = x`; the
sum of nothing.

**Probes.** Every probe and its capture is in `flattening-questions-ways/`: `walk.sh`,
`comp.sh` (with `libcache.sh`, which compiles the compiler prelude into a private cache
first) and `check.sh` run one probe in a private cache and write `<Probe>.walk.txt`,
`.comp.txt` or `.check.txt`. The two `Q3ConditionalExtension.*.txt` captures ran the
team's own `ProjectFortress/tests/conditionalExtension.fss` the same way from its
directory, and `Q0FlatArraysComp.comp.txt` is the head and tail of compiling
`explorations/run-c4/src/FlatArrays.fss` on the compiled path. Machine: 4 cores,
Intel Xeon 2.10GHz, JDK 25, `FORTRESS_THREADS=1`; no timings were taken.

**One premise of the brief, corrected by the history.** The compiler prelude was not
flattened by Guy Steele in 2011. David Chase cut the subtyping on 2009-08-31 ("ZZ32 is NOT
a subtype of ZZ64, RR32 is NOT a subtype of RR64; this would be a good time to get
coercion working", 6896886fb); Sukyoung Ryu added the exclusions (3e0306166, 2009-10-16);
Jan-Willem Maessen with Eric Allen, Justin Hilburn and Scott Kilpatrick made ZZ32 coerce
IntLiteral "as described in the spec ... as we gradually migrate to a flat numeric
hierarchy" (128f313b5, 2009-11-17); Eric Allen added ZZ64's coercions from IntLiteral and
ZZ32 and RR64's from RR32 and FloatLiteral (2ef730c88, d0cde7d17, 2010-01); Steele then
built on the flat prelude: the ZZ32 and ZZ64 operators (da5291587, 2011-07-22), the ZZ32
big + and big MAX (d535963cb, 2011-10-12), and ZZ's coercions from all four fixed widths
(304f2743a, 2012-06-12).

---

## Question 1. The big operators' catch-all

### Inventory

**Catch-alls on Number in the library.**

| What | Where | Note |
|---|---|---|
| 52 operators and functions on `trait Number`: `= =/= < <= > >= CMP MIN MAX MINMAX`, unary `-`, `+ - DOT TIMES juxtaposition /`, `SQRT`, the ten `_UP`/`_DOWN` and eight `IEEE_` rounding variants, `\|x\|`, `^`, `sin cos tan asin acos atan atan2 log exp floor ceiling truncate`, and the floor and ceiling brackets | FortressLibrary.fsi:276-336; bodies FortressLibrary.fss:352-423 | Every result RR64 (or Number for MIN/MAX); `Number extends { StandardPartialOrder[\Number\], StandardMinMax[\Number\], AdditiveGroup[\Number\], MultiplicativeRing[\Number\] }` (fsi:276-279) |
| `SumReduction`, `ProdReduction`, `MaxReductionN`, `MinReductionN`, `MinMaxReductionN`, all `CommutativeMonoidReduction[\Number\]` with Number-typed `empty` and `join` | fsi:1822-1871; fss:3032-3114 | "Hack to permit any Number to work non-parametrically" (fsi:1822, fss:3032). Identities: `0` (fss:3041), `1` (fss:3064), `-1/0` and `1/0` rationals (fss:3079, 3090, 3101), "(what is -1/0?)" (fss:3076) |
| `SUM`, `PROD`, `BIG MAXN`, `BIG MINN`, `BIG MINMAXN`, each `[\T extends Number\]` returning **Number** | fsi:1831-1871; fss:3053-3114 | The result type is Number whatever T is |
| The fusion pairs over Number: `SumProdReductionPair`, `MaxSumReductionPair`, `MinSumReductionPair`, `MaxNSumReductionPair`, `MinNSumReductionPair`, and the `DistributesOver[\...\]` markers | fss:3005-3030, 3033-3050, 3059-3067 | `MinReductionN` distributes to `MaxNSumReductionPair` (fss:3049-3050), which looks like a slip; `DistributesOver[\MaxReduction[\Number\]\]` is listed twice (fss:3037-3038) |
| `opr \|\|(self, b: Number): String`, `random(a: Number): RR64`, `printThreadInfo(a: Number)` | fss:4033, 4135, 4227 | Conversions, not algebra |
| Number-typed parameters in the builtin float objects: Float's `^(self, b: Number)` and `atan2(self, x: Number)`, its `\|x\|`, MIN, MAX and MINMAX typed Number; RR32's comparisons and arithmetic, all on `b: Number` | FortressBuiltin.fss:54-192 (79, 95-99, 158, 174); 203-367 (241-330) | 35 parameters typed Number in the file; Float's own `+ - DOT / juxtaposition` take only a Float (fss:103-114), so a Float beside an Int reaches the Number trait's catch-all |
| Number as the static algebra of generic code: `Vector[\T extends Number, ...\]` and its `DOT`, `juxtaposition`, `squaredNorm`, `\|\|v\|\|`; `Matrix[\T extends Number, ...\]`; the scalar extension `opr + - MIN MAX[\T extends Number, I\]`; `SparseVector`, `Csr`, `Csc`; `RandomGen[\T extends Number\]` | fsi:1465-1531, 1583-1648; fss:2195-2287, 2503-2660, 4511-4521; Sparse.fss:19-182; Random.fsi:24 | Bodies use `+`, juxtaposition and SUM on T; the checker sees only Number's operators on a `T extends Number`. "TODO: fix when Number is covariant" (fss:2245, 2605) |

**Uses of SUM and PROD inside the library.** Vector's `dot` (fss:2207, reached by every
vector `DOT` and juxtaposition, fss:2267-2271); Matrix's `rmul` and `lmul` (fss:2557,
2562); `strToInt` (fss:4192) and `strToFloat` (fss:4208); ChunkedSparseArray.fss:161, 163;
Pairs.fss:101 (`PROD xs` over RR64); PrefixMap.fss:380 and PrefixSet.fss:374 (declared
ZZ32); SkipList.fss:208 (declared ZZ32); Sparse.fss:96 (`dot(...): T`). Matrix `mul`
accumulates with T's own `+` and does not use SUM (fss:2512-2522).

**Uses in the two microGPT programs** (the APL program's lines come from the grammar's
expansions, AplMgSyntax.fsi:200-204):

| Program line | Form | Element | Empty? | Needed as |
|---|---|---|---|---|
| MicroGptFlat.fss:43, MicroGptApl.fss:59 `matOffset(i) = SUM[j <- 0#i] matCount(j)` | clause | ZZ32 | yes, `matOffset(0)` through `view(p, 0)` (MicroGptFlat.fss:45, 53) | ZZ32 (declared) |
| FlatArrays.fss:181 `zeros(SUM[m <- ms] \|m\|)`; FlatArrays2.fss:183 | clause | ZZ32 | no (nine matrices, MicroGptFlat.fss:71) | ZZ32 argument |
| MicroGptFlat.fss:28, MicroGptApl.fss:42 `e / (SUM e)` | bare, over an array | RR64 | no | RR64 (FlatArrays.fsi:17, FlatArrays2.fsi:68) |
| MicroGptFlat.fss:52 `nv = SUM vm`; MicroGptApl.fss:82 `nv←+/vm` | bare | RR64 | no | RR64 |
| MicroGptFlat.fss:27, 31, 32, 34, 61; MicroGptApl.fss:41, 45, 46, 48, 88 (`+/l×r`) `x DOT y` | vector DOT, a SUM inside the library | RR64 | no | RR64 |
| MicroGptFlatCheck.fss:56, MicroGptAplCheck.fss:58 `SUM[i <- 0#nParams()] (if ... then 1 else 0 end)` | clause | literal | no | anything `1.0 zeroCount` accepts (line 57) |
| MicroGptFlatCheck.fss:72, MicroGptAplCheck.fss:74 (two sums) | clause | RR64 | no | RR64 |
| MicroGptFlat.fss:28, MicroGptApl.fss:42; MicroGptFlatCheck.fss:27, 36, 38 (and the APL check's 29, 38, 40) `BIG MAX[t <- z] t` | clause | RR64 | no | RR64 |

No PROD, BIG MAXN, BIG MINN or BIG MINMAXN appears in either program. Both vocabularies'
element-generic declarations are bounded by Number: `gather` and `ravel` only index
(FlatArrays.fsi:51, FlatArrays2.fsi:134, AplMg.fsi:19), but FlatArrays2's elementwise
`× /` by rank, `/` by a scalar, `>`, `SQRT`, `exp` and `log` use T's arithmetic
(FlatArrays2.fss:23-39), which only Number's catch-all provides statically.

### 1. The refresher

A big operator folds a collection with an associative operation. The fold of nothing is the
operation's identity: the empty sum is 0, the empty product 1, and a MAX has no identity in
a type without a least element. The identity belongs to the element type: 0 in ZZ32, 0 in
ZZ64, 0.0 in RR64 are different values in different sets. A sum of elements of one type is
an element of that type; mathematics does not leave the set.

### 2. What each path does today, measured

*Walk* (Q1SumWalk.walk.txt): every SUM answers the run-time type of the values joined, not
a declared one: over ZZ32 `Int`, over RR64 `Float`, ZZ64 `Long`, ZZ `BigNum`, QQ `Ratio`,
and a mixed body `Float`. **The empty sum is `0 : Int` whatever the element type**: over an
empty RR64 array (`SUM a0`), in a function declared RR64 (`rsum(0): RR64` returns `0 :
Int`), and for the vector DOT of two empty RR64 vectors (`a0 DOT a0 = 0 : Int`). The
declared types pass because Int is a subtype of RR64 in today's tower. A ZZ32 sum wraps
(`SUM[j <- 0#2] 2147483647 = -2`). PROD's empty is `1 : Int`. `BIG MAXN` over nothing
answers `-1/0 : Ratio`, a rational infinity. `BIG MAX` over nothing throws EmptyReduction,
and over RR64 works only with a generator clause: `BIG MAX a` on an RR64 array finds no
overload (Q1MaxBareWalk.walk.txt), because RR64 is `StandardMax[\Number\]`, not
`StandardMax[\RR64\]`, while ZZ32 is `StandardMax[\ZZ32\]` through `Integral[\ZZ32\]`
(fsi:412, 465).

*Compiled path* (CompilerLibrary): the big + and big MAX exist over ZZ32 only
(CompilerLibrary.fsi:153-184). `SUM[j <- 0#0] j = 0`, `offs(0) = 0`; `BIG MAX` over nothing
answers `-2147483648`, ZZ32's minimum (`ZZ32Max.empty`, CompilerLibrary.fss:468-471), where walk
throws (Q1SumComp.comp.txt). A ZZ32 sum that overflows throws IntegerOverflow, where walk
wraps (Q1SumOverflowComp.comp.txt). A sum with an RR64 body is rejected: no `__generate` takes an
`RR64` body (Q1SumRRComp.comp.txt). The programs do not reach the big operators on this
path at all: FlatArrays.fss stops at 64 "Array is undefined" errors
(Q0FlatArraysComp.comp.txt).

*The checker over the library* (Q1SumCheck.check.txt): 64 errors, all in the library's own
api, so the probe's component is never checked. 13 of them are the reductions themselves:
`SumReduction` and `ProdReduction` extend several instantiations of
`DistributesOver[\E\]` (fsi:1825-1826, 1836-1838), which the instantiation rule forbids. The
rest are the tower (fsi:373, 409, 412, 438, 465, 499, 537; FortressBuiltin.fsi:76-145),
Comparison (fsi:121-153) and five more (fsi:818, 835, 840, 864, 2530).

*The two ways to get an identity without an element, measured.* A nullary big operator
overloaded by its reduction type alone is not usable on the compiled path: with a ZZ32 and a
String version declared, the checker picked the String one for a ZZ32 body and failed
(Q1NullaryComp.comp.txt). The library's own trick for branching on a static argument, a
`typecase` over a function of type `() -> T` (fss:2243-2250), gives the right zero per type
on walk (`zeroOf[\RR64\]() = 0.0`, Q1ZeroWitnessWalk.walk.txt) and is rejected as written
by the compiled checker, whose `typecase` branches do not refine T ("body has type
OR(FloatLiteral,ZZ64,IntLiteral,BottomType), but declared return type is T",
Q1ZeroWitnessComp.comp.txt).

### 3. What the specification says, including the same idea under another spelling

- A reduction expression is a call of `opr BIG Op[\T\](g: (Reduction[\R0\], T->R0)->R0): R`
  (reductions.tex:27-33); its own desugaring of a sum writes `var result: ZZ32 = 0`
  (reductions.tex:58-80), a typed accumulator.
- A reduction's `empty` "returns the identity" of `join`, and a generator may insert any
  number of empties (defining-generators.tex:42-61). The spec's worked example is a
  per-type reduction, `SumZZ32` with `empty(): ZZ32 = 0`
  (SpecData/examples/advanced/Generators.ReductionClass.fss:18-24).
- The desugaring table is **generic in the element type**: a sum of type N desugars through
  `SUM[\N\]` with `SumReduction[\N\]` (defining-generators.tex:147-157). The library's
  `SumReduction` over Number is that design with N collapsed to Number.
- The identity has its own type, `value object Identity[\opr ODOT\]`, and a type with an
  identity says so by `where { T coerces Identity[\ODOT\] }`
  (algebraic-constraints.tex:772-797). Every number type coerces `Identity[\+\]` to 0 and
  `Identity[\DOT\]` to 1 (numbers.tex:184-190, 256-268; basic-integers.tex's commented
  source, 97-105). Reduction variables start from `Identity[\oplus\]` (evaluation/reduction.tex:62-76),
  and the appendix asks what `if p then z else Identity[\+\] end` should type as
  (future.tex:372-383). This is the spec's answer to the empty sum: an identity without an
  element, turned into each type by coercion.
- The language chapter says the standard numeric types are "mutually exclusive; no value
  has more than one of them", with the common supertype Number
  (types-vals-vars.tex:500-505; again in the later Types chapter, types.tick:977-981). Under
  that sentence a Number-typed sum cannot name the type of its answer.

### 4. Where it sits in the numeric tower

Today every number is a subtype of RR64 (fsi:338, 373, 409, 465, 499), so a Number-typed
result can be stored anywhere and the Number catch-all computes every mixture by
converting to float. After flattening, Number is a bare supertype: a `Number`-typed sum
has no `+` to join with, cannot be stored in a ZZ32 or RR64 without a cast, and a generic
`T extends Number` learns nothing about T's algebra. The algebra moves down into each
sibling: `ZZ32 extends Integral[\ZZ32\]` already carries it (fsi:412-436); RR64 and QQ do
not yet carry `StandardMinMax[\RR64\]` or `AdditiveGroup[\RR64\]` of their own (QQ has
`StandardPartialOrder[\QQ\]`, fsi:373).

### 5. What the library already does in the same family, and where it departed from Java

- **Typed reductions, one per element type**: `BitXorReduction` over ZZ32 (fsi:1965-1974;
  fss:3296-3307) and `BIG MINNUM`/`BIG MAXNUM` over RR64 through
  `MapReduceReduction[\RR64\](join, identity)` (fss:3149-3161). Steele wrote the generic
  `BitXorReduction[\T extends Integral[\T\]\]` with `empty(): T = 0`, commented it out, and
  shipped the ZZ32 one (fss:3281-3307; 9fadbf62e, 2010-02-11): in this family the designer
  already monomorphised where a generic identity could not be written. The compiled
  prelude's `ZZ32Addition` and `ZZ32Max` are the same pattern (CompilerLibrary.fsi:153-184),
  and so is the 2012 BirdyLib port: `SumRed` over ZZ32 as `BIG +`, `SumRR64Red` over RR64
  as `BIG $`, `ProdRed` over ZZ32 as `PROD()`, the RR64 `PROD()` commented out and only
  `PROD(g: Generator[\RR64\])` kept (ProjectFortress/BirdyLib/Bazaar.fsi:20-28;
  Bazaar.fss:28-62).
- **Identity-less reductions lifted to Maybe**: `BIG MIN`/`BIG MAX` over
  `T extends StandardMin[\T\]` join with T's own operator and throw EmptyReduction on
  nothing (fsi:1873-1895; fss:2907-2927, 3117-3133).
- **Identity supplied by the caller**: `mapReduce(body, join, id)` and `reduce(j, z)` on
  every generator (fss:1047-1052); `embiggen[\T\](j, z)` builds a big operator from a join
  and an identity (fsi:2029-2036; fss:3376-3385), used by Map.fss:198 and IntMap.fss:696, 702.
- **Choosing by static argument without an element**: the `typecase` over `() -> T`
  (fss:2243-2250); its own limit is the comment above `strToInt`: "there's no clean way to
  convert all the arithmetic to use a provided type without having an instance of that
  type in hand" (fss:4180-4183).
- **Departure from Java**: Java has no generic sum; `IntStream.sum`, `LongStream.sum` and
  `DoubleStream.sum` are per primitive type, each with its own zero, and int sums wrap. The
  library departed from Java by making SUM one generic operator over all numbers; it
  departed from Java's wrapping in the compiled prelude, where ZZ32 arithmetic throws
  IntegerOverflow (measured for a product, Q2WidthComp.comp.txt, and for a sum,
  Q1SumOverflowComp.comp.txt), while walk wraps (Q1SumWalk, `-2`).

### 6. What the peers do, by family

(From each language's reference documentation; not measured here.)
- *JVM*: Java streams, one `sum()` per primitive stream, empty sum 0 of that type. Scala
  `sum[B >: A](implicit num: Numeric[B])`: the type-class instance supplies `zero` without
  an element. Kotlin: `Iterable<Int>.sum(): Int`, `Iterable<Long>.sum(): Long`,
  `Iterable<Double>.sum(): Double`, overloads by element type (JVM name clashes resolved by
  `@JvmName`).
- *Close to the metal*: Rust `Iterator::sum::<S>()` over `S: Sum<Self::Item>`, one `impl`
  per numeric type, empty sum `0` of that type; C++ `std::accumulate(first, last, init)`,
  the caller's `init` fixes the accumulator type (the known trap: an `int 0` truncates a
  sum of doubles).
- *Scientific*: Julia `sum(Float64[]) == 0.0` through `zero(T)`, a function of the type;
  Fortran `SUM` of a zero-size array is 0 of the array's kind; APL `+/⍬` is 0, every
  primitive function has a declared identity element; NumPy's empty sum is 0 of the
  dtype.
- *Unbounded*: Python `sum([]) == 0` (an int) unless a start is given; Scheme `(+)` is
  exact 0; Haskell `sum [] = fromInteger 0` at the result type, through `Num`.

The peers split two ways: the identity comes with the type (Julia's `zero(T)`, Rust's and
Haskell's per-type instances, Scala's `Numeric`), or the caller gives it (C++, Python's
start). None answers an integer 0 for an empty list of floats unless the caller asked.

### 7. The history in the commits

- 2007-12-13, Maessen, 1c492019f: "Fiddled with reductions (particularly Sum reduction) in
  effort to get something we can desugar to (but this required a bit of kludging on the
  type side: the declarations are correct but don't yield as specific type information as
  one would like)" — the birth of the Number-typed SumReduction.
- 2008-07-15, Maessen, fca589bbb: IntLiteral becomes a subtype of ZZ32 "and thus of every
  other numeric type"; the spec example `StatParam.Opr.IDENTITYplus.fss`, a trait
  parameterised by an operator (`IdentityOp[\T extends IdentityOp[\T,ODOT\], opr ODOT\]`),
  "appears to have been fundamentally wrong all along" and is deleted.
- 2010-02-11, Steele, 9fadbf62e: the generic BitXor reduction written and commented out,
  the ZZ32 one kept.
- 2011-10-12, Steele, d535963cb: `ZZ32Addition`, `ZZ32Max`, `BIG +` and `BIG MAX` over
  ZZ32 in CompilerLibrary.
- 2012-05-13, Tristan King, 208746e8a and after: BirdyLib's per-type big operators, the
  RR64 sum named `BIG $`.
- 2012-05-22, Steele, e177c3e2c: GeneratorLibrary split out of a test, with a generic
  `MapReduceReduction[\R\](j, id)` (GeneratorLibrary.fsi:264-270); no SUM was ever
  written against it.
- Spec side: the library chapters, the Identity design among them (algebraic-constraints.tex,
  numbers.tex, basic-integers.tex, numbers-advanced.tex), entered the in-repo Specification
  on 2009-11-03 (Sukyoung Ryu, 6d53c0fc4, "[spec] Added libraries"); they, the coercion
  chapter and types-vals-vars.tex are the same in Specification-1.0-frozen.

### 8. The derivation from Pavol's principles, case by case

- *The library, studied and its patterns used.* The library's own pattern for a big
  operator with a typed result is one reduction object per element type with its own
  identity (BitXor, MINNUM/MAXNUM, and every compiled-world port), and its own pattern for a
  generic big operator is BIG MIN/MAX: generic in T, T's own join, no identity. The Number
  catch-all is labelled a hack in its own comment. So: per-type sums for the cases that
  need an identity (ZZ32 `matOffset(0)`), and a generic identity-less form is the library's
  pattern only where an empty fold is an error.
- *The specification changes when the wish met reality.* The spec's wish is
  `SumReduction[\N\]` with `Identity[\+\]` coerced into N. Reality: where-clauses are
  unsupported (conversions-coercions.tex:15), walk does not coerce a declared return value
  (the spec's rule that a body under a declared return type is coerced,
  conversions-coercions.tex:104-105, is an expected failure on walk:
  ProjectFortress/tests/XXXCoercionReturnRungC.fss), the library never
  had `Identity`, and a spec example of an operator-parameterised trait was deleted
  as wrong in 2008. The spec's own worked example is the per-type `SumZZ32`.
- *Integers: JVM defaults, corrected where they are mistakes.* A ZZ32 sum is a ZZ32; its
  overflow follows ZZ32's rule (compiled throws, walk wraps today); the per-type sums put
  that rule in one place per type. The JVM gives no generic sum to copy.
- *microGPT compiled and fast.* A per-type sum compiles to a primitive loop with a
  monomorphic join. A Number-typed or `Any`-typed reduction (today's SumReduction, and
  `embiggen`'s `MIMapReduceReduction` over `Any`, fss:3370) boxes and dispatches on every
  join.

Case by case: (a) `matOffset(0)` needs a ZZ32 0 with no element: per-type sums, the spec's
Identity coercion, or the static-argument typecase; an identity-less generic sum would
throw here. (b) RR64 sums over arrays (`SUM e`, `SUM vm`) are never empty in the programs:
every way serves, and the result must be RR64 statically. (c) The DOT inside Vector.dot is
SUM over T: it needs whatever the SUM over T becomes, plus a bound on T that carries `+`
and juxtaposition. (d) `BIG MAX` over RR64 needs RR64 to be `StandardMax[\RR64\]`, which the
flattening gives it. (e) The literal-bodied `zeroCount` sum: on walk literals are ZZ32
(FortressBuiltin.fsi:113), so it is a ZZ32 sum. Cost across all: the SUM, PROD and
MAXN/MINN/MINMAXN declarations are rewritten; `DistributesOver` markers must stop being
several instantiations of one generic (the `distribute` overloads, fss:3043-3050, already
carry the information; Generator2.fss:73-79 reads only them).

### 9. The ways, the library's own first, and what each commits Pavol to

1. **One reduction per element type, reached from one generic declaration** (the library's
   BitXor/MINNUM pattern, the compiled prelude's `ZZ32Addition`, the spec's `SumZZ32`).
   `SumZZ32`, `SumZZ64`, `SumZZ`, `SumQQ`, `SumRR64` (and NN32, NN64, RR32), each a
   `CommutativeMonoidReduction` of its type with its own zero; `SUM(g: Generator[\ZZ32\]): ZZ32`
   and its siblings for the bare form, which the instantiation rule makes valid (two
   instantiations of `Generator` with excluding arguments exclude, types.tick:355-360).
   *Blocking rule*: the nullary form that a generator-clause reduction desugars to cannot be
   overloaded by result type (measured, Q1NullaryComp; BirdyLib renamed its RR64 sum `BIG $`
   to escape it). *How the library gets around it*: its nullary big operators carry a
   static parameter (`SUM[\T extends Number\]()`, fsi:1831; `BIG MAX[\T extends StandardMax[\T\]\]()`,
   fsi:1885), so one generic nullary declaration can select the per-type reduction by T,
   through the `() -> T` typecase (fss:2243-2250; works on walk, needs a cast or a checker
   change on the compiled path, Q1ZeroWitness*) or through overloading on static-parameter
   bounds (not measured here). Commits Pavol to: SUM's result is the element type; about
   eight reduction objects per big operator; the `typecase` witness, or its replacement, as
   a library idiom the compiled checker must type.
2. **Generic over an algebra bound, identity-less, empty throws** (the library's BIG
   MIN/MAX). `SUM[\T extends ...Group[\T\]\]` joins with T's own `+`. *Blocking*:
   `matOffset(0)` (MicroGptFlat.fss:43; MicroGptApl.fss:59) and every empty DOT would throw;
   the spec's empty sum is the identity (defining-generators.tex:42-46). *Around it*: the
   library's `AdditiveGroup.zero` getter (fsi:256; fss:332 `self - self`) needs an element.
   Commits Pavol to: a semantic change for every empty sum, the model's `matOffset` among
   them, and a diff to the model if it is to stay.
3. **Identity given by the caller** (`mapReduce`, `reduce(j, z)`, `embiggen`). As a library
   vehicle it is how way 1 can be written in a line per type. At the call site it changes
   the model's notation (`SUM[j <- 0#i] matCount(j)` would become a `mapReduce` call):
   a diff to Pavol before anything is built.
4. **The specification's Identity[\+\]** coerced into each type, `SumReduction[\N\]`
   generic. *Blocking*: `opr` static parameters and `where { T coerces Identity[\+\] }`
   (unsupported, conversions-coercions.tex:15); coercion of a declared return value (not
   on walk: XXXCoercionReturnRungC.fss). *Around it*: the library has only ever done the
   per-type form (way 1). Commits Pavol to: where-clauses on coercion in the checker and
   both back ends, and `Identity`/`Zero` types in the library.
5. **One generic reduction whose `empty(): T = 0` is converted by coercion.** It is the
   commented-out BitXor. On walk it reproduces today's defect (the literal stays an Int;
   `SUM a0 = 0 : Int`); on the compiled checker `0 : T` needs `T coerces IntLiteral`, a
   where-clause. Commits Pavol to the same machinery as way 4.
6. **Keep a Number-typed reduction and cast the answer.** Excluded by the fixed ground:
   its join `a + b` needs Number's `+`. Listed only for completeness.

For BIG MAXN, MINN and MINMAXN (unused by the programs): drop them, or give each type its
bottom and top (RR64's infinities; ZZ32's minimum, as the compiled `ZZ32Max` already does),
and note that walk's `BIG MAX` over nothing throws while the compiled one answers
`-2147483648` today. For the `T extends Number` generics (Vector, Matrix, scalar extension,
Sparse, FlatArrays2's elementwise operators): after the flattening the bound must carry the
algebra (the library's own `AdditiveGroup[\T\]` and `MultiplicativeRing[\T\]`,
fsi:255-274), or the declaration becomes RR64-only, as run-c4's FlatArrays already is.

**Reading (mine).** Way 1, because it is what the library and the designers did every
time the question came up in this family, it gives `matOffset(0)` its ZZ32 zero, and it
compiles to monomorphic loops. The open part is the nullary form: the `() -> T` witness is
the library's own answer and the note's measurements show it is the one piece the compiled
checker does not yet accept.

---

## Question 2. Mixed widths

### Cases found

*In the library*: the ranges `opr :[\I extends AnyIntegral\](lo: I, hi: I)` and
`opr #[\I ...\](lo: I, ex: I)`, one static argument for both ends (fsi:2169-2178;
fss:3825-3832); explicit conversions `widen`, `narrow`, `big` (fsi:494, 533-534, 540-541);
`nanoTime(): ZZ64` (fsi:2395) against `nanoTime(): RR64` in the compiled prelude
(CompilerBuiltin.fsi:23); `rawBits(): ZZ64` beside `signBit(): ZZ32` (fsi:352-354); shift
counts of `AnyIntegral` (fsi:431-432, 491-492, 530-531); `^` with `AnyIntegral` or ZZ64
exponents (fsi:273, 398, 434; fss:349). Two api-component mismatches meet here: the floor
and ceiling of a Number are `ZZ64` in the api (fsi:332, 334) and `ZZ` in the component
(fss:418, 420), and `truncate` is `ZZ64` in the api (fsi:335) and `RR64` in the component
(fss:421); walk answers `|\ 3.7 /| = 3 : Long` (Q2StrToIntWalk.walk.txt).

*In the team's tests and demos*: `demos/fact64.fss:15-23` ("Notice the call to widen; this
is necessary at least with the current interpreter, which otherwise cheerfully multiplies
two 32-bit integers giving a 32-bit result"); `tests/longPrim.fss:20-22` (`a: ZZ64 = 0`,
then `a.minimum - 1 = a.maximum`); `tests/litCoercion.fss:17-30`; `tests/varTest.fss:16-17`;
`tests/asifTest.fss:102` (`(3 asif RR64) + 17` expects an RR64); the compiled-world
`compiler_tests/Compiled12.coerceInt64.fss:18-26` (its two asserts are still `TODO`),
`library_tests/Integer2.fss:18-24` and `Integer4.fss:36-50` (ZZ64 variables from literals).

*In the two programs*: no variable is ZZ64; ZZ64 enters only through `nanoTime()` in the
timing lines (MicroGptFlat.fss:92, 95; MicroGptFlatCheck.fss:31, 49, 59, 63, 65, 95;
MicroGptApl.fss:121, 124; MicroGptAplCheck.fss:33, 51, 61, 65, 67, 97), as
`(nanoTime() - t0) DIV 1000000`. The mixtures the programs lean on are integer beside
real: `1.0 s` and `(1.0 s) / nSteps` (MicroGptFlat.fss:82; MicroGptApl.fss:112), `1 - beta1`
(:77-79), `(x DOT x) / |x|` (:27, 31, 32), `SQRT (1.0 headDim)` (:59, 66; the APL grammar
writes `SQRT (1.0 (l))` and `pow(1.0 (l), (r))`, AplMgSyntax.fsi:232-234), `10.0^(-5)` and
`beta1^t` (:18, 79), `10.0 m + (c.codePoint - '0'.codePoint)` (FlatData.fss:26),
`1.0 corpus.length(d)`, `1.0 zeroCount`, `2 eps` (MicroGptFlatCheck.fss:38, 57, 72, 86).
On walk these reach Number's catch-all (Float's own operators take only a Float,
FortressBuiltin.fss:103-114), so they are Question 1's catch-all as much as Question 2's.

### 1. The refresher

ZZ32 is a subset of ZZ64 as a set of integers; as machine types they are different
representations, and a 32-bit operation overflows where the 64-bit one does not. Every
ZZ32 is exactly representable as a ZZ64 and as an RR64; a ZZ64 is not always an RR64 (above
2^53 the double rounds). So widening ZZ32 to ZZ64 or to RR64 is exact, ZZ64 to RR64 is
not.

### 2. What each path does today, measured

*Walk* (Q2WidthWalk.walk.txt). A variable declared ZZ64 keeps the run-time type of its
value: `b: ZZ64 = 1` holds an `Int`, `c: ZZ64 = widen(1)` a `Long`. With `a: ZZ32 =
2147483647`: **`a + b = -2147483648 : Int`** (32-bit wrap) and `a + c = 2147483648 : Long`.
`m: ZZ64 = 100000; m m = 1410065408 : Int`; with `widen`, `10000000000 : Long`. A literal
too big for 32 bits is a Long (`3000000000 : Long`). The team's longPrim check runs on
ZZ32's bounds: `z: ZZ64 = 0; z.maximum = 2147483647 : Int`. `fact(20)` with a ZZ64
parameter given the literal 20 is `-2102132736 : Int`; with `widen(20)`,
`2432902008176640000`. A generic call infers the nested join: `pair(a, c)` is a
`__DefaultVector[\ZZ64,2\]`, `pair(a, 0.5)` an RR64 one. A range with a ZZ32 low end and a
ZZ64 high end is a `CompactFullParScalarRange[\ZZ64\]` of size `3 : Long`, **but its
elements are Ints that wrap**: `2147483647 : widen(2147483647) + 2` enumerates `2147483647,
-2147483648, -2147483647, ...` (the first run of the probe did not end and was killed; the
probe now stops after five). Integer beside real: `1.0 s = 3.0`, `1 - 0.85 =
0.15000000000000002`, `(x DOT x) / |x| = 0.25`, all Float.

*Compiled path* (flat prelude, `ZZ64.coerce(ZZ32)` and `coerce(IntLiteral)`,
CompilerBuiltin.fsi:147-149): `b: ZZ64 = 1` is a real ZZ64 and `a + b = 2147483648`,
`m m = 10000000000`, `fact(20)` correct, `y: ZZ64 = i; y y = 10000000000`
(Q2WidthComp.comp.txt). But `w: ZZ64 = i i` with `i: ZZ32 = 100000` multiplies in ZZ32
first and throws IntegerOverflow: coercion without widening. A range `0 : c` with a ZZ64
end is rejected, `:` takes two ZZ32s only (Q2RangeComp.comp.txt;
CompilerLibrary.fsi:173-174). A generic call's static argument is inferred as the **union**
`ZZ32 ∪ ZZ64` (the checker's join is a union, TypeAnalyzer.scala:80-81): `second(a, c)`
runs (Q2GenericComp.comp.txt), and adding `c` to its result makes the code generator
dispatch over the union, coerce the ZZ32 member, and then crash ("Error trying to close
method scope", Q2GenericTComp.comp.txt). Integer beside real is rejected outright: RR64
coerces only FloatLiteral and RR32 (CompilerBuiltin.fsi:433-435), so `1.0 s` and `1 - 0.85`
fail to check (Q2RealIntComp.comp.txt).

*The checker over the library*: stops at the library's own tower errors (Question 1, step
2); no program-level answer yet.

### 3. What the specification says, including the same idea under another spelling

- Integers are not subtypes of floats, and coercion is how they meet: "it is convenient to
  be able to use an integer-valued expression in a floating-point expression even though
  its type is not a subtype of any floating-point type. Fortress supports the automatic
  conversion of integer values to floating-point values" (conversions-coercions.tex:62-68);
  "For any floating-point parameter, a decimal integer literal argument may be used"
  (:141-142).
- The standard numeric types are mutually exclusive (types-vals-vars.tex:500-505;
  types.tick:977-981).
- Coercion resolution is static and bottom-up: with no declaration applicable without
  coercion, the most specific one applicable with coercion is chosen; the spec's own
  example is `ZZ32`, `ZZ64 coerce(z: ZZ32)`, `ZZ128 coerce(z: ZZ32), coerce(z: ZZ64)`, and
  `f(ZZ32)` resolves to `f(ZZ64)` (conversions-coercions.tex:454-565). Coercion is not
  chained (:127-130), so each wider type declares a coercion from every narrower one. A
  type can be coerced from the declared source "or any supertype" of the argument's type
  (:387-390).
- Where coercion happens: typed variable and field right-hand sides, arguments at typed
  parameters, **bodies under a declared return type**, tests, contracts, constrained
  subexpressions; never in type ascriptions or `asif` (:85-110); and only into a parameter
  declared with exactly the target type, "not if it is a supertype" of it (:78-81).
- The same idea spelled as widening: `coerce(x: RR32) widens` makes `c = c + a · b` compute
  the product in the wide type the context needs (:762-906). It is the spec's answer to
  `w: ZZ64 = i i`. "Widening and where clauses are not yet supported" (:15).
- Static-argument inference with coercion: the spec's inference chapter is a placeholder
  (inference.tex:15), and so is the later one (Documentation/Specification/Prose/Language/type-inference.tick,
  12 lines). The spec is silent on what `pair(a, c)` infers.
- The later Types chapter adds covariant static parameters (types.tick:322-339) and the
  instantiation rule (:353-372); it does not speak to numeric widths.

### 4. Where it sits in the numeric tower

Today ZZ32 <: ZZ64 <: ZZ <: AnyIntegral <: QQ <: RR64 <: Number (fsi:338-537). The
interpreter never converts on the way up: a ZZ32 value is already a ZZ64, so a ZZ64
variable can hold an Int and 32-bit operators are chosen by the value's run-time type.
That is the source of every wrong answer in step 2. After flattening, ZZ32 and ZZ64 are
siblings; a ZZ32 value can only become a ZZ64 by a coercion, and the interpreter already
applies coercions at typed bindings, parameters and overloaded calls (commit b628871a2;
Coercions.java; tests/CoercionBindRungC.fss prints PASS), but not at declared return types or at
generic functions' parameters (tests/XXXCoercionReturnRungC.fss,
tests/XXXCoercionGenericFnRungC.fss, both expected failures, FileTests.java:605; all three
run in Q2InterpCoercionTests.walk.txt).

### 5. What the library already does in the same family, and where it departed from Java

The compiled prelude is the library's own flat tower: each wider integer declares a
coercion from each narrower one (ZZ from IntLiteral, ZZ32, ZZ64, NN32, NN64,
CompilerBuiltin.fsi:103-108; ZZ64 from IntLiteral and ZZ32, :147-149; NN64 from IntLiteral
and NN32, :332-334), and RR64 from FloatLiteral and RR32 only (:433-435). It enumerates the
pairs because coercion does not chain. It has no integer-to-float coercion, where the
specification has one. The interpreter library offers explicit conversions (`widen`,
`narrow`, `big`, fsi:494, 533-534) and the team's demo relies on them (fact64.fss:15-23).
Departures from Java: Java widens `int` to `long` implicitly in every binary operation and
`long` to `double` silently with rounding (a "widening primitive conversion" that loses
precision); the compiled prelude keeps the first, as a coercion, and refuses every
integer-to-float conversion, exact or not; it also throws on ZZ32 overflow where Java wraps.

### 6. What the peers do, by family

(Reference documentation; not measured here.)
- *JVM*: Java's binary numeric promotion (int + long is long; long + double is double,
  lossy); generic inference joins to a boxed `Number & Comparable<...>`. Kotlin: no implicit
  conversion of values, but overloads per width pair: `Int.plus(Long): Long`, and
  `Int.rangeTo(Long)` returns a `LongRange`. Scala 2 widens int to long to double
  implicitly and, from 2.13, deprecates the lossy steps.
- *Close to the metal*: C and C++ usual arithmetic conversions (int + long is long;
  long to double silently); Rust has no implicit widening at all: `i64::from(a)` for the
  exact ones, `a as f64` spelled out for the lossy ones, and a range needs both ends of one
  type.
- *Scientific*: Julia `promote_type(Int32, Int64) == Int64`, arithmetic promotes both
  operands, `Int64 + Float64` is Float64; ranges promote their endpoints. Fortran
  converts mixed-kind operands to the higher kind. NumPy promotes by dtype rules.
- *Unbounded*: Python and Scheme have one integer type; mixing with floats is
  "contagion" to inexact. Haskell has no implicit conversion: `fromIntegral`.

The peers split on implicit widening (Java, C, Julia, Fortran: yes; Rust, Haskell: no;
Kotlin: per operator) and agree that the lossy integer-to-float case is either silent (Java,
C) or explicit (Rust, Haskell).

### 7. The history in the commits

2008-07-15 (fca589bbb): IntLiteral under ZZ32 "and thus under every other numeric type";
"all the ZZ32 math you do will end up yielding results of type Int", and too-large
literals evaluate to a ZZ. 2009-08-21 (116e5e6fa): "ZZ32 and RR64 arithmetic can't be
commingled at all at the moment" in the compiler. 2009-08-31 (6896886fb): the compiler
prelude flattened. 2009-11-17 (128f313b5): IntLiteral coercion "as described in the spec",
toward "a flat numeric hierarchy". 2010-01-06 and -13 (2ef730c88, d0cde7d17): ZZ64 and RR64
coercions, and `Compiled12.coerceInt64.fss`. 2012-06-12 (304f2743a): coercions to ZZ from
the four fixed widths. The widening section and the `widens` keyword were never implemented
(the parser knows `widens` only inside where-clauses, MayNewlineHeader.rats:144).

### 8. The derivation from Pavol's principles, case by case

- *ZZ32 op ZZ64* (arithmetic, comparison). Library pattern and spec agree: `ZZ64.coerce(ZZ32)`
  and resolution to ZZ64's operator. JVM default agrees (int + long is long). Measured on
  the compiled path. Cost: none beyond the coercion declaration; on walk it removes the
  32-bit wrap of `a + b` for a ZZ64-declared `b`.
- *A ZZ64 declared from a literal or a ZZ32 value.* The coercion at the typed binding
  converts it; walk already does this for other types (CoercionBindRungC). Cost: longPrim's
  bound checks start testing ZZ64's bounds.
- *A narrow computation stored wide* (`w: ZZ64 = i i`). Coercion alone computes in ZZ32
  (and throws on the compiled path). The spec's answer is widening; the JVM's is the same as
  coercion alone (Java computes `i * i` in int). The principle "correct JVM mistakes for
  mathematical precision" points at widening; the cost is a top-down reanalysis in the
  checker, unbuilt anywhere. The explicit spelling is `widen(i) i`.
- *Ranges `lo : hi` of two widths.* Today's walk defect shows the tower cannot be trusted
  here. After flattening, `opr :[\I\](lo: I, hi: I)` needs one I for both ends: the union
  (the compiled checker's join), the coercion-aware choice ZZ64, an overload per width pair,
  or an error asking for `widen`. On walk the typed parameters then coerce `lo` to a Long
  and the enumeration is right.
- *A generic call's static argument* (`pair(a, c)`). Union (today's compiled join; measured
  to crash codegen once used), the coercion target ZZ64 (Julia's promotion, Java's numeric
  promotion), or explicit static arguments `pair[\ZZ64\](a, c)` (which then need coercion at
  generic parameters, not yet on walk). The spec is silent, so this is a decision the spec
  must then record.
- *Integer beside real* (the programs). The spec says integers coerce to floats; the
  compiled prelude does not; exactness says ZZ32-to-RR64 and IntLiteral-to-RR64 are safe,
  ZZ64-to-RR64 is not. Principle: JVM default for the exact ones, an explicit spelling for
  the lossy one. Cost: RR64 declares `coerce(x: ZZ32)` (walk's literals are ZZ32 values,
  FortressBuiltin.fsi:113) and, on the compiled prelude where IntLiteral is a sibling
  (CompilerBuiltin.fsi:390), `coerce(x: IntLiteral)` too.

*Which outputs change when a value really widens.* In the programs: none that the checks
compare. Every integer that meets a real is small (the largest is `zeroCount`, 464), so
the conversions are exact and the 40 comparisons
are computed in RR64; the only ZZ64 values are the millisecond timings, which are printed,
not compared. What the programs need is that the coercions exist, or they stop checking.
In the team's tests (predictions from the measurements): `longPrim.fss:21-22` moves from
ZZ32's bounds to ZZ64's, and still passes, because walk's Long wraps
(`widen(0).minimum - 1 = 9223372036854775807`); `asifTest.fss:102` would stop passing,
because `3 asif RR64` asks for a supertype and coercion does not happen in `asif`
(conversions-coercions.tex:91); `fact64.fss`, `litCoercion.fss`
and `varTest.fss` print the same; a `fact64` without its `widen` would move from
`-2102132736` to `2432902008176640000`. In the library: the mixed-width range enumeration
becomes correct. The library's own `0 asif ZZ32` (fss:3825-3832; the tests'
ArrayListQuick.fss:79 and others) stays valid only while IntLiteral stays under ZZ32 on
walk.

### 9. The ways, the library's own first, and what each commits Pavol to

1. **Coercion into the wider type, resolved statically** (the compiled prelude's own
   pattern; the spec's ZZ32/ZZ64/ZZ128 example). Each wider type declares a coercion from
   every narrower one, no chaining. Commits Pavol to: the table of which pairs coerce
   (all exact integer pairs; whether any integer coerces to RR64, and which), and the
   interpreter's missing coercion contexts (return types, generic parameters) being closed.
2. **Widening** (the spec's `widens`), on top of 1, so a narrow computation stored wide is
   done wide. Commits Pavol to: a checker pass and a new keyword use; nothing to copy from
   the implementations.
3. **Explicit conversions only** (`widen`, `narrow`, `big`; Rust's and Haskell's family).
   The library already has them and the team's demo uses them. Commits Pavol to: every
   mixed expression spelled out; for the programs, every `1.0 s`-style line, a change to
   the model's notation shown as a diff first.
4. **For generic inference**, one of: the union (today's compiled checker), the most
   specific type both arguments coerce into (ZZ64 for ZZ32 and ZZ64; Julia's promotion),
   or explicit static arguments. Commits Pavol to a rule the spec does not yet have, to be
   written into its empty inference chapter.
5. **For ranges**, one of: the same inference rule as 4 for `opr :[\I\]`; overloads for
   each width pair (Kotlin's `Int.rangeTo(Long): LongRange`); or the element type of the
   low end, with an error when the high end does not fit.
6. **For integer beside real**: RR64 coerces ZZ32 and literals (exact, the spec's Example
   1); or also ZZ64 (lossy, Java's choice); or none (Rust's choice), with the programs'
   `1.0 s` already written in the explicit style for the loop counter
   (MicroGptApl.fss:112 widens it "once in host code").

**Reading (mine).** Way 1 for integer pairs, with ZZ32 and literals coercing into RR64 and
ZZ64 into RR64 left explicit, is what the spec, the compiled prelude and exactness all
point to, and it is all the programs need. Widening (way 2) is the spec's answer to the one
case coercion gets wrong, and it can wait: no program line needs it. The inference rule for
`pair(a, c)` and `lo : hi` is the only decision here the specification has never written
down.

---

## Question 3. RationalQuantity and the sign-refined types

### The designs

- **The advanced chapter**: all rational types are type aliases of one trait,
  `RationalQuantity[\unit U absorbs unit, bool ninf, bool lt, bool eq, bool gt, bool pinf, bool nan\]`
  (numbers-advanced.tex:15-27); eighteen aliases `QQ`, `QQ_LT`, ..., `QQ_splat_NE`
  (:47-66); the trait extends every instantiation of itself with weaker flags,
  `RationalQuantity[\U, ninf', ...\] where { bool ninf', ..., ninf -> ninf', ... }`, and
  conditionally `Field`, `AbelianGroup`, the order and lattice traits (:261-290);
  it coerces `Identity[\+\]`, `Identity[\DOT\]`, the `Zero`s and `IntegerQuantity`
  (:291-298); its operators compute the result's flags by boolean formulas over the
  arguments' flags (:299-420), one of them ending in the words "needs more work here"
  (:364).
- **The basic chapters**: eighteen rational types (QQ, QQ* and QQ#, each with five sign
  refinements) listed as subtypes of one another and of the real ones (numbers.tex:36-91),
  with "the Fortress type system tracks these types closely through various arithmetic
  operations" (:93-96); the same for the
  integers (basic-integers.tex:28-66, 70-73), `NN` a synonym for `ZZ_GE` (:63-65), and
  `ZZ_GT` a lattice under divisibility (:531-535). `ZZ extends { QQ, ZZ_star, ... }`
  (:195-196).
- **Against them**: the language chapter's "these types are mutually exclusive"
  (types-vals-vars.tex:500-505; types.tick:977-981), and the instantiation rule
  (types.tick:353-372): `QQ_GT` would be several instantiations of `RationalQuantity`.

### 1. The refresher

The positive rationals, the nonnegative ones, the rationals with infinities, and the
rationals with an indefinite 0/0 are nested subsets. A value's sign is a property of the
value; tracking it in the type lets a checker prove `x / y` is defined, or that a GCD
lattice applies. Every such refinement has the same representation as its parent.

### 2. What each path does today, measured

- The team's `ProjectFortress/tests/conditionalExtension.fss` (Sukyoung Ryu, 2007)
  declares `RationalQuantity` exactly and "can be parsed": walk runs it and prints its line,
  because nothing instantiates the trait (Q3ConditionalExtension.walk.txt). The compiled
  checker rejects it: "Cyclic type hierarchy: Type RationalQuantity transitively extends
  itself" (Q3ConditionalExtension.comp.txt).
- Instantiating the design on walk fails twice over: the trait-level `where { lt OR eq OR gt }`
  is an InterpreterBug (Q3RefineWalk.walk.txt); without it, the conditional extends reports
  "Missing type lt'" (Q3RefineCondWalk.walk.txt). The compiled checker gives the same
  cyclic-hierarchy error for the probe (Q3RefineCondWalk.comp.txt). A parser quirk met on
  the way: `Rat[\false,true\]` in a parameter type is a syntax error and `Rat[\false, true\]`
  parses.
- The same refinements spelled with the later chapter's covariant static parameters
  (each sign flag a type argument, `Never` below `May`; Q3Phantom.fss): the compiled
  checker accepts it and rejects zero passed where a positive is asked (Q3PhantomReject.comp.txt),
  but the generated class does not implement the covariant supertype and the run stops with
  IncompatibleClassChangeError (Q3Phantom.comp.txt); walk has no covariance ("Unification
  error", Q3Phantom.walk.txt).
- Type aliases (`type X = ...`) appear nowhere in Library/ or in the team's tests.

### 3. What the specification says, including the same idea under another spelling

Beyond the designs above: the per-type `check_LT`, `check_GT`, ... methods, which throw
CastError (numbers.tex:228-244): the refinement as a run-time check. Contracts,
`requires { ... }` (functions.tex:418-426): the refinement as a precondition. Coercion from a
generic type (types.tick:393-400) with where-clauses (conversions-coercions.tex:157-160,
196-220): the refinement ordering as coercions, not subtyping. The later Types chapter
comments out the whole Type Aliases section, including the parallel example
`type SimpleFloat[\nat e, nat s\] = DetailedFloat[\Unity,e,s,false,false,false,false,true\]`
(types.tick:1011-1036), and offers covariant parameters instead (types.tick:322-339). The
language chapter's mutual exclusion is the spec's own flat reading.

### 4. Where it sits in the numeric tower

The designs are a second axis on top of the widths: refinement by sign and by
infinity/NaN, same representation. Today's library has only the width axis, and nests it.
Route A flattens the width axis; the refinement axis, if kept as subtyping, is a lattice of
eighteen types per base type that the instantiation rule forbids in its
`RationalQuantity` spelling.

### 5. What the library already does in the same family

It has: `QQ` as one trait over `Ratio` and the integers (fsi:373-407; fss:524-610);
`RR64.check` and `check_star`, which return `Maybe[\RR64\]` for "finite" and "not NaN"
(fsi:347-350): the refinement as a run-time check, spelled with Maybe where the spec says
CastError; NN32 and NN64 as separate unsigned representations (fsi:438-463,
FortressBuiltin.fsi:82-108), a representation choice, not a sign refinement; and its own
note of the gap, `denominator(self): ZZ  (* Ideally would be NN *)` (fsi:379). It never
had: `RationalQuantity`, `IntegerQuantity`, any `_LT`/`_GT`/`_star`/`_splat` type, `NN`,
`Identity`/`Zero`, or units in the shipped library. The sign-refined names exist only in
`Library/incomplete/basic/Fortress.Number.fsi:12-107` (`QQ extends { RR, QQ_star,
Field[\QQ,QQ_NE,...\] ... }`, `check_LT` and the rest), and units in its siblings
(Fortress.SIUnits and others), a 2008 move of older files (1d2680d4d) that no build
compiles; `RationalQuantity` is nowhere in Library/, not even there. Java has none of this.

### 6. What the peers do, by family

(Reference documentation; not measured here.) *JVM*: none in Java or Kotlin (Kotlin's
`UInt` is a representation, like NN32); Scala's refined-types library encodes predicates
in types. *Close to the metal*: Ada's `subtype Positive is Integer range 1 .. Integer'Last`
(a subtype checked at run time, the spec's `ZZ_GT` exactly); Rust's `NonZeroU32` (a
separate type, `new` returns an Option, `get` converts back: the library's Maybe-returning
`check`). *Scientific*: none in Julia or Fortran; F#'s units of measure and C++'s
Boost.Units carry the `unit U` axis at compile time and erase it. *Unbounded and research*:
Liquid Haskell and F* carry sign refinements in types, checked by an SMT solver.

### 7. The history in the commits

1a736b627 and 368b33727 (Sukyoung Ryu, 2007-08-14 and 2007-12-14): where-clauses on
extends clauses implemented in the parser, and the conditionalExtension test that parses
the design. 1d2680d4d (2008-03-24): the incomplete Number and units libraries moved to
`Library/incomplete`. 6d53c0fc4 (2009-11-03): the advanced numbers chapter enters the
in-repo spec; unchanged since, and identical in Specification-1.0-frozen. The later Types
chapter (2012) comments out type aliases. `git log --all -S RationalQuantity` finds it only
in the specification, in conditionalExtension.fss and in commented-out code added to
`not_passing_yet` (3e034f13c, 2008-07-03): no commit instantiates it.

### 8. The derivation from Pavol's principles

- *The library's patterns*: the library refines by run-time check (`check`, `check_star`
  with Maybe) and by representation (NN32, NN64); it never refined by type.
- *The spec changes when the wish met reality*: the wish is the advanced chapter; the type
  group's rule forbids its spelling, the compiled checker rejects it, the interpreter cannot
  instantiate it, the spec's own language chapter says the numeric types are mutually
  exclusive, and the designers' later chapter removed type aliases. This is the clearest
  "wish met reality" case of the three.
- *Integers, JVM, hardware*: sign refinements have no JVM counterpart and no hardware
  behaviour; unsigned representations (NN32, NN64) do and already have their own types.
- *microGPT*: no program line uses a refined type, `QQ`, units or `where`; nothing in the
  goal needs them.

### 9. The ways, and what each commits Pavol to

1. **Refinement by run-time check on the flat types** (the library's own `check`/`check_star`;
   the spec's `check_GT` family). The spec keeps the advanced chapter's text verbatim as a
   preserved, superseded design, and rewrites the basic chapters' subtype lists as the
   check methods. Commits Pavol to: Maybe or CastError for the check methods (the library
   and the spec differ), and nothing in either implementation.
2. **Refinement by covariant phantom parameters** (the later chapter's `covariant`,
   Q3Phantom). Keeps static tracking without breaking the instantiation rule. Commits
   Pavol to: covariance in the code generator's class hierarchy and in the interpreter
   (both measured missing), and to formulas for result flags that Fortress cannot compute
   at the type level without the spec's boolean static-parameter arithmetic.
3. **Refinement by coercion between sibling types** (route A's own mechanism). Each
   refined type a sibling with coercions to its coarser ones. *Blocking*: coercion does not
   chain (conversions-coercions.tex:127-130), so the lattice needs a coercion for every pair.
   *How the library gets around it elsewhere*: the compiled prelude lists every pair (`ZZ`
   coerces all four fixed widths, CompilerBuiltin.fsi:103-108). Commits Pavol to eighteen
   types per base and 72 coercions among the eighteen rationals alone (one for each pair in
   which one type's flags are a subset of the other's, numbers-advanced.tex:29-46).
4. **One bool-parameterised trait with a generic coercion under a where-clause**
   (`coerce[\bool lt', ...\](x: RationalQuantity[\..., lt', ...\]) where { lt' -> lt, ... }`).
   *Blocking*: where-clauses unsupported (conversions-coercions.tex:15), and walk cannot
   instantiate a trait with a where-clause (measured). Commits Pavol to where-clauses in the
   checker and both back ends.
5. **The spec as written, the rule relaxed for it.** Excluded by the fixed ground.
6. **Drop the refinements from the standard library chapters**, keep the text as
   history, and leave precondition-style refinement to contracts (`requires`). Commits Pavol
   to a smaller library chapter and no implementation work.

**Reading (mine).** Way 1, with the advanced chapter preserved word for word and marked as
the 1.0-era design the type group's rule and the later Types chapter superseded, and the basic
chapters' subtype lists replaced by the check methods the library already has. Way 2 is the
one that keeps the designers' ambition inside their own later rules, and the probes show
how far the implementations are from it; nothing in the microGPT goal asks for it.
