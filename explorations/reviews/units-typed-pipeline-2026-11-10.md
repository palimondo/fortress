<!-- A study for Pavol, 2026-11-10, at eed02564c9: what Fortress specified and built for dimensions and units, microGPT's flat program stage by stage, and five ways to put each stage's kind of value into its type, with the work each needs. Reading only: no build or run. -->

# Units, and a typed microGPT pipeline

## 1. Units: specified, parsed, never checked

Your memory is right. The other models repeat the design, not the code.

**Specified.** Four chapters, about 1K lines of TeX. The specification's own list of features "not yet supported" names "dimensions and units" (`Specification/fortress/preamble.tex:92`), and the chapter opens: "Dimensions and units are not yet supported. The examples in this chapter are not tested nor run by the interpreter." (`Specification/basic/dimensions.tex:15-17`).

A dimension is a kind of quantity (`Length`). A unit is a measure of it (`meter`). The specified code:

```
dim Length SI_unit meter meters m_
x: RR64 Length = 1.3 m_
t: RR64 Time = 5 s_
v: RR64 Velocity = x / t
```

The promise (`basic/dimensions.tex:206-215`): `x + t` is a static error; `x / t` divides the units; `sin` and `log` "require dimensionless arguments".

**What is in the tree**, layer by layer. The measurements are those of `explorations/aliases-units-report.md` (2026-08-27). Its probe files are no longer on disk; they are in git, in the parent of `e879b6a44` (gap ledger rows 26 and 27).

- Library: four shelved files in `Library/incomplete/basic/`: SI units (118 lines), English units (69), information units (15) and Potrzebie, a joke system (120). No program can import them.
- Parser: all three declaration forms and the type `RR64 Length` parse (`parser/OtherDecl.rats:29-99`). Two defects: a bare `dim Length` is refused (row 27), and a list of unit names swallows the next declaration.
- Syntax tree: complete (`astgen/Fortress.ast:336-354`, `:1101-1213`).
- Checker: it indexes the declarations (`IndexBuilder.scala:184-185`), then throws on the first `dim` (`impls/Misc.scala:199`). The cases for dimension types sit in a comment, "Not yet implemented..." (`TypeWellFormedChecker.scala:404-412`). Any two dimensions compare as equal (`types/TypeAnalyzer.scala:381-382`).
- Walk: a `dim` or `unit` declaration is skipped by a stub (`BuildEnvironments.java:1107-1110`). A type `RR64 Length` stops walk: "Can't EvalType" (`EvalType.java:320`). `m_` is an undefined variable; `in` is no operator.
- Code generator: no case. A program stops in the checker first.
- Tests: one, `ProjectFortress/tests/dimensionUnitDecl.fss`. It declares five units and prints "Hello, World!". No test multiplies a meter by a second. No demo uses units.

**Since August.** I read the same files today. No commit since has touched `OtherDecl.rats`'s rule, the stubs, the comment block or the shelved files. Line numbers moved (`forDimUnitDecl` from 996 to 1107). Every finding above should still hold; none was run again.

**Who and when** (git, full history):

- Sukyoung Ryu wrote the parsing: "Implemented syntax and parsing: 1) dimension and unit declarations" (2007-08-12), revised "with Dan" (2007-08-29), and again 2008-01-26. She copied the SI library "from the spec" (2007-08-18).
- Eric Allen "Added checks on dimensions and units to disambiguator" (2008-02-08): names only.
- Jan-Willem Maessen moved the unit libraries to `incomplete` (2008-03-24). They never came back.
- Nobody wrote a unit check in the remaining four years.

## 2. The pipeline, on the program's lines

All lines are `explorations/run-c4/src/MicroGptFlat.fss` unless named. The program trains only. It has no sampling stage: its last stage is the loss. Sampling exists in an earlier program (`explorations/microgpt2.fss:406`).

Today's types are three: `Array[\ZZ32,ZZ32\]` (a list of integers), `Array[\RR64,ZZ32\]` (a list of floats), `Array[\RR64,(ZZ32,ZZ32)\]` (a matrix of floats).

1. **Characters to tokens** (`FlatData.fss:119-124`). In: a file of names. Out: one integer per character, `names[d][j].codePoint - 'a'.codePoint`, so `a` is 0 and `z` is 25. 26 marks the start and the end. "ada" becomes 26, 0, 3, 0, 26, 26, ... up to 17 slots.
2. **A batch to keys** (line 52). In: `b`, document numbers. Out: `ids` (the token at each of 16 positions), `tg` (the token one place later, the answer to predict), `pos` (0 to 15). All four have the same type, `Array[\ZZ32,ZZ32\]`.
3. **Tokens to vectors** (line 57): `x = gather(wte, ids) + gather(wpe, pos)`. `wte` is a table of 27 rows by 16 numbers, one row per token. `gather` picks row `ids[r]` for each position. `wpe` (16 by 16) does the same per position. Out: 16 rows of 16 floats. `rows(rmsn, x)` then scales each row to a root mean square of 1 (line 27).
4. **Attention** (lines 58-60). Each position asks a question of the earlier positions.
   - `q = x1 wq^T`, `k`, `v`: three 16 by 16 products give each position a query, a key and a value. `h` cuts each into 4 heads of width 4.
   - `qh kh^T`: a 16 by 16 grid of scores. Entry (i, j) is the dot product of position i's query with position j's key.
   - `mask +` adds −10^10 where j > i (line 29), so no position sees a later one.
   - `rows(sm, …)`: each row of scores becomes weights that sum to 1 (softmax, stage 6).
   - `a vh`: each position's output is the weighted average of the values. `x2 = xp + hc wo^T` adds it to the input.
5. **The perceptron** (line 60): `m0 = x3 f1^T` widens 16 to 64; `0.0 MAX m0` zeroes the negatives; `x4 = x2 + mr f2^T` narrows back to 16 and adds.
6. **Softmax to probabilities** (line 61): `pr = rows(sm, x4 lm^T)`. `x4 lm^T` gives 27 scores per position, one per token. `sm` (line 28) on the scores (1, 2, 3): subtract the largest, (−2, −1, 0); `exp`, (0.135, 0.368, 1); divide by their sum: (0.090, 0.245, 0.665). Larger score, larger share; the sum is 1.
7. **The loss** (line 61): `pick(pr, tg)` reads the probability given to the true next token. `loss` is minus the mean of its logarithm.

**What today's types let through.** `gather(wte, pos)`, `pick(pr, ids)`, `sm_b(dy, p)` with its arguments swapped (line 34), scores added to probabilities, `wk` where `wq` stands. And as written the program does not pass the checker at all, because its arrays carry no size (PLAN, phase 5, first bullet). Under walk there is no static check of any kind.

## 3. Five ways to type it

A size says how many. A kind says what: token or position, scores or probabilities. No way below gives both alone.

**Way 1. Sizes in the types.** A `nat` is a size the type carries.

```
sm[\nat s\](z: Vector[\RR64,s\]): Vector[\RR64,s\]
gather[\T extends Number, nat r, nat c, nat k\](m: Matrix[\T,r,c\], ks: Vector[\ZZ32,k\]): Matrix[\T,k,c\]
rows[\nat r, nat c\](f: Vector[\RR64,c\] -> Vector[\RR64,c\], m: Matrix[\RR64,r,c\]): Matrix[\RR64,r,c\]
```

Catches: `x3 f2^T` (inner sizes 16 and 64 differ), a 27-wide row where 16 is wanted. Does not catch: any kind. Nor block length against embedding width: both are 16 here (line 17), and sizes compare by number.

This is the parked change that phase 5 points to: `explorations/reviews/decision-d-diff.md`. It is written: 21 model lines out, 29 in, no operator changed, 24 checker errors down to 12.

**Way 2. Type aliases.** Specified: `type IntList = List[\ZZ64\]`, "expanded before type checking"; they "do not define new types" (`basic/types-vals-vars.tex:612-623`).

```
type Tokens = Array[\ZZ32,ZZ32\]
type Scores = Array[\RR64,ZZ32\]
type Probs  = Array[\RR64,ZZ32\]
sm(z: Scores): Probs
gather(m: Table, ks: Tokens): Rows
```

Catches: nothing. `Scores` and `Probs` are one type. The signature explains; the checker does not enforce. Like Swift's `typealias`.

**Way 3. A carrier object per kind.** An object that wraps the array. An object excludes every other object, so a mix-up is an error.

```
object Probs(v: Array[\RR64,ZZ32\]) end
object Scores(v: Array[\RR64,ZZ32\]) end
object TokenIds(v: Array[\ZZ32,ZZ32\]) end
sm(z: Scores): Probs
pick(m: ProbRows, ks: TokenIds): Array[\RR64,ZZ32\]
```

Catches: `pick(pr, pos)`, scores passed as probabilities, swapped `sm_b`. Cost: every operator a carrier needs is declared again per carrier, or once on a shared trait. `explorations/microgpt2.fss:59-71` did this for `ProbDist` and counted the lines. Like a Swift `struct` wrapper. Each stage boundary allocates one object.

**Way 4. One generic carrier with a kind parameter.** The kind is a type argument that no field uses.

```
trait Kind end
object Score extends Kind end
object Prob extends Kind end
object V[\K extends Kind, nat n\](a: Vector[\RR64,n\]) end
opr +[\K extends Kind, nat n\](x: V[\K,n\], y: V[\K,n\]): V[\K,n\]
sm[\nat n\](z: V[\Score,n\]): V[\Prob,n\]
```

Catches: all of way 3, and sizes as way 1. `+` is written once and keeps the kind. No probe has run it; gap ledger row 28 shows only that an object with a `nat` parameter and a checked `+` runs under walk.

**Way 5. Units.** The team's own form of way 4: the kind is a `unit` parameter, and `absorbs unit` moves it inside a vector (`advanced/defining-dimensions.tex:364-427`).

```
dim Score; dim Prob
sm[\nat n\](z: Vector[\RR64 Score,n\]): Vector[\RR64 Prob,n\]
opr SQRT[\unit U\](x: RR64 U^2): RR64 U
```

The last line is the specification's (`basic/trait-parameters.tex:147-149`). Catches: what way 4 catches, with no wrapper. But the rules fit physics, not this model:

- `exp` and `log` take only dimensionless arguments, so `sm`'s body, `exp(z - (BIG MAX z))`, needs a conversion.
- `rmsn` divides a row by its own size, so its result has no unit.
- A product multiplies units. `x1 wq^T` is well-typed only if `wq` has the unit Query per Embedding.

## 4. How they weigh

- For a fast microGPT, only way 1 matters: the compiled path needs sizes to pass the checker, and sized classes let the JIT drop bounds checks. It is already on the plan.
- For a signature that explains, way 2 is the cheapest and the team's own. It checks nothing.
- For a static error on a wrong connection, ways 3 and 4 work with the language as built. Way 3 costs duplication. Way 4 costs one unproven probe.
- Way 5 is the famous one and the worst fit. It is the largest work, and half its rules must be turned off for this model.
- Ways 1 and 2 combine: `type Probs[\nat n\] = Vector[\RR64,n\]`. So do 1 and 4.

## 5. What is not built, in rungs

A rung is one worker's task, test first. Walk runs no checker until the switch-over, so under walk no way gives a static error: ways 3 and 4 fail at the call, at run time; ways 1, 2 and 5 are skipped or erased. The static error needs the compiled path.

- **Way 1: 0 new rungs.** Phase 5 already holds the work: the library's dead sizes, the checker opening a size known only at run time, a few small items (`decision-d-diff.md`, section 1).
- **Way 2: 2 to 3 rungs.** One: the index builder's refusal (`IndexBuilder.scala:187`) becomes an expansion; the checker's expansion is already written and unreachable (`TypeAnalyzer.scala:703-705`). Both paths run that builder (FACTS, F-182). Two: walk's stub (`BuildEnvironments.java:1098-1104`). Three, optional: aliases in a `where` clause. Small because nothing downstream changes.
- **Way 3: 0 rungs of language, 1 to 2 of model.** Every model line changes, each shown to you as a diff.
- **Way 4: 1 probe rung, then 1 to 2 of model.** The risk is the code generator's known gaps on generic functional methods (PLAN, phase 5, its code generator bullet).
- **Way 5: 10 to 14 rungs for the model's subset, about 20 for the chapters.** By part:
  - parser, the two defects: 1;
  - units and dimensions as names in the checker: 1 to 2;
  - the algebra, products and powers of dimensions brought to one form and compared: 3;
  - inferring a `unit` parameter at a call: 3, the hard part, since it solves equations, not matches;
  - `absorbs unit` on `Vector` and `Matrix`: 2;
  - walk and the code generator erase the unit: 2.
  - Beyond the model: unit values and `in` (2), `SI_unit` prefixes (1), the four library files (2), the specification's text (1).
