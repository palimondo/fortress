# The program as Fortress: where today's tree shapes it
> The lines whose form comes from a gap in today's implementation, in one list, each with a link to the place that reads it. Then what `FlatArrays.fss` builds that the library lacks, what only walk can run, and what looks odd but is the language.

## In the model's file

Three places in `MicroGptFlat.fss` have a form that a gap of today's tree forces. Each has a box at the place that reads the line.

1. Every array type of the model is `Array[\RR64,ZZ32\]` or its like, without a size. The library's `Vector` and `Matrix` carry their sizes in the type. Under walk, a function with a size parameter cannot be passed as an argument (row 156). The model passes four functions to `rows`, the function of `FlatArrays.fss` that applies a function to every row of a matrix. The four are `rmsn`, the RMS norm; `sm`, the softmax; and their backward forms, `rmsn_b` and `sm_b`. Types with sizes for the model are your open decision D. [Part 1, the step's header](part:task#s-the-first-line-of-the-step-the-keys) and [Part 3, rmsn](part:norm-softmax#s-rmsn-bring-a-row-to-a-standard-size).
2. Lines 32 to 36 write the layout table, the names and sizes of the nine weight matrices, as two functions with `if` chains. Walk refuses a typed array literal at the top level (row 142). [Part 2, the nine matrices](part:arrays#s-one-vector-of-parameters-nine-matrices).
3. Lines 83 to 85 write the type of each mutable variable. The parser's checks refuse `var p = ...` without one (row 177). [Part 7, the training loop](part:adam#s-the-training-loop).

Two smaller things are not forced by anything:

- Line 14 imports `System`, and the file uses no name of it.
- Lines 54 and 61 write `SQRT (1.0 headDim)`. Walk gives 2.0 for `SQRT headDim` as well.

## In FlatArrays.fss and the loader

The model's lines read as they do because `FlatArrays.fss` supplies what the library does not. By your rulings, the model's text is the notation, `FlatArrays.fss` is repaired around it, and what a fuller library would hold moves into the library. `FlatArrays.fss` still builds these itself:

- The operators on whole arrays: `×` and `/` between two arrays, `/` and `>` between an array and a number, and `SQRT`, `exp` and `log` of an array, in lines 25 to 32 of the file. The library has `+`, `-`, `MIN` and `MAX` between an array and a number, and `+` and `-` between two vectors or two matrices. It also has the product of two vectors element by element, as a function named `pmul` and not as an operator.
- `rows`, in four forms: for one matrix, for two matrices, and the same two for rank-3 arrays. Each is a `for` loop over the rows that writes through a view of a row. The library has no operation "apply this function to every row".
- Everything for rank-3 arrays, which are arrays with three indices: the product plane with plane, a matrix plus every plane, the transpose of every plane, and the views `heads`, `unheads` and `plane`. The library's algebra stops at matrices.
- The views take their sizes at run time, through `reflect`, the library's function that turns an integer into a size that a type can carry. That runs only under walk (row 307). [Part 2](part:arrays#s-one-vector-of-parameters-nine-matrices).
- `flat`, which copies the nine gradient matrices into one vector, is two nested loops with a running offset.

`Diag`, the diagonal matrix of Part 6, is different. A diagonal matrix with its own product is what the type system offers, and by your ruling it stays as it is.

In `FlatData.fss`, the file that reads the parameters and the corpus:

- `parseFloat` exists because the library's `strToFloat` gives wrong results (row 140).
- `parseRow` scans a line character by character, because the library's `split` does not cut a string at spaces (row 141).
- `readLines` reads the file twice: once to count the lines, once to fill an array of that size.

## What only walk runs

The whole program runs only under walk today. The project's goal is the same program compiled to bytecode and running fast, and the record tracks what stands between. Three of them touch lines of the model:

- The nine views of the parameter vector get their sizes from `reflect`, which does not run compiled (the gap ledger's row 307).
- The tuple bindings at the top level, lines 17 to 19, stop the compile today (row 988, filed this week). Under walk they bind, and your ruling keeps the form.
- `1.0 s` in line 77, the learning rate, is refused by the compiled path's checker when it checks against the interpreter's library: it cannot choose between the product of two floats and the product of two fractions (row 989, filed this week). Walk runs it as a product of floats.

Under walk there is no static type check. A program with a type error runs until the wrong value meets an operation that has no declaration for it. The error message in Part 7, "Failed to find any matching overload", is of this kind: it came at run time, from the product of a float and a fraction.

## What looks odd and is the language

These forms are not gaps. They are how Fortress is designed, or how the revival has settled it.

- `(1.0 s) / nSteps` in line 77. Division of two integers gives an exact fraction, so a float must come in first.
- `seq(...)` around a range, in lines 86 and in the loaders. A loop is parallel unless its ranges say otherwise.
- Juxtaposition. `beta1 m`, `x1 wq^T`, `4 nEmbd`, `r c` and the arguments of `println` are all the same operator, with a meaning chosen by the types.
- The bars. `|x|` is the size of an array and the absolute value of a number.
- ``DOT`` and ``SQRT`` in capitals. They are the ASCII names of the signs · and √. The source may hold a sign itself: the model writes `×` and `∑`, and in a run `v · v` printed 61.0 and `√ 4.0` printed 2.0.
- The tuple bindings of lines 17 to 19, 48, 53, 62 and 63. Your ruling keeps this form for the constants.
- The hand-written backward pass. It follows from the layout: the program holds plain arrays of floats, with no objects that could record how a number was made. Autograd, the field's name for a program that finds the gradient by itself, needs such objects.

## Sources

- Each gap: its row of the gap ledger, [explorations/fortress-gap-ledger.md](src:explorations/fortress-gap-ledger.md), by the number in the sentence.
- The three points on the compiled path are the ledger's rows 307, 988 and 989. No run on the compiled path stands behind this part.
- The operators on whole arrays: [FlatArrays.fss, lines 25 to 32](src:explorations/run-c4/src/FlatArrays.fss#L25).
- The values of `v · v`, `√ 4.0` and `SQRT headDim`: runs under walk.
- The backward lines as "the price of no autograd": [HANDOVER-HSU.md, line 53](src:explorations/apl/reference/hsu-flat/HANDOVER-HSU.md#L53).
