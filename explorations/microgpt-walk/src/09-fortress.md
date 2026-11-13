# The program as Fortress: where today's tree shapes it
> The lines whose form comes from a gap in today's implementation, in one list, each with its place in this text. Then what the vocabulary builds that the library lacks, what only walk can run, and what looks odd but is the language.

## In the model's file

Six places in `MicroGptFlat.fss` have a form that a gap of today's tree forces. Each is marked where this text reads the line.

1. Lines 21 to 24 declare the postfix operator `^T` in the model. It belongs in the vocabulary. The parser refuses this declaration in an api (the gap ledger's row 133). [Part 2, the transpose](part:arrays#s-the-transpose-and-lines-21-to-24).
2. Every array type of the model is `Array[\RR64,ZZ32\]` or its like, without a size. The library's `Vector` and `Matrix` carry their sizes in the type. Under walk, a function with a size parameter cannot be passed as an argument (row 156), and the model passes `rmsn`, `sm`, `rmsn_b` and `sm_b` to `rows`. Types with sizes for the model are your open decision D. [Part 1, the step's header](part:task#s-the-first-line-of-the-step-the-keys) and [Part 3, rmsn](part:norm-softmax#s-rmsn-bring-a-row-to-a-standard-size).
3. Lines 37 to 41 write the layout table as two functions with `if` chains. Walk refuses a typed array literal at the top level (row 142). [Part 2, the nine matrices](part:arrays#s-one-vector-of-parameters-nine-matrices).
4. Line 43 writes `[\ZZ32\]` after `SUM`. Walk finds the type; the compiled path's checker does not (row 731). The same part of Part 2.
5. Line 70 writes `transpose(...)` where lines 63 to 68 write `^T`. A call cannot be followed by `^T` (rows 144 and 158). [Part 6, the two tables](part:backward#s-back-to-the-two-tables).
6. Lines 88 to 90 write the type of each mutable variable. The parser's checks refuse `var p = ...` without one (row 177). [Part 7, the training loop](part:adam#s-the-training-loop).

Two smaller things are not forced by anything:

- Line 14 imports `System`, and the file uses no name of it.
- Lines 59 and 66 write `SQRT (1.0 headDim)`. Walk gives 2.0 for `SQRT headDim` as well.

## In the vocabulary and the loader

The model's lines read as they do because `FlatArrays.fss` supplies what the library does not. By your rulings, the model's text is the notation, the vocabulary is repaired around it, and what a fuller library would hold moves into the library. Here is what the vocabulary still builds itself.

- The operators on whole arrays: `×` and `/` between two arrays, `/` and `>` between an array and a number, and `SQRT`, `exp` and `log` of an array ([FlatArrays.fss, lines 25 to 32](src:explorations/run-c4/src/FlatArrays.fss#L25)). The library has `+`, `-`, `MIN` and `MAX` between an array and a number, and `+` and `-` between two vectors or two matrices. It also has the product of two vectors element by element, as a function named `pmul` and not as an operator.
- `rows`, in four forms. Each is a `for` loop over the rows that writes through a view of a row. The library has no operation "apply this function to every row".
- Everything for rank-3 arrays: the product plane with plane, a matrix plus every plane, the transpose of every plane, and the views `heads`, `unheads` and `plane`. The library's algebra stops at matrices.
- The views take their sizes at run time, through `reflect`. That runs only under walk (row 307). [Part 2](part:arrays#s-one-vector-of-parameters-nine-matrices).
- `transpose` is a function, and `^T` cannot stand beside it in the api (row 133).
- `flat` is two nested loops with a running offset.

`Diag` is different. A diagonal matrix with its own product is what the type system offers, and by your ruling it stays as it is.

In `FlatData.fss`:

- `parseFloat` exists because the library's `strToFloat` gives wrong results (row 140).
- `parseRow` scans a line character by character, because the library's `split` does not cut a string at spaces (row 141).
- `readLines` reads the file twice: once to count the lines, once to fill an array of that size.

## What only walk runs

The whole program runs only under walk today. The project's goal is the same program compiled to bytecode and running fast, and the record tracks what stands between. Three such things touch lines of this text:

- The views get their sizes from `reflect`, which does not run compiled (the gap ledger's row 307).
- The tuple bindings at the top level, lines 17 to 19, stop the compile today (row 988, filed this week). Under walk they bind, and your ruling keeps the form.
- `1.0 s` in line 82 is refused by the compiled path's checker when it checks against the interpreter's library: it cannot choose between the product of two floats and the product of two fractions (row 989, filed this week). Walk runs it as a product of floats.

This text ran nothing on the compiled path. These three points are the ledger's.

Under walk there is no static type check. A program with a type error runs until the wrong value meets an operation that has no declaration for it. The error message in Part 7, "Failed to find any matching overload", is of this kind: it came at run time, from the product of a float and a fraction.

## What looks odd and is the language

These forms are not gaps. They are how Fortress is designed, or how the revival has settled it.

- `(1.0 s) / nSteps` in line 82. Division of two integers gives an exact fraction, so a float must come in first.
- `seq(...)` around a range, in lines 91 and in the loaders. A loop is parallel unless its ranges say otherwise.
- Juxtaposition. `beta1 m`, `x1 wq^T`, `4 nEmbd`, `r c` and the arguments of `println` are all the same operator, with a meaning chosen by the types.
- The bars. `|x|` is the size of an array and the absolute value of a number.
- `DOT`, `SQRT` and `SUM` in capitals. They are the ASCII names of the signs ·, √ and ∑. The source may hold a sign itself: the model writes `×`, and in a run `v · v` printed 61.0 and `√ 4.0` printed 2.0. The sign ∑ is the exception today. The parser takes it as a prefix operator and not as a big operator, so only the name `SUM` works (the gap ledger's row 5).
- The tuple bindings of lines 17 to 19, 53, 58, 67 and 68. Your ruling keeps this form for the constants.
- The hand-written backward pass. It follows from the layout: the program holds plain arrays of floats, with no objects that could record how a number was made.
