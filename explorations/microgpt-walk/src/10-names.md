# Every name of the step, and the terms
> A reference to return to: what each name in the function `step` holds and what it is short for, with its size for a batch of one document, and the terms of the ten parts, each with its meaning.

## The names of the forward pass

The sizes are those that a run printed for a batch of one document. "16 by 16" means 16 rows by 16 columns. A size with three numbers means planes, rows, columns.

- `p`: the parameters. A vector of 4,192 floats.
- `b`: the batch, the numbers of the documents of this step. Here one integer, 0.
- `ids`: the tokens' identifiers. The token that the model reads in each row. 16 integers.
- `tg`: the targets. The token that comes next in each row, the right answer. 16 integers.
- `vm`: the mask of the valid rows. 1.0 for a row that counts, 0.0 for a row after the name's end. 16 floats.
- `nv`: the number of valid rows, the rows that count. 7.0 for ``yuheng``.
- `pos`: the positions. The position of each row, 0 to 15. 16 integers.
- `wte`: the weights of the token embedding. The token table, 27 by 16. Row `t` is the embedding of the token `t`. A view into `p`.
- `wpe`: the weights of the position embedding. The position table, 16 by 16. Row `i` is the embedding of position `i`. A view into `p`.
- `lm`: the language model's head, in the files ``lm_head``. The matrix that makes 27 scores from a row, 27 by 16. A view into `p`.
- `wq`, `wk`, `wv`: attention's weights for the query, the key and the value, in the files ``attn_wq``, ``attn_wk`` and ``attn_wv``. The matrices that make queries, keys and values, 16 by 16 each. Views into `p`.
- `wo`: attention's weights for the output, in the files ``attn_wo``. The matrix that mixes the heads' results, 16 by 16. A view into `p`.
- `f1`: in the files ``mlp_fc1``, for multi-layer perceptron, fully connected, 1. The first matrix of the feed-forward block, 64 by 16. `f2`: the second, 16 by 64. Views into `p`.
- `x`: the token's embedding plus the position's embedding, for each row. 16 by 16.
- `xp`: `x` with `rmsn`, the RMS norm, on every row. 16 by 16. Attention's result is added to it.
- `x1`: `xp` with `rmsn` on every row. 16 by 16. Attention reads it.
- `q`, `k`, `v`: the queries, the keys and the values. Every row of `x1` through `wq`, `wk`, `wv`: the query, the key and the value of each position. 16 by 16 each.
- `qh`, `kh`, `vh`: the queries, keys and values in heads. The same numbers cut into heads. 4 planes of 16 by 4 each. Views.
- `a`: attention. The attention weights. 4 planes of 16 by 16. In a plane, row `i` holds the attention weights with which position `i` reads positions 0 to 15. Each row adds up to 1.
- `hc`: the heads' results. For each position, the four heads' weighted averages of the values, side by side. 16 by 16.
- `x2`: `xp` plus `hc` through `wo`. 16 by 16. The feed-forward block's result is added to it.
- `x3`: `x2` with `rmsn` on every row. 16 by 16.
- `m0`: every row of `x3` through `f1`. 16 by 64.
- `mr`: `m0` after ReLU, with its negative numbers set to 0. 16 by 64.
- `x4`: `x2` plus `mr` through `f2`. 16 by 16.
- `pr`: the probabilities, the model's answer. 16 by 27. Row `r` holds the 27 probabilities for the token after position `r`.
- `loss`: one float. The mean, over the rows that count, of minus the logarithm of the probability of the right answer.

## The names of the backward pass

Each name holds rates: the change of the loss for each unit of change of an element of a forward value. It has the size of that forward value. A `d` in front marks the gradient at a value that the forward pass computed, and a `g` marks the gradient at a weight matrix.

- `dL`: the gradient at the 27 scores of each row, before `sm`. 16 by 27.
- `gLM`: the gradient at `lm`. 27 by 16.
- `dX4`: the gradient at `x4`. 16 by 16.
- `gF2`: the gradient at `f2`. 16 by 64.
- `dM0`: the gradient at `m0`. 16 by 64.
- `gF1`: the gradient at `f1`. 64 by 16.
- `dX3`: the gradient at `x3`. 16 by 16.
- `dX2`: the gradient at `x2`. 16 by 16.
- `gWO`: the gradient at `wo`. 16 by 16.
- `dh`: the gradient at the heads' averages, `a vh`. 4 planes of 16 by 4.
- `dVh`: the gradient at `vh`. 4 planes of 16 by 4.
- `dS`: the gradient at the scores `qh kh^T`. 4 planes of 16 by 16.
- `dQh`, `dKh`: the gradients at `qh` and `kh`. 4 planes of 16 by 4 each.
- `dQ`, `dK`, `dV`: the gradients at `q`, `k` and `v`. 16 by 16 each.
- `gWQ`, `gWK`, `gWV`: the gradients at `wq`, `wk` and `wv`. 16 by 16 each.
- `dX1`: the gradient at `x1`. 16 by 16.
- `dXp`: the gradient at `xp`. 16 by 16.
- `dX`: the gradient at `x`. 16 by 16.
- `gWTE`: the gradient at `wte`. 27 by 16.
- `gWPE`: the gradient at `wpe`. 16 by 16.

The step returns `loss` and the nine `g` matrices as one vector of 4,192 floats, in the layout of `p`.

## The terms

- Token: an integer that stands for one character. 0 to 25 are ``a`` to ``z``.
- Mark, or BOS: the token 26. It stands before a name and after it.
- Document: one name of the corpus.
- Position: a place in a document's row of tokens, counted from 0. The model reads positions 0 to 15.
- Row: one pair of a document and a position. Every matrix of the step has one row for each pair.
- Batch: the documents that one step learns from.
- Key, in Part 1: an integer that looks a row up in a table. `ids`, `tg` and `pos` are vectors of keys.
- Parameter: one of the 4,192 floats that training changes.
- Weight matrix: one of the nine matrices of parameters.
- Vocabulary: the model's set of tokens, 27 of them. In the program's comments, "the array vocabulary" is the file `FlatArrays.fss`.
- `FlatArrays.fss`: the file of array helpers that the program imports. It holds the functions and operators on vectors and matrices that Fortress's library does not have, such as `rows`, `gather` and `view`.
- `rmsn`: RMS norm, for root mean square. It divides a row by the root of the mean of its squares.
- `sm`: softmax. It turns a row of scores into probabilities.
- View: a matrix or a vector without storage of its own. It reads and writes another array.
- Plane: one of the matrices of an array with three indices.
- Embedding: the row that a table holds for a token or for a position, a vector of 16 numbers.
- Score: a number of any size and sign that goes into `sm`.
- Query, key and value, in attention: three vectors that each position makes from its row. A query with a key gives a score. The values are what gets averaged.
- Head: one of the four attention computations, each on four of the sixteen columns.
- Attention weight: a number between 0 and 1 that says how much one position reads from another. The model computes it anew in every forward pass.
- Residual connection: adding a block's result to the block's input.
- Forward pass: the part of the step from the tokens to the loss, lines 52 to 56.
- Loss: one number that says how wrong the model's probabilities are for the right answers.
- Gradient: for each parameter, the rate at which the loss changes when that parameter changes.
- Backward pass: the part of the step that computes the gradient, lines 58 to 65.
- Step: the function `step`, one forward pass and one backward pass. A step of training is a step and one call of `adam`.
