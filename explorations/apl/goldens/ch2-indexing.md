# Goldens: "Indexing"

Source: https://xpqz.github.io/learnapl/indexing.html, fetched 2026-09-11.

Every example the chapter runs, in the order it appears. Input lines are indented six spaces in the APL convention; the book's printed output follows unindented and verbatim.

The examples form one session read top to bottom: variables and settings from an earlier example hold for the later ones.

The chapter sets `⎕IO ← 0`, so every index and every `⍳` result counts from zero. That is the book's choice, stated in its first example below, not APL's default.

Each example is labelled `core` when it uses only simple numeric arrays and the primitives `+ - × ÷ ⌈ ⌊ * ⍳ ⍴ , ⌽ ⍉ / ⊂ ≡ ≢ ⍋ ⍒ ↑ ↓ ⍷ ∊ ~ ∪ ∩`, or `needs:` followed by what it asks for beyond that.

Where GNU APL 2.0 printed something different, a second fenced block marked `apl-oracle` follows the book's, preceded by a one-line note on the difference. This chapter ran under `]BOXING 7`; the invocation, and the translation of Dyalog's `]box`, `]DISPLAY` and `]rows` user commands, which GNU APL does not have, are in `ORACLE.md`.

## Ex 1 — needs: ⎕ system name

Index origin zero for the whole chapter, so v[5] below is the sixth element.

Book: "But as before, we begin by setting our index origin, extra important as we are about to discuss indexing."

```apl
      ⎕IO ← 0
```

## Ex 2 — needs: ] user command

]box on is a Dyalog user command; the frames in the outputs below come from it.

Oracle translation: ]box translated to ]BOXING 7.

```apl
      ]box on
Was ON
```

Oracle differs (value): GNU APL has no ]box command; the run uses ]BOXING 7 throughout and prints no confirmation message.

```apl-oracle
(no output)
```

## Ex 3 — needs: ⎕ system name; bracket indexing

```apl
      ⎕ ← v ← 9 2 6 3 5 8 7 4 0 1
      v[5]    ⍝ Grab the cell at index 5
9 2 6 3 5 8 7 4 0 1
8
```

## Ex 4 — needs: bracket indexing

```apl
      v[5 2]  ⍝ Grab the cells at indices 5 and 2
8 6
```

## Ex 5 — needs: bracket indexing

Indexed assignment; ¯1 is the high-minus negative literal, not a function.

```apl
      v[3] ← ¯1
      v
9 2 6 ¯1 5 8 7 4 0 1
```

## Ex 6 — needs: ] user command; bracket indexing

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY m ← 3 3⍴4 1 6 5 2 9 7 8 3 ⍝ a 3×3 matrix
      m[1;1]  ⍝ Row 1, col 1
      m[1;]   ⍝ Row 1
      m[;1]   ⍝ Col 1
┌→────┐
↓4 1 6│
│5 2 9│
│7 8 3│
└~────┘
2
5 2 9
1 2 8
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────┐
↓4 1 6│
│5 2 9│
│7 8 3│
└∼────┘
2
5 2 9
1 2 8
```

## Ex 7 — needs: nested arrays; bracket indexing

```apl
      m[⊂1 1] ⍝ Centre
2
```

Oracle differs (error): GNU APL bracket indexing has no enclosed-index form: m[⊂1 1] is a RANK ERROR.

```apl-oracle
RANK ERROR
      m[⊂1 1]
      ^^
```

## Ex 8 — needs: nested arrays; bracket indexing

Indexing with a vector of nested index vectors: one cell per coordinate pair.

```apl
      m[(0 0)(1 1)(2 2)] ⍝ Three points along the main diagonal
4 2 3
```

Oracle differs (error): GNU APL bracket indexing takes one index expression per axis, not a vector of index vectors: RANK ERROR.

```apl-oracle
RANK ERROR
      m[(0 0) (1 1) (2 2)]
      ^^
```

## Ex 9 — needs: nested arrays; ⎕ system name

```apl
      ⎕ ← m ← 3 3⍴(1 2 3)(3 2 1)(4 5 6)(5 3 1)(5 6 8)(7 1 2)(4 3 9)(3 7 6)(4 5 1)
┌─────┬─────┬─────┐
│1 2 3│3 2 1│4 5 6│
├─────┼─────┼─────┤
│5 3 1│5 6 8│7 1 2│
├─────┼─────┼─────┤
│4 3 9│3 7 6│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (display): Display only: the values agree, but at `]BOXING 7` GNU APL prints them without the frame the book shows.

```apl-oracle
 1 2 3  3 2 1  4 5 6 
 5 3 1  5 6 8  7 1 2 
 4 3 9  3 7 6  4 5 1 
```

## Ex 10 — needs: nested arrays; ] user command

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY m[1;1] ⍝ Note the returned enclosure.
┌─────────┐
│ ┌→────┐ │
│ │5 6 8│ │
│ └~────┘ │
└∊────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌───────┐
│┌→────┐│
││5 6 8││
│└∼────┘│
└ϵ──────┘
```

## Ex 11 — needs: nested arrays; ⎕ system name

```apl
      ⎕ ← m ← 3 3⍴(1 2 3)(3 2 1)(4 5 6)(5 3 1)(5 6 8)(7 1 2)(4 3 9)(3 7 6)(4 5 1)
┌─────┬─────┬─────┐
│1 2 3│3 2 1│4 5 6│
├─────┼─────┼─────┤
│5 3 1│5 6 8│7 1 2│
├─────┼─────┼─────┤
│4 3 9│3 7 6│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (display): Display only: the values agree, but at `]BOXING 7` GNU APL prints them without the frame the book shows.

```apl-oracle
 1 2 3  3 2 1  4 5 6 
 5 3 1  5 6 8  7 1 2 
 4 3 9  3 7 6  4 5 1 
```

## Ex 12 — needs: nested arrays; glyphs outside the set: ⌷

```apl
      1⌷m       ⍝ Row 1
┌─────┬─────┬─────┐
│5 3 1│5 6 8│7 1 2│
└─────┴─────┴─────┘
```

Oracle differs (error): GNU APL ⌷ wants one index per axis, so a scalar left argument against a rank-2 array is a RANK ERROR: no major-cell selection.

```apl-oracle
RANK ERROR
      1⌷m
      ^ ^
```

## Ex 13 — needs: nested arrays; glyphs outside the set: ⌷

```apl
      1 1⌷m     ⍝ Cell 1 1
┌─────┐
│5 6 8│
└─────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────┐
│5 6 8│
└∼────┘
```

## Ex 14 — needs: nested arrays; glyphs outside the set: ⌷

```apl
      (⊂1 2)⌷m  ⍝ Rows 1 and 2
┌─────┬─────┬─────┐
│5 3 1│5 6 8│7 1 2│
├─────┼─────┼─────┤
│4 3 9│3 7 6│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (error): An enclosed left argument to ⌷ is a RANK ERROR in GNU APL.

```apl-oracle
RANK ERROR
      (⊂1 2)⌷m
      ^      ^
```

## Ex 15 — needs: glyphs outside the set: ⌷; bracket indexing

```apl
      2⌷[1]m
┌─────┬─────┬─────┐
│4 5 6│7 1 2│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────┐ ┌→────┐ ┌→────┐
│4 5 6│ │7 1 2│ │4 5 1│
└∼────┘ └∼────┘ └∼────┘
```

## Ex 16 — needs: glyphs outside the set: ⌷

```apl
      2⌷⍉m
┌─────┬─────┬─────┐
│4 5 6│7 1 2│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (error): Same as Ex 12, on the transpose.

```apl-oracle
RANK ERROR
      2⌷⍉m
      ^ ^
```

## Ex 17 — core

```apl
      n ← 3 3⍴4 1 6 5 2 9 7 8 3
```

## Ex 18 — needs: nested arrays; bracket indexing

```apl
      n[⊂1 1] ⍝ Centre
2
```

Oracle differs (error): Same as Ex 7.

```apl-oracle
RANK ERROR
      n[⊂1 1]
      ^^
```

## Ex 19 — needs: nested arrays; bracket indexing

```apl
      n[(0 0)(1 1)(2 2)] ⍝ Three points along the main diagonal
4 2 3
```

Oracle differs (error): Same as Ex 8.

```apl-oracle
RANK ERROR
      n[(0 0) (1 1) (2 2)]
      ^^
```

## Ex 20 — needs: glyphs outside the set: ⌷

```apl
      1 1⌷n ⍝ Centre
2
```

## Ex 21 — needs: nested arrays; glyphs outside the set: ⌷

```apl
      (⊂1 1)⌷n ⍝ Repeat row 1
5 2 9
5 2 9
```

Oracle differs (error): Same as Ex 14.

```apl-oracle
RANK ERROR
      (⊂1 1)⌷n
      ^      ^
```

## Ex 22 — needs: glyphs outside the set: ∘ ⊃ ⌷ ⍤ ⍨

Defines the Sane-indexing operator I; needs ⌷ ⍨ ∘ ⍤ and a tacit derivation, none of them in the core set.

```apl
      I←⌷⍨∘⊃⍨⍤0 99 ⍝ Sane indexing
```

Oracle differs (error): The Sane-indexing operator cannot be defined: GNU APL rejects ⌷⍨∘⊃⍨⍤0 99 with SYNTAX ERROR.

```apl-oracle
SYNTAX ERROR+
      I←⌷⍨∘⊃(⍨⍤0 99)
            ^^
```

## Ex 23 — needs: nested arrays; ⎕ system name

```apl
      ⎕ ← m ← 3 3⍴(1 2 3)(3 2 1)(4 5 6)(5 3 1)(5 6 8)(7 1 2)(4 3 9)(3 7 6)(4 5 1)
┌─────┬─────┬─────┐
│1 2 3│3 2 1│4 5 6│
├─────┼─────┼─────┤
│5 3 1│5 6 8│7 1 2│
├─────┼─────┼─────┤
│4 3 9│3 7 6│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (display): Display only: the values agree, but at `]BOXING 7` GNU APL prints them without the frame the book shows.

```apl-oracle
 1 2 3  3 2 1  4 5 6 
 5 3 1  5 6 8  7 1 2 
 4 3 9  3 7 6  4 5 1 
```

## Ex 24 — needs: nested arrays; glyphs outside the set: ⌷

```apl
      1 2I m   ⍝ Sane:  select leading axis cells 1 and 2, or m[1 2;]
      1 2⌷ m   ⍝ Squad: select m[⊂1 2]
┌─────┬─────┬─────┐
│5 3 1│5 6 8│7 1 2│
├─────┼─────┼─────┤
│4 3 9│3 7 6│4 5 1│
└─────┴─────┴─────┘
┌─────┐
│7 1 2│
└─────┘
```

Oracle differs (error): I was never defined because Ex 22 failed, so the Sane line is a VALUE ERROR; the Squad line happens to agree.

```apl-oracle
VALUE ERROR+
      1 2 I m
            ^
┌→────┐
│7 1 2│
└∼────┘
```

## Ex 25 — needs: nested arrays; glyphs outside the set: ⌷

```apl
      (⊂1 2)I m  ⍝ Sane:  select m[⊂1 2]
      (⊂1 2)⌷ m  ⍝ Squad: select m[1 2;]
┌─────┐
│7 1 2│
└─────┘
┌─────┬─────┬─────┐
│5 3 1│5 6 8│7 1 2│
├─────┼─────┼─────┤
│4 3 9│3 7 6│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (error): Same, and (⊂1 2)⌷m is a RANK ERROR as in Ex 14.

```apl-oracle
VALUE ERROR+
      (⊂1 2)I m
              ^
RANK ERROR
      (⊂1 2)⌷m
      ^      ^
```

## Ex 26 — needs: nested arrays

```apl
      (0 0)(1 2)(2 2)I m ⍝ Multiple cells by index, like m[(0 0)(1 2)(2 2)]
┌─────┬─────┬─────┐
│1 2 3│7 1 2│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (error): Same: I is undefined.

```apl-oracle
VALUE ERROR+
      (0 0) (1 2) (2 2)I m
                         ^
```

## Ex 27 — core

```apl
      data   ← 0 1 2 3 4 5 6 7 8 9
      select ← 0 0 1 0 1 1 0 1 1 0 ⍝ Select elements 2, 4, 5, 7 and 8
      select/data
2 4 5 7 8
```

## Ex 28 — core

```apl
      select ← 1 3 0 0 5 0 7 0 0 1
      select/data
0 1 1 1 4 4 4 4 4 6 6 6 6 6 6 6 9
```

## Ex 29 — needs: ] user command; glyphs outside the set: ?

Uses dyadic ? (Deal), so the matrix is random and the printed values are one run only.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      m ← 3 3⍴9?9
      ]DISPLAY m
┌→────┐
↓3 0 5│
│4 1 8│
│6 7 2│
└~────┘
```

Oracle differs (value): Dyadic ? (Deal) is random, so the oracle drew a different permutation; the values below differ for that reason alone.

```apl-oracle
┌→────┐
↓4 3 8│
│1 5 6│
│7 2 0│
└∼────┘
```

## Ex 30 — core

```apl
      select ← 0 1 0
```

## Ex 31 — needs: glyphs outside the set: ⌿

```apl
      select⌿m ⍝ Replicate first
4 1 8
```

Oracle differs (value): Follows the oracle's own random m from Ex 29.

```apl-oracle
1 5 6
```

## Ex 32 — core

Uses the m bound in Ex 29 by dyadic ? (Deal), so the printed values are one run only.

```apl
      select/m ⍝ Replicate
0
1
7
```

Oracle differs (value): Same.

```apl-oracle
3
5
2
```

## Ex 33 — needs: nested arrays; ⎕ system name

```apl
      ⎕ ← m ← 3 3⍴(1 2 3)(3 2 1)(4 5 6)(5 3 1)(5 6 8)(7 1 2)(4 3 9)(3 7 6)(4 5 1)
┌─────┬─────┬─────┐
│1 2 3│3 2 1│4 5 6│
├─────┼─────┼─────┤
│5 3 1│5 6 8│7 1 2│
├─────┼─────┼─────┤
│4 3 9│3 7 6│4 5 1│
└─────┴─────┴─────┘
```

Oracle differs (display): Display only: the values agree, but at `]BOXING 7` GNU APL prints them without the frame the book shows.

```apl-oracle
 1 2 3  3 2 1  4 5 6 
 5 3 1  5 6 8  7 1 2 
 4 3 9  3 7 6  4 5 1 
```

## Ex 34 — needs: nested arrays; glyphs outside the set: ⊃

```apl
      (⊂1 1)⊃m
5 6 8
```

## Ex 35 — needs: nested arrays; glyphs outside the set: ⊃

```apl
      ⊃m
1 2 3
```

Oracle differs (value): GNU APL ⊃ is Disclose, not First: it mixes the whole nested matrix into a rank-3 array instead of picking the first element.

```apl-oracle
1 2 3
3 2 1
4 5 6

5 3 1
5 6 8
7 1 2

4 3 9
3 7 6
4 5 1
```

## Ex 36 — needs: nested arrays; characters; ⎕ system name; bracket indexing

```apl
      ⎕ ← G ← 2 3⍴('Adam' 1)('Bob' 2)('Carl' 3)('Danni' 4)('Eve' 5)('Frank' 6)
      G[⊂(0 1)0] ⍝ First element of the vector nested at ⊂0 1 of G
      G[((0 0)0)((1 2)1)]
┌─────────┬───────┬─────────┐
│┌────┬─┐ │┌───┬─┐│┌────┬─┐ │
││Adam│1│ ││Bob│2│││Carl│3│ │
│└────┴─┘ │└───┴─┘│└────┴─┘ │
├─────────┼───────┼─────────┤
│┌─────┬─┐│┌───┬─┐│┌─────┬─┐│
││Danni│4│││Eve│5│││Frank│6││
│└─────┴─┘│└───┴─┘│└─────┴─┘│
└─────────┴───────┴─────────┘
┌───┐
│Bob│
└───┘
┌────┬─┐
│Adam│6│
└────┴─┘
```

Oracle differs (error): Reach indexing is not available: both G[⊂(0 1)0] and G[((0 0)0)((1 2)1)] are RANK ERRORs.

```apl-oracle
  Adam 1     Bob 2    Carl 3   
  Danni 4    Eve 5    Frank 6  
RANK ERROR
      G[⊂(0 1) 0]
      ^^
RANK ERROR
      G[((0 0) 0) ((1 2) 1)]
      ^^
```

## Ex 37 — needs: ] user command

Uses dyadic ? (Deal), one run only; also assigns through a dyadic Transpose expression.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

Oracle translation: ]DISPLAY dropped, value shown under ]BOXING 8.

```apl
      ]DISPLAY m ← 3 3⍴9?9
      (0 0⍉m) ← ¯1 ¯1 ¯1 ⍝ 0 0⍉m is the main diagonal.
      ]DISPLAY m
┌→────┐
↓1 2 3│
│4 8 0│
│6 5 7│
└~────┘
┌→───────┐
↓¯1  2  3│
│ 4 ¯1  0│
│ 6  5 ¯1│
└~───────┘
```

Oracle differs (value): Dyadic ? (Deal) is random, so the oracle drew a different permutation; the values below differ for that reason alone.

```apl-oracle
┌→────┐
↓8 1 4│
│7 3 6│
│0 2 5│
└∼────┘
┌→───────┐
↓¯1  1  4│
│ 7 ¯1  6│
│ 0  2 ¯1│
└∼───────┘
```

## Ex 38 — needs: selective assignment

Selective assignment through a Compress expression.

```apl
      data   ← 0 1 2 3 4 5 6 7 8 9
      select ← 0 0 1 0 1 1 0 1 1 0
      
      (select/data) ← ¯1 ¯1 ¯1 ¯1 ¯1
      data
0 1 ¯1 3 ¯1 ¯1 6 ¯1 ¯1 9
```

## Ex 39 — needs: characters; ⎕ system name

Selective assignment through Take, on a character vector.

```apl
      ⎕ ← s ← 'This is a string'
      (2↑s) ← '**'
      s
This is a string
**is is a string
```

## Ex 40 — needs: nested arrays; characters; glyphs outside the set: = ¨

Compress-each ¨ over a nested character vector, assigned selectively.

```apl
      s←'This' 'is' (,'a') 'string' 'without' 'is.'
      ((s='i')/¨s)←'*'
      s
┌────┬──┬─┬──────┬───────┬───┐
│Th*s│*s│a│str*ng│w*thout│*s.│
└────┴──┴─┴──────┴───────┴───┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→───┐ ┌→─┐ ┌→┐ ┌→─────┐ ┌→──────┐ ┌→──┐
│Th*s│ │*s│ │a│ │str*ng│ │w*thout│ │*s.│
└────┘ └──┘ └─┘ └──────┘ └───────┘ └───┘
```

## Counts

Examples: 40. Core — simple numeric arrays and the listed primitives only: 5 (Ex 17, Ex 27, Ex 28, Ex 30, Ex 32).

Beyond the core set: 35, needing characters, nested arrays, `⎕` system names, Dyalog `]` user commands, dfns, or primitives and operators outside the list.

GNU APL 2.0 printed something different in 28 of the 40 examples: 9 display-only, 6 different values, 13 where GNU APL errors out.
