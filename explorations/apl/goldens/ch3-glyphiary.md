# Goldens: "Glyphiary"

Source: https://xpqz.github.io/learnapl/manip.html, fetched 2026-09-11.

Every example the chapter runs, in the order it appears. Input lines are indented six spaces in the APL convention; the book's printed output follows unindented and verbatim.

The examples form one session read top to bottom: variables and settings from an earlier example hold for the later ones.

The chapter sets `⎕IO ← 0`, so every index and every `⍳` result counts from zero. That is the book's choice, stated in its first example below, not APL's default.

Each example is labelled `core` when it uses only simple numeric arrays and the primitives `+ - × ÷ ⌈ ⌊ * ⍳ ⍴ , ⌽ ⍉ / ⊂ ≡ ≢ ⍋ ⍒ ↑ ↓ ⍷ ∊ ~ ∪ ∩`, or `needs:` followed by what it asks for beyond that.

Where GNU APL 2.0 printed something different, a second fenced block marked `apl-oracle` follows the book's, preceded by a one-line note on the difference. This chapter ran under `]BOXING 8`; the invocation, and the translation of Dyalog's `]box`, `]DISPLAY` and `]rows` user commands, which GNU APL does not have, are in `ORACLE.md`.

## Ex 1 — needs: ⎕ system name; ] user command

Index origin zero, boxed display at maximum verbosity and unwrapped output rows, for the whole chapter.

Book: "But first, the usual dance."

Oracle translation: ]box translated to ]BOXING 8.

Oracle translation: ]rows has no GNU APL equivalent; ⎕PW←10000 stands in.

```apl
      ⎕IO ← 0            ⍝ Index origin is zero
      ]box on -style=max ⍝ Show boxes at max verbosity
      ]rows on           ⍝ Don't wrap long output lines
┌→────────────────┐
│Was ON -style=max│
└─────────────────┘
┌→──────┐
│Was OFF│
└───────┘
```

Oracle differs (value): GNU APL has no ]box or ]rows; the run sets ]BOXING 8 and ⎕PW←10000 instead, and neither prints a confirmation message.

```apl-oracle
(no output)
```

## Ex 2 — needs: ⎕ system name; glyphs outside the set: ?

Uses dyadic ? (Deal), so mat is random: every later example that shows mat is one run only.

```apl
      ⎕ ← mat ← 3 4⍴12?12 ⍝ Ladies and gentlemen: our matrix
┌→────────┐
↓3  0  5 1│
│7  9  8 6│
│2 10 11 4│
└~────────┘
```

Oracle differs (value): Dyadic ? (Deal) is random, so the oracle drew a different permutation; the values below differ for that reason alone.

```apl-oracle
4  6 2  5
7 11 0 10
3  9 1  8
```

## Ex 3 — needs: characters

Under -style=max a simple scalar prints as a blank line of the value's width followed by the value.

```apl
      ≢7 5 1 2 9
      ≢'Hello world'
      ≢mat
 
5

  
11

 
3
```

## Ex 4 — needs: nested arrays

```apl
      ≡1 2 3 4
      ≡(1 2)(3 4)
      ≡((1 2)(2 3))((4 5)(6 7))
      ≡(1 2)(3 4)3
 
1

 
2

 
3

  
¯2
```

Oracle differs (value): The depth of a non-uniformly nested vector is 2 in GNU APL; Dyalog reports ¯2 to mark the non-uniformity.

```apl-oracle
1
2
3
2
```

## Ex 5 — core

```apl
      1 2 3 4 ≡ 1 2 3 4 5
      1 2 3 4 ≡ 1 2 3 4
      1 2 3 4 ≡ 4 1 2 3
      1 2 3 4 ≡ 1 4⍴1 2 3 4
 
0

 
1

 
0

 
0
```

## Ex 6 — needs: glyphs outside the set: ⊖

```apl
      ⍉mat ⍝ Transpose
      ⌽mat ⍝ Reverse
      ⊖mat ⍝ Reverse first
┌→─────┐
↓3 7  2│
│0 9 10│
│5 8 11│
│1 6  4│
└~─────┘
┌→────────┐
↓1  5  0 3│
│6  8  9 7│
│4 11 10 2│
└~────────┘
┌→────────┐
↓2 10 11 4│
│7  9  8 6│
│3  0  5 1│
└~────────┘
```

Oracle differs (value): Follows the oracle's own random mat; ⍉ ⌽ ⊖ themselves agree.

```apl-oracle
┌→─────┐
↓4  7 3│
│6 11 9│
│2  0 1│
│5 10 8│
└∼─────┘
┌→────────┐
↓ 5 2  6 4│
│10 0 11 7│
│ 8 1  9 3│
└∼────────┘
┌→────────┐
↓3  9 1  8│
│7 11 0 10│
│4  6 2  5│
└∼────────┘
```

## Ex 7 — needs: glyphs outside the set: ⊖ ⊢ ⍤; bracket indexing

```apl
      ⊖⍤1⊢mat ⍝ Apply reverse-first to second axis using Rank
      ⊖[1]mat ⍝ Apply reverse-first to second axis bracket-axis
┌→────────┐
↓1  5  0 3│
│6  8  9 7│
│4 11 10 2│
└~────────┘
┌→────────┐
↓1  5  0 3│
│6  8  9 7│
│4 11 10 2│
└~────────┘
```

Oracle differs (value): The Rank operator ⍤ and the bracket axis both work; only the random mat differs.

```apl-oracle
┌→────────┐
↓ 5 2  6 4│
│10 0 11 7│
│ 8 1  9 3│
└∼────────┘
┌→────────┐
↓ 5 2  6 4│
│10 0 11 7│
│ 8 1  9 3│
└∼────────┘
```

## Ex 8 — needs: glyphs outside the set: ⊖

```apl
      1 2 ¯1 0⊖mat
┌→────────┐
↓7 10 11 1│
│2  0  5 6│
│3  9  8 4│
└~────────┘
```

Oracle differs (value): Follows the oracle's own random mat.

```apl-oracle
┌→────────┐
↓7  9 1  5│
│3  6 2 10│
│4 11 0  8│
└∼────────┘
```

## Ex 9 — needs: nested arrays; characters; ⎕ system name

```apl
      ⎕ ← v ← 'Hello' 'world'
      ↑v
┌→────────────────┐
│ ┌→────┐ ┌→────┐ │
│ │Hello│ │world│ │
│ └─────┘ └─────┘ │
└∊────────────────┘
┌→────┐
↓Hello│
│world│
└─────┘
```

Oracle differs (value): Monadic ↑ is First in GNU APL, so ↑v returns the first string rather than a 2-row character matrix.

```apl-oracle
 Hello world 
┌→────┐
│Hello│
└─────┘
```

## Ex 10 — needs: nested arrays; ⎕ system name; glyphs outside the set: ?

Uses dyadic ? (Deal): random matrix, one run only.

```apl
      ⎕ ← m ← 3 3⍴9?9
      ↓m
┌→────┐
↓8 0 3│
│6 5 2│
│7 1 4│
└~────┘
┌→────────────────────────┐
│ ┌→────┐ ┌→────┐ ┌→────┐ │
│ │8 0 3│ │6 5 2│ │7 1 4│ │
│ └~────┘ └~────┘ └~────┘ │
└∊────────────────────────┘
```

Oracle differs (error): Monadic ↓ does not exist in GNU APL — Drop is dyadic only — so Split is a VALENCE ERROR.

```apl-oracle
5 8 0
1 6 7
4 2 3
VALENCE ERROR+
      ↓m
      ^^
```

## Ex 11 — needs: nested arrays; ⎕ system name

```apl
      ⎕ ← v ← (0 6 3)(2 5 1)(4 7 8)
      ↓⍉↑v
┌→────────────────────────┐
│ ┌→────┐ ┌→────┐ ┌→────┐ │
│ │0 6 3│ │2 5 1│ │4 7 8│ │
│ └~────┘ └~────┘ └~────┘ │
└∊────────────────────────┘
┌→────────────────────────┐
│ ┌→────┐ ┌→────┐ ┌→────┐ │
│ │0 2 4│ │6 5 7│ │3 1 8│ │
│ └~────┘ └~────┘ └~────┘ │
└∊────────────────────────┘
```

Oracle differs (error): Same: the Remix idiom ↓⍉↑ needs monadic ↓ as Split and monadic ↑ as Mix.

```apl-oracle
 0 6 3  2 5 1  4 7 8 
VALENCE ERROR+
      ↓⍉↑v
      ^^
```

## Ex 12 — needs: nested arrays

```apl
      ↓⍉↑(1 2 3 4)(5 6)(7 8 9 10)
┌→─────────────────────────────────┐
│ ┌→────┐ ┌→────┐ ┌→────┐ ┌→─────┐ │
│ │1 5 7│ │2 6 8│ │3 0 9│ │4 0 10│ │
│ └~────┘ └~────┘ └~────┘ └~─────┘ │
└∊─────────────────────────────────┘
```

Oracle differs (error): Same as Ex 11.

```apl-oracle
VALENCE ERROR+
      ↓⍉↑(1 2 3 4) (5 6) (7 8 9 10)
      ^^
```

## Ex 13 — needs: nested arrays

Mix pads the ragged cells with the numeric prototype 0.

```apl
      ↑(1 2 3 4)(5 6)(7 8 9 10)
┌→───────┐
↓1 2 3  4│
│5 6 0  0│
│7 8 9 10│
└~───────┘
```

Oracle differs (value): Monadic ↑ is First, so no prototype padding happens; GNU APL's Mix is ⊃.

```apl-oracle
┌→──────┐
│1 2 3 4│
└∼──────┘
```

## Ex 14 — needs: nested arrays

```apl
      1↑(1 2 3 4)(5 6)(7 8 9 10) ⍝ Take 1
      2↑(1 2 3 4)(5 6)(7 8 9 10) ⍝ Take 2
┌→──────────┐
│ ┌→──────┐ │
│ │1 2 3 4│ │
│ └~──────┘ │
└∊──────────┘
┌→────────────────┐
│ ┌→──────┐ ┌→──┐ │
│ │1 2 3 4│ │5 6│ │
│ └~──────┘ └~──┘ │
└∊────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────────┐
│┌→──────┐│
││1 2 3 4││
│└∼──────┘│
└ϵ────────┘
┌→──────────────┐
│┌→──────┐ ┌→──┐│
││1 2 3 4│ │5 6││
│└∼──────┘ └∼──┘│
└ϵ──────────────┘
```

## Ex 15 — needs: nested arrays; glyphs outside the set: ⊃ ⌷

```apl
      0⌷(1 2 3 4)(5 6)(7 8 9 10) ⍝ Squad 0 returns a cell
      0⊃(1 2 3 4)(5 6)(7 8 9 10) ⍝ Pick 0 returns an element
┌───────────┐
│ ┌→──────┐ │
│ │1 2 3 4│ │
│ └~──────┘ │
└∊──────────┘
┌→──────┐
│1 2 3 4│
└~──────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌─────────┐
│┌→──────┐│
││1 2 3 4││
│└∼──────┘│
└ϵ────────┘
┌→──────┐
│1 2 3 4│
└∼──────┘
```

## Ex 16 — needs: nested arrays

```apl
      ¯1↑(1 2 3 4)(5 6)(7 8 9 10) ⍝ Take 1 from the back
┌→───────────┐
│ ┌→───────┐ │
│ │7 8 9 10│ │
│ └~───────┘ │
└∊───────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→─────────┐
│┌→───────┐│
││7 8 9 10││
│└∼───────┘│
└ϵ─────────┘
```

## Ex 17 — needs: nested arrays

```apl
      1↓(1 2 3 4)(5 6)(7 8 9 10)  ⍝ Drop 1 from the front
      ¯1↓(1 2 3 4)(5 6)(7 8 9 10) ⍝ Drop 1 from the back
┌→─────────────────┐
│ ┌→──┐ ┌→───────┐ │
│ │5 6│ │7 8 9 10│ │
│ └~──┘ └~───────┘ │
└∊─────────────────┘
┌→────────────────┐
│ ┌→──────┐ ┌→──┐ │
│ │1 2 3 4│ │5 6│ │
│ └~──────┘ └~──┘ │
└∊────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→───────────────┐
│┌→──┐ ┌→───────┐│
││5 6│ │7 8 9 10││
│└∼──┘ └∼───────┘│
└ϵ───────────────┘
┌→──────────────┐
│┌→──────┐ ┌→──┐│
││1 2 3 4│ │5 6││
│└∼──────┘ └∼──┘│
└ϵ──────────────┘
```

## Ex 18 — core

Uses mat, bound in Ex 2 by dyadic ? (Deal), so the printed values are one run only.

```apl
      mat
      1↑mat ⍝ Take first cell
      1↓mat ⍝ Drop first cell
┌→────────┐
↓3  0  5 1│
│7  9  8 6│
│2 10 11 4│
└~────────┘
┌→──────┐
↓3 0 5 1│
└~──────┘
┌→────────┐
↓7  9  8 6│
│2 10 11 4│
└~────────┘
```

Oracle differs (error): GNU APL dyadic ↑ and ↓ want one count per axis of the right argument, so a scalar against a rank-2 array is a LENGTH ERROR.

```apl-oracle
┌→────────┐
↓4  6 2  5│
│7 11 0 10│
│3  9 1  8│
└∼────────┘
LENGTH ERROR
      1↑mat
      ^ ^
LENGTH ERROR
      1↓mat
      ^ ^
```

## Ex 19 — core

Depends on ⎕IO: with origin zero the interval is 0 to 9.

```apl
      ⍳10
┌→──────────────────┐
│0 1 2 3 4 5 6 7 8 9│
└~──────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────────────────┐
│0 1 2 3 4 5 6 7 8 9│
└∼──────────────────┘
```

## Ex 20 — needs: nested arrays

```apl
      ⍳3 4
┌→────────────────────────┐
↓ ┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐ │
│ │0 0│ │0 1│ │0 2│ │0 3│ │
│ └~──┘ └~──┘ └~──┘ └~──┘ │
│ ┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐ │
│ │1 0│ │1 1│ │1 2│ │1 3│ │
│ └~──┘ └~──┘ └~──┘ └~──┘ │
│ ┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐ │
│ │2 0│ │2 1│ │2 2│ │2 3│ │
│ └~──┘ └~──┘ └~──┘ └~──┘ │
└∊────────────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────────────────────┐
↓┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐│
││0 0│ │0 1│ │0 2│ │0 3││
│└∼──┘ └∼──┘ └∼──┘ └∼──┘│
│┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐│
││1 0│ │1 1│ │1 2│ │1 3││
│└∼──┘ └∼──┘ └∼──┘ └∼──┘│
│┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐│
││2 0│ │2 1│ │2 2│ │2 3││
│└∼──┘ └∼──┘ └∼──┘ └∼──┘│
└ϵ──────────────────────┘
```

## Ex 21 — needs: characters

```apl
      'Hello world'⍳'o'
 
4
```

## Ex 22 — needs: characters

```apl
      'Hello world'⍳'od'
┌→───┐
│4 10│
└~───┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→───┐
│4 10│
└∼───┘
```

## Ex 23 — needs: nested arrays; characters; ⎕ system name; bracket indexing

Book: "if the right element isn't found, the returned index is ⎕IO+≢⍺" — origin-dependent.

```apl
      ⎕ ← staff ← 'Adam' 'Bob' 'Charlotte'
      lookup ← staff,⊂'Not found'
      lookup[staff⍳'Bob' 'David']
┌→─────────────────────────┐
│ ┌→───┐ ┌→──┐ ┌→────────┐ │
│ │Adam│ │Bob│ │Charlotte│ │
│ └────┘ └───┘ └─────────┘ │
└∊─────────────────────────┘
┌→──────────────────┐
│ ┌→──┐ ┌→────────┐ │
│ │Bob│ │Not found│ │
│ └───┘ └─────────┘ │
└∊──────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
 Adam Bob Charlotte 
┌→────────────────┐
│┌→──┐ ┌→────────┐│
││Bob│ │Not found││
│└───┘ └─────────┘│
└ϵ────────────────┘
```

## Ex 24 — needs: glyphs outside the set: ⍸

```apl
      ⍸1 0 0 1 0 1 0 1 1 1 0 1 0 1
┌→────────────────┐
│0 3 5 7 8 9 11 13│
└~────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────────────────┐
│0 3 5 7 8 9 11 13│
└∼────────────────┘
```

## Ex 25 — needs: ⎕ system name; glyphs outside the set: = | ⍸; bracket indexing

```apl
      ⎕←nums←⍳20
      nums[⍸0=5|nums] ⍝ Find all numbers divisible by 5
┌→────────────────────────────────────────────────┐
│0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19│
└~────────────────────────────────────────────────┘
┌→────────┐
│0 5 10 15│
└~────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
┌→────────┐
│0 5 10 15│
└∼────────┘
```

## Ex 26 — needs: nested arrays; glyphs outside the set: ⍸

```apl
      3 3⍴1 0 0 1 1 0 0 1 0
      ⍸3 3⍴1 0 0 1 1 0 0 1 0
┌→────┐
↓1 0 0│
│1 1 0│
│0 1 0│
└~────┘
┌→────────────────────────┐
│ ┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐ │
│ │0 0│ │1 0│ │1 1│ │2 1│ │
│ └~──┘ └~──┘ └~──┘ └~──┘ │
└∊────────────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────┐
↓1 0 0│
│1 1 0│
│0 1 0│
└∼────┘
┌→──────────────────────┐
│┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐│
││0 0│ │1 0│ │1 1│ │2 1││
│└∼──┘ └∼──┘ └∼──┘ └∼──┘│
└ϵ──────────────────────┘
```

## Ex 27 — needs: glyphs outside the set: ⍸

```apl
      ⍸0 1 0 2 0 3 0 4 0 5
┌→────────────────────────────┐
│1 3 3 5 5 5 7 7 7 7 9 9 9 9 9│
└~────────────────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────────────────────────────┐
│1 3 3 5 5 5 7 7 7 7 9 9 9 9 9│
└∼────────────────────────────┘
```

## Ex 28 — needs: glyphs outside the set: ⍸

```apl
      1 3 5 7 9⍸8 9 0  ⍝ bin 8, 9 and 0 over the intervals 1 3 5 7 9
┌→─────┐
│3 4 ¯1│
└~─────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→─────┐
│3 4 ¯1│
└∼─────┘
```

## Ex 29 — needs: glyphs outside the set: ⍸

```apl
      1 3 5 7 9⍸5      ⍝ elements on on boundary goes in the higher bin
 
2
```

## Ex 30 — needs: glyphs outside the set: ⍸

Book: elements below the first bin get a bin number one less than the index origin, here ¯1.

```apl
      3 5 7 9⍸0 100
┌→───┐
│¯1 3│
└~───┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→───┐
│¯1 3│
└∼───┘
```

## Ex 31 — needs: characters; glyphs outside the set: ⍸

```apl
      'AEIOU'⍸'HELLO WORLD'
┌→─────────────────────┐
│1 1 2 2 3 ¯1 4 3 3 2 0│
└~─────────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→─────────────────────┐
│1 1 2 2 3 ¯1 4 3 3 2 0│
└∼─────────────────────┘
```

## Ex 32 — needs: characters

```apl
      ciders←'Kopparberg Sparkling Rose' 'Bulmers Original' 'Crispin the Jacket' 'Old Mout Cherries & Berries'
      abv←7.0 4.5 8.3 0.0
```

## Ex 33 — core

```apl
      code←431 481 487 486
      rate←0 40.38 50.71 61.04
      limits←1.2 6.9 7.5 8.5
```

## Ex 34 — needs: ⎕ system name; glyphs outside the set: ⍸

```apl
      ⎕←bin←1+limits⍸abv
┌→──────┐
│2 1 3 0│
└~──────┘
```

Oracle differs (display): Display only: the values agree, but at `]BOXING 8` GNU APL prints them without the frame the book shows.

```apl-oracle
2 1 3 0
```

## Ex 35 — needs: nested arrays; characters; glyphs outside the set: ⍕ ⍪; bracket indexing

Formats with ⍕ and Catenate-first ⍪; depends on rate, code and bin from the two preceding examples.

```apl
      ⍕('Name' 'Rate' 'Code')⍪⍉↑(ciders (rate[bin]) (code[bin]))
┌→─────────────────────────────────────────┐
↓ Name                          Rate  Code │
│ Kopparberg Sparkling Rose    50.71   487 │
│ Bulmers Original             40.38   481 │
│ Crispin the Jacket           61.04   486 │
│ Old Mout Cherries & Berries   0      431 │
└──────────────────────────────────────────┘
```

Oracle differs (value): GNU APL ⍕ flattens this mixed nested matrix onto one line instead of aligning it in columns.

```apl-oracle
┌→─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Name Rate Code Kopparberg Sparkling Rose Bulmers Original Crispin the Jacket Old Mout Cherries & Berries │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Ex 36 — core

```apl
      simple ← 3 4⍴3 0 5 1 7 9 8 6 2 10 11 4
      ,simple ⍝ Ravel
      ∊simple ⍝ Enlist
┌→────────────────────────┐
│3 0 5 1 7 9 8 6 2 10 11 4│
└~────────────────────────┘
┌→────────────────────────┐
│3 0 5 1 7 9 8 6 2 10 11 4│
└~────────────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────────────────────────┐
│3 0 5 1 7 9 8 6 2 10 11 4│
└∼────────────────────────┘
┌→────────────────────────┐
│3 0 5 1 7 9 8 6 2 10 11 4│
└∼────────────────────────┘
```

## Ex 37 — needs: nested arrays; ⎕ system name

```apl
      ⎕ ← nested ← ↑((2 3)(4 5))((6 7)(8 9))
      ,nested ⍝ Ravel
      ∊nested ⍝ Enlist
┌→────────────┐
↓ ┌→──┐ ┌→──┐ │
│ │2 3│ │4 5│ │
│ └~──┘ └~──┘ │
│ ┌→──┐ ┌→──┐ │
│ │6 7│ │8 9│ │
│ └~──┘ └~──┘ │
└∊────────────┘
┌→────────────────────────┐
│ ┌→──┐ ┌→──┐ ┌→──┐ ┌→──┐ │
│ │2 3│ │4 5│ │6 7│ │8 9│ │
│ └~──┘ └~──┘ └~──┘ └~──┘ │
└∊────────────────────────┘
┌→──────────────┐
│2 3 4 5 6 7 8 9│
└~──────────────┘
```

Oracle differs (value): Monadic ↑ is First, so nested is the first element rather than a 2×2 nested matrix, and the two results below follow from that.

```apl-oracle
 2 3  4 5 
┌→──────────┐
│┌→──┐ ┌→──┐│
││2 3│ │4 5││
│└∼──┘ └∼──┘│
└ϵ──────────┘
┌→──────┐
│2 3 4 5│
└∼──────┘
```

## Ex 38 — needs: nested arrays; characters

```apl
      1 2 3 4 , 5 6 'hello'
      1 2 3 4 5 6 , 'hello'
┌→────────────────────┐
│             ┌→────┐ │
│ 1 2 3 4 5 6 │hello│ │
│             └─────┘ │
└∊────────────────────┘
┌→────────────────┐
│1 2 3 4 5 6 hello│
└+────────────────┘
```

Oracle differs (value): Same data; GNU APL places the enclosed 'hello' differently inside the frame.

```apl-oracle
┌→──────────────────┐
│1 2 3 4 5 6 ┌→────┐│
│            │hello││
│            └─────┘│
└ϵ──────────────────┘
┌→────────────────┐
│1 2 3 4 5 6 hello│
└+────────────────┘
```

## Ex 39 — needs: glyphs outside the set: ⍪

```apl
      (3 3⍴⍳9),(3 3⍴⍳9) ⍝ Catenate-last (new cols)
      (3 3⍴⍳9)⍪(3 3⍴⍳9) ⍝ Catenate-first/laminate (new rows)
┌→──────────┐
↓0 1 2 0 1 2│
│3 4 5 3 4 5│
│6 7 8 6 7 8│
└~──────────┘
┌→────┐
↓0 1 2│
│3 4 5│
│6 7 8│
│0 1 2│
│3 4 5│
│6 7 8│
└~────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────────┐
↓0 1 2 0 1 2│
│3 4 5 3 4 5│
│6 7 8 6 7 8│
└∼──────────┘
┌→────┐
↓0 1 2│
│3 4 5│
│6 7 8│
│0 1 2│
│3 4 5│
│6 7 8│
└∼────┘
```

## Ex 40 — needs: characters

```apl
      'l'∊'Hello world'
 
1
```

## Ex 41 — needs: characters

```apl
      'lo w'∊'Hello world'
┌→──────┐
│1 1 1 1│
└~──────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────┐
│1 1 1 1│
└∼──────┘
```

## Ex 42 — needs: characters; glyphs outside the set: ⍸

```apl
      'lo'(⍸⍷)'Hello world' ⍝ Index of start of substring
┌→┐
│3│
└~┘
```

Oracle differs (error): Function trains are not available in GNU APL: (⍸⍷) is a SYNTAX ERROR.

```apl-oracle
SYNTAX ERROR+
      'lo'(⍸⍷)'Hello world'
            ^^
```

## Ex 43 — needs: ⎕ system name; glyphs outside the set: ⍨

```apl
      ⎕ ← v ← 6 9 5 2 0 9
      v↑⍨1     ⍝ Take 1 but commute arguments ⍨
┌→──────────┐
│6 9 5 2 0 9│
└~──────────┘
┌→┐
│6│
└~┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
6 9 5 2 0 9
┌→┐
│6│
└∼┘
```

## Ex 44 — needs: nested arrays; dfn; glyphs outside the set: ≠ ⍨ ⍵

Two dfns shown as values, not applied; the session echoes the definition back.

```apl
      {⍵⊂⍨1,2≠/⍵}
      {(1,2≠/⍵)⊂⍵}
{⍵⊂⍨1,2≠/⍵}
{(1,2≠/⍵)⊂⍵}
```

Oracle differs (error): GNU APL cannot echo an unnamed dfn: evaluating {…} as a value gives VALENCE ERROR.

```apl-oracle
VALENCE ERROR+
      λ1
      ^
VALENCE ERROR+
      λ1
      ^
```

## Ex 45 — needs: glyphs outside the set: = ⍨

```apl
      =⍨1 2 3 4 5
┌→────────┐
│1 1 1 1 1│
└~────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────────┐
│1 1 1 1 1│
└∼────────┘
```

## Ex 46 — needs: glyphs outside the set: =

```apl
      1 2 3 4 5 = 1 2 3 4 5
┌→────────┐
│1 1 1 1 1│
└~────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────────┐
│1 1 1 1 1│
└∼────────┘
```

## Ex 47 — needs: glyphs outside the set: = ⍨

Defines a function tacitly from Selfie; it is applied in Ex 48.

```apl
      tally ← +/=⍨
```

Oracle differs (error): Tacit assignment of a derived function, +/=⍨, is a SYNTAX ERROR in GNU APL.

```apl-oracle
SYNTAX ERROR
      tally←+/=⍨
      ^       ^
```

## Ex 48 — needs: the tacit function tally defined in Ex 47

Applies the tacit tally of Ex 47.

```apl
      tally 1 2 3 4 5
 
5
```

Oracle differs (error): tally was never defined because Ex 47 failed: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      tally 1 2 3 4 5
            ^
```

## Ex 49 — needs: nested arrays; glyphs outside the set: ¨ ⍨

```apl
      1⍨ 2
      3 (1⍨) 2
      1⍨ 2 3 4 5
      1⍨¨ 2 3 4 5
 
1

 
1

 
1

┌→──────┐
│1 1 1 1│
└~──────┘
```

Oracle differs (error): Constant ⍨ with an array operand is not available: 1⍨2 is a SYNTAX ERROR and 3(1⍨)2 a VALENCE ERROR.

```apl-oracle
SYNTAX ERROR
      1⍨2
      ^^
VALENCE ERROR+
      3(1⍨)2
      ^   ^
SYNTAX ERROR
      1⍨2 3 4 5
      ^^
VALENCE ERROR+
      1⍨¨2 3 4 5
      ^ ^
```

## Ex 50 — needs: nested arrays; ⎕ system name; glyphs outside the set: ? ¨ ⍨

Uses dyadic ? (Deal): random matrix, one run only.

```apl
      ⎕ ← m ← 3 3⍴9?9 
      5⍨¨m ⍝ Make an array that looks like m, but will all elements 5
┌→────┐
↓0 6 3│
│2 5 1│
│4 7 8│
└~────┘
┌→────┐
↓5 5 5│
│5 5 5│
│5 5 5│
└~────┘
```

Oracle differs (error): Same, and the Deal is random.

```apl-oracle
2 8 1
3 5 6
4 7 0
VALENCE ERROR+
      5⍨¨m
      ^  ^
```

## Ex 51 — needs: glyphs outside the set: ⍨

```apl
      5⍴⍨⍴m
┌→────┐
↓5 5 5│
│5 5 5│
│5 5 5│
└~────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────┐
↓5 5 5│
│5 5 5│
│5 5 5│
└∼────┘
```

## Ex 52 — needs: nested arrays; characters

```apl
      ∪1 1 2 2 3 3 4 4 5 5 6 6
      ∪'hello world'
┌→──────────┐
│1 2 3 4 5 6│
└~──────────┘
┌→───────┐
│helo wrd│
└────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──────────┐
│1 2 3 4 5 6│
└∼──────────┘
┌→───────┐
│helo wrd│
└────────┘
```

## Ex 53 — core

```apl
      1 1 2 3 4 ∪ 1 2 5 6
┌→────────────┐
│1 1 2 3 4 5 6│
└~────────────┘
```

Oracle differs (value): Dyalog Union keeps its left argument's duplicates; GNU APL deduplicates, giving 1 2 3 4 5 6.

```apl-oracle
┌→──────────┐
│1 2 3 4 5 6│
└∼──────────┘
```

## Ex 54 — core

```apl
      1 1 2 3 4 ∩ 1 2 5 6
┌→────┐
│1 1 2│
└~────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────┐
│1 1 2│
└∼────┘
```

## Ex 55 — core

```apl
      1 1 2 3 4 5 ~ 1 3 5
┌→──┐
│2 4│
└~──┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→──┐
│2 4│
└∼──┘
```

## Ex 56 — core

```apl
      ~1 0 1 1 0 0 1
┌→────────────┐
│0 1 0 0 1 1 0│
└~────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→────────────┐
│0 1 0 0 1 1 0│
└∼────────────┘
```

## Ex 57 — needs: ⎕ system name; bracket indexing

```apl
      ⎕ ← data ← 110 109 204 40 105 201 2 208 160 143 213 31 21 317 132 242 164 176 67 18 75 89 18 7 20
      data[⍋data]
┌→─────────────────────────────────────────────────────────────────────────────────────┐
│110 109 204 40 105 201 2 208 160 143 213 31 21 317 132 242 164 176 67 18 75 89 18 7 20│
└~─────────────────────────────────────────────────────────────────────────────────────┘
┌→─────────────────────────────────────────────────────────────────────────────────────┐
│2 7 18 18 20 21 31 40 67 75 89 105 109 110 132 143 160 164 176 201 204 208 213 242 317│
└~─────────────────────────────────────────────────────────────────────────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
110 109 204 40 105 201 2 208 160 143 213 31 21 317 132 242 164 176 67 18 75 89 18 7 20
┌→─────────────────────────────────────────────────────────────────────────────────────┐
│2 7 18 18 20 21 31 40 67 75 89 105 109 110 132 143 160 164 176 201 204 208 213 242 317│
└∼─────────────────────────────────────────────────────────────────────────────────────┘
```

## Ex 58 — core

```apl
      ⍋data
┌→───────────────────────────────────────────────────────────────┐
│6 23 19 22 24 12 11 3 18 20 21 4 1 0 14 9 8 16 17 5 2 7 10 15 13│
└~───────────────────────────────────────────────────────────────┘
```

Oracle differs (display): Display only: the values agree; GNU APL draws the type marker in the frame as `∼` where Dyalog uses `~`, and enclosure as `ϵ` where Dyalog uses `∊`.

```apl-oracle
┌→───────────────────────────────────────────────────────────────┐
│6 23 19 22 24 12 11 3 18 20 21 4 1 0 14 9 8 16 17 5 2 7 10 15 13│
└∼───────────────────────────────────────────────────────────────┘
```

## Ex 59 — needs: nested arrays; ⎕ system name; glyphs outside the set: ⊃; bracket indexing

```apl
      ⎕ ← minidx ← ⊃⍋data ⍝ Index of smallest value: first element of Grade-up
      data[minidx]
 
6

 
2
```

Oracle differs (value): GNU APL ⊃ is Disclose, not First, so ⊃⍋data is the whole grade vector and data[minidx] the whole sorted vector.

```apl-oracle
6 23 19 22 24 12 11 3 18 20 21 4 1 0 14 9 8 16 17 5 2 7 10 15 13
┌→─────────────────────────────────────────────────────────────────────────────────────┐
│2 7 18 18 20 21 31 40 67 75 89 105 109 110 132 143 160 164 176 201 204 208 213 242 317│
└∼─────────────────────────────────────────────────────────────────────────────────────┘
```

## Counts

Examples: 59. Core — simple numeric arrays and the listed primitives only: 10 (Ex 5, Ex 18, Ex 19, Ex 33, Ex 36, Ex 53, Ex 54, Ex 55, Ex 56, Ex 58).

Beyond the core set: 49, needing characters, nested arrays, `⎕` system names, Dyalog `]` user commands, dfns, or primitives and operators outside the list.

GNU APL 2.0 printed something different in 52 of the 59 examples: 29 display-only, 13 different values, 10 where GNU APL errors out.
