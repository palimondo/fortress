# The feed-forward block and the loss
> The second half of the forward pass: a block that works on each row alone, the 27 scores of each position, their probabilities, and the one number that says how wrong the model is.

## The feed-forward block

@src 60: x3 = rows(rmsn, x2)
@src 60: m0 = x3 f1^T
@src 60: mr = 0.0 MAX m0
@src 60: x4 = x2 + mr f2^T

These four declarations are the rest of line 60. They form the model's second block. The project's note on Karpathy's program calls it the "relu MLP" ([explorations/microgpt-port.md, line 10](src:explorations/microgpt-port.md#L10)), and the files of its two matrices are named `mlp_fc1` and `mlp_fc2`. This text calls it the feed-forward block.

- `x3` is `x2` with `rmsn` on every row. It is the third and last use of `rmsn` in the forward pass.
- `m0` puts every row of `x3` through `f1`, a matrix of 64 by 16. Each row of 16 numbers becomes a row of 64 numbers.
- `mr` replaces every negative number of `m0` by 0. `MAX` is the operator that gives the larger of two values. Between a number and an array, the library applies it to every element ([Library/FortressLibrary.fsi, line 2877](src:Library/FortressLibrary.fsi#L2877)).
- `x4` puts every row of `mr` through `f2`, a matrix of 16 by 64, which brings it back to 16 numbers. Then it adds the result to `x2`. This is the second residual connection: the block's result is added to the block's input.

A run printed the sizes, how many of the 1,024 numbers of `m0` are positive, and the first six numbers of row 1 before and after `MAX`:

```out
sizes x2 (16,16) m0 (16,64) mr (16,64) x4 (16,16)
m0 positive count 466 of 1024
m0[1,0..5] = 0.4039325142253399 -0.5951570653200444 0.0782116940127397 -0.13886643064580534 0.16013754453254497 0.01747112558184824
mr[1,0..5] = 0.4039325142253399 0.0 0.0782116940127397 0.0 0.16013754453254497 0.01747112558184824
```

The project's note on Karpathy's program calls the step from `m0` to `mr` relu ([explorations/microgpt-port.md, line 10](src:explorations/microgpt-port.md#L10)), and the project's port of his program has a method of that name ([explorations/microgpt.fss, line 26](src:explorations/microgpt.fss#L26)). The step is small, and the block needs it. Without it, the block would be `x3 f1^T f2^T`. A product of two matrices is one matrix, so the two weight matrices together could do nothing that a single matrix of 16 by 16 cannot do. With `MAX` between them, which of the 64 numbers pass depends on the row. A different row has a different set of numbers set to 0, and `f2` then mixes a different set.

The two blocks have different jobs. Attention moves numbers between positions. The feed-forward block works on each position alone, on what attention brought to it.

## From a row to 27 probabilities

@src 61: pr = rows(sm, x4 lm^T)

`x4 lm^T` puts every row of `x4` through `lm`, the matrix of 27 by 16. Each position now has 27 numbers, one for each token. They are scores: any size, any sign. The project's port of Karpathy's program names them `logits` ([explorations/microgpt.fss, line 152](src:explorations/microgpt.fss#L152)).

`rows(sm, ...)` turns each row of scores into probabilities, as Part 3 showed. `pr` is a matrix of 16 by 27. Its element in row `r` and column `t` is the model's probability that the token `t` comes next after position `r`. This matrix is the model's answer.

For row 0, where the model has read only the mark, a run printed the 27 scores, the 27 probabilities and their sum:

```out
logits[0,:] = 0.004672150870404096 0.23893370562835142 0.54273938074588 -0.47743749413539854 0.3506727149458196 -0.00748917592317001 -0.07539966591725165 0.17804521053652556 0.03749227900355961 0.43885563636769087 0.45944460664209064 0.38395621169312166 -0.3505202376471033 0.08480164237680175 0.6743234081198666 -0.09427786135225502 0.022368188896042654 -0.5364918679753164 0.5516588833653321 -0.06448593156812074 0.30599851245840715 -0.15184283111504923 -0.06835113212479514 0.3685106199964408 -0.16789102800718136 0.47675347918273325 0.0372628450359727
pr[0,:] = 0.03156561234767023 0.03989814637170121 0.05406221651821286 0.019491113937640234 0.04461494422826998 0.031184057430077232 0.029136640166798254 0.03754128913510591 0.032618787933432834 0.04872790172411539 0.049741558309249846 0.04612487406375373 0.022128711377271702 0.03419904783898089 0.06166518866069535 0.02859175241063206 0.03212917028903099 0.01837340598762871 0.05454658153634847 0.02945637127400787 0.042665672440197096 0.02699234559212658 0.029342736243926183 0.04541792179448082 0.02656262446278745 0.050610022991898776 0.03261130493395935
sum pr[0,:] = 1.0
```

- The highest score is the fifteenth, 0.674, for the token 14, `o`. Its probability is 0.0617.
- The lowest score is -0.536, for the token 17, `r`. Its probability is 0.0184.
- The right answer for row 0 is `y`, the token 24. Its score is -0.168 and its probability is 0.0266.

With equal probabilities, each token would have 1 in 27, which is 0.037. The untrained model is close to that, and it puts `y` a little below.

## The loss

@src 61: loss = -(vm DOT log(pick(pr, tg))) / nv

The loss is one number that says how wrong `pr` is. Read the line from the inside out.

`pick(pr, tg)` takes from each row of `pr` one element: the one in the column that `tg` names for that row. That is the probability that the model gave to the right answer.

@src FlatArrays.fss 176-178

A small case, with the 3 by 2 matrix `x` of Part 2, whose rows are 5, 6 and 1, 0 and 0, 1, and the keys 1, 0, 1:

```out
pick(x, [1 0 1]) (3): 6.0 1.0 1.0
```

In the step, a run printed:

```out
pick(pr,tg) = 0.02656262446278745 0.04017214587408415 0.028414895439496417 0.028956162103254975 0.04622320937199633 0.039261608101615705 0.03672337977848549 0.0349450358489196 0.024151667584315476 0.029294432906131603 0.03222500877833893 0.024508992299195932 0.02184420601149411 0.029300476079837403 0.03684945998367594 0.02893787421043008
```

The first number is the 0.0266 for `y` in row 0. The first seven numbers belong to the seven questions of `yuheng`. The last nine belong to rows that do not count.

`log` is the natural logarithm, the reverse of `exp`: `log(exp(t))` is `t`. The logarithm of 1 is 0. The logarithm of a number between 0 and 1 is negative, and the smaller the number, the further below 0. The vocabulary declares `log` for arrays, element by element. The run printed the logarithms with the sign changed:

```out
-log pick = 3.6282501466505988 3.214581412219856 3.5608417840041575 3.5419722443055854 3.0742732396794525 3.237508130666618 3.3043416755676898 3.3539788561866484 3.723401850157102 3.5303577842157106 3.4350124577491985 3.708715196151209 3.823819563703278 3.530151514632506 3.3009143148998694 3.5426040155413685
```

So each row gets a penalty: minus the logarithm of the probability that it gave to the right answer. A probability of 1 gives the penalty 0. A probability of one half gives 0.69. The 0.0266 for `y` gives 3.63.

`vm DOT ...` is the dot product with the vector of ones and zeros from Part 1. It adds the values of the seven rows that count and leaves the other nine out:

- 3.628 plus 3.215 plus 3.561 plus 3.542 plus 3.074 plus 3.238 plus 3.304 is 23.562.

The minus sign in front makes the sum positive, and `/ nv` divides it by 7:

```out
loss = 3.365966947584851   log 27 = 3.295836866004329
```

$$
\c{loss} = -\frac{1}{\c{nv}} \sum_{r} \c{vm}_r \,\log \c{pr}_{r,\,\c{tg}_r}
$$

- $r$ runs over the 16 rows.
- $\c{pr}_{r,\,\c{tg}_r}$ is the element of `pr` in row $r$ and in the column `tg[r]`: the vector `pick(pr, tg)`.
- $\c{vm}_r$ is 1 for a row that counts and 0 for the others.
- The sum over $r$ of a product is the dot product, `DOT`.

The loss is the mean penalty of the rows that count. The project's write-up of run B describes the same loss in words: "the average, over positions, of the negative log-probability the model assigned to the token that actually came next" ([explorations/run-b/article.md, line 75](src:explorations/run-b/article.md#L75)). This text recalls cross-entropy as the field's name for this loss, and found the name in no file of the tree.

The second number of the output is a value to compare the loss with. A model that gives each of the 27 tokens the same probability has the penalty `log(27)` in every row, 3.296. The untrained model starts at 3.366, a little worse than equal probabilities. A model that gave every right answer the probability 1 would have the loss 0. The project's note on a run of Karpathy's program records losses between 2.26 and 2.65 at steps 200 to 1,000, each on a different name ([explorations/microgpt-port.md, lines 144 and 145](src:explorations/microgpt-port.md#L144)).

## The forward pass on one page

@fig forward | The stages of the forward pass. The two lines at the left are the residual connections.

Lines 57 to 61 are the whole forward pass: five lines. The figure leaves out one step, the cut of `q`, `k` and `v` into heads. Each stage is a matrix with one row for each position, except `a`, which has one plane for each head, and the loss, which is one number.
