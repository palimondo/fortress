# The oracle: GNU APL 2.0

GNU APL is not in the Ubuntu 24.04 apt archive, so it was built from source in the container on 2026-09-11. It built clean on the first attempt, in about six minutes of wall time.

## What was fetched and installed

`https://ftp.gnu.org/gnu/apl/` lists exactly one release tarball at the top level, `apl-2.0.tar.gz` (2026-06-24, 4.9M); the `apl-1.x/` entries are directories of older point releases and the rest are rpm, deb and Windows installers. The 2.0 tarball is what was used.

Build prerequisites: `apt-get update` was needed first (the container's package index was stale enough that the initial install failed with 404s on `libncursesw6` and `libtinfo6`). `apt-get install -y build-essential libreadline-dev libncurses-dev` then installed `libncurses-dev` and its runtime dependencies `ncurses-bin ncurses-base libtinfo6 libncurses6 libncursesw6` (plus `ca-certificates-java`, pulled in by the upgrade); `build-essential` 12.10ubuntu1 and `libreadline-dev` 8.2-4build1 were already present and unchanged.

Build, with the unpacked tarball as the working directory:

```
./configure --prefix=/usr/local && make -j4 && make install
```

All three steps exited 0. Nothing was installed under `/home/user/fortress`; the binary is `/usr/local/bin/apl`, 46 MB, and `configure` found ncurses and SQLite3 but no libapl and no Python bindings, none of which matter here.

Version, from `apl --version`:

```
    Project:        GNU APL
    Version / SVN:  2.0 / SVN: no-svnversion
    Build Date:     2026-09-11 08:23:27 UTC
```

## Running a script non-interactively

```
/usr/local/bin/apl --script --OFF --to_COUT -f script.apl
```

`--script` is the shorthand for `--silent --noCIN --noCONT --noColor`: it suppresses the welcome banner, stops the input from being echoed, and skips loading a CONTINUE workspace. `--OFF` makes the interpreter exit after the last line of the input file instead of dropping into the REPL — without it, reading from a pipe ends in four `^D or end-of-input detected` complaints and exit code 2. `--to_COUT` redirects CERR into COUT so that error reports land in stdout in the same order as the results, which is what makes a scripted run comparable line by line. `-f script.apl` reads the program from a file; stdin works too, but then the script must end with `)OFF`.

Results are echoed by default: the value of every line that is not an assignment is printed, exactly as in the REPL. An assignment prints nothing, so where the book writes `⎕ ← x ← …` the oracle prints the value too, and where a value must be forced out of an assignment `⎕←` does it. An error does not stop the run: GNU APL prints the error name, the offending line and a caret, then carries on with the next line, which is why a chapter's examples can be run in one session even when some of them fail.

## Index origin

GNU APL's default `⎕IO` is 1. The book sets `⎕IO ← 0` in the first example of every one of these six chapters, those lines are part of the scripts, and nothing resets them, so every oracle result recorded in the goldens is at index origin 0, matching the book. Three of chapter 5's dfns set `⎕IO←0` again locally; that changes nothing here, the session already being at origin 0.

## Display, and the three translations

GNU APL has none of Dyalog's display user commands. `]box`, `]DISPLAY` and `]rows` are all `BAD COMMAND`. What it has instead is `]BOXING [OFF|2-4|7-9|i20-25|29]`, a global setting. Three translations were therefore applied to the book's input before running it, and each is flagged as an `Oracle translation:` line on the affected example in the goldens:

- `]box on [-style=…]` becomes `]BOXING n`. Chapters 1 and 2, which the book runs under `]box on` in its minimum style, ran at `]BOXING 7`: nested values are framed, simple arrays print bare, which is what the book shows. Chapter 3, which the book runs under `]box on -style=max`, ran at `]BOXING 8`, the level that frames everything and marks rank and type on the frame. Chapter 1's Ex 8 and Ex 10, where the book switches style mid-chapter, switch between 8 and 7 accordingly. Chapters 4, 5 and 6 run `]box on` in its minimum style too, so they ran at `]BOXING 7`, switching to 8 only around the `]display`/`]DISPLAY` lines in chapter 5's Ex 26 and chapter 6's Ex 7 and Ex 17. Unlike Dyalog's `]box`, `]BOXING` prints no "Was ON …" confirmation, so those two examples have no oracle output at all.
- `]DISPLAY expr` becomes `expr` evaluated under `]BOXING 8`, the nearest equivalent of the frame `]DISPLAY` draws. Where the argument is an assignment, the assignment is followed by the bare variable name, because `⎕←` bypasses the boxing setting and would print the value unframed.
- `]rows on` becomes `⎕PW←10000`, which stops GNU APL wrapping long result lines.

Two further user commands appear in the later chapters and have no translation at all: `]dinput` (chapters 4 and 5) and `]runtime` (chapter 6) are both `BAD COMMAND`. `]dinput`'s multi-line dfns are rewritten as one-line lambdas, as the chapter 4 section describes; `]runtime`, like `cmpx`, has no stand-in, and the benchmark examples are recorded for completeness only.

Even at the closest boxing level the frames are not the same characters. GNU APL draws the type marker in a frame's bottom-left corner as `∼` (U+223C TILDE OPERATOR) where Dyalog uses `~`, and marks enclosure as `ϵ` (U+03F5 GREEK LUNATE EPSILON) where Dyalog uses `∊`. Every framed output therefore differs from the book's by at least those two characters, which is why the display-only disagreements below are so numerous.

## How many book outputs the oracle disagreed with

Counted per example: an example disagrees if the oracle's printed text differs from the book's after blank lines and trailing spaces are normalised away. 156 of the 214 examples disagree.

| chapter | examples | disagree | display only | different values | GNU APL errors |
|---|---|---|---|---|---|
| 1, arrays | 28 | 20 | 9 | 11 | 0 |
| 2, indexing | 40 | 28 | 9 | 6 | 13 |
| 3, glyphiary | 59 | 52 | 29 | 13 | 10 |
| 4, functions | 29 | 21 | 0 | 4 | 17 |
| 5, iteration | 40 | 30 | 4 | 3 | 23 |
| 6, products | 18 | 5 | 1 | 2 | 2 |
| total | 214 | 156 | 52 | 39 | 65 |

"Display only" means the values agree once the frames are stripped: 52 of the 156 disagreements are the `∼`/`ϵ` frame glyphs and the `]BOXING`-versus-`]box` framing, nothing more. The other 104 are real. Chapter 4 contributes none of the display-only kind and chapter 5 only four: those two chapters print few arrays, and much of what they do print, GNU APL refuses outright. Chapter 6 is the opposite extreme — 13 of its 18 examples agree exactly, the highest rate of any chapter, because it is the one chapter built almost entirely on APL2 operators that GNU APL has.

## The families of real disagreement

These are the recurring causes, each one a fact about what a GNU APL oracle can and cannot adjudicate for the Fortress rungs:

- GNU APL is an APL2. Monadic `↑` is First and monadic `⊃` is Disclose, the opposite assignment of roles from Dyalog, where `↑` is Mix and `⊃` is First. Dyalog's Mix is GNU APL's `⊃`; Dyalog's First has no single-glyph equivalent. This alone accounts for chapter 1's Ex 3 to 6 and Ex 14 to 17 (where `m` is bound to the wrong thing and three later examples inherit it), chapter 2's Ex 35, and chapter 3's Ex 9, 13, 37 and 59.
- Monadic `↓` does not exist: Drop is dyadic only, so Split is a `VALENCE ERROR` and the `↓⍉↑` Remix idiom cannot be run at all (chapter 3, Ex 10 to 12).
- Dyadic `↑` and `↓` want one count per axis of the right argument, so `1↑mat` on a matrix is a `LENGTH ERROR` rather than a major-cell take (chapter 3, Ex 18).
- `⌷` wants one index per axis: a scalar or enclosed left argument against a rank-2 array is a `RANK ERROR`, so Squad's major-cell selection is unavailable (chapter 2, Ex 12, 14, 16, 21).
- Bracket indexing has no enclosed-index and no reach form: `m[⊂1 1]`, `m[(0 0)(1 1)(2 2)]` and `G[((0 0)0)((1 2)1)]` are all `RANK ERROR`s (chapter 2, Ex 7, 8, 18, 19, 36).
- No function trains and no tacit assignment of a derived function: `(⍸⍷)` and `tally ← +/=⍨` are `SYNTAX ERROR`s, and so is the Sane-indexing operator `⌷⍨∘⊃⍨⍤0 99`, which takes three further examples down with it as `VALUE ERROR`s (chapter 2, Ex 22, 24 to 26; chapter 3, Ex 42, 47, 48). The Rank operator `⍤` and the bracket axis do work.
- `⍨` with an array operand (Constant) is not available: `1⍨2` is a `SYNTAX ERROR` (chapter 3, Ex 49, 50). Commute with a function operand works.
- An unnamed dfn cannot be echoed as a value: `{⍵⊂⍨1,2≠/⍵}` on its own line is a `VALENCE ERROR` (chapter 3, Ex 44).
- Depth of a non-uniformly nested array is 2, not Dyalog's `¯2`: GNU APL has no negative depth (chapter 3, Ex 4).
- Union deduplicates its left argument, where Dyalog keeps its duplicates: `1 1 2 3 4 ∪ 1 2 5 6` is `1 2 3 4 5 6` here and `1 1 2 3 4 5 6` in the book (chapter 3, Ex 53). Intersection and Without agree.
- `⍕` of a mixed nested matrix flattens onto one line instead of aligning columns (chapter 3, Ex 35).
- Dyadic `?` (Deal) is random, so every example built on `12?12` or `9?9` differs by construction and carries no information: chapter 2's Ex 29, 31, 32, 37 and chapter 3's Ex 2, 6, 7, 8, 10, 18, 50. Pinning `⎕RL` would make these reproducible but still would not match Dyalog's generator.

## Chapter 4: dfns and dops

Chapter 4 is about direct functions, so almost all of it lands on the one part of GNU APL that is furthest from Dyalog. GNU APL has *lambdas*, `{…}`, and they are much less than a dfn. What works: `⍺` and `⍵`; several statements separated by `⋄`; local names; nesting one lambda inside another; applying a lambda by name. What does not, each verified on its own:

- **Multi-line definition.** `]dinput` is `BAD COMMAND`, and a `{` left open at end of line is `Unbalanced left curly bracket`. Every multi-line dfn in the chapter was therefore translated into a one-line lambda with `⋄` separators and the trailing `⍝` comments dropped — a comment inside a one-liner would swallow the rest of the definition. This is flagged as an `Oracle translation:` line on each affected example.
- **Guards.** A `:` inside a lambda is `Illegal : in immediate execution`, and it stays a `SYNTAX ERROR` when the same lambda is written inside a `∇`-defined function, so this is not a scripting restriction but the absence of the feature. Guards take down Ex 2, 9, 11, 14 and 15, and with them the named functions those examples define, so Ex 10 and Ex 12 fail as `VALUE ERROR`s.
- **Recursion.** `∇` as a self-reference in a lambda is a `SYNTAX ERROR` on its own (`dummy ← {∇⍵}` fails with no guard in sight). Since the chapter's recursive `sum` also uses a guard, both halves of it are unavailable.
- **Direct operators.** `⍺⍺` is parsed as `⍺ ⍺`: the definition of `foldl` is accepted, and every application of it is a `VALENCE ERROR`. `⍵⍵` and `∇∇` do not arise in this chapter but there is no dop mechanism for them either.
- **Modified assignment.** `a +← 45` and `a ⊢← ¯99` are `SYNTAX ERROR`s inside a lambda (`λ1[1]  λ←a+←45`), so the chapter's whole "how do I change an outer name" sequence, Ex 19 to Ex 24, is unavailable.
- **Rebinding a lambda name.** A name that already holds a lambda cannot be assigned another one: `foo ← {…}` twice is `SYNTAX ERROR` at `foo←λ1`, and the first definition stays in force. The chapter defines `foo` seven times (Ex 14 to Ex 23); the first one GNU APL accepts is Ex 16, and from there on the oracle is running that body — which is why Ex 18, 20, 22 and 24 all print `¯99 42`.
- **Default left argument.** `⍺ ← ¯99` is an ordinary assignment here, not "give `⍺` this value only if called monadically". It overwrites a left argument that *was* supplied (Ex 7 prints 0 where the book prints 156) and a second `⍺ ←` wins over the first (Ex 8 prints `¯999900` where the book prints 0). This is the one place in the chapter where GNU APL runs the code and quietly computes something else.
- **Name scoping.** Not visible in the run, because `foo` could not be rebound, but a side probe on a fresh name shows `{a ← 45 ⋄ _ ← {a←¯99}⍬ ⋄ a}` returning `¯99`, not the book's 45: an inner lambda assigns to the outer `a`. GNU APL scopes lambda names dynamically where Dyalog's dfns are lexical, which is the very point Ex 17 is making.

Two disagreements are old news rather than new: `]box on`/`]rows on` print nothing (`]BOXING 7` and `⎕PW←10000` stand in), and tacit assignment of a derived function, `sumred ← +/`, is a `SYNTAX ERROR`, exactly as `tally ← +/=⍨` was in chapter 3. What did run unchanged: plain one-line dfns with `⍺` and `⍵` (Ex 4, 6, 13), the notebook's `⍬`, and the windowed reduction `2 (+/) ⍳10`.

The net of it: GNU APL can adjudicate APL2 array semantics, but it cannot adjudicate dfns. For anything in this chapter beyond `{⍺+⍵}`, the book is the only authority available here.

## Chapter 5: the iteration operators

Chapter 5 is the sharpest split so far: the operators it teaches are all present in GNU APL and all agree with Dyalog, while the dfns it wraps them in are all unavailable. Twenty-one of its twenty-three errors are the chapter 4 dfn limits repeating.

What works, each verified against the book:

- **Each, `¨`.** `×⍨¨1+⍳9` and `≢¨V` both agree exactly, on a nested argument too. Each with a lambda operand also works (`{⍵×⍵}¨1 2 3`).
- **Reduce first `⌿` and Scan first `⍀`.** Both agree with the book, including the right-to-left fold order `-⌿1 2 3 4 5 6 7 8 9` → 5 that the chapter makes a point of, and the running sums of `+⍀`.
- **N-wise reduction.** The dyadic call of a derived reduction, `2+⌿1 2 3 4 5 6 7 8 9`, agrees. Chapter 4 had already shown `2 (+/) ⍳10` working.
- **Bracket axis.** `+⌿[1]m` picks the second axis at origin 0, as in Dyalog.
- **Power, `⍣`.** `2÷⍨⍣=10` agrees (0), and side probes show lambda operands are fine on both sides: `{⍵+1}⍣3 ⊢ 0` is 3 and `{⍵+1}⍣{⍺=5} 0` is 5. The chapter's Ex 16 fails for an unrelated reason, below.

What does not:

- **A lambda that mentions neither `⍺` nor `⍵` is niladic.** `{⍞ ← ?10}` is a *value* in GNU APL, not a function: `{⍞ ← ?10} 0` prints the roll and then evaluates to the two-element vector `6 0`. It therefore cannot be an operand of `⍣`, and Ex 16 ends in `SYNTAX ERROR` at `λ1⍣λ2` after evaluating the left side once. This is a new limit, distinct from every chapter 4 one.
- **The chapter 4 dfn limits, wholesale.** Guards, `∇` self-reference, `]dinput`, the dops `⍺⍺`/`⍵⍵` and modified assignment (`j⊢←`) take down every one of this chapter's seven `]dinput` definitions — `Sum`, `Sscan`, `Fib`, `Quicksort`, `bsearch`, `prefix1`, `prefix2` — and with them the eight examples that apply them. `Quicksort` would also need a fork train, which GNU APL does not have.
- **`⎕NGET` and `⎕CY`.** Neither system function exists (`VALUE ERROR`), so the data file the benchmarks read and Dyalog's `cmpx` utility are both out of reach, and the five `cmpx` examples are `VALUE ERROR`s. These examples carry no reproducible value in any interpreter: they are one machine's timings.
- **Compose binding an array to a function.** `find←randInts∘⍳` is a `SYNTAX ERROR`, the same tacit limit chapters 2, 3 and 4 already hit.

One display fact worth recording, since chapter 5 leans on it: `⎕←` bypasses `]BOXING`, so the book's framed nested vectors in Ex 4 and Ex 38 print bare in the oracle even though the values agree. `-nesty` in Ex 39, printed without `⎕←`, does get frames — GNU APL frames only the nested parts at `]BOXING 7` where Dyalog's `]box on` frames every element, so the shapes of the two pictures differ while the numbers do not. Scalar pervasion itself, monadic and dyadic, agrees.

## Chapter 6: the products

Chapter 6 is the chapter GNU APL handles best: 13 of its 18 examples agree exactly. Outer and inner product are APL2's oldest operators and they behave as the book says.

- **Outer product, `∘.f`.** `∘.×⍨⍳10` and `∘.<⍨⍳10` agree to the character, and `x∘.|x` drives the prime sieve in Ex 6 to the same answer. Lambda operands work too: `1 2 3 ∘.{⍺+⍵} 4 5` is the expected 3×2 matrix.
- **Inner product, `f.g`.** Matrix multiplication `A +.× B` agrees, `'GATTACA' +.= 'TATTCAG'` is 3, and the Rosalind offspring calculation gives the book's 153703. A lambda as an operand is accepted here as well: `1 2 {⍺+⍵}.× 3 4` is 11.
- **Rank, `⍤`.** `(⍳10) <⍤0 1 ⊢ ⍳10` reproduces the outer product exactly, so the chapter's central insight — that `∘.f` is a special case of Rank — checks out in GNU APL too.

The five disagreements are all previously known families, none of them new:

- `]box on` and `]rows on` print no confirmation (Ex 1), and `]DISPLAY` becomes a `]BOXING 8` evaluation whose frame marker is `∼` rather than `~` (Ex 7).
- Tacit assignment of a derived function is still a `SYNTAX ERROR`, now for `prod ← ∘.×` and `rank ← ×⍤0 1` alike; `]runtime` is a `BAD COMMAND`, GNU APL having no benchmarking user command at all (Ex 5).
- Dyadic `?` (Deal) is random, so Ex 17's matrices and their product differ by construction.
- Lambdas cannot be operators, so Adám Brudzewsky's eXplanation operator `X` is defined without complaint — `⍺⍺` parsing as `⍺ ⍺` — and then `A +X.(×X) B` is a `SYNTAX ERROR` at `+X`. This is the chapter 4 dop limit, reappearing in the one place chapter 6 needs a user-defined operator.

The net: for array-level product semantics GNU APL is a usable oracle, and chapter 6 is the first chapter where the oracle mostly confirms rather than contradicts.

## Reproducing the run

The six scripts actually fed to the interpreter are kept here as `oracle-ch1.apl` through `oracle-ch6.apl`; each begins with its `⎕PW` and `]BOXING` setup and prints an `@@CELL n` marker before each example, which is how the outputs were split back apart per example. To re-run a chapter:

```
/usr/local/bin/apl --script --OFF --to_COUT -f oracle-ch3.apl
```
