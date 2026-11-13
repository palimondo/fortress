# Backward: the gradient
> What a gradient is, shown by changing one parameter and watching the loss. Then the few rules that the backward pass uses, and lines 62 to 72, each beside the forward declaration that it goes back through.

## What the gradient is

The loss depends on all 4,192 parameters. Change one parameter a little, and the loss changes a little. The gradient is a vector of 4,192 numbers. Its entry for a parameter is a rate: the change of the loss for each unit of change of that parameter, while the others stay as they are.

A run shows this on parameter 500. It lies in `wpe`, which starts at 432: it is element `[4, 4]` of the position table. Its value is 0.0626. The step's gradient has -0.0926 at place 500. The run then called `step` twice more: once with parameter 500 raised by 0.00001, once with it lowered by 0.00001.

```out
index 500 p 0.06258901428847981 g -0.09262792010673876 loss+ 3.365966021326099 loss- 3.365967873884501 fd -0.09262792011188735
```

- With the parameter raised, the loss is 3.365966021.
- With the parameter lowered, the loss is 3.365967874.
- The difference is -0.000001853, for a change of 0.00002 in the parameter. The rate is the first divided by the second: -0.09262792011, printed after `fd`.
- The gradient's entry, printed after `g`, is -0.09262792011. The two agree to nine digits.

The entry is negative: raising this parameter lowers the loss. Training uses exactly this fact. It moves each parameter against the sign of its gradient entry.

The same experiment on parameter 1100, which is element `[25, 12]` of `lm`:

```out
index 1100 p 0.03654080103626847 g 0.031736131393025356 loss+ 3.3659672649481087 loss- 3.3659666302254805 fd 0.03173613141171927
```

Here the entry is positive: raising the parameter raises the loss.

The experiment needs two forward passes for one parameter. For all the parameters that is 8,384 forward passes. The backward pass gets all 4,192 entries at once, with about as much work as one more forward pass. Its usual name is backpropagation.

Karpathy's microGPT does not write a backward pass. In it, every number is an object that remembers how it was computed, as in his micrograd, and the gradient follows from those records. The flat program has no such objects. Its backward pass is written out by hand, in lines 63 to 70.

## The names and the rules

@src 62

The comment states the plan. The backward pass takes the forward declarations in reverse order, from the loss back to the embeddings.

The names follow one pattern. For a forward value such as `x4`, the backward value `dX4` has the same size, and each of its elements is a rate: the change of the loss for each unit of change of the same element of `x4`. This text calls `dX4` the gradient at `x4`. For a weight matrix such as `lm`, the gradient is named `gLM`. The nine `g` matrices are the pieces of the result.

At every forward declaration, the backward pass knows the gradient at the declared value and computes the gradient at the values that it was made from. Four rules are enough.

Rule 1, a chain: rates multiply. Suppose `y` is 3 times `x`, and the loss is 2 times `y`. One unit more of `x` gives 3 units more of `y`, and that gives 6 units more of the loss. The rate at `x` is the rate at `y` times 3.

Rule 2, a value used twice: rates add. If `x` goes into two later values, the loss changes through both, and the gradient at `x` is the sum of the two parts.

Rule 3, a sum: the gradient passes through. If `y` is `a + b`, one unit more of `a` is one unit more of `y`. The gradient at `a` is the gradient at `y`, and so is the gradient at `b`.

Rule 4, a product of matrices. If `Y` is the product `A B`, then the gradient at `A` is `dY B^T`, and the gradient at `B` is `A^T dY`.

$$
Y = A\,B
\qquad\Longrightarrow\qquad
\begin{aligned}
dA &= dY\,B^{\top} \\
dB &= A^{\top}\,dY
\end{aligned}
$$

The smallest case of rule 4 uses numbers from Part 2. Let `A` be the one row 5, 6 and `B` the one column 1, 3. Their product is one number: 5 times 1, plus 6 times 3, is 23. Let the loss be that number, so `dY` is 1.

- Raise the 5 by one unit: the product rises by 1, the element of `B` that the 5 meets. Raise the 6: the product rises by 3. So the gradient at `A` is the row 1, 3. That is `B^T`.
- Raise the 1 by one unit: the product rises by 5. Raise the 3: it rises by 6. So the gradient at `B` is the column 5, 6. That is `A^T`.

A larger product is many such sums. Each element of `A` enters several elements of `Y`, and by rule 2 its parts add. Written out, the additions give the two formulas above. The sizes are a check that you can make at every line: `dY B^T` has the size of `A`, and `A^T dY` has the size of `B`.

## From the loss to the scores

@src 63: dL = diag(vm / nv) (pr - onehot(tg, vocabSize))

`dL` is the gradient at the 27 scores of every row, the matrix `x4 lm^T` that the forward pass handed to `sm`. The line goes back through two forward steps at once, the loss and `sm`, because together they have a simple gradient: for a row that counts, the probabilities, minus 1 at the right answer, divided by `nv`.

`onehot(tg, vocabSize)` is a matrix of 16 by 27. Row `r` holds 1.0 in the column `tg[r]` and 0.0 elsewhere. A small case, with the keys 1, 0, 1 and a width of 3:

```out
onehot([1 0 1], 3) (3 x 3):
    0.0 1.0 0.0
    1.0 0.0 0.0
    0.0 1.0 0.0
```

`pr - onehot(...)` subtracts it from the probabilities. The operator `-` between two matrices of one size is the library's.

`diag(vm / nv)` stands for a matrix of 16 by 16 that has the vector `vm / nv` on its diagonal and 0 elsewhere. Its product with a matrix multiplies row `r` of that matrix by element `r` of the vector. Here the element is one seventh for the seven rows that count and 0 for the others. A small case, with the vector 10, 100, 0 and the matrix whose rows are 5, 6 and 1, 0 and 0, 1:

```out
diag(d3) x (3 x 2):
    50.0 60.0
    100.0 0.0
    0.0 0.0
```

`Diag` is an object of the vocabulary that extends `Matrix`. It never builds the 16 by 16 matrix: it has its own method for the product, which scales the rows ([FlatArrays.fss, lines 33 to 44](src:explorations/run-c4/src/FlatArrays.fss#L33)).

A run printed row 0 of `dL`, its sum, and the start of row 9:

```out
dL[0,:] = 0.004509373192524319 0.005699735195957315 0.007723173788316122 0.002784444848234319 0.006373563461181426 0.00445486534715389 0.004162377166685465 0.00536304130501513 0.004659826847633262 0.00696112881773077 0.007105936901321407 0.00658926772339339 0.003161244482467386 0.004885578262711555 0.008809312665813621 0.004084536058661723 0.00458988146986157 0.0026247722839469584 0.007792368790906924 0.004208053039143981 0.006095096062885299 0.003856049370303797 0.004191819463418026 0.006488274542068688 -0.1390624822196018 0.007230003284556968 0.004658757847708478
sum dL[0,:] = 0.0
dL[9,0..3] = 0.0 0.0 0.0 0.0
```

- The first number is the probability of the token 0 in row 0, 0.0316, divided by 7.
- The twenty-fifth number belongs to `y`, the right answer. It is 0.0266 minus 1, divided by 7: -0.1391. It is the only negative number of the row.
- Row 9 does not count, and its gradient is 0.

Read the row as an instruction: to lower the loss, raise the score of `y` and lower every other score, each in proportion to its probability.

$$
\c{dL}_{rt} = \frac{\c{vm}_r}{\c{nv}}\,\bigl(\c{pr}_{rt} - [\,t = \c{tg}_r\,]\bigr)
$$

- $r$ is the row and $t$ the token.
- The square bracket is 1 where the statement inside it is true and 0 where it is false. It is the matrix `onehot(tg, vocabSize)`.

Three numbers from Part 3 confirm the formula. The scores 1, 2, 3 give the probabilities 0.0900, 0.2447, 0.6652. Suppose the first is the right answer. A run raised the second score by one millionth and measured the change of the first probability: the rate was -0.02203. The penalty is minus the logarithm of the first probability, and the logarithm's rate at 0.0900 is 1 divided by 0.0900. So the penalty changes at the rate 0.02203 divided by 0.0900, which is 0.2447: the second probability, as the formula says.

## Back through lm

@src 63: gLM = dL^T x4
@src 63: dX4 = dL lm

The forward declaration is `x4 lm^T`. In rule 4, `A` is `x4`, `B` is `lm^T`, and `dY` is `dL`.

- The gradient at `A` is `dY B^T`. The transpose of `lm^T` is `lm`. So `dX4 = dL lm`.
- The gradient at `B` is `A^T dY`, which is `x4^T dL`. That is the gradient at `lm^T`. The gradient at `lm` itself is its transpose, and the transpose of `x4^T dL` is `dL^T x4`.

Seven of the nine weight matrices enter the forward pass in this form, and their `g` lines all have this shape: the transposed gradient of the result, times the input. A run printed the sizes:

```out
sizes dL (16,27) gLM (27,16) dX4 (16,16)
```

`gLM` has the size of `lm`, and `dX4` the size of `x4`.

## Back through the feed-forward block

@src 64: gF2 = dX4^T mr
@src 64: dM0 = (dX4 f2) × (m0 > 0.0)
@src 64: gF1 = dM0^T x3
@src 64: dX3 = dM0 f1

The forward declarations were `m0 = x3 f1^T`, `mr = 0.0 MAX m0` and `x4 = x2 + mr f2^T`. The backward line takes them last to first.

- `gF2` is rule 4 for `mr f2^T`: the transposed gradient of the result, times the input `mr`.
- `dX4 f2` is the other half of rule 4: the gradient at `mr`.
- `× (m0 > 0.0)` goes back through `MAX`. Where an element of `m0` was positive, `mr` is that element, and the rate passes unchanged. Where it was negative, `mr` is 0 whatever the element does, and the rate is 0. `m0 > 0.0` is an array of ones and zeros: the vocabulary declares `>` between an array and a number so. `×` is the vocabulary's product of two arrays element by element. It is a different operator from juxtaposition, which between matrices is the matrix product.
- `gF1` and `dX3` are rule 4 for `x3 f1^T`.

@src 65: dX2 = dX4 + rows(rmsn_b, dX3, x2)

`x2` was used twice in the forward pass: `x4` adds it directly, and `x3` is `rmsn` of it. By rule 2 its gradient has two parts. The first is `dX4`, by rule 3. The second goes back through `rmsn`, row by row, with the function of the next section. This `rows` is the form with two matrices: it gives the function row `i` of the first and row `i` of the second ([FlatArrays.fss, lines 148 to 153](src:explorations/run-c4/src/FlatArrays.fss#L148)).

## rmsn_b: back through rmsn

@src 30-33

`rmsn_b` takes `dy`, the gradient at the result of `rmsn`, and `x`, the vector that `rmsn` was applied to. It returns the gradient at `x`.

- Line 31 computes again what `rmsn` computed: the root `r`, and the result `y`.
- Line 32 is the gradient. It has two parts, because a change of one element of `x` does two things.
- First, the element's own result changes: `y` is `x / r`, so one unit more of an element is `1 / r` more of its result. This part is `dy / r`.
- Second, the root `r` grows a little, and that shrinks every element of `y`. This part is the term that line 32 subtracts: `y`, times the number `(y DOT dy) / |y|`, divided by `r`.

In line 32, `y (...)` is a vector beside a number: juxtaposition multiplies every element.

$$
\begin{aligned}
\c{rmsn\_b}(dy,\,x) &= \frac{1}{r}\Bigl(dy - y\,\frac{y \cdot dy}{n}\Bigr) \\[4pt]
r &= \sqrt{\varepsilon + \frac{1}{n}\sum_i x_i^2}
\qquad y = \frac{x}{r}
\end{aligned}
$$

- $dy$, $x$, $r$ and $y$ are the names of the code.
- $y \cdot dy$ is `y DOT dy`, and $n$ is `|y|`.

A check on the vector 3, 4, whose `rmsn` is 0.8485, 1.1314. Ask for the gradient of the first result alone: `dy` is 1, 0.

```out
rmsn_b([1 0], [3 4]) (2): 0.18101934503466863 -0.13576433907057767
fd d rmsn[0] / d x[0] = 0.18101931242853198
```

The first number says: one unit more of the 3 raises the first result at the rate 0.1810. The second line is a measurement: the run raised the 3 by one millionth and divided the change of the first result by one millionth. The second number of the first line says that one unit more of the 4 lowers the first result. The vector grows, the root grows, and the first element's share shrinks.

## Back through attention

The forward declarations, from last to first, were `x2 = xp + hc wo^T`, `hc = u(a vh)`, `a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim))`, the cut into heads, and the three products with `wq`, `wk` and `wv`.

@src 65: gWO = dX2^T hc
@src 65: dh = h(dX2 wo)

These are rule 4 for `hc wo^T`. `dX2 wo` is the gradient at `hc`. The forward pass made `hc` by putting four planes side by side with `u`, so the backward pass cuts the gradient into four planes with `h`. `dh` is the gradient at `a vh`.

@src 66: dVh = a^T dh
@src 66: dS = rows(sm_b, a, dh vh^T) / SQRT (1.0 headDim)

`a vh` is a product, plane with plane, so rule 4 applies in every plane, with `A` as `a` and `B` as `vh`.

- The gradient at `B` is `A^T dY`: `dVh = a^T dh`.
- The gradient at `A` is `dY B^T`: `dh vh^T` is the gradient at the weights `a`.

The weights came from `sm`, row by row. `rows(sm_b, a, dh vh^T)` goes back through it, row by row, with the function `sm_b` below. The result is the gradient at the masked scores. The mask was added, so by rule 3 it changes nothing. The scores were divided by `SQRT (1.0 headDim)`, so by rule 1 the gradient is divided by it too. `dS` is the gradient at `qh kh^T`.

@src 34

`sm_b` takes `p`, a row of weights that `sm` returned, and `dy`, the gradient at those weights. It returns the gradient at the scores that `sm` was given.

$$
\c{sm\_b}(p,\,dy)_j = p_j\,\bigl(dy_j - p \cdot dy\bigr)
$$

- $p \cdot dy$ is `p DOT dy`, one number.
- `dy - (p DOT dy)` subtracts that number from every element, and `×` multiplies element by element with `p`.

The form comes from what `sm` does. One unit more of score `j` raises weight `j` and lowers every other weight, because the weights must still add up to 1. The check uses the three numbers of Part 3 once more. Ask for the gradient of the first probability alone: `dy` is 1, 0, 0.

```out
sm_b(p, [1 0 0]) (3): 0.08192506906499324 -0.022033044520174298 -0.05989202454481893
fd d p[0] / d z[1] = -0.0220330501482513
```

The second number says: one unit more of the second score lowers the first probability at the rate 0.02203. The second line is the measurement of the same rate, with the second score raised by one millionth.

In the model, a run printed the start of one row of `dS` and the row's sum:

```out
dS[0,3,:] = -8.376664044184177E-5 8.88923859449681E-5 -1.558747564367834E-5 1.046173014055203E-5 0.0 0.0
sum dS[0,3,:] = 2.0328790734103208E-20
```

The positions that the mask hid have the weight 0 in `p`, so their gradient is 0. The row's sum is 0 up to rounding: raising all the scores of a row by the same amount changes no weight, as Part 3 showed.

@src 67: dQh = dS kh
@src 67: dKh = dS^T qh

The scores were `qh kh^T`. In rule 4, `A` is `qh` and `B` is `kh^T`.

- The gradient at `A` is `dY B^T`: `dS kh`.
- The gradient at `B`, which is `kh^T`, is `A^T dY`: `qh^T dS`. The gradient at `kh` is its transpose: `dS^T qh`.

@src 67: (dQ, dK, dV) = (u(dQh), u(dKh), u(dVh))

The forward pass cut `q`, `k` and `v` into heads with `h`. The backward pass puts the three gradients together again with `u`. `dQ`, `dK` and `dV` are matrices of 16 by 16.

@src 68: (gWQ, gWK, gWV) = (dQ^T x1, dK^T x1, dV^T x1)
@src 68: dX1 = dQ wq + dK wk + dV wv

These are rule 4 three times, for `x1 wq^T`, `x1 wk^T` and `x1 wv^T`. `x1` went into all three products, so by rule 2 its gradient is the sum of three parts.

## Back to the two tables

@src 69: dXp = dX2 + rows(rmsn_b, dX1, xp)
@src 69: dX = rows(rmsn_b, dXp, x)

`xp` was used twice: `x2` adds it directly, and `x1` is `rmsn` of it. So `dXp` has two parts, as `dX2` had. Then `dX` goes back through the first `rmsn`. It is the gradient at `x`, the summed embeddings.

@src 70: gWTE = transpose(onehot(ids, vocabSize)) dX
@src 70: gWPE = transpose(onehot(pos, blockSize)) dX

Row `r` of `x` was row `ids[r]` of `wte` plus row `pos[r]` of `wpe`. So the gradient at row `t` of `wte` is the sum of the rows of `dX` at which the token `t` was read. The product in line 70 computes exactly that. `onehot(ids, vocabSize)` has a 1 in row `r` and column `ids[r]`. Its transpose has 27 rows and 16 columns, with a 1 in row `t` wherever the token `t` was read. Its product with `dX` adds up those rows of `dX`.

A run printed the starts of some rows:

```out
gWTE[24,0..3] = 0.02444797853510436 0.10385342691476042 -0.11380900808712022 0.13270155741575465
gWTE[0,0..3] = 0.0 0.0 0.0 0.0
gWPE[1,0..3] = 0.02444797853510436 0.10385342691476042 -0.11380900808712022 0.13270155741575465
gWPE[9,0..3] = 0.0 0.0 0.0 0.0
dX[1,0..3] = 0.02444797853510436 0.10385342691476042 -0.11380900808712022 0.13270155741575465
dX[9,0..3] = 0.0 0.0 0.0 0.0
```

- The token `y`, 24, was read once, in row 1. So row 24 of `gWTE` is row 1 of `dX`.
- The token `a`, 0, does not occur in `yuheng`. Row 0 of `gWTE` is 0: this step says nothing about the embedding of `a`.
- Position 1 belongs to row 1 alone, so row 1 of `gWPE` is also row 1 of `dX`.
- Row 9 of `dX` is 0. Row 9 does not count in the loss, and no row that counts reads it, because of the mask. So row 9 of `gWPE` is 0.

!!! limit
Lines 63 to 68 write a transpose as `^T`. Line 70 writes `transpose(...)`, a function call. The cause is the operand: it is the result of a call. Under walk, a call cannot be followed by `^T`, with or without parentheses around it (the gap ledger's rows 144 and 158). Row 144 reads the specification as forbidding the form without parentheses; row 158 records the form with parentheses as a gap of walk.
!!!

## The result

@src 71-72

The value of the step is a pair: the loss, and the nine gradient matrices made into one vector. `flat` belongs to the vocabulary. It takes any number of matrices and writes their elements, row after row, into one vector ([FlatArrays.fss, lines 179 to 189](src:explorations/run-c4/src/FlatArrays.fss#L179)). A small case, with the matrices `m` and `n` of Part 2:

```out
flat(m, n) (8): 1.0 2.0 3.0 4.0 0.0 1.0 1.0 0.0
```

The nine arguments stand in the order of the layout table. So the gradient has the layout of `p`: entry 500 of the gradient belongs to parameter 500.

A run printed the sizes of the backward values, and counted the entries of the gradient that are exactly 0:

```out
sizes gF2 (16,64) dM0 (16,64) gF1 (64,16) gWO (16,16) dh (4,16,4) dVh (4,16,4) dS (4,16,16) dQh (4,16,4) dQ (16,16) gWQ (16,16) dX (16,16) gWTE (27,16) gWPE (16,16)
zero gradient entries 464
```

The 464 zeros can be counted by hand. `yuheng` uses seven tokens: the mark and six letters. The other twenty rows of `gWTE` are 0: 20 times 16 is 320 entries. The name fills positions 0 to 6. Rows 7 to 15 of `gWPE` are 0: 9 times 16 is 144 entries. 320 plus 144 is 464.
