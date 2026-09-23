# Rung C of climb batch 3: four comments in the interpreter library

- problem: explorations/coordinator/POSITIONS.md:47 (the closure's `NOT YET` comment, asked for "either way") and :44 (the `Array3` clause and the scalar block approved as landed: the `Array3` clause as landed is the explainer's option B at explorations/coordinator/postmortem-2026-09-19/library-findings-explained.md:193, whose default was A, :189 and :199, so Pavol's approval as landed chose B; the scalar block is on the explainer's defaults 3a-A and 3b-A at :249-255 and :272-283)
- spec: Specification/basic/traits.tex:76-88 (`extends` takes `TraitTypeWhere`, `comprises` only `TraitTypes`) and :259-275 (the normative example: a trait that comprises two traits may not be extended by a third), with Specification/basic/types-vals-vars.tex:549-570 (what a `comprises` clause entails of every subtype); traits.tex:231-235 says the same in a `\note`, which a release build suppresses (Specification/fortress/fortress.tex:35-37), so it corroborates and does not decide; Specification/basic/traits.tex:218-222 with Specification/advanced/overloading.tex:178-216 for the `Array3` exclusion; for the scalar block, Specification/basic/operators/opr-overview.tex:143-147 (juxtaposition and `/` between a vector or matrix and a scalar), and none for `+`, `-`, `MIN` or `MAX` between an array and a scalar, for their result types, or for rank-3 algebra: `grep -rn -i 'scalar\|elementwise\|element-wise' Specification/basic Specification/basic-lib` has six hits, of which only the passage just cited (its lines 143 and 147) is about arithmetic between an array and a scalar, Specification/basic/expressions/aggregate.tex:180 is about scalars as the elements of an array literal, and the other three are about tuples and coercions, Specification/basic/conversions-coercions.tex:496, :695 and Specification/basic/types-vals-vars.tex:279
- precedent: Library/FortressLibrary.fss:1297, :1374, :1589-1590 (the `.fss` `NOT YET` form) and Library/FortressLibrary.fsi:818, :1063 (the `.fsi` `not yet:` form); Library/FortressLibrary.fss:4503 (the scalar block's own `(*)` header comment)
- deviation: the closure note sits on the line after the one-line trait, not inside a trait body as at .fss:1297, since putting it inside would change a code line (Library/FortressLibrary.fss:613); the `.fsi` note uses the `.fsi`'s own `not yet:` form, not the `.fss` form the brief quotes (Library/FortressLibrary.fsi:410); the honest clause is spelled without braces, `comprises Integral[\I\] where [\I\]`, as the team spells its single-type notes (Library/FortressLibrary.fss:1297), where the brief writes `comprises { Integral[\I\] where [\I\] }`; the example is written in Fortress's array syntax `3 - [1 2]` (Specification/basic/expressions/aggregate.tex:120-121) where the brief writes `[1, 2]` (Library/FortressLibrary.fss:4512); the reversed `-` is at base .fss:4500, not :4501 as the brief and the explainer cite, and the note sits beside it by symbol (Library/FortressLibrary.fss:4512-4515); the `.fsi` block, which had no header, gets the `.fss` block's header line as well (Library/FortressLibrary.fsi:2543); comment 2 names the lower-rank case only, where the brief says "something on the numeric side (C4's plane-wise `+`)" (explorations/coordinator/CLIMB-BATCH-3.md:108), because the (number, `Array3`) case is the scalar block's (explorations/compile-ladder/rung-library-comments/probes/skeptic/SkArray3Exclusion.txt B1-B6; Library/FortressLibrary.fss:2672)
- historical: Library/FortressLibrary.fss, Library/FortressLibrary.fsi

Line numbers of the two library files are this branch's, after the edit, unless marked
"base" (the tree at `d610695c0`). The base-to-branch shift is in section 8. At the gather,
rung L was applied first and deletes four lines at base `.fsi:2311-2314`, so the `.fsi`
numbers of the scalar block cited here are the merged tree's, four below this branch's
(section 8); every other number is unchanged by L.

## 1. What changed

Comment text only: 31 lines inserted, none deleted, no other file of the original tree touched.

```
$ git diff --stat d610695c0c014001687e528fa9fd99078db6ea76 -- Library/
 Library/FortressLibrary.fsi | 16 ++++++++++++++++
 Library/FortressLibrary.fss | 15 +++++++++++++++
 2 files changed, 31 insertions(+)
```

1. **The closure** (`trait AnyIntegral extends { QQ } comprises { ZZ } end`, .fss:612, .fsi:409).
   The line after it, in each file's own form:
   - .fss:613 `(** \vspace{-4ex} NOT YET: %comprises Integral[\I\] where [\I\]% *)`
   - .fsi:410 `(** not yet: ``%comprises Integral[\I\] where [\I\]%'' *)`
2. **Why `Array3` excludes `AnyAdditiveGroup`** (.fss:2671-2676 under the clause at :2670;
   .fsi:1661-1666 under :1660), the same six lines in both files, as reworded in the repair round
   (the first version said "an Array3 and a number or a lower-rank array"; decision 7):
   ```
   (* Excluding AnyAdditiveGroup picks one of two uses of rank 3.  An operator
      between an Array3 and a lower-rank array, such as a matrix added to every
      plane, can be declared without colliding with AdditiveGroup's
      +(self, other: T); in exchange no Array3 can be an additive group, a rank-3
      counterpart of Vector and Matrix.  Array1 and Array2 cannot exclude it:
      Vector and Matrix extend them and are additive groups. *)
   ```
3. **The unsized result** (.fss:4504-4508 under the block's header at :4503; .fsi:2543-2548,
   header included):
   ```
   (*) All eight return the unsized Array[\T,I\], where the Vector and Matrix scalar
   (*) operators keep rank and size (Vector[\T,n\] to Vector[\T,n\]).  Nothing is lost at run
   (*) time, since map builds its result with replica and m + 1.0 is still a Matrix; a static
   (*) checker sees only Array[\T,I\], so sized arrays under a compiler need per-shape
   (*) declarations beside these.
   ```
4. **What the reversed `-` means** (.fss:4512-4514 above it at :4515; .fsi:2552-2554 above :2555):
   ```
   (*) Scalar on the left: y - x is y - e for each element e of x, so 3 - [1 2] is [2 1].
   (*) This is the only pair here whose two orders differ: +, MIN and MAX commute, and so do
   (*) the scalar DOT and juxtaposition pairs of Vector and Matrix that this block follows.
   ```

No declaration, clause, body or name changed; no clause moved. Nothing here needed a word of
Fortress changed, so the rung's stop condition did not arise.

## 2. Where the fix belongs

The feature is the comment (`explorations/coordinator/map/spec-to-implementation.md:168`:
`basic/lexical-structure.tex:700`, `Spacing.rats`, works on both paths, ledger row 217). A comment
is whitespace to the lexer (`Specification/basic/lexical-structure.tex:700-721` and :723-764; the
grammar at `ProjectFortress/src/com/sun/fortress/parser/Spacing.rats:24-90`), so the site is simply
the two library files at the four declarations, and the only way a comment can change the program
is through its delimiters: `(*` inside a comment opens a nested one, `*)` closes it, and `(*)` is a
comment to the end of the line (`Spacing.rats:46-88`; row 217 is the trap). The four texts contain
no `(*` and no `*)` except as their own delimiters, which `comment-only-check.py` checks
mechanically (section 5). The compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`) does not
import `FortressLibrary`, so the compiled path and the ladder cannot see these lines; the
checker-count stage is the one compile-path consumer of these two files.

## 3. Precedent search

- **The `NOT YET` note.** The `.fss` has it three times, all in one form,
  `(** \vspace{-4ex} NOT YET: %comprises … where …% *)`: .fss:1297 (`AnyMaybe`), :1374
  (`AnyUniqueItem`) and :1589-1590 (`HasRank`, with a bound: `where [\T,E,I\]{ T extends
  Array[\T,E,I\] }`), each on the line after the trait header, inside the body. The `.fsi` mirrors
  two of the three in a different form, `(** not yet: ``%comprises … where …%'' *)`, at .fsi:818
  (`AnyMaybe`) and :1063 (`HasRank`); its `AnyUniqueItem` (.fsi:886-889) carries none. So two forms
  exist, one per file, and I followed each file's own. The `\vspace{-4ex}` pulls the note up against
  the rendered line above it (the `(**` comments are the doc comments the Fortify tools typeset,
  `Fortify/fortify-doc.txt:360-378`), which is why the note goes after the one-line trait rather
  than before it.
- **The spelling of the clause.** The two unbounded precedents write a single type without braces
  (`comprises Maybe[\T\] where [\T\]`); the bounded one spells its bound. `Integral`'s parameter is
  bounded (`I extends Integral[\I\]`), but the approved text, the explainer
  (`library-findings-explained.md:64-65`) and the trace
  (`explorations/perf-probes/prelude/exclusion-trace.md:297-299`) all write `where [\I\]`, so I kept
  that and dropped only the braces.
- **Rationale for an exclusion, in a comment.** The library writes it as a plain `(* … *)` comment:
  the Potemkin note (.fss:1600-1601) and the `AnyMaybe` note (.fss:1294-1295, "This makes excludes
  work without where clauses"). The `Array3` comment follows that form, placed directly under the
  clause it explains.
- **The scalar block.** Its own header (.fss:4503) is a `(*)` line comment, and the `.fsi`'s nearby
  header (.fsi:2539) is too; items 3 and 4 use the same form.

## 4. The specification, comment by comment

1. **The closure.** `Specification/basic/traits.tex:259-275`: a trait that comprises
   `OrganicMolecule` and `InorganicMolecule` may not be extended by a third trait ("the following
   trait declaration is not allowed"), and `Specification/basic/types-vals-vars.tex:549-570` draws
   the consequence that every subtype of a comprising trait is a subtype of one of the listed
   traits; so `comprises { ZZ }` is false while `Integral[\I\]` (.fss:615) extends `AnyIntegral`
   directly. `traits.tex:231-235` states it outright (the listed traits "are exactly the traits
   that immediately extend" the trait), but in a `\note`, which a release build suppresses
   (`Specification/fortress/fortress.tex:35-37`) — the ground on which item 2 below sets aside the
   `aggregate.tex` margin notes — so it corroborates and does not decide. The
   true statement names every instantiation of `Integral`, and the grammar has no way to say so:
   `extends` takes `TraitTypeWheres`, a type with an optional `where` (`traits.tex:76-83`), but
   `comprises` takes only `TraitTypes` (`:88`), and the parser matches
   (`ProjectFortress/src/com/sun/fortress/parser/NoNewlineHeader.rats:96-139`). That is what the
   team's `NOT YET` says; the note says it and nothing more, and promises no checker change.
2. **`Array3`.** An `excludes` clause means no trait can extend both (`traits.tex:218-222`); types
   that exclude have subtypes that exclude (`Specification/basic/types-vals-vars.tex:163-164`);
   tuple types exclude if a pair of their elements do (`:276-277`); and "without coercion,
   incompatibility is equivalent to exclusion" (`Specification/advanced/overloading.tex:182`),
   which makes two declarations with incompatible parameter types a valid overloading (`:212-216`).
   So an operator one of whose parameters is an `Array3` never overlaps `AdditiveGroup[\T\]`'s
   `+(self, other: T)` (.fss:333), whatever `T` is, because `T` extends `AnyAdditiveGroup`. The
   price is the clause's plain meaning: no type extends both `Array3` and `AdditiveGroup`. `Array1`
   and `Array2` cannot carry the same exclusion because `Vector` (.fss:2193-2194) and `Matrix`
   extend them and are additive groups, and `traits.tex:222` forbids extending two excluding
   traits. On which future rank 3 should have, the specification is silent: its prose makes a one-
   and two-dimensional numeric array a vector and a matrix
   (`Specification/basic/expressions/aggregate.tex:150-166`) and says nothing of rank 3 beyond
   indexing. The margin notes beside that passage (`aggregate.tex:152-162`, which a release build
   suppresses, `Specification/fortress/fortress.tex:35-37`) contemplate `Matrix` types of rank
   `k > 1`, with an editor's dissent; they are draft text, not the standard, and they lean toward
   the future the clause forecloses (the skeptic's F5). The choice is Pavol's, taken 2026-09-21.
   The "future one" use is already gated:
   `ProjectFortress/test_library/ArrayOperatorVocabulary.fsi:6-7` declares the plane-wise `+`
   between a `Matrix` and an `Array3`, and `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss:23-24`
   checks it. The fixture declares two `+`, which is ledger row 341's trigger (two or more
   declarations of one name with a trait-typed operand in the non-self position,
   `explorations/fortress-gap-ledger.md:352`), so the interpreter does check the pair against the
   library's: on a cold cache it refuses it without the clause, against `AdditiveGroup`'s
   `+(self, other: T)` (.fss:333; `probes/skeptic/SkArray3Exclusion.txt` A2 and A4), and a warm
   cache passes it (A3, A5). The rung's first gated run (`probes/gated-tests-postedit.txt:16-26`)
   followed other post-edit walks on the worktree's caches, so it met a warm cache and said nothing
   about the clause; the branch's own evidence is the cold run of the repair round, in which the
   fixture loads on this branch's library and prints its nine lines (`probes/gated-cold-postrepair.txt`).
   The static checker gives no evidence either way: on the fixture's vocabulary its overloading
   check crashes on the `nat` parameters (`STypesUtil.scala:557`), and on a `nat`-free rendering at
   fixed sizes it reports 0 errors with the clause and without it
   (`probes/skeptic/SkA3Concrete-checker.txt`). The number case is different. The scalar block
   holds the (number, `Array`) slot for every `Array3`, since `Array3` extends
   `StandardMutableArrayType` (.fss:2666-2669), which extends `Array[\E,I\]` (.fss:1991-1992); a user
   pair of `+` between an `RR64` and an `Array3` is refused on a cold cache against the block's
   `opr +[\T extends Number, I\](x: Array[\T,I\], y: T)` (.fss:4509) with the clause (B1) and without
   it (B3), and loads either way once the block's two `+` are removed (B5, B6). That is why
   comment 2 now names the lower-rank case only (decision 7). Under the static-parameter sentence
   (`Specification/basic/overloading.tex:100-104`: "it is an error for their static parameters to
   differ") the fixture's `+` and the number pair would both be errors whatever the exclusion;
   that sentence is Pavol's to decide (`explorations/coordinator/CLIMB-BATCH-3.md:164`), and the
   comment says nothing of it.
3. **The unsized result, and 4. the reversed `-`.** The specification's prose on arithmetic
   between an array and a scalar is `Specification/basic/operators/opr-overview.tex:143-147`:
   multiplication of a vector or matrix by a scalar is juxtaposition, and division of a matrix or
   vector by a scalar may be written `/`. It names no operand order and no result type, and it
   says nothing of `+`, `-`, `MIN` or `MAX` between an array and a scalar (the grep in the
   provenance block), so both comments record library decisions, taken on 2026-09-21 as the
   explainer's defaults 3a-A and 3b-A. Comment 4's statement that the juxtaposition pairs commute
   agrees with the passage. What the comments state as fact was
   measured under `walk` (`probes/CommentedDecls.fss`, capture `probes/CommentedDecls-postedit.txt`):
   `3 - x` is `[0#2][ 2 1 ]` for `x: ZZ32[2] = [1 2]` and `x - 3` is `[0#2][ -2 -1 ]`; `m + 1.0`
   and `0.0 MAX m` are `Matrix[\RR64,2,2\]` at run time, `1.0 - v` a `Vector[\RR64,3\]`, and
   `10.0 - t` an `Array3` (the `replica` claim: .fss:2139-2140, :2401-2402, :2770-2772). The gated
   `ProjectFortress/tests/ArrayScalarExtension.fss:23` and `:45` already pin the reversed `-`
   (`(1.0 - v)[0] = 2.0`, `(1 - iv)[0] = 2`). The precedents' commutativity: every Vector and
   Matrix scalar pair calls the same `me.scale(other)` in both orders (.fss:2271-2281, :2648-2658).

## 5. How the change was verified

A comment-only rung has nothing to make red, as the batch record says, so there is no failing test
and no `.test` file. What stands in for the recorded failure is the base tree's own behaviour,
captured before the edit existed (commit `76c55b270`), and the same captures after it. The
post-edit captures below were all re-run in the repair round, after comment 2's rewording, and
recommitted; section 7 lists what each re-run showed.

- **The diff is comment-only**, checked mechanically: `comment-only-check.py` re-lexes both files
  with the comment rules of `Spacing.rats` and reports 0 deleted lines, 0 added lines that are not
  wholly comment, and token streams without comments identical before and after, for both files
  (`probes/comment-only-check.txt`, section (d)). The same capture shows the check failing on three
  deliberate mutations: a code line added (a), a `(*)` turned into an unbalanced `(*` (b), one word
  of code changed (c).
- **The parser builds the same trees.** `parse-compare.sh` parses both files as they are at the base
  commit and as they are now, with the tree's own parser (`bin/fortress parse -out`), maps every
  source position of the new trees back to the base numbering, and compares (`ast-compare.py`;
  capture `probes/parse-compare.txt`). Of 29,058 spans and 1,355 location-derived names in the
  `.fss` and 12,399 and 1,008 in the `.fsi`, all agree except three declarations whose span end
  moved onto the comment that now follows them: the `.fss`'s first `-` of the scalar block and the
  `.fsi`'s `SUFFIX_SUM` and first `-` (six dump lines). That is a property of the parser, D1 in
  section 6; nothing else in either tree differs. The comparator reports a one-word code change as
  "anything else" (`probes/parse-compare-mutation.txt`).
- **The checker sees the same library.** The gate's count stage
  (`explorations/coordinator/tools/checker-count/run.sh`), run before and after:
  `probes/checker-count-preedit.txt` and `-postedit.txt` are identical (93 errors, 52 locations, the
  same per-api rows, the same `NativeArray` crash line, `#shadow` matching). The checker's full
  output (`probes/checker-count-preedit-run.txt`, `-postedit-run.txt`) differs in 96 raw lines, all
  line numbers, and is identical, 253 lines in the same order, once `remap-lines.py` maps the new
  positions back (`probes/post-edit-comparisons.txt`). This rung declares no
  `expectedCheckerCount` and moves none.
- **The interpreter runs the same.** `probes/CommentedDecls.fss` exercises all four commented
  declarations; its output is identical before and after (`probes/CommentedDecls-preedit.txt`,
  `-postedit.txt`). Four gated interpreter tests that use them, run singly after the edit
  (`ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `ReplicaTest`, `array3test`), all exit 0
  with their expected output (`probes/gated-tests-postedit.txt`). Those runs used the worktree's
  warm caches, which hide row 341's check (section 4, item 2); in the repair round
  `ArrayOperatorsBesideLibrary` was run once more on a cache directory created empty for the run,
  and it loads and prints the same nine lines with rc=0 (`probes/gated-cold-postrepair.txt`).
- **The two suites were not run here** (decision 1 in section 9). What they will show at the gate
  follows from the above: every interpreter test sees a parse tree equal to the base's up to
  positions, so no pass or fail can move, and the counts and both summaries stay as they are. What
  can change in the logs is text that prints a `FortressLibrary` position: every position below an
  insertion shifts, and a dispatch failure that lists the scalar block's first `-` now prints its
  span as ending in the comment (`probes/ArrayLiteralArg-postedit.txt` against
  `probes/ArrayLiteralArg.txt`: 26 raw lines differ, one after remapping). No `.test` expectation in
  any corpus contains a `FortressLibrary` position (`grep -rn 'FortressLibrary' --include=*.test
  ProjectFortress` has no hit).
- **No names added**, so the name greps of the rung protocol (both corpora and
  `src/com/sun/fortress/` whole) have nothing to search for, and the ladder subset is empty: the
  batch record names no ladder file for this rung, no recorded first error names a name of it, and
  the compiled path does not read these files.

## 6. Defects measured, and their homes

- **D1. A declaration's span absorbs the comments that follow it** (new; home 3, because the
  specification is silent). When a declaration ends in an expression or a type, its source span,
  and the unambiguous name the parser derives from the span, run to the end of the comments that
  follow it; one ending in `end` is not affected. `probes/SpanAbsorb.fss` with
  `probes/SpanAbsorb.txt`: `f(x: ZZ32): ZZ32 = x + 1` followed by a line comment spans `4:1~5:63`
  and is named `…SpanAbsorb.fss:4:1-5:63`; the next `f`, followed by a blank line and a block
  comment, spans `6:1~8:41`; `g … end`, followed by a comment, spans `9:1~11:2`; the interpreter's
  dispatch failure lists both `f` with the widened ranges. The parser's `createSpan`
  (`ProjectFortress/src/com/sun/fortress/parser/Fortress.rats:145-157`) steps back from the end of
  the consumed text over space characters only, so a comment consumed at the end of a production
  stays inside the span. Nothing but diagnostics and location-derived names depends on it: in this
  rung it widened three spans and changed no answer (section 5). The specification defines no
  spans: `grep -rn -i -w 'span\|spans\|source location\|source locations' Specification/basic
  Specification/basic-lib Specification/advanced` prints only
  `Specification/basic/components/source-code.tex:39` and
  `Specification/basic/operators/opr-overview.tex:234-236`, and the second is about spans of real
  numbers in intervals. The first is the nearest sentence, and it asks only that "the original
  source location information" be kept across concatenated files
  (`Specification/basic/components/source-code.tex:37-40`). Row 359 (provisional 354), in `record.md`. Not repaired here: the parser is outside a comment-only rung.
- **D2. Row 49 in argument position** (existing row, re-observed; its home stays row 49, with a
  note). An array literal passed straight to an operator is not an array under `walk`:
  `Evaluator.forArrayElements` returns the unfinished paste, an `IUOTuple`
  (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:725-732`), which only
  an assignment to a declared type turns into an array
  (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:120-150`), so
  `3 - [1 2]` fails dispatch with the argument shown as `(1,2): (Int,Int)`, while the same literal
  bound to `x: ZZ32[2]` gives `3 - x = [0#2][ 2 1 ]` (`probes/ArrayLiteralArg.fss`,
  `probes/ArrayLiteralArg.txt`). Row 49's claim, "an array literal with no declared LHS type
  fails", already covers it; the note records the argument-position symptom and the governing
  prose, `Specification/basic/expressions/aggregate.tex:129-137` (the literal's type is
  `Array`k`[\T, 0, n0, …\]` with `T` the union of the element types), where the row cites the
  grammar at `:27`. The specification settles it against the interpreter, which by the three homes
  would mean an XXX expected-failure test; this rung cannot add one, because its obligation is
  suites byte-identical before and after (decision 4). The comment's example `3 - [1 2]` is the
  language's meaning, which is why it stays as the example.
  **Placed at the gather (2026-09-22), on the second skeptic's correction:**
  `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss` asserts `3 - [1 2]` is `[2 1]` element by
  element, the assert messages citing row 49 and `aggregate.tex:129-137`. An interpreter test needs
  no `.test` file (`FileTests.java:711`, the `XXX` name alone sets `shouldFail`). On the merged
  tree after rungs L and C it dies at the `-` with the same `(1,2): (Int,Int)` dispatch failure and
  reports `OK Saw expected exception` under `SystemJUTest`; the same program with the literal bound
  to `x: ZZ32[2]` first, which is what a repair of row 49 makes of it, prints `PASS` under `walk`
  and, run under the `XXX` name, `Missing expected failure`, Failures: 1
  (`explorations/compile-ladder/rung-library-comments/probes/gather/row49-xxx-harness.txt`; the
  control `probes/gather/ArrayLiteralArgDeclaredCtl.fss`). It adds one file to `testSystem`.
- **Not defects of code, but of citations, recorded so they are not re-derived:** the brief and the
  explainer (`library-findings-explained.md:249`) cite the reversed `-` at .fss:4501, which at the
  base is `opr MIN(x, y)`; the reversed `-` was at base :4500 (.fsi:2543). And this rung makes one
  live citation stale: the assert message at `ProjectFortress/library_tests/TryAtomicRungB.fss:42`
  reads "asString of Library/FortressLibrary.fss:1570", exact at the base, and `TryAtomicFailure`'s
  `asString` is now at .fss:1571. It is a message string printed only on failure, so no outcome
  moves; changing it would put a non-comment line in this rung's diff, so it is left for the
  coordinator (`record.md`). The other library-line citations in test files are in comments and
  were already stale at the base (for example `ProjectFortress/library_tests/BigSumRung8.fss:10`
  cites .fsi:1820, which is `join`).

- **F1, the skeptic's: comment 2 claimed a number case the clause does not license** (repaired in
  the repair round, decision 7). Its home is the first, in the form the judge ruled
  (`JUDGE.md` section 1): it was a false sentence in this rung's own deliverable, not a defect of
  the implementation, so no behaviour changed and there is nothing new to assert. The claim that
  remains, the lower-rank case, already has its assertion in a gated test:
  `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss:23-24`, which passes on a cold cache of
  this branch's library (`probes/gated-cold-postrepair.txt`) and fails on a cold cache of a library
  without the clause (`probes/skeptic/SkArray3Exclusion.txt` A4). No new assertion was written:
  a new test would break this rung's byte-identical obligation (decision 4).
- **F3, the skeptic's: the gated fixture pins the clause only on a cold cache** (home 3). It is a
  property of the interpreter's cache and of the harness, on which the specification says nothing.
  Captures: `probes/skeptic/SkArray3Exclusion.txt` A2-A5. It goes in as note 1 to row 341
  (`record.md`). Whether `ant testSystem` gives the fixture a cold library cache was not measured.
- **The skeptic's number pair, refused against the scalar block** (home 3; B1-B6). The
  specification does not settle it: its static-parameter sentence
  (`Specification/basic/overloading.tex:100-104`) would refuse the pair, the Subtype Rule read at an
  instantiation (`Specification/advanced/overloading.tex:161-166`) would admit it, and choosing
  between those readings is Pavol's (`explorations/coordinator/CLIMB-BATCH-3.md:164`). It goes in
  as note 2 to row 341 (`record.md`), framed as that row's own over-strictness
  (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:498-500`).
- **An unrepaired walk/compiled divergence with no ledger row** (the skeptic's
  `probes/skeptic/SkVecScalarRevC.fss`, capture `probes/skeptic/SkVecScalarC.txt`). The compiled
  prelude's `ZZ32Vector` block declares `+`, `-`, `MIN` and `MAX` with the vector on the left only
  (`Library/CompilerLibrary.fsi:186-190`), so `3 - x` is a static error on the compiled path where
  `walk` gives `2 1 0`. The specification is silent on these operators between an array and a
  scalar (section 4, item 3). The probe and its capture are committed, but there is no ledger row,
  by the judge's ruling (`JUDGE.md` section 9): the library route deletes the compiled prelude at
  the switch-over (`explorations/coordinator/POSITIONS.md:45`). It is reported for Pavol.

The rung added no XXX file. The one placed at the gather for D2, `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss`, was shown to report `Missing expected failure` on its control, the literal bound to `x: ZZ32[2]` first (`explorations/compile-ladder/rung-library-comments/probes/gather/row49-xxx-harness.txt`).

## 7. Differentials run

- `comment-only-check.py`, both files, base against branch: 0 deleted, 0 non-comment lines added,
  token streams without comments identical (`probes/comment-only-check.txt`).
- Parse trees, both files (`parse-compare.sh`): identical up to positions but for three span ends,
  D1 (`probes/parse-compare.txt`); a one-word code change is caught (`probes/parse-compare-mutation.txt`).
- Checker-count table: 93 errors and 52 locations before and after, identical.
- Checker output: 253 lines, identical in content and order after remapping.
- `walk` on `CommentedDecls.fss`: 17 lines, identical.
- `walk` on `ArrayLiteralArg.fss`: the same dispatch failure, identical after remapping but for the
  span end of D1.
- Four gated interpreter tests run singly after the edit: rc=0 each.

Re-run in the repair round, after comment 2's rewording (commit `9bd8ee7a5`), each by the usage in
its tool's header, with the captures recommitted:

- `git diff --stat d610695c0 -- Library/`: still 16 and 15 insertions, 31 in all, and
  `diff <(sed -n 2671,2676p Library/FortressLibrary.fss) <(sed -n 1661,1666p Library/FortressLibrary.fsi)`
  is empty, so no line number cited in section 8 or in `record.md` moved.
- `comment-only-check.py`: section (d) reads comment-only for both files, and the three mutations
  still fail with exit=1, (a) and (c) with `RESULT: FAIL` and (b) at the unbalanced comment
  (`probes/comment-only-check.txt`). The one line that differs from the first
  capture is (b)'s offset, 184576 before and 184564 now: "a number or " is twelve characters.
- `parse-compare.sh`: the same output as the first capture, the same three span ends and nothing
  else (`probes/parse-compare.txt`; only its header line now says it was re-run).
- `explorations/coordinator/tools/checker-count/run.sh`: the table is identical, 93 errors at 52
  locations (`probes/checker-count-postedit.txt`); the full output, with the worktree prefix
  removed, is byte-identical to the first post-edit capture (`probes/checker-count-postedit-run.txt`),
  and after `remap-lines.py` it is identical to the pre-edit run, 253 lines
  (`probes/post-edit-comparisons.txt`, regenerated).
- `walk` on `probes/CommentedDecls.fss`: the same 17 lines and rc=0, identical to both earlier
  captures (`probes/CommentedDecls-postedit.txt`); `walk` on `probes/ArrayLiteralArg.fss`: identical
  to the first post-edit capture, so that capture stands unchanged.
- The gated `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss` from the worktree root, cold:
  `tmp/cold-gated` created empty and passed as `-Dfortress.caches`
  (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:283`); it prints the nine
  lines of `probes/gated-tests-postedit.txt:17-25`, rc=0, and afterwards the directory held
  `FortressLibrary` and `ArrayOperatorVocabulary` in `interpreter_parsed_cache` and
  `interpreter_cache`, written by this run (`probes/gated-cold-postrepair.txt`).

## 8. Line shifts for the gather

Inserted after base line (count): `.fss` 612 (1), 2669 (6), 4496 (5), 4499 (3), 15 in all;
`.fsi` 409 (1), 1659 (6), 2539 (6), 2542 (3), 16 in all. A base line `n` is now
`n` plus the counts of the insertion points below `n`. For the other rung sharing
`FortressLibrary.fsi` (L, at base :373, :789, :2311-2328): :373 does not move; :789 becomes :790;
:2311-2328 become :2318-2335; the batch record's :411 (`trait Integral`) becomes :412 and :2526
(`RelationalPredicateCondition`) :2533. `remap-lines.py` does the reverse mapping mechanically.
L's hunk at :373 is above this rung's lowest (.fsi:409), so by the gather's rule L applies first,
and this rung's insertions then shift L's :789 and :2311-2328 citations as above.

At the gather (2026-09-22) L was applied first, as predicted. On the merged tree: L's
`Condition.map` is `.fsi:790`; `trait String`'s abstract `split` pair, L's `:2323-2324`, is
`:2330-2331`; `RelationalPredicateCondition`, L's `:2522`, is `:2529`; `trait Integral` is
`:412`; and this rung's scalar-block comments are `.fsi:2543-2548` and `:2552-2554`, with the
block's `(*)` header at `:2543` and the file's older header at `:2539`, four below this branch
because of L's deletion. The `.fss` is L-free, so every `.fss` number here stands.

## 9. Decisions

1. **The two suites were not run in the worktree.** The batch record gives this rung the obligation
   of both suites byte-identical before and after; the shared prefix forbids a rung to run
   `ant testFast` or `ant testSystem` and gates the batch once after the merge. I followed the
   prefix and put the obligation's substance on cheaper evidence (section 5); the byte-identity of
   the counts and summaries is the gate's to confirm. The alternative was to run both suites before
   and after here, beside two other rungs on four cores.
2. **Comment forms follow each file.** `.fss` notes in the `.fss` form, `.fsi` notes in the `.fsi`
   form; the alternative was the brief's quoted `.fss` form in both.
3. **The `.fsi` scalar block gets the `.fss` block's header line**, so that "All eight" has a
   referent there; the alternative was a self-contained first sentence without a header.
4. **No XXX test for row 49's argument-position form in this rung**, because adding any test breaks
   the rung's byte-identical obligation and the batch's declared suite arithmetic (`testSystem`
   384 → 385, `explorations/coordinator/CLIMB-BATCH-3.md:158`); the alternative was an `XXX` file in
   `ProjectFortress/tests/` and an undeclared rise to 386. Rung X of batch 2 left an `XXX` file
   out of `ProjectFortress/tests/` for a like reason, that its batch forbade running `ant testSystem`
   (`explorations/compile-ladder/rung-export-var/record.md:33-35`).
5. **Placement accepted with its span effect.** Items 3 and 4 in the `.fsi`, and item 3 in the
   `.fss`, follow a declaration that ends in a type or an expression, so D1 applies to any comment
   there; in the `.fsi` every position near the block is such a place. The alternatives were to
   leave the `.fsi` uncommented or to move item 3 away from the reversed `-`, both against the
   brief; the cost of the placement taken is three span ends.
6. **Worktree created by this rung.** At launch neither `/home/user/fortress-comments` nor the
   branch `wip/rung-library-comments` existed, locally or on the remote, although the brief says
   they had been made and pushed. I created them by the recipe of
   `explorations/coordinator/remote-container.md:96-110` from `d610695c0` (not from `main`, which
   was one handover commit ahead), copied `ProjectFortress/build`, and pushed the empty branch
   before any work; `ant compileAll` then ran in the worktree (`BUILD SUCCESSFUL`, 1 min 27 s).
   Nothing was inherited: the branch had no commits.
7. **Comment 2 loses "a number or"** (repair round, on the skeptic's B1-B6 and the judge's
   ruling, `JUDGE.md` section 1). The alternative was a rewording that points at the scalar block
   for the number case; it was not taken because it adds a claim that would need its own
   measurement on the compiled path one day, and a cross-reference that line shifts would not
   maintain. The comment kept six lines, the same in both files, so no citation moved.
8. **The skeptic's mechanism for B6 is not adopted** (`SKEPTIC.md:177-182`, "`RR64` already excludes
   `AdditiveGroup`"). At the language level it is false: `trait Number extends { …,
   AdditiveGroup[\Number\], … } comprises { RR64 }` (`Library/FortressLibrary.fss:352-355`) makes
   `RR64` a subtype of `AdditiveGroup[\Number\]`, and a type does not exclude its own supertype
   (`Specification/basic/types-vals-vars.tex:159-164`). Which path the interpreter takes to load B6
   was not traced, and nothing here depends on it: B1 alone makes the old sentence false. The
   report and the record carry the measurements B1-B6 and not a mechanism (`JUDGE.md` section 1).
9. **Two corrections to the judge's instructions, against the primary source.** The row-341 note 2
   that `JUDGE.md` section 10 instruction 6 gives cites the scalar block as
   `Library/FortressLibrary.fss:4509-4516`; on this branch its eight declarations run from :4509 to
   :4519 (with the reversed `-` note at :4512-4514), so `record.md` says :4509-4519. And instruction 4d
   says the static checker "reports nothing either way"; its capture
   (`probes/skeptic/SkA3Concrete-checker.txt`) shows it crashing on the fixture's own vocabulary and
   reporting 0 errors on a `nat`-free rendering, so section 4 says that.
10. **The shell setup.** Every call in this rung sets the environment from `tmp/shell.sh` (in the
    worktree's untracked scratch directory, written in the first round), which
    sets what `experiment/env.sh` sets but leaves out its `rm -rf /tmp/fortress*rats`: each tool
    call is a new shell, and sourcing `env.sh` in each would delete the Rats! temp directories of
    the other rungs mid-run, which the shared prefix forbids. `FORTRESS_HOME` printed this worktree.

## 10. Files

- `comment-only-check.py`, `parse-compare.sh`, `ast-compare.py`, `remap-lines.py`: the checks of
  section 5, each with its usage in its header.
- `probes/`: `CommentedDecls.fss`, `ArrayLiteralArg.fss`, `SpanAbsorb.fss` and every capture, all
  `.txt`.
- The pre-edit captures were committed before the edit (`76c55b270`), the edit and the post-edit
  captures in `43ec9ce17`.
- `SKEPTIC.md` and `probes/skeptic/` are the first skeptic's (`832e09d5c`), `JUDGE.md` the judge's
  ruling (`166e089d1`); neither was edited in the repair round.
- The repair round inherited the branch at `166e089d1` with a clean worktree. It re-ran the checks
  the judge named, and the `ArrayLiteralArg` probe besides, rather than trusting the first round's
  captures (section 7); the three other gated tests of `probes/gated-tests-postedit.txt` and the
  mutation run of `probes/parse-compare-mutation.txt` were not re-run, since the rewording moves no
  line and no token. It committed comment 2's
  rewording with the recommitted captures and `probes/gated-cold-postrepair.txt` in `9bd8ee7a5`,
  and this report and `record.md` after it.
- The shared prefix's tracked-path check, run over `REPORT.md`, `record.md`, `JUDGE.md` and
  `SKEPTIC.md` after the repair round's last edit, prints nothing. The relative `probes/` citations
  of `REPORT.md` and `record.md`, checked the same way under this directory, are all tracked; the
  one apparent miss is `explorations/perf-probes/prelude/exclusion-trace.md`, a different directory
  whose path contains `probes/`, and it is tracked.
