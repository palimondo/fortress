# Two functions on a row: rmsn and sm
> Two small functions that the model calls again and again: one brings a row of numbers to a standard size, the other turns a row of scores into probabilities. Each is shown first on two or three numbers, then on a real row.

## rmsn: bring a row to a standard size

@src 26-27

Line 26 is the heading comment for lines 27 to 34. Lines 30 to 34 are the "backward" functions, which Part 6 reads.

Line 27 declares a function. The form is `name(parameter: Type): ResultType = expression`. This one takes a vector of floats and returns a vector of floats. The project's port of Karpathy's program names the function `rmsnorm` ([explorations/microgpt.fss, line 83](src:explorations/microgpt.fss#L83)). The letters stand for root mean square, which is what the line computes, as the steps below show.

Read the right side from the inside out, with the vector 3, 4 as `x`:

- `x DOT x` is the dot product of `x` with itself: 3 times 3, plus 4 times 4, is 25. It is the sum of the squares.
- `|x|` is the number of elements of `x`: 2. The two bars are an operator that encloses its operand. On an array it gives the size.
- `(x DOT x) / |x|` is 12.5: the mean of the squares.
- `epsilon + ...` adds 0.00001, the constant of line 18.
- `SQRT` is the square root, written as a prefix operator. The root of 12.50001 is 3.5355.
- `x / ...` divides every element of `x` by that root. An array divided by a number is an operator of the vocabulary ([FlatArrays.fss, line 27](src:explorations/run-c4/src/FlatArrays.fss#L27)).

A run printed the result, and then the mean of the squares of the result:

```out
rmsn [3 4] (2): 0.8485277980128058 1.1313703973504077
mean square of rmsn [3 4] = 0.9999992000006401
```

So the function divides a vector by the root of its mean square. After that, the mean square of the vector is 1, up to the small `epsilon`. The proportions of the elements stay: 0.8485 to 1.1314 is still 3 to 4.

The vector 30, 40 has the same proportions and ten times the size. Its result is almost the same:

```out
rmsn [30 40] (2): 0.8485281340297446 1.1313708453729927
```

That is the function's job in the model: it removes the overall size of a row and keeps what the numbers say in relation to each other. The project's write-up of run B gives the reason in these words: normalizing every position's vector "keeps the scale of the residual stream in check" ([explorations/run-b/article.md, line 39](src:explorations/run-b/article.md#L39)). This text did not test what the model does without it.

$$
\c{rmsn}(x) = \frac{x}{\sqrt{\varepsilon + \dfrac{1}{n}\displaystyle\sum_{i} x_i^2}}
$$

- $x$ is the parameter `x`, and $x_i$ is its element number $i$.
- The sum under the root adds the squares of all the elements. It is `x DOT x`.
- $n$ is `|x|`, the number of elements.
- $\varepsilon$ is `epsilon`. If every element of `x` were 0, the mean square would be 0, and the division would have no result. `epsilon` keeps the root above 0.

!!! limit
The parameter's type is `Array[\RR64,ZZ32\]`, a vector of any length. The library's own type for a vector of floats is `Vector[\RR64,n\]`, with the length `n` in the type. The model passes `rmsn` to another function, `rows`, in line 57. Under walk, a function whose type has a size parameter cannot be passed as an argument: the call fails (the gap ledger's row 156). So the four functions of lines 27 to 34 take the type without a size.
!!!

## rows: a function on every row

@src 57: xp = rows(rmsn, x)
@src 57: x1 = rows(rmsn, xp)

`rows` belongs to the vocabulary. It takes a function and a matrix. It applies the function to each row of the matrix and puts the results together as the rows of a new matrix. In Fortress a function is a value, so the first argument is the name `rmsn` and nothing more.

@src FlatArrays.fss 142-147

- The first parameter's type, `Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\]`, is the type of a function from a vector to a vector.
- Line 143 reads the matrix's two sizes into `n` and `d`. Line 144 makes the result matrix.
- Line 145 is the loop. `row(m, i)` is a view of row `i` of `m` as a vector. `f` turns it into a new vector. `row(out, i)` is a view of row `i` of the result, and `assign` copies the new vector into it.
- The range `0#n` is not wrapped in `seq`, so the turns of the loop may run in parallel. Each turn writes a different row of `out`, which is safe.
- Line 146 is the block's value: the filled matrix.

A small case, with the 3 by 2 matrix `x` of Part 2, whose rows are 5, 6 and 1, 0 and 0, 1:

```out
rows(rmsn, x) (3 x 2):
    0.9053573120059659 1.086428774407159
    1.4141994204496 0.0
    0.0 1.4141994204496
```

Each row has been divided by the root of its own mean square.

In the step, `x` is the 16 by 16 matrix of the summed embeddings. For its row 1, a run printed the mean square before and after:

```out
meansq x[1] = 0.01127520082084148  meansq xp[1] = 0.9991138837351009  meansq x1[1] = 0.9999899912311551
```

- The embeddings are small numbers: the mean square of row 1 of `x` is 0.0113.
- Row 1 of `xp` has the mean square 0.9991. It is not exactly 1, because `epsilon` is not tiny beside 0.0113.
- `x1` is `rmsn` applied a second time. It changes little: 0.9991 becomes 0.99999.

The model keeps both. `xp` is the stage that the rest of the model builds on: line 60 adds attention's result to it. `x1` is what attention reads. The project's port of Karpathy's program has the same two calls, one after the other, and also adds attention's result to the first ([explorations/microgpt.fss, lines 108, 109 and 128](src:explorations/microgpt.fss#L108)).

## sm: scores into probabilities

@src 28

`sm` is softmax. It takes a vector of numbers of any size and sign, here called scores, and returns a vector of probabilities: every element is between 0 and 1, and the elements add up to 1. A higher score gets a higher probability.

The body is a block with two steps, separated by a semicolon. With the scores 1, 2, 3 as `z`, a run printed each stage:

```out
z - BIG MAX z (3): -2.0 -1.0 0.0
exp(z - BIG MAX z) (3): 0.1353352832366127 0.36787944117144233 1.0
sm z (3): 0.09003057317038046 0.24472847105479764 0.6652409557748218
SUM sm(z) = 0.9999999999999999
```

- `BIG MAX z` is the largest element of `z`: 3. `BIG MAX` is a big operator like `SUM`. Written before an array, it takes all the array's elements.
- `z - (BIG MAX z)` subtracts 3 from every element. An array minus a number is the library's operator.
- `exp` is the exponential function: `exp(t)` is the number 2.718… raised to the power `t`. `exp(0)` is 1, `exp(-1)` is 0.368, `exp(-2)` is 0.135. Its result is always positive. The vocabulary declares `exp` for arrays: it applies to every element.
- `e` is the name of that vector of positive numbers. `SUM e` is their sum, 1.5032.
- `e / (SUM e)` divides every element by the sum. Now the elements add up to 1.

$$
\begin{aligned}
\c{sm}(z)_i &= \frac{e_i}{\sum_{j} e_j} \\[4pt]
e_i &= \exp\bigl(z_i - \max_{j} z_j\bigr)
\end{aligned}
$$

- $z$ is the parameter `z`, and $z_i$ its element number $i$.
- $\max_j z_j$ is `BIG MAX z`.
- $e$ is the local variable `e`.
- $\sum_j e_j$ is `SUM e`.

Four facts about `sm`, each from a run.

A step of 1 in the score multiplies the probability by 2.718. The scores 1, 2, 3 are one apart, and 0.2447 is 2.718 times 0.0900.

Only the differences between the scores count. Adding 100 to every score gives the same probabilities:

```out
sm(z + 100) (3): 0.09003057317038046 0.24472847105479764 0.6652409557748218
```

This is also why the program may subtract the maximum: it changes nothing in the result. It is there for the arithmetic. `exp` of a large number does not fit into a float, and after the subtraction the largest number that `exp` sees is 0. A run shows it on the scores 1001, 1002, 1003:

```out
exp(1000.0) = Infinity
sm [1001 1002 1003] (3): 0.09003057317038046 0.24472847105479764 0.6652409557748218
exp z / SUM exp z (3): NaN NaN NaN
```

The last line is the same computation without the subtraction. It gives no numbers.

Larger differences make the result more uneven. With the scores doubled to 2, 4, 6, the largest gets 87 percent:

```out
sm(2 z) (3): 0.015876239976466765 0.11731042782619838 0.8668133321973349
```

A score far below the others gets the probability 0, exactly. With a fourth score of minus 10 to the power 10:

```out
sm [1 2 3 -1e10] (4): 0.09003057317038046 0.24472847105479764 0.6652409557748218 0.0
```

The other three probabilities are what they were without the fourth score. Part 4 uses this to hide positions from the model.

The model calls `sm` in two places. In line 59 it turns the scores of attention into the numbers that Part 4 calls attention weights. In line 61 it turns the 27 scores of each position into the 27 probabilities that are the model's answer.
