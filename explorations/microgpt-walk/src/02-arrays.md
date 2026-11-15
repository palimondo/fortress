# Vectors, matrices and the nine weight matrices
> The product of a matrix and a vector, from a 2 by 2 case; why the program writes `x w^T`; how nine matrices lie in one vector of 4,192 numbers; and the first line of the forward pass.

## A vector and a matrix

A vector is a list of numbers. A matrix is a grid of numbers, in rows and columns. "A 2 by 3 matrix" has 2 rows and 3 columns: the rows are named first.

Inside a function, Fortress writes both as literals:

```fortress
m: Matrix[\RR64,2,2\] = [1.0 2.0; 3.0 4.0]
v: Vector[\RR64,2\] = [5.0 6.0]
```

Spaces separate the elements of a row, and a semicolon ends a row. So `m` has the rows 1, 2 and 3, 4. `Matrix[\RR64,2,2\]` is the library's type for a matrix of floats with 2 rows and 2 columns. `Vector[\RR64,2\]` is its type for a vector of 2 floats. Both are kinds of `Array`, the type of Part 1, with the sizes added.

## A matrix times a vector

The product of the matrix `m` and the vector `v` is a new vector. Fortress writes the product as the two names side by side, `m v`. A run printed:

```out
m v (2): 17.0 39.0
```

Each element of the result comes from one row of `m`. Take the row, multiply its elements with the elements of `v`, pair by pair, and add:

- Row 0 of `m` is 1, 2. With `v`: 1 times 5, plus 2 times 6, is 17.
- Row 1 of `m` is 3, 4. With `v`: 3 times 5, plus 4 times 6, is 39.

$$
\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
\begin{pmatrix} 5 \\ 6 \end{pmatrix}
=
\begin{pmatrix} 1\cdot 5 + 2\cdot 6 \\ 3\cdot 5 + 4\cdot 6 \end{pmatrix}
=
\begin{pmatrix} 17 \\ 39 \end{pmatrix}
$$

The step "multiply pair by pair and add" has a name: the dot product of two vectors. Fortress writes it `DOT`. For the vector `v` with itself, a run printed:

```out
v DOT v = 61.0
```

That is 5 times 5, plus 6 times 6.

Two things follow from the way the product is made.

- The matrix must have as many columns as the vector has elements. Otherwise the pairs do not match.
- The result has as many elements as the matrix has rows.

So a matrix with 27 rows and 16 columns turns a vector of 16 numbers into a vector of 27 numbers. The model's last matrix does exactly this: it turns the 16 numbers that stand for a position into 27 scores, one for each token.

In Fortress, two values side by side with a space between them form an operator of their own, juxtaposition. The library declares what it means for each pair of types. For a matrix and a vector it is this product. For two numbers it is multiplication, so `4 nEmbd` is 64.

## The order matters

With the vector on the left, the result differs:

```out
v m (2): 23.0 34.0
```

Now each element comes from one column of `m`. Column 0 is 1, 3: 5 times 1, plus 6 times 3, is 23. Column 1 is 2, 4: 5 times 2, plus 6 times 4, is 34.

Two matrices have a product too. Take a second matrix, `n`, with the rows 0, 1 and 1, 0. A run printed both orders:

```out
m n (2 x 2):
    2.0 1.0
    4.0 3.0
n m (2 x 2):
    3.0 4.0
    1.0 2.0
```

`m n` is `m` with its columns swapped. `n m` is `m` with its rows swapped. The rule for two matrices is the rule above, used many times. Take row `i` of the left matrix and column `j` of the right matrix. Their dot product is the element of the product in row `i` and column `j`.

$$
(A\,B)_{ij} = \sum_{k} A_{ik}\,B_{kj}
$$

- $A$ and $B$ are the two matrices, left and right.
- $A_{ik}$ is the element of $A$ in row $i$ and column $k$.
- The sign ∑ with $k$ under it means: add the terms for every $k$. Here $k$ runs along row $i$ of $A$ and down column $j$ of $B$ at the same time.

For the pairs to match, the left matrix needs as many columns as the right matrix has rows. A matrix of 16 by 64 times a matrix of 64 by 16 gives a matrix of 16 by 16: the two inner sizes must be equal, and the two outer sizes are the result's.

## The transpose, and lines 21 to 24

The transpose of a matrix is the same numbers with rows and columns exchanged: row 0 becomes column 0, row 1 becomes column 1. The program writes it `m^T`. A run printed:

```out
m^T (2 x 2):
    1.0 3.0
    2.0 4.0
```

The program declares this operator itself:

@src 21-24

Line 23 declares a postfix operator. Read it in pieces.

- `opr` starts the declaration of an operator.
- `(m: Matrix[\RR64,r,c\])^T` says where the operand stands and what the operator looks like: a matrix `m`, then `^T`.
- `[\nat r, nat c\]` declares two static parameters. A `nat` parameter is a size that a type carries. Here `r` and `c` are the matrix's numbers of rows and columns, whatever they are.
- `: Matrix[\RR64,c,r\]` is the type of the result. The sizes have changed places: a matrix of `r` by `c` gives a matrix of `c` by `r`.
- `= transpose(m)` is the body. `transpose` is a function of `FlatArrays.fss`, the file of array helpers that the program imports. Its definition calls the library's method `t()`, which gives the transpose of a matrix:

@src FlatArrays.fss 50

Line 24 declares `^T` a second time, for an array with three indices. Such an array holds several matrices of one size, and `^T` transposes each of them. Part 4 uses it.

!!! limit
The comment in lines 21 and 22 says why these two lines are in the model's file and not in `FlatArrays.fss`, beside `transpose`. "The vocabulary" is the comment's name for `FlatArrays.fss`. The parser refuses a postfix operator of this form in an api: the same declaration parses in a component and is a syntax error in a `.fsi` file (the gap ledger's row 133).
!!!

## Many vectors at once: why the program writes `x w^T`

The function `step` works on 16 rows at once, one for each position. It keeps the 16 vectors of a stage as the 16 rows of one matrix. To put every row through a matrix `w`, the program writes `x w^T`. A small case shows why this is right. Take `m` from above as `w`, and a matrix `x` with three rows:

```fortress
x: Matrix[\RR64,3,2\] = [5.0 6.0; 1.0 0.0; 0.0 1.0]
```

```out
x m^T (3 x 2):
    17.0 39.0
    1.0 3.0
    2.0 4.0
```

- Row 0 of `x` is 5, 6, the vector `v`. Row 0 of the result is 17, 39, which is `m v`.
- Row 1 of `x` is 1, 0. Row 1 of the result is 1, 3: `m` times that vector, which picks column 0 of `m`.
- Row 2 of `x` is 0, 1. Row 2 of the result is 2, 4: column 1 of `m`.

So row `i` of `x m^T` is `m` times row `i` of `x`. The reason is the rule for two matrices. The element in row `i` and column `j` is row `i` of `x` with column `j` of `m^T`, and column `j` of `m^T` is row `j` of `m`.

The function `step` has this form seven times, each time with another matrix of parameters in the place of `w`. Read `x w^T` as "every row of `x`, put through `w`". The sizes follow the rule. In line 60, for example, the left matrix is 16 by 16 and `w` is 64 by 16. The transpose of `w` is 16 by 64, so the result is 16 by 64: every row of 16 numbers has become a row of 64 numbers.

A postfix operator binds more tightly than juxtaposition, so `x m^T` means `x (m^T)` and needs no parentheses.

## One vector of parameters, nine matrices

A weight is another word for a parameter, and a weight matrix is a matrix whose elements are parameters. The model has nine. This list gives each one's index, its name in the files of starting values, its name in the function `step`, what the name is short for, its size and its job.

- 0, ``wte``, in `step` also `wte`: the weights of the token embedding. 27 by 16, 432 numbers. It is the token table. Row `t` is the embedding of token `t`: the vector of 16 numbers that stands for that token.
- 1, ``wpe``, in `step` also `wpe`: the weights of the position embedding. 16 by 16, 256 numbers. It is the position table. Row `i` is the embedding of position `i`: the vector of 16 numbers that stands for that position.
- 2, ``lm_head``, in `step` `lm`: the language model's head, which is the field's name for a model's last matrix. 27 by 16, 432 numbers. It turns a position's final vector into 27 scores, one for each token.
- 3, 4 and 5, ``attn_wq``, ``attn_wk`` and ``attn_wv``, in `step` `wq`, `wk` and `wv`: attention's weights for the query, for the key and for the value. 16 by 16 each, 256 numbers each. Attention is the stage in which a position reads earlier positions. For that, it makes three vectors from each row, called the query, the key and the value, each with one of these matrices. Part 4 reads it.
- 6, ``attn_wo``, in `step` `wo`: attention's weights for the output. 16 by 16, 256 numbers. Attention's result goes through it.
- 7, ``mlp_fc1``, in `step` `f1`: 64 by 16, 1,024 numbers. MLP is short for multi-layer perceptron, the field's name for the model's second block, which Part 5 reads. FC is short for fully connected. This is the first of the block's two matrices.
- 8, ``mlp_fc2``, in `step` `f2`: 16 by 64, 1,024 numbers. The second matrix of that block.

The counts add up to 4,192. The program keeps all of them in one vector, `p`. The nine matrices lie in it one after the other, each one row after row.

@fig layout | The nine weight matrices inside the vector `p`.

@src 36

"Tactic 2/8" names two more pieces of advice from Hsu's talk: tactic 2, the nine weight matrices in one parameter vector; tactic 8, the nine matrices as views of that vector. A view is a matrix or a vector that has no storage of its own. It reads and writes the elements of another array.

The next lines are the layout table. They say where each matrix lies.

@src 37-41

`matName`, the matrix's name, gives the name of matrix `i`, which is also the name of its file of starting values. `matShape`, the matrix's shape, gives its size as a pair: rows, columns. Both are functions with one `if` expression. `if`, `elif` and `else` choose a value, and `end` closes the expression. `4 nEmbd` is 64.

!!! limit
A table would be the natural form: an array of nine names and an array of nine pairs. The program writes functions because walk binds a typed array literal at the top level as a tuple and then refuses it (the gap ledger's row 142). The same literal works inside a function, as in the small examples above.
!!!

@src 42

`matCount`, the matrix's count, is the number of elements of matrix `i`. The block binds the pair `(r, c)` and returns `r c`, the product.

@src 43

`matOffset`, the matrix's offset, is the place in `p` where matrix `i` starts: the sum of the counts of the matrices before it.

$$
\c{matOffset}(i) = \sum_{j=0}^{i-1} \c{matCount}(j)
$$

`SUM` is a big operator: an operator that takes a whole collection. The second pair of brackets holds a generator, `j <- 0#i`, which gives `j` the values 0 to `i - 1`. The expression after the brackets is added up for each `j`. A run printed the ten values `matOffset(0)` to `matOffset(9)`:

```out
0 432 688 1120 1376 1632 1888 2144 3168 4192
```

!!! limit
The first brackets, `[\ZZ32\]`, tell `SUM` the type of its result. Walk finds this type by itself. The static type checker of the compiled path does not (the gap ledger's row 731), so the project writes the type in every `SUM` of this form.
!!!

@src 44

`nParams`, the number of parameters, is the place after the last matrix: 4,192.

@src 45

This `view` takes the parameter vector and an index. It looks up the size and the offset, and calls a second function named `view`, with four arguments. The second `view` is in `FlatArrays.fss`. The two functions share a name. Fortress chooses between them by the arguments, here by their number.

@src FlatArrays.fss 55-64

- `PView`, a view of the parameters, is an object that extends `Matrix`, so everything that works on a matrix works on it: the product, `^T`, `+`. Its fields are `base`, the vector that it reads, and `off`, the offset.
- Its `get` reads element `(i, j)` from the vector `base` at the place `off + i c + j`. That is the offset, plus `i` whole rows of `c` elements, plus `j`. Its `put` writes to the same place. Its `init0` writes an element for the first time.
- Its `replica`, in line 59, makes a new array of the view's size, `r` by `c`, with elements of the type `U`. The new array is empty: `replica` copies no element. The library's own arrays declare `replica` in the same way, and the library's `map` and `copy` call it and then fill the new array.
- `view` in lines 63 and 64 makes the object. The call `reflect(nr)` turns an integer that is known only at run time into a size that a type can carry. `viewN` receives the two sizes as its static parameters `r` and `c`.

A small case, from a run. The vector `f` holds 1, 2, 3, 4, 5, 6. `view(f, 2, 2, 2)` is the 2 by 2 matrix that starts at place 2:

```out
view(f, 2, 2, 2) (2 x 2):
    3.0 4.0
    5.0 6.0
```

The view holds no numbers of its own. The run then changed the vector with `f[3] := 30.0` and printed the view again. Then it wrote through the view, with `vw[0,0] := 99.0`, where `vw` is that view, and printed the vector:

```out
view after f[3] := 30 (2 x 2):
    3.0 30.0
    5.0 6.0
f after view[0,0] := 99 (6): 1.0 2.0 99.0 30.0 5.0 6.0
```

!!! limit
`reflect` runs only under walk today. A size made from a number that is known only at run time does not run on the compiled path (the gap ledger's row 307). So the views are a part of the program that the compiled path cannot run as written.
!!!

Inside the function `step`, one line makes all nine views:

@src 53

The left side is a tuple of nine names, the right side a tuple of nine calls. A run printed the sizes of six of them:

```out
wte (27,16) wpe (16,16) lm (27,16) wq (16,16) f1 (64,16) f2 (16,64)
```

None of the nine is a copy. Element `[1, 0]` of `wte` is element 16 of `p`: the run printed 0.050011761464279846 for both.

## The first forward line: looking rows up

The forward pass is the part of the step that goes from the tokens to the loss.

@src 56
@src 57: x = gather(wte, ids) + gather(wpe, pos)

`ids` holds the token of each of the 16 rows, and `pos` holds each row's position, from the first line of `step` in Part 1.

`gather` is a function of `FlatArrays.fss`. It takes a matrix and a vector of keys. It builds a new matrix with one row for each key, and copies into that row the row of the first matrix that the key names.

@src FlatArrays.fss 168-172

Line 171 makes an array of `|ks|` rows and `nc` columns, and `tabulate` fills it from a function of the index: element `(i, j)` is `m[ks[i], j]`. The form `fn (i: ZZ32, j: ZZ32): T => ...` is a function without a name.

A small case, with the matrix `m` and the keys 1, 0, 1:

```out
gather(m, [1 0 1]) (3 x 2):
    3.0 4.0
    1.0 2.0
    3.0 4.0
```

The result is a copy, not a view. The run then changed the matrix with `m[1,0] := 30.0` and printed row 0 of the result again:

```out
after m[1,0] := 30: m[1,0] = 30.0  gather row 0 = 3.0 4.0
```

So `gather(wte, ids)` is a new matrix of 16 by 16. Its row `r` is a copy of the embedding of the token `ids[r]`. In the same way, row `r` of `gather(wpe, pos)` is a copy of the embedding of position `pos[r]`.

The operator `+` between two matrices of one size is the library's. It adds them element by element. So row `r` of `x` is the token's embedding plus the position's embedding.

Row 1 of `x` belongs to position 1, where the token is ``y``, 24. A run printed the first four of its 16 numbers, and the two rows that it is the sum of:

```out
wte[24,0..3] = -0.0291914028145468 -0.02562707413091664 0.04066887602823657 -0.003619274149736821
wpe[1,0..3] = -0.04936297000126024 0.058443996500918034 -0.00919285762764423 0.16256312623608313
x[1,0..3] = -0.07855437281580704 0.032816922370001396 0.031476018400592345 0.15894385208634632
```

The first number of `x`: -0.0292 plus -0.0494 is -0.0786.

## What adding the position's row does

A token's embedding is the same wherever the token stands. In the row of ``yuheng``, the mark, token 26, stands at position 0 and again at position 7. So rows 0 and 7 of `gather(wte, ids)` hold the same 16 numbers. A run printed the first four of them, then the first four numbers of the embeddings of positions 0 and 7, then the two sums:

```out
wte[26,0..3] = 0.08213648227415588 -0.036011968656176764 -0.12047466462352516 -0.03320518865639341
wpe[0,0..3] = -0.02223609248240166 -0.06955846384028579 -0.18050460245283065 0.05687695766770791
wpe[7,0..3] = -0.12274455615997554 -0.10585755872373388 0.09511069249661816 0.09661371061724935
x[0,0..3] = 0.059900389791754216 -0.10557043249646256 -0.3009792670763558 0.0236717690113145
x[7,0..3] = -0.04060807388581966 -0.14186952737991065 -0.025363972126906997 0.06340852196085595
```

- At position 0, the first number goes from 0.0821 to 0.0599: the position's embedding moves it by -0.0222.
- At position 7, the same 0.0821 goes to -0.0406: the position's embedding moves it by -0.1227.
- The third number goes from -0.1205 down to -0.3010 at position 0, and up to -0.0254 at position 7.

Every later line of `step` gets only the sum, `x`. The same token at two positions gives two different rows of `x`, so the model can give two different answers. The addition does only this: it makes a row depend on its position.

The rows of `wpe` are parameters, like the rows of `wte`. They start as the random numbers of the file `wpe.txt`, and training changes them. No formula computes them. The numbers above show it: the row for position 7 is not the row for position 0 moved further in one direction. Some numbers are larger and some are smaller, with no order.

The table has 16 rows, so the model can read 16 positions and no more.

Other models tell positions apart in other ways. Two of them, for comparison:

- The first transformer paper, of 2017, also adds a vector for the position to the token's embedding. It computes that vector by a formula, from sines and cosines of the position's number, which rise and fall slowly in some columns and fast in others. Training does not change it.
- Rotary position embeddings, RoPE for short, add nothing to the token's embedding. They work inside attention. They take the numbers of each query and each key in pairs, and turn each pair, as a point in a plane, by an angle that grows with the position. The score of a query and a key then depends on the distance between the two positions.

microGPT has neither. It has the learned table `wpe`, as GPT-2 has.

The matrix `x` has 16 rows and 16 columns, and the two 16s mean different things. The rows are the positions: `blockSize`. The columns are the numbers of one embedding: `nEmbd`. With a batch of two documents, `x` would have 32 rows and still 16 columns.

## Sources

- Every value in an Output box: runs under walk of a file of small array examples, and of copies of `MicroGptFlat.fss` with print lines added.
- Juxtaposition of a matrix and a vector as the product: [Library/FortressLibrary.fsi, line 1941](src:Library/FortressLibrary.fsi#L1941).
- Hsu's tactics by their numbers: [HANDOVER-HSU.md, lines 18 to 33](src:explorations/apl/reference/hsu-flat/HANDOVER-HSU.md#L18).
- The nine names: lines 38 and 39 of `MicroGptFlat.fss`, and the files of starting values in [explorations/apl/reference/dzaima/w](src:explorations/apl/reference/dzaima/w). What each name is short for is the field's usage and is in no file of the repository.
- `replica` in the library: [Library/FortressLibrary.fss, lines 2919 to 2930](src:Library/FortressLibrary.fss#L2919).
- "Embedding" for a row of a table: [explorations/run-b/article.md, line 31](src:explorations/run-b/article.md#L31).
- The first transformer paper is Vaswani and others, "Attention Is All You Need", 2017. Rotary position embeddings are from Su and others, "RoFormer", 2021. Neither is in the repository.
