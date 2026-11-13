# Adam and the training loop
> How the gradient changes the parameters: the plain rule first, then Adam's three lines with the real numbers of one parameter, the learning rate, the loop, and the loss of one name before and after one step.

## The plain rule first

The gradient says, for each parameter, which way the loss goes when the parameter goes up. Training moves each parameter the other way. The plainest rule takes the same small fraction of every gradient entry:

$$
p' = p - \c{lr}\; g
$$

- $p$ is the vector of parameters, $g$ the gradient, and $p'$ the new parameters.
- `lr` is a small positive number, the learning rate.

This rule is called gradient descent. Its weakness is that gradient entries differ widely in size. In the step on `yuheng`, parameter 500 has the entry -0.0926. The stored gradient that the quick check compares with gives parameter 1000 the entry -0.00000079, a hundred thousand times smaller. With one learning rate for both, either the first parameter jumps too far or the second hardly moves.

The program uses a rule that sets the size of the move for each parameter by itself. Its name is Adam, and Karpathy's microGPT uses it too. Adam keeps two more numbers for every parameter, from step to step: an average of the parameter's recent gradient entries, and an average of their squares.

## Adam

@src 74-81

Lines 75 and 76 are the header. It is long, so the result type stands on a line of its own.

- `p` is the vector of parameters, and `g` the gradient that `step` returned.
- `m` and `v` are the two vectors of averages. Each has 4,192 numbers, like `p`. Both start as zeros.
- `t` is the number of the step, counted from 1. `lr` is the learning rate for this step.
- The result is three vectors: the new `p`, the new `m`, the new `v`.

A name may end in a prime: `m'` is a name of its own, read "m prime". Here it is the new `m`.

Line 77 is the average of the gradient. `beta1` is 0.85. The new average is 85 parts of the old average and 15 parts of the new gradient. `beta1 m` is a number beside a vector: juxtaposition multiplies every element. `+` adds two vectors element by element.

Line 78 is the average of the squares. `g × g` multiplies the gradient with itself, element by element. `beta2` is 0.99: 99 parts old, 1 part new.

Line 79 is the move. It has three pieces.

- `m' / (1 - beta1^t)` corrects the first average for its start. `m` starts as 0, so after the first step `m'` is only 15 parts in 100 of the gradient. At `t` = 1 the divisor is 1 minus 0.85, which is 0.15, and the division gives the whole gradient back. At `t` = 3 the divisor is 0.386. As `t` grows, the divisor goes to 1, and the correction fades.
- `v' / (1 - beta2^t)` is the same correction for the second average. `SQRT` takes the root of every element. `+ epsilon_A` adds 0.00000001 to every element, so that the division that follows never divides by 0.
- The first piece times `lr`, divided by the second piece, element by element, is the move. Line 79 subtracts it from `p`.

Line 80 is the block's value, the triple. The comment in line 74 says "three whole-vector expressions": the function has no loop and no index. It changes none of its arguments.

$$
\begin{aligned}
m' &= \beta_1\, m + (1-\beta_1)\, g \\[2pt]
v' &= \beta_2\, v + (1-\beta_2)\, g \odot g \\[2pt]
p' &= p - \frac{\c{lr}\;\dfrac{m'}{1-\beta_1^{\,t}}}{\sqrt{\dfrac{v'}{1-\beta_2^{\,t}}} + \varepsilon_A}
\end{aligned}
$$

- $\beta_1$ is `beta1`, $\beta_2$ is `beta2`, and $\varepsilon_A$ is `epsilon_A`.
- $g \odot g$ is `g × g`: the product element by element.
- The root, the division and the powers apply to every element by itself.

The numbers of parameter 500 in the first step show what the three lines do. A run printed its value before, its gradient entry, its two averages after the step, its value after, and the difference:

```out
index 500 p0 0.06258901428847981 g -0.09262792010673876 m1 -0.013894188016010816 v1 8.579931583300387E-5 p1 0.07258901320889183 delta 0.00999999892041202
```

- `m1` is 0.15 times the gradient entry: -0.01389.
- `v1` is 0.01 times the entry's square: 0.0000858.
- The corrected first average is `m1` divided by 0.15: the entry itself, -0.0926.
- The corrected second average is `v1` divided by 0.01: the entry's square. Its root is 0.0926, the entry without its sign.
- Their quotient is -1. The move is `lr` times -1, and `lr` is 0.01 in the first step. Subtracting it raises the parameter by 0.01: from 0.0626 to 0.0726.

So in the first step, the size of the entry cancels out. Only its sign is left. Two more parameters from the same run:

```out
index 1100 p0 0.03654080103626847 g 0.031736131393025356 m1 0.004760419708953804 v1 1.0071820357953705E-5 p1 0.026540804187250147 delta -0.009999996849018325
index 0 p0 -0.04273180935726127 g 0.0 m1 0.0 v1 0.0 p1 -0.04273180935726127 delta 0.0
```

- Parameter 1100 has a positive entry, a third the size of the first one. It moves down, also by 0.01.
- Parameter 0 lies in the row of `wte` for the token `a`. Its entry is 0, and it does not move: 0 divided by `epsilon_A` is 0.

In later steps the averages hold several gradients. A parameter whose entries keep one sign goes on moving by about `lr` in each step. A parameter whose entries change sign has a small first average and a large second one, and it moves less.

The parentheses in line 79 fix the order of the float operations: first `lr` times the corrected average, then the division. The reference values of the check were computed in that order, and a different order can change the last digit of a float.

## The learning rate

@src 82

The learning rate falls in a straight line from `lr0`, 0.01, at step 0, towards 0 at step `nSteps`, 1,000. A run printed three values:

```out
lr(0) = 0.01 lr(1) = 0.00999 lr(999) = 1.000000000000001E-5
```

`lr0 (...)` is a number beside a number: the product. `1.0 s` turns the integer `s` into a float. The line needs it. In Fortress, `/` between two integers gives an exact fraction, a value of the type `QQ`: for `s` = 3, a run printed `s / nSteps` as `3/1000`. The library has no product of a float and such a fraction, and the line without `1.0` stops with "Failed to find any matching overload". With the float on the left, the division gives a float.

The schedule is set for 1,000 steps, as in Karpathy's program. The loop below runs five.

## The training loop

@src 84-90

Line 85 declares `run`, the function that the api `Executable` asks for. Its result type `()` is the empty tuple: the function returns nothing.

Line 86 prints a line. `println` takes one argument. Here the argument is built by juxtaposition: a string beside any value is their text joined together. A run printed:

```out
microgpt flat | params 4192 | corpus 2000 x 17 | batch 1, 5 steps
```

Line 87 sets the size of a batch, one document.

Lines 88 to 90 declare three variables that the loop changes. A declaration of the form `name: Type := value` makes a mutable variable. `loadParams` reads the nine files of starting values, in the order of the layout table, into one vector ([FlatData.fss, lines 93 to 101](src:explorations/run-c4/src/FlatData.fss#L93)). `zeros(n)` is the vocabulary's vector of `n` zeros.

!!! limit
The type in lines 88 to 90 is there because walk demands it. The grammar allows a mutable variable without a type, `var p = ...`, and the parser's checks refuse it: "The type of p is required" (the gap ledger's row 177). The project tested every other written type of the model: each can be left out and the five losses stay the same.
!!!

!!! limit
`FlatData.fss` holds its own function that reads a float from text, and its own scan of a line for numbers. The library's `strToFloat` reads "-1.5" as -28.5 and fails on a number with 17 digits (the gap ledger's row 140, a defect of the library). The library's `split` on a string does not cut it at spaces (row 141).
!!!

@src 91-97

- Line 91 opens a loop over the steps 0 to 4. The range is wrapped in `seq`, so the steps run in order. They must: each step needs the parameters that the step before it made.
- Line 92 reads the clock.
- Line 93 calls the model. Its second argument is the batch. `keys(n, f)` is the vocabulary's vector of `n` integers, filled from a function of the index. Here it holds the numbers of the documents `s bsz + i`, each taken `MOD` the number of documents, so that the numbers start again at 0 after the last document. With a batch of one, step `s` learns from document `s`. The left side binds the step's two results to `l` and `g`.
- Line 94 calls Adam and assigns its three results to the three variables at once. `:=` with a tuple on the left assigns to each name. The step count `t` is `s + 1`.
- Line 95 prints the step's number, its loss, and the time that it took in milliseconds. `DIV` is division of integers without a remainder.
- Line 96 closes the loop, and line 97 closes `run`.

A run of the program printed these five losses:

```out
step 1 loss 3.365966947584851
step 2 loss 3.4242727838717717
step 3 loss 3.177802125458052
step 4 loss 3.0663556842241975
step 5 loss 3.2208830897506235
```

Each line also ended with the step's time. This text leaves the times out. They are walk's, and by your ruling walk's speed says nothing about how fast Fortress is.

The five losses go up and down. They cannot be compared with each other: each is measured on a different name, `yuheng`, `diondre`, `xavien`, `jori`, `juanluis`, and each is measured before that step's own change to the parameters.

## What one step does to the numbers

To see the effect of a step, measure the same name before and after. A run did the step on `yuheng`, applied Adam once, and called `step` on `yuheng` again with the new parameters:

```out
loss doc 0 before 3.365966947584851 after one Adam step 2.9510500702232525
```

The loss on `yuheng` fell from 3.366 to 2.951. In probabilities: `exp` of minus 3.366 is 0.035, and `exp` of minus 2.951 is 0.052. These are the probabilities that give the same two losses if all seven right answers have one and the same probability: 0.035 before the step, 0.052 after it.

The same change helped a little on a name that the step did not see. The loss on document 1, `diondre`, with the old and with the new parameters:

```out
loss doc 1 with p0 3.4265763956879174 with p1 3.4242727838717717
```

The second number is the loss that the program printed for step 2.

The whole step on `yuheng`, in the numbers of this text:

1. The keys. The name becomes 16 rows of tokens, of which 7 count: `ids`, `tg`, `vm`, `pos`.
2. The forward pass. From the keys and the 4,192 parameters it computes a matrix of 16 by 27 probabilities. The seven right answers have probabilities between 0.027 and 0.046. The loss is 3.366.
3. The backward pass. It computes 4,192 rates, one for each parameter. 464 of them are 0: the parameters that this name did not use.
4. Adam. Each of the other 3,728 parameters moves against the sign of its rate. In the first step the move is 0.01, or a little less where the rate is within a few powers of ten of `epsilon_A`.
5. With the new parameters, the loss on the same name is 2.951.

## What the program leaves out

- It never makes a name. Karpathy's program ends with a loop that does: it gives the model the mark, draws a token by the probabilities of that position, appends the token, and repeats until the model answers with the mark. The flat program stops after training. Its `pr` holds the probabilities that such a loop would draw from.
- It runs five steps, where the learning rate's schedule is made for 1,000. The five steps are enough to compare the program's numbers with the stored values, which is the program's use today.
- Its batch is one document. The step itself takes a batch of any size: every matrix then has 16 rows for each document, and the planes of attention keep the documents apart.
