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

GNU APL's default `⎕IO` is 1. The book sets `⎕IO ← 0` in the first example of every one of these three chapters, those lines are part of the scripts, and nothing resets them, so every oracle result recorded in the goldens is at index origin 0, matching the book.

## Display, and the three translations

GNU APL has none of Dyalog's display user commands. `]box`, `]DISPLAY` and `]rows` are all `BAD COMMAND`. What it has instead is `]BOXING [OFF|2-4|7-9|i20-25|29]`, a global setting. Three translations were therefore applied to the book's input before running it, and each is flagged as an `Oracle translation:` line on the affected example in the goldens:

- `]box on [-style=…]` becomes `]BOXING n`. Chapters 1 and 2, which the book runs under `]box on` in its minimum style, ran at `]BOXING 7`: nested values are framed, simple arrays print bare, which is what the book shows. Chapter 3, which the book runs under `]box on -style=max`, ran at `]BOXING 8`, the level that frames everything and marks rank and type on the frame. Chapter 1's Ex 8 and Ex 10, where the book switches style mid-chapter, switch between 8 and 7 accordingly. Unlike Dyalog's `]box`, `]BOXING` prints no "Was ON …" confirmation, so those two examples have no oracle output at all.
- `]DISPLAY expr` becomes `expr` evaluated under `]BOXING 8`, the nearest equivalent of the frame `]DISPLAY` draws. Where the argument is an assignment, the assignment is followed by the bare variable name, because `⎕←` bypasses the boxing setting and would print the value unframed.
- `]rows on` becomes `⎕PW←10000`, which stops GNU APL wrapping long result lines.

Even at the closest boxing level the frames are not the same characters. GNU APL draws the type marker in a frame's bottom-left corner as `∼` (U+223C TILDE OPERATOR) where Dyalog uses `~`, and marks enclosure as `ϵ` (U+03F5 GREEK LUNATE EPSILON) where Dyalog uses `∊`. Every framed output therefore differs from the book's by at least those two characters, which is why the display-only disagreements below are so numerous.

## How many book outputs the oracle disagreed with

Counted per example: an example disagrees if the oracle's printed text differs from the book's after blank lines and trailing spaces are normalised away. 100 of the 127 examples disagree.

| chapter | examples | disagree | display only | different values | GNU APL errors |
|---|---|---|---|---|---|
| 1, arrays | 28 | 20 | 9 | 11 | 0 |
| 2, indexing | 40 | 28 | 9 | 6 | 13 |
| 3, glyphiary | 59 | 52 | 29 | 13 | 10 |
| total | 127 | 100 | 47 | 30 | 23 |

"Display only" means the values agree once the frames are stripped: 47 of the 100 disagreements are the `∼`/`ϵ` frame glyphs and the `]BOXING`-versus-`]box` framing, nothing more. The other 53 are real.

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

## Reproducing the run

The three scripts actually fed to the interpreter are kept here as `oracle-ch1.apl`, `oracle-ch2.apl` and `oracle-ch3.apl`; each begins with its `⎕PW` and `]BOXING` setup and prints an `@@CELL n` marker before each example, which is how the outputs were split back apart per example. To re-run a chapter:

```
/usr/local/bin/apl --script --OFF --to_COUT -f oracle-ch3.apl
```
