# Attention
> The one place where a position reads other positions. Every position makes a query, a key and a value; a query scores every key; softmax turns the scores into weights; the weights mix the values. With one real row of weights.

## What attention is for

After the first forward line, row 4 of the matrix holds the embedding of the token `e` at position 4. It holds nothing about the tokens before it. To say what follows `yuhe`, the row needs to know about `y`, `u` and `h` too.

Almost every line of the forward pass treats each row by itself. A product of the form `x w^T` puts every row through the same matrix, and `rows` applies a function to every row. No number moves from one row to another.

Attention is the exception. In it, each position computes an average of vectors from the positions up to and including its own, and adds the average to its own row. The average is weighted, and the model computes the weights from the rows themselves. This part follows that computation in four steps: three products make a query, a key and a value for every position; a product of queries and keys gives scores; `sm` turns the scores into weights; a product of weights and values gives the averages.

## Query, key and value

@src 58: (q, k, v) = (x1 wq^T, x1 wk^T, x1 wv^T)

The line binds three names to three products. Each product puts every row of `x1` through one weight matrix, as Part 2 showed. So `q`, `k` and `v` are matrices of 16 by 16, with one row for each position.

- Row `i` of `q` is the query of position `i`. The model uses it when position `i` reads.
- Row `j` of `k` is the key of position `j`. The model uses it when another position decides how much to read from position `j`.
- Row `j` of `v` is the value of position `j`. It is what position `j` hands over when it is read.

The score that position `i` gives to position `j` is the dot product of query `i` and key `j`. A dot product is large when the two vectors have large elements with the same signs in the same places, and it is negative when the signs disagree. So a high score means: this query and that key fit.

The words query, key and value describe the parts' places in the computation. They say nothing about what the numbers mean. The three matrices `wq`, `wk` and `wv` start as random numbers, and only training gives the fit a use.

## Four heads

The model does not use the 16 numbers of a query as one vector. It cuts every query, key and value into four pieces of four numbers: columns 0 to 3, columns 4 to 7, columns 8 to 11, columns 12 to 15. Piece number 0 of the queries works only with piece number 0 of the keys and of the values, and so on. Each of the four is called a head. A head is a complete attention computation on vectors of four numbers. That is the meaning of the constants `nHead`, 4, and `headDim`, 4.

One head gives each position one set of weights. Four heads give it four, so the model can read the earlier positions in four ways at once.

@src 54-55

These two lines stand at the top of the step, before the forward pass. They declare two functions inside the function `step`. A local function can use the names around it, and is declared like a top-level one.

- `h` takes a matrix and returns an array with three indices. The program's comments call such an array a rank-3 array. Its type is `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]`: the index is a triple. It is a pile of matrices of one size. Each matrix of the pile is a plane, and the three indices are the plane, the row and the column.
- `u` goes the other way, from a rank-3 array to a matrix.

Both call the vocabulary. A small case shows what they do. The matrix `y` has the rows 1, 2, 3, 4 and 5, 6, 7, 8. The call `heads(y, 2, 2, 2)` asks for 2 positions in a document, 2 heads, and 2 numbers in a head:

```out
heads(y, 2, 2, 2) (2 x 2 x 2):
  plane 0
    1.0 2.0
    5.0 6.0
  plane 1
    3.0 4.0
    7.0 8.0
unheads (2 x 4):
    1.0 2.0 3.0 4.0
    5.0 6.0 7.0 8.0
```

Plane 0 holds columns 0 and 1 of `y`. Plane 1 holds columns 2 and 3. `unheads` puts the planes side by side again.

@fig heads | What `h` does to `q`, with one document in the batch.

Both functions return views. No number is copied:

@src FlatArrays.fss 82-90

In line 86, `q` is the plane, `i` the row and `j` the column. `q MOD nh` is the head, and `(q MOD nh) k + j` is the column in the matrix: the head's first column plus `j`. `q DIV nh` is the document, and `(q DIV nh) p + i` is the row in the matrix. With a batch of several documents there is one plane for each pair of a document and a head. This keeps the documents apart: a position reads only positions of its own name.

@src 58: (qh, kh, vh) = (h(q), h(k), h(v))

A run printed the sizes, and one query before and after the cut:

```out
sizes x (16,16) q (16,16) qh (4,16,4) kh (4,16,4)
q[3,0..3] = 0.21653204961507866 0.07459332626949441 -0.2933447862796106 0.17866618188236993
qh[0,3,:] = 0.21653204961507866 0.07459332626949441 -0.2933447862796106 0.17866618188236993
q[3,4..7] = -0.08474197564917962 -0.074962298948664 0.3810366810245596 -0.12889117901497626
qh[1,3,:] = -0.08474197564917962 -0.074962298948664 0.3810366810245596 -0.12889117901497626
```

`qh` has 4 planes, 16 rows and 4 columns. Row 3 of plane 0 is the first four numbers of row 3 of `q`: the query of position 3 in head 0. Row 3 of plane 1 is the next four: the query of position 3 in head 1.

## The scores

@src 59: a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim))

This line holds the middle of attention. Read it from the inside out.

`kh^T` uses the operator of line 24. On a rank-3 array it transposes every plane. The planes of `kh` are 16 by 4, so the planes of `kh^T` are 4 by 16.

`qh kh^T` is a product of two rank-3 arrays. The vocabulary declares it: the matrix product, plane with plane.

@src FlatArrays.fss 125-133

Line 131 is the work: for each plane `p`, the product of plane `p` of `x` and plane `p` of `y` goes into plane `p` of `out`. `plane` is one more view of the vocabulary.

!!! limit
The library declares products for vectors and matrices only. A product of rank-3 arrays, plane with plane, is what this model needs, so the vocabulary writes it as a loop over the planes. By your ruling, what a program builds that a fuller library would hold belongs in the library; this operator has not moved there.
!!!

In each plane, a matrix of 16 by 4 meets a matrix of 4 by 16, and the result is 16 by 16. By the rule of Part 2, its element in row `i` and column `j` is row `i` of the plane of `qh` with row `j` of the plane of `kh`: the dot product of query `i` and key `j`. So plane 0 of `qh kh^T` holds every score of head 0: 16 positions that read, times 16 positions that can be read.

`/ SQRT (1.0 headDim)` divides every score by 2, the square root of 4. A dot product of vectors of 4 numbers adds 4 terms, and with longer vectors it would add more and grow. The division by the root of the length keeps the scores in the same range for any `headDim`. Part 3 showed why the range matters: larger scores make softmax sharper. `1.0 headDim` is the float 4.0. Walk also accepts `SQRT headDim` and prints 2.0 for it; the line writes the conversion out.

A run printed the keys of positions 0 to 3 in head 0, and the 16 scores that position 3 gives in head 0:

```out
kh[0,0,:] = -0.06774473275776233 -0.04662488139762622 0.223382693617192 -0.4467841172596855
kh[0,1,:] = 0.12755053236786068 0.4892183139363175 -0.09926337243693904 0.6653949143991678
kh[0,2,:] = -0.32295297223781966 -0.3614136178560694 0.5761580759520876 -0.010446285685502349
kh[0,3,:] = 0.24879457571015717 -0.4910626156023691 -0.12848555192749253 0.5084897824179067
scores[0,3,:] = -0.08175008584960282 0.10605658054206196 -0.13388403927731538 0.07289125011412394 -0.003387293551372031 -0.034448950535247866 -0.08107587516388014 0.009820910141958544 -0.11003918087622969 -0.028324811024202798 -0.09654993056016536 -0.04731104972127347 -0.07326681379685343 -0.17316343151400726 -0.013353507708531765 -0.07889239410102553
```

You can check the second score, the one for position 1, by hand. The query of position 3 in head 0 is 0.2165, 0.0746, -0.2933, 0.1787, from the output above. The key of position 1 is 0.1276, 0.4892, -0.0993, 0.6654.

- 0.2165 times 0.1276 is 0.0276.
- 0.0746 times 0.4892 is 0.0365.
- -0.2933 times -0.0993 is 0.0291.
- 0.1787 times 0.6654 is 0.1189.

The sum is 0.2121, and half of it is 0.1061: the printed score.

## The mask: no reading ahead

Position 3 has scores for all 16 positions, also for positions 4 to 15. It must not read those. The model's task at position 3 is to say which token stands at position 4. If position 3 could read position 4, it would read the answer.

@src 29

`mask` is a top-level variable: a matrix of 16 by 16, built once when the component is loaded. `mat` is the vocabulary's function that makes a matrix from its two sizes and a function of the index. The function here returns minus 10 to the power 10 where the column `j` is greater than the row `i`, and 0 elsewhere. A run printed the matrix's top left corner:

```out
    0.0 -1.0E10 -1.0E10 -1.0E10
    0.0 0.0 -1.0E10 -1.0E10
    0.0 0.0 0.0 -1.0E10
    0.0 0.0 0.0 0.0
```

$$
\c{mask}_{ij} =
\begin{cases}
-10^{10} & \text{if } j > i \\
0 & \text{otherwise}
\end{cases}
$$

In line 59, `mask + ...` adds this matrix to every plane of the scores. A matrix plus a rank-3 array is an operator of the vocabulary ([FlatArrays.fss, lines 135 and 136](src:explorations/run-c4/src/FlatArrays.fss#L135)). After the addition, row 3 of head 0 starts with the four scores as they were, and every later score is near minus 10 to the power 10:

```out
masked[0,3,:] = -0.08175008584960282 0.10605658054206196 -0.13388403927731538 0.07289125011412394 -1.0000000000003387E10 -1.0000000000034449E10
```

Part 3 showed what softmax does with such a score: it gives it the weight 0, exactly, and leaves the other weights as if the score were not there.

Karpathy's program has no mask. It feeds the model one position at a time and keeps the keys and values of the earlier positions in a list. A later position does not exist yet when an earlier one is computed. The flat program computes all 16 positions at once, so it needs the mask to get the same result.

## The weights

`rows(sm, ...)` applies `sm` to every row of every plane. This is the same `rows` as in Part 3, declared a third time for a rank-3 array ([FlatArrays.fss, lines 154 to 159](src:explorations/run-c4/src/FlatArrays.fss#L154)). The result `a` has the size of the scores: 4 planes of 16 by 16. Its elements are the attention weights.

Here is the row for position 3 in head 0, and its sum:

```out
a[0,3,:] = 0.23131863930590738 0.2791091202495081 0.219568047869288 0.2700041925752965 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0
sum a[0,3,:] = 1.0
```

Position 3 holds the token `h`. In head 0 it reads position 0, the mark, with the weight 0.231; position 1, `y`, with 0.279; position 2, `u`, with 0.220; and itself with 0.270. The twelve later positions have the weight 0. The four weights are close to a quarter each, because the parameters are still the random starting values and the scores are all near 0.

The starts of two more rows from the same run:

```out
a[0,0,:] = 1.0 0.0 0.0 0.0
a[2,5,:] = 0.14687047939195907 0.16983380191478548 0.16704614331867995 0.1519876361079705 0.1838091246038301 0.1804528146627749 0.0 0.0
sum a[2,5,:] = 1.0
```

Position 0 can read only itself, so its one weight is 1. Position 5 in head 2 spreads its weight over positions 0 to 5.

$$
\begin{aligned}
s_{ij} &= \frac{q_i \cdot k_j}{\sqrt{d}} + \c{mask}_{ij} \\[4pt]
a_{ij} &= \c{sm}(s_i)_j
\end{aligned}
$$

- $s_{ij}$ is the masked score that position $i$ gives to position $j$, in one head. $s_i$ is the row of the 16 scores of position $i$.
- $q_i$ is row $i$ of that head's plane of `qh`, and $k_j$ is row $j$ of its plane of `kh`. The dot between them is the dot product.
- $d$ is `headDim`, 4.
- $a_{ij}$ is `a[head, i, j]`: the weight with which position $i$ reads position $j$. It is element $j$ of `sm` applied to the row $s_i$.

## Mixing the values

@src 59: hc = u(a vh)

`a vh` is again the product plane with plane. In each plane, the 16 by 16 matrix of weights meets the 16 by 4 matrix of values, and the result is 16 by 4. Row `i` of the result is the sum, over every position `j`, of the weight `a[i, j]` times the value of position `j`. The weights of a row add up to 1, so this is a weighted average of the values.

A run printed the values of positions 0 to 3 in head 0, and the result for position 3:

```out
vh[0,0,:] = -0.20056698275979826 -0.11626502009152276 0.6519530451441488 0.14354339931780064
vh[0,1,:] = -0.39586122805055957 -0.30173184158030986 -0.39029560082833054 -0.18076989824043582
vh[0,2,:] = -0.29761273002988475 -0.20504613314209133 -0.04245948067482631 0.4903490040488197
vh[0,3,:] = -0.14966874577363545 0.24185291648488746 0.36048938146221055 0.6555507261252419
(a vh)[0,3,:] = -0.26264079565384846 -0.09083065284086174 0.1298847285979956 0.2674161546393012
```

The first number of the result, by hand, from the four weights and the first numbers of the four values:

- 0.2313 times -0.2006 is -0.0464.
- 0.2791 times -0.3959 is -0.1105.
- 0.2196 times -0.2976 is -0.0653.
- 0.2700 times -0.1497 is -0.0404.

The sum is -0.2626: the printed number.

$$
\c{out}_i = \sum_{j} a_{ij}\, v_j
$$

- $\c{out}_i$ is row $i$ of a plane of `a vh`.
- $v_j$ is row $j$ of the same plane of `vh`: a vector of four numbers.

`u` then puts the four planes side by side. `hc` is a matrix of 16 by 16 again: for each position, the four heads' averages, four numbers each. The run printed the first four numbers of its row 3, and they are the numbers above:

```out
hc[3,0..3] = -0.26264079565384846 -0.09083065284086174 0.1298847285979956 0.2674161546393012
```

## Back into the row

@src 60: x2 = xp + hc wo^T

`hc wo^T` puts every row of `hc` through the last attention matrix, `wo`. In `hc`, each head's result sits in its own four columns. `wo` mixes the sixteen columns.

Then the line adds the result to `xp`, the matrix that attention started from. It does not replace `xp`. So a row of `x2` still holds what the row held before, its own token and position, and it now also holds a mix of what the earlier positions hold. Adding a stage's result to the stage's input in this way is called a residual connection. The model does it twice: here, and at the end of the feed-forward block in Part 5.

`x2` is a matrix of 16 by 16, one row for each position, like every stage before it.

The sizes of the whole computation, from the run:

```out
sizes scores (4,16,16) a (4,16,16) a vh (4,16,4) hc (16,16)
```
