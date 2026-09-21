# Where the interpreter's float `round` came from

Written 2026-09-21 by a delegated worker, to answer Pavol's question on ledger
row 329: "when the interpreter's `Math.round` was written, what was in other
places? Were there any commit messages that would explain the discrepancy?"

All history searches were run with `git log --all`, because this clone carries
several parentless import roots from the graft; the five roots dated 2011-12-06,
2012-01-20, 2012-01-25, 2012-05-23 and 2012-07-19 answer every `-S` search and
are not evidence of a change. They are left out of the table.

## Timeline

| date | event | commit | author | message, quoted |
|---|---|---|---|---|
| 2008-03-31 | The specification's half-to-even sentence is already published: it stands verbatim in the 1.0 sources at `Specification-1.0-frozen/basic-lib/numbers.tex:470-472`, identical to today's `Specification/basic-lib/numbers.tex:470-472` (`diff` of lines 455-480 is empty), and the PDF this commit added is byte-identical to `Specification-1.0-frozen/fortress.1.0.pdf` (blob `1f1e914dd`) | `403afbe0b` | sukyoungryu | "Added the Fortress Language Specification, Version 1.0." |
| 2008-05-04 | `numerics/DirectedRounding.java` arrives — a full directed-rounding facility in pure Java. It has `nextUp`/`nextDown` and UP/DOWN variants of the five arithmetic operators, and **no round-to-nearest of any flavour** (`grep 'public static'`: 40 methods, all directed) | `77a908452` | jmaessen | "Directed rounding in 100% pure Java, courtesy of Guy.  There are now UP and DOWN variants of PLUS, MINUS, SLASH, DOT, and SQRT for RR64; these round in the given direction.  Also available are nextUp and nextDown for RR64." |
| 2008-05-06 | The only pre-2013 message naming IEEE. Touches `Float.java`, but only renames `Util.R2R` to `R2R`; nothing about rounding to nearest | `cfe16b43b` | jmaessen | "Slightly better treatment of IEEE FP, and better treatment of MIN and MAX.  Transitioned Set to require total order (though may simply implement a strict global ordering as discussed in past group conversations and use that in some fashion)." |
| **2008-07-21** | **The rational `round` is written, half to even from the first line**: `round(self): ZZ = do x = self + 1/2; z = floor(x); if z = x AND odd z then z-1 else z end end`, in the diff that creates `trait QQ`. The same commit writes all eight `round` assertions of `ProjectFortress/tests/RationalTest.fss`, including `assert(round(15/6), 2, "round(15/6)")` and `round(-15/6) = -2`, then at `:417` and today at `:428`. Neither body nor assertions have changed since (the exact-string `-S` searches return this commit and the import roots only; the 11-line shift is a copyright header) | `dc41d5000` | gls | "added NN32 and NN64 and QQ, / operator on integers now creates rationals, toString() getters on all numbers, NN64 and ZZ64 now support partitionL method, added methods even and odd on integers, added IEEE_PLUS_UP and related operators, and numeric literals may now contain apostrophes" |
| **2008-10-25** | **`Float$Round` is written, `Math.round(x)`, three months after the rational body.** One commit, five files: `Float$Round` and `RR32$Round` (`(long) Math.round((double) x)`) in the glue; the two `builtinPrimitive` bindings in `FortressBuiltin.fss`; `round(self): ZZ = round(asFloat(self))` on `trait Number` and `round(self): I = self` on `trait Integral` in `FortressLibrary.fss`; and the new test `ProjectFortress/tests/roundBug.fss`, which rounds `SQRT(3^2+4^2)` and asserts 5. The same commit also changed `truncate` on `trait Number` from `ZZ64` to `RR64` — the disagreement ledger row 330 records | `e67394471` | jmaessen | "Rounding now available for all numeric types." |
| 2008-10-26 | What it was for. The Pythagorean-triples demo had been recovering an integer hypotenuse with `floor` of a `SQRT`, which `roundBug.fss` shows failing; the day after `round` existed, its author switched the demo to it — five call sites, `narrow |\cFloat/|` → `narrow(round(cFloat))` | `a539e6f5a` | steve.heller | "trips: replaced floor by round" |
| between 2008-12-14 and 2011-12-06 | Reindented by the wholesale reformatting that this clone cannot date (last continuous revision `926a20301`, `Float.java:243-245`, one line; first import root `26718e298`, `:382-385`, four lines). **The body is character-for-character the same**, and already at the lines it occupies today | (unrecoverable) | — | — |
| 2026-09-19 | The first and only `Math.rint` in the tree, in the compiled path's `simpleDoubleArith.doubleRound` (rung F). `grep -rnw rint` over `ProjectFortress/src`, `LibraryBuiltin` and `Library` returns exactly one line, `simpleDoubleArith.java:133` | `632d7cf22`, `b70ed4590` | (revival) | "Rung F: the thirteen methods, and the recorded pass" |

## The answer

The float `round` was written **last** — three months after the team's own
half-to-even rational body and its eight pinning assertions (2008-07-21, by
Guy Steele), and nearly seven months after the specification sentence was
published in Fortress 1.0 (2008-03-31). So the discrepancy is not a case of
the float coming first and the rational being written to a rule nobody had
stated yet; the rule was stated, implemented and tested, and the float method
then went the other way.

**No commit message explains the choice, and there is no comment anywhere near
the code.** Four messages in the whole pre-2013 history mention rounding at all
(the four in the table above), and the one that writes `Float$Round` is five
words long. There is no comment in `Float.java` at `:382-385`, none in
`FortressBuiltin.fss` at `:188-191`, and none beside the rational body at
`FortressLibrary.fss:589`. The honest answer to Pavol's question is that
nothing explains it: `Math.round` was the Java default, reached for in a commit
whose purpose was coverage ("Rounding now available for **all numeric
types**") and whose trigger was a demo that needed a perfect-square test, not
a tie-breaking rule — no tie can arise from `SQRT(a^2+b^2)` landing near an
integer, so the halfway case never came up in the use that prompted the work.

One detail sharpens it. The team had, since May 2008, a hand-written
directed-rounding library "courtesy of Guy" sitting in the same package, used
by twenty-odd natives in the same file — so this was a group that cared about
rounding modes in detail. It had no round-to-nearest routine, and `Math.rint`,
which would have given the specified rule in one token, is used nowhere in the
interpreter, then or ever.

## What could not be found

- **The commit that wrote the specification sentence.** `Specification/` holds
  only `fortress.1.0.pdf` throughout the 2007-2008 mainline; the LaTeX sources
  first appear in the parentless import root of 2011-12-06, so no authoring
  commit for `numbers.tex` exists in this clone. The 2008-03-31 date above is
  evidence from the frozen 1.0 tree and the identical PDF blob, not from a
  commit that touches the sentence.
- **Any recorded discussion.** No bug id, no mailing-list reference, no
  `TODO`/`XXX` near either `round`. Whether steve.heller asked jmaessen for it
  is inference from the two dates and the parent link (`e67394471`'s parent is
  `9cc85686d`, steve.heller's "spelling tweak" of the same day), not from a
  message.
- **A text confirmation from the 1.0 PDF itself.** No `pdftotext` in the
  container, and the reconstruction attempted from the compressed streams
  recovered only part of the document; the frozen LaTeX was used instead.
