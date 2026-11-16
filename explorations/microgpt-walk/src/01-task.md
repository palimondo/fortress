# The task, the tokens and the program's frame
> What the program learns, how a name becomes a row of integers, and the lines around the model: the header, the constants, the corpus, and the first line of the step.

## What the program learns

The corpus is a file of 2,000 first names, one name on each line. Its first five lines are these:

```text
yuheng
diondre
xavien
jori
juanluis
```

The model reads the start of a name and answers with 27 numbers: for each character that can come next, the probability that it comes next. The 27 characters are the letters ``a`` to ``z`` and one mark for "the name starts here" and "the name ends here".

Take the name ``yuheng``. It gives the model seven questions:

- At the start of a name, which character comes first? The right answer is ``y``.
- After ``y``, which character comes next? The right answer is ``u``.
- After ``yu``? ``h``. After ``yuh``? ``e``. After ``yuhe``? ``n``. After ``yuhen``? ``g``.
- After ``yuheng``? The right answer is the mark: the name ends here.

The model has 4,192 numbers that decide its answers. They are its parameters. Training changes the parameters, a little at each step, so that the right answers get higher probabilities. One number says how wrong the answers are: the loss. It is 0 when every right answer has the probability 1, and it grows as the right answers get lower probabilities. Part 5 computes it. A step of training aims at a lower loss on the name that the step saw. Part 7 shows one.

A token is an integer that stands for one character. A GPT is a function from a sequence of tokens to a probability for each possible next token, and a rule for changing its parameters. Karpathy's microGPT writes the function and the rule in 243 lines of Python, on single numbers. The flat program writes the same function and the same rule on whole arrays.

## The files

The program is in the folder [explorations/run-c4/src](src:explorations/run-c4/src). Four files matter here:

- `MicroGptFlat.fss` holds the model: 93 lines.
- `FlatArrays.fss` is the file of array helpers that the program imports: 190 lines of functions and operators on vectors and matrices that Fortress's library does not have.
- `FlatData.fss` reads the parameters and the corpus from text files, 125 lines.
- `MicroGptFlatQuick.fss` is the quick check: it runs the model twice and compares the results with stored values. Part 8 reads it.

To run the model under walk, from the repository's root:

```text
cd explorations/run-c4/src
../../../bin/fortress MicroGptFlat.fss
```

It prints one line with the sizes and then five lines, one for each step of training. Part 7 shows them.

A ``.fss`` file holds a component, which is a unit of Fortress code. Beside each component is a ``.fsi`` file of the same name. It holds an api: the list of the names that other components may use, with their types.

The model's file starts with a comment. Fortress writes a comment between ``(*`` and ``*)``.

@src 1-8

The comment names the parts of the file in order: the constants ("hyperparameters"), a table that says where each group of parameters lies ("the layout table"), four functions on vectors, the model's main function ("the step"), the rule that changes the parameters ("Adam"), and the training loop. "The array vocabulary" is the comment's name for `FlatArrays.fss`.

The comment also names three things from the project's history:

- "Hsu" is Aaron Hsu. The program's data layout follows his talk "Designing Your Data": all the parameters lie in one vector, and the corpus is one matrix of integers. The word "flat" in the program's name means this layout.
- The ``.dyalog`` file is an APL program with the same layout. The Fortress lines were written beside its lines.
- "Run C4" is the record's name for this program. It was the fourth round of an experiment that the record calls run C.

## The frame: component, export, import

@src 9-14

- Line 9 opens the component. Its name must be the file's name. The matching `end` is the file's last line, line 93.
- Line 10 says that this component implements the api `MicroGptFlat`. The api's file lists what the model offers to other components: the layout table, the corpus, `step`, `adam` and `learningRate`. The quick check imports these.
- Line 11 says that the component also implements the api `Executable`. That api has one function, `run(): ()`. A component that exports it is a program: ``bin/fortress MicroGptFlat.fss`` calls its `run`.
- Lines 12 to 14 import other apis. `{...}` is Fortress text, not an omission here: it means "every name of that api".

@src 93

The lines of this file use no name of `System`. A copy of the file without line 14 runs and prints the same loss. The timer in line 87, `nanoTime`, is a function of Fortress's library, which every component sees without an import. The quick check does use `System`, for its function `getProperty`.

## The constants

@src 16-18

Line 16 is a comment that works as a heading. The file has nine such lines.

Line 17 declares six names at once. The left side is a tuple of names and the right side is a tuple of values. A declaration with `=` makes an immutable variable.

- `nEmbd`, the number of the embedding's numbers, is 16. The model turns each token into a vector of 16 numbers, called the token's embedding. Every later vector that stands for a token has 16 numbers too.
- `blockSize`, the size of a block, is 16. A block is the piece of a name that the model reads: at most 16 positions.
- `nHead`, the number of heads, is 4. `headDim`, a head's dimension, is 4. The model's middle stage, attention, cuts each vector of 16 numbers into 4 pieces of 4 numbers. Each piece is a head. Part 4 shows them.
- `vocabSize`, the vocabulary's size, is 27. The model's vocabulary is its set of tokens: the 26 letters and the mark.
- `bosId`, the mark's identifier, is 26: the integer that stands for the mark. BOS is short for "beginning of sequence".

No type is written. A numeral without a point is a `ZZ32`, a signed 32-bit integer. A numeral with a point is an `RR64`, a 64-bit float.

!!! limit
Under walk these tuple bindings work, and your ruling keeps the form. On the compiled path, a tuple binding at the top level whose names are used stops the compile today (the gap ledger's row 988).
!!!

Line 18 declares six more constants.

- `epsilon` is `10.0^(-5)`, which is 0.00001. The operator `^` is the power. The function `rmsn` of line 22 divides by the root of a number, and it first adds `epsilon` to that number, so that it never divides by 0. Part 3 reads `rmsn`.
- `lr0` is 0.01, `beta1` is 0.85, `beta2` is 0.99, and `epsilon_A` is 0.00000001. Adam, the rule that changes the parameters after each step, uses these four. `lr0` is the learning rate at step 0: the size of the first change. The two betas set how fast Adam's two averages forget old gradients. `epsilon_A` is Adam's own guard against a division by 0.
- `nSteps` is 1,000: the number of steps over which the learning rate falls to 0. Part 7 reads Adam and the training loop.

@src 19

Line 19 gives the two places on disk: the corpus, and the folder of the parameters' starting values. The paths are relative, so the program runs only from its own folder, `explorations/run-c4/src`. The starting values are random numbers: the ones that Karpathy's Python program starts from with the random seed 42, written out as text files.

## The corpus as one matrix of tokens

The program gives ``a`` the token 0, ``b`` the token 1, and so on to ``z``, 25. The mark BOS is the token 26.

@src 42-43

Line 42 is the heading comment. "Tactic 3/5" points to two pieces of advice from Hsu's talk, by their numbers in the project's notes on it: tactic 3, the corpus as one integer matrix with a vector of lengths, built once; tactic 5, characters turned into small integers when the data is loaded.

Line 43 declares a top-level variable with a written type, `Corpus`. Its value is computed once, when the component is loaded, before `run` starts. The function `loadCorpus` and the type `Corpus` are in `FlatData.fss`:

@src FlatData.fss 119-124

- Line 120 reads the file into an array of strings, one name each.
- Line 121 makes a matrix of integers and fills it with the token 26. `array[\ZZ32\](rows, columns)` is the library's function that makes an array. The brackets `[\ZZ32\]` hold a static argument, here the element type. Plain brackets hold an index, as in `tokm[d, 1 + j]` in the next line. `|names|` is the number of elements of `names`, 2,000. `blk` is `blockSize`, so the matrix has 17 columns.
- Line 122 is a loop with two counters, `d` over the documents and `j` over the characters of one name. A document is one name of the corpus. `0#n` is a range: `n` integers, starting at 0. So `0#5` is 0, 1, 2, 3, 4. The body puts the token of character `j` into column `1 + j`. A character's token is its code point minus the code point of ``a``. The operator `:=` assigns to an element of an array.
- A Fortress loop runs its turns in parallel unless every range is wrapped in `seq`. Here both are wrapped, so the loop runs in order.
- Line 123 builds the result, a `Corpus` object. Its second argument is a vector with one entry for each document: 1 plus the number of the name's characters.

Here is row 0 of the matrix, for ``yuheng``, as a run printed it:

```out
26 24 20 7 4 13 6 26 26 26 26 26 26 26 26 26 26
```

Column 0 holds BOS. Columns 1 to 6 hold ``y`` (24), ``u`` (20), ``h`` (7), ``e`` (4), ``n`` (13) and ``g`` (6). Every later column still holds the 26 from line 121. The length that line 123 stores for this document is 7.

The object's declaration follows.

@src FlatData.fss 106-118

- Line 106 declares an object with three parameters. An object's parameters are its fields. `tokm` is the token matrix, `len` the vector of lengths, `blk` the block size.
- The types use the library's array type, `Array[\E,I\]`. `E` is the type of the elements and `I` the type of the index. `Array[\ZZ32,ZZ32\]` has one integer as its index: it is a vector of integers. `Array[\ZZ32,(ZZ32,ZZ32)\]` has a pair of integers as its index: it is a matrix of integers.
- Lines 107 to 109 are small methods. `tokm[d, j]` reads the element in row `d` and column `j`.
- Lines 112 to 117 are three methods, `tokens`, `positions` and `valid`. The model's main function calls them in its first line, and the next section shows what they return. `keys(n, f)` and `vec(n, f)` are functions of `FlatArrays.fss`: each makes a vector of `n` elements and fills it from the function `f` of the index, `keys` with integers and `vec` with floats.

## The first line of the step: the keys

@src 45-46

The function `step` is the model. One call of it is one step: it reads a few names, computes the model's answers, and computes how to change the parameters. Its header says what goes in and what comes out.

- `p`, the parameters, is a vector of 4,192 floats.
- `b`, the batch, is a vector of integers: the numbers of the documents to learn from in this step. Every run shown here uses a batch of one document, document 0.
- The result is a pair. Its first part is the loss, one float. Its second part is a vector of 4,192 floats, the gradient. The gradient holds one number for each parameter: the rate at which the loss changes when that parameter changes. Part 6 computes it.
- `= do` opens a block. The block ends at line 67, and its value is its last expression, in line 66.

The comment says "Pure": `step` changes nothing outside itself. It reads `p` and `b` and the corpus, and it returns two values.

!!! limit
The type `Array[\RR64,ZZ32\]` does not say how long the vector is. The library has a type that does: `Vector[\RR64,n\]`, where `n` is a size that the type carries. The model's functions take and return the type without a size. One cause is in walk: a function whose type has a size parameter cannot be passed as an argument (the gap ledger's row 156; Part 3 meets it at `rmsn`). Whether the model's arrays get types with sizes is a decision of yours that is still open; the record calls it decision D.
!!!

The step's first line makes five vectors. A semicolon separates declarations on one line.

@src 47: ids = corpus.tokens(b, 0)
@src 47: tg = corpus.tokens(b, 1)
@src 47: vm = corpus.valid(b)
@src 47: nv = ∑ vm
@src 47: pos = corpus.positions(b)

Each vector has one entry for each pair of a document and a position. A position is a place in a name's row of tokens, counted from 0. The model reads 16 positions of each document, so a batch of one document gives 16 entries. Such an entry is called a row from here on, because every matrix that the step computes later has one row for each of these pairs.

With document 0 as the batch, a run printed the five values:

```out
ids = 26 24 20 7 4 13 6 26 26 26 26 26 26 26 26 26
tg = 24 20 7 4 13 6 26 26 26 26 26 26 26 26 26 26
vm = 1.0 1.0 1.0 1.0 1.0 1.0 1.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0
nv = 7.0
pos = 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
```

- `ids`, the tokens' identifiers, holds the token that the model reads at each position: columns 0 to 15 of the corpus row. The program calls these integers keys, because the step uses them to look rows up in tables.
- `tg`, the targets, holds the token one place later: columns 1 to 16. It is the right answer for each position. At position 0 the model reads BOS (26) and the target is ``y`` (24). At position 6 it reads ``g`` (6) and the target is BOS (26).
- `vm`, the mask of the valid rows, says which rows count: 1.0 for the seven questions of ``yuheng``, 0.0 for the nine rows after the name's end. The method `valid` compares the position with the document's length, 7.
- `nv`, the number of valid rows, is the number of rows that count. `∑` adds the elements of an array, so `nv` is 7.0.
- `pos`, the positions, holds each row's position.

In the methods' bodies, `r` is the row's number. `r DIV blk` is the whole part of `r` divided by 16: which document of the batch the row belongs to. `r MOD blk` is the remainder: the row's position. With one document in the batch, the row's number is its position.

The model must not use `tg` to compute its answers. It uses `ids` and `pos` for the answers, and `tg`, `vm` and `nv` only to measure how wrong the answers are.

## Sources

- Every value in an Output box: runs of `MicroGptFlat.fss`, and of copies of it with print lines added, under walk.
- Karpathy's program, its 243 lines and its arithmetic on single numbers: [explorations/microgpt-port.md, lines 6 to 8](src:explorations/microgpt-port.md#L6).
- The data layout after Hsu's talk: [MicroGptFlat.fsi, lines 1 to 4](src:explorations/run-c4/src/MicroGptFlat.fsi#L1).
- Hsu's tactics by their numbers: [HANDOVER-HSU.md, lines 18 to 33](src:explorations/apl/reference/hsu-flat/HANDOVER-HSU.md#L18).
- BOS as "beginning of sequence": [explorations/run-b/article.md, line 21](src:explorations/run-b/article.md#L21).
- The starting values and the seed 42: [explorations/apl/reference/HANDOVER-APL.md, line 35](src:explorations/apl/reference/HANDOVER-APL.md#L35).
