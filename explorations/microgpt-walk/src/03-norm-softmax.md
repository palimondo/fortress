# Two functions on a row: rmsn and sm
> Two small functions that the model calls again and again: one brings a row of numbers to a standard size, the other turns a row of scores into probabilities. Each is shown first on two or three numbers, then on a real row.

## rmsn: bring a row to a standard size

@src 21-22

Line 21 is the heading comment for lines 22 to 29. Lines 25 to 29 hold two more functions, `rmsn_b` and `sm_b`, with which the model computes its gradient. Part 6 reads them.

Line 22 declares a function. The form is `name(parameter: Type): ResultType = expression`. This one takes a vector of floats and returns a vector of floats. `rmsn` is short for RMS norm, and RMS for root mean square: the function divides a vector by the root of the mean of its squares.

The line uses one constant, `epsilon`. Line 18 of `MicroGptFlat.fss` sets it, as the first name of six, to `10.0^(-5)`, which is 0.00001:

@src 18

Read the right side of line 22 from the inside out, with the vector 3, 4 as `x`:

- `x DOT x` is the dot product of `x` with itself: 3 times 3, plus 4 times 4, is 25. It is the sum of the squares.
- `|x|` is the number of elements of `x`: 2. The two bars are an operator that encloses its operand. On an array it gives the size.
- `(x DOT x) / |x|` is 12.5: the mean of the squares.
- `epsilon + ...` adds 0.00001 to the mean. The reason is the division at the end. For a vector of zeros the mean is 0, its root is 0, and the function would divide by 0. A sum of squares cannot be negative, so the mean plus `epsilon` is at least 0.00001 and can never be 0.
- `SQRT` is the square root, written as a prefix operator. The root of 12.50001 is 3.5355.
- `x / ...` divides every element of `x` by that root. Line 27 of `FlatArrays.fss`, the file of array helpers that the program imports, declares `/` between an array and a number.

A run printed the result, and then the mean of the squares of the result:

```out
rmsn [3 4] (2): 0.8485277980128058 1.1313703973504077
mean square of rmsn [3 4] = 0.9999992000006401
```

After the division, the mean square of the vector is 1, up to the small `epsilon`. The proportions of the elements stay: 0.8485 to 1.1314 is still 3 to 4.

The vector 30, 40 has the same proportions and ten times the size. Its result is almost the same:

```out
rmsn [30 40] (2): 0.8485281340297446 1.1313708453729927
```

That is the function's job in the model: it removes the overall size of a row and keeps the proportions of its numbers. The model applies it at three places, so that the rows neither grow nor shrink from stage to stage.

$$
\c{rmsn}(x) = \frac{x}{\sqrt{\varepsilon + \dfrac{1}{n}\displaystyle\sum_{i} x_i^2}}
$$

- $x$ is the parameter `x`, and $x_i$ is its element number $i$.
- The sum under the root adds the squares of all the elements. It is `x DOT x`.
- $n$ is `|x|`, the number of elements.
- $\varepsilon$ is `epsilon`. Every square is 0 or more, so the sum is 0 or more, and the number under the root is at least 0.00001. The root is never 0.

The sum of the squares is a plain sum, and at this size it is safe. In the model, `x` has 16 elements. The model gives three matrices to `rmsn`, row by row. Their names are `x`, `xp` and `x2`. For each, a run printed the largest element, without its sign, and the largest sum of squares of a row, ``sumsq``:

```out
max |x| = 0.3009792670763558  max |xp| = 2.4877144323887146
max sumsq x = 0.3399218094145408  max sumsq xp = 15.992472399495856
max |x2| = 2.55589149111105  max sumsq x2 = 16.803895081622983
```

- Overflow: an `RR64` holds numbers up to about 10 to the power 308. The largest sum here is 16.8. A square overflows only for an element above 10 to the power 154.
- Accuracy: an `RR64` keeps about 16 digits, and each addition can change the last of them. The sum has 16 terms, all 0 or more and of similar size, so nothing cancels. The loss of the whole step agrees with the loss of the reference program in NumPy in all 16 digits, as Part 8 shows.

Welford's method computes a mean and a variance over a long stream of numbers in one pass, without keeping the numbers. It updates the mean with each new number, so it never subtracts one large sum from another, which is where the plain formula for a variance loses its digits. `rmsn` needs the mean of 16 squares and no variance. It subtracts nothing, and the plain sum is enough.

!!! limit
The parameter's type is `Array[\RR64,ZZ32\]`, a vector of any length. The library's own type for a vector of floats is `Vector[\RR64,n\]`, with the length `n` in the type. The model passes `rmsn` to another function, `rows`, in line 52, as the next section shows. Under walk, a function whose type has a size parameter cannot be passed as an argument: the call fails (the gap ledger's row 156). So the four functions of lines 22 to 29 take the type without a size.
!!!

## rows: a function on every row

@src 52: xp = rows(rmsn, x)
@src 52: x1 = rows(rmsn, xp)

`rows` is a function of `FlatArrays.fss`. It takes a function and a matrix. It applies the function to each row of the matrix and puts the results together as the rows of a new matrix. In Fortress a function is a value, so the first argument is the name `rmsn` and nothing more. Its definition:

@src FlatArrays.fss 142-147

- The first parameter's type, `Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\]`, is the type of a function from a vector to a vector.
- Line 143 reads the matrix's two sizes into `n` and `d`. Line 144 makes the result matrix, a new array of `n` by `d` floats.
- Line 145 is the loop. `row(m, i)` is a view of row `i` of `m`: a vector that holds no numbers of its own and reads the numbers of that row. `f` turns it into a new vector. `row(out, i)` is a view of row `i` of the result, and `assign` copies the new vector's numbers into it.
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

In the function `step`, `x` is the 16 by 16 matrix of Part 2: each row is a token's embedding plus a position's embedding. For its row 1, a run printed the mean square before and after:

```out
meansq x[1] = 0.01127520082084148  meansq xp[1] = 0.9991138837351009  meansq x1[1] = 0.9999899912311551
```

- The embeddings are small numbers: the mean square of row 1 of `x` is 0.0113.
- Row 1 of `xp` has the mean square 0.9991. It is not exactly 1, because `epsilon` is not tiny beside 0.0113.
- `x1` is `rmsn` applied a second time. It changes little: 0.9991 becomes 0.99999.

The model keeps both. The next stage is attention, in which a position reads earlier positions. Attention reads `x1`, and line 55 adds attention's result to `xp`. Karpathy's program has the same two calls, one after the other, and also adds attention's result to the first.

## sm: scores into probabilities

@src 23

`sm` is short for softmax. It takes a vector of numbers of any size and sign, here called scores, and returns a vector of probabilities: every element is between 0 and 1, and the elements add up to 1. A higher score gets a higher probability.

The body is a block with two steps, separated by a semicolon. With the scores 1, 2, 3 as `z`, a run printed each stage:

```out
z - BIG MAX z (3): -2.0 -1.0 0.0
exp(z - BIG MAX z) (3): 0.1353352832366127 0.36787944117144233 1.0
sm z (3): 0.09003057317038046 0.24472847105479764 0.6652409557748218
SUM sm(z) = 0.9999999999999999
```

- `BIG MAX z` is the largest element of `z`: 3. `BIG MAX` is a big operator like `∑`. Written before an array, it takes all the array's elements.
- `z - (BIG MAX z)` subtracts 3 from every element. The library declares `-` between an array and a number.
- `exp` is the exponential function: `exp(t)` is the number 2.718… raised to the power `t`. `exp(0)` is 1, `exp(-1)` is 0.368, `exp(-2)` is 0.135. Its result is always positive. `FlatArrays.fss` declares `exp` for arrays: it applies `exp` to every element.
- `e` is the name of that vector of positive numbers. `∑ e` is their sum, 1.5032.
- `e / (∑ e)` divides every element by the sum. Now the elements add up to 1.

$$
\begin{aligned}
\c{sm}(z)_i &= \frac{e_i}{\sum_{j} e_j} \\[4pt]
e_i &= \exp\bigl(z_i - \max_{j} z_j\bigr)
\end{aligned}
$$

- $z$ is the parameter `z`, and $z_i$ its element number $i$.
- $\max_j z_j$ is `BIG MAX z`.
- $e$ is the local variable `e`.
- $\sum_j e_j$ is `∑ e`.

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

The other three probabilities are what they were without the fourth score. Attention uses this in Part 4: it gives such a score to every position that a row must not read.

The model calls `sm` in two places. In line 54 it turns the scores of attention into attention weights, the numbers that say how much one position reads from another. In line 56 it turns the 27 scores of each position into the 27 probabilities that are the model's answer.

## Sources

- Every value in an Output box: runs under walk of a file of small array examples, and of copies of `MicroGptFlat.fss` with print lines added.
- The name `rmsnorm` in the project's port of Karpathy's program: [explorations/microgpt.fss, line 83](src:explorations/microgpt.fss#L83).
- Why the model normalizes each row: [explorations/run-b/article.md, line 39](src:explorations/run-b/article.md#L39).
- `/` between an array and a number: [FlatArrays.fss, line 27](src:explorations/run-c4/src/FlatArrays.fss#L27).
- The two calls of `rmsnorm` in the port, and the addition to the first: [explorations/microgpt.fss, lines 108, 109 and 128](src:explorations/microgpt.fss#L108).
- Welford's method is from B. P. Welford, "Note on a method for calculating corrected sums of squares and products", 1962. It is not in the repository.
