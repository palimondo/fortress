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

The model reads the start of a name and answers with 27 numbers: for each character that can come next, the probability that it comes next. The 27 characters are the letters `a` to `z` and one mark for "the name starts here" and "the name ends here".

Take the name `yuheng`. It gives the model seven questions:

- At the start of a name, which character comes first? The right answer is `y`.
- After `y`, which character comes next? The right answer is `u`.
- After `yu`? `h`. After `yuh`? `e`. After `yuhe`? `n`. After `yuhen`? `g`.
- After `yuheng`? The right answer is the mark: the name ends here.

The model has 4,192 numbers that decide its answers. They are its parameters. Training changes the parameters, a little at each step, so that the right answers get higher probabilities. One number says how wrong the answers are: the loss. Part 5 defines it. A step of training lowers the loss on the name that the step saw.

That is the whole task. A GPT is a function from a sequence of tokens to a probability for each possible next token, and a rule for changing its parameters. Karpathy's microGPT writes the function and the rule in Python, on single numbers. The flat program writes the same function and the same rule on whole arrays.

## The files

The program is in the folder [explorations/run-c4/src](src:explorations/run-c4/src). Four files matter here:

- `MicroGptFlat.fss` holds the model: 98 lines. This text walks through it.
- `FlatArrays.fss` holds the array operations that the model's lines call, 190 lines. The project's record calls this file the vocabulary, and so does this text.
- `FlatData.fss` reads the parameters and the corpus from text files, 125 lines.
- `MicroGptFlatQuick.fss` is the quick check: it runs the model twice and compares the results with stored values. Part 8 reads it.

A `.fss` file holds a component, which is a unit of Fortress code. Beside each component is a `.fsi` file of the same name. It holds an api: the list of the names that other components may use, with their types. The pair is like the `.h` file beside the `.m` file of an Objective-C class.

The model's file starts with a comment. Fortress writes a comment between `(*` and `*)`.

@src 1-8

The comment names the parts of the file in order: the constants ("hyperparameters"), the table that says where each weight matrix lies ("the layout table"), four functions on vectors, the step, Adam, and the training loop. The parts of this text follow the same pieces.

The comment also names three things from the project's history, which this text does not need:

- "Hsu" is Aaron Hsu, who writes compilers in APL. The program's data layout follows his advice: few arrays, each flat, and no objects in between. The word "flat" in the program's name means this layout.
- The `.dyalog` file is an APL program with the same layout. The Fortress lines were written beside its lines.
- "Run C4" is the record's name for this program. It was the fourth round of an experiment that the record calls run C.

## The frame: component, export, import

@src 9-14

- Line 9 opens the component. Its name must be the file's name. The matching `end` is the file's last line, line 98.
- Line 10 says that this component implements the api `MicroGptFlat`. The api's file lists what the model offers to other components: the layout table, the corpus, `step`, `adam` and `learningRate`. The quick check imports these.
- Line 11 says that the component also implements the api `Executable`. That api has one function, `run(): ()`. A component that exports it is a program: `bin/fortress MicroGptFlat.fss` calls its `run`.
- Lines 12 to 14 import other apis. `{...}` is Fortress text, not an omission here: it means "every name of that api".

@src 98

The lines of this file use no name of `System`. A copy of the file without line 14 runs and prints the same loss. The timer in line 92, `nanoTime`, belongs to the library that every component sees. The quick check does use `System`, for `getProperty`.

## The constants

@src 16-18

Line 16 is a comment that works as a heading. The file has nine such lines. This text quotes each where its section begins.

Line 17 declares six names at once. The left side is a tuple of names and the right side is a tuple of values, as in Scala's `val (a, b) = (1, 2)`. A declaration with `=` makes an immutable variable, like Swift's `let`.

- `nEmbd` is 16. The model turns each token into a vector of 16 numbers, and every later vector that stands for a token has 16 numbers too.
- `blockSize` is 16. The model reads at most 16 positions of a name.
- `nHead` is 4 and `headDim` is 4. Part 4 explains them. Their product is `nEmbd`.
- `vocabSize` is 27: the 26 letters and the mark.
- `bosId` is 26: the integer that stands for the mark. Karpathy calls the mark BOS, for "beginning of sequence".

No type is written. A numeral without a point is a `ZZ32`, a signed 32-bit integer. A numeral with a point is an `RR64`, a 64-bit float.

Line 18 declares six more constants.

- `epsilon` is `10.0^(-5)`, which is 0.00001. The operator `^` is the power. Part 3 uses `epsilon`.
- `lr0`, `beta1`, `beta2`, `epsilon_A` and `nSteps` belong to Adam and to the training loop. Part 7 uses them.

@src 19

Line 19 gives the two places on disk: the corpus, and the folder of the parameters' starting values. The paths are relative, so the program runs only from its own folder, `explorations/run-c4/src`. The starting values are Karpathy's own, from his program's random seed 42, written out as text.

## The corpus as one matrix of tokens

A token is an integer that stands for one character. The program gives `a` the token 0, `b` the token 1, and so on to `z`, 25. The mark BOS is the token 26.

@src 47-48

Line 47 is the heading comment. "Tactic 3/5" points to two of Hsu's pieces of advice, by the numbers that the project's notes give them: keep a table as whole arrays, and turn characters into small integers once, when the data is loaded.

Line 48 declares a top-level variable with a written type, `Corpus`. Its value is computed once, when the component is loaded, before `run` starts. The function `loadCorpus` and the type `Corpus` are in `FlatData.fss`:

@src FlatData.fss 119-124

- Line 120 reads the file into an array of strings, one name each.
- Line 121 makes a matrix of integers and fills it with the token 26. `array[\ZZ32\](rows, columns)` is the library's function that makes an array. The brackets `[\ZZ32\]` hold a static argument, here the element type: Fortress writes `[\ \]` where Scala writes `[ ]`. `|names|` is the number of elements of `names`, 2,000. `blk` is `blockSize`, so the matrix has 17 columns.
- Line 122 is a loop with two counters, `d` over the documents and `j` over the characters of one name. A document is one name of the corpus. `0#n` is a range: `n` integers, starting at 0. So `0#5` is 0, 1, 2, 3, 4. The body puts the token of character `j` into column `1 + j`. A character's token is its code point minus the code point of `a`. The operator `:=` assigns to an element of an array.
- A Fortress loop runs its turns in parallel unless every range is wrapped in `seq`. Here both are wrapped, so the loop runs in order.
- Line 123 builds the result, a `Corpus` object. Its second argument is a vector with one entry for each document: 1 plus the number of the name's characters.

Here is row 0 of the matrix, for `yuheng`, as a run printed it:

```out
26 24 20 7 4 13 6 26 26 26 26 26 26 26 26 26 26
```

Column 0 holds BOS. Columns 1 to 6 hold `y` (24), `u` (20), `h` (7), `e` (4), `n` (13) and `g` (6). Every later column still holds the 26 from line 121. The length that line 123 stores for this document is 7.

The object's declaration follows.

@src FlatData.fss 106-118

- Line 106 declares an object with three parameters. An object's parameters are its fields, as in a Scala case class. `tokm` is the token matrix, `len` the lengths, `blk` the block size.
- The types use the library's array type, `Array[\E,I\]`. `E` is the type of the elements and `I` the type of the index. `Array[\ZZ32,ZZ32\]` has one integer as its index: it is a vector of integers. `Array[\ZZ32,(ZZ32,ZZ32)\]` has a pair of integers as its index: it is a matrix of integers.
- Lines 107 to 109 are small methods. `tokm[d, j]` reads the element in row `d` and column `j`.
- Lines 112 to 117 are the three methods that the step calls. The next section shows what they return.

## The first line of the step: the keys

@src 50-51

The function `step` is the model. Its header says what goes in and what comes out.

- `p` is a vector of floats: the 4,192 parameters.
- `b` is a vector of integers: the numbers of the documents to learn from in this step. The program calls this vector a batch. Every run in this text uses a batch of one document, document 0.
- The result is a pair. Its first part is the loss, one float. Its second part is a vector of 4,192 floats, the gradient. Part 6 says what a gradient is.
- `= do` opens a block. The block ends at line 72, and its value is its last expression, in line 71.

The comment says "Pure": `step` changes nothing outside itself. It reads `p` and `b` and the corpus, and it returns two values.

!!! limit
The type `Array[\RR64,ZZ32\]` does not say how long the vector is. The library has a type that does: `Vector[\RR64,n\]`, where `n` is a size that the type carries. The model uses the type without a size everywhere. One cause is in walk: a function whose type has a size parameter cannot be passed as an argument (the gap ledger's row 156; Part 3 meets it at `rmsn`). Whether the model's arrays get types with sizes is a decision of yours that is still open; the record calls it decision D.
!!!

The step's first line makes five vectors. A semicolon separates declarations on one line.

@src 52: ids = corpus.tokens(b, 0)
@src 52: tg = corpus.tokens(b, 1)
@src 52: vm = corpus.valid(b)
@src 52: nv = SUM vm
@src 52: pos = corpus.positions(b)

Each vector has one entry for each pair of a document and a position. A position is a place in a name's row of tokens, counted from 0. The model reads 16 positions of each document, so a batch of one document gives 16 entries. This text calls such an entry a row, because every matrix that the step computes later has one row for each of these pairs.

With document 0 as the batch, a run printed the five values:

```out
ids = 26 24 20 7 4 13 6 26 26 26 26 26 26 26 26 26
tg = 24 20 7 4 13 6 26 26 26 26 26 26 26 26 26 26
vm = 1.0 1.0 1.0 1.0 1.0 1.0 1.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0
nv = 7.0
pos = 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
```

- `ids` holds the token that the model reads at each position: columns 0 to 15 of the corpus row. The program calls these integers keys, because the step uses them to look rows up in tables.
- `tg` holds the token one place later: columns 1 to 16. It is the right answer for each position, the target. At position 0 the model reads BOS (26) and the target is `y` (24). At position 6 it reads `g` (6) and the target is BOS (26).
- `vm` says which rows count: 1.0 for the seven questions of `yuheng`, 0.0 for the nine rows after the name's end. The method `valid` compares the position with the document's length, 7.
- `nv` is the number of rows that count. `SUM` adds the elements of an array, so `nv` is 7.0.
- `pos` holds each row's position.

In the methods' bodies, `r` is the row's number. `r DIV blk` is the whole part of `r` divided by 16: which document of the batch the row belongs to. `r MOD blk` is the remainder: the row's position. With one document in the batch, the row's number is its position.

The model must not use `tg` to compute its answers. It uses `ids` and `pos` for the answers, and `tg`, `vm` and `nv` only to measure how wrong the answers are.
