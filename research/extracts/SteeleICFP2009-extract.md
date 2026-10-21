# Extract: Guy L. Steele Jr., "Organizing Functional Code for Parallel Execution; or, foldl and foldr Considered Slightly Harmful" (ICFP 2009 keynote)

Working notes on the keynote's slide deck
(`research/decks/ICFPAugust2009Steele.pdf`, 77 pages of 720 × 540 pt, typeset in
TeX and converted by dvipdfm on 2009-09-08, © 2008, 2009 Sun Microsystems) and
on its one-page abstract in the ICFP '09 proceedings
(`research/decks/ICFP2009Steele-abstract.pdf`: Guy L. Steele Jr., Sun
Microsystems Laboratories, Burlington, Massachusetts; "ICFP'09, August
31–September 2, 2009, Edinburgh, Scotland, UK. ACM 978-1-60558-332-7/09/08";
copyright held by Sun). Both are personal copies only: they stay in the
gitignored `research/decks/` and are never committed. The curator supplied both
on 2026-10-16; the deck was first posted at
`research.sun.com/projects/plrg/Publications/ICFPAugust2009Steele.pdf` (a
Wayback capture of that URL has not been checked). Slide 1's notice permits
personal or classroom copies and requires Sun's written permission "to post on
servers, or to redistribute to lists". These notes are our own summary and
commentary with brief attributed quotations, not a reproduction of the deck,
except that the code of every slide that shows code is given word for word from
the deck (2026-10-16).

Extract made 2026-10-16 from a full read of all 77 pages, each page's image
checked against the glyph names and positions of `mutool draw -F trace`.
Slide numbers are the printed footer numbers: PDF page N is slide N − 1 for
pages 2–76, which print 1–75; page 1 is the title slide, printing no number
(called slide 0 here); page 77 is a closing photo slide whose footer number runs
off the page edge, only its first digit, 7, showing (its text layer holds
"75-1"; called the closing slide here). Cross-references to this repository's
state are marked **[repo]**.

How the code is written. Typeset code keeps the slide's glyphs: `⟦ ⟧` for the
white brackets, `⟨ ⟩` for list brackets, `∥` for concatenation, `ℤ`, `←`, `→`,
`⇒`, `≠`, `−`, primes as `′` and subscripts as `₀`, `ᵢ`; `⊛` is the end-of-line
comment mark, drawn on the slides as an asterisk set over a `⊙`. Italic
identifiers and typewriter keywords are both written plain. A big operator's
generator, set below it on the slide, is written on the line below. Indentation
follows the slide's left edges, two spaces a step, and a line set under
`else (ys, zs) = …` is aligned under its `(ys`. Typewriter code (Fortran,
Scheme, NESL) keeps the slide's own columns, read from the glyph positions;
`pdftotext -layout` gets them wrong in places, for instance in slide 57's test
strings. In the Scheme the typewriter quote is the font's `’` glyph, ASCII `'`
in source. Text that a slide prints in white, so that it does not show, is left
out and noted. No glyph was left uncertain.

## The abstract

Steele opens with Alan Perlis's inversion of Oscar Wilde, the Lisp programmer
"who knows the value of everything and the cost of nothing", and says that with
multicore processors becoming "prominent, and soon ubiquitous" all programmers
must rethink their style so that their code performs well. "For the last six
years I have been part of a team working on a programming language, Fortress"
(that is, since 2003, as JuliaCon slide 47 says), which borrowed from Fortran,
Java, Algol, Alphard, CLU, MADCAP, MODCAP, MIRFAC, the Klerer-May system, "but
also from Haskell, and I would like to repay the favor". The talk presents
"three ideas (none original with me)" for organizing Fortress programs to run
"equally effectively either sequentially or in parallel": "user-defined
associative operators (and, more generally, user-defined monoids); conjugate
transforms of data; and monoid-caching trees (as described, for example, by
Hinze and Paterson)", with "pleasant little code examples (some original with
me)". Keywords: reduction, associative operator, monoid, tree, conjugate
transform.

## 0–4. Front matter and the thesis

- Slide 0 — Title, on Sun's orange template: "Organizing Functional Code for
  Parallel Execution", "or, `foldl` and `foldr` Considered Slightly Harmful",
  Guy Steele, Sun Fellow, Sun Microsystems Laboratories, August 2009.
- Slide 1 — Copyright notice (above).
- Slide 2 — **The Big Messages**: "Effective parallelism uses trees.";
  "Associative combining operators are good."; "MapReduce is good.
  Catamorphisms are good."; there are systematic strategies for parallelizing
  superficially sequential code; "We must lose the 'accumulator' paradigm and
  emphasize 'divide-and-conquer.'"
- Slide 3 — The talk is about performance: the bag of tricks of the last 50
  years "is the wrong way to think going forward and must be thrown out" (in
  red).
- Slide 4 — Why? Good sequential code minimizes operations (reusing results),
  space (reusing storage) and decomposes linearly; good parallel code, in red,
  often performs redundant operations to reduce communication, needs extra
  space for temporal decoupling, and decomposes and aggregates multiway.

The 2015 talk "Four Solutions to a Trivial Problem"
(`SteeleGoogleTechTalk2015-extract.md`) opens with this deck's slides 5–13 and
closes with its slides 70, 71, 73 and 74, by its captions.

## 5–11. Adding a bunch of numbers

- Slides 5–6 — "Let's Add a Bunch of Numbers", Fortran. Slide 6, the last
  build, with `SUM = 0` in blue and `!Oops!` in red; slide 5 shows only the
  loop (its first line is in the text layer, printed white):

  ```
  SUM = 0          !Oops!

  DO I = 1, 1000000
    SUM = SUM + X(I)
  END DO
  ```

  "Can it be parallelized?" Slide 6 adds: "This is already bad! Clever
  compilers have to undo this."
- Slide 7 — **What does a mathematician say?** Typeset only:

  ```
  1000000
     ∑    xᵢ      or maybe just      ∑ x
    i=1
  ```

  "Compare Fortran 90 SUM(X). What, not how. No commitment yet as to
  strategy. This is good."
- Slide 8 — Sequential computation tree: beside the loop, a left-linear tree
  of `+` from `0` and `X(1)` up to `X(1000000)`:

  ```
  SUM = 0
  DO I = 1, 1000000
    SUM = SUM + X(I)
  END DO
  ```

- Slides 9–10 — Atomic update computation trees (a) and (b): the same linear
  tree, its leaves now in scrambled order (`X(23)`, `X(999425)`, `X(23749)`, …,
  `X(14)`, `X(32476)`). Slide 9, `PARALLEL` blue, `!Wrong!` red, and in green
  "Race condition can cause updates to be lost.":

  ```
  SUM = 0
  PARALLEL DO I = 1, 1000000
    SUM = SUM + X(I)    !Wrong!
  END DO
  ```

  Slide 10, `ATOMIC` blue: correct, and the tree still linear:

  ```
  SUM = 0
  PARALLEL DO I = 1, 1000000
    ATOMIC SUM = SUM + X(I)
  END DO
  ```

- Slide 11 — Parallel computation tree: a balanced tree of `+` over `X(1)` …
  `X(1000000)`. "What sort of code should we write to get a computation tree of
  this shape? What sort of code would we *like* to write?"

## 12–21. Lists: cons versus conc

- Slide 12 — Finding the length of a LISP list: a drawing of four cons cells,
  23 → 47 → 18 → 11, labelled `first` and `rest`. "Recursive:"

  ```
  (define length (list)
    (cond ((null list) 0)
          (else (+ 1 (length (rest list))))))
  ```

  "Total work: Θ(n) / Delay: Ω(n)".
- Slide 13 — **Linear versus multiway decomposition.** Linearly linked lists
  are inherently sequential, like Peano arithmetic,
  `5 = ((((0+1)+1)+1)+1)+1`; "Binary arithmetic is much more efficient than
  unary!" We need a *multiway decomposition* paradigm:

  ```
  length [ ] = 0
  length [a] = 1
  length (a++b) = (length a) + (length b)
  ```

  "This is just a summation problem: adding up a bunch of 1's!" Total work
  Θ(n); delay Ω(log n), O(n) "depending on how a++b is split; even worse if
  splitting has worse than constant cost".
- Slide 14 — **Conc lists**: three drawn node kinds over their notation,
  typeset: a box with a diagonal (empty list), a box holding 23 (singleton), a
  box holding `∥` (concatenation):

  ```
  ⟨ ⟩            ⟨ 23 ⟩            a ∥ b
  ```

- Slides 15–18 — Conc lists for ⟨23, 47, 18, 11⟩, each drawn as a tree with
  its expression. Slide 15, the balanced tree:

  ```
  (⟨ 23 ⟩ ∥ ⟨ 47 ⟩) ∥ (⟨ 18 ⟩ ∥ ⟨ 11 ⟩)
  ```

  Slide 16 adds, in blue, a left-leaning tree:

  ```
  ((⟨ 23 ⟩ ∥ ⟨ 47 ⟩) ∥ ⟨ 18 ⟩) ∥ ⟨ 11 ⟩
  ```

  Slide 17 adds, in green, a tree with two empty lists inside it:

  ```
  (⟨ 23 ⟩ ∥ (⟨ 47 ⟩ ∥ ⟨ ⟩))
   ∥ (⟨ 18 ⟩ ∥ (⟨ ⟩ ∥ ⟨ 11 ⟩))
  ```

  Slide 18 adds a fourth tree, in purple, drawn only: a right spine of `∥`
  nodes ending in the empty list, the shape of a cons list. All four are the
  same list.
- Slides 19–21 — **Primitives on lists**, a table in typewriter with the laws
  in blue. Slide 19:

  ```
               constructors    predicates    accessors
               ’()             null?
  cons lists   (cons a ys)                   car, cdr
                     (cons (car xs) (cdr xs)) = xs
               ’()             null?
               (list a)        singleton?    item
  conc lists   (conc ys zs)                  left, right
                          (list (item s)) = s
                   (conc (left xs) (right xs)) = xs
  ```

  Slide 20 replaces the conc accessors `left, right` by `split` (red) and the
  last law by a red one; slide 21 adds a second red law. The conc rows of
  slide 21 (both slides also hold ", xxxx" after `split` in white, not shown):

  ```
               ’()             null?
               (list a)        singleton?    item
  conc lists   (conc ys zs)                  split
                          (list (item s)) = s
               (split xs (λ (ys zs) (conc ys zs))) = xs
                         (split xs conc) = xs
  ```

## 22–33. List operations in Scheme, by cons and by split

The defined names are blue on slides 22–30; the cost comments are red
throughout.

- Slides 22–23 — Defining lists using `car cdr cons`. Slide 23, which adds the
  comments to slide 22's code:

  ```
  (define (first x)                    ;Constant time
    (cond ((null? x) ’())
          (else (car x))))

  (define (rest x)                     ;Constant time
    (cond ((null? x) ’())
          (else (cdr x))))

  (define (append xs ys)               ;Linear in (length xs)
    (cond ((null? xs) ys)
          (else (cons (car xs) (append (cdr xs) ys)))))

  (define (addleft a xs) (cons a xs))  ;Constant time

  (define (addright xs a)              ;Linear in (length xs)
    (cond ((null? xs) (list a))
          (else (cons (car xs) (addright (cdr xs) a)))))
  ```

- Slides 24–27 — Defining lists using `item list split conc`. Slide 24:

  ```
  (define (first xs)                   ;Depth of left path
    (cond ((null? xs) ’())
          ((singleton? xs) (item xs))
          (else (split xs (λ (ys zs) (first ys))))))

  (define (rest xs)                    ;Depth of left path
    (cond ((null? xs) ’())
          ((singleton? xs) ’())
          (else (split xs (λ (ys zs) (append (rest ys) zs))))))

  (define (append xs ys)               ;Constant time
    (cond ((null? xs) ys)
          ((null? ys) xs)
          (else (conc xs ys))))
  ```

  Slide 25 keeps `first` and `rest` and changes `append`, `(REBALANCE` and its
  closing parenthesis in red:

  ```
  (define (append xs ys)               ;???
    (cond ((null? xs) ys)
          ((null? ys) xs)
          (else (REBALANCE (conc xs ys)))))
  ```

  Slide 26 (as on the slide, the last line calls `(addright a zs)` with its
  arguments in the other order from `(addright xs a)`):

  ```
  (define (addleft a xs)
    (cond ((null? xs) (list a))
          ((singleton? xs) (append (list a) xs))
          (else (split xs (λ (ys zs) (append (addleft a ys) zs))))))

  (define (addright xs a)
    (cond ((null? xs) (list a))
          ((singleton? xs) (append xs (list a)))
          (else (split xs (λ (ys zs) (append ys (addright a zs)))))))
  ```

  Slide 27, the same two by `append`:

  ```
  (define (addleft a xs) (append (list a) xs))

  (define (addright xs a) (append xs (list a)))
  ```

- Slide 28 — `map reduce mapreduce` using `car cdr cons`:

  ```
  (map (λ (x) (* x x)) ’(1 2 3))  =>  (1 4 9)
  (reduce + 0 ’(1 4 9))  =>  14
  (mapreduce (λ (x) (* x x)) + 0 ’(1 2 3))  =>  14

  (define (map f xs)                   ;Linear in (length xs)
    (cond ((null? xs) ’())
          (else (cons (f (car xs)) (map f (cdr xs))))))

  (define (reduce g id xs)             ;Linear in (length xs)
    (cond ((null? xs) id)
          (else (g (car xs) (reduce g id (cdr xs))))))

  (define (mapreduce f g id xs)        ;Linear in (length xs)
    (cond ((null? xs) id)
          (else (g (f (car xs)) (mapreduce f g id (cdr xs))))))
  ```

- Slide 29 — `length filter` using `car cdr cons`; `apply append` and the last
  `append` red. As on the slide, the first `filter` conses `p` where
  `(car xs)` is meant, and reads `(cdr x)` in its last line:

  ```
  (define (length xs)                  ;Linear in (length xs)
    (mapreduce (λ (q) 1) + 0 xs))

  (define (filter p xs)                ;Linear in (length xs)
    (cond ((null? xs) ’())
          ((p (car xs)) (cons p (filter p (cdr xs))))
          (else (filter p (cdr x)))))

  (define (filter p xs)                ;Linear in (length xs)??
    (apply append
           (map (λ (x) (if (p x) (list x) ’())) xs)))

  (define (filter p xs)                ;Linear in (length xs)!!
    (mapreduce (λ (x) (if (p x) (list x) ’()))
               append ’() xs))
  ```

  "The latter analysis depends on a crucial fact: in this situation, each call
  to append will require constant, not linear, time!"
- Slide 30 — `reverse` using `car cdr cons`:

  ```
  (define (reverse xs)                 ;QUADRATIC in (length xs)
    (cond ((null? xs) ’())
          (else (addright (reverse (cdr xs)) (car xs)))))

  (define (revappend xs ys)            ;Linear in (length xs)
    (cond ((null? xs) ys)
          (else (revappend (cdr xs) (cons (car xs) ys)))))

  (define (reverse xs)                 ;Linear in (length xs)
    (revappend xs ’()))
  ```

  "Structural recursion on cons lists produces poor performance for reverse.
  An accumulation trick gets it down to linear time."
- Slide 31 — **Parallel `map reduce mapreduce` using `item list split conc`**;
  `split`, `append` and `;or conc` red, the parallelism comment purple:

  ```
  (define (mapreduce f g id xs)        ;Logarithmic in (length xs)??
    (cond ((null? xs) id)
          ((singleton? xs) (f (item xs)))
          (else (split xs (λ (ys zs)
                  (g (mapreduce f g id ys)           ;Opportunity for
                     (mapreduce f g id zs)))))))     ; parallelism

  (define (map f xs)
    (mapreduce (λ (x) (list (f x))) append ’() xs))  ;or conc

  (define (reduce g id xs)
    (mapreduce (λ (x) x) g id xs))
  ```

- Slide 32 — Parallel `length filter reverse` using `item list split conc`:

  ```
  (define (length xs)                  ;Logarithmic in (length xs)??
    (mapreduce (λ (q) 1) + 0 xs))

  (define (filter p xs)                ;Logarithmic in (length xs)??
    (mapreduce (λ (x) (if (p x) (list x) ’()))
               append ’() xs))

  (define (reverse xs)                 ;Logarithmic in (length xs)??
    (mapreduce list (λ (ys zs) (append zs ys)) ’() xs))
  ```

- Slide 33 — Exercise: write mergesort and quicksort in this binary-split
  style. Quicksort is structural induction on the output (carefully split the
  input into lower and upper halves, "tricky"; sort the halves; cheaply
  append); mergesort on the input (cheaply split; sort the halves; carefully
  merge, "tricky").

## 34–40. Filters in Fortress

- Slide 34 — Filters in Fortress (1), a sequential filter, typeset; a blue
  callout: "So what language is this? **Fortress**."

  ```
  sequentialFilter⟦E⟧(p: E → Boolean, xs: List⟦E⟧): List⟦E⟧ = do
    result: List⟦E⟧ := ⟨ ⟩
    for a ← seq(xs) do
      if p(a) then result := result.addRight(a) end
    end
    result
  end
  ```

  "Example of use:"

  ```
  odd(x: ℤ) = ((x MOD 2) ≠ 0)
  sequentialFilter(odd, ⟨ 1, 4, 7, 2, 5, 3 ⟩)    produces    ⟨ 1, 7, 5, 3 ⟩
  ```

- Slide 35 — Filters in Fortress (2), recursive. As on the slide, the
  recursive call passes `(rest, p)`, the reverse of the declared order
  `(p, xs)`; slides 36–38 do the same:

  ```
  recursiveFilter⟦E⟧(p: E → Boolean, xs: List⟦E⟧): List⟦E⟧ =
    if xs.isEmpty() then ⟨ ⟩
    else
      (first, rest) = xs.extractLeft().get()
      rest′ = recursiveFilter(rest, p)
      if p(first) then rest′.addLeft(first) else rest′ end
    end
  ```

  "Still linear-time delay."
- Slides 36–38 — Filters in Fortress (3a), (3b), (3c), parallel by `split`:

  ```
  parallelFilter⟦E⟧(p: E → Boolean, xs: List⟦E⟧): List⟦E⟧ =
    if |xs| = 0 then ⟨ ⟩
    elif |xs| = 1 then
      (x, _) = xs.extractLeft().get()
      if p(x) then ⟨x⟩ else ⟨ ⟩ end
    else
      (x, y) = xs.split()
      parallelFilter(x, p) ∥ parallelFilter(y, p)
    end
  ```

  Slide 37 colours the same code: the first `⟨ ⟩` red, the line
  `if p(x) then ⟨x⟩ else ⟨ ⟩ end` blue, the `∥` red, picking out the identity,
  the map to singletons and the combining operator. Slide 38 adds a reduction,
  a big red `∥` over the generator `x←xs`:

  ```
  reductionFilter⟦E⟧(p: E → Boolean, xs: List⟦E⟧): List⟦E⟧ =
      ∥  (if p(x) then ⟨ x ⟩ else ⟨ ⟩ end)
    x←xs
  ```

  **[repo]** The library declares `extractLeft` as a getter,
  `getter extractLeft(): Maybe[\(E,List[\E\])\]`, and `split(): (List[\E\],
  List[\E\])` (`Library/PureList.fsi:50`, `:74`).
- Slide 39 — Filters in Fortress (4): "Actually, filters are so useful that
  they are built into the Fortress comprehension notation in the usual way:"

  ```
  comprehensionFilter⟦E⟧(p: E → Boolean, xs: List⟦E⟧): List⟦E⟧ =
    ⟨ x | x ← xs, p(x) ⟩
  ```

  Below it, typeset:

  ```
  Oh, yes:        ∑       xᵢ   and     MAX       xᵢ
             i←1:1000000           i←1:1000000

  or maybe:   ∑   a   and   MAX  a
             a←x            a←x

  or maybe just:   ∑ x   and   MAX x
  ```

- Slide 40 — **Point of order.** Filter, unlike summation, keeps the input's
  order: "(Both ∥ and + are associative, but only + is commutative.)" Do not
  confuse the result's order, "a spatial order" (blue), with the order of
  computation, "a temporal order" (green); sequential programming ties them,
  good parallel programming decouples them. "This strategy for parallelism
  relies only on associativity, not commutativity."

## 41–46. Conjugate transforms, unshuffle, mergesort

- Slide 41 — **Conjugate transforms**: "A very simple but very powerful idea."
  Instead of mapping input items directly to the output type T, map them
  (maybe by way of T) to a richer type U, compute in U, chosen to make the
  computation simpler or faster, and project the result from U back into T.
- Slide 42 — **The three-way unshuffle problem** (1): deal a deck of cards
  into three piles; from ⟨a, b, c, d, e, f, g, h, i, j, k⟩ produce
  (⟨a, d, g, j⟩, ⟨b, e, h, k⟩, ⟨c, f, i⟩). Base cases and combining, for the
  input ⟨a, b, c, d⟩, typeset:

  ```
  ⟨ ⟩ yields (⟨ ⟩, ⟨ ⟩, ⟨ ⟩)
  ⟨a⟩ yields (⟨a⟩, ⟨ ⟩, ⟨ ⟩)
  (⟨a⟩, ⟨ ⟩, ⟨ ⟩) plus (⟨b⟩, ⟨ ⟩, ⟨ ⟩) yields (⟨a⟩, ⟨b⟩, ⟨ ⟩)
  (⟨c⟩, ⟨ ⟩, ⟨ ⟩) plus (⟨d⟩, ⟨ ⟩, ⟨ ⟩) yields (⟨c⟩, ⟨d⟩, ⟨ ⟩)
  (⟨a⟩, ⟨b⟩, ⟨ ⟩) plus (⟨c⟩, ⟨d⟩, ⟨ ⟩) yields (⟨a, d⟩, ⟨b⟩, ⟨c⟩)
  ```

  "We always perform three concatenations; we just need to pair them up
  correctly. How?"
- Slide 43 — Unshuffle (2), pairing by the piles' lengths:

  ```
  unshuffle(xs: List⟦ℤ⟧): (List⟦ℤ⟧, List⟦ℤ⟧, List⟦ℤ⟧) =
    if |xs| = 0 then (⟨ ⟩, ⟨ ⟩, ⟨ ⟩)
    elif |xs| = 1 then (xs, ⟨ ⟩, ⟨ ⟩)
    else (ys, zs) = xs.split()
         ((a, b, c), (d, e, f)) = (unshuffle ys, unshuffle zs)
         if |c| = |a| then (a ∥ d, b ∥ e, c ∥ f)
         elif |b| = |a| then (a ∥ e, b ∥ f, c ∥ d)
         else (a ∥ f, b ∥ d, c ∥ e)
         end
    end
  ```

  "Unfortunately, the tests |c| = |a| and |b| = |a| are slow."
- Slide 44 — Unshuffle (3), the conjugate transform: a fourth component
  carries the count mod 3. The comments are blue:

  ```
  unshuffle′(xs: List⟦ℤ⟧): (List⟦ℤ⟧, List⟦ℤ⟧, List⟦ℤ⟧, ℤ) =
    if |xs| = 0 then (⟨ ⟩, ⟨ ⟩, ⟨ ⟩, 0)       ⊛ Solution: project inputs into
    elif |xs| = 1 then (xs, ⟨ ⟩, ⟨ ⟩, 1)      ⊛ a space of 4-tuples, not 3-tuples.
    else (ys, zs) = xs.split()
         ((a, b, c, j), (d, e, f, k)) = (unshuffle′ ys, unshuffle′ zs)
         case j of
           0 ⇒ (a ∥ d, b ∥ e, c ∥ f, (j + k) MOD 3)
           1 ⇒ (a ∥ f, b ∥ d, c ∥ e, (j + k) MOD 3)
           2 ⇒ (a ∥ e, b ∥ f, c ∥ d, (j + k) MOD 3)
         end
    end

  unshuffle(xs: List⟦ℤ⟧): (List⟦ℤ⟧, List⟦ℤ⟧, List⟦ℤ⟧) = do
    (as, bs, cs, m) = unshuffle′ xs    ⊛ Now project the result 4-tuple
    (as, bs, cs)                       ⊛ to the desired 3-tuple.
  end
  ```

- Slide 45 — Unshuffle (4): "Abstract the combining operator as ⊞ and then
  use 'big ⊞':" (the `⊞` in `unshuffle` is drawn large, its generator below
  it):

  ```
  opr ⊞( p: (List⟦ℤ⟧, List⟦ℤ⟧, List⟦ℤ⟧, ℤ), q: (List⟦ℤ⟧, List⟦ℤ⟧, List⟦ℤ⟧, ℤ) ) = do
    ((a, b, c, j), (d, e, f, k)) = (p, q)
    case j of
      0 ⇒ (a ∥ d, b ∥ e, c ∥ f, (j + k) MOD 3)
      1 ⇒ (a ∥ f, b ∥ d, c ∥ e, (j + k) MOD 3)
      2 ⇒ (a ∥ e, b ∥ f, c ∥ d, (j + k) MOD 3)
    end
  end

  unshuffle(xs: List⟦ℤ⟧): (List⟦ℤ⟧, List⟦ℤ⟧, List⟦ℤ⟧) = do
    (as, bs, cs, m) = ⊞ (⟨x⟩, ⟨ ⟩, ⟨ ⟩, 1)
                     x←xs
    (as, bs, cs)
  end
  ```

- Slide 46 — **Mergesort is a catamorphism**: "Abstract merging as operator
  MERGE and then use 'big MERGE':"

  ```
  opr MERGE(p: List⟦ℤ⟧, q: List⟦ℤ⟧) = do
    ⊛ Merge two sorted lists into a new sorted list
    . . .
  end
  ```

  "(The MERGE operator is associative and has identity ⟨ ⟩ ; thus lists under
  the MERGE operator form a *monoid*.)"

  ```
  mergesort(xs: List⟦ℤ⟧): List⟦ℤ⟧ = MERGE ⟨x⟩
                                     x←xs
  ```

## 47–55. Parallel prefix and monoid-cached trees

- Slide 47 — **The parallel prefix problem** (1): compute the running totals
  (blue) and final sum (magenta) of a sequence: from ⟨a, b, c, d, e⟩ produce
  (⟨0, a, a + b, a + b + c, a + b + c + d⟩, a + b + c + d + e); from
  ⟨1, 2, 3, 6, 3, 4, −5, 2, 9⟩ produce (⟨0, 1, 3, 6, 9, 13, 17, 12, 14⟩, 23).
  "This is not the only possible formulation, but it is convenient for our
  purposes here." "Parallel prefix is useful with any monoid; for simplicity we
  will restrict our attention to addition on integers." The running totals
  exclude each element's own value.
- Slide 48 — (2), the specification as a comprehension, with large
  parentheses, angle brackets and bar:

  ```
  ppsum(xs: List⟦ℤ⟧): (List⟦ℤ⟧, ℤ) =
    (⟨ ∑ xs[0 : k − 1] | k ← 0 : |xs| − 1 ⟩, ∑ xs)
  ```

  "Unfortunately, the total work here is quadratic in |xs| ."
- Slide 49 — (3), divide and conquer. As on the slide, the last branch yields
  the list alone, not the pair the signature declares, and `b` goes unused:

  ```
  ppsum(xs: List⟦ℤ⟧): (List⟦ℤ⟧, ℤ) =
    if |xs| = 0 then (⟨ ⟩, 0)
    elif |xs| = 1 then (⟨0⟩, xs₀)
    else (ys, zs) = xs.split()
         ((ps, a), (qs, b)) = (ppsum ys, ppsum zs)
         ps ∥ ⟨ a + q | q ← qs ⟩
    end
  ```

  "Now the total work is linear in |xs| . Unfortunately, the dependency on a
  results in delay Ω((log n)²)."
- Slide 50 — (4), one pass threading the running total:

  ```
  ppsum(xs: List⟦ℤ⟧): (List⟦ℤ⟧, ℤ) = ppsum′(0, xs)

  ppsum′(k: ℤ, xs: List⟦ℤ⟧): (List⟦ℤ⟧, ℤ) =
    if |xs| = 0 then (⟨ ⟩, k)
    elif |xs| = 1 then (⟨k⟩, k + xs₀)
    else (ys, zs) = xs.split()
         (ps, a) = ppsum′(k, ys)
         (qs, b) = ppsum′(a, zs)
         (ps ∥ qs, b)
    end
  ```

  "One pass, and again the total work is linear in |xs| . Unfortunately, the
  dependency on a results in delay Ω(n)."
- Slide 51 — (5): "A solution in NESL from Guy Blelloch's 2009 PPoPP talk:"

  ```
  function scan(A, op) =
  if (#A <= 1) then [0]
  else let
    sums = {op(A[2*i], A[2*i+1]) : i in [0:#A/2]};
    evens = scan(sums, op);
    odds = {op(evens[i], A[2*i]) : i in [0:#A/2]};
  in interleave(evens,odds);
  ```

  "See slide 11 of http://www.cs.cmu.edu/~blelloch/papers/PPoPP09.pdf". "Using
  tree representation: total work Θ(n), delay Ω((log n)²) / Can we do better?"
- Slide 52 — **Monoid-cached trees**, drawn: an Empty node caching 0, a Leaf
  holding 18 and caching 23, a Node caching 47; then ⟨23, 47, 18, 11⟩ as a
  "tree with cached sums" (leaves caching their own values, nodes 70 and 29,
  root 99) and as a "tree with cached lengths" (leaves 1, nodes 2 and 2, root
  4). "See Hinze, Ralf, and Paterson, Ross. 'Finger Trees: A Simple
  General-purpose Data Structure.' Journal of Functional Programming 16 (2):
  2006, 197–217."
- Slide 53 — **Declaring monoid-cached trees in Fortress**, each `val: V` red:

  ```
  trait ValueTree⟦T, V⟧ comprises { Empty⟦T, V⟧, Leaf⟦T, V⟧, Node⟦T, V⟧ }
    val: V
  end

  object Empty⟦T, V⟧(val: V) extends ValueTree⟦T, V⟧ end

  object Leaf⟦T, V⟧(item: T, val: V) extends ValueTree⟦T, V⟧ end

  object Node⟦T, V⟧(left: ValueTree⟦T, V⟧, val: V, right: ValueTree⟦T, V⟧)
        extends ValueTree⟦T, V⟧
  end
  ```

- Slide 54 — The parallel prefix problem (6), over a sum-cached tree; beside
  it, "Total work Θ(n) / Delay Ω(log n)":

  ```
  ppsum(xs: List⟦ℤ⟧): (List⟦ℤ⟧, ℤ) = do
    c = sumcache xs
    (ppfinish(0, c), c.val)
  end

  sumcache(xs: List⟦ℤ⟧): ValueTree⟦ℤ, ℤ⟧ =
    if |xs| = 0 then Empty⟦ℤ, ℤ⟧(0)
    elif |xs| = 1 then Leaf⟦ℤ, ℤ⟧(xs₀, xs₀)
    else (ys, zs) = xs.split()
         (p, q) = (sumcache ys, sumcache zs)
         Node⟦ℤ, ℤ⟧(p, p.val + q.val, q)
    end

  ppfinish(k: ℤ, _: Empty⟦ℤ, ℤ⟧) = ⟨ ⟩
  ppfinish(k: ℤ, _: Leaf⟦ℤ, ℤ⟧) = ⟨k⟩
  ppfinish(k: ℤ, n: Node⟦ℤ, ℤ⟧) = ppfinish(k, n.left) ∥ ppfinish(k + n.left.val, n.right)
  ```

  In small type at the foot: "It would be nice to have a simple facility to
  cache any monoid in a tree. It's straightforward to cache more than one
  monoid, because the cross-product of two monoids is a monoid. Deforestation
  of monoid-cached trees may turn out to be an important optimization."
- Slide 55 — **MapScanZip** (cf. MapReduce), in typewriter:

  ```
  MapScanZip op id f xs =
        zip xs (scan op id (map f xs))
  ```

  "where scan is the parallel prefix operation, parameterized by an
  associative operation op and its identity id. Monoid-cached trees provide a
  fast implementation. Note that zip is difficult in the general case because
  the shapes of the trees might not match, but this case is easy."

## 56–65. Splitting a string into words

- Slide 56 — The problem: given a string, the list of its words, separated by
  spaces; words nonempty, possibly several spaces between them, spaces
  possibly at either end.
- Slide 57 — Tests and expected output (the strings in typewriter; the second
  test has two spaces at each end and between each pair of words, the fourth
  two spaces):

  ```
  println words(“This is a sample”)
  println words(“  Here  is  another  sample  ”)
  println words(“JustOneWord”)
  println words(“  ”)
  println words(“”)
  ```

  ```
  ⟨ This, is, a, sample ⟩
  ⟨ Here, is, another, sample ⟩
  ⟨ JustOneWord ⟩
  ⟨ ⟩
  ⟨ ⟩
  ```

- Slide 58 — Splitting a string into words (3), the sequential loop:

  ```
  words(s: String) = do
    result: List⟦String⟧ := ⟨ ⟩
    word: String := “”
    for c ← seq(s) do
      if (c = ‘ ’) then
        if (word ≠ “”) then result := result ∥ ⟨ word ⟩ end
        word := “”
      else
        word := word ∥ c
      end
    end
    if (word ≠ “”) then result := result ∥ ⟨ word ⟩ end
    result
  end
  ```

- Slides 59–60 — (4a) and (4b), pictures. Slide 59 cuts "Here is a
  sesquipedalian string of words" in four at three bars and maps each piece to
  a partial state:

  ```
  Here is a |sesquipeda|lian strin|g of words

  Segment(“Here”, ⟨“is”, “a”⟩, “”)
  Chunk(“sesquipeda”)
  Segment(“lian”, ⟨ ⟩, “strin”)
  Segment(“g”, ⟨“of”⟩, “words”)
  ```

  Slide 60 maps single characters: a letter to `Chunk(“q”)`, a space to
  `Segment(“”, ⟨⟩, “”)`.
- Slide 61 — (5):

  ```
  maybeWord(s: String): List⟦String⟧ =
    if s = “” then ⟨ ⟩ else ⟨ s ⟩ end

  trait WordState
        extends { Associative⟦WordState, ⊕⟧ }
        comprises { Chunk, Segment }
    opr ⊕(self, other: WordState): WordState
  end
  ```

- Slide 62 — (6):

  ```
  object Chunk(s: String) extends WordState
    opr ⊕(self, other: Chunk): WordState =
      Chunk(s ∥ other.s)
    opr ⊕(self, other: Segment): WordState =
      Segment(s ∥ other.l, other.A, other.r)
  end
  ```

- Slide 63 — (7):

  ```
  object Segment(l: String, A: List⟦String⟧, r: String)
      extends WordState
    opr ⊕(self, other: Chunk): WordState =
      Segment(l, A, r ∥ other.s)
    opr ⊕(self, other: Segment): WordState =
      Segment(l, A ∥ maybeWord(r ∥ other.l) ∥ other.A, other.r)
  end
  ```

- Slide 64 — (8), the parallel `words`, its `⨁` drawn large over `c←s`:

  ```
  processChar(c: Character): WordState =
    if (c = ‘ ’) then Segment(“”, ⟨ ⟩, “”) else Chunk(c) end

  words(s: String) = do
    g = ⨁ processChar(c)     ⊛ All the parallelism happens here
       c←s
    typecase g of
      Chunk ⇒ maybeWord(g.s)
      Segment ⇒ maybeWord(g.l) ∥ g.A ∥ maybeWord(g.r)
    end
  end
  ```

- Slide 65 — (9), "The mechanics of BIG OPLUS": the big operator takes the
  generator as a function of a reduction and a body:

  ```
  (* The mechanics of BIG OPLUS *)
  opr BIG ⊕⟦T⟧(g: (Reduction⟦WordState⟧,
                   T → WordState)
                → WordState): WordState =
    g(GlomReduction, identity⟦WordState⟧)

  object GlomReduction extends Reduction⟦WordState⟧
    getter toString() = “GlomReduction”
    empty(): WordState = Chunk(“”)      ⊛ Identity value
    join(a: WordState, b: WordState): WordState = a ⊕ b
  end
  ```

  **[repo]** `ProjectFortress/demos/Words.fss` (unchanged since `5a68404fd`,
  2012-07-19, one of this history's root commits) is this program in ASCII,
  in the later library's terms: `OPLUS` for `⊕`;
  `trait WordState comprises { Chunk, Segment }` with no `Associative` parent;
  a catch-all `OPLUS(self, other: WordState)` in each object;
  `processChar(c: String)`; `GlomReduction extends {
  MonoidReduction[\WordState\], ReductionWithZeroes[\WordState,WordState\] }`
  with `getter asString()`; `BIG OPLUS` through `BigReduction` and
  `__bigOperatorSugar`; and `words` as `BIG OPLUS[k<-0#s.size]
  processChar(s[k#1])`. Its `run` prints slide 57's five tests, in another
  order. It was not run for this extract. The trait `Associative` exists only in
  `Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE:131`.

## 66–68. Two big ideas, and the word loop again

- Slide 66 — **To summarize: a big idea.** Summations, list constructors and
  loops are alike:

  ```
       ∑        xᵢ²
  i←1:1000000
  ⟨ xᵢ² | i ← 1 : 1000000 ⟩
  for i ← 1 : 1000000 do xᵢ := xᵢ² end
  ```

  Generate an abstract collection, compute a function of each item (the
  *body*), combine the results or just synchronize: "generate-and-reduce".
  Whether to be sequential or parallel is a separable question: "That's why
  they are especially good abstractions!"; make the decision on the fly, to use
  available resources.
- Slide 67 — **Another big idea**: formulate a sequential loop, or a
  finite-state machine, as successive applications of state transformation
  functions fᵢ; find an *efficient* way to compute and represent their
  compositions ("this step requires ingenuity", red). Instead of computing

  ```
  s := s₀; for i ← seq(1 : 1000000) do s := fᵢ(s) end ,
  ```

  compute

  ```
  s := (     ◦      fᵢ) s₀
        i←1:1000000
  ```

  Function composition is associative, so the latter has a parallel strategy;
  for intermediate results, use parallel prefix function composition, then map
  down the result applying each to s₀. "See, for example, Hillis, W. D., and
  Steele, G. L. 'Data parallel algorithms.' Comm. ACM 29, 12 (Dec. 1986),
  1170–1183."
- Slide 68 — Splitting a string into words (3, again): slide 58's loop, here
  indexing the string:

  ```
  words(s: String) = do
    result: List⟦String⟧ := ⟨ ⟩
    word: String := “”
    for k ← seq(0#length(s)) do
      char = substring(s, k, k + 1)
      if (char = “ ”) then
        if (word ≠ “”) then result := result ∥ ⟨ word ⟩ end
        word := “”
      else
        word := word ∥ char
      end
    end
    if (word ≠ “”) then result := result ∥ ⟨ word ⟩ end
    result
  end
  ```

## 69–75 and the closing slide. Conclusions

- Slide 69 — **Automatic construction of parallel code**: from two
  sequential versions of a list homomorphism, one left-to-right and one
  right-to-left, a parallel version can be constructed automatically (Morita,
  Morihata, Matsuzaki, Hu and Takeichi, "Automatic inversion generates
  divide-and-conquer parallel programs", PLDI 2007, 146–155): "Just derive a
  weak right inverse function and then apply the Third Homomorphism Theorem.
  See—it's easy!" The analogue for trees: Morihata, Matsuzaki, Hu and Takeichi,
  "The third homomorphism theorem on trees: Downward and upward lead to
  divide-and-conquer", POPL 2009, 177–185. Full disclosure: the authors'
  University of Tokyo group had a collaborative research agreement with the
  Programming Language Research group at Sun Labs.
- Slide 70 — **We need a new mindset for multicores**: "DO loops are so 1950s!
  (Literally: Fortran is now 50 years old.)"; so are linear linked lists
  (Lisp); "Java™-style iterators are so last millennium!"; "Even arrays are
  suspect! Ultimately, it's all trees."; "As soon as you say 'first, SUM = 0'
  you are hosed. Accumulators are BAD for parallelism. Note that foldl and
  foldr, though functional, are fundamentally accumulative." (the title's
  charge); "If you say, 'process subproblems in order,' you lose."; the great
  tricks and second-nature idioms of the sequential past "DON'T WORK".
- Slide 71 — **The parallel future**: top-down, do not split a problem into
  "the first" and "the rest" but into roughly equal pieces, solve them
  recursively and combine; bottom-up, do not create a null solution and update
  it, but map inputs independently to singleton solutions and merge them
  treewise; combining subsolutions "is usually trickier than incremental
  update of a single solution".
- Slide 72 — **MapReduce is a big deal!** Associative combining operators are
  "a VERY BIG DEAL!"; Google MapReduce also requires commutativity, "There are
  ways around that."; inventing new combining operators is "a very, very big
  deal": creative catamorphisms, languages that encourage them, and
  "assistance in proving them associative".
- Slide 73 — **The fully engineered story**: optimized singleton lists;
  branching factors above 2 (Rich Hickey's Clojure, "a JVM™-based Lisp that
  represents lists as 64-ary trees"); self-balancing trees (2-3, red-black,
  finger trees); sequential techniques near the leaves; arrays at the leaves,
  and integer ranges, processed sequentially or by parallel recursive
  subdivision as decided dynamically. Foot: "Linear lists must be processed
  sequentially. A tree can be processed breadth-first (parallel) or
  depth-first (sequential), or both. Therefore we should use both parallel and
  sequential strategies, and perhaps derive one from the other."
- Slide 74 — **Conclusion**: programs organized by linear decomposition can be
  hard to parallelize; those organized by parallel decomposition run either
  way, as resources allow; the strategy's costs "will be reduced over time but
  will not disappear"; "In a world of parallel computers of wildly varying
  sizes, this is our only hope for program portability in the future."; better
  language design can encourage better parallel programming.
- Slide 75 — "Get rid of cons!" (red).
- Closing slide — guy.steele@sun.com, http://research.sun.com/projects/plrg,
  http://projectfortress.sun.com, over a group photograph of the team in
  matching shirts.

## What this deck gives the histogram-water demo

The JuliaCon extract's section "Code for a histogram-water demo"
(`SteeleJuliaCon2016-extract.md`) lists what its slides 9 and 18–19 leave
undefined. This deck has no histogram-water slide. It has the machinery that
the later code stands on: conc lists split in two (slides 14–21, 24–27,
31–32), user-defined associative operators and big operators (45–46, 61–65),
conjugate transforms (41, 44), parallel prefix (47–51, 54), monoid-cached trees
(52–54) and MapScanZip (55). Item by item:

1. **The two arrowed running-`MAX` operators** (JuliaCon slide 9). Not
   defined. The deck's parallel prefix is the same operation over another
   monoid: slide 47 says it "is useful with any monoid" and restricts itself
   to `+` on ℤ; slide 54's `ppsum`, over a sum-cached tree, has total work Θ(n)
   and delay Ω(log n); slide 55's MapScanZip names a `scan` "parameterized by
   an associative operation op and its identity id". Slide 54's `ppfinish` is
   the left-to-right half of JuliaCon slide 18's `walk`: its
   `ppfinish(k + n.left.val, n.right)` is the walk's
   `walk(x.b, left MAX x.a.val, right)` with `+` for `MAX`. Still missing: a
   `MAX` instance of the scan; any right-to-left (suffix) scan, which the deck
   never shows; the two operators' names and ASCII spellings; and the inclusive
   form slide 9 needs. The deck's prefix is exclusive (slide 47:
   `⟨0, a, a + b, …⟩`, no element counted in its own total), while slide 9's
   `(left MIN right) − v` goes negative at a bar higher than both its maxima
   unless they include `v`; slide 18's walk works with exclusive maxima, through
   its `MAX x.val`.
2. **A three-way `zip`** (JuliaCon slide 9). Not defined. The deck's only
   `zip` is MapScanZip's two-list `zip xs (scan …)` (slide 55), in Haskell-like
   notation, not Fortress; it says zip "is difficult in the general case
   because the shapes of the trees might not match, but this case is easy",
   this case being a list zipped with its own scan, built on the same tree.
   Slide 9 zips `x` with two scans of it, the same easy case. Still missing: a
   Fortress `zip` of three lists that serves as a generator of triples under
   `∑`. Every generator in the deck draws from one list or one range (`x←xs`,
   slides 38 and 45–46; `c←s`, 64; `i←1:1000000`, 39 and 66).
3. **`maxCachedTree`** (JuliaCon slides 18–19). Not defined; its sum twin is.
   Slide 54's `sumcache(xs: List⟦ℤ⟧): ValueTree⟦ℤ, ℤ⟧` splits the list
   (`xs.split()`, the conc-list `split` of slides 20–21), makes a `Leaf` of a
   one-element list and a `Node` caching `p.val + q.val`; `maxCachedTree` is
   the same with `MAX` for `+`. Slide 54's foot wishes for "a simple facility
   to cache any monoid in a tree", which the deck does not give. Still missing:
   the `MAX` version, its empty case (item 6), and the generic facility.
4. **`Pair` and `Leaf`.** Defined under other names (slide 53):
   `Node⟦T, V⟧(left: ValueTree⟦T, V⟧, val: V, right: ValueTree⟦T, V⟧)` is
   `Pair` with `left` and `right` for `a` and `b`, and
   `Leaf⟦T, V⟧(item: T, val: V)` keeps the element as `item` and its cached
   value as `val` (`sumcache` stores `xs₀` in both). Still missing: only the
   match of names; JuliaCon's `walk` reads `x.a`, `x.b`, `x.val`, so it would
   read `left`, `right` and `val` of a `ValueTree⟦ℤ, ℤ⟧`.
5. **A trait over both.** Defined (slide 53):
   `trait ValueTree⟦T, V⟧ comprises { Empty⟦T, V⟧, Leaf⟦T, V⟧, Node⟦T, V⟧ }`,
   with the abstract field `val: V`, the shape of the 2015 talk's
   `trait CachedTree comprises {NullNode, SingletonNode, PairNode}`
   (`SteeleGoogleTechTalk2015-extract.md`, lines 140–141). It
   comprises three objects, so `walk`'s two overloads no longer cover it:
   see item 6.
6. **The empty case.** The deck has the empty tree, `Empty⟦T, V⟧(val: V)`
   (slide 53), which `sumcache` builds for `|xs| = 0` holding `0`, the identity
   of `+`, and which `ppfinish` meets with its own overload, `= ⟨ ⟩` (slide
   54). Still missing: a `walk` overload for `Empty`, and an identity of `MAX`
   on ℤ to store in it; ℤ has no least element, and the 2015 talk's
   `NullNode` holds −∞ (`SteeleGoogleTechTalk2015-extract.md`, lines
   141–142). **[repo]** The library meets the same gap by lifting to `Maybe`:
   "The usual lifting to Maybe for identity-less operators",
   `trait AssociativeReduction[\R\] extends ActualReduction[\R,Maybe[\R\]\]`
   with `empty(): Nothing[\R\]` (`Library/FortressLibrary.fsi:1914–1917`), on
   which `MaxReduction` and `BIG MAX` stand (`:1997–2003`).

Around the six items, the deck shows how a program declares its own monoid, the
route by which slide 9's `∑` over a zip, or a running `MAX` as a reduction,
would be built: a combining operator declared with `opr` and used as a big
operator over a generator (`⊞`, slide 45; `MERGE`, slide 46), and an
associative `⊕` on a type that comprises its states (`WordState`, slide 61)
with a `Reduction` of `empty()` and `join` behind its big operator (slide 65).
**[repo]** That route as the library has it: `trait Reduction[\L\]` with
`empty()` and `join(a, b)` (`Library/FortressLibrary.fsi:1867–1871`),
`MonoidReduction` (`:1930`), and `ProjectFortress/demos/Words.fss` for a whole
user-defined `BIG OPLUS` (slide 65's note above). The library's
operator-parameterized `trait Monoid[\ T, opr OPLUS \]` sits inside a comment
(`Library/FortressLibrary.fss:3188–3196`, unchanged since `5a68404fd`, a root
commit of this history). The 2015 talk's Solution 2, the bitonic glob, is a
conjugate transform in slide 41's sense (map each bar to a glob, combine,
project out the water: `SteeleGoogleTechTalk2015-extract.md`, lines 123–124),
built as slides 44–45 build `unshuffle′` and its `⊞`; the deck gives no glob.
