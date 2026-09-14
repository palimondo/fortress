# Goldens: "Direct functions and operators"

Source: https://xpqz.github.io/learnapl/functions.html, fetched 2026-09-13.

Every example the chapter runs, in the order it appears. Input lines are indented six spaces in the APL convention; the book's printed output follows unindented and verbatim. Multi-line dfns are shown as the chapter's notebook cell has them, indentation and all, under the `]dinput` line that introduces them.

The examples form one session read top to bottom: variables, functions and settings from an earlier example hold for the later ones.

The chapter sets `⎕IO ← 0` in its prelude, the same as the three chapters before it, so every index and every `⍳` result counts from zero. That is the book's choice, stated in Ex 1 below, not APL's default. One dfn, Ex 16, sets `⎕IO←0` again locally because the trick it shows depends on it.

Each example is labelled `core` when it uses only simple numeric arrays, the primitives `+ - × ÷ ⌈ ⌊ * ⍳ ⍴ , ⌽ ⍉ / ⊂ ≡ ≢ ⍋ ⍒ ↑ ↓ ⍷ ∊ ~ ∪ ∩`, and dfns with `⍺` and `⍵` — this chapter is about dfns, so the braces and the two argument names are part of the core here — or `needs:` followed by what it asks for beyond that. `⋄` (statement separator) and `⍬` (empty numeric vector) are counted among the glyphs outside the set.

Four things the chapter prints are not examples and are not numbered: a skeleton `name ← { ⍝ expressions }`, the RIDE line `)ed name`, and three Python snippets used for comparison (an if-then-else function, a conditional expression, and `a += 45`).

Where GNU APL 2.0 printed something different, a second fenced block marked `apl-oracle` follows the book's, preceded by a one-line note on the difference. This chapter ran under `]BOXING 7`; the invocation, the translation of Dyalog's `]box` and `]rows` user commands, which GNU APL does not have, and what GNU APL does and does not support of this chapter's dfn features, are in `ORACLE.md`.

## Ex 1 — needs: ⎕ system name; ] user command

Index origin zero, boxed display and unwrapped output rows, for the whole chapter — the same prelude the earlier chapters run.

Book: "First, our now familiar prelude:"

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

## Ex 2 — needs: characters; ⎕ system name; guards; glyphs outside the set: ⋄

Roger Hui's assertion helper, defined here and applied in Ex 20, Ex 22 and Ex 24. A default left argument, a guard and ⎕SIGNAL in one line.

```apl
      assert ← {⍺ ← 'assertion failure' ⋄ 0∊⍵: ⍺ ⎕signal 8 ⋄ shy ← 0}
```

Oracle differs (error): Guards are not available in GNU APL's lambdas: a colon in a {…} definition is "Illegal : in immediate execution".

```apl-oracle
Illegal : in immediate execution+
```

## Ex 3 — needs: ] user command

The chapter's first dfn. ]dinput is the Jupyter/REPL way of entering a multi-line dfn.

Oracle translation: the ]dinput multi-line dfn is entered as a one-line lambda with ⋄ separators and the comments dropped; GNU APL has no ]dinput and no multi-line dfn.

```apl
      ]dinput
      MyFirstFunction ← {
          ⍝ Add left and right
          ⍺+⍵
      }
```

## Ex 4 — core

Applies MyFirstFunction from Ex 3: ⍺ is the left argument, ⍵ the right.

```apl
      32 MyFirstFunction 98
130
```

## Ex 5 — needs: ] user command

Same function with an intermediate variable: a dfn returns the first non-assigned value, here the line that just states total.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      Sum ← {
          ⍝ Add left and right
          total ← ⍺+⍵
          total
      }
```

## Ex 6 — core

```apl
      32 Sum 98
130
```

## Ex 7 — needs: glyphs outside the set: ⋄

The default left argument: ⍺ ← ¯99 takes effect only when the function is called monadically.

```apl
      {⍺ ← ¯99 ⋄ ⍺+⍵} 99
      57 {⍺ ← ¯99 ⋄ ⍺+⍵} 99
0
156
```

Oracle differs (value): GNU APL treats ⍺ ← inside a lambda as an ordinary assignment that overwrites the supplied left argument, so the dyadic call also yields 0 rather than 156.

```apl-oracle
0
0
```

## Ex 8 — needs: glyphs outside the set: ⋄

Only the first ⍺ ← counts: the second assignment has no effect, so the result is still ¯99+99.

```apl
      {⍺ ← ¯99 ⋄ ⍺ ← ¯999999 ⋄ ⍺+⍵} 99
0
```

Oracle differs (value): Because GNU APL's ⍺ ← is a plain assignment, the second one wins: ¯999999+99.

```apl-oracle
¯999900
```

## Ex 9 — needs: ] user command; guards; recursion ∇; glyphs outside the set: = ⊃

Recursion with the accumulator on the left argument; ∇ refers to the innermost function. The guard 0=≢⍵:⍺ is the base case.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      sum ← {
          ⍺ ← 0       ⍝ Initialise the accumulator
          0=≢⍵:⍺      ⍝ If right arg empty vector, return accumulator, see below!
          (⍺+⊃⍵)∇1↓⍵  ⍝ Add head to accumulator, recurse over tail
      }
```

Oracle differs (error): Two features at once are missing: guards (the colon) and ∇ self-reference, either of which alone is a SYNTAX ERROR in a GNU APL lambda.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 10 — needs: the recursive dfn sum defined in Ex 9

Depends on ⎕IO: with origin zero ⍳10 is 0 to 9, which sums to 45.

```apl
      sum ⍳10
      100 sum ⍳10
45
145
```

Oracle differs (error): sum was never defined because Ex 9 failed: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      sum⍳10
         ^
VALUE ERROR+
      100 sum⍳10
             ^
```

## Ex 11 — needs: ] user command; guards; glyphs outside the set: ⊖

A guard is APL's conditional return: if the expression left of the colon is true, the function returns the value to its right.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      Palinish ← {
          rev ← ⊖⍵ ⍝ Reverse the right arg
          rev≡⍵: 1 ⍝ If right arg matches its own reverse, return 1
          0        ⍝ Else, return 0
      }
```

Oracle differs (error): Guards are not available in GNU APL's lambdas.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 12 — needs: the dfn Palinish defined in Ex 11

```apl
      Palinish 1 2 3 2 1
      Palinish 1 2 3 4 5
      Palinish 3
1
0
1
```

Oracle differs (error): Palinish was never defined because Ex 11 failed: VALUE ERROR.

```apl-oracle
VALUE ERROR+
      Palinish 1 2 3 2 1
               ^
VALUE ERROR+
      Palinish 1 2 3 4 5
               ^
VALUE ERROR+
      Palinish 3
               ^
```

## Ex 13 — needs: glyphs outside the set: ⊖

The same test as an unnamed dfn applied in place.

```apl
      {⍵≡⊖⍵} 1 2 3 2 1 ⍝ Anonymous (unnamed) version
1
```

## Ex 14 — needs: guards; glyphs outside the set: > ⋄

The APL rendering of the chapter's Python if-then-else sketch; flerp and flumm are never defined, so this example is only ever assigned, never applied.

```apl
      foo ← {47>flerp ⍵: 92+flumm ⍵ ⋄ 57+8} ⍝ Note: diamond separator
```

Oracle differs (error): Guards are not available in GNU APL's lambdas.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 15 — needs: ] user command; guards; glyphs outside the set: ⋄

Execution does not continue past a guard, so the branch is pushed into an inner anonymous dfn, {⍵:42 ⋄ ¯99}.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators; the two trailing comment lines are dropped.

```apl
      ]dinput
      foo ← {
          answer ← ⍵
          a ← {⍵:42 ⋄ ¯99} answer
          ⍝ ...execution follows here
          ⍝ do something with a
      }
```

Oracle differs (error): Guards are not available in GNU APL's lambdas — here in the inner dfn.

```apl-oracle
Illegal : in immediate execution+
```

## Ex 16 — needs: ] user command; ⎕ system name; glyphs outside the set: ⊃

The same branch without a function: picking from a 2-element vector, which the book notes needs ⎕IO←0 — hence the local ⎕IO←0 in the dfn's first line.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      foo ← {⎕IO←0
          answer ← ⍵
          a ← answer⊃¯99 42
          ⍝ ...execution follows here
          ⍝ do something with a
      }
```

## Ex 17 — needs: ] user command; glyphs outside the set: ⍬

Name scoping: the inner dfn's a ← ¯99 creates a new lexically scoped name, so the outer a is still 45.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      foo ← {
          a ← 45
          _ ← {a←¯99}⍬
          a
      }
```

Oracle differs (error): GNU APL cannot rebind a name that already holds a lambda — foo was bound in Ex 16 — so the definition is a SYNTAX ERROR and foo keeps its Ex 16 body.

```apl-oracle
SYNTAX ERROR+
      foo←λ1
         ^^
```

## Ex 18 — needs: glyphs outside the set: ⍬

```apl
      foo ⍬ ⍝ Note: 45, not ¯99
45
```

Oracle differs (value): foo is still the Ex 16 lambda of the oracle run, so the call evaluates ⍬⊃¯99 42, which discloses the whole vector.

```apl-oracle
¯99 42
```

## Ex 19 — needs: ] user command; modified assignment; glyphs outside the set: ⍬

Modified assignment a +← 45 reaches the outer name instead of creating a new one.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      foo ← {
          a ← 45
          _ ← {a +← 45}⍬
          a
      }
```

Oracle differs (error): Modified assignment inside a lambda is a SYNTAX ERROR in GNU APL.

```apl-oracle
SYNTAX ERROR
λ1[1]  λ←a+←45
         ^ ^
```

## Ex 20 — needs: ⎕ system name; glyphs outside the set: = ⍬; the assert dfn defined in Ex 2

```apl
      ⎕ ← r ← foo ⍬
      assert r=90
90
```

Oracle differs (error): foo is still the Ex 16 lambda, and assert was never defined because Ex 2 failed: VALUE ERROR.

```apl-oracle
¯99 42
VALUE ERROR+
      assert r=90
             ^
```

## Ex 21 — needs: ] user command; modified assignment; glyphs outside the set: ⊢ ⍬

Modified assignment with Right tack ⊢← sets, rather than combines, an outer value.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      foo ← {
          a ← 45
          _ ← {a ⊢← ¯99}⍬
          a
      }
```

Oracle differs (error): Modified assignment inside a lambda is a SYNTAX ERROR in GNU APL, ⊢← included.

```apl-oracle
SYNTAX ERROR
λ1[1]  λ←a⊢←¯99
         ^ ^
```

## Ex 22 — needs: ⎕ system name; glyphs outside the set: = ⍬; the assert dfn defined in Ex 2

```apl
      ⎕ ← r ← foo ⍬
      assert r=¯99
¯99
```

Oracle differs (error): Same as Ex 20: foo is the Ex 16 lambda and assert does not exist.

```apl-oracle
¯99 42
VALUE ERROR+
      assert r=¯99
             ^
```

## Ex 23 — needs: ] user command; modified assignment; bracket indexing; glyphs outside the set: ⍬

Selective assignment works the same way: bracket indexing on the left of ← mutates the outer matrix.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

```apl
      ]dinput
      foo ← {
          a ← 3 3⍴1 ⍝ 3×3 matrix of all 1
          _ ← {a[1;1] ← 0}⍬
          a
      }
```

Oracle differs (error): Again GNU APL will not rebind foo, a name already holding a lambda: SYNTAX ERROR.

```apl-oracle
SYNTAX ERROR+
      foo←λ1
         ^^
```

## Ex 24 — needs: ⎕ system name; glyphs outside the set: ⍬; the assert dfn defined in Ex 2

```apl
      ⎕ ← r ← foo ⍬
      assert r≡3 3⍴1 1 1 1 0 1 1 1 1
1 1 1
1 0 1
1 1 1
```

Oracle differs (error): Same as Ex 20: foo is the Ex 16 lambda and assert does not exist.

```apl-oracle
¯99 42
VALUE ERROR+
      assert r≡3 3⍴1 1 1 1 0 1 1 1 1
             ^
```

## Ex 25 — core

An operator returns a derived function: +/ is plus-reduce, here called dyadically as a windowed (pairwise) reduction. Depends on ⎕IO: with origin zero ⍳10 is 0 to 9.

```apl
      2 (+/) ⍳10 ⍝ Parentheses not required, added for illustrative purposes
1 3 5 7 9 11 13 15 17
```

## Ex 26 — needs: tacit

The same derived function named by ordinary assignment, to emphasise that the operator returns a function.

```apl
      sumred ← +/
      2 sumred ⍳10
1 3 5 7 9 11 13 15 17
```

Oracle differs (error): Tacit assignment of a derived function, +/, is a SYNTAX ERROR in GNU APL, and the next line then has no sumred.

```apl-oracle
SYNTAX ERROR
      sumred←+/
      ^      ^
VALUE ERROR+
      2 sumred⍳10
              ^
```

## Ex 27 — needs: ] user command; user-defined operators ⍺⍺; glyphs outside the set: ⊃ ⍨

A direct operator (dop) from the dfns workspace: ⍺⍺ is the left operand, and a monadic dop takes its operand on the left, the way / does.

Oracle translation: ]dinput multi-line dfn entered as a one-line lambda with ⋄ separators, comments dropped.

Oracle note: GNU APL accepts the definition but parses ⍺⍺ as ⍺ ⍺; it only fails when the operator is applied, in Ex 28.

```apl
      ]dinput
      foldl ← {                 ⍝ Fold (reduce) from the left.
          ⍺ ← ⊃0⍴⍵              ⍝ Default initial value for accumulator
          ↑⍺⍺⍨/(⌽⍵),⊂⍺
      }
```

## Ex 28 — needs: the user-defined operator foldl defined in Ex 27

foldl folds from the left, so it agrees with / for + and differs for -.

```apl
      +foldl ⍳10
      +/⍳10
      -foldl ⍳10
      -/⍳10
45
45
¯45
¯5
```

Oracle differs (error): GNU APL lambdas cannot be operators: ⍺⍺ parses as ⍺ ⍺ and applying foldl is a VALENCE ERROR. The built-in +/ and -/ lines still run.

```apl-oracle
VALENCE ERROR+
foldl[1]  λ←↑⍺ ⍺⍨/(⌽⍵),⊂⍺
             ^    ^
45
VALENCE ERROR+
foldl[1]  λ←↑⍺ ⍺⍨/(⌽⍵),⊂⍺
             ^    ^
¯5
```

## Ex 29 — needs: the user-defined operator foldl defined in Ex 27

The optional left argument initialises the accumulator.

```apl
      99 +foldl ⍳10
144
```

Oracle differs (error): Same VALENCE ERROR: foldl is not an operator in GNU APL.

```apl-oracle
VALENCE ERROR+
foldl[1]  λ←↑⍺ ⍺⍨/(⌽⍵),⊂⍺
             ^    ^
```

## Counts

Examples: 29. Core — simple numeric arrays, the listed primitives and plain dfns only: 3 (Ex 4, Ex 6, Ex 25).

Beyond the core set: 26, needing characters, Dyalog `]` user commands, `⎕` system names, guards, recursion `∇`, modified assignment, user-defined operators, tacit definition, or primitives outside the list.

GNU APL 2.0 printed something different in 21 of the 29 examples: 0 display-only, 4 different values, 17 where GNU APL errors out.
