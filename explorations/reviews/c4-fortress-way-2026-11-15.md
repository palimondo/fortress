<!-- A review for the curator's notes of 2026-11-15 on the microGPT walk-through (`explorations/microgpt-walk/notes-export-2026-11-15.txt`, notes 1 to 5, 7 and 15): each limit of today's tree that shapes a line of microGPT's flat program (C4), with the specification's sentence, the ledger row, a run of the terse form under walk and an estimate in rungs; each of his points on the program's design against the specification, the library's source and the team's demos; three sketches of a C4 closer to the team's way; and the small diffs that are right today. Written 2026-11-15 by a Fable worker on `main` at `e472857685`. Nothing in the program, the library or the walk-through was changed. Every run was under walk, on copies under other component names, with a private caches folder; the probes are scratch and are quoted here. -->

# C4 against the Fortress way

Words used below.

- **C4**: microGPT's flat program, `explorations/run-c4/src/MicroGptFlat.fss`.
- **The vocabulary**: `FlatArrays.fss` beside it, the array operations that C4's lines call.
- **Walk**: the interpreter. **The compiled path**: the compiler to JVM bytecode. **The checker**: the compiled path's static type checker. Walk checks no static types.
- **A size**: a `nat` static parameter, a number inside a type, as the 16 in `Vector[\RR64,16\]`.
- **A rung**: one worker's task in a batch. I count one rung for a repair in one place of one area.
- **Row N**: row N of the gap ledger.

## The answer in short

1. No limit that the walk-through boxes is fixed and left unused. Every one is open today. I ran each terse form under walk: each fails as its row says.
2. Three limits are the language, not gaps: a call followed directly by `^T` (row 144), `/` on two integers giving an exact fraction (row 174), and a variable as a size (row 25).
3. Climb batch 31 removes two: the tuple bindings of lines 17 to 19 (row 988) and `1.0 s` of line 82 (row 989).
4. The rest are 16 to 18 rungs. 13 to 14 of them are in the parser, walk or the library, and do not wait for the switch-over.
5. Why C4 is not touched: your decisions P-87 (a model line changes only by a diff shown to you), P-85 (the array decisions return after the switch-over) and P-29 (no edit for speed before it compiles). No benchmark is behind it.
6. One vector with nine views: this is Hsu's layout, taken on purpose (P-9, the Run C brief). The team's demos do not pack. The view objects themselves are the library's way.
7. Sizes through `reflect`: you are right that every size of the step is fixed by a numeral somewhere up the call chain. A small sized model ran under walk with no `reflect`. But a size cannot be read from a variable: `mk[\vocabSize, nEmbd\]()` is refused. The hyperparameters would become static parameters, written once as numerals. That meets P-9's tuple form.
8. `replica`: the views do what the library promises. `replica` makes a fresh empty array of the same shape. `copy` copies. But all eight `replica` lines are redundant: the library's traits give the same body. C4 ran the same without them.
9. `rows` and `tabulate`: `tabulate` calls a function at each index and gets one element. `rows` gets a whole row from a function. So one `tabulate` does not do it. But `rows` declares `r` and `c` and then reads the sizes at run time. That is a habit. With its own sizes it ran the same.
10. `matCount` and `matOffset`: a matrix does have `|m|` and `m.sizes`. These two exist to place the views before any matrix exists. They go if the nine matrices are separate.
11. `gather` is the embedding lookup. The library has none (F-156). The specification's form for it is an array comprehension, which is not built (row 50).
12. Diffs right today: delete line 14; `SQRT headDim` in lines 59 and 66; in the vocabulary, `rows` and `gather` with their own sizes, and the eight `replica` lines out. Section 4.
13. Seven questions for you are in section 6.

## 1. The limits, one by one

For each: the line today, the line without the limit, the specification's sentence, the row's status, what the run under walk printed today, and what stands between.

### 1.1 Lines 17 to 19: the tuple bindings (row 988)

```fortress
(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)
```

- This line is already the terse form. The limit is on the compiled path only.
- The specification allows it: `Specification/basic/variables.tex`, "Top-Level Variable Declarations".
- Row 988: open, a gap of the checker. Row 474 is its second half.
- Under walk it runs today.
- Climb batch 31's rung D repairs both rows. No more is needed.

### 1.2 Lines 27 to 34 and 51: arrays without sizes in their types (row 156, decision D)

```fortress
rmsn(x: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = x / SQRT (epsilon + (x DOT x) / |x|)
```

Without the limit:

```fortress
rmsn[\nat n\](x: Vector[\RR64,n\]): Vector[\RR64,n\] = x / SQRT (epsilon + (x DOT x) / |x|)
...
xp = rows(rmsn, x)
```

- The specification: a function may carry "a nat parameter s0, which appears in both the parameter type and return type" (`Specification/basic/trait-parameters.tex:94-97`). And a reference to a generic function need not write its static arguments: "most identifier references do not include them; the static arguments are statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:35-40`).
- Row 156: open, a gap of walk. Row 758 is its twin in the checker, which crashes on a generic function passed as a value.
- My run: `app(half[\3\], v)` printed `[0#3][ 1.0 1.0 1.0 ]`. `app(half, v)` died with a Java `NullPointerException`. So with the size written the form runs today, and without it it does not.
- What stands between: walk gives a generic function value a type (1 rung). The checker infers the static argument from the parameter type that receives the function (1 to 2 rungs; the inference chapter does not describe this context yet, `Specification/basic/inference.tex:201-205`). Then decision D's diff, which is drafted and parked (`explorations/reviews/decision-d-diff.md`): 21 model lines out, 29 in.
- Batch 31 does not touch it.

### 1.3 Lines 21 to 24: `^T` declared in the model (row 133)

```fortress
opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]: Matrix[\RR64,c,r\] = transpose(m)
```

- Without the limit, these four lines leave the model. The declaration stands once in `FlatArrays.fsi`, and the function `transpose` is not needed.
- The specification allows it. Its grammar for an api's operator is `opr AbsValParam (Op | ExponentOp | ^)` (`Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:737-738`).
- Row 133: open, a gap of the parser. The api's rule lacks one `/` that the component's rule has (`ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:171` against `:141`).
- My run: the declaration in a `.fsi` file gave `Syntax Error` at the next line's first column.
- 1 rung, small. It is not against the specification. Batch 31 does not touch it.

### 1.4 Lines 37 to 41: the layout table as `if` chains (row 142)

```fortress
matShape(i: ZZ32): (ZZ32, ZZ32) =
    if (i = 0) OR (i = 2) then (vocabSize, nEmbd) elif i = 7 then (4 nEmbd, nEmbd) ...
```

Without the limit, a table:

```fortress
shape: ZZ32[9,2] = [27 16; 16 16; 27 16; 16 16; 16 16; 16 16; 16 16; 64 16; 16 64]
```

- The specification: "Array element expressions are enclosed in brackets", and the type "can be abbreviated as `T[n0, ..., n(k-1)]`" (`Specification/basic/expressions/aggregate.tex`, "Array Expressions").
- Row 142: open, a gap of walk.
- My run: `shp: ZZ32[3] = [27 16 27]` at the top level gave `Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) ... to shp (type Array1[\ZZ32,0,3\])`. Without the type, `shp = [27 16; 16 16; 27 16]` binds a tuple of tuples, and `shp[2,0]` gave `Non-object receiver`.
- 1 rung in walk. The table then holds numerals, not `vocabSize` and `nEmbd`, unless the elements may be names; that is one more thing to try in the rung.
- Batch 31 does not touch it.

### 1.5 Line 43: `SUM[\ZZ32\]` (row 731)

```fortress
matOffset(i: ZZ32): ZZ32 = SUM[\ZZ32\][j <- 0#i] matCount(j)
```

Without the limit: `SUM[j <- 0#i] matCount(j)`.

- The specification gives the form without the brackets (`Specification/basic/expressions/reductions.tex`).
- Row 731: open, a gap of the checker. It is not fixed. Walk infers the type. The checker does not, because `SUM`'s bound names its own parameter.
- My run under walk: `off(4)` printed 60 and `off(0)` printed 0. C4's copy with the brackets removed printed the same five losses.
- It is not a diff for today: your decision P-78 writes the argument until the checker is repaired, and PLAN places that repair before microGPT compiles (`explorations/coordinator/PLAN.md:106`).
- 1 rung in the checker. Batch 31 does not touch it.

### 1.6 Line 45 and the views: sizes through `reflect` (row 307)

```fortress
view[\nat s\](p: Vector[\RR64,s\], off: ZZ32, nr: ZZ32, nc: ZZ32): Array[\RR64,(ZZ32,ZZ32)\] =
    viewN(p, off, reflect(nr), reflect(nc))
```

- `reflect(n)` turns an integer that is known only when the program runs into a size.
- Without the limit, the line could stay. But the line needs no run-time size at all: section 2.3.
- The specification now states the rule (`Specification/basic/trait-parameters.tex`, the sentence on a trait whose `comprises` clause lists a type at a `where`-clause size). The Working Draft was silent. The team's own comment in `ProjectFortress/LibraryBuiltin/NatReflect.fsi` describes the device.
- Row 307: open. The checker accepts the call (F-270). The compiled code fails the JVM's verification.
- Under walk it runs today.
- Batch 31's rung K only runs row 307's test after its own cast repair, and builds nothing more for it. Compiled programs also do not link `NatReflect` before the switch-over. So batch 31 does not remove this limit for C4. I estimate 1 rung after the switch-over, or none if the sizes become static.

### 1.7 The product of two rank-3 arrays, written in the vocabulary (row 292)

- The walk-through's box names no row. It is row 292: the library gives an array with three indices no algebra at all.
- The specification promises matrices and vectors only (`aggregate.tex`, "Array Expressions"). So this is a library gap by your rule P-27, not a gap against the text.
- 1 rung in the library, with the plane and its transpose.

### 1.8 Line 70: `transpose(onehot(...))` where other lines write `^T` (rows 144 and 158)

```fortress
gWTE = transpose(onehot(ids, vocabSize)) dX
```

- `onehot(ids, vocabSize)^T dX` is refused by the language: "It is a static error if either the argument is not parenthesized, or the argument is immediately followed by a non-expression element" (`Specification-1.0-frozen/basic/operators/juxtameaning.tex:156-162`). Row 144 is a design limit, not a gap.
- `(onehot(ids, vocabSize))^T dX` is allowed by the grammar. Row 158: open, a gap of walk.
- My run: both forms gave `Syntax Error: ... should not be immediately followed by a non-expression element.`
- The library's own method runs today in that place: `onehot(ids, vocabSize).t() dX` (row 301).
- 1 rung in walk for row 158. Batch 31 does not touch it.

### 1.9 Line 82: `1.0 s` (rows 989 and 174)

```fortress
learningRate(s: ZZ32): RR64 = lr0 (1 - (1.0 s) / nSteps)
```

- `s / nSteps` is an exact fraction, a `QQ`. That is the language's rule (row 174, deliberate). So some conversion to a float is part of the line in any tree.
- Row 989: open, a gap of the checker, which cannot choose between two products for `1.0 s`. Walk runs it.
- Batch 31's rung N repairs row 989.

### 1.10 Lines 88 to 90: the type on a mutable variable (row 177)

```fortress
p: Array[\RR64,ZZ32\] := loadParams(weightsDir, matName, 9, nParams())
```

Without the limit: `var p = loadParams(weightsDir, matName, 9, nParams())`.

- The grammar allows it: `LocalVarDecl ::= [var] VarMayTypes = Expr` (`Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:1125-1128`).
- Row 177: open, a gap of the parser's checks.
- My run: `var p = 3` gave `The type of p is required.`
- 1 rung. Batch 31 does not touch it.

### 1.11 `FlatData`: its own float reader and line scanner (rows 140 and 141)

- Row 140: open, a bug of the library. My run: `strToFloat("-1.5")` printed `-28.5`, and a number of 17 digits died with `IntegerOverflow`.
- Row 141: `split` on a string is not a tokenizer by its own api comment. My run: `"a b  c".split()` gave 0 pieces. The row's class is "deliberate". What is missing is a library function that cuts a string at spaces.
- The specification is silent on both.
- 1 rung each, in the library. `parseFloat` then moves there (P-27).

### 1.12 `SUM` in capitals, not `∑` (row 5)

- The specification's grammar has `∑` as an accumulator (`Specification/basic/expressions/reductions.tex:20`).
- Row 5: open, a gap of the parser. My run: `∑[i <- 1#3] i` gave `Operator prefix SUM is not defined.`
- 1 rung, small.

### 1.13 Limits that the walk-through does not box, and that shape lines

- **Array comprehensions (row 50).** The specification has them: `[(i, j) ↦ e | i ← ..., j ← ...]` (`Specification/basic/expressions/comprehensions.tex:101-115`), under the note "Array comprehensions are not yet supported." They would be the form of `mask` (line 29) and of the vocabulary's `gather`, `onehot` and `pick`. Open, on both paths. About 2 rungs.
- **`^T` after a field (row 84).** `p.wq^T` is a `Syntax Error`. It matters for a C4 with its matrices as fields of an object. My run confirmed it. Open, a gap of the parser. 1 rung.
- **A slice is not a vector (row 54).** `m[i,:]` is the library's row of a matrix, but it is an `Array1`, not a `Vector`, so `x DOT x` fails on it. My run confirmed it. This is why the vocabulary has its own `RowView`. A design limit of the library. 1 to 2 rungs.
- **A variable as a size (row 25).** Section 2.3. This is the language.

### 1.14 The count

- The language, no repair: rows 144, 174, 25.
- Batch 31: rows 988 (with 474) and 989.
- Parser: rows 133, 177, 5, 84. 4 rungs, each small.
- Walk: rows 156, 142, 158. 3 rungs.
- Library: rows 140, 141, 292, 54. 4 to 5 rungs.
- Both paths: row 50. 2 rungs.
- Checker: rows 731 and 758 with the inference of 1.2. 2 to 3 rungs.
- After the switch-over: row 307. 1 rung, or none.

That is 16 to 18 rungs. The parser, walk and library ones, and row 50, are 13 to 14, and none of them waits for the switch-over.

## 2. Your points, one by one

### 2.1 "Were these fixed already and we are just not touching C4?"

- No. Each row above is open today, and each terse form failed in my runs.
- Two things in C4 are forced by nothing: the import of line 14, and `1.0 headDim` in lines 59 and 66. Section 4.
- What holds C4 still is three decisions of yours. P-87: a change of a model line is shown to you as a diff first, and nothing of decision D is applied before microGPT compiles. P-85: the array decisions return after the switch-over. P-29: C4 is not edited for speed before it runs compiled.
- The plan's order is the switch-over (phase 4, live), then "microGPT compiles" (phase 5), where decision D and row 731 stand. So the notation's repairs are planned late. Question 1 of section 6 asks whether you want them first.

### 2.2 One parameter vector with nine views, against several arrays

**What the team's text says.**

- The specification says nothing on packing parameters. Its arrays are "complex data structures" that the library spreads over the machine (`Specification/advanced/parallelism-locality/arrays-distributed.tex:18-22`).
- The team's demos keep each array as its own value. `conjGrad.fss` passes a matrix `A` and a vector `x`. `mm.fss` builds eight separate `ZZ32[8,8]` blocks. `mg.fss` wraps one array in an object, `Grid3`. No demo packs several matrices into one vector.
- A view is the library's way. The library's `TransposedMatrix`, `Row`, `Col` and its sub-arrays are objects with `get` and `put` over another array (F-157). The team's demo `lutx.fss` writes two of its own, `Lower` and `Upper`.

**What the program does.** One vector `p` of 4,192 floats. Nine `PView` objects read and write slices of it. The gradient is nine matrices, copied into one vector by `flat` at the end of each step.

**Where it comes from.** From Hsu, on purpose. The Run C brief fixed the layout (`explorations/reviews/c4-flatarrays-review.md`, section 2). The source is `explorations/apl/reference/hsu-flat/HANDOVER-HSU.md`: tactic 2, "nine weight matrices ... → one parameter vector", and tactic 8, views. P-9 states it: C4's "data layout follows Aaron Hsu's flat style of APL".

**Verdict.** The views are the library's way. The packing is carried over from APL. It is not a workaround for any limit.

**What the packing costs and buys in the text.**

- It costs lines 37 to 45 (the layout table and `view`), line 53 (nine calls of `view`), the vocabulary's `PView`, `viewN`, `view` and `flat`, and the `reflect` calls.
- It buys Adam as three whole-vector lines (77 to 79), a loader that fills one vector, and a check that perturbs one index.
- In APL a reshape of a slice is one primitive. In Fortress it is an object and a table. So the layout that is short in APL is long here.

### 2.3 Sizes passed at run time through `reflect`, against static sizes

**What the team's text says.**

- "Static parameters may include one or more nat and int parameters ... These parameters are instantiated at runtime with numeric values" (`Specification/basic/trait-parameters.tex`, "Nat and Int Parameters").
- Two factories stand side by side: `array[E](size)`, "of the specified runtime-determined size", and `array1[E,n]()`, "of statically determined size n" (`arrays-distributed.tex`, the figure of the factories).
- The library opens a run-time size with `reflect` in exactly one kind of place: its run-time factory, `array[\E\](x:ZZ32) = __arr1(__thrower[\E\],reflect(x))` (`Library/FortressLibrary.fss:2405`), and the slices built on it.
- The demos write sizes as numerals at the top and carry them as static parameters: `mkMatrix[\nat n\]() : RR64[n,n]`, called `mkMatrix[\50\]()` (`ProjectFortress/demos/conjGrad.fss`); `lutx[\nat n\](A:Matrix[\RR64,n,n\])`; `a : RR64[6,6] = matrix[\RR64,6,6\]()` (`lutx.fss`). `mg.fss` is the other kind: its grid size is a run-time value, and it uses `array[\RR64\](x, y, z)`. `conjGrad.fss` and `lutx.fss` ran under walk in my scratch folder today.

**What the program does.** The model's functions take the unsized `Array[\RR64,ZZ32\]`. The vocabulary's functions declare sizes (`rows[\nat r, nat c\]`), then read `m.sizes` at run time and call `array[\RR64\](n, d)`, which calls `reflect`. `view`, `heads` and `unheads` call `reflect` themselves.

**Is a run-time size needed?** No. Every size in `step` is a product of hyperparameters and the batch size, and each of those is a numeral at some call. The only lengths that the data fixes are the corpus (2,000 documents) and the lines of the weight files.

**A run.** A small model with every size static ran under walk: an object of three sized matrices, `gather`, `rows(rmsn[\H D\], x)`, a product, and a heads view typed `Array3[\RR64,0,B H,0,T,0,D\]`, with no `reflect` and no `NatReflect` import. `step[\1,4,2,3,5\](p, ids, ids)` printed `x (4,6)  q (4,6)  qh (2,4,3)`.

**Two things the language does not give you.**

- "The hyperparameters ... should propagate to matrix static dimensions via constant folding." A size is a static expression, and those are built from numerals, static parameters and operators (`Specification/basic/expressions/constant.tex`, "Static Expressions and Values": "Static parameters are static expressions"). A variable is not one. My run: with `(nEmbd, vocabSize) = (16, 27)`, the call `mk[\vocabSize, nEmbd\]()` gave `vocabSize is undefined.` Row 25 records this as a design limit of the specification. Folding works on numerals: `mk[\4 16, 16\]()` is a 64 by 16 matrix. So the hyperparameters that are sizes would be static parameters, written once as numerals: `train[\16, 4, 4, 27\]()`.
- Walk could not infer the batch size from `Vector[\ZZ32,B T\]`: the call without static arguments gave `Cannot unify __DefaultVector[\ZZ32,4\] with Vector[\ZZ32,B T\]`. A size that stands only inside a product is written at the call.

**Verdict.** A chain of workarounds, plus a habit. Row 156 kept the four vector functions unsized. The unsized arrays then need the run-time factory, and the run-time factory is `reflect`. The habit: the vocabulary reads `m.sizes` where it already holds `r` and `c`. It is not carried from APL. The record has this way as D4 of `explorations/reviews/array-design-ways.md`, "every size static from the top", noted there as not measured.

### 2.4 `replica` in the views

**What the library promises.** "Create a fresh array structurally identical to the present one, but holding elements of type U" (`Library/FortressLibrary.fsi:1598-1600`). And on `Array1`: "returns a replica of the array (similar layout etc.) but with a different element type" (`:1744-1746`). So `replica` is empty on purpose. `copy` is the one that copies, and the library writes it with `replica`:

```fortress
copy():Array1[\T,b0,s0\] = replica[\T\]().tabulate(fn (i:ZZ32):T => get(i-b0))
map[\R\](f:T->R): Array1[\R,b0,s0\] = replica[\R\]().tabulate(fn (i:ZZ32):R => f(get(i-b0)))
```

(`Library/FortressLibrary.fss:2640-2647`.) `map` needs an empty array of another element type. That is what `replica` is for.

**How the library's own views do it.**

- `TransposedMatrix`: `replica[\U\]() = mem.replica[\U\]().t()`. It asks its base, then transposes (`FortressLibrary.fss:3127`).
- The sub-arrays, `Row` and `Col` declare none. They take the trait's default, a fresh dense array of their own bounds (`:2638`, `:2919`).
- The team's demo: `replica[\U\]():Matrix[\U,n,n\] = mem.replica[\U\]()` in `Lower` and `Upper` (`ProjectFortress/demos/lutx.fss:34`, `:48`). And `conjGrad.fss` uses it as intended: `z: Vec := x.replica[\Elt\]().fill(0)`.

**A run.** `a.copy()` gave back the element 4.0. `a.t().replica[\RR64\]()` had the sizes `(2,2)`, and reading its element died with `Access to uninitialized element 0`.

**What the program does.** Each view returns a fresh dense array of its shape: `replica[\U\](): Array2[\U,0,r,0,c\] = array2[\U,r,c\]()`.

**Verdict.** The library's way. Your reading of the contract was mistaken: an empty result is the contract. But you found something real beside it. The eight lines are redundant. `Array2`'s default is `__builtinFactory2[\U,b0,s0,b1,s1\]()`, which at base 0 is `array2[\U,s0,s1\]()` (`FortressLibrary.fss:2919`, `:3145`); `Array1`'s and `Array3`'s defaults do the same for their ranks. A copy of C4 with all eight lines deleted printed the same five losses.

### 2.5 `rows`: a factory and an imperative loop, against `tabulate`

```fortress
rows[\nat r, nat c\](f: Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\], m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\] = do
    (n, d) = m.sizes
    out = array[\RR64\](n, d)
    for i <- 0#n do (row(out, i)).assign(f(row(m, i))) end
    out
  end
```

**What the team's text says.** `a.tabulate(f)` "calls f at each index and initializes the corresponding element with the result of the call" (`arrays-distributed.tex`, the figure). The function gets one index and gives one element.

**So one `tabulate` is not `rows`.** `f` here takes a whole row and gives a whole row. `tabulate` on the result matrix would call `f` once for each element, 16 times for a row of 16.

**Two forms from the library's own pieces, both run today.**

```fortress
(* the library's row slice *)
for i <- 0#n do (out[i,:]).assign(f(m[i,:])) end

(* tabulate twice: the rows, then the elements *)
rs = array[\Array[\RR64,ZZ32\]\](n).tabulate(fn (i: ZZ32): Array[\RR64,ZZ32\] => f(m[i,:]))
array[\RR64\](n, d).tabulate(fn (i: ZZ32, j: ZZ32): RR64 => (rs[i])[j])
```

- Both printed the right matrix for a function that doubles a row.
- Both failed for `rmsn`: `m[i,:]` is a `Row`, not a `Vector`, so `x DOT x` found no overload (row 54). The vocabulary's `RowView` extends `Vector` for this reason. F-157 also holds a measurement under walk: the library's slice took five times as long as the six-line view (row 298).
- `rs[i][j]` without the parentheses fails under walk (row 1).

**The loop.** `for` in Fortress is parallel. The library's own `fill` and `tabulate` are written the same way: `for i <- zeroIndices() do init0(i,f(toIndex(i))) end` (`FortressLibrary.fss:2585-2592`). Each task writes its own row, which the memory model allows.

**Verdict.** You are right about the sizes and not about `tabulate`. `rows` declares `r` and `c`, ignores them, reads `m.sizes` and goes through the run-time factory. That part is a habit. `RowView` is a workaround for row 54. The loop is the library's way. With decision D the result type becomes `Matrix[\RR64,r,c\]`, and the function is this, which ran today with the same losses (the result type left as it is):

```fortress
    out = matrix[\RR64,r,c\]()
    for i <- 0#r do (row(out, i)).assign(f(row(m, i))) end
    out
```

### 2.6 `matCount` and `matOffset`

- "Doesn't a matrix have something inherited from Array that just tells the array's size?" Yes: `|m|` is the number of elements and `m.sizes` the pair. In my run a view of 3 by 2 printed `6 (3,2)`.
- They are not used here because no matrix exists yet when they are called. `matOffset(i)` says where in the vector view `i` starts. It is needed to make the view.
- They are Hsu's two tables. His hand-over calls it "lesson 1 data hiding is a myth: the offset/shape tables and the corpus build are visible code" (`HANDOVER-HSU.md`).
- **Verdict.** Carried over from APL, as a part of the one-vector layout. With nine separate matrices, `matShape`, `matCount`, `matOffset`, `nParams`, `view` and `flat` all go. With the vector kept and sized views, the offsets remain, as numerals or size expressions.

### 2.7 `gather`

```fortress
gather[\T extends Number, nat r, nat c, nat k\](m: Matrix[\T,r,c\], ks: Vector[\ZZ32,k\]): Array[\T,(ZZ32,ZZ32)\] = do
    (nr, nc) = m.sizes
    array[\T\](|ks|, nc).tabulate(fn (i: ZZ32, j: ZZ32): T => m[ks[i], j])
  end
```

- Your reading in note 7 is right: it copies the rows of `m` that the keys name, in the order of the keys, into a new matrix. In line 57 it is the embedding lookup. No bit mask is involved.
- It is a matrix operation in its types already: it takes a `Matrix` and a `Vector` of keys. It uses `tabulate`.
- The library has no such operation: F-156, "The interpreter's library declares no reshape, plane, gather, outer product or ravel over its arrays."
- The specification's form is an array comprehension (row 50, not built):

```fortress
x = [(i, j) ↦ wte[ids[i], j] | i ← 0#(B T), j ← 0#E]
```

- **Verdict.** A library gap. The name is from array languages; the operation is ordinary indexing. By P-27 it belongs in the library. Like `rows`, it holds `k` and `c` and reads the sizes at run time.

### 2.8 `Vector` and `Matrix` against plain `Array`

- The specification: "An array of two dimensions whose elements are a subtype of Number is a matrix", and "A one-dimensional array whose elements are a subtype of Number is a vector" (`aggregate.tex`, "Array Expressions").
- The library declares `+`, `-`, `DOT` and the products on `Vector` and `Matrix` only, with sizes that must agree: `opr DOT[\T, nat n, nat m, nat p\](me: Matrix[\T,n,m\], other: Matrix[\T,m,p\]): Matrix[\T,n,p\]`.
- The demos write the sized types in their signatures: `RR64[n,n]`, `Vector[\ZZ32,n\]`, `ZZ32[8,8]`.
- C4's model writes `Array[\RR64,ZZ32\]` and `Array[\RR64,(ZZ32,ZZ32)\]` everywhere. At run time each of these arrays is a `Vector` or a `Matrix` object (F-229), and walk dispatches on the object. So the program runs, and its types say less than its values are. The checker sees only the types and refuses the products: 15 of C4's own checker errors were this (`decision-d-diff.md`, section 5).
- **Verdict.** A workaround for row 156 in the four functions passed to `rows`. Elsewhere a habit that walk does not punish. It is not from APL. Decision D is the repair.

### 2.9 Other things in the vocabulary that the library already has

- `transpose(m)` is `m.t()`. It exists only because of row 133.
- `vec`, `zeros`, `keys` and `mat` are one-line names for `array[\RR64\](n).tabulate(f)` and `.fill(0.0)`. With sizes they are the library's `vector[\RR64,n\]()` and `matrix[\RR64,r,c\]()`.
- `×` on two vectors is the library's `pmul`. The library has none for matrices (row 109).
- `flat` builds its result with a mutable offset and a sequential loop. It exists only for the one-vector layout.
- `+`, `-` and `MAX` between an array and a number are already left to the library (P-88).

### 2.10 The cache point of note 4

**Known.**

- The parameter vector is 4,192 floats, 33,536 bytes. Nine separate matrices hold the same 33,536 bytes.
- Your guess on alignment holds for the offsets. The nine views start at elements 0, 432, 688, 1120, 1376, 1632, 1888, 2144 and 3168 (the walk-through's printed values). Each is a multiple of 8 elements, which is 64 bytes. Each row is 16 or 64 elements, 128 or 512 bytes.
- On the compiled path every number is boxed today, and in Java models of the three kernels boxing costs 6.3, 6.5 and 2.6 times (F-11). An unboxed store alone buys nothing while each read still boxes (`array-design-ways.md`, question 2: 8.9 times against 6.4). P-17 and P-84 require both.
- No array kernel compiles yet (F-11). So nothing is measured on a compiled view.

**Guesses.**

- At 33 KB the whole model fits in a first-level or second-level cache either way. I expect no cache difference between one vector and nine matrices at these sizes.
- The JVM does not place an array's first element on a 64-byte boundary by default. So the offsets being multiples of 64 bytes does not make the rows line up with cache lines, in either layout.
- What I expect to matter is the read path. A view's `get` adds an offset and one more call: view, then vector, then store. The library's product calls `get` on whatever `Matrix` it is given. If one call site sees a dense matrix, a `PView`, a `TransposedMatrix` and a `Diag`, HotSpot may stop inlining it. Nine dense matrices give it one class.

## 3. What a better C4 could look like

Three shapes. Each fragment is a sketch, not a rewrite. "Ran small" means that a program of this shape with fewer matrices ran under walk today.

### Sketch 1: nine sized matrices in an object, every size static

```fortress
object Params[\nat T, nat H, nat D, nat V\](
        wte: Matrix[\RR64,V,H D\], wpe: Matrix[\RR64,T,H D\], lm: Matrix[\RR64,V,H D\],
        wq: Matrix[\RR64,H D,H D\], wk: Matrix[\RR64,H D,H D\], wv: Matrix[\RR64,H D,H D\],
        wo: Matrix[\RR64,H D,H D\], f1: Matrix[\RR64,4 H D,H D\], f2: Matrix[\RR64,H D,4 H D\])
end

step[\nat B, nat T, nat H, nat D, nat V\](p: Params[\T,H,D,V\], ids: Vector[\ZZ32,B T\], ...):
        (RR64, Params[\T,H,D,V\]) = do
    (wte, wpe, lm, wq, wk, wv, wo, f1, f2) = (p.wte, p.wpe, p.lm, p.wq, p.wk, p.wv, p.wo, p.f1, p.f2)
    x = gather(wte, ids) + gather(wpe, pos); xp = rows(rmsn, x); x1 = rows(rmsn, xp)
    (q, k, v) = (x1 wq^T, x1 wk^T, x1 wv^T)
    ...
    (loss, Params[\T,H,D,V\](gWTE, gWPE, gLM, gWQ, gWK, gWV, gWO, gF1, gF2))
  end

run(): () = train[\16, 4, 4, 27\]()     (* block, heads, head width, vocabulary *)
```

- The embedding width is written `H D`, heads times head width. Sizes are compared as written (P-55), so a separate parameter `E` would not be known to equal `H D`.
- Gone: `matName` as a layout, `matShape`, `matCount`, `matOffset`, `nParams`, `view`, `PView`, `flat`, every `reflect`, and the import of `NatReflect`.
- New: Adam needs `+`, `-`, a scalar product, `×`, `/` and `SQRT` on `Params`, each written over nine fields, or one `adam` on a matrix called nine times. This is where the lines come back.
- Ran small, with `rows(rmsn[\H D\], x)` and `step[\1,4,2,3,5\](...)`.
- What it needs from the tree: row 156 for `rows(rmsn, x)` without the size; row 84 if the lines should read `x1 p.wq^T`; on the compiled path rows 731, 988 and 989, the dead sizes of the library's api (decision E's E3, in `decision-d-diff.md`, section 5), and the unboxed arrays.
- It needs nothing of row 307.
- Compiled speed, a guess: the best of the three. Each matrix is its own dense store, one class at each `get`, no offset, no copy of the gradient.
- It changes P-9 in two places: the layout is no longer Hsu's, and the sizes leave the tuple of line 17. It also moves the target that the APL program expands into.

### Sketch 2: the parameter vector kept, sized views made once

```fortress
view[\nat s, nat r, nat c\](p: Vector[\RR64,s\], off: ZZ32, _: N[\r\], _: N[\c\]): Matrix[\RR64,r,c\] =
    PView[\s,r,c\](p, off)

object Model[\nat T, nat H, nat D, nat V, nat n\](p: Vector[\RR64,n\])
    wte: Matrix[\RR64,V,H D\] = view(p, 0, N[\V\], N[\H D\])
    wpe: Matrix[\RR64,T,H D\] = view(p, V H D, N[\T\], N[\H D\])
    ...
end
```

- `N[\r\]` is the library's object whose type carries a size and nothing else. It tells `view` the shape, since no argument does.
- Kept: Hsu's layout, Adam's three lines, `flat`, the loader.
- Gone: `reflect` in `view`; `matCount` and `matOffset` as functions (the offsets are size expressions, as `V H D`).
- Ran small: an object over a `Vector[\RR64, V E + E E\]` with two views as fields, products on them, and `|m.wte|` printing 6.
- What it needs: the same as sketch 1, less the new operators on `Params`. This is decision D with its two `reflect` bridges replaced by static sizes.
- Compiled speed, a guess: behind sketch 1, by the view's extra call and the copy in `flat`. Adam over one unboxed vector is the simplest loop of all three.

### Sketch 3: the vocabulary in the library's and the specification's forms

This one changes the vocabulary and few model lines. It can go with either sketch above, or with C4 as it is.

```fortress
(* in FlatArrays.fsi, once row 133 is repaired; lines 21 to 24 leave the model *)
opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]: Matrix[\RR64,c,r\]

(* array comprehensions, once row 50 is built *)
mask = [(i, j) ↦ (if j > i then -(10.0^10) else 0.0 end) | i ← 0#T, j ← 0#T]
gather(m, ks) = [(i, j) ↦ m[ks[i], j] | i ← 0#k, j ← 0#c]

(* a table, once row 142 is repaired *)
name: String[9] = ["wte" "wpe" "lm_head" "attn_wq" "attn_wk" "attn_wv" "attn_wo" "mlp_fc1" "mlp_fc2"]

(* line 70, once row 158 is repaired *)
gWTE = (onehot(ids, vocabSize))^T dX

(* the row lift over the library's slice, once a slice is a Vector (row 54) *)
for i <- 0#r do (out[i,:]).assign(f(m[i,:])) end
```

- Into the library by P-27: `gather`, `onehot`, `pick`, the rank-3 product with `plane`, `rows`, and a float reader that works.
- What it needs: rows 133, 50, 142, 158, 54, 292, 140. All are parser, walk or library work.
- Compiled speed: no effect that I can name. A comprehension and a `tabulate` are the same loop.

## 4. Diffs that are right today

None is applied. Each ran under walk on a copy; the five losses were `3.365966947584851`, `3.4242727838717717`, `3.177802125458052`, `3.0663556842241975`, `3.2208830897506235`, the oracle's values. The 40-check program was not run on the copies.

**Model, line 14.** Nothing of `System` is used; `nanoTime` is in `FortressLibrary` (`Library/FortressLibrary.fsi:2708`).

```diff
- import System.{...}
```

**Model, lines 59 and 66.** `SQRT` takes the integer and gives the float 2.0.

```diff
-     a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim)); hc = u(a vh)
+     a = rows(sm, mask + (qh kh^T) / SQRT headDim); hc = u(a vh)
-     dVh = a^T dh; dS = rows(sm_b, a, dh vh^T) / SQRT (1.0 headDim)
+     dVh = a^T dh; dS = rows(sm_b, a, dh vh^T) / SQRT headDim
```

`1.0 headDim` has the shape that row 989 refuses on the compiled path. The checker was not run on `SQRT headDim`: walk only, by my brief.

**Vocabulary, `rows` on a matrix (two declarations) and `gather`.** They use the sizes that they declare.

```diff
- (n, d) = m.sizes
- out = array[\RR64\](n, d)
- for i <- 0#n do (row(out, i)).assign(f(row(m, i))) end
+ out = matrix[\RR64,r,c\]()
+ for i <- 0#r do (row(out, i)).assign(f(row(m, i))) end
```

```diff
- (nr, nc) = m.sizes
- array[\T\](|ks|, nc).tabulate(fn (i: ZZ32, j: ZZ32): T => m[ks[i], j])
+ array[\T\](k, c).tabulate(fn (i: ZZ32, j: ZZ32): T => m[ks[i], j])
```

**Vocabulary, the eight `replica` lines** of `Diag`, `PView`, `RowView`, `Row3View`, `HeadsView`, `UnheadsView`, `PlaneView` and `Transposed3`: deleted. The traits' defaults give the same arrays.

**Not right today:** `SUM` without `[\ZZ32\]` in line 43. It runs under walk, and P-78 keeps the argument until row 731 is repaired.

## 5. For the record

**Defects.** No new defect. Two additions to rows that are full, so each needs a rewrite of its row, not a note (`ledger.py note ... --check` refused both for length):

- Row 142: an untyped literal is bound the same way. Top-level `shp = [27 16; 16 16; 27 16]`, then `shp[2,0]`, gives `Non-object receiver ((27,16),(16,16),(27,16))`.
- Row 989: `MicroGptFlat.fss:59` and `:66` write `1.0 headDim`, the same shape as `:82`. Row 474 hides them from the checker today. This is by reading, not by a run.

**Sentences of the specification made false.** None; nothing was changed.

**Decisions.** I estimated each rung count by the row's own account of its cause, not by a design. I took "right today" to mean: runs under walk with the same losses, and breaks no decision on record.

**For FACTS.**

- The eight `replica` methods of C4's view objects repeat the defaults of `Array1`, `Array2` and `Array3`; C4 gives the same five losses without them. Meaning: a view object over a `Vector`, `Matrix` or `Array3` at base 0 needs only `get`, `put` and `init0`. Shown by: a copy of C4 with the lines removed, run under walk, losses as in section 4. Detail: section 2.4.
- A model with every array sized and no `reflect` runs under walk when its sizes are written as numerals at the top call; a variable is refused as a size (`vocabSize is undefined.`), and walk does not infer a size that stands only inside a product. Meaning: way D4 of `array-design-ways.md` is open under walk today. Shown by: the probe of section 2.3. Detail: sections 2.3 and 3.
- Each limit boxed in the walk-through is open at `e472857685`; batch 31 as planned repairs rows 988, 474 and 989 only. Detail: section 1.

**Commands.** A walk run with a private caches folder, from the folder that holds the program: `FORTRESS_CACHES=<dir> JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=<tmp> -Dfortress.caches=<dir>" $FORTRESS_HOME/bin/fortress P.fss`, after writing four zero bytes to `<dir>/global.map`, as `explorations/coordinator/tools/mg-run.sh` does.

## 6. Questions for you

Each is a decision not taken. "Today" names the alternative that keeps the current state.

1. **Do the notation's repairs go before the switch-over's remaining work?** Sources: P-85 and P-87 (the array decisions and decision D after the switch-over), PLAN's phases 4 and 5, your words of 2026-11-15. Ways: (a) today: the switch-over first; (b) one batch now of the rungs that do not wait for it: rows 133, 142, 156 in walk, 158, 177, 5, 84, 140, 141, 292, and row 50 if you want comprehensions; (c) only the rungs that take lines out of the model: rows 133, 142, 156, 158, 177.
2. **One parameter vector, or nine matrices?** Sources: P-9 and the Run C brief (Hsu's layout, 2026-09); the team's demos, which do not pack; section 2.2. Ways: (a) today: the vector, with views; (b) sketch 2: the vector, with sized views made once; (c) sketch 1: nine sized matrices in an object. Way (c) changes P-9 and the target of the APL program.
3. **Do the sizes become static from the top?** Sources: the specification's two factories and the demos (section 2.3); decision D as drafted, which keeps run-time sizes behind two `reflect` bridges (2026-09-27); D4 of `array-design-ways.md` (2026-09-29). Ways: (a) today: unsized types, `reflect`; (b) decision D as drafted; (c) every size a static parameter, written as numerals once. Way (c) takes the sizes out of line 17's tuple, which P-9 fixes as the form, and fixes the batch size at each call.
4. **May decision D, or way (c) of question 3, be applied under walk before microGPT compiles?** P-87 says no today. The patched program ran 40 of 40 under walk on 2026-09-29.
5. **The diffs of section 4.** Apply the two to the model? Apply the three to the vocabulary? Today: none applied.
6. **Which vocabulary operations move into the library now?** P-27 says they belong there; none has moved. Candidates: `gather`, `onehot`, `pick`, `rows`, the rank-3 product with `plane`, the float reader. Today: all stay in `FlatArrays` and `FlatData`.
7. **Line 70.** Keep `transpose(onehot(...)) dX` until row 158 is repaired, or write the library's method now, `onehot(ids, vocabSize).t() dX`? Today: `transpose(...)`.
