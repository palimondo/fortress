# Goldens: "It's arrays all the way down"

Source: https://xpqz.github.io/learnapl/array.html, fetched 2026-09-11.

Every example the chapter runs, in the order it appears. Input lines are indented six spaces in the APL convention; the book's printed output follows unindented and verbatim.

The examples form one session read top to bottom: variables and settings from an earlier example hold for the later ones.

The chapter sets `⎕IO ← 0`, so every index and every `⍳` result counts from zero. That is the book's choice, stated in its first example below, not APL's default.

Each example is labelled `core` when it uses only simple numeric arrays and the primitives `+ - × ÷ ⌈ ⌊ * ⍳ ⍴ , ⌽ ⍉ / ⊂ ≡ ≢ ⍋ ⍒ ↑ ↓ ⍷ ∊ ~ ∪ ∩`, or `needs:` followed by what it asks for beyond that.

Where GNU APL 2.0 printed something different, a second fenced block marked `apl-oracle` follows the book's, preceded by a one-line note on the difference. This chapter ran under `]BOXING 7`; the invocation, and the translation of Dyalog's `]box`, `]DISPLAY` and `]rows` user commands, which GNU APL does not have, are in `ORACLE.md`.

## Ex 1 — needs: ⎕ system name

Sets the index origin for the whole chapter; every index and every ⍳ result below counts from zero.

Book: "But first things first: we promised to be explicit about our index origin, so let us set that to zero upfront."

```apl
      ⎕IO ← 0
```

## Ex 2 — needs: nested arrays; ⎕ system name

```apl
      ⎕ ← data ← (1 2 3 4) (2 5 8 6) (8 6 2 3) (8 7 6 1)
┌───────┬───────┬───────┬───────┐
│1 2 3 4│2 5 8 6│8 6 2 3│8 7 6 1│
└───────┴───────┴───────┴───────┘
```

Oracle differs (display): Same data; GNU APL at ]BOXING 7 frames each nested element separately instead of drawing one table.

```apl-oracle
 1 2 3 4  2 5 8 6  8 6 2 3  8 7 6 1 
```

## Ex 3 — needs: nested arrays; glyphs outside the set: ⊃ ⌿

```apl
      ⊃+⌿↑data
19
```

Oracle differs (value): GNU APL is an APL2: monadic ↑ is First and monadic ⊃ is Disclose, so Dyalog's Mix ↑ is ⊃ here and Dyalog's First ⊃ has no one-glyph equivalent. ⊃+⌿⊃data gives 19 20 19 14 in GNU APL, and there is no First to finish the idiom with.

```apl-oracle
10
```

## Ex 4 — needs: nested arrays

```apl
      ↑data
1 2 3 4
2 5 8 6
8 6 2 3
8 7 6 1
```

Oracle differs (value): GNU APL is an APL2: monadic ↑ is First and monadic ⊃ is Disclose, so Dyalog's Mix ↑ is ⊃ here and Dyalog's First ⊃ has no one-glyph equivalent. ↑data returns the first element; the mixed matrix is ⊃data.

```apl-oracle
1 2 3 4
```

## Ex 5 — needs: nested arrays; glyphs outside the set: ⌿

```apl
      +⌿↑data
19 20 19 14
```

Oracle differs (value): Sums the first element only, for the same reason as Ex 4.

```apl-oracle
10
```

## Ex 6 — needs: nested arrays; glyphs outside the set: ⊃ ⌿

```apl
      ⊃+⌿↑data
19
```

Oracle differs (value): Same as Ex 3.

```apl-oracle
10
```

## Ex 7 — core

The shape of a scalar is the empty vector, which prints as nothing.

```apl
      ⍴5

```

## Ex 8 — needs: ] user command

Dyalog user command, not language: it turns on the boxed display used by the outputs below.

Book: "Let us ask Dyalog to help us a bit by displaying output with borders indicating shape, type and structure."

Oracle translation: ]box translated to ]BOXING 8.

```apl
      ⍝ Some visualisation help, please.
      ]box on -style=max
┌→────────────────┐
│Was ON -style=min│
└─────────────────┘
```

Oracle differs (value): GNU APL has no ]box command; the run uses ]BOXING, which prints no confirmation message.

```apl-oracle
(no output)
```

## Ex 9 — core

The same expression as Ex 7; only the display setting changed.

```apl
      ⍴5
┌⊖┐
│0│
└~┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌⊖┐
│0│
└─┘
```

## Ex 10 — needs: ] user command

Book: "Running with ]box -style=max gets very noisy after a while, so let us dial that back a bit."

Oracle translation: ]box translated to ]BOXING 7.

```apl
      ]box on -style=min
Was ON -style=max
```

Oracle differs (value): Same: ]BOXING prints no confirmation message.

```apl-oracle
(no output)
```

## Ex 11 — needs: glyphs outside the set: ⍬

Needs ⍬ (zilde), the empty numeric vector literal.

```apl
      ⍬≡⍴5 ⍝ Does zilde match shape of 5?
1
```

## Ex 12 — needs: ] user command

]DISPLAY is a Dyalog user command that draws the shape and type frame.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY 8 5 2 3 ⍝ A vector, yay
┌→──────┐
│8 5 2 3│
└~──────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────┐
│8 5 2 3│
└∼──────┘
```

## Ex 13 — needs: ] user command

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY ⍴ 8 5 2 3 ⍝ What's the shape of my vector?
┌→┐
│4│
└~┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→┐
│4│
└∼┘
```

## Ex 14 — needs: nested arrays; ] user command

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      m ← ↑(1 2 3 4)(5 6 7 8)(9 10 11 12)
      ]DISPLAY m
┌→─────────┐
↓1  2  3  4│
│5  6  7  8│
│9 10 11 12│
└~─────────┘
```

Oracle differs (value): m becomes the first element 1 2 3 4 instead of a 3×4 matrix, because monadic ↑ is First; Ex 15 to 17 inherit that m.

```apl-oracle
┌→──────┐
│1 2 3 4│
└∼──────┘
```

## Ex 15 — core

Uses the m bound in Ex 14, which needs Mix over a nested strand.

```apl
      ⍴m
3 4
```

Oracle differs (value): The shape of the m bound in Ex 14, a 4-element vector here.

```apl-oracle
4
```

## Ex 16 — needs: ] user command

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY ⍴⍴m
┌→┐
│2│
└~┘
```

Oracle differs (value): The rank of that m is 1.

```apl-oracle
┌→┐
│1│
└∼┘
```

## Ex 17 — core

Same m as Ex 15.

```apl
      ≢⍴m ⍝ Rank
2
```

Oracle differs (value): Same.

```apl-oracle
1
```

## Ex 18 — core

Scalar extension: scalar with scalar, scalar with vector, then vector with vector of equal length.

```apl
      1 + 1          ⍝ Scalar + scalar
      1 + 1 2 3      ⍝ Scalar + vector
      1 2 3 + 9 3 2  ⍝ Vector + vector
2
2 3 4
10 5 5
```

## Ex 19 — needs: ] user command

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY 2 4⍴⍳8 ⍝ Reshape vector to 2×4 matrix
┌→──────┐
↓0 1 2 3│
│4 5 6 7│
└~──────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────┐
↓0 1 2 3│
│4 5 6 7│
└∼──────┘
```

## Ex 20 — needs: ] user command

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY v ← 8 6 2 9     ⍝ Vector of length 4
      ]DISPLAY m ← 1 4⍴v       ⍝ Reshape vector to 1×4 matrix
┌→──────┐
│8 6 2 9│
└~──────┘
┌→──────┐
↓8 6 2 9│
└~──────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────┐
│8 6 2 9│
└∼──────┘
┌→──────┐
↓8 6 2 9│
└∼──────┘
```

## Ex 21 — core

```apl
      ≢⍴v
      ≢⍴m
      
      v≡m ⍝ Does v match m?
1
2
0
```

## Ex 22 — core

```apl
      v 
      m
      
      v≡m ⍝ ?????
8 6 2 9
8 6 2 9
0
```

## Ex 23 — needs: ⎕ system name

```apl
      ⎕ ← m ← 2 4⍴0 1 2 3 4 5 6 7 ⍝ y=2, x=4
      ⍴m
0 1 2 3
4 5 6 7
2 4
```

## Ex 24 — needs: nested arrays; ⎕ system name

Enclose ⊂ makes a scalar out of an array; the box in the output is the enclosure.

```apl
      ⎕ ← v ← 1 2 3
      ⊂v         ⍝ Enclose the vector 1 2 3
      v≡⊂v       ⍝ Does the vector v match the enclosed v? Of course not!
1 2 3
┌─────┐
│1 2 3│
└─────┘
0
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
1 2 3
┌→────┐
│1 2 3│
└∼────┘
0
```

## Ex 25 — needs: nested arrays

```apl
      ≢⍴v  ⍝ Rank of vector should be 1
      ≢⍴⊂v ⍝ Rank of scalar should be 0
1
0
```

## Ex 26 — needs: nested arrays; ] user command

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY v ← (1 2 3) (2 3 4) (2 3 4)
┌→────────────────────────┐
│ ┌→────┐ ┌→────┐ ┌→────┐ │
│ │1 2 3│ │2 3 4│ │2 3 4│ │
│ └~────┘ └~────┘ └~────┘ │
└∊────────────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────────────────────┐
│┌→────┐ ┌→────┐ ┌→────┐│
││1 2 3│ │2 3 4│ │2 3 4││
│└∼────┘ └∼────┘ └∼────┘│
└ϵ──────────────────────┘
```

## Ex 27 — needs: nested arrays; bracket indexing

Bracket indexing a nested vector returns the enclosed cell, not its contents.

```apl
      v[1] ⍝ Get position 1 -- we get back an enclosed vector
┌─────┐
│2 3 4│
└─────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────┐
│2 3 4│
└∼────┘
```

## Ex 28 — needs: nested arrays; characters

```apl
      (1 ('hello' 2)) (3 ('world' 4))
┌─────────────┬─────────────┐
│┌─┬─────────┐│┌─┬─────────┐│
││1│┌─────┬─┐│││3│┌─────┬─┐││
││ ││hello│2││││ ││world│4│││
││ │└─────┴─┘│││ │└─────┴─┘││
│└─┴─────────┘│└─┴─────────┘│
└─────────────┴─────────────┘
```

Oracle differs (value): Same data, but GNU APL lays the two nested scalars side by side rather than as one row of cells, so the text does not line up.

```apl-oracle
┌→────────────┐ ┌→────────────┐
│1 ┌→────────┐│ │3 ┌→────────┐│
│  │┌→────┐ 2││ │  │┌→────┐ 4││
│  ││hello│  ││ │  ││world│  ││
│  │└─────┘  ││ │  │└─────┘  ││
│  └ϵ────────┘│ │  └ϵ────────┘│
└ϵϵ───────────┘ └ϵϵ───────────┘
```

## Counts

Examples: 28. Core — simple numeric arrays and the listed primitives only: 7 (Ex 7, Ex 9, Ex 15, Ex 17, Ex 18, Ex 21, Ex 22).

Beyond the core set: 21, needing characters, nested arrays, `⎕` system names, Dyalog `]` user commands, dfns, or primitives and operators outside the list.

GNU APL 2.0 printed something different in 20 of the 28 examples: 9 display-only, 11 different values, 0 where GNU APL errors out.
