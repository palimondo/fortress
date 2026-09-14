<!-- Rung 5 probes: strands as tuples, the four new terminals, and the library
     before the grammar.  Walk interpreter, JDK 25, FORTRESS_THREADS=1, source
     path base + Library + LibraryBuiltin + test_library.  Seven probes,
     v01-v07; every .out is the recorded run, every .out.N a recorded failed
     attempt.  Line numbers quoted from a .out.N refer to the version of the
     file that produced it, not to the file as it now stands. -->

# Rung 5 probes: a strand of arrays, and four new terminals

The rung's two open questions were both in `DESIGN.md`'s own words. "Fortress
tuples do not index; write the three-element and two-element overloads with
tuple **patterns** in the parameter list … or destructure inside. Probe which
the interpreter accepts and record it." And: "`\` may need the backtick escape
— probe."

## v01 — a tuple as a parameter and as a result

**Question.** Can a library function take a tuple parameter? May the tuple be a
**pattern** in the parameter list, `f(g, (a, b, c))`? Does an overload family
dispatch on tuple **arity**? Does a tuple **result** type dispatch, or is it row
67's `Any` again?

**Answer.** A tuple parameter works and is destructured in the body; a tuple
**pattern in the parameter list is a Syntax Error**; a family does dispatch on
tuple arity; a tuple result type is fine.

**Verbatim** (`v01_tuple.out.0`), the pattern spelling
`t3pat(f: Any, (a, b, c): (Any, Any, Any)): String = …`:

```
null/home/user/fortress/explorations/apl/rung-5/v01_tuple.fss:25:24:
    Syntax Error
```

Column 24 is the opening parenthesis of the pattern.

**Running output** (`v01_tuple.out`): a named tuple parameter destructured with
`(a, b, c) = t` prints all three elements, and the three elements may have three
different APL ranks; `arity((1,2))` and `arity((1,2,3))` select different
members of one family; a function declared `: (Any, Any, Any)` returns one; and
an each over a tuple, with a zero-parameter lambda operand, works.

## v02 — the four new terminals, and the dot of `∘.g`

**Question.** Can `¨`, `⍀`, `⍣`, `\` and `.` be terminals of a production, and
which of them need the backtick escape of gap row 3? And can `⌷` be an
alternative of a glyph **table**, which is the position rung 6 needs it in?

**Answer.** All five are **plain items** and none of them takes the escape. `\`
and `.` are not among the macro language's SpecialChars — `Syntax.rats:395-398`
lists space, breakline, `:`, `?`, `#`, `+`, `*`, `[`, `]`, `` ` ``, `|`, `_`,
`{`, `}` — so for those two the escape is not merely unnecessary, it is a Syntax
Error. `⌷` works in a table.

**Verbatim** (`v02_term.out.0`), the escaped backslash `` | `+ `\ SPACE r:TExp ``:

```
/home/user/fortress/explorations/apl/rung-5/V02Syn.fsi:78:13:
    Syntax Error
```

**Verbatim** (`v02_term.out.1`), the escaped dot
`` | l:TAtom SPACE ∘ `. × SPACE r:TExp ``:

```
/home/user/fortress/explorations/apl/rung-5/V02Syn.fsi:91:26:
    Syntax Error
```

**Method, and one lost hour.** The first version of `V02Syn.fsi` was a
hand-trimmed grammar written from scratch around the questions. It compiled,
Rats! generated a parser for it, and then **every** rule whose first symbol was
a nonterminal matched nothing at the use site — including a `⍨` rule copied
verbatim from the working base. That is the same trap rung 4's u05 fell into
("four hand-written minimal grammars all failed at the USE site"). The probe as
it now stands is rung 3's `T02Syn.fsi` **verbatim**, with one block of new
alternatives added and nothing else changed but the names; copying a grammar
that is known to work is the only way to ask a terminal question cleanly.

**Running output** (`v02_term.out`): `×¨ 2 3 4`, `2 ×¨ 3 4`, `+\ 1 2 3`,
`+⍀ 1 2 3`, `×⍣2⊢3`, `2∘.×3` and `⌷⍤ 7 8 9` all fire their rules.

## v03 — destructuring

**Question.** `Q K Vv ← e` is to expand to `(fn (Q, K, Vv) => rest)((e))`: does
a lambda of three parameters accept a tuple **value** — the result of a call,
not a literal written at the call site? With three different ranks in it? Does
the binding nest?

**Answer.** Yes to all three (`v03_destr.out`). This is the other side of v01:
where the tuple is the **argument** and the parameters are separate names, no
pattern is needed and nothing is refused.

## v04 — the rung-5 library, before the grammar

**Question.** Do the new library functions behave — each in both valences and
over a strand, the general fold and scan, the direct scans, `-⌿`, power with a
count and with a stop function, the three `⍨` values, and the two contract
violations the design asks for?

**Answer.** Yes (`v04_lib.out`). Worth reading off it: `-\1 2 3 4` is
`1 ¯1 2 ¯2`, which is APL's definition of scan — element k is the **reduction**
of the first k+1 items, a right fold per prefix, not a running fold. And
`{⍳⍵}¨1 2 3`, whose cells return vectors, is a `CallerViolation`: that result is
APL's nested array and this base has no carrier for one.

**Verbatim** (`v04_lib.out.0`), and this one is **not** about rung 5 at all:

```
com.sun.fortress.exceptions.ProgramError: /home/user/fortress/Library/FortressLibrary.fss:330:5-28: and
/home/user/fortress/explorations/apl/base/AplCore.fss:1366:1-1367:64:

AdditiveGroup[\T extends AdditiveGroup[\T\]\](uninstantiated)[\T extends AdditiveGroup[\T\]\].+(self:AdditiveGroup[\T\],other:T):T/home/user/fortress/Library/FortressLibrary.fss:330:5-28 and
+[\nat a,nat b,nat c\](t:Array3[\FortressLibrary.RR64,0,a,0,b,0,c\],s:FortressLibrary.RR64):Array[\FortressLibrary.RR64,(FortressLibrary.ZZ32, FortressLibrary.ZZ32, FortressLibrary.ZZ32)\]/home/user/fortress/explorations/apl/base/AplCore.fss:1366:1-1367:64 have parameters
with generic type, at least one pair of parameters must have excluding types
```

That is a **cold cache**. Wipe `default_repository/caches/*` and the first
component that imports `AplCore` **directly** fails a static overload-conflict
check between one of AplCore's free operators and a generic trait method of the
shipped library; run the same file a second time, with AplCore now in the cache,
and it runs. It predates rung 5 — rung 4's own `u11_lib.fss` fails the same way
on a cold cache, there against `StandardTotalOrder.MAX` and rung 1's
`opr MAX(Vector, Vector)`. A component that imports `AplSyntax` as well does not
trip it, because compiling the grammar api puts AplCore in the cache first.

## v05 — the rung-5 grammar

**Question.** One line per new production: `⍣` with a count and with a stop
function, `¨` in both valences and over a name strand, the destructuring
binding, the ten direct scans, the general `f/ f⌿ f\ f⍀`, `-⌿`, and `⍨` as a
monadic function value. Plus three rules rungs 1–4 already had, re-asked beside
the new ones.

**Answer.** All of them fire (`v05_gram.out`). The three old ones —
`+/1 2 3 4` still the shipped `SUM`, rung 3's `1 2 3 4↑⍨2`, rung 4's
`⌽⍤1⊢2 3⍴⍳6` — still give the same answers, which is the check that the new
`AplFnM` alternatives did not shadow them.

## v06 — an all-uppercase name

**Question.** The microGPT program writes `BLK` for the block count and rung 5
needs it as the right operand of `⍣`. Can an APL name be a word of two or more
uppercase letters?

**Answer.** No. Such a word is a Fortress **operator**, not an identifier, so
neither the binding's `Id` gap nor `AplName`'s expansion can carry it.

**Verbatim** (`v06_caps.out.0`), for `apl⦇ BLK ← 4 ⋄ BLK ⦈`:

```
null/home/user/fortress/explorations/apl/rung-5/v06_caps.fss:
    Error occurred while instantiating and executing a temporary parser: com.sun.fortress.parser.templateparser.TemplateParser902 (/home/user/fortress/explorations/apl/rung-5/v06_caps.fss:7:75:
    Syntax Error)
```

**Running output** (`v06_caps.out`): the mixed-case `Blk` in the same three
positions runs, and so do the single uppercase letters `Q` and `K` — the rule is
two or more uppercase letters, not one.

## v07 — what a name strand may be built from

**Question.** `DESIGN.md` writes the strand as
`AplTuple :Expr:= a:AplName SPACE b:AplName SPACE c:AplName | …`, over every APL
name. Does that work?

**Answer.** No, and the reason is gap row 68 once more. `SPACE` is optional
whitespace and crosses a line break, so over `AplName` two ordinary names on
consecutive lines merge into one strand. Rung 3's Ex 34 is exactly that shape —

```
abv ← 7.0 4.5 8.3 0.0
bin ← 1+limits⍸abv
bin
```

— and its last two lines are then read as `1+limits⍸(abv bin)`, after which the
block has no final statement.

**Verbatim** (`v07_tuple.out.0`), rung 3 with an `AplName`-based strand:

```
null/home/user/fortress/explorations/apl/rung-3/Rung3.fss:
    Error occurred while instantiating and executing a temporary parser: com.sun.fortress.parser.templateparser.TemplateParser944 (/home/user/fortress/explorations/apl/rung-3/Rung3.fss:176:43:
    Syntax Error)
```

**Verbatim** (`v07_tuple.out.1`), the same shape inside a dfn body, rung 4's
X24:

```
null/home/user/fortress/explorations/apl/rung-4/Rung4.fss:
    Error occurred while instantiating and executing a temporary parser: com.sun.fortress.parser.templateparser.TemplateParser315 (/home/user/fortress/explorations/apl/rung-4/Rung4.fss:292:31:
    Syntax Error)
```

**The fix, and what it costs.** The strand reads a **third** closed name set,
`AplTName` — `Q K Vv wq wk wv dQh dKh dVh` — disjoint from every name rungs 1–4
use. Each of them is also an ordinary `AplName`, so `Q+K` still reads as two
names and an addition (`v07_tuple.out` (c)). The trap still applies **inside**
the set: two strand names on consecutive lines are one strand.
