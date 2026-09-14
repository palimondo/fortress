# Goldens: "Iteration"

Source: https://xpqz.github.io/learnapl/iteration.html, fetched 2026-09-14.

Every example the chapter runs, in the order it appears. Input lines are indented six spaces in the APL convention; the book's printed output follows unindented and verbatim. Multi-line dfns are shown as the chapter's notebook cell has them, indentation and all, under the `]dinput` line that introduces them.

The examples form one session read top to bottom: variables, functions and settings from an earlier example hold for the later ones.

The chapter sets `⎕IO ← 0` in its prelude, as every chapter before it does, so every index and every `⍳` result counts from zero. That is the book's choice, not APL's default. Three of the dfns — `bsearch` (Ex 25), `prefix1` (Ex 27) and `prefix2` (Ex 29) — set `⎕IO←0` again locally, so that they keep working if pasted into a workspace at origin 1.

Each example is labelled `core` when it uses only simple numeric arrays, the primitives `+ - × ÷ ⌈ ⌊ * ⍳ ⍴ , ⌽ ⍉ / ⊂ ≡ ≢ ⍋ ⍒ ↑ ↓ ⍷ ∊ ~ ∪ ∩`, and dfns with `⍺` and `⍵`, guards included — chapter 4 introduced dfns and their guards, and this chapter builds on them, so both count as core here — or `needs:` followed by what it asks for beyond that. The named needs used below are: nested arrays, characters, `⎕` system names, `]` user commands, bracket indexing, bracket axis, modified assignment, recursion `∇`, each `¨`, scan `⍀`, n-wise reduction, power `⍣`, user-defined operators `⍺⍺`/`⍵⍵`, tacit, and `glyphs outside the set:` followed by the glyphs themselves. Reduce-first `⌿` is counted among the glyphs outside the set: chapter 3's list has only `/`.

Nine things the chapter prints are not examples and are not numbered: four Python blocks used for comparison (`map` with a lambda, a `mymap` generator, the Knuth-Morris-Pratt `prefix` function, and a shell transcript of running it), and five APL sketches with no output — the `f⍣8` power skeleton, the `(⍺+⊃⍵)Sum 1↓⍵` alternative to `∇`, the bare guard `0=≢⍵: ⍺`, the Fibonacci sequence `0 1 1 2 3 5 8 13 21 34`, and the generic accumulate-and-recur pattern.

Where GNU APL 2.0 printed something different, a second fenced block marked `apl-oracle` follows the book's, preceded by a one-line note on the difference. This chapter ran under `]BOXING 7`; the invocation, the translation of Dyalog's `]box`, `]rows`, `]display` and `]dinput` user commands, which GNU APL does not have, and what GNU APL does and does not support of this chapter's iteration operators, are in `ORACLE.md`.

Seven of this chapter's examples are benchmarks (Ex 31 to Ex 37). They depend on Dyalog's `cmpx`, on a data file the book does not ship, and on timings of one machine, so their printed output carries no reproducible value; they are recorded here for completeness only.

## Ex 1 — needs: characters; ⎕ system name; ] user command; glyphs outside the set: ⋄

Index origin zero, boxed display and unwrapped output rows, plus Roger Hui's assertion helper from chapter 4, which Ex 18 and Ex 20 use.

Oracle translation: ]box on translated to ]BOXING 7.

Oracle translation: ]rows on has no GNU APL equivalent; ⎕PW←10000 stands in.

```apl
      ⎕IO ← 0
      ]box on
      ]rows on
      assert ← {⍺ ← 'assertion failure' ⋄ 0∊⍵: ⍺ ⎕signal 8 ⋄ shy ← 0}
Was ON
Was OFF
```

Oracle differs (error): GNU APL has no ]box or ]rows and prints no confirmation for the ]BOXING 7 and ⎕PW←10000 that stand in; the assert definition then fails, because a guard — the colon — is not available in a GNU APL lambda.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 2 — needs: each ¨; glyphs outside the set: ⍨

Each, `¨`, is APL's map: it applies its operand to every element. `×⍨` is Commute used to square.

```apl
      ×⍨¨1+⍳9  ⍝ Square elements via each (but see below!)
1 4 9 16 25 36 49 64 81
```

## Ex 3 — needs: glyphs outside the set: ⍨

The same result without Each: scalar functions already pervade arrays, so the `¨` in Ex 2 bought nothing.

```apl
      ×⍨1+⍳9  ⍝ Square elements via scalar pervasion
1 4 9 16 25 36 49 64 81
```

## Ex 4 — needs: nested arrays; ⎕ system name; each ¨

Each earning its keep: Tally applied to every element of a nested vector.

```apl
      ⎕ ← V ← (1 2 3 4)(1 2)(3 4 5 6 7)(,2)(5 4 3 2 1)
      ≢¨V ⍝ Tally-each
┌───────┬───┬─────────┬─┬─────────┐
│1 2 3 4│1 2│3 4 5 6 7│2│5 4 3 2 1│
└───────┴───┴─────────┴─┴─────────┘
4 2 5 1 5
```

Oracle differs (display): Display only: the tallies agree; ⎕← bypasses GNU APL's boxing setting, so the nested vector prints unframed.

```apl-oracle
 1 2 3 4  1 2  3 4 5 6 7  2  5 4 3 2 1 
4 2 5 1 5
```

## Ex 5 — needs: glyphs outside the set: ⌿

Reduce first, `⌿`, injects its operand between the elements and drops the rank by one.

```apl
      +⌿1 2 3 4 5 6 7 8 9 ⍝ sum-reduce-first integers 1-9
45
```

## Ex 6 — core

The same sum written out longhand.

```apl
      1+2+3+4+5+6+7+8+9
45
```

## Ex 7 — needs: glyphs outside the set: ⌿

Reduce is a foldr: it folds right to left, which is why minus-reduce of 1 to 9 is 5, not ¯43.

```apl
      -⌿1 2 3 4 5 6 7 8 9 ⍝ difference-reduction -- take care: right to left fold!
5
```

## Ex 8 — core

The longhand that explains Ex 7.

```apl
      1-2-3-4-5-6-7-8-9
5
```

## Ex 9 — needs: ⎕ system name; glyphs outside the set: ? ⌿

Reduce first on a matrix reduces along the leading axis: these are the column sums. Uses dyadic ? (Deal), so m is random and every later example that shows m is one run only.

```apl
      ⎕ ← m ← 3 3⍴9?9
      +⌿m
3 0 5
4 1 8
6 7 2
13 8 15
```

Oracle differs (value): Dyadic ? (Deal) is random, so the oracle drew a different permutation; the values below differ for that reason alone.

```apl-oracle
4 3 8
1 5 6
7 2 0
12 10 14
```

## Ex 10 — core

`/` reduces along the last axis, so plus-slash of a matrix gives the row sums.

```apl
      +/m
8 13 15
```

Oracle differs (value): m is the oracle's own random matrix from Ex 9; the row sums are of that one.

```apl-oracle
15 12 9
```

## Ex 11 — needs: bracket axis; glyphs outside the set: ⌿

The same row sums, asking `⌿` for the other axis explicitly with bracket axis.

```apl
      +⌿[1]m
8 13 15
```

Oracle differs (value): m is the oracle's own random matrix from Ex 9; bracket axis itself agrees.

```apl-oracle
15 12 9
```

## Ex 12 — needs: n-wise reduction; glyphs outside the set: ⌿

The derived function a reduction returns can be called dyadically: the left argument is a sliding window width. Here, pairwise sums.

```apl
      2+⌿1 2 3 4 5 6 7 8 9
3 5 7 9 11 13 15 17
```

## Ex 13 — needs: scan ⍀; glyphs outside the set: ⌿

Scan first, `⍀`, is Reduce that keeps every intermediate state: the running sums.

```apl
      +⌿1 2 3 4 5 6 7 8 9 ⍝ Sum-reduce first
      +⍀1 2 3 4 5 6 7 8 9 ⍝ Sum-scan first
45
1 3 6 10 15 21 28 36 45
```

## Ex 14 — needs: glyphs outside the set: ⌿

Scan spelled out: the reductions over every prefix of the argument.

```apl
      +⌿1
      +⌿1 2
      +⌿1 2 3
      +⌿1 2 3 4
      +⌿1 2 3 4 5
      +⌿1 2 3 4 5 6
      +⌿1 2 3 4 5 6 7 
      +⌿1 2 3 4 5 6 7 8
      +⌿1 2 3 4 5 6 7 8 9
1
3
6
10
15
21
28
36
45
```

## Ex 15 — needs: power ⍣; glyphs outside the set: = ⍨

Power, `⍣`, with a function right operand is a while-loop: apply `2÷⍨` until two successive results are equal — the fixed point, 0.

```apl
      2÷⍨⍣=10 ⍝ Divide by 2 until we reach a fixed point
0
```

## Ex 16 — needs: power ⍣ with a dfn right operand; glyphs outside the set: ⍞ ? =

The stopping condition can be any dfn: `⍺` is the new result, `⍵` the previous one. `⍞←` prints without a newline, so the whole sequence of rolls appears on one line before the final 6. Random: one run only.

```apl
       {⍞ ← ?10}⍣{6=⍺} 0 ⍝ Keep generating random numbers between 1 and 10 until we get a 6
1991487931157990989988905581516
6
```

Oracle differs (error): A GNU APL lambda that mentions neither ⍺ nor ⍵ is niladic — a value, not a function — so `{⍞ ← ?10}` cannot be an operand of ⍣; it is evaluated once (printing one random roll) and then `λ1⍣λ2` is a SYNTAX ERROR. ⍣ itself works, lambda operands included.

```apl-oracle
7SYNTAX ERROR
      λ1⍣λ2 0
      ^  ^
```

## Ex 17 — needs: ] user command; recursion ∇; glyphs outside the set: = ⊃

Reduce written by hand with Del: accumulator on the left, tail recursion on the right, guard for the empty case.

Oracle translation: the ]dinput multi-line dfn is entered as a one-line lambda with ⋄ separators and the comments dropped.

```apl
      ]dinput
      Sum ← {
          ⍺ ← 0        ⍝ Left arg defaults to 0 if not given
          0=≢⍵: ⍺      ⍝ If right arg is empty, return left arg
          (⍺+⊃⍵)∇1↓⍵   ⍝ Add head to acc, recur over tail
      }
```

Oracle differs (error): Two features at once are missing: guards (the colon) and ∇ self-reference, either of which alone is a SYNTAX ERROR in a GNU APL lambda.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 18 — needs: ⎕ system name; glyphs outside the set: =; the recursive dfn Sum defined in Ex 17; the assert dfn defined in Ex 1

```apl
      ⎕ ← mysum ← Sum 1 2 3 4 5 6 7 8 9
      assert mysum=+/1 2 3 4 5 6 7 8 9
45
```

Oracle differs (error): Neither Sum nor assert exists, because Ex 17 and Ex 1 failed: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      ⎕←mysum←Sum 1 2 3 4 5 6 7 8 9
                  ^
VALUE ERROR+
      assert mysum=+/1 2 3 4 5 6 7 8 9
                  ^
```

## Ex 19 — needs: ] user command; recursion ∇; glyphs outside the set: = ⊃ ⍬

Scan written by hand: same shape as Ex 17, but the accumulator is a vector that grows by the running sum.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      Sscan ← {
          ⍺ ← ⍬              ⍝ Left arg defaults to ⍬ if not given
          0=≢⍵: ⍺            ⍝ If right arg is empty, return left arg
          (⍺,⊃⍵+⊃¯1↑⍺)∇1↓⍵   ⍝ Append the sum of the head and the last element of acc and recur on tail
      }
```

Oracle differs (error): Guards and ∇ self-reference are both unavailable in a GNU APL lambda.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 20 — needs: ⎕ system name; scan ⍀; the recursive dfn Sscan defined in Ex 19; the assert dfn defined in Ex 1

```apl
      ⎕ ← myscan ← Sscan 1 2 3 4 5 6 7 8 9
      assert myscan≡+⍀1 2 3 4 5 6 7 8 9
1 3 6 10 15 21 28 36 45
```

Oracle differs (error): Neither Sscan nor assert exists, because Ex 19 and Ex 1 failed: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      ⎕←myscan←Sscan 1 2 3 4 5 6 7 8 9
                     ^
VALUE ERROR+
      assert myscan≡+⍀1 2 3 4 5 6 7 8 9
                   ^
```

## Ex 21 — needs: ] user command; recursion ∇; glyphs outside the set: = ⊃

Tail-recursive Fibonacci: the accumulator is a two-element sliding window over the sequence, the right argument the loop counter.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      Fib ← { ⍝ Tail-recursive Fibonacci.
          ⍺ ← 0 1
          ⍵=0: ⊃⍺
          (1↓⍺,+/⍺)∇⍵-1
      }
```

Oracle differs (error): Guards and ∇ self-reference are both unavailable in a GNU APL lambda.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 22 — needs: each ¨; the recursive dfn Fib defined in Ex 21

```apl
      Fib¨⍳10 ⍝ The 10 first Fibonacci numbers
0 1 1 2 3 5 8 13 21 34
```

Oracle differs (error): Fib was never defined because Ex 21 failed: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      Fib¨⍳10
         ^
```

## Ex 23 — needs: ] user command; recursion ∇; user-defined operators ⍺⍺; tacit; glyphs outside the set: ≥ ⌿ ⍨ < = > ⌷ ?

Quicksort. The inner operator S partitions the left argument by its left operand against the pivot; the tacit fork `(∇<S),=S,(∇>S)` is the algorithm itself.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators.

```apl
      ]dinput
      Quicksort ← {
          1≥≢⍵: ⍵
          S ← {⍺⌿⍨⍺ ⍺⍺ ⍵}
          ⍵((∇<S),=S,(∇>S))⍵⌷⍨?≢⍵
      }
```

Oracle differs (error): The guard alone stops it; ∇, the dop `⍺⍺` and the fork train are all unavailable too.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 24 — needs: ⎕ system name; glyphs outside the set: ?; the dfn Quicksort defined in Ex 23

Uses dyadic ? (Deal): the input shown is one run only. `⎕←` prints the unsorted argument on its way in.

```apl
      Quicksort ⎕←20?20
3 10 4 15 9 11 0 7 6 14 13 5 2 19 18 12 8 1 17 16
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
```

Oracle differs (error): The ⎕← still prints its own random permutation, then Quicksort is a VALUE ERROR because Ex 23 failed.

```apl-oracle
0 9 17 19 18 5 13 4 6 15 12 14 7 16 11 8 3 1 10 2
VALUE ERROR+
      Quicksort ⎕←20?20
                  ^
```

## Ex 25 — needs: ] user command; ⎕ system name; recursion ∇; user-defined operators ⍺⍺ ⍵⍵; glyphs outside the set: > ⍬ = ⊃ < ⍨

Binary search as a dop: the item is the left operand, the array the right operand, and the two arguments are the lower and upper index. Sets ⎕IO←0 locally.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      bsearch ← {⎕IO←0
          _bs_ ← {                 ⍝ Operator: ⍺,⍵ - lower,upper index. ⍺⍺ - item, ⍵⍵ - array
              ⍺>⍵: ⍬               ⍝ If lower index has moved past upper, item's not present
              mid ← ⌈0.5×⍺+⍵       ⍝ New midpoint  
              ⍺⍺=mid⊃⍵⍵: mid       ⍝ Check if item is at the new midpoint
              ⍺⍺<mid⊃⍵⍵: ⍺∇¯1+mid  ⍝ Drill into lower half
              ⍵∇⍨1+mid             ⍝ Upper half
          }
          0 (⍺ _bs_ (,⍵)) ¯1+≢,⍵
      }
```

Oracle differs (error): Guards stop it first; ∇ and the dop operands `⍺⍺` and `⍵⍵` are unavailable as well.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 26 — needs: ] user command; the operator-based dfn bsearch defined in Ex 25

The last line shows the "not found" result: an empty numeric vector, which prints as nothing without `]display`.

Oracle translation: ]display dropped, value shown under ]BOXING 8.

```apl
      5 bsearch 0 2 3 5 8 12 75
      5 bsearch 0 2 3 5 8 12
      5 bsearch 5 5
      5 bsearch 5
      ]display 1 bsearch 0 2 3 5 8 12
3
3
1
0
┌⊖┐
│0│
└~┘
```

Oracle differs (error): bsearch was never defined because Ex 25 failed: VALUE ERROR five times.

```apl-oracle
VALUE ERROR+
      5 bsearch 0 2 3 5 8 12 75
                ^
VALUE ERROR+
      5 bsearch 0 2 3 5 8 12
                ^
VALUE ERROR+
      5 bsearch 5 5
                ^
VALUE ERROR+
      5 bsearch 5
                ^
VALUE ERROR+
      1 bsearch 0 2 3 5 8 12
                ^
```

## Ex 27 — needs: ] user command; ⎕ system name; recursion ∇; bracket indexing; modified assignment; glyphs outside the set: ⍨ ⊃ ⊢ = < ≤

The Knuth-Morris-Pratt prefix table: two nested recursive dfns standing in for the Python double loop, the inner one for the `while`, the outer one dropping the head off its argument each turn.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      prefix1 ← {⎕IO←0
          p ← ⍵
          pi ← 0⍴⍨≢⍵
          j ← 0
          {
              0=≢⍵: pi
              i ← ⊃⍵ ⍝ head
              pi[i] ← j⊢←1+{⍵<0:⍵⋄p[⍵]=p[i]:⍵⋄0≤⍵-1:∇pi[⍵-1]⋄¯1} j ⍝ while j>=0 and p[j] != p[i]
              ∇1↓⍵ ⍝ tail
          } 1+⍳¯1+≢⍵ ⍝ for i in range(1, m)
      }
```

Oracle differs (error): Guards stop it first; ∇ and the modified assignment `j⊢←` are unavailable as well.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 28 — needs: characters; the dfn prefix1 defined in Ex 27

Matches the Python `prefix('CAGCATGGTATCACAGCAGAG')` shown just above it in the chapter.

```apl
      prefix1 'CAGCATGGTATCACAGCAGAG'
0 0 0 1 2 0 0 0 0 0 0 1 2 1 2 3 4 5 3 0 0
```

Oracle differs (error): prefix1 was never defined because Ex 27 failed: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      prefix1 'CAGCATGGTATCACAGCAGAG'
              ^
```

## Ex 29 — needs: ] user command; ⎕ system name; recursion ∇; bracket indexing; modified assignment; glyphs outside the set: ⍨ ⊃ ⊢ = < ≤

The same algorithm with the one change the performance section is about: the outer loop carries an index in `⍺` instead of dropping the head off `⍵`, so nothing is reallocated per iteration.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      prefix2 ← {⎕IO←0
          p ← ⍵
          pi ← 0⍴⍨≢⍵
          j ← 0
          0 {
              ⍺=≢⍵: pi
              i ← ⍺⊃⍵ ⍝ Note: pick ⍺, not first
              pi[i] ← j⊢←1+{⍵<0:⍵ ⋄ p[⍵]=p[i]:⍵ ⋄ 0≤⍵-1:∇ pi[⍵-1] ⋄ ¯1} j
              (⍺+1)∇ ⍵ ⍝ Note: no tail!
          } 1+⍳¯1+≢⍵
      }
```

Oracle differs (error): Guards, ∇ and modified assignment, as in Ex 27.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 30 — needs: characters; the dfn prefix2 defined in Ex 29

```apl
      prefix2 'CAGCATGGTATCACAGCAGAG'
0 0 0 1 2 0 0 0 0 0 0 1 2 1 2 3 4 5 3 0 0
```

Oracle differs (error): prefix2 was never defined because Ex 29 failed: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      prefix2 'CAGCATGGTATCACAGCAGAG'
              ^
```

## Ex 31 — needs: characters; ⎕ system name (⎕NGET); glyphs outside the set: ⊃

Reads a file the book links to but does not ship (`kmp.txt` from Project Rosalind), so this example is not reproducible anywhere.

```apl
      data ← ⊃⊃⎕NGET'../kmp.txt'1 ⍝ From http://rosalind.info/problems/kmp/
      ≢data ⍝ LONG STRING!
99972
```

Oracle differs (error): GNU APL has no ⎕NGET, so the name is a VALUE ERROR and data is never assigned.

```apl-oracle
VALUE ERROR+
      data←⊃⊃⎕ NGET '../kmp.txt' 1
                    ^
VALUE ERROR+
      ≢data
       ^
```

## Ex 32 — needs: characters; ⎕ system name (⎕CY)

Copies Dyalog's `cmpx` benchmarking utility out of the `dfns` workspace. Prints nothing.

```apl
      'cmpx'⎕CY'dfns' ⍝ Load `cmpx` - comparative benchmarking
```

Oracle differs (error): GNU APL has no ⎕CY, and no dfns workspace to copy from: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      'cmpx' ⎕ CY 'dfns'
                  ^
```

## Ex 33 — needs: characters; the cmpx utility copied in Ex 32; the dfns prefix1 and prefix2 defined in Ex 27 and Ex 29

A benchmark: the timings and the bar chart are one machine's, and the book's point is only the ratio — dropping the head each iteration costs about 6.5×.

```apl
      cmpx 'prefix1 data' 'prefix2 data'
  prefix1 data → 9.7E¯1 |   0% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
  prefix2 data → 1.5E¯1 | -85% ⎕⎕⎕⎕⎕⎕                                  
```

Oracle differs (error): cmpx does not exist: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      cmpx 'prefix1 data' 'prefix2 data'
           ^
```

## Ex 34 — needs: characters; the cmpx utility copied in Ex 32; the operator-based dfn bsearch defined in Ex 25

The hand-written binary search loses to the `⍳` primitive on a hundred thousand elements.

```apl
      data ← ⍳100000 ⍝ A loooot of numbers
      cmpx 'data ⍳ 17777' '17777 bsearch data' ⍝ Look for the number 17777
  data ⍳ 17777       → 5.2E¯6 |    0% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕                     
  17777 bsearch data → 1.1E¯5 | +112% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
```

Oracle differs (error): The assignment runs; cmpx does not exist: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      cmpx 'data ⍳ 17777' '17777 bsearch data'
           ^
```

## Ex 35 — needs: characters; the cmpx utility copied in Ex 32; glyphs outside the set: ?

`⍳` on unsorted data is a linear scan, so the time depends on where the match is.

```apl
      randInts ← 100000 ? 100000 
      cmpx 'randInts⍳1' 'randInts⍳19326' 'randInts⍳46729'
  randInts⍳1     → 2.6E¯5 |   0% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
* randInts⍳19326 → 7.0E¯6 | -73% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕                             
* randInts⍳46729 → 2.2E¯6 | -92% ⎕⎕⎕                                     
```

Oracle differs (error): The Deal runs; cmpx does not exist: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      cmpx 'randInts⍳1' 'randInts⍳19326' 'randInts⍳46729'
           ^
```

## Ex 36 — needs: tacit; characters; the cmpx utility copied in Ex 32; glyphs outside the set: ∘

Binding the array to `⍳` with Compose lets Dyalog build a hash behind the scenes: the times stop depending on the argument.

```apl
      find←randInts∘⍳
      cmpx 'find 1' 'find 19326' 'find 46729'
  find 1     → 1.1E¯7 |  0% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
* find 19326 → 1.1E¯7 | -1% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
* find 46729 → 1.1E¯7 | -1% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
```

Oracle differs (error): Tacit binding of a function to an array, `randInts∘⍳`, is a SYNTAX ERROR in GNU APL, as tacit assignment was in chapters 2, 3 and 4; cmpx then has nothing to time.

```apl-oracle
SYNTAX ERROR+
      find←randInts∘⍳
                   ^^
VALUE ERROR+
      cmpx 'find 1' 'find 19326' 'find 46729'
           ^
```

## Ex 37 — needs: characters; the cmpx utility copied in Ex 32; glyphs outside the set: ⍸

Dyadic `⍸` (Interval Index) is itself a binary search over sorted data.

```apl
      cmpx 'data⍸1' 'data⍸19326' 'data⍸46729'
  data⍸1     → 1.2E¯4 |  0% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
* data⍸19326 → 1.2E¯4 |  0% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
* data⍸46729 → 1.2E¯4 | -1% ⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
```

Oracle differs (error): cmpx does not exist: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      cmpx 'data⍸1' 'data⍸19326' 'data⍸46729'
           ^
```

## Ex 38 — needs: nested arrays; ⎕ system name

A vector nested three deep, for the scalar pervasion section.

```apl
      ⎕ ← nesty ← (1 2 3 (3 4 (5 6)) 7)
┌─┬─┬─┬─────────┬─┐
│1│2│3│┌─┬─┬───┐│7│
│ │ │ ││3│4│5 6││ │
│ │ │ │└─┴─┴───┘│ │
└─┴─┴─┴─────────┴─┘
```

Oracle differs (display): Display only: the value agrees; ⎕← bypasses GNU APL's boxing setting, so the nested vector prints unframed.

```apl-oracle
 1 2 3   3 4  5 6   7 
```

## Ex 39 — needs: nested arrays

Scalar pervasion: a scalar function reaches every number at every level of nesting.

```apl
      -nesty
┌──┬──┬──┬─────────────┬──┐
│¯1│¯2│¯3│┌──┬──┬─────┐│¯7│
│  │  │  ││¯3│¯4│¯5 ¯6││  │
│  │  │  │└──┴──┴─────┘│  │
└──┴──┴──┴─────────────┴──┘
```

Oracle differs (display): Display only: the values agree; at ]BOXING 7 GNU APL frames only the nested parts, and draws the frame's type marker as `∼` and enclosure as `ϵ` where Dyalog uses `~` and `∊`.

```apl-oracle
¯1 ¯2 ¯3 ┌→────────────┐ ¯7
         │¯3 ¯4 ┌→────┐│   
         │      │¯5 ¯6││   
         │      └∼────┘│   
         └ϵ────────────┘   
```

## Ex 40 — needs: nested arrays

Pervasion for dyads too, with the usual scalar extension: a one-element matrix pairs with every element of the nested right argument.

```apl
      (1 2) 3 + 4 (5 6)
      (1 1⍴5) - 1 (2 3)
┌───┬───┐
│5 6│8 9│
└───┴───┘
┌─┬───┐
│4│3 2│
└─┴───┘
```

Oracle differs (display): Display only: the values agree; GNU APL frames each nested element separately at ]BOXING 7 and draws the type marker as `∼`.

```apl-oracle
┌→──┐ ┌→──┐
│5 6│ │8 9│
└∼──┘ └∼──┘
4 ┌→──┐
  │3 2│
  └∼──┘
```

## Counts

Examples: 40. Core — simple numeric arrays, the listed primitives and dfns with guards only: 3 (Ex 6, Ex 8, Ex 10).

Beyond the core set: 37, needing nested arrays, characters, `⎕` system names, Dyalog `]` user commands, bracket indexing, bracket axis, modified assignment, recursion `∇`, Each `¨`, Scan `⍀`, n-wise reduction, Power `⍣`, user-defined operators, tacit definition, or primitives outside the list.

GNU APL 2.0 printed something different in 30 of the 40 examples: 4 display-only, 3 different values, 23 where GNU APL errors out.
