# The quick check
> How the project knows that the Fortress program computes the right numbers: seven comparisons with stored values, in a second program of 60 lines.

## What is compared with what

Every number in this text rests on the model being right. The project does not take that on trust. A second program, `MicroGptFlatQuick.fss`, runs the model and compares its results with values that another program computed.

The other program is written in Python with NumPy: [microgpt_flat.py](src:explorations/apl/reference/hsu-flat/microgpt_flat.py). It has the same data layout, and it starts from the same parameter files. A script ran it once and stored its results as text files, one number on each line, in the folder [explorations/run-c/goldens](src:explorations/run-c/goldens). The record calls these stored values goldens.

A run of the quick check under walk printed this. The times are left out, as in Part 7.

```out
MicroGptFlat quick checks (Run C4, two steps) | threads 1 | tolerances: loss 1.0E-12 grad 1.0E-12
loader: max |P - P0| over 4192: diff 0.0 PASS
corpus: max |row - golden| over documents 0..15: diff 0.0 PASS
batch 1 step 1 loss 3.365966947584851 vs 3.365966947584851: diff 0.0 PASS
step 0 batch 1: max |gradient - golden| over 4192: diff 1.1102230246251565E-16 PASS
step 0 batch 1: zero gradient entries - 464: diff 0.0 PASS
step 0 batch 1: max |P after Adam - golden| over 4192: diff 2.7755575615628914E-16 PASS
batch 1 step 2 loss 3.4242727838717717 vs 3.424272783871772: diff 4.440892098500626E-16 PASS
VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS
```

The seven checks:

1. The loader. The 4,192 parameters that `loadParams` reads are equal to the stored vector, to the last digit.
2. The corpus. The first 16 rows of the token matrix, and the 16 lengths, are equal to the stored rows.
3. The loss of the step on document 0, `yuheng`: 3.365966947584851 in both programs.
4. The gradient of that step. The largest difference over the 4,192 entries is 0.00000000000000011.
5. The number of gradient entries that are exactly 0: 464, the count of Part 6.
6. The parameters after one Adam step. The largest difference is 0.00000000000000028.
7. The loss of the step on document 1 with the new parameters: 3.42427278387177 in both, with a difference in the sixteenth digit.

The differences in checks 4, 6 and 7 are a few units in the last binary digit of a 64-bit float. Two programs that add the same floats in a different order differ by that much.

Checks 3, 5 and 7 are numbers that this text has met: the loss of Part 5, the zeros of Part 6, and the second loss of the training loop in Part 7.

## The file

@src MicroGptFlatQuick.fss 11-16

The component exports only `Executable`: it is a program and offers nothing to others. It imports the model's api. So it can call what the api lists, such as `step`, `adam`, `matName` and `corpus`, and nothing else of the model.

@src MicroGptFlatQuick.fss 18-29

- Lines 18 to 20 are constants with written types. The two tolerances are 10 to the power -12.
- Lines 22 and 23 declare two top-level variables that can change: the form is `name: Type := value`, as in the training loop.
- `report` prints one line of the output above and counts it. `diff <= tol` is a comparison, and `ok` is a `Boolean`. `passed += 1` adds 1 to the variable.
- `maxAbsDiff` is the largest difference between two vectors. `BIG MAX` is used here with a generator: `i` runs over the indices, and the expression after the brackets is evaluated for each `i`. Around a number, the two bars give the absolute value: `|a[i] - b[i]|` is the difference without its sign. Around an array they give the size, as in `|a|`. Fortress chooses the meaning by the type of what stands between the bars.

@src MicroGptFlatQuick.fss 31-42

- Line 34 reads the parameters, as the model's own `run` does.
- Line 36 is check 1. `readVector` reads a file with one number on each line.
- Lines 37 to 42 are check 2. The body of the outer `BIG MAX` is a block, from `do` to `end`. For each of the 16 documents it parses the stored line and compares its numbers with `corpus.token` and `corpus.length`.

@src MicroGptFlatQuick.fss 43-59

- Line 46 calls the model on a batch that holds the document 0. Line 47 is check 3.
- Line 48 is check 4, against the stored gradient.
- Line 49 counts the zeros: a `SUM` over all the indices of 1 where the entry is 0.0. Line 50 is check 5.
- Line 51 calls `adam` with zeros for the two averages, step count 1 and the first learning rate. Line 52 is check 6.
- Line 54 calls the model again, with the new parameters, on the document 1. Line 55 is check 7.
- Line 58 ends the run with an error if a check failed, so that the program's exit status says so.

## Running it, and the full check

From the folder of the program:

```text
cd explorations/run-c4/src
../../../bin/fortress MicroGptFlatQuick.fss
```

The project's script `explorations/coordinator/tools/mg-run.sh` does the same from an empty cache and keeps the output in a file. By your ruling, the check of microGPT after a batch of work on the tree must take less than a minute. This program is that check.

A longer program beside it, `MicroGptFlatCheck.fss`, makes 40 checks. It runs five Adam steps, a batch of four documents, and the experiment of Part 6 on eleven parameters: it changes one parameter, calls the model twice, and compares the measured rate with the gradient's entry. This text did not run it.
