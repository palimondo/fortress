# Goldens: "Products"

Source: https://xpqz.github.io/learnapl/products.html, fetched 2026-09-14.

Every example the chapter runs, in the order it appears. Input lines are indented six spaces in the APL convention; the book's printed output follows unindented and verbatim.

The examples form one session read top to bottom: variables, functions and settings from an earlier example hold for the later ones.

The chapter sets `⎕IO ← 0` in its prelude, as every chapter before it does, so every index and every `⍳` result counts from zero. That is the book's choice, not APL's default. Ex 2 and Ex 3 in particular show a "times table" whose first row and column are zeros, which is what origin zero buys.

Each example is labelled `core` when it uses only simple numeric arrays, the primitives `+ - × ÷ ⌈ ⌊ * ⍳ ⍴ , ⌽ ⍉ / ⊂ ≡ ≢ ⍋ ⍒ ↑ ↓ ⍷ ∊ ~ ∪ ∩`, and dfns with `⍺` and `⍵`, guards included — chapter 4 introduced dfns and their guards, and the chapters since build on them, so both count as core here — or `needs:` followed by what it asks for beyond that. The named needs used below are: characters, `⎕` system names, `]` user commands, bracket indexing, outer product `∘.`, inner product `f.g`, rank `⍤`, user-defined operators `⍺⍺`, tacit, and `glyphs outside the set:` followed by the glyphs themselves. Reduce-first `⌿` is counted among the glyphs outside the set: chapter 3's list has only `/`.

Three things the chapter prints are not examples and are not numbered: a Python double loop used for comparison, the identity `∘.f → f¨⍤0 99` shown in a tip box, and the list of six genotype pairings in the Rosalind problem.

Where GNU APL 2.0 printed something different, a second fenced block marked `apl-oracle` follows the book's, preceded by a one-line note on the difference. This chapter ran under `]BOXING 7`, switching to `]BOXING 8` for the two examples that use `]DISPLAY`; the invocation and the translation of Dyalog's `]box`, `]rows`, `]DISPLAY` and `]runtime` user commands, which GNU APL does not have, are in `ORACLE.md`.

## Ex 1 — needs: ⎕ system name; ] user command

Index origin zero, boxed display and unwrapped output rows — the same prelude the earlier chapters run, minus chapter 5's assert helper.

Oracle translation: ]box on translated to ]BOXING 7.

Oracle translation: ]rows on has no GNU APL equivalent; ⎕PW←10000 stands in.

```apl
      ⎕IO ← 0
      ]box on
      ]rows on
Was ON
Was OFF
```

Oracle differs (value): GNU APL has no ]box or ]rows; the run sets ]BOXING 7 and ⎕PW←10000 instead, and neither prints a confirmation message.

```apl-oracle
(no output)
```

## Ex 2 — needs: outer product ∘.; glyphs outside the set: ⍨

The canonical outer product: a times table, every element of the left argument against every element of the right. `∘.×⍨` applies it to `⍳10` on both sides.

```apl
      ∘.×⍨⍳10
0 0  0  0  0  0  0  0  0  0
0 1  2  3  4  5  6  7  8  9
0 2  4  6  8 10 12 14 16 18
0 3  6  9 12 15 18 21 24 27
0 4  8 12 16 20 24 28 32 36
0 5 10 15 20 25 30 35 40 45
0 6 12 18 24 30 36 42 48 54
0 7 14 21 28 35 42 49 56 63
0 8 16 24 32 40 48 56 64 72
0 9 18 27 36 45 54 63 72 81
```

## Ex 3 — needs: outer product ∘.; glyphs outside the set: < ⍨

The right operand of `∘.` can be any dyadic function, user-defined ones included: here Less Than, giving a strictly-upper-triangular Boolean matrix.

```apl
      ∘.<⍨⍳10
0 1 1 1 1 1 1 1 1 1
0 0 1 1 1 1 1 1 1 1
0 0 0 1 1 1 1 1 1 1
0 0 0 0 1 1 1 1 1 1
0 0 0 0 0 1 1 1 1 1
0 0 0 0 0 0 1 1 1 1
0 0 0 0 0 0 0 1 1 1
0 0 0 0 0 0 0 0 1 1
0 0 0 0 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0 0
```

## Ex 4 — needs: rank ⍤; glyphs outside the set: < ⊢

The same matrix via the Rank operator: `<⍤0 1` pairs each scalar on the left with the whole vector on the right. Outer product is a special case of Rank.

```apl
      (⍳10) <⍤0 1 ⊢ ⍳10
0 1 1 1 1 1 1 1 1 1
0 0 1 1 1 1 1 1 1 1
0 0 0 1 1 1 1 1 1 1
0 0 0 0 1 1 1 1 1 1
0 0 0 0 0 1 1 1 1 1
0 0 0 0 0 0 1 1 1 1
0 0 0 0 0 0 0 1 1 1
0 0 0 0 0 0 0 0 1 1
0 0 0 0 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0 0
```

## Ex 5 — needs: tacit; ] user command; outer product ∘.; rank ⍤; characters

The two formulations are equivalent but not equally fast; the timings and the bar chart are one machine's.

```apl
      prod ← ∘.×
      rank ← ×⍤0 1
      x←⍳1000
      ]runtime -c "x prod x" "x rank x"
                                                                    
  x prod x → 8.1E¯4 |   0% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕ 
  x rank x → 6.5E¯4 | -21% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕         
```

Oracle differs (error): Tacit assignment of a derived function is a SYNTAX ERROR in GNU APL — both `∘.×` and `×⍤0 1` — and `]runtime` is a BAD COMMAND, GNU APL having no such user command. The `x←⍳1000` in between runs.

```apl-oracle
SYNTAX ERROR
      prod←∘.×
      ^    ^
SYNTAX ERROR
      rank←(×⍤0 1)
      ^    ^
BAD COMMAND
```

## Ex 6 — needs: outer product ∘.; glyphs outside the set: = ⌿ |

Primes below 20: the divisibility table `x∘.|x`, the count of zero remainders per column, and the numbers with exactly two divisors. Note the assignment to `x` on the right of the expression that uses it — right-to-left evaluation.

```apl
      (2=+⌿0=x∘.|x)/x←⍳20
2 3 5 7 11 13 17 19
```

## Ex 7 — needs: ] user command; inner product f.g

Matrix multiplication is the inner product `+.×`: multiply along the shared axis, then sum.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY A ← 3 4⍴3 2 0 8 11 7 5 1 4 9 6 10
      ]DISPLAY B ← 4 3⍴8 10 11 2 4 6 5 1 7 9 3 0
      ]DISPLAY A +.× B
┌→────────┐
↓ 3 2 0  8│
│11 7 5  1│
│ 4 9 6 10│
└~────────┘
┌→──────┐
↓8 10 11│
│2  4  6│
│5  1  7│
│9  3  0│
└~──────┘
┌→──────────┐
↓100  62  45│
│136 146 198│
│170 112 140│
└~──────────┘
```

Oracle differs (display): Display only: the matrices and the product agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`.

```apl-oracle
┌→────────┐
↓ 3 2 0  8│
│11 7 5  1│
│ 4 9 6 10│
└∼────────┘
┌→──────┐
↓8 10 11│
│2  4  6│
│5  1  7│
│9  3  0│
└∼──────┘
┌→──────────┐
↓100  62  45│
│136 146 198│
│170 112 140│
└∼──────────┘
```

## Ex 8 — needs: ⎕ system name; bracket indexing

The first half of the top-left element by hand: row 0 of A times column 0 of B.

```apl
      ⎕ ← row0col0prod ← A[0;]×B[;0]
24 4 0 72
```

## Ex 9 — core

The second half: sum the products to get the 100 in the corner of Ex 7's result.

```apl
      +/row0col0prod
100
```

## Ex 10 — needs: bracket indexing

The next element along, in one line.

```apl
      +/A[0;]×B[;1]
62
```

## Ex 11 — needs: characters; glyphs outside the set: =

How many positions two strings agree in, written as "apply one function, then reduce another over the result".

```apl
      +/'GATTACA' = 'TATTCAG' ⍝ Equal-then-sum-reduce
3
```

## Ex 12 — needs: characters; inner product f.g; glyphs outside the set: =

The same thing as an inner product — the pattern `f/x g y` is exactly what `f.g` is for.

```apl
      'GATTACA' +.= 'TATTCAG'
3
```

## Ex 13 — core

The Rosalind "Calculating Expected Offspring" input: couples per genotype pairing.

```apl
      data ← 19083 17341 19657 16896 16197 18256
```

## Ex 14 — core

The probability of a dominant phenotype for each of the six pairings.

```apl
      prob ← 1 1 1 0.75 0.5 0
```

## Ex 15 — needs: inner product f.g

The whole problem in one inner product: weight the counts by their probabilities, sum, and double for two offspring per couple.

```apl
      2×data+.×prob ⍝ Same as 2× +/ data×prob
153703
```

## Ex 16 — needs: characters; ⎕ system name; user-defined operators ⍺⍺; glyphs outside the set: ⋄ ⊢

Adám Brudzewsky's "eXplanation" operator: instead of computing, it builds the string of what would have been computed. `⎕CR 'f'` is the character representation of the operand function.

```apl
      X ← {f←⍺⍺ ⋄ ⍺←⊢ ⋄ '(',⍺,(⎕CR'f'),⍵,')'} ⍝ The product eXplanation operator
```

## Ex 17 — needs: ] user command; inner product f.g; glyphs outside the set: ?

Uses dyadic ? (Deal), so A and B are random: this and Ex 18 are one run only.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY A ← 2 3⍴6?20
      ]DISPLAY B ← 3 2⍴6?20
      ]DISPLAY A +.× B
┌→───────┐
↓ 3  2 19│
│16 11  4│
└~───────┘
┌→────┐
↓18 17│
│ 9  7│
│ 3  1│
└~────┘
┌→──────┐
↓129  84│
│399 353│
└~──────┘
```

Oracle differs (value): Dyadic ? (Deal) is random, so the oracle drew different matrices; the values below differ for that reason alone, and the frame's type marker is `∼` rather than `~`.

```apl-oracle
┌→──────┐
↓16 6 18│
│13 3 11│
└∼──────┘
┌→────┐
↓ 3 19│
│ 4 14│
│16 15│
└∼────┘
┌→──────┐
↓360 658│
│227 454│
└∼──────┘
```

## Ex 18 — needs: inner product f.g; the eXplanation operator X defined in Ex 16

The same inner product with X spliced into both slots: each cell of the result is the string of the arithmetic that produced it, showing the right-to-left nesting of the `+` reduction.

```apl
      A +X.(×X) B
┌────────────────────────────────────┬────────────────────────────────────┐
│(( 3 × 18 )+(( 2 × 9 )+( 19 × 3 ))) │(( 3 × 17 )+(( 2 × 7 )+( 19 × 1 ))) │
├────────────────────────────────────┼────────────────────────────────────┤
│(( 16 × 18 )+(( 11 × 9 )+( 4 × 3 )))│(( 16 × 17 )+(( 11 × 7 )+( 4 × 1 )))│
└────────────────────────────────────┴────────────────────────────────────┘
```

Oracle differs (error): GNU APL lambdas cannot be operators — `⍺⍺` parses as `⍺ ⍺` — so `+X` is not a function and the whole expression is a SYNTAX ERROR. A plain lambda *as* an inner product operand does work: `1 2 {⍺+⍵}.× 3 4` is 11.

```apl-oracle
SYNTAX ERROR+
      A+X.(×X)B
      ^       ^
```

## Counts

Examples: 18. Core — simple numeric arrays, the listed primitives and dfns with guards only: 3 (Ex 9, Ex 13, Ex 14).

Beyond the core set: 15, needing characters, `⎕` system names, Dyalog `]` user commands, bracket indexing, the outer product `∘.`, the inner product `f.g`, Rank `⍤`, user-defined operators, tacit definition, or primitives outside the list.

GNU APL 2.0 printed something different in 5 of the 18 examples: 1 display-only, 2 different values, 2 where GNU APL errors out.
